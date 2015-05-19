/*
 * Licensed Materials - Property of IBM
 *
 * PID 5725-H26
 * 
 * Copyright IBM Corporation 2012, 2014. All rights reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp. 
 */

dojo.provide("cpm.checkbox");
// BEGIN, CR00348478, SSK
require(["curam/debug","curam/define"]);
// END, CR00348478
// BEGIN, CR00332607, SSK
dojo.require("curam.util.ResourceBundle");
dojo.requireLocalization("curam.application", "checkbox");

var bundle = new curam.util.ResourceBundle("checkbox");
// END, CR00332607
curam.define.singleton("cpm.checkbox",{onload:function(){
var _1=dojo.query("div.list table tbody td input[type = 'checkbox']");
if(_1[0]==null){
// BEGIN, CR00332607, SSK
return bundle.getProperty("getMessage.OutsideList");
// END, CR00332607
}
_1.forEach(function(_2){
// BEGIN, CR00332607, SSK
curam.debug.log(bundle.getProperty("getMessage.checkbox.onload"));
// END, CR00332607
cpm.checkbox._doToggling(_2);
});
return "In List";
},toggle:function(_3){
// BEGIN, CR00332607, SSK
curam.debug.log(bundle.getProperty("getMessage.TogglingEditableRow", ["checkbox.js:"]));
// END, CR00332607
_3=dojo.fixEvent(_3);
if(!_3.target){
// BEGIN, CR00332607, SSK
return bundle.getProperty("getMessage.ImproperEvent");
// END, CR00332607
}
var _4=_3.target;
cpm.checkbox._doToggling(_4);
// BEGIN, CR00332607, SSK
return bundle.getProperty("getMessage.EventProcessed");
// END, CR00332607
},_doToggling:function(_5){
var _6=_5;
while(_6&&!dojo.hasClass(_6,"list")){
_6=_6.parentNode;
}
if(_6==null){
// BEGIN, CR00332607, SSK
return bundle.getProperty("getMessage.OutsideList");
// END, CR00332607
}
if(_5.checked==true){
isChecked=true;
// BEGIN, CR00332607, SSK
curam.debug.log(bundle.getProperty("getMessage.Ticking"));
// END, CR00332607
}else{
isChecked=false;
// BEGIN, CR00332607, SSK
curam.debug.log(bundle.getProperty("getMessage.Unticking"));
// END, CR00332607
}
var _7=cm.getParentByType(_5,"TR");
if(_7==null){
// BEGIN, CR00332607, SSK
throw new Error(bundle.getProperty("getMessage.Exception"));
// END, CR00332607
}
dojo.query("td >",_7).forEach(function(_8){
// BEGIN, CR00408226, SS
if(_8.type=='text'){
// END, CR00408226
if(isChecked){
dojo.removeAttr(_8,"disabled");
dojo.removeClass(_8,"disabled");
cpm.checkbox._selectCheckAllOption();
// BEGIN, CR00332607, SSK
curam.debug.log(bundle.getProperty("getMessage.EnablingText"));
// END, CR00332607
}else{
dojo.attr(_8,"disabled","disable");
dojo.addClass(_8,"disabled");
cpm.checkbox._selectCheckAllOption();
// BEGIN, CR00332607, SSK
curam.debug.log(bundle.getProperty("getMessage.DisablingText"));
// END, CR00332607
}
}else{
if(dojo.hasClass(_8,"codetable")){
var _9=dojo.attr(_8,"widgetid");
var _a=dijit.byId(_9);
if(isChecked){
_a.attr("disabled",false);
// BEGIN, CR00332607, SSK
curam.debug.log(bundle.getProperty("getMessage.EnablingCodeTable"));
// END, CR00332607
}else{
_a.attr("disabled",true);
// BEGIN, CR00332607, SSK
curam.debug.log(bundle.getProperty("getMessage.DisablingCodeTable"));
// END, CR00332607
}
}
}
});
return bundle.getProperty("getMessage.Toggled");
},_selectCheckAllOption:function(){
if(dojo.query("div.list table tbody td input[type = 'checkbox']").every("return item.checked")){
document.forms[0].mainCheckbox.checked=true;
}else{
document.forms[0].mainCheckbox.checked=false;
}
}
});

// BEGIN, CR00408226, SS
function CheckAll(mainCheckbox, listID) { 
  var id = dojo.byId(listID);
  var checkBox=dojo.query("input[type=checkbox]",id);
  var inputText=dojo.query("input[type=text]",id);
  if(mainCheckbox.checked){
	for(var i=0;i<checkBox.length;i++){
		var e=checkBox[i];
		if ((e.type=='checkbox') && (!e.disabled) ) {
 		   e.checked = true;
		}		
	}
	for(var i=0;i<inputText.length;i++){
		var e=inputText[i];
		if (e.type=='text') {
			dojo.removeAttr(e,"disabled");
			dojo.removeClass(e,"disabled");
		}
	}
  }else {
	for(var i=0;i<checkBox.length;i++){
		var e=checkBox[i];  
		if ((e.type=='checkbox') && (!e.disabled) ) {
      		e.checked = false;
		}
	}
	for(var i=0;i<inputText.length;i++){
		var e=inputText[i];
		if (e.type=='text') {
			e.disabled = true;
		}
	}
  }
 // END, CR00408226
}