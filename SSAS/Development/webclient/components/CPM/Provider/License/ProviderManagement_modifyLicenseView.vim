<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2007, 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007, 2010 Curam Software Ltd.                                 -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- The included view for modifying licenses.                              -->
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
    CLASS="License"
    NAME="DISPLAY"
    OPERATION="viewLicense"
    PHASE="DISPLAY"
  />


  <SERVER_INTERFACE
    CLASS="License"
    NAME="ACTION"
    OPERATION="modifyLicense"
    PHASE="ACTION"
  />


  <PAGE_PARAMETER NAME="licenseID"/>
  <PAGE_PARAMETER NAME="licenseStatus"/>
  <PAGE_PARAMETER NAME="concernRoleID"/>
  <PAGE_PARAMETER NAME="versionNo"/>
  <PAGE_PARAMETER NAME="pageContextDescription"/>
  <PAGE_PARAMETER NAME="renewedInd"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="licenseID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$licenseID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="licenseID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="dtls$licenseID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="licenseStatus"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="licenseStatus"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="concernRoleID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="providerConcernRoleID"
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
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="renewedInd"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="renewedInd"
    />
  </CONNECT>


  <!-- BEGIN, CR00187976, SS -->
  <CLUSTER
    LABEL_WIDTH="40"
    NUM_COLS="2"
  >
    <FIELD
      LABEL="Field.Label.Issuer"
      WIDTH="86"
    >
      <!-- END, CR00187976 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="issuer"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="issuer"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00187976, SS -->
    <FIELD
      LABEL="Field.Label.Type"
      WIDTH="86"
    >
      <!-- END, CR00187976 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="licenseType"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="licenseType"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.DateIssued">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="dateIssued"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dateIssued"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00207959, SS -->
    <!-- BEGIN, CR00180246, SS -->
    <FIELD
      LABEL="Field.Label.Number"
      WIDTH="25"
    >
      <!-- END, CR00180246 -->
      <!-- END, CR00207959 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="licenseNumber"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="licenseNumber"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00207959, SS -->
    <!-- BEGIN, CR00187976, SS -->
    <FIELD
      LABEL="Field.Label.MaximumPlaces"
      WIDTH="25"
    >
      <!-- END, CR00187976 -->
      <!-- END, CR00207959 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="maximumPlaces"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="maximumPlaces"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.DateOfExpiration">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="expirationDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="expirationDate"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Comments"
  >


    <!-- BEGIN, CR00342151, PS -->
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.Comments"
    >
      <!-- END, CR00342151 -->
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
