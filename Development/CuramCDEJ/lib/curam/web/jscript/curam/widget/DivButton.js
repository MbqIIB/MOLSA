//>>built
require({cache:{"url:curam/widget/resources/DivButton.html":"<div id=\"${id}\" class=\"${className}\" dojoAttachEvent=\"onclick:onClick\" dojoAttachPoint=\"containerNode\"></div>\r\n\r\n {\r\n      templateString: \"<div id='${id}' class='${className}' \"\r\n            + \"dojoAttachEvent='onclick:onClick' dojoAttachPoint='containerNode'></div>\"\r\n    }\r\n\r\n"}});
define("curam/widget/DivButton",["curam/util","curam/matrix/Constants","dojo/text!curam/widget/resources/DivButton.html","dijit/_Widget","dijit/_Templated"],function(_1,_2,_3){
var _4=dojo.declare("curam.widget.DivButtonBase",dijit._Widget,{isContainer:true,disabled:false,menuId:"",id:"",className:"",postCreate:function(_5,_6){
this.sizeMyself();
dijit.byId(this.menuId).bindDomNode(this.domNode);
_1.connect(this.domNode,"onclick",dojo.hitch(this,this.onClick));
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
var _7=dojo.create("span",{},this.domNode,"before");
}
dojo.body().appendChild(this.domNode);
if(_7){
dojo.place(this.domNode,_7,"before");
dojo.destroy(_7);
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
},_checkValidation:function(_8){
if(_2.container.matrix.isValidationActive()){
if(_8.isShowingNow){
_8.close();
}
return false;
}
return true;
},_setActiveMenu:function(_9){
var _a=dijit.byId(_9);
if(!_a){
return;
}
if(_a.isShowingNow){
this.setActiveMenuId();
}
},_toggleMenu:function(_b,_c){
this._setActiveMenu(_b);
dijit.byId(_b).setButton(this);
}});
var _d=dojo.declare("curam.widget.DivButton",[curam.widget.DivButtonBase,dijit._Templated],{templateString:_3});
dojo.declare("curam.widget.QuestionButton",curam.widget.DivButtonBase,{postCreate:function(){
this.className+="number number-col-eval q-ct-eval-"+this.qId;
_1.connect(this.domNode,"onmouseover",dojo.hitch(this,this.onMouseOver));
this.inherited(arguments);
},onMouseOver:function(_e){
curam.matrix.util.buttonMouseOver(_e);
},_toggleMenu:function(_f,_10){
this._setActiveMenu(_f);
dijit.byId(_f).setButton(this);
},setActiveMenuId:function(){
window.activeMenuID=this.domNode.parentNode.id;
}});
dojo.declare("curam.widget.AnswerButton",curam.widget.DivButtonBase,{className:"image",_toggleMenu:function(_11,_12){
this._setActiveMenu(_11);
var _13=dijit.byId(_11);
var _14=_12.target?_12.target:_12;
if(!_13){
return;
}
if(!this._checkValidation(_13)){
return;
}
_13.setButton(this);
if(_14){
if((!_14.id||!_14.id.indexOf("ans-")==0)&&_14.parentNode&&_14.parentNode.id){
_13.answerId=_14.parentNode.id;
}else{
_13.answerId=_14.id;
}
}else{
_13.answerId=null;
}
},setActiveMenuId:function(){
window.activeMenuID=this.domNode.parentNode.id;
}});
dojo.declare("curam.widget.CombinationButton",curam.widget.DivButtonBase,{className:"image",_toggleMenu:function(_15,_16){
this._setActiveMenu(_15);
dijit.byId(_15).setButton(this);
var _17=_16.target?_16.target:_16;
var _18=dijit.byId(_15);
if(!_18){
return;
}
if(!this._checkValidation(_18)){
return;
}
if(_17){
if(_17.cellId&&_17.cellId.length>0){
_18.combinationId=_17.cellId;
}else{
if(_17.id&&_17.id.length>0&&!dojo.hasClass(_17,"image")){
_18.combinationId=_17.id;
}else{
if(_17.parentNode){
_18.combinationId=_17.parentNode.id;
}else{
_18.combinationId=_17.cellId;
}
}
}
}else{
_18.combinationId=null;
}
}});
dojo.declare("curam.widget.PriorityButton",curam.widget.DivButtonBase,{className:"column-id column-eval pri-col-eval",postCreate:function(){
dojo.attr(this.domNode,"id",this.id);
this.inherited(arguments);
},_toggleMenu:function(_19,_1a){
this._setActiveMenu(_19);
dijit.byId(_19).setButton(this);
}});
dojo.declare("curam.widget.ScoreButton",curam.widget.PriorityButton,{});
return _4;
});
