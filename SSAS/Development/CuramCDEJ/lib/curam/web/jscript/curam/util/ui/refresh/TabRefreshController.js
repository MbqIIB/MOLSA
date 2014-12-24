//>>built
define("curam/util/ui/refresh/TabRefreshController",["curam/debug","curam/util/ui/refresh/RefreshEvent","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
var _2=dojo.declare("curam.util.ui.refresh.TabRefreshController",null,{EVENT_REFRESH_MENU:"/curam/refresh/menu",EVENT_REFRESH_NAVIGATION:"/curam/refresh/navigation",EVENT_REFRESH_CONTEXT:"/curam/refresh/context",EVENT_REFRESH_MAIN:"/curam/refresh/main-content",_tabWidgetId:null,_configOnSubmit:null,_configOnLoad:null,_handler:null,_lastSubmitted:null,_currentlyRefreshing:null,constructor:function(_3,_4){
this._configOnSubmit={};
this._configOnLoad={};
if(!_4){
return;
}
this._tabWidgetId=_3;
dojo.forEach(_4.config,dojo.hitch(this,function(_5){
this._configOnSubmit[_5.page]=_5.onsubmit;
this._configOnLoad[_5.page]=_5.onload;
}));
},pageSubmitted:function(_6,_7){
new curam.util.ui.refresh.RefreshEvent(curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONSUBMIT,_7);
curam.debug.log("curam.util.ui.refresh.TabRefreshController: "+_1.getProperty("curam.util.ui.refresh.TabRefreshController.submit",[_6,_7]));
if(this._configOnSubmit[_6]){
this._lastSubmitted=_6;
curam.debug.log("curam.util.ui.refresh.TabRefreshController: "+_1.getProperty("curam.util.ui.refresh.TabRefreshController"+"submit.notify"));
}
},pageLoaded:function(_8,_9){
var _a=new curam.util.ui.refresh.RefreshEvent(curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONLOAD,_9);
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_1.getProperty("curam.util.ui.refresh.TabRefreshController.load",[_8,_9]));
if(this._currentlyRefreshing&&this._currentlyRefreshing.equals(_a)){
this._currentlyRefreshing=null;
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_1.getProperty("curam.util.ui.refresh.TabRefreshController"+"refresh"));
return;
}
var _b={};
if(_9==_a.SOURCE_CONTEXT_MAIN&&this._configOnLoad[_8]){
_b=this._configOnLoad[_8];
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_1.getProperty("curam.util.ui.refresh.TabRefreshController"+".load.config"));
}
if(this._lastSubmitted){
var _c=this._configOnSubmit[this._lastSubmitted];
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_1.getProperty("curam.util.ui.refresh.TabRefreshController"+".submit.config",[this._lastSubmitted]));
_b.details=_b.details||_c.details;
_b.menubar=_b.menubar||_c.menubar;
_b.navigation=_b.navigation||_c.navigation;
_b.mainContent=_b.mainContent||_c.mainContent;
this._lastSubmitted=null;
}
this._fireRefreshEvents(_b);
},_fireRefreshEvents:function(_d){
var _e=[];
if(_d.details){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_1.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.context"));
_e.push(this.EVENT_REFRESH_CONTEXT+"/"+this._tabWidgetId);
}
if(_d.menubar){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_1.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.menu"));
_e.push(this.EVENT_REFRESH_MENU+"/"+this._tabWidgetId);
}
if(_d.navigation){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_1.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.nav"));
_e.push(this.EVENT_REFRESH_NAVIGATION+"/"+this._tabWidgetId);
}
if(_d.mainContent){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_1.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.main"));
this._currentlyRefreshing=new curam.util.ui.refresh.RefreshEvent(curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONLOAD,curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN,null);
_e.push(this.EVENT_REFRESH_MAIN+"/"+this._tabWidgetId);
}
if(_e.length>0){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_1.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.log",[_e.length,_e]));
this._handler(_e);
}
},setRefreshHandler:function(_f){
this._handler=_f;
},destroy:function(){
for(prop in this._configOnSubmit){
if(this._configOnSubmit.hasOwnProperty(prop)){
delete this._configOnSubmit[prop];
}
}
for(prop in this._configOnLoad){
if(this._configOnLoad.hasOwnProperty(prop)){
delete this._configOnLoad[prop];
}
}
this._configOnSubmit={};
this._configOnLoad={};
this._handler=null;
this._lastSubmitted=null;
this._currentlyRefreshing=null;
}});
return _2;
});
