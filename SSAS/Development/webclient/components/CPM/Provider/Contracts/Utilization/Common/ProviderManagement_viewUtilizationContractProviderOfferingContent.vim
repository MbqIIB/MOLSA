<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007, 2010 Curam Software Ltd.                                 -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- in accordance with the terms of the license agreement you entered into -->
<!-- Software.                                                              -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <LIST TITLE="List.Title.ProviderServicePlaceLimit">
    <!-- BEGIN, CR00200179, SS -->
    <ACTION_SET TYPE="LIST_ROW_MENU">
      <!-- END, CR00200179 -->
      <ACTION_CONTROL LABEL="ActionControl.Label.EditPlaceLimit">
        <!-- BEGIN, CR00197352, SS -->
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_modifyProviderOfferingPlaceLimit"
          WINDOW_OPTIONS="width=500"
        >
          <!-- END, CR00197352 -->
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$providerOfferingPlaceLimitDtlsList$providerOfferingPlaceLimitID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="providerOfferingPlaceLimitID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$providerOfferingPlaceLimitDtlsList$versionNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="versionNo"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="pageContextDescription"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="pageContextDescription"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$serviceOfferingName"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="providerOfferingName"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      <ACTION_CONTROL LABEL="ActionControl.Label.Delete">
        <!-- BEGIN, CR00207545, SS -->
        <!-- BEGIN, CR00200179, SS -->
        <!-- BEGIN, CR00187417, PS -->
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_cancelUtilizationContractServicePlaceLimit"
          WINDOW_OPTIONS="width=275"
        >
          <!-- END, CR00187417 -->
          <!-- END, CR00200179 -->
          <!-- END, CR00207545 -->
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$providerOfferingPlaceLimitDtlsList$providerOfferingPlaceLimitID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="providerOfferingPlaceLimitID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="pageContextDescription"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="pageContextDescription"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$serviceOfferingName"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="providerOfferingName"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$providerOfferingPlaceLimitDtlsList$versionNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="versionNo"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$providerOfferingPlaceLimitDtlsList$providerOfferingID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="providerOfferingID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="contractProviderOfferingLinkID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="contractProviderOfferingLinkID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="contractVersionID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="contractVersionID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="concernRoleID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="concernRoleID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      <!-- BEGIN, CR00200179, SS -->
    </ACTION_SET>
    <!-- END, CR00200179 -->
    <!-- BEGIN, CR00207545, SS -->
    <FIELD LABEL="Field.Label.PlaceLimit">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$providerOfferingPlaceLimitDtlsList$placeLimit"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00207545 -->
    <FIELD LABEL="Field.Label.StartDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$providerOfferingPlaceLimitDtlsList$startDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.EndDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$providerOfferingPlaceLimitDtlsList$endDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.Status">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$providerOfferingPlaceLimitDtlsList$recordStatus"
        />
      </CONNECT>
    </FIELD>
  </LIST>


  <!-- Rates -->
  <LIST TITLE="List.Title.ProviderOfferingRate">
    <!-- BEGIN, CR00200179, SS -->
    <ACTION_SET TYPE="LIST_ROW_MENU">
      <!-- END, CR00200179 -->
      <ACTION_CONTROL LABEL="ActionControl.Label.Edit">
        <!-- BEGIN, CR00197352, SS -->
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_modifyUtilizationContractProviderOfferingRate"
          WINDOW_OPTIONS="width=550"
        >
          <!-- END, CR00197352 -->
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="providerOfferingRateDetailsList$providerOfferingRateID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="providerOfferingRateID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="providerOfferingRateDetailsList$versionNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="providerOfferingRateVersionNo"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="pageContextDescription"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="pageContextDescription"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      <!-- BEGIN, CR00200179, SS -->
    </ACTION_SET>
    <!-- END, CR00200179 -->
    <FIELD LABEL="Field.Label.MinAmount">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerOfferingRateDetailsList$minAmountString"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.MaxAmount">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerOfferingRateDetailsList$maxAmountString"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.FixedAmount">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerOfferingRateDetailsList$fixedAmountString"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00207545, SS -->
    <FIELD LABEL="Field.Label.StartDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerOfferingRateDetailsList$startDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.EndDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerOfferingRateDetailsList$endDate"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00207545 -->
  </LIST>


</VIEW>
