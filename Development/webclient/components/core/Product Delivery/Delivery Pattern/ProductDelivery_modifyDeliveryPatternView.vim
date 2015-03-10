<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2003-2010 Curam Software Ltd.                            -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- Included view used to change the delivery pattern for a product        -->
<!-- delivery.                                                              -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <SERVER_INTERFACE
    CLASS="Product"
    NAME="DISPLAY"
    OPERATION="listDeliveryPatternNames"
  />


  <SERVER_INTERFACE
    CLASS="ProductDelivery"
    NAME="ACTION"
    OPERATION="modifyDeliveryPattern"
    PHASE="ACTION"
  />


  <INFORMATIONAL>
    <CONNECT>
      <SOURCE
        NAME="ACTION"
        PROPERTY="informationMsgTxt"
      />
    </CONNECT>
  </INFORMATIONAL>


  <ACTION_SET
    ALIGNMENT="CENTER"
    TOP="false"
  >


    <ACTION_CONTROL
      IMAGE="SaveButton"
      LABEL="ActionControl.Label.Save"
      TYPE="SUBMIT"
    />
    <ACTION_CONTROL
      IMAGE="CancelButton"
      LABEL="ActionControl.Label.Cancel"
    />
  </ACTION_SET>


  <PAGE_PARAMETER NAME="productID"/>
  <PAGE_PARAMETER NAME="caseID"/>
  <!-- BEGIN, CR00095606, MM -->
  <PAGE_PARAMETER NAME="caseNomineeID"/>
  <!-- END, CR00095606 -->


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="productID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="productID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="caseID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="caseID"
    />
  </CONNECT>


  <!-- BEGIN, CR00095606, MM -->
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="caseNomineeID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="caseNomineeID"
    />
  </CONNECT>
  <!-- END, CR00095606 -->


  <CLUSTER LABEL_WIDTH="30">
    <FIELD 
      LABEL="Field.Label.PatternName"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <INITIAL
          HIDDEN_PROPERTY="productDeliveryPatternID"
          NAME="DISPLAY"
          PROPERTY="name"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="productDeliveryPatternID"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.EffectiveFrom"
      USE_DEFAULT="false"
      WIDTH="8"
      WIDTH_UNITS="CHARS"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="effectiveDate"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


</VIEW>