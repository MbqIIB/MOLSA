/*
 * Licensed Materials - Property of IBM
 *
 * Copyright IBM Corporation 2012. All Rights Reserved.
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

    // Get the return page url
    var rpu = dojo.byId("__o3rpu");

    // Change the context, 03frame and rpu values accordinly
    var url = link;
    url = curam.util.replaceUrlParam(url, "__o3rpu", encodeURIComponent(rpu.value));
    var modalContext = new curam.util.ScreenContext('MODAL');
    url = curam.util.replaceUrlParam(url, "o3ctx", modalContext.getValue());
    url = curam.util.replaceUrlParam(url, "o3frame", "modal");

    // Move to the next page
    window.location.assign(url);
  }

};