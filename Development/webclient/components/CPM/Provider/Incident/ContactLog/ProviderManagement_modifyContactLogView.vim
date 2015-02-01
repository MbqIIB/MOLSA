<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2008, 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2008-2010 Curam Software Ltd.									-->
<!-- All rights reserved.                                                       -->
<!-- This software is the confidential and proprietary information of Curam	    -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose	    -->
<!-- such Confidential Information and shall use it only in accordance with	    -->
<!-- the terms of the license agreement you entered into with Curam	            -->
<!-- Software.                                                                  -->
<!-- Description                                                                -->
<!-- ===========                                                                -->
<!-- This page allows the user to modify contact log.                           -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.Title"
      />
    </CONNECT>
  </PAGE_TITLE>


  <!-- BEGIN, CR00146937, SK -->
  <SERVER_INTERFACE
    CLASS="ContactLog"
    NAME="DISPLAY"
    OPERATION="readContactLogForModify"
    PHASE="DISPLAY"
  />
  <!-- END, CR00146937 -->


  <SERVER_INTERFACE
    CLASS="MaintainProviderIncident"
    NAME="ACTION"
    OPERATION="modifyContactLog"
    PHASE="ACTION"
  />


  <!-- BEGIN, CR00146937, SK -->
  <SERVER_INTERFACE
    CLASS="ContactLog"
    NAME="DISPLAYPURPOSE"
    OPERATION="listPurpose"
  />
  <!-- END, CR00146937 -->


  <!-- BEGIN,CR00235660, PS -->
  <SERVER_INTERFACE
    CLASS="MaintainProviderIncident"
    NAME="DISPLAY1"
    OPERATION="viewContactLogOwnerDetails"
    PHASE="DISPLAY"
  />
  <!-- END, CR00235660 -->


  <PAGE_PARAMETER NAME="contactLogID"/>
  <PAGE_PARAMETER NAME="description"/>


  <!-- BEGIN,CR00235660, PS -->
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="contactLogID"
    />
    <TARGET
      NAME="DISPLAY1"
      PROPERTY="key$contactLogID"
    />
  </CONNECT>
  <!-- END, CR00235660 -->


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="contactLogID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$contactLogID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="contactLogDetails$contactLogID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="contactLogID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="createdDateTime"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="createdDateTime"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="createdBy"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="createdBy"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="contactLogDetails$recordStatus"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="recordStatus"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="addendumInd"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="addendumInd"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="contactLogDetails$versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="versionNo"
    />
  </CONNECT>


  <!-- BEGIN, CR00197352, SS -->
  <!-- BEGIN, CR00234497, PS -->
  <CLUSTER
    LABEL_WIDTH="40"
    NUM_COLS="2"
  >
    <!-- END, CR00234497 -->
    <!-- BEGIN, CR00146937, SK -->


    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.Purpose"
    >
      <!-- END, CR00197352 -->


      <CONNECT>
        <INITIAL
          HIDDEN_PROPERTY="purposeCode"
          NAME="DISPLAYPURPOSE"
          PROPERTY="purposeName"
        />
      </CONNECT>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="purpose"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="purpose"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00197352, SS -->
    <FIELD
      LABEL="Field.Label.Location"
      WIDTH="60"
    >
      <!-- END, CR00197352 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="location"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="location"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.StartDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="startDateTime"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="startDateTime"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00197352, SS -->
    <FIELD
      LABEL="Field.Label.Type"
      WIDTH="60"
    >
      <!-- END, CR00197352 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="contactLogType"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="contactLogType"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00197352, SS -->
    <FIELD
      LABEL="Field.Label.Author"
      USE_DEFAULT="false"
      WIDTH="60"
    >
      <!-- END, CR00197352 -->
      <!-- BEGIN, CR00235660, PS -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="authorFullName"
        />
      </CONNECT>
      <CONNECT>
        <INITIAL
          NAME="DISPLAY1"
          PROPERTY="authorFullName"
        />
      </CONNECT>
      <!-- END, CR00235660 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="author"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00197352, SS -->
    <FIELD
      LABEL="Field.Label.LocationDescription"
      WIDTH="60"
    >
      <!-- END, CR00197352 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="locationDescription"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="locationDescription"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00146937 -->


    <FIELD LABEL="Field.Label.EndDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="endDateTime"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="endDateTime"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00197352, SS -->
    <FIELD
      LABEL="Field.Label.Method"
      WIDTH="60"
    >
      <!-- END, CR00197352 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="method"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="method"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <!-- BEGIN, CR00235660, PS -->
  <CLUSTER
    LABEL_WIDTH="30"
    NUM_COLS="1"
    SCROLL_HEIGHT="200"
    SHOW_LABELS="false"
    TITLE="Cluster.Label.NarrativeDetails"
  >
    <FIELD WIDTH="600">
      <!-- END, CR00235660 -->
      <!-- BEGIN, CR00321084, GA -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="method"
        />
      </CONNECT>
      <!-- END, CR00321084 -->


      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="noteDetails$notesText"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


</VIEW>
