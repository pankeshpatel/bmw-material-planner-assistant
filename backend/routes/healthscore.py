from fastapi import APIRouter, status, Response, HTTPException, Depends
from config.db import conn
from schemas.user import User
from datetime import datetime, date
import platform
import os
import sys
import math
import datetime  # one of the functions doesnt work unless I have this line, idk
from datetime import date
import pandas as pd
from typing import List, Tuple, Set, Dict
from typing import Optional
import json
from tabulate import tabulate
from config.oauth2 import get_current_user

# Import the Class
from config.profiler import profiler

# Create a new instance of simple profiler
my_profiler = profiler()


healthscore = APIRouter(
    prefix = "/healthscore",
    tags=["health score"],
)

saftey_stock : int
stock: int
avg_stock_change: float
list_qty = []
list_qty_instance = []  # This is a global


# This function constructs an individual instances of total Quantity fields
def find_total_quantity_instances(formatted_date: str, material_id: str, safety_stock: int, data:pd.DataFrame()):
    
    # sql = """SELECT material, demand_date, total_quantity FROM admin.MD04 WHERE material = %s AND demand_date = %s"""
    # data= pd.DataFrame(conn.execute(sql, material_id, formatted_date).fetchall(), columns=["material", "demand_date", "total_quantity"])
    
    
    item=0
    local_list_qty_instance = []
    global list_qty_instance
    
    
    if(len(data) == 0):
        local_list_qty_instance = [
            material_id,
            formatted_date,
            0,
            safety_stock
        ]
        list_qty_instance.append(local_list_qty_instance)        
        
    else:
        while(item < len(data)):
            local_list_qty_instance = [
                data["material"][item],
                data["demand_date"][item],
                data["total_quantity"][item],
                safety_stock
            ]
            
            list_qty_instance.append(local_list_qty_instance)        
            item = item + 1




# This function  constructs a summary (avg, min, max) dataframe total Quantity
def find_total_quantity_summary(formatted_date: str, material_id: str, safety_stock: int, data:pd.DataFrame()):
    
    # sql = """SELECT material, demand_date, total_quantity FROM admin.MD04 WHERE material = %s AND demand_date = %s"""
    # data= pd.DataFrame(conn.execute(sql, material_id, formatted_date).fetchall(), columns=["material", "demand_date", "total_quantity"])
    print(data)
    
    # max value
    if(len(data["total_quantity"]) == 0):
        max, min, mean = 0,0,0
    else:
        max = data["total_quantity"].max()
        min = data["total_quantity"].min()
        mean = data["total_quantity"].mean()

    
    local_list_qty = []    
    local_list_qty = [
        material_id, 
        formatted_date, 
        max, 
        min, 
        round(mean,2), 
        safety_stock
        ]
            
    # construct a list
    list_qty.append(local_list_qty)
    
    
# This function is to find stock
def find_stock(date: str, formatted_date: str, material_id: str, data:pd.DataFrame()) -> int:
            
    # sql = """SELECT mrp_element, total_quantity, demand_date  FROM admin.MD04 WHERE material = %s AND demand_date = %s""" 
    # data = pd.DataFrame(conn.execute(sql, material_id, formatted_date).fetchall())
    
    # Data is not available in DB
    if(len(data) == 0):
        print("No data found for", formatted_date)
        return 0
        #return None 
    
        
    if "Stock" in data.values:
        data_stock = data[data["mrp_element"] == "Stock"]
        for index, row in data_stock.iterrows(): 
            if date == row[2]:
                return row["total_quantity"]
    else:
        # # If else no concrete "Stock" data present just take stock for first entry of that day
        data_date = data[data["demand_date"] == formatted_date]
        for index, row in data_date.iterrows():
            # Assuming data sorted, returning first total_quantity entry for that data
            return row["total_quantity"]
    


def find_saftey_stock(date: datetime, data: pd.DataFrame(), saftey_stock: int) -> int:
    
    for index, row in data.iterrows():   
        safety_stock_qty = abs(row["change_quantity"])    
        return abs(row["change_quantity"])  # Change due to removal of saftey stock, assumed const

    # Else
    safety_stock_qty = abs(saftey_stock) 

    return abs(saftey_stock)  # Return last known value of saftey stock



def format_date(date: datetime) -> str:
      return datetime.date.strftime(date, "%x")


def calc_avg_stock_change(data: pd.DataFrame()) -> float:
    data_filtered = data[data[3] == "Stock"]  # Stock values
    #print("****data_filtered****")
    #print(data_filtered)
    #Assume data is sorted for now
    prev_row: int
    curr_row: int
    counter: int = 1
    total_dif: int = 0
    first_val_in = False
    for index, row in data_filtered.iterrows():
        if row[5] == "total_quantity":
            continue
        elif first_val_in == False:
            prev_row = int(row[5])
            first_val_in = True
        else:
            curr_row = int(row[5])
            diff = curr_row - prev_row
            
            if diff < 0:
                total_dif += diff
                counter += 1
                prev_row = curr_row
            else:
                prev_row = curr_row

    return total_dif/counter

# What is sigmoid function - https://www.youtube.com/watch?v=LcHYy-OZHp8
def get_health_score(stock: int, saftey_stock: int, k_val: float) -> float:
    
    if stock != None and saftey_stock != 0:
        return sigmoid(SS=(stock/saftey_stock), k=k_val)
    else:
        return 0.00



def sigmoid(SS: int, k: float) -> float:
    return (((1/(1+math.exp(-k*SS)))-(1/2))*2)*100


def print_values(health: float, stock: int, avg_stock_change: float, material: str, formatted_date: str):
    if stock != None:
        DoS = stock/avg_stock_change
        print("Health score for", material, "on",
              formatted_date, "is", health, "DoS is", DoS)


@healthscore.get('/{planner_id}/{material_id}', status_code = status.HTTP_200_OK)
async def get_material_healthscore(planner_id:str, material_id: str, healthdate: str, user_id: int = Depends(get_current_user)):

    my_profiler.start("health-score")
    
    material = material_id
    date = healthdate
    num_days = 10  
    
    
    sql = """SELECT material  FROM admin.MD04 WHERE material = %s AND demand_date = %s AND planner = %s""" 
    data = pd.DataFrame(conn.execute(sql, material_id, healthdate, planner_id).fetchall())
    
    
    if len(data.columns) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail = "Data item does not exist")
    
    mm, dd, yyyy = map(int, date.split('/'))
    healthdate = datetime.datetime(yyyy, mm, dd)

    sql = """SELECT mrp_element, change_quantity FROM admin.MD04 where material = %s"""
    data_safety_stock = pd.DataFrame(conn.execute(sql, material_id).fetchall())  
      
    saftey_stock = 0 # default value 
    
    
    saftey_stock = find_saftey_stock(format_date(healthdate), data_safety_stock[data_safety_stock["mrp_element"] == "SafeSt"], saftey_stock)

    #avg_stock_change: float = calc_avg_stock_change(data)

    mm, dd, yyyy = map(int, date.split('/'))
    date_obj = datetime.datetime(yyyy, mm, dd)
    avg: List = []  # List to keep track of health scores
    
    
    # This loop will get 
    for i in range(int(num_days)):
        td = datetime.timedelta(days=i)
        new_date = date_obj + td
        formatted_date = format_date(date=new_date)
        
        sql = """SELECT material, mrp_element, total_quantity, demand_date  FROM admin.MD04 WHERE material = %s AND demand_date = %s"""
        data= pd.DataFrame(conn.execute(sql, material_id, formatted_date).fetchall(), columns=["material", "mrp_element", "total_quantity", "demand_date" ])
        
        
        # # ASSUME DATA SORTED ALREADY
        stock = find_stock(format_date(new_date), formatted_date, material, data)
        

        # Total Quantity
        find_total_quantity_summary(formatted_date, material, saftey_stock, data) 
        

        # to find each instances of total quantity instances
        find_total_quantity_instances(formatted_date, material, saftey_stock, data)  
        
        health = get_health_score(stock, saftey_stock, k_val=0.8)    
        
              
        if health != None:
             avg.append(health)

        
        #print_values(health, stock, avg_stock_change, material, formatted_date)
        
    df_total_qty = pd.DataFrame(list_qty, columns = ['material', 'demand_date', 'max', 'min', 'mean', 'safety stock']) 
    print(tabulate(df_total_qty, headers = 'keys', tablefmt = 'psql'))
    
    
    # This would prepare .csv file that contains total_qty_instances
    df_total_qty_instances = pd.DataFrame(list_qty_instance, columns = ['material', 'demand_date', 'total_quantity', 'safety stock']) 
    print(tabulate(df_total_qty_instances, headers = 'keys', tablefmt = 'psql'))
    
    # destruct this global variable
    list_qty_instance.clear()
    list_qty.clear()
    
    
    result = sum(avg)/len(avg)
    result = round(result, 2)
    percentage_result = str(result).__add__(' %')
    
    # Retrieve material information
    
    sql = """SELECT DISTINCT material, material_9, material_7, mat_description, mat_description_eng FROM admin.MaterialMaster where material = %s"""
    df_material = pd.DataFrame(conn.execute(sql, material_id).fetchall(), columns=["material", "material_9" , "material_7", "mat_description", "mat_description_eng"])
    


    health_score = {
        "Material": material,
        "material_detail" : json.loads(json.dumps(list(df_material.T.to_dict().values()))),
        "Date": date,
        "Health-score": percentage_result,
        "total_qty_analysis" : json.loads(json.dumps(list(df_total_qty.T.to_dict().values()))),
        "total_qty_instances": json.loads(json.dumps(list(df_total_qty_instances.T.to_dict().values())))    
    }
    
    my_profiler.end("health-score")
    my_profiler.log("print")

    return health_score
