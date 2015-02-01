<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2008, 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2008, 2010, 2012 Curam Software Ltd.                               -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- This page list all the attachments for a provider contract.            -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <SERVER_INTERFACE
    CLASS="ContractManagement"
    NAME="DISPLAY"
    OPERATION="listContractAttachment"
    PHASE="DISPLAY"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="contractVersionID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="contractVersionKey$contractVersionID"
    />
  </CONNECT>


  <LIST>
    <!-- BEGIN, CR00198612, SS -->
    <ACTION_SET TYPE="LIST_ROW_MENU">
      <!-- END, CR00198612 -->
      <ACTION_CONTROL LABEL="ActionControl.Label.Edit">
        <!-- BEGIN, CR00207545, SS -->
        <!-- BEGIN, CR00197352, SS -->
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="Attachment_modify"
          WINDOW_OPTIONS="width=620"
        >
          <!-- END, CR00197352 -->
          <!-- END, CR00207545 -->
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="attachmentLinkID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="attachmentLinkID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="pageContextDescription"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="description"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      <!-- BEGIN, CR00234876, RPB -->
      <ACTION_CONTROL LABEL="ActionControl.Label.Delete">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="Attachment_cancel"
          WINDOW_OPTIONS="width=400"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="attachmentLinkID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="attachmentLinkID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="pageContextDescription"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="description"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="attachmentLinkDtls$versionNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="versionNo"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      <!-- END, CR00234876 -->


    </ACTION_SET>
    <!-- END, CR00198612 -->


    <!-- BEGIN, CR00207545, SS -->
    <!-- BEGIN, CR00314725, SS -->
    <FIELD
      LABEL="List.Title.Description"
      WIDTH="70"
    >
      <!-- END, CR00207545 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="description"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="List.Title.ReceiptDate"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="receiptDate"
        />
      </CONNECT>
    </FIELD>
    <!-- END, CR00314725 -->


    <!-- BEGIN, CR00207545, SS -->
    <FIELD
      LABEL="List.Title.Status"
      WIDTH="20"
    >
      <!-- END, CR00207545 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="attachmentStatus"
        />
      </CONNECT>
    </FIELD>


    <!-- BEGIN, CR00198612, SS -->
    <DETAILS_ROW>
      <INLINE_PAGE PAGE_ID="Attachment_view">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="attachmentLinkID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="attachmentLinkID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="pageContextDescription"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="description"
          />
        </CONNECT>
      </INLINE_PAGE>
    </DETAILS_ROW>
    <!-- END, CR00198612 -->
  </LIST>


</VIEW>
