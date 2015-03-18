<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2002-2007, 2010-2011 Curam Software Ltd.                     -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- This page confirms the duplicate registration of an employer. -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <PAGE_TITLE DESCRIPTION="PageTitle.Description">
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.StaticText1"
      />
    </CONNECT>
  </PAGE_TITLE>


  <!-- BEGIN, CR00282028, IBM -->
  <INFORMATIONAL>
    <CONNECT>
      <SOURCE
        NAME="ACTION"
        PROPERTY="informationMsgTxt"
      />
    </CONNECT>
  </INFORMATIONAL>


  <SERVER_INTERFACE
    CLASS="Employer"
    NAME="ACTION"
    OPERATION="searchEmployer"
    PHASE="ACTION"
  />
  <!-- END, CR00282028 -->


  <INCLUDE FILE_NAME="Employer_searchCriteriaView.vim"/>


  <CLUSTER>
    <ACTION_SET
      ALIGNMENT="CENTER"
      BOTTOM="false"
    >
      <ACTION_CONTROL
        DEFAULT="true"
        IMAGE="SearchButton"
        LABEL="ActionControl.Label.Search"
        TYPE="SUBMIT"
      >
        <LINK PAGE_ID="THIS"/>
      </ACTION_CONTROL>


      <ACTION_CONTROL
        IMAGE="ResetButton"
        LABEL="ActionControl.Label.Reset"
      >
        <LINK PAGE_ID="Employer_duplicateRegistrationCheck"/>
      </ACTION_CONTROL>
    </ACTION_SET>
  </CLUSTER>


  <LIST TITLE="List.Title.SearchResults">
    <DETAILS_ROW>


      <INLINE_PAGE
        URI_SOURCE_NAME="ACTION"
        URI_SOURCE_PROPERTY="dtlsList$employerTabDetailsURL"
      />


    </DETAILS_ROW>


    <FIELD
      LABEL="Field.Title.TradingName"
      WIDTH="35"
    >
      <CONNECT>
        <SOURCE
          NAME="ACTION"
          PROPERTY="dtlsList$xmlTradingNameData"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Title.RegisteredName"
      WIDTH="30"
    >
      <CONNECT>
        <SOURCE
          NAME="ACTION"
          PROPERTY="dtlsList$xmlRegisteredNameData"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Title.AddressLineOne"
      WIDTH="35"
    >
      <CONNECT>
        <SOURCE
          NAME="ACTION"
          PROPERTY="dtlsList$formattedBusinessAddress"
        />
      </CONNECT>
    </FIELD>


  </LIST>
</VIEW>