//>>built
define("curam/validation",["curam/define","curam/date"],function(){
curam.define.singleton("curam.validation",{FILE_UPLOAD_FLGS:[],fileUploadChecker:null,invalidPathMsg:null,preventKeyPress:function(_1){
if(dojo.isIE){
_1.cancelBubble=true;
_1.returnValue=false;
return false;
}
return true;
},activateFileUploadChecker:function(_2){
if(!curam.validation.fileUploadChecker){
curam.validation.fileUploadChecker=function(){
var _3=dojo.byId("mainForm");
var _4=function(_5){
var _6=curam.validation.FILE_UPLOAD_FLGS;
for(var i=0;i<_6.length;i++){
var _7=_6[i];
var _8=cm.nextSibling(dojo.byId(_7),"input");
if(!curam.validation.isValidFilePath(_8.value)){
dojo.stopEvent(_5);
alert(curam.validation.invalidPathMsg+" '"+_8.value+"'");
cm.setFormSubmitted(_3,0);
return false;
}
}
return true;
};
dojo.connect(_3,"onsubmit",_4);
};
dojo.addOnLoad(curam.validation.fileUploadChecker);
}
},isValidFilePath:function(_9){
return true;
},validateDate:function(_a){
var _b={valid:curam.date.isDate(_a,jsDF),validFormat:jsDF.toLowerCase()};
return _b;
}});
return curam.validation;
});
