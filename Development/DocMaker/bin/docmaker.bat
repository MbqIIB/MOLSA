@echo off

REM Copyright 2003-2005 Curam Software Ltd.
REM All rights reserved.
REM
REM This software is the confidential and proprietary information of Curam
REM Software, Ltd. ("Confidential Information"). You shall not disclose such
REM Confidential Information and shall use it only in accordance with the
REM terms of the license agreement you entered into with Curam Software.

REM Note that environment variables that are set to quoted values will cause
REM these tests to fail. If there are spaces in a path, the value of the
REM environment variable need not and must not contain quotation marks.

if "%DOCMAKER_HOME%"=="" goto noDMHome
if not exist "%DOCMAKER_HOME%\bin\docmaker.bat" goto noDM

if "%JAVA_HOME%"=="" goto noJavaHome
if not exist "%JAVA_HOME%\bin\java.exe" goto noJava

setlocal

REM Set the default output folder if not already set.
if "%DOCMAKER_OUT_DIR%"=="" set DOCMAKER_OUT_DIR=doc

REM Set the default input folder if not already set.
if "%DOCBOOK_SRC_DIR%"=="" set DOCBOOK_SRC_DIR=%CD%

set DOCMAKER_LIB=%DOCMAKER_HOME%\lib
set ANT_HOME=%DOCMAKER_LIB%\apache-ant

REM Increase the memory available to Java to support PDF conversion unless
REM options are aready set.
if "%ANT_OPTS%"=="" set ANT_OPTS=-Xmx512m

set ANT_ARGS=-Dbasedir="%DOCBOOK_SRC_DIR%" -Ddocmaker.dir="%DOCMAKER_HOME%" -Dout.dir="%DOCMAKER_OUT_DIR%" -f "%DOCMAKER_HOME%\bin\docmaker.xml"

REM Ant will take care of more stringent checking for the presence of Java
call "%ANT_HOME%\bin\ant.bat" %*
goto end

:noDMHome
echo ERROR: The DOCMAKER_HOME environment variable is not set.
goto badInstall

:noDM
echo ERROR: The DOCMAKER_HOME environment variable is set incorrectly.
goto badInstall

:noJavaHome
echo ERROR: The JAVA_HOME environment variable is not set.
goto badInstall

:noJava
echo ERROR: The JAVA_HOME environment variable is set incorrectly.
goto badInstall

:badInstall
echo DocMaker has not been installed correctly. Please read and follow
echo the installation instructions and try again.

:end
endlocal
