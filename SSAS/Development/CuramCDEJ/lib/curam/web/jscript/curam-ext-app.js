//>>built
require({cache:{"url:dijit/templates/CheckedMenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitemcheckbox\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuItemIcon dijitCheckedMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t<span class=\"dijitCheckedMenuItemIconChar\">&#10003;</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,labelNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&#160;</td>\n</tr>\n","dijit/_base/scroll":function(){
define("dijit/_base/scroll",["dojo/window",".."],function(_1,_2){
_2.scrollIntoView=function(_3,_4){
_1.scrollIntoView(_3,_4);
};
});
},"url:idx/oneui/templates/HoverHelpTooltip.html":"<div class=\"idxOneuiHoverHelpTooltip idxOneuiHoverHelpTooltipLeft\" role=\"dialog\"\r\n\t><div role=\"document\"\r\n\t\t><span data-dojo-attach-point=\"closeButtonNode\" class=\"idxOneuiHoverHelpTooltipCloseIcon\" data-dojo-attach-event=\"ondijitclick: hideOnClickClose\" role=\"button\" tabIndex=\"0\"></span\r\n\t></div\r\n\t><div data-dojo-attach-point=\"outerContainerNode\" class=\"idxOneuiHoverHelpTooltipContainer idxOneuiHoverHelpTooltipContents\"\r\n\t\t><div data-dojo-attach-point=\"containerNode\" role=\"document\" tabindex=0></div\r\n\t\t><a target=\"_blank\" href=\"#updateme\" class=\"idxOneuiHoverHelpTooltipLearnLink\" data-dojo-attach-point=\"learnMoreNode\"><span>${learnMoreLabel}</span></a\r\n\t></div\r\n\t><div class=\"idxOneuiHoverHelpTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\r\n></div>","dijit/_TemplatedMixin":function(){
define("dijit/_TemplatedMixin",["dojo/_base/lang","dojo/touch","./_WidgetBase","dojo/string","dojo/cache","dojo/_base/array","dojo/_base/declare","dojo/dom-construct","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f){
var _10=_b("dijit._TemplatedMixin",null,{templateString:null,templatePath:null,_skipNodeCache:false,_earlyTemplatedStartup:false,constructor:function(){
this._attachPoints=[];
this._attachEvents=[];
},_stringRepl:function(_11){
var _12=this.declaredClass,_13=this;
return _8.substitute(_11,this,function(_14,key){
if(key.charAt(0)=="!"){
_14=_5.getObject(key.substr(1),false,_13);
}
if(typeof _14=="undefined"){
throw new Error(_12+" template:"+key);
}
if(_14==null){
return "";
}
return key.charAt(0)=="!"?_14:_14.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
if(!this.templateString){
this.templateString=_9(this.templatePath,{sanitize:true});
}
var _15=_10.getCachedTemplate(this.templateString,this._skipNodeCache);
var _16;
if(_5.isString(_15)){
_16=_c.toDom(this._stringRepl(_15));
if(_16.nodeType!=1){
throw new Error("Invalid template: "+_15);
}
}else{
_16=_15.cloneNode(true);
}
this.domNode=_16;
this.inherited(arguments);
this._attachTemplateNodes(_16,function(n,p){
return n.getAttribute(p);
});
this._beforeFillContent();
this._fillContent(this.srcNodeRef);
},_beforeFillContent:function(){
},_fillContent:function(_17){
var _18=this.containerNode;
if(_17&&_18){
while(_17.hasChildNodes()){
_18.appendChild(_17.firstChild);
}
}
},_attachTemplateNodes:function(_19,_1a){
var _1b=_5.isArray(_19)?_19:(_19.all||_19.getElementsByTagName("*"));
var x=_5.isArray(_19)?0:-1;
for(;x<_1b.length;x++){
var _1c=(x==-1)?_19:_1b[x];
if(this.widgetsInTemplate&&(_1a(_1c,"dojoType")||_1a(_1c,"data-dojo-type"))){
continue;
}
var _1d=_1a(_1c,"dojoAttachPoint")||_1a(_1c,"data-dojo-attach-point");
if(_1d){
var _1e,_1f=_1d.split(/\s*,\s*/);
while((_1e=_1f.shift())){
if(_5.isArray(this[_1e])){
this[_1e].push(_1c);
}else{
this[_1e]=_1c;
}
this._attachPoints.push(_1e);
}
}
var _20=_1a(_1c,"dojoAttachEvent")||_1a(_1c,"data-dojo-attach-event");
if(_20){
var _21,_22=_20.split(/\s*,\s*/);
var _23=_5.trim;
while((_21=_22.shift())){
if(_21){
var _24=null;
if(_21.indexOf(":")!=-1){
var _25=_21.split(":");
_21=_23(_25[0]);
_24=_23(_25[1]);
}else{
_21=_23(_21);
}
if(!_24){
_24=_21;
}
this._attachEvents.push(this.connect(_1c,_6[_21]||_21,_24));
}
}
}
}
},destroyRendering:function(){
_a.forEach(this._attachPoints,function(_26){
delete this[_26];
},this);
this._attachPoints=[];
_a.forEach(this._attachEvents,this.disconnect,this);
this._attachEvents=[];
this.inherited(arguments);
}});
_10._templateCache={};
_10.getCachedTemplate=function(_27,_28){
var _29=_10._templateCache;
var key=_27;
var _2a=_29[key];
if(_2a){
try{
if(!_2a.ownerDocument||_2a.ownerDocument==_f.doc){
return _2a;
}
}
catch(e){
}
_c.destroy(_2a);
}
_27=_8.trim(_27);
if(_28||_27.match(/\$\{([^\}]+)\}/g)){
return (_29[key]=_27);
}else{
var _2b=_c.toDom(_27);
if(_2b.nodeType!=1){
throw new Error("Invalid template: "+_27);
}
return (_29[key]=_2b);
}
};
if(_d("ie")){
_e.addOnWindowUnload(function(){
var _2c=_10._templateCache;
for(var key in _2c){
var _2d=_2c[key];
if(typeof _2d=="object"){
_c.destroy(_2d);
}
delete _2c[key];
}
});
}
_5.extend(_7,{dojoAttachEvent:"",dojoAttachPoint:""});
return _10;
});
},"url:curam/app/templates/ExternalApplication.html":"<div class=\"app-container\">\r\n  <div class=\"app-container-bc\" \r\n    data-dojo-type=\"dijit/layout/BorderContainer\"\r\n    data-dojo-props=\"gutters:false\"\r\n    data-dojo-attach-point=\"_borderContainer\">\r\n    <div class=\"app-banner\"\r\n      data-dojo-type=\"dojox/layout/ContentPane\"\r\n      data-dojo-props=\"region: 'top'\"\r\n      data-dojo-attach-point=\"_appBanner\" role=\"banner\">\r\n    </div>\r\n    <div id=\"app-nav\"\r\n      data-dojo-type=\"curam/widget/menu/MenuPane\"\r\n      data-dojo-props=\"region: 'leading', startExpanded: false\"\r\n      data-dojo-attach-point=\"_appNav\"\r\n      class=\"leftNavMenu\">\r\n    </div>\r\n\t\t<div id=\"app-content\"\r\n\t\t\tdata-dojo-type=\"curam/widget/containers/TransitionContainer\"\r\n\t\t\tdata-dojo-attach-point=\"_appContentBody\" class=\"mainBody\"\r\n\t\t\tdata-dojo-props='region:\"center\", style : {padding : 0, border : 0}' role=\"main\">\r\n\t\t</div>\r\n  </div>\r\n</div>","curam/util/UimDialog":function(){
define("curam/util/UimDialog",["curam/util/RuntimeContext","curam/util/external","curam/util","curam/define","curam/dialog","curam/util/DialogObject"],function(_2e,_2f){
curam.define.singleton("curam.util.UimDialog",{open:function(_30,_31,_32){
var url=_30+curam.util.makeQueryString(_31);
return this.openUrl(url,_32);
},openUrl:function(url,_33){
var _34=curam.util.getCacheBusterParameter();
var _35=new curam.util.DialogObject(_34);
var _36=null;
if(_33){
_36="width="+_33.width+",height="+_33.height;
}
curam.util.openModalDialog({href:this._addRpu(url)},_36,null,null,_34);
return _35;
},_addRpu:function(url){
var _37=url;
if(curam.tab.inTabbedUI()){
var _38=curam.tab.getContentPanelIframe();
if(_38){
_37=curam.util.setRpu(url,new _2e(_38.contentWindow));
}
}else{
if(_2f.inExternalApp()){
var _39=_2f.getUimParentWindow();
if(_39){
_37=curam.util.setRpu(url,new _2e(_39));
}
}
}
return _37;
},get:function(){
if(curam.dialog._id==null){
throw "Dialog infrastructure not ready.";
}
return new curam.util.DialogObject(null,curam.dialog._id);
},ready:function(_3a){
if(curam.dialog._id==null){
dojo.subscribe("/curam/dialog/ready",_3a);
}else{
_3a();
}
},_getDialogFrameWindow:function(_3b){
var _3c=window.top.dijit.byId(_3b);
return _3c.uimController.getIFrame().contentWindow;
}});
return curam.util.UimDialog;
});
},"curam/util/DialogObject":function(){
define("curam/util/DialogObject",["curam/dialog","curam/util"],function(){
var _3d=dojo.declare("curam.util.DialogObject",null,{_id:null,constructor:function(_3e,id){
if(!id){
var _3f=window.top.dojo.subscribe("/curam/dialog/uim/opened/"+_3e,this,function(_40){
this._id=_40;
window.top.dojo.unsubscribe(_3f);
});
}else{
this._id=id;
}
},registerBeforeCloseHandler:function(_41){
var _42=window.top.dojo.subscribe("/curam/dialog/BeforeClose",this,function(_43){
if(_43==this._id){
_41();
}
window.top.dojo.unsubscribe(_42);
});
},registerOnDisplayHandler:function(_44){
if(curam.dialog._displayed==true){
_44(curam.dialog._size);
}else{
var ut=window.top.dojo.subscribe("/curam/dialog/displayed",this,function(_45,_46){
if(_45==this._id){
_44(_46);
}
window.top.dojo.unsubscribe(ut);
});
}
},close:function(_47,_48,_49){
var win=curam.util.UimDialog._getDialogFrameWindow(this._id);
var _4a=win.curam.dialog.getParentWindow(win);
if(_47&&!_48){
win.curam.dialog.forceParentRefresh();
curam.dialog.doRedirect(_4a,null);
}else{
if(_48){
var _4b=_48;
if(_48.indexOf("Page.do")==-1){
_4b=_48+"Page.do"+curam.util.makeQueryString(_49);
}
curam.dialog.doRedirect(_4a,_4b);
}
}
curam.dialog.closeModalDialog();
}});
return _3d;
});
},"dijit/_CssStateMixin":function(){
define("dijit/_CssStateMixin",["dojo/touch","dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/_base/lang","dojo/_base/window"],function(_4c,_4d,_4e,_4f,_50,win){
return _4e("dijit._CssStateMixin",[],{cssStateNodes:{},hovering:false,active:false,_applyAttributes:function(){
this.inherited(arguments);
_4d.forEach(["onmouseenter","onmouseleave",_4c.press],function(e){
this.connect(this.domNode,e,"_cssMouseEvent");
},this);
_4d.forEach(["disabled","readOnly","checked","selected","focused","state","hovering","active"],function(_51){
this.watch(_51,_50.hitch(this,"_setStateClass"));
},this);
for(var ap in this.cssStateNodes){
this._trackMouseState(this[ap],this.cssStateNodes[ap]);
}
this._setStateClass();
},_cssMouseEvent:function(_52){
if(!this.disabled){
switch(_52.type){
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
var _53=this.connect(win.body(),_4c.release,function(){
this._mouseDown=false;
this._set("active",false);
this.disconnect(_53);
});
break;
}
}
},_setStateClass:function(){
var _54=this.baseClass.split(" ");
function _55(_56){
_54=_54.concat(_4d.map(_54,function(c){
return c+_56;
}),"dijit"+_56);
};
if(!this.isLeftToRight()){
_55("Rtl");
}
var _57=this.checked=="mixed"?"Mixed":(this.checked?"Checked":"");
if(this.checked){
_55(_57);
}
if(this.state){
_55(this.state);
}
if(this.selected){
_55("Selected");
}
if(this.disabled){
_55("Disabled");
}else{
if(this.readOnly){
_55("ReadOnly");
}else{
if(this.active){
_55("Active");
}else{
if(this.hovering){
_55("Hover");
}
}
}
}
if(this.focused){
_55("Focused");
}
var tn=this.stateNode||this.domNode,_58={};
_4d.forEach(tn.className.split(" "),function(c){
_58[c]=true;
});
if("_stateClasses" in this){
_4d.forEach(this._stateClasses,function(c){
delete _58[c];
});
}
_4d.forEach(_54,function(c){
_58[c]=true;
});
var _59=[];
for(var c in _58){
_59.push(c);
}
var cls=_59.join(" ");
if(cls!=tn.className){
tn.className=cls;
}
this._stateClasses=_54;
},_trackMouseState:function(_5a,_5b){
var _5c=false,_5d=false,_5e=false;
var _5f=this,cn=_50.hitch(this,"connect",_5a);
function _60(){
var _61=("disabled" in _5f&&_5f.disabled)||("readonly" in _5f&&_5f.readonly);
_4f.toggle(_5a,_5b+"Hover",_5c&&!_5d&&!_61);
_4f.toggle(_5a,_5b+"Active",_5d&&!_61);
_4f.toggle(_5a,_5b+"Focused",_5e&&!_61);
};
cn("onmouseenter",function(){
_5c=true;
_60();
});
cn("onmouseleave",function(){
_5c=false;
_5d=false;
_60();
});
cn(_4c.press,function(){
_5d=true;
_60();
});
cn(_4c.release,function(){
_5d=false;
_60();
});
cn("onfocus",function(){
_5e=true;
_60();
});
cn("onblur",function(){
_5e=false;
_60();
});
this.watch("disabled",_60);
this.watch("readOnly",_60);
}});
});
},"curam/app/ExternalApplication":function(){
require({cache:{"url:curam/app/templates/ExternalApplication.html":"<div class=\"app-container\">\r\n  <div class=\"app-container-bc\" \r\n    data-dojo-type=\"dijit/layout/BorderContainer\"\r\n    data-dojo-props=\"gutters:false\"\r\n    data-dojo-attach-point=\"_borderContainer\">\r\n    <div class=\"app-banner\"\r\n      data-dojo-type=\"dojox/layout/ContentPane\"\r\n      data-dojo-props=\"region: 'top'\"\r\n      data-dojo-attach-point=\"_appBanner\" role=\"banner\">\r\n    </div>\r\n    <div id=\"app-nav\"\r\n      data-dojo-type=\"curam/widget/menu/MenuPane\"\r\n      data-dojo-props=\"region: 'leading', startExpanded: false\"\r\n      data-dojo-attach-point=\"_appNav\"\r\n      class=\"leftNavMenu\">\r\n    </div>\r\n\t\t<div id=\"app-content\"\r\n\t\t\tdata-dojo-type=\"curam/widget/containers/TransitionContainer\"\r\n\t\t\tdata-dojo-attach-point=\"_appContentBody\" class=\"mainBody\"\r\n\t\t\tdata-dojo-props='region:\"center\", style : {padding : 0, border : 0}' role=\"main\">\r\n\t\t</div>\r\n  </div>\r\n</div>"}});
define("curam/app/ExternalApplication",["dojo/_base/declare","dojo/_base/lang","dojo/_base/window","dojo/aspect","dojo/dom-attr","dojo/query","dojo/dom-geometry","dojo/dom","dijit/_Widget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/form/Button","dojo/text!./templates/ExternalApplication.html","curam/util/UIMFragment","dojo/dom-class","dojo/dom-style","curam/ui/ClientDataAccessor","curam/widget/containers/TransitionContainer","dojo/on","curam/widget/menu/MenuPane","dijit/CheckedMenuItem","dojo/fx","dijit/focus","idx/oneui/MenuBar","idx/oneui/Menu","idx/oneui/Header","idx/oneui/MenuDialog","idx/oneui/MenuHeading","idx/oneui/HoverHelpTooltip","dijit/PopupMenuBarItem","dijit/MenuItem","dijit/form/ComboButton","curam/widget/menu/BannerMenuItem","curam/util/SessionTimeout","curam/util/ui/AppExitConfirmation"],function(_62,_63,win,_64,_65,_66,_67,dom,_68,_69,_6a,_6b,_6c,_6d,_6e,_6f,_70,_71,_72,_73,_74,_75,_76,fx,_77){
return _62("curam.app.ExternalApplication",[_68,_69,_6a],{started:false,templateString:_6e,widgetsInTemplate:true,baseClass:"curamApp",_appConfig:null,_initializedNavBarID:null,guardAgainstLeaving:null,postMixInProperties:function(){
this.inherited(arguments);
},startup:function(){
this.inherited(arguments);
this._init();
this._setupUserLeavingGuard();
},_isNavBarItem:function(_78){
return (this._appConfig.map[_78]!=null);
},_init:function(){
var da=new _72();
da.getRaw("/config/tablayout/extapp["+curam.config.appID+"]",_63.hitch(this,function(_79){
console.log("External App config data:"+_79);
this._appConfig=_79;
this._postDataLoadInit();
}),function(_7a,_7b){
console.log("External App config data load error:"+_7a);
},null);
_64.before(dijit.popup,"open",this._evenOutMenuRows,true);
_64.after(dijit.popup,"open",_63.hitch(this,"_animateMenuOpen"),true);
_64.after(dijit.popup,"close",_63.hitch(this,"_animateMenuClose"),true);
this._bannerResizeTimer=null;
dojo.connect(window,"resize",dojo.hitch(this,function(){
if(this._bannerResizeTimer){
clearTimeout(this._bannerResizeTimer);
}
this._bannerResizeTimer=setTimeout(this._handleBannerResize,400);
}));
},_setupUserLeavingGuard:function(){
if(this.guardAgainstLeaving){
curam.util.ui.AppExitConfirmation.install();
}
},_checkSessionExpired:function(){
if(this._appConfig!=null){
var _7c=this._appConfig.timeoutWarning;
if(_7c){
var _7d=_7c.width;
var _7e=_7c.height;
var _7f=_7c.timeout;
var _80=_7c.bufferingPeriod;
curam.util.SessionTimeout.checkSessionExpired(_7d,_7e,_7f,_80);
}
}
},_loadLandingPage:function(_81){
if(curam.config.landingPage){
this._displayOnlyBodyContent({pageID:curam.config.landingPage});
}else{
throw "ERROR: Landing page not set correctly: "+curam.config.landingPage;
}
},_loadBanner:function(){
_6f.get({url:"CDEJ/extapp/application-banner-fragment.jspx",targetID:this._appBanner.id,onLoad:_63.hitch(this,this._initializeBannerLandingPageLink)});
},_reloadBanner:function(){
if(dijit.byId("MMMenuID")){
dijit.byId("MMMenuID").destroy();
}
if(dijit.byId("appMegaMenu")){
dijit.byId("appMegaMenu").destroy();
}
if(dijit.byId("appHelpMenu")){
dijit.byId("appHelpMenu").destroy();
}
if(dijit.byId("appBannerPrintMenu")){
dijit.byId("appBannerPrintMenu").destroy();
}
this._loadBanner();
},_initializeBannerLandingPageLink:function(_82){
var _83=_66(".idxHeaderPrimaryTitle",_82.domNode)[0];
if(!_83){
throw "Landing Page link not initialized, title node cannot be found";
}
var _84=_63.hitch(this,"_loadLandingPage");
dojo.connect(_83,"onclick",function(){
_84();
});
},_animateMenuOpen:function(_85){
var _86=dojo.byId(_85.popup._popupWrapper.id);
if(_65.get(_86,"dijitpopupparent")!=="appMegaMenu"&!_70.contains(_86,"oneuiHeaderGlobalActionsMenu_help")){
return;
}
if(!_86.aniTable){
_86.aniTable=dojo.query("table",_86)[0];
}
if(!_86.inAnimation){
_86.inAnimation=false;
}
if(!_86.isShown){
_86.isShown=false;
}
if(_86.inAnimation){
if(dijit.byId("appHelpMenu")===_85.popup){
if(_85.popup.shouldNotClose){
_85.popup.shouldNotClose=false;
_85.popup.cancelClose=true;
return;
}
}
_86.fx&&_86.fx.stop();
_86.inAnimation=false;
_86.isShown=false;
_71.set(_86,"display","none");
}
if(!_86.isShown&&!_86.inAnimation){
dojo.style(_86,"display","none");
dojo.style(_86.aniTable,"opacity","0");
}
var _87=function(){
_86.inAnimation=true;
_86.isShown=false;
if(dijit.byId("appHelpMenu")===_85.popup){
_85.popup.shouldNotClose=_85.popup.shouldNotClose?false:true;
_85.popup.justClosed=false;
}
};
var _88=function(){
dojo.style(_86.aniTable,"opacity","1");
_86.inAnimation=false;
_86.isShown=true;
var _89=dojo.marginBox(_86).h;
var _8a=dojo.window.getBox().h-65-20;
if(_8a<_89){
_71.set(_86,"height",_8a+"px");
_71.set(_86,"border-bottom","1px solid black");
}
};
this._animateMenu(_86,_86.aniTable,"open",_87,_88);
},_animateMenuClose:function(_8b){
var _8c=dojo.byId(_8b._popupWrapper.id);
if(_65.get(_8c,"dijitpopupparent")!=="appMegaMenu"&!_70.contains(_8c,"oneuiHeaderGlobalActionsMenu_help")){
return;
}
if(dijit.byId("appHelpMenu")===_8b){
if(_8b.cancelClose){
_8b.cancelClose=false;
return;
}else{
if(_8b.justClosed){
_8b.justClosed=false;
return;
}
}
}
if(!_8c.aniTable){
_8c.aniTable=dojo.query("table",_8c)[0];
}
if(_8c.inAnimation){
_8c.fx&&_8c.fx.stop();
_8c.inAnimation=false;
_8c.isShown=false;
dojo.style(_8c.aniTable,"opacity","1");
}
_71.set(_8c,"display","block");
var _8d=function(){
_8c.inAnimation=true;
_8c.isShown=true;
};
var _8e=function(){
_8c.inAnimation=false;
_8c.isShown=false;
_71.set(_8c,"display","none");
_71.set(_8c,"border-bottom","");
if(dijit.byId("appHelpMenu")===_8b){
_8b.shouldNotClose=false;
_8b.justClosed=true;
}
};
this._animateMenu(_8c,_8c.aniTable,"close",_8d,_8e);
},_animateMenu:function(_8f,_90,_91,_92,_93){
var _94=300;
var _95=[];
var _96=fx.wipeIn({node:_8f,duration:_94});
var _97=dojo.fadeIn({node:_90,duration:_94});
var _98=fx.wipeOut({node:_8f,duration:_94});
var _99=dojo.fadeOut({node:_90,duration:_94});
if(_91==="open"){
_95.push(_96);
_95.push(_97);
}else{
_95.push(_99);
_95.push(_98);
}
_8f.fx=fx.chain(_95);
dojo.connect(_8f.fx,"onBegin",_92);
dojo.connect(_8f.fx,"onEnd",_93);
_8f.fx.play();
},_evenOutMenuRows:function(_9a){
var _9b=dojo.byId(_9a.popup.id);
var _9c=_9a.parent?_9a.parent.id:_9a.popup.id;
if(_9c!=="appMegaMenu"&_9c!=="appHelpMenu"){
return;
}
var _9d,_9e;
if(_9c==="appMegaMenu"){
_9d="MMItemContainerRow";
_9e="MMItemContainer";
}else{
_9d="HMItemContainerRow";
_9e="HMItemContainer";
}
var _9f=dojo.query("div."+_9e,_9b);
var _a0=_9a.popup._popupWrapper?_9a.popup._popupWrapper:_9b;
_71.set(_a0,"display","block");
var _a1=_9f.length;
var _a2=_a1<6?1:Math.ceil(_a1/3);
var _a3=[];
for(var i=0;i<_a2;i++){
_a3[i]=0;
}
for(var _a4=0;_a4<_a2;_a4++){
dojo.forEach(_9f,function(_a5,_a6){
_71.set(_a5,"height","auto");
if(_a4===0&&!_70.contains(_a5,"iconSetOUI")){
var _a7=_a5;
while(!_70.contains(_a7,"menuItemClassOUI")){
_a7=_a7.parentNode;
}
_a7=dojo.query("td.dijitMenuItemIconCell",_a7)[0];
if(_a2===1){
_71.set(_a7,"width","50px");
}else{
_71.set(_a7,"width","34px");
}
_70.add(_a5,"iconSetOUI");
}
var _a8=_71.get(_a5,"height");
if(_70.contains(_a5,_9d+_a4)){
if(_a8>_a3[_a4]){
_a3[_a4]=_a8;
}
}
});
}
_71.set(_a0,"display","none");
for(var i=0;i<_a2;i++){
dojo.forEach(_9f,function(_a9,_aa){
if(_70.contains(_a9,_9d+i)){
_71.set(_a9,"height",_a3[i]+"px");
}
});
}
},_handleBannerResize:function(_ab){
var pos=dojo.position;
var box=dojo.marginBox;
CuramExternalApp._oneuiBanner=_ab||CuramExternalApp._oneuiBanner;
currentBanner=CuramExternalApp._oneuiBanner;
var _ac=dojo.query(".idxHeaderPrimaryTitleContainer",currentBanner._globalActionsNode)[0];
var _ad=currentBanner._helpNode?true:false;
var _ae=currentBanner.userNode?true:false;
var _af=currentBanner.navigation?true:false;
var _b0=currentBanner.logoExists;
var _b1=currentBanner._settingsNode?true:false;
if(_b1){
if(_65.get(currentBanner._settingsNode,"title")){
_65.set(currentBanner._settingsNode,"title",CuramExternalApp._appConfig.printMenuLabel);
}
if(_65.get(currentBanner._settingsNode,"alt")){
_65.set(currentBanner._settingsNode,"alt",CuramExternalApp._appConfig.printMenuLabel);
}
}
var _b2=_ad?pos(currentBanner._helpNode).x:885;
var _b3=_b2-box(_ac).w;
if(_ae){
var _b4=currentBanner.userNode;
var _b5=currentBanner.userTextNode;
_71.set(_b5,"width","");
var _b6=box(_b4).w;
var _b7=box(_b5).w;
}
if(_af){
var _b8=currentBanner.navigation.domNode;
var _b9=dojo.query("span[id*=text]",_b8)[0];
_71.set(_b9,"width","");
var _ba=box(_b8).w;
var _bb=box(_b9).w;
}
if(_b1){
var _bc=currentBanner._settingsNode;
var _bd=dojo.query("span[id*=text]",_bc)[0];
var _be=box(_bc).w;
}
var _bf=_b3;
_bf-=_af?(_ba-_bb):0;
_bf-=_ae?(_b6-_b7):0;
_bf-=_b1?_be:0;
var _c0=_bf;
_c0-=_af?_bb:0;
_c0-=_ae?_b7:0;
_c0-=_b1?_be:0;
if(_c0<0){
if(_af&_ae){
var _c1=_bf/2;
var _c2;
if(_b7<_c1){
_c2=_bf-_b7;
_71.set(_b9,"width",_c2+"px");
}else{
if(_bb<_c1){
_c2=_bf-_bb;
_71.set(_b5,"width",_c2+"px");
}else{
_71.set(_b5,"width",_c1+"px");
_71.set(_b9,"width",_c1+"px");
}
}
}else{
if(_af&_b1){
var _c1=_bf/2;
var _c2;
if(_be<_c1){
_c2=_bf-_be;
_71.set(_b9,"width",_c2+"px");
}else{
if(_bb<_c1){
_c2=_bf-_bb;
_71.set(_bc,"width",_c2+"px");
}else{
_71.set(_bc,"width",_c1+"px");
_71.set(_b9,"width",_c1+"px");
}
}
}else{
if(_af){
_71.set(_b9,"width",_bf+"px");
}else{
_71.set(_b5,"width",_bf+"px");
}
}
}
}
if(_af){
var _c3=0;
_c3+=_b0?box(dojo.query(".idxHeaderLogoBox",currentBanner._globalActionsNode)[0]).w:0;
_c3+=_ae?box(_b4).w:0;
_c3+=_ad?box(currentBanner._helpNode).w:0;
_c3+=_b1?box(currentBanner._settingsNode).w:0;
_71.set(_b8,"right",_c3+"px");
}
},_postDataLoadInit:function(){
this._appContentBody._doResourceLookUp=_63.hitch(this,this._doResourceLookUpForMainBody);
this._appNav._onSelectAfter=_63.hitch(this,function(_c4){
this._appContentBody.set("displayPanel",_c4);
});
this._makeNavBarAccessible();
this._loadBanner();
this._loadLandingPage();
},_initNavBar:function(_c5,_c6){
var _c7=this._appConfig.map[_c5];
if(typeof (_c7)=="undefined"||_c7==this._initializedNavBarID){
_c6();
return;
}
var da=new _72();
da.getRaw("/config/tablayout/extnav["+curam.config.appID+"]["+_c7+"]",_63.hitch(this,function(_c8){
console.log("External App config data:"+_c8);
this._loadMenuItems(_c8.navItems,_c8.navBarPixelWidth);
_c6();
this._initializedNavBarID=_c7;
}),function(_c9,_ca){
console.log("External App navigation config data load error:"+_c9);
},null);
},_makeNavBarAccessible:function(){
var _cb=dojo.query(".idxOneuiHoverCardCloseIcon")[0];
if(_cb){
_65.set(_cb,"tabindex",-1);
_65.set(_cb,"aria-label",this._appConfig.hoverCardCloseButtonLabel);
}
var _cc=dijit.byId("navOverflowButton");
_cc._setLabelAttr(this._appConfig.navOverflowButtonLabel);
},_loadMenuItems:function(_cd,_ce){
var _cf=[];
this._appNav.set("width",_ce);
for(var i=0;i<_cd.length;i++){
var _d0=_cd[i];
var _d1={id:_d0.pageID,label:_d0.title,selected:false,iconPath:_d0.iconPath,subPageIds:_d0.subPageIds,iconClass:"whoKnow"};
_cf.push(_d1);
}
this._appNav.addMenuItems(_cf);
},megaMenuClick:function(_d2){
if(typeof (_d2.displayNavBar)=="undefined"){
_d2.displayNavBar=false;
}
this.displayContent(_d2);
},displayContent:function(_d3){
if(_d3!=null){
_d3.forceRefresh=true;
if(_d3.displayNavBar==false){
this._displayOnlyBodyContent(_d3);
return;
}
if(_d3.displayNavBar==true){
this._displayNavMenuAndBodyContent(_d3);
return;
}
if(_d3.pageID==curam.config.landingPage){
this._displayOnlyBodyContent(_d3);
return;
}
if(this._isNavBarItem(_d3.pageID)){
this._displayNavMenuAndBodyContent(_d3);
return;
}else{
if(this._appNav._showing){
this._displayNavMenuAndBodyContent(_d3);
return;
}else{
this._displayOnlyBodyContent(_d3);
return;
}
}
}
},_displayOnlyBodyContent:function(_d4){
if(this._appNav._showing){
var _d5=this.connect(this._appContentBody,"_panelFadeOutComplete",_63.hitch(this,function(){
_d5.remove();
var _d6=this.connect(this._appNav,"_onHideComplete",_63.hitch(this,function(){
this._appNav.deselect();
_d6.remove();
_d4.key=_d4.pageID;
this._appContentBody.set("displayPanel",_d4);
}));
this._appNav.fadeOut();
}));
this._appContentBody.fadeOutDisplay();
}else{
_d4.key=_d4.pageID;
this._appContentBody.set("displayPanel",_d4);
}
},_displayNavMenuAndBodyContent:function(_d7){
_d7.key=_d7.pageID;
if(_d7.param==null){
_d7.param=[];
}
_d7.exceptionButtonFound=false;
if(this._appNav._showing){
this._appNav.setSelectedButton(_d7);
}else{
var _d8=this.connect(this._appContentBody,"_panelFadeOutComplete",_63.hitch(this,function(){
_d8.remove();
var _d9=this.connect(this._appNav,"_onShowComplete",_63.hitch(this,function(){
_d9.remove();
this._appNav.setSelectedButton(_d7);
}));
this._appNav.fadeIn();
}));
this._appContentBody.fadeOutDisplay();
}
},_doResourceLookUpForMainBody:function(_da,_db,_dc){
var uri;
if(_da.key){
if(this._isUIMFragment(_da.key)){
uri=jsL+"/"+_da.key+"Page.do?"+this._addCDEJParameters();
}else{
uri=jsL+"/UIMIFrameWrapperPage.do?uimPageID="+_da.key+"&"+this._addCDEJParameters();
}
}else{
if(_da.url){
uri=_da.url;
}
}
return uri;
},_addCDEJParameters:function(){
return jsScreenContext.toRequestString();
},updateMainContentIframe:function(_dd){
var _de=dojo.query("iframe",this.domNode)[0];
if(_de){
_de.contentWindow.location.href=_dd;
}
},_isUIMFragment:function(_df){
return (this._appConfig&&this._appConfig.uimFragRegistry[_df]!=null);
},_setupUserMenuLinking:function(_e0,_e1){
dojo.connect(_e0,"onclick",_63.partial(function(_e2,evt){
var _e3=dojo.byId("curam-extapp_userMenuArrow");
if(evt.target!=_e3){
displayContent(_e2);
}
},_e1));
dojo.connect(_e0,"onkeypress",function(evt){
if(evt.charOrCode===dojo.keys.ENTER){
dojo.stopEvent(evt);
displayContent(_e1);
}
});
},_makeUserMenuAccessible:function(_e4,_e5){
_65.set(_e5,"tabindex","3");
_65.set(_e5,"title",_e5.innerText);
_65.set(_e5,"role","link");
var _e6=dojo.query(".idxHeaderDropDownArrow",_e4)[0];
_65.set(_e6,"tabindex","4");
_65.set(_e6,"role","button");
_65.set(_e6,"title",_e5.innerText);
this._handleUserImageHighContrast(_e4);
},_handleUserImageHighContrast:function(_e7){
var _e8=dojo.query(".idxHeaderUserIcon",_e7)[1];
if(_e8){
var _e9=win.body();
if(_e9&&_70.contains(_e9,"high-contrast")){
_e8.src="servlet/PathResolver?r=i&p=/config/tablayout/image[banner_hom_normal.png]";
_74(_e8,"mouseover",function(){
_e8.src="servlet/PathResolver?r=i&p=/config/tablayout/image[banner_home_roll.png]";
});
_74(_e8,"click",function(){
_e8.src="servlet/PathResolver?r=i&p=/config/tablayout/image[banner_home_click.png]";
});
_74(_e8,"mouseout",function(){
_e8.src="servlet/PathResolver?r=i&p=/config/tablayout/image[banner_hom_normal.png]";
});
}
}
},_makeMegaMenuAccessible:function(_ea){
var _eb=dojo.query("span[id*=text]",_ea.domNode)[0];
_65.set(_eb,"title",_eb.innerText);
},_makeHelpMenuAccessible:function(_ec){
_65.set(_ec,"tabindex","6");
_65.set(_ec,"role","button");
dojo.connect(_ec,"onkeydown",function(evt){
if(evt.keyCode===dojo.keys.ENTER){
dojo.stopEvent(evt);
dijit.byId("appHelpMenu")._scheduleOpen(evt.target);
}
});
},_makePrintMenuAccessible:function(_ed){
var _ee=_ed._settingsNode;
_65.set(_ee,"tabindex","5");
_65.set(_ee,"role","button");
dojo.connect(_ee,"onkeydown",function(evt){
if(evt.keyCode===dojo.keys.ENTER){
dojo.stopEvent(evt);
dijit.byId("appBannerPrintMenu")._scheduleOpen(evt.target);
}
});
},_setupUserMenuHoverCard:function(_ef){
_64.after(idx.oneui.Header.prototype,"_renderUser",function(){
_70.add(this.userNode,"idxHeaderDropDown");
var _f0=dojo.query(".idxHeaderDropDownArrow",this.userNode)[0];
_f0.id="curam-extapp_userMenuArrow";
if(dojo.isIE!==7){
_65.set(_f0,"onmouseover","idx.oneui.HoverHelpTooltip.defaultPosition=['below']");
_65.set(_f0,"onkeypress","idx.oneui.HoverHelpTooltip.defaultPosition=['below']");
}else{
dojo.connect(_f0,"onclick",idx.oneui.HoverHelpTooltip.defaultPosition=["below"]);
}
});
if(dojo.isIE!==7){
_64.before(idx.oneui.HoverHelpTooltip,"show",function(){
var _f1=dojo.byId("curam-extapp_userMenuArrow");
_71.set(_f1,{"position":"fixed","top":"30px","right":"21px"});
});
_64.after(idx.oneui.HoverHelpTooltip,"show",function(){
_71.set(dojo.byId("curam-extapp_userMenuArrow"),"position","static");
});
_64.after(_ef,"onShow",_63.partial(function(_f2){
var _f3="idx_oneui__MasterHoverHelpTooltip_0";
if(_f2.lastIndexOf("_")!=-1){
_f3="idx_oneui__MasterHoverHelpTooltip_"+_f2.slice(_f2.lastIndexOf("_")+1);
}
var _f4=CuramExternalApp._oneuiBanner;
var _f5=_f4._helpNode?true:false;
var _f6=_f4._settingsNode?true:false;
var _f7=_f4.logoExists;
var _f8=0;
_f8+=_f7?_67.getMarginBox(_66(".idxHeaderLogoBox",_f4._globalActionsNode)[0]).w:0;
_f8+=_f5?_67.getMarginBox(_f4._helpNode).w:0;
_f8+=_f6?_67.getMarginBox(_f4._settingsNode).w:0;
_f8+=_67.getContentBox(_66(".idxHeaderDropDownArrow",_f4.userNode)[0]).w/2;
_71.set(dom.byId(_f3),{"left":"auto","right":_f8+"px"});
},_ef.id));
}
},_addHelpMenuCustomClass:function(){
var _f9=dijit.byId("appHelpMenu")._popupWrapper;
if(!_70.contains(_f9,"oneuiHeaderGlobalActionsMenu_help")){
_70.add(_f9,"oneuiHeaderGlobalActionsMenu_help");
}
},displayMegaMenuItemInModal:function(_fa){
console.log(_fa);
},_preventJAWSCrashClick:function(_fb){
var _fc=dojo.query("#"+_fb.id+"_text",_fb)[0];
if(!_fc.isModified){
dojo.query(".wtfoneui",_fc).forEach(function(_fd){
_fd.oldInnerText=_fd.innerText;
if(_70.contains(_fd,"MMtitle")){
_fd.innerText=_fd.innerText.substring(0,229).concat("...");
}else{
var _fe=_fd.previousSibling;
while(!_70.contains(_fe,"MMtitle")){
_fe=_fe.previousSibling;
}
_fe=_fe.innerText.length;
var _ff=Math.min(250-_fe,Math.max(10,_fd.innerText.length-_fe));
_fd.innerText=_fd.innerText.substring(0,_ff).concat("...");
}
});
_fc.isModified=true;
_fc.innerModdedTimer&&clearTimeout(_fc.innerModdedTimer);
_fc.innerModdedTimer=setTimeout(dojo.partial(function(_100){
if(_fc.isModified){
dojo.query(".wtfoneui",_fc).forEach(function(_101){
_101.innerText=_101.oldInnerText;
});
_fc.isModified=false;
_fc["innerModdedTimer"]=undefined;
try{
delete _fc.innerModdedTimer;
}
catch(e){
}
}
},_fb),2);
}
},_preventJAWSCrashFocus:function(_102){
var _103=dojo.query("#"+_102.id+"_text",_102)[0];
if(!_103.isModified){
dojo.query(".wtfoneui",_103).forEach(function(_104){
_104.oldInnerText=_104.innerText;
if(_70.contains(_104,"MMtitle")){
_104.innerText=_104.innerText.substring(0,229).concat("...");
}else{
var _105=_104.previousSibling;
while(!_70.contains(_105,"MMtitle")){
_105=_105.previousSibling;
}
_105=_105.innerText.length;
var _106=Math.min(250-_105,Math.max(10,_104.innerText.length-_105));
_104.innerText=_104.innerText.substring(0,_106).concat("...");
}
});
_103.isModified=true;
_103.innerModdedTimer&&clearTimeout(_103.innerModdedTimer);
_103.innerModdedTimer=setTimeout(dojo.partial(function(_107){
if(_103.isModified){
dojo.query(".wtfoneui",_103).forEach(function(_108){
_108.innerText=_108.oldInnerText;
});
_103.isModified=false;
_103["innerModdedTimer"]=undefined;
try{
delete _103.innerModdedTimer;
}
catch(e){
}
}
},_102),2);
}
},_preventJAWSCrashBlur:function(_109){
var _10a=dojo.query("#"+_109.id+"_text",_109)[0];
_10a.innerModdedTimer&&clearTimeout(_10a.innerModdedTimer);
if(_10a.isModified){
dojo.query(".wtfoneui",_10a).forEach(function(_10b){
_10b.innerText=_10b.oldInnerText;
});
_10a.isModified=false;
}
},_skipLinkFocus:function(_10c){
_10c=_10c||"app-content";
var dest=dojo.byId(_10c);
if(dest){
dest.focus();
}
},_showHideSkipLink:function(e){
var _10d=dojo.byId("skipLink");
if(_10d){
var _10e=_10d.parentNode;
if(e.type=="focus"&&_70.contains(_10e,"hidden")){
_70.remove(_10e,"hidden");
}else{
if(e.type=="blur"&&!_70.contains(_10e,"hidden")){
_70.add(_10e,"hidden");
}
}
}
},print:function(){
var _10f=_66("iframe.curam-iframe","app-content")[0];
console.log("PRINTING IFRAME:"+_10f);
if(_10f){
if(dojo.isIE<9){
_10f.contentWindow.document.execCommand("print",false,null);
}else{
_10f.contentWindow.print();
}
}else{
window.print();
}
}});
});
},"url:dijit/form/templates/ComboButton.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" data-dojo-attach-point=\"buttonNode\" data-dojo-attach-event=\"ondijitclick:_onClick,onkeypress:_onButtonKeyPress\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" data-dojo-attach-point=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdata-dojo-attach-point=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdata-dojo-attach-event=\"onkeypress:_onArrowKeyPress\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" data-dojo-attach-point=\"valueNode\"\n\t\t/></td></tr></tbody\n></table>\n","dijit/place":function(){
define("dijit/place",["dojo/_base/array","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/window","dojo/window",".","dojo/_base/lang"],function(_110,_111,_112,_113,win,_114,_115,lang){
function _116(node,_117,_118,_119){
var view=_114.getBox();
if(!node.parentNode||String(node.parentNode.tagName).toLowerCase()!="body"){
win.body().appendChild(node);
}
var best=null;
_110.some(_117,function(_11a){
var _11b=_11a.corner;
var pos=_11a.pos;
var _11c=0;
var _11d={w:{"L":view.l+view.w-pos.x,"R":pos.x-view.l,"M":view.w}[_11b.charAt(1)],h:{"T":view.t+view.h-pos.y,"B":pos.y-view.t,"M":view.h}[_11b.charAt(0)]};
if(_118){
var res=_118(node,_11a.aroundCorner,_11b,_11d,_119);
_11c=typeof res=="undefined"?0:res;
}
var _11e=node.style;
var _11f=_11e.display;
var _120=_11e.visibility;
if(_11e.display=="none"){
_11e.visibility="hidden";
_11e.display="";
}
var mb=_111.getMarginBox(node);
_11e.display=_11f;
_11e.visibility=_120;
var _121={"L":pos.x,"R":pos.x-mb.w,"M":Math.max(view.l,Math.min(view.l+view.w,pos.x+(mb.w>>1))-mb.w)}[_11b.charAt(1)],_122={"T":pos.y,"B":pos.y-mb.h,"M":Math.max(view.t,Math.min(view.t+view.h,pos.y+(mb.h>>1))-mb.h)}[_11b.charAt(0)],_123=Math.max(view.l,_121),_124=Math.max(view.t,_122),endX=Math.min(view.l+view.w,_121+mb.w),endY=Math.min(view.t+view.h,_122+mb.h),_125=endX-_123,_126=endY-_124;
_11c+=(mb.w-_125)+(mb.h-_126);
var l=_111.isBodyLtr();
if(lang.exists("curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm")&&curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm==true){
if((_11b.charAt(0)=="T"||(_11b.charAt(1)=="L"&&l)||(_11b.charAt(1)=="R"&&!l))&&_11c>0){
_11c=mb.w+mb.h;
}
}
if(best==null||_11c<best.overflow){
best={corner:_11b,aroundCorner:_11a.aroundCorner,x:_123,y:_124,w:_125,h:_126,overflow:_11c,spaceAvailable:_11d};
}
return !_11c;
});
if(best.overflow&&_118){
_118(node,best.aroundCorner,best.corner,best.spaceAvailable,_119);
}
var l=_111.isBodyLtr(),s=node.style;
s.top=best.y+"px";
s[l?"left":"right"]=(l?best.x:view.w-best.x-best.w)+"px";
s[l?"right":"left"]="auto";
return best;
};
return (_115.place={at:function(node,pos,_127,_128){
var _129=_110.map(_127,function(_12a){
var c={corner:_12a,pos:{x:pos.x,y:pos.y}};
if(_128){
c.pos.x+=_12a.charAt(1)=="L"?_128.x:-_128.x;
c.pos.y+=_12a.charAt(0)=="T"?_128.y:-_128.y;
}
return c;
});
return _116(node,_129);
},around:function(node,_12b,_12c,_12d,_12e){
var _12f=(typeof _12b=="string"||"offsetWidth" in _12b)?_111.position(_12b,true):_12b;
if(_12b.parentNode){
var _130=_112.getComputedStyle(_12b).position=="absolute";
var _131=_12b.parentNode;
while(_131&&_131.nodeType==1&&_131.nodeName!="BODY"){
var _132=_111.position(_131,true),pcs=_112.getComputedStyle(_131);
if(/relative|absolute/.test(pcs.position)){
_130=false;
}
if(!_130&&/hidden|auto|scroll/.test(pcs.overflow)){
var _133=Math.min(_12f.y+_12f.h,_132.y+_132.h);
var _134=Math.min(_12f.x+_12f.w,_132.x+_132.w);
_12f.x=Math.max(_12f.x,_132.x);
_12f.y=Math.max(_12f.y,_132.y);
_12f.h=_133-_12f.y;
_12f.w=_134-_12f.x;
}
if(pcs.position=="absolute"){
_130=true;
}
_131=_131.parentNode;
}
}
var x=_12f.x,y=_12f.y,_135="w" in _12f?_12f.w:(_12f.w=_12f.width),_136="h" in _12f?_12f.h:(_113.deprecated("place.around: dijit.place.__Rectangle: { x:"+x+", y:"+y+", height:"+_12f.height+", width:"+_135+" } has been deprecated.  Please use { x:"+x+", y:"+y+", h:"+_12f.height+", w:"+_135+" }","","2.0"),_12f.h=_12f.height);
var _137=[];
function push(_138,_139){
_137.push({aroundCorner:_138,corner:_139,pos:{x:{"L":x,"R":x+_135,"M":x+(_135>>1)}[_138.charAt(1)],y:{"T":y,"B":y+_136,"M":y+(_136>>1)}[_138.charAt(0)]}});
};
_110.forEach(_12c,function(pos){
var ltr=_12d;
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
var _13a=_116(node,_137,_12e,{w:_135,h:_136});
_13a.aroundNodePos=_12f;
return _13a;
}});
});
},"dijit/_HasDropDown":function(){
define("dijit/_HasDropDown",["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/keys","dojo/_base/lang","dojo/touch","dojo/_base/window","dojo/window","./registry","./focus","./popup","./_FocusMixin"],function(_13b,_13c,_13d,dom,_13e,_13f,_140,_141,has,keys,lang,_142,win,_143,_144,_145,_146,_147){
return _13b("dijit._HasDropDown",_147,{_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:true,forceWidth:false,maxHeight:0,dropDownPosition:["below","above"],_stopClickEvents:true,_onDropDownMouseDown:function(e){
if(this.disabled||this.readOnly){
return;
}
e.preventDefault();
this._docHandler=this.connect(win.doc,_142.release,"_onDropDownMouseUp");
this.toggleDropDown();
},_onDropDownMouseUp:function(e){
if(e&&this._docHandler){
this.disconnect(this._docHandler);
}
var _148=this.dropDown,_149=false;
if(e&&this._opened){
var c=_140.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_149){
if(_13f.contains(t,"dijitPopup")){
_149=true;
}else{
t=t.parentNode;
}
}
if(_149){
t=e.target;
if(_148.onItemClick){
var _14a;
while(t&&!(_14a=_144.byNode(t))){
t=t.parentNode;
}
if(_14a&&_14a.onClick&&_14a.getParent){
_14a.getParent().onItemClick(_14a,e);
}
}
return;
}
}
}
if(this._opened){
if(_148.focus&&_148.autoFocus!==false){
window.setTimeout(lang.hitch(_148,"focus"),1);
}
}else{
setTimeout(lang.hitch(this,"focus"),0);
}
if(has("ios")){
this._justGotMouseUp=true;
setTimeout(lang.hitch(this,function(){
this._justGotMouseUp=false;
}),0);
}
},_onDropDownClick:function(e){
if(has("ios")&&!this._justGotMouseUp){
this._onDropDownMouseDown(e);
this._onDropDownMouseUp(e);
}
if(this._stopClickEvents){
_13d.stop(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _14b={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
_13f.add(this._arrowWrapperNode||this._buttonNode,"dijit"+_14b+"ArrowButton");
},postCreate:function(){
this.inherited(arguments);
this.connect(this._buttonNode,_142.press,"_onDropDownMouseDown");
this.connect(this._buttonNode,"onclick","_onDropDownClick");
this.connect(this.focusNode,"onkeypress","_onKey");
this.connect(this.focusNode,"onkeyup","_onKeyUp");
},destroy:function(){
if(this.dropDown){
if(!this.dropDown._destroyed){
this.dropDown.destroyRecursive();
}
delete this.dropDown;
}
this.inherited(arguments);
},_onKey:function(e){
if(this.disabled||this.readOnly){
return;
}
var d=this.dropDown,_14c=e.target;
if(d&&this._opened&&d.handleKey){
if(d.handleKey(e)===false){
_13d.stop(e);
return;
}
}
if(d&&this._opened&&e.charOrCode==keys.ESCAPE){
this.closeDropDown();
_13d.stop(e);
}else{
if(!this._opened&&(e.charOrCode==keys.DOWN_ARROW||((e.charOrCode==keys.ENTER||e.charOrCode==" ")&&((_14c.tagName||"").toLowerCase()!=="input"||(_14c.type&&_14c.type.toLowerCase()!=="text"))))){
this._toggleOnKeyUp=true;
_13d.stop(e);
}
}
},_onKeyUp:function(){
if(this._toggleOnKeyUp){
delete this._toggleOnKeyUp;
this.toggleDropDown();
var d=this.dropDown;
if(d&&d.focus){
setTimeout(lang.hitch(d,"focus"),1);
}
}
},_onBlur:function(){
var _14d=_145.curNode&&this.dropDown&&dom.isDescendant(_145.curNode,this.dropDown.domNode);
this.closeDropDown(_14d);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_14e){
_14e();
},loadAndOpenDropDown:function(){
var d=new _13c(),_14f=lang.hitch(this,function(){
this.openDropDown();
d.resolve(this.dropDown);
});
if(!this.isLoaded()){
this.loadDropDown(_14f);
}else{
_14f();
}
return d;
},toggleDropDown:function(){
if(this.disabled||this.readOnly){
return;
}
if(!this._opened){
this.loadAndOpenDropDown();
}else{
this.closeDropDown();
}
},openDropDown:function(){
var _150=this.dropDown,_151=_150.domNode,_152=this._aroundNode||this.domNode,self=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_151.style.width){
this._explicitDDWidth=true;
}
if(_151.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _153={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_153.width="";
}
if(!this._explicitDDHeight){
_153.height="";
}
_141.set(_151,_153);
var _154=this.maxHeight;
if(_154==-1){
var _155=_143.getBox(),_156=_140.position(_152,false);
_154=Math.floor(Math.max(_156.y,_155.h-(_156.y+_156.h)));
}
_146.moveOffScreen(_150);
if(_150.startup&&!_150._started){
_150.startup();
}
var mb=_140.getMarginSize(_151);
var _157=(_154&&mb.h>_154);
_141.set(_151,{overflowX:"hidden",overflowY:_157?"auto":"hidden"});
if(_157){
mb.h=_154;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_152.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_152.offsetWidth);
}else{
delete mb.w;
}
}
if(lang.isFunction(_150.resize)){
_150.resize(mb);
}else{
_140.setMarginBox(_151,mb);
}
}
var _158=_146.open({parent:this,popup:_150,around:_152,orient:this.dropDownPosition,onExecute:function(){
self.closeDropDown(true);
},onCancel:function(){
self.closeDropDown(true);
},onClose:function(){
_13e.set(self._popupStateNode,"popupActive",false);
_13f.remove(self._popupStateNode,"dijitHasDropDownOpen");
self._opened=false;
}});
_13e.set(this._popupStateNode,"popupActive","true");
_13f.add(self._popupStateNode,"dijitHasDropDownOpen");
this._opened=true;
return _158;
},closeDropDown:function(_159){
if(this._opened){
if(_159){
this.focus();
}
_146.close(this.dropDown);
this._opened=false;
}
}});
});
},"curam/util/Request":function(){
define("curam/util/Request",["dojo/_base/xhr","curam/debug","curam/util/ResourceBundle","curam/util/LocalConfig"],function(xhr,_15a,_15b,_15c){
dojo.requireLocalization("curam.application","Request");
var _15d=new _15b("Request"),_15e=null,_15f=function(_160){
if(_15e){
return _15e(_160);
}else{
return _160.responseText.indexOf("action=\"j_security_check\"")>0;
}
},_161=function(err,_162){
if(_15f(_162.xhr)){
_15a.log(_15d.getProperty("sessionExpired"));
alert(_15d.getProperty("sessionExpired"));
}else{
_15a.log(_15d.getProperty("ajaxError"));
alert(_15d.getProperty("ajaxError"));
}
_15a.log(err);
_15a.log("HTTP status was: "+_162.xhr.status);
},_163=function(_164,args){
var _165=_15c.readOption("ajaxDebugMode","false")=="true";
var _166=args.error;
if(_165){
args.error=function(err,_167){
if(args.errorHandlerOverrideDefault!==true){
_161(err,_167);
}
if(_166){
_166(err,_167);
}
};
}
var _168=_164(args);
return _168;
};
var _169={post:function(args){
return _163(xhr.post,args);
},get:function(args){
return _163(xhr.get,args);
},setLoginPageDetector:function(_16a){
_15e=_16a;
}};
return _169;
});
},"idx/oneui/MenuBar":function(){
define("idx/oneui/MenuBar",["dojo/_base/declare","dijit/MenuBar","idx/oneui/_MenuOpenOnHoverMixin"],function(_16b,_16c,_16d){
return _16b("idx.oneui.MenuBar",[_16c,_16d],{});
});
},"dijit/_MenuBase":function(){
define("dijit/_MenuBase",["./popup","dojo/window","./_Widget","./_KeyNavContainer","./_TemplatedMixin","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/lang","dojo/_base/array"],function(pm,_16e,_16f,_170,_171,_172,dom,_173,_174,lang,_175){
return _172("dijit._MenuBase",[_16f,_171,_170],{parentMenu:null,popupDelay:500,onExecute:function(){
},onCancel:function(){
},_moveToPopup:function(evt){
if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){
this.focusedChild._onClick(evt);
}else{
var _176=this._getTopMenu();
if(_176&&_176._isMenuBar){
_176.focusNext();
}
}
},_onPopupHover:function(){
if(this.currentPopup&&this.currentPopup._pendingClose_timer){
var _177=this.currentPopup.parentMenu;
if(_177.focusedChild){
_177.focusedChild._setSelected(false);
}
_177.focusedChild=this.currentPopup.from_item;
_177.focusedChild._setSelected(true);
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
var _178=item.popup;
if(_178){
this._stopPendingCloseTimer(_178);
_178._pendingClose_timer=setTimeout(function(){
_178._pendingClose_timer=null;
if(_178.parentMenu){
_178.parentMenu.currentPopup=null;
}
pm.close(_178);
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
},_stopPendingCloseTimer:function(_179){
if(_179._pendingClose_timer){
clearTimeout(_179._pendingClose_timer);
_179._pendingClose_timer=null;
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
var _17a=this.focusedChild;
if(!_17a){
return;
}
var _17b=_17a.popup;
if(_17b.isShowingNow){
return;
}
if(this.currentPopup){
this._stopPendingCloseTimer(this.currentPopup);
pm.close(this.currentPopup);
}
_17b.parentMenu=this;
_17b.from_item=_17a;
var self=this;
pm.open({parent:this,popup:_17b,around:_17a.domNode,orient:this._orient||["after","before"],onCancel:function(){
self.focusChild(_17a);
self._cleanUp();
_17a._setSelected(true);
self.focusedChild=_17a;
},onExecute:lang.hitch(this,"_cleanUp")});
this.currentPopup=_17b;
if(this.popupHoverHandle){
this.disconnect(this.popupHoverHandle);
}
this.popupHoverHandle=this.connect(_17b.domNode,"onmouseenter","_onPopupHover");
if(_17b.focus){
_17b._focus_timer=setTimeout(lang.hitch(_17b,function(){
this._focus_timer=null;
this.focus();
}),0);
}
},_markActive:function(){
this.isActive=true;
_174.replace(this.domNode,"dijitMenuActive","dijitMenuPassive");
},onOpen:function(){
this.isShowingNow=true;
this._markActive();
},_markInactive:function(){
this.isActive=false;
_174.replace(this.domNode,"dijitMenuPassive","dijitMenuActive");
},onClose:function(){
this._stopFocusTimer();
this._markInactive();
this.isShowingNow=false;
this.parentMenu=null;
},_closeChild:function(){
this._stopPopupTimer();
if(this.currentPopup){
if(_175.indexOf(this._focusManager.activeStack,this.id)>=0){
_173.set(this.focusedChild.focusNode,"tabIndex",this.tabIndex);
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
},"curam/dialog":function(){
define("curam/dialog",["curam/util","curam/debug","curam/util/external","curam/util/Refresh","curam/tab","curam/util/RuntimeContext","curam/define","curam/util/onLoad","cm/_base/_dom","curam/util/ResourceBundle"],function(util,_17c,_17d){
dojo.requireLocalization("curam.application","Debug");
var _17e=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.dialog",{MODAL_PREV_FLAG:"o3modalprev",MODAL_PREV_FLAG_INPUT:"curam_dialog_prev_marker",FORCE_CLOSE:false,ERROR_MESSAGES_HEADER:"error-messages-header",_hierarchy:[],_id:null,_displayedHandlerUnsToken:null,_displayed:false,_size:null,_justClose:false,validTargets:{"_top":true,"_self":true},initModal:function(_17f,_180){
curam.dialog.pageId=_17f;
curam.dialog.messagesExist=_180;
var _181=util.getTopmostWindow();
var _182=false;
var _183=_181.dojo.subscribe("/curam/dialog/SetId",this,function(_184){
_17c.log("curam.dialog: "+_17e.getProperty("curam.dialog.id"),_184);
curam.dialog._id=_184;
_182=true;
_181.dojo.unsubscribe(_183);
});
_181.dojo.publish("/curam/dialog/init");
if(!_182){
_17c.log("curam.dialog: "+_17e.getProperty("curam.dialog.no.id"));
_181.dojo.unsubscribe(_183);
}
if(curam.dialog.closeDialog(false)){
return;
}
curam.dialog._displayedHandlerUnsToken=util.getTopmostWindow().dojo.subscribe("/curam/dialog/displayed",null,function(_185,size){
if(_185==curam.dialog._id){
curam.dialog._displayed=true;
curam.dialog._size=size;
util.getTopmostWindow().dojo.unsubscribe(curam.dialog._displayedHandlerUnsToken);
curam.dialog._displayedHandlerUnsToken=null;
}
});
if(jsScreenContext.hasContextBits("AGENDA")||jsScreenContext.hasContextBits("TREE")){
dojo.addOnUnload(function(){
util.getTopmostWindow().dojo.unsubscribe(curam.dialog._displayedHandlerUnsToken);
curam.dialog._displayedHandlerUnsToken=null;
});
}
dojo.addOnLoad(function(){
util.connect(dojo.body(),"onclick",curam.dialog.modalEventHandler);
for(var i=0;i<document.forms.length;i++){
var form=document.forms[i];
curam.dialog.addFormInput(form,"hidden","o3frame","modal");
var _186=dojo.byId("o3ctx");
var sc=new curam.util.ScreenContext(jsScreenContext.getValue());
sc.addContextBits("ACTION|ERROR");
_186.value=sc.getValue();
util.connect(form,"onsubmit",curam.dialog.formSubmitHandler);
}
window.curamModal=true;
});
dojo.addOnUnload(function(){
util.getTopmostWindow().dojo.publish("/curam/dialog/iframeUnloaded",[curam.dialog._id,window]);
});
if(_182){
dojo.publish("/curam/dialog/ready");
}
},closeDialog:function(_187){
if(_187){
curam.dialog.forceClose();
}
var _188=curam.dialog.checkClose(curam.dialog.pageId);
if(_188){
util.onLoad.addPublisher(function(_189){
_189.modalClosing=true;
});
if(curam.dialog.messagesExist){
dojo.addOnLoad(function(){
var _18a=dojo.byId(util.ERROR_MESSAGES_CONTAINER);
var _18b=dojo.byId(util.ERROR_MESSAGES_LIST);
var _18c=dojo.byId(curam.dialog.ERROR_MESSAGES_HEADER);
if(_18b&&_18c){
util.saveInformationalMsgs(_188);
util.disableInformationalLoad();
}else{
_188();
}
});
}else{
_188();
}
return true;
}
return false;
},addFormInput:function(form,type,name,_18d){
return dojo.create("input",{"type":type,"name":name,"value":_18d},form);
},checkClose:function(_18e){
if(curam.dialog._justClose){
return function(){
curam.dialog.closeModalDialog();
};
}
var _18f=curam.dialog.getParentWindow(window);
if(!_18f){
return false;
}
var href=window.location.href;
var _190=curam.dialog.MODAL_PREV_FLAG;
var _191=util.getUrlParamValue(href,_190);
var _192=true;
if(_191){
if(_18f){
if(_191==_18e){
_192=false;
}
}
}else{
_192=false;
}
var _193=util.getUrlParamValue(href,"o3ctx");
if(_193){
var sc=new curam.util.ScreenContext();
sc.setContext(_193);
if(sc.hasContextBits("TREE|ACTION")){
_192=false;
}
}
if(_192||curam.dialog.FORCE_CLOSE){
if(!curam.dialog.FORCE_CLOSE){
if(_191=="user-prefs-editor"){
return function(){
if(_18f&&_18f.location!==util.getTopmostWindow().location){
curam.dialog.doRedirect(_18f);
}
curam.dialog.closeModalDialog();
};
}
return function(){
var rp=util.removeUrlParam;
href=rp(rp(rp(href,_190),"o3frame"),util.PREVENT_CACHE_FLAG);
href=util.adjustTargetContext(_18f,href);
if(_18f&&_18f.location!==util.getTopmostWindow().location){
curam.dialog.doRedirect(_18f,href,true);
}else{
curam.tab.getTabController().handleLinkClick(href);
}
curam.dialog.closeModalDialog();
};
}else{
return function(){
if(_18f!==util.getTopmostWindow()){
_18f.curam.util.loadInformationalMsgs();
}
curam.dialog.closeModalDialog();
};
}
}
return false;
},getParentWindow:function(_194){
if(!_194){
_17c.log("curam.dialog.getParentWindow(): "+_17e.getProperty("curam.dialog.no.child"),window);
_17c.log("returning as parent = ",window.parent.location.href);
return window.parent;
}
_17c.log("curam.dialog.getParentWindow(): "+_17e.getProperty("curam.dialog.child"),_194.location.href);
var _195=curam.dialog._getDialogHierarchy();
for(var i=0;i<_195.length;i++){
if(_195[i]==_194){
var _196=(i>0)?_195[i-1]:_195[0];
_17c.log("curam.dialog.getParentWindow(): "+_17e.getProperty("curam.dialog.parent.window"),_196);
return _196;
}
}
_17c.log("curam.dialog.getParentWindow(): "+_17e.getProperty("curam.dialog.child.not.found"),_194.location.href);
_17c.log("curam.dialog.getParentWindow(): "+_17e.getProperty("curam.dialog.hierarchy"),_195);
var ret=_195.length>0?_195[_195.length-1]:undefined;
_17c.log("curam.dialog.getParentWindow(): "+_17e.getProperty("curam.dialog.returning.parent"),ret?ret.location.href:"undefined");
return ret;
},_getDialogHierarchy:function(){
var _197=util.getTopmostWindow();
_197.require(["curam/dialog"]);
return _197.curam.dialog._hierarchy;
},pushOntoDialogHierarchy:function(_198){
var _199=curam.dialog._getDialogHierarchy();
if(dojo.indexOf(_199,_198)<0){
_199.push(_198);
_17c.log(_17e.getProperty("curam.dialog.add.hierarchy"),_198.location.href);
_17c.log(_17e.getProperty("curam.dialog.full.hierarchy"),_199);
}
},removeFromDialogHierarchy:function(_19a){
var _19b=curam.dialog._getDialogHierarchy();
if(!_19a||_19b[_19b.length-1]==_19a){
_19b.pop();
}else{
_17c.log("curam.dialog.removeFromDialogHierarchy(): "+_17e.getProperty("curam.dialog.ignore.request"));
try{
_17c.log(_19a.location.href);
}
catch(e){
_17c.log(e.message);
}
}
},stripPageOrActionFromUrl:function(url){
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
},_isSameBaseUrl:function(href,rtc,_19c){
if(href&&href.indexOf("#")==0){
return true;
}
var _19d=href.split("?");
var _19e=rtc.getHref().split("?");
if(_19d[0].indexOf("/")<0){
var _19f=_19e[0].split("/");
_19e[0]=_19f[_19f.length-1];
}
if(_19e[0].indexOf("/")<0){
var _19f=_19d[0].split("/");
_19d[0]=_19f[_19f.length-1];
}
if(_19c&&_19c==true){
_19d[0]=curam.dialog.stripPageOrActionFromUrl(_19d[0]);
_19e[0]=curam.dialog.stripPageOrActionFromUrl(_19e[0]);
}
if(_19d[0]==_19e[0]){
return true;
}
return false;
},modalEventHandler:function(_1a0){
curam.dialog._doHandleModalEvent(_1a0,new curam.util.RuntimeContext(window),curam.dialog.closeModalDialog,curam.dialog.doRedirect);
},_doHandleModalEvent:function(e,rtc,_1a1,_1a2){
var _1a3=e.target;
var u=util;
switch(_1a3.tagName){
case "INPUT":
if(dojo.attr(_1a3,"type")=="submit"&&typeof _1a3.form!="undefined"){
_1a3.form.setAttribute("keepModal",_1a3.getAttribute("keepModal"));
}
return true;
case "IMG":
case "SPAN":
case "DIV":
_1a3=cm.getParentByType(_1a3,"A");
if(_1a3==null){
return;
}
case "A":
if(_1a3._submitButton){
_1a3._submitButton.form.setAttribute("keepModal",_1a3._submitButton.getAttribute("keepModal"));
return;
}
break;
default:
return true;
}
var _1a4=dojo.stopEvent;
var href=_1a3.getAttribute("href");
if(href==""){
_1a1();
return false;
}
if(href.indexOf("javascript")==0){
return false;
}
var ctx=jsScreenContext;
ctx.addContextBits("MODAL");
if(!href){
return false;
}
var _1a5=_1a3.getAttribute("target");
if(_1a5&&!curam.dialog.validTargets[_1a5]){
return true;
}
if(href&&href.indexOf("/servlet/FileDownload?")>-1){
var _1a6=dojo.create("iframe",{src:href},dojo.body());
_1a6.style.display="none";
_1a4(e);
return false;
}
if(dojo.hasClass(_1a3,"external-link")){
return true;
}
if(util.isSameUrl(href,null,rtc)){
if(href.indexOf("#")<0){
href=u.replaceUrlParam(href,"o3frame","modal");
href=u.replaceUrlParam(href,"o3ctx",ctx.getValue());
_1a2(window,href);
return false;
}
return true;
}
if(href&&curam.dialog._isSameBaseUrl(href,rtc,true)&&!_1a3.getAttribute("keepModal")){
_1a3.setAttribute("keepModal","true");
}
var _1a7=curam.dialog.getParentWindow(rtc.contextObject());
if(_1a3&&_1a3.getAttribute){
_1a4(e);
if(_1a3.getAttribute("keepModal")=="true"){
href=u.replaceUrlParam(href,"o3frame","modal");
href=u.replaceUrlParam(href,"o3ctx",ctx.getValue());
_1a2(window,href);
}else{
if(_1a7){
href=u.removeUrlParam(href,"o3frame");
href=u.removeUrlParam(href,curam.dialog.MODAL_PREV_FLAG);
if(_1a7.location!==util.getTopmostWindow().location){
var _1a8=new curam.util.RuntimeContext(_1a7);
var _1a9=_1a8.getHref();
_1a9=u.removeUrlParam(_1a9,"o3frame");
if(util.isActionPage(_1a9)){
if(!curam.dialog._isSameBaseUrl(href,_1a8,true)){
href=u.adjustTargetContext(_1a7,href);
_1a2(_1a7,href);
}
}else{
if(!util.isSameUrl(href,_1a9)){
href=u.adjustTargetContext(_1a7,href);
curam.dialog.doRedirect(_1a7,href);
}
}
}else{
var _1aa=new curam.util.ScreenContext("TAB");
href=u.replaceUrlParam(href,"o3ctx",_1aa.getValue());
curam.tab.getTabController().handleLinkClick(href);
}
_1a1();
}
}
return false;
}
if(_1a7&&typeof (_1a3)=="undefined"||_1a3==null||_1a3=="_self"||_1a3==""){
_1a4(e);
href=href.replace(/[&?]o3frame=modal/g,"").replace("%3Fo3frame%3Dmodal","").replace("?o3frame%3Dmodal","");
href=util.updateCtx(href);
if(_1a7.location!==util.getTopmostWindow().location){
_1a2(_1a7,href);
}else{
var _1aa=new curam.util.ScreenContext("TAB");
href=u.replaceUrlParam(href,"o3ctx",_1aa.getValue());
curam.tab.getTabController().handleLinkClick(href);
}
_1a1();
return false;
}
return true;
},formSubmitHandler:function(e){
var _1ab=curam.dialog.getParentWindow(window);
if(typeof _1ab=="undefined"){
return true;
}
e.target.method="post";
e.target.setAttribute("target",window.name);
var _1ac=e.target.action;
var _1ad=curam.dialog.MODAL_PREV_FLAG;
var _1ae=curam.dialog.MODAL_PREV_FLAG_INPUT;
var u=util;
var _1af=dojo.byId(_1ae);
if(_1af){
_1af.parentNode.removeChild(_1af);
}
if(e.target.getAttribute("keepModal")!="true"&&!jsScreenContext.hasContextBits("AGENDA")){
var _1b0="multipart/form-data";
if(e.target.enctype==_1b0||e.target.encoding==_1b0){
e.target.action=u.removeUrlParam(_1ac,_1ad);
_1af=curam.dialog.addFormInput(e.target,"hidden",_1ad,curam.dialog.pageId);
_1af.setAttribute("id",_1ae);
_1af.id=_1ae;
}else{
e.target.action=u.replaceUrlParam(_1ac,_1ad,curam.dialog.pageId);
}
}else{
e.target.action=u.removeUrlParam(_1ac,_1ad);
}
_1ab.curam.util.invalidatePage();
if(!jsScreenContext.hasContextBits("EXTAPP")){
util.firePageSubmittedEvent("dialog");
}
return true;
},forceClose:function(){
curam.dialog.FORCE_CLOSE=true;
},forceParentRefresh:function(){
var _1b1=curam.dialog.getParentWindow(window);
if(!_1b1){
return;
}
_1b1.curam.util.FORCE_REFRESH=true;
},closeModalDialog:function(){
var _1b2=util.getTopmostWindow();
if(curam.dialog._displayedHandlerUnsToken!=null){
_1b2.dojo.unsubscribe(curam.dialog._displayedHandlerUnsToken);
curam.dialog._displayedHandlerUnsToken=null;
}
if(typeof (curam.dialog._id)=="undefined"||curam.dialog._id==null){
var _1b3=window.frameElement.id;
var _1b4=_1b3.substring(7);
curam.dialog._id=_1b4;
_17c.log("curam.dialog.closeModalDialog() "+_17e.getProperty("curam.dialog.modal.id")+_1b4);
}
_17c.log("publishing /curam/dialog/close for ",curam.dialog._id);
util.getTopmostWindow().dojo.publish("/curam/dialog/close",[curam.dialog._id]);
_17c.log("publishing /curam/dialog/close for ",curam.dialog._id);
},parseWindowOptions:function(_1b5){
var opts={};
if(_1b5){
_17c.log("curam.dialog.parseWindowOptions "+_17e.getProperty("curam.dialog.parsing"),_1b5);
var _1b6=_1b5.split(",");
var _1b7;
for(var i=0;i<_1b6.length;i++){
_1b7=_1b6[i].split("=");
opts[_1b7[0]]=_1b7[1];
}
_17c.log("done:",dojo.toJson(opts));
}else{
_17c.log("curam.dialog.parseWindowOptions "+_17e.getProperty("curam.dialog.no.options"));
}
return opts;
},doRedirect:function(_1b8,href,_1b9,_1ba){
window.curamDialogRedirecting=true;
_1b8.curam.util.redirectWindow(href,_1b9,_1ba);
},closeGracefully:function(){
curam.dialog._justClose=true;
}});
return curam.dialog;
});
},"curam/widget/menu/MenuPane":function(){
define("curam/widget/menu/MenuPane",["dojo/_base/declare","dojo/_base/lang","dojo/on","dojo/dom-class","curam/widget/componentWrappers/ListWraper","curam/widget/form/ToggleButtonGroup","dojo/_base/window","dojo/dom-construct","dijit/TooltipDialog","dijit/popup","dojo/_base/fx","dojo/dom-style","dojox/layout/ExpandoPane","dojo/dom-geometry","dojo/aspect","dojo/keys","dijit/Tooltip","idx/oneui/HoverCard","dojo/query","dojo/dom-style","dojo/has","dojo/dom-attr"],function(_1bb,lang,on,_1bc,_1bd,_1be,_1bf,_1c0,_1c1,_1c2,fx,_1c3,_1c4,_1c5,_1c6,keys,_1c7,_1c8,_1c9,_1ca,has,_1cb){
var _1cc=_1bb("curam.widget.menu._MenuPaneButtonIndexer",null,{selectedButtonKey:-1,selectedButtonDisplayIndex:-1,expandButtonDisplayIndex:-1,_buttonDisplayOrderArrayOrginale:null,_buttonMap:null,_subPagenMap:null,_buttonPrimaryContainerArray:null,_buttonSecondaryContainerArray:null,constructor:function(args){
this._buttonMap=[];
this._subPagenMap=[];
this._buttonDisplayOrderArrayOrginale=new Array();
this._buttonPrimaryContainerArray=new Array();
this._buttonSecondaryContainerArray=new Array();
},addNewButton:function(_1cd,key){
var _1ce={key:key,id:_1cd.id,button:_1cd,contextBox:null,displayOrderIndex:null,displayOrderOrginaleIndex:this._buttonDisplayOrderArrayOrginale.length};
this._buttonMap[key]=_1ce;
this._buttonDisplayOrderArrayOrginale.push(key);
},addButtonReferenceToPrimaryContainer:function(key,_1cf){
if(_1cf){
this._buttonPrimaryContainerArray.push(key);
}else{
this._buttonSecondaryContainerArray.push(key);
}
},getButton:function(key){
var _1d0=this._buttonMap[key];
return _1d0;
},setNewSubPage:function(_1d1,_1d2){
this._subPagenMap[_1d1]=_1d2;
},getSubPagePrimaryPage:function(_1d3){
var _1d4=this._subPagenMap[_1d3];
return _1d4;
},getButtonPrimary:function(_1d5){
var key=this._buttonPrimaryContainerArray[_1d5];
var _1d6=this.getButton(key);
return _1d6;
},getButtonSecondary:function(_1d7){
var key=this._buttonSecondaryContainerArray[_1d7];
var _1d8=this.getButton(key);
return _1d8;
},swapButtonFomPrimaryContainerToSecondaryContainer:function(_1d9){
if(_1d9){
var item=this._buttonPrimaryContainerArray.pop();
this._buttonSecondaryContainerArray.unshift(item);
}else{
var item=this._buttonSecondaryContainerArray.shift();
this._buttonPrimaryContainerArray.push(item);
}
},swapButtonContainerToContainer:function(_1da,_1db,_1dc){
if(_1da){
var item=this._buttonPrimaryContainerArray.splice(_1db,1);
this._buttonSecondaryContainerArray.splice(_1dc,0,item[0]);
}else{
var item=this._buttonSecondaryContainerArray.splice(_1db,1);
this._buttonPrimaryContainerArray.splice(_1dc,0,item[0]);
}
},swapButtonContainerItemIndex:function(_1dd,_1de,_1df){
if(_1dd){
var item=this._buttonPrimaryContainerArray.splice(_1de,1);
this._buttonPrimaryContainerArray.splice(_1df,0,item[0]);
}else{
var item=this._buttonSecondaryContainerArray.splice(_1de,1);
this._buttonSecondaryContainerArray.splice(_1df,0,item[0]);
}
},getWhichContinerFromIndex:function(_1e0){
var _1e1=0;
if(_1e0>=this._buttonPrimaryContainerArray.length){
_1e1=1;
}
return _1e1;
}});
return _1bb("curam.widget.menu.MenuPane",[_1c4],{_listWrapper:null,_expandButton:null,_expandButtonContentBox:null,_toolTipDialogExpand:null,_toolTipDialogExpandContents:null,_fadeIn:null,_fadeOut:null,_menuPaneButtonIndexer:null,duration:300,_buttonSizerDiv:null,_buttonSizerList:null,_resizeResizeHandler:null,_showEndresizeResizeHandler:null,_hideEndResizeHandler:null,resizeDelay:250,_resizeDelayHandler:null,_previouseHeight:-1,_resizeStatusQue:1,_resizeStatusResizeing:0,_resizeStatusNotInUse:-1,_resizeCurentStatus:-1,_classNavMenu:"navMenu",_classNavMenuOverFlow:"navMenuOverFlow",_classCurramSideMenuButton:"curramSideMenuButton",_classCurramSideMenuButtonIcon:"curramSideMenuButtonIcon",_classCurramSideMenuOverFlowButton:"curramSideMenuOverFlowButton",_classCurramSideMenuOverFlowButtonIcon:"curramSideMenuOverFlowButtonIcon",_classCurramSideMenuOverFlowButtonExpand:"curramSideMenuOverFlowButtonExpand",_classCurramSideMenuOverFlowButtonExpandIcon:"curramSideMenuOverFlowButtonExpandIcon",constructor:function(args){
this.inherited(arguments);
this._menuPaneButtonIndexer=new _1cc();
},postCreate:function(){
this.inherited(arguments);
_1bc.add(this.titleWrapper,"dijitHidden");
this._expandButton=new dijit.form.Button({id:"navOverflowButton",baseClass:this._classCurramSideMenuOverFlowButtonExpand,iconClass:this._classCurramSideMenuOverFlowButtonExpandIcon,orgID:"exapnadButton",showLabel:false});
this._toolTipDialogExpandContentsListWrapper=new curam.widget.componentWrappers.ListWraper({listType:"ol",role:"menu",baseClass:this._classNavMenuOverFlow,_doBeforeItemSet:lang.hitch(this,function(item,_1e2){
if(item!=null){
if(this.isLeftToRight()){
_1ca.set(item.focusNode,"textAlign","left");
_1ca.set(item.containerNode,"marginRight","10px");
}else{
_1ca.set(item.focusNode,"textAlign","right");
_1ca.set(item.containerNode,"marginLeft","10px");
}
_1ca.set(item.containerNode,"padding","0px");
item.set("baseClass",this._classCurramSideMenuOverFlowButton);
_1bc.replace(item.domNode,this._classCurramSideMenuOverFlowButton,this._classCurramSideMenuButton);
_1bc.add(item.iconNode,this._classCurramSideMenuOverFlowButtonIcon);
}
})});
var _1e3=null;
if(has("ie")!=null&&has("ie")<9){
_1e3=_1c0.create("div");
}else{
_1e3=_1c0.create("nav");
}
_1cb.set(_1e3,"role","navigation");
this._toolTipDialogExpandContentsListWrapper.placeAt(_1e3);
this._toolTipDialogExpand=new idx.oneui.HoverCard({draggable:false,hideDelay:450,showDelay:0,target:this._expandButton.domNode,content:_1e3,forceFocus:true,focus:lang.hitch(this,function(){
var _1e4=this._menuPaneButtonIndexer.getButtonSecondary(0);
_1e4.button.focus();
}),defaultPosition:["after-centered","before-centered"],moreActions:[],actions:[]});
_1bc.add(this._toolTipDialogExpand.domNode,"dijitHidden");
_1bc.add(_1c9(".idxOneuiHoverCardFooter",this._toolTipDialogExpand.bodyNode)[0],"dijitHidden");
_1bc.add(this._toolTipDialogExpand.gripNode,"dijitHidden");
_1bc.add(this._toolTipDialogExpand.actionIcons,"dijitHidden");
_1bc.add(this._toolTipDialogExpand.moreActionsNode,"dijitHidden");
this._listWrapper=new curam.widget.componentWrappers.ListWraper({listType:"ol",role:"menu",baseClass:this._classNavMenu,_doBeforeItemSet:lang.hitch(this,function(item,_1e5){
if(item!=null&&item.orgID!="exapnadButton"){
_1bc.remove(item.iconNode,this._classCurramSideMenuOverFlowButtonIcon);
if(has("ie")){
_1bc.remove(item.domNode,"curramSideMenuOverFlowButtonHover");
}
_1ca.set(item.focusNode,"textAlign","center");
if(this.isLeftToRight()){
_1ca.set(item.containerNode,"marginRight","0px");
}else{
_1ca.set(item.containerNode,"marginLeft","0px");
}
item.set("baseClass",this._classCurramSideMenuButton);
_1bc.replace(item.domNode,this._classCurramSideMenuButton,this._classCurramSideMenuOverFlowButton);
}
})});
if(has("ie")!=null&&has("ie")<9){
var div1=_1c0.create("div",null,this.containerNode);
_1cb.set(div1,"role","navigation");
this._listWrapper.placeAt(div1);
}else{
var _1e6=_1c0.create("nav",null,this.containerNode);
_1cb.set(_1e6,"role","navigation");
this._listWrapper.placeAt(_1e6);
}
this._fadeIn=fx.fadeIn({node:this._listWrapper.domNode,duration:this.duration,onEnd:lang.hitch(this,"_showContainer")});
this._fadeOut=fx.fadeOut({node:this._listWrapper.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHideEnd")});
this._resizeResizeHandler=_1c6.after(this,"resize",this._doResize,true);
this._showEndresizeResizeHandler=_1c6.after(this,"_showEnd",lang.hitch(this,"_onShowComplete"),false);
this._hideEndResizeHandler=_1c6.after(this,"_hideEnd",lang.hitch(this,"_onHideComplete"),false);
},startup:function(){
this.inherited(arguments);
},fadeIn:function(){
this._fadeIcons(true);
},fadeOut:function(){
this._fadeIcons(false);
},_fadeIcons:function(_1e7){
this._toolTipDialogExpand.hide(this._expandButton.domNode);
if(_1e7==true){
if(this._fadeOut.status()=="playing"){
this._fadeOut.stop();
this._fadeIn.play();
}else{
if(this._fadeIn.status()!="playing"){
this._fadeIn.play();
}
}
}else{
if(this._fadeIn.status()=="playing"){
this._fadeIn.stop();
this._fadeOut.play();
}else{
if(this._fadeOut.status()!="playing"){
this._fadeOut.play();
}
}
}
},_showContainer:function(){
if(!this._showing){
this.toggle();
}
},_onShowComplete:function(){
},_onHideEnd:function(){
if(this._showing){
this.toggle();
}
},_onHideComplete:function(){
},addMenuItems:function(_1e8){
this._cleanDownExistingMenuItems();
dojo.forEach(_1e8,function(item,i){
this._addMenuItem(item,i);
},this);
this._initaleProcessMenuItems();
this._initalePlaceMenuItems();
},_cleanDownExistingMenuItems:function(){
this._removeButtonCacheContent();
this._toolTipDialogExpandContentsListWrapper.deleteAllChildern();
this._menuPaneButtonIndexer._buttonSecondaryContainerArray.length=0;
this._removeExpandButton();
this._listWrapper.deleteAllChildern();
this._menuPaneButtonIndexer._buttonDisplayOrderArrayOrginale.length=0;
this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length=0;
this._menuPaneButtonIndexer.selectedButtonKey=-1;
this._menuPaneButtonIndexer.selectedButtonDisplayIndex=-1;
this._menuPaneButtonIndexer.expandButtonDisplayIndex=-1;
this._menuPaneButtonIndexer.selectedButtonKey=-1;
for(var key in this._menuPaneButtonIndexer._subPagenMap){
delete this._menuPaneButtonIndexer._subPagenMap[key];
}
},setSelectedButton:function(_1e9){
if(_1e9.exceptionButtonFound==null){
_1e9.exceptionButtonFound=true;
}
if(this._menuPaneButtonIndexer.getButton(_1e9.key)==null&&this._menuPaneButtonIndexer.getSubPagePrimaryPage(_1e9.key)==null){
if(_1e9.exceptionButtonFound==false){
this._onSelectAfter(_1e9);
}else{
throw new Error("No button exists with the requested id : "+_1e9.key);
}
}else{
this._buttonSelected(_1e9,true);
}
},deselect:function(){
if(this._menuPaneButtonIndexer.selectedButtonDisplayIndex!=-1){
var _1ea=this._menuPaneButtonIndexer.getButton(this._menuPaneButtonIndexer.selectedButtonKey);
_1ea.button.set("checked",false);
}
},_onSelectBefore:function(_1eb){
},_onSelectAfter:function(_1ec){
},_addMenuItem:function(item,_1ed){
item=this._filterItem(item);
this._generateSubPageIndex(item.id,item.subPageIds);
var cb=lang.hitch(this,function(_1ee){
var pram={key:_1ee.orgID,param:[]};
this._buttonSelected(pram,false);
});
var but=new curam.widget.form.ToggleButtonGroup({label:item.label,orgID:item.id,groupName:"menuPaneCuramWidget",onClick:function(e){
cb(this);
},baseClass:this._classCurramSideMenuButton,iconClass:this._classCurramSideMenuButtonIcon});
if(item.iconPath!=null&&lang.trim(item.iconPath).length>0){
_1c3.set(but.iconNode,{backgroundImage:"url("+item.iconPath+")"});
}
if(item.selected!=null&&item.selected==true){
this._menuPaneButtonIndexer.selectedButtonKey=item.id;
}
this._menuPaneButtonIndexer.addNewButton(but,item.id);
},_generateSubPageIndex:function(_1ef,_1f0){
if(_1f0!=null&&_1f0.length>0){
dojo.forEach(_1f0,function(_1f1){
if(this._menuPaneButtonIndexer.getSubPagePrimaryPage(_1f1)==null){
this._menuPaneButtonIndexer.setNewSubPage(_1f1,_1ef);
}else{
throw new Error("There has been a clash, sub page has all ready been registered.  Primary ID : "+_1ef+" Subpage ID : "+_1f1);
}
},this);
}
},_filterItem:function(item){
return item;
},_initaleProcessMenuItems:function(){
var _1f2=dojo.contentBox(this.domNode);
if(this._showing==false){
_1f2.w=this._showSize;
}
this._buttonSizerDiv=_1c0.create("div",{style:{height:_1f2.h+"px",width:_1f2.w+"px"}});
_1bc.add(this._buttonSizerDiv,"dijitOffScreen");
dojo.place(this._buttonSizerDiv,_1bf.body());
this._buttonSizerList=new curam.widget.componentWrappers.ListWraper({listType:"ol",baseClass:this._classNavMenu}).placeAt(this._buttonSizerDiv);
for(var key in this._menuPaneButtonIndexer._buttonMap){
var _1f3=this._menuPaneButtonIndexer.getButton(key);
if(_1f3.button){
this._buttonSizerList.set("item",_1f3.button.domNode);
var _1f4=dojo.contentBox(_1f3.button.domNode);
this._menuPaneButtonIndexer.getButton(key).contextBox=_1f4;
}
}
this._buttonSizerList.set("item",this._expandButton.domNode);
this._expandButtonContentBox=dojo.contentBox(this._expandButton.domNode);
_1bc.add(this._expandButton.domNode,"dijitHidden");
_1c0.place(this._expandButton.domNode,_1bf.body());
},_initalePlaceMenuItems:function(){
var _1f5=0;
for(var key in this._menuPaneButtonIndexer._buttonMap){
var item=this._menuPaneButtonIndexer.getButton(key);
if(item.button.get("checked")){
this._menuPaneButtonIndexer.selectedButtonDisplayIndex=_1f5;
this._menuPaneButtonIndexer.selectedButtonKey=key;
}
item.displayOrderOrginaleIndex=_1f5;
if(this._menuPaneButtonIndexer.expandButtonDisplayIndex==-1&&(this.get("ContainerHeight")-this._listWrapper.get("ContainerHeight"))>(this._expandButtonContentBox.h+item.contextBox.h)){
this._listWrapper.set("item",item.button);
this._menuPaneButtonIndexer.addButtonReferenceToPrimaryContainer(key,true);
}else{
this._addExpandButton(_1f5);
this._toolTipDialogExpandContentsListWrapper.set("item",item.button);
this._menuPaneButtonIndexer.addButtonReferenceToPrimaryContainer(key,false);
if(_1f5==this._menuPaneButtonIndexer.selectedButtonDisplayIndex){
selectedIndexPositionTemp=this._menuPaneButtonIndexer._buttonSecondaryContainerArray.length-1;
}
}
if(_1f5==0){
idcar=item.button.id;
}
_1f5++;
}
this._buttonSizerList.destroy();
_1c0.destroy(this._buttonSizerDiv);
if(this._menuPaneButtonIndexer.selectedButtonKey!=-1){
var _1f6=this._menuPaneButtonIndexer.getButton(this._menuPaneButtonIndexer.selectedButtonKey);
_1f6.button._onClick();
}
},_addExpandButton:function(_1f7){
if(this._menuPaneButtonIndexer.expandButtonDisplayIndex==-1){
console.info("add expando");
this._menuPaneButtonIndexer.expandButtonDisplayIndex=_1f7;
_1bc.remove(this._expandButton.domNode,"dijitHidden");
this._listWrapper.set("item",this._expandButton);
}
},_removeExpandButton:function(){
if(this._menuPaneButtonIndexer.expandButtonDisplayIndex!=-1&&this._menuPaneButtonIndexer._buttonSecondaryContainerArray.length==0){
this._menuPaneButtonIndexer.expandButtonDisplayIndex=-1;
console.info("Remove expando : "+this._menuPaneButtonIndexer._buttonSecondaryContainerArray.length);
_1bc.add(this._expandButton.domNode,"dijitHidden");
_1c0.place(this._expandButton.domNode,_1bf.body());
this._listWrapper.deleteChild(this._listWrapper.get("ItemCount"));
}
},_doResize:function(args){
if(args!=null&&args.h!=null&&args.h>10){
if(this._previouseHeight!=args.h){
if(this.resizeDelay>0){
if(this._resizeDelayHandler!=null){
this._resizeDelayHandler.remove();
}
this._previouseHeight=args.h;
this._toolTipDialogExpand.hide(this._expandButton.domNode);
var cb=lang.hitch(this,function(){
this._callRepositionButtons();
});
this._resizeDelayHandler=this.defer(cb,this.resizeDelay);
}else{
this._callRepositionButtons();
}
}
}
},_callRepositionButtons:function(){
if(this._resizeCurentStatus==this._resizeStatusNotInUse){
this._positionButtonDuringResize();
}else{
this._resizeCurentStatus==this._resizeStatusQue;
}
},_positionButtonDuringResize:function(){
this._resizeCurentStatus=this._resizeStatusResizeing;
if(this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length>0&&this.get("ContainerHeight")<this._listWrapper.get("ContainerHeight")){
this._addExpandButton(this._listWrapper.get("ItemCount"));
var _1f8=1;
while((this.get("ContainerHeight")<this._listWrapper.get("ContainerHeight"))&&this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length>0){
if(_1f8==2&&this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length==1){
_1f8=1;
}
var _1f9=this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length-_1f8;
var _1fa=this._menuPaneButtonIndexer.getButtonPrimary(_1f9);
if(_1fa.button.get("checked")&&this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length>1){
_1f8=2;
console.info(_1f9+" : I am checked *************************  = "+_1fa.button.get("checked"));
}else{
console.info("selected = "+_1fa.button.get("checked"));
this._menuPaneButtonIndexer.swapButtonContainerToContainer(true,_1f9,0);
this._toolTipDialogExpandContentsListWrapper.set("item",_1fa.button,"first");
this._listWrapper.deleteChild(_1f9);
this._menuPaneButtonIndexer.expandButtonDisplayIndex--;
if(_1f8==2){
if(this._menuPaneButtonIndexer.selectedButtonDisplayIndex!=0){
this._menuPaneButtonIndexer.selectedButtonDisplayIndex--;
}else{
}
}
}
}
console.info("Move from main to popup-----------------");
}else{
if(this._menuPaneButtonIndexer._buttonSecondaryContainerArray.length>0&&this.get("ContainerHeight")>this._listWrapper.get("ContainerHeight")){
console.info(" secondary container size = "+this._menuPaneButtonIndexer._buttonSecondaryContainerArray.length);
console.info("Move from popup to main****************");
var _1fb=true;
while(_1fb&&this._menuPaneButtonIndexer._buttonSecondaryContainerArray.length>0){
var _1fc=0;
var item=this._menuPaneButtonIndexer.getButtonSecondary(_1fc);
if(item!=null&&(this.get("ContainerHeight")-this._listWrapper.get("ContainerHeight"))>item.contextBox.h){
var _1fd=this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length;
if(this._menuPaneButtonIndexer.expandButtonDisplayIndex!=-1){
this._menuPaneButtonIndexer.expandButtonDisplayIndex++;
if(this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length>0){
var _1fe=this._menuPaneButtonIndexer.getButtonPrimary(this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length-1);
if(_1fe.button.get("checked")&&_1fe.displayOrderOrginaleIndex>=_1fd){
if(_1fd!=0){
_1fd--;
}
this._menuPaneButtonIndexer.selectedButtonDisplayIndex++;
}
}
}
this._menuPaneButtonIndexer.swapButtonContainerToContainer(false,0,_1fd);
this._listWrapper.set("item",item.button,_1fd);
this._toolTipDialogExpandContentsListWrapper.deleteChild(_1fc);
if(this._menuPaneButtonIndexer.expandButtonDisplayIndex!=-1&&this._menuPaneButtonIndexer._buttonSecondaryContainerArray.length<=0){
this._removeExpandButton();
}
}else{
_1fb=false;
}
}
}else{
}
}
if(this._resizeCurentStatus<=this._resizeStatusResizeing){
this._resizeCurentStatus=this._resizeStatusNotInUse;
}else{
this._positionButtonDuringResize.apply(this);
}
},_buttonSelected:function(_1ff,_200){
this._toolTipDialogExpand.hide(this._expandButton.domNode);
var _201;
if(this._menuPaneButtonIndexer.getButton(_1ff.key)!=null){
_201=this._menuPaneButtonIndexer.getButton(_1ff.key);
}else{
if(this._menuPaneButtonIndexer.getSubPagePrimaryPage(_1ff.key)!=null){
var _202=this._menuPaneButtonIndexer.getSubPagePrimaryPage(_1ff.key);
_201=this._menuPaneButtonIndexer.getButton(_202);
}else{
throw new Error("state unknow for requested selected button : "+_1ff.key);
}
}
_201.button.set("checked",true);
this._onSelectBefore(_1ff);
this._positionSelectedButton(_201);
if(this._menuPaneButtonIndexer._buttonSecondaryContainerArray.length>0){
this._previouseHeight++;
this._callRepositionButtons();
}
this._onSelectAfter(_1ff);
},_positionSelectedButton:function(_203){
if(this._menuPaneButtonIndexer.selectedButtonDisplayIndex!=-1){
var _204=this._menuPaneButtonIndexer.getButton(this._menuPaneButtonIndexer.selectedButtonKey);
var _205=_204.displayOrderOrginaleIndex;
if(this._menuPaneButtonIndexer.selectedButtonDisplayIndex!=_205){
if(this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length>0){
var _206=_205-(this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length-1);
var _207=this._menuPaneButtonIndexer.getButtonSecondary(0);
this._menuPaneButtonIndexer.swapButtonContainerToContainer(true,this._menuPaneButtonIndexer.selectedButtonDisplayIndex,_206);
this._toolTipDialogExpandContentsListWrapper.set("item",_204.button,_206);
this._listWrapper.deleteChild(this._menuPaneButtonIndexer.selectedButtonDisplayIndex);
this._menuPaneButtonIndexer.swapButtonContainerToContainer(false,0,this._menuPaneButtonIndexer.selectedButtonDisplayIndex);
this._listWrapper.set("item",_207.button,this._menuPaneButtonIndexer.selectedButtonDisplayIndex);
this._toolTipDialogExpandContentsListWrapper.deleteChild(0);
this._menuPaneButtonIndexer.selectedButtonDisplayIndex=-1;
this._menuPaneButtonIndexer.selectedButtonKey=-1;
}else{
var _206=_204.displayOrderOrginaleIndex;
this._menuPaneButtonIndexer.swapButtonContainerItemIndex(false,0,_206);
this._toolTipDialogExpandContentsListWrapper.set("item",_204.button,_206+1);
this._toolTipDialogExpandContentsListWrapper.deleteChild(0);
this._menuPaneButtonIndexer.selectedButtonDisplayIndex=-1;
this._menuPaneButtonIndexer.selectedButtonKey=-1;
}
}else{
console.info("no need to repostion old selected button");
this._menuPaneButtonIndexer.selectedButtonDisplayIndex=-1;
}
}
var _205=_203.displayOrderOrginaleIndex;
if(this._menuPaneButtonIndexer.getWhichContinerFromIndex(_205)==1){
if(this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length>0){
var _208=_205-(this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length);
var _209=this._menuPaneButtonIndexer.getButtonPrimary(this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length-1);
this._menuPaneButtonIndexer.swapButtonContainerToContainer(true,this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length-1,0);
this._toolTipDialogExpandContentsListWrapper.set("item",_209.button,0);
this._listWrapper.deleteChild(this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length);
this._menuPaneButtonIndexer.swapButtonContainerToContainer(false,_208+1,this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length);
this._listWrapper.set("item",_203.button,this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length-1);
this._toolTipDialogExpandContentsListWrapper.deleteChild(_208+1);
this._menuPaneButtonIndexer.selectedButtonDisplayIndex=this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length-1;
this._menuPaneButtonIndexer.selectedButtonKey=_203.key;
}else{
this._menuPaneButtonIndexer.swapButtonContainerItemIndex(false,_205,0);
this._toolTipDialogExpandContentsListWrapper.set("item",_203.button,0);
this._toolTipDialogExpandContentsListWrapper.deleteChild(_205+1);
this._menuPaneButtonIndexer.selectedButtonDisplayIndex=0;
this._menuPaneButtonIndexer.selectedButtonKey=_203.key;
}
}else{
this._menuPaneButtonIndexer.selectedButtonDisplayIndex=_205;
this._menuPaneButtonIndexer.selectedButtonKey=_203.key;
console.info("no need to repostion New selected button :"+_205+" key = "+_203.key);
}
},_placeMenuItems:function(item,_20a){
if(this._menuPaneButtonIndexer.expandButtonDisplayIndex==-1&&(this.get("ContainerHeight")-this._listWrapper.get("ContainerHeight"))>(this._expandButtonContentBox.h+item.contextBox.h)){
this._listWrapper.set("item",item.button);
}else{
if(this._menuPaneButtonIndexer.expandButtonDisplayIndex==-1){
this._menuPaneButtonIndexer.expandButtonDisplayIndex=_20a;
_1bc.remove(this._expandButton.domNode,"dijitHidden");
this._listWrapper.set("item",this._expandButton);
}
this._toolTipDialogExpandContentsListWrapper.set("item",item.button);
}
},_getContainerHeightAttr:function(){
var _20b=_1c5.getContentBox(this.containerNode);
return _20b.h;
},_setWidthAttr:function(_20c){
if(this._showing){
}else{
this._showAnim.properties.width=_20c;
this._showSize=_20c;
this._currentSize.w=_20c;
}
},_removeButtonCacheContent:function(){
for(var key in this._menuPaneButtonIndexer._buttonMap){
var _20d=this._menuPaneButtonIndexer.getButton(key);
if(_20d.button){
_20d.button.destroy();
}
delete _20d.button;
delete _20d.contextBox;
delete _20d.displayOrderIndex;
delete _20d.displayOrderOrginaleIndex;
delete _20d.id;
delete _20d.key;
delete _20d;
delete this._menuPaneButtonIndexer._buttonMap[key];
}
},destroy:function(){
try{
this._resizeCurentStatus=this._resizeStatusNotInUse;
this._resizeDelayHandler!=null?this._resizeDelayHandler.remove():null;
this._resizeResizeHandler.remove();
this._showEndresizeResizeHandler.remove();
this._hideEndResizeHandler.remove();
this._expandButton.destroy();
this._removeButtonCacheContent();
this._toolTipDialogExpandContentsListWrapper.destroy();
this._toolTipDialogExpand.destroy();
this._listWrapper.destroy();
delete this._menuPaneButtonIndexer;
}
catch(err){
console.error(err);
}
this.inherited(arguments);
}});
});
},"dijit/focus":function(){
define("dijit/focus",["dojo/aspect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/Evented","dojo/_base/lang","dojo/on","dojo/ready","dojo/_base/sniff","dojo/Stateful","dojo/_base/unload","dojo/_base/window","dojo/window","./a11y","./registry","."],function(_20e,_20f,dom,_210,_211,_212,lang,on,_213,has,_214,_215,win,_216,a11y,_217,_218){
var _219=_20f([_214,_212],{curNode:null,activeStack:[],constructor:function(){
var _21a=lang.hitch(this,function(node){
if(dom.isDescendant(this.curNode,node)){
this.set("curNode",null);
}
if(dom.isDescendant(this.prevNode,node)){
this.set("prevNode",null);
}
});
_20e.before(_211,"empty",_21a);
_20e.before(_211,"destroy",_21a);
},registerIframe:function(_21b){
return this.registerWin(_21b.contentWindow,_21b);
},registerWin:function(_21c,_21d){
var _21e=this;
var _21f=function(evt){
_21e._justMouseDowned=true;
setTimeout(function(){
_21e._justMouseDowned=false;
},0);
if(has("ie")&&evt&&evt.srcElement&&evt.srcElement.parentNode==null){
return;
}
_21e._onTouchNode(_21d||evt.target||evt.srcElement,"mouse");
};
var doc=has("ie")?_21c.document.documentElement:_21c.document;
if(doc){
if(has("ie")){
_21c.document.body.attachEvent("onmousedown",_21f);
var _220=function(evt){
var tag=evt.srcElement.tagName.toLowerCase();
if(tag=="#document"||tag=="body"){
return;
}
if(a11y.isTabNavigable(evt.srcElement)){
_21e._onFocusNode(_21d||evt.srcElement);
}else{
_21e._onTouchNode(_21d||evt.srcElement);
}
};
doc.attachEvent("onactivate",_220);
var _221=function(evt){
_21e._onBlurNode(_21d||evt.srcElement);
};
doc.attachEvent("ondeactivate",_221);
return {remove:function(){
_21c.document.detachEvent("onmousedown",_21f);
doc.detachEvent("onactivate",_220);
doc.detachEvent("ondeactivate",_221);
doc=null;
}};
}else{
doc.body.addEventListener("mousedown",_21f,true);
doc.body.addEventListener("touchstart",_21f,true);
var _222=function(evt){
_21e._onFocusNode(_21d||evt.target);
};
doc.addEventListener("focus",_222,true);
var _223=function(evt){
_21e._onBlurNode(_21d||evt.target);
};
doc.addEventListener("blur",_223,true);
return {remove:function(){
doc.body.removeEventListener("mousedown",_21f,true);
doc.body.removeEventListener("touchstart",_21f,true);
doc.removeEventListener("focus",_222,true);
doc.removeEventListener("blur",_223,true);
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
var _224=[];
try{
while(node){
var _225=_210.get(node,"dijitPopupParent");
if(_225){
node=_217.byId(_225).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===win.body()){
break;
}
node=_216.get(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId"),_226=id&&_217.byId(id);
if(_226&&!(by=="mouse"&&_226.get("disabled"))){
_224.unshift(id);
}
node=node.parentNode;
}
}
}
}
catch(e){
}
this._setStack(_224,by);
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
},_setStack:function(_227,by){
var _228=this.activeStack;
this.set("activeStack",_227);
for(var _229=0;_229<Math.min(_228.length,_227.length);_229++){
if(_228[_229]!=_227[_229]){
break;
}
}
var _22a;
for(var i=_228.length-1;i>=_229;i--){
_22a=_217.byId(_228[i]);
if(_22a){
_22a._hasBeenBlurred=true;
_22a.set("focused",false);
if(_22a._focusManager==this){
_22a._onBlur(by);
}
this.emit("widget-blur",_22a,by);
}
}
for(i=_229;i<_227.length;i++){
_22a=_217.byId(_227[i]);
if(_22a){
_22a.set("focused",true);
if(_22a._focusManager==this){
_22a._onFocus(by);
}
this.emit("widget-focus",_22a,by);
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
var _22b=new _219();
_213(function(){
var _22c=_22b.registerWin(win.doc.parentWindow||win.doc.defaultView);
if(has("ie")){
_215.addOnWindowUnload(function(){
_22c.remove();
_22c=null;
});
}
});
_218.focus=function(node){
_22b.focus(node);
};
for(var attr in _22b){
if(!/^_/.test(attr)){
_218.focus[attr]=typeof _22b[attr]=="function"?lang.hitch(_22b,attr):_22b[attr];
}
}
_22b.watch(function(attr,_22d,_22e){
_218.focus[attr]=_22e;
});
return _22b;
});
},"dojo/i18n":function(){
define("dojo/i18n",["./_base/kernel","require","./has","./_base/array","./_base/config","./_base/lang","./_base/xhr","./json"],function(dojo,_22f,has,_230,_231,lang,xhr,json){
true||has.add("dojo-preload-i18n-Api",1);
true||has.add("dojo-v1x-i18n-Api",1);
var _232=dojo.i18n={},_233=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,_234=function(root,_235,_236,_237){
for(var _238=[_236+_237],_239=_235.split("-"),_23a="",i=0;i<_239.length;i++){
_23a+=(_23a?"-":"")+_239[i];
if(!root||root[_23a]){
_238.push(_236+_23a+"/"+_237);
}
}
return _238;
},_23b={},_23c=dojo.getL10nName=function(_23d,_23e,_23f){
_23f=_23f?_23f.toLowerCase():dojo.locale;
_23d="dojo/i18n!"+_23d.replace(/\./g,"/");
_23e=_23e.replace(/\./g,"/");
return (/root/i.test(_23f))?(_23d+"/nls/"+_23e):(_23d+"/nls/"+_23f+"/"+_23e);
},_240=function(_241,_242,_243,_244,_245,load){
_241([_242],function(root){
var _246=lang.clone(root.root),_247=_234(!root._v1x&&root,_245,_243,_244);
_241(_247,function(){
for(var i=1;i<_247.length;i++){
_246=lang.mixin(lang.clone(_246),arguments[i]);
}
var _248=_242+"/"+_245;
_23b[_248]=_246;
load();
});
});
},_249=function(id,_24a){
return /^\./.test(id)?_24a(id):id;
},_24b=function(_24c){
var list=_231.extraLocale||[];
list=lang.isArray(list)?list:[list];
list.push(_24c);
return list;
},load=function(id,_24d,load){
if(1){
var _24e=id.split("*"),_24f=_24e[1]=="preload";
if(_24f){
if(!_23b[id]){
_23b[id]=1;
_250(_24e[2],json.parse(_24e[3]),1);
}
load(1);
}
if(_24f||_251(id,_24d,load)){
return;
}
}
var _252=_233.exec(id),_253=_252[1]+"/",_254=_252[5]||_252[4],_255=_253+_254,_256=(_252[5]&&_252[4]),_257=_256||dojo.locale,_258=_255+"/"+_257,_259=_256?[_257]:_24b(_257),_25a=_259.length,_25b=function(){
if(!--_25a){
load(lang.delegate(_23b[_258]));
}
};
_230.forEach(_259,function(_25c){
var _25d=_255+"/"+_25c;
if(1){
_25e(_25d);
}
if(!_23b[_25d]){
_240(_24d,_255,_253,_254,_25c,_25b);
}else{
_25b();
}
});
};
if(has("dojo-unit-tests")){
var _25f=_232.unitTests=[];
}
if(1||1){
var _260=_232.normalizeLocale=function(_261){
var _262=_261?_261.toLowerCase():dojo.locale;
return _262=="root"?"ROOT":_262;
},isXd=function(mid){
return (1&&1)?_22f.isXdUrl(_22f.toUrl(mid+".js")):true;
},_263=0,_264=[],_250=_232._preloadLocalizations=function(_265,_266,_267){
function _268(_269,func){
var _26a=_269.split("-");
while(_26a.length){
if(func(_26a.join("-"))){
return true;
}
_26a.pop();
}
return func("ROOT");
};
function _26b(_26c){
_26c=_260(_26c);
_268(_26c,function(loc){
if(_230.indexOf(_266,loc)>=0){
var mid=_265.replace(/\./g,"/")+"_"+loc;
_263++;
(isXd(mid)||_267?_22f:_270)([mid],function(_26d){
for(var p in _26d){
_23b[p+"/"+loc]=_26d[p];
}
--_263;
while(!_263&&_264.length){
load.apply(null,_264.shift());
}
});
return true;
}
return false;
});
};
_26b();
_230.forEach(dojo.config.extraLocale,_26b);
},_251=function(id,_26e,load){
if(_263){
_264.push([id,_26e,load]);
}
return _263;
};
}
if(1){
var _26f=new Function("__bundle","__checkForLegacyModules","__mid","var define = function(){define.called = 1;},"+"    require = function(){define.called = 1;};"+"try{"+"define.called = 0;"+"eval(__bundle);"+"if(define.called==1)"+"return 1;"+"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"+"return __checkForLegacyModules;"+"}catch(e){}"+"try{"+"return eval('('+__bundle+')');"+"}catch(e){"+"return e;"+"}"),_270=function(deps,_271){
var _272=[];
_230.forEach(deps,function(mid){
var url=_22f.toUrl(mid+".js");
function load(text){
var _273=_26f(text,_25e,mid);
if(_273===1){
_22f([mid],function(_274){
_272.push(_23b[url]=_274);
});
}else{
if(_273 instanceof Error){
console.error("failed to evaluate i18n bundle; url="+url,_273);
_273={};
}
_272.push(_23b[url]=(/nls\/[^\/]+\/[^\/]+$/.test(url)?_273:{root:_273,_v1x:1}));
}
};
if(_23b[url]){
_272.push(_23b[url]);
}else{
var _275=_22f.syncLoadNls(mid);
if(_275){
_272.push(_275);
}else{
if(!xhr){
try{
_22f.getText(url,true,load);
}
catch(e){
_272.push(_23b[url]={});
}
}else{
xhr.get({url:url,sync:true,load:load,error:function(){
_272.push(_23b[url]={});
}});
}
}
}
});
_271&&_271.apply(null,_272);
},_25e=function(_276){
for(var _277,_278=_276.split("/"),_279=dojo.global[_278[0]],i=1;_279&&i<_278.length-1;_279=_279[_278[i++]]){
}
if(_279){
_277=_279[_278[i]];
if(!_277){
_277=_279[_278[i].replace(/-/g,"_")];
}
if(_277){
_23b[_276]=_277;
}
}
return _277;
};
_232.getLocalization=function(_27a,_27b,_27c){
var _27d,_27e=_23c(_27a,_27b,_27c).substring(10);
load(_27e,(!isXd(_27e)?_270:_22f),function(_27f){
_27d=_27f;
});
return _27d;
};
if(has("dojo-unit-tests")){
_25f.push(function(doh){
doh.register("tests.i18n.unit",function(t){
var _280;
_280=_26f("{prop:1}");
t.is({prop:1},_280);
t.is(undefined,_280[1]);
_280=_26f("({prop:1})");
t.is({prop:1},_280);
t.is(undefined,_280[1]);
_280=_26f("{'prop-x':1}");
t.is({"prop-x":1},_280);
t.is(undefined,_280[1]);
_280=_26f("({'prop-x':1})");
t.is({"prop-x":1},_280);
t.is(undefined,_280[1]);
_280=_26f("define({'prop-x':1})");
t.is(1,_280);
_280=_26f("this is total nonsense and should throw an error");
t.is(_280 instanceof Error,true);
});
});
}
}
return lang.mixin(_232,{dynamic:true,normalize:_249,load:load,cache:_23b});
});
},"dijit/hccss":function(){
define("dijit/hccss",["require","dojo/_base/config","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/ready","dojo/_base/sniff","dojo/_base/window"],function(_281,_282,_283,_284,_285,_286,has,win){
if(has("ie")||has("mozilla")){
_286(90,function(){
var div=_284.create("div",{id:"a11yTestNode",style:{cssText:"border: 1px solid;"+"border-color:red green;"+"position: absolute;"+"height: 5px;"+"top: -999px;"+"background-image: url(\""+(_282.blankGif||_281.toUrl("dojo/resources/blank.gif"))+"\");"}},win.body());
var cs=_285.getComputedStyle(div);
if(cs){
var _287=cs.backgroundImage;
var _288=(cs.borderTopColor==cs.borderRightColor)||(_287!=null&&(_287=="none"||_287=="url(invalid-url:)"));
if(_288){
_283.add(win.body(),"dijit_a11y");
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
},"curam/widget/menu/BannerMenuItem":function(){
define("curam/widget/menu/BannerMenuItem",["dojo","dijit/dijit","dojo/_base/declare","dijit/MenuItem"],function(dojo,_289,_28a,_28b){
return _28a("curam.widget.menu.BannerMenuItem",[_28b],{iconSrc:"unknown",_setIconSrcAttr:{node:"iconNode",type:"attribute",attribute:"src"},iconStyle:"unknown",_setIconStyleAttr:{node:"iconNode",type:"attribute",attribute:"style"}});
});
},"curam/util/LocalConfig":function(){
define("curam/util/LocalConfig",[],function(){
var _28c=function(name){
return "curam_util_LocalConfig_"+name;
},_28d=function(name,_28e){
var _28f=_28c(name);
if(typeof top[_28f]==="undefined"){
top[_28f]=_28e;
}
return top[_28f];
},_290=function(name){
return top[_28c(name)];
};
_28d("seedValues",{}),_28d("overrides",{});
var _291=function(_292,_293){
if(typeof _292!=="undefined"&&typeof _292!=="string"){
throw new Error("Invalid "+_293+" type: "+typeof _292+"; expected string");
}
};
var _294={seedOption:function(name,_295,_296){
_291(_295,"value");
_291(_296,"defaultValue");
_290("seedValues")[name]=(typeof _295!=="undefined")?_295:_296;
},overrideOption:function(name,_297){
_291(_297,"value");
if(typeof (Storage)!=="undefined"){
localStorage[name]=_297;
}else{
_290("overrides")[name]=_297;
}
},readOption:function(name,_298){
_291(_298,"defaultValue");
var _299=null;
if(typeof (Storage)!=="undefined"&&typeof localStorage[name]!=="undefined"){
_299=localStorage[name];
}else{
if(typeof _290("overrides")[name]!=="undefined"){
_299=_290("overrides")[name];
}else{
if(typeof _290("seedValues")[name]!=="undefined"){
_299=_290("seedValues")[name];
}else{
_299=_298;
}
}
}
return _299;
},clearOption:function(name){
if(typeof (Storage)!=="undefined"){
localStorage.removeItem(name);
}
delete _290("overrides")[name];
delete _290("seedValues")[name];
}};
return _294;
});
},"dijit/PopupMenuBarItem":function(){
define("dijit/PopupMenuBarItem",["dojo/_base/declare","./PopupMenuItem","./MenuBarItem"],function(_29a,_29b,_29c){
var _29d=_29c._MenuBarItemMixin;
return _29a("dijit.PopupMenuBarItem",[_29b,_29d],{});
});
},"dojo/parser":function(){
define("dojo/parser",["./_base/kernel","./_base/lang","./_base/array","./_base/config","./_base/html","./_base/window","./_base/url","./_base/json","./aspect","./date/stamp","./has","./query","./on","./ready"],function(dojo,_29e,_29f,_2a0,_2a1,_2a2,_2a3,_2a4,_2a5,_2a6,has,_2a7,don,_2a8){
new Date("X");
if(1){
var form=document.createElement("form");
has.add("dom-attributes-explicit",form.attributes.length==0);
has.add("dom-attributes-specified-flag",form.attributes.length<40);
}
dojo.parser=new function(){
var _2a9={};
function _2aa(_2ab){
var map={};
for(var name in _2ab){
if(name.charAt(0)=="_"){
continue;
}
map[name.toLowerCase()]=name;
}
return map;
};
_2a5.after(_29e,"extend",function(){
_2a9={};
},true);
var _2ac={};
function _2ad(type){
var map=_2ac[type]||(_2ac[type]={});
return map["__type"]||(map["__type"]=(_29e.getObject(type)||require(type)));
};
this._functionFromScript=function(_2ae,_2af){
var _2b0="";
var _2b1="";
var _2b2=(_2ae.getAttribute(_2af+"args")||_2ae.getAttribute("args"));
if(_2b2){
_29f.forEach(_2b2.split(/\s*,\s*/),function(part,idx){
_2b0+="var "+part+" = arguments["+idx+"]; ";
});
}
var _2b3=_2ae.getAttribute("with");
if(_2b3&&_2b3.length){
_29f.forEach(_2b3.split(/\s*,\s*/),function(part){
_2b0+="with("+part+"){";
_2b1+="}";
});
}
return new Function(_2b0+_2ae.innerHTML+_2b1);
};
this.instantiate=function(_2b4,_2b5,_2b6){
_2b5=_2b5||{};
_2b6=_2b6||{};
var _2b7=(_2b6.scope||dojo._scopeName)+"Type",_2b8="data-"+(_2b6.scope||dojo._scopeName)+"-",_2b9=_2b8+"type";
var list=[];
_29f.forEach(_2b4,function(node){
var type=_2b7 in _2b5?_2b5[_2b7]:node.getAttribute(_2b9)||node.getAttribute(_2b7);
if(type){
list.push({node:node,"type":type});
}
});
return this._instantiate(list,_2b5,_2b6);
};
this._instantiate=function(_2ba,_2bb,_2bc){
var _2bd=[];
var _2be=(_2bc.scope||dojo._scopeName)+"Type",_2bf="data-"+(_2bc.scope||dojo._scopeName)+"-",_2c0=_2bf+"type",_2c1=_2bf+"props",_2c2=_2bf+"attach-point",_2c3=_2bf+"attach-event",_2c4=_2bf+"id",_2c5=_2bf+"mixins";
var _2c6={};
_29f.forEach([_2c1,_2c0,_2be,_2c4,"jsId",_2c2,_2c3,"dojoAttachPoint","dojoAttachEvent","class","style",_2c5],function(name){
_2c6[name.toLowerCase()]=name.replace(_2bc.scope,"dojo");
});
function _2c7(type,_2c8){
return type.createSubclass&&type.createSubclass(_2c8)||type.extend.apply(type,_2c8);
};
_29f.forEach(_2ba,function(obj){
if(!obj){
return;
}
var node=obj.node,type=obj.type,_2c9=node.getAttribute(_2c5),ctor;
if(_2c9){
var map=_2ac[type];
_2c9=_2c9.replace(/ /g,"");
ctor=map&&map[_2c9];
if(!ctor){
ctor=_2ad(type);
ctor=_2ac[type][_2c9]=_2c7(ctor,_29f.map(_2c9.split(","),_2ad));
}
}else{
ctor=_2ad(type);
}
var _2ca=ctor&&ctor.prototype;
var _2cb={};
if(_2bc.defaults){
_29e.mixin(_2cb,_2bc.defaults);
}
if(obj.inherited){
_29e.mixin(_2cb,obj.inherited);
}
var _2cc;
if(has("dom-attributes-explicit")){
_2cc=node.attributes;
}else{
if(has("dom-attributes-specified-flag")){
_2cc=_29f.filter(node.attributes,function(a){
return a.specified;
});
}else{
var _2cd=/^input$|^img$/i.test(node.nodeName)?node:node.cloneNode(false),_2ce=_2cd.outerHTML.replace(/=[^\s"']+|="[^"]*"|='[^']*'/g,"").replace(/^\s*<[a-zA-Z0-9]*\s*/,"").replace(/\s*>.*$/,"");
_2cc=_29f.map(_2ce.split(/\s+/),function(name){
var _2cf=name.toLowerCase();
return {name:name,value:(node.nodeName=="LI"&&name=="value")||_2cf=="enctype"?node.getAttribute(_2cf):node.getAttributeNode(_2cf).value};
});
}
}
var i=0,item;
while(item=_2cc[i++]){
var name=item.name,_2d0=name.toLowerCase(),_2d1=item.value;
if(_2d0 in _2c6){
switch(_2c6[_2d0]){
case "data-dojo-props":
var _2d2=_2d1;
break;
case "data-dojo-id":
case "jsId":
var _2d3=_2d1;
break;
case "data-dojo-attach-point":
case "dojoAttachPoint":
_2cb.dojoAttachPoint=_2d1;
break;
case "data-dojo-attach-event":
case "dojoAttachEvent":
_2cb.dojoAttachEvent=_2d1;
break;
case "class":
_2cb["class"]=node.className;
break;
case "style":
_2cb["style"]=node.style&&node.style.cssText;
break;
}
}else{
if(!(name in _2ca)){
var map=(_2a9[type]||(_2a9[type]=_2aa(_2ca)));
name=map[_2d0]||name;
}
if(name in _2ca){
switch(typeof _2ca[name]){
case "string":
_2cb[name]=_2d1;
break;
case "number":
_2cb[name]=_2d1.length?Number(_2d1):NaN;
break;
case "boolean":
_2cb[name]=_2d1.toLowerCase()!="false";
break;
case "function":
if(_2d1===""||_2d1.search(/[^\w\.]+/i)!=-1){
_2cb[name]=new Function(_2d1);
}else{
_2cb[name]=_29e.getObject(_2d1,false)||new Function(_2d1);
}
break;
default:
var pVal=_2ca[name];
_2cb[name]=(pVal&&"length" in pVal)?(_2d1?_2d1.split(/\s*,\s*/):[]):(pVal instanceof Date)?(_2d1==""?new Date(""):_2d1=="now"?new Date():_2a6.fromISOString(_2d1)):(pVal instanceof dojo._Url)?(dojo.baseUrl+_2d1):_2a4.fromJson(_2d1);
}
}else{
_2cb[name]=_2d1;
}
}
}
if(_2d2){
try{
_2d2=_2a4.fromJson.call(_2bc.propsThis,"{"+_2d2+"}");
_29e.mixin(_2cb,_2d2);
}
catch(e){
throw new Error(e.toString()+" in data-dojo-props='"+_2d2+"'");
}
}
_29e.mixin(_2cb,_2bb);
var _2d4=obj.scripts||(ctor&&(ctor._noScript||_2ca._noScript)?[]:_2a7("> script[type^='dojo/']",node));
var _2d5=[],_2d6=[],_2d7=[],on=[];
if(_2d4){
for(i=0;i<_2d4.length;i++){
var _2d8=_2d4[i];
node.removeChild(_2d8);
var _2d9=(_2d8.getAttribute(_2bf+"event")||_2d8.getAttribute("event")),prop=_2d8.getAttribute(_2bf+"prop"),_2da=_2d8.getAttribute("type"),nf=this._functionFromScript(_2d8,_2bf);
if(_2d9){
if(_2da=="dojo/connect"){
_2d5.push({event:_2d9,func:nf});
}else{
if(_2da=="dojo/on"){
on.push({event:_2d9,func:nf});
}else{
_2cb[_2d9]=nf;
}
}
}else{
if(_2da=="dojo/watch"){
_2d7.push({prop:prop,func:nf});
}else{
_2d6.push(nf);
}
}
}
}
var _2db=ctor.markupFactory||_2ca.markupFactory;
var _2dc=_2db?_2db(_2cb,node,ctor):new ctor(_2cb,node);
_2bd.push(_2dc);
if(_2d3){
_29e.setObject(_2d3,_2dc);
}
for(i=0;i<_2d5.length;i++){
_2a5.after(_2dc,_2d5[i].event,dojo.hitch(_2dc,_2d5[i].func),true);
}
for(i=0;i<_2d6.length;i++){
_2d6[i].call(_2dc);
}
for(i=0;i<_2d7.length;i++){
_2dc.watch(_2d7[i].prop,_2d7[i].func);
}
for(i=0;i<on.length;i++){
don(_2dc,on[i].event,on[i].func);
}
},this);
if(!_2bb._started){
_29f.forEach(_2bd,function(_2dd){
if(!_2bc.noStart&&_2dd&&_29e.isFunction(_2dd.startup)&&!_2dd._started){
_2dd.startup();
}
});
}
return _2bd;
};
this.scan=function(root,_2de){
var list=[];
var _2df=(_2de.scope||dojo._scopeName)+"Type",_2e0="data-"+(_2de.scope||dojo._scopeName)+"-",_2e1=_2e0+"type",_2e2=_2e0+"textdir";
var node=root.firstChild;
var _2e3=_2de.inherited;
if(!_2e3){
function _2e4(node,attr){
return (node.getAttribute&&node.getAttribute(attr))||(node!==_2a2.doc&&node!==_2a2.doc.documentElement&&node.parentNode?_2e4(node.parentNode,attr):null);
};
_2e3={dir:_2e4(root,"dir"),lang:_2e4(root,"lang"),textDir:_2e4(root,_2e2)};
for(var key in _2e3){
if(!_2e3[key]){
delete _2e3[key];
}
}
}
var _2e5={inherited:_2e3};
var _2e6;
var _2e7;
function _2e8(_2e9){
if(!_2e9.inherited){
_2e9.inherited={};
var node=_2e9.node,_2ea=_2e8(_2e9.parent);
var _2eb={dir:node.getAttribute("dir")||_2ea.dir,lang:node.getAttribute("lang")||_2ea.lang,textDir:node.getAttribute(_2e2)||_2ea.textDir};
for(var key in _2eb){
if(_2eb[key]){
_2e9.inherited[key]=_2eb[key];
}
}
}
return _2e9.inherited;
};
while(true){
if(!node){
if(!_2e5||!_2e5.node){
break;
}
node=_2e5.node.nextSibling;
_2e6=_2e5.scripts;
_2e7=false;
_2e5=_2e5.parent;
continue;
}
if(node.nodeType!=1){
node=node.nextSibling;
continue;
}
if(_2e6&&node.nodeName.toLowerCase()=="script"){
type=node.getAttribute("type");
if(type&&/^dojo\/\w/i.test(type)){
_2e6.push(node);
}
node=node.nextSibling;
continue;
}
if(_2e7){
node=node.nextSibling;
continue;
}
var type=node.getAttribute(_2e1)||node.getAttribute(_2df);
var _2ec=node.firstChild;
if(!type&&(!_2ec||(_2ec.nodeType==3&&!_2ec.nextSibling))){
node=node.nextSibling;
continue;
}
var _2ed={node:node,scripts:_2e6,parent:_2e5};
var ctor;
try{
ctor=type&&_2ad(type);
}
catch(e){
}
var _2ee=ctor&&!ctor.prototype._noScript?[]:null;
if(type){
list.push({"type":type,node:node,scripts:_2ee,inherited:_2e8(_2ed)});
}
node=_2ec;
_2e6=_2ee;
_2e7=ctor&&ctor.prototype.stopParser&&!(_2de.template);
_2e5=_2ed;
}
return list;
};
this.parse=function(_2ef,_2f0){
var root;
if(!_2f0&&_2ef&&_2ef.rootNode){
_2f0=_2ef;
root=_2f0.rootNode;
}else{
if(_2ef&&_29e.isObject(_2ef)&&!("nodeType" in _2ef)){
_2f0=_2ef;
}else{
root=_2ef;
}
}
root=root?_2a1.byId(root):_2a2.body();
_2f0=_2f0||{};
var list=this.scan(root,_2f0);
var _2f1=_2f0.template?{template:true}:{};
return this._instantiate(list,_2f1,_2f0);
};
}();
if(_2a0.parseOnLoad){
_2a8(100,dojo.parser,"parse");
}
return dojo.parser;
});
},"dojox/html/_base":function(){
define("dojox/html/_base",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/xhr","dojo/_base/window","dojo/_base/sniff","dojo/_base/url","dojo/dom-construct","dojo/html","dojo/_base/declare"],function(dojo,lang,_2f2,_2f3,has,_2f4,_2f5,_2f6){
var html=dojo.getObject("dojox.html",true);
if(has("ie")){
var _2f7=/(AlphaImageLoader\([^)]*?src=(['"]))(?![a-z]+:|\/)([^\r\n;}]+?)(\2[^)]*\)\s*[;}]?)/g;
}
var _2f8=/(?:(?:@import\s*(['"])(?![a-z]+:|\/)([^\r\n;{]+?)\1)|url\(\s*(['"]?)(?![a-z]+:|\/)([^\r\n;]+?)\3\s*\))([a-z, \s]*[;}]?)/g;
var _2f9=html._adjustCssPaths=function(_2fa,_2fb){
if(!_2fb||!_2fa){
return;
}
if(_2f7){
_2fb=_2fb.replace(_2f7,function(_2fc,pre,_2fd,url,post){
return pre+(new _2f4(_2fa,"./"+url).toString())+post;
});
}
return _2fb.replace(_2f8,function(_2fe,_2ff,_300,_301,_302,_303){
if(_300){
return "@import \""+(new _2f4(_2fa,"./"+_300).toString())+"\""+_303;
}else{
return "url("+(new _2f4(_2fa,"./"+_302).toString())+")"+_303;
}
});
};
var _304=/(<[a-z][a-z0-9]*\s[^>]*)(?:(href|src)=(['"]?)([^>]*?)\3|style=(['"]?)([^>]*?)\5)([^>]*>)/gi;
var _305=html._adjustHtmlPaths=function(_306,cont){
var url=_306||"./";
return cont.replace(_304,function(tag,_307,name,_308,_309,_30a,_30b,end){
return _307+(name?(name+"="+_308+(new _2f4(url,_309).toString())+_308):("style="+_30a+_2f9(url,_30b)+_30a))+end;
});
};
var _30c=html._snarfStyles=function(_30d,cont,_30e){
_30e.attributes=[];
return cont.replace(/(?:<style([^>]*)>([\s\S]*?)<\/style>|<link\s+(?=[^>]*rel=['"]?stylesheet)([^>]*?href=(['"])([^>]*?)\4[^>\/]*)\/?>)/gi,function(_30f,_310,_311,_312,_313,href){
var i,attr=(_310||_312||"").replace(/^\s*([\s\S]*?)\s*$/i,"$1");
if(_311){
i=_30e.push(_30d?_2f9(_30d,_311):_311);
}else{
i=_30e.push("@import \""+href+"\";");
attr=attr.replace(/\s*(?:rel|href)=(['"])?[^\s]*\1\s*/gi,"");
}
if(attr){
attr=attr.split(/\s+/);
var _314={},tmp;
for(var j=0,e=attr.length;j<e;j++){
tmp=attr[j].split("=");
_314[tmp[0]]=tmp[1].replace(/^\s*['"]?([\s\S]*?)['"]?\s*$/,"$1");
}
_30e.attributes[i-1]=_314;
}
return "";
});
};
var _315=html._snarfScripts=function(cont,_316){
_316.code="";
cont=cont.replace(/<[!][-][-](.|\s)*?[-][-]>/g,function(_317){
return _317.replace(/<(\/?)script\b/ig,"&lt;$1Script");
});
function _318(src){
if(_316.downloadRemote){
src=src.replace(/&([a-z0-9#]+);/g,function(m,name){
switch(name){
case "amp":
return "&";
case "gt":
return ">";
case "lt":
return "<";
default:
return name.charAt(0)=="#"?String.fromCharCode(name.substring(1)):"&"+name+";";
}
});
_2f2.get({url:src,sync:true,load:function(code){
_316.code+=code+";";
},error:_316.errBack});
}
};
return cont.replace(/<script\s*(?![^>]*type=['"]?(?:dojo\/|text\/html\b))(?:[^>]*?(?:src=(['"]?)([^>]*?)\1[^>]*)?)*>([\s\S]*?)<\/script>/gi,function(_319,_31a,src,code){
if(src){
_318(src);
}else{
_316.code+=code;
}
return "";
});
};
var _31b=html.evalInGlobal=function(code,_31c){
_31c=_31c||_2f3.doc.body;
var n=_31c.ownerDocument.createElement("script");
n.type="text/javascript";
_31c.appendChild(n);
n.text=code;
};
html._ContentSetter=dojo.declare(_2f6._ContentSetter,{adjustPaths:false,referencePath:".",renderStyles:false,executeScripts:false,scriptHasHooks:false,scriptHookReplacement:null,_renderStyles:function(_31d){
this._styleNodes=[];
var st,att,_31e,doc=this.node.ownerDocument;
var head=doc.getElementsByTagName("head")[0];
for(var i=0,e=_31d.length;i<e;i++){
_31e=_31d[i];
att=_31d.attributes[i];
st=doc.createElement("style");
st.setAttribute("type","text/css");
for(var x in att){
st.setAttribute(x,att[x]);
}
this._styleNodes.push(st);
head.appendChild(st);
if(st.styleSheet){
st.styleSheet.cssText=_31e;
}else{
st.appendChild(doc.createTextNode(_31e));
}
}
},empty:function(){
this.inherited("empty",arguments);
this._styles=[];
},onBegin:function(){
this.inherited("onBegin",arguments);
var cont=this.content,node=this.node;
var _31f=this._styles;
if(lang.isString(cont)){
if(this.adjustPaths&&this.referencePath){
cont=_305(this.referencePath,cont);
}
if(this.renderStyles||this.cleanContent){
cont=_30c(this.referencePath,cont,_31f);
}
if(this.executeScripts){
var _320=this;
var _321={downloadRemote:true,errBack:function(e){
_320._onError.call(_320,"Exec","Error downloading remote script in \""+_320.id+"\"",e);
}};
cont=_315(cont,_321);
this._code=_321.code;
}
}
this.content=cont;
},onEnd:function(){
var code=this._code,_322=this._styles;
if(this._styleNodes&&this._styleNodes.length){
while(this._styleNodes.length){
_2f5.destroy(this._styleNodes.pop());
}
}
if(this.renderStyles&&_322&&_322.length){
this._renderStyles(_322);
}
if(this.executeScripts&&code){
if(this.cleanContent){
code=code.replace(/(<!--|(?:\/\/)?-->|<!\[CDATA\[|\]\]>)/g,"");
}
if(this.scriptHasHooks){
code=code.replace(/_container_(?!\s*=[^=])/g,this.scriptHookReplacement);
}
try{
_31b(code,this.node);
}
catch(e){
this._onError("Exec","Error eval script in "+this.id+", "+e.message,e);
}
}
this.inherited("onEnd",arguments);
},tearDown:function(){
this.inherited(arguments);
delete this._styles;
if(this._styleNodes&&this._styleNodes.length){
while(this._styleNodes.length){
_2f5.destroy(this._styleNodes.pop());
}
}
delete this._styleNodes;
dojo.mixin(this,html._ContentSetter.prototype);
}});
html.set=function(node,cont,_323){
if(!_323){
return _2f6._setNodeContent(node,cont,true);
}else{
var op=new html._ContentSetter(dojo.mixin(_323,{content:cont,node:node}));
return op.set();
}
};
return html;
});
},"url:dijit/form/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n","curam/widget/OptimalBrowserMessage":function(){
require({cache:{"url:curam/widget/templates/OptimalBrowserMessage.html":"<div>\n  <div class=\"hidden\"\n       data-dojo-type=\"dojox/layout/ContentPane\"\n       data-dojo-attach-point=\"_optimalMessage\">\n  </div>\n</div>\n"}});
define("curam/widget/OptimalBrowserMessage",["dojo/_base/declare","dojo/_base/lang","curam/util","curam/util/UIMFragment","curam/ui/ClientDataAccessor","dijit/_Widget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/form/Button","dojo/text!curam/widget/templates/OptimalBrowserMessage.html"],function(_324,lang,util,_325,_326,_327,_328,_329,_32a,_32b,_32c,_32d){
return _324("curam.widget.OptimalBrowserMessage",[_327,_328,_329],{OPTIMAL_BROWSER_MSG:"optimal-browser-msg",isExternalApp:null,optimalBrowserMsgPaddingCSS:"optimal-browser-banner",optimalBrowserNode:null,appSectionsNode:null,appBannerHeaderNode:null,intApp:"internal",extApp:"external",context:null,templateString:_32d,widgetsInTemplate:true,baseClass:"",optimalBrowserNodeID:"_optimalMessage",_appConfig:null,postMixInProperties:function(){
this.inherited(arguments);
},startup:function(){
this.inherited(arguments);
this._init();
this._loadNodes(this._optimalMessage.id);
},_init:function(){
da=new _326();
da.getRaw("/config/tablayout/settings["+curam.config.appID+"]",lang.hitch(this,function(data){
console.log("External App config data:"+data);
this._appConfig=data;
this._getAppConfig();
}),function(_32e,args){
console.log("External App config data load error:"+_32e);
},null);
},_getAppConfig:function(){
var _32f=this._appConfig.optimalBrowserMessageEnabled;
var _330=util.getTopmostWindow().dojox;
var _331=this._createStorageKey(this.OPTIMAL_BROWSER_MSG);
var _332=this;
var _333=false;
if(_32f=="true"|_32f=="TRUE"){
util.runStorageFn(function(){
_333=true;
_332.context=_330;
return _332._isOptimalBrowserCheckDue(_330,_331,_332);
});
if(!_333){
return this._isOptimalBrowserCheckDue(this.context,_331,_332);
}
}
return false;
},_isOptimalBrowserCheckDue:function(_334,_335,_336){
if(_334!=undefined){
var _337=_334.storage.get(_335);
if(_337&&_337!=""){
if(new Date(_336._getTargetDate())>new Date(_337)){
_336._executeBrowserVersionCheck(_334);
return true;
}
}else{
_336._executeBrowserVersionCheck(_334);
return true;
}
return false;
}
},_executeBrowserVersionCheck:function(_338){
var _339=this._appConfig.ieMinVersion;
var _33a=this._appConfig.ieMaxVersion;
var _33b=this._appConfig.ffMinVersion;
var _33c=this._appConfig.ffMaxVersion;
var _33d=this._appConfig.chromeMinVersion;
var _33e=this._appConfig.chromeMaxVersion;
var _33f=this._appConfig.safariMinVersion;
var _340=this._appConfig.safariMaxVersion;
var _341=dojo.isIE;
var _342=dojo.isFF;
var _343=dojo.isChrome;
var _344=dojo.isSafari;
if(_341!=undefined){
return this._isCurrentBrowserVerSupported(_338,_341,_339,_33a);
}else{
if(_342!=undefined&&this.isExternalApp){
return this._isCurrentBrowserVerSupported(_338,_342,_33b,_33c);
}else{
if(_343!=undefined){
return this._isCurrentBrowserVerSupported(_338,_343,_33d,_33e);
}else{
if(_344!=undefined&&this.isExternalApp){
return this._isCurrentBrowserVerSupported(_338,_344,_33f,_340);
}
}
}
}
return false;
},_isCurrentBrowserVerSupported:function(_345,_346,_347,_348){
var _349=false;
if(_347>0){
if(_346<_347){
_349=true;
this._displayOptimalBrowserMsg(_345);
return true;
}
}
if(_348>0&&!_349){
if(_346>_348){
this._displayOptimalBrowserMsg(_345);
return true;
}
}
return false;
},_displayOptimalBrowserMsg:function(_34a){
this._addOrRemoveCssForInternalApp(true,this.optimalBrowserMsgPaddingCSS);
_325.get({url:"optimal-browser-msg-fragment.jspx",targetID:this._optimalMessage.id});
this._postRenderingTasks(_34a);
},_postRenderingTasks:function(_34b){
var _34c=this._optimalMessage.id;
dojo.addOnLoad(function(){
var _34d=dojo.byId(_34c);
dojo.removeClass(_34d,_34d.className);
});
if(_34b.storage!=undefined){
_34b.storage.put(this._createStorageKey(this.OPTIMAL_BROWSER_MSG),this._getTargetDate(this._appConfig.nextBrowserCheck));
}
return _34b;
},_loadNodes:function(_34e){
dojo.addOnLoad(function(){
this.optimalBrowserNode=dojo.byId(_34e);
this.appSectionsNode=dojo.byId("app-sections-container-dc");
this.appBannerHeaderNode=dojo.byId("app-header-container-dc");
});
},_createStorageKey:function(_34f){
if(this.isExternalApp){
_34f=_34f+"_"+this.extApp;
}else{
_34f=_34f+"_"+this.intApp;
}
return _34f;
},_addOrRemoveCssForInternalApp:function(_350,_351){
var _352=this.isExternalApp;
dojo.addOnLoad(function(){
if(!_352){
if(_350){
dojo.addClass(this.appSectionsNode,_351);
if(this.appBannerHeaderNode){
dojo.addClass(this.appSectionsNode.children.item(1),_351);
dojo.addClass(this.appSectionsNode.children.item(2),_351);
}
}else{
dojo.removeClass(this.appSectionsNode,_351);
if(this.appBannerHeaderNode){
dojo.removeClass(this.appSectionsNode.children.item(1),_351);
dojo.removeClass(this.appSectionsNode.children.item(2),_351);
}
}
}
});
},_getTargetDate:function(_353){
var _354=new Date();
if(_353==undefined){
_354.setDate(_354.getDate());
}else{
_354.setDate(_354.getDate()+_353);
}
return _354.toUTCString();
},exitOptimalBrowserMessageBox:function(){
var _355=dojo.byId(this._optimalMessage.id);
if(_355){
_355.parentNode.removeChild(_355);
}
this._addOrRemoveCssForInternalApp(false,this.optimalBrowserMsgPaddingCSS);
}});
});
},"dijit/form/ToggleButton":function(){
define("dijit/form/ToggleButton",["dojo/_base/declare","dojo/_base/kernel","./Button","./_ToggleButtonMixin"],function(_356,_357,_358,_359){
return _356("dijit.form.ToggleButton",[_358,_359],{baseClass:"dijitToggleButton",setChecked:function(_35a){
_357.deprecated("setChecked("+_35a+") is deprecated. Use set('checked',"+_35a+") instead.","","2.0");
this.set("checked",_35a);
}});
});
},"dojo/date/stamp":function(){
define("dojo/date/stamp",["../_base/kernel","../_base/lang","../_base/array"],function(dojo,lang,_35b){
lang.getObject("date.stamp",true,dojo);
dojo.date.stamp.fromISOString=function(_35c,_35d){
if(!dojo.date.stamp._isoRegExp){
dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
}
var _35e=dojo.date.stamp._isoRegExp.exec(_35c),_35f=null;
if(_35e){
_35e.shift();
if(_35e[1]){
_35e[1]--;
}
if(_35e[6]){
_35e[6]*=1000;
}
if(_35d){
_35d=new Date(_35d);
_35b.forEach(_35b.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(prop){
return _35d["get"+prop]();
}),function(_360,_361){
_35e[_361]=_35e[_361]||_360;
});
}
_35f=new Date(_35e[0]||1970,_35e[1]||0,_35e[2]||1,_35e[3]||0,_35e[4]||0,_35e[5]||0,_35e[6]||0);
if(_35e[0]<100){
_35f.setFullYear(_35e[0]||1970);
}
var _362=0,_363=_35e[7]&&_35e[7].charAt(0);
if(_363!="Z"){
_362=((_35e[8]||0)*60)+(Number(_35e[9])||0);
if(_363!="-"){
_362*=-1;
}
}
if(_363){
_362-=_35f.getTimezoneOffset();
}
if(_362){
_35f.setTime(_35f.getTime()+_362*60000);
}
}
return _35f;
};
dojo.date.stamp.toISOString=function(_364,_365){
var _366=function(n){
return (n<10)?"0"+n:n;
};
_365=_365||{};
var _367=[],_368=_365.zulu?"getUTC":"get",date="";
if(_365.selector!="time"){
var year=_364[_368+"FullYear"]();
date=["0000".substr((year+"").length)+year,_366(_364[_368+"Month"]()+1),_366(_364[_368+"Date"]())].join("-");
}
_367.push(date);
if(_365.selector!="date"){
var time=[_366(_364[_368+"Hours"]()),_366(_364[_368+"Minutes"]()),_366(_364[_368+"Seconds"]())].join(":");
var _369=_364[_368+"Milliseconds"]();
if(_365.milliseconds){
time+="."+(_369<100?"0":"")+_366(_369);
}
if(_365.zulu){
time+="Z";
}else{
if(_365.selector!="time"){
var _36a=_364.getTimezoneOffset();
var _36b=Math.abs(_36a);
time+=(_36a>0?"-":"+")+_366(Math.floor(_36b/60))+":"+_366(_36b%60);
}
}
_367.push(time);
}
return _367.join("T");
};
return dojo.date.stamp;
});
},"dojo/Stateful":function(){
define("dojo/Stateful",["./_base/declare","./_base/lang","./_base/array"],function(_36c,lang,_36d){
return _36c("dojo.Stateful",null,{postscript:function(_36e){
if(_36e){
lang.mixin(this,_36e);
}
},get:function(name){
return this[name];
},set:function(name,_36f){
if(typeof name==="object"){
for(var x in name){
if(name.hasOwnProperty(x)&&x!="_watchCallbacks"){
this.set(x,name[x]);
}
}
return this;
}
var _370=this[name];
this[name]=_36f;
if(this._watchCallbacks){
this._watchCallbacks(name,_370,_36f);
}
return this;
},watch:function(name,_371){
var _372=this._watchCallbacks;
if(!_372){
var self=this;
_372=this._watchCallbacks=function(name,_373,_374,_375){
var _376=function(_377){
if(_377){
_377=_377.slice();
for(var i=0,l=_377.length;i<l;i++){
_377[i].call(self,name,_373,_374);
}
}
};
_376(_372["_"+name]);
if(!_375){
_376(_372["*"]);
}
};
}
if(!_371&&typeof name==="function"){
_371=name;
name="*";
}else{
name="_"+name;
}
var _378=_372[name];
if(typeof _378!=="object"){
_378=_372[name]=[];
}
_378.push(_371);
return {unwatch:function(){
_378.splice(_36d.indexOf(_378,_371),1);
}};
}});
});
},"dijit/form/ComboButton":function(){
require({cache:{"url:dijit/form/templates/ComboButton.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" data-dojo-attach-point=\"buttonNode\" data-dojo-attach-event=\"ondijitclick:_onClick,onkeypress:_onButtonKeyPress\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" data-dojo-attach-point=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdata-dojo-attach-point=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdata-dojo-attach-event=\"onkeypress:_onArrowKeyPress\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" data-dojo-attach-point=\"valueNode\"\n\t\t/></td></tr></tbody\n></table>\n"}});
define("dijit/form/ComboButton",["dojo/_base/declare","dojo/_base/event","dojo/keys","../focus","./DropDownButton","dojo/text!./templates/ComboButton.html"],function(_379,_37a,keys,_37b,_37c,_37d){
return _379("dijit.form.ComboButton",_37c,{templateString:_37d,_setIdAttr:"",_setTabIndexAttr:["focusNode","titleNode"],_setTitleAttr:"titleNode",optionsTitle:"",baseClass:"dijitComboButton",cssStateNodes:{"buttonNode":"dijitButtonNode","titleNode":"dijitButtonContents","_popupStateNode":"dijitDownArrowButton"},_focusedNode:null,_onButtonKeyPress:function(evt){
if(evt.charOrCode==keys[this.isLeftToRight()?"RIGHT_ARROW":"LEFT_ARROW"]){
_37b.focus(this._popupStateNode);
_37a.stop(evt);
}
},_onArrowKeyPress:function(evt){
if(evt.charOrCode==keys[this.isLeftToRight()?"LEFT_ARROW":"RIGHT_ARROW"]){
_37b.focus(this.titleNode);
_37a.stop(evt);
}
},focus:function(_37e){
if(!this.disabled){
_37b.focus(_37e=="start"?this.titleNode:this._popupStateNode);
}
}});
});
},"dijit/_base/window":function(){
define("dijit/_base/window",["dojo/window",".."],function(_37f,_380){
_380.getDocumentWindow=function(doc){
return _37f.get(doc);
};
});
},"dijit/PopupMenuItem":function(){
define("dijit/PopupMenuItem",["dojo/_base/declare","dojo/dom-style","dojo/query","dojo/_base/window","./registry","./MenuItem","./hccss"],function(_381,_382,_383,win,_384,_385){
return _381("dijit.PopupMenuItem",_385,{_fillContent:function(){
if(this.srcNodeRef){
var _386=_383("*",this.srcNodeRef);
this.inherited(arguments,[_386[0]]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(!this.popup){
var node=_383("[widgetId]",this.dropDownContainer)[0];
this.popup=_384.byNode(node);
}
win.body().appendChild(this.popup.domNode);
this.popup.startup();
this.popup.domNode.style.display="none";
if(this.arrowWrapper){
_382.set(this.arrowWrapper,"visibility","");
}
this.focusNode.setAttribute("aria-haspopup","true");
},destroyDescendants:function(_387){
if(this.popup){
if(!this.popup._destroyed){
this.popup.destroyRecursive(_387);
}
delete this.popup;
}
this.inherited(arguments);
}});
});
},"dijit/main":function(){
define("dijit/main",["dojo/_base/kernel"],function(dojo){
return dojo.dijit;
});
},"curam/define":function(){
define("curam/define",[],function(){
if(typeof (dojo.global.curam)=="undefined"){
dojo.global.curam={};
}
if(typeof (dojo.global.curam.define)=="undefined"){
dojo.mixin(dojo.global.curam,{define:{}});
}
dojo.mixin(dojo.global.curam.define,{singleton:function(_388,_389){
var _38a=_388.split(".");
var _38b=window;
for(var i=0;i<_38a.length;i++){
var part=_38a[i];
if(typeof _38b[part]=="undefined"){
_38b[part]={};
}
_38b=_38b[part];
}
if(_389){
dojo.mixin(_38b,_389);
}
}});
return dojo.global.curam.define;
});
},"curam/util/external":function(){
define("curam/util/external",["curam/util"],function(util){
curam.define.singleton("curam.util.external",{inExternalApp:function(){
return jsScreenContext.hasContextBits("EXTAPP");
},getUimParentWindow:function(){
if(util.getTopmostWindow()===dojo.global){
return null;
}else{
return dojo.global;
}
}});
return curam.util.external;
});
},"idx/oneui/MenuDialog":function(){
require({cache:{"url:idx/oneui/templates/MenuDialog.html":"<div role=\"presentation\">\r\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\r\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" data-dojo-attach-point=\"containerNode\" role=\"dialog\" tabIndex=\"-1\"></div>\r\n\t</div>\r\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\" data-dojo-attach-point=\"connectorNode\"></div>\r\n</div>\r\n"}});
define("idx/oneui/MenuDialog",["dojo/_base/declare","dojo/_base/array","dojo/_base/connect","dojo/_base/event","dojo/_base/lang","dojo/_base/sniff","dojo/_base/window","dojo/aspect","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/io/iframe","dojo/keys","dojo/window","dijit/popup","dijit/TooltipDialog","idx/oneui/_EventTriggerMixin","dojo/text!../oneui/templates/MenuDialog.html"],function(_38c,_38d,_38e,_38f,lang,has,win,_390,dom,_391,_392,_393,_394,keys,_395,_396,_397,_398,_399){
function _39a(node){
return (node.nodeName==="TEXTAREA")||((node.nodeName==="INPUT")&&(node.type==="text"));
};
return _38c("idx.oneui.MenuDialog",[_397,_398],{baseClass:"oneuiMenuDialog",_closeOnBlur:false,hoverToOpen:true,isShowingNow:false,leftClickToOpen:false,parentMenu:null,refocus:true,templateString:_399,useConnector:false,postCreate:function(){
this.inherited(arguments);
var l=this.isLeftToRight();
this._nextMenuKey=l?keys.RIGHT_ARROW:keys.LEFT_ARROW;
this._prevMenuKey=l?keys.LEFT_ARROW:keys.RIGHT_ARROW;
this.connect(this.domNode,"onkeypress","_onDomNodeKeypress");
if(this.contextMenuForWindow){
this.bindDomNode(win.body());
}else{
_38d.forEach(this.targetNodeIds,function(_39b){
this.bindDomNode(_39b);
},this);
}
},_onDomNodeKeypress:function(evt){
var _39c=evt.target||evt.srcElement,_39d=false;
if(this.parentMenu&&!evt.ctrlKey&&!evt.altKey&&(!_39c||!_39a(_39c))){
switch(evt.charOrCode){
case this._nextMenuKey:
this.parentMenu._getTopMenu().focusNext();
_39d=true;
break;
case this._prevMenuKey:
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
_39d=true;
break;
}
}
if(_39d){
_38f.stop(evt);
}else{
this.inherited(arguments);
}
},_getMenuForDialog:function(){
var _39e=this.getChildren(),_39f;
for(var i=0;!_39f&&(i<_39e.length);i++){
if(_39e[i]&&_39e[i].menuForDialog){
_39f=_39e[i];
}
}
return _39f;
},_getFocusItems:function(){
this.inherited(arguments);
if(this._firstFocusItem==this.domNode){
this._firstFocusItem=this.containerNode;
}
if(this._lastFocusItem==this.domNode){
this._lastFocusItem=this.containerNode;
}
},_onTrigger:function(_3a0){
var _3a1=null;
if(!_3a0.additionalData.leftClickToOpen&&("pageX" in _3a0.event)){
_3a1={x:_3a0.event.pageX,y:_3a0.event.pageY};
if(_3a0.triggerNode.tagName==="IFRAME"){
var ifc=_392.position(_3a0.triggerNode,true),_3a2=win.withGlobal(_395.get(_394.doc(_3a0.triggerNode)),"docScroll",_392);
var cs=_393.getComputedStyle(_3a0.triggerNode),tp=_393.toPixelValue,left=(has("ie")&&has("quirks")?0:tp(_3a0.triggerNode,cs.paddingLeft))+(has("ie")&&has("quirks")?tp(_3a0.triggerNode,cs.borderLeftWidth):0),top=(has("ie")&&has("quirks")?0:tp(_3a0.triggerNode,cs.paddingTop))+(has("ie")&&has("quirks")?tp(_3a0.triggerNode,cs.borderTopWidth):0);
_3a1.x+=ifc.x+left-_3a2.x;
_3a1.y+=ifc.y+top-_3a2.y;
}
}
if(!this._openTimer){
this._openTimer=setTimeout(lang.hitch(this,function(){
delete this._openTimer;
this.open({around:_3a0.triggerNode,coords:_3a1,position:_3a0.additionalData.popupPosition,useConnector:_3a0.additionalData.useConnector});
}),1);
}
if(_3a0.event.type!="hover"){
_38f.stop(_3a0.event);
}
},onBlur:function(){
this.inherited(arguments);
if(this._closeOnBlur){
this.close();
}
},open:function(args){
var _3a3=null;
if(this.refocus){
_3a3=this._focusManager.get("curNode");
if(!_3a3||dom.isDescendant(_3a3,this.domNode)){
_3a3=this._focusManager.get("prevNode");
}
if(dom.isDescendant(_3a3,this.domNode)){
_3a3=null;
}
}
var _3a4=(args&&(args.coords?{x:args.coords.x,y:args.coords.y,w:0,h:0}:args.around))||_3a3||this._focusManager.get("curNode")||{x:0,y:0,w:0,h:0};
var _3a5=lang.hitch(this,function(){
if(_3a3){
_3a3.focus();
}
this.close();
});
this._useConnectorForPopup=(args&&("useConnector" in args))?args.useConnector:this.useConnector;
_396.open({popup:this,around:_3a4,onExecute:_3a5,onCancel:_3a5,orient:(args&&("position" in args))?args.position:this.popupPosition});
delete this._useConnectorForPopup;
this.focus();
this._closeOnBlur=true;
},close:function(){
_396.close(this);
},bindDomNode:function(node,_3a6){
var _3a7=lang.delegate(this);
for(var name in _3a6){
_3a7[name]=_3a6[name];
}
this._addEventTrigger(node,"click",function(_3a8){
return _3a7.leftClickToOpen;
},_3a7);
this._addEventTrigger(node,"contextmenu",function(_3a9){
return !_3a7.leftClickToOpen;
},_3a7);
this._addEventTrigger(node,"keydown",function(_3aa){
return !_3a7.leftClickToOpen&&_3aa.event.shiftKey&&(_3aa.event.keyCode==keys.F10);
},_3a7);
this._addEventTrigger(node,"hover",function(_3ab){
return _3a7.hoverToOpen;
},_3a7);
},unBindDomNode:function(_3ac){
this._removeEventTriggers(_3ac);
},_layoutNodes:function(_3ad,_3ae,_3af,_3b0){
var _3b1=_3b0?"oneuiMenuDialogConnected":"",_3b2="",_3b3=_3af&&(_3af.length>=1)&&_3af.charAt(0),_3b4=_3af&&(_3af.length>=2)&&_3af.charAt(1),_3b5=_392.getContentBox(this.domNode),_3b6,_3b7,_3b8=function(node){
var _3b9=node.style,_3ba=_3b9.display,_3bb=_3b9.visibility;
if(_3b9.display=="none"){
_3b9.visibility="hidden";
_3b9.display="";
}
var _3bc=_392.getContentBox(node);
_3b9.display=_3ba;
_3b9.visibility=_3bb;
return _3bc;
};
if((_3b3==="M")||((_3b4!=="M")&&(_3b4!==_3ae.charAt(1)))){
_3b1+=" dijitTooltip"+(_3b4==="L"?"Right":"Left");
switch(_3b3){
case "M":
_3b1+=" dijitTooltipLRMiddle";
break;
case "T":
_3b1+=" dijitTooltipLRTop";
_3b0&&(_3b2="connectorNearTopEdge");
if(_3ad.h>0){
_3b6="top";
_3b7=Math.max(4,4+Math.min(_3b8(this.domNode.parentNode).h-24,_3ad.h/2))+"px";
}
break;
case "B":
_3b1+=" dijitTooltipLRBottom";
_3b0&&(_3b2="connectorNearBottomEdge");
if(_3ad.h>0){
_3b6="bottom";
_3b7=(4+Math.min(_3b8(this.domNode.parentNode).h-24,_3ad.h/2))+"px";
}
break;
}
}else{
_3b1+=" dijitTooltip"+(_3b3==="T"?"Below":"Above");
switch(_3b4){
case "M":
_3b1+=" dijitTooltipABMiddle";
break;
case "L":
_3b1+=" dijitTooltipABLeft";
_3b0&&(_3b2="connectorNearLeftEdge");
if(_3ad.w>0){
_3b6="left";
_3b7=Math.max(4,4+Math.min(_3b8(this.domNode.parentNode).w-16,_3ad.w/2))+"px";
}
break;
case "R":
_3b1+=" dijitTooltipABRight";
_3b0&&(_3b2="connectorNearRightEdge");
if(_3ad.h>0){
_3b6="right";
_3b7=(4+Math.min(_3b8(this.domNode.parentNode).w-24,_3ad.w/2))+"px";
}
break;
}
}
_391.replace(this.domNode,_3b1,this._currentOrientClass||"");
this._currentOrientClass=_3b1;
_391.replace(this.domNode.parentNode,_3b2,this._currentConnectorClass||"");
this._currentConnectorClass=_3b2;
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
this.connectorNode.style.left="";
this.connectorNode.style.right="";
if(_3b6){
this.connectorNode.style[_3b6]=_3b7;
}
},orient:function(node,_3bd,_3be,_3bf,_3c0){
this._layoutNodes(_3c0,_3bd,_3be,("_useConnectorForPopup" in this)?this._useConnectorForPopup:this.useConnector);
},onOpen:function(pos){
this.isShowingNow=true;
this._layoutNodes(pos.aroundNodePos,pos.aroundCorner,pos.corner,("_useConnectorForPopup" in this)?this._useConnectorForPopup:this.useConnector);
this.reset();
var menu=this._getMenuForDialog();
if(menu){
if(this._menuparented){
this._menuparented.parentMenu=null;
}
menu.parentMenu=this.parentMenu;
this._menuparented=menu;
if(this._handleexecute){
this._handleexecute.remove();
}
var _3c1=lang.hitch(this,this.onExecute);
this._handleexecute=menu.on("execute",_3c1);
if(this._handleopen){
this._handleopen.remove();
}
this._handleopen=_390.after(menu,"_openPopup",function(){
var _3c2=_396._stack[_396._stack.length-1];
if(!_3c2._menuregistered){
_3c2._menuregistered=true;
_3c2.handlers.push(_390.around(_3c2,"onExecute",function(_3c3){
return function(){
_3c3.apply(this,arguments);
_3c1();
};
}));
}
},true);
}
this._onShow();
},onClose:function(){
this.isShowingNow=false;
this._closeOnBlur=false;
if(this._handleexecute){
this._handleexecute.remove();
this._handleexecute=null;
}
if(this._handleopen){
this._handleopen.remove();
this._handleopen=null;
}
if(this._menuparented){
this._menuparented.parentMenu=null;
this._menuparented=null;
}
this.onHide();
},onExecute:function(){
}});
});
},"dijit/_OnDijitClickMixin":function(){
define("dijit/_OnDijitClickMixin",["dojo/on","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(on,_3c4,keys,_3c5,has,_3c6,win){
var _3c7=null;
if(has("ie")){
(function(){
var _3c8=function(evt){
_3c7=evt.srcElement;
};
win.doc.attachEvent("onkeydown",_3c8);
_3c6.addOnWindowUnload(function(){
win.doc.detachEvent("onkeydown",_3c8);
});
})();
}else{
win.doc.addEventListener("keydown",function(evt){
_3c7=evt.target;
},true);
}
var _3c9=function(node,_3ca){
if(/input|button/i.test(node.nodeName)){
return on(node,"click",_3ca);
}else{
function _3cb(e){
return (e.keyCode==keys.ENTER||e.keyCode==keys.SPACE)&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey;
};
var _3cc=[on(node,"keypress",function(e){
if(_3cb(e)){
_3c7=e.target;
e.preventDefault();
}
}),on(node,"keyup",function(e){
if(_3cb(e)&&e.target==_3c7){
_3c7=null;
_3ca.call(this,e);
}
}),on(node,"click",function(e){
_3ca.call(this,e);
})];
return {remove:function(){
_3c4.forEach(_3cc,function(h){
h.remove();
});
}};
}
};
return _3c5("dijit._OnDijitClickMixin",null,{connect:function(obj,_3cd,_3ce){
return this.inherited(arguments,[obj,_3cd=="ondijitclick"?_3c9:_3cd,_3ce]);
}});
});
},"idx/oneui/_MenuOpenOnHoverMixin":function(){
define("idx/oneui/_MenuOpenOnHoverMixin",["dojo/_base/declare"],function(_3cf){
var dojo={},_3d0={};
return _3cf("idx.oneui._MenuOpenOnHoverMixin",null,{openOnHover:true,_isActuallyActive:false,_setOpenOnHoverAttr:function(_3d1){
this.openOnHover=_3d1;
if(_3d1){
this._forceActive();
}else{
this._restoreActive();
}
},_markActive:function(){
this.inherited(arguments);
this._isActuallyActive=true;
},_markInactive:function(){
if(!this.openOnHover){
this.inherited(arguments);
}
this._isActuallyActive=false;
},_forceActive:function(){
var _3d2=this._isActuallyActive;
this._markActive();
this._isActuallyActive=_3d2;
},_restoreActive:function(){
if(this._isActuallyActive){
this._markActive();
}else{
this._markInactive();
}
}});
});
},"dojo/dnd/autoscroll":function(){
define("dojo/dnd/autoscroll",["../main","../window"],function(dojo){
dojo.getObject("dnd",true,dojo);
dojo.dnd.getViewport=dojo.window.getBox;
dojo.dnd.V_TRIGGER_AUTOSCROLL=32;
dojo.dnd.H_TRIGGER_AUTOSCROLL=32;
dojo.dnd.V_AUTOSCROLL_VALUE=16;
dojo.dnd.H_AUTOSCROLL_VALUE=16;
dojo.dnd.autoScroll=function(e){
var v=dojo.window.getBox(),dx=0,dy=0;
if(e.clientX<dojo.dnd.H_TRIGGER_AUTOSCROLL){
dx=-dojo.dnd.H_AUTOSCROLL_VALUE;
}else{
if(e.clientX>v.w-dojo.dnd.H_TRIGGER_AUTOSCROLL){
dx=dojo.dnd.H_AUTOSCROLL_VALUE;
}
}
if(e.clientY<dojo.dnd.V_TRIGGER_AUTOSCROLL){
dy=-dojo.dnd.V_AUTOSCROLL_VALUE;
}else{
if(e.clientY>v.h-dojo.dnd.V_TRIGGER_AUTOSCROLL){
dy=dojo.dnd.V_AUTOSCROLL_VALUE;
}
}
window.scrollBy(dx,dy);
};
dojo.dnd._validNodes={"div":1,"p":1,"td":1};
dojo.dnd._validOverflow={"auto":1,"scroll":1};
dojo.dnd.autoScrollNodes=function(e){
var b,t,w,h,rx,ry,dx=0,dy=0,_3d3,_3d4;
for(var n=e.target;n;){
if(n.nodeType==1&&(n.tagName.toLowerCase() in dojo.dnd._validNodes)){
var s=dojo.getComputedStyle(n),_3d5=(s.overflow.toLowerCase() in dojo.dnd._validOverflow),_3d6=(s.overflowX.toLowerCase() in dojo.dnd._validOverflow),_3d7=(s.overflowY.toLowerCase() in dojo.dnd._validOverflow);
if(_3d5||_3d6||_3d7){
b=dojo._getContentBox(n,s);
t=dojo.position(n,true);
}
if(_3d5||_3d6){
w=Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL,b.w/2);
rx=e.pageX-t.x;
if(dojo.isWebKit||dojo.isOpera){
rx+=dojo.body().scrollLeft;
}
dx=0;
if(rx>0&&rx<b.w){
if(rx<w){
dx=-w;
}else{
if(rx>b.w-w){
dx=w;
}
}
_3d3=n.scrollLeft;
n.scrollLeft=n.scrollLeft+dx;
}
}
if(_3d5||_3d7){
h=Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL,b.h/2);
ry=e.pageY-t.y;
if(dojo.isWebKit||dojo.isOpera){
ry+=dojo.body().scrollTop;
}
dy=0;
if(ry>0&&ry<b.h){
if(ry<h){
dy=-h;
}else{
if(ry>b.h-h){
dy=h;
}
}
_3d4=n.scrollTop;
n.scrollTop=n.scrollTop+dy;
}
}
if(dx||dy){
return;
}
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
dojo.dnd.autoScroll(e);
};
return dojo.dnd;
});
},"dojo/dnd/TimedMoveable":function(){
define("dojo/dnd/TimedMoveable",["../main","./Moveable"],function(dojo){
var _3d8=dojo.dnd.Moveable.prototype.onMove;
dojo.declare("dojo.dnd.TimedMoveable",dojo.dnd.Moveable,{timeout:40,constructor:function(node,_3d9){
if(!_3d9){
_3d9={};
}
if(_3d9.timeout&&typeof _3d9.timeout=="number"&&_3d9.timeout>=0){
this.timeout=_3d9.timeout;
}
},onMoveStop:function(_3da){
if(_3da._timer){
clearTimeout(_3da._timer);
_3d8.call(this,_3da,_3da._leftTop);
}
dojo.dnd.Moveable.prototype.onMoveStop.apply(this,arguments);
},onMove:function(_3db,_3dc){
_3db._leftTop=_3dc;
if(!_3db._timer){
var _3dd=this;
_3db._timer=setTimeout(function(){
_3db._timer=null;
_3d8.call(_3dd,_3db,_3db._leftTop);
},this.timeout);
}
}});
return dojo.dnd.TimedMoveable;
});
},"dijit/_BidiSupport":function(){
define("dijit/_BidiSupport",["./_WidgetBase"],function(_3de){
_3de.extend({getTextDir:function(text){
return this.textDir=="auto"?this._checkContextual(text):this.textDir;
},_checkContextual:function(text){
var fdc=/[A-Za-z\u05d0-\u065f\u066a-\u06ef\u06fa-\u07ff\ufb1d-\ufdff\ufe70-\ufefc]/.exec(text);
return fdc?(fdc[0]<="z"?"ltr":"rtl"):this.dir?this.dir:this.isLeftToRight()?"ltr":"rtl";
},applyTextDir:function(_3df,text){
var _3e0=this.textDir=="auto"?this._checkContextual(text):this.textDir;
if(_3df.dir!=_3e0){
_3df.dir=_3e0;
}
}});
return _3de;
});
},"dojo/cookie":function(){
define("dojo/cookie",["./_base/kernel","./regexp"],function(dojo,_3e1){
dojo.cookie=function(name,_3e2,_3e3){
var c=document.cookie,ret;
if(arguments.length==1){
var _3e4=c.match(new RegExp("(?:^|; )"+_3e1.escapeString(name)+"=([^;]*)"));
ret=_3e4?decodeURIComponent(_3e4[1]):undefined;
}else{
_3e3=_3e3||{};
var exp=_3e3.expires;
if(typeof exp=="number"){
var d=new Date();
d.setTime(d.getTime()+exp*24*60*60*1000);
exp=_3e3.expires=d;
}
if(exp&&exp.toUTCString){
_3e3.expires=exp.toUTCString();
}
_3e2=encodeURIComponent(_3e2);
var _3e5=name+"="+_3e2,_3e6;
for(_3e6 in _3e3){
_3e5+="; "+_3e6;
var _3e7=_3e3[_3e6];
if(_3e7!==true){
_3e5+="="+_3e7;
}
}
document.cookie=_3e5;
}
return ret;
};
dojo.cookie.isSupported=function(){
if(!("cookieEnabled" in navigator)){
this("__djCookieTest__","CookiesAllowed");
navigator.cookieEnabled=this("__djCookieTest__")=="CookiesAllowed";
if(navigator.cookieEnabled){
this("__djCookieTest__","",{expires:-1});
}
}
return navigator.cookieEnabled;
};
return dojo.cookie;
});
},"dojo/cache":function(){
define("dojo/cache",["./_base/kernel","./text"],function(dojo,text){
return dojo.cache;
});
},"curam/util/ui/refresh/TabRefreshController":function(){
define("curam/util/ui/refresh/TabRefreshController",["curam/debug","curam/util/ui/refresh/RefreshEvent","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _3e8=new curam.util.ResourceBundle("Debug");
var _3e9=dojo.declare("curam.util.ui.refresh.TabRefreshController",null,{EVENT_REFRESH_MENU:"/curam/refresh/menu",EVENT_REFRESH_NAVIGATION:"/curam/refresh/navigation",EVENT_REFRESH_CONTEXT:"/curam/refresh/context",EVENT_REFRESH_MAIN:"/curam/refresh/main-content",_tabWidgetId:null,_configOnSubmit:null,_configOnLoad:null,_handler:null,_lastSubmitted:null,_currentlyRefreshing:null,constructor:function(_3ea,_3eb){
this._configOnSubmit={};
this._configOnLoad={};
if(!_3eb){
return;
}
this._tabWidgetId=_3ea;
dojo.forEach(_3eb.config,dojo.hitch(this,function(item){
this._configOnSubmit[item.page]=item.onsubmit;
this._configOnLoad[item.page]=item.onload;
}));
},pageSubmitted:function(_3ec,_3ed){
new curam.util.ui.refresh.RefreshEvent(curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONSUBMIT,_3ed);
curam.debug.log("curam.util.ui.refresh.TabRefreshController: "+_3e8.getProperty("curam.util.ui.refresh.TabRefreshController.submit",[_3ec,_3ed]));
if(this._configOnSubmit[_3ec]){
this._lastSubmitted=_3ec;
curam.debug.log("curam.util.ui.refresh.TabRefreshController: "+_3e8.getProperty("curam.util.ui.refresh.TabRefreshController"+"submit.notify"));
}
},pageLoaded:function(_3ee,_3ef){
var _3f0=new curam.util.ui.refresh.RefreshEvent(curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONLOAD,_3ef);
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_3e8.getProperty("curam.util.ui.refresh.TabRefreshController.load",[_3ee,_3ef]));
if(this._currentlyRefreshing&&this._currentlyRefreshing.equals(_3f0)){
this._currentlyRefreshing=null;
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_3e8.getProperty("curam.util.ui.refresh.TabRefreshController"+"refresh"));
return;
}
var _3f1={};
if(_3ef==_3f0.SOURCE_CONTEXT_MAIN&&this._configOnLoad[_3ee]){
_3f1=this._configOnLoad[_3ee];
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_3e8.getProperty("curam.util.ui.refresh.TabRefreshController"+".load.config"));
}
if(this._lastSubmitted){
var cfg=this._configOnSubmit[this._lastSubmitted];
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_3e8.getProperty("curam.util.ui.refresh.TabRefreshController"+".submit.config",[this._lastSubmitted]));
_3f1.details=_3f1.details||cfg.details;
_3f1.menubar=_3f1.menubar||cfg.menubar;
_3f1.navigation=_3f1.navigation||cfg.navigation;
_3f1.mainContent=_3f1.mainContent||cfg.mainContent;
this._lastSubmitted=null;
}
this._fireRefreshEvents(_3f1);
},_fireRefreshEvents:function(cfg){
var _3f2=[];
if(cfg.details){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_3e8.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.context"));
_3f2.push(this.EVENT_REFRESH_CONTEXT+"/"+this._tabWidgetId);
}
if(cfg.menubar){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_3e8.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.menu"));
_3f2.push(this.EVENT_REFRESH_MENU+"/"+this._tabWidgetId);
}
if(cfg.navigation){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_3e8.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.nav"));
_3f2.push(this.EVENT_REFRESH_NAVIGATION+"/"+this._tabWidgetId);
}
if(cfg.mainContent){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_3e8.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.main"));
this._currentlyRefreshing=new curam.util.ui.refresh.RefreshEvent(curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONLOAD,curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN,null);
_3f2.push(this.EVENT_REFRESH_MAIN+"/"+this._tabWidgetId);
}
if(_3f2.length>0){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_3e8.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.log",[_3f2.length,_3f2]));
this._handler(_3f2);
}
},setRefreshHandler:function(_3f3){
this._handler=_3f3;
},destroy:function(){
for(prop in this._configOnSubmit){
if(this._configOnSubmit.hasOwnProperty(prop)){
delete this._configOnSubmit[prop];
}
}
for(prop in this._configOnLoad){
if(this._configOnLoad.hasOwnProperty(prop)){
delete this._configOnLoad[prop];
}
}
this._configOnSubmit={};
this._configOnLoad={};
this._handler=null;
this._lastSubmitted=null;
this._currentlyRefreshing=null;
}});
return _3e9;
});
},"dijit/_base/popup":function(){
define("dijit/_base/popup",["dojo/dom-class","../popup","../BackgroundIframe"],function(_3f4,_3f5){
var _3f6=_3f5._createWrapper;
_3f5._createWrapper=function(_3f7){
if(!_3f7.declaredClass){
_3f7={_popupWrapper:(_3f7.parentNode&&_3f4.contains(_3f7.parentNode,"dijitPopup"))?_3f7.parentNode:null,domNode:_3f7,destroy:function(){
}};
}
return _3f6.call(this,_3f7);
};
var _3f8=_3f5.open;
_3f5.open=function(args){
if(args.orient&&typeof args.orient!="string"&&!("length" in args.orient)){
var ary=[];
for(var key in args.orient){
ary.push({aroundCorner:key,corner:args.orient[key]});
}
args.orient=ary;
}
return _3f8.call(this,args);
};
return _3f5;
});
},"url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n","dojo/_base/url":function(){
define("dojo/_base/url",["./kernel"],function(dojo){
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$"),_3f9=function(){
var n=null,_3fa=arguments,uri=[_3fa[0]];
for(var i=1;i<_3fa.length;i++){
if(!_3fa[i]){
continue;
}
var _3fb=new _3f9(_3fa[i]+""),_3fc=new _3f9(uri[0]+"");
if(_3fb.path==""&&!_3fb.scheme&&!_3fb.authority&&!_3fb.query){
if(_3fb.fragment!=n){
_3fc.fragment=_3fb.fragment;
}
_3fb=_3fc;
}else{
if(!_3fb.scheme){
_3fb.scheme=_3fc.scheme;
if(!_3fb.authority){
_3fb.authority=_3fc.authority;
if(_3fb.path.charAt(0)!="/"){
var path=_3fc.path.substring(0,_3fc.path.lastIndexOf("/")+1)+_3fb.path;
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
_3fb.path=segs.join("/");
}
}
}
}
uri=[];
if(_3fb.scheme){
uri.push(_3fb.scheme,":");
}
if(_3fb.authority){
uri.push("//",_3fb.authority);
}
uri.push(_3fb.path);
if(_3fb.query){
uri.push("?",_3fb.query);
}
if(_3fb.fragment){
uri.push("#",_3fb.fragment);
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
_3f9.prototype.toString=function(){
return this.uri;
};
return dojo._Url=_3f9;
});
},"url:idx/oneui/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\r\n\t<tbody class=\"dijitReset\">\r\n\t\t<tr data-dojo-attach-point=\"_columnContainerNode\">\r\n\t\t\t<td class=\"dijitReset oneuiMenuColumn\" data-dojo-attach-point=\"columnNodes\">\r\n\t\t\t\t<table class=\"dijitReset\" cellspacing=\"0\" width=\"100%\" role=\"presentation\">\r\n\t\t\t\t\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"_containerNodes,containerNode\">\r\n<!-- this is column 0, which also starts out as the container node so menu items are initially loaded here.\r\n     containerNode changes to point to _columnContainerNode once the widget has initialised, so the whole set of columns is the container.\r\n\t this must be kept in synch with _MenuColumn.html -->\r\n\t\t\t\t\t</tbody>\r\n\t\t\t\t</table>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</tbody>\r\n</table>\r\n","url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n","dojo/text":function(){
define("dojo/text",["./_base/kernel","require","./has","./_base/xhr"],function(dojo,_3fd,has,xhr){
var _3fe;
if(1){
_3fe=function(url,sync,load){
xhr("GET",{url:url,sync:!!sync,load:load});
};
}else{
if(_3fd.getText){
_3fe=_3fd.getText;
}else{
console.error("dojo/text plugin failed to load because loader does not support getText");
}
}
var _3ff={},_400=function(text){
if(text){
text=text.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _401=text.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_401){
text=_401[1];
}
}else{
text="";
}
return text;
},_402={},_403={},_404={dynamic:true,normalize:function(id,_405){
var _406=id.split("!"),url=_406[0];
return (/^\./.test(url)?_405(url):url)+(_406[1]?"!"+_406[1]:"");
},load:function(id,_407,load){
var _408=id.split("!"),_409=_408.length>1,_40a=_408[0],url=_407.toUrl(_408[0]),text=_402,_40b=function(text){
load(_409?_400(text):text);
};
if(_40a in _3ff){
text=_3ff[_40a];
}else{
if(url in _407.cache){
text=_407.cache[url];
}else{
if(url in _3ff){
text=_3ff[url];
}
}
}
if(text===_402){
if(_403[url]){
_403[url].push(_40b);
}else{
var _40c=_403[url]=[_40b];
_3fe(url,!_407.async,function(text){
_3ff[_40a]=_3ff[url]=text;
for(var i=0;i<_40c.length;){
_40c[i++](text);
}
delete _403[url];
});
}
}else{
_40b(text);
}
}};
dojo.cache=function(_40d,url,_40e){
var key;
if(typeof _40d=="string"){
if(/\//.test(_40d)){
key=_40d;
_40e=url;
}else{
key=_3fd.toUrl(_40d.replace(/\./g,"/")+(url?("/"+url):""));
}
}else{
key=_40d+"";
_40e=url;
}
var val=(_40e!=undefined&&typeof _40e!="string")?_40e.value:_40e,_40f=_40e&&_40e.sanitize;
if(typeof val=="string"){
_3ff[key]=val;
return _40f?_400(val):val;
}else{
if(val===null){
delete _3ff[key];
return null;
}else{
if(!(key in _3ff)){
_3fe(key,true,function(text){
_3ff[key]=text;
});
}
return _40f?_400(_3ff[key]):_3ff[key];
}
}
};
return _404;
});
},"dojo/uacss":function(){
define("dojo/uacss",["./dom-geometry","./_base/lang","./ready","./_base/sniff","./_base/window"],function(_410,lang,_411,has,_412){
var html=_412.doc.documentElement,ie=has("ie"),_413=has("opera"),maj=Math.floor,ff=has("ff"),_414=_410.boxModel.replace(/-/,""),_415={"dj_quirks":has("quirks"),"dj_opera":_413,"dj_khtml":has("khtml"),"dj_webkit":has("webkit"),"dj_safari":has("safari"),"dj_chrome":has("chrome"),"dj_gecko":has("mozilla")};
if(ie){
_415["dj_ie"]=true;
_415["dj_ie"+maj(ie)]=true;
_415["dj_iequirks"]=has("quirks");
}
if(ff){
_415["dj_ff"+maj(ff)]=true;
}
_415["dj_"+_414]=true;
var _416="";
for(var clz in _415){
if(_415[clz]){
_416+=clz+" ";
}
}
html.className=lang.trim(html.className+" "+_416);
_411(90,function(){
if(!_410.isBodyLtr()){
var _417="dj_rtl dijitRtl "+_416.replace(/ /g,"-rtl ");
html.className=lang.trim(html.className+" "+_417+"dj_rtl dijitRtl "+_416.replace(/ /g,"-rtl "));
}
});
return has;
});
},"dijit/Tooltip":function(){
require({cache:{"url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n"}});
define("dijit/Tooltip",["dojo/_base/array","dojo/_base/declare","dojo/_base/fx","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/_base/sniff","dojo/_base/window","./_base/manager","./place","./_Widget","./_TemplatedMixin","./BackgroundIframe","dojo/text!./templates/Tooltip.html","."],function(_418,_419,fx,dom,_41a,_41b,_41c,lang,has,win,_41d,_41e,_41f,_420,_421,_422,_423){
var _424=_419("dijit._MasterTooltip",[_41f,_420],{duration:_41d.defaultDuration,templateString:_422,postCreate:function(){
win.body().appendChild(this.domNode);
this.bgIframe=new _421(this.domNode);
this.fadeIn=fx.fadeIn({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onShow")});
this.fadeOut=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHide")});
},show:function(_425,_426,_427,rtl,_428){
if(this.aroundNode&&this.aroundNode===_426&&this.containerNode.innerHTML==_425){
return;
}
this.domNode.width="auto";
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_425;
if(_428){
this.set("textDir",_428);
}
this.containerNode.align=rtl?"right":"left";
var pos=_41e.around(this.domNode,_426,_427&&_427.length?_427:_429.defaultPosition,!rtl,lang.hitch(this,"orient"));
var _42a=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_42a.y+((_42a.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_42a.x+((_42a.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}
}
_41c.set(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_426;
},orient:function(node,_42b,_42c,_42d,_42e){
this.connectorNode.style.top="";
var _42f=_42d.w-this.connectorNode.offsetWidth;
node.className="dijitTooltip "+{"MR-ML":"dijitTooltipRight","ML-MR":"dijitTooltipLeft","TM-BM":"dijitTooltipAbove","BM-TM":"dijitTooltipBelow","BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_42b+"-"+_42c];
this.domNode.style.width="auto";
var size=_41b.getContentBox(this.domNode);
var _430=Math.min((Math.max(_42f,1)),size.w);
var _431=_430<size.w;
this.domNode.style.width=_430+"px";
if(_431){
this.containerNode.style.overflow="auto";
var _432=this.containerNode.scrollWidth;
this.containerNode.style.overflow="visible";
if(_432>_430){
_432=_432+_41c.get(this.domNode,"paddingLeft")+_41c.get(this.domNode,"paddingRight");
this.domNode.style.width=_432+"px";
}
}
if(_42c.charAt(0)=="B"&&_42b.charAt(0)=="B"){
var mb=_41b.getMarginBox(node);
var _433=this.connectorNode.offsetHeight;
if(mb.h>_42d.h){
var _434=_42d.h-((_42e.h+_433)>>1);
this.connectorNode.style.top=_434+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_42e.h/2-_433/2,0),mb.h-_433)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_42f);
},_onShow:function(){
if(has("ie")){
this.domNode.style.filter="";
}
},hide:function(_435){
if(this._onDeck&&this._onDeck[1]==_435){
this._onDeck=null;
}else{
if(this.aroundNode===_435){
this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play();
}else{
}
}
},_onHide:function(){
this.domNode.style.cssText="";
this.containerNode.innerHTML="";
if(this._onDeck){
this.show.apply(this,this._onDeck);
this._onDeck=null;
}
},_setAutoTextDir:function(node){
this.applyTextDir(node,has("ie")?node.outerText:node.textContent);
_418.forEach(node.children,function(_436){
this._setAutoTextDir(_436);
},this);
},_setTextDirAttr:function(_437){
this._set("textDir",_437);
if(_437=="auto"){
this._setAutoTextDir(this.containerNode);
}else{
this.containerNode.dir=this.textDir;
}
}});
_423.showTooltip=function(_438,_439,_43a,rtl,_43b){
if(_43a){
_43a=_418.map(_43a,function(val){
return {after:"after-centered",before:"before-centered"}[val]||val;
});
}
if(!_429._masterTT){
_423._masterTT=_429._masterTT=new _424();
}
return _429._masterTT.show(_438,_439,_43a,rtl,_43b);
};
_423.hideTooltip=function(_43c){
return _429._masterTT&&_429._masterTT.hide(_43c);
};
var _429=_419("dijit.Tooltip",_41f,{label:"",showDelay:400,connectId:[],position:[],_setConnectIdAttr:function(_43d){
_418.forEach(this._connections||[],function(_43e){
_418.forEach(_43e,lang.hitch(this,"disconnect"));
},this);
this._connectIds=_418.filter(lang.isArrayLike(_43d)?_43d:(_43d?[_43d]:[]),function(id){
return dom.byId(id);
});
this._connections=_418.map(this._connectIds,function(id){
var node=dom.byId(id);
return [this.connect(node,"onmouseenter","_onHover"),this.connect(node,"onmouseleave","_onUnHover"),this.connect(node,"onfocus","_onHover"),this.connect(node,"onblur","_onUnHover")];
},this);
this._set("connectId",_43d);
},addTarget:function(node){
var id=node.id||node;
if(_418.indexOf(this._connectIds,id)==-1){
this.set("connectId",this._connectIds.concat(id));
}
},removeTarget:function(node){
var id=node.id||node,idx=_418.indexOf(this._connectIds,id);
if(idx>=0){
this._connectIds.splice(idx,1);
this.set("connectId",this._connectIds);
}
},buildRendering:function(){
this.inherited(arguments);
_41a.add(this.domNode,"dijitTooltipData");
},startup:function(){
this.inherited(arguments);
var ids=this.connectId;
_418.forEach(lang.isArrayLike(ids)?ids:[ids],this.addTarget,this);
},_onHover:function(e){
if(!this._showTimer){
var _43f=e.target;
this._showTimer=setTimeout(lang.hitch(this,function(){
this.open(_43f);
}),this.showDelay);
}
},_onUnHover:function(){
if(this._focus){
return;
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
this.close();
},open:function(_440){
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
_429.show(this.label||this.domNode.innerHTML,_440,this.position,!this.isLeftToRight(),this.textDir);
this._connectNode=_440;
this.onShow(_440,this.position);
},close:function(){
if(this._connectNode){
_429.hide(this._connectNode);
delete this._connectNode;
this.onHide();
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
},onShow:function(){
},onHide:function(){
},uninitialize:function(){
this.close();
this.inherited(arguments);
}});
_429._MasterTooltip=_424;
_429.show=_423.showTooltip;
_429.hide=_423.hideTooltip;
_429.defaultPosition=["after-centered","before-centered"];
return _429;
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
dojo.string.substitute=function(_441,map,_442,_443){
_443=_443||dojo.global;
_442=_442?lang.hitch(_443,_442):function(v){
return v;
};
return _441.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_444,key,_445){
var _446=lang.getObject(key,false,map);
if(_445){
_446=lang.getObject(_445,false,_443).call(_443,_446,key);
}
return _442(_446,key).toString();
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
},"url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>","curam/util/ui/refresh/RefreshEvent":function(){
define("curam/util/ui/refresh/RefreshEvent",[],function(){
var _447=dojo.declare("curam.util.ui.refresh.RefreshEvent",null,{TYPE_ONLOAD:"onload",TYPE_ONSUBMIT:"onsubmit",SOURCE_CONTEXT_MAIN:"main-content",SOURCE_CONTEXT_DIALOG:"dialog",SOURCE_CONTEXT_INLINE:"inline",_type:null,_context:null,constructor:function(type,_448){
if(!type||!_448){
throw "Required parameters missing.";
}
if(!(type==this.TYPE_ONLOAD||type==this.TYPE_ONSUBMIT)){
throw "Unknown type: "+type;
}
if(!(_448==this.SOURCE_CONTEXT_DIALOG||_448==this.SOURCE_CONTEXT_INLINE||_448==this.SOURCE_CONTEXT_MAIN)){
throw "Unknown context: "+_448;
}
this._type=type;
this._context=_448;
},equals:function(_449){
if(typeof _449!="object"){
return false;
}
if(_449.declaredClass!=this.declaredClass){
return false;
}
return this._type===_449._type&&this._context===_449._context;
}});
return _447;
});
},"dijit/dijit":function(){
define("dijit/dijit",[".","./_base","dojo/parser","./_Widget","./_TemplatedMixin","./_Container","./layout/_LayoutWidget","./form/_FormWidget","./form/_FormValueWidget"],function(_44a){
return _44a;
});
},"dijit/form/DropDownButton":function(){
require({cache:{"url:dijit/form/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n"}});
define("dijit/form/DropDownButton",["dojo/_base/declare","dojo/_base/lang","dojo/query","../registry","../popup","./Button","../_Container","../_HasDropDown","dojo/text!./templates/DropDownButton.html"],function(_44b,lang,_44c,_44d,_44e,_44f,_450,_451,_452){
return _44b("dijit.form.DropDownButton",[_44f,_450,_451],{baseClass:"dijitDropDownButton",templateString:_452,_fillContent:function(){
if(this.srcNodeRef){
var _453=_44c("*",this.srcNodeRef);
this.inherited(arguments,[_453[0]]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
if(!this.dropDown&&this.dropDownContainer){
var _454=_44c("[widgetId]",this.dropDownContainer)[0];
this.dropDown=_44d.byNode(_454);
delete this.dropDownContainer;
}
if(this.dropDown){
_44e.hide(this.dropDown);
}
this.inherited(arguments);
},isLoaded:function(){
var _455=this.dropDown;
return (!!_455&&(!_455.href||_455.isLoaded));
},loadDropDown:function(_456){
var _457=this.dropDown;
var _458=_457.on("load",lang.hitch(this,function(){
_458.remove();
_456();
}));
_457.refresh();
},isFocusable:function(){
return this.inherited(arguments)&&!this._mouseDown;
}});
});
},"dojox/layout/ContentPane":function(){
define("dojox/layout/ContentPane",["dojo/_base/lang","dojo/_base/xhr","dijit/layout/ContentPane","dojox/html/_base","dojo/_base/declare"],function(lang,_459,_45a,_45b,_45c){
return _45c("dojox.layout.ContentPane",_45a,{adjustPaths:false,cleanContent:false,renderStyles:false,executeScripts:true,scriptHasHooks:false,constructor:function(){
this.ioArgs={};
this.ioMethod=_459.get;
},onExecError:function(e){
},_setContent:function(cont){
var _45d=this._contentSetter;
if(!(_45d&&_45d instanceof _45b._ContentSetter)){
_45d=this._contentSetter=new _45b._ContentSetter({node:this.containerNode,_onError:lang.hitch(this,this._onError),onContentError:lang.hitch(this,function(e){
var _45e=this.onContentError(e);
try{
this.containerNode.innerHTML=_45e;
}
catch(e){
console.error("Fatal "+this.id+" could not change content due to "+e.message,e);
}
})});
}
this._contentSetterParams={adjustPaths:Boolean(this.adjustPaths&&(this.href||this.referencePath)),referencePath:this.href||this.referencePath,renderStyles:this.renderStyles,executeScripts:this.executeScripts,scriptHasHooks:this.scriptHasHooks,scriptHookReplacement:"dijit.byId('"+this.id+"')"};
this.inherited("_setContent",arguments);
}});
});
},"dijit/form/_FormValueMixin":function(){
define("dijit/form/_FormValueMixin",["dojo/_base/declare","dojo/dom-attr","dojo/keys","dojo/_base/sniff","./_FormWidgetMixin"],function(_45f,_460,keys,has,_461){
return _45f("dijit.form._FormValueMixin",_461,{readOnly:false,_setReadOnlyAttr:function(_462){
_460.set(this.focusNode,"readOnly",_462);
this._set("readOnly",_462);
},postCreate:function(){
this.inherited(arguments);
if(has("ie")){
this.connect(this.focusNode||this.domNode,"onkeydown",this._onKeyDown);
}
if(this._resetValue===undefined){
this._lastValueReported=this._resetValue=this.value;
}
},_setValueAttr:function(_463,_464){
this._handleOnChange(_463,_464);
},_handleOnChange:function(_465,_466){
this._set("value",_465);
this.inherited(arguments);
},undo:function(){
this._setValueAttr(this._lastValueReported,false);
},reset:function(){
this._hasBeenBlurred=false;
this._setValueAttr(this._resetValue,true);
},_onKeyDown:function(e){
if(e.keyCode==keys.ESCAPE&&!(e.ctrlKey||e.altKey||e.metaKey)){
var te;
if(has("ie")<9||(has("ie")&&has("quirks"))){
e.preventDefault();
te=document.createEventObject();
te.keyCode=keys.ESCAPE;
te.shiftKey=e.shiftKey;
e.srcElement.fireEvent("onkeypress",te);
}
}
}});
});
},"dijit/form/_FormWidgetMixin":function(){
define("dijit/form/_FormWidgetMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-style","dojo/_base/lang","dojo/mouse","dojo/_base/sniff","dojo/_base/window","dojo/window","../a11y"],function(_467,_468,_469,_46a,lang,_46b,has,win,_46c,a11y){
return _468("dijit.form._FormWidgetMixin",null,{name:"",alt:"",value:"",type:"text",tabIndex:"0",_setTabIndexAttr:"focusNode",disabled:false,intermediateChanges:false,scrollOnFocus:true,_setIdAttr:"focusNode",_setDisabledAttr:function(_46d){
this._set("disabled",_46d);
_469.set(this.focusNode,"disabled",_46d);
if(this.valueNode){
_469.set(this.valueNode,"disabled",_46d);
}
this.focusNode.setAttribute("aria-disabled",_46d?"true":"false");
if(_46d){
this._set("hovering",false);
this._set("active",false);
var _46e="tabIndex" in this.attributeMap?this.attributeMap.tabIndex:("_setTabIndexAttr" in this)?this._setTabIndexAttr:"focusNode";
_467.forEach(lang.isArray(_46e)?_46e:[_46e],function(_46f){
var node=this[_46f];
if(has("webkit")||a11y.hasDefaultTabStop(node)){
node.setAttribute("tabIndex","-1");
}else{
node.removeAttribute("tabIndex");
}
},this);
}else{
if(this.tabIndex!=""){
this.set("tabIndex",this.tabIndex);
}
}
},_onFocus:function(by){
if(by=="mouse"&&this.isFocusable()){
var _470=this.connect(this.focusNode,"onfocus",function(){
this.disconnect(_471);
this.disconnect(_470);
});
var _471=this.connect(win.body(),"onmouseup",function(){
this.disconnect(_471);
this.disconnect(_470);
if(this.focused){
this.focus();
}
});
}
if(this.scrollOnFocus){
this.defer(function(){
_46c.scrollIntoView(this.domNode);
});
}
this.inherited(arguments);
},isFocusable:function(){
return !this.disabled&&this.focusNode&&(_46a.get(this.domNode,"display")!="none");
},focus:function(){
if(!this.disabled&&this.focusNode.focus){
try{
this.focusNode.focus();
}
catch(e){
}
}
},compare:function(val1,val2){
if(typeof val1=="number"&&typeof val2=="number"){
return (isNaN(val1)&&isNaN(val2))?0:val1-val2;
}else{
if(val1>val2){
return 1;
}else{
if(val1<val2){
return -1;
}else{
return 0;
}
}
}
},onChange:function(){
},_onChangeActive:false,_handleOnChange:function(_472,_473){
if(this._lastValueReported==undefined&&(_473===null||!this._onChangeActive)){
this._resetValue=this._lastValueReported=_472;
}
this._pendingOnChange=this._pendingOnChange||(typeof _472!=typeof this._lastValueReported)||(this.compare(_472,this._lastValueReported)!=0);
if((this.intermediateChanges||_473||_473===undefined)&&this._pendingOnChange){
this._lastValueReported=_472;
this._pendingOnChange=false;
if(this._onChangeActive){
if(this._onChangeHandle){
this._onChangeHandle.remove();
}
this._onChangeHandle=this.defer(function(){
this._onChangeHandle=null;
this.onChange(_472);
});
}
}
},create:function(){
this.inherited(arguments);
this._onChangeActive=true;
},destroy:function(){
if(this._onChangeHandle){
this._onChangeHandle.remove();
this.onChange(this._lastValueReported);
}
this.inherited(arguments);
}});
});
},"idx/oneui/HoverCard":function(){
require({cache:{"url:idx/oneui/templates/HoverCard.html":"<div class=\"idxOneuiHoverCard idxOneuiHoverCardLeft\">\r\n\t<div role=\"document\"> <span data-dojo-attach-point=\"closeButtonNode, focusNode\" class=\"idxOneuiHoverCardCloseIcon\" data-dojo-attach-event=\"ondijitclick: hide\" role=\"button\" tabIndex=\"0\"></span></div>\r\n\t\r\n\t<div data-dojo-attach-point=\"bodyNode\" class=\"idxOneuiHoverCardBody\">\t\r\n\t\t<div class=\"idxOneuiHoverCardGrip\" data-dojo-attach-point=\"gripNode\"></div>\r\n\t\t<div class=\"idxOneuiHoverCardContainer\" role='alert' data-dojo-attach-point=\"containerNode\">\t\t\r\n\t\t</div>\r\n\t\t<div class=\"idxOneuiHoverCardFooter\">\r\n\t\t\t<div class=\"idxOneuiHoverCardActionIcons\" data-dojo-attach-point=\"actionIcons\"></div>\r\n\t\t\t<span aria-haspopup=\"true\" data-dojo-attach-point=\"moreActionsNode\"></span>\r\n\t\t</div>\r\n\t\t<div class=\"idxOneuiHoverCardFooterExpand\"></div>\r\n\t</div>\r\n\t<div class=\"idxOneuiHoverCardConnector\" data-dojo-attach-point=\"connectorNode\"></div>\r\n</div>\r\n\r\n\r\n"}});
define("idx/oneui/HoverCard",["dojo/_base/declare","dojo/_base/array","dojo/keys","dijit/focus","dijit/a11y","dojo/_base/event","dojo/_base/fx","dojo/_base/lang","dojo/_base/html","dojo/dom-geometry","dijit/place","dojo/dom","dojo/dom-style","dojo/dom-class","dojo/dnd/Moveable","dojo/dnd/TimedMoveable","dojo/_base/window","dojo/_base/connect","dojo/_base/sniff","dijit/_base/manager","dijit/BackgroundIframe","dijit/TooltipDialog","idx/oneui/Menu","dijit/MenuItem","dijit/form/DropDownButton","dijit/form/Button","dojo/text!./templates/HoverCard.html","dijit/dijit","dojo/i18n","dojo/i18n!./nls/HoverCard"],function(_474,_475,keys,_476,a11y,_477,fx,lang,html,_478,_479,dom,_47a,_47b,_47c,_47d,win,_47e,has,_47f,_480,_481,Menu,_482,_483,_484,_485,_486,i18n){
var _487=_474("idx.oneui.HoverCard",[_481],{templateString:_485,target:"",draggable:true,showDelay:500,hideDelay:800,moreActions:null,actions:null,content:null,forceFocus:false,duration:_47f.defaultDuration,postMixInProperties:function(){
this.moreActionsLabel=i18n.getLocalization("idx.oneui","HoverCard",this.lang).moreActionsLabel;
},_setTargetAttr:function(_488){
var _488=dom.byId(_488);
if(!_488){
return;
}
this._connections=[this.connect(_488,"onmouseenter","_onHover"),this.connect(_488,"onmouseleave","_onUnHover"),this.connect(_488,"onkeypress","_onConnectIdKey")];
this._set("target",_488);
},_onConnectIdKey:function(evt){
var node=evt.target;
if(evt.charOrCode==keys.ENTER||evt.charOrCode==keys.SPACE||evt.charOrCode==" "){
this._showTimer=setTimeout(lang.hitch(this,function(){
this.open(node);
}),this.showDelay);
_477.stop(evt);
}
},_setActionsAttr:function(_489){
_475.forEach(_489,function(_48a){
var _48b=new _484({iconClass:_48a.iconClass,onClick:_48a.content?lang.hitch(this,function(){
}):_48a.onClick,baseClass:"idxOneuiHoverCardFooterButton"});
html.place(_48b.domNode,this.actionIcons);
},this);
},_setMoreActionsAttr:function(_48c){
var menu=new Menu({});
_475.forEach(_48c,function(_48d){
menu.addChild(new _482({label:_48d.label,onClick:_48d.onClick}));
});
menu.startup();
var _48e=new _483({label:this.moreActionsLabel,dropDown:menu,baseClass:"idxOneuiHoverCardMenu"},this.moreActionsNode);
this.moreActionsMenu=menu;
},_setContentAttr:function(_48f){
var _490=_486.byId(_48f);
if(!_490.declaredClass){
this.inherited(arguments);
}else{
html.place(_490.domNode,this.containerNode);
_47b.toggle(this.containerNode,"idxOneuiHoverCardWithoutPreviewImg",!_490.image);
}
},_onHover:function(e){
if(!this._showTimer){
var _491=e.target;
this._showTimer=setTimeout(lang.hitch(this,function(){
this.open(_491);
}),this.showDelay);
}
if(this._hideTimer){
clearTimeout(this._hideTimer);
delete this._hideTimer;
}
},_onUnHover:function(){
if(this._focus){
return;
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
if(!this._hideTimer){
this._hideTimer=setTimeout(lang.hitch(this,function(){
this.close();
}),this.hideDelay);
}
},onBlur:function(){
this._hideTimer=setTimeout(lang.hitch(this,function(){
this.close();
}),this.hideDelay);
},_showConnector:function(){
var _492=this.connectorNode;
_47a.set(_492,"visibility","visible");
},postCreate:function(){
win.body().appendChild(this.domNode);
this.bgIframe=new _480(this.domNode);
this.fadeIn=fx.fadeIn({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onShow")});
this.fadeOut=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHide")});
this.connect(this.gripNode,"onmouseenter",function(){
_47b.add(this.gripNode,"idxOneuiHoverCardGripHover");
});
this.connect(this.gripNode,"onmouseleave",function(){
_47b.remove(this.gripNode,"idxOneuiHoverCardGripHover");
});
this.connect(this.domNode,"onkeypress","_onKey");
this.connect(this.domNode,"onmouseenter",function(){
this._hovered=true;
if(this._hideTimer){
clearTimeout(this._hideTimer);
delete this._hideTimer;
}
});
this.connect(this.domNode,"onmouseleave",function(){
this._hovered=false;
this._onUnHover();
});
},open:function(_493){
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
if(this.isShowingNow){
if(this.forceFocus){
this.focus();
}
return;
}
_47b.remove(this.domNode,"dijitHidden");
if(dojo.isIE<=7){
_47a.set(this.bodyNode,"width",_47a.get(this.containerNode,"width")+5+"px");
}
this.show(this.domNode.innerHTML,_493,this.position,!this.isLeftToRight(),this.textDir);
if(this.forceFocus){
this.focus();
}
this._connectNode=_493;
this.onShow(_493,this.position);
},close:function(){
if(this._connectNode&&!this._hovered&&!this._moved&&(!this.moreActionsMenu||!this.moreActionsMenu._hoveredChild)){
this.hide(this._connectNode);
delete this._connectNode;
this.onHide();
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
},focus:function(){
this.inherited(arguments);
this._focus=true;
},show:function(_494,_495,_496,rtl,_497){
this._showConnector();
this.domNode.width="auto";
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.set("textDir",_497);
this.containerNode.align=rtl?"right":"left";
var pos=_479.around(this.domNode,_495,_496&&_496.length?_496:_487.defaultPosition,!rtl,lang.hitch(this,"orient"));
var _498=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_498.y+((_498.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_498.x+((_498.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}
}
var node=this.domNode,_499=this.connectorNode;
if(this.gripNode&&this.draggable){
this._moveable=new ((has("ie")==6)?_47d:_47c)(node,{handle:this.gripNode});
this.connect(this._moveable,"onFirstMove",function(){
_47a.set(_499,"visibility","hidden");
_47b.add(this.gripNode,"idxOneuiHoverCardGripActive");
this._moved=true;
});
this.connect(this._moveable,"onMoveStop",function(){
_47b.remove(this.gripNode,"idxOneuiHoverCardGripActive");
_47b.add(this.gripNode,"idxOneuiHoverCardGrip");
});
}else{
}
_47a.set(this.domNode,{"opacity":0,"position":"absolute"});
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_495;
},orient:function(node,_49a,_49b,_49c,_49d){
this.connectorNode.style.top="";
var _49e=_49c.w-this.connectorNode.offsetWidth;
node.className="idxOneuiHoverCard "+{"MR-ML":"idxOneuiHoverCardRight","ML-MR":"idxOneuiHoverCardLeft","TM-BM":"idxOneuiHoverCardAbove","BM-TM":"idxOneuiHoverCardBelow","BL-TL":"idxOneuiHoverCardBelow idxOneuiHoverCardABLeft","TL-BL":"idxOneuiHoverCardAbove idxOneuiHoverCardABLeft","BR-TR":"idxOneuiHoverCardBelow idxOneuiHoverCardABRight","TR-BR":"idxOneuiHoverCardAbove idxOneuiHoverCardABRight","BR-BL":"idxOneuiHoverCardRight","BL-BR":"idxOneuiHoverCardLeft","TR-TL":"idxOneuiHoverCardRight"}[_49a+"-"+_49b];
this.domNode.style.width="auto";
var size=_478.getContentBox(this.domNode);
var _49f=Math.min((Math.max(_49e,1)),size.w);
var _4a0=_49f<size.w;
this.domNode.style.width=_49f+"px";
if(_4a0){
this.containerNode.style.overflow="auto";
var _4a1=this.containerNode.scrollWidth;
this.containerNode.style.overflow="visible";
if(_4a1>_49f){
_4a1=_4a1+_47a.get(this.domNode,"paddingLeft")+_47a.get(this.domNode,"paddingRight");
this.domNode.style.width=_4a1+"px";
}
}
if(_49b.charAt(0)=="B"&&_49a.charAt(0)=="B"){
var mb=_478.getMarginBox(node);
var _4a2=this.connectorNode.offsetHeight;
if(mb.h>_49c.h){
var _4a3=_49c.h-((_49d.h+_4a2)>>1);
this.connectorNode.style.top=_4a3+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_49d.h/2-_4a2/2,0),mb.h-_4a2)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_49e);
},hide:function(_4a4){
if(this._onDeck&&this._onDeck[1]==_4a4){
this._onDeck=null;
}else{
if(this.aroundNode===_4a4||this.isShowingNow){
this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play();
this._focus=false;
this._hovered=false;
this._moved=false;
_476.focus(this._connectNode);
}else{
}
}
},_onShow:function(){
if(has("ie")){
this.domNode.style.filter="";
}
},_onHide:function(){
_47b.add(this.domNode,"dijitHidden");
if(this._onDeck){
this.show.apply(this,this._onDeck);
this._onDeck=null;
}
},_getFocusItems:function(){
var _4a5=a11y._getTabNavigable(this.domNode);
this._firstFocusItem=_4a5.lowest||_4a5.first||this.closeButtonNode||this.domNode;
this._lastFocusItem=_4a5.last||_4a5.highest||this._firstFocusItem;
},_onKey:function(evt){
var node=evt.target;
if(evt.charOrCode===keys.TAB){
this._getFocusItems(this.domNode);
}
var _4a6=(this._firstFocusItem==this._lastFocusItem);
if(evt.charOrCode==keys.ESCAPE){
setTimeout(lang.hitch(this,"hide"),0);
_477.stop(evt);
}else{
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===keys.TAB){
if(!_4a6){
_476.focus(this._lastFocusItem);
}
_477.stop(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===keys.TAB&&!evt.shiftKey){
if(!_4a6){
_476.focus(this._firstFocusItem);
}
_477.stop(evt);
}else{
if(evt.charOrCode===keys.TAB){
evt.stopPropagation();
}
}
}
}
}});
_487.defaultPosition=["after-centered","before-centered","below","above"];
return _487;
});
},"dijit/layout/_ContentPaneResizeMixin":function(){
define("dijit/layout/_ContentPaneResizeMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/_base/lang","dojo/query","dojo/_base/sniff","dojo/_base/window","../registry","./utils","../_Contained"],function(_4a7,_4a8,_4a9,_4aa,_4ab,lang,_4ac,has,win,_4ad,_4ae,_4af){
return _4a8("dijit.layout._ContentPaneResizeMixin",null,{doLayout:true,isLayoutContainer:true,startup:function(){
if(this._started){
return;
}
var _4b0=this.getParent();
this._childOfLayoutWidget=_4b0&&_4b0.isLayoutContainer;
this._needLayout=!this._childOfLayoutWidget;
this.inherited(arguments);
if(this._isShown()){
this._onShow();
}
if(!this._childOfLayoutWidget){
this.connect(has("ie")?this.domNode:win.global,"onresize",function(){
this._needLayout=!this._childOfLayoutWidget;
this.resize();
});
}
},_checkIfSingleChild:function(){
var _4b1=_4ac("> *",this.containerNode).filter(function(node){
return node.tagName!=="SCRIPT";
}),_4b2=_4b1.filter(function(node){
return _4a9.has(node,"data-dojo-type")||_4a9.has(node,"dojoType")||_4a9.has(node,"widgetId");
}),_4b3=_4a7.filter(_4b2.map(_4ad.byNode),function(_4b4){
return _4b4&&_4b4.domNode&&_4b4.resize;
});
if(_4b1.length==_4b2.length&&_4b3.length==1){
this._singleChild=_4b3[0];
}else{
delete this._singleChild;
}
_4aa.toggle(this.containerNode,this.baseClass+"SingleChild",!!this._singleChild);
},resize:function(_4b5,_4b6){
if(!this._wasShown&&this.open!==false){
this._onShow();
}
this._resizeCalled=true;
this._scheduleLayout(_4b5,_4b6);
},_scheduleLayout:function(_4b7,_4b8){
if(this._isShown()){
this._layout(_4b7,_4b8);
}else{
this._needLayout=true;
this._changeSize=_4b7;
this._resultSize=_4b8;
}
},_layout:function(_4b9,_4ba){
if(_4b9){
_4ab.setMarginBox(this.domNode,_4b9);
}
var cn=this.containerNode;
if(cn===this.domNode){
var mb=_4ba||{};
lang.mixin(mb,_4b9||{});
if(!("h" in mb)||!("w" in mb)){
mb=lang.mixin(_4ab.getMarginBox(cn),mb);
}
this._contentBox=_4ae.marginBox2contentBox(cn,mb);
}else{
this._contentBox=_4ab.getContentBox(cn);
}
this._layoutChildren();
delete this._needLayout;
},_layoutChildren:function(){
if(this.doLayout){
this._checkIfSingleChild();
}
if(this._singleChild&&this._singleChild.resize){
var cb=this._contentBox||_4ab.getContentBox(this.containerNode);
this._singleChild.resize({w:cb.w,h:cb.h});
}else{
_4a7.forEach(this.getChildren(),function(_4bb){
if(_4bb.resize){
_4bb.resize();
}
});
}
},_isShown:function(){
if(this._childOfLayoutWidget){
if(this._resizeCalled&&"open" in this){
return this.open;
}
return this._resizeCalled;
}else{
if("open" in this){
return this.open;
}else{
var node=this.domNode,_4bc=this.domNode.parentNode;
return (node.style.display!="none")&&(node.style.visibility!="hidden")&&!_4aa.contains(node,"dijitHidden")&&_4bc&&_4bc.style&&(_4bc.style.display!="none");
}
}
},_onShow:function(){
if(this._needLayout){
this._layout(this._changeSize,this._resultSize);
}
this.inherited(arguments);
this._wasShown=true;
}});
});
},"dijit/WidgetSet":function(){
define("dijit/WidgetSet",["dojo/_base/array","dojo/_base/declare","dojo/_base/window","./registry"],function(_4bd,_4be,win,_4bf){
var _4c0=_4be("dijit.WidgetSet",null,{constructor:function(){
this._hash={};
this.length=0;
},add:function(_4c1){
if(this._hash[_4c1.id]){
throw new Error("Tried to register widget with id=="+_4c1.id+" but that id is already registered");
}
this._hash[_4c1.id]=_4c1;
this.length++;
},remove:function(id){
if(this._hash[id]){
delete this._hash[id];
this.length--;
}
},forEach:function(func,_4c2){
_4c2=_4c2||win.global;
var i=0,id;
for(id in this._hash){
func.call(_4c2,this._hash[id],i++,this._hash);
}
return this;
},filter:function(_4c3,_4c4){
_4c4=_4c4||win.global;
var res=new _4c0(),i=0,id;
for(id in this._hash){
var w=this._hash[id];
if(_4c3.call(_4c4,w,i++,this._hash)){
res.add(w);
}
}
return res;
},byId:function(id){
return this._hash[id];
},byClass:function(cls){
var res=new _4c0(),id,_4c5;
for(id in this._hash){
_4c5=this._hash[id];
if(_4c5.declaredClass==cls){
res.add(_4c5);
}
}
return res;
},toArray:function(){
var ar=[];
for(var id in this._hash){
ar.push(this._hash[id]);
}
return ar;
},map:function(func,_4c6){
return _4bd.map(this.toArray(),func,_4c6);
},every:function(func,_4c7){
_4c7=_4c7||win.global;
var x=0,i;
for(i in this._hash){
if(!func.call(_4c7,this._hash[i],x++,this._hash)){
return false;
}
}
return true;
},some:function(func,_4c8){
_4c8=_4c8||win.global;
var x=0,i;
for(i in this._hash){
if(func.call(_4c8,this._hash[i],x++,this._hash)){
return true;
}
}
return false;
}});
_4bd.forEach(["forEach","filter","byClass","map","every","some"],function(func){
_4bf[func]=_4c0.prototype[func];
});
return _4c0;
});
},"dojo/dnd/Moveable":function(){
define("dojo/dnd/Moveable",["../main","../Evented","../touch","./Mover"],function(dojo,_4c9,_4ca){
dojo.declare("dojo.dnd.Moveable",[_4c9],{handle:"",delay:0,skip:false,constructor:function(node,_4cb){
this.node=dojo.byId(node);
if(!_4cb){
_4cb={};
}
this.handle=_4cb.handle?dojo.byId(_4cb.handle):null;
if(!this.handle){
this.handle=this.node;
}
this.delay=_4cb.delay>0?_4cb.delay:0;
this.skip=_4cb.skip;
this.mover=_4cb.mover?_4cb.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,_4ca.press,this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")];
},markupFactory:function(_4cc,node,ctor){
return new ctor(node,_4cc);
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null;
},onMouseDown:function(e){
if(this.skip&&dojo.dnd.isFormElement(e)){
return;
}
if(this.delay){
this.events.push(dojo.connect(this.handle,_4ca.move,this,"onMouseMove"),dojo.connect(this.handle,_4ca.release,this,"onMouseUp"));
this._lastX=e.pageX;
this._lastY=e.pageY;
}else{
this.onDragDetected(e);
}
dojo.stopEvent(e);
},onMouseMove:function(e){
if(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay){
this.onMouseUp(e);
this.onDragDetected(e);
}
dojo.stopEvent(e);
},onMouseUp:function(e){
for(var i=0;i<2;++i){
dojo.disconnect(this.events.pop());
}
dojo.stopEvent(e);
},onSelectStart:function(e){
if(!this.skip||!dojo.dnd.isFormElement(e)){
dojo.stopEvent(e);
}
},onDragDetected:function(e){
new this.mover(this.node,e,this);
},onMoveStart:function(_4cd){
dojo.publish("/dnd/move/start",[_4cd]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem");
},onMoveStop:function(_4ce){
dojo.publish("/dnd/move/stop",[_4ce]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem");
},onFirstMove:function(_4cf,e){
},onMove:function(_4d0,_4d1,e){
this.onMoving(_4d0,_4d1);
var s=_4d0.node.style;
s.left=_4d1.l+"px";
s.top=_4d1.t+"px";
this.onMoved(_4d0,_4d1);
},onMoving:function(_4d2,_4d3){
},onMoved:function(_4d4,_4d5){
}});
return dojo.dnd.Moveable;
});
},"dijit/TooltipDialog":function(){
require({cache:{"url:dijit/templates/TooltipDialog.html":"<div role=\"presentation\" tabIndex=\"-1\">\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" data-dojo-attach-point=\"containerNode\" role=\"dialog\"></div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\"></div>\n</div>\n"}});
define("dijit/TooltipDialog",["dojo/_base/declare","dojo/dom-class","dojo/_base/event","dojo/keys","dojo/_base/lang","./focus","./layout/ContentPane","./_DialogMixin","./form/_FormMixin","./_TemplatedMixin","dojo/text!./templates/TooltipDialog.html","."],function(_4d6,_4d7,_4d8,keys,lang,_4d9,_4da,_4db,_4dc,_4dd,_4de,_4df){
return _4d6("dijit.TooltipDialog",[_4da,_4dd,_4dc,_4db],{title:"",doLayout:false,autofocus:true,baseClass:"dijitTooltipDialog",_firstFocusItem:null,_lastFocusItem:null,templateString:_4de,_setTitleAttr:function(_4e0){
this.containerNode.title=_4e0;
this._set("title",_4e0);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
},orient:function(node,_4e1,_4e2){
var newC="dijitTooltipAB"+(_4e2.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(_4e2.charAt(0)=="T"?"Below":"Above");
_4d7.replace(this.domNode,newC,this._currentOrientClass||"");
this._currentOrientClass=newC;
},focus:function(){
this._getFocusItems(this.containerNode);
_4d9.focus(this._firstFocusItem);
},onOpen:function(pos){
this.orient(this.domNode,pos.aroundCorner,pos.corner);
this._onShow();
},onClose:function(){
this.onHide();
},_onKey:function(evt){
var node=evt.target;
if(evt.charOrCode===keys.TAB){
this._getFocusItems(this.containerNode);
}
var _4e3=(this._firstFocusItem==this._lastFocusItem);
if(evt.charOrCode==keys.ESCAPE){
setTimeout(lang.hitch(this,"onCancel"),0);
_4d8.stop(evt);
}else{
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===keys.TAB){
if(!_4e3){
_4d9.focus(this._lastFocusItem);
}
_4d8.stop(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===keys.TAB&&!evt.shiftKey){
if(!_4e3){
_4d9.focus(this._firstFocusItem);
}
_4d8.stop(evt);
}else{
if(evt.charOrCode===keys.TAB){
evt.stopPropagation();
}
}
}
}
}});
});
},"dojox/collections/Dictionary":function(){
define("dojox/collections/Dictionary",["dojo/_base/kernel","dojo/_base/array","./_base"],function(dojo,_4e4,dxc){
dxc.Dictionary=function(_4e5){
var _4e6={};
this.count=0;
var _4e7={};
this.add=function(k,v){
var b=(k in _4e6);
_4e6[k]=new dxc.DictionaryEntry(k,v);
if(!b){
this.count++;
}
};
this.clear=function(){
_4e6={};
this.count=0;
};
this.clone=function(){
return new dxc.Dictionary(this);
};
this.contains=this.containsKey=function(k){
if(_4e7[k]){
return false;
}
return (_4e6[k]!=null);
};
this.containsValue=function(v){
var e=this.getIterator();
while(e.get()){
if(e.element.value==v){
return true;
}
}
return false;
};
this.entry=function(k){
return _4e6[k];
};
this.forEach=function(fn,_4e8){
var a=[];
for(var p in _4e6){
if(!_4e7[p]){
a.push(_4e6[p]);
}
}
dojo.forEach(a,fn,_4e8);
};
this.getKeyList=function(){
return (this.getIterator()).map(function(_4e9){
return _4e9.key;
});
};
this.getValueList=function(){
return (this.getIterator()).map(function(_4ea){
return _4ea.value;
});
};
this.item=function(k){
if(k in _4e6){
return _4e6[k].valueOf();
}
return undefined;
};
this.getIterator=function(){
return new dxc.DictionaryIterator(_4e6);
};
this.remove=function(k){
if(k in _4e6&&!_4e7[k]){
delete _4e6[k];
this.count--;
return true;
}
return false;
};
if(_4e5){
var e=_4e5.getIterator();
while(e.get()){
this.add(e.element.key,e.element.value);
}
}
};
return dxc.Dictionary;
});
},"dijit/typematic":function(){
define("dijit/typematic",["dojo/_base/array","dojo/_base/connect","dojo/_base/event","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/_base/sniff","."],function(_4eb,_4ec,_4ed,_4ee,lang,on,has,_4ef){
var _4f0=(_4ef.typematic={_fireEventAndReload:function(){
this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=Math.max(this._currentTimeout<0?this._initialDelay:(this._subsequentDelay>1?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay)),this._minDelay);
this._timer=setTimeout(lang.hitch(this,"_fireEventAndReload"),this._currentTimeout);
},trigger:function(evt,_4f1,node,_4f2,obj,_4f3,_4f4,_4f5){
if(obj!=this._obj){
this.stop();
this._initialDelay=_4f4||500;
this._subsequentDelay=_4f3||0.9;
this._minDelay=_4f5||10;
this._obj=obj;
this._evt=evt;
this._node=node;
this._currentTimeout=-1;
this._count=-1;
this._callback=lang.hitch(_4f1,_4f2);
this._fireEventAndReload();
this._evt=lang.mixin({faux:true},evt);
}
},stop:function(){
if(this._timer){
clearTimeout(this._timer);
this._timer=null;
}
if(this._obj){
this._callback(-1,this._node,this._evt);
this._obj=null;
}
},addKeyListener:function(node,_4f6,_4f7,_4f8,_4f9,_4fa,_4fb){
if(_4f6.keyCode){
_4f6.charOrCode=_4f6.keyCode;
_4ee.deprecated("keyCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}else{
if(_4f6.charCode){
_4f6.charOrCode=String.fromCharCode(_4f6.charCode);
_4ee.deprecated("charCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}
}
var _4fc=[on(node,_4ec._keypress,lang.hitch(this,function(evt){
if(evt.charOrCode==_4f6.charOrCode&&(_4f6.ctrlKey===undefined||_4f6.ctrlKey==evt.ctrlKey)&&(_4f6.altKey===undefined||_4f6.altKey==evt.altKey)&&(_4f6.metaKey===undefined||_4f6.metaKey==(evt.metaKey||false))&&(_4f6.shiftKey===undefined||_4f6.shiftKey==evt.shiftKey)){
_4ed.stop(evt);
_4f0.trigger(evt,_4f7,node,_4f8,_4f6,_4f9,_4fa,_4fb);
}else{
if(_4f0._obj==_4f6){
_4f0.stop();
}
}
})),on(node,"keyup",lang.hitch(this,function(){
if(_4f0._obj==_4f6){
_4f0.stop();
}
}))];
return {remove:function(){
_4eb.forEach(_4fc,function(h){
h.remove();
});
}};
},addMouseListener:function(node,_4fd,_4fe,_4ff,_500,_501){
var _502=[on(node,"mousedown",lang.hitch(this,function(evt){
_4ed.stop(evt);
_4f0.trigger(evt,_4fd,node,_4fe,node,_4ff,_500,_501);
})),on(node,"mouseup",lang.hitch(this,function(evt){
if(this._obj){
_4ed.stop(evt);
}
_4f0.stop();
})),on(node,"mouseout",lang.hitch(this,function(evt){
_4ed.stop(evt);
_4f0.stop();
})),on(node,"mousemove",lang.hitch(this,function(evt){
evt.preventDefault();
})),on(node,"dblclick",lang.hitch(this,function(evt){
_4ed.stop(evt);
if(has("ie")<9){
_4f0.trigger(evt,_4fd,node,_4fe,node,_4ff,_500,_501);
setTimeout(lang.hitch(this,_4f0.stop),50);
}
}))];
return {remove:function(){
_4eb.forEach(_502,function(h){
h.remove();
});
}};
},addListener:function(_503,_504,_505,_506,_507,_508,_509,_50a){
var _50b=[this.addKeyListener(_504,_505,_506,_507,_508,_509,_50a),this.addMouseListener(_503,_506,_507,_508,_509,_50a)];
return {remove:function(){
_4eb.forEach(_50b,function(h){
h.remove();
});
}};
}});
return _4f0;
});
},"dijit/MenuItem":function(){
require({cache:{"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n"}});
define("dijit/MenuItem",["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/event","dojo/_base/kernel","dojo/_base/sniff","./_Widget","./_TemplatedMixin","./_Contained","./_CssStateMixin","dojo/text!./templates/MenuItem.html"],function(_50c,dom,_50d,_50e,_50f,_510,has,_511,_512,_513,_514,_515){
return _50c("dijit.MenuItem",[_511,_512,_513,_514],{templateString:_515,baseClass:"dijitMenuItem",label:"",_setLabelAttr:{node:"containerNode",type:"innerHTML"},iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},accelKey:"",disabled:false,_fillContent:function(_516){
if(_516&&!("label" in this.params)){
this.set("label",_516.innerHTML);
}
},buildRendering:function(){
this.inherited(arguments);
var _517=this.id+"_text";
_50d.set(this.containerNode,"id",_517);
if(this.accelKeyNode){
_50d.set(this.accelKeyNode,"id",this.id+"_accel");
_517+=" "+this.id+"_accel";
}
this.domNode.setAttribute("aria-labelledby",_517);
dom.setSelectable(this.domNode,false);
},_onHover:function(){
this.getParent().onItemHover(this);
},_onUnhover:function(){
this.getParent().onItemUnhover(this);
this._set("hovering",false);
},_onClick:function(evt){
this.getParent().onItemClick(this,evt);
_50f.stop(evt);
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
},_setSelected:function(_518){
_50e.toggle(this.domNode,"dijitMenuItemSelected",_518);
},setLabel:function(_519){
_510.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_519);
},setDisabled:function(_51a){
_510.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_51a);
},_setDisabledAttr:function(_51b){
this.focusNode.setAttribute("aria-disabled",_51b?"true":"false");
this._set("disabled",_51b);
},_setAccelKeyAttr:function(_51c){
this.accelKeyNode.style.display=_51c?"":"none";
this.accelKeyNode.innerHTML=_51c;
_50d.set(this.containerNode,"colSpan",_51c?"1":"2");
this._set("accelKey",_51c);
}});
});
},"dijit/MenuBarItem":function(){
require({cache:{"url:dijit/templates/MenuBarItem.html":"<div class=\"dijitReset dijitInline dijitMenuItem dijitMenuItemLabel\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<span data-dojo-attach-point=\"containerNode\"></span>\n</div>\n"}});
define("dijit/MenuBarItem",["dojo/_base/declare","./MenuItem","dojo/text!./templates/MenuBarItem.html"],function(_51d,_51e,_51f){
var _520=_51d("dijit._MenuBarItemMixin",null,{templateString:_51f,_setIconClassAttr:null});
var _521=_51d("dijit.MenuBarItem",[_51e,_520],{});
_521._MenuBarItemMixin=_520;
return _521;
});
},"dijit/MenuBar":function(){
require({cache:{"url:dijit/templates/MenuBar.html":"<div class=\"dijitMenuBar dijitMenuPassive\" data-dojo-attach-point=\"containerNode\"  role=\"menubar\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress: _onKeyPress\"></div>\n"}});
define("dijit/MenuBar",["dojo/_base/declare","dojo/_base/event","dojo/keys","./_MenuBase","dojo/text!./templates/MenuBar.html"],function(_522,_523,keys,_524,_525){
return _522("dijit.MenuBar",_524,{templateString:_525,baseClass:"dijitMenuBar",_isMenuBar:true,postCreate:function(){
var l=this.isLeftToRight();
this.connectKeyNavHandlers(l?[keys.LEFT_ARROW]:[keys.RIGHT_ARROW],l?[keys.RIGHT_ARROW]:[keys.LEFT_ARROW]);
this._orient=["below"];
},focusChild:function(item){
var _526=this.focusedChild,_527=_526&&_526.popup&&_526.popup.isShowingNow;
this.inherited(arguments);
if(_527&&item.popup&&!item.disabled){
this._openPopup();
}
},_onKeyPress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
switch(evt.charOrCode){
case keys.DOWN_ARROW:
this._moveToPopup(evt);
_523.stop(evt);
}
},onItemClick:function(item,evt){
if(item.popup&&item.popup.isShowingNow){
item.popup.onCancel();
}else{
this.inherited(arguments);
}
}});
});
},"dijit/layout/_LayoutWidget":function(){
define("dijit/layout/_LayoutWidget",["dojo/_base/lang","../_Widget","../_Container","../_Contained","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/sniff","dojo/_base/window"],function(lang,_528,_529,_52a,_52b,_52c,_52d,_52e,has,win){
return _52b("dijit.layout._LayoutWidget",[_528,_529,_52a],{baseClass:"dijitLayoutContainer",isLayoutContainer:true,buildRendering:function(){
this.inherited(arguments);
_52c.add(this.domNode,"dijitContainer");
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
var _52f=this.getParent&&this.getParent();
if(!(_52f&&_52f.isLayoutContainer)){
this.resize();
this.connect(win.global,"onresize",function(){
this.resize();
});
}
},resize:function(_530,_531){
var node=this.domNode;
if(_530){
_52d.setMarginBox(node,_530);
}
var mb=_531||{};
lang.mixin(mb,_530||{});
if(!("h" in mb)||!("w" in mb)){
mb=lang.mixin(_52d.getMarginBox(node),mb);
}
var cs=_52e.getComputedStyle(node);
var me=_52d.getMarginExtents(node,cs);
var be=_52d.getBorderExtents(node,cs);
var bb=(this._borderBox={w:mb.w-(me.w+be.w),h:mb.h-(me.h+be.h)});
var pe=_52d.getPadExtents(node,cs);
this._contentBox={l:_52e.toPixelValue(node,cs.paddingLeft),t:_52e.toPixelValue(node,cs.paddingTop),w:bb.w-pe.w,h:bb.h-pe.h};
this.layout();
},layout:function(){
},_setupChild:function(_532){
var cls=this.baseClass+"-child "+(_532.baseClass?this.baseClass+"-"+_532.baseClass:"");
_52c.add(_532.domNode,cls);
},addChild:function(_533,_534){
this.inherited(arguments);
if(this._started){
this._setupChild(_533);
}
},removeChild:function(_535){
var cls=this.baseClass+"-child"+(_535.baseClass?" "+this.baseClass+"-"+_535.baseClass:"");
_52c.remove(_535.domNode,cls);
this.inherited(arguments);
}});
});
},"curam/util/SessionTimeout":function(){
define("curam/util/SessionTimeout",["curam/util","dojo/_base/lang","curam/debug","curam/html","curam/util/UimDialog","curam/util/ResourceBundle"],function(util,lang,_536,html,_537){
dojo.requireLocalization("curam.application","TimeoutWarning");
var _538=new curam.util.ResourceBundle("TimeoutWarning");
curam.define.singleton("curam.util.SessionTimeout",{logoutPageID:"",minutes:0,seconds:0,userMessageNode:null,userMessageNodeID:"userMessage",displayTimerNodeID:"displayTimer",stopTimer:false,updatedUserMessage:null,dismissModalBtnTxt:null,displayButtonCssNames:".initially-hidden-widget.btn-id-1",doLogout:true,timeForDialogToAppear:0,sessTimeoutWarningJSPXDialog:"external-session-timeout-warning-dialog.jspx",sessTimeoutJSPXDialog:"external-session-timeout-dialog.jspx",bufferingPeriod:null,checkSessionExpired:function(_539,_53a,_53b,_53c){
this.width=_539;
this.height=_53a;
this.timeoutPeriod=_53b;
this.stopChecking=false;
this.interval=10000;
this.bufferingPeriod=_53c==undefined?30000:_53c*1000;
this.executeChecking=setInterval(function(){
curam.util.SessionTimeout._executeSessionExpiredCheck();
},this.interval);
},_executeSessionExpiredCheck:function(){
var _53d=curam.util.getCookie("sessionExpiry");
if(this.currSessionExpCookie){
if(this.currSessionExpCookie!=_53d){
this.timeForDialogToAppear=-10000;
this.validCookie=this._sessionExpiryCookieIsAsExpected(_53d);
}
}else{
this.validCookie=this._sessionExpiryCookieIsAsExpected(_53d);
this._ammendTimeoutPeriodForMisconfiguration(this.validCookie);
}
this.currSessionExpCookie=_53d;
this.timeForDialogToAppear=this.timeForDialogToAppear+this.interval;
if(this.validCookie){
this.sessionExpiry=Math.abs(this.validCookie[0]);
this.serverTime=Math.abs(this.validCookie[1]);
var _53e=this.serverTime+this.timeForDialogToAppear+this.bufferingPeriod;
var _53f=this.sessionExpiry-(this.timeoutPeriod*1000);
this.totalExpirySeverTime=_53f;
this.totalCurrServerTime=_53e;
if(_53e>=_53f&&this.stopChecking!=true){
this.stopChecking=true;
if(window.top.openModal!=undefined){
window.top.openModal(this.sessTimeoutWarningJSPXDialog,{width:this.width,height:this.height});
}
clearInterval(this.executeChecking);
}
}
},_sessionExpiryCookieIsAsExpected:function(_540){
var _541=true;
if(_540!=null){
var _542=_540.split("-",2);
if(_542&&_542.length==2){
for(token in _542){
var _543=Math.abs(token);
if(isNaN(_543)){
_541=false;
}
}
if(_541==true){
return _542;
}
}
}
},_ammendTimeoutPeriodForMisconfiguration:function(_544){
if(_544){
var _545=Math.abs(this.validCookie[0]);
var _546=Math.abs(this.validCookie[1]);
var _547=(_545-(_546+this.interval+this.bufferingPeriod))/1000;
_547=_547<=0?0:_547;
var _548=this.getTimeoutWarningConfig();
if(_548){
var _549=_548.timeout;
_549=_549<=0?0:_549;
if(_549>=_547){
this.getTimeoutWarningConfig("timeout",_547);
}
}
}
},getTimeoutWarningConfig:function(_54a,_54b){
if(window.top.getAppConfig){
var _54c=window.top.getAppConfig();
var _54d=_54c.timeoutWarning;
if(_54d&&_54a&&_54b){
_54d[_54a]=_54b;
}
return _54d;
}
},displayTimerAndLogout:function(_54e,_54f,_550,_551,_552,_553){
this.executeTimer=setInterval(function(){
curam.util.SessionTimeout.timer();
},1000);
this.minutes=~~(_54f/60);
this.seconds=_54f%60;
this.timerNode=dojo.byId(this.displayTimerNodeID);
this.userMessageNode=dojo.byId(this.userMessageNodeID);
this.logoutPageID=_54e;
this.updatedUserMessage=_550;
this.dismissModalBtnTxt=_551;
this.expiredTitleText=_552;
this.titleNode=window.top.dojo.byId(_553);
},timer:function(){
if(this.stopTimer!=true){
var _554="";
if(this.seconds<10){
_554=this.minutes+" : 0"+this.seconds;
}else{
_554=this.minutes+" : "+this.seconds;
}
this.timerNode.innerHTML="&#x202A;"+_554+"&#x202C;";
if(this.seconds==0){
this.seconds=59;
this.minutes=this.minutes-1;
}else{
this.seconds=this.seconds-1;
}
if(this.minutes==0&&this.seconds==0){
this.quitTimeoutWarningDialog();
this.stopTimer();
}
if(this.seconds==0){
this.minutes=this.minutes-1;
this.seconds=59;
}
}
},stopTimer:function(){
clearInterval(this.executeTimer);
},quitTimeoutWarningDialog:function(_555){
var _556={pageID:this.logoutPageID};
window.top.displayContent(_556);
},dismissTimeoutDialog:function(){
window.top.location=jsBaseURL+"/"+"application.do";
},continueUsingApp:function(){
_536.log(_538.getProperty("continueApp"));
this.stopTimer();
},dismissTimeoutWarningModal:function(){
_536.log(_538.getProperty("dismissTimeoutModal"));
},displayUserMsgAsParagraphs:function(msg,_557){
var _558;
if(_557){
_558=_557;
}else{
_558=dojo.byId(this.userMessageNodeID);
}
var _559=curam.html.splitWithTag(msg,"\\n","p");
_558.innerHTML=_559;
this.userMessageNode=_558;
}});
return curam.util.SessionTimeout;
});
},"dijit/popup":function(){
define("dijit/popup",["dojo/_base/array","dojo/aspect","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/window","./place","./BackgroundIframe","."],function(_55a,_55b,_55c,_55d,dom,_55e,_55f,_560,_561,_562,has,keys,lang,on,win,_563,_564,_565){
function _566(){
if(this._popupWrapper){
_55f.destroy(this._popupWrapper);
delete this._popupWrapper;
}
};
var _567=_55d(null,{_stack:[],_beginZIndex:1000,_idGen:1,_createWrapper:function(_568){
var _569=_568._popupWrapper,node=_568.domNode;
if(!_569){
_569=_55f.create("div",{"class":"dijitPopup",style:{display:"none"},role:"presentation"},win.body());
_569.appendChild(node);
var s=node.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
_568._popupWrapper=_569;
_55b.after(_568,"destroy",_566,true);
}
return _569;
},moveOffScreen:function(_56a){
var _56b=this._createWrapper(_56a);
_561.set(_56b,{visibility:"hidden",top:"-9999px",display:""});
},hide:function(_56c){
var _56d=this._createWrapper(_56c);
_561.set(_56d,"display","none");
},getTopPopup:function(){
var _56e=this._stack;
for(var pi=_56e.length-1;pi>0&&_56e[pi].parent===_56e[pi-1].widget;pi--){
}
return _56e[pi];
},open:function(args){
var _56f=this._stack,_570=args.popup,_571=args.orient||["below","below-alt","above","above-alt"],ltr=args.parent?args.parent.isLeftToRight():_560.isBodyLtr(),_572=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+this._idGen++);
while(_56f.length&&(!args.parent||!dom.isDescendant(args.parent.domNode,_56f[_56f.length-1].widget.domNode))){
this.close(_56f[_56f.length-1].widget);
}
var _573=this._createWrapper(_570);
_55e.set(_573,{id:id,style:{zIndex:this._beginZIndex+_56f.length},"class":"dijitPopup "+(_570.baseClass||_570["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:args.parent?args.parent.id:""});
if(has("bgIframe")&&!_570.bgIframe){
_570.bgIframe=new _564(_573);
}
var best=_572?_563.around(_573,_572,_571,ltr,_570.orient?lang.hitch(_570,"orient"):null):_563.at(_573,args,_571=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],args.padding);
_573.style.display="";
_573.style.visibility="visible";
_570.domNode.style.visibility="visible";
var _574=[];
_574.push(on(_573,_55c._keypress,lang.hitch(this,function(evt){
if(evt.charOrCode==keys.ESCAPE&&args.onCancel){
_562.stop(evt);
args.onCancel();
}else{
if(evt.charOrCode===keys.TAB){
_562.stop(evt);
var _575=this.getTopPopup();
if(_575&&_575.onCancel){
_575.onCancel();
}
}
}
})));
if(_570.onCancel&&args.onCancel){
_574.push(_570.on("cancel",args.onCancel));
}
_574.push(_570.on(_570.onExecute?"execute":"change",lang.hitch(this,function(){
var _576=this.getTopPopup();
if(_576&&_576.onExecute){
_576.onExecute();
}
})));
_56f.push({widget:_570,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:_574});
if(_570.onOpen){
_570.onOpen(best);
}
return best;
},close:function(_577){
var _578=this._stack;
while((_577&&_55a.some(_578,function(elem){
return elem.widget==_577;
}))||(!_577&&_578.length)){
var top=_578.pop(),_579=top.widget,_57a=top.onClose;
if(_579.onClose){
_579.onClose();
}
var h;
while(h=top.handlers.pop()){
h.remove();
}
if(_579&&_579.domNode){
this.hide(_579);
}
if(_57a){
_57a();
}
}
}});
return (_565.popup=new _567());
});
},"dijit/_base/manager":function(){
define("dijit/_base/manager",["dojo/_base/array","dojo/_base/config","../registry",".."],function(_57b,_57c,_57d,_57e){
_57b.forEach(["byId","getUniqueId","findWidgets","_destroyAll","byNode","getEnclosingWidget"],function(name){
_57e[name]=_57d[name];
});
_57e.defaultDuration=_57c["defaultDuration"]||200;
return _57e;
});
},"curam/widget/containers/TransitionContainer":function(){
define("curam/widget/containers/TransitionContainer",["dojo/_base/declare","dojo/parser","dijit/_Widget","dojo/dom-construct","dojo/_base/window","dijit/layout/ContentPane","dojo/dom-class","dojo/_base/fx","curam/util/cache/CacheLRU","dojox/layout/ContentPane","dojo/_base/array","dojo/query"],function(_57f,_580,_581,_582,_583,_584,_585,fx,_586,_587,_588,_589){
return _57f("curam.widget.containers.TransitionContainer",[_584],{transitionDuration:200,_panelCache:null,_currentlyDisplayedPanelKey:-1,_panelToLoadKey:-1,_beenProcessed:false,constructor:function(args){
var _58a={maxSize:5};
this._panelCache=new _586(_58a);
},_buildPramUrl:function(_58b){
var _58c="";
if(_58b.param!=null){
_588.forEach(_58b.param,function(_58d,i){
if(i>0){
_58c+="&";
}
_58c+=encodeURIComponent(_58d.paramKey)+"="+encodeURIComponent(_58d.paramValue);
});
}
return _58c;
},_setDisplayPanelAttr:function(_58e){
_58e=this._doDataTranslation(_58e);
var _58f=this._buildPramUrl(_58e);
var _590=_58e.key;
if(this._currentlyDisplayedPanelKey!=_590){
this._panelCache.getItem(this._currentlyDisplayedPanelKey);
var _591=this._panelCache.getItem(_590);
if(_591==null){
var uri=this._doResourceLookUp(_58e,_58f,_590);
uri=this._applyParamToUri(_58e,_58f,_590,uri);
var _592=new _587({href:uri,preload:false,preventCache:true,executeScripts:true,scriptHasHooks:true,refreshOnShow:false,open:false,style:{padding:0,border:0,opacity:0}});
_592=this._contentPaneCreated(_58e,_58f,_590,_592);
var _593={node:_592.domNode,duration:this.transitionDuration,onEnd:dojo.hitch(this,this._panelFadeInComplete)};
var _594=dojo.hitch(this,function(key){
this._panelFadedOut(key);
});
var _595={node:_592.domNode,duration:this.transitionDuration,onEnd:function(){
console.info("Fadding out onEnd Called for : "+_590);
_594(_590);
}};
var _596=fx.fadeIn(_593);
var _597=fx.fadeOut(_595);
_591={panel:_592,fadeIn:_596,fadeOut:_597};
var _598={callback:function(key,item){
try{
item.panel.destroy();
delete item;
}
catch(err){
console.error(err);
}
}};
this._panelCache.addItem(_590,_591,_598);
}else{
console.info("Doning nothing as panel all ready exists");
if(_58e.forceRefresh){
var _591=this._panelCache.getItem(_590);
if(_591){
var uri=this._doResourceLookUp(_58e,_58f,_590);
uri=this._applyParamToUri(_58e,_58f,_590,uri);
_591.panel.open=false;
_591.panel.set("href",uri);
}
}
}
this._doSwapPanel(_58e,_590);
}else{
if(_58e.forceRefresh){
var _591=this._panelCache.getItem(this._currentlyDisplayedPanelKey);
if(_591){
var uri=this._doResourceLookUp(_58e,_58f,this._currentlyDisplayedPanelKey);
uri=this._applyParamToUri(_58e,_58f,_590,uri);
_591.panel.set("href",uri);
}
}
}
},_doDataTranslation:function(_599){
return _599;
},_contentPaneCreated:function(_59a,_59b,_59c,_59d){
return _59d;
},_doResourceLookUp:function(_59e,_59f,_5a0){
var uri=_59e.key;
return uri;
},_applyParamToUri:function(_5a1,_5a2,_5a3,uri){
if(_5a2.length>0){
if(uri.indexOf("?")!=-1){
uri+="&";
}else{
uri+="?";
}
uri+=_5a2;
}
return uri;
},_panelFadedOut:function(_5a4){
var _5a5=this._panelCache.getItem(_5a4);
_5a5.panel.cancel();
if(_5a5.panel.domNode!=null){
_585.add(_5a5.panel.domNode,"dijitHidden");
}else{
}
_5a5.panel.open=false;
_588.forEach(_589("iframe",_5a5.panel.domNode),function(_5a6){
_5a6.src="";
});
this._fadedOutPanelProcess(_5a5);
_582.place(_5a5.panel.domNode,_583.body());
this._panelFadeOutComplete();
this._panelFadeIn();
},_fadedOutPanelProcess:function(_5a7){
},_panelFadeOutComplete:function(){
},_panelFadeIn:function(){
if(this._panelToFadeInKey!=-1){
var _5a8=this._panelCache.getItem(this._panelToFadeInKey);
this.set("content",_5a8.panel);
this._currentlyDisplayedPanelKey=this._panelToFadeInKey;
if(_5a8.panel.domNode!=null){
_585.remove(_5a8.panel.domNode,"dijitHidden");
}else{
}
_5a8.panel.onLoad=function(){
_5a8.fadeIn.play();
};
_5a8.panel.open=true;
_5a8.panel.refresh();
_5a8.panel.resize();
}
},_panelFadeInComplete:function(){
},_doSwapPanel:function(_5a9,key){
var _5aa=this._panelCache.getItem(this._currentlyDisplayedPanelKey);
if(_5aa!=null){
this.fadeOutDisplay(key);
}else{
this._panelToFadeInKey=key;
this._panelFadeIn();
}
},fadeOutDisplay:function(key){
console.info("fadeOutDisplay");
if(key==null){
key=-1;
}
var _5ab=this._panelCache.getItem(this._currentlyDisplayedPanelKey);
if(_5ab!=null){
if(_5ab.fadeIn.status()=="playing"){
console.info("fadeOutDisplay  - currentlyDisplayedPanel.fadeIn.status() == playing");
_5ab.fadeIn.stop();
_5ab.fadeOut.play();
}else{
if(_5ab.fadeOut.status()!="playing"){
_5ab.fadeOut.play();
}
}
this._panelToFadeInKey=key;
}else{
this._panelToFadeInKey=key;
this._panelFadeIn();
}
},destroy:function(){
try{
this._panelCache.destroy();
}
catch(err){
console.error(err);
}
this.inherited(arguments);
}});
});
},"curam/util/onLoad":function(){
define("curam/util/onLoad",["curam/util","curam/define","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _5ac=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.onLoad",{EVENT:"/curam/frame/load",publishers:[],subscribers:[],defaultGetIdFunction:function(_5ad){
var _5ae=dojo.attr(_5ad,"class").split(" ");
return dojo.filter(_5ae,function(_5af){
return _5af.indexOf("iframe-")==0;
})[0];
},addPublisher:function(_5b0){
curam.util.onLoad.publishers.push(_5b0);
},addSubscriber:function(_5b1,_5b2,_5b3){
curam.util.onLoad.subscribers.push({"getId":_5b3?_5b3:curam.util.onLoad.defaultGetIdFunction,"callback":_5b2,"iframeId":_5b1});
},removeSubscriber:function(_5b4,_5b5,_5b6){
curam.util.onLoad.subscribers=dojo.filter(curam.util.onLoad.subscribers,function(_5b7){
return !(_5b7.iframeId==_5b4&&_5b7.callback==_5b5);
});
},execute:function(){
if(window.parent==window){
curam.debug.log("curam.util.onLoad.execute(): "+_5ac.getProperty("curam.util.onLoad.exit"));
return;
}
var _5b8={};
dojo.forEach(curam.util.onLoad.publishers,function(_5b9){
_5b9(_5b8);
});
curam.util.onLoad.publishers=[];
require(["dojo/io/iframe"]);
var _5ba=dojo.io.iframe.create(null,null,"about:blank");
dojo.attr(_5ba,"id","ie-progress-indicator-helper");
dojo.attr(_5ba,"title","ie-progress-indicator-helper");
window.parent.dojo.publish(curam.util.onLoad.EVENT,[window.frameElement,_5b8]);
}});
curam.util.subscribe(curam.util.onLoad.EVENT,function(_5bb,_5bc){
dojo.forEach(curam.util.onLoad.subscribers,function(_5bd){
var _5be=_5bd.getId(_5bb);
if(_5bd.iframeId==_5be){
_5bd.callback(_5be,_5bc);
}
});
});
return curam.util.onLoad;
});
},"url:dijit/templates/TooltipDialog.html":"<div role=\"presentation\" tabIndex=\"-1\">\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" data-dojo-attach-point=\"containerNode\" role=\"dialog\"></div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\"></div>\n</div>\n","dojo/dnd/Mover":function(){
define("dojo/dnd/Mover",["../main","../Evented","../touch","./common","./autoscroll"],function(dojo,_5bf,_5c0){
dojo.declare("dojo.dnd.Mover",[_5bf],{constructor:function(node,e,host){
this.node=dojo.byId(node);
this.marginBox={l:e.pageX,t:e.pageY};
this.mouseButton=e.button;
var h=(this.host=host),d=node.ownerDocument;
this.events=[dojo.connect(d,_5c0.move,this,"onFirstMove"),dojo.connect(d,_5c0.move,this,"onMouseMove"),dojo.connect(d,_5c0.release,this,"onMouseUp"),dojo.connect(d,"ondragstart",dojo.stopEvent),dojo.connect(d.body,"onselectstart",dojo.stopEvent)];
if(h&&h.onMoveStart){
h.onMoveStart(this);
}
},onMouseMove:function(e){
dojo.dnd.autoScroll(e);
var m=this.marginBox;
this.host.onMove(this,{l:m.l+e.pageX,t:m.t+e.pageY},e);
dojo.stopEvent(e);
},onMouseUp:function(e){
if(dojo.isWebKit&&dojo.isMac&&this.mouseButton==2?e.button==0:this.mouseButton==e.button){
this.destroy();
}
dojo.stopEvent(e);
},onFirstMove:function(e){
var s=this.node.style,l,t,h=this.host;
switch(s.position){
case "relative":
case "absolute":
l=Math.round(parseFloat(s.left))||0;
t=Math.round(parseFloat(s.top))||0;
break;
default:
s.position="absolute";
var m=dojo.marginBox(this.node);
var b=dojo.doc.body;
var bs=dojo.getComputedStyle(b);
var bm=dojo._getMarginBox(b,bs);
var bc=dojo._getContentBox(b,bs);
l=m.l-(bc.l-bm.l);
t=m.t-(bc.t-bm.t);
break;
}
this.marginBox.l=l-this.marginBox.l;
this.marginBox.t=t-this.marginBox.t;
if(h&&h.onFirstMove){
h.onFirstMove(this,e);
}
dojo.disconnect(this.events.shift());
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
var h=this.host;
if(h&&h.onMoveStop){
h.onMoveStop(this);
}
this.events=this.node=this.host=null;
}});
return dojo.dnd.Mover;
});
},"curam/ui/ClientDataAccessor":function(){
define("curam/ui/ClientDataAccessor",["curam/util/Request","curam/debug","curam/util/ResourceBundle"],function(_5c1){
dojo.requireLocalization("curam.application","Debug");
var _5c2=new curam.util.ResourceBundle("Debug");
return dojo.declare("curam.ui.ClientDataAccessor",null,{get:function(path,_5c3,_5c4,_5c5){
var _5c6="servlet/PathResolver"+"?p="+path;
if(_5c4==undefined){
_5c4=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_5c5==undefined){
_5c5=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
_5c1.post({url:_5c6,headers:{"Content-Encoding":"UTF-8"},handleAs:"text",preventCache:true,load:_5c3,error:_5c4,handle:_5c5});
},getList:function(path,_5c7,_5c8,_5c9){
var _5ca="servlet/PathResolver"+"?r=l&p="+path;
if(_5c8==undefined){
_5c8=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_5c9==undefined){
_5c9=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
_5c1.post({url:_5ca,headers:{"Content-Encoding":"UTF-8"},handleAs:"json",preventCache:true,load:_5c7,error:_5c8,handle:_5c9});
},getRaw:function(path,_5cb,_5cc,_5cd){
var _5ce="servlet/PathResolver"+"?r=j&p="+path;
if(_5cc==undefined){
_5cc=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_5cd==undefined){
_5cd=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
_5c1.post({url:_5ce,headers:{"Content-Encoding":"UTF-8"},handleAs:"json",preventCache:true,load:_5cb,error:_5cc,handle:_5cd});
},set:function(path,_5cf,_5d0,_5d1,_5d2){
var _5d3="servlet/PathResolver"+"?r=x&p="+path+"&v="+encodeURIComponent(_5cf);
if(_5d1==undefined||_5d1==null){
_5d1=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_5d2==undefined||_5d2==null){
_5d2=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
if(_5d0==undefined||_5d0==null){
_5d0=dojo.hitch(this,this.handleClientDataAccessorSuccess);
}
_5c1.post({url:_5d3,headers:{"Content-Encoding":"UTF-8"},handleAs:"text",preventCache:true,load:_5d0,error:_5d1,handle:_5d2});
},handleClientDataAccessorError:function(_5d4,_5d5){
var _5d6=_5c2.getProperty("curam.ui.ClientDataAccessor.err.1")+"PathResolverServlet : ";
var _5d7=_5c2.getProperty("curam.ui.ClientDataAccessor.err.2");
curam.debug.log(_5d6+_5d4+_5d7+_5d5);
},handleClientDataAccessorSuccess:function(_5d8,_5d9){
curam.debug.log("curam.ui.ClientDataAccessor.handleClientDataAccessorSuccess : "+_5d8);
},handleClientDataAccessorCallback:function(_5da,_5db){
curam.debug.log("curam.ui.ClientDataAccessor.handleClientDataAccessorCallback :"+" "+_5c2.getProperty("curam.ui.ClientDataAccessor.callback"));
}});
});
},"dijit/BackgroundIframe":function(){
define("dijit/BackgroundIframe",["require",".","dojo/_base/config","dojo/dom-construct","dojo/dom-style","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window"],function(_5dc,_5dd,_5de,_5df,_5e0,lang,on,has,win){
has.add("bgIframe",has("ie")||has("mozilla"));
var _5e1=new function(){
var _5e2=[];
this.pop=function(){
var _5e3;
if(_5e2.length){
_5e3=_5e2.pop();
_5e3.style.display="";
}else{
if(has("ie")<9){
var burl=_5de["dojoBlankHtmlUrl"]||_5dc.toUrl("dojo/resources/blank.html")||"javascript:\"\"";
var html="<iframe src='"+burl+"' role='presentation'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_5e3=win.doc.createElement(html);
}else{
_5e3=_5df.create("iframe");
_5e3.src="javascript:\"\"";
_5e3.className="dijitBackgroundIframe";
_5e3.setAttribute("role","presentation");
_5e0.set(_5e3,"opacity",0.1);
}
_5e3.tabIndex=-1;
}
return _5e3;
};
this.push=function(_5e4){
_5e4.style.display="none";
_5e2.push(_5e4);
};
}();
_5dd.BackgroundIframe=function(node){
if(!node.id){
throw new Error("no id");
}
if(has("bgIframe")){
var _5e5=(this.iframe=_5e1.pop());
node.appendChild(_5e5);
if(has("ie")<7||has("quirks")){
this.resize(node);
this._conn=on(node,"resize",lang.hitch(this,function(){
this.resize(node);
}));
}else{
_5e0.set(_5e5,{width:"100%",height:"100%"});
}
}
};
lang.extend(_5dd.BackgroundIframe,{resize:function(node){
if(this.iframe){
_5e0.set(this.iframe,{width:node.offsetWidth+"px",height:node.offsetHeight+"px"});
}
},destroy:function(){
if(this._conn){
this._conn.remove();
this._conn=null;
}
if(this.iframe){
_5e1.push(this.iframe);
delete this.iframe;
}
}});
return _5dd.BackgroundIframe;
});
},"curam/util/Constants":function(){
define("curam/util/Constants",["curam/define"],function(){
curam.define.singleton("curam.util.Constants",{RETURN_PAGE_PARAM:"__o3rpu"});
return curam.util.Constants;
});
},"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n","dijit/form/Button":function(){
require({cache:{"url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n"}});
define("dijit/form/Button",["require","dojo/_base/declare","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/ready","./_FormWidget","./_ButtonMixin","dojo/text!./templates/Button.html"],function(_5e6,_5e7,_5e8,_5e9,lang,_5ea,_5eb,_5ec,_5ed){
if(!_5e9.isAsync){
_5ea(0,function(){
var _5ee=["dijit/form/DropDownButton","dijit/form/ComboButton","dijit/form/ToggleButton"];
_5e6(_5ee);
});
}
return _5e7("dijit.form.Button",[_5eb,_5ec],{showLabel:true,iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},baseClass:"dijitButton",templateString:_5ed,_setValueAttr:"valueNode",_onClick:function(e){
var ok=this.inherited(arguments);
if(ok){
if(this.valueNode){
this.valueNode.click();
e.preventDefault();
}
}
return ok;
},_fillContent:function(_5ef){
if(_5ef&&(!this.params||!("label" in this.params))){
var _5f0=lang.trim(_5ef.innerHTML);
if(_5f0){
this.label=_5f0;
}
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
_5e8.toggle(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},setLabel:function(_5f1){
_5e9.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_5f1);
},_setLabelAttr:function(_5f2){
this.inherited(arguments);
if(!this.showLabel&&!("title" in this.params)){
this.titleNode.title=lang.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
}});
});
},"dijit/_WidgetBase":function(){
define("dijit/_WidgetBase",["require","dojo/_base/array","dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/ready","dojo/Stateful","dojo/topic","dojo/_base/window","./registry"],function(_5f3,_5f4,_5f5,_5f6,_5f7,_5f8,dom,_5f9,_5fa,_5fb,_5fc,_5fd,_5fe,lang,on,_5ff,_600,_601,win,_602){
var _603=typeof (dojo.global.perf)!="undefined";
if(!_5fe.isAsync){
_5ff(0,function(){
var _604=["dijit/_base/manager"];
_5f3(_604);
});
}
var _605={};
function _606(obj){
var ret={};
for(var attr in obj){
ret[attr.toLowerCase()]=true;
}
return ret;
};
function _607(attr){
return function(val){
_5f9[val?"set":"remove"](this.domNode,attr,val);
this._set(attr,val);
};
};
return _5f8("dijit._WidgetBase",_600,{id:"",_setIdAttr:"domNode",lang:"",_setLangAttr:_607("lang"),dir:"",_setDirAttr:_607("dir"),textDir:"","class":"",_setClassAttr:{node:"domNode",type:"class"},style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{},_blankGif:_5f6.blankGif||_5f3.toUrl("dojo/resources/blank.gif"),postscript:function(_608,_609){
this.create(_608,_609);
},create:function(_60a,_60b){
if(_603){
perf.widgetStartedLoadingCallback();
}
this.srcNodeRef=dom.byId(_60b);
this._connects=[];
this._supportingWidgets=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_60a){
this.params=_60a;
lang.mixin(this,_60a);
}
this.postMixInProperties();
if(!this.id){
this.id=_602.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
_602.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _60c=this.srcNodeRef;
if(_60c&&_60c.parentNode&&this.domNode!==_60c){
_60c.parentNode.replaceChild(this.domNode,_60c);
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
if(_603){
perf.widgetLoadedCallback(this);
}
},_applyAttributes:function(){
var ctor=this.constructor,list=ctor._setterAttrs;
if(!list){
list=(ctor._setterAttrs=[]);
for(var attr in this.attributeMap){
list.push(attr);
}
var _60d=ctor.prototype;
for(var _60e in _60d){
if(_60e in this.attributeMap){
continue;
}
var _60f="_set"+_60e.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
})+"Attr";
if(_60f in _60d){
list.push(_60e);
}
}
}
_5f4.forEach(list,function(attr){
if(this.params&&attr in this.params){
}else{
if(this[attr]){
this.set(attr,this[attr]);
}
}
},this);
for(var _610 in this.params){
this.set(_610,this[_610]);
}
},postMixInProperties:function(){
},buildRendering:function(){
if(!this.domNode){
this.domNode=this.srcNodeRef||_5fb.create("div");
}
if(this.baseClass){
var _611=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_611=_611.concat(_5f4.map(_611,function(name){
return name+"Rtl";
}));
}
_5fa.add(this.domNode,_611);
}
},postCreate:function(){
},startup:function(){
if(this._started){
return;
}
this._started=true;
_5f4.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
},destroyRecursive:function(_612){
this._beingDestroyed=true;
this.destroyDescendants(_612);
this.destroy(_612);
},destroy:function(_613){
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
this.destroyRendering(_613);
_602.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_614){
if(this.bgIframe){
this.bgIframe.destroy(_614);
delete this.bgIframe;
}
if(this.domNode){
if(_614){
_5f9.remove(this.domNode,"widgetId");
}else{
_5fb.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_614){
_5fb.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_615){
_5f4.forEach(this.getChildren(),function(_616){
if(_616.destroyRecursive){
_616.destroyRecursive(_615);
}
});
},uninitialize:function(){
return false;
},_setStyleAttr:function(_617){
var _618=this.domNode;
if(lang.isObject(_617)){
_5fd.set(_618,_617);
}else{
if(_618.style.cssText){
_618.style.cssText+="; "+_617;
}else{
_618.style.cssText=_617;
}
}
this._set("style",_617);
},_attrToDom:function(attr,_619,_61a){
_61a=arguments.length>=3?_61a:this.attributeMap[attr];
_5f4.forEach(lang.isArray(_61a)?_61a:[_61a],function(_61b){
var _61c=this[_61b.node||_61b||"domNode"];
var type=_61b.type||"attribute";
switch(type){
case "attribute":
if(lang.isFunction(_619)){
_619=lang.hitch(this,_619);
}
var _61d=_61b.attribute?_61b.attribute:(/^on[A-Z][a-zA-Z]*$/.test(attr)?attr.toLowerCase():attr);
_5f9.set(_61c,_61d,_619);
break;
case "innerText":
_61c.innerHTML="";
_61c.appendChild(win.doc.createTextNode(_619));
break;
case "innerHTML":
_61c.innerHTML=_619;
break;
case "class":
_5fa.replace(_61c,_619,this[attr]);
break;
}
},this);
},get:function(name){
var _61e=this._getAttrNames(name);
return this[_61e.g]?this[_61e.g]():this[name];
},set:function(name,_61f){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _620=this._getAttrNames(name),_621=this[_620.s];
if(lang.isFunction(_621)){
var _622=_621.apply(this,Array.prototype.slice.call(arguments,1));
}else{
var _623=this.focusNode&&!lang.isFunction(this.focusNode)?"focusNode":"domNode",tag=this[_623].tagName,_624=_605[tag]||(_605[tag]=_606(this[_623])),map=name in this.attributeMap?this.attributeMap[name]:_620.s in this?this[_620.s]:((_620.l in _624&&typeof _61f!="function")||/^aria-|^data-|^role$/.test(name))?_623:null;
if(map!=null){
this._attrToDom(name,_61f,map);
}
this._set(name,_61f);
}
return _622||this;
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
});
return (apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr",l:uc.toLowerCase()});
},_set:function(name,_625){
var _626=this[name];
this[name]=_625;
if(this._watchCallbacks&&this._created&&_625!==_626){
this._watchCallbacks(name,_626,_625);
}
},on:function(type,func){
return _5f5.after(this,this._onMap(type),func,true);
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
return this.containerNode?_602.findWidgets(this.containerNode):[];
},getParent:function(){
return _602.getEnclosingWidget(this.domNode.parentNode);
},connect:function(obj,_627,_628){
var _629=_5f7.connect(obj,_627,this,_628);
this._connects.push(_629);
return _629;
},disconnect:function(_62a){
var i=_5f4.indexOf(this._connects,_62a);
if(i!=-1){
_62a.remove();
this._connects.splice(i,1);
}
},subscribe:function(t,_62b){
var _62c=_601.subscribe(t,lang.hitch(this,_62b));
this._connects.push(_62c);
return _62c;
},unsubscribe:function(_62d){
this.disconnect(_62d);
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):_5fc.isBodyLtr();
},isFocusable:function(){
return this.focus&&(_5fd.get(this.domNode,"display")!="none");
},placeAt:function(_62e,_62f){
if(_62e.declaredClass&&_62e.addChild){
_62e.addChild(this,_62f);
}else{
_5fb.place(this.domNode,_62e,_62f);
}
return this;
},getTextDir:function(text,_630){
return _630;
},applyTextDir:function(){
},defer:function(fcn,_631){
var _632=setTimeout(lang.hitch(this,function(){
_632=null;
if(!this._destroyed){
lang.hitch(this,fcn)();
}
}),_631||0);
return {remove:function(){
if(_632){
clearTimeout(_632);
_632=null;
}
return null;
}};
}});
});
},"curam/util/Refresh":function(){
define("curam/util/Refresh",["curam/util/Request","curam/define","curam/util","curam/tab","curam/debug","curam/util/ContextPanel","curam/util/ui/refresh/TabRefreshController","curam/util/ResourceBundle"],function(_633){
dojo.requireLocalization("curam.application","Debug");
var _634=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.Refresh",{submitted:false,pageSubmitted:"",refreshConfig:[],menuBarCallback:null,navigationCallback:null,refreshedOnTabOpen:{},_controllers:{},_pageRefreshButton:undefined,setMenuBarCallbacks:function(_635,_636){
if(!curam.util.Refresh.menuBarCallback){
curam.util.Refresh.menuBarCallback={updateMenuItemStates:_635,getRefreshParams:_636};
}
},setNavigationCallbacks:function(_637,_638){
if(!curam.util.Refresh.navigationCallback){
curam.util.Refresh.navigationCallback={updateNavItemStates:_637,getRefreshParams:_638};
}
},refreshMenuAndNavigation:function(_639,_63a,_63b,_63c){
curam.debug.log("curam.util.Refresh.refreshMenuAndNavigation: "+"tabWidgetId=%s, refreshMenuBar || refreshNavigation: %s || %s",_639,_63a,_63b);
if(_63c&&curam.util.Refresh.refreshedOnTabOpen[_639]){
curam.debug.log(_634.getProperty("curam.util.Refresh.stop"));
return;
}else{
if(_63c&&!curam.util.Refresh.refreshedOnTabOpen[_639]){
curam.debug.log(_634.getProperty("curam.util.Refresh.tab.open"));
curam.util.Refresh.refreshedOnTabOpen[_639]=true;
}else{
curam.debug.log(_634.getProperty("curam.util.Refresh.detect.refresh"));
curam.debug.log(_634.getProperty("curam.util.Refresh.refresh"));
}
}
if(!_63a&&!_63b){
curam.debug.log(_634.getProperty("curam.util.Refresh.no.refresh"));
curam.util.Refresh.refreshedOnTabOpen[_639]=false;
return;
}
var _63d={update:function(_63e,_63f,_640){
curam.debug.log(_634.getProperty("curam.util.Refresh.dynamic.refresh"),_63f);
var ncb=curam.util.Refresh.navigationCallback;
curam.debug.log("refreshNavigation? ",_63b);
if(_63b&&_63f.navData&&ncb){
ncb.updateNavItemStates(_63e,_63f);
}
var mcb=curam.util.Refresh.menuBarCallback;
curam.debug.log("refreshMenuBar? ",_63a);
if(_63a&&_63f.menuData&&mcb){
mcb.updateMenuItemStates(_63e,_63f);
}
},error:function(_641,_642){
curam.debug.log("========= "+_634.getProperty("curam.util.Refresh.dynamic.failure")+" ===========");
curam.debug.log(_634.getProperty("curam.util.Refresh.dynamic.error"),_641);
curam.debug.log(_634.getProperty("curam.util.Refresh.dynamic.args"),_642);
curam.debug.log("==================================================");
}};
var _643="servlet/JSONServlet?o3c=TAB_DYNAMIC_STATE_QUERY";
var mcb=curam.util.Refresh.menuBarCallback;
if(_63a&&mcb){
var _644=mcb.getRefreshParams(_639);
if(_644){
_643+="&"+_644;
}
}
var ncb=curam.util.Refresh.navigationCallback;
if(_63b&&ncb){
var _645=ncb.getRefreshParams(_639);
if(_645){
_643+="&"+_645;
}
}
curam.debug.log(_634.getProperty("curam.util.Refresh.dynamic.refresh.req"));
_633.post({url:_643,handleAs:"json",preventCache:true,load:dojo.hitch(_63d,"update",_639),error:dojo.hitch(_63d,"error")});
},addConfig:function(_646){
var _647=false;
dojo.forEach(curam.util.Refresh.refreshConfig,function(_648){
if(_648.tab==_646.tab){
_648.config=_646.config;
_647=true;
}
});
if(!_647){
curam.util.Refresh.refreshConfig.push(_646);
}
},setupRefreshController:function(_649){
curam.debug.log("curam.util.Refresh.setupRefreshController "+_634.getProperty("curam.util.ExpandableLists.load.for"),_649);
var _64a=dijit.byId(_649);
var _64b=_64a.tabDescriptor.tabID;
var _64c=dojo.filter(curam.util.Refresh.refreshConfig,function(item){
return item.tab==_64b;
});
if(_64c.length==1){
var _64d=_64c[0];
var ctl=new curam.util.ui.refresh.TabRefreshController(_649,_64d);
curam.util.Refresh._controllers[_649]=ctl;
ctl.setRefreshHandler(curam.util.Refresh.handleRefreshEvent);
}else{
if(_64c.length==0){
curam.debug.log(_634.getProperty("curam.util.Refresh.no.dynamic.refresh"),_649);
var ctl=new curam.util.ui.refresh.TabRefreshController(_649,null);
curam.util.Refresh._controllers[_649]=ctl;
}else{
throw "curam.util.Refresh: multiple dynamic refresh "+"configurations found for tab "+_649;
}
}
curam.tab.executeOnTabClose(function(){
curam.util.Refresh._controllers[_649].destroy();
curam.util.Refresh._controllers[_649]=undefined;
},_649);
},getController:function(_64e){
var ctl=curam.util.Refresh._controllers[_64e];
if(!ctl){
throw "Refresh controller for tab '"+_64e+"' not found!";
}
return ctl;
},handleOnloadNestedInlinePage:function(_64f,_650){
curam.debug.log("curam.util.Refresh.handleOnloadNestedInlinePage "+_634.getProperty("curam.util.Refresh.iframe",[_64f,_650]));
var _651=curam.util.getTopmostWindow();
var _652=undefined;
var _653=curam.tab.getSelectedTab();
if(_653){
_652=curam.tab.getTabWidgetId(_653);
}
if(_652){
curam.debug.log(_634.getProperty("curam.util.Refresh.parent"),_652);
_651.curam.util.Refresh.getController(_652).pageLoaded(_650.pageID,curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_INLINE);
_651.dojo.publish("/curam/main-content/page/loaded",[_650.pageID,_652]);
return true;
}
return false;
},handleRefreshEvent:function(_654){
var _655=function(_656){
curam.util.ContextPanel.refresh(dijit.byId(_656));
};
var _657=function(_658){
curam.tab.refreshMainContentPanel(dijit.byId(_658));
};
var _659=function(_65a,_65b,_65c){
curam.util.Refresh.refreshMenuAndNavigation(_65a,_65b,_65c);
};
curam.util.Refresh._doRefresh(_654,_655,_657,_659);
},_doRefresh:function(_65d,_65e,_65f,_660){
var _661=null;
var _662=false;
var _663=false;
var _664=false;
var _665=false;
var trc=curam.util.ui.refresh.TabRefreshController.prototype;
dojo.forEach(_65d,function(_666){
var _667=_666.lastIndexOf("/");
var _668=_666.slice(0,_667);
if(!_661){
_661=_666.slice(_667+1,_666.length);
}
if(_668==trc.EVENT_REFRESH_MENU){
_662=true;
}
if(_668==trc.EVENT_REFRESH_NAVIGATION){
_663=true;
}
if(_668==trc.EVENT_REFRESH_CONTEXT){
_664=true;
}
if(_668==trc.EVENT_REFRESH_MAIN){
_665=true;
}
});
if(_664){
_65e(_661);
}
if(_665){
_65f(_661);
}
_660(_661,_662,_663);
},setupRefreshButton:function(_669){
dojo.ready(function(){
var _66a=dojo.query("."+_669)[0];
if(!_66a){
throw "Refresh button not found: "+_669;
}
curam.util.Refresh._pageRefreshButton=_66a;
var href=window.location.href;
if(curam.util.isActionPage(href)){
dojo.addClass(_66a,"disabled");
curam.util.Refresh._pageRefreshButton._curamDisable=true;
}else{
dojo.addClass(_66a,"enabled");
curam.util.Refresh._pageRefreshButton["_curamDisable"]=undefined;
}
curam.util.getTopmostWindow().curam.util.setupPreferencesLink(href);
});
},refreshPage:function(_66b){
dojo.stopEvent(_66b);
var href=window.location.href;
var _66c=curam.util.Refresh._pageRefreshButton._curamDisable;
if(_66c){
return;
}
curam.util.FORCE_REFRESH=true;
curam.util.redirectWindow(href,true);
}});
return curam.util.Refresh;
});
},"curam/util/ContextPanel":function(){
define("curam/util/ContextPanel",["curam/util","curam/tab","curam/debug","curam/define","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _66d=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.ContextPanel",{CONTENT_URL_ATTRIB:"data-content-url",setupLoadEventPublisher:function(_66e,_66f,_670){
curam.util.ContextPanel._doSetup(_66e,_66f,_670,function(_671){
return dijit.byId(_671);
});
},_doSetup:function(_672,_673,_674,_675){
var _676=curam.util.getTopmostWindow().dojo.subscribe(_672,function(){
var tab=_675(_673);
var _677=curam.util.ContextPanel._getIframe(tab);
curam.debug.log(_66d.getProperty("curam.util.ContextPanel.loaded"));
curam.util.getTopmostWindow().dojo.publish("/curam/frame/detailsPanelLoaded",[{loaded:true},_673]);
_677._finishedLoading=true;
if(_677._scheduledRefresh){
curam.util.ContextPanel.refresh(tab);
_677._scheduledRefresh=false;
}
});
curam.util.onLoad.addSubscriber(_674,curam.util.ContextPanel.addTitle);
curam.tab.unsubscribeOnTabClose(_676,_673);
curam.tab.executeOnTabClose(function(){
curam.util.onLoad.removeSubscriber(_674,curam.util.ContextPanel.addTitle);
},_673);
},refresh:function(tab){
var _678=curam.util.ContextPanel._getIframe(tab);
if(_678){
curam.debug.log(_66d.getProperty("curam.util.ContextPanel.refresh.prep"));
if(_678._finishedLoading){
curam.debug.log(_66d.getProperty("curam.util.ContextPanel.refresh"));
_678._finishedLoading=false;
var doc=_678.contentDocument||_678.contentWindow.document;
doc.location.reload(true);
}else{
curam.debug.log(_66d.getProperty("curam.util.ContextPanel.refresh.delay"));
_678._scheduledRefresh=true;
}
}
},_getIframe:function(tab){
var _679=dojo.query("iframe.detailsPanelFrame",tab.domNode);
return _679[0];
},addTitle:function(_67a){
var _67b=dojo.query("."+_67a)[0];
var _67c=_67b.contentWindow.document.title;
_67b.setAttribute("title",CONTEXT_PANEL_TITLE+" - "+_67c);
},load:function(tab){
var _67d=curam.util.ContextPanel._getIframe(tab);
if(_67d){
var _67e=dojo.attr(_67d,curam.util.ContextPanel.CONTENT_URL_ATTRIB);
if(_67e&&_67e!="undefined"){
_67d[curam.util.ContextPanel.CONTENT_URL_ATTRIB]=undefined;
dojo.attr(_67d,"src",_67e);
}
}
}});
var _67f=curam.util.getTopmostWindow();
if(typeof _67f._curamContextPanelTabReadyListenerRegistered!="boolean"){
_67f.dojo.subscribe("/curam/application/tab/ready",null,function(_680){
curam.util.ContextPanel.load(_680);
});
_67f._curamContextPanelTabReadyListenerRegistered=true;
}
return curam.util.ContextPanel;
});
},"curam/util":function(){
define("curam/util",["dojo/dom","dijit/registry","dojo/dom-construct","dojo/ready","dojo/_base/window","dojo/dom-style","dojo/_base/array","dojo/dom-class","dojo/topic","dojo/_base/event","dojo/query","dojo/has","dojo/_base/unload","dojo/dom-geometry","dojo/_base/json","dojo/dom-attr","dojo/_base/lang","dojo/on","dijit/_BidiSupport","curam/define","curam/debug","curam/util/RuntimeContext","curam/util/Constants","dojo/_base/sniff","cm/_base/_dom","curam/util/ResourceBundle"],function(dom,_681,_682,_683,_684,_685,_686,_687,_688,_689,_68a,has,_68b,geom,json,attr,lang,on,bidi){
dojo.requireLocalization("curam.application","Debug");
var _68c=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util",{PREVENT_CACHE_FLAG:"o3pc",INFORMATIONAL_MSGS_STORAGE_ID:"__informationals__",ERROR_MESSAGES_CONTAINER:"error-messages-container",ERROR_MESSAGES_LIST:"error-messages",CACHE_BUSTER:0,CACHE_BUSTER_PARAM_NAME:"o3nocache",msgLocaleSelectorActionPage:"$not-locaized$ Usage of the Language Selector is not permitted from an editable page that has previously been submitted.",insertCssText:function(_68d,_68e){
var id=_68e?_68e:"_runtime_stylesheet_";
var _68f=dom.byId(id);
var _690;
if(_68f){
if(_68f.styleSheet){
_68d=_68f.styleSheet.cssText+_68d;
_690=_68f;
_690.setAttribute("id","_nodeToRm");
}else{
_68f.appendChild(document.createTextNode(_68d));
return;
}
}
var pa=document.getElementsByTagName("head")[0];
_68f=_682.create("style",{type:"text/css",id:id});
if(_68f.styleSheet){
_68f.styleSheet.cssText=_68d;
}else{
_68f.appendChild(document.createTextNode(_68d));
}
pa.appendChild(_68f);
if(_690){
_690.parentNode.removeChild(_690);
}
},fireRefreshTreeEvent:function(){
if(dojo.global.parent&&dojo.global.parent.amIFrame){
var wpl=dojo.global.parent.loader;
}
if(wpl&&wpl.dojo){
wpl.dojo.publish("refreshTree");
}
},firePageSubmittedEvent:function(_691){
require(["curam/tab"],function(){
var _692=curam.tab.getSelectedTab();
if(_692){
var _693=curam.tab.getTabWidgetId(_692);
var _694=curam.util.getTopmostWindow();
var ctx=(_691=="dialog")?curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_DIALOG:curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN;
_694.curam.util.Refresh.getController(_693).pageSubmitted(dojo.global.jsPageID,ctx);
_694.dojo.publish("/curam/main-content/page/submitted",[dojo.global.jsPageID,_693]);
}else{
curam.debug.log("/curam/main-content/page/submitted: "+_68c.getProperty("curam.util.no.open"));
}
});
},fireTabOpenedEvent:function(_695){
curam.util.getTopmostWindow().dojo.publish("curam.tabOpened",[dojo.global.jsPageID,_695]);
},setupSubmitEventPublisher:function(){
_683(function(){
var form=dom.byId("mainForm");
if(form){
curam.util.connect(form,"onsubmit",function(){
curam.util.firePageSubmittedEvent("main-content");
});
}
});
},getScrollbar:function(){
var _696=_682.create("div",{},_684.body());
_685.set(_696,{width:"100px",height:"100px",overflow:"scroll",position:"absolute",top:"-300px",left:"0px"});
var test=_682.create("div",{},_696);
_685.set(test,{width:"400px",height:"400px"});
var _697=_696.offsetWidth-_696.clientWidth;
_682.destroy(_696);
return {width:_697};
},isModalWindow:function(){
return (dojo.global.curamModal===undefined)?false:true;
},getTopmostWindow:function(){
if(typeof (dojo.global._curamTopmostWindow)=="undefined"){
var _698=dojo.global;
if(typeof (dojo.global.jsScreenContext)!="undefined"&&dojo.global.jsScreenContext.hasContextBits("CONTEXT_PORTLET")){
dojo.global._curamTopmostWindow=_698;
}else{
if(_698.__extAppTopWin){
dojo.global._curamTopmostWindow=_698;
}else{
while(_698.parent!=_698){
_698=_698.parent;
if(_698.__extAppTopWin){
break;
}
}
dojo.global._curamTopmostWindow=_698;
}
}
}
if(dojo.global._curamTopmostWindow.location.href.indexOf("AppController.do")<0&&typeof (dojo.global._curamTopmostWindow.__extAppTopWin)=="undefined"){
curam.debug.log(_68c.getProperty("curam.util.wrong.window")+dojo.global._curamTopmostWindow.location.href);
}
return dojo.global._curamTopmostWindow;
},getUrlParamValue:function(url,_699){
var qPos=url.indexOf("?");
if(qPos<0){
return null;
}
var _69a=url.substring(qPos+1,url.length);
function _69b(_69c){
var _69d=_69a.split(_69c);
_699+="=";
for(var i=0;i<_69d.length;i++){
if(_69d[i].indexOf(_699)==0){
return _69d[i].split("=")[1];
}
}
};
return _69b("&")||_69b("");
},addUrlParam:function(href,_69e,_69f,_6a0){
var hasQ=href.indexOf("?")>-1;
var _6a1=_6a0?_6a0:"undefined";
if(!hasQ||(_6a1==false)){
return href+(hasQ?"&":"?")+_69e+"="+_69f;
}else{
var _6a2=href.split("?");
href=_6a2[0]+"?"+_69e+"="+_69f+(_6a2[1]!=""?("&"+_6a2[1]):"");
return href;
}
},replaceUrlParam:function(href,_6a3,_6a4){
href=curam.util.removeUrlParam(href,_6a3);
return curam.util.addUrlParam(href,_6a3,_6a4);
},removeUrlParam:function(url,_6a5,_6a6){
var qPos=url.indexOf("?");
if(qPos<0){
return url;
}
if(url.indexOf(_6a5+"=")<0){
return url;
}
var _6a7=url.substring(qPos+1,url.length);
var _6a8=_6a7.split("&");
var _6a9;
var _6aa,_6ab;
for(var i=0;i<_6a8.length;i++){
if(_6a8[i].indexOf(_6a5+"=")==0){
_6ab=false;
if(_6a6){
_6aa=_6a8[i].split("=");
if(_6aa.length>1){
if(_6aa[1]==_6a6){
_6ab=true;
}
}else{
if(_6a6==""){
_6ab=true;
}
}
}else{
_6ab=true;
}
if(_6ab){
_6a8.splice(i,1);
i--;
}
}
}
return url.substring(0,qPos+1)+_6a8.join("&");
},stripHash:function(url){
var idx=url.indexOf("#");
if(idx<0){
return url;
}
return url.substring(0,url);
},isSameUrl:function(_6ac,_6ad,rtc){
if(!_6ad){
_6ad=rtc.getHref();
}
if(_6ac.indexOf("#")==0){
return true;
}
var _6ae=_6ac.indexOf("#");
if(_6ae>-1){
if(_6ae==0){
return true;
}
var _6af=_6ac.split("#");
var _6b0=_6ad.indexOf("#");
if(_6b0>-1){
if(_6b0==0){
return true;
}
_6ad=_6ad.split("#")[0];
}
return _6af[0]==_6ad;
}
var _6b1=function(url){
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
var here=curam.util.stripHash(rp(_6ad,curam.util.Constants.RETURN_PAGE_PARAM));
var _6b2=curam.util.stripHash(rp(_6ac,curam.util.Constants.RETURN_PAGE_PARAM));
var _6b3=_6b2.split("?");
var _6b4=here.split("?");
_6b4[0]=_6b1(_6b4[0]);
_6b3[0]=_6b1(_6b3[0]);
var _6b5=(_6b4[0]==_6b3[0]||_6b4[0].match(_6b3[0]+"$")==_6b3[0]);
if(!_6b5){
return false;
}
if(_6b4.length==1&&_6b3.length==1&&_6b5){
return true;
}else{
var _6b6;
var _6b7;
if(typeof _6b4[1]!="undefined"&&_6b4[1]!=""){
_6b6=_6b4[1].split("&");
}else{
_6b6=new Array();
}
if(typeof _6b3[1]!="undefined"&&_6b3[1]!=""){
_6b7=_6b3[1].split("&");
}else{
_6b7=new Array();
}
curam.debug.log("curam.util.isSameUrl: paramsHere "+_68c.getProperty("curam.util.before")+_6b6.length);
_6b6=_686.filter(_6b6,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_68c.getProperty("curam.util.after")+_6b6.length);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_68c.getProperty("curam.util.before")+_6b7.length);
_6b7=_686.filter(_6b7,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_68c.getProperty("curam.util.after")+_6b7.length);
if(_6b6.length!=_6b7.length){
return false;
}
var _6b8={};
var _6b9;
for(var i=0;i<_6b6.length;i++){
_6b9=_6b6[i].split("=");
_6b8[_6b9[0]]=_6b9[1];
}
for(var i=0;i<_6b7.length;i++){
_6b9=_6b7[i].split("=");
if(_6b8[_6b9[0]]!=_6b9[1]){
curam.debug.log(_68c.getProperty("curam.util.no.match",[_6b9[0],_6b9[1],_6b8[_6b9[0]]]));
return false;
}
}
}
return true;
},isNotCDEJParam:function(_6ba){
return !((_6ba.charAt(0)=="o"&&_6ba.charAt(1)=="3")||(_6ba.charAt(0)=="_"&&_6ba.charAt(1)=="_"&&_6ba.charAt(2)=="o"&&_6ba.charAt(3)=="3"));
},setAttributes:function(node,map){
for(var x in map){
node.setAttribute(x,map[x]);
}
},invalidatePage:function(){
curam.PAGE_INVALIDATED=true;
var _6bb=dojo.global.dialogArguments?dojo.global.dialogArguments[0]:opener;
if(_6bb&&_6bb!=dojo.global){
try{
_6bb.curam.util.invalidatePage();
}
catch(e){
curam.debug.log(_68c.getProperty("curam.util.error"),e);
}
}
},redirectWindow:function(href,_6bc,_6bd){
var rtc=new curam.util.RuntimeContext(dojo.global);
var _6be=function(_6bf,_6c0,href,_6c1,_6c2){
curam.util.getFrameRoot(_6bf,_6c0).curam.util.redirectContentPanel(href,_6c1,_6c2);
};
curam.util._doRedirectWindow(href,_6bc,_6bd,dojo.global.jsScreenContext,rtc,curam.util.publishRefreshEvent,_6be);
},_doRedirectWindow:function(href,_6c3,_6c4,_6c5,rtc,_6c6,_6c7){
if(href&&curam.util.isActionPage(href)){
curam.debug.log(_68c.getProperty("curam.util.stopping"),href);
return;
}
var rpl=curam.util.replaceUrlParam;
var _6c8=_6c5.hasContextBits("TREE")||_6c5.hasContextBits("AGENDA")||_6c5.hasContextBits("ORG_TREE");
if(curam.util.FORCE_REFRESH){
href=rpl(rtc.getHref(),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
if(curam.util.isModalWindow()||_6c8){
_6c6();
dojo.global.location.href=href;
}else{
if(_6c5.hasContextBits("LIST_ROW_INLINE_PAGE")||_6c5.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(href);
}else{
_6c6();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
require(["curam/tab"],function(){
_6c7(dojo.global,curam.tab.getTabController().ROOT_OBJ,href,true,true);
});
}
}
}
return;
}
var u=curam.util;
var rtc=new curam.util.RuntimeContext(dojo.global);
if(!_6c8&&!_6c3&&!curam.PAGE_INVALIDATED&&u.isSameUrl(href,null,rtc)){
return;
}
if(curam.util.isModalWindow()||_6c8){
href=rpl(rpl(href,"o3frame","modal"),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
var form=_682.create("form",{action:href,method:"POST"});
if(!_6c8){
if(!dom.byId("o3ctx")){
form.action=curam.util.removeUrlParam(form.action,"o3ctx");
var _6c9=_682.create("input",{type:"hidden",id:"o3ctx",name:"o3ctx",value:_6c5.getValue()},form);
}
_684.body().appendChild(form);
_6c6();
form.submit();
}
if(!_6c4){
if(_6c8){
curam.util.redirectFrame(href);
}
}
}else{
if(_6c5.hasContextBits("LIST_ROW_INLINE_PAGE")||_6c5.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(href);
}else{
_6c6();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
if(_6c5.hasContextBits("EXTAPP")){
var _6ca=window.top;
_6ca.dijit.byId("curam-app").updateMainContentIframe(href);
}else{
require(["curam/tab"],function(){
curam.util.getFrameRoot(dojo.global,curam.tab.getTabController().ROOT_OBJ).curam.util.redirectContentPanel(href,_6c3);
});
}
}
}
}
},_handleInlinePageRefresh:function(href){
curam.debug.log(_68c.getProperty("curam.util.closing.modal"),href);
var _6cb=new curam.ui.PageRequest(href);
require(["curam/tab"],function(){
curam.tab.getTabController().checkPage(_6cb,function(_6cc){
curam.util.publishRefreshEvent();
dojo.global.location.reload(true);
});
});
},redirectContentPanel:function(url,_6cd,_6ce){
require(["curam/tab"],function(){
var _6cf=curam.tab.getContentPanelIframe();
var _6d0=url;
if(_6cf!=null){
var rpu=curam.util.Constants.RETURN_PAGE_PARAM;
var _6d1=null;
if(url.indexOf(rpu+"=")>=0){
curam.debug.log("curam.util.redirectContentPanel: "+_68c.getProperty("curam.util.rpu"));
_6d1=decodeURIComponent(curam.util.getUrlParamValue(url,rpu));
}
if(_6d1){
_6d1=curam.util.removeUrlParam(_6d1,rpu);
_6d0=curam.util.replaceUrlParam(url,rpu,encodeURIComponent(_6d1));
}
}
var _6d2=new curam.ui.PageRequest(_6d0);
if(_6cd){
_6d2.forceLoad=true;
}
if(_6ce){
_6d2.justRefresh=true;
}
curam.tab.getTabController().handlePageRequest(_6d2);
});
},redirectFrame:function(href){
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
var _6d3=curam.util.getFrameRoot(dojo.global,"wizard").targetframe;
_6d3.curam.util.publishRefreshEvent();
_6d3.location.href=href;
}else{
if(dojo.global.jsScreenContext.hasContextBits("ORG_TREE")){
var _6d3=curam.util.getFrameRoot(dojo.global,"orgTreeRoot");
_6d3.curam.util.publishRefreshEvent();
_6d3.dojo.publish("orgTree.refreshContent",[href]);
}else{
var _6d4=curam.util.getFrameRoot(dojo.global,"iegtree");
var _6d5=_6d4.navframe||_6d4.frames[0];
var _6d6=_6d4.contentframe||_6d4.frames["contentframe"];
_6d6.curam.util.publishRefreshEvent();
if(curam.PAGE_INVALIDATED||_6d5.curam.PAGE_INVALIDATED){
var _6d7=curam.util.modifyUrlContext(href,"ACTION");
_6d6.location.href=_6d7;
}else{
_6d6.location.href=href;
}
}
}
return true;
},publishRefreshEvent:function(){
_688.publish("/curam/page/refresh");
},openGenericErrorModalDialog:function(_6d8,_6d9,_6da,_6db,_6dc){
var url;
var _6dd;
var sc=new curam.util.ScreenContext("MODAL");
var _6de="titlePropertyName="+_6d9+"&";
var _6df="messagePropertyName="+_6da+"&";
var _6e0="errorModal="+_6dc+"&";
if(_6db){
_6dd="messagePlaceholder1="+_6db+"&";
url="generic-modal-error.jspx?"+_6de+_6df+_6dd+_6e0+sc.toRequestString();
}else{
url="generic-modal-error.jspx?"+_6de+_6df+sc.toRequestString();
}
curam.util.openModalDialog({href:url},_6d8);
},openModalDialog:function(_6e1,_6e2,left,top,_6e3){
var href;
if(!_6e1||!_6e1.href){
_6e1=_689.fix(_6e1);
var _6e4=_6e1.target;
while(_6e4.tagName!="A"&&_6e4!=_684.body()){
_6e4=_6e4.parentNode;
}
href=_6e4.href;
_6e4._isModal=true;
_689.stop(_6e1);
}else{
href=_6e1.href;
_6e1._isModal=true;
}
require(["curam/dialog"]);
var opts=curam.dialog.parseWindowOptions(_6e2);
curam.util.showModalDialog(href,_6e1,opts["width"],opts["height"],left,top,false,null,null,_6e3);
return false;
},showModalDialog:function(url,_6e5,_6e6,_6e7,left,top,_6e8,_6e9,_6ea,_6eb){
var _6ec=curam.util.getTopmostWindow();
if(dojo.global!=_6ec){
curam.debug.log("curam.util.showModalDialog: "+_68c.getProperty("curam.util.redirecting.modal"));
_6ec.curam.util.showModalDialog(url,_6e5,_6e6,_6e7,left,top,_6e8,_6e9,dojo.global,_6eb);
return;
}
var rup=curam.util.replaceUrlParam;
url=rup(url,"o3frame","modal");
url=curam.util.modifyUrlContext(url,"MODAL","TAB|LIST_ROW_INLINE_PAGE|LIST_EVEN_ROW|NESTED_UIM");
url=rup(url,curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
curam.debug.log(_68c.getProperty("curam.util.modal.url"),url);
if(_6e6){
_6e6=typeof (_6e6)=="number"?_6e6:parseInt(_6e6);
}
if(_6e7){
_6e7=typeof (_6e7)=="number"?_6e7:parseInt(_6e7);
}
if(!curam.util._isModalCurrentlyOpening()){
curam.util._setModalCurrentlyOpening(true);
require(["curam/ModalDialog"]);
new curam.ModalDialog({href:url,width:_6e6,height:_6e7,openNode:(_6e5&&_6e5.target)?_6e5.target:null,parentWindow:_6ea,uimToken:_6eb});
}
},_isModalCurrentlyOpening:function(){
return curam.util.getTopmostWindow().curam.util._modalOpenInProgress;
},_setModalCurrentlyOpening:function(_6ed){
curam.util.getTopmostWindow().curam.util._modalOpenInProgress=_6ed;
},setupPreferencesLink:function(href){
_683(function(){
var _6ee=_68a(".user-preferences")[0];
if(_6ee){
if(typeof (_6ee._disconnectToken)=="undefined"){
_6ee._disconnectToken=curam.util.connect(_6ee,"onclick",curam.util.openPreferences);
}
if(!href){
href=dojo.global.location.href;
}
if(curam.util.isActionPage(href)){
_687.replace(_6ee,"disabled","enabled");
_6ee._curamDisable=true;
}else{
_687.replace(_6ee,"enabled","disabled");
_6ee._curamDisable=false;
}
}else{
curam.debug.log(_68c.getProperty("curam.util.no.setup"));
}
});
},openPreferences:function(_6ef){
_689.stop(_6ef);
if(_6ef.target._curamDisable){
return;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("user-prefs-editor.jspx",{dialogOptions:"width=450"});
});
},openAbout:function(_6f0){
_689.stop(_6f0);
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("about.jsp",{dialogOptions:"width=645,height=480"});
});
},addMinWidthCalendarCluster:function(id){
var _6f1=dom.byId(id);
var i=0;
function _6f2(evt){
_686.forEach(_6f1.childNodes,function(node){
if(_687.contains(node,"cluster")){
_685.set(node,"width","97%");
if(node.clientWidth<700){
_685.set(node,"width","700px");
}
}
});
};
if(has("ie")>6){
_686.forEach(_6f1.childNodes,function(node){
if(_687.contains(node,"cluster")){
_685.set(node,"minWidth","700px");
}
});
}else{
on(dojo.global,"resize",_6f2);
_683(_6f2);
}
},addPopupFieldListener:function(id){
if(!has("ie")||has("ie")>6){
return;
}
if(!curam.util._popupFields){
function _6f3(evt){
var _6f4=0;
var j=0;
var x=0;
var arr=curam.util._popupFields;
_686.forEach(curam.util._popupFields,function(id){
var _6f5=dom.byId(id);
_68a("> .popup-actions",_6f5).forEach(function(node){
_6f4=node.clientWidth+30;
});
_68a("> .desc",_6f5).forEach(function(node){
_685.set(node,"width",Math.max(0,_6f5.clientWidth-_6f4)+"px");
});
});
};
curam.util._popupFields=[id];
on(dojo.global,"resize",_6f3);
_683(_6f3);
}else{
curam.util._popupFields.push(id);
}
},addContentWidthListener:function(id){
if(has("ie")>6){
return;
}
var _6f6=_685.set;
var _6f7=_687.contains;
function _6f8(evt){
var i=0;
var _6f9=dom.byId("content");
if(_6f9){
var _6fa=_6f9.clientWidth;
if(has("ie")==6&&dom.byId("footer")){
var _6fb=_684.body().clientHeight-100;
_6f6(_6f9,"height",_6fb+"px");
var _6fc=dom.byId("sidebar");
if(_6fc){
_6f6(_6fc,"height",_6fb+"px");
}
}
try{
_68a("> .page-title-bar",_6f9).forEach(function(node){
var _6fd=geom.getMarginSize(node).w-geom.getContentBox(node).w;
if(!has("ie")){
_6fd+=1;
}
_6fa=_6f9.clientWidth-_6fd;
_685.set(node,"width",_6fa+"px");
});
}
catch(e){
}
_68a("> .page-description",_6f9).style("width",_6fa+"px");
_68a("> .in-page-navigation",_6f9).style("width",_6fa+"px");
}
};
curam.util.subscribe("/clusterToggle",_6f8);
curam.util.connect(dojo.global,"onresize",_6f8);
_683(_6f8);
},alterScrollableListBottomBorder:function(id,_6fe){
var _6ff=_6fe;
var _700="#"+id+" table";
function _701(){
var _702=_68a(_700)[0];
if(_702.offsetHeight>=_6ff){
var _703=_68a(".odd-last-row",_702)[0];
if(typeof _703!="undefined"){
_687.add(_703,"no-bottom-border");
}
}else{
if(_702.offsetHeight<_6ff){
var _703=_68a(".even-last-row",_702)[0];
if(typeof _703!="undefined"){
_687.add(_703,"add-bottom-border");
}
}else{
curam.debug.log("curam.util.alterScrollableListBottomBorder: "+_68c.getProperty("curam.util.code"));
}
}
};
_683(_701);
},addFileUploadResizeListener:function(code){
function _704(evt){
if(_68a(".widget")){
_68a(".widget").forEach(function(_705){
var _706=_705.clientWidth;
if(_68a(".fileUpload",_705)){
_68a(".fileUpload",_705).forEach(function(_707){
fileUploadWidth=_706/30;
if(fileUploadWidth<4){
_707.size=1;
}else{
_707.size=fileUploadWidth;
}
});
}
});
}
};
on(dojo.global,"resize",_704);
_683(_704);
},openCenteredNonModalWindow:function(url,_708,_709,name){
_708=Number(_708);
_709=Number(_709);
var _70a=(screen.width-_708)/2;
var _70b=(screen.height-_709)/2;
_709=_70b<0?screen.height:_709;
_70b=Math.max(0,_70b);
_708=_70a<0?screen.width:_708;
_70a=Math.max(0,_70a);
var left="left",top="top";
if(has("ff")){
left="screenX",top="screenY";
}
var _70c="location=no, menubar=no, status=no, toolbar=no, "+"scrollbars=yes, resizable=no";
var _70d=dojo.global.open(url,name||"name","width="+_708+", height="+_709+", "+left+"="+_70a+","+top+"="+_70b+","+_70c);
_70d.resizeTo(_708,_709);
_70d.moveTo(_70a,_70b);
_70d.focus();
},adjustTargetContext:function(win,href){
if(win&&win.dojo.global.jsScreenContext){
var _70e=win.dojo.global.jsScreenContext;
_70e.updateStates(dojo.global.jsScreenContext);
return curam.util.replaceUrlParam(href,"o3ctx",_70e.getValue());
}
return href;
},modifyUrlContext:function(url,_70f,_710){
var _711=url;
var ctx=new curam.util.ScreenContext();
var _712=curam.util.getUrlParamValue(url,"o3ctx");
if(_712){
ctx.setContext(_712);
}else{
ctx.clear();
}
if(_70f){
ctx.addContextBits(_70f);
}
if(_710){
ctx.clear(_710);
}
_711=curam.util.replaceUrlParam(url,"o3ctx",ctx.getValue());
return _711;
},updateCtx:function(_713){
var _714=curam.util.getUrlParamValue(_713,"o3ctx");
if(!_714){
return _713;
}
return curam.util.modifyUrlContext(_713,null,"MODAL");
},getFrameRoot:function(_715,_716){
var _717=false;
var _718=_715;
if(_718){
while(_718!=top&&!_718.rootObject){
_718=_718.parent;
}
if(_718.rootObject){
_717=(_718.rootObject==_716);
}
}
return _717?_718:null;
},saveInformationalMsgs:function(_719){
curam.util.runStorageFn(function(){
try{
var _71a=curam.util.getTopmostWindow().dojox;
_71a.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,json.toJson({pageID:_684.body().id,total:dom.byId(curam.util.ERROR_MESSAGES_CONTAINER).innerHTML,listItems:dom.byId(curam.util.ERROR_MESSAGES_LIST).innerHTML}));
}
catch(e){
curam.debug.log(_68c.getProperty("curam.util.exception"),e);
}
},_719);
},runStorageFn:function(fn,_71b){
var _71c=function(){
fn();
if(_71b){
setTimeout(_71b,10);
}
};
var _71d=curam.util.getTopmostWindow().dojox;
require(["dojox/storage"],function(){
var mgr=_71d.storage.manager;
if(mgr.isInitialized()){
_71c();
}else{
if(mgr.addOnLoad){
mgr.addOnLoad(_71c);
}else{
var _71e={exp:_71c};
on(mgr,"loaded",_71e,"exp");
}
}
});
},disableInformationalLoad:function(){
curam.util._informationalsDisabled=true;
},redirectDirectUrl:function(){
_683(function(){
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
_683(function(){
if(dojo.global.jsScreenContext.hasContextBits("CONTEXT_PANEL")){
return;
}
if(curam.util._informationalsDisabled){
return;
}
curam.util.runStorageFn(function(){
var _71f=curam.util.getTopmostWindow().dojox;
var msgs=_71f.storage.get(curam.util.INFORMATIONAL_MSGS_STORAGE_ID);
if(msgs&&msgs!=""){
msgs=json.fromJson(msgs);
_71f.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,"");
var div=dom.byId(curam.util.ERROR_MESSAGES_CONTAINER);
var list=dom.byId(curam.util.ERROR_MESSAGES_LIST);
if(msgs.pageID!=_684.body().id){
return;
}
if(list){
var _720=_682.create("ul",{innerHTML:msgs.listItems});
var _721=[];
for(var i=0;i<list.childNodes.length;i++){
if(list.childNodes[i].tagName=="LI"){
_721.push(list.childNodes[i]);
}
}
var skip=false;
var _722=_720.childNodes;
for(var i=0;i<_722.length;i++){
skip=false;
for(var j=0;j<_721.length;j++){
if(_722[i].innerHTML==_721[j].innerHTML){
skip=true;
break;
}
}
if(!skip){
list.appendChild(_722[i]);
i--;
}
}
}else{
if(div){
div.innerHTML=msgs.total;
}
}
}
var _723=dojo.byId("error-messages");
if(_723&&!dojo.global.jsScreenContext.hasContextBits("MODAL")){
_723.focus();
}
});
});
},setFocus:function(){
var _724=curam.util.getUrlParamValue(dojo.global.location.href,"o3frame")=="modal";
if(!_724){
_683(curam.util.doSetFocus);
}
},doSetFocus:function(){
var _725=-1;
var _726=-1;
var form=document.forms[0];
if(!form){
return false;
}
var _727=form.elements;
var l=_727.length;
var elem;
for(var i=0;i<l;i++){
elem=_727[i];
if(_725==-1&&(elem.type=="select-one"||elem.type=="text"||elem.tagName=="TEXTAREA")&&!_687.contains(elem,"dijitArrowButtonInner")&&!_687.contains(elem,"dijitValidationInner")){
_725=i;
}
if(elem.tabIndex=="1"){
elem.tabIndex=0;
_726=i;
break;
}
}
var elem;
if(_726!=-1){
elem=_727[_726];
}else{
if(_725!=-1){
elem=_727[_725];
}
}
try{
var _728=dojo.byId("error-messages");
if(_728){
_728.focus();
}else{
elem.focus();
}
}
catch(e){
curam.debug.log(_68c.getProperty("curam.util.error.focus"),e.message);
return false;
}
return true;
},openLocaleSelector:function(_729){
_729=_689.fix(_729);
var _72a=_729.target;
while(_72a&&_72a.tagName!="A"){
_72a=_72a.parentNode;
}
var loc=_72a.href;
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
var _72b=curam.util.getLastPathSegmentWithQueryString(url);
var _72c=_72b.split("?")[0];
return _72c.indexOf("Action.do")>-1;
},closeLocaleSelector:function(_72d){
_72d=_689.fix(_72d);
_689.stop(_72d);
dojo.global.close();
return false;
},getSuffixFromClass:function(node,_72e){
var _72f=attr.get(node,"class").split(" ");
var _730=_686.filter(_72f,function(_731){
return _731.indexOf(_72e)==0;
});
if(_730.length>0){
return _730[0].split(_72e)[1];
}else{
return null;
}
},getCacheBusterParameter:function(){
return this.CACHE_BUSTER_PARAM_NAME+"="+new Date().getTime()+"_"+this.CACHE_BUSTER++;
},stripeTable:function(_732,_733,_734){
var _735=_732.tBodies[0];
var _736=(_733?2:1);
if(_735.rows.length<_736){
return;
}
var rows=_735.rows;
for(var i=0;i<rows.length;i+=_736){
curam.debug.log("curam.util.stripeTable(%s, %s): i = %s",_732,_733,i);
var _737=[rows[i]];
if(_733&&rows[i+1]){
_737.push(rows[i+1]);
}
_686.forEach(_737,function(row){
_687.remove(row,"odd-last-row");
_687.remove(row,"even-last-row");
});
if(i%(2*_736)==0){
_686.forEach(_737,function(row){
cm.replaceClass(row,"odd","even");
});
if(i==_734){
_686.forEach(_737,function(row){
_687.add(row,"odd-last-row");
});
}
}else{
_686.forEach(_737,function(row){
cm.replaceClass(row,"even","odd");
});
if(i==_734){
_686.forEach(_737,function(row){
_687.add(row,"even-last-row");
});
}
}
}
},fillString:function(_738,_739){
var _73a="";
while(_739>0){
_73a+=_738;
_739-=1;
}
return _73a;
},updateHeader:function(qId,_73b,_73c,_73d){
var _73e=dom.byId("header_"+qId);
_73e.firstChild.nextSibling.innerHTML=_73b;
answerCell=dom.byId("chosenAnswer_"+qId);
answerCell.innerHTML=_73c;
sourceCell=dom.byId("chosenSource_"+qId);
sourceCell.innerHTML=_73d;
},search:function(_73f,_740){
var _741=_681.byId(_73f).get("value");
var _742=_681.byId(_740);
var _743=_742?_742.get("value"):null;
var _744="";
var _745;
var _746;
if(_743){
_746=_743.split("|");
_744=_746[0];
_745=_746[1];
}
var _747=curam.util.defaultSearchPageID;
var _748="";
if(_744===""){
_748=_747+"Page.do?searchText="+encodeURIComponent(_741);
}else{
_748=_745+"Page.do?searchText="+encodeURIComponent(_741)+"&searchType="+encodeURIComponent(_744);
}
var _749=new curam.ui.PageRequest(_748);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_749);
});
},updateDefaultSearchText:function(_74a,_74b){
var _74c=_681.byId(_74a);
var _74d=_681.byId(_74b);
var _74e=_74c?_74c.get("value"):null;
var str=_74e.split("|")[2];
_74d.set("placeHolder",str);
},updateSearchBtnState:function(_74f,_750){
var _751=_681.byId(_74f);
var btn=dom.byId(_750);
var _752=_751.get("value");
if(!_752||lang.trim(_752).length<1){
_687.add(btn,"dijitDisabled");
}else{
_687.remove(btn,"dijitDisabled");
}
},furtherOptionsSearch:function(){
var _753=curam.util.furtherOptionsPageID+"Page.do";
var _754=new curam.ui.PageRequest(_753);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_754);
});
},searchButtonStatus:function(_755){
var btn=dojo.byId(_755);
if(!dojo.hasClass(btn,"dijitDisabled")){
return true;
}
},getPageHeight:function(){
var _756=400;
var _757=0;
if(_68a("frameset").length>0){
curam.debug.log("curam.util.getPageHeight() "+_68c.getProperty("curam.util.default.height"),_756);
_757=_756;
}else{
var _758=function(node){
if(!node){
curam.debug.log(_68c.getProperty("curam.util.node"));
return 0;
}
var mb=geom.getMarginSize(node);
var pos=geom.position(node);
return pos.y+mb.h;
};
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")){
var _759=_68a("div.bottom")[0];
var _75a=_758(_759);
curam.debug.log(_68c.getProperty("curam.util.page.height"),_75a);
curam.debug.log(_68c.getProperty("curam.util.ie7.issue"));
_757=_75a+1;
}else{
var _75b=dom.byId("content")||dom.byId("wizard-content");
var _75c=_68a("> *",_75b).filter(function(n){
return n.tagName.indexOf("SCRIPT")<0&&_685.get(n,"visibility")!="hidden"&&_685.get(n,"display")!="none";
});
var _75d=_75c[0];
for(var i=1;i<_75c.length;i++){
if(_758(_75c[i])>=_758(_75d)){
_75d=_75c[i];
}
}
_757=_758(_75d);
curam.debug.log("curam.util.getPageHeight() "+_68c.getProperty("curam.util.base.height"),_757);
var _75e=_68a(".actions-panel",_684.body());
if(_75e.length>0){
var _75f=geom.getMarginBox(_75e[0]).h;
curam.debug.log("curam.util.getPageHeight() "+_68c.getProperty("curam.util.panel.height"));
_757+=_75f;
_757+=10;
}
var _760=_68a("body.details");
if(_760.length>0){
curam.debug.log("curam.util.getPageHeight() "+_68c.getProperty("curam.util.bar.height"));
_757+=20;
}
}
}
curam.debug.log("curam.util.getPageHeight() "+_68c.getProperty("curam.util.returning"),_757);
return _757;
},toCommaSeparatedList:function(_761){
var _762="";
for(var i=0;i<_761.length;i++){
_762+=_761[i];
if(i<_761.length-1){
_762+=",";
}
}
return _762;
},skipLinkFocus:function(){
var dest=dojo.byId("skip-dest");
if(dest){
dest.focus();
}
},showHideSkipLink:function(e){
var _763=dojo.byId("skipLink");
if(_763){
var _764=_763.parentNode;
if(e.type=="focus"&&_687.contains(_764,"hidden")){
_687.remove(_764,"hidden");
}else{
if(e.type=="blur"&&!_687.contains(_764,"hidden")){
_687.add(_764,"hidden");
}
}
}
},setupGenericKeyHandler:function(){
_683(function(){
var f=function(_765){
if(dojo.global.jsScreenContext.hasContextBits("MODAL")&&_765.keyCode==27){
var ev=_689.fix(_765);
var _766=_681.byId(ev.target.id);
var _767=typeof _766!="undefined"&&_766.baseClass=="dijitTextBox dijitComboBox";
if(!_767){
curam.dialog.closeModalDialog();
}
}
if(_765.keyCode==13){
var ev=_689.fix(_765);
var _768=ev.target.type=="text";
var _769=ev.target.type=="radio";
var _76a=ev.target.type=="checkbox";
var _76b=ev.target.type=="select-multiple";
var _76c=ev.target.type=="password";
var _76d=_681.byId(ev.target.id);
if(typeof _76d!="undefined"){
var _76e=_681.byNode(dojo.byId("widget_"+ev.target.id));
if(_76e&&_76e.enterKeyOnOpenDropDown){
_76e.enterKeyOnOpenDropDown=false;
return false;
}
}
var _76f=typeof _76d!="undefined"&&_76d.baseClass=="dijitComboBox";
if((!_768&&!_769&&!_76a&&!_76b&&!_76c)||_76f){
return true;
}
var _770=null;
var _771=_68a(".curam-default-action");
if(_771.length>0){
_770=_771[0];
}else{
var _772=_68a("input[type='submit']");
if(_772.length>0){
_770=_772[0];
}
}
if(_770!=null){
_689.stop(_689.fix(_765));
curam.util.clickButton(_770);
return false;
}
dojo.require("curam.dateSelectorUtil");
var _773=dojo.byId("year");
if(_773){
dojo.stopEvent(dojo.fixEvent(_765));
curam.dateSelectorUtil.updateCalendar();
}
}
return true;
};
curam.util.connect(_684.body(),"onkeyup",f);
});
},enterKeyPress:function(_774){
if(_774.keyCode==13){
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
var _775=elem.parentElement.parentElement.id;
var _776=dojo.byId("end-"+_775);
if(_776){
_776.focus();
}
}
}
},focusHelpIconOnTab:function(e){
if(!e.shiftKey&&e.keyCode==9){
var _777=dojo.query(".dijitDialogHelpIcon")[0];
if(_777){
setTimeout(function(){
_777.focus();
},5);
}
}
},swapState:function(node,_778,_779,_77a){
if(_778){
_687.replace(node,_779,_77a);
}else{
_687.replace(node,_77a,_779);
}
},makeQueryString:function(_77b){
if(!_77b||_77b.length==0){
return "";
}
var _77c=[];
for(var _77d in _77b){
_77c.push(_77d+"="+encodeURIComponent(_77b[_77d]));
}
return "?"+_77c.join("&");
},clickHandlerForListActionMenu:function(url,_77e,_77f,_780){
if(_77e){
var href=curam.util.replaceUrlParam(url,"o3frame","modal");
var ctx=dojo.global.jsScreenContext;
ctx.addContextBits("MODAL");
href=curam.util.replaceUrlParam(href,"o3ctx",ctx.getValue());
curam.util.redirectWindow(href);
return;
}
var _781={href:url};
require(["curam/ui/UIMPageAdaptor"]);
if(curam.ui.UIMPageAdaptor.allowLinkToContinue(_781)){
dojo.global.location=url;
return;
}
if(_781!=null){
if(_780){
_689.fix(_780);
_689.stop(_780);
}
if(!_781.href||_781.href.length==0){
return;
}
if(_77f&&!curam.util.isInternal(url)){
dojo.global.open(url);
}else{
if(curam.ui.UIMPageAdaptor.isLinkValidForTabProcessing(_781)){
var _782=new curam.ui.PageRequest(_781.href);
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")||dojo.global.jsScreenContext.hasContextBits("NESTED_UIM")){
_782.pageHolder=dojo.global;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_782);
});
}
}
}
},clickHandlerForMailtoLinks:function(_783,url){
dojo.stopEvent(_783);
var _784=dojo.query("#mailto_frame")[0];
if(!_784){
_784=dojo.io.iframe.create("mailto_frame","");
}
_784.src=url;
return false;
},isInternal:function(url){
var path=url.split("?")[0];
var _785=path.match("Page.do");
if(_785!=null){
return true;
}
return false;
},getLastPathSegmentWithQueryString:function(url){
var _786=url.split("?");
var _787=_786[0].split("/");
return _787[_787.length-1]+(_786[1]?"?"+_786[1]:"");
},replaceSubmitButton:function(name,_788){
if(curam.replacedButtons[name]=="true"){
return;
}
var _789="__o3btn."+name;
var _78a;
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_78a=_68a("input[id='"+_789+"']");
}else{
_78a=_68a("input[name='"+_789+"']");
}
_78a.forEach(function(_78b,_78c,_78d){
if(_788){
var _78e=_78d[1];
_78e.setAttribute("value",_788);
}
_78b.tabIndex=-1;
var _78f=_78b.parentNode;
var _790="btn-id-"+_78c;
curam.util.setupWidgetLoadMask("a."+_790);
var _791="ac initially-hidden-widget "+_790;
if(_687.contains(_78b,"first-action-control")){
_791+=" first-action-control";
}
var _792=_682.create("a",{"class":_791,href:"#"},_78b,"before");
var _793=dojo.query(".page-level-menu")[0];
if(_793){
dojo.attr(_792,"title",_78b.value);
}
_682.create("span",{"class":"filler"},_792,"before");
var left=_682.create("span",{"class":"left-corner"},_792);
var _794=_682.create("span",{"class":"right-corner"},left);
var _795=_682.create("span",{"class":"middle"},_794);
_795.appendChild(document.createTextNode(_78b.value));
curam.util.addActionControlClass(_792);
on(_792,"click",function(_796){
curam.util.clickButton(this._submitButton);
_689.stop(_796);
});
_792._submitButton=_78d[0];
_687.add(_78b,"hidden-button");
});
curam.replacedButtons[name]="true";
},setupWidgetLoadMask:function(_797){
curam.util.subscribe("/curam/page/loaded",function(){
var _798=_68a(_797)[0];
if(_798){
_685.set(_798,"visibility","visible");
}else{
curam.debug.log("setupButtonLoadMask: "+_68c.getProperty("curam.util.not.found")+"'"+_797+"'"+_68c.getProperty("curam.util.ignore.mask"));
}
});
},optReplaceSubmitButton:function(name){
if(curam.util.getFrameRoot(dojo.global,"wizard")==null){
curam.util.replaceSubmitButton(name);
return;
}
var _799=curam.util.getFrameRoot(dojo.global,"wizard").navframe.wizardNavigator;
if(_799.delegatesSubmit[jsPageID]!="assumed"){
curam.util.replaceSubmitButton(name);
}
},clickButton:function(_79a){
var _79b=dom.byId("mainForm");
var _79c;
if(!_79a){
curam.debug.log("curam.util.clickButton: "+_68c.getProperty("curam.util..no.arg"));
return;
}
if(typeof (_79a)=="string"){
var _79d=_79a;
curam.debug.log("curam.util.clickButton: "+_68c.getProperty("curam.util.searching")+_68c.getProperty("curam.util.id.of")+"'"+_79d+"'.");
_79a=_68a("input[id='"+_79d+"']")[0];
if(!_79a.form&&!_79a.id){
curam.debug.log("curam.util.clickButton: "+_68c.getProperty("curam.util.searched")+_68c.getProperty("curam.util.id.of")+"'"+_79d+_68c.getProperty("curam.util.exiting"));
return;
}
}
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_79c=_79a;
}else{
_79c=_68a("input[name='"+_79a.id+"']",_79b)[0];
}
try{
if(attr.get(_79b,"action").indexOf(jsPageID)==0){
curam.util.publishRefreshEvent();
}
_79c.click();
}
catch(e){
curam.debug.log(_68c.getProperty("curam.util.exception.clicking"));
}
},printPage:function(_79e){
_689.stop(_79e);
var _79f=dojo.window.get(_79e.currentTarget.ownerDocument);
var _7a0=_79f.frameElement;
var _7a1=_7a0;
while(_7a1&&!dojo.hasClass(_7a1,"tab-content-holder")){
_7a1=_7a1.parentNode;
}
var _7a2=_7a1;
var _7a3=dojo.query(".detailsPanelFrame",_7a2)[0];
if(_7a3!=undefined&&_7a3!=null){
_7a3.contentWindow.focus();
_7a3.contentWindow.print();
}
_79f.focus();
_79f.print();
return false;
},addSelectedClass:function(_7a4){
_687.add(_7a4.target,"selected");
},removeSelectedClass:function(_7a5){
_687.remove(_7a5.target,"selected");
},openHelpPage:function(_7a6,_7a7){
_689.stop(_7a6);
dojo.global.open(_7a7);
},connect:function(_7a8,_7a9,_7aa){
var h=function(_7ab){
_7aa(_689.fix(_7ab));
};
if(has("ie")&&has("ie")<9){
_7a8.attachEvent(_7a9,h);
_68b.addOnWindowUnload(function(){
_7a8.detachEvent(_7a9,h);
});
return {object:_7a8,eventName:_7a9,handler:h};
}else{
var _7ac=_7a9;
if(_7a9.indexOf("on")==0){
_7ac=_7a9.slice(2);
}
var dt=on(_7a8,_7ac,h);
_68b.addOnWindowUnload(function(){
dt.remove();
});
return dt;
}
},disconnect:function(_7ad){
if(has("ie")&&has("ie")<9){
_7ad.object.detachEvent(_7ad.eventName,_7ad.handler);
}else{
_7ad.remove();
}
},subscribe:function(_7ae,_7af){
var st=_688.subscribe(_7ae,_7af);
_68b.addOnWindowUnload(function(){
st.remove();
});
return st;
},unsubscribe:function(_7b0){
_7b0.remove();
},addActionControlClickListener:function(_7b1){
var _7b2=dom.byId(_7b1);
var _7b3=_68a(".ac",_7b2);
if(_7b3.length>0){
for(var i=0;i<_7b3.length;i++){
var _7b4=_7b3[i];
curam.util.addActionControlClass(_7b4);
}
}
},addActionControlClass:function(_7b5){
curam.util.connect(_7b5,"onmousedown",function(){
_687.add(_7b5,"selected-button");
curam.util.connect(_7b5,"onmouseout",function(){
_687.remove(_7b5,"selected-button");
});
});
},getClusterActionSet:function(){
var _7b6=dom.byId("content");
var _7b7=_68a(".blue-action-set",_7b6);
if(_7b7.length>0){
for(var i=0;i<_7b7.length;i++){
curam.util.addActionControlClickListener(_7b7[i]);
}
}
},adjustActionButtonWidth:function(){
if(has("ie")==8){
_683(function(){
if(dojo.global.jsScreenContext.hasContextBits("MODAL")){
_68a(".action-set > a").forEach(function(node){
if(node.childNodes[0].offsetWidth>node.offsetWidth){
_685.set(node,"width",node.childNodes[0].offsetWidth+"px");
_685.set(node,"display","block");
_685.set(node,"display","inline-block");
}
});
}
});
}
},setRpu:function(url,rtc,_7b8){
if(!url||!rtc||!rtc.getHref()){
throw {name:"Unexpected values",message:"This value not allowed for url or rtc"};
}
var _7b9=curam.util.getLastPathSegmentWithQueryString(rtc.getHref());
_7b9=curam.util.removeUrlParam(_7b9,curam.util.Constants.RETURN_PAGE_PARAM);
if(_7b8){
var i;
for(i=0;i<_7b8.length;i++){
if(!_7b8[i].key||!_7b8[i].value){
throw {name:"undefined value error",message:"The object did not contain a valid key/value pair"};
}
_7b9=curam.util.replaceUrlParam(_7b9,_7b8[i].key,_7b8[i].value);
}
}
var _7ba=curam.util.replaceUrlParam(url,curam.util.Constants.RETURN_PAGE_PARAM,encodeURIComponent(_7b9));
curam.debug.log("curam.util.setRpu "+_68c.getProperty("curam.util.added.rpu")+_7ba);
return _7ba;
},retrieveBaseURL:function(){
return dojo.global.location.href.match(".*://[^/]*/[^/]*");
},removeRoleRegion:function(){
var body=dojo.query("body")[0];
dojo.removeAttr(body,"role");
},iframeTitleFallBack:function(){
var _7bb=curam.tab.getContainerTab(curam.tab.getContentPanelIframe());
var _7bc=dojo.byId(curam.tab.getContentPanelIframe());
var _7bd=_7bc.contentWindow.document.title;
var _7be=dojo.query("div.nowrapTabStrip.dijitTabContainerTop-tabs > div.dijitTabChecked.dijitChecked")[0];
var _7bf=dojo.query("span.tabLabel",_7be)[0];
var _7c0=dojo.query("div.nowrapTabStrip.dijitTabNoLayout > div.dijitTabChecked.dijitChecked",_7bb.domNode)[0];
var _7c1=dojo.query("span.tabLabel",_7c0)[0];
if(_7bd&&_7bd!=null){
return _7bd;
}else{
if(_7c0){
return _7c1.innerHTML;
}else{
return _7bf.innerHTML;
}
}
},addClassToLastNodeInContentArea:function(){
var _7c2=_68a("> div","content");
var _7c3=_7c2.length;
if(_7c3==0){
return "No need to add";
}
var _7c4=_7c2[--_7c3];
while(_687.contains(_7c4,"hidden-action-set")&&_7c4){
_7c4=_7c2[--_7c3];
}
_687.add(_7c4,"last-node");
},highContrastModeType:function(){
var _7c5=dojo.query("body.high-contrast")[0];
return _7c5;
},processBidiContextual:function(_7c6){
_7c6.dir=bidi.prototype._checkContextual(_7c6.value);
},getCookie:function(name){
var dc=document.cookie;
var _7c7=name+"=";
var _7c8=dc.indexOf("; "+_7c7);
if(_7c8==-1){
_7c8=dc.indexOf(_7c7);
if(_7c8!=0){
return null;
}
}else{
_7c8+=2;
}
var end=document.cookie.indexOf(";",_7c8);
if(end==-1){
end=dc.length;
}
return unescape(dc.substring(_7c8+_7c7.length,end));
}});
return curam.util;
});
},"idx/oneui/Header":function(){
define("idx/oneui/Header",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/_base/window","dojo/aspect","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/i18n","dojo/keys","dojo/string","dijit/_base/popup","dijit/place","dijit/registry","dijit/_Widget","dijit/_TemplatedMixin","dojo/i18n!./nls/Header"],function(_7c9,_7ca,_7cb,_7cc,_7cd,_7ce,_7cf,_7d0,_7d1,i18n,keys,_7d2,_7d3,_7d4,_7d5,_7d6,_7d7){
var dojo={},_7d8={};
var _7d9=function(){
log.error("dijit/form/Button has been used without being loaded");
};
var _7da=function(){
log.error("dijit/form/TextBox has been used without being loaded");
};
var _7db=function(){
log.error("idx/oneui/layout/MenuTabController has been used without being loaded");
};
var _7dc=function(menu,_7dd,_7de,_7df,_7e0){
if(_7dd){
if(_7dd[0]){
_7cd.after(menu,"onOpen",function(){
if(menu._popupWrapper){
if(!menu._oneuiWrapper){
menu._oneuiWrapper=_7d0.create("div",{"class":"idxHeaderContainer "+_7dd[0]},_7cc.body());
_7cd.after(menu,"destroy",function(){
_7d0.destroy(menu._oneuiWrapper);
delete menu._oneuiWrapper;
});
}
menu._oneuiWrapper.appendChild(menu._popupWrapper);
}
});
}
var _7e1=(_7dd.length>1)?_7dd.slice(1):_7dd;
_7c9.forEach(menu.getChildren(),function(_7e2){
if(_7e2.popup){
_7dc(_7e2.popup,_7e1);
}
if(_7e2.currentPage){
_7cf.add(_7e2.domNode,"idxHeaderNavCurrentPage");
}
});
}
if(_7df){
var _7e3=_7df;
menu._scheduleOpen=function(_7e4,_7e5,_7e6){
if(!this._openTimer){
var ltr=menu.isLeftToRight(),_7e7=_7d4.around(_7d3._createWrapper(menu),_7e3,_7e0?["below-alt","below","above-alt","above"]:["below","below-alt","above","above-alt"],ltr,menu.orient?_7cb.hitch(menu,"orient"):null);
if(!ltr){
_7e7.x=_7e7.x+_7e7.w;
}
this._openTimer=setTimeout(_7cb.hitch(this,function(){
delete this._openTimer;
this._openMyself({target:_7e4,iframe:_7e5,coords:_7e7});
}),1);
}
};
menu.leftClickToOpen=true;
if(_7de){
menu.bindDomNode(_7de);
}
}
};
_7ca("idx.oneui.Header",[_7d6,_7d7],{primaryTitle:"",primaryBannerType:"thin",navigation:undefined,showNavigationDropDownArrows:true,primarySearch:undefined,user:undefined,showUserDropDownArrow:true,settings:undefined,showSettingsDropDownArrow:true,help:undefined,showHelpDropDownArrow:true,secondaryTitle:"",secondaryBannerType:"blue",secondarySubtitle:"",additionalContext:"",actions:undefined,contentContainer:"",contentTabsInline:false,secondarySearch:undefined,layoutType:"variable",templateString:"<div>"+"<div dojoAttachPoint=\"_mainContainerNode\">"+"</div>"+"</div>",_getComputedUserName:function(){
return (this.user&&(typeof this.user.displayName=="function"))?this.user.displayName():(this.user.displayName||"");
},_getComputedUserImage:function(){
return (this.user&&(typeof this.user.displayImage=="function"))?this.user.displayImage():this.user.displayImage;
},_getComputedUserMessage:function(){
var _7e8=this._getComputedUserName(),_7e9=((typeof this.user.messageName=="function")?this.user.messageName():this.user.messageName)||_7e8,_7ea=_7e9;
if(this.user&&this.user.message){
var _7eb=(typeof this.user.message=="function")?this.user.message():this.user.message;
_7ea=_7d2.substitute(_7eb,this.user,function(_7ec,key){
switch(key){
case "messageName":
return _7e9;
case "displayName":
return _7e8;
default:
return _7ec||"";
}
});
}
return _7ea;
},_setUserDisplayNameAttr:function(_7ed){
this.user=this.user||{};
this.user.displayName=_7ed;
this._refreshUser();
},_setUserDisplayImageAttr:function(_7ee){
this.user=this.user||{};
this.user.displayImage=_7ee;
this._refreshUser();
},_setUserMessageNameAttr:function(_7ef){
this.user=this.user||{};
this.user.messageName=_7ef;
this._refreshUser();
},_setUserMessageAttr:function(_7f0){
this.user=this.user||{};
this.user.message=_7f0;
this._refreshUser();
},_refreshUser:function(){
var name=this._getComputedUserName(),_7f1=this._getComputedUserImage(),msg=this._getComputedUserMessage();
_7ce.set(this.userNode,"title",name);
_7ce.set(this.userImageNode,"alt",name);
_7ce.set(this.userImageNode,"src",_7f1||"");
_7d1.set(this.userImageNode,"display",_7f1?"block":"none");
this.userTextNode.innerHTML=msg;
_7cf.replace(this.userNode,msg?"idxHeaderUserName":"idxHeaderUserNameNoText","idxHeaderUserName idxHeaderUserNameNoText");
},_injectTemplate:function(_7f2,_7f3){
var _7f4=_7d7.getCachedTemplate(_7f3,true);
var node;
if(_7cb.isString(_7f4)){
node=_7d0.toDom(this._stringRepl(_7f4));
}else{
node=_7f4.cloneNode(true);
}
this._attachTemplateNodes(node,function(n,p){
return n.getAttribute(p);
});
_7f2.appendChild(node);
},postMixInProperties:function(){
this._nls=i18n.getLocalization("idx.oneui","Header");
if(this.primarySearch){
this.primarySearch=_7cb.mixin({entryPrompt:this._nls.searchEntry,submitPrompt:this._nls.searchSubmit},this.primarySearch);
}
if(this.secondarySearch){
this.secondarySearch=_7cb.mixin({entryPrompt:this._nls.searchEntry,submitPrompt:this._nls.searchSubmit},this.secondarySearch);
}
},buildRendering:function(){
this.inherited(arguments);
if(this.contentContainer&&this.secondaryBannerType&&this.secondaryBannerType.toLowerCase()=="white"){
require.log("*** Warning: Header will not display content tabs when secondaryBannerType is \"white\". Specify a different type to see content tabs.");
}
var _7f5=this.primaryTitle,_7f6=true,_7f7=this.help,_7f8=this.settings,_7f9=this.user,_7fa=this.navigation,_7fb=this.primarySearch,_7fc=this.secondaryTitle||this.secondarySubtitle,_7fd=this.contextActions,_7fe=this.secondarySearch,_7ff=this.contentContainer&&(!this.secondaryBannerType||(this.secondaryBannerType.toLowerCase()!="white")),_800=_7ff&&(this.contentTabsInline||!_7fc),_801=this.secondaryBannerType&&(this.secondaryBannerType.toLowerCase()=="white"),_802=_7ff&&!_800,_803=_7f5||_7f6||_7f7||_7f8||_7f9||_7fa||_7fb,_804=_7fc||_7fd||_7fe||_800,_805=_802,_806;
if(_803||_804||_805){
_7cf.add(this.domNode,"idxHeaderContainer");
if(this.primaryBannerType&&(this.primaryBannerType.toLowerCase()=="thick")){
_7cf.add(this._mainContainerNode,"idxHeaderPrimaryThick");
}else{
_7cf.add(this._mainContainerNode,"idxHeaderPrimaryThin");
}
if(this.secondaryBannerType&&((this.secondaryBannerType.toLowerCase()=="lightgrey")||(this.secondaryBannerType.toLowerCase()=="lightgray"))){
_7cf.add(this._mainContainerNode,"idxHeaderSecondaryGray");
_7cf.add(this._mainContainerNode,_805?"idxHeaderSecondaryGrayDoubleRow":"idxHeaderSecondaryGraySingleRow");
_806=_803;
}else{
if(this.secondaryBannerType&&(this.secondaryBannerType.toLowerCase()=="white")){
_7cf.add(this._mainContainerNode,"idxHeaderSecondaryWhite");
_7cf.add(this._mainContainerNode,_805?"idxHeaderSecondaryWhiteDoubleRow":"idxHeaderSecondaryWhiteSingleRow");
_806=_803;
}else{
_7cf.add(this._mainContainerNode,"idxHeaderSecondaryBlue");
_7cf.add(this._mainContainerNode,(_805)?"idxHeaderSecondaryBlueDoubleRow":"idxHeaderSecondaryBlueSingleRow");
_806=_803&&!_804&&!_805;
}
}
_7cf.add(this._mainContainerNode,_805?"idxHeaderSecondaryDoubleRow":"idxHeaderSecondarySingleRow");
if(this.layoutType&&(this.layoutType.toLowerCase()=="fixed")){
_7cf.add(this._mainContainerNode,"idxHeaderWidthFixed");
}else{
_7cf.add(this._mainContainerNode,"idxHeaderWidthLiquid");
}
}
var _807=[],_808=[],me=this;
if(_7fb||_7fe||_7fd){
_807.push("dijit/form/Button");
_808.push(function(obj){
_7d9=obj;
});
}
if(_7fb||_7fe){
_807.push("dijit/form/TextBox");
_808.push(function(obj){
_7da=obj;
});
}
if(_7ff){
_807.push("idx/oneui/layout/MenuTabController");
_808.push(function(obj){
_7db=obj;
});
}
require(_807,function(){
for(var i=0;i<_808.length;i++){
_808[i](arguments[i]);
}
if(_803){
me._injectTemplate(me._mainContainerNode,"<div class=\"idxHeaderPrimary\">"+"<div class=\"idxHeaderPrimaryInner\" dojoAttachPoint=\"primaryBannerNode\">"+"<ul dojoAttachPoint=\"_globalActionsNode\">"+"</ul>"+"</div>"+"</div>");
}
if(_7f5){
me._renderPrimaryTitle(me._globalActionsNode);
}
if(_7f6){
me._renderLogo(me._globalActionsNode);
}
if(_7f7){
me._renderHelp(me._globalActionsNode,_7f8||_7f9);
}
if(_7f8){
me._renderSettings(me._globalActionsNode,_7f9);
}
if(_7f9){
me._renderUser(me._globalActionsNode);
}
if(_7fb){
me._renderPrimarySearch(me._globalActionsNode);
}
if(_7fa){
me._renderNavigation(me.primaryBannerNode);
}
if(_806){
me._injectTemplate(me._mainContainerNode,"<div class=\"idxHeaderBlueLip\">"+"</div>");
}
if(_804){
me._injectTemplate(me._mainContainerNode,"<div class=\"idxHeaderSecondary\"> "+"<div class=\"idxHeaderSecondaryInner\" dojoAttachPoint=\"secondaryBannerNode\">"+"</div>"+"</div>");
}
if(_7fe){
me._renderSecondarySearch(me.secondaryBannerNode);
}
if(_7fc){
me._renderSecondaryTitle(me.secondaryBannerNode);
}
if(_800){
me._renderContent(me.secondaryBannerNode,false);
}
if(_7fd){
me._renderContextActions(me.secondaryBannerNode);
}
if(_801){
me._renderSecondaryInnerBorder(me.secondaryBannerNode);
}
if(_802){
me._renderContent(me._mainContainerNode,true);
}
});
},_renderPrimaryTitle:function(_809){
this._injectTemplate(_809,"<li>"+"<span>"+"<div class=\"idxHeaderPrimaryTitle\">"+"${primaryTitle}"+"</div>"+"</span>"+"</li>");
},_renderLogo:function(_80a){
this._injectTemplate(_80a,"<li class=\"idxHeaderPrimaryAction end\">"+"<span>"+"<div class=\"idxHeaderLogoBox\">"+"<div class=\"idxHeaderLogo\" alt=\"${_nls.ibmlogo}\">"+"</div>"+"</div>"+"</span>"+"</li>");
},_renderHelp:function(_80b,_80c){
this._injectTemplate(_80b,"<li class=\"idxHeaderPrimaryAction idxHeaderHelp\">"+"<span dojoAttachPoint=\"_helpNode\" alt=\"${_nls.actionHelp}\" title=\"${_nls.actionHelp}\">"+"<span class=\"idxHeaderHelpIcon\">"+"</span>"+"<span class=\"idxHeaderDropDownArrow\">"+"</span>"+"</span>"+"</li>");
if(_80c){
this._injectTemplate(_80b,"<li class=\"idxHeaderPrimaryAction idxHeaderSeparator\"><span></span></li>");
}
if(this.help){
this.help=_7d5.byId(this.help);
_7dc(this.help,["oneuiHeaderGlobalActionsMenu","oneuiHeaderGlobalActionsSubmenu"],this._helpNode,this._helpNode,true);
_7cf.toggle(this._helpNode,"idxHeaderDropDown",this.showHelpDropDownArrow);
}
},_renderSettings:function(_80d,_80e){
this._injectTemplate(_80d,"<li class=\"idxHeaderPrimaryAction idxHeaderTools\">"+"<span dojoAttachPoint=\"_settingsNode\" alt=\"${_nls.actionShare}\" title=\"${_nls.actionShare}\">"+"<span class=\"idxHeaderShareIcon\">"+"</span>"+"<span class=\"idxHeaderDropDownArrow\">"+"</span>"+"</span>"+"</li>");
if(_80e){
this._injectTemplate(_80d,"<li class=\"idxHeaderPrimaryAction idxHeaderSeparator\"><span></span></li>");
}
if(this.settings){
this.settings=_7d5.byId(this.settings);
_7dc(this.settings,["oneuiHeaderGlobalActionsMenu","oneuiHeaderGlobalActionsSubmenu"],this._settingsNode,this._settingsNode,true);
_7cf.toggle(this._settingsNode,"idxHeaderDropDown",this.showSettingsDropDownArrow);
}
},_renderUser:function(_80f){
this._injectTemplate(_80f,"<li class=\"idxHeaderPrimaryAction\">"+"<span dojoAttachPoint=\"userNode\" class=\"idxHeaderUserNameNoText\">"+"<span class=\"idxHeaderUserIcon\">"+"<img dojoAttachPoint=\"userImageNode\" class=\"idxHeaderUserIcon\" />"+"</span>"+"<span class=\"idxHeaderUserText\" dojoAttachPoint=\"userTextNode\">"+"</span>"+"<span class=\"idxHeaderDropDownArrow\">"+"</span>"+"</span>"+"</li>");
this._refreshUser();
if(this.user.actions){
this.user.actions=_7d5.byId(this.user.actions);
_7dc(this.user.actions,["oneuiHeaderGlobalActionsMenu","oneuiHeaderGlobalActionsSubmenu"],this.userNode,this.userNode,true);
_7cf.toggle(this.userNode,"idxHeaderDropDown",this.showUserDropDownArrow);
}
},_renderNavigation:function(_810){
this.navigation=((typeof this.navigation=="object")&&("nodeType" in this.navigation))?_7d5.byNode(this.navigation):_7d5.byId(this.navigation);
if(!this.navigation){
require.log("WARNING: navigation widget not found");
}else{
this.navigation.placeAt(_810);
this.navigation.startup();
var _811=this.navigation.getChildren();
if((_811.length==1)&&(_811[0].label=="")){
_7cf.toggle(_811[0].containerNode,"idxHeaderNavigationHome",true);
}else{
if(this.showNavigationDropDownArrows){
for(var i=0;i<_811.length;i++){
if(_811[i].popup){
this._injectTemplate(_811[i].focusNode,"<span class=\"idxHeaderDropDownArrow\"></span>");
_7cf.toggle(_811[i].domNode,"idxHeaderDropDown",true);
}
}
}
}
var node=this.navigation.domNode.firstChild,del;
while(node){
del=node;
node=node.nextSibling;
if((del.nodeType==3)&&(!del.nodeValue.match(/\S/))){
this.navigation.domNode.removeChild(del);
}
}
_7dc(this.navigation,[null,"oneuiHeaderNavigationMenu","oneuiHeaderNavigationSubmenu"]);
}
},_renderPrimarySearch:function(_812){
this._injectTemplate(_812,"<li role=\"search\" class=\"idxHeaderSearchContainer\">"+"<input type=\"text\" dojoAttachPoint=\"primarySearchTextNode\" />"+"<input type=\"image\" dojoAttachPoint=\"primarySearchButtonNode\" />"+"</li>");
this.primarySearch.onChange=_7cb.isFunction(this.primarySearch.onChange)?this.primarySearch.onChange:new Function("value",this.primarySearch.onChange);
this.primarySearch.onSubmit=_7cb.isFunction(this.primarySearch.onSubmit)?this.primarySearch.onSubmit:new Function("value",this.primarySearch.onSubmit);
var me=this;
var text=new _7da({trim:true,placeHolder:this.primarySearch.entryPrompt,intermediateChanges:true,title:this.primarySearch.entryPrompt,onChange:function(){
me._onPrimarySearchChange(text.attr("value"));
},onKeyUp:function(_813){
if(_813.keyCode==keys.ENTER){
me._onPrimarySearchSubmit(text.attr("value"));
}
}},this.primarySearchTextNode);
new _7d9({label:this.primarySearch.submitPrompt,showLabel:false,iconClass:"idxHeaderSearchButton",onClick:function(){
me._onPrimarySearchSubmit(text.attr("value"));
}},this.primarySearchButtonNode);
},_renderSecondaryTitle:function(_814){
this._injectTemplate(_814,"<span class=\"idxHeaderSecondaryTitleContainer\">"+"<span class=\"idxHeaderSecondaryTitle\" dojoAttachPoint=\"secondaryTitleTextNode\">"+"${secondaryTitle}"+"</span>"+"<span class=\"idxHeaderSecondarySubtitle\" dojoAttachPoint=\"_secondaryTitleSeparatorNode\">"+"&nbsp;&ndash;&nbsp;"+"</span>"+"<span class=\"idxHeaderSecondarySubtitle\" dojoAttachPoint=\"secondarySubtitleTextNode\">"+"${secondarySubtitle}"+"</span>"+"&nbsp;&nbsp;"+"<span class=\"idxHeaderSecondaryAdditionalContext\" dojoAttachPoint=\"additionalContextTextNode\">"+"${additionalContext}"+"</span>"+"</span>");
_7d1.set(this._secondaryTitleSeparatorNode,"display",(this.secondaryTitle&&this.secondarySubtitle)?"":"none");
},_renderContextActions:function(_815){
this._injectTemplate(_815,"<div class=\"idxHeaderSecondaryActions\" dojoAttachPoint=\"_contextActionsNode\"></div>");
this.contextActionNodes=[];
for(var i=0;i<this.contextActions.length;i++){
this._injectTemplate(this._contextActionsNode,"<button type=\"button\" dojoAttachPoint=\"_nextActionNode\"></button>");
new _7d9(this.contextActions[i],this._nextActionNode);
this.contextActionNodes.push(this._nextActionNode);
delete this._nextActionNode;
}
},_renderSecondarySearch:function(_816){
this._injectTemplate(_816,"<div role=\"search\" class=\"idxHeaderSearchContainer\">"+"<input type=\"text\" dojoAttachPoint=\"secondarySearchTextNode\" />"+"<input type=\"image\" dojoAttachPoint=\"secondarySearchButtonNode\" />"+"</div>");
this.secondarySearch.onChange=_7cb.isFunction(this.secondarySearch.onChange)?this.secondarySearch.onChange:new Function("value",this.secondarySearch.onChange);
this.secondarySearch.onSubmit=_7cb.isFunction(this.secondarySearch.onSubmit)?this.secondarySearch.onSubmit:new Function("value",this.secondarySearch.onSubmit);
var me=this;
var text=new _7da({trim:true,placeHolder:this.secondarySearch.entryPrompt,intermediateChanges:true,title:this.secondarySearch.entryPrompt,onChange:function(){
me._onSecondarySearchChange(text.attr("value"));
},onKeyUp:function(_817){
if(_817.keyCode==keys.ENTER){
me._onSecondarySearchSubmit(text.attr("value"));
}
}},this.secondarySearchTextNode);
new _7d9({label:this.secondarySearch.submitPrompt,showLabel:false,iconClass:"idxHeaderSearchButton",onClick:function(){
me._onSecondarySearchSubmit(text.attr("value"));
}},this.secondarySearchButtonNode);
},_renderSecondaryInnerBorder:function(_818){
this._injectTemplate(_818,"<div role=\"presentation\" class=\"idxHeaderSecondaryInnerBorder\">"+"</div>");
},_renderContent:function(_819,_81a){
this._injectTemplate(_819,"<div class=\"oneuiContentContainer\">"+(_81a?"<div class=\"oneuiContentContainerInner\">":"")+"<div dojoAttachPoint=\"contentControllerNode\"></div>"+(_81a?"</div>":"")+"</div>");
var _81b=new _7db({containerId:(typeof this.contentContainer==="string")?this.contentContainer:this.contentContainer.id,"class":"dijitTabContainerTop-tabs",useMenu:this._tabMenu,useSlider:this._tabSlider,buttonWidget:_7cb.extend(idx.oneui.layout._PopupTabButton,{tabDropDownText:"",tabSeparatorText:"|"})},this.contentControllerNode);
_7dc(_81b._menuBtn,["oneuiHeader2ndLevMenu","oneuiHeader2ndLevSubmenu"]);
_7cd.after(_81b,"_bindPopup",function(page,_81c,_81d,_81e){
_7dc(_81e,["oneuiHeader2ndLevMenu","oneuiHeader2ndLevSubmenu"],_81d,_81c);
},true);
_81b.startup();
var _81f=_7d5.byId(this.contentContainer);
if(_81f&&_81f._started){
_81b.onStartup({children:_81f.getChildren(),selected:_81f.selectedChildWidget});
}
},_onPrimarySearchChange:function(_820){
this.primarySearch.onChange(_820);
},_onPrimarySearchSubmit:function(_821){
this.primarySearch.onSubmit(_821);
},_onSecondarySearchChange:function(_822){
this.secondarySearch.onChange(_822);
},_onSecondarySearchSubmit:function(_823){
this.secondarySearch.onSubmit(_823);
}});
return idx.oneui.Header;
});
},"url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n","dijit/_base/sniff":function(){
define("dijit/_base/sniff",["dojo/uacss"],function(){
});
},"dojox/collections/_base":function(){
define("dojox/collections/_base",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/array"],function(dojo,lang,arr){
var _824=lang.getObject("dojox.collections",true);
_824.DictionaryEntry=function(k,v){
this.key=k;
this.value=v;
this.valueOf=function(){
return this.value;
};
this.toString=function(){
return String(this.value);
};
};
_824.Iterator=function(a){
var _825=0;
this.element=a[_825]||null;
this.atEnd=function(){
return (_825>=a.length);
};
this.get=function(){
if(this.atEnd()){
return null;
}
this.element=a[_825++];
return this.element;
};
this.map=function(fn,_826){
return arr.map(a,fn,_826);
};
this.reset=function(){
_825=0;
this.element=a[_825];
};
};
_824.DictionaryIterator=function(obj){
var a=[];
var _827={};
for(var p in obj){
if(!_827[p]){
a.push(obj[p]);
}
}
var _828=0;
this.element=a[_828]||null;
this.atEnd=function(){
return (_828>=a.length);
};
this.get=function(){
if(this.atEnd()){
return null;
}
this.element=a[_828++];
return this.element;
};
this.map=function(fn,_829){
return arr.map(a,fn,_829);
};
this.reset=function(){
_828=0;
this.element=a[_828];
};
};
return _824;
});
},"url:idx/oneui/templates/_MenuColumn.html":"<td class=\"dijitReset oneuiMenuColumn\" data-dojo-attach-point=\"columnNodes\">\r\n\t<table class=\"dijitReset\" cellspacing=\"0\" width=\"100%\" role=\"presentation\">\r\n\t\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"_containerNodes\">\r\n<!-- this must be kept in synch with column 0 included in Menu.html -->\r\n\t\t</tbody>\r\n\t</table>\r\n</td>","dojo/regexp":function(){
define("dojo/regexp",["./_base/kernel","./_base/lang"],function(dojo,lang){
lang.getObject("regexp",true,dojo);
dojo.regexp.escapeString=function(str,_82a){
return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_82a&&_82a.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
dojo.regexp.buildGroupRE=function(arr,re,_82b){
if(!(arr instanceof Array)){
return re(arr);
}
var b=[];
for(var i=0;i<arr.length;i++){
b.push(re(arr[i]));
}
return dojo.regexp.group(b.join("|"),_82b);
};
dojo.regexp.group=function(_82c,_82d){
return "("+(_82d?"?:":"")+_82c+")";
};
return dojo.regexp;
});
},"curam/debug":function(){
define("curam/debug",["curam/define","curam/util/LocalConfig"],function(_82e,_82f){
_82e.singleton("curam.debug",{log:function(){
if(curam.debug.enabled()){
try{
var a=arguments;
if(!dojo.isIE){
console.log.apply(console,a);
}else{
var _830=a.length;
var sa=curam.debug._serializeArgument;
switch(_830){
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
console.log("[Incomplete message - "+(_830-5)+" message a truncated] "+a[0],sa(a[1]),sa(a[2]),sa(a[3]),sa(a[4]),sa(a[5]));
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
var _831=typeof arg!="undefined"&&typeof arg.closed!="undefined"&&arg.closed;
if(_831){
return true;
}else{
return typeof arg!="undefined"&&typeof arg.location!="undefined"&&typeof arg.navigator!="undefined"&&typeof arg.document!="undefined"&&typeof arg.closed!="undefined";
}
},enabled:function(){
return _82f.readOption("jsTraceLog","false")=="true";
},_setup:function(_832){
_82f.seedOption("jsTraceLog",_832.trace,"false");
_82f.seedOption("ajaxDebugMode",_832.ajaxDebug,"false");
_82f.seedOption("asyncProgressMonitor",_832.asyncProgressMonitor,"false");
}});
return curam.debug;
});
},"dijit/DropDownMenu":function(){
require({cache:{"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n"}});
define("dijit/DropDownMenu",["dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/text!./templates/Menu.html","./_OnDijitClickMixin","./_MenuBase"],function(_833,_834,keys,_835,_836,_837){
return _833("dijit.DropDownMenu",[_837,_836],{templateString:_835,baseClass:"dijitMenu",postCreate:function(){
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
_834.stop(evt);
break;
case this._closeSubMenuKey:
if(this.parentMenu){
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
}else{
_834.stop(evt);
}
break;
}
}});
});
},"dijit/form/_FormMixin":function(){
define("dijit/form/_FormMixin",["dojo/_base/array","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/window"],function(_838,_839,_83a,lang,_83b){
return _839("dijit.form._FormMixin",null,{state:"",_getDescendantFormWidgets:function(_83c){
var res=[];
_838.forEach(_83c||this.getChildren(),function(_83d){
if("value" in _83d){
res.push(_83d);
}else{
res=res.concat(this._getDescendantFormWidgets(_83d.getChildren()));
}
},this);
return res;
},reset:function(){
_838.forEach(this._getDescendantFormWidgets(),function(_83e){
if(_83e.reset){
_83e.reset();
}
});
},validate:function(){
var _83f=false;
return _838.every(_838.map(this._getDescendantFormWidgets(),function(_840){
_840._hasBeenBlurred=true;
var _841=_840.disabled||!_840.validate||_840.validate();
if(!_841&&!_83f){
_83b.scrollIntoView(_840.containerNode||_840.domNode);
_840.focus();
_83f=true;
}
return _841;
}),function(item){
return item;
});
},setValues:function(val){
_83a.deprecated(this.declaredClass+"::setValues() is deprecated. Use set('value', val) instead.","","2.0");
return this.set("value",val);
},_setValueAttr:function(obj){
var map={};
_838.forEach(this._getDescendantFormWidgets(),function(_842){
if(!_842.name){
return;
}
var _843=map[_842.name]||(map[_842.name]=[]);
_843.push(_842);
});
for(var name in map){
if(!map.hasOwnProperty(name)){
continue;
}
var _844=map[name],_845=lang.getObject(name,false,obj);
if(_845===undefined){
continue;
}
if(!lang.isArray(_845)){
_845=[_845];
}
if(typeof _844[0].checked=="boolean"){
_838.forEach(_844,function(w){
w.set("value",_838.indexOf(_845,w.value)!=-1);
});
}else{
if(_844[0].multiple){
_844[0].set("value",_845);
}else{
_838.forEach(_844,function(w,i){
w.set("value",_845[i]);
});
}
}
}
},getValues:function(){
_83a.deprecated(this.declaredClass+"::getValues() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},_getValueAttr:function(){
var obj={};
_838.forEach(this._getDescendantFormWidgets(),function(_846){
var name=_846.name;
if(!name||_846.disabled){
return;
}
var _847=_846.get("value");
if(typeof _846.checked=="boolean"){
if(/Radio/.test(_846.declaredClass)){
if(_847!==false){
lang.setObject(name,_847,obj);
}else{
_847=lang.getObject(name,false,obj);
if(_847===undefined){
lang.setObject(name,null,obj);
}
}
}else{
var ary=lang.getObject(name,false,obj);
if(!ary){
ary=[];
lang.setObject(name,ary,obj);
}
if(_847!==false){
ary.push(_847);
}
}
}else{
var prev=lang.getObject(name,false,obj);
if(typeof prev!="undefined"){
if(lang.isArray(prev)){
prev.push(_847);
}else{
lang.setObject(name,[prev,_847],obj);
}
}else{
lang.setObject(name,_847,obj);
}
}
});
return obj;
},isValid:function(){
return this.state=="";
},onValidStateChange:function(){
},_getState:function(){
var _848=_838.map(this._descendants,function(w){
return w.get("state")||"";
});
return _838.indexOf(_848,"Error")>=0?"Error":_838.indexOf(_848,"Incomplete")>=0?"Incomplete":"";
},disconnectChildren:function(){
_838.forEach(this._childConnections||[],lang.hitch(this,"disconnect"));
_838.forEach(this._childWatches||[],function(w){
w.unwatch();
});
},connectChildren:function(_849){
var _84a=this;
this.disconnectChildren();
this._descendants=this._getDescendantFormWidgets();
var set=_849?function(name,val){
_84a[name]=val;
}:lang.hitch(this,"_set");
set("value",this.get("value"));
set("state",this._getState());
var _84b=(this._childConnections=[]),_84c=(this._childWatches=[]);
_838.forEach(_838.filter(this._descendants,function(item){
return item.validate;
}),function(_84d){
_838.forEach(["state","disabled"],function(attr){
_84c.push(_84d.watch(attr,function(){
_84a.set("state",_84a._getState());
}));
});
});
var _84e=function(){
if(_84a._onChangeDelayTimer){
clearTimeout(_84a._onChangeDelayTimer);
}
_84a._onChangeDelayTimer=setTimeout(function(){
delete _84a._onChangeDelayTimer;
_84a._set("value",_84a.get("value"));
},10);
};
_838.forEach(_838.filter(this._descendants,function(item){
return item.onChange;
}),function(_84f){
_84b.push(_84a.connect(_84f,"onChange",_84e));
_84c.push(_84f.watch("disabled",_84e));
});
},startup:function(){
this.inherited(arguments);
this.connectChildren(true);
this.watch("state",function(attr,_850,_851){
this.onValidStateChange(_851=="");
});
},destroy:function(){
this.disconnectChildren();
this.inherited(arguments);
}});
});
},"dijit/Menu":function(){
define("dijit/Menu",["require","dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window","dojo/window","./popup","./DropDownMenu","dojo/ready"],function(_852,_853,_854,_855,dom,_856,_857,_858,_859,keys,lang,on,has,win,_85a,pm,_85b,_85c){
if(!_859.isAsync){
_85c(0,function(){
var _85d=["dijit/MenuItem","dijit/PopupMenuItem","dijit/CheckedMenuItem","dijit/MenuSeparator"];
_852(_85d);
});
}
return _854("dijit.Menu",_85b,{constructor:function(){
this._bindings=[];
},targetNodeIds:[],contextMenuForWindow:false,leftClickToOpen:false,refocus:true,postCreate:function(){
if(this.contextMenuForWindow){
this.bindDomNode(win.body());
}else{
_853.forEach(this.targetNodeIds,this.bindDomNode,this);
}
this.inherited(arguments);
},_iframeContentWindow:function(_85e){
return _85a.get(this._iframeContentDocument(_85e))||this._iframeContentDocument(_85e)["__parent__"]||(_85e.name&&win.doc.frames[_85e.name])||null;
},_iframeContentDocument:function(_85f){
return _85f.contentDocument||(_85f.contentWindow&&_85f.contentWindow.document)||(_85f.name&&win.doc.frames[_85f.name]&&win.doc.frames[_85f.name].document)||null;
},bindDomNode:function(node){
node=dom.byId(node);
var cn;
if(node.tagName.toLowerCase()=="iframe"){
var _860=node,_861=this._iframeContentWindow(_860);
cn=win.withGlobal(_861,win.body);
}else{
cn=(node==win.body()?win.doc.documentElement:node);
}
var _862={node:node,iframe:_860};
_856.set(node,"_dijitMenu"+this.id,this._bindings.push(_862));
var _863=lang.hitch(this,function(cn){
return [on(cn,this.leftClickToOpen?"click":"contextmenu",lang.hitch(this,function(evt){
_855.stop(evt);
this._scheduleOpen(evt.target,_860,{x:evt.pageX,y:evt.pageY});
})),on(cn,"keydown",lang.hitch(this,function(evt){
if(evt.shiftKey&&evt.keyCode==keys.F10){
_855.stop(evt);
this._scheduleOpen(evt.target,_860);
}
}))];
});
_862.connects=cn?_863(cn):[];
if(_860){
_862.onloadHandler=lang.hitch(this,function(){
var _864=this._iframeContentWindow(_860);
cn=win.withGlobal(_864,win.body);
_862.connects=_863(cn);
});
if(_860.addEventListener){
_860.addEventListener("load",_862.onloadHandler,false);
}else{
_860.attachEvent("onload",_862.onloadHandler);
}
}
},unBindDomNode:function(_865){
var node;
try{
node=dom.byId(_865);
}
catch(e){
return;
}
var _866="_dijitMenu"+this.id;
if(node&&_856.has(node,_866)){
var bid=_856.get(node,_866)-1,b=this._bindings[bid],h;
while(h=b.connects.pop()){
h.remove();
}
var _867=b.iframe;
if(_867){
if(_867.removeEventListener){
_867.removeEventListener("load",b.onloadHandler,false);
}else{
_867.detachEvent("onload",b.onloadHandler);
}
}
_856.remove(node,_866);
delete this._bindings[bid];
}
},_scheduleOpen:function(_868,_869,_86a){
if(!this._openTimer){
this._openTimer=setTimeout(lang.hitch(this,function(){
delete this._openTimer;
this._openMyself({target:_868,iframe:_869,coords:_86a});
}),1);
}
},_openMyself:function(args){
var _86b=args.target,_86c=args.iframe,_86d=args.coords;
if(_86d){
if(_86c){
var ifc=_857.position(_86c,true),_86e=this._iframeContentWindow(_86c),_86f=win.withGlobal(_86e,"_docScroll",dojo);
var cs=_858.getComputedStyle(_86c),tp=_858.toPixelValue,left=(has("ie")&&has("quirks")?0:tp(_86c,cs.paddingLeft))+(has("ie")&&has("quirks")?tp(_86c,cs.borderLeftWidth):0),top=(has("ie")&&has("quirks")?0:tp(_86c,cs.paddingTop))+(has("ie")&&has("quirks")?tp(_86c,cs.borderTopWidth):0);
_86d.x+=ifc.x+left-_86f.x;
_86d.y+=ifc.y+top-_86f.y;
}
}else{
_86d=_857.position(_86b,true);
_86d.x+=10;
_86d.y+=10;
}
var self=this;
var _870=this._focusManager.get("prevNode");
var _871=this._focusManager.get("curNode");
var _872=!_871||(dom.isDescendant(_871,this.domNode))?_870:_871;
function _873(){
if(self.refocus&&_872){
_872.focus();
}
pm.close(self);
};
pm.open({popup:this,x:_86d.x,y:_86d.y,onExecute:_873,onCancel:_873,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){
this.inherited("_onBlur",arguments);
pm.close(this);
};
},uninitialize:function(){
_853.forEach(this._bindings,function(b){
if(b){
this.unBindDomNode(b.node);
}
},this);
this.inherited(arguments);
}});
});
},"dijit/layout/ContentPane":function(){
define("dijit/layout/ContentPane",["dojo/_base/kernel","dojo/_base/lang","../_Widget","./_ContentPaneResizeMixin","dojo/string","dojo/html","dojo/i18n!../nls/loading","dojo/_base/array","dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-attr","dojo/_base/window","dojo/_base/xhr","dojo/i18n"],function(_874,lang,_875,_876,_877,html,_878,_879,_87a,_87b,dom,_87c,win,xhr,i18n){
var _87d=typeof (dojo.global.perf)!="undefined";
return _87a("dijit.layout.ContentPane",[_875,_876],{href:"",content:"",extractContent:false,parseOnLoad:true,parserScope:_874._scopeName,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'><span class='dijitInline dijitIconLoading'></span>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'><span class='dijitInline dijitIconError'></span>${errorState}</span>",isLoaded:false,baseClass:"dijitContentPane",ioArgs:{},onLoadDeferred:null,_setTitleAttr:null,stopParser:true,template:false,create:function(_87e,_87f){
if((!_87e||!_87e.template)&&_87f&&!("href" in _87e)&&!("content" in _87e)){
var df=win.doc.createDocumentFragment();
_87f=dom.byId(_87f);
while(_87f.firstChild){
df.appendChild(_87f.firstChild);
}
_87e=lang.delegate(_87e,{content:df});
}
this.inherited(arguments,[_87e,_87f]);
},postMixInProperties:function(){
this.inherited(arguments);
var _880=i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=_877.substitute(this.loadingMessage,_880);
this.errorMessage=_877.substitute(this.errorMessage,_880);
},buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
this.domNode.title="";
if(!_87c.get(this.domNode,"role")){
this.domNode.setAttribute("role","group");
}
this.domNode.removeAttribute("title");
},startup:function(){
this.inherited(arguments);
if(this._contentSetter){
_879.forEach(this._contentSetter.parseResults,function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
},this);
}
},setHref:function(href){
_874.deprecated("dijit.layout.ContentPane.setHref() is deprecated. Use set('href', ...) instead.","","2.0");
return this.set("href",href);
},_setHrefAttr:function(href){
this.cancel();
this.onLoadDeferred=new _87b(lang.hitch(this,"cancel"));
this.onLoadDeferred.addCallback(lang.hitch(this,"onLoad"));
this._set("href",href);
if(this.preload||(this._created&&this._isShown())){
this._load();
}else{
this._hrefChanged=true;
}
return this.onLoadDeferred;
},setContent:function(data){
_874.deprecated("dijit.layout.ContentPane.setContent() is deprecated.  Use set('content', ...) instead.","","2.0");
this.set("content",data);
},_setContentAttr:function(data){
this._set("href","");
this.cancel();
this.onLoadDeferred=new _87b(lang.hitch(this,"cancel"));
if(this._created){
this.onLoadDeferred.addCallback(lang.hitch(this,"onLoad"));
}
this._setContent(data||"");
this._isDownloaded=false;
return this.onLoadDeferred;
},_getContentAttr:function(){
return this.containerNode.innerHTML;
},cancel:function(){
if(this._xhrDfd&&(this._xhrDfd.fired==-1)){
this._xhrDfd.cancel();
}
delete this._xhrDfd;
this.onLoadDeferred=null;
},uninitialize:function(){
if(this._beingDestroyed){
this.cancel();
}
this.inherited(arguments);
},destroyRecursive:function(_881){
if(this._beingDestroyed){
return;
}
this.inherited(arguments);
},_onShow:function(){
this.inherited(arguments);
if(this.href){
if(!this._xhrDfd&&(!this.isLoaded||this._hrefChanged||this.refreshOnShow)){
return this.refresh();
}
}
},refresh:function(){
this.cancel();
this.onLoadDeferred=new _87b(lang.hitch(this,"cancel"));
this.onLoadDeferred.addCallback(lang.hitch(this,"onLoad"));
this._load();
return this.onLoadDeferred;
},_load:function(){
if(_87d){
perf.widgetStartedLoadingCallback();
}
this._setContent(this.onDownloadStart(),true);
var self=this;
var _882={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(lang.isObject(this.ioArgs)){
lang.mixin(_882,this.ioArgs);
}
var hand=(this._xhrDfd=(this.ioMethod||xhr.get)(_882));
hand.addCallback(function(html){
try{
self._isDownloaded=true;
self._setContent(html,false);
self.onDownloadEnd();
}
catch(err){
self._onError("Content",err);
}
if(_87d){
perf.widgetLoadedCallback(self);
}
delete self._xhrDfd;
return html;
});
hand.addErrback(function(err){
if(!hand.canceled){
self._onError("Download",err);
}
delete self._xhrDfd;
return err;
});
delete this._hrefChanged;
},_onLoadHandler:function(data){
this._set("isLoaded",true);
try{
this.onLoadDeferred.callback(data);
}
catch(e){
console.error("Error "+this.widgetId+" running custom onLoad code: "+e.message);
}
},_onUnloadHandler:function(){
this._set("isLoaded",false);
try{
this.onUnload();
}
catch(e){
console.error("Error "+this.widgetId+" running custom onUnload code: "+e.message);
}
},destroyDescendants:function(_883){
if(this.isLoaded){
this._onUnloadHandler();
}
var _884=this._contentSetter;
_879.forEach(this.getChildren(),function(_885){
if(_885.destroyRecursive){
_885.destroyRecursive(_883);
}
});
if(_884){
_879.forEach(_884.parseResults,function(_886){
if(_886.destroyRecursive&&_886.domNode&&_886.domNode.parentNode==win.body()){
_886.destroyRecursive(_883);
}
});
delete _884.parseResults;
}
if(!_883){
html._emptyNode(this.containerNode);
}
delete this._singleChild;
},_setContent:function(cont,_887){
this.destroyDescendants();
var _888=this._contentSetter;
if(!(_888&&_888 instanceof html._ContentSetter)){
_888=this._contentSetter=new html._ContentSetter({node:this.containerNode,_onError:lang.hitch(this,this._onError),onContentError:lang.hitch(this,function(e){
var _889=this.onContentError(e);
try{
this.containerNode.innerHTML=_889;
}
catch(e){
console.error("Fatal "+this.id+" could not change content due to "+e.message,e);
}
})});
}
var _88a=lang.mixin({cleanContent:this.cleanContent,extractContent:this.extractContent,parseContent:!cont.domNode&&this.parseOnLoad,parserScope:this.parserScope,startup:false,dir:this.dir,lang:this.lang,textDir:this.textDir},this._contentSetterParams||{});
_888.set((lang.isObject(cont)&&cont.domNode)?cont.domNode:cont,_88a);
delete this._contentSetterParams;
if(this.doLayout){
this._checkIfSingleChild();
}
if(!_887){
if(this._started){
delete this._started;
this.startup();
this._scheduleLayout();
}
this._onLoadHandler(cont);
}
},_onError:function(type,err,_88b){
this.onLoadDeferred.errback(err);
var _88c=this["on"+type+"Error"].call(this,err);
if(_88b){
console.error(_88b,err);
}else{
if(_88c){
this._setContent(_88c,true);
}
}
},onLoad:function(){
},onUnload:function(){
},onDownloadStart:function(){
return this.loadingMessage;
},onContentError:function(){
},onDownloadError:function(){
return this.errorMessage;
},onDownloadEnd:function(){
}});
});
},"curam/util/RuntimeContext":function(){
define("curam/util/RuntimeContext",[],function(){
var _88d=dojo.declare("curam.util.RuntimeContext",null,{_window:null,constructor:function(_88e){
this._window=_88e;
},getHref:function(){
return this._window.location.href;
},getPathName:function(){
return this._window.location.pathName;
},contextObject:function(){
return this._window;
}});
return _88d;
});
},"idx/oneui/MenuHeading":function(){
require({cache:{"url:idx/oneui/templates/MenuHeading.html":"<tr class=\"dijitReset dijitMenuItem oneuiMenuHeading\" role=\"presentation\" tabindex=\"-1\">\r\n\t<td class=\"dijitReset dijitMenuItemLabel oneuiMenuHeadingLabel\" colspan=\"4\" data-dojo-attach-point=\"containerNode\"></td>\r\n</tr>"}});
define("idx/oneui/MenuHeading",["dojo/_base/declare","dijit/MenuSeparator","dojo/text!../oneui/templates/MenuHeading.html"],function(_88f,_890,_891){
return _88f("idx.oneui.MenuHeading",[_890],{label:"",_setLabelAttr:{node:"containerNode",type:"innerHTML"},templateString:_891});
});
},"dijit/_KeyNavContainer":function(){
define("dijit/_KeyNavContainer",["dojo/_base/kernel","./_Container","./_FocusMixin","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/event","dojo/dom-attr","dojo/_base/lang"],function(_892,_893,_894,_895,keys,_896,_897,_898,lang){
return _896("dijit._KeyNavContainer",[_894,_893],{tabIndex:"0",connectKeyNavHandlers:function(_899,_89a){
var _89b=(this._keyNavCodes={});
var prev=lang.hitch(this,"focusPrev");
var next=lang.hitch(this,"focusNext");
_895.forEach(_899,function(code){
_89b[code]=prev;
});
_895.forEach(_89a,function(code){
_89b[code]=next;
});
_89b[keys.HOME]=lang.hitch(this,"focusFirstChild");
_89b[keys.END]=lang.hitch(this,"focusLastChild");
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
this.connect(this.domNode,"onfocus","_onContainerFocus");
},startupKeyNavChildren:function(){
_892.deprecated("startupKeyNavChildren() call no longer needed","","2.0");
},startup:function(){
this.inherited(arguments);
_895.forEach(this.getChildren(),lang.hitch(this,"_startupChild"));
},addChild:function(_89c,_89d){
this.inherited(arguments);
this._startupChild(_89c);
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
},focusChild:function(_89e,last){
if(!_89e){
return;
}
if(this.focusedChild&&_89e!==this.focusedChild){
this._onChildBlur(this.focusedChild);
}
_89e.set("tabIndex",this.tabIndex);
_89e.focus(last?"end":"start");
this._set("focusedChild",_89e);
},_startupChild:function(_89f){
_89f.set("tabIndex","-1");
this.connect(_89f,"_onFocus",function(){
_89f.set("tabIndex",this.tabIndex);
});
this.connect(_89f,"_onBlur",function(){
_89f.set("tabIndex","-1");
});
},_onContainerFocus:function(evt){
if(evt.target!==this.domNode||this.focusedChild){
return;
}
this.focusFirstChild();
_898.set(this.domNode,"tabIndex","-1");
},_onBlur:function(evt){
if(this.tabIndex){
_898.set(this.domNode,"tabIndex",this.tabIndex);
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
_897.stop(evt);
}
},_onChildBlur:function(){
},_getFirstFocusableChild:function(){
return this._getNextFocusableChild(null,1);
},_getLastFocusableChild:function(){
return this._getNextFocusableChild(null,-1);
},_getNextFocusableChild:function(_8a0,dir){
if(_8a0){
_8a0=this._getSiblingOfChild(_8a0,dir);
}
var _8a1=this.getChildren();
for(var i=0;i<_8a1.length;i++){
if(!_8a0){
_8a0=_8a1[(dir>0)?0:(_8a1.length-1)];
}
if(_8a0.isFocusable()){
return _8a0;
}
_8a0=this._getSiblingOfChild(_8a0,dir);
}
return null;
}});
});
},"dijit/layout/utils":function(){
define("dijit/layout/utils",["dojo/_base/array","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang",".."],function(_8a2,_8a3,_8a4,_8a5,lang,_8a6){
var _8a7=lang.getObject("layout",true,_8a6);
_8a7.marginBox2contentBox=function(node,mb){
var cs=_8a5.getComputedStyle(node);
var me=_8a4.getMarginExtents(node,cs);
var pb=_8a4.getPadBorderExtents(node,cs);
return {l:_8a5.toPixelValue(node,cs.paddingLeft),t:_8a5.toPixelValue(node,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)};
};
function _8a8(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
};
function size(_8a9,dim){
var _8aa=_8a9.resize?_8a9.resize(dim):_8a4.setMarginBox(_8a9.domNode,dim);
if(_8a9.fakeWidget){
return;
}
if(_8aa){
lang.mixin(_8a9,_8aa);
}else{
lang.mixin(_8a9,_8a4.getMarginBoxSimple(_8a9.domNode));
lang.mixin(_8a9,dim);
}
};
_8a7.layoutChildren=function(_8ab,dim,_8ac,_8ad,_8ae){
dim=lang.mixin({},dim);
_8a3.add(_8ab,"dijitLayoutContainer");
_8ac=_8a2.filter(_8ac,function(item){
return item.region!="center"&&item.layoutAlign!="client";
}).concat(_8a2.filter(_8ac,function(item){
return item.region=="center"||item.layoutAlign=="client";
}));
var _8af={};
_8a2.forEach(_8ac,function(_8b0){
var elm=_8b0.domNode,pos=(_8b0.region||_8b0.layoutAlign);
if(!pos){
throw new Error("No region setting for "+_8b0.id);
}
var _8b1=elm.style;
_8b1.left=dim.l+"px";
_8b1.top=dim.t+"px";
_8b1.position="absolute";
_8a3.add(elm,"dijitAlign"+_8a8(pos));
var _8b2={};
if(_8ad&&_8ad==_8b0.id){
_8b2[_8b0.region=="top"||_8b0.region=="bottom"?"h":"w"]=_8ae;
}
if(pos=="top"||pos=="bottom"){
_8b2.w=dim.w;
size(_8b0,_8b2);
dim.h-=_8b0.h;
if(pos=="top"){
dim.t+=_8b0.h;
}else{
_8b1.top=dim.t+dim.h+"px";
}
}else{
if(pos=="left"||pos=="right"){
_8b2.h=dim.h;
size(_8b0,_8b2);
dim.w-=_8b0.w;
if(pos=="left"){
dim.l+=_8b0.w;
}else{
_8b1.left=dim.l+dim.w+"px";
}
}else{
if(pos=="client"||pos=="center"){
size(_8b0,dim);
}
}
}
_8af[pos]={w:dim.w,h:dim.h};
});
return _8af;
};
return {marginBox2contentBox:_8a7.marginBox2contentBox,layoutChildren:_8a7.layoutChildren};
});
},"dijit/_Contained":function(){
define("dijit/_Contained",["dojo/_base/declare","./registry"],function(_8b3,_8b4){
return _8b3("dijit._Contained",null,{_getSibling:function(_8b5){
var node=this.domNode;
do{
node=node[_8b5+"Sibling"];
}while(node&&node.nodeType!=1);
return node&&_8b4.byNode(node);
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
},"idx/oneui/Menu":function(){
require({cache:{"url:idx/oneui/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\r\n\t<tbody class=\"dijitReset\">\r\n\t\t<tr data-dojo-attach-point=\"_columnContainerNode\">\r\n\t\t\t<td class=\"dijitReset oneuiMenuColumn\" data-dojo-attach-point=\"columnNodes\">\r\n\t\t\t\t<table class=\"dijitReset\" cellspacing=\"0\" width=\"100%\" role=\"presentation\">\r\n\t\t\t\t\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"_containerNodes,containerNode\">\r\n<!-- this is column 0, which also starts out as the container node so menu items are initially loaded here.\r\n     containerNode changes to point to _columnContainerNode once the widget has initialised, so the whole set of columns is the container.\r\n\t this must be kept in synch with _MenuColumn.html -->\r\n\t\t\t\t\t</tbody>\r\n\t\t\t\t</table>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</tbody>\r\n</table>\r\n","url:idx/oneui/templates/_MenuColumn.html":"<td class=\"dijitReset oneuiMenuColumn\" data-dojo-attach-point=\"columnNodes\">\r\n\t<table class=\"dijitReset\" cellspacing=\"0\" width=\"100%\" role=\"presentation\">\r\n\t\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"_containerNodes\">\r\n<!-- this must be kept in synch with column 0 included in Menu.html -->\r\n\t\t</tbody>\r\n\t</table>\r\n</td>"}});
define("idx/oneui/Menu",["dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/dom-geometry","dijit/_TemplatedMixin","dijit/_WidgetBase","dijit/Menu","dijit/MenuItem","dijit/registry","idx/oneui/_MenuOpenOnHoverMixin","dojo/text!../oneui/templates/Menu.html","dojo/text!../oneui/templates/_MenuColumn.html"],function(_8b6,_8b7,_8b8,_8b9,_8ba,_8bb,Menu,_8bc,_8bd,_8be,_8bf,_8c0){
var _8c1={"error":"oneuiErrorMenuItemIcon","warning":"oneuiWarningMenuItemIcon","confirmation":"oneuiConfirmationMenuItemIcon","information":"oneuiInformationMenuItemIcon","success":"oneuiSuccessMenuItemIcon","critical":"oneuiCriticalMenuItemIcon","attention":"oneuiAttentionMenuItemIcon","compliance":"oneuiComplianceMenuItemIcon"};
var Menu=_8b7("idx.oneui.Menu",[Menu,_8be],{_containerNodes:null,columnNodes:null,menuForDialog:true,templateString:_8bf,constructor:function(){
this._containerNodes=[];
this.columnNodes=[];
},_getNextFocusableChild:function(_8c2,dir){
var _8c3=null;
var _8c4=this.getChildren();
var _8c5;
if(_8c2!=null){
_8c5=_8b6.indexOf(_8c4,_8c2);
if(_8c5!=-1){
_8c5+=dir;
if(_8c5<0){
_8c5=_8c4.length-1;
}
if(_8c5>=_8c4.length){
_8c5=0;
}
}
}else{
if(_8c4.length==0){
_8c5=-1;
}else{
_8c5=(dir==1)?0:_8c4.length-1;
}
}
if(_8c5!=-1){
var i=_8c5;
do{
if(_8c4[i].isFocusable()){
_8c3=_8c4[i];
break;
}
i+=dir;
if(i<0){
i=_8c4.length-1;
}
if(i>=_8c4.length){
i=0;
}
}while(i!=_8c5);
}
return _8c3;
},_moveToColumn:function(dir){
if(this.focusedChild){
for(var i=0;i<this._containerNodes.length;i++){
if(this.focusedChild.domNode.parentNode==this._containerNodes[i]){
var _8c6=i,yPos=_8b9.getMarginBox(this.focusedChild.domNode).t;
break;
}
}
}
if(_8c6!=undefined){
for(i=_8c6+dir;i>=0&&i<this._containerNodes.length;i+=dir){
var _8c7=_8bd.findWidgets(this._containerNodes[i]);
var _8c8=dojo.filter(_8c7,function(_8c9){
return _8c9.isFocusable();
});
if(_8c8.length>0){
var _8ca=i;
break;
}
}
if(_8ca!=undefined){
for(i=0;i<_8c8.length;i++){
var _8cb=_8c8[i];
var _8cc=_8b9.getMarginBox(_8cb.domNode);
if(yPos>=_8cc.t&&yPos<=_8cc.t+_8cc.h-1){
this.focusChild(_8cb);
return true;
}else{
if(yPos<_8cc.t){
if(i>0){
this.focusChild(_8c8[i-1]);
return true;
}else{
this.focusChild(_8cb);
return true;
}
}else{
if(i==_8c8.length-1){
this.focusChild(_8cb);
return true;
}
}
}
}
}
}
return false;
},_onKeyPress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
switch(evt.charOrCode){
case this._openSubMenuKey:
if(!this._moveToColumn(+1)){
this._moveToPopup(evt);
}
_8b8.stop(evt);
break;
case this._closeSubMenuKey:
if(!this._moveToColumn(-1)){
if(this.parentMenu){
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
}
}
_8b8.stop(evt);
break;
}
},refresh:function(){
var _8cd=this.getChildren();
for(var i=0;i<_8cd.length;i++){
this.addChild(_8cd[i]);
}
},startup:function(){
if(this._started){
return;
}
this._started=true;
this.inherited(arguments);
this.containerNode=this._columnContainerNode;
this.refresh();
},addChild:function(_8ce,_8cf){
while(this._containerNodes.length<=(_8ce.column||0)){
var node=_8ba.getCachedTemplate(_8c0).cloneNode(true);
this._attachTemplateNodes(node,function(n,p){
return n.getAttribute(p);
});
this._columnContainerNode.appendChild(node);
}
this.containerNode=this._containerNodes[_8ce.column||0];
this.inherited(arguments);
this.containerNode=this._columnContainerNode;
}});
Menu.createMessageMenuItem=function(args){
var _8d0="";
if(args){
if(args.timestamp){
_8d0+="‏<span class=\"messageMenuTimestamp messagesContrast\">‎"+args.timestamp+"‏</span>‎";
}
if(args.content){
_8d0+="‏ <span class=\"messageTitles\">‎"+args.content+"‏</span>‎";
}
if(args.messageId){
_8d0+="‏ <span class=\"messagesContrast\">(‎"+args.messageId+"‏)</span>‎";
}
}
return new _8bc({label:_8d0,iconClass:args&&args.type&&_8c1[args.type]});
};
return Menu;
});
},"idx/oneui/_EventTriggerMixin":function(){
define("idx/oneui/_EventTriggerMixin",["dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/_base/lang","dojo/_base/window","dojo/dom","dojo/io/iframe","dojo/mouse","dojo/on","dojo/window","dijit/_MenuBase"],function(_8d1,_8d2,_8d3,lang,_8d4,dom,_8d5,_8d6,on,_8d7,_8d8){
var dojo={},_8d9={};
return _8d2("idx.oneui._EventTriggerMixin",null,{_bindings:null,_hoverTimer:null,hoverDuration:_8d8.prototype.popupDelay,constructor:function(){
this._bindings=[];
},_addEventTrigger:function(_8da,_8db,_8dc,_8dd){
_8da=dom.byId(_8da);
if(!_8da){
require.log("ERROR: oneui._EventTriggerMixin._addEventTrigger(): Invalid triggerNode parameter.");
return;
}
var _8de=lang.hitch(this,function(_8df){
var _8e0={triggerNode:_8da,eventName:_8db,event:_8df,additionalData:_8dd};
if(!_8dc||_8dc(_8e0)){
this._onTrigger(_8e0);
}
});
var _8e1=function(_8e2){
return {type:"hover",pageX:_8e2.pageX,pageY:_8e2.pageY,screenX:_8e2.screenX,screenY:_8e2.screenY,clientX:_8e2.clientX,clientY:_8e2.clientY};
};
var _8e3={triggerNode:_8da,connectHandles:[]};
if(_8db=="hover"){
_8e3.hoverDuration=this.hoverDuration;
_8e3.hoverTimer=null;
}
_8e3.bindFunction=function(){
var _8e4;
if(_8da.tagName=="IFRAME"){
try{
var _8e5=_8d5.doc(_8da);
_8e4=_8e5?_8e5.body:null;
}
catch(e){
require.log("ERROR: oneui._EventTriggerMixin._addEventTrigger(): Error accessing body of document within iframe. "+e);
}
}else{
_8e4=_8da;
}
if(!_8e4){
require.log("ERROR: oneui._EventTriggerMixin._addEventTrigger(): Unable to determine node to attach event listener(s) to.");
return;
}
if(_8db=="hover"){
var _8e6=null;
_8e3.connectHandles.push(on(_8e4,_8d6.enter,lang.hitch(this,function(_8e7){
_8e6=_8e1(_8e7);
if(_8e3.hoverTimer){
clearTimeout(_8e3.hoverTimer);
}
_8e3.hoverTimer=setTimeout(function(){
_8de(_8e6);
},_8e3.hoverDuration);
})));
_8e3.connectHandles.push(on(_8e4,_8d6.leave,lang.hitch(this,function(_8e8){
if(_8e3.hoverTimer){
clearTimeout(_8e3.hoverTimer);
_8e3.hoverTimer=null;
}
_8e6=undefined;
})));
_8e3.connectHandles.push(on(_8e4,"mousemove",function(_8e9){
_8e6=_8e1(_8e9);
}));
}else{
_8e3.connectHandles.push(on(_8e4,_8db,function(_8ea){
_8de(_8ea);
}));
}
};
_8e3.unbindFunction=function(){
_8d1.forEach(_8e3.connectHandles,function(conn){
conn.remove();
});
if(_8e3.hoverTimer){
clearTimeout(_8e3.hoverTimer);
_8e3.hoverTimer=null;
}
};
if(_8da.tagName==="IFRAME"){
_8e3.iframeOnLoadHandler=function(_8eb){
try{
_8e3.unbindFunction();
}
catch(e){
}
_8e3.bindFunction();
};
if(_8da.addEventListener){
_8da.addEventListener("load",_8e3.iframeOnLoadHandler,false);
}else{
_8da.attachEvent("onload",_8e3.iframeOnLoadHandler);
}
}
this._bindings.push(_8e3);
_8e3.bindFunction();
},_onTrigger:function(_8ec){
},_removeEventTriggers:function(_8ed){
if(_8ed){
_8ed=dom.byId(_8ed);
}
for(var i=this._bindings.length-1;i>=0;i--){
var _8ee=this._bindings[i];
if(!_8ed||(_8ed===_8ee.triggerNode)){
_8ee.unbindFunction();
if(_8ee.iframeOnLoadHandler){
if(_8ee.triggerNode.removeEventListener){
_8ee.triggerNode.removeEventListener("load",_8ee.iframeOnLoadHandler,false);
}else{
_8ee.triggerNode.detachEvent("onload",_8ee.iframeOnLoadHandler);
}
}
this._bindings.splice(i,1);
}
}
}});
});
},"url:dijit/templates/MenuBar.html":"<div class=\"dijitMenuBar dijitMenuPassive\" data-dojo-attach-point=\"containerNode\"  role=\"menubar\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress: _onKeyPress\"></div>\n","dijit/_Container":function(){
define("dijit/_Container",["dojo/_base/array","dojo/_base/declare","dojo/dom-construct","./registry"],function(_8ef,_8f0,_8f1,_8f2){
return _8f0("dijit._Container",null,{buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_8f3,_8f4){
var _8f5=this.containerNode;
if(_8f4&&typeof _8f4=="number"){
var _8f6=this.getChildren();
if(_8f6&&_8f6.length>=_8f4){
_8f5=_8f6[_8f4-1].domNode;
_8f4="after";
}
}
_8f1.place(_8f3.domNode,_8f5,_8f4);
if(this._started&&!_8f3._started){
_8f3.startup();
}
},removeChild:function(_8f7){
if(typeof _8f7=="number"){
_8f7=this.getChildren()[_8f7];
}
if(_8f7){
var node=_8f7.domNode;
if(node&&node.parentNode){
node.parentNode.removeChild(node);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},_getSiblingOfChild:function(_8f8,dir){
var node=_8f8.domNode,_8f9=(dir>0?"nextSibling":"previousSibling");
do{
node=node[_8f9];
}while(node&&(node.nodeType!=1||!_8f2.byNode(node)));
return node&&_8f2.byNode(node);
},getIndexOfChild:function(_8fa){
return _8ef.indexOf(this.getChildren(),_8fa);
}});
});
},"dojo/html":function(){
define("dojo/html",["./_base/kernel","./_base/lang","./_base/array","./_base/declare","./dom","./dom-construct","./parser"],function(dojo,lang,_8fb,_8fc,dom,_8fd,_8fe){
lang.getObject("html",true,dojo);
var _8ff=0;
dojo.html._secureForInnerHtml=function(cont){
return cont.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"");
};
dojo.html._emptyNode=_8fd.empty;
dojo.html._setNodeContent=function(node,cont){
_8fd.empty(node);
if(cont){
if(typeof cont=="string"){
cont=_8fd.toDom(cont,node.ownerDocument);
}
if(!cont.nodeType&&lang.isArrayLike(cont)){
for(var _900=cont.length,i=0;i<cont.length;i=_900==cont.length?i+1:0){
_8fd.place(cont[i],node,"last");
}
}else{
_8fd.place(cont,node,"last");
}
}
return node;
};
_8fc("dojo.html._ContentSetter",null,{node:"",content:"",id:"",cleanContent:false,extractContent:false,parseContent:false,parserScope:dojo._scopeName,startup:true,constructor:function(_901,node){
lang.mixin(this,_901||{});
node=this.node=dom.byId(this.node||node);
if(!this.id){
this.id=["Setter",(node)?node.id||node.tagName:"",_8ff++].join("_");
}
},set:function(cont,_902){
if(undefined!==cont){
this.content=cont;
}
if(_902){
this._mixin(_902);
}
this.onBegin();
this.setContent();
this.onEnd();
return this.node;
},setContent:function(){
var node=this.node;
if(!node){
throw new Error(this.declaredClass+": setContent given no node");
}
try{
node=dojo.html._setNodeContent(node,this.content);
}
catch(e){
var _903=this.onContentError(e);
try{
node.innerHTML=_903;
}
catch(e){
console.error("Fatal "+this.declaredClass+".setContent could not change content due to "+e.message,e);
}
}
this.node=node;
},empty:function(){
if(this.parseResults&&this.parseResults.length){
_8fb.forEach(this.parseResults,function(w){
if(w.destroy){
w.destroy();
}
});
delete this.parseResults;
}
dojo.html._emptyNode(this.node);
},onBegin:function(){
var cont=this.content;
if(lang.isString(cont)){
if(this.cleanContent){
cont=dojo.html._secureForInnerHtml(cont);
}
if(this.extractContent){
var _904=cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_904){
cont=_904[1];
}
}
}
this.empty();
this.content=cont;
return this.node;
},onEnd:function(){
if(this.parseContent){
this._parse();
}
return this.node;
},tearDown:function(){
delete this.parseResults;
delete this.node;
delete this.content;
},onContentError:function(err){
return "Error occured setting content: "+err;
},_mixin:function(_905){
var _906={},key;
for(key in _905){
if(key in _906){
continue;
}
this[key]=_905[key];
}
},_parse:function(){
var _907=this.node;
try{
var _908={};
_8fb.forEach(["dir","lang","textDir"],function(name){
if(this[name]){
_908[name]=this[name];
}
},this);
this.parseResults=_8fe.parse({rootNode:_907,noStart:!this.startup,inherited:_908,scope:this.parserScope});
}
catch(e){
this._onError("Content",e,"Error parsing in _ContentSetter#"+this.id);
}
},_onError:function(type,err,_909){
var _90a=this["on"+type+"Error"].call(this,err);
if(_909){
console.error(_909,err);
}else{
if(_90a){
dojo.html._setNodeContent(this.node,_90a,true);
}
}
}});
dojo.html.set=function(node,cont,_90b){
if(undefined==cont){
console.warn("dojo.html.set: no cont argument provided, using empty string");
cont="";
}
if(!_90b){
return dojo.html._setNodeContent(node,cont,true);
}else{
var op=new dojo.html._ContentSetter(lang.mixin(_90b,{content:cont,node:node}));
return op.set();
}
};
return dojo.html;
});
},"dijit/layout/BorderContainer":function(){
define("dijit/layout/BorderContainer",["dojo/_base/array","dojo/cookie","dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/on","dojo/touch","dojo/_base/window","../_WidgetBase","../_Widget","../_TemplatedMixin","./_LayoutWidget","./utils"],function(_90c,_90d,_90e,_90f,_910,_911,_912,_913,keys,lang,on,_914,win,_915,_916,_917,_918,_919){
var _91a=_90e("dijit.layout._Splitter",[_916,_917],{live:true,templateString:"<div class=\"dijitSplitter\" data-dojo-attach-event=\"onkeypress:_onKeyPress,press:_startDrag,onmouseenter:_onMouse,onmouseleave:_onMouse\" tabIndex=\"0\" role=\"separator\"><div class=\"dijitSplitterThumb\"></div></div>",constructor:function(){
this._handlers=[];
},postMixInProperties:function(){
this.inherited(arguments);
this.horizontal=/top|bottom/.test(this.region);
this._factor=/top|left/.test(this.region)?1:-1;
this._cookieName=this.container.id+"_"+this.region;
},buildRendering:function(){
this.inherited(arguments);
_90f.add(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V"));
if(this.container.persist){
var _91b=_90d(this._cookieName);
if(_91b){
this.child.domNode.style[this.horizontal?"height":"width"]=_91b;
}
}
},_computeMaxSize:function(){
var dim=this.horizontal?"h":"w",_91c=_911.getMarginBox(this.child.domNode)[dim],_91d=_90c.filter(this.container.getChildren(),function(_91e){
return _91e.region=="center";
})[0],_91f=_911.getMarginBox(_91d.domNode)[dim];
return Math.min(this.child.maxSize,_91c+_91f);
},_startDrag:function(e){
if(!this.cover){
this.cover=win.doc.createElement("div");
_90f.add(this.cover,"dijitSplitterCover");
_910.place(this.cover,this.child.domNode,"after");
}
_90f.add(this.cover,"dijitSplitterCoverActive");
if(this.fake){
_910.destroy(this.fake);
}
if(!(this._resize=this.live)){
(this.fake=this.domNode.cloneNode(true)).removeAttribute("id");
_90f.add(this.domNode,"dijitSplitterShadow");
_910.place(this.fake,this.domNode,"after");
}
_90f.add(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active");
if(this.fake){
_90f.remove(this.fake,"dijitSplitterHover dijitSplitter"+(this.horizontal?"H":"V")+"Hover");
}
var _920=this._factor,_921=this.horizontal,axis=_921?"pageY":"pageX",_922=e[axis],_923=this.domNode.style,dim=_921?"h":"w",_924=_911.getMarginBox(this.child.domNode)[dim],max=this._computeMaxSize(),min=this.child.minSize||20,_925=this.region,_926=_925=="top"||_925=="bottom"?"top":"left",_927=parseInt(_923[_926],10),_928=this._resize,_929=lang.hitch(this.container,"_layoutChildren",this.child.id),de=win.doc;
this._handlers=this._handlers.concat([on(de,_914.move,this._drag=function(e,_92a){
var _92b=e[axis]-_922,_92c=_920*_92b+_924,_92d=Math.max(Math.min(_92c,max),min);
if(_928||_92a){
_929(_92d);
}
_923[_926]=_92b+_927+_920*(_92d-_92c)+"px";
}),on(de,"dragstart",_913.stop),on(win.body(),"selectstart",_913.stop),on(de,_914.release,lang.hitch(this,"_stopDrag"))]);
_913.stop(e);
},_onMouse:function(e){
var o=(e.type=="mouseover"||e.type=="mouseenter");
_90f.toggle(this.domNode,"dijitSplitterHover",o);
_90f.toggle(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V")+"Hover",o);
},_stopDrag:function(e){
try{
if(this.cover){
_90f.remove(this.cover,"dijitSplitterCoverActive");
}
if(this.fake){
_910.destroy(this.fake);
}
_90f.remove(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active dijitSplitterShadow");
this._drag(e);
this._drag(e,true);
}
finally{
this._cleanupHandlers();
delete this._drag;
}
if(this.container.persist){
_90d(this._cookieName,this.child.domNode.style[this.horizontal?"height":"width"],{expires:365});
}
},_cleanupHandlers:function(){
var h;
while(h=this._handlers.pop()){
h.remove();
}
},_onKeyPress:function(e){
this._resize=true;
var _92e=this.horizontal;
var tick=1;
switch(e.charOrCode){
case _92e?keys.UP_ARROW:keys.LEFT_ARROW:
tick*=-1;
case _92e?keys.DOWN_ARROW:keys.RIGHT_ARROW:
break;
default:
return;
}
var _92f=_911.getMarginSize(this.child.domNode)[_92e?"h":"w"]+this._factor*tick;
this.container._layoutChildren(this.child.id,Math.max(Math.min(_92f,this._computeMaxSize()),this.child.minSize));
_913.stop(e);
},destroy:function(){
this._cleanupHandlers();
delete this.child;
delete this.container;
delete this.cover;
delete this.fake;
this.inherited(arguments);
}});
var _930=_90e("dijit.layout._Gutter",[_916,_917],{templateString:"<div class=\"dijitGutter\" role=\"presentation\"></div>",postMixInProperties:function(){
this.inherited(arguments);
this.horizontal=/top|bottom/.test(this.region);
},buildRendering:function(){
this.inherited(arguments);
_90f.add(this.domNode,"dijitGutter"+(this.horizontal?"H":"V"));
}});
var _931=_90e("dijit.layout.BorderContainer",_918,{design:"headline",gutters:true,liveSplitters:true,persist:false,baseClass:"dijitBorderContainer",_splitterClass:_91a,postMixInProperties:function(){
if(!this.gutters){
this.baseClass+="NoGutter";
}
this.inherited(arguments);
},startup:function(){
if(this._started){
return;
}
_90c.forEach(this.getChildren(),this._setupChild,this);
this.inherited(arguments);
},_setupChild:function(_932){
var _933=_932.region;
if(_933){
this.inherited(arguments);
_90f.add(_932.domNode,this.baseClass+"Pane");
var ltr=this.isLeftToRight();
if(_933=="leading"){
_933=ltr?"left":"right";
}
if(_933=="trailing"){
_933=ltr?"right":"left";
}
if(_933!="center"&&(_932.splitter||this.gutters)&&!_932._splitterWidget){
var _934=_932.splitter?this._splitterClass:_930;
if(lang.isString(_934)){
_934=lang.getObject(_934);
}
var _935=new _934({id:_932.id+"_splitter",container:this,child:_932,region:_933,live:this.liveSplitters});
_935.isSplitter=true;
_932._splitterWidget=_935;
_910.place(_935.domNode,_932.domNode,"after");
_935.startup();
}
_932.region=_933;
}
},layout:function(){
this._layoutChildren();
},addChild:function(_936,_937){
this.inherited(arguments);
if(this._started){
this.layout();
}
},removeChild:function(_938){
var _939=_938.region;
var _93a=_938._splitterWidget;
if(_93a){
_93a.destroy();
delete _938._splitterWidget;
}
this.inherited(arguments);
if(this._started){
this._layoutChildren();
}
_90f.remove(_938.domNode,this.baseClass+"Pane");
_912.set(_938.domNode,{top:"auto",bottom:"auto",left:"auto",right:"auto",position:"static"});
_912.set(_938.domNode,_939=="top"||_939=="bottom"?"width":"height","auto");
},getChildren:function(){
return _90c.filter(this.inherited(arguments),function(_93b){
return !_93b.isSplitter;
});
},getSplitter:function(_93c){
return _90c.filter(this.getChildren(),function(_93d){
return _93d.region==_93c;
})[0]._splitterWidget;
},resize:function(_93e,_93f){
if(!this.cs||!this.pe){
var node=this.domNode;
this.cs=_912.getComputedStyle(node);
this.pe=_911.getPadExtents(node,this.cs);
this.pe.r=_912.toPixelValue(node,this.cs.paddingRight);
this.pe.b=_912.toPixelValue(node,this.cs.paddingBottom);
_912.set(node,"padding","0px");
}
this.inherited(arguments);
},_layoutChildren:function(_940,_941){
if(!this._borderBox||!this._borderBox.h){
return;
}
var _942=_90c.map(this.getChildren(),function(_943,idx){
return {pane:_943,weight:[_943.region=="center"?Infinity:0,_943.layoutPriority,(this.design=="sidebar"?1:-1)*(/top|bottom/.test(_943.region)?1:-1),idx]};
},this);
_942.sort(function(a,b){
var aw=a.weight,bw=b.weight;
for(var i=0;i<aw.length;i++){
if(aw[i]!=bw[i]){
return aw[i]-bw[i];
}
}
return 0;
});
var _944=[];
_90c.forEach(_942,function(_945){
var pane=_945.pane;
_944.push(pane);
if(pane._splitterWidget){
_944.push(pane._splitterWidget);
}
});
var dim={l:this.pe.l,t:this.pe.t,w:this._borderBox.w-this.pe.w,h:this._borderBox.h-this.pe.h};
_919.layoutChildren(this.domNode,dim,_944,_940,_941);
},destroyRecursive:function(){
_90c.forEach(this.getChildren(),function(_946){
var _947=_946._splitterWidget;
if(_947){
_947.destroy();
}
delete _946._splitterWidget;
});
this.inherited(arguments);
}});
lang.extend(_915,{region:"",layoutPriority:0,splitter:false,minSize:0,maxSize:Infinity});
_931._Splitter=_91a;
_931._Gutter=_930;
return _931;
});
},"dijit/_base":function(){
define("dijit/_base",[".","./a11y","./WidgetSet","./_base/focus","./_base/manager","./_base/place","./_base/popup","./_base/scroll","./_base/sniff","./_base/typematic","./_base/wai","./_base/window"],function(_948){
return _948._base;
});
},"dijit/_base/typematic":function(){
define("dijit/_base/typematic",["../typematic"],function(){
});
},"curam/html":function(){
define("curam/html",["curam/define"],function(){
curam.define.singleton("curam.html",{splitWithTag:function(_949,_94a,_94b,_94c){
var _94d=_949.split(_94a||"\n");
if(_94d.length<2){
return _94c?_94c(_949):_949;
}
var t=(_94b||"div")+">";
var _94e="<"+t,_94f="</"+t;
if(_94c){
for(var i=0;i<_94d.length;i++){
_94d[i]=_94c(_94d[i]);
}
}
return _94e+_94d.join(_94f+_94e)+_94f;
}});
return curam.html;
});
},"dojo/window":function(){
define("dojo/window",["./_base/lang","./_base/sniff","./_base/window","./dom","./dom-geometry","./dom-style"],function(lang,has,_950,dom,geom,_951){
var _952=lang.getObject("dojo.window",true);
_952.getBox=function(){
var _953=(_950.doc.compatMode=="BackCompat")?_950.body():_950.doc.documentElement,_954=geom.docScroll(),w,h;
if(has("touch")){
var _955=_950.doc.parentWindow||_950.doc.defaultView;
w=_955.innerWidth||_953.clientWidth;
h=_955.innerHeight||_953.clientHeight;
}else{
w=_953.clientWidth;
h=_953.clientHeight;
}
return {l:_954.x,t:_954.y,w:w,h:h};
};
_952.get=function(doc){
if(has("ie")&&_952!==document.parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc.parentWindow||doc.defaultView;
};
_952.scrollIntoView=function(node,pos){
try{
node=dom.byId(node);
var doc=node.ownerDocument||_950.doc,body=doc.body||_950.body(),html=doc.documentElement||body.parentNode,isIE=has("ie"),isWK=has("webkit");
if((!(has("mozilla")||isIE||isWK||has("opera"))||node==body||node==html)&&(typeof node.scrollIntoView!="undefined")){
node.scrollIntoView(false);
return;
}
var _956=doc.compatMode=="BackCompat",_957=(isIE>=9&&node.ownerDocument.parentWindow.frameElement)?((html.clientHeight>0&&html.clientWidth>0&&(body.clientHeight==0||body.clientWidth==0||body.clientHeight>html.clientHeight||body.clientWidth>html.clientWidth))?html:body):(_956?body:html),_958=isWK?body:_957,_959=_957.clientWidth,_95a=_957.clientHeight,rtl=!geom.isBodyLtr(),_95b=pos||geom.position(node),el=node.parentNode,_95c=function(el){
return ((isIE<=6||(isIE&&_956))?false:(_951.get(el,"position").toLowerCase()=="fixed"));
};
if(_95c(node)){
return;
}
while(el){
if(el==body){
el=_958;
}
var _95d=geom.position(el),_95e=_95c(el);
if(el==_958){
_95d.w=_959;
_95d.h=_95a;
if(_958==html&&isIE&&rtl){
_95d.x+=_958.offsetWidth-_95d.w;
}
if(_95d.x<0||!isIE){
_95d.x=0;
}
if(_95d.y<0||!isIE){
_95d.y=0;
}
}else{
var pb=geom.getPadBorderExtents(el);
_95d.w-=pb.w;
_95d.h-=pb.h;
_95d.x+=pb.l;
_95d.y+=pb.t;
var _95f=el.clientWidth,_960=_95d.w-_95f;
if(_95f>0&&_960>0){
_95d.w=_95f;
_95d.x+=(rtl&&(isIE||el.clientLeft>pb.l))?_960:0;
}
_95f=el.clientHeight;
_960=_95d.h-_95f;
if(_95f>0&&_960>0){
_95d.h=_95f;
}
}
if(_95e){
if(_95d.y<0){
_95d.h+=_95d.y;
_95d.y=0;
}
if(_95d.x<0){
_95d.w+=_95d.x;
_95d.x=0;
}
if(_95d.y+_95d.h>_95a){
_95d.h=_95a-_95d.y;
}
if(_95d.x+_95d.w>_959){
_95d.w=_959-_95d.x;
}
}
var l=_95b.x-_95d.x,t=_95b.y-Math.max(_95d.y,0),r=l+_95b.w-_95d.w,bot=t+_95b.h-_95d.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
if(rtl&&((isIE==8&&!_956)||isIE>=9)){
s=-s;
}
_95b.x+=el.scrollLeft;
el.scrollLeft+=s;
_95b.x-=el.scrollLeft;
}
if(bot*t>0){
_95b.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_95b.y-=el.scrollTop;
}
el=(el!=_958)&&!_95e&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
};
require(["dojo/_base/sniff","dojo/on"],function(has,on){
if(has("ie")==8){
var _961=screen.deviceXDPI;
setInterval(function(){
if(screen.deviceXDPI!=_961){
_961=screen.deviceXDPI;
on.emit(_950.global,"resize");
}
},250);
}
});
return _952;
});
},"dijit/_FocusMixin":function(){
define("dijit/_FocusMixin",["./focus","./_WidgetBase","dojo/_base/declare","dojo/_base/lang"],function(_962,_963,_964,lang){
lang.extend(_963,{focused:false,onFocus:function(){
},onBlur:function(){
},_onFocus:function(){
this.onFocus();
},_onBlur:function(){
this.onBlur();
}});
return _964("dijit._FocusMixin",null,{_focusManager:_962});
});
},"dijit/_WidgetsInTemplateMixin":function(){
define("dijit/_WidgetsInTemplateMixin",["dojo/_base/array","dojo/_base/declare","dojo/parser","dijit/registry"],function(_965,_966,_967,_968){
return _966("dijit._WidgetsInTemplateMixin",null,{_earlyTemplatedStartup:false,widgetsInTemplate:true,_beforeFillContent:function(){
if(this.widgetsInTemplate){
var node=this.domNode;
var cw=(this._startupWidgets=_967.parse(node,{noStart:!this._earlyTemplatedStartup,template:true,inherited:{dir:this.dir,lang:this.lang,textDir:this.textDir},propsThis:this,scope:"dojo"}));
this._supportingWidgets=_968.findWidgets(node);
this._attachTemplateNodes(cw,function(n,p){
return n[p];
});
}
},startup:function(){
_965.forEach(this._startupWidgets,function(w){
if(w&&!w._started&&w.startup){
w.startup();
}
});
this.inherited(arguments);
}});
});
},"url:dojox/layout/resources/ExpandoPane.html":"<div class=\"dojoxExpandoPane\">\n\t<div dojoAttachPoint=\"titleWrapper\" class=\"dojoxExpandoTitle\">\n\t\t<div class=\"dojoxExpandoIcon\" dojoAttachPoint=\"iconNode\" dojoAttachEvent=\"onclick:toggle\"><span class=\"a11yNode\">X</span></div>\t\t\t\n\t\t<span class=\"dojoxExpandoTitleNode\" dojoAttachPoint=\"titleNode\">${title}</span>\n\t</div>\n\t<div class=\"dojoxExpandoWrapper\" dojoAttachPoint=\"cwrapper\" dojoAttachEvent=\"ondblclick:_trap\">\n\t\t<div class=\"dojoxExpandoContent\" dojoAttachPoint=\"containerNode\"></div>\n\t</div>\n</div>\n","url:dijit/templates/MenuBarItem.html":"<div class=\"dijitReset dijitInline dijitMenuItem dijitMenuItemLabel\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<span data-dojo-attach-point=\"containerNode\"></span>\n</div>\n","url:curam/widget/templates/OptimalBrowserMessage.html":"<div>\n  <div class=\"hidden\"\n       data-dojo-type=\"dojox/layout/ContentPane\"\n       data-dojo-attach-point=\"_optimalMessage\">\n  </div>\n</div>\n","idx/oneui/HoverHelpTooltip":function(){
require({cache:{"url:idx/oneui/templates/HoverHelpTooltip.html":"<div class=\"idxOneuiHoverHelpTooltip idxOneuiHoverHelpTooltipLeft\" role=\"dialog\"\r\n\t><div role=\"document\"\r\n\t\t><span data-dojo-attach-point=\"closeButtonNode\" class=\"idxOneuiHoverHelpTooltipCloseIcon\" data-dojo-attach-event=\"ondijitclick: hideOnClickClose\" role=\"button\" tabIndex=\"0\"></span\r\n\t></div\r\n\t><div data-dojo-attach-point=\"outerContainerNode\" class=\"idxOneuiHoverHelpTooltipContainer idxOneuiHoverHelpTooltipContents\"\r\n\t\t><div data-dojo-attach-point=\"containerNode\" role=\"document\" tabindex=0></div\r\n\t\t><a target=\"_blank\" href=\"#updateme\" class=\"idxOneuiHoverHelpTooltipLearnLink\" data-dojo-attach-point=\"learnMoreNode\"><span>${learnMoreLabel}</span></a\r\n\t></div\r\n\t><div class=\"idxOneuiHoverHelpTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\r\n></div>"}});
define("idx/oneui/HoverHelpTooltip",["dojo/_base/declare","dojo/_base/fx","dojo/keys","dojo/_base/array","dojo/dom","dojo/_base/lang","dojo/_base/sniff","dijit/focus","dojo/_base/event","dojo/dom-geometry","dijit/place","dijit/a11y","dijit/BackgroundIframe","dojo/dom-style","dojo/_base/window","dijit/_base/manager","dijit/_Widget","dijit/_TemplatedMixin","dijit/Tooltip","dojo/text!./templates/HoverHelpTooltip.html","dijit/dijit","dojo/i18n","dojo/i18n!./nls/HoverHelpTooltip"],function(_969,fx,keys,_96a,dom,lang,has,_96b,_96c,_96d,_96e,a11y,_96f,_970,win,_971,_972,_973,_974,_975,_976,i18n){
var _977=_969("idx.oneui.HoverHelpTooltip",_974,{showDelay:500,hideDelay:800,showLearnMore:false,learnMoreLinkValue:"#updateme",showCloseIcon:true,forceFocus:true,_onHover:function(e){
if(!_977._showTimer){
var _978=e.target;
_977._showTimer=setTimeout(lang.hitch(this,function(){
this.open(_978);
}),this.showDelay);
}
if(_977._hideTimer){
clearTimeout(_977._hideTimer);
delete _977._hideTimer;
}
},_onUnHover:function(){
if(_977._showTimer){
clearTimeout(_977._showTimer);
delete _977._showTimer;
}
if(!_977._hideTimer){
_977._hideTimer=setTimeout(lang.hitch(this,function(){
this.close();
}),this.hideDelay);
}
},open:function(_979){
if(_977._showTimer){
clearTimeout(_977._showTimer);
delete _977._showTimer;
}
_977.show(this.label||this.domNode.innerHTML,_979,this.position,!this.isLeftToRight(),this.textDir,this.showLearnMore,this.learnMoreLinkValue,this.showCloseIcon,this.forceFocus);
this._connectNode=_979;
this.onShow(_979,this.position);
},close:function(){
if(this._connectNode){
_977.hide(this._connectNode);
delete this._connectNode;
this.onHide();
}
if(_977._showTimer){
clearTimeout(_977._showTimer);
delete _977._showTimer;
}
},_setConnectIdAttr:function(_97a){
_96a.forEach(this._connections||[],function(_97b){
_96a.forEach(_97b,lang.hitch(this,"disconnect"));
},this);
this._connectIds=_96a.filter(lang.isArrayLike(_97a)?_97a:(_97a?[_97a]:[]),function(id){
return dom.byId(id);
});
this._connections=_96a.map(this._connectIds,function(id){
var node=dom.byId(id);
return [this.connect(node,"onmouseenter","_onHover"),this.connect(node,"onmouseleave","_onUnHover"),this.connect(node,"onclick","_onHover"),this.connect(node,"onkeypress","_onConnectIdKey")];
},this);
this._set("connectId",_97a);
},_onConnectIdKey:function(evt){
var node=evt.target;
if(evt.charOrCode==keys.ENTER||evt.charOrCode==keys.SPACE||evt.charOrCode==" "||evt.charOrCode==keys.F1){
_977._showTimer=setTimeout(lang.hitch(this,function(){
this.open(node);
}),this.showDelay);
_96c.stop(evt);
}
}});
var _97c=_969("idx.oneui._MasterHoverHelpTooltip",[_972,_973],{duration:_971.defaultDuration,templateString:_975,learnMoreLabel:"",draggable:true,_firstFocusItem:null,_lastFocusItem:null,postMixInProperties:function(){
this.learnMoreLabel=i18n.getLocalization("idx.oneui","HoverHelpTooltip",this.lang).learnMoreLabel;
},postCreate:function(){
win.body().appendChild(this.domNode);
this.bgIframe=new _96f(this.domNode);
this.fadeIn=fx.fadeIn({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onShow")});
this.fadeOut=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHide")});
this.connect(this.domNode,"onkeypress","_onKey");
this.connect(this.domNode,"onmouseenter",lang.hitch(this,function(e){
if(_977._hideTimer){
clearTimeout(_977._hideTimer);
delete _977._hideTimer;
}
this.focus();
this._keepShowing=true;
this.fadeOut.stop();
this.fadeIn.play();
}));
this.connect(this.domNode,"onmouseleave",lang.hitch(this,function(e){
this._keepShowing=false;
_977._hideTimer=setTimeout(lang.hitch(this,function(){
this.hide(this.aroundNode);
}),800);
}));
},show:function(_97d,_97e,_97f,rtl,_980,_981,_982,_983,_984){
this._lastFocusNode=_96b.curNode;
if(_981){
this.learnMoreNode.style.display="inline";
this.learnMoreNode.href=_982;
}else{
this.learnMoreNode.style.display="none";
}
if(_983||_983==null){
this.closeButtonNode.style.display="inline";
}else{
this.closeButtonNode.style.display="none";
}
this.connectorNode.hidden=false;
if(this.aroundNode&&this.aroundNode===_97e&&this.containerNode.innerHTML==_97d){
return;
}
this.domNode.width="auto";
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_97d;
this.set("textDir",_980);
this.containerNode.align=rtl?"right":"left";
var pos=_96e.around(this.domNode,_97e,_97f&&_97f.length?_97f:_977.defaultPosition,!rtl,lang.hitch(this,"orient"));
var _985=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_985.y+((_985.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_985.x+((_985.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}
}
_970.set(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_97e;
if(_984){
this.focus();
}
},orient:function(node,_986,_987,_988,_989){
this.connectorNode.style.top="";
var _98a=_988.w-this.connectorNode.offsetWidth;
node.className="idxOneuiHoverHelpTooltip "+{"MR-ML":"idxOneuiHoverHelpTooltipRight","ML-MR":"idxOneuiHoverHelpTooltipLeft","TM-BM":"idxOneuiHoverHelpTooltipAbove","BM-TM":"idxOneuiHoverHelpTooltipBelow","BL-TL":"idxOneuiHoverHelpTooltipBelow idxOneuiHoverHelpTooltipABLeft","TL-BL":"idxOneuiHoverHelpTooltipAbove idxOneuiHoverHelpTooltipABLeft","BR-TR":"idxOneuiHoverHelpTooltipBelow idxOneuiHoverHelpTooltipABRight","TR-BR":"idxOneuiHoverHelpTooltipAbove idxOneuiHoverHelpTooltipABRight","BR-BL":"idxOneuiHoverHelpTooltipRight","BL-BR":"idxOneuiHoverHelpTooltipLeft","TR-TL":"idxOneuiHoverHelpTooltipRight"}[_986+"-"+_987];
this.domNode.style.width="auto";
var size=_96d.getContentBox(this.domNode);
var _98b=Math.min((Math.max(_98a,1)),size.w);
var _98c=_98b<size.w;
this.domNode.style.width=_98b+"px";
if(_98c){
this.containerNode.style.overflow="auto";
var _98d=this.containerNode.scrollWidth;
this.containerNode.style.overflow="visible";
if(_98d>_98b){
_98d=_98d+_970.get(this.domNode,"paddingLeft")+_970.get(this.domNode,"paddingRight");
this.domNode.style.width=_98d+"px";
}
}
if(_987.charAt(0)=="B"&&_986.charAt(0)=="B"){
var mb=_96d.getMarginBox(node);
var _98e=this.connectorNode.offsetHeight;
if(mb.h>_988.h){
var _98f=_988.h-((_989.h+_98e)>>1);
this.connectorNode.style.top=_98f+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_989.h/2-_98e/2,0),mb.h-_98e)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_98a);
},focus:function(){
if(this._focus){
return;
}
this._getFocusItems(this.outerContainerNode);
this._focus=true;
_96b.focus(this._firstFocusItem);
},_onShow:function(){
if(has("ie")){
this.domNode.style.filter="";
}
},hide:function(_990){
if(this._keepShowing){
this._keepShowing=false;
return;
}
if(this._onDeck&&this._onDeck[1]==_990){
this._onDeck=null;
}else{
if(this.aroundNode===_990||this.isShowingNow){
this._forceHide();
}
}
},hideOnClickClose:function(){
this._forceHide();
},_forceHide:function(){
_96b.focus(this._lastFocusNode);
this._lastFocusNode=null;
this._firstFocusItem=null;
this._lastFocusItem=null;
this._focus=false;
this.fadeIn.stop();
this.isShowingNow=false;
this.fadeOut.play();
},_getFocusItems:function(){
if(this._firstFocusItem){
this._firstFocusItem=this.closeButtonNode;
return;
}
this._firstFocusItem=this.containerNode;
if(_970.get(this.learnMoreNode,"display")=="none"){
var _991=a11y._getTabNavigable(this.containerNode);
this._lastFocusItem=_991.last||_991.highest||this.containerNode;
}else{
this._lastFocusItem=this.learnMoreNode;
}
},_onKey:function(evt){
var node=evt.target;
if(evt.charOrCode===keys.TAB){
this._getFocusItems(this.outerContainerNode);
}
var _992=(this._firstFocusItem==this._lastFocusItem);
if(evt.charOrCode==keys.ESCAPE){
setTimeout(lang.hitch(this,"hideOnClickClose"),0);
_96c.stop(evt);
}else{
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===keys.TAB){
if(!_992){
_96b.focus(this._lastFocusItem);
}
_96c.stop(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===keys.TAB&&!evt.shiftKey){
if(!_992){
_96b.focus(this._firstFocusItem);
}
_96c.stop(evt);
}else{
if(evt.charOrCode===keys.TAB){
evt.stopPropagation();
}
}
}
}
},_onHide:function(){
this.domNode.style.cssText="";
this.containerNode.innerHTML="";
if(this._onDeck){
this.show.apply(this,this._onDeck);
this._onDeck=null;
}
this.aroundNode=null;
},onBlur:function(){
this._forceHide();
},_setAutoTextDir:function(node){
this.applyTextDir(node,has("ie")?node.outerText:node.textContent);
_96a.forEach(node.children,function(_993){
this._setAutoTextDir(_993);
},this);
},_setTextDirAttr:function(_994){
this._set("textDir",typeof _994!="undefined"?_994:"");
if(_994=="auto"){
this._setAutoTextDir(this.containerNode);
}else{
this.containerNode.dir=this.textDir;
}
}});
_977._MasterHoverHelpTooltip=_97c;
_977.show=idx.oneui.showHoverHelpTooltip=function(_995,_996,_997,rtl,_998,_999,_99a,_99b,_99c){
if(!_977._masterTT){
idx.oneui._masterTT=_977._masterTT=new _97c();
}
return _977._masterTT.show(_995,_996,_997,rtl,_998,_999,_99a,_99b,_99c);
};
_977.hide=idx.oneui.hideHoverHelpTooltip=function(_99d){
return _977._masterTT&&_977._masterTT.hide(_99d);
};
_977.defaultPosition=["after-centered","before-centered","below","above"];
return _977;
});
},"dijit/form/_ButtonMixin":function(){
define("dijit/form/_ButtonMixin",["dojo/_base/declare","dojo/dom","dojo/_base/event","../registry"],function(_99e,dom,_99f,_9a0){
return _99e("dijit.form._ButtonMixin",null,{label:"",type:"button",_onClick:function(e){
if(this.disabled){
_99f.stop(e);
return false;
}
var _9a1=this.onClick(e)===false;
if(!_9a1&&this.type=="submit"&&!(this.valueNode||this.focusNode).form){
for(var node=this.domNode;node.parentNode;node=node.parentNode){
var _9a2=_9a0.byNode(node);
if(_9a2&&typeof _9a2._onSubmit=="function"){
_9a2._onSubmit(e);
_9a1=true;
break;
}
}
}
if(_9a1){
e.preventDefault();
}
return !_9a1;
},postCreate:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},onClick:function(){
return true;
},_setLabelAttr:function(_9a3){
this._set("label",_9a3);
(this.containerNode||this.focusNode).innerHTML=_9a3;
}});
});
},"dijit/registry":function(){
define("dijit/registry",["dojo/_base/array","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window","."],function(_9a4,has,_9a5,win,_9a6){
var _9a7={},hash={};
var _9a8={length:0,add:function(_9a9){
if(hash[_9a9.id]){
throw new Error("Tried to register widget with id=="+_9a9.id+" but that id is already registered");
}
hash[_9a9.id]=_9a9;
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
},getUniqueId:function(_9aa){
var id;
do{
id=_9aa+"_"+(_9aa in _9a7?++_9a7[_9aa]:_9a7[_9aa]=0);
}while(hash[id]);
return _9a6._scopeName=="dijit"?id:_9a6._scopeName+"_"+id;
},findWidgets:function(root){
var _9ab=[];
function _9ac(root){
for(var node=root.firstChild;node;node=node.nextSibling){
if(node.nodeType==1){
var _9ad=node.getAttribute("widgetId");
if(_9ad){
var _9ae=hash[_9ad];
if(_9ae){
_9ab.push(_9ae);
}
}else{
_9ac(node);
}
}
}
};
_9ac(root);
return _9ab;
},_destroyAll:function(){
_9a6._curFocus=null;
_9a6._prevFocus=null;
_9a6._activeStack=[];
_9a4.forEach(_9a8.findWidgets(win.body()),function(_9af){
if(!_9af._destroyed){
if(_9af.destroyRecursive){
_9af.destroyRecursive();
}else{
if(_9af.destroy){
_9af.destroy();
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
_9a6.registry=_9a8;
return _9a8;
});
},"dijit/_base/wai":function(){
define("dijit/_base/wai",["dojo/dom-attr","dojo/_base/lang","..","../hccss"],function(_9b0,lang,_9b1){
lang.mixin(_9b1,{hasWaiRole:function(elem,role){
var _9b2=this.getWaiRole(elem);
return role?(_9b2.indexOf(role)>-1):(_9b2.length>0);
},getWaiRole:function(elem){
return lang.trim((_9b0.get(elem,"role")||"").replace("wairole:",""));
},setWaiRole:function(elem,role){
_9b0.set(elem,"role",role);
},removeWaiRole:function(elem,role){
var _9b3=_9b0.get(elem,"role");
if(!_9b3){
return;
}
if(role){
var t=lang.trim((" "+_9b3+" ").replace(" "+role+" "," "));
_9b0.set(elem,"role",t);
}else{
elem.removeAttribute("role");
}
},hasWaiState:function(elem,_9b4){
return elem.hasAttribute?elem.hasAttribute("aria-"+_9b4):!!elem.getAttribute("aria-"+_9b4);
},getWaiState:function(elem,_9b5){
return elem.getAttribute("aria-"+_9b5)||"";
},setWaiState:function(elem,_9b6,_9b7){
elem.setAttribute("aria-"+_9b6,_9b7);
},removeWaiState:function(elem,_9b8){
elem.removeAttribute("aria-"+_9b8);
}});
return _9b1;
});
},"curam/widget/componentWrappers/ListWraper":function(){
define("curam/widget/componentWrappers/ListWraper",["dojo/_base/declare","dojo/on","dijit/_Widget","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/dom-class","dojo/dom-attr"],function(_9b9,on,_9ba,_9bb,_9bc,_9bd,_9be,_9bf){
return _9b9("curam.widget.componentWrappers.ListWraper",[_9ba],{baseClass:"navMenu",_listTypeUnordered:"ul",_listTypeOrdered:"ol",listType:this._listTypeOrdered,baseClass:"listWrapper",itemClass:null,itemStyle:null,role:null,buildRendering:function(){
if(this.listType==this._listTypeUnordered){
this.domNode=_9bb.create("ul");
}else{
this.domNode=_9bb.create("ol");
}
if(this.role!=null){
_9bf.set(this.domNode,"role",this.role);
}
this.inherited(arguments);
},_setItemAttr:function(item,_9c0){
if(_9c0==null){
_9c0="last";
}
var _9c1=_9bb.create("li",null,this.domNode,_9c0);
this._doBeforeItemSet(item,_9c1);
_9bb.place(item.domNode?item.domNode:item,_9c1);
this._doAfterItemSet(item,_9c1);
if(this.itemStyle){
_9bd.set(_9c1,this.itemStyle);
}
if(this.itemClass){
_9be.add(_9c1,this.itemClass);
}
},_doBeforeItemSet:function(item,_9c2){
},_doAfterItemSet:function(item,_9c3){
},_getItemCountAttr:function(){
return this.domNode.children.length;
},_getContainerHeightAttr:function(){
var _9c4=_9bc.getContentBox(this.domNode);
return _9c4.h;
},getChildElament:function(_9c5){
var _9c6=this.domNode.childNodes[_9c5];
return _9c6;
},placeItemToPostion:function(item,_9c7){
var _9c8=this.domNode.childNodes[_9c7];
_9bb.place(_9c8,item);
},deleteChild:function(_9c9){
var _9ca=this.getChildElament(_9c9);
_9bb.destroy(_9ca);
},deleteAllChildern:function(){
while(this.domNode.children.length>0){
this.deleteChild(0);
}
}});
});
},"curam/util/ResourceBundle":function(){
define("curam/util/ResourceBundle",["dojo/i18n","dojo/string"],function(i18n,_9cb){
var _9cc=dojo.declare("curam.util.ResourceBundle",null,{_bundle:undefined,constructor:function(_9cd,_9ce){
var _9cf=_9cd.split(".");
var _9d0=_9cf[_9cf.length-1];
var _9d1=_9cf.length==1?"curam.application":_9cd.slice(0,_9cd.length-_9d0.length-1);
try{
var b=i18n.getLocalization(_9d1,_9d0,_9ce);
if(this._isEmpty(b)){
throw new Error("Empty resource bundle.");
}else{
this._bundle=b;
}
}
catch(e){
throw new Error("Unable to access resource bundle: "+_9d1+"."+_9d0+": "+e.message);
}
},_isEmpty:function(_9d2){
for(var prop in _9d2){
return false;
}
return true;
},getProperty:function(key,_9d3){
var msg=this._bundle[key];
var _9d4=msg;
if(_9d3){
_9d4=_9cb.substitute(msg,_9d3);
}
return _9d4;
}});
return _9cc;
});
},"dojox/layout/ExpandoPane":function(){
require({cache:{"url:dojox/layout/resources/ExpandoPane.html":"<div class=\"dojoxExpandoPane\">\n\t<div dojoAttachPoint=\"titleWrapper\" class=\"dojoxExpandoTitle\">\n\t\t<div class=\"dojoxExpandoIcon\" dojoAttachPoint=\"iconNode\" dojoAttachEvent=\"onclick:toggle\"><span class=\"a11yNode\">X</span></div>\t\t\t\n\t\t<span class=\"dojoxExpandoTitleNode\" dojoAttachPoint=\"titleNode\">${title}</span>\n\t</div>\n\t<div class=\"dojoxExpandoWrapper\" dojoAttachPoint=\"cwrapper\" dojoAttachEvent=\"ondblclick:_trap\">\n\t\t<div class=\"dojoxExpandoContent\" dojoAttachPoint=\"containerNode\"></div>\n\t</div>\n</div>\n"}});
define("dojox/layout/ExpandoPane",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/declare","dojo/_base/array","dojo/_base/connect","dojo/_base/event","dojo/_base/fx","dojo/dom-style","dojo/dom-class","dojo/dom-geometry","dojo/text!./resources/ExpandoPane.html","dijit/layout/ContentPane","dijit/_TemplatedMixin","dijit/_Contained","dijit/_Container"],function(_9d5,lang,_9d6,_9d7,_9d8,_9d9,_9da,_9db,_9dc,_9dd,_9de,_9df,_9e0,_9e1,_9e2){
_9d5.experimental("dojox.layout.ExpandoPane");
return _9d6("dojox.layout.ExpandoPane",[_9df,_9e0,_9e1,_9e2],{attributeMap:lang.delegate(_9df.prototype.attributeMap,{title:{node:"titleNode",type:"innerHTML"}}),templateString:_9de,easeOut:"dojo._DefaultEasing",easeIn:"dojo._DefaultEasing",duration:420,startExpanded:true,previewOpacity:0.75,previewOnDblClick:false,baseClass:"dijitExpandoPane",postCreate:function(){
this.inherited(arguments);
this._animConnects=[];
this._isHorizontal=true;
if(lang.isString(this.easeOut)){
this.easeOut=lang.getObject(this.easeOut);
}
if(lang.isString(this.easeIn)){
this.easeIn=lang.getObject(this.easeIn);
}
var _9e3="",rtl=!this.isLeftToRight();
if(this.region){
switch(this.region){
case "trailing":
case "right":
_9e3=rtl?"Left":"Right";
break;
case "leading":
case "left":
_9e3=rtl?"Right":"Left";
break;
case "top":
_9e3="Top";
break;
case "bottom":
_9e3="Bottom";
break;
}
_9dc.add(this.domNode,"dojoxExpando"+_9e3);
_9dc.add(this.iconNode,"dojoxExpandoIcon"+_9e3);
this._isHorizontal=/top|bottom/.test(this.region);
}
_9db.set(this.domNode,{overflow:"hidden",padding:0});
this.connect(this.domNode,"ondblclick",this.previewOnDblClick?"preview":"toggle");
if(this.previewOnDblClick){
this.connect(this.getParent(),"_layoutChildren",lang.hitch(this,function(){
this._isonlypreview=false;
}));
}
},_startupSizes:function(){
this._container=this.getParent();
this._closedSize=this._titleHeight=_9dd.getMarginBox(this.titleWrapper).h;
if(this.splitter){
var myid=this.id;
_9d7.forEach(dijit.registry.toArray(),function(w){
if(w&&w.child&&w.child.id==myid){
this.connect(w,"_stopDrag","_afterResize");
}
},this);
}
this._currentSize=_9dd.getContentBox(this.domNode);
this._showSize=this._currentSize[(this._isHorizontal?"h":"w")];
this._setupAnims();
if(this.startExpanded){
this._showing=true;
}else{
this._showing=false;
this._hideWrapper();
this._hideAnim.gotoPercent(99,true);
}
this._hasSizes=true;
},_afterResize:function(e){
var tmp=this._currentSize;
this._currentSize=_9dd.getMarginBox(this.domNode);
var n=this._currentSize[(this._isHorizontal?"h":"w")];
if(n>this._titleHeight){
if(!this._showing){
this._showing=!this._showing;
this._showEnd();
}
this._showSize=n;
this._setupAnims();
}else{
this._showSize=tmp[(this._isHorizontal?"h":"w")];
this._showing=false;
this._hideWrapper();
this._hideAnim.gotoPercent(89,true);
}
},_setupAnims:function(){
_9d7.forEach(this._animConnects,_9d8.disconnect);
var _9e4={node:this.domNode,duration:this.duration},_9e5=this._isHorizontal,_9e6={},_9e7={},_9e8=_9e5?"height":"width";
_9e6[_9e8]={end:this._showSize};
_9e7[_9e8]={end:this._closedSize};
this._showAnim=_9da.animateProperty(lang.mixin(_9e4,{easing:this.easeIn,properties:_9e6}));
this._hideAnim=_9da.animateProperty(lang.mixin(_9e4,{easing:this.easeOut,properties:_9e7}));
this._animConnects=[_9d8.connect(this._showAnim,"onEnd",this,"_showEnd"),_9d8.connect(this._hideAnim,"onEnd",this,"_hideEnd")];
},preview:function(){
if(!this._showing){
this._isonlypreview=!this._isonlypreview;
}
this.toggle();
},toggle:function(){
if(this._showing){
this._hideWrapper();
this._showAnim&&this._showAnim.stop();
this._hideAnim.play();
}else{
this._hideAnim&&this._hideAnim.stop();
this._showAnim.play();
}
this._showing=!this._showing;
},_hideWrapper:function(){
_9dc.add(this.domNode,"dojoxExpandoClosed");
_9db.set(this.cwrapper,{visibility:"hidden",opacity:"0",overflow:"hidden"});
},_showEnd:function(){
_9db.set(this.cwrapper,{opacity:0,visibility:"visible"});
_9da.anim(this.cwrapper,{opacity:this._isonlypreview?this.previewOpacity:1},227);
_9dc.remove(this.domNode,"dojoxExpandoClosed");
if(!this._isonlypreview){
setTimeout(lang.hitch(this._container,"layout"),15);
}else{
this._previewShowing=true;
this.resize();
}
},_hideEnd:function(){
if(!this._isonlypreview){
setTimeout(lang.hitch(this._container,"layout"),25);
}else{
this._previewShowing=false;
}
this._isonlypreview=false;
},resize:function(_9e9){
if(!this._hasSizes){
this._startupSizes(_9e9);
}
var _9ea=_9dd.getMarginBox(this.domNode);
this._contentBox={w:_9e9&&"w" in _9e9?_9e9.w:_9ea.w,h:(_9e9&&"h" in _9e9?_9e9.h:_9ea.h)-this._titleHeight};
_9db.set(this.containerNode,"height",this._contentBox.h+"px");
if(_9e9){
_9dd.setMarginBox(this.domNode,_9e9);
}
this._layoutChildren();
},_trap:function(e){
_9d9.stop(e);
}});
});
},"curam/util/UIMFragment":function(){
define("curam/util/UIMFragment",["curam/util/Request","curam/define","curam/debug","curam/util/ScreenContext"],function(_9eb){
curam.define.singleton("curam.util.UIMFragment",{get:function(args){
var _9ec=args&&args.pageID;
var url=args&&args.url;
var _9ed=args&&args.params;
var _9ee=args&&args.onLoad;
var _9ef=args&&args.onDownloadError;
var _9f0=args&&args.targetID;
if(_9f0===""||typeof _9f0==="undefined"){
throw "UIMFragment: targetID must be set.";
}
var _9f1=null;
if(url){
_9f1=url;
}else{
_9f1=curam.util.UIMFragment._constructPath(_9ec)+curam.util.UIMFragment._addCDEJParameters()+curam.util.UIMFragment._encodeParameters(_9ed);
}
curam.debug.log("UIMFragment: GET to "+_9f1);
curam.util.UIMFragment._doService(_9f1,_9f0,args,_9ee,_9ef);
},submitForm:function(_9f2){
var _9f2=dojo.fixEvent(_9f2);
var _9f3=_9f2.target;
dojo.stopEvent(_9f2);
var _9f4={url:curam.util.UIMFragment._constructFormActionPath(_9f3),form:_9f3,load:function(data){
var cp=dijit.getEnclosingWidget(_9f3);
cp.set("content",data);
},error:function(_9f5){
alert("form error: error!!");
}};
_9eb.post(_9f4);
console.log(_9f2+" "+_9f3);
},_constructFormActionPath:function(_9f6){
var _9f7="";
if(window===window.top){
_9f7=curam.config.locale+"/";
}
return _9f7+_9f6.getAttribute("action");
},_initForm:function(_9f8){
var _9f9=dojo.query("form",dijit.byId(_9f8).domNode)[0];
if(_9f9){
dojo.connect(_9f9,"onsubmit",curam.util.UIMFragment.submitForm);
}
},_constructPath:function(_9fa){
var _9fb=window;
var _9fc=window.top;
return curam.util.UIMFragment._constructPathValue(_9fa,_9fb,_9fc);
},_constructPathValue:function(_9fd,_9fe,_9ff){
if(_9fd===""||typeof _9fd==="undefined"){
throw "UIMFragment: pageID must be set.";
}
var _a00="";
if(_9fe.location.pathname===_9ff.location.pathname){
var _a01=_9ff.curam&&_9ff.curam.config&&_9ff.curam.config.locale;
_a00=(_a01||"en")+"/";
}
return _a00+_9fd+"Page.do";
},_encodeParameters:function(_a02){
if(typeof _a02==="undefined"||dojo.toJson(_a02)==="{}"){
curam.debug.log("UIMFragment: No params included in request.");
return "";
}
var _a03=[];
for(var _a04 in _a02){
_a03.push(_a04+"="+encodeURIComponent(_a02[_a04]));
}
return "&"+_a03.join("&");
},_addCDEJParameters:function(){
return "?"+jsScreenContext.toRequestString();
},_doService:function(url,_a05,args,_a06,_a07){
var cp=dijit.byId(_a05);
cp.onLoad=dojo.hitch(cp,curam.util.UIMFragment._handleLoadSuccess,args,_a06);
cp.preventCache=true;
cp.set("href",url);
},_handleDownloadError:function(_a08){
curam.debug.log("Error invoking the UIMFragment: "+_a08);
return "UIMFragment: Generic Error Handler";
},_handleLoadSuccess:function(_a09,_a0a){
curam.util.UIMFragment._initForm(_a09.targetID);
if(_a0a){
_a0a(this);
}
curam.debug.log("");
return "UIMFragment: Generic Success Handler";
}});
return curam.util.UIMFragment;
});
},"dijit/form/_FormWidget":function(){
define("dijit/form/_FormWidget",["dojo/_base/declare","dojo/_base/kernel","dojo/ready","../_Widget","../_CssStateMixin","../_TemplatedMixin","./_FormWidgetMixin"],function(_a0b,_a0c,_a0d,_a0e,_a0f,_a10,_a11){
if(!_a0c.isAsync){
_a0d(0,function(){
var _a12=["dijit/form/_FormValueWidget"];
require(_a12);
});
}
return _a0b("dijit.form._FormWidget",[_a0e,_a10,_a0f,_a11],{setDisabled:function(_a13){
_a0c.deprecated("setDisabled("+_a13+") is deprecated. Use set('disabled',"+_a13+") instead.","","2.0");
this.set("disabled",_a13);
},setValue:function(_a14){
_a0c.deprecated("dijit.form._FormWidget:setValue("+_a14+") is deprecated.  Use set('value',"+_a14+") instead.","","2.0");
this.set("value",_a14);
},getValue:function(){
_a0c.deprecated(this.declaredClass+"::getValue() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},postMixInProperties:function(){
this.nameAttrSetting=this.name?("name=\""+this.name.replace(/'/g,"&quot;")+"\""):"";
this.inherited(arguments);
},_setTypeAttr:null});
});
},"dojo/dnd/common":function(){
define("dojo/dnd/common",["../main"],function(dojo){
dojo.getObject("dnd",true,dojo);
dojo.dnd.getCopyKeyState=dojo.isCopyKey;
dojo.dnd._uniqueId=0;
dojo.dnd.getUniqueId=function(){
var id;
do{
id=dojo._scopeName+"Unique"+(++dojo.dnd._uniqueId);
}while(dojo.byId(id));
return id;
};
dojo.dnd._empty={};
dojo.dnd.isFormElement=function(e){
var t=e.target;
if(t.nodeType==3){
t=t.parentNode;
}
return " button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0;
};
return dojo.dnd;
});
},"dijit/CheckedMenuItem":function(){
require({cache:{"url:dijit/templates/CheckedMenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitemcheckbox\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuItemIcon dijitCheckedMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t<span class=\"dijitCheckedMenuItemIconChar\">&#10003;</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,labelNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&#160;</td>\n</tr>\n"}});
define("dijit/CheckedMenuItem",["dojo/_base/declare","dojo/dom-class","./MenuItem","dojo/text!./templates/CheckedMenuItem.html","./hccss"],function(_a15,_a16,_a17,_a18){
return _a15("dijit.CheckedMenuItem",_a17,{templateString:_a18,checked:false,_setCheckedAttr:function(_a19){
_a16.toggle(this.domNode,"dijitCheckedMenuItemChecked",_a19);
this.domNode.setAttribute("aria-checked",_a19);
this._set("checked",_a19);
},iconClass:"",onChange:function(){
},_onClick:function(e){
if(!this.disabled){
this.set("checked",!this.checked);
this.onChange(this.checked);
}
this.inherited(arguments);
}});
});
},"curam/util/ui/AppExitConditionHandler":function(){
define("curam/util/ui/AppExitConditionHandler",[],function(){
var _a1a=dojo.declare("curam.util.ui.AppExitConditionHandler",null,{_handler:null,constructor:function(_a1b){
if(typeof _a1b!="function"){
throw new Error("Illegal argument: "+_a1b);
}
this._handler=_a1b;
},isConfirmationAllowed:function(){
return this._handler()?true:false;
}});
return _a1a;
});
},"curam/widget/form/ToggleButtonGroup":function(){
define("curam/widget/form/ToggleButtonGroup",["dojo/_base/declare","dojo/_base/connect","dijit/form/ToggleButton"],function(_a1c,_a1d,_a1e){
return _a1c("curam.widget.form.ToggleButtonGroup",[_a1e],{_connectHandler:null,_unselectChannel:null,groupName:"toggleButtonGroup",postMixInProperties:function(){
this.inherited(arguments);
this._unselectChannel="/toggleButtonGroup%$��!|WE/"+this.groupName;
this._connectHandler=_a1d.subscribe(this._unselectChannel,this,"_unselect");
},_unselect:function(_a1f){
if(_a1f!==this&&this.checked){
this.set("checked",false);
}
},_onClick:function(e){
if(this.disabled){
return false;
}
if(!this.checked){
this._select();
}
return this.onClick(e);
},_select:function(){
dojo.publish(this._unselectChannel,[this]);
this.set("checked",true);
},_setCheckedAttr:function(_a20,_a21){
dojo.publish(this._unselectChannel,[this]);
this.inherited(arguments);
},destroy:function(){
try{
_a1d.disconnect(this._connectHandler);
}
catch(err){
console.error(err);
}
this.inherited(arguments);
}});
});
},"dojo/io/iframe":function(){
define("dojo/io/iframe",["../main","require"],function(dojo,_a22){
dojo.getObject("io",true,dojo);
dojo.io.iframe={create:function(_a23,_a24,uri){
if(window[_a23]){
return window[_a23];
}
if(window.frames[_a23]){
return window.frames[_a23];
}
var turi=uri;
if(!turi){
if(dojo.config["useXDomain"]&&!dojo.config["dojoBlankHtmlUrl"]){
console.warn("dojo.io.iframe.create: When using cross-domain Dojo builds,"+" please save dojo/resources/blank.html to your domain and set djConfig.dojoBlankHtmlUrl"+" to the path on your domain to blank.html");
}
turi=(dojo.config["dojoBlankHtmlUrl"]||_a22.toUrl("../resources/blank.html"));
}
var _a25=dojo.place("<iframe id=\""+_a23+"\" name=\""+_a23+"\" src=\""+turi+"\" onload=\""+_a24+"\" style=\"position: absolute; left: 1px; top: 1px; height: 1px; width: 1px; visibility: hidden\">",dojo.body());
window[_a23]=_a25;
return _a25;
},setSrc:function(_a26,src,_a27){
try{
if(!_a27){
if(dojo.isWebKit){
_a26.location=src;
}else{
frames[_a26.name].location=src;
}
}else{
var idoc;
if(dojo.isIE||dojo.isWebKit){
idoc=_a26.contentWindow.document;
}else{
idoc=_a26.contentWindow;
}
if(!idoc){
_a26.location=src;
}else{
idoc.location.replace(src);
}
}
}
catch(e){
console.log("dojo.io.iframe.setSrc: ",e);
}
},doc:function(_a28){
return _a28.contentDocument||(((_a28.name)&&(_a28.document)&&(dojo.doc.getElementsByTagName("iframe")[_a28.name].contentWindow)&&(dojo.doc.getElementsByTagName("iframe")[_a28.name].contentWindow.document)))||((_a28.name)&&(dojo.doc.frames[_a28.name])&&(dojo.doc.frames[_a28.name].document))||null;
},send:function(args){
if(!this["_frame"]){
this._frame=this.create(this._iframeName,dojo._scopeName+".io.iframe._iframeOnload();");
}
var dfd=dojo._ioSetArgs(args,function(dfd){
dfd.canceled=true;
dfd.ioArgs._callNext();
},function(dfd){
var _a29=null;
try{
var _a2a=dfd.ioArgs;
var dii=dojo.io.iframe;
var ifd=dii.doc(dii._frame);
var _a2b=_a2a.handleAs;
_a29=ifd;
if(_a2b!="html"){
if(_a2b=="xml"){
if(dojo.isIE<9||(dojo.isIE&&dojo.isQuirks)){
dojo.query("a",dii._frame.contentWindow.document.documentElement).orphan();
var _a2c=(dii._frame.contentWindow.document).documentElement.innerText;
_a2c=_a2c.replace(/>\s+</g,"><");
_a2c=dojo.trim(_a2c);
var _a2d={responseText:_a2c};
_a29=dojo._contentHandlers["xml"](_a2d);
}
}else{
_a29=ifd.getElementsByTagName("textarea")[0].value;
if(_a2b=="json"){
_a29=dojo.fromJson(_a29);
}else{
if(_a2b=="javascript"){
_a29=dojo.eval(_a29);
}
}
}
}
}
catch(e){
_a29=e;
}
finally{
_a2a._callNext();
}
return _a29;
},function(_a2e,dfd){
dfd.ioArgs._hasError=true;
dfd.ioArgs._callNext();
return _a2e;
});
dfd.ioArgs._callNext=function(){
if(!this["_calledNext"]){
this._calledNext=true;
dojo.io.iframe._currentDfd=null;
dojo.io.iframe._fireNextRequest();
}
};
this._dfdQueue.push(dfd);
this._fireNextRequest();
dojo._ioWatch(dfd,function(dfd){
return !dfd.ioArgs["_hasError"];
},function(dfd){
return (!!dfd.ioArgs["_finished"]);
},function(dfd){
if(dfd.ioArgs._finished){
dfd.callback(dfd);
}else{
dfd.errback(new Error("Invalid dojo.io.iframe request state"));
}
});
return dfd;
},_currentDfd:null,_dfdQueue:[],_iframeName:dojo._scopeName+"IoIframe",_fireNextRequest:function(){
try{
if((this._currentDfd)||(this._dfdQueue.length==0)){
return;
}
do{
var dfd=this._currentDfd=this._dfdQueue.shift();
}while(dfd&&dfd.canceled&&this._dfdQueue.length);
if(!dfd||dfd.canceled){
this._currentDfd=null;
return;
}
var _a2f=dfd.ioArgs;
var args=_a2f.args;
_a2f._contentToClean=[];
var fn=dojo.byId(args["form"]);
var _a30=args["content"]||{};
if(fn){
if(_a30){
var _a31=function(name,_a32){
dojo.create("input",{type:"hidden",name:name,value:_a32},fn);
_a2f._contentToClean.push(name);
};
for(var x in _a30){
var val=_a30[x];
if(dojo.isArray(val)&&val.length>1){
var i;
for(i=0;i<val.length;i++){
_a31(x,val[i]);
}
}else{
if(!fn[x]){
_a31(x,val);
}else{
fn[x].value=val;
}
}
}
}
var _a33=fn.getAttributeNode("action");
var _a34=fn.getAttributeNode("method");
var _a35=fn.getAttributeNode("target");
if(args["url"]){
_a2f._originalAction=_a33?_a33.value:null;
if(_a33){
_a33.value=args.url;
}else{
fn.setAttribute("action",args.url);
}
}
if(!_a34||!_a34.value){
if(_a34){
_a34.value=(args["method"])?args["method"]:"post";
}else{
fn.setAttribute("method",(args["method"])?args["method"]:"post");
}
}
_a2f._originalTarget=_a35?_a35.value:null;
if(_a35){
_a35.value=this._iframeName;
}else{
fn.setAttribute("target",this._iframeName);
}
fn.target=this._iframeName;
dojo._ioNotifyStart(dfd);
fn.submit();
}else{
var _a36=args.url+(args.url.indexOf("?")>-1?"&":"?")+_a2f.query;
dojo._ioNotifyStart(dfd);
this.setSrc(this._frame,_a36,true);
}
}
catch(e){
dfd.errback(e);
}
},_iframeOnload:function(){
var dfd=this._currentDfd;
if(!dfd){
this._fireNextRequest();
return;
}
var _a37=dfd.ioArgs;
var args=_a37.args;
var _a38=dojo.byId(args.form);
if(_a38){
var _a39=_a37._contentToClean;
for(var i=0;i<_a39.length;i++){
var key=_a39[i];
for(var j=0;j<_a38.childNodes.length;j++){
var _a3a=_a38.childNodes[j];
if(_a3a.name==key){
dojo.destroy(_a3a);
break;
}
}
}
if(_a37["_originalAction"]){
_a38.setAttribute("action",_a37._originalAction);
}
if(_a37["_originalTarget"]){
_a38.setAttribute("target",_a37._originalTarget);
_a38.target=_a37._originalTarget;
}
}
_a37._finished=true;
}};
return dojo.io.iframe;
});
},"dijit/_base/place":function(){
define("dijit/_base/place",["dojo/_base/array","dojo/_base/lang","dojo/window","../place",".."],function(_a3b,lang,_a3c,_a3d,_a3e){
_a3e.getViewport=function(){
return _a3c.getBox();
};
_a3e.placeOnScreen=_a3d.at;
_a3e.placeOnScreenAroundElement=function(node,_a3f,_a40,_a41){
var _a42;
if(lang.isArray(_a40)){
_a42=_a40;
}else{
_a42=[];
for(var key in _a40){
_a42.push({aroundCorner:key,corner:_a40[key]});
}
}
return _a3d.around(node,_a3f,_a42,true,_a41);
};
_a3e.placeOnScreenAroundNode=_a3e.placeOnScreenAroundElement;
_a3e.placeOnScreenAroundRectangle=_a3e.placeOnScreenAroundElement;
_a3e.getPopupAroundAlignment=function(_a43,_a44){
var _a45={};
_a3b.forEach(_a43,function(pos){
var ltr=_a44;
switch(pos){
case "after":
_a45[_a44?"BR":"BL"]=_a44?"BL":"BR";
break;
case "before":
_a45[_a44?"BL":"BR"]=_a44?"BR":"BL";
break;
case "below-alt":
ltr=!ltr;
case "below":
_a45[ltr?"BL":"BR"]=ltr?"TL":"TR";
_a45[ltr?"BR":"BL"]=ltr?"TR":"TL";
break;
case "above-alt":
ltr=!ltr;
case "above":
default:
_a45[ltr?"TL":"TR"]=ltr?"BL":"BR";
_a45[ltr?"TR":"TL"]=ltr?"BR":"BL";
break;
}
});
return _a45;
};
return _a3e;
});
},"curam/tab":function(){
define("curam/tab",["curam/define","curam/util","curam/util/ScreenContext"],function(){
curam.define.singleton("curam.tab",{SECTION_TAB_CONTAINER_ID:"app-sections-container-dc",SMART_PANEL_IFRAME_ID:"curam_tab_SmartPanelIframe",toBeExecutedOnTabClose:[],_mockSelectedTab:null,getSelectedTab:function(_a46){
if(curam.tab._mockSelectedTab){
return curam.tab._mockSelectedTab;
}
if(curam.tab.getTabContainer(_a46)){
return curam.tab.getTabContainer(_a46).selectedChildWidget;
}
},getTabContainer:function(_a47){
return curam.tab.getTabContainerFromSectionID(_a47||curam.tab.getCurrentSectionId());
},getCurrentSectionId:function(_a48){
var _a49=curam.util.getTopmostWindow().dijit.byId(curam.tab.SECTION_TAB_CONTAINER_ID);
if(_a49){
var _a4a=_a49.selectedChildWidget.domNode.id;
return _a4a.substring(0,_a4a.length-4);
}else{
if(!_a48){
throw new Error("curam.tab.getCurrentSectionId() - application section"+" tab container not found");
}
}
return null;
},inTabbedUI:function(){
return curam.tab.getCurrentSectionId(true)!=null;
},getTabContainerFromSectionID:function(_a4b){
var _a4c=dijit.byId(_a4b+"-stc");
if(!_a4c&&window.parent&&window.parent!=window){
_a4c=curam.util.getTopmostWindow().dijit.byId(_a4b+"-stc");
}
return _a4c;
},getTabWidgetId:function(tab){
return tab.id;
},getSelectedTabWidgetId:function(){
return curam.tab.getTabWidgetId(curam.tab.getSelectedTab());
},getContainerTab:function(node){
var _a4d=dijit.getEnclosingWidget(node);
if(_a4d&&!_a4d.tabDescriptor){
_a4d=curam.tab.getContainerTab(_a4d.domNode.parentNode);
}
if(!_a4d||!_a4d.tabDescriptor){
throw "Containing tab widget could not be found for node: "+node;
}
return _a4d;
},getContentPanelIframe:function(tab){
var _a4e=tab?tab:curam.tab.getSelectedTab(),_a4f=null;
if(_a4e){
_a4f=dojo.query("iframe",_a4e.domNode).filter(function(item){
return dojo.attr(item,"iscpiframe")=="true";
})[0];
}
return _a4f?_a4f:null;
},refreshMainContentPanel:function(tab){
var _a50=curam.tab.getContentPanelIframe(tab);
_a50.contentWindow.curam.util.publishRefreshEvent();
_a50.contentWindow.location.reload(true);
},getSmartPanelIframe:function(tab){
var _a51=tab?tab:curam.tab.getSelectedTab();
var _a52=dojo.query("iframe",_a51.domNode).filter(function(item){
return item.id==curam.tab.SMART_PANEL_IFRAME_ID;
})[0];
return _a52;
},unsubscribeOnTabClose:function(_a53,_a54){
curam.tab.toBeExecutedOnTabClose.push(function(_a55){
if(_a54==_a55){
dojo.unsubscribe(_a53);
return true;
}
return false;
});
},executeOnTabClose:function(func,_a56){
curam.tab.toBeExecutedOnTabClose.push(function(_a57){
if(_a56==_a57){
func();
return true;
}
return false;
});
},doExecuteOnTabClose:function(_a58){
var _a59=new Array();
for(var i=0;i<curam.tab.toBeExecutedOnTabClose.length;i++){
var func=curam.tab.toBeExecutedOnTabClose[i];
if(!func(_a58)){
_a59.push(func);
}
}
curam.tab.toBeExecutedOnTabClose=_a59;
},getHandlerForTab:function(_a5a,_a5b){
return function(_a5c,_a5d){
if(_a5d==_a5b){
_a5a(_a5c,_a5b);
}else{
}
};
},getTabController:function(){
return curam.util.getTopmostWindow().curam.ui.UIController;
},initTabLinks:function(_a5e){
if(typeof (window.pageContainsClassicIEG)!="undefined"&&window.pageContainsClassicIEG==true){
return;
}
dojo.query("a").forEach(function(link){
if(link.href.indexOf("#")!=0&&link.href.indexOf("javascript:")!=0&&(link.href.indexOf("Page.do")>-1||link.href.indexOf("Frame.do")>-1)){
if(link.href.indexOf("&o3ctx")<0&&link.href.indexOf("?o3ctx")<0){
var _a5f=(link.href.indexOf("?")>-1)?"&":"?";
link.href+=_a5f+jsScreenContext.toRequestString();
}
}
});
elements=document.forms;
for(var i=0;i<elements.length;++i){
elem=elements[i];
var _a60=dojo.byId("o3ctx");
if(!_a60){
var ctx=new curam.util.ScreenContext();
ctx.setContextBits("ACTION");
dojo.create("input",{"type":"hidden","name":"o3ctx","value":ctx.getValue()},elem);
}
dojo.create("input",{"type":"hidden","name":"o3prv","value":jsPageID},elem);
}
if(elements.length>0){
curam.util.getTopmostWindow().dojo.publish("curam.fireNextRequest",[]);
}
},initContent:function(_a61,_a62){
var _a63=dojo.byId("content");
dojo.removeClass(_a63,"hidden-panel");
return;
},setupSectionSelectionListener:function(){
dojo.subscribe(curam.tab.SECTION_TAB_CONTAINER_ID+"-selectChild",curam.tab.onSectionSelected);
},onSectionSelected:function(_a64){
if(_a64.curamDefaultPageID){
var _a65;
if(_a64.id.substring(_a64.id.length-4,_a64.id.length)=="-sbc"){
var _a66=_a64.id.substring(0,_a64.id.length-4);
_a65=curam.tab.getTabContainer(_a66);
}else{
_a65=_a64;
}
if(_a65&&_a65.getChildren().length==0){
curam.tab.getTabController().handleUIMPageID(_a64.curamDefaultPageID,true);
}
return true;
}
return false;
},setSectionDefaultPage:function(_a67,_a68){
var _a69=dijit.byId(_a67);
if(_a69){
_a69.curamDefaultPageID=_a68;
}else{
throw "curam.tab.setSectionDefaultPage() - cannot find section dijit ID:"+_a67;
}
},publishSmartPanelContentReady:function(){
var _a6a="smartpanel.content.loaded";
var _a6b=window.frameElement;
_a6b.setAttribute("_SPContentLoaded","true");
curam.util.getTopmostWindow().dojo.publish(_a6a,[_a6b]);
}});
return curam.tab;
});
},"dijit/MenuSeparator":function(){
require({cache:{"url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>"}});
define("dijit/MenuSeparator",["dojo/_base/declare","dojo/dom","./_WidgetBase","./_TemplatedMixin","./_Contained","dojo/text!./templates/MenuSeparator.html"],function(_a6c,dom,_a6d,_a6e,_a6f,_a70){
return _a6c("dijit.MenuSeparator",[_a6d,_a6e,_a6f],{templateString:_a70,buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.domNode,false);
},isFocusable:function(){
return false;
}});
});
},"url:idx/oneui/templates/MenuHeading.html":"<tr class=\"dijitReset dijitMenuItem oneuiMenuHeading\" role=\"presentation\" tabindex=\"-1\">\r\n\t<td class=\"dijitReset dijitMenuItemLabel oneuiMenuHeadingLabel\" colspan=\"4\" data-dojo-attach-point=\"containerNode\"></td>\r\n</tr>","cm/_base/_dom":function(){
define("cm/_base/_dom",[],function(){
var cm=dojo.global.cm||{};
dojo.global.cm=cm;
dojo.mixin(cm,{nextSibling:function(node,_a71){
return cm._findSibling(node,_a71,true);
},prevSibling:function(node,_a72){
return cm._findSibling(node,_a72,false);
},getInput:function(name,_a73){
if(!dojo.isString(name)){
return name;
}
var _a74=dojo.query("input[name='"+name+"'],select[name='"+name+"']");
return _a73?(_a74.length>0?_a74:null):(_a74.length>0?_a74[0]:null);
},getParentByClass:function(node,_a75){
node=node.parentNode;
while(node){
if(dojo.hasClass(node,_a75)){
return node;
}
node=node.parentNode;
}
return null;
},getParentByType:function(node,type){
node=node.parentNode;
type=type.toLowerCase();
var _a76="html";
while(node){
if(node.tagName.toLowerCase()==_a76){
break;
}
if(node.tagName.toLowerCase()==type){
return node;
}
node=node.parentNode;
}
return null;
},replaceClass:function(node,_a77,_a78){
dojo.removeClass(node,_a78);
dojo.addClass(node,_a77);
},setClass:function(node,_a79){
node=dojo.byId(node);
var cs=new String(_a79);
try{
if(typeof node.className=="string"){
node.className=cs;
}else{
if(node.setAttribute){
node.setAttribute("class",_a79);
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
},_findSibling:function(node,_a7a,_a7b){
if(!node){
return null;
}
if(_a7a){
_a7a=_a7a.toLowerCase();
}
var _a7c=_a7b?"nextSibling":"previousSibling";
do{
node=node[_a7c];
}while(node&&node.nodeType!=1);
if(node&&_a7a&&_a7a!=node.tagName.toLowerCase()){
return cm[_a7b?"nextSibling":"prevSibling"](node,_a7a);
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
},endsWith:function(str,end,_a7d){
if(_a7d){
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
},"dijit/_base/focus":function(){
define("dijit/_base/focus",["dojo/_base/array","dojo/dom","dojo/_base/lang","dojo/topic","dojo/_base/window","../focus",".."],function(_a7e,dom,lang,_a7f,win,_a80,_a81){
lang.mixin(_a81,{_curFocus:null,_prevFocus:null,isCollapsed:function(){
return _a81.getBookmark().isCollapsed;
},getBookmark:function(){
var bm,rg,tg,sel=win.doc.selection,cf=_a80.curNode;
if(win.global.getSelection){
sel=win.global.getSelection();
if(sel){
if(sel.isCollapsed){
tg=cf?cf.tagName:"";
if(tg){
tg=tg.toLowerCase();
if(tg=="textarea"||(tg=="input"&&(!cf.type||cf.type.toLowerCase()=="text"))){
sel={start:cf.selectionStart,end:cf.selectionEnd,node:cf,pRange:true};
return {isCollapsed:(sel.end<=sel.start),mark:sel};
}
}
bm={isCollapsed:true};
if(sel.rangeCount){
bm.mark=sel.getRangeAt(0).cloneRange();
}
}else{
rg=sel.getRangeAt(0);
bm={isCollapsed:false,mark:rg.cloneRange()};
}
}
}else{
if(sel){
tg=cf?cf.tagName:"";
tg=tg.toLowerCase();
if(cf&&tg&&(tg=="button"||tg=="textarea"||tg=="input")){
if(sel.type&&sel.type.toLowerCase()=="none"){
return {isCollapsed:true,mark:null};
}else{
rg=sel.createRange();
return {isCollapsed:rg.text&&rg.text.length?false:true,mark:{range:rg,pRange:true}};
}
}
bm={};
try{
rg=sel.createRange();
bm.isCollapsed=!(sel.type=="Text"?rg.htmlText.length:rg.length);
}
catch(e){
bm.isCollapsed=true;
return bm;
}
if(sel.type.toUpperCase()=="CONTROL"){
if(rg.length){
bm.mark=[];
var i=0,len=rg.length;
while(i<len){
bm.mark.push(rg.item(i++));
}
}else{
bm.isCollapsed=true;
bm.mark=null;
}
}else{
bm.mark=rg.getBookmark();
}
}else{
console.warn("No idea how to store the current selection for this browser!");
}
}
return bm;
},moveToBookmark:function(_a82){
var _a83=win.doc,mark=_a82.mark;
if(mark){
if(win.global.getSelection){
var sel=win.global.getSelection();
if(sel&&sel.removeAllRanges){
if(mark.pRange){
var n=mark.node;
n.selectionStart=mark.start;
n.selectionEnd=mark.end;
}else{
sel.removeAllRanges();
sel.addRange(mark);
}
}else{
console.warn("No idea how to restore selection for this browser!");
}
}else{
if(_a83.selection&&mark){
var rg;
if(mark.pRange){
rg=mark.range;
}else{
if(lang.isArray(mark)){
rg=_a83.body.createControlRange();
_a7e.forEach(mark,function(n){
rg.addElement(n);
});
}else{
rg=_a83.body.createTextRange();
rg.moveToBookmark(mark);
}
}
rg.select();
}
}
}
},getFocus:function(menu,_a84){
var node=!_a80.curNode||(menu&&dom.isDescendant(_a80.curNode,menu.domNode))?_a81._prevFocus:_a80.curNode;
return {node:node,bookmark:node&&(node==_a80.curNode)&&win.withGlobal(_a84||win.global,_a81.getBookmark),openedForWindow:_a84};
},_activeStack:[],registerIframe:function(_a85){
return _a80.registerIframe(_a85);
},unregisterIframe:function(_a86){
_a86&&_a86.remove();
},registerWin:function(_a87,_a88){
return _a80.registerWin(_a87,_a88);
},unregisterWin:function(_a89){
_a89&&_a89.remove();
}});
_a80.focus=function(_a8a){
if(!_a8a){
return;
}
var node="node" in _a8a?_a8a.node:_a8a,_a8b=_a8a.bookmark,_a8c=_a8a.openedForWindow,_a8d=_a8b?_a8b.isCollapsed:false;
if(node){
var _a8e=(node.tagName.toLowerCase()=="iframe")?node.contentWindow:node;
if(_a8e&&_a8e.focus){
try{
_a8e.focus();
}
catch(e){
}
}
_a80._onFocusNode(node);
}
if(_a8b&&win.withGlobal(_a8c||win.global,_a81.isCollapsed)&&!_a8d){
if(_a8c){
_a8c.focus();
}
try{
win.withGlobal(_a8c||win.global,_a81.moveToBookmark,null,[_a8b]);
}
catch(e2){
}
}
};
_a80.watch("curNode",function(name,_a8f,_a90){
_a81._curFocus=_a90;
_a81._prevFocus=_a8f;
if(_a90){
_a7f.publish("focusNode",_a90);
}
});
_a80.watch("activeStack",function(name,_a91,_a92){
_a81._activeStack=_a92;
});
_a80.on("widget-blur",function(_a93,by){
_a7f.publish("widgetBlur",_a93,by);
});
_a80.on("widget-focus",function(_a94,by){
_a7f.publish("widgetFocus",_a94,by);
});
return _a81;
});
},"curam/util/ScreenContext":function(){
define("curam/util/ScreenContext",[],function(){
var _a95={DEFAULT_CONTEXT:112,SAMPLE22:2,SAMPLE21:1,SAMPLE13:4,SAMPLE12:2,SAMPLE11:1,EXTAPP:1048576,CONTEXT_PORTLET:524288,SMART_PANEL:262144,NESTED_UIM:131072,ORG_TREE:65536,CONTEXT_PANEL:32768,LIST_ROW_INLINE_PAGE:8192,LIST_EVEN_ROW:16384,TAB:4096,TREE:2048,AGENDA:1024,POPUP:512,MODAL:256,HOME:128,HEADER:64,NAVIGATOR:32,FOOTER:16,OVAL:8,RESOLVE:4,ACTION:2,ERROR:1,EMPTY:0};
var _a96=[["ERROR","ACTION","RESOLVE","OPT_VALIDATION","FOOTER","NAVIGATOR","HEADER","HOME_PAGE","MODAL","POPUP","AGENDA","TREE","TAB","LIST_EVEN_ROW","LIST_ROW_INLINE_PAGE","CONTEXT_PANEL","ORG_TREE","NESTED_UIM","SMART_PANEL","CONTEXT_PORTLET","EXTAPP"],["SAMPLE11","SAMPLE12","SAMPLE13"],["SAMPLE21","SAMPLE22"]];
var _a97=dojo.declare("curam.util.ScreenContext",null,{constructor:function(_a98){
if(_a98){
this.setContext(_a98);
}else{
this.currentContext=[_a95["DEFAULT_CONTEXT"]|_a95["DEFAULT_CONTEXT"]];
}
},setContext:function(_a99){
var tmp=this.setup(_a99);
this.currentContext=((tmp==null)?([_a95["DEFAULT_CONTEXT"]|_a95["DEFAULT_CONTEXT"]]):(tmp));
},addContextBits:function(_a9a,idx){
if(!_a9a){
return;
}
var _a9b=(idx)?idx:0;
var _a9c=this.parseContext(_a9a);
if(_a9c!=null){
this.currentContext[_a9b]|=_a9c;
}
return this.currentContext[_a9b];
},addAll:function(idx){
var _a9d=(idx)?idx:0;
this.currentContext[_a9d]=4294967295;
return this.currentContext[_a9d];
},clear:function(_a9e,idx){
if(!_a9e){
this.clearAll();
return;
}
var _a9f=(idx)?idx:0;
if(_a9e==0){
return this.currentContext[_a9f];
}
var _aa0=this.parseContext(_a9e);
if(_aa0!=null){
var _aa1=this.currentContext[_a9f]&_aa0;
this.currentContext[_a9f]^=_aa1;
}
return this.currentContext[_a9f];
},clearAll:function(idx){
if(idx){
this.currentContext[idx]=0;
}else{
for(var i=0;i<this.currentContext.length;i++){
this.currentContext[i]=0;
}
}
},updateStates:function(_aa2){
this.clear("ERROR|ACTION|RESOLVE");
this.currentContext[0]=this.currentContext[0]|(_aa2&7);
},hasContextBits:function(_aa3,idx){
if(!_aa3){
return false;
}
var _aa4=(idx)?idx:0;
var _aa5=this.parseContext(_aa3);
if(_aa5!=null){
var _aa6=this.currentContext[_aa4]&_aa5;
return (_aa6==_aa5);
}
return false;
},getValue:function(){
var _aa7="";
for(var i=0;i<this.currentContext.length;i++){
_aa7+=this.currentContext[i]+"|";
}
return _aa7.substring(0,_aa7.length-1);
},toRequestString:function(){
return "o3ctx="+this.getValue();
},toBinary:function(){
var _aa8="";
for(var i=0;i<this.currentContext.length;i++){
_aa8+=this.currentContext[i].toString(2)+"|";
}
return _aa8.substring(0,_aa8.length-1);
},toString:function(){
var _aa9="";
for(var i=0;i<this.currentContext.length;i++){
var _aaa="";
var j=0;
while(j<_a96[i].length){
if(((this.currentContext[i]>>j)&1)!=0){
_aaa+=","+_a96[i][j];
}
j++;
}
if(_aaa==""){
return "{}";
}
_aa9+="|"+_aaa.replace(",","{")+((_aaa.length==0)?"":"}");
}
return _aa9.substring(1);
},parseContext:function(_aab){
var _aac=_aab.replace(/,/g,"|");
var _aad=_aac.split("|");
var tmp=isNaN(_aad[0])?parseInt(_a95[_aad[0]]):_aad[0];
for(var i=1;i<_aad.length;i++){
tmp=tmp|(isNaN(_aad[i])?parseInt(_a95[_aad[i]]):_aad[i]);
}
return (isNaN(tmp)?null:tmp);
},setup:function(_aae){
if(!_aae){
return null;
}
var _aaf=(""+_aae).split("|");
var _ab0=new Array(_aaf.length);
for(var i=0;i<_aaf.length;i++){
_ab0[i]=this.parseContext(_aaf[_aaf.length-i-1]);
_ab0[i]=_ab0[i]|_ab0[i];
if(!_ab0[i]||isNaN(_ab0[i])||_ab0[i]>4294967295){
return null;
}
}
return _ab0;
}});
return _a97;
});
},"dijit/a11y":function(){
define("dijit/a11y",["dojo/_base/array","dojo/_base/config","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-style","dojo/_base/sniff","./_base/manager","."],function(_ab1,_ab2,_ab3,dom,_ab4,_ab5,has,_ab6,_ab7){
var _ab8=(_ab7._isElementShown=function(elem){
var s=_ab5.get(elem);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(_ab4.get(elem,"type")!="hidden");
});
_ab7.hasDefaultTabStop=function(elem){
switch(elem.nodeName.toLowerCase()){
case "a":
return _ab4.has(elem,"href");
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
var _ab9=elem.contentDocument;
if("designMode" in _ab9&&_ab9.designMode=="on"){
return true;
}
body=_ab9.body;
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
var _aba=(_ab7.isTabNavigable=function(elem){
if(_ab4.get(elem,"disabled")){
return false;
}else{
if(_ab4.has(elem,"tabIndex")){
return _ab4.get(elem,"tabIndex")>=0;
}else{
return _ab7.hasDefaultTabStop(elem);
}
}
});
_ab7._getTabNavigable=function(root){
var _abb,last,_abc,_abd,_abe,_abf,_ac0={};
function _ac1(node){
return node&&node.tagName.toLowerCase()=="input"&&node.type&&node.type.toLowerCase()=="radio"&&node.name&&node.name.toLowerCase();
};
var _ac2=function(_ac3){
for(var _ac4=_ac3.firstChild;_ac4;_ac4=_ac4.nextSibling){
if(_ac4.nodeType!=1||(has("ie")<=9&&_ac4.scopeName!=="HTML")||!_ab8(_ac4)){
continue;
}
if(_aba(_ac4)){
var _ac5=_ab4.get(_ac4,"tabIndex");
if(!_ab4.has(_ac4,"tabIndex")||_ac5==0){
if(!_abb){
_abb=_ac4;
}
last=_ac4;
}else{
if(_ac5>0){
if(!_abc||_ac5<_abd){
_abd=_ac5;
_abc=_ac4;
}
if(!_abe||_ac5>=_abf){
_abf=_ac5;
_abe=_ac4;
}
}
}
var rn=_ac1(_ac4);
if(_ab4.get(_ac4,"checked")&&rn){
_ac0[rn]=_ac4;
}
}
if(_ac4.nodeName.toUpperCase()!="SELECT"){
_ac2(_ac4);
}
}
};
if(_ab8(root)){
_ac2(root);
}
function rs(node){
return _ac0[_ac1(node)]||node;
};
return {first:rs(_abb),last:rs(last),lowest:rs(_abc),highest:rs(_abe)};
};
_ab7.getFirstInTabbingOrder=function(root){
var _ac6=_ab7._getTabNavigable(dom.byId(root));
return _ac6.lowest?_ac6.lowest:_ac6.first;
};
_ab7.getLastInTabbingOrder=function(root){
var _ac7=_ab7._getTabNavigable(dom.byId(root));
return _ac7.last?_ac7.last:_ac7.highest;
};
return {hasDefaultTabStop:_ab7.hasDefaultTabStop,isTabNavigable:_ab7.isTabNavigable,_getTabNavigable:_ab7._getTabNavigable,getFirstInTabbingOrder:_ab7.getFirstInTabbingOrder,getLastInTabbingOrder:_ab7.getLastInTabbingOrder};
});
},"dijit/form/_ToggleButtonMixin":function(){
define("dijit/form/_ToggleButtonMixin",["dojo/_base/declare","dojo/dom-attr"],function(_ac8,_ac9){
return _ac8("dijit.form._ToggleButtonMixin",null,{checked:false,_aria_attr:"aria-pressed",_onClick:function(evt){
var _aca=this.checked;
this._set("checked",!_aca);
var ret=this.inherited(arguments);
this.set("checked",ret?this.checked:_aca);
return ret;
},_setCheckedAttr:function(_acb,_acc){
this._set("checked",_acb);
_ac9.set(this.focusNode||this.domNode,"checked",_acb);
(this.focusNode||this.domNode).setAttribute(this._aria_attr,_acb?"true":"false");
this._handleOnChange(_acb,_acc);
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
}});
});
},"dijit/_Widget":function(){
define("dijit/_Widget",["dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/ready","./registry","./_WidgetBase","./_OnDijitClickMixin","./_FocusMixin","dojo/uacss","./hccss"],function(_acd,_ace,_acf,_ad0,_ad1,lang,_ad2,_ad3,_ad4,_ad5,_ad6,_ad7){
function _ad8(){
};
function _ad9(_ada){
return function(obj,_adb,_adc,_add){
if(obj&&typeof _adb=="string"&&obj[_adb]==_ad8){
return obj.on(_adb.substring(2).toLowerCase(),lang.hitch(_adc,_add));
}
return _ada.apply(_acf,arguments);
};
};
_acd.around(_acf,"connect",_ad9);
if(_ad1.connect){
_acd.around(_ad1,"connect",_ad9);
}
var _ade=_ad0("dijit._Widget",[_ad5,_ad6,_ad7],{onClick:_ad8,onDblClick:_ad8,onKeyDown:_ad8,onKeyPress:_ad8,onKeyUp:_ad8,onMouseDown:_ad8,onMouseMove:_ad8,onMouseOut:_ad8,onMouseOver:_ad8,onMouseLeave:_ad8,onMouseEnter:_ad8,onMouseUp:_ad8,constructor:function(_adf){
this._toConnect={};
for(var name in _adf){
if(this[name]===_ad8){
this._toConnect[name.replace(/^on/,"").toLowerCase()]=_adf[name];
delete _adf[name];
}
}
},postCreate:function(){
this.inherited(arguments);
for(var name in this._toConnect){
this.on(name,this._toConnect[name]);
}
delete this._toConnect;
},on:function(type,func){
if(this[this._onMap(type)]===_ad8){
return _acf.connect(this.domNode,type.toLowerCase(),this,func);
}
return this.inherited(arguments);
},_setFocusedAttr:function(val){
this._focused=val;
this._set("focused",val);
},setAttribute:function(attr,_ae0){
_ad1.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(attr,_ae0);
},attr:function(name,_ae1){
if(_ace.isDebug){
var _ae2=arguments.callee._ach||(arguments.callee._ach={}),_ae3=(arguments.callee.caller||"unknown caller").toString();
if(!_ae2[_ae3]){
_ad1.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+_ae3,"","2.0");
_ae2[_ae3]=true;
}
}
var args=arguments.length;
if(args>=2||typeof name==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(name);
}
},getDescendants:function(){
_ad1.deprecated(this.declaredClass+"::getDescendants() is deprecated. Use getChildren() instead.","","2.0");
return this.containerNode?_ad2("[widgetId]",this.containerNode).map(_ad4.byNode):[];
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
if(!_ad1.isAsync){
_ad3(0,function(){
var _ae4=["dijit/_base"];
require(_ae4);
});
}
return _ade;
});
},"dojo/touch":function(){
define("dojo/touch",["./_base/kernel","./on","./has","./mouse"],function(dojo,on,has,_ae5){
function _ae6(type){
return function(node,_ae7){
return on(node,type,_ae7);
};
};
var _ae8=has("touch");
dojo.touch={press:_ae6(_ae8?"touchstart":"mousedown"),move:_ae6(_ae8?"touchmove":"mousemove"),release:_ae6(_ae8?"touchend":"mouseup"),cancel:_ae8?_ae6("touchcancel"):_ae5.leave};
return dojo.touch;
});
},"dojo/fx":function(){
define("dojo/fx",["./_base/lang","./Evented","./_base/kernel","./_base/array","./_base/connect","./_base/fx","./dom","./dom-style","./dom-geometry","./ready","require"],function(lang,_ae9,dojo,_aea,_aeb,_aec,dom,_aed,geom,_aee,_aef){
if(!dojo.isAsync){
_aee(0,function(){
var _af0=["./fx/Toggler"];
_aef(_af0);
});
}
var _af1=dojo.fx={};
var _af2={_fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,args||[]);
}
return this;
}};
var _af3=function(_af4){
this._index=-1;
this._animations=_af4||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
_aea.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
_af3.prototype=new _ae9();
lang.extend(_af3,{_onAnimate:function(){
this._fire("onAnimate",arguments);
},_onEnd:function(){
_aeb.disconnect(this._onAnimateCtx);
_aeb.disconnect(this._onEndCtx);
this._onAnimateCtx=this._onEndCtx=null;
if(this._index+1==this._animations.length){
this._fire("onEnd");
}else{
this._current=this._animations[++this._index];
this._onAnimateCtx=_aeb.connect(this._current,"onAnimate",this,"_onAnimate");
this._onEndCtx=_aeb.connect(this._current,"onEnd",this,"_onEnd");
this._current.play(0,true);
}
},play:function(_af5,_af6){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_af6&&this._current.status()=="playing"){
return this;
}
var _af7=_aeb.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_af8=_aeb.connect(this._current,"onBegin",this,function(arg){
this._fire("onBegin",arguments);
}),_af9=_aeb.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
_aeb.disconnect(_af7);
_aeb.disconnect(_af8);
_aeb.disconnect(_af9);
});
if(this._onAnimateCtx){
_aeb.disconnect(this._onAnimateCtx);
}
this._onAnimateCtx=_aeb.connect(this._current,"onAnimate",this,"_onAnimate");
if(this._onEndCtx){
_aeb.disconnect(this._onEndCtx);
}
this._onEndCtx=_aeb.connect(this._current,"onEnd",this,"_onEnd");
this._current.play.apply(this._current,arguments);
return this;
},pause:function(){
if(this._current){
var e=_aeb.connect(this._current,"onPause",this,function(arg){
this._fire("onPause",arguments);
_aeb.disconnect(e);
});
this._current.pause();
}
return this;
},gotoPercent:function(_afa,_afb){
this.pause();
var _afc=this.duration*_afa;
this._current=null;
_aea.some(this._animations,function(a){
if(a.duration<=_afc){
this._current=a;
return true;
}
_afc-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_afc/this._current.duration,_afb);
}
return this;
},stop:function(_afd){
if(this._current){
if(_afd){
for(;this._index+1<this._animations.length;++this._index){
this._animations[this._index].stop(true);
}
this._current=this._animations[this._index];
}
var e=_aeb.connect(this._current,"onStop",this,function(arg){
this._fire("onStop",arguments);
_aeb.disconnect(e);
});
this._current.stop();
}
return this;
},status:function(){
return this._current?this._current.status():"stopped";
},destroy:function(){
if(this._onAnimateCtx){
_aeb.disconnect(this._onAnimateCtx);
}
if(this._onEndCtx){
_aeb.disconnect(this._onEndCtx);
}
}});
lang.extend(_af3,_af2);
_af1.chain=function(_afe){
return new _af3(_afe);
};
var _aff=function(_b00){
this._animations=_b00||[];
this._connects=[];
this._finished=0;
this.duration=0;
_aea.forEach(_b00,function(a){
var _b01=a.duration;
if(a.delay){
_b01+=a.delay;
}
if(this.duration<_b01){
this.duration=_b01;
}
this._connects.push(_aeb.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new _aec.Animation({curve:[0,1],duration:this.duration});
var self=this;
_aea.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop","onEnd"],function(evt){
self._connects.push(_aeb.connect(self._pseudoAnimation,evt,function(){
self._fire(evt,arguments);
}));
});
};
lang.extend(_aff,{_doAction:function(_b02,args){
_aea.forEach(this._animations,function(a){
a[_b02].apply(a,args);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_b03,args){
var t=this._pseudoAnimation;
t[_b03].apply(t,args);
},play:function(_b04,_b05){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_b06,_b07){
var ms=this.duration*_b06;
_aea.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_b07);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_b08){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
_aea.forEach(this._connects,_aeb.disconnect);
}});
lang.extend(_aff,_af2);
_af1.combine=function(_b09){
return new _aff(_b09);
};
_af1.wipeIn=function(args){
var node=args.node=dom.byId(args.node),s=node.style,o;
var anim=_aec.animateProperty(lang.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _b0a=_aed.get(node,"height");
return Math.max(_b0a,1);
}
},end:function(){
return node.scrollHeight;
}}}},args));
var fini=function(){
s.height="auto";
s.overflow=o;
};
_aeb.connect(anim,"onStop",fini);
_aeb.connect(anim,"onEnd",fini);
return anim;
};
_af1.wipeOut=function(args){
var node=args.node=dom.byId(args.node),s=node.style,o;
var anim=_aec.animateProperty(lang.mixin({properties:{height:{end:1}}},args));
_aeb.connect(anim,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
var fini=function(){
s.overflow=o;
s.height="auto";
s.display="none";
};
_aeb.connect(anim,"onStop",fini);
_aeb.connect(anim,"onEnd",fini);
return anim;
};
_af1.slideTo=function(args){
var node=args.node=dom.byId(args.node),top=null,left=null;
var init=(function(n){
return function(){
var cs=_aed.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
left=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=geom.position(n,true);
top=ret.y;
left=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=left+"px";
}
};
})(node);
init();
var anim=_aec.animateProperty(lang.mixin({properties:{top:args.top||0,left:args.left||0}},args));
_aeb.connect(anim,"beforeBegin",anim,init);
return anim;
};
return _af1;
});
},"curam/util/cache/CacheLRU":function(){
define("curam/util/cache/CacheLRU",["dojo/_base/declare","dojox/collections/Dictionary"],function(_b0b,_b0c){
var _b0d=_b0b("curam/util/cache/CacheItem",null,{constPriority:{Low:10,Normal:20,High:30},constructor:function(keys,_b0e,_b0f){
if(keys==null){
throw new Error("Cache key cannot be null ");
}
this.key=keys;
this.value=_b0e;
if(_b0f==null){
_b0f={};
}
if(_b0f.priority==null){
_b0f.priority=this.constPriority.Normal;
}
this.options=_b0f;
this.lastAccessed=new Date().getTime();
},destroy:function(){
try{
this.inherited(arguments);
}
catch(err){
console.error(err);
}
}});
return _b0b("curam/util/cache/CacheLRU",null,{maxSize:20,activePurgeFrequency:null,_dataColection:null,_tippingPoint:null,_purgePoint:null,_purgingNow:false,constPriority:{Low:10,Normal:20,High:30},constructor:function(_b10){
try{
dojo.mixin(this,_b10);
this._dataColection=new dojox.collections.Dictionary();
if(this.maxSize==null){
this.maxSize=-1;
}
if(this.activePurgeFrequency==null){
this.activePurgeFrequency=-1;
}
this._tippingPoint=0.75;
this._purgePoint=Math.round(this.maxSize*this._tippingPoint);
this._purgingNow=false;
if(this.activePurgeFrequency>0){
this._timerPurge();
}
}
catch(e){
console.error("There has been an issue with cache LRU\"");
console.error(e);
}
},addItem:function(key,data,_b11){
if(this.maxSize<1){
return;
}
if(this._dataColection.contains(key)==true){
this._removeItem(key);
}
var _b12=new _b0d(key,data,_b11);
this._dataColection.add(_b12.key,_b12);
if((this.maxSize>0)&&(this._dataColection.count>this.maxSize)){
this._purge();
}
},getItem:function(key){
var item=this._dataColection.item(key);
if(item!=null){
if(!this._isExpired(item)){
item.lastAccessed=new Date().getTime();
}else{
this._removeItem(key);
item=null;
}
}
var _b13=null;
if(item!=null){
_b13=item.value;
}
return _b13;
},clear:function(){
this._dataColection.forEach(function(data,_b14,_b15){
var tmp=data.value;
this._removeItem(tmp.key);
},this);
},_purge:function(){
console.debug("purging cache");
this._purgingNow=true;
var _b16=new Array();
this._dataColection.forEach(function(data,_b17,_b18){
var tmp=data.value;
if(this._isExpired(tmp)){
this._removeItem(tmp.key);
}else{
_b16.push(tmp);
}
},this);
if(_b16.length>this._purgePoint){
_b16=_b16.sort(function(a,b){
if(a.options.priority!=b.options.priority){
return b.options.priority-a.options.priority;
}else{
return b.lastAccessed-a.lastAccessed;
}
});
while(_b16.length>this._purgePoint){
var temp=_b16.pop();
this._removeItem(temp.key);
}
}
this._purgingNow=false;
},_removeItem:function(key){
var item=this._dataColection.item(key);
this._dataColection.remove(key);
if(item.options.callback!=null){
var _b19=dojo.hitch(this,function(){
item.options.callback(item.key,item.value);
});
setTimeout(_b19,0);
}
},_isExpired:function(item){
var now=new Date().getTime();
var _b1a=false;
if((item.options.expirationAbsolute)&&(item.options.expirationAbsolute<now)){
_b1a=true;
}
if((_b1a==false)&&(item.options.expirationSliding)){
var _b1b=item.lastAccessed+(item.options.expirationSliding*1000);
if(_b1b<now){
_b1a=true;
}
}
return _b1a;
},_timerPurge:function(){
if(this._dataColection.count>0){
this._purge();
}
this._timerID=setTimeout(dojo.hitch(this,function(){
this._timerPurgeSecond();
}),this.activePurgeFrequency);
},_timerPurgeSecond:function(){
if(this._dataColection.count>0){
this._purge();
}
this._timerID=setTimeout(dojo.hitch(this,function(){
this._timerPurge();
}),this.activePurgeFrequency);
},generateCacheOptions:function(_b1c,_b1d,_b1e){
var _b1f=new Object();
if(_b1c){
_b1f.expirationSliding=_b1c;
}
if(_b1d){
_b1f.expirationAbsolute=_b1d;
}
if(_b1e){
_b1f.priority=_b1e;
}
return _b1f;
},destroy:function(){
try{
this.clear();
delete this._dataColection;
this.inherited(arguments);
}
catch(err){
console.error(err);
}
}});
});
},"url:idx/oneui/templates/MenuDialog.html":"<div role=\"presentation\">\r\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\r\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" data-dojo-attach-point=\"containerNode\" role=\"dialog\" tabIndex=\"-1\"></div>\r\n\t</div>\r\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\" data-dojo-attach-point=\"connectorNode\"></div>\r\n</div>\r\n","dijit/_DialogMixin":function(){
define("dijit/_DialogMixin",["dojo/_base/declare","./a11y"],function(_b20,a11y){
return _b20("dijit._DialogMixin",null,{execute:function(){
},onCancel:function(){
},onExecute:function(){
},_onSubmit:function(){
this.onExecute();
this.execute(this.get("value"));
},_getFocusItems:function(){
var _b21=a11y._getTabNavigable(this.containerNode);
this._firstFocusItem=_b21.lowest||_b21.first||this.closeButtonNode||this.domNode;
this._lastFocusItem=_b21.last||_b21.highest||this._firstFocusItem;
}});
});
},"curam/util/ui/AppExitConfirmation":function(){
define("curam/util/ui/AppExitConfirmation",["curam/define","dojo/_base/array","curam/util/ui/AppExitConditionHandler"],function(cdef,_b22){
cdef.singleton("curam.util.ui.AppExitConfirmation",{_exitConditionHandlers:[],_lastClickedToken:null,_lastClicked:null,_confirmationHandler:function(){
var mesg=" ";
e.returnValue=mesg;
return mesg;
},install:function(){
curam.util.ui.AppExitConfirmation._lastClickedToken=dojo.connect(dojo.global,"onclick",null,function(e){
e=e||window.event;
curam.util.ui.AppExitConfirmation._lastClicked=e.target;
});
curam.util.ui.AppExitConfirmation.registerExitConditionHandler(new curam.util.ui.AppExitConditionHandler(function(){
var _b23=curam.util.ui.AppExitConfirmation._lastClicked;
var _b24=_b23&&_b23.href&&_b23.href.substring(0,7)==="mailto:";
curam.util.ui.AppExitConfirmation._lastClicked=null;
return _b24?false:true;
}));
return dojo.connect(dojo.global,"onbeforeunload",null,function(e){
var _b25=curam.util.ui.AppExitConfirmation._exitConditionHandlers;
var _b26=_b22.every(_b25,function(eh){
return eh.isConfirmationAllowed();
});
if(_b26){
return curam.util.ui.AppExitConfirmation._confirmationHandler("Number of condition handlers consulted: "+_b25.length);
}
});
},_setTestHandler:function(_b27){
curam.util.ui.AppExitConfirmation._confirmationHandler=_b27;
},uninstall:function(_b28){
dojo.disconnect(_b28);
dojo.disconnect(curam.util.ui.AppExitConfirmation._lastClickedToken);
curam.util.ui.AppExitConfirmation._lastClicked=null;
curam.util.ui.AppExitConfirmation._exitConditionHandlers=[];
},registerExitConditionHandler:function(_b29){
curam.util.ui.AppExitConfirmation._exitConditionHandlers.push(_b29);
}});
return curam.util.ui.AppExitConfirmation;
});
},"dijit/form/_FormValueWidget":function(){
define("dijit/form/_FormValueWidget",["dojo/_base/declare","dojo/_base/sniff","./_FormWidget","./_FormValueMixin"],function(_b2a,has,_b2b,_b2c){
return _b2a("dijit.form._FormValueWidget",[_b2b,_b2c],{_layoutHackIE7:function(){
if(has("ie")==7){
var _b2d=this.domNode;
var _b2e=_b2d.parentNode;
var _b2f=_b2d.firstChild||_b2d;
var _b30=_b2f.style.filter;
var _b31=this;
while(_b2e&&_b2e.clientHeight==0){
(function ping(){
var _b32=_b31.connect(_b2e,"onscroll",function(){
_b31.disconnect(_b32);
_b2f.style.filter=(new Date()).getMilliseconds();
setTimeout(function(){
_b2f.style.filter=_b30;
},0);
});
})();
_b2e=_b2e.parentNode;
}
}
}});
});
},"url:idx/oneui/templates/HoverCard.html":"<div class=\"idxOneuiHoverCard idxOneuiHoverCardLeft\">\r\n\t<div role=\"document\"> <span data-dojo-attach-point=\"closeButtonNode, focusNode\" class=\"idxOneuiHoverCardCloseIcon\" data-dojo-attach-event=\"ondijitclick: hide\" role=\"button\" tabIndex=\"0\"></span></div>\r\n\t\r\n\t<div data-dojo-attach-point=\"bodyNode\" class=\"idxOneuiHoverCardBody\">\t\r\n\t\t<div class=\"idxOneuiHoverCardGrip\" data-dojo-attach-point=\"gripNode\"></div>\r\n\t\t<div class=\"idxOneuiHoverCardContainer\" role='alert' data-dojo-attach-point=\"containerNode\">\t\t\r\n\t\t</div>\r\n\t\t<div class=\"idxOneuiHoverCardFooter\">\r\n\t\t\t<div class=\"idxOneuiHoverCardActionIcons\" data-dojo-attach-point=\"actionIcons\"></div>\r\n\t\t\t<span aria-haspopup=\"true\" data-dojo-attach-point=\"moreActionsNode\"></span>\r\n\t\t</div>\r\n\t\t<div class=\"idxOneuiHoverCardFooterExpand\"></div>\r\n\t</div>\r\n\t<div class=\"idxOneuiHoverCardConnector\" data-dojo-attach-point=\"connectorNode\"></div>\r\n</div>\r\n\r\n\r\n","*now":function(r){
r(["dojo/i18n!*preload*dojo/nls/curam-ext-app*[\"ar\",\"ca\",\"cs\",\"da\",\"de\",\"el\",\"en-gb\",\"en-us\",\"es-es\",\"fi-fi\",\"fr-fr\",\"he-il\",\"hu\",\"it-it\",\"ja-jp\",\"ko-kr\",\"nl-nl\",\"nb\",\"pl\",\"pt-br\",\"pt-pt\",\"ru\",\"sk\",\"sl\",\"sv\",\"th\",\"tr\",\"zh-tw\",\"zh-cn\",\"ROOT\"]"]);
}}});
define("dojo/curam-ext-app",[],1);
