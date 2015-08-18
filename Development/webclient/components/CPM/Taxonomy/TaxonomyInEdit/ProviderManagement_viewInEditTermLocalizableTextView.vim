<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2010 Curam Software Ltd.                                                             -->
<!-- All rights reserved.                                                                                          -->
<!-- This software is the confidential and proprietary information of Curam         -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose                -->
<!-- such Confidential Information and shall use it only in accordance with           -->
<!-- the terms of the license agreement you entered into with Curam                  -->
<!-- Software.                                                                                                         -->
<!--This page is a generic page to view the list of text translations to a               -->
<!-- localized text.                                                                                                  -->
<VIEW
  POPUP_PAGE="true"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.StaticText1"
      />
    </CONNECT>
  </PAGE_TITLE>
  <SERVER_INTERFACE
    CLASS="MaintainTaxonomyTranslation"
    NAME="DISPLAY"
    OPERATION="listTaxonomyTranslations"
  />


  <PAGE_PARAMETER NAME="taxonomyInEditDataID"/>
  <PAGE_PARAMETER NAME="translationType"/>
  <PAGE_PARAMETER NAME="originalText"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="taxonomyInEditDataID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="inEditTaxonomyTranslationDetails$taxonomyInEditDataID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="translationType"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="inEditTaxonomyTranslationDetails$translationType"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="originalText"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="inEditTaxonomyTranslationDetails$originalText"
    />
  </CONNECT>


  <LIST TITLE="List.Title.Translations">
    <FIELD
      LABEL="Field.Title.Language"
      WIDTH="20"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="details$localCode"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Title.Text">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="details$translationText"
        />
      </CONNECT>
    </FIELD>


    <ACTION_SET TYPE="LIST_ROW_MENU">
      <ACTION_CONTROL LABEL="ActionControl.Label.Edit">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_modifyLocalizableTermTranslation"
          WINDOW_OPTIONS="width=350"
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
              NAME="PAGE"
              PROPERTY="translationType"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="translationType"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="details$localCode"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="localCode"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="details$translationText"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="translationText"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="details$originalText"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="originalText"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </ACTION_SET>


  </LIST>
</VIEW>
