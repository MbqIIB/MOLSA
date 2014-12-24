//>>built
define("curam/util/ExpandableLists",["curam/util","curam/debug","curam/UIMController","curam/util/ui/refresh/RefreshEvent","curam/define","curam/contentPanel","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.ExpandableLists",{_minimumExpandedHeight:[],stateData:[],_LIST_ID_PREFIX:"list-id-",_ROW_ID_PREFIX:"row-id-",_EVENT_TOGGLE:"/curam/list/row/toggle",_EVENT_TYPE_EXPANDED:"Expanded",_EVENT_TYPE_COLLAPSED:"Collapsed",setupToggleHandler:function(){
dojo.ready(function(){
var _2=curam.util.ExpandableLists;
var _3=function(_4,_5,_6){
curam.debug.log(_1.getProperty("curam.util.ExpandableLists.event",[_6,_4,_5]));
if(_6==_2._EVENT_TYPE_EXPANDED){
var _7=_2._getListData(_4);
var _8=dojo.filter(_7.expandedRows,function(_9){
return _9==_5;
});
if(_8.length==0){
_7.expandedRows.push(_5);
}
}else{
var _7=_2._getListData(_4);
_7.expandedRows=dojo.filter(_7.expandedRows,function(_a){
return _a!=_5;
});
if(_7.expandedRows.length==0){
_2._removeListData(_4);
}
}
curam.debug.log("curam.util.ExpandableLists.setupToggleHandler stateData: ",_2.stateData);
};
dojo.subscribe(_2._EVENT_TOGGLE,this,_3);
dojo.subscribe("/curam/page/refresh",this,_2._saveStateData);
});
},_saveStateData:function(){
var _b=curam.util.ExpandableLists;
curam.debug.log("/curam/page/refresh"+_1.getProperty("curam.util.ExpandableLists.refresh"),_b.stateData);
curam.util.runStorageFn(function(){
try{
dojo.forEach(_b.stateData,function(_c){
var _d=dojo.toJson(_c);
curam.debug.log(_1.getProperty("curam.util.ExpandableLists.exception"),_d);
var _e=curam.util.getTopmostWindow().dojox;
_e.storage.put(_b._sanitizeKey(_c.listId),_d);
});
}
catch(e){
curam.debug.log(_1.getProperty("curam.util.ExpandableLists.exception"),e);
}
});
},_sanitizeKey:function(_f){
return _f.replace("-","_");
},loadStateData:function(_10){
if(typeof (window.curamDialogRedirecting)!="undefined"){
curam.debug.log("curam.util.ExpandableLists.loadStateData "+_1.getProperty("curam.util.ExpandableLists.load.exit"));
return;
}
var _11=curam.util.ExpandableLists;
var _12=function(){
curam.debug.log("curam.util.ExpandableLists.loadStateData "+ +_1.getProperty("curam.util.ExpandableLists.load.for"),_10);
var _13=curam.util.getTopmostWindow().dojox;
var _14=_13.storage.get(_11._sanitizeKey(_10));
if(_14&&_14!=""){
var _15=dojo.fromJson(_14);
var _16=dojo.query("table."+_11._LIST_ID_PREFIX+_10);
dojo.forEach(_15.expandedRows,function(_17){
curam.debug.log(_1.getProperty("curam.util.ExpandableLists.load.row"),_17);
var _18=dojo.query("tr."+_11._ROW_ID_PREFIX+_17,_16[0]);
if(_18.length>0){
var _19=dojo.query("a.list-details-row-toggle",cm.prevSibling(_18[0],"tr"));
if(_19.length==1){
_11._toggleDetailsRow(_19[0]);
}else{
curam.debug.log(_1.getProperty("curam.util.ExpandableLists.load.button"+".disabled"));
}
}else{
curam.debug.log(_1.getProperty("curam.util.ExpandableLists.load.row.disabled"));
}
});
_13.storage.put(_11._sanitizeKey(_10),"");
}else{
curam.debug.log(_1.getProperty("curam.util.ExpandableLists.load.no.data"));
}
};
dojo.ready(function(){
curam.util.runStorageFn(_12);
});
},_getListData:function(_1a){
var _1b=curam.util.ExpandableLists.stateData;
var _1c=dojo.filter(_1b,function(_1d){
return _1d.listId==_1a;
});
if(_1c.length==0){
_1c.push({listId:_1a,expandedRows:[]});
_1b.push(_1c[0]);
}
return _1c[0];
},_removeListData:function(_1e){
var _1f=curam.util.ExpandableLists;
_1f.stateData=dojo.filter(_1f.stateData,function(_20){
return _20.listId!=_1e;
});
},toggleListDetailsRow:function(_21){
if(_21){
_21=dojo.fixEvent(_21);
dojo.stopEvent(_21);
var _22=_21.currentTarget;
curam.util.ExpandableLists._toggleDetailsRow(_22);
}
},_generateUimController:function(_23){
var _24=dojo.query("td",_23)[0];
var _25=dojo.query("div",_23)[0];
var _26=new curam.UIMController({uid:dojo.attr(_25,"uid"),url:dojo.attr(_25,"url"),iframeId:dojo.attr(_25,"iframeId"),iframeClassList:dojo.attr(_25,"iframeClassList"),loadFrameOnCreate:dojo.attr(_25,"loadFrameOnCreate")});
_24.appendChild(_26.domNode);
if(_25&&_24){
_24.removeChild(_25);
}
return _26;
},_toggleDetailsRow:function(_27){
curam.debug.log("curam.util.ExpandableLists._toggleDetailsRow "+_1.getProperty("curam.util.ExpandableLists.load.for"),_27);
var _28=curam.util.ExpandableLists;
var _29=cm.getParentByType(_27,"tr");
var _2a=cm.nextSibling(_29,"tr");
var _2b=!_28.isDetailsRowExpanded(_2a);
_28._handleStripingAndRoundedCorners(_29,_2a,_2b);
var _2c=dojo.query("div.uimController",_2a);
var _2d=null;
var _2e=null;
if(_2c==null||_2c.length==0){
_2e=_28._generateUimController(_2a);
}else{
_2d=_2c[0];
_2e=dijit.byNode(_2d);
}
if(typeof (_2e)=="undefined"||_2e==null){
throw "UIMController Dijit not found for node: "+_2d;
}
var _2f=dojo.attr(_2e.frame,"src");
var _30=false;
_28.setDetailsRowExpandedState(_29,_2a,_2b,_27);
var def=new dojo.Deferred();
if(!_2f||_2f==null||_2f==""){
_2e.loadPage(def);
}else{
_30=true;
def.callback();
}
def.addCallback(function(){
var _31=_2e.hasInPageNavigation();
_30=_30||_31;
if(_31){
_2e.showTabContainer(_2b);
}
if(_30){
curam.util.ExpandableLists.resizeExpandableListAncestors(window);
}
var _32=_2b?_28._EVENT_TYPE_EXPANDED:_28._EVENT_TYPE_COLLAPSED;
var _33=_28._findListId(_2a);
var _34=curam.util.getSuffixFromClass(_2a,_28._ROW_ID_PREFIX);
dojo.publish(_28._EVENT_TOGGLE,[_33,_34,_32]);
if(!curam.util.ExpandableLists._isExternalApp(window)){
var _32=_2b?"ListDetailsRow.Expand":"ListDetailsRow.Collapse";
var _35={url:dojo.attr(_2e.frame,"src"),eventType:_32};
var _36=curam.tab.getSelectedTab();
if(_36){
var _37=curam.tab.getTabWidgetId(_36);
curam.util.getTopmostWindow().dojo.publish("expandedList.toggle",[window.frameElement,_35,_37]);
}
}
});
},_handleStripingAndRoundedCorners:function(_38,_39,_3a){
var odd="odd";
var _3b="even";
var _3c="row-no-border";
var _3d="odd-last-row";
var _3e="even-last-row";
if(!curam.util.ExpandableLists._isLastRow(_38,_39)){
if(dojo.hasClass(_38,odd)){
dojo.addClass(_39,odd);
}else{
if(dojo.hasClass(_38,_3b)){
dojo.addClass(_39,_3b);
}
}
}else{
if(_3a){
if(dojo.hasClass(_38,_3d)){
dojo.removeClass(_38,_3d);
dojo.addClass(_38,odd);
dojo.addClass(_39,odd);
dojo.addClass(_39,_3d);
}else{
if(dojo.hasClass(_38,_3e)){
dojo.removeClass(_38,_3e);
dojo.addClass(_38,_3b);
dojo.addClass(_39,_3b);
dojo.addClass(_39,_3e);
}
}
}else{
if(dojo.hasClass(_38,odd)){
dojo.removeClass(_38,odd);
dojo.addClass(_38,_3d);
dojo.removeClass(_39,_3d);
dojo.removeClass(_39,odd);
}else{
if(dojo.hasClass(_38,_3b)){
dojo.removeClass(_38,_3b);
dojo.addClass(_38,_3e);
dojo.removeClass(_39,_3b);
dojo.removeClass(_39,_3e);
}
}
}
}
if(_3a){
dojo.addClass(_38,_3c);
}else{
dojo.removeClass(_38,_3c);
}
if(dojo.hasClass(_38,_3c)){
dojo.removeClass(_39,"collapsed");
}else{
dojo.addClass(_39,"collapsed");
}
},setDetailsRowExpandedState:function(_3f,_40,_41,_42){
var _43=curam.util.ExpandableLists.isDetailsRowExpanded(_40);
dojo.removeClass(_40,"collapsed");
if(!_43){
dojo.addClass(_40,"collapsed");
}
if(_3f.style.display=="none"){
_40.setAttribute("style","display:none");
}else{
_40.removeAttribute("style");
}
if(_42){
if(_41){
dojo.addClass(_42,"expanded");
}else{
dojo.removeClass(_42,"expanded");
}
}
},_isLastRow:function(_44,_45){
return dojo.hasClass(_44,"even-last-row")||dojo.hasClass(_44,"odd-last-row")||dojo.hasClass(_45,"even-last-row")||dojo.hasClass(_45,"odd-last-row");
},isDetailsRowExpanded:function(_46){
return !dojo.hasClass(_46,"collapsed");
},listRowFrameLoaded:function(_47,_48){
curam.debug.log("========= "+_1.getProperty("curam.util.ExpandableLists.page.load")+" =======");
curam.debug.log(_47);
curam.debug.log(dojo.toJson(_48));
var _49=dojo.byId(_47);
if(!_49){
throw "List Row Expanded: No iframe found";
}
if(!_49._spExpListPageLoadListener){
_49._spExpListPageLoadListener="true";
}else{
if(!curam.util.ExpandableLists._isExternalApp(window)){
curam.contentPanel.publishSmartPanelExpListPageLoad(_49);
}
}
var _4a=curam.util.ExpandableLists._findListId(_49);
var _4b=curam.util.ExpandableLists.getMinimumExpandedHeight(_4a);
var _4c=_48.height;
if(_4c<_4b){
curam.debug.log(_1.getProperty("curam.util.ExpandableLists.min.height",[_4b]));
_4c=_4b;
}else{
curam.debug.log(_1.getProperty("curam.util.ExpandableLists.height",[_4c]));
}
curam.util.ExpandableLists._resizeIframe(_49,_4c);
curam.util.ExpandableLists.resizeExpandableListAncestors(window);
curam.util.ExpandableLists._setFrameTitle(_49,_48);
if(!curam.util.ExpandableLists._isExternalApp(window)){
var _4d=curam.tab.getSelectedTab();
if(_4d){
var _4e=curam.tab.getTabWidgetId(_4d);
var _4f=curam.util.getTopmostWindow();
_4f.curam.util.Refresh.getController(_4e).pageLoaded(_48.pageID,curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_INLINE);
}
}
curam.debug.log("================================================");
},_resizeIframe:function(_50,_51){
dojo.style(_50,{height:_51+"px"});
},_setFrameTitle:function(_52,_53){
_52.title=_52.title+" "+_53.title;
},_findListId:function(_54){
return curam.util.getSuffixFromClass(cm.getParentByType(_54,"table"),curam.util.ExpandableLists._LIST_ID_PREFIX);
},resizeExpandableListAncestors:function(_55){
curam.debug.log("curam.util.ExpandableLists.resizeExpandableListAncestors: ",_55.location.href);
if(_55&&_55!==window.top&&typeof (_55.frameElement)!="undefined"&&(dojo.hasClass(_55.frameElement,"expanded_row_iframe")||curam.util.ExpandableLists.isNestedUIM(_55))){
var _56=_55.curam.util.getPageHeight();
curam.debug.log("curam.util.ExpandableLists"+".resizeExpandableListAncestors: "+_1.getProperty("curam.util.ExpandableLists.resize.height"),_56);
curam.util.ExpandableLists._resizeIframe(_55.frameElement,_56);
curam.util.ExpandableLists.resizeExpandableListAncestors(_55.parent);
}else{
curam.debug.log("curam.util.ExpandableLists"+".resizeExpandableListAncestors: "+_1.getProperty("curam.util.ExpandableLists.resize.end"));
return;
}
},isNestedUIM:function(_57){
if(_57&&_57.jsScreenContext){
return _57.jsScreenContext.hasContextBits("NESTED_UIM");
}else{
return false;
}
},_isExternalApp:function(_58){
if(_58&&_58.jsScreenContext){
return _58.jsScreenContext.hasContextBits("EXTAPP");
}else{
return false;
}
},setMinimumExpandedHeight:function(_59,_5a){
curam.util.ExpandableLists._minimumExpandedHeight.push({listId:_59,minExpHeight:_5a});
},getMinimumExpandedHeight:function(_5b){
var _5c=dojo.filter(curam.util.ExpandableLists._minimumExpandedHeight,function(_5d){
return _5d.listId==_5b;
});
if(_5c.length==1){
return _5c[0].minExpHeight;
}else{
curam.debug.log(_1.getProperty("curam.util.ExpandableLists.default.height"),_5b);
return 30;
}
}});
return curam.util.ExpandableLists;
});
