rem SYNOPSYS
rem
rem   @oem_exec_template.sql rt_owner location_name {PLSQLMAP | SQLLOADERCONTROLFILE | PROCESSFLOW | ABAPFILE | DATAAUDITOR | SCHEDULEDJOB} [parent/]task_name system_params custom_params
rem
rem NAME
rem
rem   oem_exec_template.sql - OEM Execution Template
rem
rem USAGE
rem
rem   rt_owner      := e.g. MY_RUNTIME      - Name of the Runtime Repository Owner
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
rem   0 if task reports SUCCESS or WARNING, otherwise >0
rem
rem COMPATIBILITY
rem
rem   This script is compatible with OEM 2.x and OEM 9i.  For OEM 10g, please use the 
rem   function wb_rt_api_exec.run_task, which provides the same functionality.
rem
rem DESCRIPTION
rem
rem   This SQL*Plus script can be pasted into a user-defined OEM SQL*Plus Job.  This job 
rem   can be then used with OEM's 'Create Like' functionality to either create new  
rem   parameterized jobs or to submit new jobs for immediate execution.
rem
rem   This script is designed to be run from a Runtime User, not the Runtime Repository Owner.
rem   The Runtime Repository Owner is nominated in the parameters.
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
rem         A single-quote character "'" must be replaced by a sequence of four single-quote characters. e.g.
rem         "MY_PARAM=This is a quote ''''."
rem
rem   A list of the valid System Parameters for each task type can be obtained from the OWB
rem   documentation, but generally the deployed defaults are sufficient.  The Custom Parameters
rem   are defined on the object in the OWB Designer.
rem
rem EXAMPLE
rem
rem   @oem_exec_template.sql MY_RUNTIME MY_WAREHOUSE PLSQL MY_MAPPING "," ","
rem   @oem_exec_template.sql MY_RUNTIME PlatformSchema SQL_LOADER MY_LOAD "," ","
rem   @oem_exec_template.sql MY_RUNTIME MY_WORKFLOW PROCESS MY_PROCESS "," ","
rem   @oem_exec_template.sql MY_RUNTIME PlatformSchema SAP MY_SAP "," ","
rem   @oem_exec_template.sql MY_RUNTIME MY_WAREHOUSE DATA_AUDITOR MY_DATA_AUDITOR "," ","
rem
rem   Note: @oem_exec_template.sql must not included in the OEM parameter field as is added 
rem         automatically by OEM.
--

define OEM_FRIENDLY=1
define OWB_BACKGROUND=0

set serveroutput on
set verify off

whenever sqlerror exit failure;

define REPOS_OWNER='&1.'
define LOCATION_NAME='&2.'
define TASK_TYPE='&3.'
define TASK_NAME='&4.'
define SYSTEM_PARAMS='&5.'
define CUSTOM_PARAMS='&6.'

alter session set current_schema = &REPOS_OWNER.;
set role owb_d_&REPOS_OWNER., owb_o_&REPOS_OWNER.;

variable exec_return_code number;

begin
  --
  -- Initialize Return Code
  --
  :exec_return_code := wb_rt_api_exec.RESULT_FAILURE;
  
  --
  -- Run Task
  --
  :exec_return_code := wb_rt_api_exec.run_task('&LOCATION_NAME.',
                                               '&TASK_TYPE.',
                                               '&TASK_NAME.',
                                               '&CUSTOM_PARAMS.',
                                               '&SYSTEM_PARAMS.',
                                               &OEM_FRIENDLY.,
                                               &OWB_BACKGROUND.);
end;

/
rem Curam - removed to allow more than on ETL to run  in batch mode
rem exit :exec_return_code;
