from fastapi import APIRouter
from models.dbschema import  dbExceptionMessage, dbExceptionManager
from config.db import conn
from datetime import datetime, date
import pandas as pd
import janitor
from tabulate import tabulate
import json



exception = APIRouter()

# Write a logic that returns a list of  exception ID  and exception message
@exception.get('/exceptions/', tags=["Exception Manager"])
async def get_all_exception_info(plant:str = 'MC10'):
    return conn.execute(dbExceptionMessage.select()).fetchall()


# This list an exception with an id and an exception message
@exception.get('/exceptions/{exception_id}', tags=["Exception Manager"])
async def get_exception_info(exception_id: int, plant:str = 'MC10'):
    return conn.execute(dbExceptionMessage.select().where(dbExceptionMessage.c.exceptionID == exception_id)).fetchall()



# This API will responsible for exception matrix functionality
# This API will return - a percentage of exceptions in each material in the timeframe of start-date and end-date.
#@exception.get('/exceptions/{planner_id}/sysviewer/', tags=["Exception Manager"])

@exception.get('/exceptions/{planner_id}/', tags=["Exception Manager"])
async def get_material_exception_info(planner_id:str, 
                                      start_date : str,
                                      end_date : str,
                                      plant:str = 'MC10'):
    
    
    # Data Reading from MySQL 
    sql = """SELECT * FROM admin.Exception"""
    df_exception = pd.DataFrame(conn.execute(sql).fetchall()) 
    
    
    # 1 - matnr, 3 - cdate , 9 - auskt
    dataframe_exception = pd.concat([df_exception[1], df_exception[3], df_exception[9]], axis=1)
    
    #  Data cleaning, replacing NaN with '0'
    dataframe_exception[9] = dataframe_exception[9].fillna(0)
    
    
     # Data filtering with respect to the start and end date
    dataframe_exception_filtered = dataframe_exception.filter_date(3, start_date, end_date)

    # Remove row that 'auskt' value has zero
    data_filter = dataframe_exception_filtered[dataframe_exception_filtered[9] > 0]

    # This would display all rows of a panda dataframe
    pd.set_option('display.max_rows', data_filter.shape[0]+1)
    
    
    # "count" column
    exception_count = data_filter.groupby(1).count()
    exception_count.rename(columns = {9:'count'}, inplace = True)
    exception_count.drop(3, axis =1, inplace = True)
    

    # 'percentage'
    exception_percentage = ((exception_count['count'] / len(data_filter))*100).to_frame()
    exception_percentage.rename(columns = {'count':'percentage'}, inplace = True)
    
    # combine "count" and "percentage" column into one Table
    result = pd.concat([exception_count, exception_percentage], axis=1)

    # reset index
    result.reset_index(inplace=True)
    exception_matrix = result.rename(columns = {1:'material'})

    response = {
        "result": json.loads(json.dumps(list(exception_matrix.T.to_dict().values())))     
    }
    
    return response

