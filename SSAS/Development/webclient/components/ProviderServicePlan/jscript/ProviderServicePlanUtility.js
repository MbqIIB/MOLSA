/*
 * Copyright 2008, 2010 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information").  You shall not disclose such
 * Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

function getServiceOfferingName() {
  var serviceOfferingName;
  var serviceOfferingID; 
  var object;
  // BEGIN, CR00187444, ASN
  if(curam.util.isModalWindow() ){
  
    object = curam.util.isModalWindow();
  // END, CR00187444
  }
  else{
	// BEGIN, CR00187444, ASN
		object = curam.dialog.getParentWindow(window);
	// END, CR00187444
        }
  for(i=0; i <object.document.forms[0].elements.length; i++) {
        type = object.document.forms[0].elements[i].type;
        id = object.document.forms[0].elements[i].id;
        
        // Get Service Offering Name
        if(object.document.getElementById("ACTION$providerPlannedItemDetails$providerPlannedItemLink$serviceOfferingID_deschf") == null){
          if (id.indexOf("serviceOfferingName") != -1) {
             serviceOfferingName = object.document.forms[0].elements[i].value;
          } 
        }
        else{
             serviceOfferingName = object.document.getElementById("ACTION$providerPlannedItemDetails$providerPlannedItemLink$serviceOfferingID_deschf").value;
        }

        // Get Service Offering ID        
        if(object.document.getElementById("ACTION$providerPlannedItemDetails$providerPlannedItemLink$serviceOfferingID_value") == null){
          if (id.indexOf("serviceOfferingID") != -1) {
             serviceOfferingID = object.document.forms[0].elements[i].value;
          } 
        }
        else{
             serviceOfferingID = object.document.getElementById("ACTION$providerPlannedItemDetails$providerPlannedItemLink$serviceOfferingID_value").value;
        }         
    }
   for(i=0; i <document.forms[0].elements.length; i++) {
        type = document.forms[0].elements[i].type;
        id = document.forms[0].elements[i].id;
        if (id.indexOf("serviceOfferingName") != -1) {
              document.forms[0].elements[i].value = serviceOfferingName;                          
        }
        if (id.indexOf("serviceOfferingID") != -1) {
              document.forms[0].elements[i].value = serviceOfferingID;                          
        }        
    }

  return false;
}

