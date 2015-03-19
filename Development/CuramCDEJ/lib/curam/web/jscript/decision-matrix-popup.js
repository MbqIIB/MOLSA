dojo.require("curam.util");
dojo.require("curam.ListMap");
dojo.require("curam.dialog");
var addMessagesFromPopupCalled=false;
function addMessagesFromPopup(){
if(addMessagesFromPopupCalled){
return;
}
addMessagesFromPopupCalled=true;
var _1=curam.dialog.getParentWindow(window);
var _2=new curam.ListMap();
var _3=dojo.byId("messageTable").childNodes;
var _4=null;
for(var i=0;i<_3.length;i++){
if(_3[i].nodeType==1){
_4=dojo.query("> :first-child",_3[i])[0];
_2.add(_4.innerHTML,dojo.query("> :first-child",cm.nextSibling(_4))[0].value);
}
}
_1.curam.matrix.Constants.container.matrix.addMessagesFromPopup(_2,dojo.byId("combinationId").value);
curam.dialog.closeModalDialog();
};
function populateInputs(){
var _5=curam.dialog.getParentWindow(window);
var _6=dojo.byId("combinationId").value;
var _7;
var _8;
dojo.query("#messageTable input").forEach(function(_9){
_7=_9.getAttribute("id");
_8=_5.curam.matrix.Constants.container.matrix.getContradictionMsg(_6,_7);
if(_8){
_9.value=_8;
}
});
for(var i=0;i<document.forms.length;i++){
dojo.connect(document.forms[i],"onsubmit",addMessagesFromPopup);
}
};
dojo.addOnLoad(populateInputs);

