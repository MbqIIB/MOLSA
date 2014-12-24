<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2007-2008, 2010 Curam Software Ltd.                      -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- This is the included view for the employment view page. -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <PAGE_PARAMETER NAME="employmentID"/>
  <!-- BEGIN, CR00110570, MR -->
  <PAGE_PARAMETER NAME="caseID"/>
  <!-- END, CR00110570 -->


  <SERVER_INTERFACE
    CLASS="Person"
    NAME="DISPLAY"
    OPERATION="readEmployment"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="employmentID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="readEmploymentKey$employmentID"
    />
  </CONNECT>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Label.Comments"
  >


    <FIELD>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="comments"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>
</VIEW>
