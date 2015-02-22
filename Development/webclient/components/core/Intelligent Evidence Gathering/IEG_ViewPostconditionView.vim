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
        NAME="getPostconditionByIDBean"
        PROPERTY="result$id"
      />
    </CONNECT>
  </PAGE_TITLE>


  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="getPostconditionByIDBean"
    OPERATION="getPostconditionByID"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="listPostconditionTranslationsBean"
    OPERATION="listPostconditionTranslations"
    PHASE="DISPLAY"
  />


  <PAGE_PARAMETER NAME="questionPageIDParam"/>
  <PAGE_PARAMETER NAME="questionScriptIDParam"/>
  <PAGE_PARAMETER NAME="postconditionIDParam"/>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionPageIDParam"
    />
    <TARGET
      NAME="getPostconditionByIDBean"
      PROPERTY="postconditionDetails$pageID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="getPostconditionByIDBean"
      PROPERTY="postconditionDetails$scriptID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="postconditionIDParam"
    />
    <TARGET
      NAME="getPostconditionByIDBean"
      PROPERTY="postconditionDetails$id"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionPageIDParam"
    />
    <TARGET
      NAME="listPostconditionTranslationsBean"
      PROPERTY="postconditionDetails$pageID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="listPostconditionTranslationsBean"
      PROPERTY="postconditionDetails$scriptID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="postconditionIDParam"
    />
    <TARGET
      NAME="listPostconditionTranslationsBean"
      PROPERTY="postconditionDetails$id"
    />
  </CONNECT>


  <CLUSTER
    NUM_COLS="2"
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Actions"
  >
    <CONTAINER>
      <ACTION_CONTROL
        IMAGE="CreateTranslationIcon"
        LABEL="ActionControl.Label.CreateTranslation"
        TYPE="ACTION"
      >
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IEG_InsertPostconditionTranslation"
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
              NAME="PAGE"
              PROPERTY="questionPageIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionPageIDParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="postconditionIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="postconditionIDParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL
        LABEL="ActionControl.Label.CreateTranslation"
        TYPE="ACTION"
      >
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IEG_InsertPostconditionTranslation"
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
              NAME="PAGE"
              PROPERTY="questionPageIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionPageIDParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="postconditionIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="postconditionIDParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="20"
    TITLE="Cluster.Title.Details"
  >
    <FIELD LABEL="Field.Label.ID">
      <CONNECT>
        <SOURCE
          NAME="getPostconditionByIDBean"
          PROPERTY="result$id"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Value"
  >
    <FIELD>
      <CONNECT>
        <SOURCE
          NAME="getPostconditionByIDBean"
          PROPERTY="result$value"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Message"
  >
    <FIELD>
      <CONNECT>
        <SOURCE
          NAME="getPostconditionByIDBean"
          PROPERTY="result$message"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <LIST TITLE="List.Title.Translations">
    <CONTAINER
      LABEL="Container.Label.Action"
      SEPARATOR="Container.Separator"
      WIDTH="20"
    >
      <ACTION_CONTROL LABEL="ActionControl.Label.TranslationView">
        <LINK PAGE_ID="IEG_ViewPostconditionTranslation">
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
              NAME="PAGE"
              PROPERTY="questionPageIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionPageIDParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="listPostconditionTranslationsBean"
              PROPERTY="messageDtls$locale"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="localeParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="getPostconditionByIDBean"
              PROPERTY="result$id"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="postconditionIDParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      <ACTION_CONTROL LABEL="ActionControl.Label.TranslationEdit">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IEG_ModifyPostconditionTranslation"
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
              NAME="PAGE"
              PROPERTY="questionPageIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionPageIDParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="listPostconditionTranslationsBean"
              PROPERTY="messageDtls$locale"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="localeParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="getPostconditionByIDBean"
              PROPERTY="result$id"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="postconditionIDParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>
    <FIELD LABEL="Field.Label.Language">
      <CONNECT>
        <SOURCE
          NAME="listPostconditionTranslationsBean"
          PROPERTY="messageDtls$locale"
        />
      </CONNECT>
    </FIELD>
  </LIST>


</VIEW>
