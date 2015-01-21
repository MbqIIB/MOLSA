//>>built
require({cache:{"url:curam/app/templates/ExternalApplication.html":"<div class=\"app-container\">\r\n  <div class=\"app-container-bc\" \r\n    data-dojo-type=\"dijit/layout/BorderContainer\"\r\n    data-dojo-props=\"gutters:false\"\r\n    data-dojo-attach-point=\"_borderContainer\">\r\n    <div class=\"app-banner\"\r\n      data-dojo-type=\"dojox/layout/ContentPane\"\r\n      data-dojo-props=\"region: 'top'\"\r\n      data-dojo-attach-point=\"_appBanner\" role=\"banner\">\r\n    </div>\r\n    <div id=\"app-nav\"\r\n      data-dojo-type=\"curam/widget/menu/MenuPane\"\r\n      data-dojo-props=\"region: 'leading', startExpanded: false\"\r\n      data-dojo-attach-point=\"_appNav\"\r\n      class=\"leftNavMenu\">\r\n    </div>\r\n\t\t<div id=\"app-content\"\r\n\t\t\tdata-dojo-type=\"curam/widget/containers/TransitionContainer\"\r\n\t\t\tdata-dojo-attach-point=\"_appContentBody\" class=\"mainBody\"\r\n\t\t\tdata-dojo-props='region:\"center\", style : {padding : 0, border : 0}' role=\"main\">\r\n\t\t</div>\r\n  </div>\r\n</div>"}});
define("curam/app/ExternalApplication",["dojo/_base/declare","dojo/_base/lang","dojo/_base/window","dojo/aspect","dojo/dom-attr","dojo/query","dojo/dom-geometry","dojo/dom","dijit/_Widget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/form/Button","dojo/text!./templates/ExternalApplication.html","curam/util/UIMFragment","dojo/dom-class","dojo/dom-style","curam/ui/ClientDataAccessor","curam/widget/containers/TransitionContainer","dojo/on","curam/widget/menu/MenuPane","dijit/CheckedMenuItem","dojo/fx","dijit/focus","idx/oneui/MenuBar","idx/oneui/Menu","idx/oneui/Header","idx/oneui/MenuDialog","idx/oneui/MenuHeading","idx/oneui/HoverHelpTooltip","dijit/PopupMenuBarItem","dijit/MenuItem","dijit/form/ComboButton","curam/widget/menu/BannerMenuItem","curam/util/SessionTimeout","curam/util/ui/AppExitConfirmation"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14,_15,_16,_17,fx,_18){
return _1("curam.app.ExternalApplication",[_9,_a,_b],{started:false,templateString:_f,widgetsInTemplate:true,baseClass:"curamApp",_appConfig:null,_initializedNavBarID:null,guardAgainstLeaving:null,postMixInProperties:function(){
this.inherited(arguments);
},startup:function(){
this.inherited(arguments);
this._init();
this._setupUserLeavingGuard();
},_isNavBarItem:function(_19){
return (this._appConfig.map[_19]!=null);
},_init:function(){
var da=new _13();
da.getRaw("/config/tablayout/extapp["+curam.config.appID+"]",_2.hitch(this,function(_1a){
console.log("External App config data:"+_1a);
this._appConfig=_1a;
this._postDataLoadInit();
}),function(_1b,_1c){
console.log("External App config data load error:"+_1b);
},null);
_4.before(dijit.popup,"open",this._evenOutMenuRows,true);
_4.after(dijit.popup,"open",_2.hitch(this,"_animateMenuOpen"),true);
_4.after(dijit.popup,"close",_2.hitch(this,"_animateMenuClose"),true);
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
var _1d=this._appConfig.timeoutWarning;
if(_1d){
var _1e=_1d.width;
var _1f=_1d.height;
var _20=_1d.timeout;
var _21=_1d.bufferingPeriod;
curam.util.SessionTimeout.checkSessionExpired(_1e,_1f,_20,_21);
}
}
},_loadLandingPage:function(_22){
if(curam.config.landingPage){
this._displayOnlyBodyContent({pageID:curam.config.landingPage});
}else{
throw "ERROR: Landing page not set correctly: "+curam.config.landingPage;
}
},_loadBanner:function(){
_10.get({url:"CDEJ/extapp/application-banner-fragment.jspx",targetID:this._appBanner.id,onLoad:_2.hitch(this,this._initializeBannerLandingPageLink)});
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
},_initializeBannerLandingPageLink:function(_23){
var _24=_6(".idxHeaderPrimaryTitle",_23.domNode)[0];
if(!_24){
throw "Landing Page link not initialized, title node cannot be found";
}
var _25=_2.hitch(this,"_loadLandingPage");
dojo.connect(_24,"onclick",function(){
_25();
});
},_animateMenuOpen:function(_26){
var _27=dojo.byId(_26.popup._popupWrapper.id);
if(_5.get(_27,"dijitpopupparent")!=="appMegaMenu"&!_11.contains(_27,"oneuiHeaderGlobalActionsMenu_help")){
return;
}
if(!_27.aniTable){
_27.aniTable=dojo.query("table",_27)[0];
}
if(!_27.inAnimation){
_27.inAnimation=false;
}
if(!_27.isShown){
_27.isShown=false;
}
if(_27.inAnimation){
if(dijit.byId("appHelpMenu")===_26.popup){
if(_26.popup.shouldNotClose){
_26.popup.shouldNotClose=false;
_26.popup.cancelClose=true;
return;
}
}
_27.fx&&_27.fx.stop();
_27.inAnimation=false;
_27.isShown=false;
_12.set(_27,"display","none");
}
if(!_27.isShown&&!_27.inAnimation){
dojo.style(_27,"display","none");
dojo.style(_27.aniTable,"opacity","0");
}
var _28=function(){
_27.inAnimation=true;
_27.isShown=false;
if(dijit.byId("appHelpMenu")===_26.popup){
_26.popup.shouldNotClose=_26.popup.shouldNotClose?false:true;
_26.popup.justClosed=false;
}
};
var _29=function(){
dojo.style(_27.aniTable,"opacity","1");
_27.inAnimation=false;
_27.isShown=true;
var _2a=dojo.marginBox(_27).h;
var _2b=dojo.window.getBox().h-65-20;
if(_2b<_2a){
_12.set(_27,"height",_2b+"px");
_12.set(_27,"border-bottom","1px solid black");
}
};
this._animateMenu(_27,_27.aniTable,"open",_28,_29);
},_animateMenuClose:function(_2c){
var _2d=dojo.byId(_2c._popupWrapper.id);
if(_5.get(_2d,"dijitpopupparent")!=="appMegaMenu"&!_11.contains(_2d,"oneuiHeaderGlobalActionsMenu_help")){
return;
}
if(dijit.byId("appHelpMenu")===_2c){
if(_2c.cancelClose){
_2c.cancelClose=false;
return;
}else{
if(_2c.justClosed){
_2c.justClosed=false;
return;
}
}
}
if(!_2d.aniTable){
_2d.aniTable=dojo.query("table",_2d)[0];
}
if(_2d.inAnimation){
_2d.fx&&_2d.fx.stop();
_2d.inAnimation=false;
_2d.isShown=false;
dojo.style(_2d.aniTable,"opacity","1");
}
_12.set(_2d,"display","block");
var _2e=function(){
_2d.inAnimation=true;
_2d.isShown=true;
};
var _2f=function(){
_2d.inAnimation=false;
_2d.isShown=false;
_12.set(_2d,"display","none");
_12.set(_2d,"border-bottom","");
if(dijit.byId("appHelpMenu")===_2c){
_2c.shouldNotClose=false;
_2c.justClosed=true;
}
};
this._animateMenu(_2d,_2d.aniTable,"close",_2e,_2f);
},_animateMenu:function(_30,_31,_32,_33,_34){
var _35=300;
var _36=[];
var _37=fx.wipeIn({node:_30,duration:_35});
var _38=dojo.fadeIn({node:_31,duration:_35});
var _39=fx.wipeOut({node:_30,duration:_35});
var _3a=dojo.fadeOut({node:_31,duration:_35});
if(_32==="open"){
_36.push(_37);
_36.push(_38);
}else{
_36.push(_3a);
_36.push(_39);
}
_30.fx=fx.chain(_36);
dojo.connect(_30.fx,"onBegin",_33);
dojo.connect(_30.fx,"onEnd",_34);
_30.fx.play();
},_evenOutMenuRows:function(_3b){
var _3c=dojo.byId(_3b.popup.id);
var _3d=_3b.parent?_3b.parent.id:_3b.popup.id;
if(_3d!=="appMegaMenu"&_3d!=="appHelpMenu"){
return;
}
var _3e,_3f;
if(_3d==="appMegaMenu"){
_3e="MMItemContainerRow";
_3f="MMItemContainer";
}else{
_3e="HMItemContainerRow";
_3f="HMItemContainer";
}
var _40=dojo.query("div."+_3f,_3c);
var _41=_3b.popup._popupWrapper?_3b.popup._popupWrapper:_3c;
_12.set(_41,"display","block");
var _42=_40.length;
var _43=_42<6?1:Math.ceil(_42/3);
var _44=[];
for(var i=0;i<_43;i++){
_44[i]=0;
}
for(var _45=0;_45<_43;_45++){
dojo.forEach(_40,function(_46,_47){
_12.set(_46,"height","auto");
if(_45===0&&!_11.contains(_46,"iconSetOUI")){
var _48=_46;
while(!_11.contains(_48,"menuItemClassOUI")){
_48=_48.parentNode;
}
_48=dojo.query("td.dijitMenuItemIconCell",_48)[0];
if(_43===1){
_12.set(_48,"width","50px");
}else{
_12.set(_48,"width","34px");
}
_11.add(_46,"iconSetOUI");
}
var _49=_12.get(_46,"height");
if(_11.contains(_46,_3e+_45)){
if(_49>_44[_45]){
_44[_45]=_49;
}
}
});
}
_12.set(_41,"display","none");
for(var i=0;i<_43;i++){
dojo.forEach(_40,function(_4a,_4b){
if(_11.contains(_4a,_3e+i)){
_12.set(_4a,"height",_44[i]+"px");
}
});
}
},_handleBannerResize:function(_4c){
var pos=dojo.position;
var box=dojo.marginBox;
CuramExternalApp._oneuiBanner=_4c||CuramExternalApp._oneuiBanner;
currentBanner=CuramExternalApp._oneuiBanner;
var _4d=dojo.query(".idxHeaderPrimaryTitleContainer",currentBanner._globalActionsNode)[0];
var _4e=currentBanner._helpNode?true:false;
var _4f=currentBanner.userNode?true:false;
var _50=currentBanner.navigation?true:false;
var _51=currentBanner.logoExists;
var _52=currentBanner._settingsNode?true:false;
if(_52){
if(_5.get(currentBanner._settingsNode,"title")){
_5.set(currentBanner._settingsNode,"title",CuramExternalApp._appConfig.printMenuLabel);
}
if(_5.get(currentBanner._settingsNode,"alt")){
_5.set(currentBanner._settingsNode,"alt",CuramExternalApp._appConfig.printMenuLabel);
}
}
var _53=_4e?pos(currentBanner._helpNode).x:885;
var _54=_53-box(_4d).w;
if(_4f){
var _55=currentBanner.userNode;
var _56=currentBanner.userTextNode;
_12.set(_56,"width","");
var _57=box(_55).w;
var _58=box(_56).w;
}
if(_50){
var _59=currentBanner.navigation.domNode;
var _5a=dojo.query("span[id*=text]",_59)[0];
_12.set(_5a,"width","");
var _5b=box(_59).w;
var _5c=box(_5a).w;
}
if(_52){
var _5d=currentBanner._settingsNode;
var _5e=dojo.query("span[id*=text]",_5d)[0];
var _5f=box(_5d).w;
}
var _60=_54;
_60-=_50?(_5b-_5c):0;
_60-=_4f?(_57-_58):0;
_60-=_52?_5f:0;
var _61=_60;
_61-=_50?_5c:0;
_61-=_4f?_58:0;
_61-=_52?_5f:0;
if(_61<0){
if(_50&_4f){
var _62=_60/2;
var _63;
if(_58<_62){
_63=_60-_58;
_12.set(_5a,"width",_63+"px");
}else{
if(_5c<_62){
_63=_60-_5c;
_12.set(_56,"width",_63+"px");
}else{
_12.set(_56,"width",_62+"px");
_12.set(_5a,"width",_62+"px");
}
}
}else{
if(_50&_52){
var _62=_60/2;
var _63;
if(_5f<_62){
_63=_60-_5f;
_12.set(_5a,"width",_63+"px");
}else{
if(_5c<_62){
_63=_60-_5c;
_12.set(_5d,"width",_63+"px");
}else{
_12.set(_5d,"width",_62+"px");
_12.set(_5a,"width",_62+"px");
}
}
}else{
if(_50){
_12.set(_5a,"width",_60+"px");
}else{
_12.set(_56,"width",_60+"px");
}
}
}
}
if(_50){
var _64=0;
_64+=_51?box(dojo.query(".idxHeaderLogoBox",currentBanner._globalActionsNode)[0]).w:0;
_64+=_4f?box(_55).w:0;
_64+=_4e?box(currentBanner._helpNode).w:0;
_64+=_52?box(currentBanner._settingsNode).w:0;
_12.set(_59,"right",_64+"px");
}
},_postDataLoadInit:function(){
this._appContentBody._doResourceLookUp=_2.hitch(this,this._doResourceLookUpForMainBody);
this._appNav._onSelectAfter=_2.hitch(this,function(_65){
this._appContentBody.set("displayPanel",_65);
});
this._makeNavBarAccessible();
this._loadBanner();
this._loadLandingPage();
},_initNavBar:function(_66,_67){
var _68=this._appConfig.map[_66];
if(typeof (_68)=="undefined"||_68==this._initializedNavBarID){
_67();
return;
}
var da=new _13();
da.getRaw("/config/tablayout/extnav["+curam.config.appID+"]["+_68+"]",_2.hitch(this,function(_69){
console.log("External App config data:"+_69);
this._loadMenuItems(_69.navItems,_69.navBarPixelWidth);
_67();
this._initializedNavBarID=_68;
}),function(_6a,_6b){
console.log("External App navigation config data load error:"+_6a);
},null);
},_makeNavBarAccessible:function(){
var _6c=dojo.query(".idxOneuiHoverCardCloseIcon")[0];
if(_6c){
_5.set(_6c,"tabindex",-1);
_5.set(_6c,"aria-label",this._appConfig.hoverCardCloseButtonLabel);
}
var _6d=dijit.byId("navOverflowButton");
_6d._setLabelAttr(this._appConfig.navOverflowButtonLabel);
},_loadMenuItems:function(_6e,_6f){
var _70=[];
this._appNav.set("width",_6f);
for(var i=0;i<_6e.length;i++){
var _71=_6e[i];
var _72={id:_71.pageID,label:_71.title,selected:false,iconPath:_71.iconPath,subPageIds:_71.subPageIds,iconClass:"whoKnow"};
_70.push(_72);
}
this._appNav.addMenuItems(_70);
},megaMenuClick:function(_73){
if(typeof (_73.displayNavBar)=="undefined"){
_73.displayNavBar=false;
}
this.displayContent(_73);
},displayContent:function(_74){
if(_74!=null){
_74.forceRefresh=true;
if(_74.displayNavBar==false){
this._displayOnlyBodyContent(_74);
return;
}
if(_74.displayNavBar==true){
this._displayNavMenuAndBodyContent(_74);
return;
}
if(_74.pageID==curam.config.landingPage){
this._displayOnlyBodyContent(_74);
return;
}
if(this._isNavBarItem(_74.pageID)){
this._displayNavMenuAndBodyContent(_74);
return;
}else{
if(this._appNav._showing){
this._displayNavMenuAndBodyContent(_74);
return;
}else{
this._displayOnlyBodyContent(_74);
return;
}
}
}
},_displayOnlyBodyContent:function(_75){
if(this._appNav._showing){
var _76=this.connect(this._appContentBody,"_panelFadeOutComplete",_2.hitch(this,function(){
_76.remove();
var _77=this.connect(this._appNav,"_onHideComplete",_2.hitch(this,function(){
this._appNav.deselect();
_77.remove();
_75.key=_75.pageID;
this._appContentBody.set("displayPanel",_75);
}));
this._appNav.fadeOut();
}));
this._appContentBody.fadeOutDisplay();
}else{
_75.key=_75.pageID;
this._appContentBody.set("displayPanel",_75);
}
},_displayNavMenuAndBodyContent:function(_78){
_78.key=_78.pageID;
if(_78.param==null){
_78.param=[];
}
_78.exceptionButtonFound=false;
if(this._appNav._showing){
this._appNav.setSelectedButton(_78);
}else{
var _79=this.connect(this._appContentBody,"_panelFadeOutComplete",_2.hitch(this,function(){
_79.remove();
var _7a=this.connect(this._appNav,"_onShowComplete",_2.hitch(this,function(){
_7a.remove();
this._appNav.setSelectedButton(_78);
}));
this._appNav.fadeIn();
}));
this._appContentBody.fadeOutDisplay();
}
},_doResourceLookUpForMainBody:function(_7b,_7c,_7d){
var uri;
if(_7b.key){
if(this._isUIMFragment(_7b.key)){
uri=jsL+"/"+_7b.key+"Page.do?"+this._addCDEJParameters();
}else{
uri=jsL+"/UIMIFrameWrapperPage.do?uimPageID="+_7b.key+"&"+this._addCDEJParameters();
}
}else{
if(_7b.url){
uri=_7b.url;
}
}
return uri;
},_addCDEJParameters:function(){
return jsScreenContext.toRequestString();
},updateMainContentIframe:function(_7e){
var _7f=dojo.query("iframe",this.domNode)[0];
if(_7f){
_7f.contentWindow.location.href=_7e;
}
},_isUIMFragment:function(_80){
return (this._appConfig&&this._appConfig.uimFragRegistry[_80]!=null);
},_setupUserMenuLinking:function(_81,_82){
dojo.connect(_81,"onclick",_2.partial(function(_83,evt){
var _84=dojo.byId("curam-extapp_userMenuArrow");
if(evt.target!=_84){
displayContent(_83);
}
},_82));
dojo.connect(_81,"onkeypress",function(evt){
if(evt.charOrCode===dojo.keys.ENTER){
dojo.stopEvent(evt);
displayContent(_82);
}
});
},_makeUserMenuAccessible:function(_85,_86){
_5.set(_86,"tabindex","3");
_5.set(_86,"title",_86.innerText);
_5.set(_86,"role","link");
var _87=dojo.query(".idxHeaderDropDownArrow",_85)[0];
_5.set(_87,"tabindex","4");
_5.set(_87,"role","button");
_5.set(_87,"title",_86.innerText);
this._handleUserImageHighContrast(_85);
},_handleUserImageHighContrast:function(_88){
var _89=dojo.query(".idxHeaderUserIcon",_88)[1];
if(_89){
var _8a=_3.body();
if(_8a&&_11.contains(_8a,"high-contrast")){
_89.src="servlet/PathResolver?r=i&p=/config/tablayout/image[banner_hom_normal.png]";
_15(_89,"mouseover",function(){
_89.src="servlet/PathResolver?r=i&p=/config/tablayout/image[banner_home_roll.png]";
});
_15(_89,"click",function(){
_89.src="servlet/PathResolver?r=i&p=/config/tablayout/image[banner_home_click.png]";
});
_15(_89,"mouseout",function(){
_89.src="servlet/PathResolver?r=i&p=/config/tablayout/image[banner_hom_normal.png]";
});
}
}
},_makeMegaMenuAccessible:function(_8b){
var _8c=dojo.query("span[id*=text]",_8b.domNode)[0];
_5.set(_8c,"title",_8c.innerText);
},_makeHelpMenuAccessible:function(_8d){
_5.set(_8d,"tabindex","6");
_5.set(_8d,"role","button");
dojo.connect(_8d,"onkeydown",function(evt){
if(evt.keyCode===dojo.keys.ENTER){
dojo.stopEvent(evt);
dijit.byId("appHelpMenu")._scheduleOpen(evt.target);
}
});
},_makePrintMenuAccessible:function(_8e){
var _8f=_8e._settingsNode;
_5.set(_8f,"tabindex","5");
_5.set(_8f,"role","button");
dojo.connect(_8f,"onkeydown",function(evt){
if(evt.keyCode===dojo.keys.ENTER){
dojo.stopEvent(evt);
dijit.byId("appBannerPrintMenu")._scheduleOpen(evt.target);
}
});
},_setupUserMenuHoverCard:function(_90){
_4.after(idx.oneui.Header.prototype,"_renderUser",function(){
_11.add(this.userNode,"idxHeaderDropDown");
var _91=dojo.query(".idxHeaderDropDownArrow",this.userNode)[0];
_91.id="curam-extapp_userMenuArrow";
if(dojo.isIE!==7){
_5.set(_91,"onmouseover","idx.oneui.HoverHelpTooltip.defaultPosition=['below']");
_5.set(_91,"onkeypress","idx.oneui.HoverHelpTooltip.defaultPosition=['below']");
}else{
dojo.connect(_91,"onclick",idx.oneui.HoverHelpTooltip.defaultPosition=["below"]);
}
});
if(dojo.isIE!==7){
_4.before(idx.oneui.HoverHelpTooltip,"show",function(){
var _92=dojo.byId("curam-extapp_userMenuArrow");
_12.set(_92,{"position":"fixed","top":"30px","right":"21px"});
});
_4.after(idx.oneui.HoverHelpTooltip,"show",function(){
_12.set(dojo.byId("curam-extapp_userMenuArrow"),"position","static");
});
_4.after(_90,"onShow",_2.partial(function(_93){
var _94="idx_oneui__MasterHoverHelpTooltip_0";
if(_93.lastIndexOf("_")!=-1){
_94="idx_oneui__MasterHoverHelpTooltip_"+_93.slice(_93.lastIndexOf("_")+1);
}
var _95=CuramExternalApp._oneuiBanner;
var _96=_95._helpNode?true:false;
var _97=_95._settingsNode?true:false;
var _98=_95.logoExists;
var _99=0;
_99+=_98?_7.getMarginBox(_6(".idxHeaderLogoBox",_95._globalActionsNode)[0]).w:0;
_99+=_96?_7.getMarginBox(_95._helpNode).w:0;
_99+=_97?_7.getMarginBox(_95._settingsNode).w:0;
_99+=_7.getContentBox(_6(".idxHeaderDropDownArrow",_95.userNode)[0]).w/2;
_12.set(_8.byId(_94),{"left":"auto","right":_99+"px"});
},_90.id));
}
},_addHelpMenuCustomClass:function(){
var _9a=dijit.byId("appHelpMenu")._popupWrapper;
if(!_11.contains(_9a,"oneuiHeaderGlobalActionsMenu_help")){
_11.add(_9a,"oneuiHeaderGlobalActionsMenu_help");
}
},displayMegaMenuItemInModal:function(_9b){
console.log(_9b);
},_preventJAWSCrashClick:function(_9c){
var _9d=dojo.query("#"+_9c.id+"_text",_9c)[0];
if(!_9d.isModified){
dojo.query(".wtfoneui",_9d).forEach(function(_9e){
_9e.oldInnerText=_9e.innerText;
if(_11.contains(_9e,"MMtitle")){
_9e.innerText=_9e.innerText.substring(0,229).concat("...");
}else{
var _9f=_9e.previousSibling;
while(!_11.contains(_9f,"MMtitle")){
_9f=_9f.previousSibling;
}
_9f=_9f.innerText.length;
var _a0=Math.min(250-_9f,Math.max(10,_9e.innerText.length-_9f));
_9e.innerText=_9e.innerText.substring(0,_a0).concat("...");
}
});
_9d.isModified=true;
_9d.innerModdedTimer&&clearTimeout(_9d.innerModdedTimer);
_9d.innerModdedTimer=setTimeout(dojo.partial(function(_a1){
if(_9d.isModified){
dojo.query(".wtfoneui",_9d).forEach(function(_a2){
_a2.innerText=_a2.oldInnerText;
});
_9d.isModified=false;
_9d["innerModdedTimer"]=undefined;
try{
delete _9d.innerModdedTimer;
}
catch(e){
}
}
},_9c),2);
}
},_preventJAWSCrashFocus:function(_a3){
var _a4=dojo.query("#"+_a3.id+"_text",_a3)[0];
if(!_a4.isModified){
dojo.query(".wtfoneui",_a4).forEach(function(_a5){
_a5.oldInnerText=_a5.innerText;
if(_11.contains(_a5,"MMtitle")){
_a5.innerText=_a5.innerText.substring(0,229).concat("...");
}else{
var _a6=_a5.previousSibling;
while(!_11.contains(_a6,"MMtitle")){
_a6=_a6.previousSibling;
}
_a6=_a6.innerText.length;
var _a7=Math.min(250-_a6,Math.max(10,_a5.innerText.length-_a6));
_a5.innerText=_a5.innerText.substring(0,_a7).concat("...");
}
});
_a4.isModified=true;
_a4.innerModdedTimer&&clearTimeout(_a4.innerModdedTimer);
_a4.innerModdedTimer=setTimeout(dojo.partial(function(_a8){
if(_a4.isModified){
dojo.query(".wtfoneui",_a4).forEach(function(_a9){
_a9.innerText=_a9.oldInnerText;
});
_a4.isModified=false;
_a4["innerModdedTimer"]=undefined;
try{
delete _a4.innerModdedTimer;
}
catch(e){
}
}
},_a3),2);
}
},_preventJAWSCrashBlur:function(_aa){
var _ab=dojo.query("#"+_aa.id+"_text",_aa)[0];
_ab.innerModdedTimer&&clearTimeout(_ab.innerModdedTimer);
if(_ab.isModified){
dojo.query(".wtfoneui",_ab).forEach(function(_ac){
_ac.innerText=_ac.oldInnerText;
});
_ab.isModified=false;
}
},_skipLinkFocus:function(_ad){
_ad=_ad||"app-content";
var _ae=dojo.byId(_ad);
if(_ae){
_ae.focus();
}
},_showHideSkipLink:function(e){
var _af=dojo.byId("skipLink");
if(_af){
var _b0=_af.parentNode;
if(e.type=="focus"&&_11.contains(_b0,"hidden")){
_11.remove(_b0,"hidden");
}else{
if(e.type=="blur"&&!_11.contains(_b0,"hidden")){
_11.add(_b0,"hidden");
}
}
}
},print:function(){
var _b1=_6("iframe.curam-iframe","app-content")[0];
console.log("PRINTING IFRAME:"+_b1);
if(_b1){
if(dojo.isIE<9){
_b1.contentWindow.document.execCommand("print",false,null);
}else{
_b1.contentWindow.print();
}
}else{
window.print();
}
}});
});
