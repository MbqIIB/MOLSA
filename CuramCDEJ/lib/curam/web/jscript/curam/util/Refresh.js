//>>built
define("curam/util/Refresh",["curam/util/Request","curam/define","curam/util","curam/tab","curam/debug","curam/util/ContextPanel","curam/util/ui/refresh/TabRefreshController","curam/util/ResourceBundle"],function(_1){
dojo.requireLocalization("curam.application","Debug");
var _2=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.Refresh",{submitted:false,pageSubmitted:"",refreshConfig:[],menuBarCallback:null,navigationCallback:null,refreshedOnTabOpen:{},_controllers:{},_pageRefreshButton:undefined,setMenuBarCallbacks:function(_3,_4){
if(!curam.util.Refresh.menuBarCallback){
curam.util.Refresh.menuBarCallback={updateMenuItemStates:_3,getRefreshParams:_4};
}
},setNavigationCallbacks:function(_5,_6){
if(!curam.util.Refresh.navigationCallback){
curam.util.Refresh.navigationCallback={updateNavItemStates:_5,getRefreshParams:_6};
}
},refreshMenuAndNavigation:function(_7,_8,_9,_a){
curam.debug.log("curam.util.Refresh.refreshMenuAndNavigation: "+"tabWidgetId=%s, refreshMenuBar || refreshNavigation: %s || %s",_7,_8,_9);
if(_a&&curam.util.Refresh.refreshedOnTabOpen[_7]){
curam.debug.log(_2.getProperty("curam.util.Refresh.stop"));
return;
}else{
if(_a&&!curam.util.Refresh.refreshedOnTabOpen[_7]){
curam.debug.log(_2.getProperty("curam.util.Refresh.tab.open"));
curam.util.Refresh.refreshedOnTabOpen[_7]=true;
}else{
curam.debug.log(_2.getProperty("curam.util.Refresh.detect.refresh"));
curam.debug.log(_2.getProperty("curam.util.Refresh.refresh"));
}
}
if(!_8&&!_9){
curam.debug.log(_2.getProperty("curam.util.Refresh.no.refresh"));
curam.util.Refresh.refreshedOnTabOpen[_7]=false;
return;
}
var _b={update:function(_c,_d,_e){
curam.debug.log(_2.getProperty("curam.util.Refresh.dynamic.refresh"),_d);
var _f=curam.util.Refresh.navigationCallback;
curam.debug.log("refreshNavigation? ",_9);
if(_9&&_d.navData&&_f){
_f.updateNavItemStates(_c,_d);
}
var mcb=curam.util.Refresh.menuBarCallback;
curam.debug.log("refreshMenuBar? ",_8);
if(_8&&_d.menuData&&mcb){
mcb.updateMenuItemStates(_c,_d);
}
},error:function(_10,_11){
curam.debug.log("========= "+_2.getProperty("curam.util.Refresh.dynamic.failure")+" ===========");
curam.debug.log(_2.getProperty("curam.util.Refresh.dynamic.error"),_10);
curam.debug.log(_2.getProperty("curam.util.Refresh.dynamic.args"),_11);
curam.debug.log("==================================================");
}};
var _12="servlet/JSONServlet?o3c=TAB_DYNAMIC_STATE_QUERY";
var mcb=curam.util.Refresh.menuBarCallback;
if(_8&&mcb){
var _13=mcb.getRefreshParams(_7);
if(_13){
_12+="&"+_13;
}
}
var ncb=curam.util.Refresh.navigationCallback;
if(_9&&ncb){
var _14=ncb.getRefreshParams(_7);
if(_14){
_12+="&"+_14;
}
}
curam.debug.log(_2.getProperty("curam.util.Refresh.dynamic.refresh.req"));
_1.post({url:_12,handleAs:"json",preventCache:true,load:dojo.hitch(_b,"update",_7),error:dojo.hitch(_b,"error")});
},addConfig:function(_15){
var _16=false;
dojo.forEach(curam.util.Refresh.refreshConfig,function(_17){
if(_17.tab==_15.tab){
_17.config=_15.config;
_16=true;
}
});
if(!_16){
curam.util.Refresh.refreshConfig.push(_15);
}
},setupRefreshController:function(_18){
curam.debug.log("curam.util.Refresh.setupRefreshController "+_2.getProperty("curam.util.ExpandableLists.load.for"),_18);
var _19=dijit.byId(_18);
var _1a=_19.tabDescriptor.tabID;
var _1b=dojo.filter(curam.util.Refresh.refreshConfig,function(_1c){
return _1c.tab==_1a;
});
if(_1b.length==1){
var _1d=_1b[0];
var ctl=new curam.util.ui.refresh.TabRefreshController(_18,_1d);
curam.util.Refresh._controllers[_18]=ctl;
ctl.setRefreshHandler(curam.util.Refresh.handleRefreshEvent);
}else{
if(_1b.length==0){
curam.debug.log(_2.getProperty("curam.util.Refresh.no.dynamic.refresh"),_18);
var ctl=new curam.util.ui.refresh.TabRefreshController(_18,null);
curam.util.Refresh._controllers[_18]=ctl;
}else{
throw "curam.util.Refresh: multiple dynamic refresh "+"configurations found for tab "+_18;
}
}
curam.tab.executeOnTabClose(function(){
curam.util.Refresh._controllers[_18].destroy();
curam.util.Refresh._controllers[_18]=undefined;
},_18);
},getController:function(_1e){
var ctl=curam.util.Refresh._controllers[_1e];
if(!ctl){
throw "Refresh controller for tab '"+_1e+"' not found!";
}
return ctl;
},handleOnloadNestedInlinePage:function(_1f,_20){
curam.debug.log("curam.util.Refresh.handleOnloadNestedInlinePage "+_2.getProperty("curam.util.Refresh.iframe",[_1f,_20]));
var _21=curam.util.getTopmostWindow();
var _22=undefined;
var _23=curam.tab.getSelectedTab();
if(_23){
_22=curam.tab.getTabWidgetId(_23);
}
if(_22){
curam.debug.log(_2.getProperty("curam.util.Refresh.parent"),_22);
_21.curam.util.Refresh.getController(_22).pageLoaded(_20.pageID,curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_INLINE);
_21.dojo.publish("/curam/main-content/page/loaded",[_20.pageID,_22]);
return true;
}
return false;
},handleRefreshEvent:function(_24){
var _25=function(_26){
curam.util.ContextPanel.refresh(dijit.byId(_26));
};
var _27=function(_28){
curam.tab.refreshMainContentPanel(dijit.byId(_28));
};
var _29=function(_2a,_2b,_2c){
curam.util.Refresh.refreshMenuAndNavigation(_2a,_2b,_2c);
};
curam.util.Refresh._doRefresh(_24,_25,_27,_29);
},_doRefresh:function(_2d,_2e,_2f,_30){
var _31=null;
var _32=false;
var _33=false;
var _34=false;
var _35=false;
var trc=curam.util.ui.refresh.TabRefreshController.prototype;
dojo.forEach(_2d,function(_36){
var _37=_36.lastIndexOf("/");
var _38=_36.slice(0,_37);
if(!_31){
_31=_36.slice(_37+1,_36.length);
}
if(_38==trc.EVENT_REFRESH_MENU){
_32=true;
}
if(_38==trc.EVENT_REFRESH_NAVIGATION){
_33=true;
}
if(_38==trc.EVENT_REFRESH_CONTEXT){
_34=true;
}
if(_38==trc.EVENT_REFRESH_MAIN){
_35=true;
}
});
if(_34){
_2e(_31);
}
if(_35){
_2f(_31);
}
_30(_31,_32,_33);
},setupRefreshButton:function(_39){
dojo.ready(function(){
var _3a=dojo.query("."+_39)[0];
if(!_3a){
throw "Refresh button not found: "+_39;
}
curam.util.Refresh._pageRefreshButton=_3a;
var _3b=window.location.href;
if(curam.util.isActionPage(_3b)){
dojo.addClass(_3a,"disabled");
curam.util.Refresh._pageRefreshButton._curamDisable=true;
}else{
dojo.addClass(_3a,"enabled");
curam.util.Refresh._pageRefreshButton["_curamDisable"]=undefined;
}
curam.util.getTopmostWindow().curam.util.setupPreferencesLink(_3b);
});
},refreshPage:function(_3c){
dojo.stopEvent(_3c);
var _3d=window.location.href;
var _3e=curam.util.Refresh._pageRefreshButton._curamDisable;
if(_3e){
return;
}
curam.util.FORCE_REFRESH=true;
curam.util.redirectWindow(_3d,true);
}});
return curam.util.Refresh;
});
