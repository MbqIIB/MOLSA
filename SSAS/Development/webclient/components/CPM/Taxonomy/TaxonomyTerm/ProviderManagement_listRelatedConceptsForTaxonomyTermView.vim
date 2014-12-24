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
<!-- This page allows the user to list related concepts for the taxonomy     -->
<!-- term.                                                                   -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <LIST>
    <ACTION_SET TYPE="LIST_ROW_MENU">


      <ACTION_CONTROL LABEL="ActionControl.Label.RemoveRelatedConcept">
        <CONDITION>
          <IS_FALSE
            NAME="DISPLAY"
            PROPERTY="inEditVersionExists"
          />
        </CONDITION>
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="ProviderManagement_removeRelatedConceptFromTaxonomyTerm"
          WINDOW_OPTIONS="width=320"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="taxonomyTermRelatedConceptID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="taxonomyTermRelatedConceptID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </ACTION_SET>
    <FIELD
      LABEL="Field.Label.RelatedConcepts"
      WIDTH="50"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="relatedConceptName"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.RelatedConceptsCode"
      WIDTH="50"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="relatedConceptCode"
        />
      </CONNECT>
    </FIELD>
  </LIST>


</VIEW>
