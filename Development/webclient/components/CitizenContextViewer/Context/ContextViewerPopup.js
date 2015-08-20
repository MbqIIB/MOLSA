function openContextViewer(link, theEvent) {
	// IE doesn't pass event as argument.
	localEvent = theEvent || window.event;

	var newWindow = window
			.open(
					link.href,
					"_blank",
					"resizable=yes,status=no,scrollbars=no,location=no,height=490,width=460,toolbar=no,menubar=no,titlebar=no");

	if ("focus" in window) {
		newWindow.focus();
	}
	
	if ("returnValue" in localEvent) {
		localEvent.returnValue = false;
	} 
	
	// for Chrome and Firefox
	if ("preventDefault" in localEvent) {
		localEvent.preventDefault();
		localEvent.stopPropagation();
	}
	
	// for IE
	if ("cancelBubble" in localEvent) {
		localEvent.cancelBubble = true;
	}
	
	return false;
	
}

function setupPersonSearchEvent() {
	var personObj = document.getElementById("PersonField");
	dojo.event.connect(personObj, "onchange", this, "onLoadContextViewer");

}
