/*
 * Licensed Materials - Property of IBM
 *
 * Copyright IBM Corporation 2010, 2012. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure 
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

dojo.provide("create.service");

create.service = {

  // Stop the link and raise an event to the parent modal
  selectService: function() {
    // Stop the click event
    var clickEvent = dojo.fixEvent(arguments[0]);
    dojo.stopEvent(clickEvent);

    // Get the url for the link
    var url = clickEvent.target.href;

    // Publish the event on the parent window
    window.parent.dojo.publish("service.selected", [url]);
  },

  // Subscribe to the service.selected event
  subscribeToServiceSelection: function() {
    curam.util.subscribe("service.selected", create.service.doOpenNextPage);
  },

  // Open the next page in the wizard
  doOpenNextPage: function(link) {


    var linkManip=link;
    var valueContent=linkManip.split("value=");
    var content = valueContent[1].split("&");
    var descriptionContent=linkManip.split("description=");
    var descriptionContentResult = descriptionContent[1].replace(/\+/g, " ");

    executeOpenerMapping('value', content[0]);
    executeOpenerMapping('description', descriptionContentResult);
    setParentFocus();
    return false;

  }

};