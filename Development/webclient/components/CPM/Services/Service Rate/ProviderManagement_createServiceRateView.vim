<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  PID 5725-H26
  
  Copyright IBM Corporation 2007, 2014. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007, 2010-2011 Curam Software Ltd.                          -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- This page allows the user to enter details for a ServiceRate   -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.Home"
      />
    </CONNECT>
  </PAGE_TITLE>


  <SERVER_INTERFACE
    CLASS="ServiceOffering"
    NAME="ACTION"
    OPERATION="createServiceRate"
    PHASE="ACTION"
  />


  <ACTION_SET
    ALIGNMENT="CENTER"
    TOP="false"
  >


    <!-- BEGIN, CR00228079, PS -->
    <ACTION_CONTROL
      LABEL="ActionControl.Label.SaveAndNew"
      TYPE="SUBMIT"
    >
      <LINK PAGE_ID="ProviderManagement_createServiceRate"/>
    </ACTION_CONTROL>
    <!-- END, CR00228079 -->


    <ACTION_CONTROL
      LABEL="ActionControl.Label.Save"
      TYPE="SUBMIT"
    >
            
        </ACTION_CONTROL>


    <ACTION_CONTROL LABEL="ActionControl.Label.Cancel">
                                   
        </ACTION_CONTROL>


  </ACTION_SET>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="serviceOfferingID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="serviceRateDetails$serviceOfferingID"
    />
  </CONNECT>


  <CLUSTER NUM_COLS="2">


    <!-- BEGIN, CR00187899, PS -->
    <FIELD
      LABEL="Field.Label.MinimumAmount"
      WIDTH="60"
    >
      <!-- END, CR00187899 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="serviceRateDetails$minAmountString"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00187899, PS -->
    <FIELD
      LABEL="Field.Label.FixedAmount"
      WIDTH="60"
    >
      <!-- END, CR00187899 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="serviceRateDetails$fixedAmountString"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00187899, PS -->
    <FIELD
      LABEL="Field.Label.MaximumAmount"
      WIDTH="60"
    >


      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="serviceRateDetails$maxAmountString"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00247984, PS -->
    <FIELD
      LABEL="Field.Label.StartDate"
      USE_DEFAULT="false"
      WIDTH="65"
    >
      <!-- END, CR00247984 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="serviceRateDetails$startDate"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00187899 -->


  </CLUSTER>
  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Comments"
  >
    <!-- BEGIN, CR00187899,CR00407812, PS,RB -->
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.Comments"
    >
      <!-- END, CR00187899,CR00407812 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="serviceRateDetails$comments"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
