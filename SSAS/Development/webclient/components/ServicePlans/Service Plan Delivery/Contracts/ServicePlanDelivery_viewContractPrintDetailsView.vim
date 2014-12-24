<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2005-2006, 2008 Curam Software Ltd.                                 -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- This page displays contract print details to the user                  -->
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
        PROPERTY="description"
      />
    </CONNECT>
  </PAGE_TITLE>


  <SERVER_INTERFACE
    CLASS="ServicePlanDelivery"
    NAME="DISPLAY"
    OPERATION="listContractPrintHistory"
  />


  <PAGE_PARAMETER NAME="servicePlanContractID"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="servicePlanContractID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="servPlanContractKey$servicePlanContractID"
    />
  </CONNECT>


  <LIST TITLE="List.Title.Details">


    <FIELD LABEL="Field.Label.PrintedBy">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="requestedByFullName"
        />
      </CONNECT>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Organization_viewUserDetails"
        WINDOW_OPTIONS="width=800,height=300"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="requestedBy"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="userName"
          />
        </CONNECT>
      </LINK>
    </FIELD>


    <FIELD LABEL="Field.Label.PrintedDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="printDate"
        />
      </CONNECT>
    </FIELD>


  </LIST>


</VIEW>
