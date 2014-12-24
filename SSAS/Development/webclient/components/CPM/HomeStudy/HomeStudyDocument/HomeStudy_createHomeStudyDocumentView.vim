<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007, 2010-2011 Curam Software Ltd.                          -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- The included view for the create Home Study Document.                  -->
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
    CLASS="HomeStudyDocument"
    NAME="DISPLAY"
    OPERATION="listHomeStudyDocumentTemplates"
  />


  <SERVER_INTERFACE
    CLASS="HomeStudyDocument"
    NAME="ACTION"
    OPERATION="createHomeStudyDocument"
    PHASE="ACTION"
  />


  <PAGE_PARAMETER NAME="pageDescription"/>
  <PAGE_PARAMETER NAME="homeStudyID"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="homeStudyID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="homeStudyID"
    />
  </CONNECT>


  <ACTION_SET
    ALIGNMENT="CENTER"
    TOP="false"
  >


    <ACTION_CONTROL
      LABEL="ActionControl.Label.Save"
      TYPE="SUBMIT"
    />


    <ACTION_CONTROL LABEL="ActionControl.Label.Cancel">
    </ACTION_CONTROL>


  </ACTION_SET>


  <!-- BEGIN, CR00207959, SS -->
  <!-- BEGIN, CR00197352, SS -->
  <CLUSTER
    LABEL_WIDTH="35"
    NUM_COLS="1"
  >
    <!-- BEGIN, CR00228688, PS -->
    <FIELD
      LABEL="Field.Label.DocumentDescription"
      WIDTH="73"
    >
      <!-- END, CR00228688 -->
      <!-- END, CR00197352 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="documentDescription"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00236219, PS -->
    <FIELD
      LABEL="Field.Label.TemplateName"
      WIDTH="75"
    >
      <!-- END, CR00236219 -->
      <!-- END, CR00197352 -->
      <CONNECT>
        <INITIAL
          HIDDEN_PROPERTY="documentTemplateID"
          NAME="DISPLAY"
          PROPERTY="documentTemplateName"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="documentTemplateID"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00207959 -->
  </CLUSTER>
</VIEW>
