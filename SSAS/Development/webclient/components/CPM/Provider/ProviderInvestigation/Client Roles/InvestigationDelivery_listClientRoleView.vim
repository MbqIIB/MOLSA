<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2002-2007, 2009-2010 Curam Software Ltd.                     -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- This is the included view used to display a list of client roles for an-->
<!-- integrated case.  -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>

  <!-- BEGIN, CR00233616, PS -->
  <LIST TITLE="List.Title.ListOfParticipants"  WIDTH="90">
    <!-- END, CR00233616 -->
    <!-- BEGIN, CR00229065, PS -->
    <ACTION_SET TYPE="LIST_ROW_MENU">
      <!-- END, CR00229065 -->
      <ACTION_CONTROL LABEL="ActionControl.Label.Edit">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="Case_modifyClientRoleFromList"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="participantDtls$caseParticipantRoleID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="concernCaseRoleID"
            />
          </CONNECT>
          <!-- BEGIN, CR00121937, GD -->
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="participantDtls$participantRoleID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="concernRoleID"
            />
          </CONNECT>
          <!-- END, CR00121937 -->
          <CONNECT>
            <!-- BEGIN, CR00158370, SK -->
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="contextDtls$description"
            />
            <!-- END, CR00158370 -->
            <TARGET
              NAME="PAGE"
              PROPERTY="pageDescription"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      <!-- BEGIN, CR00229065, PS -->
    </ACTION_SET>
    <!-- END, CR00229065 -->

    <FIELD
      LABEL="Field.Label.Name"
      WIDTH="70"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="participantDtls$name"
        />
      </CONNECT>
    </FIELD>

    <!-- BEGIN, CR00229065, PS -->
    <DETAILS_ROW>
      <INLINE_PAGE PAGE_ID="Case_viewClientRole">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="participantDtls$caseParticipantRoleID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="concernCaseRoleID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="participantDtls$participantRoleID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="concernRoleID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="contextDtls$description"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="pageDescription"
          />
        </CONNECT>
      </INLINE_PAGE>
    </DETAILS_ROW>
    <!-- END, CR00229065 -->
  </LIST>


</VIEW>
