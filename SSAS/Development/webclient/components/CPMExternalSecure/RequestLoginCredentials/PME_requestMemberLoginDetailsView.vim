<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007, 2010-2011 Curam Software Ltd.                          -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- This page allows the user to request for member login credentials.     -->
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
    CLASS="ExternalUser"
    NAME="DISPLAY"
    OPERATION="listAllActiveProviderMembers"
  />


  <SERVER_INTERFACE
    CLASS="ExternalUser"
    NAME="ACTION"
    OPERATION="createMemberExternalUser"
    PHASE="ACTION"
  />


  <!-- BEGIN, CR00229430, GP -->
  <CLUSTER
    LABEL_WIDTH="45"
    NUM_COLS="1"
  >
    <!-- END, CR00246655 -->
    <FIELD
      LABEL="Field.Label.ProviderMember"
      USE_BLANK="TRUE"
    >
      <CONNECT>
        <INITIAL
          HIDDEN_PROPERTY="concernRoleID"
          NAME="DISPLAY"
          PROPERTY="name"
        />
      </CONNECT>


      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="concernRoleID"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Username">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="username"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
