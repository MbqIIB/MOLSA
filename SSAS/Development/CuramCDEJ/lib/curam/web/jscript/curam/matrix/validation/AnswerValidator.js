//>>built
define("curam/matrix/validation/AnswerValidator",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants,curam/matrix/validation/DefaultValidator"],function(_1,_2,_3){
_2.provide("curam.matrix.validation.AnswerValidator");
_2.require("curam.matrix.Constants");
_2.require("curam.matrix.validation.DefaultValidator");
_2.declare("curam.matrix.validation.AnswerValidator",curam.matrix.validation.DefaultValidator,{constructor:function(_4){
this.activeChangedInput=null;
this.activeExistingInput=null;
this.setWarningActive(false);
this.setErrorActive(false);
this.validationList=null;
this.focusElement=null;
this.currentMsg=null;
this.blurEvent=null;
this.state.allowableFields=null;
this.timeout=null;
this.container=_4;
this.emptyMsgDelete=_4.i18nMsgs.emptyMsgDelete;
this.emptyMsg=_4.i18nMsgs.emptyMsg;
this.overlapMsg=_4.i18nMsgs.overlapMsg;
this.duplicateMsg=_4.i18nMsgs.duplicateMsg;
this.onePopulate=_4.i18nMsgs.onePopulate;
this.maxMin=_4.i18nMsgs.maxMin;
},validateNumericAnswer:function(e,_5,_6){
if(e&&this.checkForTabShiftKey(e)){
return;
}
var _7=this.overlapMsg;
var _8=false;
if(!_5&&!_6){
var _9=curam.matrix.util.getQuestionIdFromAnswerInputId(e.target.id);
var _a=curam.matrix.util.getAnswerIdFromAnswerInputId(e.target.id);
var _b=this.getEmptyMsg(_9,_a);
var _c=null;
_6=this.container.matrix.bottomLeft.bottomLeftMain.getQuestion(_9).ansGroup.answers;
_5=_6.getObjectByKey("ans-"+_9+"-"+_a);
_8=true;
}
var _d,_e,_f,_10,_11,_12;
var _13=[];
if(_5.specificValue){
_10=_5.specificValue.value==""||_5.specificValue.value=="-"?"noVal":parseFloat(_5.specificValue.value);
if(_10=="noVal"){
this.focusElement=_5.specificValue;
this.validateAnswers(_5,null,_b,true);
return;
}
for(var i=0;i<_6.count;i++){
var _14=_6.getObjectByIndex(i);
if(_14.node.id==_5.node.id){
continue;
}
if(_14.specificValue){
if(parseFloat(_14.specificValue.value)==_10){
this.validateAnswers(_5,_14,_7,false);
return;
}
}else{
_d=_14.min.value==""?"min":parseFloat(_14.min.value);
_e=_14.max.value==""?"max":parseFloat(_14.max.value);
if(_d==_10||_e==_10||(_d<_10&&(_e>_10||_e=="max"))||(_e>_10&&(_d<_10||_d=="min"))){
if(this.activeExistingInput&&this.isValidationActive()){
_13.push([_5,_14,_7,false]);
}else{
this.validateAnswers(_5,_14,_7,false);
return;
}
}
}
}
}else{
_11=_5.min.value==""?"min":parseFloat(_5.min.value);
_12=_5.max.value==""?"max":parseFloat(_5.max.value);
if(_5.min.value=="-"||_5.min.value=="-"){
this.validateAnswers(_5,null,_b,false);
return;
}else{
if(_11=="min"&&_12=="max"){
this.focusElement=_5.min;
this.validateAnswers(_5,null,this.onePopulate,true);
return;
}else{
if(parseFloat(_11)>=parseFloat(_12)){
var _15=this.maxMin;
if(this.activeExistingInput&&this.isValidationActive()){
_13.push([_5,null,_15,false]);
}else{
this.validateAnswers(_5,null,_15,false);
return;
}
}
}
}
for(var i=0;i<_6.count;i++){
var _14=_6.getObjectByIndex(i);
if(_14.node.id==_5.node.id){
continue;
}
if(_14.specificValue){
_f=Number(_14.specificValue.value);
if(_11==_f||_12==_f){
}else{
if(_11<_f&&(_12>_f||_12=="max")){
}else{
if(_12>_f&&(_11<_f||_11=="min")){
}else{
continue;
}
}
}
if(this.activeExistingInput&&this.isValidationActive()){
_13.push([_5,_14,_7,false]);
}else{
this.validateAnswers(_5,_14,_7,false);
return;
}
}else{
_d=_14.min.value==""?"min":parseFloat(_14.min.value);
_e=_14.max.value==""?"max":parseFloat(_14.max.value);
if(_d==_11||_e==_12){
}else{
if((_12>=_d||_12=="max"||_d=="min")&&_12<=_e){
}else{
if(_12>=_d&&(_12<=_e||_e=="max")){
}else{
if((_e>=_11||_e=="max"||_11=="min")&&_e<=_12){
}else{
if(_e>=_11&&(_e<=_12||_12=="max")){
}else{
continue;
}
}
}
}
}
if(this.activeExistingInput&&this.isValidationActive()){
_13.push([_5,_14,_7,false]);
}else{
this.validateAnswers(_5,_14,_7,false);
return;
}
}
}
}
if(_13.length>0){
for(var _16=0;_16<_13.length;_16++){
if((this.activeExistingInput==_13[_16][0]&&this.activeChangedInput==_13[_16][1])||(this.activeExistingInput==_13[_16][1]&&this.activeChangedInput==_13[_16][0])){
return;
}
}
this.validateAnswers(_13[0][0],_13[0][1],_13[0][2],_13[0][3]);
return;
}
if(this.isValidationActive()){
var _17=this.activeExistingInput;
if(_17&&_17.answerType!=curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
return;
}
this.unvalidateAnswers();
if(_17&&_8){
this.validateNumericAnswer(null,_17,_6);
return;
}
}
},validateCodetableAnswer:function(e){
if(this.checkForTabShiftKey(e)){
return true;
}
var _18=curam.matrix.util.getQuestionIdFromAnswerInputId(e.target.id);
var _19=curam.matrix.util.getAnswerIdFromAnswerInputId(e.target.id);
var _1a=e.target;
if(_1a.selectedIndex<0||_1a.options.length<1){
return true;
}
var _1b=_1a.options[_1a.selectedIndex].value;
var _1c=this.container.matrix.getQuestion(_18);
if(!_1c){
return true;
}
var _1d=_1c.getAnswer(_19);
var _1e=_1c.ansGroup.answers;
var _1f=_1d.select.options[_1d.select.selectedIndex].value;
var _20=_1d.node.id;
var _21,_22,sel;
this.unvalidateAnswers();
var _23;
var _24={};
for(_23=0;_23<_1e.count;_23++){
_21=_1e.getObjectByIndex(_23);
sel=_21.select;
_22=sel.options[sel.selectedIndex].value;
if(_24[_22]){
this.validateAnswers(_24[_22],_21,this.duplicateMsg,false);
return false;
}
_24[_22]=_21;
}
return true;
},validateStringAnswer:function(e){
if(this.checkForTabShiftKey(e)){
return;
}
var _25=e.target.question;
if(!_25.ansGroup){
return;
}
var _26=e.target.value;
var _27=_25.ansGroup.answers;
var _28=e.target.answer;
_28.answerValue=_26;
this.unvalidateAnswers();
if(_26==""||_26==null){
this.focusElement=_28.input;
this.validateAnswers(_28,null,this.getEmptyMsg(_28.id),true);
return;
}
for(var _29=0;_29<_27.count;_29++){
if(_28.node.id==_27.getObjectByIndex(_29).node.id){
continue;
}
if(_26==_27.getObjectByIndex(_29).input.value){
this.focusElement=_28.input;
this.validateAnswers(_28,_27.getObjectByIndex(_29),this.duplicateMsg,true);
return;
}
}
},refreshValidation:function(){
var _2a=this.container.matrix.bottomLeft.bottomLeftMain.questions;
var _2b,_2c,_2d,_2e,_2f,_30;
for(var _31=0;_31<_2a.count;_31++){
var _32=_2a.getObjectByIndex(_31);
var _33=_32.ansGroup.answerType;
_2e=_32.ansGroup.answers;
if(_33==curam.matrix.Constants.ANSWER_TYPE_STRING){
_2f={};
for(var _34=0;_34<_2e.count;_34++){
_2d=_2e.getObjectByIndex(_34);
_2b=_2d.input.value;
if(!_2b||_2b==""){
this.focusElement=_2d.input;
this.validateAnswers(_2d,null,this.getEmptyMsg(_2d.id),true);
return false;
}
if(_2f[_2b]||_2f[_2b]==0){
this.focusElement=_2d.input;
this.validateAnswers(_2d,_2e.getObjectByIndex(_2f[_2b]),this.duplicateMsg,true);
return false;
}
_2f[_2b]=_34;
}
}else{
if(_33==curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
_30={};
for(var _34=0;_34<_2e.count;_34++){
_2d=_2e.getObjectByIndex(_34);
if(_2d.specificValue){
_2b=_2d.specificValue.value;
if(!_2b||_2b==""){
this.focusElement=_2d.specificValue;
this.validateAnswers(_2d,null,this.getEmptyMsg(_2d.id),true);
return false;
}
if(_30[_2b]||_30[_2b]==0){
this.focusElement=_2d.specificValue;
this.validateAnswers(_2d,_2e.getObjectByIndex(_30[_2b]),this.duplicateMsg,true);
return false;
}
_30[_2b]=_34;
}else{
_2b=_2d.min.value;
_2c=_2d.max.value;
if((!_2b||_2b=="")&&(!_2c||_2c=="")){
this.focusElement=_2d.min;
this.validateAnswers(_2d,null,this.getEmptyMsg(_2d.id),true);
return false;
}
}
}
}else{
if(_33==curam.matrix.Constants.ANSWER_TYPE_CODETABLE){
if(!this.validateCodetableAnswer({target:_2e.getObjectByIndex(0).select})){
return false;
}
}
}
}
}
return true;
},checkForError:function(e){
if(!this.isWarningActive()){
return;
}
var _35=this;
this.blurEvent=e;
var _36=curam.matrix.util.safeSplit(e.target.parentNode.id,"-");
var qId=_36[2];
var _37=_36[3];
this.timeout=setTimeout(function(){
_35.addError(qId,_37);
},10);
},addError:function(_38,_39){
var _3a="ans-val-"+_38+"-"+_39;
if(this.isWarningActive()){
if(_3a==this.activeChangedInput.validation.id||(this.activeExistingInput&&_3a==this.activeExistingInput.validation.id&&!this.isErrorActive())){
this.focusElement=this.blurEvent.target;
var _3b=this;
setTimeout(function(){
_3b.focusElement.focus();
},10);
var ac=_2.addClass;
var _38=curam.matrix.util.getQuestionIdFromAnswerInputId(this.blurEvent.target.id);
var _39=curam.matrix.util.getAnswerIdFromAnswerInputId(this.blurEvent.target.id);
var _3c=[this.activeChangedInput.input];
var _3d=this.activeChangedInput.validation;
var _3e=this.activeExistingInput?this.activeExistingInput.validation:null;
ac(_3d,"validateError");
if(_3e){
ac(_3e,"validateError");
_3c[_3c.length]=this.activeExistingInput.input;
}
this.container.activateError(this.currentMsg);
this.container.matrix.disableInputs(_3d,_3e);
_2.publish("/disableInput",[_3c]);
this.cancelInputTabs();
this.setWarningActive(false);
this.setErrorActive(true);
}
}
},validateAnswers:function(_3f,_40,_41,_42){
this.unvalidateAnswers();
var ids=[];
if(_3f.min&&_3f.max){
ids.push(_3f.min.id);
ids.push(_3f.max.id);
}else{
if(_3f.specificValue){
ids.push(_3f.specificValue.id);
}else{
if(_3f.input.nodeName=="SELECT"){
ids.push(_3f.input.id);
}else{
ids.push(_3f.input.id);
}
}
}
if(_40){
if(_40.min&&_40.max){
ids.push(_40.min.id);
ids.push(_40.max.id);
}else{
if(_40.specificValue){
ids.push(_40.specificValue.id);
}else{
if(_40.input.nodeName=="SELECT"){
ids.push(_40.input.id);
}else{
ids.push(_40.input.id);
}
}
}
}
_2.addClass(_3f.validation,"validateWarn");
this.activeChangedInput=_3f;
this.setWarningActive(true);
this.currentMsg=_41;
this.state.allowableFields=ids;
if(_40!=null){
_2.addClass(_40.validation,"validateWarn");
this.activeExistingInput=_40;
}
this.container.activateWarning(_41);
if(_42){
var _43=this;
setTimeout(function(){
_43.focusElement.focus();
},10);
}
},unvalidateAnswers:function(){
if(!this.isValidationActive()){
return;
}
var rc=_2.removeClass;
if(this.activeChangedInput){
rc(this.activeChangedInput.validation,"validateWarn");
rc(this.activeChangedInput.validation,"validateError");
}
if(this.activeExistingInput){
rc(this.activeExistingInput.validation,"validateWarn");
rc(this.activeExistingInput.validation,"validateError");
}
this.clearInputTabListeners();
this.activeChangedInput=null;
this.activeExistingInput=null;
this.state.allowableFields=null;
this.setWarningActive(false);
this.container.deactivateValidation();
if(this.isErrorActive()==true){
this.setErrorActive(false);
}
},unvalidateAndDeleteAnswer:function(_44){
this.unvalidateAnswers();
curam.matrix.Constants.container.matrix.deleteAnswer(_44);
},getEmptyMsg:function(qId,aId){
if(arguments.length==1){
var _45=curam.matrix.util.safeSplit(qId,"-");
qId=_45[1];
aId=_45[2];
}
if(curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.getQuestion(qId).ansGroup.answerCount<2){
return this.emptyMsg;
}
return this.emptyMsgDelete+"<a href='#' onclick='_c.m.answerValidator."+"unvalidateAndDeleteAnswer"+"(\"ans-"+qId+"-"+aId+"\"); return true;'>"+curam.matrix.Constants.container.i18nMsgs.controlDelete+"</a>";
}});
});
