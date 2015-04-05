E:
CD E:\IBM\Curam\Runtime
call SetEnvironment.bat

set JAVA_HOME=C:\Program Files\Java\jdk1.6.0_45
set path=%JAVA_HOME%\bin;%path%

call build runbatch -Dbatch.program=curam.core.intf.CloseCasesPendingClosure.closeCasesPendingClosure -Dbatch.username=SYSTEM -Djava.maxmemory=1024m -Djava.extra.jvmargs="-XX:MaxPermSize=512M"