//>>built
require({cache:{"url:curam/layout/resources/Dialog.html":"<div class=\"dijitDialog\" role=\"alertdialog\" aria-labelledby=\"${id}_title\">\r\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\r\n\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span>\r\n\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" aria-label=\"${closeModalText}\" tabIndex=\"0\" onKeyDown=\"curam.util.isShiftTab(event)\">\r\n\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\">${closeModalText}</span>\r\n\t</span>\r\n  <span id=\"${id}_prompt\" class=\"hidden\" data-dojo-attach-point=\"promptText\">${modalPromptText}</span>\r\n\t</div>\r\n\t\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\r\n</div>\r\n"}});
define("curam/ModalDialog",["dojo/text!curam/layout/resources/Dialog.html","dojo/dom-geometry","curam/util/external","dijit/Dialog","curam/dialog","curam/tab","curam/debug","curam/ModalUIMController","curam/util/RuntimeContext","curam/util/ResourceBundle"],function(_1,_2,_3){
dojo.requireLocalization("curam.application","Debug");
var _4=new curam.util.ResourceBundle("Debug");
var _5=dojo.declare("curam.ModalDialog",dijit.Dialog,{templateString:_1,autofocus:false,refocus:false,iframeHref:"",iframe:undefined,width:undefined,height:undefined,defaultWidth:600,closeModalText:LOCALISED_MODAL_CLOSE_BUTTON,modalPromptText:". "+LOCALISED_MODAL_SCREEN_READER_PROMPT+" .",maximumWidth:null,maximumHeight:null,_determinedWidth:null,_determinedHeight:null,_horizontalModalSpace:100,_verticalModalSpace:50,duration:5,parentWindow:undefined,isRegisteredForClosing:false,unsubscribes:undefined,modalconnects:undefined,onIframeLoadHandler:undefined,initialized:false,initDone:false,initUnsubToken:null,uimController:null,_helpIcon:null,_title:null,_isMobileUA:false,_isMobileUADialogPositioned:false,uimToken:undefined,postCreate:function(){
curam.debug.log("curam.ModalDialog.postCreate(): w=%s; h=%s",this.width?this.width:"not given",this.height?this.height:"not given");
this._destroyOldModals();
this._isMobileUA=curam.util.getTopmostWindow().curam.config.mobileUserAgent;
if(typeof (this._isMobileUA)!="boolean"){
this._isMobileUA=false;
}
this.draggable=!this._isMobileUA;
this.maximumWidth=dijit.getViewport().w-this._horizontalModalSpace;
this.maximumHeight=dijit.getViewport().h-this._verticalModalSpace;
if(jsScreenContext.hasContextBits("EXTAPP")){
this.maximumHeight-=this._verticalModalSpace;
}
this.inherited(arguments);
this.unsubscribes=[];
this.modalconnects=[];
this._isCDEJModal=(this.iframeHref.indexOf("CDEJ/popups")>-1||this.iframeHref.indexOf("frequency-editor.jsp")>-1);
dojo.style(this.domNode,"left","-10000px");
dojo.style(this.domNode,"top","1px");
dojo.style(this.domNode,"display","");
dojo.style(this.domNode,"visibility","hidden");
dojo.addClass(this.domNode,"modalDialog");
this._initParentWindowRef();
if(this.parentWindow){
curam.dialog.pushOntoDialogHierarchy(this.parentWindow);
}else{
curam.dialog.pushOntoDialogHierarchy(curam.util.getTopmostWindow());
}
this.unsubscribes.push(this.subscribe("/dnd/move/start",dojo.hitch(this,this._startDrag)));
this.unsubscribes.push(this.subscribe("/dnd/move/stop",function(){
var _6=dojo.query(".overlay-iframe")[0];
if(_6){
dojo.destroy(_6);
}
}));
this._registerInitListener();
var _7=dojo.subscribe("/curam/dialog/iframeUnloaded",this,function(_8,_9){
if(this.id==_8){
curam.debug.log(_4.getProperty("curam.ModalDialog.unload"),_8);
curam.dialog.removeFromDialogHierarchy(_9);
dojo.style(this.iframe,"visibility","hidden");
this.initDone=false;
this._registerInitListener();
}
});
this.unsubscribes.push(_7);
var _a=dojo.hitch(this,function(_b,_c){
curam.debug.log(_4.getProperty("curam.ModalDialog.load.init"),_b);
curam.util.onLoad.removeSubscriber(this._getEventIdentifier(),_a);
curam.dialog.pushOntoDialogHierarchy(this.iframe.contentWindow);
this._determineSize(_c);
this._setTabIndex(this.iframe,"0");
if(!this.isRegisteredForClosing){
var _d=curam.util.getTopmostWindow();
this.unsubscribes.push(_d.dojo.subscribe("/curam/dialog/close",this,function(_e){
if(this.id==_e){
curam.debug.log("/curam/dialog/close "+_4.getProperty("curam.ModalDialog.event.for"),_e);
this.hide();
}
}));
this.isRegisteredForClosing=true;
}
this.doShow(_c);
this._notifyModalDisplayed();
});
curam.util.onLoad.addSubscriber(this._getEventIdentifier(),_a);
var _f=true;
this.onLoadSubsequentHandler=dojo.hitch(this,function(_10,_11){
if(_f){
_f=false;
}else{
curam.debug.log(_4.getProperty("curam.ModalDialog.load"),_10);
if(!_11.modalClosing){
curam.dialog.pushOntoDialogHierarchy(this.iframe.contentWindow);
this._determineSize(_11);
this._position(true);
this.doShow(_11);
this._notifyModalDisplayed();
}else{
curam.debug.log(_4.getProperty("curam.ModalDialog.close"));
}
}
var _12=dojo.byId(_10);
var _13=_12.contentWindow.document.title;
_12.setAttribute("title",LOCALISED_MODAL_FRAME_TITLE+" - "+_13);
});
curam.util.onLoad.addSubscriber(this._getEventIdentifier(),this.onLoadSubsequentHandler);
this.unsubscribes.push(curam.util.getTopmostWindow().dojo.subscribe("/curam/dialog/iframeFailedToLoad",this,function(_14){
curam.util.onLoad.removeSubscriber(this._getEventIdentifier(),_a);
this._determineSize({height:450,title:"Error!"});
this.doShow();
this._notifyModalDisplayed();
}));
this.unsubscribes.push(curam.util.getTopmostWindow().dojo.subscribe("/curam/dialog/displayed",this,this._setFocusHandler));
this.unsubscribes.push(curam.util.getTopmostWindow().dojo.subscribe("/curam/dialog/displayed",this,function(_15){
if(_15==this.id){
curam.util.getTopmostWindow().dojo.publish("/curam/dialog/AfterDisplay",[_15]);
}
}));
this.unsubscribes.push(curam.util.getTopmostWindow().dojo.subscribe("/curam/dialog/displayed",this,function(){
curam.util._setModalCurrentlyOpening(false);
}));
var _16=function(_17){
return _17.indexOf(":")>0;
};
var _18=_16(this.iframeHref)?this.iframeHref:this._getBaseUrl(curam.util.getTopmostWindow().location.href)+jsL+"/"+this.iframeHref;
this.uimController=new curam.ModalUIMController({uid:this.id,url:_18,loadFrameOnCreate:false,inDialog:true,iframeId:this._getEventIdentifier(),width:this._calculateWidth(this.width)+"px",height:this.maximumHeight+"px"});
curam.debug.log("DEBUG: ModalDialog.js:postCreate(): uimController: "+this.uimController);
this.iframe=this.uimController.getIFrame();
curam.debug.log("DEBUG: ModalDialog.js:postCreate(): uimController.domNode: "+this.uimController.domNode);
this.modalconnects.push(dojo.connect(this,"onHide",this,this._onHideHandler));
this.set("content",this.uimController.domNode);
dojo.addClass(this.iframe,this._getEventIdentifier());
this.unsubscribes.push(curam.util.getTopmostWindow().dojo.subscribe("/curam/dialog/displayed",this,this._modalDisplayedHandler));
this.unsubscribes.push(curam.util.getTopmostWindow().dojo.subscribe("/curam/dialog/closed",this,this._modalClosedHandler));
this._registerOnIframeLoad(dojo.hitch(this,this._loadErrorHandler));
this.uimController.loadPage();
},hide:function(){
if(!this._alreadyInitialized){
return;
}
if(this._fadeInDeferred){
this._fadeInDeferred.cancel();
}
var _19=dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,function(){
this.domNode.style.display="none";
dijit.Dialog._DialogLevelManager.hide(this);
this._fadeOutDeferred.callback(true);
delete this._fadeOutDeferred;
})});
this._fadeOutDeferred=new dojo.Deferred(dojo.hitch(this,function(){
_19.stop();
delete this._fadeOutDeferred;
}));
dojo.hitch(this,"onHide")();
_19.play();
if(this._scrollConnected){
this._scrollConnected=false;
}
var h;
while(h=this._modalconnects.pop()){
h.remove();
}
if(this._relativePosition){
delete this._relativePosition;
}
this._set("open",false);
return this._fadeOutDeferred;
},_getBaseUrl:function(_1a){
var _1b=_1a.indexOf("?");
_1a=(_1b>-1)?_1a.substring(0,_1b):_1a;
var _1c=_1a.lastIndexOf("/");
return _1a.substring(0,_1c+1);
},_setupHelpIcon:function(_1d){
var _1e=typeof _1d!="undefined"?_1d.helpEnabled:false;
var _1f=_1e?_1d.helpExtension:"";
var _20=_1e?_1d.pageID:"";
var _21=dojo.query(".modalDialog span.dijitDialogCloseIcon");
for(var i=0;i<_21.length;i++){
if(_1e&&!this._helpIcon){
this._helpIcon=this._createHelpIcon("dijitDialogHelpIcon","dijitDialogHelpIcon-hover",_1f,_21[i]);
this._helpIcon.setAttribute("role","button");
this._setTabIndex(this._helpIcon,"0");
this._helpIcon.setAttribute("onKeyDown","curam.util.isShiftTab(event)");
this._helpIcon._enabled=false;
}
this._setTabIndex(_21[i],"0");
}
if(_1e&&this._helpIcon){
this._helpIcon._pageID=_20;
}
if((_1e&&this._helpIcon&&this._helpIcon._enabled)||(!_1e||!this._helpIcon||!this._helpIcon._enabled)){
return;
}
dojo.style(this._helpIcon,"display",_1e?"":"none");
this._helpIcon._enabled=_1e;
},_createHelpIcon:function(_22,_23,_24,_25){
var _26=dojo.create("span",{"class":_22,"waiRole":"presentation","title":LOCALISED_MODAL_HELP_ALT});
dojo.place(_26,_25,"before");
this.connect(_26,"onclick",function(){
var _27=curam.config?curam.config.locale:jsL;
var url;
url="./help.jsp?pageID="+this._helpIcon._pageID;
window.open(url);
});
this.connect(_26,"onkeypress",function(){
if(curam.util.enterKeyPress(event)){
var _28=curam.config?curam.config.locale:jsL;
var url;
url="./help.jsp?pageID="+this._helpIcon._pageID;
window.open(url);
}
});
if(_23){
this.connect(_26,"onmouseover",function(){
dojo.addClass(_26,_23);
});
this.connect(_26,"onmouseout",function(){
dojo.removeClass(_26,_23);
});
}
return _26;
},_registerInitListener:function(){
this.initUnsubToken=dojo.subscribe("/curam/dialog/init",this,function(){
dojo.publish("/curam/dialog/SetId",[this.id]);
this.initDone=true;
if(this.uimToken){
dojo.publish("/curam/dialog/uim/opened/"+this.uimToken,[this.id]);
}
dojo.unsubscribe(this.initUnsubToken);
});
},_getEventIdentifier:function(){
return "iframe-"+this.id;
},_registerOnIframeLoad:function(_29){
if(dojo.isIE&&dojo.isIE<9){
this.onIframeLoadHandler=dojo.hitch(this,function(){
if(typeof this.iframe!="undefined"&&typeof this.iframe.readyState!="undefined"&&this.iframe.readyState=="complete"){
_29();
}
});
this.iframe.attachEvent("onreadystatechange",this.onIframeLoadHandler);
}else{
this.modalconnects.push(dojo.connect(this.iframe,"onload",this,_29));
}
},_startDrag:function(_2a){
if(!this.iframe){
return;
}
if(_2a&&_2a.node&&_2a.node===this.domNode){
var _2b=dojo.create("div",{"class":"overlay-iframe"});
_2b.innerHTML="";
dojo.place(_2b,this.iframe,"before");
var _2c=dojo.contentBox(this.containerNode);
dojo.style(_2b,{width:_2c.w+"px",height:_2c.h+"px"});
var _2d=_2.getMarginBoxSimple(dijit._underlay.domNode);
var _2e={l:_2d.w-_2c.w-10,t:_2d.h-_2c.h-30};
this._moveable.onMove=function(_2f,_30,e){
_30.l=Math.max(5,Math.min(_30.l,_2e.l));
_30.t=Math.max(5,Math.min(_30.t,_2e.t));
dojo.dnd.Moveable.prototype.onMove.apply(this,[_2f,_30,e]);
};
}
},_loadErrorHandler:function(){
curam.debug.log(_4.getProperty("curam.ModalDialog.onload.notify"),this.iframe);
if(!this.initDone){
dojo.unsubscribe(this.initUnsubToken);
curam.debug.log(_4.getProperty("curam.ModalDialog.firing")+" /curam/dialog/iframeFailedToLoad "+_4.getProperty("curam.ModalDialog.for"),this.id);
curam.util.getTopmostWindow().dojo.publish("/curam/dialog/iframeFailedToLoad",[this.id]);
}else{
curam.debug.log("UIM "+_4.getProperty("curam.ModalDialog.onload.success"));
}
},_setFocusHandler:function(_31){
if(_31==this.id&&this.initDone){
curam.debug.log("curam.ModalDialog_setFocusHandler(): "+_4.getProperty("curam.ModalDialog.execute"),_31);
var _32=this.iframe.contentWindow;
var _33=_32.curam.util.doSetFocus();
if(!_33){
if(typeof _32.dijit=="object"&&typeof _32.dijit.focus=="function"){
_32.dijit.focus(this.iframe);
}else{
this.iframe.focus();
}
}
}
},_modalDisplayedHandler:function(_34){
if(_34==this.id){
curam.debug.log(_4.getProperty("curam.ModalDialog.dialog.open.1")+"("+this.id+")"+_4.getProperty("curam.ModalDialog.dialog.open.2"));
this._markAsActiveDialog(true);
}else{
if(!this.deactivatedBy){
curam.debug.log(_4.getProperty("curam.ModalDialog.dialog.deactivating.1")+"("+this.id+"),"+_4.getProperty("curam.ModalDialog.dialog.deactivating.2"),_34);
this._markAsActiveDialog(false);
this.deactivatedBy=_34;
}
}
},_modalClosedHandler:function(_35){
if(this.deactivatedBy==_35){
curam.debug.log(_4.getProperty("curam.ModalDialog.dialog.activating.1")+"("+this.id+"),"+_4.getProperty("curam.ModalDialog.dialog.activating.2"),_35);
this._markAsActiveDialog(true);
delete this.deactivatedBy;
}
},_destroyOldModals:function(){
require(["curam/dialog"]);
if(!curam.dialog.oldModalsToDestroy){
curam.dialog.oldModalsToDestroy=[];
}
dojo.forEach(curam.dialog.oldModalsToDestroy,function(_36){
_36._cleanupIframe();
_36.destroyRecursive();
});
curam.dialog.oldModalsToDestroy=[];
},_initParentWindowRef:function(){
if(!this.parentWindow){
var _37=null;
if(curam.tab.inTabbedUI()){
_37=curam.tab.getContentPanelIframe();
}else{
if(_3.inExternalApp()){
_37=_3.getUimParentWindow();
}
}
if(_37){
this.parentWindow=_37.contentWindow;
}
}else{
if(dojo.hasClass(this.parentWindow.frameElement,"detailsPanelFrame")){
var _38=curam.tab.getContentPanelIframe();
var _39=curam.util.getLastPathSegmentWithQueryString(_38.src);
_39=curam.util.removeUrlParam(_39,"__o3rpu");
curam.debug.log("o3rpu "+_4.getProperty("curam.ModalDialog.property"),encodeURIComponent(_39));
this.iframeHref=curam.util.replaceUrlParam(this.iframeHref,"__o3rpu",encodeURIComponent(_39));
this.parentWindow=_38.contentWindow;
}
}
},_notifyModalDisplayed:function(){
curam.debug.log(_4.getProperty("curam.ModalDialog.publishing")+" /curam/dialog/displayed "+_4.getProperty("curam.ModalDialog.for"),this.id);
curam.util.getTopmostWindow().dojo.publish("/curam/dialog/displayed",[this.id,{width:this._determinedWidth,height:this._determinedHeight}]);
},_markAsActiveDialog:function(_3a){
var _3b="curam-active-modal";
if(_3a){
dojo.addClass(this.iframe,_3b);
curam.debug.log(_4.getProperty("curam.ModalDialog.add.class"),[this.id,this.iframeHref]);
}else{
dojo.removeClass(this.iframe,_3b);
curam.debug.log(_4.getProperty("curam.ModalDialog.remove.class"),[this.id,this.iframe.src]);
}
},_setHrefAttr:function(_3c){
curam.debug.log("setHrefAttr");
this.iframeHref=_3c;
this.inherited(arguments);
},_setTabIndex:function(_3d,_3e){
_3d.setAttribute("tabIndex",_3e);
},_position:function(_3f){
curam.debug.log(_4.getProperty("curam.ModalDialog.position"));
if(this._isMobileUADialogPositioned==false&&(this.open||_3f)){
this.inherited(arguments);
if(this._isMobileUA==true){
this._isMobileUADialogPositioned=true;
}
}else{
curam.debug.log(_4.getProperty("curam.ModalDialog.ignoring")+" curam.ModalDialog_position");
}
},_calculateWidth:function(_40){
if(_40){
_40=new Number(_40);
if(!this._isCDEJModal&&typeof (G11N_MODAL_DIALOG_ADJUSTMENT_FACTOR)!="undefined"){
_40*=G11N_MODAL_DIALOG_ADJUSTMENT_FACTOR;
}
if(_40>this.maximumWidth){
curam.debug.log(_4.getProperty("curam.ModalDialog.specified.width.over"),this.maximumWidth);
return this.maximumWidth;
}else{
return Math.floor(_40);
}
}else{
var _41=this.defaultWidth;
if(!this._isCDEJModal&&typeof (G11N_MODAL_DIALOG_ADJUSTMENT_FACTOR)!="undefined"){
_41*=G11N_MODAL_DIALOG_ADJUSTMENT_FACTOR;
}
curam.debug.log(_4.getProperty("curam.ModalDialog.default.width"),_41);
if(_41>this.maximumWidth){
curam.debug.log(_4.getProperty("curam.ModalDialog.default.width.over"),this.maximumWidth);
return this.maximumWidth;
}else{
return Math.floor(_41);
}
}
},_calculateHeight:function(_42,_43){
if(_42){
_42=new Number(_42);
if(_42>this.maximumHeight){
curam.debug.log("specified height exceeds available space, "+"overriding with max available height of ",this.maximumHeight);
return this.maximumHeight;
}else{
if(_42<modalMinimumHeight){
curam.debug.log(_4.getProperty("curam.ModalDialog.specified.height.over.1"),modalMinimumHeight);
return modalMinimumHeight;
}else{
return _42;
}
}
}else{
curam.debug.log(_4.getProperty("curam.ModalDialog.no.height"),_43);
if(_43>this.maximumHeight){
curam.debug.log(_4.getProperty("curam.ModalDialog.calculated.height.over.1"),this.maximumHeight);
return this.maximumHeight;
}else{
if(_43<modalMinimumHeight){
curam.debug.log(_4.getProperty("curam.ModalDialog.calculated.height.over.2"),modalMinimumHeight);
return modalMinimumHeight;
}else{
return _43;
}
}
}
},_determineSize:function(_44){
var _45=_44.height;
var _46=_44.windowOptions;
curam.debug.log(_4.getProperty("curam.ModalDialog.size"));
try{
var w=this._calculateWidth(this.width);
var h=this._calculateHeight(this.height,_45);
if(_46){
if(_46["width"]||_46["height"]){
curam.debug.log(_4.getProperty("curam.ModalDialog.options"));
w=this._calculateWidth(_46["width"]);
h=this._calculateHeight(_46["height"],_45);
}
}
curam.debug.log("curam.ModalDialog:_determineSize() %s x %s",w,h);
this.uimController.setDimensionsForModalDialog(w,h,_44);
this._determinedWidth=w;
this._determinedHeight=h;
this.setTitle(_44,w);
}
catch(e){
curam.debug.log("curam.ModalDialog:_determineSize() : "+_4.getProperty("curam.ModalDialog.error")+dojo.toJson(e));
}
},setTitle:function(_47,_48){
var _49=_47.title;
if(!_49){
curam.debug.log("curam.ModalDialog.setTitle() - "+_4.getProperty("curam.ModalDialog.no.title"));
_49="";
}
var _4a=_47.messageTitleAppend;
curam.debug.log("curam.ModalDialog.setTitle('%s')",_49);
var _4b=_49.indexOf(_4a);
if(_4b!=-1){
var _4c=dojo.create("span",{innerHTML:_4a,"class":"messagesPresent"});
_49=_49.split(_4a).join("<span class=\"messagesPresent\">"+_4a+"</span>");
}
this.titleNode.innerHTML=_49;
dojo.style(this.titleBar,{width:_48+"px",height:21+"px"});
dojo.style(this.titleNode,"width",Math.ceil(_48*0.85)+"px");
},doShow:function(_4d){
curam.debug.log("curam.ModalDialog.doShow(): "+_4.getProperty("curam.ModalDialog.show"));
if(!this.initialized){
this.initialized=true;
}
this._setupHelpIcon(_4d);
this.show();
dojo.style(this.iframe,"visibility","visible");
dojo.style(this.domNode,{visibility:"visible"});
},_onHideHandler:function(){
curam.util.getTopmostWindow().dojo.publish("/curam/dialog/BeforeClose",[this.id]);
dojo.style(this.domNode,{visibility:"hidden",display:"block"});
require(["curam/dialog"]);
curam.dialog.removeFromDialogHierarchy(this.iframe.contentWindow);
curam.dialog.removeFromDialogHierarchy(this.parentWindow);
var _4e=curam.util.getTopmostWindow();
_4e.dojo.publish("/curam/dialog/closed",[this.id]);
dojo.unsubscribe(this.initUnsubToken);
dojo.forEach(this.unsubscribes,_4e.dojo.unsubscribe);
this.unsubscribes=[];
dojo.forEach(this.modalconnects,dojo.disconnect);
this.modalconnects=[];
if(dojo.isIE&&dojo.isIE<9){
this.iframe.detachEvent("onreadystatechange",this.onIframeLoadHandler);
}
curam.util.onLoad.removeSubscriber(this._getEventIdentifier(),this.onLoadSubsequentHandler);
if(this._explodeNode&&this._explodeNode.parentNode){
this._explodeNode.parentNode.removeChild(this._explodeNode);
}
curam.debug.log(_4.getProperty("curam.ModalDialog.deactivating",[this.id]));
this._markAsActiveDialog(false);
if(typeof this.parentWindow!="undefined"&&this.parentWindow!=null){
this.parentWindow.focus();
}
delete this.parentWindow;
curam.dialog.oldModalsToDestroy.push(this);
},_cleanupIframe:function(){
delete this.content;
delete this.uimController;
var _4f=this.iframe;
_4f.src="";
delete this.iframe;
dojo.destroy(_4f);
}});
return _5;
});
