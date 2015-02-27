<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2009-2010 Curam Software Ltd.                                 -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ====================================================================== -->
<!-- This page allows the user to list the performance measures.            -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <LIST TITLE="List.Title.PerformanceMeasures">


    <FIELD
      LABEL="Field.Label.Action"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="TEXT"
          PROPERTY="ActionControl.Label.Remove"
        />
      </CONNECT>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="ProviderManagement_confirmRemovePerformanceMeasure"
        WINDOW_OPTIONS="width=400"
      >
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
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="performanceMeasureLinkID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="performanceMeasureLinkID"
          />
        </CONNECT>
        <!--<CONNECT>
                    <SOURCE NAME="DISPLAY" PROPERTY="versionID"/>
                    <TARGET NAME="PAGE" PROPERTY="versionID"/>
                </CONNECT>-->
      </LINK>
    </FIELD>


    <FIELD
      LABEL="Field.Label.Measure"
      WIDTH="40"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="measure"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.Type"
      WIDTH="25"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="type"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.CurrentValue"
      WIDTH="20"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="currentValue"
        />
      </CONNECT>
    </FIELD>


  </LIST>


</VIEW>
