<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2008-2012 Curam Software Ltd.                                -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- in accordance with the terms of the license agreement you entered into -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- The included view to display an Investigation Delivery Incident        -->
<!-- details list.                                                          -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <LIST TITLE="List.Title.IncidentList">
    <!-- BEGIN, CR00262109, GYH -->
    <ACTION_SET TYPE="LIST_ROW_MENU">
      <ACTION_CONTROL LABEL="ActionControl.Label.Remove">
        <!-- BEGIN, CR00187417, PS -->
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderInvestigation_removeIncident"
          WINDOW_OPTIONS="width=400"
        >
          <!-- END, CR00187417 -->
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="incidentLinkID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="incidentLinkID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="incidentList$dtlsList$versionNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="versionNo"
            />
          </CONNECT>
          <CONNECT>
            <!-- BEGIN, CR00158370, SK -->
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="contextDtls$description"
            />
            <!-- END, CR00158370 -->
            <TARGET
              NAME="PAGE"
              PROPERTY="description"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </ACTION_SET>
    <!-- END, CR00262109 -->


    <FIELD
      LABEL="Field.Label.IncidentType"
      WIDTH="23"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="incidentList$dtlsList$type"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.IncidentDate"
      WIDTH="17"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="incidentList$dtlsList$recordedDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.IncidentReportedBy"
      WIDTH="15"
    >


      <!-- BEGIN, CR00304136, MR -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="reportedByFullNameOpt"
        />
      </CONNECT>


      <!-- END, CR00304136 -->
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="ProviderInvestigation_resolveIncidentReporterHome"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="incidentList$dtlsList$reportedByName"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="name"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="incidentList$dtlsList$reportedByConcernRoleID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="concernRoleID"
          />
        </CONNECT>
      </LINK>
    </FIELD>
    <FIELD
      LABEL="Field.Label.IncidentSeverity"
      WIDTH="10"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="incidentList$dtlsList$severity"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.IncidentLocation"
      WIDTH="10"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="incidentList$dtlsList$location"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.IncidentStatus"
      WIDTH="10"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="incidentList$dtlsList$status"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00262109, GYH -->
    <DETAILS_ROW>
      <INLINE_PAGE PAGE_ID="ProviderManagement_viewIncidentForInvestigation">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="incidentID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="incidentID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="concernRoleID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="concernRoleID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="contextDtls$description"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="pageDescription"
          />
        </CONNECT>
      </INLINE_PAGE>
    </DETAILS_ROW>
    <!-- END, CR00262109 -->


  </LIST>


</VIEW>
