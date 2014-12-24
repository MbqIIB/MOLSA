--==============================================================
-- DBMS name:      IBM DB2 UDB 9.5.x Common Server
-- Created on:     06/11/2013 14:30:44
--==============================================================


--==============================================================
-- Table: S_ADDRESS
--==============================================================
create table S_ADDRESS
(
   ADDRESSID            BIGINT                 not null,
   COUNTRYCODE          VARCHAR(240),
   COUNTRYDESC          VARCHAR(2000),
   MODIFIABLEIND        CHAR(1),
   ADDRESSDATA          VARCHAR(8192),
   ADDRESSLAYOUTTYPE    VARCHAR(240),
   GEOCODE              VARCHAR(8192),
   LATITUDE             DOUBLE,
   LONGITUDE            DOUBLE,
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (ADDRESSID)
);

--==============================================================
-- Table: S_ADDRESSDETAIL
--==============================================================
create table S_ADDRESSDETAIL
(
   ADDRESSID            BIGINT                 not null,
   ADDRESS1             VARCHAR(2000),
   ADDRESS2             VARCHAR(2000),
   ADDRESS3             VARCHAR(2000),
   CITY                 VARCHAR(2000),
   STATE                VARCHAR(2000),
   COUNTY               VARCHAR(2000),
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (ADDRESSID)
);

--==============================================================
-- Table: S_ALLEGATION
--==============================================================
create table S_ALLEGATION
(
   ALLEGATIONID         BIGINT                 not null,
   CASEID               BIGINT,
   "TYPE"               VARCHAR(240),
   ALLEGATIONDATETIME   TIMESTAMP,
   METHOD               VARCHAR(240),
   LOCATION             VARCHAR(240),
   CREATIONDATE         DATE,
   REPORTEDDATETIME     TIMESTAMP,
   RECORDSTATUS         VARCHAR(240),
   SOURCECASEPARTICIPANTROLEID BIGINT,
   ANONYMOUSIND         CHAR(1),
   ADDRESSID            BIGINT,
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (ALLEGATIONID)
);

--==============================================================
-- Table: S_ALLEGATIONROLE
--==============================================================
create table S_ALLEGATIONROLE
(
   ALLEGATIONROLEID     BIGINT,
   ALLEGATIONID         BIGINT,
   CASEPARTICIPANTROLEID BIGINT,
   ROLETYPE             VARCHAR(240),
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP
);

--==============================================================
-- Table: S_ALTERNATENAME
--==============================================================
create table S_ALTERNATENAME
(
   ALTERNATENAMEID      BIGINT                 not null,
   CONCERNROLEID        BIGINT                 not null,
   TITLE                VARCHAR(240),
   FIRSTFORENAME        VARCHAR(2000),
   OTHERFORENAME        VARCHAR(2000),
   SURNAME              VARCHAR(2000),
   NAMESUFFIX           VARCHAR(120),
   NAMETYPE             VARCHAR(240),
   NAMESTATUS           VARCHAR(240),
   FULLNAME             VARCHAR(2000),
   COMMENTS             VARCHAR(2000),
   INITIALS             VARCHAR(240),
   UPPERFIRSTFORENAME   VARCHAR(2000),
   UPPERSURNAME         VARCHAR(2000),
   PHONETICENCODING     VARCHAR(240),
   VERSIONNO            BIGINT                 not null,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (ALTERNATENAMEID)
);

--==============================================================
-- Table: S_CASECLOSURE
--==============================================================
create table S_CASECLOSURE
(
   CASECLOSUREID        BIGINT                 not null,
   CASEID               BIGINT                 not null,
   CLOSUREDATE          DATE,
   REASONCODE           VARCHAR(240),
   RECORDSTATUS         VARCHAR(240),
   DESCRIPTION          VARCHAR(2000),
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_CASECLOSURE primary key (CASECLOSUREID)
);

--==============================================================
-- Table: S_CASEDEDUCTIONHISTORY
--==============================================================
create table S_CASEDEDUCTIONHISTORY
(
   DEDUCTIONHISTORYID   BIGINT                 not null,
   INSTRUCTLINEITEMID   BIGINT                 not null,
   CASEDEDUCTIONITEMID  BIGINT                 not null,
   AMOUNT               DECIMAL(31,2),
   EFFECTIVEDATE        DATE,
   STATUS               VARCHAR(240),
   COMMENTS             VARCHAR(2000),
   DEDUCTIONNAME        VARCHAR(2000),
   DEDUCTIONCAT         VARCHAR(2000),
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (DEDUCTIONHISTORYID)
);

--==============================================================
-- Table: S_CASEGROUP
--==============================================================
create table S_CASEGROUP
(
   CASECLIENTGROUPID    BIGINT                 not null,
   CASEID               BIGINT                 not null,
   CONCERNROLEID        BIGINT                 not null,
   GROUPCODE            VARCHAR(240),
   GROUPSTARTDATE       DATE                   not null,
   GROUPENDDATE         DATE,
   LASTWRITTEN          TIMESTAMP              not null,
   constraint P_CASECLIENTGROUPI primary key (CASECLIENTGROUPID)
);

--==============================================================
-- Table: S_CASEHEADER
--==============================================================
create table S_CASEHEADER
(
   CASEID               BIGINT                 not null,
   OWNERORGOBJECTLINKID BIGINT,
   INTEGRATEDCASEID     BIGINT,
   PLANID               BIGINT,
   CONCERNROLEID        BIGINT                 not null,
   REGISTRATIONDATE     DATE,
   EXPECTEDSTARTDATE    DATE,
   EXPECTEDENDDATE      DATE,
   STARTDATE            DATE,
   ENDDATE              DATE,
   EFFECTIVEDATE        DATE,
   STATUSCODE           VARCHAR(240),
   CLASSIFICATIONCODE   VARCHAR(240),
   PRIORITYCODE         VARCHAR(240),
   OBJECTIVECODE        VARCHAR(240),
   APPEALINDICATOR      CHAR(1)                not null,
   OUTCOMECODE          VARCHAR(240),
   COMMENTS             VARCHAR(2000),
   CASETYPECODE         VARCHAR(240),
   INTEGRATEDCASETYPE   VARCHAR(240),
   RECEIVEDDATE         DATE,
   DEFAULTDELIVERYMETHODTYPE VARCHAR(240),
   DEFAULTCURRENCYTYPECODE VARCHAR(240),
   FIRSTREVIEWDATE      DATE,
   CASEREFERENCE        VARCHAR(240)           not null,
   PRODUCTID            BIGINT,
   CASETYPEDESC         VARCHAR(2000),
   VERSIONNO            BIGINT                 not null,
   LASTWRITTEN          TIMESTAMP,
   constraint P_CASEHEADER primary key (CASEID)
);

--==============================================================
-- Table: S_CASEPARTICIPANTROLE
--==============================================================
create table S_CASEPARTICIPANTROLE
(
   CASEPARTICIPANTROLEID BIGINT                 not null,
   CASEID               BIGINT                 not null,
   CONCERNROLEID        BIGINT                 not null,
   FROMDATE             DATE,
   TODATE               DATE,
   TYPEDESC             VARCHAR(2000),
   TYPECODE             VARCHAR(240),
   RECORDSTATUS         VARCHAR(240),
   COMMENTS             VARCHAR(2000),
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (CASEPARTICIPANTROLEID)
);

--==============================================================
-- Table: S_CASERELATIONSHIP
--==============================================================
create table S_CASERELATIONSHIP
(
   RELATEDCASEID        BIGINT,
   STARTDATE            DATE,
   ENDDATE              DATE,
   STATUSCODE           VARCHAR(240),
   TYPECODE             VARCHAR(240),
   REASONCODE           VARCHAR(240),
   CASERELATIONSHIPID   BIGINT                 not null,
   CASEID               BIGINT                 not null,
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (CASERELATIONSHIPID)
);

--==============================================================
-- Table: S_CASEREVIEW
--==============================================================
create table S_CASEREVIEW
(
   CASEREVIEWID         BIGINT                 not null,
   CASEID               BIGINT                 not null,
   TYPECODE             VARCHAR(240),
   STARTDATE            DATE,
   ENDDATE              DATE,
   REASONCODE           VARCHAR(240),
   OUTCOMECODE          VARCHAR(240),
   STATUSCODE           VARCHAR(240),
   EXPECTCOMPLETEDATE   DATE,
   SCHEDULEDSTARTDATE   DATE,
   RECORDSTATUS         VARCHAR(240),
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_CASEREVIEW primary key (CASEREVIEWID)
);

--==============================================================
-- Table: S_CASESTATUS
--==============================================================
create table S_CASESTATUS
(
   CASESTATUSID         BIGINT                 not null,
   CASEID               BIGINT                 not null,
   STATUSCODE           VARCHAR(240),
   REASONCODE           VARCHAR(240),
   STARTDATE            DATE,
   ENDDATE              DATE,
   RELATEDID            BIGINT,
   STATUSDESCRIPTION    VARCHAR(2000),
   VERSIONNO            BIGINT                 not null,
   LASTWRITTEN          TIMESTAMP,
   constraint P_CASESTATUS primary key (CASESTATUSID)
);

--==============================================================
-- Table: S_CASEUSERROLE
--==============================================================
create table S_CASEUSERROLE
(
   CASEUSERROLEID       BIGINT                 not null,
   ORGOBJECTLINKID      BIGINT                 not null,
   CASEID               BIGINT                 not null,
   FROMDATE             DATE,
   TODATE               DATE,
   TYPECODE             VARCHAR(240),
   RECORDSTATUS         VARCHAR(240),
   COMMENTS             VARCHAR(2000),
   REASONCODE           VARCHAR(240),
   VERSIONNO            BIGINT                 not null,
   LASTWRITTEN          TIMESTAMP,
   constraint P_CASEUSERROLE primary key (CASEUSERROLEID)
);

--==============================================================
-- Table: S_CODETABLEDISPLAYNAME
--==============================================================
create table S_CODETABLEDISPLAYNAME
(
   TABLENAME            VARCHAR(2000)          not null,
   LOCALEIDENTIFIER     VARCHAR(240)           not null,
   DISPLAYNAME          VARCHAR(2000),
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (TABLENAME, LOCALEIDENTIFIER)
);

--==============================================================
-- Table: S_CODETABLEITEM
--==============================================================
create table S_CODETABLEITEM
(
   CODETABLENAME        VARCHAR(2000)          not null,
   CODE                 VARCHAR(240)           not null,
   DESCRIPTION          VARCHAR(2000),
   ANNOTATION           VARCHAR(2000),
   ISENABLED            CHAR(1)                not null,
   SORTORDER            BIGINT                 not null,
   LANGUAGECODE2        VARCHAR(240)           not null,
   LASTWRITTEN          TIMESTAMP,
   constraint P_CODETABLEITEM primary key (CODETABLENAME, CODE, LANGUAGECODE2)
);

--==============================================================
-- Table: S_CONCERNROLE
--==============================================================
create table S_CONCERNROLE
(
   CONCERNROLEID        BIGINT                 not null,
   ADDRESSID            BIGINT                 not null,
   CONCERNROLETYPE      VARCHAR(2000),
   CREATIONDATE         DATE,
   REGISTRATIONDATE     DATE,
   STARTDATE            DATE,
   ENDDATE              DATE,
   STATUSCODE           VARCHAR(240),
   LANGUAGECODE         VARCHAR(240),
   CONCERNROLENAME      VARCHAR(2000),
   PRIMARYALTERNATEID   VARCHAR(120),
   COMMENTS             VARCHAR(2000),
   REGUSERNAME          VARCHAR(2000),
   PREFERREDLANGUAGE    VARCHAR(2000),
   PREFCOMMFROMDATE     DATE,
   PREFCOMMTODATE       DATE,
   PREFCOMMMETHOD       VARCHAR(240),
   SENSITIVITY          VARCHAR(240),
   STATUSDESC           VARCHAR(2000),
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (CONCERNROLEID)
);

--==============================================================
-- Table: S_CONCERNROLEALTERNATEID
--==============================================================
create table S_CONCERNROLEALTERNATEID
(
   CONCERNROLEALTERNATEID BIGINT                 not null,
   CONCERNROLEID        BIGINT                 not null,
   ALTERNATEID          VARCHAR(120),
   TYPECODE             VARCHAR(240),
   STARTDATE            DATE,
   ENDDATE              DATE,
   STATUSCODE           VARCHAR(240),
   COMMENTS             VARCHAR(2000),
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (CONCERNROLEALTERNATEID)
);

--==============================================================
-- Table: S_CONCERNROLEDUPLICATE
--==============================================================
create table S_CONCERNROLEDUPLICATE
(
   CONCERNROLEDUPLICATEID BIGINT                 not null,
   ORIGINALCONCERNROLEID BIGINT,
   ORIGINALCONCERNROLETYPE VARCHAR(240),
   DUPLICATECONCERNROLEID BIGINT,
   DUPLICATECONCERNROLETYPE VARCHAR(240),
   DUPLICATEDATE        DATE,
   DUPLICATEREASON      VARCHAR(240),
   DUPLICATECOMMENTS    VARCHAR(2000),
   STATUSCODE           VARCHAR(240),
   DUPLICATEUSER        VARCHAR(256),
   UNMARKDATE           DATE,
   UNMARKREASON         VARCHAR(240),
   UNMARKUSER           VARCHAR(256),
   UNMARKCOMMENTS       VARCHAR(2000),
   VERSIONNO            BIGINT                 not null,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (CONCERNROLEDUPLICATEID)
);

--==============================================================
-- Table: S_CONCERNROLEMERGE
--==============================================================
create table S_CONCERNROLEMERGE
(
   CONCERNROLEMERGEID   BIGINT                 not null,
   CONCERNROLEDUPLICATEID BIGINT                 not null,
   MERGESTARTDATE       DATE,
   MERGEENDDATE         DATE,
   MERGESTATUS          VARCHAR(240),
   MERGESTARTEDBY       VARCHAR(256),
   MERGECOMPLETEDBY     VARCHAR(256),
   VERSIONNO            BIGINT                 not null,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (CONCERNROLEMERGEID)
);

--==============================================================
-- Table: S_CONCERNROLERELATIONSHIP
--==============================================================
create table S_CONCERNROLERELATIONSHIP
(
   CONCERNROLERELATIONSHIPID BIGINT                 not null,
   CONCERNROLEID        BIGINT                 not null,
   CONCERNROLETYPE      VARCHAR(240),
   RELCONCERNROLEID     BIGINT,
   RELCONCERNROLETYPE   VARCHAR(240),
   STARTDATE            DATE,
   ENDDATE              DATE,
   RELATIONSHIPTYPE     VARCHAR(240),
   RELENDREASONCODE     VARCHAR(240),
   STATUSCODE           VARCHAR(240),
   COMMENTS             VARCHAR(2000),
   CONCERNROLERECIPRELATIONID BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (CONCERNROLERELATIONSHIPID)
);

--==============================================================
-- Table: S_CONTACTLOG
--==============================================================
create table S_CONTACTLOG
(
   CONTACTLOGID         BIGINT                 not null,
   CONTACTLOGTYPE       VARCHAR(240),
   AUTHOR               VARCHAR(256),
   CREATEDDATETIME      TIMESTAMP,
   CREATEDBY            VARCHAR(2000),
   PURPOSE              VARCHAR(2000),
   STARTDATETIME        TIMESTAMP,
   ENDDATETIME          TIMESTAMP,
   METHOD               VARCHAR(240),
   LOCATION             VARCHAR(240),
   LOCATIONDESCRIPTION  VARCHAR(2000),
   ADDENDUMIND          CHAR(1),
   RECORDSTATUS         VARCHAR(240),
   CASEID               BIGINT,
   NOTEID               BIGINT,
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (CONTACTLOGID)
);

--==============================================================
-- Table: S_CONTACTLOGATTENDEE
--==============================================================
create table S_CONTACTLOGATTENDEE
(
   CONTACTLOGATTENDEEID BIGINT                 not null,
   CONTACTLOGID         BIGINT,
   ATTENDEETYPE         VARCHAR(240),
   CONCERNROLEID        BIGINT,
   USERNAME             VARCHAR(256),
   RECORDSTATUS         VARCHAR(240),
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (CONTACTLOGATTENDEEID)
);

--==============================================================
-- Table: S_CONTACTLOGCONCERN
--==============================================================
create table S_CONTACTLOGCONCERN
(
   CONTACTLOGCONCERNID  BIGINT                 not null,
   CONTACTLOGID         BIGINT,
   CONCERNROLEID        BIGINT,
   RECORDSTATUS         VARCHAR(240),
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (CONTACTLOGCONCERNID)
);

--==============================================================
-- Table: S_CONTACTLOGPURPOSE
--==============================================================
create table S_CONTACTLOGPURPOSE
(
   CONTACTLOGPURPOSEID  BIGINT                 not null,
   CONTACTLOGID         BIGINT,
   PURPOSE              VARCHAR(240),
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (CONTACTLOGPURPOSEID)
);

--==============================================================
-- Table: S_EDUCATION
--==============================================================
create table S_EDUCATION
(
   EDUCATIONID          BIGINT                 not null,
   CONCERNROLEID        BIGINT                 not null,
   FROMDATE             DATE,
   TODATE               DATE,
   COURSETYPE           VARCHAR(240),
   QUALIFICATION        VARCHAR(2000),
   INSTITUTION          VARCHAR(2000),
   QUALIFICATIONCODE    VARCHAR(240),
   STATUSCODE           VARCHAR(240),
   COMMENTS             VARCHAR(2000),
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (EDUCATIONID)
);

--==============================================================
-- Table: S_EMPLOYER
--==============================================================
create table S_EMPLOYER
(
   CONCERNROLEID        BIGINT                 not null,
   REGISTEREDNAME       VARCHAR(2000),
   TRADINGNAME          VARCHAR(2000),
   INDUSTRYTYPE         VARCHAR(2000),
   COMPANYTYPE          VARCHAR(240),
   BUSINESSDESC         VARCHAR(2000),
   INDUSTRYCODE         VARCHAR(240),
   SPECIALINTERESTCODE  VARCHAR(240),
   EXEMPTIONIND         CHAR(1),
   STATUSCODE           VARCHAR(240),
   COMMENTS             VARCHAR(2000),
   PRIMARYALTERNATEID   VARCHAR(120),
   NUMBERPERMANENTSTAFF BIGINT,
   NUMBERCASUALSTAFF    BIGINT,
   PINNUMBER            VARCHAR(240),
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_KEY_1 primary key (CONCERNROLEID)
);

--==============================================================
-- Table: S_ETLCONTROL
--==============================================================
create table S_ETLCONTROL
(
   TARGETTABLENAME      VARCHAR(2000)          not null,
   LAST_ETL_DATE        TIMESTAMP              not null,
   EXTRACTTIME          TIMESTAMP,
   TRUNCATEFLAG         CHAR(1),
   EXTRACTFINISH        TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (TARGETTABLENAME)
);

--==============================================================
-- Table: S_FINANCIALINSTRUCTION
--==============================================================
create table S_FINANCIALINSTRUCTION
(
   FININSTRUCTIONID     BIGINT                 not null,
   CONCERNROLEID        BIGINT                 not null,
   TYPECODE             VARCHAR(240),
   STATUSCODE           VARCHAR(240),
   AMOUNT               DECIMAL(31,2),
   EFFECTIVEDATE        DATE,
   POSTINGDATE          DATE,
   CREDITDEBITTYPE      VARCHAR(240),
   CURRENCYTYPECODE     VARCHAR(240),
   CURRENCYEXCHANGEID   BIGINT,
   INSTRUMENTGENIND     CHAR(1),
   COMMENTS             VARCHAR(2000),
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (FININSTRUCTIONID)
);

--==============================================================
-- Table: S_FINDING
--==============================================================
create table S_FINDING
(
   FINDINGID            BIGINT                 not null,
   ALLEGATIONID         BIGINT,
   FINDING              VARCHAR(240),
   OVERRIDEREASON       VARCHAR(240),
   EFFECTIVEDATE        DATE,
   CREATEDTIMESTAMP     TIMESTAMP,
   COMMENTS             VARCHAR(2000),
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (FINDINGID)
);

--==============================================================
-- Table: S_FUND
--==============================================================
create table S_FUND
(
   FUNDID               BIGINT                 not null,
   FUNDNAME             VARCHAR(2000)          not null,
   FUNDDESC             VARCHAR(2000)          not null,
   STARTDATE            DATE,
   ENDDATE              DATE,
   AMOUNT               DECIMAL(31,2)          not null,
   LASTWRITTEN          TIMESTAMP              not null,
   constraint P_IDENTIFIER_1 primary key (FUNDID)
);

--==============================================================
-- Table: S_FUNDRELATION
--==============================================================
create table S_FUNDRELATION
(
   FUNDID               BIGINT                 not null,
   PRODUCTID            BIGINT                 not null,
   DESCRIPTION          VARCHAR(2000),
   FUNDDESC             VARCHAR(2000),
   LASTWRITTEN          TIMESTAMP              not null,
   constraint P_IDENTIFIER_1 primary key (FUNDID, PRODUCTID)
);

--==============================================================
-- Table: S_INSTRUCTIONLINEITEM
--==============================================================
create table S_INSTRUCTIONLINEITEM
(
   INSTRUCTLINEITEMID   BIGINT                 not null,
   FININSTRUCTIONID     BIGINT                 not null,
   CASEID               BIGINT                 not null,
   CONCERNROLEID        BIGINT                 not null,
   PRIMARYCLIENTID      BIGINT                 not null,
   AMOUNT               DECIMAL(31,2),
   UNPROCESSEDAMOUNT    DECIMAL(31,2),
   CATEGORYCODE         VARCHAR(240),
   CATEGORYDESC         VARCHAR(2000),
   TYPECODE             VARCHAR(240),
   TYPEDESC             VARCHAR(2000),
   FINANCIALCOMPID      BIGINT,
   COVERPERIODFROM      DATE,
   COVERPERIODTO        DATE,
   EFFECTIVEDATE        DATE,
   CREATIONDATE         DATE,
   STATUSCODE           VARCHAR(240),
   CASENOMINEEID        BIGINT,
   DELIVERYMETHODTYPE   VARCHAR(240),
   DELIVERYMETHOD       VARCHAR(2000),
   CREDITDEBITTYPE      VARCHAR(240),
   CURRENCYEXCHANGEID   BIGINT,
   CURRENCYTYPECODE     VARCHAR(240),
   ADJUSTMENTIND        CHAR(1),
   ADJUSTMENTFREQUENCY  VARCHAR(240),
   NEXTADJUSTMENTDATE   DATE,
   INSTRUMENTGENIND     CHAR(1),
   FUNDID               BIGINT,
   MAXIMUMAMOUNT        DECIMAL(31,2),
   PARTICIPANTROLEID    BIGINT,
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (INSTRUCTLINEITEMID)
);

--==============================================================
-- Table: S_INTAKEPROGRAMAPPLICATION
--==============================================================
create table S_INTAKEPROGRAMAPPLICATION
(
   INTAKEPROGRAMAPPLICATIONID BIGINT                 not null,
   PROGRAMTYPEID        BIGINT,
   INTAKEAPPLICATIONID  BIGINT                 not null,
   CASEID               BIGINT,
   DISPOSITIONSTATUS    VARCHAR(240),
   DENIALREASON         VARCHAR(240),
   SUBMITTEDDATETIME    TIMESTAMP              not null,
   ENTEREDBYUSER        VARCHAR(2000),
   DISPOSEDDATETIME     TIMESTAMP,
   VERSIONNO            BIGINT                 not null,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (INTAKEPROGRAMAPPLICATIONID)
);

--==============================================================
-- Table: S_INVESTIGATIONDELIVERY
--==============================================================
create table S_INVESTIGATIONDELIVERY
(
   CASEID               BIGINT                 not null,
   RELATEDCASEID        BIGINT,
   RELATEDCONCERNROLEID BIGINT,
   INVESTIGATIONCONFIGID BIGINT,
   INVESTIGATIONTYPE    VARCHAR(240),
   INVESTIGATIONSUBTYPE VARCHAR(240),
   RESOLUTIONSTATUS     VARCHAR(240),
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (CASEID)
);

--==============================================================
-- Table: S_MILESTONECONFIGURATION
--==============================================================
create table S_MILESTONECONFIGURATION
(
   MILESTONECONFIGURATIONID BIGINT                 not null,
   "NAME"               VARCHAR(2000),
   "TYPE"               VARCHAR(512),
   EARLIESTSTARTDAY     BIGINT,
   DURATION             BIGINT,
   STARTDATE            DATE,
   ENDDATE              DATE,
   ADDEDEVENT           VARCHAR(2000),
   EXPCTDSTDATEEVENT    VARCHAR(2000),
   EXPCTDENDDATEEVENT   VARCHAR(2000),
   COMPLETEEVENT        VARCHAR(2000),
   CREATIONDATE         DATE,
   COMMENTS             VARCHAR(2000),
   RECORDSTATUS         VARCHAR(240),
   WAIVERREQUIRED       CHAR(1),
   WAIVERALLOWED        CHAR(1),
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (MILESTONECONFIGURATIONID)
);

--==============================================================
-- Table: S_ORGANISATION
--==============================================================
create table S_ORGANISATION
(
   ORGANISATIONID       BIGINT                 not null,
   ADDRESSID            BIGINT                 not null,
   ORGANISATIONNAME     VARCHAR(2048),
   TAXNUMBER            CHAR(72),
   REGISTRATIONNUMBER   VARCHAR(240),
   DESCRIPTION          VARCHAR(2000),
   PHONENUMBERID        BIGINT,
   FAXNUMBERID          BIGINT,
   EMAILADDRESSID       BIGINT,
   LOCATIONSECURITYLEVEL VARCHAR(240),
   ADDRESSCOMMENTS      VARCHAR(2000),
   LASTWRITTEN          TIMESTAMP              not null,
   constraint P_ORGANISATIONID_P primary key (ORGANISATIONID)
);

--==============================================================
-- Table: S_ORGANISATIONUNIT
--==============================================================
create table S_ORGANISATIONUNIT
(
   ORGANISATIONUNITID   BIGINT                 not null,
   "NAME"               VARCHAR(2000),
   PARENTORGANISATIONUNITID BIGINT,
   STATUSCODE           VARCHAR(240),
   RECORDSTATUS         VARCHAR(240),
   COMMENTS             VARCHAR(2000),
   BUSINESSTYPECODE     VARCHAR(240),
   CREATIONDATE         DATE,
   ORGANISATIONSTRUCTUREID BIGINT                 not null,
   DEFAULTPRINTERID     BIGINT,
   VERSIONNO            BIGINT                 not null,
   LASTWRITTEN          TIMESTAMP,
   constraint P_ORGANISATIONUNIT primary key (ORGANISATIONUNITID)
);

--==============================================================
-- Table: S_ORGOBJECTLINK
--==============================================================
create table S_ORGOBJECTLINK
(
   ORGOBJECTLINKID      BIGINT                 not null,
   ORGOBJECTREFERENCE   BIGINT,
   USERNAME             VARCHAR(256),
   ORGOBJECTTYPE        VARCHAR(240),
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (ORGOBJECTLINKID)
);

--==============================================================
-- Table: S_PAYMENTREGENERATIONREQUEST
--==============================================================
create table S_PAYMENTREGENERATIONREQUEST
(
   PMTINSTRUCTIONID     BIGINT,
   REQUESTDATE          DATE,
   REASONTEXT           VARCHAR(2000),
   OUTCOMECODE          VARCHAR(240),
   PMTREGENERATIONID    BIGINT                 not null,
   FININSTRUCTIONID     BIGINT                 not null,
   REQUESTEDBY          VARCHAR(2000)          not null,
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (PMTREGENERATIONID)
);

--==============================================================
-- Table: S_PERSON
--==============================================================
create table S_PERSON
(
   CONCERNROLEID        BIGINT                 not null,
   PERSONBIRTHNAME      VARCHAR(2000),
   DATEOFBIRTH          DATE,
   DATEOFDEATH          DATE,
   GENDER               VARCHAR(2000),
   SPECIALINTERESTCODE  VARCHAR(240),
   MARITALSTATUS        VARCHAR(2000),
   NATIONALITYCODE      VARCHAR(240),
   RESIDENCYABROADIND   CHAR(1),
   MOTHERBIRTHSURNAME   VARCHAR(2000),
   COMMENTS             VARCHAR(2000),
   PERSONTYPE           VARCHAR(240),
   DATEOFBIRTHVERIND    CHAR(1),
   DATEOFDEATHVERIND    CHAR(1),
   PRIMARYALTERNATEID   VARCHAR(120),
   COUNTRYOFBIRTH       VARCHAR(2000),
   ETHNICORIGIN         VARCHAR(2000),
   RACE                 VARCHAR(2000),
   INDIGENOUSGROUPCODE  VARCHAR(2000),
   INDIGENOUSPERSONIND  CHAR(1),
   VERSIONNO            BIGINT,
   STARTDATE            DATE,
   LASTWRITTEN          TIMESTAMP,
   CONSTITUTIONALSTATUS VARCHAR(240),
   constraint P_KEY_1 primary key (CONCERNROLEID)
);

--==============================================================
-- Table: S_POSITION
--==============================================================
create table S_POSITION
(
   POSITIONID           BIGINT                 not null,
   "NAME"               VARCHAR(2000),
   COMMENTS             VARCHAR(2000),
   LEADPOSITIONIND      CHAR(1)                not null,
   JOBID                BIGINT                 not null,
   FROMDATE             DATE,
   TODATE               DATE,
   RECORDSTATUS         VARCHAR(240),
   UPPERNAME            VARCHAR(2000),
   VERSIONNO            BIGINT                 not null,
   LASTWRITTEN          TIMESTAMP,
   ORGANISATIONUNITID   BIGINT,
   constraint P_POSITION primary key (POSITIONID)
);

--==============================================================
-- Table: S_POSITIONHOLDERLINK
--==============================================================
create table S_POSITIONHOLDERLINK
(
   POSITIONHOLDERLINKID BIGINT                 not null,
   USERNAME             VARCHAR(256)           not null,
   POSITIONID           BIGINT                 not null,
   FROMDATE             DATE,
   TODATE               DATE,
   RECORDSTATUS         VARCHAR(240),
   VERSIONNO            BIGINT                 not null,
   LASTWRITTEN          TIMESTAMP,
   ORGANISATIONSTRUCTUREID BIGINT,
   constraint P_POSITIONHOLDERLI primary key (POSITIONHOLDERLINKID)
);

--==============================================================
-- Table: S_PRODUCT
--==============================================================
create table S_PRODUCT
(
   PRODUCTID            BIGINT                 not null,
   CREATIONDATE         DATE,
   STARTDATE            DATE,
   ENDDATE              DATE,
   STATUSCODE           VARCHAR(240),
   "NAME"               VARCHAR(2000),
   PRODUCTTYPE          VARCHAR(2000),
   DESCRIPTION          VARCHAR(2000),
   COMMENTS             VARCHAR(2000),
   REVIEWFREQUENCY      VARCHAR(240),
   CERTIFICATIONFREQUENCY VARCHAR(240),
   ADJUSTMENTFREQUENCY  VARCHAR(240),
   RERATEFREQUENCY      VARCHAR(240),
   CERTGRACEPERIOD      BIGINT                 not null,
   DELIVERYMAXPERIOD    BIGINT                 not null,
   COVERPERIODTYPE      VARCHAR(240),
   EVIDENCEFORMNAME     VARCHAR(240),
   ADJUSTMENTIND        CHAR(1)                not null,
   ROUNDINGTYPECODE     VARCHAR(240),
   ESTIMATEDCOST        DECIMAL(31,2)          not null,
   LANGUAGECODE         VARCHAR(240),
   BENEFITIND           CHAR(1)                not null,
   ECURAMIND            CHAR(1)                not null,
   FUNDID               BIGINT,
   CERTIFIABLEIND       CHAR(1)                not null,
   REASSESSMENTACTIONTYPE VARCHAR(240),
   LIABILITYRECONCILIATIONTYPE VARCHAR(240),
   DEFAULTPRODUCTDELPATTERNID BIGINT,
   CONTRIBUTIONPRODUCTIND CHAR(1)                not null,
   COVERPERIODOFFSETAMOUNT BIGINT                 not null,
   MINDEDUCTIONAMOUNT   DECIMAL(31,2)          not null,
   MAXDEDUCTIONRATE     DOUBLE                 not null,
   READSECURITY         VARCHAR(2000),
   APPROVESECURITY      VARCHAR(2000),
   CREATESECURITY       VARCHAR(2000),
   MAINTAINSECURITY     VARCHAR(2000),
   ORDERPRODUCTIND      CHAR(1)                not null,
   LOCATIONSECURITYLEVEL VARCHAR(240),
   CASEHOMEPAGENAME     VARCHAR(2000),
   CALCULATECOSTIND     CHAR(1)                not null,
   OVERALLOCATIONIND    CHAR(1)                not null,
   ESTIMATECOSTIND      CHAR(1)                not null,
   VERSIONNO            BIGINT                 not null,
   AUTOUNDERPAYMENTCASEIND CHAR(1),
   LASTWRITTEN          TIMESTAMP,
   PPRODUCTTYPECODE     VARCHAR(240),
   constraint P_PRODUCT primary key (PRODUCTID)
);

--==============================================================
-- Table: S_PRODUCTDELIVERY
--==============================================================
create table S_PRODUCTDELIVERY
(
   CASEID               BIGINT                 not null,
   PRODUCTID            BIGINT                 not null,
   PRODUCTTYPE          VARCHAR(240),
   RECIPCONCERNROLEID   BIGINT                 not null,
   PHOLDCONCERNROLEID   BIGINT,
   ESTDELIVERYCOST      DECIMAL(31,2)          not null,
   CATEGORYCODE         VARCHAR(240),
   PROVIDERLOCATIONID   BIGINT,
   FREQOVERRIDEIND      CHAR(1)                not null,
   CERTFREQOVERIDEIND   CHAR(1)                not null,
   CERTIFICATIONFREQUENCY VARCHAR(240),
   PRODUCTPROVIDERID    BIGINT,
   DEFAULTREVIEWERID    VARCHAR(256),
   REVIEWFREQUENCY      VARCHAR(240),
   REVIEWFREQOVERRIDEIND CHAR(1)                not null,
   VERSIONNO            BIGINT                 not null,
   LASTWRITTEN          TIMESTAMP
);

--==============================================================
-- Table: S_PRODUCTPROVISION
--==============================================================
create table S_PRODUCTPROVISION
(
   PRODUCTPROVISIONID   BIGINT                 not null,
   PRODUCTID            BIGINT                 not null,
   CONCERNROLEID        BIGINT                 not null,
   STARTDATE            DATE,
   ENDDATE              DATE,
   CREATIONDATE         DATE,
   COMMENTS             VARCHAR(2000),
   STATUSCODE           VARCHAR(240),
   ESTIMATEDCOST        DECIMAL(31,2),
   NEXTPAYMENTDATE      DATE,
   PAYMENTFREQUENCY     VARCHAR(240),
   METHODOFPMTCODE      VARCHAR(240),
   CURRENCYTYPE         VARCHAR(240),
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (PRODUCTPROVISIONID)
);

--==============================================================
-- Table: S_PROVIDER
--==============================================================
create table S_PROVIDER
(
   PROVIDERCONCERNROLEID BIGINT                 not null,
   PROVIDERENQUIRYID    BIGINT,
   PHYSICALCAPACITY     BIGINT,
   PAYMENTFREQUENCY     VARCHAR(240),
   METHODOFPAYMENT      BIGINT,
   CURRENCYTYPE         VARCHAR(240),
   RECORDSTATUS         VARCHAR(240),
   RESERVATIONGRACEPERIOD BIGINT,
   OVERRIDEMDRIND       CHAR(1),
   PREFERREDSEMETHOD    VARCHAR(240),
   AREASSVDINFOTXTID    BIGINT,
   CLIENTINFOTEXTID     BIGINT,
   "NAME"               VARCHAR(2000),
   NAMEUPPER            VARCHAR(2000),
   VERSIONNO            BIGINT                 not null,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (PROVIDERCONCERNROLEID)
);

--==============================================================
-- Table: S_REPORTINGDUMMY
--==============================================================
create table S_REPORTINGDUMMY
(
   DUMMYID              BIGINT                 not null default 1,
   DUMMYCODE            VARCHAR(240)           default 'Dummy ETL',
   constraint P_IDENTIFIER_1 primary key (DUMMYID)
);

--==============================================================
-- Table: S_REPORTINGSTATUS
--==============================================================
create table S_REPORTINGSTATUS
(
   STATUSKEY            BIGINT                 not null,
   STATUSCODE           VARCHAR(240),
   STATUSDESC           VARCHAR(2000),
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (STATUSKEY)
);

--==============================================================
-- Table: S_RESOLUTIONCONFIGURATION
--==============================================================
create table S_RESOLUTIONCONFIGURATION
(
   RESOLUTIONCONFIGURATIONID BIGINT                 not null,
   RESOLUTION           VARCHAR(240),
   CREATIONDATE         DATE,
   EVENTCLASSANDTYPE    VARCHAR(2000),
   VERSIONNO            BIGINT                 not null,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (RESOLUTIONCONFIGURATIONID)
);

--==============================================================
-- Table: S_SERVICE
--==============================================================
create table S_SERVICE
(
   SERVICEID            BIGINT                 not null,
   DESCRIPTION          VARCHAR(2000),
   SERVICECODE          VARCHAR(240),
   STARTDATE            DATE,
   ENDDATE              DATE,
   CESSATIONREASONCD    VARCHAR(240),
   CESSATIONREASONTXT   VARCHAR(2000),
   STATUSCODE           VARCHAR(240),
   COMMENTS             VARCHAR(2000),
   TYPEDESC             VARCHAR(2000),
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (SERVICEID)
);

--==============================================================
-- Table: S_SERVICEOFFERING
--==============================================================
create table S_SERVICEOFFERING
(
   SERVICEOFFERINGID    BIGINT                 not null,
   "NAME"               VARCHAR(2000),
   DESCRIPTION          VARCHAR(2000),
   STARTDATE            DATE,
   ENDDATE              DATE,
   UNITOFMEASURE        VARCHAR(240),
   MAXIMUMUNITS         BIGINT,
   UNITFREQUENCY        VARCHAR(240),
   COMMENTS             VARCHAR(2000),
   RECORDSTATUS         VARCHAR(240),
   NAMEUPPER            VARCHAR(2000),
   PLACEMENTPMTIND      CHAR(1),
   SAPLMTINHIBITIND     CHAR(1),
   PAYBASEDONATTENDANCEIND CHAR(1),
   TRAININGIND          CHAR(1),
   SPECIALCONDITIONTYPE VARCHAR(240),
   PROVISIONMETHOD      VARCHAR(240),
   DELIVERYFREQUENCY    VARCHAR(240),
   SINGLEORMULTIPLECLIENTS VARCHAR(240),
   REFERENCE            VARCHAR(2000),
   NAMETEXTID           BIGINT,
   DESCRIPTIONTEXTID    BIGINT,
   REFERENCEUPPER       VARCHAR(2000),
   VERSIONNO            BIGINT                 not null,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (SERVICEOFFERINGID)
);

--==============================================================
-- Table: S_SERVICESUPPLIERLINK
--==============================================================
create table S_SERVICESUPPLIERLINK
(
   SERVICESUPPLIERLINKID BIGINT                 not null,
   SERVICEID            BIGINT                 not null,
   CONCERNROLEID        BIGINT                 not null,
   STARTDATE            DATE,
   ENDDATE              DATE,
   STATUSCODE           VARCHAR(240),
   COMMENTS             VARCHAR(2000),
   NEXTPAYMENTDATE      DATE,
   PAYMENTFREQUENCY     VARCHAR(240),
   METHODOFPMTCODE      VARCHAR(240),
   CURRENCYTYPE         VARCHAR(240),
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (SERVICESUPPLIERLINKID)
);

--==============================================================
-- Table: S_STATUSMAPPING
--==============================================================
create table S_STATUSMAPPING
(
   CODETABLENAME        VARCHAR(2000)          not null,
   CODE                 VARCHAR(240)           not null,
   STATUSKEY            BIGINT                 not null,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (CODE)
);

--==============================================================
-- Table: S_SUSPENSEACCOUNT
--==============================================================
create table S_SUSPENSEACCOUNT
(
   SUSPENSEACCOUNTID    BIGINT                 not null,
   ADDRESSID            BIGINT                 not null,
   CONCERNROLEID        BIGINT                 not null,
   AMOUNT               DECIMAL(31,2),
   RECEIVEDDATE         DATE,
   EFFECTIVEDATE        DATE,
   CREATIONDATE         DATE,
   DATEPOSTED           DATE,
   PMTRECINSTRUMENTID   BIGINT,
   STATUS               VARCHAR(2000),
   CURRENCYTYPECODE     VARCHAR(240),
   CURRENCYEXCHANGEID   BIGINT,
   RECEIPTMETHOD        VARCHAR(2000),
   PAYMENTCODE          VARCHAR(240),
   ISSUERNAME           VARCHAR(2000),
   CHEQUENUMBER         VARCHAR(240),
   LEDGERNUMBER         VARCHAR(240),
   ORIGINSORTCODE       VARCHAR(240),
   ORIGINACCOUNTNUMBER  VARCHAR(240),
   ORIGINACCOUNTNAME    VARCHAR(240),
   DESTSORTCODE         VARCHAR(240),
   DESTACCOUNTNUMBER    VARCHAR(240),
   DESTACCOUNTNAME      VARCHAR(240),
   REFERENCETEXT        VARCHAR(240),
   DEPOSITSLIPNUMBER    BIGINT,
   RECEIPTNUMBER        BIGINT,
   COMMENTS             VARCHAR(2000),
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (SUSPENSEACCOUNTID)
);

--==============================================================
-- Table: S_USERS
--==============================================================
create table S_USERS
(
   USERNAME             VARCHAR(256)           not null,
   CREATIONDATE         DATE,
   PASSWORD             VARCHAR(240),
   PWDCHANGEEVERYXDAY   BIGINT                 not null,
   PASSWORDCHANGED      DATE,
   LOGINFAILURES        BIGINT                 not null,
   ROLENAME             VARCHAR(2000),
   APPLICATIONCODE      VARCHAR(240),
   ACCOUNTENABLED       CHAR(1)                not null,
   FIRSTNAME            VARCHAR(2000),
   SURNAME              VARCHAR(2000),
   TITLE                VARCHAR(240),
   GRADECODE            VARCHAR(240),
   STATUSCODE           VARCHAR(240),
   LOCATIONID           BIGINT                 not null,
   DEFAULTPRINTERID     BIGINT,
   FULLNAME             VARCHAR(2000),
   BUSINESSPHONEID      BIGINT,
   PERSONALPHONENUMBERID BIGINT,
   BUSINESSEMAILID      BIGINT,
   PERSONALEMAILID      BIGINT,
   MOBILEPHONEID        BIGINT,
   PAGERID              BIGINT,
   FAXID                BIGINT,
   LOGINRESTRICTIONS    CHAR(1)                not null,
   LOGINTIMEFROM        DATE,
   LOGINTIMETO          DATE,
   LOGINDAYSUN          CHAR(1)                not null,
   LOGINDAYMON          CHAR(1)                not null,
   LOGINDAYTUES         CHAR(1)                not null,
   LOGINDAYWED          CHAR(1)                not null,
   LOGINDAYTHURS        CHAR(1)                not null,
   LOGINDAYFRI          CHAR(1)                not null,
   LOGINDAYSAT          CHAR(1)                not null,
   PASSWORDEXPIRYDATE   DATE,
   LASTSUCCESSLOGIN     DATE,
   PWDCHANGEAFTERXLOG   BIGINT                 not null,
   LOGSSINCEPWDCHANGE   BIGINT                 not null,
   CTIENABLED           CHAR(1)                not null,
   SENSITIVITY          VARCHAR(240)           not null,
   ORGUNITID            BIGINT,
   VERSIONNO            BIGINT                 not null,
   LASTWRITTEN          TIMESTAMP,
   constraint P_USERS primary key (USERNAME)
);

--==============================================================
-- Table: S_UTILITY
--==============================================================
create table S_UTILITY
(
   CONCERNROLEID        BIGINT                 not null,
   "NAME"               VARCHAR(2000),
   REGISTEREDNAME       VARCHAR(2000),
   UTILITYTYPE          VARCHAR(2000),
   UTILITYCODE          VARCHAR(240),
   METHODOFPMTCODE      VARCHAR(240),
   PAYMENTFREQUENCY     VARCHAR(240),
   STATUSCODE           VARCHAR(240),
   COMMENTS             VARCHAR(2000),
   PRIMARYALTERNATEID   VARCHAR(120),
   MAXIMUMPAYMENTRATE   BIGINT,
   MINIMUMPAYMENTAMOUNT DECIMAL(31,2),
   NEXTPAYMENTDATE      DATE,
   CURRENCYTYPE         VARCHAR(240),
   VERSIONNO            BIGINT,
   LASTWRITTEN          TIMESTAMP,
   constraint P_KEY_1 primary key (CONCERNROLEID)
);

--==============================================================
-- Table: S_WORKQUEUE
--==============================================================
create table S_WORKQUEUE
(
   WORKQUEUEID          BIGINT                 not null,
   "NAME"               VARCHAR(2000),
   ALLOWUSERSUBSCRIPTIONIND CHAR(1)                not null,
   SENSITIVITY          VARCHAR(240),
   ADMINISTRATORUSERNAME VARCHAR(2000),
   COMMENTS             VARCHAR(2000),
   UPPERNAME            VARCHAR(2000),
   UPPERADMINISTRATORUSERNAME VARCHAR(2000),
   VERSIONNO            BIGINT                 not null,
   LASTWRITTEN          TIMESTAMP,
   constraint P_IDENTIFIER_1 primary key (WORKQUEUEID)
);

--==============================================================
-- View: CASEOWNERVIEW
--==============================================================

create view CASEOWNERVIEW as
select
   users.username,
   orgunit.organisationunitid,
   users.lastwritten
from
   s_users users,
   s_positionholderlink phl,
   s_position position,
   s_organisationunit orgunit
where
    users.username in (select distinct t1temp.ownerorgobjectlinkid from s_caseheader t1temp) 
    and users.username = phl.username
    and phl.positionid = position.positionid;

--==============================================================
-- View: S_CASECLOSUREVIEW
--==============================================================

create view S_CASECLOSUREVIEW as
select t2.caseid, t2.reasoncode, t3.description 
from S_CASECLOSURE t2, S_CODETABLEITEM t3 
where t2.reasoncode=t3.code and t3.codetablename='CaseCloseReason';

--==============================================================
-- View: S_CASESTATUSVIEW
--==============================================================

create view S_CASESTATUSVIEW as
SELECT	qu.casestatusid, qu.caseid, qu.startdate, qu.enddate, qu.statuscode, qu.casestatusdesc, qu.caseclosuredesc, qu.lastwritten
FROM 	(SELECT t1.casestatusid, t1.caseid, t1.startdate, t1.enddate, t1.statuscode, t1.statusdescription AS casestatusdesc,
		t2.description AS caseclosuredesc, t1.lastwritten,
		ROW_NUMBER( ) OVER (PARTITION BY t1.caseid, t1.statuscode ORDER BY t1.enddate DESC NULLS FIRST, t1.startdate DESC, t1.lastwritten DESC) row_num
	FROM 	s_casestatus t1 LEFT JOIN S_caseclosure t2 
		ON t1.caseid=t2.caseid) qu
WHERE 	qu.row_num = 1;

--==============================================================
-- View: S_PERSONHISTORYVIEW
--==============================================================

create view S_PERSONHISTORYVIEW as
select 
   T1.CONCERNROLEID as CONCERNROLEID, 
   T1.PERSONBIRTHNAME as PERSONBIRTHNAME, 
   T1.DATEOFBIRTH as DATEOFBIRTH, 
   T1.DATEOFDEATH as DATEOFDEATH, 
   COALESCE(T_Gender.DESCRIPTION, s_readPropertyFromDB('BI.UNDEFINED')) as GENDER, 
   COALESCE(T_Gender.code,'UNDEFINED') as gender_code, 
   T1.SPECIALINTERESTCODE as SPECIALINTERESTCODE, 
   COALESCE(T_Marital.DESCRIPTION, s_readPropertyFromDB('BI.UNDEFINED')) as MARITALSTATUS, 
   COALESCE(T_Marital.code,'UNDEFINED') as marital_code, 
   COALESCE(T_NATIONALITY.DESCRIPTION, s_readPropertyFromDB('BI.UNDEFINED')) as NATIONALITY, 
   COALESCE(T_NATIONALITY.code, 'Undefined') as nationality_code, 
   T1.RESIDENCYABROADIND as RESIDENCYABROADIND, 
   T1.MOTHERBIRTHSURNAME as MOTHERBIRTHSURNAME, 
   T1.COMMENTS as COMMENTS, 
   T1.PERSONTYPE as PERSONTYPE, 
   COALESCE(T_Persontype.code, 'Undefined') as persontype_code, 
   T1.DATEOFBIRTHVERIND as DATEOFBIRTHVERIND, 
   T1.DATEOFDEATHVERIND as DATEOFDEATHVERIND, 
   T1.PRIMARYALTERNATEID as PRIMARYALTERNATEID, 
   COALESCE(T_Country.DESCRIPTION, s_readPropertyFromDB('BI.UNDEFINED')) as COUNTRYOFBIRTH, 
   COALESCE(T_Country.code, 'UNDEFINED') as COUNTRYOFBIRTH_code, 
   COALESCE(T_Race.Description, s_readPropertyFromDB('BI.UNDEFINED')) as RACE, 
   COALESCE(T_race.code, 'Undefined') as race_code, 
   COALESCE(T_Ethnic.DESCRIPTION, s_readPropertyFromDB('BI.UNDEFINED')) as ETHNICORIGIN, 
   COALESCE(T_Ethnic.code, 'UNDEFINED') as ethnicorigin_code, 
   COALESCE(T_Indigenous.DESCRIPTION, s_readPropertyFromDB('BI.UNDEFINED')) as INDIGENOUSGROUP, 
   COALESCE(T_Indigenous.code, 'Undefined') as indigenous_code, 
   COALESCE(T_Constitutionlstatus.DESCRIPTION, s_readPropertyFromDB('BI.UNDEFINED')) as CONSTITUTIONLSTATUS, 
   COALESCE(T_Constitutionlstatus.code, 'Undefined') as constatus_code, 
   T1.INDIGENOUSPERSONIND as INDIGENOUSPERSONIND, 
   T1.VERSIONNO as VERSIONNO, 
   T1.LASTWRITTEN as LASTWRITTEN, 
   T1.STARTDATE as STARTDATE 
from 
   S_Person T1 
   Inner join S_Codetableitem T_Gender on T_Gender.code = T1.gender 
   Left outer join S_Codetableitem T_Marital on T_Marital.code = T1.MARITALSTATUS   
        and T_Marital.CODETABLENAME = 'MaritalStatus' 
   Left outer join S_Codetableitem T_Country on T_Country.code = T1.COUNTRYOFBIRTH 
        and T_Country.CODETABLENAME = 'Country' 
   Left outer join S_Codetableitem T_Ethnic on T1.ETHNICORIGIN = T_Ethnic.CODE 
        and T_Ethnic.CODETABLENAME = 'EthnicOrigin' 
   Left outer join S_Codetableitem T_Nationality on T_Nationality.CODE = T1.NATIONALITYCODE 
        and T_Nationality.CODETABLENAME = 'Nationality'         
   Left outer join S_Codetableitem T_Race on T_Race.CODE = T1.RACE 
        and T_Race.CODETABLENAME = 'RaceCode' 
   Left outer join S_Codetableitem T_Indigenous on T_Indigenous.CODE = T1.INDIGENOUSGROUPCODE 
        and T_Indigenous.CODETABLENAME = 'IndigenousGroupCode' 
   Left outer join S_Codetableitem T_Constitutionlstatus on T_Constitutionlstatus.CODE = T1.CONSTITUTIONALSTATUS 
        and T_Constitutionlstatus.CODETABLENAME = 'LinkinConstitutionlStatus' 
   Left outer join S_Codetableitem T_Persontype on T_Persontype.CODE = T1.Persontype 
        and T_Constitutionlstatus.CODETABLENAME = 'PersonType';

