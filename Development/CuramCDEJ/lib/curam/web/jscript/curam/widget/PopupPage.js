//>>built
define("curam/widget/PopupPage",["dijit","dojo","dojox","dojo/require!curam/widget/PopupWidget"],function(_1,_2,_3){
_2.provide("curam.widget.PopupPage");
_2.require("curam.widget.PopupWidget");
_2.declare("curam.widget.PopupPage",curam.widget.PopupWidget,function(_4,_5){
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
},{widgetType:"PopupPage",url:null,postCreate:function(_7,_8,_9){
curam.widget.PopupWidget.prototype.postCreate.call(this,_7,_8,_9);
var _a=this.domNode.getAttribute("url");
if(_a){
this.url=_a;
}
this.curamDomain=this.domNode.getAttribute("curamDomain");
if(this.curamDomain&&typeof (getPopupProperties)=="function"){
var _b=getPopupProperties(this.curamDomain);
if(_b){
this.url=_b.pageID;
}
}
},init:function(){
if(this._isInitialized){
return;
}
curam.widget.PopupWidget.prototype.init.call(this);
var _c=document.createElement("div");
_2.html.setStyle(_c,"width",this.panewidth);
_2.html.setStyle(_c,"height",this.paneheight);
this.containerNode.appendChild(_c);
this.linkpane=_2.widget.createWidget("dojo:LinkPane",{executeScripts:true,cacheContent:false},_c);
var _d=this;
function _e(_f){
_2.event.connect(_f,"postCreate",function(){
if(_f.focusNode){
_d.focusNode=_f.focusNode;
}
});
};
var _10={resize:function(){
var _11=_d.linkpane.domNode.getElementsByTagName("div")[0];
var _12=_2.html.getMarginBox(_11);
_2.html.setMarginBox(_d.popup.domNode,_12);
_2.html.setMarginBox(_d.linkpane.domNode,_12);
_d.popup.move(_d.domNode);
_2.event.disconnect(_2.widget.manager,"add",_e);
}};
this.linkpane.addOnLoad(_10,"resize");
_2.event.connect(_2.widget.manager,"add",_e);
this.linkpane.setUrl(this.url);
}});
});
