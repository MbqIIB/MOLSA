//>>built
define("curam/util",["dojo/dom","dijit/registry","dojo/dom-construct","dojo/ready","dojo/_base/window","dojo/dom-style","dojo/_base/array","dojo/dom-class","dojo/topic","dojo/_base/event","dojo/query","dojo/has","dojo/_base/unload","dojo/dom-geometry","dojo/_base/json","dojo/dom-attr","dojo/_base/lang","dojo/on","curam/define","curam/debug","curam/util/RuntimeContext","curam/util/Constants","dojo/_base/sniff","cm/_base/_dom","curam/util/ResourceBundle"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,on){
dojo.requireLocalization("curam.application","Debug");
var _12=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util",{PREVENT_CACHE_FLAG:"o3pc",INFORMATIONAL_MSGS_STORAGE_ID:"__informationals__",ERROR_MESSAGES_CONTAINER:"error-messages-container",ERROR_MESSAGES_LIST:"error-messages",CACHE_BUSTER:0,CACHE_BUSTER_PARAM_NAME:"o3nocache",msgLocaleSelectorActionPage:"$not-locaized$ Usage of the Language Selector is not permitted from an editable page that has previously been submitted.",insertCssText:function(_13,_14){
var id=_14?_14:"_runtime_stylesheet_";
var _15=_1.byId(id);
var _16;
if(_15){
if(_15.styleSheet){
_13=_15.styleSheet.cssText+_13;
_16=_15;
_16.setAttribute("id","_nodeToRm");
}else{
_15.appendChild(document.createTextNode(_13));
return;
}
}
var pa=document.getElementsByTagName("head")[0];
_15=_3.create("style",{type:"text/css",id:id});
if(_15.styleSheet){
_15.styleSheet.cssText=_13;
}else{
_15.appendChild(document.createTextNode(_13));
}
pa.appendChild(_15);
if(_16){
_16.parentNode.removeChild(_16);
}
},fireRefreshTreeEvent:function(){
if(dojo.global.parent&&dojo.global.parent.amIFrame){
var wpl=dojo.global.parent.loader;
}
if(wpl&&wpl.dojo){
wpl.dojo.publish("refreshTree");
}
},firePageSubmittedEvent:function(_17){
require(["curam/tab"],function(){
var _18=curam.tab.getSelectedTab();
if(_18){
var _19=curam.tab.getTabWidgetId(_18);
var _1a=curam.util.getTopmostWindow();
var ctx=(_17=="dialog")?curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_DIALOG:curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN;
_1a.curam.util.Refresh.getController(_19).pageSubmitted(dojo.global.jsPageID,ctx);
_1a.dojo.publish("/curam/main-content/page/submitted",[dojo.global.jsPageID,_19]);
}else{
curam.debug.log("/curam/main-content/page/submitted: "+_12.getProperty("curam.util.no.open"));
}
});
},fireTabOpenedEvent:function(_1b){
curam.util.getTopmostWindow().dojo.publish("curam.tabOpened",[dojo.global.jsPageID,_1b]);
},setupSubmitEventPublisher:function(){
_4(function(){
var _1c=_1.byId("mainForm");
if(_1c){
curam.util.connect(_1c,"onsubmit",function(){
curam.util.firePageSubmittedEvent("main-content");
});
}
});
},getScrollbar:function(){
var _1d=_3.create("div",{},_5.body());
_6.set(_1d,{width:"100px",height:"100px",overflow:"scroll",position:"absolute",top:"-300px",left:"0px"});
var _1e=_3.create("div",{},_1d);
_6.set(_1e,{width:"400px",height:"400px"});
var _1f=_1d.offsetWidth-_1d.clientWidth;
_3.destroy(_1d);
return {width:_1f};
},isModalWindow:function(){
return (dojo.global.curamModal===undefined)?false:true;
},getTopmostWindow:function(){
if(typeof (dojo.global._curamTopmostWindow)=="undefined"){
var _20=dojo.global;
if(typeof (dojo.global.jsScreenContext)!="undefined"&&dojo.global.jsScreenContext.hasContextBits("CONTEXT_PORTLET")){
dojo.global._curamTopmostWindow=_20;
}else{
if(_20.__extAppTopWin){
dojo.global._curamTopmostWindow=_20;
}else{
while(_20.parent!=_20){
_20=_20.parent;
if(_20.__extAppTopWin){
break;
}
}
dojo.global._curamTopmostWindow=_20;
}
}
}
if(dojo.global._curamTopmostWindow.location.href.indexOf("AppController.do")<0&&typeof (dojo.global._curamTopmostWindow.__extAppTopWin)=="undefined"){
curam.debug.log(_12.getProperty("curam.util.wrong.window")+dojo.global._curamTopmostWindow.location.href);
}
return dojo.global._curamTopmostWindow;
},getUrlParamValue:function(url,_21){
var _22=url.indexOf("?");
if(_22<0){
return null;
}
var _23=url.substring(_22+1,url.length);
function _24(_25){
var _26=_23.split(_25);
_21+="=";
for(var i=0;i<_26.length;i++){
if(_26[i].indexOf(_21)==0){
return _26[i].split("=")[1];
}
}
};
return _24("&")||_24("");
},addUrlParam:function(_27,_28,_29,_2a){
var _2b=_27.indexOf("?")>-1;
var _2c=_2a?_2a:"undefined";
if(!_2b||(_2c==false)){
return _27+(_2b?"&":"?")+_28+"="+_29;
}else{
var _2d=_27.split("?");
_27=_2d[0]+"?"+_28+"="+_29+(_2d[1]!=""?("&"+_2d[1]):"");
return _27;
}
},replaceUrlParam:function(_2e,_2f,_30){
_2e=curam.util.removeUrlParam(_2e,_2f);
return curam.util.addUrlParam(_2e,_2f,_30);
},removeUrlParam:function(url,_31,_32){
var _33=url.indexOf("?");
if(_33<0){
return url;
}
if(url.indexOf(_31+"=")<0){
return url;
}
var _34=url.substring(_33+1,url.length);
var _35=_34.split("&");
var _36;
var _37,_38;
for(var i=0;i<_35.length;i++){
if(_35[i].indexOf(_31+"=")==0){
_38=false;
if(_32){
_37=_35[i].split("=");
if(_37.length>1){
if(_37[1]==_32){
_38=true;
}
}else{
if(_32==""){
_38=true;
}
}
}else{
_38=true;
}
if(_38){
_35.splice(i,1);
i--;
}
}
}
return url.substring(0,_33+1)+_35.join("&");
},stripHash:function(url){
var idx=url.indexOf("#");
if(idx<0){
return url;
}
return url.substring(0,url);
},isSameUrl:function(_39,_3a,rtc){
if(!_3a){
_3a=rtc.getHref();
}
if(_39.indexOf("#")==0){
return true;
}
var _3b=_39.indexOf("#");
if(_3b>-1){
if(_3b==0){
return true;
}
var _3c=_39.split("#");
var _3d=_3a.indexOf("#");
if(_3d>-1){
if(_3d==0){
return true;
}
_3a=_3a.split("#")[0];
}
return _3c[0]==_3a;
}
var _3e=function(url){
var idx=url.lastIndexOf("Page.do");
var len=7;
if(idx<0){
idx=url.lastIndexOf("Action.do");
len=9;
}
if(idx<0){
idx=url.lastIndexOf("Frame.do");
len=8;
}
if(idx>-1&&idx==url.length-len){
return url.substring(0,idx);
}
return url;
};
var rp=curam.util.removeUrlParam;
var _3f=curam.util.stripHash(rp(_3a,curam.util.Constants.RETURN_PAGE_PARAM));
var _40=curam.util.stripHash(rp(_39,curam.util.Constants.RETURN_PAGE_PARAM));
var _41=_40.split("?");
var _42=_3f.split("?");
_42[0]=_3e(_42[0]);
_41[0]=_3e(_41[0]);
var _43=(_42[0]==_41[0]||_42[0].match(_41[0]+"$")==_41[0]);
if(!_43){
return false;
}
if(_42.length==1&&_41.length==1&&_43){
return true;
}else{
var _44;
var _45;
if(typeof _42[1]!="undefined"&&_42[1]!=""){
_44=_42[1].split("&");
}else{
_44=new Array();
}
if(typeof _41[1]!="undefined"&&_41[1]!=""){
_45=_41[1].split("&");
}else{
_45=new Array();
}
curam.debug.log("curam.util.isSameUrl: paramsHere "+_12.getProperty("curam.util.before")+_44.length);
_44=_7.filter(_44,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_12.getProperty("curam.util.after")+_44.length);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_12.getProperty("curam.util.before")+_45.length);
_45=_7.filter(_45,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_12.getProperty("curam.util.after")+_45.length);
if(_44.length!=_45.length){
return false;
}
var _46={};
var _47;
for(var i=0;i<_44.length;i++){
_47=_44[i].split("=");
_46[_47[0]]=_47[1];
}
for(var i=0;i<_45.length;i++){
_47=_45[i].split("=");
if(_46[_47[0]]!=_47[1]){
curam.debug.log(_12.getProperty("curam.util.no.match",[_47[0],_47[1],_46[_47[0]]]));
return false;
}
}
}
return true;
},isNotCDEJParam:function(_48){
return !((_48.charAt(0)=="o"&&_48.charAt(1)=="3")||(_48.charAt(0)=="_"&&_48.charAt(1)=="_"&&_48.charAt(2)=="o"&&_48.charAt(3)=="3"));
},setAttributes:function(_49,map){
for(var x in map){
_49.setAttribute(x,map[x]);
}
},invalidatePage:function(){
curam.PAGE_INVALIDATED=true;
var _4a=dojo.global.dialogArguments?dojo.global.dialogArguments[0]:opener;
if(_4a&&_4a!=dojo.global){
try{
_4a.curam.util.invalidatePage();
}
catch(e){
curam.debug.log(_12.getProperty("curam.util.error"),e);
}
}
},redirectWindow:function(_4b,_4c,_4d){
var rtc=new curam.util.RuntimeContext(dojo.global);
var _4e=function(_4f,_50,_51,_52,_53){
curam.util.getFrameRoot(_4f,_50).curam.util.redirectContentPanel(_51,_52,_53);
};
curam.util._doRedirectWindow(_4b,_4c,_4d,dojo.global.jsScreenContext,rtc,curam.util.publishRefreshEvent,_4e);
},_doRedirectWindow:function(_54,_55,_56,_57,rtc,_58,_59){
if(_54&&curam.util.isActionPage(_54)){
curam.debug.log(_12.getProperty("curam.util.stopping"),_54);
return;
}
var rpl=curam.util.replaceUrlParam;
var _5a=_57.hasContextBits("TREE")||_57.hasContextBits("AGENDA")||_57.hasContextBits("ORG_TREE");
if(curam.util.FORCE_REFRESH){
_54=rpl(rtc.getHref(),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
if(curam.util.isModalWindow()||_5a){
_58();
dojo.global.location.href=_54;
}else{
if(_57.hasContextBits("LIST_ROW_INLINE_PAGE")||_57.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(_54);
}else{
_58();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
require(["curam/tab"],function(){
_59(dojo.global,curam.tab.getTabController().ROOT_OBJ,_54,true,true);
});
}
}
}
return;
}
var u=curam.util;
var rtc=new curam.util.RuntimeContext(dojo.global);
if(!_5a&&!_55&&!curam.PAGE_INVALIDATED&&u.isSameUrl(_54,null,rtc)){
return;
}
if(curam.util.isModalWindow()||_5a){
_54=rpl(rpl(_54,"o3frame","modal"),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
var _5b=_3.create("form",{action:_54,method:"POST"});
if(!_5a){
if(!_1.byId("o3ctx")){
_5b.action=curam.util.removeUrlParam(_5b.action,"o3ctx");
var _5c=_3.create("input",{type:"hidden",id:"o3ctx",name:"o3ctx",value:_57.getValue()},_5b);
}
_5.body().appendChild(_5b);
_58();
_5b.submit();
}
if(!_56){
if(_5a){
curam.util.redirectFrame(_54);
}
}
}else{
if(_57.hasContextBits("LIST_ROW_INLINE_PAGE")||_57.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(_54);
}else{
_58();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
if(_57.hasContextBits("EXTAPP")){
var _5d=window.top;
_5d.dijit.byId("curam-app").updateMainContentIframe(_54);
}else{
require(["curam/tab"],function(){
curam.util.getFrameRoot(dojo.global,curam.tab.getTabController().ROOT_OBJ).curam.util.redirectContentPanel(_54,_55);
});
}
}
}
}
},_handleInlinePageRefresh:function(_5e){
curam.debug.log(_12.getProperty("curam.util.closing.modal"),_5e);
var _5f=new curam.ui.PageRequest(_5e);
require(["curam/tab"],function(){
curam.tab.getTabController().checkPage(_5f,function(_60){
curam.util.publishRefreshEvent();
dojo.global.location.reload(true);
});
});
},redirectContentPanel:function(url,_61,_62){
require(["curam/tab"],function(){
var _63=curam.tab.getContentPanelIframe();
var _64=url;
if(_63!=null){
var rpu=curam.util.Constants.RETURN_PAGE_PARAM;
var _65=null;
if(url.indexOf(rpu+"=")>=0){
curam.debug.log("curam.util.redirectContentPanel: "+_12.getProperty("curam.util.rpu"));
_65=decodeURIComponent(curam.util.getUrlParamValue(url,rpu));
}
if(_65){
_65=curam.util.removeUrlParam(_65,rpu);
_64=curam.util.replaceUrlParam(url,rpu,encodeURIComponent(_65));
}
}
var _66=new curam.ui.PageRequest(_64);
if(_61){
_66.forceLoad=true;
}
if(_62){
_66.justRefresh=true;
}
curam.tab.getTabController().handlePageRequest(_66);
});
},redirectFrame:function(_67){
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
var _68=curam.util.getFrameRoot(dojo.global,"wizard").targetframe;
_68.curam.util.publishRefreshEvent();
_68.location.href=_67;
}else{
if(dojo.global.jsScreenContext.hasContextBits("ORG_TREE")){
var _68=curam.util.getFrameRoot(dojo.global,"orgTreeRoot");
_68.curam.util.publishRefreshEvent();
_68.dojo.publish("orgTree.refreshContent",[_67]);
}else{
var _69=curam.util.getFrameRoot(dojo.global,"iegtree");
var _6a=_69.navframe||_69.frames[0];
var _6b=_69.contentframe||_69.frames["contentframe"];
_6b.curam.util.publishRefreshEvent();
if(curam.PAGE_INVALIDATED||_6a.curam.PAGE_INVALIDATED){
var _6c=curam.util.modifyUrlContext(_67,"ACTION");
_6b.location.href=_6c;
}else{
_6b.location.href=_67;
}
}
}
return true;
},publishRefreshEvent:function(){
_9.publish("/curam/page/refresh");
},openGenericErrorModalDialog:function(_6d,_6e,_6f,_70,_71){
var url;
var _72;
var sc=new curam.util.ScreenContext("MODAL");
var _73="titlePropertyName="+_6e+"&";
var _74="messagePropertyName="+_6f+"&";
var _75="errorModal="+_71+"&";
if(_70){
_72="messagePlaceholder1="+_70+"&";
url="generic-modal-error.jspx?"+_73+_74+_72+_75+sc.toRequestString();
}else{
url="generic-modal-error.jspx?"+_73+_74+sc.toRequestString();
}
curam.util.openModalDialog({href:url},_6d);
},openModalDialog:function(_76,_77,_78,top,_79){
var _7a;
if(!_76||!_76.href){
_76=_a.fix(_76);
var _7b=_76.target;
while(_7b.tagName!="A"&&_7b!=_5.body()){
_7b=_7b.parentNode;
}
_7a=_7b.href;
_7b._isModal=true;
_a.stop(_76);
}else{
_7a=_76.href;
_76._isModal=true;
}
require(["curam/dialog"]);
var _7c=curam.dialog.parseWindowOptions(_77);
curam.util.showModalDialog(_7a,_76,_7c["width"],_7c["height"],_78,top,false,null,null,_79);
return false;
},showModalDialog:function(url,_7d,_7e,_7f,_80,top,_81,_82,_83,_84){
var _85=curam.util.getTopmostWindow();
if(dojo.global!=_85){
curam.debug.log("curam.util.showModalDialog: "+_12.getProperty("curam.util.redirecting.modal"));
_85.curam.util.showModalDialog(url,_7d,_7e,_7f,_80,top,_81,_82,dojo.global,_84);
return;
}
var rup=curam.util.replaceUrlParam;
url=rup(url,"o3frame","modal");
url=curam.util.modifyUrlContext(url,"MODAL","TAB|LIST_ROW_INLINE_PAGE|LIST_EVEN_ROW|NESTED_UIM");
url=rup(url,curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
curam.debug.log(_12.getProperty("curam.util.modal.url"),url);
if(_7e){
_7e=typeof (_7e)=="number"?_7e:parseInt(_7e);
}
if(_7f){
_7f=typeof (_7f)=="number"?_7f:parseInt(_7f);
}
if(!curam.util._isModalCurrentlyOpening()){
curam.util._setModalCurrentlyOpening(true);
require(["curam/ModalDialog"]);
new curam.ModalDialog({href:url,width:_7e,height:_7f,openNode:(_7d&&_7d.target)?_7d.target:null,parentWindow:_83,uimToken:_84});
}
},_isModalCurrentlyOpening:function(){
return curam.util.getTopmostWindow().curam.util._modalOpenInProgress;
},_setModalCurrentlyOpening:function(_86){
curam.util.getTopmostWindow().curam.util._modalOpenInProgress=_86;
},setupPreferencesLink:function(_87){
_4(function(){
var _88=_b(".user-preferences")[0];
if(_88){
if(typeof (_88._disconnectToken)=="undefined"){
_88._disconnectToken=curam.util.connect(_88,"onclick",curam.util.openPreferences);
}
if(!_87){
_87=dojo.global.location.href;
}
if(curam.util.isActionPage(_87)){
_8.replace(_88,"disabled","enabled");
_88._curamDisable=true;
}else{
_8.replace(_88,"enabled","disabled");
_88._curamDisable=false;
}
}else{
curam.debug.log(_12.getProperty("curam.util.no.setup"));
}
});
},openPreferences:function(_89){
_a.stop(_89);
if(_89.target._curamDisable){
return;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("user-prefs-editor.jspx",{dialogOptions:"width=450"});
});
},openAbout:function(_8a){
_a.stop(_8a);
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("about.jsp",{dialogOptions:"width=645,height=480"});
});
},addMinWidthCalendarCluster:function(id){
var _8b=_1.byId(id);
var i=0;
function _8c(evt){
_7.forEach(_8b.childNodes,function(_8d){
if(_8.contains(_8d,"cluster")){
_6.set(_8d,"width","97%");
if(_8d.clientWidth<700){
_6.set(_8d,"width","700px");
}
}
});
};
if(_c("ie")>6){
_7.forEach(_8b.childNodes,function(_8e){
if(_8.contains(_8e,"cluster")){
_6.set(_8e,"minWidth","700px");
}
});
}else{
on(dojo.global,"resize",_8c);
_4(_8c);
}
},addPopupFieldListener:function(id){
if(!_c("ie")||_c("ie")>6){
return;
}
if(!curam.util._popupFields){
function _8f(evt){
var _90=0;
var j=0;
var x=0;
var arr=curam.util._popupFields;
_7.forEach(curam.util._popupFields,function(id){
var _91=_1.byId(id);
_b("> .popup-actions",_91).forEach(function(_92){
_90=_92.clientWidth+30;
});
_b("> .desc",_91).forEach(function(_93){
_6.set(_93,"width",Math.max(0,_91.clientWidth-_90)+"px");
});
});
};
curam.util._popupFields=[id];
on(dojo.global,"resize",_8f);
_4(_8f);
}else{
curam.util._popupFields.push(id);
}
},addContentWidthListener:function(id){
if(_c("ie")>6){
return;
}
var _94=_6.set;
var _95=_8.contains;
function _96(evt){
var i=0;
var _97=_1.byId("content");
if(_97){
var _98=_97.clientWidth;
if(_c("ie")==6&&_1.byId("footer")){
var _99=_5.body().clientHeight-100;
_94(_97,"height",_99+"px");
var _9a=_1.byId("sidebar");
if(_9a){
_94(_9a,"height",_99+"px");
}
}
try{
_b("> .page-title-bar",_97).forEach(function(_9b){
var _9c=_e.getMarginSize(_9b).w-_e.getContentBox(_9b).w;
if(!_c("ie")){
_9c+=1;
}
_98=_97.clientWidth-_9c;
_6.set(_9b,"width",_98+"px");
});
}
catch(e){
}
_b("> .page-description",_97).style("width",_98+"px");
_b("> .in-page-navigation",_97).style("width",_98+"px");
}
};
curam.util.subscribe("/clusterToggle",_96);
curam.util.connect(dojo.global,"onresize",_96);
_4(_96);
},alterScrollableListBottomBorder:function(id,_9d){
var _9e=_9d;
var _9f="#"+id+" table";
function _a0(){
var _a1=_b(_9f)[0];
if(_a1.offsetHeight>=_9e){
var _a2=_b(".odd-last-row",_a1)[0];
if(typeof _a2!="undefined"){
_8.add(_a2,"no-bottom-border");
}
}else{
if(_a1.offsetHeight<_9e){
var _a2=_b(".even-last-row",_a1)[0];
if(typeof _a2!="undefined"){
_8.add(_a2,"add-bottom-border");
}
}else{
curam.debug.log("curam.util.alterScrollableListBottomBorder: "+_12.getProperty("curam.util.code"));
}
}
};
_4(_a0);
},addFileUploadResizeListener:function(_a3){
function _a4(evt){
if(_b(".widget")){
_b(".widget").forEach(function(_a5){
var _a6=_a5.clientWidth;
if(_b(".fileUpload",_a5)){
_b(".fileUpload",_a5).forEach(function(_a7){
fileUploadWidth=_a6/30;
if(fileUploadWidth<4){
_a7.size=1;
}else{
_a7.size=fileUploadWidth;
}
});
}
});
}
};
on(dojo.global,"resize",_a4);
_4(_a4);
},openCenteredNonModalWindow:function(url,_a8,_a9,_aa){
_a8=Number(_a8);
_a9=Number(_a9);
var _ab=(screen.width-_a8)/2;
var _ac=(screen.height-_a9)/2;
_a9=_ac<0?screen.height:_a9;
_ac=Math.max(0,_ac);
_a8=_ab<0?screen.width:_a8;
_ab=Math.max(0,_ab);
var _ad="left",top="top";
if(_c("ff")){
_ad="screenX",top="screenY";
}
var _ae="location=no, menubar=no, status=no, toolbar=no, "+"scrollbars=yes, resizable=no";
var _af=dojo.global.open(url,_aa||"name","width="+_a8+", height="+_a9+", "+_ad+"="+_ab+","+top+"="+_ac+","+_ae);
_af.resizeTo(_a8,_a9);
_af.moveTo(_ab,_ac);
_af.focus();
},adjustTargetContext:function(win,_b0){
if(win&&win.dojo.global.jsScreenContext){
var _b1=win.dojo.global.jsScreenContext;
_b1.updateStates(dojo.global.jsScreenContext);
return curam.util.replaceUrlParam(_b0,"o3ctx",_b1.getValue());
}
return _b0;
},modifyUrlContext:function(url,_b2,_b3){
var _b4=url;
var ctx=new curam.util.ScreenContext();
var _b5=curam.util.getUrlParamValue(url,"o3ctx");
if(_b5){
ctx.setContext(_b5);
}else{
ctx.clear();
}
if(_b2){
ctx.addContextBits(_b2);
}
if(_b3){
ctx.clear(_b3);
}
_b4=curam.util.replaceUrlParam(url,"o3ctx",ctx.getValue());
return _b4;
},updateCtx:function(_b6){
var _b7=curam.util.getUrlParamValue(_b6,"o3ctx");
if(!_b7){
return _b6;
}
return curam.util.modifyUrlContext(_b6,null,"MODAL");
},getFrameRoot:function(_b8,_b9){
var _ba=false;
var _bb=_b8;
if(_bb){
while(_bb!=top&&!_bb.rootObject){
_bb=_bb.parent;
}
if(_bb.rootObject){
_ba=(_bb.rootObject==_b9);
}
}
return _ba?_bb:null;
},saveInformationalMsgs:function(_bc){
curam.util.runStorageFn(function(){
try{
var _bd=curam.util.getTopmostWindow().dojox;
_bd.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,_f.toJson({pageID:_5.body().id,total:_1.byId(curam.util.ERROR_MESSAGES_CONTAINER).innerHTML,listItems:_1.byId(curam.util.ERROR_MESSAGES_LIST).innerHTML}));
}
catch(e){
curam.debug.log(_12.getProperty("curam.util.exception"),e);
}
},_bc);
},runStorageFn:function(fn,_be){
var _bf=function(){
fn();
if(_be){
setTimeout(_be,10);
}
};
var _c0=curam.util.getTopmostWindow().dojox;
require(["dojox/storage"],function(){
var mgr=_c0.storage.manager;
if(mgr.isInitialized()){
_bf();
}else{
if(mgr.addOnLoad){
mgr.addOnLoad(_bf);
}else{
var _c1={exp:_bf};
on(mgr,"loaded",_c1,"exp");
}
}
});
},disableInformationalLoad:function(){
curam.util._informationalsDisabled=true;
},redirectDirectUrl:function(){
_4(function(){
if(dojo.global.parent==dojo.global){
var url=document.location.href;
var idx=url.lastIndexOf("/");
if(idx>-1){
if(idx<=url.length){
url=url.substring(idx+1);
}
}
dojo.global.location=jsBaseURL+"/AppController.do?o3gtu="+encodeURIComponent(url);
}
});
},loadInformationalMsgs:function(){
_4(function(){
if(dojo.global.jsScreenContext.hasContextBits("CONTEXT_PANEL")){
return;
}
if(curam.util._informationalsDisabled){
return;
}
curam.util.runStorageFn(function(){
var _c2=curam.util.getTopmostWindow().dojox;
var _c3=_c2.storage.get(curam.util.INFORMATIONAL_MSGS_STORAGE_ID);
if(_c3&&_c3!=""){
_c3=_f.fromJson(_c3);
_c2.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,"");
var div=_1.byId(curam.util.ERROR_MESSAGES_CONTAINER);
var _c4=_1.byId(curam.util.ERROR_MESSAGES_LIST);
if(_c3.pageID!=_5.body().id){
return;
}
if(_c4){
var _c5=_3.create("ul",{innerHTML:_c3.listItems});
var _c6=[];
for(var i=0;i<_c4.childNodes.length;i++){
if(_c4.childNodes[i].tagName=="LI"){
_c6.push(_c4.childNodes[i]);
}
}
var _c7=false;
var _c8=_c5.childNodes;
for(var i=0;i<_c8.length;i++){
_c7=false;
for(var j=0;j<_c6.length;j++){
if(_c8[i].innerHTML==_c6[j].innerHTML){
_c7=true;
break;
}
}
if(!_c7){
_c4.appendChild(_c8[i]);
i--;
}
}
}else{
if(div){
div.innerHTML=_c3.total;
}
}
}
var _c9=dojo.byId("error-messages");
if(_c9&&!dojo.global.jsScreenContext.hasContextBits("MODAL")){
_c9.focus();
}
});
});
},setFocus:function(){
var _ca=curam.util.getUrlParamValue(dojo.global.location.href,"o3frame")=="modal";
if(!_ca){
_4(curam.util.doSetFocus);
}
},doSetFocus:function(){
var _cb=-1;
var _cc=-1;
var _cd=document.forms[0];
if(!_cd){
return false;
}
var _ce=_cd.elements;
var l=_ce.length;
var _cf;
for(var i=0;i<l;i++){
_cf=_ce[i];
if(_cb==-1&&(_cf.type=="select-one"||_cf.type=="text"||_cf.tagName=="TEXTAREA")&&!_8.contains(_cf,"dijitArrowButtonInner")&&!_8.contains(_cf,"dijitValidationInner")){
_cb=i;
}
if(_cf.tabIndex=="1"){
_cf.tabIndex=0;
_cc=i;
break;
}
}
var _cf;
if(_cc!=-1){
_cf=_ce[_cc];
}else{
if(_cb!=-1){
_cf=_ce[_cb];
}
}
try{
var _d0=dojo.byId("error-messages");
if(_d0){
_d0.focus();
}else{
_cf.focus();
}
}
catch(e){
curam.debug.log(_12.getProperty("curam.util.error.focus"),e.message);
return false;
}
return true;
},openLocaleSelector:function(_d1){
_d1=_a.fix(_d1);
var _d2=_d1.target;
while(_d2&&_d2.tagName!="A"){
_d2=_d2.parentNode;
}
var loc=_d2.href;
var rpu=curam.util.getUrlParamValue(loc,"__o3rpu");
rpu=curam.util.removeUrlParam(rpu,"__o3rpu");
var _d3="user-locale-selector.jspx"+"?__o3rpu="+rpu;
if(!curam.util.isActionPage(dojo.global.location.href)){
openModalDialog({href:_d3},"width=500,height=300",200,150);
}else{
alert(curam.util.msgLocaleSelectorActionPage);
}
return false;
},isActionPage:function(url){
var _d4=curam.util.getLastPathSegmentWithQueryString(url);
var _d5=_d4.split("?")[0];
return _d5.indexOf("Action.do")>-1;
},closeLocaleSelector:function(_d6){
_d6=_a.fix(_d6);
_a.stop(_d6);
dojo.global.close();
return false;
},getSuffixFromClass:function(_d7,_d8){
var _d9=_10.get(_d7,"class").split(" ");
var _da=_7.filter(_d9,function(_db){
return _db.indexOf(_d8)==0;
});
if(_da.length>0){
return _da[0].split(_d8)[1];
}else{
return null;
}
},getCacheBusterParameter:function(){
return this.CACHE_BUSTER_PARAM_NAME+"="+new Date().getTime()+"_"+this.CACHE_BUSTER++;
},stripeTable:function(_dc,_dd,_de){
var _df=_dc.tBodies[0];
var _e0=(_dd?2:1);
if(_df.rows.length<_e0){
return;
}
var _e1=_df.rows;
for(var i=0;i<_e1.length;i+=_e0){
curam.debug.log("curam.util.stripeTable(%s, %s): i = %s",_dc,_dd,i);
var _e2=[_e1[i]];
if(_dd&&_e1[i+1]){
_e2.push(_e1[i+1]);
}
_7.forEach(_e2,function(row){
_8.remove(row,"odd-last-row");
_8.remove(row,"even-last-row");
});
if(i%(2*_e0)==0){
_7.forEach(_e2,function(row){
cm.replaceClass(row,"odd","even");
});
if(i==_de){
_7.forEach(_e2,function(row){
_8.add(row,"odd-last-row");
});
}
}else{
_7.forEach(_e2,function(row){
cm.replaceClass(row,"even","odd");
});
if(i==_de){
_7.forEach(_e2,function(row){
_8.add(row,"even-last-row");
});
}
}
}
},fillString:function(_e3,_e4){
var _e5="";
while(_e4>0){
_e5+=_e3;
_e4-=1;
}
return _e5;
},updateHeader:function(qId,_e6,_e7,_e8){
var _e9=_1.byId("header_"+qId);
_e9.firstChild.nextSibling.innerHTML=_e6;
answerCell=_1.byId("chosenAnswer_"+qId);
answerCell.innerHTML=_e7;
sourceCell=_1.byId("chosenSource_"+qId);
sourceCell.innerHTML=_e8;
},search:function(_ea,_eb){
var _ec=_2.byId(_ea).get("value");
var _ed=_2.byId(_eb);
var _ee=_ed?_ed.get("value"):null;
var _ef="";
var _f0;
var _f1;
if(_ee){
_f1=_ee.split("|");
_ef=_f1[0];
_f0=_f1[1];
}
var _f2=curam.util.defaultSearchPageID;
var _f3="";
if(_ef===""){
_f3=_f2+"Page.do?searchText="+encodeURIComponent(_ec);
}else{
_f3=_f0+"Page.do?searchText="+encodeURIComponent(_ec)+"&searchType="+encodeURIComponent(_ef);
}
var _f4=new curam.ui.PageRequest(_f3);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_f4);
});
},updateDefaultSearchText:function(_f5,_f6){
var _f7=_2.byId(_f5);
var _f8=_2.byId(_f6);
var _f9=_f7?_f7.get("value"):null;
var str=_f9.split("|")[2];
_f8.set("placeHolder",str);
},updateSearchBtnState:function(_fa,_fb){
var _fc=_2.byId(_fa);
var btn=_1.byId(_fb);
var _fd=_fc.get("value");
if(!_fd||_11.trim(_fd).length<1){
_8.add(btn,"dijitDisabled");
}else{
_8.remove(btn,"dijitDisabled");
}
},furtherOptionsSearch:function(){
var _fe=curam.util.furtherOptionsPageID+"Page.do";
var _ff=new curam.ui.PageRequest(_fe);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_ff);
});
},searchButtonStatus:function(_100){
var btn=dojo.byId(_100);
if(!dojo.hasClass(btn,"dijitDisabled")){
return true;
}
},getPageHeight:function(){
var _101=400;
var _102=0;
if(_b("frameset").length>0){
curam.debug.log("curam.util.getPageHeight() "+_12.getProperty("curam.util.default.height"),_101);
_102=_101;
}else{
var _103=function(node){
if(!node){
curam.debug.log(_12.getProperty("curam.util.node"));
return 0;
}
var mb=_e.getMarginSize(node);
var pos=_e.position(node);
return pos.y+mb.h;
};
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")){
var _104=_b("div.bottom")[0];
var _105=_103(_104);
curam.debug.log(_12.getProperty("curam.util.page.height"),_105);
curam.debug.log(_12.getProperty("curam.util.ie7.issue"));
_102=_105+1;
}else{
var _106=_1.byId("content")||_1.byId("wizard-content");
var _107=_b("> *",_106).filter(function(n){
return n.tagName.indexOf("SCRIPT")<0&&_6.get(n,"visibility")!="hidden"&&_6.get(n,"display")!="none";
});
var _108=_107[0];
for(var i=1;i<_107.length;i++){
if(_103(_107[i])>=_103(_108)){
_108=_107[i];
}
}
_102=_103(_108);
curam.debug.log("curam.util.getPageHeight() "+_12.getProperty("curam.util.base.height"),_102);
var _109=_b(".actions-panel",_5.body());
if(_109.length>0){
var _10a=_e.getMarginBox(_109[0]).h;
curam.debug.log("curam.util.getPageHeight() "+_12.getProperty("curam.util.panel.height"));
_102+=_10a;
_102+=10;
}
var _10b=_b("body.details");
if(_10b.length>0){
curam.debug.log("curam.util.getPageHeight() "+_12.getProperty("curam.util.bar.height"));
_102+=20;
}
}
}
curam.debug.log("curam.util.getPageHeight() "+_12.getProperty("curam.util.returning"),_102);
return _102;
},toCommaSeparatedList:function(_10c){
var _10d="";
for(var i=0;i<_10c.length;i++){
_10d+=_10c[i];
if(i<_10c.length-1){
_10d+=",";
}
}
return _10d;
},skipLinkFocus:function(){
var dest=dojo.byId("skip-dest");
if(dest){
dest.focus();
}
},setupGenericKeyHandler:function(){
_4(function(){
var f=function(_10e){
if(dojo.global.jsScreenContext.hasContextBits("MODAL")&&_10e.keyCode==27){
var ev=_a.fix(_10e);
var _10f=_2.byId(ev.target.id);
var _110=typeof _10f!="undefined"&&_10f.baseClass=="dijitTextBox dijitComboBox";
if(!_110){
curam.dialog.closeModalDialog();
}
}
if(_10e.keyCode==13){
var ev=_a.fix(_10e);
var _111=ev.target.type=="text";
var _112=ev.target.type=="radio";
var _113=ev.target.type=="checkbox";
var _114=ev.target.type=="select-multiple";
var _115=ev.target.type=="password";
var _116=_2.byId(ev.target.id);
if(typeof _116!="undefined"){
var _117=_2.byNode(dojo.byId("widget_"+ev.target.id));
if(_117&&_117.enterKeyOnOpenDropDown){
_117.enterKeyOnOpenDropDown=false;
return false;
}
}
var _118=typeof _116!="undefined"&&_116.baseClass=="dijitComboBox";
if((!_111&&!_112&&!_113&&!_114&&!_115)||_118){
return true;
}
var _119=null;
var _11a=_b(".curam-default-action");
if(_11a.length>0){
_119=_11a[0];
}else{
var _11b=_b("input[type='submit']");
if(_11b.length>0){
_119=_11b[0];
}
}
if(_119!=null){
_a.stop(_a.fix(_10e));
curam.util.clickButton(_119);
return false;
}
dojo.require("curam.dateSelectorUtil");
var _11c=dojo.byId("year");
if(_11c){
dojo.stopEvent(dojo.fixEvent(_10e));
curam.dateSelectorUtil.updateCalendar();
}
}
return true;
};
curam.util.connect(_5.body(),"onkeyup",f);
});
},enterKeyPress:function(_11d){
if(_11d.keyCode==13){
return true;
}
},isShiftTab:function(e){
if(e.shiftKey&&e.keyCode==9){
var elem,evt=e?e:event;
if(evt.srcElement){
elem=evt.srcElement;
}else{
if(evt.target){
elem=evt.target;
}
}
if(elem.previousSibling.className=="dijitDialogHelpIcon"){
return false;
}else{
var _11e=elem.parentElement.parentElement.id;
var _11f=dojo.byId("end-"+_11e);
if(_11f){
_11f.focus();
}
}
}
},focusHelpIconOnTab:function(e){
if(!e.shiftKey&&e.keyCode==9){
var _120=dojo.query(".dijitDialogHelpIcon")[0];
if(_120){
setTimeout(function(){
_120.focus();
},5);
}
}
},swapState:function(node,_121,_122,_123){
if(_121){
_8.replace(node,_122,_123);
}else{
_8.replace(node,_123,_122);
}
},makeQueryString:function(_124){
if(!_124||_124.length==0){
return "";
}
var _125=[];
for(var _126 in _124){
_125.push(_126+"="+encodeURIComponent(_124[_126]));
}
return "?"+_125.join("&");
},clickHandlerForListActionMenu:function(url,_127,_128,_129){
if(_127){
var href=curam.util.replaceUrlParam(url,"o3frame","modal");
var ctx=dojo.global.jsScreenContext;
ctx.addContextBits("MODAL");
href=curam.util.replaceUrlParam(href,"o3ctx",ctx.getValue());
curam.util.redirectWindow(href);
return;
}
var _12a={href:url};
require(["curam/ui/UIMPageAdaptor"]);
if(curam.ui.UIMPageAdaptor.allowLinkToContinue(_12a)){
dojo.global.location=url;
return;
}
if(_12a!=null){
if(_129){
_a.fix(_129);
_a.stop(_129);
}
if(!_12a.href||_12a.href.length==0){
return;
}
if(_128&&!curam.util.isInternal(url)){
dojo.global.open(url);
}else{
if(curam.ui.UIMPageAdaptor.isLinkValidForTabProcessing(_12a)){
var _12b=new curam.ui.PageRequest(_12a.href);
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")||dojo.global.jsScreenContext.hasContextBits("NESTED_UIM")){
_12b.pageHolder=dojo.global;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_12b);
});
}
}
}
},clickHandlerForMailtoLinks:function(_12c,url){
dojo.stopEvent(_12c);
var _12d=dojo.query("#mailto_frame")[0];
if(!_12d){
_12d=dojo.io.iframe.create("mailto_frame","");
}
_12d.src=url;
return false;
},isInternal:function(url){
var path=url.split("?")[0];
var _12e=path.match("Page.do");
if(_12e!=null){
return true;
}
return false;
},getLastPathSegmentWithQueryString:function(url){
var _12f=url.split("?");
var _130=_12f[0].split("/");
return _130[_130.length-1]+(_12f[1]?"?"+_12f[1]:"");
},replaceSubmitButton:function(name){
if(curam.replacedButtons[name]=="true"){
return;
}
var _131="__o3btn."+name;
var _132;
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_132=_b("input[id='"+_131+"']");
}else{
_132=_b("input[name='"+_131+"']");
}
_132.forEach(function(_133,_134,_135){
_133.tabIndex=-1;
var _136=_133.parentNode;
var _137="btn-id-"+_134;
curam.util.setupWidgetLoadMask("a."+_137);
var _138="ac initially-hidden-widget "+_137;
if(_8.contains(_133,"first-action-control")){
_138+=" first-action-control";
}
var _139=_3.create("a",{"class":_138,href:"#"},_133,"before");
var _13a=dojo.query(".page-level-menu")[0];
if(_13a){
dojo.attr(_139,"title",_133.value);
}
_3.create("span",{"class":"filler"},_139,"before");
var left=_3.create("span",{"class":"left-corner"},_139);
var _13b=_3.create("span",{"class":"right-corner"},left);
var _13c=_3.create("span",{"class":"middle"},_13b);
_13c.appendChild(document.createTextNode(_133.value));
curam.util.addActionControlClass(_139);
on(_139,"click",function(_13d){
curam.util.clickButton(this._submitButton);
_a.stop(_13d);
});
_139._submitButton=_135[0];
_8.add(_133,"hidden-button");
});
curam.replacedButtons[name]="true";
},setupWidgetLoadMask:function(_13e){
curam.util.subscribe("/curam/page/loaded",function(){
var _13f=_b(_13e)[0];
if(_13f){
_6.set(_13f,"visibility","visible");
}else{
curam.debug.log("setupButtonLoadMask: "+_12.getProperty("curam.util.not.found")+"'"+_13e+"'"+_12.getProperty("curam.util.ignore.mask"));
}
});
},optReplaceSubmitButton:function(name){
if(curam.util.getFrameRoot(dojo.global,"wizard")==null){
curam.util.replaceSubmitButton(name);
return;
}
var _140=curam.util.getFrameRoot(dojo.global,"wizard").navframe.wizardNavigator;
if(_140.delegatesSubmit[jsPageID]!="assumed"){
curam.util.replaceSubmitButton(name);
}
},clickButton:function(_141){
var _142=_1.byId("mainForm");
var _143;
if(!_141){
curam.debug.log("curam.util.clickButton: "+_12.getProperty("curam.util..no.arg"));
return;
}
if(typeof (_141)=="string"){
var _144=_141;
curam.debug.log("curam.util.clickButton: "+_12.getProperty("curam.util.searching")+_12.getProperty("curam.util.id.of")+"'"+_144+"'.");
_141=_b("input[id='"+_144+"']")[0];
if(!_141.form&&!_141.id){
curam.debug.log("curam.util.clickButton: "+_12.getProperty("curam.util.searched")+_12.getProperty("curam.util.id.of")+"'"+_144+_12.getProperty("curam.util.exiting"));
return;
}
}
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_143=_141;
}else{
_143=_b("input[name='"+_141.id+"']",_142)[0];
}
try{
if(_10.get(_142,"action").indexOf(jsPageID)==0){
curam.util.publishRefreshEvent();
}
_143.click();
}
catch(e){
curam.debug.log(_12.getProperty("curam.util.exception.clicking"));
}
},printPage:function(_145){
_a.stop(_145);
var _146=dojo.window.get(_145.currentTarget.ownerDocument);
var _147=_146.frameElement;
var _148=_147;
while(_148&&!dojo.hasClass(_148,"tab-content-holder")){
_148=_148.parentNode;
}
var _149=_148;
var _14a=dojo.query(".detailsPanelFrame",_149)[0];
if(_14a!=undefined&&_14a!=null){
_14a.contentWindow.focus();
_14a.contentWindow.print();
}
_146.focus();
_146.print();
return false;
},addSelectedClass:function(_14b){
_8.add(_14b.target,"selected");
},removeSelectedClass:function(_14c){
_8.remove(_14c.target,"selected");
},openHelpPage:function(_14d,_14e){
_a.stop(_14d);
dojo.global.open(_14e);
},connect:function(_14f,_150,_151){
var h=function(_152){
_151(_a.fix(_152));
};
if(_c("ie")&&_c("ie")<9){
_14f.attachEvent(_150,h);
_d.addOnWindowUnload(function(){
_14f.detachEvent(_150,h);
});
return {object:_14f,eventName:_150,handler:h};
}else{
var _153=_150;
if(_150.indexOf("on")==0){
_153=_150.slice(2);
}
var dt=on(_14f,_153,h);
_d.addOnWindowUnload(function(){
dt.remove();
});
return dt;
}
},disconnect:function(_154){
if(_c("ie")&&_c("ie")<9){
_154.object.detachEvent(_154.eventName,_154.handler);
}else{
_154.remove();
}
},subscribe:function(_155,_156){
var st=_9.subscribe(_155,_156);
_d.addOnWindowUnload(function(){
st.remove();
});
return st;
},unsubscribe:function(_157){
_157.remove();
},addActionControlClickListener:function(_158){
var _159=_1.byId(_158);
var _15a=_b(".ac",_159);
if(_15a.length>0){
for(var i=0;i<_15a.length;i++){
var _15b=_15a[i];
curam.util.addActionControlClass(_15b);
}
}
},addActionControlClass:function(_15c){
curam.util.connect(_15c,"onmousedown",function(){
_8.add(_15c,"selected-button");
curam.util.connect(_15c,"onmouseout",function(){
_8.remove(_15c,"selected-button");
});
});
},getClusterActionSet:function(){
var _15d=_1.byId("content");
var _15e=_b(".blue-action-set",_15d);
if(_15e.length>0){
for(var i=0;i<_15e.length;i++){
curam.util.addActionControlClickListener(_15e[i]);
}
}
},adjustActionButtonWidth:function(){
if(_c("ie")==8){
_4(function(){
if(dojo.global.jsScreenContext.hasContextBits("MODAL")){
_b(".action-set > a").forEach(function(node){
if(node.childNodes[0].offsetWidth>node.offsetWidth){
_6.set(node,"width",node.childNodes[0].offsetWidth+"px");
_6.set(node,"display","block");
_6.set(node,"display","inline-block");
}
});
}
});
}
},setRpu:function(url,rtc,_15f){
if(!url||!rtc||!rtc.getHref()){
throw {name:"Unexpected values",message:"This value not allowed for url or rtc"};
}
var _160=curam.util.getLastPathSegmentWithQueryString(rtc.getHref());
_160=curam.util.removeUrlParam(_160,curam.util.Constants.RETURN_PAGE_PARAM);
if(_15f){
var i;
for(i=0;i<_15f.length;i++){
if(!_15f[i].key||!_15f[i].value){
throw {name:"undefined value error",message:"The object did not contain a valid key/value pair"};
}
_160=curam.util.replaceUrlParam(_160,_15f[i].key,_15f[i].value);
}
}
var _161=curam.util.replaceUrlParam(url,curam.util.Constants.RETURN_PAGE_PARAM,encodeURIComponent(_160));
curam.debug.log("curam.util.setRpu "+_12.getProperty("curam.util.added.rpu")+_161);
return _161;
},retrieveBaseURL:function(){
return dojo.global.location.href.match(".*://[^/]*/[^/]*");
},removeRoleRegion:function(){
var body=dojo.query("body")[0];
dojo.removeAttr(body,"role");
},iframeTitleFallBack:function(){
var _162=curam.tab.getContainerTab(curam.tab.getContentPanelIframe());
var _163=dojo.byId(curam.tab.getContentPanelIframe());
var _164=_163.contentWindow.document.title;
var _165=dojo.query("div.nowrapTabStrip.dijitTabContainerTop-tabs > div.dijitTabChecked.dijitChecked")[0];
var _166=dojo.query("span.tabLabel",_165)[0];
var _167=dojo.query("div.nowrapTabStrip.dijitTabNoLayout > div.dijitTabChecked.dijitChecked",_162.domNode)[0];
var _168=dojo.query("span.tabLabel",_167)[0];
if(_164&&_164!=null){
return _164;
}else{
if(_167){
return _168.innerHTML;
}else{
return _166.innerHTML;
}
}
},addClassToLastNodeInContentArea:function(){
var _169=_b("> div","content");
var _16a=_169.length;
if(_16a==0){
return "No need to add";
}
var _16b=_169[--_16a];
while(_8.contains(_16b,"hidden-action-set")&&_16b){
_16b=_169[--_16a];
}
_8.add(_16b,"last-node");
},highContrastModeType:function(){
var _16c=dojo.query("body.high-contrast")[0];
return _16c;
}});
return curam.util;
});
