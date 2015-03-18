/*
 * Copyright 2010 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information").  You shall not disclose such
 * Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */
 
require(["curam/util/UimDialog","curam/tab","cm/_base/_pageBehaviors"]);

var geocoder = null;
var concernRoleID = null;

function addressObject(){
  this.address='';
  this.latitude='';
  this.longitude='';
  this.iconLocation='';
  this.iconWidth='';
  this.iconHeight='';
  this.links='';
  this.serviceID='';
  this.hasMultipleLocations='';
  this.category='';
  this.providerName='';
  this.phoneNumber='';
  this.webAddress='';
  this.serviceOfferingID='';
  this.providerID='';
}

function myclick(i) {
   GEvent.trigger(gmarkers[i], "click");
}

// this function is called when a checkbox is clicked. it determines
// whenter the box was checked or unchecked and calls the relevant method
function boxclick(box,category) {
   if (box.checked) {
      show(category);
   } else {
      hide(category);
   }
}

//  shows all markers of a particular category, and ensures the checkbox is checked
function show(category) {
  for (var i=0; i<gmarkers.length; i++) {
    if (gmarkers[i].mycategory == category) {
        gmarkers[i].show();
    }
  }
  //  check the checkbox
  document.getElementById(category+"box").checked = true;
}

//  hides all markers of a particular category, and ensures the checkbox is cleared
function hide(category) {
  for (var i=0; i<gmarkers.length; i++) {
    if (gmarkers[i].mycategory == category) {
      gmarkers[i].hide();
    }
  }
  // clear the checkbox
  document.getElementById(category+"box").checked = false;
  // close the info window, in case its open on a marker that we just hid
  map.closeInfoWindow();
}

function getMapData() {

  var n = map.getBounds().getNorthEast().lat();
  var s = map.getBounds().getSouthWest().lat();
  var e = map.getBounds().getNorthEast().lng();
  var w = map.getBounds().getSouthWest().lng();

  var addressData = new Array();

  var xhrArgs = {

        url: "../servlet/triage/TriageMapProviders?" + "n=" + n + "&s=" + s + "&e=" + e + "&w=" + w,
        handleAs: "json",

        timeout: 50000,


        load: function(response, ioArgs) {

      var referenceOrder = new Array();
      var inputs = dojo.doc.getElementsByTagName("input");

      for(var i = 0; i < inputs.length; i++) {
        if(dojo.attr(inputs[i], "listitemnumber")) {
          referenceOrder[dojo.attr(inputs[i], "reference")] = dojo.attr(inputs[i], "listitemnumber");
        }
      }


      for(var i = 0; i < response.items.length; i++) {

        if(referenceOrder[response.items[i].category] > 0) {

          var addressDetails = new addressObject();

          addressDetails.providerName = response.items[i].name;
          addressDetails.address = response.items[i].address;
          addressDetails.iconLocation = "../Images/pins_no_" + referenceOrder[response.items[i].category] + ".png";
          addressDetails.iconHeight = "22";
          addressDetails.iconWidth = "22";
          addressDetails.latitude = response.items[i].lat;
          addressDetails.longitude = response.items[i].lng;
          addressDetails.serviceID = response.items[i].serviceID;
          addressDetails.hasMultipleLocations = response.items[i].hasMultipleLocations;
          addressDetails.category = response.items[i].category;
          addressDetails.phoneNumber = response.items[i].phone;
          addressDetails.webAddress = response.items[i].web;
          addressDetails.serviceOfferingID = response.items[i].serviceOfferingID;
          addressDetails.providerID = response.items[i].providerID;

          addressData.push(addressDetails);
        }
      }

      plotPoints(addressData);

            return response;
        },


        error: function(response, ioArgs) {
          console.error("HTTP status code: ", ioArgs.xhr.status);
          return response;
          }
        };

  var deferred = dojo.xhrGet(xhrArgs);

  return deferred;
}

function plotPoints(addressData) {

  var checkedCategories = new Array();
  var inputs = dojo.doc.getElementsByTagName("input");

  for(var i = 0; i < inputs.length; i++) {

    if(inputs[i].checked == true) {
      checkedCategories.push(dojo.attr(inputs[i], "reference"));
    }
  }

  // for each address, create a marker for it and customise it, if required
    for (var j = 0; j < addressData.length; j++) {

      var currentAddress = addressData[j].address;
      var currentIconLocation = addressData[j].iconLocation;
      var point = new GLatLng(addressData[j].latitude, addressData[j].longitude);
      var providerName = addressData[j].providerName;
      var serviceID = addressData[j].serviceID;
      var hasMultipleLocations = addressData[j].hasMultipleLocations;
      var category = addressData[j].category;
      var phoneNumber = addressData[j].phoneNumber;
      var webAddress = addressData[j].webAddress;
      var serviceOfferingID = addressData[j].serviceOfferingID;
      var providerID = addressData[j].providerID;

      var infoWindowHtml = "";

        if (providerName.length != 0) {

         infoWindowHtml = "<b>" + providerName + "</b><br>";
       }

        if (currentAddress.length != 0) {

          // parse the address to clean it up - put first line on an individual line
          var addressParsed = currentAddress.replace(',','<br>');
          infoWindowHtml = infoWindowHtml + addressParsed;
          if(phoneNumber) {
            infoWindowHtml = infoWindowHtml + '<br>' + phoneNumber;
          }
          if(webAddress) {
            infoWindowHtml = infoWindowHtml + '<br><a href="javascript: void(0)" onclick="window.open(\'' + webAddress +'\');">' + webAddress + "</a>"
          }

          infoWindowHtml = infoWindowHtml + '<br><br/><a href="javascript: void(0)" onclick="curam.util.UimDialog.openUrl(\'ProviderManagement_viewServiceForResourceMgrPage.do?&serviceOfferingID=' + serviceOfferingID + '&amp;o3ctx=256\'); return false;">'+ MORE_INFO_LINK_TEXT +'</a>'
          infoWindowHtml = infoWindowHtml + '&nbsp;&nbsp;<a href="javascript: void(0)" onclick="curam.util.UimDialog.openUrl(\'CreatePreSelectedLiteProviderReferralPage.do?serviceOfferingID='+serviceOfferingID+ '&providerConcernRoleID=' + providerID  +'&concernRoleID=' + concernRoleID  + '&amp;o3ctx=256\'); return false;">'+ CREATE_REFERRAL_TEXT +'</a>';


        }

      var addressIcon = new GIcon(G_DEFAULT_ICON);

      if (currentIconLocation.length != 0) {
        addressIcon.image = currentIconLocation;
      }

      //TODO reference configured values
      addressIcon.shadow = '../Images/pin_no_shadow.png';
      addressIcon.shadowSize = new GSize(34, 24);
      addressIcon.iconAnchor = new GPoint(7, 23);

      if (addressData[j].iconWidth.length != 0 && addressData[j].iconHeight.length != 0) {

        addressIcon.iconSize = new GSize(addressData[j].iconWidth, addressData[j].iconHeight);
      }

      markerOptions = { icon:addressIcon,title:currentAddress };

      var displayOnLoad = (dojo.indexOf(checkedCategories, category) > -1);

      createMarker(point, infoWindowHtml, markerOptions, category, displayOnLoad);

    }
}

function getServiceRefOrder() {

  var inputs = dojo.doc.getElementsByTagName("input");

  for(var i = 0; i < inputs.length; i++) {
    if(dojo.attr(inputs[i], "listitemnumber")) {
      referenceOrder[dojo.attr(inputs[i], "reference")] = dojo.attr(inputs[i], "listitemnumber");
    }
  }

}

function initGoogleMap(mapID) {

  if (GBrowserIsCompatible()) {

    initialiseMap(mapID, centerLatitude, centerLongitude, zoomLevel);

    getMapData();

    geocoder = new GClientGeocoder();

    // add the Go button to the tabindex
    var index = dojo.byId("addressField").tabIndex;
    dojo.byId('goButton').tabIndex = index++;

    var markerManager = new GMarkerManager(map, {borderPadding:1});

    //TODO this should take the configured level at which to display services
    markerManager.addMarkers(gmarkers,7,17);
    markerManager.refresh();

    GEvent.addListener(map, "moveend", function() {
      getMapData();
    });
  }
}

function initConcernRoleID(_concernRoleID ) {
 concernRoleID = _concernRoleID;
}

  function createMarker(point, infoWindowHtml, markerOptions,  category, displayOnLoad) {

    // Create the marker
    var marker = createAndAddMapMarker(point, infoWindowHtml, markerOptions, displayOnLoad);

    // assign a category (service reference) for this marker. used to hide / display
    // services of particular types
    marker.mycategory = category;

    return marker;
 }

function centreOnAddress(addressEntered) {

  geocoder = new GClientGeocoder();

  if (geocoder) {

    geocoder.getLocations(
      addressEntered,
      function(result) {

        var plottedAnAddress = new Boolean(false);

        if (result.Placemark) {

          for (var i=0; i<result.Placemark.length; i++) {

            var p = result.Placemark[i].Point.coordinates;
            var point = new GLatLng(p[1],p[0]);

            if(latLngBounds.containsLatLng(point)) {

              map.setCenter(point, 11);
              plottedAnAddress = true;
            }
          }
          // TODO: Investigate the ability to reuse the message area employed by
          // CSS rather than using an alert, or simply an information modal 
          // similar to evidence flow.
          if(plottedAnAddress == false) {
            alert(ADDRESS_NOT_IN_RANGE_TEXT.replace('%1s', "\"" + addressEntered + "\""));
          }
        } else {
          alert(ADDRESS_NOT_FOUND_TEXT.replace('%1s', "\"" + addressEntered + "\""));
        }
      }
    );
  }
}

function getDocHeight() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}

////////////////////////////////////////////////////////////////////////////////
// CODE TO HIJACK HITTING ENTER ON THE ADDRESS INPUT FIELD //
////////////////////////////////////////////////////////////////////////////////
function submitAddress(event,addressEntered) {

      if (event && event.keyCode == 13) {
        centreOnAddress(addressEntered);
        return false;
     }
      else {
        return false;
    }
}

function showGovernmentServices() {
  document.getElementById('listAndMapContainer').style.display = "none";
  document.getElementById('govServicesContainer').style.display = "";

  document.getElementById('communityServicesTitleBar').style.display = "none";
  document.getElementById('governmentServicesTitleBar').style.display = "";

  document.getElementById('communityServicesTab').setAttribute('class', 'governmentServicesTab');
  document.getElementById('governmentServicesTab').setAttribute('class', 'communityServicesTab');

  // this is for IE
  if(navigator.appName == "Microsoft Internet Explorer") {
    document.getElementById('communityServicesTab').setAttribute('className', 'governmentServicesTab');
    document.getElementById('governmentServicesTab').setAttribute('className', 'communityServicesTab');
  }

}

function showCommunityServices() {
  document.getElementById('govServicesContainer').style.display = "none";
  document.getElementById('listAndMapContainer').style.display = "";

  document.getElementById('governmentServicesTitleBar').style.display = "none";
  document.getElementById('communityServicesTitleBar').style.display = "";

  document.getElementById('communityServicesTab').setAttribute('class', 'communityServicesTab');
  document.getElementById('governmentServicesTab').setAttribute('class', 'governmentServicesTab');

  // this is for IE
  if(navigator.appName == "Microsoft Internet Explorer") {
    document.getElementById('communityServicesTab').setAttribute('className', 'communityServicesTab');
    document.getElementById('governmentServicesTab').setAttribute('className', 'governmentServicesTab');
  }
}

  /* This function was introduced in 6.0 SP1 EP1 but is now redundant 
     please use the following function curam.util.UimDialog.openUrl()*/
  /* Constructs a modal url with a return parameter of the
     current page in the content frame */
function constructAndOpenModalURLFromMap(url) {

    /*
     * Get a handle to the iframe that is in the content pane
     */
    var iframe = curam.tab.getContentPanelIframe();

    /*
     * Get the page targeted in the href of the iframe
     */
    var rpuValue = getLastPathSegmentWithQueryStringForURLConstruction(
      iframe.contentWindow.location.href);

    /*
     * Construct the target URL from the URL passed in (the
     * target page) with a return value of the page in the frame
     */
    var targetURL = url + "&__o3rpu="
      + encodeURIComponent(rpuValue);

    /*
     * Open the page in the modal dialog
     */
    curam.util.UimDialog.openUrl(targetURL);
  }

  /* This function was introduced in 6.0 SP1 EP1 but is now redundant 
     please use the following function curam.util.UimDialog.openUrl()*/
  function getLastPathSegmentWithQueryStringForURLConstruction(url) {
    var pathAndParams = url.split("?");
    var pathComponents = pathAndParams[0].split("/");
    return pathComponents[pathComponents.length - 1]
      + (pathAndParams[1] ? "?" + pathAndParams[1] : "");
  }