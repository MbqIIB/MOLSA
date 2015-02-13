<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2007, 2013. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007, 2009-2011 Curam Software Ltd.                          -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- This page allows the user to enter provider registration details.      -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <!-- BEGIN, CR00247036, PS -->
  <CLUSTER
    LABEL_WIDTH="50"
    NUM_COLS="2"
  >
    <!-- END, CR00247036 -->


    <!-- BEGIN, CR00178272, AK -->


    <FIELD LABEL="Field.Label.ProviderName">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$providerName"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00228396, PS -->
    <FIELD
      LABEL="Field.Label.PreferredLanguage"
      USE_DEFAULT="true"
    >
      <!-- END, CR00228396 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$prefLanguage"
        />
      </CONNECT>
    </FIELD>


    <FIELD CONTROL="SKIP"/>


    <!-- BEGIN, CR00228396, PS -->
    <FIELD
      LABEL="Field.Label.PreferredCommunication"
      USE_DEFAULT="true"
    >
      <!-- END, CR00228396 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$prefCommMethod"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.PreferredSEMethod"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$preferredServiceEnquiryMethod"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <!-- BEGIN, CR00235660, PS -->
  <CLUSTER
    LABEL_WIDTH="30"
    NUM_COLS="2"
    TAB_ORDER="ROW"
    TITLE="Cluster.Title.PrimaryAddress"
  >
    <!-- END, CR00235660 -->


    <FIELD>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$addressData"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <!-- BEGIN, CR00235660, PS -->
  <CLUSTER
    LABEL_WIDTH="30"
    NUM_COLS="2"
    TITLE="Cluster.Title.PhoneNumber"
  >
    <!-- END, CR00235660 -->


    <FIELD
      LABEL="Field.Label.PhoneType"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$phoneType"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.AreaCode"
      WIDTH="5"
      WIDTH_UNITS="CHARS"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$phoneAreaCode"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.Extension"
      WIDTH="5"
      WIDTH_UNITS="CHARS"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$phoneExtension"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.CountryCode"
      WIDTH="5"
      WIDTH_UNITS="CHARS"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$phoneCountryCode"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.Phone">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$phoneNumber"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <!-- BEGIN, CR00247586, PS -->
  <CLUSTER
    LABEL_WIDTH="34"
    NUM_COLS="2"
    TITLE="Cluster.Title.BankDetails"
  >
    <!-- END, CR00247586 -->


    <!-- BEGIN, CR00377006, GA -->
    <CONDITION>
      <IS_FALSE
        NAME="DISPLAY1"
        PROPERTY="ibanInd"
      />
    </CONDITION>
    <!-- END, CR00377006 -->


    <FIELD
      LABEL="Field.Label.AccountName"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$bankAccountName"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.BankBranchName"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$bankSortCode"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.JointAccount"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$bankJointAccount"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.AccountNumber"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$bankAccountNumber"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.AccountType"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$bankAccountType"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>
  <!-- BEGIN, CR00377006, GA -->
  <CLUSTER
    LABEL_WIDTH="34"
    NUM_COLS="2"
    TITLE="Cluster.Title.BankDetails"
  >
    <CONDITION>
      <IS_TRUE
        NAME="DISPLAY1"
        PROPERTY="ibanInd"
      />
    </CONDITION>


    <FIELD
      LABEL="Field.Label.IBAN"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$ibanOpt"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.AccountName"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$bankAccountName"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.BankBranchName"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$bankSortCode"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.JointAccount"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$bankJointAccount"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.BIC"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$bicOpt"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.AccountNumber"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$bankAccountNumber"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.AccountType"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$bankAccountType"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>
  <!-- END, CR00377006 -->


  <!-- BEGIN, CR00247586, PS -->
  <CLUSTER
    LABEL_WIDTH="38"
    NUM_COLS="2"
    TITLE="Cluster.Title.PaymentDetails"
  >
    <!-- END, CR00247586 -->


    <FIELD
      LABEL="Field.Label.MethodOfPayment"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$methodOfPayment"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00234082, GP -->
    <FIELD
      LABEL="Field.Label.Currency"
      USE_DEFAULT="true"
      WIDTH="92"
    >
      <!-- END, CR00234082 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$currencyType"
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
          PROPERTY="dtls$providerEnrollmentDetails$paymentFrequency"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>
  <!-- BEGIN, CR00137151, AS -->
  <!-- BEGIN, CR00236707, PS -->
  <CLUSTER
    LABEL_WIDTH="15"
    NUM_COLS="1"
    SHOW_LABELS="false"
    TITLE="Cluster.Title.ProviderCategoryType"
  >
    <!-- BEGIN, CR00235660, PS -->
    <!-- BEGIN, CR00246230, SS -->
    <FIELD
      CONFIG="CT_DISPLAY_LABELS"
      CONTROL="CT_HIERARCHY_VERTICAL"
      LABEL="Field.Label.Category"
      WIDTH="50"
    >
      <!-- END, CR00246230 -->
      <!-- END, CR00236707 -->
      <!-- END, CR00235660 -->
      <!-- END, CR00137151 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$providerCategory"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>
  <!-- BEGIN, CR00247036, PS -->
  <!-- BEGIN, CR00247586, PS -->
  <CLUSTER
    LABEL_WIDTH="50"
    NUM_COLS="2"
    TITLE="Cluster.Title.AdditionalInformation"
  >
    <!-- END, CR00247586 -->
    <FIELD
      LABEL="Field.Label.PhysicalCapacity"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$physicalCapacityString"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.ReservationGracePeriod"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$reservationGracePeriodString"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.DesignatedCapacity"
      USE_BLANK="true"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$providerEnrollmentDetails$designatedCapacityString"
        />
      </CONNECT>
    </FIELD>


    <FIELD LABEL="Field.Label.AcceptCWReferral">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$acceptCWReferral"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>


  <!-- BEGIN, CR00180149, ASN -->
  <!-- BEGIN, CR00235660, PS -->
  <CLUSTER
    LABEL_WIDTH="16"
    NUM_COLS="1"
  >
    <!-- END, CR00247036 -->
    <!-- END, CR00235660 -->
    <!-- BEGIN, CR00235660, PS -->
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.AreasServedInfo"
    >
      <!-- END, CR00235660 -->
      <!-- END, CR00180149 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$areasServedInformation"
        />
      </CONNECT>
    </FIELD>
    <!-- BEGIN, CR00235660, PS -->
    <FIELD
      HEIGHT="4"
      LABEL="Field.Label.ClientInfo"
    >
      <!-- END, CR00235660 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="dtls$clientInformation"
        />
      </CONNECT>
    </FIELD>


  </CLUSTER>
  <!-- END, CR00178272 -->
</VIEW>
