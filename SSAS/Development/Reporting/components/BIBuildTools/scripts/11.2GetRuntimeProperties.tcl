proc configureRunTimeProperties {} {


# e.g. c:\\runtime.log
if [catch { set errorLogs [open "%LOG_FILE%" {WRONLY TRUNC} ] } errmsg] {
          puts "    Error : $errmsg"
} 
    
set timestamp [clock format [clock seconds]]
puts $errorLogs "$timestamp - Verify MAXIMUM_NUMBER_OF_ERRORS is set to %MAX_NUMBER_OF_ERRORS_PARAM%."


OMBCONNECT  %CONNECT% USE WORKSPACE '%CURAM_WORKSPACE%'
# for example the connect url will have the following format.
#OMBCONNECT  curambi/?@localhost:1521:orcl USE WORKSPACE 'CURAMBI.CURAMBI'

puts "Connected..."
puts $errorLogs "Connected..."

OMBCC 'REPORTING'
puts "Connected to REPORTING"

OMBCONNECT CONTROL_CENTER
puts "Connected to Control Center"
puts $errorLogs "Connected to Control Center"


set ModList [OMBLIST ORACLE_MODULES]
set i 1

foreach ModName $ModList {
  
  if [catch { set retstr [OMBCC '$ModName' ] } errmsg] {
          puts "    Error: setting MAXIMUM_NUMBER_OF_ERRORS for '$mapName': $errmsg"
  }   

  puts "$retstr <$ModName>"
  puts $errorLogs "$retstr  <$ModName>"
  set mapList [ OMBLIST MAPPINGS '.*._ETL' ]
  set J 1

  foreach mapName $mapList {

    if [catch { set maxErrors [OMBRETRIEVE MAPPING '$mapName' GET PROPERTIES(MAXIMUM_NUMBER_OF_ERRORS)] } errmsg] {
          puts "    Error: getting MAXIMUM_NUMBER_OF_ERRORS for : $errmsg"
          puts $errorLogs "Error: Error getting MAXIMUM_NUMBER_OF_ERRORS for : $errmsg"
    } 
    
    if {$maxErrors == "%MAX_NUMBER_OF_ERRORS_PARAM%"} {
       #puts " $mapName MAXIMUM_NUMBER_OF_ERRORS already set to zero "
       puts $errorLogs "Info: $mapName MAXIMUM_NUMBER_OF_ERRORS already set to zero "
    } else {
       puts $errorLogs "Warning: $mapName MAXIMUM_NUMBER_OF_ERRORS set to $maxErrors, reommended value is 0"	
       puts " Warning: $mapName MAXIMUM_NUMBER_OF_ERRORS set to $maxErrors, reommended value is 0"	
	}
    incr J
  }
  puts " Info: all mappings checked for <$ModName>"	
  puts $errorLogs " Info: all mappings checked for <$ModName>"
  if [catch { set retstr [OMBCOMMIT] } errmsg] {
            puts "    Error: $errmsg"
  } 
  
  incr i
  OMBCC '/REPORTING'
}
OMBDISCONNECT
 puts $errorLogs " Info: disconnected"

 puts "Done"
 puts $errorLogs "Done"
 puts $errorLogs "closing file..."


}

