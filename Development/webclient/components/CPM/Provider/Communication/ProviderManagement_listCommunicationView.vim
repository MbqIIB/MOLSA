<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2010-2011 Curam Software Ltd.                                -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- The included view for a list of provider communications.              -->
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


  <!-- BEGIN, CR00236433, AK -->
  <SERVER_INTERFACE
    CLASS="Participant"
    NAME="DISPLAY"
    OPERATION="listCommunication"
    PHASE="DISPLAY"
  />
  <!-- END, CR00236433 -->


  <PAGE_PARAMETER NAME="concernRoleID"/>


  <MENU>
    <ACTION_CONTROL LABEL="ActionControl.Label.NewTask">


      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Participant_createTask"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="description"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="pageDescription"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="concernRoleID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="participantID"
          />
        </CONNECT>
      </LINK>


    </ACTION_CONTROL>
    <ACTION_CONTROL LABEL="ActionControl.Label.NewActivity">
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Activity_createStandardUserActivity"
      />
    </ACTION_CONTROL>
  </MENU>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="concernRoleID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="participantCommKey$concernRoleID"
    />
  </CONNECT>


  <!-- BEGIN, CR00236707, PS -->
  <ACTION_SET BOTTOM="false">
    <ACTION_CONTROL
      IMAGE="RecordCommunication"
      LABEL="ActionControl.Label.RecordCommunication"
    >
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Participant_getRecordCommCorrespondent"
      >
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="concernRoleID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="concernRoleID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
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
      IMAGE="CreateEmail"
      LABEL="ActionControl.Label.EmailCommunication"
    >
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Participant_getEmailCorrespondent"
      >
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="concernRoleID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="concernRoleID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
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
      IMAGE="CreateProforma"
      LABEL="ActionControl.Label.ProFormaCommunication"
    >
      <!-- BEGIN, CR00246368, PS -->
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Participant_getProFormaCorrespondent"
      >
        <!-- END, CR00246368 -->
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="concernRoleID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="concernRoleID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
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
      IMAGE="CreateMSWord"
      LABEL="ActionControl.Label.MSWordCommunication"
    >
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Participant_getMSWordCorrespondent"
      >
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="concernRoleID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="concernRoleID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
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
  <!-- END, CR00236707 -->


  <CLUSTER
    SHOW_LABELS="false"
    STYLE="tab-renderer"
  >


    <CONDITION>
      <IS_TRUE
        NAME="DISPLAY"
        PROPERTY="statusInd"
      />
    </CONDITION>


    <FIELD>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="data"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00291621, MR -->
  </CLUSTER>


  <!-- END, CR00291621 -->
  <LIST>


    <ACTION_SET TYPE="LIST_ROW_MENU">
      <ACTION_CONTROL LABEL="ActionControl.Label.Edit">


        <!-- BEGIN, CR00291621, MR -->
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="Participant_resolveModifyCommunicationForConcernOnly1"
        >


          <!-- END, CR00291621 -->
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="communicationID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="communicationID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="correspondentConcernRoleID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="correspondentConcernRoleID"
            />
          </CONNECT>
          <CONNECT>
            <!-- BEGIN, CR00236433, AK -->
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$communicationDtls$concernRoleID"
            />
            <!-- END, CR00236433 -->
            <TARGET
              NAME="PAGE"
              PROPERTY="concernRoleID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="communicationStatus"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="status"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="description"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="pageDescription"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="communicationFormat"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="communicationFormat"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <!-- BEGIN, CR00291621, MR -->
      <ACTION_CONTROL LABEL="ActionControl.Label.SendNow">
        <CONDITION>
          <IS_TRUE
            NAME="DISPLAY"
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
              NAME="DISPLAY"
              PROPERTY="communicationID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="communicationID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="subjectText"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="subject"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
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
        LABEL="ActionControl.Label.OpenMSWord"
        TYPE="FILE_DOWNLOAD"
      >
        <CONDITION>
          <IS_TRUE
            NAME="DISPLAY"
            PROPERTY="msWordInd"
          />
        </CONDITION>
        <LINK>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="communicationID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="communicationID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <!-- END, CR00291621 -->


      <ACTION_CONTROL
        LABEL="ActionControl.PreviewButton.label"
        TYPE="FILE_DOWNLOAD"
      >


        <!-- BEGIN, CR00291621, MR -->
        <CONDITION>
          <IS_TRUE
            NAME="DISPLAY"
            PROPERTY="proFormaInd"
          />
        </CONDITION>


        <!-- END, CR00291621 -->
        <LINK>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="communicationID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="communicationID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <!-- BEGIN, CR00291621, MR -->
      <ACTION_CONTROL LABEL="ActionControl.DeleteButton.label">
        <CONDITION>
          <IS_FALSE
            NAME="DISPLAY"
            PROPERTY="draftEmailInd"
          />
        </CONDITION>
        <LINK
          OPEN_MODAL="true"
          SAVE_LINK="true"
          URI_SOURCE_NAME="DISPLAY"
          URI_SOURCE_PROPERTY="deletePageName"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="communicationID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="communicationID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="correspondentConcernRoleID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="correspondentConcernRoleID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="versionNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="versionNo"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="subjectText"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="subject"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="description"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="pageDescription"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL LABEL="ActionControl.DeleteButton.label">
        <CONDITION>
          <IS_TRUE
            NAME="DISPLAY"
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
              NAME="DISPLAY"
              PROPERTY="communicationID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="communicationID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="correspondentConcernRoleID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="correspondentConcernRoleID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="versionNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="versionNo"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="subjectText"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="subject"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="description"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="pageDescription"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <!-- END, CR00291621 -->
    </ACTION_SET>


    <FIELD LABEL="Field.Label.Subject">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="subjectText"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Type">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="communicationFormat"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Name">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="correspondentName"
        />
      </CONNECT>
      <LINK PAGE_ID="Participant_resolveRoleHome">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="correspondentConcernRoleID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="concernRoleID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
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
      LABEL="Field.Label.CommStatus"
      WIDTH="20"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="communicationStatus"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Date">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="communicationDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.Status">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="statusCode"
        />
      </CONNECT>
    </FIELD>


    <DETAILS_ROW>
      <INLINE_PAGE PAGE_ID="ProviderManagement_resolveViewCommunication">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="communicationID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="communicationID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="correspondentConcernRoleID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="correspondentConcernRoleID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="description"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="pageDescription"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="communicationStatus"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="status"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="communicationFormat"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="communicationFormat"
          />
        </CONNECT>
      </INLINE_PAGE>
    </DETAILS_ROW>


  </LIST>


</VIEW>
