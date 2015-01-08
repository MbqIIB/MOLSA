set SERVER_LOCALE_LIST=en_US,en_GB,en
set LOCALE_LIST=en_US,en_GB,en
set SERVER_MODEL_NAME=Curam

set CURAM_DIR=E:\repos\SSAS\Development
set SERVER_DIR=%CURAM_DIR%\EJBServer
set CURAMSDEJ=%CURAM_DIR%\CuramSDEJ
set CLIENT_PROJECT_NAME=Curam
set CLIENT_DIR=%CURAM_DIR%\webclient
set CURAMCDEJ=%CURAM_DIR%\CuramCDEJ
set DOCMAKER_HOME=%CURAM_DIR%\DocMaker



set CLIENT_COMPONENT_ORDER=MOLSA,custom,PlatformConfig,CommonIntake,Intake,ReferralsLite,CPMReferralsLite,PCR,CREOLEProgramRecommendation,SummaryViews,CitizenContextViewer,CitizenAccount,WorkspaceServices,CitizenWorkspace,CitizenWorkspaceAdmin,FundPM,DecisionAssist,CPM,CPMExternalSecure,CPMExternalNonSecure,CPMSample,ProviderServicePlan,DynamicEvidence,CEFWidgets,IntelligentEvidenceGathering,IEGAdmin,Datastore,Editors,SupervisorWorkspace,Verification,ServicePlans,sample,CTMInfrastructure,SamplePublicAccess,SamplePublicAccessExternal,EvidenceBroker,CuramFinancialAdapter,CuramMDAdapter,Advisor,EvidenceSharing,PDC,EvidenceFlow,EventAdaptor,ValidationManager
set SERVER_COMPONENT_ORDER=MOLSA,custom,PlatformConfig,CommonIntake,Intake,ReferralsLite,CPMReferralsLite,PCR,CREOLEProgramRecommendation,SummaryViews,CitizenWorkspace,CitizenContextViewer,WorkspaceServices,CitizenWorkspaceAdmin,FundPM,DecisionAssist,CPMSample,CPM,ProviderServicePlan,DynamicEvidence,CEFWidgets,CMISInfrastructure,CMIS,IntelligentEvidenceGathering,Datastore,Editors,SupervisorWorkspace,Verification,ServicePlans,sample,CTMInfrastructure,SamplePublicAccess,PersistenceInfrastructure,EvidenceBroker,CuramFinancialAdapter,CuramMDAdapter,CREOLEInfrastructure,Advisor,EvidenceSharing,PDC,EvidenceFlow,PFMAppViews,Workflow,ValidationManager,EventAdaptor

if exist %CURAM_DIR%\CustomEnvironment.bat call %CURAM_DIR%\CustomEnvironment.bat
