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
        PROPERTY="postconditionIDParam"
      />
    </CONNECT>
  </PAGE_TITLE>


  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="modifyPostconditionTranslationBean"
    OPERATION="modifyPostconditionTranslation"
    PHASE="ACTION"
  />
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="viewPostconditionByLocaleBean"
    OPERATION="viewPostconditionByLocale"
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
  <PAGE_PARAMETER NAME="postconditionIDParam"/>
  <PAGE_PARAMETER NAME="localeParam"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="viewPostconditionByLocaleBean"
      PROPERTY="scriptID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionPageIDParam"
    />
    <TARGET
      NAME="viewPostconditionByLocaleBean"
      PROPERTY="pageID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="localeParam"
    />
    <TARGET
      NAME="viewPostconditionByLocaleBean"
      PROPERTY="postconditionDetails$locale"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="postconditionIDParam"
    />
    <TARGET
      NAME="viewPostconditionByLocaleBean"
      PROPERTY="id"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="modifyPostconditionTranslationBean"
      PROPERTY="scriptID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionPageIDParam"
    />
    <TARGET
      NAME="modifyPostconditionTranslationBean"
      PROPERTY="pageID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="postconditionIDParam"
    />
    <TARGET
      NAME="modifyPostconditionTranslationBean"
      PROPERTY="id"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="localeParam"
    />
    <TARGET
      NAME="modifyPostconditionTranslationBean"
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
    LABEL_WIDTH="25"
    TITLE="Cluster.Title.Details"
  >
    <FIELD LABEL="Field.Label.Language">
      <CONNECT>
        <SOURCE
          NAME="viewPostconditionByLocaleBean"
          PROPERTY="result$locale"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER LABEL_WIDTH="25">
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.Message"
    >
      <CONNECT>
        <SOURCE
          NAME="viewPostconditionByLocaleBean"
          PROPERTY="result$message"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="modifyPostconditionTranslationBean"
          PROPERTY="message"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
