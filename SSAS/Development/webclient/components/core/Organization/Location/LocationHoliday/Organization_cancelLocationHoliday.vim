<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2003 Curam Software Ltd.                                 -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- This page allows the user to cancel a location holiday                 -->
<!-- for an organization.                                                   -->
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
    CLASS="Organization"
    NAME="ACTION"
    OPERATION="cancelLocationHoliday"
    PHASE="ACTION"
  />
  <PAGE_PARAMETER NAME="locationHolidayID"/>
  <PAGE_PARAMETER NAME="holidayName"/>
  <PAGE_PARAMETER NAME="description"/>
  <PAGE_PARAMETER NAME="locationStructureID"/>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="locationHolidayID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="locationHolidayID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="locationID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="locationID"
    />
  </CONNECT>


  <CLUSTER
    SHOW_LABELS="false"
    STYLE="outer-cluster-borderless"
  >
    <FIELD>
      <CONNECT>
        <SOURCE
          NAME="TEXT"
          PROPERTY="Field.StaticText.CancelLocationHoliday"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER>
    <FIELD LABEL="Field.StaticText.Relatedlocation">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="relatedLocationIndicator"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
</VIEW>
