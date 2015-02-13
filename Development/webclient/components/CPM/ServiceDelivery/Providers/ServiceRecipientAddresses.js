/*
 * Licensed Materials - Property of IBM
 *
 * Copyright IBM Corporation 2010, 2012. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure 
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/*
 * Copyright 2010 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information").  You shall not disclose such
 * Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

  function addListenerForProximityField() {
     var recipientDropDown = dijit.byId("__o3id1");
     dojo.connect(recipientDropDown, "onChange", getAddressForRecipient);
  }

 /**
  * Calls the server to populate the addresses drop down field for a selected service recipient.
  */
    function getAddressForRecipient() {
    dojo.require("dojo.data.ItemFileWriteStore");
    dojo.require("dojox.xml.parser");

    // Get the client and activity drop down fields
    var recipientDropDown = dijit.byId("__o3id1");
    var recipientAddressDropDown = dijit.byId("__o3id2");

    var recipientDropDownStore = recipientDropDown.store;


    // Reset the combo box if no client is selected
    // BEGIN, CR00348478, SSK 
    if(recipientDropDown.item.id == '') {
    // END, CR00348478
      var recipientAddressDropDownStore = new dojo.data.ItemFileWriteStore({
        data: {
          label: "name",
          identifier: "value",
          items: [{name:"", value:""}]}});
          // BEGIN, CR00348478, SSK
      recipientAddressDropDown.set("store", recipientAddressDropDownStore);
      recipientAddressDropDown.set("value", "");
      // END, CR00348478
      return;
    }

    // Get the selected value
    var recipientDropDownValue = recipientDropDown.item.value;

    // Construct the url to retrieve the list of addresses
    var serverUrl = "../servlet/FileDownload?pageID=ListAddressesForServiceRecipient&caseParticipantRoleID=" + recipientDropDownValue;

    dojo.xhrGet({
      url: serverUrl,
      handleAs: "text",
      timeout: 5000,
      load: function(response) {

        // Parse the xml text returned from the server
        var xmlDoc = dojox.xml.parser.parse(response);
        var clientAddresses = xmlDoc.getElementsByTagName("clientAddress");

        var newAddressDropDownStore = new dojo.data.ItemFileWriteStore({
          data: {
            label: "name",
            identifier: "value",
            items: [{name:"", value:""}]}});

        // Loop through the list of client addresses adding them to the drop down field
        for (var i = 0; i < clientAddresses.length; i++) {
          newAddressDropDownStore.newItem({name: clientAddresses[i].getAttribute("displayValue"), value: clientAddresses[i].getAttribute("hiddenValue")});
        }

		// BEGIN, CR00348478, SSK 
        recipientAddressDropDown.set("store", newAddressDropDownStore);
        recipientAddressDropDown.set("value", "");
         // END, CR00348478

        return response;
      },
      error: function(error) {
        console.log(error);
        return response;
      }
    });
 }
