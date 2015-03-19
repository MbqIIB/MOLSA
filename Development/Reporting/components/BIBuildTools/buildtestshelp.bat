@echo on

set current=%cd%


ant -f %current%\tests\runtests.xml -DREPORTING_DIR="%REPORTING_DIR%" -DREPORTING_ENV="%REPORTING_ENV%" -projecthelp
