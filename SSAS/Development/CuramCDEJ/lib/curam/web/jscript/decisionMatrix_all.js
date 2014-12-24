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
},"url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>","curam/matrix/Answer":function(){
define("curam/matrix/Answer",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_322,dojo,_323){
dojo.provide("curam.matrix.Answer");
dojo.require("curam.matrix.Constants");
dojo.declare("curam.matrix.Answer",null,{constructor:function(node,_324,_325){
this.node=node;
this.id=node.getAttribute("id");
this.validation=dojo.query("> :first-child",this.node)[0];
this.input=dojo.query("> :first-child",this.validation)[0];
this.button=cm.nextSibling(this.validation);
this.widgetCreated=false;
this.question=_325;
this.answerType=_324;
},init:function(){
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_CODETABLE||this.answerType==curam.matrix.Constants.ANSWER_TYPE_STRING){
var _326=this.validation.getElementsByTagName("select");
var _327=["onblur","onfocus","onkeypress"];
if(_326&&_326.length>0){
this.select=_326[0];
_327[_327.length]="onchange";
}
_327[_327.length]="onkeyup";
this.input.answer=this;
this.input.question=this.question;
this._addListeners(_327);
this._runInitialValidations([this.input]);
}else{
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
var _328=dojo.query("> input",this.validation);
if(_328.length==1){
this.specificValue=_328[0];
this.min=null;
this.max=null;
this.specificValue.answer=this;
this.specificValue.question=this.question;
}else{
this.min=_328[0];
this.max=_328[1];
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
var _329=this;
curam.matrix.Constants.container.matrix.addLazyWidget(this,"answers");
this.lazyListener=function(_32a){
if(!curam.matrix.Constants.container.matrix.createLazyWidgets("answers")){
dojo.disconnect(_329.button._conn);
return;
}
if(!_329.widget){
return;
}
_329.widget._toggleMenu("AnswerOptions",cm.nextSibling(dojo.query("div",_329.node)[0],"div"));
window.activeMenuID=_329.node.id;
_322.byId("AnswerOptions")._openMyself(curam.matrix.Constants.container.getFakeEvent(_329.widget.domNode));
};
this.button._conn=dojo.connect(this.button,"onclick",this,"lazyListener");
},createWidget:function(){
var c=curam.matrix.Constants.container;
if(this.widgetCreated){
return;
}
var _32b=this.widget=new curam.widget.AnswerButton({menuId:"AnswerOptions"},this.button);
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
for(var _32c=0;_32c<this.input.options.length;_32c++){
opts[_32c]={value:this.input.options[_32c].value,text:this.input.options[_32c].text};
}
return opts;
},createSpecificValue:function(){
if(this.specificValue){
return;
}
var _32d=this.min.id.replace(".min.",".value.");
var _32e=dojo.query("div",this.node)[0];
_32e.innerHTML="<div class=\"label-specific-value\" title=\""+curam.matrix.Constants.container.i18nMsgs.labelSpecificValue+"\">"+curam.matrix.Constants.container.i18nMsgs.labelSpecificValue+":</div>"+"<input type=\"text\" size=\"4\" title=\""+curam.matrix.Constants.container.i18nMsgs.labelSpecificValue+"\"/>";
this.specificValue=dojo.query("input",_32e)[0];
this.specificValue.setAttribute("id",_32d);
curam.util.connect(this.specificValue,"onfocus",function(){
curam.matrix.Constants.container.matrix.cf(arguments);
});
this.specificValue.answer=this;
this.specificValue.question=this.question;
cm.setClass(this.specificValue,"numeric-input-eval");
this.min=this.max=null;
this._addListeners();
this._runInitialValidations([this.specificValue]);
},_runInitialValidations:function(_32f){
var av=curam.matrix.Constants.container.matrix.answerValidator;
for(var i=0;i<_32f.length;i++){
var _330={target:_32f[i],keyCode:55};
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
av.validateNumericAnswer(_330);
}else{
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_CODETABLE){
av.validateCodetableAnswer(_330);
}else{
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_STRING){
av.validateStringAnswer(_330);
}
}
}
av.checkForError(_330);
av.checkFocus(_330);
}
},_addListeners:function(_331){
var av=curam.matrix.Constants.container.matrix.answerValidator;
var _332=function(e){
av.validateNumericAnswer(e);
};
var _333=function(e){
av.validateCodetableAnswer(e);
};
var _334=function(e){
av.validateStringAnswer(e);
};
var _335=function(e){
av.checkForError(e);
};
var _336=function(e){
av.checkFocus(e);
};
if(arguments.length==0){
_331=["onkeyup","onblur","onfocus","onkeypress"];
}
var fns={"onblur":_335,"onfocus":_336,"onkeypress":curam.matrix.util.numericInputChecker};
var _337;
if(this.specificValue){
_337=[this.specificValue];
}else{
if(this.min&&this.max){
_337=[this.min,this.max];
}else{
if(this.select){
_337=[this.select];
}else{
if(this.input){
_337=[this.input];
fns.onkeypress=curam.matrix.util.validationChecker;
}
}
}
}
fns.onchange=this.select?_333:_334;
fns.onkeyup=this.answerType==curam.matrix.Constants.ANSWER_TYPE_NUMERIC?_332:_334;
for(var i=0;i<_337.length;i++){
for(var j=0;j<_331.length;j++){
curam.util.connect(_337[i],_331[j],fns[_331[j]]);
}
}
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_CODETABLE){
var _338=this;
if(dojo.isIE7){
curam.util.subscribe("/disableInput",dojo.hitch(this.select,function(_339){
if(!_339||(_339&&this!=_339[0]&&this!=_339[1])){
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
var _33a=this.specificValue.id.replace(".value.",".min.");
var _33b=this.specificValue.id.replace(".value.",".max.");
this.specificValue=null;
var _33c=dojo.query("div",this.node)[0];
_33c.innerHTML="<div class=\"label-min-max\" title=\""+curam.matrix.Constants.container.i18nMsgs.labelMin+"\">"+curam.matrix.Constants.container.i18nMsgs.labelMin+":</div>"+"<input type=\"text\" size=\"4\" title=\""+curam.matrix.Constants.container.i18nMsgs.labelMin+"\"/> "+"<div class=\"label-min-max\" title=\""+curam.matrix.Constants.container.i18nMsgs.labelMax+"\">"+curam.matrix.Constants.container.i18nMsgs.labelMax+":</div>"+"<input type=\"text\" size=\"4\" title=\""+curam.matrix.Constants.container.i18nMsgs.labelMax+"\"/>";
this.min=dojo.query("input",_33c)[0];
this.max=cm.nextSibling(this.min,"INPUT");
cm.setClass(this.min,"numeric-input-eval");
cm.setClass(this.max,"numeric-input-eval");
this.min.setAttribute("id",_33a);
this.min.setAttribute("name",_33a);
this.max.setAttribute("id",_33b);
this.max.setAttribute("name",_33b);
var _33d=function(){
curam.matrix.Constants.container.matrix.cf(arguments);
};
curam.util.connect(this.min,"onfocus",_33d);
curam.util.connect(this.max,"onfocus",_33d);
this.min.answer=this.max.answer=this;
this.min.question=this.max.question=this.question;
this._addListeners();
this._runInitialValidations([this.min,this.max]);
},adjustFirstRowStyle:function(){
var _33e=dojo.attr(this.node,"class");
if(_33e.indexOf("ans-eval-with-menu")==-1){
_33e=_33e.replace("ans-eval","ans-eval-with-menu");
cm.setClass(this.node,_33e);
}
var _33f="ans-str-val-eval";
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_CODETABLE){
_33f="ans-ct-val";
}else{
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
_33f="ans-num-val-eval";
}else{
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_BOOLEAN){
_33f="ans-bool-val-eval";
}
}
}
var _340=dojo.attr(this.validation,"class");
if(_33e.indexOf(_33f+"-with-menu")==-1){
_340=_340.replace(_33f,_33f+"-with-menu");
cm.setClass(this.validation,_340);
}
}});
});
},"dojo/Stateful":function(){
define("dojo/Stateful",["./_base/declare","./_base/lang","./_base/array"],function(_341,lang,_342){
return _341("dojo.Stateful",null,{postscript:function(_343){
if(_343){
lang.mixin(this,_343);
}
},get:function(name){
return this[name];
},set:function(name,_344){
if(typeof name==="object"){
for(var x in name){
if(name.hasOwnProperty(x)&&x!="_watchCallbacks"){
this.set(x,name[x]);
}
}
return this;
}
var _345=this[name];
this[name]=_344;
if(this._watchCallbacks){
this._watchCallbacks(name,_345,_344);
}
return this;
},watch:function(name,_346){
var _347=this._watchCallbacks;
if(!_347){
var self=this;
_347=this._watchCallbacks=function(name,_348,_349,_34a){
var _34b=function(_34c){
if(_34c){
_34c=_34c.slice();
for(var i=0,l=_34c.length;i<l;i++){
_34c[i].call(self,name,_348,_349);
}
}
};
_34b(_347["_"+name]);
if(!_34a){
_34b(_347["*"]);
}
};
}
if(!_346&&typeof name==="function"){
_346=name;
name="*";
}else{
name="_"+name;
}
var _34d=_347[name];
if(typeof _34d!=="object"){
_34d=_347[name]=[];
}
_34d.push(_346);
return {unwatch:function(){
_34d.splice(_342.indexOf(_34d,_346),1);
}};
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
},"dojo/_base/url":function(){
define("dojo/_base/url",["./kernel"],function(dojo){
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$"),_36b=function(){
var n=null,_36c=arguments,uri=[_36c[0]];
for(var i=1;i<_36c.length;i++){
if(!_36c[i]){
continue;
}
var _36d=new _36b(_36c[i]+""),_36e=new _36b(uri[0]+"");
if(_36d.path==""&&!_36d.scheme&&!_36d.authority&&!_36d.query){
if(_36d.fragment!=n){
_36e.fragment=_36d.fragment;
}
_36d=_36e;
}else{
if(!_36d.scheme){
_36d.scheme=_36e.scheme;
if(!_36d.authority){
_36d.authority=_36e.authority;
if(_36d.path.charAt(0)!="/"){
var path=_36e.path.substring(0,_36e.path.lastIndexOf("/")+1)+_36d.path;
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
_36d.path=segs.join("/");
}
}
}
}
uri=[];
if(_36d.scheme){
uri.push(_36d.scheme,":");
}
if(_36d.authority){
uri.push("//",_36d.authority);
}
uri.push(_36d.path);
if(_36d.query){
uri.push("?",_36d.query);
}
if(_36d.fragment){
uri.push("#",_36d.fragment);
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
_36b.prototype.toString=function(){
return this.uri;
};
return dojo._Url=_36b;
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
dojo.string.substitute=function(_36f,map,_370,_371){
_371=_371||dojo.global;
_370=_370?lang.hitch(_371,_370):function(v){
return v;
};
return _36f.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_372,key,_373){
var _374=lang.getObject(key,false,map);
if(_373){
_374=lang.getObject(_373,false,_371).call(_371,_374,key);
}
return _370(_374,key).toString();
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
define("curam/matrix/AnswerGroup",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_375,dojo,_376){
dojo.provide("curam.matrix.AnswerGroup");
dojo.require("curam.matrix.Constants");
dojo.declare("curam.matrix.AnswerGroup",null,{constructor:function(node,_377){
this.node=node;
this.answers=new curam.ListMap();
this.ansHeightGreaterThanDefault=false;
this.answerType=this.setAnswerType(dojo.query("> :first-child",this.node)[0]);
this.answerCount=0;
var _378=this.node.childNodes;
for(var i=0;i<_378.length;i++){
if(_378[i].nodeType==1){
var _379=new curam.matrix.Answer(_378[i],this.answerType,_377);
this.answers.add(_378[i].id,_379);
_379.init();
this.answerCount++;
}
}
},setAnswerType:function(_37a){
var _37b=dojo.query("> :first-child",_37a)[0];
if(dojo.hasClass(_37b,"ans-ct-val")||dojo.hasClass(_37b,"ans-ct-val-with-menu")){
return curam.matrix.Constants.ANSWER_TYPE_CODETABLE;
}else{
if(dojo.hasClass(_37b,"ans-str-val-eval")||dojo.hasClass(_37b,"ans-str-val-eval-with-menu")){
return curam.matrix.Constants.ANSWER_TYPE_STRING;
}else{
if(dojo.hasClass(_37b,"ans-bool-val-eval")||dojo.hasClass(_37b,"ans-bool-val-eval-with-menu")){
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
var _37c=/^ans-.*-/;
for(var i=0;i<this.answers.count;i++){
arr.push(this.answers.getKeyByIndex(i).replace(_37c,""));
}
return arr;
},getLastAddedAnswerId:function(){
var _37d=/^ans-.*-/;
return this.answers.getKeyByIndex(this.answers.count-1).replace(_37d,"");
}});
});
},"dijit/_KeyNavContainer":function(){
define("dijit/_KeyNavContainer",["dojo/_base/kernel","./_Container","./_FocusMixin","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/event","dojo/dom-attr","dojo/_base/lang"],function(_37e,_37f,_380,_381,keys,_382,_383,_384,lang){
return _382("dijit._KeyNavContainer",[_380,_37f],{tabIndex:"0",connectKeyNavHandlers:function(_385,_386){
var _387=(this._keyNavCodes={});
var prev=lang.hitch(this,"focusPrev");
var next=lang.hitch(this,"focusNext");
_381.forEach(_385,function(code){
_387[code]=prev;
});
_381.forEach(_386,function(code){
_387[code]=next;
});
_387[keys.HOME]=lang.hitch(this,"focusFirstChild");
_387[keys.END]=lang.hitch(this,"focusLastChild");
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
this.connect(this.domNode,"onfocus","_onContainerFocus");
},startupKeyNavChildren:function(){
_37e.deprecated("startupKeyNavChildren() call no longer needed","","2.0");
},startup:function(){
this.inherited(arguments);
_381.forEach(this.getChildren(),lang.hitch(this,"_startupChild"));
},addChild:function(_388,_389){
this.inherited(arguments);
this._startupChild(_388);
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
},focusChild:function(_38a,last){
if(!_38a){
return;
}
if(this.focusedChild&&_38a!==this.focusedChild){
this._onChildBlur(this.focusedChild);
}
_38a.set("tabIndex",this.tabIndex);
_38a.focus(last?"end":"start");
this._set("focusedChild",_38a);
},_startupChild:function(_38b){
_38b.set("tabIndex","-1");
this.connect(_38b,"_onFocus",function(){
_38b.set("tabIndex",this.tabIndex);
});
this.connect(_38b,"_onBlur",function(){
_38b.set("tabIndex","-1");
});
},_onContainerFocus:function(evt){
if(evt.target!==this.domNode||this.focusedChild){
return;
}
this.focusFirstChild();
_384.set(this.domNode,"tabIndex","-1");
},_onBlur:function(evt){
if(this.tabIndex){
_384.set(this.domNode,"tabIndex",this.tabIndex);
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
_383.stop(evt);
}
},_onChildBlur:function(){
},_getFirstFocusableChild:function(){
return this._getNextFocusableChild(null,1);
},_getLastFocusableChild:function(){
return this._getNextFocusableChild(null,-1);
},_getNextFocusableChild:function(_38c,dir){
if(_38c){
_38c=this._getSiblingOfChild(_38c,dir);
}
var _38d=this.getChildren();
for(var i=0;i<_38d.length;i++){
if(!_38c){
_38c=_38d[(dir>0)?0:(_38d.length-1)];
}
if(_38c.isFocusable()){
return _38c;
}
_38c=this._getSiblingOfChild(_38c,dir);
}
return null;
}});
});
},"dijit/registry":function(){
define("dijit/registry",["dojo/_base/array","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window","."],function(_38e,has,_38f,win,_390){
var _391={},hash={};
var _392={length:0,add:function(_393){
if(hash[_393.id]){
throw new Error("Tried to register widget with id=="+_393.id+" but that id is already registered");
}
hash[_393.id]=_393;
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
},getUniqueId:function(_394){
var id;
do{
id=_394+"_"+(_394 in _391?++_391[_394]:_391[_394]=0);
}while(hash[id]);
return _390._scopeName=="dijit"?id:_390._scopeName+"_"+id;
},findWidgets:function(root){
var _395=[];
function _396(root){
for(var node=root.firstChild;node;node=node.nextSibling){
if(node.nodeType==1){
var _397=node.getAttribute("widgetId");
if(_397){
var _398=hash[_397];
if(_398){
_395.push(_398);
}
}else{
_396(node);
}
}
}
};
_396(root);
return _395;
},_destroyAll:function(){
_390._curFocus=null;
_390._prevFocus=null;
_390._activeStack=[];
_38e.forEach(_392.findWidgets(win.body()),function(_399){
if(!_399._destroyed){
if(_399.destroyRecursive){
_399.destroyRecursive();
}else{
if(_399.destroy){
_399.destroy();
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
_390.registry=_392;
return _392;
});
},"dijit/_base/manager":function(){
define("dijit/_base/manager",["dojo/_base/array","dojo/_base/config","../registry",".."],function(_39a,_39b,_39c,_39d){
_39a.forEach(["byId","getUniqueId","findWidgets","_destroyAll","byNode","getEnclosingWidget"],function(name){
_39d[name]=_39c[name];
});
_39d.defaultDuration=_39b["defaultDuration"]||200;
return _39d;
});
},"curam/matrix/TopRight":function(){
define("curam/matrix/TopRight",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_39e,dojo,_39f){
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
},setWidths:function(_3a0){
var c=curam.matrix.Constants.container;
this.totalHeadingWidth=Math.max(1,this.totalHeadingWidth+_3a0);
this.width=Math.max(1,this.totalHeadingWidth>c.maxTopRightWidth?c.maxTopRightWidth:this.totalHeadingWidth);
c.cssText.append(".matrix-container .right-eval{width:").append(this.totalHeadingWidth).append("px;}.matrix-container .top-right-eval{width:").append(this.width).append("px;}");
},setDefaultPriorityDimensions:function(){
var c=curam.matrix.Constants.container;
c.priorityWidth=c.tempDivs.priorityHeading.offsetWidth;
var _3a1=c.priorityWidth-curam.matrix.Constants.MATRIX_BORDER_SIZE;
var _3a2=c.tempDivs.priVal;
var _3a3=_3a1-dojo.style(_3a2,"marginLeft")-dojo.style(_3a2,"marginRight")-dojo.style(_3a2,"borderLeft")-dojo.style(_3a2,"borderRight")-dojo.style(_3a2,"paddingLeft")-dojo.style(_3a2,"paddingRight");
var _3a4=_3a3-c.inputBorderWidth-4;
c.cssText.append(".matrix-container .pri-col-eval{width:").append(_3a1).append("px;}").append(".matrix-container .pri-val-eval{width:").append(_3a3).append("px;}").append(".matrix-container .pri-input-eval{width:").append(_3a4).append("px;}");
},setDefaultCombinationDimensions:function(){
var c=curam.matrix.Constants.container;
var cell=c.tempDivs.cell;
var _3a5=c.tempDivs.cellInput;
c.cellHeight=c.reducedAnswHeight;
c.cellWidth=curam.matrix.Constants.COMBINATION_CELL_WIDTH;
c.cboxWidth=_3a5.offsetWidth;
c.cboxHeight=_3a5.clientHeight;
c.cboxOffsetDiff=_3a5.offsetWidth-_3a5.clientWidth;
var top=(c.cellHeight-c.cboxHeight-c.cboxOffsetDiff)/2;
var _3a6=(c.fullAnswerHeight+3-c.cboxHeight-c.cboxOffsetDiff)/2;
var left=(c.cellWidth-c.cboxWidth-c.cboxOffsetDiff)/2;
if(dojo.isFF){
left+=2;
}
c.cssText.append(".matrix-container .cbox-eval{left:").append(left).append("px;top:").append(top).append("px;}");
c.cssText.append(".matrix-container .cbox-eval-with-menu{left:").append(left).append("px;top:").append(_3a6).append("px;}");
c.cssText.append(".matrix-container .cell-first-row .cbox-eval{").append("top:").append(top).append("px;}");
},setInitialContradictionDimensions:function(){
if(this.container.matrix.contradictionsExist){
var _3a7=this.topRightTop.contradictionCol.combinationCount;
var _3a8=(_3a7*curam.matrix.Constants.COMBINATION_CELL_WIDTH)+((_3a7-1)*curam.matrix.Constants.MATRIX_BORDER_SIZE);
this.topRightTop.contradictionCol.setWidth(_3a8);
}
},setInitialOutcomeDimensions:function(){
var _3a9=0,_3aa,_3ab,_3ac,_3ad,_3ae,left;
if(this.container.matrix.outcomesExist){
var _3af=this.topRightTop.outcomeCols;
for(var i=0;i<_3af.count;i++){
_3aa=_3af.getObjectByIndex(i);
_3ac=_3aa.columns.count;
_3ad=(_3ac*curam.matrix.Constants.COMBINATION_CELL_WIDTH)+((_3ac-1)*curam.matrix.Constants.MATRIX_BORDER_SIZE);
_3ab=_3ad;
_3ae=curam.matrix.Constants.COMBINATION_CELL_WIDTH;
_3a9+=_3ab+curam.matrix.Constants.MATRIX_BORDER_SIZE;
_3aa.setWidth(_3aa.outId,_3ab);
}
}
return _3a9;
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
},addOutcomeColumn:function(_3b0){
this.topRightBottom.addOutcomeColumn(_3b0);
return this.topRightTop.addOutcomeColumn(_3b0);
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
define("dijit/a11y",["dojo/_base/array","dojo/_base/config","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-style","dojo/_base/sniff","./_base/manager","."],function(_3b1,_3b2,_3b3,dom,_3b4,_3b5,has,_3b6,_3b7){
var _3b8=(_3b7._isElementShown=function(elem){
var s=_3b5.get(elem);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(_3b4.get(elem,"type")!="hidden");
});
_3b7.hasDefaultTabStop=function(elem){
switch(elem.nodeName.toLowerCase()){
case "a":
return _3b4.has(elem,"href");
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
var _3b9=elem.contentDocument;
if("designMode" in _3b9&&_3b9.designMode=="on"){
return true;
}
body=_3b9.body;
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
var _3ba=(_3b7.isTabNavigable=function(elem){
if(_3b4.get(elem,"disabled")){
return false;
}else{
if(_3b4.has(elem,"tabIndex")){
return _3b4.get(elem,"tabIndex")>=0;
}else{
return _3b7.hasDefaultTabStop(elem);
}
}
});
_3b7._getTabNavigable=function(root){
var _3bb,last,_3bc,_3bd,_3be,_3bf,_3c0={};
function _3c1(node){
return node&&node.tagName.toLowerCase()=="input"&&node.type&&node.type.toLowerCase()=="radio"&&node.name&&node.name.toLowerCase();
};
var _3c2=function(_3c3){
for(var _3c4=_3c3.firstChild;_3c4;_3c4=_3c4.nextSibling){
if(_3c4.nodeType!=1||(has("ie")<=9&&_3c4.scopeName!=="HTML")||!_3b8(_3c4)){
continue;
}
if(_3ba(_3c4)){
var _3c5=_3b4.get(_3c4,"tabIndex");
if(!_3b4.has(_3c4,"tabIndex")||_3c5==0){
if(!_3bb){
_3bb=_3c4;
}
last=_3c4;
}else{
if(_3c5>0){
if(!_3bc||_3c5<_3bd){
_3bd=_3c5;
_3bc=_3c4;
}
if(!_3be||_3c5>=_3bf){
_3bf=_3c5;
_3be=_3c4;
}
}
}
var rn=_3c1(_3c4);
if(_3b4.get(_3c4,"checked")&&rn){
_3c0[rn]=_3c4;
}
}
if(_3c4.nodeName.toUpperCase()!="SELECT"){
_3c2(_3c4);
}
}
};
if(_3b8(root)){
_3c2(root);
}
function rs(node){
return _3c0[_3c1(node)]||node;
};
return {first:rs(_3bb),last:rs(last),lowest:rs(_3bc),highest:rs(_3be)};
};
_3b7.getFirstInTabbingOrder=function(root){
var _3c6=_3b7._getTabNavigable(dom.byId(root));
return _3c6.lowest?_3c6.lowest:_3c6.first;
};
_3b7.getLastInTabbingOrder=function(root){
var _3c7=_3b7._getTabNavigable(dom.byId(root));
return _3c7.last?_3c7.last:_3c7.highest;
};
return {hasDefaultTabStop:_3b7.hasDefaultTabStop,isTabNavigable:_3b7.isTabNavigable,_getTabNavigable:_3b7._getTabNavigable,getFirstInTabbingOrder:_3b7.getFirstInTabbingOrder,getLastInTabbingOrder:_3b7.getLastInTabbingOrder};
});
},"curam/matrix/Outcome":function(){
define("curam/matrix/Outcome",["dijit","dojo","dojox"],function(_3c8,dojo,_3c9){
dojo.provide("curam.matrix.Outcome");
dojo.declare("curam.matrix.Outcome",null,{constructor:function(node){
this.node=node;
this.rows=new curam.ListMap();
var _3ca=this.node.childNodes;
for(var i=0;i<_3ca.length;i++){
if(_3ca[i].nodeType==1){
this.rows.add(_3ca[i].id,new curam.matrix.OutcomeRow(_3ca[i]));
}
}
}});
});
},"curam/matrix/validation/DefaultCombinationValidator":function(){
define("curam/matrix/validation/DefaultCombinationValidator",["dijit","dojo","dojox"],function(_3cb,dojo,_3cc){
dojo.provide("curam.matrix.validation.DefaultCombinationValidator");
dojo.declare("curam.matrix.validation.DefaultCombinationValidator",curam.matrix.validation.DefaultValidator,{requiresRefresh:true,allValidators:[],allBitsets:[],state:{singleWarningActive:false,duplicateWarningActive:false,questionWarningActive:false,errorBitset1:null,errorBitset2:null,errorActive:false,warningActive:false},constructor:function(_3cd,opts){
this.container=_3cd;
if(opts){
dojo.mixin(this,opts);
}
},_registerValidator:function(_3ce){
for(var _3cf=0;_3cf<this.allValidators.length;_3cf++){
if(this.allValidators[_3cf].declaredClass==_3ce.declaredClass){
this.allValidators[_3cf]=_3ce;
return;
}
}
this.allValidators.push(_3ce);
},_checkRefresh:function(){
if(!this.inRefresh&&this.requiresRefresh){
this.container.matrix.refreshCombinationValidators();
this.requiresRefresh=false;
return true;
}
return false;
},_createBitset:function(_3d0,arr){
var _3d1=arr[_3d0]=new curam.util.BitSet();
_3d1.colNum=_3d0;
_3d1.owner=this;
_3d1.inputs=[];
this.allBitsets.push(_3d1);
return _3d1;
},_deleteBitset:function(_3d2){
for(var _3d3=0;_3d3<this.allBitsets.length;_3d3++){
if(this.allBitsets[_3d3]==_3d2){
this.allBitsets.splice(_3d3,1);
break;
}
}
},_deleteBitsets:function(_3d4){
for(var _3d5=0;_3d5<this.allBitsets.length;_3d5++){
if(this.allBitsets[_3d5]&&_3d4[this.allBitsets[_3d5].id]){
this.allBitsets.splice(_3d5,1);
_3d5--;
}
}
},_initCheckbox:function(_3d6,_3d7){
if(typeof (_3d6.bitsetId)=="undefined"||_3d6.bitsetId==null){
_3d6.bitsetId=_3d7.max+1;
_3d6.bitsetOwner=_3d7.id;
_3d7.inputs[_3d7.max+1]=_3d6;
_3d6.colNum=_3d7.colNum;
}
},_validateOne:function(_3d8){
return true;
},_validateQuestionCount:function(_3d9,qId){
return true;
},_validateAll:function(){
var _3da=this.allBitsets;
this.state.duplicateWarningActive=false;
for(var _3db=0;_3db<_3da.length-1;_3db++){
for(var _3dc=_3db+1;_3dc<_3da.length;_3dc++){
if(_3da[_3db]&&!_3da[_3db].isClear()&&_3da[_3db].equals(_3da[_3dc])){
this.state.duplicateWarningActive=true;
this._setErrorBitsets(_3da[_3db],_3da[_3dc]);
this.currentMsg=this.warningMsg;
return false;
}
}
}
return true;
},_validate:function(_3dd,_3de,qIds){
var _3df=this.state.errorBitset1;
var _3e0=this.state.errorBitset2;
this.state.singleWarningActive=this.state.duplicateWarningActive=this.state.questionWarningActive=false;
var _3e1=true;
if(qIds){
_3e1=this._validateQuestionCount(_3dd,qIds);
}
_3e1=_3e1&&(!_3dd||this._validateOne(_3dd))&&this._validateAll();
if(!_3e1){
var _3e2;
if(this.state.singleWarningActive||this.state.questionWarningActive){
_3e2=[this.state.errorBitset1];
}else{
if(this.state.duplicateWarningActive){
_3e2=[this.state.errorBitset1,this.state.errorBitset2];
}
}
if(_3e2){
if(_3de.bitsetOwner!=_3e2[0].id||(_3e2.length>1&&_3de.bitsetOwner!=_3e2[1].id)){
_3de=_3e2[0].inputs[0];
}
this.addWarning(_3e2,_3de);
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
return _3e1;
},onValid:function(){
},_setErrorBitsets:function(_3e3,_3e4){
var _3e5=(this.state.errorBitset1&&this.state.errorBitset1.id==_3e3.id)||(this.state.errorBitset2&&this.state.errorBitset2.id==_3e3.id);
var _3e6=_3e4?((this.state.errorBitset1&&this.state.errorBitset1.id==_3e4.id)||(this.state.errorBitset2&&this.state.errorBitset2.id==_3e4.id)):false;
if(_3e5&&_3e6){
return false;
}
if(this.isErrorActive()){
this.removeError(this.state.errorBitset1,this.state.errorBitset2);
}else{
if(this.isWarningActive()){
this.removeWarning();
}
}
this.state.errorBitset1=_3e3;
this.state.errorBitset2=_3e4;
return true;
},addWarning:function(_3e7,_3e8){
if(this.isErrorActive()&&(this.state.errorBitset1.colNum!=_3e7[0].colNum||(!this.state.errorBitset2||this.state.errorBitset2.colNum!=_3e7[1].colNum))){
this.removeError(this.state.errorBitset1,this.state.errorBitset2);
}
var ac=dojo.addClass;
var _3e9=this;
var _3ea=function(e){
if(_3e9.isWarningActive()){
_3e9.state.timeout=setTimeout(function(){
_3e9.addError();
},10);
}
};
var _3eb=function(e){
if(!_3e9.state.timeout||(typeof (e.target.colNum)=="undefined"||!_3e9.isWarningActive())){
return true;
}
if(_3e9.isInputPartOfValidation(e.target)){
clearTimeout(_3e9.state.timeout);
_3e9.state.timeout=null;
}else{
dojo.stopEvent(e);
return false;
}
};
this.state.allowableFields=[];
var _3ec=-1,_3ed=-1;
var _3ee;
if(this.state.questionWarningActive){
var _3ef=_3e7[0].inputs;
for(var _3f0=0;_3f0<_3ef.length;_3f0++){
if(_3ef[_3f0].checked&&_3ef[_3f0].qId==this.state.questionWarningActive){
if(_3ec==-1){
_3ec=_3f0;
}else{
if(_3f0>_3ed){
_3ed=_3f0;
break;
}
}
}else{
if(_3ed!=-1){
break;
}
}
}
_3ed=Math.min(_3ed,_3ef.length);
_3ee=function(_3f1,pos){
if(_3f1.checked&&pos>=_3ec&&pos<=_3ed){
return true;
}
return false;
};
}else{
_3ec=0;
_3ed=_3e7[0].inputs.length-1;
_3ee=function(){
return true;
};
}
this.state.firstInput=_3ec;
this.state.lastInput=_3ed;
for(var _3f2=0;_3f2<_3e7.length;_3f2++){
var _3ef=_3e7[_3f2].inputs;
ac(_3ef[_3ec].parentNode,"combination-validation-top");
if(_3ee(_3ef[_3ec],_3ec)){
this.state.allowableFields.push(_3ef[_3ec].id);
}
for(var _3f0=_3ec+1;_3f0<_3ed;_3f0++){
if(_3ee(_3ef[_3f0],_3f0)&&_3ef[_3f0]&&_3ef[_3f0].id){
this.state.allowableFields.push(_3ef[_3f0].id);
}
ac(_3ef[_3f0].parentNode,"combination-validation");
}
ac(_3ef[_3ed].parentNode,"combination-validation-bottom");
if(_3ee(_3ef[_3ed],_3ed)){
this.state.allowableFields.push(_3ef[_3ed].id);
}
for(var _3f0=0;_3f0<_3ef.length;_3f0++){
if(!_3ef[_3f0]["validationListenersAdded"]){
_3ef[_3f0]["validationListenersAdded"]=true;
dojo.connect(_3ef[_3f0],"onblur",_3ea);
dojo.connect(_3ef[_3f0],"onfocus",_3eb);
}
}
}
this.setWarningActive(true);
this.focusElement=this.state.activeChangedInput=_3e8?_3e8:this.state.allowableFields[0];
this.container.activateWarning(this.currentMsg);
},addError:function(){
if(!this.isWarningActive()){
return;
}
var _3f3;
if(this.state.singleWarningActive||this.state.questionWarningActive){
_3f3=[this.state.errorBitset1];
}else{
if(this.state.duplicateWarningActive){
_3f3=[this.state.errorBitset1,this.state.errorBitset2];
}
}
if(_3f3){
this.cancelInputTabs();
var _3f4=_3f3[0].inputs[0];
var _3f5=_3f3.length>1?1:0;
var _3f6=_3f3[_3f5].inputs[_3f3[_3f5].inputs.length-1];
this.setErrorActive(true);
this.setWarningActive(false);
this.container.matrix.disableInputs(_3f4,_3f6,"combination");
dojo.publish("/disableInput",null);
var repc=cm.replaceClass;
var _3f7=this;
this.state.activeChangedInput.focus();
this.container.activateError(this.currentMsg);
}
},removeError:function(_3f8,_3f9){
if(!_3f8&&!_3f9){
return;
}
var _3fa=this.state.errorBitset2?[_3f8,_3f9]:[_3f8];
this._changeClassesFromColumn(_3fa,true);
if(_3f8.colNum==this.state.errorBitset1.colNum){
this.state.errorBitset1=null;
}
if(_3f9&&this.state.errorBitset2&&_3f9.colNum==this.state.errorBitset2.colNum){
this.state.errorBitset2=null;
}
this.setErrorActive(false);
for(var _3fb=0;_3fb<_3fa.length;_3fb++){
if(_3fa[_3fb].owner!=this){
_3fa[_3fb].owner.setErrorActive(false);
}
}
this.state.activeChangedInput=null;
this.clearInputTabListeners();
this.container.deactivateValidation();
},removeWarning:function(){
if(!this.state.errorBitset1&&!this.state.errorBitset2){
return;
}
var _3fc=[this.state.errorBitset1];
if(this.state.errorBitset2){
_3fc[1]=this.state.errorBitset2;
}
this._changeClassesFromColumn(_3fc,true);
this.state.errorBitset1=this.state.errorBitset2=null;
this.setWarningActive(false);
this.state.activeChangedInput=null;
this.container.deactivateValidation();
},_changeClassesFromColumn:function(_3fd,_3fe){
var fn;
if(_3fe){
fn=dojo.removeClass;
}else{
fn=dojo.addClass;
}
var _3ff=this.state.firstInput;
var _400=this.state.lastInput;
for(var _401=0;_401<_3fd.length;_401++){
if(!this.bitsets){
continue;
}
var _402=_3fd[_401].inputs;
fn(_402[_3ff].parentNode,"combination-validation-top");
for(var _403=_3ff+1;_403<_400;_403++){
fn(_402[_403].parentNode,"combination-validation");
}
fn(_402[_400].parentNode,"combination-validation-bottom");
}
},isInputPartOfValidation:function(_404){
if(!_404.bitsetOwner||!this.isErrorActive()&&!this.isWarningActive()||!this.state.allowableFields){
return false;
}
if((this.state.errorBitset1&&this.state.errorBitset1.id==_404.bitsetOwner)||(this.state.errorBitset2&&this.state.errorBitset2.id==_404.bitsetOwner)){
return true;
}
return false;
}});
});
},"curam/matrix/validation/PriorityValidator":function(){
define("curam/matrix/validation/PriorityValidator",["dijit","dojo","dojox"],function(_405,dojo,_406){
dojo.provide("curam.matrix.validation.PriorityValidator");
dojo.declare("curam.matrix.validation.PriorityValidator",curam.matrix.validation.DefaultValidator,{constructor:function(_407){
this.setErrorActive(false);
this.activeChangedInput=null;
this.activeExistingInput=null;
this.focusElement=null;
this.container=_407;
this.duplicateMsg=_407.i18nMsgs.duplicateMsg;
},validatePriority:function(e){
if(this.checkForTabShiftKey(e)){
return;
}
var id=e.target.id;
var _408=dojo.byId(id).value;
this.unvalidatePriorities();
if(_408==""){
return;
}
var _409=e.target.priorityGroup.priorities;
var _40a=e.target.priority;
for(var i=0;i<_409.count;i++){
if(_40a.node.id==_409.getObjectByIndex(i).node.id){
continue;
}
var _40b=_409.getObjectByIndex(i);
if(_408==_40b.input.value){
this.validatePriorities(_40a,_40b,this.duplicateMsg);
this.focusElement=_40a.input;
this.state.allowableFields=[_40a.input.id,_40b.input.id];
this.addFocusListener([_40a.input,_40b.input]);
var _40c=this;
setTimeout(function(){
_40c.focusElement.focus();
},10);
return;
}
}
},validatePriorities:function(_40d,_40e,_40f){
dojo.addClass(_40d.validation,"validateWarn");
dojo.addClass(_40e.validation,"validateWarn");
this.activeChangedInput=_40d;
this.activeExistingInput=_40e;
this.setWarningActive(true);
this.container.activateWarning(_40f);
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
var _410=e.target.parentNode.id;
if(_410==this.activeChangedInput.validation.id||_410==this.activeExistingInput.validation.id){
var _411=this;
this.timeout=setTimeout(function(){
_411.addError(e);
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
var _412=this;
setTimeout(function(){
_412.focusElement.focus();
},10);
this.setWarningActive(false);
this.setErrorActive(true);
}});
});
},"dijit/Menu":function(){
define("dijit/Menu",["require","dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window","dojo/window","./popup","./DropDownMenu","dojo/ready"],function(_413,_414,_415,_416,dom,_417,_418,_419,_41a,keys,lang,on,has,win,_41b,pm,_41c,_41d){
if(!_41a.isAsync){
_41d(0,function(){
var _41e=["dijit/MenuItem","dijit/PopupMenuItem","dijit/CheckedMenuItem","dijit/MenuSeparator"];
_413(_41e);
});
}
return _415("dijit.Menu",_41c,{constructor:function(){
this._bindings=[];
},targetNodeIds:[],contextMenuForWindow:false,leftClickToOpen:false,refocus:true,postCreate:function(){
if(this.contextMenuForWindow){
this.bindDomNode(win.body());
}else{
_414.forEach(this.targetNodeIds,this.bindDomNode,this);
}
this.inherited(arguments);
},_iframeContentWindow:function(_41f){
return _41b.get(this._iframeContentDocument(_41f))||this._iframeContentDocument(_41f)["__parent__"]||(_41f.name&&win.doc.frames[_41f.name])||null;
},_iframeContentDocument:function(_420){
return _420.contentDocument||(_420.contentWindow&&_420.contentWindow.document)||(_420.name&&win.doc.frames[_420.name]&&win.doc.frames[_420.name].document)||null;
},bindDomNode:function(node){
node=dom.byId(node);
var cn;
if(node.tagName.toLowerCase()=="iframe"){
var _421=node,_422=this._iframeContentWindow(_421);
cn=win.withGlobal(_422,win.body);
}else{
cn=(node==win.body()?win.doc.documentElement:node);
}
var _423={node:node,iframe:_421};
_417.set(node,"_dijitMenu"+this.id,this._bindings.push(_423));
var _424=lang.hitch(this,function(cn){
return [on(cn,this.leftClickToOpen?"click":"contextmenu",lang.hitch(this,function(evt){
_416.stop(evt);
this._scheduleOpen(evt.target,_421,{x:evt.pageX,y:evt.pageY});
})),on(cn,"keydown",lang.hitch(this,function(evt){
if(evt.shiftKey&&evt.keyCode==keys.F10){
_416.stop(evt);
this._scheduleOpen(evt.target,_421);
}
}))];
});
_423.connects=cn?_424(cn):[];
if(_421){
_423.onloadHandler=lang.hitch(this,function(){
var _425=this._iframeContentWindow(_421);
cn=win.withGlobal(_425,win.body);
_423.connects=_424(cn);
});
if(_421.addEventListener){
_421.addEventListener("load",_423.onloadHandler,false);
}else{
_421.attachEvent("onload",_423.onloadHandler);
}
}
},unBindDomNode:function(_426){
var node;
try{
node=dom.byId(_426);
}
catch(e){
return;
}
var _427="_dijitMenu"+this.id;
if(node&&_417.has(node,_427)){
var bid=_417.get(node,_427)-1,b=this._bindings[bid],h;
while(h=b.connects.pop()){
h.remove();
}
var _428=b.iframe;
if(_428){
if(_428.removeEventListener){
_428.removeEventListener("load",b.onloadHandler,false);
}else{
_428.detachEvent("onload",b.onloadHandler);
}
}
_417.remove(node,_427);
delete this._bindings[bid];
}
},_scheduleOpen:function(_429,_42a,_42b){
if(!this._openTimer){
this._openTimer=setTimeout(lang.hitch(this,function(){
delete this._openTimer;
this._openMyself({target:_429,iframe:_42a,coords:_42b});
}),1);
}
},_openMyself:function(args){
var _42c=args.target,_42d=args.iframe,_42e=args.coords;
if(_42e){
if(_42d){
var ifc=_418.position(_42d,true),_42f=this._iframeContentWindow(_42d),_430=win.withGlobal(_42f,"_docScroll",dojo);
var cs=_419.getComputedStyle(_42d),tp=_419.toPixelValue,left=(has("ie")&&has("quirks")?0:tp(_42d,cs.paddingLeft))+(has("ie")&&has("quirks")?tp(_42d,cs.borderLeftWidth):0),top=(has("ie")&&has("quirks")?0:tp(_42d,cs.paddingTop))+(has("ie")&&has("quirks")?tp(_42d,cs.borderTopWidth):0);
_42e.x+=ifc.x+left-_430.x;
_42e.y+=ifc.y+top-_430.y;
}
}else{
_42e=_418.position(_42c,true);
_42e.x+=10;
_42e.y+=10;
}
var self=this;
var _431=this._focusManager.get("prevNode");
var _432=this._focusManager.get("curNode");
var _433=!_432||(dom.isDescendant(_432,this.domNode))?_431:_432;
function _434(){
if(self.refocus&&_433){
_433.focus();
}
pm.close(self);
};
pm.open({popup:this,x:_42e.x,y:_42e.y,onExecute:_434,onCancel:_434,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){
this.inherited("_onBlur",arguments);
pm.close(this);
};
},uninitialize:function(){
_414.forEach(this._bindings,function(b){
if(b){
this.unBindDomNode(b.node);
}
},this);
this.inherited(arguments);
}});
});
},"curam/StringBuffer":function(){
define("curam/StringBuffer",[],function(){
var _435=dojo.declare("curam.StringBuffer",null,{constructor:function(){
this.buffer=[];
},append:function append(_436){
this.buffer.push(_436);
return this;
},toString:function toString(){
return this.buffer.join("");
}});
return _435;
});
},"dijit/MenuSeparator":function(){
require({cache:{"url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>"}});
define("dijit/MenuSeparator",["dojo/_base/declare","dojo/dom","./_WidgetBase","./_TemplatedMixin","./_Contained","dojo/text!./templates/MenuSeparator.html"],function(_437,dom,_438,_439,_43a,_43b){
return _437("dijit.MenuSeparator",[_438,_439,_43a],{templateString:_43b,buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.domNode,false);
},isFocusable:function(){
return false;
}});
});
},"dijit/place":function(){
define("dijit/place",["dojo/_base/array","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/window","dojo/window",".","dojo/_base/lang"],function(_43c,_43d,_43e,_43f,win,_440,_441,lang){
function _442(node,_443,_444,_445){
var view=_440.getBox();
if(!node.parentNode||String(node.parentNode.tagName).toLowerCase()!="body"){
win.body().appendChild(node);
}
var best=null;
_43c.some(_443,function(_446){
var _447=_446.corner;
var pos=_446.pos;
var _448=0;
var _449={w:{"L":view.l+view.w-pos.x,"R":pos.x-view.l,"M":view.w}[_447.charAt(1)],h:{"T":view.t+view.h-pos.y,"B":pos.y-view.t,"M":view.h}[_447.charAt(0)]};
if(_444){
var res=_444(node,_446.aroundCorner,_447,_449,_445);
_448=typeof res=="undefined"?0:res;
}
var _44a=node.style;
var _44b=_44a.display;
var _44c=_44a.visibility;
if(_44a.display=="none"){
_44a.visibility="hidden";
_44a.display="";
}
var mb=_43d.getMarginBox(node);
_44a.display=_44b;
_44a.visibility=_44c;
var _44d={"L":pos.x,"R":pos.x-mb.w,"M":Math.max(view.l,Math.min(view.l+view.w,pos.x+(mb.w>>1))-mb.w)}[_447.charAt(1)],_44e={"T":pos.y,"B":pos.y-mb.h,"M":Math.max(view.t,Math.min(view.t+view.h,pos.y+(mb.h>>1))-mb.h)}[_447.charAt(0)],_44f=Math.max(view.l,_44d),_450=Math.max(view.t,_44e),endX=Math.min(view.l+view.w,_44d+mb.w),endY=Math.min(view.t+view.h,_44e+mb.h),_451=endX-_44f,_452=endY-_450;
_448+=(mb.w-_451)+(mb.h-_452);
if(lang.exists("curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm")&&curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm==true){
if((_447.charAt(0)=="T"||_447.charAt(1)=="L")&&_448>0){
_448=mb.w+mb.h;
}
}
if(best==null||_448<best.overflow){
best={corner:_447,aroundCorner:_446.aroundCorner,x:_44f,y:_450,w:_451,h:_452,overflow:_448,spaceAvailable:_449};
}
return !_448;
});
if(best.overflow&&_444){
_444(node,best.aroundCorner,best.corner,best.spaceAvailable,_445);
}
var l=_43d.isBodyLtr(),s=node.style;
s.top=best.y+"px";
s[l?"left":"right"]=(l?best.x:view.w-best.x-best.w)+"px";
s[l?"right":"left"]="auto";
return best;
};
return (_441.place={at:function(node,pos,_453,_454){
var _455=_43c.map(_453,function(_456){
var c={corner:_456,pos:{x:pos.x,y:pos.y}};
if(_454){
c.pos.x+=_456.charAt(1)=="L"?_454.x:-_454.x;
c.pos.y+=_456.charAt(0)=="T"?_454.y:-_454.y;
}
return c;
});
return _442(node,_455);
},around:function(node,_457,_458,_459,_45a){
var _45b=(typeof _457=="string"||"offsetWidth" in _457)?_43d.position(_457,true):_457;
if(_457.parentNode){
var _45c=_43e.getComputedStyle(_457).position=="absolute";
var _45d=_457.parentNode;
while(_45d&&_45d.nodeType==1&&_45d.nodeName!="BODY"){
var _45e=_43d.position(_45d,true),pcs=_43e.getComputedStyle(_45d);
if(/relative|absolute/.test(pcs.position)){
_45c=false;
}
if(!_45c&&/hidden|auto|scroll/.test(pcs.overflow)){
var _45f=Math.min(_45b.y+_45b.h,_45e.y+_45e.h);
var _460=Math.min(_45b.x+_45b.w,_45e.x+_45e.w);
_45b.x=Math.max(_45b.x,_45e.x);
_45b.y=Math.max(_45b.y,_45e.y);
_45b.h=_45f-_45b.y;
_45b.w=_460-_45b.x;
}
if(pcs.position=="absolute"){
_45c=true;
}
_45d=_45d.parentNode;
}
}
var x=_45b.x,y=_45b.y,_461="w" in _45b?_45b.w:(_45b.w=_45b.width),_462="h" in _45b?_45b.h:(_43f.deprecated("place.around: dijit.place.__Rectangle: { x:"+x+", y:"+y+", height:"+_45b.height+", width:"+_461+" } has been deprecated.  Please use { x:"+x+", y:"+y+", h:"+_45b.height+", w:"+_461+" }","","2.0"),_45b.h=_45b.height);
var _463=[];
function push(_464,_465){
_463.push({aroundCorner:_464,corner:_465,pos:{x:{"L":x,"R":x+_461,"M":x+(_461>>1)}[_464.charAt(1)],y:{"T":y,"B":y+_462,"M":y+(_462>>1)}[_464.charAt(0)]}});
};
_43c.forEach(_458,function(pos){
var ltr=_459;
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
var _466=_442(node,_463,_45a,{w:_461,h:_462});
_466.aroundNodePos=_45b;
return _466;
}});
});
},"curam/matrix/Contradiction":function(){
define("curam/matrix/Contradiction",["dijit","dojo","dojox"],function(_467,dojo,_468){
dojo.provide("curam.matrix.Contradiction");
dojo.declare("curam.matrix.Contradiction",null,{constructor:function(node){
this.node=node;
this.rows=new curam.ListMap();
var _469=this.node.childNodes;
for(var i=0;i<_469.length;i++){
if(_469[i].nodeType==1){
this.rows.add(_469[i].id,new curam.matrix.ContradictionRow(_469[i]));
}
}
}});
});
},"curam/matrix/OutcomeRow":function(){
define("curam/matrix/OutcomeRow",["dijit","dojo","dojox"],function(_46a,dojo,_46b){
dojo.provide("curam.matrix.OutcomeRow");
dojo.declare("curam.matrix.OutcomeRow",null,{constructor:function(node){
this.node=node;
this.cells=new curam.ListMap();
var _46c=this.node.childNodes;
for(var i=0;i<_46c.length;i++){
if(_46c[i].nodeType==1){
this.cells.add(_46c[i].id,new curam.matrix.OutcomeCell(_46c[i]));
}
}
}});
});
},"dijit/DropDownMenu":function(){
require({cache:{"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n"}});
define("dijit/DropDownMenu",["dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/text!./templates/Menu.html","./_OnDijitClickMixin","./_MenuBase"],function(_46d,_46e,keys,_46f,_470,_471){
return _46d("dijit.DropDownMenu",[_471,_470],{templateString:_46f,baseClass:"dijitMenu",postCreate:function(){
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
_46e.stop(evt);
break;
case this._closeSubMenuKey:
if(this.parentMenu){
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
}else{
_46e.stop(evt);
}
break;
}
}});
});
},"curam/matrix/OutcomeCell":function(){
define("curam/matrix/OutcomeCell",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_472,dojo,_473){
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
var _474=this;
curam.matrix.Constants.container.matrix.addLazyWidget(this,"cells");
this.lazyListener=function(_475){
if(!curam.matrix.Constants.container.matrix.createLazyWidgets("cells")){
dojo.disconnect(_474.button._conn);
return;
}
if(!_474.widget){
return;
}
_474.widget._toggleMenu("CombinationOptions",_475);
window.activeMenuID=_474.node.id;
_472.byId("CombinationOptions")._openMyself(curam.matrix.Constants.container.getFakeEvent(_474.widget.domNode));
};
this.button._conn=dojo.connect(this.button,"onclick",this,"lazyListener");
}
},createWidget:function(_476){
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
},setButtonClass:function(_477){
if(!this.button){
this.button=dojo.create("div");
this.node.appendChild(this.button);
this.button._conn=dojo.connect(this.button,"onclick",this,"createWidget");
}
cm.setClass(this.button,_477);
if(!this.widgetCreated&&_477=="image"){
this.initListener();
}
},adjustFirstRowClass:function(_478){
var _479=dojo.attr(this.node,"class");
if(_479.indexOf("ans-eval-with-menu")==-1){
_479=_479.replace("ans-eval","ans-eval-with-menu");
cm.setClass(this.node,_479);
}
_479=dojo.attr(this.input,"class");
if(_479.indexOf("cbox-eval-with-menu")==-1){
_479=_479.replace("cbox-eval","cbox-eval-with-menu");
cm.setClass(this.input,_479);
}
}});
});
},"curam/widget/MatrixPopupMenu":function(){
define("curam/widget/MatrixPopupMenu",["dijit","dojo","dojox","dojo/require!dijit/Menu,dijit/MenuSeparator,curam/matrix/Constants"],function(_47a,dojo,_47b){
dojo.provide("curam.widget.MatrixPopupMenu");
dojo.require("dijit.Menu");
dojo.require("dijit.MenuSeparator");
dojo.require("curam.matrix.Constants");
dojo.declare("curam.widget.MatrixPopupMenu",_47a.Menu,{id:"",allMenuItemsDisabled:false,mcontainer:null,leftClickToOpen:true,postCreate:function(){
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
var _47c=this.getMenuItems();
for(var i=0;i<_47c.length;i++){
_47c[i].enableItem();
}
},_openMyself:function(_47d){
if(curam.matrix.Constants.container.matrix.isValidationActive()){
return;
}
if(!this.allMenuItemsDisabled){
_47a.Menu.prototype._openMyself.call(this,_47d);
var _47e=_47d.target;
setTimeout(dojo.hitch(this,function(){
this.enableAllItems();
this.checkValidations(this.myParent);
this.explodeSrc=_47e;
}),2);
}
},checkValidations:function(_47f){
var _480=this.getMenuItems();
if(this.id=="OutcomeOptions"){
this.checkOutcomeGroupOptions(_480,_47f);
}else{
if(this.id=="AnswerOptions"){
this.checkAnswerOptions(_480,_47f);
}else{
if(this.id=="QuestionOptions"){
this.checkQuestionOptions(_480,_47f);
}else{
if(this.id=="CombinationOptions"){
this.checkSingleOutcomeOptions(_480,_47f);
}
}
}
}
},getMenuItems:function(){
if(!this.menuItems){
this.menuItems=dojo.query("> .dijitMenuItem",this.containerNode).map(_47a.byNode);
dojo.forEach(this.menuItems,dojo.hitch(this,function(item){
this.menuItems[item.id]=item;
}));
}
return this.menuItems;
},checkOutcomeGroupOptions:function(_481,_482){
var _483=this.mcontainer.matrix.hasCopiedCombination();
dojo.forEach(_481,dojo.hitch(this,function(item){
if(item.id=="pasteCombination"&&!_483){
item.set("disabled",true);
}
}));
},checkAnswerOptions:function(_484,_485){
var _486=this.mcontainer.matrix.getQuestionFromAnswerId(this.answerId);
var _487=_486.ansGroup;
var _488=_487.answers.getObjectByKey(this.answerId);
if((_487.answerCount==1||_487.answerType==curam.matrix.Constants.ANSWER_TYPE_BOOLEAN)&&_484["deleteAnswer"]){
_484["deleteAnswer"].set("disabled",true);
}
if((_487.answerType!=curam.matrix.Constants.ANSWER_TYPE_NUMERIC||!_488.specificValue)&&_484[curam.matrix.Constants.MIN_MAX]){
_484[curam.matrix.Constants.MIN_MAX].set("disabled",true);
}
if((_487.answerType==curam.matrix.Constants.ANSWER_TYPE_NUMERIC&&_488.specificValue&&_484["useValue"])||_487.answerType!=curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
_484["useValue"].set("disabled",true);
}
},checkQuestionOptions:function(_489,_48a){
var _48b=_48a.id.replace("num-","");
var _48c=this.mcontainer.matrix.bottomLeft.bottomLeftMain.getQuestion(_48b);
if(_48c==null){
return;
}
var _48d=(typeof (_48c["answerType"]=="undefined"))?_48c.ansGroup.answerType:_48c.answerType;
if(_489["addAnswer"]){
if(_48d==curam.matrix.Constants.ANSWER_TYPE_BOOLEAN){
_489["addAnswer"].set("disabled",true);
}else{
if(_48d==curam.matrix.Constants.ANSWER_TYPE_CODETABLE&&_48c.ansGroup.answerCount==_48c.getAnswer(1).select.length){
_489["addAnswer"].set("disabled",true);
}
}
}
},checkSingleOutcomeOptions:function(_48e,_48f){
var _490;
var _491=this.determineIfContradiction(this.combinationId);
if(_491){
_490=this.determineNumCombsInContradictions();
}else{
_490=this.determineNumCombsInOutcome(_48f.id);
}
for(var i=0;i<_48e.length;i++){
if(_48e[i].id=="deleteCombination"&&_490==1){
_48e[i].set("disabled",true);
}
if(_48e[i].id=="addMessage"&&!_491){
_48e[i].set("disabled",true);
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
define("dijit/_Widget",["dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/ready","./registry","./_WidgetBase","./_OnDijitClickMixin","./_FocusMixin","dojo/uacss","./hccss"],function(_492,_493,_494,_495,_496,lang,_497,_498,_499,_49a,_49b,_49c){
function _49d(){
};
function _49e(_49f){
return function(obj,_4a0,_4a1,_4a2){
if(obj&&typeof _4a0=="string"&&obj[_4a0]==_49d){
return obj.on(_4a0.substring(2).toLowerCase(),lang.hitch(_4a1,_4a2));
}
return _49f.apply(_494,arguments);
};
};
_492.around(_494,"connect",_49e);
if(_496.connect){
_492.around(_496,"connect",_49e);
}
var _4a3=_495("dijit._Widget",[_49a,_49b,_49c],{onClick:_49d,onDblClick:_49d,onKeyDown:_49d,onKeyPress:_49d,onKeyUp:_49d,onMouseDown:_49d,onMouseMove:_49d,onMouseOut:_49d,onMouseOver:_49d,onMouseLeave:_49d,onMouseEnter:_49d,onMouseUp:_49d,constructor:function(_4a4){
this._toConnect={};
for(var name in _4a4){
if(this[name]===_49d){
this._toConnect[name.replace(/^on/,"").toLowerCase()]=_4a4[name];
delete _4a4[name];
}
}
},postCreate:function(){
this.inherited(arguments);
for(var name in this._toConnect){
this.on(name,this._toConnect[name]);
}
delete this._toConnect;
},on:function(type,func){
if(this[this._onMap(type)]===_49d){
return _494.connect(this.domNode,type.toLowerCase(),this,func);
}
return this.inherited(arguments);
},_setFocusedAttr:function(val){
this._focused=val;
this._set("focused",val);
},setAttribute:function(attr,_4a5){
_496.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(attr,_4a5);
},attr:function(name,_4a6){
if(_493.isDebug){
var _4a7=arguments.callee._ach||(arguments.callee._ach={}),_4a8=(arguments.callee.caller||"unknown caller").toString();
if(!_4a7[_4a8]){
_496.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+_4a8,"","2.0");
_4a7[_4a8]=true;
}
}
var args=arguments.length;
if(args>=2||typeof name==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(name);
}
},getDescendants:function(){
_496.deprecated(this.declaredClass+"::getDescendants() is deprecated. Use getChildren() instead.","","2.0");
return this.containerNode?_497("[widgetId]",this.containerNode).map(_499.byNode):[];
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
if(!_496.isAsync){
_498(0,function(){
var _4a9=["dijit/_base"];
require(_4a9);
});
}
return _4a3;
});
},"dijit/_OnDijitClickMixin":function(){
define("dijit/_OnDijitClickMixin",["dojo/on","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(on,_4aa,keys,_4ab,has,_4ac,win){
var _4ad=null;
if(has("ie")){
(function(){
var _4ae=function(evt){
_4ad=evt.srcElement;
};
win.doc.attachEvent("onkeydown",_4ae);
_4ac.addOnWindowUnload(function(){
win.doc.detachEvent("onkeydown",_4ae);
});
})();
}else{
win.doc.addEventListener("keydown",function(evt){
_4ad=evt.target;
},true);
}
var _4af=function(node,_4b0){
if(/input|button/i.test(node.nodeName)){
return on(node,"click",_4b0);
}else{
function _4b1(e){
return (e.keyCode==keys.ENTER||e.keyCode==keys.SPACE)&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey;
};
var _4b2=[on(node,"keypress",function(e){
if(_4b1(e)){
_4ad=e.target;
e.preventDefault();
}
}),on(node,"keyup",function(e){
if(_4b1(e)&&e.target==_4ad){
_4ad=null;
_4b0.call(this,e);
}
}),on(node,"click",function(e){
_4b0.call(this,e);
})];
return {remove:function(){
_4aa.forEach(_4b2,function(h){
h.remove();
});
}};
}
};
return _4ab("dijit._OnDijitClickMixin",null,{connect:function(obj,_4b3,_4b4){
return this.inherited(arguments,[obj,_4b3=="ondijitclick"?_4af:_4b3,_4b4]);
}});
});
},"dijit/_FocusMixin":function(){
define("dijit/_FocusMixin",["./focus","./_WidgetBase","dojo/_base/declare","dojo/_base/lang"],function(_4b5,_4b6,_4b7,lang){
lang.extend(_4b6,{focused:false,onFocus:function(){
},onBlur:function(){
},_onFocus:function(){
this.onFocus();
},_onBlur:function(){
this.onBlur();
}});
return _4b7("dijit._FocusMixin",null,{_focusManager:_4b5});
});
},"dojo/cache":function(){
define("dojo/cache",["./_base/kernel","./text"],function(dojo,text){
return dojo.cache;
});
},"dijit/_Templated":function(){
define("dijit/_Templated",["./_WidgetBase","./_TemplatedMixin","./_WidgetsInTemplateMixin","dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/_base/kernel"],function(_4b8,_4b9,_4ba,_4bb,_4bc,lang,_4bd){
lang.extend(_4b8,{waiRole:"",waiState:""});
return _4bc("dijit._Templated",[_4b9,_4ba],{widgetsInTemplate:false,constructor:function(){
_4bd.deprecated(this.declaredClass+": dijit._Templated deprecated, use dijit._TemplatedMixin and if necessary dijit._WidgetsInTemplateMixin","","2.0");
},_attachTemplateNodes:function(_4be,_4bf){
this.inherited(arguments);
var _4c0=lang.isArray(_4be)?_4be:(_4be.all||_4be.getElementsByTagName("*"));
var x=lang.isArray(_4be)?0:-1;
for(;x<_4c0.length;x++){
var _4c1=(x==-1)?_4be:_4c0[x];
var role=_4bf(_4c1,"waiRole");
if(role){
_4c1.setAttribute("role",role);
}
var _4c2=_4bf(_4c1,"waiState");
if(_4c2){
_4bb.forEach(_4c2.split(/\s*,\s*/),function(_4c3){
if(_4c3.indexOf("-")!=-1){
var pair=_4c3.split("-");
_4c1.setAttribute("aria-"+pair[0],pair[1]);
}
});
}
}
}});
});
},"dijit/focus":function(){
define("dijit/focus",["dojo/aspect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/Evented","dojo/_base/lang","dojo/on","dojo/ready","dojo/_base/sniff","dojo/Stateful","dojo/_base/unload","dojo/_base/window","dojo/window","./a11y","./registry","."],function(_4c4,_4c5,dom,_4c6,_4c7,_4c8,lang,on,_4c9,has,_4ca,_4cb,win,_4cc,a11y,_4cd,_4ce){
var _4cf=_4c5([_4ca,_4c8],{curNode:null,activeStack:[],constructor:function(){
var _4d0=lang.hitch(this,function(node){
if(dom.isDescendant(this.curNode,node)){
this.set("curNode",null);
}
if(dom.isDescendant(this.prevNode,node)){
this.set("prevNode",null);
}
});
_4c4.before(_4c7,"empty",_4d0);
_4c4.before(_4c7,"destroy",_4d0);
},registerIframe:function(_4d1){
return this.registerWin(_4d1.contentWindow,_4d1);
},registerWin:function(_4d2,_4d3){
var _4d4=this;
var _4d5=function(evt){
_4d4._justMouseDowned=true;
setTimeout(function(){
_4d4._justMouseDowned=false;
},0);
if(has("ie")&&evt&&evt.srcElement&&evt.srcElement.parentNode==null){
return;
}
_4d4._onTouchNode(_4d3||evt.target||evt.srcElement,"mouse");
};
var doc=has("ie")?_4d2.document.documentElement:_4d2.document;
if(doc){
if(has("ie")){
_4d2.document.body.attachEvent("onmousedown",_4d5);
var _4d6=function(evt){
var tag=evt.srcElement.tagName.toLowerCase();
if(tag=="#document"||tag=="body"){
return;
}
if(a11y.isTabNavigable(evt.srcElement)){
_4d4._onFocusNode(_4d3||evt.srcElement);
}else{
_4d4._onTouchNode(_4d3||evt.srcElement);
}
};
doc.attachEvent("onactivate",_4d6);
var _4d7=function(evt){
_4d4._onBlurNode(_4d3||evt.srcElement);
};
doc.attachEvent("ondeactivate",_4d7);
return {remove:function(){
_4d2.document.detachEvent("onmousedown",_4d5);
doc.detachEvent("onactivate",_4d6);
doc.detachEvent("ondeactivate",_4d7);
doc=null;
}};
}else{
doc.body.addEventListener("mousedown",_4d5,true);
doc.body.addEventListener("touchstart",_4d5,true);
var _4d8=function(evt){
_4d4._onFocusNode(_4d3||evt.target);
};
doc.addEventListener("focus",_4d8,true);
var _4d9=function(evt){
_4d4._onBlurNode(_4d3||evt.target);
};
doc.addEventListener("blur",_4d9,true);
return {remove:function(){
doc.body.removeEventListener("mousedown",_4d5,true);
doc.body.removeEventListener("touchstart",_4d5,true);
doc.removeEventListener("focus",_4d8,true);
doc.removeEventListener("blur",_4d9,true);
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
var _4da=[];
try{
while(node){
var _4db=_4c6.get(node,"dijitPopupParent");
if(_4db){
node=_4cd.byId(_4db).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===win.body()){
break;
}
node=_4cc.get(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId"),_4dc=id&&_4cd.byId(id);
if(_4dc&&!(by=="mouse"&&_4dc.get("disabled"))){
_4da.unshift(id);
}
node=node.parentNode;
}
}
}
}
catch(e){
}
this._setStack(_4da,by);
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
},_setStack:function(_4dd,by){
var _4de=this.activeStack;
this.set("activeStack",_4dd);
for(var _4df=0;_4df<Math.min(_4de.length,_4dd.length);_4df++){
if(_4de[_4df]!=_4dd[_4df]){
break;
}
}
var _4e0;
for(var i=_4de.length-1;i>=_4df;i--){
_4e0=_4cd.byId(_4de[i]);
if(_4e0){
_4e0._hasBeenBlurred=true;
_4e0.set("focused",false);
if(_4e0._focusManager==this){
_4e0._onBlur(by);
}
this.emit("widget-blur",_4e0,by);
}
}
for(i=_4df;i<_4dd.length;i++){
_4e0=_4cd.byId(_4dd[i]);
if(_4e0){
_4e0.set("focused",true);
if(_4e0._focusManager==this){
_4e0._onFocus(by);
}
this.emit("widget-focus",_4e0,by);
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
var _4e1=new _4cf();
_4c9(function(){
var _4e2=_4e1.registerWin(win.doc.parentWindow||win.doc.defaultView);
if(has("ie")){
_4cb.addOnWindowUnload(function(){
_4e2.remove();
_4e2=null;
});
}
});
_4ce.focus=function(node){
_4e1.focus(node);
};
for(var attr in _4e1){
if(!/^_/.test(attr)){
_4ce.focus[attr]=typeof _4e1[attr]=="function"?lang.hitch(_4e1,attr):_4e1[attr];
}
}
_4e1.watch(function(attr,_4e3,_4e4){
_4ce.focus[attr]=_4e4;
});
return _4e1;
});
},"curam/matrix/TopRightFiller":function(){
define("curam/matrix/TopRightFiller",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_4e5,dojo,_4e6){
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
var _4e7=curam.define.singleton("curam.matrix.util",{keys:dojo.keys,allowableCharsForNumeric:["1","2","3","4","5","6","7","8","9","0","-",".",dojo.keys.LEFT_ARROW,dojo.keys.RIGHT_ARROW,dojo.keys.DELETE,dojo.keys.BACKSPACE,dojo.keys.END,dojo.keys.HOME,dojo.keys.TAB,dojo.keys.F5],getQuestionIdFromPriorityInputId:function(id){
var temp=id.replace(curam.matrix.Constants.container.matrix.inputPrefix+"priority.s.s.","");
var _4e8=/\..*/;
return temp.replace(_4e8,"");
},getCellIndexFromContradictionCellId:function(id){
return Number(curam.matrix.util.safeSplit(id,"-")[4]);
},getQuestionIdFromAnswerId:function(_4e9){
var qId=_4e9.substring(_4e9.indexOf("-Q")+1);
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
var _4ea=/^.*\./;
return temp.replace(_4ea,"");
},makeNumericInput:function(_4eb,_4ec){
curam.util.connect(_4eb,"key",curam.matrix.util[_4ec?"posNumericInputChecker":"numericInputChecker"]);
},checkFocus:function(){
curam.matrix.Constants.container.matrix.checkFocus(arguments[0]);
},createInput:function(type){
var _4ed=dojo.create("input",{onfocus:function(){
curam.matrix.Constants.container.matrix.cf(arguments);
}});
if(type){
_4ed.setAttribute("type",type);
}
return _4ed;
},safeSplit:function(str,c){
if(str.indexOf(c+c)>-1){
var arr=str.split(c+c);
var _4ee;
var _4ef=[];
for(var _4f0=0;_4f0<arr.length;_4f0++){
_4ee=arr[_4f0].split(c);
if(_4f0>0){
_4ee[0]=c+_4ee[0];
}
_4ef=_4ef.concat(_4ee);
}
return _4ef;
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
var _4f1=curam.matrix.util.allowableCharsForNumeric;
for(var i=0;i<_4f1.length;i++){
if(e.key!=" "&&e.key===_4f1[i]){
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
var _4f2=curam.matrix.util.allowableCharsForNumeric;
for(var i=0;i<_4f2.length;i++){
if(e.key!=" "&&e.key===_4f2[i]){
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
},buttonMouseOver:function(_4f3){
_4f3=dojo.fixEvent(_4f3);
var node=_4f3.target;
if(!node.id||node.id==""){
node=node.parentNode;
}
dojo.addClass(node,"mouseover");
if(!node._btnMouseOutAdded){
curam.util.connect(node,"onmouseout",curam.matrix.util.buttonMouseOut);
node._btnMouseOutAdded=true;
}
},buttonMouseOut:function(_4f4){
_4f4=dojo.fixEvent(_4f4);
var node=_4f4.target;
if(!node.id||node.id==""){
node=node.parentNode;
}
dojo.removeClass(node,"mouseover");
},toggleHeight:function(node){
if(!dojo.isIE){
return;
}
var _4f5=dojo.contentBox(node).h;
dojo.contentBox(node,{height:_4f5+2});
dojo.contentBox(node,{height:_4f5});
}});
return _4e7;
});
},"curam/matrix/BottomLeftMain":function(){
define("curam/matrix/BottomLeftMain",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants,dojo/dom-geometry"],function(_4f6,dojo,_4f7){
dojo.provide("curam.matrix.BottomLeftMain");
dojo.require("curam.matrix.Constants");
var _4f8=dojo.require("dojo.dom-geometry");
dojo.declare("curam.matrix.BottomLeftMain",null,{constructor:function(){
this.node=dojo.byId("bottom-left-main");
this.questions=new curam.ListMap();
this.matrix=curam.matrix.Constants.container.matrix;
var _4f9=this.node.childNodes;
for(var i=0;i<_4f9.length;i++){
if(_4f9[i].nodeType==1){
this.questions.add(_4f9[i].id,new curam.matrix.QuestionLeft(_4f9[i]));
}
}
},setDimensions:function(){
this.setDefaultNumberDimensions();
this.setDefaultAnswerDimensions();
var _4fa=0;
for(var i=0;i<this.questions.count;i++){
_4fa+=this.questions.getObjectByIndex(i).setDimensions();
}
return this.setHeight(_4fa);
},setHeight:function(_4fb){
var c=curam.matrix.Constants.container;
var _4fc=_4fb+c.matrix.bottomLeft.bottomLeftFiller.height+c.matrix.topLeft.height;
this.height=(_4fc>c.maxMatrixHeight)?curam.matrix.Constants.container.maxMatrixHeight-c.matrix.topLeft.height-c.matrix.bottomLeft.bottomLeftFiller.height-curam.matrix.Constants.MATRIX_BORDER_SIZE:_4fb;
c.cssText.append(".matrix-container .bottom-left-main-eval{height:").append(this.height).append("px;}");
return this.height;
},setDefaultAnswerDimensions:function(){
if(this.defaultDimensionsSet){
return;
}
var c=curam.matrix.Constants.container;
var _4fd=_4f8.getMarginBoxSimple(c.tempDivs.ctAnsVal);
var _4fe=dojo.contentBox(c.tempDivs.ctAnsVal);
c.fullAnswerHeight=_4fe.h+c.tempDivs.image.offsetHeight;
c.ansValSelectHeight=c.tempDivs.ctAnsVal.offsetHeight;
c.defaultAnsHeight=_4fd.h-2;
c.reducedAnswHeight=c.defaultAnsHeight-4;
c.inputBorderWidth=Math.max(dojo.position(c.tempDivs.ctAnsSelect).w-dojo.contentBox(c.tempDivs.ctAnsSelect).w,4);
c.ansValWidth=c.answersColWidth-c.tempDivs.image.offsetWidth-(dojo.style(c.tempDivs.ctAnsVal,"paddingLeft")+dojo.style(c.tempDivs.ctAnsVal,"paddingRight"))-(dojo.style(c.tempDivs.ctAnsVal,"borderLeft")+dojo.style(c.tempDivs.ctAnsVal,"borderRight"))-Math.ceil((_4fd.w-_4fe.w)/2);
var _4ff=c.ansValWidth-c.inputBorderWidth;
var _500=Math.ceil((_4fd.h-_4fe.h)/2);
var _501=(_4ff-c.tempDivs.numAns.offsetWidth-c.inputBorderWidth)/2;
c.ansValInputHeight=c.tempDivs.strAns.offsetHeight;
c.marginTopStringAns=((c.ansValSelectHeight-c.ansValInputHeight+_500)/2);
c.ansValTextHeight=c.tempDivs.textAns.offsetHeight;
var _502=(c.ansValSelectHeight-c.ansValTextHeight+_500)/2;
var _503="px;}.matrix-container ";
c.cssText.append(".matrix-container .ans-eval{height:").append(c.reducedAnswHeight).append(_503+".ans-eval-with-menu{height:").append(c.fullAnswerHeight-1).append(_503+".ans-val-eval{width:").append(c.ansValWidth).append(_503+".ans-str-val-eval{border-top:1px solid #F4F5F9;margin-top:").append(c.marginTopStringAns).append(_503+".ans-num-val-eval{margin-top:").append(c.marginTopStringAns).append(_503+".ans-bool-val-eval{margin-top:").append(_502-4).append(_503+".ans-str-val-eval-with-menu{margin-top:").append(c.marginTopStringAns+5).append(_503+".ans-num-val-eval-with-menu{margin-top:").append(c.marginTopStringAns+5).append(_503+".ans-bool-val-eval-with-menu{margin-top:").append(_502).append(_503+".answer-input-eval{width:").append(_4ff).append(_503+".numeric-input-eval{width:").append(_501).append(_503+".default-q-height-eval{height:").append(c.reducedAnswHeight).append(_503+".default-q-height-eval div.qt-text{padding-top:8.5").append(c.reducedAnswHeight).append(_503+"..default-q-height-eval .number-text{padding-top:9.5").append(c.reducedAnswHeight).append(_503+".default-q-height-boolean-eval{height:").append((c.reducedAnswHeight*2)+1).append(_503+".default-q-height-boolean-eval div.qt-text{padding-top:25").append(_503+".default-q-height-boolean-eval .number-text{padding-top:26").append("px;}");
this.defaultDimensionsSet=true;
},resyncNumbers:function(){
var _504=0;
var num;
for(var i=0;i<this.questions.count;i++){
num=this.questions.getObjectByIndex(i).number;
curam.matrix.util.initButtonListeners(num.node);
num.text.innerHTML=++_504;
}
},setDefaultNumberDimensions:function(){
curam.matrix.Constants.container.numTextHeight=curam.matrix.Constants.container.tempDivs.numHeight;
},addQuestion:function(_505){
var _506=dojo.create("div",{id:"ql-"+_505[0],"class":"bottom-left-eval "+_505[0]+"-eval"});
_506.appendChild(this.createNumber(_505));
_506.appendChild(this.createQuestionText(_505));
_506.appendChild(this.createAnsGroup(_505));
var _507=new curam.matrix.QuestionLeft(_506);
this.node.appendChild(_507.node);
this.questions.add("ql-"+_505[0],_507);
return _507.setDimensions();
},getQuestion:function(id){
if(id.indexOf("ql-")<0){
id="ql-"+id;
}
return this.questions.getObjectByKey(id);
},createNumber:function(_508){
var _509=_508[1]=="boolean"?"default-q-height-boolean-eval ":"default-q-height-eval ";
var num=dojo.create("div",{id:"num-"+_508[0],"class":_509+"number number-col-eval q-ct-eval-"+_508[0]});
var _50a=dojo.create("div",{innerHTML:"1","class":"number-text number-text-"+_508[0]+"-eval"},num);
return num;
},createQuestionText:function(_50b){
var _50c=_50b[1]=="boolean"?"default-q-height-boolean-eval":"default-q-height-eval";
var ques=dojo.create("div",{id:"ques-"+_50b[0],"class":_50c+" q-ct q-ct-eval-"+_50b[0]+" qt-col-eval"});
var _50d=dojo.create("div",{"class":"qt-text qt-text-"+_50b[0]+"-eval"},ques);
var _50e=dojo.create("a",{title:_50b[2],innerHTML:_50b[2]},_50d);
return ques;
},createAnsGroup:function(_50f){
var _510=dojo.create("div",{id:"ans-group-"+_50f[0],"class":"q-ct q-ct-eval-"+_50f[0]+" ans-col-eval"});
_510.appendChild(this.createAnswer(_50f[0],_50f[1],1));
if(_50f[1]==curam.matrix.Constants.ANSWER_TYPE_BOOLEAN){
_510.appendChild(this.createAnswer(_50f[0],_50f[1],2));
}
return _510;
},createAnswer:function(qId,_511,_512,_513){
var _514;
var _515=_512==1?"":"ans";
var _516="";
if(_512==1&&curam.matrix.Constants.container.existingQuestionIds.indexOf(qId)==0){
_516="-with-menu";
}
if(_511==curam.matrix.Constants.ANSWER_TYPE_BOOLEAN){
_514="ans-bool-val-eval"+_516;
}else{
if(_511==curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
_514="ans-num-val-eval"+_516;
}else{
if(_511==curam.matrix.Constants.ANSWER_TYPE_STRING){
_514="ans-str-val-eval"+_516;
}else{
_514="ans-ct-val"+_516;
}
}
}
var ans=dojo.create("div",{id:"ans-"+qId+"-"+_512,"class":_515+" ans-col-eval ans-eval"+_516+" ans-"+qId+"-eval"});
var _517=dojo.create("div",{id:"ans-val-"+qId+"-"+_512,"class":"ans-val ans-val-eval "+_514+" ans-"+qId+"-val-eval"},ans);
var _518;
var id=this.matrix.inputPrefix+"value.s.s."+qId+"."+_512;
if(_511==curam.matrix.Constants.ANSWER_TYPE_BOOLEAN){
var text=_512==1?curam.matrix.Constants.container.i18nMsgs.booleanTrue:curam.matrix.Constants.container.i18nMsgs.booleanFalse;
_517.appendChild(document.createTextNode(text));
_518=dojo.create("input",{type:"hidden",id:id,name:id,value:text},_517);
}else{
if(_511==curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
var _519=dojo.create("div",{title:curam.matrix.Constants.container.i18nMsgs.labelSpecificValue,"class":" label-specific-value"});
_519.appendChild(document.createTextNode(curam.matrix.Constants.container.i18nMsgs.labelSpecificValue+": "));
_517.appendChild(_519);
_518=curam.matrix.util.createInput("text");
dojo.attr(_518,{id:id,name:id,title:curam.matrix.Constants.container.i18nMsgs.labelSpecificValue,value:"","class":"numeric-input-eval"});
dojo.place(_518,_517);
}else{
if(_511==curam.matrix.Constants.ANSWER_TYPE_STRING){
_518=curam.matrix.util.createInput("text");
dojo.attr(_518,{id:id,name:id,value:"","class":"answer-input-eval"});
dojo.place(_518,_517);
}else{
var _51a=_518=dojo.create("select",{id:id,name:id,"class":"answer-input-eval"});
if(_511==curam.matrix.Constants.ANSWER_TYPE_CODETABLE){
if(_513!=null){
var opt;
for(var _51b=0;_51b<_513.length;_51b++){
opt=new Option(_513[_51b]["text"],_513[_51b]["value"]);
try{
_51a.add(opt,null);
}
catch(e){
_51a.add(opt);
}
}
}
}else{
var _51c=new AJAXCall(_51a).doRequest("getCodeTable",[_511],false,true);
}
dojo.place(_51a,_517);
}
}
}
curam.util.connect(_518,"onfocus",function(){
curam.matrix.Constants.container.matrix.cf(arguments);
});
var _51d=dojo.create("div",{"class":"image"},ans);
return ans;
}});
});
},"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n","curam/matrix/ScoreGroup":function(){
define("curam/matrix/ScoreGroup",["dijit","dojo","dojox"],function(_51e,dojo,_51f){
dojo.provide("curam.matrix.ScoreGroup");
dojo.declare("curam.matrix.ScoreGroup",null,{constructor:function(node){
this.node=node;
this.scores=new curam.ListMap();
var _520=this.node.childNodes;
for(var i=0;i<_520.length;i++){
if(_520[i].nodeType==1){
this.scores.add(_520[i].id,new curam.matrix.Score(_520[i]));
}
}
}});
dojo.declare("curam.matrix.Score",null,{constructor:function(node){
this.node=node;
this.scoreValidation=dojo.query("> :first-child",node)[0];
this.input=dojo.query("> :first-child",this.scoreValidation)[0];
curam.matrix.util.makeNumericInput(this.input);
},adjustFirstRowClass:function(_521){
var _522=dojo.attr(this.node,"class");
if(_522.indexOf("ans-eval-with-menu")==-1){
_522=_522.replace("ans-eval","ans-eval-with-menu");
cm.setClass(this.node,_522);
}
_522=dojo.attr(this.scoreValidation,"class");
if(_522.indexOf("ans-str-val-eval-with-menu")==-1){
_522=_522.replace("ans-str-val-eval","ans-str-val-eval-with-menu");
cm.setClass(this.scoreValidation,_522);
}
}});
});
},"dijit/main":function(){
define("dijit/main",["dojo/_base/kernel"],function(dojo){
return dojo.dijit;
});
},"dojo/date/stamp":function(){
define("dojo/date/stamp",["../_base/kernel","../_base/lang","../_base/array"],function(dojo,lang,_523){
lang.getObject("date.stamp",true,dojo);
dojo.date.stamp.fromISOString=function(_524,_525){
if(!dojo.date.stamp._isoRegExp){
dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
}
var _526=dojo.date.stamp._isoRegExp.exec(_524),_527=null;
if(_526){
_526.shift();
if(_526[1]){
_526[1]--;
}
if(_526[6]){
_526[6]*=1000;
}
if(_525){
_525=new Date(_525);
_523.forEach(_523.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(prop){
return _525["get"+prop]();
}),function(_528,_529){
_526[_529]=_526[_529]||_528;
});
}
_527=new Date(_526[0]||1970,_526[1]||0,_526[2]||1,_526[3]||0,_526[4]||0,_526[5]||0,_526[6]||0);
if(_526[0]<100){
_527.setFullYear(_526[0]||1970);
}
var _52a=0,_52b=_526[7]&&_526[7].charAt(0);
if(_52b!="Z"){
_52a=((_526[8]||0)*60)+(Number(_526[9])||0);
if(_52b!="-"){
_52a*=-1;
}
}
if(_52b){
_52a-=_527.getTimezoneOffset();
}
if(_52a){
_527.setTime(_527.getTime()+_52a*60000);
}
}
return _527;
};
dojo.date.stamp.toISOString=function(_52c,_52d){
var _52e=function(n){
return (n<10)?"0"+n:n;
};
_52d=_52d||{};
var _52f=[],_530=_52d.zulu?"getUTC":"get",date="";
if(_52d.selector!="time"){
var year=_52c[_530+"FullYear"]();
date=["0000".substr((year+"").length)+year,_52e(_52c[_530+"Month"]()+1),_52e(_52c[_530+"Date"]())].join("-");
}
_52f.push(date);
if(_52d.selector!="date"){
var time=[_52e(_52c[_530+"Hours"]()),_52e(_52c[_530+"Minutes"]()),_52e(_52c[_530+"Seconds"]())].join(":");
var _531=_52c[_530+"Milliseconds"]();
if(_52d.milliseconds){
time+="."+(_531<100?"0":"")+_52e(_531);
}
if(_52d.zulu){
time+="Z";
}else{
if(_52d.selector!="time"){
var _532=_52c.getTimezoneOffset();
var _533=Math.abs(_532);
time+=(_532>0?"-":"+")+_52e(Math.floor(_533/60))+":"+_52e(_533%60);
}
}
_52f.push(time);
}
return _52f.join("T");
};
return dojo.date.stamp;
});
},"curam/matrix/PriorityGroup":function(){
define("curam/matrix/PriorityGroup",["dijit","dojo","dojox"],function(_534,dojo,_535){
dojo.provide("curam.matrix.PriorityGroup");
dojo.declare("curam.matrix.PriorityGroup",null,{constructor:function(node,_536){
this.node=node;
this.priorities=new curam.ListMap();
this.matrix=_536;
var _537=this.node.childNodes;
for(var i=0;i<_537.length;i++){
if(_537[i].nodeType==1){
this.priorities.add(_537[i].id,new curam.matrix.Priority(_537[i],_536,this));
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
var _538=function(name){
return "curam_util_LocalConfig_"+name;
},_539=function(name,_53a){
var _53b=_538(name);
if(typeof top[_53b]==="undefined"){
top[_53b]=_53a;
}
return top[_53b];
},_53c=function(name){
return top[_538(name)];
};
_539("seedValues",{}),_539("overrides",{});
var _53d=function(_53e,_53f){
if(typeof _53e!=="undefined"&&typeof _53e!=="string"){
throw new Error("Invalid "+_53f+" type: "+typeof _53e+"; expected string");
}
};
var _540={seedOption:function(name,_541,_542){
_53d(_541,"value");
_53d(_542,"defaultValue");
_53c("seedValues")[name]=(typeof _541!=="undefined")?_541:_542;
},overrideOption:function(name,_543){
_53d(_543,"value");
if(typeof (Storage)!=="undefined"){
localStorage[name]=_543;
}else{
_53c("overrides")[name]=_543;
}
},readOption:function(name,_544){
_53d(_544,"defaultValue");
var _545=null;
if(typeof (Storage)!=="undefined"&&typeof localStorage[name]!=="undefined"){
_545=localStorage[name];
}else{
if(typeof _53c("overrides")[name]!=="undefined"){
_545=_53c("overrides")[name];
}else{
if(typeof _53c("seedValues")[name]!=="undefined"){
_545=_53c("seedValues")[name];
}else{
_545=_544;
}
}
}
return _545;
},clearOption:function(name){
if(typeof (Storage)!=="undefined"){
localStorage.removeItem(name);
}
delete _53c("overrides")[name];
delete _53c("seedValues")[name];
}};
return _540;
});
},"curam/util/BitSet":function(){
define("curam/util/BitSet",[],function(){
var _546=dojo.declare("curam.util.BitSet",null,{_idCounter:0,constructor:function(){
this.value=[];
this.max=-1;
this.log2=Math.log(2);
this.id=++curam.util.BitSet.prototype._idCounter;
},set:function(_547){
this.max=Math.max(this.max,_547);
var pos=this._getPos(_547,true);
var _548=this.value[pos];
this.value[pos]=this.value[pos]|this._pow(_547);
return _548!=this.value[pos];
},unSet:function(_549){
this.max=Math.max(this.max,_549);
var pos=this._getPos(_549,false);
if(pos<0){
return;
}
var _54a=this.value[pos];
this.value[pos]=this.value[pos]&(~this._pow(_549));
if(this.value[pos]==0&&pos==this.value.length-1){
this.value.splice(pos,1);
return true;
}
return _54a!=this.value[pos];
},isSet:function(_54b){
var pos=this._getPos(_54b,false);
return pos>-1&&((this._pow(_54b)&this.value[pos])>0);
},isClear:function(){
for(var _54c=0;_54c<this.value.length;_54c++){
if(this.value[_54c]>0){
return false;
}
}
return true;
},isSingleSet:function(){
var log;
var _54d=false;
for(var _54e=0;_54e<this.value.length;_54e++){
if(this.value[_54e]==0){
continue;
}
log=Math.log(this.value[_54e])/this.log2;
if(log==Math.floor(log)&&!_54d){
_54d=true;
}else{
return false;
}
}
return _54d;
},equals:function(_54f){
if(!_54f||this.value.length!=_54f.value.length){
return false;
}
var _550=Math.max(this.value.length,_54f.value.length);
for(var _551=0;_551<_550;_551++){
if(_54f.value[_551]!=this.value[_551]){
return false;
}
}
return true;
},_getPos:function(_552,init){
var pos=Math.floor(Number(_552)/31);
while(init&&this.value.length<=pos){
this.value[this.value.length]=0;
}
return (this.value.length<=pos?-1:pos);
},_pow:function(_553){
return Math.pow(2,Number(_553)%31);
}});
return _546;
});
},"dijit/MenuItem":function(){
require({cache:{"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n"}});
define("dijit/MenuItem",["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/event","dojo/_base/kernel","dojo/_base/sniff","./_Widget","./_TemplatedMixin","./_Contained","./_CssStateMixin","dojo/text!./templates/MenuItem.html"],function(_554,dom,_555,_556,_557,_558,has,_559,_55a,_55b,_55c,_55d){
return _554("dijit.MenuItem",[_559,_55a,_55b,_55c],{templateString:_55d,baseClass:"dijitMenuItem",label:"",_setLabelAttr:{node:"containerNode",type:"innerHTML"},iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},accelKey:"",disabled:false,_fillContent:function(_55e){
if(_55e&&!("label" in this.params)){
this.set("label",_55e.innerHTML);
}
},buildRendering:function(){
this.inherited(arguments);
var _55f=this.id+"_text";
_555.set(this.containerNode,"id",_55f);
if(this.accelKeyNode){
_555.set(this.accelKeyNode,"id",this.id+"_accel");
_55f+=" "+this.id+"_accel";
}
this.domNode.setAttribute("aria-labelledby",_55f);
dom.setSelectable(this.domNode,false);
},_onHover:function(){
this.getParent().onItemHover(this);
},_onUnhover:function(){
this.getParent().onItemUnhover(this);
this._set("hovering",false);
},_onClick:function(evt){
this.getParent().onItemClick(this,evt);
_557.stop(evt);
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
},_setSelected:function(_560){
_556.toggle(this.domNode,"dijitMenuItemSelected",_560);
},setLabel:function(_561){
_558.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_561);
},setDisabled:function(_562){
_558.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_562);
},_setDisabledAttr:function(_563){
this.focusNode.setAttribute("aria-disabled",_563?"true":"false");
this._set("disabled",_563);
},_setAccelKeyAttr:function(_564){
this.accelKeyNode.style.display=_564?"":"none";
this.accelKeyNode.innerHTML=_564;
_555.set(this.containerNode,"colSpan",_564?"1":"2");
this._set("accelKey",_564);
}});
});
},"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n","curam/util/RuntimeContext":function(){
define("curam/util/RuntimeContext",[],function(){
var _565=dojo.declare("curam.util.RuntimeContext",null,{_window:null,constructor:function(_566){
this._window=_566;
},getHref:function(){
return this._window.location.href;
},getPathName:function(){
return this._window.location.pathName;
},contextObject:function(){
return this._window;
}});
return _565;
});
},"curam/matrix/TopLeft":function(){
define("curam/matrix/TopLeft",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants,dojo/dom-geometry"],function(_567,dojo,_568){
dojo.provide("curam.matrix.TopLeft");
dojo.require("curam.matrix.Constants");
var _569=dojo.require("dojo.dom-geometry");
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
var _56a=this.columnIDA.clientHeight;
var _56b=_56a+(curam.matrix.Constants.MATRIX_BORDER_SIZE*2);
var _56c=_56a+curam.matrix.Constants.MATRIX_BORDER_SIZE;
this.height=_56b+_56c;
var c=curam.matrix.Constants.container;
this.width=c.questionColWidth+c.answersColWidth+(curam.matrix.Constants.MATRIX_BORDER_SIZE*2);
c.leftMatrixWidth=this.width+c.tempDivs.numWidth+(curam.matrix.Constants.MATRIX_BORDER_SIZE*2);
this.topLeftFillerHeight=_56a+_569.getMarginBoxSimple(this.headingQuestion).h+2;
c.cssText.append(".matrix-container .qt-col-eval{width:"+c.questionColWidth+"px;}").append(".matrix-container .top-eval{height:").append(this.height).append("px;}.matrix-container .top-top-eval{height:").append(_56b).append("px;}.matrix-container .top-bottom-eval{height:").append(_56c).append("px;}.matrix-container .column-eval{height:").append(_56a).append("px;}.matrix-container .top-left-eval{width:").append(this.width).append("px;}.matrix-container .top-left-filler-eval{height:").append(this.topLeftFillerHeight).append("px;}.matrix-container .number-col-eval{width:").append(c.tempDivs.numWidth).append("px;}.matrix-container .ans-col-eval{width:").append(c.answersColWidth).append("px;}");
}});
});
},"curam/matrix/TopRightTop":function(){
define("curam/matrix/TopRightTop",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_56d,dojo,_56e){
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
var _56f=this.node.childNodes;
for(var i=0;i<_56f.length;i++){
if(_56f[i].nodeType==1){
if(_56f[i].id=="column-id-pri"){
this.priorityCol=_56f[i];
this.priorityColText=dojo.query("> :first-child",this.priorityCol)[0];
this.priorityCol._conn=dojo.connect(this.priorityCol,"onclick",this,"createPriorityButtonWidget");
}else{
if(_56f[i].id=="column-id-scr"){
this.scoreCol=_56f[i];
this.scoreColText=dojo.query("> :first-child",this.scoreCol)[0];
this.scoreCol._conn=dojo.connect(this.scoreCol,"onclick",this,"createScoreButtonWidget");
}else{
if(_56f[i].id=="column-id-contr"){
this.contradictionCol=new curam.matrix.ContradictionColumn(_56f[i],false);
}else{
this.outcomeCols.add(_56f[i].id,new curam.matrix.OutcomeColumn(_56f[i],false));
}
}
}
}
}
},createPriorityButtonWidget:function(_570){
var c=curam.matrix.Constants.container;
if(this.priorityWidgetCreated){
return;
}
dojo.disconnect(this.priorityCol._conn);
var _571=new curam.widget.PriorityButton({menuId:"PriorityOptions",id:this.priorityCol.id},this.priorityCol);
curam.util.connect(_571.domNode,"onmouseover",function(evt){
_mov(evt);
});
this.matrix.initHighlighters(true,false);
_571._toggleMenu("PriorityOptions",_570);
this.priorityCol=_571.domNode;
this.priorityColText=dojo.query("> :first-child",this.priorityCol)[0];
this.priorityWidgetCreated=true;
_56d.byId("PriorityOptions")._openMyself(_570);
},createScoreButtonWidget:function(_572){
var c=curam.matrix.Constants.container;
if(this.scoreWidgetCreated){
return;
}
var _573=new curam.widget.ScoreButton({menuId:"ScoreOptions",id:this.scoreCol.id},this.scoreCol);
curam.util.connect(_573.domNode,"onmouseover",function(evt){
_mov(evt);
});
this.matrix.initHighlighters(false,true);
_573._toggleMenu("ScoreOptions",_572);
this.scoreCol=_573.domNode;
this.scoreColText=dojo.query("> :first-child",this.scoreCol)[0];
this.scoreWidgetCreated=true;
dojo.disconnect(this.scoreCol._conn);
_56d.byId("ScoreOptions")._openMyself(_572);
},getOutcomeColIds:function(){
var key;
var arr=new Array();
var _574=/^column-id-/;
for(var i=0;i<this.outcomeCols.count;i++){
key=this.outcomeCols.getKeyByIndex(i);
key=new String(key);
arr.push(key.replace(_574,""));
}
return arr;
},resyncLetters:function(){
var _575=0;
var _576=this.node.childNodes;
for(var i=0;i<_576.length;i++){
if(_576[i].nodeType==1){
if(_575<=23){
dojo.query("div",_576[i])[0].innerHTML=curam.matrix.Constants.columnLetters[_575];
}else{
dojo.query("div",_576[i])[0].innerHTML=curam.matrix.Constants.columnLetters[_575%23]+Math.floor(_575/23);
}
_575++;
}
}
},addPriority:function(){
var _577=_56d.byId("column-id-pri");
if(_577){
_577.destroy();
}
var _578=dojo.create("div",{id:"column-id-pri","class":"column-id column-eval pri-col-eval",innerHTML:"<div>C</div>"},this.node,"first");
this.priorityCol=_578;
this.priorityColText=dojo.query("> :first-child",this.priorityCol)[0];
this.priorityCol._conn=dojo.connect(this.priorityCol,"onclick",this,"createPriorityButtonWidget");
curam.matrix.util.initButtonListeners(_578);
this.resyncLetters();
},addScore:function(){
var pos=this.matrix.priorityExists?1:0;
var _579=_56d.byId("column-id-scr");
if(_579){
_579.destroy();
}
var _57a=dojo.create("div",{id:"column-id-scr","class":"column-id column-eval pri-col-eval",innerHTML:"<div>D</div>"},this.node,pos);
this.scoreCol=_57a;
this.scoreColText=dojo.query("> :first-child",this.scoreCol)[0];
this.scoreCol._conn=dojo.connect(this.scoreCol,"onclick",this,"createScoreButtonWidget");
curam.matrix.util.initButtonListeners(_57a);
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
var _57b=dojo.create("div",{id:"column-id-contr","class":"column-id column-eval contr-col-eval"},this.node,pos);
var _57c=dojo.create("div",{},_57b);
_57b.appendChild(this.addContrCombIdInput(1));
for(var i=0;i<c.locales.length;i++){
if(c.locales[i]==""){
continue;
}
_57b.appendChild(this.addContrCombMessageInput(1,c.locales[i],""));
}
this.contradictionCol=new curam.matrix.ContradictionColumn(_57b,true);
curam.matrix.util.initButtonListeners(_57b);
this.resyncLetters();
},addContrCombIdInput:function(_57d){
var id=this.matrix.inputPrefix+"contrcombid."+_57d;
return dojo.create("input",{id:id,name:id,type:"hidden"});
},addContrCombMessageInput:function(_57e,_57f,msg){
var id=this.matrix.inputPrefix+"contrmsg."+_57f+"."+_57e;
return dojo.create("input",{id:id,name:id,type:"hidden"});
},addOutcomeColumn:function(_580){
var _581=dojo.create("div",{id:"column-id-"+_580[0],"class":"column-id column-eval out-"+_580[0]+"-col-eval"},this.node,"last");
var _582=dojo.create("div",{},_581);
_581.appendChild(this.addOutCombIdInput(_580[0],1));
var _583=new curam.matrix.OutcomeColumn(_581,true);
this.outcomeCols.add(_583.node.id,_583);
this.resyncLetters();
return _583.setDimensions(_580[0]);
},addOutCombIdInput:function(_584,_585){
var id=this.matrix.inputPrefix+"outcombid."+_584+"."+_585;
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
define("dijit/_MenuBase",["./popup","dojo/window","./_Widget","./_KeyNavContainer","./_TemplatedMixin","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/lang","dojo/_base/array"],function(pm,_586,_587,_588,_589,_58a,dom,_58b,_58c,lang,_58d){
return _58a("dijit._MenuBase",[_587,_589,_588],{parentMenu:null,popupDelay:500,onExecute:function(){
},onCancel:function(){
},_moveToPopup:function(evt){
if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){
this.focusedChild._onClick(evt);
}else{
var _58e=this._getTopMenu();
if(_58e&&_58e._isMenuBar){
_58e.focusNext();
}
}
},_onPopupHover:function(){
if(this.currentPopup&&this.currentPopup._pendingClose_timer){
var _58f=this.currentPopup.parentMenu;
if(_58f.focusedChild){
_58f.focusedChild._setSelected(false);
}
_58f.focusedChild=this.currentPopup.from_item;
_58f.focusedChild._setSelected(true);
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
var _590=item.popup;
if(_590){
this._stopPendingCloseTimer(_590);
_590._pendingClose_timer=setTimeout(function(){
_590._pendingClose_timer=null;
if(_590.parentMenu){
_590.parentMenu.currentPopup=null;
}
pm.close(_590);
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
},_stopPendingCloseTimer:function(_591){
if(_591._pendingClose_timer){
clearTimeout(_591._pendingClose_timer);
_591._pendingClose_timer=null;
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
var _592=this.focusedChild;
if(!_592){
return;
}
var _593=_592.popup;
if(_593.isShowingNow){
return;
}
if(this.currentPopup){
this._stopPendingCloseTimer(this.currentPopup);
pm.close(this.currentPopup);
}
_593.parentMenu=this;
_593.from_item=_592;
var self=this;
pm.open({parent:this,popup:_593,around:_592.domNode,orient:this._orient||["after","before"],onCancel:function(){
self.focusChild(_592);
self._cleanUp();
_592._setSelected(true);
self.focusedChild=_592;
},onExecute:lang.hitch(this,"_cleanUp")});
this.currentPopup=_593;
if(this.popupHoverHandle){
this.disconnect(this.popupHoverHandle);
}
this.popupHoverHandle=this.connect(_593.domNode,"onmouseenter","_onPopupHover");
if(_593.focus){
_593._focus_timer=setTimeout(lang.hitch(_593,function(){
this._focus_timer=null;
this.focus();
}),0);
}
},_markActive:function(){
this.isActive=true;
_58c.replace(this.domNode,"dijitMenuActive","dijitMenuPassive");
},onOpen:function(){
this.isShowingNow=true;
this._markActive();
},_markInactive:function(){
this.isActive=false;
_58c.replace(this.domNode,"dijitMenuPassive","dijitMenuActive");
},onClose:function(){
this._stopFocusTimer();
this._markInactive();
this.isShowingNow=false;
this.parentMenu=null;
},_closeChild:function(){
this._stopPopupTimer();
if(this.currentPopup){
if(_58d.indexOf(this._focusManager.activeStack,this.id)>=0){
_58b.set(this.focusedChild.focusNode,"tabIndex",this.tabIndex);
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
define("curam/matrix/QuestionText",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_594,dojo,_595){
dojo.provide("curam.matrix.QuestionText");
dojo.require("curam.matrix.Constants");
dojo.declare("curam.matrix.QuestionText",null,{constructor:function(node){
this.node=node;
this.text=dojo.query("> :first-child",node)[0];
this.originalTextHeight=null;
},verticallyCenterText:function(_596,_597){
if(this.originalTextHeight==null){
this.originalTextHeight=dojo.contentBox(this.text).h;
}
var _598=(_596/2)-(this.originalTextHeight/2);
curam.matrix.Constants.container.cssText.append(".matrix-container .bottom-left-main .").append("q-ct .qt-text-").append(_597).append("-eval").append("{padding-top:").append(_598).append("px;}");
}});
});
},"curam/util/Constants":function(){
define("curam/util/Constants",["curam/define"],function(){
curam.define.singleton("curam.util.Constants",{RETURN_PAGE_PARAM:"__o3rpu"});
return curam.util.Constants;
});
},"dijit/_TemplatedMixin":function(){
define("dijit/_TemplatedMixin",["dojo/_base/lang","dojo/touch","./_WidgetBase","dojo/string","dojo/cache","dojo/_base/array","dojo/_base/declare","dojo/dom-construct","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(lang,_599,_59a,_59b,_59c,_59d,_59e,_59f,has,_5a0,win){
var _5a1=_59e("dijit._TemplatedMixin",null,{templateString:null,templatePath:null,_skipNodeCache:false,_earlyTemplatedStartup:false,constructor:function(){
this._attachPoints=[];
this._attachEvents=[];
},_stringRepl:function(tmpl){
var _5a2=this.declaredClass,_5a3=this;
return _59b.substitute(tmpl,this,function(_5a4,key){
if(key.charAt(0)=="!"){
_5a4=lang.getObject(key.substr(1),false,_5a3);
}
if(typeof _5a4=="undefined"){
throw new Error(_5a2+" template:"+key);
}
if(_5a4==null){
return "";
}
return key.charAt(0)=="!"?_5a4:_5a4.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
if(!this.templateString){
this.templateString=_59c(this.templatePath,{sanitize:true});
}
var _5a5=_5a1.getCachedTemplate(this.templateString,this._skipNodeCache);
var node;
if(lang.isString(_5a5)){
node=_59f.toDom(this._stringRepl(_5a5));
if(node.nodeType!=1){
throw new Error("Invalid template: "+_5a5);
}
}else{
node=_5a5.cloneNode(true);
}
this.domNode=node;
this.inherited(arguments);
this._attachTemplateNodes(node,function(n,p){
return n.getAttribute(p);
});
this._beforeFillContent();
this._fillContent(this.srcNodeRef);
},_beforeFillContent:function(){
},_fillContent:function(_5a6){
var dest=this.containerNode;
if(_5a6&&dest){
while(_5a6.hasChildNodes()){
dest.appendChild(_5a6.firstChild);
}
}
},_attachTemplateNodes:function(_5a7,_5a8){
var _5a9=lang.isArray(_5a7)?_5a7:(_5a7.all||_5a7.getElementsByTagName("*"));
var x=lang.isArray(_5a7)?0:-1;
for(;x<_5a9.length;x++){
var _5aa=(x==-1)?_5a7:_5a9[x];
if(this.widgetsInTemplate&&(_5a8(_5aa,"dojoType")||_5a8(_5aa,"data-dojo-type"))){
continue;
}
var _5ab=_5a8(_5aa,"dojoAttachPoint")||_5a8(_5aa,"data-dojo-attach-point");
if(_5ab){
var _5ac,_5ad=_5ab.split(/\s*,\s*/);
while((_5ac=_5ad.shift())){
if(lang.isArray(this[_5ac])){
this[_5ac].push(_5aa);
}else{
this[_5ac]=_5aa;
}
this._attachPoints.push(_5ac);
}
}
var _5ae=_5a8(_5aa,"dojoAttachEvent")||_5a8(_5aa,"data-dojo-attach-event");
if(_5ae){
var _5af,_5b0=_5ae.split(/\s*,\s*/);
var trim=lang.trim;
while((_5af=_5b0.shift())){
if(_5af){
var _5b1=null;
if(_5af.indexOf(":")!=-1){
var _5b2=_5af.split(":");
_5af=trim(_5b2[0]);
_5b1=trim(_5b2[1]);
}else{
_5af=trim(_5af);
}
if(!_5b1){
_5b1=_5af;
}
this._attachEvents.push(this.connect(_5aa,_599[_5af]||_5af,_5b1));
}
}
}
}
},destroyRendering:function(){
_59d.forEach(this._attachPoints,function(_5b3){
delete this[_5b3];
},this);
this._attachPoints=[];
_59d.forEach(this._attachEvents,this.disconnect,this);
this._attachEvents=[];
this.inherited(arguments);
}});
_5a1._templateCache={};
_5a1.getCachedTemplate=function(_5b4,_5b5){
var _5b6=_5a1._templateCache;
var key=_5b4;
var _5b7=_5b6[key];
if(_5b7){
try{
if(!_5b7.ownerDocument||_5b7.ownerDocument==win.doc){
return _5b7;
}
}
catch(e){
}
_59f.destroy(_5b7);
}
_5b4=_59b.trim(_5b4);
if(_5b5||_5b4.match(/\$\{([^\}]+)\}/g)){
return (_5b6[key]=_5b4);
}else{
var node=_59f.toDom(_5b4);
if(node.nodeType!=1){
throw new Error("Invalid template: "+_5b4);
}
return (_5b6[key]=node);
}
};
if(has("ie")){
_5a0.addOnWindowUnload(function(){
var _5b8=_5a1._templateCache;
for(var key in _5b8){
var _5b9=_5b8[key];
if(typeof _5b9=="object"){
_59f.destroy(_5b9);
}
delete _5b8[key];
}
});
}
lang.extend(_59a,{dojoAttachEvent:"",dojoAttachPoint:""});
return _5a1;
});
},"cm/_base/_dom":function(){
define("cm/_base/_dom",[],function(){
var cm=dojo.global.cm||{};
dojo.global.cm=cm;
dojo.mixin(cm,{nextSibling:function(node,_5ba){
return cm._findSibling(node,_5ba,true);
},prevSibling:function(node,_5bb){
return cm._findSibling(node,_5bb,false);
},getInput:function(name,_5bc){
if(!dojo.isString(name)){
return name;
}
var _5bd=dojo.query("input[name='"+name+"'],select[name='"+name+"']");
return _5bc?(_5bd.length>0?_5bd:null):(_5bd.length>0?_5bd[0]:null);
},getParentByClass:function(node,_5be){
node=node.parentNode;
while(node){
if(dojo.hasClass(node,_5be)){
return node;
}
node=node.parentNode;
}
return null;
},getParentByType:function(node,type){
node=node.parentNode;
type=type.toLowerCase();
var _5bf="html";
while(node){
if(node.tagName.toLowerCase()==_5bf){
break;
}
if(node.tagName.toLowerCase()==type){
return node;
}
node=node.parentNode;
}
return null;
},replaceClass:function(node,_5c0,_5c1){
dojo.removeClass(node,_5c1);
dojo.addClass(node,_5c0);
},setClass:function(node,_5c2){
node=dojo.byId(node);
var cs=new String(_5c2);
try{
if(typeof node.className=="string"){
node.className=cs;
}else{
if(node.setAttribute){
node.setAttribute("class",_5c2);
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
},_findSibling:function(node,_5c3,_5c4){
if(!node){
return null;
}
if(_5c3){
_5c3=_5c3.toLowerCase();
}
var _5c5=_5c4?"nextSibling":"previousSibling";
do{
node=node[_5c5];
}while(node&&node.nodeType!=1);
if(node&&_5c3&&_5c3!=node.tagName.toLowerCase()){
return cm[_5c4?"nextSibling":"prevSibling"](node,_5c3);
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
},endsWith:function(str,end,_5c6){
if(_5c6){
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
define("dojo/window",["./_base/lang","./_base/sniff","./_base/window","./dom","./dom-geometry","./dom-style"],function(lang,has,_5c7,dom,geom,_5c8){
var _5c9=lang.getObject("dojo.window",true);
_5c9.getBox=function(){
var _5ca=(_5c7.doc.compatMode=="BackCompat")?_5c7.body():_5c7.doc.documentElement,_5cb=geom.docScroll(),w,h;
if(has("touch")){
var _5cc=_5c7.doc.parentWindow||_5c7.doc.defaultView;
w=_5cc.innerWidth||_5ca.clientWidth;
h=_5cc.innerHeight||_5ca.clientHeight;
}else{
w=_5ca.clientWidth;
h=_5ca.clientHeight;
}
return {l:_5cb.x,t:_5cb.y,w:w,h:h};
};
_5c9.get=function(doc){
if(has("ie")&&_5c9!==document.parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc.parentWindow||doc.defaultView;
};
_5c9.scrollIntoView=function(node,pos){
try{
node=dom.byId(node);
var doc=node.ownerDocument||_5c7.doc,body=doc.body||_5c7.body(),html=doc.documentElement||body.parentNode,isIE=has("ie"),isWK=has("webkit");
if((!(has("mozilla")||isIE||isWK||has("opera"))||node==body||node==html)&&(typeof node.scrollIntoView!="undefined")){
node.scrollIntoView(false);
return;
}
var _5cd=doc.compatMode=="BackCompat",_5ce=(isIE>=9&&node.ownerDocument.parentWindow.frameElement)?((html.clientHeight>0&&html.clientWidth>0&&(body.clientHeight==0||body.clientWidth==0||body.clientHeight>html.clientHeight||body.clientWidth>html.clientWidth))?html:body):(_5cd?body:html),_5cf=isWK?body:_5ce,_5d0=_5ce.clientWidth,_5d1=_5ce.clientHeight,rtl=!geom.isBodyLtr(),_5d2=pos||geom.position(node),el=node.parentNode,_5d3=function(el){
return ((isIE<=6||(isIE&&_5cd))?false:(_5c8.get(el,"position").toLowerCase()=="fixed"));
};
if(_5d3(node)){
return;
}
while(el){
if(el==body){
el=_5cf;
}
var _5d4=geom.position(el),_5d5=_5d3(el);
if(el==_5cf){
_5d4.w=_5d0;
_5d4.h=_5d1;
if(_5cf==html&&isIE&&rtl){
_5d4.x+=_5cf.offsetWidth-_5d4.w;
}
if(_5d4.x<0||!isIE){
_5d4.x=0;
}
if(_5d4.y<0||!isIE){
_5d4.y=0;
}
}else{
var pb=geom.getPadBorderExtents(el);
_5d4.w-=pb.w;
_5d4.h-=pb.h;
_5d4.x+=pb.l;
_5d4.y+=pb.t;
var _5d6=el.clientWidth,_5d7=_5d4.w-_5d6;
if(_5d6>0&&_5d7>0){
_5d4.w=_5d6;
_5d4.x+=(rtl&&(isIE||el.clientLeft>pb.l))?_5d7:0;
}
_5d6=el.clientHeight;
_5d7=_5d4.h-_5d6;
if(_5d6>0&&_5d7>0){
_5d4.h=_5d6;
}
}
if(_5d5){
if(_5d4.y<0){
_5d4.h+=_5d4.y;
_5d4.y=0;
}
if(_5d4.x<0){
_5d4.w+=_5d4.x;
_5d4.x=0;
}
if(_5d4.y+_5d4.h>_5d1){
_5d4.h=_5d1-_5d4.y;
}
if(_5d4.x+_5d4.w>_5d0){
_5d4.w=_5d0-_5d4.x;
}
}
var l=_5d2.x-_5d4.x,t=_5d2.y-Math.max(_5d4.y,0),r=l+_5d2.w-_5d4.w,bot=t+_5d2.h-_5d4.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
if(rtl&&((isIE==8&&!_5cd)||isIE>=9)){
s=-s;
}
_5d2.x+=el.scrollLeft;
el.scrollLeft+=s;
_5d2.x-=el.scrollLeft;
}
if(bot*t>0){
_5d2.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_5d2.y-=el.scrollTop;
}
el=(el!=_5cf)&&!_5d5&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
};
require(["dojo/_base/sniff","dojo/on"],function(has,on){
if(has("ie")==8){
var _5d8=screen.deviceXDPI;
setInterval(function(){
if(screen.deviceXDPI!=_5d8){
_5d8=screen.deviceXDPI;
on.emit(_5c7.global,"resize");
}
},250);
}
});
return _5c9;
});
},"curam/util/ResourceBundle":function(){
define("curam/util/ResourceBundle",["dojo/i18n","dojo/string"],function(i18n,_5d9){
var _5da=dojo.declare("curam.util.ResourceBundle",null,{_bundle:undefined,constructor:function(_5db,_5dc){
var _5dd=_5db.split(".");
var _5de=_5dd[_5dd.length-1];
var _5df=_5dd.length==1?"curam.application":_5db.slice(0,_5db.length-_5de.length-1);
try{
var b=i18n.getLocalization(_5df,_5de,_5dc);
if(this._isEmpty(b)){
throw new Error("Empty resource bundle.");
}else{
this._bundle=b;
}
}
catch(e){
throw new Error("Unable to access resource bundle: "+_5df+"."+_5de+": "+e.message);
}
},_isEmpty:function(_5e0){
for(var prop in _5e0){
return false;
}
return true;
},getProperty:function(key,_5e1){
var msg=this._bundle[key];
var _5e2=msg;
if(_5e1){
_5e2=_5d9.substitute(msg,_5e1);
}
return _5e2;
}});
return _5da;
});
},"curam/matrix/BottomLeftFiller":function(){
define("curam/matrix/BottomLeftFiller",["dijit","dojo","dojox"],function(_5e3,dojo,_5e4){
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
define("curam/matrix/QuestionRight",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_5e5,dojo,_5e6){
dojo.provide("curam.matrix.QuestionRight");
dojo.require("curam.matrix.Constants");
dojo.declare("curam.matrix.QuestionRight",null,{constructor:function(node,_5e7){
this.node=node;
this.matrix=_5e7;
this.qId=this.node.id.replace("qr-","");
this.priorityGroup=null;
this.scoreGroup=null;
this.contradiction=null;
this.outcomeGroup=new curam.ListMap();
var _5e8=dojo.query("> :first-child",node)[0];
if(this.matrix.priorityExists){
this.priorityGroup=new curam.matrix.PriorityGroup(_5e8,this.matrix);
_5e8=cm.nextSibling(_5e8);
}
if(this.matrix.scoreExists){
this.scoreGroup=new curam.matrix.ScoreGroup(_5e8);
_5e8=cm.nextSibling(_5e8);
}
if(this.matrix.contradictionsExist){
this.contradiction=new curam.matrix.Contradiction(_5e8);
_5e8=cm.nextSibling(_5e8);
}
if(this.matrix.outcomesExist){
while(_5e8!=null){
this.outcomeGroup.add(_5e8.id,new curam.matrix.Outcome(_5e8));
_5e8=cm.nextSibling(_5e8);
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
var _5e9=this.outcomeGroup;
this.outcomeGroup=new curam.ListMap();
for(var _5ea=0;_5ea<_5e9.keys.length;_5ea++){
var key=_5e9.keys[_5ea];
this.outcomeGroup.add(key,new curam.matrix.Outcome(_5e9.getObjectByKey(key).node));
}
},positionPriority:function(_5eb){
if(_5eb.ansHeightGreaterThanDefault){
var _5ec=(_5eb.ansHeight/2)-(curam.matrix.Constants.container.ansValInputHeight/2);
curam.matrix.Constants.container.cssText.append(".matrix-container .pri-eval-").append(this.qId).append("{margin-top:").append(_5ec).append("px;}");
}
},positionCombinationCells:function(_5ed){
var c=curam.matrix.Constants.container;
if(_5ed.ansHeightGreaterThanDefault){
var top=(_5ed.ansHeight-c.cboxHeight-c.cboxOffsetDiff)/2;
c.cssText.append(".matrix-container .cbox-eval-").append(this.qId).append("{top:").append(top).append("px;}");
}
},addAnswer:function(){
var c=curam.matrix.Constants.container;
var _5ee=c.matrix.bottomRight;
var ql=c.matrix.getQuestion(this.qId);
var _5ef=c.matrix.bottomLeft.bottomLeftMain.questions.getObjectByIndex(0);
var _5f0=ql.ansGroup.getLastAddedAnswerId();
var _5f1=ql.node.id==_5ef.node.id?true:false;
var _5f2;
if(this.matrix.priorityExists){
this.priorityGroup.addPriority(_5ee.addPriority(this.qId,_5f0,false));
}
if(this.matrix.scoreExists){
this.scoreGroup.node.appendChild(_5ee.addScore(this.qId,_5f0,false));
}
if(this.matrix.contradictionsExist){
this.contradiction.node.appendChild(_5ee.addContradictionRow(this.qId,_5f0,_5f1,false));
this.refreshContradictions();
}
if(this.matrix.outcomesExist){
for(var i=0;i<this.outcomeGroup.count;i++){
_5f2=c.matrix.topRight.topRightTop.outcomeCols.getObjectByIndex(i).outId;
this.outcomeGroup.getObjectByIndex(i).node.appendChild(_5ee.addOutcomeRow(_5f2,this.qId,_5f0,_5f1,false));
}
this.refreshOutcomes();
}
},deleteAnswer:function(_5f3,_5f4){
var cell;
if(this.matrix.priorityExists){
var _5f5="pri-"+this.qId+"-"+_5f4;
this.priorityGroup.priorities.removeByKey(_5f5);
if(_5f3){
dojo.removeClass(this.priorityGroup.priorities.getObjectByIndex(0).node,"ans");
}
dojo.destroy(dojo.byId(_5f5));
}
if(this.matrix.scoreExists){
var _5f6="scr-"+this.qId+"-"+_5f4;
this.scoreGroup.scores.removeByKey(_5f5);
if(_5f3){
dojo.removeClass(this.scoreGroup.scores.getObjectByIndex(0).node,"ans");
}
dojo.destroy(dojo.byId(_5f6));
}
if(this.matrix.contradictionsExist){
var _5f7="contr-row-"+this.qId+"-"+_5f4;
this.contradiction.rows.removeByKey(_5f7);
if(_5f3){
var _5f8=this.contradiction.rows.getObjectByIndex(0).cells;
for(var i=0;i<_5f8.count;i++){
cell=_5f8.getObjectByIndex(i).node;
dojo.addClass(cell,"cell-first-row");
if(i==_5f8.count-1){
dojo.removeClass(cell,"cell-last-col");
dojo.addClass(cell,"cell-no-border");
}else{
dojo.removeClass(cell,"cell");
}
}
}
dojo.destroy(dojo.byId(_5f7));
}
if(this.matrix.outcomesExist){
var _5f9,_5fa,_5fb,_5fc=/.*-/;
var _5fd=curam.matrix.util.safeSplit;
for(var _5fe=0;_5fe<this.outcomeGroup.count;_5fe++){
_5fa=this.outcomeGroup.getObjectByIndex(_5fe);
_5fb=_5fd(_5fa.node.id,"-")[1];
_5f9="out-"+_5fb+"-row-"+this.qId+"-"+_5f4;
_5fa.rows.removeByKey(_5f9);
for(var j=0;j<_5fa.rows.getObjectByIndex(0).cells.count;j++){
cell=_5fa.rows.getObjectByIndex(0).cells.getObjectByIndex(j).node;
dojo.addClass(cell,"cell-first-row");
if(j==_5fa.rows.getObjectByIndex(0).cells.count-1){
dojo.removeClass(cell,"cell-last-col");
dojo.addClass(cell,"cell-no-border");
}else{
dojo.removeClass(cell,"cell");
}
}
dojo.destroy(dojo.byId(_5f9));
}
}
},getContradictionCount:function(){
var _5ff=this.contradiction.rows.getObjectByIndex(0);
if(_5ff){
return _5ff.cells.count;
}
return 0;
},getOutcome:function(_600){
return this.outcomeGroup.getObjectByKey("out-"+_600+"-"+this.qId);
}});
});
},"curam/util":function(){
define("curam/util",["dojo/dom","dijit/registry","dojo/dom-construct","dojo/ready","dojo/_base/window","dojo/dom-style","dojo/_base/array","dojo/dom-class","dojo/topic","dojo/_base/event","dojo/query","dojo/has","dojo/_base/unload","dojo/dom-geometry","dojo/_base/json","dojo/dom-attr","dojo/_base/lang","dojo/on","curam/define","curam/debug","curam/util/RuntimeContext","curam/util/Constants","dojo/_base/sniff","cm/_base/_dom","curam/util/ResourceBundle"],function(dom,_601,_602,_603,_604,_605,_606,_607,_608,_609,_60a,has,_60b,geom,json,attr,lang,on){
dojo.requireLocalization("curam.application","Debug");
var _60c=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util",{PREVENT_CACHE_FLAG:"o3pc",INFORMATIONAL_MSGS_STORAGE_ID:"__informationals__",ERROR_MESSAGES_CONTAINER:"error-messages-container",ERROR_MESSAGES_LIST:"error-messages",CACHE_BUSTER:0,CACHE_BUSTER_PARAM_NAME:"o3nocache",msgLocaleSelectorActionPage:"$not-locaized$ Usage of the Language Selector is not permitted from an editable page that has previously been submitted.",insertCssText:function(_60d,_60e){
var id=_60e?_60e:"_runtime_stylesheet_";
var _60f=dom.byId(id);
var _610;
if(_60f){
if(_60f.styleSheet){
_60d=_60f.styleSheet.cssText+_60d;
_610=_60f;
_610.setAttribute("id","_nodeToRm");
}else{
_60f.appendChild(document.createTextNode(_60d));
return;
}
}
var pa=document.getElementsByTagName("head")[0];
_60f=_602.create("style",{type:"text/css",id:id});
if(_60f.styleSheet){
_60f.styleSheet.cssText=_60d;
}else{
_60f.appendChild(document.createTextNode(_60d));
}
pa.appendChild(_60f);
if(_610){
_610.parentNode.removeChild(_610);
}
},fireRefreshTreeEvent:function(){
if(dojo.global.parent&&dojo.global.parent.amIFrame){
var wpl=dojo.global.parent.loader;
}
if(wpl&&wpl.dojo){
wpl.dojo.publish("refreshTree");
}
},firePageSubmittedEvent:function(_611){
require(["curam/tab"],function(){
var _612=curam.tab.getSelectedTab();
if(_612){
var _613=curam.tab.getTabWidgetId(_612);
var _614=curam.util.getTopmostWindow();
var ctx=(_611=="dialog")?curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_DIALOG:curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN;
_614.curam.util.Refresh.getController(_613).pageSubmitted(dojo.global.jsPageID,ctx);
_614.dojo.publish("/curam/main-content/page/submitted",[dojo.global.jsPageID,_613]);
}else{
curam.debug.log("/curam/main-content/page/submitted: "+_60c.getProperty("curam.util.no.open"));
}
});
},fireTabOpenedEvent:function(_615){
curam.util.getTopmostWindow().dojo.publish("curam.tabOpened",[dojo.global.jsPageID,_615]);
},setupSubmitEventPublisher:function(){
_603(function(){
var form=dom.byId("mainForm");
if(form){
curam.util.connect(form,"onsubmit",function(){
curam.util.firePageSubmittedEvent("main-content");
});
}
});
},getScrollbar:function(){
var _616=_602.create("div",{},_604.body());
_605.set(_616,{width:"100px",height:"100px",overflow:"scroll",position:"absolute",top:"-300px",left:"0px"});
var test=_602.create("div",{},_616);
_605.set(test,{width:"400px",height:"400px"});
var _617=_616.offsetWidth-_616.clientWidth;
_602.destroy(_616);
return {width:_617};
},isModalWindow:function(){
return (dojo.global.curamModal===undefined)?false:true;
},getTopmostWindow:function(){
if(typeof (dojo.global._curamTopmostWindow)=="undefined"){
var _618=dojo.global;
if(typeof (dojo.global.jsScreenContext)!="undefined"&&dojo.global.jsScreenContext.hasContextBits("CONTEXT_PORTLET")){
dojo.global._curamTopmostWindow=_618;
}else{
if(_618.__extAppTopWin){
dojo.global._curamTopmostWindow=_618;
}else{
while(_618.parent!=_618){
_618=_618.parent;
if(_618.__extAppTopWin){
break;
}
}
dojo.global._curamTopmostWindow=_618;
}
}
}
if(dojo.global._curamTopmostWindow.location.href.indexOf("AppController.do")<0&&typeof (dojo.global._curamTopmostWindow.__extAppTopWin)=="undefined"){
curam.debug.log(_60c.getProperty("curam.util.wrong.window")+dojo.global._curamTopmostWindow.location.href);
}
return dojo.global._curamTopmostWindow;
},getUrlParamValue:function(url,_619){
var qPos=url.indexOf("?");
if(qPos<0){
return null;
}
var _61a=url.substring(qPos+1,url.length);
function _61b(_61c){
var _61d=_61a.split(_61c);
_619+="=";
for(var i=0;i<_61d.length;i++){
if(_61d[i].indexOf(_619)==0){
return _61d[i].split("=")[1];
}
}
};
return _61b("&")||_61b("");
},addUrlParam:function(href,_61e,_61f,_620){
var hasQ=href.indexOf("?")>-1;
var _621=_620?_620:"undefined";
if(!hasQ||(_621==false)){
return href+(hasQ?"&":"?")+_61e+"="+_61f;
}else{
var _622=href.split("?");
href=_622[0]+"?"+_61e+"="+_61f+(_622[1]!=""?("&"+_622[1]):"");
return href;
}
},replaceUrlParam:function(href,_623,_624){
href=curam.util.removeUrlParam(href,_623);
return curam.util.addUrlParam(href,_623,_624);
},removeUrlParam:function(url,_625,_626){
var qPos=url.indexOf("?");
if(qPos<0){
return url;
}
if(url.indexOf(_625+"=")<0){
return url;
}
var _627=url.substring(qPos+1,url.length);
var _628=_627.split("&");
var _629;
var _62a,_62b;
for(var i=0;i<_628.length;i++){
if(_628[i].indexOf(_625+"=")==0){
_62b=false;
if(_626){
_62a=_628[i].split("=");
if(_62a.length>1){
if(_62a[1]==_626){
_62b=true;
}
}else{
if(_626==""){
_62b=true;
}
}
}else{
_62b=true;
}
if(_62b){
_628.splice(i,1);
i--;
}
}
}
return url.substring(0,qPos+1)+_628.join("&");
},stripHash:function(url){
var idx=url.indexOf("#");
if(idx<0){
return url;
}
return url.substring(0,url);
},isSameUrl:function(_62c,_62d,rtc){
if(!_62d){
_62d=rtc.getHref();
}
if(_62c.indexOf("#")==0){
return true;
}
var _62e=_62c.indexOf("#");
if(_62e>-1){
if(_62e==0){
return true;
}
var _62f=_62c.split("#");
var _630=_62d.indexOf("#");
if(_630>-1){
if(_630==0){
return true;
}
_62d=_62d.split("#")[0];
}
return _62f[0]==_62d;
}
var _631=function(url){
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
var here=curam.util.stripHash(rp(_62d,curam.util.Constants.RETURN_PAGE_PARAM));
var _632=curam.util.stripHash(rp(_62c,curam.util.Constants.RETURN_PAGE_PARAM));
var _633=_632.split("?");
var _634=here.split("?");
_634[0]=_631(_634[0]);
_633[0]=_631(_633[0]);
var _635=(_634[0]==_633[0]||_634[0].match(_633[0]+"$")==_633[0]);
if(!_635){
return false;
}
if(_634.length==1&&_633.length==1&&_635){
return true;
}else{
var _636;
var _637;
if(typeof _634[1]!="undefined"&&_634[1]!=""){
_636=_634[1].split("&");
}else{
_636=new Array();
}
if(typeof _633[1]!="undefined"&&_633[1]!=""){
_637=_633[1].split("&");
}else{
_637=new Array();
}
curam.debug.log("curam.util.isSameUrl: paramsHere "+_60c.getProperty("curam.util.before")+_636.length);
_636=_606.filter(_636,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_60c.getProperty("curam.util.after")+_636.length);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_60c.getProperty("curam.util.before")+_637.length);
_637=_606.filter(_637,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_60c.getProperty("curam.util.after")+_637.length);
if(_636.length!=_637.length){
return false;
}
var _638={};
var _639;
for(var i=0;i<_636.length;i++){
_639=_636[i].split("=");
_638[_639[0]]=_639[1];
}
for(var i=0;i<_637.length;i++){
_639=_637[i].split("=");
if(_638[_639[0]]!=_639[1]){
curam.debug.log(_60c.getProperty("curam.util.no.match",[_639[0],_639[1],_638[_639[0]]]));
return false;
}
}
}
return true;
},isNotCDEJParam:function(_63a){
return !((_63a.charAt(0)=="o"&&_63a.charAt(1)=="3")||(_63a.charAt(0)=="_"&&_63a.charAt(1)=="_"&&_63a.charAt(2)=="o"&&_63a.charAt(3)=="3"));
},setAttributes:function(node,map){
for(var x in map){
node.setAttribute(x,map[x]);
}
},invalidatePage:function(){
curam.PAGE_INVALIDATED=true;
var _63b=dojo.global.dialogArguments?dojo.global.dialogArguments[0]:opener;
if(_63b&&_63b!=dojo.global){
try{
_63b.curam.util.invalidatePage();
}
catch(e){
curam.debug.log(_60c.getProperty("curam.util.error"),e);
}
}
},redirectWindow:function(href,_63c,_63d){
var rtc=new curam.util.RuntimeContext(dojo.global);
var _63e=function(_63f,_640,href,_641,_642){
curam.util.getFrameRoot(_63f,_640).curam.util.redirectContentPanel(href,_641,_642);
};
curam.util._doRedirectWindow(href,_63c,_63d,dojo.global.jsScreenContext,rtc,curam.util.publishRefreshEvent,_63e);
},_doRedirectWindow:function(href,_643,_644,_645,rtc,_646,_647){
if(href&&curam.util.isActionPage(href)){
curam.debug.log(_60c.getProperty("curam.util.stopping"),href);
return;
}
var rpl=curam.util.replaceUrlParam;
var _648=_645.hasContextBits("TREE")||_645.hasContextBits("AGENDA")||_645.hasContextBits("ORG_TREE");
if(curam.util.FORCE_REFRESH){
href=rpl(rtc.getHref(),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
if(curam.util.isModalWindow()||_648){
_646();
dojo.global.location.href=href;
}else{
if(_645.hasContextBits("LIST_ROW_INLINE_PAGE")||_645.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(href);
}else{
_646();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
require(["curam/tab"],function(){
_647(dojo.global,curam.tab.getTabController().ROOT_OBJ,href,true,true);
});
}
}
}
return;
}
var u=curam.util;
var rtc=new curam.util.RuntimeContext(dojo.global);
if(!_648&&!_643&&!curam.PAGE_INVALIDATED&&u.isSameUrl(href,null,rtc)){
return;
}
if(curam.util.isModalWindow()||_648){
href=rpl(rpl(href,"o3frame","modal"),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
var form=_602.create("form",{action:href,method:"POST"});
if(!_648){
if(!dom.byId("o3ctx")){
form.action=curam.util.removeUrlParam(form.action,"o3ctx");
var _649=_602.create("input",{type:"hidden",id:"o3ctx",name:"o3ctx",value:_645.getValue()},form);
}
_604.body().appendChild(form);
_646();
form.submit();
}
if(!_644){
if(_648){
curam.util.redirectFrame(href);
}
}
}else{
if(_645.hasContextBits("LIST_ROW_INLINE_PAGE")||_645.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(href);
}else{
_646();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
if(_645.hasContextBits("EXTAPP")){
var _64a=window.top;
_64a.dijit.byId("curam-app").updateMainContentIframe(href);
}else{
require(["curam/tab"],function(){
curam.util.getFrameRoot(dojo.global,curam.tab.getTabController().ROOT_OBJ).curam.util.redirectContentPanel(href,_643);
});
}
}
}
}
},_handleInlinePageRefresh:function(href){
curam.debug.log(_60c.getProperty("curam.util.closing.modal"),href);
var _64b=new curam.ui.PageRequest(href);
require(["curam/tab"],function(){
curam.tab.getTabController().checkPage(_64b,function(_64c){
curam.util.publishRefreshEvent();
dojo.global.location.reload(true);
});
});
},redirectContentPanel:function(url,_64d,_64e){
require(["curam/tab"],function(){
var _64f=curam.tab.getContentPanelIframe();
var _650=url;
if(_64f!=null){
var rpu=curam.util.Constants.RETURN_PAGE_PARAM;
var _651=null;
if(url.indexOf(rpu+"=")>=0){
curam.debug.log("curam.util.redirectContentPanel: "+_60c.getProperty("curam.util.rpu"));
_651=decodeURIComponent(curam.util.getUrlParamValue(url,rpu));
}
if(_651){
_651=curam.util.removeUrlParam(_651,rpu);
_650=curam.util.replaceUrlParam(url,rpu,encodeURIComponent(_651));
}
}
var _652=new curam.ui.PageRequest(_650);
if(_64d){
_652.forceLoad=true;
}
if(_64e){
_652.justRefresh=true;
}
curam.tab.getTabController().handlePageRequest(_652);
});
},redirectFrame:function(href){
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
var _653=curam.util.getFrameRoot(dojo.global,"wizard").targetframe;
_653.curam.util.publishRefreshEvent();
_653.location.href=href;
}else{
if(dojo.global.jsScreenContext.hasContextBits("ORG_TREE")){
var _653=curam.util.getFrameRoot(dojo.global,"orgTreeRoot");
_653.curam.util.publishRefreshEvent();
_653.dojo.publish("orgTree.refreshContent",[href]);
}else{
var _654=curam.util.getFrameRoot(dojo.global,"iegtree");
var _655=_654.navframe||_654.frames[0];
var _656=_654.contentframe||_654.frames["contentframe"];
_656.curam.util.publishRefreshEvent();
if(curam.PAGE_INVALIDATED||_655.curam.PAGE_INVALIDATED){
var _657=curam.util.modifyUrlContext(href,"ACTION");
_656.location.href=_657;
}else{
_656.location.href=href;
}
}
}
return true;
},publishRefreshEvent:function(){
_608.publish("/curam/page/refresh");
},openGenericErrorModalDialog:function(_658,_659,_65a,_65b,_65c){
var url;
var _65d;
var sc=new curam.util.ScreenContext("MODAL");
var _65e="titlePropertyName="+_659+"&";
var _65f="messagePropertyName="+_65a+"&";
var _660="errorModal="+_65c+"&";
if(_65b){
_65d="messagePlaceholder1="+_65b+"&";
url="generic-modal-error.jspx?"+_65e+_65f+_65d+_660+sc.toRequestString();
}else{
url="generic-modal-error.jspx?"+_65e+_65f+sc.toRequestString();
}
curam.util.openModalDialog({href:url},_658);
},openModalDialog:function(_661,_662,left,top,_663){
var href;
if(!_661||!_661.href){
_661=_609.fix(_661);
var _664=_661.target;
while(_664.tagName!="A"&&_664!=_604.body()){
_664=_664.parentNode;
}
href=_664.href;
_664._isModal=true;
_609.stop(_661);
}else{
href=_661.href;
_661._isModal=true;
}
require(["curam/dialog"]);
var opts=curam.dialog.parseWindowOptions(_662);
curam.util.showModalDialog(href,_661,opts["width"],opts["height"],left,top,false,null,null,_663);
return false;
},showModalDialog:function(url,_665,_666,_667,left,top,_668,_669,_66a,_66b){
var _66c=curam.util.getTopmostWindow();
if(dojo.global!=_66c){
curam.debug.log("curam.util.showModalDialog: "+_60c.getProperty("curam.util.redirecting.modal"));
_66c.curam.util.showModalDialog(url,_665,_666,_667,left,top,_668,_669,dojo.global,_66b);
return;
}
var rup=curam.util.replaceUrlParam;
url=rup(url,"o3frame","modal");
url=curam.util.modifyUrlContext(url,"MODAL","TAB|LIST_ROW_INLINE_PAGE|LIST_EVEN_ROW|NESTED_UIM");
url=rup(url,curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
curam.debug.log(_60c.getProperty("curam.util.modal.url"),url);
if(_666){
_666=typeof (_666)=="number"?_666:parseInt(_666);
}
if(_667){
_667=typeof (_667)=="number"?_667:parseInt(_667);
}
if(!curam.util._isModalCurrentlyOpening()){
curam.util._setModalCurrentlyOpening(true);
require(["curam/ModalDialog"]);
new curam.ModalDialog({href:url,width:_666,height:_667,openNode:(_665&&_665.target)?_665.target:null,parentWindow:_66a,uimToken:_66b});
}
},_isModalCurrentlyOpening:function(){
return curam.util.getTopmostWindow().curam.util._modalOpenInProgress;
},_setModalCurrentlyOpening:function(_66d){
curam.util.getTopmostWindow().curam.util._modalOpenInProgress=_66d;
},setupPreferencesLink:function(href){
_603(function(){
var _66e=_60a(".user-preferences")[0];
if(_66e){
if(typeof (_66e._disconnectToken)=="undefined"){
_66e._disconnectToken=curam.util.connect(_66e,"onclick",curam.util.openPreferences);
}
if(!href){
href=dojo.global.location.href;
}
if(curam.util.isActionPage(href)){
_607.replace(_66e,"disabled","enabled");
_66e._curamDisable=true;
}else{
_607.replace(_66e,"enabled","disabled");
_66e._curamDisable=false;
}
}else{
curam.debug.log(_60c.getProperty("curam.util.no.setup"));
}
});
},openPreferences:function(_66f){
_609.stop(_66f);
if(_66f.target._curamDisable){
return;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("user-prefs-editor.jspx",{dialogOptions:"width=450"});
});
},openAbout:function(_670){
_609.stop(_670);
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("about.jsp",{dialogOptions:"width=645,height=480"});
});
},addMinWidthCalendarCluster:function(id){
var _671=dom.byId(id);
var i=0;
function _672(evt){
_606.forEach(_671.childNodes,function(node){
if(_607.contains(node,"cluster")){
_605.set(node,"width","97%");
if(node.clientWidth<700){
_605.set(node,"width","700px");
}
}
});
};
if(has("ie")>6){
_606.forEach(_671.childNodes,function(node){
if(_607.contains(node,"cluster")){
_605.set(node,"minWidth","700px");
}
});
}else{
on(dojo.global,"resize",_672);
_603(_672);
}
},addPopupFieldListener:function(id){
if(!has("ie")||has("ie")>6){
return;
}
if(!curam.util._popupFields){
function _673(evt){
var _674=0;
var j=0;
var x=0;
var arr=curam.util._popupFields;
_606.forEach(curam.util._popupFields,function(id){
var _675=dom.byId(id);
_60a("> .popup-actions",_675).forEach(function(node){
_674=node.clientWidth+30;
});
_60a("> .desc",_675).forEach(function(node){
_605.set(node,"width",Math.max(0,_675.clientWidth-_674)+"px");
});
});
};
curam.util._popupFields=[id];
on(dojo.global,"resize",_673);
_603(_673);
}else{
curam.util._popupFields.push(id);
}
},addContentWidthListener:function(id){
if(has("ie")>6){
return;
}
var _676=_605.set;
var _677=_607.contains;
function _678(evt){
var i=0;
var _679=dom.byId("content");
if(_679){
var _67a=_679.clientWidth;
if(has("ie")==6&&dom.byId("footer")){
var _67b=_604.body().clientHeight-100;
_676(_679,"height",_67b+"px");
var _67c=dom.byId("sidebar");
if(_67c){
_676(_67c,"height",_67b+"px");
}
}
try{
_60a("> .page-title-bar",_679).forEach(function(node){
var _67d=geom.getMarginSize(node).w-geom.getContentBox(node).w;
if(!has("ie")){
_67d+=1;
}
_67a=_679.clientWidth-_67d;
_605.set(node,"width",_67a+"px");
});
}
catch(e){
}
_60a("> .page-description",_679).style("width",_67a+"px");
_60a("> .in-page-navigation",_679).style("width",_67a+"px");
}
};
curam.util.subscribe("/clusterToggle",_678);
curam.util.connect(dojo.global,"onresize",_678);
_603(_678);
},alterScrollableListBottomBorder:function(id,_67e){
var _67f=_67e;
var _680="#"+id+" table";
function _681(){
var _682=_60a(_680)[0];
if(_682.offsetHeight>=_67f){
var _683=_60a(".odd-last-row",_682)[0];
if(typeof _683!="undefined"){
_607.add(_683,"no-bottom-border");
}
}else{
if(_682.offsetHeight<_67f){
var _683=_60a(".even-last-row",_682)[0];
if(typeof _683!="undefined"){
_607.add(_683,"add-bottom-border");
}
}else{
curam.debug.log("curam.util.alterScrollableListBottomBorder: "+_60c.getProperty("curam.util.code"));
}
}
};
_603(_681);
},addFileUploadResizeListener:function(code){
function _684(evt){
if(_60a(".widget")){
_60a(".widget").forEach(function(_685){
var _686=_685.clientWidth;
if(_60a(".fileUpload",_685)){
_60a(".fileUpload",_685).forEach(function(_687){
fileUploadWidth=_686/30;
if(fileUploadWidth<4){
_687.size=1;
}else{
_687.size=fileUploadWidth;
}
});
}
});
}
};
on(dojo.global,"resize",_684);
_603(_684);
},openCenteredNonModalWindow:function(url,_688,_689,name){
_688=Number(_688);
_689=Number(_689);
var _68a=(screen.width-_688)/2;
var _68b=(screen.height-_689)/2;
_689=_68b<0?screen.height:_689;
_68b=Math.max(0,_68b);
_688=_68a<0?screen.width:_688;
_68a=Math.max(0,_68a);
var left="left",top="top";
if(has("ff")){
left="screenX",top="screenY";
}
var _68c="location=no, menubar=no, status=no, toolbar=no, "+"scrollbars=yes, resizable=no";
var _68d=dojo.global.open(url,name||"name","width="+_688+", height="+_689+", "+left+"="+_68a+","+top+"="+_68b+","+_68c);
_68d.resizeTo(_688,_689);
_68d.moveTo(_68a,_68b);
_68d.focus();
},adjustTargetContext:function(win,href){
if(win&&win.dojo.global.jsScreenContext){
var _68e=win.dojo.global.jsScreenContext;
_68e.updateStates(dojo.global.jsScreenContext);
return curam.util.replaceUrlParam(href,"o3ctx",_68e.getValue());
}
return href;
},modifyUrlContext:function(url,_68f,_690){
var _691=url;
var ctx=new curam.util.ScreenContext();
var _692=curam.util.getUrlParamValue(url,"o3ctx");
if(_692){
ctx.setContext(_692);
}else{
ctx.clear();
}
if(_68f){
ctx.addContextBits(_68f);
}
if(_690){
ctx.clear(_690);
}
_691=curam.util.replaceUrlParam(url,"o3ctx",ctx.getValue());
return _691;
},updateCtx:function(_693){
var _694=curam.util.getUrlParamValue(_693,"o3ctx");
if(!_694){
return _693;
}
return curam.util.modifyUrlContext(_693,null,"MODAL");
},getFrameRoot:function(_695,_696){
var _697=false;
var _698=_695;
if(_698){
while(_698!=top&&!_698.rootObject){
_698=_698.parent;
}
if(_698.rootObject){
_697=(_698.rootObject==_696);
}
}
return _697?_698:null;
},saveInformationalMsgs:function(_699){
curam.util.runStorageFn(function(){
try{
var _69a=curam.util.getTopmostWindow().dojox;
_69a.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,json.toJson({pageID:_604.body().id,total:dom.byId(curam.util.ERROR_MESSAGES_CONTAINER).innerHTML,listItems:dom.byId(curam.util.ERROR_MESSAGES_LIST).innerHTML}));
}
catch(e){
curam.debug.log(_60c.getProperty("curam.util.exception"),e);
}
},_699);
},runStorageFn:function(fn,_69b){
var _69c=function(){
fn();
if(_69b){
setTimeout(_69b,10);
}
};
var _69d=curam.util.getTopmostWindow().dojox;
require(["dojox/storage"],function(){
var mgr=_69d.storage.manager;
if(mgr.isInitialized()){
_69c();
}else{
if(mgr.addOnLoad){
mgr.addOnLoad(_69c);
}else{
var _69e={exp:_69c};
on(mgr,"loaded",_69e,"exp");
}
}
});
},disableInformationalLoad:function(){
curam.util._informationalsDisabled=true;
},redirectDirectUrl:function(){
_603(function(){
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
_603(function(){
if(dojo.global.jsScreenContext.hasContextBits("CONTEXT_PANEL")){
return;
}
if(curam.util._informationalsDisabled){
return;
}
curam.util.runStorageFn(function(){
var _69f=curam.util.getTopmostWindow().dojox;
var msgs=_69f.storage.get(curam.util.INFORMATIONAL_MSGS_STORAGE_ID);
if(msgs&&msgs!=""){
msgs=json.fromJson(msgs);
_69f.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,"");
var div=dom.byId(curam.util.ERROR_MESSAGES_CONTAINER);
var list=dom.byId(curam.util.ERROR_MESSAGES_LIST);
if(msgs.pageID!=_604.body().id){
return;
}
if(list){
var _6a0=_602.create("ul",{innerHTML:msgs.listItems});
var _6a1=[];
for(var i=0;i<list.childNodes.length;i++){
if(list.childNodes[i].tagName=="LI"){
_6a1.push(list.childNodes[i]);
}
}
var skip=false;
var _6a2=_6a0.childNodes;
for(var i=0;i<_6a2.length;i++){
skip=false;
for(var j=0;j<_6a1.length;j++){
if(_6a2[i].innerHTML==_6a1[j].innerHTML){
skip=true;
break;
}
}
if(!skip){
list.appendChild(_6a2[i]);
i--;
}
}
}else{
if(div){
div.innerHTML=msgs.total;
}
}
}
var _6a3=dojo.byId("error-messages");
if(_6a3&&!dojo.global.jsScreenContext.hasContextBits("MODAL")){
_6a3.focus();
}
});
});
},setFocus:function(){
var _6a4=curam.util.getUrlParamValue(dojo.global.location.href,"o3frame")=="modal";
if(!_6a4){
_603(curam.util.doSetFocus);
}
},doSetFocus:function(){
var _6a5=-1;
var _6a6=-1;
var form=document.forms[0];
if(!form){
return false;
}
var _6a7=form.elements;
var l=_6a7.length;
var elem;
for(var i=0;i<l;i++){
elem=_6a7[i];
if(_6a5==-1&&(elem.type=="select-one"||elem.type=="text"||elem.tagName=="TEXTAREA")&&!_607.contains(elem,"dijitArrowButtonInner")&&!_607.contains(elem,"dijitValidationInner")){
_6a5=i;
}
if(elem.tabIndex=="1"){
elem.tabIndex=0;
_6a6=i;
break;
}
}
var elem;
if(_6a6!=-1){
elem=_6a7[_6a6];
}else{
if(_6a5!=-1){
elem=_6a7[_6a5];
}
}
try{
var _6a8=dojo.byId("error-messages");
if(_6a8){
_6a8.focus();
}else{
elem.focus();
}
}
catch(e){
curam.debug.log(_60c.getProperty("curam.util.error.focus"),e.message);
return false;
}
return true;
},openLocaleSelector:function(_6a9){
_6a9=_609.fix(_6a9);
var _6aa=_6a9.target;
while(_6aa&&_6aa.tagName!="A"){
_6aa=_6aa.parentNode;
}
var loc=_6aa.href;
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
var _6ab=curam.util.getLastPathSegmentWithQueryString(url);
var _6ac=_6ab.split("?")[0];
return _6ac.indexOf("Action.do")>-1;
},closeLocaleSelector:function(_6ad){
_6ad=_609.fix(_6ad);
_609.stop(_6ad);
dojo.global.close();
return false;
},getSuffixFromClass:function(node,_6ae){
var _6af=attr.get(node,"class").split(" ");
var _6b0=_606.filter(_6af,function(_6b1){
return _6b1.indexOf(_6ae)==0;
});
if(_6b0.length>0){
return _6b0[0].split(_6ae)[1];
}else{
return null;
}
},getCacheBusterParameter:function(){
return this.CACHE_BUSTER_PARAM_NAME+"="+new Date().getTime()+"_"+this.CACHE_BUSTER++;
},stripeTable:function(_6b2,_6b3,_6b4){
var _6b5=_6b2.tBodies[0];
var _6b6=(_6b3?2:1);
if(_6b5.rows.length<_6b6){
return;
}
var rows=_6b5.rows;
for(var i=0;i<rows.length;i+=_6b6){
curam.debug.log("curam.util.stripeTable(%s, %s): i = %s",_6b2,_6b3,i);
var _6b7=[rows[i]];
if(_6b3&&rows[i+1]){
_6b7.push(rows[i+1]);
}
_606.forEach(_6b7,function(row){
_607.remove(row,"odd-last-row");
_607.remove(row,"even-last-row");
});
if(i%(2*_6b6)==0){
_606.forEach(_6b7,function(row){
cm.replaceClass(row,"odd","even");
});
if(i==_6b4){
_606.forEach(_6b7,function(row){
_607.add(row,"odd-last-row");
});
}
}else{
_606.forEach(_6b7,function(row){
cm.replaceClass(row,"even","odd");
});
if(i==_6b4){
_606.forEach(_6b7,function(row){
_607.add(row,"even-last-row");
});
}
}
}
},fillString:function(_6b8,_6b9){
var _6ba="";
while(_6b9>0){
_6ba+=_6b8;
_6b9-=1;
}
return _6ba;
},updateHeader:function(qId,_6bb,_6bc,_6bd){
var _6be=dom.byId("header_"+qId);
_6be.firstChild.nextSibling.innerHTML=_6bb;
answerCell=dom.byId("chosenAnswer_"+qId);
answerCell.innerHTML=_6bc;
sourceCell=dom.byId("chosenSource_"+qId);
sourceCell.innerHTML=_6bd;
},search:function(_6bf,_6c0){
var _6c1=_601.byId(_6bf).get("value");
var _6c2=_601.byId(_6c0);
var _6c3=_6c2?_6c2.get("value"):null;
var _6c4="";
var _6c5;
var _6c6;
if(_6c3){
_6c6=_6c3.split("|");
_6c4=_6c6[0];
_6c5=_6c6[1];
}
var _6c7=curam.util.defaultSearchPageID;
var _6c8="";
if(_6c4===""){
_6c8=_6c7+"Page.do?searchText="+encodeURIComponent(_6c1);
}else{
_6c8=_6c5+"Page.do?searchText="+encodeURIComponent(_6c1)+"&searchType="+encodeURIComponent(_6c4);
}
var _6c9=new curam.ui.PageRequest(_6c8);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_6c9);
});
},updateDefaultSearchText:function(_6ca,_6cb){
var _6cc=_601.byId(_6ca);
var _6cd=_601.byId(_6cb);
var _6ce=_6cc?_6cc.get("value"):null;
var str=_6ce.split("|")[2];
_6cd.set("placeHolder",str);
},updateSearchBtnState:function(_6cf,_6d0){
var _6d1=_601.byId(_6cf);
var btn=dom.byId(_6d0);
var _6d2=_6d1.get("value");
if(!_6d2||lang.trim(_6d2).length<1){
_607.add(btn,"dijitDisabled");
}else{
_607.remove(btn,"dijitDisabled");
}
},furtherOptionsSearch:function(){
var _6d3=curam.util.furtherOptionsPageID+"Page.do";
var _6d4=new curam.ui.PageRequest(_6d3);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_6d4);
});
},searchButtonStatus:function(_6d5){
var btn=dojo.byId(_6d5);
if(!dojo.hasClass(btn,"dijitDisabled")){
return true;
}
},getPageHeight:function(){
var _6d6=400;
var _6d7=0;
if(_60a("frameset").length>0){
curam.debug.log("curam.util.getPageHeight() "+_60c.getProperty("curam.util.default.height"),_6d6);
_6d7=_6d6;
}else{
var _6d8=function(node){
if(!node){
curam.debug.log(_60c.getProperty("curam.util.node"));
return 0;
}
var mb=geom.getMarginSize(node);
var pos=geom.position(node);
return pos.y+mb.h;
};
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")){
var _6d9=_60a("div.bottom")[0];
var _6da=_6d8(_6d9);
curam.debug.log(_60c.getProperty("curam.util.page.height"),_6da);
curam.debug.log(_60c.getProperty("curam.util.ie7.issue"));
_6d7=_6da+1;
}else{
var _6db=dom.byId("content")||dom.byId("wizard-content");
var _6dc=_60a("> *",_6db).filter(function(n){
return n.tagName.indexOf("SCRIPT")<0&&_605.get(n,"visibility")!="hidden"&&_605.get(n,"display")!="none";
});
var _6dd=_6dc[0];
for(var i=1;i<_6dc.length;i++){
if(_6d8(_6dc[i])>=_6d8(_6dd)){
_6dd=_6dc[i];
}
}
_6d7=_6d8(_6dd);
curam.debug.log("curam.util.getPageHeight() "+_60c.getProperty("curam.util.base.height"),_6d7);
var _6de=_60a(".actions-panel",_604.body());
if(_6de.length>0){
var _6df=geom.getMarginBox(_6de[0]).h;
curam.debug.log("curam.util.getPageHeight() "+_60c.getProperty("curam.util.panel.height"));
_6d7+=_6df;
_6d7+=10;
}
var _6e0=_60a("body.details");
if(_6e0.length>0){
curam.debug.log("curam.util.getPageHeight() "+_60c.getProperty("curam.util.bar.height"));
_6d7+=20;
}
}
}
curam.debug.log("curam.util.getPageHeight() "+_60c.getProperty("curam.util.returning"),_6d7);
return _6d7;
},toCommaSeparatedList:function(_6e1){
var _6e2="";
for(var i=0;i<_6e1.length;i++){
_6e2+=_6e1[i];
if(i<_6e1.length-1){
_6e2+=",";
}
}
return _6e2;
},skipLinkFocus:function(){
var dest=dojo.byId("skip-dest");
if(dest){
dest.focus();
}
},setupGenericKeyHandler:function(){
_603(function(){
var f=function(_6e3){
if(dojo.global.jsScreenContext.hasContextBits("MODAL")&&_6e3.keyCode==27){
var ev=_609.fix(_6e3);
var _6e4=_601.byId(ev.target.id);
var _6e5=typeof _6e4!="undefined"&&_6e4.baseClass=="dijitTextBox dijitComboBox";
if(!_6e5){
curam.dialog.closeModalDialog();
}
}
if(_6e3.keyCode==13){
var ev=_609.fix(_6e3);
var _6e6=ev.target.type=="text";
var _6e7=ev.target.type=="radio";
var _6e8=ev.target.type=="checkbox";
var _6e9=ev.target.type=="select-multiple";
var _6ea=ev.target.type=="password";
var _6eb=_601.byId(ev.target.id);
if(typeof _6eb!="undefined"){
var _6ec=_601.byNode(dojo.byId("widget_"+ev.target.id));
if(_6ec&&_6ec.enterKeyOnOpenDropDown){
_6ec.enterKeyOnOpenDropDown=false;
return false;
}
}
var _6ed=typeof _6eb!="undefined"&&_6eb.baseClass=="dijitComboBox";
if((!_6e6&&!_6e7&&!_6e8&&!_6e9&&!_6ea)||_6ed){
return true;
}
var _6ee=null;
var _6ef=_60a(".curam-default-action");
if(_6ef.length>0){
_6ee=_6ef[0];
}else{
var _6f0=_60a("input[type='submit']");
if(_6f0.length>0){
_6ee=_6f0[0];
}
}
if(_6ee!=null){
_609.stop(_609.fix(_6e3));
curam.util.clickButton(_6ee);
return false;
}
dojo.require("curam.dateSelectorUtil");
var _6f1=dojo.byId("year");
if(_6f1){
dojo.stopEvent(dojo.fixEvent(_6e3));
curam.dateSelectorUtil.updateCalendar();
}
}
return true;
};
curam.util.connect(_604.body(),"onkeyup",f);
});
},enterKeyPress:function(_6f2){
if(_6f2.keyCode==13){
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
var _6f3=elem.parentElement.parentElement.id;
var _6f4=dojo.byId("end-"+_6f3);
if(_6f4){
_6f4.focus();
}
}
}
},focusHelpIconOnTab:function(e){
if(!e.shiftKey&&e.keyCode==9){
var _6f5=dojo.query(".dijitDialogHelpIcon")[0];
if(_6f5){
setTimeout(function(){
_6f5.focus();
},5);
}
}
},swapState:function(node,_6f6,_6f7,_6f8){
if(_6f6){
_607.replace(node,_6f7,_6f8);
}else{
_607.replace(node,_6f8,_6f7);
}
},makeQueryString:function(_6f9){
if(!_6f9||_6f9.length==0){
return "";
}
var _6fa=[];
for(var _6fb in _6f9){
_6fa.push(_6fb+"="+encodeURIComponent(_6f9[_6fb]));
}
return "?"+_6fa.join("&");
},clickHandlerForListActionMenu:function(url,_6fc,_6fd,_6fe){
if(_6fc){
var href=curam.util.replaceUrlParam(url,"o3frame","modal");
var ctx=dojo.global.jsScreenContext;
ctx.addContextBits("MODAL");
href=curam.util.replaceUrlParam(href,"o3ctx",ctx.getValue());
curam.util.redirectWindow(href);
return;
}
var _6ff={href:url};
require(["curam/ui/UIMPageAdaptor"]);
if(curam.ui.UIMPageAdaptor.allowLinkToContinue(_6ff)){
dojo.global.location=url;
return;
}
if(_6ff!=null){
if(_6fe){
_609.fix(_6fe);
_609.stop(_6fe);
}
if(!_6ff.href||_6ff.href.length==0){
return;
}
if(_6fd&&!curam.util.isInternal(url)){
dojo.global.open(url);
}else{
if(curam.ui.UIMPageAdaptor.isLinkValidForTabProcessing(_6ff)){
var _700=new curam.ui.PageRequest(_6ff.href);
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")||dojo.global.jsScreenContext.hasContextBits("NESTED_UIM")){
_700.pageHolder=dojo.global;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_700);
});
}
}
}
},clickHandlerForMailtoLinks:function(_701,url){
dojo.stopEvent(_701);
var _702=dojo.query("#mailto_frame")[0];
if(!_702){
_702=dojo.io.iframe.create("mailto_frame","");
}
_702.src=url;
return false;
},isInternal:function(url){
var path=url.split("?")[0];
var _703=path.match("Page.do");
if(_703!=null){
return true;
}
return false;
},getLastPathSegmentWithQueryString:function(url){
var _704=url.split("?");
var _705=_704[0].split("/");
return _705[_705.length-1]+(_704[1]?"?"+_704[1]:"");
},replaceSubmitButton:function(name){
if(curam.replacedButtons[name]=="true"){
return;
}
var _706="__o3btn."+name;
var _707;
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_707=_60a("input[id='"+_706+"']");
}else{
_707=_60a("input[name='"+_706+"']");
}
_707.forEach(function(_708,_709,_70a){
_708.tabIndex=-1;
var _70b=_708.parentNode;
var _70c="btn-id-"+_709;
curam.util.setupWidgetLoadMask("a."+_70c);
var _70d="ac initially-hidden-widget "+_70c;
if(_607.contains(_708,"first-action-control")){
_70d+=" first-action-control";
}
var _70e=_602.create("a",{"class":_70d,href:"#"},_708,"before");
var _70f=dojo.query(".page-level-menu")[0];
if(_70f){
dojo.attr(_70e,"title",_708.value);
}
_602.create("span",{"class":"filler"},_70e,"before");
var left=_602.create("span",{"class":"left-corner"},_70e);
var _710=_602.create("span",{"class":"right-corner"},left);
var _711=_602.create("span",{"class":"middle"},_710);
_711.appendChild(document.createTextNode(_708.value));
curam.util.addActionControlClass(_70e);
on(_70e,"click",function(_712){
curam.util.clickButton(this._submitButton);
_609.stop(_712);
});
_70e._submitButton=_70a[0];
_607.add(_708,"hidden-button");
});
curam.replacedButtons[name]="true";
},setupWidgetLoadMask:function(_713){
curam.util.subscribe("/curam/page/loaded",function(){
var _714=_60a(_713)[0];
if(_714){
_605.set(_714,"visibility","visible");
}else{
curam.debug.log("setupButtonLoadMask: "+_60c.getProperty("curam.util.not.found")+"'"+_713+"'"+_60c.getProperty("curam.util.ignore.mask"));
}
});
},optReplaceSubmitButton:function(name){
if(curam.util.getFrameRoot(dojo.global,"wizard")==null){
curam.util.replaceSubmitButton(name);
return;
}
var _715=curam.util.getFrameRoot(dojo.global,"wizard").navframe.wizardNavigator;
if(_715.delegatesSubmit[jsPageID]!="assumed"){
curam.util.replaceSubmitButton(name);
}
},clickButton:function(_716){
var _717=dom.byId("mainForm");
var _718;
if(!_716){
curam.debug.log("curam.util.clickButton: "+_60c.getProperty("curam.util..no.arg"));
return;
}
if(typeof (_716)=="string"){
var _719=_716;
curam.debug.log("curam.util.clickButton: "+_60c.getProperty("curam.util.searching")+_60c.getProperty("curam.util.id.of")+"'"+_719+"'.");
_716=_60a("input[id='"+_719+"']")[0];
if(!_716.form&&!_716.id){
curam.debug.log("curam.util.clickButton: "+_60c.getProperty("curam.util.searched")+_60c.getProperty("curam.util.id.of")+"'"+_719+_60c.getProperty("curam.util.exiting"));
return;
}
}
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_718=_716;
}else{
_718=_60a("input[name='"+_716.id+"']",_717)[0];
}
try{
if(attr.get(_717,"action").indexOf(jsPageID)==0){
curam.util.publishRefreshEvent();
}
_718.click();
}
catch(e){
curam.debug.log(_60c.getProperty("curam.util.exception.clicking"));
}
},printPage:function(_71a){
_609.stop(_71a);
var _71b=dojo.window.get(_71a.currentTarget.ownerDocument);
var _71c=_71b.frameElement;
var _71d=_71c;
while(_71d&&!dojo.hasClass(_71d,"tab-content-holder")){
_71d=_71d.parentNode;
}
var _71e=_71d;
var _71f=dojo.query(".detailsPanelFrame",_71e)[0];
if(_71f!=undefined&&_71f!=null){
_71f.contentWindow.focus();
_71f.contentWindow.print();
}
_71b.focus();
_71b.print();
return false;
},addSelectedClass:function(_720){
_607.add(_720.target,"selected");
},removeSelectedClass:function(_721){
_607.remove(_721.target,"selected");
},openHelpPage:function(_722,_723){
_609.stop(_722);
dojo.global.open(_723);
},connect:function(_724,_725,_726){
var h=function(_727){
_726(_609.fix(_727));
};
if(has("ie")&&has("ie")<9){
_724.attachEvent(_725,h);
_60b.addOnWindowUnload(function(){
_724.detachEvent(_725,h);
});
return {object:_724,eventName:_725,handler:h};
}else{
var _728=_725;
if(_725.indexOf("on")==0){
_728=_725.slice(2);
}
var dt=on(_724,_728,h);
_60b.addOnWindowUnload(function(){
dt.remove();
});
return dt;
}
},disconnect:function(_729){
if(has("ie")&&has("ie")<9){
_729.object.detachEvent(_729.eventName,_729.handler);
}else{
_729.remove();
}
},subscribe:function(_72a,_72b){
var st=_608.subscribe(_72a,_72b);
_60b.addOnWindowUnload(function(){
st.remove();
});
return st;
},unsubscribe:function(_72c){
_72c.remove();
},addActionControlClickListener:function(_72d){
var _72e=dom.byId(_72d);
var _72f=_60a(".ac",_72e);
if(_72f.length>0){
for(var i=0;i<_72f.length;i++){
var _730=_72f[i];
curam.util.addActionControlClass(_730);
}
}
},addActionControlClass:function(_731){
curam.util.connect(_731,"onmousedown",function(){
_607.add(_731,"selected-button");
curam.util.connect(_731,"onmouseout",function(){
_607.remove(_731,"selected-button");
});
});
},getClusterActionSet:function(){
var _732=dom.byId("content");
var _733=_60a(".blue-action-set",_732);
if(_733.length>0){
for(var i=0;i<_733.length;i++){
curam.util.addActionControlClickListener(_733[i]);
}
}
},adjustActionButtonWidth:function(){
if(has("ie")==8){
_603(function(){
if(dojo.global.jsScreenContext.hasContextBits("MODAL")){
_60a(".action-set > a").forEach(function(node){
if(node.childNodes[0].offsetWidth>node.offsetWidth){
_605.set(node,"width",node.childNodes[0].offsetWidth+"px");
_605.set(node,"display","block");
_605.set(node,"display","inline-block");
}
});
}
});
}
},setRpu:function(url,rtc,_734){
if(!url||!rtc||!rtc.getHref()){
throw {name:"Unexpected values",message:"This value not allowed for url or rtc"};
}
var _735=curam.util.getLastPathSegmentWithQueryString(rtc.getHref());
_735=curam.util.removeUrlParam(_735,curam.util.Constants.RETURN_PAGE_PARAM);
if(_734){
var i;
for(i=0;i<_734.length;i++){
if(!_734[i].key||!_734[i].value){
throw {name:"undefined value error",message:"The object did not contain a valid key/value pair"};
}
_735=curam.util.replaceUrlParam(_735,_734[i].key,_734[i].value);
}
}
var _736=curam.util.replaceUrlParam(url,curam.util.Constants.RETURN_PAGE_PARAM,encodeURIComponent(_735));
curam.debug.log("curam.util.setRpu "+_60c.getProperty("curam.util.added.rpu")+_736);
return _736;
},retrieveBaseURL:function(){
return dojo.global.location.href.match(".*://[^/]*/[^/]*");
},removeRoleRegion:function(){
var body=dojo.query("body")[0];
dojo.removeAttr(body,"role");
},iframeTitleFallBack:function(){
var _737=curam.tab.getContainerTab(curam.tab.getContentPanelIframe());
var _738=dojo.byId(curam.tab.getContentPanelIframe());
var _739=_738.contentWindow.document.title;
var _73a=dojo.query("div.nowrapTabStrip.dijitTabContainerTop-tabs > div.dijitTabChecked.dijitChecked")[0];
var _73b=dojo.query("span.tabLabel",_73a)[0];
var _73c=dojo.query("div.nowrapTabStrip.dijitTabNoLayout > div.dijitTabChecked.dijitChecked",_737.domNode)[0];
var _73d=dojo.query("span.tabLabel",_73c)[0];
if(_739&&_739!=null){
return _739;
}else{
if(_73c){
return _73d.innerHTML;
}else{
return _73b.innerHTML;
}
}
},addClassToLastNodeInContentArea:function(){
var _73e=_60a("> div","content");
var _73f=_73e.length;
if(_73f==0){
return "No need to add";
}
var _740=_73e[--_73f];
while(_607.contains(_740,"hidden-action-set")&&_740){
_740=_73e[--_73f];
}
_607.add(_740,"last-node");
},highContrastModeType:function(){
var _741=dojo.query("body.high-contrast")[0];
return _741;
}});
return curam.util;
});
},"dijit/popup":function(){
define("dijit/popup",["dojo/_base/array","dojo/aspect","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/window","./place","./BackgroundIframe","."],function(_742,_743,_744,_745,dom,_746,_747,_748,_749,_74a,has,keys,lang,on,win,_74b,_74c,_74d){
function _74e(){
if(this._popupWrapper){
_747.destroy(this._popupWrapper);
delete this._popupWrapper;
}
};
var _74f=_745(null,{_stack:[],_beginZIndex:1000,_idGen:1,_createWrapper:function(_750){
var _751=_750._popupWrapper,node=_750.domNode;
if(!_751){
_751=_747.create("div",{"class":"dijitPopup",style:{display:"none"},role:"presentation"},win.body());
_751.appendChild(node);
var s=node.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
_750._popupWrapper=_751;
_743.after(_750,"destroy",_74e,true);
}
return _751;
},moveOffScreen:function(_752){
var _753=this._createWrapper(_752);
_749.set(_753,{visibility:"hidden",top:"-9999px",display:""});
},hide:function(_754){
var _755=this._createWrapper(_754);
_749.set(_755,"display","none");
},getTopPopup:function(){
var _756=this._stack;
for(var pi=_756.length-1;pi>0&&_756[pi].parent===_756[pi-1].widget;pi--){
}
return _756[pi];
},open:function(args){
var _757=this._stack,_758=args.popup,_759=args.orient||["below","below-alt","above","above-alt"],ltr=args.parent?args.parent.isLeftToRight():_748.isBodyLtr(),_75a=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+this._idGen++);
while(_757.length&&(!args.parent||!dom.isDescendant(args.parent.domNode,_757[_757.length-1].widget.domNode))){
this.close(_757[_757.length-1].widget);
}
var _75b=this._createWrapper(_758);
_746.set(_75b,{id:id,style:{zIndex:this._beginZIndex+_757.length},"class":"dijitPopup "+(_758.baseClass||_758["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:args.parent?args.parent.id:""});
if(has("bgIframe")&&!_758.bgIframe){
_758.bgIframe=new _74c(_75b);
}
var best=_75a?_74b.around(_75b,_75a,_759,ltr,_758.orient?lang.hitch(_758,"orient"):null):_74b.at(_75b,args,_759=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],args.padding);
_75b.style.display="";
_75b.style.visibility="visible";
_758.domNode.style.visibility="visible";
var _75c=[];
_75c.push(on(_75b,_744._keypress,lang.hitch(this,function(evt){
if(evt.charOrCode==keys.ESCAPE&&args.onCancel){
_74a.stop(evt);
args.onCancel();
}else{
if(evt.charOrCode===keys.TAB){
_74a.stop(evt);
var _75d=this.getTopPopup();
if(_75d&&_75d.onCancel){
_75d.onCancel();
}
}
}
})));
if(_758.onCancel&&args.onCancel){
_75c.push(_758.on("cancel",args.onCancel));
}
_75c.push(_758.on(_758.onExecute?"execute":"change",lang.hitch(this,function(){
var _75e=this.getTopPopup();
if(_75e&&_75e.onExecute){
_75e.onExecute();
}
})));
_757.push({widget:_758,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:_75c});
if(_758.onOpen){
_758.onOpen(best);
}
return best;
},close:function(_75f){
var _760=this._stack;
while((_75f&&_742.some(_760,function(elem){
return elem.widget==_75f;
}))||(!_75f&&_760.length)){
var top=_760.pop(),_761=top.widget,_762=top.onClose;
if(_761.onClose){
_761.onClose();
}
var h;
while(h=top.handlers.pop()){
h.remove();
}
if(_761&&_761.domNode){
this.hide(_761);
}
if(_762){
_762();
}
}
}});
return (_74d.popup=new _74f());
});
},"curam/matrix/BottomRight":function(){
define("curam/matrix/BottomRight",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_763,dojo,_764){
dojo.provide("curam.matrix.BottomRight");
dojo.require("curam.matrix.Constants");
dojo.declare("curam.matrix.BottomRight",null,{constructor:function(_765){
this.node=dojo.byId("bottom-right");
this.matrix=_765;
this.questions=new curam.ListMap();
var _766=this.node.childNodes;
for(var i=0;i<_766.length;i++){
if(_766[i].nodeType==1){
this.questions.add(_766[i].id,new curam.matrix.QuestionRight(_766[i],this.matrix));
}
}
},setDimensions:function(){
var _767,_768;
var _769;
for(var i=0;i<this.questions.count;i++){
_767=this.questions.getObjectByIndex(i);
_769=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.getQuestion(_767.qId).ansGroup;
_767.positionPriority(_769);
_767.positionCombinationCells(_769);
}
this.setWidth();
},setWidth:function(){
var c=curam.matrix.Constants.container;
c.cssText.append(".matrix-container .bottom-right-eval{width:").append(c.matrix.topRight.width+c.scrollBarWidth).append("px;}");
},addQuestion:function(_76a){
var _76b=dojo.create("div",{id:"qr-"+_76a[0],"class":"right-eval "+_76a[0]+"-eval "});
var _76c=this.questions.count==0?true:false;
if(this.matrix.priorityExists){
_76b.appendChild(this.addPriorityGroup(_76a[0],_76a[1]));
}
if(this.matrix.scoreExists){
_76b.appendChild(this.addScoreGroup(_76a[0],_76a[1]));
}
if(this.matrix.contradictionsExist){
_76b.appendChild(this.addContradiction(_76a[0],_76a[1],null,_76c));
}
if(this.matrix.outcomesExist){
var _76d=curam.matrix.Constants.container.matrix.topRight.topRightTop.getOutcomeColIds();
for(var i=0;i<_76d.length;i++){
_76b.appendChild(this.addOutcome(_76d[i],_76a[0],_76a[1],null,_76c));
}
}
var _76e=new curam.matrix.QuestionRight(_76b,this.matrix);
this.node.appendChild(_76e.node);
this.questions.add("qr-"+_76a[0],_76e);
},addPriorityGroup:function(qId,_76f,_770){
var _771=_763.byId("pri-group-"+qId);
if(_771){
_771.destroy();
}
var _772=dojo.create("div",{id:"pri-group-"+qId,"class":"q-ct pri-col-eval q-ct-eval-"+qId});
if(_770==null){
_772.appendChild(this.addPriority(qId,1,true));
if(_76f==ANSWER_TYPE_BOOLEAN){
_772.appendChild(this.addPriority(qId,2,false));
}
}else{
var _773;
for(var i=0;i<_770.length;i++){
_773=i==0?true:false;
_772.appendChild(this.addPriority(qId,_770[i],_773));
}
}
return _772;
},addPriority:function(qId,_774,_775){
var _776=!_775?"ans":"";
var _777=(_775&&(curam.matrix.Constants.container.existingQuestionIds.indexOf(qId)==0))?"-with-menu":"";
var _778=dojo.create("div",{id:"pri-"+qId+"-"+_774,"class":_776+" ans-eval"+_777+" ans-"+qId+"-eval pri-col-eval"});
var _779=dojo.create("div",{id:"pri-val-"+qId+"-"+_774,"class":"pri-val pri-val-eval ans-str-val-eval"+_777+" pri-eval-"+qId},_778);
var _77a=curam.matrix.util.createInput("text");
var id=this.matrix.inputPrefix+"priority.s.s."+qId+"."+_774;
dojo.attr(_77a,{id:id,name:id,"class":"pri-input-eval"});
_779.appendChild(_77a);
return _778;
},addScoreGroup:function(qId,_77b,_77c){
var _77d=_763.byId("scr-group-"+qId);
if(_77d){
_77d.destroy();
}
var _77e=dojo.create("div",{id:"scr-group-"+qId,"class":"q-ct pri-col-eval q-ct-eval-"+qId});
if(_77c==null){
_77e.appendChild(this.addScore(qId,1,true));
if(_77b==ANSWER_TYPE_BOOLEAN){
_77e.appendChild(this.addScore(qId,2,false));
}
}else{
var _77f;
for(var i=0;i<_77c.length;i++){
_77f=i==0?true:false;
_77e.appendChild(this.addScore(qId,_77c[i],_77f));
}
}
return _77e;
},addScore:function(qId,_780,_781){
var _782=!_781?"ans":"";
var _783=(_781&&(curam.matrix.Constants.container.existingQuestionIds.indexOf(qId)==0))?"-with-menu":"";
var _784=dojo.create("div",{id:"scr-"+qId+"-"+_780,"class":_782+" ans-eval"+_783+" ans-"+qId+"-eval pri-col-eval"});
var _785=dojo.create("div",{id:"scr-val-"+qId+"-"+_780,"class":"pri-val pri-val-eval ans-str-val-eval"+_783+" pri-eval-"+qId},_784);
var _786=curam.matrix.util.createInput("text");
var id=this.matrix.inputPrefix+"score.s.s."+qId+"."+_780;
dojo.attr(_786,{id:id,name:id,"class":"pri-input-eval"});
dojo.place(_786,_785);
curam.matrix.util.makeNumericInput(_786);
return _784;
},addContradiction:function(qId,_787,_788,_789){
var _78a=dojo.create("div",{id:"contr-group-"+qId,"class":"q-ct q-ct-eval-"+qId+" contr-col-eval"});
if(_788==null){
_78a.appendChild(this.addContradictionRow(qId,1,_789,true));
if(_787==ANSWER_TYPE_BOOLEAN){
_78a.appendChild(this.addContradictionRow(qId,2,_789,false));
}
}else{
var _78b;
for(var i=0;i<_788.length;i++){
_78b=i==0?true:false;
_78a.appendChild(this.addContradictionRow(qId,_788[i],_789,_78b));
}
}
return _78a;
},addContradictionRow:function(qId,_78c,_78d,_78e){
var _78f=dojo.create("div",{id:"contr-row-"+qId+"-"+_78c,"class":"contr-col-eval"});
var _790=curam.matrix.Constants.container.matrix.topRight.topRightTop.contradictionCol.getCombColumnIds();
var _791;
for(var i=0;i<_790.length;i++){
_791=i==_790.length-1?true:false;
_78f.appendChild(this.addContradictionCell(qId,_78c,_790[i],_78d,_78e,_791));
}
return _78f;
},addContradictionCell:function(qId,_792,_793,_794,_795,_796){
var _797;
var _798="";
if(curam.matrix.Constants.container.existingQuestionIds.indexOf(qId)==0&&_795){
_798="-with-menu";
}
if(_795&&_796){
_797="cell-first-row cell-no-border";
}else{
if(_795){
_797="cell-first-row";
}else{
if(_796){
_797="cell-last-col";
}else{
_797="cell";
}
}
}
var _799=dojo.create("div",{id:"contr-cell-"+qId+"-"+_792+"-"+_793,"class":_797+" ans-eval"+_798});
var id=this.matrix.inputPrefix+"contrCell."+_793+".s."+qId+"."+_792;
var _79a=dojo.create("input",{id:id,type:"checkbox",name:id,"class":"cbox-eval"+_798+" contr-cbox-eval",onclick:function(evt){
curam.matrix.Constants.container.matrix.setContradictionValue(_793,evt.target,evt,qId);
return true;
}},_799);
_797=_794&&_795?"image":"hidden-image";
var _79b=dojo.create("div",{"class":_797},_799);
return _799;
},addOutcome:function(_79c,qId,_79d,_79e,_79f){
var _7a0=dojo.create("div",{id:"out-"+_79c+"-"+qId,"class":"q-ct q-ct-eval-"+qId+" out-"+_79c+"-col-eval"});
if(_79e==null){
_7a0.appendChild(this.addOutcomeRow(_79c,qId,1,_79f,true));
if(_79d==ANSWER_TYPE_BOOLEAN){
_7a0.appendChild(this.addOutcomeRow(_79c,qId,2,_79f,false));
}
}else{
var _7a1;
for(var i=0;i<_79e.length;i++){
_7a1=i==0?true:false;
_7a0.appendChild(this.addOutcomeRow(_79c,qId,_79e[i],_79f,_7a1));
}
}
return _7a0;
},addOutcomeRow:function(_7a2,qId,_7a3,_7a4,_7a5){
var _7a6=dojo.create("div",{id:"out-"+_7a2+"-row-"+qId+"-"+_7a3,"class":"out-"+_7a2+"col-eval"});
var _7a7="column-id-"+_7a2;
var _7a8=curam.matrix.Constants.container.matrix.topRight.topRightTop.outcomeCols.getObjectByKey(_7a7).getCombColumnIds();
var _7a9;
for(var i=0;i<_7a8.length;i++){
_7a9=i==_7a8.length-1?true:false;
_7a6.appendChild(this.addOutcomeCell(_7a2,qId,_7a3,_7a8[i],_7a4,_7a5,_7a9));
}
return _7a6;
},addOutcomeCell:function(_7aa,qId,_7ab,_7ac,_7ad,_7ae,_7af){
var _7b0;
var _7b1="";
if(curam.matrix.Constants.container.existingQuestionIds.indexOf(qId)==0&&_7ae){
_7b1="-with-menu";
}
if(_7ae&&_7af){
_7b0="cell-first-row cell-no-border";
}else{
if(_7ae){
_7b0="cell-first-row";
}else{
if(_7af){
_7b0="cell-last-col";
}else{
_7b0="cell";
}
}
}
var _7b2=dojo.create("div",{id:"out-"+_7aa+"-cell-"+qId+"-"+_7ab+"-"+_7ac,"class":_7b0+" ans-eval"+_7b1+" ans-"+qId+"-eval out-"+_7aa+"-cell-eval"});
var _7b3=this.matrix.inputPrefix+"outCell."+_7aa+"."+qId+"."+_7ab+"."+_7ac;
var _7b4=dojo.create("input",{type:"checkbox",id:_7b3,name:_7b3,"class":"cbox-eval"+_7b1+" out-"+_7aa+"-cbox-eval cbox-eval-"+qId,onclick:function(e){
_7b5.matrix.setOutcomeValue(_7aa,Number(_7ac),e.target,e);
return true;
}},_7b2);
var _7b5=this;
_7b0=_7ad&&_7ae?"image":"hidden-image";
var _7b6=dojo.create("div",{"class":_7b0},_7b2);
return _7b2;
},addPriorityColumn:function(){
var _7b7,curQ;
for(var i=0;i<this.questions.count;i++){
_7b7=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.getQuestion(this.questions.getObjectByIndex(i).qId);
curQ=this.questions.getObjectByIndex(i);
curQ.priorityGroup=new curam.matrix.PriorityGroup(this.addPriorityGroup(curQ.qId,_7b7.ansGroup.answerType,_7b7.ansGroup.getAnswerIds()),this.matrix);
dojo.place(curQ.priorityGroup.node,this.questions.getObjectByIndex(i).node,"first");
}
this.setWidth();
},addScoreColumn:function(){
var _7b8;
var pos=this.matrix.priorityExists?1:0;
for(var i=0;i<this.questions.count;i++){
_7b8=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.getQuestion(this.questions.getObjectByIndex(i).qId);
curQ=this.questions.getObjectByIndex(i);
curQ.scoreGroup=new curam.matrix.ScoreGroup(this.addScoreGroup(curQ.qId,_7b8.ansGroup.answerType,_7b8.ansGroup.getAnswerIds()));
dojo.place(curQ.scoreGroup.node,this.questions.getObjectByIndex(i).node,pos);
}
this.setWidth();
},addContradictionColumn:function(){
var _7b9,_7ba,_7bb,curQ;
var pos=0;
if(this.matrix.priorityExists){
pos++;
}
if(this.matrix.scoreExists){
pos++;
}
var _7bc=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.questions;
var _7bd;
for(var i=0;i<this.questions.count;i++){
_7ba=i==0?true:false;
_7b9=_7bc.getObjectByKey("ql-"+this.questions.getObjectByIndex(i).qId);
curQ=this.questions.getObjectByIndex(i);
_7bb=this.addContradiction(curQ.qId,_7b9.ansGroup.answerType,_7b9.ansGroup.getAnswerIds(),_7ba);
curQ.contradiction=new curam.matrix.Contradiction(_7bb);
_7bd=this.questions.getObjectByIndex(i).node;
dojo.place(_7bb,_7bd,pos+(_7bd.firstChild&&_7bd.firstChild.nodeName=="#comment"?1:0));
}
},addOutcomeColumn:function(_7be){
var _7bf,_7c0,_7c1,curQ;
for(var i=0;i<this.questions.count;i++){
_7c0=i==0?true:false;
_7bf=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.questions.getObjectByKey("ql-"+this.questions.getObjectByIndex(i).qId);
curQ=this.questions.getObjectByIndex(i);
_7c1=this.addOutcome(_7be[0],curQ.qId,_7bf.ansGroup.answerType,_7bf.ansGroup.getAnswerIds(),_7c0);
curQ.outcomeGroup.add(_7c1.id,new curam.matrix.Outcome(_7c1));
dojo.place(_7c1,this.questions.getObjectByIndex(i).node,"last");
}
},addContradictionCombination:function(){
var _7c2,_7c3,rows,_7c4,_7c5,row,cell,_7c6;
var _7c7=++curam.matrix.Constants.container.matrix.topRight.topRightTop.contradictionCol.combinationCount;
for(var i=0;i<this.questions.count;i++){
_7c2=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.questions.getObjectByKey("ql-"+this.questions.getObjectByIndex(i).qId);
_7c5=_7c2.ansGroup.getAnswerIds();
_7c3=i==0?true:false;
rows=this.questions.getObjectByIndex(i).contradiction.rows;
for(var j=0;j<rows.count;j++){
row=rows.getObjectByIndex(j);
cell=row.cells.getObjectByIndex(row.cells.count-1).node;
_7c4=j==0?true:false;
this.resetCellClassForSecondLastColumn(cell,_7c4);
_7c6=this.addContradictionCell(_7c2.qId,_7c5[j],_7c7,_7c3,_7c4,true);
row.cells.add(_7c6.id,new curam.matrix.ContradictionCell(_7c6));
row.node.appendChild(_7c6);
}
}
return _7c7;
},resetCellClassForSecondLastColumn:function(cell,_7c8){
var _7c9=_7c8?"cell-first-row":"cell";
if(_7c8){
dojo.removeClass(cell,"cell-no-border");
}else{
dojo.removeClass(cell,"cell-last-col");
}
dojo.addClass(cell,_7c9);
},resetCellClassForLastColumn:function(cell,_7ca){
if(_7ca){
dojo.addClass(cell,"cell-no-border");
}else{
dojo.removeClass(cell,"cell");
dojo.addClass(cell,"cell-last-col");
}
},addOutcomeCombination:function(_7cb,id){
var _7cc=id.replace("column-id-","");
var _7cd,_7ce,rows,_7cf,_7d0,row,cell,_7d1;
var _7d2=++curam.matrix.Constants.container.matrix.topRight.topRightTop.outcomeCols.getObjectByKey(id).combinationCount;
for(var i=0;i<this.questions.count;i++){
_7cd=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.questions.getObjectByKey("ql-"+this.questions.getObjectByIndex(i).qId);
_7d0=_7cd.ansGroup.getAnswerIds();
_7ce=i==0?true:false;
rows=this.questions.getObjectByIndex(i).outcomeGroup.getObjectByKey("out-"+_7cc+"-"+_7cd.qId).rows;
for(var j=0;j<rows.count;j++){
row=rows.getObjectByIndex(j);
cell=row.cells.getObjectByIndex(row.cells.count-1).node;
_7cf=j==0?true:false;
this.resetCellClassForSecondLastColumn(cell,_7cf);
_7d1=this.addOutcomeCell(_7cc,_7cd.qId,_7d0[j],_7d2,_7ce,_7cf,true);
row.cells.add(_7d1.id,new curam.matrix.OutcomeCell(_7d1));
row.node.appendChild(_7d1);
}
}
return _7d2;
},addButtonClassToFirstRow:function(){
var _7d3,cell,_7d4;
var _7d5=this.questions.getObjectByIndex(0);
if(!_7d5){
return;
}
var _7d6=this.matrix.bottomLeft.bottomLeftMain.questions.getObjectByIndex(0).getAnswer(1);
if(_7d6){
_7d6.adjustFirstRowStyle();
}
if(this.matrix.contradictionsExist){
_7d3=_7d5.contradiction.rows.getObjectByIndex(0).cells;
for(var j=0;j<_7d3.count;j++){
_7d3.getObjectByIndex(j).adjustFirstRowClass();
_7d3.getObjectByIndex(j).setButtonClass("image");
}
}
if(this.matrix.outcomesExist){
for(var i=0;i<_7d5.outcomeGroup.count;i++){
_7d4=_7d5.outcomeGroup.getObjectByIndex(i);
_7d3=_7d4.rows.getObjectByIndex(0).cells;
for(var j=0;j<_7d3.count;j++){
_7d3.getObjectByIndex(j).adjustFirstRowClass();
_7d3.getObjectByIndex(j).setButtonClass("image");
}
}
}
if(this.matrix.priorityExists){
var _7d7=_7d5.priorityGroup.priorities.getObjectByIndex(0);
_7d7.adjustFirstRowClass();
}
if(this.matrix.scoreExists){
var _7d8=_7d5.scoreGroup.scores.getObjectByIndex(0);
_7d8.adjustFirstRowClass();
}
},deletePriorityColumn:function(){
var _7d9;
for(var j=0;j<this.questions.count;j++){
_7d9=this.questions.getObjectByIndex(j);
dojo.destroy(_7d9.priorityGroup.node);
_7d9.priorityGroup=null;
}
},deleteScoreColumn:function(){
var _7da;
for(var j=0;j<this.questions.count;j++){
_7da=this.questions.getObjectByIndex(j);
dojo.destroy(_7da.scoreGroup.node);
_7da.scoreGroup=null;
}
},deleteContradictionColumn:function(){
var _7db;
for(var j=0;j<this.questions.count;j++){
_7db=this.questions.getObjectByIndex(j);
dojo.destroy(_7db.contradiction.node);
_7db.contradiction=null;
}
},deleteOutcomeColumn:function(id){
var _7dc,_7dd,_7de;
for(var j=0;j<this.questions.count;j++){
_7dc=this.questions.getObjectByIndex(j);
_7de="out-"+id+"-"+_7dc.qId;
_7dd=_7dc.outcomeGroup.getObjectByKey(_7de);
dojo.destroy(_7dd.node);
_7dc.outcomeGroup.removeByKey(_7de);
}
},checkIfLastContrCombColumn:function(id){
var _7df=this.questions.getObjectByIndex(0).contradiction.rows.getObjectByIndex(0).cells;
var _7e0=_7df.count;
if(_7df.getIndexByKey(id)==_7e0-1){
return true;
}
return false;
},checkIfLastOutCombColumn:function(_7e1,_7e2){
var _7e3=this.questions.getObjectByIndex(0);
var _7e4="out-"+_7e1+"-"+_7e3.qId;
var _7e5=_7e3.outcomeGroup.getObjectByKey(_7e4).rows.getObjectByIndex(0).cells;
var _7e6=_7e5.count;
if(_7e5.getIndexByKey(_7e2)==_7e6-1){
return true;
}
return false;
},deleteContradictionCombination:function(_7e7,_7e8){
var _7e9,curQ,_7ea,_7eb,_7ec,_7ed;
for(var j=0;j<this.questions.count;j++){
curQ=this.questions.getObjectByIndex(j);
for(var i=0;i<curQ.contradiction.rows.count;i++){
_7ec=i==0?true:false;
_7ea=curQ.contradiction.rows.getObjectByIndex(i);
_7e9=_7ea.node.id.replace("-row-","-cell-");
_7e9+="-"+_7e7;
_7ed=_7ea.cells.getObjectByKey(_7e9);
if(!_7ed){
continue;
}
dojo.destroy(_7ed.node);
_7ea.cells.removeByKey(_7e9);
if(_7e8){
this.resetCellClassForLastColumn(_7ea.cells.getObjectByIndex(_7ea.cells.count-1).node,_7ec);
}
}
}
},deleteOutcomeCombination:function(_7ee,_7ef,_7f0){
var _7f1,curQ,_7f2,_7f3,_7f4,_7f5;
for(var j=0;j<this.questions.count;j++){
curQ=this.questions.getObjectByIndex(j);
_7f2=curQ.outcomeGroup.getObjectByKey("out-"+_7ee+"-"+curQ.qId);
for(var i=0;i<_7f2.rows.count;i++){
_7f5=i==0?true:false;
_7f3=_7f2.rows.getObjectByIndex(i);
_7f1=_7f3.node.id.replace("-row-","-cell-")+"-"+_7ef;
dojo.destroy(_7f3.cells.getObjectByKey(_7f1).node);
_7f3.cells.removeByKey(_7f1);
if(_7f0){
this.resetCellClassForLastColumn(_7f3.cells.getObjectByIndex(_7f3.cells.count-1).node,_7f5);
}
}
}
}});
});
},"dijit/_WidgetBase":function(){
define("dijit/_WidgetBase",["require","dojo/_base/array","dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/ready","dojo/Stateful","dojo/topic","dojo/_base/window","./registry"],function(_7f6,_7f7,_7f8,_7f9,_7fa,_7fb,dom,_7fc,_7fd,_7fe,_7ff,_800,_801,lang,on,_802,_803,_804,win,_805){
var _806=typeof (dojo.global.perf)!="undefined";
if(!_801.isAsync){
_802(0,function(){
var _807=["dijit/_base/manager"];
_7f6(_807);
});
}
var _808={};
function _809(obj){
var ret={};
for(var attr in obj){
ret[attr.toLowerCase()]=true;
}
return ret;
};
function _80a(attr){
return function(val){
_7fc[val?"set":"remove"](this.domNode,attr,val);
this._set(attr,val);
};
};
return _7fb("dijit._WidgetBase",_803,{id:"",_setIdAttr:"domNode",lang:"",_setLangAttr:_80a("lang"),dir:"",_setDirAttr:_80a("dir"),textDir:"","class":"",_setClassAttr:{node:"domNode",type:"class"},style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{},_blankGif:_7f9.blankGif||_7f6.toUrl("dojo/resources/blank.gif"),postscript:function(_80b,_80c){
this.create(_80b,_80c);
},create:function(_80d,_80e){
if(_806){
perf.widgetStartedLoadingCallback();
}
this.srcNodeRef=dom.byId(_80e);
this._connects=[];
this._supportingWidgets=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_80d){
this.params=_80d;
lang.mixin(this,_80d);
}
this.postMixInProperties();
if(!this.id){
this.id=_805.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
_805.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _80f=this.srcNodeRef;
if(_80f&&_80f.parentNode&&this.domNode!==_80f){
_80f.parentNode.replaceChild(this.domNode,_80f);
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
if(_806){
perf.widgetLoadedCallback(this);
}
},_applyAttributes:function(){
var ctor=this.constructor,list=ctor._setterAttrs;
if(!list){
list=(ctor._setterAttrs=[]);
for(var attr in this.attributeMap){
list.push(attr);
}
var _810=ctor.prototype;
for(var _811 in _810){
if(_811 in this.attributeMap){
continue;
}
var _812="_set"+_811.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
})+"Attr";
if(_812 in _810){
list.push(_811);
}
}
}
_7f7.forEach(list,function(attr){
if(this.params&&attr in this.params){
}else{
if(this[attr]){
this.set(attr,this[attr]);
}
}
},this);
for(var _813 in this.params){
this.set(_813,this[_813]);
}
},postMixInProperties:function(){
},buildRendering:function(){
if(!this.domNode){
this.domNode=this.srcNodeRef||_7fe.create("div");
}
if(this.baseClass){
var _814=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_814=_814.concat(_7f7.map(_814,function(name){
return name+"Rtl";
}));
}
_7fd.add(this.domNode,_814);
}
},postCreate:function(){
},startup:function(){
if(this._started){
return;
}
this._started=true;
_7f7.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
},destroyRecursive:function(_815){
this._beingDestroyed=true;
this.destroyDescendants(_815);
this.destroy(_815);
},destroy:function(_816){
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
this.destroyRendering(_816);
_805.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_817){
if(this.bgIframe){
this.bgIframe.destroy(_817);
delete this.bgIframe;
}
if(this.domNode){
if(_817){
_7fc.remove(this.domNode,"widgetId");
}else{
_7fe.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_817){
_7fe.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_818){
_7f7.forEach(this.getChildren(),function(_819){
if(_819.destroyRecursive){
_819.destroyRecursive(_818);
}
});
},uninitialize:function(){
return false;
},_setStyleAttr:function(_81a){
var _81b=this.domNode;
if(lang.isObject(_81a)){
_800.set(_81b,_81a);
}else{
if(_81b.style.cssText){
_81b.style.cssText+="; "+_81a;
}else{
_81b.style.cssText=_81a;
}
}
this._set("style",_81a);
},_attrToDom:function(attr,_81c,_81d){
_81d=arguments.length>=3?_81d:this.attributeMap[attr];
_7f7.forEach(lang.isArray(_81d)?_81d:[_81d],function(_81e){
var _81f=this[_81e.node||_81e||"domNode"];
var type=_81e.type||"attribute";
switch(type){
case "attribute":
if(lang.isFunction(_81c)){
_81c=lang.hitch(this,_81c);
}
var _820=_81e.attribute?_81e.attribute:(/^on[A-Z][a-zA-Z]*$/.test(attr)?attr.toLowerCase():attr);
_7fc.set(_81f,_820,_81c);
break;
case "innerText":
_81f.innerHTML="";
_81f.appendChild(win.doc.createTextNode(_81c));
break;
case "innerHTML":
_81f.innerHTML=_81c;
break;
case "class":
_7fd.replace(_81f,_81c,this[attr]);
break;
}
},this);
},get:function(name){
var _821=this._getAttrNames(name);
return this[_821.g]?this[_821.g]():this[name];
},set:function(name,_822){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _823=this._getAttrNames(name),_824=this[_823.s];
if(lang.isFunction(_824)){
var _825=_824.apply(this,Array.prototype.slice.call(arguments,1));
}else{
var _826=this.focusNode&&!lang.isFunction(this.focusNode)?"focusNode":"domNode",tag=this[_826].tagName,_827=_808[tag]||(_808[tag]=_809(this[_826])),map=name in this.attributeMap?this.attributeMap[name]:_823.s in this?this[_823.s]:((_823.l in _827&&typeof _822!="function")||/^aria-|^data-|^role$/.test(name))?_826:null;
if(map!=null){
this._attrToDom(name,_822,map);
}
this._set(name,_822);
}
return _825||this;
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
});
return (apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr",l:uc.toLowerCase()});
},_set:function(name,_828){
var _829=this[name];
this[name]=_828;
if(this._watchCallbacks&&this._created&&_828!==_829){
this._watchCallbacks(name,_829,_828);
}
},on:function(type,func){
return _7f8.after(this,this._onMap(type),func,true);
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
return this.containerNode?_805.findWidgets(this.containerNode):[];
},getParent:function(){
return _805.getEnclosingWidget(this.domNode.parentNode);
},connect:function(obj,_82a,_82b){
var _82c=_7fa.connect(obj,_82a,this,_82b);
this._connects.push(_82c);
return _82c;
},disconnect:function(_82d){
var i=_7f7.indexOf(this._connects,_82d);
if(i!=-1){
_82d.remove();
this._connects.splice(i,1);
}
},subscribe:function(t,_82e){
var _82f=_804.subscribe(t,lang.hitch(this,_82e));
this._connects.push(_82f);
return _82f;
},unsubscribe:function(_830){
this.disconnect(_830);
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):_7ff.isBodyLtr();
},isFocusable:function(){
return this.focus&&(_800.get(this.domNode,"display")!="none");
},placeAt:function(_831,_832){
if(_831.declaredClass&&_831.addChild){
_831.addChild(this,_832);
}else{
_7fe.place(this.domNode,_831,_832);
}
return this;
},getTextDir:function(text,_833){
return _833;
},applyTextDir:function(){
},defer:function(fcn,_834){
var _835=setTimeout(lang.hitch(this,function(){
_835=null;
if(!this._destroyed){
lang.hitch(this,fcn)();
}
}),_834||0);
return {remove:function(){
if(_835){
clearTimeout(_835);
_835=null;
}
return null;
}};
}});
});
},"curam/util/ScreenContext":function(){
define("curam/util/ScreenContext",[],function(){
var _836={DEFAULT_CONTEXT:112,SAMPLE22:2,SAMPLE21:1,SAMPLE13:4,SAMPLE12:2,SAMPLE11:1,EXTAPP:1048576,CONTEXT_PORTLET:524288,SMART_PANEL:262144,NESTED_UIM:131072,ORG_TREE:65536,CONTEXT_PANEL:32768,LIST_ROW_INLINE_PAGE:8192,LIST_EVEN_ROW:16384,TAB:4096,TREE:2048,AGENDA:1024,POPUP:512,MODAL:256,HOME:128,HEADER:64,NAVIGATOR:32,FOOTER:16,OVAL:8,RESOLVE:4,ACTION:2,ERROR:1,EMPTY:0};
var _837=[["ERROR","ACTION","RESOLVE","OPT_VALIDATION","FOOTER","NAVIGATOR","HEADER","HOME_PAGE","MODAL","POPUP","AGENDA","TREE","TAB","LIST_EVEN_ROW","LIST_ROW_INLINE_PAGE","CONTEXT_PANEL","ORG_TREE","NESTED_UIM","SMART_PANEL","CONTEXT_PORTLET","EXTAPP"],["SAMPLE11","SAMPLE12","SAMPLE13"],["SAMPLE21","SAMPLE22"]];
var _838=dojo.declare("curam.util.ScreenContext",null,{constructor:function(_839){
if(_839){
this.setContext(_839);
}else{
this.currentContext=[_836["DEFAULT_CONTEXT"]|_836["DEFAULT_CONTEXT"]];
}
},setContext:function(_83a){
var tmp=this.setup(_83a);
this.currentContext=((tmp==null)?([_836["DEFAULT_CONTEXT"]|_836["DEFAULT_CONTEXT"]]):(tmp));
},addContextBits:function(_83b,idx){
if(!_83b){
return;
}
var _83c=(idx)?idx:0;
var _83d=this.parseContext(_83b);
if(_83d!=null){
this.currentContext[_83c]|=_83d;
}
return this.currentContext[_83c];
},addAll:function(idx){
var _83e=(idx)?idx:0;
this.currentContext[_83e]=4294967295;
return this.currentContext[_83e];
},clear:function(_83f,idx){
if(!_83f){
this.clearAll();
return;
}
var _840=(idx)?idx:0;
if(_83f==0){
return this.currentContext[_840];
}
var _841=this.parseContext(_83f);
if(_841!=null){
var _842=this.currentContext[_840]&_841;
this.currentContext[_840]^=_842;
}
return this.currentContext[_840];
},clearAll:function(idx){
if(idx){
this.currentContext[idx]=0;
}else{
for(var i=0;i<this.currentContext.length;i++){
this.currentContext[i]=0;
}
}
},updateStates:function(_843){
this.clear("ERROR|ACTION|RESOLVE");
this.currentContext[0]=this.currentContext[0]|(_843&7);
},hasContextBits:function(_844,idx){
if(!_844){
return false;
}
var _845=(idx)?idx:0;
var _846=this.parseContext(_844);
if(_846!=null){
var _847=this.currentContext[_845]&_846;
return (_847==_846);
}
return false;
},getValue:function(){
var _848="";
for(var i=0;i<this.currentContext.length;i++){
_848+=this.currentContext[i]+"|";
}
return _848.substring(0,_848.length-1);
},toRequestString:function(){
return "o3ctx="+this.getValue();
},toBinary:function(){
var _849="";
for(var i=0;i<this.currentContext.length;i++){
_849+=this.currentContext[i].toString(2)+"|";
}
return _849.substring(0,_849.length-1);
},toString:function(){
var _84a="";
for(var i=0;i<this.currentContext.length;i++){
var _84b="";
var j=0;
while(j<_837[i].length){
if(((this.currentContext[i]>>j)&1)!=0){
_84b+=","+_837[i][j];
}
j++;
}
if(_84b==""){
return "{}";
}
_84a+="|"+_84b.replace(",","{")+((_84b.length==0)?"":"}");
}
return _84a.substring(1);
},parseContext:function(_84c){
var _84d=_84c.replace(/,/g,"|");
var _84e=_84d.split("|");
var tmp=isNaN(_84e[0])?parseInt(_836[_84e[0]]):_84e[0];
for(var i=1;i<_84e.length;i++){
tmp=tmp|(isNaN(_84e[i])?parseInt(_836[_84e[i]]):_84e[i]);
}
return (isNaN(tmp)?null:tmp);
},setup:function(_84f){
if(!_84f){
return null;
}
var _850=(""+_84f).split("|");
var _851=new Array(_850.length);
for(var i=0;i<_850.length;i++){
_851[i]=this.parseContext(_850[_850.length-i-1]);
_851[i]=_851[i]|_851[i];
if(!_851[i]||isNaN(_851[i])||_851[i]>4294967295){
return null;
}
}
return _851;
}});
return _838;
});
}}});
define("dojo/decisionMatrix_all",[],1);
