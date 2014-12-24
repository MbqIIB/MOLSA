/*==============================================================*/
/* DBMS name:      ORACLE Version 11.x                          */
/* Created on:     06/11/2013 14:27:37                          */
/*==============================================================*/


/*==============================================================*/
/* Table: S_ADDRESS                                             */
/*==============================================================*/
create table S_ADDRESS  (
   ADDRESSID            NUMBER(19,0)                    not null,
   COUNTRYCODE          VARCHAR2(60),
   COUNTRYDESC          VARCHAR2(500),
   MODIFIABLEIND        CHAR(1),
   ADDRESSDATA          VARCHAR2(2048),
   ADDRESSLAYOUTTYPE    VARCHAR2(60),
   GEOCODE              VARCHAR2(2048),
   LATITUDE             NUMBER(31,2),
   LONGITUDE            NUMBER(31,2),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_ADDRESS primary key (ADDRESSID)
);

/*==============================================================*/
/* Table: S_ADDRESSDETAIL                                       */
/*==============================================================*/
create table S_ADDRESSDETAIL  (
   ADDRESSID            NUMBER(19,0)                    not null,
   ADDRESS1             VARCHAR2(500),
   ADDRESS2             VARCHAR2(500),
   ADDRESS3             VARCHAR2(500),
   CITY                 VARCHAR2(500),
   STATE                VARCHAR2(500),
   COUNTY               VARCHAR2(500),
   LASTWRITTEN          DATE,
   constraint PK_S_ADDRESSDETAIL primary key (ADDRESSID)
);

/*==============================================================*/
/* Table: S_ALLEGATION                                          */
/*==============================================================*/
create table S_ALLEGATION  (
   ALLEGATIONID         NUMBER(19,0)                    not null,
   CASEID               NUMBER(19,0),
   TYPE                 VARCHAR2(60),
   ALLEGATIONDATETIME   DATE,
   METHOD               VARCHAR2(60),
   LOCATION             VARCHAR2(60),
   CREATIONDATE         DATE,
   REPORTEDDATETIME     DATE,
   RECORDSTATUS         VARCHAR2(60),
   SOURCECASEPARTICIPANTROLEID NUMBER(19,0),
   ANONYMOUSIND         CHAR(1),
   ADDRESSID            NUMBER(19,0),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_ALLEGATION primary key (ALLEGATIONID)
);

/*==============================================================*/
/* Table: S_ALLEGATIONROLE                                      */
/*==============================================================*/
create table S_ALLEGATIONROLE  (
   ALLEGATIONROLEID     NUMBER(19,0),
   ALLEGATIONID         NUMBER(19,0),
   CASEPARTICIPANTROLEID NUMBER(19,0),
   ROLETYPE             VARCHAR2(60),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE
);

/*==============================================================*/
/* Table: S_ALTERNATENAME                                       */
/*==============================================================*/
create table S_ALTERNATENAME  (
   ALTERNATENAMEID      NUMBER(19,0)                    not null,
   CONCERNROLEID        NUMBER(19,0)                    not null,
   TITLE                VARCHAR2(60),
   FIRSTFORENAME        VARCHAR2(500),
   OTHERFORENAME        VARCHAR2(500),
   SURNAME              VARCHAR2(500),
   NAMESUFFIX           VARCHAR(30),
   NAMETYPE             VARCHAR2(60),
   NAMESTATUS           VARCHAR2(60),
   FULLNAME             VARCHAR2(500),
   COMMENTS             VARCHAR2(500),
   INITIALS             VARCHAR2(60),
   UPPERFIRSTFORENAME   VARCHAR2(500),
   UPPERSURNAME         VARCHAR2(500),
   PHONETICENCODING     VARCHAR2(60),
   VERSIONNO            NUMBER(19,0)                    not null,
   LASTWRITTEN          DATE,
   constraint PK_S_ALTERNATENAME primary key (ALTERNATENAMEID)
);

/*==============================================================*/
/* Table: S_CASECLOSURE                                         */
/*==============================================================*/
create table S_CASECLOSURE  (
   CASECLOSUREID        NUMBER(19,0)                    not null,
   CASEID               NUMBER(19,0)                    not null,
   CLOSUREDATE          DATE,
   REASONCODE           VARCHAR2(60),
   RECORDSTATUS         VARCHAR2(60),
   DESCRIPTION          VARCHAR2(500),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_CASECLOSURE primary key (CASECLOSUREID)
);

/*==============================================================*/
/* Table: S_CASEDEDUCTIONHISTORY                                */
/*==============================================================*/
create table S_CASEDEDUCTIONHISTORY  (
   DEDUCTIONHISTORYID   NUMBER(19,0)                    not null,
   CASEDEDUCTIONITEMID  NUMBER(19,0)                    not null,
   INSTRUCTLINEITEMID   NUMBER(19,0)                    not null,
   AMOUNT               NUMBER(31,2),
   EFFECTIVEDATE        DATE,
   STATUS               VARCHAR2(60),
   COMMENTS             VARCHAR2(500),
   DEDUCTIONNAME        VARCHAR2(500),
   DEDUCTIONCAT         VARCHAR2(500),
   LASTWRITTEN          DATE,
   constraint PK_S_CASEDEDUCTIONHISTORY primary key (DEDUCTIONHISTORYID)
);

/*==============================================================*/
/* Table: S_CASEGROUP                                           */
/*==============================================================*/
create table S_CASEGROUP  (
   CASECLIENTGROUPID    NUMBER(19,0)                    not null,
   CASEID               NUMBER(19,0)                    not null,
   CONCERNROLEID        NUMBER(19,0)                    not null,
   GROUPCODE            VARCHAR2(60),
   GROUPSTARTDATE       DATE                            not null,
   GROUPENDDATE         DATE,
   LASTWRITTEN          DATE                            not null,
   constraint PK_S_CASEGROUP primary key (CASECLIENTGROUPID)
);

/*==============================================================*/
/* Table: S_CASEHEADER                                          */
/*==============================================================*/
create table S_CASEHEADER  (
   CASEID               NUMBER(19,0)                    not null,
   OWNERORGOBJECTLINKID NUMBER(19,0),
   INTEGRATEDCASEID     NUMBER(19,0),
   PLANID               NUMBER(19,0),
   CONCERNROLEID        NUMBER(19,0)                    not null,
   REGISTRATIONDATE     DATE,
   EXPECTEDSTARTDATE    DATE,
   EXPECTEDENDDATE      DATE,
   STARTDATE            DATE,
   ENDDATE              DATE,
   EFFECTIVEDATE        DATE,
   STATUSCODE           VARCHAR2(60),
   CLASSIFICATIONCODE   VARCHAR2(60),
   PRIORITYCODE         VARCHAR2(60),
   OBJECTIVECODE        VARCHAR2(60),
   APPEALINDICATOR      CHAR(1)                         not null,
   OUTCOMECODE          VARCHAR2(60),
   COMMENTS             VARCHAR2(500),
   CASETYPECODE         VARCHAR2(60),
   INTEGRATEDCASETYPE   VARCHAR2(60),
   RECEIVEDDATE         DATE,
   DEFAULTDELIVERYMETHODTYPE VARCHAR2(60),
   DEFAULTCURRENCYTYPECODE VARCHAR2(60),
   FIRSTREVIEWDATE      DATE,
   CASEREFERENCE        VARCHAR2(60)                    not null,
   PRODUCTID            NUMBER(19,0),
   CASETYPEDESC         VARCHAR2(500),
   VERSIONNO            NUMBER(19,0)                    not null,
   LASTWRITTEN          DATE,
   constraint PK_S_CASEHEADER primary key (CASEID)
);

/*==============================================================*/
/* Table: S_CASEPARTICIPANTROLE                                 */
/*==============================================================*/
create table S_CASEPARTICIPANTROLE  (
   CASEPARTICIPANTROLEID NUMBER(19,0)                    not null,
   CASEID               NUMBER(19,0)                    not null,
   CONCERNROLEID        NUMBER(19,0)                    not null,
   FROMDATE             DATE,
   TODATE               DATE,
   TYPEDESC             VARCHAR2(500),
   TYPECODE             VARCHAR2(60),
   RECORDSTATUS         VARCHAR2(60),
   COMMENTS             VARCHAR2(500),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_CASEPARTICIPANTROLE primary key (CASEPARTICIPANTROLEID)
);

/*==============================================================*/
/* Table: S_CASERELATIONSHIP                                    */
/*==============================================================*/
create table S_CASERELATIONSHIP  (
   RELATEDCASEID        NUMBER(19,0),
   STARTDATE            DATE,
   ENDDATE              DATE,
   STATUSCODE           VARCHAR2(60),
   TYPECODE             VARCHAR2(60),
   REASONCODE           VARCHAR2(60),
   CASERELATIONSHIPID   NUMBER(19,0)                    not null,
   CASEID               NUMBER(19,0)                    not null,
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_CASERELATIONSHIP primary key (CASERELATIONSHIPID)
);

/*==============================================================*/
/* Table: S_CASEREVIEW                                          */
/*==============================================================*/
create table S_CASEREVIEW  (
   CASEREVIEWID         NUMBER(19,0)                    not null,
   CASEID               NUMBER(19,0)                    not null,
   TYPECODE             VARCHAR2(60),
   STARTDATE            DATE,
   ENDDATE              DATE,
   REASONCODE           VARCHAR2(60),
   OUTCOMECODE          VARCHAR2(60),
   STATUSCODE           VARCHAR2(60),
   EXPECTCOMPLETEDATE   DATE,
   SCHEDULEDSTARTDATE   DATE,
   RECORDSTATUS         VARCHAR2(60),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_CASEREVIEW primary key (CASEREVIEWID)
);

/*==============================================================*/
/* Table: S_CASESTATUS                                          */
/*==============================================================*/
create table S_CASESTATUS  (
   CASESTATUSID         NUMBER(19,0)                    not null,
   CASEID               NUMBER(19,0)                    not null,
   STATUSCODE           VARCHAR2(60),
   REASONCODE           VARCHAR2(60),
   STARTDATE            DATE,
   ENDDATE              DATE,
   RELATEDID            NUMBER(19,0),
   STATUSDESCRIPTION    VARCHAR2(500),
   VERSIONNO            NUMBER(19,0)                    not null,
   LASTWRITTEN          DATE,
   constraint PK_S_CASESTATUS primary key (CASESTATUSID)
);

/*==============================================================*/
/* Table: S_CASEUSERROLE                                        */
/*==============================================================*/
create table S_CASEUSERROLE  (
   CASEUSERROLEID       NUMBER(19,0)                    not null,
   ORGOBJECTLINKID      NUMBER(19,0)                    not null,
   CASEID               NUMBER(19,0)                    not null,
   FROMDATE             DATE,
   TODATE               DATE,
   TYPECODE             VARCHAR2(60),
   RECORDSTATUS         VARCHAR2(60),
   COMMENTS             VARCHAR2(500),
   REASONCODE           VARCHAR2(60),
   VERSIONNO            NUMBER(19,0)                    not null,
   LASTWRITTEN          DATE,
   constraint PK_S_CASEUSERROLE primary key (CASEUSERROLEID)
);

/*==============================================================*/
/* Table: S_CODETABLEDISPLAYNAME                                */
/*==============================================================*/
create table S_CODETABLEDISPLAYNAME  (
   TABLENAME            VARCHAR2(500)                   not null,
   LOCALEIDENTIFIER     VARCHAR2(60)                    not null,
   DISPLAYNAME          VARCHAR2(500),
   LASTWRITTEN          DATE,
   constraint PK_S_CODETABLEDISPLAYNAME primary key (TABLENAME, LOCALEIDENTIFIER)
);

/*==============================================================*/
/* Table: S_CODETABLEITEM                                       */
/*==============================================================*/
create table S_CODETABLEITEM  (
   CODETABLENAME        VARCHAR2(500)                   not null,
   CODE                 VARCHAR2(60)                    not null,
   DESCRIPTION          VARCHAR2(500),
   ANNOTATION           VARCHAR2(500),
   ISENABLED            CHAR(1)                         not null,
   SORTORDER            NUMBER(19,0)                    not null,
   LANGUAGECODE2        VARCHAR2(60)                    not null,
   LASTWRITTEN          DATE,
   constraint PK_S_CODETABLEITEM primary key (CODETABLENAME, CODE, LANGUAGECODE2)
);

/*==============================================================*/
/* Table: S_CONCERNROLE                                         */
/*==============================================================*/
create table S_CONCERNROLE  (
   CONCERNROLEID        NUMBER(19,0)                    not null,
   ADDRESSID            NUMBER(19,0)                    not null,
   CONCERNROLETYPE      VARCHAR2(500),
   CREATIONDATE         DATE,
   REGISTRATIONDATE     DATE,
   STARTDATE            DATE,
   ENDDATE              DATE,
   STATUSCODE           VARCHAR2(60),
   LANGUAGECODE         VARCHAR2(60),
   CONCERNROLENAME      VARCHAR2(500),
   PRIMARYALTERNATEID   VARCHAR(30),
   COMMENTS             VARCHAR2(500),
   REGUSERNAME          VARCHAR2(500),
   PREFERREDLANGUAGE    VARCHAR2(500),
   PREFCOMMFROMDATE     DATE,
   PREFCOMMTODATE       DATE,
   PREFCOMMMETHOD       VARCHAR2(60),
   SENSITIVITY          VARCHAR2(60),
   STATUSDESC           VARCHAR2(500),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_CONCERNROLE primary key (CONCERNROLEID)
);

/*==============================================================*/
/* Table: S_CONCERNROLEALTERNATEID                              */
/*==============================================================*/
create table S_CONCERNROLEALTERNATEID  (
   CONCERNROLEALTERNATEID NUMBER(19,0)                    not null,
   CONCERNROLEID        NUMBER(19,0)                    not null,
   ALTERNATEID          VARCHAR(30),
   TYPECODE             VARCHAR2(60),
   STARTDATE            DATE,
   ENDDATE              DATE,
   STATUSCODE           VARCHAR2(60),
   COMMENTS             VARCHAR2(500),
   LASTWRITTEN          DATE,
   constraint PK_S_CONCERNROLEALTERNATEID primary key (CONCERNROLEALTERNATEID)
);

/*==============================================================*/
/* Table: S_CONCERNROLEDUPLICATE                                */
/*==============================================================*/
create table S_CONCERNROLEDUPLICATE  (
   CONCERNROLEDUPLICATEID NUMBER(19,0)                    not null,
   ORIGINALCONCERNROLEID NUMBER(19,0),
   ORIGINALCONCERNROLETYPE VARCHAR2(60),
   DUPLICATECONCERNROLEID NUMBER(19,0),
   DUPLICATECONCERNROLETYPE VARCHAR2(60),
   DUPLICATEDATE        DATE,
   DUPLICATEREASON      VARCHAR2(60),
   DUPLICATECOMMENTS    VARCHAR2(500),
   STATUSCODE           VARCHAR2(60),
   DUPLICATEUSER        VARCHAR2(64),
   UNMARKDATE           DATE,
   UNMARKREASON         VARCHAR2(60),
   UNMARKUSER           VARCHAR2(64),
   UNMARKCOMMENTS       VARCHAR2(500),
   VERSIONNO            NUMBER(19,0)                    not null,
   LASTWRITTEN          DATE,
   constraint PK_S_CONCERNROLEDUPLICATE primary key (CONCERNROLEDUPLICATEID)
);

/*==============================================================*/
/* Table: S_CONCERNROLEMERGE                                    */
/*==============================================================*/
create table S_CONCERNROLEMERGE  (
   CONCERNROLEMERGEID   NUMBER(19,0)                    not null,
   CONCERNROLEDUPLICATEID NUMBER(19,0)                    not null,
   MERGESTARTDATE       DATE,
   MERGEENDDATE         DATE,
   MERGESTATUS          VARCHAR2(60),
   MERGESTARTEDBY       VARCHAR2(64),
   MERGECOMPLETEDBY     VARCHAR2(64),
   VERSIONNO            NUMBER(19,0)                    not null,
   LASTWRITTEN          DATE,
   constraint PK_S_CONCERNROLEMERGE primary key (CONCERNROLEMERGEID)
);

/*==============================================================*/
/* Table: S_CONCERNROLERELATIONSHIP                             */
/*==============================================================*/
create table S_CONCERNROLERELATIONSHIP  (
   CONCERNROLERELATIONSHIPID NUMBER(19,0)                    not null,
   CONCERNROLEID        NUMBER(19,0)                    not null,
   CONCERNROLETYPE      VARCHAR2(60),
   RELCONCERNROLEID     NUMBER(19,0),
   RELCONCERNROLETYPE   VARCHAR2(60),
   STARTDATE            DATE,
   ENDDATE              DATE,
   RELATIONSHIPTYPE     VARCHAR2(60),
   RELENDREASONCODE     VARCHAR2(60),
   STATUSCODE           VARCHAR2(60),
   COMMENTS             VARCHAR2(500),
   CONCERNROLERECIPRELATIONID NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_CONCERNROLERELATIONSHIP primary key (CONCERNROLERELATIONSHIPID)
);

/*==============================================================*/
/* Table: S_CONTACTLOG                                          */
/*==============================================================*/
create table S_CONTACTLOG  (
   CONTACTLOGID         NUMBER(19,0)                    not null,
   CONTACTLOGTYPE       VARCHAR2(60),
   AUTHOR               VARCHAR2(64),
   CREATEDDATETIME      DATE,
   CREATEDBY            VARCHAR2(500),
   PURPOSE              VARCHAR2(500),
   STARTDATETIME        DATE,
   ENDDATETIME          DATE,
   METHOD               VARCHAR2(60),
   LOCATION             VARCHAR2(60),
   LOCATIONDESCRIPTION  VARCHAR2(500),
   ADDENDUMIND          CHAR(1),
   RECORDSTATUS         VARCHAR2(60),
   CASEID               NUMBER(19,0),
   NOTEID               NUMBER(19,0),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_CONTACTLOG primary key (CONTACTLOGID)
);

/*==============================================================*/
/* Table: S_CONTACTLOGATTENDEE                                  */
/*==============================================================*/
create table S_CONTACTLOGATTENDEE  (
   CONTACTLOGATTENDEEID NUMBER(19,0)                    not null,
   CONTACTLOGID         NUMBER(19,0),
   ATTENDEETYPE         VARCHAR2(60),
   CONCERNROLEID        NUMBER(19,0),
   USERNAME             VARCHAR2(64),
   RECORDSTATUS         VARCHAR2(60),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_CONTACTLOGATTENDEE primary key (CONTACTLOGATTENDEEID)
);

/*==============================================================*/
/* Table: S_CONTACTLOGCONCERN                                   */
/*==============================================================*/
create table S_CONTACTLOGCONCERN  (
   CONTACTLOGCONCERNID  NUMBER(19,0)                    not null,
   CONTACTLOGID         NUMBER(19,0),
   CONCERNROLEID        NUMBER(19,0),
   RECORDSTATUS         VARCHAR2(60),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_CONTACTLOGCONCERN primary key (CONTACTLOGCONCERNID)
);

/*==============================================================*/
/* Table: S_CONTACTLOGPURPOSE                                   */
/*==============================================================*/
create table S_CONTACTLOGPURPOSE  (
   CONTACTLOGPURPOSEID  NUMBER(19,0)                    not null,
   CONTACTLOGID         NUMBER(19,0),
   PURPOSE              VARCHAR2(60),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_CONTACTLOGPURPOSE primary key (CONTACTLOGPURPOSEID)
);

/*==============================================================*/
/* Table: S_EDUCATION                                           */
/*==============================================================*/
create table S_EDUCATION  (
   EDUCATIONID          NUMBER(19,0)                    not null,
   CONCERNROLEID        NUMBER(19,0)                    not null,
   FROMDATE             DATE,
   TODATE               DATE,
   COURSETYPE           VARCHAR2(60),
   QUALIFICATION        VARCHAR2(500),
   INSTITUTION          VARCHAR2(500),
   QUALIFICATIONCODE    VARCHAR2(60),
   STATUSCODE           VARCHAR2(60),
   COMMENTS             VARCHAR2(500),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_EDUCATION primary key (EDUCATIONID)
);

/*==============================================================*/
/* Table: S_EMPLOYER                                            */
/*==============================================================*/
create table S_EMPLOYER  (
   CONCERNROLEID        NUMBER(19,0)                    not null,
   REGISTEREDNAME       VARCHAR2(500),
   TRADINGNAME          VARCHAR2(500),
   INDUSTRYTYPE         VARCHAR2(500),
   COMPANYTYPE          VARCHAR2(60),
   BUSINESSDESC         VARCHAR2(500),
   INDUSTRYCODE         VARCHAR2(60),
   SPECIALINTERESTCODE  VARCHAR2(60),
   EXEMPTIONIND         CHAR(1),
   STATUSCODE           VARCHAR2(60),
   COMMENTS             VARCHAR2(500),
   PRIMARYALTERNATEID   VARCHAR(30),
   NUMBERPERMANENTSTAFF NUMBER(19,0),
   NUMBERCASUALSTAFF    NUMBER(19,0),
   PINNUMBER            VARCHAR2(60),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_EMPLOYER primary key (CONCERNROLEID)
);

/*==============================================================*/
/* Table: S_ETLCONTROL                                          */
/*==============================================================*/
create table S_ETLCONTROL  (
   TARGETTABLENAME      VARCHAR2(500)                   not null,
   LAST_ETL_DATE        DATE                            not null,
   EXTRACTTIME          DATE,
   TRUNCATEFLAG         CHAR(1),
   EXTRACTFINISH        DATE,
   constraint PK_S_ETLCONTROL primary key (TARGETTABLENAME)
);

/*==============================================================*/
/* Table: S_FINANCIALINSTRUCTION                                */
/*==============================================================*/
create table S_FINANCIALINSTRUCTION  (
   FININSTRUCTIONID     NUMBER(19,0)                    not null,
   CONCERNROLEID        NUMBER(19,0)                    not null,
   TYPECODE             VARCHAR2(60),
   STATUSCODE           VARCHAR2(60),
   AMOUNT               NUMBER(31,2),
   EFFECTIVEDATE        DATE,
   POSTINGDATE          DATE,
   CREDITDEBITTYPE      VARCHAR2(60),
   CURRENCYTYPECODE     VARCHAR2(60),
   CURRENCYEXCHANGEID   NUMBER(19,0),
   INSTRUMENTGENIND     CHAR(1),
   COMMENTS             VARCHAR2(500),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_FINANCIALINSTRUCTION primary key (FININSTRUCTIONID)
);

/*==============================================================*/
/* Table: S_FINDING                                             */
/*==============================================================*/
create table S_FINDING  (
   FINDINGID            NUMBER(19,0)                    not null,
   ALLEGATIONID         NUMBER(19,0),
   FINDING              VARCHAR2(60),
   OVERRIDEREASON       VARCHAR2(60),
   EFFECTIVEDATE        DATE,
   CREATEDTIMESTAMP     DATE,
   COMMENTS             VARCHAR2(500),
   LASTWRITTEN          DATE,
   constraint PK_S_FINDING primary key (FINDINGID)
);

/*==============================================================*/
/* Table: S_FUND                                                */
/*==============================================================*/
create table S_FUND  (
   FUNDID               NUMBER(19,0)                    not null,
   FUNDNAME             VARCHAR2(500)                   not null,
   FUNDDESC             VARCHAR2(500)                   not null,
   STARTDATE            DATE,
   ENDDATE              DATE,
   AMOUNT               NUMBER(31,2)                    not null,
   LASTWRITTEN          DATE                            not null,
   constraint PK_S_FUND primary key (FUNDID)
);

/*==============================================================*/
/* Table: S_FUNDRELATION                                        */
/*==============================================================*/
create table S_FUNDRELATION  (
   FUNDID               NUMBER(19,0)                    not null,
   PRODUCTID            NUMBER(19,0)                    not null,
   DESCRIPTION          VARCHAR2(500),
   FUNDDESC             VARCHAR2(500),
   LASTWRITTEN          DATE                            not null,
   constraint PK_S_FUNDRELATION primary key (FUNDID, PRODUCTID)
);

/*==============================================================*/
/* Table: S_INSTRUCTIONLINEITEM                                 */
/*==============================================================*/
create table S_INSTRUCTIONLINEITEM  (
   INSTRUCTLINEITEMID   NUMBER(19,0)                    not null,
   FININSTRUCTIONID     NUMBER(19,0)                    not null,
   CASEID               NUMBER(19,0)                    not null,
   CONCERNROLEID        NUMBER(19,0)                    not null,
   PRIMARYCLIENTID      NUMBER(19,0)                    not null,
   AMOUNT               NUMBER(31,2),
   UNPROCESSEDAMOUNT    NUMBER(31,2),
   CATEGORYCODE         VARCHAR2(60),
   CATEGORYDESC         VARCHAR2(500),
   TYPECODE             VARCHAR2(60),
   TYPEDESC             VARCHAR2(500),
   FINANCIALCOMPID      NUMBER(19,0),
   COVERPERIODFROM      DATE,
   COVERPERIODTO        DATE,
   EFFECTIVEDATE        DATE,
   CREATIONDATE         DATE,
   STATUSCODE           VARCHAR2(60),
   CASENOMINEEID        NUMBER(19,0),
   DELIVERYMETHODTYPE   VARCHAR2(60),
   DELIVERYMETHOD       VARCHAR2(500),
   CREDITDEBITTYPE      VARCHAR2(60),
   CURRENCYEXCHANGEID   NUMBER(19,0),
   CURRENCYTYPECODE     VARCHAR2(60),
   ADJUSTMENTIND        CHAR(1),
   ADJUSTMENTFREQUENCY  VARCHAR2(60),
   NEXTADJUSTMENTDATE   DATE,
   INSTRUMENTGENIND     CHAR(1),
   FUNDID               NUMBER(19,0),
   MAXIMUMAMOUNT        NUMBER(31,2),
   PARTICIPANTROLEID    NUMBER(19,0),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_INSTRUCTIONLINEITEM primary key (INSTRUCTLINEITEMID)
);

/*==============================================================*/
/* Table: S_INTAKEPROGRAMAPPLICATION                            */
/*==============================================================*/
create table S_INTAKEPROGRAMAPPLICATION  (
   INTAKEPROGRAMAPPLICATIONID NUMBER(19,0)                    not null,
   PROGRAMTYPEID        NUMBER(19,0),
   INTAKEAPPLICATIONID  NUMBER(19,0)                    not null,
   CASEID               NUMBER(19,0),
   DISPOSITIONSTATUS    VARCHAR2(60),
   DENIALREASON         VARCHAR2(60),
   SUBMITTEDDATETIME    DATE                            not null,
   ENTEREDBYUSER        VARCHAR2(500),
   DISPOSEDDATETIME     DATE,
   VERSIONNO            NUMBER(19,0)                    not null,
   LASTWRITTEN          DATE,
   constraint PK_S_INTAKEPROGRAMAPPLICATION primary key (INTAKEPROGRAMAPPLICATIONID)
);

/*==============================================================*/
/* Table: S_INVESTIGATIONDELIVERY                               */
/*==============================================================*/
create table S_INVESTIGATIONDELIVERY  (
   CASEID               NUMBER(19,0)                    not null,
   RELATEDCASEID        NUMBER(19,0),
   RELATEDCONCERNROLEID NUMBER(19,0),
   INVESTIGATIONCONFIGID NUMBER(19,0),
   INVESTIGATIONTYPE    VARCHAR2(60),
   INVESTIGATIONSUBTYPE VARCHAR2(60),
   RESOLUTIONSTATUS     VARCHAR2(60),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_INVESTIGATIONDELIVERY primary key (CASEID)
);

/*==============================================================*/
/* Table: S_MILESTONECONFIGURATION                              */
/*==============================================================*/
create table S_MILESTONECONFIGURATION  (
   MILESTONECONFIGURATIONID NUMBER(19,0)                    not null,
   NAME                 VARCHAR2(500),
   TYPE                 VARCHAR2(128),
   EARLIESTSTARTDAY     NUMBER(19,0),
   DURATION             NUMBER(19,0),
   STARTDATE            DATE,
   ENDDATE              DATE,
   ADDEDEVENT           VARCHAR2(500),
   EXPCTDSTDATEEVENT    VARCHAR2(500),
   EXPCTDENDDATEEVENT   VARCHAR2(500),
   COMPLETEEVENT        VARCHAR2(500),
   CREATIONDATE         DATE,
   COMMENTS             VARCHAR2(500),
   RECORDSTATUS         VARCHAR2(60),
   WAIVERREQUIRED       CHAR(1),
   WAIVERALLOWED        CHAR(1),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_MILESTONECONFIGURATION primary key (MILESTONECONFIGURATIONID)
);

/*==============================================================*/
/* Table: S_ORGANISATION                                        */
/*==============================================================*/
create table S_ORGANISATION  (
   ORGANISATIONID       NUMBER(19,0)                    not null,
   ADDRESSID            NUMBER(19,0)                    not null,
   ORGANISATIONNAME     VARCHAR(512),
   TAXNUMBER            CHAR(18),
   REGISTRATIONNUMBER   VARCHAR2(60),
   DESCRIPTION          VARCHAR2(500),
   PHONENUMBERID        NUMBER(19,0),
   FAXNUMBERID          NUMBER(19,0),
   EMAILADDRESSID       NUMBER(19,0),
   LOCATIONSECURITYLEVEL VARCHAR2(60),
   ADDRESSCOMMENTS      VARCHAR2(500),
   LASTWRITTEN          DATE                            not null,
   constraint PK_S_ORGANISATION primary key (ORGANISATIONID)
);

/*==============================================================*/
/* Table: S_ORGANISATIONUNIT                                    */
/*==============================================================*/
create table S_ORGANISATIONUNIT  (
   ORGANISATIONUNITID   NUMBER(19,0)                    not null,
   NAME                 VARCHAR2(500),
   PARENTORGANISATIONUNITID NUMBER(19,0),
   STATUSCODE           VARCHAR2(60),
   RECORDSTATUS         VARCHAR2(60),
   COMMENTS             VARCHAR2(500),
   BUSINESSTYPECODE     VARCHAR2(60),
   CREATIONDATE         DATE,
   ORGANISATIONSTRUCTUREID NUMBER(19,0)                    not null,
   DEFAULTPRINTERID     NUMBER(19,0),
   VERSIONNO            NUMBER(19,0)                    not null,
   LASTWRITTEN          DATE,
   constraint PK_S_ORGANISATIONUNIT primary key (ORGANISATIONUNITID)
);

/*==============================================================*/
/* Table: S_ORGOBJECTLINK                                       */
/*==============================================================*/
create table S_ORGOBJECTLINK  (
   ORGOBJECTLINKID      NUMBER(19,0)                    not null,
   ORGOBJECTREFERENCE   NUMBER(19,0),
   USERNAME             VARCHAR2(64),
   ORGOBJECTTYPE        VARCHAR2(60),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_ORGOBJECTLINK primary key (ORGOBJECTLINKID)
);

/*==============================================================*/
/* Table: S_PAYMENTREGENERATIONREQUEST                          */
/*==============================================================*/
create table S_PAYMENTREGENERATIONREQUEST  (
   PMTINSTRUCTIONID     NUMBER(19,0),
   REQUESTDATE          DATE,
   REASONTEXT           VARCHAR2(500),
   OUTCOMECODE          VARCHAR2(60),
   PMTREGENERATIONID    NUMBER(19,0)                    not null,
   FININSTRUCTIONID     NUMBER(19,0)                    not null,
   REQUESTEDBY          VARCHAR2(500)                   not null,
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_PAYMENTREGENERATIONREQUES primary key (PMTREGENERATIONID)
);

/*==============================================================*/
/* Table: S_PERSON                                              */
/*==============================================================*/
create table S_PERSON  (
   CONCERNROLEID        NUMBER(19,0)                    not null,
   PERSONBIRTHNAME      VARCHAR2(500),
   DATEOFBIRTH          DATE,
   DATEOFDEATH          DATE,
   GENDER               VARCHAR2(500),
   SPECIALINTERESTCODE  VARCHAR2(60),
   MARITALSTATUS        VARCHAR2(500),
   NATIONALITYCODE      VARCHAR2(60),
   RESIDENCYABROADIND   CHAR(1),
   MOTHERBIRTHSURNAME   VARCHAR2(500),
   COMMENTS             VARCHAR2(500),
   PERSONTYPE           VARCHAR2(60),
   DATEOFBIRTHVERIND    CHAR(1),
   DATEOFDEATHVERIND    CHAR(1),
   PRIMARYALTERNATEID   VARCHAR(30),
   COUNTRYOFBIRTH       VARCHAR2(500),
   ETHNICORIGIN         VARCHAR2(500),
   RACE                 VARCHAR2(500),
   INDIGENOUSGROUPCODE  VARCHAR2(500),
   INDIGENOUSPERSONIND  CHAR(1),
   VERSIONNO            NUMBER(19,0),
   STARTDATE            DATE,
   LASTWRITTEN          DATE,
   CONSTITUTIONALSTATUS VARCHAR2(60),
   constraint PK_S_PERSON primary key (CONCERNROLEID)
);

/*==============================================================*/
/* Table: S_POSITION                                            */
/*==============================================================*/
create table S_POSITION  (
   POSITIONID           NUMBER(19,0)                    not null,
   NAME                 VARCHAR2(500),
   COMMENTS             VARCHAR2(500),
   LEADPOSITIONIND      CHAR(1)                         not null,
   JOBID                NUMBER(19,0)                    not null,
   FROMDATE             DATE,
   TODATE               DATE,
   RECORDSTATUS         VARCHAR2(60),
   UPPERNAME            VARCHAR2(500),
   VERSIONNO            NUMBER(19,0)                    not null,
   LASTWRITTEN          DATE,
   ORGANISATIONUNITID   NUMBER(19,0),
   constraint PK_S_POSITION primary key (POSITIONID)
);

/*==============================================================*/
/* Table: S_POSITIONHOLDERLINK                                  */
/*==============================================================*/
create table S_POSITIONHOLDERLINK  (
   POSITIONHOLDERLINKID NUMBER(19,0)                    not null,
   USERNAME             VARCHAR2(64)                    not null,
   POSITIONID           NUMBER(19,0)                    not null,
   FROMDATE             DATE,
   TODATE               DATE,
   RECORDSTATUS         VARCHAR2(60),
   VERSIONNO            NUMBER(19,0)                    not null,
   LASTWRITTEN          DATE,
   ORGANISATIONSTRUCTUREID NUMBER(19,0),
   constraint PK_S_POSITIONHOLDERLINK primary key (POSITIONHOLDERLINKID)
);

/*==============================================================*/
/* Table: S_PRODUCT                                             */
/*==============================================================*/
create table S_PRODUCT  (
   PRODUCTID            NUMBER(19,0)                    not null,
   CREATIONDATE         DATE,
   STARTDATE            DATE,
   ENDDATE              DATE,
   STATUSCODE           VARCHAR2(60),
   NAME                 VARCHAR2(500),
   PRODUCTTYPE          VARCHAR2(500),
   DESCRIPTION          VARCHAR2(500),
   COMMENTS             VARCHAR2(500),
   REVIEWFREQUENCY      VARCHAR2(60),
   CERTIFICATIONFREQUENCY VARCHAR2(60),
   ADJUSTMENTFREQUENCY  VARCHAR2(60),
   RERATEFREQUENCY      VARCHAR2(60),
   CERTGRACEPERIOD      NUMBER(19,0)                    not null,
   DELIVERYMAXPERIOD    NUMBER(19,0)                    not null,
   COVERPERIODTYPE      VARCHAR2(60),
   EVIDENCEFORMNAME     VARCHAR2(60),
   ADJUSTMENTIND        CHAR(1)                         not null,
   ROUNDINGTYPECODE     VARCHAR2(60),
   ESTIMATEDCOST        NUMBER(31,2)                    not null,
   LANGUAGECODE         VARCHAR2(60),
   BENEFITIND           CHAR(1)                         not null,
   ECURAMIND            CHAR(1)                         not null,
   FUNDID               NUMBER(19,0),
   CERTIFIABLEIND       CHAR(1)                         not null,
   REASSESSMENTACTIONTYPE VARCHAR2(60),
   LIABILITYRECONCILIATIONTYPE VARCHAR2(60),
   DEFAULTPRODUCTDELPATTERNID NUMBER(19,0),
   CONTRIBUTIONPRODUCTIND CHAR(1)                         not null,
   COVERPERIODOFFSETAMOUNT NUMBER(19,0)                    not null,
   MINDEDUCTIONAMOUNT   NUMBER(31,2)                    not null,
   MAXDEDUCTIONRATE     NUMBER(31,2)                    not null,
   READSECURITY         VARCHAR2(500),
   APPROVESECURITY      VARCHAR2(500),
   CREATESECURITY       VARCHAR2(500),
   MAINTAINSECURITY     VARCHAR2(500),
   ORDERPRODUCTIND      CHAR(1)                         not null,
   LOCATIONSECURITYLEVEL VARCHAR2(60),
   CASEHOMEPAGENAME     VARCHAR2(500),
   CALCULATECOSTIND     CHAR(1)                         not null,
   OVERALLOCATIONIND    CHAR(1)                         not null,
   ESTIMATECOSTIND      CHAR(1)                         not null,
   VERSIONNO            NUMBER(19,0)                    not null,
   AUTOUNDERPAYMENTCASEIND CHAR(1),
   LASTWRITTEN          DATE,
   PPRODUCTTYPECODE     VARCHAR2(60),
   constraint PK_S_PRODUCT primary key (PRODUCTID)
);

/*==============================================================*/
/* Table: S_PRODUCTDELIVERY                                     */
/*==============================================================*/
create table S_PRODUCTDELIVERY  (
   CASEID               NUMBER(19,0)                    not null,
   PRODUCTID            NUMBER(19,0)                    not null,
   PRODUCTTYPE          VARCHAR2(60),
   RECIPCONCERNROLEID   NUMBER(19,0)                    not null,
   PHOLDCONCERNROLEID   NUMBER(19,0),
   ESTDELIVERYCOST      NUMBER(31,2)                    not null,
   CATEGORYCODE         VARCHAR2(60),
   PROVIDERLOCATIONID   NUMBER(19,0),
   FREQOVERRIDEIND      CHAR(1)                         not null,
   CERTFREQOVERIDEIND   CHAR(1)                         not null,
   CERTIFICATIONFREQUENCY VARCHAR2(60),
   PRODUCTPROVIDERID    NUMBER(19,0),
   DEFAULTREVIEWERID    VARCHAR2(64),
   REVIEWFREQUENCY      VARCHAR2(60),
   REVIEWFREQOVERRIDEIND CHAR(1)                         not null,
   VERSIONNO            NUMBER(19,0)                    not null,
   LASTWRITTEN          DATE
);

/*==============================================================*/
/* Table: S_PRODUCTPROVISION                                    */
/*==============================================================*/
create table S_PRODUCTPROVISION  (
   PRODUCTPROVISIONID   NUMBER(19,0)                    not null,
   PRODUCTID            NUMBER(19,0)                    not null,
   CONCERNROLEID        NUMBER(19,0)                    not null,
   STARTDATE            DATE,
   ENDDATE              DATE,
   CREATIONDATE         DATE,
   COMMENTS             VARCHAR2(500),
   STATUSCODE           VARCHAR2(60),
   ESTIMATEDCOST        NUMBER(31,2),
   NEXTPAYMENTDATE      DATE,
   PAYMENTFREQUENCY     VARCHAR2(60),
   METHODOFPMTCODE      VARCHAR2(60),
   CURRENCYTYPE         VARCHAR2(60),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_PRODUCTPROVISION primary key (PRODUCTPROVISIONID)
);

/*==============================================================*/
/* Table: S_PROVIDER                                            */
/*==============================================================*/
create table S_PROVIDER  (
   PROVIDERCONCERNROLEID NUMBER(19,0)                    not null,
   PROVIDERENQUIRYID    NUMBER(19,0),
   PHYSICALCAPACITY     NUMBER(19,0),
   PAYMENTFREQUENCY     VARCHAR2(60),
   METHODOFPAYMENT      NUMBER(19,0),
   CURRENCYTYPE         VARCHAR2(60),
   RECORDSTATUS         VARCHAR2(60),
   RESERVATIONGRACEPERIOD NUMBER(19,0),
   OVERRIDEMDRIND       CHAR(1),
   PREFERREDSEMETHOD    VARCHAR2(60),
   AREASSVDINFOTXTID    NUMBER(19,0),
   CLIENTINFOTEXTID     NUMBER(19,0),
   NAME                 VARCHAR2(500),
   NAMEUPPER            VARCHAR2(500),
   VERSIONNO            NUMBER(19,0)                    not null,
   LASTWRITTEN          DATE,
   constraint PK_S_PROVIDER primary key (PROVIDERCONCERNROLEID)
);

/*==============================================================*/
/* Table: S_REPORTINGDUMMY                                      */
/*==============================================================*/
create table S_REPORTINGDUMMY  (
   DUMMYID              NUMBER(19,0)                   default 1 not null,
   DUMMYCODE            VARCHAR2(60)                   default 'Dummy ETL',
   constraint PK_S_REPORTINGDUMMY primary key (DUMMYID)
);

/*==============================================================*/
/* Table: S_REPORTINGSTATUS                                     */
/*==============================================================*/
create table S_REPORTINGSTATUS  (
   STATUSKEY            NUMBER(19,0)                    not null,
   STATUSCODE           VARCHAR2(60),
   STATUSDESC           VARCHAR2(500),
   LASTWRITTEN          DATE,
   constraint PK_S_REPORTINGSTATUS primary key (STATUSKEY)
);

/*==============================================================*/
/* Table: S_RESOLUTIONCONFIGURATION                             */
/*==============================================================*/
create table S_RESOLUTIONCONFIGURATION  (
   RESOLUTIONCONFIGURATIONID NUMBER(19,0)                    not null,
   RESOLUTION           VARCHAR2(60),
   CREATIONDATE         DATE,
   EVENTCLASSANDTYPE    VARCHAR2(500),
   VERSIONNO            NUMBER(19,0)                    not null,
   LASTWRITTEN          DATE,
   constraint PK_S_RESOLUTIONCONFIGURATION primary key (RESOLUTIONCONFIGURATIONID)
);

/*==============================================================*/
/* Table: S_SERVICE                                             */
/*==============================================================*/
create table S_SERVICE  (
   SERVICEID            NUMBER(19,0)                    not null,
   DESCRIPTION          VARCHAR2(500),
   SERVICECODE          VARCHAR2(60),
   STARTDATE            DATE,
   ENDDATE              DATE,
   CESSATIONREASONCD    VARCHAR2(60),
   CESSATIONREASONTXT   VARCHAR2(500),
   STATUSCODE           VARCHAR2(60),
   COMMENTS             VARCHAR2(500),
   TYPEDESC             VARCHAR2(500),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_SERVICE primary key (SERVICEID)
);

/*==============================================================*/
/* Table: S_SERVICEOFFERING                                     */
/*==============================================================*/
create table S_SERVICEOFFERING  (
   SERVICEOFFERINGID    NUMBER(19,0)                    not null,
   NAME                 VARCHAR2(500),
   DESCRIPTION          VARCHAR2(500),
   STARTDATE            DATE,
   ENDDATE              DATE,
   UNITOFMEASURE        VARCHAR2(60),
   MAXIMUMUNITS         NUMBER(19,0),
   UNITFREQUENCY        VARCHAR2(60),
   COMMENTS             VARCHAR2(500),
   RECORDSTATUS         VARCHAR2(60),
   NAMEUPPER            VARCHAR2(500),
   PLACEMENTPMTIND      CHAR(1),
   SAPLMTINHIBITIND     CHAR(1),
   PAYBASEDONATTENDANCEIND CHAR(1),
   TRAININGIND          CHAR(1),
   SPECIALCONDITIONTYPE VARCHAR2(60),
   PROVISIONMETHOD      VARCHAR2(60),
   DELIVERYFREQUENCY    VARCHAR2(60),
   SINGLEORMULTIPLECLIENTS VARCHAR2(60),
   REFERENCE            VARCHAR2(500),
   NAMETEXTID           NUMBER(19,0),
   DESCRIPTIONTEXTID    NUMBER(19,0),
   REFERENCEUPPER       VARCHAR2(500),
   VERSIONNO            NUMBER(19,0)                    not null,
   LASTWRITTEN          DATE,
   constraint PK_S_SERVICEOFFERING primary key (SERVICEOFFERINGID)
);

/*==============================================================*/
/* Table: S_SERVICESUPPLIERLINK                                 */
/*==============================================================*/
create table S_SERVICESUPPLIERLINK  (
   SERVICESUPPLIERLINKID NUMBER(19,0)                    not null,
   SERVICEID            NUMBER(19,0)                    not null,
   CONCERNROLEID        NUMBER(19,0)                    not null,
   STARTDATE            DATE,
   ENDDATE              DATE,
   STATUSCODE           VARCHAR2(60),
   COMMENTS             VARCHAR2(500),
   NEXTPAYMENTDATE      DATE,
   PAYMENTFREQUENCY     VARCHAR2(60),
   METHODOFPMTCODE      VARCHAR2(60),
   CURRENCYTYPE         VARCHAR2(60),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_SERVICESUPPLIERLINK primary key (SERVICESUPPLIERLINKID)
);

/*==============================================================*/
/* Table: S_STATUSMAPPING                                       */
/*==============================================================*/
create table S_STATUSMAPPING  (
   CODETABLENAME        VARCHAR2(500)                   not null,
   CODE                 VARCHAR2(60)                    not null,
   STATUSKEY            NUMBER(19,0)                    not null,
   LASTWRITTEN          DATE,
   constraint PK_S_STATUSMAPPING primary key (CODE)
);

/*==============================================================*/
/* Table: S_SUSPENSEACCOUNT                                     */
/*==============================================================*/
create table S_SUSPENSEACCOUNT  (
   SUSPENSEACCOUNTID    NUMBER(19,0)                    not null,
   ADDRESSID            NUMBER(19,0),
   CONCERNROLEID        NUMBER(19,0),
   AMOUNT               NUMBER(31,2),
   RECEIVEDDATE         DATE,
   EFFECTIVEDATE        DATE,
   CREATIONDATE         DATE,
   DATEPOSTED           DATE,
   PMTRECINSTRUMENTID   NUMBER(19,0),
   STATUS               VARCHAR2(500),
   CURRENCYTYPECODE     VARCHAR2(60),
   CURRENCYEXCHANGEID   NUMBER(19,0),
   RECEIPTMETHOD        VARCHAR2(500),
   PAYMENTCODE          VARCHAR2(60),
   ISSUERNAME           VARCHAR2(500),
   CHEQUENUMBER         VARCHAR2(60),
   LEDGERNUMBER         VARCHAR2(60),
   ORIGINSORTCODE       VARCHAR2(60),
   ORIGINACCOUNTNUMBER  VARCHAR2(60),
   ORIGINACCOUNTNAME    VARCHAR2(60),
   DESTSORTCODE         VARCHAR2(60),
   DESTACCOUNTNUMBER    VARCHAR2(60),
   DESTACCOUNTNAME      VARCHAR2(60),
   REFERENCETEXT        VARCHAR2(60),
   DEPOSITSLIPNUMBER    NUMBER(19,0),
   RECEIPTNUMBER        NUMBER(19,0),
   COMMENTS             VARCHAR2(500),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_SUSPENSEACCOUNT primary key (SUSPENSEACCOUNTID)
);

/*==============================================================*/
/* Table: S_USERS                                               */
/*==============================================================*/
create table S_USERS  (
   USERNAME             VARCHAR2(64)                    not null,
   CREATIONDATE         DATE,
   PASSWORD             VARCHAR2(60),
   PWDCHANGEEVERYXDAY   NUMBER(19,0)                    not null,
   PASSWORDCHANGED      DATE,
   LOGINFAILURES        NUMBER(19,0)                    not null,
   ROLENAME             VARCHAR2(500),
   APPLICATIONCODE      VARCHAR2(60),
   ACCOUNTENABLED       CHAR(1)                         not null,
   FIRSTNAME            VARCHAR2(500),
   SURNAME              VARCHAR2(500),
   TITLE                VARCHAR2(60),
   GRADECODE            VARCHAR2(60),
   STATUSCODE           VARCHAR2(60),
   LOCATIONID           NUMBER(19,0)                    not null,
   DEFAULTPRINTERID     NUMBER(19,0),
   FULLNAME             VARCHAR2(500),
   BUSINESSPHONEID      NUMBER(19,0),
   PERSONALPHONENUMBERID NUMBER(19,0),
   BUSINESSEMAILID      NUMBER(19,0),
   PERSONALEMAILID      NUMBER(19,0),
   MOBILEPHONEID        NUMBER(19,0),
   PAGERID              NUMBER(19,0),
   FAXID                NUMBER(19,0),
   LOGINRESTRICTIONS    CHAR(1)                         not null,
   LOGINTIMEFROM        DATE,
   LOGINTIMETO          DATE,
   LOGINDAYSUN          CHAR(1)                         not null,
   LOGINDAYMON          CHAR(1)                         not null,
   LOGINDAYTUES         CHAR(1)                         not null,
   LOGINDAYWED          CHAR(1)                         not null,
   LOGINDAYTHURS        CHAR(1)                         not null,
   LOGINDAYFRI          CHAR(1)                         not null,
   LOGINDAYSAT          CHAR(1)                         not null,
   PASSWORDEXPIRYDATE   DATE,
   LASTSUCCESSLOGIN     DATE,
   PWDCHANGEAFTERXLOG   NUMBER(19,0)                    not null,
   LOGSSINCEPWDCHANGE   NUMBER(19,0)                    not null,
   CTIENABLED           CHAR(1)                         not null,
   SENSITIVITY          VARCHAR2(60)                    not null,
   ORGUNITID            NUMBER(19,0),
   VERSIONNO            NUMBER(19,0)                    not null,
   LASTWRITTEN          DATE,
   constraint PK_S_USERS primary key (USERNAME)
);

/*==============================================================*/
/* Table: S_UTILITY                                             */
/*==============================================================*/
create table S_UTILITY  (
   CONCERNROLEID        NUMBER(19,0)                    not null,
   NAME                 VARCHAR2(500),
   REGISTEREDNAME       VARCHAR2(500),
   UTILITYTYPE          VARCHAR2(500),
   UTILITYCODE          VARCHAR2(60),
   METHODOFPMTCODE      VARCHAR2(60),
   PAYMENTFREQUENCY     VARCHAR2(60),
   STATUSCODE           VARCHAR2(60),
   COMMENTS             VARCHAR2(500),
   PRIMARYALTERNATEID   VARCHAR(30),
   MAXIMUMPAYMENTRATE   NUMBER(19,0),
   MINIMUMPAYMENTAMOUNT NUMBER(31,2),
   NEXTPAYMENTDATE      DATE,
   CURRENCYTYPE         VARCHAR2(60),
   VERSIONNO            NUMBER(19,0),
   LASTWRITTEN          DATE,
   constraint PK_S_UTILITY primary key (CONCERNROLEID)
);

/*==============================================================*/
/* Table: S_WORKQUEUE                                           */
/*==============================================================*/
create table S_WORKQUEUE  (
   WORKQUEUEID          NUMBER(19,0)                    not null,
   NAME                 VARCHAR2(500),
   ALLOWUSERSUBSCRIPTIONIND CHAR(1)                         not null,
   SENSITIVITY          VARCHAR2(60),
   ADMINISTRATORUSERNAME VARCHAR2(500),
   COMMENTS             VARCHAR2(500),
   UPPERNAME            VARCHAR2(500),
   UPPERADMINISTRATORUSERNAME VARCHAR2(500),
   VERSIONNO            NUMBER(19,0)                    not null,
   LASTWRITTEN          DATE,
   constraint PK_S_WORKQUEUE primary key (WORKQUEUEID)
);

/*==============================================================*/
/* View: CASEOWNERIVEW                                          */
/*==============================================================*/
create or replace view CASEOWNERIVEW as
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

/*==============================================================*/
/* View: S_CASECLOSUREVIEW                                      */
/*==============================================================*/
create or replace view S_CASECLOSUREVIEW as
select t2.caseid, t2.reasoncode, t3.description 
from S_CASECLOSURE t2, S_CODETABLEITEM t3 
where t2.reasoncode=t3.code and t3.codetablename='CaseCloseReason';

/*==============================================================*/
/* View: S_CASESTATUSVIEW                                       */
/*==============================================================*/
create or replace view S_CASESTATUSVIEW as
SELECT	qu.casestatusid, qu.caseid, qu.startdate, qu.enddate, qu.statuscode, qu.casestatusdesc, qu.caseclosuredesc, qu.lastwritten
FROM 	(SELECT t1.casestatusid, t1.caseid, t1.startdate, t1.enddate, t1.statuscode, t1.statusdescription AS casestatusdesc,
		t2.description AS caseclosuredesc, t1.lastwritten,
		ROW_NUMBER( ) OVER (PARTITION BY t1.caseid, t1.statuscode ORDER BY t1.enddate DESC NULLS FIRST, t1.startdate DESC, t1.lastwritten DESC) row_num
	FROM 	s_casestatus t1 LEFT JOIN S_caseclosure t2 
		ON t1.caseid=t2.caseid) qu
WHERE 	qu.row_num = 1;

/*==============================================================*/
/* View: S_PERSONHISTORYVIEW                                    */
/*==============================================================*/
create or replace view S_PERSONHISTORYVIEW as
select
   T1.CONCERNROLEID as CONCERNROLEID,
   T1.PERSONBIRTHNAME as PERSONBIRTHNAME,
   T1.DATEOFBIRTH as DATEOFBIRTH,
   T1.DATEOFDEATH as DATEOFDEATH,
   NVL(T_Gender.DESCRIPTION, s_readPropertyFromDB('BI.UNDEFINED')) as GENDER,
   T1.SPECIALINTERESTCODE as SPECIALINTERESTCODE,
   NVL(T_Marital.DESCRIPTION, s_readPropertyFromDB('BI.UNDEFINED')) as MARITALSTATUS,
   NVL(T_NATIONALITY.DESCRIPTION, s_readPropertyFromDB('BI.UNDEFINED')) as NATIONALITY,
   T1.RESIDENCYABROADIND as RESIDENCYABROADIND,
   T1.MOTHERBIRTHSURNAME as MOTHERBIRTHSURNAME,
   T1.COMMENTS as COMMENTS,
   T1.PERSONTYPE as PERSONTYPE,
   T1.DATEOFBIRTHVERIND as DATEOFBIRTHVERIND,
   T1.DATEOFDEATHVERIND as DATEOFDEATHVERIND,
   T1.PRIMARYALTERNATEID as PRIMARYALTERNATEID,
   NVL(T_Country.DESCRIPTION, s_readPropertyFromDB('BI.UNDEFINED')) as COUNTRYOFBIRTH,
   NVL(T_Race.DESCRIPTION, s_readPropertyFromDB('BI.UNDEFINED')) as RACE,
   NVL(T_Ethnic.DESCRIPTION, s_readPropertyFromDB('BI.UNDEFINED')) as ETHNICORIGIN,
   NVL(T_Indigenous.DESCRIPTION, s_readPropertyFromDB('BI.UNDEFINED')) as INDIGENOUSGROUP,
   NVL(T_Constitutionlstatus.DESCRIPTION, s_readPropertyFromDB('BI.UNDEFINED')) as CONSTITUTIONLSTATUS, 
   T1.INDIGENOUSPERSONIND as INDIGENOUSPERSONIND,
   T1.VERSIONNO as VERSIONNO,
   T1.LASTWRITTEN as LASTWRITTEN,
   T1.STARTDATE as STARTDATE
from
   S_PERSON T1,
   S_CODETABLEITEM T_Gender,
   S_CODETABLEITEM T_Marital,
   S_CODETABLEITEM T_Country,
   S_CODETABLEITEM T_Ethnic,
   S_CODETABLEITEM T_Race,
   S_CODETABLEITEM T_Indigenous,
   S_CODETABLEITEM T_NATIONALITY,
   S_CODETABLEITEM T_Constitutionlstatus   
where
   T_Gender.CODETABLENAME(+) = 'Gender'
   And T_Gender.CODE(+) = T1.GENDER
   and T1.MARITALSTATUS = T_Marital.CODE(+)
   AND T_Marital.CODETABLENAME(+) = 'MaritalStatus'
   and T1.COUNTRYOFBIRTH = T_Country.CODE(+)
   AND T_Country.CODETABLENAME(+) = 'Country'
   and T1.ETHNICORIGIN = T_Ethnic.CODE(+)
   AND T_Ethnic.CODETABLENAME(+) = 'EthnicOrigin'
   AND T1.RACE = T_Race.code(+)
   and T_Race.CODETABLENAME(+) = 'RaceCode'
   and T1.INDIGENOUSGROUPCODE = T_Indigenous.Code(+)
   and T_Indigenous.CODETABLENAME(+) ='IndigenousGroupCode'
   and T1.NATIONALITYCODE = T_NATIONALITY.Code(+)
   AND T_NATIONALITY.CODETABLENAME(+) = 'Nationality'
   and T1.CONSTITUTIONALSTATUS = T_Constitutionlstatus.CODE (+)
   and T_Constitutionlstatus.CODETABLENAME (+) = 'LinkinConstitutionlStatus';

