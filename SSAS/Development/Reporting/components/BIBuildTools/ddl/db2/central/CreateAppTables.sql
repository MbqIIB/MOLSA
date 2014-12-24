--==============================================================
-- DBMS name:      IBM DB2 UDB 9.7 Common Server
-- Created on:     19/10/2012 12:34:17
--==============================================================


create sequence DWPROPERTIESSEQ
increment by 1
start with 1
nomaxvalue
minvalue 1
no cycle
no order;

--==============================================================
-- Table: DW_PROPERTIES
--==============================================================
create table DW_PROPERTIES
(
   BIPROPERTYID         BIGINT                 not null,
   BICATEGORY           VARCHAR(240),
   BIPROP_NAME          VARCHAR(2000)          not null,
   BIPROP_VALUE         VARCHAR(2000),
   BIPROP_TYPE          VARCHAR(2000),
   DEFAULTVALUE         VARCHAR(2000),
   "LOCALE"             VARCHAR(240),
   LASTWRITTEN          TIMESTAMP              default CURRENT TIMESTAMP
);

alter table DW_PROPERTIES
   add constraint P_PK_DW_PROPERTIES primary key (BIPROPERTYID);

--==============================================================
-- Index: UK_DW_PROPERTIES1
--==============================================================
create unique index UK_DW_PROPERTIES1 on DW_PROPERTIES (
   BIPROP_NAME          ASC,
   "LOCALE"             ASC
);

--==============================================================
-- View: CURAMBI_DUMMY
--==============================================================

create view CURAMBI_DUMMY as
select 'dummy' as dummy from sysibm.sysdummy1;

