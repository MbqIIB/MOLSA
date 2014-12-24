

connect to %createBIDB% user %DB2USER% using %DB2USERP%

select 'about to drop table spaces and %createBIDB% database ' from sysibm.sysdummy1

drop tablespace %createBIDB%_LBI
drop tablespace %createBIDB%_TBI
drop BUFFERPOOL %createBIDB%_HIGHBI
connect reset 
DROP DB %createBIDB%



