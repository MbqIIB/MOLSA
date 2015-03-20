//>>built
define("curam/util",["dojo/dom","dijit/registry","dojo/dom-construct","dojo/ready","dojo/_base/window","dojo/dom-style","dojo/_base/array","dojo/dom-class","dojo/topic","dojo/_base/event","dojo/query","dojo/has","dojo/_base/unload","dojo/dom-geometry","dojo/_base/json","dojo/dom-attr","dojo/_base/lang","dojo/on","dijit/_BidiSupport","curam/define","curam/debug","curam/util/RuntimeContext","curam/util/Constants","dojo/_base/sniff","cm/_base/_dom","curam/util/ResourceBundle"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,on,_12){
dojo.requireLocalization("curam.application","Debug");
var _13=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util",{PREVENT_CACHE_FLAG:"o3pc",INFORMATIONAL_MSGS_STORAGE_ID:"__informationals__",ERROR_MESSAGES_CONTAINER:"error-messages-container",ERROR_MESSAGES_LIST:"error-messages",CACHE_BUSTER:0,CACHE_BUSTER_PARAM_NAME:"o3nocache",msgLocaleSelectorActionPage:"$not-locaized$ Usage of the Language Selector is not permitted from an editable page that has previously been submitted.",insertCssText:function(_14,_15){
var id=_15?_15:"_runtime_stylesheet_";
var _16=_1.byId(id);
var _17;
if(_16){
if(_16.styleSheet){
_14=_16.styleSheet.cssText+_14;
_17=_16;
_17.setAttribute("id","_nodeToRm");
}else{
_16.appendChild(document.createTextNode(_14));
return;
}
}
var pa=document.getElementsByTagName("head")[0];
_16=_3.create("style",{type:"text/css",id:id});
if(_16.styleSheet){
_16.styleSheet.cssText=_14;
}else{
_16.appendChild(document.createTextNode(_14));
}
pa.appendChild(_16);
if(_17){
_17.parentNode.removeChild(_17);
}
},fireRefreshTreeEvent:function(){
if(dojo.global.parent&&dojo.global.parent.amIFrame){
var wpl=dojo.global.parent.loader;
}
if(wpl&&wpl.dojo){
wpl.dojo.publish("refreshTree");
}
},firePageSubmittedEvent:function(_18){
require(["curam/tab"],function(){
var _19=curam.tab.getSelectedTab();
if(_19){
var _1a=curam.tab.getTabWidgetId(_19);
var _1b=curam.util.getTopmostWindow();
var ctx=(_18=="dialog")?curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_DIALOG:curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN;
_1b.curam.util.Refresh.getController(_1a).pageSubmitted(dojo.global.jsPageID,ctx);
_1b.dojo.publish("/curam/main-content/page/submitted",[dojo.global.jsPageID,_1a]);
}else{
curam.debug.log("/curam/main-content/page/submitted: "+_13.getProperty("curam.util.no.open"));
}
});
},fireTabOpenedEvent:function(_1c){
curam.util.getTopmostWindow().dojo.publish("curam.tabOpened",[dojo.global.jsPageID,_1c]);
},setupSubmitEventPublisher:function(){
_4(function(){
var _1d=_1.byId("mainForm");
if(_1d){
curam.util.connect(_1d,"onsubmit",function(){
curam.util.firePageSubmittedEvent("main-content");
});
}
});
},getScrollbar:function(){
var _1e=_3.create("div",{},_5.body());
_6.set(_1e,{width:"100px",height:"100px",overflow:"scroll",position:"absolute",top:"-300px",left:"0px"});
var _1f=_3.create("div",{},_1e);
_6.set(_1f,{width:"400px",height:"400px"});
var _20=_1e.offsetWidth-_1e.clientWidth;
_3.destroy(_1e);
return {width:_20};
},isModalWindow:function(){
return (dojo.global.curamModal===undefined)?false:true;
},getTopmostWindow:function(){
if(typeof (dojo.global._curamTopmostWindow)=="undefined"){
var _21=dojo.global;
if(typeof (dojo.global.jsScreenContext)!="undefined"&&dojo.global.jsScreenContext.hasContextBits("CONTEXT_PORTLET")){
dojo.global._curamTopmostWindow=_21;
}else{
if(_21.__extAppTopWin){
dojo.global._curamTopmostWindow=_21;
}else{
while(_21.parent!=_21){
_21=_21.parent;
if(_21.__extAppTopWin){
break;
}
}
dojo.global._curamTopmostWindow=_21;
}
}
}
if(dojo.global._curamTopmostWindow.location.href.indexOf("AppController.do")<0&&typeof (dojo.global._curamTopmostWindow.__extAppTopWin)=="undefined"){
curam.debug.log(_13.getProperty("curam.util.wrong.window")+dojo.global._curamTopmostWindow.location.href);
}
return dojo.global._curamTopmostWindow;
},getUrlParamValue:function(url,_22){
var _23=url.indexOf("?");
if(_23<0){
return null;
}
var _24=url.substring(_23+1,url.length);
function _25(_26){
var _27=_24.split(_26);
_22+="=";
for(var i=0;i<_27.length;i++){
if(_27[i].indexOf(_22)==0){
return _27[i].split("=")[1];
}
}
};
return _25("&")||_25("");
},addUrlParam:function(_28,_29,_2a,_2b){
var _2c=_28.indexOf("?")>-1;
var _2d=_2b?_2b:"undefined";
if(!_2c||(_2d==false)){
return _28+(_2c?"&":"?")+_29+"="+_2a;
}else{
var _2e=_28.split("?");
_28=_2e[0]+"?"+_29+"="+_2a+(_2e[1]!=""?("&"+_2e[1]):"");
return _28;
}
},replaceUrlParam:function(_2f,_30,_31){
_2f=curam.util.removeUrlParam(_2f,_30);
return curam.util.addUrlParam(_2f,_30,_31);
},removeUrlParam:function(url,_32,_33){
var _34=url.indexOf("?");
if(_34<0){
return url;
}
if(url.indexOf(_32+"=")<0){
return url;
}
var _35=url.substring(_34+1,url.length);
var _36=_35.split("&");
var _37;
var _38,_39;
for(var i=0;i<_36.length;i++){
if(_36[i].indexOf(_32+"=")==0){
_39=false;
if(_33){
_38=_36[i].split("=");
if(_38.length>1){
if(_38[1]==_33){
_39=true;
}
}else{
if(_33==""){
_39=true;
}
}
}else{
_39=true;
}
if(_39){
_36.splice(i,1);
i--;
}
}
}
return url.substring(0,_34+1)+_36.join("&");
},stripHash:function(url){
var idx=url.indexOf("#");
if(idx<0){
return url;
}
return url.substring(0,url);
},isSameUrl:function(_3a,_3b,rtc){
if(!_3b){
_3b=rtc.getHref();
}
if(_3a.indexOf("#")==0){
return true;
}
var _3c=_3a.indexOf("#");
if(_3c>-1){
if(_3c==0){
return true;
}
var _3d=_3a.split("#");
var _3e=_3b.indexOf("#");
if(_3e>-1){
if(_3e==0){
return true;
}
_3b=_3b.split("#")[0];
}
return _3d[0]==_3b;
}
var _3f=function(url){
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
var _40=curam.util.stripHash(rp(_3b,curam.util.Constants.RETURN_PAGE_PARAM));
var _41=curam.util.stripHash(rp(_3a,curam.util.Constants.RETURN_PAGE_PARAM));
var _42=_41.split("?");
var _43=_40.split("?");
_43[0]=_3f(_43[0]);
_42[0]=_3f(_42[0]);
var _44=(_43[0]==_42[0]||_43[0].match(_42[0]+"$")==_42[0]);
if(!_44){
return false;
}
if(_43.length==1&&_42.length==1&&_44){
return true;
}else{
var _45;
var _46;
if(typeof _43[1]!="undefined"&&_43[1]!=""){
_45=_43[1].split("&");
}else{
_45=new Array();
}
if(typeof _42[1]!="undefined"&&_42[1]!=""){
_46=_42[1].split("&");
}else{
_46=new Array();
}
curam.debug.log("curam.util.isSameUrl: paramsHere "+_13.getProperty("curam.util.before")+_45.length);
_45=_7.filter(_45,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_13.getProperty("curam.util.after")+_45.length);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_13.getProperty("curam.util.before")+_46.length);
_46=_7.filter(_46,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_13.getProperty("curam.util.after")+_46.length);
if(_45.length!=_46.length){
return false;
}
var _47={};
var _48;
for(var i=0;i<_45.length;i++){
_48=_45[i].split("=");
_47[_48[0]]=_48[1];
}
for(var i=0;i<_46.length;i++){
_48=_46[i].split("=");
if(_47[_48[0]]!=_48[1]){
curam.debug.log(_13.getProperty("curam.util.no.match",[_48[0],_48[1],_47[_48[0]]]));
return false;
}
}
}
return true;
},isNotCDEJParam:function(_49){
return !((_49.charAt(0)=="o"&&_49.charAt(1)=="3")||(_49.charAt(0)=="_"&&_49.charAt(1)=="_"&&_49.charAt(2)=="o"&&_49.charAt(3)=="3"));
},setAttributes:function(_4a,map){
for(var x in map){
_4a.setAttribute(x,map[x]);
}
},invalidatePage:function(){
curam.PAGE_INVALIDATED=true;
var _4b=dojo.global.dialogArguments?dojo.global.dialogArguments[0]:opener;
if(_4b&&_4b!=dojo.global){
try{
_4b.curam.util.invalidatePage();
}
catch(e){
curam.debug.log(_13.getProperty("curam.util.error"),e);
}
}
},redirectWindow:function(_4c,_4d,_4e){
var rtc=new curam.util.RuntimeContext(dojo.global);
var _4f=function(_50,_51,_52,_53,_54){
curam.util.getFrameRoot(_50,_51).curam.util.redirectContentPanel(_52,_53,_54);
};
curam.util._doRedirectWindow(_4c,_4d,_4e,dojo.global.jsScreenContext,rtc,curam.util.publishRefreshEvent,_4f);
},_doRedirectWindow:function(_55,_56,_57,_58,rtc,_59,_5a){
if(_55&&curam.util.isActionPage(_55)){
curam.debug.log(_13.getProperty("curam.util.stopping"),_55);
return;
}
var rpl=curam.util.replaceUrlParam;
var _5b=_58.hasContextBits("TREE")||_58.hasContextBits("AGENDA")||_58.hasContextBits("ORG_TREE");
if(curam.util.FORCE_REFRESH){
_55=rpl(rtc.getHref(),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
if(curam.util.isModalWindow()||_5b){
_59();
dojo.global.location.href=_55;
}else{
if(_58.hasContextBits("LIST_ROW_INLINE_PAGE")||_58.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(_55);
}else{
_59();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
require(["curam/tab"],function(){
_5a(dojo.global,curam.tab.getTabController().ROOT_OBJ,_55,true,true);
});
}
}
}
return;
}
var u=curam.util;
var rtc=new curam.util.RuntimeContext(dojo.global);
if(!_5b&&!_56&&!curam.PAGE_INVALIDATED&&u.isSameUrl(_55,null,rtc)){
return;
}
if(curam.util.isModalWindow()||_5b){
_55=rpl(rpl(_55,"o3frame","modal"),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
var _5c=_3.create("form",{action:_55,method:"POST"});
if(!_5b){
if(!_1.byId("o3ctx")){
_5c.action=curam.util.removeUrlParam(_5c.action,"o3ctx");
var _5d=_3.create("input",{type:"hidden",id:"o3ctx",name:"o3ctx",value:_58.getValue()},_5c);
}
_5.body().appendChild(_5c);
_59();
_5c.submit();
}
if(!_57){
if(_5b){
curam.util.redirectFrame(_55);
}
}
}else{
if(_58.hasContextBits("LIST_ROW_INLINE_PAGE")||_58.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(_55);
}else{
_59();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
if(_58.hasContextBits("EXTAPP")){
var _5e=window.top;
_5e.dijit.byId("curam-app").updateMainContentIframe(_55);
}else{
require(["curam/tab"],function(){
curam.util.getFrameRoot(dojo.global,curam.tab.getTabController().ROOT_OBJ).curam.util.redirectContentPanel(_55,_56);
});
}
}
}
}
},_handleInlinePageRefresh:function(_5f){
curam.debug.log(_13.getProperty("curam.util.closing.modal"),_5f);
var _60=new curam.ui.PageRequest(_5f);
require(["curam/tab"],function(){
curam.tab.getTabController().checkPage(_60,function(_61){
curam.util.publishRefreshEvent();
dojo.global.location.reload(true);
});
});
},redirectContentPanel:function(url,_62,_63){
require(["curam/tab"],function(){
var _64=curam.tab.getContentPanelIframe();
var _65=url;
if(_64!=null){
var rpu=curam.util.Constants.RETURN_PAGE_PARAM;
var _66=null;
if(url.indexOf(rpu+"=")>=0){
curam.debug.log("curam.util.redirectContentPanel: "+_13.getProperty("curam.util.rpu"));
_66=decodeURIComponent(curam.util.getUrlParamValue(url,rpu));
}
if(_66){
_66=curam.util.removeUrlParam(_66,rpu);
_65=curam.util.replaceUrlParam(url,rpu,encodeURIComponent(_66));
}
}
var _67=new curam.ui.PageRequest(_65);
if(_62){
_67.forceLoad=true;
}
if(_63){
_67.justRefresh=true;
}
curam.tab.getTabController().handlePageRequest(_67);
});
},redirectFrame:function(_68){
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
var _69=curam.util.getFrameRoot(dojo.global,"wizard").targetframe;
_69.curam.util.publishRefreshEvent();
_69.location.href=_68;
}else{
if(dojo.global.jsScreenContext.hasContextBits("ORG_TREE")){
var _69=curam.util.getFrameRoot(dojo.global,"orgTreeRoot");
_69.curam.util.publishRefreshEvent();
_69.dojo.publish("orgTree.refreshContent",[_68]);
}else{
var _6a=curam.util.getFrameRoot(dojo.global,"iegtree");
var _6b=_6a.navframe||_6a.frames[0];
var _6c=_6a.contentframe||_6a.frames["contentframe"];
_6c.curam.util.publishRefreshEvent();
if(curam.PAGE_INVALIDATED||_6b.curam.PAGE_INVALIDATED){
var _6d=curam.util.modifyUrlContext(_68,"ACTION");
_6c.location.href=_6d;
}else{
_6c.location.href=_68;
}
}
}
return true;
},publishRefreshEvent:function(){
_9.publish("/curam/page/refresh");
},openGenericErrorModalDialog:function(_6e,_6f,_70,_71,_72){
var url;
var _73;
var sc=new curam.util.ScreenContext("MODAL");
var _74="titlePropertyName="+_6f+"&";
var _75="messagePropertyName="+_70+"&";
var _76="errorModal="+_72+"&";
if(_71){
_73="messagePlaceholder1="+_71+"&";
url="generic-modal-error.jspx?"+_74+_75+_73+_76+sc.toRequestString();
}else{
url="generic-modal-error.jspx?"+_74+_75+sc.toRequestString();
}
curam.util.openModalDialog({href:url},_6e);
},openModalDialog:function(_77,_78,_79,top,_7a){
var _7b;
if(!_77||!_77.href){
_77=_a.fix(_77);
var _7c=_77.target;
while(_7c.tagName!="A"&&_7c!=_5.body()){
_7c=_7c.parentNode;
}
_7b=_7c.href;
_7c._isModal=true;
_a.stop(_77);
}else{
_7b=_77.href;
_77._isModal=true;
}
require(["curam/dialog"]);
var _7d=curam.dialog.parseWindowOptions(_78);
curam.util.showModalDialog(_7b,_77,_7d["width"],_7d["height"],_79,top,false,null,null,_7a);
return false;
},showModalDialog:function(url,_7e,_7f,_80,_81,top,_82,_83,_84,_85){
var _86=curam.util.getTopmostWindow();
if(dojo.global!=_86){
curam.debug.log("curam.util.showModalDialog: "+_13.getProperty("curam.util.redirecting.modal"));
_86.curam.util.showModalDialog(url,_7e,_7f,_80,_81,top,_82,_83,dojo.global,_85);
return;
}
var rup=curam.util.replaceUrlParam;
url=rup(url,"o3frame","modal");
url=curam.util.modifyUrlContext(url,"MODAL","TAB|LIST_ROW_INLINE_PAGE|LIST_EVEN_ROW|NESTED_UIM");
url=rup(url,curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
curam.debug.log(_13.getProperty("curam.util.modal.url"),url);
if(_7f){
_7f=typeof (_7f)=="number"?_7f:parseInt(_7f);
}
if(_80){
_80=typeof (_80)=="number"?_80:parseInt(_80);
}
if(!curam.util._isModalCurrentlyOpening()){
curam.util._setModalCurrentlyOpening(true);
require(["curam/ModalDialog"]);
new curam.ModalDialog({href:url,width:_7f,height:_80,openNode:(_7e&&_7e.target)?_7e.target:null,parentWindow:_84,uimToken:_85});
}
},_isModalCurrentlyOpening:function(){
return curam.util.getTopmostWindow().curam.util._modalOpenInProgress;
},_setModalCurrentlyOpening:function(_87){
curam.util.getTopmostWindow().curam.util._modalOpenInProgress=_87;
},setupPreferencesLink:function(_88){
_4(function(){
var _89=_b(".user-preferences")[0];
if(_89){
if(typeof (_89._disconnectToken)=="undefined"){
_89._disconnectToken=curam.util.connect(_89,"onclick",curam.util.openPreferences);
}
if(!_88){
_88=dojo.global.location.href;
}
if(curam.util.isActionPage(_88)){
_8.replace(_89,"disabled","enabled");
_89._curamDisable=true;
}else{
_8.replace(_89,"enabled","disabled");
_89._curamDisable=false;
}
}else{
curam.debug.log(_13.getProperty("curam.util.no.setup"));
}
});
},openPreferences:function(_8a){
_a.stop(_8a);
if(_8a.target._curamDisable){
return;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("user-prefs-editor.jspx",{dialogOptions:"width=450"});
});
},openAbout:function(_8b){
_a.stop(_8b);
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("about.jsp",{dialogOptions:"width=645,height=480"});
});
},addMinWidthCalendarCluster:function(id){
var _8c=_1.byId(id);
var i=0;
function _8d(evt){
_7.forEach(_8c.childNodes,function(_8e){
if(_8.contains(_8e,"cluster")){
_6.set(_8e,"width","97%");
if(_8e.clientWidth<700){
_6.set(_8e,"width","700px");
}
}
});
};
if(_c("ie")>6){
_7.forEach(_8c.childNodes,function(_8f){
if(_8.contains(_8f,"cluster")){
_6.set(_8f,"minWidth","700px");
}
});
}else{
on(dojo.global,"resize",_8d);
_4(_8d);
}
},addPopupFieldListener:function(id){
if(!_c("ie")||_c("ie")>6){
return;
}
if(!curam.util._popupFields){
function _90(evt){
var _91=0;
var j=0;
var x=0;
var arr=curam.util._popupFields;
_7.forEach(curam.util._popupFields,function(id){
var _92=_1.byId(id);
_b("> .popup-actions",_92).forEach(function(_93){
_91=_93.clientWidth+30;
});
_b("> .desc",_92).forEach(function(_94){
_6.set(_94,"width",Math.max(0,_92.clientWidth-_91)+"px");
});
});
};
curam.util._popupFields=[id];
on(dojo.global,"resize",_90);
_4(_90);
}else{
curam.util._popupFields.push(id);
}
},addContentWidthListener:function(id){
if(_c("ie")>6){
return;
}
var _95=_6.set;
var _96=_8.contains;
function _97(evt){
var i=0;
var _98=_1.byId("content");
if(_98){
var _99=_98.clientWidth;
if(_c("ie")==6&&_1.byId("footer")){
var _9a=_5.body().clientHeight-100;
_95(_98,"height",_9a+"px");
var _9b=_1.byId("sidebar");
if(_9b){
_95(_9b,"height",_9a+"px");
}
}
try{
_b("> .page-title-bar",_98).forEach(function(_9c){
var _9d=_e.getMarginSize(_9c).w-_e.getContentBox(_9c).w;
if(!_c("ie")){
_9d+=1;
}
_99=_98.clientWidth-_9d;
_6.set(_9c,"width",_99+"px");
});
}
catch(e){
}
_b("> .page-description",_98).style("width",_99+"px");
_b("> .in-page-navigation",_98).style("width",_99+"px");
}
};
curam.util.subscribe("/clusterToggle",_97);
curam.util.connect(dojo.global,"onresize",_97);
_4(_97);
},alterScrollableListBottomBorder:function(id,_9e){
var _9f=_9e;
var _a0="#"+id+" table";
function _a1(){
var _a2=_b(_a0)[0];
if(_a2.offsetHeight>=_9f){
var _a3=_b(".odd-last-row",_a2)[0];
if(typeof _a3!="undefined"){
_8.add(_a3,"no-bottom-border");
}
}else{
if(_a2.offsetHeight<_9f){
var _a3=_b(".even-last-row",_a2)[0];
if(typeof _a3!="undefined"){
_8.add(_a3,"add-bottom-border");
}
}else{
curam.debug.log("curam.util.alterScrollableListBottomBorder: "+_13.getProperty("curam.util.code"));
}
}
};
_4(_a1);
},addFileUploadResizeListener:function(_a4){
function _a5(evt){
if(_b(".widget")){
_b(".widget").forEach(function(_a6){
var _a7=_a6.clientWidth;
if(_b(".fileUpload",_a6)){
_b(".fileUpload",_a6).forEach(function(_a8){
fileUploadWidth=_a7/30;
if(fileUploadWidth<4){
_a8.size=1;
}else{
_a8.size=fileUploadWidth;
}
});
}
});
}
};
on(dojo.global,"resize",_a5);
_4(_a5);
},openCenteredNonModalWindow:function(url,_a9,_aa,_ab){
_a9=Number(_a9);
_aa=Number(_aa);
var _ac=(screen.width-_a9)/2;
var _ad=(screen.height-_aa)/2;
_aa=_ad<0?screen.height:_aa;
_ad=Math.max(0,_ad);
_a9=_ac<0?screen.width:_a9;
_ac=Math.max(0,_ac);
var _ae="left",top="top";
if(_c("ff")){
_ae="screenX",top="screenY";
}
var _af="location=no, menubar=no, status=no, toolbar=no, "+"scrollbars=yes, resizable=no";
var _b0=dojo.global.open(url,_ab||"name","width="+_a9+", height="+_aa+", "+_ae+"="+_ac+","+top+"="+_ad+","+_af);
_b0.resizeTo(_a9,_aa);
_b0.moveTo(_ac,_ad);
_b0.focus();
},adjustTargetContext:function(win,_b1){
if(win&&win.dojo.global.jsScreenContext){
var _b2=win.dojo.global.jsScreenContext;
_b2.updateStates(dojo.global.jsScreenContext);
return curam.util.replaceUrlParam(_b1,"o3ctx",_b2.getValue());
}
return _b1;
},modifyUrlContext:function(url,_b3,_b4){
var _b5=url;
var ctx=new curam.util.ScreenContext();
var _b6=curam.util.getUrlParamValue(url,"o3ctx");
if(_b6){
ctx.setContext(_b6);
}else{
ctx.clear();
}
if(_b3){
ctx.addContextBits(_b3);
}
if(_b4){
ctx.clear(_b4);
}
_b5=curam.util.replaceUrlParam(url,"o3ctx",ctx.getValue());
return _b5;
},updateCtx:function(_b7){
var _b8=curam.util.getUrlParamValue(_b7,"o3ctx");
if(!_b8){
return _b7;
}
return curam.util.modifyUrlContext(_b7,null,"MODAL");
},getFrameRoot:function(_b9,_ba){
var _bb=false;
var _bc=_b9;
if(_bc){
while(_bc!=top&&!_bc.rootObject){
_bc=_bc.parent;
}
if(_bc.rootObject){
_bb=(_bc.rootObject==_ba);
}
}
return _bb?_bc:null;
},saveInformationalMsgs:function(_bd){
curam.util.runStorageFn(function(){
try{
var _be=curam.util.getTopmostWindow().dojox;
_be.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,_f.toJson({pageID:_5.body().id,total:_1.byId(curam.util.ERROR_MESSAGES_CONTAINER).innerHTML,listItems:_1.byId(curam.util.ERROR_MESSAGES_LIST).innerHTML}));
}
catch(e){
curam.debug.log(_13.getProperty("curam.util.exception"),e);
}
},_bd);
},runStorageFn:function(fn,_bf){
var _c0=function(){
fn();
if(_bf){
setTimeout(_bf,10);
}
};
var _c1=curam.util.getTopmostWindow().dojox;
require(["dojox/storage"],function(){
var mgr=_c1.storage.manager;
if(mgr.isInitialized()){
_c0();
}else{
if(mgr.addOnLoad){
mgr.addOnLoad(_c0);
}else{
var _c2={exp:_c0};
on(mgr,"loaded",_c2,"exp");
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
var _c3=curam.util.getTopmostWindow().dojox;
var _c4=_c3.storage.get(curam.util.INFORMATIONAL_MSGS_STORAGE_ID);
if(_c4&&_c4!=""){
_c4=_f.fromJson(_c4);
_c3.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,"");
var div=_1.byId(curam.util.ERROR_MESSAGES_CONTAINER);
var _c5=_1.byId(curam.util.ERROR_MESSAGES_LIST);
if(_c4.pageID!=_5.body().id){
return;
}
if(_c5){
var _c6=_3.create("ul",{innerHTML:_c4.listItems});
var _c7=[];
for(var i=0;i<_c5.childNodes.length;i++){
if(_c5.childNodes[i].tagName=="LI"){
_c7.push(_c5.childNodes[i]);
}
}
var _c8=false;
var _c9=_c6.childNodes;
for(var i=0;i<_c9.length;i++){
_c8=false;
for(var j=0;j<_c7.length;j++){
if(_c9[i].innerHTML==_c7[j].innerHTML){
_c8=true;
break;
}
}
if(!_c8){
_c5.appendChild(_c9[i]);
i--;
}
}
}else{
if(div){
div.innerHTML=_c4.total;
}
}
}
var _ca=dojo.byId("error-messages");
if(_ca&&!dojo.global.jsScreenContext.hasContextBits("MODAL")){
_ca.focus();
}
});
});
},setFocus:function(){
var _cb=curam.util.getUrlParamValue(dojo.global.location.href,"o3frame")=="modal";
if(!_cb){
_4(curam.util.doSetFocus);
}
},doSetFocus:function(){
var _cc=-1;
var _cd=-1;
var _ce=document.forms[0];
if(!_ce){
return false;
}
var _cf=_ce.elements;
var l=_cf.length;
var _d0;
for(var i=0;i<l;i++){
_d0=_cf[i];
if(_cc==-1&&(_d0.type=="select-one"||_d0.type=="text"||_d0.tagName=="TEXTAREA")&&!_8.contains(_d0,"dijitArrowButtonInner")&&!_8.contains(_d0,"dijitValidationInner")){
_cc=i;
}
if(_d0.tabIndex=="1"){
_d0.tabIndex=0;
_cd=i;
break;
}
}
var _d0;
if(_cd!=-1){
_d0=_cf[_cd];
}else{
if(_cc!=-1){
_d0=_cf[_cc];
}
}
try{
var _d1=dojo.byId("error-messages");
if(_d1){
_d1.focus();
}else{
_d0.focus();
}
}
catch(e){
curam.debug.log(_13.getProperty("curam.util.error.focus"),e.message);
return false;
}
return true;
},openLocaleSelector:function(_d2){
_d2=_a.fix(_d2);
var _d3=_d2.target;
while(_d3&&_d3.tagName!="A"){
_d3=_d3.parentNode;
}
var loc=_d3.href;
var rpu=curam.util.getUrlParamValue(loc,"__o3rpu");
rpu=curam.util.removeUrlParam(rpu,"__o3rpu");
var _d4="user-locale-selector.jspx"+"?__o3rpu="+rpu;
if(!curam.util.isActionPage(dojo.global.location.href)){
openModalDialog({href:_d4},"width=500,height=300",200,150);
}else{
alert(curam.util.msgLocaleSelectorActionPage);
}
return false;
},isActionPage:function(url){
var _d5=curam.util.getLastPathSegmentWithQueryString(url);
var _d6=_d5.split("?")[0];
return _d6.indexOf("Action.do")>-1;
},closeLocaleSelector:function(_d7){
_d7=_a.fix(_d7);
_a.stop(_d7);
dojo.global.close();
return false;
},getSuffixFromClass:function(_d8,_d9){
var _da=_10.get(_d8,"class").split(" ");
var _db=_7.filter(_da,function(_dc){
return _dc.indexOf(_d9)==0;
});
if(_db.length>0){
return _db[0].split(_d9)[1];
}else{
return null;
}
},getCacheBusterParameter:function(){
return this.CACHE_BUSTER_PARAM_NAME+"="+new Date().getTime()+"_"+this.CACHE_BUSTER++;
},stripeTable:function(_dd,_de,_df){
var _e0=_dd.tBodies[0];
var _e1=(_de?2:1);
if(_e0.rows.length<_e1){
return;
}
var _e2=_e0.rows;
for(var i=0;i<_e2.length;i+=_e1){
curam.debug.log("curam.util.stripeTable(%s, %s): i = %s",_dd,_de,i);
var _e3=[_e2[i]];
if(_de&&_e2[i+1]){
_e3.push(_e2[i+1]);
}
_7.forEach(_e3,function(row){
_8.remove(row,"odd-last-row");
_8.remove(row,"even-last-row");
});
if(i%(2*_e1)==0){
_7.forEach(_e3,function(row){
cm.replaceClass(row,"odd","even");
});
if(i==_df){
_7.forEach(_e3,function(row){
_8.add(row,"odd-last-row");
});
}
}else{
_7.forEach(_e3,function(row){
cm.replaceClass(row,"even","odd");
});
if(i==_df){
_7.forEach(_e3,function(row){
_8.add(row,"even-last-row");
});
}
}
}
},fillString:function(_e4,_e5){
var _e6="";
while(_e5>0){
_e6+=_e4;
_e5-=1;
}
return _e6;
},updateHeader:function(qId,_e7,_e8,_e9){
var _ea=_1.byId("header_"+qId);
_ea.firstChild.nextSibling.innerHTML=_e7;
answerCell=_1.byId("chosenAnswer_"+qId);
answerCell.innerHTML=_e8;
sourceCell=_1.byId("chosenSource_"+qId);
sourceCell.innerHTML=_e9;
},search:function(_eb,_ec){
var _ed=_2.byId(_eb).get("value");
var _ee=_2.byId(_ec);
var _ef=_ee?_ee.get("value"):null;
var _f0="";
var _f1;
var _f2;
if(_ef){
_f2=_ef.split("|");
_f0=_f2[0];
_f1=_f2[1];
}
var _f3=curam.util.defaultSearchPageID;
var _f4="";
if(_f0===""){
_f4=_f3+"Page.do?searchText="+encodeURIComponent(_ed);
}else{
_f4=_f1+"Page.do?searchText="+encodeURIComponent(_ed)+"&searchType="+encodeURIComponent(_f0);
}
var _f5=new curam.ui.PageRequest(_f4);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_f5);
});
},updateDefaultSearchText:function(_f6,_f7){
var _f8=_2.byId(_f6);
var _f9=_2.byId(_f7);
var _fa=_f8?_f8.get("value"):null;
var str=_fa.split("|")[2];
_f9.set("placeHolder",str);
},updateSearchBtnState:function(_fb,_fc){
var _fd=_2.byId(_fb);
var btn=_1.byId(_fc);
var _fe=_fd.get("value");
if(!_fe||_11.trim(_fe).length<1){
_8.add(btn,"dijitDisabled");
}else{
_8.remove(btn,"dijitDisabled");
}
},furtherOptionsSearch:function(){
var _ff=curam.util.furtherOptionsPageID+"Page.do";
var _100=new curam.ui.PageRequest(_ff);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_100);
});
},searchButtonStatus:function(_101){
var btn=dojo.byId(_101);
if(!dojo.hasClass(btn,"dijitDisabled")){
return true;
}
},getPageHeight:function(){
var _102=400;
var _103=0;
if(_b("frameset").length>0){
curam.debug.log("curam.util.getPageHeight() "+_13.getProperty("curam.util.default.height"),_102);
_103=_102;
}else{
var _104=function(node){
if(!node){
curam.debug.log(_13.getProperty("curam.util.node"));
return 0;
}
var mb=_e.getMarginSize(node);
var pos=_e.position(node);
return pos.y+mb.h;
};
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")){
var _105=_b("div.bottom")[0];
var _106=_104(_105);
curam.debug.log(_13.getProperty("curam.util.page.height"),_106);
curam.debug.log(_13.getProperty("curam.util.ie7.issue"));
_103=_106+1;
}else{
var _107=_1.byId("content")||_1.byId("wizard-content");
var _108=_b("> *",_107).filter(function(n){
return n.tagName.indexOf("SCRIPT")<0&&_6.get(n,"visibility")!="hidden"&&_6.get(n,"display")!="none";
});
var _109=_108[0];
for(var i=1;i<_108.length;i++){
if(_104(_108[i])>=_104(_109)){
_109=_108[i];
}
}
_103=_104(_109);
curam.debug.log("curam.util.getPageHeight() "+_13.getProperty("curam.util.base.height"),_103);
var _10a=_b(".actions-panel",_5.body());
if(_10a.length>0){
var _10b=_e.getMarginBox(_10a[0]).h;
curam.debug.log("curam.util.getPageHeight() "+_13.getProperty("curam.util.panel.height"));
_103+=_10b;
_103+=10;
}
var _10c=_b("body.details");
if(_10c.length>0){
curam.debug.log("curam.util.getPageHeight() "+_13.getProperty("curam.util.bar.height"));
_103+=20;
}
}
}
curam.debug.log("curam.util.getPageHeight() "+_13.getProperty("curam.util.returning"),_103);
return _103;
},toCommaSeparatedList:function(_10d){
var _10e="";
for(var i=0;i<_10d.length;i++){
_10e+=_10d[i];
if(i<_10d.length-1){
_10e+=",";
}
}
return _10e;
},skipLinkFocus:function(){
var dest=dojo.byId("skip-dest");
if(dest){
dest.focus();
}
},showHideSkipLink:function(e){
var _10f=dojo.byId("skipLink");
if(_10f){
var _110=_10f.parentNode;
if(e.type=="focus"&&_8.contains(_110,"hidden")){
_8.remove(_110,"hidden");
}else{
if(e.type=="blur"&&!_8.contains(_110,"hidden")){
_8.add(_110,"hidden");
}
}
}
},setupGenericKeyHandler:function(){
_4(function(){
var f=function(_111){
if(dojo.global.jsScreenContext.hasContextBits("MODAL")&&_111.keyCode==27){
var ev=_a.fix(_111);
var _112=_2.byId(ev.target.id);
var _113=typeof _112!="undefined"&&_112.baseClass=="dijitTextBox dijitComboBox";
if(!_113){
curam.dialog.closeModalDialog();
}
}
if(_111.keyCode==13){
var ev=_a.fix(_111);
var _114=ev.target.type=="text";
var _115=ev.target.type=="radio";
var _116=ev.target.type=="checkbox";
var _117=ev.target.type=="select-multiple";
var _118=ev.target.type=="password";
var _119=_2.byId(ev.target.id);
if(typeof _119!="undefined"){
var _11a=_2.byNode(dojo.byId("widget_"+ev.target.id));
if(_11a&&_11a.enterKeyOnOpenDropDown){
_11a.enterKeyOnOpenDropDown=false;
return false;
}
}
var _11b=typeof _119!="undefined"&&_119.baseClass=="dijitComboBox";
if((!_114&&!_115&&!_116&&!_117&&!_118)||_11b){
return true;
}
var _11c=null;
var _11d=_b(".curam-default-action");
if(_11d.length>0){
_11c=_11d[0];
}else{
var _11e=_b("input[type='submit']");
if(_11e.length>0){
_11c=_11e[0];
}
}
if(_11c!=null){
_a.stop(_a.fix(_111));
curam.util.clickButton(_11c);
return false;
}
dojo.require("curam.dateSelectorUtil");
var _11f=dojo.byId("year");
if(_11f){
dojo.stopEvent(dojo.fixEvent(_111));
curam.dateSelectorUtil.updateCalendar();
}
}
return true;
};
curam.util.connect(_5.body(),"onkeyup",f);
});
},enterKeyPress:function(_120){
if(_120.keyCode==13){
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
var _121=elem.parentElement.parentElement.id;
var _122=dojo.byId("end-"+_121);
if(_122){
_122.focus();
}
}
}
},focusHelpIconOnTab:function(e){
if(!e.shiftKey&&e.keyCode==9){
var _123=dojo.query(".dijitDialogHelpIcon")[0];
if(_123){
setTimeout(function(){
_123.focus();
},5);
}
}
},swapState:function(node,_124,_125,_126){
if(_124){
_8.replace(node,_125,_126);
}else{
_8.replace(node,_126,_125);
}
},makeQueryString:function(_127){
if(!_127||_127.length==0){
return "";
}
var _128=[];
for(var _129 in _127){
_128.push(_129+"="+encodeURIComponent(_127[_129]));
}
return "?"+_128.join("&");
},clickHandlerForListActionMenu:function(url,_12a,_12b,_12c){
if(_12a){
var href=curam.util.replaceUrlParam(url,"o3frame","modal");
var ctx=dojo.global.jsScreenContext;
ctx.addContextBits("MODAL");
href=curam.util.replaceUrlParam(href,"o3ctx",ctx.getValue());
curam.util.redirectWindow(href);
return;
}
var _12d={href:url};
require(["curam/ui/UIMPageAdaptor"]);
if(curam.ui.UIMPageAdaptor.allowLinkToContinue(_12d)){
dojo.global.location=url;
return;
}
if(_12d!=null){
if(_12c){
_a.fix(_12c);
_a.stop(_12c);
}
if(!_12d.href||_12d.href.length==0){
return;
}
if(_12b&&!curam.util.isInternal(url)){
dojo.global.open(url);
}else{
if(curam.ui.UIMPageAdaptor.isLinkValidForTabProcessing(_12d)){
var _12e=new curam.ui.PageRequest(_12d.href);
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")||dojo.global.jsScreenContext.hasContextBits("NESTED_UIM")){
_12e.pageHolder=dojo.global;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_12e);
});
}
}
}
},clickHandlerForMailtoLinks:function(_12f,url){
dojo.stopEvent(_12f);
var _130=dojo.query("#mailto_frame")[0];
if(!_130){
_130=dojo.io.iframe.create("mailto_frame","");
}
_130.src=url;
return false;
},isInternal:function(url){
var path=url.split("?")[0];
var _131=path.match("Page.do");
if(_131!=null){
return true;
}
return false;
},getLastPathSegmentWithQueryString:function(url){
var _132=url.split("?");
var _133=_132[0].split("/");
return _133[_133.length-1]+(_132[1]?"?"+_132[1]:"");
},replaceSubmitButton:function(name,_134){
if(curam.replacedButtons[name]=="true"){
return;
}
var _135="__o3btn."+name;
var _136;
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_136=_b("input[id='"+_135+"']");
}else{
_136=_b("input[name='"+_135+"']");
}
_136.forEach(function(_137,_138,_139){
if(_134){
var _13a=_139[1];
_13a.setAttribute("value",_134);
}
_137.tabIndex=-1;
var _13b=_137.parentNode;
var _13c="btn-id-"+_138;
curam.util.setupWidgetLoadMask("a."+_13c);
var _13d="ac initially-hidden-widget "+_13c;
if(_8.contains(_137,"first-action-control")){
_13d+=" first-action-control";
}
var _13e=_3.create("a",{"class":_13d,href:"#"},_137,"before");
var _13f=dojo.query(".page-level-menu")[0];
if(_13f){
dojo.attr(_13e,"title",_137.value);
}
_3.create("span",{"class":"filler"},_13e,"before");
var left=_3.create("span",{"class":"left-corner"},_13e);
var _140=_3.create("span",{"class":"right-corner"},left);
var _141=_3.create("span",{"class":"middle"},_140);
_141.appendChild(document.createTextNode(_137.value));
curam.util.addActionControlClass(_13e);
on(_13e,"click",function(_142){
curam.util.clickButton(this._submitButton);
_a.stop(_142);
});
_13e._submitButton=_139[0];
_8.add(_137,"hidden-button");
});
curam.replacedButtons[name]="true";
},setupWidgetLoadMask:function(_143){
curam.util.subscribe("/curam/page/loaded",function(){
var _144=_b(_143)[0];
if(_144){
_6.set(_144,"visibility","visible");
}else{
curam.debug.log("setupButtonLoadMask: "+_13.getProperty("curam.util.not.found")+"'"+_143+"'"+_13.getProperty("curam.util.ignore.mask"));
}
});
},optReplaceSubmitButton:function(name){
if(curam.util.getFrameRoot(dojo.global,"wizard")==null){
curam.util.replaceSubmitButton(name);
return;
}
var _145=curam.util.getFrameRoot(dojo.global,"wizard").navframe.wizardNavigator;
if(_145.delegatesSubmit[jsPageID]!="assumed"){
curam.util.replaceSubmitButton(name);
}
},clickButton:function(_146){
var _147=_1.byId("mainForm");
var _148;
if(!_146){
curam.debug.log("curam.util.clickButton: "+_13.getProperty("curam.util..no.arg"));
return;
}
if(typeof (_146)=="string"){
var _149=_146;
curam.debug.log("curam.util.clickButton: "+_13.getProperty("curam.util.searching")+_13.getProperty("curam.util.id.of")+"'"+_149+"'.");
_146=_b("input[id='"+_149+"']")[0];
if(!_146.form&&!_146.id){
curam.debug.log("curam.util.clickButton: "+_13.getProperty("curam.util.searched")+_13.getProperty("curam.util.id.of")+"'"+_149+_13.getProperty("curam.util.exiting"));
return;
}
}
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_148=_146;
}else{
_148=_b("input[name='"+_146.id+"']",_147)[0];
}
try{
if(_10.get(_147,"action").indexOf(jsPageID)==0){
curam.util.publishRefreshEvent();
}
_148.click();
}
catch(e){
curam.debug.log(_13.getProperty("curam.util.exception.clicking"));
}
},printPage:function(_14a){
_a.stop(_14a);
var _14b=dojo.window.get(_14a.currentTarget.ownerDocument);
var _14c=_14b.frameElement;
var _14d=_14c;
while(_14d&&!dojo.hasClass(_14d,"tab-content-holder")){
_14d=_14d.parentNode;
}
var _14e=_14d;
var _14f=dojo.query(".detailsPanelFrame",_14e)[0];
if(_14f!=undefined&&_14f!=null){
_14f.contentWindow.focus();
_14f.contentWindow.print();
}
_14b.focus();
_14b.print();
return false;
},addSelectedClass:function(_150){
_8.add(_150.target,"selected");
},removeSelectedClass:function(_151){
_8.remove(_151.target,"selected");
},openHelpPage:function(_152,_153){
_a.stop(_152);
dojo.global.open(_153);
},connect:function(_154,_155,_156){
var h=function(_157){
_156(_a.fix(_157));
};
if(_c("ie")&&_c("ie")<9){
_154.attachEvent(_155,h);
_d.addOnWindowUnload(function(){
_154.detachEvent(_155,h);
});
return {object:_154,eventName:_155,handler:h};
}else{
var _158=_155;
if(_155.indexOf("on")==0){
_158=_155.slice(2);
}
var dt=on(_154,_158,h);
_d.addOnWindowUnload(function(){
dt.remove();
});
return dt;
}
},disconnect:function(_159){
if(_c("ie")&&_c("ie")<9){
_159.object.detachEvent(_159.eventName,_159.handler);
}else{
_159.remove();
}
},subscribe:function(_15a,_15b){
var st=_9.subscribe(_15a,_15b);
_d.addOnWindowUnload(function(){
st.remove();
});
return st;
},unsubscribe:function(_15c){
_15c.remove();
},addActionControlClickListener:function(_15d){
var _15e=_1.byId(_15d);
var _15f=_b(".ac",_15e);
if(_15f.length>0){
for(var i=0;i<_15f.length;i++){
var _160=_15f[i];
curam.util.addActionControlClass(_160);
}
}
},addActionControlClass:function(_161){
curam.util.connect(_161,"onmousedown",function(){
_8.add(_161,"selected-button");
curam.util.connect(_161,"onmouseout",function(){
_8.remove(_161,"selected-button");
});
});
},getClusterActionSet:function(){
var _162=_1.byId("content");
var _163=_b(".blue-action-set",_162);
if(_163.length>0){
for(var i=0;i<_163.length;i++){
curam.util.addActionControlClickListener(_163[i]);
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
},setRpu:function(url,rtc,_164){
if(!url||!rtc||!rtc.getHref()){
throw {name:"Unexpected values",message:"This value not allowed for url or rtc"};
}
var _165=curam.util.getLastPathSegmentWithQueryString(rtc.getHref());
_165=curam.util.removeUrlParam(_165,curam.util.Constants.RETURN_PAGE_PARAM);
if(_164){
var i;
for(i=0;i<_164.length;i++){
if(!_164[i].key||!_164[i].value){
throw {name:"undefined value error",message:"The object did not contain a valid key/value pair"};
}
_165=curam.util.replaceUrlParam(_165,_164[i].key,_164[i].value);
}
}
var _166=curam.util.replaceUrlParam(url,curam.util.Constants.RETURN_PAGE_PARAM,encodeURIComponent(_165));
curam.debug.log("curam.util.setRpu "+_13.getProperty("curam.util.added.rpu")+_166);
return _166;
},retrieveBaseURL:function(){
return dojo.global.location.href.match(".*://[^/]*/[^/]*");
},removeRoleRegion:function(){
var body=dojo.query("body")[0];
dojo.removeAttr(body,"role");
},iframeTitleFallBack:function(){
var _167=curam.tab.getContainerTab(curam.tab.getContentPanelIframe());
var _168=dojo.byId(curam.tab.getContentPanelIframe());
var _169=_168.contentWindow.document.title;
var _16a=dojo.query("div.nowrapTabStrip.dijitTabContainerTop-tabs > div.dijitTabChecked.dijitChecked")[0];
var _16b=dojo.query("span.tabLabel",_16a)[0];
var _16c=dojo.query("div.nowrapTabStrip.dijitTabNoLayout > div.dijitTabChecked.dijitChecked",_167.domNode)[0];
var _16d=dojo.query("span.tabLabel",_16c)[0];
if(_169&&_169!=null){
return _169;
}else{
if(_16c){
return _16d.innerHTML;
}else{
return _16b.innerHTML;
}
}
},addClassToLastNodeInContentArea:function(){
var _16e=_b("> div","content");
var _16f=_16e.length;
if(_16f==0){
return "No need to add";
}
var _170=_16e[--_16f];
while(_8.contains(_170,"hidden-action-set")&&_170){
_170=_16e[--_16f];
}
_8.add(_170,"last-node");
},highContrastModeType:function(){
var _171=dojo.query("body.high-contrast")[0];
return _171;
},processBidiContextual:function(_172){
_172.dir=_12.prototype._checkContextual(_172.value);
},getCookie:function(name){
var dc=document.cookie;
var _173=name+"=";
var _174=dc.indexOf("; "+_173);
if(_174==-1){
_174=dc.indexOf(_173);
if(_174!=0){
return null;
}
}else{
_174+=2;
}
var end=document.cookie.indexOf(";",_174);
if(end==-1){
end=dc.length;
}
return unescape(dc.substring(_174+_173.length,end));
}});
return curam.util;
});
