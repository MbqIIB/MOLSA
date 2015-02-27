//>>built
require({cache:{"url:curam/widget/templates/ScrollingTabController.html":"<div class=\"dijitTabListContainer-${tabPosition} tabStrip-disabled dijitLayoutContainer\">\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerMenuButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_menuBtn\"\r\n\t\t\tdata-dojo-props=\"containerId: '${containerId}', iconClass: 'dijitTabStripMenuIcon',\r\n\t\t\t\t\tdropDownPosition: ['below-alt', 'above-alt']\"\r\n\t\t\tdata-dojo-attach-point=\"_menuBtn\" showLabel=\"false\" title=\"\">&#9660;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_leftBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideLeftIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_leftBtn\" data-dojo-attach-event=\"onClick: doSlideLeft\">&#9664;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_rightBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideRightIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_rightBtn\" data-dojo-attach-event=\"onClick: doSlideRight\">&#9654;</div>\r\n\t<div class='dijitTabListWrapper dijitTabContainerTopNone dijitAlignClient' data-dojo-attach-point='tablistWrapper'>\r\n\t\t<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'\r\n\t\t\t\tdata-dojo-attach-point='containerNode' class='nowrapTabStrip dijitTabContainerTop-tabs'></div>\r\n\t</div>\r\n</div>\r\n\r\n"}});
define("curam/dojo-hacks-uim",["dojo/_base/array","dojo/dom-class","dojo/dom-geometry","dojo/_base/lang","dijit/layout/utils","dojo/dom-style","dojo/_base/kernel","dojo/window","dijit/_CssStateMixin","dijit/layout/ContentPane","dijit/layout/StackContainer","dijit/layout/TabController","dijit/place","dojo/dom","dijit/registry","dojo/text!curam/widget/templates/ScrollingTabController.html","curam/widget/DeferredDropDownButton","curam/debug","curam/tab","curam/util/TabNavigation"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10){
dojo.getMarginBoxSimple=function(_11,_12){
var me=dojo._getMarginExtents(_11,_12||dojo.getComputedStyle(_11));
return {w:_11.offsetWidth+me.w,h:_11.offsetHeight+me.h};
};
(function(){
function _13(_14){
return _14.substring(0,1).toUpperCase()+_14.substring(1);
};
function _15(_16,dim){
var _17=_16.resize?_16.resize(dim):_3.setMarginBox(_16.domNode,dim);
if(_16.fakeWidget){
return;
}
if(_17){
_4.mixin(_16,_17);
}else{
_4.mixin(_16,dojo.getMarginBoxSimple(_16.domNode));
_4.mixin(_16,dim);
}
};
dijit.layout.layoutChildren=function(_18,dim,_19,_1a,_1b){
dim=_4.mixin({},dim);
_2.add(_18,"dijitLayoutContainer");
_19=_1.filter(_19,function(_1c){
return _1c.region!="center"&&_1c.layoutAlign!="client";
}).concat(_1.filter(_19,function(_1d){
return _1d.region=="center"||_1d.layoutAlign=="client";
}));
var _1e={};
_1.forEach(_19,function(_1f){
var elm=_1f.domNode,pos=(_1f.region||_1f.layoutAlign);
if(!pos){
throw new Error("No region setting for "+_1f.id);
}
var _20=elm.style;
_20.left=dim.l+"px";
_20.top=dim.t+"px";
_20.position="absolute";
_2.add(elm,"dijitAlign"+_13(pos));
var _21={};
if(_1a&&_1a==_1f.id){
_21[_1f.region=="top"||_1f.region=="bottom"?"h":"w"]=_1b;
}
if(pos=="top"||pos=="bottom"){
_21.w=dim.w;
_15(_1f,_21);
dim.h-=_1f.h;
if(pos=="top"){
dim.t+=_1f.h;
}else{
_20.top=dim.t+dim.h+"px";
}
}else{
if(pos=="left"||pos=="right"){
_21.h=dim.h;
_15(_1f,_21);
dim.w-=_1f.w;
if(pos=="left"){
dim.l+=_1f.w;
}else{
_20.left=dim.l+dim.w+"px";
}
}else{
if(pos=="client"||pos=="center"){
_15(_1f,dim);
}
}
}
_1e[pos]={w:dim.w,h:dim.h};
});
return _1e;
};
})();
dojo.extend(_9,{_setStateClass:function(){
var _22=this.baseClass.split(" ");
function _23(_24){
_22=_22.concat(_1.map(_22,function(c){
return c+_24;
}),"dijit"+_24);
};
if(!this.isLeftToRight()){
_23("Rtl");
}
var _25=this.checked=="mixed"?"Mixed":(this.checked?"Checked":"");
if(this.checked){
_23(_25);
}
if(this.state){
_23(this.state);
}
if(this.selected){
_23("Selected");
}
if(this.disabled){
_23("Disabled");
}else{
if(this.readOnly){
_23("ReadOnly");
}else{
if(this.active){
_23("Active");
}else{
if(this.hovering){
_23("Hover");
}
}
}
}
if(this.focused){
_23("Focused");
}
var tn=this.stateNode||this.domNode,_26={};
_1.forEach(tn.className.split(" "),function(c){
_26[c]=true;
});
if("_stateClasses" in this){
_1.forEach(this._stateClasses,function(c){
delete _26[c];
});
}
_1.forEach(_22,function(c){
_26[c]=true;
});
var _27=[];
for(var c in _26){
_27.push(c);
}
var cls=_27.join(" ");
if(cls!=tn.className){
tn.className=cls;
}
this._stateClasses=_22;
}});
dojo.extend(_a,{_oldbuildRendering:_a.prototype.buildRendering,buildRendering:function(){
this._oldbuildRendering.apply(this,arguments);
this.domNode.removeAttribute("title");
}});
dojo.extend(_b,{_overideBuildRendering:_b.prototype.buildRendering,buildRendering:function(){
this._overideBuildRendering.apply(this,arguments);
this.containerNode.removeAttribute("role");
}});
dojo.extend(_c,{buttonWidget:"curam.widget._TabButton",_oldStartup:_c.prototype.startup,startup:function(){
this._oldStartup.apply(this,arguments);
this.connect(this,"onAddChild",function(_28,_29){
var _2a=this;
_28.controlButton._curamPageId=_28.id;
_28.controlButton.connect(_28.controlButton,"_setCuramVisibleAttr",function(){
if(_28.controlButton.curamVisible){
var _2b=dojo.map(_2a.getChildren(),function(btn){
return btn._curamPageId;
});
var _2c=curam.tab.getTabWidgetId(curam.tab.getContainerTab(_28.domNode));
var _2d=curam.util.TabNavigation.getInsertIndex(_2c,_2b,_28.id);
_2a.addChild(_28.controlButton,_2d);
}else{
var _2e=_28.controlButton;
if(dojo.indexOf(_2a.getChildren(),_2e)!=-1){
_2a.removeChild(_2e);
}
}
});
});
},onButtonClick:function(_2f){
if(!_2f.controlButton.get("curamDisabled")){
var _30=dijit.byId(this.containerId);
_30.selectChild(_2f);
}
}});
(function(){
function _31(_32,_33,_34,_35){
var _36=_8.getBox();
if(!_32.parentNode||String(_32.parentNode.tagName).toLowerCase()!="body"){
win.body().appendChild(_32);
}
var _37=null;
_1.some(_33,function(_38){
var _39=_38.corner;
var pos=_38.pos;
var _3a=0;
var _3b={w:{"L":_36.l+_36.w-pos.x,"R":pos.x-_36.l,"M":_36.w}[_39.charAt(1)],h:{"T":_36.t+_36.h-pos.y,"B":pos.y-_36.t,"M":_36.h}[_39.charAt(0)]};
if(_34){
var res=_34(_32,_38.aroundCorner,_39,_3b,_35);
_3a=typeof res=="undefined"?0:res;
}
var _3c=_32.style;
var _3d=_3c.display;
var _3e=_3c.visibility;
if(_3c.display=="none"){
_3c.visibility="hidden";
_3c.display="";
}
var mb=_3.getMarginBox(_32);
_3c.display=_3d;
_3c.visibility=_3e;
var _3f={"L":pos.x,"R":pos.x-mb.w,"M":Math.max(_36.l,Math.min(_36.l+_36.w,pos.x+(mb.w>>1))-mb.w)}[_39.charAt(1)],_40={"T":pos.y,"B":pos.y-mb.h,"M":Math.max(_36.t,Math.min(_36.t+_36.h,pos.y+(mb.h>>1))-mb.h)}[_39.charAt(0)],_41=Math.max(_36.l,_3f),_42=Math.max(_36.t,_40),_43=Math.min(_36.l+_36.w,_3f+mb.w),_44=Math.min(_36.t+_36.h,_40+mb.h),_45=_43-_41,_46=_44-_42;
_3a+=(mb.w-_45)+(mb.h-_46);
if(curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm==true){
if((_39.charAt(0)=="T"||_39.charAt(1)=="L")&&_3a>0){
_3a=mb.w+mb.h;
}
}
if(_37==null||_3a<_37.overflow){
_37={corner:_39,aroundCorner:_38.aroundCorner,x:_41,y:_42,w:_45,h:_46,overflow:_3a,spaceAvailable:_3b};
}
return !_3a;
});
if(_37.overflow&&_34){
_34(_32,_37.aroundCorner,_37.corner,_37.spaceAvailable,_35);
}
var l=_3.isBodyLtr(),s=_32.style;
s.top=_37.y+"px";
s[l?"left":"right"]=(l?_37.x:_36.w-_37.x-_37.w)+"px";
s[l?"right":"left"]="auto";
return _37;
};
_d.around=function(_47,_48,_49,_4a,_4b){
var _4c=(typeof _48=="string"||"offsetWidth" in _48)?_3.position(_48,true):_48;
if(_48.parentNode){
var _4d=_6.getComputedStyle(_48).position=="absolute";
var _4e=_48.parentNode;
while(_4e&&_4e.nodeType==1&&_4e.nodeName!="BODY"){
var _4f=_3.position(_4e,true),pcs=_6.getComputedStyle(_4e);
if(/relative|absolute/.test(pcs.position)){
_4d=false;
}
if(!_4d&&/hidden|auto|scroll/.test(pcs.overflow)){
var _50=Math.min(_4c.y+_4c.h,_4f.y+_4f.h);
var _51=Math.min(_4c.x+_4c.w,_4f.x+_4f.w);
_4c.x=Math.max(_4c.x,_4f.x);
_4c.y=Math.max(_4c.y,_4f.y);
_4c.h=_50-_4c.y;
_4c.w=_51-_4c.x;
}
if(pcs.position=="absolute"){
_4d=true;
}
_4e=_4e.parentNode;
}
}
var x=_4c.x,y=_4c.y,_52="w" in _4c?_4c.w:(_4c.w=_4c.width),_53="h" in _4c?_4c.h:(_7.deprecated("place.around: dijit.place.__Rectangle: { x:"+x+", y:"+y+", height:"+_4c.height+", width:"+_52+" } has been deprecated.  Please use { x:"+x+", y:"+y+", h:"+_4c.height+", w:"+_52+" }","","2.0"),_4c.h=_4c.height);
var _54=[];
function _55(_56,_57){
_54.push({aroundCorner:_56,corner:_57,pos:{x:{"L":x,"R":x+_52,"M":x+(_52>>1)}[_56.charAt(1)],y:{"T":y,"B":y+_53,"M":y+(_53>>1)}[_56.charAt(0)]}});
};
_1.forEach(_49,function(pos){
var ltr=_4a;
switch(pos){
case "above-centered":
_55("TM","BM");
break;
case "below-centered":
_55("BM","TM");
break;
case "after-centered":
ltr=!ltr;
case "before-centered":
_55(ltr?"ML":"MR",ltr?"MR":"ML");
break;
case "after":
ltr=!ltr;
case "before":
_55(ltr?"TL":"TR",ltr?"TR":"TL");
_55(ltr?"BL":"BR",ltr?"BR":"BL");
break;
case "below-alt":
ltr=!ltr;
case "below":
_55(ltr?"BL":"BR",ltr?"TL":"TR");
_55(ltr?"BR":"BL",ltr?"TR":"TL");
break;
case "above-alt":
ltr=!ltr;
case "above":
_55(ltr?"TL":"TR",ltr?"BL":"BR");
_55(ltr?"TR":"TL",ltr?"BR":"BL");
break;
default:
_55(pos.aroundCorner,pos.corner);
}
});
var _58=_31(_47,_54,_4b,{w:_52,h:_53});
_58.aroundNodePos=_4c;
return _58;
};
})();
if(typeof (dojo.global.perf)!="undefined"){
require(["dijit/layout/ContentPane"]);
dojo.extend(dijit.layout.ContentPane,{_load:function(){
if(typeof (perf)!="undefined"){
perf.widgetStartedLoadingCallback();
}
this._setContent(this.onDownloadStart(),true);
var _59=this;
var _5a={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(_4.isObject(this.ioArgs)){
_4.mixin(_5a,this.ioArgs);
}
var _5b=(this._xhrDfd=(this.ioMethod||xhr.get)(_5a));
_5b.addCallback(function(_5c){
try{
_59._isDownloaded=true;
_59._setContent(_5c,false);
_59.onDownloadEnd();
}
catch(err){
_59._onError("Content",err);
}
if(typeof (perf)!="undefined"){
perf.widgetLoadedCallback(_59);
}
delete _59._xhrDfd;
return _5c;
});
_5b.addErrback(function(err){
if(!_5b.canceled){
_59._onError("Download",err);
}
delete _59._xhrDfd;
return err;
});
delete this._hrefChanged;
}});
dojo.extend(dijit._WidgetBase,{create:function(_5d,_5e){
if(typeof (perf)!="undefined"){
perf.widgetStartedLoadingCallback();
}
this.srcNodeRef=_e.byId(_5e);
this._connects=[];
this._supportingWidgets=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_5d){
this.params=_5d;
_4.mixin(this,_5d);
}
this.postMixInProperties();
if(!this.id){
this.id=_f.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
_f.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _5f=this.srcNodeRef;
if(_5f&&_5f.parentNode&&this.domNode!==_5f){
_5f.parentNode.replaceChild(this.domNode,_5f);
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
if(typeof (perf)!="undefined"){
perf.widgetLoadedCallback(this);
}
}});
dojo.lastOnLoad=function(_60){
dojo._lastLoader=_60;
};
require(["dojo/ready"],function(_61){
_61.onLoad=function(){
if(isDomReady&&!onLoadRecursiveGuard&&loadQ.length){
onLoadRecursiveGuard=1;
var f=loadQ.shift();
try{
f();
}
finally{
onLoadRecursiveGuard=0;
}
onLoadRecursiveGuard=0;
if(loadQ.length){
requestCompleteSignal(onLoad);
}else{
if(dojo._lastLoader){
dojo._lastLoader();
}
}
}
};
});
}
return {};
});
