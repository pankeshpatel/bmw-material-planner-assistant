

import mysql.connector
import pandas as pd
import os

import glob

import pymysql
from sqlalchemy import create_engine
engine = create_engine("mysql+pymysql://" + 'root' + ":" + 'password' + "@" + 'localhost' + "/" + 'admin1')
#here admin1 is db

FOLDERNAMES = ["01-MaterialMaster", "02-Exception" , "03-MD04" , "04-ExceptionMessage", "05-Planner" , "07-Zgrve"]
TABLENAMES = ["MaterialMaster","Exception", "MD04", "ExceptionMessage","Planner","Zgrve" ]

FOLDERNAMES = [ "05-Planner" , "07-Zgrve"]
TABLENAMES = ["Planner","Zgrve" ]


## ADD "/" at the end of folder name, imporant
ROOTFOLDERNAME = "/Users/manish/Downloads/bmw-trial/Datasets/"    ## The folder, within which we could see the Structure like
                                                              ##   01-MaterialMaster
                                                              ##   02-Exception
                                                              ##   03-MD04
                                                              ##    ----

from tqdm import tqdm
for folder,table in zip(FOLDERNAMES,TABLENAMES):
    print(f"Folder Name : {folder}")
    files = glob.glob('/Users/manish/Downloads/bmw-trial/Datasets/' + folder +  '/'+   '**/*.csv', recursive=True)
    if len(files) < 1:
        print('/Users/manish/Downloads/bmw-trial/Datasets/' + folder );
        continue;
    li = []
    for filename in files:
        if(os.stat(filename).st_size < 10 ):
            continue;
        df = pd.read_csv(filename, index_col=None, header=0,error_bad_lines=False , encoding = "ISO-8859-1", engine='python')
        li.append(df)

    frame = pd.concat(li, axis=0, ignore_index=True)
    print(f"NUmber of Records Read : {frame.shape[0]}")
    frame.to_sql(table, con = engine, if_exists = 'replace',index = False, chunksize = 1000)
    print(f"Completed for {folder}")
