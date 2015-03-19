--==============================================================
-- DBMS name:      IBM DB2 UDB 9.5.x Common Server
-- Created on:     30/10/2013 13:51:37
--==============================================================


create sequence DMCASEPARTROLESEQ
increment by 1
start with 1
  nomaxvalue
  minvalue 1
nocycle
  nocache
noorder;

create sequence DMCOUNTRYSEQ
increment by 1
start with 1
  nomaxvalue
  minvalue 1
nocycle
  nocache
noorder;

create sequence DMDELIVERYMETHODSEQ
increment by 1
start with 1
  nomaxvalue
  minvalue 1
nocycle
  nocache
noorder;

create sequence DMDIMDEMODATASEQ
increment by 1
start with 1
  nomaxvalue
  minvalue 1
nocycle
  nocache
noorder;

create sequence DMEDUCATIONSEQ
increment by 1
start with 1
  nomaxvalue
  minvalue 1
nocycle
  nocache
noorder;

create sequence DMETHNICSEQ
increment by 1
start with 1
  nomaxvalue
  minvalue 1
nocycle
  nocache
noorder;

create sequence DMFACTDEMODATASEQ
increment by 1
start with 1
  nomaxvalue
  minvalue 1
nocycle
  nocache
noorder;

create sequence DMGENDERSEQ
increment by 1
start with 1
  nomaxvalue
  minvalue 1
nocycle
  nocache
noorder;

create sequence DMINDUSTRYTYPESEQ
increment by 1
start with 1
  nomaxvalue
  minvalue 1
nocycle
  nocache
noorder;

create sequence DMMARITALSTATUSSEQ
increment by 1
start with 1
  nomaxvalue
  minvalue 1
nocycle
  nocache
noorder;

create sequence DMPAYMETHODSEQ
increment by 1
start with 1
  nomaxvalue
  minvalue 1
nocycle
  nocache
noorder;

create sequence DMPREFLANGSEQ
increment by 1
start with 1
  nomaxvalue
  minvalue 1
nocycle
  nocache
noorder;

create sequence DMPROVIDERSEQ
increment by 1
start with 1
  nomaxvalue
  minvalue 1
nocycle
  nocache
noorder;

create sequence DMSERVICEOFFERINGSEQ
increment by 1
start with 1
  nomaxvalue
  minvalue 1
nocycle
  nocache
noorder;

create sequence DMSERVICESEQ
increment by 1
start with 1
  nomaxvalue
  minvalue 1
nocycle
  nocache
noorder;

create sequence DMTIMEDEMODATASEQ
increment by 1
start with 1
  nomaxvalue
  minvalue 1
nocycle
  nocache
noorder;

create sequence DMUTILITYSEQ
increment by 1
start with 1
  nomaxvalue
  minvalue 1
nocycle
  nocache
noorder;

--==============================================================
-- Table: DM_AGEGROUPS
--==============================================================
create table DM_AGEGROUPS
(
   ID                   BIGINT                 not null,
   GROUPNAME            VARCHAR(2000)          not null,
   STARTAGE             BIGINT                 not null,
   ENDAGE               BIGINT                 not null,
   GROUPDESCRIPTION     VARCHAR(2000),
   BUSAREA              VARCHAR(2000)          not null,
   PROGRAMCODE          VARCHAR(240)           not null
);

alter table DM_AGEGROUPS
   add constraint P_IDENTIFIER_1 primary key (ID);

alter table DM_AGEGROUPS
   add constraint A_IDENTIFIER_2 unique (GROUPNAME, STARTAGE, ENDAGE, BUSAREA, PROGRAMCODE);

--==============================================================
-- Table: DM_AGGCASEDAY
--==============================================================
create table DM_AGGCASEDAY
(
   DIMPRODUCTKEY        BIGINT                 not null,
   TIMEPERIODKEY        BIGINT                 not null,
   ORGUNITKEY           BIGINT                 not null,
   NOOPENCASES          BIGINT,
   NOSUBMITTEDCASES     BIGINT,
   NOAPPROVEDCASES      BIGINT,
   NOACTIVECASES        BIGINT,
   NOPENDINGCLOSECASES  BIGINT
);

alter table DM_AGGCASEDAY
   add constraint A_AK_AGGCASEDAY1 unique (DIMPRODUCTKEY, TIMEPERIODKEY, ORGUNITKEY);

--==============================================================
-- Index: RELATIONSHIP_77_FK
--==============================================================
create index RELATIONSHIP_77_FK on DM_AGGCASEDAY (
   DIMPRODUCTKEY        ASC
);

--==============================================================
-- Index: RELATIONSHIP_78_FK
--==============================================================
create index RELATIONSHIP_78_FK on DM_AGGCASEDAY (
   ORGUNITKEY           ASC
);

--==============================================================
-- Index: RELATIONSHIP_79_FK
--==============================================================
create index RELATIONSHIP_79_FK on DM_AGGCASEDAY (
   TIMEPERIODKEY        ASC
);

--==============================================================
-- Table: DM_AGGCASEMONTH
--==============================================================
create table DM_AGGCASEMONTH
(
   ORGUNITKEY           BIGINT                 not null,
   TIMEPERIODKEY        BIGINT                 not null,
   DIMPRODUCTKEY        BIGINT                 not null,
   NOCASESONHANDBEGIN   BIGINT,
   NOCASESONHANDEND     BIGINT,
   NOCASESCLEARED       BIGINT,
   NOCASESRECEIVED      BIGINT,
   AVGDAYSCLEARED       FLOAT,
   AVGDAYSOPENTOSUB     FLOAT,
   AVGDAYSSUBTOAPPRV    FLOAT,
   AVGDAYSOPENTOACTIV   FLOAT,
   AVGDAYSRECEIPTTOREG  FLOAT,
   AVGDAYSREGTOACTIV    FLOAT
);

alter table DM_AGGCASEMONTH
   add constraint A_AK_AGGCASEMONTH unique (ORGUNITKEY, TIMEPERIODKEY, DIMPRODUCTKEY);

--==============================================================
-- Index: RELATIONSHIP_80_FK
--==============================================================
create index RELATIONSHIP_80_FK on DM_AGGCASEMONTH (
   DIMPRODUCTKEY        ASC
);

--==============================================================
-- Index: RELATIONSHIP_81_FK
--==============================================================
create index RELATIONSHIP_81_FK on DM_AGGCASEMONTH (
   ORGUNITKEY           ASC
);

--==============================================================
-- Index: RELATIONSHIP_129_F
--==============================================================
create index RELATIONSHIP_129_F on DM_AGGCASEMONTH (
   TIMEPERIODKEY        ASC
);

--==============================================================
-- Table: DM_AGGFUNDS
--==============================================================
create table DM_AGGFUNDS
(
   EFFECTIVEDATEKEY     BIGINT                 not null,
   DIMFUNDID            BIGINT                 not null,
   DIMPRODUCTKEY        BIGINT                 not null,
   AMOUNT               DECIMAL(31,2)
);

alter table DM_AGGFUNDS
   add constraint A_AK_ID_1_DM_AGGFU unique (EFFECTIVEDATEKEY, DIMFUNDID, DIMPRODUCTKEY);

--==============================================================
-- Index: RELATIONSHIP_107_F
--==============================================================
create index RELATIONSHIP_107_F on DM_AGGFUNDS (
   EFFECTIVEDATEKEY     ASC
);

--==============================================================
-- Index: RELATIONSHIP_123_F
--==============================================================
create index RELATIONSHIP_123_F on DM_AGGFUNDS (
   DIMFUNDID            ASC
);

--==============================================================
-- Index: RELATIONSHIP_124_F
--==============================================================
create index RELATIONSHIP_124_F on DM_AGGFUNDS (
   DIMPRODUCTKEY        ASC
);

--==============================================================
-- Table: DM_AGGPAYMENTS
--==============================================================
create table DM_AGGPAYMENTS
(
   ORGUNITKEY           BIGINT                 not null,
   DIMPRODUCTKEY        BIGINT                 not null,
   DIMDEDUCTIONKEY      BIGINT                 not null,
   DIMDELIVERYMETHODKEY BIGINT                 not null,
   DIMTRANSACTIONKEY    BIGINT                 not null,
   DIMFINSTATUSKEY      BIGINT                 not null,
   EFFECTIVEDATEKEY     BIGINT                 not null,
   GAURDIANFLAG         CHAR(1)                default 'N',
   REGENERATEDFLAG      CHAR(1)                default 'N',
   AMOUNT               DECIMAL(31,2),
   UNPROCESSEDAMOUNT    DECIMAL(31,2),
   ILINUMBER            BIGINT
);

--==============================================================
-- Index: RELATIONSHIP_114_F
--==============================================================
create index RELATIONSHIP_114_F on DM_AGGPAYMENTS (
   EFFECTIVEDATEKEY     ASC
);

--==============================================================
-- Index: RELATIONSHIP_115_F
--==============================================================
create index RELATIONSHIP_115_F on DM_AGGPAYMENTS (
   ORGUNITKEY           ASC
);

--==============================================================
-- Index: RELATIONSHIP_117_F
--==============================================================
create index RELATIONSHIP_117_F on DM_AGGPAYMENTS (
   DIMPRODUCTKEY        ASC
);

--==============================================================
-- Index: RELATIONSHIP_118_F
--==============================================================
create index RELATIONSHIP_118_F on DM_AGGPAYMENTS (
   DIMFINSTATUSKEY      ASC
);

--==============================================================
-- Index: RELATIONSHIP_120_F
--==============================================================
create index RELATIONSHIP_120_F on DM_AGGPAYMENTS (
   DIMDELIVERYMETHODKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_121_F
--==============================================================
create index RELATIONSHIP_121_F on DM_AGGPAYMENTS (
   DIMDEDUCTIONKEY      ASC
);

--==============================================================
-- Index: RELATIONSHIP_122_F
--==============================================================
create index RELATIONSHIP_122_F on DM_AGGPAYMENTS (
   DIMTRANSACTIONKEY    ASC
);

--==============================================================
-- Table: DM_DIMADDRESS
--==============================================================
create table DM_DIMADDRESS
(
   DIMADDRESSKEY        BIGINT                 not null,
   ADDRESS1             VARCHAR(2000),
   ADDRESS2             VARCHAR(2000),
   ADDRESS3             VARCHAR(2000),
   CITY                 VARCHAR(2000),
   STATE                VARCHAR(2000),
   COUNTY               VARCHAR(2000),
   ZIP                  VARCHAR(2000),
   COUNTRYCODE          VARCHAR(240),
   COUNTRYDESC          VARCHAR(2000),
   STATEFIPSCODE        BIGINT,
   GEOCODE              VARCHAR(8192),
   LATITUDE             DOUBLE,
   LONGITUDE            DOUBLE
);

alter table DM_DIMADDRESS
   add constraint P_IDENTIFIER_1 primary key (DIMADDRESSKEY);

--==============================================================
-- Table: DM_DIMALGFINDING
--==============================================================
create table DM_DIMALGFINDING
(
   DIMALGFINDINGKEY     BIGINT                 not null,
   FINDINGCODE          VARCHAR(240),
   FINDINGDESC          VARCHAR(2000)
);

alter table DM_DIMALGFINDING
   add constraint P_IDENTIFIER_1 primary key (DIMALGFINDINGKEY);

--==============================================================
-- Table: DM_DIMALGLOCATION
--==============================================================
create table DM_DIMALGLOCATION
(
   DIMALGLOCATIONKEY    BIGINT                 not null,
   ALGLOCATIONCODE      VARCHAR(240),
   ALGLOCATIONDESC      VARCHAR(2000)
);

alter table DM_DIMALGLOCATION
   add constraint P_IDENTIFIER_1 primary key (DIMALGLOCATIONKEY);

--==============================================================
-- Table: DM_DIMALGMETHOD
--==============================================================
create table DM_DIMALGMETHOD
(
   DIMALGMETHODKEY      BIGINT                 not null,
   ALGMETHODCODE        VARCHAR(240),
   ALGMETHODDESC        VARCHAR(2000)
);

alter table DM_DIMALGMETHOD
   add constraint P_IDENTIFIER_1 primary key (DIMALGMETHODKEY);

--==============================================================
-- Table: DM_DIMALGSEVERITY
--==============================================================
create table DM_DIMALGSEVERITY
(
   DIMALGSEVERITYKEY    BIGINT                 not null,
   SEVERITYCODE         VARCHAR(240),
   SEVERITYDESC         VARCHAR(2000)
);

alter table DM_DIMALGSEVERITY
   add constraint P_IDENTIFIER_1 primary key (DIMALGSEVERITYKEY);

--==============================================================
-- Table: DM_DIMALGTYPE
--==============================================================
create table DM_DIMALGTYPE
(
   DIMALGTYPEKEY        BIGINT                 not null,
   ALGTYPECODE          VARCHAR(240),
   ALGTYPEDESC          VARCHAR(2000)
);

alter table DM_DIMALGTYPE
   add constraint P_IDENTIFIER_1 primary key (DIMALGTYPEKEY);

--==============================================================
-- Table: DM_DIMASSISTANCESTATUS
--==============================================================
create table DM_DIMASSISTANCESTATUS
(
   DIMASSISTANCESTATUSKEY BIGINT                 not null,
   CODE                 VARCHAR(240),
   DESCRIPTION          VARCHAR(2000)
);

alter table DM_DIMASSISTANCESTATUS
   add constraint P_IDENTIFIER_1 primary key (DIMASSISTANCESTATUSKEY);

--==============================================================
-- Table: DM_DIMBOECODES
--==============================================================
create table DM_DIMBOECODES
(
   DIMBOEKEY            BIGINT                 not null,
   CODE                 VARCHAR(240),
   DESCRIPTION          VARCHAR(2000)
);

alter table DM_DIMBOECODES
   add constraint P_IDENTIFIER_1 primary key (DIMBOEKEY);

--==============================================================
-- Table: DM_DIMCASECLOSURE
--==============================================================
create table DM_DIMCASECLOSURE
(
   CASECLOSUREKEY       BIGINT                 not null,
   CASECLOSUREID        BIGINT,
   REASONCODE           VARCHAR(240),
   REASONDESC           VARCHAR(2000)
);

alter table DM_DIMCASECLOSURE
   add constraint P_IDENTIFIER_1 primary key (CASECLOSUREKEY);

--==============================================================
-- Table: DM_DIMCASEOWNER
--==============================================================
create table DM_DIMCASEOWNER
(
   CASEOWNERKEY         BIGINT                 not null,
   CASEOWNERNAME        VARCHAR(2000)          not null,
   FIRSTNAME            VARCHAR(2000),
   LASTNAME             VARCHAR(2000),
   OWNERTYPE            VARCHAR(2000)
);

alter table DM_DIMCASEOWNER
   add constraint P_IDENTIFIER_1 primary key (CASEOWNERKEY);

alter table DM_DIMCASEOWNER
   add constraint A_AK_ID_2_DM_DCASE unique (CASEOWNERNAME);

--==============================================================
-- Table: DM_DIMCASEPARTICIPANTROLE
--==============================================================
create table DM_DIMCASEPARTICIPANTROLE
(
   DIMCASEPARTROLEID    BIGINT                 not null,
   TYPECODE             VARCHAR(240),
   ROLETYPE             VARCHAR(2000)          not null
);

alter table DM_DIMCASEPARTICIPANTROLE
   add constraint P_IDENTIFIER_1 primary key (DIMCASEPARTROLEID);

--==============================================================
-- Table: DM_DIMCASEREVIEWOUTCOMES
--==============================================================
create table DM_DIMCASEREVIEWOUTCOMES
(
   DIMCASEREVIEWOUTCOMEKEY BIGINT                 not null,
   COMPONENTOUTCOME     VARCHAR(2000),
   OVERALLOUTCOME       VARCHAR(2000)
);

alter table DM_DIMCASEREVIEWOUTCOMES
   add constraint P_IDENTIFIER_1 primary key (DIMCASEREVIEWOUTCOMEKEY);

--==============================================================
-- Table: DM_DIMCASESUPER
--==============================================================
create table DM_DIMCASESUPER
(
   CASESUPERKEY         BIGINT                 not null,
   CASESUPERNAME        VARCHAR(2000)          not null,
   FIRSTNAME            VARCHAR(2000),
   LASTNAME             VARCHAR(2000),
   SUPERTYPE            VARCHAR(2000)
);

alter table DM_DIMCASESUPER
   add constraint P_IDENTIFIER_1 primary key (CASESUPERKEY);

alter table DM_DIMCASESUPER
   add constraint A_AK_ID_2_DM_CA2 unique (CASESUPERNAME);

--==============================================================
-- Table: DM_DIMCASETYPES
--==============================================================
create table DM_DIMCASETYPES
(
   DIMCASETYPEKEY       BIGINT                 not null,
   CODE                 VARCHAR(240)           not null,
   CASETYPE             VARCHAR(2000)
);

alter table DM_DIMCASETYPES
   add constraint P_IDENTIFIER_1 primary key (DIMCASETYPEKEY);

alter table DM_DIMCASETYPES
   add constraint A_AK_KEY_2_DM_DIMC unique (CODE);

--==============================================================
-- Table: DM_DIMCHILDSUPPORTENFORTYPES
--==============================================================
create table DM_DIMCHILDSUPPORTENFORTYPES
(
   DIMCHILDSUPPORTENFORCETYPEKEY BIGINT                 not null,
   CODE                 VARCHAR(240),
   DESCRIPTION          VARCHAR(2000)
);

alter table DM_DIMCHILDSUPPORTENFORTYPES
   add constraint P_IDENTIFIER_1 primary key (DIMCHILDSUPPORTENFORCETYPEKEY);

--==============================================================
-- Table: DM_DIMCOMPLIANCESTATUS
--==============================================================
create table DM_DIMCOMPLIANCESTATUS
(
   DIMCOMPLIANCESTATUSKEY BIGINT                 not null,
   COMPLIANCESTATUSCODE VARCHAR(240)           not null,
   COMPLIANCESTATUSDESC VARCHAR(2000)          not null
);

alter table DM_DIMCOMPLIANCESTATUS
   add constraint P_IDENTIFIER_1 primary key (DIMCOMPLIANCESTATUSKEY);

alter table DM_DIMCOMPLIANCESTATUS
   add constraint A_AK_KEY_2_DM_DIMC unique (COMPLIANCESTATUSCODE);

--==============================================================
-- Table: DM_DIMCOMPLIANCETYPE
--==============================================================
create table DM_DIMCOMPLIANCETYPE
(
   DIMCOMPLIANCETYPEKEY BIGINT                 not null,
   COMPLIANCETYPECODE   VARCHAR(240)           not null,
   COMPLIANCETYPEDESC   VARCHAR(2000)          not null
);

alter table DM_DIMCOMPLIANCETYPE
   add constraint P_IDENTIFIER_1 primary key (DIMCOMPLIANCETYPEKEY);

alter table DM_DIMCOMPLIANCETYPE
   add constraint A_AK_KEY_2_DM_DIMC unique (COMPLIANCETYPECODE);

--==============================================================
-- Table: DM_DIMCONCERNRELATIONSHIPTYPE
--==============================================================
create table DM_DIMCONCERNRELATIONSHIPTYPE
(
   RELATIONSHIPTYPEKEY  BIGINT                 not null,
   CODE                 VARCHAR(240),
   DESCRIPTION          VARCHAR(2000)
);

alter table DM_DIMCONCERNRELATIONSHIPTYPE
   add constraint P_IDENTIFIER_1 primary key (RELATIONSHIPTYPEKEY);

--==============================================================
-- Table: DM_DIMCONFIGPROPERTIES
--==============================================================
create table DM_DIMCONFIGPROPERTIES
(
   DIMCONFIGPROPERTIESKEY BIGINT                 not null,
   "NAME"               VARCHAR(2000),
   DESCRIPTION          VARCHAR(2000),
   STARTDATE            TIMESTAMP,
   ENDDATE              TIMESTAMP,
   PROPERTYVALUE        BIGINT,
   COMMENTS             VARCHAR(2000)
);

alter table DM_DIMCONFIGPROPERTIES
   add constraint P_IDENTIFIER_1 primary key (DIMCONFIGPROPERTIESKEY);

--==============================================================
-- Table: DM_DIMCONSTSTATUS
--==============================================================
create table DM_DIMCONSTSTATUS
(
   DIMCONSTSTATKEY      BIGINT                 not null,
   CODE                 VARCHAR(240),
   DESCRIPTION          VARCHAR(2000)
);

alter table DM_DIMCONSTSTATUS
   add constraint P_IDENTIFIER_1 primary key (DIMCONSTSTATKEY);

--==============================================================
-- Table: DM_DIMCONTACTLOCATION
--==============================================================
create table DM_DIMCONTACTLOCATION
(
   DIMCONTACTLOCATIONKEY BIGINT                 not null,
   LOCATIONCODE         VARCHAR(240)           not null,
   LOCATIONDESCRIPTION  VARCHAR(2000)
);

alter table DM_DIMCONTACTLOCATION
   add constraint P_IDENTIFIER_1 primary key (DIMCONTACTLOCATIONKEY);

alter table DM_DIMCONTACTLOCATION
   add constraint A_AK_KEY_2_DM_DIMC unique (LOCATIONCODE);

--==============================================================
-- Table: DM_DIMCONTACTMETHOD
--==============================================================
create table DM_DIMCONTACTMETHOD
(
   DIMCONTACTMETHODKEY  BIGINT                 not null,
   CODE                 VARCHAR(240)           not null,
   DESCRIPTION          VARCHAR(2000)
);

alter table DM_DIMCONTACTMETHOD
   add constraint P_IDENTIFIER_1 primary key (DIMCONTACTMETHODKEY);

alter table DM_DIMCONTACTMETHOD
   add constraint A_AK_KEY_2_DM_DIMC unique (CODE);

--==============================================================
-- Table: DM_DIMCONTACTPURPOSE
--==============================================================
create table DM_DIMCONTACTPURPOSE
(
   DIMPURPOSEKEY        BIGINT                 not null,
   CONTACTLOGID         BIGINT                 not null,
   PURPOSECODE          VARCHAR(240)           not null,
   PURPOSEDESCRIPTION   VARCHAR(2000)
);

alter table DM_DIMCONTACTPURPOSE
   add constraint P_IDENTIFIER_1 primary key (DIMPURPOSEKEY);

alter table DM_DIMCONTACTPURPOSE
   add constraint A_AK_KEY_2_DM_DIMC unique (CONTACTLOGID, PURPOSECODE);

--==============================================================
-- Table: DM_DIMCONTACTTYPE
--==============================================================
create table DM_DIMCONTACTTYPE
(
   DIMCONTACTTYPEKEY    BIGINT                 not null,
   CODE                 VARCHAR(240)           not null,
   DESCRIPTION          VARCHAR(2000)
);

alter table DM_DIMCONTACTTYPE
   add constraint P_IDENTIFIER_1 primary key (DIMCONTACTTYPEKEY);

alter table DM_DIMCONTACTTYPE
   add constraint A_AK_KEY_2_DM_DIMC unique (CODE);

--==============================================================
-- Table: DM_DIMCOUNTRY
--==============================================================
create table DM_DIMCOUNTRY
(
   DIMCOUNTRYKEY        BIGINT                 not null,
   COUNTRYCODE          VARCHAR(240),
   COUNTRY              VARCHAR(2000)          not null
);

alter table DM_DIMCOUNTRY
   add constraint P_IDENTIFIER_1 primary key (DIMCOUNTRYKEY);

--==============================================================
-- Table: DM_DIMDEDUCTION
--==============================================================
create table DM_DIMDEDUCTION
(
   DIMDEDUCTIONKEY      BIGINT                 not null,
   DEDUCTIONCAT         VARCHAR(2000)          not null,
   DEDUCTIONNAME        VARCHAR(2000)          not null
);

alter table DM_DIMDEDUCTION
   add constraint P_IDENTIFIER_1 primary key (DIMDEDUCTIONKEY);

alter table DM_DIMDEDUCTION
   add constraint A_AK_DEDUCTIONTYP2 unique (DEDUCTIONCAT, DEDUCTIONNAME);

--==============================================================
-- Table: DM_DIMDELIVERYMETHOD
--==============================================================
create table DM_DIMDELIVERYMETHOD
(
   DIMDELIVERYMETHODKEY BIGINT                 not null,
   DELIVERYMETHODCODE   VARCHAR(240),
   DELIVERYMETHOD       VARCHAR(2000)
);

alter table DM_DIMDELIVERYMETHOD
   add constraint P_IDENTIFIER_1 primary key (DIMDELIVERYMETHODKEY);

--==============================================================
-- Table: DM_DIMDENIALREASON
--==============================================================
create table DM_DIMDENIALREASON
(
   DIMDENIALREASONKEY   BIGINT                 not null,
   CODE                 VARCHAR(240)           not null,
   DENIALREASON         VARCHAR(2000)          not null
);

alter table DM_DIMDENIALREASON
   add constraint P_IDENTIFIER_1 primary key (DIMDENIALREASONKEY);

alter table DM_DIMDENIALREASON
   add constraint A_AK_KEY_2_DM_DIMD unique (DENIALREASON);

--==============================================================
-- Table: DM_DIMDISPOSITION
--==============================================================
create table DM_DIMDISPOSITION
(
   DISPOSITIONKEY       BIGINT                 not null,
   CODE                 VARCHAR(240)           not null,
   DISPOSITIONDESC      VARCHAR(2000)          not null
);

alter table DM_DIMDISPOSITION
   add constraint P_IDENTIFIER_1 primary key (DISPOSITIONKEY);

alter table DM_DIMDISPOSITION
   add constraint A_AK_KEY_2_DM_DIMD unique (DISPOSITIONDESC);

--==============================================================
-- Table: DM_DIMDUALELIGIBILITY
--==============================================================
create table DM_DIMDUALELIGIBILITY
(
   DIMDUALKEY           BIGINT                 not null,
   CODE                 VARCHAR(240),
   DESCRIPTION          VARCHAR(2000)
);

alter table DM_DIMDUALELIGIBILITY
   add constraint P_IDENTIFIER_1 primary key (DIMDUALKEY);

--==============================================================
-- Table: DM_DIMDUPLICATEREASON
--==============================================================
create table DM_DIMDUPLICATEREASON
(
   DIMDUPREASONKEY      BIGINT                 not null,
   CODE                 VARCHAR(240)           not null,
   DESCRIPTION          VARCHAR(2000)
);

alter table DM_DIMDUPLICATEREASON
   add constraint P_IDENTIFIER_1 primary key (DIMDUPREASONKEY);

alter table DM_DIMDUPLICATEREASON
   add constraint A_AK_KEY_2_DM_DIMD unique (CODE);

--==============================================================
-- Table: DM_DIMDUPLICATESTATUS
--==============================================================
create table DM_DIMDUPLICATESTATUS
(
   DIMDUPSTATUSKEY      BIGINT                 not null,
   CODE                 VARCHAR(240)           not null,
   DESCRIPTION          VARCHAR(2000)
);

alter table DM_DIMDUPLICATESTATUS
   add constraint P_IDENTIFIER_1 primary key (DIMDUPSTATUSKEY);

alter table DM_DIMDUPLICATESTATUS
   add constraint A_AK_KEY_2_DM_DIMD unique (CODE);

--==============================================================
-- Table: DM_DIMEDUCATION
--==============================================================
create table DM_DIMEDUCATION
(
   DIMEDUCATIONKEY      BIGINT                 not null,
   QUALIFICATION        VARCHAR(2000)          not null,
   EDUCATIONCODE        VARCHAR(240)
);

alter table DM_DIMEDUCATION
   add constraint P_IDENTIFIER_1 primary key (DIMEDUCATIONKEY);

--==============================================================
-- Table: DM_DIMEDUCATIONLEVELS
--==============================================================
create table DM_DIMEDUCATIONLEVELS
(
   DIMEDUCATIONLEVELKEY BIGINT                 not null,
   CODE                 VARCHAR(240),
   DESCRIPTION          VARCHAR(2000)
);

alter table DM_DIMEDUCATIONLEVELS
   add constraint P_IDENTIFIER_1 primary key (DIMEDUCATIONLEVELKEY);

--==============================================================
-- Table: DM_DIMEMPLOYMENTSTATUS
--==============================================================
create table DM_DIMEMPLOYMENTSTATUS
(
   DIMEMPLOYMENTSTATUSKEY BIGINT                 not null,
   CODE                 VARCHAR(240),
   DESCRIPTION          VARCHAR(2000)
);

alter table DM_DIMEMPLOYMENTSTATUS
   add constraint P_IDENTIFIER_1 primary key (DIMEMPLOYMENTSTATUSKEY);

--==============================================================
-- Table: DM_DIMETHNICITY
--==============================================================
create table DM_DIMETHNICITY
(
   DIMETHNICITYKEY      BIGINT                 not null,
   ETHNICITYCODE        VARCHAR(240),
   ETHNICITY            VARCHAR(2000)          not null
);

alter table DM_DIMETHNICITY
   add constraint P_IDENTIFIER_1 primary key (DIMETHNICITYKEY);

--==============================================================
-- Table: DM_DIMFINANCIALSTATUS
--==============================================================
create table DM_DIMFINANCIALSTATUS
(
   DIMFINSTATUSKEY      BIGINT                 not null,
   STATUSCODE           VARCHAR(240)           not null,
   STATUSDESC           VARCHAR(2000)
);

alter table DM_DIMFINANCIALSTATUS
   add constraint P_IDENTIFIER_1 primary key (DIMFINSTATUSKEY);

alter table DM_DIMFINANCIALSTATUS
   add constraint A_AK_ID_2_DM_DIMFI unique (STATUSCODE);

--==============================================================
-- Table: DM_DIMFREQUENCYCRITERIA
--==============================================================
create table DM_DIMFREQUENCYCRITERIA
(
   DIMFREQUENCYCRITERIAKEY BIGINT                 not null,
   FREQUENCYCRITERIACODE VARCHAR(240)           not null,
   FREQUENCYCRITERIADESC VARCHAR(2000)          not null
);

alter table DM_DIMFREQUENCYCRITERIA
   add constraint P_IDENTIFIER_1 primary key (DIMFREQUENCYCRITERIAKEY);

alter table DM_DIMFREQUENCYCRITERIA
   add constraint A_AK_KEY_3_DM_DIMC unique (FREQUENCYCRITERIACODE);

--==============================================================
-- Table: DM_DIMFUND
--==============================================================
create table DM_DIMFUND
(
   DIMFUNDID            BIGINT                 not null,
   REVENUE              DECIMAL(31,2),
   FUNDNAME             VARCHAR(2000)          not null,
   DWPRODUCTID          BIGINT                 not null
);

alter table DM_DIMFUND
   add constraint P_IDENTIFIER_1 primary key (DIMFUNDID);

alter table DM_DIMFUND
   add constraint A_AK_KEY_2_DM_DIMF unique (FUNDNAME);

--==============================================================
-- Table: DM_DIMGENDER
--==============================================================
create table DM_DIMGENDER
(
   DIMGENDERKEY         BIGINT                 not null,
   GENDERCODE           VARCHAR(240),
   GENDER               VARCHAR(2000)          not null
);

alter table DM_DIMGENDER
   add constraint P_IDENTIFIER_1 primary key (DIMGENDERKEY);

--==============================================================
-- Table: DM_DIMINDIGENOUSGROUPS
--==============================================================
create table DM_DIMINDIGENOUSGROUPS
(
   DIMINDIGENOUSGROUPKEY BIGINT                 not null,
   CODE                 VARCHAR(240)           not null,
   INDIGENOUSGROUP      VARCHAR(2000)
);

alter table DM_DIMINDIGENOUSGROUPS
   add constraint P_IDENTIFIER_1 primary key (DIMINDIGENOUSGROUPKEY);

alter table DM_DIMINDIGENOUSGROUPS
   add constraint A_AK_KEY_2_DM_DIMI unique (CODE);

--==============================================================
-- Table: DM_DIMINDUSTRYTYPE
--==============================================================
create table DM_DIMINDUSTRYTYPE
(
   DIMINDUSTRYTYPEKEY   BIGINT                 not null,
   INDUSTRYTYPECODE     VARCHAR(240),
   INDUSTRYTYPE         VARCHAR(2000)          not null
);

alter table DM_DIMINDUSTRYTYPE
   add constraint P_IDENTIFIER_1 primary key (DIMINDUSTRYTYPEKEY);

--==============================================================
-- Table: DM_DIMINTAKECATEGORY
--==============================================================
create table DM_DIMINTAKECATEGORY
(
   DIMINTAKECATEGORYKEY BIGINT                 not null,
   CODE                 VARCHAR(240),
   DIMINTAKECATEGORYDESC VARCHAR(2000)
);

alter table DM_DIMINTAKECATEGORY
   add constraint P_IDENTIFIER_1 primary key (DIMINTAKECATEGORYKEY);

--==============================================================
-- Table: DM_DIMINTAKETYPE
--==============================================================
create table DM_DIMINTAKETYPE
(
   DIMINTAKETYPEKEY     BIGINT                 not null,
   CODE                 VARCHAR(240),
   INTAKETYPEDESC       VARCHAR(2000)
);

alter table DM_DIMINTAKETYPE
   add constraint P_IDENTIFIER_1 primary key (DIMINTAKETYPEKEY);

--==============================================================
-- Table: DM_DIMINTEGRATEDCASETYPES
--==============================================================
create table DM_DIMINTEGRATEDCASETYPES
(
   DIMINTEGRATEDCASETYPEKEY BIGINT                 not null,
   CODE                 VARCHAR(240)           not null,
   INTEGRATEDCASETYPE   VARCHAR(2000)
);

alter table DM_DIMINTEGRATEDCASETYPES
   add constraint P_IDENTIFIER_1 primary key (DIMINTEGRATEDCASETYPEKEY);

alter table DM_DIMINTEGRATEDCASETYPES
   add constraint A_AK_KEY_3_DM_DIMI unique (CODE);

--==============================================================
-- Table: DM_DIMINVRECOMMENDATION
--==============================================================
create table DM_DIMINVRECOMMENDATION
(
   DIMINVRECOMMENDATIONKEY BIGINT                 not null,
   RECOMMENDATIONCODE   VARCHAR(240)           not null,
   RECOMMENDATIONDESC   VARCHAR(2000)          not null
);

alter table DM_DIMINVRECOMMENDATION
   add constraint P_IDENTIFIER_1 primary key (DIMINVRECOMMENDATIONKEY);

alter table DM_DIMINVRECOMMENDATION
   add constraint A_AK_KEY_2_DM_DIMI unique (RECOMMENDATIONCODE);

--==============================================================
-- Table: DM_DIMINVSUBTYPE
--==============================================================
create table DM_DIMINVSUBTYPE
(
   DIMINVSUBTYPEKEY     BIGINT                 not null,
   INVSUBTYPECODE       VARCHAR(240)           not null,
   INVSUBTYPEDESC       VARCHAR(2000)          not null
);

alter table DM_DIMINVSUBTYPE
   add constraint P_IDENTIFIER_1 primary key (DIMINVSUBTYPEKEY);

alter table DM_DIMINVSUBTYPE
   add constraint A_AK_KEY_2_DM_DIMI unique (INVSUBTYPECODE);

--==============================================================
-- Table: DM_DIMMARITALSTATUS
--==============================================================
create table DM_DIMMARITALSTATUS
(
   DIMMARITALSTATUSKEY  BIGINT                 not null,
   STATUSCODE           VARCHAR(240),
   MARITALSTATUS        VARCHAR(2000)          not null
);

alter table DM_DIMMARITALSTATUS
   add constraint P_IDENTIFIER_1 primary key (DIMMARITALSTATUSKEY);

--==============================================================
-- Table: DM_DIMMASCODES
--==============================================================
create table DM_DIMMASCODES
(
   DIMMASKEY            BIGINT                 not null,
   CODE                 VARCHAR(240),
   DESCRIPTION          VARCHAR(2000)
);

alter table DM_DIMMASCODES
   add constraint P_IDENTIFIER_1 primary key (DIMMASKEY);

--==============================================================
-- Table: DM_DIMMERGESTATUS
--==============================================================
create table DM_DIMMERGESTATUS
(
   DIMMERGESTATUSKEY    BIGINT                 not null,
   CODE                 VARCHAR(240)           not null,
   DESCRIPTION          VARCHAR(2000)
);

alter table DM_DIMMERGESTATUS
   add constraint P_IDENTIFIER_1 primary key (DIMMERGESTATUSKEY);

alter table DM_DIMMERGESTATUS
   add constraint A_AK_KEY_2_DM_DIMM unique (CODE);

--==============================================================
-- Table: DM_DIMMILESTONEDURATION
--==============================================================
create table DM_DIMMILESTONEDURATION
(
   DIMMILESTONEDURATIONKEY BIGINT                 not null,
   DURATION             BIGINT                 not null,
   MILESTONENAME        VARCHAR(2000)          not null
);

alter table DM_DIMMILESTONEDURATION
   add constraint P_IDENTIFIER_1 primary key (DIMMILESTONEDURATIONKEY);

alter table DM_DIMMILESTONEDURATION
   add constraint A_AK_KEY_2_DM_DIMM unique (DURATION, MILESTONENAME);

--==============================================================
-- Table: DM_DIMNATIONALITY
--==============================================================
create table DM_DIMNATIONALITY
(
   DIMNATIONALITYKEY    BIGINT                 not null,
   CODE                 VARCHAR(240)           not null,
   DESCRIPTION          VARCHAR(2000)
);

alter table DM_DIMNATIONALITY
   add constraint P_IDENTIFIER_1 primary key (DIMNATIONALITYKEY);

alter table DM_DIMNATIONALITY
   add constraint A_AK_KEY_2_DM_DIMN unique (CODE);

--==============================================================
-- Table: DM_DIMNUMOFPARENTS
--==============================================================
create table DM_DIMNUMOFPARENTS
(
   DIMNUMOFPARENTSKEY   BIGINT                 not null,
   NUMOFPARENTS         BIGINT                 not null,
   DIMENDESC            VARCHAR(2000)
);

alter table DM_DIMNUMOFPARENTS
   add constraint P_IDENTIFIER_1 primary key (DIMNUMOFPARENTSKEY);

--==============================================================
-- Table: DM_DIMORGANISATION
--==============================================================
create table DM_DIMORGANISATION
(
   DIMORGKEY            BIGINT                 not null,
   ORGNAME              VARCHAR(2048)          not null,
   STATE                VARCHAR(2000)
);

alter table DM_DIMORGANISATION
   add constraint P_IDENTIFIER_1 primary key (DIMORGKEY);

alter table DM_DIMORGANISATION
   add constraint A_AK_KEY_2_DM_DIMO unique (ORGNAME);

--==============================================================
-- Table: DM_DIMORGUNIT
--==============================================================
create table DM_DIMORGUNIT
(
   ORGUNITKEY           BIGINT                 not null,
   ORGUNITID            BIGINT,
   ORGUNITNAME          VARCHAR(2000),
   ORGUNITDESC          VARCHAR(2000),
   ORGUNITLEVEL         BIGINT,
   ORGUNITPARENTID      BIGINT,
   ORGUNITPARENTNAME    VARCHAR(2000)
);

alter table DM_DIMORGUNIT
   add constraint P_IDENTIFIER_1 primary key (ORGUNITKEY);

--==============================================================
-- Table: DM_DIMOUTCOME
--==============================================================
create table DM_DIMOUTCOME
(
   DIMOUTCOMEKEY        BIGINT                 not null,
   OUTCOMECODE          VARCHAR(240)           not null,
   OUTCOMEDESC          VARCHAR(2000)          not null
);

alter table DM_DIMOUTCOME
   add constraint P_IDENTIFIER_1 primary key (DIMOUTCOMEKEY);

alter table DM_DIMOUTCOME
   add constraint A_AK_KEY_2_DM_DIMC unique (OUTCOMECODE);

--==============================================================
-- Table: DM_DIMPARTICIPANTSTATUS
--==============================================================
create table DM_DIMPARTICIPANTSTATUS
(
   DIMPARTICIPANTSTATUSKEY BIGINT                 not null,
   STATUSCODE           VARCHAR(240),
   STATUS               VARCHAR(2000)
);

alter table DM_DIMPARTICIPANTSTATUS
   add constraint P_IDENTIFIER_1 primary key (DIMPARTICIPANTSTATUSKEY);

--==============================================================
-- Table: DM_DIMPAYMETHOD
--==============================================================
create table DM_DIMPAYMETHOD
(
   DIMPAYMETHODKEY      BIGINT                 not null,
   PAYMETHODCODE        VARCHAR(240),
   PAYMETHODDESC        VARCHAR(2000)          not null
);

alter table DM_DIMPAYMETHOD
   add constraint P_IDENTIFIER_1 primary key (DIMPAYMETHODKEY);

--==============================================================
-- Table: DM_DIMPERSONROLE
--==============================================================
create table DM_DIMPERSONROLE
(
   DIMPERSONROLEKEY     BIGINT                 not null,
   ROLECODE             VARCHAR(240)           not null,
   ROLEDESCRIPTION      VARCHAR(2000)
);

alter table DM_DIMPERSONROLE
   add constraint P_IDENTIFIER_1 primary key (DIMPERSONROLEKEY);

--==============================================================
-- Table: DM_DIMPERSONTYPE
--==============================================================
create table DM_DIMPERSONTYPE
(
   DIMPERSONTYPEKEY     BIGINT                 not null,
   CODE                 VARCHAR(240)           not null,
   PERSONTYPE           VARCHAR(2000)
);

alter table DM_DIMPERSONTYPE
   add constraint P_IDENTIFIER_1 primary key (DIMPERSONTYPEKEY);

alter table DM_DIMPERSONTYPE
   add constraint A_AK_KEY_2_DM_DIMP unique (CODE);

--==============================================================
-- Table: DM_DIMPREFERREDLANGUAGE
--==============================================================
create table DM_DIMPREFERREDLANGUAGE
(
   DIMPREFERREDLANGUAGEKEY BIGINT                 not null,
   LANGUAGECODE         VARCHAR(240),
   PREFERREDLANGUAGE    VARCHAR(2000)          not null
);

alter table DM_DIMPREFERREDLANGUAGE
   add constraint P_IDENTIFIER_1 primary key (DIMPREFERREDLANGUAGEKEY);

--==============================================================
-- Table: DM_DIMPRODUCT
--==============================================================
create table DM_DIMPRODUCT
(
   DIMPRODUCTKEY        BIGINT                 not null,
   DWPRODUCTID          BIGINT                 not null,
   "NAME"               VARCHAR(2000)          not null,
   PRODUCTTYPECODE      VARCHAR(240)           not null,
   PRODUCTTYPE          VARCHAR(2000)
);

alter table DM_DIMPRODUCT
   add constraint P_KEY_1 primary key (DIMPRODUCTKEY);

alter table DM_DIMPRODUCT
   add constraint A_AK_KEY_2_DM_DIMP unique (DWPRODUCTID);

--==============================================================
-- Table: DM_DIMPROGRAM
--==============================================================
create table DM_DIMPROGRAM
(
   DIMPROGRAMKEY        BIGINT                 not null,
   PROGRAMCODE          VARCHAR(240)           not null,
   "PROGRAM"            VARCHAR(2000),
   DISPLAYNAME          VARCHAR(2000)
);

alter table DM_DIMPROGRAM
   add constraint P_IDENTIFIER_1 primary key (DIMPROGRAMKEY);

alter table DM_DIMPROGRAM
   add constraint A_AK_KEY_3_DM_DIMP unique (PROGRAMCODE);

--==============================================================
-- Table: DM_DIMPROVIDER
--==============================================================
create table DM_DIMPROVIDER
(
   DIMPROVIDERKEY       BIGINT                 not null,
   PROVIDERID           BIGINT                 not null,
   PROVIDERNAME         VARCHAR(2000)          not null
);

alter table DM_DIMPROVIDER
   add constraint P_IDENTIFIER_1 primary key (DIMPROVIDERKEY);

alter table DM_DIMPROVIDER
   add constraint A_AK_KEY_2_DM_DIMP unique (PROVIDERID);

--==============================================================
-- Table: DM_DIMRACE
--==============================================================
create table DM_DIMRACE
(
   DIMRACEKEY           BIGINT                 not null,
   CODE                 VARCHAR(240)           not null,
   DESCRIPTION          VARCHAR(2000)
);

alter table DM_DIMRACE
   add constraint P_IDENTIFIER_1 primary key (DIMRACEKEY);

alter table DM_DIMRACE
   add constraint A_AK_KEY_2_DM_DIMR unique (CODE);

--==============================================================
-- Table: DM_DIMRECOMMENDATION
--==============================================================
create table DM_DIMRECOMMENDATION
(
   DIMRECOMMENDATIONKEY BIGINT                 not null,
   CODE                 VARCHAR(240),
   RECOMMENDATIONDESC   VARCHAR(2000)
);

alter table DM_DIMRECOMMENDATION
   add constraint P_IDENTIFIER_1 primary key (DIMRECOMMENDATIONKEY);

--==============================================================
-- Table: DM_DIMRECORDSTATUS
--==============================================================
create table DM_DIMRECORDSTATUS
(
   DIMRECORDSTATUSKEY   BIGINT                 not null,
   RECORDSTATUSCODE     VARCHAR(240),
   RECORDSTATUSDESC     VARCHAR(2000)
);

alter table DM_DIMRECORDSTATUS
   add constraint P_IDENTIFIER_1 primary key (DIMRECORDSTATUSKEY);

--==============================================================
-- Table: DM_DIMRECURRENCE
--==============================================================
create table DM_DIMRECURRENCE
(
   DIMRECURRENCEKEY     BIGINT                 not null,
   CODE                 VARCHAR(240),
   DESCRIPTION          VARCHAR(2000)
);

alter table DM_DIMRECURRENCE
   add constraint P_IDENTIFIER_1 primary key (DIMRECURRENCEKEY);

--==============================================================
-- Table: DM_DIMREPORTINGDUMMY
--==============================================================
create table DM_DIMREPORTINGDUMMY
(
   DUMMY                VARCHAR(2000)          not null default 'Dummy ETL for Java Transforms'
);

alter table DM_DIMREPORTINGDUMMY
   add constraint P_IDENTIFIER_1 primary key (DUMMY);

--==============================================================
-- Table: DM_DIMREPORTINGTIMELINESS
--==============================================================
create table DM_DIMREPORTINGTIMELINESS
(
   DIMREPORTINGTIMELINESSKEY BIGINT                 not null,
   REPORTINGTIMELINESSKEYCODE VARCHAR(240)           not null,
   REPORTINGTIMELINESSKEYDESC VARCHAR(2000)          not null
);

alter table DM_DIMREPORTINGTIMELINESS
   add constraint P_IDENTIFIER_1 primary key (DIMREPORTINGTIMELINESSKEY);

alter table DM_DIMREPORTINGTIMELINESS
   add constraint A_AK_KEY_211_DM_DI unique (REPORTINGTIMELINESSKEYCODE);

--==============================================================
-- Table: DM_DIMRESOLUTIONSTATUS
--==============================================================
create table DM_DIMRESOLUTIONSTATUS
(
   DIMRESOLUTIONSTATUSKEY BIGINT                 not null,
   CODE                 VARCHAR(240),
   DESCRIPTION          VARCHAR(2000)
);

alter table DM_DIMRESOLUTIONSTATUS
   add constraint P_IDENTIFIER_1 primary key (DIMRESOLUTIONSTATUSKEY);

--==============================================================
-- Table: DM_DIMRESPONDSWITHINTIME
--==============================================================
create table DM_DIMRESPONDSWITHINTIME
(
   RESPONDSWITHINTIMEKEY BIGINT                 not null,
   CODE                 VARCHAR(240),
   RESPONDSWITHINTIMEDESC VARCHAR(2000)
);

alter table DM_DIMRESPONDSWITHINTIME
   add constraint P_IDENTIFIER_1 primary key (RESPONDSWITHINTIMEKEY);

--==============================================================
-- Table: DM_DIMRESPONSEPRIORITY
--==============================================================
create table DM_DIMRESPONSEPRIORITY
(
   DIMRESPONSEPRIORITYKEY BIGINT                 not null,
   CODE                 VARCHAR(240),
   RESPONSEPRIORITYDESC VARCHAR(2000)
);

alter table DM_DIMRESPONSEPRIORITY
   add constraint P_IDENTIFIER_1 primary key (DIMRESPONSEPRIORITYKEY);

--==============================================================
-- Table: DM_DIMSERVICE
--==============================================================
create table DM_DIMSERVICE
(
   DIMSERVICEKEY        BIGINT                 not null,
   SERVICECODE          VARCHAR(240),
   SERVICETYPE          VARCHAR(2000)          not null
);

alter table DM_DIMSERVICE
   add constraint P_IDENTIFIER_1 primary key (DIMSERVICEKEY);

--==============================================================
-- Table: DM_DIMSERVICEOFFERING
--==============================================================
create table DM_DIMSERVICEOFFERING
(
   DIMSERVICEOFFERINGKEY BIGINT                 not null,
   SERVICEOFFERINGID    BIGINT                 not null,
   SERVICEOFFERINGNAME  VARCHAR(2000)          not null,
   STARTDATE            DATE,
   ENDDATE              DATE
);

alter table DM_DIMSERVICEOFFERING
   add constraint P_IDENTIFIER_1 primary key (DIMSERVICEOFFERINGKEY);

alter table DM_DIMSERVICEOFFERING
   add constraint A_AK_KEY_2_DM_DIMS unique (SERVICEOFFERINGID);

alter table DM_DIMSERVICEOFFERING
   add constraint A_AK_KEY_3_DM_DIMS unique (SERVICEOFFERINGNAME);

--==============================================================
-- Table: DM_DIMSTATUS
--==============================================================
create table DM_DIMSTATUS
(
   STATUSKEY            BIGINT                 not null,
   STATUSNAME           VARCHAR(2000)          not null,
   STATUSCODE           VARCHAR(240),
   STATUSCATEGORY       VARCHAR(240)
);

alter table DM_DIMSTATUS
   add constraint P_IDENTIFIER_1 primary key (STATUSKEY);

--==============================================================
-- Table: DM_DIMSUBSIDIZEDHOUSINGTYPES
--==============================================================
create table DM_DIMSUBSIDIZEDHOUSINGTYPES
(
   DIMSUBSIDIZEDHOUSINGTYPEKEY BIGINT                 not null,
   CODE                 VARCHAR(240),
   DESCRIPTION          VARCHAR(2000)
);

alter table DM_DIMSUBSIDIZEDHOUSINGTYPES
   add constraint P_IDENTIFIER_1 primary key (DIMSUBSIDIZEDHOUSINGTYPEKEY);

--==============================================================
-- Table: DM_DIMTIMEOFDAYGROUPS
--==============================================================
create table DM_DIMTIMEOFDAYGROUPS
(
   DIMPROGRAMKEY        BIGINT                 not null,
   HOUROFDAY            BIGINT                 not null
      constraint C_HOUROFDAY check (HOUROFDAY between -1 and 23),
   GROUPNAME            VARCHAR(2000)          not null,
   GROUPDESC            VARCHAR(2000)
);

alter table DM_DIMTIMEOFDAYGROUPS
   add constraint A_AK_KEY_2_DM_DIMT unique (DIMPROGRAMKEY, HOUROFDAY, GROUPNAME);

--==============================================================
-- Table: DM_DIMTIMEPERIOD
--==============================================================
create table DM_DIMTIMEPERIOD
(
   TIMEPERIODKEY        BIGINT                 not null,
   TIMEPERIODDESCRIPTION VARCHAR(2000),
   TIMEPERIODDETAILLEVEL CHAR(30),
   DAYDATE              DATE,
   DMYEAR               BIGINT,
   DMMONTH              BIGINT,
   WEEK                 BIGINT,
   DMDAY                BIGINT,
   CALENDARQUARTER      BIGINT,
   DAYOFWEEK            CHAR(30),
   FEDERALFISCALYEAR    BIGINT,
   FEDERALFISCALQUARTER BIGINT,
   FEDERALFISCALMONTH   BIGINT,
   MONTHSTARTDATEIND    SMALLINT,
   MONTHENDDATEIND      SMALLINT,
   FISCALQUARTERSTARTDATEIND SMALLINT,
   FISCALQUARTERENDDATEIND SMALLINT,
   FISCALYEARSTARTDATEIND SMALLINT,
   FISCALYEARENDDATEIND SMALLINT,
   SHORTMONTHNAME       VARCHAR(2000),
   LONGMONTHNAME        VARCHAR(2000),
   SHORTMONTHNAME_YEAR  VARCHAR(2000),
   SORTORDER            BIGINT
);

alter table DM_DIMTIMEPERIOD
   add constraint P_IDENTIFIER_1 primary key (TIMEPERIODKEY);

--==============================================================
-- Table: DM_DIMTRANSACTIONTYPE
--==============================================================
create table DM_DIMTRANSACTIONTYPE
(
   DIMTRANSACTIONKEY    BIGINT                 not null,
   CATEGORYCODE         VARCHAR(240)           not null,
   CATEGORYDESC         VARCHAR(2000),
   TYPECODE             VARCHAR(240)           not null,
   TYPEDESC             VARCHAR(2000),
   CRDRTYPE             VARCHAR(240)           not null
);

alter table DM_DIMTRANSACTIONTYPE
   add constraint P_IDENTIFIER_1 primary key (DIMTRANSACTIONKEY);

alter table DM_DIMTRANSACTIONTYPE
   add constraint A_AK_ID_2_DM_DIMTR unique (CATEGORYCODE, TYPECODE, CRDRTYPE);

--==============================================================
-- Table: DM_DIMUTILITY
--==============================================================
create table DM_DIMUTILITY
(
   DIMUTILITYKEY        BIGINT                 not null,
   UTILITYCODE          VARCHAR(240),
   UTILITYTYPE          VARCHAR(2000)
);

alter table DM_DIMUTILITY
   add constraint P_IDENTIFIER_1 primary key (DIMUTILITYKEY);

--==============================================================
-- Table: DM_DIMYESNOINDICATOR
--==============================================================
create table DM_DIMYESNOINDICATOR
(
   DIMYESNOINDICATORKEY BIGINT                 not null,
   INDDESCRIPTION       VARCHAR(2000),
   DISPLAYNAME          VARCHAR(2000)
);

alter table DM_DIMYESNOINDICATOR
   add constraint P_IDENTIFIER_1 primary key (DIMYESNOINDICATORKEY);

--==============================================================
-- Table: DM_ETLCONTROL
--==============================================================
create table DM_ETLCONTROL
(
   TARGETTABLENAME      VARCHAR(2000)          not null,
   LAST_ETL_DATE        TIMESTAMP              not null,
   EXTRACTTIME          TIMESTAMP,
   EXTRACTFINISH        TIMESTAMP
);

alter table DM_ETLCONTROL
   add constraint P_IDENTIFIER_1 primary key (TARGETTABLENAME);

--==============================================================
-- Table: DM_FACTALLEGATION
--==============================================================
create table DM_FACTALLEGATION
(
   DIMALGMETHODKEY      BIGINT                 not null,
   DIMALGLOCATIONKEY    BIGINT                 not null,
   DIMRECURRENCEKEY     BIGINT                 not null default -1,
   ALLEGATIONDATEKEY    BIGINT                 not null,
   DIMALGTYPEKEY        BIGINT                 not null,
   DIMRECORDSTATUSKEY   BIGINT                 not null,
   DIMALGFINDINGKEY     BIGINT                 not null,
   AGEGROUPKEY          BIGINT                 not null,
   DIMALGSEVERITYKEY    BIGINT                 not null,
   CASEID               BIGINT                 not null,
   RELATEDCASEID        BIGINT,
   AGE                  BIGINT,
   VICTIMCONCERNROLEID  BIGINT,
   VICTIMPERSONHISTORYKEY BIGINT,
   MALTREATPERSONHISTORYKEY BIGINT,
   MALTREATCONCERNROLEID BIGINT,
   NUMPREVMALREATMENT   BIGINT,
   "COUNT"              BIGINT                 default 1,
   ALLEGATIONID         BIGINT
);

--==============================================================
-- Index: RELATIONSHIP_16_FK
--==============================================================
create index RELATIONSHIP_16_FK on DM_FACTALLEGATION (
   DIMALGFINDINGKEY     ASC
);

--==============================================================
-- Index: RELATIONSHIP_30_FK
--==============================================================
create index RELATIONSHIP_30_FK on DM_FACTALLEGATION (
   DIMALGLOCATIONKEY    ASC
);

--==============================================================
-- Index: RELATIONSHIP_29_FK
--==============================================================
create index RELATIONSHIP_29_FK on DM_FACTALLEGATION (
   DIMALGTYPEKEY        ASC
);

--==============================================================
-- Index: RELATIONSHIP_189_F
--==============================================================
create index RELATIONSHIP_189_F on DM_FACTALLEGATION (
   DIMALGSEVERITYKEY    ASC
);

--==============================================================
-- Index: RELATIONSHIP_193_F
--==============================================================
create index RELATIONSHIP_193_F on DM_FACTALLEGATION (
   ALLEGATIONDATEKEY    ASC
);

--==============================================================
-- Index: RELATIONSHIP_197_F
--==============================================================
create index RELATIONSHIP_197_F on DM_FACTALLEGATION (
   AGEGROUPKEY          ASC
);

--==============================================================
-- Index: RELATIONSHIP_198_F
--==============================================================
create index RELATIONSHIP_198_F on DM_FACTALLEGATION (
   DIMRECORDSTATUSKEY   ASC
);

--==============================================================
-- Index: RELATIONSHIP_199_F
--==============================================================
create index RELATIONSHIP_199_F on DM_FACTALLEGATION (
   DIMALGMETHODKEY      ASC
);

--==============================================================
-- Index: RELATIONSHIP_202_F
--==============================================================
create index RELATIONSHIP_202_F on DM_FACTALLEGATION (
   DIMRECURRENCEKEY     ASC
);

--==============================================================
-- Table: DM_FACTCASEEVENT
--==============================================================
create table DM_FACTCASEEVENT
(
   DIMCASEREVIEWOUTCOMEKEY BIGINT                 not null,
   EVENTDATEKEY         BIGINT                 not null,
   DIMINTEGRATEDCASETYPEKEY BIGINT                 not null,
   CASEREFERENCENO      VARCHAR(240),
   CASEEVENTTYPE        VARCHAR(240),
   "COUNT"              BIGINT                 default 1,
   CASEID               BIGINT                 not null
);

--==============================================================
-- Index: RELATIONSHIP_76_FK
--==============================================================
create index RELATIONSHIP_76_FK on DM_FACTCASEEVENT (
   EVENTDATEKEY         ASC
);

--==============================================================
-- Index: RELATIONSHIP_178_F
--==============================================================
create index RELATIONSHIP_178_F on DM_FACTCASEEVENT (
   DIMCASEREVIEWOUTCOMEKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_181_F
--==============================================================
create index RELATIONSHIP_181_F on DM_FACTCASEEVENT (
   DIMINTEGRATEDCASETYPEKEY ASC
);

--==============================================================
-- Table: DM_FACTCASEHISTORY
--==============================================================
create table DM_FACTCASEHISTORY
(
   ORGUNITKEY           BIGINT                 not null,
   STARTDATEKEY         BIGINT                 not null,
   DIMINTEGRATEDCASETYPEKEY BIGINT                 not null,
   DIMCASETYPEKEY       BIGINT                 not null,
   CASEOWNERKEY         BIGINT                 not null,
   DIMPRODUCTKEY        BIGINT                 not null,
   STATUSKEY            BIGINT                 not null,
   DIMADDRESSKEY        BIGINT                 not null,
   ENDDATEKEY           BIGINT                 not null,
   DIMPROGRAMKEY        BIGINT                 not null,
   CASESUPERKEY         BIGINT                 not null,
   CASEID               BIGINT                 not null,
   DESCRIPTION          VARCHAR(2000),
   "COUNT"              BIGINT                 default 1,
   CASEREFERENCENO      VARCHAR(240),
   LASTWRITTEN          TIMESTAMP
);

alter table DM_FACTCASEHISTORY
   add constraint A_AK_FACTCASEHIST1 unique (STARTDATEKEY, STATUSKEY, CASEID);

--==============================================================
-- Index: POINTINTTIME_FK
--==============================================================
create index POINTINTTIME_FK on DM_FACTCASEHISTORY (
   STARTDATEKEY         ASC
);

--==============================================================
-- Index: RELATESTO_FK
--==============================================================
create index RELATESTO_FK on DM_FACTCASEHISTORY (
   STATUSKEY            ASC
);

--==============================================================
-- Index: OWNEDBYORG_FK
--==============================================================
create index OWNEDBYORG_FK on DM_FACTCASEHISTORY (
   ORGUNITKEY           ASC
);

--==============================================================
-- Index: PRODUCT_FK
--==============================================================
create index PRODUCT_FK on DM_FACTCASEHISTORY (
   DIMPRODUCTKEY        ASC
);

--==============================================================
-- Index: RELATESTO25_FK
--==============================================================
create index RELATESTO25_FK on DM_FACTCASEHISTORY (
   ENDDATEKEY           ASC
);

--==============================================================
-- Index: RELATIONSHIP_131_F
--==============================================================
create index RELATIONSHIP_131_F on DM_FACTCASEHISTORY (
   CASEOWNERKEY         ASC
);

--==============================================================
-- Index: RELATIONSHIP_154_F
--==============================================================
create index RELATIONSHIP_154_F on DM_FACTCASEHISTORY (
   DIMADDRESSKEY        ASC
);

--==============================================================
-- Index: RELATIONSHIP_156_F
--==============================================================
create index RELATIONSHIP_156_F on DM_FACTCASEHISTORY (
   DIMPROGRAMKEY        ASC
);

--==============================================================
-- Index: RELATIONSHIP_DIMSU
--==============================================================
create index RELATIONSHIP_DIMSU on DM_FACTCASEHISTORY (
   CASESUPERKEY         ASC
);

--==============================================================
-- Index: RELATIONSHIP_174_F
--==============================================================
create index RELATIONSHIP_174_F on DM_FACTCASEHISTORY (
   DIMCASETYPEKEY       ASC
);

--==============================================================
-- Index: RELATIONSHIP_188_F
--==============================================================
create index RELATIONSHIP_188_F on DM_FACTCASEHISTORY (
   DIMINTEGRATEDCASETYPEKEY ASC
);

--==============================================================
-- Table: DM_FACTCASEPARTICIPANT
--==============================================================
create table DM_FACTCASEPARTICIPANT
(
   ACTIVESTARTDATEKEY   BIGINT                 not null,
   DIMCASEPARTROLEID    BIGINT                 not null,
   ISMASTERKEY          BIGINT                 not null,
   PERSONHISTORYKEY     BIGINT                 not null,
   RELATIONSHIPTYPEKEY  BIGINT                 not null,
   MASTERPERSONHISTORYKEY BIGINT                 not null,
   DIMPRODUCTKEY        BIGINT                 not null,
   ACTIVEENDDATEKEY     BIGINT                 not null,
   CASEID               BIGINT                 not null,
   PRIMCLIENTCASEPARTROLEID BIGINT,
   CASEREFERENCENO      VARCHAR(240),
   "COUNT"              BIGINT                 default 1
);

alter table DM_FACTCASEPARTICIPANT
   add constraint A_AK_CASEPARTICIPA unique (DIMCASEPARTROLEID, CASEID, PERSONHISTORYKEY);

--==============================================================
-- Index: RELATIONSHIP_66_FK
--==============================================================
create index RELATIONSHIP_66_FK on DM_FACTCASEPARTICIPANT (
   DIMPRODUCTKEY        ASC
);

--==============================================================
-- Index: RELATIONSHIP_68_FK
--==============================================================
create index RELATIONSHIP_68_FK on DM_FACTCASEPARTICIPANT (
   ACTIVESTARTDATEKEY   ASC
);

--==============================================================
-- Index: RELATIONSHIP_128_F
--==============================================================
create index RELATIONSHIP_128_F on DM_FACTCASEPARTICIPANT (
   DIMCASEPARTROLEID    ASC
);

--==============================================================
-- Index: RELATIONSHIP_153_F
--==============================================================
create index RELATIONSHIP_153_F on DM_FACTCASEPARTICIPANT (
   RELATIONSHIPTYPEKEY  ASC
);

--==============================================================
-- Index: RELATIONSHIP_169_F
--==============================================================
create index RELATIONSHIP_169_F on DM_FACTCASEPARTICIPANT (
   ACTIVEENDDATEKEY     ASC
);

--==============================================================
-- Table: DM_FACTCONTACT
--==============================================================
create table DM_FACTCONTACT
(
   DIMCONTACTMETHODKEY  BIGINT                 not null,
   DIMCONTACTLOCATIONKEY BIGINT                 not null,
   DIMRECORDSTATUSKEY   BIGINT                 not null,
   DIMCONTACTTYPEKEY    BIGINT                 not null,
   DIMFREQUENCYCRITERIAKEY BIGINT                 not null,
   DIMCOMPLIANCESTATUSKEY BIGINT                 not null,
   DIMREPORTINGTIMELINESSKEY BIGINT                 not null,
   DIMTARGETDATEKEY     BIGINT                 not null,
   DIMRESPONSEPRIORITYKEY BIGINT                 not null,
   DIMCONTACTDATEKEY    BIGINT                 not null,
   DIMCOMPLIANCETYPEKEY BIGINT                 not null,
   DIMREPORTEDDATEKEY   BIGINT                 not null,
   DIMAGEGROUPKEY       BIGINT                 not null,
   CONTACTLOGID         BIGINT                 not null,
   CONTACTCOMPLIANCEINFOID BIGINT                 not null,
   CASEID               BIGINT                 not null,
   CONCERNROLEID        BIGINT                 not null,
   PERSONHISTORYKEY     BIGINT                 not null,
   AGE                  BIGINT,
   "COUNT"              BIGINT                 not null default 1,
   REPORTEDLATEDURATION BIGINT
);

alter table DM_FACTCONTACT
   add constraint A_AK_ID_1_DM_FACTC unique (CONTACTLOGID, CONTACTCOMPLIANCEINFOID);

--==============================================================
-- Index: RELATIONSHIP_20_FK
--==============================================================
create index RELATIONSHIP_20_FK on DM_FACTCONTACT (
   DIMFREQUENCYCRITERIAKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_12_FK
--==============================================================
create index RELATIONSHIP_12_FK on DM_FACTCONTACT (
   DIMCONTACTTYPEKEY    ASC
);

--==============================================================
-- Index: RELATIONSHIP_11_FK
--==============================================================
create index RELATIONSHIP_11_FK on DM_FACTCONTACT (
   DIMCONTACTLOCATIONKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_194_F
--==============================================================
create index RELATIONSHIP_194_F on DM_FACTCONTACT (
   DIMAGEGROUPKEY       ASC
);

--==============================================================
-- Index: RELATIONSHIP_195_F
--==============================================================
create index RELATIONSHIP_195_F on DM_FACTCONTACT (
   DIMCONTACTDATEKEY    ASC
);

--==============================================================
-- Index: RELATIONSHIP_200_F
--==============================================================
create index RELATIONSHIP_200_F on DM_FACTCONTACT (
   DIMTARGETDATEKEY     ASC
);

--==============================================================
-- Index: RELATIONSHIP_203_F
--==============================================================
create index RELATIONSHIP_203_F on DM_FACTCONTACT (
   DIMCOMPLIANCESTATUSKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_204_F
--==============================================================
create index RELATIONSHIP_204_F on DM_FACTCONTACT (
   DIMRESPONSEPRIORITYKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_196_F
--==============================================================
create index RELATIONSHIP_196_F on DM_FACTCONTACT (
   DIMCOMPLIANCETYPEKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_205_F
--==============================================================
create index RELATIONSHIP_205_F on DM_FACTCONTACT (
   DIMRECORDSTATUSKEY   ASC
);

--==============================================================
-- Index: RELATIONSHIP_145_F
--==============================================================
create index RELATIONSHIP_145_F on DM_FACTCONTACT (
   DIMREPORTINGTIMELINESSKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_146_F
--==============================================================
create index RELATIONSHIP_146_F on DM_FACTCONTACT (
   DIMREPORTEDDATEKEY   ASC
);

--==============================================================
-- Table: DM_FACTEDUCATIONHISTORY
--==============================================================
create table DM_FACTEDUCATIONHISTORY
(
   DIMEDUCATIONKEY      BIGINT                 not null,
   DIMPARTICIPANTSTATUSKEY BIGINT                 not null,
   STARTDATEKEY         BIGINT                 not null,
   ENDDATEKEY           BIGINT                 not null,
   REGDATEKEY           BIGINT                 not null,
   DATEOFBIRTHKEY       BIGINT                 not null,
   CONCERNROLEID        BIGINT                 not null,
   "COUNT"              BIGINT                 default 1
);

--==============================================================
-- Index: RELATIONSHIP_61_FK
--==============================================================
create index RELATIONSHIP_61_FK on DM_FACTEDUCATIONHISTORY (
   STARTDATEKEY         ASC
);

--==============================================================
-- Index: RELATIONSHIP_62_FK
--==============================================================
create index RELATIONSHIP_62_FK on DM_FACTEDUCATIONHISTORY (
   DATEOFBIRTHKEY       ASC
);

--==============================================================
-- Index: RELATIONSHIP_63_FK
--==============================================================
create index RELATIONSHIP_63_FK on DM_FACTEDUCATIONHISTORY (
   ENDDATEKEY           ASC
);

--==============================================================
-- Index: RELATIONSHIP_64_FK
--==============================================================
create index RELATIONSHIP_64_FK on DM_FACTEDUCATIONHISTORY (
   REGDATEKEY           ASC
);

--==============================================================
-- Index: RELATIONSHIP_102_F
--==============================================================
create index RELATIONSHIP_102_F on DM_FACTEDUCATIONHISTORY (
   DIMEDUCATIONKEY      ASC
);

--==============================================================
-- Index: RELATIONSHIP_104_F
--==============================================================
create index RELATIONSHIP_104_F on DM_FACTEDUCATIONHISTORY (
   DIMPARTICIPANTSTATUSKEY ASC
);

--==============================================================
-- Table: DM_FACTEMPLOYERHISTORY
--==============================================================
create table DM_FACTEMPLOYERHISTORY
(
   DIMADDRESSKEY        BIGINT                 not null,
   STARTDATEKEY         BIGINT                 not null,
   ENDDATEKEY           BIGINT                 not null,
   DIMPARTICIPANTSTATUSKEY BIGINT                 not null,
   DIMINDUSTRYTYPEKEY   BIGINT                 not null,
   REGISTRATIONDATEKEY  BIGINT                 not null,
   CONCERNROLEID        BIGINT                 not null,
   "COUNT"              BIGINT                 default 1
);

alter table DM_FACTEMPLOYERHISTORY
   add constraint A_AK_EMPLOYERHIST unique (DIMADDRESSKEY, STARTDATEKEY, DIMPARTICIPANTSTATUSKEY, CONCERNROLEID);

--==============================================================
-- Index: RELATIONSHIP_42_FK
--==============================================================
create index RELATIONSHIP_42_FK on DM_FACTEMPLOYERHISTORY (
   DIMADDRESSKEY        ASC
);

--==============================================================
-- Index: RELATIONSHIP_43_FK
--==============================================================
create index RELATIONSHIP_43_FK on DM_FACTEMPLOYERHISTORY (
   DIMINDUSTRYTYPEKEY   ASC
);

--==============================================================
-- Index: RELATIONSHIP_86_FK
--==============================================================
create index RELATIONSHIP_86_FK on DM_FACTEMPLOYERHISTORY (
   DIMPARTICIPANTSTATUSKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_87_FK
--==============================================================
create index RELATIONSHIP_87_FK on DM_FACTEMPLOYERHISTORY (
   REGISTRATIONDATEKEY  ASC
);

--==============================================================
-- Index: RELATIONSHIP_88_FK
--==============================================================
create index RELATIONSHIP_88_FK on DM_FACTEMPLOYERHISTORY (
   ENDDATEKEY           ASC
);

--==============================================================
-- Index: RELATIONSHIP_89_FK
--==============================================================
create index RELATIONSHIP_89_FK on DM_FACTEMPLOYERHISTORY (
   STARTDATEKEY         ASC
);

--==============================================================
-- Table: DM_FACTINVESTIGATION
--==============================================================
create table DM_FACTINVESTIGATION
(
   DIMINVSUBTYPEKEY     BIGINT                 not null,
   DIMRECOMMENDATIONDATEKEY BIGINT                 not null,
   DIMMEETMILESTONEDURINDKEY BIGINT                 not null,
   DIMMILESTONEDURATIONKEY BIGINT                 not null,
   DIMSTARTDATEKEY      BIGINT                 not null,
   DIMINVRECOMMENDATIONKEY BIGINT                 not null,
   DIMOUTCOMEKEY        BIGINT                 not null,
   DIMRESOLUTIONSTATUSKEY BIGINT                 not null,
   COUNTER              BIGINT,
   CASEID               BIGINT                 not null,
   RELATEDCASEID        BIGINT
);

alter table DM_FACTINVESTIGATION
   add constraint A_AK_KEY_1_DM_FACT unique (CASEID);

--==============================================================
-- Index: RELATIONSHIP_21_FK
--==============================================================
create index RELATIONSHIP_21_FK on DM_FACTINVESTIGATION (
   DIMINVRECOMMENDATIONKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_22_FK
--==============================================================
create index RELATIONSHIP_22_FK on DM_FACTINVESTIGATION (
   DIMOUTCOMEKEY        ASC
);

--==============================================================
-- Index: RELATIONSHIP_28_FK
--==============================================================
create index RELATIONSHIP_28_FK on DM_FACTINVESTIGATION (
   DIMMILESTONEDURATIONKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_27_FK
--==============================================================
create index RELATIONSHIP_27_FK on DM_FACTINVESTIGATION (
   DIMMEETMILESTONEDURINDKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_26_FK
--==============================================================
create index RELATIONSHIP_26_FK on DM_FACTINVESTIGATION (
   DIMRECOMMENDATIONDATEKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_25_FK
--==============================================================
create index RELATIONSHIP_25_FK on DM_FACTINVESTIGATION (
   DIMSTARTDATEKEY      ASC
);

--==============================================================
-- Index: RELATIONSHIP_15_FK
--==============================================================
create index RELATIONSHIP_15_FK on DM_FACTINVESTIGATION (
   DIMINVSUBTYPEKEY     ASC
);

--==============================================================
-- Index: RELATIONSHIP_201_F
--==============================================================
create index RELATIONSHIP_201_F on DM_FACTINVESTIGATION (
   DIMRESOLUTIONSTATUSKEY ASC
);

--==============================================================
-- Table: DM_FACTPAYMENTS
--==============================================================
create table DM_FACTPAYMENTS
(
   DIMDEDUCTIONKEY      BIGINT                 not null,
   DIMFINSTATUSKEY      BIGINT                 not null,
   DIMDELIVERYMETHODKEY BIGINT                 not null,
   DIMPROGRAMKEY        BIGINT                 not null,
   DIMTRANSACTIONKEY    BIGINT                 not null,
   ORGUNITKEY           BIGINT                 not null,
   EFFECTIVEDATEKEY     BIGINT                 not null,
   DIMPRODUCTKEY        BIGINT                 not null,
   GAURDIANFLAG         CHAR(1)                default 'N',
   REGENERATEDFLAG      CHAR(1)                default 'N',
   CASEID               BIGINT                 not null,
   CONCERNROLEID        BIGINT                 not null,
   PERSONHISTORYID      BIGINT,
   INSTRUCTLINEITEMID   BIGINT                 not null,
   AMOUNT               DECIMAL(31,2),
   UNPROCESSEDAMOUNT    DECIMAL(31,2),
   "COUNT"              BIGINT                 default 1
);

alter table DM_FACTPAYMENTS
   add constraint A_AK_FACTPAY unique (INSTRUCTLINEITEMID);

--==============================================================
-- Index: RELATIONSHIP_106_F
--==============================================================
create index RELATIONSHIP_106_F on DM_FACTPAYMENTS (
   EFFECTIVEDATEKEY     ASC
);

--==============================================================
-- Index: RELATIONSHIP_108_F
--==============================================================
create index RELATIONSHIP_108_F on DM_FACTPAYMENTS (
   ORGUNITKEY           ASC
);

--==============================================================
-- Index: RELATIONSHIP_113_F
--==============================================================
create index RELATIONSHIP_113_F on DM_FACTPAYMENTS (
   DIMPRODUCTKEY        ASC
);

--==============================================================
-- Index: RELATIONSHIP_109_F
--==============================================================
create index RELATIONSHIP_109_F on DM_FACTPAYMENTS (
   DIMFINSTATUSKEY      ASC
);

--==============================================================
-- Index: RELATIONSHIP_111_F
--==============================================================
create index RELATIONSHIP_111_F on DM_FACTPAYMENTS (
   DIMDELIVERYMETHODKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_112_F
--==============================================================
create index RELATIONSHIP_112_F on DM_FACTPAYMENTS (
   DIMDEDUCTIONKEY      ASC
);

--==============================================================
-- Index: RELATIONSHIP_116_F
--==============================================================
create index RELATIONSHIP_116_F on DM_FACTPAYMENTS (
   DIMTRANSACTIONKEY    ASC
);

--==============================================================
-- Index: RELATIONSHIP_159_F
--==============================================================
create index RELATIONSHIP_159_F on DM_FACTPAYMENTS (
   DIMPROGRAMKEY        ASC
);

--==============================================================
-- Table: DM_FACTPERSONHISTORY
--==============================================================
create table DM_FACTPERSONHISTORY
(
   PERSONHISTORYKEY     BIGINT                 not null,
   STARTDATEKEY         BIGINT                 not null,
   ENDDATEKEY           BIGINT                 not null,
   DIMMARITALSTATUSKEY  BIGINT                 not null,
   DIMCOUNTRYKEY        BIGINT                 not null,
   DATEOFBIRTHKEY       BIGINT                 not null,
   DIMMERGESTATUSKEY    BIGINT                 not null,
   DIMPARTICIPANTSTATUSKEY BIGINT                 not null,
   DIMDUPREASONKEY      BIGINT                 not null,
   DIMPREFERREDLANGUAGEKEY BIGINT                 not null,
   REGISTRATIONDATEKEY  BIGINT                 not null,
   DIMADDRESSKEY        BIGINT                 not null,
   DIMGENDERKEY         BIGINT                 not null,
   DIMDUPSTATUSKEY      BIGINT                 not null,
   DIMETHNICITYKEY      BIGINT                 not null,
   DIMPERSONTYPEKEY     BIGINT                 not null,
   DUPLICATEDATEKEY     BIGINT                 not null,
   DIMCONSTSTATKEY      BIGINT                 not null,
   CONCERNROLEID        BIGINT                 not null,
   MASTERCONCERNROLEID  BIGINT,
   SSN                  VARCHAR(120),
   FIRSTNAME            VARCHAR(2000),
   LASTNAME             VARCHAR(2000),
   "COUNT"              BIGINT                 default 1,
   DIMCONCERNROLEALTID  BIGINT,
   DIMINDIGENOUSGROUPKEY BIGINT                 not null default -1,
   DIMRACEKEY           BIGINT                 not null default -1,
   DIMNATIONALITYKEY    BIGINT                 not null default -1
);

alter table DM_FACTPERSONHISTORY
   add constraint P_IDENTIFIER_1 primary key (PERSONHISTORYKEY);

--==============================================================
-- Index: RELATIONSHIP_32_FK
--==============================================================
create index RELATIONSHIP_32_FK on DM_FACTPERSONHISTORY (
   DIMGENDERKEY         ASC
);

--==============================================================
-- Index: RELATIONSHIP_33_FK
--==============================================================
create index RELATIONSHIP_33_FK on DM_FACTPERSONHISTORY (
   DIMCOUNTRYKEY        ASC
);

--==============================================================
-- Index: RELATIONSHIP_34_FK
--==============================================================
create index RELATIONSHIP_34_FK on DM_FACTPERSONHISTORY (
   DIMPREFERREDLANGUAGEKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_36_FK
--==============================================================
create index RELATIONSHIP_36_FK on DM_FACTPERSONHISTORY (
   DIMMARITALSTATUSKEY  ASC
);

--==============================================================
-- Index: RELATIONSHIP_37_FK
--==============================================================
create index RELATIONSHIP_37_FK on DM_FACTPERSONHISTORY (
   DIMPARTICIPANTSTATUSKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_82_FK
--==============================================================
create index RELATIONSHIP_82_FK on DM_FACTPERSONHISTORY (
   ENDDATEKEY           ASC
);

--==============================================================
-- Index: RELATIONSHIP_83_FK
--==============================================================
create index RELATIONSHIP_83_FK on DM_FACTPERSONHISTORY (
   DATEOFBIRTHKEY       ASC
);

--==============================================================
-- Index: RELATIONSHIP_84_FK
--==============================================================
create index RELATIONSHIP_84_FK on DM_FACTPERSONHISTORY (
   REGISTRATIONDATEKEY  ASC
);

--==============================================================
-- Index: RELATIONSHIP_85_FK
--==============================================================
create index RELATIONSHIP_85_FK on DM_FACTPERSONHISTORY (
   STARTDATEKEY         ASC
);

--==============================================================
-- Index: RELATIONSHIP_126_F
--==============================================================
create index RELATIONSHIP_126_F on DM_FACTPERSONHISTORY (
   DIMETHNICITYKEY      ASC
);

--==============================================================
-- Index: RELATIONSHIP_133_F
--==============================================================
create index RELATIONSHIP_133_F on DM_FACTPERSONHISTORY (
   DIMADDRESSKEY        ASC
);

--==============================================================
-- Index: RELATIONSHIP_157_F
--==============================================================
create index RELATIONSHIP_157_F on DM_FACTPERSONHISTORY (
   DIMMERGESTATUSKEY    ASC
);

--==============================================================
-- Index: RELATIONSHIP_163_F
--==============================================================
create index RELATIONSHIP_163_F on DM_FACTPERSONHISTORY (
   DIMDUPSTATUSKEY      ASC
);

--==============================================================
-- Index: RELATIONSHIP_164_F
--==============================================================
create index RELATIONSHIP_164_F on DM_FACTPERSONHISTORY (
   DIMDUPREASONKEY      ASC
);

--==============================================================
-- Index: RELATIONSHIP_165_F
--==============================================================
create index RELATIONSHIP_165_F on DM_FACTPERSONHISTORY (
   DIMPERSONTYPEKEY     ASC
);

--==============================================================
-- Index: RELATIONSHIP_170_F
--==============================================================
create index RELATIONSHIP_170_F on DM_FACTPERSONHISTORY (
   DUPLICATEDATEKEY     ASC
);

--==============================================================
-- Index: RELATIONSHIP_186_F
--==============================================================
create index RELATIONSHIP_186_F on DM_FACTPERSONHISTORY (
   DIMINDIGENOUSGROUPKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_166_F
--==============================================================
create index RELATIONSHIP_166_F on DM_FACTPERSONHISTORY (
   DIMRACEKEY           ASC
);

--==============================================================
-- Index: RELATIONSHIP_190_F
--==============================================================
create index RELATIONSHIP_190_F on DM_FACTPERSONHISTORY (
   DIMNATIONALITYKEY    ASC
);

--==============================================================
-- Index: RELATIONSHIP_147_F
--==============================================================
create index RELATIONSHIP_147_F on DM_FACTPERSONHISTORY (
   DIMCONSTSTATKEY      ASC
);

--==============================================================
-- Table: DM_FACTPRODUCTAWARD
--==============================================================
create table DM_FACTPRODUCTAWARD
(
   DIMPROGRAMKEY        BIGINT                 not null,
   STARTDATEKEY         BIGINT                 not null,
   DIMNUMOFPARENTSKEY   BIGINT                 not null,
   DIMPRODUCTKEY        BIGINT                 not null,
   DIMASSISTANCESTATUSKEY BIGINT                 not null,
   ENDDATEKEY           BIGINT                 not null,
   CASEID               BIGINT                 not null,
   NUMOFCHILDREN        BIGINT,
   NUMOFADULTS          BIGINT,
   INTEGRATEDCASEID     BIGINT,
   FEDBENEFITIND        CHAR(1),
   CHILDSUPPORTAMOUNT   DECIMAL(31,2),
   CASHRESOURCESAMOUNT  DECIMAL(31,2),
   UNEARNEDINCOMEAMOUNT DECIMAL(31,2),
   EARNEDINCOMEAMOUNT   DECIMAL(31,2),
   SANCTIONIND          CHAR(1),
   "COUNT"              BIGINT                 default 1,
   PRIMARYMASIND        CHAR(1)
);

--==============================================================
-- Index: RELATIONSHIP_142_F
--==============================================================
create index RELATIONSHIP_142_F on DM_FACTPRODUCTAWARD (
   STARTDATEKEY         ASC
);

--==============================================================
-- Index: RELATIONSHIP_143_F
--==============================================================
create index RELATIONSHIP_143_F on DM_FACTPRODUCTAWARD (
   ENDDATEKEY           ASC
);

--==============================================================
-- Index: RELATIONSHIP_144_F
--==============================================================
create index RELATIONSHIP_144_F on DM_FACTPRODUCTAWARD (
   DIMASSISTANCESTATUSKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_148_F
--==============================================================
create index RELATIONSHIP_148_F on DM_FACTPRODUCTAWARD (
   DIMNUMOFPARENTSKEY   ASC
);

--==============================================================
-- Index: RELATIONSHIP_149_F
--==============================================================
create index RELATIONSHIP_149_F on DM_FACTPRODUCTAWARD (
   DIMPROGRAMKEY        ASC
);

--==============================================================
-- Index: RELATIONSHIP_150_F
--==============================================================
create index RELATIONSHIP_150_F on DM_FACTPRODUCTAWARD (
   DIMPRODUCTKEY        ASC
);

--==============================================================
-- Table: DM_FACTPRODUCTAWARDRECIPIENT
--==============================================================
create table DM_FACTPRODUCTAWARDRECIPIENT
(
   ENDDATEKEY           BIGINT                 not null,
   RELATIONSHIPTYPEKEY  BIGINT                 not null,
   AGEGROUPKEY          BIGINT                 not null,
   DIMCHILDSUPPORTENFORCETYPEKEY BIGINT                 not null,
   DIMMASKEY            BIGINT                 not null,
   PERSONHISTORYKEY     BIGINT                 not null,
   DIMEDUCATIONLEVELKEY BIGINT                 not null,
   DIMPRODUCTKEY        BIGINT                 not null,
   DIMPROGRAMKEY        BIGINT                 not null,
   DIMEMPLOYMENTSTATUSKEY BIGINT                 not null,
   DIMBOEKEY            BIGINT                 not null,
   DIMDUALKEY           BIGINT                 not null,
   STARTDATEKEY         BIGINT                 not null,
   DIMSUBSIDIZEDHOUSINGTYPEKEY BIGINT                 not null,
   CASEID               BIGINT                 not null,
   CONCERNROLEID        BIGINT                 not null,
   ADULTIND             CHAR(1),
   PARENTIND            CHAR(1),
   SANCTIONIND          CHAR(1),
   FEDBENEFITIND        CHAR(1),
   AGE                  BIGINT,
   INTEGRATEDCASEID     BIGINT,
   CHILDSUPPORTAMOUNT   DECIMAL(31,2),
   CASHRESOURCESAMOUNT  DECIMAL(31,2),
   UNEARNEDINCOMEAMOUNT DECIMAL(31,2),
   EARNEDINCOMEAMOUNT   DECIMAL(31,2),
   "COUNT"              BIGINT                 default 1,
   PRIMARYMASIND        CHAR(1)
);

--==============================================================
-- Index: RELATIONSHIP_151_F
--==============================================================
create index RELATIONSHIP_151_F on DM_FACTPRODUCTAWARDRECIPIENT (
   AGEGROUPKEY          ASC
);

--==============================================================
-- Index: RELATIONSHIP_152_F
--==============================================================
create index RELATIONSHIP_152_F on DM_FACTPRODUCTAWARDRECIPIENT (
   DIMMASKEY            ASC
);

--==============================================================
-- Index: RELATIONSHIP_155_F
--==============================================================
create index RELATIONSHIP_155_F on DM_FACTPRODUCTAWARDRECIPIENT (
   DIMBOEKEY            ASC
);

--==============================================================
-- Index: RELATIONSHIP_182_F
--==============================================================
create index RELATIONSHIP_182_F on DM_FACTPRODUCTAWARDRECIPIENT (
   DIMCHILDSUPPORTENFORCETYPEKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_184_F
--==============================================================
create index RELATIONSHIP_184_F on DM_FACTPRODUCTAWARDRECIPIENT (
   RELATIONSHIPTYPEKEY  ASC
);

--==============================================================
-- Index: RELATIONSHIP_185_F
--==============================================================
create index RELATIONSHIP_185_F on DM_FACTPRODUCTAWARDRECIPIENT (
   DIMDUALKEY           ASC
);

--==============================================================
-- Index: RELATIONSHIP_187_F
--==============================================================
create index RELATIONSHIP_187_F on DM_FACTPRODUCTAWARDRECIPIENT (
   DIMSUBSIDIZEDHOUSINGTYPEKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_206_F
--==============================================================
create index RELATIONSHIP_206_F on DM_FACTPRODUCTAWARDRECIPIENT (
   DIMEMPLOYMENTSTATUSKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_207_F
--==============================================================
create index RELATIONSHIP_207_F on DM_FACTPRODUCTAWARDRECIPIENT (
   DIMEDUCATIONLEVELKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_208_F
--==============================================================
create index RELATIONSHIP_208_F on DM_FACTPRODUCTAWARDRECIPIENT (
   ENDDATEKEY           ASC
);

--==============================================================
-- Index: RELATIONSHIP_209_F
--==============================================================
create index RELATIONSHIP_209_F on DM_FACTPRODUCTAWARDRECIPIENT (
   STARTDATEKEY         ASC
);

--==============================================================
-- Index: RELATIONSHIP_210_F
--==============================================================
create index RELATIONSHIP_210_F on DM_FACTPRODUCTAWARDRECIPIENT (
   DIMPROGRAMKEY        ASC
);

--==============================================================
-- Index: RELATIONSHIP_211_F
--==============================================================
create index RELATIONSHIP_211_F on DM_FACTPRODUCTAWARDRECIPIENT (
   DIMPRODUCTKEY        ASC
);

--==============================================================
-- Table: DM_FACTPRODUCTPROVIDERHISTORY
--==============================================================
create table DM_FACTPRODUCTPROVIDERHISTORY
(
   DIMPRODUCTKEY        BIGINT                 not null,
   DIMPARTICIPANTSTATUSKEY BIGINT                 not null,
   STARTDATEKEY         BIGINT                 not null,
   ENDDATEKEY           BIGINT                 not null,
   REGISTRATIONDATEKEY  BIGINT                 not null,
   DIMADDRESSKEY        BIGINT                 not null,
   DIMPROGRAMKEY        BIGINT                 not null,
   CONCERNROLEID        BIGINT                 not null,
   "COUNT"              BIGINT                 default 1
);

alter table DM_FACTPRODUCTPROVIDERHISTORY
   add constraint A_AK_PRODPROVHIST unique (DIMPRODUCTKEY, DIMPARTICIPANTSTATUSKEY, STARTDATEKEY, DIMADDRESSKEY, CONCERNROLEID);

--==============================================================
-- Index: RELATIONSHIP_100_F
--==============================================================
create index RELATIONSHIP_100_F on DM_FACTPRODUCTPROVIDERHISTORY (
   STARTDATEKEY         ASC
);

--==============================================================
-- Index: RELATIONSHIP_101_F
--==============================================================
create index RELATIONSHIP_101_F on DM_FACTPRODUCTPROVIDERHISTORY (
   REGISTRATIONDATEKEY  ASC
);

--==============================================================
-- Index: RELATIONSHIP_103_F
--==============================================================
create index RELATIONSHIP_103_F on DM_FACTPRODUCTPROVIDERHISTORY (
   DIMPRODUCTKEY        ASC
);

--==============================================================
-- Index: RELATIONSHIP_105_F
--==============================================================
create index RELATIONSHIP_105_F on DM_FACTPRODUCTPROVIDERHISTORY (
   DIMPARTICIPANTSTATUSKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_59_FK
--==============================================================
create index RELATIONSHIP_59_FK on DM_FACTPRODUCTPROVIDERHISTORY (
   ENDDATEKEY           ASC
);

--==============================================================
-- Index: RELATIONSHIP_58_FK
--==============================================================
create index RELATIONSHIP_58_FK on DM_FACTPRODUCTPROVIDERHISTORY (
   DIMADDRESSKEY        ASC
);

--==============================================================
-- Index: RELATIONSHIP_160_F
--==============================================================
create index RELATIONSHIP_160_F on DM_FACTPRODUCTPROVIDERHISTORY (
   DIMPROGRAMKEY        ASC
);

--==============================================================
-- Table: DM_FACTPROGRAMAPPLICATION
--==============================================================
create table DM_FACTPROGRAMAPPLICATION
(
   INTAKEPROGRAMAPPLICATIONID BIGINT                 not null,
   DIMDENIALREASONKEY   BIGINT,
   DIMINTAKETYPEKEY     BIGINT                 not null,
   DIMINTAKECATEGORYKEY BIGINT                 not null,
   DIMRESPONSEPRIORITYKEY BIGINT                 not null,
   DIMCONTACTTYPEKEY    BIGINT                 not null,
   DIMTIMELINESSKEY     BIGINT                 not null,
   DISPOSITIONKEY       BIGINT                 not null,
   INTAKESTARTDATEKEY   BIGINT                 not null,
   DIMCONTACTMETHODKEY  BIGINT                 not null,
   DIMRECOMMENDATIONKEY BIGINT                 not null,
   DISPOSEDDATEKEY      BIGINT                 not null,
   RESPONDSWITHINTIMEKEY BIGINT                 not null,
   CASEID               BIGINT,
   HOUROFDAY            BIGINT                
      constraint C_HOUROFDAY check (HOUROFDAY is null or (HOUROFDAY between -1 and 23)),
   INTAKEAPPLICATIONID  BIGINT,
   ENTEREDBYUSER        VARCHAR(256),
   NUMHOURSTODISPOSE    BIGINT,
   NUMALLEGATIONS       BIGINT,
   "COUNT"              BIGINT                 default 1,
   NUMHOURSTOREC        BIGINT
);

alter table DM_FACTPROGRAMAPPLICATION
   add constraint P_IDENTIFIER_1 primary key (INTAKEPROGRAMAPPLICATIONID);

--==============================================================
-- Index: RELATIONSHIP_161_F
--==============================================================
create index RELATIONSHIP_161_F on DM_FACTPROGRAMAPPLICATION (
   DISPOSITIONKEY       ASC
);

--==============================================================
-- Index: RELATIONSHIP_171_F
--==============================================================
create index RELATIONSHIP_171_F on DM_FACTPROGRAMAPPLICATION (
   INTAKESTARTDATEKEY   ASC
);

--==============================================================
-- Index: RELATIONSHIP_172_F
--==============================================================
create index RELATIONSHIP_172_F on DM_FACTPROGRAMAPPLICATION (
   DISPOSEDDATEKEY      ASC
);

--==============================================================
-- Index: RELATIONSHIP_175_F
--==============================================================
create index RELATIONSHIP_175_F on DM_FACTPROGRAMAPPLICATION (
   DIMRECOMMENDATIONKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_179_F
--==============================================================
create index RELATIONSHIP_179_F on DM_FACTPROGRAMAPPLICATION (
   DIMINTAKECATEGORYKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_180_F
--==============================================================
create index RELATIONSHIP_180_F on DM_FACTPROGRAMAPPLICATION (
   DIMRESPONSEPRIORITYKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_176_F
--==============================================================
create index RELATIONSHIP_176_F on DM_FACTPROGRAMAPPLICATION (
   RESPONDSWITHINTIMEKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_177_F
--==============================================================
create index RELATIONSHIP_177_F on DM_FACTPROGRAMAPPLICATION (
   DIMINTAKETYPEKEY     ASC
);

--==============================================================
-- Index: RELATIONSHIP_162_F
--==============================================================
create index RELATIONSHIP_162_F on DM_FACTPROGRAMAPPLICATION (
   DIMDENIALREASONKEY   ASC
);

--==============================================================
-- Index: RELATIONSHIP_173_F
--==============================================================
create index RELATIONSHIP_173_F on DM_FACTPROGRAMAPPLICATION (
   DIMTIMELINESSKEY     ASC
);

--==============================================================
-- Index: RELATIONSHIP_191_F
--==============================================================
create index RELATIONSHIP_191_F on DM_FACTPROGRAMAPPLICATION (
   DIMCONTACTMETHODKEY  ASC
);

--==============================================================
-- Index: RELATIONSHIP_192_F
--==============================================================
create index RELATIONSHIP_192_F on DM_FACTPROGRAMAPPLICATION (
   DIMCONTACTTYPEKEY    ASC
);

--==============================================================
-- Table: DM_FACTSERVICESUPPLIERHISTORY
--==============================================================
create table DM_FACTSERVICESUPPLIERHISTORY
(
   STARTDATEKEY         BIGINT                 not null,
   DIMADDRESSKEY        BIGINT                 not null,
   ENDDATEKEY           BIGINT                 not null,
   DIMSERVICEKEY        BIGINT                 not null,
   REGISTRATIONDATEKEY  BIGINT                 not null,
   DIMPARTICIPANTSTATUSKEY BIGINT                 not null,
   CONCERNROLEID        BIGINT                 not null,
   "COUNT"              BIGINT                 default 1
);

alter table DM_FACTSERVICESUPPLIERHISTORY
   add constraint A_AK_SERVICESUPPHI unique (STARTDATEKEY, DIMADDRESSKEY, DIMSERVICEKEY, DIMPARTICIPANTSTATUSKEY, CONCERNROLEID);

--==============================================================
-- Index: RELATIONSHIP_90_FK
--==============================================================
create index RELATIONSHIP_90_FK on DM_FACTSERVICESUPPLIERHISTORY (
   DIMADDRESSKEY        ASC
);

--==============================================================
-- Index: RELATIONSHIP_91_FK
--==============================================================
create index RELATIONSHIP_91_FK on DM_FACTSERVICESUPPLIERHISTORY (
   ENDDATEKEY           ASC
);

--==============================================================
-- Index: RELATIONSHIP_92_FK
--==============================================================
create index RELATIONSHIP_92_FK on DM_FACTSERVICESUPPLIERHISTORY (
   REGISTRATIONDATEKEY  ASC
);

--==============================================================
-- Index: RELATIONSHIP_93_FK
--==============================================================
create index RELATIONSHIP_93_FK on DM_FACTSERVICESUPPLIERHISTORY (
   STARTDATEKEY         ASC
);

--==============================================================
-- Index: RELATIONSHIP_94_FK
--==============================================================
create index RELATIONSHIP_94_FK on DM_FACTSERVICESUPPLIERHISTORY (
   DIMPARTICIPANTSTATUSKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_119_F
--==============================================================
create index RELATIONSHIP_119_F on DM_FACTSERVICESUPPLIERHISTORY (
   DIMSERVICEKEY        ASC
);

--==============================================================
-- Table: DM_FACTSUSPENSE
--==============================================================
create table DM_FACTSUSPENSE
(
   RECEIVEDDATEKEY      BIGINT                 not null,
   DIMPAYMETHODKEY      BIGINT                 not null,
   AMOUNT               DECIMAL(31,2),
   "COUNT"              BIGINT                 default 1
);

--==============================================================
-- Index: RELATIONSHIP_125_F
--==============================================================
create index RELATIONSHIP_125_F on DM_FACTSUSPENSE (
   RECEIVEDDATEKEY      ASC
);

--==============================================================
-- Index: RELATIONSHIP_127_F
--==============================================================
create index RELATIONSHIP_127_F on DM_FACTSUSPENSE (
   DIMPAYMETHODKEY      ASC
);

--==============================================================
-- Table: DM_FACTUTILITYHISTORY
--==============================================================
create table DM_FACTUTILITYHISTORY
(
   DIMUTILITYKEY        BIGINT                 not null,
   DIMPARTICIPANTSTATUSKEY BIGINT                 not null,
   REGISTRATIONDATEKEY  BIGINT                 not null,
   DIMADDRESSKEY        BIGINT                 not null,
   STARTDATEKEY         BIGINT                 not null,
   ENDDATEKEY           BIGINT                 not null,
   CONCERNROLEID        BIGINT                 not null,
   "COUNT"              BIGINT                 default 1
);

alter table DM_FACTUTILITYHISTORY
   add constraint A_AK_ID_1_DM_FACTU unique (DIMPARTICIPANTSTATUSKEY, DIMADDRESSKEY, STARTDATEKEY, CONCERNROLEID);

--==============================================================
-- Index: RELATIONSHIP_95_FK
--==============================================================
create index RELATIONSHIP_95_FK on DM_FACTUTILITYHISTORY (
   STARTDATEKEY         ASC
);

--==============================================================
-- Index: RELATIONSHIP_96_FK
--==============================================================
create index RELATIONSHIP_96_FK on DM_FACTUTILITYHISTORY (
   ENDDATEKEY           ASC
);

--==============================================================
-- Index: RELATIONSHIP_97_FK
--==============================================================
create index RELATIONSHIP_97_FK on DM_FACTUTILITYHISTORY (
   REGISTRATIONDATEKEY  ASC
);

--==============================================================
-- Index: RELATIONSHIP_98_FK
--==============================================================
create index RELATIONSHIP_98_FK on DM_FACTUTILITYHISTORY (
   DIMPARTICIPANTSTATUSKEY ASC
);

--==============================================================
-- Index: RELATIONSHIP_99_FK
--==============================================================
create index RELATIONSHIP_99_FK on DM_FACTUTILITYHISTORY (
   DIMADDRESSKEY        ASC
);

--==============================================================
-- Index: RELATIONSHIP_110_F
--==============================================================
create index RELATIONSHIP_110_F on DM_FACTUTILITYHISTORY (
   DIMUTILITYKEY        ASC
);

--==============================================================
-- View: DM_FACTCASEDIMENSIONVIEW
--==============================================================

create view DM_FACTCASEDIMENSIONVIEW as
select 
CASEID as caseid,
ORGUNITKEY as orgunitkey,
STARTDATEKEY as startdatekey,
CASEOWNERKEY as caseownerkey,
CASESUPERKEY as casesuperkey,
DIMPRODUCTKEY as dimproductkey,
DIMINTEGRATEDCASETYPEKEY as DIMINTEGRATEDCASETYPEKEY,
DIMCASETYPEKEY as DIMCASETYPEKEY,
STATUSKEY as currentstatuskey,
DIMADDRESSKEY as dimaddresskey,
ENDDATEKEY as enddatekey,
DIMPROGRAMKEY as dimprogramkey,
DESCRIPTION as description, 
CASEREFERENCENO as casereferenceno,
COUNT as count,
LASTWRITTEN as lastwritten
from DM_FACTCASEHISTORY 
where ENDDATEKEY=-1;

--==============================================================
-- View: DM_FACTCASEHISTORYACTIVEVIEW
--==============================================================

create view DM_FACTCASEHISTORYACTIVEVIEW as
select
t1.CASEID  as caseid,
nvl(t1.startdatekey,-1)  as activestartdatekey,
nvl(t1.enddatekey,-1)  as activeenddatekey
from
DM_FACTCASEHISTORY t1,
DM_DIMSTATUS t2
where
t2.STATUSNAME ='Active' and
t1.STATUSKEY = t2.statuskey;

--==============================================================
-- View: DM_FACTCASEPARTICIPANTVIEW
--==============================================================

create view DM_FACTCASEPARTICIPANTVIEW as
select
   t1.ACTIVESTARTDATEKEY,
   t1.DIMCASEPARTROLEID,
   t1.ISMASTERKEY,
   t1.PERSONHISTORYKEY,
   t1.RELATIONSHIPTYPEKEY,
   t1.MASTERPERSONHISTORYKEY,
   t1.ACTIVEENDDATEKEY,
   t1.CASEID,
   t1.PRIMCLIENTCASEPARTROLEID,
   t1.COUNT,
   t2.ORGUNITKEY,
   t2.startdatekey as currentstatusdatekey,
   t2.CASEOWNERKEY,
   t2.CASESUPERKEY,
   t2.DIMPRODUCTKEY,
   t2.CURRENTSTATUSKEY,
   t2.DIMINTEGRATEDCASETYPEKEY,
   t2.DIMCASETYPEKEY,
   t2.DIMADDRESSKEY,
   t2.DIMPROGRAMKEY,
   t2.DESCRIPTION,
   t2.CASEREFERENCENO
from
   DM_FACTCASEPARTICIPANT t1,
   DM_FACTCASEDIMENSIONVIEW t2
where
   t1.CASEID = t2.caseid;

--==============================================================
-- View: DM_FACTINTAKEVIEW
--==============================================================

create view DM_FACTINTAKEVIEW as
select
   t1.INTAKEPROGRAMAPPLICATIONID,
   t1.DIMDENIALREASONKEY,
   t1.DIMINTAKETYPEKEY,
   t1.DIMINTAKECATEGORYKEY,
   t1.DIMRESPONSEPRIORITYKEY,
   t1.DISPOSITIONKEY,
   t1.INTAKESTARTDATEKEY,
   t1.DIMRECOMMENDATIONKEY,
   t1.DISPOSEDDATEKEY,
   t1.RESPONDSWITHINTIMEKEY,
   t1.DIMTIMELINESSKEY,
   t1.HOUROFDAY,
   t1.CASEID,
   t1.INTAKEAPPLICATIONID,
   t1.ENTEREDBYUSER,
   t1.NUMHOURSTODISPOSE,
   t1.NUMHOURSTOREC,
   t1.NUMALLEGATIONS,
   t1.COUNT,
   t2.ORGUNITKEY,
   t2.startdatekey as currentstatusdatekey,
   t2.CASEOWNERKEY,
   t2.CASESUPERKEY,
   t2.DIMPRODUCTKEY,
   t2.CURRENTSTATUSKEY,
   t2.DIMINTEGRATEDCASETYPEKEY,
   t2.DIMCASETYPEKEY,
   t2.DIMADDRESSKEY,
   t2.DIMPROGRAMKEY,
   t2.DESCRIPTION,
   t2.CASEREFERENCENO,
   (dm_getsecondsbetween(dm_getDateTime(), timestamp_iso(t3.daydate) + t1.hourofday HOURS )/60/60) - integer(t4.CODE)  as HOURSMINUSDEADLINE
from
   DM_FACTPROGRAMAPPLICATION t1,
   DM_FACTCASEDIMENSIONVIEW t2,
   DM_DIMTIMEPERIOD t3,
   DM_DIMRESPONDSWITHINTIME t4
where
   t1.CASEID = t2.CASEID
   and t1.INTAKESTARTDATEKEY = t3.TIMEPERIODKEY
   and t1.RESPONDSWITHINTIMEKEY = t4.RESPONDSWITHINTIMEKEY;

--==============================================================
-- View: DM_VM_NOEDUCATION
--==============================================================

create view DM_VM_NOEDUCATION as
select -1 as DIMEDUCATIONKEY, 'UNDEFINED' as QUALIFICATION from SYSIBM.SYSDUMMY1
UNION ALL  
select
   DIMEDUCATIONKEY,
   QUALIFICATION
from
   DM_DIMEDUCATION;

--==============================================================
-- View: DM_VM_PRODUCT
--==============================================================

create view DM_VM_PRODUCT (DIMPRODUCTKEY, PRODUCTID, "NAME", PRODUCTTYPE) as
select DIMPRODUCTKEY, DWPRODUCTID, NAME, PRODUCTTYPE from DM_DIMPRODUCT;

--==============================================================
-- View: DM_VW_PERSONHISTORY
--==============================================================

create view DM_VW_PERSONHISTORY (PERSONHISTORYKEY, STARTDATEKEY, ENDDATEKEY, DIMMARITALSTATUSKEY, DIMCOUNTRYKEY, DIMPARTICIPANTSTATUSKEY, DIMPREFERREDLANGUAGEKEY, REGISTRATIONDATEKEY, DIMADDRESSKEY, DIMGENDERKEY, DIMETHNICITYKEY, DIMMERGESTATUSKEY, DIMDUPREASONKEY, DIMDUPSTATUSKEY, DIMPERSONTYPEKEY, DUPLICATEDATEKEY, SSN, FIRSTNAME, LASTNAME, DIMINDIGENOUSGROUPKEY, DIMRACEKEY, DIMCONSTSTATKEY, DIMNATIONALITYKEY, CONCERNROLEID, MASTERCONCERNROLEID, AGEGROUPS, AGEID) as
select
   PERSON.PERSONHISTORYKEY as PERSONHISTORYKEY,
   PERSON.STARTDATEKEY as STARTDATEKEY,
   PERSON.ENDDATEKEY as ENDDATEKEY,
   PERSON.DIMMARITALSTATUSKEY as DIMMARITALSTATUSKEY,
   PERSON.DIMCOUNTRYKEY as DIMCOUNTRYKEY,
   PERSON.DIMPARTICIPANTSTATUSKEY as DIMPARTICIPANTSTATUSKEY,
   PERSON.DIMPREFERREDLANGUAGEKEY as DIMPREFERREDLANGUAGEKEY,
   PERSON.REGISTRATIONDATEKEY as REGISTRATIONDATEKEY,
   PERSON.DIMADDRESSKEY as DIMADDRESSKEY,
   PERSON.DIMGENDERKEY as DIMGENDERKEY,
   PERSON.DIMETHNICITYKEY as DIMETHNICITYKEY,
   PERSON.DIMMERGESTATUSKEY as DIMMERGESTATUSKEY,
   PERSON.DIMDUPREASONKEY as DIMDUPREASONKEY,
   PERSON.DIMDUPSTATUSKEY as DIMDUPSTATUSKEY,
   PERSON.DIMPERSONTYPEKEY as DIMPERSONTYPEKEY,
   PERSON.DUPLICATEDATEKEY as DUPLICATEDATEKEY,
   PERSON.SSN as SSN,
   PERSON.FIRSTNAME as FIRSTNAME,
   PERSON.LASTNAME as LASTNAME,
   PERSON.DIMINDIGENOUSGROUPKEY as DIMINDIGENOUSGROUPKEY,
   PERSON.DIMRACEKEY as DIMRACEKEY,
   PERSON.DIMCONSTSTATKEY as DIMCONSTSTATKEY, 
   PERSON.DIMNATIONALITYKEY as DIMNATIONALITYKEY,
   PERSON.CONCERNROLEID as CONCERNROLEID,
   PERSON.MASTERCONCERNROLEID as MASTERCONCERNROLEID,
   dm_calculateage(TIMEPERIOD.DAYDATE, dm_getDate() ) as AGEGROUPS,
   dm_findagegroupkey('Core', dm_calculateage(timeperiod.daydate, dm_getDate()), 'Core') as AGEID
from
   DM_FACTPERSONHISTORY PERSON,
   DM_DIMTIMEPERIOD TIMEPERIOD
where
   PERSON.DATEOFBIRTHKEY=TIMEPERIOD.TIMEPERIODKEY;

--==============================================================
-- View: DM_VW_PERSON_CASE
--==============================================================

create view DM_VW_PERSON_CASE (CONCERNROLEID, MASTERCONCERNROLEID, TIMEPERIODKEY, PRODUCTKEY, GENDERKEY, CASEID, AGEGROUP, ROLETYPE, STATUSKEY) as
select
   PERSON.CONCERNROLEID as CONCERNROLEID,
   PERSON.MASTERCONCERNROLEID as MASTERCONCERNROLEID,
   DMTIME.TIMEPERIODKEY as TIMEPERIODKEY,
   CASE.DIMPRODUCTKEY as PRODUCTKEY,
   PERSON.DIMGENDERKEY as GENDERKEY,
   CASE.CASEID as CASEID,
   (SELECT (SELECT GROUPNAME FROM DM_AGEGROUPS WHERE (
year(current date) 
     - year(CASEDATE.DAYDATE) 
     - case when month(CASEDATE.DAYDATE) > month(current date) then 1
            when month(CASEDATE.DAYDATE) < month(current date) then 0
            when day(CASEDATE.DAYDATE) > day(current date) then 1 
         else 0 end) 

BETWEEN STARTAGE AND ENDAGE AND PROGRAMCODE='Core') 
FROM DM_DIMTIMEPERIOD CASEDATE WHERE PERSON.DATEOFBIRTHKEY=CASEDATE.TIMEPERIODKEY) as AGEGROUPS,

   ROLE.ROLETYPE as ROLETYPE,
   STATUS.STATUSKEY as STATUSKEY
from
   DM_FACTPERSONHISTORY PERSON,
   DM_FACTCASEPARTICIPANT CASE,
   DM_DIMGENDER GENDER,
   DM_DIMPRODUCT PRODUCT,
   DM_DIMTIMEPERIOD DMTIME,
   DM_DIMSTATUS STATUS,
   DM_DIMCASEPARTICIPANTROLE ROLE
where
   PERSON.DIMGENDERKEY = GENDER.DIMGENDERKEY
   AND PRODUCT.DIMPRODUCTKEY = CASE.DIMPRODUCTKEY
   AND CASE.ACTIVESTARTDATEKEY = DMTIME.TIMEPERIODKEY
   AND CASE.DIMCASEPARTROLEID = ROLE.DIMCASEPARTROLEID
   AND PERSON.PERSONHISTORYKEY = CASE.PERSONHISTORYKEY;

--==============================================================
-- View: DM_VW_PERSON_EDUCATION
--==============================================================

create view DM_VW_PERSON_EDUCATION as
select 
    T1.REGISTRATIONDATEKEY  as TIMEPERIODKEY, 
    COALESCE(T2.DIMEDUCATIONKEY, -1) as DIMEDUCATIONKEY, 
    T3.GROUPNAME  as AGEGROUPS, 
    count (T1.CONCERNROLEID)  as CONCERNROLECOUNT,
    count (T1.MASTERCONCERNROLEID)  as MASTERCONCERNROLECOUNT
from  DM_VW_PERSONHISTORY t1 
        LEFT OUTER JOIN DM_FACTEDUCATIONHISTORY T2  ON T1.CONCERNROLEID=T2.CONCERNROLEID
        INNER JOIN DM_AGEGROUPS T3 ON T1.AGEID=T3.ID   
WHERE  t1.enddatekey = -1
group by   t1.REGISTRATIONDATEKEY,
   t2.DIMEDUCATIONKEY,
   T3.GROUPNAME;

alter table DM_AGGCASEDAY
   add constraint F_RELATIONSHIP_77 foreign key (DIMPRODUCTKEY)
      references DM_DIMPRODUCT (DIMPRODUCTKEY)
      on delete restrict on update restrict;

alter table DM_AGGCASEDAY
   add constraint F_RELATIONSHIP_78 foreign key (ORGUNITKEY)
      references DM_DIMORGUNIT (ORGUNITKEY)
      on delete restrict on update restrict;

alter table DM_AGGCASEDAY
   add constraint F_RELATIONSHIP_79 foreign key (TIMEPERIODKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_AGGCASEMONTH
   add constraint F_RELATIONSHIP_129 foreign key (TIMEPERIODKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_AGGCASEMONTH
   add constraint F_RELATIONSHIP_80 foreign key (DIMPRODUCTKEY)
      references DM_DIMPRODUCT (DIMPRODUCTKEY)
      on delete restrict on update restrict;

alter table DM_AGGCASEMONTH
   add constraint F_RELATIONSHIP_81 foreign key (ORGUNITKEY)
      references DM_DIMORGUNIT (ORGUNITKEY)
      on delete restrict on update restrict;

alter table DM_AGGFUNDS
   add constraint F_RELATIONSHIP_107 foreign key (EFFECTIVEDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_AGGFUNDS
   add constraint F_RELATIONSHIP_123 foreign key (DIMFUNDID)
      references DM_DIMFUND (DIMFUNDID)
      on delete restrict on update restrict;

alter table DM_AGGFUNDS
   add constraint F_RELATIONSHIP_124 foreign key (DIMPRODUCTKEY)
      references DM_DIMPRODUCT (DIMPRODUCTKEY)
      on delete restrict on update restrict;

alter table DM_AGGPAYMENTS
   add constraint F_RELATIONSHIP_114 foreign key (EFFECTIVEDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_AGGPAYMENTS
   add constraint F_RELATIONSHIP_115 foreign key (ORGUNITKEY)
      references DM_DIMORGUNIT (ORGUNITKEY)
      on delete restrict on update restrict;

alter table DM_AGGPAYMENTS
   add constraint F_RELATIONSHIP_117 foreign key (DIMPRODUCTKEY)
      references DM_DIMPRODUCT (DIMPRODUCTKEY)
      on delete restrict on update restrict;

alter table DM_AGGPAYMENTS
   add constraint F_RELATIONSHIP_118 foreign key (DIMFINSTATUSKEY)
      references DM_DIMFINANCIALSTATUS (DIMFINSTATUSKEY)
      on delete restrict on update restrict;

alter table DM_AGGPAYMENTS
   add constraint F_RELATIONSHIP_120 foreign key (DIMDELIVERYMETHODKEY)
      references DM_DIMDELIVERYMETHOD (DIMDELIVERYMETHODKEY)
      on delete restrict on update restrict;

alter table DM_AGGPAYMENTS
   add constraint F_RELATIONSHIP_121 foreign key (DIMDEDUCTIONKEY)
      references DM_DIMDEDUCTION (DIMDEDUCTIONKEY)
      on delete restrict on update restrict;

alter table DM_AGGPAYMENTS
   add constraint F_RELATIONSHIP_122 foreign key (DIMTRANSACTIONKEY)
      references DM_DIMTRANSACTIONTYPE (DIMTRANSACTIONKEY)
      on delete restrict on update restrict;

alter table DM_FACTALLEGATION
   add constraint F_RELATIONSHIP_16 foreign key (DIMALGFINDINGKEY)
      references DM_DIMALGFINDING (DIMALGFINDINGKEY)
      on delete restrict on update restrict;

alter table DM_FACTALLEGATION
   add constraint F_RELATIONSHIP_189 foreign key (DIMALGSEVERITYKEY)
      references DM_DIMALGSEVERITY (DIMALGSEVERITYKEY)
      on delete restrict on update restrict;

alter table DM_FACTALLEGATION
   add constraint F_RELATIONSHIP_193 foreign key (ALLEGATIONDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTALLEGATION
   add constraint F_RELATIONSHIP_197 foreign key (AGEGROUPKEY)
      references DM_AGEGROUPS (ID)
      on delete restrict on update restrict;

alter table DM_FACTALLEGATION
   add constraint F_RELATIONSHIP_198 foreign key (DIMRECORDSTATUSKEY)
      references DM_DIMRECORDSTATUS (DIMRECORDSTATUSKEY)
      on delete restrict on update restrict;

alter table DM_FACTALLEGATION
   add constraint F_RELATIONSHIP_199 foreign key (DIMALGMETHODKEY)
      references DM_DIMALGMETHOD (DIMALGMETHODKEY)
      on delete restrict on update restrict;

alter table DM_FACTALLEGATION
   add constraint F_RELATIONSHIP_202 foreign key (DIMRECURRENCEKEY)
      references DM_DIMRECURRENCE (DIMRECURRENCEKEY)
      on delete restrict on update restrict;

alter table DM_FACTALLEGATION
   add constraint F_RELATIONSHIP_29 foreign key (DIMALGTYPEKEY)
      references DM_DIMALGTYPE (DIMALGTYPEKEY)
      on delete restrict on update restrict;

alter table DM_FACTALLEGATION
   add constraint F_RELATIONSHIP_30 foreign key (DIMALGLOCATIONKEY)
      references DM_DIMALGLOCATION (DIMALGLOCATIONKEY)
      on delete restrict on update restrict;

alter table DM_FACTCASEEVENT
   add constraint F_RELATIONSHIP_178 foreign key (DIMCASEREVIEWOUTCOMEKEY)
      references DM_DIMCASEREVIEWOUTCOMES (DIMCASEREVIEWOUTCOMEKEY)
      on delete restrict on update restrict;

alter table DM_FACTCASEEVENT
   add constraint F_RELATIONSHIP_181 foreign key (DIMINTEGRATEDCASETYPEKEY)
      references DM_DIMINTEGRATEDCASETYPES (DIMINTEGRATEDCASETYPEKEY)
      on delete restrict on update restrict;

alter table DM_FACTCASEEVENT
   add constraint F_RELATIONSHIP_76 foreign key (EVENTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTCASEHISTORY
   add constraint F_OWNEDBYORG foreign key (ORGUNITKEY)
      references DM_DIMORGUNIT (ORGUNITKEY)
      on delete restrict on update restrict;

alter table DM_FACTCASEHISTORY
   add constraint F_POINTINTTIME foreign key (STARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTCASEHISTORY
   add constraint F_PRODUCT foreign key (DIMPRODUCTKEY)
      references DM_DIMPRODUCT (DIMPRODUCTKEY)
      on delete restrict on update restrict;

alter table DM_FACTCASEHISTORY
   add constraint F_RELATESTO foreign key (STATUSKEY)
      references DM_DIMSTATUS (STATUSKEY)
      on delete restrict on update restrict;

alter table DM_FACTCASEHISTORY
   add constraint F_RELATESTO25 foreign key (ENDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTCASEHISTORY
   add constraint F_RELATIONSHIP_131 foreign key (CASEOWNERKEY)
      references DM_DIMCASEOWNER (CASEOWNERKEY)
      on delete restrict on update restrict;

alter table DM_FACTCASEHISTORY
   add constraint F_RELATIONSHIP_154 foreign key (DIMADDRESSKEY)
      references DM_DIMADDRESS (DIMADDRESSKEY)
      on delete restrict on update restrict;

alter table DM_FACTCASEHISTORY
   add constraint F_RELATIONSHIP_156 foreign key (DIMPROGRAMKEY)
      references DM_DIMPROGRAM (DIMPROGRAMKEY)
      on delete restrict on update restrict;

alter table DM_FACTCASEHISTORY
   add constraint F_RELATIONSHIP_174 foreign key (DIMCASETYPEKEY)
      references DM_DIMCASETYPES (DIMCASETYPEKEY)
      on delete restrict on update restrict;

alter table DM_FACTCASEHISTORY
   add constraint F_RELATIONSHIP_188 foreign key (DIMINTEGRATEDCASETYPEKEY)
      references DM_DIMINTEGRATEDCASETYPES (DIMINTEGRATEDCASETYPEKEY)
      on delete restrict on update restrict;

alter table DM_FACTCASEHISTORY
   add constraint F_RELATIONSHIP_DIM foreign key (CASESUPERKEY)
      references DM_DIMCASESUPER (CASESUPERKEY)
      on delete restrict on update restrict;

alter table DM_FACTCASEPARTICIPANT
   add constraint F_REFERENCE_161 foreign key (MASTERPERSONHISTORYKEY)
      references DM_FACTPERSONHISTORY (PERSONHISTORYKEY)
      on delete restrict on update restrict;

alter table DM_FACTCASEPARTICIPANT
   add constraint F_RELATIONSHIP_128 foreign key (DIMCASEPARTROLEID)
      references DM_DIMCASEPARTICIPANTROLE (DIMCASEPARTROLEID)
      on delete restrict on update restrict;

alter table DM_FACTCASEPARTICIPANT
   add constraint F_RELATIONSHIP_153 foreign key (RELATIONSHIPTYPEKEY)
      references DM_DIMCONCERNRELATIONSHIPTYPE (RELATIONSHIPTYPEKEY)
      on delete restrict on update restrict;

alter table DM_FACTCASEPARTICIPANT
   add constraint F_RELATIONSHIP_158 foreign key (ISMASTERKEY)
      references DM_DIMYESNOINDICATOR (DIMYESNOINDICATORKEY)
      on delete restrict on update restrict;

alter table DM_FACTCASEPARTICIPANT
   add constraint F_RELATIONSHIP_167 foreign key (PERSONHISTORYKEY)
      references DM_FACTPERSONHISTORY (PERSONHISTORYKEY)
      on delete restrict on update restrict;

alter table DM_FACTCASEPARTICIPANT
   add constraint F_RELATIONSHIP_169 foreign key (ACTIVEENDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTCASEPARTICIPANT
   add constraint F_RELATIONSHIP_66 foreign key (DIMPRODUCTKEY)
      references DM_DIMPRODUCT (DIMPRODUCTKEY)
      on delete restrict on update restrict;

alter table DM_FACTCASEPARTICIPANT
   add constraint F_RELATIONSHIP_68 foreign key (ACTIVESTARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTCONTACT
   add constraint F_RELATIONSHIP_11 foreign key (DIMCONTACTLOCATIONKEY)
      references DM_DIMCONTACTLOCATION (DIMCONTACTLOCATIONKEY)
      on delete restrict on update restrict;

alter table DM_FACTCONTACT
   add constraint F_RELATIONSHIP_12 foreign key (DIMCONTACTTYPEKEY)
      references DM_DIMCONTACTTYPE (DIMCONTACTTYPEKEY)
      on delete restrict on update restrict;

alter table DM_FACTCONTACT
   add constraint F_RELATIONSHIP_13 foreign key (DIMCONTACTMETHODKEY)
      references DM_DIMCONTACTMETHOD (DIMCONTACTMETHODKEY)
      on delete restrict on update restrict;

alter table DM_FACTCONTACT
   add constraint F_RELATIONSHIP_145 foreign key (DIMREPORTINGTIMELINESSKEY)
      references DM_DIMREPORTINGTIMELINESS (DIMREPORTINGTIMELINESSKEY)
      on delete restrict on update restrict;

alter table DM_FACTCONTACT
   add constraint F_RELATIONSHIP_146 foreign key (DIMREPORTEDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTCONTACT
   add constraint F_RELATIONSHIP_194 foreign key (DIMAGEGROUPKEY)
      references DM_AGEGROUPS (ID)
      on delete restrict on update restrict;

alter table DM_FACTCONTACT
   add constraint F_RELATIONSHIP_195 foreign key (DIMCONTACTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTCONTACT
   add constraint F_RELATIONSHIP_196 foreign key (DIMCOMPLIANCETYPEKEY)
      references DM_DIMCOMPLIANCETYPE (DIMCOMPLIANCETYPEKEY)
      on delete restrict on update restrict;

alter table DM_FACTCONTACT
   add constraint F_RELATIONSHIP_20 foreign key (DIMFREQUENCYCRITERIAKEY)
      references DM_DIMFREQUENCYCRITERIA (DIMFREQUENCYCRITERIAKEY)
      on delete restrict on update restrict;

alter table DM_FACTCONTACT
   add constraint F_RELATIONSHIP_200 foreign key (DIMTARGETDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTCONTACT
   add constraint F_RELATIONSHIP_203 foreign key (DIMCOMPLIANCESTATUSKEY)
      references DM_DIMCOMPLIANCESTATUS (DIMCOMPLIANCESTATUSKEY)
      on delete restrict on update restrict;

alter table DM_FACTCONTACT
   add constraint F_RELATIONSHIP_204 foreign key (DIMRESPONSEPRIORITYKEY)
      references DM_DIMRESPONSEPRIORITY (DIMRESPONSEPRIORITYKEY)
      on delete restrict on update restrict;

alter table DM_FACTCONTACT
   add constraint F_RELATIONSHIP_205 foreign key (DIMRECORDSTATUSKEY)
      references DM_DIMRECORDSTATUS (DIMRECORDSTATUSKEY)
      on delete restrict on update restrict;

alter table DM_FACTEDUCATIONHISTORY
   add constraint F_RELATIONSHIP_102 foreign key (DIMEDUCATIONKEY)
      references DM_DIMEDUCATION (DIMEDUCATIONKEY)
      on delete restrict on update restrict;

alter table DM_FACTEDUCATIONHISTORY
   add constraint F_RELATIONSHIP_104 foreign key (DIMPARTICIPANTSTATUSKEY)
      references DM_DIMPARTICIPANTSTATUS (DIMPARTICIPANTSTATUSKEY)
      on delete restrict on update restrict;

alter table DM_FACTEDUCATIONHISTORY
   add constraint F_RELATIONSHIP_61 foreign key (STARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTEDUCATIONHISTORY
   add constraint F_RELATIONSHIP_62 foreign key (DATEOFBIRTHKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTEDUCATIONHISTORY
   add constraint F_RELATIONSHIP_63 foreign key (ENDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTEDUCATIONHISTORY
   add constraint F_RELATIONSHIP_64 foreign key (REGDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTEMPLOYERHISTORY
   add constraint F_RELATIONSHIP_42 foreign key (DIMADDRESSKEY)
      references DM_DIMADDRESS (DIMADDRESSKEY)
      on delete restrict on update restrict;

alter table DM_FACTEMPLOYERHISTORY
   add constraint F_RELATIONSHIP_43 foreign key (DIMINDUSTRYTYPEKEY)
      references DM_DIMINDUSTRYTYPE (DIMINDUSTRYTYPEKEY)
      on delete restrict on update restrict;

alter table DM_FACTEMPLOYERHISTORY
   add constraint F_RELATIONSHIP_86 foreign key (DIMPARTICIPANTSTATUSKEY)
      references DM_DIMPARTICIPANTSTATUS (DIMPARTICIPANTSTATUSKEY)
      on delete restrict on update restrict;

alter table DM_FACTEMPLOYERHISTORY
   add constraint F_RELATIONSHIP_87 foreign key (REGISTRATIONDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTEMPLOYERHISTORY
   add constraint F_RELATIONSHIP_88 foreign key (ENDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTEMPLOYERHISTORY
   add constraint F_RELATIONSHIP_89 foreign key (STARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTINVESTIGATION
   add constraint F_RELATIONSHIP_15 foreign key (DIMINVSUBTYPEKEY)
      references DM_DIMINVSUBTYPE (DIMINVSUBTYPEKEY)
      on delete restrict on update restrict;

alter table DM_FACTINVESTIGATION
   add constraint F_RELATIONSHIP_201 foreign key (DIMRESOLUTIONSTATUSKEY)
      references DM_DIMRESOLUTIONSTATUS (DIMRESOLUTIONSTATUSKEY)
      on delete restrict on update restrict;

alter table DM_FACTINVESTIGATION
   add constraint F_RELATIONSHIP_21 foreign key (DIMINVRECOMMENDATIONKEY)
      references DM_DIMINVRECOMMENDATION (DIMINVRECOMMENDATIONKEY)
      on delete restrict on update restrict;

alter table DM_FACTINVESTIGATION
   add constraint F_RELATIONSHIP_22 foreign key (DIMOUTCOMEKEY)
      references DM_DIMOUTCOME (DIMOUTCOMEKEY)
      on delete restrict on update restrict;

alter table DM_FACTINVESTIGATION
   add constraint F_RELATIONSHIP_25 foreign key (DIMSTARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTINVESTIGATION
   add constraint F_RELATIONSHIP_26 foreign key (DIMRECOMMENDATIONDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTINVESTIGATION
   add constraint F_RELATIONSHIP_27 foreign key (DIMMEETMILESTONEDURINDKEY)
      references DM_DIMYESNOINDICATOR (DIMYESNOINDICATORKEY)
      on delete restrict on update restrict;

alter table DM_FACTINVESTIGATION
   add constraint F_RELATIONSHIP_28 foreign key (DIMMILESTONEDURATIONKEY)
      references DM_DIMMILESTONEDURATION (DIMMILESTONEDURATIONKEY)
      on delete restrict on update restrict;

alter table DM_FACTPAYMENTS
   add constraint F_RELATIONSHIP_106 foreign key (EFFECTIVEDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTPAYMENTS
   add constraint F_RELATIONSHIP_108 foreign key (ORGUNITKEY)
      references DM_DIMORGUNIT (ORGUNITKEY)
      on delete restrict on update restrict;

alter table DM_FACTPAYMENTS
   add constraint F_RELATIONSHIP_109 foreign key (DIMFINSTATUSKEY)
      references DM_DIMFINANCIALSTATUS (DIMFINSTATUSKEY)
      on delete restrict on update restrict;

alter table DM_FACTPAYMENTS
   add constraint F_RELATIONSHIP_111 foreign key (DIMDELIVERYMETHODKEY)
      references DM_DIMDELIVERYMETHOD (DIMDELIVERYMETHODKEY)
      on delete restrict on update restrict;

alter table DM_FACTPAYMENTS
   add constraint F_RELATIONSHIP_112 foreign key (DIMDEDUCTIONKEY)
      references DM_DIMDEDUCTION (DIMDEDUCTIONKEY)
      on delete restrict on update restrict;

alter table DM_FACTPAYMENTS
   add constraint F_RELATIONSHIP_113 foreign key (DIMPRODUCTKEY)
      references DM_DIMPRODUCT (DIMPRODUCTKEY)
      on delete restrict on update restrict;

alter table DM_FACTPAYMENTS
   add constraint F_RELATIONSHIP_116 foreign key (DIMTRANSACTIONKEY)
      references DM_DIMTRANSACTIONTYPE (DIMTRANSACTIONKEY)
      on delete restrict on update restrict;

alter table DM_FACTPAYMENTS
   add constraint F_RELATIONSHIP_159 foreign key (DIMPROGRAMKEY)
      references DM_DIMPROGRAM (DIMPROGRAMKEY)
      on delete restrict on update restrict;

alter table DM_FACTPERSONHISTORY
   add constraint F_RELATIONSHIP_126 foreign key (DIMETHNICITYKEY)
      references DM_DIMETHNICITY (DIMETHNICITYKEY)
      on delete restrict on update restrict;

alter table DM_FACTPERSONHISTORY
   add constraint F_RELATIONSHIP_133 foreign key (DIMADDRESSKEY)
      references DM_DIMADDRESS (DIMADDRESSKEY)
      on delete restrict on update restrict;

alter table DM_FACTPERSONHISTORY
   add constraint F_RELATIONSHIP_147 foreign key (DIMCONSTSTATKEY)
      references DM_DIMCONSTSTATUS (DIMCONSTSTATKEY)
      on delete restrict on update restrict;

alter table DM_FACTPERSONHISTORY
   add constraint F_RELATIONSHIP_157 foreign key (DIMMERGESTATUSKEY)
      references DM_DIMMERGESTATUS (DIMMERGESTATUSKEY)
      on delete restrict on update restrict;

alter table DM_FACTPERSONHISTORY
   add constraint F_RELATIONSHIP_163 foreign key (DIMDUPSTATUSKEY)
      references DM_DIMDUPLICATESTATUS (DIMDUPSTATUSKEY)
      on delete restrict on update restrict;

alter table DM_FACTPERSONHISTORY
   add constraint F_RELATIONSHIP_164 foreign key (DIMDUPREASONKEY)
      references DM_DIMDUPLICATEREASON (DIMDUPREASONKEY)
      on delete restrict on update restrict;

alter table DM_FACTPERSONHISTORY
   add constraint F_RELATIONSHIP_165 foreign key (DIMPERSONTYPEKEY)
      references DM_DIMPERSONTYPE (DIMPERSONTYPEKEY)
      on delete restrict on update restrict;

alter table DM_FACTPERSONHISTORY
   add constraint F_RELATIONSHIP_166 foreign key (DIMRACEKEY)
      references DM_DIMRACE (DIMRACEKEY)
      on delete restrict on update restrict;

alter table DM_FACTPERSONHISTORY
   add constraint F_RELATIONSHIP_170 foreign key (DUPLICATEDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTPERSONHISTORY
   add constraint F_RELATIONSHIP_186 foreign key (DIMINDIGENOUSGROUPKEY)
      references DM_DIMINDIGENOUSGROUPS (DIMINDIGENOUSGROUPKEY)
      on delete restrict on update restrict;

alter table DM_FACTPERSONHISTORY
   add constraint F_RELATIONSHIP_190 foreign key (DIMNATIONALITYKEY)
      references DM_DIMNATIONALITY (DIMNATIONALITYKEY)
      on delete restrict on update restrict;

alter table DM_FACTPERSONHISTORY
   add constraint F_RELATIONSHIP_32 foreign key (DIMGENDERKEY)
      references DM_DIMGENDER (DIMGENDERKEY)
      on delete restrict on update restrict;

alter table DM_FACTPERSONHISTORY
   add constraint F_RELATIONSHIP_33 foreign key (DIMCOUNTRYKEY)
      references DM_DIMCOUNTRY (DIMCOUNTRYKEY)
      on delete restrict on update restrict;

alter table DM_FACTPERSONHISTORY
   add constraint F_RELATIONSHIP_34 foreign key (DIMPREFERREDLANGUAGEKEY)
      references DM_DIMPREFERREDLANGUAGE (DIMPREFERREDLANGUAGEKEY)
      on delete restrict on update restrict;

alter table DM_FACTPERSONHISTORY
   add constraint F_RELATIONSHIP_36 foreign key (DIMMARITALSTATUSKEY)
      references DM_DIMMARITALSTATUS (DIMMARITALSTATUSKEY)
      on delete restrict on update restrict;

alter table DM_FACTPERSONHISTORY
   add constraint F_RELATIONSHIP_37 foreign key (DIMPARTICIPANTSTATUSKEY)
      references DM_DIMPARTICIPANTSTATUS (DIMPARTICIPANTSTATUSKEY)
      on delete restrict on update restrict;

alter table DM_FACTPERSONHISTORY
   add constraint F_RELATIONSHIP_82 foreign key (ENDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTPERSONHISTORY
   add constraint F_RELATIONSHIP_83 foreign key (DATEOFBIRTHKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTPERSONHISTORY
   add constraint F_RELATIONSHIP_84 foreign key (REGISTRATIONDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTPERSONHISTORY
   add constraint F_RELATIONSHIP_85 foreign key (STARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTAWARD
   add constraint F_RELATIONSHIP_142 foreign key (STARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTAWARD
   add constraint F_RELATIONSHIP_143 foreign key (ENDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTAWARD
   add constraint F_RELATIONSHIP_144 foreign key (DIMASSISTANCESTATUSKEY)
      references DM_DIMASSISTANCESTATUS (DIMASSISTANCESTATUSKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTAWARD
   add constraint F_RELATIONSHIP_148 foreign key (DIMNUMOFPARENTSKEY)
      references DM_DIMNUMOFPARENTS (DIMNUMOFPARENTSKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTAWARD
   add constraint F_RELATIONSHIP_149 foreign key (DIMPROGRAMKEY)
      references DM_DIMPROGRAM (DIMPROGRAMKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTAWARD
   add constraint F_RELATIONSHIP_150 foreign key (DIMPRODUCTKEY)
      references DM_DIMPRODUCT (DIMPRODUCTKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint F_RELATIONSHIP_151 foreign key (AGEGROUPKEY)
      references DM_AGEGROUPS (ID)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint F_RELATIONSHIP_152 foreign key (DIMMASKEY)
      references DM_DIMMASCODES (DIMMASKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint F_RELATIONSHIP_155 foreign key (DIMBOEKEY)
      references DM_DIMBOECODES (DIMBOEKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint F_RELATIONSHIP_182 foreign key (DIMCHILDSUPPORTENFORCETYPEKEY)
      references DM_DIMCHILDSUPPORTENFORTYPES (DIMCHILDSUPPORTENFORCETYPEKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint F_RELATIONSHIP_184 foreign key (RELATIONSHIPTYPEKEY)
      references DM_DIMCONCERNRELATIONSHIPTYPE (RELATIONSHIPTYPEKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint F_RELATIONSHIP_185 foreign key (DIMDUALKEY)
      references DM_DIMDUALELIGIBILITY (DIMDUALKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint F_RELATIONSHIP_187 foreign key (DIMSUBSIDIZEDHOUSINGTYPEKEY)
      references DM_DIMSUBSIDIZEDHOUSINGTYPES (DIMSUBSIDIZEDHOUSINGTYPEKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint F_RELATIONSHIP_206 foreign key (DIMEMPLOYMENTSTATUSKEY)
      references DM_DIMEMPLOYMENTSTATUS (DIMEMPLOYMENTSTATUSKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint F_RELATIONSHIP_207 foreign key (DIMEDUCATIONLEVELKEY)
      references DM_DIMEDUCATIONLEVELS (DIMEDUCATIONLEVELKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint F_RELATIONSHIP_208 foreign key (ENDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint F_RELATIONSHIP_209 foreign key (STARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint F_RELATIONSHIP_210 foreign key (DIMPROGRAMKEY)
      references DM_DIMPROGRAM (DIMPROGRAMKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint F_RELATIONSHIP_211 foreign key (DIMPRODUCTKEY)
      references DM_DIMPRODUCT (DIMPRODUCTKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint F_RELATIONSHIP_212 foreign key (PERSONHISTORYKEY)
      references DM_FACTPERSONHISTORY (PERSONHISTORYKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTPROVIDERHISTORY
   add constraint F_RELATIONSHIP_100 foreign key (STARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTPROVIDERHISTORY
   add constraint F_RELATIONSHIP_101 foreign key (REGISTRATIONDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTPROVIDERHISTORY
   add constraint F_RELATIONSHIP_103 foreign key (DIMPRODUCTKEY)
      references DM_DIMPRODUCT (DIMPRODUCTKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTPROVIDERHISTORY
   add constraint F_RELATIONSHIP_105 foreign key (DIMPARTICIPANTSTATUSKEY)
      references DM_DIMPARTICIPANTSTATUS (DIMPARTICIPANTSTATUSKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTPROVIDERHISTORY
   add constraint F_RELATIONSHIP_160 foreign key (DIMPROGRAMKEY)
      references DM_DIMPROGRAM (DIMPROGRAMKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTPROVIDERHISTORY
   add constraint F_RELATIONSHIP_58 foreign key (DIMADDRESSKEY)
      references DM_DIMADDRESS (DIMADDRESSKEY)
      on delete restrict on update restrict;

alter table DM_FACTPRODUCTPROVIDERHISTORY
   add constraint F_RELATIONSHIP_59 foreign key (ENDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTPROGRAMAPPLICATION
   add constraint F_RELATIONSHIP_161 foreign key (DISPOSITIONKEY)
      references DM_DIMDISPOSITION (DISPOSITIONKEY)
      on delete restrict on update restrict;

alter table DM_FACTPROGRAMAPPLICATION
   add constraint F_RELATIONSHIP_162 foreign key (DIMDENIALREASONKEY)
      references DM_DIMDENIALREASON (DIMDENIALREASONKEY)
      on delete restrict on update restrict;

alter table DM_FACTPROGRAMAPPLICATION
   add constraint F_RELATIONSHIP_171 foreign key (INTAKESTARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTPROGRAMAPPLICATION
   add constraint F_RELATIONSHIP_172 foreign key (DISPOSEDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTPROGRAMAPPLICATION
   add constraint F_RELATIONSHIP_173 foreign key (DIMTIMELINESSKEY)
      references DM_DIMYESNOINDICATOR (DIMYESNOINDICATORKEY)
      on delete restrict on update restrict;

alter table DM_FACTPROGRAMAPPLICATION
   add constraint F_RELATIONSHIP_175 foreign key (DIMRECOMMENDATIONKEY)
      references DM_DIMRECOMMENDATION (DIMRECOMMENDATIONKEY)
      on delete restrict on update restrict;

alter table DM_FACTPROGRAMAPPLICATION
   add constraint F_RELATIONSHIP_176 foreign key (RESPONDSWITHINTIMEKEY)
      references DM_DIMRESPONDSWITHINTIME (RESPONDSWITHINTIMEKEY)
      on delete restrict on update restrict;

alter table DM_FACTPROGRAMAPPLICATION
   add constraint F_RELATIONSHIP_177 foreign key (DIMINTAKETYPEKEY)
      references DM_DIMINTAKETYPE (DIMINTAKETYPEKEY)
      on delete restrict on update restrict;

alter table DM_FACTPROGRAMAPPLICATION
   add constraint F_RELATIONSHIP_179 foreign key (DIMINTAKECATEGORYKEY)
      references DM_DIMINTAKECATEGORY (DIMINTAKECATEGORYKEY)
      on delete restrict on update restrict;

alter table DM_FACTPROGRAMAPPLICATION
   add constraint F_RELATIONSHIP_180 foreign key (DIMRESPONSEPRIORITYKEY)
      references DM_DIMRESPONSEPRIORITY (DIMRESPONSEPRIORITYKEY)
      on delete restrict on update restrict;

alter table DM_FACTPROGRAMAPPLICATION
   add constraint F_RELATIONSHIP_191 foreign key (DIMCONTACTMETHODKEY)
      references DM_DIMCONTACTMETHOD (DIMCONTACTMETHODKEY)
      on delete restrict on update restrict;

alter table DM_FACTPROGRAMAPPLICATION
   add constraint F_RELATIONSHIP_192 foreign key (DIMCONTACTTYPEKEY)
      references DM_DIMCONTACTTYPE (DIMCONTACTTYPEKEY)
      on delete restrict on update restrict;

alter table DM_FACTSERVICESUPPLIERHISTORY
   add constraint F_RELATIONSHIP_119 foreign key (DIMSERVICEKEY)
      references DM_DIMSERVICE (DIMSERVICEKEY)
      on delete restrict on update restrict;

alter table DM_FACTSERVICESUPPLIERHISTORY
   add constraint F_RELATIONSHIP_90 foreign key (DIMADDRESSKEY)
      references DM_DIMADDRESS (DIMADDRESSKEY)
      on delete restrict on update restrict;

alter table DM_FACTSERVICESUPPLIERHISTORY
   add constraint F_RELATIONSHIP_91 foreign key (ENDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTSERVICESUPPLIERHISTORY
   add constraint F_RELATIONSHIP_92 foreign key (REGISTRATIONDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTSERVICESUPPLIERHISTORY
   add constraint F_RELATIONSHIP_93 foreign key (STARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTSERVICESUPPLIERHISTORY
   add constraint F_RELATIONSHIP_94 foreign key (DIMPARTICIPANTSTATUSKEY)
      references DM_DIMPARTICIPANTSTATUS (DIMPARTICIPANTSTATUSKEY)
      on delete restrict on update restrict;

alter table DM_FACTSUSPENSE
   add constraint F_RELATIONSHIP_125 foreign key (RECEIVEDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTSUSPENSE
   add constraint F_RELATIONSHIP_127 foreign key (DIMPAYMETHODKEY)
      references DM_DIMPAYMETHOD (DIMPAYMETHODKEY)
      on delete restrict on update restrict;

alter table DM_FACTUTILITYHISTORY
   add constraint F_RELATIONSHIP_110 foreign key (DIMUTILITYKEY)
      references DM_DIMUTILITY (DIMUTILITYKEY)
      on delete restrict on update restrict;

alter table DM_FACTUTILITYHISTORY
   add constraint F_RELATIONSHIP_95 foreign key (STARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTUTILITYHISTORY
   add constraint F_RELATIONSHIP_96 foreign key (ENDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTUTILITYHISTORY
   add constraint F_RELATIONSHIP_97 foreign key (REGISTRATIONDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY)
      on delete restrict on update restrict;

alter table DM_FACTUTILITYHISTORY
   add constraint F_RELATIONSHIP_98 foreign key (DIMPARTICIPANTSTATUSKEY)
      references DM_DIMPARTICIPANTSTATUS (DIMPARTICIPANTSTATUSKEY)
      on delete restrict on update restrict;

alter table DM_FACTUTILITYHISTORY
   add constraint F_RELATIONSHIP_99 foreign key (DIMADDRESSKEY)
      references DM_DIMADDRESS (DIMADDRESSKEY)
      on delete restrict on update restrict;

