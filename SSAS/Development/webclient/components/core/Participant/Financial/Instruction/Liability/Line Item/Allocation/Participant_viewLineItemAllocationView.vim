<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2009, 2011 Curam Software Ltd.                           -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- The included view to display the allocations against a financial       -->
<!-- line item.                                                             -->
<?curam-deprecated Since Curam 6.0. Replaced by Financial_viewLiabilityLineItemAllocations1.uim. ?>
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
    <!-- BEGIN, CR00160310, MC -->
    <CONNECT>
      <SOURCE
        NAME="PAGE"
        PROPERTY="description"
      />
    </CONNECT>
    <!-- END, CR00160310 -->
  </PAGE_TITLE>


  <SERVER_INTERFACE
    CLASS="Financial"
    NAME="DISPLAY"
    OPERATION="listAllocation"
  />


  <PAGE_PARAMETER NAME="lineItemID"/>
  <PAGE_PARAMETER NAME="description"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="lineItemID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$instructLineItemID"
    />
  </CONNECT>


  <CLUSTER
    LABEL_WIDTH="30"
    TITLE="Cluster.Title.AllocationTotals"
  >


    <CONTAINER LABEL="Field.Label.Total">
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="allocationHeaderDetails$currencyType"
          />
        </CONNECT>
      </FIELD>
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="allocationTotal"
          />
        </CONNECT>
      </FIELD>
    </CONTAINER>


    <CONTAINER LABEL="Field.Label.Balance">
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="allocationHeaderDetails$currencyType"
          />
        </CONNECT>
      </FIELD>
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="allocationBalance"
          />
        </CONNECT>
      </FIELD>
    </CONTAINER>


  </CLUSTER>


  <LIST TITLE="List.Title.Allocations">


    <FIELD
      LABEL="Field.Label.Type"
      WIDTH="30"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="finInstructionCategory"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.AllocationDate"
      WIDTH="20"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="allocationDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.Currency"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="dtls$currencyType"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      ALIGNMENT="RIGHT"
      LABEL="Field.Label.AmountAllocated"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="allocationAmount"
        />
      </CONNECT>
    </FIELD>


  </LIST>


</VIEW>
