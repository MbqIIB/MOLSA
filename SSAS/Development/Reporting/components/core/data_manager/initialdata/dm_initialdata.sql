insert into dm_DIMALGSEVERITY(DIMALGSEVERITYKEY, SEVERITYCODE, SEVERITYDESC) values (-1,'Undefined', dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMPROVIDER(DIMPROVIDERKEY,PROVIDERID,PROVIDERNAME) VALUES (-1,-1,dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMSERVICEOFFERING(DIMSERVICEOFFERINGKEY,SERVICEOFFERINGID,SERVICEOFFERINGNAME,STARTDATE,ENDDATE) VALUES (-1,-1,dm_readPropertyFromDB('BI.UNDEFINED'),NULL,NULL);

INSERT INTO DM_DIMRECURRENCE(DIMRECURRENCEKEY,CODE,DESCRIPTION) VALUES (-1,'CCS_REC01',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMTIMEOFDAYGROUPS(DIMPROGRAMKEY,HOUROFDAY,GROUPNAME ) VALUES (-1,-1,dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_AGEGROUPS(ID,GROUPNAME,STARTAGE,ENDAGE,GROUPDESCRIPTION,BUSAREA,PROGRAMCODE) VALUES (-1,'Undefined',-1,-1,dm_readPropertyFromDB('BI.UNDEFINED'),'Undefined','Undefined' );


INSERT INTO DM_DIMDuplicateReason(DIMDUPREASONKEY,CODE,DESCRIPTION)  VALUES(-1,'UNDEFINED',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMMergeStatus(DIMMERGESTATUSKEY,CODE,DESCRIPTION) VALUES(-1,'UNDEFINED',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMDuplicateStatus(DIMDUPSTATUSKEY,CODE,DESCRIPTION) VALUES(-1,'UNDEFINED',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMASSISTANCESTATUS (DIMASSISTANCESTATUSKEY,CODE,DESCRIPTION) VALUES (-1,'Undefined',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMBOECODES (DIMBOEKEY,CODE,DESCRIPTION) VALUES (-1,'-1',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMCASEOWNER (CASEOWNERKEY, CASEOWNERNAME) VALUES (-1,dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMCHILDSUPPORTENFORTYPES (DIMCHILDSUPPORTENFORCETYPEKEY,DESCRIPTION,CODE) VALUES (-1,'Undefined',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMCONCERNRELATIONSHIPTYPE (RELATIONSHIPTYPEKEY,CODE,DESCRIPTION) VALUES (-1,'UNDEFINED',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMCOUNTRY (DIMCOUNTRYKEY,COUNTRYCODE,COUNTRY) VALUES (-1,'UNDEFINED',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMDELIVERYMETHOD (DIMDELIVERYMETHODKEY, DELIVERYMETHOD) VALUES (4,dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMDEDUCTION (DIMDEDUCTIONKEY,DEDUCTIONCAT,DEDUCTIONNAME) VALUES (-1,'UNDEFINED',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMDISPOSITION (DISPOSITIONKEY,CODE,DISPOSITIONDESC) VALUES (-1,'Undefined',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMDUALELIGIBILITY (DIMDUALKEY,CODE,DESCRIPTION) VALUES (-1,'UNDEFINED',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMEDUCATIONLEVELS (DIMEDUCATIONLEVELKEY,CODE,DESCRIPTION) VALUES (-1,'Undefined',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMEMPLOYMENTSTATUS (DIMEMPLOYMENTSTATUSKEY, CODE, DESCRIPTION) VALUES (-1,'Undefined',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMFINANCIALSTATUS (DIMFINSTATUSKEY,STATUSCODE,STATUSDESC) VALUES (-1,'UNDEFINED',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMGENDER (DIMGENDERKEY,GENDER) VALUES (-1,dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMMARITALSTATUS (DIMMARITALSTATUSKEY, MARITALSTATUS) VALUES (-1,dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMMASCODES (DIMMASKEY,CODE,DESCRIPTION) VALUES (-1,'Undefined',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMPROGRAM (DIMPROGRAMKEY,PROGRAMCODE,PROGRAM,DISPLAYNAME) VALUES (-1,'UNDEFINED',dm_readPropertyFromDB('BI.UNDEFINED'),dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMORGUNIT (ORGUNITKEY,ORGUNITID,ORGUNITNAME,ORGUNITDESC,ORGUNITLEVEL,ORGUNITPARENTID,ORGUNITPARENTNAME) VALUES(-1,-1,'Undefined',dm_readPropertyFromDB('BI.UNDEFINED'),-1,-1,'Undefined');   

INSERT INTO DM_DIMPREFERREDLANGUAGE (DIMPREFERREDLANGUAGEKEY,PREFERREDLANGUAGE) VALUES (-1,dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMPARTICIPANTSTATUS (DIMPARTICIPANTSTATUSKEY,STATUS) VALUES (-1,dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMPRODUCT (DIMPRODUCTKEY,DWPRODUCTID,NAME,PRODUCTTYPECODE, PRODUCTTYPE) VALUES (-1,-1,dm_readPropertyFromDB('BI.UNDEFINED'),'UNDEFINED', 'UNDEFINED');

INSERT INTO DM_DIMSUBSIDIZEDHOUSINGTYPES (DIMSUBSIDIZEDHOUSINGTYPEKEY,CODE,DESCRIPTION) VALUES (-1,'Undefined',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMRESPONSEPRIORITY(DIMRESPONSEPRIORITYKEY,CODE,RESPONSEPRIORITYDESC) VALUES(-1,'Undefined',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMYESNOINDICATOR(DIMYESNOINDICATORKEY,INDDESCRIPTION,DISPLAYNAME) VALUES(-1,'Undefined',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMCONTACTTYPE(DIMCONTACTTYPEKEY,CODE,DESCRIPTION) VALUES (-1,'Undefined',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMNATIONALITY(DIMNATIONALITYKEY,CODE, DESCRIPTION) VALUES (-1,'Undefined',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMCONTACTMETHOD(DIMCONTACTMETHODKEY,CODE,DESCRIPTION) VALUES (-1,'Undefined',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMCONTACTLOCATION (DIMCONTACTLOCATIONKEY, LOCATIONCODE, LOCATIONDESCRIPTION) VALUES (-1,'Undefined',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMFREQUENCYCRITERIA (DIMFREQUENCYCRITERIAKEY,FREQUENCYCRITERIACODE,FREQUENCYCRITERIADESC) VALUES (-1,'Undefined',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMREPORTINGTIMELINESS(DIMREPORTINGTIMELINESSKEY,REPORTINGTIMELINESSKEYCODE,REPORTINGTIMELINESSKEYDESC) VALUES (-1,'Undefined',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMCONSTSTATUS (DIMCONSTSTATKEY, DESCRIPTION) VALUES (-1,dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMRACE (DIMRACEKEY,CODE,DESCRIPTION) VALUES (-1,'Undefined',dm_readPropertyFromDB('BI.UNDEFINED'));

INSERT INTO DM_DIMTIMEPERIOD (TIMEPERIODKEY, TIMEPERIODDETAILLEVEL) VALUES (-1, 'Day');