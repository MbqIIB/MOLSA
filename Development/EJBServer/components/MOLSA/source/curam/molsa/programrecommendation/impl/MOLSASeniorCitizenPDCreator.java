package curam.molsa.programrecommendation.impl;

import java.util.Calendar;
import java.util.List;

import com.google.inject.Inject;

import curam.codetable.CURRENCY;
import curam.core.facade.fact.PersonFactory;
import curam.core.facade.struct.ReadPersonDetails;
import curam.core.facade.struct.ReadPersonKey;
import curam.core.fact.AdminProductDeliveryPatternInfoFactory;
import curam.core.fact.CreateProductDeliveryFactory;
import curam.core.fact.MaintainCertificationFactory;
import curam.core.fact.ProductDeliveryApprovalFactory;
import curam.core.intf.MaintainCertification;
import curam.core.sl.base.TabDetailFormatter;
import curam.core.sl.entity.fact.CaseParticipantRoleFactory;
import curam.core.sl.entity.intf.CaseParticipantRole;
import curam.core.sl.entity.struct.CaseKeyStruct;
import curam.core.sl.entity.struct.CaseParticipantRoleDtls;
import curam.core.sl.fact.TabDetailFormatterFactory;
import curam.core.sl.struct.AgeDetails;
import curam.core.sl.struct.CalculationEndDate;
import curam.core.sl.struct.CalculationStartDate;
import curam.core.struct.AdminPDPIByProdIDAndDateKey;
import curam.core.struct.GetProductProviderDetailsResult;
import curam.core.struct.GetProductProviderKey;
import curam.core.struct.MaintainCertificationDetails;
import curam.core.struct.ProductDeliveryPatternInfoDetails;
import curam.core.struct.ProductProviderDetails;
import curam.core.struct.RegisterProductDeliveryDetails;
import curam.core.struct.RegisterProductDeliveryKey;
import curam.core.struct.SubmitForApprovalKey;
import curam.creoleprogramrecommendation.impl.DeliveryCreator;
import curam.creoleprogramrecommendation.impl.Member;
import curam.creoleprogramrecommendation.impl.SimulatedDetermination;
import curam.piwrapper.caseheader.impl.CaseHeader;
import curam.piwrapper.caseheader.impl.IntegratedCase;
import curam.piwrapper.caseheader.impl.ProductDelivery;
import curam.piwrapper.caseheader.impl.ProductDeliveryDAO;
import curam.piwrapper.casemanager.impl.CaseParticipantRoleDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.Date;
import curam.verification.sl.infrastructure.fact.VerificationFactory;

public class MOLSASeniorCitizenPDCreator implements DeliveryCreator{

	@Inject
	  private ProductDeliveryDAO productDeliveryDAO;
	
	@Inject
	private CaseParticipantRoleDAO caseParticipantRoleDAO;

	
	 public CaseHeader create(SimulatedDetermination simulatedDetermination)
     throws AppException, InformationalException {
   RegisterProductDeliveryKey registerProductDeliveryKey = registerProductDeliveryKey(simulatedDetermination);

   registerProductDeliveryKey.caseStartDate = simulatedDetermination
       .getDateRange().start();

   RegisterProductDeliveryDetails registerProductDeliveryDetails = registerProductDeliveryDetails(simulatedDetermination
       .getIntegratedCase());

   ProductDelivery productDelivery = createSocialAssistanceProductDelivery(
       registerProductDeliveryKey, registerProductDeliveryDetails);


   return productDelivery;
 }
	 
	 private void submitForApproval(ProductDelivery productDelivery)
     throws AppException, InformationalException {
   SubmitForApprovalKey submitForApprovalKey = new SubmitForApprovalKey();
   submitForApprovalKey.caseID = ((Long) productDelivery.getID()).longValue();
   ProductDeliveryApprovalFactory.newInstance().submitForApproval(
       submitForApprovalKey);
 }

 private boolean outstandingVerificationsExist(ProductDelivery productDelivery)
     throws AppException, InformationalException {
   CaseKeyStruct caseKeyStruct = new CaseKeyStruct();
   caseKeyStruct.caseID = ((Long) productDelivery.getID()).longValue();
   return (VerificationFactory.newInstance()
       .listPDOutstandingCaseVerificationDetails(caseKeyStruct).dtls.size() > 0);
 }

 private RegisterProductDeliveryKey registerProductDeliveryKey(
     SimulatedDetermination simulatedDetermination) throws AppException,
     InformationalException {
   RegisterProductDeliveryKey registerProductDeliveryKey = new RegisterProductDeliveryKey();
   int membersize=simulatedDetermination.getMembers().size();
   List<Member> members = simulatedDetermination.getMembers();
   
   long elderCPRID = 00;
   int elderage = 60;
   int age = 0;
   

   if(membersize>1)
   {
	   
	   for (Member member : members) {
		     age = getAge(member.caseParticipantRoleID());
		     if (age >= elderage) {
		    	
		    	 registerProductDeliveryKey.clientID = caseParticipantRoleDAO
					.get(member.caseParticipantRoleID()).getConcernRole().getID();
					
		    	 
		     }
   }
   
   }else{
	   
	   registerProductDeliveryKey.clientID = caseParticipantRoleDAO
		.get(simulatedDetermination.getMembers().get(0)
				.caseParticipantRoleID()).getConcernRole().getID();
	   
   }
   
   
   


   registerProductDeliveryKey.productID = simulatedDetermination.productID();
   registerProductDeliveryKey.receivedDate = Date.getCurrentDate();
   registerProductDeliveryKey.currencyType = CURRENCY.DEFAULTCODE;
   registerProductDeliveryKey.integratedCaseID = ((Long) simulatedDetermination
       .getIntegratedCase().getID()).longValue();

   GetProductProviderDetailsResult getProductProviderDetailsResult = productProviderDetailsResult(simulatedDetermination);

   registerProductDeliveryKey.productProviderID = ((ProductProviderDetails) getProductProviderDetailsResult.productProvidersDetailsList.dtls
       .get(0)).productProviderID;

   registerProductDeliveryKey.providerLocationID = ((ProductProviderDetails) getProductProviderDetailsResult.productProvidersDetailsList.dtls
       .get(0)).providerLocationID;

   registerProductDeliveryKey.productDeliveryPatternID = productDeliveryPatternInfoDetails(simulatedDetermination).productDeliveryPatternID;

   return registerProductDeliveryKey;
 }

 private GetProductProviderDetailsResult productProviderDetailsResult(
     SimulatedDetermination simulatedDetermination) throws AppException,
     InformationalException {
   GetProductProviderKey getProductProviderKey = new GetProductProviderKey();
   getProductProviderKey.productID = simulatedDetermination.productID();
   GetProductProviderDetailsResult getProductProviderDetailsResult = CreateProductDeliveryFactory
       .newInstance().getProductProviderDetails(getProductProviderKey);

   return getProductProviderDetailsResult;
 }

 private ProductDeliveryPatternInfoDetails productDeliveryPatternInfoDetails(
     SimulatedDetermination simulatedDetermination) throws AppException,
     InformationalException {
   AdminPDPIByProdIDAndDateKey adminPDPIByProdIDAndDateKey = new AdminPDPIByProdIDAndDateKey();
   adminPDPIByProdIDAndDateKey.productID = simulatedDetermination.productID();
   adminPDPIByProdIDAndDateKey.effectiveDate = Date.getCurrentDate();
   ProductDeliveryPatternInfoDetails productDeliveryPatternInfoDetails = AdminProductDeliveryPatternInfoFactory
       .newInstance()
       .getDefaultByProductIDAndDate(adminPDPIByProdIDAndDateKey);

   return productDeliveryPatternInfoDetails;
 }

 private RegisterProductDeliveryDetails registerProductDeliveryDetails(
     IntegratedCase integratedCase) {
   RegisterProductDeliveryDetails registerProductDeliveryDetails = new RegisterProductDeliveryDetails();
   registerProductDeliveryDetails.integratedCaseInd = true;
   registerProductDeliveryDetails.integratedCaseID = ((Long) integratedCase
       .getID()).longValue();

   return registerProductDeliveryDetails;
 }

 private ProductDelivery createSocialAssistanceProductDelivery(
     RegisterProductDeliveryKey registerProductDeliveryKey,
     RegisterProductDeliveryDetails registerProductDeliveryDetails)
     throws AppException, InformationalException {
   RegisterProductDeliveryDetails productDeliveryDetails = CreateProductDeliveryFactory
       .newInstance().registerProductDelivery(registerProductDeliveryKey,
           registerProductDeliveryDetails);

   ProductDelivery productDelivery = (ProductDelivery) this.productDeliveryDAO
       .get(Long.valueOf(productDeliveryDetails.caseID));

   MaintainCertification maintainCertificationObj = MaintainCertificationFactory
       .newInstance();

   MaintainCertificationDetails maintainCertificationDetails = new MaintainCertificationDetails();

   maintainCertificationDetails.caseID = registerProductDeliveryDetails.caseID;
   maintainCertificationDetails.periodFromDate = registerProductDeliveryKey.caseStartDate;

   Calendar calendarToDate = registerProductDeliveryKey.caseStartDate
       .getCalendar();

   calendarToDate.add(2, (int) 11l);

   calendarToDate.set(5, calendarToDate.getActualMaximum(5));

   maintainCertificationDetails.periodToDate = new Date(calendarToDate);

   if (registerProductDeliveryKey.caseStartDate.after(Date.getCurrentDate())) {
     maintainCertificationDetails.certificationReceivedDate = Date
         .getCurrentDate();
   } else {
     maintainCertificationDetails.certificationReceivedDate = registerProductDeliveryKey.caseStartDate;
   }

   maintainCertificationObj.createCertification(maintainCertificationDetails);

   return productDelivery;
 }

 private Date rollbackToEndOfPreviousMonth(Date date) {
   if (date == null) {
     return date;
   }

   Calendar calendar = date.getCalendar();
   calendar.add(2, -1);
   calendar.set(5, calendar.getActualMaximum(5));

   return new Date(calendar);
 }

 private int getAge(long caseParticipantRoleID) throws AppException,
     InformationalException {
   int ageInDays = 0;

   CaseParticipantRole caseParticipantRole = CaseParticipantRoleFactory
       .newInstance();
   curam.core.sl.entity.struct.CaseParticipantRoleKey caseParticipantRoleKey = new curam.core.sl.entity.struct.CaseParticipantRoleKey();
   caseParticipantRoleKey.caseParticipantRoleID = caseParticipantRoleID;
   CaseParticipantRoleDtls caseParticipantRoleDetails = caseParticipantRole
       .read(caseParticipantRoleKey);
   ReadPersonKey personKey = new ReadPersonKey();
   personKey.maintainConcernRoleKey.concernRoleID = caseParticipantRoleDetails.participantRoleID;
   ReadPersonDetails person = PersonFactory.newInstance()
       .readPerson(personKey);
   Date dob = person.personFurtherDetails.dateOfBirth;
   ageInDays = Date.getCurrentDate().subtract(dob);
   CalculationStartDate startdate= new CalculationStartDate();
   CalculationEndDate enddate= new CalculationEndDate();
   startdate.startDate=dob;
   enddate.endDate=Date.getCurrentDate();
   AgeDetails agedetails=TabDetailFormatterFactory.newInstance().calculateAge(startdate, enddate);
   return agedetails.ageYears;
 }

}
