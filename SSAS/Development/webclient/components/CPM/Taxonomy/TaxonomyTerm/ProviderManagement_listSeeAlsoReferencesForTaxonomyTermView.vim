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
<!-- in accordance with the terms of the license agreement you entered into  -->
<!-- Software.                                                               -->
<!-- Description -->
<!-- =========== -->
<!-- This page allows the user to view the list of associated terms.         -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <LIST>
    <ACTION_SET TYPE="LIST_ROW_MENU">


      <ACTION_CONTROL LABEL="ActionControl.Label.DeleteSeeAlsoReference">
        <CONDITION>
          <IS_FALSE
            NAME="DISPLAY"
            PROPERTY="inEditVersionExists"
          />
        </CONDITION>


        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_removeSeeAlsoReferenceFromPublisedTerm"
          WINDOW_OPTIONS="width=320"
        >
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="taxonomyTermID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="taxonomyTermID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="relatedTermID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="relatedTermID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </ACTION_SET>
    <FIELD
      LABEL="Field.Label.SeeAlsoReferences"
      WIDTH="100"
    >
      <LINK
        OPEN_MODAL="false"
        PAGE_ID="ProviderManagement_viewTaxonomyTerm"
      >


        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="taxonomyTermID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="taxonomyTermID"
          />
        </CONNECT>
      </LINK>
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="nameAndCode"
        />
      </CONNECT>
    </FIELD>
  </LIST>


</VIEW>
