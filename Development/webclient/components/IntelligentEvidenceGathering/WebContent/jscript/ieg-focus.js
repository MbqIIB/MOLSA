/* 
 * Licensed Materials - Property of IBM
 * 
 * Copyright IBM Corporation 2013,2014. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure 
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
 
/**
 * Default Focus.
 * This is the fallback position. 
 * Sets initial focus on print link.
 */
dojo.subscribe("ieg-page-loaded", function() {
  // scroll the page to the top
  focusManager._scrollToTop();

  focusManager.checkDefaultFocus();
}); 
 
/**
 * Collections of functions related to setting focus on an IEG script page.
 */
var focusManager = {
  /**
  * Sets the initial page focus to the first input field.
  */
  setInitialFocus: function() {
    // Find all inputs
    var inputs = dojo.query("input, select, textarea");

    var positions = {};
    inputs = inputs
      .filter(function(n){
        // Filter out hidden nodes & nodes that can't be tabbed to
        return n.offsetWidth > 0 && n.tabIndex >= 0;
      })
      .forEach(function(input){
        // Store the positions of each node just once
        var id = dojo.attr(input, "id") || dojo.attr(input, "name");
        var value = dojo.attr(input, "value") || "";
        positions[id + value] = dojo.position(input);
      })
      .some(function(input){
        try {
          // set the focus on the first element.
          if (dojo.isIE) {
            setTimeout(function() { input.focus(); }, 10);
          } else {
            input.focus();
          }
          return true;
        } catch(e){
          return false;
        }
      });
  },
  
  /**
  * Sets the page focus to the validation panel. 
  */
  setMessagesFocus: function() {
    var messages = dojo.query("#ieg-error-messages")[0];  
    if(messages) {
      setTimeout(function() { messages.focus(); }, 10);
    }
  },
  
  /**
   * Set the default focus to the print link if there are no input 
   * elements present on the current page.
   */
  setDefaultFocus:function() {
    // set the focus to the print link (if it exists)
    dijit.focus(dojo.byId('printItem'));
  },
  
  /**
   * Checks for input elements on the page before setting the default focus.
   */
  checkDefaultFocus:function() {
    // look for possible elements to focus on
    var inputs1 = dojo.query("input[type=text]");
    var inputs2 = dojo.query("input[type=radio]");
    var inputs3 = dojo.query("input[type=checkbox]");
    var selects = dojo.query("select");
    var fields = inputs1 + selects + inputs2 + inputs3;
    if (fields.length == 0) {
      focusManager.setDefaultFocus();
    }
  },
  
  /**
   * Scroll to the top of the page.
   */
  _scrollToTop:function() {
    if(ieg.isInModal()) {
      dojo.query('.modalForm')[0].scrollTop = 0;      
    } else {
      dojo.query('.tabForm')[0].scrollTop = 0;
    } 
  }
};