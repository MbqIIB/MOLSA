<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2010-2011 Curam Software Ltd.                                         -->
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
    CLASS="MaintainSearchableTextTranslation"
    NAME="DISPLAY"
    OPERATION="viewLocalizableText"
  />
  <PAGE_PARAMETER NAME="localizableTextID"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="localizableTextID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="localizableTextTranslationDetails$localizableTextID"
    />
  </CONNECT>


  <!-- BEGIN, CR00247984, PS -->
  <LIST SCROLL_HEIGHT="125">
    <!-- END, CR00247984 -->
    <FIELD
      LABEL="Field.Title.Language"
      WIDTH="20"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="dtls$localeCode"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Title.Text">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="dtls$text"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00206671, SS -->
    <ACTION_SET TYPE="LIST_ROW_MENU">
      <ACTION_CONTROL LABEL="ActionControl.Label.Edit">
        <LINK
          DISMISS_MODAL="false"
          PAGE_ID="ProviderManagement_modifyLocalizableTextTranslation"
          SAVE_LINK="false"
          WINDOW_OPTIONS="width=350"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="dtls$textTranslationID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="textTranslationID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="localizableTextID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="localizableTextID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </ACTION_SET>
    <!-- END, CR00206671 -->
  </LIST>
</VIEW>
