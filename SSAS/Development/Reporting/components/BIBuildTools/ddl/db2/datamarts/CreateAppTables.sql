--==============================================================
-- DBMS name:      IBM DB2 UDB 9.5.x Common Server
-- Created on:     07/11/2012 17:16:30
--==============================================================


create sequence DMPROPERTIESSEQ
increment by 1
start with 1
  nomaxvalue
  minvalue 1
nocycle
  nocache
noorder;

--==============================================================
-- Table: DM_PROPERTIES
--==============================================================
create table DM_PROPERTIES
(
   BIPROPERTYID         BIGINT                 not null,
   BICATEGORY           VARCHAR(60),
   BIPROP_NAME          VARCHAR(2000)          not null,
   BIPROP_VALUE         VARCHAR(2000),
   BIPROP_TYPE          VARCHAR(60),
   DEFAULTVALUE         VARCHAR(2000),
   "LOCALE"             VARCHAR(60),
   LASTWRITTEN          TIMESTAMP              default CURRENT TIMESTAMP
);

alter table DM_PROPERTIES
   add constraint P_DMPROPERTIES primary key (BIPROPERTYID);

--==============================================================
-- View: CURAMBI_DUMMY
--==============================================================

create view CURAMBI_DUMMY as
select 'dummy' as dummy from sysibm.sysdummy1;

