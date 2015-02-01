
-- creates the post ETL process
CREATE  PROCEDURE DW_postProcessETL(in tablename varchar(200))
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.postProcessETL'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


-- creates the pre ETL process
-- creates the pre ETL process

CREATE  PROCEDURE DW_preProcessETL(IN ETLNAME varchar(50), OUT returnvalue TIMESTAMP)
        DYNAMIC RESULT SETS 0
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.preProcessETL'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


CREATE  PROCEDURE DW_postProcessETLOrgUnit(in targettablename varchar(200))
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.addOrgUnitLevelIndicators'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE  PROCEDURE DW_postProcessETLCase(in targetTableName varchar(200))
        NOT DETERMINISTIC
        LANGUAGE Java
	EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.addRegisteredRecievedStatus'
	FENCED
	THREADSAFE
PARAMETER STYLE JAVA;

CREATE  PROCEDURE DW_caseClosureReason(in targetTableName varchar(200))
	NOT DETERMINISTIC
	LANGUAGE Java
	EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.setClosureReason'
	FENCED
	THREADSAFE
PARAMETER STYLE JAVA;


CREATE  PROCEDURE DW_postProcessETLAddress(in inSourceTableName varchar(200), in targetTableName  varchar(200))
            NOT DETERMINISTIC
            LANGUAGE Java
            EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.setAddressElements(java.lang.String, java.lang.String)'
            FENCED
            THREADSAFE
PARAMETER STYLE JAVA;

CREATE  PROCEDURE DW_flagDuplicates(in targetTableName varchar(200))
	NOT DETERMINISTIC
	LANGUAGE Java
	EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.flagDuplicateCases(java.lang.String)'
	FENCED
	THREADSAFE
PARAMETER STYLE JAVA;

CREATE  PROCEDURE DW_flagCaseStatusDuplicates(in targetTableName varchar(200))
	NOT DETERMINISTIC
	LANGUAGE Java
	EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.flagDuplicateStatus(java.lang.String)'
	FENCED
	THREADSAFE
PARAMETER STYLE JAVA;


CREATE  PROCEDURE DW_postProcessETLSetEndDate(in targetTableName  varchar(200), in inSourceKey varchar(200))
            NOT DETERMINISTIC
            LANGUAGE Java
            EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.setToDate(java.lang.String, java.lang.String)'
            FENCED
            THREADSAFE
PARAMETER STYLE JAVA;


CREATE  PROCEDURE DW_postProcessETLSetEndDateFor(in ETLName varchar(200), in targetTableName  varchar(200), in inSourceKey varchar(200))
            NOT DETERMINISTIC
            LANGUAGE Java
            EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.setToDateFor(java.lang.String, java.lang.String, java.lang.String)'
            FENCED
            THREADSAFE
PARAMETER STYLE JAVA;

CREATE  PROCEDURE DW_addStaticData
            LANGUAGE Java
            EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.addStaticData'
            FENCED
            THREADSAFE
PARAMETER STYLE JAVA;

CREATE  FUNCTION DW_ISCLOSUREREASON(CASESTATUS  varchar(200), DESCRIPTION varchar(200))
                RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.isClosureReason(java.lang.String, java.lang.String)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE  FUNCTION DW_READPROPERTYFROMDB(INPROPERTYNAME VARCHAR(500))
        RETURNS VARCHAR(500)
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.readPropertyFromDB(java.lang.String) return java.lang.String'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE  FUNCTION DW_readUndefinedIFNull (INCOLUMNVALUE VARCHAR(500))
        RETURNS VARCHAR(500)
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.readUndefinedIFNull(java.lang.String) return java.lang.String'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE  FUNCTION DW_readPropertyIFNull (INCOLUMNVALUE VARCHAR(500),INPROPERTYNAME VARCHAR(500))
        RETURNS VARCHAR(500)
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.readPropertyIFNull(java.lang.String, java.lang.String) return java.lang.String'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE  FUNCTION DW_FINDPERSONHISTKEY(CONCERNROLEID  bigint, INSTARTDATE date, INENDDATE date )
        RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.findPersonHistoryKey(java.lang.Long, java.sql.date, java.sql.date)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE  FUNCTION DW_FINDPERSONHISTORYKEY(CONCERNROLEID  bigint, INSTARTDATE date, INENDDATE date )
                RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.findPersonHistoryKey(java.lang.Long, java.sql.date, java.sql.date)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE  FUNCTION DW_FINDCASESTATUSYKEY(PRODUCTCASEID  bigint, INSTARTDATE date, INENDDATE date)
                RETURNS BIGINT
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.findCaseStatusKey(java.lang.Long, java.sql.date, java.sql.date)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE  FUNCTION DW_CALCULATEAGE(INSTARTDATE date, INENDDATE date )
        RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.calculateAge(java.sql.date, java.sql.date)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE  FUNCTION DW_CALCULATEAGEINMONTHLYFRAME(INSTARTDATE DATE, INENDDATE DATE) 
     RETURNS INTEGER 
     NOT DETERMINISTIC
     LANGUAGE Java
     EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.calcuateAgeInMonthlyFrame(java.sql.Date, java.sql.Date) return long'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


CREATE  FUNCTION DW_CALAGEMONTHLY(INSTARTDATE date, INENDDATE date )
        RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.calcuateAgeInMonthlyFrame(java.sql.date, java.sql.date)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE  PROCEDURE DW_linkReciepientToEvidence(in TARGETTABLENAME varchar(200))
            NOT DETERMINISTIC
            LANGUAGE Java
            EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.linkReciepientToEvidence(java.lang.string)'
            FENCED
            THREADSAFE
PARAMETER STYLE JAVA;

CREATE   FUNCTION DW_CALCULATEPREVMALTREATMENTS(inAllegationID INTEGER, inConcernroleID INTEGER, inAllegationDate DATE) 
RETURNS INTEGER 
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.calculatePreviousMaltreatments(long, long,java.sql.Date) return long'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE  PROCEDURE DW_federalCGISS(TARGETTABLENAME VARCHAR(500)) 
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.federalCGISS(java.lang.String)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


CREATE  FUNCTION DW_getDate()
        RETURNS DATE
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentDate() return java.sql.Date'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE  FUNCTION DW_getDateTime() 
        RETURNS DATE
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentDateTime() return java.sql.Date'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


CREATE  FUNCTION DW_getSecondsBetween(INSTARTDATE DATE, INENDDATE  DATE) 
        RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.secondsBetween (java.sql.Date, java.sql.Date) return long'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;




-- there functions below are now deprecated as the collide with warehouse functin names
-- use the function names above

-- creates the post ETL process
CREATE PROCEDURE postProcessETL(in tablename varchar(200))
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.postProcessETL'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


-- creates the pre ETL process
-- creates the pre ETL process

CREATE procedure preProcessETL(IN ETLNAME varchar(50), OUT returnvalue TIMESTAMP)
        DYNAMIC RESULT SETS 0
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.preProcessETL'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


CREATE PROCEDURE postProcessETLOrgUnit(in targettablename varchar(200))
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.addOrgUnitLevelIndicators'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE PROCEDURE postProcessETLCase(in targetTableName varchar(200))
        NOT DETERMINISTIC
        LANGUAGE Java
	EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.addRegisteredRecievedStatus'
	FENCED
	THREADSAFE
PARAMETER STYLE JAVA;

CREATE PROCEDURE caseClosureReason(in targetTableName varchar(200))
	NOT DETERMINISTIC
	LANGUAGE Java
	EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.setClosureReason'
	FENCED
	THREADSAFE
PARAMETER STYLE JAVA;


CREATE PROCEDURE postProcessETLAddress(in inSourceTableName varchar(200), in targetTableName  varchar(200))
            NOT DETERMINISTIC
            LANGUAGE Java
            EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.setAddressElements(java.lang.String, java.lang.String)'
            FENCED
            THREADSAFE
PARAMETER STYLE JAVA;

CREATE PROCEDURE flagDuplicates(in targetTableName varchar(200))
	NOT DETERMINISTIC
	LANGUAGE Java
	EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.flagDuplicateCases(java.lang.String)'
	FENCED
	THREADSAFE
PARAMETER STYLE JAVA;

CREATE PROCEDURE flagCaseStatusDuplicates(in targetTableName varchar(200))
	NOT DETERMINISTIC
	LANGUAGE Java
	EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.flagDuplicateStatus(java.lang.String)'
	FENCED
	THREADSAFE
PARAMETER STYLE JAVA;


CREATE PROCEDURE postProcessETLSetEndDate(in targetTableName  varchar(200), in inSourceKey varchar(200))
            NOT DETERMINISTIC
            LANGUAGE Java
            EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.setToDate(java.lang.String, java.lang.String)'
            FENCED
            THREADSAFE
PARAMETER STYLE JAVA;


CREATE PROCEDURE postProcessETLSetEndDateFor(in ETLName varchar(200), in targetTableName  varchar(200), in inSourceKey varchar(200))
            NOT DETERMINISTIC
            LANGUAGE Java
            EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.setToDateFor(java.lang.String, java.lang.String, java.lang.String)'
            FENCED
            THREADSAFE
PARAMETER STYLE JAVA;

CREATE PROCEDURE addStaticData
            LANGUAGE Java
            EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.addStaticData'
            FENCED
            THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION ISCLOSUREREASON(CASESTATUS  varchar(200), DESCRIPTION varchar(200))
                RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.isClosureReason(java.lang.String, java.lang.String)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION READPROPERTYFROMDB(INPROPERTYNAME VARCHAR(500))
        RETURNS VARCHAR(500)
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.readPropertyFromDB(java.lang.String) return java.lang.String'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION readUndefinedIFNull (INCOLUMNVALUE VARCHAR(500))
        RETURNS VARCHAR(500)
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.readUndefinedIFNull(java.lang.String) return java.lang.String'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION readPropertyIFNull (INCOLUMNVALUE VARCHAR(500),INPROPERTYNAME VARCHAR(500))
        RETURNS VARCHAR(500)
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.readPropertyIFNull(java.lang.String, java.lang.String) return java.lang.String'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION FINDPERSONHISTKEY(CONCERNROLEID  bigint, INSTARTDATE date, INENDDATE date )
        RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.findPersonHistoryKey(java.lang.Long, java.sql.date, java.sql.date)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION FINDPERSONHISTORYKEY(CONCERNROLEID  bigint, INSTARTDATE date, INENDDATE date )
                RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.findPersonHistoryKey(java.lang.Long, java.sql.date, java.sql.date)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION FINDCASESTATUSYKEY(PRODUCTCASEID  bigint, INSTARTDATE date, INENDDATE date)
                RETURNS BIGINT
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.findCaseStatusKey(java.lang.Long, java.sql.date, java.sql.date)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION CALCULATEAGE(INSTARTDATE date, INENDDATE date )
        RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.calculateAge(java.sql.date, java.sql.date)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION CALCULATEAGEINMONTHLYFRAME(INSTARTDATE DATE, INENDDATE DATE) 
     RETURNS INTEGER 
     NOT DETERMINISTIC
     LANGUAGE Java
     EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.calcuateAgeInMonthlyFrame(java.sql.Date, java.sql.Date) return long'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


CREATE FUNCTION CALAGEMONTHLY(INSTARTDATE date, INENDDATE date )
        RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.calcuateAgeInMonthlyFrame(java.sql.date, java.sql.date)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE PROCEDURE linkReciepientToEvidence(in TARGETTABLENAME varchar(200))
            NOT DETERMINISTIC
            LANGUAGE Java
            EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.linkReciepientToEvidence(java.lang.string)'
            FENCED
            THREADSAFE
PARAMETER STYLE JAVA;

CREATE  FUNCTION CALCULATEPREVIOUSMALTREATMENTS(inAllegationID INTEGER, inConcernroleID INTEGER, inAllegationDate DATE) 
RETURNS INTEGER 
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.calculatePreviousMaltreatments(long, long,java.sql.Date) return long'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE PROCEDURE federalCGISS(TARGETTABLENAME VARCHAR(500)) 
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.federalCGISS(java.lang.String)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


CREATE FUNCTION getDate()
        RETURNS DATE
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentDate() return java.sql.Date'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION getDateTime() 
        RETURNS DATE
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentDateTime() return java.sql.Date'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


CREATE FUNCTION getSecondsBetween(INSTARTDATE DATE, INENDDATE  DATE) 
        RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.secondsBetween (java.sql.Date, java.sql.Date) return long'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;














