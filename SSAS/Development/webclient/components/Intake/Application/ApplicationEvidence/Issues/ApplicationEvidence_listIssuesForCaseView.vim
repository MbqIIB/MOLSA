<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2010-2011 Curam Software Ltd.                            -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- List issues related to a case.                                         -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="Page.Title"
      />
    </CONNECT>
  </PAGE_TITLE>
  <SERVER_INTERFACE
    CLASS="ApplicationEvidence"
    NAME="DISPLAY"
    OPERATION="listIssuesForCase"
    PHASE="DISPLAY"
  />
  <PAGE_PARAMETER NAME="applicationID"/>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="applicationID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="applicationID"
    />
  </CONNECT>
  <LIST PAGINATED="false">
    <FIELD
      LABEL="Field.label.EvidenceType"
      WIDTH="30"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="evidenceType"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.label.Subject"
      WIDTH="70"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="subject"
        />
      </CONNECT>
    </FIELD>
  </LIST>
</VIEW>
