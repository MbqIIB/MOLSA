--==============================================================
-- DBMS name:      IBM DB2 UDB 8.x Common Server
-- Created on:     17/10/2012 13:25:02
--==============================================================


create sequence STPROPERTIESSEQ
increment by 1
start with 1
nomaxvalue
minvalue 1
no cycle
no order;

--==============================================================
-- Table: ST_PROPERTIES
--==============================================================
create table ST_PROPERTIES
(
   BIPROPERTYID         BIGINT                 not null,
   BICATEGORY           VARCHAR(240),
   BIPROP_NAME          VARCHAR(2000)          not null,
   BIPROP_VALUE         VARCHAR(2000),
   BIPROP_TYPE          VARCHAR(240),
   DEFAULTVALUE         VARCHAR(2000),
   "LOCALE"             VARCHAR(240),
   LASTWRITTEN          TIMESTAMP              default CURRENT TIMESTAMP,
   constraint P_STPROPERTIES primary key (BIPROPERTYID)
);

--==============================================================
-- Index: UK_ST_PROPERTIES1
--==============================================================
create unique index UK_ST_PROPERTIES1 on ST_PROPERTIES (
   BIPROP_NAME          ASC,
   "LOCALE"             ASC
);

--==============================================================
-- View: CURAMBI_DUMMY
--==============================================================

create view CURAMBI_DUMMY as
select 'dummy' as dummy from sysibm.sysdummy1;

