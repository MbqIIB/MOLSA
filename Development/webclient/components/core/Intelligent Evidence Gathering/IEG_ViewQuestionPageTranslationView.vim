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
        PROPERTY="questionPageParam"
      />
    </CONNECT>
  </PAGE_TITLE>


  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="viewQuestionPageByLocaleBean"
    OPERATION="viewQuestionPageByLocale"
    PHASE="DISPLAY"
  />
  <PAGE_PARAMETER NAME="questionScriptIDParam"/>
  <PAGE_PARAMETER NAME="questionPageIDParam"/>
  <PAGE_PARAMETER NAME="questionPageParam"/>
  <PAGE_PARAMETER NAME="localeParam"/>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="viewQuestionPageByLocaleBean"
      PROPERTY="questionScriptID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionPageIDParam"
    />
    <TARGET
      NAME="viewQuestionPageByLocaleBean"
      PROPERTY="questionPageID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="localeParam"
    />
    <TARGET
      NAME="viewQuestionPageByLocaleBean"
      PROPERTY="questionPageID$locale"
    />
  </CONNECT>


  <CLUSTER
    LABEL_WIDTH="30"
    TITLE="Cluster.Title.Details"
  >
    <FIELD LABEL="Field.Label.Language">
      <CONNECT>
        <SOURCE
          NAME="viewQuestionPageByLocaleBean"
          PROPERTY="result$locale"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Name">
      <CONNECT>
        <SOURCE
          NAME="viewQuestionPageByLocaleBean"
          PROPERTY="result$name"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Notes"
  >
    <FIELD HEIGHT="4">
      <CONNECT>
        <SOURCE
          NAME="viewQuestionPageByLocaleBean"
          PROPERTY="result$notes"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="30"
    TITLE="Cluster.Title.Links"
  >
    <FIELD LABEL="Field.Label.Legislation">
      <CONNECT>
        <SOURCE
          NAME="viewQuestionPageByLocaleBean"
          PROPERTY="result$legislationLink"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Policy">
      <CONNECT>
        <SOURCE
          NAME="viewQuestionPageByLocaleBean"
          PROPERTY="result$policyLinks"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
