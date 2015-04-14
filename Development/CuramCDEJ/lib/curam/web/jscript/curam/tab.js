//>>built
define("curam/tab",["curam/define","curam/util","curam/util/ScreenContext"],function(){
curam.define.singleton("curam.tab",{SECTION_TAB_CONTAINER_ID:"app-sections-container-dc",SMART_PANEL_IFRAME_ID:"curam_tab_SmartPanelIframe",toBeExecutedOnTabClose:[],_mockSelectedTab:null,getSelectedTab:function(_1){
if(curam.tab._mockSelectedTab){
return curam.tab._mockSelectedTab;
}
if(curam.tab.getTabContainer(_1)){
return curam.tab.getTabContainer(_1).selectedChildWidget;
}
},getTabContainer:function(_2){
return curam.tab.getTabContainerFromSectionID(_2||curam.tab.getCurrentSectionId());
},getCurrentSectionId:function(_3){
var _4=curam.util.getTopmostWindow().dijit.byId(curam.tab.SECTION_TAB_CONTAINER_ID);
if(_4){
var _5=_4.selectedChildWidget.domNode.id;
return _5.substring(0,_5.length-4);
}else{
if(!_3){
throw new Error("curam.tab.getCurrentSectionId() - application section"+" tab container not found");
}
}
return null;
},inTabbedUI:function(){
return curam.tab.getCurrentSectionId(true)!=null;
},getTabContainerFromSectionID:function(_6){
var _7=dijit.byId(_6+"-stc");
if(!_7&&window.parent&&window.parent!=window){
_7=curam.util.getTopmostWindow().dijit.byId(_6+"-stc");
}
return _7;
},getTabWidgetId:function(_8){
return _8.id;
},getSelectedTabWidgetId:function(){
return curam.tab.getTabWidgetId(curam.tab.getSelectedTab());
},getContainerTab:function(_9){
var _a=dijit.getEnclosingWidget(_9);
if(_a&&!_a.tabDescriptor){
_a=curam.tab.getContainerTab(_a.domNode.parentNode);
}
if(!_a||!_a.tabDescriptor){
throw "Containing tab widget could not be found for node: "+_9;
}
return _a;
},getContentPanelIframe:function(_b){
var _c=_b?_b:curam.tab.getSelectedTab(),_d=null;
if(_c){
_d=dojo.query("iframe",_c.domNode).filter(function(_e){
return dojo.attr(_e,"iscpiframe")=="true";
})[0];
}
return _d?_d:null;
},refreshMainContentPanel:function(_f){
var _10=curam.tab.getContentPanelIframe(_f);
_10.contentWindow.curam.util.publishRefreshEvent();
_10.contentWindow.location.reload(true);
},getSmartPanelIframe:function(tab){
var _11=tab?tab:curam.tab.getSelectedTab();
var _12=dojo.query("iframe",_11.domNode).filter(function(_13){
return _13.id==curam.tab.SMART_PANEL_IFRAME_ID;
})[0];
return _12;
},unsubscribeOnTabClose:function(_14,_15){
curam.tab.toBeExecutedOnTabClose.push(function(_16){
if(_15==_16){
dojo.unsubscribe(_14);
return true;
}
return false;
});
},executeOnTabClose:function(_17,_18){
curam.tab.toBeExecutedOnTabClose.push(function(_19){
if(_18==_19){
_17();
return true;
}
return false;
});
},doExecuteOnTabClose:function(_1a){
var _1b=new Array();
for(var i=0;i<curam.tab.toBeExecutedOnTabClose.length;i++){
var _1c=curam.tab.toBeExecutedOnTabClose[i];
if(!_1c(_1a)){
_1b.push(_1c);
}
}
curam.tab.toBeExecutedOnTabClose=_1b;
},getHandlerForTab:function(_1d,_1e){
return function(_1f,_20){
if(_20==_1e){
_1d(_1f,_1e);
}else{
}
};
},getTabController:function(){
return curam.util.getTopmostWindow().curam.ui.UIController;
},initTabLinks:function(_21){
if(typeof (window.pageContainsClassicIEG)!="undefined"&&window.pageContainsClassicIEG==true){
return;
}
dojo.query("a").forEach(function(_22){
if(_22.href.indexOf("#")!=0&&_22.href.indexOf("javascript:")!=0&&(_22.href.indexOf("Page.do")>-1||_22.href.indexOf("Frame.do")>-1)){
if(_22.href.indexOf("&o3ctx")<0&&_22.href.indexOf("?o3ctx")<0){
var _23=(_22.href.indexOf("?")>-1)?"&":"?";
_22.href+=_23+jsScreenContext.toRequestString();
}
}
});
elements=document.forms;
for(var i=0;i<elements.length;++i){
elem=elements[i];
var _24=dojo.byId("o3ctx");
if(!_24){
var ctx=new curam.util.ScreenContext();
ctx.setContextBits("ACTION");
dojo.create("input",{"type":"hidden","name":"o3ctx","value":ctx.getValue()},elem);
}
dojo.create("input",{"type":"hidden","name":"o3prv","value":jsPageID},elem);
}
if(elements.length>0){
curam.util.getTopmostWindow().dojo.publish("curam.fireNextRequest",[]);
}
},initContent:function(_25,_26){
var _27=dojo.byId("content");
dojo.removeClass(_27,"hidden-panel");
return;
},setupSectionSelectionListener:function(){
dojo.subscribe(curam.tab.SECTION_TAB_CONTAINER_ID+"-selectChild",curam.tab.onSectionSelected);
},onSectionSelected:function(_28){
if(_28.curamDefaultPageID){
var _29;
if(_28.id.substring(_28.id.length-4,_28.id.length)=="-sbc"){
var _2a=_28.id.substring(0,_28.id.length-4);
_29=curam.tab.getTabContainer(_2a);
}else{
_29=_28;
}
if(_29&&_29.getChildren().length==0){
curam.tab.getTabController().handleUIMPageID(_28.curamDefaultPageID,true);
}
return true;
}
return false;
},setSectionDefaultPage:function(_2b,_2c){
var _2d=dijit.byId(_2b);
if(_2d){
_2d.curamDefaultPageID=_2c;
}else{
throw "curam.tab.setSectionDefaultPage() - cannot find section dijit ID:"+_2b;
}
},publishSmartPanelContentReady:function(){
var _2e="smartpanel.content.loaded";
var _2f=window.frameElement;
_2f.setAttribute("_SPContentLoaded","true");
curam.util.getTopmostWindow().dojo.publish(_2e,[_2f]);
}});
return curam.tab;
});
