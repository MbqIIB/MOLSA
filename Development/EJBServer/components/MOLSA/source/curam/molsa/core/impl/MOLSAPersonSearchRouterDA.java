package curam.molsa.core.impl;


import java.util.ArrayList;
import java.util.regex.Pattern;

import curam.codetable.ADDRESSLAYOUTTYPE;
import curam.core.impl.CuramConst;
import curam.core.impl.EnvVars;
import curam.core.sl.entity.fact.NicknameFactory;
import curam.core.sl.entity.intf.Nickname;
import curam.core.sl.entity.struct.NicknameDtls;
import curam.core.sl.entity.struct.NicknameDtlsList;
import curam.core.sl.entity.struct.NicknameSearchKey;
import curam.core.sl.fact.ParticipantSearchFactory;
import curam.core.sl.infrastructure.impl.ValidationManagerFactory;
import curam.core.sl.intf.ParticipantSearch;
import curam.core.sl.struct.CharCount;
import curam.core.sl.struct.SearchCriteriaString;
import curam.core.struct.PersonSearchDetails;
import curam.core.struct.PersonSearchKey1;
import curam.core.struct.PersonSearchResult1;
import curam.message.BPOPERSONSEARCH;
import curam.message.GENERALSEARCH;
import curam.molsa.core.facade.struct.MOLSAPersonSearchKey1;
import curam.molsa.core.fact.MOLSADatabasePersonSearchFactory;
import curam.molsa.message.MOLSABPOPERSONSEARCH;
import curam.molsa.util.impl.MOLSAParticipantHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalElement;
import curam.util.exception.InformationalException;
import curam.util.exception.InformationalManager;
import curam.util.resources.Configuration;
import curam.util.transaction.TransactionInfo;
import curam.molsa.core.intf.MOLSADatabasePersonSearch;

/**
 * 
 * Overridden from OOTB PersonSearchRouter Class to include the Phone Number search for MOLSA.
 *
 */
public class MOLSAPersonSearchRouterDA extends curam.molsa.core.base.MOLSAPersonSearchRouterDA{

  /**
   * Overridden to include the Phone Number Search for MOLSA.
   * 
   * @param key PersonSearchKey1
   * @return PersonSearchDetailsResult PersonSearchDetailsResult 
   * @throws InformationalException General Exception
   * @throws AppException General Exception
   */
  @Override
  public PersonSearchResult1 search1(MOLSAPersonSearchKey1 key) throws AppException, InformationalException {
    
		key.addressDtls.addressLine1 = key.addressDtls.addressLine1.trim();
		key.addressDtls.addressLine2 = key.addressDtls.addressLine2.trim();
		key.addressDtls.city = key.addressDtls.city.trim();
		key.birthSurname = key.birthSurname.trim();
		key.gender = key.gender.trim();
		key.referenceNumber = key.referenceNumber.trim();
		key.phoneNumber = key.phoneNumber.trim();
		key.fullName = key.fullName.trim();

		validateMolsaSearchKey(key);

		PersonSearchResult1 personSearchResult = new PersonSearchResult1();
		MOLSADatabasePersonSearch personSearchObj =  MOLSADatabasePersonSearchFactory.newInstance();
		
		personSearchResult = personSearchObj.search1(key);
		
    
    //phoneNumber search
	/*
    if(!key.phoneNumber.equals(CuramConst.gkEmpty)) {
      PersonSearchResult1 phonePersonSearchResult = 
        MOLSAParticipantHelper.removeDuplicateFromPhoneNumberSearch(
            personSearchResult,
            MOLSAParticipantHelper.searchConcernByPhoneNumber(key.phoneNumber)
            );
      
      personSearchResult.dtlsList.addAll(phonePersonSearchResult.dtlsList);
    }
    */
    
    if(key.fullName.length() > 0 && key.nicknameInd) {
        String searchName = key.fullName;
        NicknameSearchKey nicknameKey = new NicknameSearchKey();
        nicknameKey.nickname = searchName.toUpperCase();
        Nickname nicknameObj = NicknameFactory.newInstance();
        NicknameDtlsList nicknameList = nicknameObj.searchByNickname(nicknameKey);
        for(int i = 0; i < nicknameList.dtls.size(); i++)
        {
            String propername = ((NicknameDtls)nicknameList.dtls.item(i)).properName.toUpperCase();
            Pattern searchString = Pattern.compile((new StringBuilder()).append(searchName.toUpperCase()).append(".*").toString(), 2);
            boolean nicknameIsSubString = searchString.matcher(propername).matches();
            if(!nicknameIsSubString)
            {
                key.fullName = propername;
                PersonSearchResult1 nicknameSearchResults = personSearchObj.search1(key);
                personSearchResult.dtlsList.addAll(nicknameSearchResults.dtlsList);
            }
        }
    }
    
    
    if(personSearchResult.dtlsList.isEmpty()){
        InformationalManager informationalManager = TransactionInfo.getInformationalManager();
        ValidationManagerFactory.getManager().addInfoMgrExceptionWithLookup(
            new AppException(GENERALSEARCH.INF_SEARCH_NORECORDSFOUND), "", 
            curam.util.exception.InformationalElement.InformationalType.kError, "a", 5);
        informationalManager.failOperation();
    }
    return personSearchResult;
  }

	protected void validateMolsaSearchKey(MOLSAPersonSearchKey1 key)
			throws AppException, InformationalException {

		InformationalManager informationalManager = TransactionInfo
				.getInformationalManager();

		ParticipantSearch participantSearchObj = ParticipantSearchFactory
				.newInstance();
		SearchCriteriaString searchCriteriaString = new SearchCriteriaString();
		CharCount count;

		// check if any search criteria are provided
		if (key.birthSurname.length() == 0 && key.fullName.length() == 0
				&& key.phoneNumber.length() == 0 && key.dateOfBirth.isZero()
				&& key.referenceNumber.length() == 0
				&& key.gender.length() == 0
				&& key.addressDtls.addressLine1.length() == 0
				&& key.addressDtls.addressLine2.length() == 0
				&& key.addressDtls.city.length() == 0) {

			curam.core.sl.infrastructure.impl.ValidationManagerFactory
					.getManager()
					.addInfoMgrExceptionWithLookup(
							new AppException(
									GENERALSEARCH.ERR_FV_SEARCH_CRITERIA_MISSING),
							CuramConst.gkEmpty,
							InformationalElement.InformationalType.kError,
							curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
							1);
		}

		if (key.referenceNumber.length() > 0) {
			searchCriteriaString.string = key.referenceNumber;
			count = participantSearchObj
					.countAlphaNumChar(searchCriteriaString);

			if (1 > count.count) {
				curam.core.sl.infrastructure.impl.ValidationManagerFactory
						.getManager()
						.addInfoMgrExceptionWithLookup(
								new AppException(
										GENERALSEARCH.ERR_SEARCH_FV_REFERENCE_NUMBER_SHORT)
										.arg(1),
								CuramConst.gkEmpty,
								InformationalElement.InformationalType.kError,
								curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
								0);
			}
		}

		if (key.phoneNumber.length() > 0) {

			searchCriteriaString.string = key.phoneNumber;
			count = participantSearchObj
					.countAlphaNumChar(searchCriteriaString);

			if (count.count < 1) {
				curam.core.sl.infrastructure.impl.ValidationManagerFactory
						.getManager()
						.addInfoMgrExceptionWithLookup(
								new AppException(
										MOLSABPOPERSONSEARCH.ERR_PERSONSEARCH_FV_PHONENUMBER_SHORT)
										.arg(1),
								CuramConst.gkEmpty,
								InformationalElement.InformationalType.kError,
								curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
								0);
			}
		}

		if (key.fullName.length() > 0) {

			searchCriteriaString.string = key.fullName;
			count = participantSearchObj
					.countAlphaNumChar(searchCriteriaString);

			if (count.count < 1) {
				curam.core.sl.infrastructure.impl.ValidationManagerFactory
						.getManager()
						.addInfoMgrExceptionWithLookup(
								new AppException(
										MOLSABPOPERSONSEARCH.ERR_PERSONSEARCH_FV_FULLNAME_SHORT)
										.arg(1),
								CuramConst.gkEmpty,
								InformationalElement.InformationalType.kError,
								curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
								0);
			} else if (count.count == 1 && count.containsWildcardIndOpt) {
				curam.core.sl.infrastructure.impl.ValidationManagerFactory
						.getManager()
						.addInfoMgrExceptionWithLookup(
								new AppException(
										MOLSABPOPERSONSEARCH.ERR_PERSONSEARCH_FV_FULLNAME_SHORT_PARTIAL_MATCH)
										.arg(2),
								CuramConst.gkEmpty,
								InformationalElement.InformationalType.kError,
								curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
								0);
			}
		}

		if (key.birthSurname.length() > 0) {

			searchCriteriaString.string = key.birthSurname;
			count = participantSearchObj
					.countAlphaNumChar(searchCriteriaString);

			if (count.count < 1) {
				curam.core.sl.infrastructure.impl.ValidationManagerFactory
						.getManager()
						.addInfoMgrExceptionWithLookup(
								new AppException(
										BPOPERSONSEARCH.ERR_PERSONSEARCH_FV_BIRTH_LAST_NAME_SHORT)
										.arg(1),
								CuramConst.gkEmpty,
								InformationalElement.InformationalType.kError,
								curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
								0);
			} else if (count.count == 1 && count.containsWildcardIndOpt) {
				curam.core.sl.infrastructure.impl.ValidationManagerFactory
						.getManager()
						.addInfoMgrExceptionWithLookup(
								new AppException(
										BPOPERSONSEARCH.ERR_PERSONSEARCH_FV_BIRTH_LAST_NAME_SHORT_PARTIAL_MATCH)
										.arg(2),
								CuramConst.gkEmpty,
								InformationalElement.InformationalType.kError,
								curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
								0);
			}
		}

		String addressLayout = Configuration
				.getProperty(EnvVars.ENV_ADDRESS_LAYOUT);

		if (addressLayout == null || addressLayout.isEmpty()) {
			addressLayout = EnvVars.ENV_ADDRESS_LAYOUT_DEFAULT;
		}

		if (key.addressDtls.addressLine1.length() > 0) {

			final int addressLine2Minimum = addressLayout
					.equals(ADDRESSLAYOUTTYPE.CA_CIVIC) ? 1 : 2;

			searchCriteriaString.string = key.addressDtls.addressLine1;
			count = participantSearchObj
					.countAlphaNumChar(searchCriteriaString);

			if (count.count < addressLine2Minimum) {
				AppException ae = addressLayout
						.equals(ADDRESSLAYOUTTYPE.CA_CIVIC) ? new AppException(
						GENERALSEARCH.ERR_SEARCH_FV_STREET_NUMBER_SHORT)
						: new AppException(
								GENERALSEARCH.ERR_SEARCH_FV_ADDRESS_LINE_1_SHORT);

				informationalManager.addInformationalMsg(
						ae.arg(addressLine2Minimum), CuramConst.gkEmpty,
						InformationalElement.InformationalType.kError);
			}

		}

		if (key.addressDtls.addressLine2.length() > 0) {

			searchCriteriaString.string = key.addressDtls.addressLine2;
			count = participantSearchObj
					.countAlphaNumChar(searchCriteriaString);

			if (count.count < 2) {
				AppException ae = addressLayout
						.equals(ADDRESSLAYOUTTYPE.CA_CIVIC) ? new AppException(
						GENERALSEARCH.ERR_SEARCH_FV_STREET_NAME_SHORT)
						: new AppException(
								GENERALSEARCH.ERR_SEARCH_FV_ADDRESS_LINE_2_SHORT);

				informationalManager.addInformationalMsg(ae.arg(2),
						CuramConst.gkEmpty,
						InformationalElement.InformationalType.kError);
			}
		}

		if (key.addressDtls.city.length() > 0) {

			searchCriteriaString.string = key.addressDtls.city;
			count = participantSearchObj
					.countAlphaNumChar(searchCriteriaString);

			if (count.count < 2) {
				informationalManager.addInformationalMsg(new AppException(
						GENERALSEARCH.ERR_SEARCH_FV_CITY_SHORT).arg(2),
						CuramConst.gkEmpty,
						InformationalElement.InformationalType.kError);
			}
		}

		if (key.birthSurname.length() != 0 && key.fullName.length() == 0
				&& key.dateOfBirth.isZero()
				&& key.referenceNumber.length() == 0
				&& key.addressDtls.addressLine1.length() == 0
				&& key.addressDtls.addressLine2.length() == 0) {

			curam.core.sl.infrastructure.impl.ValidationManagerFactory
					.getManager()
					.addInfoMgrExceptionWithLookup(
							new AppException(
									BPOPERSONSEARCH.ERR_PERSONSEARCH_XFV_ADDITIONAL_CRITERIA),
							CuramConst.gkEmpty,
							InformationalElement.InformationalType.kError,
							curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
							2);
		}

		if (key.fullName.length() == 0 && key.dateOfBirth.isZero()
				&& key.referenceNumber.length() == 0
				&& key.gender.length() != 0
				&& key.addressDtls.addressLine1.length() == 0
				&& key.addressDtls.addressLine2.length() == 0) {

			curam.core.sl.infrastructure.impl.ValidationManagerFactory
					.getManager()
					.addInfoMgrExceptionWithLookup(
							new AppException(
									BPOPERSONSEARCH.ERR_PERSONSEARCH_XFV_ADDITIONAL_CRITERIA),
							CuramConst.gkEmpty,
							InformationalElement.InformationalType.kError,
							curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
							1);
		}

		if (key.fullName.length() == 0 && key.dateOfBirth.isZero()
				&& key.referenceNumber.length() == 0
				&& key.addressDtls.addressLine1.length() == 0
				&& key.addressDtls.addressLine2.length() == 0
				&& key.addressDtls.city.length() != 0) {

			curam.core.sl.infrastructure.impl.ValidationManagerFactory
					.getManager()
					.addInfoMgrExceptionWithLookup(
							new AppException(
									BPOPERSONSEARCH.ERR_PERSONSEARCH_XFV_ADDITIONAL_CRITERIA),
							CuramConst.gkEmpty,
							InformationalElement.InformationalType.kError,
							curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
							0);
		}

		informationalManager.failOperation();

		// Following validation for Informational message only
		if ((key.fullName.length() == 1 || key.birthSurname.length() == 1) ) {
			curam.core.sl.infrastructure.impl.ValidationManagerFactory
					.getManager()
					.addInfoMgrExceptionWithLookup(
							new AppException(
									BPOPERSONSEARCH.INF_PERSONSEARCH_EXACT_MATCH),
							CuramConst.gkEmpty,
							InformationalElement.InformationalType.kWarning,
							curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne,
							0);
		}

	}

}
