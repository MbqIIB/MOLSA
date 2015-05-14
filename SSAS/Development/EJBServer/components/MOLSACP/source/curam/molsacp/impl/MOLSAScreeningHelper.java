package curam.molsacp.impl;

import java.util.List;

import curam.citizenworkspace.configuration.impl.ScreeningType;
import curam.citizenworkspace.rules.impl.Program;
import curam.codetable.impl.CITIZENSHIPCODEEntry;
import curam.datastore.impl.Datastore;
import curam.datastore.impl.Entity;
import curam.datastore.impl.EntityType;
import curam.molsa.codetable.impl.RESIDENCYEntry;
import curam.molsacp.screening.entity.fact.MOLSAScreeningIncomeInfoFactory;
import curam.molsacp.screening.entity.fact.MOLSAScreeningInfoFactory;
import curam.molsacp.screening.entity.intf.MOLSAScreeningIncomeInfo;
import curam.molsacp.screening.entity.intf.MOLSAScreeningInfo;
import curam.molsacp.screening.entity.struct.MOLSAScreeningIncomeInfoDtls;
import curam.molsacp.screening.entity.struct.MOLSAScreeningInfoDtls;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.Date;
import curam.util.type.Money;
import curam.util.type.UniqueID;
import curam.workspaceservices.util.impl.DatastoreHelper;

public class MOLSAScreeningHelper {
	
	public void storeScreeningInfo(final ScreeningType screening,
		      final List<Program> programs, final Entity rootDatastoreEntity) throws AppException, InformationalException {
		
		// read datastore details
		String schemaName = rootDatastoreEntity.getDatastore().getSchemaName();

		// read data store details
		Datastore datastore = null;

		try {
			datastore = DatastoreHelper.openDatastore(schemaName);
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		// Get Person Entity
		final EntityType personEntityType = datastore.getEntityType("Person");
		final Entity[] personEntities = rootDatastoreEntity.getChildEntities(personEntityType);

		long relatedID = UniqueID.nextUniqueID();
		
		for (final Entity person : personEntities) {
			
			MOLSAScreeningInfoDtls screeningInfoDtls = new MOLSAScreeningInfoDtls();
			
			screeningInfoDtls.qid = person.getAttribute("qidNumber");
			screeningInfoDtls.gender = person.getAttribute("gender");
			screeningInfoDtls.name = person.getAttribute("firstName");
			screeningInfoDtls.dateOfBirth = Date.fromISO8601(person.getAttribute("dateOfBirth"));
			screeningInfoDtls.maritalStatus = person.getAttribute("maritalStatus");

			if(CITIZENSHIPCODEEntry.QATARI.getCode().equals(person.getAttribute("citizenshipStatus"))){
				screeningInfoDtls.qatari = true;
			} else {
				screeningInfoDtls.qatari = false;
			}
						
			if(RESIDENCYEntry.YES.getCode().equals(person.getAttribute("residencyStatus"))){
				screeningInfoDtls.resident = true;
			} else {
				screeningInfoDtls.resident = false;
			}
			
			screeningInfoDtls.schoolEnrolled = Boolean.parseBoolean(person
					.getAttribute("isMemberEnrolledInSchool"));
			screeningInfoDtls.phoneNumber = person.getAttribute("cellPhoneNumber");
			screeningInfoDtls.absentFather = Boolean.parseBoolean(person.getAttribute("hasAbsentFather"));

			screeningInfoDtls.unknownParent = Boolean.parseBoolean(person.getAttribute("hasAnonymousParents"));
			screeningInfoDtls.handicap = Boolean.parseBoolean(person.getAttribute("isPhysicallyChallenged"));
			screeningInfoDtls.unableToWork = Boolean.parseBoolean(person.getAttribute("isUnfitToWork"));
			screeningInfoDtls.maidAllowance = Boolean.parseBoolean(person.getAttribute("requiresMaidAssistance"));

			screeningInfoDtls.relatedID = relatedID;
			
			MOLSAScreeningInfo screeningInfo = MOLSAScreeningInfoFactory.newInstance();
			screeningInfo.insert(screeningInfoDtls);
			
			MOLSAScreeningIncomeInfo screeningIncomeInfo = MOLSAScreeningIncomeInfoFactory.newInstance();
			
			final EntityType incomeEntityType = datastore.getEntityType("Income");
			final Entity[] incomeEntities = person.getChildEntities(incomeEntityType);
			
			for (final Entity income : incomeEntities) {
				MOLSAScreeningIncomeInfoDtls screeningIncomeInfoDtls = new MOLSAScreeningIncomeInfoDtls();
				screeningIncomeInfoDtls.screeningInfoID = screeningInfoDtls.screeningInfoID;
				screeningIncomeInfoDtls.incomeType = income.getAttribute("incomeType");
				screeningIncomeInfoDtls.frequency = income.getAttribute("frequency");
				screeningIncomeInfoDtls.amount = new Money(income.getAttribute("amount"));
				
				screeningIncomeInfo.insert(screeningIncomeInfoDtls);
			}
		}
				
	}
}
