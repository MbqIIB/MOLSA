call build runbatch -Dbatch.program=curam.core.intf.DetermineProductDeliveryEligibility.process -Dbatch.username=SYSTEM -Djava.maxmemory=1024m -Djava.extra.jvmargs="-XX:MaxPermSize=512M"
call build runbatch -Dbatch.program=curam.core.intf.GenerateInstructionLineItems.processAllFinancialComponentsDue   -Dbatch.username=SYSTEM -Djava.maxmemory=1024m -Djava.extra.jvmargs="-XX:MaxPermSize=512M"
call build runbatch -Dbatch.program=curam.core.intf.GenerateInstruments.processInstructionLineItemsDue   -Dbatch.username=SYSTEM -Djava.maxmemory=1024m -Djava.extra.jvmargs="-XX:MaxPermSize=512M"
call build runbatch -Dbatch.program=curam.molsa.eft.batch.intf.MOLSAGenerateEFTBatch.process -Dbatch.username=SYSTEM -Djava.maxmemory=1024m -Djava.extra.jvmargs="-XX:MaxPermSize=512M"
