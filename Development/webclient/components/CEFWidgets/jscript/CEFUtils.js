/*
 * IBM Confidential
 *
 * OCO Source Materials
 *
 * Copyright IBM Corporation 2012, 2013.
 *
 * The source code for this program is not published or otherwise divested of
 * its trade secrets, irrespective of what has been deposited with the US
 * Copyright Office.
 */
/*
 * Copyright 2011 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

/* Modification History
 * ====================
 * 07-May-2013  SD  [CR00383002]  Add require statement for curam.util.Dialog
 * 06-Apr-2013  SD  [CR00375669]  Added toggleAriaPressed function.
 * 28-Oct-2011  BD  [CR00296073]  Add function to open a modal dialog. 
 * 01 Jun 2011  SD  [CR00267939]  keyPressExist function added, prevents 
 *                                over-riding of click functionality with key
 *                                presses. 
 */
 var CEFUtils={
    
    /**
     * Returns true is key press event is triggered by the enter key.
     * Used by context panel toggle icon and list/cluster toggle icons.
     */  
    enterKeyPress: function(event) { 
      if (event.keyCode === 13) {
        return true;
      }
    },
    
    /**
     * Utility method to check if a key press event exists.
     */
    keyPressExist: function(event) {
      if (event.type === "keypress") {
        return true;
      }
    },
    
    /**
     * Open a modal using the URL of the event passed in.
     *
     * @param event the event raised by the users action.
     * @param size
     * 
     * @return the UimDialog object.
     */
    showInModal: function(event, size) {

      // IE doesn't pass event as argument.
      event = event || window.event; 

      // IE doesn't use .target
      var tgt = event.target || event.srcElement; 

      // stop the original event from being processed
      dojo.stopEvent(event); 
      
      // open the dialog.
      dojo.require('curam.util.UimDialog');
      return curam.util.UimDialog.openUrl(tgt.href, size);
    },
    
    /**
     * Toggles the aria-pressed tag attribute within specified DOM node. 
     * The parent identifier is required to set all associated aria-pressed
     * attributes to false to reset the values prior to the true state
     * being applied to the specified DOM node.
     *
     * @param parentId DOM node identifier of parent element.
     * @param id DOM node identifier of attribute to be updated.
     * 
     */    
    toggleAriaPressed: function(parentId, id) {
  
      // look for all immediate child <DIV>'s within DIV with specified ID
      var searchString = 'div#' + parentId + ' > div';
    
      // By setting all 'aria-pressed' attributes to be false, this removes the
      // previous state of any buttons which have been selected to be true
      dojo.query(searchString).forEach(
        function(labelElem) {
          dojo.attr(labelElem, "aria-pressed", "false");
        }
      );
    
      // only update specified button attribute
      dojo.attr(id, "aria-pressed", "true");
    }   
};

