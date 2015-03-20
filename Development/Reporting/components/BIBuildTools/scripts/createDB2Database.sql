
CREATE DATABASE %createBIDB%  AUTOMATIC STORAGE YES  ON '%DB2DRIVE%' DBPATH ON '%DB2DRIVE%' ALIAS %createBIDB%  USING CODESET UTF-8 TERRITORY US COLLATE USING SYSTEM PAGESIZE 32 K WITH 'Curam %createBIDB% BI Schema' 

connect to %createBIDB% user %DB2USER% using %DB2USERP%


select 'created %createBIDB% database, about to configure tablespaces' from sysibm.sysdummy1


CREATE BUFFERPOOL %createBIDB%_HIGHBI SIZE 250 PAGESIZE 32K

create tablespace %createBIDB%_LBI PAGESIZE 32K MANAGED BY SYSTEM using ('%DB2DIR%\tablespaces\%createBIDB%\Curam_LBI') BUFFERPOOL %createBIDB%_HIGHBI

select 'created BUFFERPOOL %createBIDB%_HIGHBI' from sysibm.sysdummy1


create user temporary tablespace %createBIDB%_TBI PAGESIZE 32K MANAGED BY AUTOMATIC STORAGE EXTENTSIZE 16 OVERHEAD 10.5 PREFETCHSIZE 16 TRANSFERRATE 0.14 BUFFERPOOL %createBIDB%_HIGHBI

select 'created user temporary tablespace %createBIDB%_TBI PAGESIZE' from sysibm.sysdummy1

connect reset 

connect to %createBIDB% user %DB2USER% using %DB2USERP%


