<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2010, 2012 Curam Software Ltd.                               -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- This process allows the user to view a list of email addresses for an  -->
<!-- external party office member.                                          -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <SERVER_INTERFACE
    CLASS="ExternalParty"
    NAME="DISPLAY1"
    OPERATION="listOfficeMemberEmailAddress"
  />


  <INFORMATIONAL>
    <CONNECT>
      <SOURCE
        NAME="DISPLAY1"
        PROPERTY="informationMsgTxt"
      />
    </CONNECT>
  </INFORMATIONAL>


  <PAGE_PARAMETER NAME="officeMemberID"/>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="officeMemberID"
    />
    <TARGET
      NAME="DISPLAY1"
      PROPERTY="officeMemberID"
    />
  </CONNECT>


  <LIST>
    <DETAILS_ROW>
      <INLINE_PAGE PAGE_ID="ExternalParty_viewOfficeMemberEmailAddress">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY1"
            PROPERTY="concernRoleEmailAddressID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="concernRoleEmailAddressID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY1"
            PROPERTY="concernRoleName"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="description"
          />
        </CONNECT>
      </INLINE_PAGE>


    </DETAILS_ROW>


    <ACTION_SET TYPE="LIST_ROW_MENU">


      <ACTION_CONTROL LABEL="ActionControl.Label.Edit">
        <!-- BEGIN, CR00306326, SG -->
        <CONDITION>
          <IS_TRUE
            NAME="DISPLAY1"
            PROPERTY="activeIndOpt"
          />
        </CONDITION>
        <!-- END, CR00306326 -->
        <!-- Link to page DISPLAY1ing editable details of the email address-->
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ExternalParty_modifyOfficeMemberEmailAddressFromList"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY1"
              PROPERTY="concernRoleEmailAddressID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="concernRoleEmailAddressID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="officeMemberID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="officeMemberID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL LABEL="ActionControl.Label.Delete">
        <!-- BEGIN, CR00306326, SG -->
        <CONDITION>
          <IS_TRUE
            NAME="DISPLAY1"
            PROPERTY="activeIndOpt"
          />
        </CONDITION>
        <!-- END, CR00306326 -->
        <!-- Link to page DISPLAY1ing editable details of the email address-->
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ExternalParty_cancelOfficeMemberEmailAddress"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY1"
              PROPERTY="concernRoleEmailAddressID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="concernRoleEmailAddressID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="officeMemberID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="officeMemberID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


    </ACTION_SET>


    <FIELD
      LABEL="Field.Label.Primary"
      WIDTH="10"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="primaryInd"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.EmailAddress"
      WIDTH="36"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="emailAddress"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.Type"
      WIDTH="20"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="typeCode"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.From"
      WIDTH="12"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="startDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.To"
      WIDTH="12"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="endDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.Status"
      WIDTH="10"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY1"
          PROPERTY="statusCode"
        />
      </CONNECT>
    </FIELD>


  </LIST>


</VIEW>
