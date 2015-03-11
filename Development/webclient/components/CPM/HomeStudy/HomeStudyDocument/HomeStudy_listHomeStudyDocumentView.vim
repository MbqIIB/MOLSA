<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007, 2010 Curam Software Ltd.                               -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- This page allows the user to view the listing Home Study Documents.    -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <SERVER_INTERFACE
    CLASS="HomeStudyDocument"
    NAME="DISPLAY"
    OPERATION="listHomeStudyDocuments"
  />


  <PAGE_PARAMETER NAME="homeStudyID"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="homeStudyID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$homeStudyID"
    />
  </CONNECT>


  <LIST>
    <!-- BEGIN, CR00198768, SS -->
    <ACTION_SET TYPE="LIST_ROW_MENU">
      <!-- END, CR00198768 -->
      <ACTION_CONTROL LABEL="ActionControl.Label.Edit">
        <!-- BEGIN, CR00197352, SS -->
        <!-- BEGIN, CR00207959, SS -->
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="HomeStudy_modifyHomeStudyDocument"
        >
          <!-- END, CR00197352 -->
          <!-- END, CR00207959 -->
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="homeStudyDocumentID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="homeStudyDocumentID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="description"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="pageDescription"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      <ACTION_CONTROL LABEL="ActionControl.Label.Delete">
        <!-- BEGIN, CR00187417, PS -->
        <!-- BEGIN, CR00197352, SS -->
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="HomeStudy_deleteHomeStudyDocument"
          WINDOW_OPTIONS="width=360"
        >
          <!-- END, CR00187417 -->
          <!-- END, CR00197352 -->
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="homeStudyDocumentID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="homeStudyDocumentID"
            />
          </CONNECT>
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
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="description"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="pageDescription"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      <!-- BEGIN, CR00198768, SS -->
    </ACTION_SET>
    <!-- END, CR00198768 -->


    <!-- BEGIN, CR00207959, SS -->
    <FIELD
      LABEL="Field.Label.DocumentDescription"
      WIDTH="55"
    >
      <!-- END, CR00207959 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="documentDescription"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00207959, SS -->
    <FIELD
      LABEL="Field.Label.DateCreated"
      WIDTH="16"
    >
      <!-- END, CR00207959 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="dateCreated"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00207959, SS -->
    <FIELD
      LABEL="Field.Label.CreatedBy"
      WIDTH="16"
    >
      <!-- END, CR00207959 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="createdBy"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00207959, SS -->
    <FIELD
      LABEL="Field.Label.Status"
      WIDTH="13"
    >
      <!-- END, CR00207959 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="recordStatus"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00198768, SS -->
    <DETAILS_ROW>
      <!-- BEGIN, CR00197352, SS -->
      <INLINE_PAGE PAGE_ID="HomeStudy_viewHomeStudyDocument">
        <!-- END, CR00197352 -->
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="homeStudyDocumentID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="homeStudyDocumentID"
          />
        </CONNECT>
      </INLINE_PAGE>
    </DETAILS_ROW>
    <!-- END, CR00198768 -->
  </LIST>


</VIEW>
