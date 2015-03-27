
connect to %createBIDB% user %DB2SYSUSER% using %DB2SYSUSERP% 


select 'dropping and creating CuramBIRole' from sysibm.sysdummy1

drop role CuramBIRole
create role CuramBIRole


GRANT CREATETAB                  ON DATABASE TO ROLE CuramBIRole
GRANT BINDADD                    ON DATABASE TO ROLE  CuramBIRole
GRANT CONNECT                    ON DATABASE TO ROLE  CuramBIRole
GRANT CREATE_NOT_FENCED_ROUTINE  ON DATABASE TO ROLE  CuramBIRole
GRANT IMPLICIT_SCHEMA            ON DATABASE TO ROLE  CuramBIRole
GRANT LOAD                       ON DATABASE TO ROLE  CuramBIRole

GRANT CREATE_EXTERNAL_ROUTINE    ON DATABASE TO ROLE  CuramBIRole
GRANT QUIESCE_CONNECT            ON DATABASE TO ROLE  CuramBIRole
GRANT SECADM                     ON DATABASE TO ROLE  CuramBIRole
GRANT DBADM                      ON DATABASE TO ROLE  CuramBIRole

select 'privilages added to CURAMBIROLE' from sysibm.sysdummy1

grant role CURAMBIROLE to %createBIDB%

select 'CURAMBIROLE granted to %createBIDB%' from sysibm.sysdummy1


GRANT CREATE_EXTERNAL_ROUTINE, DBADM,CREATETAB,BINDADD,CONNECT,CREATE_NOT_FENCED_ROUTINE,IMPLICIT_SCHEMA,LOAD,CREATE_EXTERNAL_ROUTINE,QUIESCE_CONNECT,SECADM ON DATABASE TO USER  %DB2USER%

select 'privilages granted to %DB2USER%' from sysibm.sysdummy1

