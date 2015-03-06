
// generic map vars
var map = "";

var zoomLevel="";

//  array to hold gmarkers to track them
var gmarkers = [];

// our implementation specific vars
var addressData=new Array();

// initialises a google map
// mapID - reference to the map DIV
// centreLatitude - long
// centreLongitude - long
// zoomLevel - int - max 16
function initialiseMap(mapID, centreLatitude, centreLongitude, zoomLevel) {


    if (zoomLevel.length == 0) {
      zoomLevel = 16;
	}
	  
	var mapOptions = {
      zoom: zoomLevel,
      //zoomControl: true,
      center: new google.maps.LatLng(centreLatitude, centreLongitude),
     // mapTypeControl: true,
     // draggableCursor: 'default',
     // scaleControl: true,
     // scrollwheel: true,
     // streetViewControl: true,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
    };
	
	map = new google.maps.Map(document.getElementById(mapID), mapOptions); 

  
  
}

/*
 * Removes the markers that exist on the map from it.
 * 
 */
function clearMarkers() {
	
	require(["dojo/_base/array"], function(array){
		  array.forEach(gmarkers, function(aMarker, i){
			  aMarker.setMap(null);
		  });
	});
	gmarkers.length =0;
	
}

// moved this in here so it has access to Gmarkers
// This function picks up the click and opens the corresponding info window
function myclick(i) {
   google.maps.event.trigger(gmarkers[i], "click");
}


function createAndAddMapMarker(infoWindowHtml, markerOptions, displayOnLoad) {

    // Create the marker

    var marker =  new google.maps.Marker(markerOptions);
    var isThisMarkerClickable = marker.getClickable();

    // hide the marker if the category is not selected
    if(!displayOnLoad) {
    	marker.setVisible(false);
    }
    
    var markerShapeIs = marker.getShape();
    
    // When the marker is clicked, open an information window.
	google.maps.event.addListener(marker, 'click', function() {
       
		var infowindow = new google.maps.InfoWindow({
		    content: infoWindowHtml
		  });
		// this should be the marker.
        infowindow.open(map,this);
	});  
    
    // add marker to array
    gmarkers.push(marker);
  
    return marker;
}

