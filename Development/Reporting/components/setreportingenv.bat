
set RC=
@echo off
REM shipped
REM Move to the current directory
cd /d %~dp0
cd ..\

rem Set the root level Curam directory variable
set REPORTING_DIR=%cd%


rem set the reporting build tools
set REPORTING_ENV=%REPORTING_DIR%\components\BIBuildTools
cd components











rem if oracle is not available set so that the transform can be built

rem Reporting: add support for DB2 database


rem if using ORacle then set 

set CLASSPATH=%ORACLE_HOME%\JDBC\LIB\ojdbc5.jar;%CLASSPATH%

set PATH=%JAVA_HOME%\bin;%ANT_HOME%\bin;%PATH%

IF EXIST  %REPORTING_ENV%\platform.ora  (
 IF "%ORACLE_HOME%" == "" (
   rem echo  ORACLE_HOME not set, no defaults
 ) else (
   rem echo ORACLE_HOME set, defaulting RDBMS_JAVA=%ORACLE_HOME%\jdk
   SET RDBMS_JAVA=%ORACLE_HOME%\jdk
   SET OWB_HOME=%ORACLE_HOME%\owb
 )
)
rem check for db2 platform
IF EXIST  %REPORTING_ENV%\platform.db2  (
  
 IF "%INFOSPHERE_SQLLIB_DIR%"=="" (
   echo  INFOSPHERE_SQLLIB_DIR not set, no defaults...RDBMS_JAVA=%RDBMS_JAVA%
 ) 
 if not "%INFOSPHERE_SQLLIB_DIR%"=="" (
   echo  INFOSPHERE_SQLLIB_DIR set, defaulting RDBMS_JAVA=%INFOSPHERE_SQLLIB_DIR%\java\jdk
   SET RDBMS_JAVA=%INFOSPHERE_SQLLIB_DIR%\java\jdk
 ) 
)
set JAVA_HOME_RDBMS=%RDBMS_JAVA%

echo using JAVA_HOME=%JAVA_HOME%
echo using JAVA_HOME_RDBMS=%JAVA_HOME_RDBMS%




rem Set the  component orders
if exist %REPORTING_DIR%\components\setcomponentorder.bat call %REPORTING_DIR%\components\setcomponentorder.bat

set BI_BUILD_PROPS=-DREPORTING_DIR="%REPORTING_DIR%"  -DREPORTING_ENV="%REPORTING_ENV%" -DBI_COMPONENT_ORDER="%BI_COMPONENT_ORDER%"  
set ERRORLEVEL=0
goto END

rem  *********************
rem  ***  BUILD ERROR  ***
rem  *********************
:BUILDERROR
set ERRORLEVEL=1
goto END

rem  **************
rem  ***  EXIT  ***
rem  **************
:EXIT
exit /B %RC%

rem  *************
rem  ***  END  ***
rem  *************
:END
endlocal & set RC=%ERRORLEVEL%
call :EXIT %RC%