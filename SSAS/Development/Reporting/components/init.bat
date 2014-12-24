set RC=
@echo off


setlocal
REM Move to the current directory
cd /d %~dp0
set current=%~dp0

if exist ..\..\SetEnvironment.bat call ..\..\SetEnvironment.bat

if exist .\setreportingenv.bat call setreportingenv.bat
IF ERRORLEVEL 1 goto BUILDERROR

cd %current%

echo using %REPORTING_DIR%\components\setcomponentorder.bat


if exist %current%appinit.bat (
 echo Please use init instead of appinit
 goto EXIT
)

set BI_BUILDFILE=%REPORTING_ENV%\build.xml


echo buildfile is:%BI_BUILDFILE%   %BI_BUILD_PROPS%

ant -buildfile  %BI_BUILDFILE%   -DREPORTING_DIR="%REPORTING_DIR%"  -DREPORTING_ENV="%REPORTING_ENV%" clean init.drivers  
IF ERRORLEVEL 1 goto BUILDERROR

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





