<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2006, 2008 Curam Software Ltd.                           -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- The included View for IEG_DeleteHyperlinkLabel                         -->
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
  <PAGE_PARAMETER NAME="questionGroupIDParam"/>
  <PAGE_PARAMETER NAME="hyperlinkLabelIDParam"/>
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="deleteHyperlinkLabelBean"
    OPERATION="deleteHyperlinkLabelByID"
    PHASE="ACTION"
  />
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="hyperlinkLabelIDParam"
    />
    <TARGET
      NAME="deleteHyperlinkLabelBean"
      PROPERTY="questionGroupChildByID$questionGroupChildID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionGroupIDParam"
    />
    <TARGET
      NAME="deleteHyperlinkLabelBean"
      PROPERTY="questionGroupChildByID$questionGroupID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="deleteHyperlinkLabelBean"
      PROPERTY="questionGroupChildByID$scriptId"
    />
  </CONNECT>
  <CLUSTER
    SHOW_LABELS="false"
    STYLE="outer-cluster-borderless"
  >
    <FIELD>
      <CONNECT>
        <SOURCE
          NAME="TEXT"
          PROPERTY="Delete.Text"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
</VIEW>
