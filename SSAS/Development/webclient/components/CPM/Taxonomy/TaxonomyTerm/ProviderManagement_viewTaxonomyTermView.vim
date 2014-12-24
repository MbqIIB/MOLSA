<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  PID 5725-H26
  
  Copyright IBM Corporation 2010, 2014. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2010 Curam Software Ltd.                                      -->
<!-- All rights reserved.                                                    -->
<!-- This software is the confidential and proprietary information of Curam  -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose     -->
<!-- such Confidential Information and shall use it only in accordance with  -->
<!-- in accordance with the terms of the license agreement you entered into  -->
<!-- Software.                                                               -->
<!-- Description -->
<!-- =========== -->
<!-- This page allows the user to view the taxonomy term details.            -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <SERVER_INTERFACE
    CLASS="MaintainTaxonomyTerm"
    NAME="DISPLAY"
    OPERATION="viewTaxonomyTerm"
    PHASE="DISPLAY"
  />


  <INFORMATIONAL>
    <CONNECT>
      <SOURCE
        NAME="DISPLAY"
        PROPERTY="informationMsgTxt"
      />
    </CONNECT>
  </INFORMATIONAL>


  <PAGE_PARAMETER NAME="taxonomyTermID"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="taxonomyTermID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="taxonomyTermKey$taxonomyTermID"
    />
  </CONNECT>


  <CLUSTER
    LABEL_WIDTH="30"
    NUM_COLS="2"
  >
    <CONDITION>
      <IS_TRUE
        NAME="DISPLAY"
        PROPERTY="hasParentInd"
      />
    </CONDITION>
    <CONTAINER LABEL="Field.Label.TermName">
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="name"
          />
        </CONNECT>
      </FIELD>
      <ACTION_CONTROL
        IMAGE="LocalizableTextTranslation"
        LABEL="ActionControl.Label.TextTranslation"
      >
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_viewLocalizableTextTranslation"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="nameTextID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="localizableTextID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>


    <FIELD LABEL="Field.Label.OldCode">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="oldCode"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.Code">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="code"
        />
      </CONNECT>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="ProviderManagement_listAssociatedTerms"
        WINDOW_OPTIONS="width=800"
      >
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="taxonomyTermID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="taxonomyTermID"
          />
        </CONNECT>
      </LINK>
    </FIELD>


    <FIELD LABEL="Field.Label.CustomTerm">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="dtls$customTermInd"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="30"
    NUM_COLS="2"
  >
    <CONDITION>
      <IS_FALSE
        NAME="DISPLAY"
        PROPERTY="hasParentInd"
      />
    </CONDITION>
    <CONTAINER LABEL="Field.Label.TermName">
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="name"
          />
        </CONNECT>
      </FIELD>
      <ACTION_CONTROL
        IMAGE="LocalizableTextTranslation"
        LABEL="ActionControl.Label.TextTranslation"
      >
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_viewLocalizableTextTranslation"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="nameTextID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="localizableTextID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>


    <FIELD LABEL="Field.Label.OldCode">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="oldCode"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.Code">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="code"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.CustomTerm">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="dtls$customTermInd"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Definition"
  >
    <CONTAINER>
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="definition"
          />
        </CONNECT>
      </FIELD>
      <ACTION_CONTROL
        IMAGE="LocalizableTextTranslation"
        LABEL="ActionControl.Label.TextTranslation"
      >
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_viewLocalizableTextTranslation"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="definitionTextID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="localizableTextID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>
  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.BibliographicRef"
  >
    <CONTAINER>
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="bibliographicRef"
          />
        </CONNECT>
      </FIELD>
      <ACTION_CONTROL
        IMAGE="LocalizableTextTranslation"
        LABEL="ActionControl.Label.TextTranslation"
      >
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_viewLocalizableTextTranslation"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="bibliographicRefTextID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="localizableTextID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>
  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Comments"
  >
    <CONTAINER>
      <!-- BEGIN, CR00417165, GK -->
      <FIELD LABEL="Field.Label.Comments">
        <!-- END, CR00417165 -->
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="comments"
          />
        </CONNECT>
      </FIELD>
      <ACTION_CONTROL
        IMAGE="LocalizableTextTranslation"
        LABEL="ActionControl.Label.TextTranslation"
      >
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_viewLocalizableTextTranslation"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="commentsTextID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="localizableTextID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>
  </CLUSTER>


</VIEW>
