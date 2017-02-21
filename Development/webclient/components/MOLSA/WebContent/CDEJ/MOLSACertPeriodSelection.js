function reloadForm(obj) {
	
	//alert(obj);
	//alert(obj.value);
	
	var pos = window.location.href.indexOf("certPeriod=");
	
	var url = window.location.href.substring(0, pos+11) + obj.value + window.location.href.substring(pos+19);
	
	location.href = url;
		
}