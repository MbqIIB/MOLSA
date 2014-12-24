//>>built
require({cache:{"url:curam/app/templates/ExternalApplication.html":"<div class=\"app-container\">\r\n  <div class=\"app-container-bc\" \r\n    data-dojo-type=\"dijit/layout/BorderContainer\"\r\n    data-dojo-props=\"gutters:false\"\r\n    data-dojo-attach-point=\"_borderContainer\">\r\n    <div class=\"app-banner\"\r\n      data-dojo-type=\"dojox/layout/ContentPane\"\r\n      data-dojo-props=\"region: 'top'\"\r\n      data-dojo-attach-point=\"_appBanner\" role=\"banner\">\r\n    </div>\r\n    <div id=\"app-nav\"\r\n      data-dojo-type=\"curam/widget/menu/MenuPane\"\r\n      data-dojo-props=\"region: 'leading', startExpanded: false\"\r\n      data-dojo-attach-point=\"_appNav\"\r\n      class=\"leftNavMenu\">\r\n    </div>\r\n\t\t<div id=\"app-content\"\r\n\t\t\tdata-dojo-type=\"curam/widget/containers/TransitionContainer\"\r\n\t\t\tdata-dojo-attach-point=\"_appContentBody\" class=\"mainBody\"\r\n\t\t\tdata-dojo-props='region:\"center\", style : {padding : 0, border : 0}' role=\"main\">\r\n\t\t</div>\r\n  </div>\r\n</div>"}});
define("curam/app/ExternalApplication",["dojo/_base/declare","dojo/_base/lang","dojo/_base/window","dojo/aspect","dojo/dom-attr","dojo/query","dojo/dom-geometry","dojo/dom","dijit/_Widget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/form/Button","dojo/text!./templates/ExternalApplication.html","curam/util/UIMFragment","dojo/dom-class","dojo/dom-style","curam/ui/ClientDataAccessor","curam/widget/containers/TransitionContainer","dojo/on","curam/widget/menu/MenuPane","dijit/CheckedMenuItem","dojo/fx","dijit/focus","idx/oneui/MenuBar","idx/oneui/Menu","idx/oneui/Header","idx/oneui/MenuDialog","idx/oneui/MenuHeading","idx/oneui/HoverHelpTooltip","dijit/PopupMenuBarItem","dijit/MenuItem","dijit/form/ComboButton","curam/widget/menu/BannerMenuItem","curam/util/ui/AppExitConfirmation"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14,_15,_16,_17,fx,_18){
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
},_loadLandingPage:function(_1d){
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
},_initializeBannerLandingPageLink:function(_1e){
var _1f=_6(".idxHeaderPrimaryTitle",_1e.domNode)[0];
if(!_1f){
throw "Landing Page link not initialized, title node cannot be found";
}
var _20=_2.hitch(this,"_loadLandingPage");
dojo.connect(_1f,"onclick",function(){
_20();
});
},_animateMenuOpen:function(_21){
var _22=dojo.byId(_21.popup._popupWrapper.id);
if(_5.get(_22,"dijitpopupparent")!=="appMegaMenu"&!_11.contains(_22,"oneuiHeaderGlobalActionsMenu_help")){
return;
}
if(!_22.aniTable){
_22.aniTable=dojo.query("table",_22)[0];
}
if(!_22.inAnimation){
_22.inAnimation=false;
}
if(!_22.isShown){
_22.isShown=false;
}
if(_22.inAnimation){
if(dijit.byId("appHelpMenu")===_21.popup){
if(_21.popup.shouldNotClose){
_21.popup.shouldNotClose=false;
_21.popup.cancelClose=true;
return;
}
}
_22.fx&&_22.fx.stop();
_22.inAnimation=false;
_22.isShown=false;
_12.set(_22,"display","none");
}
if(!_22.isShown&&!_22.inAnimation){
dojo.style(_22,"display","none");
dojo.style(_22.aniTable,"opacity","0");
}
var _23=function(){
_22.inAnimation=true;
_22.isShown=false;
if(dijit.byId("appHelpMenu")===_21.popup){
_21.popup.shouldNotClose=_21.popup.shouldNotClose?false:true;
_21.popup.justClosed=false;
}
};
var _24=function(){
dojo.style(_22.aniTable,"opacity","1");
_22.inAnimation=false;
_22.isShown=true;
var _25=dojo.marginBox(_22).h;
var _26=dojo.window.getBox().h-65-20;
if(_26<_25){
_12.set(_22,"height",_26+"px");
_12.set(_22,"border-bottom","1px solid black");
}
};
this._animateMenu(_22,_22.aniTable,"open",_23,_24);
},_animateMenuClose:function(_27){
var _28=dojo.byId(_27._popupWrapper.id);
if(_5.get(_28,"dijitpopupparent")!=="appMegaMenu"&!_11.contains(_28,"oneuiHeaderGlobalActionsMenu_help")){
return;
}
if(dijit.byId("appHelpMenu")===_27){
if(_27.cancelClose){
_27.cancelClose=false;
return;
}else{
if(_27.justClosed){
_27.justClosed=false;
return;
}
}
}
if(!_28.aniTable){
_28.aniTable=dojo.query("table",_28)[0];
}
if(_28.inAnimation){
_28.fx&&_28.fx.stop();
_28.inAnimation=false;
_28.isShown=false;
dojo.style(_28.aniTable,"opacity","1");
}
_12.set(_28,"display","block");
var _29=function(){
_28.inAnimation=true;
_28.isShown=true;
};
var _2a=function(){
_28.inAnimation=false;
_28.isShown=false;
_12.set(_28,"display","none");
_12.set(_28,"border-bottom","");
if(dijit.byId("appHelpMenu")===_27){
_27.shouldNotClose=false;
_27.justClosed=true;
}
};
this._animateMenu(_28,_28.aniTable,"close",_29,_2a);
},_animateMenu:function(_2b,_2c,_2d,_2e,_2f){
var _30=300;
var _31=[];
var _32=fx.wipeIn({node:_2b,duration:_30});
var _33=dojo.fadeIn({node:_2c,duration:_30});
var _34=fx.wipeOut({node:_2b,duration:_30});
var _35=dojo.fadeOut({node:_2c,duration:_30});
if(_2d==="open"){
_31.push(_32);
_31.push(_33);
}else{
_31.push(_35);
_31.push(_34);
}
_2b.fx=fx.chain(_31);
dojo.connect(_2b.fx,"onBegin",_2e);
dojo.connect(_2b.fx,"onEnd",_2f);
_2b.fx.play();
},_evenOutMenuRows:function(_36){
var _37=dojo.byId(_36.popup.id);
var _38=_36.parent?_36.parent.id:_36.popup.id;
if(_38!=="appMegaMenu"&_38!=="appHelpMenu"){
return;
}
var _39,_3a;
if(_38==="appMegaMenu"){
_39="MMItemContainerRow";
_3a="MMItemContainer";
}else{
_39="HMItemContainerRow";
_3a="HMItemContainer";
}
var _3b=dojo.query("div."+_3a,_37);
var _3c=_36.popup._popupWrapper?_36.popup._popupWrapper:_37;
_12.set(_3c,"display","block");
var _3d=_3b.length;
var _3e=_3d<6?1:Math.ceil(_3d/3);
var _3f=[];
for(var i=0;i<_3e;i++){
_3f[i]=0;
}
for(var _40=0;_40<_3e;_40++){
dojo.forEach(_3b,function(_41,_42){
_12.set(_41,"height","auto");
if(_40===0&&!_11.contains(_41,"iconSetOUI")){
var _43=_41;
while(!_11.contains(_43,"menuItemClassOUI")){
_43=_43.parentNode;
}
_43=dojo.query("td.dijitMenuItemIconCell",_43)[0];
if(_3e===1){
_12.set(_43,"width","50px");
}else{
_12.set(_43,"width","34px");
}
_11.add(_41,"iconSetOUI");
}
var _44=_12.get(_41,"height");
if(_11.contains(_41,_39+_40)){
if(_44>_3f[_40]){
_3f[_40]=_44;
}
}
});
}
_12.set(_3c,"display","none");
for(var i=0;i<_3e;i++){
dojo.forEach(_3b,function(_45,_46){
if(_11.contains(_45,_39+i)){
_12.set(_45,"height",_3f[i]+"px");
}
});
}
},_handleBannerResize:function(_47){
var pos=dojo.position;
var box=dojo.marginBox;
CuramExternalApp._oneuiBanner=_47||CuramExternalApp._oneuiBanner;
currentBanner=CuramExternalApp._oneuiBanner;
var _48=dojo.query(".idxHeaderPrimaryTitleContainer",currentBanner._globalActionsNode)[0];
var _49=currentBanner._helpNode?true:false;
var _4a=currentBanner.userNode?true:false;
var _4b=currentBanner.navigation?true:false;
var _4c=currentBanner.logoExists;
var _4d=currentBanner._settingsNode?true:false;
if(_4d){
if(_5.get(currentBanner._settingsNode,"title")){
_5.set(currentBanner._settingsNode,"title",CuramExternalApp._appConfig.printMenuLabel);
}
if(_5.get(currentBanner._settingsNode,"alt")){
_5.set(currentBanner._settingsNode,"alt",CuramExternalApp._appConfig.printMenuLabel);
}
}
var _4e=_49?pos(currentBanner._helpNode).x:885;
var _4f=_4e-box(_48).w;
if(_4a){
var _50=currentBanner.userNode;
var _51=currentBanner.userTextNode;
_12.set(_51,"width","");
var _52=box(_50).w;
var _53=box(_51).w;
}
if(_4b){
var _54=currentBanner.navigation.domNode;
var _55=dojo.query("span[id*=text]",_54)[0];
_12.set(_55,"width","");
var _56=box(_54).w;
var _57=box(_55).w;
}
if(_4d){
var _58=currentBanner._settingsNode;
var _59=dojo.query("span[id*=text]",_58)[0];
var _5a=box(_58).w;
}
var _5b=_4f;
_5b-=_4b?(_56-_57):0;
_5b-=_4a?(_52-_53):0;
_5b-=_4d?_5a:0;
var _5c=_5b;
_5c-=_4b?_57:0;
_5c-=_4a?_53:0;
_5c-=_4d?_5a:0;
if(_5c<0){
if(_4b&_4a){
var _5d=_5b/2;
var _5e;
if(_53<_5d){
_5e=_5b-_53;
_12.set(_55,"width",_5e+"px");
}else{
if(_57<_5d){
_5e=_5b-_57;
_12.set(_51,"width",_5e+"px");
}else{
_12.set(_51,"width",_5d+"px");
_12.set(_55,"width",_5d+"px");
}
}
}else{
if(_4b&_4d){
var _5d=_5b/2;
var _5e;
if(_5a<_5d){
_5e=_5b-_5a;
_12.set(_55,"width",_5e+"px");
}else{
if(_57<_5d){
_5e=_5b-_57;
_12.set(_58,"width",_5e+"px");
}else{
_12.set(_58,"width",_5d+"px");
_12.set(_55,"width",_5d+"px");
}
}
}else{
if(_4b){
_12.set(_55,"width",_5b+"px");
}else{
_12.set(_51,"width",_5b+"px");
}
}
}
}
if(_4b){
var _5f=0;
_5f+=_4c?box(dojo.query(".idxHeaderLogoBox",currentBanner._globalActionsNode)[0]).w:0;
_5f+=_4a?box(_50).w:0;
_5f+=_49?box(currentBanner._helpNode).w:0;
_5f+=_4d?box(currentBanner._settingsNode).w:0;
_12.set(_54,"right",_5f+"px");
}
},_postDataLoadInit:function(){
this._appContentBody._doResourceLookUp=_2.hitch(this,this._doResourceLookUpForMainBody);
this._appNav._onSelectAfter=_2.hitch(this,function(_60){
this._appContentBody.set("displayPanel",_60);
});
this._makeNavBarAccessible();
this._loadBanner();
this._loadLandingPage();
},_initNavBar:function(_61,_62){
var _63=this._appConfig.map[_61];
if(typeof (_63)=="undefined"||_63==this._initializedNavBarID){
_62();
return;
}
var da=new _13();
da.getRaw("/config/tablayout/extnav["+curam.config.appID+"]["+_63+"]",_2.hitch(this,function(_64){
console.log("External App config data:"+_64);
this._loadMenuItems(_64.navItems,_64.navBarPixelWidth);
_62();
this._initializedNavBarID=_63;
}),function(_65,_66){
console.log("External App navigation config data load error:"+_65);
},null);
},_makeNavBarAccessible:function(){
var _67=dojo.query(".idxOneuiHoverCardCloseIcon")[0];
if(_67){
_5.set(_67,"tabindex",-1);
_5.set(_67,"aria-label",this._appConfig.hoverCardCloseButtonLabel);
}
var _68=dijit.byId("navOverflowButton");
_68._setLabelAttr(this._appConfig.navOverflowButtonLabel);
},_loadMenuItems:function(_69,_6a){
var _6b=[];
this._appNav.set("width",_6a);
for(var i=0;i<_69.length;i++){
var _6c=_69[i];
var _6d={id:_6c.pageID,label:_6c.title,selected:false,iconPath:_6c.iconPath,subPageIds:_6c.subPageIds,iconClass:"whoKnow"};
_6b.push(_6d);
}
this._appNav.addMenuItems(_6b);
},megaMenuClick:function(_6e){
if(typeof (_6e.displayNavBar)=="undefined"){
_6e.displayNavBar=false;
}
this.displayContent(_6e);
},displayContent:function(_6f){
if(_6f!=null){
_6f.forceRefresh=true;
if(_6f.displayNavBar==false){
this._displayOnlyBodyContent(_6f);
return;
}
if(_6f.displayNavBar==true){
this._displayNavMenuAndBodyContent(_6f);
return;
}
if(_6f.pageID==curam.config.landingPage){
this._displayOnlyBodyContent(_6f);
return;
}
if(this._isNavBarItem(_6f.pageID)){
this._displayNavMenuAndBodyContent(_6f);
return;
}else{
if(this._appNav._showing){
this._displayNavMenuAndBodyContent(_6f);
return;
}else{
this._displayOnlyBodyContent(_6f);
return;
}
}
}
},_displayOnlyBodyContent:function(_70){
if(this._appNav._showing){
var _71=this.connect(this._appContentBody,"_panelFadeOutComplete",_2.hitch(this,function(){
_71.remove();
var _72=this.connect(this._appNav,"_onHideComplete",_2.hitch(this,function(){
this._appNav.deselect();
_72.remove();
_70.key=_70.pageID;
this._appContentBody.set("displayPanel",_70);
}));
this._appNav.fadeOut();
}));
this._appContentBody.fadeOutDisplay();
}else{
_70.key=_70.pageID;
this._appContentBody.set("displayPanel",_70);
}
},_displayNavMenuAndBodyContent:function(_73){
_73.key=_73.pageID;
if(_73.param==null){
_73.param=[];
}
_73.exceptionButtonFound=false;
if(this._appNav._showing){
this._appNav.setSelectedButton(_73);
}else{
var _74=this.connect(this._appContentBody,"_panelFadeOutComplete",_2.hitch(this,function(){
_74.remove();
var _75=this.connect(this._appNav,"_onShowComplete",_2.hitch(this,function(){
_75.remove();
this._appNav.setSelectedButton(_73);
}));
this._appNav.fadeIn();
}));
this._appContentBody.fadeOutDisplay();
}
},_doResourceLookUpForMainBody:function(_76,_77,_78){
var uri;
if(_76.key){
if(this._isUIMFragment(_76.key)){
uri=jsL+"/"+_76.key+"Page.do?"+this._addCDEJParameters();
}else{
uri=jsL+"/UIMIFrameWrapperPage.do?uimPageID="+_76.key+"&"+this._addCDEJParameters();
}
}else{
if(_76.url){
uri=_76.url;
}
}
return uri;
},_addCDEJParameters:function(){
return jsScreenContext.toRequestString();
},updateMainContentIframe:function(_79){
var _7a=dojo.query("iframe",this.domNode)[0];
if(_7a){
_7a.contentWindow.location.href=_79;
}
},_isUIMFragment:function(_7b){
return (this._appConfig&&this._appConfig.uimFragRegistry[_7b]!=null);
},_setupUserMenuLinking:function(_7c,_7d){
dojo.connect(_7c,"onclick",_2.partial(function(_7e,evt){
var _7f=dojo.byId("curam-extapp_userMenuArrow");
if(evt.target!=_7f){
displayContent(_7e);
}
},_7d));
dojo.connect(_7c,"onkeypress",function(evt){
if(evt.charOrCode===dojo.keys.ENTER){
dojo.stopEvent(evt);
displayContent(_7d);
}
});
},_makeUserMenuAccessible:function(_80,_81){
_5.set(_81,"tabindex","3");
_5.set(_81,"title",_81.innerText);
_5.set(_81,"role","link");
var _82=dojo.query(".idxHeaderDropDownArrow",_80)[0];
_5.set(_82,"tabindex","4");
_5.set(_82,"role","button");
_5.set(_82,"title",_81.innerText);
this._handleUserImageHighContrast(_80);
},_handleUserImageHighContrast:function(_83){
var _84=dojo.query(".idxHeaderUserIcon",_83)[1];
if(_84){
var _85=_3.body();
if(_85&&_11.contains(_85,"high-contrast")){
_84.src="servlet/PathResolver?r=i&p=/config/tablayout/image[banner_hom_normal.png]";
_15(_84,"mouseover",function(){
_84.src="servlet/PathResolver?r=i&p=/config/tablayout/image[banner_home_roll.png]";
});
_15(_84,"click",function(){
_84.src="servlet/PathResolver?r=i&p=/config/tablayout/image[banner_home_click.png]";
});
_15(_84,"mouseout",function(){
_84.src="servlet/PathResolver?r=i&p=/config/tablayout/image[banner_hom_normal.png]";
});
}
}
},_makeMegaMenuAccessible:function(_86){
var _87=dojo.query("span[id*=text]",_86.domNode)[0];
_5.set(_87,"title",_87.innerText);
},_makeHelpMenuAccessible:function(_88){
_5.set(_88,"tabindex","6");
_5.set(_88,"role","button");
dojo.connect(_88,"onkeydown",function(evt){
if(evt.keyCode===dojo.keys.ENTER){
dojo.stopEvent(evt);
dijit.byId("appHelpMenu")._scheduleOpen(evt.target);
}
});
},_makePrintMenuAccessible:function(_89){
var _8a=_89._settingsNode;
_5.set(_8a,"tabindex","5");
_5.set(_8a,"role","button");
dojo.connect(_8a,"onkeydown",function(evt){
if(evt.keyCode===dojo.keys.ENTER){
dojo.stopEvent(evt);
dijit.byId("appBannerPrintMenu")._scheduleOpen(evt.target);
}
});
},_setupUserMenuHoverCard:function(_8b){
_4.after(idx.oneui.Header.prototype,"_renderUser",function(){
_11.add(this.userNode,"idxHeaderDropDown");
var _8c=dojo.query(".idxHeaderDropDownArrow",this.userNode)[0];
_8c.id="curam-extapp_userMenuArrow";
if(dojo.isIE!==7){
_5.set(_8c,"onmouseover","idx.oneui.HoverHelpTooltip.defaultPosition=['below']");
_5.set(_8c,"onkeypress","idx.oneui.HoverHelpTooltip.defaultPosition=['below']");
}else{
dojo.connect(_8c,"onclick",idx.oneui.HoverHelpTooltip.defaultPosition=["below"]);
}
});
if(dojo.isIE!==7){
_4.before(idx.oneui.HoverHelpTooltip,"show",function(){
var _8d=dojo.byId("curam-extapp_userMenuArrow");
_12.set(_8d,{"position":"fixed","top":"30px","right":"21px"});
});
_4.after(idx.oneui.HoverHelpTooltip,"show",function(){
_12.set(dojo.byId("curam-extapp_userMenuArrow"),"position","static");
});
_4.after(_8b,"onShow",_2.partial(function(_8e){
var _8f="idx_oneui__MasterHoverHelpTooltip_0";
if(_8e.lastIndexOf("_")!=-1){
_8f="idx_oneui__MasterHoverHelpTooltip_"+_8e.slice(_8e.lastIndexOf("_")+1);
}
var _90=CuramExternalApp._oneuiBanner;
var _91=_90._helpNode?true:false;
var _92=_90._settingsNode?true:false;
var _93=_90.logoExists;
var _94=0;
_94+=_93?_7.getMarginBox(_6(".idxHeaderLogoBox",_90._globalActionsNode)[0]).w:0;
_94+=_91?_7.getMarginBox(_90._helpNode).w:0;
_94+=_92?_7.getMarginBox(_90._settingsNode).w:0;
_94+=_7.getContentBox(_6(".idxHeaderDropDownArrow",_90.userNode)[0]).w/2;
_12.set(_8.byId(_8f),{"left":"auto","right":_94+"px"});
},_8b.id));
}
},_addHelpMenuCustomClass:function(){
var _95=dijit.byId("appHelpMenu")._popupWrapper;
if(!_11.contains(_95,"oneuiHeaderGlobalActionsMenu_help")){
_11.add(_95,"oneuiHeaderGlobalActionsMenu_help");
}
},displayMegaMenuItemInModal:function(_96){
console.log(_96);
},_preventJAWSCrashClick:function(_97){
var _98=dojo.query("#"+_97.id+"_text",_97)[0];
if(!_98.isModified){
dojo.query(".wtfoneui",_98).forEach(function(_99){
_99.oldInnerText=_99.innerText;
if(_11.contains(_99,"MMtitle")){
_99.innerText=_99.innerText.substring(0,229).concat("...");
}else{
var _9a=_99.previousSibling;
while(!_11.contains(_9a,"MMtitle")){
_9a=_9a.previousSibling;
}
_9a=_9a.innerText.length;
var _9b=Math.min(250-_9a,Math.max(10,_99.innerText.length-_9a));
_99.innerText=_99.innerText.substring(0,_9b).concat("...");
}
});
_98.isModified=true;
_98.innerModdedTimer&&clearTimeout(_98.innerModdedTimer);
_98.innerModdedTimer=setTimeout(dojo.partial(function(_9c){
if(_98.isModified){
dojo.query(".wtfoneui",_98).forEach(function(_9d){
_9d.innerText=_9d.oldInnerText;
});
_98.isModified=false;
_98["innerModdedTimer"]=undefined;
try{
delete _98.innerModdedTimer;
}
catch(e){
}
}
},_97),2);
}
},_preventJAWSCrashFocus:function(_9e){
var _9f=dojo.query("#"+_9e.id+"_text",_9e)[0];
if(!_9f.isModified){
dojo.query(".wtfoneui",_9f).forEach(function(_a0){
_a0.oldInnerText=_a0.innerText;
if(_11.contains(_a0,"MMtitle")){
_a0.innerText=_a0.innerText.substring(0,229).concat("...");
}else{
var _a1=_a0.previousSibling;
while(!_11.contains(_a1,"MMtitle")){
_a1=_a1.previousSibling;
}
_a1=_a1.innerText.length;
var _a2=Math.min(250-_a1,Math.max(10,_a0.innerText.length-_a1));
_a0.innerText=_a0.innerText.substring(0,_a2).concat("...");
}
});
_9f.isModified=true;
_9f.innerModdedTimer&&clearTimeout(_9f.innerModdedTimer);
_9f.innerModdedTimer=setTimeout(dojo.partial(function(_a3){
if(_9f.isModified){
dojo.query(".wtfoneui",_9f).forEach(function(_a4){
_a4.innerText=_a4.oldInnerText;
});
_9f.isModified=false;
_9f["innerModdedTimer"]=undefined;
try{
delete _9f.innerModdedTimer;
}
catch(e){
}
}
},_9e),2);
}
},_preventJAWSCrashBlur:function(_a5){
var _a6=dojo.query("#"+_a5.id+"_text",_a5)[0];
_a6.innerModdedTimer&&clearTimeout(_a6.innerModdedTimer);
if(_a6.isModified){
dojo.query(".wtfoneui",_a6).forEach(function(_a7){
_a7.innerText=_a7.oldInnerText;
});
_a6.isModified=false;
}
},_skipLinkFocus:function(_a8){
_a8=_a8||"app-content";
var _a9=dojo.byId(_a8);
if(_a9){
_a9.focus();
}
},_showHideSkipLink:function(e){
var _aa=dojo.byId("skipLink");
if(_aa){
var _ab=_aa.parentNode;
if(e.type=="focus"&&_11.contains(_ab,"hidden")){
_11.remove(_ab,"hidden");
}else{
if(e.type=="blur"&&!_11.contains(_ab,"hidden")){
_11.add(_ab,"hidden");
}
}
}
},print:function(){
var _ac=_6("iframe.curam-iframe","app-content")[0];
console.log("PRINTING IFRAME:"+_ac);
if(_ac){
if(dojo.isIE<9){
_ac.contentWindow.document.execCommand("print",false,null);
}else{
_ac.contentWindow.print();
}
}else{
window.print();
}
}});
});
