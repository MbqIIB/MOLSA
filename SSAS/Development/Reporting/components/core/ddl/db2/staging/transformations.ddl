
CREATE  PROCEDURE S_POSTPROCESSETLADDRESS(SOURCETABLENAME varchar(200), TARGETTABLENAME varchar(200)) 
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.setAddressElements(java.lang.String, java.lang.String)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE  PROCEDURE S_POSTPROCESSETLCASESTATUS(TARGETTABLENAME varchar(200)) 
	    NOT DETERMINISTIC
		LANGUAGE JAVA 
		EXTERNAL NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.deleteDupCaseStatus(java.lang.String)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION S_READPROPERTYFROMDB (INPROPERTYNAME varchar(200))
        RETURNS  VARCHAR(200)
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readPropertyFromDB(java.lang.String) return java.lang.String'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION S_READUNDEFINEDIFNULL (INCOLUMNVALUE VARCHAR(500))
	    RETURNS VARCHAR(500) 
        NOT DETERMINISTIC
        LANGUAGE Java
		EXTERNAL NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readUndefinedIFNull(java.lang.String) return java.lang.String'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


-- returns the language part of the locale identifier
CREATE FUNCTION S_READLANGUAGE ()
	RETURNS VARCHAR(100)
    NOT DETERMINISTIC
    LANGUAGE Java
	EXTERNAL NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readLanguage() return java.lang.String'
    FENCED
    THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION S_READLANGUAGE(message VARCHAR(500)) 
     RETURNS VARCHAR(500) 
     NOT DETERMINISTIC
     LANGUAGE Java
     EXTERNAL NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readLanguage(java.lang.String) return java.lang.String'
    FENCED
    THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION S_READLANGUAGEANDDILECT(message VARCHAR(500)) 
     RETURNS VARCHAR(500) 
     NOT DETERMINISTIC
     LANGUAGE Java
     EXTERNAL NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readLanguageAndDilect(java.lang.String) return java.lang.String'
    FENCED
    THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION S_READPROPERTYIFNULL (INCOLUMNVALUE VARCHAR(500),INPROPERTYNAME VARCHAR(500))
    RETURNS VARCHAR(500) 
    NOT DETERMINISTIC
    LANGUAGE Java 
    EXTERNAL NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readPropertyIFNull(java.lang.String, java.lang.String) return java.lang.String'
    FENCED
    THREADSAFE
PARAMETER STYLE JAVA;	





-- creates the post ETL process
CREATE  PROCEDURE S_POSTPROCESSETL(in tablename varchar(200))
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.postProcessETL'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


-- creates the pre ETL process

CREATE  PROCEDURE S_PREPROCESSETL(IN ETLNAME varchar(50), OUT returnvalue TIMESTAMP)
        DYNAMIC RESULT SETS 0
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.preProcessETL'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION S_VCTOBI( var0 VARCHAR(16) FOR BIT DATA )
    RETURNS BIGINT  
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.vcToBi'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;
  


-- show cases how to create a  PROCEDURE S_with an out parameter
CREATE  PROCEDURE S_procedureReturnTimestampTest(IN ETLNAME varchar(50), OUT returnvalue TIMESTAMP)
        DYNAMIC RESULT SETS 0
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.testProcedureReturnTimestamp'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

-- show cases how to create a  PROCEDURE S_with an out parameter
CREATE  PROCEDURE S_procedureReturnDateTest(IN ETLNAME varchar(50), OUT returnvalue DATE)
        DYNAMIC RESULT SETS 0
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.procedureReturnDate'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

-- show cases how to create a  PROCEDURE S_with an out parameter
CREATE  PROCEDURE S_procedureReturnStringTest(IN ETLNAME varchar(50), OUT returnvalue varchar(50) )
        DYNAMIC RESULT SETS 0
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.testProcedureReturnString'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

-- show cases how to create a FUNCTION S_returning a value
CREATE FUNCTION S_testReturnString(ETLNAME varchar(50) )
        RETURNS VARCHAR(200)
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.testReturnString(java.lang.String) return java.lang.String'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

-- show cases how to create a FUNCTION S_returning a value
CREATE FUNCTION S_testReturnLong( )
        RETURNS BIGINT
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.testReturnLong() return java.lang.long'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

-- show cases how to create a FUNCTION S_returning a value
CREATE FUNCTION S_testReturnInt( )
        RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.testReturnInt() return java.lang.int'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


-- show cases how to create a FUNCTION S_returning a value
CREATE FUNCTION S_TESTRETURNDATE( )
        RETURNS DATE
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.testReturnDate() return java.sql.Date'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION S_TESTRETURNTIMESTAMP( )
        RETURNS TIMESTAMP
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.testReturnTimestamp() return java.sql.Timestamp'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

-- creates the right pad FUNCTION S_process
CREATE FUNCTION S_RPAD(source varchar(200), length int, padChar varchar(1)) returns varchar(200) 
        NOT DETERMINISTIC 
        LANGUAGE Java 
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.rpad(java.lang.String,int,java.lang.String) return java.lang.String' 
        FENCED 
        THREADSAFE 
PARAMETER STYLE JAVA;


--returns the current date
CREATE FUNCTION S_GETDATE() 
        RETURNS DATE
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentDate() return java.sql.Date'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

-- returns the current date and time
CREATE FUNCTION S_GETDATETIME () 
        RETURNS TIMESTAMP
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentTimeStamp() return java.sql.Timestamp'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


CREATE FUNCTION S_GETSECONDSBETWEEN(INSTARTDATE DATE, INENDDATE DATE )
        RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.secondsBetween(java.sql.Date, java.sql.Date)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


CREATE FUNCTION S_GETSECONDSBETWEEN(INSTARTDATE TIMESTAMP, INENDDATE TIMESTAMP )
        RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.secondsBetween(java.sql.Timestamp, java.sql.Timestamp)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


-- there functions below are now deprecated as the collide with warehouse functin names
-- use the function names above


CREATE PROCEDURE POSTPROCESSETLADDRESS(SOURCETABLENAME varchar(200), TARGETTABLENAME varchar(200)) 
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.central.dbclient.CustomTransforms.setAddressElements(java.lang.String, java.lang.String)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE PROCEDURE POSTPROCESSETLCASESTATUS(TARGETTABLENAME varchar(200)) 
	    NOT DETERMINISTIC
		LANGUAGE JAVA 
		EXTERNAL NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.deleteDupCaseStatus(java.lang.String)'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION readPropertyFromDB (INPROPERTYNAME varchar(200))
        RETURNS  VARCHAR(200)
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readPropertyFromDB(java.lang.String) return java.lang.String'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION readUndefinedIFNull (INCOLUMNVALUE VARCHAR(500))
	    RETURNS VARCHAR(500) 
        NOT DETERMINISTIC
        LANGUAGE Java
		EXTERNAL NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readUndefinedIFNull(java.lang.String) return java.lang.String'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


-- returns the language part of the locale identifier
CREATE FUNCTION readLanguage ()
	RETURNS VARCHAR(100)
    NOT DETERMINISTIC
    LANGUAGE Java
	EXTERNAL NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readLanguage() return java.lang.String'
    FENCED
    THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION  readLanguage(message VARCHAR(500)) 
     RETURNS VARCHAR(500) 
     NOT DETERMINISTIC
     LANGUAGE Java
     EXTERNAL NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readLanguage(java.lang.String) return java.lang.String'
    FENCED
    THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION readPropertyIFNull (INCOLUMNVALUE VARCHAR(500),INPROPERTYNAME VARCHAR(500))
    RETURNS VARCHAR(500) 
    NOT DETERMINISTIC
    LANGUAGE Java 
    EXTERNAL NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.readPropertyIFNull(java.lang.String, java.lang.String) return java.lang.String'
    FENCED
    THREADSAFE
PARAMETER STYLE JAVA;	





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

CREATE FUNCTION vcToBi( var0 VARCHAR(16) FOR BIT DATA )
    RETURNS BIGINT  
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.staging.dbclient.CustomTransforms.vcToBi'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;
  


-- show cases how to create a procedure with an out parameter
CREATE procedure procedureReturnTimestampTest(IN ETLNAME varchar(50), OUT returnvalue TIMESTAMP)
        DYNAMIC RESULT SETS 0
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.testProcedureReturnTimestamp'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

-- show cases how to create a procedure with an out parameter
CREATE procedure procedureReturnDateTest(IN ETLNAME varchar(50), OUT returnvalue DATE)
        DYNAMIC RESULT SETS 0
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.procedureReturnDate'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

-- show cases how to create a procedure with an out parameter
CREATE procedure procedureReturnStringTest(IN ETLNAME varchar(50), OUT returnvalue varchar(50) )
        DYNAMIC RESULT SETS 0
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.testProcedureReturnString'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

-- show cases how to create a function returning a value
CREATE FUNCTION testReturnString(ETLNAME varchar(50) )
        RETURNS VARCHAR(200)
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.testReturnString(java.lang.String) return java.lang.String'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

-- show cases how to create a function returning a value
CREATE FUNCTION testReturnLong( )
        RETURNS BIGINT
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.testReturnLong() return java.lang.long'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

-- show cases how to create a function returning a value
CREATE FUNCTION testReturnInt( )
        RETURNS INTEGER
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.testReturnInt() return java.lang.int'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;


-- show cases how to create a function returning a value
CREATE FUNCTION testReturnDate( )
        RETURNS DATE
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.testReturnDate() return java.sql.Date'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

CREATE FUNCTION testReturnTimestamp( )
        RETURNS TIMESTAMP
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.testReturnTimestamp() return java.sql.Timestamp'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

-- creates the right pad function process
CREATE FUNCTION rpad(source varchar(200), length int, padChar varchar(1)) returns varchar(200) 
        NOT DETERMINISTIC 
        LANGUAGE Java 
        EXTERNAL NAME 'curam.util.reporting.transformations.prepost.dbclient.PrePostTransforms.rpad(java.lang.String,int,java.lang.String) return java.lang.String' 
        FENCED 
        THREADSAFE 
PARAMETER STYLE JAVA;


--returns the current date
CREATE FUNCTION getDate() 
        RETURNS DATE
        NOT DETERMINISTIC
        LANGUAGE Java
        EXTERNAL NAME 'curam.util.reporting.transformations.coredatamarts.base.DateUtilitiesTransformImpl.currentDate() return java.sql.Date'
        FENCED
        THREADSAFE
PARAMETER STYLE JAVA;

-- returns the current date and time
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