@ECHO off

call ..\SetEnvironment.bat

set controldir=%CURAM_DIR%\EJBServer\buildlogs
set maincontrolfile=%controldir%\FinancialMainBatchSchedule.txt
set midcontrolfile=%controldir%\FinancialMidBatchSchedule.txt

echo ...
echo ...

IF EXIST %maincontrolfile% (
    echo Prior to execute Financial Scheduler Main Financial Batch, Control File [%maincontrolfile%] exists..
	del %maincontrolfile%
	echo Prior to execute Financial Scheduler Main Financial Batch, Control File [%maincontrolfile%] deleted..
) ELSE (
	echo Prior to execute Financial Scheduler Main Financial Batch, Control File [%maincontrolfile%] NOT exists..
)

echo ...
echo ...

IF EXIST %midcontrolfile% (
    echo Prior to execute Financial Scheduler Mid Financial Batch, Control File [%midcontrolfile%] exists..
	del %midcontrolfile%
	echo Prior to execute Financial Scheduler Mid Financial Batch, Control File [%midcontrolfile%] deleted..
) ELSE (
	echo Prior to execute Financial Scheduler Mid Financial Batch, Control File [%midcontrolfile%] NOT exists..
)

REM 
echo ...
echo ...
echo Executing Financial Schedule Control Batch... 
call build runbatch -Dbatch.program=curam.molsa.financial.batch.intf.MOLSAFinancialScheduleBatch.process -Dbatch.username=SYSTEM -Djava.maxmemory=1500m -Djava.extra.jvmargs="-XX:MaxPermSize=512M"


IF NOT EXIST %maincontrolfile% (
	echo ...
	echo ...	
	echo Main Financial Batch Control File [%maincontrolfile%] not generated to execute Financial Batches..
	goto midbatchesprocessing
)

echo ...
echo ...
echo Main Financial Batch Control File [%maincontrolfile%] is generated
echo Executing Financial Main Batches... 

:: Call MAIN FinancialBatches
REM ----------------------
REM call build runbatch -Dbatch.program=curam.core.intf.DetermineProductDeliveryEligibility.process -Dbatch.username=SYSTEM -Djava.maxmemory=1500m -Djava.extra.jvmargs="-XX:MaxPermSize=512M"
REM call build runbatch -Dbatch.program=curam.core.intf.GenerateInstructionLineItems.processAllFinancialComponentsDue   -Dbatch.username=SYSTEM -Djava.maxmemory=1500m -Djava.extra.jvmargs="-XX:MaxPermSize=512M"
REM call build runbatch -Dbatch.program=curam.core.intf.GenerateInstruments.processInstructionLineItemsDue   -Dbatch.username=SYSTEM -Djava.maxmemory=1500m -Djava.extra.jvmargs="-XX:MaxPermSize=512M"
REM call build runbatch -Dbatch.program=curam.molsa.eft.batch.intf.MOLSAGenerateEFTBatch.process -Dbatch.username=SYSTEM -Djava.maxmemory=1500m -Djava.extra.jvmargs="-XX:MaxPermSize=512M"
REM The below batch is used to run to help the Cognos Reporting.
REM call build runbatch -Dbatch.program=curam.molsa.cognos.reporting.intf.MOLSACognosReportHelperBatch.process -Dbatch.username=SYSTEM -Djava.maxmemory=1500m -Djava.extra.jvmargs="-XX:MaxPermSize=512M"

goto:endProcessing



:midbatchesprocessing

IF NOT EXIST %midcontrolfile% (
	echo ...
	echo ...	
	echo Mid Financial Batch Control File [%midcontrolfile%] not generated to execute Financial Batches..
	goto endProcessing
)

echo ...
echo ...
echo Mid Financial Batch Control File [%midcontrolfile%] is generated
echo Executing Financial Mid Financial Batches... 

:: Call MID FinancialBatches
:: ----------------------



goto:endProcessing



:midcontrolfilenotfound
echo ...
echo ...
echo Mid Financial Batch Control File [%midcontrolfile%] not found to execute Financial Batches..

goto:eof


:endProcessing
echo ...
echo ...
IF EXIST %maincontrolfile% (
    echo Main Financial Batch Control file exist...
	del %maincontrolfile%
	echo Main Financial Batch Control file [%maincontrolfile%] deleted.. 
) 

IF EXIST %midcontrolfile% (
    echo Mid Financial Batch Control file exist...
	del %midcontrolfile%
	echo Mid Financial Batch Control file [%midcontrolfile%] deleted.. 
) 


