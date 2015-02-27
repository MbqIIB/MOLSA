/*==============================================================*/
/* DBMS name:      ORACLE Version 10g                           */
/* Created on:     17/10/2012 13:55:58                          */
/*==============================================================*/


create sequence STPROPERTIESSEQ
increment by 1
start with 1
  nomaxvalue
  minvalue 1
  nocache;

/*==============================================================*/
/* Table: ST_PROPERTIES                                         */
/*==============================================================*/
create table ST_PROPERTIES  (
   BIPROPERTYID         NUMBER(19,0)                    not null,
   BICATEGORY           VARCHAR2(60),
   BIPROP_NAME          VARCHAR2(500)                   not null,
   BIPROP_VALUE         VARCHAR2(500),
   BIPROP_TYPE          VARCHAR2(60),
   DEFAULTVALUE         VARCHAR2(500),
   LOCALE               VARCHAR2(60),
   LASTWRITTEN          TIMESTAMP                      default SYSDATE,
   constraint PK_ST_PROPERTIES primary key (BIPROPERTYID)
);

/*==============================================================*/
/* Index: UK_ST_PROPERTIES1                                     */
/*==============================================================*/
create unique index UK_ST_PROPERTIES1 on ST_PROPERTIES (
   BIPROP_NAME ASC,
   LOCALE ASC
);

/*==============================================================*/
/* View: CURAMBI_DUMMY                                          */
/*==============================================================*/
create or replace view CURAMBI_DUMMY as
select 'dummy' as dummy from dual;

