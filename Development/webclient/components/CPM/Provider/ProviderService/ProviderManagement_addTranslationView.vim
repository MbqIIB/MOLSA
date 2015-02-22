<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2009, 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2009-2010 Curam Software Ltd.                                                 -->
<!-- All rights reserved.                                                                                       -->
<!-- This software is the confidential and proprietary information of Curam      -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose             -->
<!-- such Confidential Information and shall use it only in accordance with       -->
<!-- the terms of the license agreement you entered into with Curam              -->
<!-- Software.                                                                                                     -->
<!-- This page is a generic page which allows the user to add a text                -->
<!-- translation to a localized text.                                                                    -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <!-- BEGIN, CR00205479, PS -->
  <CLUSTER
    LABEL_WIDTH="30"
    NUM_COLS="1"
  >
    <!-- BEGIN, CR00228396, PS -->
    <FIELD
      LABEL="Field.Title.Language"
      WIDTH="70"
    >
      <!-- END, CR00228396 -->
      <!-- END, CR00205479 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="localizableTextTranslationDetails$localeCode"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <!-- BEGIN, CR00342151, PS -->
  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Text"
  >
    <FIELD
      HEIGHT="4"
      LABEL="Field.Title.Text"
    >
      <!-- END, CR00342151 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="localizableTextTranslationDetails$text"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
</VIEW>
