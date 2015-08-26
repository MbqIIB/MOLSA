
DROP PROCEDURE S_POSTPROCESSETL;
DROP PROCEDURE S_PREPROCESSETL;

DROP PROCEDURE S_POSTPROCESSETLCASESTATUS;
DROP PROCEDURE S_POSTPROCESSETLADDRESS; 
DROP PROCEDURE S_PROCEDURERETURNSTRINGTEST;
DROP PROCEDURE S_PROCEDURERETURNTIMESTAMPTEST;
DROP PROCEDURE S_PROCEDURERETURNDATETEST;

DROP FUNCTION S_VCTOBI;
DROP FUNCTION S_RPAD;
DROP FUNCTION S_TESTRETURNSTRING;
DROP FUNCTION S_TESTRETURNLONG;
DROP FUNCTION S_TESTRETURNINT;
DROP FUNCTION S_TESTRETURNTIMESTAMP;
DROP FUNCTION S_TESTRETURNDATE;

DROP FUNCTION S_GETDATE ;
DROP FUNCTION S_GETDATETIME;
DROP FUNCTION S_GETSECONDSBETWEEN(DATE,DATE);
DROP FUNCTION S_GETSECONDSBETWEEN(TIMESTAMP,TIMESTAMP);

DROP FUNCTION S_READPROPERTYFROMDB;
DROP FUNCTION S_READUNDEFINEDIFNULL;
DROP FUNCTION S_READLANGUAGE();
DROP FUNCTION S_READLANGUAGE(VARCHAR(500));
DROP FUNCTION S_READLANGUAGEANDDILECT(VARCHAR(500));
DROP FUNCTION S_READPROPERTYIFNULL (VARCHAR(500),VARCHAR(500));

-- there functions below are now deprecated as the collide with warehouse functin names
-- use the function names above

DROP FUNCTION vcToBi;
DROP PROCEDURE postProcessETL;
DROP PROCEDURE preProcessETL;

DROP PROCEDURE POSTPROCESSETLCASESTATUS;


DROP FUNCTION rpad;
DROP FUNCTION testReturnString;
DROP FUNCTION testReturnLong;
DROP FUNCTION testReturnInt;
DROP FUNCTION testReturnTimestamp;
DROP FUNCTION testReturnDate;

DROP FUNCTION getDate ;
DROP FUNCTION getDateTime;
DROP FUNCTION getSecondsBetween(DATE,DATE);
DROP FUNCTION getSecondsBetween(TIMESTAMP,TIMESTAMP);

DROP FUNCTION readPropertyFromDB;
DROP FUNCTION readUndefinedIFNull;
DROP FUNCTION readLanguage();
DROP FUNCTION readLanguage(VARCHAR(500));
DROP FUNCTION readPropertyIFNull (VARCHAR(500),VARCHAR(500));

drop procedure procedureReturnStringTest;
drop procedure procedureReturnTimestampTest;
drop procedure procedureReturnDateTest;

DROP PROCEDURE POSTPROCESSETLADDRESS;  

 