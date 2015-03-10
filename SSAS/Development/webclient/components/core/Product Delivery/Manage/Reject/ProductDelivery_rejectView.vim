<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  PID 5725-H26
  
  Copyright IBM Corporation 2003, 2013. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2003-2006,2009-2010 Curam Software Ltd.                  -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- Included view used to reject a request for approval for a case.        -->
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
    NAME="ACTION"
    OPERATION="reject1"
    PHASE="ACTION"
  />
  <ACTION_SET
    ALIGNMENT="CENTER"
    TOP="false"
  >
    <ACTION_CONTROL
      IMAGE="YesButton"
      LABEL="ActionControl.Label.Yes"
      TYPE="SUBMIT"
    />
    <ACTION_CONTROL
      IMAGE="NoButton"
      LABEL="ActionControl.Label.No"
    />
  </ACTION_SET>
  <PAGE_PARAMETER NAME="caseID"/>
  <PAGE_PARAMETER NAME="pageDescription"/>
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
  <CLUSTER
    SHOW_LABELS="false"
    STYLE="outer-cluster-borderless"
  >


    <!-- BEGIN, CR00050298, MR -->
    <!-- BEGIN, HARP 64908, SP -->
    <FIELD LABEL="Field.Label.RejectCaseText">
      <!-- END, HARP 64908 -->
      <!-- END, CR00050298 -->


      <CONNECT>
        <SOURCE
          NAME="TEXT"
          PROPERTY="Field.StaticText.RejectCase"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <!-- BEGIN, CR00163683, MC -->
  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Comments"
  >
    <!-- BEGIN, CR00406866, VT -->
    <FIELD HEIGHT="4" LABEL="Field.Label.Comments">
      <!-- END, CR00406866 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="comments"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <!-- END, CR00163683 -->


</VIEW>