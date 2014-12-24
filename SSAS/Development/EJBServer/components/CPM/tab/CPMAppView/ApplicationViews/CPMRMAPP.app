<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!--
  Copyright 2010-2011 Curam Software Ltd.
  All rights reserved.
  
  This software is the confidential and proprietary information of Curam
  Software, Ltd. ("Confidential Information"). You shall not disclose
  such Confidential Information and shall use it only in accordance with the
  terms of the license agreement you entered into with Curam Software.
-->
<ac:application xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xmlns:ac="http://www.curamsoftware.com/curam/util/client/application-config"
 id="CPMRMAPP"
 logo="CPMRMAPP.logo"
 title="CPMRMAPP.title"
 subtitle="CPMRMAPP.subtitle"
 user-message="CPMRMAPP.UserMessage">

  <ac:application-menu>
    <ac:preferences title="preferences.title"/>
    <ac:help title="help.title"/>
    <ac:logout title="logout.title"/>
  </ac:application-menu>
  
  <!-- BEGIN, CR00281847, SS -->
  <ac:application-search default-search-page="ProviderOrganization_resolveApplicationSearch" initial-text="Application.Search.InitialText"/>
  <!-- END, CR00281847 -->
  
  <ac:section-ref id="CPMRMAPPHomeSection"/>
  <ac:section-ref id="CPMRMAPPWorkspaceSection"/>
  <ac:section-ref id="DefaultAppInboxSection"/>
  <ac:section-ref id="DefaultAppCalendarSection"/>  
    
</ac:application>