puts "About to drop project  %REPORTING_NAME%"


set retstr  " "

if [catch { set retstr [OMBCONNECT  %CONNECT% USE WORKSPACE '%CURAM_WORKSPACE%'] } errmsg] {
        puts "  OWB Error: OMBCONNECT  %CONNECT% USE WORKSPACE %CURAM_WORKSPACE% $errmsg"
}   
puts "  OWB Message:--$retstr--"

puts "  Connected to %CURAM_WORKSPACE%"


if [catch { set retstr [OMBDROP PROJECT '%REPORTING_NAME%'] } errmsg] {
        puts "  OWB Error: OMBDROP PROJECT %REPORTING_NAME% $errmsg"
}   
puts "  OWB Message:--$retstr--"

OMBCOMMIT    
puts "Committed"

OMBDISCONNECT
puts "Disconnected"
