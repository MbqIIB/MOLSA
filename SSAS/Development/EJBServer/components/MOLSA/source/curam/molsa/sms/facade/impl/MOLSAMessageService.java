package curam.molsa.sms.facade.impl;

import curam.attachmentlink.struct.AttachmentLinkDetails;
import curam.attachmentlink.struct.AttachmentLinkKey;
import curam.citizenaccount.facade.struct.ConcernRoleKey;
import curam.codetable.COMMUNICATIONFORMAT;
import curam.codetable.COMMUNICATIONSTATUS;
import curam.codetable.RECORDSTATUS;
import curam.core.facade.fact.AttachmentFactory;
import curam.core.facade.fact.CaseFactory;
import curam.core.facade.fact.CommunicationFactory;
import curam.core.facade.struct.CommunicationAndListRowActionDetails;
import curam.core.facade.struct.CommunicationDetailList;
import curam.core.facade.struct.CommunicationFilterKey;
import curam.core.facade.struct.ListCommunicationsKey;
import curam.core.facade.struct.ReadProFormaCommKey;
import curam.core.sl.struct.CaseMemberCommDetailsList;
import curam.core.sl.struct.CaseMemberCommunicationDetails;
import curam.core.sl.struct.CommunicationKey;
import curam.molsa.sms.facade.struct.MOLSAAdditionalBenefitDetailsList;
import curam.molsa.sms.facade.struct.MOLSACommunicationAndListRowActionDetails;
import curam.molsa.sms.facade.struct.MOLSACommunicationDetailList;
import curam.molsa.sms.facade.struct.MOLSAConcernRoleListAndMessageText;
import curam.molsa.sms.facade.struct.MOLSAMessageText;
import curam.molsa.sms.facade.struct.MOLSAMessageTextKey;
import curam.molsa.sms.facade.struct.MOLSAParticipantDetailsList;
import curam.molsa.sms.facade.struct.MOLSAParticipantFilterCriteriaDetails;
import curam.molsa.sms.sl.fact.MOLSASMSUtilFactory;
import curam.molsa.sms.sl.intf.MOLSASMSUtil;
import curam.molsa.sms.sl.struct.MOLSAConcernRoleListAndMessageTextDetails;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.RecordNotFoundException;
import curam.util.resources.impl.PropertiesResourceCache;


public abstract class MOLSAMessageService extends curam.molsa.sms.facade.base.MOLSAMessageService {


  public void sendSMS(MOLSAConcernRoleListAndMessageText key) throws AppException, InformationalException {
  }

  @Override
  public MOLSAMessageText getSMSMessageText(MOLSAMessageTextKey key) throws AppException, InformationalException {
    StringBuffer stringBuffer = new StringBuffer();
    MOLSAMessageText messageText = new MOLSAMessageText();
    stringBuffer.append(key.category);
    stringBuffer.append(".");
    stringBuffer.append(key.template);
    messageText.smsMessageText = PropertiesResourceCache.getInstance().getProperty("MOLSASMSMessageText.properties", stringBuffer.toString());
    return messageText;
  }

  @Override
  public void getParticipantForSMS() throws AppException, InformationalException {
    // TODO Auto-generated method stub

  }

  @Override
  public void listSMSFailuresByDate() throws AppException, InformationalException {
    // TODO Auto-generated method stub

  }

  @Override
  public void listAllFailedMessages() throws AppException, InformationalException {
    // TODO Auto-generated method stub

  }
 

  public MOLSAParticipantDetailsList listParticipantByCriteria(MOLSAParticipantFilterCriteriaDetails key) throws AppException, InformationalException {
    MOLSAParticipantDetailsList molsaParticipantDetailsList = new MOLSAParticipantDetailsList();

    MOLSASMSUtil molsasmsUtilObj=MOLSASMSUtilFactory.newInstance();
    curam.molsa.sms.sl.struct.MOLSAParticipantFilterCriteriaDetails filterCriteriaDetails=new curam.molsa.sms.sl.struct.MOLSAParticipantFilterCriteriaDetails();
    filterCriteriaDetails.dtls=key;
    curam.molsa.sms.sl.struct.MOLSAParticipantDetailsList detailsList =molsasmsUtilObj.listParticipantByCriteria(filterCriteriaDetails);
    molsaParticipantDetailsList.dtls.addAll(detailsList.dtls.dtls);
    
    return molsaParticipantDetailsList;
  }

  @Override
  public MOLSAAdditionalBenefitDetailsList listParticipantAdditionalBenefits(ConcernRoleKey key) throws AppException, InformationalException {
    MOLSAAdditionalBenefitDetailsList additionalBenefitDetailsList = new MOLSAAdditionalBenefitDetailsList();
    MOLSASMSUtil molsasmsUtilObj = MOLSASMSUtilFactory.newInstance();
    curam.molsa.sms.sl.struct.MOLSAAdditionalBenefitDetailsList benefitDetailsList = molsasmsUtilObj.listParticipantAdditionalBenefits(key);
    if(benefitDetailsList.dtls.dtls.size()>0){
      additionalBenefitDetailsList.dtls.addAll(benefitDetailsList.dtls.dtls);
    }
    return additionalBenefitDetailsList;
  }

  @Override
  public void exportParticipantsToExcel(MOLSAConcernRoleListAndMessageText key) throws AppException, InformationalException {
    // TODO Auto-generated method stub
    
    MOLSASMSUtil molsasmsUtilObj = MOLSASMSUtilFactory.newInstance();
    MOLSAConcernRoleListAndMessageTextDetails concernRoleListAndMessageTextDetails
    = new MOLSAConcernRoleListAndMessageTextDetails();
    concernRoleListAndMessageTextDetails.dtls.concernRoleTabbedList=key.concernRoleTabbedList;
    molsasmsUtilObj.exportParticipantsToExcel(concernRoleListAndMessageTextDetails);
    
  }

  @Override
  public MOLSACommunicationDetailList listFilteredCommunication(CommunicationFilterKey key) throws AppException, InformationalException {

    MOLSACommunicationDetailList molsaCommunicationDetailList = new MOLSACommunicationDetailList();
      CommunicationDetailList communicationDetailList = new CommunicationDetailList();   

      final ReadProFormaCommKey readProFormaCommKey = new ReadProFormaCommKey();


      // If the value for name is 'All' and the concernRoleID is 0 return all
      // of the communications for the case
      if (key.concernRoleID == 0) {

        ListCommunicationsKey listCommunicationsKey = new ListCommunicationsKey();

        listCommunicationsKey.caseID = key.caseID;

        communicationDetailList = CaseFactory.newInstance().listCaseCommunication(
          listCommunicationsKey);

      } // A case member has been selected display the communications for them
      else {
        CommunicationKey communicationKey = new CommunicationKey();

        communicationKey.caseID = key.caseID;
        communicationKey.concernRoleID = key.concernRoleID;

        CaseMemberCommDetailsList caseMemberCommDetailsList = curam.core.sl.fact.CommunicationFactory.newInstance().listRegardingCaseMemberCommunication(
          communicationKey);

        // Assign the details returned to a new struct that also contains
        // the
        // display indicators and fields required for the actions
        String communicationFormat = "";
        MOLSACommunicationAndListRowActionDetails communicationDtls;

        for (final CaseMemberCommunicationDetails caseMemberCommunicationDetails : caseMemberCommDetailsList.dtls.items()) {

          communicationDtls = new MOLSACommunicationAndListRowActionDetails();

           communicationDtls.dtls.assign(caseMemberCommunicationDetails);

          if (RECORDSTATUS.CANCELLED.equals( communicationDtls.dtls.statusCode)) {

             communicationDtls.dtls.canceledInd = true;

            if (COMMUNICATIONFORMAT.MSWORD.equals(
               communicationDtls.dtls.communicationFormat)) {
               communicationDtls.dtls.msWordInd = true;          
            } else if (COMMUNICATIONFORMAT.PROFORMA.equals(
               communicationDtls.dtls.communicationFormat)) {            
              readProFormaCommKey.proFormaCommKey.communicationID =  communicationDtls.dtls.communicationID;
               communicationDtls.dtls.localeIdentifier = CommunicationFactory.newInstance().readProForma1(readProFormaCommKey).readProFormaCommDetails.localeIdentifier;
            }
          } else {
            communicationFormat =  communicationDtls.dtls.communicationFormat;

            if (COMMUNICATIONFORMAT.EMAIL.equals(communicationFormat)
              && COMMUNICATIONSTATUS.DRAFT.equals(
                 communicationDtls.dtls.communicationStatus)) {

               communicationDtls.dtls.draftEmailInd = true;

            } else if (COMMUNICATIONFORMAT.MSWORD.equals(communicationFormat)) {

               communicationDtls.dtls.msWordInd = true;

              final AttachmentLinkKey attachmentLinkKey = new AttachmentLinkKey();

              attachmentLinkKey.attachmentLinkID =  communicationDtls.dtls.communicationID;

              AttachmentLinkDetails attachmentLinkDetails;

              try {
                attachmentLinkDetails = AttachmentFactory.newInstance().readAttachment(
                  attachmentLinkKey);

                 communicationDtls.dtls.attachmentDtls.attachmentName = attachmentLinkDetails.attachmentDtls.attachmentName;
                 communicationDtls.dtls.attachmentDtls.attachmentContents = attachmentLinkDetails.attachmentDtls.attachmentContents;

              } catch (final RecordNotFoundException rnfe) {// Do
                // nothing
                // there
                // are
                // no
                // attachments
                // associated
                // with
                // this communication
              }

            } else if (COMMUNICATIONFORMAT.PROFORMA.equals(communicationFormat)) {

               communicationDtls.dtls.proFormaInd = true;         
              
              readProFormaCommKey.proFormaCommKey.communicationID =  communicationDtls.dtls.communicationID;
               communicationDtls.dtls.localeIdentifier = CommunicationFactory.newInstance().readProForma1(readProFormaCommKey).readProFormaCommDetails.localeIdentifier;
            }  
            else if (COMMUNICATIONFORMAT.SMS.equals(communicationFormat)) {

                communicationDtls.smsInd = true;         
                
                readProFormaCommKey.proFormaCommKey.communicationID =  communicationDtls.dtls.communicationID;
                 communicationDtls.dtls.localeIdentifier = CommunicationFactory.newInstance().readProForma1(readProFormaCommKey).readProFormaCommDetails.localeIdentifier;
              }  
          }        
          // Get the delete page link
          CommunicationAndListRowActionDetails communicationDetails = new CommunicationAndListRowActionDetails();
          communicationDetails.assign(communicationDtls);
           communicationDtls.dtls.deletePage.deletePageName = CommunicationFactory.newInstance().getDeletePageName(communicationDetails).deletePageName;
          
          
           molsaCommunicationDetailList.dtls.addRef(communicationDtls);
          // Add this list item to the return struct
          //-communicationDetailList.communicationDtls.addRef(communicationDtls);
        }

      }

      return molsaCommunicationDetailList;
  }

}
