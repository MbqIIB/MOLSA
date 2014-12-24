-- Milestone Duration Names

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval, 'MILESTONENAME', 'Federal.Investigation.Duration', 'Federal Investigation Duration', 'STRING', NULL, 'en', dw_getDateTime());   

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval, 'COMPLIANCETYPE', 'Case.INITIAL', 'Initial Contact Compliance', 'STRING', NULL, 'en', dw_getDateTime());  

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval, 'COMPLIANCETYPE', 'Case.ONGOING', 'Ongoing Contact Compliance', 'STRING', NULL, 'en', dw_getDateTime());  

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval, 'COMPLIANCETYPE', 'Case.NA', 'Not Applicable', 'STRING', NULL, 'en', dw_getDateTime());  

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval, 'CONFIGPROPERTIES', 'Allegation.CEF_ALLEGATION_COUNTBACK_WINDOW', 'Number of months to count back for previous abuse', 'STRING', NULL, 'en', dw_getDateTime());  

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval, 'CONFIGPROPERTIES', 'Allegation.Undefined', 'Undefined entry', 'STRING', NULL, 'en', dw_getDateTime());  

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval, 'REPORTINGTIMELINESS', 'Contactcompliance.ROT', 'Reported On Time', 'STRING', NULL, 'en', dw_getDateTime());  

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval, 'REPORTINGTIMELINESS', 'Contactcompliance.RL', 'Reported Late', 'STRING', NULL, 'en', dw_getDateTime());  

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval, 'REPORTINGTIMELINESS', 'Contactcompliance.NA', 'Not Related to Compliance', 'STRING', NULL, 'en', dw_getDateTime());  

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval, 'INDIGENOUSGROUP', 'Person.NotIndigenous', 'Not Indigenous', 'STRING', NULL, 'en', dw_getDateTime());  

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval, 'INDIGENOUSGROUP', 'Person.Indigenous', 'Indigenous', 'STRING', NULL, 'en', dw_getDateTime());  

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval, 'PREVIOUSALLEGATIONS', 'Previous.Yes', 'Yes', 'STRING', NULL, 'en', dw_getDateTime());  

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval, 'PREVIOUSALLEGATIONS', 'Previous.No', 'No', 'STRING', NULL, 'en', dw_getDateTime());  

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval, 'PREVIOUSALLEGATIONS', 'Previous.Unknown', 'Unknown', 'STRING', NULL, 'en', dw_getDateTime());  

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval, 'PROGRAM', 'Program.Description', 'Child Services', 'STRING', NULL, 'en', dw_getDateTime());  

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Alabama','Alabama' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Alaska' ,'Alaska' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.American Samoa' ,'American Samoa' ,'STRING', NULL, 'en', dw_getDateTime()); 

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Arizona' ,'Arizona' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Arkansas' ,'Arkansas' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.California' ,'California', 'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Colorado' ,'Colorado' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Connecticut' ,'Connecticut' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Delaware' ,'Delaware' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Dist.of.Columbia' ,'Dist. of Columbia' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Florida' ,'Florida' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Georgia' ,'Georgia' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Guam' ,'Guam' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Hawaii' ,'Hawaii' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Idaho' ,'Idaho' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Illinois' ,'Illinois' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Indiana' ,'Indiana' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Iowa' ,'Iowa' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Kansas' ,'Kansas' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Kentucky' ,'Kentucky' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Louisiana' ,'Louisiana' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Maine' ,'Maine' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Maryland' ,'Maryland' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Massachusetts' ,'Massachusetts' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Michigan' ,'Michigan' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Minnesota' ,'Minnesota' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Mississippi' ,'Mississippi' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Missouri' ,'Missouri' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Montana' ,'Montana' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Nebraska' ,'Nebraska' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Nevada' ,'Nevada' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.New.Hampshire' ,'New Hampshire' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.New.Jersey' ,'New Jersey' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.New.Mexico' ,'New Mexico' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.New.York' ,'New York' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.North.Carolina' ,'North Carolina' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.North.Dakota' ,'North Dakota' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Ohio' ,'Ohio' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Oklahoma' ,'Oklahoma' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Oregon' ,'Oregon' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Pennsylvania' ,'Pennsylvania' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Puerto.Rico' ,'Puerto Rico' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Rhode.Island' ,'Rhode Island' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.South.Carolina' ,'South Carolina' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.South.Dakota' ,'South Dakota' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Tennessee' ,'Tennessee' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Texas' ,'Texas' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Utah' ,'Utah' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Vermont' ,'Vermont' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Virgin.Islands' ,'Virgin Islands' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Virginia' ,'Virginia' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Washington' ,'Washington' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.West.Virginia' ,'West Virginia' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Wisconsin' ,'Wisconsin' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'State','State.Wyoming' ,'Wyoming' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'Indicator','Indicator.YES' ,'Yes' ,'STRING', NULL, 'en', dw_getDateTime());

INSERT INTO  DW_PROPERTIES  (BIPROPERTYID, BICATEGORY, BIPROP_NAME, BIPROP_VALUE, BIPROP_TYPE, DEFAULTVALUE, LOCALE, LASTWRITTEN) VALUES (dwpropertiesseq.nextval,'Indicator','Indicator.NO' ,'No' ,'STRING', NULL, 'en', dw_getDateTime());

