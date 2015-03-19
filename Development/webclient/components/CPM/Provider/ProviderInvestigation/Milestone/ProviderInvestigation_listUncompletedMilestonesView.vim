<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2008, 2010 Curam Software Ltd.                                     -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- This page provides a user with a list of all milestones                -->
<!-- created at the product delivery level with a status of                 -->
<!-- In Progress or Not Started.                                            -->
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
    <CONNECT>
      <SOURCE
        NAME="DISPLAY"
        PROPERTY="dtlsList$description$description"
      />
    </CONNECT>
  </PAGE_TITLE>


  <PAGE_PARAMETER NAME="caseID"/>


  <SERVER_INTERFACE
    CLASS="ProviderInvestigation"
    NAME="DISPLAY"
    OPERATION="listInvestigationUncompletedMilestone"
  />


  <MENU>
    <ACTION_CONTROL LABEL="ActionControl.Label.NewTask">
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="IntegratedCase_createTask"
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
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="dtlsList$description$description"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="pageDescription"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>
    <ACTION_CONTROL LABEL="ActionControl.Label.NewActivity">
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="IntegratedCase_createActivity"
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
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="dtlsList$description$description"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="pageDescription"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>
  </MENU>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="caseID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="caseID"
    />
  </CONNECT>


  <LIST>
    <CONTAINER
      LABEL="Container.Label.Action"
      SEPARATOR="Container.Separator"
      WIDTH="10"
    >
      <ACTION_CONTROL LABEL="ActionControl.Label.View">
        <LINK PAGE_ID="ProductDelivery_viewMilestone">
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="milestoneDeliveryID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="milestoneDeliveryID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="dtlsList$description$description"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="description"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL LABEL="ActionControl.Label.Edit">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProductDelivery_modifyMilestoneFromList"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="milestoneDeliveryID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="milestoneDeliveryID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="dtlsList$description$description"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="description"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>


    <FIELD
      LABEL="Field.Label.Name"
      WIDTH="20"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="name"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.Type">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="type"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.ExpectedStartDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="expectedStartDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.ExpectedEndDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="expectedEndDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.ActualStartDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="actualStartDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.ActualEndDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="actualEndDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.Status">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="status"
        />
      </CONNECT>
    </FIELD>


  </LIST>
</VIEW>
