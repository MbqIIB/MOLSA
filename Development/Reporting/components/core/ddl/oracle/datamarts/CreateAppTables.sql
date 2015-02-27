/*==============================================================*/
/* DBMS name:      ORACLE Version 11.x                          */
/* Created on:     30/10/2013 13:48:22                          */
/*==============================================================*/


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

/*==============================================================*/
/* Table: DM_AGEGROUPS                                          */
/*==============================================================*/
create table DM_AGEGROUPS  (
   ID                   NUMBER(19,0)                    not null,
   GROUPNAME            VARCHAR2(500)                   not null,
   STARTAGE             NUMBER(19,0)                    not null,
   ENDAGE               NUMBER(19,0)                    not null,
   GROUPDESCRIPTION     VARCHAR2(500),
   BUSAREA              VARCHAR2(500)                   not null,
   PROGRAMCODE          VARCHAR2(60)                    not null
);

alter table DM_AGEGROUPS
   add constraint PK_DM_AGEGROUPS primary key (ID);

alter table DM_AGEGROUPS
   add constraint AK_IDENTIFIER_2_D4 unique (GROUPNAME, STARTAGE, ENDAGE, BUSAREA, PROGRAMCODE);

/*==============================================================*/
/* Table: DM_AGGCASEDAY                                         */
/*==============================================================*/
create table DM_AGGCASEDAY  (
   ORGUNITKEY           NUMBER(19,0)                    not null,
   DIMPRODUCTKEY        NUMBER(19,0)                    not null,
   TIMEPERIODKEY        NUMBER(19,0)                    not null,
   NOOPENCASES          NUMBER(19,0),
   NOSUBMITTEDCASES     NUMBER(19,0),
   NOAPPROVEDCASES      NUMBER(19,0),
   NOACTIVECASES        NUMBER(19,0),
   NOPENDINGCLOSECASES  NUMBER(19,0)
);

alter table DM_AGGCASEDAY
   add constraint AK_AGGCASEDAY1 unique (DIMPRODUCTKEY, TIMEPERIODKEY, ORGUNITKEY);

/*==============================================================*/
/* Index: RELATIONSHIP_77_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_77_FK on DM_AGGCASEDAY (
   DIMPRODUCTKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_78_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_78_FK on DM_AGGCASEDAY (
   ORGUNITKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_79_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_79_FK on DM_AGGCASEDAY (
   TIMEPERIODKEY ASC
);

/*==============================================================*/
/* Table: DM_AGGCASEMONTH                                       */
/*==============================================================*/
create table DM_AGGCASEMONTH  (
   ORGUNITKEY           NUMBER(19,0)                    not null,
   TIMEPERIODKEY        NUMBER(19,0)                    not null,
   DIMPRODUCTKEY        NUMBER(19,0)                    not null,
   NOCASESONHANDBEGIN   NUMBER(19,0),
   NOCASESONHANDEND     NUMBER(19,0),
   NOCASESCLEARED       NUMBER(19,0),
   NOCASESRECEIVED      NUMBER(19,0),
   AVGDAYSCLEARED       FLOAT,
   AVGDAYSOPENTOSUB     FLOAT,
   AVGDAYSSUBTOAPPRV    FLOAT,
   AVGDAYSOPENTOACTIV   FLOAT,
   AVGDAYSRECEIPTTOREG  FLOAT,
   AVGDAYSREGTOACTIV    FLOAT
);

alter table DM_AGGCASEMONTH
   add constraint AK_AGGCASEMONTH unique (ORGUNITKEY, DIMPRODUCTKEY, TIMEPERIODKEY);

/*==============================================================*/
/* Index: RELATIONSHIP_80_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_80_FK on DM_AGGCASEMONTH (
   DIMPRODUCTKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_81_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_81_FK on DM_AGGCASEMONTH (
   ORGUNITKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_129_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_129_FK on DM_AGGCASEMONTH (
   TIMEPERIODKEY ASC
);

/*==============================================================*/
/* Table: DM_AGGFUNDS                                           */
/*==============================================================*/
create table DM_AGGFUNDS  (
   EFFECTIVEDATEKEY     NUMBER(19,0)                    not null,
   DIMFUNDID            NUMBER(19,0)                    not null,
   DIMPRODUCTKEY        NUMBER(19,0)                    not null,
   AMOUNT               NUMBER(31,2)
);

alter table DM_AGGFUNDS
   add constraint AK_IDENTIFIER_1_DM_AGGFU unique (EFFECTIVEDATEKEY, DIMFUNDID, DIMPRODUCTKEY);

/*==============================================================*/
/* Index: RELATIONSHIP_107_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_107_FK on DM_AGGFUNDS (
   EFFECTIVEDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_123_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_123_FK on DM_AGGFUNDS (
   DIMFUNDID ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_124_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_124_FK on DM_AGGFUNDS (
   DIMPRODUCTKEY ASC
);

/*==============================================================*/
/* Table: DM_AGGPAYMENTS                                        */
/*==============================================================*/
create table DM_AGGPAYMENTS  (
   ORGUNITKEY           NUMBER(19,0)                    not null,
   DIMPRODUCTKEY        NUMBER(19,0)                    not null,
   DIMDEDUCTIONKEY      NUMBER(19,0)                    not null,
   DIMDELIVERYMETHODKEY NUMBER(19,0)                    not null,
   DIMTRANSACTIONKEY    NUMBER(19,0)                    not null,
   DIMFINSTATUSKEY      NUMBER(19,0)                    not null,
   EFFECTIVEDATEKEY     NUMBER(19,0)                    not null,
   GAURDIANFLAG         CHAR(1)                        default 'N',
   REGENERATEDFLAG      CHAR(1)                        default 'N',
   AMOUNT               NUMBER(31,2),
   UNPROCESSEDAMOUNT    NUMBER(31,2),
   ILINUMBER            NUMBER(19,0)
);

/*==============================================================*/
/* Index: RELATIONSHIP_114_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_114_FK on DM_AGGPAYMENTS (
   EFFECTIVEDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_115_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_115_FK on DM_AGGPAYMENTS (
   ORGUNITKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_117_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_117_FK on DM_AGGPAYMENTS (
   DIMPRODUCTKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_118_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_118_FK on DM_AGGPAYMENTS (
   DIMFINSTATUSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_120_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_120_FK on DM_AGGPAYMENTS (
   DIMDELIVERYMETHODKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_121_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_121_FK on DM_AGGPAYMENTS (
   DIMDEDUCTIONKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_122_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_122_FK on DM_AGGPAYMENTS (
   DIMTRANSACTIONKEY ASC
);

/*==============================================================*/
/* Table: DM_DIMADDRESS                                         */
/*==============================================================*/
create table DM_DIMADDRESS  (
   DIMADDRESSKEY        NUMBER(19,0)                    not null,
   ADDRESS1             VARCHAR2(500),
   ADDRESS2             VARCHAR2(500),
   ADDRESS3             VARCHAR2(500),
   CITY                 VARCHAR2(500),
   STATE                VARCHAR2(500),
   COUNTY               VARCHAR2(500),
   ZIP                  VARCHAR2(500),
   COUNTRYCODE          VARCHAR2(60),
   COUNTRYDESC          VARCHAR2(500),
   STATEFIPSCODE        NUMBER(19,0),
   GEOCODE              VARCHAR2(2048),
   LATITUDE             NUMBER(31,2),
   LONGITUDE            NUMBER(31,2)
);

alter table DM_DIMADDRESS
   add constraint PK_DM_DIMADDRESS primary key (DIMADDRESSKEY);

/*==============================================================*/
/* Table: DM_DIMALGFINDING                                      */
/*==============================================================*/
create table DM_DIMALGFINDING  (
   DIMALGFINDINGKEY     NUMBER(19,0)                    not null,
   FINDINGCODE          VARCHAR2(60),
   FINDINGDESC          VARCHAR2(500)
);

alter table DM_DIMALGFINDING
   add constraint PK_DM_DIMALGFINDING primary key (DIMALGFINDINGKEY);

alter table DM_DIMALGFINDING
   add constraint AK_KEY_2_DM_DIMAL3 unique (FINDINGCODE);

/*==============================================================*/
/* Table: DM_DIMALGLOCATION                                     */
/*==============================================================*/
create table DM_DIMALGLOCATION  (
   DIMALGLOCATIONKEY    NUMBER(19,0)                    not null,
   ALGLOCATIONCODE      VARCHAR2(60),
   ALGLOCATIONDESC      VARCHAR2(500)
);

alter table DM_DIMALGLOCATION
   add constraint PK_DM_DIMALGLOCATION primary key (DIMALGLOCATIONKEY);

alter table DM_DIMALGLOCATION
   add constraint AK_KEY_2_DM_DIMAL4 unique (ALGLOCATIONCODE);

/*==============================================================*/
/* Table: DM_DIMALGMETHOD                                       */
/*==============================================================*/
create table DM_DIMALGMETHOD  (
   DIMALGMETHODKEY      NUMBER(19,0)                    not null,
   ALGMETHODCODE        VARCHAR2(60),
   ALGMETHODDESC        VARCHAR2(500)
);

alter table DM_DIMALGMETHOD
   add constraint PK_DM_DIMALGMETHOD primary key (DIMALGMETHODKEY);

alter table DM_DIMALGMETHOD
   add constraint AK_KEY_2_DM_DIMAL5 unique (ALGMETHODCODE);

/*==============================================================*/
/* Table: DM_DIMALGSEVERITY                                     */
/*==============================================================*/
create table DM_DIMALGSEVERITY  (
   DIMALGSEVERITYKEY    NUMBER(19,0)                    not null,
   SEVERITYCODE         VARCHAR2(60),
   SEVERITYDESC         VARCHAR2(500)
);

alter table DM_DIMALGSEVERITY
   add constraint PK_DM_DIMALGSEVERITY primary key (DIMALGSEVERITYKEY);

alter table DM_DIMALGSEVERITY
   add constraint AK_KEY_2_DM_DIMAL6 unique (SEVERITYCODE);

/*==============================================================*/
/* Table: DM_DIMALGTYPE                                         */
/*==============================================================*/
create table DM_DIMALGTYPE  (
   DIMALGTYPEKEY        NUMBER(19,0)                    not null,
   ALGTYPECODE          VARCHAR2(60),
   ALGTYPEDESC          VARCHAR2(500)
);

alter table DM_DIMALGTYPE
   add constraint PK_DM_DIMALGTYPE primary key (DIMALGTYPEKEY);

alter table DM_DIMALGTYPE
   add constraint AK_KEY_3_DM_DIMAL2 unique (ALGTYPECODE);

/*==============================================================*/
/* Table: DM_DIMASSISTANCESTATUS                                */
/*==============================================================*/
create table DM_DIMASSISTANCESTATUS  (
   DIMASSISTANCESTATUSKEY NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60),
   DESCRIPTION          VARCHAR2(500)
);

alter table DM_DIMASSISTANCESTATUS
   add constraint PK_DM_DIMASSISTANCESTATUS primary key (DIMASSISTANCESTATUSKEY);

alter table DM_DIMASSISTANCESTATUS
   add constraint AK_KEY_2_DM_DIMAS unique (DESCRIPTION);

/*==============================================================*/
/* Table: DM_DIMBOECODES                                        */
/*==============================================================*/
create table DM_DIMBOECODES  (
   DIMBOEKEY            NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60),
   DESCRIPTION          VARCHAR2(500)
);

alter table DM_DIMBOECODES
   add constraint PK_DM_DIMBOECODES primary key (DIMBOEKEY);

alter table DM_DIMBOECODES
   add constraint AK_KEY_2_DM_DIMBO unique (DESCRIPTION);

/*==============================================================*/
/* Table: DM_DIMCASECLOSURE                                     */
/*==============================================================*/
create table DM_DIMCASECLOSURE  (
   CASECLOSUREKEY       NUMBER(19,0)                    not null,
   CASECLOSUREID        NUMBER(19,0),
   REASONCODE           VARCHAR2(60),
   REASONDESC           VARCHAR2(500)
);

alter table DM_DIMCASECLOSURE
   add constraint PK_DM_DIMCASECLOSURE primary key (CASECLOSUREKEY);

alter table DM_DIMCASECLOSURE
   add constraint AK_KEY_2_DM_DIMCA2 unique (REASONDESC);

/*==============================================================*/
/* Table: DM_DIMCASEOWNER                                       */
/*==============================================================*/
create table DM_DIMCASEOWNER  (
   CASEOWNERKEY         NUMBER(19,0)                    not null,
   CASEOWNERNAME        VARCHAR2(500)                   not null,
   FIRSTNAME            VARCHAR2(500),
   LASTNAME             VARCHAR2(500),
   OWNERTYPE            VARCHAR2(500)
);

alter table DM_DIMCASEOWNER
   add constraint PK_DM_DIMCASEOWNER primary key (CASEOWNERKEY);

alter table DM_DIMCASEOWNER
   add constraint AK_IDENTIFIER_2_DM_DCASE unique (CASEOWNERNAME);

/*==============================================================*/
/* Table: DM_DIMCASEPARTICIPANTROLE                             */
/*==============================================================*/
create table DM_DIMCASEPARTICIPANTROLE  (
   DIMCASEPARTROLEID    NUMBER(19,0)                    not null,
   TYPECODE             VARCHAR2(60),
   ROLETYPE             VARCHAR2(500)                   not null
);

alter table DM_DIMCASEPARTICIPANTROLE
   add constraint PK_DM_DIMCASEPARTI primary key (DIMCASEPARTROLEID);

alter table DM_DIMCASEPARTICIPANTROLE
   add constraint AK_IDENTIFIER_2_D3 unique (TYPECODE);

/*==============================================================*/
/* Table: DM_DIMCASEREVIEWOUTCOMES                              */
/*==============================================================*/
create table DM_DIMCASEREVIEWOUTCOMES  (
   DIMCASEREVIEWOUTCOMEKEY NUMBER(19,0)                    not null,
   COMPONENTOUTCOME     VARCHAR2(500),
   OVERALLOUTCOME       VARCHAR2(500)
);

alter table DM_DIMCASEREVIEWOUTCOMES
   add constraint PK_DM_DIMCASEREVIEWOUTCOMES primary key (DIMCASEREVIEWOUTCOMEKEY);

alter table DM_DIMCASEREVIEWOUTCOMES
   add constraint AK_KEY_2_DM_DIMCA3 unique (COMPONENTOUTCOME);

/*==============================================================*/
/* Table: DM_DIMCASESUPER                                       */
/*==============================================================*/
create table DM_DIMCASESUPER  (
   CASESUPERKEY         NUMBER(19,0)                    not null,
   CASESUPERNAME        VARCHAR2(500)                   not null,
   FIRSTNAME            VARCHAR2(500),
   LASTNAME             VARCHAR2(500),
   SUPERTYPE            VARCHAR2(500)
);

alter table DM_DIMCASESUPER
   add constraint PK_DM_DIMCASESUPER primary key (CASESUPERKEY);

alter table DM_DIMCASESUPER
   add constraint AK_IDENTIFIER_2_DM_CA2 unique (CASESUPERNAME);

/*==============================================================*/
/* Table: DM_DIMCASETYPES                                       */
/*==============================================================*/
create table DM_DIMCASETYPES  (
   DIMCASETYPEKEY       NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60)                    not null,
   CASETYPE             VARCHAR2(500)
);

alter table DM_DIMCASETYPES
   add constraint PK_DM_DIMCASETYPES primary key (DIMCASETYPEKEY);

alter table DM_DIMCASETYPES
   add constraint AK_KEY_2_DM_DIMCA unique (CODE);

/*==============================================================*/
/* Table: DM_DIMCHILDSUPPORTENFORTYPES                          */
/*==============================================================*/
create table DM_DIMCHILDSUPPORTENFORTYPES  (
   DIMCHILDSUPPORTENFORCETYPEKEY NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60),
   DESCRIPTION          VARCHAR2(500)
);

alter table DM_DIMCHILDSUPPORTENFORTYPES
   add constraint PK_DM_DIMCHILDSUPPORTENFORTYPE primary key (DIMCHILDSUPPORTENFORCETYPEKEY);

alter table DM_DIMCHILDSUPPORTENFORTYPES
   add constraint AK_KEY_2_DM_DIMCH unique (CODE);

/*==============================================================*/
/* Table: DM_DIMCOMPLIANCESTATUS                                */
/*==============================================================*/
create table DM_DIMCOMPLIANCESTATUS  (
   DIMCOMPLIANCESTATUSKEY NUMBER(19,0)                    not null,
   COMPLIANCESTATUSCODE VARCHAR2(60)                    not null,
   COMPLIANCESTATUSDESC VARCHAR2(500)                   not null
);

alter table DM_DIMCOMPLIANCESTATUS
   add constraint PK_DM_DIMCOMPLIANCESTATUS primary key (DIMCOMPLIANCESTATUSKEY);

alter table DM_DIMCOMPLIANCESTATUS
   add constraint AK_KEY_2_DM_DIMCO unique (COMPLIANCESTATUSCODE);

/*==============================================================*/
/* Table: DM_DIMCOMPLIANCETYPE                                  */
/*==============================================================*/
create table DM_DIMCOMPLIANCETYPE  (
   DIMCOMPLIANCETYPEKEY NUMBER(19,0)                    not null,
   COMPLIANCETYPECODE   VARCHAR2(60)                    not null,
   COMPLIANCETYPEDESC   VARCHAR2(500)                   not null
);

alter table DM_DIMCOMPLIANCETYPE
   add constraint PK_DM_DIMCOMPLIANCETYPE primary key (DIMCOMPLIANCETYPEKEY);

alter table DM_DIMCOMPLIANCETYPE
   add constraint AK_KEY_2_DM_DIMCO5 unique (COMPLIANCETYPECODE);

/*==============================================================*/
/* Table: DM_DIMCONCERNRELATIONSHIPTYPE                         */
/*==============================================================*/
create table DM_DIMCONCERNRELATIONSHIPTYPE  (
   RELATIONSHIPTYPEKEY  NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60),
   DESCRIPTION          VARCHAR2(500)
);

alter table DM_DIMCONCERNRELATIONSHIPTYPE
   add constraint PK_DM_DIMCONCERNRELATIONSHIPTY primary key (RELATIONSHIPTYPEKEY);

alter table DM_DIMCONCERNRELATIONSHIPTYPE
   add constraint AK_KEY_2_DM_DIMCO2 unique (DESCRIPTION);

/*==============================================================*/
/* Table: DM_DIMCONFIGPROPERTIES                                */
/*==============================================================*/
create table DM_DIMCONFIGPROPERTIES  (
   DIMCONFIGPROPERTIESKEY NUMBER(19,0)                    not null,
   NAME                 VARCHAR2(500),
   DESCRIPTION          VARCHAR2(500),
   STARTDATE            DATE,
   ENDDATE              DATE,
   PROPERTYVALUE        NUMBER(19,0),
   COMMENTS             VARCHAR2(500)
);

alter table DM_DIMCONFIGPROPERTIES
   add constraint PK_DM_DIMCONFIGPROPERTIES primary key (DIMCONFIGPROPERTIESKEY);

alter table DM_DIMCONFIGPROPERTIES
   add constraint AK_KEY_2_DM_DIMCO9 unique (DESCRIPTION);

/*==============================================================*/
/* Table: DM_DIMCONSTSTATUS                                     */
/*==============================================================*/
create table DM_DIMCONSTSTATUS  (
   DIMCONSTSTATKEY      NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60),
   DESCRIPTION          VARCHAR2(500)
);

alter table DM_DIMCONSTSTATUS
   add constraint PK_DM_DIMCONSTSTATUS primary key (DIMCONSTSTATKEY);

/*==============================================================*/
/* Table: DM_DIMCONTACTLOCATION                                 */
/*==============================================================*/
create table DM_DIMCONTACTLOCATION  (
   DIMCONTACTLOCATIONKEY NUMBER(19,0)                    not null,
   LOCATIONCODE         VARCHAR2(60)                    not null,
   LOCATIONDESCRIPTION  VARCHAR2(500)
);

alter table DM_DIMCONTACTLOCATION
   add constraint PK_DM_DIMCONTACTLOCATION primary key (DIMCONTACTLOCATIONKEY);

alter table DM_DIMCONTACTLOCATION
   add constraint AK_KEY_2_DM_DIMCO1 unique (LOCATIONCODE);

/*==============================================================*/
/* Table: DM_DIMCONTACTMETHOD                                   */
/*==============================================================*/
create table DM_DIMCONTACTMETHOD  (
   DIMCONTACTMETHODKEY  NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60)                    not null,
   DESCRIPTION          VARCHAR2(500)
);

alter table DM_DIMCONTACTMETHOD
   add constraint PK_DM_DIMCONTACTMETHOD primary key (DIMCONTACTMETHODKEY);

alter table DM_DIMCONTACTMETHOD
   add constraint AK_KEY_2_DM_DIMCO12 unique (CODE);

/*==============================================================*/
/* Table: DM_DIMCONTACTPURPOSE                                  */
/*==============================================================*/
create table DM_DIMCONTACTPURPOSE  (
   DIMPURPOSEKEY        NUMBER(19,0)                    not null,
   CONTACTLOGID         NUMBER(19,0)                    not null,
   PURPOSECODE          VARCHAR2(60)                    not null,
   PURPOSEDESCRIPTION   VARCHAR2(500)
);

alter table DM_DIMCONTACTPURPOSE
   add constraint PK_DM_DIMCONTACTPURPOSE primary key (DIMPURPOSEKEY);

alter table DM_DIMCONTACTPURPOSE
   add constraint AK_KEY_2_DM_DIMCO3 unique (CONTACTLOGID, PURPOSECODE);

/*==============================================================*/
/* Table: DM_DIMCONTACTTYPE                                     */
/*==============================================================*/
create table DM_DIMCONTACTTYPE  (
   DIMCONTACTTYPEKEY    NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60)                    not null,
   DESCRIPTION          VARCHAR2(500)
);

alter table DM_DIMCONTACTTYPE
   add constraint PK_DM_DIMCONTACTTYPE primary key (DIMCONTACTTYPEKEY);

alter table DM_DIMCONTACTTYPE
   add constraint AK_KEY_2_DM_DIMCO14 unique (CODE);

/*==============================================================*/
/* Table: DM_DIMCOUNTRY                                         */
/*==============================================================*/
create table DM_DIMCOUNTRY  (
   DIMCOUNTRYKEY        NUMBER(19,0)                    not null,
   COUNTRYCODE          VARCHAR2(60),
   COUNTRY              VARCHAR2(500)                   not null
);

alter table DM_DIMCOUNTRY
   add constraint PK_DM_DIMCOUNTRY primary key (DIMCOUNTRYKEY);

alter table DM_DIMCOUNTRY
   add constraint AK_IDENTIFIER_2_DM_DIMCO unique (COUNTRYCODE);

/*==============================================================*/
/* Table: DM_DIMDEDUCTION                                       */
/*==============================================================*/
create table DM_DIMDEDUCTION  (
   DIMDEDUCTIONKEY      NUMBER(19,0)                    not null,
   DEDUCTIONCAT         VARCHAR2(500)                   not null,
   DEDUCTIONNAME        VARCHAR2(500)                   not null
);

alter table DM_DIMDEDUCTION
   add constraint PK_DM_DIMDEDUCTION primary key (DIMDEDUCTIONKEY);

alter table DM_DIMDEDUCTION
   add constraint AK_DEDUCTIONTYP2 unique (DEDUCTIONCAT, DEDUCTIONNAME);

/*==============================================================*/
/* Table: DM_DIMDELIVERYMETHOD                                  */
/*==============================================================*/
create table DM_DIMDELIVERYMETHOD  (
   DIMDELIVERYMETHODKEY NUMBER(19,0)                    not null,
   DELIVERYMETHODCODE   VARCHAR2(60),
   DELIVERYMETHOD       VARCHAR2(500)
);

alter table DM_DIMDELIVERYMETHOD
   add constraint PK_DM_DIMDELIVERYMETHOD primary key (DIMDELIVERYMETHODKEY);

alter table DM_DIMDELIVERYMETHOD
   add constraint AK_DELMETHOD2 unique (DELIVERYMETHODCODE);

/*==============================================================*/
/* Table: DM_DIMDENIALREASON                                    */
/*==============================================================*/
create table DM_DIMDENIALREASON  (
   DIMDENIALREASONKEY   NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60)                    not null,
   DENIALREASON         VARCHAR2(500)                   not null
);

alter table DM_DIMDENIALREASON
   add constraint PK_DM_DIMDENIALREASON primary key (DIMDENIALREASONKEY);

alter table DM_DIMDENIALREASON
   add constraint AK_KEY_2_DM_DIMDE unique (DENIALREASON);

/*==============================================================*/
/* Table: DM_DIMDISPOSITION                                     */
/*==============================================================*/
create table DM_DIMDISPOSITION  (
   DISPOSITIONKEY       NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60)                    not null,
   DISPOSITIONDESC      VARCHAR2(500)                   not null
);

alter table DM_DIMDISPOSITION
   add constraint PK_DM_DIMDISPOSITION primary key (DISPOSITIONKEY);

alter table DM_DIMDISPOSITION
   add constraint AK_KEY_2_DM_DIMDI unique (DISPOSITIONDESC);

/*==============================================================*/
/* Table: DM_DIMDUALELIGIBILITY                                 */
/*==============================================================*/
create table DM_DIMDUALELIGIBILITY  (
   DIMDUALKEY           NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60),
   DESCRIPTION          VARCHAR2(500)
);

alter table DM_DIMDUALELIGIBILITY
   add constraint PK_DM_DIMDUALELIGIBILITY primary key (DIMDUALKEY);

alter table DM_DIMDUALELIGIBILITY
   add constraint AK_KEY_2_DM_DIMDU2 unique (DESCRIPTION);

/*==============================================================*/
/* Table: DM_DIMDUPLICATEREASON                                 */
/*==============================================================*/
create table DM_DIMDUPLICATEREASON  (
   DIMDUPREASONKEY      NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60)                    not null,
   DESCRIPTION          VARCHAR2(500)
);

alter table DM_DIMDUPLICATEREASON
   add constraint PK_DM_DIMDUPLICATEREASON primary key (DIMDUPREASONKEY);

alter table DM_DIMDUPLICATEREASON
   add constraint AK_KEY_2_DM_DIMDU3 unique (CODE);

/*==============================================================*/
/* Table: DM_DIMDUPLICATESTATUS                                 */
/*==============================================================*/
create table DM_DIMDUPLICATESTATUS  (
   DIMDUPSTATUSKEY      NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60)                    not null,
   DESCRIPTION          VARCHAR2(500)
);

alter table DM_DIMDUPLICATESTATUS
   add constraint PK_DM_DIMDUPLICATESTATUS primary key (DIMDUPSTATUSKEY);

alter table DM_DIMDUPLICATESTATUS
   add constraint AK_KEY_2_DM_DIMDU unique (CODE);

/*==============================================================*/
/* Table: DM_DIMEDUCATION                                       */
/*==============================================================*/
create table DM_DIMEDUCATION  (
   DIMEDUCATIONKEY      NUMBER(19,0)                    not null,
   QUALIFICATION        VARCHAR2(500)                   not null,
   EDUCATIONCODE        VARCHAR2(60)
);

alter table DM_DIMEDUCATION
   add constraint PK_DM_DIMEDUCATION primary key (DIMEDUCATIONKEY);

alter table DM_DIMEDUCATION
   add constraint AK_IDENTIFIER_2_DM_DIMED unique (EDUCATIONCODE);

/*==============================================================*/
/* Table: DM_DIMEDUCATIONLEVELS                                 */
/*==============================================================*/
create table DM_DIMEDUCATIONLEVELS  (
   DIMEDUCATIONLEVELKEY NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60),
   DESCRIPTION          VARCHAR2(500)
);

alter table DM_DIMEDUCATIONLEVELS
   add constraint PK_DM_DIMEDUCATIONLEVELS primary key (DIMEDUCATIONLEVELKEY);

alter table DM_DIMEDUCATIONLEVELS
   add constraint AK_KEY_2_DM_DIMED unique (DESCRIPTION);

/*==============================================================*/
/* Table: DM_DIMEMPLOYMENTSTATUS                                */
/*==============================================================*/
create table DM_DIMEMPLOYMENTSTATUS  (
   DIMEMPLOYMENTSTATUSKEY NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60),
   DESCRIPTION          VARCHAR2(500)
);

alter table DM_DIMEMPLOYMENTSTATUS
   add constraint PK_DM_DIMEMPLOYMENTSTATUS primary key (DIMEMPLOYMENTSTATUSKEY);

alter table DM_DIMEMPLOYMENTSTATUS
   add constraint AK_KEY_2_DM_DIMEM unique (DESCRIPTION);

/*==============================================================*/
/* Table: DM_DIMETHNICITY                                       */
/*==============================================================*/
create table DM_DIMETHNICITY  (
   DIMETHNICITYKEY      NUMBER(19,0)                    not null,
   ETHNICITYCODE        VARCHAR2(60),
   ETHNICITY            VARCHAR2(500)                   not null
);

alter table DM_DIMETHNICITY
   add constraint PK_DM_DIMETHNICITY primary key (DIMETHNICITYKEY);

alter table DM_DIMETHNICITY
   add constraint AK_IDENTIFIER_2_DM_DIMET unique (ETHNICITYCODE);

/*==============================================================*/
/* Table: DM_DIMFINANCIALSTATUS                                 */
/*==============================================================*/
create table DM_DIMFINANCIALSTATUS  (
   DIMFINSTATUSKEY      NUMBER(19,0)                    not null,
   STATUSCODE           VARCHAR2(60)                    not null,
   STATUSDESC           VARCHAR2(500)
);

alter table DM_DIMFINANCIALSTATUS
   add constraint PK_DM_DIMFINANCIALSTATUS primary key (DIMFINSTATUSKEY);

alter table DM_DIMFINANCIALSTATUS
   add constraint AK_IDENTIFIER_2_DM_DIMFI unique (STATUSCODE);

/*==============================================================*/
/* Table: DM_DIMFREQUENCYCRITERIA                               */
/*==============================================================*/
create table DM_DIMFREQUENCYCRITERIA  (
   DIMFREQUENCYCRITERIAKEY NUMBER(19,0)                    not null,
   FREQUENCYCRITERIACODE VARCHAR2(60)                    not null,
   FREQUENCYCRITERIADESC VARCHAR2(500)                   not null
);

alter table DM_DIMFREQUENCYCRITERIA
   add constraint PK_DM_DIMFREQUENCYCRITERIA primary key (DIMFREQUENCYCRITERIAKEY);

alter table DM_DIMFREQUENCYCRITERIA
   add constraint AK_KEY_3_DM_DIMCO4 unique (FREQUENCYCRITERIACODE);

/*==============================================================*/
/* Table: DM_DIMFUND                                            */
/*==============================================================*/
create table DM_DIMFUND  (
   DIMFUNDID            NUMBER(19,0)                    not null,
   REVENUE              NUMBER(31,2),
   FUNDNAME             VARCHAR2(500)                   not null,
   DWPRODUCTID          NUMBER(19,0)                    not null
);

alter table DM_DIMFUND
   add constraint AK_KEY_2_DM_DIMFU unique (FUNDNAME);

alter table DM_DIMFUND
   add constraint PK_DM_DIMFUND primary key (DIMFUNDID);

/*==============================================================*/
/* Table: DM_DIMGENDER                                          */
/*==============================================================*/
create table DM_DIMGENDER  (
   DIMGENDERKEY         NUMBER(19,0)                    not null,
   GENDERCODE           VARCHAR2(60),
   GENDER               VARCHAR2(500)                   not null
);

alter table DM_DIMGENDER
   add constraint PK_DM_DIMGENDER primary key (DIMGENDERKEY);

alter table DM_DIMGENDER
   add constraint AK_IDENTIFIER_2_DM unique (GENDERCODE);

/*==============================================================*/
/* Table: DM_DIMINDIGENOUSGROUPS                                */
/*==============================================================*/
create table DM_DIMINDIGENOUSGROUPS  (
   DIMINDIGENOUSGROUPKEY NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60)                    not null,
   INDIGENOUSGROUP      VARCHAR2(500)
);

alter table DM_DIMINDIGENOUSGROUPS
   add constraint PK_DM_DIMINDIGENOUSGROUPS primary key (DIMINDIGENOUSGROUPKEY);

alter table DM_DIMINDIGENOUSGROUPS
   add constraint AK_KEY_2_DM_DIMIN3 unique (CODE);

/*==============================================================*/
/* Table: DM_DIMINDUSTRYTYPE                                    */
/*==============================================================*/
create table DM_DIMINDUSTRYTYPE  (
   DIMINDUSTRYTYPEKEY   NUMBER(19,0)                    not null,
   INDUSTRYTYPECODE     VARCHAR2(60),
   INDUSTRYTYPE         VARCHAR2(500)                   not null
);

alter table DM_DIMINDUSTRYTYPE
   add constraint PK_DM_DIMINDUSTRYTYPE primary key (DIMINDUSTRYTYPEKEY);

alter table DM_DIMINDUSTRYTYPE
   add constraint AK_IDENTIFIER_2_DM_DIMIN unique (INDUSTRYTYPECODE);

/*==============================================================*/
/* Table: DM_DIMINTAKECATEGORY                                  */
/*==============================================================*/
create table DM_DIMINTAKECATEGORY  (
   DIMINTAKECATEGORYKEY NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60),
   DIMINTAKECATEGORYDESC VARCHAR2(500)
);

alter table DM_DIMINTAKECATEGORY
   add constraint PK_DM_DIMINTAKECATEGORY primary key (DIMINTAKECATEGORYKEY);

alter table DM_DIMINTAKECATEGORY
   add constraint AK_KEY_2_DM_DIMIN4 unique (DIMINTAKECATEGORYDESC);

/*==============================================================*/
/* Table: DM_DIMINTAKETYPE                                      */
/*==============================================================*/
create table DM_DIMINTAKETYPE  (
   DIMINTAKETYPEKEY     NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60),
   INTAKETYPEDESC       VARCHAR2(500)
);

alter table DM_DIMINTAKETYPE
   add constraint PK_DM_DIMINTAKETYPE primary key (DIMINTAKETYPEKEY);

alter table DM_DIMINTAKETYPE
   add constraint AK_KEY_2_DM_DIMIN5 unique (INTAKETYPEDESC);

/*==============================================================*/
/* Table: DM_DIMINTEGRATEDCASETYPES                             */
/*==============================================================*/
create table DM_DIMINTEGRATEDCASETYPES  (
   DIMINTEGRATEDCASETYPEKEY NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60)                    not null,
   INTEGRATEDCASETYPE   VARCHAR2(500)
);

alter table DM_DIMINTEGRATEDCASETYPES
   add constraint PK_DM_DIMINTEGRATEDCASETYPES primary key (DIMINTEGRATEDCASETYPEKEY);

alter table DM_DIMINTEGRATEDCASETYPES
   add constraint AK_KEY_3_DM_DIMIN unique (CODE);

/*==============================================================*/
/* Table: DM_DIMINVRECOMMENDATION                               */
/*==============================================================*/
create table DM_DIMINVRECOMMENDATION  (
   DIMINVRECOMMENDATIONKEY NUMBER(19,0)                    not null,
   RECOMMENDATIONCODE   VARCHAR2(60)                    not null,
   RECOMMENDATIONDESC   VARCHAR2(500)                   not null
);

alter table DM_DIMINVRECOMMENDATION
   add constraint PK_DM_DIMINVRECOMMENDATION primary key (DIMINVRECOMMENDATIONKEY);

alter table DM_DIMINVRECOMMENDATION
   add constraint AK_KEY_2_DM_DIMIN unique (RECOMMENDATIONCODE);

/*==============================================================*/
/* Table: DM_DIMINVSUBTYPE                                      */
/*==============================================================*/
create table DM_DIMINVSUBTYPE  (
   DIMINVSUBTYPEKEY     NUMBER(19,0)                    not null,
   INVSUBTYPECODE       VARCHAR2(60)                    not null,
   INVSUBTYPEDESC       VARCHAR2(500)                   not null
);

alter table DM_DIMINVSUBTYPE
   add constraint PK_DM_DIMINVSUBTYPE primary key (DIMINVSUBTYPEKEY);

alter table DM_DIMINVSUBTYPE
   add constraint AK_KEY_2_DM_DIMIN2 unique (INVSUBTYPECODE);

/*==============================================================*/
/* Table: DM_DIMMARITALSTATUS                                   */
/*==============================================================*/
create table DM_DIMMARITALSTATUS  (
   DIMMARITALSTATUSKEY  NUMBER(19,0)                    not null,
   STATUSCODE           VARCHAR2(60),
   MARITALSTATUS        VARCHAR2(500)                   not null
);

alter table DM_DIMMARITALSTATUS
   add constraint PK_DM_DIMMARITALSTATUS primary key (DIMMARITALSTATUSKEY);

alter table DM_DIMMARITALSTATUS
   add constraint AK_IDENTIFIER_2_DM_DIMMA unique (STATUSCODE);

/*==============================================================*/
/* Table: DM_DIMMASCODES                                        */
/*==============================================================*/
create table DM_DIMMASCODES  (
   DIMMASKEY            NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60),
   DESCRIPTION          VARCHAR2(500)
);

alter table DM_DIMMASCODES
   add constraint PK_DM_DIMMASCODES primary key (DIMMASKEY);

alter table DM_DIMMASCODES
   add constraint AK_KEY_2_DM_DIMMA unique (DESCRIPTION);

/*==============================================================*/
/* Table: DM_DIMMERGESTATUS                                     */
/*==============================================================*/
create table DM_DIMMERGESTATUS  (
   DIMMERGESTATUSKEY    NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60)                    not null,
   DESCRIPTION          VARCHAR2(500)
);

alter table DM_DIMMERGESTATUS
   add constraint PK_DM_DIMMERGESTATUS primary key (DIMMERGESTATUSKEY);

alter table DM_DIMMERGESTATUS
   add constraint AK_KEY_2_DM_DIMME unique (CODE);

/*==============================================================*/
/* Table: DM_DIMMILESTONEDURATION                               */
/*==============================================================*/
create table DM_DIMMILESTONEDURATION  (
   DIMMILESTONEDURATIONKEY NUMBER(19,0)                    not null,
   DURATION             NUMBER(19,0)                    not null,
   MILESTONENAME        VARCHAR2(500)                   not null
);

alter table DM_DIMMILESTONEDURATION
   add constraint PK_DM_DIMMILESTONEDURATION primary key (DIMMILESTONEDURATIONKEY);

alter table DM_DIMMILESTONEDURATION
   add constraint AK_KEY_2_DM_DIMMI unique (DURATION, MILESTONENAME);

/*==============================================================*/
/* Table: DM_DIMNATIONALITY                                     */
/*==============================================================*/
create table DM_DIMNATIONALITY  (
   DIMNATIONALITYKEY    NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60)                    not null,
   DESCRIPTION          VARCHAR2(500)
);

alter table DM_DIMNATIONALITY
   add constraint PK_DM_DIMNATIONALITY primary key (DIMNATIONALITYKEY);

alter table DM_DIMNATIONALITY
   add constraint AK_KEY_2_DM_DIMNA unique (CODE);

/*==============================================================*/
/* Table: DM_DIMNUMOFPARENTS                                    */
/*==============================================================*/
create table DM_DIMNUMOFPARENTS  (
   DIMNUMOFPARENTSKEY   NUMBER(19,0)                    not null,
   NUMOFPARENTS         NUMBER(19,0)                    not null,
   DIMENDESC            VARCHAR2(500)
);

alter table DM_DIMNUMOFPARENTS
   add constraint PK_DM_DIMNUMOFPARENTS primary key (DIMNUMOFPARENTSKEY);

/*==============================================================*/
/* Table: DM_DIMORGANISATION                                    */
/*==============================================================*/
create table DM_DIMORGANISATION  (
   DIMORGKEY            NUMBER(19,0)                    not null,
   ORGNAME              VARCHAR(512)                    not null,
   STATE                VARCHAR2(500)
);

alter table DM_DIMORGANISATION
   add constraint PK_DM_DIMORGANISATION primary key (DIMORGKEY);

alter table DM_DIMORGANISATION
   add constraint AK_KEY_2_DM_DIMOR unique (ORGNAME);

/*==============================================================*/
/* Table: DM_DIMORGUNIT                                         */
/*==============================================================*/
create table DM_DIMORGUNIT  (
   ORGUNITKEY           NUMBER(19,0)                    not null,
   ORGUNITID            NUMBER(19,0),
   ORGUNITNAME          VARCHAR2(500),
   ORGUNITDESC          VARCHAR2(500),
   ORGUNITLEVEL         NUMBER(19,0),
   ORGUNITPARENTID      NUMBER(19,0),
   ORGUNITPARENTNAME    VARCHAR2(500)
);

alter table DM_DIMORGUNIT
   add constraint PK_DM_DIMORGUNIT primary key (ORGUNITKEY);

/*==============================================================*/
/* Table: DM_DIMOUTCOME                                         */
/*==============================================================*/
create table DM_DIMOUTCOME  (
   DIMOUTCOMEKEY        NUMBER(19,0)                    not null,
   OUTCOMECODE          VARCHAR2(60)                    not null,
   OUTCOMEDESC          VARCHAR2(500)                   not null
);

alter table DM_DIMOUTCOME
   add constraint PK_DM_DIMOUTCOME primary key (DIMOUTCOMEKEY);

alter table DM_DIMOUTCOME
   add constraint AK_KEY_2_DM_DIMCC23 unique (OUTCOMECODE);

/*==============================================================*/
/* Table: DM_DIMPARTICIPANTSTATUS                               */
/*==============================================================*/
create table DM_DIMPARTICIPANTSTATUS  (
   DIMPARTICIPANTSTATUSKEY NUMBER(19,0)                    not null,
   STATUSCODE           VARCHAR2(60),
   STATUS               VARCHAR2(500)
);

alter table DM_DIMPARTICIPANTSTATUS
   add constraint PK_DM_DIMPARTICIPANTSTATUS primary key (DIMPARTICIPANTSTATUSKEY);

alter table DM_DIMPARTICIPANTSTATUS
   add constraint AK_IDENTIFIER_2_DM_PA2 unique (STATUSCODE);

/*==============================================================*/
/* Table: DM_DIMPAYMETHOD                                       */
/*==============================================================*/
create table DM_DIMPAYMETHOD  (
   DIMPAYMETHODKEY      NUMBER(19,0)                    not null,
   PAYMETHODCODE        VARCHAR2(60),
   PAYMETHODDESC        VARCHAR2(500)                   not null
);

alter table DM_DIMPAYMETHOD
   add constraint PK_DM_DIMPAYMETHOD primary key (DIMPAYMETHODKEY);

alter table DM_DIMPAYMETHOD
   add constraint AK_IDENTIFIER_2_DM_PA3 unique (PAYMETHODCODE);

/*==============================================================*/
/* Table: DM_DIMPERSONROLE                                      */
/*==============================================================*/
create table DM_DIMPERSONROLE  (
   DIMPERSONROLEKEY     NUMBER(19,0)                    not null,
   ROLECODE             VARCHAR2(60)                    not null,
   ROLEDESCRIPTION      VARCHAR2(500)
);

alter table DM_DIMPERSONROLE
   add constraint PK_DM_DIMPERSONROLE primary key (DIMPERSONROLEKEY);

alter table DM_DIMPERSONROLE
   add constraint AK_KEY_2_DM_DIMPE unique (ROLECODE, ROLEDESCRIPTION);

/*==============================================================*/
/* Table: DM_DIMPERSONTYPE                                      */
/*==============================================================*/
create table DM_DIMPERSONTYPE  (
   DIMPERSONTYPEKEY     NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60)                    not null,
   PERSONTYPE           VARCHAR2(500)
);

alter table DM_DIMPERSONTYPE
   add constraint PK_DM_DIMPERSONTYPE primary key (DIMPERSONTYPEKEY);

alter table DM_DIMPERSONTYPE
   add constraint AK_KEY_2_DM_DIMPE2 unique (CODE);

/*==============================================================*/
/* Table: DM_DIMPREFERREDLANGUAGE                               */
/*==============================================================*/
create table DM_DIMPREFERREDLANGUAGE  (
   DIMPREFERREDLANGUAGEKEY NUMBER(19,0)                    not null,
   LANGUAGECODE         VARCHAR2(60),
   PREFERREDLANGUAGE    VARCHAR2(500)                   not null
);

alter table DM_DIMPREFERREDLANGUAGE
   add constraint PK_DM_DIMPREFERREDLANGUAGE primary key (DIMPREFERREDLANGUAGEKEY);

alter table DM_DIMPREFERREDLANGUAGE
   add constraint AK_IDENTIFIER_2_DM_PR2 unique (LANGUAGECODE);

/*==============================================================*/
/* Table: DM_DIMPRODUCT                                         */
/*==============================================================*/
create table DM_DIMPRODUCT  (
   DIMPRODUCTKEY        NUMBER(19,0)                    not null,
   DWPRODUCTID          NUMBER(19,0)                    not null,
   NAME                 VARCHAR2(500)                   not null,
   PRODUCTTYPECODE      VARCHAR2(60)                    not null,
   PRODUCTTYPE          VARCHAR2(500)
);

alter table DM_DIMPRODUCT
   add constraint PK_DM_DIMPRODUCT primary key (DIMPRODUCTKEY);

alter table DM_DIMPRODUCT
   add constraint AK_KEY_2_DM_DIMPR2 unique (DWPRODUCTID);

/*==============================================================*/
/* Table: DM_DIMPROGRAM                                         */
/*==============================================================*/
create table DM_DIMPROGRAM  (
   DIMPROGRAMKEY        NUMBER(19,0)                    not null,
   PROGRAMCODE          VARCHAR2(60)                    not null,
   PROGRAM              VARCHAR2(500),
   DISPLAYNAME          VARCHAR2(500)
);

alter table DM_DIMPROGRAM
   add constraint PK_DM_DIMPROGRAM primary key (DIMPROGRAMKEY);

alter table DM_DIMPROGRAM
   add constraint AK_KEY_3_DM_DIMPROG unique (PROGRAMCODE);

/*==============================================================*/
/* Table: DM_DIMPROVIDER                                        */
/*==============================================================*/
create table DM_DIMPROVIDER  (
   DIMPROVIDERKEY       NUMBER(19,0)                    not null,
   PROVIDERID           NUMBER(19,0)                    not null,
   PROVIDERNAME         VARCHAR2(500)                   not null
);

alter table DM_DIMPROVIDER
   add constraint PK_DM_DIMPROVIDER primary key (DIMPROVIDERKEY);

alter table DM_DIMPROVIDER
   add constraint AK_KEY_2_DM_DIMPR3 unique (PROVIDERID);

/*==============================================================*/
/* Table: DM_DIMRACE                                            */
/*==============================================================*/
create table DM_DIMRACE  (
   DIMRACEKEY           NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60)                    not null,
   DESCRIPTION          VARCHAR2(500)
);

alter table DM_DIMRACE
   add constraint PK_DM_DIMRACE primary key (DIMRACEKEY);

alter table DM_DIMRACE
   add constraint AK_KEY_2_DM_DIMRA unique (CODE);

/*==============================================================*/
/* Table: DM_DIMRECOMMENDATION                                  */
/*==============================================================*/
create table DM_DIMRECOMMENDATION  (
   DIMRECOMMENDATIONKEY NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60),
   RECOMMENDATIONDESC   VARCHAR2(500)
);

alter table DM_DIMRECOMMENDATION
   add constraint PK_DM_DIMRECOMMENDATION primary key (DIMRECOMMENDATIONKEY);

alter table DM_DIMRECOMMENDATION
   add constraint AK_KEY_2_DM_DIMRE2 unique (RECOMMENDATIONDESC);

/*==============================================================*/
/* Table: DM_DIMRECORDSTATUS                                    */
/*==============================================================*/
create table DM_DIMRECORDSTATUS  (
   DIMRECORDSTATUSKEY   NUMBER(19,0)                    not null,
   RECORDSTATUSCODE     VARCHAR2(60),
   RECORDSTATUSDESC     VARCHAR2(500)
);

alter table DM_DIMRECORDSTATUS
   add constraint PK_DM_DIMRECORDSTATUS primary key (DIMRECORDSTATUSKEY);

alter table DM_DIMRECORDSTATUS
   add constraint AK_KEY_2_DM_DIMRE4 unique (RECORDSTATUSCODE);

/*==============================================================*/
/* Table: DM_DIMRECURRENCE                                      */
/*==============================================================*/
create table DM_DIMRECURRENCE  (
   DIMRECURRENCEKEY     NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60),
   DESCRIPTION          VARCHAR2(500)
);

alter table DM_DIMRECURRENCE
   add constraint PK_DM_DIMRECURRENCE primary key (DIMRECURRENCEKEY);

alter table DM_DIMRECURRENCE
   add constraint AK_KEY_2_DM_DIMRE6 unique (CODE);

/*==============================================================*/
/* Table: DM_DIMREPORTINGDUMMY                                  */
/*==============================================================*/
create table DM_DIMREPORTINGDUMMY  (
   DUMMY                VARCHAR2(500)                  default 'Dummy ETL for Java Transforms' not null
);

alter table DM_DIMREPORTINGDUMMY
   add constraint PK_DM_DIMREPORTINGDUMMY primary key (DUMMY);

/*==============================================================*/
/* Table: DM_DIMREPORTINGTIMELINESS                             */
/*==============================================================*/
create table DM_DIMREPORTINGTIMELINESS  (
   DIMREPORTINGTIMELINESSKEY NUMBER(19,0)                    not null,
   REPORTINGTIMELINESSKEYCODE VARCHAR2(60)                    not null,
   REPORTINGTIMELINESSKEYDESC VARCHAR2(500)                   not null
);

alter table DM_DIMREPORTINGTIMELINESS
   add constraint PK_DM_DIMREPORTINGTIMELINESS primary key (DIMREPORTINGTIMELINESSKEY);

alter table DM_DIMREPORTINGTIMELINESS
   add constraint AK_KEY_211_DM_DIMRE unique (REPORTINGTIMELINESSKEYCODE);

/*==============================================================*/
/* Table: DM_DIMRESOLUTIONSTATUS                                */
/*==============================================================*/
create table DM_DIMRESOLUTIONSTATUS  (
   DIMRESOLUTIONSTATUSKEY NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60),
   DESCRIPTION          VARCHAR2(500)
);

alter table DM_DIMRESOLUTIONSTATUS
   add constraint PK_DM_DIMRESOLUTIONSTATUS primary key (DIMRESOLUTIONSTATUSKEY);

alter table DM_DIMRESOLUTIONSTATUS
   add constraint AK_KEY_2_DM_DIMRE5 unique (CODE);

/*==============================================================*/
/* Table: DM_DIMRESPONDSWITHINTIME                              */
/*==============================================================*/
create table DM_DIMRESPONDSWITHINTIME  (
   RESPONDSWITHINTIMEKEY NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60),
   RESPONDSWITHINTIMEDESC VARCHAR2(500)
);

alter table DM_DIMRESPONDSWITHINTIME
   add constraint PK_DM_DIMRESPONDSW primary key (RESPONDSWITHINTIMEKEY);

alter table DM_DIMRESPONDSWITHINTIME
   add constraint AK_KEY_2_DM_DIMRE3 unique (RESPONDSWITHINTIMEDESC);

/*==============================================================*/
/* Table: DM_DIMRESPONSEPRIORITY                                */
/*==============================================================*/
create table DM_DIMRESPONSEPRIORITY  (
   DIMRESPONSEPRIORITYKEY NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60),
   RESPONSEPRIORITYDESC VARCHAR2(500)
);

alter table DM_DIMRESPONSEPRIORITY
   add constraint PK_DM_DIMRESPONSEPRIORITY primary key (DIMRESPONSEPRIORITYKEY);

alter table DM_DIMRESPONSEPRIORITY
   add constraint AK_KEY_2_DM_DIMRE unique (RESPONSEPRIORITYDESC);

/*==============================================================*/
/* Table: DM_DIMSERVICE                                         */
/*==============================================================*/
create table DM_DIMSERVICE  (
   DIMSERVICEKEY        NUMBER(19,0)                    not null,
   SERVICECODE          VARCHAR2(60),
   SERVICETYPE          VARCHAR2(500)                   not null
);

alter table DM_DIMSERVICE
   add constraint PK_DM_DIMSERVICE primary key (DIMSERVICEKEY);

alter table DM_DIMSERVICE
   add constraint AK_IDENTIFIER_2_DM_DIMSE unique (SERVICECODE);

/*==============================================================*/
/* Table: DM_DIMSERVICEOFFERING                                 */
/*==============================================================*/
create table DM_DIMSERVICEOFFERING  (
   DIMSERVICEOFFERINGKEY NUMBER(19,0)                    not null,
   SERVICEOFFERINGID    NUMBER(19,0)                    not null,
   SERVICEOFFERINGNAME  VARCHAR2(500)                   not null,
   STARTDATE            DATE,
   ENDDATE              DATE
);

alter table DM_DIMSERVICEOFFERING
   add constraint PK_DM_DIMSERVICEOFFERING primary key (DIMSERVICEOFFERINGKEY);

alter table DM_DIMSERVICEOFFERING
   add constraint AK_KEY_2_DM_DIMSE1 unique (SERVICEOFFERINGID);

alter table DM_DIMSERVICEOFFERING
   add constraint AK_KEY_3_DM_DIMSE unique (SERVICEOFFERINGNAME);

/*==============================================================*/
/* Table: DM_DIMSTATUS                                          */
/*==============================================================*/
create table DM_DIMSTATUS  (
   STATUSKEY            NUMBER(19,0)                    not null,
   STATUSNAME           VARCHAR2(500)                   not null,
   STATUSCODE           VARCHAR2(60),
   STATUSCATEGORY       VARCHAR2(60)
);

alter table DM_DIMSTATUS
   add constraint PK_DM_DIMSTATUS primary key (STATUSKEY);

alter table DM_DIMSTATUS
   add constraint AK_IDENTIFIER_2_D2 unique (STATUSCODE);

/*==============================================================*/
/* Table: DM_DIMSUBSIDIZEDHOUSINGTYPES                          */
/*==============================================================*/
create table DM_DIMSUBSIDIZEDHOUSINGTYPES  (
   DIMSUBSIDIZEDHOUSINGTYPEKEY NUMBER(19,0)                    not null,
   CODE                 VARCHAR2(60),
   DESCRIPTION          VARCHAR2(500)
);

alter table DM_DIMSUBSIDIZEDHOUSINGTYPES
   add constraint PK_DM_DIMSUBSIDIZEDHOUSINGTYPE primary key (DIMSUBSIDIZEDHOUSINGTYPEKEY);

alter table DM_DIMSUBSIDIZEDHOUSINGTYPES
   add constraint AK_KEY_2_DM_DIMSU unique (DESCRIPTION);

/*==============================================================*/
/* Table: DM_DIMTIMEOFDAYGROUPS                                 */
/*==============================================================*/
create table DM_DIMTIMEOFDAYGROUPS  (
   DIMPROGRAMKEY        NUMBER(19,0)                    not null,
   HOUROFDAY            NUMBER(19,0)                    not null
      constraint CKC_HOUROFDAY_DM_DIMTI check (HOUROFDAY between -1 and 23),
   GROUPNAME            VARCHAR2(500)                   not null,
   GROUPDESC            VARCHAR2(500)
);

alter table DM_DIMTIMEOFDAYGROUPS
   add constraint AK_KEY_2_DM_DIMTI unique (DIMPROGRAMKEY, HOUROFDAY, GROUPNAME);

/*==============================================================*/
/* Table: DM_DIMTIMEPERIOD                                      */
/*==============================================================*/
create table DM_DIMTIMEPERIOD  (
   TIMEPERIODKEY        NUMBER(19,0)                    not null,
   TIMEPERIODDESCRIPTION VARCHAR2(500),
   TIMEPERIODDETAILLEVEL CHAR(30),
   DAYDATE              DATE,
   DMYEAR               NUMBER(19,0),
   DMMONTH              NUMBER(19,0),
   WEEK                 NUMBER(19,0),
   DMDAY                NUMBER(19,0),
   CALENDARQUARTER      NUMBER(19,0),
   DAYOFWEEK            CHAR(30),
   FEDERALFISCALYEAR    NUMBER(19,0),
   FEDERALFISCALQUARTER NUMBER(19,0),
   FEDERALFISCALMONTH   NUMBER(19,0),
   MONTHSTARTDATEIND    SMALLINT,
   MONTHENDDATEIND      SMALLINT,
   FISCALQUARTERSTARTDATEIND SMALLINT,
   FISCALQUARTERENDDATEIND SMALLINT,
   FISCALYEARSTARTDATEIND SMALLINT,
   FISCALYEARENDDATEIND SMALLINT,
   SHORTMONTHNAME       VARCHAR2(500),
   LONGMONTHNAME        VARCHAR2(500),
   SHORTMONTHNAME_YEAR  VARCHAR2(500),
   SORTORDER            NUMBER(19,0)
);

alter table DM_DIMTIMEPERIOD
   add constraint PK_DM_DIMTIMEPERIO primary key (TIMEPERIODKEY);

/*==============================================================*/
/* Table: DM_DIMTRANSACTIONTYPE                                 */
/*==============================================================*/
create table DM_DIMTRANSACTIONTYPE  (
   DIMTRANSACTIONKEY    NUMBER(19,0)                    not null,
   CATEGORYCODE         VARCHAR2(60)                    not null,
   CATEGORYDESC         VARCHAR2(500),
   TYPECODE             VARCHAR2(60)                    not null,
   TYPEDESC             VARCHAR2(500),
   CRDRTYPE             VARCHAR2(60)                    not null
);

alter table DM_DIMTRANSACTIONTYPE
   add constraint PK_DM_DIMTRANSACTIONTYPE primary key (DIMTRANSACTIONKEY);

alter table DM_DIMTRANSACTIONTYPE
   add constraint AK_ID_2_DM_DIMTRAN unique (CATEGORYCODE, TYPECODE, CRDRTYPE);

/*==============================================================*/
/* Table: DM_DIMUTILITY                                         */
/*==============================================================*/
create table DM_DIMUTILITY  (
   DIMUTILITYKEY        NUMBER(19,0)                    not null,
   UTILITYCODE          VARCHAR2(60),
   UTILITYTYPE          VARCHAR2(500)
);

alter table DM_DIMUTILITY
   add constraint PK_DM_DIMUTILITY primary key (DIMUTILITYKEY);

alter table DM_DIMUTILITY
   add constraint AK_IDENTIFIER_2_DM_DIMUT unique (UTILITYCODE);

/*==============================================================*/
/* Table: DM_DIMYESNOINDICATOR                                  */
/*==============================================================*/
create table DM_DIMYESNOINDICATOR  (
   DIMYESNOINDICATORKEY NUMBER(19,0)                    not null,
   INDDESCRIPTION       VARCHAR2(500),
   DISPLAYNAME          VARCHAR2(500)
);

alter table DM_DIMYESNOINDICATOR
   add constraint PK_DM_DIMYESNOINDICATOR primary key (DIMYESNOINDICATORKEY);

alter table DM_DIMYESNOINDICATOR
   add constraint AK_KEY_2_DM_DIMYE unique (INDDESCRIPTION);

/*==============================================================*/
/* Table: DM_ETLCONTROL                                         */
/*==============================================================*/
create table DM_ETLCONTROL  (
   TARGETTABLENAME      VARCHAR2(500)                   not null,
   LAST_ETL_DATE        DATE                            not null,
   EXTRACTTIME          DATE,
   EXTRACTFINISH        DATE
);

alter table DM_ETLCONTROL
   add constraint PK_DM_ETLCONTROL primary key (TARGETTABLENAME);

/*==============================================================*/
/* Table: DM_FACTALLEGATION                                     */
/*==============================================================*/
create table DM_FACTALLEGATION  (
   DIMALGMETHODKEY      NUMBER(19,0)                    not null,
   DIMALGLOCATIONKEY    NUMBER(19,0)                    not null,
   DIMRECURRENCEKEY     NUMBER(19,0)                   default -1 not null,
   ALLEGATIONDATEKEY    NUMBER(19,0)                    not null,
   DIMALGTYPEKEY        NUMBER(19,0)                    not null,
   DIMRECORDSTATUSKEY   NUMBER(19,0)                    not null,
   DIMALGFINDINGKEY     NUMBER(19,0)                    not null,
   AGEGROUPKEY          NUMBER(19,0)                    not null,
   DIMALGSEVERITYKEY    NUMBER(19,0)                    not null,
   CASEID               NUMBER(19,0)                    not null,
   RELATEDCASEID        NUMBER(19,0),
   AGE                  NUMBER(19,0),
   VICTIMCONCERNROLEID  NUMBER(19,0),
   VICTIMPERSONHISTORYKEY NUMBER(19,0),
   MALTREATPERSONHISTORYKEY NUMBER(19,0),
   MALTREATCONCERNROLEID NUMBER(19,0),
   NUMPREVMALREATMENT   NUMBER(19,0),
   COUNT                NUMBER(19,0)                   default 1,
   ALLEGATIONID         NUMBER(19,0)
);

alter table DM_FACTALLEGATION
   add constraint AK_KEY_1_DM_FACTA unique (ALLEGATIONID);

/*==============================================================*/
/* Index: RELATIONSHIP_29_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_29_FK on DM_FACTALLEGATION (
   DIMALGTYPEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_189_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_189_FK on DM_FACTALLEGATION (
   DIMALGSEVERITYKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_193_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_193_FK on DM_FACTALLEGATION (
   ALLEGATIONDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_197_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_197_FK on DM_FACTALLEGATION (
   AGEGROUPKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_198_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_198_FK on DM_FACTALLEGATION (
   DIMRECORDSTATUSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_199_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_199_FK on DM_FACTALLEGATION (
   DIMALGMETHODKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_202_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_202_FK on DM_FACTALLEGATION (
   DIMRECURRENCEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_30_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_30_FK on DM_FACTALLEGATION (
   DIMALGLOCATIONKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_16_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_16_FK on DM_FACTALLEGATION (
   DIMALGFINDINGKEY ASC
);

/*==============================================================*/
/* Table: DM_FACTCASEEVENT                                      */
/*==============================================================*/
create table DM_FACTCASEEVENT  (
   DIMCASEREVIEWOUTCOMEKEY NUMBER(19,0)                    not null,
   EVENTDATEKEY         NUMBER(19,0)                    not null,
   DIMINTEGRATEDCASETYPEKEY NUMBER(19,0)                    not null,
   COUNT                NUMBER(19,0)                   default 1,
   CASEID               NUMBER(19,0)                    not null,
   CASEREFERENCENO      VARCHAR2(60),
   CASEEVENTTYPE        VARCHAR2(60)
);

alter table DM_FACTCASEEVENT
   add constraint AK_KEY_1_DM_FACTC unique (EVENTDATEKEY, DIMINTEGRATEDCASETYPEKEY, CASEID, CASEEVENTTYPE);

/*==============================================================*/
/* Index: RELATIONSHIP_76_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_76_FK on DM_FACTCASEEVENT (
   EVENTDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_178_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_178_FK on DM_FACTCASEEVENT (
   DIMCASEREVIEWOUTCOMEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_181_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_181_FK on DM_FACTCASEEVENT (
   DIMINTEGRATEDCASETYPEKEY ASC
);

/*==============================================================*/
/* Table: DM_FACTCASEHISTORY                                    */
/*==============================================================*/
create table DM_FACTCASEHISTORY  (
   ORGUNITKEY           NUMBER(19,0)                    not null,
   STARTDATEKEY         NUMBER(19,0)                    not null,
   DIMINTEGRATEDCASETYPEKEY NUMBER(19,0)                    not null,
   DIMCASETYPEKEY       NUMBER(19,0)                    not null,
   CASEOWNERKEY         NUMBER(19,0)                    not null,
   DIMPRODUCTKEY        NUMBER(19,0)                    not null,
   STATUSKEY            NUMBER(19,0)                    not null,
   DIMADDRESSKEY        NUMBER(19,0)                    not null,
   ENDDATEKEY           NUMBER(19,0)                    not null,
   DIMPROGRAMKEY        NUMBER(19,0)                    not null,
   CASESUPERKEY         NUMBER(19,0)                    not null,
   CASEID               NUMBER(19,0)                    not null,
   DESCRIPTION          VARCHAR2(500),
   COUNT                NUMBER(19,0)                   default 1,
   CASEREFERENCENO      VARCHAR2(60),
   LASTWRITTEN          DATE
);

alter table DM_FACTCASEHISTORY
   add constraint AK_FACTCASEHIST1 unique (STARTDATEKEY, STATUSKEY, CASEID);

/*==============================================================*/
/* Index: POINTINTTIME_FK                                       */
/*==============================================================*/
create index POINTINTTIME_FK on DM_FACTCASEHISTORY (
   STARTDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATESTO_FK                                          */
/*==============================================================*/
create index RELATESTO_FK on DM_FACTCASEHISTORY (
   STATUSKEY ASC
);

/*==============================================================*/
/* Index: OWNEDBYORG_FK                                         */
/*==============================================================*/
create index OWNEDBYORG_FK on DM_FACTCASEHISTORY (
   ORGUNITKEY ASC
);

/*==============================================================*/
/* Index: PRODUCT_FK                                            */
/*==============================================================*/
create index PRODUCT_FK on DM_FACTCASEHISTORY (
   DIMPRODUCTKEY ASC
);

/*==============================================================*/
/* Index: RELATESTO25_FK                                        */
/*==============================================================*/
create index RELATESTO25_FK on DM_FACTCASEHISTORY (
   ENDDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_131_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_131_FK on DM_FACTCASEHISTORY (
   CASEOWNERKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_154_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_154_FK on DM_FACTCASEHISTORY (
   DIMADDRESSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_156_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_156_FK on DM_FACTCASEHISTORY (
   DIMPROGRAMKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_DIMSUPER_FK                              */
/*==============================================================*/
create index RELATIONSHIP_DIMSUPER_FK on DM_FACTCASEHISTORY (
   CASESUPERKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_174_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_174_FK on DM_FACTCASEHISTORY (
   DIMCASETYPEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_188_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_188_FK on DM_FACTCASEHISTORY (
   DIMINTEGRATEDCASETYPEKEY ASC
);

/*==============================================================*/
/* Table: DM_FACTCASEPARTICIPANT                                */
/*==============================================================*/
create table DM_FACTCASEPARTICIPANT  (
   ACTIVESTARTDATEKEY   NUMBER(19,0)                    not null,
   DIMCASEPARTROLEID    NUMBER(19,0)                    not null,
   ISMASTERKEY          NUMBER(19,0)                    not null,
   PERSONHISTORYKEY     NUMBER(19,0)                    not null,
   RELATIONSHIPTYPEKEY  NUMBER(19,0)                    not null,
   MASTERPERSONHISTORYKEY NUMBER(19,0)                    not null,
   DIMPRODUCTKEY        NUMBER(19,0)                    not null,
   ACTIVEENDDATEKEY     NUMBER(19,0)                    not null,
   CASEID               NUMBER(19,0)                    not null,
   PRIMCLIENTCASEPARTROLEID NUMBER(19,0),
   CASEREFERENCENO      VARCHAR2(60),
   COUNT                NUMBER(19,0)                   default 1
);

alter table DM_FACTCASEPARTICIPANT
   add constraint AK_CASEPARTICIPANT unique (CASEID, DIMCASEPARTROLEID, PERSONHISTORYKEY);

/*==============================================================*/
/* Index: RELATIONSHIP_66_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_66_FK on DM_FACTCASEPARTICIPANT (
   DIMPRODUCTKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_68_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_68_FK on DM_FACTCASEPARTICIPANT (
   ACTIVESTARTDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_128_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_128_FK on DM_FACTCASEPARTICIPANT (
   DIMCASEPARTROLEID ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_153_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_153_FK on DM_FACTCASEPARTICIPANT (
   RELATIONSHIPTYPEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_167_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_167_FK on DM_FACTCASEPARTICIPANT (
   PERSONHISTORYKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_168_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_168_FK on DM_FACTCASEPARTICIPANT (
   MASTERPERSONHISTORYKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_169_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_169_FK on DM_FACTCASEPARTICIPANT (
   ACTIVEENDDATEKEY ASC
);

/*==============================================================*/
/* Table: DM_FACTCONTACT                                        */
/*==============================================================*/
create table DM_FACTCONTACT  (
   CONTACTLOGID         NUMBER(19,0)                    not null,
   CONTACTCOMPLIANCEINFOID NUMBER(19,0)                    not null,
   CASEID               NUMBER(19,0)                    not null,
   CONCERNROLEID        NUMBER(19,0)                    not null,
   PERSONHISTORYKEY     NUMBER(19,0)                    not null,
   DIMCOMPLIANCETYPEKEY NUMBER(19,0)                    not null,
   DIMCONTACTLOCATIONKEY NUMBER(19,0)                    not null,
   DIMCONTACTTYPEKEY    NUMBER(19,0)                    not null,
   DIMCONTACTMETHODKEY  NUMBER(19,0)                    not null,
   DIMCOMPLIANCESTATUSKEY NUMBER(19,0)                    not null,
   DIMRESPONSEPRIORITYKEY NUMBER(19,0)                    not null,
   DIMFREQUENCYCRITERIAKEY NUMBER(19,0)                    not null,
   DIMAGEGROUPKEY       NUMBER(19,0)                    not null,
   DIMTARGETDATEKEY     NUMBER(19,0)                    not null,
   DIMCONTACTDATEKEY    NUMBER(19,0)                    not null,
   DIMRECORDSTATUSKEY   NUMBER(19,0)                    not null,
   COUNT                NUMBER(19,0)                   default 1 not null,
   AGE                  NUMBER(19,0),
   DIMREPORTINGTIMELINESSKEY NUMBER(19,0)                    not null,
   DIMREPORTEDDATEKEY   NUMBER(19,0)                    not null,
   REPORTEDLATEDURATION NUMBER(19,0)
);

alter table DM_FACTCONTACT
   add constraint AK_IDENTIFIER_1_DM_FACTC unique (CONTACTLOGID, CONTACTCOMPLIANCEINFOID);

/*==============================================================*/
/* Index: RELATIONSHIP_20_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_20_FK on DM_FACTCONTACT (
   DIMFREQUENCYCRITERIAKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_194_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_194_FK on DM_FACTCONTACT (
   DIMAGEGROUPKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_196_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_196_FK on DM_FACTCONTACT (
   DIMCOMPLIANCETYPEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_205_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_205_FK on DM_FACTCONTACT (
   DIMRECORDSTATUSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_145_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_145_FK on DM_FACTCONTACT (
   DIMREPORTINGTIMELINESSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_146_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_146_FK on DM_FACTCONTACT (
   DIMREPORTEDDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_200_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_200_FK on DM_FACTCONTACT (
   DIMTARGETDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_14_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_14_FK on DM_FACTCONTACT (
   DIMCOMPLIANCESTATUSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_204_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_204_FK on DM_FACTCONTACT (
   DIMRESPONSEPRIORITYKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_12_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_12_FK on DM_FACTCONTACT (
   DIMCONTACTTYPEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_11_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_11_FK on DM_FACTCONTACT (
   DIMCONTACTLOCATIONKEY ASC
);

/*==============================================================*/
/* Table: DM_FACTEDUCATIONHISTORY                               */
/*==============================================================*/
create table DM_FACTEDUCATIONHISTORY  (
   DIMEDUCATIONKEY      NUMBER(19,0)                    not null,
   DIMPARTICIPANTSTATUSKEY NUMBER(19,0)                    not null,
   STARTDATEKEY         NUMBER(19,0)                    not null,
   ENDDATEKEY           NUMBER(19,0)                    not null,
   REGDATEKEY           NUMBER(19,0)                    not null,
   DATEOFBIRTHKEY       NUMBER(19,0)                    not null,
   CONCERNROLEID        NUMBER(19,0)                    not null,
   COUNT                NUMBER(19,0)                   default 1
);

/*==============================================================*/
/* Index: RELATIONSHIP_61_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_61_FK on DM_FACTEDUCATIONHISTORY (
   STARTDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_62_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_62_FK on DM_FACTEDUCATIONHISTORY (
   DATEOFBIRTHKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_63_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_63_FK on DM_FACTEDUCATIONHISTORY (
   ENDDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_64_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_64_FK on DM_FACTEDUCATIONHISTORY (
   REGDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_102_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_102_FK on DM_FACTEDUCATIONHISTORY (
   DIMEDUCATIONKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_104_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_104_FK on DM_FACTEDUCATIONHISTORY (
   DIMPARTICIPANTSTATUSKEY ASC
);

/*==============================================================*/
/* Table: DM_FACTEMPLOYERHISTORY                                */
/*==============================================================*/
create table DM_FACTEMPLOYERHISTORY  (
   DIMADDRESSKEY        NUMBER(19,0)                    not null,
   STARTDATEKEY         NUMBER(19,0)                    not null,
   ENDDATEKEY           NUMBER(19,0)                    not null,
   DIMPARTICIPANTSTATUSKEY NUMBER(19,0)                    not null,
   DIMINDUSTRYTYPEKEY   NUMBER(19,0)                    not null,
   REGISTRATIONDATEKEY  NUMBER(19,0)                    not null,
   CONCERNROLEID        NUMBER(19,0)                    not null,
   COUNT                NUMBER(19,0)                   default 1
);

alter table DM_FACTEMPLOYERHISTORY
   add constraint AK_EMPLOYERHIST unique (DIMADDRESSKEY, STARTDATEKEY, DIMPARTICIPANTSTATUSKEY, CONCERNROLEID);

/*==============================================================*/
/* Index: RELATIONSHIP_42_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_42_FK on DM_FACTEMPLOYERHISTORY (
   DIMADDRESSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_43_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_43_FK on DM_FACTEMPLOYERHISTORY (
   DIMINDUSTRYTYPEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_86_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_86_FK on DM_FACTEMPLOYERHISTORY (
   DIMPARTICIPANTSTATUSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_87_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_87_FK on DM_FACTEMPLOYERHISTORY (
   REGISTRATIONDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_88_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_88_FK on DM_FACTEMPLOYERHISTORY (
   ENDDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_89_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_89_FK on DM_FACTEMPLOYERHISTORY (
   STARTDATEKEY ASC
);

/*==============================================================*/
/* Table: DM_FACTINVESTIGATION                                  */
/*==============================================================*/
create table DM_FACTINVESTIGATION  (
   DIMINVSUBTYPEKEY     NUMBER(19,0)                    not null,
   DIMRECOMMENDATIONDATEKEY NUMBER(19,0)                    not null,
   DIMMEETMILESTONEDURINDKEY NUMBER(19,0)                    not null,
   DIMMILESTONEDURATIONKEY NUMBER(19,0)                    not null,
   DIMSTARTDATEKEY      NUMBER(19,0)                    not null,
   DIMINVRECOMMENDATIONKEY NUMBER(19,0)                    not null,
   DIMOUTCOMEKEY        NUMBER(19,0)                    not null,
   DIMRESOLUTIONSTATUSKEY NUMBER(19,0)                    not null,
   COUNTER              NUMBER(19,0),
   CASEID               NUMBER(19,0)                    not null,
   RELATEDCASEID        NUMBER(19,0)
);

alter table DM_FACTINVESTIGATION
   add constraint AK_KEY_1_DM_FACTI2 unique (CASEID);

/*==============================================================*/
/* Index: RELATIONSHIP_15_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_15_FK on DM_FACTINVESTIGATION (
   DIMINVSUBTYPEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_201_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_201_FK on DM_FACTINVESTIGATION (
   DIMRESOLUTIONSTATUSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_21_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_21_FK on DM_FACTINVESTIGATION (
   DIMINVRECOMMENDATIONKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_22_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_22_FK on DM_FACTINVESTIGATION (
   DIMOUTCOMEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_25_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_25_FK on DM_FACTINVESTIGATION (
   DIMSTARTDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_26_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_26_FK on DM_FACTINVESTIGATION (
   DIMRECOMMENDATIONDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_27_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_27_FK on DM_FACTINVESTIGATION (
   DIMMEETMILESTONEDURINDKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_28_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_28_FK on DM_FACTINVESTIGATION (
   DIMMILESTONEDURATIONKEY ASC
);

/*==============================================================*/
/* Table: DM_FACTPAYMENTS                                       */
/*==============================================================*/
create table DM_FACTPAYMENTS  (
   DIMDEDUCTIONKEY      NUMBER(19,0)                    not null,
   DIMFINSTATUSKEY      NUMBER(19,0)                    not null,
   DIMDELIVERYMETHODKEY NUMBER(19,0)                    not null,
   DIMPROGRAMKEY        NUMBER(19,0)                    not null,
   DIMTRANSACTIONKEY    NUMBER(19,0)                    not null,
   ORGUNITKEY           NUMBER(19,0)                    not null,
   EFFECTIVEDATEKEY     NUMBER(19,0)                    not null,
   DIMPRODUCTKEY        NUMBER(19,0)                    not null,
   GAURDIANFLAG         CHAR(1)                        default 'N',
   REGENERATEDFLAG      CHAR(1)                        default 'N',
   CASEID               NUMBER(19,0)                    not null,
   CONCERNROLEID        NUMBER(19,0)                    not null,
   PERSONHISTORYID      NUMBER(19,0),
   INSTRUCTLINEITEMID   NUMBER(19,0)                    not null,
   AMOUNT               NUMBER(31,2),
   UNPROCESSEDAMOUNT    NUMBER(31,2),
   COUNT                NUMBER(19,0)                   default 1
);

alter table DM_FACTPAYMENTS
   add constraint AK_FACTPAY unique (INSTRUCTLINEITEMID);

/*==============================================================*/
/* Index: RELATIONSHIP_106_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_106_FK on DM_FACTPAYMENTS (
   EFFECTIVEDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_108_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_108_FK on DM_FACTPAYMENTS (
   ORGUNITKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_113_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_113_FK on DM_FACTPAYMENTS (
   DIMPRODUCTKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_109_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_109_FK on DM_FACTPAYMENTS (
   DIMFINSTATUSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_111_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_111_FK on DM_FACTPAYMENTS (
   DIMDELIVERYMETHODKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_112_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_112_FK on DM_FACTPAYMENTS (
   DIMDEDUCTIONKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_116_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_116_FK on DM_FACTPAYMENTS (
   DIMTRANSACTIONKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_159_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_159_FK on DM_FACTPAYMENTS (
   DIMPROGRAMKEY ASC
);

/*==============================================================*/
/* Table: DM_FACTPERSONHISTORY                                  */
/*==============================================================*/
create table DM_FACTPERSONHISTORY  (
   PERSONHISTORYKEY     NUMBER(19,0)                    not null,
   STARTDATEKEY         NUMBER(19,0)                    not null,
   ENDDATEKEY           NUMBER(19,0)                    not null,
   DIMMARITALSTATUSKEY  NUMBER(19,0)                    not null,
   DIMCOUNTRYKEY        NUMBER(19,0)                    not null,
   DATEOFBIRTHKEY       NUMBER(19,0)                    not null,
   DIMMERGESTATUSKEY    NUMBER(19,0)                    not null,
   DIMPARTICIPANTSTATUSKEY NUMBER(19,0)                    not null,
   DIMDUPREASONKEY      NUMBER(19,0)                    not null,
   DIMPREFERREDLANGUAGEKEY NUMBER(19,0)                    not null,
   REGISTRATIONDATEKEY  NUMBER(19,0)                    not null,
   DIMADDRESSKEY        NUMBER(19,0)                    not null,
   DIMGENDERKEY         NUMBER(19,0)                    not null,
   DIMDUPSTATUSKEY      NUMBER(19,0)                    not null,
   DIMETHNICITYKEY      NUMBER(19,0)                    not null,
   DIMPERSONTYPEKEY     NUMBER(19,0)                    not null,
   DUPLICATEDATEKEY     NUMBER(19,0)                    not null,
   DIMCONSTSTATKEY      NUMBER(19,0)                    not null,
   CONCERNROLEID        NUMBER(19,0)                    not null,
   MASTERCONCERNROLEID  NUMBER(19,0),
   SSN                  VARCHAR2(30),
   FIRSTNAME            VARCHAR2(500),
   LASTNAME             VARCHAR2(500),
   COUNT                NUMBER(19,0)                   default 1,
   DIMCONCERNROLEALTID  NUMBER(19,0),
   DIMINDIGENOUSGROUPKEY NUMBER(19,0)                   default -1 not null,
   DIMRACEKEY           NUMBER(19,0)                   default -1 not null,
   DIMNATIONALITYKEY    NUMBER(19,0)                   default -1 not null
);

alter table DM_FACTPERSONHISTORY
   add constraint AK_PERSONHISTORY primary key (PERSONHISTORYKEY);

/*==============================================================*/
/* Index: RELATIONSHIP_32_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_32_FK on DM_FACTPERSONHISTORY (
   DIMGENDERKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_33_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_33_FK on DM_FACTPERSONHISTORY (
   DIMCOUNTRYKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_34_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_34_FK on DM_FACTPERSONHISTORY (
   DIMPREFERREDLANGUAGEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_36_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_36_FK on DM_FACTPERSONHISTORY (
   DIMMARITALSTATUSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_37_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_37_FK on DM_FACTPERSONHISTORY (
   DIMPARTICIPANTSTATUSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_82_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_82_FK on DM_FACTPERSONHISTORY (
   ENDDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_83_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_83_FK on DM_FACTPERSONHISTORY (
   DATEOFBIRTHKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_84_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_84_FK on DM_FACTPERSONHISTORY (
   REGISTRATIONDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_85_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_85_FK on DM_FACTPERSONHISTORY (
   STARTDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_126_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_126_FK on DM_FACTPERSONHISTORY (
   DIMETHNICITYKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_133_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_133_FK on DM_FACTPERSONHISTORY (
   DIMADDRESSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_157_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_157_FK on DM_FACTPERSONHISTORY (
   DIMMERGESTATUSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_163_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_163_FK on DM_FACTPERSONHISTORY (
   DIMDUPSTATUSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_164_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_164_FK on DM_FACTPERSONHISTORY (
   DIMDUPREASONKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_165_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_165_FK on DM_FACTPERSONHISTORY (
   DIMPERSONTYPEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_170_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_170_FK on DM_FACTPERSONHISTORY (
   DUPLICATEDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_186_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_186_FK on DM_FACTPERSONHISTORY (
   DIMINDIGENOUSGROUPKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_166_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_166_FK on DM_FACTPERSONHISTORY (
   DIMRACEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_190_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_190_FK on DM_FACTPERSONHISTORY (
   DIMNATIONALITYKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_147_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_147_FK on DM_FACTPERSONHISTORY (
   DIMCONSTSTATKEY ASC
);

/*==============================================================*/
/* Table: DM_FACTPRODUCTAWARD                                   */
/*==============================================================*/
create table DM_FACTPRODUCTAWARD  (
   DIMPROGRAMKEY        NUMBER(19,0)                    not null,
   STARTDATEKEY         NUMBER(19,0)                    not null,
   DIMNUMOFPARENTSKEY   NUMBER(19,0)                    not null,
   DIMPRODUCTKEY        NUMBER(19,0)                    not null,
   DIMASSISTANCESTATUSKEY NUMBER(19,0)                    not null,
   ENDDATEKEY           NUMBER(19,0)                    not null,
   CASEID               NUMBER(19,0)                    not null,
   NUMOFCHILDREN        NUMBER(19,0),
   NUMOFADULTS          NUMBER(19,0),
   INTEGRATEDCASEID     NUMBER(19,0),
   FEDBENEFITIND        CHAR(1),
   CHILDSUPPORTAMOUNT   NUMBER(31,2),
   CASHRESOURCESAMOUNT  NUMBER(31,2),
   UNEARNEDINCOMEAMOUNT NUMBER(31,2),
   EARNEDINCOMEAMOUNT   NUMBER(31,2),
   SANCTIONIND          CHAR(1),
   COUNT                NUMBER(19,0)                   default 1,
   PRIMARYMASIND        CHAR(1)
);

/*==============================================================*/
/* Index: RELATIONSHIP_142_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_142_FK on DM_FACTPRODUCTAWARD (
   STARTDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_143_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_143_FK on DM_FACTPRODUCTAWARD (
   ENDDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_144_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_144_FK on DM_FACTPRODUCTAWARD (
   DIMASSISTANCESTATUSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_148_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_148_FK on DM_FACTPRODUCTAWARD (
   DIMNUMOFPARENTSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_149_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_149_FK on DM_FACTPRODUCTAWARD (
   DIMPROGRAMKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_150_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_150_FK on DM_FACTPRODUCTAWARD (
   DIMPRODUCTKEY ASC
);

/*==============================================================*/
/* Table: DM_FACTPRODUCTAWARDRECIPIENT                          */
/*==============================================================*/
create table DM_FACTPRODUCTAWARDRECIPIENT  (
   ENDDATEKEY           NUMBER(19,0)                    not null,
   RELATIONSHIPTYPEKEY  NUMBER(19,0)                    not null,
   AGEGROUPKEY          NUMBER(19,0)                    not null,
   DIMCHILDSUPPORTENFORCETYPEKEY NUMBER(19,0)                    not null,
   DIMMASKEY            NUMBER(19,0)                    not null,
   PERSONHISTORYKEY     NUMBER(19,0)                    not null,
   DIMEDUCATIONLEVELKEY NUMBER(19,0)                    not null,
   DIMPRODUCTKEY        NUMBER(19,0)                    not null,
   DIMPROGRAMKEY        NUMBER(19,0)                    not null,
   DIMEMPLOYMENTSTATUSKEY NUMBER(19,0)                    not null,
   DIMBOEKEY            NUMBER(19,0)                    not null,
   DIMDUALKEY           NUMBER(19,0)                    not null,
   STARTDATEKEY         NUMBER(19,0)                    not null,
   DIMSUBSIDIZEDHOUSINGTYPEKEY NUMBER(19,0)                    not null,
   CASEID               NUMBER(19,0)                    not null,
   CONCERNROLEID        NUMBER(19,0)                    not null,
   ADULTIND             CHAR(1),
   PARENTIND            CHAR(1),
   SANCTIONIND          CHAR(1),
   FEDBENEFITIND        CHAR(1),
   AGE                  NUMBER(19,0),
   INTEGRATEDCASEID     NUMBER(19,0),
   CHILDSUPPORTAMOUNT   NUMBER(31,2),
   CASHRESOURCESAMOUNT  NUMBER(31,2),
   UNEARNEDINCOMEAMOUNT NUMBER(31,2),
   EARNEDINCOMEAMOUNT   NUMBER(31,2),
   COUNT                NUMBER(19,0)                   default 1,
   PRIMARYMASIND        CHAR(1)
);

/*==============================================================*/
/* Index: RELATIONSHIP_151_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_151_FK on DM_FACTPRODUCTAWARDRECIPIENT (
   AGEGROUPKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_152_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_152_FK on DM_FACTPRODUCTAWARDRECIPIENT (
   DIMMASKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_155_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_155_FK on DM_FACTPRODUCTAWARDRECIPIENT (
   DIMBOEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_182_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_182_FK on DM_FACTPRODUCTAWARDRECIPIENT (
   DIMCHILDSUPPORTENFORCETYPEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_184_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_184_FK on DM_FACTPRODUCTAWARDRECIPIENT (
   RELATIONSHIPTYPEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_185_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_185_FK on DM_FACTPRODUCTAWARDRECIPIENT (
   DIMDUALKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_187_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_187_FK on DM_FACTPRODUCTAWARDRECIPIENT (
   DIMSUBSIDIZEDHOUSINGTYPEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_206_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_206_FK on DM_FACTPRODUCTAWARDRECIPIENT (
   DIMEMPLOYMENTSTATUSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_207_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_207_FK on DM_FACTPRODUCTAWARDRECIPIENT (
   DIMEDUCATIONLEVELKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_208_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_208_FK on DM_FACTPRODUCTAWARDRECIPIENT (
   ENDDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_209_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_209_FK on DM_FACTPRODUCTAWARDRECIPIENT (
   STARTDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_210_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_210_FK on DM_FACTPRODUCTAWARDRECIPIENT (
   DIMPROGRAMKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_211_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_211_FK on DM_FACTPRODUCTAWARDRECIPIENT (
   DIMPRODUCTKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_212_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_212_FK on DM_FACTPRODUCTAWARDRECIPIENT (
   PERSONHISTORYKEY ASC
);

/*==============================================================*/
/* Table: DM_FACTPRODUCTPROVIDERHISTORY                         */
/*==============================================================*/
create table DM_FACTPRODUCTPROVIDERHISTORY  (
   DIMPRODUCTKEY        NUMBER(19,0)                    not null,
   DIMPARTICIPANTSTATUSKEY NUMBER(19,0)                    not null,
   STARTDATEKEY         NUMBER(19,0)                    not null,
   ENDDATEKEY           NUMBER(19,0)                    not null,
   REGISTRATIONDATEKEY  NUMBER(19,0)                    not null,
   DIMADDRESSKEY        NUMBER(19,0)                    not null,
   DIMPROGRAMKEY        NUMBER(19,0)                    not null,
   CONCERNROLEID        NUMBER(19,0)                    not null,
   COUNT                NUMBER(19,0)                   default 1
);

alter table DM_FACTPRODUCTPROVIDERHISTORY
   add constraint AK_PRODPROVHIST unique (DIMPRODUCTKEY, DIMPARTICIPANTSTATUSKEY, STARTDATEKEY, DIMADDRESSKEY, CONCERNROLEID);

/*==============================================================*/
/* Index: RELATIONSHIP_100_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_100_FK on DM_FACTPRODUCTPROVIDERHISTORY (
   STARTDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_101_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_101_FK on DM_FACTPRODUCTPROVIDERHISTORY (
   REGISTRATIONDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_103_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_103_FK on DM_FACTPRODUCTPROVIDERHISTORY (
   DIMPRODUCTKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_105_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_105_FK on DM_FACTPRODUCTPROVIDERHISTORY (
   DIMPARTICIPANTSTATUSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_59_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_59_FK on DM_FACTPRODUCTPROVIDERHISTORY (
   ENDDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_58_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_58_FK on DM_FACTPRODUCTPROVIDERHISTORY (
   DIMADDRESSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_160_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_160_FK on DM_FACTPRODUCTPROVIDERHISTORY (
   DIMPROGRAMKEY ASC
);

/*==============================================================*/
/* Table: DM_FACTPROGRAMAPPLICATION                             */
/*==============================================================*/
create table DM_FACTPROGRAMAPPLICATION  (
   INTAKEPROGRAMAPPLICATIONID NUMBER(19,0)                    not null,
   DIMDENIALREASONKEY   NUMBER(19,0),
   DIMINTAKETYPEKEY     NUMBER(19,0)                    not null,
   DIMINTAKECATEGORYKEY NUMBER(19,0)                    not null,
   DIMRESPONSEPRIORITYKEY NUMBER(19,0)                    not null,
   DIMCONTACTTYPEKEY    NUMBER(19,0)                    not null,
   DIMTIMELINESSKEY     NUMBER(19,0)                    not null,
   DISPOSITIONKEY       NUMBER(19,0)                    not null,
   INTAKESTARTDATEKEY   NUMBER(19,0)                    not null,
   DIMCONTACTMETHODKEY  NUMBER(19,0)                    not null,
   DIMRECOMMENDATIONKEY NUMBER(19,0)                    not null,
   DISPOSEDDATEKEY      NUMBER(19,0)                    not null,
   RESPONDSWITHINTIMEKEY NUMBER(19,0)                    not null,
   HOUROFDAY            NUMBER(19,0)                   
      constraint CKC_HOUROFDAY_DM_F check (HOUROFDAY is null or (HOUROFDAY between -1 and 23)),
   CASEID               NUMBER(19,0),
   INTAKEAPPLICATIONID  NUMBER(19,0),
   ENTEREDBYUSER        VARCHAR(64),
   NUMHOURSTODISPOSE    NUMBER(19,0),
   NUMALLEGATIONS       NUMBER(19,0),
   COUNT                NUMBER(19,0)                   default 1,
   NUMHOURSTOREC        NUMBER(19,0)
);

alter table DM_FACTPROGRAMAPPLICATION
   add constraint PK_DM_FACTPROGRAMA primary key (INTAKEPROGRAMAPPLICATIONID);

/*==============================================================*/
/* Index: RELATIONSHIP_161_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_161_FK on DM_FACTPROGRAMAPPLICATION (
   DISPOSITIONKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_171_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_171_FK on DM_FACTPROGRAMAPPLICATION (
   INTAKESTARTDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_172_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_172_FK on DM_FACTPROGRAMAPPLICATION (
   DISPOSEDDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_176_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_176_FK on DM_FACTPROGRAMAPPLICATION (
   RESPONDSWITHINTIMEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_177_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_177_FK on DM_FACTPROGRAMAPPLICATION (
   DIMINTAKETYPEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_173_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_173_FK on DM_FACTPROGRAMAPPLICATION (
   DIMTIMELINESSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_191_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_191_FK on DM_FACTPROGRAMAPPLICATION (
   DIMCONTACTMETHODKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_192_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_192_FK on DM_FACTPROGRAMAPPLICATION (
   DIMCONTACTTYPEKEY ASC
);

/*==============================================================*/
/* Table: DM_FACTSERVICESUPPLIERHISTORY                         */
/*==============================================================*/
create table DM_FACTSERVICESUPPLIERHISTORY  (
   STARTDATEKEY         NUMBER(19,0)                    not null,
   DIMADDRESSKEY        NUMBER(19,0)                    not null,
   ENDDATEKEY           NUMBER(19,0)                    not null,
   DIMSERVICEKEY        NUMBER(19,0)                    not null,
   REGISTRATIONDATEKEY  NUMBER(19,0)                    not null,
   DIMPARTICIPANTSTATUSKEY NUMBER(19,0)                    not null,
   CONCERNROLEID        NUMBER(19,0)                    not null,
   COUNT                NUMBER(19,0)                   default 1
);

alter table DM_FACTSERVICESUPPLIERHISTORY
   add constraint AK_SERVICESUPPHIST unique (STARTDATEKEY, DIMADDRESSKEY, DIMSERVICEKEY, DIMPARTICIPANTSTATUSKEY, CONCERNROLEID);

/*==============================================================*/
/* Index: RELATIONSHIP_49_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_49_FK on DM_FACTSERVICESUPPLIERHISTORY (
   DIMSERVICEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_90_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_90_FK on DM_FACTSERVICESUPPLIERHISTORY (
   DIMADDRESSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_91_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_91_FK on DM_FACTSERVICESUPPLIERHISTORY (
   ENDDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_92_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_92_FK on DM_FACTSERVICESUPPLIERHISTORY (
   REGISTRATIONDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_93_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_93_FK on DM_FACTSERVICESUPPLIERHISTORY (
   STARTDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_94_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_94_FK on DM_FACTSERVICESUPPLIERHISTORY (
   DIMPARTICIPANTSTATUSKEY ASC
);

/*==============================================================*/
/* Table: DM_FACTSUSPENSE                                       */
/*==============================================================*/
create table DM_FACTSUSPENSE  (
   RECEIVEDDATEKEY      NUMBER(19,0)                    not null,
   DIMPAYMETHODKEY      NUMBER(19,0)                    not null,
   AMOUNT               NUMBER(31,2),
   COUNT                NUMBER(19,0)                   default 1
);

/*==============================================================*/
/* Index: RELATIONSHIP_125_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_125_FK on DM_FACTSUSPENSE (
   RECEIVEDDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_127_FK                                   */
/*==============================================================*/
create index RELATIONSHIP_127_FK on DM_FACTSUSPENSE (
   DIMPAYMETHODKEY ASC
);

/*==============================================================*/
/* Table: DM_FACTUTILITYHISTORY                                 */
/*==============================================================*/
create table DM_FACTUTILITYHISTORY  (
   DIMPARTICIPANTSTATUSKEY NUMBER(19,0)                    not null,
   REGISTRATIONDATEKEY  NUMBER(19,0)                    not null,
   DIMADDRESSKEY        NUMBER(19,0)                    not null,
   DIMUTILITYKEY        NUMBER(19,0)                    not null,
   STARTDATEKEY         NUMBER(19,0)                    not null,
   ENDDATEKEY           NUMBER(19,0)                    not null,
   CONCERNROLEID        NUMBER(19,0)                    not null,
   COUNT                NUMBER(19,0)                   default 1
);

alter table DM_FACTUTILITYHISTORY
   add constraint AK_IDENTIFIER_1_DM_FACTU unique (DIMPARTICIPANTSTATUSKEY, DIMADDRESSKEY, STARTDATEKEY, CONCERNROLEID);

/*==============================================================*/
/* Index: RELATIONSHIP_60_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_60_FK on DM_FACTUTILITYHISTORY (
   DIMUTILITYKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_95_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_95_FK on DM_FACTUTILITYHISTORY (
   STARTDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_96_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_96_FK on DM_FACTUTILITYHISTORY (
   ENDDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_97_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_97_FK on DM_FACTUTILITYHISTORY (
   REGISTRATIONDATEKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_98_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_98_FK on DM_FACTUTILITYHISTORY (
   DIMPARTICIPANTSTATUSKEY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_99_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_99_FK on DM_FACTUTILITYHISTORY (
   DIMADDRESSKEY ASC
);

/*==============================================================*/
/* View: DM_FACTCASEDIMENSIONVIEW                               */
/*==============================================================*/
create or replace view DM_FACTCASEDIMENSIONVIEW as
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

/*==============================================================*/
/* View: DM_FACTCASEHISTORYACTIVEVIEW                           */
/*==============================================================*/
create or replace view DM_FACTCASEHISTORYACTIVEVIEW as
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

/*==============================================================*/
/* View: DM_FACTCASEPARTICIPANTVIEW                             */
/*==============================================================*/
create or replace view DM_FACTCASEPARTICIPANTVIEW as
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

/*==============================================================*/
/* View: DM_FACTINTAKEVIEW                                      */
/*==============================================================*/
create or replace view DM_FACTINTAKEVIEW as
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
   (dm_getsecondsbetween(dm_getDateTime(), t3.daydate + t1.hourofday )/60/60) - t4.CODE  as HOURSMINUSDEADLINE
from
   DM_FACTPROGRAMAPPLICATION t1,
   DM_FACTCASEDIMENSIONVIEW t2,
   DM_DIMTIMEPERIOD t3,
   DM_DIMRESPONDSWITHINTIME t4
where
   t1.CASEID = t2.CASEID
   and t1.INTAKESTARTDATEKEY = t3.TIMEPERIODKEY
   and t1.RESPONDSWITHINTIMEKEY = t4.RESPONDSWITHINTIMEKEY;

/*==============================================================*/
/* View: DM_VM_NOEDUCATION                                      */
/*==============================================================*/
create or replace view DM_VM_NOEDUCATION as
select -1 as DIMEDUCATIONKEY, 'UNDEFINED' as QUALIFICATION from DUAL UNION ALL SELECT DIMEDUCATIONKEY, QUALIFICATION FROM DM_DIMEDUCATION;

/*==============================================================*/
/* View: DM_VM_PRODUCT                                          */
/*==============================================================*/
create or replace view DM_VM_PRODUCT(DIMPRODUCTKEY, PRODUCTID, NAME, PRODUCTTYPE) as
select DIMPRODUCTKEY, DWPRODUCTID, NAME, PRODUCTTYPE from DM_DIMPRODUCT;

/*==============================================================*/
/* View: DM_VW_PERSONHISTORY                                    */
/*==============================================================*/
create or replace view DM_VW_PERSONHISTORY(PERSONHISTORYKEY, STARTDATEKEY, ENDDATEKEY, DIMMARITALSTATUSKEY, DIMCOUNTRYKEY, DIMPARTICIPANTSTATUSKEY, DIMPREFERREDLANGUAGEKEY, REGISTRATIONDATEKEY, DIMADDRESSKEY, DIMGENDERKEY, DIMETHNICITYKEY, DIMMERGESTATUSKEY, DIMDUPREASONKEY, DIMDUPSTATUSKEY, DIMPERSONTYPEKEY, DUPLICATEDATEKEY, SSN, FIRSTNAME, LASTNAME, DIMINDIGENOUSGROUPKEY, DIMRACEKEY, DIMCONSTSTATKEY, DIMNATIONALITYKEY, CONCERNROLEID, MASTERCONCERNROLEID, AGEGROUPS, AGEID) as
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
   DM_CALCULATEAGE(TIMEPERIOD.DAYDATE, SYSDATE ) as AGEGROUPS,
   dm_findagegroupkey('Core', dm_calculateage(timeperiod.daydate, dm_getDateTime()), 'Core') as AGEID
from
   DM_FACTPERSONHISTORY PERSON,
   DM_DIMTIMEPERIOD TIMEPERIOD
where
   PERSON.DATEOFBIRTHKEY=TIMEPERIOD.TIMEPERIODKEY;

/*==============================================================*/
/* View: DM_VW_PERSON_CASE                                      */
/*==============================================================*/
create or replace view DM_VW_PERSON_CASE(CONCERNROLEID, MASTERCONCERNROLEID, TIMEPERIODKEY, PRODUCTKEY, GENDERKEY, CASEID, AGEGROUP, ROLETYPE, STATUSKEY) as
select
   PERSON.CONCERNROLEID as CONCERNROLEID,
   PERSON.MASTERCONCERNROLEID as MASTERCONCERNROLEID,
   DMTIME.TIMEPERIODKEY as TIMEPERIODKEY,
   CASE.DIMPRODUCTKEY as PRODUCTKEY,
   PERSON.DIMGENDERKEY as GENDERKEY,
   CASE.CASEID as CASEID,
   (SELECT (SELECT GROUPNAME FROM DM_AGEGROUPS WHERE ROUND(MONTHS_BETWEEN(dm_getDateTime(),CASEDATE.DAYDATE)/12) BETWEEN STARTAGE AND ENDAGE AND PROGRAMCODE='Core') FROM DM_DIMTIMEPERIOD CASEDATE WHERE PERSON.DATEOFBIRTHKEY=CASEDATE.TIMEPERIODKEY) as AGEGROUPS,
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

/*==============================================================*/
/* View: DM_VW_PERSON_EDUCATION                                 */
/*==============================================================*/
create or replace view DM_VW_PERSON_EDUCATION as
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
   add constraint FK_AGGCASEDAY_PRODUCT foreign key (DIMPRODUCTKEY)
      references DM_DIMPRODUCT (DIMPRODUCTKEY);

alter table DM_AGGCASEDAY
   add constraint FK_AGGCASEDAY_ORGUNIT foreign key (ORGUNITKEY)
      references DM_DIMORGUNIT (ORGUNITKEY);

alter table DM_AGGCASEDAY
   add constraint FK_DM_AGGCA_RELATIONS_DM_DIMTI foreign key (TIMEPERIODKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_AGGCASEMONTH
   add constraint FK_DM_AGGCA_RELATS_DM_DIMTI foreign key (TIMEPERIODKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_AGGCASEMONTH
   add constraint FK_AGGCASEMONTH_PRODUCT foreign key (DIMPRODUCTKEY)
      references DM_DIMPRODUCT (DIMPRODUCTKEY);

alter table DM_AGGCASEMONTH
   add constraint FK_AGGCASEMONTH_ORG foreign key (ORGUNITKEY)
      references DM_DIMORGUNIT (ORGUNITKEY);

alter table DM_AGGFUNDS
   add constraint FK_DM_AGGFU_RELATIONS_DM_DIMTI foreign key (EFFECTIVEDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_AGGFUNDS
   add constraint FK_DM_AGGFU_RELATIONS_DM_DIMFU foreign key (DIMFUNDID)
      references DM_DIMFUND (DIMFUNDID);

alter table DM_AGGFUNDS
   add constraint FK_DM_AGGFU_RELATIONS_DM_DIMPR foreign key (DIMPRODUCTKEY)
      references DM_DIMPRODUCT (DIMPRODUCTKEY);

alter table DM_AGGPAYMENTS
   add constraint FK_DM_AGGPA_RELATIONS_DM_DIMTI foreign key (EFFECTIVEDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_AGGPAYMENTS
   add constraint FK_DM_AGGPA_RELATIONS_DM_DIMOR foreign key (ORGUNITKEY)
      references DM_DIMORGUNIT (ORGUNITKEY);

alter table DM_AGGPAYMENTS
   add constraint FK_DM_AGGPA_RELATIONS_DM_DIMPR foreign key (DIMPRODUCTKEY)
      references DM_DIMPRODUCT (DIMPRODUCTKEY);

alter table DM_AGGPAYMENTS
   add constraint FK_DM_AGGPA_RELATIONS_DM_DIMFI foreign key (DIMFINSTATUSKEY)
      references DM_DIMFINANCIALSTATUS (DIMFINSTATUSKEY);

alter table DM_AGGPAYMENTS
   add constraint FK_AGGPAYMENT_DELMETHOD foreign key (DIMDELIVERYMETHODKEY)
      references DM_DIMDELIVERYMETHOD (DIMDELIVERYMETHODKEY);

alter table DM_AGGPAYMENTS
   add constraint FK_AGGPAY_DEDUCT foreign key (DIMDEDUCTIONKEY)
      references DM_DIMDEDUCTION (DIMDEDUCTIONKEY);

alter table DM_AGGPAYMENTS
   add constraint FK_DM_AGGPA_RELATIONS_DM_DIMTR foreign key (DIMTRANSACTIONKEY)
      references DM_DIMTRANSACTIONTYPE (DIMTRANSACTIONKEY);

alter table DM_FACTALLEGATION
   add constraint FK_DM_FACTA_RELATIONS_DM_DIMA6 foreign key (DIMALGFINDINGKEY)
      references DM_DIMALGFINDING (DIMALGFINDINGKEY);

alter table DM_FACTALLEGATION
   add constraint FK_DM_FACTA_RELATIONS_DM_DIMA3 foreign key (DIMALGSEVERITYKEY)
      references DM_DIMALGSEVERITY (DIMALGSEVERITYKEY);

alter table DM_FACTALLEGATION
   add constraint FK_DM_FACTA_RELATIONS_DM_DIMTI foreign key (ALLEGATIONDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTALLEGATION
   add constraint FK_DM_FACTA_RELATIONS_DM_AGEGR foreign key (AGEGROUPKEY)
      references DM_AGEGROUPS (ID);

alter table DM_FACTALLEGATION
   add constraint FK_DM_FACTA_RELATIONS_DM_DIMR2 foreign key (DIMRECORDSTATUSKEY)
      references DM_DIMRECORDSTATUS (DIMRECORDSTATUSKEY);

alter table DM_FACTALLEGATION
   add constraint FK_DM_FACTA_RELATIONS_DM_DIMA5 foreign key (DIMALGMETHODKEY)
      references DM_DIMALGMETHOD (DIMALGMETHODKEY);

alter table DM_FACTALLEGATION
   add constraint FK_DM_FACTA_RELATIONS_DM_DIMRE foreign key (DIMRECURRENCEKEY)
      references DM_DIMRECURRENCE (DIMRECURRENCEKEY);

alter table DM_FACTALLEGATION
   add constraint FK_DM_FACTA_RELATIONS_DM_DIMA2 foreign key (DIMALGTYPEKEY)
      references DM_DIMALGTYPE (DIMALGTYPEKEY);

alter table DM_FACTALLEGATION
   add constraint FK_DM_FACTA_RELATIONS_DM_DIMA4 foreign key (DIMALGLOCATIONKEY)
      references DM_DIMALGLOCATION (DIMALGLOCATIONKEY);

alter table DM_FACTCASEEVENT
   add constraint FK_DM_FACTC_RELATIONS_DM_DIMC3 foreign key (DIMCASEREVIEWOUTCOMEKEY)
      references DM_DIMCASEREVIEWOUTCOMES (DIMCASEREVIEWOUTCOMEKEY);

alter table DM_FACTCASEEVENT
   add constraint FK_DM_FACTC_RELATIONS_DM_DIMIN foreign key (DIMINTEGRATEDCASETYPEKEY)
      references DM_DIMINTEGRATEDCASETYPES (DIMINTEGRATEDCASETYPEKEY);

alter table DM_FACTCASEEVENT
   add constraint FK_CASEEVENT_TIME1 foreign key (EVENTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTCASEHISTORY
   add constraint FK_DM_FACTC_OWNEDB foreign key (ORGUNITKEY)
      references DM_DIMORGUNIT (ORGUNITKEY);

alter table DM_FACTCASEHISTORY
   add constraint FK_DM_FACTC_POINTI foreign key (STARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTCASEHISTORY
   add constraint FK_DM_FACTC_PRODUC foreign key (DIMPRODUCTKEY)
      references DM_DIMPRODUCT (DIMPRODUCTKEY);

alter table DM_FACTCASEHISTORY
   add constraint FK_DM_FACTC_RELATE foreign key (STATUSKEY)
      references DM_DIMSTATUS (STATUSKEY);

alter table DM_FACTCASEHISTORY
   add constraint FK_DM_FACTC_RELAT7 foreign key (ENDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTCASEHISTORY
   add constraint FK_CASEHIST_OWNER foreign key (CASEOWNERKEY)
      references DM_DIMCASEOWNER (CASEOWNERKEY);

alter table DM_FACTCASEHISTORY
   add constraint FK_DM_FACTC_RELA11 foreign key (DIMADDRESSKEY)
      references DM_DIMADDRESS (DIMADDRESSKEY);

alter table DM_FACTCASEHISTORY
   add constraint FK_DM_FACTC_RELAT8 foreign key (DIMPROGRAMKEY)
      references DM_DIMPROGRAM (DIMPROGRAMKEY);

alter table DM_FACTCASEHISTORY
   add constraint FK_DM_FACTC_RELA10 foreign key (DIMCASETYPEKEY)
      references DM_DIMCASETYPES (DIMCASETYPEKEY);

alter table DM_FACTCASEHISTORY
   add constraint FK_DM_FACTC_RELAT6 foreign key (DIMINTEGRATEDCASETYPEKEY)
      references DM_DIMINTEGRATEDCASETYPES (DIMINTEGRATEDCASETYPEKEY);

alter table DM_FACTCASEHISTORY
   add constraint FK_DM_FACTC_RELAT9 foreign key (CASESUPERKEY)
      references DM_DIMCASESUPER (CASESUPERKEY);

alter table DM_FACTCASEPARTICIPANT
   add constraint FK_CASEPARTFACT_PA foreign key (DIMCASEPARTROLEID)
      references DM_DIMCASEPARTICIPANTROLE (DIMCASEPARTROLEID);

alter table DM_FACTCASEPARTICIPANT
   add constraint FK_DM_FACTC_RELAT4 foreign key (RELATIONSHIPTYPEKEY)
      references DM_DIMCONCERNRELATIONSHIPTYPE (RELATIONSHIPTYPEKEY);

alter table DM_FACTCASEPARTICIPANT
   add constraint FK_DM_FACTC_RELAT5 foreign key (ISMASTERKEY)
      references DM_DIMYESNOINDICATOR (DIMYESNOINDICATORKEY);

alter table DM_FACTCASEPARTICIPANT
   add constraint FK_DM_FACTC_RELAT2 foreign key (PERSONHISTORYKEY)
      references DM_FACTPERSONHISTORY (PERSONHISTORYKEY);

alter table DM_FACTCASEPARTICIPANT
   add constraint FK_DM_FACTC_RELATI foreign key (MASTERPERSONHISTORYKEY)
      references DM_FACTPERSONHISTORY (PERSONHISTORYKEY);

alter table DM_FACTCASEPARTICIPANT
   add constraint FK_DM_FACTC_RELAT3 foreign key (ACTIVEENDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTCASEPARTICIPANT
   add constraint FK_CASEPARTHIST_PR foreign key (DIMPRODUCTKEY)
      references DM_DIMPRODUCT (DIMPRODUCTKEY);

alter table DM_FACTCASEPARTICIPANT
   add constraint FK_CASEPARTHIST_T1 foreign key (ACTIVESTARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTCONTACT
   add constraint FK_DM_FACTC_RELATIONS_DM_DIMC6 foreign key (DIMCONTACTLOCATIONKEY)
      references DM_DIMCONTACTLOCATION (DIMCONTACTLOCATIONKEY);

alter table DM_FACTCONTACT
   add constraint FK_DM_FACTC_RELATIONS_DM_DIMC7 foreign key (DIMCONTACTTYPEKEY)
      references DM_DIMCONTACTTYPE (DIMCONTACTTYPEKEY);

alter table DM_FACTCONTACT
   add constraint FK_DM_FACTC_RELATIONS_DM_DIMC8 foreign key (DIMCONTACTMETHODKEY)
      references DM_DIMCONTACTMETHOD (DIMCONTACTMETHODKEY);

alter table DM_FACTCONTACT
   add constraint FK_DM_FACTC_RELATIONS_DM_DIMRT foreign key (DIMREPORTINGTIMELINESSKEY)
      references DM_DIMREPORTINGTIMELINESS (DIMREPORTINGTIMELINESSKEY);

alter table DM_FACTCONTACT
   add constraint FK_DM_FACTC_RELATIONS_DM_DIMTI foreign key (DIMREPORTEDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTCONTACT
   add constraint FK_DM_FACTC_RELATIONS_DM_AGEGR foreign key (DIMAGEGROUPKEY)
      references DM_AGEGROUPS (ID);

alter table DM_FACTCONTACT
   add constraint FK_DM_FACTC_RELATIONS_DM_DIMT9 foreign key (DIMCONTACTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTCONTACT
   add constraint FK_DM_FACTC_RELATIONS_DM_DIMCO foreign key (DIMCOMPLIANCETYPEKEY)
      references DM_DIMCOMPLIANCETYPE (DIMCOMPLIANCETYPEKEY);

alter table DM_FACTCONTACT
   add constraint FK_DM_FACTC_RELATIONS_DM_DIM10 foreign key (DIMFREQUENCYCRITERIAKEY)
      references DM_DIMFREQUENCYCRITERIA (DIMFREQUENCYCRITERIAKEY);

alter table DM_FACTCONTACT
   add constraint FK_DM_FACTC_RELATIONS_DM_DIMT4 foreign key (DIMTARGETDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTCONTACT
   add constraint FK_DM_FACTC_RELATIONS_DM_DIMC9 foreign key (DIMCOMPLIANCESTATUSKEY)
      references DM_DIMCOMPLIANCESTATUS (DIMCOMPLIANCESTATUSKEY);

alter table DM_FACTCONTACT
   add constraint FK_DM_FACTC_RELATIONS_DM_DIMR2 foreign key (DIMRESPONSEPRIORITYKEY)
      references DM_DIMRESPONSEPRIORITY (DIMRESPONSEPRIORITYKEY);

alter table DM_FACTCONTACT
   add constraint FK_DM_FACTC_RELATIONS_DM_DIMRE foreign key (DIMRECORDSTATUSKEY)
      references DM_DIMRECORDSTATUS (DIMRECORDSTATUSKEY);

alter table DM_FACTEDUCATIONHISTORY
   add constraint FK_DM_FACTE_RELATI foreign key (DIMEDUCATIONKEY)
      references DM_DIMEDUCATION (DIMEDUCATIONKEY);

alter table DM_FACTEDUCATIONHISTORY
   add constraint FK_EDUCHISTORY_PAR foreign key (DIMPARTICIPANTSTATUSKEY)
      references DM_DIMPARTICIPANTSTATUS (DIMPARTICIPANTSTATUSKEY);

alter table DM_FACTEDUCATIONHISTORY
   add constraint FK_EDUCHIST_TIME1 foreign key (STARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTEDUCATIONHISTORY
   add constraint FK_EDUCHIST_TIME2 foreign key (DATEOFBIRTHKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTEDUCATIONHISTORY
   add constraint FK_EDUCHISTORY_TI3 foreign key (ENDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTEDUCATIONHISTORY
   add constraint FK_EDUCHISTORY_TI4 foreign key (REGDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTEMPLOYERHISTORY
   add constraint FK_DM_FACTE_RELATIONS_DM_DIMAD foreign key (DIMADDRESSKEY)
      references DM_DIMADDRESS (DIMADDRESSKEY);

alter table DM_FACTEMPLOYERHISTORY
   add constraint FK_DM_FACTE_RELATIONS_DM_DIMIN foreign key (DIMINDUSTRYTYPEKEY)
      references DM_DIMINDUSTRYTYPE (DIMINDUSTRYTYPEKEY);

alter table DM_FACTEMPLOYERHISTORY
   add constraint FK_EMPLOYERHIST_PARTSTAT foreign key (DIMPARTICIPANTSTATUSKEY)
      references DM_DIMPARTICIPANTSTATUS (DIMPARTICIPANTSTATUSKEY);

alter table DM_FACTEMPLOYERHISTORY
   add constraint FK_EMPLOYERHIST_TIME1 foreign key (REGISTRATIONDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTEMPLOYERHISTORY
   add constraint FK_EMPLOYERHIST_TIME2 foreign key (ENDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTEMPLOYERHISTORY
   add constraint FK_EMPLOYERHIST_TIME3 foreign key (STARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTINVESTIGATION
   add constraint FK_DM_FACTI_RELATIONS_DM_DIMI3 foreign key (DIMINVSUBTYPEKEY)
      references DM_DIMINVSUBTYPE (DIMINVSUBTYPEKEY);

alter table DM_FACTINVESTIGATION
   add constraint FK_DM_FACTI_RELATIONS_DM_DIMRE foreign key (DIMRESOLUTIONSTATUSKEY)
      references DM_DIMRESOLUTIONSTATUS (DIMRESOLUTIONSTATUSKEY);

alter table DM_FACTINVESTIGATION
   add constraint FK_DM_FACTI_RELATIONS_DM_DIMC2 foreign key (DIMINVRECOMMENDATIONKEY)
      references DM_DIMINVRECOMMENDATION (DIMINVRECOMMENDATIONKEY);

alter table DM_FACTINVESTIGATION
   add constraint FK_DM_FACTI_RELATIONS_DM_DIMOU foreign key (DIMOUTCOMEKEY)
      references DM_DIMOUTCOME (DIMOUTCOMEKEY);

alter table DM_FACTINVESTIGATION
   add constraint FK_DM_FACTI_RELATIONS_DM_DIMT3 foreign key (DIMSTARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTINVESTIGATION
   add constraint FK_DM_FACTI_RELATIONS_DM_DIMT4 foreign key (DIMRECOMMENDATIONDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTINVESTIGATION
   add constraint FK_DM_FACTI_RELATIONS_DM_DIMYE foreign key (DIMMEETMILESTONEDURINDKEY)
      references DM_DIMYESNOINDICATOR (DIMYESNOINDICATORKEY);

alter table DM_FACTINVESTIGATION
   add constraint FK_DM_FACTI_RELATIONS_DM_DIMMI foreign key (DIMMILESTONEDURATIONKEY)
      references DM_DIMMILESTONEDURATION (DIMMILESTONEDURATIONKEY);

alter table DM_FACTPAYMENTS
   add constraint FK_PAY_TIME1 foreign key (EFFECTIVEDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTPAYMENTS
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMO2 foreign key (ORGUNITKEY)
      references DM_DIMORGUNIT (ORGUNITKEY);

alter table DM_FACTPAYMENTS
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMFI foreign key (DIMFINSTATUSKEY)
      references DM_DIMFINANCIALSTATUS (DIMFINSTATUSKEY);

alter table DM_FACTPAYMENTS
   add constraint FK_PAY_DELMETHOD foreign key (DIMDELIVERYMETHODKEY)
      references DM_DIMDELIVERYMETHOD (DIMDELIVERYMETHODKEY);

alter table DM_FACTPAYMENTS
   add constraint FK_PAY_DEDUCT foreign key (DIMDEDUCTIONKEY)
      references DM_DIMDEDUCTION (DIMDEDUCTIONKEY);

alter table DM_FACTPAYMENTS
   add constraint FK_PAY_PROD foreign key (DIMPRODUCTKEY)
      references DM_DIMPRODUCT (DIMPRODUCTKEY);

alter table DM_FACTPAYMENTS
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMTR foreign key (DIMTRANSACTIONKEY)
      references DM_DIMTRANSACTIONTYPE (DIMTRANSACTIONKEY);

alter table DM_FACTPAYMENTS
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMP6 foreign key (DIMPROGRAMKEY)
      references DM_DIMPROGRAM (DIMPROGRAMKEY);

alter table DM_FACTPERSONHISTORY
   add constraint FK_DM_FACTP_RELA24 foreign key (DIMETHNICITYKEY)
      references DM_DIMETHNICITY (DIMETHNICITYKEY);

alter table DM_FACTPERSONHISTORY
   add constraint FK_PERSONHIST_ADDR foreign key (DIMADDRESSKEY)
      references DM_DIMADDRESS (DIMADDRESSKEY);

alter table DM_FACTPERSONHISTORY
   add constraint FK_DM_FACTP_RELA13 foreign key (DIMCONSTSTATKEY)
      references DM_DIMCONSTSTATUS (DIMCONSTSTATKEY);

alter table DM_FACTPERSONHISTORY
   add constraint FK_DM_FACTP_RELA17 foreign key (DIMMERGESTATUSKEY)
      references DM_DIMMERGESTATUS (DIMMERGESTATUSKEY);

alter table DM_FACTPERSONHISTORY
   add constraint FK_DM_FACTP_RELA18 foreign key (DIMDUPSTATUSKEY)
      references DM_DIMDUPLICATESTATUS (DIMDUPSTATUSKEY);

alter table DM_FACTPERSONHISTORY
   add constraint FK_DM_FACTP_RELA19 foreign key (DIMDUPREASONKEY)
      references DM_DIMDUPLICATEREASON (DIMDUPREASONKEY);

alter table DM_FACTPERSONHISTORY
   add constraint FK_DM_FACTP_RELA20 foreign key (DIMPERSONTYPEKEY)
      references DM_DIMPERSONTYPE (DIMPERSONTYPEKEY);

alter table DM_FACTPERSONHISTORY
   add constraint FK_DM_FACTP_RELA15 foreign key (DIMRACEKEY)
      references DM_DIMRACE (DIMRACEKEY);

alter table DM_FACTPERSONHISTORY
   add constraint FK_DM_FACTP_RELA21 foreign key (DUPLICATEDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTPERSONHISTORY
   add constraint FK_DM_FACTP_RELA14 foreign key (DIMINDIGENOUSGROUPKEY)
      references DM_DIMINDIGENOUSGROUPS (DIMINDIGENOUSGROUPKEY);

alter table DM_FACTPERSONHISTORY
   add constraint FK_DM_FACTP_RELA16 foreign key (DIMNATIONALITYKEY)
      references DM_DIMNATIONALITY (DIMNATIONALITYKEY);

alter table DM_FACTPERSONHISTORY
   add constraint FK_DM_FACTP_RELA25 foreign key (DIMGENDERKEY)
      references DM_DIMGENDER (DIMGENDERKEY);

alter table DM_FACTPERSONHISTORY
   add constraint FK_DM_FACTP_RELA22 foreign key (DIMCOUNTRYKEY)
      references DM_DIMCOUNTRY (DIMCOUNTRYKEY);

alter table DM_FACTPERSONHISTORY
   add constraint FK_PERSONHISTORY_P foreign key (DIMPREFERREDLANGUAGEKEY)
      references DM_DIMPREFERREDLANGUAGE (DIMPREFERREDLANGUAGEKEY);

alter table DM_FACTPERSONHISTORY
   add constraint FK_DM_FACTP_RELA23 foreign key (DIMMARITALSTATUSKEY)
      references DM_DIMMARITALSTATUS (DIMMARITALSTATUSKEY);

alter table DM_FACTPERSONHISTORY
   add constraint FK_PERSONHISTORY_2 foreign key (DIMPARTICIPANTSTATUSKEY)
      references DM_DIMPARTICIPANTSTATUS (DIMPARTICIPANTSTATUSKEY);

alter table DM_FACTPERSONHISTORY
   add constraint FK_PERSONHIST_TIM1 foreign key (ENDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTPERSONHISTORY
   add constraint FK_PERSONHIST_TIM2 foreign key (DATEOFBIRTHKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTPERSONHISTORY
   add constraint FK_PERSONHIST_TIM3 foreign key (REGISTRATIONDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTPERSONHISTORY
   add constraint FK_PERSONHIST_TIM4 foreign key (STARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTPRODUCTAWARD
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMT2 foreign key (STARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTPRODUCTAWARD
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMT3 foreign key (ENDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTPRODUCTAWARD
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMAS foreign key (DIMASSISTANCESTATUSKEY)
      references DM_DIMASSISTANCESTATUS (DIMASSISTANCESTATUSKEY);

alter table DM_FACTPRODUCTAWARD
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMNU foreign key (DIMNUMOFPARENTSKEY)
      references DM_DIMNUMOFPARENTS (DIMNUMOFPARENTSKEY);

alter table DM_FACTPRODUCTAWARD
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMP2 foreign key (DIMPROGRAMKEY)
      references DM_DIMPROGRAM (DIMPROGRAMKEY);

alter table DM_FACTPRODUCTAWARD
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMP3 foreign key (DIMPRODUCTKEY)
      references DM_DIMPRODUCT (DIMPRODUCTKEY);

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint FK_DM_FACTP_RELATIONS_DM_AGEGR foreign key (AGEGROUPKEY)
      references DM_AGEGROUPS (ID);

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMMA foreign key (DIMMASKEY)
      references DM_DIMMASCODES (DIMMASKEY);

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMBO foreign key (DIMBOEKEY)
      references DM_DIMBOECODES (DIMBOEKEY);

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMCH foreign key (DIMCHILDSUPPORTENFORCETYPEKEY)
      references DM_DIMCHILDSUPPORTENFORTYPES (DIMCHILDSUPPORTENFORCETYPEKEY);

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMC5 foreign key (RELATIONSHIPTYPEKEY)
      references DM_DIMCONCERNRELATIONSHIPTYPE (RELATIONSHIPTYPEKEY);

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMDU foreign key (DIMDUALKEY)
      references DM_DIMDUALELIGIBILITY (DIMDUALKEY);

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMSU foreign key (DIMSUBSIDIZEDHOUSINGTYPEKEY)
      references DM_DIMSUBSIDIZEDHOUSINGTYPES (DIMSUBSIDIZEDHOUSINGTYPEKEY);

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMEM foreign key (DIMEMPLOYMENTSTATUSKEY)
      references DM_DIMEMPLOYMENTSTATUS (DIMEMPLOYMENTSTATUSKEY);

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMED foreign key (DIMEDUCATIONLEVELKEY)
      references DM_DIMEDUCATIONLEVELS (DIMEDUCATIONLEVELKEY);

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMT4 foreign key (ENDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMT6 foreign key (STARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMP4 foreign key (DIMPROGRAMKEY)
      references DM_DIMPROGRAM (DIMPROGRAMKEY);

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMPR foreign key (DIMPRODUCTKEY)
      references DM_DIMPRODUCT (DIMPRODUCTKEY);

alter table DM_FACTPRODUCTAWARDRECIPIENT
   add constraint FK_DM_FACTP_RELATIONS_DM_FACTP foreign key (PERSONHISTORYKEY)
      references DM_FACTPERSONHISTORY (PERSONHISTORYKEY);

alter table DM_FACTPRODUCTPROVIDERHISTORY
   add constraint FK_PRODHIST_TIME1 foreign key (STARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTPRODUCTPROVIDERHISTORY
   add constraint FK_PRODHIST_TIME2 foreign key (REGISTRATIONDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTPRODUCTPROVIDERHISTORY
   add constraint FK_PRODHIST_PROD foreign key (DIMPRODUCTKEY)
      references DM_DIMPRODUCT (DIMPRODUCTKEY);

alter table DM_FACTPRODUCTPROVIDERHISTORY
   add constraint FK_PRODHIST_PARTSTATUS foreign key (DIMPARTICIPANTSTATUSKEY)
      references DM_DIMPARTICIPANTSTATUS (DIMPARTICIPANTSTATUSKEY);

alter table DM_FACTPRODUCTPROVIDERHISTORY
   add constraint FK_DM_FACTP_RELATIONS_DM_DIMP5 foreign key (DIMPROGRAMKEY)
      references DM_DIMPROGRAM (DIMPROGRAMKEY);

alter table DM_FACTPRODUCTPROVIDERHISTORY
   add constraint FK_PRODHIST_ADDRESS foreign key (DIMADDRESSKEY)
      references DM_DIMADDRESS (DIMADDRESSKEY);

alter table DM_FACTPRODUCTPROVIDERHISTORY
   add constraint FK_PRODHIST_TIME3 foreign key (ENDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTPROGRAMAPPLICATION
   add constraint FK_DM_FACTP_RELATI foreign key (DISPOSITIONKEY)
      references DM_DIMDISPOSITION (DISPOSITIONKEY);

alter table DM_FACTPROGRAMAPPLICATION
   add constraint FK_DM_FACTP_RELAT9 foreign key (DIMDENIALREASONKEY)
      references DM_DIMDENIALREASON (DIMDENIALREASONKEY);

alter table DM_FACTPROGRAMAPPLICATION
   add constraint FK_DM_FACTP_RELAT7 foreign key (INTAKESTARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTPROGRAMAPPLICATION
   add constraint FK_DM_FACTP_RELAT2 foreign key (DISPOSEDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTPROGRAMAPPLICATION
   add constraint FK_DM_FACTP_RELAT5 foreign key (DIMTIMELINESSKEY)
      references DM_DIMYESNOINDICATOR (DIMYESNOINDICATORKEY);

alter table DM_FACTPROGRAMAPPLICATION
   add constraint FK_DM_FACTP_RELA10 foreign key (DIMRECOMMENDATIONKEY)
      references DM_DIMRECOMMENDATION (DIMRECOMMENDATIONKEY);

alter table DM_FACTPROGRAMAPPLICATION
   add constraint FK_DM_FACTP_RELAT3 foreign key (RESPONDSWITHINTIMEKEY)
      references DM_DIMRESPONDSWITHINTIME (RESPONDSWITHINTIMEKEY);

alter table DM_FACTPROGRAMAPPLICATION
   add constraint FK_DM_FACTP_RELAT4 foreign key (DIMINTAKETYPEKEY)
      references DM_DIMINTAKETYPE (DIMINTAKETYPEKEY);

alter table DM_FACTPROGRAMAPPLICATION
   add constraint FK_DM_FACTP_RELA11 foreign key (DIMINTAKECATEGORYKEY)
      references DM_DIMINTAKECATEGORY (DIMINTAKECATEGORYKEY);

alter table DM_FACTPROGRAMAPPLICATION
   add constraint FK_DM_FACTP_RELA12 foreign key (DIMRESPONSEPRIORITYKEY)
      references DM_DIMRESPONSEPRIORITY (DIMRESPONSEPRIORITYKEY);

alter table DM_FACTPROGRAMAPPLICATION
   add constraint FK_DM_FACTP_RELAT6 foreign key (DIMCONTACTMETHODKEY)
      references DM_DIMCONTACTMETHOD (DIMCONTACTMETHODKEY);

alter table DM_FACTPROGRAMAPPLICATION
   add constraint FK_DM_FACTP_RELAT8 foreign key (DIMCONTACTTYPEKEY)
      references DM_DIMCONTACTTYPE (DIMCONTACTTYPEKEY);

alter table DM_FACTSERVICESUPPLIERHISTORY
   add constraint FK_DM_FACTS_RELATIONS_DM_DIMSE foreign key (DIMSERVICEKEY)
      references DM_DIMSERVICE (DIMSERVICEKEY);

alter table DM_FACTSERVICESUPPLIERHISTORY
   add constraint FK_DM_FACTS_RELATIONS_DM_DIMAD foreign key (DIMADDRESSKEY)
      references DM_DIMADDRESS (DIMADDRESSKEY);

alter table DM_FACTSERVICESUPPLIERHISTORY
   add constraint FK_SERVICEHIST_TIME1 foreign key (ENDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTSERVICESUPPLIERHISTORY
   add constraint FK_SERVICEHIST_TIME2 foreign key (REGISTRATIONDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTSERVICESUPPLIERHISTORY
   add constraint FK_SERVICEHIST_TIME3 foreign key (STARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTSERVICESUPPLIERHISTORY
   add constraint FK_SERSUPPHIST_PARTSTATUS foreign key (DIMPARTICIPANTSTATUSKEY)
      references DM_DIMPARTICIPANTSTATUS (DIMPARTICIPANTSTATUSKEY);

alter table DM_FACTSUSPENSE
   add constraint FK_FACTSUS_TIME foreign key (RECEIVEDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTSUSPENSE
   add constraint FK_SUSPENSE_PAYMETHOD foreign key (DIMPAYMETHODKEY)
      references DM_DIMPAYMETHOD (DIMPAYMETHODKEY);

alter table DM_FACTUTILITYHISTORY
   add constraint FK_DM_FACTU_RELATIONS_DM_DIMUT foreign key (DIMUTILITYKEY)
      references DM_DIMUTILITY (DIMUTILITYKEY);

alter table DM_FACTUTILITYHISTORY
   add constraint FK_UTILHIST_TIME1 foreign key (STARTDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTUTILITYHISTORY
   add constraint FK_UTILHIST_TIME2 foreign key (ENDDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTUTILITYHISTORY
   add constraint FK_UTILHIST_TIME3 foreign key (REGISTRATIONDATEKEY)
      references DM_DIMTIMEPERIOD (TIMEPERIODKEY);

alter table DM_FACTUTILITYHISTORY
   add constraint FK_DM_FACTU_RELATIONS_DM_DIMPA foreign key (DIMPARTICIPANTSTATUSKEY)
      references DM_DIMPARTICIPANTSTATUS (DIMPARTICIPANTSTATUSKEY);

alter table DM_FACTUTILITYHISTORY
   add constraint FK_DM_FACTU_RELATIONS_DM_DIMAD foreign key (DIMADDRESSKEY)
      references DM_DIMADDRESS (DIMADDRESSKEY);

