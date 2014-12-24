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
  </PAGE_TITLE>

  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="listRDOsByScriptIDBean"
    OPERATION="listRDOsByScriptID"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="MaintainIEG"
    NAME="listDataItemsBean"
    OPERATION="listDataItemsForRDO"
    PHASE="ACTION"
  />


  <PAGE_PARAMETER NAME="questionScriptIDParam"/>
  <PAGE_PARAMETER NAME="questionPageIDParam"/>
  <PAGE_PARAMETER NAME="includeCurrentPage"/>
  <PAGE_PARAMETER NAME="isLoopsizeExpression"/>

  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="questionScriptIDParam"
    />
    <TARGET
      NAME="listRDOsByScriptIDBean"
      PROPERTY="questionScriptID"
    />
  </CONNECT>


  <CLUSTER
    LABEL_WIDTH="30"
    TITLE="Cluster.Title.SearchCriteria"
  >
   <FIELD LABEL="Field.Label.RDO">
      <CONNECT>
        <INITIAL
          HIDDEN_PROPERTY="result$rdoDtls$name"
          NAME="listRDOsByScriptIDBean"
          PROPERTY="result$rdoDtls$displayName"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="listDataItemsBean"
          PROPERTY="listDataItemsByRDONameKey$name"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <LIST TITLE="List.Title.SearchResults">
    <CONTAINER
      LABEL="Field.Title.Name"
      WIDTH="40"
    >
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="listDataItemsBean"
            PROPERTY="dataItemDtls$name"
          />
        </CONNECT>
      </FIELD>
      <ACTION_CONTROL
        LABEL="ActionControl.Label.Copy"
        TYPE="CLIPBOARD"
      >
        <CONNECT>
          <SOURCE
            NAME="listDataItemsBean"
            PROPERTY="qualifiedName"
          />
        </CONNECT>
      </ACTION_CONTROL>
    </CONTAINER>
    <FIELD
      LABEL="Field.Title.ItemDescription"
      WIDTH="30"
    >
      <CONNECT>
        <SOURCE
          NAME="listDataItemsBean"
          PROPERTY="type"
        />
      </CONNECT>
    </FIELD>
  </LIST>



</VIEW>