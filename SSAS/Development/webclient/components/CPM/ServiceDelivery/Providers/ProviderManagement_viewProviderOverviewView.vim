<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2010 Curam Software Ltd.                                     -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of       -->
<!-- Curam Software, Ltd. ("Confidential Information").  You shall not      -->
<!-- disclose such Confidential Information and shall use it only in        -->
<!-- accordance with the terms of the license agreement you entered into    -->
<!-- with Curam Software.                                                   -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- Provides an overview of a providers details.  -->
<VIEW>


  <SERVER_INTERFACE
    CLASS="ProviderAccess"
    NAME="DISPLAY"
    OPERATION="viewProviderOverview"
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
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="serviceOfferingID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$serviceOfferingID"
    />
  </CONNECT>


  <CLUSTER
    LABEL_WIDTH="35"
    NUM_COLS="3"
  >
    <!-- col 1 -->
    <FIELD LABEL="Field.Label.Phone">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="phoneNumber"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Email">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="emailAddress"
        />
      </CONNECT>
      <LINK
        URI_SOURCE_NAME="DISPLAY"
        URI_SOURCE_PROPERTY="emailAddressLink"
      />
    </FIELD>
    <FIELD LABEL="Field.Label.Web">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="websiteAddress"
        />
      </CONNECT>
      <LINK
        OPEN_NEW="true"
        URI_SOURCE_NAME="DISPLAY"
        URI_SOURCE_PROPERTY="webAddressLink"
      />
    </FIELD>
    <!-- col 2 -->
    <FIELD LABEL="Field.Label.Accreditations">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="accreditationsListString"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Licenses">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="licensesListString"
        />
      </CONNECT>
    </FIELD>
    <FIELD CONTROL="SKIP"/>
    <!-- col 3 -->
    <FIELD LABEL="Field.Label.OtherServices">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="servicesListString"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.OtherCenters">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="serviceCentersListString"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
</VIEW>
