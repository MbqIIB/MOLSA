<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2007-2008 Curam Software Ltd.                             -->
<!-- All rights reserved.                                                    -->
<!-- This software is the confidential and proprietary information of Curam  -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose     -->
<!-- such Confidential Information and shall use it only in accordance with  -->
<!-- in accordance with the terms of the license agreement you entered into  -->
<!-- Software.                                                               -->
<!-- Description                                                             -->
<!-- =======================================                                 -->
<!-- This page allows the user to delete  the service offering               -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.StaticText"
      />
    </CONNECT>
    <CONNECT>
      <SOURCE
        NAME="PAGE"
        PROPERTY="name"
      />
    </CONNECT>
  </PAGE_TITLE>
  <SERVER_INTERFACE
    CLASS="ServiceOffering"
    NAME="ACTION"
    OPERATION="deleteServiceGroup"
    PHASE="ACTION"
  />
  <PAGE_PARAMETER NAME="serviceGroupID"/>
  <PAGE_PARAMETER NAME="name"/>
  <PAGE_PARAMETER NAME="versionNo"/>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="serviceGroupID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="serviceGroupKey$serviceGroupKey$serviceGroupKey$serviceGroupID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="versionNo"
    />
  </CONNECT>
  <CLUSTER
    SHOW_LABELS="false"
    STYLE="outer-cluster-borderless"
  >
    <FIELD LABEL="Field.Label.CancelServiceGroup">
      <CONNECT>
        <SOURCE
          NAME="TEXT"
          PROPERTY="Field.Label.CancelServiceGroup"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
</VIEW>
