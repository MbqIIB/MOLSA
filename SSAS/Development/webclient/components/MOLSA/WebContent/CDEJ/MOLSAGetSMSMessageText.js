function getMessageFormat() {

	var cat = dijit.byId('__o3id0_0');
	var template = dijit.byId('__o3id0');
	
	var category=String(cat);
	var templateString=String(template);
	if(category.length == 0 ||templateString.length == 0 ){
		dojo.byId("__o3id1").innerHTML = "";
	}else{
		var xhrArgs = {
				url : "MOLSA_getSMSMessageTextPage.do",
				
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
	getMessageFormat();
}