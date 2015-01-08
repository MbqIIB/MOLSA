package curam.molsa.core.facade.impl;

import curam.core.facade.struct.PersonSearchDetailsResult;
import curam.core.facade.struct.PersonSearchKey1;
import curam.molsa.core.fact.MOLSAPersonSearchRouterDAFactory;
import curam.molsa.core.intf.MOLSAPersonSearchRouterDA;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

/**
 * 
 * The class is overridden  from OOTB Person Class.
 *
 */
public class MOLSAPersonDA extends curam.molsa.core.facade.base.MOLSAPersonDA{

  /**
   * This method will is overridden to call the MOLSA Service Layer.
   * 
   * @param personSearchKey1 PersonSearchKey1
   * @return PersonSearchDetailsResult PersonSearchDetailsResult 
   * @throws InformationalException General Exception
   * @throws AppException General Exception
   */
  @Override
  public PersonSearchDetailsResult searchPerson(PersonSearchKey1 personSearchKey1) throws AppException, InformationalException {
    MOLSAPersonSearchRouterDA personSearchRouterObj = MOLSAPersonSearchRouterDAFactory.newInstance();
    PersonSearchDetailsResult personSearchResult = new PersonSearchDetailsResult();
    personSearchResult.personSearchResult = personSearchRouterObj.search1(personSearchKey1.personSearchKey);
    collectInformationalMsgs(personSearchResult.informationalMsgDtls);
    return personSearchResult;
  }

}
