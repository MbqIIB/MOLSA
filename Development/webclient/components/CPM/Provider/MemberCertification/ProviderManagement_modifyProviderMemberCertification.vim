<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  PID 5725-H26
  
  Copyright IBM Corporation 2008, 2014. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2008, 2010-2011 Curam Software Ltd.                          -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- This page allows the user to modify member certification.              -->
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


  <PAGE_PARAMETER NAME="memberCertificationID"/>
  <PAGE_PARAMETER NAME="contextdescription"/>


  <SERVER_INTERFACE
    CLASS="MaintainMemberCertification"
    NAME="ACTION"
    OPERATION="updateMemberCertification"
    PHASE="ACTION"
  />


  <SERVER_INTERFACE
    CLASS="MaintainMemberCertification"
    NAME="DISPLAY"
    OPERATION="viewMemberCertification"
    PHASE="DISPLAY"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="memberCertificationID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$memberCertificationID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="memberCertificationID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="key$memberCertificationID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="result$versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="key$versionNo"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="result$recordStatus"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="key$recordStatus"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="result$partyConcernRoleID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="key$partyConcernRoleID"
    />
  </CONNECT>


  <!-- BEGIN, CR00127684, NK -->
  <INFORMATIONAL>
    <CONNECT>
      <SOURCE
        NAME="ACTION"
        PROPERTY="result$dtls$messageTest"
      />
    </CONNECT>
  </INFORMATIONAL>
  <!-- END, CR00127684 -->


  <!-- BEGIN, CR00199550, SS -->
  <!-- BEGIN CR00247036, PS-->
  <CLUSTER
    LABEL_WIDTH="34"
    NUM_COLS="2"
  >
    <!-- END CR00247036-->
    <!-- END, CR00199550 -->
    <!-- BEGIN, CR00247455, PS -->
    <FIELD
      LABEL="Field.Label.CertificationType"
      USE_BLANK="true"
      WIDTH="100"
    >
      <!-- END, CR00247455 -->
      <CONNECT>
        <INITIAL
          NAME="DISPLAY"
          PROPERTY="result$certificationType"
        />
      </CONNECT>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$certificationID"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="key$certificationID"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00247455, PS -->
    <FIELD
      LABEL="Field.Label.DateofIssue"
      WIDTH="45"
    >
      <!-- END, CR00247455 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$dateofIssue"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="key$dateOfIssue"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.Issuer"
      USE_BLANK="true"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$issuer"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00247455, PS -->
    <FIELD
      LABEL="Field.Label.DateofExpiry"
      WIDTH="45"
    >
      <!-- END, CR00247455 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$dateofExpiry"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="key$dateOfExpiry"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    NUM_COLS="1"
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Comment"
  >
    <!-- BEGIN, CR00197352, SS -->
    <!-- BEGIN, CR00417165, GK -->
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.Comments"
    >
      <!-- END, CR00417165 -->
      <!-- END, CR00197352 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$comments"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="key$comments"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
</VIEW>
