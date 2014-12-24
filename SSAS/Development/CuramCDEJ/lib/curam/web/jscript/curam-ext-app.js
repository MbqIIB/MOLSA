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
},"url:curam/app/templates/ExternalApplication.html":"<div class=\"app-container\">\r\n  <div class=\"app-container-bc\" \r\n    data-dojo-type=\"dijit/layout/BorderContainer\"\r\n    data-dojo-props=\"gutters:false\"\r\n    data-dojo-attach-point=\"_borderContainer\">\r\n    <div class=\"app-banner\"\r\n      data-dojo-type=\"dojox/layout/ContentPane\"\r\n      data-dojo-props=\"region: 'top'\"\r\n      data-dojo-attach-point=\"_appBanner\" role=\"banner\">\r\n    </div>\r\n    <div id=\"app-nav\"\r\n      data-dojo-type=\"curam/widget/menu/MenuPane\"\r\n      data-dojo-props=\"region: 'leading', startExpanded: false\"\r\n      data-dojo-attach-point=\"_appNav\"\r\n      class=\"leftNavMenu\">\r\n    </div>\r\n\t\t<div id=\"app-content\"\r\n\t\t\tdata-dojo-type=\"curam/widget/containers/TransitionContainer\"\r\n\t\t\tdata-dojo-attach-point=\"_appContentBody\" class=\"mainBody\"\r\n\t\t\tdata-dojo-props='region:\"center\", style : {padding : 0, border : 0}' role=\"main\">\r\n\t\t</div>\r\n  </div>\r\n</div>","dijit/_CssStateMixin":function(){
define("dijit/_CssStateMixin",["dojo/touch","dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/_base/lang","dojo/_base/window"],function(_2e,_2f,_30,_31,_32,win){
return _30("dijit._CssStateMixin",[],{cssStateNodes:{},hovering:false,active:false,_applyAttributes:function(){
this.inherited(arguments);
_2f.forEach(["onmouseenter","onmouseleave",_2e.press],function(e){
this.connect(this.domNode,e,"_cssMouseEvent");
},this);
_2f.forEach(["disabled","readOnly","checked","selected","focused","state","hovering","active"],function(_33){
this.watch(_33,_32.hitch(this,"_setStateClass"));
},this);
for(var ap in this.cssStateNodes){
this._trackMouseState(this[ap],this.cssStateNodes[ap]);
}
this._setStateClass();
},_cssMouseEvent:function(_34){
if(!this.disabled){
switch(_34.type){
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
var _35=this.connect(win.body(),_2e.release,function(){
this._mouseDown=false;
this._set("active",false);
this.disconnect(_35);
});
break;
}
}
},_setStateClass:function(){
var _36=this.baseClass.split(" ");
function _37(_38){
_36=_36.concat(_2f.map(_36,function(c){
return c+_38;
}),"dijit"+_38);
};
if(!this.isLeftToRight()){
_37("Rtl");
}
var _39=this.checked=="mixed"?"Mixed":(this.checked?"Checked":"");
if(this.checked){
_37(_39);
}
if(this.state){
_37(this.state);
}
if(this.selected){
_37("Selected");
}
if(this.disabled){
_37("Disabled");
}else{
if(this.readOnly){
_37("ReadOnly");
}else{
if(this.active){
_37("Active");
}else{
if(this.hovering){
_37("Hover");
}
}
}
}
if(this.focused){
_37("Focused");
}
var tn=this.stateNode||this.domNode,_3a={};
_2f.forEach(tn.className.split(" "),function(c){
_3a[c]=true;
});
if("_stateClasses" in this){
_2f.forEach(this._stateClasses,function(c){
delete _3a[c];
});
}
_2f.forEach(_36,function(c){
_3a[c]=true;
});
var _3b=[];
for(var c in _3a){
_3b.push(c);
}
var cls=_3b.join(" ");
if(cls!=tn.className){
tn.className=cls;
}
this._stateClasses=_36;
},_trackMouseState:function(_3c,_3d){
var _3e=false,_3f=false,_40=false;
var _41=this,cn=_32.hitch(this,"connect",_3c);
function _42(){
var _43=("disabled" in _41&&_41.disabled)||("readonly" in _41&&_41.readonly);
_31.toggle(_3c,_3d+"Hover",_3e&&!_3f&&!_43);
_31.toggle(_3c,_3d+"Active",_3f&&!_43);
_31.toggle(_3c,_3d+"Focused",_40&&!_43);
};
cn("onmouseenter",function(){
_3e=true;
_42();
});
cn("onmouseleave",function(){
_3e=false;
_3f=false;
_42();
});
cn(_2e.press,function(){
_3f=true;
_42();
});
cn(_2e.release,function(){
_3f=false;
_42();
});
cn("onfocus",function(){
_40=true;
_42();
});
cn("onblur",function(){
_40=false;
_42();
});
this.watch("disabled",_42);
this.watch("readOnly",_42);
}});
});
},"curam/app/ExternalApplication":function(){
require({cache:{"url:curam/app/templates/ExternalApplication.html":"<div class=\"app-container\">\r\n  <div class=\"app-container-bc\" \r\n    data-dojo-type=\"dijit/layout/BorderContainer\"\r\n    data-dojo-props=\"gutters:false\"\r\n    data-dojo-attach-point=\"_borderContainer\">\r\n    <div class=\"app-banner\"\r\n      data-dojo-type=\"dojox/layout/ContentPane\"\r\n      data-dojo-props=\"region: 'top'\"\r\n      data-dojo-attach-point=\"_appBanner\" role=\"banner\">\r\n    </div>\r\n    <div id=\"app-nav\"\r\n      data-dojo-type=\"curam/widget/menu/MenuPane\"\r\n      data-dojo-props=\"region: 'leading', startExpanded: false\"\r\n      data-dojo-attach-point=\"_appNav\"\r\n      class=\"leftNavMenu\">\r\n    </div>\r\n\t\t<div id=\"app-content\"\r\n\t\t\tdata-dojo-type=\"curam/widget/containers/TransitionContainer\"\r\n\t\t\tdata-dojo-attach-point=\"_appContentBody\" class=\"mainBody\"\r\n\t\t\tdata-dojo-props='region:\"center\", style : {padding : 0, border : 0}' role=\"main\">\r\n\t\t</div>\r\n  </div>\r\n</div>"}});
define("curam/app/ExternalApplication",["dojo/_base/declare","dojo/_base/lang","dojo/_base/window","dojo/aspect","dojo/dom-attr","dojo/query","dojo/dom-geometry","dojo/dom","dijit/_Widget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/form/Button","dojo/text!./templates/ExternalApplication.html","curam/util/UIMFragment","dojo/dom-class","dojo/dom-style","curam/ui/ClientDataAccessor","curam/widget/containers/TransitionContainer","dojo/on","curam/widget/menu/MenuPane","dijit/CheckedMenuItem","dojo/fx","dijit/focus","idx/oneui/MenuBar","idx/oneui/Menu","idx/oneui/Header","idx/oneui/MenuDialog","idx/oneui/MenuHeading","idx/oneui/HoverHelpTooltip","dijit/PopupMenuBarItem","dijit/MenuItem","dijit/form/ComboButton","curam/widget/menu/BannerMenuItem","curam/util/ui/AppExitConfirmation"],function(_44,_45,win,_46,_47,_48,_49,dom,_4a,_4b,_4c,_4d,_4e,_4f,_50,_51,_52,_53,_54,_55,_56,_57,_58,fx,_59){
return _44("curam.app.ExternalApplication",[_4a,_4b,_4c],{started:false,templateString:_50,widgetsInTemplate:true,baseClass:"curamApp",_appConfig:null,_initializedNavBarID:null,guardAgainstLeaving:null,postMixInProperties:function(){
this.inherited(arguments);
},startup:function(){
this.inherited(arguments);
this._init();
this._setupUserLeavingGuard();
},_isNavBarItem:function(_5a){
return (this._appConfig.map[_5a]!=null);
},_init:function(){
var da=new _54();
da.getRaw("/config/tablayout/extapp["+curam.config.appID+"]",_45.hitch(this,function(_5b){
console.log("External App config data:"+_5b);
this._appConfig=_5b;
this._postDataLoadInit();
}),function(_5c,_5d){
console.log("External App config data load error:"+_5c);
},null);
_46.before(dijit.popup,"open",this._evenOutMenuRows,true);
_46.after(dijit.popup,"open",_45.hitch(this,"_animateMenuOpen"),true);
_46.after(dijit.popup,"close",_45.hitch(this,"_animateMenuClose"),true);
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
},_loadLandingPage:function(_5e){
if(curam.config.landingPage){
this._displayOnlyBodyContent({pageID:curam.config.landingPage});
}else{
throw "ERROR: Landing page not set correctly: "+curam.config.landingPage;
}
},_loadBanner:function(){
_51.get({url:"CDEJ/extapp/application-banner-fragment.jspx",targetID:this._appBanner.id,onLoad:_45.hitch(this,this._initializeBannerLandingPageLink)});
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
},_initializeBannerLandingPageLink:function(_5f){
var _60=_48(".idxHeaderPrimaryTitle",_5f.domNode)[0];
if(!_60){
throw "Landing Page link not initialized, title node cannot be found";
}
var _61=_45.hitch(this,"_loadLandingPage");
dojo.connect(_60,"onclick",function(){
_61();
});
},_animateMenuOpen:function(_62){
var _63=dojo.byId(_62.popup._popupWrapper.id);
if(_47.get(_63,"dijitpopupparent")!=="appMegaMenu"&!_52.contains(_63,"oneuiHeaderGlobalActionsMenu_help")){
return;
}
if(!_63.aniTable){
_63.aniTable=dojo.query("table",_63)[0];
}
if(!_63.inAnimation){
_63.inAnimation=false;
}
if(!_63.isShown){
_63.isShown=false;
}
if(_63.inAnimation){
if(dijit.byId("appHelpMenu")===_62.popup){
if(_62.popup.shouldNotClose){
_62.popup.shouldNotClose=false;
_62.popup.cancelClose=true;
return;
}
}
_63.fx&&_63.fx.stop();
_63.inAnimation=false;
_63.isShown=false;
_53.set(_63,"display","none");
}
if(!_63.isShown&&!_63.inAnimation){
dojo.style(_63,"display","none");
dojo.style(_63.aniTable,"opacity","0");
}
var _64=function(){
_63.inAnimation=true;
_63.isShown=false;
if(dijit.byId("appHelpMenu")===_62.popup){
_62.popup.shouldNotClose=_62.popup.shouldNotClose?false:true;
_62.popup.justClosed=false;
}
};
var _65=function(){
dojo.style(_63.aniTable,"opacity","1");
_63.inAnimation=false;
_63.isShown=true;
var _66=dojo.marginBox(_63).h;
var _67=dojo.window.getBox().h-65-20;
if(_67<_66){
_53.set(_63,"height",_67+"px");
_53.set(_63,"border-bottom","1px solid black");
}
};
this._animateMenu(_63,_63.aniTable,"open",_64,_65);
},_animateMenuClose:function(_68){
var _69=dojo.byId(_68._popupWrapper.id);
if(_47.get(_69,"dijitpopupparent")!=="appMegaMenu"&!_52.contains(_69,"oneuiHeaderGlobalActionsMenu_help")){
return;
}
if(dijit.byId("appHelpMenu")===_68){
if(_68.cancelClose){
_68.cancelClose=false;
return;
}else{
if(_68.justClosed){
_68.justClosed=false;
return;
}
}
}
if(!_69.aniTable){
_69.aniTable=dojo.query("table",_69)[0];
}
if(_69.inAnimation){
_69.fx&&_69.fx.stop();
_69.inAnimation=false;
_69.isShown=false;
dojo.style(_69.aniTable,"opacity","1");
}
_53.set(_69,"display","block");
var _6a=function(){
_69.inAnimation=true;
_69.isShown=true;
};
var _6b=function(){
_69.inAnimation=false;
_69.isShown=false;
_53.set(_69,"display","none");
_53.set(_69,"border-bottom","");
if(dijit.byId("appHelpMenu")===_68){
_68.shouldNotClose=false;
_68.justClosed=true;
}
};
this._animateMenu(_69,_69.aniTable,"close",_6a,_6b);
},_animateMenu:function(_6c,_6d,_6e,_6f,_70){
var _71=300;
var _72=[];
var _73=fx.wipeIn({node:_6c,duration:_71});
var _74=dojo.fadeIn({node:_6d,duration:_71});
var _75=fx.wipeOut({node:_6c,duration:_71});
var _76=dojo.fadeOut({node:_6d,duration:_71});
if(_6e==="open"){
_72.push(_73);
_72.push(_74);
}else{
_72.push(_76);
_72.push(_75);
}
_6c.fx=fx.chain(_72);
dojo.connect(_6c.fx,"onBegin",_6f);
dojo.connect(_6c.fx,"onEnd",_70);
_6c.fx.play();
},_evenOutMenuRows:function(_77){
var _78=dojo.byId(_77.popup.id);
var _79=_77.parent?_77.parent.id:_77.popup.id;
if(_79!=="appMegaMenu"&_79!=="appHelpMenu"){
return;
}
var _7a,_7b;
if(_79==="appMegaMenu"){
_7a="MMItemContainerRow";
_7b="MMItemContainer";
}else{
_7a="HMItemContainerRow";
_7b="HMItemContainer";
}
var _7c=dojo.query("div."+_7b,_78);
var _7d=_77.popup._popupWrapper?_77.popup._popupWrapper:_78;
_53.set(_7d,"display","block");
var _7e=_7c.length;
var _7f=_7e<6?1:Math.ceil(_7e/3);
var _80=[];
for(var i=0;i<_7f;i++){
_80[i]=0;
}
for(var _81=0;_81<_7f;_81++){
dojo.forEach(_7c,function(_82,_83){
_53.set(_82,"height","auto");
if(_81===0&&!_52.contains(_82,"iconSetOUI")){
var _84=_82;
while(!_52.contains(_84,"menuItemClassOUI")){
_84=_84.parentNode;
}
_84=dojo.query("td.dijitMenuItemIconCell",_84)[0];
if(_7f===1){
_53.set(_84,"width","50px");
}else{
_53.set(_84,"width","34px");
}
_52.add(_82,"iconSetOUI");
}
var _85=_53.get(_82,"height");
if(_52.contains(_82,_7a+_81)){
if(_85>_80[_81]){
_80[_81]=_85;
}
}
});
}
_53.set(_7d,"display","none");
for(var i=0;i<_7f;i++){
dojo.forEach(_7c,function(_86,_87){
if(_52.contains(_86,_7a+i)){
_53.set(_86,"height",_80[i]+"px");
}
});
}
},_handleBannerResize:function(_88){
var pos=dojo.position;
var box=dojo.marginBox;
CuramExternalApp._oneuiBanner=_88||CuramExternalApp._oneuiBanner;
currentBanner=CuramExternalApp._oneuiBanner;
var _89=dojo.query(".idxHeaderPrimaryTitleContainer",currentBanner._globalActionsNode)[0];
var _8a=currentBanner._helpNode?true:false;
var _8b=currentBanner.userNode?true:false;
var _8c=currentBanner.navigation?true:false;
var _8d=currentBanner.logoExists;
var _8e=currentBanner._settingsNode?true:false;
if(_8e){
if(_47.get(currentBanner._settingsNode,"title")){
_47.set(currentBanner._settingsNode,"title",CuramExternalApp._appConfig.printMenuLabel);
}
if(_47.get(currentBanner._settingsNode,"alt")){
_47.set(currentBanner._settingsNode,"alt",CuramExternalApp._appConfig.printMenuLabel);
}
}
var _8f=_8a?pos(currentBanner._helpNode).x:885;
var _90=_8f-box(_89).w;
if(_8b){
var _91=currentBanner.userNode;
var _92=currentBanner.userTextNode;
_53.set(_92,"width","");
var _93=box(_91).w;
var _94=box(_92).w;
}
if(_8c){
var _95=currentBanner.navigation.domNode;
var _96=dojo.query("span[id*=text]",_95)[0];
_53.set(_96,"width","");
var _97=box(_95).w;
var _98=box(_96).w;
}
if(_8e){
var _99=currentBanner._settingsNode;
var _9a=dojo.query("span[id*=text]",_99)[0];
var _9b=box(_99).w;
}
var _9c=_90;
_9c-=_8c?(_97-_98):0;
_9c-=_8b?(_93-_94):0;
_9c-=_8e?_9b:0;
var _9d=_9c;
_9d-=_8c?_98:0;
_9d-=_8b?_94:0;
_9d-=_8e?_9b:0;
if(_9d<0){
if(_8c&_8b){
var _9e=_9c/2;
var _9f;
if(_94<_9e){
_9f=_9c-_94;
_53.set(_96,"width",_9f+"px");
}else{
if(_98<_9e){
_9f=_9c-_98;
_53.set(_92,"width",_9f+"px");
}else{
_53.set(_92,"width",_9e+"px");
_53.set(_96,"width",_9e+"px");
}
}
}else{
if(_8c&_8e){
var _9e=_9c/2;
var _9f;
if(_9b<_9e){
_9f=_9c-_9b;
_53.set(_96,"width",_9f+"px");
}else{
if(_98<_9e){
_9f=_9c-_98;
_53.set(_99,"width",_9f+"px");
}else{
_53.set(_99,"width",_9e+"px");
_53.set(_96,"width",_9e+"px");
}
}
}else{
if(_8c){
_53.set(_96,"width",_9c+"px");
}else{
_53.set(_92,"width",_9c+"px");
}
}
}
}
if(_8c){
var _a0=0;
_a0+=_8d?box(dojo.query(".idxHeaderLogoBox",currentBanner._globalActionsNode)[0]).w:0;
_a0+=_8b?box(_91).w:0;
_a0+=_8a?box(currentBanner._helpNode).w:0;
_a0+=_8e?box(currentBanner._settingsNode).w:0;
_53.set(_95,"right",_a0+"px");
}
},_postDataLoadInit:function(){
this._appContentBody._doResourceLookUp=_45.hitch(this,this._doResourceLookUpForMainBody);
this._appNav._onSelectAfter=_45.hitch(this,function(_a1){
this._appContentBody.set("displayPanel",_a1);
});
this._makeNavBarAccessible();
this._loadBanner();
this._loadLandingPage();
},_initNavBar:function(_a2,_a3){
var _a4=this._appConfig.map[_a2];
if(typeof (_a4)=="undefined"||_a4==this._initializedNavBarID){
_a3();
return;
}
var da=new _54();
da.getRaw("/config/tablayout/extnav["+curam.config.appID+"]["+_a4+"]",_45.hitch(this,function(_a5){
console.log("External App config data:"+_a5);
this._loadMenuItems(_a5.navItems,_a5.navBarPixelWidth);
_a3();
this._initializedNavBarID=_a4;
}),function(_a6,_a7){
console.log("External App navigation config data load error:"+_a6);
},null);
},_makeNavBarAccessible:function(){
var _a8=dojo.query(".idxOneuiHoverCardCloseIcon")[0];
if(_a8){
_47.set(_a8,"tabindex",-1);
_47.set(_a8,"aria-label",this._appConfig.hoverCardCloseButtonLabel);
}
var _a9=dijit.byId("navOverflowButton");
_a9._setLabelAttr(this._appConfig.navOverflowButtonLabel);
},_loadMenuItems:function(_aa,_ab){
var _ac=[];
this._appNav.set("width",_ab);
for(var i=0;i<_aa.length;i++){
var _ad=_aa[i];
var _ae={id:_ad.pageID,label:_ad.title,selected:false,iconPath:_ad.iconPath,subPageIds:_ad.subPageIds,iconClass:"whoKnow"};
_ac.push(_ae);
}
this._appNav.addMenuItems(_ac);
},megaMenuClick:function(_af){
if(typeof (_af.displayNavBar)=="undefined"){
_af.displayNavBar=false;
}
this.displayContent(_af);
},displayContent:function(_b0){
if(_b0!=null){
_b0.forceRefresh=true;
if(_b0.displayNavBar==false){
this._displayOnlyBodyContent(_b0);
return;
}
if(_b0.displayNavBar==true){
this._displayNavMenuAndBodyContent(_b0);
return;
}
if(_b0.pageID==curam.config.landingPage){
this._displayOnlyBodyContent(_b0);
return;
}
if(this._isNavBarItem(_b0.pageID)){
this._displayNavMenuAndBodyContent(_b0);
return;
}else{
if(this._appNav._showing){
this._displayNavMenuAndBodyContent(_b0);
return;
}else{
this._displayOnlyBodyContent(_b0);
return;
}
}
}
},_displayOnlyBodyContent:function(_b1){
if(this._appNav._showing){
var _b2=this.connect(this._appContentBody,"_panelFadeOutComplete",_45.hitch(this,function(){
_b2.remove();
var _b3=this.connect(this._appNav,"_onHideComplete",_45.hitch(this,function(){
this._appNav.deselect();
_b3.remove();
_b1.key=_b1.pageID;
this._appContentBody.set("displayPanel",_b1);
}));
this._appNav.fadeOut();
}));
this._appContentBody.fadeOutDisplay();
}else{
_b1.key=_b1.pageID;
this._appContentBody.set("displayPanel",_b1);
}
},_displayNavMenuAndBodyContent:function(_b4){
_b4.key=_b4.pageID;
if(_b4.param==null){
_b4.param=[];
}
_b4.exceptionButtonFound=false;
if(this._appNav._showing){
this._appNav.setSelectedButton(_b4);
}else{
var _b5=this.connect(this._appContentBody,"_panelFadeOutComplete",_45.hitch(this,function(){
_b5.remove();
var _b6=this.connect(this._appNav,"_onShowComplete",_45.hitch(this,function(){
_b6.remove();
this._appNav.setSelectedButton(_b4);
}));
this._appNav.fadeIn();
}));
this._appContentBody.fadeOutDisplay();
}
},_doResourceLookUpForMainBody:function(_b7,_b8,_b9){
var uri;
if(_b7.key){
if(this._isUIMFragment(_b7.key)){
uri=jsL+"/"+_b7.key+"Page.do?"+this._addCDEJParameters();
}else{
uri=jsL+"/UIMIFrameWrapperPage.do?uimPageID="+_b7.key+"&"+this._addCDEJParameters();
}
}else{
if(_b7.url){
uri=_b7.url;
}
}
return uri;
},_addCDEJParameters:function(){
return jsScreenContext.toRequestString();
},updateMainContentIframe:function(_ba){
var _bb=dojo.query("iframe",this.domNode)[0];
if(_bb){
_bb.contentWindow.location.href=_ba;
}
},_isUIMFragment:function(_bc){
return (this._appConfig&&this._appConfig.uimFragRegistry[_bc]!=null);
},_setupUserMenuLinking:function(_bd,_be){
dojo.connect(_bd,"onclick",_45.partial(function(_bf,evt){
var _c0=dojo.byId("curam-extapp_userMenuArrow");
if(evt.target!=_c0){
displayContent(_bf);
}
},_be));
dojo.connect(_bd,"onkeypress",function(evt){
if(evt.charOrCode===dojo.keys.ENTER){
dojo.stopEvent(evt);
displayContent(_be);
}
});
},_makeUserMenuAccessible:function(_c1,_c2){
_47.set(_c2,"tabindex","3");
_47.set(_c2,"title",_c2.innerText);
_47.set(_c2,"role","link");
var _c3=dojo.query(".idxHeaderDropDownArrow",_c1)[0];
_47.set(_c3,"tabindex","4");
_47.set(_c3,"role","button");
_47.set(_c3,"title",_c2.innerText);
this._handleUserImageHighContrast(_c1);
},_handleUserImageHighContrast:function(_c4){
var _c5=dojo.query(".idxHeaderUserIcon",_c4)[1];
if(_c5){
var _c6=win.body();
if(_c6&&_52.contains(_c6,"high-contrast")){
_c5.src="servlet/PathResolver?r=i&p=/config/tablayout/image[banner_hom_normal.png]";
_56(_c5,"mouseover",function(){
_c5.src="servlet/PathResolver?r=i&p=/config/tablayout/image[banner_home_roll.png]";
});
_56(_c5,"click",function(){
_c5.src="servlet/PathResolver?r=i&p=/config/tablayout/image[banner_home_click.png]";
});
_56(_c5,"mouseout",function(){
_c5.src="servlet/PathResolver?r=i&p=/config/tablayout/image[banner_hom_normal.png]";
});
}
}
},_makeMegaMenuAccessible:function(_c7){
var _c8=dojo.query("span[id*=text]",_c7.domNode)[0];
_47.set(_c8,"title",_c8.innerText);
},_makeHelpMenuAccessible:function(_c9){
_47.set(_c9,"tabindex","6");
_47.set(_c9,"role","button");
dojo.connect(_c9,"onkeydown",function(evt){
if(evt.keyCode===dojo.keys.ENTER){
dojo.stopEvent(evt);
dijit.byId("appHelpMenu")._scheduleOpen(evt.target);
}
});
},_makePrintMenuAccessible:function(_ca){
var _cb=_ca._settingsNode;
_47.set(_cb,"tabindex","5");
_47.set(_cb,"role","button");
dojo.connect(_cb,"onkeydown",function(evt){
if(evt.keyCode===dojo.keys.ENTER){
dojo.stopEvent(evt);
dijit.byId("appBannerPrintMenu")._scheduleOpen(evt.target);
}
});
},_setupUserMenuHoverCard:function(_cc){
_46.after(idx.oneui.Header.prototype,"_renderUser",function(){
_52.add(this.userNode,"idxHeaderDropDown");
var _cd=dojo.query(".idxHeaderDropDownArrow",this.userNode)[0];
_cd.id="curam-extapp_userMenuArrow";
if(dojo.isIE!==7){
_47.set(_cd,"onmouseover","idx.oneui.HoverHelpTooltip.defaultPosition=['below']");
_47.set(_cd,"onkeypress","idx.oneui.HoverHelpTooltip.defaultPosition=['below']");
}else{
dojo.connect(_cd,"onclick",idx.oneui.HoverHelpTooltip.defaultPosition=["below"]);
}
});
if(dojo.isIE!==7){
_46.before(idx.oneui.HoverHelpTooltip,"show",function(){
var _ce=dojo.byId("curam-extapp_userMenuArrow");
_53.set(_ce,{"position":"fixed","top":"30px","right":"21px"});
});
_46.after(idx.oneui.HoverHelpTooltip,"show",function(){
_53.set(dojo.byId("curam-extapp_userMenuArrow"),"position","static");
});
_46.after(_cc,"onShow",_45.partial(function(_cf){
var _d0="idx_oneui__MasterHoverHelpTooltip_0";
if(_cf.lastIndexOf("_")!=-1){
_d0="idx_oneui__MasterHoverHelpTooltip_"+_cf.slice(_cf.lastIndexOf("_")+1);
}
var _d1=CuramExternalApp._oneuiBanner;
var _d2=_d1._helpNode?true:false;
var _d3=_d1._settingsNode?true:false;
var _d4=_d1.logoExists;
var _d5=0;
_d5+=_d4?_49.getMarginBox(_48(".idxHeaderLogoBox",_d1._globalActionsNode)[0]).w:0;
_d5+=_d2?_49.getMarginBox(_d1._helpNode).w:0;
_d5+=_d3?_49.getMarginBox(_d1._settingsNode).w:0;
_d5+=_49.getContentBox(_48(".idxHeaderDropDownArrow",_d1.userNode)[0]).w/2;
_53.set(dom.byId(_d0),{"left":"auto","right":_d5+"px"});
},_cc.id));
}
},_addHelpMenuCustomClass:function(){
var _d6=dijit.byId("appHelpMenu")._popupWrapper;
if(!_52.contains(_d6,"oneuiHeaderGlobalActionsMenu_help")){
_52.add(_d6,"oneuiHeaderGlobalActionsMenu_help");
}
},displayMegaMenuItemInModal:function(_d7){
console.log(_d7);
},_preventJAWSCrashClick:function(_d8){
var _d9=dojo.query("#"+_d8.id+"_text",_d8)[0];
if(!_d9.isModified){
dojo.query(".wtfoneui",_d9).forEach(function(_da){
_da.oldInnerText=_da.innerText;
if(_52.contains(_da,"MMtitle")){
_da.innerText=_da.innerText.substring(0,229).concat("...");
}else{
var _db=_da.previousSibling;
while(!_52.contains(_db,"MMtitle")){
_db=_db.previousSibling;
}
_db=_db.innerText.length;
var _dc=Math.min(250-_db,Math.max(10,_da.innerText.length-_db));
_da.innerText=_da.innerText.substring(0,_dc).concat("...");
}
});
_d9.isModified=true;
_d9.innerModdedTimer&&clearTimeout(_d9.innerModdedTimer);
_d9.innerModdedTimer=setTimeout(dojo.partial(function(_dd){
if(_d9.isModified){
dojo.query(".wtfoneui",_d9).forEach(function(_de){
_de.innerText=_de.oldInnerText;
});
_d9.isModified=false;
_d9["innerModdedTimer"]=undefined;
try{
delete _d9.innerModdedTimer;
}
catch(e){
}
}
},_d8),2);
}
},_preventJAWSCrashFocus:function(_df){
var _e0=dojo.query("#"+_df.id+"_text",_df)[0];
if(!_e0.isModified){
dojo.query(".wtfoneui",_e0).forEach(function(_e1){
_e1.oldInnerText=_e1.innerText;
if(_52.contains(_e1,"MMtitle")){
_e1.innerText=_e1.innerText.substring(0,229).concat("...");
}else{
var _e2=_e1.previousSibling;
while(!_52.contains(_e2,"MMtitle")){
_e2=_e2.previousSibling;
}
_e2=_e2.innerText.length;
var _e3=Math.min(250-_e2,Math.max(10,_e1.innerText.length-_e2));
_e1.innerText=_e1.innerText.substring(0,_e3).concat("...");
}
});
_e0.isModified=true;
_e0.innerModdedTimer&&clearTimeout(_e0.innerModdedTimer);
_e0.innerModdedTimer=setTimeout(dojo.partial(function(_e4){
if(_e0.isModified){
dojo.query(".wtfoneui",_e0).forEach(function(_e5){
_e5.innerText=_e5.oldInnerText;
});
_e0.isModified=false;
_e0["innerModdedTimer"]=undefined;
try{
delete _e0.innerModdedTimer;
}
catch(e){
}
}
},_df),2);
}
},_preventJAWSCrashBlur:function(_e6){
var _e7=dojo.query("#"+_e6.id+"_text",_e6)[0];
_e7.innerModdedTimer&&clearTimeout(_e7.innerModdedTimer);
if(_e7.isModified){
dojo.query(".wtfoneui",_e7).forEach(function(_e8){
_e8.innerText=_e8.oldInnerText;
});
_e7.isModified=false;
}
},_skipLinkFocus:function(_e9){
_e9=_e9||"app-content";
var _ea=dojo.byId(_e9);
if(_ea){
_ea.focus();
}
},_showHideSkipLink:function(e){
var _eb=dojo.byId("skipLink");
if(_eb){
var _ec=_eb.parentNode;
if(e.type=="focus"&&_52.contains(_ec,"hidden")){
_52.remove(_ec,"hidden");
}else{
if(e.type=="blur"&&!_52.contains(_ec,"hidden")){
_52.add(_ec,"hidden");
}
}
}
},print:function(){
var _ed=_48("iframe.curam-iframe","app-content")[0];
console.log("PRINTING IFRAME:"+_ed);
if(_ed){
if(dojo.isIE<9){
_ed.contentWindow.document.execCommand("print",false,null);
}else{
_ed.contentWindow.print();
}
}else{
window.print();
}
}});
});
},"url:dijit/form/templates/ComboButton.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" data-dojo-attach-point=\"buttonNode\" data-dojo-attach-event=\"ondijitclick:_onClick,onkeypress:_onButtonKeyPress\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" data-dojo-attach-point=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdata-dojo-attach-point=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdata-dojo-attach-event=\"onkeypress:_onArrowKeyPress\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" data-dojo-attach-point=\"valueNode\"\n\t\t/></td></tr></tbody\n></table>\n","dijit/place":function(){
define("dijit/place",["dojo/_base/array","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/window","dojo/window",".","dojo/_base/lang"],function(_ee,_ef,_f0,_f1,win,_f2,_f3,_f4){
function _f5(_f6,_f7,_f8,_f9){
var _fa=_f2.getBox();
if(!_f6.parentNode||String(_f6.parentNode.tagName).toLowerCase()!="body"){
win.body().appendChild(_f6);
}
var _fb=null;
_ee.some(_f7,function(_fc){
var _fd=_fc.corner;
var pos=_fc.pos;
var _fe=0;
var _ff={w:{"L":_fa.l+_fa.w-pos.x,"R":pos.x-_fa.l,"M":_fa.w}[_fd.charAt(1)],h:{"T":_fa.t+_fa.h-pos.y,"B":pos.y-_fa.t,"M":_fa.h}[_fd.charAt(0)]};
if(_f8){
var res=_f8(_f6,_fc.aroundCorner,_fd,_ff,_f9);
_fe=typeof res=="undefined"?0:res;
}
var _100=_f6.style;
var _101=_100.display;
var _102=_100.visibility;
if(_100.display=="none"){
_100.visibility="hidden";
_100.display="";
}
var mb=_ef.getMarginBox(_f6);
_100.display=_101;
_100.visibility=_102;
var _103={"L":pos.x,"R":pos.x-mb.w,"M":Math.max(_fa.l,Math.min(_fa.l+_fa.w,pos.x+(mb.w>>1))-mb.w)}[_fd.charAt(1)],_104={"T":pos.y,"B":pos.y-mb.h,"M":Math.max(_fa.t,Math.min(_fa.t+_fa.h,pos.y+(mb.h>>1))-mb.h)}[_fd.charAt(0)],_105=Math.max(_fa.l,_103),_106=Math.max(_fa.t,_104),endX=Math.min(_fa.l+_fa.w,_103+mb.w),endY=Math.min(_fa.t+_fa.h,_104+mb.h),_107=endX-_105,_108=endY-_106;
_fe+=(mb.w-_107)+(mb.h-_108);
if(_f4.exists("curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm")&&curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm==true){
if((_fd.charAt(0)=="T"||_fd.charAt(1)=="L")&&_fe>0){
_fe=mb.w+mb.h;
}
}
if(_fb==null||_fe<_fb.overflow){
_fb={corner:_fd,aroundCorner:_fc.aroundCorner,x:_105,y:_106,w:_107,h:_108,overflow:_fe,spaceAvailable:_ff};
}
return !_fe;
});
if(_fb.overflow&&_f8){
_f8(_f6,_fb.aroundCorner,_fb.corner,_fb.spaceAvailable,_f9);
}
var l=_ef.isBodyLtr(),s=_f6.style;
s.top=_fb.y+"px";
s[l?"left":"right"]=(l?_fb.x:_fa.w-_fb.x-_fb.w)+"px";
s[l?"right":"left"]="auto";
return _fb;
};
return (_f3.place={at:function(node,pos,_109,_10a){
var _10b=_ee.map(_109,function(_10c){
var c={corner:_10c,pos:{x:pos.x,y:pos.y}};
if(_10a){
c.pos.x+=_10c.charAt(1)=="L"?_10a.x:-_10a.x;
c.pos.y+=_10c.charAt(0)=="T"?_10a.y:-_10a.y;
}
return c;
});
return _f5(node,_10b);
},around:function(node,_10d,_10e,_10f,_110){
var _111=(typeof _10d=="string"||"offsetWidth" in _10d)?_ef.position(_10d,true):_10d;
if(_10d.parentNode){
var _112=_f0.getComputedStyle(_10d).position=="absolute";
var _113=_10d.parentNode;
while(_113&&_113.nodeType==1&&_113.nodeName!="BODY"){
var _114=_ef.position(_113,true),pcs=_f0.getComputedStyle(_113);
if(/relative|absolute/.test(pcs.position)){
_112=false;
}
if(!_112&&/hidden|auto|scroll/.test(pcs.overflow)){
var _115=Math.min(_111.y+_111.h,_114.y+_114.h);
var _116=Math.min(_111.x+_111.w,_114.x+_114.w);
_111.x=Math.max(_111.x,_114.x);
_111.y=Math.max(_111.y,_114.y);
_111.h=_115-_111.y;
_111.w=_116-_111.x;
}
if(pcs.position=="absolute"){
_112=true;
}
_113=_113.parentNode;
}
}
var x=_111.x,y=_111.y,_117="w" in _111?_111.w:(_111.w=_111.width),_118="h" in _111?_111.h:(_f1.deprecated("place.around: dijit.place.__Rectangle: { x:"+x+", y:"+y+", height:"+_111.height+", width:"+_117+" } has been deprecated.  Please use { x:"+x+", y:"+y+", h:"+_111.height+", w:"+_117+" }","","2.0"),_111.h=_111.height);
var _119=[];
function push(_11a,_11b){
_119.push({aroundCorner:_11a,corner:_11b,pos:{x:{"L":x,"R":x+_117,"M":x+(_117>>1)}[_11a.charAt(1)],y:{"T":y,"B":y+_118,"M":y+(_118>>1)}[_11a.charAt(0)]}});
};
_ee.forEach(_10e,function(pos){
var ltr=_10f;
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
var _11c=_f5(node,_119,_110,{w:_117,h:_118});
_11c.aroundNodePos=_111;
return _11c;
}});
});
},"dijit/_HasDropDown":function(){
define("dijit/_HasDropDown",["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/keys","dojo/_base/lang","dojo/touch","dojo/_base/window","dojo/window","./registry","./focus","./popup","./_FocusMixin"],function(_11d,_11e,_11f,dom,_120,_121,_122,_123,has,keys,lang,_124,win,_125,_126,_127,_128,_129){
return _11d("dijit._HasDropDown",_129,{_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:true,forceWidth:false,maxHeight:0,dropDownPosition:["below","above"],_stopClickEvents:true,_onDropDownMouseDown:function(e){
if(this.disabled||this.readOnly){
return;
}
e.preventDefault();
this._docHandler=this.connect(win.doc,_124.release,"_onDropDownMouseUp");
this.toggleDropDown();
},_onDropDownMouseUp:function(e){
if(e&&this._docHandler){
this.disconnect(this._docHandler);
}
var _12a=this.dropDown,_12b=false;
if(e&&this._opened){
var c=_122.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_12b){
if(_121.contains(t,"dijitPopup")){
_12b=true;
}else{
t=t.parentNode;
}
}
if(_12b){
t=e.target;
if(_12a.onItemClick){
var _12c;
while(t&&!(_12c=_126.byNode(t))){
t=t.parentNode;
}
if(_12c&&_12c.onClick&&_12c.getParent){
_12c.getParent().onItemClick(_12c,e);
}
}
return;
}
}
}
if(this._opened){
if(_12a.focus&&_12a.autoFocus!==false){
window.setTimeout(lang.hitch(_12a,"focus"),1);
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
_11f.stop(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _12d={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
_121.add(this._arrowWrapperNode||this._buttonNode,"dijit"+_12d+"ArrowButton");
},postCreate:function(){
this.inherited(arguments);
this.connect(this._buttonNode,_124.press,"_onDropDownMouseDown");
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
var d=this.dropDown,_12e=e.target;
if(d&&this._opened&&d.handleKey){
if(d.handleKey(e)===false){
_11f.stop(e);
return;
}
}
if(d&&this._opened&&e.charOrCode==keys.ESCAPE){
this.closeDropDown();
_11f.stop(e);
}else{
if(!this._opened&&(e.charOrCode==keys.DOWN_ARROW||((e.charOrCode==keys.ENTER||e.charOrCode==" ")&&((_12e.tagName||"").toLowerCase()!=="input"||(_12e.type&&_12e.type.toLowerCase()!=="text"))))){
this._toggleOnKeyUp=true;
_11f.stop(e);
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
var _12f=_127.curNode&&this.dropDown&&dom.isDescendant(_127.curNode,this.dropDown.domNode);
this.closeDropDown(_12f);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_130){
_130();
},loadAndOpenDropDown:function(){
var d=new _11e(),_131=lang.hitch(this,function(){
this.openDropDown();
d.resolve(this.dropDown);
});
if(!this.isLoaded()){
this.loadDropDown(_131);
}else{
_131();
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
var _132=this.dropDown,_133=_132.domNode,_134=this._aroundNode||this.domNode,self=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_133.style.width){
this._explicitDDWidth=true;
}
if(_133.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _135={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_135.width="";
}
if(!this._explicitDDHeight){
_135.height="";
}
_123.set(_133,_135);
var _136=this.maxHeight;
if(_136==-1){
var _137=_125.getBox(),_138=_122.position(_134,false);
_136=Math.floor(Math.max(_138.y,_137.h-(_138.y+_138.h)));
}
_128.moveOffScreen(_132);
if(_132.startup&&!_132._started){
_132.startup();
}
var mb=_122.getMarginSize(_133);
var _139=(_136&&mb.h>_136);
_123.set(_133,{overflowX:"hidden",overflowY:_139?"auto":"hidden"});
if(_139){
mb.h=_136;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_134.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_134.offsetWidth);
}else{
delete mb.w;
}
}
if(lang.isFunction(_132.resize)){
_132.resize(mb);
}else{
_122.setMarginBox(_133,mb);
}
}
var _13a=_128.open({parent:this,popup:_132,around:_134,orient:this.dropDownPosition,onExecute:function(){
self.closeDropDown(true);
},onCancel:function(){
self.closeDropDown(true);
},onClose:function(){
_120.set(self._popupStateNode,"popupActive",false);
_121.remove(self._popupStateNode,"dijitHasDropDownOpen");
self._opened=false;
}});
_120.set(this._popupStateNode,"popupActive","true");
_121.add(self._popupStateNode,"dijitHasDropDownOpen");
this._opened=true;
return _13a;
},closeDropDown:function(_13b){
if(this._opened){
if(_13b){
this.focus();
}
_128.close(this.dropDown);
this._opened=false;
}
}});
});
},"curam/util/Request":function(){
define("curam/util/Request",["dojo/_base/xhr","curam/debug","curam/util/ResourceBundle","curam/util/LocalConfig"],function(xhr,_13c,_13d,_13e){
dojo.requireLocalization("curam.application","Request");
var _13f=new _13d("Request"),_140=null,_141=function(_142){
if(_140){
return _140(_142);
}else{
return _142.responseText.indexOf("action=\"j_security_check\"")>0;
}
},_143=function(err,_144){
if(_141(_144.xhr)){
_13c.log(_13f.getProperty("sessionExpired"));
alert(_13f.getProperty("sessionExpired"));
}else{
_13c.log(_13f.getProperty("ajaxError"));
alert(_13f.getProperty("ajaxError"));
}
_13c.log(err);
_13c.log("HTTP status was: "+_144.xhr.status);
},_145=function(_146,args){
var _147=_13e.readOption("ajaxDebugMode","false")=="true";
var _148=args.error;
if(_147){
args.error=function(err,_149){
if(args.errorHandlerOverrideDefault!==true){
_143(err,_149);
}
if(_148){
_148(err,_149);
}
};
}
var _14a=_146(args);
return _14a;
};
var _14b={post:function(args){
return _145(xhr.post,args);
},get:function(args){
return _145(xhr.get,args);
},setLoginPageDetector:function(_14c){
_140=_14c;
}};
return _14b;
});
},"idx/oneui/MenuBar":function(){
define("idx/oneui/MenuBar",["dojo/_base/declare","dijit/MenuBar","idx/oneui/_MenuOpenOnHoverMixin"],function(_14d,_14e,_14f){
return _14d("idx.oneui.MenuBar",[_14e,_14f],{});
});
},"dijit/_MenuBase":function(){
define("dijit/_MenuBase",["./popup","dojo/window","./_Widget","./_KeyNavContainer","./_TemplatedMixin","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/lang","dojo/_base/array"],function(pm,_150,_151,_152,_153,_154,dom,_155,_156,lang,_157){
return _154("dijit._MenuBase",[_151,_153,_152],{parentMenu:null,popupDelay:500,onExecute:function(){
},onCancel:function(){
},_moveToPopup:function(evt){
if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){
this.focusedChild._onClick(evt);
}else{
var _158=this._getTopMenu();
if(_158&&_158._isMenuBar){
_158.focusNext();
}
}
},_onPopupHover:function(){
if(this.currentPopup&&this.currentPopup._pendingClose_timer){
var _159=this.currentPopup.parentMenu;
if(_159.focusedChild){
_159.focusedChild._setSelected(false);
}
_159.focusedChild=this.currentPopup.from_item;
_159.focusedChild._setSelected(true);
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
var _15a=item.popup;
if(_15a){
this._stopPendingCloseTimer(_15a);
_15a._pendingClose_timer=setTimeout(function(){
_15a._pendingClose_timer=null;
if(_15a.parentMenu){
_15a.parentMenu.currentPopup=null;
}
pm.close(_15a);
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
},_stopPendingCloseTimer:function(_15b){
if(_15b._pendingClose_timer){
clearTimeout(_15b._pendingClose_timer);
_15b._pendingClose_timer=null;
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
var _15c=this.focusedChild;
if(!_15c){
return;
}
var _15d=_15c.popup;
if(_15d.isShowingNow){
return;
}
if(this.currentPopup){
this._stopPendingCloseTimer(this.currentPopup);
pm.close(this.currentPopup);
}
_15d.parentMenu=this;
_15d.from_item=_15c;
var self=this;
pm.open({parent:this,popup:_15d,around:_15c.domNode,orient:this._orient||["after","before"],onCancel:function(){
self.focusChild(_15c);
self._cleanUp();
_15c._setSelected(true);
self.focusedChild=_15c;
},onExecute:lang.hitch(this,"_cleanUp")});
this.currentPopup=_15d;
if(this.popupHoverHandle){
this.disconnect(this.popupHoverHandle);
}
this.popupHoverHandle=this.connect(_15d.domNode,"onmouseenter","_onPopupHover");
if(_15d.focus){
_15d._focus_timer=setTimeout(lang.hitch(_15d,function(){
this._focus_timer=null;
this.focus();
}),0);
}
},_markActive:function(){
this.isActive=true;
_156.replace(this.domNode,"dijitMenuActive","dijitMenuPassive");
},onOpen:function(){
this.isShowingNow=true;
this._markActive();
},_markInactive:function(){
this.isActive=false;
_156.replace(this.domNode,"dijitMenuPassive","dijitMenuActive");
},onClose:function(){
this._stopFocusTimer();
this._markInactive();
this.isShowingNow=false;
this.parentMenu=null;
},_closeChild:function(){
this._stopPopupTimer();
if(this.currentPopup){
if(_157.indexOf(this._focusManager.activeStack,this.id)>=0){
_155.set(this.focusedChild.focusNode,"tabIndex",this.tabIndex);
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
},"curam/widget/menu/MenuPane":function(){
define("curam/widget/menu/MenuPane",["dojo/_base/declare","dojo/_base/lang","dojo/on","dojo/dom-class","curam/widget/componentWrappers/ListWraper","curam/widget/form/ToggleButtonGroup","dojo/_base/window","dojo/dom-construct","dijit/TooltipDialog","dijit/popup","dojo/_base/fx","dojo/dom-style","dojox/layout/ExpandoPane","dojo/dom-geometry","dojo/aspect","dojo/keys","dijit/Tooltip","idx/oneui/HoverCard","dojo/query","dojo/dom-style","dojo/has","dojo/dom-attr"],function(_15e,lang,on,_15f,_160,_161,_162,_163,_164,_165,fx,_166,_167,_168,_169,keys,_16a,_16b,_16c,_16d,has,_16e){
var _16f=_15e("curam.widget.menu._MenuPaneButtonIndexer",null,{selectedButtonKey:-1,selectedButtonDisplayIndex:-1,expandButtonDisplayIndex:-1,_buttonDisplayOrderArrayOrginale:null,_buttonMap:null,_subPagenMap:null,_buttonPrimaryContainerArray:null,_buttonSecondaryContainerArray:null,constructor:function(args){
this._buttonMap=[];
this._subPagenMap=[];
this._buttonDisplayOrderArrayOrginale=new Array();
this._buttonPrimaryContainerArray=new Array();
this._buttonSecondaryContainerArray=new Array();
},addNewButton:function(_170,key){
var _171={key:key,id:_170.id,button:_170,contextBox:null,displayOrderIndex:null,displayOrderOrginaleIndex:this._buttonDisplayOrderArrayOrginale.length};
this._buttonMap[key]=_171;
this._buttonDisplayOrderArrayOrginale.push(key);
},addButtonReferenceToPrimaryContainer:function(key,_172){
if(_172){
this._buttonPrimaryContainerArray.push(key);
}else{
this._buttonSecondaryContainerArray.push(key);
}
},getButton:function(key){
var _173=this._buttonMap[key];
return _173;
},setNewSubPage:function(_174,_175){
this._subPagenMap[_174]=_175;
},getSubPagePrimaryPage:function(_176){
var _177=this._subPagenMap[_176];
return _177;
},getButtonPrimary:function(_178){
var key=this._buttonPrimaryContainerArray[_178];
var _179=this.getButton(key);
return _179;
},getButtonSecondary:function(_17a){
var key=this._buttonSecondaryContainerArray[_17a];
var _17b=this.getButton(key);
return _17b;
},swapButtonFomPrimaryContainerToSecondaryContainer:function(_17c){
if(_17c){
var item=this._buttonPrimaryContainerArray.pop();
this._buttonSecondaryContainerArray.unshift(item);
}else{
var item=this._buttonSecondaryContainerArray.shift();
this._buttonPrimaryContainerArray.push(item);
}
},swapButtonContainerToContainer:function(_17d,_17e,_17f){
if(_17d){
var item=this._buttonPrimaryContainerArray.splice(_17e,1);
this._buttonSecondaryContainerArray.splice(_17f,0,item[0]);
}else{
var item=this._buttonSecondaryContainerArray.splice(_17e,1);
this._buttonPrimaryContainerArray.splice(_17f,0,item[0]);
}
},swapButtonContainerItemIndex:function(_180,_181,_182){
if(_180){
var item=this._buttonPrimaryContainerArray.splice(_181,1);
this._buttonPrimaryContainerArray.splice(_182,0,item[0]);
}else{
var item=this._buttonSecondaryContainerArray.splice(_181,1);
this._buttonSecondaryContainerArray.splice(_182,0,item[0]);
}
},getWhichContinerFromIndex:function(_183){
var _184=0;
if(_183>=this._buttonPrimaryContainerArray.length){
_184=1;
}
return _184;
}});
return _15e("curam.widget.menu.MenuPane",[_167],{_listWrapper:null,_expandButton:null,_expandButtonContentBox:null,_toolTipDialogExpand:null,_toolTipDialogExpandContents:null,_fadeIn:null,_fadeOut:null,_menuPaneButtonIndexer:null,duration:300,_buttonSizerDiv:null,_buttonSizerList:null,_resizeResizeHandler:null,_showEndresizeResizeHandler:null,_hideEndResizeHandler:null,resizeDelay:250,_resizeDelayHandler:null,_previouseHeight:-1,_resizeStatusQue:1,_resizeStatusResizeing:0,_resizeStatusNotInUse:-1,_resizeCurentStatus:-1,_classNavMenu:"navMenu",_classNavMenuOverFlow:"navMenuOverFlow",_classCurramSideMenuButton:"curramSideMenuButton",_classCurramSideMenuButtonIcon:"curramSideMenuButtonIcon",_classCurramSideMenuOverFlowButton:"curramSideMenuOverFlowButton",_classCurramSideMenuOverFlowButtonIcon:"curramSideMenuOverFlowButtonIcon",_classCurramSideMenuOverFlowButtonExpand:"curramSideMenuOverFlowButtonExpand",_classCurramSideMenuOverFlowButtonExpandIcon:"curramSideMenuOverFlowButtonExpandIcon",constructor:function(args){
this.inherited(arguments);
this._menuPaneButtonIndexer=new _16f();
},postCreate:function(){
this.inherited(arguments);
_15f.add(this.titleWrapper,"dijitHidden");
this._expandButton=new dijit.form.Button({id:"navOverflowButton",baseClass:this._classCurramSideMenuOverFlowButtonExpand,iconClass:this._classCurramSideMenuOverFlowButtonExpandIcon,orgID:"exapnadButton",showLabel:false});
this._toolTipDialogExpandContentsListWrapper=new curam.widget.componentWrappers.ListWraper({listType:"ol",role:"menu",baseClass:this._classNavMenuOverFlow,_doBeforeItemSet:lang.hitch(this,function(item,_185){
if(item!=null){
if(this.isLeftToRight()){
_16d.set(item.focusNode,"textAlign","left");
_16d.set(item.containerNode,"marginRight","10px");
}else{
_16d.set(item.focusNode,"textAlign","right");
_16d.set(item.containerNode,"marginLeft","10px");
}
_16d.set(item.containerNode,"padding","0px");
item.set("baseClass",this._classCurramSideMenuOverFlowButton);
_15f.replace(item.domNode,this._classCurramSideMenuOverFlowButton,this._classCurramSideMenuButton);
_15f.add(item.iconNode,this._classCurramSideMenuOverFlowButtonIcon);
}
})});
var _186=null;
if(has("ie")!=null&&has("ie")<9){
_186=_163.create("div");
}else{
_186=_163.create("nav");
}
_16e.set(_186,"role","navigation");
this._toolTipDialogExpandContentsListWrapper.placeAt(_186);
this._toolTipDialogExpand=new idx.oneui.HoverCard({draggable:false,hideDelay:450,showDelay:0,target:this._expandButton.domNode,content:_186,forceFocus:true,focus:lang.hitch(this,function(){
var _187=this._menuPaneButtonIndexer.getButtonSecondary(0);
_187.button.focus();
}),defaultPosition:["after-centered","before-centered"],moreActions:[],actions:[]});
_15f.add(this._toolTipDialogExpand.domNode,"dijitHidden");
_15f.add(_16c(".idxOneuiHoverCardFooter",this._toolTipDialogExpand.bodyNode)[0],"dijitHidden");
_15f.add(this._toolTipDialogExpand.gripNode,"dijitHidden");
_15f.add(this._toolTipDialogExpand.actionIcons,"dijitHidden");
_15f.add(this._toolTipDialogExpand.moreActionsNode,"dijitHidden");
this._listWrapper=new curam.widget.componentWrappers.ListWraper({listType:"ol",role:"menu",baseClass:this._classNavMenu,_doBeforeItemSet:lang.hitch(this,function(item,_188){
if(item!=null&&item.orgID!="exapnadButton"){
_15f.remove(item.iconNode,this._classCurramSideMenuOverFlowButtonIcon);
if(has("ie")){
_15f.remove(item.domNode,"curramSideMenuOverFlowButtonHover");
}
_16d.set(item.focusNode,"textAlign","center");
if(this.isLeftToRight()){
_16d.set(item.containerNode,"marginRight","0px");
}else{
_16d.set(item.containerNode,"marginLeft","0px");
}
item.set("baseClass",this._classCurramSideMenuButton);
_15f.replace(item.domNode,this._classCurramSideMenuButton,this._classCurramSideMenuOverFlowButton);
}
})});
if(has("ie")!=null&&has("ie")<9){
var div1=_163.create("div",null,this.containerNode);
_16e.set(div1,"role","navigation");
this._listWrapper.placeAt(div1);
}else{
var _189=_163.create("nav",null,this.containerNode);
_16e.set(_189,"role","navigation");
this._listWrapper.placeAt(_189);
}
this._fadeIn=fx.fadeIn({node:this._listWrapper.domNode,duration:this.duration,onEnd:lang.hitch(this,"_showContainer")});
this._fadeOut=fx.fadeOut({node:this._listWrapper.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHideEnd")});
this._resizeResizeHandler=_169.after(this,"resize",this._doResize,true);
this._showEndresizeResizeHandler=_169.after(this,"_showEnd",lang.hitch(this,"_onShowComplete"),false);
this._hideEndResizeHandler=_169.after(this,"_hideEnd",lang.hitch(this,"_onHideComplete"),false);
},startup:function(){
this.inherited(arguments);
},fadeIn:function(){
this._fadeIcons(true);
},fadeOut:function(){
this._fadeIcons(false);
},_fadeIcons:function(_18a){
this._toolTipDialogExpand.hide(this._expandButton.domNode);
if(_18a==true){
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
},addMenuItems:function(_18b){
this._cleanDownExistingMenuItems();
dojo.forEach(_18b,function(item,i){
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
},setSelectedButton:function(_18c){
if(_18c.exceptionButtonFound==null){
_18c.exceptionButtonFound=true;
}
if(this._menuPaneButtonIndexer.getButton(_18c.key)==null&&this._menuPaneButtonIndexer.getSubPagePrimaryPage(_18c.key)==null){
if(_18c.exceptionButtonFound==false){
this._onSelectAfter(_18c);
}else{
throw new Error("No button exists with the requested id : "+_18c.key);
}
}else{
this._buttonSelected(_18c,true);
}
},deselect:function(){
if(this._menuPaneButtonIndexer.selectedButtonDisplayIndex!=-1){
var _18d=this._menuPaneButtonIndexer.getButton(this._menuPaneButtonIndexer.selectedButtonKey);
_18d.button.set("checked",false);
}
},_onSelectBefore:function(_18e){
},_onSelectAfter:function(_18f){
},_addMenuItem:function(item,_190){
item=this._filterItem(item);
this._generateSubPageIndex(item.id,item.subPageIds);
var cb=lang.hitch(this,function(_191){
var pram={key:_191.orgID,param:[]};
this._buttonSelected(pram,false);
});
var but=new curam.widget.form.ToggleButtonGroup({label:item.label,orgID:item.id,groupName:"menuPaneCuramWidget",onClick:function(e){
cb(this);
},baseClass:this._classCurramSideMenuButton,iconClass:this._classCurramSideMenuButtonIcon});
if(item.iconPath!=null&&lang.trim(item.iconPath).length>0){
_166.set(but.iconNode,{backgroundImage:"url("+item.iconPath+")"});
}
if(item.selected!=null&&item.selected==true){
this._menuPaneButtonIndexer.selectedButtonKey=item.id;
}
this._menuPaneButtonIndexer.addNewButton(but,item.id);
},_generateSubPageIndex:function(_192,_193){
if(_193!=null&&_193.length>0){
dojo.forEach(_193,function(_194){
if(this._menuPaneButtonIndexer.getSubPagePrimaryPage(_194)==null){
this._menuPaneButtonIndexer.setNewSubPage(_194,_192);
}else{
throw new Error("There has been a clash, sub page has all ready been registered.  Primary ID : "+_192+" Subpage ID : "+_194);
}
},this);
}
},_filterItem:function(item){
return item;
},_initaleProcessMenuItems:function(){
var _195=dojo.contentBox(this.domNode);
if(this._showing==false){
_195.w=this._showSize;
}
this._buttonSizerDiv=_163.create("div",{style:{height:_195.h+"px",width:_195.w+"px"}});
_15f.add(this._buttonSizerDiv,"dijitOffScreen");
dojo.place(this._buttonSizerDiv,_162.body());
this._buttonSizerList=new curam.widget.componentWrappers.ListWraper({listType:"ol",baseClass:this._classNavMenu}).placeAt(this._buttonSizerDiv);
for(var key in this._menuPaneButtonIndexer._buttonMap){
var _196=this._menuPaneButtonIndexer.getButton(key);
if(_196.button){
this._buttonSizerList.set("item",_196.button.domNode);
var _197=dojo.contentBox(_196.button.domNode);
this._menuPaneButtonIndexer.getButton(key).contextBox=_197;
}
}
this._buttonSizerList.set("item",this._expandButton.domNode);
this._expandButtonContentBox=dojo.contentBox(this._expandButton.domNode);
_15f.add(this._expandButton.domNode,"dijitHidden");
_163.place(this._expandButton.domNode,_162.body());
},_initalePlaceMenuItems:function(){
var _198=0;
for(var key in this._menuPaneButtonIndexer._buttonMap){
var item=this._menuPaneButtonIndexer.getButton(key);
if(item.button.get("checked")){
this._menuPaneButtonIndexer.selectedButtonDisplayIndex=_198;
this._menuPaneButtonIndexer.selectedButtonKey=key;
}
item.displayOrderOrginaleIndex=_198;
if(this._menuPaneButtonIndexer.expandButtonDisplayIndex==-1&&(this.get("ContainerHeight")-this._listWrapper.get("ContainerHeight"))>(this._expandButtonContentBox.h+item.contextBox.h)){
this._listWrapper.set("item",item.button);
this._menuPaneButtonIndexer.addButtonReferenceToPrimaryContainer(key,true);
}else{
this._addExpandButton(_198);
this._toolTipDialogExpandContentsListWrapper.set("item",item.button);
this._menuPaneButtonIndexer.addButtonReferenceToPrimaryContainer(key,false);
if(_198==this._menuPaneButtonIndexer.selectedButtonDisplayIndex){
selectedIndexPositionTemp=this._menuPaneButtonIndexer._buttonSecondaryContainerArray.length-1;
}
}
if(_198==0){
idcar=item.button.id;
}
_198++;
}
this._buttonSizerList.destroy();
_163.destroy(this._buttonSizerDiv);
if(this._menuPaneButtonIndexer.selectedButtonKey!=-1){
var _199=this._menuPaneButtonIndexer.getButton(this._menuPaneButtonIndexer.selectedButtonKey);
_199.button._onClick();
}
},_addExpandButton:function(_19a){
if(this._menuPaneButtonIndexer.expandButtonDisplayIndex==-1){
console.info("add expando");
this._menuPaneButtonIndexer.expandButtonDisplayIndex=_19a;
_15f.remove(this._expandButton.domNode,"dijitHidden");
this._listWrapper.set("item",this._expandButton);
}
},_removeExpandButton:function(){
if(this._menuPaneButtonIndexer.expandButtonDisplayIndex!=-1&&this._menuPaneButtonIndexer._buttonSecondaryContainerArray.length==0){
this._menuPaneButtonIndexer.expandButtonDisplayIndex=-1;
console.info("Remove expando : "+this._menuPaneButtonIndexer._buttonSecondaryContainerArray.length);
_15f.add(this._expandButton.domNode,"dijitHidden");
_163.place(this._expandButton.domNode,_162.body());
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
var _19b=1;
while((this.get("ContainerHeight")<this._listWrapper.get("ContainerHeight"))&&this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length>0){
if(_19b==2&&this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length==1){
_19b=1;
}
var _19c=this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length-_19b;
var _19d=this._menuPaneButtonIndexer.getButtonPrimary(_19c);
if(_19d.button.get("checked")&&this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length>1){
_19b=2;
console.info(_19c+" : I am checked *************************  = "+_19d.button.get("checked"));
}else{
console.info("selected = "+_19d.button.get("checked"));
this._menuPaneButtonIndexer.swapButtonContainerToContainer(true,_19c,0);
this._toolTipDialogExpandContentsListWrapper.set("item",_19d.button,"first");
this._listWrapper.deleteChild(_19c);
this._menuPaneButtonIndexer.expandButtonDisplayIndex--;
if(_19b==2){
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
var _19e=true;
while(_19e&&this._menuPaneButtonIndexer._buttonSecondaryContainerArray.length>0){
var _19f=0;
var item=this._menuPaneButtonIndexer.getButtonSecondary(_19f);
if(item!=null&&(this.get("ContainerHeight")-this._listWrapper.get("ContainerHeight"))>item.contextBox.h){
var _1a0=this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length;
if(this._menuPaneButtonIndexer.expandButtonDisplayIndex!=-1){
this._menuPaneButtonIndexer.expandButtonDisplayIndex++;
if(this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length>0){
var _1a1=this._menuPaneButtonIndexer.getButtonPrimary(this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length-1);
if(_1a1.button.get("checked")&&_1a1.displayOrderOrginaleIndex>=_1a0){
if(_1a0!=0){
_1a0--;
}
this._menuPaneButtonIndexer.selectedButtonDisplayIndex++;
}
}
}
this._menuPaneButtonIndexer.swapButtonContainerToContainer(false,0,_1a0);
this._listWrapper.set("item",item.button,_1a0);
this._toolTipDialogExpandContentsListWrapper.deleteChild(_19f);
if(this._menuPaneButtonIndexer.expandButtonDisplayIndex!=-1&&this._menuPaneButtonIndexer._buttonSecondaryContainerArray.length<=0){
this._removeExpandButton();
}
}else{
_19e=false;
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
},_buttonSelected:function(_1a2,_1a3){
this._toolTipDialogExpand.hide(this._expandButton.domNode);
var _1a4;
if(this._menuPaneButtonIndexer.getButton(_1a2.key)!=null){
_1a4=this._menuPaneButtonIndexer.getButton(_1a2.key);
}else{
if(this._menuPaneButtonIndexer.getSubPagePrimaryPage(_1a2.key)!=null){
var _1a5=this._menuPaneButtonIndexer.getSubPagePrimaryPage(_1a2.key);
_1a4=this._menuPaneButtonIndexer.getButton(_1a5);
}else{
throw new Error("state unknow for requested selected button : "+_1a2.key);
}
}
_1a4.button.set("checked",true);
this._onSelectBefore(_1a2);
this._positionSelectedButton(_1a4);
if(this._menuPaneButtonIndexer._buttonSecondaryContainerArray.length>0){
this._previouseHeight++;
this._callRepositionButtons();
}
this._onSelectAfter(_1a2);
},_positionSelectedButton:function(_1a6){
if(this._menuPaneButtonIndexer.selectedButtonDisplayIndex!=-1){
var _1a7=this._menuPaneButtonIndexer.getButton(this._menuPaneButtonIndexer.selectedButtonKey);
var _1a8=_1a7.displayOrderOrginaleIndex;
if(this._menuPaneButtonIndexer.selectedButtonDisplayIndex!=_1a8){
if(this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length>0){
var _1a9=_1a8-(this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length-1);
var _1aa=this._menuPaneButtonIndexer.getButtonSecondary(0);
this._menuPaneButtonIndexer.swapButtonContainerToContainer(true,this._menuPaneButtonIndexer.selectedButtonDisplayIndex,_1a9);
this._toolTipDialogExpandContentsListWrapper.set("item",_1a7.button,_1a9);
this._listWrapper.deleteChild(this._menuPaneButtonIndexer.selectedButtonDisplayIndex);
this._menuPaneButtonIndexer.swapButtonContainerToContainer(false,0,this._menuPaneButtonIndexer.selectedButtonDisplayIndex);
this._listWrapper.set("item",_1aa.button,this._menuPaneButtonIndexer.selectedButtonDisplayIndex);
this._toolTipDialogExpandContentsListWrapper.deleteChild(0);
this._menuPaneButtonIndexer.selectedButtonDisplayIndex=-1;
this._menuPaneButtonIndexer.selectedButtonKey=-1;
}else{
var _1a9=_1a7.displayOrderOrginaleIndex;
this._menuPaneButtonIndexer.swapButtonContainerItemIndex(false,0,_1a9);
this._toolTipDialogExpandContentsListWrapper.set("item",_1a7.button,_1a9+1);
this._toolTipDialogExpandContentsListWrapper.deleteChild(0);
this._menuPaneButtonIndexer.selectedButtonDisplayIndex=-1;
this._menuPaneButtonIndexer.selectedButtonKey=-1;
}
}else{
console.info("no need to repostion old selected button");
this._menuPaneButtonIndexer.selectedButtonDisplayIndex=-1;
}
}
var _1a8=_1a6.displayOrderOrginaleIndex;
if(this._menuPaneButtonIndexer.getWhichContinerFromIndex(_1a8)==1){
if(this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length>0){
var _1ab=_1a8-(this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length);
var _1ac=this._menuPaneButtonIndexer.getButtonPrimary(this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length-1);
this._menuPaneButtonIndexer.swapButtonContainerToContainer(true,this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length-1,0);
this._toolTipDialogExpandContentsListWrapper.set("item",_1ac.button,0);
this._listWrapper.deleteChild(this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length);
this._menuPaneButtonIndexer.swapButtonContainerToContainer(false,_1ab+1,this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length);
this._listWrapper.set("item",_1a6.button,this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length-1);
this._toolTipDialogExpandContentsListWrapper.deleteChild(_1ab+1);
this._menuPaneButtonIndexer.selectedButtonDisplayIndex=this._menuPaneButtonIndexer._buttonPrimaryContainerArray.length-1;
this._menuPaneButtonIndexer.selectedButtonKey=_1a6.key;
}else{
this._menuPaneButtonIndexer.swapButtonContainerItemIndex(false,_1a8,0);
this._toolTipDialogExpandContentsListWrapper.set("item",_1a6.button,0);
this._toolTipDialogExpandContentsListWrapper.deleteChild(_1a8+1);
this._menuPaneButtonIndexer.selectedButtonDisplayIndex=0;
this._menuPaneButtonIndexer.selectedButtonKey=_1a6.key;
}
}else{
this._menuPaneButtonIndexer.selectedButtonDisplayIndex=_1a8;
this._menuPaneButtonIndexer.selectedButtonKey=_1a6.key;
console.info("no need to repostion New selected button :"+_1a8+" key = "+_1a6.key);
}
},_placeMenuItems:function(item,_1ad){
if(this._menuPaneButtonIndexer.expandButtonDisplayIndex==-1&&(this.get("ContainerHeight")-this._listWrapper.get("ContainerHeight"))>(this._expandButtonContentBox.h+item.contextBox.h)){
this._listWrapper.set("item",item.button);
}else{
if(this._menuPaneButtonIndexer.expandButtonDisplayIndex==-1){
this._menuPaneButtonIndexer.expandButtonDisplayIndex=_1ad;
_15f.remove(this._expandButton.domNode,"dijitHidden");
this._listWrapper.set("item",this._expandButton);
}
this._toolTipDialogExpandContentsListWrapper.set("item",item.button);
}
},_getContainerHeightAttr:function(){
var _1ae=_168.getContentBox(this.containerNode);
return _1ae.h;
},_setWidthAttr:function(_1af){
if(this._showing){
}else{
this._showAnim.properties.width=_1af;
this._showSize=_1af;
this._currentSize.w=_1af;
}
},_removeButtonCacheContent:function(){
for(var key in this._menuPaneButtonIndexer._buttonMap){
var _1b0=this._menuPaneButtonIndexer.getButton(key);
if(_1b0.button){
_1b0.button.destroy();
}
delete _1b0.button;
delete _1b0.contextBox;
delete _1b0.displayOrderIndex;
delete _1b0.displayOrderOrginaleIndex;
delete _1b0.id;
delete _1b0.key;
delete _1b0;
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
define("dijit/focus",["dojo/aspect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/Evented","dojo/_base/lang","dojo/on","dojo/ready","dojo/_base/sniff","dojo/Stateful","dojo/_base/unload","dojo/_base/window","dojo/window","./a11y","./registry","."],function(_1b1,_1b2,dom,_1b3,_1b4,_1b5,lang,on,_1b6,has,_1b7,_1b8,win,_1b9,a11y,_1ba,_1bb){
var _1bc=_1b2([_1b7,_1b5],{curNode:null,activeStack:[],constructor:function(){
var _1bd=lang.hitch(this,function(node){
if(dom.isDescendant(this.curNode,node)){
this.set("curNode",null);
}
if(dom.isDescendant(this.prevNode,node)){
this.set("prevNode",null);
}
});
_1b1.before(_1b4,"empty",_1bd);
_1b1.before(_1b4,"destroy",_1bd);
},registerIframe:function(_1be){
return this.registerWin(_1be.contentWindow,_1be);
},registerWin:function(_1bf,_1c0){
var _1c1=this;
var _1c2=function(evt){
_1c1._justMouseDowned=true;
setTimeout(function(){
_1c1._justMouseDowned=false;
},0);
if(has("ie")&&evt&&evt.srcElement&&evt.srcElement.parentNode==null){
return;
}
_1c1._onTouchNode(_1c0||evt.target||evt.srcElement,"mouse");
};
var doc=has("ie")?_1bf.document.documentElement:_1bf.document;
if(doc){
if(has("ie")){
_1bf.document.body.attachEvent("onmousedown",_1c2);
var _1c3=function(evt){
var tag=evt.srcElement.tagName.toLowerCase();
if(tag=="#document"||tag=="body"){
return;
}
if(a11y.isTabNavigable(evt.srcElement)){
_1c1._onFocusNode(_1c0||evt.srcElement);
}else{
_1c1._onTouchNode(_1c0||evt.srcElement);
}
};
doc.attachEvent("onactivate",_1c3);
var _1c4=function(evt){
_1c1._onBlurNode(_1c0||evt.srcElement);
};
doc.attachEvent("ondeactivate",_1c4);
return {remove:function(){
_1bf.document.detachEvent("onmousedown",_1c2);
doc.detachEvent("onactivate",_1c3);
doc.detachEvent("ondeactivate",_1c4);
doc=null;
}};
}else{
doc.body.addEventListener("mousedown",_1c2,true);
doc.body.addEventListener("touchstart",_1c2,true);
var _1c5=function(evt){
_1c1._onFocusNode(_1c0||evt.target);
};
doc.addEventListener("focus",_1c5,true);
var _1c6=function(evt){
_1c1._onBlurNode(_1c0||evt.target);
};
doc.addEventListener("blur",_1c6,true);
return {remove:function(){
doc.body.removeEventListener("mousedown",_1c2,true);
doc.body.removeEventListener("touchstart",_1c2,true);
doc.removeEventListener("focus",_1c5,true);
doc.removeEventListener("blur",_1c6,true);
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
var _1c7=[];
try{
while(node){
var _1c8=_1b3.get(node,"dijitPopupParent");
if(_1c8){
node=_1ba.byId(_1c8).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===win.body()){
break;
}
node=_1b9.get(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId"),_1c9=id&&_1ba.byId(id);
if(_1c9&&!(by=="mouse"&&_1c9.get("disabled"))){
_1c7.unshift(id);
}
node=node.parentNode;
}
}
}
}
catch(e){
}
this._setStack(_1c7,by);
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
},_setStack:function(_1ca,by){
var _1cb=this.activeStack;
this.set("activeStack",_1ca);
for(var _1cc=0;_1cc<Math.min(_1cb.length,_1ca.length);_1cc++){
if(_1cb[_1cc]!=_1ca[_1cc]){
break;
}
}
var _1cd;
for(var i=_1cb.length-1;i>=_1cc;i--){
_1cd=_1ba.byId(_1cb[i]);
if(_1cd){
_1cd._hasBeenBlurred=true;
_1cd.set("focused",false);
if(_1cd._focusManager==this){
_1cd._onBlur(by);
}
this.emit("widget-blur",_1cd,by);
}
}
for(i=_1cc;i<_1ca.length;i++){
_1cd=_1ba.byId(_1ca[i]);
if(_1cd){
_1cd.set("focused",true);
if(_1cd._focusManager==this){
_1cd._onFocus(by);
}
this.emit("widget-focus",_1cd,by);
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
var _1ce=new _1bc();
_1b6(function(){
var _1cf=_1ce.registerWin(win.doc.parentWindow||win.doc.defaultView);
if(has("ie")){
_1b8.addOnWindowUnload(function(){
_1cf.remove();
_1cf=null;
});
}
});
_1bb.focus=function(node){
_1ce.focus(node);
};
for(var attr in _1ce){
if(!/^_/.test(attr)){
_1bb.focus[attr]=typeof _1ce[attr]=="function"?lang.hitch(_1ce,attr):_1ce[attr];
}
}
_1ce.watch(function(attr,_1d0,_1d1){
_1bb.focus[attr]=_1d1;
});
return _1ce;
});
},"dojo/i18n":function(){
define("dojo/i18n",["./_base/kernel","require","./has","./_base/array","./_base/config","./_base/lang","./_base/xhr","./json"],function(dojo,_1d2,has,_1d3,_1d4,lang,xhr,json){
true||has.add("dojo-preload-i18n-Api",1);
true||has.add("dojo-v1x-i18n-Api",1);
var _1d5=dojo.i18n={},_1d6=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,_1d7=function(root,_1d8,_1d9,_1da){
for(var _1db=[_1d9+_1da],_1dc=_1d8.split("-"),_1dd="",i=0;i<_1dc.length;i++){
_1dd+=(_1dd?"-":"")+_1dc[i];
if(!root||root[_1dd]){
_1db.push(_1d9+_1dd+"/"+_1da);
}
}
return _1db;
},_1de={},_1df=dojo.getL10nName=function(_1e0,_1e1,_1e2){
_1e2=_1e2?_1e2.toLowerCase():dojo.locale;
_1e0="dojo/i18n!"+_1e0.replace(/\./g,"/");
_1e1=_1e1.replace(/\./g,"/");
return (/root/i.test(_1e2))?(_1e0+"/nls/"+_1e1):(_1e0+"/nls/"+_1e2+"/"+_1e1);
},_1e3=function(_1e4,_1e5,_1e6,_1e7,_1e8,load){
_1e4([_1e5],function(root){
var _1e9=lang.clone(root.root),_1ea=_1d7(!root._v1x&&root,_1e8,_1e6,_1e7);
_1e4(_1ea,function(){
for(var i=1;i<_1ea.length;i++){
_1e9=lang.mixin(lang.clone(_1e9),arguments[i]);
}
var _1eb=_1e5+"/"+_1e8;
_1de[_1eb]=_1e9;
load();
});
});
},_1ec=function(id,_1ed){
return /^\./.test(id)?_1ed(id):id;
},_1ee=function(_1ef){
var list=_1d4.extraLocale||[];
list=lang.isArray(list)?list:[list];
list.push(_1ef);
return list;
},load=function(id,_1f0,load){
if(1){
var _1f1=id.split("*"),_1f2=_1f1[1]=="preload";
if(_1f2){
if(!_1de[id]){
_1de[id]=1;
_1f3(_1f1[2],json.parse(_1f1[3]),1);
}
load(1);
}
if(_1f2||_1f4(id,_1f0,load)){
return;
}
}
var _1f5=_1d6.exec(id),_1f6=_1f5[1]+"/",_1f7=_1f5[5]||_1f5[4],_1f8=_1f6+_1f7,_1f9=(_1f5[5]&&_1f5[4]),_1fa=_1f9||dojo.locale,_1fb=_1f8+"/"+_1fa,_1fc=_1f9?[_1fa]:_1ee(_1fa),_1fd=_1fc.length,_1fe=function(){
if(!--_1fd){
load(lang.delegate(_1de[_1fb]));
}
};
_1d3.forEach(_1fc,function(_1ff){
var _200=_1f8+"/"+_1ff;
if(1){
_201(_200);
}
if(!_1de[_200]){
_1e3(_1f0,_1f8,_1f6,_1f7,_1ff,_1fe);
}else{
_1fe();
}
});
};
if(has("dojo-unit-tests")){
var _202=_1d5.unitTests=[];
}
if(1||1){
var _203=_1d5.normalizeLocale=function(_204){
var _205=_204?_204.toLowerCase():dojo.locale;
return _205=="root"?"ROOT":_205;
},isXd=function(mid){
return (1&&1)?_1d2.isXdUrl(_1d2.toUrl(mid+".js")):true;
},_206=0,_207=[],_1f3=_1d5._preloadLocalizations=function(_208,_209,_20a){
function _20b(_20c,func){
var _20d=_20c.split("-");
while(_20d.length){
if(func(_20d.join("-"))){
return true;
}
_20d.pop();
}
return func("ROOT");
};
function _20e(_20f){
_20f=_203(_20f);
_20b(_20f,function(loc){
if(_1d3.indexOf(_209,loc)>=0){
var mid=_208.replace(/\./g,"/")+"_"+loc;
_206++;
(isXd(mid)||_20a?_1d2:_213)([mid],function(_210){
for(var p in _210){
_1de[p+"/"+loc]=_210[p];
}
--_206;
while(!_206&&_207.length){
load.apply(null,_207.shift());
}
});
return true;
}
return false;
});
};
_20e();
_1d3.forEach(dojo.config.extraLocale,_20e);
},_1f4=function(id,_211,load){
if(_206){
_207.push([id,_211,load]);
}
return _206;
};
}
if(1){
var _212=new Function("__bundle","__checkForLegacyModules","__mid","var define = function(){define.called = 1;},"+"    require = function(){define.called = 1;};"+"try{"+"define.called = 0;"+"eval(__bundle);"+"if(define.called==1)"+"return 1;"+"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"+"return __checkForLegacyModules;"+"}catch(e){}"+"try{"+"return eval('('+__bundle+')');"+"}catch(e){"+"return e;"+"}"),_213=function(deps,_214){
var _215=[];
_1d3.forEach(deps,function(mid){
var url=_1d2.toUrl(mid+".js");
function load(text){
var _216=_212(text,_201,mid);
if(_216===1){
_1d2([mid],function(_217){
_215.push(_1de[url]=_217);
});
}else{
if(_216 instanceof Error){
console.error("failed to evaluate i18n bundle; url="+url,_216);
_216={};
}
_215.push(_1de[url]=(/nls\/[^\/]+\/[^\/]+$/.test(url)?_216:{root:_216,_v1x:1}));
}
};
if(_1de[url]){
_215.push(_1de[url]);
}else{
var _218=_1d2.syncLoadNls(mid);
if(_218){
_215.push(_218);
}else{
if(!xhr){
try{
_1d2.getText(url,true,load);
}
catch(e){
_215.push(_1de[url]={});
}
}else{
xhr.get({url:url,sync:true,load:load,error:function(){
_215.push(_1de[url]={});
}});
}
}
}
});
_214&&_214.apply(null,_215);
},_201=function(_219){
for(var _21a,_21b=_219.split("/"),_21c=dojo.global[_21b[0]],i=1;_21c&&i<_21b.length-1;_21c=_21c[_21b[i++]]){
}
if(_21c){
_21a=_21c[_21b[i]];
if(!_21a){
_21a=_21c[_21b[i].replace(/-/g,"_")];
}
if(_21a){
_1de[_219]=_21a;
}
}
return _21a;
};
_1d5.getLocalization=function(_21d,_21e,_21f){
var _220,_221=_1df(_21d,_21e,_21f).substring(10);
load(_221,(!isXd(_221)?_213:_1d2),function(_222){
_220=_222;
});
return _220;
};
if(has("dojo-unit-tests")){
_202.push(function(doh){
doh.register("tests.i18n.unit",function(t){
var _223;
_223=_212("{prop:1}");
t.is({prop:1},_223);
t.is(undefined,_223[1]);
_223=_212("({prop:1})");
t.is({prop:1},_223);
t.is(undefined,_223[1]);
_223=_212("{'prop-x':1}");
t.is({"prop-x":1},_223);
t.is(undefined,_223[1]);
_223=_212("({'prop-x':1})");
t.is({"prop-x":1},_223);
t.is(undefined,_223[1]);
_223=_212("define({'prop-x':1})");
t.is(1,_223);
_223=_212("this is total nonsense and should throw an error");
t.is(_223 instanceof Error,true);
});
});
}
}
return lang.mixin(_1d5,{dynamic:true,normalize:_1ec,load:load,cache:_1de});
});
},"dijit/hccss":function(){
define("dijit/hccss",["require","dojo/_base/config","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/ready","dojo/_base/sniff","dojo/_base/window"],function(_224,_225,_226,_227,_228,_229,has,win){
if(has("ie")||has("mozilla")){
_229(90,function(){
var div=_227.create("div",{id:"a11yTestNode",style:{cssText:"border: 1px solid;"+"border-color:red green;"+"position: absolute;"+"height: 5px;"+"top: -999px;"+"background-image: url(\""+(_225.blankGif||_224.toUrl("dojo/resources/blank.gif"))+"\");"}},win.body());
var cs=_228.getComputedStyle(div);
if(cs){
var _22a=cs.backgroundImage;
var _22b=(cs.borderTopColor==cs.borderRightColor)||(_22a!=null&&(_22a=="none"||_22a=="url(invalid-url:)"));
if(_22b){
_226.add(win.body(),"dijit_a11y");
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
define("curam/widget/menu/BannerMenuItem",["dojo","dijit/dijit","dojo/_base/declare","dijit/MenuItem"],function(dojo,_22c,_22d,_22e){
return _22d("curam.widget.menu.BannerMenuItem",[_22e],{iconSrc:"unknown",_setIconSrcAttr:{node:"iconNode",type:"attribute",attribute:"src"},iconStyle:"unknown",_setIconStyleAttr:{node:"iconNode",type:"attribute",attribute:"style"}});
});
},"curam/util/LocalConfig":function(){
define("curam/util/LocalConfig",[],function(){
var _22f=function(name){
return "curam_util_LocalConfig_"+name;
},_230=function(name,_231){
var _232=_22f(name);
if(typeof top[_232]==="undefined"){
top[_232]=_231;
}
return top[_232];
},_233=function(name){
return top[_22f(name)];
};
_230("seedValues",{}),_230("overrides",{});
var _234=function(_235,_236){
if(typeof _235!=="undefined"&&typeof _235!=="string"){
throw new Error("Invalid "+_236+" type: "+typeof _235+"; expected string");
}
};
var _237={seedOption:function(name,_238,_239){
_234(_238,"value");
_234(_239,"defaultValue");
_233("seedValues")[name]=(typeof _238!=="undefined")?_238:_239;
},overrideOption:function(name,_23a){
_234(_23a,"value");
if(typeof (Storage)!=="undefined"){
localStorage[name]=_23a;
}else{
_233("overrides")[name]=_23a;
}
},readOption:function(name,_23b){
_234(_23b,"defaultValue");
var _23c=null;
if(typeof (Storage)!=="undefined"&&typeof localStorage[name]!=="undefined"){
_23c=localStorage[name];
}else{
if(typeof _233("overrides")[name]!=="undefined"){
_23c=_233("overrides")[name];
}else{
if(typeof _233("seedValues")[name]!=="undefined"){
_23c=_233("seedValues")[name];
}else{
_23c=_23b;
}
}
}
return _23c;
},clearOption:function(name){
if(typeof (Storage)!=="undefined"){
localStorage.removeItem(name);
}
delete _233("overrides")[name];
delete _233("seedValues")[name];
}};
return _237;
});
},"dijit/PopupMenuBarItem":function(){
define("dijit/PopupMenuBarItem",["dojo/_base/declare","./PopupMenuItem","./MenuBarItem"],function(_23d,_23e,_23f){
var _240=_23f._MenuBarItemMixin;
return _23d("dijit.PopupMenuBarItem",[_23e,_240],{});
});
},"dojo/parser":function(){
define("dojo/parser",["./_base/kernel","./_base/lang","./_base/array","./_base/config","./_base/html","./_base/window","./_base/url","./_base/json","./aspect","./date/stamp","./has","./query","./on","./ready"],function(dojo,_241,_242,_243,_244,_245,_246,_247,_248,_249,has,_24a,don,_24b){
new Date("X");
if(1){
var form=document.createElement("form");
has.add("dom-attributes-explicit",form.attributes.length==0);
has.add("dom-attributes-specified-flag",form.attributes.length<40);
}
dojo.parser=new function(){
var _24c={};
function _24d(_24e){
var map={};
for(var name in _24e){
if(name.charAt(0)=="_"){
continue;
}
map[name.toLowerCase()]=name;
}
return map;
};
_248.after(_241,"extend",function(){
_24c={};
},true);
var _24f={};
function _250(type){
var map=_24f[type]||(_24f[type]={});
return map["__type"]||(map["__type"]=(_241.getObject(type)||require(type)));
};
this._functionFromScript=function(_251,_252){
var _253="";
var _254="";
var _255=(_251.getAttribute(_252+"args")||_251.getAttribute("args"));
if(_255){
_242.forEach(_255.split(/\s*,\s*/),function(part,idx){
_253+="var "+part+" = arguments["+idx+"]; ";
});
}
var _256=_251.getAttribute("with");
if(_256&&_256.length){
_242.forEach(_256.split(/\s*,\s*/),function(part){
_253+="with("+part+"){";
_254+="}";
});
}
return new Function(_253+_251.innerHTML+_254);
};
this.instantiate=function(_257,_258,_259){
_258=_258||{};
_259=_259||{};
var _25a=(_259.scope||dojo._scopeName)+"Type",_25b="data-"+(_259.scope||dojo._scopeName)+"-",_25c=_25b+"type";
var list=[];
_242.forEach(_257,function(node){
var type=_25a in _258?_258[_25a]:node.getAttribute(_25c)||node.getAttribute(_25a);
if(type){
list.push({node:node,"type":type});
}
});
return this._instantiate(list,_258,_259);
};
this._instantiate=function(_25d,_25e,_25f){
var _260=[];
var _261=(_25f.scope||dojo._scopeName)+"Type",_262="data-"+(_25f.scope||dojo._scopeName)+"-",_263=_262+"type",_264=_262+"props",_265=_262+"attach-point",_266=_262+"attach-event",_267=_262+"id",_268=_262+"mixins";
var _269={};
_242.forEach([_264,_263,_261,_267,"jsId",_265,_266,"dojoAttachPoint","dojoAttachEvent","class","style",_268],function(name){
_269[name.toLowerCase()]=name.replace(_25f.scope,"dojo");
});
function _26a(type,_26b){
return type.createSubclass&&type.createSubclass(_26b)||type.extend.apply(type,_26b);
};
_242.forEach(_25d,function(obj){
if(!obj){
return;
}
var node=obj.node,type=obj.type,_26c=node.getAttribute(_268),ctor;
if(_26c){
var map=_24f[type];
_26c=_26c.replace(/ /g,"");
ctor=map&&map[_26c];
if(!ctor){
ctor=_250(type);
ctor=_24f[type][_26c]=_26a(ctor,_242.map(_26c.split(","),_250));
}
}else{
ctor=_250(type);
}
var _26d=ctor&&ctor.prototype;
var _26e={};
if(_25f.defaults){
_241.mixin(_26e,_25f.defaults);
}
if(obj.inherited){
_241.mixin(_26e,obj.inherited);
}
var _26f;
if(has("dom-attributes-explicit")){
_26f=node.attributes;
}else{
if(has("dom-attributes-specified-flag")){
_26f=_242.filter(node.attributes,function(a){
return a.specified;
});
}else{
var _270=/^input$|^img$/i.test(node.nodeName)?node:node.cloneNode(false),_271=_270.outerHTML.replace(/=[^\s"']+|="[^"]*"|='[^']*'/g,"").replace(/^\s*<[a-zA-Z0-9]*\s*/,"").replace(/\s*>.*$/,"");
_26f=_242.map(_271.split(/\s+/),function(name){
var _272=name.toLowerCase();
return {name:name,value:(node.nodeName=="LI"&&name=="value")||_272=="enctype"?node.getAttribute(_272):node.getAttributeNode(_272).value};
});
}
}
var i=0,item;
while(item=_26f[i++]){
var name=item.name,_273=name.toLowerCase(),_274=item.value;
if(_273 in _269){
switch(_269[_273]){
case "data-dojo-props":
var _275=_274;
break;
case "data-dojo-id":
case "jsId":
var _276=_274;
break;
case "data-dojo-attach-point":
case "dojoAttachPoint":
_26e.dojoAttachPoint=_274;
break;
case "data-dojo-attach-event":
case "dojoAttachEvent":
_26e.dojoAttachEvent=_274;
break;
case "class":
_26e["class"]=node.className;
break;
case "style":
_26e["style"]=node.style&&node.style.cssText;
break;
}
}else{
if(!(name in _26d)){
var map=(_24c[type]||(_24c[type]=_24d(_26d)));
name=map[_273]||name;
}
if(name in _26d){
switch(typeof _26d[name]){
case "string":
_26e[name]=_274;
break;
case "number":
_26e[name]=_274.length?Number(_274):NaN;
break;
case "boolean":
_26e[name]=_274.toLowerCase()!="false";
break;
case "function":
if(_274===""||_274.search(/[^\w\.]+/i)!=-1){
_26e[name]=new Function(_274);
}else{
_26e[name]=_241.getObject(_274,false)||new Function(_274);
}
break;
default:
var pVal=_26d[name];
_26e[name]=(pVal&&"length" in pVal)?(_274?_274.split(/\s*,\s*/):[]):(pVal instanceof Date)?(_274==""?new Date(""):_274=="now"?new Date():_249.fromISOString(_274)):(pVal instanceof dojo._Url)?(dojo.baseUrl+_274):_247.fromJson(_274);
}
}else{
_26e[name]=_274;
}
}
}
if(_275){
try{
_275=_247.fromJson.call(_25f.propsThis,"{"+_275+"}");
_241.mixin(_26e,_275);
}
catch(e){
throw new Error(e.toString()+" in data-dojo-props='"+_275+"'");
}
}
_241.mixin(_26e,_25e);
var _277=obj.scripts||(ctor&&(ctor._noScript||_26d._noScript)?[]:_24a("> script[type^='dojo/']",node));
var _278=[],_279=[],_27a=[],on=[];
if(_277){
for(i=0;i<_277.length;i++){
var _27b=_277[i];
node.removeChild(_27b);
var _27c=(_27b.getAttribute(_262+"event")||_27b.getAttribute("event")),prop=_27b.getAttribute(_262+"prop"),_27d=_27b.getAttribute("type"),nf=this._functionFromScript(_27b,_262);
if(_27c){
if(_27d=="dojo/connect"){
_278.push({event:_27c,func:nf});
}else{
if(_27d=="dojo/on"){
on.push({event:_27c,func:nf});
}else{
_26e[_27c]=nf;
}
}
}else{
if(_27d=="dojo/watch"){
_27a.push({prop:prop,func:nf});
}else{
_279.push(nf);
}
}
}
}
var _27e=ctor.markupFactory||_26d.markupFactory;
var _27f=_27e?_27e(_26e,node,ctor):new ctor(_26e,node);
_260.push(_27f);
if(_276){
_241.setObject(_276,_27f);
}
for(i=0;i<_278.length;i++){
_248.after(_27f,_278[i].event,dojo.hitch(_27f,_278[i].func),true);
}
for(i=0;i<_279.length;i++){
_279[i].call(_27f);
}
for(i=0;i<_27a.length;i++){
_27f.watch(_27a[i].prop,_27a[i].func);
}
for(i=0;i<on.length;i++){
don(_27f,on[i].event,on[i].func);
}
},this);
if(!_25e._started){
_242.forEach(_260,function(_280){
if(!_25f.noStart&&_280&&_241.isFunction(_280.startup)&&!_280._started){
_280.startup();
}
});
}
return _260;
};
this.scan=function(root,_281){
var list=[];
var _282=(_281.scope||dojo._scopeName)+"Type",_283="data-"+(_281.scope||dojo._scopeName)+"-",_284=_283+"type",_285=_283+"textdir";
var node=root.firstChild;
var _286=_281.inherited;
if(!_286){
function _287(node,attr){
return (node.getAttribute&&node.getAttribute(attr))||(node!==_245.doc&&node!==_245.doc.documentElement&&node.parentNode?_287(node.parentNode,attr):null);
};
_286={dir:_287(root,"dir"),lang:_287(root,"lang"),textDir:_287(root,_285)};
for(var key in _286){
if(!_286[key]){
delete _286[key];
}
}
}
var _288={inherited:_286};
var _289;
var _28a;
function _28b(_28c){
if(!_28c.inherited){
_28c.inherited={};
var node=_28c.node,_28d=_28b(_28c.parent);
var _28e={dir:node.getAttribute("dir")||_28d.dir,lang:node.getAttribute("lang")||_28d.lang,textDir:node.getAttribute(_285)||_28d.textDir};
for(var key in _28e){
if(_28e[key]){
_28c.inherited[key]=_28e[key];
}
}
}
return _28c.inherited;
};
while(true){
if(!node){
if(!_288||!_288.node){
break;
}
node=_288.node.nextSibling;
_289=_288.scripts;
_28a=false;
_288=_288.parent;
continue;
}
if(node.nodeType!=1){
node=node.nextSibling;
continue;
}
if(_289&&node.nodeName.toLowerCase()=="script"){
type=node.getAttribute("type");
if(type&&/^dojo\/\w/i.test(type)){
_289.push(node);
}
node=node.nextSibling;
continue;
}
if(_28a){
node=node.nextSibling;
continue;
}
var type=node.getAttribute(_284)||node.getAttribute(_282);
var _28f=node.firstChild;
if(!type&&(!_28f||(_28f.nodeType==3&&!_28f.nextSibling))){
node=node.nextSibling;
continue;
}
var _290={node:node,scripts:_289,parent:_288};
var ctor;
try{
ctor=type&&_250(type);
}
catch(e){
}
var _291=ctor&&!ctor.prototype._noScript?[]:null;
if(type){
list.push({"type":type,node:node,scripts:_291,inherited:_28b(_290)});
}
node=_28f;
_289=_291;
_28a=ctor&&ctor.prototype.stopParser&&!(_281.template);
_288=_290;
}
return list;
};
this.parse=function(_292,_293){
var root;
if(!_293&&_292&&_292.rootNode){
_293=_292;
root=_293.rootNode;
}else{
if(_292&&_241.isObject(_292)&&!("nodeType" in _292)){
_293=_292;
}else{
root=_292;
}
}
root=root?_244.byId(root):_245.body();
_293=_293||{};
var list=this.scan(root,_293);
var _294=_293.template?{template:true}:{};
return this._instantiate(list,_294,_293);
};
}();
if(_243.parseOnLoad){
_24b(100,dojo.parser,"parse");
}
return dojo.parser;
});
},"dojox/html/_base":function(){
define("dojox/html/_base",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/xhr","dojo/_base/window","dojo/_base/sniff","dojo/_base/url","dojo/dom-construct","dojo/html","dojo/_base/declare"],function(dojo,lang,_295,_296,has,_297,_298,_299){
var html=dojo.getObject("dojox.html",true);
if(has("ie")){
var _29a=/(AlphaImageLoader\([^)]*?src=(['"]))(?![a-z]+:|\/)([^\r\n;}]+?)(\2[^)]*\)\s*[;}]?)/g;
}
var _29b=/(?:(?:@import\s*(['"])(?![a-z]+:|\/)([^\r\n;{]+?)\1)|url\(\s*(['"]?)(?![a-z]+:|\/)([^\r\n;]+?)\3\s*\))([a-z, \s]*[;}]?)/g;
var _29c=html._adjustCssPaths=function(_29d,_29e){
if(!_29e||!_29d){
return;
}
if(_29a){
_29e=_29e.replace(_29a,function(_29f,pre,_2a0,url,post){
return pre+(new _297(_29d,"./"+url).toString())+post;
});
}
return _29e.replace(_29b,function(_2a1,_2a2,_2a3,_2a4,_2a5,_2a6){
if(_2a3){
return "@import \""+(new _297(_29d,"./"+_2a3).toString())+"\""+_2a6;
}else{
return "url("+(new _297(_29d,"./"+_2a5).toString())+")"+_2a6;
}
});
};
var _2a7=/(<[a-z][a-z0-9]*\s[^>]*)(?:(href|src)=(['"]?)([^>]*?)\3|style=(['"]?)([^>]*?)\5)([^>]*>)/gi;
var _2a8=html._adjustHtmlPaths=function(_2a9,cont){
var url=_2a9||"./";
return cont.replace(_2a7,function(tag,_2aa,name,_2ab,_2ac,_2ad,_2ae,end){
return _2aa+(name?(name+"="+_2ab+(new _297(url,_2ac).toString())+_2ab):("style="+_2ad+_29c(url,_2ae)+_2ad))+end;
});
};
var _2af=html._snarfStyles=function(_2b0,cont,_2b1){
_2b1.attributes=[];
return cont.replace(/(?:<style([^>]*)>([\s\S]*?)<\/style>|<link\s+(?=[^>]*rel=['"]?stylesheet)([^>]*?href=(['"])([^>]*?)\4[^>\/]*)\/?>)/gi,function(_2b2,_2b3,_2b4,_2b5,_2b6,href){
var i,attr=(_2b3||_2b5||"").replace(/^\s*([\s\S]*?)\s*$/i,"$1");
if(_2b4){
i=_2b1.push(_2b0?_29c(_2b0,_2b4):_2b4);
}else{
i=_2b1.push("@import \""+href+"\";");
attr=attr.replace(/\s*(?:rel|href)=(['"])?[^\s]*\1\s*/gi,"");
}
if(attr){
attr=attr.split(/\s+/);
var _2b7={},tmp;
for(var j=0,e=attr.length;j<e;j++){
tmp=attr[j].split("=");
_2b7[tmp[0]]=tmp[1].replace(/^\s*['"]?([\s\S]*?)['"]?\s*$/,"$1");
}
_2b1.attributes[i-1]=_2b7;
}
return "";
});
};
var _2b8=html._snarfScripts=function(cont,_2b9){
_2b9.code="";
cont=cont.replace(/<[!][-][-](.|\s)*?[-][-]>/g,function(_2ba){
return _2ba.replace(/<(\/?)script\b/ig,"&lt;$1Script");
});
function _2bb(src){
if(_2b9.downloadRemote){
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
_295.get({url:src,sync:true,load:function(code){
_2b9.code+=code+";";
},error:_2b9.errBack});
}
};
return cont.replace(/<script\s*(?![^>]*type=['"]?(?:dojo\/|text\/html\b))(?:[^>]*?(?:src=(['"]?)([^>]*?)\1[^>]*)?)*>([\s\S]*?)<\/script>/gi,function(_2bc,_2bd,src,code){
if(src){
_2bb(src);
}else{
_2b9.code+=code;
}
return "";
});
};
var _2be=html.evalInGlobal=function(code,_2bf){
_2bf=_2bf||_296.doc.body;
var n=_2bf.ownerDocument.createElement("script");
n.type="text/javascript";
_2bf.appendChild(n);
n.text=code;
};
html._ContentSetter=dojo.declare(_299._ContentSetter,{adjustPaths:false,referencePath:".",renderStyles:false,executeScripts:false,scriptHasHooks:false,scriptHookReplacement:null,_renderStyles:function(_2c0){
this._styleNodes=[];
var st,att,_2c1,doc=this.node.ownerDocument;
var head=doc.getElementsByTagName("head")[0];
for(var i=0,e=_2c0.length;i<e;i++){
_2c1=_2c0[i];
att=_2c0.attributes[i];
st=doc.createElement("style");
st.setAttribute("type","text/css");
for(var x in att){
st.setAttribute(x,att[x]);
}
this._styleNodes.push(st);
head.appendChild(st);
if(st.styleSheet){
st.styleSheet.cssText=_2c1;
}else{
st.appendChild(doc.createTextNode(_2c1));
}
}
},empty:function(){
this.inherited("empty",arguments);
this._styles=[];
},onBegin:function(){
this.inherited("onBegin",arguments);
var cont=this.content,node=this.node;
var _2c2=this._styles;
if(lang.isString(cont)){
if(this.adjustPaths&&this.referencePath){
cont=_2a8(this.referencePath,cont);
}
if(this.renderStyles||this.cleanContent){
cont=_2af(this.referencePath,cont,_2c2);
}
if(this.executeScripts){
var _2c3=this;
var _2c4={downloadRemote:true,errBack:function(e){
_2c3._onError.call(_2c3,"Exec","Error downloading remote script in \""+_2c3.id+"\"",e);
}};
cont=_2b8(cont,_2c4);
this._code=_2c4.code;
}
}
this.content=cont;
},onEnd:function(){
var code=this._code,_2c5=this._styles;
if(this._styleNodes&&this._styleNodes.length){
while(this._styleNodes.length){
_298.destroy(this._styleNodes.pop());
}
}
if(this.renderStyles&&_2c5&&_2c5.length){
this._renderStyles(_2c5);
}
if(this.executeScripts&&code){
if(this.cleanContent){
code=code.replace(/(<!--|(?:\/\/)?-->|<!\[CDATA\[|\]\]>)/g,"");
}
if(this.scriptHasHooks){
code=code.replace(/_container_(?!\s*=[^=])/g,this.scriptHookReplacement);
}
try{
_2be(code,this.node);
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
_298.destroy(this._styleNodes.pop());
}
}
delete this._styleNodes;
dojo.mixin(this,html._ContentSetter.prototype);
}});
html.set=function(node,cont,_2c6){
if(!_2c6){
return _299._setNodeContent(node,cont,true);
}else{
var op=new html._ContentSetter(dojo.mixin(_2c6,{content:cont,node:node}));
return op.set();
}
};
return html;
});
},"url:dijit/form/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n","curam/widget/OptimalBrowserMessage":function(){
require({cache:{"url:curam/widget/templates/OptimalBrowserMessage.html":"<div>\n  <div class=\"hidden\"\n       data-dojo-type=\"dojox/layout/ContentPane\"\n       data-dojo-attach-point=\"_optimalMessage\">\n  </div>\n</div>\n"}});
define("curam/widget/OptimalBrowserMessage",["dojo/_base/declare","dojo/_base/lang","curam/util","curam/util/UIMFragment","curam/ui/ClientDataAccessor","dijit/_Widget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/form/Button","dojo/text!curam/widget/templates/OptimalBrowserMessage.html"],function(_2c7,lang,util,_2c8,_2c9,_2ca,_2cb,_2cc,_2cd,_2ce,_2cf,_2d0){
return _2c7("curam.widget.OptimalBrowserMessage",[_2ca,_2cb,_2cc],{OPTIMAL_BROWSER_MSG:"optimal-browser-msg",isExternalApp:null,optimalBrowserMsgPaddingCSS:"optimal-browser-banner",optimalBrowserNode:null,appSectionsNode:null,appBannerHeaderNode:null,intApp:"internal",extApp:"external",context:null,templateString:_2d0,widgetsInTemplate:true,baseClass:"",optimalBrowserNodeID:"_optimalMessage",_appConfig:null,postMixInProperties:function(){
this.inherited(arguments);
},startup:function(){
this.inherited(arguments);
this._init();
this._loadNodes(this._optimalMessage.id);
},_init:function(){
da=new _2c9();
da.getRaw("/config/tablayout/settings["+curam.config.appID+"]",lang.hitch(this,function(data){
console.log("External App config data:"+data);
this._appConfig=data;
this._getAppConfig();
}),function(_2d1,args){
console.log("External App config data load error:"+_2d1);
},null);
},_getAppConfig:function(){
var _2d2=this._appConfig.optimalBrowserMessageEnabled;
var _2d3=util.getTopmostWindow().dojox;
var _2d4=this._createStorageKey(this.OPTIMAL_BROWSER_MSG);
var _2d5=this;
var _2d6=false;
if(_2d2=="true"|_2d2=="TRUE"){
util.runStorageFn(function(){
_2d6=true;
_2d5.context=_2d3;
return _2d5._isOptimalBrowserCheckDue(_2d3,_2d4,_2d5);
});
if(!_2d6){
return this._isOptimalBrowserCheckDue(this.context,_2d4,_2d5);
}
}
return false;
},_isOptimalBrowserCheckDue:function(_2d7,_2d8,_2d9){
if(_2d7!=undefined){
var _2da=_2d7.storage.get(_2d8);
if(_2da&&_2da!=""){
if(new Date(_2d9._getTargetDate())>new Date(_2da)){
_2d9._executeBrowserVersionCheck(_2d7);
return true;
}
}else{
_2d9._executeBrowserVersionCheck(_2d7);
return true;
}
return false;
}
},_executeBrowserVersionCheck:function(_2db){
var _2dc=this._appConfig.ieMinVersion;
var _2dd=this._appConfig.ieMaxVersion;
var _2de=this._appConfig.ffMinVersion;
var _2df=this._appConfig.ffMaxVersion;
var _2e0=this._appConfig.chromeMinVersion;
var _2e1=this._appConfig.chromeMaxVersion;
var _2e2=this._appConfig.safariMinVersion;
var _2e3=this._appConfig.safariMaxVersion;
var _2e4=dojo.isIE;
var _2e5=dojo.isFF;
var _2e6=dojo.isChrome;
var _2e7=dojo.isSafari;
if(_2e4!=undefined){
return this._isCurrentBrowserVerSupported(_2db,_2e4,_2dc,_2dd);
}else{
if(_2e5!=undefined&&this.isExternalApp){
return this._isCurrentBrowserVerSupported(_2db,_2e5,_2de,_2df);
}else{
if(_2e6!=undefined){
return this._isCurrentBrowserVerSupported(_2db,_2e6,_2e0,_2e1);
}else{
if(_2e7!=undefined&&this.isExternalApp){
return this._isCurrentBrowserVerSupported(_2db,_2e7,_2e2,_2e3);
}
}
}
}
return false;
},_isCurrentBrowserVerSupported:function(_2e8,_2e9,_2ea,_2eb){
var _2ec=false;
if(_2ea>0){
if(_2e9<_2ea){
_2ec=true;
this._displayOptimalBrowserMsg(_2e8);
return true;
}
}
if(_2eb>0&&!_2ec){
if(_2e9>_2eb){
this._displayOptimalBrowserMsg(_2e8);
return true;
}
}
return false;
},_displayOptimalBrowserMsg:function(_2ed){
this._addOrRemoveCssForInternalApp(true,this.optimalBrowserMsgPaddingCSS);
_2c8.get({url:"optimal-browser-msg-fragment.jspx",targetID:this._optimalMessage.id});
this._postRenderingTasks(_2ed);
},_postRenderingTasks:function(_2ee){
var _2ef=this._optimalMessage.id;
dojo.addOnLoad(function(){
var _2f0=dojo.byId(_2ef);
dojo.removeClass(_2f0,_2f0.className);
});
if(_2ee.storage!=undefined){
_2ee.storage.put(this._createStorageKey(this.OPTIMAL_BROWSER_MSG),this._getTargetDate(this._appConfig.nextBrowserCheck));
}
return _2ee;
},_loadNodes:function(_2f1){
dojo.addOnLoad(function(){
this.optimalBrowserNode=dojo.byId(_2f1);
this.appSectionsNode=dojo.byId("app-sections-container-dc");
this.appBannerHeaderNode=dojo.byId("app-header-container-dc");
});
},_createStorageKey:function(_2f2){
if(this.isExternalApp){
_2f2=_2f2+"_"+this.extApp;
}else{
_2f2=_2f2+"_"+this.intApp;
}
return _2f2;
},_addOrRemoveCssForInternalApp:function(_2f3,_2f4){
var _2f5=this.isExternalApp;
dojo.addOnLoad(function(){
if(!_2f5){
if(_2f3){
dojo.addClass(this.appSectionsNode,_2f4);
if(this.appBannerHeaderNode){
dojo.addClass(this.appSectionsNode.children.item(1),_2f4);
dojo.addClass(this.appSectionsNode.children.item(2),_2f4);
}
}else{
dojo.removeClass(this.appSectionsNode,_2f4);
if(this.appBannerHeaderNode){
dojo.removeClass(this.appSectionsNode.children.item(1),_2f4);
dojo.removeClass(this.appSectionsNode.children.item(2),_2f4);
}
}
}
});
},_getTargetDate:function(_2f6){
var _2f7=new Date();
if(_2f6==undefined){
_2f7.setDate(_2f7.getDate());
}else{
_2f7.setDate(_2f7.getDate()+_2f6);
}
return _2f7.toUTCString();
},exitOptimalBrowserMessageBox:function(){
var _2f8=dojo.byId(this._optimalMessage.id);
if(_2f8){
_2f8.parentNode.removeChild(_2f8);
}
this._addOrRemoveCssForInternalApp(false,this.optimalBrowserMsgPaddingCSS);
}});
});
},"dijit/form/ToggleButton":function(){
define("dijit/form/ToggleButton",["dojo/_base/declare","dojo/_base/kernel","./Button","./_ToggleButtonMixin"],function(_2f9,_2fa,_2fb,_2fc){
return _2f9("dijit.form.ToggleButton",[_2fb,_2fc],{baseClass:"dijitToggleButton",setChecked:function(_2fd){
_2fa.deprecated("setChecked("+_2fd+") is deprecated. Use set('checked',"+_2fd+") instead.","","2.0");
this.set("checked",_2fd);
}});
});
},"dojo/date/stamp":function(){
define("dojo/date/stamp",["../_base/kernel","../_base/lang","../_base/array"],function(dojo,lang,_2fe){
lang.getObject("date.stamp",true,dojo);
dojo.date.stamp.fromISOString=function(_2ff,_300){
if(!dojo.date.stamp._isoRegExp){
dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
}
var _301=dojo.date.stamp._isoRegExp.exec(_2ff),_302=null;
if(_301){
_301.shift();
if(_301[1]){
_301[1]--;
}
if(_301[6]){
_301[6]*=1000;
}
if(_300){
_300=new Date(_300);
_2fe.forEach(_2fe.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(prop){
return _300["get"+prop]();
}),function(_303,_304){
_301[_304]=_301[_304]||_303;
});
}
_302=new Date(_301[0]||1970,_301[1]||0,_301[2]||1,_301[3]||0,_301[4]||0,_301[5]||0,_301[6]||0);
if(_301[0]<100){
_302.setFullYear(_301[0]||1970);
}
var _305=0,_306=_301[7]&&_301[7].charAt(0);
if(_306!="Z"){
_305=((_301[8]||0)*60)+(Number(_301[9])||0);
if(_306!="-"){
_305*=-1;
}
}
if(_306){
_305-=_302.getTimezoneOffset();
}
if(_305){
_302.setTime(_302.getTime()+_305*60000);
}
}
return _302;
};
dojo.date.stamp.toISOString=function(_307,_308){
var _309=function(n){
return (n<10)?"0"+n:n;
};
_308=_308||{};
var _30a=[],_30b=_308.zulu?"getUTC":"get",date="";
if(_308.selector!="time"){
var year=_307[_30b+"FullYear"]();
date=["0000".substr((year+"").length)+year,_309(_307[_30b+"Month"]()+1),_309(_307[_30b+"Date"]())].join("-");
}
_30a.push(date);
if(_308.selector!="date"){
var time=[_309(_307[_30b+"Hours"]()),_309(_307[_30b+"Minutes"]()),_309(_307[_30b+"Seconds"]())].join(":");
var _30c=_307[_30b+"Milliseconds"]();
if(_308.milliseconds){
time+="."+(_30c<100?"0":"")+_309(_30c);
}
if(_308.zulu){
time+="Z";
}else{
if(_308.selector!="time"){
var _30d=_307.getTimezoneOffset();
var _30e=Math.abs(_30d);
time+=(_30d>0?"-":"+")+_309(Math.floor(_30e/60))+":"+_309(_30e%60);
}
}
_30a.push(time);
}
return _30a.join("T");
};
return dojo.date.stamp;
});
},"dojo/Stateful":function(){
define("dojo/Stateful",["./_base/declare","./_base/lang","./_base/array"],function(_30f,lang,_310){
return _30f("dojo.Stateful",null,{postscript:function(_311){
if(_311){
lang.mixin(this,_311);
}
},get:function(name){
return this[name];
},set:function(name,_312){
if(typeof name==="object"){
for(var x in name){
if(name.hasOwnProperty(x)&&x!="_watchCallbacks"){
this.set(x,name[x]);
}
}
return this;
}
var _313=this[name];
this[name]=_312;
if(this._watchCallbacks){
this._watchCallbacks(name,_313,_312);
}
return this;
},watch:function(name,_314){
var _315=this._watchCallbacks;
if(!_315){
var self=this;
_315=this._watchCallbacks=function(name,_316,_317,_318){
var _319=function(_31a){
if(_31a){
_31a=_31a.slice();
for(var i=0,l=_31a.length;i<l;i++){
_31a[i].call(self,name,_316,_317);
}
}
};
_319(_315["_"+name]);
if(!_318){
_319(_315["*"]);
}
};
}
if(!_314&&typeof name==="function"){
_314=name;
name="*";
}else{
name="_"+name;
}
var _31b=_315[name];
if(typeof _31b!=="object"){
_31b=_315[name]=[];
}
_31b.push(_314);
return {unwatch:function(){
_31b.splice(_310.indexOf(_31b,_314),1);
}};
}});
});
},"dijit/form/ComboButton":function(){
require({cache:{"url:dijit/form/templates/ComboButton.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" data-dojo-attach-point=\"buttonNode\" data-dojo-attach-event=\"ondijitclick:_onClick,onkeypress:_onButtonKeyPress\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" data-dojo-attach-point=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdata-dojo-attach-point=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdata-dojo-attach-event=\"onkeypress:_onArrowKeyPress\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" data-dojo-attach-point=\"valueNode\"\n\t\t/></td></tr></tbody\n></table>\n"}});
define("dijit/form/ComboButton",["dojo/_base/declare","dojo/_base/event","dojo/keys","../focus","./DropDownButton","dojo/text!./templates/ComboButton.html"],function(_31c,_31d,keys,_31e,_31f,_320){
return _31c("dijit.form.ComboButton",_31f,{templateString:_320,_setIdAttr:"",_setTabIndexAttr:["focusNode","titleNode"],_setTitleAttr:"titleNode",optionsTitle:"",baseClass:"dijitComboButton",cssStateNodes:{"buttonNode":"dijitButtonNode","titleNode":"dijitButtonContents","_popupStateNode":"dijitDownArrowButton"},_focusedNode:null,_onButtonKeyPress:function(evt){
if(evt.charOrCode==keys[this.isLeftToRight()?"RIGHT_ARROW":"LEFT_ARROW"]){
_31e.focus(this._popupStateNode);
_31d.stop(evt);
}
},_onArrowKeyPress:function(evt){
if(evt.charOrCode==keys[this.isLeftToRight()?"LEFT_ARROW":"RIGHT_ARROW"]){
_31e.focus(this.titleNode);
_31d.stop(evt);
}
},focus:function(_321){
if(!this.disabled){
_31e.focus(_321=="start"?this.titleNode:this._popupStateNode);
}
}});
});
},"dijit/_base/window":function(){
define("dijit/_base/window",["dojo/window",".."],function(_322,_323){
_323.getDocumentWindow=function(doc){
return _322.get(doc);
};
});
},"dijit/PopupMenuItem":function(){
define("dijit/PopupMenuItem",["dojo/_base/declare","dojo/dom-style","dojo/query","dojo/_base/window","./registry","./MenuItem","./hccss"],function(_324,_325,_326,win,_327,_328){
return _324("dijit.PopupMenuItem",_328,{_fillContent:function(){
if(this.srcNodeRef){
var _329=_326("*",this.srcNodeRef);
this.inherited(arguments,[_329[0]]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(!this.popup){
var node=_326("[widgetId]",this.dropDownContainer)[0];
this.popup=_327.byNode(node);
}
win.body().appendChild(this.popup.domNode);
this.popup.startup();
this.popup.domNode.style.display="none";
if(this.arrowWrapper){
_325.set(this.arrowWrapper,"visibility","");
}
this.focusNode.setAttribute("aria-haspopup","true");
},destroyDescendants:function(_32a){
if(this.popup){
if(!this.popup._destroyed){
this.popup.destroyRecursive(_32a);
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
dojo.mixin(dojo.global.curam.define,{singleton:function(_32b,_32c){
var _32d=_32b.split(".");
var _32e=window;
for(var i=0;i<_32d.length;i++){
var part=_32d[i];
if(typeof _32e[part]=="undefined"){
_32e[part]={};
}
_32e=_32e[part];
}
if(_32c){
dojo.mixin(_32e,_32c);
}
}});
return dojo.global.curam.define;
});
},"idx/oneui/MenuDialog":function(){
require({cache:{"url:idx/oneui/templates/MenuDialog.html":"<div role=\"presentation\">\r\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\r\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" data-dojo-attach-point=\"containerNode\" role=\"dialog\" tabIndex=\"-1\"></div>\r\n\t</div>\r\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\" data-dojo-attach-point=\"connectorNode\"></div>\r\n</div>\r\n"}});
define("idx/oneui/MenuDialog",["dojo/_base/declare","dojo/_base/array","dojo/_base/connect","dojo/_base/event","dojo/_base/lang","dojo/_base/sniff","dojo/_base/window","dojo/aspect","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/io/iframe","dojo/keys","dojo/window","dijit/popup","dijit/TooltipDialog","idx/oneui/_EventTriggerMixin","dojo/text!../oneui/templates/MenuDialog.html"],function(_32f,_330,_331,_332,lang,has,win,_333,dom,_334,_335,_336,_337,keys,_338,_339,_33a,_33b,_33c){
function _33d(node){
return (node.nodeName==="TEXTAREA")||((node.nodeName==="INPUT")&&(node.type==="text"));
};
return _32f("idx.oneui.MenuDialog",[_33a,_33b],{baseClass:"oneuiMenuDialog",_closeOnBlur:false,hoverToOpen:true,isShowingNow:false,leftClickToOpen:false,parentMenu:null,refocus:true,templateString:_33c,useConnector:false,postCreate:function(){
this.inherited(arguments);
var l=this.isLeftToRight();
this._nextMenuKey=l?keys.RIGHT_ARROW:keys.LEFT_ARROW;
this._prevMenuKey=l?keys.LEFT_ARROW:keys.RIGHT_ARROW;
this.connect(this.domNode,"onkeypress","_onDomNodeKeypress");
if(this.contextMenuForWindow){
this.bindDomNode(win.body());
}else{
_330.forEach(this.targetNodeIds,function(_33e){
this.bindDomNode(_33e);
},this);
}
},_onDomNodeKeypress:function(evt){
var _33f=evt.target||evt.srcElement,_340=false;
if(this.parentMenu&&!evt.ctrlKey&&!evt.altKey&&(!_33f||!_33d(_33f))){
switch(evt.charOrCode){
case this._nextMenuKey:
this.parentMenu._getTopMenu().focusNext();
_340=true;
break;
case this._prevMenuKey:
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
_340=true;
break;
}
}
if(_340){
_332.stop(evt);
}else{
this.inherited(arguments);
}
},_getMenuForDialog:function(){
var _341=this.getChildren(),_342;
for(var i=0;!_342&&(i<_341.length);i++){
if(_341[i]&&_341[i].menuForDialog){
_342=_341[i];
}
}
return _342;
},_getFocusItems:function(){
this.inherited(arguments);
if(this._firstFocusItem==this.domNode){
this._firstFocusItem=this.containerNode;
}
if(this._lastFocusItem==this.domNode){
this._lastFocusItem=this.containerNode;
}
},_onTrigger:function(_343){
var _344=null;
if(!_343.additionalData.leftClickToOpen&&("pageX" in _343.event)){
_344={x:_343.event.pageX,y:_343.event.pageY};
if(_343.triggerNode.tagName==="IFRAME"){
var ifc=_335.position(_343.triggerNode,true),_345=win.withGlobal(_338.get(_337.doc(_343.triggerNode)),"docScroll",_335);
var cs=_336.getComputedStyle(_343.triggerNode),tp=_336.toPixelValue,left=(has("ie")&&has("quirks")?0:tp(_343.triggerNode,cs.paddingLeft))+(has("ie")&&has("quirks")?tp(_343.triggerNode,cs.borderLeftWidth):0),top=(has("ie")&&has("quirks")?0:tp(_343.triggerNode,cs.paddingTop))+(has("ie")&&has("quirks")?tp(_343.triggerNode,cs.borderTopWidth):0);
_344.x+=ifc.x+left-_345.x;
_344.y+=ifc.y+top-_345.y;
}
}
if(!this._openTimer){
this._openTimer=setTimeout(lang.hitch(this,function(){
delete this._openTimer;
this.open({around:_343.triggerNode,coords:_344,position:_343.additionalData.popupPosition,useConnector:_343.additionalData.useConnector});
}),1);
}
if(_343.event.type!="hover"){
_332.stop(_343.event);
}
},onBlur:function(){
this.inherited(arguments);
if(this._closeOnBlur){
this.close();
}
},open:function(args){
var _346=null;
if(this.refocus){
_346=this._focusManager.get("curNode");
if(!_346||dom.isDescendant(_346,this.domNode)){
_346=this._focusManager.get("prevNode");
}
if(dom.isDescendant(_346,this.domNode)){
_346=null;
}
}
var _347=(args&&(args.coords?{x:args.coords.x,y:args.coords.y,w:0,h:0}:args.around))||_346||this._focusManager.get("curNode")||{x:0,y:0,w:0,h:0};
var _348=lang.hitch(this,function(){
if(_346){
_346.focus();
}
this.close();
});
this._useConnectorForPopup=(args&&("useConnector" in args))?args.useConnector:this.useConnector;
_339.open({popup:this,around:_347,onExecute:_348,onCancel:_348,orient:(args&&("position" in args))?args.position:this.popupPosition});
delete this._useConnectorForPopup;
this.focus();
this._closeOnBlur=true;
},close:function(){
_339.close(this);
},bindDomNode:function(node,_349){
var _34a=lang.delegate(this);
for(var name in _349){
_34a[name]=_349[name];
}
this._addEventTrigger(node,"click",function(_34b){
return _34a.leftClickToOpen;
},_34a);
this._addEventTrigger(node,"contextmenu",function(_34c){
return !_34a.leftClickToOpen;
},_34a);
this._addEventTrigger(node,"keydown",function(_34d){
return !_34a.leftClickToOpen&&_34d.event.shiftKey&&(_34d.event.keyCode==keys.F10);
},_34a);
this._addEventTrigger(node,"hover",function(_34e){
return _34a.hoverToOpen;
},_34a);
},unBindDomNode:function(_34f){
this._removeEventTriggers(_34f);
},_layoutNodes:function(_350,_351,_352,_353){
var _354=_353?"oneuiMenuDialogConnected":"",_355="",_356=_352&&(_352.length>=1)&&_352.charAt(0),_357=_352&&(_352.length>=2)&&_352.charAt(1),_358=_335.getContentBox(this.domNode),_359,_35a,_35b=function(node){
var _35c=node.style,_35d=_35c.display,_35e=_35c.visibility;
if(_35c.display=="none"){
_35c.visibility="hidden";
_35c.display="";
}
var _35f=_335.getContentBox(node);
_35c.display=_35d;
_35c.visibility=_35e;
return _35f;
};
if((_356==="M")||((_357!=="M")&&(_357!==_351.charAt(1)))){
_354+=" dijitTooltip"+(_357==="L"?"Right":"Left");
switch(_356){
case "M":
_354+=" dijitTooltipLRMiddle";
break;
case "T":
_354+=" dijitTooltipLRTop";
_353&&(_355="connectorNearTopEdge");
if(_350.h>0){
_359="top";
_35a=Math.max(4,4+Math.min(_35b(this.domNode.parentNode).h-24,_350.h/2))+"px";
}
break;
case "B":
_354+=" dijitTooltipLRBottom";
_353&&(_355="connectorNearBottomEdge");
if(_350.h>0){
_359="bottom";
_35a=(4+Math.min(_35b(this.domNode.parentNode).h-24,_350.h/2))+"px";
}
break;
}
}else{
_354+=" dijitTooltip"+(_356==="T"?"Below":"Above");
switch(_357){
case "M":
_354+=" dijitTooltipABMiddle";
break;
case "L":
_354+=" dijitTooltipABLeft";
_353&&(_355="connectorNearLeftEdge");
if(_350.w>0){
_359="left";
_35a=Math.max(4,4+Math.min(_35b(this.domNode.parentNode).w-16,_350.w/2))+"px";
}
break;
case "R":
_354+=" dijitTooltipABRight";
_353&&(_355="connectorNearRightEdge");
if(_350.h>0){
_359="right";
_35a=(4+Math.min(_35b(this.domNode.parentNode).w-24,_350.w/2))+"px";
}
break;
}
}
_334.replace(this.domNode,_354,this._currentOrientClass||"");
this._currentOrientClass=_354;
_334.replace(this.domNode.parentNode,_355,this._currentConnectorClass||"");
this._currentConnectorClass=_355;
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
this.connectorNode.style.left="";
this.connectorNode.style.right="";
if(_359){
this.connectorNode.style[_359]=_35a;
}
},orient:function(node,_360,_361,_362,_363){
this._layoutNodes(_363,_360,_361,("_useConnectorForPopup" in this)?this._useConnectorForPopup:this.useConnector);
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
var _364=lang.hitch(this,this.onExecute);
this._handleexecute=menu.on("execute",_364);
if(this._handleopen){
this._handleopen.remove();
}
this._handleopen=_333.after(menu,"_openPopup",function(){
var _365=_339._stack[_339._stack.length-1];
if(!_365._menuregistered){
_365._menuregistered=true;
_365.handlers.push(_333.around(_365,"onExecute",function(_366){
return function(){
_366.apply(this,arguments);
_364();
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
define("dijit/_OnDijitClickMixin",["dojo/on","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(on,_367,keys,_368,has,_369,win){
var _36a=null;
if(has("ie")){
(function(){
var _36b=function(evt){
_36a=evt.srcElement;
};
win.doc.attachEvent("onkeydown",_36b);
_369.addOnWindowUnload(function(){
win.doc.detachEvent("onkeydown",_36b);
});
})();
}else{
win.doc.addEventListener("keydown",function(evt){
_36a=evt.target;
},true);
}
var _36c=function(node,_36d){
if(/input|button/i.test(node.nodeName)){
return on(node,"click",_36d);
}else{
function _36e(e){
return (e.keyCode==keys.ENTER||e.keyCode==keys.SPACE)&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey;
};
var _36f=[on(node,"keypress",function(e){
if(_36e(e)){
_36a=e.target;
e.preventDefault();
}
}),on(node,"keyup",function(e){
if(_36e(e)&&e.target==_36a){
_36a=null;
_36d.call(this,e);
}
}),on(node,"click",function(e){
_36d.call(this,e);
})];
return {remove:function(){
_367.forEach(_36f,function(h){
h.remove();
});
}};
}
};
return _368("dijit._OnDijitClickMixin",null,{connect:function(obj,_370,_371){
return this.inherited(arguments,[obj,_370=="ondijitclick"?_36c:_370,_371]);
}});
});
},"idx/oneui/_MenuOpenOnHoverMixin":function(){
define("idx/oneui/_MenuOpenOnHoverMixin",["dojo/_base/declare"],function(_372){
var dojo={},_373={};
return _372("idx.oneui._MenuOpenOnHoverMixin",null,{openOnHover:true,_isActuallyActive:false,_setOpenOnHoverAttr:function(_374){
this.openOnHover=_374;
if(_374){
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
var _375=this._isActuallyActive;
this._markActive();
this._isActuallyActive=_375;
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
var b,t,w,h,rx,ry,dx=0,dy=0,_376,_377;
for(var n=e.target;n;){
if(n.nodeType==1&&(n.tagName.toLowerCase() in dojo.dnd._validNodes)){
var s=dojo.getComputedStyle(n),_378=(s.overflow.toLowerCase() in dojo.dnd._validOverflow),_379=(s.overflowX.toLowerCase() in dojo.dnd._validOverflow),_37a=(s.overflowY.toLowerCase() in dojo.dnd._validOverflow);
if(_378||_379||_37a){
b=dojo._getContentBox(n,s);
t=dojo.position(n,true);
}
if(_378||_379){
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
_376=n.scrollLeft;
n.scrollLeft=n.scrollLeft+dx;
}
}
if(_378||_37a){
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
_377=n.scrollTop;
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
var _37b=dojo.dnd.Moveable.prototype.onMove;
dojo.declare("dojo.dnd.TimedMoveable",dojo.dnd.Moveable,{timeout:40,constructor:function(node,_37c){
if(!_37c){
_37c={};
}
if(_37c.timeout&&typeof _37c.timeout=="number"&&_37c.timeout>=0){
this.timeout=_37c.timeout;
}
},onMoveStop:function(_37d){
if(_37d._timer){
clearTimeout(_37d._timer);
_37b.call(this,_37d,_37d._leftTop);
}
dojo.dnd.Moveable.prototype.onMoveStop.apply(this,arguments);
},onMove:function(_37e,_37f){
_37e._leftTop=_37f;
if(!_37e._timer){
var _380=this;
_37e._timer=setTimeout(function(){
_37e._timer=null;
_37b.call(_380,_37e,_37e._leftTop);
},this.timeout);
}
}});
return dojo.dnd.TimedMoveable;
});
},"dojo/cookie":function(){
define("dojo/cookie",["./_base/kernel","./regexp"],function(dojo,_381){
dojo.cookie=function(name,_382,_383){
var c=document.cookie,ret;
if(arguments.length==1){
var _384=c.match(new RegExp("(?:^|; )"+_381.escapeString(name)+"=([^;]*)"));
ret=_384?decodeURIComponent(_384[1]):undefined;
}else{
_383=_383||{};
var exp=_383.expires;
if(typeof exp=="number"){
var d=new Date();
d.setTime(d.getTime()+exp*24*60*60*1000);
exp=_383.expires=d;
}
if(exp&&exp.toUTCString){
_383.expires=exp.toUTCString();
}
_382=encodeURIComponent(_382);
var _385=name+"="+_382,_386;
for(_386 in _383){
_385+="; "+_386;
var _387=_383[_386];
if(_387!==true){
_385+="="+_387;
}
}
document.cookie=_385;
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
},"dijit/_base/popup":function(){
define("dijit/_base/popup",["dojo/dom-class","../popup","../BackgroundIframe"],function(_388,_389){
var _38a=_389._createWrapper;
_389._createWrapper=function(_38b){
if(!_38b.declaredClass){
_38b={_popupWrapper:(_38b.parentNode&&_388.contains(_38b.parentNode,"dijitPopup"))?_38b.parentNode:null,domNode:_38b,destroy:function(){
}};
}
return _38a.call(this,_38b);
};
var _38c=_389.open;
_389.open=function(args){
if(args.orient&&typeof args.orient!="string"&&!("length" in args.orient)){
var ary=[];
for(var key in args.orient){
ary.push({aroundCorner:key,corner:args.orient[key]});
}
args.orient=ary;
}
return _38c.call(this,args);
};
return _389;
});
},"url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n","dojo/_base/url":function(){
define("dojo/_base/url",["./kernel"],function(dojo){
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$"),_38d=function(){
var n=null,_38e=arguments,uri=[_38e[0]];
for(var i=1;i<_38e.length;i++){
if(!_38e[i]){
continue;
}
var _38f=new _38d(_38e[i]+""),_390=new _38d(uri[0]+"");
if(_38f.path==""&&!_38f.scheme&&!_38f.authority&&!_38f.query){
if(_38f.fragment!=n){
_390.fragment=_38f.fragment;
}
_38f=_390;
}else{
if(!_38f.scheme){
_38f.scheme=_390.scheme;
if(!_38f.authority){
_38f.authority=_390.authority;
if(_38f.path.charAt(0)!="/"){
var path=_390.path.substring(0,_390.path.lastIndexOf("/")+1)+_38f.path;
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
_38f.path=segs.join("/");
}
}
}
}
uri=[];
if(_38f.scheme){
uri.push(_38f.scheme,":");
}
if(_38f.authority){
uri.push("//",_38f.authority);
}
uri.push(_38f.path);
if(_38f.query){
uri.push("?",_38f.query);
}
if(_38f.fragment){
uri.push("#",_38f.fragment);
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
_38d.prototype.toString=function(){
return this.uri;
};
return dojo._Url=_38d;
});
},"url:idx/oneui/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\r\n\t<tbody class=\"dijitReset\">\r\n\t\t<tr data-dojo-attach-point=\"_columnContainerNode\">\r\n\t\t\t<td class=\"dijitReset oneuiMenuColumn\" data-dojo-attach-point=\"columnNodes\">\r\n\t\t\t\t<table class=\"dijitReset\" cellspacing=\"0\" width=\"100%\" role=\"presentation\">\r\n\t\t\t\t\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"_containerNodes,containerNode\">\r\n<!-- this is column 0, which also starts out as the container node so menu items are initially loaded here.\r\n     containerNode changes to point to _columnContainerNode once the widget has initialised, so the whole set of columns is the container.\r\n\t this must be kept in synch with _MenuColumn.html -->\r\n\t\t\t\t\t</tbody>\r\n\t\t\t\t</table>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</tbody>\r\n</table>\r\n","url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n","dojo/text":function(){
define("dojo/text",["./_base/kernel","require","./has","./_base/xhr"],function(dojo,_391,has,xhr){
var _392;
if(1){
_392=function(url,sync,load){
xhr("GET",{url:url,sync:!!sync,load:load});
};
}else{
if(_391.getText){
_392=_391.getText;
}else{
console.error("dojo/text plugin failed to load because loader does not support getText");
}
}
var _393={},_394=function(text){
if(text){
text=text.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _395=text.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_395){
text=_395[1];
}
}else{
text="";
}
return text;
},_396={},_397={},_398={dynamic:true,normalize:function(id,_399){
var _39a=id.split("!"),url=_39a[0];
return (/^\./.test(url)?_399(url):url)+(_39a[1]?"!"+_39a[1]:"");
},load:function(id,_39b,load){
var _39c=id.split("!"),_39d=_39c.length>1,_39e=_39c[0],url=_39b.toUrl(_39c[0]),text=_396,_39f=function(text){
load(_39d?_394(text):text);
};
if(_39e in _393){
text=_393[_39e];
}else{
if(url in _39b.cache){
text=_39b.cache[url];
}else{
if(url in _393){
text=_393[url];
}
}
}
if(text===_396){
if(_397[url]){
_397[url].push(_39f);
}else{
var _3a0=_397[url]=[_39f];
_392(url,!_39b.async,function(text){
_393[_39e]=_393[url]=text;
for(var i=0;i<_3a0.length;){
_3a0[i++](text);
}
delete _397[url];
});
}
}else{
_39f(text);
}
}};
dojo.cache=function(_3a1,url,_3a2){
var key;
if(typeof _3a1=="string"){
if(/\//.test(_3a1)){
key=_3a1;
_3a2=url;
}else{
key=_391.toUrl(_3a1.replace(/\./g,"/")+(url?("/"+url):""));
}
}else{
key=_3a1+"";
_3a2=url;
}
var val=(_3a2!=undefined&&typeof _3a2!="string")?_3a2.value:_3a2,_3a3=_3a2&&_3a2.sanitize;
if(typeof val=="string"){
_393[key]=val;
return _3a3?_394(val):val;
}else{
if(val===null){
delete _393[key];
return null;
}else{
if(!(key in _393)){
_392(key,true,function(text){
_393[key]=text;
});
}
return _3a3?_394(_393[key]):_393[key];
}
}
};
return _398;
});
},"dojo/uacss":function(){
define("dojo/uacss",["./dom-geometry","./_base/lang","./ready","./_base/sniff","./_base/window"],function(_3a4,lang,_3a5,has,_3a6){
var html=_3a6.doc.documentElement,ie=has("ie"),_3a7=has("opera"),maj=Math.floor,ff=has("ff"),_3a8=_3a4.boxModel.replace(/-/,""),_3a9={"dj_quirks":has("quirks"),"dj_opera":_3a7,"dj_khtml":has("khtml"),"dj_webkit":has("webkit"),"dj_safari":has("safari"),"dj_chrome":has("chrome"),"dj_gecko":has("mozilla")};
if(ie){
_3a9["dj_ie"]=true;
_3a9["dj_ie"+maj(ie)]=true;
_3a9["dj_iequirks"]=has("quirks");
}
if(ff){
_3a9["dj_ff"+maj(ff)]=true;
}
_3a9["dj_"+_3a8]=true;
var _3aa="";
for(var clz in _3a9){
if(_3a9[clz]){
_3aa+=clz+" ";
}
}
html.className=lang.trim(html.className+" "+_3aa);
_3a5(90,function(){
if(!_3a4.isBodyLtr()){
var _3ab="dj_rtl dijitRtl "+_3aa.replace(/ /g,"-rtl ");
html.className=lang.trim(html.className+" "+_3ab+"dj_rtl dijitRtl "+_3aa.replace(/ /g,"-rtl "));
}
});
return has;
});
},"dijit/Tooltip":function(){
require({cache:{"url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n"}});
define("dijit/Tooltip",["dojo/_base/array","dojo/_base/declare","dojo/_base/fx","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/_base/sniff","dojo/_base/window","./_base/manager","./place","./_Widget","./_TemplatedMixin","./BackgroundIframe","dojo/text!./templates/Tooltip.html","."],function(_3ac,_3ad,fx,dom,_3ae,_3af,_3b0,lang,has,win,_3b1,_3b2,_3b3,_3b4,_3b5,_3b6,_3b7){
var _3b8=_3ad("dijit._MasterTooltip",[_3b3,_3b4],{duration:_3b1.defaultDuration,templateString:_3b6,postCreate:function(){
win.body().appendChild(this.domNode);
this.bgIframe=new _3b5(this.domNode);
this.fadeIn=fx.fadeIn({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onShow")});
this.fadeOut=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHide")});
},show:function(_3b9,_3ba,_3bb,rtl,_3bc){
if(this.aroundNode&&this.aroundNode===_3ba&&this.containerNode.innerHTML==_3b9){
return;
}
this.domNode.width="auto";
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_3b9;
if(_3bc){
this.set("textDir",_3bc);
}
this.containerNode.align=rtl?"right":"left";
var pos=_3b2.around(this.domNode,_3ba,_3bb&&_3bb.length?_3bb:_3bd.defaultPosition,!rtl,lang.hitch(this,"orient"));
var _3be=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_3be.y+((_3be.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_3be.x+((_3be.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}
}
_3b0.set(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_3ba;
},orient:function(node,_3bf,_3c0,_3c1,_3c2){
this.connectorNode.style.top="";
var _3c3=_3c1.w-this.connectorNode.offsetWidth;
node.className="dijitTooltip "+{"MR-ML":"dijitTooltipRight","ML-MR":"dijitTooltipLeft","TM-BM":"dijitTooltipAbove","BM-TM":"dijitTooltipBelow","BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_3bf+"-"+_3c0];
this.domNode.style.width="auto";
var size=_3af.getContentBox(this.domNode);
var _3c4=Math.min((Math.max(_3c3,1)),size.w);
var _3c5=_3c4<size.w;
this.domNode.style.width=_3c4+"px";
if(_3c5){
this.containerNode.style.overflow="auto";
var _3c6=this.containerNode.scrollWidth;
this.containerNode.style.overflow="visible";
if(_3c6>_3c4){
_3c6=_3c6+_3b0.get(this.domNode,"paddingLeft")+_3b0.get(this.domNode,"paddingRight");
this.domNode.style.width=_3c6+"px";
}
}
if(_3c0.charAt(0)=="B"&&_3bf.charAt(0)=="B"){
var mb=_3af.getMarginBox(node);
var _3c7=this.connectorNode.offsetHeight;
if(mb.h>_3c1.h){
var _3c8=_3c1.h-((_3c2.h+_3c7)>>1);
this.connectorNode.style.top=_3c8+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_3c2.h/2-_3c7/2,0),mb.h-_3c7)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_3c3);
},_onShow:function(){
if(has("ie")){
this.domNode.style.filter="";
}
},hide:function(_3c9){
if(this._onDeck&&this._onDeck[1]==_3c9){
this._onDeck=null;
}else{
if(this.aroundNode===_3c9){
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
_3ac.forEach(node.children,function(_3ca){
this._setAutoTextDir(_3ca);
},this);
},_setTextDirAttr:function(_3cb){
this._set("textDir",_3cb);
if(_3cb=="auto"){
this._setAutoTextDir(this.containerNode);
}else{
this.containerNode.dir=this.textDir;
}
}});
_3b7.showTooltip=function(_3cc,_3cd,_3ce,rtl,_3cf){
if(_3ce){
_3ce=_3ac.map(_3ce,function(val){
return {after:"after-centered",before:"before-centered"}[val]||val;
});
}
if(!_3bd._masterTT){
_3b7._masterTT=_3bd._masterTT=new _3b8();
}
return _3bd._masterTT.show(_3cc,_3cd,_3ce,rtl,_3cf);
};
_3b7.hideTooltip=function(_3d0){
return _3bd._masterTT&&_3bd._masterTT.hide(_3d0);
};
var _3bd=_3ad("dijit.Tooltip",_3b3,{label:"",showDelay:400,connectId:[],position:[],_setConnectIdAttr:function(_3d1){
_3ac.forEach(this._connections||[],function(_3d2){
_3ac.forEach(_3d2,lang.hitch(this,"disconnect"));
},this);
this._connectIds=_3ac.filter(lang.isArrayLike(_3d1)?_3d1:(_3d1?[_3d1]:[]),function(id){
return dom.byId(id);
});
this._connections=_3ac.map(this._connectIds,function(id){
var node=dom.byId(id);
return [this.connect(node,"onmouseenter","_onHover"),this.connect(node,"onmouseleave","_onUnHover"),this.connect(node,"onfocus","_onHover"),this.connect(node,"onblur","_onUnHover")];
},this);
this._set("connectId",_3d1);
},addTarget:function(node){
var id=node.id||node;
if(_3ac.indexOf(this._connectIds,id)==-1){
this.set("connectId",this._connectIds.concat(id));
}
},removeTarget:function(node){
var id=node.id||node,idx=_3ac.indexOf(this._connectIds,id);
if(idx>=0){
this._connectIds.splice(idx,1);
this.set("connectId",this._connectIds);
}
},buildRendering:function(){
this.inherited(arguments);
_3ae.add(this.domNode,"dijitTooltipData");
},startup:function(){
this.inherited(arguments);
var ids=this.connectId;
_3ac.forEach(lang.isArrayLike(ids)?ids:[ids],this.addTarget,this);
},_onHover:function(e){
if(!this._showTimer){
var _3d3=e.target;
this._showTimer=setTimeout(lang.hitch(this,function(){
this.open(_3d3);
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
},open:function(_3d4){
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
_3bd.show(this.label||this.domNode.innerHTML,_3d4,this.position,!this.isLeftToRight(),this.textDir);
this._connectNode=_3d4;
this.onShow(_3d4,this.position);
},close:function(){
if(this._connectNode){
_3bd.hide(this._connectNode);
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
_3bd._MasterTooltip=_3b8;
_3bd.show=_3b7.showTooltip;
_3bd.hide=_3b7.hideTooltip;
_3bd.defaultPosition=["after-centered","before-centered"];
return _3bd;
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
dojo.string.substitute=function(_3d5,map,_3d6,_3d7){
_3d7=_3d7||dojo.global;
_3d6=_3d6?lang.hitch(_3d7,_3d6):function(v){
return v;
};
return _3d5.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_3d8,key,_3d9){
var _3da=lang.getObject(key,false,map);
if(_3d9){
_3da=lang.getObject(_3d9,false,_3d7).call(_3d7,_3da,key);
}
return _3d6(_3da,key).toString();
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
},"url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>","dijit/dijit":function(){
define("dijit/dijit",[".","./_base","dojo/parser","./_Widget","./_TemplatedMixin","./_Container","./layout/_LayoutWidget","./form/_FormWidget","./form/_FormValueWidget"],function(_3db){
return _3db;
});
},"dijit/form/DropDownButton":function(){
require({cache:{"url:dijit/form/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n"}});
define("dijit/form/DropDownButton",["dojo/_base/declare","dojo/_base/lang","dojo/query","../registry","../popup","./Button","../_Container","../_HasDropDown","dojo/text!./templates/DropDownButton.html"],function(_3dc,lang,_3dd,_3de,_3df,_3e0,_3e1,_3e2,_3e3){
return _3dc("dijit.form.DropDownButton",[_3e0,_3e1,_3e2],{baseClass:"dijitDropDownButton",templateString:_3e3,_fillContent:function(){
if(this.srcNodeRef){
var _3e4=_3dd("*",this.srcNodeRef);
this.inherited(arguments,[_3e4[0]]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
if(!this.dropDown&&this.dropDownContainer){
var _3e5=_3dd("[widgetId]",this.dropDownContainer)[0];
this.dropDown=_3de.byNode(_3e5);
delete this.dropDownContainer;
}
if(this.dropDown){
_3df.hide(this.dropDown);
}
this.inherited(arguments);
},isLoaded:function(){
var _3e6=this.dropDown;
return (!!_3e6&&(!_3e6.href||_3e6.isLoaded));
},loadDropDown:function(_3e7){
var _3e8=this.dropDown;
var _3e9=_3e8.on("load",lang.hitch(this,function(){
_3e9.remove();
_3e7();
}));
_3e8.refresh();
},isFocusable:function(){
return this.inherited(arguments)&&!this._mouseDown;
}});
});
},"dojox/layout/ContentPane":function(){
define("dojox/layout/ContentPane",["dojo/_base/lang","dojo/_base/xhr","dijit/layout/ContentPane","dojox/html/_base","dojo/_base/declare"],function(lang,_3ea,_3eb,_3ec,_3ed){
return _3ed("dojox.layout.ContentPane",_3eb,{adjustPaths:false,cleanContent:false,renderStyles:false,executeScripts:true,scriptHasHooks:false,constructor:function(){
this.ioArgs={};
this.ioMethod=_3ea.get;
},onExecError:function(e){
},_setContent:function(cont){
var _3ee=this._contentSetter;
if(!(_3ee&&_3ee instanceof _3ec._ContentSetter)){
_3ee=this._contentSetter=new _3ec._ContentSetter({node:this.containerNode,_onError:lang.hitch(this,this._onError),onContentError:lang.hitch(this,function(e){
var _3ef=this.onContentError(e);
try{
this.containerNode.innerHTML=_3ef;
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
define("dijit/form/_FormValueMixin",["dojo/_base/declare","dojo/dom-attr","dojo/keys","dojo/_base/sniff","./_FormWidgetMixin"],function(_3f0,_3f1,keys,has,_3f2){
return _3f0("dijit.form._FormValueMixin",_3f2,{readOnly:false,_setReadOnlyAttr:function(_3f3){
_3f1.set(this.focusNode,"readOnly",_3f3);
this._set("readOnly",_3f3);
},postCreate:function(){
this.inherited(arguments);
if(has("ie")){
this.connect(this.focusNode||this.domNode,"onkeydown",this._onKeyDown);
}
if(this._resetValue===undefined){
this._lastValueReported=this._resetValue=this.value;
}
},_setValueAttr:function(_3f4,_3f5){
this._handleOnChange(_3f4,_3f5);
},_handleOnChange:function(_3f6,_3f7){
this._set("value",_3f6);
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
define("dijit/form/_FormWidgetMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-style","dojo/_base/lang","dojo/mouse","dojo/_base/sniff","dojo/_base/window","dojo/window","../a11y"],function(_3f8,_3f9,_3fa,_3fb,lang,_3fc,has,win,_3fd,a11y){
return _3f9("dijit.form._FormWidgetMixin",null,{name:"",alt:"",value:"",type:"text",tabIndex:"0",_setTabIndexAttr:"focusNode",disabled:false,intermediateChanges:false,scrollOnFocus:true,_setIdAttr:"focusNode",_setDisabledAttr:function(_3fe){
this._set("disabled",_3fe);
_3fa.set(this.focusNode,"disabled",_3fe);
if(this.valueNode){
_3fa.set(this.valueNode,"disabled",_3fe);
}
this.focusNode.setAttribute("aria-disabled",_3fe?"true":"false");
if(_3fe){
this._set("hovering",false);
this._set("active",false);
var _3ff="tabIndex" in this.attributeMap?this.attributeMap.tabIndex:("_setTabIndexAttr" in this)?this._setTabIndexAttr:"focusNode";
_3f8.forEach(lang.isArray(_3ff)?_3ff:[_3ff],function(_400){
var node=this[_400];
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
var _401=this.connect(this.focusNode,"onfocus",function(){
this.disconnect(_402);
this.disconnect(_401);
});
var _402=this.connect(win.body(),"onmouseup",function(){
this.disconnect(_402);
this.disconnect(_401);
if(this.focused){
this.focus();
}
});
}
if(this.scrollOnFocus){
this.defer(function(){
_3fd.scrollIntoView(this.domNode);
});
}
this.inherited(arguments);
},isFocusable:function(){
return !this.disabled&&this.focusNode&&(_3fb.get(this.domNode,"display")!="none");
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
},_onChangeActive:false,_handleOnChange:function(_403,_404){
if(this._lastValueReported==undefined&&(_404===null||!this._onChangeActive)){
this._resetValue=this._lastValueReported=_403;
}
this._pendingOnChange=this._pendingOnChange||(typeof _403!=typeof this._lastValueReported)||(this.compare(_403,this._lastValueReported)!=0);
if((this.intermediateChanges||_404||_404===undefined)&&this._pendingOnChange){
this._lastValueReported=_403;
this._pendingOnChange=false;
if(this._onChangeActive){
if(this._onChangeHandle){
this._onChangeHandle.remove();
}
this._onChangeHandle=this.defer(function(){
this._onChangeHandle=null;
this.onChange(_403);
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
define("idx/oneui/HoverCard",["dojo/_base/declare","dojo/_base/array","dojo/keys","dijit/focus","dijit/a11y","dojo/_base/event","dojo/_base/fx","dojo/_base/lang","dojo/_base/html","dojo/dom-geometry","dijit/place","dojo/dom","dojo/dom-style","dojo/dom-class","dojo/dnd/Moveable","dojo/dnd/TimedMoveable","dojo/_base/window","dojo/_base/connect","dojo/_base/sniff","dijit/_base/manager","dijit/BackgroundIframe","dijit/TooltipDialog","idx/oneui/Menu","dijit/MenuItem","dijit/form/DropDownButton","dijit/form/Button","dojo/text!./templates/HoverCard.html","dijit/dijit","dojo/i18n","dojo/i18n!./nls/HoverCard"],function(_405,_406,keys,_407,a11y,_408,fx,lang,html,_409,_40a,dom,_40b,_40c,_40d,_40e,win,_40f,has,_410,_411,_412,Menu,_413,_414,_415,_416,_417,i18n){
var _418=_405("idx.oneui.HoverCard",[_412],{templateString:_416,target:"",draggable:true,showDelay:500,hideDelay:800,moreActions:null,actions:null,content:null,forceFocus:false,duration:_410.defaultDuration,postMixInProperties:function(){
this.moreActionsLabel=i18n.getLocalization("idx.oneui","HoverCard",this.lang).moreActionsLabel;
},_setTargetAttr:function(_419){
var _419=dom.byId(_419);
if(!_419){
return;
}
this._connections=[this.connect(_419,"onmouseenter","_onHover"),this.connect(_419,"onmouseleave","_onUnHover"),this.connect(_419,"onkeypress","_onConnectIdKey")];
this._set("target",_419);
},_onConnectIdKey:function(evt){
var node=evt.target;
if(evt.charOrCode==keys.ENTER||evt.charOrCode==keys.SPACE||evt.charOrCode==" "){
this._showTimer=setTimeout(lang.hitch(this,function(){
this.open(node);
}),this.showDelay);
_408.stop(evt);
}
},_setActionsAttr:function(_41a){
_406.forEach(_41a,function(_41b){
var _41c=new _415({iconClass:_41b.iconClass,onClick:_41b.content?lang.hitch(this,function(){
}):_41b.onClick,baseClass:"idxOneuiHoverCardFooterButton"});
html.place(_41c.domNode,this.actionIcons);
},this);
},_setMoreActionsAttr:function(_41d){
var menu=new Menu({});
_406.forEach(_41d,function(_41e){
menu.addChild(new _413({label:_41e.label,onClick:_41e.onClick}));
});
menu.startup();
var _41f=new _414({label:this.moreActionsLabel,dropDown:menu,baseClass:"idxOneuiHoverCardMenu"},this.moreActionsNode);
this.moreActionsMenu=menu;
},_setContentAttr:function(_420){
var _421=_417.byId(_420);
if(!_421.declaredClass){
this.inherited(arguments);
}else{
html.place(_421.domNode,this.containerNode);
_40c.toggle(this.containerNode,"idxOneuiHoverCardWithoutPreviewImg",!_421.image);
}
},_onHover:function(e){
if(!this._showTimer){
var _422=e.target;
this._showTimer=setTimeout(lang.hitch(this,function(){
this.open(_422);
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
var _423=this.connectorNode;
_40b.set(_423,"visibility","visible");
},postCreate:function(){
win.body().appendChild(this.domNode);
this.bgIframe=new _411(this.domNode);
this.fadeIn=fx.fadeIn({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onShow")});
this.fadeOut=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHide")});
this.connect(this.gripNode,"onmouseenter",function(){
_40c.add(this.gripNode,"idxOneuiHoverCardGripHover");
});
this.connect(this.gripNode,"onmouseleave",function(){
_40c.remove(this.gripNode,"idxOneuiHoverCardGripHover");
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
},open:function(_424){
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
_40c.remove(this.domNode,"dijitHidden");
if(dojo.isIE<=7){
_40b.set(this.bodyNode,"width",_40b.get(this.containerNode,"width")+5+"px");
}
this.show(this.domNode.innerHTML,_424,this.position,!this.isLeftToRight(),this.textDir);
if(this.forceFocus){
this.focus();
}
this._connectNode=_424;
this.onShow(_424,this.position);
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
},show:function(_425,_426,_427,rtl,_428){
this._showConnector();
this.domNode.width="auto";
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.set("textDir",_428);
this.containerNode.align=rtl?"right":"left";
var pos=_40a.around(this.domNode,_426,_427&&_427.length?_427:_418.defaultPosition,!rtl,lang.hitch(this,"orient"));
var _429=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_429.y+((_429.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_429.x+((_429.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}
}
var node=this.domNode,_42a=this.connectorNode;
if(this.gripNode&&this.draggable){
this._moveable=new ((has("ie")==6)?_40e:_40d)(node,{handle:this.gripNode});
this.connect(this._moveable,"onFirstMove",function(){
_40b.set(_42a,"visibility","hidden");
_40c.add(this.gripNode,"idxOneuiHoverCardGripActive");
this._moved=true;
});
this.connect(this._moveable,"onMoveStop",function(){
_40c.remove(this.gripNode,"idxOneuiHoverCardGripActive");
_40c.add(this.gripNode,"idxOneuiHoverCardGrip");
});
}else{
}
_40b.set(this.domNode,{"opacity":0,"position":"absolute"});
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_426;
},orient:function(node,_42b,_42c,_42d,_42e){
this.connectorNode.style.top="";
var _42f=_42d.w-this.connectorNode.offsetWidth;
node.className="idxOneuiHoverCard "+{"MR-ML":"idxOneuiHoverCardRight","ML-MR":"idxOneuiHoverCardLeft","TM-BM":"idxOneuiHoverCardAbove","BM-TM":"idxOneuiHoverCardBelow","BL-TL":"idxOneuiHoverCardBelow idxOneuiHoverCardABLeft","TL-BL":"idxOneuiHoverCardAbove idxOneuiHoverCardABLeft","BR-TR":"idxOneuiHoverCardBelow idxOneuiHoverCardABRight","TR-BR":"idxOneuiHoverCardAbove idxOneuiHoverCardABRight","BR-BL":"idxOneuiHoverCardRight","BL-BR":"idxOneuiHoverCardLeft","TR-TL":"idxOneuiHoverCardRight"}[_42b+"-"+_42c];
this.domNode.style.width="auto";
var size=_409.getContentBox(this.domNode);
var _430=Math.min((Math.max(_42f,1)),size.w);
var _431=_430<size.w;
this.domNode.style.width=_430+"px";
if(_431){
this.containerNode.style.overflow="auto";
var _432=this.containerNode.scrollWidth;
this.containerNode.style.overflow="visible";
if(_432>_430){
_432=_432+_40b.get(this.domNode,"paddingLeft")+_40b.get(this.domNode,"paddingRight");
this.domNode.style.width=_432+"px";
}
}
if(_42c.charAt(0)=="B"&&_42b.charAt(0)=="B"){
var mb=_409.getMarginBox(node);
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
},hide:function(_435){
if(this._onDeck&&this._onDeck[1]==_435){
this._onDeck=null;
}else{
if(this.aroundNode===_435||this.isShowingNow){
this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play();
this._focus=false;
this._hovered=false;
this._moved=false;
_407.focus(this._connectNode);
}else{
}
}
},_onShow:function(){
if(has("ie")){
this.domNode.style.filter="";
}
},_onHide:function(){
_40c.add(this.domNode,"dijitHidden");
if(this._onDeck){
this.show.apply(this,this._onDeck);
this._onDeck=null;
}
},_getFocusItems:function(){
var _436=a11y._getTabNavigable(this.domNode);
this._firstFocusItem=_436.lowest||_436.first||this.closeButtonNode||this.domNode;
this._lastFocusItem=_436.last||_436.highest||this._firstFocusItem;
},_onKey:function(evt){
var node=evt.target;
if(evt.charOrCode===keys.TAB){
this._getFocusItems(this.domNode);
}
var _437=(this._firstFocusItem==this._lastFocusItem);
if(evt.charOrCode==keys.ESCAPE){
setTimeout(lang.hitch(this,"hide"),0);
_408.stop(evt);
}else{
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===keys.TAB){
if(!_437){
_407.focus(this._lastFocusItem);
}
_408.stop(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===keys.TAB&&!evt.shiftKey){
if(!_437){
_407.focus(this._firstFocusItem);
}
_408.stop(evt);
}else{
if(evt.charOrCode===keys.TAB){
evt.stopPropagation();
}
}
}
}
}});
_418.defaultPosition=["after-centered","before-centered","below","above"];
return _418;
});
},"dijit/layout/_ContentPaneResizeMixin":function(){
define("dijit/layout/_ContentPaneResizeMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/_base/lang","dojo/query","dojo/_base/sniff","dojo/_base/window","../registry","./utils","../_Contained"],function(_438,_439,_43a,_43b,_43c,lang,_43d,has,win,_43e,_43f,_440){
return _439("dijit.layout._ContentPaneResizeMixin",null,{doLayout:true,isLayoutContainer:true,startup:function(){
if(this._started){
return;
}
var _441=this.getParent();
this._childOfLayoutWidget=_441&&_441.isLayoutContainer;
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
var _442=_43d("> *",this.containerNode).filter(function(node){
return node.tagName!=="SCRIPT";
}),_443=_442.filter(function(node){
return _43a.has(node,"data-dojo-type")||_43a.has(node,"dojoType")||_43a.has(node,"widgetId");
}),_444=_438.filter(_443.map(_43e.byNode),function(_445){
return _445&&_445.domNode&&_445.resize;
});
if(_442.length==_443.length&&_444.length==1){
this._singleChild=_444[0];
}else{
delete this._singleChild;
}
_43b.toggle(this.containerNode,this.baseClass+"SingleChild",!!this._singleChild);
},resize:function(_446,_447){
if(!this._wasShown&&this.open!==false){
this._onShow();
}
this._resizeCalled=true;
this._scheduleLayout(_446,_447);
},_scheduleLayout:function(_448,_449){
if(this._isShown()){
this._layout(_448,_449);
}else{
this._needLayout=true;
this._changeSize=_448;
this._resultSize=_449;
}
},_layout:function(_44a,_44b){
if(_44a){
_43c.setMarginBox(this.domNode,_44a);
}
var cn=this.containerNode;
if(cn===this.domNode){
var mb=_44b||{};
lang.mixin(mb,_44a||{});
if(!("h" in mb)||!("w" in mb)){
mb=lang.mixin(_43c.getMarginBox(cn),mb);
}
this._contentBox=_43f.marginBox2contentBox(cn,mb);
}else{
this._contentBox=_43c.getContentBox(cn);
}
this._layoutChildren();
delete this._needLayout;
},_layoutChildren:function(){
if(this.doLayout){
this._checkIfSingleChild();
}
if(this._singleChild&&this._singleChild.resize){
var cb=this._contentBox||_43c.getContentBox(this.containerNode);
this._singleChild.resize({w:cb.w,h:cb.h});
}else{
_438.forEach(this.getChildren(),function(_44c){
if(_44c.resize){
_44c.resize();
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
var node=this.domNode,_44d=this.domNode.parentNode;
return (node.style.display!="none")&&(node.style.visibility!="hidden")&&!_43b.contains(node,"dijitHidden")&&_44d&&_44d.style&&(_44d.style.display!="none");
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
define("dijit/WidgetSet",["dojo/_base/array","dojo/_base/declare","dojo/_base/window","./registry"],function(_44e,_44f,win,_450){
var _451=_44f("dijit.WidgetSet",null,{constructor:function(){
this._hash={};
this.length=0;
},add:function(_452){
if(this._hash[_452.id]){
throw new Error("Tried to register widget with id=="+_452.id+" but that id is already registered");
}
this._hash[_452.id]=_452;
this.length++;
},remove:function(id){
if(this._hash[id]){
delete this._hash[id];
this.length--;
}
},forEach:function(func,_453){
_453=_453||win.global;
var i=0,id;
for(id in this._hash){
func.call(_453,this._hash[id],i++,this._hash);
}
return this;
},filter:function(_454,_455){
_455=_455||win.global;
var res=new _451(),i=0,id;
for(id in this._hash){
var w=this._hash[id];
if(_454.call(_455,w,i++,this._hash)){
res.add(w);
}
}
return res;
},byId:function(id){
return this._hash[id];
},byClass:function(cls){
var res=new _451(),id,_456;
for(id in this._hash){
_456=this._hash[id];
if(_456.declaredClass==cls){
res.add(_456);
}
}
return res;
},toArray:function(){
var ar=[];
for(var id in this._hash){
ar.push(this._hash[id]);
}
return ar;
},map:function(func,_457){
return _44e.map(this.toArray(),func,_457);
},every:function(func,_458){
_458=_458||win.global;
var x=0,i;
for(i in this._hash){
if(!func.call(_458,this._hash[i],x++,this._hash)){
return false;
}
}
return true;
},some:function(func,_459){
_459=_459||win.global;
var x=0,i;
for(i in this._hash){
if(func.call(_459,this._hash[i],x++,this._hash)){
return true;
}
}
return false;
}});
_44e.forEach(["forEach","filter","byClass","map","every","some"],function(func){
_450[func]=_451.prototype[func];
});
return _451;
});
},"dojo/dnd/Moveable":function(){
define("dojo/dnd/Moveable",["../main","../Evented","../touch","./Mover"],function(dojo,_45a,_45b){
dojo.declare("dojo.dnd.Moveable",[_45a],{handle:"",delay:0,skip:false,constructor:function(node,_45c){
this.node=dojo.byId(node);
if(!_45c){
_45c={};
}
this.handle=_45c.handle?dojo.byId(_45c.handle):null;
if(!this.handle){
this.handle=this.node;
}
this.delay=_45c.delay>0?_45c.delay:0;
this.skip=_45c.skip;
this.mover=_45c.mover?_45c.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,_45b.press,this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")];
},markupFactory:function(_45d,node,ctor){
return new ctor(node,_45d);
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null;
},onMouseDown:function(e){
if(this.skip&&dojo.dnd.isFormElement(e)){
return;
}
if(this.delay){
this.events.push(dojo.connect(this.handle,_45b.move,this,"onMouseMove"),dojo.connect(this.handle,_45b.release,this,"onMouseUp"));
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
},onMoveStart:function(_45e){
dojo.publish("/dnd/move/start",[_45e]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem");
},onMoveStop:function(_45f){
dojo.publish("/dnd/move/stop",[_45f]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem");
},onFirstMove:function(_460,e){
},onMove:function(_461,_462,e){
this.onMoving(_461,_462);
var s=_461.node.style;
s.left=_462.l+"px";
s.top=_462.t+"px";
this.onMoved(_461,_462);
},onMoving:function(_463,_464){
},onMoved:function(_465,_466){
}});
return dojo.dnd.Moveable;
});
},"dijit/TooltipDialog":function(){
require({cache:{"url:dijit/templates/TooltipDialog.html":"<div role=\"presentation\" tabIndex=\"-1\">\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" data-dojo-attach-point=\"containerNode\" role=\"dialog\"></div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\"></div>\n</div>\n"}});
define("dijit/TooltipDialog",["dojo/_base/declare","dojo/dom-class","dojo/_base/event","dojo/keys","dojo/_base/lang","./focus","./layout/ContentPane","./_DialogMixin","./form/_FormMixin","./_TemplatedMixin","dojo/text!./templates/TooltipDialog.html","."],function(_467,_468,_469,keys,lang,_46a,_46b,_46c,_46d,_46e,_46f,_470){
return _467("dijit.TooltipDialog",[_46b,_46e,_46d,_46c],{title:"",doLayout:false,autofocus:true,baseClass:"dijitTooltipDialog",_firstFocusItem:null,_lastFocusItem:null,templateString:_46f,_setTitleAttr:function(_471){
this.containerNode.title=_471;
this._set("title",_471);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
},orient:function(node,_472,_473){
var newC="dijitTooltipAB"+(_473.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(_473.charAt(0)=="T"?"Below":"Above");
_468.replace(this.domNode,newC,this._currentOrientClass||"");
this._currentOrientClass=newC;
},focus:function(){
this._getFocusItems(this.containerNode);
_46a.focus(this._firstFocusItem);
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
var _474=(this._firstFocusItem==this._lastFocusItem);
if(evt.charOrCode==keys.ESCAPE){
setTimeout(lang.hitch(this,"onCancel"),0);
_469.stop(evt);
}else{
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===keys.TAB){
if(!_474){
_46a.focus(this._lastFocusItem);
}
_469.stop(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===keys.TAB&&!evt.shiftKey){
if(!_474){
_46a.focus(this._firstFocusItem);
}
_469.stop(evt);
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
define("dojox/collections/Dictionary",["dojo/_base/kernel","dojo/_base/array","./_base"],function(dojo,_475,dxc){
dxc.Dictionary=function(_476){
var _477={};
this.count=0;
var _478={};
this.add=function(k,v){
var b=(k in _477);
_477[k]=new dxc.DictionaryEntry(k,v);
if(!b){
this.count++;
}
};
this.clear=function(){
_477={};
this.count=0;
};
this.clone=function(){
return new dxc.Dictionary(this);
};
this.contains=this.containsKey=function(k){
if(_478[k]){
return false;
}
return (_477[k]!=null);
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
return _477[k];
};
this.forEach=function(fn,_479){
var a=[];
for(var p in _477){
if(!_478[p]){
a.push(_477[p]);
}
}
dojo.forEach(a,fn,_479);
};
this.getKeyList=function(){
return (this.getIterator()).map(function(_47a){
return _47a.key;
});
};
this.getValueList=function(){
return (this.getIterator()).map(function(_47b){
return _47b.value;
});
};
this.item=function(k){
if(k in _477){
return _477[k].valueOf();
}
return undefined;
};
this.getIterator=function(){
return new dxc.DictionaryIterator(_477);
};
this.remove=function(k){
if(k in _477&&!_478[k]){
delete _477[k];
this.count--;
return true;
}
return false;
};
if(_476){
var e=_476.getIterator();
while(e.get()){
this.add(e.element.key,e.element.value);
}
}
};
return dxc.Dictionary;
});
},"dijit/typematic":function(){
define("dijit/typematic",["dojo/_base/array","dojo/_base/connect","dojo/_base/event","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/_base/sniff","."],function(_47c,_47d,_47e,_47f,lang,on,has,_480){
var _481=(_480.typematic={_fireEventAndReload:function(){
this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=Math.max(this._currentTimeout<0?this._initialDelay:(this._subsequentDelay>1?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay)),this._minDelay);
this._timer=setTimeout(lang.hitch(this,"_fireEventAndReload"),this._currentTimeout);
},trigger:function(evt,_482,node,_483,obj,_484,_485,_486){
if(obj!=this._obj){
this.stop();
this._initialDelay=_485||500;
this._subsequentDelay=_484||0.9;
this._minDelay=_486||10;
this._obj=obj;
this._evt=evt;
this._node=node;
this._currentTimeout=-1;
this._count=-1;
this._callback=lang.hitch(_482,_483);
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
},addKeyListener:function(node,_487,_488,_489,_48a,_48b,_48c){
if(_487.keyCode){
_487.charOrCode=_487.keyCode;
_47f.deprecated("keyCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}else{
if(_487.charCode){
_487.charOrCode=String.fromCharCode(_487.charCode);
_47f.deprecated("charCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}
}
var _48d=[on(node,_47d._keypress,lang.hitch(this,function(evt){
if(evt.charOrCode==_487.charOrCode&&(_487.ctrlKey===undefined||_487.ctrlKey==evt.ctrlKey)&&(_487.altKey===undefined||_487.altKey==evt.altKey)&&(_487.metaKey===undefined||_487.metaKey==(evt.metaKey||false))&&(_487.shiftKey===undefined||_487.shiftKey==evt.shiftKey)){
_47e.stop(evt);
_481.trigger(evt,_488,node,_489,_487,_48a,_48b,_48c);
}else{
if(_481._obj==_487){
_481.stop();
}
}
})),on(node,"keyup",lang.hitch(this,function(){
if(_481._obj==_487){
_481.stop();
}
}))];
return {remove:function(){
_47c.forEach(_48d,function(h){
h.remove();
});
}};
},addMouseListener:function(node,_48e,_48f,_490,_491,_492){
var _493=[on(node,"mousedown",lang.hitch(this,function(evt){
_47e.stop(evt);
_481.trigger(evt,_48e,node,_48f,node,_490,_491,_492);
})),on(node,"mouseup",lang.hitch(this,function(evt){
if(this._obj){
_47e.stop(evt);
}
_481.stop();
})),on(node,"mouseout",lang.hitch(this,function(evt){
_47e.stop(evt);
_481.stop();
})),on(node,"mousemove",lang.hitch(this,function(evt){
evt.preventDefault();
})),on(node,"dblclick",lang.hitch(this,function(evt){
_47e.stop(evt);
if(has("ie")<9){
_481.trigger(evt,_48e,node,_48f,node,_490,_491,_492);
setTimeout(lang.hitch(this,_481.stop),50);
}
}))];
return {remove:function(){
_47c.forEach(_493,function(h){
h.remove();
});
}};
},addListener:function(_494,_495,_496,_497,_498,_499,_49a,_49b){
var _49c=[this.addKeyListener(_495,_496,_497,_498,_499,_49a,_49b),this.addMouseListener(_494,_497,_498,_499,_49a,_49b)];
return {remove:function(){
_47c.forEach(_49c,function(h){
h.remove();
});
}};
}});
return _481;
});
},"dijit/MenuItem":function(){
require({cache:{"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n"}});
define("dijit/MenuItem",["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/event","dojo/_base/kernel","dojo/_base/sniff","./_Widget","./_TemplatedMixin","./_Contained","./_CssStateMixin","dojo/text!./templates/MenuItem.html"],function(_49d,dom,_49e,_49f,_4a0,_4a1,has,_4a2,_4a3,_4a4,_4a5,_4a6){
return _49d("dijit.MenuItem",[_4a2,_4a3,_4a4,_4a5],{templateString:_4a6,baseClass:"dijitMenuItem",label:"",_setLabelAttr:{node:"containerNode",type:"innerHTML"},iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},accelKey:"",disabled:false,_fillContent:function(_4a7){
if(_4a7&&!("label" in this.params)){
this.set("label",_4a7.innerHTML);
}
},buildRendering:function(){
this.inherited(arguments);
var _4a8=this.id+"_text";
_49e.set(this.containerNode,"id",_4a8);
if(this.accelKeyNode){
_49e.set(this.accelKeyNode,"id",this.id+"_accel");
_4a8+=" "+this.id+"_accel";
}
this.domNode.setAttribute("aria-labelledby",_4a8);
dom.setSelectable(this.domNode,false);
},_onHover:function(){
this.getParent().onItemHover(this);
},_onUnhover:function(){
this.getParent().onItemUnhover(this);
this._set("hovering",false);
},_onClick:function(evt){
this.getParent().onItemClick(this,evt);
_4a0.stop(evt);
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
},_setSelected:function(_4a9){
_49f.toggle(this.domNode,"dijitMenuItemSelected",_4a9);
},setLabel:function(_4aa){
_4a1.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_4aa);
},setDisabled:function(_4ab){
_4a1.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_4ab);
},_setDisabledAttr:function(_4ac){
this.focusNode.setAttribute("aria-disabled",_4ac?"true":"false");
this._set("disabled",_4ac);
},_setAccelKeyAttr:function(_4ad){
this.accelKeyNode.style.display=_4ad?"":"none";
this.accelKeyNode.innerHTML=_4ad;
_49e.set(this.containerNode,"colSpan",_4ad?"1":"2");
this._set("accelKey",_4ad);
}});
});
},"dijit/MenuBarItem":function(){
require({cache:{"url:dijit/templates/MenuBarItem.html":"<div class=\"dijitReset dijitInline dijitMenuItem dijitMenuItemLabel\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<span data-dojo-attach-point=\"containerNode\"></span>\n</div>\n"}});
define("dijit/MenuBarItem",["dojo/_base/declare","./MenuItem","dojo/text!./templates/MenuBarItem.html"],function(_4ae,_4af,_4b0){
var _4b1=_4ae("dijit._MenuBarItemMixin",null,{templateString:_4b0,_setIconClassAttr:null});
var _4b2=_4ae("dijit.MenuBarItem",[_4af,_4b1],{});
_4b2._MenuBarItemMixin=_4b1;
return _4b2;
});
},"dijit/MenuBar":function(){
require({cache:{"url:dijit/templates/MenuBar.html":"<div class=\"dijitMenuBar dijitMenuPassive\" data-dojo-attach-point=\"containerNode\"  role=\"menubar\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress: _onKeyPress\"></div>\n"}});
define("dijit/MenuBar",["dojo/_base/declare","dojo/_base/event","dojo/keys","./_MenuBase","dojo/text!./templates/MenuBar.html"],function(_4b3,_4b4,keys,_4b5,_4b6){
return _4b3("dijit.MenuBar",_4b5,{templateString:_4b6,baseClass:"dijitMenuBar",_isMenuBar:true,postCreate:function(){
var l=this.isLeftToRight();
this.connectKeyNavHandlers(l?[keys.LEFT_ARROW]:[keys.RIGHT_ARROW],l?[keys.RIGHT_ARROW]:[keys.LEFT_ARROW]);
this._orient=["below"];
},focusChild:function(item){
var _4b7=this.focusedChild,_4b8=_4b7&&_4b7.popup&&_4b7.popup.isShowingNow;
this.inherited(arguments);
if(_4b8&&item.popup&&!item.disabled){
this._openPopup();
}
},_onKeyPress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
switch(evt.charOrCode){
case keys.DOWN_ARROW:
this._moveToPopup(evt);
_4b4.stop(evt);
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
define("dijit/layout/_LayoutWidget",["dojo/_base/lang","../_Widget","../_Container","../_Contained","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/sniff","dojo/_base/window"],function(lang,_4b9,_4ba,_4bb,_4bc,_4bd,_4be,_4bf,has,win){
return _4bc("dijit.layout._LayoutWidget",[_4b9,_4ba,_4bb],{baseClass:"dijitLayoutContainer",isLayoutContainer:true,buildRendering:function(){
this.inherited(arguments);
_4bd.add(this.domNode,"dijitContainer");
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
var _4c0=this.getParent&&this.getParent();
if(!(_4c0&&_4c0.isLayoutContainer)){
this.resize();
this.connect(win.global,"onresize",function(){
this.resize();
});
}
},resize:function(_4c1,_4c2){
var node=this.domNode;
if(_4c1){
_4be.setMarginBox(node,_4c1);
}
var mb=_4c2||{};
lang.mixin(mb,_4c1||{});
if(!("h" in mb)||!("w" in mb)){
mb=lang.mixin(_4be.getMarginBox(node),mb);
}
var cs=_4bf.getComputedStyle(node);
var me=_4be.getMarginExtents(node,cs);
var be=_4be.getBorderExtents(node,cs);
var bb=(this._borderBox={w:mb.w-(me.w+be.w),h:mb.h-(me.h+be.h)});
var pe=_4be.getPadExtents(node,cs);
this._contentBox={l:_4bf.toPixelValue(node,cs.paddingLeft),t:_4bf.toPixelValue(node,cs.paddingTop),w:bb.w-pe.w,h:bb.h-pe.h};
this.layout();
},layout:function(){
},_setupChild:function(_4c3){
var cls=this.baseClass+"-child "+(_4c3.baseClass?this.baseClass+"-"+_4c3.baseClass:"");
_4bd.add(_4c3.domNode,cls);
},addChild:function(_4c4,_4c5){
this.inherited(arguments);
if(this._started){
this._setupChild(_4c4);
}
},removeChild:function(_4c6){
var cls=this.baseClass+"-child"+(_4c6.baseClass?" "+this.baseClass+"-"+_4c6.baseClass:"");
_4bd.remove(_4c6.domNode,cls);
this.inherited(arguments);
}});
});
},"dijit/popup":function(){
define("dijit/popup",["dojo/_base/array","dojo/aspect","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/window","./place","./BackgroundIframe","."],function(_4c7,_4c8,_4c9,_4ca,dom,_4cb,_4cc,_4cd,_4ce,_4cf,has,keys,lang,on,win,_4d0,_4d1,_4d2){
function _4d3(){
if(this._popupWrapper){
_4cc.destroy(this._popupWrapper);
delete this._popupWrapper;
}
};
var _4d4=_4ca(null,{_stack:[],_beginZIndex:1000,_idGen:1,_createWrapper:function(_4d5){
var _4d6=_4d5._popupWrapper,node=_4d5.domNode;
if(!_4d6){
_4d6=_4cc.create("div",{"class":"dijitPopup",style:{display:"none"},role:"presentation"},win.body());
_4d6.appendChild(node);
var s=node.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
_4d5._popupWrapper=_4d6;
_4c8.after(_4d5,"destroy",_4d3,true);
}
return _4d6;
},moveOffScreen:function(_4d7){
var _4d8=this._createWrapper(_4d7);
_4ce.set(_4d8,{visibility:"hidden",top:"-9999px",display:""});
},hide:function(_4d9){
var _4da=this._createWrapper(_4d9);
_4ce.set(_4da,"display","none");
},getTopPopup:function(){
var _4db=this._stack;
for(var pi=_4db.length-1;pi>0&&_4db[pi].parent===_4db[pi-1].widget;pi--){
}
return _4db[pi];
},open:function(args){
var _4dc=this._stack,_4dd=args.popup,_4de=args.orient||["below","below-alt","above","above-alt"],ltr=args.parent?args.parent.isLeftToRight():_4cd.isBodyLtr(),_4df=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+this._idGen++);
while(_4dc.length&&(!args.parent||!dom.isDescendant(args.parent.domNode,_4dc[_4dc.length-1].widget.domNode))){
this.close(_4dc[_4dc.length-1].widget);
}
var _4e0=this._createWrapper(_4dd);
_4cb.set(_4e0,{id:id,style:{zIndex:this._beginZIndex+_4dc.length},"class":"dijitPopup "+(_4dd.baseClass||_4dd["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:args.parent?args.parent.id:""});
if(has("bgIframe")&&!_4dd.bgIframe){
_4dd.bgIframe=new _4d1(_4e0);
}
var best=_4df?_4d0.around(_4e0,_4df,_4de,ltr,_4dd.orient?lang.hitch(_4dd,"orient"):null):_4d0.at(_4e0,args,_4de=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],args.padding);
_4e0.style.display="";
_4e0.style.visibility="visible";
_4dd.domNode.style.visibility="visible";
var _4e1=[];
_4e1.push(on(_4e0,_4c9._keypress,lang.hitch(this,function(evt){
if(evt.charOrCode==keys.ESCAPE&&args.onCancel){
_4cf.stop(evt);
args.onCancel();
}else{
if(evt.charOrCode===keys.TAB){
_4cf.stop(evt);
var _4e2=this.getTopPopup();
if(_4e2&&_4e2.onCancel){
_4e2.onCancel();
}
}
}
})));
if(_4dd.onCancel&&args.onCancel){
_4e1.push(_4dd.on("cancel",args.onCancel));
}
_4e1.push(_4dd.on(_4dd.onExecute?"execute":"change",lang.hitch(this,function(){
var _4e3=this.getTopPopup();
if(_4e3&&_4e3.onExecute){
_4e3.onExecute();
}
})));
_4dc.push({widget:_4dd,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:_4e1});
if(_4dd.onOpen){
_4dd.onOpen(best);
}
return best;
},close:function(_4e4){
var _4e5=this._stack;
while((_4e4&&_4c7.some(_4e5,function(elem){
return elem.widget==_4e4;
}))||(!_4e4&&_4e5.length)){
var top=_4e5.pop(),_4e6=top.widget,_4e7=top.onClose;
if(_4e6.onClose){
_4e6.onClose();
}
var h;
while(h=top.handlers.pop()){
h.remove();
}
if(_4e6&&_4e6.domNode){
this.hide(_4e6);
}
if(_4e7){
_4e7();
}
}
}});
return (_4d2.popup=new _4d4());
});
},"dijit/_base/manager":function(){
define("dijit/_base/manager",["dojo/_base/array","dojo/_base/config","../registry",".."],function(_4e8,_4e9,_4ea,_4eb){
_4e8.forEach(["byId","getUniqueId","findWidgets","_destroyAll","byNode","getEnclosingWidget"],function(name){
_4eb[name]=_4ea[name];
});
_4eb.defaultDuration=_4e9["defaultDuration"]||200;
return _4eb;
});
},"curam/widget/containers/TransitionContainer":function(){
define("curam/widget/containers/TransitionContainer",["dojo/_base/declare","dojo/parser","dijit/_Widget","dojo/dom-construct","dojo/_base/window","dijit/layout/ContentPane","dojo/dom-class","dojo/_base/fx","curam/util/cache/CacheLRU","dojox/layout/ContentPane","dojo/_base/array","dojo/query"],function(_4ec,_4ed,_4ee,_4ef,_4f0,_4f1,_4f2,fx,_4f3,_4f4,_4f5,_4f6){
return _4ec("curam.widget.containers.TransitionContainer",[_4f1],{transitionDuration:200,_panelCache:null,_currentlyDisplayedPanelKey:-1,_panelToLoadKey:-1,_beenProcessed:false,constructor:function(args){
var _4f7={maxSize:5};
this._panelCache=new _4f3(_4f7);
},_buildPramUrl:function(_4f8){
var _4f9="";
if(_4f8.param!=null){
_4f5.forEach(_4f8.param,function(_4fa,i){
if(i>0){
_4f9+="&";
}
_4f9+=encodeURIComponent(_4fa.paramKey)+"="+encodeURIComponent(_4fa.paramValue);
});
}
return _4f9;
},_setDisplayPanelAttr:function(_4fb){
_4fb=this._doDataTranslation(_4fb);
var _4fc=this._buildPramUrl(_4fb);
var _4fd=_4fb.key;
if(this._currentlyDisplayedPanelKey!=_4fd){
this._panelCache.getItem(this._currentlyDisplayedPanelKey);
var _4fe=this._panelCache.getItem(_4fd);
if(_4fe==null){
var uri=this._doResourceLookUp(_4fb,_4fc,_4fd);
uri=this._applyParamToUri(_4fb,_4fc,_4fd,uri);
var _4ff=new _4f4({href:uri,preload:false,preventCache:true,executeScripts:true,scriptHasHooks:true,refreshOnShow:false,open:false,style:{padding:0,border:0,opacity:0}});
_4ff=this._contentPaneCreated(_4fb,_4fc,_4fd,_4ff);
var _500={node:_4ff.domNode,duration:this.transitionDuration,onEnd:dojo.hitch(this,this._panelFadeInComplete)};
var _501=dojo.hitch(this,function(key){
this._panelFadedOut(key);
});
var _502={node:_4ff.domNode,duration:this.transitionDuration,onEnd:function(){
console.info("Fadding out onEnd Called for : "+_4fd);
_501(_4fd);
}};
var _503=fx.fadeIn(_500);
var _504=fx.fadeOut(_502);
_4fe={panel:_4ff,fadeIn:_503,fadeOut:_504};
var _505={callback:function(key,item){
try{
item.panel.destroy();
delete item;
}
catch(err){
console.error(err);
}
}};
this._panelCache.addItem(_4fd,_4fe,_505);
}else{
console.info("Doning nothing as panel all ready exists");
if(_4fb.forceRefresh){
var _4fe=this._panelCache.getItem(_4fd);
if(_4fe){
var uri=this._doResourceLookUp(_4fb,_4fc,_4fd);
uri=this._applyParamToUri(_4fb,_4fc,_4fd,uri);
_4fe.panel.open=false;
_4fe.panel.set("href",uri);
}
}
}
this._doSwapPanel(_4fb,_4fd);
}else{
if(_4fb.forceRefresh){
var _4fe=this._panelCache.getItem(this._currentlyDisplayedPanelKey);
if(_4fe){
var uri=this._doResourceLookUp(_4fb,_4fc,this._currentlyDisplayedPanelKey);
uri=this._applyParamToUri(_4fb,_4fc,_4fd,uri);
_4fe.panel.set("href",uri);
}
}
}
},_doDataTranslation:function(_506){
return _506;
},_contentPaneCreated:function(_507,_508,_509,_50a){
return _50a;
},_doResourceLookUp:function(_50b,_50c,_50d){
var uri=_50b.key;
return uri;
},_applyParamToUri:function(_50e,_50f,_510,uri){
if(_50f.length>0){
if(uri.indexOf("?")!=-1){
uri+="&";
}else{
uri+="?";
}
uri+=_50f;
}
return uri;
},_panelFadedOut:function(_511){
var _512=this._panelCache.getItem(_511);
_512.panel.cancel();
if(_512.panel.domNode!=null){
_4f2.add(_512.panel.domNode,"dijitHidden");
}else{
}
_512.panel.open=false;
_4f5.forEach(_4f6("iframe",_512.panel.domNode),function(_513){
_513.src="";
});
this._fadedOutPanelProcess(_512);
_4ef.place(_512.panel.domNode,_4f0.body());
this._panelFadeOutComplete();
this._panelFadeIn();
},_fadedOutPanelProcess:function(_514){
},_panelFadeOutComplete:function(){
},_panelFadeIn:function(){
if(this._panelToFadeInKey!=-1){
var _515=this._panelCache.getItem(this._panelToFadeInKey);
this.set("content",_515.panel);
this._currentlyDisplayedPanelKey=this._panelToFadeInKey;
if(_515.panel.domNode!=null){
_4f2.remove(_515.panel.domNode,"dijitHidden");
}else{
}
_515.panel.onLoad=function(){
_515.fadeIn.play();
};
_515.panel.open=true;
_515.panel.refresh();
_515.panel.resize();
}
},_panelFadeInComplete:function(){
},_doSwapPanel:function(_516,key){
var _517=this._panelCache.getItem(this._currentlyDisplayedPanelKey);
if(_517!=null){
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
var _518=this._panelCache.getItem(this._currentlyDisplayedPanelKey);
if(_518!=null){
if(_518.fadeIn.status()=="playing"){
console.info("fadeOutDisplay  - currentlyDisplayedPanel.fadeIn.status() == playing");
_518.fadeIn.stop();
_518.fadeOut.play();
}else{
if(_518.fadeOut.status()!="playing"){
_518.fadeOut.play();
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
},"url:dijit/templates/TooltipDialog.html":"<div role=\"presentation\" tabIndex=\"-1\">\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" data-dojo-attach-point=\"containerNode\" role=\"dialog\"></div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\"></div>\n</div>\n","dojo/dnd/Mover":function(){
define("dojo/dnd/Mover",["../main","../Evented","../touch","./common","./autoscroll"],function(dojo,_519,_51a){
dojo.declare("dojo.dnd.Mover",[_519],{constructor:function(node,e,host){
this.node=dojo.byId(node);
this.marginBox={l:e.pageX,t:e.pageY};
this.mouseButton=e.button;
var h=(this.host=host),d=node.ownerDocument;
this.events=[dojo.connect(d,_51a.move,this,"onFirstMove"),dojo.connect(d,_51a.move,this,"onMouseMove"),dojo.connect(d,_51a.release,this,"onMouseUp"),dojo.connect(d,"ondragstart",dojo.stopEvent),dojo.connect(d.body,"onselectstart",dojo.stopEvent)];
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
define("curam/ui/ClientDataAccessor",["curam/util/Request","curam/debug","curam/util/ResourceBundle"],function(_51b){
dojo.requireLocalization("curam.application","Debug");
var _51c=new curam.util.ResourceBundle("Debug");
return dojo.declare("curam.ui.ClientDataAccessor",null,{get:function(path,_51d,_51e,_51f){
var _520="servlet/PathResolver"+"?p="+path;
if(_51e==undefined){
_51e=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_51f==undefined){
_51f=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
_51b.post({url:_520,headers:{"Content-Encoding":"UTF-8"},handleAs:"text",preventCache:true,load:_51d,error:_51e,handle:_51f});
},getList:function(path,_521,_522,_523){
var _524="servlet/PathResolver"+"?r=l&p="+path;
if(_522==undefined){
_522=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_523==undefined){
_523=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
_51b.post({url:_524,headers:{"Content-Encoding":"UTF-8"},handleAs:"json",preventCache:true,load:_521,error:_522,handle:_523});
},getRaw:function(path,_525,_526,_527){
var _528="servlet/PathResolver"+"?r=j&p="+path;
if(_526==undefined){
_526=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_527==undefined){
_527=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
_51b.post({url:_528,headers:{"Content-Encoding":"UTF-8"},handleAs:"json",preventCache:true,load:_525,error:_526,handle:_527});
},set:function(path,_529,_52a,_52b,_52c){
var _52d="servlet/PathResolver"+"?r=x&p="+path+"&v="+encodeURIComponent(_529);
if(_52b==undefined||_52b==null){
_52b=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_52c==undefined||_52c==null){
_52c=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
if(_52a==undefined||_52a==null){
_52a=dojo.hitch(this,this.handleClientDataAccessorSuccess);
}
_51b.post({url:_52d,headers:{"Content-Encoding":"UTF-8"},handleAs:"text",preventCache:true,load:_52a,error:_52b,handle:_52c});
},handleClientDataAccessorError:function(_52e,_52f){
var _530=_51c.getProperty("curam.ui.ClientDataAccessor.err.1")+"PathResolverServlet : ";
var _531=_51c.getProperty("curam.ui.ClientDataAccessor.err.2");
curam.debug.log(_530+_52e+_531+_52f);
},handleClientDataAccessorSuccess:function(_532,_533){
curam.debug.log("curam.ui.ClientDataAccessor.handleClientDataAccessorSuccess : "+_532);
},handleClientDataAccessorCallback:function(_534,_535){
curam.debug.log("curam.ui.ClientDataAccessor.handleClientDataAccessorCallback :"+" "+_51c.getProperty("curam.ui.ClientDataAccessor.callback"));
}});
});
},"dijit/BackgroundIframe":function(){
define("dijit/BackgroundIframe",["require",".","dojo/_base/config","dojo/dom-construct","dojo/dom-style","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window"],function(_536,_537,_538,_539,_53a,lang,on,has,win){
has.add("bgIframe",has("ie")||has("mozilla"));
var _53b=new function(){
var _53c=[];
this.pop=function(){
var _53d;
if(_53c.length){
_53d=_53c.pop();
_53d.style.display="";
}else{
if(has("ie")<9){
var burl=_538["dojoBlankHtmlUrl"]||_536.toUrl("dojo/resources/blank.html")||"javascript:\"\"";
var html="<iframe src='"+burl+"' role='presentation'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_53d=win.doc.createElement(html);
}else{
_53d=_539.create("iframe");
_53d.src="javascript:\"\"";
_53d.className="dijitBackgroundIframe";
_53d.setAttribute("role","presentation");
_53a.set(_53d,"opacity",0.1);
}
_53d.tabIndex=-1;
}
return _53d;
};
this.push=function(_53e){
_53e.style.display="none";
_53c.push(_53e);
};
}();
_537.BackgroundIframe=function(node){
if(!node.id){
throw new Error("no id");
}
if(has("bgIframe")){
var _53f=(this.iframe=_53b.pop());
node.appendChild(_53f);
if(has("ie")<7||has("quirks")){
this.resize(node);
this._conn=on(node,"resize",lang.hitch(this,function(){
this.resize(node);
}));
}else{
_53a.set(_53f,{width:"100%",height:"100%"});
}
}
};
lang.extend(_537.BackgroundIframe,{resize:function(node){
if(this.iframe){
_53a.set(this.iframe,{width:node.offsetWidth+"px",height:node.offsetHeight+"px"});
}
},destroy:function(){
if(this._conn){
this._conn.remove();
this._conn=null;
}
if(this.iframe){
_53b.push(this.iframe);
delete this.iframe;
}
}});
return _537.BackgroundIframe;
});
},"curam/util/Constants":function(){
define("curam/util/Constants",["curam/define"],function(){
curam.define.singleton("curam.util.Constants",{RETURN_PAGE_PARAM:"__o3rpu"});
return curam.util.Constants;
});
},"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n","dijit/form/Button":function(){
require({cache:{"url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n"}});
define("dijit/form/Button",["require","dojo/_base/declare","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/ready","./_FormWidget","./_ButtonMixin","dojo/text!./templates/Button.html"],function(_540,_541,_542,_543,lang,_544,_545,_546,_547){
if(!_543.isAsync){
_544(0,function(){
var _548=["dijit/form/DropDownButton","dijit/form/ComboButton","dijit/form/ToggleButton"];
_540(_548);
});
}
return _541("dijit.form.Button",[_545,_546],{showLabel:true,iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},baseClass:"dijitButton",templateString:_547,_setValueAttr:"valueNode",_onClick:function(e){
var ok=this.inherited(arguments);
if(ok){
if(this.valueNode){
this.valueNode.click();
e.preventDefault();
}
}
return ok;
},_fillContent:function(_549){
if(_549&&(!this.params||!("label" in this.params))){
var _54a=lang.trim(_549.innerHTML);
if(_54a){
this.label=_54a;
}
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
_542.toggle(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},setLabel:function(_54b){
_543.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_54b);
},_setLabelAttr:function(_54c){
this.inherited(arguments);
if(!this.showLabel&&!("title" in this.params)){
this.titleNode.title=lang.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
}});
});
},"dijit/_WidgetBase":function(){
define("dijit/_WidgetBase",["require","dojo/_base/array","dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/ready","dojo/Stateful","dojo/topic","dojo/_base/window","./registry"],function(_54d,_54e,_54f,_550,_551,_552,dom,_553,_554,_555,_556,_557,_558,lang,on,_559,_55a,_55b,win,_55c){
var _55d=typeof (dojo.global.perf)!="undefined";
if(!_558.isAsync){
_559(0,function(){
var _55e=["dijit/_base/manager"];
_54d(_55e);
});
}
var _55f={};
function _560(obj){
var ret={};
for(var attr in obj){
ret[attr.toLowerCase()]=true;
}
return ret;
};
function _561(attr){
return function(val){
_553[val?"set":"remove"](this.domNode,attr,val);
this._set(attr,val);
};
};
return _552("dijit._WidgetBase",_55a,{id:"",_setIdAttr:"domNode",lang:"",_setLangAttr:_561("lang"),dir:"",_setDirAttr:_561("dir"),textDir:"","class":"",_setClassAttr:{node:"domNode",type:"class"},style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{},_blankGif:_550.blankGif||_54d.toUrl("dojo/resources/blank.gif"),postscript:function(_562,_563){
this.create(_562,_563);
},create:function(_564,_565){
if(_55d){
perf.widgetStartedLoadingCallback();
}
this.srcNodeRef=dom.byId(_565);
this._connects=[];
this._supportingWidgets=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_564){
this.params=_564;
lang.mixin(this,_564);
}
this.postMixInProperties();
if(!this.id){
this.id=_55c.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
_55c.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _566=this.srcNodeRef;
if(_566&&_566.parentNode&&this.domNode!==_566){
_566.parentNode.replaceChild(this.domNode,_566);
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
if(_55d){
perf.widgetLoadedCallback(this);
}
},_applyAttributes:function(){
var ctor=this.constructor,list=ctor._setterAttrs;
if(!list){
list=(ctor._setterAttrs=[]);
for(var attr in this.attributeMap){
list.push(attr);
}
var _567=ctor.prototype;
for(var _568 in _567){
if(_568 in this.attributeMap){
continue;
}
var _569="_set"+_568.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
})+"Attr";
if(_569 in _567){
list.push(_568);
}
}
}
_54e.forEach(list,function(attr){
if(this.params&&attr in this.params){
}else{
if(this[attr]){
this.set(attr,this[attr]);
}
}
},this);
for(var _56a in this.params){
this.set(_56a,this[_56a]);
}
},postMixInProperties:function(){
},buildRendering:function(){
if(!this.domNode){
this.domNode=this.srcNodeRef||_555.create("div");
}
if(this.baseClass){
var _56b=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_56b=_56b.concat(_54e.map(_56b,function(name){
return name+"Rtl";
}));
}
_554.add(this.domNode,_56b);
}
},postCreate:function(){
},startup:function(){
if(this._started){
return;
}
this._started=true;
_54e.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
},destroyRecursive:function(_56c){
this._beingDestroyed=true;
this.destroyDescendants(_56c);
this.destroy(_56c);
},destroy:function(_56d){
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
this.destroyRendering(_56d);
_55c.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_56e){
if(this.bgIframe){
this.bgIframe.destroy(_56e);
delete this.bgIframe;
}
if(this.domNode){
if(_56e){
_553.remove(this.domNode,"widgetId");
}else{
_555.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_56e){
_555.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_56f){
_54e.forEach(this.getChildren(),function(_570){
if(_570.destroyRecursive){
_570.destroyRecursive(_56f);
}
});
},uninitialize:function(){
return false;
},_setStyleAttr:function(_571){
var _572=this.domNode;
if(lang.isObject(_571)){
_557.set(_572,_571);
}else{
if(_572.style.cssText){
_572.style.cssText+="; "+_571;
}else{
_572.style.cssText=_571;
}
}
this._set("style",_571);
},_attrToDom:function(attr,_573,_574){
_574=arguments.length>=3?_574:this.attributeMap[attr];
_54e.forEach(lang.isArray(_574)?_574:[_574],function(_575){
var _576=this[_575.node||_575||"domNode"];
var type=_575.type||"attribute";
switch(type){
case "attribute":
if(lang.isFunction(_573)){
_573=lang.hitch(this,_573);
}
var _577=_575.attribute?_575.attribute:(/^on[A-Z][a-zA-Z]*$/.test(attr)?attr.toLowerCase():attr);
_553.set(_576,_577,_573);
break;
case "innerText":
_576.innerHTML="";
_576.appendChild(win.doc.createTextNode(_573));
break;
case "innerHTML":
_576.innerHTML=_573;
break;
case "class":
_554.replace(_576,_573,this[attr]);
break;
}
},this);
},get:function(name){
var _578=this._getAttrNames(name);
return this[_578.g]?this[_578.g]():this[name];
},set:function(name,_579){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _57a=this._getAttrNames(name),_57b=this[_57a.s];
if(lang.isFunction(_57b)){
var _57c=_57b.apply(this,Array.prototype.slice.call(arguments,1));
}else{
var _57d=this.focusNode&&!lang.isFunction(this.focusNode)?"focusNode":"domNode",tag=this[_57d].tagName,_57e=_55f[tag]||(_55f[tag]=_560(this[_57d])),map=name in this.attributeMap?this.attributeMap[name]:_57a.s in this?this[_57a.s]:((_57a.l in _57e&&typeof _579!="function")||/^aria-|^data-|^role$/.test(name))?_57d:null;
if(map!=null){
this._attrToDom(name,_579,map);
}
this._set(name,_579);
}
return _57c||this;
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
});
return (apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr",l:uc.toLowerCase()});
},_set:function(name,_57f){
var _580=this[name];
this[name]=_57f;
if(this._watchCallbacks&&this._created&&_57f!==_580){
this._watchCallbacks(name,_580,_57f);
}
},on:function(type,func){
return _54f.after(this,this._onMap(type),func,true);
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
return this.containerNode?_55c.findWidgets(this.containerNode):[];
},getParent:function(){
return _55c.getEnclosingWidget(this.domNode.parentNode);
},connect:function(obj,_581,_582){
var _583=_551.connect(obj,_581,this,_582);
this._connects.push(_583);
return _583;
},disconnect:function(_584){
var i=_54e.indexOf(this._connects,_584);
if(i!=-1){
_584.remove();
this._connects.splice(i,1);
}
},subscribe:function(t,_585){
var _586=_55b.subscribe(t,lang.hitch(this,_585));
this._connects.push(_586);
return _586;
},unsubscribe:function(_587){
this.disconnect(_587);
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):_556.isBodyLtr();
},isFocusable:function(){
return this.focus&&(_557.get(this.domNode,"display")!="none");
},placeAt:function(_588,_589){
if(_588.declaredClass&&_588.addChild){
_588.addChild(this,_589);
}else{
_555.place(this.domNode,_588,_589);
}
return this;
},getTextDir:function(text,_58a){
return _58a;
},applyTextDir:function(){
},defer:function(fcn,_58b){
var _58c=setTimeout(lang.hitch(this,function(){
_58c=null;
if(!this._destroyed){
lang.hitch(this,fcn)();
}
}),_58b||0);
return {remove:function(){
if(_58c){
clearTimeout(_58c);
_58c=null;
}
return null;
}};
}});
});
},"curam/util":function(){
define("curam/util",["dojo/dom","dijit/registry","dojo/dom-construct","dojo/ready","dojo/_base/window","dojo/dom-style","dojo/_base/array","dojo/dom-class","dojo/topic","dojo/_base/event","dojo/query","dojo/has","dojo/_base/unload","dojo/dom-geometry","dojo/_base/json","dojo/dom-attr","dojo/_base/lang","dojo/on","curam/define","curam/debug","curam/util/RuntimeContext","curam/util/Constants","dojo/_base/sniff","cm/_base/_dom","curam/util/ResourceBundle"],function(dom,_58d,_58e,_58f,_590,_591,_592,_593,_594,_595,_596,has,_597,geom,json,attr,lang,on){
dojo.requireLocalization("curam.application","Debug");
var _598=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util",{PREVENT_CACHE_FLAG:"o3pc",INFORMATIONAL_MSGS_STORAGE_ID:"__informationals__",ERROR_MESSAGES_CONTAINER:"error-messages-container",ERROR_MESSAGES_LIST:"error-messages",CACHE_BUSTER:0,CACHE_BUSTER_PARAM_NAME:"o3nocache",msgLocaleSelectorActionPage:"$not-locaized$ Usage of the Language Selector is not permitted from an editable page that has previously been submitted.",insertCssText:function(_599,_59a){
var id=_59a?_59a:"_runtime_stylesheet_";
var _59b=dom.byId(id);
var _59c;
if(_59b){
if(_59b.styleSheet){
_599=_59b.styleSheet.cssText+_599;
_59c=_59b;
_59c.setAttribute("id","_nodeToRm");
}else{
_59b.appendChild(document.createTextNode(_599));
return;
}
}
var pa=document.getElementsByTagName("head")[0];
_59b=_58e.create("style",{type:"text/css",id:id});
if(_59b.styleSheet){
_59b.styleSheet.cssText=_599;
}else{
_59b.appendChild(document.createTextNode(_599));
}
pa.appendChild(_59b);
if(_59c){
_59c.parentNode.removeChild(_59c);
}
},fireRefreshTreeEvent:function(){
if(dojo.global.parent&&dojo.global.parent.amIFrame){
var wpl=dojo.global.parent.loader;
}
if(wpl&&wpl.dojo){
wpl.dojo.publish("refreshTree");
}
},firePageSubmittedEvent:function(_59d){
require(["curam/tab"],function(){
var _59e=curam.tab.getSelectedTab();
if(_59e){
var _59f=curam.tab.getTabWidgetId(_59e);
var _5a0=curam.util.getTopmostWindow();
var ctx=(_59d=="dialog")?curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_DIALOG:curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN;
_5a0.curam.util.Refresh.getController(_59f).pageSubmitted(dojo.global.jsPageID,ctx);
_5a0.dojo.publish("/curam/main-content/page/submitted",[dojo.global.jsPageID,_59f]);
}else{
curam.debug.log("/curam/main-content/page/submitted: "+_598.getProperty("curam.util.no.open"));
}
});
},fireTabOpenedEvent:function(_5a1){
curam.util.getTopmostWindow().dojo.publish("curam.tabOpened",[dojo.global.jsPageID,_5a1]);
},setupSubmitEventPublisher:function(){
_58f(function(){
var form=dom.byId("mainForm");
if(form){
curam.util.connect(form,"onsubmit",function(){
curam.util.firePageSubmittedEvent("main-content");
});
}
});
},getScrollbar:function(){
var _5a2=_58e.create("div",{},_590.body());
_591.set(_5a2,{width:"100px",height:"100px",overflow:"scroll",position:"absolute",top:"-300px",left:"0px"});
var test=_58e.create("div",{},_5a2);
_591.set(test,{width:"400px",height:"400px"});
var _5a3=_5a2.offsetWidth-_5a2.clientWidth;
_58e.destroy(_5a2);
return {width:_5a3};
},isModalWindow:function(){
return (dojo.global.curamModal===undefined)?false:true;
},getTopmostWindow:function(){
if(typeof (dojo.global._curamTopmostWindow)=="undefined"){
var _5a4=dojo.global;
if(typeof (dojo.global.jsScreenContext)!="undefined"&&dojo.global.jsScreenContext.hasContextBits("CONTEXT_PORTLET")){
dojo.global._curamTopmostWindow=_5a4;
}else{
if(_5a4.__extAppTopWin){
dojo.global._curamTopmostWindow=_5a4;
}else{
while(_5a4.parent!=_5a4){
_5a4=_5a4.parent;
if(_5a4.__extAppTopWin){
break;
}
}
dojo.global._curamTopmostWindow=_5a4;
}
}
}
if(dojo.global._curamTopmostWindow.location.href.indexOf("AppController.do")<0&&typeof (dojo.global._curamTopmostWindow.__extAppTopWin)=="undefined"){
curam.debug.log(_598.getProperty("curam.util.wrong.window")+dojo.global._curamTopmostWindow.location.href);
}
return dojo.global._curamTopmostWindow;
},getUrlParamValue:function(url,_5a5){
var qPos=url.indexOf("?");
if(qPos<0){
return null;
}
var _5a6=url.substring(qPos+1,url.length);
function _5a7(_5a8){
var _5a9=_5a6.split(_5a8);
_5a5+="=";
for(var i=0;i<_5a9.length;i++){
if(_5a9[i].indexOf(_5a5)==0){
return _5a9[i].split("=")[1];
}
}
};
return _5a7("&")||_5a7("");
},addUrlParam:function(href,_5aa,_5ab,_5ac){
var hasQ=href.indexOf("?")>-1;
var _5ad=_5ac?_5ac:"undefined";
if(!hasQ||(_5ad==false)){
return href+(hasQ?"&":"?")+_5aa+"="+_5ab;
}else{
var _5ae=href.split("?");
href=_5ae[0]+"?"+_5aa+"="+_5ab+(_5ae[1]!=""?("&"+_5ae[1]):"");
return href;
}
},replaceUrlParam:function(href,_5af,_5b0){
href=curam.util.removeUrlParam(href,_5af);
return curam.util.addUrlParam(href,_5af,_5b0);
},removeUrlParam:function(url,_5b1,_5b2){
var qPos=url.indexOf("?");
if(qPos<0){
return url;
}
if(url.indexOf(_5b1+"=")<0){
return url;
}
var _5b3=url.substring(qPos+1,url.length);
var _5b4=_5b3.split("&");
var _5b5;
var _5b6,_5b7;
for(var i=0;i<_5b4.length;i++){
if(_5b4[i].indexOf(_5b1+"=")==0){
_5b7=false;
if(_5b2){
_5b6=_5b4[i].split("=");
if(_5b6.length>1){
if(_5b6[1]==_5b2){
_5b7=true;
}
}else{
if(_5b2==""){
_5b7=true;
}
}
}else{
_5b7=true;
}
if(_5b7){
_5b4.splice(i,1);
i--;
}
}
}
return url.substring(0,qPos+1)+_5b4.join("&");
},stripHash:function(url){
var idx=url.indexOf("#");
if(idx<0){
return url;
}
return url.substring(0,url);
},isSameUrl:function(_5b8,_5b9,rtc){
if(!_5b9){
_5b9=rtc.getHref();
}
if(_5b8.indexOf("#")==0){
return true;
}
var _5ba=_5b8.indexOf("#");
if(_5ba>-1){
if(_5ba==0){
return true;
}
var _5bb=_5b8.split("#");
var _5bc=_5b9.indexOf("#");
if(_5bc>-1){
if(_5bc==0){
return true;
}
_5b9=_5b9.split("#")[0];
}
return _5bb[0]==_5b9;
}
var _5bd=function(url){
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
var here=curam.util.stripHash(rp(_5b9,curam.util.Constants.RETURN_PAGE_PARAM));
var _5be=curam.util.stripHash(rp(_5b8,curam.util.Constants.RETURN_PAGE_PARAM));
var _5bf=_5be.split("?");
var _5c0=here.split("?");
_5c0[0]=_5bd(_5c0[0]);
_5bf[0]=_5bd(_5bf[0]);
var _5c1=(_5c0[0]==_5bf[0]||_5c0[0].match(_5bf[0]+"$")==_5bf[0]);
if(!_5c1){
return false;
}
if(_5c0.length==1&&_5bf.length==1&&_5c1){
return true;
}else{
var _5c2;
var _5c3;
if(typeof _5c0[1]!="undefined"&&_5c0[1]!=""){
_5c2=_5c0[1].split("&");
}else{
_5c2=new Array();
}
if(typeof _5bf[1]!="undefined"&&_5bf[1]!=""){
_5c3=_5bf[1].split("&");
}else{
_5c3=new Array();
}
curam.debug.log("curam.util.isSameUrl: paramsHere "+_598.getProperty("curam.util.before")+_5c2.length);
_5c2=_592.filter(_5c2,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_598.getProperty("curam.util.after")+_5c2.length);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_598.getProperty("curam.util.before")+_5c3.length);
_5c3=_592.filter(_5c3,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_598.getProperty("curam.util.after")+_5c3.length);
if(_5c2.length!=_5c3.length){
return false;
}
var _5c4={};
var _5c5;
for(var i=0;i<_5c2.length;i++){
_5c5=_5c2[i].split("=");
_5c4[_5c5[0]]=_5c5[1];
}
for(var i=0;i<_5c3.length;i++){
_5c5=_5c3[i].split("=");
if(_5c4[_5c5[0]]!=_5c5[1]){
curam.debug.log(_598.getProperty("curam.util.no.match",[_5c5[0],_5c5[1],_5c4[_5c5[0]]]));
return false;
}
}
}
return true;
},isNotCDEJParam:function(_5c6){
return !((_5c6.charAt(0)=="o"&&_5c6.charAt(1)=="3")||(_5c6.charAt(0)=="_"&&_5c6.charAt(1)=="_"&&_5c6.charAt(2)=="o"&&_5c6.charAt(3)=="3"));
},setAttributes:function(node,map){
for(var x in map){
node.setAttribute(x,map[x]);
}
},invalidatePage:function(){
curam.PAGE_INVALIDATED=true;
var _5c7=dojo.global.dialogArguments?dojo.global.dialogArguments[0]:opener;
if(_5c7&&_5c7!=dojo.global){
try{
_5c7.curam.util.invalidatePage();
}
catch(e){
curam.debug.log(_598.getProperty("curam.util.error"),e);
}
}
},redirectWindow:function(href,_5c8,_5c9){
var rtc=new curam.util.RuntimeContext(dojo.global);
var _5ca=function(_5cb,_5cc,href,_5cd,_5ce){
curam.util.getFrameRoot(_5cb,_5cc).curam.util.redirectContentPanel(href,_5cd,_5ce);
};
curam.util._doRedirectWindow(href,_5c8,_5c9,dojo.global.jsScreenContext,rtc,curam.util.publishRefreshEvent,_5ca);
},_doRedirectWindow:function(href,_5cf,_5d0,_5d1,rtc,_5d2,_5d3){
if(href&&curam.util.isActionPage(href)){
curam.debug.log(_598.getProperty("curam.util.stopping"),href);
return;
}
var rpl=curam.util.replaceUrlParam;
var _5d4=_5d1.hasContextBits("TREE")||_5d1.hasContextBits("AGENDA")||_5d1.hasContextBits("ORG_TREE");
if(curam.util.FORCE_REFRESH){
href=rpl(rtc.getHref(),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
if(curam.util.isModalWindow()||_5d4){
_5d2();
dojo.global.location.href=href;
}else{
if(_5d1.hasContextBits("LIST_ROW_INLINE_PAGE")||_5d1.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(href);
}else{
_5d2();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
require(["curam/tab"],function(){
_5d3(dojo.global,curam.tab.getTabController().ROOT_OBJ,href,true,true);
});
}
}
}
return;
}
var u=curam.util;
var rtc=new curam.util.RuntimeContext(dojo.global);
if(!_5d4&&!_5cf&&!curam.PAGE_INVALIDATED&&u.isSameUrl(href,null,rtc)){
return;
}
if(curam.util.isModalWindow()||_5d4){
href=rpl(rpl(href,"o3frame","modal"),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
var form=_58e.create("form",{action:href,method:"POST"});
if(!_5d4){
if(!dom.byId("o3ctx")){
form.action=curam.util.removeUrlParam(form.action,"o3ctx");
var _5d5=_58e.create("input",{type:"hidden",id:"o3ctx",name:"o3ctx",value:_5d1.getValue()},form);
}
_590.body().appendChild(form);
_5d2();
form.submit();
}
if(!_5d0){
if(_5d4){
curam.util.redirectFrame(href);
}
}
}else{
if(_5d1.hasContextBits("LIST_ROW_INLINE_PAGE")||_5d1.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(href);
}else{
_5d2();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
if(_5d1.hasContextBits("EXTAPP")){
var _5d6=window.top;
_5d6.dijit.byId("curam-app").updateMainContentIframe(href);
}else{
require(["curam/tab"],function(){
curam.util.getFrameRoot(dojo.global,curam.tab.getTabController().ROOT_OBJ).curam.util.redirectContentPanel(href,_5cf);
});
}
}
}
}
},_handleInlinePageRefresh:function(href){
curam.debug.log(_598.getProperty("curam.util.closing.modal"),href);
var _5d7=new curam.ui.PageRequest(href);
require(["curam/tab"],function(){
curam.tab.getTabController().checkPage(_5d7,function(_5d8){
curam.util.publishRefreshEvent();
dojo.global.location.reload(true);
});
});
},redirectContentPanel:function(url,_5d9,_5da){
require(["curam/tab"],function(){
var _5db=curam.tab.getContentPanelIframe();
var _5dc=url;
if(_5db!=null){
var rpu=curam.util.Constants.RETURN_PAGE_PARAM;
var _5dd=null;
if(url.indexOf(rpu+"=")>=0){
curam.debug.log("curam.util.redirectContentPanel: "+_598.getProperty("curam.util.rpu"));
_5dd=decodeURIComponent(curam.util.getUrlParamValue(url,rpu));
}
if(_5dd){
_5dd=curam.util.removeUrlParam(_5dd,rpu);
_5dc=curam.util.replaceUrlParam(url,rpu,encodeURIComponent(_5dd));
}
}
var _5de=new curam.ui.PageRequest(_5dc);
if(_5d9){
_5de.forceLoad=true;
}
if(_5da){
_5de.justRefresh=true;
}
curam.tab.getTabController().handlePageRequest(_5de);
});
},redirectFrame:function(href){
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
var _5df=curam.util.getFrameRoot(dojo.global,"wizard").targetframe;
_5df.curam.util.publishRefreshEvent();
_5df.location.href=href;
}else{
if(dojo.global.jsScreenContext.hasContextBits("ORG_TREE")){
var _5df=curam.util.getFrameRoot(dojo.global,"orgTreeRoot");
_5df.curam.util.publishRefreshEvent();
_5df.dojo.publish("orgTree.refreshContent",[href]);
}else{
var _5e0=curam.util.getFrameRoot(dojo.global,"iegtree");
var _5e1=_5e0.navframe||_5e0.frames[0];
var _5e2=_5e0.contentframe||_5e0.frames["contentframe"];
_5e2.curam.util.publishRefreshEvent();
if(curam.PAGE_INVALIDATED||_5e1.curam.PAGE_INVALIDATED){
var _5e3=curam.util.modifyUrlContext(href,"ACTION");
_5e2.location.href=_5e3;
}else{
_5e2.location.href=href;
}
}
}
return true;
},publishRefreshEvent:function(){
_594.publish("/curam/page/refresh");
},openGenericErrorModalDialog:function(_5e4,_5e5,_5e6,_5e7,_5e8){
var url;
var _5e9;
var sc=new curam.util.ScreenContext("MODAL");
var _5ea="titlePropertyName="+_5e5+"&";
var _5eb="messagePropertyName="+_5e6+"&";
var _5ec="errorModal="+_5e8+"&";
if(_5e7){
_5e9="messagePlaceholder1="+_5e7+"&";
url="generic-modal-error.jspx?"+_5ea+_5eb+_5e9+_5ec+sc.toRequestString();
}else{
url="generic-modal-error.jspx?"+_5ea+_5eb+sc.toRequestString();
}
curam.util.openModalDialog({href:url},_5e4);
},openModalDialog:function(_5ed,_5ee,left,top,_5ef){
var href;
if(!_5ed||!_5ed.href){
_5ed=_595.fix(_5ed);
var _5f0=_5ed.target;
while(_5f0.tagName!="A"&&_5f0!=_590.body()){
_5f0=_5f0.parentNode;
}
href=_5f0.href;
_5f0._isModal=true;
_595.stop(_5ed);
}else{
href=_5ed.href;
_5ed._isModal=true;
}
require(["curam/dialog"]);
var opts=curam.dialog.parseWindowOptions(_5ee);
curam.util.showModalDialog(href,_5ed,opts["width"],opts["height"],left,top,false,null,null,_5ef);
return false;
},showModalDialog:function(url,_5f1,_5f2,_5f3,left,top,_5f4,_5f5,_5f6,_5f7){
var _5f8=curam.util.getTopmostWindow();
if(dojo.global!=_5f8){
curam.debug.log("curam.util.showModalDialog: "+_598.getProperty("curam.util.redirecting.modal"));
_5f8.curam.util.showModalDialog(url,_5f1,_5f2,_5f3,left,top,_5f4,_5f5,dojo.global,_5f7);
return;
}
var rup=curam.util.replaceUrlParam;
url=rup(url,"o3frame","modal");
url=curam.util.modifyUrlContext(url,"MODAL","TAB|LIST_ROW_INLINE_PAGE|LIST_EVEN_ROW|NESTED_UIM");
url=rup(url,curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
curam.debug.log(_598.getProperty("curam.util.modal.url"),url);
if(_5f2){
_5f2=typeof (_5f2)=="number"?_5f2:parseInt(_5f2);
}
if(_5f3){
_5f3=typeof (_5f3)=="number"?_5f3:parseInt(_5f3);
}
if(!curam.util._isModalCurrentlyOpening()){
curam.util._setModalCurrentlyOpening(true);
require(["curam/ModalDialog"]);
new curam.ModalDialog({href:url,width:_5f2,height:_5f3,openNode:(_5f1&&_5f1.target)?_5f1.target:null,parentWindow:_5f6,uimToken:_5f7});
}
},_isModalCurrentlyOpening:function(){
return curam.util.getTopmostWindow().curam.util._modalOpenInProgress;
},_setModalCurrentlyOpening:function(_5f9){
curam.util.getTopmostWindow().curam.util._modalOpenInProgress=_5f9;
},setupPreferencesLink:function(href){
_58f(function(){
var _5fa=_596(".user-preferences")[0];
if(_5fa){
if(typeof (_5fa._disconnectToken)=="undefined"){
_5fa._disconnectToken=curam.util.connect(_5fa,"onclick",curam.util.openPreferences);
}
if(!href){
href=dojo.global.location.href;
}
if(curam.util.isActionPage(href)){
_593.replace(_5fa,"disabled","enabled");
_5fa._curamDisable=true;
}else{
_593.replace(_5fa,"enabled","disabled");
_5fa._curamDisable=false;
}
}else{
curam.debug.log(_598.getProperty("curam.util.no.setup"));
}
});
},openPreferences:function(_5fb){
_595.stop(_5fb);
if(_5fb.target._curamDisable){
return;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("user-prefs-editor.jspx",{dialogOptions:"width=450"});
});
},openAbout:function(_5fc){
_595.stop(_5fc);
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("about.jsp",{dialogOptions:"width=645,height=480"});
});
},addMinWidthCalendarCluster:function(id){
var _5fd=dom.byId(id);
var i=0;
function _5fe(evt){
_592.forEach(_5fd.childNodes,function(node){
if(_593.contains(node,"cluster")){
_591.set(node,"width","97%");
if(node.clientWidth<700){
_591.set(node,"width","700px");
}
}
});
};
if(has("ie")>6){
_592.forEach(_5fd.childNodes,function(node){
if(_593.contains(node,"cluster")){
_591.set(node,"minWidth","700px");
}
});
}else{
on(dojo.global,"resize",_5fe);
_58f(_5fe);
}
},addPopupFieldListener:function(id){
if(!has("ie")||has("ie")>6){
return;
}
if(!curam.util._popupFields){
function _5ff(evt){
var _600=0;
var j=0;
var x=0;
var arr=curam.util._popupFields;
_592.forEach(curam.util._popupFields,function(id){
var _601=dom.byId(id);
_596("> .popup-actions",_601).forEach(function(node){
_600=node.clientWidth+30;
});
_596("> .desc",_601).forEach(function(node){
_591.set(node,"width",Math.max(0,_601.clientWidth-_600)+"px");
});
});
};
curam.util._popupFields=[id];
on(dojo.global,"resize",_5ff);
_58f(_5ff);
}else{
curam.util._popupFields.push(id);
}
},addContentWidthListener:function(id){
if(has("ie")>6){
return;
}
var _602=_591.set;
var _603=_593.contains;
function _604(evt){
var i=0;
var _605=dom.byId("content");
if(_605){
var _606=_605.clientWidth;
if(has("ie")==6&&dom.byId("footer")){
var _607=_590.body().clientHeight-100;
_602(_605,"height",_607+"px");
var _608=dom.byId("sidebar");
if(_608){
_602(_608,"height",_607+"px");
}
}
try{
_596("> .page-title-bar",_605).forEach(function(node){
var _609=geom.getMarginSize(node).w-geom.getContentBox(node).w;
if(!has("ie")){
_609+=1;
}
_606=_605.clientWidth-_609;
_591.set(node,"width",_606+"px");
});
}
catch(e){
}
_596("> .page-description",_605).style("width",_606+"px");
_596("> .in-page-navigation",_605).style("width",_606+"px");
}
};
curam.util.subscribe("/clusterToggle",_604);
curam.util.connect(dojo.global,"onresize",_604);
_58f(_604);
},alterScrollableListBottomBorder:function(id,_60a){
var _60b=_60a;
var _60c="#"+id+" table";
function _60d(){
var _60e=_596(_60c)[0];
if(_60e.offsetHeight>=_60b){
var _60f=_596(".odd-last-row",_60e)[0];
if(typeof _60f!="undefined"){
_593.add(_60f,"no-bottom-border");
}
}else{
if(_60e.offsetHeight<_60b){
var _60f=_596(".even-last-row",_60e)[0];
if(typeof _60f!="undefined"){
_593.add(_60f,"add-bottom-border");
}
}else{
curam.debug.log("curam.util.alterScrollableListBottomBorder: "+_598.getProperty("curam.util.code"));
}
}
};
_58f(_60d);
},addFileUploadResizeListener:function(code){
function _610(evt){
if(_596(".widget")){
_596(".widget").forEach(function(_611){
var _612=_611.clientWidth;
if(_596(".fileUpload",_611)){
_596(".fileUpload",_611).forEach(function(_613){
fileUploadWidth=_612/30;
if(fileUploadWidth<4){
_613.size=1;
}else{
_613.size=fileUploadWidth;
}
});
}
});
}
};
on(dojo.global,"resize",_610);
_58f(_610);
},openCenteredNonModalWindow:function(url,_614,_615,name){
_614=Number(_614);
_615=Number(_615);
var _616=(screen.width-_614)/2;
var _617=(screen.height-_615)/2;
_615=_617<0?screen.height:_615;
_617=Math.max(0,_617);
_614=_616<0?screen.width:_614;
_616=Math.max(0,_616);
var left="left",top="top";
if(has("ff")){
left="screenX",top="screenY";
}
var _618="location=no, menubar=no, status=no, toolbar=no, "+"scrollbars=yes, resizable=no";
var _619=dojo.global.open(url,name||"name","width="+_614+", height="+_615+", "+left+"="+_616+","+top+"="+_617+","+_618);
_619.resizeTo(_614,_615);
_619.moveTo(_616,_617);
_619.focus();
},adjustTargetContext:function(win,href){
if(win&&win.dojo.global.jsScreenContext){
var _61a=win.dojo.global.jsScreenContext;
_61a.updateStates(dojo.global.jsScreenContext);
return curam.util.replaceUrlParam(href,"o3ctx",_61a.getValue());
}
return href;
},modifyUrlContext:function(url,_61b,_61c){
var _61d=url;
var ctx=new curam.util.ScreenContext();
var _61e=curam.util.getUrlParamValue(url,"o3ctx");
if(_61e){
ctx.setContext(_61e);
}else{
ctx.clear();
}
if(_61b){
ctx.addContextBits(_61b);
}
if(_61c){
ctx.clear(_61c);
}
_61d=curam.util.replaceUrlParam(url,"o3ctx",ctx.getValue());
return _61d;
},updateCtx:function(_61f){
var _620=curam.util.getUrlParamValue(_61f,"o3ctx");
if(!_620){
return _61f;
}
return curam.util.modifyUrlContext(_61f,null,"MODAL");
},getFrameRoot:function(_621,_622){
var _623=false;
var _624=_621;
if(_624){
while(_624!=top&&!_624.rootObject){
_624=_624.parent;
}
if(_624.rootObject){
_623=(_624.rootObject==_622);
}
}
return _623?_624:null;
},saveInformationalMsgs:function(_625){
curam.util.runStorageFn(function(){
try{
var _626=curam.util.getTopmostWindow().dojox;
_626.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,json.toJson({pageID:_590.body().id,total:dom.byId(curam.util.ERROR_MESSAGES_CONTAINER).innerHTML,listItems:dom.byId(curam.util.ERROR_MESSAGES_LIST).innerHTML}));
}
catch(e){
curam.debug.log(_598.getProperty("curam.util.exception"),e);
}
},_625);
},runStorageFn:function(fn,_627){
var _628=function(){
fn();
if(_627){
setTimeout(_627,10);
}
};
var _629=curam.util.getTopmostWindow().dojox;
require(["dojox/storage"],function(){
var mgr=_629.storage.manager;
if(mgr.isInitialized()){
_628();
}else{
if(mgr.addOnLoad){
mgr.addOnLoad(_628);
}else{
var _62a={exp:_628};
on(mgr,"loaded",_62a,"exp");
}
}
});
},disableInformationalLoad:function(){
curam.util._informationalsDisabled=true;
},redirectDirectUrl:function(){
_58f(function(){
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
_58f(function(){
if(dojo.global.jsScreenContext.hasContextBits("CONTEXT_PANEL")){
return;
}
if(curam.util._informationalsDisabled){
return;
}
curam.util.runStorageFn(function(){
var _62b=curam.util.getTopmostWindow().dojox;
var msgs=_62b.storage.get(curam.util.INFORMATIONAL_MSGS_STORAGE_ID);
if(msgs&&msgs!=""){
msgs=json.fromJson(msgs);
_62b.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,"");
var div=dom.byId(curam.util.ERROR_MESSAGES_CONTAINER);
var list=dom.byId(curam.util.ERROR_MESSAGES_LIST);
if(msgs.pageID!=_590.body().id){
return;
}
if(list){
var _62c=_58e.create("ul",{innerHTML:msgs.listItems});
var _62d=[];
for(var i=0;i<list.childNodes.length;i++){
if(list.childNodes[i].tagName=="LI"){
_62d.push(list.childNodes[i]);
}
}
var skip=false;
var _62e=_62c.childNodes;
for(var i=0;i<_62e.length;i++){
skip=false;
for(var j=0;j<_62d.length;j++){
if(_62e[i].innerHTML==_62d[j].innerHTML){
skip=true;
break;
}
}
if(!skip){
list.appendChild(_62e[i]);
i--;
}
}
}else{
if(div){
div.innerHTML=msgs.total;
}
}
}
var _62f=dojo.byId("error-messages");
if(_62f&&!dojo.global.jsScreenContext.hasContextBits("MODAL")){
_62f.focus();
}
});
});
},setFocus:function(){
var _630=curam.util.getUrlParamValue(dojo.global.location.href,"o3frame")=="modal";
if(!_630){
_58f(curam.util.doSetFocus);
}
},doSetFocus:function(){
var _631=-1;
var _632=-1;
var form=document.forms[0];
if(!form){
return false;
}
var _633=form.elements;
var l=_633.length;
var elem;
for(var i=0;i<l;i++){
elem=_633[i];
if(_631==-1&&(elem.type=="select-one"||elem.type=="text"||elem.tagName=="TEXTAREA")&&!_593.contains(elem,"dijitArrowButtonInner")&&!_593.contains(elem,"dijitValidationInner")){
_631=i;
}
if(elem.tabIndex=="1"){
elem.tabIndex=0;
_632=i;
break;
}
}
var elem;
if(_632!=-1){
elem=_633[_632];
}else{
if(_631!=-1){
elem=_633[_631];
}
}
try{
var _634=dojo.byId("error-messages");
if(_634){
_634.focus();
}else{
elem.focus();
}
}
catch(e){
curam.debug.log(_598.getProperty("curam.util.error.focus"),e.message);
return false;
}
return true;
},openLocaleSelector:function(_635){
_635=_595.fix(_635);
var _636=_635.target;
while(_636&&_636.tagName!="A"){
_636=_636.parentNode;
}
var loc=_636.href;
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
var _637=curam.util.getLastPathSegmentWithQueryString(url);
var _638=_637.split("?")[0];
return _638.indexOf("Action.do")>-1;
},closeLocaleSelector:function(_639){
_639=_595.fix(_639);
_595.stop(_639);
dojo.global.close();
return false;
},getSuffixFromClass:function(node,_63a){
var _63b=attr.get(node,"class").split(" ");
var _63c=_592.filter(_63b,function(_63d){
return _63d.indexOf(_63a)==0;
});
if(_63c.length>0){
return _63c[0].split(_63a)[1];
}else{
return null;
}
},getCacheBusterParameter:function(){
return this.CACHE_BUSTER_PARAM_NAME+"="+new Date().getTime()+"_"+this.CACHE_BUSTER++;
},stripeTable:function(_63e,_63f,_640){
var _641=_63e.tBodies[0];
var _642=(_63f?2:1);
if(_641.rows.length<_642){
return;
}
var rows=_641.rows;
for(var i=0;i<rows.length;i+=_642){
curam.debug.log("curam.util.stripeTable(%s, %s): i = %s",_63e,_63f,i);
var _643=[rows[i]];
if(_63f&&rows[i+1]){
_643.push(rows[i+1]);
}
_592.forEach(_643,function(row){
_593.remove(row,"odd-last-row");
_593.remove(row,"even-last-row");
});
if(i%(2*_642)==0){
_592.forEach(_643,function(row){
cm.replaceClass(row,"odd","even");
});
if(i==_640){
_592.forEach(_643,function(row){
_593.add(row,"odd-last-row");
});
}
}else{
_592.forEach(_643,function(row){
cm.replaceClass(row,"even","odd");
});
if(i==_640){
_592.forEach(_643,function(row){
_593.add(row,"even-last-row");
});
}
}
}
},fillString:function(_644,_645){
var _646="";
while(_645>0){
_646+=_644;
_645-=1;
}
return _646;
},updateHeader:function(qId,_647,_648,_649){
var _64a=dom.byId("header_"+qId);
_64a.firstChild.nextSibling.innerHTML=_647;
answerCell=dom.byId("chosenAnswer_"+qId);
answerCell.innerHTML=_648;
sourceCell=dom.byId("chosenSource_"+qId);
sourceCell.innerHTML=_649;
},search:function(_64b,_64c){
var _64d=_58d.byId(_64b).get("value");
var _64e=_58d.byId(_64c);
var _64f=_64e?_64e.get("value"):null;
var _650="";
var _651;
var _652;
if(_64f){
_652=_64f.split("|");
_650=_652[0];
_651=_652[1];
}
var _653=curam.util.defaultSearchPageID;
var _654="";
if(_650===""){
_654=_653+"Page.do?searchText="+encodeURIComponent(_64d);
}else{
_654=_651+"Page.do?searchText="+encodeURIComponent(_64d)+"&searchType="+encodeURIComponent(_650);
}
var _655=new curam.ui.PageRequest(_654);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_655);
});
},updateDefaultSearchText:function(_656,_657){
var _658=_58d.byId(_656);
var _659=_58d.byId(_657);
var _65a=_658?_658.get("value"):null;
var str=_65a.split("|")[2];
_659.set("placeHolder",str);
},updateSearchBtnState:function(_65b,_65c){
var _65d=_58d.byId(_65b);
var btn=dom.byId(_65c);
var _65e=_65d.get("value");
if(!_65e||lang.trim(_65e).length<1){
_593.add(btn,"dijitDisabled");
}else{
_593.remove(btn,"dijitDisabled");
}
},furtherOptionsSearch:function(){
var _65f=curam.util.furtherOptionsPageID+"Page.do";
var _660=new curam.ui.PageRequest(_65f);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_660);
});
},searchButtonStatus:function(_661){
var btn=dojo.byId(_661);
if(!dojo.hasClass(btn,"dijitDisabled")){
return true;
}
},getPageHeight:function(){
var _662=400;
var _663=0;
if(_596("frameset").length>0){
curam.debug.log("curam.util.getPageHeight() "+_598.getProperty("curam.util.default.height"),_662);
_663=_662;
}else{
var _664=function(node){
if(!node){
curam.debug.log(_598.getProperty("curam.util.node"));
return 0;
}
var mb=geom.getMarginSize(node);
var pos=geom.position(node);
return pos.y+mb.h;
};
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")){
var _665=_596("div.bottom")[0];
var _666=_664(_665);
curam.debug.log(_598.getProperty("curam.util.page.height"),_666);
curam.debug.log(_598.getProperty("curam.util.ie7.issue"));
_663=_666+1;
}else{
var _667=dom.byId("content")||dom.byId("wizard-content");
var _668=_596("> *",_667).filter(function(n){
return n.tagName.indexOf("SCRIPT")<0&&_591.get(n,"visibility")!="hidden"&&_591.get(n,"display")!="none";
});
var _669=_668[0];
for(var i=1;i<_668.length;i++){
if(_664(_668[i])>=_664(_669)){
_669=_668[i];
}
}
_663=_664(_669);
curam.debug.log("curam.util.getPageHeight() "+_598.getProperty("curam.util.base.height"),_663);
var _66a=_596(".actions-panel",_590.body());
if(_66a.length>0){
var _66b=geom.getMarginBox(_66a[0]).h;
curam.debug.log("curam.util.getPageHeight() "+_598.getProperty("curam.util.panel.height"));
_663+=_66b;
_663+=10;
}
var _66c=_596("body.details");
if(_66c.length>0){
curam.debug.log("curam.util.getPageHeight() "+_598.getProperty("curam.util.bar.height"));
_663+=20;
}
}
}
curam.debug.log("curam.util.getPageHeight() "+_598.getProperty("curam.util.returning"),_663);
return _663;
},toCommaSeparatedList:function(_66d){
var _66e="";
for(var i=0;i<_66d.length;i++){
_66e+=_66d[i];
if(i<_66d.length-1){
_66e+=",";
}
}
return _66e;
},skipLinkFocus:function(){
var dest=dojo.byId("skip-dest");
if(dest){
dest.focus();
}
},setupGenericKeyHandler:function(){
_58f(function(){
var f=function(_66f){
if(dojo.global.jsScreenContext.hasContextBits("MODAL")&&_66f.keyCode==27){
var ev=_595.fix(_66f);
var _670=_58d.byId(ev.target.id);
var _671=typeof _670!="undefined"&&_670.baseClass=="dijitTextBox dijitComboBox";
if(!_671){
curam.dialog.closeModalDialog();
}
}
if(_66f.keyCode==13){
var ev=_595.fix(_66f);
var _672=ev.target.type=="text";
var _673=ev.target.type=="radio";
var _674=ev.target.type=="checkbox";
var _675=ev.target.type=="select-multiple";
var _676=ev.target.type=="password";
var _677=_58d.byId(ev.target.id);
if(typeof _677!="undefined"){
var _678=_58d.byNode(dojo.byId("widget_"+ev.target.id));
if(_678&&_678.enterKeyOnOpenDropDown){
_678.enterKeyOnOpenDropDown=false;
return false;
}
}
var _679=typeof _677!="undefined"&&_677.baseClass=="dijitComboBox";
if((!_672&&!_673&&!_674&&!_675&&!_676)||_679){
return true;
}
var _67a=null;
var _67b=_596(".curam-default-action");
if(_67b.length>0){
_67a=_67b[0];
}else{
var _67c=_596("input[type='submit']");
if(_67c.length>0){
_67a=_67c[0];
}
}
if(_67a!=null){
_595.stop(_595.fix(_66f));
curam.util.clickButton(_67a);
return false;
}
dojo.require("curam.dateSelectorUtil");
var _67d=dojo.byId("year");
if(_67d){
dojo.stopEvent(dojo.fixEvent(_66f));
curam.dateSelectorUtil.updateCalendar();
}
}
return true;
};
curam.util.connect(_590.body(),"onkeyup",f);
});
},enterKeyPress:function(_67e){
if(_67e.keyCode==13){
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
var _67f=elem.parentElement.parentElement.id;
var _680=dojo.byId("end-"+_67f);
if(_680){
_680.focus();
}
}
}
},focusHelpIconOnTab:function(e){
if(!e.shiftKey&&e.keyCode==9){
var _681=dojo.query(".dijitDialogHelpIcon")[0];
if(_681){
setTimeout(function(){
_681.focus();
},5);
}
}
},swapState:function(node,_682,_683,_684){
if(_682){
_593.replace(node,_683,_684);
}else{
_593.replace(node,_684,_683);
}
},makeQueryString:function(_685){
if(!_685||_685.length==0){
return "";
}
var _686=[];
for(var _687 in _685){
_686.push(_687+"="+encodeURIComponent(_685[_687]));
}
return "?"+_686.join("&");
},clickHandlerForListActionMenu:function(url,_688,_689,_68a){
if(_688){
var href=curam.util.replaceUrlParam(url,"o3frame","modal");
var ctx=dojo.global.jsScreenContext;
ctx.addContextBits("MODAL");
href=curam.util.replaceUrlParam(href,"o3ctx",ctx.getValue());
curam.util.redirectWindow(href);
return;
}
var _68b={href:url};
require(["curam/ui/UIMPageAdaptor"]);
if(curam.ui.UIMPageAdaptor.allowLinkToContinue(_68b)){
dojo.global.location=url;
return;
}
if(_68b!=null){
if(_68a){
_595.fix(_68a);
_595.stop(_68a);
}
if(!_68b.href||_68b.href.length==0){
return;
}
if(_689&&!curam.util.isInternal(url)){
dojo.global.open(url);
}else{
if(curam.ui.UIMPageAdaptor.isLinkValidForTabProcessing(_68b)){
var _68c=new curam.ui.PageRequest(_68b.href);
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")||dojo.global.jsScreenContext.hasContextBits("NESTED_UIM")){
_68c.pageHolder=dojo.global;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_68c);
});
}
}
}
},clickHandlerForMailtoLinks:function(_68d,url){
dojo.stopEvent(_68d);
var _68e=dojo.query("#mailto_frame")[0];
if(!_68e){
_68e=dojo.io.iframe.create("mailto_frame","");
}
_68e.src=url;
return false;
},isInternal:function(url){
var path=url.split("?")[0];
var _68f=path.match("Page.do");
if(_68f!=null){
return true;
}
return false;
},getLastPathSegmentWithQueryString:function(url){
var _690=url.split("?");
var _691=_690[0].split("/");
return _691[_691.length-1]+(_690[1]?"?"+_690[1]:"");
},replaceSubmitButton:function(name){
if(curam.replacedButtons[name]=="true"){
return;
}
var _692="__o3btn."+name;
var _693;
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_693=_596("input[id='"+_692+"']");
}else{
_693=_596("input[name='"+_692+"']");
}
_693.forEach(function(_694,_695,_696){
_694.tabIndex=-1;
var _697=_694.parentNode;
var _698="btn-id-"+_695;
curam.util.setupWidgetLoadMask("a."+_698);
var _699="ac initially-hidden-widget "+_698;
if(_593.contains(_694,"first-action-control")){
_699+=" first-action-control";
}
var _69a=_58e.create("a",{"class":_699,href:"#"},_694,"before");
var _69b=dojo.query(".page-level-menu")[0];
if(_69b){
dojo.attr(_69a,"title",_694.value);
}
_58e.create("span",{"class":"filler"},_69a,"before");
var left=_58e.create("span",{"class":"left-corner"},_69a);
var _69c=_58e.create("span",{"class":"right-corner"},left);
var _69d=_58e.create("span",{"class":"middle"},_69c);
_69d.appendChild(document.createTextNode(_694.value));
curam.util.addActionControlClass(_69a);
on(_69a,"click",function(_69e){
curam.util.clickButton(this._submitButton);
_595.stop(_69e);
});
_69a._submitButton=_696[0];
_593.add(_694,"hidden-button");
});
curam.replacedButtons[name]="true";
},setupWidgetLoadMask:function(_69f){
curam.util.subscribe("/curam/page/loaded",function(){
var _6a0=_596(_69f)[0];
if(_6a0){
_591.set(_6a0,"visibility","visible");
}else{
curam.debug.log("setupButtonLoadMask: "+_598.getProperty("curam.util.not.found")+"'"+_69f+"'"+_598.getProperty("curam.util.ignore.mask"));
}
});
},optReplaceSubmitButton:function(name){
if(curam.util.getFrameRoot(dojo.global,"wizard")==null){
curam.util.replaceSubmitButton(name);
return;
}
var _6a1=curam.util.getFrameRoot(dojo.global,"wizard").navframe.wizardNavigator;
if(_6a1.delegatesSubmit[jsPageID]!="assumed"){
curam.util.replaceSubmitButton(name);
}
},clickButton:function(_6a2){
var _6a3=dom.byId("mainForm");
var _6a4;
if(!_6a2){
curam.debug.log("curam.util.clickButton: "+_598.getProperty("curam.util..no.arg"));
return;
}
if(typeof (_6a2)=="string"){
var _6a5=_6a2;
curam.debug.log("curam.util.clickButton: "+_598.getProperty("curam.util.searching")+_598.getProperty("curam.util.id.of")+"'"+_6a5+"'.");
_6a2=_596("input[id='"+_6a5+"']")[0];
if(!_6a2.form&&!_6a2.id){
curam.debug.log("curam.util.clickButton: "+_598.getProperty("curam.util.searched")+_598.getProperty("curam.util.id.of")+"'"+_6a5+_598.getProperty("curam.util.exiting"));
return;
}
}
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_6a4=_6a2;
}else{
_6a4=_596("input[name='"+_6a2.id+"']",_6a3)[0];
}
try{
if(attr.get(_6a3,"action").indexOf(jsPageID)==0){
curam.util.publishRefreshEvent();
}
_6a4.click();
}
catch(e){
curam.debug.log(_598.getProperty("curam.util.exception.clicking"));
}
},printPage:function(_6a6){
_595.stop(_6a6);
var _6a7=dojo.window.get(_6a6.currentTarget.ownerDocument);
var _6a8=_6a7.frameElement;
var _6a9=_6a8;
while(_6a9&&!dojo.hasClass(_6a9,"tab-content-holder")){
_6a9=_6a9.parentNode;
}
var _6aa=_6a9;
var _6ab=dojo.query(".detailsPanelFrame",_6aa)[0];
if(_6ab!=undefined&&_6ab!=null){
_6ab.contentWindow.focus();
_6ab.contentWindow.print();
}
_6a7.focus();
_6a7.print();
return false;
},addSelectedClass:function(_6ac){
_593.add(_6ac.target,"selected");
},removeSelectedClass:function(_6ad){
_593.remove(_6ad.target,"selected");
},openHelpPage:function(_6ae,_6af){
_595.stop(_6ae);
dojo.global.open(_6af);
},connect:function(_6b0,_6b1,_6b2){
var h=function(_6b3){
_6b2(_595.fix(_6b3));
};
if(has("ie")&&has("ie")<9){
_6b0.attachEvent(_6b1,h);
_597.addOnWindowUnload(function(){
_6b0.detachEvent(_6b1,h);
});
return {object:_6b0,eventName:_6b1,handler:h};
}else{
var _6b4=_6b1;
if(_6b1.indexOf("on")==0){
_6b4=_6b1.slice(2);
}
var dt=on(_6b0,_6b4,h);
_597.addOnWindowUnload(function(){
dt.remove();
});
return dt;
}
},disconnect:function(_6b5){
if(has("ie")&&has("ie")<9){
_6b5.object.detachEvent(_6b5.eventName,_6b5.handler);
}else{
_6b5.remove();
}
},subscribe:function(_6b6,_6b7){
var st=_594.subscribe(_6b6,_6b7);
_597.addOnWindowUnload(function(){
st.remove();
});
return st;
},unsubscribe:function(_6b8){
_6b8.remove();
},addActionControlClickListener:function(_6b9){
var _6ba=dom.byId(_6b9);
var _6bb=_596(".ac",_6ba);
if(_6bb.length>0){
for(var i=0;i<_6bb.length;i++){
var _6bc=_6bb[i];
curam.util.addActionControlClass(_6bc);
}
}
},addActionControlClass:function(_6bd){
curam.util.connect(_6bd,"onmousedown",function(){
_593.add(_6bd,"selected-button");
curam.util.connect(_6bd,"onmouseout",function(){
_593.remove(_6bd,"selected-button");
});
});
},getClusterActionSet:function(){
var _6be=dom.byId("content");
var _6bf=_596(".blue-action-set",_6be);
if(_6bf.length>0){
for(var i=0;i<_6bf.length;i++){
curam.util.addActionControlClickListener(_6bf[i]);
}
}
},adjustActionButtonWidth:function(){
if(has("ie")==8){
_58f(function(){
if(dojo.global.jsScreenContext.hasContextBits("MODAL")){
_596(".action-set > a").forEach(function(node){
if(node.childNodes[0].offsetWidth>node.offsetWidth){
_591.set(node,"width",node.childNodes[0].offsetWidth+"px");
_591.set(node,"display","block");
_591.set(node,"display","inline-block");
}
});
}
});
}
},setRpu:function(url,rtc,_6c0){
if(!url||!rtc||!rtc.getHref()){
throw {name:"Unexpected values",message:"This value not allowed for url or rtc"};
}
var _6c1=curam.util.getLastPathSegmentWithQueryString(rtc.getHref());
_6c1=curam.util.removeUrlParam(_6c1,curam.util.Constants.RETURN_PAGE_PARAM);
if(_6c0){
var i;
for(i=0;i<_6c0.length;i++){
if(!_6c0[i].key||!_6c0[i].value){
throw {name:"undefined value error",message:"The object did not contain a valid key/value pair"};
}
_6c1=curam.util.replaceUrlParam(_6c1,_6c0[i].key,_6c0[i].value);
}
}
var _6c2=curam.util.replaceUrlParam(url,curam.util.Constants.RETURN_PAGE_PARAM,encodeURIComponent(_6c1));
curam.debug.log("curam.util.setRpu "+_598.getProperty("curam.util.added.rpu")+_6c2);
return _6c2;
},retrieveBaseURL:function(){
return dojo.global.location.href.match(".*://[^/]*/[^/]*");
},removeRoleRegion:function(){
var body=dojo.query("body")[0];
dojo.removeAttr(body,"role");
},iframeTitleFallBack:function(){
var _6c3=curam.tab.getContainerTab(curam.tab.getContentPanelIframe());
var _6c4=dojo.byId(curam.tab.getContentPanelIframe());
var _6c5=_6c4.contentWindow.document.title;
var _6c6=dojo.query("div.nowrapTabStrip.dijitTabContainerTop-tabs > div.dijitTabChecked.dijitChecked")[0];
var _6c7=dojo.query("span.tabLabel",_6c6)[0];
var _6c8=dojo.query("div.nowrapTabStrip.dijitTabNoLayout > div.dijitTabChecked.dijitChecked",_6c3.domNode)[0];
var _6c9=dojo.query("span.tabLabel",_6c8)[0];
if(_6c5&&_6c5!=null){
return _6c5;
}else{
if(_6c8){
return _6c9.innerHTML;
}else{
return _6c7.innerHTML;
}
}
},addClassToLastNodeInContentArea:function(){
var _6ca=_596("> div","content");
var _6cb=_6ca.length;
if(_6cb==0){
return "No need to add";
}
var _6cc=_6ca[--_6cb];
while(_593.contains(_6cc,"hidden-action-set")&&_6cc){
_6cc=_6ca[--_6cb];
}
_593.add(_6cc,"last-node");
},highContrastModeType:function(){
var _6cd=dojo.query("body.high-contrast")[0];
return _6cd;
}});
return curam.util;
});
},"idx/oneui/Header":function(){
define("idx/oneui/Header",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/_base/window","dojo/aspect","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/i18n","dojo/keys","dojo/string","dijit/_base/popup","dijit/place","dijit/registry","dijit/_Widget","dijit/_TemplatedMixin","dojo/i18n!./nls/Header"],function(_6ce,_6cf,_6d0,_6d1,_6d2,_6d3,_6d4,_6d5,_6d6,i18n,keys,_6d7,_6d8,_6d9,_6da,_6db,_6dc){
var dojo={},_6dd={};
var _6de=function(){
log.error("dijit/form/Button has been used without being loaded");
};
var _6df=function(){
log.error("dijit/form/TextBox has been used without being loaded");
};
var _6e0=function(){
log.error("idx/oneui/layout/MenuTabController has been used without being loaded");
};
var _6e1=function(menu,_6e2,_6e3,_6e4,_6e5){
if(_6e2){
if(_6e2[0]){
_6d2.after(menu,"onOpen",function(){
if(menu._popupWrapper){
if(!menu._oneuiWrapper){
menu._oneuiWrapper=_6d5.create("div",{"class":"idxHeaderContainer "+_6e2[0]},_6d1.body());
_6d2.after(menu,"destroy",function(){
_6d5.destroy(menu._oneuiWrapper);
delete menu._oneuiWrapper;
});
}
menu._oneuiWrapper.appendChild(menu._popupWrapper);
}
});
}
var _6e6=(_6e2.length>1)?_6e2.slice(1):_6e2;
_6ce.forEach(menu.getChildren(),function(_6e7){
if(_6e7.popup){
_6e1(_6e7.popup,_6e6);
}
if(_6e7.currentPage){
_6d4.add(_6e7.domNode,"idxHeaderNavCurrentPage");
}
});
}
if(_6e4){
var _6e8=_6e4;
menu._scheduleOpen=function(_6e9,_6ea,_6eb){
if(!this._openTimer){
var ltr=menu.isLeftToRight(),_6ec=_6d9.around(_6d8._createWrapper(menu),_6e8,_6e5?["below-alt","below","above-alt","above"]:["below","below-alt","above","above-alt"],ltr,menu.orient?_6d0.hitch(menu,"orient"):null);
if(!ltr){
_6ec.x=_6ec.x+_6ec.w;
}
this._openTimer=setTimeout(_6d0.hitch(this,function(){
delete this._openTimer;
this._openMyself({target:_6e9,iframe:_6ea,coords:_6ec});
}),1);
}
};
menu.leftClickToOpen=true;
if(_6e3){
menu.bindDomNode(_6e3);
}
}
};
_6cf("idx.oneui.Header",[_6db,_6dc],{primaryTitle:"",primaryBannerType:"thin",navigation:undefined,showNavigationDropDownArrows:true,primarySearch:undefined,user:undefined,showUserDropDownArrow:true,settings:undefined,showSettingsDropDownArrow:true,help:undefined,showHelpDropDownArrow:true,secondaryTitle:"",secondaryBannerType:"blue",secondarySubtitle:"",additionalContext:"",actions:undefined,contentContainer:"",contentTabsInline:false,secondarySearch:undefined,layoutType:"variable",templateString:"<div>"+"<div dojoAttachPoint=\"_mainContainerNode\">"+"</div>"+"</div>",_getComputedUserName:function(){
return (this.user&&(typeof this.user.displayName=="function"))?this.user.displayName():(this.user.displayName||"");
},_getComputedUserImage:function(){
return (this.user&&(typeof this.user.displayImage=="function"))?this.user.displayImage():this.user.displayImage;
},_getComputedUserMessage:function(){
var _6ed=this._getComputedUserName(),_6ee=((typeof this.user.messageName=="function")?this.user.messageName():this.user.messageName)||_6ed,_6ef=_6ee;
if(this.user&&this.user.message){
var _6f0=(typeof this.user.message=="function")?this.user.message():this.user.message;
_6ef=_6d7.substitute(_6f0,this.user,function(_6f1,key){
switch(key){
case "messageName":
return _6ee;
case "displayName":
return _6ed;
default:
return _6f1||"";
}
});
}
return _6ef;
},_setUserDisplayNameAttr:function(_6f2){
this.user=this.user||{};
this.user.displayName=_6f2;
this._refreshUser();
},_setUserDisplayImageAttr:function(_6f3){
this.user=this.user||{};
this.user.displayImage=_6f3;
this._refreshUser();
},_setUserMessageNameAttr:function(_6f4){
this.user=this.user||{};
this.user.messageName=_6f4;
this._refreshUser();
},_setUserMessageAttr:function(_6f5){
this.user=this.user||{};
this.user.message=_6f5;
this._refreshUser();
},_refreshUser:function(){
var name=this._getComputedUserName(),_6f6=this._getComputedUserImage(),msg=this._getComputedUserMessage();
_6d3.set(this.userNode,"title",name);
_6d3.set(this.userImageNode,"alt",name);
_6d3.set(this.userImageNode,"src",_6f6||"");
_6d6.set(this.userImageNode,"display",_6f6?"block":"none");
this.userTextNode.innerHTML=msg;
_6d4.replace(this.userNode,msg?"idxHeaderUserName":"idxHeaderUserNameNoText","idxHeaderUserName idxHeaderUserNameNoText");
},_injectTemplate:function(_6f7,_6f8){
var _6f9=_6dc.getCachedTemplate(_6f8,true);
var node;
if(_6d0.isString(_6f9)){
node=_6d5.toDom(this._stringRepl(_6f9));
}else{
node=_6f9.cloneNode(true);
}
this._attachTemplateNodes(node,function(n,p){
return n.getAttribute(p);
});
_6f7.appendChild(node);
},postMixInProperties:function(){
this._nls=i18n.getLocalization("idx.oneui","Header");
if(this.primarySearch){
this.primarySearch=_6d0.mixin({entryPrompt:this._nls.searchEntry,submitPrompt:this._nls.searchSubmit},this.primarySearch);
}
if(this.secondarySearch){
this.secondarySearch=_6d0.mixin({entryPrompt:this._nls.searchEntry,submitPrompt:this._nls.searchSubmit},this.secondarySearch);
}
},buildRendering:function(){
this.inherited(arguments);
if(this.contentContainer&&this.secondaryBannerType&&this.secondaryBannerType.toLowerCase()=="white"){
require.log("*** Warning: Header will not display content tabs when secondaryBannerType is \"white\". Specify a different type to see content tabs.");
}
var _6fa=this.primaryTitle,_6fb=true,_6fc=this.help,_6fd=this.settings,_6fe=this.user,_6ff=this.navigation,_700=this.primarySearch,_701=this.secondaryTitle||this.secondarySubtitle,_702=this.contextActions,_703=this.secondarySearch,_704=this.contentContainer&&(!this.secondaryBannerType||(this.secondaryBannerType.toLowerCase()!="white")),_705=_704&&(this.contentTabsInline||!_701),_706=this.secondaryBannerType&&(this.secondaryBannerType.toLowerCase()=="white"),_707=_704&&!_705,_708=_6fa||_6fb||_6fc||_6fd||_6fe||_6ff||_700,_709=_701||_702||_703||_705,_70a=_707,_70b;
if(_708||_709||_70a){
_6d4.add(this.domNode,"idxHeaderContainer");
if(this.primaryBannerType&&(this.primaryBannerType.toLowerCase()=="thick")){
_6d4.add(this._mainContainerNode,"idxHeaderPrimaryThick");
}else{
_6d4.add(this._mainContainerNode,"idxHeaderPrimaryThin");
}
if(this.secondaryBannerType&&((this.secondaryBannerType.toLowerCase()=="lightgrey")||(this.secondaryBannerType.toLowerCase()=="lightgray"))){
_6d4.add(this._mainContainerNode,"idxHeaderSecondaryGray");
_6d4.add(this._mainContainerNode,_70a?"idxHeaderSecondaryGrayDoubleRow":"idxHeaderSecondaryGraySingleRow");
_70b=_708;
}else{
if(this.secondaryBannerType&&(this.secondaryBannerType.toLowerCase()=="white")){
_6d4.add(this._mainContainerNode,"idxHeaderSecondaryWhite");
_6d4.add(this._mainContainerNode,_70a?"idxHeaderSecondaryWhiteDoubleRow":"idxHeaderSecondaryWhiteSingleRow");
_70b=_708;
}else{
_6d4.add(this._mainContainerNode,"idxHeaderSecondaryBlue");
_6d4.add(this._mainContainerNode,(_70a)?"idxHeaderSecondaryBlueDoubleRow":"idxHeaderSecondaryBlueSingleRow");
_70b=_708&&!_709&&!_70a;
}
}
_6d4.add(this._mainContainerNode,_70a?"idxHeaderSecondaryDoubleRow":"idxHeaderSecondarySingleRow");
if(this.layoutType&&(this.layoutType.toLowerCase()=="fixed")){
_6d4.add(this._mainContainerNode,"idxHeaderWidthFixed");
}else{
_6d4.add(this._mainContainerNode,"idxHeaderWidthLiquid");
}
}
var _70c=[],_70d=[],me=this;
if(_700||_703||_702){
_70c.push("dijit/form/Button");
_70d.push(function(obj){
_6de=obj;
});
}
if(_700||_703){
_70c.push("dijit/form/TextBox");
_70d.push(function(obj){
_6df=obj;
});
}
if(_704){
_70c.push("idx/oneui/layout/MenuTabController");
_70d.push(function(obj){
_6e0=obj;
});
}
require(_70c,function(){
for(var i=0;i<_70d.length;i++){
_70d[i](arguments[i]);
}
if(_708){
me._injectTemplate(me._mainContainerNode,"<div class=\"idxHeaderPrimary\">"+"<div class=\"idxHeaderPrimaryInner\" dojoAttachPoint=\"primaryBannerNode\">"+"<ul dojoAttachPoint=\"_globalActionsNode\">"+"</ul>"+"</div>"+"</div>");
}
if(_6fa){
me._renderPrimaryTitle(me._globalActionsNode);
}
if(_6fb){
me._renderLogo(me._globalActionsNode);
}
if(_6fc){
me._renderHelp(me._globalActionsNode,_6fd||_6fe);
}
if(_6fd){
me._renderSettings(me._globalActionsNode,_6fe);
}
if(_6fe){
me._renderUser(me._globalActionsNode);
}
if(_700){
me._renderPrimarySearch(me._globalActionsNode);
}
if(_6ff){
me._renderNavigation(me.primaryBannerNode);
}
if(_70b){
me._injectTemplate(me._mainContainerNode,"<div class=\"idxHeaderBlueLip\">"+"</div>");
}
if(_709){
me._injectTemplate(me._mainContainerNode,"<div class=\"idxHeaderSecondary\"> "+"<div class=\"idxHeaderSecondaryInner\" dojoAttachPoint=\"secondaryBannerNode\">"+"</div>"+"</div>");
}
if(_703){
me._renderSecondarySearch(me.secondaryBannerNode);
}
if(_701){
me._renderSecondaryTitle(me.secondaryBannerNode);
}
if(_705){
me._renderContent(me.secondaryBannerNode,false);
}
if(_702){
me._renderContextActions(me.secondaryBannerNode);
}
if(_706){
me._renderSecondaryInnerBorder(me.secondaryBannerNode);
}
if(_707){
me._renderContent(me._mainContainerNode,true);
}
});
},_renderPrimaryTitle:function(_70e){
this._injectTemplate(_70e,"<li>"+"<span>"+"<div class=\"idxHeaderPrimaryTitle\">"+"${primaryTitle}"+"</div>"+"</span>"+"</li>");
},_renderLogo:function(_70f){
this._injectTemplate(_70f,"<li class=\"idxHeaderPrimaryAction end\">"+"<span>"+"<div class=\"idxHeaderLogoBox\">"+"<div class=\"idxHeaderLogo\" alt=\"${_nls.ibmlogo}\">"+"</div>"+"</div>"+"</span>"+"</li>");
},_renderHelp:function(_710,_711){
this._injectTemplate(_710,"<li class=\"idxHeaderPrimaryAction idxHeaderHelp\">"+"<span dojoAttachPoint=\"_helpNode\" alt=\"${_nls.actionHelp}\" title=\"${_nls.actionHelp}\">"+"<span class=\"idxHeaderHelpIcon\">"+"</span>"+"<span class=\"idxHeaderDropDownArrow\">"+"</span>"+"</span>"+"</li>");
if(_711){
this._injectTemplate(_710,"<li class=\"idxHeaderPrimaryAction idxHeaderSeparator\"><span></span></li>");
}
if(this.help){
this.help=_6da.byId(this.help);
_6e1(this.help,["oneuiHeaderGlobalActionsMenu","oneuiHeaderGlobalActionsSubmenu"],this._helpNode,this._helpNode,true);
_6d4.toggle(this._helpNode,"idxHeaderDropDown",this.showHelpDropDownArrow);
}
},_renderSettings:function(_712,_713){
this._injectTemplate(_712,"<li class=\"idxHeaderPrimaryAction idxHeaderTools\">"+"<span dojoAttachPoint=\"_settingsNode\" alt=\"${_nls.actionShare}\" title=\"${_nls.actionShare}\">"+"<span class=\"idxHeaderShareIcon\">"+"</span>"+"<span class=\"idxHeaderDropDownArrow\">"+"</span>"+"</span>"+"</li>");
if(_713){
this._injectTemplate(_712,"<li class=\"idxHeaderPrimaryAction idxHeaderSeparator\"><span></span></li>");
}
if(this.settings){
this.settings=_6da.byId(this.settings);
_6e1(this.settings,["oneuiHeaderGlobalActionsMenu","oneuiHeaderGlobalActionsSubmenu"],this._settingsNode,this._settingsNode,true);
_6d4.toggle(this._settingsNode,"idxHeaderDropDown",this.showSettingsDropDownArrow);
}
},_renderUser:function(_714){
this._injectTemplate(_714,"<li class=\"idxHeaderPrimaryAction\">"+"<span dojoAttachPoint=\"userNode\" class=\"idxHeaderUserNameNoText\">"+"<span class=\"idxHeaderUserIcon\">"+"<img dojoAttachPoint=\"userImageNode\" class=\"idxHeaderUserIcon\" />"+"</span>"+"<span class=\"idxHeaderUserText\" dojoAttachPoint=\"userTextNode\">"+"</span>"+"<span class=\"idxHeaderDropDownArrow\">"+"</span>"+"</span>"+"</li>");
this._refreshUser();
if(this.user.actions){
this.user.actions=_6da.byId(this.user.actions);
_6e1(this.user.actions,["oneuiHeaderGlobalActionsMenu","oneuiHeaderGlobalActionsSubmenu"],this.userNode,this.userNode,true);
_6d4.toggle(this.userNode,"idxHeaderDropDown",this.showUserDropDownArrow);
}
},_renderNavigation:function(_715){
this.navigation=((typeof this.navigation=="object")&&("nodeType" in this.navigation))?_6da.byNode(this.navigation):_6da.byId(this.navigation);
if(!this.navigation){
require.log("WARNING: navigation widget not found");
}else{
this.navigation.placeAt(_715);
this.navigation.startup();
var _716=this.navigation.getChildren();
if((_716.length==1)&&(_716[0].label=="")){
_6d4.toggle(_716[0].containerNode,"idxHeaderNavigationHome",true);
}else{
if(this.showNavigationDropDownArrows){
for(var i=0;i<_716.length;i++){
if(_716[i].popup){
this._injectTemplate(_716[i].focusNode,"<span class=\"idxHeaderDropDownArrow\"></span>");
_6d4.toggle(_716[i].domNode,"idxHeaderDropDown",true);
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
_6e1(this.navigation,[null,"oneuiHeaderNavigationMenu","oneuiHeaderNavigationSubmenu"]);
}
},_renderPrimarySearch:function(_717){
this._injectTemplate(_717,"<li role=\"search\" class=\"idxHeaderSearchContainer\">"+"<input type=\"text\" dojoAttachPoint=\"primarySearchTextNode\" />"+"<input type=\"image\" dojoAttachPoint=\"primarySearchButtonNode\" />"+"</li>");
this.primarySearch.onChange=_6d0.isFunction(this.primarySearch.onChange)?this.primarySearch.onChange:new Function("value",this.primarySearch.onChange);
this.primarySearch.onSubmit=_6d0.isFunction(this.primarySearch.onSubmit)?this.primarySearch.onSubmit:new Function("value",this.primarySearch.onSubmit);
var me=this;
var text=new _6df({trim:true,placeHolder:this.primarySearch.entryPrompt,intermediateChanges:true,title:this.primarySearch.entryPrompt,onChange:function(){
me._onPrimarySearchChange(text.attr("value"));
},onKeyUp:function(_718){
if(_718.keyCode==keys.ENTER){
me._onPrimarySearchSubmit(text.attr("value"));
}
}},this.primarySearchTextNode);
new _6de({label:this.primarySearch.submitPrompt,showLabel:false,iconClass:"idxHeaderSearchButton",onClick:function(){
me._onPrimarySearchSubmit(text.attr("value"));
}},this.primarySearchButtonNode);
},_renderSecondaryTitle:function(_719){
this._injectTemplate(_719,"<span class=\"idxHeaderSecondaryTitleContainer\">"+"<span class=\"idxHeaderSecondaryTitle\" dojoAttachPoint=\"secondaryTitleTextNode\">"+"${secondaryTitle}"+"</span>"+"<span class=\"idxHeaderSecondarySubtitle\" dojoAttachPoint=\"_secondaryTitleSeparatorNode\">"+"&nbsp;&ndash;&nbsp;"+"</span>"+"<span class=\"idxHeaderSecondarySubtitle\" dojoAttachPoint=\"secondarySubtitleTextNode\">"+"${secondarySubtitle}"+"</span>"+"&nbsp;&nbsp;"+"<span class=\"idxHeaderSecondaryAdditionalContext\" dojoAttachPoint=\"additionalContextTextNode\">"+"${additionalContext}"+"</span>"+"</span>");
_6d6.set(this._secondaryTitleSeparatorNode,"display",(this.secondaryTitle&&this.secondarySubtitle)?"":"none");
},_renderContextActions:function(_71a){
this._injectTemplate(_71a,"<div class=\"idxHeaderSecondaryActions\" dojoAttachPoint=\"_contextActionsNode\"></div>");
this.contextActionNodes=[];
for(var i=0;i<this.contextActions.length;i++){
this._injectTemplate(this._contextActionsNode,"<button type=\"button\" dojoAttachPoint=\"_nextActionNode\"></button>");
new _6de(this.contextActions[i],this._nextActionNode);
this.contextActionNodes.push(this._nextActionNode);
delete this._nextActionNode;
}
},_renderSecondarySearch:function(_71b){
this._injectTemplate(_71b,"<div role=\"search\" class=\"idxHeaderSearchContainer\">"+"<input type=\"text\" dojoAttachPoint=\"secondarySearchTextNode\" />"+"<input type=\"image\" dojoAttachPoint=\"secondarySearchButtonNode\" />"+"</div>");
this.secondarySearch.onChange=_6d0.isFunction(this.secondarySearch.onChange)?this.secondarySearch.onChange:new Function("value",this.secondarySearch.onChange);
this.secondarySearch.onSubmit=_6d0.isFunction(this.secondarySearch.onSubmit)?this.secondarySearch.onSubmit:new Function("value",this.secondarySearch.onSubmit);
var me=this;
var text=new _6df({trim:true,placeHolder:this.secondarySearch.entryPrompt,intermediateChanges:true,title:this.secondarySearch.entryPrompt,onChange:function(){
me._onSecondarySearchChange(text.attr("value"));
},onKeyUp:function(_71c){
if(_71c.keyCode==keys.ENTER){
me._onSecondarySearchSubmit(text.attr("value"));
}
}},this.secondarySearchTextNode);
new _6de({label:this.secondarySearch.submitPrompt,showLabel:false,iconClass:"idxHeaderSearchButton",onClick:function(){
me._onSecondarySearchSubmit(text.attr("value"));
}},this.secondarySearchButtonNode);
},_renderSecondaryInnerBorder:function(_71d){
this._injectTemplate(_71d,"<div role=\"presentation\" class=\"idxHeaderSecondaryInnerBorder\">"+"</div>");
},_renderContent:function(_71e,_71f){
this._injectTemplate(_71e,"<div class=\"oneuiContentContainer\">"+(_71f?"<div class=\"oneuiContentContainerInner\">":"")+"<div dojoAttachPoint=\"contentControllerNode\"></div>"+(_71f?"</div>":"")+"</div>");
var _720=new _6e0({containerId:(typeof this.contentContainer==="string")?this.contentContainer:this.contentContainer.id,"class":"dijitTabContainerTop-tabs",useMenu:this._tabMenu,useSlider:this._tabSlider,buttonWidget:_6d0.extend(idx.oneui.layout._PopupTabButton,{tabDropDownText:"",tabSeparatorText:"|"})},this.contentControllerNode);
_6e1(_720._menuBtn,["oneuiHeader2ndLevMenu","oneuiHeader2ndLevSubmenu"]);
_6d2.after(_720,"_bindPopup",function(page,_721,_722,_723){
_6e1(_723,["oneuiHeader2ndLevMenu","oneuiHeader2ndLevSubmenu"],_722,_721);
},true);
_720.startup();
var _724=_6da.byId(this.contentContainer);
if(_724&&_724._started){
_720.onStartup({children:_724.getChildren(),selected:_724.selectedChildWidget});
}
},_onPrimarySearchChange:function(_725){
this.primarySearch.onChange(_725);
},_onPrimarySearchSubmit:function(_726){
this.primarySearch.onSubmit(_726);
},_onSecondarySearchChange:function(_727){
this.secondarySearch.onChange(_727);
},_onSecondarySearchSubmit:function(_728){
this.secondarySearch.onSubmit(_728);
}});
return idx.oneui.Header;
});
},"url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n","dijit/_base/sniff":function(){
define("dijit/_base/sniff",["dojo/uacss"],function(){
});
},"dojox/collections/_base":function(){
define("dojox/collections/_base",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/array"],function(dojo,lang,arr){
var _729=lang.getObject("dojox.collections",true);
_729.DictionaryEntry=function(k,v){
this.key=k;
this.value=v;
this.valueOf=function(){
return this.value;
};
this.toString=function(){
return String(this.value);
};
};
_729.Iterator=function(a){
var _72a=0;
this.element=a[_72a]||null;
this.atEnd=function(){
return (_72a>=a.length);
};
this.get=function(){
if(this.atEnd()){
return null;
}
this.element=a[_72a++];
return this.element;
};
this.map=function(fn,_72b){
return arr.map(a,fn,_72b);
};
this.reset=function(){
_72a=0;
this.element=a[_72a];
};
};
_729.DictionaryIterator=function(obj){
var a=[];
var _72c={};
for(var p in obj){
if(!_72c[p]){
a.push(obj[p]);
}
}
var _72d=0;
this.element=a[_72d]||null;
this.atEnd=function(){
return (_72d>=a.length);
};
this.get=function(){
if(this.atEnd()){
return null;
}
this.element=a[_72d++];
return this.element;
};
this.map=function(fn,_72e){
return arr.map(a,fn,_72e);
};
this.reset=function(){
_72d=0;
this.element=a[_72d];
};
};
return _729;
});
},"url:idx/oneui/templates/_MenuColumn.html":"<td class=\"dijitReset oneuiMenuColumn\" data-dojo-attach-point=\"columnNodes\">\r\n\t<table class=\"dijitReset\" cellspacing=\"0\" width=\"100%\" role=\"presentation\">\r\n\t\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"_containerNodes\">\r\n<!-- this must be kept in synch with column 0 included in Menu.html -->\r\n\t\t</tbody>\r\n\t</table>\r\n</td>","dojo/regexp":function(){
define("dojo/regexp",["./_base/kernel","./_base/lang"],function(dojo,lang){
lang.getObject("regexp",true,dojo);
dojo.regexp.escapeString=function(str,_72f){
return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_72f&&_72f.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
dojo.regexp.buildGroupRE=function(arr,re,_730){
if(!(arr instanceof Array)){
return re(arr);
}
var b=[];
for(var i=0;i<arr.length;i++){
b.push(re(arr[i]));
}
return dojo.regexp.group(b.join("|"),_730);
};
dojo.regexp.group=function(_731,_732){
return "("+(_732?"?:":"")+_731+")";
};
return dojo.regexp;
});
},"curam/debug":function(){
define("curam/debug",["curam/define","curam/util/LocalConfig"],function(_733,_734){
_733.singleton("curam.debug",{log:function(){
if(curam.debug.enabled()){
try{
var a=arguments;
if(!dojo.isIE){
console.log.apply(console,a);
}else{
var _735=a.length;
var sa=curam.debug._serializeArgument;
switch(_735){
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
console.log("[Incomplete message - "+(_735-5)+" message a truncated] "+a[0],sa(a[1]),sa(a[2]),sa(a[3]),sa(a[4]),sa(a[5]));
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
var _736=typeof arg!="undefined"&&typeof arg.closed!="undefined"&&arg.closed;
if(_736){
return true;
}else{
return typeof arg!="undefined"&&typeof arg.location!="undefined"&&typeof arg.navigator!="undefined"&&typeof arg.document!="undefined"&&typeof arg.closed!="undefined";
}
},enabled:function(){
return _734.readOption("jsTraceLog","false")=="true";
},_setup:function(_737){
_734.seedOption("jsTraceLog",_737.trace,"false");
_734.seedOption("ajaxDebugMode",_737.ajaxDebug,"false");
_734.seedOption("asyncProgressMonitor",_737.asyncProgressMonitor,"false");
}});
return curam.debug;
});
},"dijit/DropDownMenu":function(){
require({cache:{"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n"}});
define("dijit/DropDownMenu",["dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/text!./templates/Menu.html","./_OnDijitClickMixin","./_MenuBase"],function(_738,_739,keys,_73a,_73b,_73c){
return _738("dijit.DropDownMenu",[_73c,_73b],{templateString:_73a,baseClass:"dijitMenu",postCreate:function(){
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
_739.stop(evt);
break;
case this._closeSubMenuKey:
if(this.parentMenu){
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
}else{
_739.stop(evt);
}
break;
}
}});
});
},"dijit/form/_FormMixin":function(){
define("dijit/form/_FormMixin",["dojo/_base/array","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/window"],function(_73d,_73e,_73f,lang,_740){
return _73e("dijit.form._FormMixin",null,{state:"",_getDescendantFormWidgets:function(_741){
var res=[];
_73d.forEach(_741||this.getChildren(),function(_742){
if("value" in _742){
res.push(_742);
}else{
res=res.concat(this._getDescendantFormWidgets(_742.getChildren()));
}
},this);
return res;
},reset:function(){
_73d.forEach(this._getDescendantFormWidgets(),function(_743){
if(_743.reset){
_743.reset();
}
});
},validate:function(){
var _744=false;
return _73d.every(_73d.map(this._getDescendantFormWidgets(),function(_745){
_745._hasBeenBlurred=true;
var _746=_745.disabled||!_745.validate||_745.validate();
if(!_746&&!_744){
_740.scrollIntoView(_745.containerNode||_745.domNode);
_745.focus();
_744=true;
}
return _746;
}),function(item){
return item;
});
},setValues:function(val){
_73f.deprecated(this.declaredClass+"::setValues() is deprecated. Use set('value', val) instead.","","2.0");
return this.set("value",val);
},_setValueAttr:function(obj){
var map={};
_73d.forEach(this._getDescendantFormWidgets(),function(_747){
if(!_747.name){
return;
}
var _748=map[_747.name]||(map[_747.name]=[]);
_748.push(_747);
});
for(var name in map){
if(!map.hasOwnProperty(name)){
continue;
}
var _749=map[name],_74a=lang.getObject(name,false,obj);
if(_74a===undefined){
continue;
}
if(!lang.isArray(_74a)){
_74a=[_74a];
}
if(typeof _749[0].checked=="boolean"){
_73d.forEach(_749,function(w){
w.set("value",_73d.indexOf(_74a,w.value)!=-1);
});
}else{
if(_749[0].multiple){
_749[0].set("value",_74a);
}else{
_73d.forEach(_749,function(w,i){
w.set("value",_74a[i]);
});
}
}
}
},getValues:function(){
_73f.deprecated(this.declaredClass+"::getValues() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},_getValueAttr:function(){
var obj={};
_73d.forEach(this._getDescendantFormWidgets(),function(_74b){
var name=_74b.name;
if(!name||_74b.disabled){
return;
}
var _74c=_74b.get("value");
if(typeof _74b.checked=="boolean"){
if(/Radio/.test(_74b.declaredClass)){
if(_74c!==false){
lang.setObject(name,_74c,obj);
}else{
_74c=lang.getObject(name,false,obj);
if(_74c===undefined){
lang.setObject(name,null,obj);
}
}
}else{
var ary=lang.getObject(name,false,obj);
if(!ary){
ary=[];
lang.setObject(name,ary,obj);
}
if(_74c!==false){
ary.push(_74c);
}
}
}else{
var prev=lang.getObject(name,false,obj);
if(typeof prev!="undefined"){
if(lang.isArray(prev)){
prev.push(_74c);
}else{
lang.setObject(name,[prev,_74c],obj);
}
}else{
lang.setObject(name,_74c,obj);
}
}
});
return obj;
},isValid:function(){
return this.state=="";
},onValidStateChange:function(){
},_getState:function(){
var _74d=_73d.map(this._descendants,function(w){
return w.get("state")||"";
});
return _73d.indexOf(_74d,"Error")>=0?"Error":_73d.indexOf(_74d,"Incomplete")>=0?"Incomplete":"";
},disconnectChildren:function(){
_73d.forEach(this._childConnections||[],lang.hitch(this,"disconnect"));
_73d.forEach(this._childWatches||[],function(w){
w.unwatch();
});
},connectChildren:function(_74e){
var _74f=this;
this.disconnectChildren();
this._descendants=this._getDescendantFormWidgets();
var set=_74e?function(name,val){
_74f[name]=val;
}:lang.hitch(this,"_set");
set("value",this.get("value"));
set("state",this._getState());
var _750=(this._childConnections=[]),_751=(this._childWatches=[]);
_73d.forEach(_73d.filter(this._descendants,function(item){
return item.validate;
}),function(_752){
_73d.forEach(["state","disabled"],function(attr){
_751.push(_752.watch(attr,function(){
_74f.set("state",_74f._getState());
}));
});
});
var _753=function(){
if(_74f._onChangeDelayTimer){
clearTimeout(_74f._onChangeDelayTimer);
}
_74f._onChangeDelayTimer=setTimeout(function(){
delete _74f._onChangeDelayTimer;
_74f._set("value",_74f.get("value"));
},10);
};
_73d.forEach(_73d.filter(this._descendants,function(item){
return item.onChange;
}),function(_754){
_750.push(_74f.connect(_754,"onChange",_753));
_751.push(_754.watch("disabled",_753));
});
},startup:function(){
this.inherited(arguments);
this.connectChildren(true);
this.watch("state",function(attr,_755,_756){
this.onValidStateChange(_756=="");
});
},destroy:function(){
this.disconnectChildren();
this.inherited(arguments);
}});
});
},"dijit/Menu":function(){
define("dijit/Menu",["require","dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window","dojo/window","./popup","./DropDownMenu","dojo/ready"],function(_757,_758,_759,_75a,dom,_75b,_75c,_75d,_75e,keys,lang,on,has,win,_75f,pm,_760,_761){
if(!_75e.isAsync){
_761(0,function(){
var _762=["dijit/MenuItem","dijit/PopupMenuItem","dijit/CheckedMenuItem","dijit/MenuSeparator"];
_757(_762);
});
}
return _759("dijit.Menu",_760,{constructor:function(){
this._bindings=[];
},targetNodeIds:[],contextMenuForWindow:false,leftClickToOpen:false,refocus:true,postCreate:function(){
if(this.contextMenuForWindow){
this.bindDomNode(win.body());
}else{
_758.forEach(this.targetNodeIds,this.bindDomNode,this);
}
this.inherited(arguments);
},_iframeContentWindow:function(_763){
return _75f.get(this._iframeContentDocument(_763))||this._iframeContentDocument(_763)["__parent__"]||(_763.name&&win.doc.frames[_763.name])||null;
},_iframeContentDocument:function(_764){
return _764.contentDocument||(_764.contentWindow&&_764.contentWindow.document)||(_764.name&&win.doc.frames[_764.name]&&win.doc.frames[_764.name].document)||null;
},bindDomNode:function(node){
node=dom.byId(node);
var cn;
if(node.tagName.toLowerCase()=="iframe"){
var _765=node,_766=this._iframeContentWindow(_765);
cn=win.withGlobal(_766,win.body);
}else{
cn=(node==win.body()?win.doc.documentElement:node);
}
var _767={node:node,iframe:_765};
_75b.set(node,"_dijitMenu"+this.id,this._bindings.push(_767));
var _768=lang.hitch(this,function(cn){
return [on(cn,this.leftClickToOpen?"click":"contextmenu",lang.hitch(this,function(evt){
_75a.stop(evt);
this._scheduleOpen(evt.target,_765,{x:evt.pageX,y:evt.pageY});
})),on(cn,"keydown",lang.hitch(this,function(evt){
if(evt.shiftKey&&evt.keyCode==keys.F10){
_75a.stop(evt);
this._scheduleOpen(evt.target,_765);
}
}))];
});
_767.connects=cn?_768(cn):[];
if(_765){
_767.onloadHandler=lang.hitch(this,function(){
var _769=this._iframeContentWindow(_765);
cn=win.withGlobal(_769,win.body);
_767.connects=_768(cn);
});
if(_765.addEventListener){
_765.addEventListener("load",_767.onloadHandler,false);
}else{
_765.attachEvent("onload",_767.onloadHandler);
}
}
},unBindDomNode:function(_76a){
var node;
try{
node=dom.byId(_76a);
}
catch(e){
return;
}
var _76b="_dijitMenu"+this.id;
if(node&&_75b.has(node,_76b)){
var bid=_75b.get(node,_76b)-1,b=this._bindings[bid],h;
while(h=b.connects.pop()){
h.remove();
}
var _76c=b.iframe;
if(_76c){
if(_76c.removeEventListener){
_76c.removeEventListener("load",b.onloadHandler,false);
}else{
_76c.detachEvent("onload",b.onloadHandler);
}
}
_75b.remove(node,_76b);
delete this._bindings[bid];
}
},_scheduleOpen:function(_76d,_76e,_76f){
if(!this._openTimer){
this._openTimer=setTimeout(lang.hitch(this,function(){
delete this._openTimer;
this._openMyself({target:_76d,iframe:_76e,coords:_76f});
}),1);
}
},_openMyself:function(args){
var _770=args.target,_771=args.iframe,_772=args.coords;
if(_772){
if(_771){
var ifc=_75c.position(_771,true),_773=this._iframeContentWindow(_771),_774=win.withGlobal(_773,"_docScroll",dojo);
var cs=_75d.getComputedStyle(_771),tp=_75d.toPixelValue,left=(has("ie")&&has("quirks")?0:tp(_771,cs.paddingLeft))+(has("ie")&&has("quirks")?tp(_771,cs.borderLeftWidth):0),top=(has("ie")&&has("quirks")?0:tp(_771,cs.paddingTop))+(has("ie")&&has("quirks")?tp(_771,cs.borderTopWidth):0);
_772.x+=ifc.x+left-_774.x;
_772.y+=ifc.y+top-_774.y;
}
}else{
_772=_75c.position(_770,true);
_772.x+=10;
_772.y+=10;
}
var self=this;
var _775=this._focusManager.get("prevNode");
var _776=this._focusManager.get("curNode");
var _777=!_776||(dom.isDescendant(_776,this.domNode))?_775:_776;
function _778(){
if(self.refocus&&_777){
_777.focus();
}
pm.close(self);
};
pm.open({popup:this,x:_772.x,y:_772.y,onExecute:_778,onCancel:_778,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){
this.inherited("_onBlur",arguments);
pm.close(this);
};
},uninitialize:function(){
_758.forEach(this._bindings,function(b){
if(b){
this.unBindDomNode(b.node);
}
},this);
this.inherited(arguments);
}});
});
},"dijit/layout/ContentPane":function(){
define("dijit/layout/ContentPane",["dojo/_base/kernel","dojo/_base/lang","../_Widget","./_ContentPaneResizeMixin","dojo/string","dojo/html","dojo/i18n!../nls/loading","dojo/_base/array","dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-attr","dojo/_base/window","dojo/_base/xhr","dojo/i18n"],function(_779,lang,_77a,_77b,_77c,html,_77d,_77e,_77f,_780,dom,_781,win,xhr,i18n){
var _782=typeof (dojo.global.perf)!="undefined";
return _77f("dijit.layout.ContentPane",[_77a,_77b],{href:"",content:"",extractContent:false,parseOnLoad:true,parserScope:_779._scopeName,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'><span class='dijitInline dijitIconLoading'></span>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'><span class='dijitInline dijitIconError'></span>${errorState}</span>",isLoaded:false,baseClass:"dijitContentPane",ioArgs:{},onLoadDeferred:null,_setTitleAttr:null,stopParser:true,template:false,create:function(_783,_784){
if((!_783||!_783.template)&&_784&&!("href" in _783)&&!("content" in _783)){
var df=win.doc.createDocumentFragment();
_784=dom.byId(_784);
while(_784.firstChild){
df.appendChild(_784.firstChild);
}
_783=lang.delegate(_783,{content:df});
}
this.inherited(arguments,[_783,_784]);
},postMixInProperties:function(){
this.inherited(arguments);
var _785=i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=_77c.substitute(this.loadingMessage,_785);
this.errorMessage=_77c.substitute(this.errorMessage,_785);
},buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
this.domNode.title="";
if(!_781.get(this.domNode,"role")){
this.domNode.setAttribute("role","group");
}
this.domNode.removeAttribute("title");
},startup:function(){
this.inherited(arguments);
if(this._contentSetter){
_77e.forEach(this._contentSetter.parseResults,function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
},this);
}
},setHref:function(href){
_779.deprecated("dijit.layout.ContentPane.setHref() is deprecated. Use set('href', ...) instead.","","2.0");
return this.set("href",href);
},_setHrefAttr:function(href){
this.cancel();
this.onLoadDeferred=new _780(lang.hitch(this,"cancel"));
this.onLoadDeferred.addCallback(lang.hitch(this,"onLoad"));
this._set("href",href);
if(this.preload||(this._created&&this._isShown())){
this._load();
}else{
this._hrefChanged=true;
}
return this.onLoadDeferred;
},setContent:function(data){
_779.deprecated("dijit.layout.ContentPane.setContent() is deprecated.  Use set('content', ...) instead.","","2.0");
this.set("content",data);
},_setContentAttr:function(data){
this._set("href","");
this.cancel();
this.onLoadDeferred=new _780(lang.hitch(this,"cancel"));
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
},destroyRecursive:function(_786){
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
this.onLoadDeferred=new _780(lang.hitch(this,"cancel"));
this.onLoadDeferred.addCallback(lang.hitch(this,"onLoad"));
this._load();
return this.onLoadDeferred;
},_load:function(){
if(_782){
perf.widgetStartedLoadingCallback();
}
this._setContent(this.onDownloadStart(),true);
var self=this;
var _787={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(lang.isObject(this.ioArgs)){
lang.mixin(_787,this.ioArgs);
}
var hand=(this._xhrDfd=(this.ioMethod||xhr.get)(_787));
hand.addCallback(function(html){
try{
self._isDownloaded=true;
self._setContent(html,false);
self.onDownloadEnd();
}
catch(err){
self._onError("Content",err);
}
if(_782){
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
},destroyDescendants:function(_788){
if(this.isLoaded){
this._onUnloadHandler();
}
var _789=this._contentSetter;
_77e.forEach(this.getChildren(),function(_78a){
if(_78a.destroyRecursive){
_78a.destroyRecursive(_788);
}
});
if(_789){
_77e.forEach(_789.parseResults,function(_78b){
if(_78b.destroyRecursive&&_78b.domNode&&_78b.domNode.parentNode==win.body()){
_78b.destroyRecursive(_788);
}
});
delete _789.parseResults;
}
if(!_788){
html._emptyNode(this.containerNode);
}
delete this._singleChild;
},_setContent:function(cont,_78c){
this.destroyDescendants();
var _78d=this._contentSetter;
if(!(_78d&&_78d instanceof html._ContentSetter)){
_78d=this._contentSetter=new html._ContentSetter({node:this.containerNode,_onError:lang.hitch(this,this._onError),onContentError:lang.hitch(this,function(e){
var _78e=this.onContentError(e);
try{
this.containerNode.innerHTML=_78e;
}
catch(e){
console.error("Fatal "+this.id+" could not change content due to "+e.message,e);
}
})});
}
var _78f=lang.mixin({cleanContent:this.cleanContent,extractContent:this.extractContent,parseContent:!cont.domNode&&this.parseOnLoad,parserScope:this.parserScope,startup:false,dir:this.dir,lang:this.lang,textDir:this.textDir},this._contentSetterParams||{});
_78d.set((lang.isObject(cont)&&cont.domNode)?cont.domNode:cont,_78f);
delete this._contentSetterParams;
if(this.doLayout){
this._checkIfSingleChild();
}
if(!_78c){
if(this._started){
delete this._started;
this.startup();
this._scheduleLayout();
}
this._onLoadHandler(cont);
}
},_onError:function(type,err,_790){
this.onLoadDeferred.errback(err);
var _791=this["on"+type+"Error"].call(this,err);
if(_790){
console.error(_790,err);
}else{
if(_791){
this._setContent(_791,true);
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
var _792=dojo.declare("curam.util.RuntimeContext",null,{_window:null,constructor:function(_793){
this._window=_793;
},getHref:function(){
return this._window.location.href;
},getPathName:function(){
return this._window.location.pathName;
},contextObject:function(){
return this._window;
}});
return _792;
});
},"idx/oneui/MenuHeading":function(){
require({cache:{"url:idx/oneui/templates/MenuHeading.html":"<tr class=\"dijitReset dijitMenuItem oneuiMenuHeading\" role=\"presentation\" tabindex=\"-1\">\r\n\t<td class=\"dijitReset dijitMenuItemLabel oneuiMenuHeadingLabel\" colspan=\"4\" data-dojo-attach-point=\"containerNode\"></td>\r\n</tr>"}});
define("idx/oneui/MenuHeading",["dojo/_base/declare","dijit/MenuSeparator","dojo/text!../oneui/templates/MenuHeading.html"],function(_794,_795,_796){
return _794("idx.oneui.MenuHeading",[_795],{label:"",_setLabelAttr:{node:"containerNode",type:"innerHTML"},templateString:_796});
});
},"dijit/_KeyNavContainer":function(){
define("dijit/_KeyNavContainer",["dojo/_base/kernel","./_Container","./_FocusMixin","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/event","dojo/dom-attr","dojo/_base/lang"],function(_797,_798,_799,_79a,keys,_79b,_79c,_79d,lang){
return _79b("dijit._KeyNavContainer",[_799,_798],{tabIndex:"0",connectKeyNavHandlers:function(_79e,_79f){
var _7a0=(this._keyNavCodes={});
var prev=lang.hitch(this,"focusPrev");
var next=lang.hitch(this,"focusNext");
_79a.forEach(_79e,function(code){
_7a0[code]=prev;
});
_79a.forEach(_79f,function(code){
_7a0[code]=next;
});
_7a0[keys.HOME]=lang.hitch(this,"focusFirstChild");
_7a0[keys.END]=lang.hitch(this,"focusLastChild");
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
this.connect(this.domNode,"onfocus","_onContainerFocus");
},startupKeyNavChildren:function(){
_797.deprecated("startupKeyNavChildren() call no longer needed","","2.0");
},startup:function(){
this.inherited(arguments);
_79a.forEach(this.getChildren(),lang.hitch(this,"_startupChild"));
},addChild:function(_7a1,_7a2){
this.inherited(arguments);
this._startupChild(_7a1);
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
},focusChild:function(_7a3,last){
if(!_7a3){
return;
}
if(this.focusedChild&&_7a3!==this.focusedChild){
this._onChildBlur(this.focusedChild);
}
_7a3.set("tabIndex",this.tabIndex);
_7a3.focus(last?"end":"start");
this._set("focusedChild",_7a3);
},_startupChild:function(_7a4){
_7a4.set("tabIndex","-1");
this.connect(_7a4,"_onFocus",function(){
_7a4.set("tabIndex",this.tabIndex);
});
this.connect(_7a4,"_onBlur",function(){
_7a4.set("tabIndex","-1");
});
},_onContainerFocus:function(evt){
if(evt.target!==this.domNode||this.focusedChild){
return;
}
this.focusFirstChild();
_79d.set(this.domNode,"tabIndex","-1");
},_onBlur:function(evt){
if(this.tabIndex){
_79d.set(this.domNode,"tabIndex",this.tabIndex);
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
_79c.stop(evt);
}
},_onChildBlur:function(){
},_getFirstFocusableChild:function(){
return this._getNextFocusableChild(null,1);
},_getLastFocusableChild:function(){
return this._getNextFocusableChild(null,-1);
},_getNextFocusableChild:function(_7a5,dir){
if(_7a5){
_7a5=this._getSiblingOfChild(_7a5,dir);
}
var _7a6=this.getChildren();
for(var i=0;i<_7a6.length;i++){
if(!_7a5){
_7a5=_7a6[(dir>0)?0:(_7a6.length-1)];
}
if(_7a5.isFocusable()){
return _7a5;
}
_7a5=this._getSiblingOfChild(_7a5,dir);
}
return null;
}});
});
},"dijit/layout/utils":function(){
define("dijit/layout/utils",["dojo/_base/array","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang",".."],function(_7a7,_7a8,_7a9,_7aa,lang,_7ab){
var _7ac=lang.getObject("layout",true,_7ab);
_7ac.marginBox2contentBox=function(node,mb){
var cs=_7aa.getComputedStyle(node);
var me=_7a9.getMarginExtents(node,cs);
var pb=_7a9.getPadBorderExtents(node,cs);
return {l:_7aa.toPixelValue(node,cs.paddingLeft),t:_7aa.toPixelValue(node,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)};
};
function _7ad(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
};
function size(_7ae,dim){
var _7af=_7ae.resize?_7ae.resize(dim):_7a9.setMarginBox(_7ae.domNode,dim);
if(_7ae.fakeWidget){
return;
}
if(_7af){
lang.mixin(_7ae,_7af);
}else{
lang.mixin(_7ae,_7a9.getMarginBoxSimple(_7ae.domNode));
lang.mixin(_7ae,dim);
}
};
_7ac.layoutChildren=function(_7b0,dim,_7b1,_7b2,_7b3){
dim=lang.mixin({},dim);
_7a8.add(_7b0,"dijitLayoutContainer");
_7b1=_7a7.filter(_7b1,function(item){
return item.region!="center"&&item.layoutAlign!="client";
}).concat(_7a7.filter(_7b1,function(item){
return item.region=="center"||item.layoutAlign=="client";
}));
var _7b4={};
_7a7.forEach(_7b1,function(_7b5){
var elm=_7b5.domNode,pos=(_7b5.region||_7b5.layoutAlign);
if(!pos){
throw new Error("No region setting for "+_7b5.id);
}
var _7b6=elm.style;
_7b6.left=dim.l+"px";
_7b6.top=dim.t+"px";
_7b6.position="absolute";
_7a8.add(elm,"dijitAlign"+_7ad(pos));
var _7b7={};
if(_7b2&&_7b2==_7b5.id){
_7b7[_7b5.region=="top"||_7b5.region=="bottom"?"h":"w"]=_7b3;
}
if(pos=="top"||pos=="bottom"){
_7b7.w=dim.w;
size(_7b5,_7b7);
dim.h-=_7b5.h;
if(pos=="top"){
dim.t+=_7b5.h;
}else{
_7b6.top=dim.t+dim.h+"px";
}
}else{
if(pos=="left"||pos=="right"){
_7b7.h=dim.h;
size(_7b5,_7b7);
dim.w-=_7b5.w;
if(pos=="left"){
dim.l+=_7b5.w;
}else{
_7b6.left=dim.l+dim.w+"px";
}
}else{
if(pos=="client"||pos=="center"){
size(_7b5,dim);
}
}
}
_7b4[pos]={w:dim.w,h:dim.h};
});
return _7b4;
};
return {marginBox2contentBox:_7ac.marginBox2contentBox,layoutChildren:_7ac.layoutChildren};
});
},"dijit/_Contained":function(){
define("dijit/_Contained",["dojo/_base/declare","./registry"],function(_7b8,_7b9){
return _7b8("dijit._Contained",null,{_getSibling:function(_7ba){
var node=this.domNode;
do{
node=node[_7ba+"Sibling"];
}while(node&&node.nodeType!=1);
return node&&_7b9.byNode(node);
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
define("idx/oneui/Menu",["dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/dom-geometry","dijit/_TemplatedMixin","dijit/_WidgetBase","dijit/Menu","dijit/MenuItem","dijit/registry","idx/oneui/_MenuOpenOnHoverMixin","dojo/text!../oneui/templates/Menu.html","dojo/text!../oneui/templates/_MenuColumn.html"],function(_7bb,_7bc,_7bd,_7be,_7bf,_7c0,Menu,_7c1,_7c2,_7c3,_7c4,_7c5){
var _7c6={"error":"oneuiErrorMenuItemIcon","warning":"oneuiWarningMenuItemIcon","confirmation":"oneuiConfirmationMenuItemIcon","information":"oneuiInformationMenuItemIcon","success":"oneuiSuccessMenuItemIcon","critical":"oneuiCriticalMenuItemIcon","attention":"oneuiAttentionMenuItemIcon","compliance":"oneuiComplianceMenuItemIcon"};
var Menu=_7bc("idx.oneui.Menu",[Menu,_7c3],{_containerNodes:null,columnNodes:null,menuForDialog:true,templateString:_7c4,constructor:function(){
this._containerNodes=[];
this.columnNodes=[];
},_getNextFocusableChild:function(_7c7,dir){
var _7c8=null;
var _7c9=this.getChildren();
var _7ca;
if(_7c7!=null){
_7ca=_7bb.indexOf(_7c9,_7c7);
if(_7ca!=-1){
_7ca+=dir;
if(_7ca<0){
_7ca=_7c9.length-1;
}
if(_7ca>=_7c9.length){
_7ca=0;
}
}
}else{
if(_7c9.length==0){
_7ca=-1;
}else{
_7ca=(dir==1)?0:_7c9.length-1;
}
}
if(_7ca!=-1){
var i=_7ca;
do{
if(_7c9[i].isFocusable()){
_7c8=_7c9[i];
break;
}
i+=dir;
if(i<0){
i=_7c9.length-1;
}
if(i>=_7c9.length){
i=0;
}
}while(i!=_7ca);
}
return _7c8;
},_moveToColumn:function(dir){
if(this.focusedChild){
for(var i=0;i<this._containerNodes.length;i++){
if(this.focusedChild.domNode.parentNode==this._containerNodes[i]){
var _7cb=i,yPos=_7be.getMarginBox(this.focusedChild.domNode).t;
break;
}
}
}
if(_7cb!=undefined){
for(i=_7cb+dir;i>=0&&i<this._containerNodes.length;i+=dir){
var _7cc=_7c2.findWidgets(this._containerNodes[i]);
var _7cd=dojo.filter(_7cc,function(_7ce){
return _7ce.isFocusable();
});
if(_7cd.length>0){
var _7cf=i;
break;
}
}
if(_7cf!=undefined){
for(i=0;i<_7cd.length;i++){
var _7d0=_7cd[i];
var _7d1=_7be.getMarginBox(_7d0.domNode);
if(yPos>=_7d1.t&&yPos<=_7d1.t+_7d1.h-1){
this.focusChild(_7d0);
return true;
}else{
if(yPos<_7d1.t){
if(i>0){
this.focusChild(_7cd[i-1]);
return true;
}else{
this.focusChild(_7d0);
return true;
}
}else{
if(i==_7cd.length-1){
this.focusChild(_7d0);
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
_7bd.stop(evt);
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
_7bd.stop(evt);
break;
}
},refresh:function(){
var _7d2=this.getChildren();
for(var i=0;i<_7d2.length;i++){
this.addChild(_7d2[i]);
}
},startup:function(){
if(this._started){
return;
}
this._started=true;
this.inherited(arguments);
this.containerNode=this._columnContainerNode;
this.refresh();
},addChild:function(_7d3,_7d4){
while(this._containerNodes.length<=(_7d3.column||0)){
var node=_7bf.getCachedTemplate(_7c5).cloneNode(true);
this._attachTemplateNodes(node,function(n,p){
return n.getAttribute(p);
});
this._columnContainerNode.appendChild(node);
}
this.containerNode=this._containerNodes[_7d3.column||0];
this.inherited(arguments);
this.containerNode=this._columnContainerNode;
}});
Menu.createMessageMenuItem=function(args){
var _7d5="";
if(args){
if(args.timestamp){
_7d5+="‏<span class=\"messageMenuTimestamp messagesContrast\">‎"+args.timestamp+"‏</span>‎";
}
if(args.content){
_7d5+="‏ <span class=\"messageTitles\">‎"+args.content+"‏</span>‎";
}
if(args.messageId){
_7d5+="‏ <span class=\"messagesContrast\">(‎"+args.messageId+"‏)</span>‎";
}
}
return new _7c1({label:_7d5,iconClass:args&&args.type&&_7c6[args.type]});
};
return Menu;
});
},"idx/oneui/_EventTriggerMixin":function(){
define("idx/oneui/_EventTriggerMixin",["dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/_base/lang","dojo/_base/window","dojo/dom","dojo/io/iframe","dojo/mouse","dojo/on","dojo/window","dijit/_MenuBase"],function(_7d6,_7d7,_7d8,lang,_7d9,dom,_7da,_7db,on,_7dc,_7dd){
var dojo={},_7de={};
return _7d7("idx.oneui._EventTriggerMixin",null,{_bindings:null,_hoverTimer:null,hoverDuration:_7dd.prototype.popupDelay,constructor:function(){
this._bindings=[];
},_addEventTrigger:function(_7df,_7e0,_7e1,_7e2){
_7df=dom.byId(_7df);
if(!_7df){
require.log("ERROR: oneui._EventTriggerMixin._addEventTrigger(): Invalid triggerNode parameter.");
return;
}
var _7e3=lang.hitch(this,function(_7e4){
var _7e5={triggerNode:_7df,eventName:_7e0,event:_7e4,additionalData:_7e2};
if(!_7e1||_7e1(_7e5)){
this._onTrigger(_7e5);
}
});
var _7e6=function(_7e7){
return {type:"hover",pageX:_7e7.pageX,pageY:_7e7.pageY,screenX:_7e7.screenX,screenY:_7e7.screenY,clientX:_7e7.clientX,clientY:_7e7.clientY};
};
var _7e8={triggerNode:_7df,connectHandles:[]};
if(_7e0=="hover"){
_7e8.hoverDuration=this.hoverDuration;
_7e8.hoverTimer=null;
}
_7e8.bindFunction=function(){
var _7e9;
if(_7df.tagName=="IFRAME"){
try{
var _7ea=_7da.doc(_7df);
_7e9=_7ea?_7ea.body:null;
}
catch(e){
require.log("ERROR: oneui._EventTriggerMixin._addEventTrigger(): Error accessing body of document within iframe. "+e);
}
}else{
_7e9=_7df;
}
if(!_7e9){
require.log("ERROR: oneui._EventTriggerMixin._addEventTrigger(): Unable to determine node to attach event listener(s) to.");
return;
}
if(_7e0=="hover"){
var _7eb=null;
_7e8.connectHandles.push(on(_7e9,_7db.enter,lang.hitch(this,function(_7ec){
_7eb=_7e6(_7ec);
if(_7e8.hoverTimer){
clearTimeout(_7e8.hoverTimer);
}
_7e8.hoverTimer=setTimeout(function(){
_7e3(_7eb);
},_7e8.hoverDuration);
})));
_7e8.connectHandles.push(on(_7e9,_7db.leave,lang.hitch(this,function(_7ed){
if(_7e8.hoverTimer){
clearTimeout(_7e8.hoverTimer);
_7e8.hoverTimer=null;
}
_7eb=undefined;
})));
_7e8.connectHandles.push(on(_7e9,"mousemove",function(_7ee){
_7eb=_7e6(_7ee);
}));
}else{
_7e8.connectHandles.push(on(_7e9,_7e0,function(_7ef){
_7e3(_7ef);
}));
}
};
_7e8.unbindFunction=function(){
_7d6.forEach(_7e8.connectHandles,function(conn){
conn.remove();
});
if(_7e8.hoverTimer){
clearTimeout(_7e8.hoverTimer);
_7e8.hoverTimer=null;
}
};
if(_7df.tagName==="IFRAME"){
_7e8.iframeOnLoadHandler=function(_7f0){
try{
_7e8.unbindFunction();
}
catch(e){
}
_7e8.bindFunction();
};
if(_7df.addEventListener){
_7df.addEventListener("load",_7e8.iframeOnLoadHandler,false);
}else{
_7df.attachEvent("onload",_7e8.iframeOnLoadHandler);
}
}
this._bindings.push(_7e8);
_7e8.bindFunction();
},_onTrigger:function(_7f1){
},_removeEventTriggers:function(_7f2){
if(_7f2){
_7f2=dom.byId(_7f2);
}
for(var i=this._bindings.length-1;i>=0;i--){
var _7f3=this._bindings[i];
if(!_7f2||(_7f2===_7f3.triggerNode)){
_7f3.unbindFunction();
if(_7f3.iframeOnLoadHandler){
if(_7f3.triggerNode.removeEventListener){
_7f3.triggerNode.removeEventListener("load",_7f3.iframeOnLoadHandler,false);
}else{
_7f3.triggerNode.detachEvent("onload",_7f3.iframeOnLoadHandler);
}
}
this._bindings.splice(i,1);
}
}
}});
});
},"url:dijit/templates/MenuBar.html":"<div class=\"dijitMenuBar dijitMenuPassive\" data-dojo-attach-point=\"containerNode\"  role=\"menubar\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress: _onKeyPress\"></div>\n","dijit/_Container":function(){
define("dijit/_Container",["dojo/_base/array","dojo/_base/declare","dojo/dom-construct","./registry"],function(_7f4,_7f5,_7f6,_7f7){
return _7f5("dijit._Container",null,{buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_7f8,_7f9){
var _7fa=this.containerNode;
if(_7f9&&typeof _7f9=="number"){
var _7fb=this.getChildren();
if(_7fb&&_7fb.length>=_7f9){
_7fa=_7fb[_7f9-1].domNode;
_7f9="after";
}
}
_7f6.place(_7f8.domNode,_7fa,_7f9);
if(this._started&&!_7f8._started){
_7f8.startup();
}
},removeChild:function(_7fc){
if(typeof _7fc=="number"){
_7fc=this.getChildren()[_7fc];
}
if(_7fc){
var node=_7fc.domNode;
if(node&&node.parentNode){
node.parentNode.removeChild(node);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},_getSiblingOfChild:function(_7fd,dir){
var node=_7fd.domNode,_7fe=(dir>0?"nextSibling":"previousSibling");
do{
node=node[_7fe];
}while(node&&(node.nodeType!=1||!_7f7.byNode(node)));
return node&&_7f7.byNode(node);
},getIndexOfChild:function(_7ff){
return _7f4.indexOf(this.getChildren(),_7ff);
}});
});
},"dojo/html":function(){
define("dojo/html",["./_base/kernel","./_base/lang","./_base/array","./_base/declare","./dom","./dom-construct","./parser"],function(dojo,lang,_800,_801,dom,_802,_803){
lang.getObject("html",true,dojo);
var _804=0;
dojo.html._secureForInnerHtml=function(cont){
return cont.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"");
};
dojo.html._emptyNode=_802.empty;
dojo.html._setNodeContent=function(node,cont){
_802.empty(node);
if(cont){
if(typeof cont=="string"){
cont=_802.toDom(cont,node.ownerDocument);
}
if(!cont.nodeType&&lang.isArrayLike(cont)){
for(var _805=cont.length,i=0;i<cont.length;i=_805==cont.length?i+1:0){
_802.place(cont[i],node,"last");
}
}else{
_802.place(cont,node,"last");
}
}
return node;
};
_801("dojo.html._ContentSetter",null,{node:"",content:"",id:"",cleanContent:false,extractContent:false,parseContent:false,parserScope:dojo._scopeName,startup:true,constructor:function(_806,node){
lang.mixin(this,_806||{});
node=this.node=dom.byId(this.node||node);
if(!this.id){
this.id=["Setter",(node)?node.id||node.tagName:"",_804++].join("_");
}
},set:function(cont,_807){
if(undefined!==cont){
this.content=cont;
}
if(_807){
this._mixin(_807);
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
var _808=this.onContentError(e);
try{
node.innerHTML=_808;
}
catch(e){
console.error("Fatal "+this.declaredClass+".setContent could not change content due to "+e.message,e);
}
}
this.node=node;
},empty:function(){
if(this.parseResults&&this.parseResults.length){
_800.forEach(this.parseResults,function(w){
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
var _809=cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_809){
cont=_809[1];
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
},_mixin:function(_80a){
var _80b={},key;
for(key in _80a){
if(key in _80b){
continue;
}
this[key]=_80a[key];
}
},_parse:function(){
var _80c=this.node;
try{
var _80d={};
_800.forEach(["dir","lang","textDir"],function(name){
if(this[name]){
_80d[name]=this[name];
}
},this);
this.parseResults=_803.parse({rootNode:_80c,noStart:!this.startup,inherited:_80d,scope:this.parserScope});
}
catch(e){
this._onError("Content",e,"Error parsing in _ContentSetter#"+this.id);
}
},_onError:function(type,err,_80e){
var _80f=this["on"+type+"Error"].call(this,err);
if(_80e){
console.error(_80e,err);
}else{
if(_80f){
dojo.html._setNodeContent(this.node,_80f,true);
}
}
}});
dojo.html.set=function(node,cont,_810){
if(undefined==cont){
console.warn("dojo.html.set: no cont argument provided, using empty string");
cont="";
}
if(!_810){
return dojo.html._setNodeContent(node,cont,true);
}else{
var op=new dojo.html._ContentSetter(lang.mixin(_810,{content:cont,node:node}));
return op.set();
}
};
return dojo.html;
});
},"dijit/layout/BorderContainer":function(){
define("dijit/layout/BorderContainer",["dojo/_base/array","dojo/cookie","dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/on","dojo/touch","dojo/_base/window","../_WidgetBase","../_Widget","../_TemplatedMixin","./_LayoutWidget","./utils"],function(_811,_812,_813,_814,_815,_816,_817,_818,keys,lang,on,_819,win,_81a,_81b,_81c,_81d,_81e){
var _81f=_813("dijit.layout._Splitter",[_81b,_81c],{live:true,templateString:"<div class=\"dijitSplitter\" data-dojo-attach-event=\"onkeypress:_onKeyPress,press:_startDrag,onmouseenter:_onMouse,onmouseleave:_onMouse\" tabIndex=\"0\" role=\"separator\"><div class=\"dijitSplitterThumb\"></div></div>",constructor:function(){
this._handlers=[];
},postMixInProperties:function(){
this.inherited(arguments);
this.horizontal=/top|bottom/.test(this.region);
this._factor=/top|left/.test(this.region)?1:-1;
this._cookieName=this.container.id+"_"+this.region;
},buildRendering:function(){
this.inherited(arguments);
_814.add(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V"));
if(this.container.persist){
var _820=_812(this._cookieName);
if(_820){
this.child.domNode.style[this.horizontal?"height":"width"]=_820;
}
}
},_computeMaxSize:function(){
var dim=this.horizontal?"h":"w",_821=_816.getMarginBox(this.child.domNode)[dim],_822=_811.filter(this.container.getChildren(),function(_823){
return _823.region=="center";
})[0],_824=_816.getMarginBox(_822.domNode)[dim];
return Math.min(this.child.maxSize,_821+_824);
},_startDrag:function(e){
if(!this.cover){
this.cover=win.doc.createElement("div");
_814.add(this.cover,"dijitSplitterCover");
_815.place(this.cover,this.child.domNode,"after");
}
_814.add(this.cover,"dijitSplitterCoverActive");
if(this.fake){
_815.destroy(this.fake);
}
if(!(this._resize=this.live)){
(this.fake=this.domNode.cloneNode(true)).removeAttribute("id");
_814.add(this.domNode,"dijitSplitterShadow");
_815.place(this.fake,this.domNode,"after");
}
_814.add(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active");
if(this.fake){
_814.remove(this.fake,"dijitSplitterHover dijitSplitter"+(this.horizontal?"H":"V")+"Hover");
}
var _825=this._factor,_826=this.horizontal,axis=_826?"pageY":"pageX",_827=e[axis],_828=this.domNode.style,dim=_826?"h":"w",_829=_816.getMarginBox(this.child.domNode)[dim],max=this._computeMaxSize(),min=this.child.minSize||20,_82a=this.region,_82b=_82a=="top"||_82a=="bottom"?"top":"left",_82c=parseInt(_828[_82b],10),_82d=this._resize,_82e=lang.hitch(this.container,"_layoutChildren",this.child.id),de=win.doc;
this._handlers=this._handlers.concat([on(de,_819.move,this._drag=function(e,_82f){
var _830=e[axis]-_827,_831=_825*_830+_829,_832=Math.max(Math.min(_831,max),min);
if(_82d||_82f){
_82e(_832);
}
_828[_82b]=_830+_82c+_825*(_832-_831)+"px";
}),on(de,"dragstart",_818.stop),on(win.body(),"selectstart",_818.stop),on(de,_819.release,lang.hitch(this,"_stopDrag"))]);
_818.stop(e);
},_onMouse:function(e){
var o=(e.type=="mouseover"||e.type=="mouseenter");
_814.toggle(this.domNode,"dijitSplitterHover",o);
_814.toggle(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V")+"Hover",o);
},_stopDrag:function(e){
try{
if(this.cover){
_814.remove(this.cover,"dijitSplitterCoverActive");
}
if(this.fake){
_815.destroy(this.fake);
}
_814.remove(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active dijitSplitterShadow");
this._drag(e);
this._drag(e,true);
}
finally{
this._cleanupHandlers();
delete this._drag;
}
if(this.container.persist){
_812(this._cookieName,this.child.domNode.style[this.horizontal?"height":"width"],{expires:365});
}
},_cleanupHandlers:function(){
var h;
while(h=this._handlers.pop()){
h.remove();
}
},_onKeyPress:function(e){
this._resize=true;
var _833=this.horizontal;
var tick=1;
switch(e.charOrCode){
case _833?keys.UP_ARROW:keys.LEFT_ARROW:
tick*=-1;
case _833?keys.DOWN_ARROW:keys.RIGHT_ARROW:
break;
default:
return;
}
var _834=_816.getMarginSize(this.child.domNode)[_833?"h":"w"]+this._factor*tick;
this.container._layoutChildren(this.child.id,Math.max(Math.min(_834,this._computeMaxSize()),this.child.minSize));
_818.stop(e);
},destroy:function(){
this._cleanupHandlers();
delete this.child;
delete this.container;
delete this.cover;
delete this.fake;
this.inherited(arguments);
}});
var _835=_813("dijit.layout._Gutter",[_81b,_81c],{templateString:"<div class=\"dijitGutter\" role=\"presentation\"></div>",postMixInProperties:function(){
this.inherited(arguments);
this.horizontal=/top|bottom/.test(this.region);
},buildRendering:function(){
this.inherited(arguments);
_814.add(this.domNode,"dijitGutter"+(this.horizontal?"H":"V"));
}});
var _836=_813("dijit.layout.BorderContainer",_81d,{design:"headline",gutters:true,liveSplitters:true,persist:false,baseClass:"dijitBorderContainer",_splitterClass:_81f,postMixInProperties:function(){
if(!this.gutters){
this.baseClass+="NoGutter";
}
this.inherited(arguments);
},startup:function(){
if(this._started){
return;
}
_811.forEach(this.getChildren(),this._setupChild,this);
this.inherited(arguments);
},_setupChild:function(_837){
var _838=_837.region;
if(_838){
this.inherited(arguments);
_814.add(_837.domNode,this.baseClass+"Pane");
var ltr=this.isLeftToRight();
if(_838=="leading"){
_838=ltr?"left":"right";
}
if(_838=="trailing"){
_838=ltr?"right":"left";
}
if(_838!="center"&&(_837.splitter||this.gutters)&&!_837._splitterWidget){
var _839=_837.splitter?this._splitterClass:_835;
if(lang.isString(_839)){
_839=lang.getObject(_839);
}
var _83a=new _839({id:_837.id+"_splitter",container:this,child:_837,region:_838,live:this.liveSplitters});
_83a.isSplitter=true;
_837._splitterWidget=_83a;
_815.place(_83a.domNode,_837.domNode,"after");
_83a.startup();
}
_837.region=_838;
}
},layout:function(){
this._layoutChildren();
},addChild:function(_83b,_83c){
this.inherited(arguments);
if(this._started){
this.layout();
}
},removeChild:function(_83d){
var _83e=_83d.region;
var _83f=_83d._splitterWidget;
if(_83f){
_83f.destroy();
delete _83d._splitterWidget;
}
this.inherited(arguments);
if(this._started){
this._layoutChildren();
}
_814.remove(_83d.domNode,this.baseClass+"Pane");
_817.set(_83d.domNode,{top:"auto",bottom:"auto",left:"auto",right:"auto",position:"static"});
_817.set(_83d.domNode,_83e=="top"||_83e=="bottom"?"width":"height","auto");
},getChildren:function(){
return _811.filter(this.inherited(arguments),function(_840){
return !_840.isSplitter;
});
},getSplitter:function(_841){
return _811.filter(this.getChildren(),function(_842){
return _842.region==_841;
})[0]._splitterWidget;
},resize:function(_843,_844){
if(!this.cs||!this.pe){
var node=this.domNode;
this.cs=_817.getComputedStyle(node);
this.pe=_816.getPadExtents(node,this.cs);
this.pe.r=_817.toPixelValue(node,this.cs.paddingRight);
this.pe.b=_817.toPixelValue(node,this.cs.paddingBottom);
_817.set(node,"padding","0px");
}
this.inherited(arguments);
},_layoutChildren:function(_845,_846){
if(!this._borderBox||!this._borderBox.h){
return;
}
var _847=_811.map(this.getChildren(),function(_848,idx){
return {pane:_848,weight:[_848.region=="center"?Infinity:0,_848.layoutPriority,(this.design=="sidebar"?1:-1)*(/top|bottom/.test(_848.region)?1:-1),idx]};
},this);
_847.sort(function(a,b){
var aw=a.weight,bw=b.weight;
for(var i=0;i<aw.length;i++){
if(aw[i]!=bw[i]){
return aw[i]-bw[i];
}
}
return 0;
});
var _849=[];
_811.forEach(_847,function(_84a){
var pane=_84a.pane;
_849.push(pane);
if(pane._splitterWidget){
_849.push(pane._splitterWidget);
}
});
var dim={l:this.pe.l,t:this.pe.t,w:this._borderBox.w-this.pe.w,h:this._borderBox.h-this.pe.h};
_81e.layoutChildren(this.domNode,dim,_849,_845,_846);
},destroyRecursive:function(){
_811.forEach(this.getChildren(),function(_84b){
var _84c=_84b._splitterWidget;
if(_84c){
_84c.destroy();
}
delete _84b._splitterWidget;
});
this.inherited(arguments);
}});
lang.extend(_81a,{region:"",layoutPriority:0,splitter:false,minSize:0,maxSize:Infinity});
_836._Splitter=_81f;
_836._Gutter=_835;
return _836;
});
},"dijit/_base":function(){
define("dijit/_base",[".","./a11y","./WidgetSet","./_base/focus","./_base/manager","./_base/place","./_base/popup","./_base/scroll","./_base/sniff","./_base/typematic","./_base/wai","./_base/window"],function(_84d){
return _84d._base;
});
},"dijit/_base/typematic":function(){
define("dijit/_base/typematic",["../typematic"],function(){
});
},"dojo/window":function(){
define("dojo/window",["./_base/lang","./_base/sniff","./_base/window","./dom","./dom-geometry","./dom-style"],function(lang,has,_84e,dom,geom,_84f){
var _850=lang.getObject("dojo.window",true);
_850.getBox=function(){
var _851=(_84e.doc.compatMode=="BackCompat")?_84e.body():_84e.doc.documentElement,_852=geom.docScroll(),w,h;
if(has("touch")){
var _853=_84e.doc.parentWindow||_84e.doc.defaultView;
w=_853.innerWidth||_851.clientWidth;
h=_853.innerHeight||_851.clientHeight;
}else{
w=_851.clientWidth;
h=_851.clientHeight;
}
return {l:_852.x,t:_852.y,w:w,h:h};
};
_850.get=function(doc){
if(has("ie")&&_850!==document.parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc.parentWindow||doc.defaultView;
};
_850.scrollIntoView=function(node,pos){
try{
node=dom.byId(node);
var doc=node.ownerDocument||_84e.doc,body=doc.body||_84e.body(),html=doc.documentElement||body.parentNode,isIE=has("ie"),isWK=has("webkit");
if((!(has("mozilla")||isIE||isWK||has("opera"))||node==body||node==html)&&(typeof node.scrollIntoView!="undefined")){
node.scrollIntoView(false);
return;
}
var _854=doc.compatMode=="BackCompat",_855=(isIE>=9&&node.ownerDocument.parentWindow.frameElement)?((html.clientHeight>0&&html.clientWidth>0&&(body.clientHeight==0||body.clientWidth==0||body.clientHeight>html.clientHeight||body.clientWidth>html.clientWidth))?html:body):(_854?body:html),_856=isWK?body:_855,_857=_855.clientWidth,_858=_855.clientHeight,rtl=!geom.isBodyLtr(),_859=pos||geom.position(node),el=node.parentNode,_85a=function(el){
return ((isIE<=6||(isIE&&_854))?false:(_84f.get(el,"position").toLowerCase()=="fixed"));
};
if(_85a(node)){
return;
}
while(el){
if(el==body){
el=_856;
}
var _85b=geom.position(el),_85c=_85a(el);
if(el==_856){
_85b.w=_857;
_85b.h=_858;
if(_856==html&&isIE&&rtl){
_85b.x+=_856.offsetWidth-_85b.w;
}
if(_85b.x<0||!isIE){
_85b.x=0;
}
if(_85b.y<0||!isIE){
_85b.y=0;
}
}else{
var pb=geom.getPadBorderExtents(el);
_85b.w-=pb.w;
_85b.h-=pb.h;
_85b.x+=pb.l;
_85b.y+=pb.t;
var _85d=el.clientWidth,_85e=_85b.w-_85d;
if(_85d>0&&_85e>0){
_85b.w=_85d;
_85b.x+=(rtl&&(isIE||el.clientLeft>pb.l))?_85e:0;
}
_85d=el.clientHeight;
_85e=_85b.h-_85d;
if(_85d>0&&_85e>0){
_85b.h=_85d;
}
}
if(_85c){
if(_85b.y<0){
_85b.h+=_85b.y;
_85b.y=0;
}
if(_85b.x<0){
_85b.w+=_85b.x;
_85b.x=0;
}
if(_85b.y+_85b.h>_858){
_85b.h=_858-_85b.y;
}
if(_85b.x+_85b.w>_857){
_85b.w=_857-_85b.x;
}
}
var l=_859.x-_85b.x,t=_859.y-Math.max(_85b.y,0),r=l+_859.w-_85b.w,bot=t+_859.h-_85b.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
if(rtl&&((isIE==8&&!_854)||isIE>=9)){
s=-s;
}
_859.x+=el.scrollLeft;
el.scrollLeft+=s;
_859.x-=el.scrollLeft;
}
if(bot*t>0){
_859.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_859.y-=el.scrollTop;
}
el=(el!=_856)&&!_85c&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
};
require(["dojo/_base/sniff","dojo/on"],function(has,on){
if(has("ie")==8){
var _85f=screen.deviceXDPI;
setInterval(function(){
if(screen.deviceXDPI!=_85f){
_85f=screen.deviceXDPI;
on.emit(_84e.global,"resize");
}
},250);
}
});
return _850;
});
},"dijit/_FocusMixin":function(){
define("dijit/_FocusMixin",["./focus","./_WidgetBase","dojo/_base/declare","dojo/_base/lang"],function(_860,_861,_862,lang){
lang.extend(_861,{focused:false,onFocus:function(){
},onBlur:function(){
},_onFocus:function(){
this.onFocus();
},_onBlur:function(){
this.onBlur();
}});
return _862("dijit._FocusMixin",null,{_focusManager:_860});
});
},"dijit/_WidgetsInTemplateMixin":function(){
define("dijit/_WidgetsInTemplateMixin",["dojo/_base/array","dojo/_base/declare","dojo/parser","dijit/registry"],function(_863,_864,_865,_866){
return _864("dijit._WidgetsInTemplateMixin",null,{_earlyTemplatedStartup:false,widgetsInTemplate:true,_beforeFillContent:function(){
if(this.widgetsInTemplate){
var node=this.domNode;
var cw=(this._startupWidgets=_865.parse(node,{noStart:!this._earlyTemplatedStartup,template:true,inherited:{dir:this.dir,lang:this.lang,textDir:this.textDir},propsThis:this,scope:"dojo"}));
this._supportingWidgets=_866.findWidgets(node);
this._attachTemplateNodes(cw,function(n,p){
return n[p];
});
}
},startup:function(){
_863.forEach(this._startupWidgets,function(w){
if(w&&!w._started&&w.startup){
w.startup();
}
});
this.inherited(arguments);
}});
});
},"url:dojox/layout/resources/ExpandoPane.html":"<div class=\"dojoxExpandoPane\">\n\t<div dojoAttachPoint=\"titleWrapper\" class=\"dojoxExpandoTitle\">\n\t\t<div class=\"dojoxExpandoIcon\" dojoAttachPoint=\"iconNode\" dojoAttachEvent=\"onclick:toggle\"><span class=\"a11yNode\">X</span></div>\t\t\t\n\t\t<span class=\"dojoxExpandoTitleNode\" dojoAttachPoint=\"titleNode\">${title}</span>\n\t</div>\n\t<div class=\"dojoxExpandoWrapper\" dojoAttachPoint=\"cwrapper\" dojoAttachEvent=\"ondblclick:_trap\">\n\t\t<div class=\"dojoxExpandoContent\" dojoAttachPoint=\"containerNode\"></div>\n\t</div>\n</div>\n","url:dijit/templates/MenuBarItem.html":"<div class=\"dijitReset dijitInline dijitMenuItem dijitMenuItemLabel\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<span data-dojo-attach-point=\"containerNode\"></span>\n</div>\n","url:curam/widget/templates/OptimalBrowserMessage.html":"<div>\n  <div class=\"hidden\"\n       data-dojo-type=\"dojox/layout/ContentPane\"\n       data-dojo-attach-point=\"_optimalMessage\">\n  </div>\n</div>\n","idx/oneui/HoverHelpTooltip":function(){
require({cache:{"url:idx/oneui/templates/HoverHelpTooltip.html":"<div class=\"idxOneuiHoverHelpTooltip idxOneuiHoverHelpTooltipLeft\" role=\"dialog\"\r\n\t><div role=\"document\"\r\n\t\t><span data-dojo-attach-point=\"closeButtonNode\" class=\"idxOneuiHoverHelpTooltipCloseIcon\" data-dojo-attach-event=\"ondijitclick: hideOnClickClose\" role=\"button\" tabIndex=\"0\"></span\r\n\t></div\r\n\t><div data-dojo-attach-point=\"outerContainerNode\" class=\"idxOneuiHoverHelpTooltipContainer idxOneuiHoverHelpTooltipContents\"\r\n\t\t><div data-dojo-attach-point=\"containerNode\" role=\"document\" tabindex=0></div\r\n\t\t><a target=\"_blank\" href=\"#updateme\" class=\"idxOneuiHoverHelpTooltipLearnLink\" data-dojo-attach-point=\"learnMoreNode\"><span>${learnMoreLabel}</span></a\r\n\t></div\r\n\t><div class=\"idxOneuiHoverHelpTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\r\n></div>"}});
define("idx/oneui/HoverHelpTooltip",["dojo/_base/declare","dojo/_base/fx","dojo/keys","dojo/_base/array","dojo/dom","dojo/_base/lang","dojo/_base/sniff","dijit/focus","dojo/_base/event","dojo/dom-geometry","dijit/place","dijit/a11y","dijit/BackgroundIframe","dojo/dom-style","dojo/_base/window","dijit/_base/manager","dijit/_Widget","dijit/_TemplatedMixin","dijit/Tooltip","dojo/text!./templates/HoverHelpTooltip.html","dijit/dijit","dojo/i18n","dojo/i18n!./nls/HoverHelpTooltip"],function(_867,fx,keys,_868,dom,lang,has,_869,_86a,_86b,_86c,a11y,_86d,_86e,win,_86f,_870,_871,_872,_873,_874,i18n){
var _875=_867("idx.oneui.HoverHelpTooltip",_872,{showDelay:500,hideDelay:800,showLearnMore:false,learnMoreLinkValue:"#updateme",showCloseIcon:true,forceFocus:true,_onHover:function(e){
if(!_875._showTimer){
var _876=e.target;
_875._showTimer=setTimeout(lang.hitch(this,function(){
this.open(_876);
}),this.showDelay);
}
if(_875._hideTimer){
clearTimeout(_875._hideTimer);
delete _875._hideTimer;
}
},_onUnHover:function(){
if(_875._showTimer){
clearTimeout(_875._showTimer);
delete _875._showTimer;
}
if(!_875._hideTimer){
_875._hideTimer=setTimeout(lang.hitch(this,function(){
this.close();
}),this.hideDelay);
}
},open:function(_877){
if(_875._showTimer){
clearTimeout(_875._showTimer);
delete _875._showTimer;
}
_875.show(this.label||this.domNode.innerHTML,_877,this.position,!this.isLeftToRight(),this.textDir,this.showLearnMore,this.learnMoreLinkValue,this.showCloseIcon,this.forceFocus);
this._connectNode=_877;
this.onShow(_877,this.position);
},close:function(){
if(this._connectNode){
_875.hide(this._connectNode);
delete this._connectNode;
this.onHide();
}
if(_875._showTimer){
clearTimeout(_875._showTimer);
delete _875._showTimer;
}
},_setConnectIdAttr:function(_878){
_868.forEach(this._connections||[],function(_879){
_868.forEach(_879,lang.hitch(this,"disconnect"));
},this);
this._connectIds=_868.filter(lang.isArrayLike(_878)?_878:(_878?[_878]:[]),function(id){
return dom.byId(id);
});
this._connections=_868.map(this._connectIds,function(id){
var node=dom.byId(id);
return [this.connect(node,"onmouseenter","_onHover"),this.connect(node,"onmouseleave","_onUnHover"),this.connect(node,"onclick","_onHover"),this.connect(node,"onkeypress","_onConnectIdKey")];
},this);
this._set("connectId",_878);
},_onConnectIdKey:function(evt){
var node=evt.target;
if(evt.charOrCode==keys.ENTER||evt.charOrCode==keys.SPACE||evt.charOrCode==" "||evt.charOrCode==keys.F1){
_875._showTimer=setTimeout(lang.hitch(this,function(){
this.open(node);
}),this.showDelay);
_86a.stop(evt);
}
}});
var _87a=_867("idx.oneui._MasterHoverHelpTooltip",[_870,_871],{duration:_86f.defaultDuration,templateString:_873,learnMoreLabel:"",draggable:true,_firstFocusItem:null,_lastFocusItem:null,postMixInProperties:function(){
this.learnMoreLabel=i18n.getLocalization("idx.oneui","HoverHelpTooltip",this.lang).learnMoreLabel;
},postCreate:function(){
win.body().appendChild(this.domNode);
this.bgIframe=new _86d(this.domNode);
this.fadeIn=fx.fadeIn({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onShow")});
this.fadeOut=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHide")});
this.connect(this.domNode,"onkeypress","_onKey");
this.connect(this.domNode,"onmouseenter",lang.hitch(this,function(e){
if(_875._hideTimer){
clearTimeout(_875._hideTimer);
delete _875._hideTimer;
}
this.focus();
this._keepShowing=true;
this.fadeOut.stop();
this.fadeIn.play();
}));
this.connect(this.domNode,"onmouseleave",lang.hitch(this,function(e){
this._keepShowing=false;
_875._hideTimer=setTimeout(lang.hitch(this,function(){
this.hide(this.aroundNode);
}),800);
}));
},show:function(_87b,_87c,_87d,rtl,_87e,_87f,_880,_881,_882){
this._lastFocusNode=_869.curNode;
if(_87f){
this.learnMoreNode.style.display="inline";
this.learnMoreNode.href=_880;
}else{
this.learnMoreNode.style.display="none";
}
if(_881||_881==null){
this.closeButtonNode.style.display="inline";
}else{
this.closeButtonNode.style.display="none";
}
this.connectorNode.hidden=false;
if(this.aroundNode&&this.aroundNode===_87c&&this.containerNode.innerHTML==_87b){
return;
}
this.domNode.width="auto";
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_87b;
this.set("textDir",_87e);
this.containerNode.align=rtl?"right":"left";
var pos=_86c.around(this.domNode,_87c,_87d&&_87d.length?_87d:_875.defaultPosition,!rtl,lang.hitch(this,"orient"));
var _883=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_883.y+((_883.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_883.x+((_883.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}
}
_86e.set(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_87c;
if(_882){
this.focus();
}
},orient:function(node,_884,_885,_886,_887){
this.connectorNode.style.top="";
var _888=_886.w-this.connectorNode.offsetWidth;
node.className="idxOneuiHoverHelpTooltip "+{"MR-ML":"idxOneuiHoverHelpTooltipRight","ML-MR":"idxOneuiHoverHelpTooltipLeft","TM-BM":"idxOneuiHoverHelpTooltipAbove","BM-TM":"idxOneuiHoverHelpTooltipBelow","BL-TL":"idxOneuiHoverHelpTooltipBelow idxOneuiHoverHelpTooltipABLeft","TL-BL":"idxOneuiHoverHelpTooltipAbove idxOneuiHoverHelpTooltipABLeft","BR-TR":"idxOneuiHoverHelpTooltipBelow idxOneuiHoverHelpTooltipABRight","TR-BR":"idxOneuiHoverHelpTooltipAbove idxOneuiHoverHelpTooltipABRight","BR-BL":"idxOneuiHoverHelpTooltipRight","BL-BR":"idxOneuiHoverHelpTooltipLeft","TR-TL":"idxOneuiHoverHelpTooltipRight"}[_884+"-"+_885];
this.domNode.style.width="auto";
var size=_86b.getContentBox(this.domNode);
var _889=Math.min((Math.max(_888,1)),size.w);
var _88a=_889<size.w;
this.domNode.style.width=_889+"px";
if(_88a){
this.containerNode.style.overflow="auto";
var _88b=this.containerNode.scrollWidth;
this.containerNode.style.overflow="visible";
if(_88b>_889){
_88b=_88b+_86e.get(this.domNode,"paddingLeft")+_86e.get(this.domNode,"paddingRight");
this.domNode.style.width=_88b+"px";
}
}
if(_885.charAt(0)=="B"&&_884.charAt(0)=="B"){
var mb=_86b.getMarginBox(node);
var _88c=this.connectorNode.offsetHeight;
if(mb.h>_886.h){
var _88d=_886.h-((_887.h+_88c)>>1);
this.connectorNode.style.top=_88d+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_887.h/2-_88c/2,0),mb.h-_88c)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_888);
},focus:function(){
if(this._focus){
return;
}
this._getFocusItems(this.outerContainerNode);
this._focus=true;
_869.focus(this._firstFocusItem);
},_onShow:function(){
if(has("ie")){
this.domNode.style.filter="";
}
},hide:function(_88e){
if(this._keepShowing){
this._keepShowing=false;
return;
}
if(this._onDeck&&this._onDeck[1]==_88e){
this._onDeck=null;
}else{
if(this.aroundNode===_88e||this.isShowingNow){
this._forceHide();
}
}
},hideOnClickClose:function(){
this._forceHide();
},_forceHide:function(){
_869.focus(this._lastFocusNode);
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
if(_86e.get(this.learnMoreNode,"display")=="none"){
var _88f=a11y._getTabNavigable(this.containerNode);
this._lastFocusItem=_88f.last||_88f.highest||this.containerNode;
}else{
this._lastFocusItem=this.learnMoreNode;
}
},_onKey:function(evt){
var node=evt.target;
if(evt.charOrCode===keys.TAB){
this._getFocusItems(this.outerContainerNode);
}
var _890=(this._firstFocusItem==this._lastFocusItem);
if(evt.charOrCode==keys.ESCAPE){
setTimeout(lang.hitch(this,"hideOnClickClose"),0);
_86a.stop(evt);
}else{
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===keys.TAB){
if(!_890){
_869.focus(this._lastFocusItem);
}
_86a.stop(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===keys.TAB&&!evt.shiftKey){
if(!_890){
_869.focus(this._firstFocusItem);
}
_86a.stop(evt);
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
_868.forEach(node.children,function(_891){
this._setAutoTextDir(_891);
},this);
},_setTextDirAttr:function(_892){
this._set("textDir",typeof _892!="undefined"?_892:"");
if(_892=="auto"){
this._setAutoTextDir(this.containerNode);
}else{
this.containerNode.dir=this.textDir;
}
}});
_875._MasterHoverHelpTooltip=_87a;
_875.show=idx.oneui.showHoverHelpTooltip=function(_893,_894,_895,rtl,_896,_897,_898,_899,_89a){
if(!_875._masterTT){
idx.oneui._masterTT=_875._masterTT=new _87a();
}
return _875._masterTT.show(_893,_894,_895,rtl,_896,_897,_898,_899,_89a);
};
_875.hide=idx.oneui.hideHoverHelpTooltip=function(_89b){
return _875._masterTT&&_875._masterTT.hide(_89b);
};
_875.defaultPosition=["after-centered","before-centered","below","above"];
return _875;
});
},"dijit/form/_ButtonMixin":function(){
define("dijit/form/_ButtonMixin",["dojo/_base/declare","dojo/dom","dojo/_base/event","../registry"],function(_89c,dom,_89d,_89e){
return _89c("dijit.form._ButtonMixin",null,{label:"",type:"button",_onClick:function(e){
if(this.disabled){
_89d.stop(e);
return false;
}
var _89f=this.onClick(e)===false;
if(!_89f&&this.type=="submit"&&!(this.valueNode||this.focusNode).form){
for(var node=this.domNode;node.parentNode;node=node.parentNode){
var _8a0=_89e.byNode(node);
if(_8a0&&typeof _8a0._onSubmit=="function"){
_8a0._onSubmit(e);
_89f=true;
break;
}
}
}
if(_89f){
e.preventDefault();
}
return !_89f;
},postCreate:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},onClick:function(){
return true;
},_setLabelAttr:function(_8a1){
this._set("label",_8a1);
(this.containerNode||this.focusNode).innerHTML=_8a1;
}});
});
},"dijit/registry":function(){
define("dijit/registry",["dojo/_base/array","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window","."],function(_8a2,has,_8a3,win,_8a4){
var _8a5={},hash={};
var _8a6={length:0,add:function(_8a7){
if(hash[_8a7.id]){
throw new Error("Tried to register widget with id=="+_8a7.id+" but that id is already registered");
}
hash[_8a7.id]=_8a7;
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
},getUniqueId:function(_8a8){
var id;
do{
id=_8a8+"_"+(_8a8 in _8a5?++_8a5[_8a8]:_8a5[_8a8]=0);
}while(hash[id]);
return _8a4._scopeName=="dijit"?id:_8a4._scopeName+"_"+id;
},findWidgets:function(root){
var _8a9=[];
function _8aa(root){
for(var node=root.firstChild;node;node=node.nextSibling){
if(node.nodeType==1){
var _8ab=node.getAttribute("widgetId");
if(_8ab){
var _8ac=hash[_8ab];
if(_8ac){
_8a9.push(_8ac);
}
}else{
_8aa(node);
}
}
}
};
_8aa(root);
return _8a9;
},_destroyAll:function(){
_8a4._curFocus=null;
_8a4._prevFocus=null;
_8a4._activeStack=[];
_8a2.forEach(_8a6.findWidgets(win.body()),function(_8ad){
if(!_8ad._destroyed){
if(_8ad.destroyRecursive){
_8ad.destroyRecursive();
}else{
if(_8ad.destroy){
_8ad.destroy();
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
_8a4.registry=_8a6;
return _8a6;
});
},"dijit/_base/wai":function(){
define("dijit/_base/wai",["dojo/dom-attr","dojo/_base/lang","..","../hccss"],function(_8ae,lang,_8af){
lang.mixin(_8af,{hasWaiRole:function(elem,role){
var _8b0=this.getWaiRole(elem);
return role?(_8b0.indexOf(role)>-1):(_8b0.length>0);
},getWaiRole:function(elem){
return lang.trim((_8ae.get(elem,"role")||"").replace("wairole:",""));
},setWaiRole:function(elem,role){
_8ae.set(elem,"role",role);
},removeWaiRole:function(elem,role){
var _8b1=_8ae.get(elem,"role");
if(!_8b1){
return;
}
if(role){
var t=lang.trim((" "+_8b1+" ").replace(" "+role+" "," "));
_8ae.set(elem,"role",t);
}else{
elem.removeAttribute("role");
}
},hasWaiState:function(elem,_8b2){
return elem.hasAttribute?elem.hasAttribute("aria-"+_8b2):!!elem.getAttribute("aria-"+_8b2);
},getWaiState:function(elem,_8b3){
return elem.getAttribute("aria-"+_8b3)||"";
},setWaiState:function(elem,_8b4,_8b5){
elem.setAttribute("aria-"+_8b4,_8b5);
},removeWaiState:function(elem,_8b6){
elem.removeAttribute("aria-"+_8b6);
}});
return _8af;
});
},"curam/widget/componentWrappers/ListWraper":function(){
define("curam/widget/componentWrappers/ListWraper",["dojo/_base/declare","dojo/on","dijit/_Widget","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/dom-class","dojo/dom-attr"],function(_8b7,on,_8b8,_8b9,_8ba,_8bb,_8bc,_8bd){
return _8b7("curam.widget.componentWrappers.ListWraper",[_8b8],{baseClass:"navMenu",_listTypeUnordered:"ul",_listTypeOrdered:"ol",listType:this._listTypeOrdered,baseClass:"listWrapper",itemClass:null,itemStyle:null,role:null,buildRendering:function(){
if(this.listType==this._listTypeUnordered){
this.domNode=_8b9.create("ul");
}else{
this.domNode=_8b9.create("ol");
}
if(this.role!=null){
_8bd.set(this.domNode,"role",this.role);
}
this.inherited(arguments);
},_setItemAttr:function(item,_8be){
if(_8be==null){
_8be="last";
}
var _8bf=_8b9.create("li",null,this.domNode,_8be);
this._doBeforeItemSet(item,_8bf);
_8b9.place(item.domNode?item.domNode:item,_8bf);
this._doAfterItemSet(item,_8bf);
if(this.itemStyle){
_8bb.set(_8bf,this.itemStyle);
}
if(this.itemClass){
_8bc.add(_8bf,this.itemClass);
}
},_doBeforeItemSet:function(item,_8c0){
},_doAfterItemSet:function(item,_8c1){
},_getItemCountAttr:function(){
return this.domNode.children.length;
},_getContainerHeightAttr:function(){
var _8c2=_8ba.getContentBox(this.domNode);
return _8c2.h;
},getChildElament:function(_8c3){
var _8c4=this.domNode.childNodes[_8c3];
return _8c4;
},placeItemToPostion:function(item,_8c5){
var _8c6=this.domNode.childNodes[_8c5];
_8b9.place(_8c6,item);
},deleteChild:function(_8c7){
var _8c8=this.getChildElament(_8c7);
_8b9.destroy(_8c8);
},deleteAllChildern:function(){
while(this.domNode.children.length>0){
this.deleteChild(0);
}
}});
});
},"curam/util/ResourceBundle":function(){
define("curam/util/ResourceBundle",["dojo/i18n","dojo/string"],function(i18n,_8c9){
var _8ca=dojo.declare("curam.util.ResourceBundle",null,{_bundle:undefined,constructor:function(_8cb,_8cc){
var _8cd=_8cb.split(".");
var _8ce=_8cd[_8cd.length-1];
var _8cf=_8cd.length==1?"curam.application":_8cb.slice(0,_8cb.length-_8ce.length-1);
try{
var b=i18n.getLocalization(_8cf,_8ce,_8cc);
if(this._isEmpty(b)){
throw new Error("Empty resource bundle.");
}else{
this._bundle=b;
}
}
catch(e){
throw new Error("Unable to access resource bundle: "+_8cf+"."+_8ce+": "+e.message);
}
},_isEmpty:function(_8d0){
for(var prop in _8d0){
return false;
}
return true;
},getProperty:function(key,_8d1){
var msg=this._bundle[key];
var _8d2=msg;
if(_8d1){
_8d2=_8c9.substitute(msg,_8d1);
}
return _8d2;
}});
return _8ca;
});
},"dojox/layout/ExpandoPane":function(){
require({cache:{"url:dojox/layout/resources/ExpandoPane.html":"<div class=\"dojoxExpandoPane\">\n\t<div dojoAttachPoint=\"titleWrapper\" class=\"dojoxExpandoTitle\">\n\t\t<div class=\"dojoxExpandoIcon\" dojoAttachPoint=\"iconNode\" dojoAttachEvent=\"onclick:toggle\"><span class=\"a11yNode\">X</span></div>\t\t\t\n\t\t<span class=\"dojoxExpandoTitleNode\" dojoAttachPoint=\"titleNode\">${title}</span>\n\t</div>\n\t<div class=\"dojoxExpandoWrapper\" dojoAttachPoint=\"cwrapper\" dojoAttachEvent=\"ondblclick:_trap\">\n\t\t<div class=\"dojoxExpandoContent\" dojoAttachPoint=\"containerNode\"></div>\n\t</div>\n</div>\n"}});
define("dojox/layout/ExpandoPane",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/declare","dojo/_base/array","dojo/_base/connect","dojo/_base/event","dojo/_base/fx","dojo/dom-style","dojo/dom-class","dojo/dom-geometry","dojo/text!./resources/ExpandoPane.html","dijit/layout/ContentPane","dijit/_TemplatedMixin","dijit/_Contained","dijit/_Container"],function(_8d3,lang,_8d4,_8d5,_8d6,_8d7,_8d8,_8d9,_8da,_8db,_8dc,_8dd,_8de,_8df,_8e0){
_8d3.experimental("dojox.layout.ExpandoPane");
return _8d4("dojox.layout.ExpandoPane",[_8dd,_8de,_8df,_8e0],{attributeMap:lang.delegate(_8dd.prototype.attributeMap,{title:{node:"titleNode",type:"innerHTML"}}),templateString:_8dc,easeOut:"dojo._DefaultEasing",easeIn:"dojo._DefaultEasing",duration:420,startExpanded:true,previewOpacity:0.75,previewOnDblClick:false,baseClass:"dijitExpandoPane",postCreate:function(){
this.inherited(arguments);
this._animConnects=[];
this._isHorizontal=true;
if(lang.isString(this.easeOut)){
this.easeOut=lang.getObject(this.easeOut);
}
if(lang.isString(this.easeIn)){
this.easeIn=lang.getObject(this.easeIn);
}
var _8e1="",rtl=!this.isLeftToRight();
if(this.region){
switch(this.region){
case "trailing":
case "right":
_8e1=rtl?"Left":"Right";
break;
case "leading":
case "left":
_8e1=rtl?"Right":"Left";
break;
case "top":
_8e1="Top";
break;
case "bottom":
_8e1="Bottom";
break;
}
_8da.add(this.domNode,"dojoxExpando"+_8e1);
_8da.add(this.iconNode,"dojoxExpandoIcon"+_8e1);
this._isHorizontal=/top|bottom/.test(this.region);
}
_8d9.set(this.domNode,{overflow:"hidden",padding:0});
this.connect(this.domNode,"ondblclick",this.previewOnDblClick?"preview":"toggle");
if(this.previewOnDblClick){
this.connect(this.getParent(),"_layoutChildren",lang.hitch(this,function(){
this._isonlypreview=false;
}));
}
},_startupSizes:function(){
this._container=this.getParent();
this._closedSize=this._titleHeight=_8db.getMarginBox(this.titleWrapper).h;
if(this.splitter){
var myid=this.id;
_8d5.forEach(dijit.registry.toArray(),function(w){
if(w&&w.child&&w.child.id==myid){
this.connect(w,"_stopDrag","_afterResize");
}
},this);
}
this._currentSize=_8db.getContentBox(this.domNode);
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
this._currentSize=_8db.getMarginBox(this.domNode);
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
_8d5.forEach(this._animConnects,_8d6.disconnect);
var _8e2={node:this.domNode,duration:this.duration},_8e3=this._isHorizontal,_8e4={},_8e5={},_8e6=_8e3?"height":"width";
_8e4[_8e6]={end:this._showSize};
_8e5[_8e6]={end:this._closedSize};
this._showAnim=_8d8.animateProperty(lang.mixin(_8e2,{easing:this.easeIn,properties:_8e4}));
this._hideAnim=_8d8.animateProperty(lang.mixin(_8e2,{easing:this.easeOut,properties:_8e5}));
this._animConnects=[_8d6.connect(this._showAnim,"onEnd",this,"_showEnd"),_8d6.connect(this._hideAnim,"onEnd",this,"_hideEnd")];
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
_8da.add(this.domNode,"dojoxExpandoClosed");
_8d9.set(this.cwrapper,{visibility:"hidden",opacity:"0",overflow:"hidden"});
},_showEnd:function(){
_8d9.set(this.cwrapper,{opacity:0,visibility:"visible"});
_8d8.anim(this.cwrapper,{opacity:this._isonlypreview?this.previewOpacity:1},227);
_8da.remove(this.domNode,"dojoxExpandoClosed");
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
},resize:function(_8e7){
if(!this._hasSizes){
this._startupSizes(_8e7);
}
var _8e8=_8db.getMarginBox(this.domNode);
this._contentBox={w:_8e7&&"w" in _8e7?_8e7.w:_8e8.w,h:(_8e7&&"h" in _8e7?_8e7.h:_8e8.h)-this._titleHeight};
_8d9.set(this.containerNode,"height",this._contentBox.h+"px");
if(_8e7){
_8db.setMarginBox(this.domNode,_8e7);
}
this._layoutChildren();
},_trap:function(e){
_8d7.stop(e);
}});
});
},"curam/util/UIMFragment":function(){
define("curam/util/UIMFragment",["curam/util/Request","curam/define","curam/debug","curam/util/ScreenContext"],function(_8e9){
curam.define.singleton("curam.util.UIMFragment",{get:function(args){
var _8ea=args&&args.pageID;
var url=args&&args.url;
var _8eb=args&&args.params;
var _8ec=args&&args.onLoad;
var _8ed=args&&args.onDownloadError;
var _8ee=args&&args.targetID;
if(_8ee===""||typeof _8ee==="undefined"){
throw "UIMFragment: targetID must be set.";
}
var _8ef=null;
if(url){
_8ef=url;
}else{
_8ef=curam.util.UIMFragment._constructPath(_8ea)+curam.util.UIMFragment._addCDEJParameters()+curam.util.UIMFragment._encodeParameters(_8eb);
}
curam.debug.log("UIMFragment: GET to "+_8ef);
curam.util.UIMFragment._doService(_8ef,_8ee,args,_8ec,_8ed);
},submitForm:function(_8f0){
var _8f0=dojo.fixEvent(_8f0);
var _8f1=_8f0.target;
dojo.stopEvent(_8f0);
var _8f2={url:curam.util.UIMFragment._constructFormActionPath(_8f1),form:_8f1,load:function(data){
var cp=dijit.getEnclosingWidget(_8f1);
cp.set("content",data);
},error:function(_8f3){
alert("form error: error!!");
}};
_8e9.post(_8f2);
console.log(_8f0+" "+_8f1);
},_constructFormActionPath:function(_8f4){
var _8f5="";
if(window===window.top){
_8f5=curam.config.locale+"/";
}
return _8f5+_8f4.getAttribute("action");
},_initForm:function(_8f6){
var _8f7=dojo.query("form",dijit.byId(_8f6).domNode)[0];
if(_8f7){
dojo.connect(_8f7,"onsubmit",curam.util.UIMFragment.submitForm);
}
},_constructPath:function(_8f8){
var _8f9=window;
var _8fa=window.top;
return curam.util.UIMFragment._constructPathValue(_8f8,_8f9,_8fa);
},_constructPathValue:function(_8fb,_8fc,_8fd){
if(_8fb===""||typeof _8fb==="undefined"){
throw "UIMFragment: pageID must be set.";
}
var _8fe="";
if(_8fc.location.pathname===_8fd.location.pathname){
var _8ff=_8fd.curam&&_8fd.curam.config&&_8fd.curam.config.locale;
_8fe=(_8ff||"en")+"/";
}
return _8fe+_8fb+"Page.do";
},_encodeParameters:function(_900){
if(typeof _900==="undefined"||dojo.toJson(_900)==="{}"){
curam.debug.log("UIMFragment: No params included in request.");
return "";
}
var _901=[];
for(var _902 in _900){
_901.push(_902+"="+encodeURIComponent(_900[_902]));
}
return "&"+_901.join("&");
},_addCDEJParameters:function(){
return "?"+jsScreenContext.toRequestString();
},_doService:function(url,_903,args,_904,_905){
var cp=dijit.byId(_903);
cp.onLoad=dojo.hitch(cp,curam.util.UIMFragment._handleLoadSuccess,args,_904);
cp.preventCache=true;
cp.set("href",url);
},_handleDownloadError:function(_906){
curam.debug.log("Error invoking the UIMFragment: "+_906);
return "UIMFragment: Generic Error Handler";
},_handleLoadSuccess:function(_907,_908){
curam.util.UIMFragment._initForm(_907.targetID);
if(_908){
_908(this);
}
curam.debug.log("");
return "UIMFragment: Generic Success Handler";
}});
return curam.util.UIMFragment;
});
},"dijit/form/_FormWidget":function(){
define("dijit/form/_FormWidget",["dojo/_base/declare","dojo/_base/kernel","dojo/ready","../_Widget","../_CssStateMixin","../_TemplatedMixin","./_FormWidgetMixin"],function(_909,_90a,_90b,_90c,_90d,_90e,_90f){
if(!_90a.isAsync){
_90b(0,function(){
var _910=["dijit/form/_FormValueWidget"];
require(_910);
});
}
return _909("dijit.form._FormWidget",[_90c,_90e,_90d,_90f],{setDisabled:function(_911){
_90a.deprecated("setDisabled("+_911+") is deprecated. Use set('disabled',"+_911+") instead.","","2.0");
this.set("disabled",_911);
},setValue:function(_912){
_90a.deprecated("dijit.form._FormWidget:setValue("+_912+") is deprecated.  Use set('value',"+_912+") instead.","","2.0");
this.set("value",_912);
},getValue:function(){
_90a.deprecated(this.declaredClass+"::getValue() is deprecated. Use get('value') instead.","","2.0");
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
define("dijit/CheckedMenuItem",["dojo/_base/declare","dojo/dom-class","./MenuItem","dojo/text!./templates/CheckedMenuItem.html","./hccss"],function(_913,_914,_915,_916){
return _913("dijit.CheckedMenuItem",_915,{templateString:_916,checked:false,_setCheckedAttr:function(_917){
_914.toggle(this.domNode,"dijitCheckedMenuItemChecked",_917);
this.domNode.setAttribute("aria-checked",_917);
this._set("checked",_917);
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
var _918=dojo.declare("curam.util.ui.AppExitConditionHandler",null,{_handler:null,constructor:function(_919){
if(typeof _919!="function"){
throw new Error("Illegal argument: "+_919);
}
this._handler=_919;
},isConfirmationAllowed:function(){
return this._handler()?true:false;
}});
return _918;
});
},"curam/widget/form/ToggleButtonGroup":function(){
define("curam/widget/form/ToggleButtonGroup",["dojo/_base/declare","dojo/_base/connect","dijit/form/ToggleButton"],function(_91a,_91b,_91c){
return _91a("curam.widget.form.ToggleButtonGroup",[_91c],{_connectHandler:null,_unselectChannel:null,groupName:"toggleButtonGroup",postMixInProperties:function(){
this.inherited(arguments);
this._unselectChannel="/toggleButtonGroup%$��!|WE/"+this.groupName;
this._connectHandler=_91b.subscribe(this._unselectChannel,this,"_unselect");
},_unselect:function(_91d){
if(_91d!==this&&this.checked){
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
},_setCheckedAttr:function(_91e,_91f){
dojo.publish(this._unselectChannel,[this]);
this.inherited(arguments);
},destroy:function(){
try{
_91b.disconnect(this._connectHandler);
}
catch(err){
console.error(err);
}
this.inherited(arguments);
}});
});
},"dojo/io/iframe":function(){
define("dojo/io/iframe",["../main","require"],function(dojo,_920){
dojo.getObject("io",true,dojo);
dojo.io.iframe={create:function(_921,_922,uri){
if(window[_921]){
return window[_921];
}
if(window.frames[_921]){
return window.frames[_921];
}
var turi=uri;
if(!turi){
if(dojo.config["useXDomain"]&&!dojo.config["dojoBlankHtmlUrl"]){
console.warn("dojo.io.iframe.create: When using cross-domain Dojo builds,"+" please save dojo/resources/blank.html to your domain and set djConfig.dojoBlankHtmlUrl"+" to the path on your domain to blank.html");
}
turi=(dojo.config["dojoBlankHtmlUrl"]||_920.toUrl("../resources/blank.html"));
}
var _923=dojo.place("<iframe id=\""+_921+"\" name=\""+_921+"\" src=\""+turi+"\" onload=\""+_922+"\" style=\"position: absolute; left: 1px; top: 1px; height: 1px; width: 1px; visibility: hidden\">",dojo.body());
window[_921]=_923;
return _923;
},setSrc:function(_924,src,_925){
try{
if(!_925){
if(dojo.isWebKit){
_924.location=src;
}else{
frames[_924.name].location=src;
}
}else{
var idoc;
if(dojo.isIE||dojo.isWebKit){
idoc=_924.contentWindow.document;
}else{
idoc=_924.contentWindow;
}
if(!idoc){
_924.location=src;
}else{
idoc.location.replace(src);
}
}
}
catch(e){
console.log("dojo.io.iframe.setSrc: ",e);
}
},doc:function(_926){
return _926.contentDocument||(((_926.name)&&(_926.document)&&(dojo.doc.getElementsByTagName("iframe")[_926.name].contentWindow)&&(dojo.doc.getElementsByTagName("iframe")[_926.name].contentWindow.document)))||((_926.name)&&(dojo.doc.frames[_926.name])&&(dojo.doc.frames[_926.name].document))||null;
},send:function(args){
if(!this["_frame"]){
this._frame=this.create(this._iframeName,dojo._scopeName+".io.iframe._iframeOnload();");
}
var dfd=dojo._ioSetArgs(args,function(dfd){
dfd.canceled=true;
dfd.ioArgs._callNext();
},function(dfd){
var _927=null;
try{
var _928=dfd.ioArgs;
var dii=dojo.io.iframe;
var ifd=dii.doc(dii._frame);
var _929=_928.handleAs;
_927=ifd;
if(_929!="html"){
if(_929=="xml"){
if(dojo.isIE<9||(dojo.isIE&&dojo.isQuirks)){
dojo.query("a",dii._frame.contentWindow.document.documentElement).orphan();
var _92a=(dii._frame.contentWindow.document).documentElement.innerText;
_92a=_92a.replace(/>\s+</g,"><");
_92a=dojo.trim(_92a);
var _92b={responseText:_92a};
_927=dojo._contentHandlers["xml"](_92b);
}
}else{
_927=ifd.getElementsByTagName("textarea")[0].value;
if(_929=="json"){
_927=dojo.fromJson(_927);
}else{
if(_929=="javascript"){
_927=dojo.eval(_927);
}
}
}
}
}
catch(e){
_927=e;
}
finally{
_928._callNext();
}
return _927;
},function(_92c,dfd){
dfd.ioArgs._hasError=true;
dfd.ioArgs._callNext();
return _92c;
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
var _92d=dfd.ioArgs;
var args=_92d.args;
_92d._contentToClean=[];
var fn=dojo.byId(args["form"]);
var _92e=args["content"]||{};
if(fn){
if(_92e){
var _92f=function(name,_930){
dojo.create("input",{type:"hidden",name:name,value:_930},fn);
_92d._contentToClean.push(name);
};
for(var x in _92e){
var val=_92e[x];
if(dojo.isArray(val)&&val.length>1){
var i;
for(i=0;i<val.length;i++){
_92f(x,val[i]);
}
}else{
if(!fn[x]){
_92f(x,val);
}else{
fn[x].value=val;
}
}
}
}
var _931=fn.getAttributeNode("action");
var _932=fn.getAttributeNode("method");
var _933=fn.getAttributeNode("target");
if(args["url"]){
_92d._originalAction=_931?_931.value:null;
if(_931){
_931.value=args.url;
}else{
fn.setAttribute("action",args.url);
}
}
if(!_932||!_932.value){
if(_932){
_932.value=(args["method"])?args["method"]:"post";
}else{
fn.setAttribute("method",(args["method"])?args["method"]:"post");
}
}
_92d._originalTarget=_933?_933.value:null;
if(_933){
_933.value=this._iframeName;
}else{
fn.setAttribute("target",this._iframeName);
}
fn.target=this._iframeName;
dojo._ioNotifyStart(dfd);
fn.submit();
}else{
var _934=args.url+(args.url.indexOf("?")>-1?"&":"?")+_92d.query;
dojo._ioNotifyStart(dfd);
this.setSrc(this._frame,_934,true);
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
var _935=dfd.ioArgs;
var args=_935.args;
var _936=dojo.byId(args.form);
if(_936){
var _937=_935._contentToClean;
for(var i=0;i<_937.length;i++){
var key=_937[i];
for(var j=0;j<_936.childNodes.length;j++){
var _938=_936.childNodes[j];
if(_938.name==key){
dojo.destroy(_938);
break;
}
}
}
if(_935["_originalAction"]){
_936.setAttribute("action",_935._originalAction);
}
if(_935["_originalTarget"]){
_936.setAttribute("target",_935._originalTarget);
_936.target=_935._originalTarget;
}
}
_935._finished=true;
}};
return dojo.io.iframe;
});
},"dijit/_base/place":function(){
define("dijit/_base/place",["dojo/_base/array","dojo/_base/lang","dojo/window","../place",".."],function(_939,lang,_93a,_93b,_93c){
_93c.getViewport=function(){
return _93a.getBox();
};
_93c.placeOnScreen=_93b.at;
_93c.placeOnScreenAroundElement=function(node,_93d,_93e,_93f){
var _940;
if(lang.isArray(_93e)){
_940=_93e;
}else{
_940=[];
for(var key in _93e){
_940.push({aroundCorner:key,corner:_93e[key]});
}
}
return _93b.around(node,_93d,_940,true,_93f);
};
_93c.placeOnScreenAroundNode=_93c.placeOnScreenAroundElement;
_93c.placeOnScreenAroundRectangle=_93c.placeOnScreenAroundElement;
_93c.getPopupAroundAlignment=function(_941,_942){
var _943={};
_939.forEach(_941,function(pos){
var ltr=_942;
switch(pos){
case "after":
_943[_942?"BR":"BL"]=_942?"BL":"BR";
break;
case "before":
_943[_942?"BL":"BR"]=_942?"BR":"BL";
break;
case "below-alt":
ltr=!ltr;
case "below":
_943[ltr?"BL":"BR"]=ltr?"TL":"TR";
_943[ltr?"BR":"BL"]=ltr?"TR":"TL";
break;
case "above-alt":
ltr=!ltr;
case "above":
default:
_943[ltr?"TL":"TR"]=ltr?"BL":"BR";
_943[ltr?"TR":"TL"]=ltr?"BR":"BL";
break;
}
});
return _943;
};
return _93c;
});
},"dijit/MenuSeparator":function(){
require({cache:{"url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>"}});
define("dijit/MenuSeparator",["dojo/_base/declare","dojo/dom","./_WidgetBase","./_TemplatedMixin","./_Contained","dojo/text!./templates/MenuSeparator.html"],function(_944,dom,_945,_946,_947,_948){
return _944("dijit.MenuSeparator",[_945,_946,_947],{templateString:_948,buildRendering:function(){
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
dojo.mixin(cm,{nextSibling:function(node,_949){
return cm._findSibling(node,_949,true);
},prevSibling:function(node,_94a){
return cm._findSibling(node,_94a,false);
},getInput:function(name,_94b){
if(!dojo.isString(name)){
return name;
}
var _94c=dojo.query("input[name='"+name+"'],select[name='"+name+"']");
return _94b?(_94c.length>0?_94c:null):(_94c.length>0?_94c[0]:null);
},getParentByClass:function(node,_94d){
node=node.parentNode;
while(node){
if(dojo.hasClass(node,_94d)){
return node;
}
node=node.parentNode;
}
return null;
},getParentByType:function(node,type){
node=node.parentNode;
type=type.toLowerCase();
var _94e="html";
while(node){
if(node.tagName.toLowerCase()==_94e){
break;
}
if(node.tagName.toLowerCase()==type){
return node;
}
node=node.parentNode;
}
return null;
},replaceClass:function(node,_94f,_950){
dojo.removeClass(node,_950);
dojo.addClass(node,_94f);
},setClass:function(node,_951){
node=dojo.byId(node);
var cs=new String(_951);
try{
if(typeof node.className=="string"){
node.className=cs;
}else{
if(node.setAttribute){
node.setAttribute("class",_951);
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
},_findSibling:function(node,_952,_953){
if(!node){
return null;
}
if(_952){
_952=_952.toLowerCase();
}
var _954=_953?"nextSibling":"previousSibling";
do{
node=node[_954];
}while(node&&node.nodeType!=1);
if(node&&_952&&_952!=node.tagName.toLowerCase()){
return cm[_953?"nextSibling":"prevSibling"](node,_952);
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
},endsWith:function(str,end,_955){
if(_955){
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
define("dijit/_base/focus",["dojo/_base/array","dojo/dom","dojo/_base/lang","dojo/topic","dojo/_base/window","../focus",".."],function(_956,dom,lang,_957,win,_958,_959){
lang.mixin(_959,{_curFocus:null,_prevFocus:null,isCollapsed:function(){
return _959.getBookmark().isCollapsed;
},getBookmark:function(){
var bm,rg,tg,sel=win.doc.selection,cf=_958.curNode;
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
},moveToBookmark:function(_95a){
var _95b=win.doc,mark=_95a.mark;
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
if(_95b.selection&&mark){
var rg;
if(mark.pRange){
rg=mark.range;
}else{
if(lang.isArray(mark)){
rg=_95b.body.createControlRange();
_956.forEach(mark,function(n){
rg.addElement(n);
});
}else{
rg=_95b.body.createTextRange();
rg.moveToBookmark(mark);
}
}
rg.select();
}
}
}
},getFocus:function(menu,_95c){
var node=!_958.curNode||(menu&&dom.isDescendant(_958.curNode,menu.domNode))?_959._prevFocus:_958.curNode;
return {node:node,bookmark:node&&(node==_958.curNode)&&win.withGlobal(_95c||win.global,_959.getBookmark),openedForWindow:_95c};
},_activeStack:[],registerIframe:function(_95d){
return _958.registerIframe(_95d);
},unregisterIframe:function(_95e){
_95e&&_95e.remove();
},registerWin:function(_95f,_960){
return _958.registerWin(_95f,_960);
},unregisterWin:function(_961){
_961&&_961.remove();
}});
_958.focus=function(_962){
if(!_962){
return;
}
var node="node" in _962?_962.node:_962,_963=_962.bookmark,_964=_962.openedForWindow,_965=_963?_963.isCollapsed:false;
if(node){
var _966=(node.tagName.toLowerCase()=="iframe")?node.contentWindow:node;
if(_966&&_966.focus){
try{
_966.focus();
}
catch(e){
}
}
_958._onFocusNode(node);
}
if(_963&&win.withGlobal(_964||win.global,_959.isCollapsed)&&!_965){
if(_964){
_964.focus();
}
try{
win.withGlobal(_964||win.global,_959.moveToBookmark,null,[_963]);
}
catch(e2){
}
}
};
_958.watch("curNode",function(name,_967,_968){
_959._curFocus=_968;
_959._prevFocus=_967;
if(_968){
_957.publish("focusNode",_968);
}
});
_958.watch("activeStack",function(name,_969,_96a){
_959._activeStack=_96a;
});
_958.on("widget-blur",function(_96b,by){
_957.publish("widgetBlur",_96b,by);
});
_958.on("widget-focus",function(_96c,by){
_957.publish("widgetFocus",_96c,by);
});
return _959;
});
},"curam/util/ScreenContext":function(){
define("curam/util/ScreenContext",[],function(){
var _96d={DEFAULT_CONTEXT:112,SAMPLE22:2,SAMPLE21:1,SAMPLE13:4,SAMPLE12:2,SAMPLE11:1,EXTAPP:1048576,CONTEXT_PORTLET:524288,SMART_PANEL:262144,NESTED_UIM:131072,ORG_TREE:65536,CONTEXT_PANEL:32768,LIST_ROW_INLINE_PAGE:8192,LIST_EVEN_ROW:16384,TAB:4096,TREE:2048,AGENDA:1024,POPUP:512,MODAL:256,HOME:128,HEADER:64,NAVIGATOR:32,FOOTER:16,OVAL:8,RESOLVE:4,ACTION:2,ERROR:1,EMPTY:0};
var _96e=[["ERROR","ACTION","RESOLVE","OPT_VALIDATION","FOOTER","NAVIGATOR","HEADER","HOME_PAGE","MODAL","POPUP","AGENDA","TREE","TAB","LIST_EVEN_ROW","LIST_ROW_INLINE_PAGE","CONTEXT_PANEL","ORG_TREE","NESTED_UIM","SMART_PANEL","CONTEXT_PORTLET","EXTAPP"],["SAMPLE11","SAMPLE12","SAMPLE13"],["SAMPLE21","SAMPLE22"]];
var _96f=dojo.declare("curam.util.ScreenContext",null,{constructor:function(_970){
if(_970){
this.setContext(_970);
}else{
this.currentContext=[_96d["DEFAULT_CONTEXT"]|_96d["DEFAULT_CONTEXT"]];
}
},setContext:function(_971){
var tmp=this.setup(_971);
this.currentContext=((tmp==null)?([_96d["DEFAULT_CONTEXT"]|_96d["DEFAULT_CONTEXT"]]):(tmp));
},addContextBits:function(_972,idx){
if(!_972){
return;
}
var _973=(idx)?idx:0;
var _974=this.parseContext(_972);
if(_974!=null){
this.currentContext[_973]|=_974;
}
return this.currentContext[_973];
},addAll:function(idx){
var _975=(idx)?idx:0;
this.currentContext[_975]=4294967295;
return this.currentContext[_975];
},clear:function(_976,idx){
if(!_976){
this.clearAll();
return;
}
var _977=(idx)?idx:0;
if(_976==0){
return this.currentContext[_977];
}
var _978=this.parseContext(_976);
if(_978!=null){
var _979=this.currentContext[_977]&_978;
this.currentContext[_977]^=_979;
}
return this.currentContext[_977];
},clearAll:function(idx){
if(idx){
this.currentContext[idx]=0;
}else{
for(var i=0;i<this.currentContext.length;i++){
this.currentContext[i]=0;
}
}
},updateStates:function(_97a){
this.clear("ERROR|ACTION|RESOLVE");
this.currentContext[0]=this.currentContext[0]|(_97a&7);
},hasContextBits:function(_97b,idx){
if(!_97b){
return false;
}
var _97c=(idx)?idx:0;
var _97d=this.parseContext(_97b);
if(_97d!=null){
var _97e=this.currentContext[_97c]&_97d;
return (_97e==_97d);
}
return false;
},getValue:function(){
var _97f="";
for(var i=0;i<this.currentContext.length;i++){
_97f+=this.currentContext[i]+"|";
}
return _97f.substring(0,_97f.length-1);
},toRequestString:function(){
return "o3ctx="+this.getValue();
},toBinary:function(){
var _980="";
for(var i=0;i<this.currentContext.length;i++){
_980+=this.currentContext[i].toString(2)+"|";
}
return _980.substring(0,_980.length-1);
},toString:function(){
var _981="";
for(var i=0;i<this.currentContext.length;i++){
var _982="";
var j=0;
while(j<_96e[i].length){
if(((this.currentContext[i]>>j)&1)!=0){
_982+=","+_96e[i][j];
}
j++;
}
if(_982==""){
return "{}";
}
_981+="|"+_982.replace(",","{")+((_982.length==0)?"":"}");
}
return _981.substring(1);
},parseContext:function(_983){
var _984=_983.replace(/,/g,"|");
var _985=_984.split("|");
var tmp=isNaN(_985[0])?parseInt(_96d[_985[0]]):_985[0];
for(var i=1;i<_985.length;i++){
tmp=tmp|(isNaN(_985[i])?parseInt(_96d[_985[i]]):_985[i]);
}
return (isNaN(tmp)?null:tmp);
},setup:function(_986){
if(!_986){
return null;
}
var _987=(""+_986).split("|");
var _988=new Array(_987.length);
for(var i=0;i<_987.length;i++){
_988[i]=this.parseContext(_987[_987.length-i-1]);
_988[i]=_988[i]|_988[i];
if(!_988[i]||isNaN(_988[i])||_988[i]>4294967295){
return null;
}
}
return _988;
}});
return _96f;
});
},"dijit/a11y":function(){
define("dijit/a11y",["dojo/_base/array","dojo/_base/config","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-style","dojo/_base/sniff","./_base/manager","."],function(_989,_98a,_98b,dom,_98c,_98d,has,_98e,_98f){
var _990=(_98f._isElementShown=function(elem){
var s=_98d.get(elem);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(_98c.get(elem,"type")!="hidden");
});
_98f.hasDefaultTabStop=function(elem){
switch(elem.nodeName.toLowerCase()){
case "a":
return _98c.has(elem,"href");
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
var _991=elem.contentDocument;
if("designMode" in _991&&_991.designMode=="on"){
return true;
}
body=_991.body;
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
var _992=(_98f.isTabNavigable=function(elem){
if(_98c.get(elem,"disabled")){
return false;
}else{
if(_98c.has(elem,"tabIndex")){
return _98c.get(elem,"tabIndex")>=0;
}else{
return _98f.hasDefaultTabStop(elem);
}
}
});
_98f._getTabNavigable=function(root){
var _993,last,_994,_995,_996,_997,_998={};
function _999(node){
return node&&node.tagName.toLowerCase()=="input"&&node.type&&node.type.toLowerCase()=="radio"&&node.name&&node.name.toLowerCase();
};
var _99a=function(_99b){
for(var _99c=_99b.firstChild;_99c;_99c=_99c.nextSibling){
if(_99c.nodeType!=1||(has("ie")<=9&&_99c.scopeName!=="HTML")||!_990(_99c)){
continue;
}
if(_992(_99c)){
var _99d=_98c.get(_99c,"tabIndex");
if(!_98c.has(_99c,"tabIndex")||_99d==0){
if(!_993){
_993=_99c;
}
last=_99c;
}else{
if(_99d>0){
if(!_994||_99d<_995){
_995=_99d;
_994=_99c;
}
if(!_996||_99d>=_997){
_997=_99d;
_996=_99c;
}
}
}
var rn=_999(_99c);
if(_98c.get(_99c,"checked")&&rn){
_998[rn]=_99c;
}
}
if(_99c.nodeName.toUpperCase()!="SELECT"){
_99a(_99c);
}
}
};
if(_990(root)){
_99a(root);
}
function rs(node){
return _998[_999(node)]||node;
};
return {first:rs(_993),last:rs(last),lowest:rs(_994),highest:rs(_996)};
};
_98f.getFirstInTabbingOrder=function(root){
var _99e=_98f._getTabNavigable(dom.byId(root));
return _99e.lowest?_99e.lowest:_99e.first;
};
_98f.getLastInTabbingOrder=function(root){
var _99f=_98f._getTabNavigable(dom.byId(root));
return _99f.last?_99f.last:_99f.highest;
};
return {hasDefaultTabStop:_98f.hasDefaultTabStop,isTabNavigable:_98f.isTabNavigable,_getTabNavigable:_98f._getTabNavigable,getFirstInTabbingOrder:_98f.getFirstInTabbingOrder,getLastInTabbingOrder:_98f.getLastInTabbingOrder};
});
},"dijit/form/_ToggleButtonMixin":function(){
define("dijit/form/_ToggleButtonMixin",["dojo/_base/declare","dojo/dom-attr"],function(_9a0,_9a1){
return _9a0("dijit.form._ToggleButtonMixin",null,{checked:false,_aria_attr:"aria-pressed",_onClick:function(evt){
var _9a2=this.checked;
this._set("checked",!_9a2);
var ret=this.inherited(arguments);
this.set("checked",ret?this.checked:_9a2);
return ret;
},_setCheckedAttr:function(_9a3,_9a4){
this._set("checked",_9a3);
_9a1.set(this.focusNode||this.domNode,"checked",_9a3);
(this.focusNode||this.domNode).setAttribute(this._aria_attr,_9a3?"true":"false");
this._handleOnChange(_9a3,_9a4);
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
}});
});
},"dijit/_Widget":function(){
define("dijit/_Widget",["dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/ready","./registry","./_WidgetBase","./_OnDijitClickMixin","./_FocusMixin","dojo/uacss","./hccss"],function(_9a5,_9a6,_9a7,_9a8,_9a9,lang,_9aa,_9ab,_9ac,_9ad,_9ae,_9af){
function _9b0(){
};
function _9b1(_9b2){
return function(obj,_9b3,_9b4,_9b5){
if(obj&&typeof _9b3=="string"&&obj[_9b3]==_9b0){
return obj.on(_9b3.substring(2).toLowerCase(),lang.hitch(_9b4,_9b5));
}
return _9b2.apply(_9a7,arguments);
};
};
_9a5.around(_9a7,"connect",_9b1);
if(_9a9.connect){
_9a5.around(_9a9,"connect",_9b1);
}
var _9b6=_9a8("dijit._Widget",[_9ad,_9ae,_9af],{onClick:_9b0,onDblClick:_9b0,onKeyDown:_9b0,onKeyPress:_9b0,onKeyUp:_9b0,onMouseDown:_9b0,onMouseMove:_9b0,onMouseOut:_9b0,onMouseOver:_9b0,onMouseLeave:_9b0,onMouseEnter:_9b0,onMouseUp:_9b0,constructor:function(_9b7){
this._toConnect={};
for(var name in _9b7){
if(this[name]===_9b0){
this._toConnect[name.replace(/^on/,"").toLowerCase()]=_9b7[name];
delete _9b7[name];
}
}
},postCreate:function(){
this.inherited(arguments);
for(var name in this._toConnect){
this.on(name,this._toConnect[name]);
}
delete this._toConnect;
},on:function(type,func){
if(this[this._onMap(type)]===_9b0){
return _9a7.connect(this.domNode,type.toLowerCase(),this,func);
}
return this.inherited(arguments);
},_setFocusedAttr:function(val){
this._focused=val;
this._set("focused",val);
},setAttribute:function(attr,_9b8){
_9a9.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(attr,_9b8);
},attr:function(name,_9b9){
if(_9a6.isDebug){
var _9ba=arguments.callee._ach||(arguments.callee._ach={}),_9bb=(arguments.callee.caller||"unknown caller").toString();
if(!_9ba[_9bb]){
_9a9.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+_9bb,"","2.0");
_9ba[_9bb]=true;
}
}
var args=arguments.length;
if(args>=2||typeof name==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(name);
}
},getDescendants:function(){
_9a9.deprecated(this.declaredClass+"::getDescendants() is deprecated. Use getChildren() instead.","","2.0");
return this.containerNode?_9aa("[widgetId]",this.containerNode).map(_9ac.byNode):[];
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
if(!_9a9.isAsync){
_9ab(0,function(){
var _9bc=["dijit/_base"];
require(_9bc);
});
}
return _9b6;
});
},"dojo/touch":function(){
define("dojo/touch",["./_base/kernel","./on","./has","./mouse"],function(dojo,on,has,_9bd){
function _9be(type){
return function(node,_9bf){
return on(node,type,_9bf);
};
};
var _9c0=has("touch");
dojo.touch={press:_9be(_9c0?"touchstart":"mousedown"),move:_9be(_9c0?"touchmove":"mousemove"),release:_9be(_9c0?"touchend":"mouseup"),cancel:_9c0?_9be("touchcancel"):_9bd.leave};
return dojo.touch;
});
},"dojo/fx":function(){
define("dojo/fx",["./_base/lang","./Evented","./_base/kernel","./_base/array","./_base/connect","./_base/fx","./dom","./dom-style","./dom-geometry","./ready","require"],function(lang,_9c1,dojo,_9c2,_9c3,_9c4,dom,_9c5,geom,_9c6,_9c7){
if(!dojo.isAsync){
_9c6(0,function(){
var _9c8=["./fx/Toggler"];
_9c7(_9c8);
});
}
var _9c9=dojo.fx={};
var _9ca={_fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,args||[]);
}
return this;
}};
var _9cb=function(_9cc){
this._index=-1;
this._animations=_9cc||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
_9c2.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
_9cb.prototype=new _9c1();
lang.extend(_9cb,{_onAnimate:function(){
this._fire("onAnimate",arguments);
},_onEnd:function(){
_9c3.disconnect(this._onAnimateCtx);
_9c3.disconnect(this._onEndCtx);
this._onAnimateCtx=this._onEndCtx=null;
if(this._index+1==this._animations.length){
this._fire("onEnd");
}else{
this._current=this._animations[++this._index];
this._onAnimateCtx=_9c3.connect(this._current,"onAnimate",this,"_onAnimate");
this._onEndCtx=_9c3.connect(this._current,"onEnd",this,"_onEnd");
this._current.play(0,true);
}
},play:function(_9cd,_9ce){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_9ce&&this._current.status()=="playing"){
return this;
}
var _9cf=_9c3.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_9d0=_9c3.connect(this._current,"onBegin",this,function(arg){
this._fire("onBegin",arguments);
}),_9d1=_9c3.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
_9c3.disconnect(_9cf);
_9c3.disconnect(_9d0);
_9c3.disconnect(_9d1);
});
if(this._onAnimateCtx){
_9c3.disconnect(this._onAnimateCtx);
}
this._onAnimateCtx=_9c3.connect(this._current,"onAnimate",this,"_onAnimate");
if(this._onEndCtx){
_9c3.disconnect(this._onEndCtx);
}
this._onEndCtx=_9c3.connect(this._current,"onEnd",this,"_onEnd");
this._current.play.apply(this._current,arguments);
return this;
},pause:function(){
if(this._current){
var e=_9c3.connect(this._current,"onPause",this,function(arg){
this._fire("onPause",arguments);
_9c3.disconnect(e);
});
this._current.pause();
}
return this;
},gotoPercent:function(_9d2,_9d3){
this.pause();
var _9d4=this.duration*_9d2;
this._current=null;
_9c2.some(this._animations,function(a){
if(a.duration<=_9d4){
this._current=a;
return true;
}
_9d4-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_9d4/this._current.duration,_9d3);
}
return this;
},stop:function(_9d5){
if(this._current){
if(_9d5){
for(;this._index+1<this._animations.length;++this._index){
this._animations[this._index].stop(true);
}
this._current=this._animations[this._index];
}
var e=_9c3.connect(this._current,"onStop",this,function(arg){
this._fire("onStop",arguments);
_9c3.disconnect(e);
});
this._current.stop();
}
return this;
},status:function(){
return this._current?this._current.status():"stopped";
},destroy:function(){
if(this._onAnimateCtx){
_9c3.disconnect(this._onAnimateCtx);
}
if(this._onEndCtx){
_9c3.disconnect(this._onEndCtx);
}
}});
lang.extend(_9cb,_9ca);
_9c9.chain=function(_9d6){
return new _9cb(_9d6);
};
var _9d7=function(_9d8){
this._animations=_9d8||[];
this._connects=[];
this._finished=0;
this.duration=0;
_9c2.forEach(_9d8,function(a){
var _9d9=a.duration;
if(a.delay){
_9d9+=a.delay;
}
if(this.duration<_9d9){
this.duration=_9d9;
}
this._connects.push(_9c3.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new _9c4.Animation({curve:[0,1],duration:this.duration});
var self=this;
_9c2.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop","onEnd"],function(evt){
self._connects.push(_9c3.connect(self._pseudoAnimation,evt,function(){
self._fire(evt,arguments);
}));
});
};
lang.extend(_9d7,{_doAction:function(_9da,args){
_9c2.forEach(this._animations,function(a){
a[_9da].apply(a,args);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_9db,args){
var t=this._pseudoAnimation;
t[_9db].apply(t,args);
},play:function(_9dc,_9dd){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_9de,_9df){
var ms=this.duration*_9de;
_9c2.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_9df);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_9e0){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
_9c2.forEach(this._connects,_9c3.disconnect);
}});
lang.extend(_9d7,_9ca);
_9c9.combine=function(_9e1){
return new _9d7(_9e1);
};
_9c9.wipeIn=function(args){
var node=args.node=dom.byId(args.node),s=node.style,o;
var anim=_9c4.animateProperty(lang.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _9e2=_9c5.get(node,"height");
return Math.max(_9e2,1);
}
},end:function(){
return node.scrollHeight;
}}}},args));
var fini=function(){
s.height="auto";
s.overflow=o;
};
_9c3.connect(anim,"onStop",fini);
_9c3.connect(anim,"onEnd",fini);
return anim;
};
_9c9.wipeOut=function(args){
var node=args.node=dom.byId(args.node),s=node.style,o;
var anim=_9c4.animateProperty(lang.mixin({properties:{height:{end:1}}},args));
_9c3.connect(anim,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
var fini=function(){
s.overflow=o;
s.height="auto";
s.display="none";
};
_9c3.connect(anim,"onStop",fini);
_9c3.connect(anim,"onEnd",fini);
return anim;
};
_9c9.slideTo=function(args){
var node=args.node=dom.byId(args.node),top=null,left=null;
var init=(function(n){
return function(){
var cs=_9c5.getComputedStyle(n);
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
var anim=_9c4.animateProperty(lang.mixin({properties:{top:args.top||0,left:args.left||0}},args));
_9c3.connect(anim,"beforeBegin",anim,init);
return anim;
};
return _9c9;
});
},"curam/util/cache/CacheLRU":function(){
define("curam/util/cache/CacheLRU",["dojo/_base/declare","dojox/collections/Dictionary"],function(_9e3,_9e4){
var _9e5=_9e3("curam/util/cache/CacheItem",null,{constPriority:{Low:10,Normal:20,High:30},constructor:function(keys,_9e6,_9e7){
if(keys==null){
throw new Error("Cache key cannot be null ");
}
this.key=keys;
this.value=_9e6;
if(_9e7==null){
_9e7={};
}
if(_9e7.priority==null){
_9e7.priority=this.constPriority.Normal;
}
this.options=_9e7;
this.lastAccessed=new Date().getTime();
},destroy:function(){
try{
this.inherited(arguments);
}
catch(err){
console.error(err);
}
}});
return _9e3("curam/util/cache/CacheLRU",null,{maxSize:20,activePurgeFrequency:null,_dataColection:null,_tippingPoint:null,_purgePoint:null,_purgingNow:false,constPriority:{Low:10,Normal:20,High:30},constructor:function(_9e8){
try{
dojo.mixin(this,_9e8);
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
},addItem:function(key,data,_9e9){
if(this.maxSize<1){
return;
}
if(this._dataColection.contains(key)==true){
this._removeItem(key);
}
var _9ea=new _9e5(key,data,_9e9);
this._dataColection.add(_9ea.key,_9ea);
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
var _9eb=null;
if(item!=null){
_9eb=item.value;
}
return _9eb;
},clear:function(){
this._dataColection.forEach(function(data,_9ec,_9ed){
var tmp=data.value;
this._removeItem(tmp.key);
},this);
},_purge:function(){
console.debug("purging cache");
this._purgingNow=true;
var _9ee=new Array();
this._dataColection.forEach(function(data,_9ef,_9f0){
var tmp=data.value;
if(this._isExpired(tmp)){
this._removeItem(tmp.key);
}else{
_9ee.push(tmp);
}
},this);
if(_9ee.length>this._purgePoint){
_9ee=_9ee.sort(function(a,b){
if(a.options.priority!=b.options.priority){
return b.options.priority-a.options.priority;
}else{
return b.lastAccessed-a.lastAccessed;
}
});
while(_9ee.length>this._purgePoint){
var temp=_9ee.pop();
this._removeItem(temp.key);
}
}
this._purgingNow=false;
},_removeItem:function(key){
var item=this._dataColection.item(key);
this._dataColection.remove(key);
if(item.options.callback!=null){
var _9f1=dojo.hitch(this,function(){
item.options.callback(item.key,item.value);
});
setTimeout(_9f1,0);
}
},_isExpired:function(item){
var now=new Date().getTime();
var _9f2=false;
if((item.options.expirationAbsolute)&&(item.options.expirationAbsolute<now)){
_9f2=true;
}
if((_9f2==false)&&(item.options.expirationSliding)){
var _9f3=item.lastAccessed+(item.options.expirationSliding*1000);
if(_9f3<now){
_9f2=true;
}
}
return _9f2;
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
},generateCacheOptions:function(_9f4,_9f5,_9f6){
var _9f7=new Object();
if(_9f4){
_9f7.expirationSliding=_9f4;
}
if(_9f5){
_9f7.expirationAbsolute=_9f5;
}
if(_9f6){
_9f7.priority=_9f6;
}
return _9f7;
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
define("dijit/_DialogMixin",["dojo/_base/declare","./a11y"],function(_9f8,a11y){
return _9f8("dijit._DialogMixin",null,{execute:function(){
},onCancel:function(){
},onExecute:function(){
},_onSubmit:function(){
this.onExecute();
this.execute(this.get("value"));
},_getFocusItems:function(){
var _9f9=a11y._getTabNavigable(this.containerNode);
this._firstFocusItem=_9f9.lowest||_9f9.first||this.closeButtonNode||this.domNode;
this._lastFocusItem=_9f9.last||_9f9.highest||this._firstFocusItem;
}});
});
},"curam/util/ui/AppExitConfirmation":function(){
define("curam/util/ui/AppExitConfirmation",["curam/define","dojo/_base/array","curam/util/ui/AppExitConditionHandler"],function(cdef,_9fa){
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
var _9fb=curam.util.ui.AppExitConfirmation._lastClicked;
var _9fc=_9fb&&_9fb.href&&_9fb.href.substring(0,7)==="mailto:";
curam.util.ui.AppExitConfirmation._lastClicked=null;
return _9fc?false:true;
}));
return dojo.connect(dojo.global,"onbeforeunload",null,function(e){
var _9fd=curam.util.ui.AppExitConfirmation._exitConditionHandlers;
var _9fe=_9fa.every(_9fd,function(eh){
return eh.isConfirmationAllowed();
});
if(_9fe){
return curam.util.ui.AppExitConfirmation._confirmationHandler("Number of condition handlers consulted: "+_9fd.length);
}
});
},_setTestHandler:function(_9ff){
curam.util.ui.AppExitConfirmation._confirmationHandler=_9ff;
},uninstall:function(_a00){
dojo.disconnect(_a00);
dojo.disconnect(curam.util.ui.AppExitConfirmation._lastClickedToken);
curam.util.ui.AppExitConfirmation._lastClicked=null;
curam.util.ui.AppExitConfirmation._exitConditionHandlers=[];
},registerExitConditionHandler:function(_a01){
curam.util.ui.AppExitConfirmation._exitConditionHandlers.push(_a01);
}});
return curam.util.ui.AppExitConfirmation;
});
},"dijit/form/_FormValueWidget":function(){
define("dijit/form/_FormValueWidget",["dojo/_base/declare","dojo/_base/sniff","./_FormWidget","./_FormValueMixin"],function(_a02,has,_a03,_a04){
return _a02("dijit.form._FormValueWidget",[_a03,_a04],{_layoutHackIE7:function(){
if(has("ie")==7){
var _a05=this.domNode;
var _a06=_a05.parentNode;
var _a07=_a05.firstChild||_a05;
var _a08=_a07.style.filter;
var _a09=this;
while(_a06&&_a06.clientHeight==0){
(function ping(){
var _a0a=_a09.connect(_a06,"onscroll",function(){
_a09.disconnect(_a0a);
_a07.style.filter=(new Date()).getMilliseconds();
setTimeout(function(){
_a07.style.filter=_a08;
},0);
});
})();
_a06=_a06.parentNode;
}
}
}});
});
},"url:idx/oneui/templates/HoverCard.html":"<div class=\"idxOneuiHoverCard idxOneuiHoverCardLeft\">\r\n\t<div role=\"document\"> <span data-dojo-attach-point=\"closeButtonNode, focusNode\" class=\"idxOneuiHoverCardCloseIcon\" data-dojo-attach-event=\"ondijitclick: hide\" role=\"button\" tabIndex=\"0\"></span></div>\r\n\t\r\n\t<div data-dojo-attach-point=\"bodyNode\" class=\"idxOneuiHoverCardBody\">\t\r\n\t\t<div class=\"idxOneuiHoverCardGrip\" data-dojo-attach-point=\"gripNode\"></div>\r\n\t\t<div class=\"idxOneuiHoverCardContainer\" role='alert' data-dojo-attach-point=\"containerNode\">\t\t\r\n\t\t</div>\r\n\t\t<div class=\"idxOneuiHoverCardFooter\">\r\n\t\t\t<div class=\"idxOneuiHoverCardActionIcons\" data-dojo-attach-point=\"actionIcons\"></div>\r\n\t\t\t<span aria-haspopup=\"true\" data-dojo-attach-point=\"moreActionsNode\"></span>\r\n\t\t</div>\r\n\t\t<div class=\"idxOneuiHoverCardFooterExpand\"></div>\r\n\t</div>\r\n\t<div class=\"idxOneuiHoverCardConnector\" data-dojo-attach-point=\"connectorNode\"></div>\r\n</div>\r\n\r\n\r\n","*now":function(r){
r(["dojo/i18n!*preload*dojo/nls/curam-ext-app*[\"ar\",\"ca\",\"cs\",\"da\",\"de\",\"el\",\"en-gb\",\"en-us\",\"es-es\",\"fi-fi\",\"fr-fr\",\"he-il\",\"hu\",\"it-it\",\"ja-jp\",\"ko-kr\",\"nl-nl\",\"nb\",\"pl\",\"pt-br\",\"pt-pt\",\"ru\",\"sk\",\"sl\",\"sv\",\"th\",\"tr\",\"zh-tw\",\"zh-cn\",\"ROOT\"]"]);
}}});
define("dojo/curam-ext-app",[],1);
