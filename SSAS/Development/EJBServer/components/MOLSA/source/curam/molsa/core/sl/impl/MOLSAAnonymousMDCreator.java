package curam.molsa.core.sl.impl;

import java.util.Calendar;
import java.util.Iterator;
import java.util.List;

import com.google.inject.Inject;

import curam.codetable.CASEEVIDENCE;
import curam.codetable.EVIDENCEDESCRIPTORSTATUS;
import curam.codetable.impl.MILESTONESTATUSCODEEntry;
import curam.core.fact.MaintainCertificationFactory;
import curam.core.intf.MaintainCertification;
import curam.core.sl.fact.MilestoneDeliveryFactory;
import curam.core.sl.infrastructure.entity.base.EvidenceDescriptor;
import curam.core.sl.infrastructure.entity.fact.EvidenceDescriptorFactory;
import curam.core.sl.infrastructure.entity.struct.CaseIDStatusAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.RelatedIDAndEvidenceTypeKey;
import curam.core.sl.infrastructure.entity.struct.RelatedIDAndEvidenceTypeKeyList;
import curam.core.sl.intf.MilestoneDelivery;
import curam.core.sl.struct.EvidenceCaseKey;
import curam.core.sl.struct.EvidenceTypeKey;
import curam.core.sl.struct.MilestoneDeliveryDtls;
import curam.core.struct.MaintainCertificationCaseIDKey;
import curam.core.struct.MaintainCertificationDetails;
import curam.core.struct.MaintainCertificationList;
import curam.dynamicevidence.impl.DynamicEvidenceDataDetails;
import curam.dynamicevidence.sl.impl.EvidenceGenericSLFactory;
import curam.dynamicevidence.sl.impl.EvidenceServiceInterface;
import curam.dynamicevidence.sl.struct.impl.ReadEvidenceDetails;
import curam.molsa.util.impl.MOLSADateUtil;
import curam.participant.impl.ConcernRole;
import curam.piwrapper.caseconfiguration.impl.ProductDAO;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.piwrapper.casemanager.impl.CaseParticipantRole;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;

/**
 * 
 * Creates Aging Anonymous Parent milestone delivery if the person is becoming
 * >=17 years in the certification period.
 * 
 * 
 */
public class MOLSAAnonymousMDCreator implements MOLSAMilestoneDeliveryCreator {

	protected static final String kPerson = "person";

	protected static final String kDateOfBirth = "dateOfBirth";
	@Inject
	protected ProductDAO productDAO;

	@Inject
	protected CaseHeaderDAO caseHeaderDAO;

	protected EvidenceDescriptor evidenceDescriptorObj;

	/**
	 * Constructor.
	 */
	public MOLSAAnonymousMDCreator() {
		GuiceWrapper.getInjector().injectMembers(this);
		evidenceDescriptorObj = (EvidenceDescriptor) EvidenceDescriptorFactory
				.newInstance();
	}

	/**
	 * Creates Milestone Delivery of type Aged Handicap Children for the
	 * Handicapped Case.
	 * 
	 * @param caseID
	 *            Case ID
	 * @throws AppException
	 * @throws InformationalException
	 */
	@Override
	public void createMilestoneDelivery(Long caseID) throws AppException,
			InformationalException {

		Date certStartDate = null;
		Date certEndDate = null;

		MaintainCertification maintainCertificationObj = MaintainCertificationFactory
				.newInstance();
		MaintainCertificationCaseIDKey certificationCaseIDKey = new MaintainCertificationCaseIDKey();
		certificationCaseIDKey.caseID = caseID;

		MaintainCertificationList certificationList = maintainCertificationObj
				.getCertifications(certificationCaseIDKey);
		for (Iterator<MaintainCertificationDetails> iterator = certificationList.dtls
				.iterator(); iterator.hasNext();) {
			MaintainCertificationDetails certificationDetails = iterator.next();
			if (null == certStartDate
					|| certStartDate
							.before(certificationDetails.periodFromDate)) {
				certStartDate = certificationDetails.periodFromDate;
				certEndDate = certificationDetails.periodToDate;
			}
		}

		CaseParticipantRole caseParticipantRole = null;
		CaseHeader caseHeader = caseHeaderDAO.get(caseID);
		ConcernRole concernRole = caseHeader.getConcernRole();

		CaseHeader icCaseHeader = caseHeader.getParentCase();
		List<CaseParticipantRole> caseParticipantRoles = icCaseHeader
				.listActiveCaseMembers();
		for (Iterator<CaseParticipantRole> iterator = caseParticipantRoles
				.iterator(); iterator.hasNext();) {
			caseParticipantRole = iterator.next();
			if (concernRole.equals(caseParticipantRole.getConcernRole())) {
				break;
			}
		}

		final EvidenceTypeKey evidenceTypeKey = new EvidenceTypeKey();
		evidenceTypeKey.evidenceType = CASEEVIDENCE.BIRTHDEATHDETAILS;
		final EvidenceServiceInterface evidenceServiceInterface = EvidenceGenericSLFactory
				.instance(evidenceTypeKey, Date.getCurrentDate());

		final CaseIDStatusAndEvidenceTypeKey caseIDStatusAndEvidenceTypeKey = new CaseIDStatusAndEvidenceTypeKey();

		caseIDStatusAndEvidenceTypeKey.caseID = icCaseHeader.getID();
		caseIDStatusAndEvidenceTypeKey.evidenceType = CASEEVIDENCE.BIRTHDEATHDETAILS;
		caseIDStatusAndEvidenceTypeKey.statusCode = EVIDENCEDESCRIPTORSTATUS.ACTIVE;
		final RelatedIDAndEvidenceTypeKeyList relatedIDAndEvidenceTypeKeyList = evidenceDescriptorObj
				.searchByCaseIDTypeAndStatus(caseIDStatusAndEvidenceTypeKey);

		EvidenceCaseKey evidenceCaseKey = null;
		String dateOfBirth = null;

		for (RelatedIDAndEvidenceTypeKey relatedIDAndEvidenceTypeKey : relatedIDAndEvidenceTypeKeyList.dtls) {

			evidenceCaseKey = new EvidenceCaseKey();
			evidenceCaseKey.evidenceKey.evType = evidenceTypeKey.evidenceType;
			evidenceCaseKey.caseIDKey.caseID = icCaseHeader.getID();
			evidenceCaseKey.evidenceKey.evidenceID = relatedIDAndEvidenceTypeKey.relatedID;
			final ReadEvidenceDetails evidenceDetails = evidenceServiceInterface
					.readEvidence(evidenceCaseKey);
			final DynamicEvidenceDataDetails dynamicEvidenceDataDetails = evidenceDetails.dtls;
			final String cprID = dynamicEvidenceDataDetails.getAttribute(
					kPerson).getValue();
			if (caseParticipantRole.getID() == Long.parseLong(cprID)) {
				dateOfBirth = dynamicEvidenceDataDetails.getAttribute(
						kDateOfBirth).getValue();
				break;
			}
		}

		Calendar currentYearCal = Date.getDate(dateOfBirth).getCalendar();
		currentYearCal.add(Calendar.YEAR, 17);

		long age = MOLSADateUtil.determineAge(certEndDate,
				Date.getDate(dateOfBirth));

		if (17 == age) {

			final MilestoneDelivery milestoneDeliveryObj = MilestoneDeliveryFactory
					.newInstance();
			MilestoneDeliveryDtls milestoneDeliveryDtls = new MilestoneDeliveryDtls();
			milestoneDeliveryDtls.dtls.caseID = caseID;
			milestoneDeliveryDtls.dtls.milestoneConfigurationID = 45004L;
			milestoneDeliveryDtls.dtls.expectedStartDate = Date
					.getCurrentDate();
			milestoneDeliveryDtls.dtls.actualStartDate = Date.getCurrentDate();
			milestoneDeliveryDtls.dtls.expectedEndDate = new Date(
					currentYearCal);
			milestoneDeliveryDtls.dtls.ownerUserName = TransactionInfo
					.getProgramUser();
			milestoneDeliveryDtls.dtls.createdBySystem = true;
			milestoneDeliveryDtls.dtls.status = MILESTONESTATUSCODEEntry.INPROGRESS
					.getCode();
			milestoneDeliveryObj.create(milestoneDeliveryDtls);

		}

	}

}
