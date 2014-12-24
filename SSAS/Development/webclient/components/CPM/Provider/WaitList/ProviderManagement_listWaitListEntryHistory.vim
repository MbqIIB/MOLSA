<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2009-2010 Curam Software Ltd.                                -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- This page allows the user to view the list of wait list entry history. -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.StaticText"
      />
    </CONNECT>
    <CONNECT>
      <SOURCE
        NAME="PAGE"
        PROPERTY="contextDescription"
      />
    </CONNECT>
  </PAGE_TITLE>


  <SERVER_INTERFACE
    CLASS="MaintainWaitList"
    NAME="DISPLAY"
    OPERATION="listHistoryForWaitListEntry"
    PHASE="DISPLAY"
  />


  <PAGE_PARAMETER NAME="waitListEntryID"/>
  <PAGE_PARAMETER NAME="contextDescription"/>


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


  <LIST>
    <DETAILS_ROW>
      <INLINE_PAGE PAGE_ID="ProviderManagement_viewWaitListEntryHistory">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="waitListEntHistID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="waitListEntryHistoryID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="waitListEntryID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="waitListEntryID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="contextDescription"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="contextDescription"
          />
        </CONNECT>
      </INLINE_PAGE>
    </DETAILS_ROW>


    <FIELD LABEL="Field.Label.WaitListEntry.DateTime">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="lastChangedDateTime"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.WaitListEntry.UpdatedBy">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="lastUpdatedBy"
        />
      </CONNECT>
      <!-- BEGIN, CR00180249, SK -->
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Organization_viewUserDetails"
      >
        <!-- END, CR00180249 -->
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="lastUpdatedBy"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="userName"
          />
        </CONNECT>
      </LINK>
    </FIELD>
    <FIELD LABEL="Field.Label.WaitListEntry.Status">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="status"
        />
      </CONNECT>
    </FIELD>
  </LIST>
</VIEW>
