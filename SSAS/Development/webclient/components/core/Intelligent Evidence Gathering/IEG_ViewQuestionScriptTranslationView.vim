<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2006, 2008 Curam Software Ltd.                           -->
<!-- All rights reserved.                                                   -->
<!--                                                                        -->
<!-- This software is the confidential and proprietary information of       -->
<!-- Curam Software, Ltd. ("Confidential Information"). You                 -->
<!-- shall not disclose such Confidential Information and shall use it only -->
<!-- in accordance with the terms of the license agreement you entered into -->
<!-- with Curam Software.                                                   -->
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
    <CONNECT>
      <SOURCE
        NAME="PAGE"
        PROPERTY="questionScriptParam"
      />
    </CONNECT>
  </PAGE_TITLE>


  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="viewQuestionScriptByLocaleBean"
    OPERATION="viewQuestionScriptByLocale"
    PHASE="DISPLAY"
  />
  <PAGE_PARAMETER NAME="questionScriptIDParam"/>
  <PAGE_PARAMETER NAME="questionScriptParam"/>
  <PAGE_PARAMETER NAME="localeParam"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="viewQuestionScriptByLocaleBean"
      PROPERTY="questionScriptID$questionScriptID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="localeParam"
    />
    <TARGET
      NAME="viewQuestionScriptByLocaleBean"
      PROPERTY="questionScriptID$locale"
    />
  </CONNECT>
  <CLUSTER
    LABEL_WIDTH="25"
    TITLE="Cluster.Label.Details"
  >
    <FIELD LABEL="Field.Label.Language">
      <CONNECT>
        <SOURCE
          NAME="viewQuestionScriptByLocaleBean"
          PROPERTY="result$locale"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.Name"
      WIDTH="50"
    >
      <CONNECT>
        <SOURCE
          NAME="viewQuestionScriptByLocaleBean"
          PROPERTY="result$name"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="FALSE"
    TITLE="Cluster.Label.Description"
  >
    <FIELD HEIGHT="4">
      <CONNECT>
        <SOURCE
          NAME="viewQuestionScriptByLocaleBean"
          PROPERTY="result$description"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
