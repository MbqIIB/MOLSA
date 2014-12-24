<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  PID 5725-H26
  
  Copyright IBM Corporation 2007, 2014. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007, 2009-2011 Curam Software Ltd.                           -->
<!-- All rights reserved.                                                    -->
<!-- This software is the confidential and proprietary information of Curam  -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose     -->
<!-- such Confidential Information and shall use it only in accordance with  -->
<!-- in accordance with the terms of the license agreement you entered into  -->
<!-- Software.                                                               -->
<!-- Description                                                             -->
<!-- ===========                                                             -->
<!-- This page allows the user to update service group details.              -->
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
    NAME="DISPLAY"
    OPERATION="readServiceGroupForUpdate"
    PHASE="DISPLAY"
  />


  <SERVER_INTERFACE
    CLASS="ServiceOffering"
    NAME="ACTION"
    OPERATION="updateServiceGroup"
    PHASE="ACTION"
  />


  <PAGE_PARAMETER NAME="serviceGroupID"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="serviceGroupID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="serviceGroupKey$serviceGroupKey$serviceGroupKey$serviceGroupID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="serviceGroupID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="serviceGroupDetails$serviceGroupDetails$serviceGroupDtls$serviceGroupID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="result$serviceGroupDtls$recordStatus"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="serviceGroupDetails$serviceGroupDetails$serviceGroupDtls$recordStatus"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="serviceGroupDtls$versionNo"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="versionNo"
    />
  </CONNECT>


  <CLUSTER
    SHOW_LABELS="true"
    STYLE="cluster-cpr-no-internal-padding"
  >
    <!-- BEGIN, CR00236707, PS -->
    <!-- BEGIN, CR00197421, PS -->
    <CLUSTER
      LABEL_WIDTH="20"
      NUM_COLS="1"
      STYLE="cluster-cpr-no-border"
    >
      <!-- END, CR00197421 -->
      <FIELD
        LABEL="Field.Label.Name"
        WIDTH="60"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$serviceGroupDtls$name"
          />
        </CONNECT>
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="serviceGroupDetails$serviceGroupDetails$serviceGroupDtls$name"
          />
        </CONNECT>
      </FIELD>


      <!-- BEGIN, CR00178548, AK -->
      <FIELD
        LABEL="Field.Label.Reference"
        WIDTH="60"
      >
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$serviceGroupDtls$reference"
          />
        </CONNECT>
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="reference"
          />
        </CONNECT>
      </FIELD>
      <!-- END, CR00178548 -->
      <!-- END, CR00236707 -->
    </CLUSTER>
    <!-- BEGIN, CR00197421, PS -->
    <CLUSTER
      LABEL_WIDTH="20"
      NUM_COLS="1"
      STYLE="cluster-cpr-no-border"
    >
      <FIELD
        HEIGHT="4"
        LABEL="Field.Label.Description"
      >
        <!-- END, CR00197421 -->
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="result$serviceGroupDtls$description"
          />
        </CONNECT>
        <CONNECT>
          <TARGET
            NAME="ACTION"
            PROPERTY="serviceGroupDetails$serviceGroupDetails$serviceGroupDtls$description"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>


  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.ServiceOffering"
  >
    <FIELD CONTROL="SKIP"/>
    <!-- BEGIN, CR00247616, RPB -->
    <FIELD
      CONTROL="TRANSFER_LIST"
      HEIGHT="4"
    >
      <!-- END, CR00247616 -->
      <CONNECT>
        <INITIAL
          HIDDEN_PROPERTY="result$serviceOfferingSummaryDetailsList$dtls$serviceOfferingID"
          NAME="DISPLAY"
          PROPERTY="result$serviceOfferingSummaryDetailsList$dtls$name"
        />
      </CONNECT>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$serviceOfferingIDS"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="serviceGroupDetails$serviceGroupDetails$serviceOfferingIDS"
        />
      </CONNECT>
    </FIELD>
    <FIELD CONTROL="SKIP"/>
  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Comments"
  >


    <!-- BEGIN, CR00197421,CR00407812, PS, RB -->
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.Comments"
    >
      <!-- END, CR00197421,CR00407812 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$serviceGroupDtls$comments"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="serviceGroupDetails$serviceGroupDetails$serviceGroupDtls$comments"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
