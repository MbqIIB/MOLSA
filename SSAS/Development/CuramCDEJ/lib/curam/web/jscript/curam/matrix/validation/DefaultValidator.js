//>>built
define("curam/matrix/validation/DefaultValidator",["dijit","dojo","dojox"],function(_1,_2,_3){
_2.provide("curam.matrix.validation.DefaultValidator");
_2.declare("curam.matrix.validation.DefaultValidator",null,{keys:_2.keys,constructor:function(){
this.allowableCharsForNumeric=[1,2,3,4,5,6,7,8,9,0,"-","."];
var sk={};
var k=this.keys;
sk[k.TAB]=true;
sk[k.SHIFT]=true;
sk[k.LEFT_ARROW]=true;
sk[k.RIGHT_ARROW]=true;
sk[k.CAPS_LOCK]=true;
this.skipKeys=sk;
},state:{allowableFields:null,errorActive:false,warningActive:false},checkNumericCharacter:function(e){
if(e.key=="-"&&e.target.value.length!=0){
e.preventDefault();
return;
}else{
if(e.key=="."&&e.target.value.indexOf(".")!=-1){
e.preventDefault();
return;
}
}
for(var i=0;i<this.allowableCharsForNumeric.length;i++){
if(e.key!=" "&&e.key==this.allowableCharsForNumeric[i]){
return;
}
}
e.preventDefault();
return;
},isErrorActive:function(){
return this.state.errorActive;
},isWarningActive:function(){
return this.state.warningActive;
},setErrorActive:function(_4){
this.state.errorActive=_4;
},setWarningActive:function(_5){
this.state.warningActive=_5;
},isValidationActive:function(){
return this.isWarningActive()||this.isErrorActive();
},checkFocusInError:function(_6){
if(!this.isErrorActive()||_6.keyCode!=9){
return false;
}
if(_6.keyCode!=9){
return true;
}
var _7=0;
for(var _8=0;_8<this.state.allowableFields.length;_8++){
if(_6.target.id==this.state.allowableFields[_8]){
_7=_8+1;
if(_7>=this.state.allowableFields.length){
_7=0;
}
break;
}
}
_2.byId(this.state.allowableFields[_7]).focus();
return true;
},addFocusListener:function(_9){
var _a=this;
var _b=function(e){
return _a.checkFocus(e);
};
for(var _c=0;_c<_9.length;_c++){
if(!_9[_c]["_hasFocusListener_"]){
_2.connect(_9[_c],"onfocus",_b);
_9[_c]["_hasFocusListener_"]=true;
}
}
},checkFocus:function(e){
if(!this.isWarningActive()&&!this.isErrorActive()){
return;
}
e=e?e:_2.fixEvent(null);
for(var i=0;i<this.state.allowableFields.length;i++){
if(this.state.allowableFields[i]==e.target.id){
clearTimeout(this.timeout);
return;
}
}
_2.stopEvent(e);
},refocus:function(){
if(this.focusElement){
this.focusElement.focus();
}else{
if(this.state.allowableFields&&this.state.allowableFields.length>0){
_2.byId(this.state.allowableFields[0]).focus();
}
}
},cancelInputTabs:function(){
if(!this.state.allowableFields||this.state.allowableFields.length==0){
return;
}
var _d=this;
this._tabFns=[];
for(var i=0;i<this.state.allowableFields.length;i++){
this._tabFns[this._tabFns.length]=_2.connect(_2.byId(this.state.allowableFields[i]),"key",function(_e){
if(_d.isErrorActive()){
if(_e.keyCode==9){
_d.checkFocusInError(_e);
_2.stopEvent(_e);
return false;
}
}else{
_d.clearInputTabListeners();
}
return true;
});
}
},clearInputTabListeners:function(){
if(this._tabFns){
for(var _f=0;_f<this.state.allowableFields.length;_f++){
_2.disconnect(this._tabFns[_f]);
}
this._tabFns=null;
}
},checkForTabShiftKey:function(evt){
if(this.skipKeys[evt.keyCode]){
return true;
}
return false;
},isInputPartOfValidation:function(_10){
if(!this.isErrorActive()&&!this.isWarningActive()||!this.state.allowableFields){
return false;
}
for(var _11=0;_11<this.state.allowableFields.length;_11++){
if(_10.id==this.state.allowableFields[_11]){
return true;
}
}
return false;
}});
});
