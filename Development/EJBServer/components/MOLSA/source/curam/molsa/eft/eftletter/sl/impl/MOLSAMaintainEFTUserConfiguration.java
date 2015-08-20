package curam.molsa.eft.eftletter.sl.impl;

import curam.codetable.RECORDSTATUS;
import curam.codetable.impl.RECORDSTATUSEntry;
import curam.core.facade.fact.PropertyAdminFactory;
import curam.core.facade.intf.PropertyAdmin;
import curam.core.facade.struct.PropertyAndDescriptionDetails;
import curam.core.facade.struct.PropertyAndDescriptionDetailsList;
import curam.core.facade.struct.ReadAllPropertiesIn;
import curam.core.fact.UsersFactory;
import curam.core.intf.Users;
import curam.core.sl.entity.struct.PositionDtls;
import curam.core.sl.entity.struct.PositionKey;
import curam.core.sl.entity.struct.ViewPositionUserOrgStructureOrgUnitDetails;
import curam.core.sl.fact.PositionFactory;
import curam.core.sl.intf.Position;
import curam.core.sl.struct.ListPositionsByUserKey;
import curam.core.sl.struct.OrgStructureAndPositionKey;
import curam.core.sl.struct.ViewPositionUserOrgStructureOrgUnitDetailsList;
import curam.core.struct.SearchAllUserByPositionKey;
import curam.core.struct.SearchByPositionKey;
import curam.core.struct.UserForOrgUnitDetails;
import curam.core.struct.UserForOrgUnitDetailsList;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.eft.eftletter.facade.struct.MOLSAEFTUserAllDetails;
import curam.molsa.eft.eftletter.sl.struct.MOLSAEFTUserAllDetailsList;
import curam.molsa.eft.eftletter.sl.struct.MOLSAEFTUserDetails;
import curam.molsa.eft.eftletter.sl.struct.MOLSAEFTUserDetailsList;
import curam.molsa.eftusers.entity.fact.MOLSAEFTUserConfigurationFactory;
import curam.molsa.eftusers.entity.intf.MOLSAEFTUserConfiguration;
import curam.molsa.eftusers.entity.struct.MOLSAEFTUserConfigurationDtls;
import curam.molsa.eftusers.entity.struct.MOLSAEFTUserConfigurationDtlsList;
import curam.molsa.eftusers.entity.struct.MOLSAEFTUserConfigurationKeyStruct1;
import curam.util.administration.struct.PropertiesSearchKey;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.internal.properties.fact.PropertiesFactory;
import curam.util.internal.properties.intf.Properties;
import curam.util.internal.properties.struct.PropertiesDtls;
import curam.util.internal.properties.struct.PropertiesKey;
import curam.util.transaction.TransactionInfo;

public class MOLSAMaintainEFTUserConfiguration extends
		curam.molsa.eft.eftletter.sl.base.MOLSAMaintainEFTUserConfiguration {

	@Override
	public MOLSAEFTUserDetailsList listAllUsersByPosition()
			throws AppException, InformationalException {
		MOLSAEFTUserDetailsList detailsList = new MOLSAEFTUserDetailsList();
		Users usersObj = UsersFactory.newInstance();

		int minCapacity = 0;

		// read the all user details by Assistant Manager Position
		SearchAllUserByPositionKey positionKey = new SearchAllUserByPositionKey();
		SearchByPositionKey paramSearchByPositionKey = new SearchByPositionKey();
		paramSearchByPositionKey.effectiveDate = TransactionInfo
				.getSystemDate();
		paramSearchByPositionKey.organisationStructureID = MOLSAConstants.kOrganisationStructureID;
		paramSearchByPositionKey.positionID = MOLSAConstants.kAssistantManagerPositionID;
		paramSearchByPositionKey.recordStatus = RECORDSTATUSEntry.NORMAL
				.getCode();
		UserForOrgUnitDetailsList assistantmanagerUsersList = usersObj
				.searchByPosition(paramSearchByPositionKey);

		// read the all user details by Manager Position
		SearchByPositionKey searchByPositionKey = new SearchByPositionKey();
		searchByPositionKey.effectiveDate = TransactionInfo.getSystemDate();
		searchByPositionKey.organisationStructureID = MOLSAConstants.kOrganisationStructureID;
		searchByPositionKey.positionID = MOLSAConstants.kManagerPositionID;
		searchByPositionKey.recordStatus = RECORDSTATUSEntry.NORMAL.getCode();
		UserForOrgUnitDetailsList managerUsersList = usersObj
				.searchByPosition(searchByPositionKey);
		
		
		// read the all user details by Secretary Position
		SearchByPositionKey searchBySecretaryPositionKey = new SearchByPositionKey();
		searchBySecretaryPositionKey.effectiveDate = TransactionInfo.getSystemDate();
		searchBySecretaryPositionKey.organisationStructureID = MOLSAConstants.kOrganisationStructureID;
		searchBySecretaryPositionKey.positionID = MOLSAConstants.kGeneralSecretaryPositionID;
		searchBySecretaryPositionKey.recordStatus = RECORDSTATUSEntry.NORMAL.getCode();
		UserForOrgUnitDetailsList secretaryUsersList = usersObj
				.searchByPosition(searchBySecretaryPositionKey);

		minCapacity = assistantmanagerUsersList.dtls.size()
				+ managerUsersList.dtls.size()+ secretaryUsersList.dtls.size();
		detailsList.dtls.dtls.ensureCapacity(minCapacity);

		for (UserForOrgUnitDetails orgUnitDetails : assistantmanagerUsersList.dtls) {
			MOLSAEFTUserDetails details = new MOLSAEFTUserDetails();
			details.dtls.userName1 = orgUnitDetails.userName;
			details.dtls.userName2 = orgUnitDetails.userName;
			details.dtls.userFullName1 = orgUnitDetails.userFullName;
			details.dtls.userFullName2 = orgUnitDetails.userFullName;
			detailsList.dtls.dtls.add(details.dtls);
		}

		for (UserForOrgUnitDetails orgUnitDetailsForOrgUnitDetails : managerUsersList.dtls) {
			MOLSAEFTUserDetails molsaeftUserDetails = new MOLSAEFTUserDetails();
			molsaeftUserDetails.dtls.userName1 = orgUnitDetailsForOrgUnitDetails.userName;
			molsaeftUserDetails.dtls.userName2 = orgUnitDetailsForOrgUnitDetails.userName;
			molsaeftUserDetails.dtls.userFullName1 = orgUnitDetailsForOrgUnitDetails.userFullName;
			molsaeftUserDetails.dtls.userFullName2 = orgUnitDetailsForOrgUnitDetails.userFullName;
			detailsList.dtls.dtls.add(molsaeftUserDetails.dtls);
		}
		
		for (UserForOrgUnitDetails orgUnitDetailsForOrgUnitDetails : secretaryUsersList.dtls) {
			MOLSAEFTUserDetails molsaeftUserDetails = new MOLSAEFTUserDetails();
			molsaeftUserDetails.dtls.userName1 = orgUnitDetailsForOrgUnitDetails.userName;
			molsaeftUserDetails.dtls.userName2 = orgUnitDetailsForOrgUnitDetails.userName;
			molsaeftUserDetails.dtls.userFullName1 = orgUnitDetailsForOrgUnitDetails.userFullName;
			molsaeftUserDetails.dtls.userFullName2 = orgUnitDetailsForOrgUnitDetails.userFullName;
			detailsList.dtls.dtls.add(molsaeftUserDetails.dtls);
		}
		return detailsList;
	}

	@Override
	public MOLSAEFTUserAllDetailsList listUsersConfiguredForEFTLetter()
			throws AppException, InformationalException {

		MOLSAEFTUserAllDetailsList allDetailsList = new MOLSAEFTUserAllDetailsList();
		curam.molsa.eftusers.entity.intf.MOLSAEFTUserConfiguration molsaeftUserConfigurationObj = MOLSAEFTUserConfigurationFactory
				.newInstance();
		Position positionObj = PositionFactory.newInstance();
		ViewPositionUserOrgStructureOrgUnitDetails userDetails1 = new ViewPositionUserOrgStructureOrgUnitDetails();
		ViewPositionUserOrgStructureOrgUnitDetails userDetails2 = new ViewPositionUserOrgStructureOrgUnitDetails();
		ListPositionsByUserKey paramListPositionsByUserKey = new ListPositionsByUserKey();

		MOLSAEFTUserConfigurationKeyStruct1 key = new MOLSAEFTUserConfigurationKeyStruct1();
		key.recordStatus = RECORDSTATUS.NORMAL;
		MOLSAEFTUserConfigurationDtlsList dtlsList = molsaeftUserConfigurationObj
				.listByRecordStatus(key);
		for (MOLSAEFTUserConfigurationDtls configurationDtls : dtlsList.dtls) {
			MOLSAEFTUserAllDetails details = new MOLSAEFTUserAllDetails();

			// Read the user full name by username1
			paramListPositionsByUserKey.userName = configurationDtls.userName1;
			ViewPositionUserOrgStructureOrgUnitDetailsList orgStructureOrgUnitDetailsList1 = positionObj
					.listPositionsByUser(paramListPositionsByUserKey);
			if (orgStructureOrgUnitDetailsList1.viewPositionUserOrgStructureOrgUnitDetailsList.dtls
					.size() != 0) {
				userDetails1 = orgStructureOrgUnitDetailsList1.viewPositionUserOrgStructureOrgUnitDetailsList.dtls
						.item(0);
			}

			// Read the user full name by username2
			paramListPositionsByUserKey.userName = configurationDtls.userName2;
			ViewPositionUserOrgStructureOrgUnitDetailsList orgStructureOrgUnitDetailsList2 = positionObj
					.listPositionsByUser(paramListPositionsByUserKey);
			if (orgStructureOrgUnitDetailsList2.viewPositionUserOrgStructureOrgUnitDetailsList.dtls
					.size() != 0) {
				userDetails2 = orgStructureOrgUnitDetailsList2.viewPositionUserOrgStructureOrgUnitDetailsList.dtls
						.item(0);
			}

			details.effectiveDateTime = configurationDtls.effectiveDateTime;
			details.userName1 = userDetails1.userFullName;
			details.userName2 = userDetails2.userFullName;
			details.userTitle1 = configurationDtls.userTitle1;
			details.userTitle2 = configurationDtls.userTitle2;
			allDetailsList.dtls.dtls.add(details);
		}
		return allDetailsList;
	}

	@Override
	public void configureUsersForEFTLetterConfiguration(MOLSAEFTUserDetails arg1)
			throws AppException, InformationalException {

		MOLSAEFTUserConfiguration configurationObj = MOLSAEFTUserConfigurationFactory
				.newInstance();
		Position positionObj = PositionFactory.newInstance();
		String jobName1 = null;
		String jobName2 = null;
		String userFullName1=null;
		String userFullName2=null;

		// Read the job details by username1
		ListPositionsByUserKey paramListPositionsByUserKey = new ListPositionsByUserKey();
		paramListPositionsByUserKey.userName = arg1.dtls.userName1;
		ViewPositionUserOrgStructureOrgUnitDetailsList orgStructureOrgUnitDetailsList = positionObj
				.listPositionsByUser(paramListPositionsByUserKey);
		if (orgStructureOrgUnitDetailsList.viewPositionUserOrgStructureOrgUnitDetailsList.dtls
				.size() != 0) {
			ViewPositionUserOrgStructureOrgUnitDetails details = orgStructureOrgUnitDetailsList.viewPositionUserOrgStructureOrgUnitDetailsList.dtls
					.item(0);
			jobName1 = details.jobName;
			userFullName1=details.userFullName;
		}
		// Read the job details by username2
		ListPositionsByUserKey listPositionsByUserKey = new ListPositionsByUserKey();
		listPositionsByUserKey.userName = arg1.dtls.userName2;
		ViewPositionUserOrgStructureOrgUnitDetailsList orgStructureOrgUnitDetailsList2 = positionObj
				.listPositionsByUser(listPositionsByUserKey);

		if (orgStructureOrgUnitDetailsList2.viewPositionUserOrgStructureOrgUnitDetailsList.dtls
				.size() != 0) {
			ViewPositionUserOrgStructureOrgUnitDetails orgStructureOrgUnitDetails = orgStructureOrgUnitDetailsList2.viewPositionUserOrgStructureOrgUnitDetailsList.dtls
					.item(0);
			jobName2 = orgStructureOrgUnitDetails.jobName;
			userFullName2=orgStructureOrgUnitDetails.userFullName;
		}
		// Update the application property
		// curam.molsa.financial.eft.nameOfAssistanceMinisterForSocialAffair
		PropertyAdmin adminObj = PropertyAdminFactory.newInstance();
		curam.util.administration.intf.PropertyAdmin propertyAdmin = curam.util.administration.fact.PropertyAdminFactory
				.newInstance();
		ReadAllPropertiesIn paramReadAllPropertiesIn = new ReadAllPropertiesIn();
		paramReadAllPropertiesIn.category = MOLSAConstants.KMOLSAOrganisationStructure;
		paramReadAllPropertiesIn.languageCode = TransactionInfo
				.getProgramLocale();
		paramReadAllPropertiesIn.nameOrDescription = MOLSAConstants.kUser1;
		PropertyAndDescriptionDetailsList andDescriptionDetailsList = adminObj
				.readAllProperties(paramReadAllPropertiesIn);
		PropertyAndDescriptionDetails propertyAndDescriptionDetails = andDescriptionDetailsList.dtls
				.item(0);

		// None of the API's from the class PropertyAdmin not returning the
		// versionNo,
		// So to get the versionNo do the below processing.
		Properties propertiesObj = PropertiesFactory.newInstance();
		PropertiesKey paramPropertiesKey = new PropertiesKey();
		paramPropertiesKey.propertyID = propertyAndDescriptionDetails.propertyID;
		PropertiesDtls propertiesDtls = propertiesObj.read(paramPropertiesKey);

		propertyAndDescriptionDetails.value = userFullName1;
		propertyAndDescriptionDetails.type = MOLSAConstants.KType;
		propertyAndDescriptionDetails.versionNo = propertiesDtls.versionNo;
		adminObj.modifyProperty(propertyAndDescriptionDetails);

		// Update the application property
		// curam.molsa.financial.eft.nameOfSocialSecurityDirector
		paramReadAllPropertiesIn.nameOrDescription = MOLSAConstants.kUser2;
		PropertyAndDescriptionDetailsList andDescriptionDetailsList1 = adminObj
				.readAllProperties(paramReadAllPropertiesIn);
		PropertyAndDescriptionDetails propertyAndDescriptionDetails1 = andDescriptionDetailsList1.dtls
				.item(0);

		paramPropertiesKey.propertyID = propertyAndDescriptionDetails1.propertyID;
		PropertiesDtls propertiesDtls1 = propertiesObj.read(paramPropertiesKey);

		propertyAndDescriptionDetails1.value = userFullName2;
		propertyAndDescriptionDetails1.type = MOLSAConstants.KType;
		propertyAndDescriptionDetails1.versionNo = propertiesDtls1.versionNo;
		adminObj.modifyProperty(propertyAndDescriptionDetails1);

		// Update the application property
		// curam.molsa.financial.eft.mswordSignatureTitleOne
		paramReadAllPropertiesIn.nameOrDescription = MOLSAConstants.kTitle1;
		PropertyAndDescriptionDetailsList andDescriptionDetailsList2 = adminObj
				.readAllProperties(paramReadAllPropertiesIn);
		PropertyAndDescriptionDetails propertyAndDescriptionDetails2 = andDescriptionDetailsList2.dtls
				.item(0);

		paramPropertiesKey.propertyID = propertyAndDescriptionDetails2.propertyID;
		PropertiesDtls propertiesDtls2 = propertiesObj.read(paramPropertiesKey);

		propertyAndDescriptionDetails2.value = jobName1;
		propertyAndDescriptionDetails2.type = MOLSAConstants.KType;
		propertyAndDescriptionDetails2.versionNo = propertiesDtls2.versionNo;
		adminObj.modifyProperty(propertyAndDescriptionDetails2);

		// Update the application property
		// curam.molsa.financial.eft.mswordSignatureTitleTwo
		paramReadAllPropertiesIn.nameOrDescription = MOLSAConstants.kTitle2;
		PropertyAndDescriptionDetailsList andDescriptionDetailsList3 = adminObj
				.readAllProperties(paramReadAllPropertiesIn);
		PropertyAndDescriptionDetails propertyAndDescriptionDetails3 = andDescriptionDetailsList3.dtls
				.item(0);

		paramPropertiesKey.propertyID = propertyAndDescriptionDetails3.propertyID;
		PropertiesDtls propertiesDtls3 = propertiesObj.read(paramPropertiesKey);

		propertyAndDescriptionDetails3.value = jobName2;
		propertyAndDescriptionDetails3.type = MOLSAConstants.KType;
		propertyAndDescriptionDetails3.versionNo = propertiesDtls3.versionNo;
		adminObj.modifyProperty(propertyAndDescriptionDetails3);

		// Publish the changes.
		adminObj.publishPropertyChanges();

		// Insert the EFT User details to MOLSAEFTUserConfiguration entity.
		MOLSAEFTUserConfigurationDtls details1 = new MOLSAEFTUserConfigurationDtls();
		details1.effectiveDateTime = TransactionInfo.getSystemDateTime();
		details1.recordStatus = RECORDSTATUS.NORMAL;
		details1.userName1 = arg1.dtls.userName1;
		details1.userName2 = arg1.dtls.userName2;
		details1.userTitle1 = jobName1;
		details1.userTitle2 = jobName2;
		configurationObj.insert(details1);
	}
}
