insert into dw_ALGFINDINGOVERRIDE(DWALGFINDINGOVERRIDEKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());


insert into DW_INDIGENOUSGROUP (DWINDIGENOUSGROUPKEY, CODE,DESCRIPTION,LASTWRITTEN)    values (-1, 'Not Indig', dw_readPropertyFromDB('Person.NotIndigenous'),dw_getDateTime());
insert into DW_INDIGENOUSGROUP (DWINDIGENOUSGROUPKEY, CODE,DESCRIPTION,LASTWRITTEN) values (-2, 'Indigenous', dw_readPropertyFromDB('Person.Indigenous'),dw_getDateTime());

insert into DW_CASEREVIEWOUTCOMES (DWCASEREVIEWOUTCOMEID, COMPONENTOUTCOME,OVERALLOUTCOME,LASTWRITTEN) values (-1, dw_readPropertyFromDB('BI.UNDEFINED'), dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());


insert into dw_CONFIGPROPERTIES(DWCONFIGPROPERTIESKEY, NAME, DESCRIPTION,STARTDATE,ENDDATE, PROPERTYVALUE,COMMENTS,LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('Allegation.Undefined'), getDate(), null, -1,'Undefined',dw_getDateTime());

insert into DW_COUNTRY (DWCOUNTRYKEY,CODE,DESCRIPTION,LASTWRITTEN) values (-1, 'UNDEFINED', dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_QUALIFICATION (DWQUALIFICATIONKEY,CODE,DESCRIPTION,LASTWRITTEN) values (-1, 'UNDEFINED', dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_INDUSTRY (DWINDUSTRYKEY,CODE,DESCRIPTION,LASTWRITTEN) values (-1, 'UNDEFINED', dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_ETHNICITY (DWETHNICITYKEY,CODE,DESCRIPTION,LASTWRITTEN) values (-1, 'UNDEFINED', dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_GENDER (DWGENDERKEY,CODE,DESCRIPTION,LASTWRITTEN) values (-1, 'UNDEFINED', dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_PAYMENTMETHOD (DWPAYMENTMETHODKEY,CODE,DESCRIPTION,LASTWRITTEN) values (-1, 'UNDEFINED', dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_DELIVERYMETHOD (DWDELIVERYMETHODID,CODE,DESCRIPTION,LASTWRITTEN) values (-1, 'UNDEFINED', dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_LANGUAGE (DWLANGUAGEKEY,CODE,DESCRIPTION,LASTWRITTEN) values (-1, 'UNDEFINED', dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_MARITALSTATUS (DWMARITALSTATUSKEY,CODE,DESCRIPTION,LASTWRITTEN) values (-1, 'UNDEFINED', dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into dw_product (DWPRODUCTID, PRODUCTID,NAME,DESCRIPTION,PRODUCTTYPE,PRODUCTTYPECODE, LASTWRITTEN) values (-1, -1, 'UNDEFINED', dw_readPropertyFromDB('BI.UNDEFINED'),'UNDEFINED','UNDEFINED',dw_getDateTime());

insert into dw_program (DWPROGRAMID,PROGRAMCD,PROGRAMDESC,DISPLAYNAME,LASTWRITTEN) values (-1, 'UNDEFINED', dw_readPropertyFromDB('BI.UNDEFINED'),dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());
insert into DW_PROGRAM (DWPROGRAMID,PROGRAMTYPEID,PROGRAMCD,PROGRAMDESC,DISPLAYNAME,LASTWRITTEN,INTEGRATEDCASETYPE,NUMDISPOSITIONDAYS,PROCESSINGAPPLICATION) values (-2, null, 'CCS', dw_readPropertyFromDB('Program.Description'),dw_readPropertyFromDB('Program.Description'),dw_getDateTime(),'null',null,'null');
insert into dw_ALGLOCATION(DWALGLOCATIONKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into dw_ALGMETHOD(DWALGMETHODKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into dw_ALGROLETYPE(DWALGROLETYPEKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into dw_ALGTYPE(DWALGTYPEKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into dw_RECORDSTATUS(DWRECORDSTATUSKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());


insert into DW_RESOLUTIONSTATUS(DWRESOLUTIONSTATUSKEY, CODE, DESCRIPTION, LASTWRITTEN) values(-1,'Undefined', dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_PERSONTYPE(DWPERSONTYPEKEY, CODE, PERSONSTATUSTYPE, LASTWRITTEN) values(-1,'Undefined', dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_INVRECOMMENDATION (DWCCSRECOMMENDATIONKEY, CODE,DESCRIPTION,LASTWRITTEN) values (-1, 'Undefined', dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());


insert into dw_state values (-1,'undefined',dw_readPropertyFromDB('BI.UNDEFINED'),-1);

insert into dw_address (DWADDRESSID,DWSTATEID,ADDRESSID,COUNTRYDESC,LASTWRITTEN)   values (-1,-1,0, dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());
   
insert into dw_participant (DWPARTICIPANTID,DWADDRESSID,CONCERNROLEID,DWLANGUAGEKEY,ROLETYPE,PREFERREDLANGUAGE, LASTWRITTEN)     values (-1,-1,0,-1,'UNDEFINED', dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_NATIONALITY (DWNATIONALITYKEY, CODE,DESCRIPTION,LASTWRITTEN)values (-1, 'Undefined', dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());


insert into DW_RACE (DWRACETYPEKEY, CODE,DESCRIPTION,LASTWRITTEN) values (   -1, 'Undefined', dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());

insert into dw_participantstatus (DWPARTICIPANTSTATUSID,STATUSCODE,STATUSNAME,LASTWRITTEN)values (-1, 'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_CONSTSTATUS (DWCONSTSTATKEY, CODE, DESCRIPTION, LASTWRITTEN)     values (-1, 'Undefined', dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());



insert into dw_CONTACTLOCATION(DWCONTACTLOCATIONKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());
insert into dw_CONTACTMETHOD(DWCONTACTMETHODKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());
insert into dw_CONTACTPURPOSELOOKUP(DWCONTACTPURPOSELOOKUPKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());
insert into dw_CONTACTTYPE(DWCONTACTTYPEKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_COMPLIANCETYPE(DWCOMPLIANCETYPEKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());
insert into DW_COMPLIANCESTATUS(DWCOMPLIANCESTATUSKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());
insert into DW_FREQUENCYCRITERIA(DWFREQUENCYCRITERIAKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());


insert into DW_REPORTINGTIMELINESS(DWREPORTINGTIMELINESS, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined', dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_SUBSIDIZEDHOUSINGTYPES(DWSUBSIDIZEDHOUSINGTYPEKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_CHILDSUPPORTENFORCETYPES (DWCHILDSUPPORTENFORCETYPEKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_EDUCATIONLEVELS (DWEDUCATIONLEVELKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_MASCODES (DWMASKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_EMPLOYMENTSTATUS (DWEMPLOYMENTSTATUSKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_BOECODES (DWBOEKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_DUALELIGIBITY (DWDUALKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_ASSISTANCESTATUS (DWASSISTANCESTATUSKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());


insert into DW_CONCERNRELATIONSHIPTYPE (RELATIONSHIPTYPEKEY, CODE,DESCRIPTION,LASTWRITTEN) values (-1, 'UNDEFINED', dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());
insert into DW_CASESTATUS (DWSTATUSID, STATUSNAME,STATUSCATEGORY,LASTWRITTEN) values (-1, 'UNDEFINED', dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());

insert into dw_deduction (DWDEDUCTIONID,DEDUCTIONCAT,DEDUCTIONNAME,LASTWRITTEN) values (-1, 'UNDEFINED', dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into DW_MERGESTATUS (DWMERGESTATUSKEY, CODE,DESCRIPTION,LASTWRITTEN)values (-1, 'UNDEFINED', dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());
insert into DW_DUPLICATEREASON (DWDUPREASONKEY, CODE,DESCRIPTION,LASTWRITTEN)values (-1, 'UNDEFINED', dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());
insert into DW_DUPLICATESTATUS (DWDUPSTATUSKEY, CODE,DESCRIPTION,LASTWRITTEN)values (-1, 'UNDEFINED', dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());

insert into DW_INTAKETYPE (DWINTAKETYPEKEY, CODE,INTAKETYPEDESC,LASTWRITTEN) values (-1, 'Undefined', dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());
insert into DW_INTAKECATEGORY (DWINTAKECATEGORYKEY, CODE,INTAKECATEGORYDESC,LASTWRITTEN) values (-1, 'Undefined', dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());
insert into DW_RECOMMENDATION (DWRECOMMENDATIONKEY, CODE,RECOMMENDATIONDESC,LASTWRITTEN) values (-1, 'Undefined', dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());
insert into DW_RESPONDSWITHINTIME (DWRESPONDSWITHINTIMEKEY, CODE,RESPONDSWITHINTIMEDESC,LASTWRITTEN) values (-1, 'Undefined', dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());
insert into DW_RESPONSEPRIORITY (DWRESPONSEPRIORITYKEY, CODE,RESPONSEPRIORITYDESC,LASTWRITTEN) values (-1, 'Undefined', dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());
insert into DW_DENIALREASON (DWDENIALREASONKEY, CODE,DESCRIPTION,LASTWRITTEN) values (-1, 'Undefined', dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());
insert into DW_DISPOSITION (DWDISPOSITIONKEY, CODE,DISPOSITIONDESC,LASTWRITTEN) values (-1, 'Undefined', dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());
insert into DW_INTEGRATEDCASETYPES (DWINTEGRATEDCASETYPEKEY, CODE,DESCRIPTION,LASTWRITTEN) values (-1, 'Undefined', dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());
insert into DW_CASETYPE (DWCASETYPEKEY, CODE,DESCRIPTION,LASTWRITTEN) values (-1, 'Undefined', dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());

insert into DW_ORGUNIT (DWORGUNITID, PARENTID,ORGUNITID,NAME,DESCRIPTION,PARENTNAME,ORGLEVEL, LASTWRITTEN) values (-1, -1,-1,'Undefined',dw_readPropertyFromDB('BI.UNDEFINED'),'Undefined',-1,dw_getDateTime());

insert into DW_POSITION (DWPOSITIONID, DWORGUNITID, POSITIONID, NAME, LEADPOSITIONIND, JOBID, FROMDATE, TODATE, UPPERNAME, DWRECORDSTATUSKEY, LASTWRITTEN) values (-1, -1, -1, 'Undefined', 0, -1, getDate(), NULL, 'UNDEFINED', -1, dw_getDateTime());

insert into DW_WORKQUEUE (DWWORKQUEUEID, WORKQUEUEID, NAME, ALLOWUSERSUBSCRIPTIONIND, SENSITIVITY, ADMINISTRATORUSERNAME, UPPERNAME, UPPERADMINISTRATORUSERNAME, LASTWRITTEN) values (-1, -1, 'Undefined', 0, -1, 'Undefined', 'UNDEFINED', 'UNDEFINED',dw_getDateTime());

insert into DW_CASEOWNER (DWCASEOWNERID, DWORGUNITID,CASEOWNERID,LASTWRITTEN) values (-1, -1,'UNDEFINED',dw_getDateTime());
insert into DW_CASE (DWCASEID, DWCASETYPEKEY,DWPROGRAMID,DWPRODUCTID,DWINTEGRATEDCASETYPEKEY,DWCASEOWNERID,CASEID,INTEGRATEDCASEID,CASEREFERENCE,PRIORITYCODE, LASTWRITTEN) values (-1, -1, -1,-1,-1,-1,-1,-1,' ',dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());

insert into DW_CASESUPER (DWCASESUPERID, DWCASEOWNERID,DWCASEID,LASTWRITTEN) values (-1, -1,-1,dw_getDateTime());
insert into DW_INDIGENOUSGROUP (DWINDIGENOUSGROUPKEY, CODE,DESCRIPTION,LASTWRITTEN) values (-3, 'Undefined', dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());
insert into DW_OUTCOME (DWCCSOUTCOMEKEY, CODE,DESCRIPTION,LASTWRITTEN) values (-1, 'Undefined', dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());
insert into DW_ALGFINDINGstatus (DWALGFINDINGSTATUSKEY, CODE,DESCRIPTION,LASTWRITTEN) values (-1, 'Undefined', dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime());
insert into DW_INVSUBTYPE (DWINVSUBTYPEKEY, CODE, DESCRIPTION, LASTWRITTEN) values (-1, 'Undefined', dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

INSERT INTO DW_ALLEGATION (DWALLEGATIONKEY,  DWRECORDSTATUSKEY,  DWALGLOCATIONKEY,  DWALGMETHODKEY,  DWALGTYPEKEY,  ALLEGATIONID,  ALLEGATIONDATETIME,  DESCRIPTION,  REPORTEDDATETIME,  ADDRESSID,  ANONYMOUSIND,  CREATIONDATE,  NUMPREVMALTREATMENTS,  CASEID,  RELATEDCASEID,  LASTWRITTEN)
VALUES (-1,-1,-1,-1,-1,NULL,NULL,dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime(),NULL,NULL,getDate(),NULL,NULL,NULL,dw_getDateTime());
insert into DW_YESNOINDICATOR (YESNOINDICATORKEY, INDDESCRPTION, DISPLAYNAME, LASTWRITTEN) values (-1, 'Undefined', dw_readPropertyFromDB('BI.UNDEFINED'), dw_getDateTime());

insert into dw_personhistory (DWPERSONHISTORYID,DWMARITALSTATUSKEY,DWNATIONALITYKEY, DWPARTICIPANTSTATUSID,DWINDIGENOUSGROUPKEY,DWRACETYPEKEY, DWCOUNTRYKEY,DWGENDERKEY, DWCONSTSTATKEY,DWETHNICITYKEY,DWPERSONTYPEKEY,DWPARTICIPANTID,GENDER,MARITALSTATUS ,COUNTRYOFBIRTH,ETHNICORIGIN,STARTDATE,LASTWRITTEN)  
values (-1, -1, -1, -1, -1,-1, -1,-1,-1,-1,-1,-1,dw_readPropertyFromDB('BI.UNDEFINED'), dw_readPropertyFromDB('BI.UNDEFINED'),dw_readPropertyFromDB('BI.UNDEFINED'),dw_readPropertyFromDB('BI.UNDEFINED'),dw_getDateTime(), dw_getDateTime());