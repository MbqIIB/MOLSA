call build runbatch -Dbatch.program=curam.core.intf.GenerateInstructionLineItems.processAllFinancialComponentsDue   -Dbatch.username=SYSTEM
call build runbatch -Dbatch.program=curam.core.intf.GenerateInstruments.processInstructionLineItemsDue   -Dbatch.username=SYSTEM
call build runbatch -Dbatch.program=curam.molsa.eft.batch.intf.MOLSAGenerateEFTBatch.process -Dbatch.username=SYSTEM
