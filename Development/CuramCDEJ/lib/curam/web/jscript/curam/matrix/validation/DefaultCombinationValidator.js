//>>built
define("curam/matrix/validation/DefaultCombinationValidator",["dijit","dojo","dojox"],function(_1,_2,_3){
_2.provide("curam.matrix.validation.DefaultCombinationValidator");
_2.declare("curam.matrix.validation.DefaultCombinationValidator",curam.matrix.validation.DefaultValidator,{requiresRefresh:true,allValidators:[],allBitsets:[],state:{singleWarningActive:false,duplicateWarningActive:false,questionWarningActive:false,errorBitset1:null,errorBitset2:null,errorActive:false,warningActive:false},constructor:function(_4,_5){
this.container=_4;
if(_5){
_2.mixin(this,_5);
}
},_registerValidator:function(_6){
for(var _7=0;_7<this.allValidators.length;_7++){
if(this.allValidators[_7].declaredClass==_6.declaredClass){
this.allValidators[_7]=_6;
return;
}
}
this.allValidators.push(_6);
},_checkRefresh:function(){
if(!this.inRefresh&&this.requiresRefresh){
this.container.matrix.refreshCombinationValidators();
this.requiresRefresh=false;
return true;
}
return false;
},_createBitset:function(_8,_9){
var _a=_9[_8]=new curam.util.BitSet();
_a.colNum=_8;
_a.owner=this;
_a.inputs=[];
this.allBitsets.push(_a);
return _a;
},_deleteBitset:function(_b){
for(var _c=0;_c<this.allBitsets.length;_c++){
if(this.allBitsets[_c]==_b){
this.allBitsets.splice(_c,1);
break;
}
}
},_deleteBitsets:function(_d){
for(var _e=0;_e<this.allBitsets.length;_e++){
if(this.allBitsets[_e]&&_d[this.allBitsets[_e].id]){
this.allBitsets.splice(_e,1);
_e--;
}
}
},_initCheckbox:function(_f,_10){
if(typeof (_f.bitsetId)=="undefined"||_f.bitsetId==null){
_f.bitsetId=_10.max+1;
_f.bitsetOwner=_10.id;
_10.inputs[_10.max+1]=_f;
_f.colNum=_10.colNum;
}
},_validateOne:function(_11){
return true;
},_validateQuestionCount:function(_12,qId){
return true;
},_validateAll:function(){
var _13=this.allBitsets;
this.state.duplicateWarningActive=false;
for(var _14=0;_14<_13.length-1;_14++){
for(var _15=_14+1;_15<_13.length;_15++){
if(_13[_14]&&!_13[_14].isClear()&&_13[_14].equals(_13[_15])){
this.state.duplicateWarningActive=true;
this._setErrorBitsets(_13[_14],_13[_15]);
this.currentMsg=this.warningMsg;
return false;
}
}
}
return true;
},_validate:function(_16,_17,_18){
var _19=this.state.errorBitset1;
var _1a=this.state.errorBitset2;
this.state.singleWarningActive=this.state.duplicateWarningActive=this.state.questionWarningActive=false;
var _1b=true;
if(_18){
_1b=this._validateQuestionCount(_16,_18);
}
_1b=_1b&&(!_16||this._validateOne(_16))&&this._validateAll();
if(!_1b){
var _1c;
if(this.state.singleWarningActive||this.state.questionWarningActive){
_1c=[this.state.errorBitset1];
}else{
if(this.state.duplicateWarningActive){
_1c=[this.state.errorBitset1,this.state.errorBitset2];
}
}
if(_1c){
if(_17.bitsetOwner!=_1c[0].id||(_1c.length>1&&_17.bitsetOwner!=_1c[1].id)){
_17=_1c[0].inputs[0];
}
this.addWarning(_1c,_17);
}
}else{
this.focusElement=null;
if(this.isWarningActive()){
this.removeWarning();
}else{
if(this.isErrorActive()){
this.removeError(this.state.errorBitset1,this.state.errorBitset2);
}
}
this.onValid();
}
return _1b;
},onValid:function(){
},_setErrorBitsets:function(_1d,_1e){
var _1f=(this.state.errorBitset1&&this.state.errorBitset1.id==_1d.id)||(this.state.errorBitset2&&this.state.errorBitset2.id==_1d.id);
var _20=_1e?((this.state.errorBitset1&&this.state.errorBitset1.id==_1e.id)||(this.state.errorBitset2&&this.state.errorBitset2.id==_1e.id)):false;
if(_1f&&_20){
return false;
}
if(this.isErrorActive()){
this.removeError(this.state.errorBitset1,this.state.errorBitset2);
}else{
if(this.isWarningActive()){
this.removeWarning();
}
}
this.state.errorBitset1=_1d;
this.state.errorBitset2=_1e;
return true;
},addWarning:function(_21,_22){
if(this.isErrorActive()&&(this.state.errorBitset1.colNum!=_21[0].colNum||(!this.state.errorBitset2||this.state.errorBitset2.colNum!=_21[1].colNum))){
this.removeError(this.state.errorBitset1,this.state.errorBitset2);
}
var ac=_2.addClass;
var _23=this;
var _24=function(e){
if(_23.isWarningActive()){
_23.state.timeout=setTimeout(function(){
_23.addError();
},10);
}
};
var _25=function(e){
if(!_23.state.timeout||(typeof (e.target.colNum)=="undefined"||!_23.isWarningActive())){
return true;
}
if(_23.isInputPartOfValidation(e.target)){
clearTimeout(_23.state.timeout);
_23.state.timeout=null;
}else{
_2.stopEvent(e);
return false;
}
};
this.state.allowableFields=[];
var _26=-1,_27=-1;
var _28;
if(this.state.questionWarningActive){
var _29=_21[0].inputs;
for(var _2a=0;_2a<_29.length;_2a++){
if(_29[_2a].checked&&_29[_2a].qId==this.state.questionWarningActive){
if(_26==-1){
_26=_2a;
}else{
if(_2a>_27){
_27=_2a;
break;
}
}
}else{
if(_27!=-1){
break;
}
}
}
_27=Math.min(_27,_29.length);
_28=function(_2b,pos){
if(_2b.checked&&pos>=_26&&pos<=_27){
return true;
}
return false;
};
}else{
_26=0;
_27=_21[0].inputs.length-1;
_28=function(){
return true;
};
}
this.state.firstInput=_26;
this.state.lastInput=_27;
for(var _2c=0;_2c<_21.length;_2c++){
var _29=_21[_2c].inputs;
ac(_29[_26].parentNode,"combination-validation-top");
if(_28(_29[_26],_26)){
this.state.allowableFields.push(_29[_26].id);
}
for(var _2a=_26+1;_2a<_27;_2a++){
if(_28(_29[_2a],_2a)&&_29[_2a]&&_29[_2a].id){
this.state.allowableFields.push(_29[_2a].id);
}
ac(_29[_2a].parentNode,"combination-validation");
}
ac(_29[_27].parentNode,"combination-validation-bottom");
if(_28(_29[_27],_27)){
this.state.allowableFields.push(_29[_27].id);
}
for(var _2a=0;_2a<_29.length;_2a++){
if(!_29[_2a]["validationListenersAdded"]){
_29[_2a]["validationListenersAdded"]=true;
_2.connect(_29[_2a],"onblur",_24);
_2.connect(_29[_2a],"onfocus",_25);
}
}
}
this.setWarningActive(true);
this.focusElement=this.state.activeChangedInput=_22?_22:this.state.allowableFields[0];
this.container.activateWarning(this.currentMsg);
},addError:function(){
if(!this.isWarningActive()){
return;
}
var _2d;
if(this.state.singleWarningActive||this.state.questionWarningActive){
_2d=[this.state.errorBitset1];
}else{
if(this.state.duplicateWarningActive){
_2d=[this.state.errorBitset1,this.state.errorBitset2];
}
}
if(_2d){
this.cancelInputTabs();
var _2e=_2d[0].inputs[0];
var _2f=_2d.length>1?1:0;
var _30=_2d[_2f].inputs[_2d[_2f].inputs.length-1];
this.setErrorActive(true);
this.setWarningActive(false);
this.container.matrix.disableInputs(_2e,_30,"combination");
_2.publish("/disableInput",null);
var _31=cm.replaceClass;
var _32=this;
this.state.activeChangedInput.focus();
this.container.activateError(this.currentMsg);
}
},removeError:function(_33,_34){
if(!_33&&!_34){
return;
}
var _35=this.state.errorBitset2?[_33,_34]:[_33];
this._changeClassesFromColumn(_35,true);
if(_33.colNum==this.state.errorBitset1.colNum){
this.state.errorBitset1=null;
}
if(_34&&this.state.errorBitset2&&_34.colNum==this.state.errorBitset2.colNum){
this.state.errorBitset2=null;
}
this.setErrorActive(false);
for(var _36=0;_36<_35.length;_36++){
if(_35[_36].owner!=this){
_35[_36].owner.setErrorActive(false);
}
}
this.state.activeChangedInput=null;
this.clearInputTabListeners();
this.container.deactivateValidation();
},removeWarning:function(){
if(!this.state.errorBitset1&&!this.state.errorBitset2){
return;
}
var _37=[this.state.errorBitset1];
if(this.state.errorBitset2){
_37[1]=this.state.errorBitset2;
}
this._changeClassesFromColumn(_37,true);
this.state.errorBitset1=this.state.errorBitset2=null;
this.setWarningActive(false);
this.state.activeChangedInput=null;
this.container.deactivateValidation();
},_changeClassesFromColumn:function(_38,_39){
var fn;
if(_39){
fn=_2.removeClass;
}else{
fn=_2.addClass;
}
var _3a=this.state.firstInput;
var _3b=this.state.lastInput;
for(var _3c=0;_3c<_38.length;_3c++){
if(!this.bitsets){
continue;
}
var _3d=_38[_3c].inputs;
fn(_3d[_3a].parentNode,"combination-validation-top");
for(var _3e=_3a+1;_3e<_3b;_3e++){
fn(_3d[_3e].parentNode,"combination-validation");
}
fn(_3d[_3b].parentNode,"combination-validation-bottom");
}
},isInputPartOfValidation:function(_3f){
if(!_3f.bitsetOwner||!this.isErrorActive()&&!this.isWarningActive()||!this.state.allowableFields){
return false;
}
if((this.state.errorBitset1&&this.state.errorBitset1.id==_3f.bitsetOwner)||(this.state.errorBitset2&&this.state.errorBitset2.id==_3f.bitsetOwner)){
return true;
}
return false;
}});
});
