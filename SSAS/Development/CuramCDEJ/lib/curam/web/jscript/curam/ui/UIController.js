//>>built
define("curam/ui/UIController",["dojo/_base/lang","dojo/json","curam/util/Request","curam/define","curam/util/RuntimeContext","curam/tab/TabDescriptor","curam/util/ui/ApplicationTabbedUiController","curam/util/ResourceBundle"],function(_1,_2,_3){
dojo.requireLocalization("curam.application","Debug");
var _4=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.ui.UIController",{TAB_TOPIC:"/app/tab",ROOT_OBJ:"curam.ui.UIController",PAGE_ASSOCIATIONS:{},RESOLVE_PAGES:{},PAGE_ID_PARAM_NAME:"o3pid",COMMAND_PARAM_NAME:"o3c",CACHE_BUSTER:0,CACHE_BUSTER_PARAM_NAME:"o3nocache",DUPLICATE_TAB_MAPPING_ERROR:"dupTabError",UNASSOCIATED_SHORTCUT_ERROR:"looseShortcutError",LOAD_MASK_TIMEOUT:15000,TABS_INFO_MODAL_TITLE_PROP_NAME:"title.info",TABS_ERROR_MODAL_TITLE_PROP_NAME:"title.error",TABS_INFO_MODAL_MSG_PROP_NAME:"message.max.tabs.info",TABS_ERROR_MODAL_MSG_PROP_NAME:"message.max.tabs.error",TABS_MSG_PLACEHOLDER_MAX_TABS:-1,MAX_NUM_TABS:-1,MAX_TABS_MODAL_SIZE:"width=470,height=80",initialize:function(_5){
curam.ui.UIController._log("curam.ui.UIController.initialize()");
curam.ui.UIController._log("dojo.isQuirks: "+dojo.isQuirks);
window.rootObject=curam.ui.UIController.ROOT_OBJ;
curam.util.subscribe(curam.ui.UIController.TAB_TOPIC,curam.ui.UIController.tabTopicHandler);
curam.util.subscribe("tab.title.name.set",curam.ui.UIController.setTabTitleAndName);
if(_5){
new curam.tab.TabSessionManager().init(_5);
}else{
new curam.tab.TabSessionManager().init();
}
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.event"));
},ajaxPostFailure:function(_6){
curam.ui.UIController._log("========= "+_4.getProperty("curam.ui.UIController.test")+" JSON "+_4.getProperty("curam.ui.UIController.servlet.failure")+" =========");
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.error")+" "+_6);
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.args")+" "+ioargs);
curam.ui.UIController._log("============================================");
},instantiateTab:function(_7,_8,_9){
var _a=dijit.byId(_8);
if(_a){
curam.util.getTopmostWindow().dojo.publish("/curam/application/tab/requested",[_8]);
var td=_a.tabDescriptor;
var _b="'"+td.tabID+"/"+_8+"'";
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.instantiating")+" "+_b+" "+_4.getProperty("curam.ui.UIController.with.signature"));
td.setTabSignature(_7,_a.uimPageRequest);
var _c=function(){
var _d=dojo.query("#"+_8+" .tab-wrapper .tab-load-mask")[0];
if(_d&&dojo.style(_d,"display")!="none"){
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.revealing")+" "+_b+" "+_4.getProperty("curam.ui.UIController.now"));
dojo.style(_d,"display","none");
curam.util.getTopmostWindow().dojo.publish("/curam/application/tab/revealed",[_8]);
}
};
if(!_9){
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.no.details"));
_c();
}else{
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.has.details")+_b+_4.getProperty("curam.ui.UIController.listeners"));
dojo.global.tabLoadMaskTimeout=setTimeout(_c,curam.ui.UIController.LOAD_MASK_TIMEOUT);
var _e=false;
var _f=function(){
if(_e){
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.panels.loaded"));
_c();
clearTimeout(dojo.global.tabLoadMaskTimeout);
}else{
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.panels.not.loaded")+" "+_b+" "+_4.getProperty("curam.ui.UIController.later"));
_e=true;
}
};
var _10=dojo.connect(_a,"onDownloadEnd",function(){
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.content.pane.loaded")+" "+_4.getProperty("curam.ui.UIController.reveal")+" "+_b+" "+_4.getProperty("curam.ui.UIController.now"));
_f();
dojo.disconnect(_10);
});
var _11=curam.util.getTopmostWindow().dojo.subscribe("/curam/frame/detailsPanelLoaded",function(_12,_13){
if(_8==_13){
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.details.panel.loaded")+" "+_b+" "+ +_4.getProperty("curam.ui.UIController.now"));
_f();
dojo.unsubscribe(_11);
}
});
}
var _14=curam.tab.getHandlerForTab(function(_15,_16){
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.content.pane.changed")+" "+_b+" "+_4.getProperty("curam.ui.UIController.now"));
curam.ui.UIController._contentPanelUpdated(_a);
},_8);
var _17=curam.util.getTopmostWindow().dojo.subscribe("/curam/main-content/page/loaded",null,_14);
curam.tab.unsubscribeOnTabClose(_17,_8);
}else{
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.tab.not.found")+" '"+_8+"'.");
}
},_contentPanelUpdated:function(tab){
var _18=curam.tab.getContentPanelIframe(tab);
tab.tabDescriptor.setTabContent(new curam.ui.PageRequest(_18.src),null);
},getCacheBusterParameter:function(){
return curam.ui.UIController.CACHE_BUSTER_PARAM_NAME+"="+new Date().getTime()+"_"+curam.ui.UIController.CACHE_BUSTER++;
},_getTabbedUiApi:function(_19){
var _1a=curam.ui.UIController._selectSection(_19);
return new curam.util.ui.ApplicationTabbedUiController(_1a);
},_selectSection:function(_1b){
var _1c=_1b?!_1b.openInBackground:true;
var _1d=dijit.byId(curam.tab.SECTION_TAB_CONTAINER_ID);
var _1e=_1b?_1b.tabDescriptor.sectionID:curam.tab.getCurrentSectionId();
var _1f=dijit.byId(_1e+"-sbc");
var _20=curam.tab.getTabContainer(_1e);
if(_1c){
if(_1f){
_1d.selectChild(_1f);
}else{
_1d.selectChild(_20);
}
}
return _20;
},tabTopicHandler:function(_21){
var api=curam.ui.UIController._getTabbedUiApi(_21);
curam.ui.UIController._doHandleTabEvent(_21,api);
},_doHandleTabEvent:function(_22,_23){
var _24=_22.tabDescriptor;
var _25=_24.sectionID;
var _26=curam.tab.getTabContainer(_25);
var _27=curam.util.getTopmostWindow().dojo;
var _28=false;
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.fired")+" "+_25+" : "+_24.tabID+" : "+_22.uimPageRequest.pageID);
var tab=_23.findOpenTab(_22);
if(tab===null&&_1.exists("selectedChildWidget.tabDescriptor.isHomePage",_26)&&_26.selectedChildWidget.tabDescriptor.isHomePage===true&&_26.selectedChildWidget.tabDescriptor.tabID===_22.tabDescriptor.tabID){
tab=_26.selectedChildWidget;
}
if(!tab){
if(_26==undefined){
return false;
}
var _29=_26.getChildren().length+1;
var _2a=this.MAX_NUM_TABS;
var _2b=this._checkMaxNumOpenTabsExceeded(_2a,_29);
if(_2b){
return true;
}
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.creating"));
tab=_23.createTab(_22);
tab.connect(tab,"onLoad",function(){
var _2c=curam.tab.getContentPanelIframe(tab);
dojo.attr(_2c,"src",dojo.attr(_2c,"data-content-url"));
_27.publish("/curam/application/tab/ready",[tab]);
});
_28=true;
}
if(_28){
var _2d=_23.insertTabIntoApp(tab,_22.uimPageRequest.isHomePage);
if(!_22.openInBackground){
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.new.fore.tab"),tab.tabDescriptor);
_23.selectTab(tab);
if(_2d!=null){
_23.selectTab(_2d);
}
}else{
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.new.back.tab"),tab.tabDescriptor);
}
this._checkMaxNumOpenTabsReached(_2a,_29);
}else{
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.show.page"),tab.tabDescriptor);
_23.selectTab(tab);
if(_22.uimPageRequest.justRefresh){
_23.refreshExistingPageInTab(tab);
}else{
if(_22.uimPageRequest.forceLoad){
_23.openPageInCurrentTab(_22.uimPageRequest);
}else{
var _2e=tab.tabDescriptor;
var _2f=_2e.tabID==_22.tabDescriptor.tabID&&_2e.matchesPageRequest(_22.uimPageRequest);
var _30=_2e.tabContent.pageID==_22.uimPageRequest.pageID;
if(_2f&&!_30){
_23.openPageInCurrentTab(_22.uimPageRequest);
}
}
}
}
return true;
},_checkMaxNumOpenTabsReached:function(_31,_32){
if(_32==_31){
this.TABS_MSG_PLACEHOLDER_MAX_TABS=_31;
curam.util.openGenericErrorModalDialog(this.MAX_TABS_MODAL_SIZE,this.TABS_INFO_MODAL_TITLE_PROP_NAME,this.TABS_INFO_MODAL_MSG_PROP_NAME,this.TABS_MSG_PLACEHOLDER_MAX_TABS,false);
return true;
}
},_checkMaxNumOpenTabsExceeded:function(_33,_34){
if(_34>_33){
this.TABS_MSG_PLACEHOLDER_MAX_TABS=_33;
curam.util.openGenericErrorModalDialog(this.MAX_TABS_MODAL_SIZE,this.TABS_ERROR_MODAL_TITLE_PROP_NAME,this.TABS_ERROR_MODAL_MSG_PROP_NAME,this.TABS_MSG_PLACEHOLDER_MAX_TABS,true);
return true;
}
},checkPage:function(_35,_36){
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.checking.page")+" '"+_35.pageID+"'.");
if(_35.pageID==""){
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.ignoring")+" "+_35.getURL());
return;
}
var _37=curam.ui.UIController._ensurePageAssociationInitialized(_35,function(){
if(curam.ui.UIController.isPageAssociationInitialized(_35.pageID,curam.ui.UIController.PAGE_ASSOCIATIONS)){
curam.ui.UIController.checkPage(_35,_36);
}else{
var msg=_4.getProperty("curam.ui.UIController.failed");
curam.ui.UIController._log(msg);
throw new Error(msg);
}
});
if(_37){
try{
var _38=curam.ui.UIController.getTabDescriptorForPage(_35.pageID,curam.ui.UIController.PAGE_ASSOCIATIONS);
if(_38!=null){
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.page.opened")+" '"+_35.pageID+"'. "+_4.getProperty("curam.ui.UIController.sec.id")+" '"+_38.sectionID+"'. "+_4.getProperty("curam.ui.UIController.tab.id")+" '"+_38.tabID+"'.");
if(_35.isHomePage){
_38.isHomePage=true;
}
_38.setTabContent(_35);
dojo.publish(curam.ui.UIController.TAB_TOPIC,[new curam.ui.OpenTabEvent(_38,_35)]);
}else{
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.page.id")+" '"+_35.pageID+"'.");
if(!_36){
if(typeof curam.tab.getSelectedTab()=="undefined"){
throw {name:curam.ui.UIController.UNASSOCIATED_SHORTCUT_ERROR,message:"ERROR:The requested page "+_35.pageID+" is not associated with any tab and there is no "+"tab to open it!"};
}
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.load"));
curam.ui.UIController._getTabbedUiApi().openPageInCurrentTab(_35);
}else{
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.unmapped"));
_36(_35);
}
}
}
catch(e){
if(e.name==curam.ui.UIController.DUPLICATE_TAB_MAPPING_ERROR){
alert(e.message);
curam.ui.UIController._getTabbedUiApi().openPageInCurrentTab(_35);
return null;
}else{
if(e.name==curam.ui.UIController.UNASSOCIATED_SHORTCUT_ERROR){
alert(e.message);
console.error(e.message);
return null;
}else{
throw e;
}
}
}
}
},isPageAssociationInitialized:function(_39,_3a){
var _3b=_3a[_39];
return !(typeof _3b=="undefined");
},_ensurePageAssociationInitialized:function(_3c,_3d){
if(!curam.ui.UIController.isPageAssociationInitialized(_3c.pageID,curam.ui.UIController.PAGE_ASSOCIATIONS)){
var _3e="/config/tablayout/associated["+_3c.pageID+"]["+USER_APPLICATION_ID+"]";
new curam.ui.ClientDataAccessor().getRaw(_3e,function(_3f){
curam.ui.UIController.initializePageAssociations(_3c,_3f);
_3d();
},function(_40,_41){
var msg=curam_ui_UIController_data_error+" "+_40;
curam.ui.UIController._log(msg);
if(!curam.ui.UIController._isLoginPage(_41.xhr)){
alert(msg);
}
curam.util.getTopmostWindow().location.reload(true);
},null);
return false;
}
return true;
},_isLoginPage:function(_42){
return _42.responseText.indexOf("action=\"j_security_check\"")>0;
},initializePageAssociations:function(_43,_44){
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.got.assoc")+" '"+_43.pageID+"'.");
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.assoc"),_44);
if(_44){
if(_44.tabIDs&&_44.tabIDs.length>0){
curam.ui.UIController.PAGE_ASSOCIATIONS[_43.pageID]=_44;
}else{
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.no.mappings")+" '"+_43.pageID+"'.");
curam.ui.UIController.PAGE_ASSOCIATIONS[_43.pageID]=null;
}
}else{
throw "initializePageAssociations did not recieve a valid response.";
}
},getTabDescriptorForPage:function(_45,_46){
var _47=_46[_45];
if(!curam.ui.UIController.isPageAssociationInitialized(_45,_46)){
throw "Page associations have not been initialized for: "+_45;
}
if(_47!=null){
var _48=curam.ui.UIController.getTabFromMappings(_47.tabIDs,curam.tab.getSelectedTab());
return new curam.tab.TabDescriptor(_47.sectionID,_48);
}else{
return null;
}
},getTabFromMappings:function(_49,_4a){
if(!_4a){
if(_49.length==1){
return _49[0];
}else{
if(_49.length>1){
throw "Home page mapped to multiple tabs";
}
}
}
var _4b=_4a.tabDescriptor.tabID;
for(var i=0;i<_49.length;i++){
if(_4b==_49[i]){
return _4b;
}
}
if(_49.length==1){
return _49[0];
}else{
if(_49.length>1){
throw {name:curam.ui.UIController.DUPLICATE_TAB_MAPPING_ERROR,message:"ERROR: The page that you are trying to link to is associated with "+"multiple tabs: ["+_49.toString()+"]. Therefore the "+"tab to open cannot be determined and the page will open in the "+"current tab. Please report this error.",tabID:_4b};
}else{
}
}
},handleUIMPageID:function(_4c,_4d){
var _4e=_4d?true:false;
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.handling.uim")+" '"+_4c+"'. Page is "+(_4e?"":"not ")+_4.getProperty("curam.ui.UIController.default.sec"));
curam.ui.UIController.handlePageRequest(new curam.ui.PageRequest(_4c+"Page.do",_4e));
},processURL:function(url){
var _4f=new curam.ui.PageRequest(url);
curam.ui.UIController.handlePageRequest(_4f);
},handlePageRequest:function(_50){
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.handling.page")+" '"+_50.pageID+"'. "+_4.getProperty("curam.ui.UIController.panel.will")+(_50.forceRefresh?"":_4.getProperty("curam.ui.UIController.not"))+_4.getProperty("curam.ui.UIController.reload"));
var _51=curam.ui.UIController.checkResolvePage(_50,_50.forceRefresh);
if(_51==true){
curam.ui.UIController.checkPage(_50);
}
},checkResolvePage:function(_52,_53){
if(_53){
return true;
}
var _54=curam.ui.UIController.RESOLVE_PAGES[_52.pageID];
if(_54==false){
return true;
}else{
var _55;
if(_52.getURL().indexOf("?")==-1){
_55="?";
}else{
_55="&";
}
var loc=curam.config?curam.config.locale+"/":"";
_3.post({url:loc+_52.getURL()+_55+"o3resolve=true",handleAs:"text",preventCache:true,load:dojo.hitch(curam.ui.UIController,"resolvePageCheckSuccess",_52),error:dojo.hitch(curam.ui.UIController,"resolvePageCheckFailure",_52)});
return false;
}
},resolvePageCheckSuccess:function(_56,_57,_58){
var _59=false;
var _5a;
var _5b;
var _5c;
if(_57.substring(2,0)=="{\""&&_57.charAt(_57.length-1)=="}"){
_59=true;
_57=_2.parse(_57,true);
_5a=_57.pageID;
_5b=_57.pageURL;
}else{
_59=false;
}
if(_59&&_56.pageID!=_5a){
curam.ui.UIController.RESOLVE_PAGES[_56.pageID]=true;
_5b=_5b.replace("&amp;o3resolve=true","");
_5b=_5b.replace("&o3resolve=true","");
_5b=_5b.replace("o3resolve=true","");
for(paramName in _56.cdejParameters){
if(paramName.length>0&&paramName.indexOf("__o3")!=-1){
if(_5b.indexOf("?")==-1){
_5b+="?"+paramName+"="+encodeURIComponent(_56.cdejParameters[paramName]);
}else{
_5b+="&"+paramName+"="+encodeURIComponent(_56.cdejParameters[paramName]);
}
}
}
_5c=new curam.ui.PageRequest(_5b);
}else{
curam.ui.UIController.RESOLVE_PAGES[_56.pageID]=false;
_5c=_56;
}
curam.ui.UIController.checkPage(_5c);
},resolvePageCheckFailure:function(_5d,_5e,_5f){
curam.ui.UIController.RESOLVE_PAGES[_5d.pageID]=false;
curam.ui.UIController.checkPage(_5d);
},setTabTitleAndName:function(_60,_61,_62){
var tab=curam.tab.getContainerTab(_60);
if(tab){
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.changing.tab")+" '"+_61+"', '"+_62+"'. "+_4.getProperty("curam.ui.UIController.descriptor.before"),tab.tabDescriptor);
dojo.query("span.detailsTitleText",tab.domNode)[0].innerHTML=_61;
var _63=dojo.query("span.detailsTitleText",tab.domNode)[0];
_63.setAttribute("title",_61);
tab.set("title",_62);
dojo.publish("tab.title.name.finished");
}else{
curam.ui.UIController._log(_4.getProperty("curam.ui.UIController.cannot.change")+" '"+_61+"', '"+_62+"'. "+_4.getProperty("curam.ui.UIController.iframe")+" '"+_60.id+"'.");
}
},handleLinkClick:function(_64,_65){
curam.ui.UIController._doHandleLinkClick(_64,_65,curam.tab.getContentPanelIframe(),curam.ui.UIController.handlePageRequest,curam.util.openModalDialog);
},_doHandleLinkClick:function(_66,_67,_68,_69,_6a){
var _6b=_66;
if(_68){
var rtc=new curam.util.RuntimeContext(_68.contentWindow);
var _6c=null;
if(_67){
_6c=[{key:"o3frame",value:"modal"}];
}
_6b=curam.util.setRpu(_66,rtc,_6c);
}
if(_67&&curam.config&&curam.config.modalsEnabled!="false"){
var _6d=_67.openDialogFunction||_6a;
var _6e=_67.args||[{href:_6b},_67.dialogOptions];
_6d.apply(this,_6e);
}else{
var _6f=new curam.ui.PageRequest(_6b);
_69(_6f);
}
},handleDownLoadClickLegacy:function(_70){
require(["dojo/io/iframe"]);
var _71=dojo.io.iframe.create("o3lrm_frame","");
_71.src=location.href.substring(0,location.href.lastIndexOf("/"))+decodeURIComponent(_70.replace(/\+/g," "));
return;
},handleDownLoadClick:function(_72){
var _73=curam.tab.getContentPanelIframe();
_73.src=location.href.substring(0,location.href.lastIndexOf("/"))+decodeURIComponent(_72.replace(/\+/g," "))+"&"+jsScreenContext.toRequestString();
return;
},_log:function(msg,_74){
if(curam.debug.enabled()){
curam.debug.log("UI CONTROLLER: "+msg+(_74?" "+dojo.toJson(_74):""));
}
}});
return curam.ui.UIController;
});
