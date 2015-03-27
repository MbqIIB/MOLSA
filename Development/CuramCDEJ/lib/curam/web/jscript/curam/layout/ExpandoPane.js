//>>built
require({cache:{"url:curam/layout/resources/ExpandoPane.html":"<div class=\"dojoxExpandoPane dojoxExpando${orient} ${startupCls}\">\r\n\t<div dojoAttachPoint=\"titleWrapper\" class=\"dojoxExpandoTitle\">\r\n\t\t<div class=\"dojoxExpandoIcon dojoxExpandoIcon${orient}\" role=\"button\" aria-label=\"${expandIconAlt}\" tabIndex=\"0\" dojoAttachPoint=\"iconNode\" dojoAttachEvent=\"onclick:toggle,onkeypress: enterCheck\"></div>\r\n\t\t<span class=\"dojoxExpandoTitleNode\" dojoAttachPoint=\"titleNode\" title=\"${title}\">${title}</span>\r\n\t</div>\r\n\t<div class=\"dojoxExpandoWrapper\" dojoAttachPoint=\"cwrapper\" dojoAttachEvent=\"ondblclick:_trap\">\r\n\t\t<div class=\"dojoxExpandoContent\" dojoAttachPoint=\"containerNode\"></div>\r\n\t</div>\r\n</div>\r\n"}});
define("curam/layout/ExpandoPane",["curam/smartPanel","dojo/_base/lang","dojo/_base/array","dojo/dom-geometry","dojo/dom-style","dojo/_base/fx","dojo/dom-class","dojo/text!curam/layout/resources/ExpandoPane.html","dojox/layout/ExpandoPane","curam/util/ResourceBundle"],function(_1,_2,_3,_4,_5,_6,_7,_8){
dojo.requireLocalization("curam.application","Debug");
var _9=new curam.util.ResourceBundle("Debug");
var _a=dojo.declare("curam.layout.ExpandoPane",dojox.layout.ExpandoPane,{templateString:_8,startupCls:"",expandIconAlt:"",postMixInProperties:function(){
var _b="",_c=!this.isLeftToRight();
if(this.region){
switch(this.region){
case "trailing":
case "right":
_b=_c?"Left":"Right";
break;
case "leading":
case "left":
_b=_c?"Right":"Left";
break;
case "top":
_b="Top";
break;
case "bottom":
_b="Bottom";
break;
}
this.orient=_b;
}
if(!this.startExpanded){
this.startupCls="dojoxExpandoClosed";
}
this._openWidth=null;
if(!this.startExpanded){
if(this.srcNodeRef&&this.srcNodeRef.style.width){
this._openWidth=dojo.style(this.srcNodeRef,"width");
var _d=this.style;
if(_d&&_d.toLowerCase().indexOf("width")>-1){
var _e=_d.split(";");
var _f;
for(var i=0;i<_e.length;i++){
if(dojo.trim(_e[i]).length==0){
_e.splice(i,1);
i--;
}else{
_f=_e[i].split(":");
if(dojo.trim(_f[0]).toLowerCase()=="width"){
_e.splice(i,1);
i--;
}
}
}
this.style=_e.length>0?_e.join(";")+";":"";
}
}
}
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"ondblclick",this.previewOnDblClick?"preview":"toggle");
if(this.previewOnDblClick){
this.connect(this.getParent(),"_layoutChildren",dojo.hitch(this,function(){
this._isonlypreview=false;
}));
}
},_startupSizes:function(){
this._container=this.getParent();
this._closedSize=this._titleHeight=_4.getMarginBoxSimple(this.titleWrapper).h;
curam.debug.log(_9.getProperty("curam.layout.ExpandoPane.size")+" "+this._closedSize);
if(this.splitter){
var _10=this.id;
_3.forEach(dijit.registry.toArray(),function(w){
if(w&&w.child&&w.child.id==_10){
this.connect(w,"_stopDrag","_afterResize");
}
},this);
}
this._currentSize=_4.getContentBox(this.domNode);
if(this._openWidth){
curam.debug.log(_9.getProperty("curam.layout.ExpandoPane.changing.size.changing")+"currentSize.w "+_9.getProperty("curam.layout.ExpandoPane.changing.size.from")+this._currentSize.w+" "+_9.getProperty("curam.layout.ExpandoPane.changing.size.to")+this._openWidth);
this._currentSize.w=this._openWidth;
}
curam.debug.log("this._currentSize = ",this._currentSize);
this._showSize=this._currentSize[(this._isHorizontal?"h":"w")];
this._setupAnims();
if(this.startExpanded){
this._showing=true;
}else{
this._showing=false;
this._hideWrapper();
}
this._hasSizes=true;
},resize:function(_11){
if(!this._hasSizes){
this._startupSizes(_11);
}
var _12=_4.getMarginBoxSimple(this.domNode);
this._contentBox={w:_11&&"w" in _11?_11.w:_12.w,h:(_11&&"h" in _11?_11.h:_12.h)-this._titleHeight};
_5.set(this.containerNode,"height",this._contentBox.h+"px");
if(_11){
_4.setMarginBox(this.domNode,_11);
}
this._layoutChildren();
},_afterResize:function(e){
var _13=dojox.layout.ExpandoPane.prototype._afterResize;
_13._useMarginBoxSimple=true;
_13.apply(this,arguments);
delete _13._useMarginBoxSimple;
},enterCheck:function(evt){
if(evt.keyCode==13){
this.toggle();
dojo.stopEvent(evt);
}
},toggle:function(){
if(!this._showing){
if(dojo.hasClass(this.domNode,"smart-panel")){
_1.loadSmartPanelIframe();
}
}
this.inherited(arguments);
if(dojo.query(".dijitExpandoPane .dijitAccordionTitle")){
var _14;
dojo.query(".dijitExpandoPane .dijitAccordionTitle").forEach(function(_15){
_14=_15;
});
dojo.addClass(_14,"dijitAccordionTitle-last");
}
},_hideWrapper:function(){
_7.add(this.domNode,"dojoxExpandoClosed");
_5.set(this.cwrapper,{opacity:"0"});
},_showEnd:function(){
_5.set(this.cwrapper,{opacity:0});
_6.anim(this.cwrapper,{opacity:this._isonlypreview?this.previewOpacity:1},227);
_7.remove(this.domNode,"dojoxExpandoClosed");
if(!this._isonlypreview){
setTimeout(_2.hitch(this._container,"layout"),15);
}else{
this._previewShowing=true;
this.resize();
}
}});
return _a;
});
