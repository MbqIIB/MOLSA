set RC=
@echo off


setlocal
REM Move to the current directory
cd /d %~dp0
set current=%~dp0

if exist ..\..\SetEnvironment.bat call ..\..\SetEnvironment.bat
if exist ..\SetEnvironmentBI.bat call ..\SetEnvironmentBI.bat
call setreportingenv.bat
IF ERRORLEVEL 1 goto BUILDERROR

cd %current=%

if exist %current%appbuild.bat (
 echo Please use appbuild instead of build.
 goto EXIT
)

set BI_BUILDFILE=%current%build.xml

if exist %current%custom.xml set BI_BUILDFILE=%current%custom.xml

echo buildfile is:%BI_BUILDFILE%   %BI_BUILD_PROPS%

call ant -buildfile %BI_BUILDFILE% %BI_BUILD_PROPS% %*
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


