<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2008-2010, 2012 Curam Software Ltd.                             -->
<!-- All rights reserved.                                                       -->
<!-- This software is the confidential and proprietary information of Curam     -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose        -->
<!-- such Confidential Information and shall use it only in accordance with     -->
<!-- the terms of the license agreement you entered into with Curam             -->
<!-- Software.                                                                  -->
<!-- Description                                                                -->
<!-- ===========                                                                -->
<!-- The included view to modify a contact log details.                         -->
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


  <SERVER_INTERFACE
    CLASS="ContactLog"
    NAME="DISPLAY"
    OPERATION="readContactLogForModify"
    PHASE="DISPLAY"
  />


  <SERVER_INTERFACE
    CLASS="Case"
    NAME="ACTION"
    OPERATION="modifyContactLog"
    PHASE="ACTION"
  />


  <!-- BEGIN, CR00305740, PB -->
  <SERVER_INTERFACE
    CLASS="IntegratedCase"
    NAME="DISPLAYCASEPARTICIPANT"
    OPERATION="listCaseParticipantsDetailsForContactLog"
  />
  <!-- END, CR00305740 -->


  <SERVER_INTERFACE
    CLASS="Case"
    NAME="DISPLAYCONCERNCASEPARTICIPANT"
    OPERATION="listContactLogConcernCaseParticipant"
  />
  <!-- BEGIN, CR00140531, CL -->
  <SERVER_INTERFACE
    CLASS="ContactLog"
    NAME="DISPLAYPURPOSE"
    OPERATION="listPurpose"
  />
  <!-- END, CR00140531 -->


  <PAGE_PARAMETER NAME="caseID"/>
  <PAGE_PARAMETER NAME="contactLogID"/>
  <PAGE_PARAMETER NAME="description"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="contactLogID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$contactLogID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="caseID"
    />
    <TARGET
      NAME="DISPLAYCASEPARTICIPANT"
      PROPERTY="listMemberDetailsKey$caseID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="caseID"
    />
    <TARGET
      NAME="DISPLAYCONCERNCASEPARTICIPANT"
      PROPERTY="key$caseID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="contactLogID"
    />
    <TARGET
      NAME="DISPLAYCONCERNCASEPARTICIPANT"
      PROPERTY="key$contactLogID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="caseID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="caseID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="contactLogDetails$contactLogID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="contactLogID"
    />
  </CONNECT>
  <!--BEGIN, CR00140531, CL-->
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="createdDateTime"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="createdDateTime"
    />
  </CONNECT>
  <!--END, CR00140531 -->
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="createdBy"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="createdBy"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="contactLogDetails$recordStatus"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="recordStatus"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="addendumInd"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="addendumInd"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="contactLogDetails$versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="versionNo"
    />
  </CONNECT>


  <CLUSTER
    LABEL_WIDTH="35"
    NUM_COLS="2"
  >


    <!-- BEGIN, CR00140531, CL -->
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.Purpose"
      USE_BLANK="false"
    >
      <CONNECT>
        <INITIAL
          HIDDEN_PROPERTY="purposeCode"
          NAME="DISPLAYPURPOSE"
          PROPERTY="purposeName"
        />
      </CONNECT>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="purpose"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="purpose"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.Location">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="location"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="location"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00140531 -->


    <FIELD LABEL="Field.Label.StartDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="startDateTime"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="startDateTime"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.Type">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="contactLogType"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="contactLogType"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.ConcernCaseParticipant"
      USE_BLANK="true"
    >
      <CONNECT>
        <INITIAL
          HIDDEN_PROPERTY="caseParticipantRoleID"
          NAME="DISPLAYCASEPARTICIPANT"
          PROPERTY="name"
        />
      </CONNECT>
      <CONNECT>
        <SOURCE
          NAME="DISPLAYCONCERNCASEPARTICIPANT"
          PROPERTY="caseParticipantTabList"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="concernCaseParticipantTabList"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00140531, CL -->
    <FIELD LABEL="Field.Label.Author">
      <CONNECT>
        <INITIAL
          NAME="DISPLAY"
          PROPERTY="authorFullName"
        />
      </CONNECT>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="author"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="author"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.LocationDescription">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="locationDescription"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="locationDescription"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00140531 -->


    <FIELD LABEL="Field.Label.EndDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="endDateTime"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="endDateTime"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.Method">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="method"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="method"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="30"
    NUM_COLS="1"
    SHOW_LABELS="false"
    TITLE="Cluster.Label.NarrativeDetails"
  >


    <FIELD>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="noteDetails$notesText"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


</VIEW>
