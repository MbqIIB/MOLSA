/*==============================================================*/
/* DBMS name:      ORACLE Version 11.x                          */
/* Created on:     06/11/2012 11:11:54                          */
/*==============================================================*/


create sequence DMPROPERTIESSEQ
increment by 1
start with 1
  nomaxvalue
  minvalue 1
nocycle
  nocache
noorder;

/*==============================================================*/
/* Table: DM_PROPERTIES                                         */
/*==============================================================*/
create table DM_PROPERTIES  (
   BIPROPERTYID         NUMBER(19,0)                    not null,
   BICATEGORY           VARCHAR2(60),
   BIPROP_NAME          VARCHAR2(500)                   not null,
   BIPROP_VALUE         VARCHAR2(500),
   BIPROP_TYPE          VARCHAR2(60),
   DEFAULTVALUE         VARCHAR2(500),
   LOCALE               VARCHAR2(60),
   LASTWRITTEN          TIMESTAMP                      default sysdate
);

alter table DM_PROPERTIES
   add constraint PK_DM_PROPERTIES primary key (BIPROPERTYID);

alter table DM_PROPERTIES
   add constraint AK_UK_DM_PROPERTIES1_DM_PROPE unique (BIPROP_NAME, LOCALE);

/*==============================================================*/
/* View: CURAMBI_DUMMY                                          */
/*==============================================================*/
create or replace view CURAMBI_DUMMY as
select 'dummy' as dummy from dual;

