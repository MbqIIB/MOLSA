<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2008, 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2008-2011 Curam Software Ltd.                                    -->
<!-- All rights reserved.                                                       -->
<!-- This software is the confidential and proprietary information of Curam     -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose        -->
<!-- such Confidential Information and shall use it only in accordance with     -->
<!-- the terms of the license agreement you entered into with Curam             -->
<!-- Software.                                                                  -->
<!-- Description                                                                -->
<!-- ===========                                                                -->
<!-- This page allows the user to create a contact log for a incident.          -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.Title"
      />
    </CONNECT>
  </PAGE_TITLE>


  <!-- BEGIN, CR00321084, GA -->
  <SERVER_INTERFACE
    CLASS="MaintainProviderIncident"
    NAME="ACTION"
    OPERATION="createIncidentContactLog"
    PHASE="ACTION"
  />
  <!-- END, CR00321084 -->


  <!-- BEGIN, CR00146937, SK -->
  <SERVER_INTERFACE
    CLASS="ContactLog"
    NAME="DISPLAYPURPOSE"
    OPERATION="listPurpose"
    PHASE="DISPLAY"
  />
  <!-- END, CR00146937 -->


  <PAGE_PARAMETER NAME="incidentID"/>
  <PAGE_PARAMETER NAME="pageDescription"/>
  <PAGE_PARAMETER NAME="concernRoleID"/>


  <SERVER_INTERFACE
    CLASS="MaintainProviderIncident"
    NAME="DISPLAY"
    OPERATION="listActiveProviderMember"
    PHASE="DISPLAY"
  />
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="concernRoleID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$concernRoleID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="incidentID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="linkID"
    />
  </CONNECT>


  <!-- BEGIN, CR00234213, PS -->
  <CLUSTER
    LABEL_WIDTH="40"
    NUM_COLS="2"
  >


    <!-- BEGIN, CR00146937, SK -->
    <!-- BEGIN, CR00137377, SK  -->
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.Purpose"
    >
      <!-- END, CR00234213 -->
      <!-- END, CR00137377  -->
      <CONNECT>
        <INITIAL
          HIDDEN_PROPERTY="purposeCode"
          NAME="DISPLAYPURPOSE"
          PROPERTY="purposeName"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="purpose"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00234213, PS -->
    <FIELD
      LABEL="Field.Label.Location"
      WIDTH="60"
    >
      <!-- END, CR00234213 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="location"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00234213, PS -->
    <FIELD LABEL="Field.Label.StartDate">
      <!-- END, CR00234213 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="startDateTime"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00234213, PS  -->
    <FIELD
      LABEL="Field.Label.Type"
      WIDTH="60"
    >
      <!-- END, CR00234213 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="contactLogType"
        />
      </CONNECT>
    </FIELD>


    <FIELD CONTROL="SKIP"/>


    <!-- BEGIN, CR00197352, SS -->
    <FIELD
      LABEL="Field.Label.LocationDescription"
      WIDTH="60"
    >
      <!-- END, CR00197352 -->


      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="locationDescription"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00146937 -->


    <!-- BEGIN, CR00234213, PS -->
    <FIELD LABEL="Field.Label.EndDate">
      <!-- END, CR00234213 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="endDateTime"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00234213, PS  -->
    <FIELD
      LABEL="Field.Label.Method"
      WIDTH="60"
    >
      <!-- END, CR00234213  -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="method"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <CLUSTER
    NUM_COLS="1"
    SHOW_LABELS="true"
    STYLE="cluster-cpr-no-internal-padding"
    TITLE="Cluster.Label.ContactDetails"
  >
    <!-- BEGIN, CR00197352, SS -->
    <CLUSTER
      DESCRIPTION="Cluster.Description.ProviderMember"
      LABEL_WIDTH="40"
      NUM_COLS="2"
      SHOW_LABELS="true"
      STYLE="cluster-cpr-no-border"
    >
      <!-- BEGIN, CR00234213, PS -->
      <CONTAINER LABEL="Field.Label.ProviderMember">
        <!-- END, CR00234213 -->
        <!-- END, CR00197352 -->
        <FIELD USE_BLANK="true">
          <CONNECT>
            <INITIAL
              HIDDEN_PROPERTY="details$concernRoleID"
              NAME="DISPLAY"
              PROPERTY="providerMemberName"
            />
          </CONNECT>
          <CONNECT>
            <TARGET
              NAME="ACTION"
              PROPERTY="providerMemberConcernRoleID"
            />
          </CONNECT>
        </FIELD>
      </CONTAINER>
      <FIELD CONTROL="SKIP"/>
    </CLUSTER>
    <CLUSTER
      DESCRIPTION="Cluster.Description.RegisteredParticipant"
      LABEL_WIDTH="25"
      NUM_COLS="1"
      SHOW_LABELS="true"
      STYLE="cluster-cpr-no-border"
    >


      <!-- BEGIN, CR00197352, SS -->
      <CONTAINER LABEL="Field.Label.Participant">
        <FIELD WIDTH="30">
          <!-- END, CR00197352 -->
          <CONNECT>
            <TARGET
              NAME="ACTION"
              PROPERTY="concernRoleType"
            />
          </CONNECT>
        </FIELD>
        <!-- BEGIN, CR00197352, SS -->
        <FIELD WIDTH="40">
          <!-- END, CR00197352 -->
          <CONNECT>
            <TARGET
              NAME="ACTION"
              PROPERTY="attendeeDetails$concernRoleID"
            />
          </CONNECT>
        </FIELD>


      </CONTAINER>
    </CLUSTER>


    <!-- BEGIN, CR00197352, SS -->
    <CLUSTER
      DESCRIPTION="Cluster.Description.UnRegisteredParticipant"
      LABEL_WIDTH="30"
      NUM_COLS="2"
      SHOW_LABELS="true"
      STYLE="cluster-cpr-no-border"
    >
      <FIELD
        LABEL="Field.Label.ParticipantName"
        WIDTH="60"
      >
        <!-- END, CR00197352 -->
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="newConcernRoleName"
          />
        </CONNECT>
      </FIELD>


      <FIELD CONTROL="SKIP"/>


    </CLUSTER>


    <!-- BEGIN, CR00197352, SS -->
    <CLUSTER
      DESCRIPTION="Cluster.Description.User"
      LABEL_WIDTH="30"
      NUM_COLS="2"
      SHOW_LABELS="true"
      STYLE="cluster-cpr-no-border"
    >
      <FIELD
        HEIGHT="1"
        LABEL="Field.Label.User"
        WIDTH="70"
      >
        <!-- END, CR00197352 -->
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="attendeeDetails$userName"
          />
        </CONNECT>
      </FIELD>
      <FIELD CONTROL="SKIP"/>
    </CLUSTER>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="30"
    NUM_COLS="1"
    SHOW_LABELS="false"
    TITLE="Cluster.Label.NarrativeDetails"
  >


    <!-- BEGIN, CR00197352, SS -->
    <FIELD HEIGHT="4">
      <!-- END, CR00197352 -->


      <CONNECT>
        <!-- BEGIN, CR00146937, SK -->
        <TARGET
          NAME="ACTION"
          PROPERTY="notesText"
        />
        <!-- END, CR00146937 -->
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <!-- BEGIN, CR00197352, SS -->
  <CLUSTER
    LABEL_WIDTH="37"
    NUM_COLS="2"
    TITLE="Cluster.Label.AttachmentDetails"
  >
    <!-- END, CR00197352 -->


    <WIDGET
      LABEL="Field.Label.File"
      TYPE="FILE_UPLOAD"
    >
      <WIDGET_PARAMETER NAME="CONTENT">
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="attachmentContents"
          />
        </CONNECT>
      </WIDGET_PARAMETER>


      <WIDGET_PARAMETER NAME="FILE_NAME">
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="attachmentName"
          />
        </CONNECT>
      </WIDGET_PARAMETER>


    </WIDGET>


    <!-- BEGIN, CR00197352, SS -->
    <FIELD
      LABEL="Field.Label.FileLocation"
      WIDTH="60"
    >
      <!-- END, CR00197352 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="fileLocation"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00197352, SS -->
    <FIELD
      LABEL="Field.Label.DocumentType"
      WIDTH="63"
    >
      <!-- END, CR00197352 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="documentType"
        />
      </CONNECT>
    </FIELD>
    <FIELD CONTROL="SKIP"/>
    <!-- BEGIN, CR00197352, SS -->
    <FIELD
      LABEL="Field.Label.FileReference"
      WIDTH="60"
    >
      <!-- END, CR00197352 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="fileReference"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ReceiptDate">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="receiptDate"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="15"
    NUM_COLS="1"
    TITLE="Cluster.Label.AttachmentDescriptionDetails"
  >


    <!-- BEGIN, CR00197352, SS -->
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.AttachmentDescription"
    >
      <!-- END, CR00197352 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="attachmentDetails$attachmentLinkDtls$description"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


</VIEW>
