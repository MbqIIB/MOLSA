//>>built
define("curam/tab/TabSessionManager",["curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
var _2=dojo.declare("curam.tab.TabSessionManager",null,{init:function(_3){
if(_3){
this._directBrowseURL=_3;
}
new curam.ui.ClientDataAccessor().getRaw("/data/tab/get",dojo.hitch(this,this._restoreTabSession),dojo.hitch(this,this._handleGetTabFailure));
},_handleGetTabFailure:function(_4,_5){
var _6=curam.tab.getTabContainer();
var _7=dojo.toJson(_4);
this._log(_1.getProperty("curam.tab.TabSessionManager.error")+_7);
var _8=new dojox.layout.ContentPane({title:"Error",closable:true,content:"An error occurred. Try refreshing the browser or contact your "+"administrator if it persists. Error: "+_4.message});
_6.addChild(_8);
},_restoreTabSession:function(_9,_a){
var _b=[];
var _c=[];
var _d=[];
curam.tab.getTabController().MAX_NUM_TABS=_9.maxTabs;
var _e=this._isNewSession();
var _f=_e?null:this._getPrevSelectedTab();
var _10=this._getHomePageTab();
_f=_f?_f:_10;
this.tabSelected(_f);
_d[_10.sectionID]=true;
if(_9&&_9.tabs&&_9.tabs.length>0){
var _11=_9.tabs;
this._log(_1.getProperty("curam.tab.TabSessionManager.previous")+_11.length+" "+_1.getProperty("curam.tab.TabSessionManager.tabs"));
for(var i=0;i<_11.length;i++){
var _12=curam.tab.TabDescriptor.fromJson(_11[i]);
if(_12.tabSignature==_10.tabSignature){
if(!_e){
if(this._directBrowseURL){
_f=_12;
}else{
_10=_12;
}
}
}else{
if(_12.sectionID==_f.sectionID){
_b.push(_12);
}else{
_c.push(_12);
}
}
_d[_12.sectionID]=true;
}
if(_10.sectionID==_f.sectionID){
_b.unshift(_10);
}else{
_c.unshift(_10);
}
}else{
this._log(_1.getProperty("curam.tab.TabSessionManager.no.session"));
_b.push(_10);
}
this._restoreSectionTabs(_b,_f);
this._restoreSectionTabs(_c,null);
this._selectedTD=_f;
this._connectSelectionListeners(_d);
if(this._directBrowseURL){
var _13=this._createDirectBrowseClosure();
var _14=curam.util.getTopmostWindow();
var _15=_14.dojo.subscribe("/curam/main-content/page/loaded",null,function(_16,_17){
var _18=_13.getThis();
var _19=_18._directBrowseURL;
var _1a=_18._selectedTD.tabContent.pageID;
if(_16===_1a){
require(["curam/util/Navigation"],function(nav){
nav.goToUrl(_19);
});
_18._selectedTD.tabContent.pageID=_19.replace(/Page.do\??.*/,"");
_18.tabSelected(_18._selectedTD);
dojo.unsubscribe(_15);
}
});
}
},_createDirectBrowseClosure:function(){
var _1b=this;
return {getThis:function(){
return _1b;
}};
},_restoreSectionTabs:function(_1c,_1d){
this._log(_1.getProperty("curam.tab.TabSessionManager.saved.tabs"));
for(var i=0;i<_1c.length;i++){
var _1e=_1c[i];
this._log(_1.getProperty("curam.tab.TabSessionManager.saved.tab"),_1e,i);
dojo.publish(curam.tab.getTabController().TAB_TOPIC,[new curam.ui.OpenTabEvent(_1e,null,this._isOpenInBackground(_1e,_1d,i))]);
}
},_connectSelectionListeners:function(_1f){
var _20=false;
for(var _21 in _1f){
if(curam.tab.getTabContainer(_21)){
dojo.subscribe(curam.tab.getTabContainer(_21).id+"-selectChild",dojo.hitch(this,this.tabContentPaneSelected));
_20=true;
}
}
dojo.subscribe(curam.tab.SECTION_TAB_CONTAINER_ID+"-selectChild",dojo.hitch(this,this.tabSectionSelected));
return _20;
},tabUpdated:function(_22){
this._log(_1.getProperty("curam.tab.TabSessionManager.saving.tab"),_22);
new curam.ui.ClientDataAccessor().set("/data/tab/update",_22.toJson());
},tabClosed:function(_23){
this._log(_1.getProperty("curam.tab.TabSessionManager.tab.closed"),_23);
new curam.ui.ClientDataAccessor().set("/data/tab/close",_23.toJson());
},tabSelected:function(_24){
this._log(_1.getProperty("curam.tab.TabSessionManager.selected.tab"),_24);
if(_24.tabSignature){
curam.util.runStorageFn(function(){
var _25=curam.util.getTopmostWindow().dojox;
_25.storage.put(curam.tab.TabSessionManager.SELECTED_TAB_KEY,_24.toJson());
});
this._log(_1.getProperty("curam.tab.TabSessionManager.recorded"),_24);
}else{
this._log(_1.getProperty("curam.tab.TabSessionManager.not.recorded"),_24);
}
},tabContentPaneSelected:function(_26){
if(_26.tabDescriptor){
this.tabSelected(_26.tabDescriptor);
}else{
this._log(_1.getProperty("curam.tab.TabSessionManager.no.descriptor"));
}
},tabSectionSelected:function(_27){
var _28=false;
if(_27){
var id=_27.id;
this._log(_1.getProperty("curam.tab.TabSessionManager.new.section")+" '"+id+"'.");
var _29=id.substring(0,id.length-4);
var _2a=curam.tab.getSelectedTab(_29);
if(_2a){
this._log(_1.getProperty("curam.tab.TabSessionManager.changing.selection"));
this.tabContentPaneSelected(_2a);
_28=true;
}else{
this._log(_1.getProperty("curam.tab.TabSessionManager.not.changing.selection"));
}
}else{
this._log(_1.getProperty("curam.tab.TabSessionManager.no.container"));
}
return _28;
},_isNewSession:function(){
var _2b=this._getJSessionID();
if(!_2b){
return true;
}
var _2c=curam.util.getTopmostWindow().dojox;
var _2d=_2c.encoding.digests.SHA1(_2b);
var _2e;
var _2c=curam.util.getTopmostWindow().dojox;
curam.util.runStorageFn(function(){
_2e=_2c.storage.get(curam.tab.TabSessionManager.SELECTED_TAB_SESSION_KEY);
});
this._log(_1.getProperty("curam.tab.TabSessionManager.session.id")+" '"+_2d+"'. "+_1.getProperty("curam.tab.TabSessionManager.old.session.id")+" '"+_2e+"'.");
if(_2d!=_2e){
this._log(_1.getProperty("curam.tab.TabSessionManager.new.session"));
curam.util.runStorageFn(function(){
_2c.storage.put(curam.tab.TabSessionManager.SELECTED_TAB_SESSION_KEY,_2d);
});
curam.util.runStorageFn(function(){
_2c.storage.remove(curam.tab.TabSessionManager.SELECTED_TAB_KEY);
});
return true;
}
this._log(_1.getProperty("curam.tab.TabSessionManager.refreshed.session"));
return false;
},_getJSessionID:function(){
var key="JSESSIONID=";
var _2f=null;
if(document.cookie){
var _30=document.cookie.indexOf(key);
if(_30!=-1){
var end=document.cookie.indexOf(";",_30+key.length);
_2f=unescape(document.cookie.substring(_30+key.length,end==-1?document.cookie.length:end));
}
}
return _2f;
},_getPrevSelectedTab:function(){
this._log(_1.getProperty("curam.tab.TabSessionManager.previous.tab"));
var _31;
curam.util.runStorageFn(function(){
var _32=curam.util.getTopmostWindow().dojox;
_31=_32.storage.get(curam.tab.TabSessionManager.SELECTED_TAB_KEY);
});
var _33=null;
if(_31){
_33=curam.tab.TabDescriptor.fromJson(_31);
this._log(_1.getProperty("curam.tab.TabSessionManager.previous.tab.found"),_33);
}else{
this._log(_1.getProperty("curam.tab.TabSessionManager.previous.tab.not.found"));
}
return _33;
},_isOpenInBackground:function(_34,_35,pos){
var _36=true;
if(_35&&_35.tabSignature==_34.tabSignature){
this._log(_1.getProperty("curam.tab.TabSessionManager.foreground"),_34,pos);
_36=false;
}else{
this._log(_1.getProperty("curam.tab.TabSessionManager.background"),_34,pos);
}
return _36;
},_getHomePageTab:function(){
this._log(_1.getProperty("curam.tab.TabSessionManager.home.page")+" '"+USER_HOME_PAGE_ID+"'.");
if(!USER_HOME_PAGE_TAB_ASSOC.tabIDs||!USER_HOME_PAGE_TAB_ASSOC.sectionID){
throw new Error("The application cannot be launched because the home page, '"+USER_HOME_PAGE_ID+"', has not been associated with a section or "+" tab.");
}
var _37=USER_HOME_PAGE_TAB_ASSOC.tabIDs[0];
var _38=USER_HOME_PAGE_TAB_ASSOC.sectionID;
var _39=new curam.tab.TabDescriptor(_38,_37);
var _3a=new curam.ui.PageRequest(USER_HOME_PAGE_ID,true);
_39.isHomePage=true;
_39.setTabSignature([],_3a,true);
_39.setTabContent(_3a);
this._log(_1.getProperty("curam.tab.TabSessionManager.created"),_39);
return _39;
},_log:function(msg,_3b,pos){
if(curam.debug.enabled()){
var _3c="TAB SESSION";
if(typeof pos=="number"){
_3c+=" [pos="+pos+"]";
}
curam.debug.log(_3c+": "+msg+(_3b?" "+_3b.toJson():""));
}
}});
dojo.mixin(curam.tab.TabSessionManager,{SELECTED_TAB_KEY:"curam_selected_tab",SELECTED_TAB_SESSION_KEY:"curam_selected_tab_session"});
return _2;
});
