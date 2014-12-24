


drop view DM_VW_PERSON_EDUCATION;

drop view DM_VW_PERSON_CASE;

drop view DM_VW_PERSONHISTORY;

drop view DM_VM_PRODUCT;

drop view DM_VM_NOEDUCATION;

drop view DM_FACTINTAKEVIEW;

drop view DM_FACTCASEPARTICIPANTVIEW;

drop view DM_FACTCASEHISTORYACTIVEVIEW;

drop view DM_FACTCASEDIMENSIONVIEW;

drop table DM_AGEGROUPS cascade constraints;

drop table DM_AGGCASEDAY cascade constraints;

drop table DM_AGGCASEMONTH cascade constraints;

drop table DM_AGGFUNDS cascade constraints;

drop table DM_AGGPAYMENTS cascade constraints;

drop table DM_DIMADDRESS cascade constraints;

drop table DM_DIMALGFINDING cascade constraints;

drop table DM_DIMALGLOCATION cascade constraints;

drop table DM_DIMALGMETHOD cascade constraints;

drop table DM_DIMALGSEVERITY cascade constraints;

drop table DM_DIMALGTYPE cascade constraints;

drop table DM_DIMASSISTANCESTATUS cascade constraints;

drop table DM_DIMBOECODES cascade constraints;

drop table DM_DIMCASECLOSURE cascade constraints;

drop table DM_DIMCASEOWNER cascade constraints;

drop table DM_DIMCASEPARTICIPANTROLE cascade constraints;

drop table DM_DIMCASEREVIEWOUTCOMES cascade constraints;

drop table DM_DIMCASESUPER cascade constraints;

drop table DM_DIMCASETYPES cascade constraints;

drop table DM_DIMCHILDSUPPORTENFORTYPES cascade constraints;

drop table DM_DIMCOMPLIANCESTATUS cascade constraints;

drop table DM_DIMCOMPLIANCETYPE cascade constraints;

drop table DM_DIMCONCERNRELATIONSHIPTYPE cascade constraints;

drop table DM_DIMCONFIGPROPERTIES cascade constraints;

drop table DM_DIMCONSTSTATUS cascade constraints;

drop table DM_DIMCONTACTLOCATION cascade constraints;

drop table DM_DIMCONTACTMETHOD cascade constraints;

drop table DM_DIMCONTACTPURPOSE cascade constraints;

drop table DM_DIMCONTACTTYPE cascade constraints;

drop table DM_DIMCOUNTRY cascade constraints;

drop table DM_DIMDEDUCTION cascade constraints;

drop table DM_DIMDELIVERYMETHOD cascade constraints;

drop table DM_DIMDENIALREASON cascade constraints;

drop table DM_DIMDISPOSITION cascade constraints;

drop table DM_DIMDUALELIGIBILITY cascade constraints;

drop table DM_DIMDUPLICATEREASON cascade constraints;

drop table DM_DIMDUPLICATESTATUS cascade constraints;

drop table DM_DIMEDUCATION cascade constraints;

drop table DM_DIMEDUCATIONLEVELS cascade constraints;

drop table DM_DIMEMPLOYMENTSTATUS cascade constraints;

drop table DM_DIMETHNICITY cascade constraints;

drop table DM_DIMFINANCIALSTATUS cascade constraints;

drop table DM_DIMFREQUENCYCRITERIA cascade constraints;

drop table DM_DIMFUND cascade constraints;

drop table DM_DIMGENDER cascade constraints;

drop table DM_DIMINDIGENOUSGROUPS cascade constraints;

drop table DM_DIMINDUSTRYTYPE cascade constraints;

drop table DM_DIMINTAKECATEGORY cascade constraints;

drop table DM_DIMINTAKETYPE cascade constraints;

drop table DM_DIMINTEGRATEDCASETYPES cascade constraints;

drop table DM_DIMINVRECOMMENDATION cascade constraints;

drop table DM_DIMINVSUBTYPE cascade constraints;

drop table DM_DIMMARITALSTATUS cascade constraints;

drop table DM_DIMMASCODES cascade constraints;

drop table DM_DIMMERGESTATUS cascade constraints;

drop table DM_DIMMILESTONEDURATION cascade constraints;

drop table DM_DIMNATIONALITY cascade constraints;

drop table DM_DIMNUMOFPARENTS cascade constraints;

drop table DM_DIMORGANISATION cascade constraints;

drop table DM_DIMORGUNIT cascade constraints;

drop table DM_DIMOUTCOME cascade constraints;

drop table DM_DIMPARTICIPANTSTATUS cascade constraints;

drop table DM_DIMPAYMETHOD cascade constraints;

drop table DM_DIMPERSONROLE cascade constraints;

drop table DM_DIMPERSONTYPE cascade constraints;

drop table DM_DIMPREFERREDLANGUAGE cascade constraints;

drop table DM_DIMPRODUCT cascade constraints;

drop table DM_DIMPROGRAM cascade constraints;

drop table DM_DIMPROVIDER cascade constraints;

drop table DM_DIMRACE cascade constraints;

drop table DM_DIMRECOMMENDATION cascade constraints;

drop table DM_DIMRECORDSTATUS cascade constraints;

drop table DM_DIMRECURRENCE cascade constraints;

drop table DM_DIMREPORTINGDUMMY cascade constraints;

drop table DM_DIMREPORTINGTIMELINESS cascade constraints;

drop table DM_DIMRESOLUTIONSTATUS cascade constraints;

drop table DM_DIMRESPONDSWITHINTIME cascade constraints;

drop table DM_DIMRESPONSEPRIORITY cascade constraints;

drop table DM_DIMSERVICE cascade constraints;

drop table DM_DIMSERVICEOFFERING cascade constraints;

drop table DM_DIMSTATUS cascade constraints;

drop table DM_DIMSUBSIDIZEDHOUSINGTYPES cascade constraints;

drop table DM_DIMTIMEOFDAYGROUPS cascade constraints;

drop table DM_DIMTIMEPERIOD cascade constraints;

drop table DM_DIMTRANSACTIONTYPE cascade constraints;

drop table DM_DIMUTILITY cascade constraints;

drop table DM_DIMYESNOINDICATOR cascade constraints;

drop table DM_ETLCONTROL cascade constraints;

drop table DM_FACTALLEGATION cascade constraints;

drop table DM_FACTCASEEVENT cascade constraints;

drop table DM_FACTCASEHISTORY cascade constraints;

drop table DM_FACTCASEPARTICIPANT cascade constraints;

drop table DM_FACTCONTACT cascade constraints;

drop table DM_FACTEDUCATIONHISTORY cascade constraints;

drop table DM_FACTEMPLOYERHISTORY cascade constraints;

drop table DM_FACTINVESTIGATION cascade constraints;

drop table DM_FACTPAYMENTS cascade constraints;

drop table DM_FACTPERSONHISTORY cascade constraints;

drop table DM_FACTPRODUCTAWARD cascade constraints;

drop table DM_FACTPRODUCTAWARDRECIPIENT cascade constraints;

drop table DM_FACTPRODUCTPROVIDERHISTORY cascade constraints;

drop table DM_FACTPROGRAMAPPLICATION cascade constraints;

drop table DM_FACTSERVICESUPPLIERHISTORY cascade constraints;

drop table DM_FACTSUSPENSE cascade constraints;

drop table DM_FACTUTILITYHISTORY cascade constraints;

drop sequence DMCASEPARTROLESEQ;

drop sequence DMCOUNTRYSEQ;

drop sequence DMDELIVERYMETHODSEQ;

drop sequence DMDIMDEMODATASEQ;

drop sequence DMEDUCATIONSEQ;

drop sequence DMETHNICSEQ;

drop sequence DMFACTDEMODATASEQ;

drop sequence DMGENDERSEQ;

drop sequence DMINDUSTRYTYPESEQ;

drop sequence DMMARITALSTATUSSEQ;

drop sequence DMPAYMETHODSEQ;

drop sequence DMPREFLANGSEQ;

drop sequence DMPROVIDERSEQ;

drop sequence DMSERVICEOFFERINGSEQ;

drop sequence DMSERVICESEQ;

drop sequence DMTIMEDEMODATASEQ;

drop sequence DMUTILITYSEQ;

