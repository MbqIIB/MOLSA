proc configureRunTimeProperties {} {

# e.g. c:\\runtime.log
if [catch { set errorLogs [open "%LOG_FILE%" {WRONLY TRUNC} ] } errmsg] {
          puts "    Error  : $errmsg"
} 

OMBCONNECT  %CONNECT% USE WORKSPACE '%CURAM_WORKSPACE%'
# for example the connect url will have the following format.
#OMBCONNECT  curambi/?@localhost:1521:orcl USE WORKSPACE 'CURAMBI.CURAMBI'

puts "Connected..."
puts $errorLogs "Connected..."

OMBCC 'REPORTING'
puts "Connected to REPORTING"
puts $errorLogs "Connected to REPORTING"

OMBCONNECT CONTROL_CENTER
puts "Connected to Control Center"
puts $errorLogs "Connected to Control Center"

set ModList [OMBLIST ORACLE_MODULES]
set i 1

foreach ModName $ModList {

  
  if [catch { set retstr [OMBCC '$ModName' ] } errmsg] {
          puts "    Error: setting MAXIMUM_NUMBER_OF_ERRORS for '$mapName': $errmsg"
  }   

  puts "$retstr to <$ModName>"

  set mapList [ OMBLIST MAPPINGS '.*._ETL' ]
  set J 1

  foreach mapName $mapList {

    if [catch { set maxErrors [OMBRETRIEVE MAPPING '$mapName' GET PROPERTIES(MAXIMUM_NUMBER_OF_ERRORS)] } errmsg] {
          puts "    Error: setting MAXIMUM_NUMBER_OF_ERRORS for : $errmsg"
          puts $errorLogs "Error: setting MAXIMUM_NUMBER_OF_ERRORS for : $errmsg"
		  
    } 
    

    if {$maxErrors == "0"} {
       puts $errorLogs  " Info:$mapName MAXIMUM_NUMBER_OF_ERRORS already set to zero "

    } else {
    
      if [catch { set retstr [OMBALTER MAPPING '$mapName' SET PROPERTIES (MAXIMUM_NUMBER_OF_ERRORS) VALUES ('%MAX_NUMBER_OF_ERRORS_PARAM%') ] } errmsg] {
          puts "    Error: setting MAXIMUM_NUMBER_OF_ERRORS for '$mapName': $errmsg"
           puts $errorLogs  "    Error: setting MAXIMUM_NUMBER_OF_ERRORS for '$mapName': $errmsg"
		  
      } 
     
      if [string match *does?not?exist* $errmsg] {
          puts "  Error: an error occurred during the deployment of $mapName $errmsg"
      }  else {
         puts " Warning: $mapName MAXIMUM_NUMBER_OF_ERRORS is $maxErrors setting to %MAX_NUMBER_OF_ERRORS_PARAM%"
      }    

      incr J
    }
  }
  if [catch { set retstr [OMBCOMMIT] } errmsg] {
            puts "    Error: $errmsg"
  } 
  

  incr i
  OMBCC '/REPORTING'
}
OMBDISCONNECT
 
 puts "Status=Success. All ETL MAXIMUM_NUMBER_OF_ERRORS set to %MAX_NUMBER_OF_ERRORS_PARAM%"
 puts $errorLogs "Status=Success. All ETL MAXIMUM_NUMBER_OF_ERRORS set to %MAX_NUMBER_OF_ERRORS_PARAM%"
 puts $errorLogs "closing file..."
 
 }

