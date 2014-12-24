<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  PID 5725-H26
  
  Copyright IBM Corporation 2002, 2013. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2002-2003 Curam Software Ltd.                            -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- This page allows the user to modify an insurance return.               -->
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
    CLASS="Contribution"
    NAME="DISPLAY"
    OPERATION="listReturnHeaderDetails"
  />


  <SERVER_INTERFACE
    CLASS="Contribution"
    NAME="ACTION"
    OPERATION="modifyInsuranceReturnHeader"
    PHASE="ACTION"
  />


  <PAGE_PARAMETER NAME="insuranceRetHdrID"/>
  <PAGE_PARAMETER NAME="pageDescription"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="insuranceRetHdrID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="insuranceRetHdrKey$insuranceRetHdrID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="insuranceRetHdrID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="insuranceRetHdrKey$insuranceRetHdrID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="insuranceRetHdrID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="insuranceReturnHdrModifyDtls$insuranceRetHdrID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="insuranceRetHdrDtlsID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="insuranceRetHdrDtlsID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="statusCode"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="statusCode"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="creationDate"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="creationDate"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="recordStatus"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="recordStatus"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="insuranceReturnPeriodID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="insuranceReturnPeriodID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="concernRoleID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="concernRoleID"
    />
  </CONNECT>
  <!--  <CONNECT>
    <SOURCE NAME="DISPLAY" PROPERTY="versionNo"/>
    <TARGET NAME="ACTION" PROPERTY="versionNo"/>      
  </CONNECT>-->


  <CLUSTER
    NUM_COLS="2"
    TITLE="Cluster.Title.Details"
  >


    <FIELD LABEL="Field.Label.Contact">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="contactName"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="contactName"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.Type">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="insuranceReturnType"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="insuranceReturnType"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.ReceiptDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="receiptDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="receiptDate"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <CLUSTER
    NUM_COLS="2"
    TITLE="Cluster.Title.Contributions"
  >


    <FIELD LABEL="Field.Label.TotalEmployer">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="employerContribAmt"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="employerContribAmt"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.TotalContributionAmount">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="totalContribAmt"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="totalContribAmt"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.CasualEmployees">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="numCasualEmployees"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="numCasualEmployees"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.TotalPayroll">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="totalPayroll"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="totalPayroll"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.TotalEmployee">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="employeeContribAmt"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="employeeContribAmt"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.PermanentEmployees">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="numPermanentEmployees"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="numPermanentEmployees"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.TotalEmployees">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="totNumEmployees"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="totNumEmployees"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Comments"
  >


    <!-- BEGIN, CR00406866, VT -->
    <FIELD HEIGHT="4" LABEL="Field.Label.Comments">
      <!-- END, CR00406866 -->
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