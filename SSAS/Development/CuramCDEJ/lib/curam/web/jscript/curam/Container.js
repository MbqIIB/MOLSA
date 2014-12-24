//>>built
define("curam/Container",["dojo/dom-geometry","curam/util","curam/matrix/TempDivs","curam/StringBuffer","curam/Matrix","curam/matrix/Constants"],function(_1){
curam.matrix.Buttons=function(){
this.node=dojo.byId("buttons");
};
dojo.declare("curam.Container",null,{constructor:function(_2,_3,_4,_5){
this.node=dojo.byId(_2);
this.i18nMsgs=_5;
this.validation={"node":dojo.byId("validation"),"text":dojo.byId("validation-text")};
this.matrixNode=dojo.byId(_3);
this.options=_4;
curam.util.connect(this.node,"onclick",function(_6){
if(_6.target.tagName=="A"&&!_6.target._submitButton){
dojo.stopEvent(_6);
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
var _7=curam.matrix.Constants.container.leftMatrixWidth+100;
var _8=200;
var _9=this.node.parentNode;
var _a=dojo.byId("content");
this.maxHeight=dojo.contentBox(_a).h-100;
this.maxWidth=dojo.contentBox(_9).w;
},setDimensions:function(){
this.setWidth();
this.setHeight();
this.setVisible();
},setHeight:function(){
var _b=_1.getMarginBoxSimple(this.validation.node).h;
if(_b<1){
cm.toggleDisplay(this.validation.node);
_b=_1.getMarginBoxSimple(this.validation.node).h;
cm.toggleDisplay(this.validation.node);
}
_b=Math.max(_b,0);
var _c=dojo.query("> span",this.buttons.node)[0].offsetHeight;
this.height=this.matrix.height+_b+Math.min(_c,20)+5;
this.cssText.append(".matrix-container-eval {height:").append(this.height).append("px;}");
this.matrix.refreshScrollSync();
},setWidth:function(){
this.cssText.append(".matrix-container-eval{width:").append(this.matrix.width).append("px;}");
},setVisible:function(){
this.cssText.append(".matrix-container-eval{visibility:visible;}");
},addCSS:function(){
var _d=this.cssText.toString();
if(!_d){
return;
}
var _e=this.matrix.bottomRight.node.scrollTop;
curam.util.insertCssText(_d,"_container_stylesheet_");
this.matrix.bottomRight.node.scrollTop=_e;
this.cssText=new curam.StringBuffer();
},setLocales:function(){
this.locales=localeList.split(",");
},activateWarning:function(_f,_10){
dojo.style(this.validation.node,"display","block");
cm.setClass(this.validation.text,"active-validation");
this.validation.text.innerHTML=_f;
var _11=Math.max(this.validation.text.clientHeight,20);
dojo.style(this.validation.node,"height",(_11+10)+"px");
dojo.style(this.buttons.node,"display","none");
if(_10){
var _12=this;
setTimeout(function(){
_12.deactivateValidation();
},3000);
}
this.matrix.setValidationActive();
},activateError:function(_13,_14){
dojo.style(this.validation.node,"display","block");
var _15=this.validation.text;
cm.setClass(_15,"active-error");
_15.innerHTML=_13;
var _16=_15.clientHeight;
dojo.style(this.validation.node,"height",_16+10+"px");
dojo.style(this.buttons.node,"display","none");
if(_14){
setTimeout("curam.matrix.Constants.container.deactivateValidation()",3000);
}
},deactivateValidation:function(){
dojo.style(this.validation.node,"display","none");
cm.setClass(this.validation.text,"hidden-validation");
this.validation.text.innerHTML="";
cm.setClass(curam.matrix.Constants.container.validation.node,"validation");
cm.setClass(this.validation.node,"hidden-validation");
var _17=Math.max(this.validation.text.clientHeight,20);
dojo.style(this.validation.node,"height",_17+10+"px");
dojo.style(this.buttons.node,"display","");
this.matrix.setValidationInactive();
},hideValidation:function(){
dojo.style(this.validation.node,"display","none");
},getFakeEvent:function(_18){
var _19=dojo.coords(_18,true);
return {target:_18,pageX:_19.x,pageY:_19.y,isFake:true,stopPropagation:function(){
},preventDefault:function(){
}};
}});
});
