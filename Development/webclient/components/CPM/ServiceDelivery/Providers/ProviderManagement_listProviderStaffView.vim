<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2010 Curam Software Ltd.                            -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- Lists staff members for a Provider.                               -->
<VIEW>
  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.StaticText1"
      />
    </CONNECT>
  </PAGE_TITLE>


  <SERVER_INTERFACE
    CLASS="ProviderAccess"
    NAME="DISPLAY"
    OPERATION="listProviderStaff"
    PHASE="DISPLAY"
  />


  <PAGE_PARAMETER NAME="serviceOfferingID"/>
  <PAGE_PARAMETER NAME="providerConcernRoleID"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="providerConcernRoleID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="providerKey$providerConcernRoleID"
    />
  </CONNECT>


  <LIST>
    <ACTION_SET TYPE="LIST_ROW_MENU">
      <ACTION_CONTROL LABEL="ActionControl.Label.ViewBackgroundChecks">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_listBackgroundChecksForProviderMember"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="providerMemberID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="providerPartyID"
            />
          </CONNECT>
        </LINK>
        <CONDITION>
          <IS_TRUE
            NAME="DISPLAY"
            PROPERTY="backgroundChecksExistInd"
          />
        </CONDITION>
      </ACTION_CONTROL>
    </ACTION_SET>
    <FIELD
      LABEL="Field.Label.Name"
      WIDTH="30"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="memberName"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.FromDate"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="fromDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.ToDate"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="toDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.Role"
      WIDTH="25"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="role"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.BackgroundChecks"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="backgroundChecksExistInd"
        />
      </CONNECT>
    </FIELD>
  </LIST>
</VIEW>
