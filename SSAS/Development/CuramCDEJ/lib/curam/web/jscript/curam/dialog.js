//>>built
define("curam/dialog",["curam/util","curam/debug","curam/util/external","curam/util/Refresh","curam/tab","curam/util/RuntimeContext","curam/define","curam/util/onLoad","cm/_base/_dom","curam/util/ResourceBundle"],function(_1,_2,_3){
dojo.requireLocalization("curam.application","Debug");
var _4=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.dialog",{MODAL_PREV_FLAG:"o3modalprev",MODAL_PREV_FLAG_INPUT:"curam_dialog_prev_marker",FORCE_CLOSE:false,ERROR_MESSAGES_HEADER:"error-messages-header",_hierarchy:[],_id:null,_displayedHandlerUnsToken:null,_displayed:false,_size:null,_justClose:false,validTargets:{"_top":true,"_self":true},initModal:function(_5,_6){
curam.dialog.pageId=_5;
curam.dialog.messagesExist=_6;
var _7=_1.getTopmostWindow();
var _8=false;
var _9=_7.dojo.subscribe("/curam/dialog/SetId",this,function(_a){
_2.log("curam.dialog: "+_4.getProperty("curam.dialog.id"),_a);
curam.dialog._id=_a;
_8=true;
_7.dojo.unsubscribe(_9);
});
_7.dojo.publish("/curam/dialog/init");
if(!_8){
_2.log("curam.dialog: "+_4.getProperty("curam.dialog.no.id"));
_7.dojo.unsubscribe(_9);
}
if(curam.dialog.closeDialog(false)){
return;
}
curam.dialog._displayedHandlerUnsToken=_1.getTopmostWindow().dojo.subscribe("/curam/dialog/displayed",null,function(_b,_c){
if(_b==curam.dialog._id){
curam.dialog._displayed=true;
curam.dialog._size=_c;
_1.getTopmostWindow().dojo.unsubscribe(curam.dialog._displayedHandlerUnsToken);
curam.dialog._displayedHandlerUnsToken=null;
}
});
if(jsScreenContext.hasContextBits("AGENDA")||jsScreenContext.hasContextBits("TREE")){
dojo.addOnUnload(function(){
_1.getTopmostWindow().dojo.unsubscribe(curam.dialog._displayedHandlerUnsToken);
curam.dialog._displayedHandlerUnsToken=null;
});
}
dojo.addOnLoad(function(){
_1.connect(dojo.body(),"onclick",curam.dialog.modalEventHandler);
for(var i=0;i<document.forms.length;i++){
var _d=document.forms[i];
curam.dialog.addFormInput(_d,"hidden","o3frame","modal");
var _e=dojo.byId("o3ctx");
var sc=new curam.util.ScreenContext(jsScreenContext.getValue());
sc.addContextBits("ACTION|ERROR");
_e.value=sc.getValue();
_1.connect(_d,"onsubmit",curam.dialog.formSubmitHandler);
}
window.curamModal=true;
});
dojo.addOnUnload(function(){
_1.getTopmostWindow().dojo.publish("/curam/dialog/iframeUnloaded",[curam.dialog._id,window]);
});
if(_8){
dojo.publish("/curam/dialog/ready");
}
},closeDialog:function(_f){
if(_f){
curam.dialog.forceClose();
}
var _10=curam.dialog.checkClose(curam.dialog.pageId);
if(_10){
_1.onLoad.addPublisher(function(_11){
_11.modalClosing=true;
});
if(curam.dialog.messagesExist){
dojo.addOnLoad(function(){
var _12=dojo.byId(_1.ERROR_MESSAGES_CONTAINER);
var _13=dojo.byId(_1.ERROR_MESSAGES_LIST);
var _14=dojo.byId(curam.dialog.ERROR_MESSAGES_HEADER);
if(_13&&_14){
_1.saveInformationalMsgs(_10);
_1.disableInformationalLoad();
}else{
_10();
}
});
}else{
_10();
}
return true;
}
return false;
},addFormInput:function(_15,_16,_17,_18){
return dojo.create("input",{"type":_16,"name":_17,"value":_18},_15);
},checkClose:function(_19){
if(curam.dialog._justClose){
return function(){
curam.dialog.closeModalDialog();
};
}
var _1a=curam.dialog.getParentWindow(window);
if(!_1a){
return false;
}
var _1b=window.location.href;
var _1c=curam.dialog.MODAL_PREV_FLAG;
var _1d=_1.getUrlParamValue(_1b,_1c);
var _1e=true;
if(_1d){
if(_1a){
if(_1d==_19){
_1e=false;
}
}
}else{
_1e=false;
}
var _1f=_1.getUrlParamValue(_1b,"o3ctx");
if(_1f){
var sc=new curam.util.ScreenContext();
sc.setContext(_1f);
if(sc.hasContextBits("TREE|ACTION")){
_1e=false;
}
}
if(_1e||curam.dialog.FORCE_CLOSE){
if(!curam.dialog.FORCE_CLOSE){
if(_1d=="user-prefs-editor"){
return function(){
if(_1a&&_1a.location!==_1.getTopmostWindow().location){
curam.dialog.doRedirect(_1a);
}
curam.dialog.closeModalDialog();
};
}
return function(){
var rp=_1.removeUrlParam;
_1b=rp(rp(rp(_1b,_1c),"o3frame"),_1.PREVENT_CACHE_FLAG);
_1b=_1.adjustTargetContext(_1a,_1b);
if(_1a&&_1a.location!==_1.getTopmostWindow().location){
curam.dialog.doRedirect(_1a,_1b,true);
}else{
curam.tab.getTabController().handleLinkClick(_1b);
}
curam.dialog.closeModalDialog();
};
}else{
return function(){
if(_1a!==_1.getTopmostWindow()){
_1a.curam.util.loadInformationalMsgs();
}
curam.dialog.closeModalDialog();
};
}
}
return false;
},getParentWindow:function(_20){
if(!_20){
_2.log("curam.dialog.getParentWindow(): "+_4.getProperty("curam.dialog.no.child"),window);
_2.log("returning as parent = ",window.parent.location.href);
return window.parent;
}
_2.log("curam.dialog.getParentWindow(): "+_4.getProperty("curam.dialog.child"),_20.location.href);
var _21=curam.dialog._getDialogHierarchy();
for(var i=0;i<_21.length;i++){
if(_21[i]==_20){
var _22=(i>0)?_21[i-1]:_21[0];
_2.log("curam.dialog.getParentWindow(): "+_4.getProperty("curam.dialog.parent.window"),_22);
return _22;
}
}
_2.log("curam.dialog.getParentWindow(): "+_4.getProperty("curam.dialog.child.not.found"),_20.location.href);
_2.log("curam.dialog.getParentWindow(): "+_4.getProperty("curam.dialog.hierarchy"),_21);
var ret=_21.length>0?_21[_21.length-1]:undefined;
_2.log("curam.dialog.getParentWindow(): "+_4.getProperty("curam.dialog.returning.parent"),ret?ret.location.href:"undefined");
return ret;
},_getDialogHierarchy:function(){
var _23=_1.getTopmostWindow();
_23.require(["curam/dialog"]);
return _23.curam.dialog._hierarchy;
},pushOntoDialogHierarchy:function(_24){
var _25=curam.dialog._getDialogHierarchy();
if(dojo.indexOf(_25,_24)<0){
_25.push(_24);
_2.log(_4.getProperty("curam.dialog.add.hierarchy"),_24.location.href);
_2.log(_4.getProperty("curam.dialog.full.hierarchy"),_25);
}
},removeFromDialogHierarchy:function(_26){
var _27=curam.dialog._getDialogHierarchy();
if(!_26||_27[_27.length-1]==_26){
_27.pop();
}else{
_2.log("curam.dialog.removeFromDialogHierarchy(): "+_4.getProperty("curam.dialog.ignore.request"));
try{
_2.log(_26.location.href);
}
catch(e){
_2.log(e.message);
}
}
},stripPageOrActionFromUrl:function(url){
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
},_isSameBaseUrl:function(_28,rtc,_29){
if(_28&&_28.indexOf("#")==0){
return true;
}
var _2a=_28.split("?");
var _2b=rtc.getHref().split("?");
if(_2a[0].indexOf("/")<0){
var _2c=_2b[0].split("/");
_2b[0]=_2c[_2c.length-1];
}
if(_2b[0].indexOf("/")<0){
var _2c=_2a[0].split("/");
_2a[0]=_2c[_2c.length-1];
}
if(_29&&_29==true){
_2a[0]=curam.dialog.stripPageOrActionFromUrl(_2a[0]);
_2b[0]=curam.dialog.stripPageOrActionFromUrl(_2b[0]);
}
if(_2a[0]==_2b[0]){
return true;
}
return false;
},modalEventHandler:function(_2d){
curam.dialog._doHandleModalEvent(_2d,new curam.util.RuntimeContext(window),curam.dialog.closeModalDialog,curam.dialog.doRedirect);
},_doHandleModalEvent:function(e,rtc,_2e,_2f){
var _30=e.target;
var u=_1;
switch(_30.tagName){
case "INPUT":
if(dojo.attr(_30,"type")=="submit"&&typeof _30.form!="undefined"){
_30.form.setAttribute("keepModal",_30.getAttribute("keepModal"));
}
return true;
case "IMG":
case "SPAN":
case "DIV":
_30=cm.getParentByType(_30,"A");
if(_30==null){
return;
}
case "A":
if(_30._submitButton){
_30._submitButton.form.setAttribute("keepModal",_30._submitButton.getAttribute("keepModal"));
return;
}
break;
default:
return true;
}
var _31=dojo.stopEvent;
var _32=_30.getAttribute("href");
if(_32==""){
_2e();
return false;
}
if(_32.indexOf("javascript")==0){
return false;
}
var ctx=jsScreenContext;
ctx.addContextBits("MODAL");
if(!_32){
return false;
}
var _33=_30.getAttribute("target");
if(_33&&!curam.dialog.validTargets[_33]){
return true;
}
if(_32&&_32.indexOf("/servlet/FileDownload?")>-1){
var _34=dojo.create("iframe",{src:_32},dojo.body());
_34.style.display="none";
_31(e);
return false;
}
if(dojo.hasClass(_30,"external-link")){
return true;
}
if(_1.isSameUrl(_32,null,rtc)){
if(_32.indexOf("#")<0){
_32=u.replaceUrlParam(_32,"o3frame","modal");
_32=u.replaceUrlParam(_32,"o3ctx",ctx.getValue());
_2f(window,_32);
return false;
}
return true;
}
if(_32&&curam.dialog._isSameBaseUrl(_32,rtc,true)&&!_30.getAttribute("keepModal")){
_30.setAttribute("keepModal","true");
}
var _35=curam.dialog.getParentWindow(rtc.contextObject());
if(_30&&_30.getAttribute){
_31(e);
if(_30.getAttribute("keepModal")=="true"){
_32=u.replaceUrlParam(_32,"o3frame","modal");
_32=u.replaceUrlParam(_32,"o3ctx",ctx.getValue());
_2f(window,_32);
}else{
if(_35){
_32=u.removeUrlParam(_32,"o3frame");
_32=u.removeUrlParam(_32,curam.dialog.MODAL_PREV_FLAG);
if(_35.location!==_1.getTopmostWindow().location){
var _36=new curam.util.RuntimeContext(_35);
var _37=_36.getHref();
_37=u.removeUrlParam(_37,"o3frame");
if(_1.isActionPage(_37)){
if(!curam.dialog._isSameBaseUrl(_32,_36,true)){
_32=u.adjustTargetContext(_35,_32);
_2f(_35,_32);
}
}else{
if(!_1.isSameUrl(_32,_37)){
_32=u.adjustTargetContext(_35,_32);
curam.dialog.doRedirect(_35,_32);
}
}
}else{
var _38=new curam.util.ScreenContext("TAB");
_32=u.replaceUrlParam(_32,"o3ctx",_38.getValue());
curam.tab.getTabController().handleLinkClick(_32);
}
_2e();
}
}
return false;
}
if(_35&&typeof (_30)=="undefined"||_30==null||_30=="_self"||_30==""){
_31(e);
_32=_32.replace(/[&?]o3frame=modal/g,"").replace("%3Fo3frame%3Dmodal","").replace("?o3frame%3Dmodal","");
_32=_1.updateCtx(_32);
if(_35.location!==_1.getTopmostWindow().location){
_2f(_35,_32);
}else{
var _38=new curam.util.ScreenContext("TAB");
_32=u.replaceUrlParam(_32,"o3ctx",_38.getValue());
curam.tab.getTabController().handleLinkClick(_32);
}
_2e();
return false;
}
return true;
},formSubmitHandler:function(e){
var _39=curam.dialog.getParentWindow(window);
if(typeof _39=="undefined"){
return true;
}
e.target.method="post";
e.target.setAttribute("target",window.name);
var _3a=e.target.action;
var _3b=curam.dialog.MODAL_PREV_FLAG;
var _3c=curam.dialog.MODAL_PREV_FLAG_INPUT;
var u=_1;
var _3d=dojo.byId(_3c);
if(_3d){
_3d.parentNode.removeChild(_3d);
}
if(e.target.getAttribute("keepModal")!="true"&&!jsScreenContext.hasContextBits("AGENDA")){
var _3e="multipart/form-data";
if(e.target.enctype==_3e||e.target.encoding==_3e){
e.target.action=u.removeUrlParam(_3a,_3b);
_3d=curam.dialog.addFormInput(e.target,"hidden",_3b,curam.dialog.pageId);
_3d.setAttribute("id",_3c);
_3d.id=_3c;
}else{
e.target.action=u.replaceUrlParam(_3a,_3b,curam.dialog.pageId);
}
}else{
e.target.action=u.removeUrlParam(_3a,_3b);
}
_39.curam.util.invalidatePage();
if(!jsScreenContext.hasContextBits("EXTAPP")){
_1.firePageSubmittedEvent("dialog");
}
return true;
},forceClose:function(){
curam.dialog.FORCE_CLOSE=true;
},forceParentRefresh:function(){
var _3f=curam.dialog.getParentWindow(window);
if(!_3f){
return;
}
_3f.curam.util.FORCE_REFRESH=true;
},closeModalDialog:function(){
var _40=_1.getTopmostWindow();
if(curam.dialog._displayedHandlerUnsToken!=null){
_40.dojo.unsubscribe(curam.dialog._displayedHandlerUnsToken);
curam.dialog._displayedHandlerUnsToken=null;
}
if(typeof (curam.dialog._id)=="undefined"||curam.dialog._id==null){
var _41=window.frameElement.id;
var _42=_41.substring(7);
curam.dialog._id=_42;
_2.log("curam.dialog.closeModalDialog() "+_4.getProperty("curam.dialog.modal.id")+_42);
}
_2.log("publishing /curam/dialog/close for ",curam.dialog._id);
_1.getTopmostWindow().dojo.publish("/curam/dialog/close",[curam.dialog._id]);
_2.log("publishing /curam/dialog/close for ",curam.dialog._id);
},parseWindowOptions:function(_43){
var _44={};
if(_43){
_2.log("curam.dialog.parseWindowOptions "+_4.getProperty("curam.dialog.parsing"),_43);
var _45=_43.split(",");
var _46;
for(var i=0;i<_45.length;i++){
_46=_45[i].split("=");
_44[_46[0]]=_46[1];
}
_2.log("done:",dojo.toJson(_44));
}else{
_2.log("curam.dialog.parseWindowOptions "+_4.getProperty("curam.dialog.no.options"));
}
return _44;
},doRedirect:function(_47,_48,_49,_4a){
window.curamDialogRedirecting=true;
_47.curam.util.redirectWindow(_48,_49,_4a);
},closeGracefully:function(){
curam.dialog._justClose=true;
}});
return curam.dialog;
});
