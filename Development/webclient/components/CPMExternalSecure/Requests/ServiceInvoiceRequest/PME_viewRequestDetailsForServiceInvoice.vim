<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2002 Curam Software Ltd.                                 -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- This page allows the user to view address details for a Participant -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <CLUSTER
    NUM_COLS="2"
    TITLE="Cluster.Title.RequestDetails"
  >
    <FIELD LABEL="Field.Label.CreatedBy">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="createdBy"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.DateCreated">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="dateCreated"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.RejectionReason">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="rejectionReason"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.RequestStatus">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="requestStatus"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.DateSubmitted">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="dateSubmitted"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


</VIEW>
