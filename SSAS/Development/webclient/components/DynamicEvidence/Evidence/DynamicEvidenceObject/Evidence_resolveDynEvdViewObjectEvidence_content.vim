<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012-2014. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2005-2006, 2008 Curam Software Ltd.                      -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- Resolver to find the evidence view page for the customer evidence      -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <JSP_SCRIPTLET>
    
      curam.omega3.request.RequestHandler 
        rh = curam.omega3.request.RequestHandlerFactory.getRequestHandler(request);

      String context = request.getContextPath() + "/";
      context += curam.omega3.user.UserPreferencesFactory.getUserPreferences(pageContext.getSession()).getLocale() + "/";
      String successionID = request.getParameter("successionID");
      String evType = request.getParameter("evidenceType");

      curam.interfaces.EvidencePkg.Evidence_getEvidenceAndCaseFromSuccession_TH
        resolveEvidenceAndCase = new curam.interfaces.EvidencePkg.Evidence_getEvidenceAndCaseFromSuccession_TH();
      resolveEvidenceAndCase.setFieldValue(resolveEvidenceAndCase.key$successionID_idx, successionID);
      resolveEvidenceAndCase.callServer();
      
      String caseID = resolveEvidenceAndCase.getFieldValue(resolveEvidenceAndCase.result$caseIDKey$caseID_idx);
      String evidenceType = resolveEvidenceAndCase.getFieldValue(resolveEvidenceAndCase.result$evidenceKey$evType_idx);
      String evidenceID = resolveEvidenceAndCase.getFieldValue(resolveEvidenceAndCase.result$evidenceKey$evidenceID_idx);

      curam.interfaces.DynamicEvidenceMaintenancePkg.DynamicEvidenceMaintenance_getPageName_TH
      dem = new curam.interfaces.DynamicEvidenceMaintenancePkg.DynamicEvidenceMaintenance_getPageName_TH();
      dem.setFieldValue(dem.key$evidenceId_idx, evidenceID);
      dem.setFieldValue(dem.key$type_idx, evType);
      dem.callServer();           
      
      
      //get the evidence type version effective Date part name of the Dynamic Evidence UIM page.
      String effectiveDate = dem.getFieldValue(dem.result$datePart_idx);
      
            
      String pageName="";
      String url = "";
  
      if (successionID == null) {
       core.ScriptletMissingParamException e = new
                core.ScriptletMissingParamException(-20002, "successionID");
       System.out.println(e);
       throw e;
      }     
       
      pageName="DynEvd_viewObject_" + evType + "_" + effectiveDate + "_false_Evidence";
       
            
      // Get the evidence ID attribute name
      String successionIDAttributeName = "successionID";
      
     url = context + curam.omega3.request.RequestUtils.escapeURL(pageName) + "Page.do?" + curam.omega3.request.RequestUtils.escapeURL(successionIDAttributeName) + "=" + curam.omega3.request.RequestUtils.escapeURL(successionID); 
     url += "&amp;" + "caseID=" + curam.omega3.request.RequestUtils.escapeURL(caseID);
     url += "&amp;" + "evidenceType=" + curam.omega3.request.RequestUtils.escapeURL(evidenceType);
     url += "&amp;" + "effectiveDate=" + curam.omega3.request.RequestUtils.escapeURL(effectiveDate);   
     url += "&amp;" + "evidenceID=" + curam.omega3.request.RequestUtils.escapeURL(evidenceID);          
     url += "&amp;" + rh.getSystemParameters();  
    
     response.sendRedirect(response.encodeRedirectURL(url));      
      
    
  </JSP_SCRIPTLET>
</VIEW>