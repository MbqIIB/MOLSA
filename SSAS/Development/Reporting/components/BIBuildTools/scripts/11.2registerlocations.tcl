
proc unregisterLocation {inName} {

    puts "un registering loaction ${inName}"
     if [catch { set retstr [OMBUNREGISTER LOCATION '${inName}' ] } errmsg] {
              puts "  OWB Error: OMBUNREGISTER LOCATION '${inName}' $errmsg"
    }   
    puts " OWB Message:--$retstr--"
}

proc registerUser {inName} {
  puts "registering ${inName}"
  set testmodule "none"
  catch {set testmodule [ OMBRETRIEVE USER '${inName}' GET PROPERTIES (NAME)]}
  puts "  searching for ${inName}, found $testmodule" 

   if { $testmodule == "${inName}" } { 
    puts "  user already exists, unregister and reqistering $testmodule again" 

    if [catch { set retstr [OMBUNREGISTER USER '${inName}' ] } errmsg] {
              puts "  OWB Error: OMBUNREGISTER USER '${inName}' $errmsg"
    }   
    puts " OWB Message:--$retstr--"

    if [catch { set retstr [OMBREGISTER USER '${inName}'  ] } errmsg] {
              puts "  OWB Error: OMBREGISTER USER '${inName}' $errmsg"
    }   
    puts " OWB Message:--$retstr--"


   } else {
   puts " registering ${inName}"
    if [catch { set retstr [OMBREGISTER USER '${inName}'  ] } errmsg] {
              puts "  OWB Error: OMBREGISTER USER '${inName}' "
    }   
    puts " OWB Message:--$errmsg--" 
   }

}

proc deploy_AllLocations {} {

  puts "Alter locations -------------"

  if [catch { set retstr [OMBALTER LOCATION 'STATIC_DATA_LOCATION' SET PROPERTIES (HOST, ROOTPATH, USER, PASSWORD) VALUES ('%SERVER%', '%STATIC_DATA%', '%STAGING%', '%STAGING_P%')  ] } errmsg] {
                puts "  OWB Error: OMBALTER LOCATION STATIC_DATA_LOCATION $errmsg"
  }   
  puts " OWB Message:--$retstr--"

  if [catch { set retstr [OMBALTER LOCATION 'SOURCE_LOCATION' SET PROPERTIES (HOST, PORT,SERVICE, USER, SCHEMA, PASSWORD) VALUES ('%SOURCE_SERVER%', %SOURCE_PORT%, '%SOURCE_NETSERVICENAME%', '%CURAMSOURCE%', '%CURAMSOURCE%', '%CURAMSOURCE_P%') ] } errmsg] {
              puts "  OWB Error: OMBREGISTER USER 'SOURCE_LOCATION' "
  }   
  puts "    OWB Message:--$errmsg--"   


  if [catch { set retstr [OMBALTER LOCATION 'STAGING_LOCATION' SET PROPERTIES (HOST, PORT, SERVICE, USER, SCHEMA, PASSWORD) VALUES ('%STAGING_SERVER%', %STAGING_PORT%, '%STAGING_NETSERVICENAME%', '%STAGING%', '%STAGING%', '%STAGING_P%')   ] } errmsg] {
              puts "  OWB Error: OMBREGISTER USER 'STAGING_LOCATION' "
  }   
  puts "    OWB Message:--$errmsg--" 


  if [catch { set retstr [OMBALTER LOCATION 'CDW_LOCATION' SET PROPERTIES (HOST, PORT, SERVICE, USER, SCHEMA, PASSWORD) VALUES ('%CENTRAL_SERVER%', %CENTRAL_PORT%, '%CENTRAL_NETSERVICENAME%', '%CENTRAL%', '%CENTRAL%', '%CENTRAL_P%')  ] } errmsg] {
              puts "  OWB Error: OMBREGISTER USER 'CDW_LOCATION' "
  }   
  puts "    OWB Message:--$errmsg--" 


  if [catch { set retstr [OMBALTER LOCATION 'DATAMARTS_LOCATION' SET PROPERTIES (HOST, PORT, SERVICE, USER, SCHEMA, PASSWORD) VALUES ('%DATAMARTS_SERVER%', %DATAMARTS_PORT%, '%DATAMARTS_NETSERVICENAME%', '%DATAMART%', '%DATAMART%', '%DATAMART_P%') ] } errmsg] {
              puts "  OWB Error: OMBREGISTER USER 'DATAMARTS_LOCATION' "
  }   

  OMBCOMMIT
  puts "Alter locations completed -------------"

  puts "Register location properties-----"

  if [catch { set retstr [OMBREGISTER LOCATION 'STATIC_DATA_LOCATION'] } errmsg] {
              puts "  OWB Error: OMBREGISTER LOCATION '%STAGING%' "
  }   
  puts "    OWB Message:--$errmsg--"   
  OMBCOMMIT

  if [catch { set retstr [OMBREGISTER LOCATION 'SOURCE_LOCATION'] } errmsg] {
              puts "  OWB Error: OMBREGISTER LOCATION '%STAGING%' "
  }   
  puts "    OWB Message:--$errmsg--"   
  OMBCOMMIT

  if [catch { set retstr [OMBREGISTER LOCATION 'STAGING_LOCATION'] } errmsg] {
              puts "  OWB Error: OMBREGISTER LOCATION '%STAGING%' "
  }   
  puts "    OWB Message:--$errmsg--"   
  OMBCOMMIT

  if [catch { set retstr [OMBREGISTER LOCATION 'CDW_LOCATION'] } errmsg] {
              puts "  OWB Error: OMBREGISTER LOCATION '%STAGING%' "
  }   
  puts "    OWB Message:--$errmsg--"  
  OMBCOMMIT


  if [catch { set retstr [OMBREGISTER LOCATION 'DATAMARTS_LOCATION'] } errmsg] {
              puts "  OWB Error: OMBREGISTER LOCATION '%STAGING%' "
  }   
  puts "    OWB Message:--$errmsg--"  

  OMBCOMMIT

  puts "Register location properties completed-----"

 
}



proc deploy_AllConnectors {} {
puts "deploy_AllConnectors-----"

OMBCONNECT  %CONNECT% USE WORKSPACE '%CURAM_WORKSPACE%'
OMBCC '%PROJECT%'
OMBCONNECT CONTROL_CENTER


set ModList [ OMBLIST LOCATIONS ]
set i 1

foreach ModName $ModList {

  puts " "

  set mapList [ OMBLIST CONNECTORS '$ModName']
  set J 1
  
  foreach mapName $mapList {
  
  OMBCREATE TRANSIENT DEPLOYMENT_ACTION_PLAN 'DROP_DEPLOY_PLAN$mapName' ADD ACTION 'DEPLOY_MAP' SET PROPERTIES (OPERATION) VALUES ('DROP') SET REFERENCE CONNECTOR '$ModName/$mapName'
  OMBDEPLOY DEPLOYMENT_ACTION_PLAN 'DROP_DEPLOY_PLAN$mapName'
  OMBDROP DEPLOYMENT_ACTION_PLAN 'DROP_DEPLOY_PLAN$mapName'

  OMBCREATE TRANSIENT DEPLOYMENT_ACTION_PLAN 'CREATE_DEPLOY_PLAN$mapName' ADD ACTION 'DEPLOY_MAP' SET PROPERTIES (OPERATION) VALUES ('CREATE') SET REFERENCE CONNECTOR '$ModName/$mapName'
  
if [catch { set retstr [OMBDEPLOY DEPLOYMENT_ACTION_PLAN 'CREATE_DEPLOY_PLAN$mapName' ] } errmsg] {
    puts "    Error on executing deployment plan $mapName: $errmsg"
} 


if [string match *ORA* $errmsg] {
    puts "  OWB Error: an error occurred during the deployment of $mapName, $errmsg"
} 

if [string match *OMB* $errmsg] {
    puts "  OWB Error: an error occurred during the deployment of $mapName, $errmsg"
}   else {
   puts "    OWB Message--$retstr--"
}
  
  OMBDROP DEPLOYMENT_ACTION_PLAN 'CREATE_DEPLOY_PLAN$mapName'   
      OMBCOMMIT
    

    incr J
  }
  
  incr i

}
OMBDISCONNECT
puts "deploy_AllConnectors  completed-----"

}

proc deploy_AllExternalTables {} {
puts "deploy_AllExternalTables-----"

OMBCONNECT  %CONNECT% USE WORKSPACE '%CURAM_WORKSPACE%'
OMBCC '%PROJECT%'
OMBCONNECT CONTROL_CENTER
puts " "

set ModList [ OMBLIST ORACLE_MODULES]
set i 1

foreach ModName $ModList {

  OMBCC '$ModName'
  puts ""

  set mapList [ OMBLIST EXTERNAL_TABLES  ]
  set J 1

  foreach mapName $mapList {
OMBCREATE TRANSIENT DEPLOYMENT_ACTION_PLAN 'DROP_DEPLOY_PLAN$mapName' ADD ACTION 'DEPLOY_MAP' SET PROPERTIES (OPERATION) VALUES ('DROP') SET REFERENCE EXTERNAL_TABLE '$mapName'
OMBDEPLOY DEPLOYMENT_ACTION_PLAN 'DROP_DEPLOY_PLAN$mapName'

OMBDROP DEPLOYMENT_ACTION_PLAN 'DROP_DEPLOY_PLAN$mapName'


OMBCREATE TRANSIENT DEPLOYMENT_ACTION_PLAN 'CREATE_DEPLOY_PLAN$mapName' ADD ACTION 'DEPLOY_MAP' SET PROPERTIES (OPERATION) VALUES ('CREATE') SET REFERENCE EXTERNAL_TABLE '$mapName'

if [catch { set retstr [OMBDEPLOY DEPLOYMENT_ACTION_PLAN 'CREATE_DEPLOY_PLAN$mapName'] } errmsg] {
    puts "    Error on executing deployment plan $mapName: $errmsg"
} 

if [string match *ORA* $errmsg] {
    puts "  OWB Error: an error occurred during the deployment of $mapName, $errmsg"
} 

if [string match *OMB* $errmsg] {
    puts "  OWB Error: an error occurred during the deployment of $mapName, $errmsg"
}  else {
   puts "    OWB Message--$retstr--"
}
  
OMBDROP DEPLOYMENT_ACTION_PLAN 'CREATE_DEPLOY_PLAN$mapName'   

    OMBCOMMIT
    

    incr J
  }

  incr i
  OMBCC '..'

}
OMBDISCONNECT
puts "deploy_AllExternalTables completed -----"
}


proc deploy_PreAccessRights {} {

OMBCONNECT  %CONNECT% USE WORKSPACE '%CURAM_WORKSPACE%'
OMBCC '%PROJECT%'
OMBCONNECT CONTROL_CENTER

 if [catch { set retstr [OMBCONNECT CONTROL_CENTER ] } errmsg] {
          puts "  OWB Error: MBCONNECT CONTROL_CENTER"
     } 
 
puts "OWB Message:--$errmsg--"


puts "Un Registering locations----------------------"
if [catch { set retstr [OMBUNREGISTER LOCATION 'STATIC_DATA_LOCATION'] } errmsg] {
        puts "  OWB Error: OMBUNREGISTER LOCATION STATIC_DATA_LOCATION $errmsg"
}   
puts "  OWB Message:--$retstr--"
unregisterLocation SOURCE_LOCATION
unregisterLocation STAGING_LOCATION
unregisterLocation CDW_LOCATION
unregisterLocation DATAMARTS_LOCATION
OMBCOMMIT
puts "Un Registering committed----------------------"

puts "Registering owb users----------------------"
registerUser %STAGING%
registerUser %CENTRAL%
registerUser %DATAMART%

deploy_AllLocations
OMBCOMMIT
OMBDISCONNECT
deploy_AllConnectors

}

puts "Registering owb users completed-------------"






