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
<!-- This page allows the user to view the in edit taxonomy term details.    -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <INFORMATIONAL>
    <CONNECT>
      <SOURCE
        NAME="DISPLAY"
        PROPERTY="informationMsgTxt"
      />
    </CONNECT>
  </INFORMATIONAL>


  <SERVER_INTERFACE
    CLASS="MaintainTaxonomyInEditData"
    NAME="DISPLAY"
    OPERATION="viewInEditTaxonomyTerm"
    PHASE="DISPLAY"
  />


  <PAGE_PARAMETER NAME="taxonomyInEditDataID"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="taxonomyInEditDataID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="taxonomyInEditKey$taxonomyInEditDataID"
    />
  </CONNECT>


  <CLUSTER
    LABEL_WIDTH="30"
    NUM_COLS="2"
  >
    <CONDITION>
      <IS_FALSE
        NAME="DISPLAY"
        PROPERTY="recordNotFoundExceptionInd"
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
          PAGE_ID="ProviderManagement_viewInEditTermTextTranslation"
          WINDOW_OPTIONS="width=600"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="taxonomyInEditDataID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="taxonomyInEditDataID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="termNameTranslationType"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="translationType"
            />
          </CONNECT>


          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="name"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="originalText"
            />
          </CONNECT>


        </LINK>
      </ACTION_CONTROL>


    </CONTAINER>


    <FIELD LABEL="Field.Label.OldCode">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="oldCodes"
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
          PROPERTY="customTermInd"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Definition"
  >
    <CONDITION>
      <IS_FALSE
        NAME="DISPLAY"
        PROPERTY="recordNotFoundExceptionInd"
      />
    </CONDITION>
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
          PAGE_ID="ProviderManagement_viewInEditTermTextTranslation"
          WINDOW_OPTIONS="width=600"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="taxonomyInEditDataID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="taxonomyInEditDataID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="definitionTranslationType"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="translationType"
            />
          </CONNECT>


          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="definition"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="originalText"
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
    <CONDITION>
      <IS_FALSE
        NAME="DISPLAY"
        PROPERTY="recordNotFoundExceptionInd"
      />
    </CONDITION>
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
          PAGE_ID="ProviderManagement_viewInEditTermTextTranslation"
          WINDOW_OPTIONS="width=600"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="taxonomyInEditDataID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="taxonomyInEditDataID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="bibliograhicRefTranslationType"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="translationType"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="bibliographicRef"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="originalText"
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
    <CONDITION>
      <IS_FALSE
        NAME="DISPLAY"
        PROPERTY="recordNotFoundExceptionInd"
      />
    </CONDITION>
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
          PAGE_ID="ProviderManagement_viewInEditTermTextTranslation"
          WINDOW_OPTIONS="width=600"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="taxonomyInEditDataID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="taxonomyInEditDataID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="commentsTranslationType"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="translationType"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="comments"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="originalText"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


    </CONTAINER>
  </CLUSTER>


</VIEW>
