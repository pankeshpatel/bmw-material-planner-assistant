from fastapi import APIRouter
from config.db import conn
from schemas.user import User
from datetime import datetime, date
from models.dbschema import dbHealthScore
import platform
import os
import sys
import math
import openpyxl
import datetime  # one of the functions doesnt work unless I have this line, idk
from datetime import date
import pandas as pd
from typing import List, Tuple, Set, Dict
from typing import Optional


healthscore = APIRouter()


PATH: str
# This is a directory in which material files is stored.
#directory: str = r'/code/app/MD04'
directory: str = r'/Users/pankeshpatel/Desktop/bmw-material-planner-assistant/backend/MD04'
saftey_stock: int
stock: int
avg_stock_change: float


# This function is to find stock
def find_stock(date: str, data: pd.DataFrame(), formatted_date: str) -> int:
    print("******I am in find_stock()************") 
    print("**data**")
    print(data)
    print("**first date**")
    print(date)
    print("formatted_date****")
    print(formatted_date)
  
    data_stock = data[data[3] == "Stock"]
    print("***data_stock***")
    print(data_stock)
    print("***data_stock.iterrows()***")
    print(data_stock.iterrows())
    for index, row in data_stock.iterrows():
        print("Index>", index) 
        print("row>>>", row)       
        if date == row[2]:
            print("I am in date == row[2]")               
            return row[5]

    # If else no concrete "Stock" data present just take stock for first entry of that day
    data_date = data[data[2] == date]
    for index, row in data_date.iterrows():
        # Assuming data sorted, returning first total_quantity entry for that data
        return row[5]

    # Else essentially
    print("No data found for", formatted_date)
    return None


def find_saftey_stock(date: datetime, data: pd.DataFrame(), saftey_stock: int) -> int:
    for index, row in data.iterrows():
        print("find_safety_stock..index", index)
        print("find_safety_stock..row", row)
        return abs(row[4])  # Change due to removal of saftey stock, assumed const

    # Else
    return abs(saftey_stock)  # Return last known value of saftey stock


def format_date(date: datetime) -> str:
      #return datetime.date.strftime(date, "%-m/%-d/%Y")
      return datetime.date.strftime(date, "%x")



def calc_avg_stock_change(data: pd.DataFrame()) -> float:
    data_filtered = data[data[3] == "Stock"]  # Stock values
    print("****data_filtered****")
    print(data_filtered)
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


def get_health_score(stock: int, saftey_stock: int, k_val: float) -> float:
    # Change value of k to affect attitude of curve
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

# Write a logic that return a health score of a material
  # Material ID
  # Material Name
  # Health Score
  # Date
  # Other information

@healthscore.get('/healthscore/{planner_id}/{material_id}', tags=["Forecasting Model"])
async def get_material_healthscore(planner_id:str,
                                  material_id: str, 
                                  healthdate: str, 
                                  plant : str = 'MC10'):
  
    material = material_id
    date = healthdate
    num_days = 10
    
    
    sql = """SELECT * FROM admin.MD04 WHERE materialID = %s AND demand_date = %s""" 
    data = pd.DataFrame(conn.execute(sql, material_id, healthdate).fetchall())
    
    
    avg_stock_change: float = calc_avg_stock_change(data)

    # Start at given date find stock
    # If no stock present indicate that
    # Find saftey stock, if no number present use previous number or 0
    # Get health status
    # Repeat for next 10 days
    mm, dd, yyyy = map(int, date.split('/'))
    date_obj = datetime.datetime(yyyy, mm, dd)
    saftey_stock = 0  # Default
    avg: List = []  # List to keep track of health scores

    for i in range(int(num_days)):
        td = datetime.timedelta(days=i)
        #print("td>>", td)
        new_date = date_obj + td
        #print("new_date>>", new_date)
        formatted_date = format_date(date=new_date)
        #print("formattted_date>>>" + formatted_date)
        
        #print("new_date formattted_date>>>" + format_date(new_date))


        # # ASSUME DATA SORTED ALREADY
        stock = find_stock(format_date(new_date), data, formatted_date)
        print("Return value of stock", stock)
        saftey_stock = find_saftey_stock(
                   format_date(new_date), 
                   data[data[3] == "SafeSt"], 
                   saftey_stock
              )
        
        print("return value of safety_stock", saftey_stock)
        
        

        health = get_health_score(stock, abs(saftey_stock), k_val=0.8)
        if health != None:
            avg.append(health)

        print_values(health, stock, avg_stock_change, material, formatted_date)

    result = sum(avg)/len(avg)
    result = round(result, 2)
    percentage_result = str(result).__add__(' %')

    health_score = {
        "Material": material,
        "Date": date,
        "Health-score": percentage_result,
        "Safety Stock": saftey_stock,
        "Status Code": 200,
        "Status Description": "Success"
    }

    return health_score

  
  
    #  sql = """SELECT * FROM admin.HealthScore WHERE materialID = %s AND healthscoredate = %s"""     
    #  return conn.execute(sql, material_id, healthdate).fetchall()
   
    
    
    



# # GET
# ## This is retrive all the users 
# @users.get('/')
# async def fetch_users():
#     return conn.execute(dbUser.select()).fetchall()

# # # GET
# # # This is to reterive a single user with id
# @users.get('/{id}')
# async def fetch_user(id: int):
#     return conn.execute(dbUser.select().where(dbUser.c.id == id)).first()


# # # POST
# # # This is to create a single user
# @users.post('/')
# async def create_user(user:User):
#     conn.execute(dbUser.insert().values(
#         name = user.name,
#         email = user.email,
#         password = user.password
#     ))
     
#     return conn.execute(dbUser.select()).fetchall()


# # # PUT
# # # This is to update a user with a id
# @users.put('/{id}')
# async def update_user(id:int, user: User):
#     conn.execute(dbUser.update().values(
#               name = user.name,
#               email = user.email,
#               password = user.password
#         ).where(dbUser.c.id == id)).fetchall()
    
#     return  conn.execute(dbUser.select()).fetchall()


# # # DELETE
# # # This is to delete a user with an id
# @users.delete('/{id}')
# async def delete_user(id: int):
#     conn.execute(dbUser.delete().where(dbUser.c.id == id))
#     return conn.execute(dbUser.select()).fetchall()

