//>>built
require({cache:{"dojo/uacss":function(){
define("dojo/uacss",["./dom-geometry","./_base/lang","./ready","./_base/sniff","./_base/window"],function(_1,_2,_3,_4,_5){
var _6=_5.doc.documentElement,ie=_4("ie"),_7=_4("opera"),_8=Math.floor,ff=_4("ff"),_9=_1.boxModel.replace(/-/,""),_a={"dj_quirks":_4("quirks"),"dj_opera":_7,"dj_khtml":_4("khtml"),"dj_webkit":_4("webkit"),"dj_safari":_4("safari"),"dj_chrome":_4("chrome"),"dj_gecko":_4("mozilla")};
if(ie){
_a["dj_ie"]=true;
_a["dj_ie"+_8(ie)]=true;
_a["dj_iequirks"]=_4("quirks");
}
if(ff){
_a["dj_ff"+_8(ff)]=true;
}
_a["dj_"+_9]=true;
var _b="";
for(var _c in _a){
if(_a[_c]){
_b+=_c+" ";
}
}
_6.className=_2.trim(_6.className+" "+_b);
_3(90,function(){
if(!_1.isBodyLtr()){
var _d="dj_rtl dijitRtl "+_b.replace(/ /g,"-rtl ");
_6.className=_2.trim(_6.className+" "+_d+"dj_rtl dijitRtl "+_b.replace(/ /g,"-rtl "));
}
});
return _4;
});
},"url:curam/widget/resources/DivButton.html":"<div id=\"${id}\" class=\"${className}\" dojoAttachEvent=\"onclick:onClick\" dojoAttachPoint=\"containerNode\"></div>\r\n\r\n {\r\n      templateString: \"<div id='${id}' class='${className}' \"\r\n            + \"dojoAttachEvent='onclick:onClick' dojoAttachPoint='containerNode'></div>\"\r\n    }\r\n\r\n","curam/matrix/validation/ContradictionValidator":function(){
define("curam/matrix/validation/ContradictionValidator",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants,curam/matrix/validation/DefaultCombinationValidator,curam/util/ResourceBundle"],function(_e,_f,_10){
_f.provide("curam.matrix.validation.ContradictionValidator");
_f.require("curam.matrix.Constants");
_f.require("curam.matrix.validation.DefaultCombinationValidator");
_f.require("curam.util.ResourceBundle");
var _11=new curam.util.ResourceBundle("Debug");
_f.declare("curam.matrix.validation.ContradictionValidator",curam.matrix.validation.DefaultCombinationValidator,{warningSingleMsg:"",warningMsg:"",errorMsg:"",constructor:function(_12,_13){
this.container=_12;
this.bitsets=[];
this.validatingCombCells=false;
this.matchingCombCells=false;
this.state.duplicateWarningActive=false;
this.state.singleWarningActive=false;
this.state.questionWarningActive=false;
this.setErrorActive(false);
this.isInitialized=false;
if(_13){
_f.mixin(this,_13);
}
this._registerValidator(this);
this.state=curam.matrix.validation.DefaultCombinationValidator.prototype.state;
},initialize:function(){
this.isInitialized=true;
this.bitsets=[];
var _14=this.container.matrix.bottomRight.questions.getObjectByIndex(0).contradiction;
this.numCols=_14?_14.rows.getObjectByIndex(0).cells.count:0;
},refreshValidation:function(){
if(!this.requiresRefresh){
return;
}
this.inRefresh=true;
for(var _15=0;_15<this.bitsets.length;_15++){
if(this.bitsets[_15]){
for(var _16=0;_16<this.bitsets[_15].inputs.length;_16++){
this.bitsets[_15].inputs[_16].bitsetId=null;
}
}
}
var _17={};
for(var _15=0;_15<this.bitsets.length;_15++){
if(this.bitsets[_15]){
_17[this.bitsets[_15].id]=true;
}
}
this._deleteBitsets(_17);
this.isInitialized=false;
this.initialize();
for(var _15=0;_15<this.numCols;_15++){
this._initColumn(_15);
}
var _18;
var _19=curam.matrix.Constants.container.existingQuestionIds.split("|");
if(_19.length>0&&_19[_19.length-1].length==0){
_19.splice(_19.length-1,1);
}
for(var _15=0;_15<this.numCols;_15++){
_18=this.bitsets[_15];
if(_18&&!this._validate(_18,_18.inputs[0],_19)){
break;
}
}
if(this.isWarningActive()||this.isErrorActive()){
this.refocus();
}
this.inRefresh=this.requiresRefresh=false;
},_initColumn:function(_1a){
if(!this.isInitialized){
this.initialize();
}
var _1b=this.container.matrix.bottomRight.questions;
var _1c=_11.getProperty("curam.matrix.validation.ContradictionValidator"+".err.1");
var _1d=_11.getProperty("curam.matrix.validation.ContradictionValidator"+".err.2");
var _1e=_11.getProperty("curam.matrix.validation.ContradictionValidator"+".err.3");
var _1f=_1b.getObjectByIndex(0).contradiction.rows.getObjectByIndex(0).cells.getObjectByIndex(_1a).input.id;
var _20=Number(_1f.split(".")[4])-1;
if(this.bitsets[_20]){
return;
}
var _21=this._createBitset(_20,this.bitsets);
var _22,_23;
if(_1a>this.numCols){
curam.debug.log(_1c+"(_initColumn) colNum = "+_1a+_1d+this.numCols+_1e);
return;
}
var _24;
for(var _25=0;_25<_1b.count;_25++){
_24=_1b.getObjectByIndex(_25);
_22=_24.contradiction.rows;
for(var _26=0;_26<_22.count;_26++){
_23=_22.getObjectByIndex(_26).cells.getObjectByIndex(_1a).input;
_23.qId=_24.qId;
this.setContradictionValue(_20,_23,null,_24.qId,true);
}
}
},_createBitset:function(_27,arr){
var _28=curam.matrix.validation.DefaultCombinationValidator.prototype._createBitset.apply(this,arguments);
_28.qCount={};
return _28;
},setContradictionValue:function(_29,_2a,_2b,qId,_2c){
if(_2b!==null){
_2b=_f.fixEvent(_2b);
}
if(this._checkRefresh()){
return;
}
if(_2b&&this.container.matrix.isValidationActive()&&((this.state.questionWarningActive&&_2a.checked)||!this.container.matrix.isInputPartOfValidation(_2a))){
_f.stopEvent(_2b);
this.container.matrix.refocusValidatingInput();
return;
}
if(!this.bitsets[_29]){
this.refreshValidation();
}
var _2d=this.bitsets[_29];
this._initCheckbox(_2a,_2d);
var _2e=_2a.bitsetId;
if(_2a.checked){
if(_2d.set(_2e)){
_2d.qCount[qId]=typeof (_2d.qCount[qId])=="undefined"?1:_2d.qCount[qId]+1;
}
}else{
if(_2d.unSet(_2e)&&_2d.qCount[qId]){
_2d.qCount[qId]--;
}
}
if(!_2c){
this._validate(_2d,_2a);
}
},_validateQuestionCount:function(_2f,_30){
var _31=0;
for(var _32=0;_32<_30.length&&_31<2;_32++){
if(_2f.qCount[_30[_32]]>0){
_31++;
}
}
if(_31<2){
this.state.singleWarningActive=true;
this._setErrorBitsets(_2f,null);
this.currentMsg=this.singleWarningMsg;
return false;
}
return true;
},_validateOne:function(_33){
this.state.singleWarningActive=(this.inSave&&_33.isClear())||_33.isSingleSet();
if(this.state.singleWarningActive){
this._setErrorBitsets(_33,null);
this.currentMsg=this.singleWarningMsg;
}
return !this.state.singleWarningActive;
},deleteContradiction:function(){
var _34={};
for(var _35=0;_35<this.bitsets.length;_35++){
if(this.bitsets[_35]){
_34[this.bitsets[_35].id]=true;
}
}
this._deleteBitsets(_34);
this.bitsets=[];
}});
});
},"curam/matrix/validation/DefaultValidator":function(){
define("curam/matrix/validation/DefaultValidator",["dijit","dojo","dojox"],function(_36,_37,_38){
_37.provide("curam.matrix.validation.DefaultValidator");
_37.declare("curam.matrix.validation.DefaultValidator",null,{keys:_37.keys,constructor:function(){
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
},setErrorActive:function(val){
this.state.errorActive=val;
},setWarningActive:function(val){
this.state.warningActive=val;
},isValidationActive:function(){
return this.isWarningActive()||this.isErrorActive();
},checkFocusInError:function(evt){
if(!this.isErrorActive()||evt.keyCode!=9){
return false;
}
if(evt.keyCode!=9){
return true;
}
var idx=0;
for(var _39=0;_39<this.state.allowableFields.length;_39++){
if(evt.target.id==this.state.allowableFields[_39]){
idx=_39+1;
if(idx>=this.state.allowableFields.length){
idx=0;
}
break;
}
}
_37.byId(this.state.allowableFields[idx]).focus();
return true;
},addFocusListener:function(_3a){
var _3b=this;
var _3c=function(e){
return _3b.checkFocus(e);
};
for(var _3d=0;_3d<_3a.length;_3d++){
if(!_3a[_3d]["_hasFocusListener_"]){
_37.connect(_3a[_3d],"onfocus",_3c);
_3a[_3d]["_hasFocusListener_"]=true;
}
}
},checkFocus:function(e){
if(!this.isWarningActive()&&!this.isErrorActive()){
return;
}
e=e?e:_37.fixEvent(null);
for(var i=0;i<this.state.allowableFields.length;i++){
if(this.state.allowableFields[i]==e.target.id){
clearTimeout(this.timeout);
return;
}
}
_37.stopEvent(e);
},refocus:function(){
if(this.focusElement){
this.focusElement.focus();
}else{
if(this.state.allowableFields&&this.state.allowableFields.length>0){
_37.byId(this.state.allowableFields[0]).focus();
}
}
},cancelInputTabs:function(){
if(!this.state.allowableFields||this.state.allowableFields.length==0){
return;
}
var _3e=this;
this._tabFns=[];
for(var i=0;i<this.state.allowableFields.length;i++){
this._tabFns[this._tabFns.length]=_37.connect(_37.byId(this.state.allowableFields[i]),"key",function(evt){
if(_3e.isErrorActive()){
if(evt.keyCode==9){
_3e.checkFocusInError(evt);
_37.stopEvent(evt);
return false;
}
}else{
_3e.clearInputTabListeners();
}
return true;
});
}
},clearInputTabListeners:function(){
if(this._tabFns){
for(var _3f=0;_3f<this.state.allowableFields.length;_3f++){
_37.disconnect(this._tabFns[_3f]);
}
this._tabFns=null;
}
},checkForTabShiftKey:function(evt){
if(this.skipKeys[evt.keyCode]){
return true;
}
return false;
},isInputPartOfValidation:function(_40){
if(!this.isErrorActive()&&!this.isWarningActive()||!this.state.allowableFields){
return false;
}
for(var _41=0;_41<this.state.allowableFields.length;_41++){
if(_40.id==this.state.allowableFields[_41]){
return true;
}
}
return false;
}});
});
},"curam/matrix/Constants":function(){
define("curam/matrix/Constants",["curam/define"],function(){
curam.define.singleton("curam.matrix.Constants",{ANSWER_TYPE_CODETABLE:"codetable",ANSWER_TYPE_NUMERIC:"numeric",ANSWER_TYPE_BOOLEAN:"boolean",ANSWER_TYPE_STRING:"string",SPECIFIC_VALUE:"specificvalue",MIN_MAX:"minmax",MATRIX_BORDER_SIZE:1,COMBINATION_CELL_WIDTH:22,columnLetters:new Array("C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"),container:null});
return curam.matrix.Constants;
});
},"dojo/text":function(){
define("dojo/text",["./_base/kernel","require","./has","./_base/xhr"],function(_42,_43,has,xhr){
var _44;
if(1){
_44=function(url,_45,_46){
xhr("GET",{url:url,sync:!!_45,load:_46});
};
}else{
if(_43.getText){
_44=_43.getText;
}else{
console.error("dojo/text plugin failed to load because loader does not support getText");
}
}
var _47={},_48=function(_49){
if(_49){
_49=_49.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _4a=_49.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_4a){
_49=_4a[1];
}
}else{
_49="";
}
return _49;
},_4b={},_4c={},_4d={dynamic:true,normalize:function(id,_4e){
var _4f=id.split("!"),url=_4f[0];
return (/^\./.test(url)?_4e(url):url)+(_4f[1]?"!"+_4f[1]:"");
},load:function(id,_50,_51){
var _52=id.split("!"),_53=_52.length>1,_54=_52[0],url=_50.toUrl(_52[0]),_55=_4b,_56=function(_57){
_51(_53?_48(_57):_57);
};
if(_54 in _47){
_55=_47[_54];
}else{
if(url in _50.cache){
_55=_50.cache[url];
}else{
if(url in _47){
_55=_47[url];
}
}
}
if(_55===_4b){
if(_4c[url]){
_4c[url].push(_56);
}else{
var _58=_4c[url]=[_56];
_44(url,!_50.async,function(_59){
_47[_54]=_47[url]=_59;
for(var i=0;i<_58.length;){
_58[i++](_59);
}
delete _4c[url];
});
}
}else{
_56(_55);
}
}};
_42.cache=function(_5a,url,_5b){
var key;
if(typeof _5a=="string"){
if(/\//.test(_5a)){
key=_5a;
_5b=url;
}else{
key=_43.toUrl(_5a.replace(/\./g,"/")+(url?("/"+url):""));
}
}else{
key=_5a+"";
_5b=url;
}
var val=(_5b!=undefined&&typeof _5b!="string")?_5b.value:_5b,_5c=_5b&&_5b.sanitize;
if(typeof val=="string"){
_47[key]=val;
return _5c?_48(val):val;
}else{
if(val===null){
delete _47[key];
return null;
}else{
if(!(key in _47)){
_44(key,true,function(_5d){
_47[key]=_5d;
});
}
return _5c?_48(_47[key]):_47[key];
}
}
};
return _4d;
});
},"dijit/hccss":function(){
define("dijit/hccss",["require","dojo/_base/config","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/ready","dojo/_base/sniff","dojo/_base/window"],function(_5e,_5f,_60,_61,_62,_63,has,win){
if(has("ie")||has("mozilla")){
_63(90,function(){
var div=_61.create("div",{id:"a11yTestNode",style:{cssText:"border: 1px solid;"+"border-color:red green;"+"position: absolute;"+"height: 5px;"+"top: -999px;"+"background-image: url(\""+(_5f.blankGif||_5e.toUrl("dojo/resources/blank.gif"))+"\");"}},win.body());
var cs=_62.getComputedStyle(div);
if(cs){
var _64=cs.backgroundImage;
var _65=(cs.borderTopColor==cs.borderRightColor)||(_64!=null&&(_64=="none"||_64=="url(invalid-url:)"));
if(_65){
_60.add(win.body(),"dijit_a11y");
}
if(has("ie")){
div.outerHTML="";
}else{
win.body().removeChild(div);
}
}
});
}
});
},"dijit/_Contained":function(){
define("dijit/_Contained",["dojo/_base/declare","./registry"],function(_66,_67){
return _66("dijit._Contained",null,{_getSibling:function(_68){
var _69=this.domNode;
do{
_69=_69[_68+"Sibling"];
}while(_69&&_69.nodeType!=1);
return _69&&_67.byNode(_69);
},getPreviousSibling:function(){
return this._getSibling("previous");
},getNextSibling:function(){
return this._getSibling("next");
},getIndexInParent:function(){
var p=this.getParent();
if(!p||!p.getIndexOfChild){
return -1;
}
return p.getIndexOfChild(this);
}});
});
},"curam/matrix/validation/AnswerValidator":function(){
define("curam/matrix/validation/AnswerValidator",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants,curam/matrix/validation/DefaultValidator"],function(_6a,_6b,_6c){
_6b.provide("curam.matrix.validation.AnswerValidator");
_6b.require("curam.matrix.Constants");
_6b.require("curam.matrix.validation.DefaultValidator");
_6b.declare("curam.matrix.validation.AnswerValidator",curam.matrix.validation.DefaultValidator,{constructor:function(_6d){
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
this.container=_6d;
this.emptyMsgDelete=_6d.i18nMsgs.emptyMsgDelete;
this.emptyMsg=_6d.i18nMsgs.emptyMsg;
this.overlapMsg=_6d.i18nMsgs.overlapMsg;
this.duplicateMsg=_6d.i18nMsgs.duplicateMsg;
this.onePopulate=_6d.i18nMsgs.onePopulate;
this.maxMin=_6d.i18nMsgs.maxMin;
},validateNumericAnswer:function(e,_6e,_6f){
if(e&&this.checkForTabShiftKey(e)){
return;
}
var _70=this.overlapMsg;
var _71=false;
if(!_6e&&!_6f){
var _72=curam.matrix.util.getQuestionIdFromAnswerInputId(e.target.id);
var _73=curam.matrix.util.getAnswerIdFromAnswerInputId(e.target.id);
var _74=this.getEmptyMsg(_72,_73);
var _75=null;
_6f=this.container.matrix.bottomLeft.bottomLeftMain.getQuestion(_72).ansGroup.answers;
_6e=_6f.getObjectByKey("ans-"+_72+"-"+_73);
_71=true;
}
var _76,_77,_78,_79,_7a,_7b;
var _7c=[];
if(_6e.specificValue){
_79=_6e.specificValue.value==""||_6e.specificValue.value=="-"?"noVal":parseFloat(_6e.specificValue.value);
if(_79=="noVal"){
this.focusElement=_6e.specificValue;
this.validateAnswers(_6e,null,_74,true);
return;
}
for(var i=0;i<_6f.count;i++){
var _7d=_6f.getObjectByIndex(i);
if(_7d.node.id==_6e.node.id){
continue;
}
if(_7d.specificValue){
if(parseFloat(_7d.specificValue.value)==_79){
this.validateAnswers(_6e,_7d,_70,false);
return;
}
}else{
_76=_7d.min.value==""?"min":parseFloat(_7d.min.value);
_77=_7d.max.value==""?"max":parseFloat(_7d.max.value);
if(_76==_79||_77==_79||(_76<_79&&(_77>_79||_77=="max"))||(_77>_79&&(_76<_79||_76=="min"))){
if(this.activeExistingInput&&this.isValidationActive()){
_7c.push([_6e,_7d,_70,false]);
}else{
this.validateAnswers(_6e,_7d,_70,false);
return;
}
}
}
}
}else{
_7a=_6e.min.value==""?"min":parseFloat(_6e.min.value);
_7b=_6e.max.value==""?"max":parseFloat(_6e.max.value);
if(_6e.min.value=="-"||_6e.min.value=="-"){
this.validateAnswers(_6e,null,_74,false);
return;
}else{
if(_7a=="min"&&_7b=="max"){
this.focusElement=_6e.min;
this.validateAnswers(_6e,null,this.onePopulate,true);
return;
}else{
if(parseFloat(_7a)>=parseFloat(_7b)){
var _7e=this.maxMin;
if(this.activeExistingInput&&this.isValidationActive()){
_7c.push([_6e,null,_7e,false]);
}else{
this.validateAnswers(_6e,null,_7e,false);
return;
}
}
}
}
for(var i=0;i<_6f.count;i++){
var _7d=_6f.getObjectByIndex(i);
if(_7d.node.id==_6e.node.id){
continue;
}
if(_7d.specificValue){
_78=Number(_7d.specificValue.value);
if(_7a==_78||_7b==_78){
}else{
if(_7a<_78&&(_7b>_78||_7b=="max")){
}else{
if(_7b>_78&&(_7a<_78||_7a=="min")){
}else{
continue;
}
}
}
if(this.activeExistingInput&&this.isValidationActive()){
_7c.push([_6e,_7d,_70,false]);
}else{
this.validateAnswers(_6e,_7d,_70,false);
return;
}
}else{
_76=_7d.min.value==""?"min":parseFloat(_7d.min.value);
_77=_7d.max.value==""?"max":parseFloat(_7d.max.value);
if(_76==_7a||_77==_7b){
}else{
if((_7b>=_76||_7b=="max"||_76=="min")&&_7b<=_77){
}else{
if(_7b>=_76&&(_7b<=_77||_77=="max")){
}else{
if((_77>=_7a||_77=="max"||_7a=="min")&&_77<=_7b){
}else{
if(_77>=_7a&&(_77<=_7b||_7b=="max")){
}else{
continue;
}
}
}
}
}
if(this.activeExistingInput&&this.isValidationActive()){
_7c.push([_6e,_7d,_70,false]);
}else{
this.validateAnswers(_6e,_7d,_70,false);
return;
}
}
}
}
if(_7c.length>0){
for(var _7f=0;_7f<_7c.length;_7f++){
if((this.activeExistingInput==_7c[_7f][0]&&this.activeChangedInput==_7c[_7f][1])||(this.activeExistingInput==_7c[_7f][1]&&this.activeChangedInput==_7c[_7f][0])){
return;
}
}
this.validateAnswers(_7c[0][0],_7c[0][1],_7c[0][2],_7c[0][3]);
return;
}
if(this.isValidationActive()){
var _80=this.activeExistingInput;
if(_80&&_80.answerType!=curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
return;
}
this.unvalidateAnswers();
if(_80&&_71){
this.validateNumericAnswer(null,_80,_6f);
return;
}
}
},validateCodetableAnswer:function(e){
if(this.checkForTabShiftKey(e)){
return true;
}
var _81=curam.matrix.util.getQuestionIdFromAnswerInputId(e.target.id);
var _82=curam.matrix.util.getAnswerIdFromAnswerInputId(e.target.id);
var _83=e.target;
if(_83.selectedIndex<0||_83.options.length<1){
return true;
}
var _84=_83.options[_83.selectedIndex].value;
var _85=this.container.matrix.getQuestion(_81);
if(!_85){
return true;
}
var _86=_85.getAnswer(_82);
var _87=_85.ansGroup.answers;
var _88=_86.select.options[_86.select.selectedIndex].value;
var _89=_86.node.id;
var _8a,_8b,sel;
this.unvalidateAnswers();
var _8c;
var _8d={};
for(_8c=0;_8c<_87.count;_8c++){
_8a=_87.getObjectByIndex(_8c);
sel=_8a.select;
_8b=sel.options[sel.selectedIndex].value;
if(_8d[_8b]){
this.validateAnswers(_8d[_8b],_8a,this.duplicateMsg,false);
return false;
}
_8d[_8b]=_8a;
}
return true;
},validateStringAnswer:function(e){
if(this.checkForTabShiftKey(e)){
return;
}
var _8e=e.target.question;
if(!_8e.ansGroup){
return;
}
var _8f=e.target.value;
var _90=_8e.ansGroup.answers;
var _91=e.target.answer;
_91.answerValue=_8f;
this.unvalidateAnswers();
if(_8f==""||_8f==null){
this.focusElement=_91.input;
this.validateAnswers(_91,null,this.getEmptyMsg(_91.id),true);
return;
}
for(var _92=0;_92<_90.count;_92++){
if(_91.node.id==_90.getObjectByIndex(_92).node.id){
continue;
}
if(_8f==_90.getObjectByIndex(_92).input.value){
this.focusElement=_91.input;
this.validateAnswers(_91,_90.getObjectByIndex(_92),this.duplicateMsg,true);
return;
}
}
},refreshValidation:function(){
var _93=this.container.matrix.bottomLeft.bottomLeftMain.questions;
var _94,_95,_96,_97,_98,_99;
for(var _9a=0;_9a<_93.count;_9a++){
var _9b=_93.getObjectByIndex(_9a);
var _9c=_9b.ansGroup.answerType;
_97=_9b.ansGroup.answers;
if(_9c==curam.matrix.Constants.ANSWER_TYPE_STRING){
_98={};
for(var _9d=0;_9d<_97.count;_9d++){
_96=_97.getObjectByIndex(_9d);
_94=_96.input.value;
if(!_94||_94==""){
this.focusElement=_96.input;
this.validateAnswers(_96,null,this.getEmptyMsg(_96.id),true);
return false;
}
if(_98[_94]||_98[_94]==0){
this.focusElement=_96.input;
this.validateAnswers(_96,_97.getObjectByIndex(_98[_94]),this.duplicateMsg,true);
return false;
}
_98[_94]=_9d;
}
}else{
if(_9c==curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
_99={};
for(var _9d=0;_9d<_97.count;_9d++){
_96=_97.getObjectByIndex(_9d);
if(_96.specificValue){
_94=_96.specificValue.value;
if(!_94||_94==""){
this.focusElement=_96.specificValue;
this.validateAnswers(_96,null,this.getEmptyMsg(_96.id),true);
return false;
}
if(_99[_94]||_99[_94]==0){
this.focusElement=_96.specificValue;
this.validateAnswers(_96,_97.getObjectByIndex(_99[_94]),this.duplicateMsg,true);
return false;
}
_99[_94]=_9d;
}else{
_94=_96.min.value;
_95=_96.max.value;
if((!_94||_94=="")&&(!_95||_95=="")){
this.focusElement=_96.min;
this.validateAnswers(_96,null,this.getEmptyMsg(_96.id),true);
return false;
}
}
}
}else{
if(_9c==curam.matrix.Constants.ANSWER_TYPE_CODETABLE){
if(!this.validateCodetableAnswer({target:_97.getObjectByIndex(0).select})){
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
var _9e=this;
this.blurEvent=e;
var _9f=curam.matrix.util.safeSplit(e.target.parentNode.id,"-");
var qId=_9f[2];
var _a0=_9f[3];
this.timeout=setTimeout(function(){
_9e.addError(qId,_a0);
},10);
},addError:function(_a1,_a2){
var _a3="ans-val-"+_a1+"-"+_a2;
if(this.isWarningActive()){
if(_a3==this.activeChangedInput.validation.id||(this.activeExistingInput&&_a3==this.activeExistingInput.validation.id&&!this.isErrorActive())){
this.focusElement=this.blurEvent.target;
var _a4=this;
setTimeout(function(){
_a4.focusElement.focus();
},10);
var ac=_6b.addClass;
var _a1=curam.matrix.util.getQuestionIdFromAnswerInputId(this.blurEvent.target.id);
var _a2=curam.matrix.util.getAnswerIdFromAnswerInputId(this.blurEvent.target.id);
var _a5=[this.activeChangedInput.input];
var _a6=this.activeChangedInput.validation;
var _a7=this.activeExistingInput?this.activeExistingInput.validation:null;
ac(_a6,"validateError");
if(_a7){
ac(_a7,"validateError");
_a5[_a5.length]=this.activeExistingInput.input;
}
this.container.activateError(this.currentMsg);
this.container.matrix.disableInputs(_a6,_a7);
_6b.publish("/disableInput",[_a5]);
this.cancelInputTabs();
this.setWarningActive(false);
this.setErrorActive(true);
}
}
},validateAnswers:function(_a8,_a9,_aa,_ab){
this.unvalidateAnswers();
var ids=[];
if(_a8.min&&_a8.max){
ids.push(_a8.min.id);
ids.push(_a8.max.id);
}else{
if(_a8.specificValue){
ids.push(_a8.specificValue.id);
}else{
if(_a8.input.nodeName=="SELECT"){
ids.push(_a8.input.id);
}else{
ids.push(_a8.input.id);
}
}
}
if(_a9){
if(_a9.min&&_a9.max){
ids.push(_a9.min.id);
ids.push(_a9.max.id);
}else{
if(_a9.specificValue){
ids.push(_a9.specificValue.id);
}else{
if(_a9.input.nodeName=="SELECT"){
ids.push(_a9.input.id);
}else{
ids.push(_a9.input.id);
}
}
}
}
_6b.addClass(_a8.validation,"validateWarn");
this.activeChangedInput=_a8;
this.setWarningActive(true);
this.currentMsg=_aa;
this.state.allowableFields=ids;
if(_a9!=null){
_6b.addClass(_a9.validation,"validateWarn");
this.activeExistingInput=_a9;
}
this.container.activateWarning(_aa);
if(_ab){
var _ac=this;
setTimeout(function(){
_ac.focusElement.focus();
},10);
}
},unvalidateAnswers:function(){
if(!this.isValidationActive()){
return;
}
var rc=_6b.removeClass;
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
},unvalidateAndDeleteAnswer:function(_ad){
this.unvalidateAnswers();
curam.matrix.Constants.container.matrix.deleteAnswer(_ad);
},getEmptyMsg:function(qId,aId){
if(arguments.length==1){
var _ae=curam.matrix.util.safeSplit(qId,"-");
qId=_ae[1];
aId=_ae[2];
}
if(curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.getQuestion(qId).ansGroup.answerCount<2){
return this.emptyMsg;
}
return this.emptyMsgDelete+"<a href='#' onclick='_c.m.answerValidator."+"unvalidateAndDeleteAnswer"+"(\"ans-"+qId+"-"+aId+"\"); return true;'>"+curam.matrix.Constants.container.i18nMsgs.controlDelete+"</a>";
}});
});
},"curam/matrix/BottomLeft":function(){
define("curam/matrix/BottomLeft",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_af,_b0,_b1){
_b0.provide("curam.matrix.BottomLeft");
_b0.require("curam.matrix.Constants");
_b0.declare("curam.matrix.BottomLeft",null,{constructor:function(){
this.node=_b0.byId("bottom-left");
this.bottomLeftMain=new curam.matrix.BottomLeftMain();
this.bottomLeftFiller=new curam.matrix.BottomLeftFiller();
},setDimensions:function(){
this.bottomLeftFiller.setDimensions();
this.bottomLeftMain.setDimensions();
this.setHeight();
curam.matrix.Constants.container.cssText.append(".matrix-container .bottom-left-eval{width:").append(curam.matrix.Constants.container.leftMatrixWidth).append("px;}");
},setHeight:function(){
var c=curam.matrix.Constants.container;
this.heightIncBorder=this.bottomLeftMain.height+c.matrix.bottomLeft.bottomLeftFiller.height+curam.matrix.Constants.MATRIX_BORDER_SIZE;
c.cssText.append(".matrix-container .bottom-eval{height:").append(this.bottomLeftMain.height+c.matrix.bottomLeft.bottomLeftFiller.height).append("px;}");
}});
});
},"curam/matrix/ContradictionCell":function(){
define("curam/matrix/ContradictionCell",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_b2,_b3,_b4){
_b3.provide("curam.matrix.ContradictionCell");
_b3.require("curam.matrix.Constants");
_b3.declare("curam.matrix.ContradictionCell",null,{constructor:function(_b5){
this.node=_b5;
this.input=_b3.query("> :first-child",this.node)[0];
this.button=cm.nextSibling(this.input);
this.initListener();
this.widgetCreated=false;
},initListener:function(){
if(this.button&&!_b3.hasClass(this.button,"hidden-image")){
var _b6=this;
curam.matrix.Constants.container.matrix.addLazyWidget(this,"cells");
this.lazyListener=function(_b7){
if(!curam.matrix.Constants.container.matrix.createLazyWidgets("cells")){
_b3.disconnect(this.button._conn);
return;
}
if(!_b6.widget){
return;
}
_b6.widget._toggleMenu("CombinationOptions",_b7);
window.activeMenuID=_b6.node.id;
_b2.byId("CombinationOptions")._openMyself(curam.matrix.Constants.container.getFakeEvent(_b6.widget.domNode));
};
this.button._conn=_b3.connect(this.button,"onclick",this,"lazyListener");
}
},createWidget:function(_b8){
var c=curam.matrix.Constants.container;
if(this.widgetCreated){
return;
}
if(!this.button.cellId){
this.button.cellId=this.node.id;
}
this.widget=new curam.widget.CombinationButton({menuId:"CombinationOptions"},this.button);
var _b9=this.input.id.split(".");
this.widget.colId=_b9[_b9.length-1];
this.widgetCreated=true;
window.activeMenuID=this.node.id;
_b3.disconnect(this.button._conn);
},setButtonClass:function(_ba){
if(!this.button){
this.button=_b3.create("div");
this.node.appendChild(this.button);
}
cm.setClass(this.button,_ba);
if(!this.widgetCreated&&_ba=="image"){
this.initListener();
}
},adjustFirstRowClass:function(_bb){
var _bc=_b3.attr(this.node,"class");
if(_bc.indexOf("ans-eval-with-menu")==-1){
_bc=_bc.replace("ans-eval","ans-eval-with-menu");
cm.setClass(this.node,_bc);
}
_bc=_b3.attr(this.input,"class");
if(_bc.indexOf("cbox-eval-with-menu")==-1){
_bc=_bc.replace("cbox-eval","cbox-eval-with-menu");
cm.setClass(this.input,_bc);
}
}});
});
},"dojo/parser":function(){
define("dojo/parser",["./_base/kernel","./_base/lang","./_base/array","./_base/config","./_base/html","./_base/window","./_base/url","./_base/json","./aspect","./date/stamp","./has","./query","./on","./ready"],function(_bd,_be,_bf,_c0,_c1,_c2,_c3,_c4,_c5,_c6,has,_c7,don,_c8){
new Date("X");
if(1){
var _c9=document.createElement("form");
has.add("dom-attributes-explicit",_c9.attributes.length==0);
has.add("dom-attributes-specified-flag",_c9.attributes.length<40);
}
_bd.parser=new function(){
var _ca={};
function _cb(_cc){
var map={};
for(var _cd in _cc){
if(_cd.charAt(0)=="_"){
continue;
}
map[_cd.toLowerCase()]=_cd;
}
return map;
};
_c5.after(_be,"extend",function(){
_ca={};
},true);
var _ce={};
function _cf(_d0){
var map=_ce[_d0]||(_ce[_d0]={});
return map["__type"]||(map["__type"]=(_be.getObject(_d0)||require(_d0)));
};
this._functionFromScript=function(_d1,_d2){
var _d3="";
var _d4="";
var _d5=(_d1.getAttribute(_d2+"args")||_d1.getAttribute("args"));
if(_d5){
_bf.forEach(_d5.split(/\s*,\s*/),function(_d6,idx){
_d3+="var "+_d6+" = arguments["+idx+"]; ";
});
}
var _d7=_d1.getAttribute("with");
if(_d7&&_d7.length){
_bf.forEach(_d7.split(/\s*,\s*/),function(_d8){
_d3+="with("+_d8+"){";
_d4+="}";
});
}
return new Function(_d3+_d1.innerHTML+_d4);
};
this.instantiate=function(_d9,_da,_db){
_da=_da||{};
_db=_db||{};
var _dc=(_db.scope||_bd._scopeName)+"Type",_dd="data-"+(_db.scope||_bd._scopeName)+"-",_de=_dd+"type";
var _df=[];
_bf.forEach(_d9,function(_e0){
var _e1=_dc in _da?_da[_dc]:_e0.getAttribute(_de)||_e0.getAttribute(_dc);
if(_e1){
_df.push({node:_e0,"type":_e1});
}
});
return this._instantiate(_df,_da,_db);
};
this._instantiate=function(_e2,_e3,_e4){
var _e5=[];
var _e6=(_e4.scope||_bd._scopeName)+"Type",_e7="data-"+(_e4.scope||_bd._scopeName)+"-",_e8=_e7+"type",_e9=_e7+"props",_ea=_e7+"attach-point",_eb=_e7+"attach-event",_ec=_e7+"id",_ed=_e7+"mixins";
var _ee={};
_bf.forEach([_e9,_e8,_e6,_ec,"jsId",_ea,_eb,"dojoAttachPoint","dojoAttachEvent","class","style",_ed],function(_ef){
_ee[_ef.toLowerCase()]=_ef.replace(_e4.scope,"dojo");
});
function _f0(_f1,_f2){
return _f1.createSubclass&&_f1.createSubclass(_f2)||_f1.extend.apply(_f1,_f2);
};
_bf.forEach(_e2,function(obj){
if(!obj){
return;
}
var _f3=obj.node,_f4=obj.type,_f5=_f3.getAttribute(_ed),_f6;
if(_f5){
var map=_ce[_f4];
_f5=_f5.replace(/ /g,"");
_f6=map&&map[_f5];
if(!_f6){
_f6=_cf(_f4);
_f6=_ce[_f4][_f5]=_f0(_f6,_bf.map(_f5.split(","),_cf));
}
}else{
_f6=_cf(_f4);
}
var _f7=_f6&&_f6.prototype;
var _f8={};
if(_e4.defaults){
_be.mixin(_f8,_e4.defaults);
}
if(obj.inherited){
_be.mixin(_f8,obj.inherited);
}
var _f9;
if(has("dom-attributes-explicit")){
_f9=_f3.attributes;
}else{
if(has("dom-attributes-specified-flag")){
_f9=_bf.filter(_f3.attributes,function(a){
return a.specified;
});
}else{
var _fa=/^input$|^img$/i.test(_f3.nodeName)?_f3:_f3.cloneNode(false),_fb=_fa.outerHTML.replace(/=[^\s"']+|="[^"]*"|='[^']*'/g,"").replace(/^\s*<[a-zA-Z0-9]*\s*/,"").replace(/\s*>.*$/,"");
_f9=_bf.map(_fb.split(/\s+/),function(_fc){
var _fd=_fc.toLowerCase();
return {name:_fc,value:(_f3.nodeName=="LI"&&_fc=="value")||_fd=="enctype"?_f3.getAttribute(_fd):_f3.getAttributeNode(_fd).value};
});
}
}
var i=0,_fe;
while(_fe=_f9[i++]){
var _ff=_fe.name,_100=_ff.toLowerCase(),_101=_fe.value;
if(_100 in _ee){
switch(_ee[_100]){
case "data-dojo-props":
var _102=_101;
break;
case "data-dojo-id":
case "jsId":
var _103=_101;
break;
case "data-dojo-attach-point":
case "dojoAttachPoint":
_f8.dojoAttachPoint=_101;
break;
case "data-dojo-attach-event":
case "dojoAttachEvent":
_f8.dojoAttachEvent=_101;
break;
case "class":
_f8["class"]=_f3.className;
break;
case "style":
_f8["style"]=_f3.style&&_f3.style.cssText;
break;
}
}else{
if(!(_ff in _f7)){
var map=(_ca[_f4]||(_ca[_f4]=_cb(_f7)));
_ff=map[_100]||_ff;
}
if(_ff in _f7){
switch(typeof _f7[_ff]){
case "string":
_f8[_ff]=_101;
break;
case "number":
_f8[_ff]=_101.length?Number(_101):NaN;
break;
case "boolean":
_f8[_ff]=_101.toLowerCase()!="false";
break;
case "function":
if(_101===""||_101.search(/[^\w\.]+/i)!=-1){
_f8[_ff]=new Function(_101);
}else{
_f8[_ff]=_be.getObject(_101,false)||new Function(_101);
}
break;
default:
var pVal=_f7[_ff];
_f8[_ff]=(pVal&&"length" in pVal)?(_101?_101.split(/\s*,\s*/):[]):(pVal instanceof Date)?(_101==""?new Date(""):_101=="now"?new Date():_c6.fromISOString(_101)):(pVal instanceof _bd._Url)?(_bd.baseUrl+_101):_c4.fromJson(_101);
}
}else{
_f8[_ff]=_101;
}
}
}
if(_102){
try{
_102=_c4.fromJson.call(_e4.propsThis,"{"+_102+"}");
_be.mixin(_f8,_102);
}
catch(e){
throw new Error(e.toString()+" in data-dojo-props='"+_102+"'");
}
}
_be.mixin(_f8,_e3);
var _104=obj.scripts||(_f6&&(_f6._noScript||_f7._noScript)?[]:_c7("> script[type^='dojo/']",_f3));
var _105=[],_106=[],_107=[],on=[];
if(_104){
for(i=0;i<_104.length;i++){
var _108=_104[i];
_f3.removeChild(_108);
var _109=(_108.getAttribute(_e7+"event")||_108.getAttribute("event")),prop=_108.getAttribute(_e7+"prop"),_10a=_108.getAttribute("type"),nf=this._functionFromScript(_108,_e7);
if(_109){
if(_10a=="dojo/connect"){
_105.push({event:_109,func:nf});
}else{
if(_10a=="dojo/on"){
on.push({event:_109,func:nf});
}else{
_f8[_109]=nf;
}
}
}else{
if(_10a=="dojo/watch"){
_107.push({prop:prop,func:nf});
}else{
_106.push(nf);
}
}
}
}
var _10b=_f6.markupFactory||_f7.markupFactory;
var _10c=_10b?_10b(_f8,_f3,_f6):new _f6(_f8,_f3);
_e5.push(_10c);
if(_103){
_be.setObject(_103,_10c);
}
for(i=0;i<_105.length;i++){
_c5.after(_10c,_105[i].event,_bd.hitch(_10c,_105[i].func),true);
}
for(i=0;i<_106.length;i++){
_106[i].call(_10c);
}
for(i=0;i<_107.length;i++){
_10c.watch(_107[i].prop,_107[i].func);
}
for(i=0;i<on.length;i++){
don(_10c,on[i].event,on[i].func);
}
},this);
if(!_e3._started){
_bf.forEach(_e5,function(_10d){
if(!_e4.noStart&&_10d&&_be.isFunction(_10d.startup)&&!_10d._started){
_10d.startup();
}
});
}
return _e5;
};
this.scan=function(root,_10e){
var list=[];
var _10f=(_10e.scope||_bd._scopeName)+"Type",_110="data-"+(_10e.scope||_bd._scopeName)+"-",_111=_110+"type",_112=_110+"textdir";
var node=root.firstChild;
var _113=_10e.inherited;
if(!_113){
function _114(node,attr){
return (node.getAttribute&&node.getAttribute(attr))||(node!==_c2.doc&&node!==_c2.doc.documentElement&&node.parentNode?_114(node.parentNode,attr):null);
};
_113={dir:_114(root,"dir"),lang:_114(root,"lang"),textDir:_114(root,_112)};
for(var key in _113){
if(!_113[key]){
delete _113[key];
}
}
}
var _115={inherited:_113};
var _116;
var _117;
function _118(_119){
if(!_119.inherited){
_119.inherited={};
var node=_119.node,_11a=_118(_119.parent);
var _11b={dir:node.getAttribute("dir")||_11a.dir,lang:node.getAttribute("lang")||_11a.lang,textDir:node.getAttribute(_112)||_11a.textDir};
for(var key in _11b){
if(_11b[key]){
_119.inherited[key]=_11b[key];
}
}
}
return _119.inherited;
};
while(true){
if(!node){
if(!_115||!_115.node){
break;
}
node=_115.node.nextSibling;
_116=_115.scripts;
_117=false;
_115=_115.parent;
continue;
}
if(node.nodeType!=1){
node=node.nextSibling;
continue;
}
if(_116&&node.nodeName.toLowerCase()=="script"){
type=node.getAttribute("type");
if(type&&/^dojo\/\w/i.test(type)){
_116.push(node);
}
node=node.nextSibling;
continue;
}
if(_117){
node=node.nextSibling;
continue;
}
var type=node.getAttribute(_111)||node.getAttribute(_10f);
var _11c=node.firstChild;
if(!type&&(!_11c||(_11c.nodeType==3&&!_11c.nextSibling))){
node=node.nextSibling;
continue;
}
var _11d={node:node,scripts:_116,parent:_115};
var ctor;
try{
ctor=type&&_cf(type);
}
catch(e){
}
var _11e=ctor&&!ctor.prototype._noScript?[]:null;
if(type){
list.push({"type":type,node:node,scripts:_11e,inherited:_118(_11d)});
}
node=_11c;
_116=_11e;
_117=ctor&&ctor.prototype.stopParser&&!(_10e.template);
_115=_11d;
}
return list;
};
this.parse=function(_11f,_120){
var root;
if(!_120&&_11f&&_11f.rootNode){
_120=_11f;
root=_120.rootNode;
}else{
if(_11f&&_be.isObject(_11f)&&!("nodeType" in _11f)){
_120=_11f;
}else{
root=_11f;
}
}
root=root?_c1.byId(root):_c2.body();
_120=_120||{};
var list=this.scan(root,_120);
var _121=_120.template?{template:true}:{};
return this._instantiate(list,_121,_120);
};
}();
if(_c0.parseOnLoad){
_c8(100,_bd.parser,"parse");
}
return _bd.parser;
});
},"curam/matrix/TopRightBottom":function(){
define("curam/matrix/TopRightBottom",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_122,dojo,_123){
dojo.provide("curam.matrix.TopRightBottom");
dojo.require("curam.matrix.Constants");
dojo.declare("curam.matrix.TopRightBottom",null,{constructor:function(){
this.node=dojo.byId("top-right-bottom");
this.priorityHeading=null;
this.priorityHeadingText=null;
this.scoreHeading=null;
this.scoreHeadingText=null;
this.contradictionHeadingWidth=null;
this.contradictionHeading=null;
this.matrix=curam.matrix.Constants.container.matrix;
this.outcomeHeadings=new curam.ListMap();
var _124=this.node.childNodes;
for(var i=0;i<_124.length;i++){
if(_124[i].nodeType==1){
if(_124[i].id=="heading-pri"){
this.priorityHeading=_124[i];
this.priorityHeadingText=dojo.query("> :first-child",this.priorityHeading)[0];
}else{
if(_124[i].id=="heading-scr"){
this.scoreHeading=_124[i];
this.scoreHeadingText=dojo.query("> :first-child",this.scoreHeading)[0];
}else{
if(_124[i].id=="heading-contr"){
this.contradictionHeadingWidth=_124[i].offsetWidth;
this.contradictionHeading=_124[i];
}else{
this.outcomeHeadings.add(_124[i].id,_124[i]);
}
}
}
}
}
},addPriority:function(){
var _125=dojo.create("div",{id:"heading-pri","class":"column-heading column-eval pri-col-eval",innerHTML:"<div title=\""+curam.matrix.Constants.container.i18nMsgs.headerPriority+"\">"+curam.matrix.Constants.container.i18nMsgs.headerPriority+"</div>"},this.node,"first");
this.priorityHeading=_125;
this.priorityHeadingText=dojo.query("> :first-child",this.priorityHeading)[0];
},addScore:function(){
var pos=this.matrix.priorityExists?1:0;
var _126=dojo.create("div",{id:"heading-scr","class":"column-heading column-eval pri-col-eval",innerHTML:"<div title=\""+curam.matrix.Constants.container.i18nMsgs.headerScore+"\">"+curam.matrix.Constants.container.i18nMsgs.headerScore+"</div>"},this.node,pos);
this.scoreHeading=_126;
this.scoreHeadingText=dojo.query("> :first-child",this.scoreHeading)[0];
},addContradiction:function(){
var pos=0,_127;
if(this.matrix.scoreExists){
_127=dojo.byId("heading-scr");
}else{
if(this.matrix.priorityExists){
_127=dojo.byId("heading-pri");
}
}
var _128=dojo.create("div",{id:"heading-contr","class":"column-heading column-eval contr-col-eval",innerHTML:"<div title=\""+curam.matrix.Constants.container.i18nMsgs.headerContradictions+"\">"+curam.matrix.Constants.container.i18nMsgs.headerContradictions+"</div>"});
if(_127){
dojo.place(_128,_127,"after");
}else{
dojo.place(_128,this.node,0);
}
this.contradictionHeading=_128;
this.contradictionHeadingWidth=dojo.query("> :first-child",_128)[0].offsetWidth;
},addOutcomeColumn:function(_129){
var _12a=dojo.create("div",{id:"heading-"+_129[0],"class":"column-heading column-eval out-"+_129[0]+"-col-eval",innerHTML:"<a title=\""+_129[1]+"\">"+_129[1]+"</a>"},this.node,"last");
this.outcomeHeadings.add(_12a.id,_12a);
},deletePriorityColumn:function(){
dojo.destroy(this.priorityHeading);
this.priorityHeading=null;
this.priorityHeadingText=null;
},deleteScoreColumn:function(){
dojo.destroy(this.scoreHeading);
this.scoreHeading=null;
this.scoreHeadingText=null;
},deleteContradictionColumn:function(){
dojo.destroy(this.contradictionHeading);
this.contradictionHeading=null;
this.contradictionHeadingWidth=0;
},deleteOutcomeColumn:function(id){
var _12b=id.replace("column-id","heading");
dojo.destroy(this.outcomeHeadings.getObjectByKey(_12b));
this.outcomeHeadings.removeByKey(_12b);
}});
});
},"curam/matrix/Number":function(){
define("curam/matrix/Number",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_12c,dojo,_12d){
dojo.provide("curam.matrix.Number");
dojo.require("curam.matrix.Constants");
dojo.declare("curam.matrix.Number",null,{constructor:function(node,qId){
this.node=node;
this.text=dojo.query("> :first-child",node)[0];
this.qId=qId;
this.widgetCreated=false;
var _12e=this;
curam.matrix.Constants.container.matrix.addLazyWidget(this,"numbers");
this.lazyListener=function(_12f){
if(!curam.matrix.Constants.container.matrix.createLazyWidgets("numbers")){
dojo.disconnect(_12e.node._conn);
return;
}
if(!_12e.widget){
return;
}
_12e.widget._toggleMenu("QuestionOptions",_12f);
window.activeMenuID="ql-"+_12e.qId;
_12c.byId("QuestionOptions")._openMyself(_12f);
};
this.node._conn=dojo.connect(this.node,"onclick",this,"lazyListener");
},verticallyCenterText:function(_130,_131){
var _132="number-text-"+_131+"-eval";
var _133=(_130/2)-(curam.matrix.Constants.container.numTextHeight/2);
curam.matrix.Constants.container.cssText.append(".matrix-container .bottom-left-main .").append(_132).append("{padding-top:").append(_133).append("px;}");
},createWidget:function(){
var c=curam.matrix.Constants.container;
if(this.widgetCreated){
return;
}
var _134=_12c.byId(this.node.id);
if(_134){
_134.destroy();
}
var _135=this.widget=new curam.widget.QuestionButton({menuId:"QuestionOptions",id:this.node.id,qId:this.qId},this.node);
this.widgetCreated=true;
}});
});
},"dijit/_Container":function(){
define("dijit/_Container",["dojo/_base/array","dojo/_base/declare","dojo/dom-construct","./registry"],function(_136,_137,_138,_139){
return _137("dijit._Container",null,{buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_13a,_13b){
var _13c=this.containerNode;
if(_13b&&typeof _13b=="number"){
var _13d=this.getChildren();
if(_13d&&_13d.length>=_13b){
_13c=_13d[_13b-1].domNode;
_13b="after";
}
}
_138.place(_13a.domNode,_13c,_13b);
if(this._started&&!_13a._started){
_13a.startup();
}
},removeChild:function(_13e){
if(typeof _13e=="number"){
_13e=this.getChildren()[_13e];
}
if(_13e){
var node=_13e.domNode;
if(node&&node.parentNode){
node.parentNode.removeChild(node);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},_getSiblingOfChild:function(_13f,dir){
var node=_13f.domNode,_140=(dir>0?"nextSibling":"previousSibling");
do{
node=node[_140];
}while(node&&(node.nodeType!=1||!_139.byNode(node)));
return node&&_139.byNode(node);
},getIndexOfChild:function(_141){
return _136.indexOf(this.getChildren(),_141);
}});
});
},"curam/widget/MatrixMenuItem":function(){
define("curam/widget/MatrixMenuItem",["dijit","dojo","dojox","dojo/require!dijit/MenuItem"],function(_142,dojo,_143){
dojo.provide("curam.widget.MatrixMenuItem");
dojo.require("dijit.MenuItem");
dojo.declare("curam.widget.MatrixMenuItem",_142.MenuItem,{id:"",postCreate:function(){
dojo.subscribe("/disableMenuItems",this,"disableItem");
dojo.subscribe("/enableMenuItems",this,"enableItem");
},disableItem:function(){
this.set("disabled",true);
},enableItem:function(){
this.set("disabled",false);
}});
});
},"curam/matrix/QuestionLeft":function(){
define("curam/matrix/QuestionLeft",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_144,dojo,_145){
dojo.provide("curam.matrix.QuestionLeft");
dojo.require("curam.matrix.Constants");
dojo.declare("curam.matrix.QuestionLeft",null,{constructor:function(node){
this.node=node;
this.qId=this.node.id.replace("ql-","");
var _146=this.node.childNodes;
for(var i=0;i<_146.length;i++){
if(_146[i].nodeType==1){
if(_146[i].id=="num-"+this.qId){
this.number=new curam.matrix.Number(_146[i],this.qId);
}else{
if(_146[i].id=="ques-"+this.qId){
this.question=new curam.matrix.QuestionText(_146[i]);
}else{
this.ansGroup=new curam.matrix.AnswerGroup(_146[i],this);
}
}
}
}
curam.matrix.Constants.container.addQuestionId(this.qId);
},setDimensions:function(){
var _147=(this.ansGroup.answers.count*curam.matrix.Constants.container.reducedAnswHeight)+((this.ansGroup.answers.count-1)*curam.matrix.Constants.MATRIX_BORDER_SIZE);
var _148=(curam.matrix.Constants.container.existingQuestionIds.indexOf(this.qId)>0)?0:curam.matrix.Constants.container.fullAnswerHeight-curam.matrix.Constants.container.reducedAnswHeight;
_147+=_148;
this.setHeight(_147+curam.matrix.Constants.MATRIX_BORDER_SIZE);
curam.matrix.Constants.container.cssText.append(".matrix-container .").append("q-ct-eval-").append(this.qId).append("{height:").append(_147).append("px;}.matrix-container .").append(this.qId).append("-eval{height:").append(this.height).append("px;}").append(".matrix-container .").append("q-ct-eval-").append(this.qId).append(" .default-q-height-eval{height:").append(_147).append("px;}");
this.number.verticallyCenterText(_147,this.qId);
this.question.verticallyCenterText(_147,this.qId);
return this.height;
},setHeight:function(_149){
this.height=_149;
},addAnswer:function(){
var _14a=this.ansGroup;
var _14b=_14a.getLastAddedAnswerId();
var _14c=_14b.split("_");
_14c=Number(_14c[_14c.length-1])+1;
_14a.answerCount++;
var node=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.createAnswer(this.qId,_14a.answerType,_14c,_14a.getOptions());
var _14d=new curam.matrix.Answer(node,_14a.answerType,this);
_14a.answers.add(node.id,_14d);
_14a.node.appendChild(node);
_14d.init();
this.setDimensions();
return node.offsetHeight;
},getAnswer:function(_14e){
return this.getAnswerById("ans-"+this.qId+"-"+_14e);
},getAnswerById:function(id){
return this.ansGroup.answers.getObjectByKey(id);
},deleteAnswer:function(_14f,id){
this.ansGroup.answers.removeByKey(id);
if(_14f){
dojo.removeClass(this.ansGroup.answers.getObjectByIndex(0).node,"ans");
}
dojo.destroy(dojo.byId(id));
this.setDimensions();
this.ansGroup.answerCount=this.ansGroup.answers.count;
}});
});
},"curam/matrix/TempDivs":function(){
define("curam/matrix/TempDivs",["dijit","dojo","dojox"],function(_150,dojo,_151){
dojo.provide("curam.matrix.TempDivs");
dojo.declare("curam.matrix.TempDivs",null,{constructor:function(_152){
this.node=dojo.byId("temp-elements");
this.scroll=dojo.byId("scroll");
this.num=dojo.byId("num-width");
this.numHeight=this.num.offsetHeight;
this.numWidth=this.num.offsetWidth;
_152.questionColWidth=dojo.byId("ques-text-width").offsetWidth;
_152.answersColWidth=dojo.byId("ans-values-width").offsetWidth;
this.ctAnsVal=dojo.byId("ct-ans-val");
this.ctAnsSelect=dojo.byId("select");
this.image=dojo.byId("image");
this.numAns=dojo.byId("num-ans");
this.strAns=dojo.byId("str-ans");
this.textAns=dojo.byId("bool-ans");
this.priorityHeading=dojo.byId("priority-heading");
this.priVal=dojo.byId("pri-val");
this.cell=dojo.byId("cell");
this.cellInput=dojo.byId("cell-input");
}});
});
},"curam/debug":function(){
define("curam/debug",["curam/define","curam/util/LocalConfig"],function(_153,_154){
_153.singleton("curam.debug",{log:function(){
if(curam.debug.enabled()){
try{
var a=arguments;
if(!dojo.isIE){
console.log.apply(console,a);
}else{
var _155=a.length;
var sa=curam.debug._serializeArgument;
switch(_155){
case 1:
console.log(arguments[0]);
break;
case 2:
console.log(a[0],sa(a[1]));
break;
case 3:
console.log(a[0],sa(a[1]),sa(a[2]));
break;
case 4:
console.log(a[0],sa(a[1]),sa(a[2]),sa(a[3]));
break;
case 5:
console.log(a[0],sa(a[1]),sa(a[2]),sa(a[3]),sa(a[4]));
break;
case 6:
console.log(a[0],sa(a[1]),sa(a[2]),sa(a[3]),sa(a[4]),sa(a[5]));
break;
default:
console.log("[Incomplete message - "+(_155-5)+" message a truncated] "+a[0],sa(a[1]),sa(a[2]),sa(a[3]),sa(a[4]),sa(a[5]));
}
}
}
catch(e){
console.log(e);
}
}
},_serializeArgument:function(arg){
if(typeof arg!="undefined"&&typeof arg.nodeType!="undefined"&&typeof arg.cloneNode!="undefined"){
return ""+arg;
}else{
if(curam.debug._isWindow(arg)){
return arg.location.href;
}else{
if(curam.debug._isArray(arg)&&curam.debug._isWindow(arg[0])){
return "[array of window objects, length "+arg.length+"]";
}else{
return dojo.toJson(arg);
}
}
}
},_isArray:function(arg){
return typeof arg!="undefined"&&(dojo.isArray(arg)||typeof arg.length!="undefined");
},_isWindow:function(arg){
var _156=typeof arg!="undefined"&&typeof arg.closed!="undefined"&&arg.closed;
if(_156){
return true;
}else{
return typeof arg!="undefined"&&typeof arg.location!="undefined"&&typeof arg.navigator!="undefined"&&typeof arg.document!="undefined"&&typeof arg.closed!="undefined";
}
},enabled:function(){
return _154.readOption("jsTraceLog","false")=="true";
},_setup:function(_157){
_154.seedOption("jsTraceLog",_157.trace,"false");
_154.seedOption("ajaxDebugMode",_157.ajaxDebug,"false");
_154.seedOption("asyncProgressMonitor",_157.asyncProgressMonitor,"false");
}});
return curam.debug;
});
},"curam/widget/DivButton":function(){
require({cache:{"url:curam/widget/resources/DivButton.html":"<div id=\"${id}\" class=\"${className}\" dojoAttachEvent=\"onclick:onClick\" dojoAttachPoint=\"containerNode\"></div>\r\n\r\n {\r\n      templateString: \"<div id='${id}' class='${className}' \"\r\n            + \"dojoAttachEvent='onclick:onClick' dojoAttachPoint='containerNode'></div>\"\r\n    }\r\n\r\n"}});
define("curam/widget/DivButton",["curam/util","curam/matrix/Constants","dojo/text!curam/widget/resources/DivButton.html","dijit/_Widget","dijit/_Templated"],function(util,_158,_159){
var _15a=dojo.declare("curam.widget.DivButtonBase",dijit._Widget,{isContainer:true,disabled:false,menuId:"",id:"",className:"",postCreate:function(args,frag){
this.sizeMyself();
dijit.byId(this.menuId).bindDomNode(this.domNode);
util.connect(this.domNode,"onclick",dojo.hitch(this,this.onClick));
if(this.className){
dojo.addClass(this.domNode,this.className);
}
if(!this.containerNode){
this.containerNode=this.domNode;
}
},setActiveMenuId:function(){
if(this.domNode.id&&this.domNode.id.length>0&&!dojo.hasClass(this.domNode,"image")){
window.activeMenuID=this.domNode.id;
}else{
window.activeMenuID=this.domNode.parentNode.id;
}
},sizeMyself:function(){
if(this.domNode.parentNode){
var _15b=dojo.create("span",{},this.domNode,"before");
}
dojo.body().appendChild(this.domNode);
if(_15b){
dojo.place(this.domNode,_15b,"before");
dojo.destroy(_15b);
}
},sizeMyselfHelper:function(){
var mb=dojo.marginBox(this.containerNode);
this.height=mb.h;
this.containerWidth=mb.w;
dojo.style(this.domNode,"width",this.containerWidth+"px");
},onClick:function(e){
if(!this.disabled){
this._toggleMenu(this.menuId,e);
}
},_checkValidation:function(menu){
if(_158.container.matrix.isValidationActive()){
if(menu.isShowingNow){
menu.close();
}
return false;
}
return true;
},_setActiveMenu:function(_15c){
var menu=dijit.byId(_15c);
if(!menu){
return;
}
if(menu.isShowingNow){
this.setActiveMenuId();
}
},_toggleMenu:function(_15d,_15e){
this._setActiveMenu(_15d);
dijit.byId(_15d).setButton(this);
}});
var _15f=dojo.declare("curam.widget.DivButton",[curam.widget.DivButtonBase,dijit._Templated],{templateString:_159});
dojo.declare("curam.widget.QuestionButton",curam.widget.DivButtonBase,{postCreate:function(){
this.className+="number number-col-eval q-ct-eval-"+this.qId;
util.connect(this.domNode,"onmouseover",dojo.hitch(this,this.onMouseOver));
this.inherited(arguments);
},onMouseOver:function(_160){
curam.matrix.util.buttonMouseOver(_160);
},_toggleMenu:function(_161,_162){
this._setActiveMenu(_161);
dijit.byId(_161).setButton(this);
},setActiveMenuId:function(){
window.activeMenuID=this.domNode.parentNode.id;
}});
dojo.declare("curam.widget.AnswerButton",curam.widget.DivButtonBase,{className:"image",_toggleMenu:function(_163,_164){
this._setActiveMenu(_163);
var menu=dijit.byId(_163);
var node=_164.target?_164.target:_164;
if(!menu){
return;
}
if(!this._checkValidation(menu)){
return;
}
menu.setButton(this);
if(node){
if((!node.id||!node.id.indexOf("ans-")==0)&&node.parentNode&&node.parentNode.id){
menu.answerId=node.parentNode.id;
}else{
menu.answerId=node.id;
}
}else{
menu.answerId=null;
}
},setActiveMenuId:function(){
window.activeMenuID=this.domNode.parentNode.id;
}});
dojo.declare("curam.widget.CombinationButton",curam.widget.DivButtonBase,{className:"image",_toggleMenu:function(_165,_166){
this._setActiveMenu(_165);
dijit.byId(_165).setButton(this);
var node=_166.target?_166.target:_166;
var menu=dijit.byId(_165);
if(!menu){
return;
}
if(!this._checkValidation(menu)){
return;
}
if(node){
if(node.cellId&&node.cellId.length>0){
menu.combinationId=node.cellId;
}else{
if(node.id&&node.id.length>0&&!dojo.hasClass(node,"image")){
menu.combinationId=node.id;
}else{
if(node.parentNode){
menu.combinationId=node.parentNode.id;
}else{
menu.combinationId=node.cellId;
}
}
}
}else{
menu.combinationId=null;
}
}});
dojo.declare("curam.widget.PriorityButton",curam.widget.DivButtonBase,{className:"column-id column-eval pri-col-eval",postCreate:function(){
dojo.attr(this.domNode,"id",this.id);
this.inherited(arguments);
},_toggleMenu:function(_167,_168){
this._setActiveMenu(_167);
dijit.byId(_167).setButton(this);
}});
dojo.declare("curam.widget.ScoreButton",curam.widget.PriorityButton,{});
return _15a;
});
},"curam/Container":function(){
define("curam/Container",["dojo/dom-geometry","curam/util","curam/matrix/TempDivs","curam/StringBuffer","curam/Matrix","curam/matrix/Constants"],function(_169){
curam.matrix.Buttons=function(){
this.node=dojo.byId("buttons");
};
dojo.declare("curam.Container",null,{constructor:function(node,_16a,_16b,_16c){
this.node=dojo.byId(node);
this.i18nMsgs=_16c;
this.validation={"node":dojo.byId("validation"),"text":dojo.byId("validation-text")};
this.matrixNode=dojo.byId(_16a);
this.options=_16b;
curam.util.connect(this.node,"onclick",function(evt){
if(evt.target.tagName=="A"&&!evt.target._submitButton){
dojo.stopEvent(evt);
return false;
}
});
},layout:function(){
if(typeof (disableClusterToggle)=="function"){
disableClusterToggle(this.node.parentNode);
}
this.cssText=new curam.StringBuffer();
this.addChildren();
this.setScrollBarWidth();
this.matrix.topLeft.setDimensions();
this.matrix.topRightFiller.setDimensions();
this.setDimensionLimits();
this.matrix.setDimensionLimits();
this.matrix.bottomLeft.setDimensions();
this.matrix.topRight.setDimensions();
this.matrix.bottomRight.setDimensions();
this.matrix.scrollSync();
this.tempDivs.node.parentNode.removeChild(this.tempDivs.node);
this.matrix.setDimensions();
this.setDimensions();
this.setLocales();
curam.matrix.Constants.container.addCSS();
this.matrix.updateQuestionOrder();
this.matrix.checkEmpty();
},addChildren:function(){
this.existingQuestionIds="";
this.existingQuestionIdsMap={};
this.existingOutcomeIds="";
this.menuOptionsCreated=false;
this.tempDivs=new curam.matrix.TempDivs(this);
this.matrix=this.m=new curam.Matrix(this.matrixNode,this,this.options);
this.buttons=new curam.matrix.Buttons();
},addQuestionId:function(id){
if(id=="SampleQuestion"){
return;
}
this.existingQuestionIds=this.existingQuestionIds+(id)+"|";
this.existingQuestionIdsMap[id]=true;
},removeQuestionId:function(id){
this.existingQuestionIds=curam.matrix.Constants.container.existingQuestionIds.replace(id+"|","");
this.existingQuestionIdsMap[id]=false;
},setScrollBarWidth:function(){
this.scrollBarWidth=curam.util.getScrollbar().width;
},setDimensionLimits:function(){
var _16d=curam.matrix.Constants.container.leftMatrixWidth+100;
var _16e=200;
var _16f=this.node.parentNode;
var _170=dojo.byId("content");
this.maxHeight=dojo.contentBox(_170).h-100;
this.maxWidth=dojo.contentBox(_16f).w;
},setDimensions:function(){
this.setWidth();
this.setHeight();
this.setVisible();
},setHeight:function(){
var _171=_169.getMarginBoxSimple(this.validation.node).h;
if(_171<1){
cm.toggleDisplay(this.validation.node);
_171=_169.getMarginBoxSimple(this.validation.node).h;
cm.toggleDisplay(this.validation.node);
}
_171=Math.max(_171,0);
var _172=dojo.query("> span",this.buttons.node)[0].offsetHeight;
this.height=this.matrix.height+_171+Math.min(_172,20)+5;
this.cssText.append(".matrix-container-eval {height:").append(this.height).append("px;}");
this.matrix.refreshScrollSync();
},setWidth:function(){
this.cssText.append(".matrix-container-eval{width:").append(this.matrix.width).append("px;}");
},setVisible:function(){
this.cssText.append(".matrix-container-eval{visibility:visible;}");
},addCSS:function(){
var _173=this.cssText.toString();
if(!_173){
return;
}
var _174=this.matrix.bottomRight.node.scrollTop;
curam.util.insertCssText(_173,"_container_stylesheet_");
this.matrix.bottomRight.node.scrollTop=_174;
this.cssText=new curam.StringBuffer();
},setLocales:function(){
this.locales=localeList.split(",");
},activateWarning:function(_175,_176){
dojo.style(this.validation.node,"display","block");
cm.setClass(this.validation.text,"active-validation");
this.validation.text.innerHTML=_175;
var _177=Math.max(this.validation.text.clientHeight,20);
dojo.style(this.validation.node,"height",(_177+10)+"px");
dojo.style(this.buttons.node,"display","none");
if(_176){
var _178=this;
setTimeout(function(){
_178.deactivateValidation();
},3000);
}
this.matrix.setValidationActive();
},activateError:function(_179,_17a){
dojo.style(this.validation.node,"display","block");
var node=this.validation.text;
cm.setClass(node,"active-error");
node.innerHTML=_179;
var _17b=node.clientHeight;
dojo.style(this.validation.node,"height",_17b+10+"px");
dojo.style(this.buttons.node,"display","none");
if(_17a){
setTimeout("curam.matrix.Constants.container.deactivateValidation()",3000);
}
},deactivateValidation:function(){
dojo.style(this.validation.node,"display","none");
cm.setClass(this.validation.text,"hidden-validation");
this.validation.text.innerHTML="";
cm.setClass(curam.matrix.Constants.container.validation.node,"validation");
cm.setClass(this.validation.node,"hidden-validation");
var _17c=Math.max(this.validation.text.clientHeight,20);
dojo.style(this.validation.node,"height",_17c+10+"px");
dojo.style(this.buttons.node,"display","");
this.matrix.setValidationInactive();
},hideValidation:function(){
dojo.style(this.validation.node,"display","none");
},getFakeEvent:function(node){
var _17d=dojo.coords(node,true);
return {target:node,pageX:_17d.x,pageY:_17d.y,isFake:true,stopPropagation:function(){
},preventDefault:function(){
}};
}});
});
},"curam/matrix/ContradictionColumn":function(){
define("curam/matrix/ContradictionColumn",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_17e,dojo,_17f){
dojo.provide("curam.matrix.ContradictionColumn");
dojo.require("curam.matrix.Constants");
dojo.declare("curam.matrix.ContradictionColumn",null,{constructor:function(node,_180){
this.node=node;
this.text=dojo.query("> :first-child",this.node)[0];
this.columns=new curam.ListMap();
this.columnMessages=new curam.ListMap();
this.widgetCreated=false;
this.combinationCount=0;
var _181=cm.nextSibling(this.text);
this.matrix=curam.matrix.Constants.container.matrix;
if(_180){
curam.matrix.util.initButtonListeners(node);
}
while(_181!=null){
if(_181.nodeName=="INPUT"){
if(_182(_181.id)){
this.columns.add(_181.id,_181);
this.combinationCount++;
}
}
_181=cm.nextSibling(_181);
}
function _182(id){
var _183=/.contrcombid./;
if(id.match(_183)!=null){
return true;
}
return false;
};
var _184=this;
this.matrix.addLazyWidget(this,"columns");
this.lazyListener=function(_185){
if(!_184.matrix.createLazyWidgets("columns")){
dojo.disconnect(_184.node._conn);
return;
}
if(!_184.widget){
return;
}
_184.widget._toggleMenu("OutcomeOptions",_185);
window.activeMenuID=_184.node.id;
_17e.byId("OutcomeOptions")._openMyself(_185);
};
this.node._conn=dojo.connect(this.node,"onclick",this,"lazyListener");
},createWidget:function(){
var c=curam.matrix.Constants.container;
if(this.widgetCreated){
return;
}
var _186=this.widthWithoutBorder;
var _187=_17e.byId(this.node.id);
if(_187){
_187.destroy();
}
var _188=this.widget=new curam.widget.DivButton({menuId:"OutcomeOptions",id:this.node.id,className:"column-id column-eval contr-col-eval"},this.node);
var _189=new curam.matrix.ContradictionColumn(_188.domNode,true);
c.matrix.topRight.topRightTop.contradictionCol=_189;
_189.widgetCreated=true;
_189.setWidth(_186);
},getCombColumnIds:function(){
var key;
var arr=new Array();
var _18a=/^.*\.contrcombid\./;
for(var i=0;i<this.columns.count;i++){
key=this.columns.getKeyByIndex(i);
key=new String(key);
arr.push(key.replace(_18a,""));
}
return arr;
},setWidth:function(_18b){
curam.matrix.Constants.container.cssText.append(".matrix-container .contr-col-eval{width:").append(_18b).append("px;}");
this.widthWithoutBorder=_18b;
this.widthWithBorder=_18b+curam.matrix.Constants.MATRIX_BORDER_SIZE;
},deleteCombIdAndMsgInputFields:function(id){
var _18c=this.matrix.inputPrefix+"contrcombid."+id;
var _18d;
var c=curam.matrix.Constants.container;
dojo.destroy(this.columns.getObjectByKey(_18c));
this.columns.removeByKey(_18c);
for(var i=0;i<c.locales.length;i++){
if(c.locales[i]==""){
continue;
}
_18d=this.matrix.inputPrefix+"contrmsg."+c.locales[i]+"."+id;
dojo.destroy(dojo.byId(_18d));
}
}});
});
},"dojo/i18n":function(){
define("dojo/i18n",["./_base/kernel","require","./has","./_base/array","./_base/config","./_base/lang","./_base/xhr","./json"],function(dojo,_18e,has,_18f,_190,lang,xhr,json){
true||has.add("dojo-preload-i18n-Api",1);
true||has.add("dojo-v1x-i18n-Api",1);
var _191=dojo.i18n={},_192=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,_193=function(root,_194,_195,_196){
for(var _197=[_195+_196],_198=_194.split("-"),_199="",i=0;i<_198.length;i++){
_199+=(_199?"-":"")+_198[i];
if(!root||root[_199]){
_197.push(_195+_199+"/"+_196);
}
}
return _197;
},_19a={},_19b=dojo.getL10nName=function(_19c,_19d,_19e){
_19e=_19e?_19e.toLowerCase():dojo.locale;
_19c="dojo/i18n!"+_19c.replace(/\./g,"/");
_19d=_19d.replace(/\./g,"/");
return (/root/i.test(_19e))?(_19c+"/nls/"+_19d):(_19c+"/nls/"+_19e+"/"+_19d);
},_19f=function(_1a0,_1a1,_1a2,_1a3,_1a4,load){
_1a0([_1a1],function(root){
var _1a5=lang.clone(root.root),_1a6=_193(!root._v1x&&root,_1a4,_1a2,_1a3);
_1a0(_1a6,function(){
for(var i=1;i<_1a6.length;i++){
_1a5=lang.mixin(lang.clone(_1a5),arguments[i]);
}
var _1a7=_1a1+"/"+_1a4;
_19a[_1a7]=_1a5;
load();
});
});
},_1a8=function(id,_1a9){
return /^\./.test(id)?_1a9(id):id;
},_1aa=function(_1ab){
var list=_190.extraLocale||[];
list=lang.isArray(list)?list:[list];
list.push(_1ab);
return list;
},load=function(id,_1ac,load){
if(1){
var _1ad=id.split("*"),_1ae=_1ad[1]=="preload";
if(_1ae){
if(!_19a[id]){
_19a[id]=1;
_1af(_1ad[2],json.parse(_1ad[3]),1);
}
load(1);
}
if(_1ae||_1b0(id,_1ac,load)){
return;
}
}
var _1b1=_192.exec(id),_1b2=_1b1[1]+"/",_1b3=_1b1[5]||_1b1[4],_1b4=_1b2+_1b3,_1b5=(_1b1[5]&&_1b1[4]),_1b6=_1b5||dojo.locale,_1b7=_1b4+"/"+_1b6,_1b8=_1b5?[_1b6]:_1aa(_1b6),_1b9=_1b8.length,_1ba=function(){
if(!--_1b9){
load(lang.delegate(_19a[_1b7]));
}
};
_18f.forEach(_1b8,function(_1bb){
var _1bc=_1b4+"/"+_1bb;
if(1){
_1bd(_1bc);
}
if(!_19a[_1bc]){
_19f(_1ac,_1b4,_1b2,_1b3,_1bb,_1ba);
}else{
_1ba();
}
});
};
if(has("dojo-unit-tests")){
var _1be=_191.unitTests=[];
}
if(1||1){
var _1bf=_191.normalizeLocale=function(_1c0){
var _1c1=_1c0?_1c0.toLowerCase():dojo.locale;
return _1c1=="root"?"ROOT":_1c1;
},isXd=function(mid){
return (1&&1)?_18e.isXdUrl(_18e.toUrl(mid+".js")):true;
},_1c2=0,_1c3=[],_1af=_191._preloadLocalizations=function(_1c4,_1c5,_1c6){
function _1c7(_1c8,func){
var _1c9=_1c8.split("-");
while(_1c9.length){
if(func(_1c9.join("-"))){
return true;
}
_1c9.pop();
}
return func("ROOT");
};
function _1ca(_1cb){
_1cb=_1bf(_1cb);
_1c7(_1cb,function(loc){
if(_18f.indexOf(_1c5,loc)>=0){
var mid=_1c4.replace(/\./g,"/")+"_"+loc;
_1c2++;
(isXd(mid)||_1c6?_18e:_1cf)([mid],function(_1cc){
for(var p in _1cc){
_19a[p+"/"+loc]=_1cc[p];
}
--_1c2;
while(!_1c2&&_1c3.length){
load.apply(null,_1c3.shift());
}
});
return true;
}
return false;
});
};
_1ca();
_18f.forEach(dojo.config.extraLocale,_1ca);
},_1b0=function(id,_1cd,load){
if(_1c2){
_1c3.push([id,_1cd,load]);
}
return _1c2;
};
}
if(1){
var _1ce=new Function("__bundle","__checkForLegacyModules","__mid","var define = function(){define.called = 1;},"+"    require = function(){define.called = 1;};"+"try{"+"define.called = 0;"+"eval(__bundle);"+"if(define.called==1)"+"return 1;"+"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"+"return __checkForLegacyModules;"+"}catch(e){}"+"try{"+"return eval('('+__bundle+')');"+"}catch(e){"+"return e;"+"}"),_1cf=function(deps,_1d0){
var _1d1=[];
_18f.forEach(deps,function(mid){
var url=_18e.toUrl(mid+".js");
function load(text){
var _1d2=_1ce(text,_1bd,mid);
if(_1d2===1){
_18e([mid],function(_1d3){
_1d1.push(_19a[url]=_1d3);
});
}else{
if(_1d2 instanceof Error){
console.error("failed to evaluate i18n bundle; url="+url,_1d2);
_1d2={};
}
_1d1.push(_19a[url]=(/nls\/[^\/]+\/[^\/]+$/.test(url)?_1d2:{root:_1d2,_v1x:1}));
}
};
if(_19a[url]){
_1d1.push(_19a[url]);
}else{
var _1d4=_18e.syncLoadNls(mid);
if(_1d4){
_1d1.push(_1d4);
}else{
if(!xhr){
try{
_18e.getText(url,true,load);
}
catch(e){
_1d1.push(_19a[url]={});
}
}else{
xhr.get({url:url,sync:true,load:load,error:function(){
_1d1.push(_19a[url]={});
}});
}
}
}
});
_1d0&&_1d0.apply(null,_1d1);
},_1bd=function(_1d5){
for(var _1d6,_1d7=_1d5.split("/"),_1d8=dojo.global[_1d7[0]],i=1;_1d8&&i<_1d7.length-1;_1d8=_1d8[_1d7[i++]]){
}
if(_1d8){
_1d6=_1d8[_1d7[i]];
if(!_1d6){
_1d6=_1d8[_1d7[i].replace(/-/g,"_")];
}
if(_1d6){
_19a[_1d5]=_1d6;
}
}
return _1d6;
};
_191.getLocalization=function(_1d9,_1da,_1db){
var _1dc,_1dd=_19b(_1d9,_1da,_1db).substring(10);
load(_1dd,(!isXd(_1dd)?_1cf:_18e),function(_1de){
_1dc=_1de;
});
return _1dc;
};
if(has("dojo-unit-tests")){
_1be.push(function(doh){
doh.register("tests.i18n.unit",function(t){
var _1df;
_1df=_1ce("{prop:1}");
t.is({prop:1},_1df);
t.is(undefined,_1df[1]);
_1df=_1ce("({prop:1})");
t.is({prop:1},_1df);
t.is(undefined,_1df[1]);
_1df=_1ce("{'prop-x':1}");
t.is({"prop-x":1},_1df);
t.is(undefined,_1df[1]);
_1df=_1ce("({'prop-x':1})");
t.is({"prop-x":1},_1df);
t.is(undefined,_1df[1]);
_1df=_1ce("define({'prop-x':1})");
t.is(1,_1df);
_1df=_1ce("this is total nonsense and should throw an error");
t.is(_1df instanceof Error,true);
});
});
}
}
return lang.mixin(_191,{dynamic:true,normalize:_1a8,load:load,cache:_19a});
});
},"dijit/BackgroundIframe":function(){
define("dijit/BackgroundIframe",["require",".","dojo/_base/config","dojo/dom-construct","dojo/dom-style","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window"],function(_1e0,_1e1,_1e2,_1e3,_1e4,lang,on,has,win){
has.add("bgIframe",has("ie")||has("mozilla"));
var _1e5=new function(){
var _1e6=[];
this.pop=function(){
var _1e7;
if(_1e6.length){
_1e7=_1e6.pop();
_1e7.style.display="";
}else{
if(has("ie")<9){
var burl=_1e2["dojoBlankHtmlUrl"]||_1e0.toUrl("dojo/resources/blank.html")||"javascript:\"\"";
var html="<iframe src='"+burl+"' role='presentation'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_1e7=win.doc.createElement(html);
}else{
_1e7=_1e3.create("iframe");
_1e7.src="javascript:\"\"";
_1e7.className="dijitBackgroundIframe";
_1e7.setAttribute("role","presentation");
_1e4.set(_1e7,"opacity",0.1);
}
_1e7.tabIndex=-1;
}
return _1e7;
};
this.push=function(_1e8){
_1e8.style.display="none";
_1e6.push(_1e8);
};
}();
_1e1.BackgroundIframe=function(node){
if(!node.id){
throw new Error("no id");
}
if(has("bgIframe")){
var _1e9=(this.iframe=_1e5.pop());
node.appendChild(_1e9);
if(has("ie")<7||has("quirks")){
this.resize(node);
this._conn=on(node,"resize",lang.hitch(this,function(){
this.resize(node);
}));
}else{
_1e4.set(_1e9,{width:"100%",height:"100%"});
}
}
};
lang.extend(_1e1.BackgroundIframe,{resize:function(node){
if(this.iframe){
_1e4.set(this.iframe,{width:node.offsetWidth+"px",height:node.offsetHeight+"px"});
}
},destroy:function(){
if(this._conn){
this._conn.remove();
this._conn=null;
}
if(this.iframe){
_1e5.push(this.iframe);
delete this.iframe;
}
}});
return _1e1.BackgroundIframe;
});
},"curam/matrix/validation/OutcomeValidator":function(){
define("curam/matrix/validation/OutcomeValidator",["dijit","dojo","dojox","dojo/require!curam/util/ResourceBundle"],function(_1ea,dojo,_1eb){
dojo.provide("curam.matrix.validation.OutcomeValidator");
dojo.require("curam.util.ResourceBundle");
var _1ec=new curam.util.ResourceBundle("Debug");
dojo.declare("curam.matrix.validation.OutcomeValidator",curam.matrix.validation.DefaultCombinationValidator,{warningSingleMsg:null,warningMsg:"",errorMsg:"",constructor:function OutcomeCombValidator(_1ed,opts){
this.validatingCombCells=null;
this.matchingCombCells=null;
this.setWarningActive(false);
this.setErrorActive(false);
this.outcomeId=null;
this.combinationNum=null;
this.container=_1ed;
this.isInitialized=false;
this.bitsets=[];
this.state=curam.matrix.validation.DefaultCombinationValidator.prototype.state;
if(opts){
dojo.mixin(this,opts);
}
this._registerValidator(this);
},setOutcomeValue:function(_1ee,_1ef,_1f0,_1f1,_1f2){
if(_1f1!==null){
_1f1=dojo.fixEvent(_1f1);
}
var _1f3=_1ec.getProperty("curam.matrix.validation.OutcomeValidator.err.1");
var _1f4=_1ec.getProperty("curam.matrix.validation.OutcomeValidator.err.2");
var _1f5=_1ec.getProperty("curam.matrix.validation.OutcomeValidator.err.3");
if(this._checkRefresh()){
var _1f6=this.container.matrix.isValidationActive();
if(_1f1&&_1f6&&!this.container.matrix.isInputPartOfValidation(_1f0)){
dojo.stopEvent(_1f1);
this.container.matrix.refocusValidatingInput();
return;
}
return;
}
if(!this.bitsets[_1ee]||typeof (this.bitsets[_1ee][_1ef])=="undefined"){
this._initOutcome(_1ee);
}
var _1f6=this.container.matrix.isValidationActive();
if(_1f1&&_1f6&&!this.container.matrix.isInputPartOfValidation(_1f0)){
dojo.stopEvent(_1f1);
this.container.matrix.refocusValidatingInput();
return;
}
if(typeof (this.bitsets[_1ee][_1ef])=="undefined"){
curam.debug.log(_1f3+_1ee+_1f4+_1ef+_1f5);
return;
}
var _1f7=this.bitsets[_1ee][_1ef];
this._initCheckbox(_1f0,_1f7);
var _1f8=_1f0.bitsetId;
if(_1f0.checked){
_1f7.set(_1f8);
}else{
_1f7.unSet(_1f8);
}
if(!_1f2){
this._validate(_1f7,_1f0);
}
},refreshOutcome:function(_1f9){
if(!this.bitsets[_1f9]){
this.requiresRefresh=true;
this.refreshValidation();
return;
}
this.deleteOutcome(_1f9);
this._initOutcome(_1f9);
var _1fa=this.bitsets[_1f9];
for(var _1fb=0;_1fb<_1fa.length;_1fb++){
if(_1fa[_1fb]){
this._validate(_1fa[_1fb],_1fa[_1fb].inputs[0]);
break;
}
}
},refreshValidation:function(){
if(!this.requiresRefresh){
return;
}
this.inRefresh=true;
if(this.bitsets&&this.bitsets.length>0){
var _1fc={};
for(var _1fd=0;_1fd<this.bitsets.length;_1fd++){
if(!this.bitsets[_1fd]){
continue;
}
for(var _1fe=0;_1fe<this.bitsets[_1fd].length;_1fe++){
if(!this.bitsets[_1fd][_1fe]){
continue;
}
_1fc[this.bitsets[_1fd][_1fe].id]=true;
}
}
this._deleteBitsets(_1fc);
}
this.bitsets=[];
var _1ff=[];
var _200=this.container.matrix.bottomRight.questions;
if(_200.count<1){
return;
}
var _201=_200.getObjectByIndex(0).outcomeGroup.keys;
var _202=curam.matrix.util.safeSplit;
var arr;
for(var _203=0;_203<_201.length;_203++){
arr=_202(_201[_203],"-");
_1ff[_203]=arr[1];
this._initOutcome(_1ff[_203]);
}
var _204,_205=false;
for(var _203=0;_203<_1ff.length&&!_205;_203++){
_204=this.bitsets[_1ff[_203]];
for(var _206=0;_206<_204.length;_206++){
if(_204[_206]&&!this._validate(null,_204[_206].inputs[0])){
_205=true;
break;
}
}
}
if(this.isWarningActive()||this.isErrorActive()){
this.refocus();
}
this.inRefresh=this.requiresRefresh=false;
},deleteCombination:function(_207,_208){
if(!this.bitsets[_207]||!this.bitsets[_207][Number(_208)]){
return;
}
this._deleteBitset(this.bitsets[_207][Number(_208)]);
this.bitsets[_207][Number(_208)]=null;
},deleteOutcome:function(_209){
if(!this.bitsets[_209]){
return;
}
var _20a={};
for(var _20b=0;_20b<this.bitsets[_209].length;_20b++){
if(this.bitsets[_209][_20b]){
_20a[this.bitsets[_209][_20b].id]=true;
}
}
this._deleteBitsets(_20a);
for(var _20b=0;_20b<this.bitsets.length;_20b++){
if(this.bitsets[_20b]==this.bitsets[_209]){
this.bitsets[_20b]=null;
break;
}
}
this.bitsets[_209]=null;
},_initOutcome:function(_20c){
if(!this.bitsets[_20c]){
this.bitsets[_20c]=this.bitsets[this.bitsets.length]=[];
}
var _20d=this.bitsets[_20c];
var _20e=this.container.matrix.bottomRight.questions;
var rows,_20f;
var _210,_211,_212,keys,key,qId,_213;
var _214=function(id){
return Number(id.substr(id.lastIndexOf("-")+1,id.length))-1;
};
var _215=_20e.getObjectByIndex(0).getOutcome(_20c).rows.getObjectByIndex(0).cells;
var _216={};
for(var _217=0;_217<_215.count;_217++){
_216[_217]=_214(_215.keys[_217]);
if(_20d.length<_217-1||!_20d[_216[_217]]){
this._createBitset(_216[_217],_20d);
}
}
for(var _218=0;_218<_20e.count;_218++){
_213=_20e.getObjectByIndex(_218);
rows=_213.getOutcome(_20c).rows;
for(var _219=0;_219<rows.count;_219++){
_20f=rows.getObjectByIndex(_219).cells;
for(var _21a=0;_21a<_20f.count;_21a++){
var _21b=_20f.getObjectByIndex(_21a).input;
_21b.bitsetId=null;
this.setOutcomeValue(_20c,_216[_21a],_21b,null,true);
}
}
}
}});
});
},"curam/matrix/Priority":function(){
define("curam/matrix/Priority",["dijit","dojo","dojox","dojo/require!curam/util,curam/matrix/util"],function(_21c,dojo,_21d){
dojo.provide("curam.matrix.Priority");
dojo.require("curam.util");
dojo.require("curam.matrix.util");
dojo.declare("curam.matrix.Priority",null,{constructor:function(node,_21e,_21f){
this.node=node;
this.validation=dojo.query("> :first-child",node)[0];
this.input=dojo.query("> :first-child",this.validation)[0];
this.input.priorityGroup=_21f;
this.input.priority=this;
curam.util.connect(this.input,"onkeyup",function(e){
_21e.priorityValidator.validatePriority(arguments[0]);
return false;
});
curam.util.connect(this.input,"onblur",function(e){
_21e.priorityValidator.checkPriorityValidation(e);
return false;
});
curam.matrix.util.makeNumericInput(this.input,true);
},adjustFirstRowClass:function(_220){
var _221=dojo.attr(this.node,"class");
if(_221.indexOf("ans-eval-with-menu")==-1){
_221=_221.replace("ans-eval","ans-eval-with-menu");
cm.setClass(this.node,_221);
}
_221=dojo.attr(this.validation,"class");
if(_221.indexOf("ans-str-val-eval-with-menu")==-1){
_221=_221.replace("ans-str-val-eval","ans-str-val-eval-with-menu");
cm.setClass(this.validation,_221);
}
}});
});
},"dijit/_WidgetsInTemplateMixin":function(){
define("dijit/_WidgetsInTemplateMixin",["dojo/_base/array","dojo/_base/declare","dojo/parser","dijit/registry"],function(_222,_223,_224,_225){
return _223("dijit._WidgetsInTemplateMixin",null,{_earlyTemplatedStartup:false,widgetsInTemplate:true,_beforeFillContent:function(){
if(this.widgetsInTemplate){
var node=this.domNode;
var cw=(this._startupWidgets=_224.parse(node,{noStart:!this._earlyTemplatedStartup,template:true,inherited:{dir:this.dir,lang:this.lang,textDir:this.textDir},propsThis:this,scope:"dojo"}));
this._supportingWidgets=_225.findWidgets(node);
this._attachTemplateNodes(cw,function(n,p){
return n[p];
});
}
},startup:function(){
_222.forEach(this._startupWidgets,function(w){
if(w&&!w._started&&w.startup){
w.startup();
}
});
this.inherited(arguments);
}});
});
},"curam/matrix/OutcomeColumn":function(){
define("curam/matrix/OutcomeColumn",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_226,dojo,_227){
dojo.provide("curam.matrix.OutcomeColumn");
dojo.require("curam.matrix.Constants");
dojo.declare("curam.matrix.OutcomeColumn",null,{constructor:function(node,_228){
this.node=node;
this.text=dojo.query("> :first-child",this.node)[0];
this.outId=this.node.id.replace("column-id-","");
this.columns=new curam.ListMap();
this.combinationCount=0;
this.matrix=curam.matrix.Constants.container.matrix;
if(_228){
curam.matrix.util.initButtonListeners(node);
}
var _229=cm.nextSibling(this.text);
while(_229!=null){
if(_229.nodeName=="INPUT"){
this.columns.add(_229.id,_229);
this.combinationCount++;
}
_229=cm.nextSibling(_229);
}
curam.matrix.Constants.container.existingOutcomeIds=curam.matrix.Constants.container.existingOutcomeIds.concat((this.outId)+"|");
var _22a=this;
this.matrix.addLazyWidget(this,"columns");
this.lazyListener=function(_22b){
if(!_22a.matrix.createLazyWidgets("columns")){
dojo.disconnect(this.node._conn);
return;
}
if(!_22a.widget){
return;
}
_22a.widget._toggleMenu("OutcomeOptions",_22b);
window.activeMenuID=_22a.node.id;
_226.byId("OutcomeOptions")._openMyself(_22b);
};
this.node._conn=dojo.connect(this.node,"onclick",this,"lazyListener");
},createWidget:function(){
var c=curam.matrix.Constants.container;
if(this.widgetCreated){
return;
}
var _22c="column-id column-eval out-"+this.outId+"-col-eval";
var _22d=this.widthWithoutBorder;
var _22e=_226.byId(this.node.id);
if(_22e){
_22e.destroy();
}
var _22f=this.widget=new curam.widget.DivButton({menuId:"OutcomeOptions",id:this.node.id,className:_22c},this.node);
var _230=new curam.matrix.OutcomeColumn(_22f.domNode,true);
c.matrix.topRight.topRightTop.outcomeCols.add(_230.node.id,_230);
_230.widgetCreated=true;
_230.setWidth(this.outId,_22d);
c.existingOutcomeIds=c.existingOutcomeIds.replace(this.outId+"|","");
},getCombColumnIds:function(){
var key;
var arr=new Array();
var _231=/.*\.outcombid\..*\./;
for(var i=0;i<this.columns.count;i++){
key=this.columns.getKeyByIndex(i);
key=new String(key);
arr.push(key.replace(_231,""));
}
return arr;
},setDimensions:function(_232){
var _233=this.combinationCount;
var _234=(_233*curam.matrix.Constants.COMBINATION_CELL_WIDTH)+((_233-1)*curam.matrix.Constants.MATRIX_BORDER_SIZE);
var _235=curam.matrix.Constants.COMBINATION_CELL_WIDTH;
this.setWidth(_232,_234);
return _234+curam.matrix.Constants.MATRIX_BORDER_SIZE;
},setWidth:function(_236,_237){
curam.matrix.Constants.container.cssText.append(".matrix-container .out-").append(_236).append("-col-eval{width:").append(_237).append("px;}");
this.widthWithoutBorder=_237;
this.widthWithBorder=_237+curam.matrix.Constants.MATRIX_BORDER_SIZE;
},deleteCombIdInputFields:function(id){
var _238=this.matrix.inputPrefix+"outcombid."+this.outId+"."+id;
dojo.destroy(this.columns.getObjectByKey(_238));
this.columns.removeByKey(_238);
}});
});
},"curam/ListMap":function(){
define("curam/ListMap",[],function(){
var _239=dojo.declare("curam.ListMap",null,{constructor:function(){
this.keys=new Array();
this.objects=new Array();
this.count=this.keys.length;
},add:function(key,_23a){
if(this.getIndexByKey(key)>=0){
this.set(key,_23a);
}else{
this.keys.push(key);
this.count++;
this.objects[key]=_23a;
}
},set:function(key,_23b){
var pos=this.getIndexByKey(key);
this.keys[pos]=key;
this.objects[key]=_23b;
},getObjectByIndex:function(_23c){
return this.objects[this.keys[_23c]];
},getKeyByIndex:function(_23d){
return this.keys[_23d];
},getObjectByKey:function(key){
if(this.getIndexByKey(key)!=-1){
return this.objects[key];
}
},getIndexByKey:function(key){
return this.indexOf(key);
},removeByKey:function(key){
var _23e=this.getIndexByKey(key);
if(_23e>=0&&_23e<this.count){
this.count--;
this.keys.splice(_23e,1);
this.objects[key]=null;
}
},removeAtIndex:function(_23f){
if(_23f>=0&&_23f<this.count){
this.count--;
this.keys.splice(_23f,1);
}
},indexOf:function(obj){
for(var i=0;i<this.count;i++){
if(this.keys[i]==obj){
return i;
}
}
}});
return _239;
});
},"curam/Matrix":function(){
define("curam/Matrix",["curam/matrix/validation/AnswerValidator","curam/matrix/Constants","curam/matrix/validation/PriorityValidator","curam/matrix/validation/ContradictionValidator","curam/matrix/validation/OutcomeValidator","curam/matrix/TopLeft","curam/matrix/TopRight","curam/matrix/TopRightFiller","curam/matrix/BottomLeft","curam/matrix/BottomRight","curam/util","curam/matrix/util","curam/debug","curam/util/ScreenContext","curam/StringBuffer","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _240=new curam.util.ResourceBundle("Debug");
var _241=dojo.declare("curam.Matrix",null,{HORIZ_VALIDATION:1,VERT_VALIDATION:2,constructor:function(node,_242,_243){
_242.matrix=this;
curam.matrix.Constants.container=_242;
this.messages={contradiction:{singleWarningMsg:curam.matrix.Constants.container.i18nMsgs.contradictionsSingleWarningMsg,questionMsg:curam.matrix.Constants.container.i18nMsgs.contradictionsQuestionMsg,warningMsg:curam.matrix.Constants.container.i18nMsgs.contradictionsWarningMsg,errorMsg:curam.matrix.Constants.container.i18nMsgs.contradictionsErrorMsg,tooFewQuestions:curam.matrix.Constants.container.i18nMsgs.contradictionsTooFewQuestions},outcome:{warningMsg:curam.matrix.Constants.container.i18nMsgs.outcomeWarningMsg,errorMsg:curam.matrix.Constants.container.i18nMsgs.outcomeErrorMsg,copyErrorMsg:curam.matrix.Constants.container.i18nMsgs.outcomeCopyErrorMsg},emptyMatrix:curam.matrix.Constants.container.i18nMsgs.questionEmptyMatrix};
var _244=["priorityExists","scoreExists","contradictionsExist","outcomesExist","inputPrefix"];
for(var _245=0;_245<_244.length;_245++){
if(_243[_244[_245]]){
this[_244[_245]]=_243[_244[_245]];
}
}
this.form=dojo.byId(this.inputPrefix+"deletedQuestions").form;
this.answerValidator=new curam.matrix.validation.AnswerValidator(curam.matrix.Constants.container);
this.priorityValidator=new curam.matrix.validation.PriorityValidator(curam.matrix.Constants.container);
this.contradictionValidator=new curam.matrix.validation.ContradictionValidator(curam.matrix.Constants.container,this.messages.contradiction);
this.outcomeValidator=new curam.matrix.validation.OutcomeValidator(curam.matrix.Constants.container,this.messages.outcome);
this.validators=[this.answerValidator,this.priorityValidator,this.contradictionValidator,this.outcomeValidator];
var _246=this;
var _247=function(){
if(_246.refreshOutcomeValidations){
_246.refreshOutcomeValidations=false;
_246.outcomeValidator.refreshValidation();
}
};
dojo.connect(this.contradictionValidator,"onValid",_247);
this.node=node;
this.topLeftFiller=dojo.byId("top-left-filler");
this.topLeft=new curam.matrix.TopLeft();
this.topRight=new curam.matrix.TopRight();
this.topRightFiller=new curam.matrix.TopRightFiller();
this.bottomLeft=new curam.matrix.BottomLeft(this);
this.bottomRight=new curam.matrix.BottomRight(this);
var _246=this;
this._refocusListener=function(e){
if(_246.isValidationActive()){
_246.refocusValidatingInput();
}
dojo.stopEvent(e);
};
curam.util.connect(this.node,"key",function(e){
var keys=curam.matrix.util.keys;
if((e.keyCode==curam.matrix.util.keys.KEY_LEFT_ARROW||e.keyCode==curam.matrix.util.keys.KEY_RIGHT_ARROW)&&e.target.tagName!="INPUT"){
_246._refocusListener(e);
}
});
this._initForm();
this.sov=this.setOutcomeValue;
this.scv=this.setContradictionValue;
this.cf=curam.matrix.util.checkFocus;
},setDimensionLimits:function(){
var c=curam.matrix.Constants.container;
var _248=dojo.style(c.validation.node,"borderTop")+dojo.style(c.validation.node,"borderBottom");
var _249=dojo.query("> span:first-child",c.buttons.node)[0];
var _24a=dojo.style(_249,"borderTop")+dojo.style(_249,"borderBottom");
c.maxMatrixHeight=c.maxHeight-(_248+Math.min(20,_24a));
c.maxTopRightWidth=c.maxWidth-c.leftMatrixWidth-c.matrix.topRightFiller.widthIncBorder;
},setDimensions:function(){
this.setHeight();
this.setWidth();
},setWidth:function(){
this.width=curam.matrix.Constants.container.leftMatrixWidth+this.topRight.width+this.topRightFiller.widthIncBorder;
curam.matrix.Constants.container.cssText.append(".matrix-container .matrix-eval{width:").append(this.width).append("px;}");
},setHeight:function(){
this.height=this.topLeft.height+this.bottomLeft.heightIncBorder;
curam.matrix.Constants.container.cssText.append(".matrix-container .matrix-eval{height:").append(this.height).append("px;}");
},scrollSync:function(){
var _24b=this.topRight.node;
var _24c=this.bottomRight.node;
var _24d=this.bottomLeft.bottomLeftMain.node;
this.addScrollSynchronization(_24c,_24b,_24d);
},refreshScrollSync:function(){
if(this._syncScroll){
this._syncScroll();
}
},addScrollSynchronization:function(_24e,_24f,_250){
this.removeScrollSynchronization(_24f);
this.removeScrollSynchronization(_250);
this._syncScroll=this.getOnScrollFunction(_24f,_250,_24e);
this._reverseVertSyncScroll=this.getOnScrollFunction(null,_24e,_250);
this._syncScroll();
curam.util.connect(_250,"onscroll",this._reverseVertSyncScroll);
curam.util.connect(_24e,"onscroll",this._syncScroll);
},removeScrollSynchronization:function(_251){
if(_251._syncTo!=null){
_251.onscroll=null;
}
_251._syncScroll=null;
},getOnScrollFunction:function(_252,_253,_254){
var _255=this;
if(_253&&_252){
return function(e){
_255.checkRedraw(_254.scrollTop);
_252.scrollLeft=_254.scrollLeft;
_253.scrollTop=_254.scrollTop;
};
}else{
return function(e){
_255.checkRedraw(_254.scrollTop);
_253.scrollTop=_254.scrollTop;
};
}
},_initForm:function(){
var _256=this;
curam.util.connect(this.form,"onsubmit",function(e){
try{
_256.contradictionValidator.inSave=true;
if(_256.isValidationActive()||!_256.answerValidator.refreshValidation()||(_256.refreshCombinationValidators(true)||_256.isValidationActive())){
dojo.stopEvent(e);
_256.contradictionValidator.inSave=false;
return false;
}
_256.updateQuestionOrder();
_256.updateOutcomeOrder();
_256.deleteSyncToken();
_256._setFormNames();
}
catch(ex){
curam.debug.log(_240.getProperty("curam.matrix.msg"),ex);
dojo.stopEvent(e);
return false;
}
e.target.submit();
return false;
});
},_setFormNames:function(){
var _257=curam.matrix.Constants.container.node.parentNode.getElementsByTagName("input");
if(!_257||_257.length==0){
return;
}
for(var _258=0;_258<_257.length;_258++){
_257[_258].setAttribute("name",_257[_258].getAttribute("id"));
}
},deleteSyncToken:function(){
var _259=dojo.byId("__o3synch");
if(_259){
_259.parentNode.removeChild(_259);
}
},addLazyWidget:function(_25a,_25b){
if(!_25b){
_25b="default";
}
if(!this.lazyWidgets){
this.lazyWidgets={};
}
if(!this.lazyWidgets[_25b]){
this.lazyWidgets[_25b]=[];
}
var arr=this.lazyWidgets[_25b];
arr[arr.length]=_25a;
},createLazyWidgets:function(_25c){
if(!_25c){
_25c="default";
}
if(!this.lazyWidgets[_25c]||this.lazyWidgets[_25c].length<1){
return false;
}
var arr=this.lazyWidgets[_25c];
for(var _25d=0;_25d<arr.length;_25d++){
arr[_25d].createWidget();
}
this.lazyWidgets[_25c]=[];
this.initHighlighters();
return true;
},initHighlighters:function(_25e,_25f){
var _260=this;
var _261=dijit.byId("CombinationOptions");
var _262=dijit.byId("OutcomeOptions");
var chk=function(_263){
return function(e){
if(_260.isValidationActive()){
return;
}
setTimeout(_263,50);
};
};
var _264={combOpen:chk(function(){
_260.highlightCombination(_261.combinationId,true);
}),combClose:function(){
_260.highlightCombination(_261.combinationId,false);
},outOpen:chk(function(){
_260.highlightOutcome(activeMenuID,true);
}),outClose:function(){
_260.highlightOutcome(activeMenuID,false);
},quesOpen:chk(function(){
_260.highlightQuestion(activeMenuID,true);
}),quesClose:function(){
_260.highlightQuestion(activeMenuID,false);
},ansOpen:chk(function(){
_260.highlightAnswer(activeMenuID,true);
}),ansClose:function(){
_260.highlightAnswer(activeMenuID,false);
},priOpen:chk(function(){
_260.highlightPriority(true);
}),priClose:function(){
_260.highlightPriority(false);
},scrOpen:chk(function(){
_260.highlightScore(true);
}),scrClose:function(){
_260.highlightScore(false);
}};
var _265="onOpen";
var _266="onClose";
if(!this._highlightersCreated){
dojo.connect(_261,_265,_264,"combOpen");
dojo.connect(_261,_266,_264,"combClose");
dojo.connect(_262,_265,_264,"outOpen");
dojo.connect(_262,_266,_264,"outClose");
var _267=dijit.byId("QuestionOptions");
dojo.connect(_267,_265,_264,"quesOpen");
dojo.connect(_267,_266,_264,"quesClose");
var _268=dijit.byId("AnswerOptions");
dojo.connect(_268,_265,_264,"ansOpen");
dojo.connect(_268,_266,_264,"ansClose");
this._highlightersCreated=true;
}
if(!this._highlighterScoreCreated&&_25f){
var _269=dijit.byId("ScoreOptions");
dojo.connect(_269,_265,_264,"scrOpen");
dojo.connect(_269,_266,_264,"scrClose");
this._highlighterScoreCreated=true;
}
if(!this._highlighterPriCreated&&_25e){
var _26a=dijit.byId("PriorityOptions");
dojo.connect(_26a,_265,_264,"priOpen");
dojo.connect(_26a,_266,_264,"priClose");
this._highlighterPriCreated=true;
}
},highlightPriority:function(_26b){
this.highlightSingleColumn(_26b,"priorityGroup");
},highlightScore:function(_26c){
this.highlightSingleColumn(_26c,"scoreGroup");
},highlightCombination:function(_26d,_26e){
var _26f;
if(_26d=="column-id-contr"||_26d.indexOf("contr-cell")==0){
_26f=this._highlightedComb&&!_26e?this._highlightedComb:this.getContradictionColInputs(_26d);
}else{
var _270=curam.matrix.util.safeSplit(_26d,"-");
var _271=_270[1],_272=_270[5];
_26f=this._highlightedComb&&!_26e?this._highlightedComb:this.getOutcomeColInputs(_271,_272);
}
this.highlightNodes(_26f,_26e,function(node){
return node.parentNode;
});
this._highlightedComb=_26e?_26f:null;
},highlightSingleColumn:function(_273,_274){
var qs=this.bottomRight.questions;
var _275=[];
for(var _276=0;_276<qs.count;_276++){
if(qs.getObjectByIndex(_276)[_274]){
_275.push(qs.getObjectByIndex(_276)[_274].node);
}
}
this.highlightNodes(_275,_273);
},highlightOutcome:function(_277,_278){
var qs=this.bottomRight.questions;
var _279=_277.replace("column-id-",""),qId;
var _27a=[];
if(_277=="column-id-contr"||_277.indexOf("contr-cell")==0){
this.highlightSingleColumn(_278,"contradiction");
return;
}
var _27b=function(qId,_27c){
return "out-"+_27c+"-"+qId;
};
for(var _27d=0;_27d<qs.count;_27d++){
qId=qs.getObjectByIndex(_27d).qId;
_27a.push(_27b(qId,_279));
}
this.highlightNodes(_27a,_278);
},highlightQuestion:function(_27e,_27f){
var fn=_27f?"addClass":"removeClass";
var qId=_27e.replace("ql-","");
var _280=[dojo.byId("qr-"+qId),dojo.byId("ques-"+qId),dojo.byId("ans-group-"+qId)];
this.highlightNodes(_280,_27f);
},highlightAnswer:function(_281,_282){
var _283;
if(!_282&&this._highlightedAnswer){
_283=this._highlightedAnswer;
this._highlightedAnswer=null;
}else{
var _284=curam.matrix.util.safeSplit(_281,"-");
var qId=_284[1];
var aId=_284[2];
this._highlightedAnswer=_283=[dojo.byId(_281),dojo.byId("pri-"+qId+"-"+aId),dojo.byId("scr-"+qId+"-"+aId)];
var _285=this.bottomRight.questions.getObjectByKey("qr-"+qId);
var _286=_285.contradiction;
if(_286){
var kids=_286.rows.getObjectByKey("contr-row-"+qId+"-"+aId).node.childNodes;
for(var _287=0;_287<kids.length;_287++){
_283.push(kids.item(_287));
}
}
var _288=_285.outcomeGroup;
var _289=cm.endsWith;
var _28a=curam.matrix.util.safeSplit;
if(_288){
var rows,key,_28b,_28c,_28d;
for(var _28e=0;_28e<_288.count;_28e++){
_28b=_288.getKeyByIndex(_28e);
_28c=_28a(_28b,"-")[1];
_28d=_288.getObjectByKey(_28b).rows.getObjectByKey("out-"+_28c+"-row-"+qId+"-"+aId);
_283.push(_28d.node);
}
}
}
this.highlightNodes(_283,_282);
},highlightNodes:function(_28f,_290,_291){
var fn=_290?"addClass":"removeClass";
if(!_291){
_291=function(node){
return node;
};
}
for(var _292=0;_292<_28f.length;_292++){
if(!_28f[_292]){
continue;
}
dojo[fn](_291(_28f[_292]),"highlighted");
}
if(!_290){
var _293=this;
setTimeout(function(){
_293.refreshScrollSync();
},10);
}
},disableInputs:function(_294,_295,type){
var ac=dojo.addClass;
ac(curam.matrix.Constants.container.node,"matrix-container-validating");
if(!type){
type="string";
}
var _296;
switch(type){
case "string":
case "numeric":
case "codetable":
_296=[dojo.byId(_294).parentNode];
if(_295){
_296[1]=dojo.byId(_295).parentNode;
}
break;
case "combination":
var val=this.getActiveValidator();
if(!val){
break;
}
_296=[];
for(var _297=0;_297<val.state.allowableFields.length;_297++){
_296.push(val.state.allowableFields[_297]);
}
break;
}
if(_296){
for(var _297=0;_297<_296.length;_297++){
ac(_296[_297],"inputValidating");
}
this.validatingNodes=_296;
}
dojo.publish("/disableMenuItems");
},enableInputs:function(){
dojo.removeClass(curam.matrix.Constants.container.node,"matrix-container-validating");
if(this.validatingNodes){
for(var _298=0;_298<this.validatingNodes.length;_298++){
dojo.removeClass(this.validatingNodes[_298],"inputValidating");
}
}
dojo.publish("/enableInput");
dojo.publish("/enableMenuItems");
},trunc:function(_299,_29a,num){
return Math.min(_29a,Math.max(_299,num));
},trapMatrixFocus:function(){
var _29b=this.bottomLeft.bottomLeftMain.questions;
var _29c=_29b.getObjectByIndex(0);
var _29d;
var _29e=1;
while(_29c&&!_29d){
for(var _29f=1;!_29d&&_29f<=_29c.ansGroup.answers.count;_29f++){
var _2a0=_29c.getAnswer(_29f);
if(_2a0.input&&_2a0.input.getAttribute("type")!="hidden"){
_29d=_2a0.input;
}
}
_29c=this.bottomLeft.bottomLeftMain.questions.getObjectByIndex(_29e++);
}
if(!_29d){
_29c=curam.matrix.Constants.container.matrix.bottomRight.questions.getObjectByIndex(0);
_29d=_29c.node.firstChild.getElementsByTagName("input")[0];
}
if(_29d&&!_29d["focusListenerAdded"]){
curam.util.connect(_29d,"onfocus",this._refocusListener);
_29d["focusListenerAdded"]=true;
}
},isValidationActive:function(){
if(this.answerValidator.isWarningActive()||this.answerValidator.isErrorActive()||this.priorityValidator.isWarningActive()||this.priorityValidator.isErrorActive()){
return this.HORIZ_VALIDATION;
}else{
if(this.contradictionValidator.isWarningActive()||this.contradictionValidator.isErrorActive()||this.outcomeValidator.isWarningActive()||this.outcomeValidator.isErrorActive()){
return this.VERT_VALIDATION;
}
}
return false;
},setValidationActive:function(){
dojo.publish("/disableMenuItems");
},setValidationInactive:function(){
dojo.publish("/enableMenuItems");
this.enableInputs();
},isInputPartOfValidation:function(_2a1){
for(var _2a2=0;_2a2<this.validators.length;_2a2++){
if(this.validators[_2a2].isInputPartOfValidation(_2a1)){
return true;
}
}
return false;
},refocusValidatingInput:function(){
var val=this.getActiveValidator();
if(val){
val.refocus();
}
},getActiveValidator:function(){
for(var _2a3=0;_2a3<this.validators.length;_2a3++){
if(this.validators[_2a3].isErrorActive()){
return this.validators[_2a3];
}
}
return null;
},checkFocus:function(args){
var e=dojo.fixEvent(args.length>0?args[0]:null);
if(this.isValidationActive()&&!this.isInputPartOfValidation(e.target)){
dojo.stopEvent(e);
this.refocusValidatingInput();
}
},openAddQuestionsPopupWindow:function(page,id,_2a4,_2a5){
if(!this.emptyWarningActive&&this.isValidationActive()){
return;
}
var sc=new curam.util.ScreenContext("MODAL");
var url=page+"Page.do?matrixID="+id+"&existingQuestionIds="+curam.matrix.Constants.container.existingQuestionIds+"&"+sc.toRequestString();
curam.util.openModalDialog({href:url},"width="+_2a4+",height="+_2a5);
},openAddOutomesPopupWindow:function(page,id,_2a6,_2a7){
if(this.isValidationActive()){
return;
}
var sc=new curam.util.ScreenContext("MODAL");
var url=page+"Page.do?matrixID="+id+"&existingOutcomeIds="+curam.matrix.Constants.container.existingOutcomeIds+"&"+sc.toRequestString();
curam.util.openModalDialog({href:url},"width="+_2a6+",height="+_2a7);
},addQuestionsFromPopup:function(){
if(this.isValidationActive()){
return;
}
window.setTimeout("curam.matrix.Constants.container.matrix.addNewQuestions()",0);
},addNewQuestions:function(){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
var _2a8=0;
var _2a9=dojo.fromJson(newQuestions);
for(var i=0;i<_2a9.length;i++){
_2a8+=c.matrix.addQuestion(_2a9[i]);
}
var _2aa=this.bottomLeft.bottomLeftMain.setDimensions();
this.bottomLeft.setHeight(_2aa);
c.matrix.setHeight();
c.setHeight();
this.bottomLeft.bottomLeftMain.resyncNumbers();
this.outcomeValidator.requiresRefresh=true;
this.contradictionValidator.requiresRefresh=true;
c.addCSS();
this.clearCopiedColumn();
this.checkEmpty();
this.setRequiresRedraw();
},setRequiresRedraw:function(){
if(!dojo.isIE){
return;
}
this._minScroll=this._maxScroll=this.bottomLeft.bottomLeftMain.node.scrollTop;
},checkRedraw:function(pos){
if(this._minScroll==null||typeof (this._minScroll)=="undefined"){
return;
}
if(pos>=this._minScroll&&pos<=this._maxScroll){
return;
}
this._minScroll=Math.min(this._minScroll,pos);
this._maxScroll=Math.max(this._maxScroll,pos);
if(this.redrawTimeout){
clearTimeout(this.redrawTimeout);
}
var _2ab=this;
this.redrawTimeout=setTimeout(function(){
_2ab.redrawTimeout=null;
curam.util.insertCssText(" ","_container_stylesheet_");
},200);
},addQuestion:function(_2ac){
var _2ad=_2ac.split("|",[3]);
if(curam.matrix.Constants.container.existingQuestionIdsMap[_2ad[0]]){
return;
}
var _2ae=this.bottomLeft.bottomLeftMain.addQuestion(_2ad);
this.bottomRight.addQuestion(_2ad);
this.updateQuestionOrder();
var _2af=this.bottomLeft.bottomLeftMain.questions.count;
if(_2af==1){
this.bottomRight.addButtonClassToFirstRow();
}else{
this.fixIEBorder();
}
return _2ae;
},addAnswer:function(id){
curam.matrix.Constants.container.cssText=new curam.StringBuffer();
var _2b0=this.bottomLeft.bottomLeftMain.questions.getObjectByKey(id).addAnswer();
this.bottomRight.questions.getObjectByKey(id.replace("ql-","qr-")).addAnswer();
this.bottomLeft.bottomLeftMain.setHeight(this.bottomLeft.bottomLeftMain.height+_2b0);
this.bottomLeft.setHeight(this.bottomLeft.bottomLeftMain.height+_2b0);
this.setHeight();
this.outcomeValidator.requiresRefresh=true;
this.contradictionValidator.requiresRefresh=true;
curam.matrix.Constants.container.setHeight();
this.clearCopiedColumn();
curam.matrix.Constants.container.addCSS();
},getCellIndexFromContradictionCellId:function(id){
return Number(curam.matrix.util.safeSplit(id,"-")[4]);
},getQuestionIdFromAnswerId:function(_2b1){
var qId=curam.matrix.util.safeSplit(_2b1,"-")[1];
return qId;
},getQuestionIdFromAnswerInputId:function(id){
var ids=id.split(".");
return ids[ids.length-2];
},getAnswerIdFromAnswerInputId:function(id){
var ids=id.split(".");
return ids[ids.length-1];
},getQuestionFromAnswerId:function(_2b2){
return this.getQuestion(this.getQuestionIdFromAnswerId(_2b2));
},getQuestion:function(id){
if(!this.bottomLeft){
return null;
}
return this.bottomLeft.bottomLeftMain.getQuestion(id);
},changeNumericAnswer:function(id,_2b3){
var _2b4=this.getQuestionFromAnswerId(id).getAnswerById(id);
if(_2b3=="minmax"){
_2b4.createMinMax();
}else{
_2b4.createSpecificValue();
}
},addPriorityColumn:function(){
if(this.isValidationActive()){
return;
}
if(!this.priorityExists){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
this.topRight.addPriorityColumn();
this.bottomRight.addPriorityColumn();
this.priorityExists=true;
c.matrix.setWidth();
c.setWidth();
c.addCSS();
}
},addScoreColumn:function(){
if(this.isValidationActive()){
return;
}
if(!this.scoreExists){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
this.topRight.addScoreColumn();
this.bottomRight.addScoreColumn();
this.scoreExists=true;
c.matrix.setWidth();
c.setWidth();
c.addCSS();
}
},addContradictionColumn:function(){
if(!this.contradictionsExist){
var c=curam.matrix.Constants.container;
if(this.bottomLeft.bottomLeftMain.questions.count<2){
alert(this.messages.contradiction.tooFewQuestions);
return;
}
c.cssText=new curam.StringBuffer();
this.topRight.addContradictionColumn();
this.bottomRight.addContradictionColumn();
this.contradictionsExist=true;
this.topRight.topRightTop.contradictionCol.setWidth(curam.matrix.Constants.COMBINATION_CELL_WIDTH);
this.topRight.setWidths(curam.matrix.Constants.container.matrix.topRight.topRightTop.contradictionCol.widthWithBorder);
this.bottomRight.setWidth();
c.matrix.setWidth();
c.setWidth();
c.addCSS();
this.validators[2]=this.contradictionValidator=new curam.matrix.validation.ContradictionValidator(curam.matrix.Constants.container,this.messages.contradiction);
this.refreshContradictionValidator(false,1);
this.setRequiresRedraw();
}
},refreshContradictionValidator:function(_2b5,_2b6){
if(arguments.length<2){
_2b6=this.contradictionValidator.bitsets.length;
}
if(_2b5){
this.contradictionValidator.requiresRefresh=true;
}
this.contradictionValidator.refreshValidation();
},getOutcome:function(id){
var ids=curam.matrix.util.safeSplit(id,"-");
var _2b7="out-"+ids[1]+"-"+ids[3];
var _2b8=this.bottomRight.questions.getObjectByIndex(0).outcomeGroup;
var _2b9=_2b8.getObjectByKey(_2b7);
return _2b9;
},addOutcomesFromPopup:function(_2ba){
if(!_2ba||_2ba.length<1){
return;
}
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
var _2bb=0;
for(var i=0;i<_2ba.length;i++){
_2bb+=this.addOutcomeColumn(_2ba[i]);
}
this.topRight.setWidths(_2bb);
this.bottomRight.setWidth();
this.setWidth();
c.setWidth();
c.addCSS();
this.setRequiresRedraw();
},addOutcomeColumn:function(_2bc){
var _2bc=_2bc.split("|",[2]);
var _2bd=curam.matrix.Constants.container.existingOutcomeIds.split("|");
for(var i=0;i<_2bd.length;i++){
if(_2bd[i]==_2bc[0]){
return;
}
}
var _2be=this.topRight.addOutcomeColumn(_2bc);
this.bottomRight.addOutcomeColumn(_2bc);
this.outcomesExist=true;
this.setRequiresRedraw();
return _2be;
},addCombination:function(id,_2bf){
if(id=="column-id-contr"||id.indexOf("contr-cell")==0){
this.addContradictionCombination(_2bf);
}else{
if(id.indexOf("column-id-")<0){
var _2c0=curam.matrix.util.safeSplit(id,"-");
id="column-id-"+_2c0[1];
}
this.addOutcomeCombination(id,_2bf);
}
var _2c1=this;
setTimeout(function(){
_2c1.refreshScrollSync();
_2c1.setRequiresRedraw();
},10);
},setContradictionValue:function(_2c2,_2c3,_2c4,qId){
this.contradictionValidator.setContradictionValue(_2c2-1,_2c3,_2c4,qId);
},setOutcomeValue:function(_2c5,_2c6,_2c7,_2c8){
this.outcomeValidator.setOutcomeValue(_2c5,_2c6-1,_2c7,_2c8);
},getContradictionColInputs:function(_2c9,_2ca){
var _2cb=[];
var _2cc=this.bottomRight.questions;
var _2cd=_2ca?_2ca:Number(curam.matrix.util.safeSplit(_2c9,"-")[4]);
var _2ce,_2cf,curQ,_2d0;
for(var _2d1=0;_2d1<_2cc.count;_2d1++){
curQ=_2cc.getObjectByIndex(_2d1);
for(var _2d2=0;_2d2<curQ.contradiction.rows.count;_2d2++){
_2cf=curQ.contradiction.rows.getObjectByIndex(_2d2);
_2d0=_2cf.node.id.replace("-row-","-cell-")+"-"+_2cd;
_2cb.push(_2cf.cells.getObjectByKey(_2d0).input);
}
}
return _2cb;
},getOutcomeColInputs:function(_2d3,_2d4){
var _2d5=this.bottomRight.questions;
var _2d6,curQ,_2d7;
var _2d8=[];
var curQ,_2d9,_2da;
for(var _2db=0;_2db<_2d5.count;_2db++){
curQ=_2d5.getObjectByIndex(_2db);
_2d9="out-"+_2d3+"-"+curQ.qId;
_2da=curQ.outcomeGroup.getObjectByKey(_2d9);
for(var _2dc=0;_2dc<_2da.rows.count;_2dc++){
_2d6=_2da.rows.getObjectByIndex(_2dc);
_2d7=_2d6.node.id.replace("-row-","-cell-")+"-"+_2d4;
_2d8.push(_2d6.cells.getObjectByKey(_2d7).input);
}
}
return _2d8;
},copyCombination:function(id){
if(id=="column-id-contr"||id.indexOf("contr-cell")==0){
this.copyContradictionColumn();
this._copySrc="contradiction";
}else{
this.copyOutcomeColumn();
}
},copyContradictionColumn:function(){
this.clearCopiedColumn();
var _2dd=dijit.byId("CombinationOptions").explodeSrc.parentNode.id;
var _2de=this.getContradictionColInputs(_2dd);
if(!_2de||_2de.length<1){
return;
}
this.copyFromInputs(_2de);
},copyOutcomeColumn:function(){
this.clearCopiedColumn();
var _2df=dijit.byId("CombinationOptions").explodeSrc.parentNode.id;
var _2e0=curam.matrix.util.safeSplit(_2df,"-");
var _2e1=_2e0[1];
var _2e2=_2e0[5];
this._copySrc=_2e1;
this.copyFromInputs(this.getOutcomeColInputs(_2e0[1],_2e0[5]));
},clearCopiedColumn:function(){
this._outcomeCopy=null;
},hasCopiedCombination:function(){
return (this._outcomeCopy!=null&&this._outcomeCopy.length>0);
},copyFromInputs:function(_2e3){
var arr=this._outcomeCopy=[];
for(var _2e4=0;_2e4<_2e3.length;_2e4++){
arr.push(_2e3[_2e4].checked);
}
},copyToInputs:function(_2e5){
if(!_2e5||(_2e5.length!=this._outcomeCopy.length)){
alert(this.messages.outcome.copyErrorMsg);
return;
}
for(var _2e6=0;_2e6<_2e5.length;_2e6++){
_2e5[_2e6].checked=this._outcomeCopy[_2e6];
}
},addContradictionCombination:function(_2e7){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
var msg,_2e8;
_2e8=this.bottomRight.addContradictionCombination(_2e7);
var _2e9=this.topRight.topRightTop;
var _2ea=_2e9.contradictionCol;
var _2eb=_2e9.addContrCombIdInput(_2ea.combinationCount);
_2ea.columns.add(_2eb.id,_2eb);
_2ea.node.appendChild(_2eb);
for(var i=0;i<c.locales.length;i++){
if(c.locales[i]==""){
continue;
}
msg=_2e9.addContrCombMessageInput(_2ea.combinationCount,c.locales[i],"");
_2ea.node.appendChild(msg);
}
_2ea.setWidth(_2ea.widthWithoutBorder+curam.matrix.Constants.COMBINATION_CELL_WIDTH+curam.matrix.Constants.MATRIX_BORDER_SIZE);
this.topRight.setWidths(curam.matrix.Constants.COMBINATION_CELL_WIDTH+curam.matrix.Constants.MATRIX_BORDER_SIZE);
this.bottomRight.setWidth();
this.setWidth();
c.setWidth();
c.addCSS();
if(_2e7&&this._outcomeCopy){
this.copyToInputs(this.getContradictionColInputs(null,_2e8));
}
if(this._copySrc!="contradiction"){
this.outcomeValidator.refreshOutcome(this._copySrc);
}
this.refreshContradictionValidator(true,1);
},addOutcomeCombination:function(id,_2ec){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
var _2ed=id.replace("column-id-","");
var _2ee=c.matrix.topRight.topRightTop.outcomeCols.getObjectByKey(id);
var _2ef=this.bottomRight.addOutcomeCombination(_2ee,id);
var _2f0=this.topRight.topRightTop.addOutCombIdInput(_2ed,_2ee.combinationCount);
_2ee.columns.add(_2f0.id,_2f0);
_2ee.node.appendChild(_2f0);
_2ee.setWidth(_2ed,_2ee.widthWithoutBorder+curam.matrix.Constants.COMBINATION_CELL_WIDTH+curam.matrix.Constants.MATRIX_BORDER_SIZE);
this.topRight.setWidths(curam.matrix.Constants.COMBINATION_CELL_WIDTH+curam.matrix.Constants.MATRIX_BORDER_SIZE);
this.bottomRight.setWidth();
this.setWidth();
c.setWidth();
c.addCSS();
if(_2ec){
this.copyToInputs(this.getOutcomeColInputs(_2ed,_2ef));
}
if(this._copySrc=="contradiction"){
this.refreshContradictionValidator(true,1);
}
this.outcomeValidator.refreshOutcome(_2ed);
},updateQuestionOrder:function(){
var _2f1=dojo.byId(this.inputPrefix+"questionOrder");
_2f1.value=curam.matrix.Constants.container.existingQuestionIds;
},updateOutcomeOrder:function(){
var _2f2=dojo.byId(this.inputPrefix+"outcomeOrder");
_2f2.value=curam.matrix.Constants.container.existingOutcomeIds;
},deleteQuestion:function(id){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
var _2f3=false;
var _2f4=id.replace("ql-","qr-");
var _2f5=this.bottomLeft.bottomLeftMain.questions.getObjectByKey(id);
if(!_2f5){
return false;
}
var _2f6=_2f5.height;
var qId=_2f5.qId;
var _2f7=dojo.byId(this.inputPrefix+"deletedQuestions");
_2f7.value=_2f7.value+(_2f7.value.length>0?"|":"")+qId;
if(this.bottomRight.questions.getIndexByKey(_2f4)==0){
_2f3=true;
}
dojo.destroy(id);
dojo.destroy(_2f4);
this.bottomLeft.bottomLeftMain.questions.removeByKey(id);
this.bottomRight.questions.removeByKey(_2f4);
if(_2f3){
this.bottomRight.addButtonClassToFirstRow();
}
c.removeQuestionId(qId);
this.bottomLeft.bottomLeftMain.resyncNumbers();
this.fixIEBorder();
var _2f8=this.bottomLeft.bottomLeftMain.setDimensions();
this.bottomLeft.setHeight(_2f8);
this.bottomLeft.setHeight(this.bottomLeft.bottomLeftMain.height-_2f6);
c.matrix.setHeight();
c.setHeight();
this.clearCopiedColumn();
c.addCSS();
this.updateQuestionOrder();
if(this.bottomLeft.bottomLeftMain.questions.count<2){
this.deleteContradictionColumn();
}
this.refreshCombinationValidators(true);
this.checkEmpty();
},checkEmpty:function(){
if(this.bottomLeft.bottomLeftMain.questions.count>0){
if(this.emptyWarningActive){
this.emptyWarningActive=false;
curam.matrix.Constants.container.deactivateValidation();
}else{
if(!this.isValidationActive()){
curam.matrix.Constants.container.hideValidation();
}
}
return;
}
var id="newQs_btn_"+(new Date()).getTime();
var html=this.messages.emptyMatrix+"<a href=\"#\" id=\""+id+"\">"+curam.matrix.Constants.container.i18nMsgs.addQuestions+"</a>";
curam.matrix.Constants.container.activateWarning(html);
curam.util.connect(dojo.byId(id),"onclick",function(e){
var _2f9=dojo.byId("addQuestions").getAttribute("onclick");
if(dojo.isString(_2f9)){
dojo.eval(_2f9);
}else{
_2f9();
}
});
this.emptyWarningActive=true;
},refreshCombinationValidators:function(_2fa){
if(this.contradictionsExist){
this.refreshContradictionValidator(_2fa,0);
}
if(_2fa){
this.outcomeValidator.requiresRefresh=true;
}
if(!this.contradictionsExist||(!this.contradictionValidator.isWarningActive()&&!this.contradictionValidator.isErrorActive())){
this.outcomeValidator.refreshValidation();
this.refreshOutcomeValidations=false;
}else{
this.refreshOutcomeValidations=true;
}
},deleteAnswer:function(id){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
var _2fb=false;
var _2fc=false;
var _2fd=/-.*/;
var _2fe=curam.matrix.util.safeSplit(id,"-");
var qId=_2fe[1];
var _2ff=_2fe[2];
var _300=this.bottomLeft.bottomLeftMain.questions.getObjectByKey("ql-"+qId);
var _301=this.bottomRight.questions.getObjectByKey("qr-"+qId);
if(this.bottomRight.questions.getIndexByKey("qr-"+qId)==0){
_2fb=true;
}
if(_300.ansGroup.answers.getIndexByKey(id)==0){
_2fc=true;
}
_300.deleteAnswer(_2fc,id);
_301.deleteAnswer(_2fc,_2ff);
if(_2fb&&_2fc){
this.bottomRight.addButtonClassToFirstRow();
}
this.bottomLeft.bottomLeftMain.resyncNumbers();
var _302=this.bottomLeft.bottomLeftMain.setDimensions();
this.bottomLeft.setHeight(_302);
c.matrix.setHeight();
c.setHeight();
this.clearCopiedColumn();
c.addCSS();
this.refreshCombinationValidators(true);
},deletePriorityColumn:function(){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
this.bottomRight.deletePriorityColumn();
this.topRight.deletePriorityColumn();
this.priorityExists=false;
this.topRight.topRightTop.priorityWidgetCreated=false;
this.topRight.setWidths(-c.priorityWidth);
this.bottomRight.setWidth();
c.matrix.setWidth();
c.setWidth();
c.addCSS();
},deleteScoreColumn:function(){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
this.bottomRight.deleteScoreColumn();
this.topRight.deleteScoreColumn();
this.scoreExists=false;
this.topRight.topRightTop.scoreWidgetCreated=false;
this.topRight.setWidths(-c.priorityWidth);
this.bottomRight.setWidth();
c.matrix.setWidth();
c.setWidth();
c.addCSS();
},deleteOutcome:function(id){
if(id=="column-id-contr"){
this.deleteContradictionColumn();
}else{
this.deleteOutcomeColumn(id);
}
this.setRequiresRedraw();
},deleteContradictionColumn:function(){
if(!this.topRight.topRightTop.contradictionCol){
return;
}
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
var _303=this.topRight.topRightTop.contradictionCol.widthWithBorder;
this.bottomRight.deleteContradictionColumn();
this.topRight.deleteContradictionColumn();
this.contradictionsExist=false;
this.topRight.setWidths(-_303);
this.bottomRight.setWidth();
c.matrix.setWidth();
c.setWidth();
c.addCSS();
this.contradictionValidator.deleteContradiction();
},deleteOutcomeColumn:function(id){
var _304=id.replace("column-id-","");
var col=this.topRight.topRightTop.outcomeCols.getObjectByKey(id);
if(!col){
return;
}
var c=curam.matrix.Constants.container;
var _305=col.widthWithBorder;
var _306=dojo.byId(this.inputPrefix+"deletedOutcomes");
_306.value=_306.value+(_306.value.length>0?"|":"")+_304;
var _307=dojo.byId(this.inputPrefix+"deletedOutcomes");
if(_307.value.indexOf(_304)>-1){
var arr=_307.value.split("|");
for(var _308=0;_308<arr.length;_308++){
if(arr[_308]==_304){
arr.splice(_308,1);
_307.value=arr.join("|");
break;
}
}
}
c.cssText=new curam.StringBuffer();
this.bottomRight.deleteOutcomeColumn(_304);
this.topRight.deleteOutcomeColumn(id);
if(this.topRight.topRightTop.outcomeCols.count==0){
this.outcomesExist=false;
}
c.existingOutcomeIds=c.existingOutcomeIds.replace(_304+"|","");
this.topRight.setWidths(-_305);
this.bottomRight.setWidth();
c.matrix.setWidth();
c.setWidth();
c.addCSS();
this.outcomeValidator.deleteOutcome(_304);
var _309=this.bottomRight.questions;
if(_309.count!=0){
if(_309.getObjectByIndex(0).outcomeGroup.count<1){
this.outcomesExist=false;
}else{
this.outcomesExist=true;
}
}
},deleteCombination:function(id){
if(id.indexOf("contr-cell-")!=-1){
this.deleteContradictionCombination(id);
}else{
this.deleteOutcomeCombination(id);
}
var _30a=this;
setTimeout(function(){
_30a.refreshScrollSync();
},10);
},deleteContradictionCombination:function(id){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
var _30b=this.topRight.topRightTop.contradictionCol;
var _30c=/contr-cell-.*-.*-/;
var _30d=id.replace(_30c,"");
var _30e=this.bottomRight.checkIfLastContrCombColumn(id);
this.bottomRight.deleteContradictionCombination(_30d,_30e);
_30b.deleteCombIdAndMsgInputFields(_30d);
_30b.setWidth(_30b.widthWithoutBorder-(curam.matrix.Constants.COMBINATION_CELL_WIDTH+curam.matrix.Constants.MATRIX_BORDER_SIZE));
this.topRight.setWidths(-(curam.matrix.Constants.COMBINATION_CELL_WIDTH+curam.matrix.Constants.MATRIX_BORDER_SIZE));
this.bottomRight.setWidth();
c.matrix.setWidth();
c.setWidth();
c.addCSS();
this.refreshContradictionValidator(true,-1);
},deleteOutcomeCombination:function(id){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
var _30f=/-cell-.*-.*-.*/;
var _310=id.replace("out-","").replace(_30f,"");
_30f=/out-.*-cell-.*-.*-/;
var _311=id.replace(_30f,"");
var _312=this.topRight.topRightTop.outcomeCols.getObjectByKey("column-id-"+_310);
var _313=this.bottomRight.checkIfLastOutCombColumn(_310,id);
this.bottomRight.deleteOutcomeCombination(_310,_311,_313);
_312.deleteCombIdInputFields(_311);
_312.setWidth(_310,_312.widthWithoutBorder-(curam.matrix.Constants.COMBINATION_CELL_WIDTH+curam.matrix.Constants.MATRIX_BORDER_SIZE));
this.topRight.setWidths(-(curam.matrix.Constants.COMBINATION_CELL_WIDTH+curam.matrix.Constants.MATRIX_BORDER_SIZE));
this.bottomRight.setWidth();
c.matrix.setWidth();
c.setWidth();
c.addCSS();
this.outcomeValidator.deleteCombination(_310,Number(_311)-1);
},fixIEBorder:function(){
if(!dojo.isIE){
return;
}
var rpc=cm.replaceClass;
var _314=this.bottomLeft.bottomLeftMain.questions.getObjectByIndex(0);
if(!_314){
return;
}
var qId=_314.qId;
var _315=dojo.byId("ql-"+qId);
rpc(_315,"ieMarginPlus","ieMarginMinus");
var _316=dojo.byId("qr-"+qId);
if(_316){
rpc(_316,"ieMarginPlus","ieMarginMinus");
}
_315=cm.nextSibling(_315,"div");
if(_315){
rpc(_315,"ieMarginMinus","ieMarginPlus");
}
_316=cm.nextSibling(_316,"div");
if(_316){
rpc(_316,"ieMarginMinus","ieMarginPlus");
}
},addMessagesFromPopup:function(_317,_318){
var id="";
var _319=null;
for(var i=0;i<_317.count;i++){
id=this.inputPrefix+"contrmsg."+_318+"."+_317.getKeyByIndex(i);
_319=dojo.byId(id);
if(_319==null){
_319=dojo.create("input",{id:id,name:id,type:"hidden"},this.node);
}
_319.value=_317.getObjectByIndex(i);
}
},getContradictionMsg:function(_31a,_31b){
var _31c=dojo.byId(this.inputPrefix+"contrmsg."+_31a+"."+_31b);
if(_31c){
return _31c.value;
}
return null;
},addMessages:function(id){
var _31d=new Array;
var _31e=curam.matrix.util.getCellIndexFromContradictionCellId(id);
localeList=localeList.replace(" ","");
var _31f=localeList.split(",");
var _320="";
var _321=null;
for(var i=0;i<_31f.length;i++){
if(_31f[i]==""){
continue;
}
_320=this.inputPrefix+"contrmsg."+_31e+"."+_31f[i];
_321=dojo.byId(_320);
if(_321!=null){
_31d[_31f[i]]=_321.value;
}
}
var sc=new curam.util.ScreenContext("MODAL");
var url="../CDEJ/popups/decision-assist/add-messages.jsp?messages=combinationMessages"+"&combinationID="+_31e+"&"+sc.toRequestString();
function myFn(url){
curam.util.openModalDialog({href:url},"width=250,height=200");
};
myFn.url=url;
dojo.global.openThis=myFn;
combinationMessages=_31d;
setTimeout("dojo.global[\"openThis\"]('"+url+"');",50);
}});
return _241;
});
},"dojox/main":function(){
define("dojox/main",["dojo/_base/kernel"],function(dojo){
return dojo.dojox;
});
},"url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>","dojo/Stateful":function(){
define("dojo/Stateful",["./_base/declare","./_base/lang","./_base/array"],function(_322,lang,_323){
return _322("dojo.Stateful",null,{postscript:function(_324){
if(_324){
lang.mixin(this,_324);
}
},get:function(name){
return this[name];
},set:function(name,_325){
if(typeof name==="object"){
for(var x in name){
if(name.hasOwnProperty(x)&&x!="_watchCallbacks"){
this.set(x,name[x]);
}
}
return this;
}
var _326=this[name];
this[name]=_325;
if(this._watchCallbacks){
this._watchCallbacks(name,_326,_325);
}
return this;
},watch:function(name,_327){
var _328=this._watchCallbacks;
if(!_328){
var self=this;
_328=this._watchCallbacks=function(name,_329,_32a,_32b){
var _32c=function(_32d){
if(_32d){
_32d=_32d.slice();
for(var i=0,l=_32d.length;i<l;i++){
_32d[i].call(self,name,_329,_32a);
}
}
};
_32c(_328["_"+name]);
if(!_32b){
_32c(_328["*"]);
}
};
}
if(!_327&&typeof name==="function"){
_327=name;
name="*";
}else{
name="_"+name;
}
var _32e=_328[name];
if(typeof _32e!=="object"){
_32e=_328[name]=[];
}
_32e.push(_327);
return {unwatch:function(){
_32e.splice(_323.indexOf(_32e,_327),1);
}};
}});
});
},"curam/matrix/Answer":function(){
define("curam/matrix/Answer",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_32f,dojo,_330){
dojo.provide("curam.matrix.Answer");
dojo.require("curam.matrix.Constants");
dojo.declare("curam.matrix.Answer",null,{constructor:function(node,_331,_332){
this.node=node;
this.id=node.getAttribute("id");
this.validation=dojo.query("> :first-child",this.node)[0];
this.input=dojo.query("> :first-child",this.validation)[0];
this.button=cm.nextSibling(this.validation);
this.widgetCreated=false;
this.question=_332;
this.answerType=_331;
},init:function(){
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_CODETABLE||this.answerType==curam.matrix.Constants.ANSWER_TYPE_STRING){
var _333=this.validation.getElementsByTagName("select");
var _334=["onblur","onfocus","onkeypress"];
if(_333&&_333.length>0){
this.select=_333[0];
_334[_334.length]="onchange";
}
_334[_334.length]="onkeyup";
this.input.answer=this;
this.input.question=this.question;
this._addListeners(_334);
this._runInitialValidations([this.input]);
}else{
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
var _335=dojo.query("> input",this.validation);
if(_335.length==1){
this.specificValue=_335[0];
this.min=null;
this.max=null;
this.specificValue.answer=this;
this.specificValue.question=this.question;
}else{
this.min=_335[0];
this.max=_335[1];
this.min.answer=this.max.answer=this;
this.min.question=this.max.question=this.question;
this.specificValue=null;
}
this._addListeners();
}else{
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_BOOLEAN){
dojo.style(this.button,"display","none");
return;
}
}
}
var _336=this;
curam.matrix.Constants.container.matrix.addLazyWidget(this,"answers");
this.lazyListener=function(_337){
if(!curam.matrix.Constants.container.matrix.createLazyWidgets("answers")){
dojo.disconnect(_336.button._conn);
return;
}
if(!_336.widget){
return;
}
_336.widget._toggleMenu("AnswerOptions",cm.nextSibling(dojo.query("div",_336.node)[0],"div"));
window.activeMenuID=_336.node.id;
_32f.byId("AnswerOptions")._openMyself(curam.matrix.Constants.container.getFakeEvent(_336.widget.domNode));
};
this.button._conn=dojo.connect(this.button,"onclick",this,"lazyListener");
},createWidget:function(){
var c=curam.matrix.Constants.container;
if(this.widgetCreated){
return;
}
var _338=this.widget=new curam.widget.AnswerButton({menuId:"AnswerOptions"},this.button);
this.widgetCreated=true;
},getQuestion:function(){
if(!this.question){
var qId=this.id.replace("ans-","");
dId=qId.substring(0,qId.indexOf("-"));
}
return this.question;
},getOptions:function(){
if(!this.input["options"]){
return null;
}
var opts=[];
for(var _339=0;_339<this.input.options.length;_339++){
opts[_339]={value:this.input.options[_339].value,text:this.input.options[_339].text};
}
return opts;
},createSpecificValue:function(){
if(this.specificValue){
return;
}
var _33a=this.min.id.replace(".min.",".value.");
var _33b=dojo.query("div",this.node)[0];
_33b.innerHTML="<div class=\"label-specific-value\" title=\""+curam.matrix.Constants.container.i18nMsgs.labelSpecificValue+"\">"+curam.matrix.Constants.container.i18nMsgs.labelSpecificValue+":</div>"+"<input type=\"text\" size=\"4\" title=\""+curam.matrix.Constants.container.i18nMsgs.labelSpecificValue+"\"/>";
this.specificValue=dojo.query("input",_33b)[0];
this.specificValue.setAttribute("id",_33a);
curam.util.connect(this.specificValue,"onfocus",function(){
curam.matrix.Constants.container.matrix.cf(arguments);
});
this.specificValue.answer=this;
this.specificValue.question=this.question;
cm.setClass(this.specificValue,"numeric-input-eval");
this.min=this.max=null;
this._addListeners();
this._runInitialValidations([this.specificValue]);
},_runInitialValidations:function(_33c){
var av=curam.matrix.Constants.container.matrix.answerValidator;
for(var i=0;i<_33c.length;i++){
var _33d={target:_33c[i],keyCode:55};
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
av.validateNumericAnswer(_33d);
}else{
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_CODETABLE){
av.validateCodetableAnswer(_33d);
}else{
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_STRING){
av.validateStringAnswer(_33d);
}
}
}
av.checkForError(_33d);
av.checkFocus(_33d);
}
},_addListeners:function(_33e){
var av=curam.matrix.Constants.container.matrix.answerValidator;
var _33f=function(e){
av.validateNumericAnswer(e);
};
var _340=function(e){
av.validateCodetableAnswer(e);
};
var _341=function(e){
av.validateStringAnswer(e);
};
var _342=function(e){
av.checkForError(e);
};
var _343=function(e){
av.checkFocus(e);
};
if(arguments.length==0){
_33e=["onkeyup","onblur","onfocus","onkeypress"];
}
var fns={"onblur":_342,"onfocus":_343,"onkeypress":curam.matrix.util.numericInputChecker};
var _344;
if(this.specificValue){
_344=[this.specificValue];
}else{
if(this.min&&this.max){
_344=[this.min,this.max];
}else{
if(this.select){
_344=[this.select];
}else{
if(this.input){
_344=[this.input];
fns.onkeypress=curam.matrix.util.validationChecker;
}
}
}
}
fns.onchange=this.select?_340:_341;
fns.onkeyup=this.answerType==curam.matrix.Constants.ANSWER_TYPE_NUMERIC?_33f:_341;
for(var i=0;i<_344.length;i++){
for(var j=0;j<_33e.length;j++){
curam.util.connect(_344[i],_33e[j],fns[_33e[j]]);
}
}
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_CODETABLE){
var _345=this;
if(dojo.isIE7){
curam.util.subscribe("/disableInput",dojo.hitch(this.select,function(_346){
if(!_346||(_346&&this!=_346[0]&&this!=_346[1])){
this.setAttribute("disabled","true");
dojo._setOpacity(this,0.3);
}
}));
curam.util.subscribe("/enableInput",dojo.hitch(this.select,function(e){
this.setAttribute("disabled",false);
dojo._setOpacity(this,1);
}));
}
curam.util.connect(this.select,"onfocus",function(){
curam.matrix.Constants.container.matrix.cf(arguments);
});
}
},createMinMax:function(){
if((this.min&&this.max)||!this.specificValue){
return;
}
var _347=this.specificValue.id.replace(".value.",".min.");
var _348=this.specificValue.id.replace(".value.",".max.");
this.specificValue=null;
var _349=dojo.query("div",this.node)[0];
_349.innerHTML="<div class=\"label-min-max\" title=\""+curam.matrix.Constants.container.i18nMsgs.labelMin+"\">"+curam.matrix.Constants.container.i18nMsgs.labelMin+":</div>"+"<input type=\"text\" size=\"4\" title=\""+curam.matrix.Constants.container.i18nMsgs.labelMin+"\"/> "+"<div class=\"label-min-max\" title=\""+curam.matrix.Constants.container.i18nMsgs.labelMax+"\">"+curam.matrix.Constants.container.i18nMsgs.labelMax+":</div>"+"<input type=\"text\" size=\"4\" title=\""+curam.matrix.Constants.container.i18nMsgs.labelMax+"\"/>";
this.min=dojo.query("input",_349)[0];
this.max=cm.nextSibling(this.min,"INPUT");
cm.setClass(this.min,"numeric-input-eval");
cm.setClass(this.max,"numeric-input-eval");
this.min.setAttribute("id",_347);
this.min.setAttribute("name",_347);
this.max.setAttribute("id",_348);
this.max.setAttribute("name",_348);
var _34a=function(){
curam.matrix.Constants.container.matrix.cf(arguments);
};
curam.util.connect(this.min,"onfocus",_34a);
curam.util.connect(this.max,"onfocus",_34a);
this.min.answer=this.max.answer=this;
this.min.question=this.max.question=this.question;
this._addListeners();
this._runInitialValidations([this.min,this.max]);
},adjustFirstRowStyle:function(){
var _34b=dojo.attr(this.node,"class");
if(_34b.indexOf("ans-eval-with-menu")==-1){
_34b=_34b.replace("ans-eval","ans-eval-with-menu");
cm.setClass(this.node,_34b);
}
var _34c="ans-str-val-eval";
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_CODETABLE){
_34c="ans-ct-val";
}else{
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
_34c="ans-num-val-eval";
}else{
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_BOOLEAN){
_34c="ans-bool-val-eval";
}
}
}
var _34d=dojo.attr(this.validation,"class");
if(_34b.indexOf(_34c+"-with-menu")==-1){
_34d=_34d.replace(_34c,_34c+"-with-menu");
cm.setClass(this.validation,_34d);
}
}});
});
},"curam/define":function(){
define("curam/define",[],function(){
if(typeof (dojo.global.curam)=="undefined"){
dojo.global.curam={};
}
if(typeof (dojo.global.curam.define)=="undefined"){
dojo.mixin(dojo.global.curam,{define:{}});
}
dojo.mixin(dojo.global.curam.define,{singleton:function(_34e,_34f){
var _350=_34e.split(".");
var _351=window;
for(var i=0;i<_350.length;i++){
var part=_350[i];
if(typeof _351[part]=="undefined"){
_351[part]={};
}
_351=_351[part];
}
if(_34f){
dojo.mixin(_351,_34f);
}
}});
return dojo.global.curam.define;
});
},"curam/matrix/ContradictionRow":function(){
define("curam/matrix/ContradictionRow",["dijit","dojo","dojox"],function(_352,dojo,_353){
dojo.provide("curam.matrix.ContradictionRow");
dojo.declare("curam.matrix.ContradictionRow",null,{constructor:function(node){
this.node=node;
this.cells=new curam.ListMap();
var _354=this.node.childNodes;
for(var i=0;i<_354.length;i++){
if(_354[i].nodeType==1){
this.cells.add(_354[i].id,new curam.matrix.ContradictionCell(_354[i]));
}
}
}});
});
},"dojo/touch":function(){
define("dojo/touch",["./_base/kernel","./on","./has","./mouse"],function(dojo,on,has,_355){
function _356(type){
return function(node,_357){
return on(node,type,_357);
};
};
var _358=has("touch");
dojo.touch={press:_356(_358?"touchstart":"mousedown"),move:_356(_358?"touchmove":"mousemove"),release:_356(_358?"touchend":"mouseup"),cancel:_358?_356("touchcancel"):_355.leave};
return dojo.touch;
});
},"dijit/_CssStateMixin":function(){
define("dijit/_CssStateMixin",["dojo/touch","dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/_base/lang","dojo/_base/window"],function(_359,_35a,_35b,_35c,lang,win){
return _35b("dijit._CssStateMixin",[],{cssStateNodes:{},hovering:false,active:false,_applyAttributes:function(){
this.inherited(arguments);
_35a.forEach(["onmouseenter","onmouseleave",_359.press],function(e){
this.connect(this.domNode,e,"_cssMouseEvent");
},this);
_35a.forEach(["disabled","readOnly","checked","selected","focused","state","hovering","active"],function(attr){
this.watch(attr,lang.hitch(this,"_setStateClass"));
},this);
for(var ap in this.cssStateNodes){
this._trackMouseState(this[ap],this.cssStateNodes[ap]);
}
this._setStateClass();
},_cssMouseEvent:function(_35d){
if(!this.disabled){
switch(_35d.type){
case "mouseenter":
case "mouseover":
this._set("hovering",true);
this._set("active",this._mouseDown);
break;
case "mouseleave":
case "mouseout":
this._set("hovering",false);
this._set("active",false);
break;
case "mousedown":
case "touchpress":
this._set("active",true);
this._mouseDown=true;
var _35e=this.connect(win.body(),_359.release,function(){
this._mouseDown=false;
this._set("active",false);
this.disconnect(_35e);
});
break;
}
}
},_setStateClass:function(){
var _35f=this.baseClass.split(" ");
function _360(_361){
_35f=_35f.concat(_35a.map(_35f,function(c){
return c+_361;
}),"dijit"+_361);
};
if(!this.isLeftToRight()){
_360("Rtl");
}
var _362=this.checked=="mixed"?"Mixed":(this.checked?"Checked":"");
if(this.checked){
_360(_362);
}
if(this.state){
_360(this.state);
}
if(this.selected){
_360("Selected");
}
if(this.disabled){
_360("Disabled");
}else{
if(this.readOnly){
_360("ReadOnly");
}else{
if(this.active){
_360("Active");
}else{
if(this.hovering){
_360("Hover");
}
}
}
}
if(this.focused){
_360("Focused");
}
var tn=this.stateNode||this.domNode,_363={};
_35a.forEach(tn.className.split(" "),function(c){
_363[c]=true;
});
if("_stateClasses" in this){
_35a.forEach(this._stateClasses,function(c){
delete _363[c];
});
}
_35a.forEach(_35f,function(c){
_363[c]=true;
});
var _364=[];
for(var c in _363){
_364.push(c);
}
var cls=_364.join(" ");
if(cls!=tn.className){
tn.className=cls;
}
this._stateClasses=_35f;
},_trackMouseState:function(node,_365){
var _366=false,_367=false,_368=false;
var self=this,cn=lang.hitch(this,"connect",node);
function _369(){
var _36a=("disabled" in self&&self.disabled)||("readonly" in self&&self.readonly);
_35c.toggle(node,_365+"Hover",_366&&!_367&&!_36a);
_35c.toggle(node,_365+"Active",_367&&!_36a);
_35c.toggle(node,_365+"Focused",_368&&!_36a);
};
cn("onmouseenter",function(){
_366=true;
_369();
});
cn("onmouseleave",function(){
_366=false;
_367=false;
_369();
});
cn(_359.press,function(){
_367=true;
_369();
});
cn(_359.release,function(){
_367=false;
_369();
});
cn("onfocus",function(){
_368=true;
_369();
});
cn("onblur",function(){
_368=false;
_369();
});
this.watch("disabled",_369);
this.watch("readOnly",_369);
}});
});
},"dijit/_BidiSupport":function(){
define("dijit/_BidiSupport",["./_WidgetBase"],function(_36b){
_36b.extend({getTextDir:function(text){
return this.textDir=="auto"?this._checkContextual(text):this.textDir;
},_checkContextual:function(text){
var fdc=/[A-Za-z\u05d0-\u065f\u066a-\u06ef\u06fa-\u07ff\ufb1d-\ufdff\ufe70-\ufefc]/.exec(text);
return fdc?(fdc[0]<="z"?"ltr":"rtl"):this.dir?this.dir:this.isLeftToRight()?"ltr":"rtl";
},applyTextDir:function(_36c,text){
var _36d=this.textDir=="auto"?this._checkContextual(text):this.textDir;
if(_36c.dir!=_36d){
_36c.dir=_36d;
}
}});
return _36b;
});
},"dojo/_base/url":function(){
define("dojo/_base/url",["./kernel"],function(dojo){
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$"),_36e=function(){
var n=null,_36f=arguments,uri=[_36f[0]];
for(var i=1;i<_36f.length;i++){
if(!_36f[i]){
continue;
}
var _370=new _36e(_36f[i]+""),_371=new _36e(uri[0]+"");
if(_370.path==""&&!_370.scheme&&!_370.authority&&!_370.query){
if(_370.fragment!=n){
_371.fragment=_370.fragment;
}
_370=_371;
}else{
if(!_370.scheme){
_370.scheme=_371.scheme;
if(!_370.authority){
_370.authority=_371.authority;
if(_370.path.charAt(0)!="/"){
var path=_371.path.substring(0,_371.path.lastIndexOf("/")+1)+_370.path;
var segs=path.split("/");
for(var j=0;j<segs.length;j++){
if(segs[j]=="."){
if(j==segs.length-1){
segs[j]="";
}else{
segs.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&segs[0]=="")&&segs[j]==".."&&segs[j-1]!=".."){
if(j==(segs.length-1)){
segs.splice(j,1);
segs[j-1]="";
}else{
segs.splice(j-1,2);
j-=2;
}
}
}
}
_370.path=segs.join("/");
}
}
}
}
uri=[];
if(_370.scheme){
uri.push(_370.scheme,":");
}
if(_370.authority){
uri.push("//",_370.authority);
}
uri.push(_370.path);
if(_370.query){
uri.push("?",_370.query);
}
if(_370.fragment){
uri.push("#",_370.fragment);
}
}
this.uri=uri.join("");
var r=this.uri.match(ore);
this.scheme=r[2]||(r[1]?"":n);
this.authority=r[4]||(r[3]?"":n);
this.path=r[5];
this.query=r[7]||(r[6]?"":n);
this.fragment=r[9]||(r[8]?"":n);
if(this.authority!=n){
r=this.authority.match(ire);
this.user=r[3]||n;
this.password=r[4]||n;
this.host=r[6]||r[7];
this.port=r[9]||n;
}
};
_36e.prototype.toString=function(){
return this.uri;
};
return dojo._Url=_36e;
});
},"dojo/string":function(){
define("dojo/string",["./_base/kernel","./_base/lang"],function(dojo,lang){
lang.getObject("string",true,dojo);
dojo.string.rep=function(str,num){
if(num<=0||!str){
return "";
}
var buf=[];
for(;;){
if(num&1){
buf.push(str);
}
if(!(num>>=1)){
break;
}
str+=str;
}
return buf.join("");
};
dojo.string.pad=function(text,size,ch,end){
if(!ch){
ch="0";
}
var out=String(text),pad=dojo.string.rep(ch,Math.ceil((size-out.length)/ch.length));
return end?out+pad:pad+out;
};
dojo.string.substitute=function(_372,map,_373,_374){
_374=_374||dojo.global;
_373=_373?lang.hitch(_374,_373):function(v){
return v;
};
return _372.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_375,key,_376){
var _377=lang.getObject(key,false,map);
if(_376){
_377=lang.getObject(_376,false,_374).call(_374,_377,key);
}
return _373(_377,key).toString();
});
};
dojo.string.trim=String.prototype.trim?lang.trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
};
return dojo.string;
});
},"curam/matrix/AnswerGroup":function(){
define("curam/matrix/AnswerGroup",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_378,dojo,_379){
dojo.provide("curam.matrix.AnswerGroup");
dojo.require("curam.matrix.Constants");
dojo.declare("curam.matrix.AnswerGroup",null,{constructor:function(node,_37a){
this.node=node;
this.answers=new curam.ListMap();
this.ansHeightGreaterThanDefault=false;
this.answerType=this.setAnswerType(dojo.query("> :first-child",this.node)[0]);
this.answerCount=0;
var _37b=this.node.childNodes;
for(var i=0;i<_37b.length;i++){
if(_37b[i].nodeType==1){
var _37c=new curam.matrix.Answer(_37b[i],this.answerType,_37a);
this.answers.add(_37b[i].id,_37c);
_37c.init();
this.answerCount++;
}
}
},setAnswerType:function(_37d){
var _37e=dojo.query("> :first-child",_37d)[0];
if(dojo.hasClass(_37e,"ans-ct-val")||dojo.hasClass(_37e,"ans-ct-val-with-menu")){
return curam.matrix.Constants.ANSWER_TYPE_CODETABLE;
}else{
if(dojo.hasClass(_37e,"ans-str-val-eval")||dojo.hasClass(_37e,"ans-str-val-eval-with-menu")){
return curam.matrix.Constants.ANSWER_TYPE_STRING;
}else{
if(dojo.hasClass(_37e,"ans-bool-val-eval")||dojo.hasClass(_37e,"ans-bool-val-eval-with-menu")){
return curam.matrix.Constants.ANSWER_TYPE_BOOLEAN;
}else{
return curam.matrix.Constants.ANSWER_TYPE_NUMERIC;
}
}
}
},getOptions:function(){
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_CODETABLE){
return this.answers.getObjectByIndex(0).getOptions();
}
},getAnswerIds:function(){
var arr=new Array();
var _37f=/^ans-.*-/;
for(var i=0;i<this.answers.count;i++){
arr.push(this.answers.getKeyByIndex(i).replace(_37f,""));
}
return arr;
},getLastAddedAnswerId:function(){
var _380=/^ans-.*-/;
return this.answers.getKeyByIndex(this.answers.count-1).replace(_380,"");
}});
});
},"dijit/_KeyNavContainer":function(){
define("dijit/_KeyNavContainer",["dojo/_base/kernel","./_Container","./_FocusMixin","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/event","dojo/dom-attr","dojo/_base/lang"],function(_381,_382,_383,_384,keys,_385,_386,_387,lang){
return _385("dijit._KeyNavContainer",[_383,_382],{tabIndex:"0",connectKeyNavHandlers:function(_388,_389){
var _38a=(this._keyNavCodes={});
var prev=lang.hitch(this,"focusPrev");
var next=lang.hitch(this,"focusNext");
_384.forEach(_388,function(code){
_38a[code]=prev;
});
_384.forEach(_389,function(code){
_38a[code]=next;
});
_38a[keys.HOME]=lang.hitch(this,"focusFirstChild");
_38a[keys.END]=lang.hitch(this,"focusLastChild");
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
this.connect(this.domNode,"onfocus","_onContainerFocus");
},startupKeyNavChildren:function(){
_381.deprecated("startupKeyNavChildren() call no longer needed","","2.0");
},startup:function(){
this.inherited(arguments);
_384.forEach(this.getChildren(),lang.hitch(this,"_startupChild"));
},addChild:function(_38b,_38c){
this.inherited(arguments);
this._startupChild(_38b);
},focus:function(){
this.focusFirstChild();
},focusFirstChild:function(){
this.focusChild(this._getFirstFocusableChild());
},focusLastChild:function(){
this.focusChild(this._getLastFocusableChild());
},focusNext:function(){
this.focusChild(this._getNextFocusableChild(this.focusedChild,1));
},focusPrev:function(){
this.focusChild(this._getNextFocusableChild(this.focusedChild,-1),true);
},focusChild:function(_38d,last){
if(!_38d){
return;
}
if(this.focusedChild&&_38d!==this.focusedChild){
this._onChildBlur(this.focusedChild);
}
_38d.set("tabIndex",this.tabIndex);
_38d.focus(last?"end":"start");
this._set("focusedChild",_38d);
},_startupChild:function(_38e){
_38e.set("tabIndex","-1");
this.connect(_38e,"_onFocus",function(){
_38e.set("tabIndex",this.tabIndex);
});
this.connect(_38e,"_onBlur",function(){
_38e.set("tabIndex","-1");
});
},_onContainerFocus:function(evt){
if(evt.target!==this.domNode||this.focusedChild){
return;
}
this.focusFirstChild();
_387.set(this.domNode,"tabIndex","-1");
},_onBlur:function(evt){
if(this.tabIndex){
_387.set(this.domNode,"tabIndex",this.tabIndex);
}
this.focusedChild=null;
this.inherited(arguments);
},_onContainerKeypress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
var func=this._keyNavCodes[evt.charOrCode];
if(func){
func();
_386.stop(evt);
}
},_onChildBlur:function(){
},_getFirstFocusableChild:function(){
return this._getNextFocusableChild(null,1);
},_getLastFocusableChild:function(){
return this._getNextFocusableChild(null,-1);
},_getNextFocusableChild:function(_38f,dir){
if(_38f){
_38f=this._getSiblingOfChild(_38f,dir);
}
var _390=this.getChildren();
for(var i=0;i<_390.length;i++){
if(!_38f){
_38f=_390[(dir>0)?0:(_390.length-1)];
}
if(_38f.isFocusable()){
return _38f;
}
_38f=this._getSiblingOfChild(_38f,dir);
}
return null;
}});
});
},"dijit/registry":function(){
define("dijit/registry",["dojo/_base/array","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window","."],function(_391,has,_392,win,_393){
var _394={},hash={};
var _395={length:0,add:function(_396){
if(hash[_396.id]){
throw new Error("Tried to register widget with id=="+_396.id+" but that id is already registered");
}
hash[_396.id]=_396;
this.length++;
},remove:function(id){
if(hash[id]){
delete hash[id];
this.length--;
}
},byId:function(id){
return typeof id=="string"?hash[id]:id;
},byNode:function(node){
return hash[node.getAttribute("widgetId")];
},toArray:function(){
var ar=[];
for(var id in hash){
ar.push(hash[id]);
}
return ar;
},getUniqueId:function(_397){
var id;
do{
id=_397+"_"+(_397 in _394?++_394[_397]:_394[_397]=0);
}while(hash[id]);
return _393._scopeName=="dijit"?id:_393._scopeName+"_"+id;
},findWidgets:function(root){
var _398=[];
function _399(root){
for(var node=root.firstChild;node;node=node.nextSibling){
if(node.nodeType==1){
var _39a=node.getAttribute("widgetId");
if(_39a){
var _39b=hash[_39a];
if(_39b){
_398.push(_39b);
}
}else{
_399(node);
}
}
}
};
_399(root);
return _398;
},_destroyAll:function(){
_393._curFocus=null;
_393._prevFocus=null;
_393._activeStack=[];
_391.forEach(_395.findWidgets(win.body()),function(_39c){
if(!_39c._destroyed){
if(_39c.destroyRecursive){
_39c.destroyRecursive();
}else{
if(_39c.destroy){
_39c.destroy();
}
}
}
});
},getEnclosingWidget:function(node){
while(node){
var id=node.getAttribute&&node.getAttribute("widgetId");
if(id){
return hash[id];
}
node=node.parentNode;
}
return null;
},_hash:hash};
_393.registry=_395;
return _395;
});
},"dijit/_base/manager":function(){
define("dijit/_base/manager",["dojo/_base/array","dojo/_base/config","../registry",".."],function(_39d,_39e,_39f,_3a0){
_39d.forEach(["byId","getUniqueId","findWidgets","_destroyAll","byNode","getEnclosingWidget"],function(name){
_3a0[name]=_39f[name];
});
_3a0.defaultDuration=_39e["defaultDuration"]||200;
return _3a0;
});
},"curam/matrix/TopRight":function(){
define("curam/matrix/TopRight",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_3a1,dojo,_3a2){
dojo.provide("curam.matrix.TopRight");
dojo.require("curam.matrix.Constants");
dojo.declare("curam.matrix.TopRight",null,{constructor:function(){
this.node=dojo.byId("top-right");
this.topRightTop=new curam.matrix.TopRightTop();
this.topRightBottom=new curam.matrix.TopRightBottom();
this.container=curam.matrix.Constants.container;
},setDimensions:function(){
var c=this.container;
this.totalHeadingWidth=0;
this.setDefaultPriorityDimensions();
this.setDefaultCombinationDimensions();
c.initialContradictionDimensionsSet=false;
this.setInitialContradictionDimensions();
outcomesWidth=this.setInitialOutcomeDimensions();
if(c.matrix.priorityExists){
this.totalHeadingWidth+=c.priorityWidth;
}
if(c.matrix.scoreExists){
this.totalHeadingWidth+=c.priorityWidth;
}
if(c.matrix.contradictionsExist){
this.totalHeadingWidth+=this.topRightTop.contradictionCol.widthWithBorder;
}
if(c.matrix.outcomesExist){
this.totalHeadingWidth+=outcomesWidth;
}
this.setWidths(0);
},setWidths:function(_3a3){
var c=curam.matrix.Constants.container;
this.totalHeadingWidth=Math.max(1,this.totalHeadingWidth+_3a3);
this.width=Math.max(1,this.totalHeadingWidth>c.maxTopRightWidth?c.maxTopRightWidth:this.totalHeadingWidth);
c.cssText.append(".matrix-container .right-eval{width:").append(this.totalHeadingWidth).append("px;}.matrix-container .top-right-eval{width:").append(this.width).append("px;}");
},setDefaultPriorityDimensions:function(){
var c=curam.matrix.Constants.container;
c.priorityWidth=c.tempDivs.priorityHeading.offsetWidth;
var _3a4=c.priorityWidth-curam.matrix.Constants.MATRIX_BORDER_SIZE;
var _3a5=c.tempDivs.priVal;
var _3a6=_3a4-dojo.style(_3a5,"marginLeft")-dojo.style(_3a5,"marginRight")-dojo.style(_3a5,"borderLeft")-dojo.style(_3a5,"borderRight")-dojo.style(_3a5,"paddingLeft")-dojo.style(_3a5,"paddingRight");
var _3a7=_3a6-c.inputBorderWidth-4;
c.cssText.append(".matrix-container .pri-col-eval{width:").append(_3a4).append("px;}").append(".matrix-container .pri-val-eval{width:").append(_3a6).append("px;}").append(".matrix-container .pri-input-eval{width:").append(_3a7).append("px;}");
},setDefaultCombinationDimensions:function(){
var c=curam.matrix.Constants.container;
var cell=c.tempDivs.cell;
var _3a8=c.tempDivs.cellInput;
c.cellHeight=c.reducedAnswHeight;
c.cellWidth=curam.matrix.Constants.COMBINATION_CELL_WIDTH;
c.cboxWidth=_3a8.offsetWidth;
c.cboxHeight=_3a8.clientHeight;
c.cboxOffsetDiff=_3a8.offsetWidth-_3a8.clientWidth;
var top=(c.cellHeight-c.cboxHeight-c.cboxOffsetDiff)/2;
var _3a9=(c.fullAnswerHeight+3-c.cboxHeight-c.cboxOffsetDiff)/2;
var left=(c.cellWidth-c.cboxWidth-c.cboxOffsetDiff)/2;
if(dojo.isFF){
left+=2;
}
c.cssText.append(".matrix-container .cbox-eval{left:").append(left).append("px;top:").append(top).append("px;}");
c.cssText.append(".matrix-container .cbox-eval-with-menu{left:").append(left).append("px;top:").append(_3a9).append("px;}");
c.cssText.append(".matrix-container .cell-first-row .cbox-eval{").append("top:").append(top).append("px;}");
},setInitialContradictionDimensions:function(){
if(this.container.matrix.contradictionsExist){
var _3aa=this.topRightTop.contradictionCol.combinationCount;
var _3ab=(_3aa*curam.matrix.Constants.COMBINATION_CELL_WIDTH)+((_3aa-1)*curam.matrix.Constants.MATRIX_BORDER_SIZE);
this.topRightTop.contradictionCol.setWidth(_3ab);
}
},setInitialOutcomeDimensions:function(){
var _3ac=0,_3ad,_3ae,_3af,_3b0,_3b1,left;
if(this.container.matrix.outcomesExist){
var _3b2=this.topRightTop.outcomeCols;
for(var i=0;i<_3b2.count;i++){
_3ad=_3b2.getObjectByIndex(i);
_3af=_3ad.columns.count;
_3b0=(_3af*curam.matrix.Constants.COMBINATION_CELL_WIDTH)+((_3af-1)*curam.matrix.Constants.MATRIX_BORDER_SIZE);
_3ae=_3b0;
_3b1=curam.matrix.Constants.COMBINATION_CELL_WIDTH;
_3ac+=_3ae+curam.matrix.Constants.MATRIX_BORDER_SIZE;
_3ad.setWidth(_3ad.outId,_3ae);
}
}
return _3ac;
},addPriorityColumn:function(){
this.topRightTop.addPriority();
this.topRightBottom.addPriority();
this.setWidths(curam.matrix.Constants.container.priorityWidth);
},addScoreColumn:function(){
this.topRightTop.addScore();
this.topRightBottom.addScore();
this.setWidths(curam.matrix.Constants.container.priorityWidth);
},addContradictionColumn:function(){
this.topRightTop.addContradiction();
this.topRightBottom.addContradiction();
},addOutcomeColumn:function(_3b3){
this.topRightBottom.addOutcomeColumn(_3b3);
return this.topRightTop.addOutcomeColumn(_3b3);
},deletePriorityColumn:function(){
this.topRightTop.deletePriorityColumn();
this.topRightBottom.deletePriorityColumn();
},deleteScoreColumn:function(){
this.topRightTop.deleteScoreColumn();
this.topRightBottom.deleteScoreColumn();
},deleteContradictionColumn:function(){
this.topRightTop.deleteContradictionColumn();
this.topRightBottom.deleteContradictionColumn();
},deleteOutcomeColumn:function(id){
this.topRightTop.deleteOutcomeColumn(id);
this.topRightBottom.deleteOutcomeColumn(id);
}});
});
},"dijit/a11y":function(){
define("dijit/a11y",["dojo/_base/array","dojo/_base/config","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-style","dojo/_base/sniff","./_base/manager","."],function(_3b4,_3b5,_3b6,dom,_3b7,_3b8,has,_3b9,_3ba){
var _3bb=(_3ba._isElementShown=function(elem){
var s=_3b8.get(elem);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(_3b7.get(elem,"type")!="hidden");
});
_3ba.hasDefaultTabStop=function(elem){
switch(elem.nodeName.toLowerCase()){
case "a":
return _3b7.has(elem,"href");
case "area":
case "button":
case "input":
case "object":
case "select":
case "textarea":
return true;
case "iframe":
var body;
try{
var _3bc=elem.contentDocument;
if("designMode" in _3bc&&_3bc.designMode=="on"){
return true;
}
body=_3bc.body;
}
catch(e1){
try{
body=elem.contentWindow.document.body;
}
catch(e2){
return false;
}
}
return body&&(body.contentEditable=="true"||(body.firstChild&&body.firstChild.contentEditable=="true"));
default:
return elem.contentEditable=="true";
}
};
var _3bd=(_3ba.isTabNavigable=function(elem){
if(_3b7.get(elem,"disabled")){
return false;
}else{
if(_3b7.has(elem,"tabIndex")){
return _3b7.get(elem,"tabIndex")>=0;
}else{
return _3ba.hasDefaultTabStop(elem);
}
}
});
_3ba._getTabNavigable=function(root){
var _3be,last,_3bf,_3c0,_3c1,_3c2,_3c3={};
function _3c4(node){
return node&&node.tagName.toLowerCase()=="input"&&node.type&&node.type.toLowerCase()=="radio"&&node.name&&node.name.toLowerCase();
};
var _3c5=function(_3c6){
for(var _3c7=_3c6.firstChild;_3c7;_3c7=_3c7.nextSibling){
if(_3c7.nodeType!=1||(has("ie")<=9&&_3c7.scopeName!=="HTML")||!_3bb(_3c7)){
continue;
}
if(_3bd(_3c7)){
var _3c8=_3b7.get(_3c7,"tabIndex");
if(!_3b7.has(_3c7,"tabIndex")||_3c8==0){
if(!_3be){
_3be=_3c7;
}
last=_3c7;
}else{
if(_3c8>0){
if(!_3bf||_3c8<_3c0){
_3c0=_3c8;
_3bf=_3c7;
}
if(!_3c1||_3c8>=_3c2){
_3c2=_3c8;
_3c1=_3c7;
}
}
}
var rn=_3c4(_3c7);
if(_3b7.get(_3c7,"checked")&&rn){
_3c3[rn]=_3c7;
}
}
if(_3c7.nodeName.toUpperCase()!="SELECT"){
_3c5(_3c7);
}
}
};
if(_3bb(root)){
_3c5(root);
}
function rs(node){
return _3c3[_3c4(node)]||node;
};
return {first:rs(_3be),last:rs(last),lowest:rs(_3bf),highest:rs(_3c1)};
};
_3ba.getFirstInTabbingOrder=function(root){
var _3c9=_3ba._getTabNavigable(dom.byId(root));
return _3c9.lowest?_3c9.lowest:_3c9.first;
};
_3ba.getLastInTabbingOrder=function(root){
var _3ca=_3ba._getTabNavigable(dom.byId(root));
return _3ca.last?_3ca.last:_3ca.highest;
};
return {hasDefaultTabStop:_3ba.hasDefaultTabStop,isTabNavigable:_3ba.isTabNavigable,_getTabNavigable:_3ba._getTabNavigable,getFirstInTabbingOrder:_3ba.getFirstInTabbingOrder,getLastInTabbingOrder:_3ba.getLastInTabbingOrder};
});
},"curam/matrix/Outcome":function(){
define("curam/matrix/Outcome",["dijit","dojo","dojox"],function(_3cb,dojo,_3cc){
dojo.provide("curam.matrix.Outcome");
dojo.declare("curam.matrix.Outcome",null,{constructor:function(node){
this.node=node;
this.rows=new curam.ListMap();
var _3cd=this.node.childNodes;
for(var i=0;i<_3cd.length;i++){
if(_3cd[i].nodeType==1){
this.rows.add(_3cd[i].id,new curam.matrix.OutcomeRow(_3cd[i]));
}
}
}});
});
},"curam/matrix/validation/DefaultCombinationValidator":function(){
define("curam/matrix/validation/DefaultCombinationValidator",["dijit","dojo","dojox"],function(_3ce,dojo,_3cf){
dojo.provide("curam.matrix.validation.DefaultCombinationValidator");
dojo.declare("curam.matrix.validation.DefaultCombinationValidator",curam.matrix.validation.DefaultValidator,{requiresRefresh:true,allValidators:[],allBitsets:[],state:{singleWarningActive:false,duplicateWarningActive:false,questionWarningActive:false,errorBitset1:null,errorBitset2:null,errorActive:false,warningActive:false},constructor:function(_3d0,opts){
this.container=_3d0;
if(opts){
dojo.mixin(this,opts);
}
},_registerValidator:function(_3d1){
for(var _3d2=0;_3d2<this.allValidators.length;_3d2++){
if(this.allValidators[_3d2].declaredClass==_3d1.declaredClass){
this.allValidators[_3d2]=_3d1;
return;
}
}
this.allValidators.push(_3d1);
},_checkRefresh:function(){
if(!this.inRefresh&&this.requiresRefresh){
this.container.matrix.refreshCombinationValidators();
this.requiresRefresh=false;
return true;
}
return false;
},_createBitset:function(_3d3,arr){
var _3d4=arr[_3d3]=new curam.util.BitSet();
_3d4.colNum=_3d3;
_3d4.owner=this;
_3d4.inputs=[];
this.allBitsets.push(_3d4);
return _3d4;
},_deleteBitset:function(_3d5){
for(var _3d6=0;_3d6<this.allBitsets.length;_3d6++){
if(this.allBitsets[_3d6]==_3d5){
this.allBitsets.splice(_3d6,1);
break;
}
}
},_deleteBitsets:function(_3d7){
for(var _3d8=0;_3d8<this.allBitsets.length;_3d8++){
if(this.allBitsets[_3d8]&&_3d7[this.allBitsets[_3d8].id]){
this.allBitsets.splice(_3d8,1);
_3d8--;
}
}
},_initCheckbox:function(_3d9,_3da){
if(typeof (_3d9.bitsetId)=="undefined"||_3d9.bitsetId==null){
_3d9.bitsetId=_3da.max+1;
_3d9.bitsetOwner=_3da.id;
_3da.inputs[_3da.max+1]=_3d9;
_3d9.colNum=_3da.colNum;
}
},_validateOne:function(_3db){
return true;
},_validateQuestionCount:function(_3dc,qId){
return true;
},_validateAll:function(){
var _3dd=this.allBitsets;
this.state.duplicateWarningActive=false;
for(var _3de=0;_3de<_3dd.length-1;_3de++){
for(var _3df=_3de+1;_3df<_3dd.length;_3df++){
if(_3dd[_3de]&&!_3dd[_3de].isClear()&&_3dd[_3de].equals(_3dd[_3df])){
this.state.duplicateWarningActive=true;
this._setErrorBitsets(_3dd[_3de],_3dd[_3df]);
this.currentMsg=this.warningMsg;
return false;
}
}
}
return true;
},_validate:function(_3e0,_3e1,qIds){
var _3e2=this.state.errorBitset1;
var _3e3=this.state.errorBitset2;
this.state.singleWarningActive=this.state.duplicateWarningActive=this.state.questionWarningActive=false;
var _3e4=true;
if(qIds){
_3e4=this._validateQuestionCount(_3e0,qIds);
}
_3e4=_3e4&&(!_3e0||this._validateOne(_3e0))&&this._validateAll();
if(!_3e4){
var _3e5;
if(this.state.singleWarningActive||this.state.questionWarningActive){
_3e5=[this.state.errorBitset1];
}else{
if(this.state.duplicateWarningActive){
_3e5=[this.state.errorBitset1,this.state.errorBitset2];
}
}
if(_3e5){
if(_3e1.bitsetOwner!=_3e5[0].id||(_3e5.length>1&&_3e1.bitsetOwner!=_3e5[1].id)){
_3e1=_3e5[0].inputs[0];
}
this.addWarning(_3e5,_3e1);
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
return _3e4;
},onValid:function(){
},_setErrorBitsets:function(_3e6,_3e7){
var _3e8=(this.state.errorBitset1&&this.state.errorBitset1.id==_3e6.id)||(this.state.errorBitset2&&this.state.errorBitset2.id==_3e6.id);
var _3e9=_3e7?((this.state.errorBitset1&&this.state.errorBitset1.id==_3e7.id)||(this.state.errorBitset2&&this.state.errorBitset2.id==_3e7.id)):false;
if(_3e8&&_3e9){
return false;
}
if(this.isErrorActive()){
this.removeError(this.state.errorBitset1,this.state.errorBitset2);
}else{
if(this.isWarningActive()){
this.removeWarning();
}
}
this.state.errorBitset1=_3e6;
this.state.errorBitset2=_3e7;
return true;
},addWarning:function(_3ea,_3eb){
if(this.isErrorActive()&&(this.state.errorBitset1.colNum!=_3ea[0].colNum||(!this.state.errorBitset2||this.state.errorBitset2.colNum!=_3ea[1].colNum))){
this.removeError(this.state.errorBitset1,this.state.errorBitset2);
}
var ac=dojo.addClass;
var _3ec=this;
var _3ed=function(e){
if(_3ec.isWarningActive()){
_3ec.state.timeout=setTimeout(function(){
_3ec.addError();
},10);
}
};
var _3ee=function(e){
if(!_3ec.state.timeout||(typeof (e.target.colNum)=="undefined"||!_3ec.isWarningActive())){
return true;
}
if(_3ec.isInputPartOfValidation(e.target)){
clearTimeout(_3ec.state.timeout);
_3ec.state.timeout=null;
}else{
dojo.stopEvent(e);
return false;
}
};
this.state.allowableFields=[];
var _3ef=-1,_3f0=-1;
var _3f1;
if(this.state.questionWarningActive){
var _3f2=_3ea[0].inputs;
for(var _3f3=0;_3f3<_3f2.length;_3f3++){
if(_3f2[_3f3].checked&&_3f2[_3f3].qId==this.state.questionWarningActive){
if(_3ef==-1){
_3ef=_3f3;
}else{
if(_3f3>_3f0){
_3f0=_3f3;
break;
}
}
}else{
if(_3f0!=-1){
break;
}
}
}
_3f0=Math.min(_3f0,_3f2.length);
_3f1=function(_3f4,pos){
if(_3f4.checked&&pos>=_3ef&&pos<=_3f0){
return true;
}
return false;
};
}else{
_3ef=0;
_3f0=_3ea[0].inputs.length-1;
_3f1=function(){
return true;
};
}
this.state.firstInput=_3ef;
this.state.lastInput=_3f0;
for(var _3f5=0;_3f5<_3ea.length;_3f5++){
var _3f2=_3ea[_3f5].inputs;
ac(_3f2[_3ef].parentNode,"combination-validation-top");
if(_3f1(_3f2[_3ef],_3ef)){
this.state.allowableFields.push(_3f2[_3ef].id);
}
for(var _3f3=_3ef+1;_3f3<_3f0;_3f3++){
if(_3f1(_3f2[_3f3],_3f3)&&_3f2[_3f3]&&_3f2[_3f3].id){
this.state.allowableFields.push(_3f2[_3f3].id);
}
ac(_3f2[_3f3].parentNode,"combination-validation");
}
ac(_3f2[_3f0].parentNode,"combination-validation-bottom");
if(_3f1(_3f2[_3f0],_3f0)){
this.state.allowableFields.push(_3f2[_3f0].id);
}
for(var _3f3=0;_3f3<_3f2.length;_3f3++){
if(!_3f2[_3f3]["validationListenersAdded"]){
_3f2[_3f3]["validationListenersAdded"]=true;
dojo.connect(_3f2[_3f3],"onblur",_3ed);
dojo.connect(_3f2[_3f3],"onfocus",_3ee);
}
}
}
this.setWarningActive(true);
this.focusElement=this.state.activeChangedInput=_3eb?_3eb:this.state.allowableFields[0];
this.container.activateWarning(this.currentMsg);
},addError:function(){
if(!this.isWarningActive()){
return;
}
var _3f6;
if(this.state.singleWarningActive||this.state.questionWarningActive){
_3f6=[this.state.errorBitset1];
}else{
if(this.state.duplicateWarningActive){
_3f6=[this.state.errorBitset1,this.state.errorBitset2];
}
}
if(_3f6){
this.cancelInputTabs();
var _3f7=_3f6[0].inputs[0];
var _3f8=_3f6.length>1?1:0;
var _3f9=_3f6[_3f8].inputs[_3f6[_3f8].inputs.length-1];
this.setErrorActive(true);
this.setWarningActive(false);
this.container.matrix.disableInputs(_3f7,_3f9,"combination");
dojo.publish("/disableInput",null);
var repc=cm.replaceClass;
var _3fa=this;
this.state.activeChangedInput.focus();
this.container.activateError(this.currentMsg);
}
},removeError:function(_3fb,_3fc){
if(!_3fb&&!_3fc){
return;
}
var _3fd=this.state.errorBitset2?[_3fb,_3fc]:[_3fb];
this._changeClassesFromColumn(_3fd,true);
if(_3fb.colNum==this.state.errorBitset1.colNum){
this.state.errorBitset1=null;
}
if(_3fc&&this.state.errorBitset2&&_3fc.colNum==this.state.errorBitset2.colNum){
this.state.errorBitset2=null;
}
this.setErrorActive(false);
for(var _3fe=0;_3fe<_3fd.length;_3fe++){
if(_3fd[_3fe].owner!=this){
_3fd[_3fe].owner.setErrorActive(false);
}
}
this.state.activeChangedInput=null;
this.clearInputTabListeners();
this.container.deactivateValidation();
},removeWarning:function(){
if(!this.state.errorBitset1&&!this.state.errorBitset2){
return;
}
var _3ff=[this.state.errorBitset1];
if(this.state.errorBitset2){
_3ff[1]=this.state.errorBitset2;
}
this._changeClassesFromColumn(_3ff,true);
this.state.errorBitset1=this.state.errorBitset2=null;
this.setWarningActive(false);
this.state.activeChangedInput=null;
this.container.deactivateValidation();
},_changeClassesFromColumn:function(_400,_401){
var fn;
if(_401){
fn=dojo.removeClass;
}else{
fn=dojo.addClass;
}
var _402=this.state.firstInput;
var _403=this.state.lastInput;
for(var _404=0;_404<_400.length;_404++){
if(!this.bitsets){
continue;
}
var _405=_400[_404].inputs;
fn(_405[_402].parentNode,"combination-validation-top");
for(var _406=_402+1;_406<_403;_406++){
fn(_405[_406].parentNode,"combination-validation");
}
fn(_405[_403].parentNode,"combination-validation-bottom");
}
},isInputPartOfValidation:function(_407){
if(!_407.bitsetOwner||!this.isErrorActive()&&!this.isWarningActive()||!this.state.allowableFields){
return false;
}
if((this.state.errorBitset1&&this.state.errorBitset1.id==_407.bitsetOwner)||(this.state.errorBitset2&&this.state.errorBitset2.id==_407.bitsetOwner)){
return true;
}
return false;
}});
});
},"curam/matrix/validation/PriorityValidator":function(){
define("curam/matrix/validation/PriorityValidator",["dijit","dojo","dojox"],function(_408,dojo,_409){
dojo.provide("curam.matrix.validation.PriorityValidator");
dojo.declare("curam.matrix.validation.PriorityValidator",curam.matrix.validation.DefaultValidator,{constructor:function(_40a){
this.setErrorActive(false);
this.activeChangedInput=null;
this.activeExistingInput=null;
this.focusElement=null;
this.container=_40a;
this.duplicateMsg=_40a.i18nMsgs.duplicateMsg;
},validatePriority:function(e){
if(this.checkForTabShiftKey(e)){
return;
}
var id=e.target.id;
var _40b=dojo.byId(id).value;
this.unvalidatePriorities();
if(_40b==""){
return;
}
var _40c=e.target.priorityGroup.priorities;
var _40d=e.target.priority;
for(var i=0;i<_40c.count;i++){
if(_40d.node.id==_40c.getObjectByIndex(i).node.id){
continue;
}
var _40e=_40c.getObjectByIndex(i);
if(_40b==_40e.input.value){
this.validatePriorities(_40d,_40e,this.duplicateMsg);
this.focusElement=_40d.input;
this.state.allowableFields=[_40d.input.id,_40e.input.id];
this.addFocusListener([_40d.input,_40e.input]);
var _40f=this;
setTimeout(function(){
_40f.focusElement.focus();
},10);
return;
}
}
},validatePriorities:function(_410,_411,_412){
dojo.addClass(_410.validation,"validateWarn");
dojo.addClass(_411.validation,"validateWarn");
this.activeChangedInput=_410;
this.activeExistingInput=_411;
this.setWarningActive(true);
this.container.activateWarning(_412);
},unvalidatePriorities:function(){
if(!this.isValidationActive()){
return;
}
var rc=dojo.removeClass;
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
var _413=e.target.parentNode.id;
if(_413==this.activeChangedInput.validation.id||_413==this.activeExistingInput.validation.id){
var _414=this;
this.timeout=setTimeout(function(){
_414.addError(e);
},10);
}
}
},addError:function(e){
dojo.addClass(this.activeChangedInput.validation,"validateError");
dojo.addClass(this.activeExistingInput.validation,"validateError");
this.container.activateError(this.duplicateMsg);
this.container.matrix.disableInputs(this.activeChangedInput.validation,this.activeExistingInput.validation);
dojo.publish("/disableInput",[this.activeChangedInput.input,this.activeExistingInput.input]);
this.focusElement=e.target;
this.cancelInputTabs();
var _415=this;
setTimeout(function(){
_415.focusElement.focus();
},10);
this.setWarningActive(false);
this.setErrorActive(true);
}});
});
},"dijit/Menu":function(){
define("dijit/Menu",["require","dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window","dojo/window","./popup","./DropDownMenu","dojo/ready"],function(_416,_417,_418,_419,dom,_41a,_41b,_41c,_41d,keys,lang,on,has,win,_41e,pm,_41f,_420){
if(!_41d.isAsync){
_420(0,function(){
var _421=["dijit/MenuItem","dijit/PopupMenuItem","dijit/CheckedMenuItem","dijit/MenuSeparator"];
_416(_421);
});
}
return _418("dijit.Menu",_41f,{constructor:function(){
this._bindings=[];
},targetNodeIds:[],contextMenuForWindow:false,leftClickToOpen:false,refocus:true,postCreate:function(){
if(this.contextMenuForWindow){
this.bindDomNode(win.body());
}else{
_417.forEach(this.targetNodeIds,this.bindDomNode,this);
}
this.inherited(arguments);
},_iframeContentWindow:function(_422){
return _41e.get(this._iframeContentDocument(_422))||this._iframeContentDocument(_422)["__parent__"]||(_422.name&&win.doc.frames[_422.name])||null;
},_iframeContentDocument:function(_423){
return _423.contentDocument||(_423.contentWindow&&_423.contentWindow.document)||(_423.name&&win.doc.frames[_423.name]&&win.doc.frames[_423.name].document)||null;
},bindDomNode:function(node){
node=dom.byId(node);
var cn;
if(node.tagName.toLowerCase()=="iframe"){
var _424=node,_425=this._iframeContentWindow(_424);
cn=win.withGlobal(_425,win.body);
}else{
cn=(node==win.body()?win.doc.documentElement:node);
}
var _426={node:node,iframe:_424};
_41a.set(node,"_dijitMenu"+this.id,this._bindings.push(_426));
var _427=lang.hitch(this,function(cn){
return [on(cn,this.leftClickToOpen?"click":"contextmenu",lang.hitch(this,function(evt){
_419.stop(evt);
this._scheduleOpen(evt.target,_424,{x:evt.pageX,y:evt.pageY});
})),on(cn,"keydown",lang.hitch(this,function(evt){
if(evt.shiftKey&&evt.keyCode==keys.F10){
_419.stop(evt);
this._scheduleOpen(evt.target,_424);
}
}))];
});
_426.connects=cn?_427(cn):[];
if(_424){
_426.onloadHandler=lang.hitch(this,function(){
var _428=this._iframeContentWindow(_424);
cn=win.withGlobal(_428,win.body);
_426.connects=_427(cn);
});
if(_424.addEventListener){
_424.addEventListener("load",_426.onloadHandler,false);
}else{
_424.attachEvent("onload",_426.onloadHandler);
}
}
},unBindDomNode:function(_429){
var node;
try{
node=dom.byId(_429);
}
catch(e){
return;
}
var _42a="_dijitMenu"+this.id;
if(node&&_41a.has(node,_42a)){
var bid=_41a.get(node,_42a)-1,b=this._bindings[bid],h;
while(h=b.connects.pop()){
h.remove();
}
var _42b=b.iframe;
if(_42b){
if(_42b.removeEventListener){
_42b.removeEventListener("load",b.onloadHandler,false);
}else{
_42b.detachEvent("onload",b.onloadHandler);
}
}
_41a.remove(node,_42a);
delete this._bindings[bid];
}
},_scheduleOpen:function(_42c,_42d,_42e){
if(!this._openTimer){
this._openTimer=setTimeout(lang.hitch(this,function(){
delete this._openTimer;
this._openMyself({target:_42c,iframe:_42d,coords:_42e});
}),1);
}
},_openMyself:function(args){
var _42f=args.target,_430=args.iframe,_431=args.coords;
if(_431){
if(_430){
var ifc=_41b.position(_430,true),_432=this._iframeContentWindow(_430),_433=win.withGlobal(_432,"_docScroll",dojo);
var cs=_41c.getComputedStyle(_430),tp=_41c.toPixelValue,left=(has("ie")&&has("quirks")?0:tp(_430,cs.paddingLeft))+(has("ie")&&has("quirks")?tp(_430,cs.borderLeftWidth):0),top=(has("ie")&&has("quirks")?0:tp(_430,cs.paddingTop))+(has("ie")&&has("quirks")?tp(_430,cs.borderTopWidth):0);
_431.x+=ifc.x+left-_433.x;
_431.y+=ifc.y+top-_433.y;
}
}else{
_431=_41b.position(_42f,true);
_431.x+=10;
_431.y+=10;
}
var self=this;
var _434=this._focusManager.get("prevNode");
var _435=this._focusManager.get("curNode");
var _436=!_435||(dom.isDescendant(_435,this.domNode))?_434:_435;
function _437(){
if(self.refocus&&_436){
_436.focus();
}
pm.close(self);
};
pm.open({popup:this,x:_431.x,y:_431.y,onExecute:_437,onCancel:_437,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){
this.inherited("_onBlur",arguments);
pm.close(this);
};
},uninitialize:function(){
_417.forEach(this._bindings,function(b){
if(b){
this.unBindDomNode(b.node);
}
},this);
this.inherited(arguments);
}});
});
},"curam/StringBuffer":function(){
define("curam/StringBuffer",[],function(){
var _438=dojo.declare("curam.StringBuffer",null,{constructor:function(){
this.buffer=[];
},append:function append(_439){
this.buffer.push(_439);
return this;
},toString:function toString(){
return this.buffer.join("");
}});
return _438;
});
},"dijit/MenuSeparator":function(){
require({cache:{"url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>"}});
define("dijit/MenuSeparator",["dojo/_base/declare","dojo/dom","./_WidgetBase","./_TemplatedMixin","./_Contained","dojo/text!./templates/MenuSeparator.html"],function(_43a,dom,_43b,_43c,_43d,_43e){
return _43a("dijit.MenuSeparator",[_43b,_43c,_43d],{templateString:_43e,buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.domNode,false);
},isFocusable:function(){
return false;
}});
});
},"dijit/place":function(){
define("dijit/place",["dojo/_base/array","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/window","dojo/window",".","dojo/_base/lang"],function(_43f,_440,_441,_442,win,_443,_444,lang){
function _445(node,_446,_447,_448){
var view=_443.getBox();
if(!node.parentNode||String(node.parentNode.tagName).toLowerCase()!="body"){
win.body().appendChild(node);
}
var best=null;
_43f.some(_446,function(_449){
var _44a=_449.corner;
var pos=_449.pos;
var _44b=0;
var _44c={w:{"L":view.l+view.w-pos.x,"R":pos.x-view.l,"M":view.w}[_44a.charAt(1)],h:{"T":view.t+view.h-pos.y,"B":pos.y-view.t,"M":view.h}[_44a.charAt(0)]};
if(_447){
var res=_447(node,_449.aroundCorner,_44a,_44c,_448);
_44b=typeof res=="undefined"?0:res;
}
var _44d=node.style;
var _44e=_44d.display;
var _44f=_44d.visibility;
if(_44d.display=="none"){
_44d.visibility="hidden";
_44d.display="";
}
var mb=_440.getMarginBox(node);
_44d.display=_44e;
_44d.visibility=_44f;
var _450={"L":pos.x,"R":pos.x-mb.w,"M":Math.max(view.l,Math.min(view.l+view.w,pos.x+(mb.w>>1))-mb.w)}[_44a.charAt(1)],_451={"T":pos.y,"B":pos.y-mb.h,"M":Math.max(view.t,Math.min(view.t+view.h,pos.y+(mb.h>>1))-mb.h)}[_44a.charAt(0)],_452=Math.max(view.l,_450),_453=Math.max(view.t,_451),endX=Math.min(view.l+view.w,_450+mb.w),endY=Math.min(view.t+view.h,_451+mb.h),_454=endX-_452,_455=endY-_453;
_44b+=(mb.w-_454)+(mb.h-_455);
var l=_440.isBodyLtr();
if(lang.exists("curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm")&&curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm==true){
if((_44a.charAt(0)=="T"||(_44a.charAt(1)=="L"&&l)||(_44a.charAt(1)=="R"&&!l))&&_44b>0){
_44b=mb.w+mb.h;
}
}
if(best==null||_44b<best.overflow){
best={corner:_44a,aroundCorner:_449.aroundCorner,x:_452,y:_453,w:_454,h:_455,overflow:_44b,spaceAvailable:_44c};
}
return !_44b;
});
if(best.overflow&&_447){
_447(node,best.aroundCorner,best.corner,best.spaceAvailable,_448);
}
var l=_440.isBodyLtr(),s=node.style;
s.top=best.y+"px";
s[l?"left":"right"]=(l?best.x:view.w-best.x-best.w)+"px";
s[l?"right":"left"]="auto";
return best;
};
return (_444.place={at:function(node,pos,_456,_457){
var _458=_43f.map(_456,function(_459){
var c={corner:_459,pos:{x:pos.x,y:pos.y}};
if(_457){
c.pos.x+=_459.charAt(1)=="L"?_457.x:-_457.x;
c.pos.y+=_459.charAt(0)=="T"?_457.y:-_457.y;
}
return c;
});
return _445(node,_458);
},around:function(node,_45a,_45b,_45c,_45d){
var _45e=(typeof _45a=="string"||"offsetWidth" in _45a)?_440.position(_45a,true):_45a;
if(_45a.parentNode){
var _45f=_441.getComputedStyle(_45a).position=="absolute";
var _460=_45a.parentNode;
while(_460&&_460.nodeType==1&&_460.nodeName!="BODY"){
var _461=_440.position(_460,true),pcs=_441.getComputedStyle(_460);
if(/relative|absolute/.test(pcs.position)){
_45f=false;
}
if(!_45f&&/hidden|auto|scroll/.test(pcs.overflow)){
var _462=Math.min(_45e.y+_45e.h,_461.y+_461.h);
var _463=Math.min(_45e.x+_45e.w,_461.x+_461.w);
_45e.x=Math.max(_45e.x,_461.x);
_45e.y=Math.max(_45e.y,_461.y);
_45e.h=_462-_45e.y;
_45e.w=_463-_45e.x;
}
if(pcs.position=="absolute"){
_45f=true;
}
_460=_460.parentNode;
}
}
var x=_45e.x,y=_45e.y,_464="w" in _45e?_45e.w:(_45e.w=_45e.width),_465="h" in _45e?_45e.h:(_442.deprecated("place.around: dijit.place.__Rectangle: { x:"+x+", y:"+y+", height:"+_45e.height+", width:"+_464+" } has been deprecated.  Please use { x:"+x+", y:"+y+", h:"+_45e.height+", w:"+_464+" }","","2.0"),_45e.h=_45e.height);
var _466=[];
function push(_467,_468){
_466.push({aroundCorner:_467,corner:_468,pos:{x:{"L":x,"R":x+_464,"M":x+(_464>>1)}[_467.charAt(1)],y:{"T":y,"B":y+_465,"M":y+(_465>>1)}[_467.charAt(0)]}});
};
_43f.forEach(_45b,function(pos){
var ltr=_45c;
switch(pos){
case "above-centered":
push("TM","BM");
break;
case "below-centered":
push("BM","TM");
break;
case "after-centered":
ltr=!ltr;
case "before-centered":
push(ltr?"ML":"MR",ltr?"MR":"ML");
break;
case "after":
ltr=!ltr;
case "before":
push(ltr?"TL":"TR",ltr?"TR":"TL");
push(ltr?"BL":"BR",ltr?"BR":"BL");
break;
case "below-alt":
ltr=!ltr;
case "below":
push(ltr?"BL":"BR",ltr?"TL":"TR");
push(ltr?"BR":"BL",ltr?"TR":"TL");
break;
case "above-alt":
ltr=!ltr;
case "above":
push(ltr?"TL":"TR",ltr?"BL":"BR");
push(ltr?"TR":"TL",ltr?"BR":"BL");
break;
default:
push(pos.aroundCorner,pos.corner);
}
});
var _469=_445(node,_466,_45d,{w:_464,h:_465});
_469.aroundNodePos=_45e;
return _469;
}});
});
},"curam/matrix/Contradiction":function(){
define("curam/matrix/Contradiction",["dijit","dojo","dojox"],function(_46a,dojo,_46b){
dojo.provide("curam.matrix.Contradiction");
dojo.declare("curam.matrix.Contradiction",null,{constructor:function(node){
this.node=node;
this.rows=new curam.ListMap();
var _46c=this.node.childNodes;
for(var i=0;i<_46c.length;i++){
if(_46c[i].nodeType==1){
this.rows.add(_46c[i].id,new curam.matrix.ContradictionRow(_46c[i]));
}
}
}});
});
},"curam/matrix/OutcomeRow":function(){
define("curam/matrix/OutcomeRow",["dijit","dojo","dojox"],function(_46d,dojo,_46e){
dojo.provide("curam.matrix.OutcomeRow");
dojo.declare("curam.matrix.OutcomeRow",null,{constructor:function(node){
this.node=node;
this.cells=new curam.ListMap();
var _46f=this.node.childNodes;
for(var i=0;i<_46f.length;i++){
if(_46f[i].nodeType==1){
this.cells.add(_46f[i].id,new curam.matrix.OutcomeCell(_46f[i]));
}
}
}});
});
},"dijit/DropDownMenu":function(){
require({cache:{"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n"}});
define("dijit/DropDownMenu",["dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/text!./templates/Menu.html","./_OnDijitClickMixin","./_MenuBase"],function(_470,_471,keys,_472,_473,_474){
return _470("dijit.DropDownMenu",[_474,_473],{templateString:_472,baseClass:"dijitMenu",postCreate:function(){
var l=this.isLeftToRight();
this._openSubMenuKey=l?keys.RIGHT_ARROW:keys.LEFT_ARROW;
this._closeSubMenuKey=l?keys.LEFT_ARROW:keys.RIGHT_ARROW;
this.connectKeyNavHandlers([keys.UP_ARROW],[keys.DOWN_ARROW]);
},_onKeyPress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
switch(evt.charOrCode){
case this._openSubMenuKey:
this._moveToPopup(evt);
_471.stop(evt);
break;
case this._closeSubMenuKey:
if(this.parentMenu){
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
}else{
_471.stop(evt);
}
break;
}
}});
});
},"curam/matrix/OutcomeCell":function(){
define("curam/matrix/OutcomeCell",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_475,dojo,_476){
dojo.provide("curam.matrix.OutcomeCell");
dojo.require("curam.matrix.Constants");
dojo.declare("curam.matrix.OutcomeCell",null,{constructor:function(node){
this.node=node;
this.input=dojo.query("> :first-child",this.node)[0];
this.button=cm.nextSibling(this.input);
this.initListener();
this.widgetCreated=false;
},initListener:function(){
if(this.button&&!dojo.hasClass(this.button,"hidden-image")){
var _477=this;
curam.matrix.Constants.container.matrix.addLazyWidget(this,"cells");
this.lazyListener=function(_478){
if(!curam.matrix.Constants.container.matrix.createLazyWidgets("cells")){
dojo.disconnect(_477.button._conn);
return;
}
if(!_477.widget){
return;
}
_477.widget._toggleMenu("CombinationOptions",_478);
window.activeMenuID=_477.node.id;
_475.byId("CombinationOptions")._openMyself(curam.matrix.Constants.container.getFakeEvent(_477.widget.domNode));
};
this.button._conn=dojo.connect(this.button,"onclick",this,"lazyListener");
}
},createWidget:function(_479){
var c=curam.matrix.Constants.container;
if(this.widgetCreated){
return;
}
if(!this.button.cellId){
this.button.cellId=this.node.id;
}
this.widget=new curam.widget.CombinationButton({menuId:"CombinationOptions"},this.button);
this.widgetCreated=true;
window.activeMenuID=this.node.id;
dojo.disconnect(this.button._conn);
},setButtonClass:function(_47a){
if(!this.button){
this.button=dojo.create("div");
this.node.appendChild(this.button);
this.button._conn=dojo.connect(this.button,"onclick",this,"createWidget");
}
cm.setClass(this.button,_47a);
if(!this.widgetCreated&&_47a=="image"){
this.initListener();
}
},adjustFirstRowClass:function(_47b){
var _47c=dojo.attr(this.node,"class");
if(_47c.indexOf("ans-eval-with-menu")==-1){
_47c=_47c.replace("ans-eval","ans-eval-with-menu");
cm.setClass(this.node,_47c);
}
_47c=dojo.attr(this.input,"class");
if(_47c.indexOf("cbox-eval-with-menu")==-1){
_47c=_47c.replace("cbox-eval","cbox-eval-with-menu");
cm.setClass(this.input,_47c);
}
}});
});
},"curam/widget/MatrixPopupMenu":function(){
define("curam/widget/MatrixPopupMenu",["dijit","dojo","dojox","dojo/require!dijit/Menu,dijit/MenuSeparator,curam/matrix/Constants"],function(_47d,dojo,_47e){
dojo.provide("curam.widget.MatrixPopupMenu");
dojo.require("dijit.Menu");
dojo.require("dijit.MenuSeparator");
dojo.require("curam.matrix.Constants");
dojo.declare("curam.widget.MatrixPopupMenu",_47d.Menu,{id:"",allMenuItemsDisabled:false,mcontainer:null,leftClickToOpen:true,postCreate:function(){
this.inherited(arguments);
dojo.place(this.domNode,dojo.body());
dojo.style(this.domNode,"display","none");
dojo.addOnLoad(dojo.hitch(this,function(){
if(!this.mcontainer){
this.mcontainer=curam.matrix.Constants.container;
}
dojo.subscribe("/disableMenuItems",this,"setDisableAllItems");
dojo.subscribe("/enableMenuItems",this,"setEnableAllItems");
if(this.mcontainer.matrix&&this.mcontainer.matrix.isValidationActive()){
this.setDisableAllItems();
}
}));
},setButton:function(btn){
this.myParent=btn;
},setDisableAllItems:function(){
this.allMenuItemsDisabled=true;
},setEnableAllItems:function(){
this.allMenuItemsDisabled=false;
},enableAllItems:function(){
var _47f=this.getMenuItems();
for(var i=0;i<_47f.length;i++){
_47f[i].enableItem();
}
},_openMyself:function(_480){
if(curam.matrix.Constants.container.matrix.isValidationActive()){
return;
}
if(!this.allMenuItemsDisabled){
_47d.Menu.prototype._openMyself.call(this,_480);
var _481=_480.target;
setTimeout(dojo.hitch(this,function(){
this.enableAllItems();
this.checkValidations(this.myParent);
this.explodeSrc=_481;
}),2);
}
},checkValidations:function(_482){
var _483=this.getMenuItems();
if(this.id=="OutcomeOptions"){
this.checkOutcomeGroupOptions(_483,_482);
}else{
if(this.id=="AnswerOptions"){
this.checkAnswerOptions(_483,_482);
}else{
if(this.id=="QuestionOptions"){
this.checkQuestionOptions(_483,_482);
}else{
if(this.id=="CombinationOptions"){
this.checkSingleOutcomeOptions(_483,_482);
}
}
}
}
},getMenuItems:function(){
if(!this.menuItems){
this.menuItems=dojo.query("> .dijitMenuItem",this.containerNode).map(_47d.byNode);
dojo.forEach(this.menuItems,dojo.hitch(this,function(item){
this.menuItems[item.id]=item;
}));
}
return this.menuItems;
},checkOutcomeGroupOptions:function(_484,_485){
var _486=this.mcontainer.matrix.hasCopiedCombination();
dojo.forEach(_484,dojo.hitch(this,function(item){
if(item.id=="pasteCombination"&&!_486){
item.set("disabled",true);
}
}));
},checkAnswerOptions:function(_487,_488){
var _489=this.mcontainer.matrix.getQuestionFromAnswerId(this.answerId);
var _48a=_489.ansGroup;
var _48b=_48a.answers.getObjectByKey(this.answerId);
if((_48a.answerCount==1||_48a.answerType==curam.matrix.Constants.ANSWER_TYPE_BOOLEAN)&&_487["deleteAnswer"]){
_487["deleteAnswer"].set("disabled",true);
}
if((_48a.answerType!=curam.matrix.Constants.ANSWER_TYPE_NUMERIC||!_48b.specificValue)&&_487[curam.matrix.Constants.MIN_MAX]){
_487[curam.matrix.Constants.MIN_MAX].set("disabled",true);
}
if((_48a.answerType==curam.matrix.Constants.ANSWER_TYPE_NUMERIC&&_48b.specificValue&&_487["useValue"])||_48a.answerType!=curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
_487["useValue"].set("disabled",true);
}
},checkQuestionOptions:function(_48c,_48d){
var _48e=_48d.id.replace("num-","");
var _48f=this.mcontainer.matrix.bottomLeft.bottomLeftMain.getQuestion(_48e);
if(_48f==null){
return;
}
var _490=(typeof (_48f["answerType"]=="undefined"))?_48f.ansGroup.answerType:_48f.answerType;
if(_48c["addAnswer"]){
if(_490==curam.matrix.Constants.ANSWER_TYPE_BOOLEAN){
_48c["addAnswer"].set("disabled",true);
}else{
if(_490==curam.matrix.Constants.ANSWER_TYPE_CODETABLE&&_48f.ansGroup.answerCount==_48f.getAnswer(1).select.length){
_48c["addAnswer"].set("disabled",true);
}
}
}
},checkSingleOutcomeOptions:function(_491,_492){
var _493;
var _494=this.determineIfContradiction(this.combinationId);
if(_494){
_493=this.determineNumCombsInContradictions();
}else{
_493=this.determineNumCombsInOutcome(_492.id);
}
for(var i=0;i<_491.length;i++){
if(_491[i].id=="deleteCombination"&&_493==1){
_491[i].set("disabled",true);
}
if(_491[i].id=="addMessage"&&!_494){
_491[i].set("disabled",true);
}
}
},determineIfContradiction:function(id){
return (id.indexOf("contr")==0);
},determineNumCombsInContradictions:function(){
return this.mcontainer.matrix.bottomRight.questions.getObjectByIndex(0).getContradictionCount();
},determineNumCombsInOutcome:function(id){
return this.mcontainer.matrix.getOutcome(this.combinationId).rows.getObjectByIndex(0).cells.count;
}});
});
},"dijit/_Widget":function(){
define("dijit/_Widget",["dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/ready","./registry","./_WidgetBase","./_OnDijitClickMixin","./_FocusMixin","dojo/uacss","./hccss"],function(_495,_496,_497,_498,_499,lang,_49a,_49b,_49c,_49d,_49e,_49f){
function _4a0(){
};
function _4a1(_4a2){
return function(obj,_4a3,_4a4,_4a5){
if(obj&&typeof _4a3=="string"&&obj[_4a3]==_4a0){
return obj.on(_4a3.substring(2).toLowerCase(),lang.hitch(_4a4,_4a5));
}
return _4a2.apply(_497,arguments);
};
};
_495.around(_497,"connect",_4a1);
if(_499.connect){
_495.around(_499,"connect",_4a1);
}
var _4a6=_498("dijit._Widget",[_49d,_49e,_49f],{onClick:_4a0,onDblClick:_4a0,onKeyDown:_4a0,onKeyPress:_4a0,onKeyUp:_4a0,onMouseDown:_4a0,onMouseMove:_4a0,onMouseOut:_4a0,onMouseOver:_4a0,onMouseLeave:_4a0,onMouseEnter:_4a0,onMouseUp:_4a0,constructor:function(_4a7){
this._toConnect={};
for(var name in _4a7){
if(this[name]===_4a0){
this._toConnect[name.replace(/^on/,"").toLowerCase()]=_4a7[name];
delete _4a7[name];
}
}
},postCreate:function(){
this.inherited(arguments);
for(var name in this._toConnect){
this.on(name,this._toConnect[name]);
}
delete this._toConnect;
},on:function(type,func){
if(this[this._onMap(type)]===_4a0){
return _497.connect(this.domNode,type.toLowerCase(),this,func);
}
return this.inherited(arguments);
},_setFocusedAttr:function(val){
this._focused=val;
this._set("focused",val);
},setAttribute:function(attr,_4a8){
_499.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(attr,_4a8);
},attr:function(name,_4a9){
if(_496.isDebug){
var _4aa=arguments.callee._ach||(arguments.callee._ach={}),_4ab=(arguments.callee.caller||"unknown caller").toString();
if(!_4aa[_4ab]){
_499.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+_4ab,"","2.0");
_4aa[_4ab]=true;
}
}
var args=arguments.length;
if(args>=2||typeof name==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(name);
}
},getDescendants:function(){
_499.deprecated(this.declaredClass+"::getDescendants() is deprecated. Use getChildren() instead.","","2.0");
return this.containerNode?_49a("[widgetId]",this.containerNode).map(_49c.byNode):[];
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
if(!_499.isAsync){
_49b(0,function(){
var _4ac=["dijit/_base"];
require(_4ac);
});
}
return _4a6;
});
},"dijit/_OnDijitClickMixin":function(){
define("dijit/_OnDijitClickMixin",["dojo/on","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(on,_4ad,keys,_4ae,has,_4af,win){
var _4b0=null;
if(has("ie")){
(function(){
var _4b1=function(evt){
_4b0=evt.srcElement;
};
win.doc.attachEvent("onkeydown",_4b1);
_4af.addOnWindowUnload(function(){
win.doc.detachEvent("onkeydown",_4b1);
});
})();
}else{
win.doc.addEventListener("keydown",function(evt){
_4b0=evt.target;
},true);
}
var _4b2=function(node,_4b3){
if(/input|button/i.test(node.nodeName)){
return on(node,"click",_4b3);
}else{
function _4b4(e){
return (e.keyCode==keys.ENTER||e.keyCode==keys.SPACE)&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey;
};
var _4b5=[on(node,"keypress",function(e){
if(_4b4(e)){
_4b0=e.target;
e.preventDefault();
}
}),on(node,"keyup",function(e){
if(_4b4(e)&&e.target==_4b0){
_4b0=null;
_4b3.call(this,e);
}
}),on(node,"click",function(e){
_4b3.call(this,e);
})];
return {remove:function(){
_4ad.forEach(_4b5,function(h){
h.remove();
});
}};
}
};
return _4ae("dijit._OnDijitClickMixin",null,{connect:function(obj,_4b6,_4b7){
return this.inherited(arguments,[obj,_4b6=="ondijitclick"?_4b2:_4b6,_4b7]);
}});
});
},"dijit/_FocusMixin":function(){
define("dijit/_FocusMixin",["./focus","./_WidgetBase","dojo/_base/declare","dojo/_base/lang"],function(_4b8,_4b9,_4ba,lang){
lang.extend(_4b9,{focused:false,onFocus:function(){
},onBlur:function(){
},_onFocus:function(){
this.onFocus();
},_onBlur:function(){
this.onBlur();
}});
return _4ba("dijit._FocusMixin",null,{_focusManager:_4b8});
});
},"dojo/cache":function(){
define("dojo/cache",["./_base/kernel","./text"],function(dojo,text){
return dojo.cache;
});
},"dijit/_Templated":function(){
define("dijit/_Templated",["./_WidgetBase","./_TemplatedMixin","./_WidgetsInTemplateMixin","dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/_base/kernel"],function(_4bb,_4bc,_4bd,_4be,_4bf,lang,_4c0){
lang.extend(_4bb,{waiRole:"",waiState:""});
return _4bf("dijit._Templated",[_4bc,_4bd],{widgetsInTemplate:false,constructor:function(){
_4c0.deprecated(this.declaredClass+": dijit._Templated deprecated, use dijit._TemplatedMixin and if necessary dijit._WidgetsInTemplateMixin","","2.0");
},_attachTemplateNodes:function(_4c1,_4c2){
this.inherited(arguments);
var _4c3=lang.isArray(_4c1)?_4c1:(_4c1.all||_4c1.getElementsByTagName("*"));
var x=lang.isArray(_4c1)?0:-1;
for(;x<_4c3.length;x++){
var _4c4=(x==-1)?_4c1:_4c3[x];
var role=_4c2(_4c4,"waiRole");
if(role){
_4c4.setAttribute("role",role);
}
var _4c5=_4c2(_4c4,"waiState");
if(_4c5){
_4be.forEach(_4c5.split(/\s*,\s*/),function(_4c6){
if(_4c6.indexOf("-")!=-1){
var pair=_4c6.split("-");
_4c4.setAttribute("aria-"+pair[0],pair[1]);
}
});
}
}
}});
});
},"dijit/focus":function(){
define("dijit/focus",["dojo/aspect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/Evented","dojo/_base/lang","dojo/on","dojo/ready","dojo/_base/sniff","dojo/Stateful","dojo/_base/unload","dojo/_base/window","dojo/window","./a11y","./registry","."],function(_4c7,_4c8,dom,_4c9,_4ca,_4cb,lang,on,_4cc,has,_4cd,_4ce,win,_4cf,a11y,_4d0,_4d1){
var _4d2=_4c8([_4cd,_4cb],{curNode:null,activeStack:[],constructor:function(){
var _4d3=lang.hitch(this,function(node){
if(dom.isDescendant(this.curNode,node)){
this.set("curNode",null);
}
if(dom.isDescendant(this.prevNode,node)){
this.set("prevNode",null);
}
});
_4c7.before(_4ca,"empty",_4d3);
_4c7.before(_4ca,"destroy",_4d3);
},registerIframe:function(_4d4){
return this.registerWin(_4d4.contentWindow,_4d4);
},registerWin:function(_4d5,_4d6){
var _4d7=this;
var _4d8=function(evt){
_4d7._justMouseDowned=true;
setTimeout(function(){
_4d7._justMouseDowned=false;
},0);
if(has("ie")&&evt&&evt.srcElement&&evt.srcElement.parentNode==null){
return;
}
_4d7._onTouchNode(_4d6||evt.target||evt.srcElement,"mouse");
};
var doc=has("ie")?_4d5.document.documentElement:_4d5.document;
if(doc){
if(has("ie")){
_4d5.document.body.attachEvent("onmousedown",_4d8);
var _4d9=function(evt){
var tag=evt.srcElement.tagName.toLowerCase();
if(tag=="#document"||tag=="body"){
return;
}
if(a11y.isTabNavigable(evt.srcElement)){
_4d7._onFocusNode(_4d6||evt.srcElement);
}else{
_4d7._onTouchNode(_4d6||evt.srcElement);
}
};
doc.attachEvent("onactivate",_4d9);
var _4da=function(evt){
_4d7._onBlurNode(_4d6||evt.srcElement);
};
doc.attachEvent("ondeactivate",_4da);
return {remove:function(){
_4d5.document.detachEvent("onmousedown",_4d8);
doc.detachEvent("onactivate",_4d9);
doc.detachEvent("ondeactivate",_4da);
doc=null;
}};
}else{
doc.body.addEventListener("mousedown",_4d8,true);
doc.body.addEventListener("touchstart",_4d8,true);
var _4db=function(evt){
_4d7._onFocusNode(_4d6||evt.target);
};
doc.addEventListener("focus",_4db,true);
var _4dc=function(evt){
_4d7._onBlurNode(_4d6||evt.target);
};
doc.addEventListener("blur",_4dc,true);
return {remove:function(){
doc.body.removeEventListener("mousedown",_4d8,true);
doc.body.removeEventListener("touchstart",_4d8,true);
doc.removeEventListener("focus",_4db,true);
doc.removeEventListener("blur",_4dc,true);
doc=null;
}};
}
}
},_onBlurNode:function(){
this.set("prevNode",this.curNode);
this.set("curNode",null);
if(this._justMouseDowned){
return;
}
if(this._clearActiveWidgetsTimer){
clearTimeout(this._clearActiveWidgetsTimer);
}
this._clearActiveWidgetsTimer=setTimeout(lang.hitch(this,function(){
delete this._clearActiveWidgetsTimer;
this._setStack([]);
this.prevNode=null;
}),100);
},_onTouchNode:function(node,by){
if(this._clearActiveWidgetsTimer){
clearTimeout(this._clearActiveWidgetsTimer);
delete this._clearActiveWidgetsTimer;
}
var _4dd=[];
try{
while(node){
var _4de=_4c9.get(node,"dijitPopupParent");
if(_4de){
node=_4d0.byId(_4de).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===win.body()){
break;
}
node=_4cf.get(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId"),_4df=id&&_4d0.byId(id);
if(_4df&&!(by=="mouse"&&_4df.get("disabled"))){
_4dd.unshift(id);
}
node=node.parentNode;
}
}
}
}
catch(e){
}
this._setStack(_4dd,by);
},_onFocusNode:function(node){
if(!node){
return;
}
if(node.nodeType==9){
return;
}
this._onTouchNode(node);
if(node==this.curNode){
return;
}
this.set("curNode",node);
},_setStack:function(_4e0,by){
var _4e1=this.activeStack;
this.set("activeStack",_4e0);
for(var _4e2=0;_4e2<Math.min(_4e1.length,_4e0.length);_4e2++){
if(_4e1[_4e2]!=_4e0[_4e2]){
break;
}
}
var _4e3;
for(var i=_4e1.length-1;i>=_4e2;i--){
_4e3=_4d0.byId(_4e1[i]);
if(_4e3){
_4e3._hasBeenBlurred=true;
_4e3.set("focused",false);
if(_4e3._focusManager==this){
_4e3._onBlur(by);
}
this.emit("widget-blur",_4e3,by);
}
}
for(i=_4e2;i<_4e0.length;i++){
_4e3=_4d0.byId(_4e0[i]);
if(_4e3){
_4e3.set("focused",true);
if(_4e3._focusManager==this){
_4e3._onFocus(by);
}
this.emit("widget-focus",_4e3,by);
}
}
},focus:function(node){
if(node){
try{
node.focus();
}
catch(e){
}
}
}});
var _4e4=new _4d2();
_4cc(function(){
var _4e5=_4e4.registerWin(win.doc.parentWindow||win.doc.defaultView);
if(has("ie")){
_4ce.addOnWindowUnload(function(){
_4e5.remove();
_4e5=null;
});
}
});
_4d1.focus=function(node){
_4e4.focus(node);
};
for(var attr in _4e4){
if(!/^_/.test(attr)){
_4d1.focus[attr]=typeof _4e4[attr]=="function"?lang.hitch(_4e4,attr):_4e4[attr];
}
}
_4e4.watch(function(attr,_4e6,_4e7){
_4d1.focus[attr]=_4e7;
});
return _4e4;
});
},"curam/matrix/TopRightFiller":function(){
define("curam/matrix/TopRightFiller",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_4e8,dojo,_4e9){
dojo.provide("curam.matrix.TopRightFiller");
dojo.require("curam.matrix.Constants");
dojo.declare("curam.matrix.TopRightFiller",null,{constructor:function(){
this.node=dojo.byId("top-right-filler");
this.topRightTopFiller=dojo.byId("top-right-filler-top");
this.topRightBottomFiller=dojo.byId("top-right-filler-bottom");
},setDimensions:function(){
var c=curam.matrix.Constants.container;
this.widthIncBorder=c.scrollBarWidth+curam.matrix.Constants.MATRIX_BORDER_SIZE;
c.cssText.append(".matrix-container .top-right-filler-contents-eval{width:").append(c.scrollBarWidth).append("px;}.matrix-container .top-right-filler-eval{width:").append(this.widthIncBorder).append("px;}");
}});
});
},"curam/matrix/util":function(){
define("curam/matrix/util",["curam/define","curam/util","curam/matrix/Constants"],function(){
var _4ea=curam.define.singleton("curam.matrix.util",{keys:dojo.keys,allowableCharsForNumeric:["1","2","3","4","5","6","7","8","9","0","-",".",dojo.keys.LEFT_ARROW,dojo.keys.RIGHT_ARROW,dojo.keys.DELETE,dojo.keys.BACKSPACE,dojo.keys.END,dojo.keys.HOME,dojo.keys.TAB,dojo.keys.F5],getQuestionIdFromPriorityInputId:function(id){
var temp=id.replace(curam.matrix.Constants.container.matrix.inputPrefix+"priority.s.s.","");
var _4eb=/\..*/;
return temp.replace(_4eb,"");
},getCellIndexFromContradictionCellId:function(id){
return Number(curam.matrix.util.safeSplit(id,"-")[4]);
},getQuestionIdFromAnswerId:function(_4ec){
var qId=_4ec.substring(_4ec.indexOf("-Q")+1);
qId=qId.substring(0,qId.indexOf("-")>0?qId.indexOf("-"):qId.length);
return qId;
},getQuestionIdFromAnswerInputId:function(id){
var ids=id.split(".");
return ids[ids.length-2];
},getAnswerIdFromAnswerInputId:function(id){
var ids=id.split(".");
return ids[ids.length-1];
},getPriorityIdFromPriorityInputId:function(id){
var temp=id.replace(curam.matrix.Constants.container.matrix.inputPrefix+"priority.s.s.","");
var _4ed=/^.*\./;
return temp.replace(_4ed,"");
},makeNumericInput:function(_4ee,_4ef){
curam.util.connect(_4ee,"key",curam.matrix.util[_4ef?"posNumericInputChecker":"numericInputChecker"]);
},checkFocus:function(){
curam.matrix.Constants.container.matrix.checkFocus(arguments[0]);
},createInput:function(type){
var _4f0=dojo.create("input",{onfocus:function(){
curam.matrix.Constants.container.matrix.cf(arguments);
}});
if(type){
_4f0.setAttribute("type",type);
}
return _4f0;
},safeSplit:function(str,c){
if(str.indexOf(c+c)>-1){
var arr=str.split(c+c);
var _4f1;
var _4f2=[];
for(var _4f3=0;_4f3<arr.length;_4f3++){
_4f1=arr[_4f3].split(c);
if(_4f3>0){
_4f1[0]=c+_4f1[0];
}
_4f2=_4f2.concat(_4f1);
}
return _4f2;
}else{
return str.split(c);
}
},validationChecker:function(e){
var mat=curam.matrix.Constants.container.matrix;
if(mat.isValidationActive()&&!mat.isInputPartOfValidation(e.target)){
dojo.stopEvent(e);
mat.refocusValidatingInput();
return false;
}
return true;
},numericInputChecker:function(e){
if(!curam.matrix.util.validationChecker(e)){
return false;
}
if(typeof (e.key)!="undefined"){
if(e.key=="-"&&e.target.value.length!=0){
dojo.stopEvent(e);
return;
}else{
if(e.key=="."&&e.target.value.indexOf(".")!=-1){
dojo.stopEvent(e);
return;
}
}
var _4f4=curam.matrix.util.allowableCharsForNumeric;
for(var i=0;i<_4f4.length;i++){
if(e.key!=" "&&e.key===_4f4[i]){
return;
}
}
dojo.stopEvent(e);
return;
}
},posNumericInputChecker:function(e){
if(!curam.matrix.util.validationChecker(e)){
return false;
}
if(typeof (e.key)!="undefined"){
if(e.key=="-"||(e.key=="."&&e.target.value.indexOf(".")!=-1)){
dojo.stopEvent(e);
return;
}
var _4f5=curam.matrix.util.allowableCharsForNumeric;
for(var i=0;i<_4f5.length;i++){
if(e.key!=" "&&e.key===_4f5[i]){
return;
}
}
dojo.stopEvent(e);
return;
}
},initButtonListeners:function(node){
if(node._btnMouseOverAdded){
return;
}
curam.util.connect(node,"onmouseover",curam.matrix.util.buttonMouseOver);
node._btnMouseOverAdded=true;
},buttonMouseOver:function(_4f6){
_4f6=dojo.fixEvent(_4f6);
var node=_4f6.target;
if(!node.id||node.id==""){
node=node.parentNode;
}
dojo.addClass(node,"mouseover");
if(!node._btnMouseOutAdded){
curam.util.connect(node,"onmouseout",curam.matrix.util.buttonMouseOut);
node._btnMouseOutAdded=true;
}
},buttonMouseOut:function(_4f7){
_4f7=dojo.fixEvent(_4f7);
var node=_4f7.target;
if(!node.id||node.id==""){
node=node.parentNode;
}
dojo.removeClass(node,"mouseover");
},toggleHeight:function(node){
if(!dojo.isIE){
return;
}
var _4f8=dojo.contentBox(node).h;
dojo.contentBox(node,{height:_4f8+2});
dojo.contentBox(node,{height:_4f8});
}});
return _4ea;
});
},"curam/matrix/BottomLeftMain":function(){
define("curam/matrix/BottomLeftMain",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants,dojo/dom-geometry"],function(_4f9,dojo,_4fa){
dojo.provide("curam.matrix.BottomLeftMain");
dojo.require("curam.matrix.Constants");
var _4fb=dojo.require("dojo.dom-geometry");
dojo.declare("curam.matrix.BottomLeftMain",null,{constructor:function(){
this.node=dojo.byId("bottom-left-main");
this.questions=new curam.ListMap();
this.matrix=curam.matrix.Constants.container.matrix;
var _4fc=this.node.childNodes;
for(var i=0;i<_4fc.length;i++){
if(_4fc[i].nodeType==1){
this.questions.add(_4fc[i].id,new curam.matrix.QuestionLeft(_4fc[i]));
}
}
},setDimensions:function(){
this.setDefaultNumberDimensions();
this.setDefaultAnswerDimensions();
var _4fd=0;
for(var i=0;i<this.questions.count;i++){
_4fd+=this.questions.getObjectByIndex(i).setDimensions();
}
return this.setHeight(_4fd);
},setHeight:function(_4fe){
var c=curam.matrix.Constants.container;
var _4ff=_4fe+c.matrix.bottomLeft.bottomLeftFiller.height+c.matrix.topLeft.height;
this.height=(_4ff>c.maxMatrixHeight)?curam.matrix.Constants.container.maxMatrixHeight-c.matrix.topLeft.height-c.matrix.bottomLeft.bottomLeftFiller.height-curam.matrix.Constants.MATRIX_BORDER_SIZE:_4fe;
c.cssText.append(".matrix-container .bottom-left-main-eval{height:").append(this.height).append("px;}");
return this.height;
},setDefaultAnswerDimensions:function(){
if(this.defaultDimensionsSet){
return;
}
var c=curam.matrix.Constants.container;
var _500=_4fb.getMarginBoxSimple(c.tempDivs.ctAnsVal);
var _501=dojo.contentBox(c.tempDivs.ctAnsVal);
c.fullAnswerHeight=_501.h+c.tempDivs.image.offsetHeight;
c.ansValSelectHeight=c.tempDivs.ctAnsVal.offsetHeight;
c.defaultAnsHeight=_500.h-2;
c.reducedAnswHeight=c.defaultAnsHeight-4;
c.inputBorderWidth=Math.max(dojo.position(c.tempDivs.ctAnsSelect).w-dojo.contentBox(c.tempDivs.ctAnsSelect).w,4);
c.ansValWidth=c.answersColWidth-c.tempDivs.image.offsetWidth-(dojo.style(c.tempDivs.ctAnsVal,"paddingLeft")+dojo.style(c.tempDivs.ctAnsVal,"paddingRight"))-(dojo.style(c.tempDivs.ctAnsVal,"borderLeft")+dojo.style(c.tempDivs.ctAnsVal,"borderRight"))-Math.ceil((_500.w-_501.w)/2);
var _502=c.ansValWidth-c.inputBorderWidth;
var _503=Math.ceil((_500.h-_501.h)/2);
var _504=(_502-c.tempDivs.numAns.offsetWidth-c.inputBorderWidth)/2;
c.ansValInputHeight=c.tempDivs.strAns.offsetHeight;
c.marginTopStringAns=((c.ansValSelectHeight-c.ansValInputHeight+_503)/2);
c.ansValTextHeight=c.tempDivs.textAns.offsetHeight;
var _505=(c.ansValSelectHeight-c.ansValTextHeight+_503)/2;
var _506="px;}.matrix-container ";
c.cssText.append(".matrix-container .ans-eval{height:").append(c.reducedAnswHeight).append(_506+".ans-eval-with-menu{height:").append(c.fullAnswerHeight-1).append(_506+".ans-val-eval{width:").append(c.ansValWidth).append(_506+".ans-str-val-eval{border-top:1px solid #F4F5F9;margin-top:").append(c.marginTopStringAns).append(_506+".ans-num-val-eval{margin-top:").append(c.marginTopStringAns).append(_506+".ans-bool-val-eval{margin-top:").append(_505-4).append(_506+".ans-str-val-eval-with-menu{margin-top:").append(c.marginTopStringAns+5).append(_506+".ans-num-val-eval-with-menu{margin-top:").append(c.marginTopStringAns+5).append(_506+".ans-bool-val-eval-with-menu{margin-top:").append(_505).append(_506+".answer-input-eval{width:").append(_502).append(_506+".numeric-input-eval{width:").append(_504).append(_506+".default-q-height-eval{height:").append(c.reducedAnswHeight).append(_506+".default-q-height-eval div.qt-text{padding-top:8.5").append(c.reducedAnswHeight).append(_506+"..default-q-height-eval .number-text{padding-top:9.5").append(c.reducedAnswHeight).append(_506+".default-q-height-boolean-eval{height:").append((c.reducedAnswHeight*2)+1).append(_506+".default-q-height-boolean-eval div.qt-text{padding-top:25").append(_506+".default-q-height-boolean-eval .number-text{padding-top:26").append("px;}");
this.defaultDimensionsSet=true;
},resyncNumbers:function(){
var _507=0;
var num;
for(var i=0;i<this.questions.count;i++){
num=this.questions.getObjectByIndex(i).number;
curam.matrix.util.initButtonListeners(num.node);
num.text.innerHTML=++_507;
}
},setDefaultNumberDimensions:function(){
curam.matrix.Constants.container.numTextHeight=curam.matrix.Constants.container.tempDivs.numHeight;
},addQuestion:function(_508){
var _509=dojo.create("div",{id:"ql-"+_508[0],"class":"bottom-left-eval "+_508[0]+"-eval"});
_509.appendChild(this.createNumber(_508));
_509.appendChild(this.createQuestionText(_508));
_509.appendChild(this.createAnsGroup(_508));
var _50a=new curam.matrix.QuestionLeft(_509);
this.node.appendChild(_50a.node);
this.questions.add("ql-"+_508[0],_50a);
return _50a.setDimensions();
},getQuestion:function(id){
if(id.indexOf("ql-")<0){
id="ql-"+id;
}
return this.questions.getObjectByKey(id);
},createNumber:function(_50b){
var _50c=_50b[1]=="boolean"?"default-q-height-boolean-eval ":"default-q-height-eval ";
var num=dojo.create("div",{id:"num-"+_50b[0],"class":_50c+"number number-col-eval q-ct-eval-"+_50b[0]});
var _50d=dojo.create("div",{innerHTML:"1","class":"number-text number-text-"+_50b[0]+"-eval"},num);
return num;
},createQuestionText:function(_50e){
var _50f=_50e[1]=="boolean"?"default-q-height-boolean-eval":"default-q-height-eval";
var ques=dojo.create("div",{id:"ques-"+_50e[0],"class":_50f+" q-ct q-ct-eval-"+_50e[0]+" qt-col-eval"});
var _510=dojo.create("div",{"class":"qt-text qt-text-"+_50e[0]+"-eval"},ques);
var _511=dojo.create("a",{title:_50e[2],innerHTML:_50e[2]},_510);
return ques;
},createAnsGroup:function(_512){
var _513=dojo.create("div",{id:"ans-group-"+_512[0],"class":"q-ct q-ct-eval-"+_512[0]+" ans-col-eval"});
_513.appendChild(this.createAnswer(_512[0],_512[1],1));
if(_512[1]==curam.matrix.Constants.ANSWER_TYPE_BOOLEAN){
_513.appendChild(this.createAnswer(_512[0],_512[1],2));
}
return _513;
},createAnswer:function(qId,_514,_515,_516){
var _517;
var _518=_515==1?"":"ans";
var _519="";
if(_515==1&&curam.matrix.Constants.container.existingQuestionIds.indexOf(qId)==0){
_519="-with-menu";
}
if(_514==curam.matrix.Constants.ANSWER_TYPE_BOOLEAN){
_517="ans-bool-val-eval"+_519;
}else{
if(_514==curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
_517="ans-num-val-eval"+_519;
}else{
if(_514==curam.matrix.Constants.ANSWER_TYPE_STRING){
_517="ans-str-val-eval"+_519;
}else{
_517="ans-ct-val"+_519;
}
}
}
var ans=dojo.create("div",{id:"ans-"+qId+"-"+_515,"class":_518+" ans-col-eval ans-eval"+_519+" ans-"+qId+"-eval"});
var _51a=dojo.create("div",{id:"ans-val-"+qId+"-"+_515,"class":"ans-val ans-val-eval "+_517+" ans-"+qId+"-val-eval"},ans);
var _51b;
var id=this.matrix.inputPrefix+"value.s.s."+qId+"."+_515;
if(_514==curam.matrix.Constants.ANSWER_TYPE_BOOLEAN){
var text=_515==1?curam.matrix.Constants.container.i18nMsgs.booleanTrue:curam.matrix.Constants.container.i18nMsgs.booleanFalse;
_51a.appendChild(document.createTextNode(text));
_51b=dojo.create("input",{type:"hidden",id:id,name:id,value:text},_51a);
}else{
if(_514==curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
var _51c=dojo.create("div",{title:curam.matrix.Constants.container.i18nMsgs.labelSpecificValue,"class":" label-specific-value"});
_51c.appendChild(document.createTextNode(curam.matrix.Constants.container.i18nMsgs.labelSpecificValue+": "));
_51a.appendChild(_51c);
_51b=curam.matrix.util.createInput("text");
dojo.attr(_51b,{id:id,name:id,title:curam.matrix.Constants.container.i18nMsgs.labelSpecificValue,value:"","class":"numeric-input-eval"});
dojo.place(_51b,_51a);
}else{
if(_514==curam.matrix.Constants.ANSWER_TYPE_STRING){
_51b=curam.matrix.util.createInput("text");
dojo.attr(_51b,{id:id,name:id,value:"","class":"answer-input-eval"});
dojo.place(_51b,_51a);
}else{
var _51d=_51b=dojo.create("select",{id:id,name:id,"class":"answer-input-eval"});
if(_514==curam.matrix.Constants.ANSWER_TYPE_CODETABLE){
if(_516!=null){
var opt;
for(var _51e=0;_51e<_516.length;_51e++){
opt=new Option(_516[_51e]["text"],_516[_51e]["value"]);
try{
_51d.add(opt,null);
}
catch(e){
_51d.add(opt);
}
}
}
}else{
var _51f=new AJAXCall(_51d).doRequest("getCodeTable",[_514],false,true);
}
dojo.place(_51d,_51a);
}
}
}
curam.util.connect(_51b,"onfocus",function(){
curam.matrix.Constants.container.matrix.cf(arguments);
});
var _520=dojo.create("div",{"class":"image"},ans);
return ans;
}});
});
},"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n","curam/matrix/ScoreGroup":function(){
define("curam/matrix/ScoreGroup",["dijit","dojo","dojox"],function(_521,dojo,_522){
dojo.provide("curam.matrix.ScoreGroup");
dojo.declare("curam.matrix.ScoreGroup",null,{constructor:function(node){
this.node=node;
this.scores=new curam.ListMap();
var _523=this.node.childNodes;
for(var i=0;i<_523.length;i++){
if(_523[i].nodeType==1){
this.scores.add(_523[i].id,new curam.matrix.Score(_523[i]));
}
}
}});
dojo.declare("curam.matrix.Score",null,{constructor:function(node){
this.node=node;
this.scoreValidation=dojo.query("> :first-child",node)[0];
this.input=dojo.query("> :first-child",this.scoreValidation)[0];
curam.matrix.util.makeNumericInput(this.input);
},adjustFirstRowClass:function(_524){
var _525=dojo.attr(this.node,"class");
if(_525.indexOf("ans-eval-with-menu")==-1){
_525=_525.replace("ans-eval","ans-eval-with-menu");
cm.setClass(this.node,_525);
}
_525=dojo.attr(this.scoreValidation,"class");
if(_525.indexOf("ans-str-val-eval-with-menu")==-1){
_525=_525.replace("ans-str-val-eval","ans-str-val-eval-with-menu");
cm.setClass(this.scoreValidation,_525);
}
}});
});
},"dijit/main":function(){
define("dijit/main",["dojo/_base/kernel"],function(dojo){
return dojo.dijit;
});
},"dojo/date/stamp":function(){
define("dojo/date/stamp",["../_base/kernel","../_base/lang","../_base/array"],function(dojo,lang,_526){
lang.getObject("date.stamp",true,dojo);
dojo.date.stamp.fromISOString=function(_527,_528){
if(!dojo.date.stamp._isoRegExp){
dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
}
var _529=dojo.date.stamp._isoRegExp.exec(_527),_52a=null;
if(_529){
_529.shift();
if(_529[1]){
_529[1]--;
}
if(_529[6]){
_529[6]*=1000;
}
if(_528){
_528=new Date(_528);
_526.forEach(_526.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(prop){
return _528["get"+prop]();
}),function(_52b,_52c){
_529[_52c]=_529[_52c]||_52b;
});
}
_52a=new Date(_529[0]||1970,_529[1]||0,_529[2]||1,_529[3]||0,_529[4]||0,_529[5]||0,_529[6]||0);
if(_529[0]<100){
_52a.setFullYear(_529[0]||1970);
}
var _52d=0,_52e=_529[7]&&_529[7].charAt(0);
if(_52e!="Z"){
_52d=((_529[8]||0)*60)+(Number(_529[9])||0);
if(_52e!="-"){
_52d*=-1;
}
}
if(_52e){
_52d-=_52a.getTimezoneOffset();
}
if(_52d){
_52a.setTime(_52a.getTime()+_52d*60000);
}
}
return _52a;
};
dojo.date.stamp.toISOString=function(_52f,_530){
var _531=function(n){
return (n<10)?"0"+n:n;
};
_530=_530||{};
var _532=[],_533=_530.zulu?"getUTC":"get",date="";
if(_530.selector!="time"){
var year=_52f[_533+"FullYear"]();
date=["0000".substr((year+"").length)+year,_531(_52f[_533+"Month"]()+1),_531(_52f[_533+"Date"]())].join("-");
}
_532.push(date);
if(_530.selector!="date"){
var time=[_531(_52f[_533+"Hours"]()),_531(_52f[_533+"Minutes"]()),_531(_52f[_533+"Seconds"]())].join(":");
var _534=_52f[_533+"Milliseconds"]();
if(_530.milliseconds){
time+="."+(_534<100?"0":"")+_531(_534);
}
if(_530.zulu){
time+="Z";
}else{
if(_530.selector!="time"){
var _535=_52f.getTimezoneOffset();
var _536=Math.abs(_535);
time+=(_535>0?"-":"+")+_531(Math.floor(_536/60))+":"+_531(_536%60);
}
}
_532.push(time);
}
return _532.join("T");
};
return dojo.date.stamp;
});
},"curam/matrix/PriorityGroup":function(){
define("curam/matrix/PriorityGroup",["dijit","dojo","dojox"],function(_537,dojo,_538){
dojo.provide("curam.matrix.PriorityGroup");
dojo.declare("curam.matrix.PriorityGroup",null,{constructor:function(node,_539){
this.node=node;
this.priorities=new curam.ListMap();
this.matrix=_539;
var _53a=this.node.childNodes;
for(var i=0;i<_53a.length;i++){
if(_53a[i].nodeType==1){
this.priorities.add(_53a[i].id,new curam.matrix.Priority(_53a[i],_539,this));
}
}
},addPriority:function(node){
if(node.nodeType==1){
this.priorities.add(node.id,new curam.matrix.Priority(node,this.matrix,this));
this.node.appendChild(node);
}
}});
});
},"curam/util/LocalConfig":function(){
define("curam/util/LocalConfig",[],function(){
var _53b=function(name){
return "curam_util_LocalConfig_"+name;
},_53c=function(name,_53d){
var _53e=_53b(name);
if(typeof top[_53e]==="undefined"){
top[_53e]=_53d;
}
return top[_53e];
},_53f=function(name){
return top[_53b(name)];
};
_53c("seedValues",{}),_53c("overrides",{});
var _540=function(_541,_542){
if(typeof _541!=="undefined"&&typeof _541!=="string"){
throw new Error("Invalid "+_542+" type: "+typeof _541+"; expected string");
}
};
var _543={seedOption:function(name,_544,_545){
_540(_544,"value");
_540(_545,"defaultValue");
_53f("seedValues")[name]=(typeof _544!=="undefined")?_544:_545;
},overrideOption:function(name,_546){
_540(_546,"value");
if(typeof (Storage)!=="undefined"){
localStorage[name]=_546;
}else{
_53f("overrides")[name]=_546;
}
},readOption:function(name,_547){
_540(_547,"defaultValue");
var _548=null;
if(typeof (Storage)!=="undefined"&&typeof localStorage[name]!=="undefined"){
_548=localStorage[name];
}else{
if(typeof _53f("overrides")[name]!=="undefined"){
_548=_53f("overrides")[name];
}else{
if(typeof _53f("seedValues")[name]!=="undefined"){
_548=_53f("seedValues")[name];
}else{
_548=_547;
}
}
}
return _548;
},clearOption:function(name){
if(typeof (Storage)!=="undefined"){
localStorage.removeItem(name);
}
delete _53f("overrides")[name];
delete _53f("seedValues")[name];
}};
return _543;
});
},"curam/util/BitSet":function(){
define("curam/util/BitSet",[],function(){
var _549=dojo.declare("curam.util.BitSet",null,{_idCounter:0,constructor:function(){
this.value=[];
this.max=-1;
this.log2=Math.log(2);
this.id=++curam.util.BitSet.prototype._idCounter;
},set:function(_54a){
this.max=Math.max(this.max,_54a);
var pos=this._getPos(_54a,true);
var _54b=this.value[pos];
this.value[pos]=this.value[pos]|this._pow(_54a);
return _54b!=this.value[pos];
},unSet:function(_54c){
this.max=Math.max(this.max,_54c);
var pos=this._getPos(_54c,false);
if(pos<0){
return;
}
var _54d=this.value[pos];
this.value[pos]=this.value[pos]&(~this._pow(_54c));
if(this.value[pos]==0&&pos==this.value.length-1){
this.value.splice(pos,1);
return true;
}
return _54d!=this.value[pos];
},isSet:function(_54e){
var pos=this._getPos(_54e,false);
return pos>-1&&((this._pow(_54e)&this.value[pos])>0);
},isClear:function(){
for(var _54f=0;_54f<this.value.length;_54f++){
if(this.value[_54f]>0){
return false;
}
}
return true;
},isSingleSet:function(){
var log;
var _550=false;
for(var _551=0;_551<this.value.length;_551++){
if(this.value[_551]==0){
continue;
}
log=Math.log(this.value[_551])/this.log2;
if(log==Math.floor(log)&&!_550){
_550=true;
}else{
return false;
}
}
return _550;
},equals:function(_552){
if(!_552||this.value.length!=_552.value.length){
return false;
}
var _553=Math.max(this.value.length,_552.value.length);
for(var _554=0;_554<_553;_554++){
if(_552.value[_554]!=this.value[_554]){
return false;
}
}
return true;
},_getPos:function(_555,init){
var pos=Math.floor(Number(_555)/31);
while(init&&this.value.length<=pos){
this.value[this.value.length]=0;
}
return (this.value.length<=pos?-1:pos);
},_pow:function(_556){
return Math.pow(2,Number(_556)%31);
}});
return _549;
});
},"dijit/MenuItem":function(){
require({cache:{"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n"}});
define("dijit/MenuItem",["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/event","dojo/_base/kernel","dojo/_base/sniff","./_Widget","./_TemplatedMixin","./_Contained","./_CssStateMixin","dojo/text!./templates/MenuItem.html"],function(_557,dom,_558,_559,_55a,_55b,has,_55c,_55d,_55e,_55f,_560){
return _557("dijit.MenuItem",[_55c,_55d,_55e,_55f],{templateString:_560,baseClass:"dijitMenuItem",label:"",_setLabelAttr:{node:"containerNode",type:"innerHTML"},iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},accelKey:"",disabled:false,_fillContent:function(_561){
if(_561&&!("label" in this.params)){
this.set("label",_561.innerHTML);
}
},buildRendering:function(){
this.inherited(arguments);
var _562=this.id+"_text";
_558.set(this.containerNode,"id",_562);
if(this.accelKeyNode){
_558.set(this.accelKeyNode,"id",this.id+"_accel");
_562+=" "+this.id+"_accel";
}
this.domNode.setAttribute("aria-labelledby",_562);
dom.setSelectable(this.domNode,false);
},_onHover:function(){
this.getParent().onItemHover(this);
},_onUnhover:function(){
this.getParent().onItemUnhover(this);
this._set("hovering",false);
},_onClick:function(evt){
this.getParent().onItemClick(this,evt);
_55a.stop(evt);
},onClick:function(){
},focus:function(){
try{
if(has("ie")==8){
this.containerNode.focus();
}
this.focusNode.focus();
}
catch(e){
}
},_onFocus:function(){
this._setSelected(true);
this.getParent()._onItemFocus(this);
this.inherited(arguments);
},_setSelected:function(_563){
_559.toggle(this.domNode,"dijitMenuItemSelected",_563);
},setLabel:function(_564){
_55b.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_564);
},setDisabled:function(_565){
_55b.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_565);
},_setDisabledAttr:function(_566){
this.focusNode.setAttribute("aria-disabled",_566?"true":"false");
this._set("disabled",_566);
},_setAccelKeyAttr:function(_567){
this.accelKeyNode.style.display=_567?"":"none";
this.accelKeyNode.innerHTML=_567;
_558.set(this.containerNode,"colSpan",_567?"1":"2");
this._set("accelKey",_567);
}});
});
},"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n","curam/util/RuntimeContext":function(){
define("curam/util/RuntimeContext",[],function(){
var _568=dojo.declare("curam.util.RuntimeContext",null,{_window:null,constructor:function(_569){
this._window=_569;
},getHref:function(){
return this._window.location.href;
},getPathName:function(){
return this._window.location.pathName;
},contextObject:function(){
return this._window;
}});
return _568;
});
},"curam/matrix/TopLeft":function(){
define("curam/matrix/TopLeft",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants,dojo/dom-geometry"],function(_56a,dojo,_56b){
dojo.provide("curam.matrix.TopLeft");
dojo.require("curam.matrix.Constants");
var _56c=dojo.require("dojo.dom-geometry");
dojo.declare("curam.matrix.TopLeft",null,{constructor:function(){
this.node=dojo.byId("top-left");
this.topLeftTop=dojo.byId("top-left-top");
this.columnIDA=dojo.byId("column-id-a");
this.columnIDAText=dojo.query("> :first-child",this.columnIDA)[0];
this.columnIDB=dojo.byId("column-id-b");
this.columnIDBText=dojo.query("> :first-child",this.columnIDB)[0];
this.topLeftBottom=dojo.byId("top-left-bottom");
this.headingQuestion=dojo.byId("heading-questions");
this.headingQuestionText=dojo.query("> :first-child",this.headingQuestion)[0];
this.headingAnswerValues=dojo.byId("heading-answers");
this.headingAnswerValuesText=dojo.query("> :first-child",this.headingAnswerValues)[0];
},setDimensions:function(){
var _56d=this.columnIDA.clientHeight;
var _56e=_56d+(curam.matrix.Constants.MATRIX_BORDER_SIZE*2);
var _56f=_56d+curam.matrix.Constants.MATRIX_BORDER_SIZE;
this.height=_56e+_56f;
var c=curam.matrix.Constants.container;
this.width=c.questionColWidth+c.answersColWidth+(curam.matrix.Constants.MATRIX_BORDER_SIZE*2);
c.leftMatrixWidth=this.width+c.tempDivs.numWidth+(curam.matrix.Constants.MATRIX_BORDER_SIZE*2);
this.topLeftFillerHeight=_56d+_56c.getMarginBoxSimple(this.headingQuestion).h+2;
c.cssText.append(".matrix-container .qt-col-eval{width:"+c.questionColWidth+"px;}").append(".matrix-container .top-eval{height:").append(this.height).append("px;}.matrix-container .top-top-eval{height:").append(_56e).append("px;}.matrix-container .top-bottom-eval{height:").append(_56f).append("px;}.matrix-container .column-eval{height:").append(_56d).append("px;}.matrix-container .top-left-eval{width:").append(this.width).append("px;}.matrix-container .top-left-filler-eval{height:").append(this.topLeftFillerHeight).append("px;}.matrix-container .number-col-eval{width:").append(c.tempDivs.numWidth).append("px;}.matrix-container .ans-col-eval{width:").append(c.answersColWidth).append("px;}");
}});
});
},"curam/matrix/TopRightTop":function(){
define("curam/matrix/TopRightTop",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_570,dojo,_571){
dojo.provide("curam.matrix.TopRightTop");
dojo.require("curam.matrix.Constants");
dojo.declare("curam.matrix.TopRightTop",null,{constructor:function(){
this.node=dojo.byId("top-right-top");
this.priorityCol=null;
this.priorityColText=null;
this.scoreCol=null;
this.scoreColText=null;
this.contradictionCol=null;
this.outcomeCols=new curam.ListMap();
this.priorityWidgetCreated=false;
this.scoreWidgetCreated=false;
this.matrix=curam.matrix.Constants.container.matrix;
var _572=this.node.childNodes;
for(var i=0;i<_572.length;i++){
if(_572[i].nodeType==1){
if(_572[i].id=="column-id-pri"){
this.priorityCol=_572[i];
this.priorityColText=dojo.query("> :first-child",this.priorityCol)[0];
this.priorityCol._conn=dojo.connect(this.priorityCol,"onclick",this,"createPriorityButtonWidget");
}else{
if(_572[i].id=="column-id-scr"){
this.scoreCol=_572[i];
this.scoreColText=dojo.query("> :first-child",this.scoreCol)[0];
this.scoreCol._conn=dojo.connect(this.scoreCol,"onclick",this,"createScoreButtonWidget");
}else{
if(_572[i].id=="column-id-contr"){
this.contradictionCol=new curam.matrix.ContradictionColumn(_572[i],false);
}else{
this.outcomeCols.add(_572[i].id,new curam.matrix.OutcomeColumn(_572[i],false));
}
}
}
}
}
},createPriorityButtonWidget:function(_573){
var c=curam.matrix.Constants.container;
if(this.priorityWidgetCreated){
return;
}
dojo.disconnect(this.priorityCol._conn);
var _574=new curam.widget.PriorityButton({menuId:"PriorityOptions",id:this.priorityCol.id},this.priorityCol);
curam.util.connect(_574.domNode,"onmouseover",function(evt){
_mov(evt);
});
this.matrix.initHighlighters(true,false);
_574._toggleMenu("PriorityOptions",_573);
this.priorityCol=_574.domNode;
this.priorityColText=dojo.query("> :first-child",this.priorityCol)[0];
this.priorityWidgetCreated=true;
_570.byId("PriorityOptions")._openMyself(_573);
},createScoreButtonWidget:function(_575){
var c=curam.matrix.Constants.container;
if(this.scoreWidgetCreated){
return;
}
var _576=new curam.widget.ScoreButton({menuId:"ScoreOptions",id:this.scoreCol.id},this.scoreCol);
curam.util.connect(_576.domNode,"onmouseover",function(evt){
_mov(evt);
});
this.matrix.initHighlighters(false,true);
_576._toggleMenu("ScoreOptions",_575);
this.scoreCol=_576.domNode;
this.scoreColText=dojo.query("> :first-child",this.scoreCol)[0];
this.scoreWidgetCreated=true;
dojo.disconnect(this.scoreCol._conn);
_570.byId("ScoreOptions")._openMyself(_575);
},getOutcomeColIds:function(){
var key;
var arr=new Array();
var _577=/^column-id-/;
for(var i=0;i<this.outcomeCols.count;i++){
key=this.outcomeCols.getKeyByIndex(i);
key=new String(key);
arr.push(key.replace(_577,""));
}
return arr;
},resyncLetters:function(){
var _578=0;
var _579=this.node.childNodes;
for(var i=0;i<_579.length;i++){
if(_579[i].nodeType==1){
if(_578<=23){
dojo.query("div",_579[i])[0].innerHTML=curam.matrix.Constants.columnLetters[_578];
}else{
dojo.query("div",_579[i])[0].innerHTML=curam.matrix.Constants.columnLetters[_578%23]+Math.floor(_578/23);
}
_578++;
}
}
},addPriority:function(){
var _57a=_570.byId("column-id-pri");
if(_57a){
_57a.destroy();
}
var _57b=dojo.create("div",{id:"column-id-pri","class":"column-id column-eval pri-col-eval",innerHTML:"<div>C</div>"},this.node,"first");
this.priorityCol=_57b;
this.priorityColText=dojo.query("> :first-child",this.priorityCol)[0];
this.priorityCol._conn=dojo.connect(this.priorityCol,"onclick",this,"createPriorityButtonWidget");
curam.matrix.util.initButtonListeners(_57b);
this.resyncLetters();
},addScore:function(){
var pos=this.matrix.priorityExists?1:0;
var _57c=_570.byId("column-id-scr");
if(_57c){
_57c.destroy();
}
var _57d=dojo.create("div",{id:"column-id-scr","class":"column-id column-eval pri-col-eval",innerHTML:"<div>D</div>"},this.node,pos);
this.scoreCol=_57d;
this.scoreColText=dojo.query("> :first-child",this.scoreCol)[0];
this.scoreCol._conn=dojo.connect(this.scoreCol,"onclick",this,"createScoreButtonWidget");
curam.matrix.util.initButtonListeners(_57d);
this.resyncLetters();
},addContradiction:function(){
var pos=0;
var c=curam.matrix.Constants.container;
if(this.matrix.priorityExists){
pos++;
}
if(this.matrix.scoreExists){
pos++;
}
var _57e=dojo.create("div",{id:"column-id-contr","class":"column-id column-eval contr-col-eval"},this.node,pos);
var _57f=dojo.create("div",{},_57e);
_57e.appendChild(this.addContrCombIdInput(1));
for(var i=0;i<c.locales.length;i++){
if(c.locales[i]==""){
continue;
}
_57e.appendChild(this.addContrCombMessageInput(1,c.locales[i],""));
}
this.contradictionCol=new curam.matrix.ContradictionColumn(_57e,true);
curam.matrix.util.initButtonListeners(_57e);
this.resyncLetters();
},addContrCombIdInput:function(_580){
var id=this.matrix.inputPrefix+"contrcombid."+_580;
return dojo.create("input",{id:id,name:id,type:"hidden"});
},addContrCombMessageInput:function(_581,_582,msg){
var id=this.matrix.inputPrefix+"contrmsg."+_582+"."+_581;
return dojo.create("input",{id:id,name:id,type:"hidden"});
},addOutcomeColumn:function(_583){
var _584=dojo.create("div",{id:"column-id-"+_583[0],"class":"column-id column-eval out-"+_583[0]+"-col-eval"},this.node,"last");
var _585=dojo.create("div",{},_584);
_584.appendChild(this.addOutCombIdInput(_583[0],1));
var _586=new curam.matrix.OutcomeColumn(_584,true);
this.outcomeCols.add(_586.node.id,_586);
this.resyncLetters();
return _586.setDimensions(_583[0]);
},addOutCombIdInput:function(_587,_588){
var id=this.matrix.inputPrefix+"outcombid."+_587+"."+_588;
return dojo.create("input",{id:id,name:id,type:"hidden",value:"1"+(new Date()).getTime()});
},deletePriorityColumn:function(){
dojo.destroy(this.priorityCol);
this.priorityCol=null;
this.priorityColText=null;
},deleteScoreColumn:function(){
dojo.destroy(this.scoreCol);
this.scoreCol=null;
this.scoreColText=null;
},deleteContradictionColumn:function(){
dojo.destroy(this.contradictionCol.node);
this.contradictionCol=null;
},deleteOutcomeColumn:function(id){
dojo.destroy(this.outcomeCols.getObjectByKey(id).node);
this.outcomeCols.removeByKey(id);
}});
});
},"dijit/_MenuBase":function(){
define("dijit/_MenuBase",["./popup","dojo/window","./_Widget","./_KeyNavContainer","./_TemplatedMixin","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/lang","dojo/_base/array"],function(pm,_589,_58a,_58b,_58c,_58d,dom,_58e,_58f,lang,_590){
return _58d("dijit._MenuBase",[_58a,_58c,_58b],{parentMenu:null,popupDelay:500,onExecute:function(){
},onCancel:function(){
},_moveToPopup:function(evt){
if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){
this.focusedChild._onClick(evt);
}else{
var _591=this._getTopMenu();
if(_591&&_591._isMenuBar){
_591.focusNext();
}
}
},_onPopupHover:function(){
if(this.currentPopup&&this.currentPopup._pendingClose_timer){
var _592=this.currentPopup.parentMenu;
if(_592.focusedChild){
_592.focusedChild._setSelected(false);
}
_592.focusedChild=this.currentPopup.from_item;
_592.focusedChild._setSelected(true);
this._stopPendingCloseTimer(this.currentPopup);
}
},onItemHover:function(item){
if(this.isActive){
this.focusChild(item);
if(this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer){
this.hover_timer=setTimeout(lang.hitch(this,"_openPopup"),this.popupDelay);
}
}
if(this.focusedChild){
this.focusChild(item);
}
this._hoveredChild=item;
},_onChildBlur:function(item){
this._stopPopupTimer();
item._setSelected(false);
var _593=item.popup;
if(_593){
this._stopPendingCloseTimer(_593);
_593._pendingClose_timer=setTimeout(function(){
_593._pendingClose_timer=null;
if(_593.parentMenu){
_593.parentMenu.currentPopup=null;
}
pm.close(_593);
},this.popupDelay);
}
},onItemUnhover:function(item){
if(this.isActive){
this._stopPopupTimer();
}
if(this._hoveredChild==item){
this._hoveredChild=null;
}
},_stopPopupTimer:function(){
if(this.hover_timer){
clearTimeout(this.hover_timer);
this.hover_timer=null;
}
},_stopPendingCloseTimer:function(_594){
if(_594._pendingClose_timer){
clearTimeout(_594._pendingClose_timer);
_594._pendingClose_timer=null;
}
},_stopFocusTimer:function(){
if(this._focus_timer){
clearTimeout(this._focus_timer);
this._focus_timer=null;
}
},_getTopMenu:function(){
for(var top=this;top.parentMenu;top=top.parentMenu){
}
return top;
},onItemClick:function(item,evt){
if(typeof this.isShowingNow=="undefined"){
this._markActive();
}
this.focusChild(item);
if(item.disabled){
return false;
}
if(item.popup){
this._openPopup();
}else{
this.onExecute();
item.onClick(evt);
}
},_openPopup:function(){
this._stopPopupTimer();
var _595=this.focusedChild;
if(!_595){
return;
}
var _596=_595.popup;
if(_596.isShowingNow){
return;
}
if(this.currentPopup){
this._stopPendingCloseTimer(this.currentPopup);
pm.close(this.currentPopup);
}
_596.parentMenu=this;
_596.from_item=_595;
var self=this;
pm.open({parent:this,popup:_596,around:_595.domNode,orient:this._orient||["after","before"],onCancel:function(){
self.focusChild(_595);
self._cleanUp();
_595._setSelected(true);
self.focusedChild=_595;
},onExecute:lang.hitch(this,"_cleanUp")});
this.currentPopup=_596;
if(this.popupHoverHandle){
this.disconnect(this.popupHoverHandle);
}
this.popupHoverHandle=this.connect(_596.domNode,"onmouseenter","_onPopupHover");
if(_596.focus){
_596._focus_timer=setTimeout(lang.hitch(_596,function(){
this._focus_timer=null;
this.focus();
}),0);
}
},_markActive:function(){
this.isActive=true;
_58f.replace(this.domNode,"dijitMenuActive","dijitMenuPassive");
},onOpen:function(){
this.isShowingNow=true;
this._markActive();
},_markInactive:function(){
this.isActive=false;
_58f.replace(this.domNode,"dijitMenuPassive","dijitMenuActive");
},onClose:function(){
this._stopFocusTimer();
this._markInactive();
this.isShowingNow=false;
this.parentMenu=null;
},_closeChild:function(){
this._stopPopupTimer();
if(this.currentPopup){
if(_590.indexOf(this._focusManager.activeStack,this.id)>=0){
_58e.set(this.focusedChild.focusNode,"tabIndex",this.tabIndex);
this.focusedChild.focusNode.focus();
}
pm.close(this.currentPopup);
this.currentPopup=null;
}
if(this.focusedChild){
this.focusedChild._setSelected(false);
this.focusedChild._onUnhover();
this.focusedChild=null;
}
},_onItemFocus:function(item){
if(this._hoveredChild&&this._hoveredChild!=item){
this._hoveredChild._onUnhover();
}
},_onBlur:function(){
this._cleanUp();
this.inherited(arguments);
},_cleanUp:function(){
this._closeChild();
if(typeof this.isShowingNow=="undefined"){
this._markInactive();
}
}});
});
},"curam/matrix/QuestionText":function(){
define("curam/matrix/QuestionText",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_597,dojo,_598){
dojo.provide("curam.matrix.QuestionText");
dojo.require("curam.matrix.Constants");
dojo.declare("curam.matrix.QuestionText",null,{constructor:function(node){
this.node=node;
this.text=dojo.query("> :first-child",node)[0];
this.originalTextHeight=null;
},verticallyCenterText:function(_599,_59a){
if(this.originalTextHeight==null){
this.originalTextHeight=dojo.contentBox(this.text).h;
}
var _59b=(_599/2)-(this.originalTextHeight/2);
curam.matrix.Constants.container.cssText.append(".matrix-container .bottom-left-main .").append("q-ct .qt-text-").append(_59a).append("-eval").append("{padding-top:").append(_59b).append("px;}");
}});
});
},"curam/util/Constants":function(){
define("curam/util/Constants",["curam/define"],function(){
curam.define.singleton("curam.util.Constants",{RETURN_PAGE_PARAM:"__o3rpu"});
return curam.util.Constants;
});
},"dijit/_TemplatedMixin":function(){
define("dijit/_TemplatedMixin",["dojo/_base/lang","dojo/touch","./_WidgetBase","dojo/string","dojo/cache","dojo/_base/array","dojo/_base/declare","dojo/dom-construct","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(lang,_59c,_59d,_59e,_59f,_5a0,_5a1,_5a2,has,_5a3,win){
var _5a4=_5a1("dijit._TemplatedMixin",null,{templateString:null,templatePath:null,_skipNodeCache:false,_earlyTemplatedStartup:false,constructor:function(){
this._attachPoints=[];
this._attachEvents=[];
},_stringRepl:function(tmpl){
var _5a5=this.declaredClass,_5a6=this;
return _59e.substitute(tmpl,this,function(_5a7,key){
if(key.charAt(0)=="!"){
_5a7=lang.getObject(key.substr(1),false,_5a6);
}
if(typeof _5a7=="undefined"){
throw new Error(_5a5+" template:"+key);
}
if(_5a7==null){
return "";
}
return key.charAt(0)=="!"?_5a7:_5a7.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
if(!this.templateString){
this.templateString=_59f(this.templatePath,{sanitize:true});
}
var _5a8=_5a4.getCachedTemplate(this.templateString,this._skipNodeCache);
var node;
if(lang.isString(_5a8)){
node=_5a2.toDom(this._stringRepl(_5a8));
if(node.nodeType!=1){
throw new Error("Invalid template: "+_5a8);
}
}else{
node=_5a8.cloneNode(true);
}
this.domNode=node;
this.inherited(arguments);
this._attachTemplateNodes(node,function(n,p){
return n.getAttribute(p);
});
this._beforeFillContent();
this._fillContent(this.srcNodeRef);
},_beforeFillContent:function(){
},_fillContent:function(_5a9){
var dest=this.containerNode;
if(_5a9&&dest){
while(_5a9.hasChildNodes()){
dest.appendChild(_5a9.firstChild);
}
}
},_attachTemplateNodes:function(_5aa,_5ab){
var _5ac=lang.isArray(_5aa)?_5aa:(_5aa.all||_5aa.getElementsByTagName("*"));
var x=lang.isArray(_5aa)?0:-1;
for(;x<_5ac.length;x++){
var _5ad=(x==-1)?_5aa:_5ac[x];
if(this.widgetsInTemplate&&(_5ab(_5ad,"dojoType")||_5ab(_5ad,"data-dojo-type"))){
continue;
}
var _5ae=_5ab(_5ad,"dojoAttachPoint")||_5ab(_5ad,"data-dojo-attach-point");
if(_5ae){
var _5af,_5b0=_5ae.split(/\s*,\s*/);
while((_5af=_5b0.shift())){
if(lang.isArray(this[_5af])){
this[_5af].push(_5ad);
}else{
this[_5af]=_5ad;
}
this._attachPoints.push(_5af);
}
}
var _5b1=_5ab(_5ad,"dojoAttachEvent")||_5ab(_5ad,"data-dojo-attach-event");
if(_5b1){
var _5b2,_5b3=_5b1.split(/\s*,\s*/);
var trim=lang.trim;
while((_5b2=_5b3.shift())){
if(_5b2){
var _5b4=null;
if(_5b2.indexOf(":")!=-1){
var _5b5=_5b2.split(":");
_5b2=trim(_5b5[0]);
_5b4=trim(_5b5[1]);
}else{
_5b2=trim(_5b2);
}
if(!_5b4){
_5b4=_5b2;
}
this._attachEvents.push(this.connect(_5ad,_59c[_5b2]||_5b2,_5b4));
}
}
}
}
},destroyRendering:function(){
_5a0.forEach(this._attachPoints,function(_5b6){
delete this[_5b6];
},this);
this._attachPoints=[];
_5a0.forEach(this._attachEvents,this.disconnect,this);
this._attachEvents=[];
this.inherited(arguments);
}});
_5a4._templateCache={};
_5a4.getCachedTemplate=function(_5b7,_5b8){
var _5b9=_5a4._templateCache;
var key=_5b7;
var _5ba=_5b9[key];
if(_5ba){
try{
if(!_5ba.ownerDocument||_5ba.ownerDocument==win.doc){
return _5ba;
}
}
catch(e){
}
_5a2.destroy(_5ba);
}
_5b7=_59e.trim(_5b7);
if(_5b8||_5b7.match(/\$\{([^\}]+)\}/g)){
return (_5b9[key]=_5b7);
}else{
var node=_5a2.toDom(_5b7);
if(node.nodeType!=1){
throw new Error("Invalid template: "+_5b7);
}
return (_5b9[key]=node);
}
};
if(has("ie")){
_5a3.addOnWindowUnload(function(){
var _5bb=_5a4._templateCache;
for(var key in _5bb){
var _5bc=_5bb[key];
if(typeof _5bc=="object"){
_5a2.destroy(_5bc);
}
delete _5bb[key];
}
});
}
lang.extend(_59d,{dojoAttachEvent:"",dojoAttachPoint:""});
return _5a4;
});
},"cm/_base/_dom":function(){
define("cm/_base/_dom",[],function(){
var cm=dojo.global.cm||{};
dojo.global.cm=cm;
dojo.mixin(cm,{nextSibling:function(node,_5bd){
return cm._findSibling(node,_5bd,true);
},prevSibling:function(node,_5be){
return cm._findSibling(node,_5be,false);
},getInput:function(name,_5bf){
if(!dojo.isString(name)){
return name;
}
var _5c0=dojo.query("input[name='"+name+"'],select[name='"+name+"']");
return _5bf?(_5c0.length>0?_5c0:null):(_5c0.length>0?_5c0[0]:null);
},getParentByClass:function(node,_5c1){
node=node.parentNode;
while(node){
if(dojo.hasClass(node,_5c1)){
return node;
}
node=node.parentNode;
}
return null;
},getParentByType:function(node,type){
node=node.parentNode;
type=type.toLowerCase();
var _5c2="html";
while(node){
if(node.tagName.toLowerCase()==_5c2){
break;
}
if(node.tagName.toLowerCase()==type){
return node;
}
node=node.parentNode;
}
return null;
},replaceClass:function(node,_5c3,_5c4){
dojo.removeClass(node,_5c4);
dojo.addClass(node,_5c3);
},setClass:function(node,_5c5){
node=dojo.byId(node);
var cs=new String(_5c5);
try{
if(typeof node.className=="string"){
node.className=cs;
}else{
if(node.setAttribute){
node.setAttribute("class",_5c5);
node.className=cs;
}else{
return false;
}
}
}
catch(e){
dojo.debug("dojo.html.setClass() failed",e);
}
return true;
},_findSibling:function(node,_5c6,_5c7){
if(!node){
return null;
}
if(_5c6){
_5c6=_5c6.toLowerCase();
}
var _5c8=_5c7?"nextSibling":"previousSibling";
do{
node=node[_5c8];
}while(node&&node.nodeType!=1);
if(node&&_5c6&&_5c6!=node.tagName.toLowerCase()){
return cm[_5c7?"nextSibling":"prevSibling"](node,_5c6);
}
return node;
},getViewport:function(){
var d=dojo.doc,dd=d.documentElement,w=window,b=dojo.body();
if(dojo.isMozilla){
return {w:dd.clientWidth,h:w.innerHeight};
}else{
if(!dojo.isOpera&&w.innerWidth){
return {w:w.innerWidth,h:w.innerHeight};
}else{
if(!dojo.isOpera&&dd&&dd.clientWidth){
return {w:dd.clientWidth,h:dd.clientHeight};
}else{
if(b.clientWidth){
return {w:b.clientWidth,h:b.clientHeight};
}
}
}
}
return null;
},toggleDisplay:function(node){
dojo.style(node,"display",dojo.style(node,"display")=="none"?"":"none");
},endsWith:function(str,end,_5c9){
if(_5c9){
str=str.toLowerCase();
end=end.toLowerCase();
}
if((str.length-end.length)<0){
return false;
}
return str.lastIndexOf(end)==str.length-end.length;
},hide:function(n){
dojo.style(n,"display","none");
},show:function(n){
dojo.style(n,"display","");
}});
return cm;
});
},"dojo/window":function(){
define("dojo/window",["./_base/lang","./_base/sniff","./_base/window","./dom","./dom-geometry","./dom-style"],function(lang,has,_5ca,dom,geom,_5cb){
var _5cc=lang.getObject("dojo.window",true);
_5cc.getBox=function(){
var _5cd=(_5ca.doc.compatMode=="BackCompat")?_5ca.body():_5ca.doc.documentElement,_5ce=geom.docScroll(),w,h;
if(has("touch")){
var _5cf=_5ca.doc.parentWindow||_5ca.doc.defaultView;
w=_5cf.innerWidth||_5cd.clientWidth;
h=_5cf.innerHeight||_5cd.clientHeight;
}else{
w=_5cd.clientWidth;
h=_5cd.clientHeight;
}
return {l:_5ce.x,t:_5ce.y,w:w,h:h};
};
_5cc.get=function(doc){
if(has("ie")&&_5cc!==document.parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc.parentWindow||doc.defaultView;
};
_5cc.scrollIntoView=function(node,pos){
try{
node=dom.byId(node);
var doc=node.ownerDocument||_5ca.doc,body=doc.body||_5ca.body(),html=doc.documentElement||body.parentNode,isIE=has("ie"),isWK=has("webkit");
if((!(has("mozilla")||isIE||isWK||has("opera"))||node==body||node==html)&&(typeof node.scrollIntoView!="undefined")){
node.scrollIntoView(false);
return;
}
var _5d0=doc.compatMode=="BackCompat",_5d1=(isIE>=9&&node.ownerDocument.parentWindow.frameElement)?((html.clientHeight>0&&html.clientWidth>0&&(body.clientHeight==0||body.clientWidth==0||body.clientHeight>html.clientHeight||body.clientWidth>html.clientWidth))?html:body):(_5d0?body:html),_5d2=isWK?body:_5d1,_5d3=_5d1.clientWidth,_5d4=_5d1.clientHeight,rtl=!geom.isBodyLtr(),_5d5=pos||geom.position(node),el=node.parentNode,_5d6=function(el){
return ((isIE<=6||(isIE&&_5d0))?false:(_5cb.get(el,"position").toLowerCase()=="fixed"));
};
if(_5d6(node)){
return;
}
while(el){
if(el==body){
el=_5d2;
}
var _5d7=geom.position(el),_5d8=_5d6(el);
if(el==_5d2){
_5d7.w=_5d3;
_5d7.h=_5d4;
if(_5d2==html&&isIE&&rtl){
_5d7.x+=_5d2.offsetWidth-_5d7.w;
}
if(_5d7.x<0||!isIE){
_5d7.x=0;
}
if(_5d7.y<0||!isIE){
_5d7.y=0;
}
}else{
var pb=geom.getPadBorderExtents(el);
_5d7.w-=pb.w;
_5d7.h-=pb.h;
_5d7.x+=pb.l;
_5d7.y+=pb.t;
var _5d9=el.clientWidth,_5da=_5d7.w-_5d9;
if(_5d9>0&&_5da>0){
_5d7.w=_5d9;
_5d7.x+=(rtl&&(isIE||el.clientLeft>pb.l))?_5da:0;
}
_5d9=el.clientHeight;
_5da=_5d7.h-_5d9;
if(_5d9>0&&_5da>0){
_5d7.h=_5d9;
}
}
if(_5d8){
if(_5d7.y<0){
_5d7.h+=_5d7.y;
_5d7.y=0;
}
if(_5d7.x<0){
_5d7.w+=_5d7.x;
_5d7.x=0;
}
if(_5d7.y+_5d7.h>_5d4){
_5d7.h=_5d4-_5d7.y;
}
if(_5d7.x+_5d7.w>_5d3){
_5d7.w=_5d3-_5d7.x;
}
}
var l=_5d5.x-_5d7.x,t=_5d5.y-Math.max(_5d7.y,0),r=l+_5d5.w-_5d7.w,bot=t+_5d5.h-_5d7.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
if(rtl&&((isIE==8&&!_5d0)||isIE>=9)){
s=-s;
}
_5d5.x+=el.scrollLeft;
el.scrollLeft+=s;
_5d5.x-=el.scrollLeft;
}
if(bot*t>0){
_5d5.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_5d5.y-=el.scrollTop;
}
el=(el!=_5d2)&&!_5d8&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
};
require(["dojo/_base/sniff","dojo/on"],function(has,on){
if(has("ie")==8){
var _5db=screen.deviceXDPI;
setInterval(function(){
if(screen.deviceXDPI!=_5db){
_5db=screen.deviceXDPI;
on.emit(_5ca.global,"resize");
}
},250);
}
});
return _5cc;
});
},"curam/util/ResourceBundle":function(){
define("curam/util/ResourceBundle",["dojo/i18n","dojo/string"],function(i18n,_5dc){
var _5dd=dojo.declare("curam.util.ResourceBundle",null,{_bundle:undefined,constructor:function(_5de,_5df){
var _5e0=_5de.split(".");
var _5e1=_5e0[_5e0.length-1];
var _5e2=_5e0.length==1?"curam.application":_5de.slice(0,_5de.length-_5e1.length-1);
try{
var b=i18n.getLocalization(_5e2,_5e1,_5df);
if(this._isEmpty(b)){
throw new Error("Empty resource bundle.");
}else{
this._bundle=b;
}
}
catch(e){
throw new Error("Unable to access resource bundle: "+_5e2+"."+_5e1+": "+e.message);
}
},_isEmpty:function(_5e3){
for(var prop in _5e3){
return false;
}
return true;
},getProperty:function(key,_5e4){
var msg=this._bundle[key];
var _5e5=msg;
if(_5e4){
_5e5=_5dc.substitute(msg,_5e4);
}
return _5e5;
}});
return _5dd;
});
},"curam/matrix/BottomLeftFiller":function(){
define("curam/matrix/BottomLeftFiller",["dijit","dojo","dojox"],function(_5e6,dojo,_5e7){
dojo.provide("curam.matrix.BottomLeftFiller");
dojo.declare("curam.matrix.BottomLeftFiller",null,{constructor:function(){
this.node=dojo.byId("bottom-left-filler");
this.bottomLeftFillerMain=dojo.byId("bottom-left-filler-main");
this.bottomLeftNumberFiller=dojo.byId("bottom-left-filler-number");
},setDimensions:function(){
this.height=curam.matrix.Constants.container.scrollBarWidth;
curam.matrix.Constants.container.cssText.append(".matrix-container .bottom-left-filler-eval{height:").append(this.height).append("px;}.matrix-container .bottom-left-number-filler-eval{height:").append(this.height).append("px;}");
}});
});
},"curam/matrix/QuestionRight":function(){
define("curam/matrix/QuestionRight",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_5e8,dojo,_5e9){
dojo.provide("curam.matrix.QuestionRight");
dojo.require("curam.matrix.Constants");
dojo.declare("curam.matrix.QuestionRight",null,{constructor:function(node,_5ea){
this.node=node;
this.matrix=_5ea;
this.qId=this.node.id.replace("qr-","");
this.priorityGroup=null;
this.scoreGroup=null;
this.contradiction=null;
this.outcomeGroup=new curam.ListMap();
var _5eb=dojo.query("> :first-child",node)[0];
if(this.matrix.priorityExists){
this.priorityGroup=new curam.matrix.PriorityGroup(_5eb,this.matrix);
_5eb=cm.nextSibling(_5eb);
}
if(this.matrix.scoreExists){
this.scoreGroup=new curam.matrix.ScoreGroup(_5eb);
_5eb=cm.nextSibling(_5eb);
}
if(this.matrix.contradictionsExist){
this.contradiction=new curam.matrix.Contradiction(_5eb);
_5eb=cm.nextSibling(_5eb);
}
if(this.matrix.outcomesExist){
while(_5eb!=null){
this.outcomeGroup.add(_5eb.id,new curam.matrix.Outcome(_5eb));
_5eb=cm.nextSibling(_5eb);
}
}
},refreshContradictions:function(){
if(!this.contradiction){
return;
}
this.contradiction=new curam.matrix.Contradiction(this.contradiction.node);
},refreshOutcomes:function(){
if(!this.outcomeGroup){
return;
}
var _5ec=this.outcomeGroup;
this.outcomeGroup=new curam.ListMap();
for(var _5ed=0;_5ed<_5ec.keys.length;_5ed++){
var key=_5ec.keys[_5ed];
this.outcomeGroup.add(key,new curam.matrix.Outcome(_5ec.getObjectByKey(key).node));
}
},positionPriority:function(_5ee){
if(_5ee.ansHeightGreaterThanDefault){
var _5ef=(_5ee.ansHeight/2)-(curam.matrix.Constants.container.ansValInputHeight/2);
curam.matrix.Constants.container.cssText.append(".matrix-container .pri-eval-").append(this.qId).append("{margin-top:").append(_5ef).append("px;}");
}
},positionCombinationCells:function(_5f0){
var c=curam.matrix.Constants.container;
if(_5f0.ansHeightGreaterThanDefault){
var top=(_5f0.ansHeight-c.cboxHeight-c.cboxOffsetDiff)/2;
c.cssText.append(".matrix-container .cbox-eval-").append(this.qId).append("{top:").append(top).append("px;}");
}
},addAnswer:function(){
var c=curam.matrix.Constants.container;
var _5f1=c.matrix.bottomRight;
var ql=c.matrix.getQuestion(this.qId);
var _5f2=c.matrix.bottomLeft.bottomLeftMain.questions.getObjectByIndex(0);
var _5f3=ql.ansGroup.getLastAddedAnswerId();
var _5f4=ql.node.id==_5f2.node.id?true:false;
var _5f5;
if(this.matrix.priorityExists){
this.priorityGroup.addPriority(_5f1.addPriority(this.qId,_5f3,false));
}
if(this.matrix.scoreExists){
this.scoreGroup.node.appendChild(_5f1.addScore(this.qId,_5f3,false));
}
if(this.matrix.contradictionsExist){
this.contradiction.node.appendChild(_5f1.addContradictionRow(this.qId,_5f3,_5f4,false));
this.refreshContradictions();
}
if(this.matrix.outcomesExist){
for(var i=0;i<this.outcomeGroup.count;i++){
_5f5=c.matrix.topRight.topRightTop.outcomeCols.getObjectByIndex(i).outId;
this.outcomeGroup.getObjectByIndex(i).node.appendChild(_5f1.addOutcomeRow(_5f5,this.qId,_5f3,_5f4,false));
}
this.refreshOutcomes();
}
},deleteAnswer:function(_5f6,_5f7){
var cell;
if(this.matrix.priorityExists){
var _5f8="pri-"+this.qId+"-"+_5f7;
this.priorityGroup.priorities.removeByKey(_5f8);
if(_5f6){
dojo.removeClass(this.priorityGroup.priorities.getObjectByIndex(0).node,"ans");
}
dojo.destroy(dojo.byId(_5f8));
}
if(this.matrix.scoreExists){
var _5f9="scr-"+this.qId+"-"+_5f7;
this.scoreGroup.scores.removeByKey(_5f8);
if(_5f6){
dojo.removeClass(this.scoreGroup.scores.getObjectByIndex(0).node,"ans");
}
dojo.destroy(dojo.byId(_5f9));
}
if(this.matrix.contradictionsExist){
var _5fa="contr-row-"+this.qId+"-"+_5f7;
this.contradiction.rows.removeByKey(_5fa);
if(_5f6){
var _5fb=this.contradiction.rows.getObjectByIndex(0).cells;
for(var i=0;i<_5fb.count;i++){
cell=_5fb.getObjectByIndex(i).node;
dojo.addClass(cell,"cell-first-row");
if(i==_5fb.count-1){
dojo.removeClass(cell,"cell-last-col");
dojo.addClass(cell,"cell-no-border");
}else{
dojo.removeClass(cell,"cell");
}
}
}
dojo.destroy(dojo.byId(_5fa));
}
if(this.matrix.outcomesExist){
var _5fc,_5fd,_5fe,_5ff=/.*-/;
var _600=curam.matrix.util.safeSplit;
for(var _601=0;_601<this.outcomeGroup.count;_601++){
_5fd=this.outcomeGroup.getObjectByIndex(_601);
_5fe=_600(_5fd.node.id,"-")[1];
_5fc="out-"+_5fe+"-row-"+this.qId+"-"+_5f7;
_5fd.rows.removeByKey(_5fc);
for(var j=0;j<_5fd.rows.getObjectByIndex(0).cells.count;j++){
cell=_5fd.rows.getObjectByIndex(0).cells.getObjectByIndex(j).node;
dojo.addClass(cell,"cell-first-row");
if(j==_5fd.rows.getObjectByIndex(0).cells.count-1){
dojo.removeClass(cell,"cell-last-col");
dojo.addClass(cell,"cell-no-border");
}else{
dojo.removeClass(cell,"cell");
}
}
dojo.destroy(dojo.byId(_5fc));
}
}
},getContradictionCount:function(){
var _602=this.contradiction.rows.getObjectByIndex(0);
if(_602){
return _602.cells.count;
}
return 0;
},getOutcome:function(_603){
return this.outcomeGroup.getObjectByKey("out-"+_603+"-"+this.qId);
}});
});
},"curam/util":function(){
define("curam/util",["dojo/dom","dijit/registry","dojo/dom-construct","dojo/ready","dojo/_base/window","dojo/dom-style","dojo/_base/array","dojo/dom-class","dojo/topic","dojo/_base/event","dojo/query","dojo/has","dojo/_base/unload","dojo/dom-geometry","dojo/_base/json","dojo/dom-attr","dojo/_base/lang","dojo/on","dijit/_BidiSupport","curam/define","curam/debug","curam/util/RuntimeContext","curam/util/Constants","dojo/_base/sniff","cm/_base/_dom","curam/util/ResourceBundle"],function(dom,_604,_605,_606,_607,_608,_609,_60a,_60b,_60c,_60d,has,_60e,geom,json,attr,lang,on,bidi){
dojo.requireLocalization("curam.application","Debug");
var _60f=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util",{PREVENT_CACHE_FLAG:"o3pc",INFORMATIONAL_MSGS_STORAGE_ID:"__informationals__",ERROR_MESSAGES_CONTAINER:"error-messages-container",ERROR_MESSAGES_LIST:"error-messages",CACHE_BUSTER:0,CACHE_BUSTER_PARAM_NAME:"o3nocache",msgLocaleSelectorActionPage:"$not-locaized$ Usage of the Language Selector is not permitted from an editable page that has previously been submitted.",insertCssText:function(_610,_611){
var id=_611?_611:"_runtime_stylesheet_";
var _612=dom.byId(id);
var _613;
if(_612){
if(_612.styleSheet){
_610=_612.styleSheet.cssText+_610;
_613=_612;
_613.setAttribute("id","_nodeToRm");
}else{
_612.appendChild(document.createTextNode(_610));
return;
}
}
var pa=document.getElementsByTagName("head")[0];
_612=_605.create("style",{type:"text/css",id:id});
if(_612.styleSheet){
_612.styleSheet.cssText=_610;
}else{
_612.appendChild(document.createTextNode(_610));
}
pa.appendChild(_612);
if(_613){
_613.parentNode.removeChild(_613);
}
},fireRefreshTreeEvent:function(){
if(dojo.global.parent&&dojo.global.parent.amIFrame){
var wpl=dojo.global.parent.loader;
}
if(wpl&&wpl.dojo){
wpl.dojo.publish("refreshTree");
}
},firePageSubmittedEvent:function(_614){
require(["curam/tab"],function(){
var _615=curam.tab.getSelectedTab();
if(_615){
var _616=curam.tab.getTabWidgetId(_615);
var _617=curam.util.getTopmostWindow();
var ctx=(_614=="dialog")?curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_DIALOG:curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN;
_617.curam.util.Refresh.getController(_616).pageSubmitted(dojo.global.jsPageID,ctx);
_617.dojo.publish("/curam/main-content/page/submitted",[dojo.global.jsPageID,_616]);
}else{
curam.debug.log("/curam/main-content/page/submitted: "+_60f.getProperty("curam.util.no.open"));
}
});
},fireTabOpenedEvent:function(_618){
curam.util.getTopmostWindow().dojo.publish("curam.tabOpened",[dojo.global.jsPageID,_618]);
},setupSubmitEventPublisher:function(){
_606(function(){
var form=dom.byId("mainForm");
if(form){
curam.util.connect(form,"onsubmit",function(){
curam.util.firePageSubmittedEvent("main-content");
});
}
});
},getScrollbar:function(){
var _619=_605.create("div",{},_607.body());
_608.set(_619,{width:"100px",height:"100px",overflow:"scroll",position:"absolute",top:"-300px",left:"0px"});
var test=_605.create("div",{},_619);
_608.set(test,{width:"400px",height:"400px"});
var _61a=_619.offsetWidth-_619.clientWidth;
_605.destroy(_619);
return {width:_61a};
},isModalWindow:function(){
return (dojo.global.curamModal===undefined)?false:true;
},getTopmostWindow:function(){
if(typeof (dojo.global._curamTopmostWindow)=="undefined"){
var _61b=dojo.global;
if(typeof (dojo.global.jsScreenContext)!="undefined"&&dojo.global.jsScreenContext.hasContextBits("CONTEXT_PORTLET")){
dojo.global._curamTopmostWindow=_61b;
}else{
if(_61b.__extAppTopWin){
dojo.global._curamTopmostWindow=_61b;
}else{
while(_61b.parent!=_61b){
_61b=_61b.parent;
if(_61b.__extAppTopWin){
break;
}
}
dojo.global._curamTopmostWindow=_61b;
}
}
}
if(dojo.global._curamTopmostWindow.location.href.indexOf("AppController.do")<0&&typeof (dojo.global._curamTopmostWindow.__extAppTopWin)=="undefined"){
curam.debug.log(_60f.getProperty("curam.util.wrong.window")+dojo.global._curamTopmostWindow.location.href);
}
return dojo.global._curamTopmostWindow;
},getUrlParamValue:function(url,_61c){
var qPos=url.indexOf("?");
if(qPos<0){
return null;
}
var _61d=url.substring(qPos+1,url.length);
function _61e(_61f){
var _620=_61d.split(_61f);
_61c+="=";
for(var i=0;i<_620.length;i++){
if(_620[i].indexOf(_61c)==0){
return _620[i].split("=")[1];
}
}
};
return _61e("&")||_61e("");
},addUrlParam:function(href,_621,_622,_623){
var hasQ=href.indexOf("?")>-1;
var _624=_623?_623:"undefined";
if(!hasQ||(_624==false)){
return href+(hasQ?"&":"?")+_621+"="+_622;
}else{
var _625=href.split("?");
href=_625[0]+"?"+_621+"="+_622+(_625[1]!=""?("&"+_625[1]):"");
return href;
}
},replaceUrlParam:function(href,_626,_627){
href=curam.util.removeUrlParam(href,_626);
return curam.util.addUrlParam(href,_626,_627);
},removeUrlParam:function(url,_628,_629){
var qPos=url.indexOf("?");
if(qPos<0){
return url;
}
if(url.indexOf(_628+"=")<0){
return url;
}
var _62a=url.substring(qPos+1,url.length);
var _62b=_62a.split("&");
var _62c;
var _62d,_62e;
for(var i=0;i<_62b.length;i++){
if(_62b[i].indexOf(_628+"=")==0){
_62e=false;
if(_629){
_62d=_62b[i].split("=");
if(_62d.length>1){
if(_62d[1]==_629){
_62e=true;
}
}else{
if(_629==""){
_62e=true;
}
}
}else{
_62e=true;
}
if(_62e){
_62b.splice(i,1);
i--;
}
}
}
return url.substring(0,qPos+1)+_62b.join("&");
},stripHash:function(url){
var idx=url.indexOf("#");
if(idx<0){
return url;
}
return url.substring(0,url);
},isSameUrl:function(_62f,_630,rtc){
if(!_630){
_630=rtc.getHref();
}
if(_62f.indexOf("#")==0){
return true;
}
var _631=_62f.indexOf("#");
if(_631>-1){
if(_631==0){
return true;
}
var _632=_62f.split("#");
var _633=_630.indexOf("#");
if(_633>-1){
if(_633==0){
return true;
}
_630=_630.split("#")[0];
}
return _632[0]==_630;
}
var _634=function(url){
var idx=url.lastIndexOf("Page.do");
var len=7;
if(idx<0){
idx=url.lastIndexOf("Action.do");
len=9;
}
if(idx<0){
idx=url.lastIndexOf("Frame.do");
len=8;
}
if(idx>-1&&idx==url.length-len){
return url.substring(0,idx);
}
return url;
};
var rp=curam.util.removeUrlParam;
var here=curam.util.stripHash(rp(_630,curam.util.Constants.RETURN_PAGE_PARAM));
var _635=curam.util.stripHash(rp(_62f,curam.util.Constants.RETURN_PAGE_PARAM));
var _636=_635.split("?");
var _637=here.split("?");
_637[0]=_634(_637[0]);
_636[0]=_634(_636[0]);
var _638=(_637[0]==_636[0]||_637[0].match(_636[0]+"$")==_636[0]);
if(!_638){
return false;
}
if(_637.length==1&&_636.length==1&&_638){
return true;
}else{
var _639;
var _63a;
if(typeof _637[1]!="undefined"&&_637[1]!=""){
_639=_637[1].split("&");
}else{
_639=new Array();
}
if(typeof _636[1]!="undefined"&&_636[1]!=""){
_63a=_636[1].split("&");
}else{
_63a=new Array();
}
curam.debug.log("curam.util.isSameUrl: paramsHere "+_60f.getProperty("curam.util.before")+_639.length);
_639=_609.filter(_639,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_60f.getProperty("curam.util.after")+_639.length);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_60f.getProperty("curam.util.before")+_63a.length);
_63a=_609.filter(_63a,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_60f.getProperty("curam.util.after")+_63a.length);
if(_639.length!=_63a.length){
return false;
}
var _63b={};
var _63c;
for(var i=0;i<_639.length;i++){
_63c=_639[i].split("=");
_63b[_63c[0]]=_63c[1];
}
for(var i=0;i<_63a.length;i++){
_63c=_63a[i].split("=");
if(_63b[_63c[0]]!=_63c[1]){
curam.debug.log(_60f.getProperty("curam.util.no.match",[_63c[0],_63c[1],_63b[_63c[0]]]));
return false;
}
}
}
return true;
},isNotCDEJParam:function(_63d){
return !((_63d.charAt(0)=="o"&&_63d.charAt(1)=="3")||(_63d.charAt(0)=="_"&&_63d.charAt(1)=="_"&&_63d.charAt(2)=="o"&&_63d.charAt(3)=="3"));
},setAttributes:function(node,map){
for(var x in map){
node.setAttribute(x,map[x]);
}
},invalidatePage:function(){
curam.PAGE_INVALIDATED=true;
var _63e=dojo.global.dialogArguments?dojo.global.dialogArguments[0]:opener;
if(_63e&&_63e!=dojo.global){
try{
_63e.curam.util.invalidatePage();
}
catch(e){
curam.debug.log(_60f.getProperty("curam.util.error"),e);
}
}
},redirectWindow:function(href,_63f,_640){
var rtc=new curam.util.RuntimeContext(dojo.global);
var _641=function(_642,_643,href,_644,_645){
curam.util.getFrameRoot(_642,_643).curam.util.redirectContentPanel(href,_644,_645);
};
curam.util._doRedirectWindow(href,_63f,_640,dojo.global.jsScreenContext,rtc,curam.util.publishRefreshEvent,_641);
},_doRedirectWindow:function(href,_646,_647,_648,rtc,_649,_64a){
if(href&&curam.util.isActionPage(href)){
curam.debug.log(_60f.getProperty("curam.util.stopping"),href);
return;
}
var rpl=curam.util.replaceUrlParam;
var _64b=_648.hasContextBits("TREE")||_648.hasContextBits("AGENDA")||_648.hasContextBits("ORG_TREE");
if(curam.util.FORCE_REFRESH){
href=rpl(rtc.getHref(),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
if(curam.util.isModalWindow()||_64b){
_649();
dojo.global.location.href=href;
}else{
if(_648.hasContextBits("LIST_ROW_INLINE_PAGE")||_648.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(href);
}else{
_649();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
require(["curam/tab"],function(){
_64a(dojo.global,curam.tab.getTabController().ROOT_OBJ,href,true,true);
});
}
}
}
return;
}
var u=curam.util;
var rtc=new curam.util.RuntimeContext(dojo.global);
if(!_64b&&!_646&&!curam.PAGE_INVALIDATED&&u.isSameUrl(href,null,rtc)){
return;
}
if(curam.util.isModalWindow()||_64b){
href=rpl(rpl(href,"o3frame","modal"),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
var form=_605.create("form",{action:href,method:"POST"});
if(!_64b){
if(!dom.byId("o3ctx")){
form.action=curam.util.removeUrlParam(form.action,"o3ctx");
var _64c=_605.create("input",{type:"hidden",id:"o3ctx",name:"o3ctx",value:_648.getValue()},form);
}
_607.body().appendChild(form);
_649();
form.submit();
}
if(!_647){
if(_64b){
curam.util.redirectFrame(href);
}
}
}else{
if(_648.hasContextBits("LIST_ROW_INLINE_PAGE")||_648.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(href);
}else{
_649();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
if(_648.hasContextBits("EXTAPP")){
var _64d=window.top;
_64d.dijit.byId("curam-app").updateMainContentIframe(href);
}else{
require(["curam/tab"],function(){
curam.util.getFrameRoot(dojo.global,curam.tab.getTabController().ROOT_OBJ).curam.util.redirectContentPanel(href,_646);
});
}
}
}
}
},_handleInlinePageRefresh:function(href){
curam.debug.log(_60f.getProperty("curam.util.closing.modal"),href);
var _64e=new curam.ui.PageRequest(href);
require(["curam/tab"],function(){
curam.tab.getTabController().checkPage(_64e,function(_64f){
curam.util.publishRefreshEvent();
dojo.global.location.reload(true);
});
});
},redirectContentPanel:function(url,_650,_651){
require(["curam/tab"],function(){
var _652=curam.tab.getContentPanelIframe();
var _653=url;
if(_652!=null){
var rpu=curam.util.Constants.RETURN_PAGE_PARAM;
var _654=null;
if(url.indexOf(rpu+"=")>=0){
curam.debug.log("curam.util.redirectContentPanel: "+_60f.getProperty("curam.util.rpu"));
_654=decodeURIComponent(curam.util.getUrlParamValue(url,rpu));
}
if(_654){
_654=curam.util.removeUrlParam(_654,rpu);
_653=curam.util.replaceUrlParam(url,rpu,encodeURIComponent(_654));
}
}
var _655=new curam.ui.PageRequest(_653);
if(_650){
_655.forceLoad=true;
}
if(_651){
_655.justRefresh=true;
}
curam.tab.getTabController().handlePageRequest(_655);
});
},redirectFrame:function(href){
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
var _656=curam.util.getFrameRoot(dojo.global,"wizard").targetframe;
_656.curam.util.publishRefreshEvent();
_656.location.href=href;
}else{
if(dojo.global.jsScreenContext.hasContextBits("ORG_TREE")){
var _656=curam.util.getFrameRoot(dojo.global,"orgTreeRoot");
_656.curam.util.publishRefreshEvent();
_656.dojo.publish("orgTree.refreshContent",[href]);
}else{
var _657=curam.util.getFrameRoot(dojo.global,"iegtree");
var _658=_657.navframe||_657.frames[0];
var _659=_657.contentframe||_657.frames["contentframe"];
_659.curam.util.publishRefreshEvent();
if(curam.PAGE_INVALIDATED||_658.curam.PAGE_INVALIDATED){
var _65a=curam.util.modifyUrlContext(href,"ACTION");
_659.location.href=_65a;
}else{
_659.location.href=href;
}
}
}
return true;
},publishRefreshEvent:function(){
_60b.publish("/curam/page/refresh");
},openGenericErrorModalDialog:function(_65b,_65c,_65d,_65e,_65f){
var url;
var _660;
var sc=new curam.util.ScreenContext("MODAL");
var _661="titlePropertyName="+_65c+"&";
var _662="messagePropertyName="+_65d+"&";
var _663="errorModal="+_65f+"&";
if(_65e){
_660="messagePlaceholder1="+_65e+"&";
url="generic-modal-error.jspx?"+_661+_662+_660+_663+sc.toRequestString();
}else{
url="generic-modal-error.jspx?"+_661+_662+sc.toRequestString();
}
curam.util.openModalDialog({href:url},_65b);
},openModalDialog:function(_664,_665,left,top,_666){
var href;
if(!_664||!_664.href){
_664=_60c.fix(_664);
var _667=_664.target;
while(_667.tagName!="A"&&_667!=_607.body()){
_667=_667.parentNode;
}
href=_667.href;
_667._isModal=true;
_60c.stop(_664);
}else{
href=_664.href;
_664._isModal=true;
}
require(["curam/dialog"]);
var opts=curam.dialog.parseWindowOptions(_665);
curam.util.showModalDialog(href,_664,opts["width"],opts["height"],left,top,false,null,null,_666);
return false;
},showModalDialog:function(url,_668,_669,_66a,left,top,_66b,_66c,_66d,_66e){
var _66f=curam.util.getTopmostWindow();
if(dojo.global!=_66f){
curam.debug.log("curam.util.showModalDialog: "+_60f.getProperty("curam.util.redirecting.modal"));
_66f.curam.util.showModalDialog(url,_668,_669,_66a,left,top,_66b,_66c,dojo.global,_66e);
return;
}
var rup=curam.util.replaceUrlParam;
url=rup(url,"o3frame","modal");
url=curam.util.modifyUrlContext(url,"MODAL","TAB|LIST_ROW_INLINE_PAGE|LIST_EVEN_ROW|NESTED_UIM");
url=rup(url,curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
curam.debug.log(_60f.getProperty("curam.util.modal.url"),url);
if(_669){
_669=typeof (_669)=="number"?_669:parseInt(_669);
}
if(_66a){
_66a=typeof (_66a)=="number"?_66a:parseInt(_66a);
}
if(!curam.util._isModalCurrentlyOpening()){
curam.util._setModalCurrentlyOpening(true);
require(["curam/ModalDialog"]);
new curam.ModalDialog({href:url,width:_669,height:_66a,openNode:(_668&&_668.target)?_668.target:null,parentWindow:_66d,uimToken:_66e});
}
},_isModalCurrentlyOpening:function(){
return curam.util.getTopmostWindow().curam.util._modalOpenInProgress;
},_setModalCurrentlyOpening:function(_670){
curam.util.getTopmostWindow().curam.util._modalOpenInProgress=_670;
},setupPreferencesLink:function(href){
_606(function(){
var _671=_60d(".user-preferences")[0];
if(_671){
if(typeof (_671._disconnectToken)=="undefined"){
_671._disconnectToken=curam.util.connect(_671,"onclick",curam.util.openPreferences);
}
if(!href){
href=dojo.global.location.href;
}
if(curam.util.isActionPage(href)){
_60a.replace(_671,"disabled","enabled");
_671._curamDisable=true;
}else{
_60a.replace(_671,"enabled","disabled");
_671._curamDisable=false;
}
}else{
curam.debug.log(_60f.getProperty("curam.util.no.setup"));
}
});
},openPreferences:function(_672){
_60c.stop(_672);
if(_672.target._curamDisable){
return;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("user-prefs-editor.jspx",{dialogOptions:"width=450"});
});
},openAbout:function(_673){
_60c.stop(_673);
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("about.jsp",{dialogOptions:"width=645,height=480"});
});
},addMinWidthCalendarCluster:function(id){
var _674=dom.byId(id);
var i=0;
function _675(evt){
_609.forEach(_674.childNodes,function(node){
if(_60a.contains(node,"cluster")){
_608.set(node,"width","97%");
if(node.clientWidth<700){
_608.set(node,"width","700px");
}
}
});
};
if(has("ie")>6){
_609.forEach(_674.childNodes,function(node){
if(_60a.contains(node,"cluster")){
_608.set(node,"minWidth","700px");
}
});
}else{
on(dojo.global,"resize",_675);
_606(_675);
}
},addPopupFieldListener:function(id){
if(!has("ie")||has("ie")>6){
return;
}
if(!curam.util._popupFields){
function _676(evt){
var _677=0;
var j=0;
var x=0;
var arr=curam.util._popupFields;
_609.forEach(curam.util._popupFields,function(id){
var _678=dom.byId(id);
_60d("> .popup-actions",_678).forEach(function(node){
_677=node.clientWidth+30;
});
_60d("> .desc",_678).forEach(function(node){
_608.set(node,"width",Math.max(0,_678.clientWidth-_677)+"px");
});
});
};
curam.util._popupFields=[id];
on(dojo.global,"resize",_676);
_606(_676);
}else{
curam.util._popupFields.push(id);
}
},addContentWidthListener:function(id){
if(has("ie")>6){
return;
}
var _679=_608.set;
var _67a=_60a.contains;
function _67b(evt){
var i=0;
var _67c=dom.byId("content");
if(_67c){
var _67d=_67c.clientWidth;
if(has("ie")==6&&dom.byId("footer")){
var _67e=_607.body().clientHeight-100;
_679(_67c,"height",_67e+"px");
var _67f=dom.byId("sidebar");
if(_67f){
_679(_67f,"height",_67e+"px");
}
}
try{
_60d("> .page-title-bar",_67c).forEach(function(node){
var _680=geom.getMarginSize(node).w-geom.getContentBox(node).w;
if(!has("ie")){
_680+=1;
}
_67d=_67c.clientWidth-_680;
_608.set(node,"width",_67d+"px");
});
}
catch(e){
}
_60d("> .page-description",_67c).style("width",_67d+"px");
_60d("> .in-page-navigation",_67c).style("width",_67d+"px");
}
};
curam.util.subscribe("/clusterToggle",_67b);
curam.util.connect(dojo.global,"onresize",_67b);
_606(_67b);
},alterScrollableListBottomBorder:function(id,_681){
var _682=_681;
var _683="#"+id+" table";
function _684(){
var _685=_60d(_683)[0];
if(_685.offsetHeight>=_682){
var _686=_60d(".odd-last-row",_685)[0];
if(typeof _686!="undefined"){
_60a.add(_686,"no-bottom-border");
}
}else{
if(_685.offsetHeight<_682){
var _686=_60d(".even-last-row",_685)[0];
if(typeof _686!="undefined"){
_60a.add(_686,"add-bottom-border");
}
}else{
curam.debug.log("curam.util.alterScrollableListBottomBorder: "+_60f.getProperty("curam.util.code"));
}
}
};
_606(_684);
},addFileUploadResizeListener:function(code){
function _687(evt){
if(_60d(".widget")){
_60d(".widget").forEach(function(_688){
var _689=_688.clientWidth;
if(_60d(".fileUpload",_688)){
_60d(".fileUpload",_688).forEach(function(_68a){
fileUploadWidth=_689/30;
if(fileUploadWidth<4){
_68a.size=1;
}else{
_68a.size=fileUploadWidth;
}
});
}
});
}
};
on(dojo.global,"resize",_687);
_606(_687);
},openCenteredNonModalWindow:function(url,_68b,_68c,name){
_68b=Number(_68b);
_68c=Number(_68c);
var _68d=(screen.width-_68b)/2;
var _68e=(screen.height-_68c)/2;
_68c=_68e<0?screen.height:_68c;
_68e=Math.max(0,_68e);
_68b=_68d<0?screen.width:_68b;
_68d=Math.max(0,_68d);
var left="left",top="top";
if(has("ff")){
left="screenX",top="screenY";
}
var _68f="location=no, menubar=no, status=no, toolbar=no, "+"scrollbars=yes, resizable=no";
var _690=dojo.global.open(url,name||"name","width="+_68b+", height="+_68c+", "+left+"="+_68d+","+top+"="+_68e+","+_68f);
_690.resizeTo(_68b,_68c);
_690.moveTo(_68d,_68e);
_690.focus();
},adjustTargetContext:function(win,href){
if(win&&win.dojo.global.jsScreenContext){
var _691=win.dojo.global.jsScreenContext;
_691.updateStates(dojo.global.jsScreenContext);
return curam.util.replaceUrlParam(href,"o3ctx",_691.getValue());
}
return href;
},modifyUrlContext:function(url,_692,_693){
var _694=url;
var ctx=new curam.util.ScreenContext();
var _695=curam.util.getUrlParamValue(url,"o3ctx");
if(_695){
ctx.setContext(_695);
}else{
ctx.clear();
}
if(_692){
ctx.addContextBits(_692);
}
if(_693){
ctx.clear(_693);
}
_694=curam.util.replaceUrlParam(url,"o3ctx",ctx.getValue());
return _694;
},updateCtx:function(_696){
var _697=curam.util.getUrlParamValue(_696,"o3ctx");
if(!_697){
return _696;
}
return curam.util.modifyUrlContext(_696,null,"MODAL");
},getFrameRoot:function(_698,_699){
var _69a=false;
var _69b=_698;
if(_69b){
while(_69b!=top&&!_69b.rootObject){
_69b=_69b.parent;
}
if(_69b.rootObject){
_69a=(_69b.rootObject==_699);
}
}
return _69a?_69b:null;
},saveInformationalMsgs:function(_69c){
curam.util.runStorageFn(function(){
try{
var _69d=curam.util.getTopmostWindow().dojox;
_69d.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,json.toJson({pageID:_607.body().id,total:dom.byId(curam.util.ERROR_MESSAGES_CONTAINER).innerHTML,listItems:dom.byId(curam.util.ERROR_MESSAGES_LIST).innerHTML}));
}
catch(e){
curam.debug.log(_60f.getProperty("curam.util.exception"),e);
}
},_69c);
},runStorageFn:function(fn,_69e){
var _69f=function(){
fn();
if(_69e){
setTimeout(_69e,10);
}
};
var _6a0=curam.util.getTopmostWindow().dojox;
require(["dojox/storage"],function(){
var mgr=_6a0.storage.manager;
if(mgr.isInitialized()){
_69f();
}else{
if(mgr.addOnLoad){
mgr.addOnLoad(_69f);
}else{
var _6a1={exp:_69f};
on(mgr,"loaded",_6a1,"exp");
}
}
});
},disableInformationalLoad:function(){
curam.util._informationalsDisabled=true;
},redirectDirectUrl:function(){
_606(function(){
if(dojo.global.parent==dojo.global){
var url=document.location.href;
var idx=url.lastIndexOf("/");
if(idx>-1){
if(idx<=url.length){
url=url.substring(idx+1);
}
}
dojo.global.location=jsBaseURL+"/AppController.do?o3gtu="+encodeURIComponent(url);
}
});
},loadInformationalMsgs:function(){
_606(function(){
if(dojo.global.jsScreenContext.hasContextBits("CONTEXT_PANEL")){
return;
}
if(curam.util._informationalsDisabled){
return;
}
curam.util.runStorageFn(function(){
var _6a2=curam.util.getTopmostWindow().dojox;
var msgs=_6a2.storage.get(curam.util.INFORMATIONAL_MSGS_STORAGE_ID);
if(msgs&&msgs!=""){
msgs=json.fromJson(msgs);
_6a2.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,"");
var div=dom.byId(curam.util.ERROR_MESSAGES_CONTAINER);
var list=dom.byId(curam.util.ERROR_MESSAGES_LIST);
if(msgs.pageID!=_607.body().id){
return;
}
if(list){
var _6a3=_605.create("ul",{innerHTML:msgs.listItems});
var _6a4=[];
for(var i=0;i<list.childNodes.length;i++){
if(list.childNodes[i].tagName=="LI"){
_6a4.push(list.childNodes[i]);
}
}
var skip=false;
var _6a5=_6a3.childNodes;
for(var i=0;i<_6a5.length;i++){
skip=false;
for(var j=0;j<_6a4.length;j++){
if(_6a5[i].innerHTML==_6a4[j].innerHTML){
skip=true;
break;
}
}
if(!skip){
list.appendChild(_6a5[i]);
i--;
}
}
}else{
if(div){
div.innerHTML=msgs.total;
}
}
}
var _6a6=dojo.byId("error-messages");
if(_6a6&&!dojo.global.jsScreenContext.hasContextBits("MODAL")){
_6a6.focus();
}
});
});
},setFocus:function(){
var _6a7=curam.util.getUrlParamValue(dojo.global.location.href,"o3frame")=="modal";
if(!_6a7){
_606(curam.util.doSetFocus);
}
},doSetFocus:function(){
var _6a8=-1;
var _6a9=-1;
var form=document.forms[0];
if(!form){
return false;
}
var _6aa=form.elements;
var l=_6aa.length;
var elem;
for(var i=0;i<l;i++){
elem=_6aa[i];
if(_6a8==-1&&(elem.type=="select-one"||elem.type=="text"||elem.tagName=="TEXTAREA")&&!_60a.contains(elem,"dijitArrowButtonInner")&&!_60a.contains(elem,"dijitValidationInner")){
_6a8=i;
}
if(elem.tabIndex=="1"){
elem.tabIndex=0;
_6a9=i;
break;
}
}
var elem;
if(_6a9!=-1){
elem=_6aa[_6a9];
}else{
if(_6a8!=-1){
elem=_6aa[_6a8];
}
}
try{
var _6ab=dojo.byId("error-messages");
if(_6ab){
_6ab.focus();
}else{
elem.focus();
}
}
catch(e){
curam.debug.log(_60f.getProperty("curam.util.error.focus"),e.message);
return false;
}
return true;
},openLocaleSelector:function(_6ac){
_6ac=_60c.fix(_6ac);
var _6ad=_6ac.target;
while(_6ad&&_6ad.tagName!="A"){
_6ad=_6ad.parentNode;
}
var loc=_6ad.href;
var rpu=curam.util.getUrlParamValue(loc,"__o3rpu");
rpu=curam.util.removeUrlParam(rpu,"__o3rpu");
var href="user-locale-selector.jspx"+"?__o3rpu="+rpu;
if(!curam.util.isActionPage(dojo.global.location.href)){
openModalDialog({href:href},"width=500,height=300",200,150);
}else{
alert(curam.util.msgLocaleSelectorActionPage);
}
return false;
},isActionPage:function(url){
var _6ae=curam.util.getLastPathSegmentWithQueryString(url);
var _6af=_6ae.split("?")[0];
return _6af.indexOf("Action.do")>-1;
},closeLocaleSelector:function(_6b0){
_6b0=_60c.fix(_6b0);
_60c.stop(_6b0);
dojo.global.close();
return false;
},getSuffixFromClass:function(node,_6b1){
var _6b2=attr.get(node,"class").split(" ");
var _6b3=_609.filter(_6b2,function(_6b4){
return _6b4.indexOf(_6b1)==0;
});
if(_6b3.length>0){
return _6b3[0].split(_6b1)[1];
}else{
return null;
}
},getCacheBusterParameter:function(){
return this.CACHE_BUSTER_PARAM_NAME+"="+new Date().getTime()+"_"+this.CACHE_BUSTER++;
},stripeTable:function(_6b5,_6b6,_6b7){
var _6b8=_6b5.tBodies[0];
var _6b9=(_6b6?2:1);
if(_6b8.rows.length<_6b9){
return;
}
var rows=_6b8.rows;
for(var i=0;i<rows.length;i+=_6b9){
curam.debug.log("curam.util.stripeTable(%s, %s): i = %s",_6b5,_6b6,i);
var _6ba=[rows[i]];
if(_6b6&&rows[i+1]){
_6ba.push(rows[i+1]);
}
_609.forEach(_6ba,function(row){
_60a.remove(row,"odd-last-row");
_60a.remove(row,"even-last-row");
});
if(i%(2*_6b9)==0){
_609.forEach(_6ba,function(row){
cm.replaceClass(row,"odd","even");
});
if(i==_6b7){
_609.forEach(_6ba,function(row){
_60a.add(row,"odd-last-row");
});
}
}else{
_609.forEach(_6ba,function(row){
cm.replaceClass(row,"even","odd");
});
if(i==_6b7){
_609.forEach(_6ba,function(row){
_60a.add(row,"even-last-row");
});
}
}
}
},fillString:function(_6bb,_6bc){
var _6bd="";
while(_6bc>0){
_6bd+=_6bb;
_6bc-=1;
}
return _6bd;
},updateHeader:function(qId,_6be,_6bf,_6c0){
var _6c1=dom.byId("header_"+qId);
_6c1.firstChild.nextSibling.innerHTML=_6be;
answerCell=dom.byId("chosenAnswer_"+qId);
answerCell.innerHTML=_6bf;
sourceCell=dom.byId("chosenSource_"+qId);
sourceCell.innerHTML=_6c0;
},search:function(_6c2,_6c3){
var _6c4=_604.byId(_6c2).get("value");
var _6c5=_604.byId(_6c3);
var _6c6=_6c5?_6c5.get("value"):null;
var _6c7="";
var _6c8;
var _6c9;
if(_6c6){
_6c9=_6c6.split("|");
_6c7=_6c9[0];
_6c8=_6c9[1];
}
var _6ca=curam.util.defaultSearchPageID;
var _6cb="";
if(_6c7===""){
_6cb=_6ca+"Page.do?searchText="+encodeURIComponent(_6c4);
}else{
_6cb=_6c8+"Page.do?searchText="+encodeURIComponent(_6c4)+"&searchType="+encodeURIComponent(_6c7);
}
var _6cc=new curam.ui.PageRequest(_6cb);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_6cc);
});
},updateDefaultSearchText:function(_6cd,_6ce){
var _6cf=_604.byId(_6cd);
var _6d0=_604.byId(_6ce);
var _6d1=_6cf?_6cf.get("value"):null;
var str=_6d1.split("|")[2];
_6d0.set("placeHolder",str);
},updateSearchBtnState:function(_6d2,_6d3){
var _6d4=_604.byId(_6d2);
var btn=dom.byId(_6d3);
var _6d5=_6d4.get("value");
if(!_6d5||lang.trim(_6d5).length<1){
_60a.add(btn,"dijitDisabled");
}else{
_60a.remove(btn,"dijitDisabled");
}
},furtherOptionsSearch:function(){
var _6d6=curam.util.furtherOptionsPageID+"Page.do";
var _6d7=new curam.ui.PageRequest(_6d6);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_6d7);
});
},searchButtonStatus:function(_6d8){
var btn=dojo.byId(_6d8);
if(!dojo.hasClass(btn,"dijitDisabled")){
return true;
}
},getPageHeight:function(){
var _6d9=400;
var _6da=0;
if(_60d("frameset").length>0){
curam.debug.log("curam.util.getPageHeight() "+_60f.getProperty("curam.util.default.height"),_6d9);
_6da=_6d9;
}else{
var _6db=function(node){
if(!node){
curam.debug.log(_60f.getProperty("curam.util.node"));
return 0;
}
var mb=geom.getMarginSize(node);
var pos=geom.position(node);
return pos.y+mb.h;
};
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")){
var _6dc=_60d("div.bottom")[0];
var _6dd=_6db(_6dc);
curam.debug.log(_60f.getProperty("curam.util.page.height"),_6dd);
curam.debug.log(_60f.getProperty("curam.util.ie7.issue"));
_6da=_6dd+1;
}else{
var _6de=dom.byId("content")||dom.byId("wizard-content");
var _6df=_60d("> *",_6de).filter(function(n){
return n.tagName.indexOf("SCRIPT")<0&&_608.get(n,"visibility")!="hidden"&&_608.get(n,"display")!="none";
});
var _6e0=_6df[0];
for(var i=1;i<_6df.length;i++){
if(_6db(_6df[i])>=_6db(_6e0)){
_6e0=_6df[i];
}
}
_6da=_6db(_6e0);
curam.debug.log("curam.util.getPageHeight() "+_60f.getProperty("curam.util.base.height"),_6da);
var _6e1=_60d(".actions-panel",_607.body());
if(_6e1.length>0){
var _6e2=geom.getMarginBox(_6e1[0]).h;
curam.debug.log("curam.util.getPageHeight() "+_60f.getProperty("curam.util.panel.height"));
_6da+=_6e2;
_6da+=10;
}
var _6e3=_60d("body.details");
if(_6e3.length>0){
curam.debug.log("curam.util.getPageHeight() "+_60f.getProperty("curam.util.bar.height"));
_6da+=20;
}
}
}
curam.debug.log("curam.util.getPageHeight() "+_60f.getProperty("curam.util.returning"),_6da);
return _6da;
},toCommaSeparatedList:function(_6e4){
var _6e5="";
for(var i=0;i<_6e4.length;i++){
_6e5+=_6e4[i];
if(i<_6e4.length-1){
_6e5+=",";
}
}
return _6e5;
},skipLinkFocus:function(){
var dest=dojo.byId("skip-dest");
if(dest){
dest.focus();
}
},showHideSkipLink:function(e){
var _6e6=dojo.byId("skipLink");
if(_6e6){
var _6e7=_6e6.parentNode;
if(e.type=="focus"&&_60a.contains(_6e7,"hidden")){
_60a.remove(_6e7,"hidden");
}else{
if(e.type=="blur"&&!_60a.contains(_6e7,"hidden")){
_60a.add(_6e7,"hidden");
}
}
}
},setupGenericKeyHandler:function(){
_606(function(){
var f=function(_6e8){
if(dojo.global.jsScreenContext.hasContextBits("MODAL")&&_6e8.keyCode==27){
var ev=_60c.fix(_6e8);
var _6e9=_604.byId(ev.target.id);
var _6ea=typeof _6e9!="undefined"&&_6e9.baseClass=="dijitTextBox dijitComboBox";
if(!_6ea){
curam.dialog.closeModalDialog();
}
}
if(_6e8.keyCode==13){
var ev=_60c.fix(_6e8);
var _6eb=ev.target.type=="text";
var _6ec=ev.target.type=="radio";
var _6ed=ev.target.type=="checkbox";
var _6ee=ev.target.type=="select-multiple";
var _6ef=ev.target.type=="password";
var _6f0=_604.byId(ev.target.id);
if(typeof _6f0!="undefined"){
var _6f1=_604.byNode(dojo.byId("widget_"+ev.target.id));
if(_6f1&&_6f1.enterKeyOnOpenDropDown){
_6f1.enterKeyOnOpenDropDown=false;
return false;
}
}
var _6f2=typeof _6f0!="undefined"&&_6f0.baseClass=="dijitComboBox";
if((!_6eb&&!_6ec&&!_6ed&&!_6ee&&!_6ef)||_6f2){
return true;
}
var _6f3=null;
var _6f4=_60d(".curam-default-action");
if(_6f4.length>0){
_6f3=_6f4[0];
}else{
var _6f5=_60d("input[type='submit']");
if(_6f5.length>0){
_6f3=_6f5[0];
}
}
if(_6f3!=null){
_60c.stop(_60c.fix(_6e8));
curam.util.clickButton(_6f3);
return false;
}
dojo.require("curam.dateSelectorUtil");
var _6f6=dojo.byId("year");
if(_6f6){
dojo.stopEvent(dojo.fixEvent(_6e8));
curam.dateSelectorUtil.updateCalendar();
}
}
return true;
};
curam.util.connect(_607.body(),"onkeyup",f);
});
},enterKeyPress:function(_6f7){
if(_6f7.keyCode==13){
return true;
}
},isShiftTab:function(e){
if(e.shiftKey&&e.keyCode==9){
var elem,evt=e?e:event;
if(evt.srcElement){
elem=evt.srcElement;
}else{
if(evt.target){
elem=evt.target;
}
}
if(elem.previousSibling.className=="dijitDialogHelpIcon"){
return false;
}else{
var _6f8=elem.parentElement.parentElement.id;
var _6f9=dojo.byId("end-"+_6f8);
if(_6f9){
_6f9.focus();
}
}
}
},focusHelpIconOnTab:function(e){
if(!e.shiftKey&&e.keyCode==9){
var _6fa=dojo.query(".dijitDialogHelpIcon")[0];
if(_6fa){
setTimeout(function(){
_6fa.focus();
},5);
}
}
},swapState:function(node,_6fb,_6fc,_6fd){
if(_6fb){
_60a.replace(node,_6fc,_6fd);
}else{
_60a.replace(node,_6fd,_6fc);
}
},makeQueryString:function(_6fe){
if(!_6fe||_6fe.length==0){
return "";
}
var _6ff=[];
for(var _700 in _6fe){
_6ff.push(_700+"="+encodeURIComponent(_6fe[_700]));
}
return "?"+_6ff.join("&");
},clickHandlerForListActionMenu:function(url,_701,_702,_703){
if(_701){
var href=curam.util.replaceUrlParam(url,"o3frame","modal");
var ctx=dojo.global.jsScreenContext;
ctx.addContextBits("MODAL");
href=curam.util.replaceUrlParam(href,"o3ctx",ctx.getValue());
curam.util.redirectWindow(href);
return;
}
var _704={href:url};
require(["curam/ui/UIMPageAdaptor"]);
if(curam.ui.UIMPageAdaptor.allowLinkToContinue(_704)){
dojo.global.location=url;
return;
}
if(_704!=null){
if(_703){
_60c.fix(_703);
_60c.stop(_703);
}
if(!_704.href||_704.href.length==0){
return;
}
if(_702&&!curam.util.isInternal(url)){
dojo.global.open(url);
}else{
if(curam.ui.UIMPageAdaptor.isLinkValidForTabProcessing(_704)){
var _705=new curam.ui.PageRequest(_704.href);
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")||dojo.global.jsScreenContext.hasContextBits("NESTED_UIM")){
_705.pageHolder=dojo.global;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_705);
});
}
}
}
},clickHandlerForMailtoLinks:function(_706,url){
dojo.stopEvent(_706);
var _707=dojo.query("#mailto_frame")[0];
if(!_707){
_707=dojo.io.iframe.create("mailto_frame","");
}
_707.src=url;
return false;
},isInternal:function(url){
var path=url.split("?")[0];
var _708=path.match("Page.do");
if(_708!=null){
return true;
}
return false;
},getLastPathSegmentWithQueryString:function(url){
var _709=url.split("?");
var _70a=_709[0].split("/");
return _70a[_70a.length-1]+(_709[1]?"?"+_709[1]:"");
},replaceSubmitButton:function(name,_70b){
if(curam.replacedButtons[name]=="true"){
return;
}
var _70c="__o3btn."+name;
var _70d;
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_70d=_60d("input[id='"+_70c+"']");
}else{
_70d=_60d("input[name='"+_70c+"']");
}
_70d.forEach(function(_70e,_70f,_710){
if(_70b){
var _711=_710[1];
_711.setAttribute("value",_70b);
}
_70e.tabIndex=-1;
var _712=_70e.parentNode;
var _713="btn-id-"+_70f;
curam.util.setupWidgetLoadMask("a."+_713);
var _714="ac initially-hidden-widget "+_713;
if(_60a.contains(_70e,"first-action-control")){
_714+=" first-action-control";
}
var _715=_605.create("a",{"class":_714,href:"#"},_70e,"before");
var _716=dojo.query(".page-level-menu")[0];
if(_716){
dojo.attr(_715,"title",_70e.value);
}
_605.create("span",{"class":"filler"},_715,"before");
var left=_605.create("span",{"class":"left-corner"},_715);
var _717=_605.create("span",{"class":"right-corner"},left);
var _718=_605.create("span",{"class":"middle"},_717);
_718.appendChild(document.createTextNode(_70e.value));
curam.util.addActionControlClass(_715);
on(_715,"click",function(_719){
curam.util.clickButton(this._submitButton);
_60c.stop(_719);
});
_715._submitButton=_710[0];
_60a.add(_70e,"hidden-button");
});
curam.replacedButtons[name]="true";
},setupWidgetLoadMask:function(_71a){
curam.util.subscribe("/curam/page/loaded",function(){
var _71b=_60d(_71a)[0];
if(_71b){
_608.set(_71b,"visibility","visible");
}else{
curam.debug.log("setupButtonLoadMask: "+_60f.getProperty("curam.util.not.found")+"'"+_71a+"'"+_60f.getProperty("curam.util.ignore.mask"));
}
});
},optReplaceSubmitButton:function(name){
if(curam.util.getFrameRoot(dojo.global,"wizard")==null){
curam.util.replaceSubmitButton(name);
return;
}
var _71c=curam.util.getFrameRoot(dojo.global,"wizard").navframe.wizardNavigator;
if(_71c.delegatesSubmit[jsPageID]!="assumed"){
curam.util.replaceSubmitButton(name);
}
},clickButton:function(_71d){
var _71e=dom.byId("mainForm");
var _71f;
if(!_71d){
curam.debug.log("curam.util.clickButton: "+_60f.getProperty("curam.util..no.arg"));
return;
}
if(typeof (_71d)=="string"){
var _720=_71d;
curam.debug.log("curam.util.clickButton: "+_60f.getProperty("curam.util.searching")+_60f.getProperty("curam.util.id.of")+"'"+_720+"'.");
_71d=_60d("input[id='"+_720+"']")[0];
if(!_71d.form&&!_71d.id){
curam.debug.log("curam.util.clickButton: "+_60f.getProperty("curam.util.searched")+_60f.getProperty("curam.util.id.of")+"'"+_720+_60f.getProperty("curam.util.exiting"));
return;
}
}
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_71f=_71d;
}else{
_71f=_60d("input[name='"+_71d.id+"']",_71e)[0];
}
try{
if(attr.get(_71e,"action").indexOf(jsPageID)==0){
curam.util.publishRefreshEvent();
}
_71f.click();
}
catch(e){
curam.debug.log(_60f.getProperty("curam.util.exception.clicking"));
}
},printPage:function(_721){
_60c.stop(_721);
var _722=dojo.window.get(_721.currentTarget.ownerDocument);
var _723=_722.frameElement;
var _724=_723;
while(_724&&!dojo.hasClass(_724,"tab-content-holder")){
_724=_724.parentNode;
}
var _725=_724;
var _726=dojo.query(".detailsPanelFrame",_725)[0];
if(_726!=undefined&&_726!=null){
_726.contentWindow.focus();
_726.contentWindow.print();
}
_722.focus();
_722.print();
return false;
},addSelectedClass:function(_727){
_60a.add(_727.target,"selected");
},removeSelectedClass:function(_728){
_60a.remove(_728.target,"selected");
},openHelpPage:function(_729,_72a){
_60c.stop(_729);
dojo.global.open(_72a);
},connect:function(_72b,_72c,_72d){
var h=function(_72e){
_72d(_60c.fix(_72e));
};
if(has("ie")&&has("ie")<9){
_72b.attachEvent(_72c,h);
_60e.addOnWindowUnload(function(){
_72b.detachEvent(_72c,h);
});
return {object:_72b,eventName:_72c,handler:h};
}else{
var _72f=_72c;
if(_72c.indexOf("on")==0){
_72f=_72c.slice(2);
}
var dt=on(_72b,_72f,h);
_60e.addOnWindowUnload(function(){
dt.remove();
});
return dt;
}
},disconnect:function(_730){
if(has("ie")&&has("ie")<9){
_730.object.detachEvent(_730.eventName,_730.handler);
}else{
_730.remove();
}
},subscribe:function(_731,_732){
var st=_60b.subscribe(_731,_732);
_60e.addOnWindowUnload(function(){
st.remove();
});
return st;
},unsubscribe:function(_733){
_733.remove();
},addActionControlClickListener:function(_734){
var _735=dom.byId(_734);
var _736=_60d(".ac",_735);
if(_736.length>0){
for(var i=0;i<_736.length;i++){
var _737=_736[i];
curam.util.addActionControlClass(_737);
}
}
},addActionControlClass:function(_738){
curam.util.connect(_738,"onmousedown",function(){
_60a.add(_738,"selected-button");
curam.util.connect(_738,"onmouseout",function(){
_60a.remove(_738,"selected-button");
});
});
},getClusterActionSet:function(){
var _739=dom.byId("content");
var _73a=_60d(".blue-action-set",_739);
if(_73a.length>0){
for(var i=0;i<_73a.length;i++){
curam.util.addActionControlClickListener(_73a[i]);
}
}
},adjustActionButtonWidth:function(){
if(has("ie")==8){
_606(function(){
if(dojo.global.jsScreenContext.hasContextBits("MODAL")){
_60d(".action-set > a").forEach(function(node){
if(node.childNodes[0].offsetWidth>node.offsetWidth){
_608.set(node,"width",node.childNodes[0].offsetWidth+"px");
_608.set(node,"display","block");
_608.set(node,"display","inline-block");
}
});
}
});
}
},setRpu:function(url,rtc,_73b){
if(!url||!rtc||!rtc.getHref()){
throw {name:"Unexpected values",message:"This value not allowed for url or rtc"};
}
var _73c=curam.util.getLastPathSegmentWithQueryString(rtc.getHref());
_73c=curam.util.removeUrlParam(_73c,curam.util.Constants.RETURN_PAGE_PARAM);
if(_73b){
var i;
for(i=0;i<_73b.length;i++){
if(!_73b[i].key||!_73b[i].value){
throw {name:"undefined value error",message:"The object did not contain a valid key/value pair"};
}
_73c=curam.util.replaceUrlParam(_73c,_73b[i].key,_73b[i].value);
}
}
var _73d=curam.util.replaceUrlParam(url,curam.util.Constants.RETURN_PAGE_PARAM,encodeURIComponent(_73c));
curam.debug.log("curam.util.setRpu "+_60f.getProperty("curam.util.added.rpu")+_73d);
return _73d;
},retrieveBaseURL:function(){
return dojo.global.location.href.match(".*://[^/]*/[^/]*");
},removeRoleRegion:function(){
var body=dojo.query("body")[0];
dojo.removeAttr(body,"role");
},iframeTitleFallBack:function(){
var _73e=curam.tab.getContainerTab(curam.tab.getContentPanelIframe());
var _73f=dojo.byId(curam.tab.getContentPanelIframe());
var _740=_73f.contentWindow.document.title;
var _741=dojo.query("div.nowrapTabStrip.dijitTabContainerTop-tabs > div.dijitTabChecked.dijitChecked")[0];
var _742=dojo.query("span.tabLabel",_741)[0];
var _743=dojo.query("div.nowrapTabStrip.dijitTabNoLayout > div.dijitTabChecked.dijitChecked",_73e.domNode)[0];
var _744=dojo.query("span.tabLabel",_743)[0];
if(_740&&_740!=null){
return _740;
}else{
if(_743){
return _744.innerHTML;
}else{
return _742.innerHTML;
}
}
},addClassToLastNodeInContentArea:function(){
var _745=_60d("> div","content");
var _746=_745.length;
if(_746==0){
return "No need to add";
}
var _747=_745[--_746];
while(_60a.contains(_747,"hidden-action-set")&&_747){
_747=_745[--_746];
}
_60a.add(_747,"last-node");
},highContrastModeType:function(){
var _748=dojo.query("body.high-contrast")[0];
return _748;
},processBidiContextual:function(_749){
_749.dir=bidi.prototype._checkContextual(_749.value);
},getCookie:function(name){
var dc=document.cookie;
var _74a=name+"=";
var _74b=dc.indexOf("; "+_74a);
if(_74b==-1){
_74b=dc.indexOf(_74a);
if(_74b!=0){
return null;
}
}else{
_74b+=2;
}
var end=document.cookie.indexOf(";",_74b);
if(end==-1){
end=dc.length;
}
return unescape(dc.substring(_74b+_74a.length,end));
}});
return curam.util;
});
},"dijit/popup":function(){
define("dijit/popup",["dojo/_base/array","dojo/aspect","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/window","./place","./BackgroundIframe","."],function(_74c,_74d,_74e,_74f,dom,_750,_751,_752,_753,_754,has,keys,lang,on,win,_755,_756,_757){
function _758(){
if(this._popupWrapper){
_751.destroy(this._popupWrapper);
delete this._popupWrapper;
}
};
var _759=_74f(null,{_stack:[],_beginZIndex:1000,_idGen:1,_createWrapper:function(_75a){
var _75b=_75a._popupWrapper,node=_75a.domNode;
if(!_75b){
_75b=_751.create("div",{"class":"dijitPopup",style:{display:"none"},role:"presentation"},win.body());
_75b.appendChild(node);
var s=node.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
_75a._popupWrapper=_75b;
_74d.after(_75a,"destroy",_758,true);
}
return _75b;
},moveOffScreen:function(_75c){
var _75d=this._createWrapper(_75c);
_753.set(_75d,{visibility:"hidden",top:"-9999px",display:""});
},hide:function(_75e){
var _75f=this._createWrapper(_75e);
_753.set(_75f,"display","none");
},getTopPopup:function(){
var _760=this._stack;
for(var pi=_760.length-1;pi>0&&_760[pi].parent===_760[pi-1].widget;pi--){
}
return _760[pi];
},open:function(args){
var _761=this._stack,_762=args.popup,_763=args.orient||["below","below-alt","above","above-alt"],ltr=args.parent?args.parent.isLeftToRight():_752.isBodyLtr(),_764=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+this._idGen++);
while(_761.length&&(!args.parent||!dom.isDescendant(args.parent.domNode,_761[_761.length-1].widget.domNode))){
this.close(_761[_761.length-1].widget);
}
var _765=this._createWrapper(_762);
_750.set(_765,{id:id,style:{zIndex:this._beginZIndex+_761.length},"class":"dijitPopup "+(_762.baseClass||_762["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:args.parent?args.parent.id:""});
if(has("bgIframe")&&!_762.bgIframe){
_762.bgIframe=new _756(_765);
}
var best=_764?_755.around(_765,_764,_763,ltr,_762.orient?lang.hitch(_762,"orient"):null):_755.at(_765,args,_763=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],args.padding);
_765.style.display="";
_765.style.visibility="visible";
_762.domNode.style.visibility="visible";
var _766=[];
_766.push(on(_765,_74e._keypress,lang.hitch(this,function(evt){
if(evt.charOrCode==keys.ESCAPE&&args.onCancel){
_754.stop(evt);
args.onCancel();
}else{
if(evt.charOrCode===keys.TAB){
_754.stop(evt);
var _767=this.getTopPopup();
if(_767&&_767.onCancel){
_767.onCancel();
}
}
}
})));
if(_762.onCancel&&args.onCancel){
_766.push(_762.on("cancel",args.onCancel));
}
_766.push(_762.on(_762.onExecute?"execute":"change",lang.hitch(this,function(){
var _768=this.getTopPopup();
if(_768&&_768.onExecute){
_768.onExecute();
}
})));
_761.push({widget:_762,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:_766});
if(_762.onOpen){
_762.onOpen(best);
}
return best;
},close:function(_769){
var _76a=this._stack;
while((_769&&_74c.some(_76a,function(elem){
return elem.widget==_769;
}))||(!_769&&_76a.length)){
var top=_76a.pop(),_76b=top.widget,_76c=top.onClose;
if(_76b.onClose){
_76b.onClose();
}
var h;
while(h=top.handlers.pop()){
h.remove();
}
if(_76b&&_76b.domNode){
this.hide(_76b);
}
if(_76c){
_76c();
}
}
}});
return (_757.popup=new _759());
});
},"curam/matrix/BottomRight":function(){
define("curam/matrix/BottomRight",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_76d,dojo,_76e){
dojo.provide("curam.matrix.BottomRight");
dojo.require("curam.matrix.Constants");
dojo.declare("curam.matrix.BottomRight",null,{constructor:function(_76f){
this.node=dojo.byId("bottom-right");
this.matrix=_76f;
this.questions=new curam.ListMap();
var _770=this.node.childNodes;
for(var i=0;i<_770.length;i++){
if(_770[i].nodeType==1){
this.questions.add(_770[i].id,new curam.matrix.QuestionRight(_770[i],this.matrix));
}
}
},setDimensions:function(){
var _771,_772;
var _773;
for(var i=0;i<this.questions.count;i++){
_771=this.questions.getObjectByIndex(i);
_773=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.getQuestion(_771.qId).ansGroup;
_771.positionPriority(_773);
_771.positionCombinationCells(_773);
}
this.setWidth();
},setWidth:function(){
var c=curam.matrix.Constants.container;
c.cssText.append(".matrix-container .bottom-right-eval{width:").append(c.matrix.topRight.width+c.scrollBarWidth).append("px;}");
},addQuestion:function(_774){
var _775=dojo.create("div",{id:"qr-"+_774[0],"class":"right-eval "+_774[0]+"-eval "});
var _776=this.questions.count==0?true:false;
if(this.matrix.priorityExists){
_775.appendChild(this.addPriorityGroup(_774[0],_774[1]));
}
if(this.matrix.scoreExists){
_775.appendChild(this.addScoreGroup(_774[0],_774[1]));
}
if(this.matrix.contradictionsExist){
_775.appendChild(this.addContradiction(_774[0],_774[1],null,_776));
}
if(this.matrix.outcomesExist){
var _777=curam.matrix.Constants.container.matrix.topRight.topRightTop.getOutcomeColIds();
for(var i=0;i<_777.length;i++){
_775.appendChild(this.addOutcome(_777[i],_774[0],_774[1],null,_776));
}
}
var _778=new curam.matrix.QuestionRight(_775,this.matrix);
this.node.appendChild(_778.node);
this.questions.add("qr-"+_774[0],_778);
},addPriorityGroup:function(qId,_779,_77a){
var _77b=_76d.byId("pri-group-"+qId);
if(_77b){
_77b.destroy();
}
var _77c=dojo.create("div",{id:"pri-group-"+qId,"class":"q-ct pri-col-eval q-ct-eval-"+qId});
if(_77a==null){
_77c.appendChild(this.addPriority(qId,1,true));
if(_779==ANSWER_TYPE_BOOLEAN){
_77c.appendChild(this.addPriority(qId,2,false));
}
}else{
var _77d;
for(var i=0;i<_77a.length;i++){
_77d=i==0?true:false;
_77c.appendChild(this.addPriority(qId,_77a[i],_77d));
}
}
return _77c;
},addPriority:function(qId,_77e,_77f){
var _780=!_77f?"ans":"";
var _781=(_77f&&(curam.matrix.Constants.container.existingQuestionIds.indexOf(qId)==0))?"-with-menu":"";
var _782=dojo.create("div",{id:"pri-"+qId+"-"+_77e,"class":_780+" ans-eval"+_781+" ans-"+qId+"-eval pri-col-eval"});
var _783=dojo.create("div",{id:"pri-val-"+qId+"-"+_77e,"class":"pri-val pri-val-eval ans-str-val-eval"+_781+" pri-eval-"+qId},_782);
var _784=curam.matrix.util.createInput("text");
var id=this.matrix.inputPrefix+"priority.s.s."+qId+"."+_77e;
dojo.attr(_784,{id:id,name:id,"class":"pri-input-eval"});
_783.appendChild(_784);
return _782;
},addScoreGroup:function(qId,_785,_786){
var _787=_76d.byId("scr-group-"+qId);
if(_787){
_787.destroy();
}
var _788=dojo.create("div",{id:"scr-group-"+qId,"class":"q-ct pri-col-eval q-ct-eval-"+qId});
if(_786==null){
_788.appendChild(this.addScore(qId,1,true));
if(_785==ANSWER_TYPE_BOOLEAN){
_788.appendChild(this.addScore(qId,2,false));
}
}else{
var _789;
for(var i=0;i<_786.length;i++){
_789=i==0?true:false;
_788.appendChild(this.addScore(qId,_786[i],_789));
}
}
return _788;
},addScore:function(qId,_78a,_78b){
var _78c=!_78b?"ans":"";
var _78d=(_78b&&(curam.matrix.Constants.container.existingQuestionIds.indexOf(qId)==0))?"-with-menu":"";
var _78e=dojo.create("div",{id:"scr-"+qId+"-"+_78a,"class":_78c+" ans-eval"+_78d+" ans-"+qId+"-eval pri-col-eval"});
var _78f=dojo.create("div",{id:"scr-val-"+qId+"-"+_78a,"class":"pri-val pri-val-eval ans-str-val-eval"+_78d+" pri-eval-"+qId},_78e);
var _790=curam.matrix.util.createInput("text");
var id=this.matrix.inputPrefix+"score.s.s."+qId+"."+_78a;
dojo.attr(_790,{id:id,name:id,"class":"pri-input-eval"});
dojo.place(_790,_78f);
curam.matrix.util.makeNumericInput(_790);
return _78e;
},addContradiction:function(qId,_791,_792,_793){
var _794=dojo.create("div",{id:"contr-group-"+qId,"class":"q-ct q-ct-eval-"+qId+" contr-col-eval"});
if(_792==null){
_794.appendChild(this.addContradictionRow(qId,1,_793,true));
if(_791==ANSWER_TYPE_BOOLEAN){
_794.appendChild(this.addContradictionRow(qId,2,_793,false));
}
}else{
var _795;
for(var i=0;i<_792.length;i++){
_795=i==0?true:false;
_794.appendChild(this.addContradictionRow(qId,_792[i],_793,_795));
}
}
return _794;
},addContradictionRow:function(qId,_796,_797,_798){
var _799=dojo.create("div",{id:"contr-row-"+qId+"-"+_796,"class":"contr-col-eval"});
var _79a=curam.matrix.Constants.container.matrix.topRight.topRightTop.contradictionCol.getCombColumnIds();
var _79b;
for(var i=0;i<_79a.length;i++){
_79b=i==_79a.length-1?true:false;
_799.appendChild(this.addContradictionCell(qId,_796,_79a[i],_797,_798,_79b));
}
return _799;
},addContradictionCell:function(qId,_79c,_79d,_79e,_79f,_7a0){
var _7a1;
var _7a2="";
if(curam.matrix.Constants.container.existingQuestionIds.indexOf(qId)==0&&_79f){
_7a2="-with-menu";
}
if(_79f&&_7a0){
_7a1="cell-first-row cell-no-border";
}else{
if(_79f){
_7a1="cell-first-row";
}else{
if(_7a0){
_7a1="cell-last-col";
}else{
_7a1="cell";
}
}
}
var _7a3=dojo.create("div",{id:"contr-cell-"+qId+"-"+_79c+"-"+_79d,"class":_7a1+" ans-eval"+_7a2});
var id=this.matrix.inputPrefix+"contrCell."+_79d+".s."+qId+"."+_79c;
var _7a4=dojo.create("input",{id:id,type:"checkbox",name:id,"class":"cbox-eval"+_7a2+" contr-cbox-eval",onclick:function(evt){
curam.matrix.Constants.container.matrix.setContradictionValue(_79d,evt.target,evt,qId);
return true;
}},_7a3);
_7a1=_79e&&_79f?"image":"hidden-image";
var _7a5=dojo.create("div",{"class":_7a1},_7a3);
return _7a3;
},addOutcome:function(_7a6,qId,_7a7,_7a8,_7a9){
var _7aa=dojo.create("div",{id:"out-"+_7a6+"-"+qId,"class":"q-ct q-ct-eval-"+qId+" out-"+_7a6+"-col-eval"});
if(_7a8==null){
_7aa.appendChild(this.addOutcomeRow(_7a6,qId,1,_7a9,true));
if(_7a7==ANSWER_TYPE_BOOLEAN){
_7aa.appendChild(this.addOutcomeRow(_7a6,qId,2,_7a9,false));
}
}else{
var _7ab;
for(var i=0;i<_7a8.length;i++){
_7ab=i==0?true:false;
_7aa.appendChild(this.addOutcomeRow(_7a6,qId,_7a8[i],_7a9,_7ab));
}
}
return _7aa;
},addOutcomeRow:function(_7ac,qId,_7ad,_7ae,_7af){
var _7b0=dojo.create("div",{id:"out-"+_7ac+"-row-"+qId+"-"+_7ad,"class":"out-"+_7ac+"col-eval"});
var _7b1="column-id-"+_7ac;
var _7b2=curam.matrix.Constants.container.matrix.topRight.topRightTop.outcomeCols.getObjectByKey(_7b1).getCombColumnIds();
var _7b3;
for(var i=0;i<_7b2.length;i++){
_7b3=i==_7b2.length-1?true:false;
_7b0.appendChild(this.addOutcomeCell(_7ac,qId,_7ad,_7b2[i],_7ae,_7af,_7b3));
}
return _7b0;
},addOutcomeCell:function(_7b4,qId,_7b5,_7b6,_7b7,_7b8,_7b9){
var _7ba;
var _7bb="";
if(curam.matrix.Constants.container.existingQuestionIds.indexOf(qId)==0&&_7b8){
_7bb="-with-menu";
}
if(_7b8&&_7b9){
_7ba="cell-first-row cell-no-border";
}else{
if(_7b8){
_7ba="cell-first-row";
}else{
if(_7b9){
_7ba="cell-last-col";
}else{
_7ba="cell";
}
}
}
var _7bc=dojo.create("div",{id:"out-"+_7b4+"-cell-"+qId+"-"+_7b5+"-"+_7b6,"class":_7ba+" ans-eval"+_7bb+" ans-"+qId+"-eval out-"+_7b4+"-cell-eval"});
var _7bd=this.matrix.inputPrefix+"outCell."+_7b4+"."+qId+"."+_7b5+"."+_7b6;
var _7be=dojo.create("input",{type:"checkbox",id:_7bd,name:_7bd,"class":"cbox-eval"+_7bb+" out-"+_7b4+"-cbox-eval cbox-eval-"+qId,onclick:function(e){
_7bf.matrix.setOutcomeValue(_7b4,Number(_7b6),e.target,e);
return true;
}},_7bc);
var _7bf=this;
_7ba=_7b7&&_7b8?"image":"hidden-image";
var _7c0=dojo.create("div",{"class":_7ba},_7bc);
return _7bc;
},addPriorityColumn:function(){
var _7c1,curQ;
for(var i=0;i<this.questions.count;i++){
_7c1=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.getQuestion(this.questions.getObjectByIndex(i).qId);
curQ=this.questions.getObjectByIndex(i);
curQ.priorityGroup=new curam.matrix.PriorityGroup(this.addPriorityGroup(curQ.qId,_7c1.ansGroup.answerType,_7c1.ansGroup.getAnswerIds()),this.matrix);
dojo.place(curQ.priorityGroup.node,this.questions.getObjectByIndex(i).node,"first");
}
this.setWidth();
},addScoreColumn:function(){
var _7c2;
var pos=this.matrix.priorityExists?1:0;
for(var i=0;i<this.questions.count;i++){
_7c2=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.getQuestion(this.questions.getObjectByIndex(i).qId);
curQ=this.questions.getObjectByIndex(i);
curQ.scoreGroup=new curam.matrix.ScoreGroup(this.addScoreGroup(curQ.qId,_7c2.ansGroup.answerType,_7c2.ansGroup.getAnswerIds()));
dojo.place(curQ.scoreGroup.node,this.questions.getObjectByIndex(i).node,pos);
}
this.setWidth();
},addContradictionColumn:function(){
var _7c3,_7c4,_7c5,curQ;
var pos=0;
if(this.matrix.priorityExists){
pos++;
}
if(this.matrix.scoreExists){
pos++;
}
var _7c6=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.questions;
var _7c7;
for(var i=0;i<this.questions.count;i++){
_7c4=i==0?true:false;
_7c3=_7c6.getObjectByKey("ql-"+this.questions.getObjectByIndex(i).qId);
curQ=this.questions.getObjectByIndex(i);
_7c5=this.addContradiction(curQ.qId,_7c3.ansGroup.answerType,_7c3.ansGroup.getAnswerIds(),_7c4);
curQ.contradiction=new curam.matrix.Contradiction(_7c5);
_7c7=this.questions.getObjectByIndex(i).node;
dojo.place(_7c5,_7c7,pos+(_7c7.firstChild&&_7c7.firstChild.nodeName=="#comment"?1:0));
}
},addOutcomeColumn:function(_7c8){
var _7c9,_7ca,_7cb,curQ;
for(var i=0;i<this.questions.count;i++){
_7ca=i==0?true:false;
_7c9=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.questions.getObjectByKey("ql-"+this.questions.getObjectByIndex(i).qId);
curQ=this.questions.getObjectByIndex(i);
_7cb=this.addOutcome(_7c8[0],curQ.qId,_7c9.ansGroup.answerType,_7c9.ansGroup.getAnswerIds(),_7ca);
curQ.outcomeGroup.add(_7cb.id,new curam.matrix.Outcome(_7cb));
dojo.place(_7cb,this.questions.getObjectByIndex(i).node,"last");
}
},addContradictionCombination:function(){
var _7cc,_7cd,rows,_7ce,_7cf,row,cell,_7d0;
var _7d1=++curam.matrix.Constants.container.matrix.topRight.topRightTop.contradictionCol.combinationCount;
for(var i=0;i<this.questions.count;i++){
_7cc=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.questions.getObjectByKey("ql-"+this.questions.getObjectByIndex(i).qId);
_7cf=_7cc.ansGroup.getAnswerIds();
_7cd=i==0?true:false;
rows=this.questions.getObjectByIndex(i).contradiction.rows;
for(var j=0;j<rows.count;j++){
row=rows.getObjectByIndex(j);
cell=row.cells.getObjectByIndex(row.cells.count-1).node;
_7ce=j==0?true:false;
this.resetCellClassForSecondLastColumn(cell,_7ce);
_7d0=this.addContradictionCell(_7cc.qId,_7cf[j],_7d1,_7cd,_7ce,true);
row.cells.add(_7d0.id,new curam.matrix.ContradictionCell(_7d0));
row.node.appendChild(_7d0);
}
}
return _7d1;
},resetCellClassForSecondLastColumn:function(cell,_7d2){
var _7d3=_7d2?"cell-first-row":"cell";
if(_7d2){
dojo.removeClass(cell,"cell-no-border");
}else{
dojo.removeClass(cell,"cell-last-col");
}
dojo.addClass(cell,_7d3);
},resetCellClassForLastColumn:function(cell,_7d4){
if(_7d4){
dojo.addClass(cell,"cell-no-border");
}else{
dojo.removeClass(cell,"cell");
dojo.addClass(cell,"cell-last-col");
}
},addOutcomeCombination:function(_7d5,id){
var _7d6=id.replace("column-id-","");
var _7d7,_7d8,rows,_7d9,_7da,row,cell,_7db;
var _7dc=++curam.matrix.Constants.container.matrix.topRight.topRightTop.outcomeCols.getObjectByKey(id).combinationCount;
for(var i=0;i<this.questions.count;i++){
_7d7=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.questions.getObjectByKey("ql-"+this.questions.getObjectByIndex(i).qId);
_7da=_7d7.ansGroup.getAnswerIds();
_7d8=i==0?true:false;
rows=this.questions.getObjectByIndex(i).outcomeGroup.getObjectByKey("out-"+_7d6+"-"+_7d7.qId).rows;
for(var j=0;j<rows.count;j++){
row=rows.getObjectByIndex(j);
cell=row.cells.getObjectByIndex(row.cells.count-1).node;
_7d9=j==0?true:false;
this.resetCellClassForSecondLastColumn(cell,_7d9);
_7db=this.addOutcomeCell(_7d6,_7d7.qId,_7da[j],_7dc,_7d8,_7d9,true);
row.cells.add(_7db.id,new curam.matrix.OutcomeCell(_7db));
row.node.appendChild(_7db);
}
}
return _7dc;
},addButtonClassToFirstRow:function(){
var _7dd,cell,_7de;
var _7df=this.questions.getObjectByIndex(0);
if(!_7df){
return;
}
var _7e0=this.matrix.bottomLeft.bottomLeftMain.questions.getObjectByIndex(0).getAnswer(1);
if(_7e0){
_7e0.adjustFirstRowStyle();
}
if(this.matrix.contradictionsExist){
_7dd=_7df.contradiction.rows.getObjectByIndex(0).cells;
for(var j=0;j<_7dd.count;j++){
_7dd.getObjectByIndex(j).adjustFirstRowClass();
_7dd.getObjectByIndex(j).setButtonClass("image");
}
}
if(this.matrix.outcomesExist){
for(var i=0;i<_7df.outcomeGroup.count;i++){
_7de=_7df.outcomeGroup.getObjectByIndex(i);
_7dd=_7de.rows.getObjectByIndex(0).cells;
for(var j=0;j<_7dd.count;j++){
_7dd.getObjectByIndex(j).adjustFirstRowClass();
_7dd.getObjectByIndex(j).setButtonClass("image");
}
}
}
if(this.matrix.priorityExists){
var _7e1=_7df.priorityGroup.priorities.getObjectByIndex(0);
_7e1.adjustFirstRowClass();
}
if(this.matrix.scoreExists){
var _7e2=_7df.scoreGroup.scores.getObjectByIndex(0);
_7e2.adjustFirstRowClass();
}
},deletePriorityColumn:function(){
var _7e3;
for(var j=0;j<this.questions.count;j++){
_7e3=this.questions.getObjectByIndex(j);
dojo.destroy(_7e3.priorityGroup.node);
_7e3.priorityGroup=null;
}
},deleteScoreColumn:function(){
var _7e4;
for(var j=0;j<this.questions.count;j++){
_7e4=this.questions.getObjectByIndex(j);
dojo.destroy(_7e4.scoreGroup.node);
_7e4.scoreGroup=null;
}
},deleteContradictionColumn:function(){
var _7e5;
for(var j=0;j<this.questions.count;j++){
_7e5=this.questions.getObjectByIndex(j);
dojo.destroy(_7e5.contradiction.node);
_7e5.contradiction=null;
}
},deleteOutcomeColumn:function(id){
var _7e6,_7e7,_7e8;
for(var j=0;j<this.questions.count;j++){
_7e6=this.questions.getObjectByIndex(j);
_7e8="out-"+id+"-"+_7e6.qId;
_7e7=_7e6.outcomeGroup.getObjectByKey(_7e8);
dojo.destroy(_7e7.node);
_7e6.outcomeGroup.removeByKey(_7e8);
}
},checkIfLastContrCombColumn:function(id){
var _7e9=this.questions.getObjectByIndex(0).contradiction.rows.getObjectByIndex(0).cells;
var _7ea=_7e9.count;
if(_7e9.getIndexByKey(id)==_7ea-1){
return true;
}
return false;
},checkIfLastOutCombColumn:function(_7eb,_7ec){
var _7ed=this.questions.getObjectByIndex(0);
var _7ee="out-"+_7eb+"-"+_7ed.qId;
var _7ef=_7ed.outcomeGroup.getObjectByKey(_7ee).rows.getObjectByIndex(0).cells;
var _7f0=_7ef.count;
if(_7ef.getIndexByKey(_7ec)==_7f0-1){
return true;
}
return false;
},deleteContradictionCombination:function(_7f1,_7f2){
var _7f3,curQ,_7f4,_7f5,_7f6,_7f7;
for(var j=0;j<this.questions.count;j++){
curQ=this.questions.getObjectByIndex(j);
for(var i=0;i<curQ.contradiction.rows.count;i++){
_7f6=i==0?true:false;
_7f4=curQ.contradiction.rows.getObjectByIndex(i);
_7f3=_7f4.node.id.replace("-row-","-cell-");
_7f3+="-"+_7f1;
_7f7=_7f4.cells.getObjectByKey(_7f3);
if(!_7f7){
continue;
}
dojo.destroy(_7f7.node);
_7f4.cells.removeByKey(_7f3);
if(_7f2){
this.resetCellClassForLastColumn(_7f4.cells.getObjectByIndex(_7f4.cells.count-1).node,_7f6);
}
}
}
},deleteOutcomeCombination:function(_7f8,_7f9,_7fa){
var _7fb,curQ,_7fc,_7fd,_7fe,_7ff;
for(var j=0;j<this.questions.count;j++){
curQ=this.questions.getObjectByIndex(j);
_7fc=curQ.outcomeGroup.getObjectByKey("out-"+_7f8+"-"+curQ.qId);
for(var i=0;i<_7fc.rows.count;i++){
_7ff=i==0?true:false;
_7fd=_7fc.rows.getObjectByIndex(i);
_7fb=_7fd.node.id.replace("-row-","-cell-")+"-"+_7f9;
dojo.destroy(_7fd.cells.getObjectByKey(_7fb).node);
_7fd.cells.removeByKey(_7fb);
if(_7fa){
this.resetCellClassForLastColumn(_7fd.cells.getObjectByIndex(_7fd.cells.count-1).node,_7ff);
}
}
}
}});
});
},"dijit/_WidgetBase":function(){
define("dijit/_WidgetBase",["require","dojo/_base/array","dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/ready","dojo/Stateful","dojo/topic","dojo/_base/window","./registry"],function(_800,_801,_802,_803,_804,_805,dom,_806,_807,_808,_809,_80a,_80b,lang,on,_80c,_80d,_80e,win,_80f){
var _810=typeof (dojo.global.perf)!="undefined";
if(!_80b.isAsync){
_80c(0,function(){
var _811=["dijit/_base/manager"];
_800(_811);
});
}
var _812={};
function _813(obj){
var ret={};
for(var attr in obj){
ret[attr.toLowerCase()]=true;
}
return ret;
};
function _814(attr){
return function(val){
_806[val?"set":"remove"](this.domNode,attr,val);
this._set(attr,val);
};
};
return _805("dijit._WidgetBase",_80d,{id:"",_setIdAttr:"domNode",lang:"",_setLangAttr:_814("lang"),dir:"",_setDirAttr:_814("dir"),textDir:"","class":"",_setClassAttr:{node:"domNode",type:"class"},style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{},_blankGif:_803.blankGif||_800.toUrl("dojo/resources/blank.gif"),postscript:function(_815,_816){
this.create(_815,_816);
},create:function(_817,_818){
if(_810){
perf.widgetStartedLoadingCallback();
}
this.srcNodeRef=dom.byId(_818);
this._connects=[];
this._supportingWidgets=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_817){
this.params=_817;
lang.mixin(this,_817);
}
this.postMixInProperties();
if(!this.id){
this.id=_80f.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
_80f.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _819=this.srcNodeRef;
if(_819&&_819.parentNode&&this.domNode!==_819){
_819.parentNode.replaceChild(this.domNode,_819);
}
}
if(this.domNode){
this.domNode.setAttribute("widgetId",this.id);
}
this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){
delete this.srcNodeRef;
}
this._created=true;
if(_810){
perf.widgetLoadedCallback(this);
}
},_applyAttributes:function(){
var ctor=this.constructor,list=ctor._setterAttrs;
if(!list){
list=(ctor._setterAttrs=[]);
for(var attr in this.attributeMap){
list.push(attr);
}
var _81a=ctor.prototype;
for(var _81b in _81a){
if(_81b in this.attributeMap){
continue;
}
var _81c="_set"+_81b.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
})+"Attr";
if(_81c in _81a){
list.push(_81b);
}
}
}
_801.forEach(list,function(attr){
if(this.params&&attr in this.params){
}else{
if(this[attr]){
this.set(attr,this[attr]);
}
}
},this);
for(var _81d in this.params){
this.set(_81d,this[_81d]);
}
},postMixInProperties:function(){
},buildRendering:function(){
if(!this.domNode){
this.domNode=this.srcNodeRef||_808.create("div");
}
if(this.baseClass){
var _81e=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_81e=_81e.concat(_801.map(_81e,function(name){
return name+"Rtl";
}));
}
_807.add(this.domNode,_81e);
}
},postCreate:function(){
},startup:function(){
if(this._started){
return;
}
this._started=true;
_801.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
},destroyRecursive:function(_81f){
this._beingDestroyed=true;
this.destroyDescendants(_81f);
this.destroy(_81f);
},destroy:function(_820){
this._beingDestroyed=true;
this.uninitialize();
var c;
while((c=this._connects.pop())){
c.remove();
}
var w;
while((w=this._supportingWidgets.pop())){
if(w.destroyRecursive){
w.destroyRecursive();
}else{
if(w.destroy){
w.destroy();
}
}
}
this.destroyRendering(_820);
_80f.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_821){
if(this.bgIframe){
this.bgIframe.destroy(_821);
delete this.bgIframe;
}
if(this.domNode){
if(_821){
_806.remove(this.domNode,"widgetId");
}else{
_808.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_821){
_808.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_822){
_801.forEach(this.getChildren(),function(_823){
if(_823.destroyRecursive){
_823.destroyRecursive(_822);
}
});
},uninitialize:function(){
return false;
},_setStyleAttr:function(_824){
var _825=this.domNode;
if(lang.isObject(_824)){
_80a.set(_825,_824);
}else{
if(_825.style.cssText){
_825.style.cssText+="; "+_824;
}else{
_825.style.cssText=_824;
}
}
this._set("style",_824);
},_attrToDom:function(attr,_826,_827){
_827=arguments.length>=3?_827:this.attributeMap[attr];
_801.forEach(lang.isArray(_827)?_827:[_827],function(_828){
var _829=this[_828.node||_828||"domNode"];
var type=_828.type||"attribute";
switch(type){
case "attribute":
if(lang.isFunction(_826)){
_826=lang.hitch(this,_826);
}
var _82a=_828.attribute?_828.attribute:(/^on[A-Z][a-zA-Z]*$/.test(attr)?attr.toLowerCase():attr);
_806.set(_829,_82a,_826);
break;
case "innerText":
_829.innerHTML="";
_829.appendChild(win.doc.createTextNode(_826));
break;
case "innerHTML":
_829.innerHTML=_826;
break;
case "class":
_807.replace(_829,_826,this[attr]);
break;
}
},this);
},get:function(name){
var _82b=this._getAttrNames(name);
return this[_82b.g]?this[_82b.g]():this[name];
},set:function(name,_82c){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _82d=this._getAttrNames(name),_82e=this[_82d.s];
if(lang.isFunction(_82e)){
var _82f=_82e.apply(this,Array.prototype.slice.call(arguments,1));
}else{
var _830=this.focusNode&&!lang.isFunction(this.focusNode)?"focusNode":"domNode",tag=this[_830].tagName,_831=_812[tag]||(_812[tag]=_813(this[_830])),map=name in this.attributeMap?this.attributeMap[name]:_82d.s in this?this[_82d.s]:((_82d.l in _831&&typeof _82c!="function")||/^aria-|^data-|^role$/.test(name))?_830:null;
if(map!=null){
this._attrToDom(name,_82c,map);
}
this._set(name,_82c);
}
return _82f||this;
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
});
return (apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr",l:uc.toLowerCase()});
},_set:function(name,_832){
var _833=this[name];
this[name]=_832;
if(this._watchCallbacks&&this._created&&_832!==_833){
this._watchCallbacks(name,_833,_832);
}
},on:function(type,func){
return _802.after(this,this._onMap(type),func,true);
},_onMap:function(type){
var ctor=this.constructor,map=ctor._onMap;
if(!map){
map=(ctor._onMap={});
for(var attr in ctor.prototype){
if(/^on/.test(attr)){
map[attr.replace(/^on/,"").toLowerCase()]=attr;
}
}
}
return map[type.toLowerCase()];
},toString:function(){
return "[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]";
},getChildren:function(){
return this.containerNode?_80f.findWidgets(this.containerNode):[];
},getParent:function(){
return _80f.getEnclosingWidget(this.domNode.parentNode);
},connect:function(obj,_834,_835){
var _836=_804.connect(obj,_834,this,_835);
this._connects.push(_836);
return _836;
},disconnect:function(_837){
var i=_801.indexOf(this._connects,_837);
if(i!=-1){
_837.remove();
this._connects.splice(i,1);
}
},subscribe:function(t,_838){
var _839=_80e.subscribe(t,lang.hitch(this,_838));
this._connects.push(_839);
return _839;
},unsubscribe:function(_83a){
this.disconnect(_83a);
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):_809.isBodyLtr();
},isFocusable:function(){
return this.focus&&(_80a.get(this.domNode,"display")!="none");
},placeAt:function(_83b,_83c){
if(_83b.declaredClass&&_83b.addChild){
_83b.addChild(this,_83c);
}else{
_808.place(this.domNode,_83b,_83c);
}
return this;
},getTextDir:function(text,_83d){
return _83d;
},applyTextDir:function(){
},defer:function(fcn,_83e){
var _83f=setTimeout(lang.hitch(this,function(){
_83f=null;
if(!this._destroyed){
lang.hitch(this,fcn)();
}
}),_83e||0);
return {remove:function(){
if(_83f){
clearTimeout(_83f);
_83f=null;
}
return null;
}};
}});
});
},"curam/util/ScreenContext":function(){
define("curam/util/ScreenContext",[],function(){
var _840={DEFAULT_CONTEXT:112,SAMPLE22:2,SAMPLE21:1,SAMPLE13:4,SAMPLE12:2,SAMPLE11:1,EXTAPP:1048576,CONTEXT_PORTLET:524288,SMART_PANEL:262144,NESTED_UIM:131072,ORG_TREE:65536,CONTEXT_PANEL:32768,LIST_ROW_INLINE_PAGE:8192,LIST_EVEN_ROW:16384,TAB:4096,TREE:2048,AGENDA:1024,POPUP:512,MODAL:256,HOME:128,HEADER:64,NAVIGATOR:32,FOOTER:16,OVAL:8,RESOLVE:4,ACTION:2,ERROR:1,EMPTY:0};
var _841=[["ERROR","ACTION","RESOLVE","OPT_VALIDATION","FOOTER","NAVIGATOR","HEADER","HOME_PAGE","MODAL","POPUP","AGENDA","TREE","TAB","LIST_EVEN_ROW","LIST_ROW_INLINE_PAGE","CONTEXT_PANEL","ORG_TREE","NESTED_UIM","SMART_PANEL","CONTEXT_PORTLET","EXTAPP"],["SAMPLE11","SAMPLE12","SAMPLE13"],["SAMPLE21","SAMPLE22"]];
var _842=dojo.declare("curam.util.ScreenContext",null,{constructor:function(_843){
if(_843){
this.setContext(_843);
}else{
this.currentContext=[_840["DEFAULT_CONTEXT"]|_840["DEFAULT_CONTEXT"]];
}
},setContext:function(_844){
var tmp=this.setup(_844);
this.currentContext=((tmp==null)?([_840["DEFAULT_CONTEXT"]|_840["DEFAULT_CONTEXT"]]):(tmp));
},addContextBits:function(_845,idx){
if(!_845){
return;
}
var _846=(idx)?idx:0;
var _847=this.parseContext(_845);
if(_847!=null){
this.currentContext[_846]|=_847;
}
return this.currentContext[_846];
},addAll:function(idx){
var _848=(idx)?idx:0;
this.currentContext[_848]=4294967295;
return this.currentContext[_848];
},clear:function(_849,idx){
if(!_849){
this.clearAll();
return;
}
var _84a=(idx)?idx:0;
if(_849==0){
return this.currentContext[_84a];
}
var _84b=this.parseContext(_849);
if(_84b!=null){
var _84c=this.currentContext[_84a]&_84b;
this.currentContext[_84a]^=_84c;
}
return this.currentContext[_84a];
},clearAll:function(idx){
if(idx){
this.currentContext[idx]=0;
}else{
for(var i=0;i<this.currentContext.length;i++){
this.currentContext[i]=0;
}
}
},updateStates:function(_84d){
this.clear("ERROR|ACTION|RESOLVE");
this.currentContext[0]=this.currentContext[0]|(_84d&7);
},hasContextBits:function(_84e,idx){
if(!_84e){
return false;
}
var _84f=(idx)?idx:0;
var _850=this.parseContext(_84e);
if(_850!=null){
var _851=this.currentContext[_84f]&_850;
return (_851==_850);
}
return false;
},getValue:function(){
var _852="";
for(var i=0;i<this.currentContext.length;i++){
_852+=this.currentContext[i]+"|";
}
return _852.substring(0,_852.length-1);
},toRequestString:function(){
return "o3ctx="+this.getValue();
},toBinary:function(){
var _853="";
for(var i=0;i<this.currentContext.length;i++){
_853+=this.currentContext[i].toString(2)+"|";
}
return _853.substring(0,_853.length-1);
},toString:function(){
var _854="";
for(var i=0;i<this.currentContext.length;i++){
var _855="";
var j=0;
while(j<_841[i].length){
if(((this.currentContext[i]>>j)&1)!=0){
_855+=","+_841[i][j];
}
j++;
}
if(_855==""){
return "{}";
}
_854+="|"+_855.replace(",","{")+((_855.length==0)?"":"}");
}
return _854.substring(1);
},parseContext:function(_856){
var _857=_856.replace(/,/g,"|");
var _858=_857.split("|");
var tmp=isNaN(_858[0])?parseInt(_840[_858[0]]):_858[0];
for(var i=1;i<_858.length;i++){
tmp=tmp|(isNaN(_858[i])?parseInt(_840[_858[i]]):_858[i]);
}
return (isNaN(tmp)?null:tmp);
},setup:function(_859){
if(!_859){
return null;
}
var _85a=(""+_859).split("|");
var _85b=new Array(_85a.length);
for(var i=0;i<_85a.length;i++){
_85b[i]=this.parseContext(_85a[_85a.length-i-1]);
_85b[i]=_85b[i]|_85b[i];
if(!_85b[i]||isNaN(_85b[i])||_85b[i]>4294967295){
return null;
}
}
return _85b;
}});
return _842;
});
}}});
define("dojo/decisionMatrix_all",[],1);
