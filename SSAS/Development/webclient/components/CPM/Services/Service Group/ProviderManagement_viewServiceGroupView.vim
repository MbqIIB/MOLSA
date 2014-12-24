<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  PID 5725-H26
  
  Copyright IBM Corporation 2007, 2014. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007, 2009-2011 Curam Software Ltd.                           -->
<!-- All rights reserved.                                                    -->
<!-- This software is the confidential and proprietary information of Curam  -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose     -->
<!-- such Confidential Information and shall use it only in accordance with  -->
<!-- in accordance with the terms of the license agreement you entered into  -->
<!-- Software.                                                               -->
<!-- Description                                                             -->
<!-- =======================================                                 -->
<!-- This page allows the user to view service group details.                -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <!-- BEGIN, CR00233561, SK -->
  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.StaticText1"
      />
    </CONNECT>
    <CONNECT>
      <SOURCE
        NAME="DISPLAY"
        PROPERTY="result$serviceGroupDtls$name"
      />
    </CONNECT>
  </PAGE_TITLE>


  <SERVER_INTERFACE
    CLASS="MaintainServiceOffering"
    NAME="DISPLAY"
    OPERATION="viewServiceGroup"
  />


  <PAGE_PARAMETER NAME="serviceGroupID"/>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="serviceGroupID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="serviceGroupKey$serviceGroupID"
    />
  </CONNECT>


  <LIST TITLE="Cluster.Title.ServiceOfferingDetails">


    <FIELD LABEL="Field.Label.ServiceOfferingName">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="dtls$name"
        />
      </CONNECT>


      <LINK PAGE_ID="ProviderManagement_resolveServiceOffering">
        <CONNECT>
          <!-- BEGIN, CR00199014, PS -->
          <!-- BEGIN, CR00205039, PS -->
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="serviceOfferingID"
          />
          <!-- END, CR00205039 -->
          <!-- END, CR00199014 -->
          <TARGET
            NAME="PAGE"
            PROPERTY="serviceOfferingID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="serviceGroupID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="serviceGroupID"
          />
        </CONNECT>
      </LINK>
    </FIELD>
  </LIST>


  <LIST TITLE="Cluster.Title.ServiceGroupDetails">


    <ACTION_SET TYPE="LIST_ROW_MENU">
      <!-- BEGIN, CR00233745, SK -->
      <ACTION_CONTROL LABEL="ActionControl.Label.Edit">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_editServiceGroupFromList"
          WINDOW_OPTIONS="width=450"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="childGroups$serviceGroupID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="serviceGroupID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL LABEL="ActionControl.Label.CreateServiceGroup">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_createChildServiceGroup"
          WINDOW_OPTIONS="width=450"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="childGroups$serviceGroupID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="parentServiceGroupID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      <ACTION_CONTROL LABEL="ActionControl.Label.AddExistingServiceGroup">


        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_addServiceGroupToAnotherServiceGroup"
          WINDOW_OPTIONS="width=300"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="childGroups$serviceGroupID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="parentServiceGroupID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      <ACTION_CONTROL LABEL="ActionControl.Label.Delete">
        <!-- BEGIN, CR00246368, PS -->
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_cancelServiceGroupFrmList"
        >
          <!-- END, CR00246368 -->
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="childGroups$serviceGroupID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="serviceGroupID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="childGroups$versionNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="versionNo"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      <!-- END, CR00233745 -->


      <ACTION_CONTROL LABEL="ActionControl.Label.Remove">
        <!-- BEGIN, CR00187417, PS -->
        <!-- BEGIN, CR00197421, PS -->
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_removeServiceGroupFromParentServiceGroup"
          WINDOW_OPTIONS="width=300"
        >
          <!-- END, CR00197421 -->
          <!-- END, CR00187417 -->
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="childGroups$serviceGroupID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="serviceGroupID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="childGroups$versionNo"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="versionNo"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="childGroups$name"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="serviceGroupName"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="serviceGroupDtls$serviceGroupID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="parentServiceGroupID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </ACTION_SET>


    <FIELD
      LABEL="Field.Label.ServiceGroupName"
      WIDTH="30"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="childGroups$name"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.ChildGroup.Reference"
      WIDTH="20"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="childGroups$reference"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.ChildGroup.Description"
      WIDTH="40"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="childGroups$description"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.ChildGroup.Status"
      WIDTH="10"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="childGroups$recordStatus"
        />
      </CONNECT>
    </FIELD>


    <DETAILS_ROW>
      <INLINE_PAGE PAGE_ID="ProviderManagement_viewServiceGroupFrmList">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="childGroups$serviceGroupID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="serviceGroupID"
          />
        </CONNECT>
      </INLINE_PAGE>
    </DETAILS_ROW>
  </LIST>


  <!-- END, CR00198609 -->


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Comments"
  >
    <!-- BEGIN, CR00417165, GK -->
    <FIELD
      HEIGHT="3"
      LABEL="Field.Label.Comments"
    >
      <!-- END, CR00417165 -->
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="comments"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  <!-- END, CR00233561 -->


</VIEW>
