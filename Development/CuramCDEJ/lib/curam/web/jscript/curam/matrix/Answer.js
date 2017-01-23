//>>built
define("curam/matrix/Answer",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_1,_2,_3){
_2.provide("curam.matrix.Answer");
_2.require("curam.matrix.Constants");
_2.declare("curam.matrix.Answer",null,{constructor:function(_4,_5,_6){
this.node=_4;
this.id=_4.getAttribute("id");
this.validation=_2.query("> :first-child",this.node)[0];
this.input=_2.query("> :first-child",this.validation)[0];
this.button=cm.nextSibling(this.validation);
this.widgetCreated=false;
this.question=_6;
this.answerType=_5;
},init:function(){
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_CODETABLE||this.answerType==curam.matrix.Constants.ANSWER_TYPE_STRING){
var _7=this.validation.getElementsByTagName("select");
var _8=["onblur","onfocus","onkeypress"];
if(_7&&_7.length>0){
this.select=_7[0];
_8[_8.length]="onchange";
}
_8[_8.length]="onkeyup";
this.input.answer=this;
this.input.question=this.question;
this._addListeners(_8);
this._runInitialValidations([this.input]);
}else{
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
var _9=_2.query("> input",this.validation);
if(_9.length==1){
this.specificValue=_9[0];
this.min=null;
this.max=null;
this.specificValue.answer=this;
this.specificValue.question=this.question;
}else{
this.min=_9[0];
this.max=_9[1];
this.min.answer=this.max.answer=this;
this.min.question=this.max.question=this.question;
this.specificValue=null;
}
this._addListeners();
}else{
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_BOOLEAN){
_2.style(this.button,"display","none");
return;
}
}
}
var _a=this;
curam.matrix.Constants.container.matrix.addLazyWidget(this,"answers");
this.lazyListener=function(_b){
if(!curam.matrix.Constants.container.matrix.createLazyWidgets("answers")){
_2.disconnect(_a.button._conn);
return;
}
if(!_a.widget){
return;
}
_a.widget._toggleMenu("AnswerOptions",cm.nextSibling(_2.query("div",_a.node)[0],"div"));
window.activeMenuID=_a.node.id;
_1.byId("AnswerOptions")._openMyself(curam.matrix.Constants.container.getFakeEvent(_a.widget.domNode));
};
this.button._conn=_2.connect(this.button,"onclick",this,"lazyListener");
},createWidget:function(){
var c=curam.matrix.Constants.container;
if(this.widgetCreated){
return;
}
var _c=this.widget=new curam.widget.AnswerButton({menuId:"AnswerOptions"},this.button);
this.widgetCreated=true;
},getQuestion:function(){
if(!this.question){
var _d=this.id.replace("ans-","");
dId=_d.substring(0,_d.indexOf("-"));
}
return this.question;
},getOptions:function(){
if(!this.input["options"]){
return null;
}
var _e=[];
for(var _f=0;_f<this.input.options.length;_f++){
_e[_f]={value:this.input.options[_f].value,text:this.input.options[_f].text};
}
return _e;
},createSpecificValue:function(){
if(this.specificValue){
return;
}
var _10=this.min.id.replace(".min.",".value.");
var _11=_2.query("div",this.node)[0];
_11.innerHTML="<div class=\"label-specific-value\" title=\""+curam.matrix.Constants.container.i18nMsgs.labelSpecificValue+"\">"+curam.matrix.Constants.container.i18nMsgs.labelSpecificValue+":</div>"+"<input type=\"text\" size=\"4\" title=\""+curam.matrix.Constants.container.i18nMsgs.labelSpecificValue+"\"/>";
this.specificValue=_2.query("input",_11)[0];
this.specificValue.setAttribute("id",_10);
curam.util.connect(this.specificValue,"onfocus",function(){
curam.matrix.Constants.container.matrix.cf(arguments);
});
this.specificValue.answer=this;
this.specificValue.question=this.question;
cm.setClass(this.specificValue,"numeric-input-eval");
this.min=this.max=null;
this._addListeners();
this._runInitialValidations([this.specificValue]);
},_runInitialValidations:function(_12){
var av=curam.matrix.Constants.container.matrix.answerValidator;
for(var i=0;i<_12.length;i++){
var _13={target:_12[i],keyCode:55};
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
av.validateNumericAnswer(_13);
}else{
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_CODETABLE){
av.validateCodetableAnswer(_13);
}else{
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_STRING){
av.validateStringAnswer(_13);
}
}
}
av.checkForError(_13);
av.checkFocus(_13);
}
},_addListeners:function(_14){
var av=curam.matrix.Constants.container.matrix.answerValidator;
var _15=function(e){
av.validateNumericAnswer(e);
};
var _16=function(e){
av.validateCodetableAnswer(e);
};
var _17=function(e){
av.validateStringAnswer(e);
};
var _18=function(e){
av.checkForError(e);
};
var _19=function(e){
av.checkFocus(e);
};
if(arguments.length==0){
_14=["onkeyup","onblur","onfocus","onkeypress"];
}
var fns={"onblur":_18,"onfocus":_19,"onkeypress":curam.matrix.util.numericInputChecker};
var _1a;
if(this.specificValue){
_1a=[this.specificValue];
}else{
if(this.min&&this.max){
_1a=[this.min,this.max];
}else{
if(this.select){
_1a=[this.select];
}else{
if(this.input){
_1a=[this.input];
fns.onkeypress=curam.matrix.util.validationChecker;
}
}
}
}
fns.onchange=this.select?_16:_17;
fns.onkeyup=this.answerType==curam.matrix.Constants.ANSWER_TYPE_NUMERIC?_15:_17;
for(var i=0;i<_1a.length;i++){
for(var j=0;j<_14.length;j++){
curam.util.connect(_1a[i],_14[j],fns[_14[j]]);
}
}
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_CODETABLE){
var _1b=this;
if(_2.isIE7){
curam.util.subscribe("/disableInput",_2.hitch(this.select,function(_1c){
if(!_1c||(_1c&&this!=_1c[0]&&this!=_1c[1])){
this.setAttribute("disabled","true");
_2._setOpacity(this,0.3);
}
}));
curam.util.subscribe("/enableInput",_2.hitch(this.select,function(e){
this.setAttribute("disabled",false);
_2._setOpacity(this,1);
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
var _1d=this.specificValue.id.replace(".value.",".min.");
var _1e=this.specificValue.id.replace(".value.",".max.");
this.specificValue=null;
var _1f=_2.query("div",this.node)[0];
_1f.innerHTML="<div class=\"label-min-max\" title=\""+curam.matrix.Constants.container.i18nMsgs.labelMin+"\">"+curam.matrix.Constants.container.i18nMsgs.labelMin+":</div>"+"<input type=\"text\" size=\"4\" title=\""+curam.matrix.Constants.container.i18nMsgs.labelMin+"\"/> "+"<div class=\"label-min-max\" title=\""+curam.matrix.Constants.container.i18nMsgs.labelMax+"\">"+curam.matrix.Constants.container.i18nMsgs.labelMax+":</div>"+"<input type=\"text\" size=\"4\" title=\""+curam.matrix.Constants.container.i18nMsgs.labelMax+"\"/>";
this.min=_2.query("input",_1f)[0];
this.max=cm.nextSibling(this.min,"INPUT");
cm.setClass(this.min,"numeric-input-eval");
cm.setClass(this.max,"numeric-input-eval");
this.min.setAttribute("id",_1d);
this.min.setAttribute("name",_1d);
this.max.setAttribute("id",_1e);
this.max.setAttribute("name",_1e);
var _20=function(){
curam.matrix.Constants.container.matrix.cf(arguments);
};
curam.util.connect(this.min,"onfocus",_20);
curam.util.connect(this.max,"onfocus",_20);
this.min.answer=this.max.answer=this;
this.min.question=this.max.question=this.question;
this._addListeners();
this._runInitialValidations([this.min,this.max]);
},adjustFirstRowStyle:function(){
var _21=_2.attr(this.node,"class");
if(_21.indexOf("ans-eval-with-menu")==-1){
_21=_21.replace("ans-eval","ans-eval-with-menu");
cm.setClass(this.node,_21);
}
var _22="ans-str-val-eval";
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_CODETABLE){
_22="ans-ct-val";
}else{
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
_22="ans-num-val-eval";
}else{
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_BOOLEAN){
_22="ans-bool-val-eval";
}
}
}
var _23=_2.attr(this.validation,"class");
if(_21.indexOf(_22+"-with-menu")==-1){
_23=_23.replace(_22,_22+"-with-menu");
cm.setClass(this.validation,_23);
}
}});
});
