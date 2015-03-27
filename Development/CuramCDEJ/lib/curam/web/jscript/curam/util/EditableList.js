//>>built
define("curam/util/EditableList",["curam/debug","curam/define","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.EditableList",{onload:function(){
var _2=dojo.query("div.list table tbody td input[type = 'checkbox']");
if(_2[0]==null){
return "Outside List";
}
_2.forEach(function(_3){
curam.debug.log("curam.util.EditableList onload()");
curam.util.EditableList._doToggling(_3);
});
return "In List";
},toggle:function(_4){
curam.debug.log("curam.util.EditableList: "+_1.getProperty("curam.util.EditableList.toggle"));
_4=dojo.fixEvent(_4);
if(!_4.target){
return "Improper Event";
}
var _5=_4.target;
curam.util.EditableList._doToggling(_5);
return "Event Processed";
},_doToggling:function(_6){
var _7=_6;
while(_7&&!dojo.hasClass(_7,"list")){
_7=_7.parentNode;
}
if(_7==null){
return "Outside List";
}
if(_6.checked==true){
isChecked=true;
curam.debug.log(_1.getProperty("curam.util.EditableList.ticking"));
}else{
isChecked=false;
curam.debug.log(_1.getProperty("curam.util.EditableList.unticking"));
}
var _8=cm.getParentByType(_6,"TR");
if(_8==null){
throw new Error("Exception: The TR node is not found");
}
dojo.query("td >",_8).forEach(function(_9){
if(dojo.hasClass(_9,"text")){
if(isChecked){
dojo.removeAttr(_9,"disabled");
dojo.removeClass(_9,"disabled");
curam.debug.log(_1.getProperty("curam.util.EditableList.enable.field"));
}else{
dojo.attr(_9,"disabled","disable");
dojo.addClass(_9,"disabled");
curam.debug.log(_1.getProperty("curam.util.EditableList.disable.field"));
}
}else{
if(dojo.hasClass(_9,"codetable")){
var _a=dojo.attr(_9,"widgetid");
var _b=dijit.byId(_a);
if(isChecked){
_b.set("disabled",false);
curam.debug.log(_1.getProperty("curam.util.EditableList.enable.ct"));
}else{
_b.set("disabled",true);
curam.debug.log(_1.getProperty("curam.util.EditableList.disable.ct"));
}
}
}
});
return "Toggled";
}});
return curam.util.EditableList;
});
