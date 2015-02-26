E:
CD E:\IBM\Curam\Runtime
call SetEnvironment.bat

set JAVA_HOME=C:\Program Files\Java\jdk1.6.0_45
set path=%JAVA_HOME%\bin;%path%

call build runbatch -Dbatch.program=curam.core.intf.DetermineProductDeliveryEligibility.process -Dbatch.username=SYSTEM -Djava.maxmemory=1500m -Djava.extra.jvmargs="-XX:MaxPermSize=512M"
call build runbatch -Dbatch.program=curam.core.intf.GenerateInstructionLineItems.processAllFinancialComponentsDue   -Dbatch.username=SYSTEM -Djava.maxmemory=1500m -Djava.extra.jvmargs="-XX:MaxPermSize=512M"
call build runbatch -Dbatch.program=curam.core.intf.GenerateInstruments.processInstructionLineItemsDue   -Dbatch.username=SYSTEM -Djava.maxmemory=1500m -Djava.extra.jvmargs="-XX:MaxPermSize=512M"
call build runbatch -Dbatch.program=curam.molsa.eft.batch.intf.MOLSAGenerateEFTBatch.process -Dbatch.username=SYSTEM -Djava.maxmemory=1500m -Djava.extra.jvmargs="-XX:MaxPermSize=512M"
