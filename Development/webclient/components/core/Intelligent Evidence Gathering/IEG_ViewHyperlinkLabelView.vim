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
        PROPERTY="hyperlinkLabelIDParam"
      />
    </CONNECT>
  </PAGE_TITLE>


  <PAGE_PARAMETER NAME="questionScriptIDParam"/>
  <PAGE_PARAMETER NAME="questionPageIDParam"/>
  <PAGE_PARAMETER NAME="questionGroupIDParam"/>
  <PAGE_PARAMETER NAME="hyperlinkLabelIDParam"/>


  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="getHyperlinkLabelBean"
    OPERATION="getHyperlinkLabelByID"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="listHyperlinkLabelTranslationsBean"
    OPERATION="listHyperlinkLabelTranslations"
    PHASE="DISPLAY"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionGroupIDParam"
    />
    <TARGET
      NAME="getHyperlinkLabelBean"
      PROPERTY="questionGroupID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="hyperlinkLabelIDParam"
    />
    <TARGET
      NAME="getHyperlinkLabelBean"
      PROPERTY="questionGroupChildID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionGroupIDParam"
    />
    <TARGET
      NAME="listHyperlinkLabelTranslationsBean"
      PROPERTY="hyperlinkLabelByID$questionGroupID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="hyperlinkLabelIDParam"
    />
    <TARGET
      NAME="listHyperlinkLabelTranslationsBean"
      PROPERTY="hyperlinkLabelByID$questionGroupChildID"
    />
  </CONNECT>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Actions"
  >
    <CONTAINER ALIGNMENT="LEFT">
      <ACTION_CONTROL
        IMAGE="CreateTranslationIcon"
        LABEL="ActionControl.Label.CreateTranslation"
        TYPE="ACTION"
      >
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IEG_InsertHyperlinkLabelTranslation"
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
              PROPERTY="questionGroupIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionGroupIDParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="hyperlinkLabelIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="hyperlinkLabelIDParam"
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
          PAGE_ID="IEG_InsertHyperlinkLabelTranslation"
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
              PROPERTY="questionGroupIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionGroupIDParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="hyperlinkLabelIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="hyperlinkLabelIDParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="20"
    TITLE="Cluster.Title.HyperlinkLabelDetails"
    WIDTH="80"
  >
    <FIELD LABEL="Field.Label.HyperlinkLabelID">
      <CONNECT>
        <SOURCE
          NAME="getHyperlinkLabelBean"
          PROPERTY="id"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.Hyperlink">
      <CONNECT>
        <SOURCE
          NAME="getHyperlinkLabelBean"
          PROPERTY="hyperlink"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.URL"
      WIDTH="80"
    >
      <CONNECT>
        <SOURCE
          NAME="getHyperlinkLabelBean"
          PROPERTY="url"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Text"
    WIDTH="80"
  >
    <FIELD HEIGHT="8">
      <CONNECT>
        <SOURCE
          NAME="getHyperlinkLabelBean"
          PROPERTY="text"
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
        <LINK PAGE_ID="IEG_ViewHyperlinkLabelTranslation">
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
              PROPERTY="questionGroupIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionGroupIDParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="hyperlinkLabelIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="hyperlinkLabelIDParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="listHyperlinkLabelTranslationsBean"
              PROPERTY="questionGroupChildByIDDtls$locale"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="localeParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      <ACTION_CONTROL LABEL="ActionControl.Label.TranslationEdit">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IEG_ModifyHyperlinkLabelTranslation"
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
              PROPERTY="questionGroupIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="questionGroupIDParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="hyperlinkLabelIDParam"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="hyperlinkLabelIDParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="listHyperlinkLabelTranslationsBean"
              PROPERTY="questionGroupChildByIDDtls$locale"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="localeParam"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="getHyperlinkLabelBean"
              PROPERTY="url"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="hyperlinkLabelURLParam"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>
    <FIELD LABEL="Field.Label.Language">
      <CONNECT>
        <SOURCE
          NAME="listHyperlinkLabelTranslationsBean"
          PROPERTY="questionGroupChildByIDDtls$locale"
        />
      </CONNECT>
    </FIELD>
  </LIST>


</VIEW>
