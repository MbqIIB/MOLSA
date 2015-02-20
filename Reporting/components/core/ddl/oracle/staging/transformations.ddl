CREATE OR REPLACE procedure preProcessETL(targetTableName IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.preProcessETL(java.lang.String)';;


CREATE OR REPLACE procedure postProcessETL(targetTableName IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.postProcessETL(java.lang.String)';;



CREATE OR REPLACE PROCEDURE POSTPROCESSETLCASESTATUS(TARGETTABLENAME IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.deleteDupCaseStatus(java.lang.String)';;


CREATE OR REPLACE PROCEDURE POSTPROCESSETLADDRESS(SOURCETABLENAME IN VARCHAR2, TARGETTABLENAME IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.setAddressElements(java.lang.String, java.lang.String)';;

CREATE OR REPLACE FUNCTION readPropertyFromDB (INPROPERTYNAME IN VARCHAR2)
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readPropertyFromDB(java.lang.String) return java.lang.String';;


CREATE OR REPLACE FUNCTION readUndefinedIFNull (INCOLUMNVALUE IN VARCHAR2)
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readUndefinedIFNull(java.lang.String) return java.lang.String';;


-- returns the language part of the locale identifier
CREATE OR REPLACE FUNCTION readLanguage()
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readLanguage() return java.lang.String';;


CREATE OR REPLACE function readLanguage(message IN VARCHAR2) 
RETURN VARCHAR2 AS LANGUAGE JAVA
NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readLanguage(java.lang.String) return java.lang.String';;


CREATE OR REPLACE function S_READLANGUAGEANDDILECT(message IN VARCHAR2) 
RETURN VARCHAR2 AS LANGUAGE JAVA
NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readLanguageAndDilect(java.lang.String) return java.lang.String';;


CREATE OR REPLACE FUNCTION readPropertyIFNull (INCOLUMNVALUE IN VARCHAR2,INPROPERTYNAME IN VARCHAR2)
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readPropertyIFNull(java.lang.String, java.lang.String) return java.lang.String';;



CREATE OR REPLACE FUNCTION getDate RETURN DATE AS LANGUAGE JAVA NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentDate() return java.sql.Date';;

CREATE OR REPLACE FUNCTION getDateTime RETURN DATE AS LANGUAGE JAVA NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentDateTime() return java.sql.Date';;

CREATE OR REPLACE FUNCTION getSecondsBetween(INSTARTDATE IN DATE, INENDDATE IN DATE) RETURN NUMBER AS LANGUAGE JAVA NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.secondsBetween (java.sql.Date, java.sql.Date) return long';;


CREATE OR REPLACE procedure s_preProcessETL(targetTableName IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.preProcessETL(java.lang.String)';;


CREATE OR REPLACE procedure s_postProcessETL(targetTableName IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.postProcessETL(java.lang.String)';;



CREATE OR REPLACE PROCEDURE s_POSTPROCESSETLCASESTATUS(TARGETTABLENAME IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.deleteDupCaseStatus(java.lang.String)';;


CREATE OR REPLACE PROCEDURE s_POSTPROCESSETLADDRESS(SOURCETABLENAME IN VARCHAR2, TARGETTABLENAME IN VARCHAR2) 
AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.setAddressElements(java.lang.String, java.lang.String)';;

CREATE OR REPLACE FUNCTION s_readPropertyFromDB (INPROPERTYNAME IN VARCHAR2)
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readPropertyFromDB(java.lang.String) return java.lang.String';;


CREATE OR REPLACE FUNCTION s_readUndefinedIFNull (INCOLUMNVALUE IN VARCHAR2)
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readUndefinedIFNull(java.lang.String) return java.lang.String';;


-- returns the language part of the locale identifier
CREATE OR REPLACE FUNCTION s_readLanguage()
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readLanguage() return java.lang.String';;


CREATE OR REPLACE function s_readLanguage(message IN VARCHAR2) 
RETURN VARCHAR2 AS LANGUAGE JAVA
NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readLanguage(java.lang.String) return java.lang.String';;


CREATE OR REPLACE FUNCTION s_readPropertyIFNull (INCOLUMNVALUE IN VARCHAR2,INPROPERTYNAME IN VARCHAR2)
RETURN VARCHAR2 AS LANGUAGE JAVA 
NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readPropertyIFNull(java.lang.String, java.lang.String) return java.lang.String';;



CREATE OR REPLACE FUNCTION s_getDate RETURN DATE AS LANGUAGE JAVA NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentDate() return java.sql.Date';;

CREATE OR REPLACE FUNCTION s_getDateTime RETURN DATE AS LANGUAGE JAVA NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentDateTime() return java.sql.Date';;

CREATE OR REPLACE FUNCTION s_getSecondsBetween(INSTARTDATE IN DATE, INENDDATE IN DATE) RETURN NUMBER AS LANGUAGE JAVA NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.secondsBetween (java.sql.Date, java.sql.Date) return long';;

