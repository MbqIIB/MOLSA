<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  PID 5725-H26
  
  Copyright IBM Corporation 2007, 2013. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2007 Curam Software Ltd.                                                 -->
<!-- All rights reserved.                                                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose        -->
<!-- such Confidential Information and shall use it only in accordance with   -->
<!-- the terms of the license agreement you entered into with Curam           -->
<!-- Software.                                                                                                  -->
<!-- Description -->
<!-- =========== -->
<!-- The included view for the modify org unit resolution approval pages.     -->
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
    CLASS="Organization"
    NAME="DISPLAY"
    OPERATION="readResolutionApprovalCheckForOrgUnit"
  />


  <SERVER_INTERFACE
    CLASS="Organization"
    NAME="ACTION"
    OPERATION="modifyResolutionApprovalCheckForOrgUnit"
    PHASE="ACTION"
  />


  <PAGE_PARAMETER NAME="issueResolutionApprovalCheckID"/>
  <PAGE_PARAMETER NAME="description"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="issueResolutionApprovalCheckID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$issueResolutionApprovalCheckID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="issueResolutionApprovalCheckID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="issueResolutionApprovalCheckID"
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
      PROPERTY="organisationUnitID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="organisationUnitID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="issueConfigurationID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="issueConfigurationID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="recordStatus"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="recordStatus"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="typeCode"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="typeCode"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="applyToAllIssueTypes"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="applyToAllIssueTypes"
    />
  </CONNECT>


  <CLUSTER LABEL_WIDTH="30">
    <!-- BEGIN, CR00052256, ANK -->
    <FIELD
      LABEL="Field.Label.Percentage"
      WIDTH="4"
      WIDTH_UNITS="CHARS"
    >
      <!-- END, CR00052256 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="percentage"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="percentage"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.IssueType">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="type"
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
