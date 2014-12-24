//>>built
define("curam/contentPanel",["curam/util","curam/tab","curam/define","curam/debug","curam/ui/PageRequest"],function(cu,ct){
curam.define.singleton("curam.contentPanel",{initSmartPanelExpListPageLoadListener:function(){
if(!cu.getTopmostWindow().dojo.body()._spListenerInitialized){
cu.getTopmostWindow().dojo.subscribe("expandedList.pageLoaded",curam.contentPanel.smartPanelExpListPageLoadListener);
cu.getTopmostWindow().dojo.body()._spListenerInitialized="true";
}
},smartPanelExpListPageLoadListener:function(_1){
if(ct.getSmartPanelIframe()){
curam.contentPanel.checkSmartPanelLoaded(_1,"ExpandedList.TabContentArea.Reloaded");
}
},publishSmartPanelExpListPageLoad:function(_2){
if(ct.getSmartPanelIframe()){
cu.getTopmostWindow().dojo.publish("expandedList.pageLoaded",[_2.contentWindow.location.href]);
}
},setupOnLoad:function(_3,_4){
curam.debug.log("curam.contenPanel: setupOnLoad: "+_3+" "+_4);
curam.contentPanel.initSmartPanelExpListPageLoadListener();
var _5=curam.contentPanel.iframeOnloadHandler;
cu.onLoad.addSubscriber(_3,_5);
curam.contentPanel.targetSmartPanel(_3,_4);
ct.executeOnTabClose(function(){
cu.onLoad.removeSubscriber(_3,_5);
},_4);
},iframeOnloadHandler:function(_6,_7){
var _8=ct.getContainerTab(dojo.query("iframe."+_6)[0]);
var _9=ct.getTabWidgetId(_8);
var _a=dojo.byId(_6);
var _b=_a.contentWindow.document.title;
if(_b==""){
var _c=curam.util.iframeTitleFallBack();
_a.contentWindow.document.title=_c;
}
dojo.attr(_a,"title",CONTENT_PANEL_TITLE+" - "+curam.util.iframeTitleFallBack());
dojo.attr(_a,"data-done-loading",true);
cu.Refresh.getController(_9).pageLoaded(_7.pageID,cu.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN);
dojo.publish("/curam/main-content/page/loaded",[_7.pageID,_9]);
},spOnLoadHandler:function(_d,_e){
var _f=dojo.query("."+_d)[0];
curam.contentPanel.checkSmartPanelLoaded(_f.src,"TabContentArea.Reloaded");
},checkSmartPanelLoaded:function(url,_10){
var _11=ct.getSmartPanelIframe();
var _12=dojo.attr(_11,"iframeLoaded");
if(_12=="true"){
curam.contentPanel.smartPanelPublisher(_11,url,_10);
}else{
var _13=curam.tab.getContainerTab(_11);
var _14=curam.tab.getTabWidgetId(_13);
var _15=dojo.subscribe("smartPanel.loaded",function(_16){
if(_16!=_11){
return;
}
curam.contentPanel.smartPanelPublisher(_11,url,_10);
});
curam.tab.unsubscribeOnTabClose(_15,_14);
}
},smartPanelPublisher:function(_17,url,_18){
var _19=new curam.ui.PageRequest(url);
_17.contentWindow.dojo.publish("contentPane.targetSmartPanel",[{"eventType":_18,"pageId":_19.pageID,"parameters":_19.parameters}]);
},targetSmartPanel:function(_1a,_1b){
curam.debug.log("curam.contentPanel:targetSmartPanel(): "+_1a+" "+_1b);
var _1c=ct.getSmartPanelIframe();
var _1d=_1b;
if(_1c){
var _1e=curam.util.onLoad.defaultGetIdFunction(_1c);
var _1f=dojo.subscribe("expandedList.toggle",function(_20,_21,_22){
if(_1d===_22){
curam.contentPanel.checkSmartPanelLoaded(_21.url,_21.eventType);
}
});
var _23=curam.contentPanel.spOnLoadHandler;
cu.onLoad.addSubscriber(_1a,_23);
ct.executeOnTabClose(function(){
dojo.unsubscribe(_1f);
cu.onLoad.removeSubscriber(_1a,_23);
cu.onLoad.removeSubscriber(_1e,curam.smartPanel._handleSmartPanelLoad);
},_1b);
}
}});
return curam.contentPanel;
});
