from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, DateTime, Date
from config.db import meta, engine


dbUsers = Table(
    'User',
    meta,   
    Column('username', String(45)),
    Column('password', String(255))   
)

dbExceptionMessage = Table(
                    "ExceptionMessage", 
                    meta, 
                    Column('exceptionID', Integer),
                    Column('message', String(225))                
                )

dbPlanner = Table(
                    "Planner", 
                    meta, 
                    Column('id', String(225)),
                    Column('name', String(225)),
                    Column('email', String(225))              
                )

# dbMaterialMaster = Table(
#                         "MaterialMaster", 
#                         meta, 
#                         Column('material', String(255), primary_key=True),
#                         Column('material_9', String(255)),
#                         Column('material_7', String(255)),
#                         Column('mat_description', String(255)),
#                         Column('mat_description_eng', String(255)),
#                         Column('plant', String(255)),
#                         Column('planner', String(255)),
#                         Column('safety_stock', String(255))
#                     )

dbMaterialMaster = Table (
                    "MaterialMaster", 
                    meta,
Column('initial_creation_date', String(225)),	
Column('last_change_date', String(225)),	
Column('material', String(225)),	
Column('material_9', String(225)),	
Column('material_7', String(225)),	
Column('ai', String(225)),	
Column('mat_description', String(225)),	
Column('mat_description_eng', String(225)),	
Column('plant', String(225)),	
Column('planner', String(225)),	
Column('replenishment_type', String(225)),	
Column('rounding_value', String(225)),	
Column('lot_size', String(225)),	
Column('minimum_lot_size', String(225)),	
Column('safety_time_days', String(225)),	
Column('safety_time_ind', String(225)),	
Column('leadtime_hours', String(225)),	
Column('planning_time_fence', String(225)),	
Column('planned_delivery_time', String(225)),	
Column('safety_stock', String(225)),	
Column('unit_of_quantity', String(225)),	
Column('length', String(225)),	
Column('width', String(225)),	
Column('height', String(225)),	
Column('uom_lwh', String(225)),	
Column('volume', String(225)),	
Column('unit_of_volume', String(225)),	
Column('gross_weight', String(225)),	
Column('net_weight', String(225)),	
Column('unit_of_weight', String(225)),	
Column('stacking_factor', String(225)),	
Column('material_group', String(225)),	
Column('run_out_date', String(225)),	
Column('proc_type', String(225)),	
Column('part_type', String(225)),	
Column('character', String(225)),	
Column('init_upg', String(225)),	
Column('init_use_type', String(225)),	
Column('procurement_type', String(225)),	
Column('storage_location', String(225)),	
Column('bwd_consumption_per', String(225)),	
Column('fwd_consumption_per', String(225)),	
Column('pps_planning_calendar', String(225)),	
Column('factory_calendar', String(225)),	
Column('mrp_group', String(225)),	
Column('mixed_mrp', String(225)),	
Column('strategy_group', String(225)),	
Column('consumption_mode', String(225)),	
Column('abc_indicator', String(225)),	
Column('spab_indicator', String(225)),	
Column('status', String(225)),	
Column('status_valid_from', String(225)),	
Column('bulk_material', String(225)),	
Column('omb_part', String(225)),	
Column('warehouse_number', String(225)),	
Column('storage_type_stock_placement', String(225)),	
Column('storage_type_stock_removement', String(225)),	
Column('release', String(225)),	
Column('release_date', String(225)),	
Column('release_type', String(225)),	
Column('release_action_code', String(225)),	
Column('active_material', String(225)),	
Column('plant_calendar', String(225)),	
Column('document_number', String(225)),	
Column('sid_client', String(225)),	
Column('snapdate', String(225)),	
Column('snaptimestamp', String(225)),	
Column('load_date', String(225)),	
Column('load_timestamp', String(225)),	
Column('_load_date', String(225))
)

# dbPlanner = Table ( 
#                    "Planner", 
#                    meta,
#                    Column("material", String(225)),
#                    Column("planner_id", String(225)),
#                    Column("planner_name", String(225)),
#                    Column("email", String(225))
#                 )

# dbHealthScore = Table (
#                     "HealthScore", 
#                     meta,
#                     Column("material", String(225)),
#                     Column("healthscoredate", DateTime()),
#                     Column("healthstatus", String(225)),
#                     Column("suppliernumber", String(225)),
#                     Column("partdescription", String(225)),
#                     Column("partdescriptioneng", String(225)),
#                     Column("plant", String(225)),
#                     Column("safetystock", Integer),
#                     Column("storagelocation", String(225)) 
#                 )

# dbExceptionManager = Table (
#                     "ExceptionManager", 
#                     meta,
#                     Column('exceptionID', Integer, primary_key=True),
#                     Column('message', String(225)),
#                     Column('count', String(225)),
#                     Column('percentage', String(225))
#                 )


# dbExceptionManager = Table (
#                     "Exception", 
#                     meta,
#                     Column('exceptionID', Integer, primary_key=True),
#                     Column('message', String(225)),
#                     Column('count', String(225)),
#                     Column('percentage', String(225))
#                 )

dbExceptionManager = Table (
                    "Exception", 
                    meta,
                    Column('mandt', String(225)),
                    Column('matnr', String(225)),
                    Column('aline', String(225)),
                    Column('cdate', String(225)),
                    Column('ctime', String(225)),
                    Column('dat00', String(225)),
                    Column('delb0', String(225)),
                    Column('extra', String(225)),
                    Column('umdat', String(225)),
                    Column('auskt', Integer),
                    Column('mng01', String(225)),
                    Column('mng02', String(225)),
                    Column('p_ingestday', String(225)),
                    Column('p_ingesttime', String(225))
				)

dbmd04 = Table(
            "MD04",
            meta,
            Column("material", String(225)),
            Column("plant", String(225)),
            Column("demand_date", String(225)),
            Column("mrp_element", String(225)),
            Column("change_quantity", Integer),
            Column("total_quantity", Integer),
            Column("storage_location", String(225)),
            Column("supplier_nr", String(225)),
            Column("planner", String(225)),
            Column("line_index", String(225))  
    )

                  
meta.create_all(engine) 