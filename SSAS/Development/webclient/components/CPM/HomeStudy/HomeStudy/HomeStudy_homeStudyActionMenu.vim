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
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- The included view for the resource manager links.                  -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <PAGE_PARAMETER NAME="pageDescription"/>


  <PAGE_PARAMETER NAME="homeStudyID"/>


  <!-- SUPERVISOR links -->
  <CLUSTER
    NUM_COLS="3"
    SHOW_LABELS="false"
    STYLE="outer-cluster-borderless"
  >
    <CONDITION>
      <IS_TRUE
        NAME="DISPLAY"
        PROPERTY="showSupervisorLinks"
      />
    </CONDITION>


    <ACTION_SET
      ALIGNMENT="CENTER"
      TOP="false"
    >
      <ACTION_CONTROL LABEL="ActionControl.Label.Approve">
        <!-- BEGIN, CR00187417, PS -->
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="HomeStudy_approvePopup"
        >
          <!-- END, CR00187417 -->
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="homeStudyID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="homeStudyID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="versionNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="versionNo"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL LABEL="ActionControl.Label.Reject">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="HomeStudy_rejectPopup"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="homeStudyID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="homeStudyID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="versionNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="versionNo"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


    </ACTION_SET>
  </CLUSTER>


</VIEW>
