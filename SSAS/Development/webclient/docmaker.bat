title docmaker

if exist ../SetEnvironment.bat call ../SetEnvironment.bat

if "%ANT_OPTS%" == "" (
  SET ANT_OPTS=-Xmx1024m
)

call "%DOCMAKER_HOME%\bin\wrapexit.bat" %*