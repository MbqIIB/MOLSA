--==============================================================
-- DBMS name:      IBM DB2 UDB 9.5.x Common Server
-- Created on:     20/09/2012 11:17:45
--==============================================================



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

drop table DW_ADDRESS;

drop table DW_ALGFINDING;

drop table DW_ALGFINDINGOVERRIDE;

drop table DW_ALGFINDINGSTATUS;

drop table DW_ALGLOCATION;

drop table DW_ALGMETHOD;

drop table DW_ALGROLETYPE;

drop table DW_ALGTYPE;

drop table DW_ALLEGATION;

drop table DW_ALLEGATIONROLE;

drop table DW_ASSISTANCESTATUS;

drop table DW_BOECODES;

drop table DW_BOEELIGIBITYBYPRODUCT;

drop table DW_CASE;

drop table DW_CASEEVENT;

drop table DW_CASEGROUP;

drop table DW_CASEOWNER;

drop table DW_CASEPARTICIPANTROLE;

drop table DW_CASERECIPIENT;

drop table DW_CASERECIPIENT_MONTH;

drop table DW_CASEREVIEWOUTCOMES;

drop table DW_CASESTATUS;

drop table DW_CASESTATUSHISTORY;

drop table DW_CASESUPER;

drop table DW_CASETYPE;

drop table DW_CHILDSUPPORTENFORCETYPES;

drop table DW_COMPLIANCESTATUS;

drop table DW_COMPLIANCETYPE;

drop table DW_CONCERNRELATIONSHIPTYPE;

drop table DW_CONCERNROLEDUPLICATE;

drop table DW_CONCERNROLERELATIONSHIP;

drop table DW_CONFIGPROPERTIES;

drop table DW_CONSTSTATUS;

drop table DW_CONTACTCOMPLIANCEINFO;

drop table DW_CONTACTLOCATION;

drop table DW_CONTACTLOG;

drop table DW_CONTACTLOGPURPOSE;

drop table DW_CONTACTMETHOD;

drop table DW_CONTACTPURPOSELOOKUP;

drop table DW_CONTACTTYPE;

drop table DW_COUNTRY;

drop table DW_DEDUCTION;

drop table DW_DELIVERYMETHOD;

drop table DW_DENIALREASON;

drop table DW_DISPOSITION;

drop table DW_DUALELIGIBITY;

drop table DW_DUALELIGIBITYBYPRODUCT;

drop table DW_DUPLICATEREASON;

drop table DW_DUPLICATESTATUS;

drop table DW_EDUCATION;

drop table DW_EDUCATIONLEVELS;

drop table DW_EMPLOYER;

drop table DW_EMPLOYMENTSTATUS;

drop table DW_ETHNICITY;

drop table DW_ETLCONTROL;

drop table DW_EVIDENCELINK;

drop table DW_FINANCIALSTATUS;

drop table DW_FREQUENCYCRITERIA;

drop table DW_FUND;

drop table DW_FUNDRELATION;

drop table DW_GENDER;

drop table DW_INDIGENOUSGROUP;

drop table DW_INDUSTRY;

drop table DW_INTAKECATEGORY;

drop table DW_INTAKETYPE;

drop table DW_INTEGRATEDCASETYPES;

drop table DW_INVESTIGATION;

drop table DW_INVRECOMMENDATION;

drop table DW_INVSUBTYPE;

drop table DW_LANGUAGE;

drop table DW_MARITALSTATUS;

drop table DW_MASCODES;

drop table DW_MASCODESBYPRODUCT;

drop table DW_MERGESTATUS;

drop table DW_MILESTONEDURATION;

drop table DW_MYSTERYPAYMENTS;

drop table DW_NATIONALITY;

drop table DW_ORGANISATION;

drop table DW_ORGUNIT;

drop table DW_OUTCOME;

drop table DW_PARTICIPANT;

drop table DW_PARTICIPANTHISTORY;

drop table DW_PARTICIPANTSTATUS;

drop table DW_PAYMENT;

drop table DW_PAYMENTHISTORY;

drop table DW_PAYMENTMETHOD;

drop table DW_PERSONHISTORY;

drop table DW_PERSONTYPE;

drop table DW_POSITION;

drop table DW_PRODUCT;

drop table DW_PRODUCTPROVISION;

drop table DW_PROGRAM;

drop table DW_PROGRAMAPPLICATION;

drop table DW_PROVIDER;

drop table DW_QUALIFICATION;

drop table DW_RACE;

drop table DW_RECOMMENDATION;

drop table DW_RECORDSTATUS;

drop table DW_REPORTINGDUMMY;

drop table DW_REPORTINGTIMELINESS;

drop table DW_RESOLUTIONSTATUS;

drop table DW_RESPONDSWITHINTIME;

drop table DW_RESPONSEPRIORITY;

drop table DW_SERVICE;

drop table DW_SERVICEOFFERING;

drop table DW_SERVICEPROVISION;

drop table DW_STATE;

drop table DW_SUBSIDIZEDHOUSINGTYPES;

drop table DW_TRANSACTIONTYPE;

drop table DW_USERS;

drop table DW_UTILITY;

drop table DW_WORKQUEUE;

drop table DW_YESNOINDICATOR;

drop sequence DWACTIONREASONSEQ;

drop sequence DWACTIONTYPESEQ;

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

drop sequence DWPAYMENTSEQ;

drop sequence DWPERSONHISTORYSEQ;

drop sequence DWPERSONTYPESEQ;

drop sequence DWPOSITIONSEQ;

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

drop sequence DWCASEGROUPSEQ;

drop sequence DWCONSTATSEQ;

drop sequence DWEMPLOYERSEQ;

drop sequence DWPAYMENTMETHODSEQ;

drop sequence DWPREFERREDLANGUAGESEQ;

drop sequence DWPROPERTIESSEQ;

drop sequence DWEMPLOYMENTSTATUSSEQ;

drop sequence DWSUBSIDIZEDHOUSINGTYPESSEQ;

drop sequence DWEDUCATIONLEVELSEQ;

drop sequence DWWORKQUEUESEQ;