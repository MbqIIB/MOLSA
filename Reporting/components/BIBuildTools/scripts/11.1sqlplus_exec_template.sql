rem SYNOPSYS
rem
rem   @sqlplus_exec_template.sql workspace location_name {PLSQLMAP | SQLLOADERCONTROLFILE | PROCESSFLOW | ABAPFILE | DATAAUDITOR | SCHEDULEDJOB} [parent]/task_name system_params custom_params
rem
rem NAME
rem
rem   sqlplus_exec_template.sql - SQLPlus Execution Template
rem
rem USAGE
rem
rem   workspace     := e.g. MY_WORKSPACE    - Workspace in which the job is to run
rem
rem   location_name :- e.g. MY_WAREHOUSE    - Physical Name of the Location to which this task was deployed
rem                                           (i.e. a DB Location or a Process Location or the Platform Schema)
rem                                           Note: Always use "PlaformSchema" for SQL_LOADER and SAP types.
rem
rem   task_type     :- PLSQLMAP             - OWB PL/SQL Mapping
rem                 |  SQLLOADERCONTROLFILE - OWB SQL*Loader Mapping
rem                 |  PROCESSFLOW          - OWB ProcessFlow
rem                 |  ABAPFILE             - OWB SAP Mapping
rem                 |  DATAAUDITOR          - OWB DataAuditor Mapping
rem                 |  SCHEDULEDJOB         - OWB Scheduled Job
rem
rem   task_name     :- e.g. MY_MAPPING      - Physical Name of the Deployed Object. This can be optionally qualified
rem                                           by the name of a deployed parent, such as the Processflow Package name
rem                                           of a Processflow. A module name cannot be used here because it is not
rem                                           a deployable object.
rem
rem   system_params :- { , | (name = value [, name = value]...)}
rem                    e.g. ","
rem                    or   MY_PARAM=1,YOUR_PARAM=true
rem
rem   custom_params :- { , | (name = value [, name = value]...)}
rem                    e.g. ","
rem                    or   MY_PARAM=1,YOUR_PARAM=true
rem
rem RETURNS
rem
rem   1 if task reports SUCCESS, 2 if WARNING, 3 if ERROR
rem
rem
rem DESCRIPTION
rem
rem   This SQL*Plus script can be called from the SQL*Plus shell.  Through SQL*Plus OWB
rem   objects can be executed through scheduling tools such as cron and AT as well as 
rem   enterprise environments such as Autosys and Tivoli.
rem
rem   A separate script oem_exec_template.sql is provided for more friendly execution
rem   from OEM.
rem
rem   This script is design to be run from a WorkspaceOwner or WorkspaceUser with Execute privilege
rem
rem   The Workspace is nominated in the parameters, and should be declared as workspaceOwner.workspaceName
rem   (if only workspaceName is given, workspaceOwner will be defaulted to user)
rem
rem   In its unchanged form the script takes the three keys required to identify 
rem   the executable task. 
rem
rem   The task is executed with the default parameters configured prior to deployment.
rem
rem   The custom_params and system_params values override the default input parameters 
rem   of the task.
rem   
rem   Note: The comma character can be escaped using the backslash character; likewise the backslash 
rem         character can be escaped by itself.
rem
rem         A single-quote character "'" must be replaced by a sequence of two single-quote characters. e.g.
rem         "MY_PARAM=This is a quote ''."
rem
rem   A list of the valid System Parameters for each task type can be obtained from the OWB
rem   documentation, but generally the deployed defaults are sufficient.  The Custom Parameters
rem   are defined on the object in the OWB Designer.
rem
rem EXAMPLE
rem
rem   sqlplus user/password@tns_name @sqlplus_exec_template.sql MY_WORKSPACE MY_WAREHOUSE PLSQL MY_MAPPING "," ","
rem   sqlplus user/password@tns_name @sqlplus_exec_template.sql MY_WORKSPACE PlatformSchema SQL_LOADER MY_LOAD "," ","
rem   sqlplus user/password@tns_name @sqlplus_exec_template.sql MY_WORKSPACE MY_WORKFLOW PROCESS MY_PROCESS "," ","
rem   sqlplus user/password@tns_name @sqlplus_exec_template.sql MY_WORKSPACE PlatformSchema SAP MY_SAP "," ","
rem   sqlplus user/password@tns_name @sqlplus_exec_template.sql MY_WORKSPACE MY_WAREHOUSE DATA_AUDITOR MY_DATA_AUDITOR "," ","
--

define OEM_FRIENDLY=1
define OWB_BACKGROUND=0

set serveroutput on
set verify off

whenever sqlerror exit failure;

set role OWB_USER;
call owbsys.wb_rt_script_util.set_workspace('&1.');

variable exec_return_code number;

begin
  :exec_return_code := owbsys.wb_rt_script_util.run_task('&2.',
                                                         '&3.',
                                                         '&4.',
                                                         '&6.',
                                                         '&5.',
                                                         &OEM_FRIENDLY.,
                                                         &OWB_BACKGROUND.);
end;

/
rem Curam - removed to allow more than on ETL to run  in batch mode
rem exit :exec_return_code;