package curam.molsa.screening.facade.impl;

import com.google.inject.Inject;

import curam.citizenworkspace.pageplayer.impl.PagePlayerStateDAO;
import curam.citizenworkspace.pageplayer.internal.impl.PagePlayerStateInternal;
import curam.codetable.PRIORITY;
import curam.codetable.SYSTEMTICKET;
import curam.codetable.TICKETTYPE;
import curam.core.fact.MaintainAdminConcernRoleFactory;
import curam.core.fact.NotificationFactory;
import curam.core.intf.MaintainAdminConcernRole;
import curam.core.intf.Notification;
import curam.core.struct.NotificationDetails;
import curam.datastore.impl.Datastore;
import curam.datastore.impl.DatastoreFactory;
import curam.datastore.impl.Entity;
import curam.datastore.impl.NoSuchSchemaException;
import curam.ieg.impl.IEGScriptExecution;
import curam.ieg.impl.IEGScriptExecutionFactory;
import curam.message.MOLSANOTIFICATION;
import curam.molsa.constants.impl.MOLSADatastoreConst;
import curam.molsa.screening.facade.struct.NotificationResult;
import curam.molsa.screening.facade.struct.PlayerIDAndExecutionID;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;

public class MolsaScreeningNotification extends
    curam.molsa.screening.facade.base.MolsaScreeningNotification {

  @SuppressWarnings("restriction")
  /**
   * PagePlayerState DAO.
   */
  @Inject
  private PagePlayerStateDAO pagePlayerStateDAO;

  public MolsaScreeningNotification() {
    GuiceWrapper.getInjector().injectMembers(this);
  }

  @Override
  public NotificationResult sendNotificationToCaseWorker(
      PlayerIDAndExecutionID playerAndExecutionID) throws AppException,
      InformationalException {
    PagePlayerStateInternal pagePlayerState = (PagePlayerStateInternal) pagePlayerStateDAO
        .get(playerAndExecutionID.playerID);

    final IEGScriptExecution iegScriptExecution = IEGScriptExecutionFactory
        .getInstance().getScriptExecutionObject(
            pagePlayerState.getScreeningScriptInfoID());
    final String schemaName = iegScriptExecution.getSchemaName();

    Datastore datastore = null;
    try {
      datastore = DatastoreFactory.newInstance().openDatastore(schemaName);
    } catch (NoSuchSchemaException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }

    final Entity application = datastore.readEntity(iegScriptExecution
        .getRootEntityID());
    final Entity[] personEntities = application.getChildEntities(datastore
        .getEntityType(MOLSADatastoreConst.kPerson));
    String qid = null;
    String name = null;

    for (Entity personEntity : personEntities) {
      if ((Boolean) personEntity
          .getTypedAttribute(MOLSADatastoreConst.kIsPrimaryParticipant)) {
        qid = personEntity.getAttribute(MOLSADatastoreConst.kQIDNumber);
        name = personEntity.getAttribute(MOLSADatastoreConst.kFirstName);

      }

    }

    Notification notificationObj = NotificationFactory.newInstance();
    MaintainAdminConcernRole concernRoleObj = MaintainAdminConcernRoleFactory
        .newInstance();

    NotificationDetails notificationDetails = new NotificationDetails();
    AppException message = new AppException(MOLSANOTIFICATION.SCREENING_PERSON);
    message.arg(name);
    message.arg(qid);
   // notificationDetails.concernRoleID = Long.valueOf(45000);
    notificationDetails.reasonText = message.getMessage();
    notificationDetails.subject = message.getMessage();
    notificationDetails.currPriority = PRIORITY.DEFAULTCODE;
    notificationDetails.ticketType = TICKETTYPE.USERNOTIFICATION;
    notificationDetails.ticketGenInd = SYSTEMTICKET.GENTICKETMODIFIEDTICKET;
    notificationDetails.recipientUserName="molsacaseworker";
    notificationObj.createNotification(notificationDetails);
    NotificationResult notificationResult = new NotificationResult();
    notificationResult.notificationInd = Boolean.TRUE;
    return notificationResult;
  }

}
