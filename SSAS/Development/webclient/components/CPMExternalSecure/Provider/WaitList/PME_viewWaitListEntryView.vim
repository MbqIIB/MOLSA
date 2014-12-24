<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2008-2009 Curam Software Ltd.                                 -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- This is view Wait List Entry details Page                              -->
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
    <CONNECT>
      <SOURCE
        NAME="DISPLAY"
        PROPERTY="contextDescription"
      />
    </CONNECT>
  </PAGE_TITLE>


  <PAGE_PARAMETER NAME="waitListEntryID"/>


  <SERVER_INTERFACE
    CLASS="MaintainExternalProviderWaitList"
    NAME="DISPLAY"
    OPERATION="viewWaitListEntry"
    PHASE="DISPLAY"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="waitListEntryID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$waitListEntryID"
    />
  </CONNECT>


  <CLUSTER
    NUM_COLS="2"
    TITLE="Cluster.Label.Details"
  >
    <!-- BEGIN, CR00137935, RD -->
    <FIELD LABEL="Field.Label.WaitListEntry.WaitListNumber">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="position"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00137935 -->
    <FIELD LABEL="Field.Label.WaitListEntry.ClientName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="concernRoleName"
        />
      </CONNECT>


    </FIELD>


    <CONTAINER LABEL="Field.Label.WaitListEntry.Status">
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="status"
          />
        </CONNECT>
      </FIELD>


    </CONTAINER>


    <FIELD LABEL="Field.Label.WaitListEntry.Priority">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="priority"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.WaitListEntry.ExpiryDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="expiryDate"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


</VIEW>
