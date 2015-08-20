<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2010 Curam Software Ltd.                                 -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- Views an Referral                                                      -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <PAGE_PARAMETER NAME="referralID"/>


  <SERVER_INTERFACE
    CLASS="Referral"
    NAME="DISPLAY"
    OPERATION="readReferralDetails"
    PHASE="DISPLAY"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="referralID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="referralKey$referralID"
    />
  </CONNECT>


  <CLUSTER
    LABEL_WIDTH="35"
    NUM_COLS="2"
  >
    <FIELD LABEL="Field.Label.FollowUpRequired">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="followUpRequiredInd"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.ClientContactedProvider">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="clientContactedProviderInd"
        />
      </CONNECT>
    </FIELD>
    <CONTAINER LABEL="Container.Label.Added">
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="createdOpt"
          />
        </CONNECT>
      </FIELD>
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="createdByFullNameOpt"
          />
        </CONNECT>
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="Organization_viewUserDetails"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="createdBy"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="userName"
            />
          </CONNECT>
        </LINK>
      </FIELD>
    </CONTAINER>
    <FIELD LABEL="Field.Label.FollowUpWarningDays">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="followUpWarningDays"
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
    <FIELD LABEL="Field.Label.Status">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="referralDtls$recordStatus"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="35"
    NUM_COLS="2"
    TITLE="Cluster.Title.Provider"
  >
    <CONDITION>
      <IS_TRUE
        NAME="DISPLAY"
        PROPERTY="providerRepresentativeInd"
      />
    </CONDITION>
    <FIELD LABEL="Field.Label.Name">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerName"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Address">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerAddress"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Phone">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerPhoneNumber"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Email">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerEmailAddress"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="35"
    NUM_COLS="2"
    TITLE="Cluster.Title.Provider"
  >
    <CONDITION>
      <IS_TRUE
        NAME="DISPLAY"
        PROPERTY="providerCPMInd"
      />
    </CONDITION>
    <FIELD LABEL="Field.Label.Name">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerName"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Address">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerAddress"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Phone">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerPhoneNumber"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Email">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="providerEmailAddress"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER NUM_COLS="2">


    <LIST TITLE="List.Title.NotificationLetters">
      <CONTAINER LABEL="Field.Label.Letters">
        <ACTION_CONTROL
          LABEL="Text.Letter"
          TYPE="FILE_DOWNLOAD"
        >
          <LINK>
            <CONNECT>
              <SOURCE
                NAME="DISPLAY"
                PROPERTY="notificationDocumentDetails$referralID"
              />
              <TARGET
                NAME="PAGE"
                PROPERTY="referralID"
              />
            </CONNECT>
            <CONNECT>
              <SOURCE
                NAME="DISPLAY"
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
                PROPERTY="documentType"
              />
              <TARGET
                NAME="PAGE"
                PROPERTY="documentType"
              />
            </CONNECT>
          </LINK>
        </ACTION_CONTROL>


        <FIELD ALIGNMENT="LEFT">
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="concernRoleName"
            />
          </CONNECT>
        </FIELD>
      </CONTAINER>


    </LIST>


    <CLUSTER
      SHOW_LABELS="false"
      TITLE="Cluster.Title.Reason"
    >
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="reason"
          />
        </CONNECT>
      </FIELD>
    </CLUSTER>
  </CLUSTER>


</VIEW>
