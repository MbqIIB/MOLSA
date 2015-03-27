//>>built
define("curam/matrix/validation/OutcomeValidator",["dijit","dojo","dojox","dojo/require!curam/util/ResourceBundle"],function(_1,_2,_3){
_2.provide("curam.matrix.validation.OutcomeValidator");
_2.require("curam.util.ResourceBundle");
var _4=new curam.util.ResourceBundle("Debug");
_2.declare("curam.matrix.validation.OutcomeValidator",curam.matrix.validation.DefaultCombinationValidator,{warningSingleMsg:null,warningMsg:"",errorMsg:"",constructor:function OutcomeCombValidator(_5,_6){
this.validatingCombCells=null;
this.matchingCombCells=null;
this.setWarningActive(false);
this.setErrorActive(false);
this.outcomeId=null;
this.combinationNum=null;
this.container=_5;
this.isInitialized=false;
this.bitsets=[];
this.state=curam.matrix.validation.DefaultCombinationValidator.prototype.state;
if(_6){
_2.mixin(this,_6);
}
this._registerValidator(this);
},setOutcomeValue:function(_7,_8,_9,_a,_b){
if(_a!==null){
_a=_2.fixEvent(_a);
}
var _c=_4.getProperty("curam.matrix.validation.OutcomeValidator.err.1");
var _d=_4.getProperty("curam.matrix.validation.OutcomeValidator.err.2");
var _e=_4.getProperty("curam.matrix.validation.OutcomeValidator.err.3");
if(this._checkRefresh()){
var _f=this.container.matrix.isValidationActive();
if(_a&&_f&&!this.container.matrix.isInputPartOfValidation(_9)){
_2.stopEvent(_a);
this.container.matrix.refocusValidatingInput();
return;
}
return;
}
if(!this.bitsets[_7]||typeof (this.bitsets[_7][_8])=="undefined"){
this._initOutcome(_7);
}
var _f=this.container.matrix.isValidationActive();
if(_a&&_f&&!this.container.matrix.isInputPartOfValidation(_9)){
_2.stopEvent(_a);
this.container.matrix.refocusValidatingInput();
return;
}
if(typeof (this.bitsets[_7][_8])=="undefined"){
curam.debug.log(_c+_7+_d+_8+_e);
return;
}
var _10=this.bitsets[_7][_8];
this._initCheckbox(_9,_10);
var _11=_9.bitsetId;
if(_9.checked){
_10.set(_11);
}else{
_10.unSet(_11);
}
if(!_b){
this._validate(_10,_9);
}
},refreshOutcome:function(_12){
if(!this.bitsets[_12]){
this.requiresRefresh=true;
this.refreshValidation();
return;
}
this.deleteOutcome(_12);
this._initOutcome(_12);
var _13=this.bitsets[_12];
for(var _14=0;_14<_13.length;_14++){
if(_13[_14]){
this._validate(_13[_14],_13[_14].inputs[0]);
break;
}
}
},refreshValidation:function(){
if(!this.requiresRefresh){
return;
}
this.inRefresh=true;
if(this.bitsets&&this.bitsets.length>0){
var _15={};
for(var _16=0;_16<this.bitsets.length;_16++){
if(!this.bitsets[_16]){
continue;
}
for(var _17=0;_17<this.bitsets[_16].length;_17++){
if(!this.bitsets[_16][_17]){
continue;
}
_15[this.bitsets[_16][_17].id]=true;
}
}
this._deleteBitsets(_15);
}
this.bitsets=[];
var _18=[];
var _19=this.container.matrix.bottomRight.questions;
if(_19.count<1){
return;
}
var _1a=_19.getObjectByIndex(0).outcomeGroup.keys;
var _1b=curam.matrix.util.safeSplit;
var arr;
for(var _1c=0;_1c<_1a.length;_1c++){
arr=_1b(_1a[_1c],"-");
_18[_1c]=arr[1];
this._initOutcome(_18[_1c]);
}
var _1d,_1e=false;
for(var _1c=0;_1c<_18.length&&!_1e;_1c++){
_1d=this.bitsets[_18[_1c]];
for(var _1f=0;_1f<_1d.length;_1f++){
if(_1d[_1f]&&!this._validate(null,_1d[_1f].inputs[0])){
_1e=true;
break;
}
}
}
if(this.isWarningActive()||this.isErrorActive()){
this.refocus();
}
this.inRefresh=this.requiresRefresh=false;
},deleteCombination:function(_20,_21){
if(!this.bitsets[_20]||!this.bitsets[_20][Number(_21)]){
return;
}
this._deleteBitset(this.bitsets[_20][Number(_21)]);
this.bitsets[_20][Number(_21)]=null;
},deleteOutcome:function(_22){
if(!this.bitsets[_22]){
return;
}
var _23={};
for(var _24=0;_24<this.bitsets[_22].length;_24++){
if(this.bitsets[_22][_24]){
_23[this.bitsets[_22][_24].id]=true;
}
}
this._deleteBitsets(_23);
for(var _24=0;_24<this.bitsets.length;_24++){
if(this.bitsets[_24]==this.bitsets[_22]){
this.bitsets[_24]=null;
break;
}
}
this.bitsets[_22]=null;
},_initOutcome:function(_25){
if(!this.bitsets[_25]){
this.bitsets[_25]=this.bitsets[this.bitsets.length]=[];
}
var _26=this.bitsets[_25];
var _27=this.container.matrix.bottomRight.questions;
var _28,_29;
var _2a,_2b,_2c,_2d,key,qId,_2e;
var _2f=function(id){
return Number(id.substr(id.lastIndexOf("-")+1,id.length))-1;
};
var _30=_27.getObjectByIndex(0).getOutcome(_25).rows.getObjectByIndex(0).cells;
var _31={};
for(var _32=0;_32<_30.count;_32++){
_31[_32]=_2f(_30.keys[_32]);
if(_26.length<_32-1||!_26[_31[_32]]){
this._createBitset(_31[_32],_26);
}
}
for(var _33=0;_33<_27.count;_33++){
_2e=_27.getObjectByIndex(_33);
_28=_2e.getOutcome(_25).rows;
for(var _34=0;_34<_28.count;_34++){
_29=_28.getObjectByIndex(_34).cells;
for(var _35=0;_35<_29.count;_35++){
var _36=_29.getObjectByIndex(_35).input;
_36.bitsetId=null;
this.setOutcomeValue(_25,_31[_35],_36,null,true);
}
}
}
}});
});
