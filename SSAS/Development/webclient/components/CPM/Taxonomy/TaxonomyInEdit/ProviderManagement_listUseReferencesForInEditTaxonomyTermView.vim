<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2010 Curam Software Ltd.                                      -->
<!-- All rights reserved.                                                    -->
<!-- This software is the confidential and proprietary information of Curam  -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose     -->
<!-- such Confidential Information and shall use it only in accordance with  -->
<!-- the terms of the license agreement you entered into with Curam          -->
<!-- Software.                                                               -->
<!-- Description -->
<!-- =========== -->
<!-- This page allows the user to view a list of use references for a        -->
<!-- taxonomy term.                                                          -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <LIST>
    <ACTION_SET TYPE="LIST_ROW_MENU">


      <ACTION_CONTROL LABEL="ActionControl.Label.DeleteUseReference">
        <CONDITION>
          <IS_FALSE
            NAME="DISPLAY"
            PROPERTY="isPublished"
          />
        </CONDITION>
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_removeUseReferenceFromInEditTerm"
          WINDOW_OPTIONS="width=320"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="taxonomyInEditDataID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="taxonomyInEditDataID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="useReferenceName"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="useReferenceName"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </ACTION_SET>
    <CONTAINER LABEL="Field.Label.UseReferences">
      <FIELD WIDTH="100">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="useReferenceName"
          />
        </CONNECT>
      </FIELD>


      <ACTION_CONTROL
        IMAGE="LocalizableTextTranslation"
        LABEL="ActionControl.Label.TextTranslation"
      >
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_viewInEditTermTextTranslation"
          WINDOW_OPTIONS="width=600"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="taxonomyInEditDataID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="taxonomyInEditDataID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="useReferenceTranslationType"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="translationType"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="referenceNameForLocalization"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="originalText"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>
  </LIST>


</VIEW>
