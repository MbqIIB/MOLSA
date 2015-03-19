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
        PROPERTY="hyperlinkLabelURLParam"
      />
    </CONNECT>
  </PAGE_TITLE>


  <PAGE_PARAMETER NAME="questionScriptIDParam"/>
  <PAGE_PARAMETER NAME="questionPageIDParam"/>
  <PAGE_PARAMETER NAME="questionGroupIDParam"/>
  <PAGE_PARAMETER NAME="hyperlinkLabelIDParam"/>
  <PAGE_PARAMETER NAME="hyperlinkLabelURLParam"/>
  <PAGE_PARAMETER NAME="localeParam"/>


  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="viewHyperlinkLabelByLocaleBean"
    OPERATION="viewHyperlinkLabelByLocale"
    PHASE="DISPLAY"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionGroupIDParam"
    />
    <TARGET
      NAME="viewHyperlinkLabelByLocaleBean"
      PROPERTY="questionGroupID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="hyperlinkLabelIDParam"
    />
    <TARGET
      NAME="viewHyperlinkLabelByLocaleBean"
      PROPERTY="questionGroupChildID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="localeParam"
    />
    <TARGET
      NAME="viewHyperlinkLabelByLocaleBean"
      PROPERTY="hyperlinkLabelByID$locale"
    />
  </CONNECT>


  <CLUSTER
    LABEL_WIDTH="20"
    TITLE="Cluster.Title.HyperlinkLabelDetails"
    WIDTH="80"
  >
    <FIELD LABEL="Field.Label.Language">
      <CONNECT>
        <SOURCE
          NAME="viewHyperlinkLabelByLocaleBean"
          PROPERTY="result$locale"
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
          NAME="viewHyperlinkLabelByLocaleBean"
          PROPERTY="text"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
