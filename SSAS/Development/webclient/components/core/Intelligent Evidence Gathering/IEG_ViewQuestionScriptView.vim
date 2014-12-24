<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2006, 2008, 2010 Curam Software Ltd.                     -->
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
        NAME="getQuestionScriptBean"
        PROPERTY="name"
      />
    </CONNECT>
  </PAGE_TITLE>


  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="getQuestionScriptBean"
    OPERATION="getQuestionScriptByID"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="listQuestionScriptTranslationsBean"
    OPERATION="listQuestionScriptTranslations"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="listRDOsByScriptIDBean"
    OPERATION="listRDOsByScriptID"
    PHASE="DISPLAY"
  />


  <PAGE_PARAMETER NAME="questionScriptIDParam"/>
  <PAGE_PARAMETER NAME="questionScriptParam"/>


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
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="listQuestionScriptTranslationsBean"
      PROPERTY="questionScriptByID$questionScriptID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="listRDOsByScriptIDBean"
      PROPERTY="questionScriptID"
    />
  </CONNECT>


  <CLUSTER
    NUM_COLS="2"
    SHOW_LABELS="false"
    TITLE="Cluster.Label.Actions"
  >
    <CONTAINER>
      <ACTION_CONTROL
        IMAGE="CreatePageIcon"
        LABEL="ActionControl.Label.CreatePage"
        TYPE="ACTION"
      >
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IEG_InsertQuestionPage"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL
        LABEL="ActionControl.Label.CreatePage"
        TYPE="ACTION"
      >
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IEG_InsertQuestionPage"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>


    <CONTAINER>
      <ACTION_CONTROL
        IMAGE="CreateScriptTranslationIcon"
        LABEL="ActionControl.Label.CreateScriptTranslation"
        TYPE="ACTION"
      >
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IEG_InsertQuestionScriptTranslation"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="getQuestionScriptBean"
              PROPERTY="name"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL
        LABEL="ActionControl.Label.CreateScriptTranslation"
        TYPE="ACTION"
      >
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IEG_InsertQuestionScriptTranslation"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="getQuestionScriptBean"
              PROPERTY="name"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>


    <CONTAINER>
      <ACTION_CONTROL
        IMAGE="AddRDOIcon"
        LABEL="ActionControl.Label.AddRDO"
        TYPE="ACTION"
      >
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IEG_AddRDOToScript"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL
        LABEL="ActionControl.Label.AddRDO"
        TYPE="ACTION"
      >
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IEG_AddRDOToScript"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>


    <CONTAINER>
      <ACTION_CONTROL
        IMAGE="AddSubScriptIcon"
        LABEL="ActionControl.Label.AddSubScript"
        TYPE="ACTION"
      >
        <LINK PAGE_ID="IEG_ListQuestionSubScripts">
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL
        LABEL="ActionControl.Label.AddSubScript"
        TYPE="ACTION"
      >
        <LINK PAGE_ID="IEG_ListQuestionSubScripts">
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="20"
    TITLE="Cluster.Title.QuestionScriptDetails"
  >
    <FIELD LABEL="Field.Label.ScriptID">
      <CONNECT>
        <SOURCE
          NAME="getQuestionScriptBean"
          PROPERTY="id"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Name">
      <CONNECT>
        <SOURCE
          NAME="getQuestionScriptBean"
          PROPERTY="name"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Description"
  >
    <FIELD>
      <CONNECT>
        <SOURCE
          NAME="getQuestionScriptBean"
          PROPERTY="description"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <LIST TITLE="List.Title.Translations">
    <CONTAINER
      LABEL="Container.Label.Action"
      SEPARATOR="Container.Separator"
      WIDTH="15"
    >
      <ACTION_CONTROL LABEL="ActionControl.Label.TranslationView">
        <LINK PAGE_ID="IEG_ViewQuestionScriptTranslation">
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="listQuestionScriptTranslationsBean"
              PROPERTY="result$questionScriptByIDDtls$locale"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="localeParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="getQuestionScriptBean"
              PROPERTY="name"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      <ACTION_CONTROL LABEL="ActionControl.Label.TranslationEdit">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IEG_ModifyQuestionScriptTranslation"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="listQuestionScriptTranslationsBean"
              PROPERTY="result$questionScriptByIDDtls$locale"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="localeParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="getQuestionScriptBean"
              PROPERTY="name"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>
    <FIELD LABEL="Field.Label.Language">
      <CONNECT>
        <SOURCE
          NAME="listQuestionScriptTranslationsBean"
          PROPERTY="result$questionScriptByIDDtls$locale"
        />
      </CONNECT>
    </FIELD>
  </LIST>


  <LIST TITLE="List.Title.RDOs">
    <CONTAINER
      LABEL="Container.Label.Action"
      SEPARATOR="Container.Separator"
      WIDTH="15"
    >
      <ACTION_CONTROL LABEL="ActionControl.Label.Remove">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IEG_RemoveRDO"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionScriptIDParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="listRDOsByScriptIDBean"
              PROPERTY="name"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="rdoParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>
    <FIELD LABEL="Field.Label.RDOName">
      <CONNECT>
        <SOURCE
          NAME="listRDOsByScriptIDBean"
          PROPERTY="displayName"
        />
      </CONNECT>
    </FIELD>
  </LIST>


</VIEW>
