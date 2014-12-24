<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2010 Curam Software Ltd.                            -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- Lists Incidents for a Provider.                               -->
<VIEW>
  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.StaticText1"
      />
    </CONNECT>
  </PAGE_TITLE>


  <SERVER_INTERFACE
    CLASS="MaintainProviderIncident"
    NAME="DISPLAY"
    OPERATION="listIncidentForProvider"
    PHASE="DISPLAY"
  />


  <PAGE_PARAMETER NAME="serviceOfferingID"/>
  <PAGE_PARAMETER NAME="providerConcernRoleID"/>


  <SERVER_INTERFACE
    CLASS="MaintainProviderIncident"
    NAME="DISPLAY1"
    OPERATION="readIncidentContextDescription"
    PHASE="DISPLAY"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="providerConcernRoleID"
    />
    <TARGET
      NAME="DISPLAY1"
      PROPERTY="key$concernRoleID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="providerConcernRoleID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="concernRoleID"
    />
  </CONNECT>


  <LIST SORTABLE="true">
    <FIELD LABEL="Field.Label.Incident.Type">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="type"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Incident.RecordedDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="recordedDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Incident.ReportedBy">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="reportedBy"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Incident.Severity">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="severity"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Incident.ProviderLocation">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerFacilityInd"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Incident.ClosureDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="closureDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Incident.Status">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="status"
        />
      </CONNECT>
    </FIELD>
  </LIST>
</VIEW>
