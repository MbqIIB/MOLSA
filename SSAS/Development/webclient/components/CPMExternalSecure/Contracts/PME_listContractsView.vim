<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2002 Curam Software Ltd.                                 -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. (&quot;Confidential Information&quot;). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- This page allows the user to view address details for a Participant -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <LIST>
    <CONTAINER
      LABEL="List.Title.Action"
      SEPARATOR="Container.Separator"
      WIDTH="5"
    >


      <!-- Links to View/Modify Flat-Rate Contract pages -->
      <ACTION_CONTROL LABEL="ActionControl.Label.View">
        <LINK PAGE_ID="PME_resolveContract">
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$contractList$contractDetails$contractVersionID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="contractID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$contextDescription$pageContextDescription"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="pageContextDescription"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="contractType"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="contractType"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


    </CONTAINER>
    <FIELD
      LABEL="Field.Label.ReferenceNumber"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="contractDetails$referenceNumber"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.Contract"
      USE_BLANK="true"
      USE_DEFAULT="false"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="contractType"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.ContractServicesType"
      USE_BLANK="true"
      USE_DEFAULT="false"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="contractServicesType"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.StartDate"
      USE_BLANK="true"
      USE_DEFAULT="false"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="startDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.EndDate"
      USE_BLANK="true"
      USE_DEFAULT="false"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="endDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.Status"
      USE_BLANK="true"
      USE_DEFAULT="false"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="status"
        />
      </CONNECT>
    </FIELD>


  </LIST>


</VIEW>
