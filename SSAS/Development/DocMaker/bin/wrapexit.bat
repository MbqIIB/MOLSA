@echo off
rem Copyright (c) 2004 Curam Software Ltd.
rem All rights reserved.
rem
rem This software is the confidential and proprietary information of Curam
rem Software, Ltd. ("Confidential Information"). You shall not disclose such
rem Confidential Information and shall use it only in accordance with the
rem terms of the license agreement you entered into with Curam Software.

rem Call the DocMaker targets and then exit to propagate the error level
rem back to the controlling "cmd.exe". This is useful when "docmaker.bat"
rem needs to be invoked from an Ant script.
call "%~dp0docmaker.bat" %*
exit %ERRORLEVEL%
