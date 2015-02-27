<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2003, 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2003-2007,2009, 2010 Curam Software Ltd.                 -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- in accordance with the terms of the license agreement you entered into -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- Organization users homepage.                                           -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.StaticText1"
      />
    </CONNECT>
  </PAGE_TITLE>


  <SHORTCUT_TITLE ICON="user.icon">
    <CONNECT>
      <SOURCE
        NAME="DISPLAY"
        PROPERTY="description"
      />
    </CONNECT>
  </SHORTCUT_TITLE>


  <!-- BEGIN, CR00216807 MN-->
  <SERVER_INTERFACE
    CLASS="Organization"
    NAME="DISPLAY"
    OPERATION="readOrganizationUserHomePage"
  />
  <!-- END, CR00216807-->


  <PAGE_PARAMETER NAME="userName"/>
  <!-- <PAGE_PARAMETER NAME="organisationUnitID" /> -->
  <PAGE_PARAMETER NAME="organisationStructureID"/>


  <INFORMATIONAL>
    <CONNECT>
      <SOURCE
        NAME="DISPLAY"
        PROPERTY="informationMsgTxt"
      />
    </CONNECT>
  </INFORMATIONAL>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="userName"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$userKeyStruct$userName"
    />
  </CONNECT>


  <ACTION_SET>
    <ACTION_CONTROL LABEL="ActionControl.Label.Edit">
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Organization_modifyUserFromHome"
      >
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="userName"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="userName"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>


    <SEPARATOR/>


    <ACTION_CONTROL LABEL="ActionControl.Label.EnableAccount">
      <CONDITION>
        <IS_FALSE
          NAME="DISPLAY"
          PROPERTY="accountEnabled"
        />
      </CONDITION>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Organization_enableUser"
      >
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="userName"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="userName"
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


    <ACTION_CONTROL LABEL="ActionControl.Label.DisableAccount">
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="accountEnabled"
        />
      </CONDITION>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Organization_disableUser"
      >
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="userName"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="userName"
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


    <ACTION_CONTROL LABEL="ActionControl.Label.CloseUser">
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Organization_closeOrganizationUser"
      >
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="userName"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="userName"
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


    <ACTION_CONTROL LABEL="ActionControl.Label.Reopen">
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Organization_reopenUser"
      >
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="userName"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="userName"
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


    <SEPARATOR/>


    <ACTION_CONTROL LABEL="ActionControl.Label.Delete">
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Organization_cancelUser"
      >
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="userName"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="userName"
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


  <CLUSTER
    LABEL_WIDTH="40"
    NUM_COLS="2"
  >
    <!-- BEGIN, CR00342800, KRK -->
    <FIELD LABEL="Field.Label.FirstName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="firstname"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00342800 -->


    <!-- BEGIN, CR00159851, NP -->
    <FIELD LABEL="Field.Label.DefaultLocale">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="defaultLocale"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00159851 -->


    <CONTAINER LABEL="Container.Label.BusinessPhone">
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="businessCountryCode"
          />
        </CONNECT>
      </FIELD>
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="businessAreaCode"
          />
        </CONNECT>
      </FIELD>
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="businessNumber"
          />
        </CONNECT>
      </FIELD>
    </CONTAINER>
    <FIELD LABEL="Field.Label.BusinessPhoneExt">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="businessPhoneExtn"
        />
      </CONNECT>
    </FIELD>


    <CONTAINER LABEL="Container.Label.BusinessPager">
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="pagerCountryCode"
          />
        </CONNECT>
      </FIELD>
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="pagerAreaCode"
          />
        </CONNECT>
      </FIELD>
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="pagerNumber"
          />
        </CONNECT>
      </FIELD>
    </CONTAINER>


    <FIELD LABEL="Field.Label.BusinessEmail">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="businessEMail"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00342800, KRK -->
    <FIELD LABEL="Field.Label.LastName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="surname"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00342800 -->


    <FIELD LABEL="Field.Label.Location">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="locationName"
        />
      </CONNECT>
      <LINK PAGE_ID="Organization_locationHome">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="locationID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="locationID"
          />
        </CONNECT>
      </LINK>
    </FIELD>
    <CONTAINER LABEL="Container.Label.PersonalPhone">
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="personalCountryCode"
          />
        </CONNECT>
      </FIELD>
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="personalAreaCode"
          />
        </CONNECT>
      </FIELD>
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="personalNumber"
          />
        </CONNECT>
      </FIELD>
    </CONTAINER>


    <CONTAINER LABEL="Container.Label.BusinessMobile">
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="mobileCountryCode"
          />
        </CONNECT>
      </FIELD>
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="mobileAreaCode"
          />
        </CONNECT>
      </FIELD>
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="mobileNumber"
          />
        </CONNECT>
      </FIELD>
    </CONTAINER>
    <CONTAINER LABEL="Container.Label.BusinessFax">
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="faxCountryCode"
          />
        </CONNECT>
      </FIELD>
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="faxAreaCode"
          />
        </CONNECT>
      </FIELD>
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="faxNumber"
          />
        </CONNECT>
      </FIELD>
    </CONTAINER>


    <FIELD LABEL="Field.Label.PersonalEmail">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="personalEMail"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="40"
    NUM_COLS="2"
    TITLE="Cluster.Label.FurtherDetails"
  >


    <FIELD LABEL="Field.Label.UserName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="organizationUserDetails$userName"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.Role">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="roleName"
        />
      </CONNECT>
    </FIELD>


    <CONTAINER LABEL="Field.Label.AccountEnabled">
      <!-- BEGIN, CR00050298, MR -->
      <!-- BEGIN, HARP 64908, SP -->
      <FIELD LABEL="Field.Label.AccountEnabled">
        <!-- END, HARP 64908 -->
        <!-- END, CR00050298 -->
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="accountEnabled"
          />
        </CONNECT>
      </FIELD>
    </CONTAINER>


    <FIELD LABEL="Field.Label.CreationDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="creationDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.LoginRestrictions">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="loginRestrictions"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.PasswordExpiryDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="passwordDaysExpireOn"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.Sensitivity">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="sensitivity"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.CallCentreUser">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="ctiEnabled"
        />
      </CONNECT>
    </FIELD>


    <CLUSTER>
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="alternateLoginEnabled"
        />
      </CONDITION>
      <FIELD LABEL="Field.Label.LoginID">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="loginId"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>


    <FIELD LABEL="Field.Label.Application">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="applicationCode"
        />
      </CONNECT>
    </FIELD>


    <CONTAINER LABEL="Field.Label.RedirectTasks">
      <FIELD LABEL="Field.Label.RedirectTasks">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="assigneeFullName"
          />
        </CONNECT>
      </FIELD>
      <ACTION_CONTROL
        APPEND_ELLIPSIS="false"
        LABEL="ActionControl.Label.TaskRedirection"
      >
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="Organization_taskRedirectionForUser"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="userName"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="userName"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="description"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="userFullName"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>


    <FIELD LABEL="Field.Label.EndDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="endDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.LoginFailures">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="loginFailures"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.AccountExpiryDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="passwordExpiresOn"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.Status">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="statusCode"
        />
      </CONNECT>
    </FIELD>


    <CONTAINER LABEL="Field.Label.DefaultPrinter">
      <FIELD LABEL="Field.Label.DefaultPrinter">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="defaultPrinterName"
          />
        </CONNECT>
      </FIELD>


      <ACTION_CONTROL
        APPEND_ELLIPSIS="false"
        LABEL="ActionControl.Label.Change"
      >
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="Organization_modifyPrinterForUser"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="userName"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="userName"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>


  </CLUSTER>


  <!-- BEGIN, CR00088817, NB -->
  <!-- END, CR00088817 -->


</VIEW>