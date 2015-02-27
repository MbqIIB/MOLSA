//>>built
define("curam/util/ContextPanel",["curam/util","curam/tab","curam/debug","curam/define","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.ContextPanel",{CONTENT_URL_ATTRIB:"data-content-url",setupLoadEventPublisher:function(_2,_3,_4){
curam.util.ContextPanel._doSetup(_2,_3,_4,function(_5){
return dijit.byId(_5);
});
},_doSetup:function(_6,_7,_8,_9){
var _a=curam.util.getTopmostWindow().dojo.subscribe(_6,function(){
var _b=_9(_7);
var _c=curam.util.ContextPanel._getIframe(_b);
curam.debug.log(_1.getProperty("curam.util.ContextPanel.loaded"));
curam.util.getTopmostWindow().dojo.publish("/curam/frame/detailsPanelLoaded",[{loaded:true},_7]);
_c._finishedLoading=true;
if(_c._scheduledRefresh){
curam.util.ContextPanel.refresh(_b);
_c._scheduledRefresh=false;
}
});
curam.util.onLoad.addSubscriber(_8,curam.util.ContextPanel.addTitle);
curam.tab.unsubscribeOnTabClose(_a,_7);
curam.tab.executeOnTabClose(function(){
curam.util.onLoad.removeSubscriber(_8,curam.util.ContextPanel.addTitle);
},_7);
},refresh:function(_d){
var _e=curam.util.ContextPanel._getIframe(_d);
if(_e){
curam.debug.log(_1.getProperty("curam.util.ContextPanel.refresh.prep"));
if(_e._finishedLoading){
curam.debug.log(_1.getProperty("curam.util.ContextPanel.refresh"));
_e._finishedLoading=false;
var _f=_e.contentDocument||_e.contentWindow.document;
_f.location.reload(true);
}else{
curam.debug.log(_1.getProperty("curam.util.ContextPanel.refresh.delay"));
_e._scheduledRefresh=true;
}
}
},_getIframe:function(tab){
var _10=dojo.query("iframe.detailsPanelFrame",tab.domNode);
return _10[0];
},addTitle:function(_11){
var _12=dojo.query("."+_11)[0];
var _13=_12.contentWindow.document.title;
_12.setAttribute("title",CONTEXT_PANEL_TITLE+" - "+_13);
},load:function(tab){
var _14=curam.util.ContextPanel._getIframe(tab);
if(_14){
var _15=dojo.attr(_14,curam.util.ContextPanel.CONTENT_URL_ATTRIB);
if(_15&&_15!="undefined"){
_14[curam.util.ContextPanel.CONTENT_URL_ATTRIB]=undefined;
dojo.attr(_14,"src",_15);
}
}
}});
var _16=curam.util.getTopmostWindow();
if(typeof _16._curamContextPanelTabReadyListenerRegistered!="boolean"){
_16.dojo.subscribe("/curam/application/tab/ready",null,function(_17){
curam.util.ContextPanel.load(_17);
});
_16._curamContextPanelTabReadyListenerRegistered=true;
}
return curam.util.ContextPanel;
});
