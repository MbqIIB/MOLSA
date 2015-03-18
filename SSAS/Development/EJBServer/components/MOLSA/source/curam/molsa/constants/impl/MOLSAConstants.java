package curam.molsa.constants.impl;

/**
 * This class assigns values to the MOLSA constants.
 * 
 */
public abstract class MOLSAConstants {

	/**
	 * Molsa Product delivery approval workflow.
	 */
	public static final String kPDCApprovalWorkFlow = "MOLSAProductDeliveryApprovalProcessTask";

	/**
	 * Date format received by Information provider
	 */
	public static final String kdateIP = "MM/dd/yyyy";

	/**
	 * Date required to compare in MOI and Information Provider Batch.
	 */
	public static final String kdateRequired = "yyyyMMdd";

	/**
	 * Date required to compare Information provider details with evidence
	 * details.
	 */
	public static final String kdateIPbatch = "yyyy-MM-dd";
	/**
	 * Marital Status attribute.
	 */
	public static final String maritalStatus = "maritalStatus";

	/**
	 * Date of Birth attribute.
	 */
	public static final String dateOfBirth = "dateOfBirth";
	/**
	 * Date of death attribute.
	 */
	public static final String dateOfDeath = "dateOfDeath";
	/**
	 * Comments attribute.
	 */
	public static final String comments = "comments";
	/**
	 * Participant attribute.
	 */
	public static final String participant = "participant";
	/**
	 * Person attribute.
	 */
	public static final String person = "person";
	/**
	 * End Date attribute.
	 */
	public static final String endDate = "endDate";
	/**
	 * Start Date attribute.
	 */
	public static final String startDate = "startDate";
	/**
	 * Gender attribute.
	 */
	public static final String gender = "gender";
	/**
	 * Date of death attribute.
	 */
	public static final String kZeroDate = "00010101";
	/**
	 * Empty string attribute.
	 */
	public static final String kEmptyString = "kEmptyString";
	/**
	 * First name attribute.
	 */
	public static final String firstName = "firstName";
	/**
	 * Last Name attribute.
	 */
	public static final String lastName = "lastName";
	/**
	 * Middle Name attribute.
	 */
	public static final String middleName = "middleName";
	/**
	 * Amount attribute.
	 */
	public static final String amount = "amount";
	/**
	 * Manual case task assignement in information provider batch.
	 */
	public static final String kmanualCase = "MANUALCASE";
	public static String kDecisionDetailsXPath_EligibleMembers = "/*/*/eligibleMemberConcernRoles/Item";

	public static String kDecisionDetailsXPath_MandatoryMembers = "/*/*/mandatoryMemberConcernRoles/Item";

	/**
	 * Display category references
	 */
	public static String kDisplayCategoryReference_UnitInformation = "unitInformation";
	public static String kDynEvdAttr_CaseParticipantRoleID = "participant";

	public static final int gkEleven = 11;

	public static final int kOne = 1;

	public static final int kTwo = 2;

	/**
	 * Property file identifier.
	 */
	public static final String kCategoryandTemplatePropertyFileArabic = "MOLSASMSMessageTextArabic.properties";

	/**
	 * Property file identifier.
	 */
	public static final String kCategoryandTemplatePropertyFile = "MOLSASMSMessageText.properties";

	public static final String kAR = "ar";

	public static final String KApplicationSubmissionDate = "Application.Submission.Date";

	/**
	 * workqueue name.
	 */
	public static final String kCaseWorkerWorkQueue = "45008";

	/**
	 * SMS Error code.
	 */
	public static final String kSMSPhoneNumerErrorCode = "600.4";

	/**
	 * Property file identifier.
	 */
	public static final String kMegaMenuPropertyFile = "MOLSAMegaMenuProgramDocuments.properties";

	public static final String kMolsaCaseWorkerRole = "MOLSACASEWORKERROLE";

	public static final String kMolsaCaseAuditorRole = "MOLSAVIEWONLYROLE";

	public static final String kMolsaManagerRole = "MOLSAMANAGERROLE";

	/**
	 * Molsa Product delivery approval workflow.
	 */
	public static final String kMOLSAProductDeliveryOpenTask = "MOLSAProductDeliveryOpenTask";

	public static final String kMOLSAProductDeliveryRejectTask = "MOLSAProductDeliveryRejectTask";

	public static final String kMOLSAProductDeliveryAuthorizationTask = "MOLSAProductDeliveryAuthorizationTask";

	public static final String kMOLSAApplicationRejectTask = "MOLSAApplicationRejectTask";
	public static final String kIncomeType = "incomeType";
	public static final String kfrequency= "frequency";

}