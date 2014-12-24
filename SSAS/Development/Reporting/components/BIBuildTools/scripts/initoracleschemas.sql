
-- This file is only intended to be used to build BI schemas on development machines.
-- To build schemas on production (or sensitive machines) please ensure you follow your local
-- security policies regarding passwords and password storage.
-- The BI build environment will replace the tokens below with the values from the BIBootstrap property file.

-- allow this script to be called multiple times, by disabling the drop and create
-- role statements, dropping the role removes the role for any users that have it not
-- just the user defined when running this script (but any other users who have been granted this role)
-- the build environment will substitute a sql comment or remove the token REMARK
-- do not edit this text.
%REMARK% select 'dropping and creating CuramBIRole' as message from dual;
%REMARK% drop role CuramBIRole;
%REMARK% create role CuramBIRole;
%REMARK% GRANT RESOURCE TO CuramBIRole with admin option;
%REMARK% grant create session to CuramBIRole;
%REMARK% grant create view to CuramBIRole;
%REMARK% grant create any directory to CuramBIRole;
%REMARK% grant drop any directory to CuramBIRole;
%REMARK%  GRANT DEBUG ANY PROCEDURE to CuramBIRole;
%REMARK% GRANT DEBUG CONNECT SESSION to CuramBIRole;
%REMARK% GRANT EXECUTE ANY PROCEDURE to CuramBIRole;


-- USER SQL

select 'dropping and creating staging user ' as message from dual;
drop user  %STAGING% cascade;
CREATE USER %STAGING% IDENTIFIED BY %STAGINGP% ;
alter user %STAGING% quota unlimited on users; 
GRANT CuramBIRole TO %STAGING%;



-- USER SQL
select 'dropping and creating warehouse user ' as message from dual;
drop user  %WAREHOUSE% cascade;
CREATE USER %WAREHOUSE% IDENTIFIED BY %WAREHOUSEP%  ;
alter user %WAREHOUSE% quota unlimited on users; 
GRANT CuramBIRole TO %WAREHOUSE%  ;


-- USER SQL
select 'dropping and creating datamart user ' as message from dual;

drop user  %DATAMART%  cascade;
CREATE USER %DATAMART% IDENTIFIED BY %DATAMARTP% ;
alter user %DATAMART% quota unlimited on users; 
GRANT CuramBIRole TO %DATAMART% ;



-- USER SQL
select 'dropping and creating datamart demo data user ' as message from dual;

drop user  %DATAMARTDMO% cascade;
CREATE USER %DATAMARTDMO%  IDENTIFIED BY %DATAMARTDMOP%  ;
alter user %DATAMARTDMO%  quota unlimited on users; 
GRANT CuramBIRole TO %DATAMARTDMO%  ;
select 'Completed the process of dropping and re-creating 4 BI schemas ' as message from dual;

