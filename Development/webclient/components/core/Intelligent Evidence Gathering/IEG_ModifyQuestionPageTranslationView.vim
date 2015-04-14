<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2006-2008 Curam Software Ltd.                            -->
<!-- All rights reserved.                                                   -->
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
    NAME="modifyQuestionPageTranslationBean"
    OPERATION="modifyQuestionPageTranslation"
    PHASE="ACTION"
  />
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="viewQuestionPageByLocaleBean"
    OPERATION="viewQuestionPageByLocale"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="getQuestionScriptBean"
    OPERATION="getQuestionScriptByID"
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
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="modifyQuestionPageTranslationBean"
      PROPERTY="scriptID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionPageIDParam"
    />
    <TARGET
      NAME="modifyQuestionPageTranslationBean"
      PROPERTY="id"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="localeParam"
    />
    <TARGET
      NAME="modifyQuestionPageTranslationBean"
      PROPERTY="locale"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="getQuestionScriptBean"
      PROPERTY="questionScriptID$questionScriptID"
    />
  </CONNECT>


  <!-- Only display this cluster if there are dependant scriptRelationships -->
  <JSP_SCRIPTLET>
  <![CDATA[
    curam.omega3.texthelper.TextHelper th =
      (curam.omega3.texthelper.TextHelper)pageContext.findAttribute("getQuestionScriptBean");
    String scriptRelationships = th.getFieldValue("result$scriptRelationships");
    
    if (scriptRelationships.length() > 0) {
  ]]>
  </JSP_SCRIPTLET>
  <CLUSTER SHOW_LABELS="false">
    <FIELD>
      <CONNECT>
        <SOURCE
          NAME="getQuestionScriptBean"
          PROPERTY="scriptRelationships"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <JSP_SCRIPTLET>
  <![CDATA[
    }
  ]]>
  </JSP_SCRIPTLET>


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
      <CONNECT>
        <TARGET
          NAME="modifyQuestionPageTranslationBean"
          PROPERTY="questionPageDetails$name"
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
      <CONNECT>
        <TARGET
          NAME="modifyQuestionPageTranslationBean"
          PROPERTY="questionPageDetails$notes"
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
      <CONNECT>
        <TARGET
          NAME="modifyQuestionPageTranslationBean"
          PROPERTY="questionPageDetails$legislationLink"
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
      <CONNECT>
        <TARGET
          NAME="modifyQuestionPageTranslationBean"
          PROPERTY="questionPageDetails$policyLinks"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
