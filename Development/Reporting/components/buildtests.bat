@echo on


setlocal

REM Move to the current directory
cd /d %~dp0
set current=%~dp0

call .\reportingenv.bat
IF ERRORLEVEL 1 goto BUILDERROR

cd %current%

set BI_BUILDFILE=%REPORTING_ENV%/scripts/rep_test.xml

call setcomponentorder.bat
IF ERRORLEVEL 1 goto BUILDERROR


if exist %REPORTING_DIR%\components\customtests.xml (
  set BI_BUILDFILE=%REPORTING_DIR%\components\customtests.xml
) else (
  echo cannot find %REPORTING_DIR%\components\customtests.xml 
)

echo buildfile is:%BI_BUILDFILE%   %BI_BUILD_PROPS%

ant -buildfile %BI_BUILDFILE% =-DREPORTING_DIR="%REPORTING_DIR%"  -DREPORTING_ENV="%REPORTING_ENV%" -DBI_COMPONENT_ORDER="%BI_COMPONENT_ORDER%" %*
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