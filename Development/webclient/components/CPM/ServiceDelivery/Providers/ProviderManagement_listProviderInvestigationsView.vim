<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2010 Curam Software Ltd.                                 -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- Lists investigations for a  provider.            -->
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
    CLASS="ProviderInvestigation"
    NAME="DISPLAY"
    OPERATION="listProviderInvestigations"
  />


  <PAGE_PARAMETER NAME="providerConcernRoleID"/>
  <PAGE_PARAMETER NAME="serviceOfferingID"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="providerConcernRoleID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$providerConcernRoleID"
    />
  </CONNECT>


  <LIST>
    <FIELD
      LABEL="Field.Label.Reference"
      WIDTH="20"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="caseReference"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.Type"
      WIDTH="20"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="type"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.PrimaryClient"
      WIDTH="30"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="concernRoleName"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.StartDate"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="startDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.Status"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="status"
        />
      </CONNECT>
    </FIELD>
  </LIST>
</VIEW>
