package curam.molsa.moi.facade.impl;

import java.text.ParsePosition;








import java.util.List;

import org.apache.axis2.transport.http.HTTPConstants;

import com.google.inject.Inject;
import com.pmmsoapmessenger.MessengerStub;
import com.pmmsoapmessenger.MessengerStub.SendSms;

import curam.codetable.CASEEVIDENCE;
import curam.codetable.CASEPARTICIPANTROLETYPE;
import curam.codetable.CASESTATUS;
import curam.codetable.CASETYPECODE;
import curam.codetable.CONCERNROLEALTERNATEID;
import curam.codetable.EVIDENCEDESCRIPTORSTATUS;
import curam.codetable.GENDER;
import curam.codetable.impl.CASEEVIDENCEEntry;
import curam.core.facade.fact.CaseHeaderFactory;
import curam.core.facade.intf.CaseHeader;
import curam.core.facade.struct.ConcernRoleIDStatusCodeKey;
import curam.core.impl.CuramConst;
import curam.core.impl.EnvVars;
import curam.core.sl.entity.struct.CaseParticipantRoleKey;
import curam.core.sl.entity.struct.ParticipantRoleIDAndNameDetails;
import curam.core.sl.fact.CaseParticipantRoleFactory;
import curam.core.sl.infrastructure.entity.base.EvidenceDescriptor;
import curam.core.sl.infrastructure.entity.fact.EvidenceDescriptorFactory;
import curam.core.sl.infrastructure.entity.struct.CaseIDStatusAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorDtls;
import curam.core.sl.infrastructure.entity.struct.EvidenceDescriptorDtlsList;
import curam.core.sl.infrastructure.entity.struct.EvidenceTypeAndStatus;
import curam.core.sl.infrastructure.entity.struct.RelatedIDAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.RelatedIDAndEvidenceTypeKeyList;
import curam.core.sl.intf.CaseParticipantRole;
import curam.core.sl.struct.CaseHeaderDtlsList;
import curam.core.sl.struct.CaseIDTypeCodeKey;
import curam.core.sl.struct.CaseParticipantRoleFullDetails1;
import curam.core.sl.struct.EvidenceCaseKey;
import curam.core.sl.struct.EvidenceTypeKey;
import curam.core.struct.CaseHeaderDtls;
import curam.core.struct.ConcernRoleID;
import curam.core.struct.PersonKey;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetails;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetailsFactory;
import curam.dynamicevidence.sl.impl.CpDetailsAdaptor;
import curam.dynamicevidence.sl.impl.EvidenceGenericSLFactory;
import curam.dynamicevidence.sl.impl.EvidenceServiceInterface;
import curam.dynamicevidence.sl.struct.impl.GenericSLDataDetails;
import curam.dynamicevidence.sl.struct.impl.ReadEvidenceDetails;
import curam.dynamicevidence.type.impl.DynamicEvidenceTypeConverter;
import curam.message.MOLSANOTIFICATION;
import curam.message.MOLSASMSSERVICE;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.molsa.moi.entity.fact.MOLSAMoiFactory;
import curam.molsa.moi.entity.struct.MOLSAMoiDtls;
import curam.molsa.moi.entity.struct.MOLSAMoiKey;
import curam.molsa.moi.facade.struct.MOLSAConcernRoleTabbedList;
import curam.molsa.moi.sl.fact.MOLSAMaintainMoiFactory;
import curam.molsa.moi.sl.intf.MOLSAMaintainMoi;
import curam.molsa.util.impl.MOLSAParticipantHelper;
import curam.participant.impl.ConcernRoleDAO;
import curam.pdc.facade.fact.PDCPersonFactory;
import curam.pdc.facade.intf.PDCPerson;
import curam.pdc.facade.struct.PDCEvidenceDetails;
import curam.pdc.facade.struct.PDCEvidenceDetailsList;
import curam.piwrapper.casemanager.impl.CaseParticipantRoleDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.LocalisableString;
import curam.util.persistence.GuiceWrapper;
import curam.util.resources.Configuration;
import curam.util.resources.StringUtil;
import curam.util.type.Date;
import curam.util.type.StringList;

/**
 * The class contains implementation of MOI update and MOI read functionality.
 */
@SuppressWarnings("restriction")
public abstract class MOLSAMoi extends curam.molsa.moi.facade.base.MOLSAMoi {

  
  @Inject
  private CaseParticipantRoleDAO caseParticipantRoleDAO;
  
  @Inject
  private ConcernRoleDAO concernRoleDAO;
  
  /**
   * Constructor.
   */
  public MOLSAMoi() {
    super();
    GuiceWrapper.getInjector().injectMembers(this);
  }
	/**
	 * This method returns details from MOLSA MOI table by reading MOLSAMoiKey
	 * parameter.
	 * 
	 * @param arg1
	 *            MOLSAMoiKey
	 * @return MOI Details
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	@Override
	public MOLSAMoiDtls getMoiDetails(MOLSAMoiKey arg1) throws AppException,
			InformationalException {
		MOLSAMaintainMoi maintainMoiObj = MOLSAMaintainMoiFactory.newInstance();
		return maintainMoiObj.getMoiDetails(arg1);
	}

	/**
	 * This method updates the evidences based on the MOI details. It takes
	 * ConcernRoleID as input parameter parameter and modifies Name, Date of
	 * birth and Gender evidence
	 * 
	 * @param arg1
	 *            ConcernRoleID
	 * @return void
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	@SuppressWarnings("static-access")
	@Override
	public void updateMoiDetails(MOLSAConcernRoleTabbedList arg1) throws AppException,
			InformationalException {

	  if(arg1.concernRoleTabbedList.length()==0){
      curam.core.sl.infrastructure.impl.ValidationManagerFactory
      .getManager()
      .throwWithLookup(
          new AppException(
              MOLSASMSSERVICE.NO_CONCERNROLE_SELECTED),
          curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
          0);
    }
	  StringList concernRoleIDList = StringUtil.delimitedText2StringList(arg1.concernRoleTabbedList, CuramConst.gkTabDelimiterChar);
      for (String concernRoleID : concernRoleIDList) {
        

     // get the case details based on concernroleID and status
        List<curam.piwrapper.casemanager.impl.CaseParticipantRole>  caseParticipantRoleList = caseParticipantRoleDAO.listActiveByParticipant(concernRoleDAO.get(Long.parseLong(concernRoleID)));

        // loop through the cases and iterate through integrated case and
        // update the evidence
        for (final curam.piwrapper.casemanager.impl.CaseParticipantRole caseParticipantRole : caseParticipantRoleList){
         if( caseParticipantRole.getCase().getCaseType().getCode().equalsIgnoreCase(CASETYPECODE.INTEGRATEDCASE)
        		 && 
        		 (caseParticipantRole.getType().getCode().equalsIgnoreCase(CASEPARTICIPANTROLETYPE.MEMBER)
        				 || caseParticipantRole.getType().getCode().equalsIgnoreCase(CASEPARTICIPANTROLETYPE.PRIMARY)
        		  )
        	){
           
	
		long integratedCaseID = 0;

		MOLSAParticipantHelper participantHelper = new MOLSAParticipantHelper();
		// Getting QID from the concern role ID.
		String qid = participantHelper.returnConcernRoleAlternateID(
		    Long.parseLong(concernRoleID), CONCERNROLEALTERNATEID.INSURANCENUMBER);
		MOLSAMoiKey moiKey = new MOLSAMoiKey();
		moiKey.qid = qid;
		curam.molsa.moi.entity.intf.MOLSAMoi molsaMoi = MOLSAMoiFactory
				.newInstance();
		MOLSAMoiDtls molsaMoiDtls = molsaMoi.read(moiKey);

		LocalisableString updatedComments = new LocalisableString(
				MOLSANOTIFICATION.MOI_COMMENTS);

		// loop through the cases and iterate through integrated case and
		// update the evidence
		
				integratedCaseID = caseParticipantRole.getCase().getID();
			

				CaseParticipantRoleKey paramCaseParticipantRoleKey = new CaseParticipantRoleKey();
				paramCaseParticipantRoleKey.caseParticipantRoleID = caseParticipantRole.getID();

				ReadEvidenceDetails readBirthDeathDetails = new ReadEvidenceDetails();
				ReadEvidenceDetails readInEditBirthDeathDetails = new ReadEvidenceDetails();
				ReadEvidenceDetails readGenderEvidence = new ReadEvidenceDetails();
				ReadEvidenceDetails readInEditGenderEvidence = new ReadEvidenceDetails();
				ReadEvidenceDetails readNameEvidence = new ReadEvidenceDetails();

				// Read date of birth from birth and death evidence
				readBirthDeathDetails = readCaseEvidenceDetails(
						integratedCaseID, CASEEVIDENCEEntry.BIRTHDEATHDETAILS,
						caseParticipantRole.getID(),
						caseParticipantRole.getConcernRole().getName());
				
				// Read date of birth from birth and death evidence
				readInEditBirthDeathDetails = readInEditCaseEvidenceDetails(
						integratedCaseID, CASEEVIDENCEEntry.BIRTHDEATHDETAILS,
						caseParticipantRole.getID(),
						caseParticipantRole.getConcernRole().getName());
				
				// Read the gender details from gender evidence
				readGenderEvidence = readCaseEvidenceDetails(integratedCaseID,
						CASEEVIDENCEEntry.GENDER,
						caseParticipantRole.getID(),
            caseParticipantRole.getConcernRole().getName());
				
				// Read the gender details from gender evidence
				readInEditGenderEvidence = readInEditCaseEvidenceDetails(integratedCaseID,
						CASEEVIDENCEEntry.GENDER,
						caseParticipantRole.getID(),
            caseParticipantRole.getConcernRole().getName());
				
				// Read the name details from names evidence
				readNameEvidence = readNameEvidenceDetails(integratedCaseID,
						CASEEVIDENCEEntry.NAME, Long.parseLong(concernRoleID),
						 caseParticipantRole.getConcernRole().getName());
				
				// Compare the person DOB details with MOI date of birth details
				if (!(readBirthDeathDetails.dtls == null)) {

					final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
					evidenceTypeKey.evidenceType = CASEEVIDENCE.BIRTHDEATHDETAILS;

					
  
					java.text.SimpleDateFormat originalFormatter = new java.text.SimpleDateFormat(
							MOLSAConstants.kdateRequired);
					
				
					java.util.Date dateFromString = molsaMoiDtls.dateOfBirth.getCalendar().getTime();
						
					String dateStringInOriginalFormat = originalFormatter
							.format(dateFromString);
					

					if (!(readBirthDeathDetails.dtls
							.getAttribute(MOLSAConstants.dateOfBirth)
							.getValue().toString()
							.equals(dateStringInOriginalFormat))) {

						final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
						.instance(evidenceTypeKey,
								Date.getCurrentDate());
						final DynamicEvidenceDataDetails dynamicEvidenceDataDetails = readBirthDeathDetails.dtls;
						final GenericSLDataDetails dynamicEvidenceDetails = new GenericSLDataDetails();
						dynamicEvidenceDataDetails.getAttribute(
								MOLSAConstants.dateOfBirth).setValue(
								dateStringInOriginalFormat);
						dynamicEvidenceDataDetails.getAttribute(
								MOLSAConstants.comments).setValue(
								updatedComments.getMessage());
						dynamicEvidenceDetails.getCaseIdKey().caseID = integratedCaseID;
						dynamicEvidenceDetails
								.setDescriptor(readBirthDeathDetails.descriptor);
						dynamicEvidenceDetails
								.setData(dynamicEvidenceDataDetails);
						evidenceServiceInterface
								.modifyEvidence(dynamicEvidenceDetails);
					}
				} else {
					
					if (readInEditBirthDeathDetails.dtls == null) {
						// Create a new One..
						final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
						evidenceTypeKey.evidenceType = CASEEVIDENCE.BIRTHDEATHDETAILS;				
	  
						java.text.SimpleDateFormat originalFormatter = new java.text.SimpleDateFormat(
								MOLSAConstants.kdateRequired);					
						java.util.Date dateFromString = molsaMoiDtls.dateOfBirth.getCalendar().getTime();						
						String dateStringInOriginalFormat = originalFormatter
								.format(dateFromString);
					
						
						final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
						.instance(evidenceTypeKey,
								Date.getCurrentDate());
						final DynamicEvidenceDataDetails  dynamicEvidenceDataDetails = 
							DynamicEvidenceDataDetailsFactory.newInstance(CASEEVIDENCE.BIRTHDEATHDETAILS, Date.getCurrentDate());
						
						final GenericSLDataDetails dynamicEvidenceDetails = new GenericSLDataDetails();
						
						
						dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.dateOfBirth)
								.setValue(dateStringInOriginalFormat);
						dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.comments)
								.setValue(updatedComments.getMessage());
						dynamicEvidenceDetails.getCaseIdKey().caseID = integratedCaseID;
						dynamicEvidenceDetails.setData(dynamicEvidenceDataDetails);
						//dynamicEvidenceDetails.setDescriptor(readEvidenceDetails.descriptor);
						dynamicEvidenceDetails.getDescriptor().receivedDate = Date.getCurrentDate();
						
						 CpDetailsAdaptor cpDetails = new CpDetailsAdaptor();
						 cpDetails.setCaseParticipantRoleID(caseParticipantRole.getID());
						 cpDetails.setParticipantRoleID(caseParticipantRole.getConcernRole().getID());
						dynamicEvidenceDetails.addRelCp("person", cpDetails);
						   					
						evidenceServiceInterface.createEvidence(dynamicEvidenceDetails);
					
					}
				}
				// Check if the gender evidence details is same as details in
				// the MOI.
				if (!(readGenderEvidence.dtls == null)) {

					final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
					evidenceTypeKey.evidenceType = CASEEVIDENCE.GENDER;
					// Convert the gender code in MOI to the standard curam
					// format like SX1, SX2 ..
					String genderCode = new String();
					if ((molsaMoiDtls.sexCode == MOLSAConstants.kOne)) {
						genderCode = GENDER.MALE;
					} else if ((molsaMoiDtls.sexCode == MOLSAConstants.kTwo)) {
						genderCode = GENDER.FEMALE;
					}
					// Set the value from the data in the MOI.
					if ((!readGenderEvidence.dtls
							.getAttribute(MOLSAConstants.gender).getValue()
							.toString().equals(genderCode))) {
						final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
								.instance(evidenceTypeKey,
										Date.getCurrentDate());
						final DynamicEvidenceDataDetails dynamicEvidenceDataDetails2 = readGenderEvidence.dtls;
						final GenericSLDataDetails dynamicEvidenceDetails2 = new GenericSLDataDetails();
						dynamicEvidenceDataDetails2.getAttribute(
								MOLSAConstants.gender).setValue(genderCode);
						dynamicEvidenceDataDetails2.getAttribute(
								MOLSAConstants.comments).setValue(
								updatedComments.getMessage());
						dynamicEvidenceDetails2.getCaseIdKey().caseID = integratedCaseID;
						dynamicEvidenceDetails2
								.setDescriptor(readGenderEvidence.descriptor);
						dynamicEvidenceDetails2
								.setData(dynamicEvidenceDataDetails2);
						evidenceServiceInterface
								.modifyEvidence(dynamicEvidenceDetails2);
					}
				} else {
					if (readInEditGenderEvidence.dtls == null) {
						// Create a new One..
						final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
						evidenceTypeKey.evidenceType = CASEEVIDENCE.GENDER;				
	  
						// Convert the gender code in MOI to the standard curam
						// format like SX1, SX2 ..
						String genderCode = new String();
						if ((molsaMoiDtls.sexCode == MOLSAConstants.kOne)) {
							genderCode = GENDER.MALE;
						} else if ((molsaMoiDtls.sexCode == MOLSAConstants.kTwo)) {
							genderCode = GENDER.FEMALE;
						}
					
						
						final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
						.instance(evidenceTypeKey,
								Date.getCurrentDate());
						final DynamicEvidenceDataDetails  dynamicEvidenceDataDetails = 
							DynamicEvidenceDataDetailsFactory.newInstance(CASEEVIDENCE.GENDER, Date.getCurrentDate());
						
						final GenericSLDataDetails dynamicEvidenceDetails = new GenericSLDataDetails();
						
						
						dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.gender)
								.setValue(genderCode);
						dynamicEvidenceDataDetails.getAttribute(MOLSAConstants.comments)
								.setValue(updatedComments.getMessage());
						dynamicEvidenceDetails.getCaseIdKey().caseID = integratedCaseID;
						dynamicEvidenceDetails.setData(dynamicEvidenceDataDetails);
						//dynamicEvidenceDetails.setDescriptor(readEvidenceDetails.descriptor);
						dynamicEvidenceDetails.getDescriptor().receivedDate = Date.getCurrentDate();
						
						 CpDetailsAdaptor cpDetails = new CpDetailsAdaptor();
						 cpDetails.setCaseParticipantRoleID(caseParticipantRole.getID());
						 cpDetails.setParticipantRoleID(caseParticipantRole.getConcernRole().getID());
						dynamicEvidenceDetails.addRelCp("person", cpDetails);
						   					
						evidenceServiceInterface.createEvidence(dynamicEvidenceDetails);
					}
				}
				// Check if the name evidence details is same as name details in
				// MOI else update the same.
				if (!(readNameEvidence.dtls == null)) {
					final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
					evidenceTypeKey.evidenceType = CASEEVIDENCE.NAME;
					StringBuffer middleName = new StringBuffer("");
					if (!molsaMoiDtls.secondName_ar.isEmpty()) {
						middleName.append(molsaMoiDtls.secondName_ar + " ");
					}
					if (!molsaMoiDtls.thirdName_ar.isEmpty()) {
						middleName.append(molsaMoiDtls.thirdName_ar+ " ");
					}
					if (!molsaMoiDtls.fourthName_ar.isEmpty()) {
						middleName.append(molsaMoiDtls.fourthName_ar);
					}
					
					// Compare first name, last name and middle name with the
					// MOI name details.
					if (!readNameEvidence.dtls.getAttribute(MOLSAConstants.firstName).getValue().toString().equals(molsaMoiDtls.firstName_ar)
							|| !readNameEvidence.dtls.getAttribute(MOLSAConstants.lastName).getValue().toString().equals(molsaMoiDtls.fifthName_ar)
							|| !readNameEvidence.dtls.getAttribute(MOLSAConstants.middleName).getValue().toString().equals(middleName.toString().trim())) {
						final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
								.instance(evidenceTypeKey,
										Date.getCurrentDate());
						final DynamicEvidenceDataDetails dynamicEvidenceDataDetails3 = readNameEvidence.dtls;
						final GenericSLDataDetails dynamicEvidenceDetails3 = new GenericSLDataDetails();
						dynamicEvidenceDataDetails3.getAttribute(
								MOLSAConstants.firstName).setValue(
								molsaMoiDtls.firstName_ar);
						dynamicEvidenceDataDetails3.getAttribute(
								MOLSAConstants.middleName).setValue(middleName.toString().trim());
						dynamicEvidenceDataDetails3.getAttribute(
								MOLSAConstants.lastName).setValue(
								molsaMoiDtls.fifthName_ar);
						dynamicEvidenceDataDetails3.getAttribute(
								MOLSAConstants.comments).setValue(
								updatedComments.getMessage());
						dynamicEvidenceDetails3.getCaseIdKey().caseID = readNameEvidence.descriptor.caseID;
						dynamicEvidenceDetails3
								.setDescriptor(readNameEvidence.descriptor);
						dynamicEvidenceDetails3
								.setData(dynamicEvidenceDataDetails3);
						evidenceServiceInterface
								.modifyEvidence(dynamicEvidenceDetails3);
					}
				}

			}
		}
      }
	}

	/**
	 * This method reads the active evidences. case Evidence is used to select
	 * the type of evidence.
	 * 
	 * @param caseID
	 *            Long
	 * @param caseEvidence
	 *            CASEEVIDENCEEntry
	 * @param caseParticipantRoleID
	 *            Long
	 * @param participant
	 *            String
	 * @return ReadEvidenceDetails
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	private ReadEvidenceDetails readCaseEvidenceDetails(final Long caseID,
			final CASEEVIDENCEEntry caseEvidence,
			final Long caseParticipantRoleID, final String participant)
			throws AppException, InformationalException {

		final CaseIDStatusAndEvidenceTypeKey caseIDStatusAndEvidenceTypeKey = new CaseIDStatusAndEvidenceTypeKey();

		caseIDStatusAndEvidenceTypeKey.caseID = caseID;
		caseIDStatusAndEvidenceTypeKey.evidenceType = caseEvidence.getCode();
		caseIDStatusAndEvidenceTypeKey.statusCode = EVIDENCEDESCRIPTORSTATUS.ACTIVE;

		final EvidenceDescriptor evidenceDescriptorObj = (EvidenceDescriptor) EvidenceDescriptorFactory
				.newInstance();

		// get all the evidence details for the caseID
		final RelatedIDAndEvidenceTypeKeyList relatedIDAndEvidenceTypeKeyList = evidenceDescriptorObj
				.searchByCaseIDTypeAndStatus(caseIDStatusAndEvidenceTypeKey);

		final EvidenceCaseKey evidenceCaseKey = new EvidenceCaseKey();
		final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
		evidenceTypeKey.evidenceType = caseEvidence.getCode();

		final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
				.instance(evidenceTypeKey, Date.getCurrentDate());
		DynamicEvidenceDataDetails dynamicEvidenceDataDetails = null;
		for (final RelatedIDAndEvidenceTypeKey relatedIDAndEvidenceTypeKey : relatedIDAndEvidenceTypeKeyList.dtls) {

			evidenceCaseKey.caseIDKey.caseID = caseID;
			evidenceCaseKey.evidenceKey.evidenceID = relatedIDAndEvidenceTypeKey.relatedID;
			evidenceCaseKey.evidenceKey.evType = relatedIDAndEvidenceTypeKey.evidenceType;
			final ReadEvidenceDetails evidenceDetails = evidenceServiceInterface
					.readEvidence(evidenceCaseKey);
			dynamicEvidenceDataDetails = evidenceDetails.dtls;

			// get the caseparticipantroleID and compare to get the matching
			// evidence
			if (null != dynamicEvidenceDataDetails) {
				final Long caseparticipantRoleID;
				if (caseEvidence.equals(CASEEVIDENCEEntry.BIRTHDEATHDETAILS)) {
					caseparticipantRoleID = (Long) DynamicEvidenceTypeConverter
							.convert(dynamicEvidenceDataDetails
									.getAttribute(MOLSAConstants.person));
				} else if (caseEvidence.equals(CASEEVIDENCEEntry.GENDER)) {
					caseparticipantRoleID = (Long) DynamicEvidenceTypeConverter
							.convert(dynamicEvidenceDataDetails
									.getAttribute(MOLSAConstants.person));
				} else {
					caseparticipantRoleID = (Long) DynamicEvidenceTypeConverter
							.convert(dynamicEvidenceDataDetails
									.getAttribute(MOLSAConstants.participant));
				}
				// Compare the evidence details with the required case
				// participant role ID.
				if (caseParticipantRoleID.equals(caseparticipantRoleID)) {
					return evidenceDetails;
				}
			}
		}
		return new ReadEvidenceDetails();
	}

	/**
	 * This method reads the active evidences. case Evidence is used to select
	 * the type of evidence.
	 * 
	 * @param caseID
	 *            Long
	 * @param caseEvidence
	 *            CASEEVIDENCEEntry
	 * @param caseParticipantRoleID
	 *            Long
	 * @param participant
	 *            String
	 * @return ReadEvidenceDetails
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	private ReadEvidenceDetails readInEditCaseEvidenceDetails(final Long caseID,
			final CASEEVIDENCEEntry caseEvidence,
			final Long caseParticipantRoleID, final String participant)
			throws AppException, InformationalException {

		final CaseIDStatusAndEvidenceTypeKey caseIDStatusAndEvidenceTypeKey = new CaseIDStatusAndEvidenceTypeKey();

		caseIDStatusAndEvidenceTypeKey.caseID = caseID;
		caseIDStatusAndEvidenceTypeKey.evidenceType = caseEvidence.getCode();
		caseIDStatusAndEvidenceTypeKey.statusCode = EVIDENCEDESCRIPTORSTATUS.INEDIT;

		final EvidenceDescriptor evidenceDescriptorObj = (EvidenceDescriptor) EvidenceDescriptorFactory
				.newInstance();

		// get all the evidence details for the caseID
		final RelatedIDAndEvidenceTypeKeyList relatedIDAndEvidenceTypeKeyList = evidenceDescriptorObj
				.searchByCaseIDTypeAndStatus(caseIDStatusAndEvidenceTypeKey);

		final EvidenceCaseKey evidenceCaseKey = new EvidenceCaseKey();
		final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
		evidenceTypeKey.evidenceType = caseEvidence.getCode();

		final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
				.instance(evidenceTypeKey, Date.getCurrentDate());
		DynamicEvidenceDataDetails dynamicEvidenceDataDetails = null;
		for (final RelatedIDAndEvidenceTypeKey relatedIDAndEvidenceTypeKey : relatedIDAndEvidenceTypeKeyList.dtls) {

			evidenceCaseKey.caseIDKey.caseID = caseID;
			evidenceCaseKey.evidenceKey.evidenceID = relatedIDAndEvidenceTypeKey.relatedID;
			evidenceCaseKey.evidenceKey.evType = relatedIDAndEvidenceTypeKey.evidenceType;
			final ReadEvidenceDetails evidenceDetails = evidenceServiceInterface
					.readEvidence(evidenceCaseKey);
			dynamicEvidenceDataDetails = evidenceDetails.dtls;

			// get the caseparticipantroleID and compare to get the matching
			// evidence
			if (null != dynamicEvidenceDataDetails) {
				final Long caseparticipantRoleID;
				if (caseEvidence.equals(CASEEVIDENCEEntry.BIRTHDEATHDETAILS)) {
					caseparticipantRoleID = (Long) DynamicEvidenceTypeConverter
							.convert(dynamicEvidenceDataDetails
									.getAttribute(MOLSAConstants.person));
				} else if (caseEvidence.equals(CASEEVIDENCEEntry.GENDER)) {
					caseparticipantRoleID = (Long) DynamicEvidenceTypeConverter
							.convert(dynamicEvidenceDataDetails
									.getAttribute(MOLSAConstants.person));
				} else {
					caseparticipantRoleID = (Long) DynamicEvidenceTypeConverter
							.convert(dynamicEvidenceDataDetails
									.getAttribute(MOLSAConstants.participant));
				}
				// Compare the evidence details with the required case
				// participant role ID.
				if (caseParticipantRoleID.equals(caseparticipantRoleID)) {
					return evidenceDetails;
				}
			}
		}
		return new ReadEvidenceDetails();
	}
	/**
	 * This method is used to read details of active name evidence from a Name
	 * evidence of a required concern role ID.
	 * 
	 * @param caseID
	 *            Long
	 * @param caseEvidence
	 *            CASEEVIDENCEEntry
	 * @param concernRole
	 *            Long
	 * @param participant
	 *            String
	 * @return ReadEvidenceDetails
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	@SuppressWarnings("static-access")
	private ReadEvidenceDetails readNameEvidenceDetails(final Long caseID,
			final CASEEVIDENCEEntry caseEvidence, final Long concernRole,
			final String participant) throws AppException,
			InformationalException {

		
		PDCPerson pdcPersonObj =  PDCPersonFactory.newInstance();
		PersonKey personKey = new PersonKey();
		personKey.concernRoleID = concernRole;
		PDCEvidenceDetailsList pdcEvidenceDetailsList = pdcPersonObj.listEvidenceForParticipant(personKey);
	
		
		// Set the evidence type codes to name evidence
		/*
		EvidenceTypeAndStatus key = new EvidenceTypeAndStatus();
		key.evidenceType = caseEvidence.getCode();
		key.statusCode = EVIDENCEDESCRIPTORSTATUS.ACTIVE;
		final EvidenceDescriptorDtlsList evidenceDescriptorDtlsList = evidenceDescriptorObj
				.searchByEvidenceTypeAndStatusCode(key);
        */
		final EvidenceCaseKey evidenceCaseKey = new EvidenceCaseKey();
		final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
		evidenceTypeKey.evidenceType = caseEvidence.getCode();
		
		
		// Read the evidence data
		final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
				.instance(evidenceTypeKey, Date.getCurrentDate());
		
		DynamicEvidenceDataDetails dynamicEvidenceDataDetails = null;
		//for (final EvidenceDescriptorDtls evidenceDescriptorDtlsKey : evidenceDescriptorDtlsList.dtls) {
		for (final PDCEvidenceDetails pdcEvidenceDetails : pdcEvidenceDetailsList.list) {
			//evidenceCaseKey.caseIDKey.caseID = caseID;
			//evidenceCaseKey.evidenceKey.evidenceID = evidenceDescriptorDtlsKey.relatedID;
			//evidenceCaseKey.evidenceKey.evType = evidenceDescriptorDtlsKey.evidenceType;
			evidenceCaseKey.caseIDKey.caseID = pdcEvidenceDetails.caseID;
			evidenceCaseKey.evidenceKey.evidenceID = pdcEvidenceDetails.evidenceID;
			
			if(!pdcEvidenceDetails.evidenceType.equals(caseEvidence.getCode())) {
				continue;
			}
			evidenceCaseKey.evidenceKey.evType = caseEvidence.getCode();			
			final ReadEvidenceDetails evidenceDetails = evidenceServiceInterface
					.readEvidence(evidenceCaseKey);
			dynamicEvidenceDataDetails = evidenceDetails.dtls;
			//System.out.println(pdcEvidenceDetails.caseID+" "+ pdcEvidenceDetails.evidenceID+" "+ caseEvidence.getCode());
			// Check if the evidence details returned in not null
			if (null != dynamicEvidenceDataDetails) {
				return evidenceDetails;
				/*
				final Long caseparticipantRoleID;
				caseparticipantRoleID = (Long) DynamicEvidenceTypeConverter
						.convert(dynamicEvidenceDataDetails
								.getAttribute(MOLSAConstants.participant));

				MOLSAParticipantHelper participantHelper = new MOLSAParticipantHelper();
				long concernRoleId = participantHelper
						.returnConcernRoleIDFromCaseParticipantRoleID(caseparticipantRoleID);
				// Check for the details matching to the required concernRoleID
				if (concernRole.equals(concernRoleId)) {
					return evidenceDetails;
				}
				*/
			}

		}
		return new ReadEvidenceDetails();
	}

}
