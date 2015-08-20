<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2007 Curam Software Ltd.                                 -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- A view which, when included, shows the home study child navigation     -->
<!-- header                                                                 -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <MENU MODE="IN_PAGE_NAVIGATION">
    <ACTION_CONTROL
      LABEL="Menu.ViewHomeStudy"
      STYLE="in-page-link"
      TYPE="ACTION"
    >
      <LINK PAGE_ID="HomeStudy_viewDetails">
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
      </LINK>
    </ACTION_CONTROL>
    <ACTION_CONTROL
      LABEL="Menu.Assessments"
      STYLE="in-page-link"
      TYPE="ACTION"
    >
      <LINK PAGE_ID="HomeStudy_listAssessmentForHomeStudy">
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
      </LINK>
    </ACTION_CONTROL>
    <ACTION_CONTROL
      LABEL="Menu.HomeVisits"
      STYLE="in-page-link"
      TYPE="ACTION"
    >
      <LINK PAGE_ID="HomeStudy_listHomeVisitsForHomeStudy">
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
      </LINK>
    </ACTION_CONTROL>
    <ACTION_CONTROL
      LABEL="Menu.Documents"
      STYLE="in-page-link"
      TYPE="ACTION"
    >
      <LINK PAGE_ID="HomeStudy_listDocumentsForHomeStudy">
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
      </LINK>
    </ACTION_CONTROL>
  </MENU>
</VIEW>
