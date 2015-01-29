function getDocumentFormat() {

	var cat = dijit.byId('__o3id0_0');
	var template = dijit.byId('__o3id0');
	
	alert("Category :" +cat);
	alert("Category Template:" +template);
	
	var category=String(cat);
	var templateString=String(template);
	if(category.length == 0 ||templateString.length == 0 ){
		dojo.byId("__o3id1").innerHTML = "";
	}else{
	alert("Else Loop Template:" +category);
	alert("Else Loop Template:" +templateString);
		var xhrArgs = {
				url : "MOLSA_getDocumentMessageTextPage.do",
				
				content : {parent:cat, child:template},
				
				handleAs : "text",

				load : function(response) {
					dojo.byId("__o3id1").innerHTML = response;
				},
				
				error : function(error) {
				}

			}
			dojo.xhrGet(xhrArgs);
	}
	
}

function enableOnLoad() {
	getDocumentFormat();
}