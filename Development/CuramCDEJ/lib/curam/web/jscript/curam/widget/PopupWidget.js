//>>built
define("curam/widget/PopupWidget",["dijit","dojo","dojox"],function(_1,_2,_3){
_2.provide("curam.widget.PopupWidget");
_2.declare("curam.widget.PopupWidget",_2.widget.HtmlWidget,function(_4,_5){
var _6=this;
if(_4){
if(_4.inputId){
this.inputNode=_2.byId(_4.inputId);
}
}
if(_5){
_2.event.browser.addListener(_5,"click",function(){
_6.onIconClick(arguments);
});
}
},{widgetType:"PopupWidget",isContainer:false,panewidth:2,paneheight:2,curamDomain:null,containerToggle:"plain",containerToggleDuration:200,_isInitialized:false,resizer:null,postCreate:function(_7,_8,_9){
var _a=this;
_2.widget.HtmlWidget.prototype.postCreate.call(this,_7,_8,_9);
_2.debug("PopupWidget: in postCreate");
this.curamDomain=this.domNode.getAttribute("curamDomain");
if(this.curamDomain&&typeof (getPopupProperties)=="function"){
var _b=getPopupProperties(this.curamDomain);
if(_b){
this.panewidth=_b.width;
this.paneheight=_b.height;
}
}
_2.event.browser.addListener(this.domNode,"onclick",function(){
_a.onIconClick(arguments);
});
},onIconClick:function(_c){
if(this.disabled){
return;
}
if(!this._isInitialized){
this.init();
}
if(!this.popup.isShowingNow){
this.popup.open(this.domNode,this,this.domNode);
if(this.resizer){
this.resizer();
}
if(this.focusNode){
this.focusNode.focus();
}
}else{
this.popup.close();
}
},init:function(){
if(this._isInitialized){
return;
}
this._isInitialized=true;
var _d=_2.create("div",{},_2.body());
_2.style(_d,"width",this.panewidth);
_2.style(_d,"height",this.paneheight);
this.popup=_2.widget.createWidget("dojo:PopupContainer",{toggle:this.containerToggle,toggleDuration:this.containerToggleDuration},_d);
this.containerNode=this.popup.domNode;
}});
});
