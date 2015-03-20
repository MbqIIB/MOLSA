proc deploy_AllETL {} {

OMBCONNECT  %CONNECT% USE WORKSPACE '%CURAM_WORKSPACE%'
OMBCC '%PROJECT%'
OMBCONNECT CONTROL_CENTER

puts "Connected to Control Center"

set ModList [ OMBLIST ORACLE_MODULES '%MODULE%']
set i 1

foreach ModName $ModList {

  OMBCC '$ModName'

  puts "Deploying ETL's from Oracle module <$ModName>"

  set mapList [ OMBLIST MAPPINGS '.*._ETL' ]
  set J 1

  foreach mapName $mapList {

OMBCREATE TRANSIENT DEPLOYMENT_ACTION_PLAN 'DROP_DEPLOY_PLAN$mapName' ADD ACTION 'DEPLOY_MAP' SET PROPERTIES (OPERATION) VALUES ('DROP') SET REFERENCE MAPPING '$mapName'
OMBDEPLOY DEPLOYMENT_ACTION_PLAN 'DROP_DEPLOY_PLAN$mapName'

OMBDROP DEPLOYMENT_ACTION_PLAN 'DROP_DEPLOY_PLAN$mapName'


OMBCREATE TRANSIENT DEPLOYMENT_ACTION_PLAN 'CREATE_DEPLOY_PLAN$mapName' ADD ACTION 'DEPLOY_MAP' SET PROPERTIES (OPERATION) VALUES ('CREATE') SET REFERENCE MAPPING '$mapName'

    if [catch { set retstr [OMBDEPLOY DEPLOYMENT_ACTION_PLAN 'CREATE_DEPLOY_PLAN$mapName' ] } errmsg] {
          puts "    Error on executing deployment plan $mapName: $errmsg"
     } 
     
      if [string match *does?not?exist* $errmsg] {
          puts "  OWB Error: an error occurred during the deployment of $mapName $errmsg"
      }  else {
         puts "Mapping $mapName deployed $retstr"
      }



OMBDROP DEPLOYMENT_ACTION_PLAN 'CREATE_DEPLOY_PLAN$mapName'   

    OMBCOMMIT
    
    incr J
  }

  incr i
  OMBCC '/%PROJECT2%'
}
OMBDISCONNECT
puts "Status=Success. All ETL's deployed, disconnected from repository. Check the Control Center to ensure the ETLs have deployed"
}

