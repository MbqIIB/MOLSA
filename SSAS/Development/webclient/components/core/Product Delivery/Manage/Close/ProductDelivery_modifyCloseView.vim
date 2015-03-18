<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2003-2010 Curam Software Ltd.                            -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- Included view used to modify closure details for a product delivery.   -->
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
    CLASS="ProductDelivery"
    NAME="DISPLAY"
    OPERATION="readClosureDetails"
  />


  <SERVER_INTERFACE
    CLASS="ProductDelivery"
    NAME="ACTION"
    OPERATION="modifyClosureDetails"
    PHASE="ACTION"
  />


  <!-- BEGIN CR00075431, PN-->
  <ACTION_SET ALIGNMENT="CENTER">


    <CONDITION>
      <IS_TRUE
        NAME="DISPLAY"
        PROPERTY="closureDetailsFlag"
      />
    </CONDITION>
    <ACTION_CONTROL
      IMAGE="SaveButton"
      LABEL="ActionControl.Label.Save"
      TYPE="SUBMIT"
    />
    <ACTION_CONTROL
      IMAGE="CancelButton"
      LABEL="ActionControl.Label.Cancel"
    />


  </ACTION_SET>
  <!-- END CR00075431-->


  <PAGE_PARAMETER NAME="caseID"/>
  <PAGE_PARAMETER NAME="pageDescription"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="caseID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="caseID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="caseID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="caseID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="versionNo"
    />
  </CONNECT>
  <!--BEGIN CR00075431, PN-->
  <CLUSTER
    SHOW_LABELS="false"
    STYLE="outer-cluster-borderless"
  >
    <CONDITION>
      <IS_FALSE
        NAME="DISPLAY"
        PROPERTY="closureDetailsFlag"
      />
    </CONDITION>
    <FIELD>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="closureDetailsMsg"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>
  <!--END CR00075431-->


  <CLUSTER
    LABEL_WIDTH="35"
    NUM_COLS="1"
    TITLE="Cluster.Title.Details"
  >
    <!-- BEGIN CR00075431, PN-->
    <CONDITION>
      <IS_TRUE
        NAME="DISPLAY"
        PROPERTY="closureDetailsFlag"
      />
    </CONDITION>
    <!-- END CR00075431-->
    <FIELD LABEL="Field.Label.ClosureDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="closureDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="closureDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Reason">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="reasonCode"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="reasonCode"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Comments"
  >
    <!-- BEGIN CR00075431,PN-->
    <CONDITION>
      <IS_TRUE
        NAME="DISPLAY"
        PROPERTY="closureDetailsFlag"
      />
    </CONDITION>
    <!-- END CR00075431-->
    <!-- BEGIN, CR00050298, MR -->
    <!-- BEGIN, HARP 64908, SP -->
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.Comments"
    >
      <!-- END, HARP 64908 -->
      <!-- END, CR00050298 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="comments"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="comments"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


</VIEW>