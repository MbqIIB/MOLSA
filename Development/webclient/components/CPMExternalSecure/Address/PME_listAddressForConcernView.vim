<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007, 2010-2011 Curam Software Ltd.                           -->
<!-- All rights reserved.                                                    -->
<!-- This software is the confidential and proprietary information of Curam  -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose     -->
<!-- such Confidential Information and shall use it only in accordance with  -->
<!-- the terms of the license agreement you entered into with Curam          -->
<!-- Software.                                                               -->
<!-- Description                                                             -->
<!-- ===========                                                             -->
<!-- This page allows the user to list all the addresses for a provider.     -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <LIST>


    <!-- BEGIN, CR00228977, GP -->
    <FIELD
      LABEL="Field.Label.Primary"
      WIDTH="8"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="primaryInd"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.Type"
      WIDTH="12"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="typeCode"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00236455, GP -->
    <FIELD
      LABEL="Field.Label.Address"
      WIDTH="50"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="addressLine1"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00236455 -->


    <FIELD
      LABEL="Field.Label.From"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="startDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.To"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="endDate"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00228977 -->


  </LIST>


</VIEW>
