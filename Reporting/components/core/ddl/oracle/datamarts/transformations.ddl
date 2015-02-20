
CREATE OR REPLACE procedure preProcessETL(targetTableName IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.preProcessETL(java.lang.String)';;


CREATE OR REPLACE procedure postProcessETL(targetTableName IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.postProcessETL(java.lang.String)';;


CREATE OR REPLACE procedure caseFactProcessMonthAggregate(targetTableName IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.caseFactProcessMonthAggregate(java.lang.String)';;

CREATE OR REPLACE procedure caseFactProcessDayAggregate(targetTableName IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.caseFactProcessDayAggregate(java.lang.String)';;

CREATE OR REPLACE procedure caseFactProcess(targetTableName IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.caseFactProcess(java.lang.String)';;


CREATE OR REPLACE procedure postProcessETLParticipant(inETLName IN VARCHAR2, targetTableName IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.setToDate(java.lang.String,java.lang.String)';;

CREATE OR REPLACE FUNCTION CALCULATEAGE(INSTARTDATE IN DATE, INENDDATE IN DATE) 
RETURN NUMBER AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.calculateAge(java.sql.Date, java.sql.Date) return long';;

CREATE OR REPLACE FUNCTION findAgegroupKey(BUSAREA IN VARCHAR2, inAge IN NUMBER, PROGRAM IN VARCHAR2) 
RETURN NUMBER AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.findAgegroupKey
(java.lang.String,int,java.lang.String) return int';;

CREATE OR REPLACE FUNCTION READPROPERTYFROMDB(INCOLUMNVALUE IN VARCHAR2)
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.readPropertyFromDB(java.lang.String) return java.lang.String';;


CREATE OR REPLACE FUNCTION readPropertyIFNull (INCOLUMNVALUE IN VARCHAR2,INPROPERTYNAME IN VARCHAR2)
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.readPropertyIFNull(java.lang.String, java.lang.String) return java.lang.String';;


CREATE OR REPLACE FUNCTION readUndefinedIFNull (INPROPERTYNAME IN VARCHAR2)
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.readUndefinedIFNull(java.lang.String) return java.lang.String';;


CREATE OR REPLACE FUNCTION getDate RETURN DATE AS LANGUAGE JAVA NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentDate() return java.sql.Date';;

CREATE OR REPLACE FUNCTION getDateTime RETURN DATE AS LANGUAGE JAVA NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentDateTime() return java.sql.Date';;

CREATE OR REPLACE FUNCTION getSecondsBetween(INSTARTDATE IN DATE, INENDDATE IN DATE) RETURN NUMBER AS LANGUAGE JAVA NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.secondsBetween (java.sql.Date, java.sql.Date) return long';;



CREATE OR REPLACE procedure dm_preProcessETL(targetTableName IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.preProcessETL(java.lang.String)';;


CREATE OR REPLACE procedure dm_postProcessETL(targetTableName IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.postProcessETL(java.lang.String)';;


CREATE OR REPLACE procedure dm_caseFactMonthAggregate(targetTableName IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.caseFactProcessMonthAggregate(java.lang.String)';;

CREATE OR REPLACE procedure dm_caseFactProcessDayAggregate(targetTableName IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.caseFactProcessDayAggregate(java.lang.String)';;

CREATE OR REPLACE procedure dm_caseFactProcess(targetTableName IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.caseFactProcess(java.lang.String)';;


CREATE OR REPLACE procedure dm_postProcessETLParticipant(inETLName IN VARCHAR2, targetTableName IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.setToDate(java.lang.String,java.lang.String)';;

CREATE OR REPLACE FUNCTION dm_CALCULATEAGE(INSTARTDATE IN DATE, INENDDATE IN DATE) 
RETURN NUMBER AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.calculateAge(java.sql.Date, java.sql.Date) return long';;

CREATE OR REPLACE FUNCTION dm_findAgegroupKey(BUSAREA IN VARCHAR2, inAge IN NUMBER, PROGRAM IN VARCHAR2) 
RETURN NUMBER AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.findAgegroupKey
(java.lang.String,int,java.lang.String) return int';;

CREATE OR REPLACE FUNCTION dm_READPROPERTYFROMDB(INCOLUMNVALUE IN VARCHAR2)
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.readPropertyFromDB(java.lang.String) return java.lang.String';;


CREATE OR REPLACE FUNCTION dm_readPropertyIFNull (INCOLUMNVALUE IN VARCHAR2,INPROPERTYNAME IN VARCHAR2)
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.readPropertyIFNull(java.lang.String, java.lang.String) return java.lang.String';;


CREATE OR REPLACE FUNCTION dm_readUndefinedIFNull (INPROPERTYNAME IN VARCHAR2)
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.readUndefinedIFNull(java.lang.String) return java.lang.String';;


CREATE OR REPLACE FUNCTION dm_getDate RETURN DATE AS LANGUAGE JAVA NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentDate() return java.sql.Date';;

CREATE OR REPLACE FUNCTION dm_getDateTime RETURN DATE AS LANGUAGE JAVA NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentDateTime() return java.sql.Date';;

CREATE OR REPLACE FUNCTION dm_getSecondsBetween(INSTARTDATE IN DATE, INENDDATE IN DATE) RETURN NUMBER AS LANGUAGE JAVA NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.secondsBetween (java.sql.Date, java.sql.Date) return long';;

CREATE OR REPLACE FUNCTION dm_subtractDays(INSTARTDATE IN DATE, inDays IN NUMBER) RETURN DATE AS LANGUAGE JAVA NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.dateMinusDays (java.sql.Date, int) return java.sql.Date';;

       