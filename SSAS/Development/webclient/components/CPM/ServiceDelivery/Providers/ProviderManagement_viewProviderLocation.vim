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
    OPERATION="viewProviderMap"
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


  <CLUSTER SHOW_LABELS="false">
    <FIELD>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerMapXML"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
</VIEW>
