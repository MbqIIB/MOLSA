<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2010-2011 Curam Software Ltd.                                -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- This page allows the user to create a sand box product.                -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="page.title"
      />
    </CONNECT>
  </PAGE_TITLE>


  <SERVER_INTERFACE
    CLASS="CREOLEProductAdmin"
    NAME="ACTION"
    OPERATION="editProduct"
    PHASE="ACTION"
  />


  <ACTION_SET>
    <ACTION_CONTROL
      LABEL="control.label.yes"
      TYPE="SUBMIT"
    >
      <LINK PAGE_ID="CREOLEProductAdmin_listInEditDecisionDispCat">
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="productID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="productID"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>
    <ACTION_CONTROL LABEL="control.label.no"/>
  </ACTION_SET>


</VIEW>
