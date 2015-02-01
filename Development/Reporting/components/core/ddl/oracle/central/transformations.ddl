CREATE OR REPLACE procedure preProcessETL(targetTableName IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.preProcessETL(java.lang.String)';;


CREATE OR REPLACE procedure postProcessETL(targetTableName IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.postProcessETL(java.lang.String)';;


CREATE OR REPLACE PROCEDURE POSTPROCESSETLORGUNIT(TARGETTABLENAME IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.addOrgUnitLevelIndicators(java.lang.String)';;

CREATE OR REPLACE PROCEDURE POSTPROCESSETLCASE(TARGETTABLENAME IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.addRegisteredRecievedStatus(java.lang.String)';;


CREATE OR REPLACE PROCEDURE ADDSTATICDATA
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.addStaticData()';;

CREATE OR REPLACE PROCEDURE POSTPROCESSETLSETENDDATE(TARGETTABLENAME IN VARCHAR2, INSOURCEKEY IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.setToDate(java.lang.String, java.lang.String)';;

CREATE OR REPLACE PROCEDURE POSTPROCESSETLSETENDDATEFOR(ETLNAME IN VARCHAR2, INSOURCEKEY IN VARCHAR2, TARGETTABLENAME IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.setToDateFor(java.lang.String, java.lang.String, java.lang.String)';;


CREATE OR REPLACE FUNCTION ISCLOSUREREASON(CASESTATUS IN VARCHAR2, DESCRIPTION IN VARCHAR2)
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.isClosureReason(java.lang.String, java.lang.String) return java.lang.String';;

CREATE OR REPLACE FUNCTION READPROPERTYFROMDB(INPROPERTYNAME IN VARCHAR2)
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.readPropertyFromDB(java.lang.String) return java.lang.String';;


CREATE OR REPLACE FUNCTION readUndefinedIFNull (INCOLUMNVALUE IN VARCHAR2)
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.readUndefinedIFNull(java.lang.String) return java.lang.String';;


CREATE OR REPLACE FUNCTION readPropertyIFNull (INCOLUMNVALUE IN VARCHAR2,INPROPERTYNAME IN VARCHAR2)
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.readPropertyIFNull(java.lang.String, java.lang.String) return java.lang.String';;


CREATE OR REPLACE FUNCTION FINDPERSONHISTORYKEY(CONCERNROLEID IN NUMBER, INSTARTDATE IN DATE, INENDDATE IN DATE) 
RETURN NUMBER AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.findPersonHistoryKey(long, java.sql.Date, java.sql.Date) return long';;


CREATE OR REPLACE FUNCTION FINDCASESTATUSYKEY(PRODUCTCASEID IN NUMBER, INSTARTDATE IN DATE, INENDDATE IN DATE) 
RETURN NUMBER AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.findCaseStatusKey(long, java.sql.Date, java.sql.Date) return long';;


CREATE OR REPLACE FUNCTION CALCULATEAGE(INSTARTDATE IN DATE, INENDDATE IN DATE) 
RETURN NUMBER AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.calculateAge(java.sql.Date, java.sql.Date) return long';;


CREATE OR REPLACE FUNCTION CALCULATEAGEINMONTHLYFRAME(INSTARTDATE IN DATE, INENDDATE IN DATE) 
RETURN NUMBER AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.calcuateAgeInMonthlyFrame(java.sql.Date, java.sql.Date) return long';;

--rem not used  - deprecated
CREATE OR REPLACE PROCEDURE linkReciepientToEvidence(TARGETTABLENAME IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.linkReciepientToEvidence(java.lang.String)';;

CREATE OR REPLACE FUNCTION CALCULATEPREVIOUSMALTREATMENTS(inAllegationID IN NUMBER, inConcernroleID IN NUMBER, inAllegationDate IN DATE) 
RETURN NUMBER AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.calculatePreviousMaltreatments(long, long,java.sql.Date) return long';;


CREATE OR REPLACE PROCEDURE federalCGISS(TARGETTABLENAME IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.federalCGISS(java.lang.String)';;


CREATE OR REPLACE FUNCTION getDate RETURN DATE AS LANGUAGE JAVA NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentDate() return java.sql.Date';;

CREATE OR REPLACE FUNCTION getDateTime RETURN DATE AS LANGUAGE JAVA NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentDateTime() return java.sql.Date';;

CREATE OR REPLACE FUNCTION getSecondsBetween(INSTARTDATE IN DATE, INENDDATE IN DATE) RETURN NUMBER AS LANGUAGE JAVA NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.secondsBetween (java.sql.Date, java.sql.Date) return long';;


CREATE OR REPLACE procedure dw_preProcessETL(targetTableName IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.preProcessETL(java.lang.String)';;


CREATE OR REPLACE procedure dw_postProcessETL(targetTableName IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.postProcessETL(java.lang.String)';;


CREATE OR REPLACE PROCEDURE dw_POSTPROCESSETLORGUNIT(TARGETTABLENAME IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.addOrgUnitLevelIndicators(java.lang.String)';;

CREATE OR REPLACE PROCEDURE dw_POSTPROCESSETLCASE(TARGETTABLENAME IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.addRegisteredRecievedStatus(java.lang.String)';;


CREATE OR REPLACE PROCEDURE dw_ADDSTATICDATA
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.addStaticData()';;

CREATE OR REPLACE PROCEDURE dw_POSTPROCESSETLSETENDDATE(TARGETTABLENAME IN VARCHAR2, INSOURCEKEY IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.setToDate(java.lang.String, java.lang.String)';;

CREATE OR REPLACE PROCEDURE dw_POSTPROCESSETLSETENDDATEFOR(ETLNAME IN VARCHAR2, INSOURCEKEY IN VARCHAR2, TARGETTABLENAME IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.setToDateFor(java.lang.String, java.lang.String, java.lang.String)';;


CREATE OR REPLACE FUNCTION dw_ISCLOSUREREASON(CASESTATUS IN VARCHAR2, DESCRIPTION IN VARCHAR2)
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.isClosureReason(java.lang.String, java.lang.String) return java.lang.String';;

CREATE OR REPLACE FUNCTION dw_READPROPERTYFROMDB(INPROPERTYNAME IN VARCHAR2)
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.readPropertyFromDB(java.lang.String) return java.lang.String';;


CREATE OR REPLACE FUNCTION dw_readUndefinedIFNull (INCOLUMNVALUE IN VARCHAR2)
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.readUndefinedIFNull(java.lang.String) return java.lang.String';;


CREATE OR REPLACE FUNCTION dw_readPropertyIFNull (INCOLUMNVALUE IN VARCHAR2,INPROPERTYNAME IN VARCHAR2)
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.readPropertyIFNull(java.lang.String, java.lang.String) return java.lang.String';;


CREATE OR REPLACE FUNCTION dw_FINDPERSONHISTORYKEY(CONCERNROLEID IN NUMBER, INSTARTDATE IN DATE, INENDDATE IN DATE) 
RETURN NUMBER AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.findPersonHistoryKey(long, java.sql.Date, java.sql.Date) return long';;


CREATE OR REPLACE FUNCTION dw_FINDCASESTATUSYKEY(PRODUCTCASEID IN NUMBER, INSTARTDATE IN DATE, INENDDATE IN DATE) 
RETURN NUMBER AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.findCaseStatusKey(long, java.sql.Date, java.sql.Date) return long';;


CREATE OR REPLACE FUNCTION dw_CALCULATEAGE(INSTARTDATE IN DATE, INENDDATE IN DATE) 
RETURN NUMBER AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.calculateAge(java.sql.Date, java.sql.Date) return long';;


CREATE OR REPLACE FUNCTION dw_CALCULATEAGEINMONTHLYFRAME(INSTARTDATE IN DATE, INENDDATE IN DATE) 
RETURN NUMBER AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.calcuateAgeInMonthlyFrame(java.sql.Date, java.sql.Date) return long';;

--rem not used  - deprecated
CREATE OR REPLACE PROCEDURE dw_linkReciepientToEvidence(TARGETTABLENAME IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.linkReciepientToEvidence(java.lang.String)';;

CREATE OR REPLACE FUNCTION dw_CALCULATEPREVMALTREATMENTS(inAllegationID IN NUMBER, inConcernroleID IN NUMBER, inAllegationDate IN DATE) 
RETURN NUMBER AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.calculatePreviousMaltreatments(long, long,java.sql.Date) return long';;


CREATE OR REPLACE PROCEDURE dw_federalCGISS(TARGETTABLENAME IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.federalCGISS(java.lang.String)';;


CREATE OR REPLACE FUNCTION dw_getDate RETURN DATE AS LANGUAGE JAVA NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentDate() return java.sql.Date';;

CREATE OR REPLACE FUNCTION dw_getDateTime RETURN DATE AS LANGUAGE JAVA NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentDateTime() return java.sql.Date';;

CREATE OR REPLACE FUNCTION dw_getSecondsBetween(INSTARTDATE IN DATE, INENDDATE IN DATE) RETURN NUMBER AS LANGUAGE JAVA NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.secondsBetween (java.sql.Date, java.sql.Date) return long';;
