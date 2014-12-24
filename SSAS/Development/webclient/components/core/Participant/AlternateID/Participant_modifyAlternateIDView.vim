<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  PID 5725-H26
  
  Copyright IBM Corporation 2002, 2013. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2002, 2010 Curam Software Ltd.                           -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- The included view for the modify alternate ID pages. -->
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
    CLASS="Participant"
    NAME="DISPLAY"
    OPERATION="readAlternateID"
  />


  <SERVER_INTERFACE
    CLASS="Participant"
    NAME="ACTION"
    OPERATION="modifyAlternateID"
    PHASE="ACTION"
  />


  <PAGE_PARAMETER NAME="concernRoleAlternateID"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="concernRoleAlternateID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="readConcernRoleAltIDKey$concernRoleAlternateID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="concernRoleAlternateID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="concernRoleAlternateID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="versionNo"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="concernRoleID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="concernRoleID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="statusCode"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="statusCode"
    />
  </CONNECT>


  <INFORMATIONAL>
    <CONNECT>
      <SOURCE
        NAME="ACTION"
        PROPERTY="result$warnings$dtls$msg"
      />
    </CONNECT>
  </INFORMATIONAL>


  <CLUSTER LABEL_WIDTH="30">
    <FIELD
      LABEL="Field.Label.AlternateID"
      WIDTH="55"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="alternateID"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="alternateID"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Type">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="typeCode"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="typeCode"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.FromDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="startDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="startDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ToDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="endDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="endDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Primary">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="primaryAlternateInd"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="primaryAlternateInd"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Comments"
  >
    <!-- BEGIN, CR00406866, VT -->
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.Comments"
    >
      <!-- END, CR00406866 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="comments"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="comments"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
