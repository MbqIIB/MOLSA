package curam.molsa.test.core.facade;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import com.google.inject.Inject;

import curam.application.impl.Application;
import curam.codetable.ADDRESSLAYOUTTYPE;
import curam.codetable.CITIZENSHIPCODE;
import curam.codetable.COUNTRY;
import curam.codetable.DOCUMENTTYPE;
import curam.codetable.GENDER;
import curam.codetable.MARITALSTATUS;
import curam.codetable.NATIONALITY;
import curam.codetable.impl.APPLICANTROLEEntry;
import curam.core.facade.fact.CaseFactory;
import curam.core.facade.intf.Case;
import curam.core.facade.struct.CreateCaseAttachmentDetails;
import curam.core.facade.struct.ListCaseAttachmentDetails;
import curam.core.facade.struct.ListCaseAttachmentKey;
import curam.core.struct.CaseKey;
import curam.core.struct.PersonRegistrationDetails;
import curam.creole.value.Interval;
import curam.creole.value.Timeline;
import curam.molsa.codetable.RESIDENCY;
import curam.molsa.core.facade.fact.MOLSACaseDAFactory;
import curam.molsa.core.facade.intf.MOLSACaseDA;
import curam.molsa.test.base.CERScenarioTestBase;
import curam.molsa.test.base.HouseholdUnit;
import curam.molsa.test.framework.TestHelper;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.Blob;
import curam.util.type.Date;

public class MOLSACaseDATest extends CERScenarioTestBase {

	 public MOLSACaseDATest(String arg0) {
		super(arg0);
		// TODO Auto-generated constructor stub
	}

	@Inject
	  private TestHelper testHelper;

	  @Inject
	  private CaseHeaderDAO caseHeaderDAO;




	@Override
	protected void addIntakeApplicant(Application application)
			throws AppException, InformationalException {
		createIntakeApplicant(application.getID(), ASIFA_UNIQUE_NAME,
				APPLICANTROLEEntry.PRIMARY_APPLICANT);
		
	}
	
	 /**
	   * Test Case used to test the scenario from person registration to product delivery case activation.
	   * 
	   * @throws AppException
	   *           Generic Exception Signature.
	   * 
	   * @throws InformationalException
	   *           Generic Exception Signature.
	   */
		public void testScenario() throws AppException, InformationalException {
		  testHelper.simulateLogin("molsamanager");
			testScenario(Date.getCurrentDate());

		}

	@Override
	protected void addCaseMember(Application application) throws AppException,
			InformationalException {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected List<HouseholdUnit> getExpectedHouseholdUnits()
			throws AppException, InformationalException {
		// TODO Auto-generated method stub
		List<HouseholdUnit> householdUnitList = new ArrayList<HouseholdUnit>();
		List<Long> mandatoryMembers = new ArrayList<Long>();
		mandatoryMembers
				.add(getCaseParticipantRoleID(ASIFA_UNIQUE_NAME).caseParticipantRoleID);
		Calendar calendar = Date.getCurrentDate().getCalendar();
		calendar.add(Calendar.MONTH, 13);
		calendar.set(Calendar.DATE, 1);
		List<Interval<Boolean>> eligibilityIntervals = new ArrayList<Interval<Boolean>>();
		eligibilityIntervals.add(new Interval<Boolean>(null, false));

		eligibilityIntervals.add(new Interval<Boolean>(Date.getCurrentDate(),
				true));
		eligibilityIntervals.add(new Interval<Boolean>(new Date(calendar),
				false));

		HouseholdUnit householdUnit = new HouseholdUnit(mandatoryMembers,  new ArrayList<Long>(),
				45010l, new Timeline<Boolean>(eligibilityIntervals));
		householdUnitList.add(householdUnit);
		return householdUnitList;
	}


	@Override
	protected void addEvidence(CaseKey caseKey) throws AppException,
			InformationalException {
		long participantid = getParticipantRoleID(ASIFA_UNIQUE_NAME).participantRoleID;
		long caseParticipantRoleID = getCaseParticipantRoleID(ASIFA_UNIQUE_NAME).caseParticipantRoleID;

		long absentFatherParticipantid = getParticipantRoleID(MOHAMMED_UNIQUE_NAME).participantRoleID;
		long absentFatherCPRID = getCaseParticipantRoleID(MOHAMMED_UNIQUE_NAME).caseParticipantRoleID;
		
		int amount=1000;

		Date currentDate = Date.getCurrentDate();
		createHouseholdMemberEvidence(caseKey, participantid,
				caseParticipantRoleID, currentDate, CITIZENSHIPCODE.QATARI,
				RESIDENCY.YES);
		createMaritalStatusEvidence(caseKey, participantid,
				caseParticipantRoleID, Date.fromISO8601("20000101"), MARITALSTATUS.SINGLE);
		// TODO Auto-generated method stub
		
	}
	
	/**
	 * Set the details of the claimant to be registered.
	 * 
	 * @param customerRegistrationDetails
	 *            The registration details of the claimant.
	 * 
	 * @throws AppException
	 * Generic Exception Signature.
	 * 
	 * @throws InformationalException
	 * Generic Exception Signature.
	 */
	protected void setClaimantRegistrationDetails(
			final PersonRegistrationDetails customerRegistrationDetails)
			throws AppException, InformationalException {
		final Date claimDate = getClaimDate();

		customerRegistrationDetails.firstForename = ASIFA_UNIQUE_NAME;
		customerRegistrationDetails.surname = MOHAMMED_SURNAME;
		customerRegistrationDetails.dateOfBirth = getDate(1, 1, 1998);
		customerRegistrationDetails.registrationDate = claimDate;
		customerRegistrationDetails.socialSecurityNumber = "12345678901";
		customerRegistrationDetails.sex = GENDER.FEMALE;
		customerRegistrationDetails.nationality = NATIONALITY.QATARI;
		customerRegistrationDetails.birthCountry = COUNTRY.QATAR;
		customerRegistrationDetails.currentMaritalStatus = MARITALSTATUS.SINGLE;
		customerRegistrationDetails.addressData = ADDRESS_DATA;
		customerRegistrationDetails.addressType = ADDRESSLAYOUTTYPE.US;

	}


	@Override
	protected void preAssertionOnCase(CaseKey caseKey) throws AppException,
			InformationalException {

		curam.core.facade.infrastructure.struct.CaseKey caseKey1 = new curam.core.facade.infrastructure.struct.CaseKey();
		caseKey1.caseID = caseKey.caseID;

		File f = new File("C:\\Test\\TestFile.PDF");
		String file1 = f.getPath().toString();

		CreateCaseAttachmentDetails caseAttachmentDetailsStruct = new CreateCaseAttachmentDetails();
		caseAttachmentDetailsStruct.createCaseAttachmentDetails.caseID = caseKey.caseID;
		caseAttachmentDetailsStruct.createCaseAttachmentDetails.description = "Junit Descrition";
		long caseParticipantRoleID = getCaseParticipantRoleID(ASIFA_UNIQUE_NAME).caseParticipantRoleID;
		caseAttachmentDetailsStruct.createCaseAttachmentDetails.caseParticipantRoleID = caseParticipantRoleID;
		caseAttachmentDetailsStruct.createCaseAttachmentDetails.documentType = DOCUMENTTYPE.LETTER;
		caseAttachmentDetailsStruct.createCaseAttachmentDetails.receiptDate = Date
				.fromISO8601("19950615");
		// caseAttachmentDetailsStruct.createCaseAttachmentDetails.filelocation
		// = file1;
		// caseAttachmentDetailsStruct.createCaseAttachmentDetails.newCaseAttachmentContents=
		File file = new File(file1);
		try {
			FileInputStream fileInputStream = new FileInputStream(file);
			byte fileContent[] = new byte[(int) file.length()];
			try {
				fileInputStream.read(fileContent);
				caseAttachmentDetailsStruct.createCaseAttachmentDetails.attachedFileInd = true;
				caseAttachmentDetailsStruct.createCaseAttachmentDetails.newCaseAttachmentContents = new Blob(
						fileContent);
				caseAttachmentDetailsStruct.createCaseAttachmentDetails.newCaseAttachmentName = "TestFile.PDF";
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		MOLSACaseDA molsaCaseDA = MOLSACaseDAFactory.newInstance();
		try {
			molsaCaseDA.createCaseAttachment(caseAttachmentDetailsStruct);
			ListCaseAttachmentKey listCaseAttachmentKey = new ListCaseAttachmentKey();
			listCaseAttachmentKey.attachmentCaseID.caseID = caseKey.caseID;
			Case caseObj = CaseFactory.newInstance();
			ListCaseAttachmentDetails listOutput = new ListCaseAttachmentDetails();
			listOutput = caseObj.listCaseAttachment(listCaseAttachmentKey);
			System.out.println(" ");
			assertEquals(1, listOutput.attachmentDetailsList.dtls.size());
			
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@Override
	protected void postAssertionOnCase(CaseKey caseKey) throws AppException,
			InformationalException {
		// TODO Auto-generated method stub

	}

}
