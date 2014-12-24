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
<!-- Displays a list of a providers rates for a service offering.  -->
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
    CLASS="ProviderAccess"
    NAME="DISPLAY"
    OPERATION="viewProviderServiceRates"
  />


  <PAGE_PARAMETER NAME="serviceOfferingID"/>
  <PAGE_PARAMETER NAME="providerConcernRoleID"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="serviceOfferingID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="serviceOfferingID"
    />
  </CONNECT>
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
    <FIELD LABEL="Field.Label.StartDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="startDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.EndDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="endDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      ALIGNMENT="RIGHT"
      LABEL="Field.Label.MinimumAmount"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="minAmountString"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      ALIGNMENT="RIGHT"
      LABEL="Field.Label.MaximumAmount"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="maxAmountString"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      ALIGNMENT="RIGHT"
      LABEL="Field.Label.FixedAmount"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="fixedAmountString"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.FlatRate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="flatRateDescription"
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
  </LIST>
</VIEW>
