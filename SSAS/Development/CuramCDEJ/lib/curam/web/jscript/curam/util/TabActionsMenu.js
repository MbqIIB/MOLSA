//>>built
define("curam/util/TabActionsMenu",["curam/tab","curam/debug","curam/define","curam/util","curam/util/Refresh","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.TabActionsMenu",{_tabMenuStates:{},getRefreshParams:function(_2){
curam.debug.log("curam.util.TabActionsMenu.getRefreshParams(%s)",_2);
if(!curam.util.TabActionsMenu.dynamicMenuBarData[_2]){
curam.debug.log(_1.getProperty("curam.util.TabActionsMenu.no.dynamic"));
return null;
}
var _3="menuId="+curam.util.TabActionsMenu.dynamicMenuBarData[_2].menuBarId;
_3+="&menuItemIds="+curam.util.toCommaSeparatedList(curam.util.TabActionsMenu.dynamicMenuBarData[_2].dynamicMenuItemIds);
_3+="&menuLoaders="+curam.util.toCommaSeparatedList(curam.util.TabActionsMenu.dynamicMenuBarData[_2].dynamicMenuLoaders);
_3+="&menuPageParameters="+curam.util.TabActionsMenu.dynamicMenuBarData[_2].pageParameters;
return _3;
},updateMenuItemStates:function(_4,_5){
var _6=_5.menuData;
var _7=function(){
for(var i=0;i<_6.itemStates.length;i++){
curam.util.TabActionsMenu.updateMenuItemState(_6.itemStates[i],_4);
}
};
if(curam.util.TabActionsMenu._isMenuCreated(_4)){
_7();
}else{
var _8=curam.util.getTopmostWindow();
var _9=_8.dojo.subscribe("/curam/menu/created",this,function(_a){
curam.debug.log("Received /curam/menu/created "+_1.getProperty("curam.util.ExpandableLists.load.for"),_a);
if(_a==_4){
curam.debug.log(_1.getProperty("curam.util.TabActionsMenu.match"));
curam.util.TabActionsMenu._tabMenuStates[_a]=true;
_7();
_8.dojo.unsubscribe(_9);
}
});
curam.tab.unsubscribeOnTabClose(_9,_4);
}
},_isMenuCreated:function(_b){
return curam.util.TabActionsMenu._tabMenuStates[_b]==true;
},updateMenuItemState:function(_c,_d){
var _e=dijit.byId("menuItem_"+_d+"_"+_c.id);
if(_e!=null){
_e.disabled=!_c.enabled;
curam.util.swapState(_e.domNode,_c.enabled,"enabled","disabled");
curam.util.swapState(_e.domNode,_c.visible,"visible","hidden");
if(_e.disabled){
_e.domNode.setAttribute("aria-disabled","true");
}
}
},setupHandlers:function(_f){
curam.util.Refresh.setMenuBarCallbacks(curam.util.TabActionsMenu.updateMenuItemStates,curam.util.TabActionsMenu.getRefreshParams);
var _10=function(){
var _11=function(_12,_13){
return curam.util.Refresh.refreshMenuAndNavigation(_13,true,true,true);
};
var _14=curam.tab.getHandlerForTab(_11,_f);
var _15=curam.util.getTopmostWindow();
var _16=_15.dojo.subscribe("curam.tabOpened",null,function(_17,_18){
_14(_17,_18);
_15.dojo.unsubscribe(_16);
});
};
curam.util.TabActionsMenu.dynamicMenuBarData[_f].registerTabOpenHandler=_10;
curam.util.TabActionsMenu.dynamicMenuBarData[_f].registerTabOpenHandler();
curam.tab.executeOnTabClose(function(){
curam.util.TabActionsMenu.dynamicMenuBarData[_f].registerTabOpenHandler=null;
delete curam.util.TabActionsMenu.dynamicMenuBarData[_f];
},_f);
},handleOnClick:function(url,_19){
if(_19){
curam.tab.getTabController().handleDownLoadClick(url);
}else{
curam.tab.getTabController().handleLinkClick(url);
}
},handleOnClickModal:function(url,_1a){
var _1b={dialogOptions:_1a};
curam.tab.getTabController().handleLinkClick(url,_1b);
}});
return curam.util.TabActionsMenu;
});
