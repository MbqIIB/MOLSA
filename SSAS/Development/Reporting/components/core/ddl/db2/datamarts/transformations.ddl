
-- creates the post ETL process
CREATE  PROCEDURE DM_POSTPROCESSETL(in tablename varchar(200))
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.postProcessETL'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


-- creates the pre ETL process
-- creates the pre ETL process

CREATE  PROCEDURE DM_PREPROCESSETL(IN ETLNAME varchar(50), OUT returnvalue TIMESTAMP)
        DYNAMIC RESULT SETS 0
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.preProcessETL'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


-- creates the transformation for the case status ETL
CREATE  PROCEDURE DM_CASEFACTPROCESSDAYAGGREGATE(in tablename varchar(200)) 
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.caseFactProcessDayAggregate'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE  FUNCTION DM_READPROPERTYFROMDB(INCOLUMNVALUE VARCHAR(500))
        RETURNS VARCHAR(500)
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.readPropertyFromDB(java.lang.String) return java.lang.String'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE  FUNCTION DM_READPROPERTYIFNULL (INCOLUMNVALUE VARCHAR(500),INPROPERTYNAME VARCHAR(500))
       RETURNS VARCHAR(500) 
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.readPropertyIFNull(java.lang.String, java.lang.String) return java.lang.String'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE  FUNCTION DM_READUNDEFINEDIFNULL (INPROPERTYNAME VARCHAR(500))
        RETURNS VARCHAR(500) 
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.readUndefinedIFNull(java.lang.String) return java.lang.String'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


-- creates the transformation for the case status ETL
CREATE  PROCEDURE DM_CASEFACTMONTHAGGREGATE(in tablename varchar(200)) 
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.caseFactProcessMonthAggregate'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


-- creates the transformation for the case status ETL
CREATE  PROCEDURE DM_CASEFACTPROCESS(in tablename varchar(200)) 
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.caseFactProcess'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

-- creates the transformation for the participant end date
CREATE  PROCEDURE DM_POSTPROCESSETLPARTICIPANT(in ETLName varchar(200),in tablename varchar(200)) 
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.setToDate'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

-- creates the transformation for CALCULATEAGE
CREATE  FUNCTION DM_CALCULATEAGE(DATE, DATE)
  RETURNS INTEGER
        NO EXTERNAL ACTION 
        DETERMINISTIC 
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.calculateAge(java.sql.Date, java.sql.Date)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


CREATE  FUNCTION DM_FINDAGEGROUPKEY(BUSAREA  varchar(200), inAge INTEGER, PROGRAM varchar(200))
        RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.findAgegroupKey(java.lang.String, java.lang.int,java.lang.String) return java.lang.int'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;



CREATE  FUNCTION DM_GETDATE() 
        RETURNS DATE
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentDate() return java.sql.Date'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE  FUNCTION DM_GETDATETIME () 
        RETURNS TIMESTAMP
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentTimeStamp() return java.sql.Timestamp'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


CREATE  FUNCTION DM_GETSECONDSBETWEEN(INSTARTDATE DATE, INENDDATE DATE )
        RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.secondsBetween(java.sql.Date, java.sql.Date)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


CREATE  FUNCTION DM_GETSECONDSBETWEEN(INSTARTDATE TIMESTAMP, INENDDATE TIMESTAMP )
        RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.secondsBetween(java.sql.Timestamp, java.sql.Timestamp)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;



CREATE  FUNCTION dm_subtractDays(INSTARTDATE DATE, INDAYS INTEGER )
        RETURNS DATE
        NO EXTERNAL ACTION 
        DETERMINISTIC 
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.dateMinusDays(java.sql.Date, java.lang.int) return java.sql.Date'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;




-- there functions below are no longer recommended as they collide with warehouse function names
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


-- creates the transformation for the case status ETL
CREATE PROCEDURE caseFactProcessDayAggregate(in tablename varchar(200)) 
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.caseFactProcessDayAggregate'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION READPROPERTYFROMDB(INCOLUMNVALUE VARCHAR(500))
        RETURNS VARCHAR(500)
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.readPropertyFromDB(java.lang.String) return java.lang.String'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION readPropertyIFNull (INCOLUMNVALUE VARCHAR(500),INPROPERTYNAME VARCHAR(500))
       RETURNS VARCHAR(500) 
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.readPropertyIFNull(java.lang.String, java.lang.String) return java.lang.String'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION readUndefinedIFNull (INPROPERTYNAME VARCHAR(500))
        RETURNS VARCHAR(500) 
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.readUndefinedIFNull(java.lang.String) return java.lang.String'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


-- creates the transformation for the case status ETL
CREATE PROCEDURE caseFactProcessMonthAggregate(in tablename varchar(200)) 
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.caseFactProcessMonthAggregate'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


-- creates the transformation for the case status ETL
CREATE PROCEDURE caseFactProcess(in tablename varchar(200)) 
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.caseFactProcess'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

-- creates the transformation for the participant end date
CREATE PROCEDURE postProcessETLParticipant(in ETLName varchar(200),in tablename varchar(200)) 
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.setToDate'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

-- creates the transformation for CALCULATEAGE
CREATE FUNCTION CALCULATEAGE(DATE, DATE)
  RETURNS INTEGER
        NO EXTERNAL ACTION 
        DETERMINISTIC 
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.calculateAge(java.sql.Date, java.sql.Date)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


CREATE FUNCTION  findAgegroupKey(BUSAREA  varchar(200), inAge INTEGER, PROGRAM varchar(200))
        RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.dbclient.CustomTransforms.findAgegroupKey(java.lang.String, java.lang.int,java.lang.String) return java.lang.int'
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

CREATE FUNCTION getDateTime () 
        RETURNS TIMESTAMP
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentTimeStamp() return java.sql.Timestamp'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


CREATE FUNCTION getSecondsBetween(INSTARTDATE DATE, INENDDATE DATE )
        RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.secondsBetween(java.sql.Date, java.sql.Date)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


CREATE FUNCTION getSecondsBetween(INSTARTDATE TIMESTAMP, INENDDATE TIMESTAMP )
        RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.secondsBetween(java.sql.Timestamp, java.sql.Timestamp)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;
