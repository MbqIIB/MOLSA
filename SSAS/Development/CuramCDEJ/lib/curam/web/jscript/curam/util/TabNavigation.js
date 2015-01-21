//>>built
define("curam/util/TabNavigation",["curam/debug","curam/define","curam/util","curam/tab","curam/util/Refresh","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.TabNavigation",{CACHE_BUSTER:0,CACHE_BUSTER_PARAM_NAME:"o3nocache",disabledItems:{},tabLists:{},init:function(_2,_3){
var _4=_2+"child-nav-selectChild";
var _5=dojo.subscribe(_4,"",function(){
curam.util.TabNavigation.onParentSelect(null,_2);
});
curam.tab.unsubscribeOnTabClose(_5,_3);
},onParentSelect:function(_6,_7){
var _8=_7+"-child-nav";
var _9=dijit.byId(_8);
var _a=true;
if(!_6){
var _a=false;
var _b=_7+"-parent-nav";
var _c=dijit.byId(_b);
_6=_c.selectedChildWidget;
}
if(_6.curamDoNoReload){
_a=false;
_6.setAttribute("curamDoNoReload",null);
}
var _d=_6.id+"-Stack";
var _e=dijit.byId(_d);
var _f=dojo.attr(_e.get("srcNodeRef"),"page-ref");
if(!_f){
var _10=_e;
if(_10){
var _11=dojo.query("li.selected > div.link",_10.id)[0];
_f=dojo.attr(_11,"page-ref");
}else{
throw new Error("Could not find a page reference. The menu item '"+_6.id+"' has no page reference and no selected child item was found.");
}
}
if(_a){
var ifr=curam.util.TabNavigation.getIframe(_7);
if(dojo.isIE&&dojo.isIE<9){
ifrBody=ifr.contentWindow.document.body;
}else{
ifrBody=ifr.contentDocument.activeElement;
}
var _12=function(){
_9.selectChild(_e);
dojo.style(_9.domNode,"visibility","visible");
dojo.style(ifr,"visibility","visible");
};
if(dojo.isIE&&dojo.isIE<9){
var lh=function(){
if(ifr.readyState=="complete"){
ifr.detachEvent("onreadystatechange",lh);
_12();
}
};
ifr.attachEvent("onreadystatechange",lh);
}else{
var dt=dojo.connect(ifr,"onload",null,function(){
dojo.disconnect(dt);
_12();
});
}
dojo.query("div.list",ifrBody).forEach(function(_13){
dojo.addClass(_13,"hidden");
});
dojo.style(ifr,"visibility","hidden");
dojo.style(_9.domNode,"visibility","hidden");
curam.util.TabNavigation.loadIframe(_f,_7);
}
var _14=curam.util.TabNavigation.childMenuExists(_6);
curam.util.TabNavigation.toggleChildMenu(_14,_7);
},childMenuExists:function(_15){
var _16=_15.id+"-Stack";
var _17=dojo.query("#"+_16+" ul");
if(_17.length==0){
return false;
}else{
return true;
}
},toggleChildMenu:function(_18,_19){
var _1a=_19+"-navigation-tab";
var _1b=dojo.byId(_1a);
var _1c=dojo.query(".content-area-container",_1b)[0];
var _1d=dojo.query(".child-nav",_1b)[0];
if(!_18){
var _1e="0px";
var _1f=((getComputedStyle(_1c).direction=="ltr")?{left:_1e}:{right:_1e});
var _20={width:_1e};
dojo.style(_1c,_1f);
dojo.style(_1d,_20);
}else{
var _21=dojo.attr(_1b,"child-menu-width");
var _1f=((getComputedStyle(_1c).direction=="ltr")?{left:_21}:{right:_21});
var _20={width:_21};
dojo.style(_1c,_1f);
dojo.style(_1d,_20);
}
},handleChildSelect:function(_22,_23,_24){
if(!curam.util.TabNavigation.isSelectable(_22.parentNode.id)){
dojo.stopEvent(dojo.fixEvent(_24));
return false;
}
var ul=curam.util.TabNavigation.getNext(_22,"UL");
var _25=ul.childNodes;
for(var i=0;i<_25.length;i++){
dojo.replaceClass(_25[i],"not-selected","selected");
}
dojo.replaceClass(_22.parentNode,"selected","not-selected");
var _26=dojo.attr(_22,"page-ref");
curam.util.TabNavigation.loadIframe(_26,_23);
return true;
},isSelectable:function(_27){
return !curam.util.TabNavigation.disabledItems[_27];
},getNext:function(_28,_29){
var _2a=_28.parentNode;
if(_2a==null){
curam.debug.log(_1.getProperty("curam.util.TabNavigation.error",[_29]));
return null;
}
if(_2a.nodeName===_29){
return _2a;
}else{
var _2a=curam.util.TabNavigation.getNext(_2a,_29);
return _2a;
}
},loadIframe:function(_2b,_2c){
var _2d=curam.util.TabNavigation.getIframe(_2c);
dojo.attr(_2d,"src",_2b+"&"+this.getCacheBusterParameter());
},getIframe:function(_2e){
var _2f=_2e+"-navigation-tab";
var _30=dojo.byId(_2f);
var _31=dojo.query("iframe",_30);
return _31[0];
},getCacheBusterParameter:function(){
return this.CACHE_BUSTER_PARAM_NAME+"="+new Date().getTime()+"_"+this.CACHE_BUSTER++;
},setupOnParentSelect:function(_32,_33,_34){
var _35=dojo.byId(_32+"-navigation-tab");
var _36=curam.tab.getContainerTab(_35);
_36.subscribe(_32+"-child-nav-startup",function(){
curam.util.TabNavigation.onParentSelect(null,_32);
var _37=_34.split(",");
for(tabID in _37){
var _38=curam.util.TabNavigation.findNavItem("navItem_"+this.id+"_"+_37[tabID]);
if(_38!=null){
_38.set("curamVisible",false);
}
}
});
_36.subscribe(_33,function(_39){
curam.util.TabNavigation.onParentSelect(_39,_32);
});
},setupRefresh:function(_3a){
curam.util.Refresh.setNavigationCallbacks(curam.util.TabNavigation.updateNavItemStates,curam.util.TabNavigation.getRefreshParams);
var _3b=function(){
var _3c=function(_3d,_3e){
return curam.util.Refresh.refreshMenuAndNavigation(_3e,true,true,true);
};
var _3f=curam.tab.getHandlerForTab(_3c,_3a);
var _40=curam.util.getTopmostWindow();
var _41=_40.dojo.subscribe("curam.tabOpened",null,function(_42,_43){
_3f(_42,_43);
_40.dojo.unsubscribe(_41);
});
};
var _44=curam.util.TabNavigation.dynamicNavigationData[_3a];
_44.registerTabOpenHandler=_3b;
_44.registerTabOpenHandler();
},getRefreshParams:function(_45){
curam.debug.log("curam.util.TabNavigation.getRefreshParams(%s)",_45);
var _46=curam.util.TabNavigation.dynamicNavigationData[_45];
if(!_46){
curam.debug.log(_1.getProperty("curam.util.TabNavigation.no.dynamic"));
return null;
}
var _47="navId="+_46.navigationId;
_47+="&navItemIds="+curam.util.toCommaSeparatedList(_46.dynamicNavItemIds);
_47+="&navLoaders="+curam.util.toCommaSeparatedList(_46.dynamicNavLoaders);
_47+="&navPageParameters="+_46.pageParameters;
return _47;
},updateNavItemStates:function(_48,_49){
var _4a=_49.navData;
for(var i=0;i<_4a.itemStates.length;i++){
curam.util.TabNavigation.updateNavItemState(_4a.itemStates[i],_48);
}
},updateNavItemState:function(_4b,_4c){
var _4d=curam.util.TabNavigation.findNavItem("navItem_"+_4c+"_"+_4b.id);
if(_4d!=null){
if(!_4d.domNode){
curam.util.TabNavigation.disabledItems[_4d.id]=!_4b.enabled;
curam.util.swapState(_4d,_4b.enabled,"enabled","disabled");
curam.util.swapState(_4d,_4b.visible,"visible","hidden");
}else{
_4d.set("curamDisabled",!_4b.enabled);
_4d.set("curamVisible",_4b.visible);
}
}
},findNavItem:function(_4e){
var _4f=dojo.query("."+_4e);
if(_4f.length==1){
var _50=_4f[0];
var _51=dijit.byNode(_50);
if(!_51){
return _50;
}else{
return _51.controlButton;
}
}else{
curam.debug.log(_1.getProperty("curam.util.TabNavigation.item",[_4e]));
return null;
}
},addRollOverClass:function(_52){
dojo.addClass(_52.target,"hover");
curam.util.connect(_52.target,"onmouseout",function(){
dojo.removeClass(_52.target,"hover");
});
},setupOnLoadListener:function(_53,_54){
var _55=dojo.fromJson(_54);
var _56=function(_57,_58){
curam.util.TabNavigation.handleContentAreaUpdate(_57,_58,_55);
};
var _59=curam.tab.getHandlerForTab(_56,_53);
var _5a=curam.util.getTopmostWindow();
var _5b=_5a.dojo.subscribe("/curam/main-content/page/loaded",null,_59);
curam.tab.unsubscribeOnTabClose(_5b,_53);
},setupTabList:function(_5c,_5d){
if(!curam.util.TabNavigation.tabLists[_5c]){
curam.tab.executeOnTabClose(function(){
delete curam.util.TabNavigation.tabLists[_5c];
},_5c);
}
delete curam.util.TabNavigation.tabLists[_5c];
curam.util.TabNavigation.tabLists[_5c]=_5d;
},handleContentAreaUpdate:function(_5e,_5f,_60){
var ids=_60[_5e];
if(ids){
var _61=ids["dojoTabId"];
var _62=_61+"-parent-nav";
var _63=ids["tabId"];
var _64=ids["childId"];
var _65=dijit.byId(_63);
var _66=dijit.byId(_62);
if(_65){
if(_66.selectedChildWidget!=_65){
_65.setAttribute("curamDoNoReload",true);
_66.selectChild(_65);
}
if(_64){
var _67=_63+"-Stack";
var _68=_61+"-child-nav";
var _69=dijit.byId(_68);
var _6a=dijit.byId(_67);
_69.selectChild(_6a);
var _6b=dojo.query("li",_6a.domNode);
for(var i=0;i<_6b.length;i++){
var _6c=_6b[i];
if(_6c.id==_64){
var _6d=_6c;
}
}
if(_6d){
if(!dojo.hasClass(_6d,"selected")){
var _6e=_6d.parentNode.childNodes;
for(var i=0;i<_6e.length;i++){
dojo.replaceClass(_6e[i],"not-selected","selected");
}
dojo.replaceClass(_6d,"selected","not-selected");
}
}
}
}
}
},getInsertIndex:function(_6f,_70,_71){
var _72=curam.util.TabNavigation.tabLists[_6f];
var _73=dojo.indexOf(_72,_71);
var _74=_73;
for(var i=_73-1;i>=0;i--){
if(dojo.indexOf(_70,_72[i])<0){
_74--;
}
}
return _74;
}});
return curam.util.TabNavigation;
});
