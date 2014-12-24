<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2002-2006, 2010 Curam Software Ltd.                      -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- This page allows the user to register an employer.                     -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="primaryAddressID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="primaryAddressID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="businessAddressID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="businessAddressID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="registeredAddressID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="registeredAddressID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="concernRoleAddressRID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="concernRoleAddressRID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="concernRoleAddressBID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="concernRoleAddressBID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="primaryPhoneNumberID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="primaryPhoneNumberID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="concernRolePhoneNumberID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="concernRolePhoneNumberID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="commExceptionID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="commExceptionID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="contactID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="contactID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAY"
      PROPERTY="tradingStatusID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="tradingStatusID"
    />
  </CONNECT>


  <CLUSTER
    LABEL_WIDTH="35"
    NUM_COLS="2"
    TITLE="Cluster.Title.RegisteredOffice"
  >
    <FIELD LABEL="Field.Label.ReferenceNumber">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="socialSecurityNumber"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="socialSecurityNumber"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.RegistrationDate">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="registrationDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="registrationDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.RegisteredName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="registeredName"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="registeredName"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.PreferredLanguage"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="preferredLanguage"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="preferredLanguage"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.PreferredCommunication"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="prefCommMethod"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="prefCommMethod"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="35"
    NUM_COLS="2"
    TAB_ORDER="ROW"
    TITLE="Cluster.Title.RegisteredAddress"
  >
    <FIELD>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="registeredAddressData"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="registeredAddressData"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="35"
    NUM_COLS="2"
    TAB_ORDER="ROW"
    TITLE="Cluster.Title.BusinessAddress"
  >
    <FIELD>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="businessAddressData"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="businessAddressData"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="35"
    NUM_COLS="2"
    TITLE="Cluster.Title.FurtherDetails"
  >
    <FIELD
      LABEL="Field.Label.SpecialInterest"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >


      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="specialInterestType"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="specialInterestType"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.PermanentStaff"
      USE_DEFAULT="false"
      WIDTH="6"
      WIDTH_UNITS="CHARS"
    >


      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="permanentStaff"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="permanentStaff"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.CasualStaff"
      USE_DEFAULT="false"
      WIDTH="6"
      WIDTH_UNITS="CHARS"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="casualStaff"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="casualStaff"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.BusinessDescription">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="businessDescription"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="businessDescription"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="35"
    NUM_COLS="2"
    TITLE="Cluster.Title.TradingDetails"
  >
    <FIELD LABEL="Field.Label.TradingName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="tradingName"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="tradingName"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.TradingDate"
      USE_DEFAULT="false"
    >


      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="tradingDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="tradingDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.IndustryType">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="industryType"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="industryType"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.EmployerType"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >


      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="companyType"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="companyType"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.PublicOffice">
      <CONNECT>
        <INITIAL
          NAME="DISPLAY"
          PROPERTY="prefPublicOfficeName"
        />
      </CONNECT>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="prefPublicOfficeID"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="prefPublicOfficeID"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="35"
    NUM_COLS="2"
    TITLE="Cluster.Title.PhoneDetails"
  >
    <FIELD
      LABEL="Field.Label.PhoneType"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="phoneType"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="phoneType"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.AreaCode"
      WIDTH="5"
      WIDTH_UNITS="CHARS"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="phoneAreaCode"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="phoneAreaCode"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.Extension"
      WIDTH="5"
      WIDTH_UNITS="CHARS"
    >


      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="phoneExtension"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="phoneExtension"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.CountryCode"
      WIDTH="5"
      WIDTH_UNITS="CHARS"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="phoneCountryCode"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="phoneCountryCode"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Phone">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="phoneNumber"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="phoneNumber"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="35"
    NUM_COLS="2"
    TITLE="Cluster.Title.CompanyContact"
  >
    <FIELD
      LABEL="Field.Label.ContactTitle"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <!-- BEGIN, CR00096719, GM -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="companyContactTitle"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="companyContactTitle"
        />
      </CONNECT>
      <!-- END, CR00096719  -->
    </FIELD>
    <FIELD
      LABEL="Field.Label.ContactPhoneCountryCode"
      WIDTH="5"
      WIDTH_UNITS="CHARS"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="contactPhoneCountryCode"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="contactPhoneCountryCode"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ContactPhone">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="contactPhoneNumber"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="contactPhoneNumber"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Name">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="contactName"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="contactName"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.ContactPhoneAreaCode"
      WIDTH="5"
      WIDTH_UNITS="CHARS"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="contactPhoneAreaCode"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="contactPhoneAreaCode"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.Extension"
      WIDTH="5"
      WIDTH_UNITS="CHARS"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="contactPhoneExtension"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="contactPhoneExtension"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="35"
    NUM_COLS="2"
    TITLE="Cluster.Title.PaymentDetails"
  >


    <FIELD
      LABEL="Field.Label.MethodOfPayment"
      USE_BLANK="true"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="methodOfPmtCode"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.PaymentFrequency"
      USE_BLANK="true"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="paymentFrequency"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.Currency"
      USE_BLANK="true"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="currencyType"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="35"
    NUM_COLS="2"
    TITLE="Cluster.Title.CommunicationException"
  >
    <FIELD
      LABEL="Field.Label.Method"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="commExceptionMethodCode"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="commExceptionMethodCode"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.From"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="commExceptionFromDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="commExceptionFromDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.Reason"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="commExceptionReasonCode"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="commExceptionReasonCode"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.To"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="commExceptionToDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="commExceptionToDate"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
