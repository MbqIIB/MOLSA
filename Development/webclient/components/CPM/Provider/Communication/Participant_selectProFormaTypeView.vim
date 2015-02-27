<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007-2011 Curam Software Ltd.                                -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- The included view for the create template communication.               -->
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
    CLASS="ProviderNotification"
    NAME="ACTION"
    OPERATION="listTemplateByTypeAndProviderParticipant"
    PHASE="ACTION"
  />


  <PAGE_PARAMETER NAME="pageDescription"/>
  <PAGE_PARAMETER NAME="concernRoleID"/>
  <PAGE_PARAMETER NAME="caseID"/>
  <PAGE_PARAMETER NAME="correspondentParticipantRoleID"/>
  <PAGE_PARAMETER NAME="correspondentName"/>
  <PAGE_PARAMETER NAME="correspondentParticipantRoleType"/>
  <PAGE_PARAMETER NAME="caseParticipantRoleID"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="concernRoleID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="participantRoleID"
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


  <!-- BEGIN, CR00236707, PS -->
  <CLUSTER
    LABEL_WIDTH="25"
    NUM_COLS="2"
    TITLE="Cluster.Title.CommunicationType"
  >
    <!-- END, CR00236707 -->


    <ACTION_SET
      ALIGNMENT="CENTER"
      TOP="false"
    >
      <ACTION_CONTROL
        DEFAULT="true"
        IMAGE="SearchButton"
        LABEL="ActionControl.Label.Search"
        TYPE="SUBMIT"
      >
        <LINK PAGE_ID="THIS"/>
      </ACTION_CONTROL>
      <!-- BEGIN, CR00236707, PS -->
      <ACTION_CONTROL LABEL="ActionControl.Label.Reset">
        <LINK
          PAGE_ID="Participant_selectProFormaType"
          SAVE_LINK="false"
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
              NAME="PAGE"
              PROPERTY="correspondentParticipantRoleID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="correspondentParticipantRoleID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="correspondentParticipantRoleType"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="correspondentParticipantRoleType"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="correspondentName"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="correspondentName"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <!-- END, CR00236707 -->
    </ACTION_SET>


    <FIELD LABEL="Field.Label.Type">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="templateType"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <!-- BEGIN, CR00236707, PS -->
  <!-- BEGIN, CR00246026, AK -->
  <LIST
    SCROLL_HEIGHT="310"
    TITLE="List.Title.ProformaTypes"
  >
    <!-- END, CR00246026 -->


    <!-- BEGIN, CR00248594, VR -->
    <CONTAINER
      LABEL="Container.Label.Action"
      WIDTH="15"
    >
      <!-- END, CR00248594 -->
      <ACTION_CONTROL LABEL="ActionControl.Label.Select">
        <!-- BEGIN, CR00246026, AK -->
        <LINK
          DISMISS_MODAL="false"
          PAGE_ID="Participant_createProFormaCommunication1"
          SAVE_LINK="false"
        >
          <!-- END, CR00246026 -->
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="templateID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="proFormaID"
            />
          </CONNECT>
          <!-- BEGIN, CR00147372, SK -->
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="localeIdentifier"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="localeIdentifier"
            />
          </CONNECT>
          <!-- END, CR00147372 -->
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="templateType"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="communicationType"
            />
          </CONNECT>
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
              NAME="PAGE"
              PROPERTY="caseID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="caseID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="correspondentParticipantRoleID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="correspondentParticipantRoleID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="correspondentParticipantRoleType"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="correspondentParticipantRoleType"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="pageDescription"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="pageDescription"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="correspondentName"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="correspondentName"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="templateName"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="templateName"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="ACTION"
              PROPERTY="latestVersion"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="proFormaVersionNo"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="caseParticipantRoleID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="caseParticipantRoleID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>


    <FIELD
      LABEL="Field.Label.ProFormaName"
      WIDTH="60"
    >
      <CONNECT>
        <SOURCE
          NAME="ACTION"
          PROPERTY="templateName"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00147372, SK -->
    <!-- BEGIN, CR00248594, VR -->
    <FIELD
      LABEL="Field.Label.Locale"
      WIDTH="25"
    >
      <!-- END, CR00248594 -->
      <CONNECT>
        <SOURCE
          NAME="ACTION"
          PROPERTY="result$searchTemplatesByConcernAndTypeResult$xslTemplateDetailsListOut$dtls$localeIdentifier"
        />


      </CONNECT>
    </FIELD>
    <!-- END, CR00147372 -->
    <!-- END, CR00236707 -->


  </LIST>


</VIEW>
