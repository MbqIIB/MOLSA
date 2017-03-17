package curam.molsa.core.impl;

import curam.codetable.ADDRESSELEMENTTYPE;
import curam.codetable.DUPLICATESTATUS;
import curam.codetable.RECORDSTATUS;
import curam.core.fact.PersonSearchFactory;
import curam.core.fact.PhoneticEncoderFactory;
import curam.core.fact.UsersFactory;
import curam.core.impl.CuramConst;
import curam.core.intf.Address;
import curam.core.intf.PersonSearch;
import curam.core.intf.PhoneticEncoder;
import curam.core.intf.Users;
import curam.core.sl.fact.ParticipantSearchFactory;
import curam.core.sl.intf.ParticipantSearch;
import curam.core.sl.struct.SQLStatement;
import curam.core.sl.struct.SearchCriteriaString;
import curam.core.struct.DisableLinkIndicatorDetails;
import curam.core.struct.PersonDatabaseSearchKey1;
import curam.core.struct.PersonSearchDetails;
import curam.core.struct.PersonSearchDtls1;
import curam.core.struct.PersonSearchResult1;
import curam.core.struct.PhoneticEncoderDetails;
import curam.core.struct.PhoneticEncoderKey;
import curam.core.struct.UsersDtls;
import curam.core.struct.UsersKey;
import curam.message.GENERAL;
import curam.molsa.core.facade.struct.MOLSAPersonSearchKey1;
import curam.molsa.core.struct.MOLSAPersonDatabaseSearchKey1;
import curam.util.dataaccess.CuramValueList;
import curam.util.dataaccess.DynamicDataAccess;
import curam.util.exception.AppException;
import curam.util.exception.InformationalElement;
import curam.util.exception.InformationalException;
import curam.util.exception.InformationalManager;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Date;

public class MOLSADatabasePersonSearch extends curam.molsa.core.base.MOLSADatabasePersonSearch {

	@Override
	public PersonSearchResult1 search1(MOLSAPersonSearchKey1 key)
			throws AppException, InformationalException {

	    InformationalManager informationalManager = TransactionInfo.getInformationalManager();

	    PersonSearchResult1 personSearchResult = new PersonSearchResult1();

	    MOLSAPersonDatabaseSearchKey1 personDatabaseSearchKey = calculateKey1(key);

	    // BEGIN, CR00232051, GD
	    CuramValueList<PersonSearchDtls1> curamValueList = new CuramValueList<PersonSearchDtls1>(
	      PersonSearchDtls1.class);

	    // END, CR00232051

	    try {

	      // BEGIN, CR00282028, IBM
	      // Call dynamic SQL API to execute SQL
	      curamValueList = DynamicDataAccess.executeNsMulti(PersonSearchDtls1.class,
	        personDatabaseSearchKey, false, true,
	        formatSQL(personDatabaseSearchKey).sqlStatement);
	      // END, CR00282028

	    } catch (curam.util.exception.ReadmultiMaxException e) {

	      curam.core.sl.infrastructure.impl.ValidationManagerFactory.getManager().addInfoMgrExceptionWithLookup(
	        new AppException(GENERAL.INF_GENERAL_SEARCH_TOO_MANY_RECORDS),
	        CuramConst.gkEmpty, InformationalElement.InformationalType.kError,
	        curam.core.sl.infrastructure.impl.ValidationManagerConst.kSetOne, 3);

	      informationalManager.failOperation();
	    }

	    DisableLinkIndicatorDetails disableLinkIndicatorDetails = new DisableLinkIndicatorDetails();

	    disableLinkIndicatorDetails.disableLinkInd = key.disableLinkInd;
	    
	    PersonSearch personSearchObj = PersonSearchFactory.newInstance();

	    for (int i = 0; i < curamValueList.size(); i++) {

	      PersonSearchDetails personSearchDetails = personSearchObj.processSearchDetails(
	        curamValueList.get(i), disableLinkIndicatorDetails);

	      if (personSearchDetails != null) {
	        personSearchResult.dtlsList.addRef(personSearchDetails);
	      }
	    }

	    return personSearchResult;
	}


	protected MOLSAPersonDatabaseSearchKey1 calculateKey1(MOLSAPersonSearchKey1 key)
			throws AppException, InformationalException {


	    MOLSAPersonDatabaseSearchKey1 personDatabaseSearchKey = new MOLSAPersonDatabaseSearchKey1();

	    personDatabaseSearchKey.dateOfBirth = key.dateOfBirth;
	    personDatabaseSearchKey.gender = key.gender;
	    personDatabaseSearchKey.referenceNumber = key.referenceNumber;
	    
	    
	    // soundsLike is not going to work with full name in MOLSAMoi table
	    key.soundsLikeInd = false;

	    if (key.fullName.length() > 0) {

	      if (key.soundsLikeInd) {
	        
	        // BEGIN, CR00341632, MV
	        PhoneticEncoder phoneticEncoderObj = PhoneticEncoderFactory.newInstance();
	        // END, CR00341632
	        
	        PhoneticEncoderKey phoneticEncoderKey = new PhoneticEncoderKey();
	        PhoneticEncoderDetails phoneticEncoderDetails = new PhoneticEncoderDetails();

	        phoneticEncoderKey.surname = key.fullName.toUpperCase();
	        phoneticEncoderDetails = phoneticEncoderObj.encode(phoneticEncoderKey);

	        personDatabaseSearchKey.phoneticEncode = phoneticEncoderDetails.phoneticEncodingCode;
	        // BEGIN, CR00341632, MV
	        if (phoneticEncoderDetails.phoneticEncodingCode.isEmpty()) {
	          personDatabaseSearchKey.fullName = key.fullName.toUpperCase()
	            + CuramConst.gkSqlWildcard;
	        }
	        // END, CR00341632
	      } else {
	        // BEGIN, CR00338327, ZV
	        personDatabaseSearchKey.fullName = key.fullName.toUpperCase();
	        if (personDatabaseSearchKey.fullName.length() > 1) {
	          personDatabaseSearchKey.fullName += CuramConst.gkSqlWildcard;
	        }
	        // END, CR00338327      
	      }

	    }

	    if (key.birthSurname.length() > 0) {
	      // BEGIN, CR00338327, ZV
	      personDatabaseSearchKey.birthSurname = key.birthSurname.toUpperCase();
	      if (personDatabaseSearchKey.birthSurname.length() > 1) {
	        personDatabaseSearchKey.birthSurname += CuramConst.gkSqlWildcard;
	      }
	      // END, CR00338327      
	    }

	    if (key.fullName.length() > 0 && key.nicknameInd) {
	      personDatabaseSearchKey.nickname = key.fullName.toUpperCase();
	    }

	    if (key.phoneNumber.length() > 0) {
		      personDatabaseSearchKey.phoneNumber = key.phoneNumber.toUpperCase()
		        + CuramConst.gkSqlWildcard;
		}
	    
	    if (key.addressDtls.addressLine1.length() > 0) {
	      personDatabaseSearchKey.addressLine1 = key.addressDtls.addressLine1.toUpperCase()
	        + CuramConst.gkSqlWildcard;
	    }

	    if (key.addressDtls.addressLine2.length() > 0) {
	      personDatabaseSearchKey.addressLine2 = key.addressDtls.addressLine2.toUpperCase()
	        + CuramConst.gkSqlWildcard;
	    }

	    if (key.addressDtls.city.length() > 0) {
	      personDatabaseSearchKey.city = key.addressDtls.city.toUpperCase()
	        + CuramConst.gkSqlWildcard;
	    }

	    personDatabaseSearchKey.cityType = ADDRESSELEMENTTYPE.CITY;
	    personDatabaseSearchKey.recordStatus = RECORDSTATUS.NORMAL;
	    personDatabaseSearchKey.duplicateStatus = DUPLICATESTATUS.MARKED;

	    personDatabaseSearchKey.addressLine1Type = ADDRESSELEMENTTYPE.LINE1;
	    personDatabaseSearchKey.addressLine2Type = ADDRESSELEMENTTYPE.LINE2;

	    return personDatabaseSearchKey;
	  
	}

	protected SQLStatement formatSQL(MOLSAPersonDatabaseSearchKey1 key)
			throws AppException, InformationalException {

	    SQLStatement sqlStatement = new SQLStatement();

		Users usersObj = UsersFactory.newInstance();
		UsersKey usersKey = new UsersKey();

		usersKey.userName = TransactionInfo.getProgramUser();
		UsersDtls usersDtls = usersObj.read(usersKey);
		
		
	    ParticipantSearch participantSearchObj = ParticipantSearchFactory.newInstance();
	    SearchCriteriaString searchCriteriaString = new SearchCriteriaString();

	    String sqlMainSelectStr = new String();
	    String sqlSelectStr = new String();
	    String sqlIntoStr = new String();
	    String sqlPersonFromStr = new String();
	    String sqlProspectPersonFromStr = new String();
	    String sqlFromStr = new String();
	    String sqlWhereStr = new String();
	    String sqlPersonWhereStr = new String();
	    String sqlProspectPersonWhereStr = new String();
	    String sqlSortingStr = new String();
	    String sqlPersonSelectStr = new String();
	    String sqlProspectPersonSelectStr = new String();
	    String sqlPersonWhereStrDOB = new String();
	    String sqlProspectPersonWhereStrDOB = new String();

	    sqlMainSelectStr = "SELECT dateOfBirth, ";
	    sqlMainSelectStr += "primaryConcernRoleName, ";
	    sqlMainSelectStr += "primaryAlternateID, ";
	    sqlMainSelectStr += "concernRoleID, ";
	    sqlMainSelectStr += "concernRoleType, ";
	    sqlMainSelectStr += "primaryAddressData, ";
	    sqlMainSelectStr += "originalConcernRoleID, ";
	    sqlMainSelectStr += "originalConcernRoleName, ";
	    sqlMainSelectStr += "originalPrimaryAlternateID ";
 
	    sqlPersonSelectStr = "SELECT DISTINCT Person.dateOfBirth, ";
	    sqlProspectPersonSelectStr = "SELECT DISTINCT ProspectPerson.dateOfBirth, ";
	    
	    //sqlSelectStr += "ConcernRole.concernRoleName primaryConcernRoleName, ";
		if (usersDtls.defaultLocale.equalsIgnoreCase("AR")) {
			sqlSelectStr += "MolsaMoi.fullname_ar primaryConcernRoleName, ";
		} else {
			sqlSelectStr += "MolsaMoi.fullname_en primaryConcernRoleName, ";
		}
	    
	    sqlSelectStr += "ConcernRole.primaryAlternateID, ";
	    sqlSelectStr += "ConcernRole.concernRoleID, ";
	    sqlSelectStr += "ConcernRole.concernRoleType, ";
	    sqlSelectStr += "PrimaryAddress.addressData primaryAddressData, ";
	    sqlSelectStr += "ConcernRoleDuplicate.originalConcernRoleID, ";
	    
	    //sqlSelectStr += "ConcernRoleDuplicate.originalConcernRoleName, ";
		if (usersDtls.defaultLocale.equalsIgnoreCase("AR")) {
			sqlSelectStr += "MolsaMoi.fullname_ar originalConcernRoleName, ";
		} else {
			sqlSelectStr += "MolsaMoi.fullname_en originalConcernRoleName, ";
		}
	    
	    sqlSelectStr += "ConcernRoleDuplicate.originalPrimaryAlternateID, ";
	    sqlSelectStr += "PrimaryName.surname, ";
	    sqlSelectStr += "PrimaryName.firstForename ";

	    sqlIntoStr = "INTO :dateOfBirth, ";
	    sqlIntoStr += ":primaryConcernRoleName, ";
	    sqlIntoStr += ":primaryAlternateID, ";
	    sqlIntoStr += ":concernRoleID, ";
	    sqlIntoStr += ":concernRoleType, ";
	    sqlIntoStr += ":primaryAddress, ";
	    sqlIntoStr += ":originalConcernRoleID, ";
	    sqlIntoStr += ":originalConcernRoleName, ";
	    sqlIntoStr += ":originalPrimaryAlternateID ";

	    sqlPersonFromStr = "FROM Person, ";

	    sqlProspectPersonFromStr = "FROM ProspectPerson, ";

	    sqlFromStr = "ConcernRole ";
	    sqlFromStr += "LEFT OUTER JOIN ";
	    sqlFromStr += "(SELECT ConcernRoleDuplicate.duplicateConcernRoleID, ";
	    sqlFromStr += "ConcernRoleDuplicate.originalConcernRoleID,  ";
	    sqlFromStr += "ConcernRole.concernRoleName originalConcernRoleName, ";
	    sqlFromStr += "ConcernRole.primaryAlternateID originalPrimaryAlternateID ";
	    sqlFromStr += "FROM ConcernRoleDuplicate, ConcernRole ";
	    sqlFromStr += "WHERE ConcernRoleDuplicate.originalConcernRoleID =  ";
	    sqlFromStr += "ConcernRole.concernRoleID ";
	    sqlFromStr += "AND ConcernRoleDuplicate.statusCode = :duplicateStatus) ";
	    sqlFromStr += "ConcernRoleDuplicate ON ";
	    sqlFromStr += "ConcernRoleDuplicate.duplicateConcernRoleID = ";
	    sqlFromStr += "ConcernRole.concernRoleID, ";
	    sqlFromStr += "Address PrimaryAddress, ";
	    sqlFromStr += "AlternateName PrimaryName, ";
	    //
	    sqlFromStr += "MolsaMoi, ";
	    sqlFromStr += "ConcernRoleAlternateID ";
	    

	    sqlPersonWhereStr = "WHERE ConcernRole.concernRoleID = ";
	    sqlPersonWhereStr += "Person.concernRoleID ";
	    sqlPersonWhereStr += "AND Person.primaryAlternateNameID = ";
	    sqlPersonWhereStr += "PrimaryName.alternateNameID ";
	    //
	    sqlPersonWhereStr += "AND ConcernRoleAlternateID.concernRoleID = CONCERNROLE.concernRoleID ";
	    sqlPersonWhereStr += "AND ConcernRoleAlternateID.alternateID = MolsaMoi.QID ";
	    sqlPersonWhereStr += "AND ConcernRoleAlternateID.typeCode = 'CA1' ";
	    sqlPersonWhereStr += "AND ConcernRoleAlternateID.statusCode = 'RST1' ";

	    sqlProspectPersonWhereStr = "WHERE ConcernRole.concernRoleID = ";
	    sqlProspectPersonWhereStr += "ProspectPerson.concernRoleID ";
	    sqlProspectPersonWhereStr += "AND ProspectPerson.personConcernRoleID IS NULL ";
	    sqlProspectPersonWhereStr += "AND ProspectPerson.primaryAlternateNameID = ";
	    sqlProspectPersonWhereStr += "PrimaryName.alternateNameID ";
	    //
	    sqlProspectPersonWhereStr += "AND ConcernRoleAlternateID.concernRoleID = CONCERNROLE.concernRoleID ";
	    sqlProspectPersonWhereStr += "AND ConcernRoleAlternateID.alternateID = MolsaMoi.QID "; 
	    sqlProspectPersonWhereStr += "AND ConcernRoleAlternateID.typeCode = 'CA1' ";
	    sqlProspectPersonWhereStr += "AND ConcernRoleAlternateID.statusCode = 'RST1' ";

	    sqlWhereStr = "AND ConcernRole.primaryAddressID = ";
	    sqlWhereStr += "PrimaryAddress.addressID ";

	    sqlSortingStr = "ORDER BY surname, firstForename, dateofBirth";

	    if (key.referenceNumber.length() > 0) {

	      sqlMainSelectStr += ", alternateID ";
	      sqlSelectStr += ", ConcernRoleAlternateID.alternateID ";

	      sqlIntoStr += ", :alternateID ";

	      //sqlFromStr += ", ConcernRoleAlternateID ";

	      //sqlWhereStr += "AND ConcernRoleAlternateID.concernRoleID = ";
	      //sqlWhereStr += "ConcernRole.concernRoleID ";
	      sqlWhereStr += "AND ConcernRoleAlternateID.alternateID = ";
	      sqlWhereStr += ":referenceNumber ";
	      //sqlWhereStr += "AND ConcernRoleAlternateID.statusCode = :recordStatus ";
	    }

	    if (key.fullName.length() > 0 
	      || key.phoneticEncode.length() > 0) {

	      sqlMainSelectStr += ", concernRoleName ";
	      //sqlSelectStr += ", AlternateName.fullName concernRoleName ";
			if (usersDtls.defaultLocale.equalsIgnoreCase("AR")) {
				sqlSelectStr += ", MolsaMoi.fullName_ar concernRoleName ";
			} else {
				sqlSelectStr += ", MolsaMoi.fullName_en concernRoleName ";
			}
	      
	      sqlIntoStr += ", :concernRoleName ";

	      //sqlFromStr += ", AlternateName ";

	      //sqlWhereStr += "AND AlternateName.concernRoleID = ";
	      //sqlWhereStr += "ConcernRole.concernRoleID ";
	      //sqlWhereStr += "AND AlternateName.nameStatus = :recordStatus ";

	      //if (key.firstForename.length() > 0) {
	        //searchCriteriaString.string = key.firstForename;
	        //sqlWhereStr += "AND AlternateName.upperFirstForename ";
	        //sqlWhereStr += participantSearchObj.getWildcardSearchOperator(searchCriteriaString).sqlStatement
	          //+ " :firstForename ";
	      //}

	      if (key.fullName.length() > 0) {
	        searchCriteriaString.string = key.fullName;
	        //sqlWhereStr += "AND AlternateName.upperSurname ";
			if (usersDtls.defaultLocale.equalsIgnoreCase("AR")) {
				sqlWhereStr += "AND upper(MolsaMoi.fullName_ar) ";
			} else {
				sqlWhereStr += "AND upper(MolsaMoi.fullName_en) ";
			}
	        
	        sqlWhereStr += participantSearchObj.getWildcardSearchOperator(searchCriteriaString).sqlStatement
	          + " :fullName ";
	      }

	      if (key.phoneticEncode.length() > 0) {
	        sqlWhereStr += "AND AlternateName.phoneticEncoding = :phoneticEncode ";
	      }

	    }

		if (key.phoneNumber.length() > 0) {
			searchCriteriaString.string = key.phoneNumber;

			sqlFromStr += ", PhoneNumber ";
			sqlFromStr += ", ConcernRolePhoneNumber ";

			sqlWhereStr += "AND ConcernRole.concernRoleID = ";
			sqlWhereStr += "ConcernRolePhoneNumber.concernRoleID ";
			
			sqlWhereStr += "AND ConcernRolePhoneNumber.phoneNumberID = ";
			sqlWhereStr += "PhoneNumber.phoneNumberID ";

			sqlWhereStr += "AND PhoneNumber.PhoneNumber = :PhoneNumber ";
			
			//sqlWhereStr += participantSearchObj
					//.getWildcardSearchOperator(searchCriteriaString).sqlStatement
					//+ " :PhoneNumber ";
		}
	      
	    if (key.addressLine1.length() > 0 || key.addressLine2.length() > 0
	      || key.city.length() > 0) {

	      sqlMainSelectStr += ", addressData ";
	      sqlSelectStr += ", Address.addressData ";

	      sqlIntoStr += ", :address ";

	      sqlFromStr += ", ConcernRoleAddress, Address ";

	      sqlWhereStr += "AND ConcernRole.concernRoleID = ";
	      sqlWhereStr += "ConcernRoleAddress.concernRoleID ";
	      sqlWhereStr += "AND ConcernRoleAddress.addressID = Address.addressID ";
	      sqlWhereStr += "AND ConcernRoleAddress.statusCode = :recordStatus ";

	      if (key.addressLine1.length() > 0) {
	        searchCriteriaString.string = key.addressLine1;

	        sqlFromStr += ", AddressElement AddressLine1 ";

	        sqlWhereStr += "AND ConcernRoleAddress.addressID = ";
	        sqlWhereStr += "AddressLine1.addressID ";
	        sqlWhereStr += "AND AddressLine1.elementType = :addressLine1Type ";
	        sqlWhereStr += "AND AddressLine1.upperElementValue ";
	        sqlWhereStr += participantSearchObj.getWildcardSearchOperator(searchCriteriaString).sqlStatement
	          + " :addressLine1 ";
	      }

	      if (key.addressLine2.length() > 0) {
	        searchCriteriaString.string = key.addressLine2;

	        sqlFromStr += ", AddressElement AddressLine2 ";

	        sqlWhereStr += "AND ConcernRoleAddress.addressID = ";
	        sqlWhereStr += "AddressLine2.addressID ";
	        sqlWhereStr += "AND AddressLine2.elementType = :addressLine2Type ";
	        sqlWhereStr += "AND AddressLine2.upperElementValue ";
	        sqlWhereStr += participantSearchObj.getWildcardSearchOperator(searchCriteriaString).sqlStatement
	          + " :addressLine2 ";
	      }

	      if (key.city.length() > 0) {
	        searchCriteriaString.string = key.city;

	        sqlFromStr += ", AddressElement AddressCity ";

	        sqlWhereStr += "AND ConcernRoleAddress.addressID = ";
	        sqlWhereStr += "AddressCity.addressID ";
	        sqlWhereStr += "AND AddressCity.elementType = :cityType ";
	        sqlWhereStr += "AND AddressCity.upperElementValue ";
	        sqlWhereStr += participantSearchObj.getWildcardSearchOperator(searchCriteriaString).sqlStatement
	          + " :city ";
	      }

	    }

	    if (key.birthSurname.length() > 0) {
	      searchCriteriaString.string = key.birthSurname;
	      sqlWhereStr += "AND upperPersonBirthName ";
	      sqlWhereStr += participantSearchObj.getWildcardSearchOperator(searchCriteriaString).sqlStatement
	        + " :birthSurname ";
	    }

	    if (key.gender.length() > 0) {
	      sqlWhereStr += "AND gender = :gender ";
	    }

	    if (!key.dateOfBirth.isZero()) {
	      sqlPersonWhereStrDOB += "AND Person.dateOfBirth = :dateOfBirth ";
	      sqlProspectPersonWhereStrDOB += "AND ProspectPerson.dateOfBirth = :dateOfBirth ";
	    }

	    sqlStatement.sqlStatement = sqlMainSelectStr;
	    sqlStatement.sqlStatement += sqlIntoStr;
	    sqlStatement.sqlStatement += "FROM (";
	    
	    sqlStatement.sqlStatement += sqlPersonSelectStr + sqlSelectStr + sqlPersonFromStr + sqlFromStr
	      + sqlPersonWhereStr + sqlWhereStr + sqlPersonWhereStrDOB;
	    
	    sqlStatement.sqlStatement += " UNION ALL " + sqlProspectPersonSelectStr + sqlSelectStr
	      + sqlProspectPersonFromStr + sqlFromStr + sqlProspectPersonWhereStr
	      + sqlWhereStr + sqlProspectPersonWhereStrDOB;
	    sqlStatement.sqlStatement += ") Person " + sqlSortingStr;
	    
	    return sqlStatement;
	  
	}

}
