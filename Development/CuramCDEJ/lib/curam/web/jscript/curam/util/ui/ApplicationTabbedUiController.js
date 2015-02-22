//>>built
define("curam/util/ui/ApplicationTabbedUiController",["curam/debug","dojox/layout/ContentPane","curam/tab","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
var _2=dojo.declare("curam.util.ui.ApplicationTabbedUiController",null,{_tabContainer:null,constructor:function(_3){
this._tabContainer=_3;
},findOpenTab:function(_4){
var _5=_4.tabDescriptor;
var _6=curam.tab.getTabContainer(_5.sectionID);
var _7=null;
var _8=undefined;
var _9=undefined;
if(_6!=undefined){
_8=_6.getChildren();
_9=_6.selectedChildWidget;
}
if(_9){
var _a=_9.tabDescriptor;
this._log(_1.getProperty("curam.util.ui.ApplicationTabbedUiController.testing"));
if(_4.uimPageRequest.openInCurrentTab||(_a.tabID==_5.tabID&&_a.matchesPageRequest(_4.uimPageRequest))){
this._openInCurrentTab(_4.uimPageRequest);
_7=_9;
}
}
if(!_7&&_8){
var _b=true;
this._log(_1.getProperty("curam.util.ui.ApplicationTabbedUiController.searching")+" "+_8.length+" "+_1.getProperty("curam.util.ui.ApplicationTabbedUiController.tabs"));
for(var i=0;i<_8.length;i++){
var _c=_8[i];
var _d=_c.tabDescriptor;
if(_d&&_d.tabID==_5.tabID){
if((_b&&_d.tabSignature==_d.tabID)||_d.matchesPageRequest(_4.uimPageRequest)){
_7=_c;
break;
}
_b=false;
}
}
}
this._log(_1.getProperty("curam.util.ui.ApplicationTabbedUiController.searched")+" '"+_5.tabID+"'. "+_1.getProperty("curam.util.ui.ApplicationTabbedUiController.found")+" "+(_7?_1.getProperty("curam.util.ui.ApplicationTabbedUiController.a"):_1.getProperty("curam.util.ui.ApplicationTabbedUiController.no"))+" "+_1.getProperty("curam.util.ui.ApplicationTabbedUiController.match"));
return _7;
},openPageInCurrentTab:function(_e){
var _f=curam.tab.getSelectedTab();
var _10=undefined;
if(_f){
_10=dojo.query(".nav-panel",_f.domNode)[0];
}
if(_10){
var _11;
if(_e.getURL().indexOf("?")==-1){
_11="?";
}else{
_11="&";
}
var loc=curam.config?curam.config.locale:jsL;
var _12=jsBaseURL+"/"+loc+"/"+_e.getURL()+_11+curam.tab.getTabController().getCacheBusterParameter();
if(_e.pageHolder){
_e.pageHolder.location.href=_12;
}else{
var _13=dojo.query(".contentPanelFrame",_10)[0];
_13.src=_12;
}
}
},_openInCurrentTab:function(_14){
var _15=curam.tab.getSelectedTab();
var _16=undefined;
if(_15){
_16=dojo.query(".nav-panel",_15.domNode)[0];
}
if(_16){
var _17=dojo.query(".contentPanelFrame",_16)[0];
_14.cdejParameters["o3ctx"]="4096";
var loc=curam.config?curam.config.locale:jsL;
var url=loc+"/"+_14.getURL();
if(url.indexOf("?")==-1){
url+="?";
}else{
url+="&";
}
_17.src=url+curam.tab.getTabController().getCacheBusterParameter();
}
},refreshExistingPageInTab:function(tab){
var _18=curam.tab.getContentPanelIframe(tab);
_18.contentWindow.location.reload(true);
},selectTab:function(tab){
this._tabContainer.selectChild(tab);
},createTab:function(_19){
this._log("createTab(): "+_1.getProperty("curam.util.ui.ApplicationTabbedUiController.start"));
var _1a=_19.tabDescriptor;
var _1b="";
if(_1a.tabContent&&_1a.tabContent.tabName){
_1b=_1a.tabContent.tabName;
}
var cp=new dojox.layout.ContentPane({tabDescriptor:_1a,uimPageRequest:_19.uimPageRequest,title:_1b,closable:!_1a.isHomePage,preventCache:true,"class":"tab-content-holder dijitContentPane dijitHidden "+"dijitTabContainerTop-child "+"dijitTabContainerTop-dijitContentPane dijitTabPane",onDownloadStart:function(){
return "&nbsp;";
}});
var _1c=[];
_19.uimPageRequest.cdejParameters["o3ctx"]="4096";
var _1d=dojo.connect(cp,"onDownloadEnd",null,function(){
curam.util.fireTabOpenedEvent(cp.id);
});
_1c.push(_1d);
_1d=dojo.connect(cp,"destroy",null,function(){
curam.tab.doExecuteOnTabClose(cp.id);
});
_1c.push(_1d);
_1c.push(dojo.connect(cp,"destroy",function(){
dojo.forEach(_1c,dojo.disconnect);
}));
_1d=dojo.connect(cp,"set",function(_1e,_1f){
if(_1e=="title"&&arguments.length==2){
curam.debug.log(_1.getProperty("curam.util.ui.ApplicationTabbedUiController.title"));
cp.tabDescriptor.setTabContent(_19.uimPageRequest,_1f);
var _20=curam.tab.getSelectedTab();
if(_20){
var _21=_20.domNode.parentNode;
if(_21){
_21.focus();
}
}
}
});
_1c.push(_1d);
_1d=dojo.connect(cp,"onClose",function(){
new curam.tab.TabSessionManager().tabClosed(cp.tabDescriptor);
});
_1c.push(_1d);
var qs=_19.uimPageRequest.getQueryString();
var _22="TabContent.do"+"?"+curam.tab.getTabController().COMMAND_PARAM_NAME+"=PAGE&"+curam.tab.getTabController().PAGE_ID_PARAM_NAME+"="+_19.uimPageRequest.pageID+(qs.length>0?"&"+qs:"")+"&o3tabid="+_1a.tabID+"&o3tabWidgetId="+cp.id;
this._log(_1.getProperty("curam.util.ui.ApplicationTabbedUiController.href")+" "+_22);
cp.set("href",_22);
this._log(_1.getProperty("curam.util.ui.ApplicationTabbedUiController.finished")+" ",cp.tabDescriptor);
return cp;
},insertTabIntoApp:function(_23,_24){
var _25=null;
if(_24){
if(this._tabContainer.hasChildren()){
_25=this._tabContainer.selectedChildWidget;
}
this._tabContainer.addChild(_23,0);
}else{
this._tabContainer.addChild(_23);
}
return _25;
},_log:function(msg,_26){
if(curam.debug.enabled()){
curam.debug.log("curam.util.ui.ApplicationTabbedUiController: "+msg+(_26?" "+dojo.toJson(_26):""));
}
}});
return _2;
});
