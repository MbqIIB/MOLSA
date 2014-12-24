/*==============================================================*/
/* DBMS name:      ORACLE Version 11.x                          */
/* Created on:     08/10/2012 15:25:54                          */
/*==============================================================*/


drop view DW_UPDATE_INV_OUTCOME_VIEW;

drop view DW_UPDATE_CASESUPER_VIEW;

drop view DW_INVESTIGATIONVIEW;

drop view DW_DIMCASESUPER;

drop view DW_DIMCASEOWNER;

drop view DM_FACTUTILITYHISTORYVIEW;

drop view DM_FACTSERVICESUPPLIERVIEW;

drop view DM_FACTPROGRAMAPPVIEW;

drop view DM_FACTPRODUCTSUPPLIERVIEW;

drop view DM_FACTPERSONHISTORYVIEW;

drop view DM_FACTPAYMENTSVIEW;

drop view DM_FACTINVESTIGATIONVIEW;

drop view DM_FACTEMPLOYERHISTORYVIEW;

drop view DM_FACTCASEPROCESSVIEW;

drop view DM_FACTCASEPROCESSVIEW_GBL;

drop view DM_FACTCASEPARTICIPANTVIEW;

drop view DM_FACTCASEPARTICIPANTVIEW_GBL;

drop view DM_FACTCASEPARTDUPLICATEVIEW;

drop view DM_CLIENTPRIMARYADDRESS;

drop view DM_CLIENTPRIMARYADDRESS_GBL;

drop table DW_ADDRESS cascade constraints;

drop table DW_ALGFINDING cascade constraints;

drop table DW_ALGFINDINGOVERRIDE cascade constraints;

drop table DW_ALGFINDINGSTATUS cascade constraints;

drop table DW_ALGLOCATION cascade constraints;

drop table DW_ALGMETHOD cascade constraints;

drop table DW_ALGROLETYPE cascade constraints;

drop table DW_ALGTYPE cascade constraints;

drop table DW_ALLEGATION cascade constraints;

drop table DW_ALLEGATIONROLE cascade constraints;

drop table DW_ASSISTANCESTATUS cascade constraints;

drop table DW_BOECODES cascade constraints;

drop table DW_BOEELIGIBITYBYPRODUCT cascade constraints;

drop table DW_CASE cascade constraints;

drop table DW_CASEEVENT cascade constraints;

drop table DW_CASEGROUP cascade constraints;

drop table DW_CASEOWNER cascade constraints;

drop table DW_CASEPARTICIPANTROLE cascade constraints;

drop table DW_CASERECIPIENT cascade constraints;

drop table DW_CASERECIPIENT_MONTH cascade constraints;

drop table DW_CASEREVIEWOUTCOMES cascade constraints;

drop table DW_CASESTATUS cascade constraints;

drop table DW_CASESTATUSHISTORY cascade constraints;

drop table DW_CASESUPER cascade constraints;

drop table DW_CASETYPE cascade constraints;

drop table DW_CHILDSUPPORTENFORCETYPES cascade constraints;

drop table DW_COMPLIANCESTATUS cascade constraints;

drop table DW_COMPLIANCETYPE cascade constraints;

drop table DW_CONCERNRELATIONSHIPTYPE cascade constraints;

drop table DW_CONCERNROLEDUPLICATE cascade constraints;

drop table DW_CONCERNROLERELATIONSHIP cascade constraints;

drop table DW_CONFIGPROPERTIES cascade constraints;

drop table DW_CONSTSTATUS cascade constraints;

drop table DW_CONTACTCOMPLIANCEINFO cascade constraints;

drop table DW_CONTACTLOCATION cascade constraints;

drop table DW_CONTACTLOG cascade constraints;

drop table DW_CONTACTLOGPURPOSE cascade constraints;

drop table DW_CONTACTMETHOD cascade constraints;

drop table DW_CONTACTPURPOSELOOKUP cascade constraints;

drop table DW_CONTACTTYPE cascade constraints;

drop table DW_COUNTRY cascade constraints;

drop table DW_DEDUCTION cascade constraints;

drop table DW_DELIVERYMETHOD cascade constraints;

drop table DW_DENIALREASON cascade constraints;

drop table DW_DISPOSITION cascade constraints;

drop table DW_DUALELIGIBITY cascade constraints;

drop table DW_DUALELIGIBITYBYPRODUCT cascade constraints;

drop table DW_DUPLICATEREASON cascade constraints;

drop table DW_DUPLICATESTATUS cascade constraints;

drop table DW_EDUCATION cascade constraints;

drop table DW_EDUCATIONLEVELS cascade constraints;

drop table DW_EMPLOYER cascade constraints;

drop table DW_EMPLOYMENTSTATUS cascade constraints;

drop table DW_ETHNICITY cascade constraints;

drop table DW_ETLCONTROL cascade constraints;

drop table DW_EVIDENCELINK cascade constraints;

drop table DW_FINANCIALSTATUS cascade constraints;

drop table DW_FREQUENCYCRITERIA cascade constraints;

drop table DW_FUND cascade constraints;

drop table DW_FUNDRELATION cascade constraints;

drop table DW_GENDER cascade constraints;

drop table DW_INDIGENOUSGROUP cascade constraints;

drop table DW_INDUSTRY cascade constraints;

drop table DW_INTAKECATEGORY cascade constraints;

drop table DW_INTAKETYPE cascade constraints;

drop table DW_INTEGRATEDCASETYPES cascade constraints;

drop table DW_INVESTIGATION cascade constraints;

drop table DW_INVRECOMMENDATION cascade constraints;

drop table DW_INVSUBTYPE cascade constraints;

drop table DW_LANGUAGE cascade constraints;

drop table DW_MARITALSTATUS cascade constraints;

drop table DW_MASCODES cascade constraints;

drop table DW_MASCODESBYPRODUCT cascade constraints;

drop table DW_MERGESTATUS cascade constraints;

drop table DW_MILESTONEDURATION cascade constraints;

drop table DW_MYSTERYPAYMENTS cascade constraints;

drop table DW_NATIONALITY cascade constraints;

drop table DW_ORGANISATION cascade constraints;

drop table DW_ORGUNIT cascade constraints;

drop table DW_OUTCOME cascade constraints;

drop table DW_PARTICIPANT cascade constraints;

drop table DW_PARTICIPANTHISTORY cascade constraints;

drop table DW_PARTICIPANTSTATUS cascade constraints;

drop table DW_PAYMENT cascade constraints;

drop table DW_PAYMENTHISTORY cascade constraints;

drop table DW_PAYMENTMETHOD cascade constraints;

drop table DW_PERSONHISTORY cascade constraints;

drop table DW_PERSONTYPE cascade constraints;

drop table DW_POSITION cascade constraints;

drop table DW_PRODUCT cascade constraints;

drop table DW_PRODUCTPROVISION cascade constraints;

drop table DW_PROGRAM cascade constraints;

drop table DW_PROGRAMAPPLICATION cascade constraints;

drop table DW_PROVIDER cascade constraints;

drop table DW_QUALIFICATION cascade constraints;

drop table DW_RACE cascade constraints;

drop table DW_RECOMMENDATION cascade constraints;

drop table DW_RECORDSTATUS cascade constraints;

drop table DW_REPORTINGDUMMY cascade constraints;

drop table DW_REPORTINGTIMELINESS cascade constraints;

drop table DW_RESOLUTIONSTATUS cascade constraints;

drop table DW_RESPONDSWITHINTIME cascade constraints;

drop table DW_RESPONSEPRIORITY cascade constraints;

drop table DW_SERVICE cascade constraints;

drop table DW_SERVICEOFFERING cascade constraints;

drop table DW_SERVICEPROVISION cascade constraints;

drop table DW_STATE cascade constraints;

drop table DW_SUBSIDIZEDHOUSINGTYPES cascade constraints;

drop table DW_TRANSACTIONTYPE cascade constraints;

drop table DW_USERS cascade constraints;

drop table DW_UTILITY cascade constraints;

drop table DW_WORKQUEUE cascade constraints;

drop table DW_YESNOINDICATOR cascade constraints;

drop sequence DWADDRESSSEQ;

drop sequence DWALGFINDINGOVERRIDESEQ;

drop sequence DWALGLOCATIONSEQ;

drop sequence DWALGMETHODSEQ;

drop sequence DWALGROLETYPESEQ;

drop sequence DWALGTYPESEQ;

drop sequence DWALLEGATIONROLESEQ;

drop sequence DWALLEGATIONSEQ;

drop sequence DWALLEGFINDINGSEQ;

drop sequence DWCASEEVENTSEQ;

drop sequence DWCASEGROUPSEQ;

drop sequence DWCASEOWNERSEQ;

drop sequence DWCASEPARTICIPANTROLESEQ;

drop sequence DWCASERECIPIENTSEQ;

drop sequence DWCASEREVIEWOUTCOMESEQ;

drop sequence DWCASESEQ;

drop sequence DWCASESTATUSHISTSEQ;

drop sequence DWCASESUPERSEQ;

drop sequence DWCASETYPESEQ;

drop sequence DWCCSEDUCATIONSEQ;

drop sequence DWCOMPLIANCESTATUSSEQ;

drop sequence DWCOMPLIANCETYPESEQ;

drop sequence DWCONCERNRELTYPESEQ;

drop sequence DWCONCERNROLEDUPLICATESEQ;

drop sequence DWCONCERNROLERELSEQ;

drop sequence DWCONFIGPROPERTIESSEQ;

drop sequence DWCONSTATSEQ;

drop sequence DWCONTACTLOCATIONSEQ;

drop sequence DWCONTACTMETHODSEQ;

drop sequence DWCONTACTPURPOSELOOKUPSEQ;

drop sequence DWCONTACTPURPOSESEQ;

drop sequence DWCONTACTTYPESEQ;

drop sequence DWCOUNTRYSEQ;

drop sequence DWDEDUCTIONSEQ;

drop sequence DWDELIVERYMETHODSEQ;

drop sequence DWDENIALREASONSEQ;

drop sequence DWDISPOSITIONSEQ;

drop sequence DWDUPLICATEREASONSEQ;

drop sequence DWDUPLICATESTATUSSEQ;

drop sequence DWEDUCATIONSEQ;

drop sequence DWEMPLOYERSEQ;

drop sequence DWETHNICITYSEQ;

drop sequence DWFINANCIALSTATUSSEQ;

drop sequence DWFINDINGSEQ;

drop sequence DWFREQUENCYCRITERIASEQ;

drop sequence DWFUNDRELATIONSEQ;

drop sequence DWFUNDSEQ;

drop sequence DWGENDERSEQ;

drop sequence DWINDIGENOUSGROUPSEQ;

drop sequence DWINDUSTRYSEQ;

drop sequence DWINTAKECATEGORYSEQ;

drop sequence DWINTAKETYPESEQ;

drop sequence DWINTCASETYPESEQ;

drop sequence DWINTEGRATEDCASEACTIONSEQ;

drop sequence DWINTEGRATEDCASETYPESEQ;

drop sequence DWINVESTIGATIONSEQ;

drop sequence DWINVRECOMMENDATIONSEQ;

drop sequence DWINVSUBTYPESEQ;

drop sequence DWLANGUAGESEQ;

drop sequence DWMARITALSTATUSSEQ;

drop sequence DWMERGESTATUSSEQ;

drop sequence DWMILESTONEDURSEQ;

drop sequence DWMYSTERYPAYMENTSSEQ;

drop sequence DWNATIONALITYSEQ;

drop sequence DWORGSEQ;

drop sequence DWORGUNITSEQ;

drop sequence DWOUTCOMESEQ;

drop sequence DWPARTICIPANTHISTORYSEQ;

drop sequence DWPARTICIPANTSEQ;

drop sequence DWPARTICIPANTSTATUSSEQ;

drop sequence DWPAYMENTHISTORYSEQ;

drop sequence DWPAYMENTMETHODSEQ;

drop sequence DWPAYMENTSEQ;

drop sequence DWPERSONHISTORYSEQ;

drop sequence DWPERSONTYPESEQ;

drop sequence DWPOSITIONSEQ;

drop sequence DWPREFERREDLANGUAGESEQ;

drop sequence DWPRODUCTPROVISIONSEQ;

drop sequence DWPRODUCTSEQ;

drop sequence DWPROGRAMSEQ;

drop sequence DWQUALIFICATIONSEQ;

drop sequence DWRACESEQ;

drop sequence DWRECOMMENDATIONSEQ;

drop sequence DWRECORDSTATUSSEQ;

drop sequence DWREPORTINGSTATUSSEQ;

drop sequence DWRESOLUTIONSTATUSSEQ;

drop sequence DWRESPONDSWITHINTIMESEQ;

drop sequence DWRESPONSEPRIORITYSEQ;

drop sequence DWSERVICEPROVISIONSEQ;

drop sequence DWSERVICESEQ;

drop sequence DWTRANSACTIONSEQ;

drop sequence DWUSERSSEQ;

drop sequence DWWORKQUEUESEQ;

