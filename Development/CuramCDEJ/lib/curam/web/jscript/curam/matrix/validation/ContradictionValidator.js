//>>built
define("curam/matrix/validation/ContradictionValidator",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants,curam/matrix/validation/DefaultCombinationValidator,curam/util/ResourceBundle"],function(_1,_2,_3){
_2.provide("curam.matrix.validation.ContradictionValidator");
_2.require("curam.matrix.Constants");
_2.require("curam.matrix.validation.DefaultCombinationValidator");
_2.require("curam.util.ResourceBundle");
var _4=new curam.util.ResourceBundle("Debug");
_2.declare("curam.matrix.validation.ContradictionValidator",curam.matrix.validation.DefaultCombinationValidator,{warningSingleMsg:"",warningMsg:"",errorMsg:"",constructor:function(_5,_6){
this.container=_5;
this.bitsets=[];
this.validatingCombCells=false;
this.matchingCombCells=false;
this.state.duplicateWarningActive=false;
this.state.singleWarningActive=false;
this.state.questionWarningActive=false;
this.setErrorActive(false);
this.isInitialized=false;
if(_6){
_2.mixin(this,_6);
}
this._registerValidator(this);
this.state=curam.matrix.validation.DefaultCombinationValidator.prototype.state;
},initialize:function(){
this.isInitialized=true;
this.bitsets=[];
var _7=this.container.matrix.bottomRight.questions.getObjectByIndex(0).contradiction;
this.numCols=_7?_7.rows.getObjectByIndex(0).cells.count:0;
},refreshValidation:function(){
if(!this.requiresRefresh){
return;
}
this.inRefresh=true;
for(var _8=0;_8<this.bitsets.length;_8++){
if(this.bitsets[_8]){
for(var _9=0;_9<this.bitsets[_8].inputs.length;_9++){
this.bitsets[_8].inputs[_9].bitsetId=null;
}
}
}
var _a={};
for(var _8=0;_8<this.bitsets.length;_8++){
if(this.bitsets[_8]){
_a[this.bitsets[_8].id]=true;
}
}
this._deleteBitsets(_a);
this.isInitialized=false;
this.initialize();
for(var _8=0;_8<this.numCols;_8++){
this._initColumn(_8);
}
var _b;
var _c=curam.matrix.Constants.container.existingQuestionIds.split("|");
if(_c.length>0&&_c[_c.length-1].length==0){
_c.splice(_c.length-1,1);
}
for(var _8=0;_8<this.numCols;_8++){
_b=this.bitsets[_8];
if(_b&&!this._validate(_b,_b.inputs[0],_c)){
break;
}
}
if(this.isWarningActive()||this.isErrorActive()){
this.refocus();
}
this.inRefresh=this.requiresRefresh=false;
},_initColumn:function(_d){
if(!this.isInitialized){
this.initialize();
}
var _e=this.container.matrix.bottomRight.questions;
var _f=_4.getProperty("curam.matrix.validation.ContradictionValidator"+".err.1");
var _10=_4.getProperty("curam.matrix.validation.ContradictionValidator"+".err.2");
var _11=_4.getProperty("curam.matrix.validation.ContradictionValidator"+".err.3");
var _12=_e.getObjectByIndex(0).contradiction.rows.getObjectByIndex(0).cells.getObjectByIndex(_d).input.id;
var _13=Number(_12.split(".")[4])-1;
if(this.bitsets[_13]){
return;
}
var _14=this._createBitset(_13,this.bitsets);
var _15,_16;
if(_d>this.numCols){
curam.debug.log(_f+"(_initColumn) colNum = "+_d+_10+this.numCols+_11);
return;
}
var _17;
for(var _18=0;_18<_e.count;_18++){
_17=_e.getObjectByIndex(_18);
_15=_17.contradiction.rows;
for(var _19=0;_19<_15.count;_19++){
_16=_15.getObjectByIndex(_19).cells.getObjectByIndex(_d).input;
_16.qId=_17.qId;
this.setContradictionValue(_13,_16,null,_17.qId,true);
}
}
},_createBitset:function(_1a,arr){
var _1b=curam.matrix.validation.DefaultCombinationValidator.prototype._createBitset.apply(this,arguments);
_1b.qCount={};
return _1b;
},setContradictionValue:function(_1c,_1d,_1e,qId,_1f){
if(_1e!==null){
_1e=_2.fixEvent(_1e);
}
if(this._checkRefresh()){
return;
}
if(_1e&&this.container.matrix.isValidationActive()&&((this.state.questionWarningActive&&_1d.checked)||!this.container.matrix.isInputPartOfValidation(_1d))){
_2.stopEvent(_1e);
this.container.matrix.refocusValidatingInput();
return;
}
if(!this.bitsets[_1c]){
this.refreshValidation();
}
var _20=this.bitsets[_1c];
this._initCheckbox(_1d,_20);
var _21=_1d.bitsetId;
if(_1d.checked){
if(_20.set(_21)){
_20.qCount[qId]=typeof (_20.qCount[qId])=="undefined"?1:_20.qCount[qId]+1;
}
}else{
if(_20.unSet(_21)&&_20.qCount[qId]){
_20.qCount[qId]--;
}
}
if(!_1f){
this._validate(_20,_1d);
}
},_validateQuestionCount:function(_22,_23){
var _24=0;
for(var _25=0;_25<_23.length&&_24<2;_25++){
if(_22.qCount[_23[_25]]>0){
_24++;
}
}
if(_24<2){
this.state.singleWarningActive=true;
this._setErrorBitsets(_22,null);
this.currentMsg=this.singleWarningMsg;
return false;
}
return true;
},_validateOne:function(_26){
this.state.singleWarningActive=(this.inSave&&_26.isClear())||_26.isSingleSet();
if(this.state.singleWarningActive){
this._setErrorBitsets(_26,null);
this.currentMsg=this.singleWarningMsg;
}
return !this.state.singleWarningActive;
},deleteContradiction:function(){
var _27={};
for(var _28=0;_28<this.bitsets.length;_28++){
if(this.bitsets[_28]){
_27[this.bitsets[_28].id]=true;
}
}
this._deleteBitsets(_27);
this.bitsets=[];
}});
});
