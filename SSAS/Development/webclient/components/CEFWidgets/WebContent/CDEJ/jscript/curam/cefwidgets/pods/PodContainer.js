dojo.provide("curam.cefwidgets.pods.PodContainer");
require(["curam/cefwidgets/GridContainer/dojox/layout/GridContainerLayer"]);
var uw={columns:[],podHeights:{},eventSubscriptions:[],eventConnections:[],init:function(){
uw.calendarMonthSelect=dojo.subscribe("monthCalendarStack-selectChild",uw.selected);
uw.eventSubscriptions.push(uw.calendarMonthSelect);
uw.podDrag=dojo.subscribe("/dojox/mdnd/drag/start",function(){
if(dojo.isIE<8){
uw.temporarilyDisableScrollBarsOnContentPanel();
uw.temporarilyDisableBodyElementScrollbars();
uw.temporarilyDisableHtmlElementScrollbars();
uw.temporarilyDisableIframeScrollbars();
}
});
uw.eventSubscriptions.push(uw.podDrag);
uw.podCloseListener=dojo.subscribe("/dojox/mdnd/close",function(){
uw.recordPodPosChange(true);
});
uw.eventSubscriptions.push(uw.podCloseListener);
uw.podDropListener=dojo.subscribe("/dojox/mdnd/drop",function(){
uw.recordPodPosChange(true);
uw.toggleSize();
});
uw.eventSubscriptions.push(uw.podDropListener);
uw.podListSizeChangeListener=dojo.subscribe("/curam/list/changed",function(_1){
uw.recordPodListSizeChange(_1.podId,_1.listId,_1.visibleItems);
});
uw.eventSubscriptions.push(uw.podListSizeChangeListener);
uw.inc=true;
uw.resizeConnection=dojo.connect(window,"onresize",uw,"toggleSize");
uw.eventConnections.push(uw.resizeConnection);
uw.recordPodPosChange(jsDefaultRecord);
uw.finishedLoadingPods=curam.util.getTopmostWindow().dojo.subscribe("pods.fullyloaded",uw,function(_2){
_2.gridContainer.enableDnd();
_2.uw.recordPodPosChange();
dojo.disconnect(uw.finishedLoadingPods);
});
uw.readyForMorePodsHandler=dojo.subscribe("pods.readyformore",uw,function(_3){
dojo.unsubscribe(uw.readyForMorePodsHandler);
uw.addMorePodsHandler=dojo.subscribe("pods.addmore",uw,function(_4){
dojo.unsubscribe(uw.addMorePodsHandler);
uw.showRemainingPods(_4);
});
uw.eventSubscriptions.push(uw.addMorePodsHandler);
setTimeout(function(){
dojo.publish("pods.addmore",[_3]);
},_3.podDropDelay);
dojo.addOnWindowUnload(function(){
dojo.forEach(uw.eventSubscriptions,dojo.unsubscribe);
dojo.forEach(uw.eventConnections,dojo.disconnect);
dojo.disconnect(uw.destoryListeners);
});
});
},toggleSize:function(){
var _5=dojo.byId("podContainer");
if(_5){
var _6=dojo.marginBox(_5).h;
dojo.style(_5,"height",(_6+(uw.inc?1:-1))+"px");
uw.inc=!uw.inc;
}
},temporarilyDisableIframeScrollbars:function(){
uw.iframe=curam.tab.getContentPanelIframe();
var _7=dojo.attr(uw.iframe,"scrolling");
dojo.attr(uw.iframe,"scrolling","no");
uw.dropListenerForIFrameScrollbars=dojo.subscribe("/dojox/mdnd/drop",function(){
dojo.attr(uw.iframe,"scrolling",_7);
dojo.unsubscribe(uw.dropListenerForIFrameScrollbars);
uw.toggleSize();
});
uw.eventSubscriptions.push(uw.dropListenerForIFrameScrollbars);
},temporarilyDisableHtmlElementScrollbars:function(){
var _8=document.getElementsByTagName("html")[0];
var _9=dojo.style(_8,"overflow");
var _a=dojo.style(_8,"overflowX");
var _b=dojo.style(_8,"overflowY");
uw.modifyScrollbar(_8,null,"hidden");
uw.modifyScrollbar(_8,"X","hidden");
uw.modifyScrollbar(_8,"Y","hidden");
uw.dropListenerForContentPanelScrollbars=dojo.subscribe("/dojox/mdnd/drop",function(){
uw.modifyScrollbar(_8,null,_9);
uw.modifyScrollbar(_8,"X",_a);
uw.modifyScrollbar(_8,"Y",_b);
dojo.unsubscribe(uw.dropListenerForContentPanelScrollbars);
});
uw.eventSubscriptions.push(uw.dropListenerForContentPanelScrollbars);
},temporarilyDisableBodyElementScrollbars:function(){
var _c=dojo.body();
var _d=dojo.style(_c,"overflow");
var _e=dojo.style(_c,"overflowX");
var _f=dojo.style(_c,"overflowY");
uw.modifyScrollbar(_c,null,"hidden");
uw.modifyScrollbar(_c,"X","hidden");
uw.modifyScrollbar(_c,"Y","hidden");
uw.dropListenerForBodyElementScrollbars=dojo.subscribe("/dojox/mdnd/drop",function(){
uw.modifyScrollbar(_c,null,_d);
uw.modifyScrollbar(_c,"X",_e);
uw.modifyScrollbar(_c,"Y",_f);
dojo.unsubscribe(uw.dropListenerForBodyElementScrollbars);
});
uw.eventSubscriptions.push(uw.dropListenerForBodyElementScrollbars);
},temporarilyDisableScrollBarsOnContentPanel:function(){
var _10=dojo.byId("content");
var _11=dojo.style(_10,"overflow");
var _12=dojo.style(_10,"overflowX");
var _13=dojo.style(_10,"overflowY");
uw.modifyScrollbar(_10,null,"hidden");
uw.modifyScrollbar(_10,"X","hidden");
uw.modifyScrollbar(_10,"Y","hidden");
uw.dropListenerForContentPanelScrollbars=dojo.subscribe("/dojox/mdnd/drop",function(){
uw.modifyScrollbar(_10,null,_11);
uw.modifyScrollbar(_10,"X",_12);
uw.modifyScrollbar(_10,"Y",_13);
dojo.unsubscribe(uw.dropListenerForContentPanelScrollbars);
});
uw.eventSubscriptions.push(uw.dropListenerForContentPanelScrollbars);
},modifyScrollbar:function(_14,_15,_16){
if(_15==="y"||_15==="Y"){
dojo.style(_14,"overflowY",_16);
}else{
if(_15==="y"||_15==="Y"){
dojo.style(_14,"overflowX",_16);
}else{
if(!_15||_15===null||_15===""){
dojo.style(_14,"overflow",_16);
}
}
}
},showRemainingPods:function(_17){
_17.enableDnd();
var _18=dojo.query(".hidden-pod",_17.domNode);
var _19=[];
dojo.forEach(_18,function(_1a){
var _1b=_1a.childNodes;
dojo.forEach(_1b,function(_1c){
var _1d=dojo.attr(_1c,"dojoType");
if(_1d&&_1d==="curam.cefwidgets.pods.PodSettings"){
dijit.registry.remove(dojo.attr(_1c,"widgetId"));
}
});
var _1e=dojo.attr(_1a,"class");
_1e+=" dragHandle";
var _1f=dojo.attr(_1a,"closable");
var _20=parseInt(dojo.attr(_1a,"column"),10);
var _21=dojo.attr(_1a,"dndType");
var _22=dojo.attr(_1a,"dragRestriction");
var id=dojo.attr(_1a,"id");
var _23=dojo.attr(_1a,"title");
var _24=dojo.attr(_1a,"toggleable");
var _25=dojo.attr(_1a,"podFilterButtonAltText");
var _26=dojo.attr(_1a,"podCloseButtonAltText");
var _27=dojo.attr(_1a,"expandCollapsePodButtonAltText");
var _28=new curam.cefwidgets.pods.Pod({id:id,title:_23,closeable:_1f,column:_20,dndType:_21,dragRestriction:_22,toggleable:_24,podCloseButtonAltText:_26,podFilterButtonAltText:_25,expandCollapsePodButtonAltText:_27,"class":_1e,content:_1b});
_28._placeSettingsWidgets();
_1a.parentNode.removeChild(_1a);
_19.push(_28);
});
var row=99;
var _29=_17.podDropDelay;
if(_19.length===0){
curam.util.getTopmostWindow().dojo.publish("pods.fullyloaded",[{gridContainer:_17,uw:uw}]);
}
var _2a=[];
dojo.forEach(_19,function(_2b){
_2b.row=row;
uwForTimeout=uw;
_2a.push(_2b.id);
setTimeout(function(){
_17.addChild(_2b,(_2b.column)-1,_2b.row);
_2a.pop(_2b.id);
if(_2a.length==0){
curam.util.getTopmostWindow().dojo.publish("pods.fullyloaded",[{gridContainer:_17,uw:uwForTimeout}]);
}
},_29);
row++;
_29+=_17.podDropDelay;
});
},recordPodPosChange:function(_2c){
if(jsDefaultRecord){
var xml="<user-page-config loadedFromDefault=\"true\">";
jsDefaultRecord=false;
}else{
var xml="<user-page-config>";
}
var _2d=dijit.registry.byClass("dojox.layout.GridContainer").toArray()[0];
var _2e=_2d._grid;
var _2f=0;
for(_2f=0;_2f<_2e.length;_2f++){
var col=_2e[_2f];
var _30=uw.columns[_2f];
var _31=dojo.byId(_30);
if(!_31){
return;
}
var _32=[],id;
var _33=dojo.query("> div",dojo.byId(col.node.id));
var i=0;
for(i=0;i<_33.length;i++){
var _34=dojo.attr(_33[i],"closed");
id=dojo.attr(_33[i],"id");
if(!_34){
if(id){
_32.push(id);
}
}else{
if(_34){
uw.uncheckCheckboxContainer(id);
}
}
}
_31.value=_32.join(",");
var _35=0;
for(_35=0;_35<_32.length;_35++){
xml+="<pod-config";
xml+=" col=\""+_2f+"\"";
xml+=" row=\""+_35+"\"";
xml+=" id =\""+_32[_35]+"\"";
xml+="/>";
}
}
xml+="</user-page-config>";
if(_2c){
var _36="4096";
dojo.xhrPost({url:"SavePodPositionsPage.do",load:function(_37,_38,evt){
},error:function(_39,_3a){
console.log("Error during Pod postition update. See PodContainer.js");
},content:{o3ctx:_36,podPositions:xml,pageID:jsPageID},mimetype:"text/json"});
}
},uncheckCheckboxContainer:function(_3b){
var _3c="cbc_"+_3b;
var _3d=dojo.byId(_3c);
var _3e=_3d.childNodes[0];
_3e.checked=false;
_3e.defaultChecked=false;
},recordPodListSizeChange:function(_3f,_40,_41){
var _42=_3f+","+_40+","+_41;
var _43="4096";
dojo.xhrPost({url:"SavePodListSizePage.do",load:function(_44,_45,evt){
},error:function(_46,_47){
console.log("Error on post size update. See PodContainer.js");
},content:{o3ctx:_43,podListSize:_42,pageID:jsPageID},mimetype:"text/json"});
},registerColumn:function(idx,id){
uw.columns[Number(idx)]=id;
},cancelPodConfig:function(_48,_49,_4a){
var _4b="div[name='"+_4a[0]+"']";
var _4c=dojo.query(_4b)[0];
if(_4c._anim){
return;
}
if(_4c.isOpen===undefined){
_4c.isOpen=dojo.style(_4c,"display")!="none";
}
_4c._anim=dojo.fx.wipeOut({node:_4c,duration:500,onEnd:function(){
_4c.isOpen=false;
_4c._anim=null;
dojo.publish("wipeCompleted",[_4c]);
uw.resetSelections(_4c.id);
}});
_4c._anim.play();
},toggleWipe:function(id){
var _4d=dojo.byId(id);
if(_4d._anim){
return;
}
if(_4d.isOpen===undefined){
_4d.isOpen=dojo.style(_4d,"display")!="none";
}
_4d._anim=dojo.fx[_4d.isOpen?"wipeOut":"wipeIn"]({node:_4d,duration:500,onEnd:function(){
_4d.isOpen=_4d.isOpen?false:true;
uw.toggleSize();
_4d._anim=null;
dojo.publish("wipeCompleted",[_4d]);
}});
_4d._anim.play();
},invokePodSave:function(_4e,_4f,_50){
var _51=dojo.byId(_50[0]);
_51.value="true";
dojo.byId("mainForm").submit();
},processButtonEvent:function(_52,_53,_54,_55){
if(_53.type==="keyup"||_53.type==="keydown"){
if(CEFUtils.enterKeyPress(_53)!==true){
return false;
}
}
if(_53.type==="mouseover"||_53.type==="focus"){
dojo.addClass(_52,"hover");
}else{
if(_53.type==="mouseout"||_53.type==="blur"){
dojo.removeClass(_52,"hover");
dojo.removeClass(_52,"selected");
}else{
if((_53.type==="mousedown")||_53.type==="keydown"){
_52.className=_52.className+" selected";
}else{
if(_53.type==="mouseup"){
dojo.removeClass(_52,"selected");
}else{
if(_53.type==="click"||_53.type==="keyup"){
uw[_54](_52,_53,_55);
}
}
}
}
}
},openCustomizePanel:function(_56,_57,_58){
if(_56.className.indexOf("opened-console")===-1){
_56.className="customize-button opened-console selected";
}else{
_56.className="customize-button closed-console";
}
uw.toggleWipe("podSelectPane");
},savePage:function(_59,_5a,_5b){
curam.util.clickButton("__o3btn.CTL1");
},cancelCustomizePanel:function(_5c,_5d,_5e){
uw.resetSelections("podSelectPane");
uw.toggleWipe("podSelectPane");
},openHelpPage:function(_5f,_60,_61){
dojo.stopEvent(_60);
var _62=curam.config?curam.config.locale:jsL;
var _63;
if(_62.indexOf("en")!=-1){
_63="/help/index.html?"+jsPageID;
}else{
_63="/help_"+_62+"/index.html?"+jsPageID;
}
window.open(_63);
},pageRefresh:function(_64,_65,_66){
curam.util.Refresh.refreshPage(_65);
},pageReset:function(_67,_68,_69){
var _6a=dojo.byId(_69[0]);
_6a.value=true;
dojo.byId("mainForm").submit();
},showTableRow:function(_6b,_6c){
var _6d=_6c.getElementsByTagName("tbody")[0];
for(var i=0;i<_6d.rows.length;i++){
if(dojo.hasClass(_6d.rows[i],"blocked")){
dojo.removeClass(_6d.rows[i],"blocked");
if(i==_6d.rows.length-1){
dojo._setOpacity(_6b,0.3);
dojo._setOpacity(_6b.firstChild,0.3);
dojo.style(_6b,"cursor","default");
}else{
dojo._setOpacity(_6b,1);
dojo._setOpacity(_6b.firstChild,1);
dojo.style(_6b,"cursor","pointer");
}
var _6e=_6b.nextSibling;
dojo._setOpacity(_6e,1);
dojo._setOpacity(_6e.firstChild,1);
dojo.style(_6e,"cursor","pointer");
break;
}
}
},hideTableRow:function(_6f,_70){
var _71=_70.getElementsByTagName("tbody")[0];
var i;
for(i=_71.rows.length-1;i>-1;i--){
if(i==1){
dojo._setOpacity(_6f,0.3);
dojo._setOpacity(_6f.firstChild,0.3);
dojo.style(_6f,"cursor","default");
}
if(!dojo.hasClass(_71.rows[i],"blocked")){
dojo.addClass(_71.rows[i],"blocked");
var _72=_6f.previousSibling;
dojo._setOpacity(_72,1);
dojo._setOpacity(_72.firstChild,1);
dojo.style(_72,"cursor","pointer");
break;
}
if(i==1){
return false;
}
}
if(i>i){
dojo._setOpacity(_6f,1);
dojo._setOpacity(_6f.firstChild,1);
dojo.style(_6f,"cursor","pointer");
}
},resetSelections:function(_73){
uw.toggleWipe(_73);
var _74=dojo.query("input",_73);
for(i=0;i<_74.length;i++){
inputelem=_74[i];
if(inputelem.nodeType==1&&(inputelem.type=="checkbox"||inputelem.type=="radio")){
var att=null;
att=inputelem.defaultChecked;
if(att==null||att==false){
inputelem.checked=false;
}else{
inputelem.checked=true;
}
}
}
},selected:function(_75){
console.debug("page selected "+_75.id);
var _76=dijit.byId("myStackContainer");
dijit.byId("previous").attr("disabled",_75.isFirstChild);
dijit.byId("next").attr("disabled",_75.isLastChild);
},updateListInfo:function(_77){
var _78=dojo.byId(_77.listId);
var _79=dojo.query(".visible-items",_78)[0];
if(_79){
_79.innerHTML=_77.visibleItems;
if(_77.removedItems){
var _7a=dojo.query(".total-items",_78)[0];
var _7b=_7a.innerHTML;
var _7b=_7b-_77.removedItems;
_7a.innerHTML=_7b;
}
}
}};

