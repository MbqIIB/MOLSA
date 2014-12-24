OMBCONNECT  %CONNECT% USE WORKSPACE '%CURAM_WORKSPACE%'
OMBCC '%PROJECT%'
OMBCONNECT CONTROL_CENTER

puts "Connected to Control Center"
puts "Unregistering locations"

OMBUNREGISTER LOCATION 'STATIC_DATA_LOCATION'
puts "    Unregistered STATIC_DATA_LOCATION"

OMBUNREGISTER LOCATION 'SOURCE_LOCATION'
puts "    Unregistered SOURCE_LOCATION"

OMBUNREGISTER LOCATION 'STAGING_LOCATION'
puts "    Unregistered STAGING_LOCATION"

OMBUNREGISTER LOCATION 'CDW_LOCATION'
puts "    Unregistered CDW_LOCATION"

OMBUNREGISTER LOCATION 'DATAMARTS_LOCATION'
puts "    Unregistered DATAMARTS_LOCATION"

OMBCOMMIT

puts "Locations Unregistered - committed"

puts "About to alter location properties "


OMBALTER LOCATION 'SOURCE_LOCATION' SET PROPERTIES (HOST, PORT,SERVICE, USER, SCHEMA, PASSWORD) VALUES ('%SOURCE_SERVER%', %SOURCE_PORT%, '%SOURCE_NETSERVICENAME%', '%CURAMSOURCE%', '%CURAMSOURCE%', '%CURAMSOURCE_P%') 
puts "    <Source> location properties altered"

OMBALTER LOCATION 'STATIC_DATA_LOCATION' SET PROPERTIES (HOST, ROOTPATH, USER, PASSWORD) VALUES ('%SERVER%', '%STATIC_DATA%', '%STAGING%', '%STAGING_P%')  
puts "    <Static data> location properties altered"

OMBALTER LOCATION 'STAGING_LOCATION' SET PROPERTIES (HOST, PORT, SERVICE, USER, SCHEMA, PASSWORD) VALUES ('%STAGING_SERVER%', %STAGING_PORT%, '%STAGING_NETSERVICENAME%', '%STAGING%', '%STAGING%', '%STAGING_P%')  
puts "    <Staging> location properties altered"

OMBALTER LOCATION 'CDW_LOCATION' SET PROPERTIES (HOST, PORT, SERVICE, USER, SCHEMA, PASSWORD) VALUES ('%CENTRAL_SERVER%', %CENTRAL_PORT%, '%CENTRAL_NETSERVICENAME%', '%CENTRAL%', '%CENTRAL%', '%CENTRAL_P%')  
puts "    <Central>  location properties altered"

OMBALTER LOCATION 'DATAMARTS_LOCATION' SET PROPERTIES (HOST, PORT, SERVICE, USER, SCHEMA, PASSWORD) VALUES ('%DATAMARTS_SERVER%', %DATAMARTS_PORT%, '%DATAMARTS_NETSERVICENAME%', '%DATAMART%', '%DATAMART%', '%DATAMART_P%') 
puts "    <Datamart> location properties altered"

OMBCOMMIT

puts "<Static data>"
OMBREGISTER LOCATION 'STATIC_DATA_LOCATION'
puts "    <Static data> location registered"
OMBCOMMIT

puts "<Source>"
OMBREGISTER LOCATION 'SOURCE_LOCATION'
puts "    <Source> location registered"
OMBCOMMIT

puts "<Staging>"
OMBREGISTER LOCATION 'STAGING_LOCATION'
puts "    <Staging> location registered"
OMBCOMMIT

puts "<Central>"
OMBREGISTER LOCATION 'CDW_LOCATION'
puts "    <Central>  location registered"
OMBCOMMIT

puts "<Datamart>"
OMBREGISTER LOCATION 'DATAMARTS_LOCATION'
puts "    <Datamart> location registered"
OMBCOMMIT

OMBDISCONNECT

proc deploy_AllConnectors {} {

OMBCONNECT  %CONNECT% USE WORKSPACE '%CURAM_WORKSPACE%'
OMBCC '%PROJECT%'
OMBCONNECT CONTROL_CENTER


set ModList [ OMBLIST LOCATIONS ]
set i 1

foreach ModName $ModList {

  puts " "
  puts "<$ModName> deploying Connectors"

  set mapList [ OMBLIST CONNECTORS '$ModName']
  set J 1
  
  foreach mapName $mapList {
  
	OMBCREATE TRANSIENT DEPLOYMENT_ACTION_PLAN 'DROP_DEPLOY_PLAN$mapName' ADD ACTION 'DEPLOY_MAP' SET PROPERTIES (OPERATION) VALUES ('DROP') SET REFERENCE CONNECTOR '$ModName/$mapName'
	OMBDEPLOY DEPLOYMENT_ACTION_PLAN 'DROP_DEPLOY_PLAN$mapName'
	OMBDROP DEPLOYMENT_ACTION_PLAN 'DROP_DEPLOY_PLAN$mapName'

	OMBCREATE TRANSIENT DEPLOYMENT_ACTION_PLAN 'CREATE_DEPLOY_PLAN$mapName' ADD ACTION 'DEPLOY_MAP' SET PROPERTIES (OPERATION) VALUES ('CREATE') SET REFERENCE CONNECTOR '$ModName/$mapName'
	OMBDEPLOY DEPLOYMENT_ACTION_PLAN 'CREATE_DEPLOY_PLAN$mapName'
	OMBDROP DEPLOYMENT_ACTION_PLAN 'CREATE_DEPLOY_PLAN$mapName' 	
    	OMBCOMMIT
    
    puts "    <$mapName> deployed"	

    incr J
  }
  
  incr i

}
OMBDISCONNECT
puts "Status=Success. All connectors deployed successfully"
}

proc deploy_AllExternalTables {} {

OMBCONNECT  %CONNECT% USE WORKSPACE '%CURAM_WORKSPACE%'
OMBCC '%PROJECT%'
OMBCONNECT CONTROL_CENTER
puts " "

set ModList [ OMBLIST ORACLE_MODULES]
set i 1

foreach ModName $ModList {

  OMBCC '$ModName'
  puts " "
  puts "<$ModName> deploying external tables"

  set mapList [ OMBLIST EXTERNAL_TABLES  ]
  set J 1

  foreach mapName $mapList {
    puts "    <$mapName> in progress"	
OMBCREATE TRANSIENT DEPLOYMENT_ACTION_PLAN 'DROP_DEPLOY_PLAN$mapName' ADD ACTION 'DEPLOY_MAP' SET PROPERTIES (OPERATION) VALUES ('DROP') SET REFERENCE EXTERNAL_TABLE '$mapName'
OMBDEPLOY DEPLOYMENT_ACTION_PLAN 'DROP_DEPLOY_PLAN$mapName'

OMBDROP DEPLOYMENT_ACTION_PLAN 'DROP_DEPLOY_PLAN$mapName'


OMBCREATE TRANSIENT DEPLOYMENT_ACTION_PLAN 'CREATE_DEPLOY_PLAN$mapName' ADD ACTION 'DEPLOY_MAP' SET PROPERTIES (OPERATION) VALUES ('CREATE') SET REFERENCE EXTERNAL_TABLE '$mapName'
OMBDEPLOY DEPLOYMENT_ACTION_PLAN 'CREATE_DEPLOY_PLAN$mapName'

OMBDROP DEPLOYMENT_ACTION_PLAN 'CREATE_DEPLOY_PLAN$mapName' 	

    OMBCOMMIT
    
    puts "    <$mapName> deployed"	

    incr J
  }

  incr i
  OMBCC '..'

}
OMBDISCONNECT
puts "Status=Success. All external tables deployed successfully"
}

deploy_AllConnectors
deploy_AllExternalTables


