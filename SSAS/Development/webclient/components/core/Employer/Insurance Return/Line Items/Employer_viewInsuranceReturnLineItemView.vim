<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
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
<!-- This page allows the user to view an insurance return line item        -->
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
    OPERATION="readLineItemDetails"
  />


  <PAGE_PARAMETER NAME="insuranceRetLineItemID"/>
  <PAGE_PARAMETER NAME="pageDescription"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="insuranceRetLineItemID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="insReturnLineItemKey$insuranceRetLineItemID"
    />
  </CONNECT>


  <CLUSTER
    NUM_COLS="2"
    TITLE="Cluster.Title.Details"
  >


    <FIELD LABEL="Field.Label.Employee">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="clientName"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.FromDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="fromDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.LineItemStatus">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="statusCode"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.Product">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="productType"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.ToDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="toDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.Status">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="recordStatus"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <CLUSTER
    NUM_COLS="2"
    TITLE="Cluster.Title.Contributions"
  >


    <FIELD LABEL="Field.Label.EmploymentType">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="employmentTypeCode"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.NumberUnits">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="numInsuranceUnits"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.TotalEmployerContribution">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="employerConAmt"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.TotalContribution">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="totalContributionAmt"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.UnitType">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="insUnitTypeCode"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.IncomeAmount">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="incomeAmount"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.TotalEmployeeContribution">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="employeeConAmt"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Comments"
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
