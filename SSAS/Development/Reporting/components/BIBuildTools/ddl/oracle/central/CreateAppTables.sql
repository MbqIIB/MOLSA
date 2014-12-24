/*==============================================================*/
/* DBMS name:      ORACLE Version 10g                           */
/* Created on:     19/10/2012 09:35:21                          */
/*==============================================================*/


create sequence DWPROPERTIESSEQ
increment by 1
start with 1
  nomaxvalue
  minvalue 1
  nocache;

/*==============================================================*/
/* Table: DW_PROPERTIES                                         */
/*==============================================================*/
create table DW_PROPERTIES  (
   BIPROPERTYID         INTEGER                         not null,
   BICATEGORY           VARCHAR2(60),
   BIPROP_NAME          VARCHAR2(500)                   not null,
   BIPROP_VALUE         VARCHAR2(500),
   BIPROP_TYPE          VARCHAR2(60),
   DEFAULTVALUE         VARCHAR2(500),
   LOCALE               VARCHAR2(60),
   LASTWRITTEN          TIMESTAMP                      default SYSDATE
);

alter table DW_PROPERTIES
   add constraint PK_DW_PROPERTIES primary key (BIPROPERTYID);

/*==============================================================*/
/* Index: UK_DW_PROPERTIES1                                     */
/*==============================================================*/
create unique index UK_DW_PROPERTIES1 on DW_PROPERTIES (
   BIPROP_NAME ASC,
   LOCALE ASC
);

/*==============================================================*/
/* View: CURAMBI_DUMMY                                          */
/*==============================================================*/
create or replace view CURAMBI_DUMMY as
 select 'dummy' as dummy from dual;

