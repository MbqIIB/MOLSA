<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2008, 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2008-2011 Curam Software Ltd.                            -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- in accordance with the terms of the license agreement you entered into -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- This is modify training page.                                          -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <PAGE_PARAMETER NAME="trainingID"/>
  <PAGE_PARAMETER NAME="versionNo"/>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="trainingID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$trainingID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="trainingID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="trainingID"
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


  <!-- BEGIN, CR00236707, PS -->
  <CLUSTER
    LABEL_WIDTH="35"
    NUM_COLS="2"
  >
    <!-- END, CR00236707 -->
    <FIELD LABEL="Field.Label.Training.TrainingName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="trainingName"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="trainingName"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00340898, PB -->
    <FIELD
      LABEL="Field.Label.Training.StartDate"
      WIDTH="55"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="startDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="startDate"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00340898 -->
    <!-- BEGIN, CR00247984, PS -->
    <FIELD LABEL="Field.Label.Training.TrainingType">
      <!-- END, CR00247984 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="trainingType"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="trainingType"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00340898, PB -->
    <!-- BEGIN, CR00247984, PS -->
    <FIELD
      LABEL="Field.Label.Training.EndDate"
      WIDTH="55"
    >
      <!-- END, CR00247984 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="endDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="endDate"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00340898 -->
  </CLUSTER>


</VIEW>
