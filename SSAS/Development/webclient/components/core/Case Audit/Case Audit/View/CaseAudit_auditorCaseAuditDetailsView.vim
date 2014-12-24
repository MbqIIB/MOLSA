<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2009-2010 Curam Software Ltd.                            -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- View containing details of a case audit for the auditors view          -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <CLUSTER
    LABEL_WIDTH="30"
    NUM_COLS="2"
  >


    <FIELD LABEL="Field.Label.AuditPlanReference">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$auditPlanReference"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.AuditItem">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$categoryName"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.Purpose">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$purpose"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


</VIEW>
