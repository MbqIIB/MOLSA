<?xml version="1.0" encoding="UTF-8"?>
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.StaticText1"
      />
    </CONNECT>
  </PAGE_TITLE>


  <SERVER_INTERFACE
    CLASS="IntegratedCase"
    NAME="ACTION"
    OPERATION="listFilteredCommunication"
    PHASE="ACTION"
  />


  <PAGE_PARAMETER NAME="caseID"/>
  <PAGE_PARAMETER NAME="concernRoleID"/>
  <PAGE_PARAMETER NAME="name"/>


  <SERVER_INTERFACE
    CLASS="IntegratedCase"
    NAME="DISPLAY_CASEMEMBERS"
    OPERATION="listActiveCaseMembersForCommunicationsFilter"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="caseID"
    />
    <TARGET
      NAME="DISPLAY_CASEMEMBERS"
      PROPERTY="caseID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="caseID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="key$caseID"
    />
  </CONNECT>


  <ACTION_SET BOTTOM="false">
    <ACTION_CONTROL
      IMAGE="RecordCommunication"
      LABEL="ActionControl.Label.RecordCommunication"
    >
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Case_getRecordCommCorrespondent"
      >
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>


    <ACTION_CONTROL
      IMAGE="CreateEmail"
      LABEL="ActionControl.Label.EmailCommunication"
    >
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Case_getEmailCorrespondent"
      >
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>



    <ACTION_CONTROL
      IMAGE="CreateProforma"
      LABEL="ActionControl.Label.CreateProforma"
    >


      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Case_getProFormaCorrespondent"
      >
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>


 
    <ACTION_CONTROL
      IMAGE="CreateMSWord"
      LABEL="ActionControl.Label.CreateMSWord"
    >

      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Case_getMSWordCorrespondentCaseMember"
      >
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>
    <ACTION_CONTROL
      LABEL="ActionControl.Label.NewSMS"
      >
      
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="MOLSA_selectParticipantForSMS"
        >
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>
  </ACTION_SET>


  <LIST>


    <DETAILS_ROW>


      <INLINE_PAGE PAGE_ID="MOLSAParticipant_resolveViewCommunication1">
        <CONNECT>
          <SOURCE
            NAME="ACTION"
            PROPERTY="communicationID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="communicationID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="ACTION"
            PROPERTY="correspondentConcernRoleID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="correspondentConcernRoleID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="ACTION"
            PROPERTY="communicationStatus"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="status"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="ACTION"
            PROPERTY="communicationFormat"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="communicationFormat"
          />
        </CONNECT>
      </INLINE_PAGE>


    </DETAILS_ROW>


    <ACTION_SET TYPE="LIST_ROW_MENU">


      <ACTION_CONTROL LABEL="ActionControl.Label.Edit">


        <LINK
          OPEN_MODAL="true"
          PAGE_ID="Participant_resolveModifyCommunicationForConcernOnly1"
        >
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="communicationID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="communicationID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="correspondentConcernRoleID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="correspondentConcernRoleID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="result$communicationDtls$concernRoleID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="concernRoleID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="communicationStatus"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="status"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="communicationFormat"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="communicationFormat"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="description"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="pageDescription"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL LABEL="ActionControl.Label.SendNow">
        <CONDITION>
          <IS_TRUE
            NAME="ACTION"
            PROPERTY="draftEmailInd"
          />
        </CONDITION>
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="Participant_sendEmail"
          SAVE_LINK="true"
        >
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="communicationID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="communicationID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="subjectText"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="subject"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="description"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="pageDescription"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL
        LABEL="ActionControl.Label.OpenAttachment"
        TYPE="FILE_DOWNLOAD"
      >
        <CONDITION>
          <IS_TRUE
            NAME="ACTION"
            PROPERTY="msWordInd"
          />
        </CONDITION>
 
        <LINK>
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="communicationID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="communicationID"
            />
          </CONNECT>
        </LINK>
        
      </ACTION_CONTROL>
      <ACTION_CONTROL
        LABEL="ActionControl.Label.Preview"
        TYPE="FILE_DOWNLOAD"
      >
        <CONDITION>
          <IS_TRUE
            NAME="ACTION"
            PROPERTY="proFormaInd"
          />
        </CONDITION>
        <LINK>
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="communicationID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="communicationID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL
        IMAGE="DeleteButton"
        LABEL="ActionControl.Label.Delete"
      >
        <LINK
          OPEN_MODAL="true"
          SAVE_LINK="true"
          URI_SOURCE_NAME="ACTION"
          URI_SOURCE_PROPERTY="deletePageName"
        >
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="communicationID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="communicationID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="correspondentConcernRoleID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="correspondentConcernRoleID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="versionNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="versionNo"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="subjectText"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="subject"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="description"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="pageDescription"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL
        IMAGE="DeleteButton"
        LABEL="ActionControl.Label.Delete"
      >
        <CONDITION>
          <IS_TRUE
            NAME="ACTION"
            PROPERTY="draftEmailInd"
          />
        </CONDITION>


       
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="Participant_deleteDraftEmailCommunication1"
          SAVE_LINK="true"
        >


          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="communicationID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="communicationID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="correspondentConcernRoleID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="correspondentConcernRoleID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="versionNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="versionNo"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="subjectText"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="subject"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="description"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="pageDescription"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


    </ACTION_SET>


    <FIELD
      LABEL="Field.Label.Subject"
      WIDTH="21"
    >
      <CONNECT>
        <SOURCE
          NAME="ACTION"
          PROPERTY="subjectText"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.Type"
      WIDTH="12"
    >
      <CONNECT>
        <SOURCE
          NAME="ACTION"
          PROPERTY="communicationFormat"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.Name"
      WIDTH="21"
    >
      <CONNECT>
        <SOURCE
          NAME="ACTION"
          PROPERTY="correspondentName"
        />
      </CONNECT>
      <LINK PAGE_ID="Participant_resolveRoleHome">
        <CONNECT>
          <SOURCE
            NAME="ACTION"
            PROPERTY="correspondentConcernRoleID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="concernRoleID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="ACTION"
            PROPERTY="correspondentConcernRoleType"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="participantType"
          />
        </CONNECT>
      </LINK>
    </FIELD>
    <FIELD
      LABEL="Field.Label.CommunicationStatus"
      WIDTH="21"
    >
      <CONNECT>
        <SOURCE
          NAME="ACTION"
          PROPERTY="communicationStatus"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.Date"
      WIDTH="13"
    >
      <CONNECT>
        <SOURCE
          NAME="ACTION"
          PROPERTY="communicationDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.Status"
      WIDTH="12"
    >
      <CONNECT>
        <SOURCE
          NAME="ACTION"
          PROPERTY="statusCode"
        />
      </CONNECT>
    </FIELD>
  </LIST>
</VIEW>
