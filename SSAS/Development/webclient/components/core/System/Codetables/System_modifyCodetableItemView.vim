<?xml version="1.0" encoding="UTF-8"?>
<!-- Licensed Materials - Property of IBM Copyright IBM Corporation 2012. All Rights Reserved. US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp. -->
<!-- Copyright (c) 2003-2005, 2010 Curam Software Ltd.                      -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<VIEW
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
    CLASS="System"
    NAME="ACTION"
    OPERATION="modifyCodeTableItem"
    PHASE="ACTION"
  />
  <SERVER_INTERFACE
    CLASS="System"
    NAME="DISPLAY"
    OPERATION="readCodeTableItem"
  />
  <PAGE_PARAMETER NAME="codetableName"/>
  <PAGE_PARAMETER NAME="code"/>
  <PAGE_PARAMETER NAME="languageCode"/>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="codetableName"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$name"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="code"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$code"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="code"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="oldCode"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="result$code"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="code"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="languageCode"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="oldLanguageCode"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="languageCode"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$languageCode"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="codetableName"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="name"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="result$versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="versionNo"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="annotation"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="annotation"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="isEnabled"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="isEnabled"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="result$languageCode"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="languageCode"
    />
  </CONNECT>
  <CLUSTER LABEL_WIDTH="40">
    <FIELD LABEL="Field.Label.Description">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="description"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="description"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.SortOrder"
      WIDTH="40"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$sortOrder"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="sortOrder"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
</VIEW>
