package curam.molsa.core.impl;


import java.util.regex.Pattern;

import curam.core.impl.CuramConst;
import curam.core.sl.entity.fact.NicknameFactory;
import curam.core.sl.entity.intf.Nickname;
import curam.core.sl.entity.struct.NicknameDtls;
import curam.core.sl.entity.struct.NicknameDtlsList;
import curam.core.sl.entity.struct.NicknameSearchKey;
import curam.core.sl.infrastructure.impl.ValidationManagerFactory;
import curam.core.struct.PersonSearchKey1;
import curam.core.struct.PersonSearchResult1;
import curam.message.GENERALSEARCH;
import curam.molsa.util.impl.MOLSAParticipantHelper;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.InformationalManager;
import curam.util.transaction.TransactionInfo;

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
  public PersonSearchResult1 search1(PersonSearchKey1 key) throws AppException, InformationalException {
    key.birthSurname = key.birthSurname.trim();
    key.forename = key.forename.trim();
    key.surname = key.surname.trim();
    key.addressDtls.addressLine1 = key.addressDtls.addressLine1.trim();
    key.addressDtls.addressLine2 = key.addressDtls.addressLine2.trim();
    key.addressDtls.city = key.addressDtls.city.trim();
    validateSearchKey(key);
    PersonSearchResult1 personSearchResult = getPersonSearchObj().search1(key);
    if(!key.referenceNumber.equals(CuramConst.gkEmpty)) {
      PersonSearchResult1 phonePersonSearchResult = 
        MOLSAParticipantHelper.removeDuplicateFromPhoneNumberSearch(
            personSearchResult,
            MOLSAParticipantHelper.searchConcernByPhoneNumber(key.referenceNumber)
            );
      
      personSearchResult.dtlsList.addAll(phonePersonSearchResult.dtlsList);
    }
    if(key.forename.length() > 0 && key.nicknameInd) {
        String searchName = key.forename;
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
                key.forename = propername;
                PersonSearchResult1 nicknameSearchResults = getPersonSearchObj().search1(key);
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

}
