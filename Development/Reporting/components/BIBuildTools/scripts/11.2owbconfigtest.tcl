
OMBCONNECT  %CONNECT% USE WORKSPACE '%CURAM_WORKSPACE%'

puts "importing Curam BI locations - static location - the static data location"
OMBIMPORT FROM MDL_FILE '%STATIC_LOCATIONS_MDO%' USE UPDATE_MODE MATCH_BY NAMES

puts "importing Curam BI locations - source location - e.g. Curam DB"
OMBIMPORT FROM MDL_FILE '%SOURCE_LOCATIONS_MDO%' USE UPDATE_MODE MATCH_BY NAMES

puts "importing Curam BI locations - BI locations - e.g. Reporting Schemas"

OMBIMPORT FROM MDL_FILE '%LOCATIONS_MDO%' USE UPDATE_MODE MATCH_BY NAMES

puts "importing Curam BI ETL's for configuration testing - configtest.mdo"
OMBIMPORT FROM MDL_FILE '%CONFIGTEST_MDO%' USE UPDATE_MODE MATCH_BY NAMES
OMBCOMMIT


OMBCC 'REPORTING'
OMBCONNECT CONTROL_CENTER
puts "Connected to Control Center"

proc removeDuplicateLocations {duplicatelocation} {

 set locationModule [ OMBLIST LOCATIONS $duplicatelocation]
 puts "Looking for duplicate location $duplicatelocation found <$locationModule>"

 if { $locationModule == "STAGING_LOCATION" } { 
  puts "STAGING_LOCATION not unregistered or dropped" 
 } else {

  set ModList [ OMBLIST LOCATIONS $duplicatelocation]
  set i 1
  foreach ModName $ModList {
    OMBUNREGISTER LOCATION $duplicatelocation
    puts "$duplicatelocation unregistered"
    OMBDROP LOCATION $duplicatelocation
    OMBCOMMIT 
    puts "$duplicatelocation dropped"
  }
 }

}


removeDuplicateLocations '%STAGING%_LOCATION'
removeDuplicateLocations '%CENTRAL%_LOCATION'
removeDuplicateLocations '%DATAMART%_LOCATION'
OMBDISC 



