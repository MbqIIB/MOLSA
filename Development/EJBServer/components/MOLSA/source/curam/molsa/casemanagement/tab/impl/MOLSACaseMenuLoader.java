package curam.molsa.casemanagement.tab.impl;

import java.util.Map;

import com.google.inject.Inject;

import curam.appeal.impl.AppealableCaseType;
import curam.codetable.impl.CASESTATUSEntry;
import curam.codetable.impl.CASETYPECODEEntry;
import curam.core.impl.CaseHeaderAdapter;
import curam.core.impl.EnvVars;
import curam.core.sl.fact.BookmarkFactory;
import curam.core.sl.struct.CountCaseBookmarkKey;
import curam.core.sl.tab.impl.TabLoaderConst;
import curam.core.struct.CaseID;
import curam.core.struct.Count;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.CaseHeaderDAO;
import curam.piwrapper.user.impl.User;
import curam.piwrapper.user.impl.UserDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.resources.Configuration;
import curam.util.tab.impl.DynamicMenuStateLoader;
import curam.util.tab.impl.MenuState;
import curam.util.transaction.TransactionInfo;

public class MOLSACaseMenuLoader implements DynamicMenuStateLoader {

	@Inject
	protected CaseHeaderDAO caseHeaderDAO;

	@Inject
	private UserDAO userDAO;

	@Inject(optional = true)
	private Map<CASETYPECODEEntry, AppealableCaseType> appealableCaseTypeMap;

	private static final CaseHeaderAdapter caseHeaderAdapter = new CaseHeaderAdapter();
	
	private static final String kCertification = "Certification";

	/**
	 * Constructor.
	 */
	public MOLSACaseMenuLoader() {
		super();
		GuiceWrapper.getInjector().injectMembers(this);
	}

	/**
	 * {@inheritDoc}
	 * 
	 * @throws InformationalException
	 * @throws AppException
	 */
	public MenuState loadMenuState(final MenuState menuState,
			final Map<String, String> pageParameters, final String[] menuItems)
			throws AppException, InformationalException {

		// configure menuState
		MenuState returnState = menuState;

		String caseIdParam = pageParameters.get(TabLoaderConst.kCaseID);

		CaseHeader caseHeader = caseHeaderDAO.get(Long.parseLong(caseIdParam));
		CASESTATUSEntry statusCode = caseHeader.getStatus();

		// BEGIN, CR00241963 JF
		Boolean caseIsBookmarkedInd = false;
		curam.core.sl.intf.Bookmark bookmarkObj = BookmarkFactory.newInstance();
		CountCaseBookmarkKey countCaseBookmarkKey = new CountCaseBookmarkKey();

		countCaseBookmarkKey.dtls.userName = TransactionInfo.getProgramUser();
		countCaseBookmarkKey.dtls.caseID = Long.parseLong(caseIdParam);

		// return number of case bookmarks for the current user
		Count count = null;

		try {
			count = bookmarkObj.countCaseBookmark(countCaseBookmarkKey);
		} catch (Exception e) {
			// In the case of an exception being thrown, display both of the
			// actions
			returnState.setVisible(true, TabLoaderConst.kBookmark);
			returnState.setEnabled(true, TabLoaderConst.kBookmark);

			returnState.setVisible(true, TabLoaderConst.kRemoveBookmark);
			returnState.setEnabled(true, TabLoaderConst.kRemoveBookmark);
		}

		// check if a case bookmark record exists, the default is false
		if (count.numberOfRecords > 0) {
			caseIsBookmarkedInd = true;
		}

		if (caseIsBookmarkedInd == true) {
			returnState.setVisible(false, TabLoaderConst.kBookmark);
			returnState.setEnabled(false, TabLoaderConst.kBookmark);

			returnState.setVisible(true, TabLoaderConst.kRemoveBookmark);
			returnState.setEnabled(true, TabLoaderConst.kRemoveBookmark);

		} else {
			returnState.setVisible(true, TabLoaderConst.kBookmark);
			returnState.setEnabled(true, TabLoaderConst.kBookmark);

			returnState.setVisible(false, TabLoaderConst.kRemoveBookmark);
			returnState.setEnabled(false, TabLoaderConst.kRemoveBookmark);
		}

		if (Configuration.getBooleanProperty(EnvVars.ENV_APPEALS_ISINSTALLED)) {
			returnState.setVisible(true, TabLoaderConst.kCaseAppeal);
			returnState.setEnabled(true, TabLoaderConst.kCaseAppeal);
		} else {
			returnState.setVisible(false, TabLoaderConst.kCaseAppeal);
			returnState.setEnabled(false, TabLoaderConst.kCaseAppeal);
		}

		// Retrieve the implementation of the AppealableCaseType interface for
		// this case type.
		boolean indAllowDeterminationAppeal = true;

		if (null != appealableCaseTypeMap) {

			final long caseID = Long.parseLong(caseIdParam);
			// Get the AppealableCaseType implementation for this case type
			AppealableCaseType appealableCaseType = appealableCaseTypeMap
					.get(CASETYPECODEEntry.get(caseHeaderAdapter.read(caseID,
							false).caseTypeCode));

			if (appealableCaseType != null) {
				CaseID caseIDKey = new CaseID();

				caseIDKey.caseID = caseID;
				indAllowDeterminationAppeal = appealableCaseType
						.isCaseAppealable(caseIDKey);
			}
		}

		if (Configuration.getBooleanProperty(EnvVars.ENV_APPEALS_ISINSTALLED)) {
			returnState.setVisible(true,
					TabLoaderConst.kCaseDeterminationAppeal);
			returnState.setEnabled(indAllowDeterminationAppeal,
					TabLoaderConst.kCaseDeterminationAppeal);
		} else {
			returnState.setVisible(false,
					TabLoaderConst.kCaseDeterminationAppeal);
			returnState.setEnabled(false,
					TabLoaderConst.kCaseDeterminationAppeal);
		}

		final User user = userDAO.get(TransactionInfo.getProgramUser());

		if (statusCode.equals(CASESTATUSEntry.OPEN)) {

			returnState.setVisible(true, TabLoaderConst.kEdit);
			returnState.setEnabled(false, TabLoaderConst.kEdit);
			
			
			if (user.getRole().equals(MOLSAConstants.kMolsaCaseWorkerRole)) {
				returnState.setVisible(true, TabLoaderConst.kSubmit);
				returnState.setEnabled(false, TabLoaderConst.kSubmit);

			} else if (user.getRole().equals(
					MOLSAConstants.kMolsaCaseAuditorRole)) {
				returnState.setVisible(true, TabLoaderConst.kSubmit);
				returnState.setEnabled(true, TabLoaderConst.kSubmit);
				returnState.setVisible(true, kCertification);
				returnState.setEnabled(false, kCertification);
				
			} else if (user.getRole().equals(MOLSAConstants.kMolsaManagerRole)) {

				returnState.setVisible(true, TabLoaderConst.kSubmit);
				returnState.setEnabled(true, TabLoaderConst.kSubmit);
				
				returnState.setEnabled(true, TabLoaderConst.kEdit);

			}

			returnState.setVisible(true, TabLoaderConst.kApprove);
			returnState.setEnabled(false, TabLoaderConst.kApprove);

			returnState.setVisible(true, TabLoaderConst.kReject);
			returnState.setEnabled(false, TabLoaderConst.kReject);

			returnState.setVisible(true, TabLoaderConst.kActivate);
			returnState.setEnabled(false, TabLoaderConst.kActivate);

			returnState.setVisible(true, TabLoaderConst.kReactivate);
			returnState.setEnabled(false, TabLoaderConst.kReactivate);

			returnState.setVisible(true, TabLoaderConst.kSuspend);
			returnState.setEnabled(true, TabLoaderConst.kSuspend);

			returnState.setVisible(true, TabLoaderConst.kUnsuspend);
			returnState.setEnabled(false, TabLoaderConst.kUnsuspend);

			returnState.setVisible(true, TabLoaderConst.kClose);
			returnState.setEnabled(true, TabLoaderConst.kClose);

			returnState.setVisible(true, TabLoaderConst.kChangeClosure);
			returnState.setEnabled(false, TabLoaderConst.kChangeClosure);

			returnState.setVisible(true, TabLoaderConst.kNewCase);
			returnState.setEnabled(true, TabLoaderConst.kNewCase);

			// BEGIN, CR00282451, VMI
			returnState.setVisible(true, TabLoaderConst.kReOpen);
			returnState.setEnabled(false, TabLoaderConst.kReOpen);
			// END, CR00282451

		} else if (statusCode.equals(CASESTATUSEntry.COMPLETED)) {

			returnState.setVisible(true, TabLoaderConst.kSubmit);
			returnState.setEnabled(false, TabLoaderConst.kSubmit);
			
			returnState.setVisible(true, TabLoaderConst.kEdit);
			returnState.setEnabled(false, TabLoaderConst.kEdit);

			if (user.getRole().equals(MOLSAConstants.kMolsaCaseAuditorRole)) {
				returnState.setVisible(true, TabLoaderConst.kApprove);
				returnState.setEnabled(false, TabLoaderConst.kApprove);

			} else if (user.getRole().equals(
					MOLSAConstants.kMolsaCaseAuditorRole)) {
				returnState.setVisible(true, TabLoaderConst.kApprove);
				returnState.setEnabled(false, TabLoaderConst.kApprove);

			} else if (user.getRole().equals(MOLSAConstants.kMolsaManagerRole)) {

				returnState.setVisible(true, TabLoaderConst.kApprove);
				returnState.setEnabled(true, TabLoaderConst.kApprove);

				returnState.setEnabled(true, TabLoaderConst.kEdit);
			}

			returnState.setVisible(true, TabLoaderConst.kReject);
			returnState.setEnabled(true, TabLoaderConst.kReject);

			returnState.setVisible(true, TabLoaderConst.kActivate);
			returnState.setEnabled(false, TabLoaderConst.kActivate);

			returnState.setVisible(true, TabLoaderConst.kReactivate);
			returnState.setEnabled(false, TabLoaderConst.kReactivate);

			returnState.setVisible(true, TabLoaderConst.kSuspend);
			returnState.setEnabled(true, TabLoaderConst.kSuspend);

			returnState.setVisible(true, TabLoaderConst.kUnsuspend);
			returnState.setEnabled(false, TabLoaderConst.kUnsuspend);

			returnState.setVisible(true, TabLoaderConst.kClose);
			returnState.setEnabled(true, TabLoaderConst.kClose);

			returnState.setVisible(true, TabLoaderConst.kChangeClosure);
			returnState.setEnabled(false, TabLoaderConst.kChangeClosure);

			returnState.setVisible(true, TabLoaderConst.kNewCase);
			returnState.setEnabled(true, TabLoaderConst.kNewCase);

			returnState.setVisible(true, TabLoaderConst.kReOpen);
			returnState.setEnabled(false, TabLoaderConst.kReOpen);

		} else if (statusCode.equals(CASESTATUSEntry.APPROVED)) {

			returnState.setVisible(true, TabLoaderConst.kEdit);
			returnState.setEnabled(false, TabLoaderConst.kEdit);
			
			if (user.getRole().equals(MOLSAConstants.kMolsaManagerRole)) {

				returnState.setEnabled(true, TabLoaderConst.kEdit);
			}
			
			returnState.setVisible(true, TabLoaderConst.kSubmit);
			returnState.setEnabled(false, TabLoaderConst.kSubmit);

			returnState.setVisible(true, TabLoaderConst.kApprove);
			returnState.setEnabled(false, TabLoaderConst.kApprove);

			returnState.setVisible(true, TabLoaderConst.kReject);
			returnState.setEnabled(false, TabLoaderConst.kReject);

			returnState.setVisible(true, TabLoaderConst.kActivate);
			returnState.setEnabled(true, TabLoaderConst.kActivate);

			returnState.setVisible(true, TabLoaderConst.kReactivate);
			returnState.setEnabled(false, TabLoaderConst.kReactivate);

			returnState.setVisible(true, TabLoaderConst.kSuspend);
			returnState.setEnabled(true, TabLoaderConst.kSuspend);

			returnState.setVisible(true, TabLoaderConst.kUnsuspend);
			returnState.setEnabled(false, TabLoaderConst.kUnsuspend);

			returnState.setVisible(true, TabLoaderConst.kClose);
			returnState.setEnabled(true, TabLoaderConst.kClose);

			returnState.setVisible(true, TabLoaderConst.kChangeClosure);
			returnState.setEnabled(false, TabLoaderConst.kChangeClosure);

			returnState.setVisible(true, TabLoaderConst.kNewCase);
			returnState.setEnabled(true, TabLoaderConst.kNewCase);

			returnState.setVisible(true, TabLoaderConst.kReOpen);
			returnState.setEnabled(false, TabLoaderConst.kReOpen);

		} else if (statusCode.equals(CASESTATUSEntry.ACTIVE)) {

			returnState.setVisible(true, TabLoaderConst.kEdit);
			returnState.setEnabled(false, TabLoaderConst.kEdit);
			
			if (user.getRole().equals(MOLSAConstants.kMolsaManagerRole)) {

				returnState.setEnabled(true, TabLoaderConst.kEdit);
			}
			
			returnState.setVisible(true, TabLoaderConst.kSubmit);
			returnState.setEnabled(false, TabLoaderConst.kSubmit);

			returnState.setVisible(true, TabLoaderConst.kApprove);
			returnState.setEnabled(false, TabLoaderConst.kApprove);

			returnState.setVisible(true, TabLoaderConst.kReject);
			returnState.setEnabled(false, TabLoaderConst.kReject);

			returnState.setVisible(true, TabLoaderConst.kActivate);
			returnState.setEnabled(false, TabLoaderConst.kActivate);

			returnState.setVisible(true, TabLoaderConst.kReactivate);
			returnState.setEnabled(false, TabLoaderConst.kReactivate);

			returnState.setVisible(true, TabLoaderConst.kSuspend);
			returnState.setEnabled(true, TabLoaderConst.kSuspend);

			returnState.setVisible(true, TabLoaderConst.kUnsuspend);
			returnState.setEnabled(false, TabLoaderConst.kUnsuspend);

			returnState.setVisible(true, TabLoaderConst.kClose);
			returnState.setEnabled(true, TabLoaderConst.kClose);

			returnState.setVisible(true, TabLoaderConst.kChangeClosure);
			returnState.setEnabled(false, TabLoaderConst.kChangeClosure);

			returnState.setVisible(true, TabLoaderConst.kNewCase);
			returnState.setEnabled(true, TabLoaderConst.kNewCase);

			returnState.setVisible(true, TabLoaderConst.kReOpen);
			returnState.setEnabled(false, TabLoaderConst.kReOpen);

		} else if (statusCode.equals(CASESTATUSEntry.SUSPENDED)) {
			
			returnState.setVisible(true, TabLoaderConst.kEdit);
			returnState.setEnabled(false, TabLoaderConst.kEdit);
			
			if (user.getRole().equals(MOLSAConstants.kMolsaManagerRole)) {

				returnState.setEnabled(true, TabLoaderConst.kEdit);
			}
			

			returnState.setVisible(true, TabLoaderConst.kSubmit);
			returnState.setEnabled(false, TabLoaderConst.kSubmit);

			returnState.setVisible(true, TabLoaderConst.kApprove);
			returnState.setEnabled(false, TabLoaderConst.kApprove);

			returnState.setVisible(true, TabLoaderConst.kReject);
			returnState.setEnabled(false, TabLoaderConst.kReject);

			returnState.setVisible(true, TabLoaderConst.kActivate);
			returnState.setEnabled(false, TabLoaderConst.kActivate);

			returnState.setVisible(true, TabLoaderConst.kReactivate);
			returnState.setEnabled(false, TabLoaderConst.kReactivate);

			returnState.setVisible(true, TabLoaderConst.kSuspend);
			returnState.setEnabled(false, TabLoaderConst.kSuspend);

			returnState.setVisible(true, TabLoaderConst.kUnsuspend);
			returnState.setEnabled(true, TabLoaderConst.kUnsuspend);

			returnState.setVisible(true, TabLoaderConst.kClose);
			returnState.setEnabled(true, TabLoaderConst.kClose);

			returnState.setVisible(true, TabLoaderConst.kChangeClosure);
			returnState.setEnabled(false, TabLoaderConst.kChangeClosure);

			returnState.setVisible(true, TabLoaderConst.kNewCase);
			returnState.setEnabled(true, TabLoaderConst.kNewCase);

			returnState.setVisible(true, TabLoaderConst.kReOpen);
			returnState.setEnabled(false, TabLoaderConst.kReOpen);

		} else if (statusCode.equals(CASESTATUSEntry.PENDINGCLOSURE)) {

			returnState.setVisible(true, TabLoaderConst.kEdit);
			returnState.setEnabled(false, TabLoaderConst.kEdit);
			
			if (user.getRole().equals(MOLSAConstants.kMolsaManagerRole)) {

				returnState.setEnabled(true, TabLoaderConst.kEdit);
			}
			
			returnState.setVisible(true, TabLoaderConst.kSubmit);
			returnState.setEnabled(false, TabLoaderConst.kSubmit);

			returnState.setVisible(true, TabLoaderConst.kApprove);
			returnState.setEnabled(false, TabLoaderConst.kApprove);

			returnState.setVisible(true, TabLoaderConst.kReject);
			returnState.setEnabled(false, TabLoaderConst.kReject);

			returnState.setVisible(true, TabLoaderConst.kActivate);
			returnState.setEnabled(false, TabLoaderConst.kActivate);

			returnState.setVisible(true, TabLoaderConst.kReactivate);
			returnState.setEnabled(true, TabLoaderConst.kReactivate);

			returnState.setVisible(true, TabLoaderConst.kSuspend);
			returnState.setEnabled(false, TabLoaderConst.kSuspend);

			returnState.setVisible(true, TabLoaderConst.kUnsuspend);
			returnState.setEnabled(false, TabLoaderConst.kUnsuspend);

			returnState.setVisible(true, TabLoaderConst.kClose);
			returnState.setEnabled(true, TabLoaderConst.kClose);

			returnState.setVisible(true, TabLoaderConst.kChangeClosure);
			returnState.setEnabled(false, TabLoaderConst.kChangeClosure);

			returnState.setVisible(true, TabLoaderConst.kNewCase);
			returnState.setEnabled(false, TabLoaderConst.kNewCase);

			returnState.setVisible(true, TabLoaderConst.kReOpen);
			returnState.setEnabled(false, TabLoaderConst.kReOpen);

		} else if (statusCode.equals(CASESTATUSEntry.CLOSED)) {

			returnState.setVisible(true, TabLoaderConst.kEdit);
			returnState.setEnabled(false, TabLoaderConst.kEdit);
			
			if (user.getRole().equals(MOLSAConstants.kMolsaManagerRole)) {

				returnState.setEnabled(true, TabLoaderConst.kEdit);
			}
			
			returnState.setVisible(true, TabLoaderConst.kSubmit);
			returnState.setEnabled(false, TabLoaderConst.kSubmit);

			returnState.setVisible(true, TabLoaderConst.kApprove);
			returnState.setEnabled(false, TabLoaderConst.kApprove);

			returnState.setVisible(true, TabLoaderConst.kReject);
			returnState.setEnabled(false, TabLoaderConst.kReject);

			returnState.setVisible(true, TabLoaderConst.kActivate);
			returnState.setEnabled(false, TabLoaderConst.kActivate);

			returnState.setVisible(true, TabLoaderConst.kReactivate);
			returnState.setEnabled(true, TabLoaderConst.kReactivate);

			returnState.setVisible(true, TabLoaderConst.kSuspend);
			returnState.setEnabled(false, TabLoaderConst.kSuspend);

			returnState.setVisible(true, TabLoaderConst.kUnsuspend);
			returnState.setEnabled(false, TabLoaderConst.kUnsuspend);

			returnState.setVisible(true, TabLoaderConst.kClose);
			returnState.setEnabled(false, TabLoaderConst.kClose);

			returnState.setVisible(true, TabLoaderConst.kChangeClosure);
			returnState.setEnabled(true, TabLoaderConst.kChangeClosure);

			returnState.setVisible(true, TabLoaderConst.kNewCase);
			returnState.setEnabled(false, TabLoaderConst.kNewCase);

			returnState.setVisible(true, TabLoaderConst.kReOpen);
			returnState.setEnabled(true, TabLoaderConst.kReOpen);
		}

		return returnState;
	}

}
