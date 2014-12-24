<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright  2008-2011 Curam Software Ltd.                               -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- This page allows the user to view the wait list entry details.         -->
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


  <!-- BEGIN, CR00236379, SK -->
  <SERVER_INTERFACE
    CLASS="MaintainWaitList"
    NAME="DISPLAY"
    OPERATION="viewWaitListEntryDetails"
    PHASE="DISPLAY"
  />
  <!-- END, CR00236379 -->


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


  <!-- BEGIN, CR00206896, SS -->
  <!-- BEGIN, CR00156341, RPB -->
  <CLUSTER
    LABEL_WIDTH="35"
    NUM_COLS="1"
  >
    <FIELD
      LABEL="Field.Label.WaitListEntry.RemovalReason"
      WIDTH="60"
    >
      <!-- END, CR00206896 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="removalReason"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.WaitListEntry.Comments"
  >


    <!-- BEGIN, CR00206896, SS -->
    <FIELD HEIGHT="4">
      <!-- END, CR00206896 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="comments"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>
  <!-- END, CR00156341 -->


</VIEW>
