//>>built
define("curam/matrix/validation/PriorityValidator",["dijit","dojo","dojox"],function(_1,_2,_3){
_2.provide("curam.matrix.validation.PriorityValidator");
_2.declare("curam.matrix.validation.PriorityValidator",curam.matrix.validation.DefaultValidator,{constructor:function(_4){
this.setErrorActive(false);
this.activeChangedInput=null;
this.activeExistingInput=null;
this.focusElement=null;
this.container=_4;
this.duplicateMsg=_4.i18nMsgs.duplicateMsg;
},validatePriority:function(e){
if(this.checkForTabShiftKey(e)){
return;
}
var id=e.target.id;
var _5=_2.byId(id).value;
this.unvalidatePriorities();
if(_5==""){
return;
}
var _6=e.target.priorityGroup.priorities;
var _7=e.target.priority;
for(var i=0;i<_6.count;i++){
if(_7.node.id==_6.getObjectByIndex(i).node.id){
continue;
}
var _8=_6.getObjectByIndex(i);
if(_5==_8.input.value){
this.validatePriorities(_7,_8,this.duplicateMsg);
this.focusElement=_7.input;
this.state.allowableFields=[_7.input.id,_8.input.id];
this.addFocusListener([_7.input,_8.input]);
var _9=this;
setTimeout(function(){
_9.focusElement.focus();
},10);
return;
}
}
},validatePriorities:function(_a,_b,_c){
_2.addClass(_a.validation,"validateWarn");
_2.addClass(_b.validation,"validateWarn");
this.activeChangedInput=_a;
this.activeExistingInput=_b;
this.setWarningActive(true);
this.container.activateWarning(_c);
},unvalidatePriorities:function(){
if(!this.isValidationActive()){
return;
}
var rc=_2.removeClass;
if(this.activeChangedInput){
rc(this.activeChangedInput.validation,"validateError");
rc(this.activeChangedInput.validation,"validateWarn");
}
if(this.activeExistingInput){
rc(this.activeExistingInput.validation,"validateWarn");
rc(this.activeExistingInput.validation,"validateError");
}
this.clearInputTabListeners();
this.activeChangedInput=null;
this.activeExistingInput=null;
this.setWarningActive(false);
if(this.isErrorActive()==true){
this.setErrorActive(false);
}
this.container.deactivateValidation();
},checkPriorityValidation:function(e){
if(this.isWarningActive()){
var _d=e.target.parentNode.id;
if(_d==this.activeChangedInput.validation.id||_d==this.activeExistingInput.validation.id){
var _e=this;
this.timeout=setTimeout(function(){
_e.addError(e);
},10);
}
}
},addError:function(e){
_2.addClass(this.activeChangedInput.validation,"validateError");
_2.addClass(this.activeExistingInput.validation,"validateError");
this.container.activateError(this.duplicateMsg);
this.container.matrix.disableInputs(this.activeChangedInput.validation,this.activeExistingInput.validation);
_2.publish("/disableInput",[this.activeChangedInput.input,this.activeExistingInput.input]);
this.focusElement=e.target;
this.cancelInputTabs();
var _f=this;
setTimeout(function(){
_f.focusElement.focus();
},10);
this.setWarningActive(false);
this.setErrorActive(true);
}});
});
