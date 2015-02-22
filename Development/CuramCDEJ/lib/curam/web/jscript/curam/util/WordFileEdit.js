//>>built
define("curam/util/WordFileEdit",["curam/define","dijit/DialogUnderlay","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.WordFileEdit",{_clickedFinish:false,_buttonIdPart:"__o3btn.",searchWindow:null,cantLoadControlMsg:"$unlocalized$ cannot load Word integration control",cantSubmitMsg:"$unlocalized$ cannot submit data",searchWindowTitlePrefix:"SEARCH",useApplet:(function(){
return typeof dojo.isIE=="undefined";
})(),controlAttributes:{},controlParameters:{},submitSaveWordFileEdit:function(_2,_3){
try{
var _4=curam.util.WordFileEdit.getParentWindow();
var _5=curam.util.WordFileEdit._findTextArea(_4,_2);
_5.value=_3;
_4.document.forms[0].submit();
}
catch(e){
alert("Error saving: "+dojo.toJson(e));
}
return;
},openWordFileEditWindow:function(_6,_7,_8){
if(curam.util.WordFileEdit.getSearchPage().length>0){
curam.util.WordFileEdit.displaySearchWindow(_6,_7,_8);
}else{
curam.util.WordFileEdit.doOpenWordFileEditWindow(_6,_7,_8);
}
},doOpenWordFileEditWindow:function(_9,_a,_b){
var _c=100;
var _d=100;
var _e=Math.floor((screen.width-_c)/2);
var _f=Math.floor((screen.height-_d)/2);
window.open("../word-file-edit.jsp?id="+_9+"&document-field="+_a+"&details-field="+_b,new Date().valueOf(),"toolbar=no,menubar=no,location=no,scrollbars=no,"+"resizable=no,top="+_f+",left="+_e+",width="+_c+",height="+_d);
},displaySearchWindow:function(_10,_11,_12,_13){
if(!_13){
_13=0;
}
if(_13>3){
return;
}
if(_13==0){
curam.util.WordFileEdit.searchWindow=window.open("about:blank","searchWindow","left=40000,top=40000,scrollbars=yes");
}
var _14=false;
try{
var _15=curam.util.WordFileEdit.searchWindow.document.title;
if(_15.indexOf(searchWindowTitlePrefix+":")==-1){
curam.util.WordFileEdit.searchWindow.document.title=searchWindowTitlePrefix+":"+_10;
}else{
_14=true;
}
_15=curam.util.WordFileEdit.searchWindow.document.title;
if(!_14&&_15.indexOf(searchWindowTitlePrefix+":")!=-1){
_14=true;
}
}
catch(e){
}
if(!_14){
_13++;
window.setTimeout("displaySearchWindow('"+_10+"','"+_11+"','"+_12+"',"+_13+")",500);
}else{
curam.util.WordFileEdit.doOpenWordFileEditWindow(_10,_11,_12);
}
},redisplaySearchWindow:function(_16,_17){
if(!_17){
_17=0;
}
if(_17>3){
return;
}
if(_17==0){
curam.util.WordFileEdit.searchWindow=window.open("about:blank","searchWindow","left=40000,top=40000");
}
var _18=false;
try{
var _19=curam.util.WordFileEdit.searchWindow.document.title;
if(_19.indexOf(searchWindowTitlePrefix+":")==-1){
curam.util.WordFileEdit.searchWindow.document.title=searchWindowTitlePrefix+":"+_16;
}else{
_18=true;
}
_19=curam.util.WordFileEdit.searchWindow.document.title;
if(!_18&&_19.indexOf(searchWindowTitlePrefix+":")!=-1){
_18=true;
}
}
catch(e){
}
if(!_18){
_17++;
window.setTimeout("redisplaySearchWindow('"+_16+"',"+_17+")",500);
}
},getSearchPage:function(_1a){
var _1b="";
try{
if(!_1a){
_1b=document.getElementById("searchPage").value;
}else{
var _1c=curam.util.WordFileEdit.getParentWindow();
_1b=_1c.document.getElementById("searchPage").value;
}
}
catch(e){
}
return _1b;
},initialize:function(_1d){
var _1e=curam.util.WordFileEdit.getParentWindow();
try{
var _1f=dojo.byId(_1d);
if(typeof _1f!="undefined"){
curam.util.WordFileEdit._setOverlay(true);
if(curam.util.WordFileEdit.useApplet){
if(!dojo.isIE){
var _20=_1e.frameElement;
curam.util.connect(_20,"onload",function(evt){
var _21=dojo.fixEvent(evt,_20);
var url=_20.contentWindow.location.href;
try{
_1f.mainApplicationPageLoaded(url);
}
catch(e){
alert("Error calling mainApplicationPageLoaded on applet: "+e.message);
}
});
_1e.top.dojo.addOnUnload(function(){
_1f.mainApplicationPageUnloaded();
});
}
}else{
_1f.openDocument();
}
}else{
curam.util.WordFileEdit._setOverlay(false);
curam.util.WordFileEdit.closeAppletWindow();
}
}
catch(e){
curam.util.WordFileEdit._setOverlay(false);
curam.util.WordFileEdit.closeAppletWindow();
_1e.curam.util.WordFileEdit.cannotLoadControl(e);
}
},_setOverlay:function(_22){
try{
var _23=curam.util.WordFileEdit.getParentWindow();
var _24=(_23!=null)?_23.curam.util.getTopmostWindow():curam.util.getTopmostWindow();
if(_24!=window){
_24.dojo.require("curam/util/WordFileEdit");
_24.curam.util.WordFileEdit._setOverlay(_22);
return;
}
if(!curam.util.WordFileEdit._overlay){
curam.util.WordFileEdit._overlay=new dijit.DialogUnderlay({dialogId:"dummy","class":"word-file-edit-overlay"});
}
var ovr=curam.util.WordFileEdit._overlay;
if(_22){
dojo.style(ovr.domNode,"zIndex",9999);
ovr.show();
}else{
ovr.hide();
}
}
catch(e){
alert("_setOverlay ERROR: "+e.message);
}
},cannotLoadControl:function(e){
var msg=dojo.isIE&&!curam.util.WordFileEdit.useApplet?curam.util.WordFileEdit.cantLoadControlMsgIE:curam.util.WordFileEdit.cantLoadControlMsg;
alert(msg+"\rERROR: "+e.message);
history.go(-1);
},setStatusTextWordFileEditWindow:function(_25){
try{
document.getElementById("statustext").innerHTML=_25;
}
catch(e){
}
},getWordFileEditParentTextareaValue:function(_26){
var _27="";
try{
var _28=curam.util.WordFileEdit.getParentWindow();
var _29=curam.util.WordFileEdit._findTextArea(_28,_26);
_27=_29.value;
}
catch(e){
alert("getWordFileEditParentTextareaValue('"+_26+"'): \r"+e.message);
}
return _27;
},_findTextArea:function(_2a,_2b,_2c){
var _2d=null;
if(!_2c){
_2d=_2a.dojo.query("input[name='"+_2b+"']",_2a.dojo.body())[0];
}else{
_2d=_2a.dojo.query("input[name$='"+_2b+"']",_2a.dojo.body())[0];
}
return _2d;
},finishedWordFileEditWindow:function(_2e,_2f,_30){
if(!curam.util.WordFileEdit._clickedFinish){
curam.util.WordFileEdit.doFinishWordFileEditWindow(_2e,_2f,_30);
curam.util.WordFileEdit._clickedFinish=true;
}
},doFinishWordFileEditWindow:function(_31,_32,_33){
var _34=false;
var _35=false;
try{
var _36=curam.util.WordFileEdit.getParentWindow();
if(_32&&_33){
_35=true;
var _37=curam.util.WordFileEdit._findTextArea(_36,_32);
_37.value=_33;
}
var _38=_36.dojo.query("form input");
for(var i=0;i<_38.length&&!_34;i++){
if(_38[i].id.substring(0,curam.util.WordFileEdit._buttonIdPart.length).toLowerCase()==curam.util.WordFileEdit._buttonIdPart.toLowerCase()){
_34=true;
if(!_35){
var _37=curam.util.WordFileEdit._findTextArea(_36,_32);
_37.value="";
var _39=false;
var _3a;
var _3b=_38[i];
try{
while(_3b.tagName.toUpperCase()!="BODY"&&!_39){
if(_3b.tagName.toUpperCase()=="FORM"){
_39=true;
_3a=_3b;
}else{
_3b=_3b.parentElement;
}
}
}
catch(e){
alert("doFinishWordFileEditWindow: "+e.message);
}
if(_39){
var _3c="<input type=\"hidden\" name=\"__o3NoSave\" value=\"true\"/>";
_3a.innerHTML+=_3c;
}
}
_36.curam.util.clickButton(_38[i].id);
if(_31.length>0){
_36.document.body.innerHTML=_31;
}
curam.util.WordFileEdit._setOverlay(false);
return;
}
}
if(!_34){
alert(curam.util.WordFileEdit.cantSubmitMsg);
try{
curam.util.WordFileEdit._setOverlay(false);
curam.util.WordFileEdit.closeAppletWindow();
}
catch(e){
}
}
}
catch(e){
alert("doFinishWordFileEditWindow: "+e.message);
curam.util.WordFileEdit._setOverlay(false);
curam.util.WordFileEdit.closeAppletWindow();
}
},screenAlertWordFileEditWindow:function(_3d){
try{
curam.util.WordFileEdit.getParentWindow().alert(_3d);
}
catch(e){
}
},hideSubmitButtons:function(){
dojo.query("a.ac").forEach(function(_3e){
_3e.style.display="none";
});
},getParentWindow:function(){
return window.opener;
},getUrls:function(){
try{
var _3f=curam.util.WordFileEdit.getParentWindow();
var doc=_3f.document;
var _40=doc.URL;
var _41=_3f.dojo.query("form",doc)[0];
var _42=_41.action;
var _43=_40.substr(0,_40.lastIndexOf("/")+1);
window.curam.util.WordFileEdit.urlPath_return_value=_43;
var _44=(dojo.isIE>=8)?_42:_43+_42;
window.curam.util.WordFileEdit.allowedUrl_return_value=_44;
return [_43,_44];
}
catch(e){
alert("getUrls: "+dojo.toJson(e));
}
},getTitle:function(){
var _45=curam.util.WordFileEdit.getParentWindow().top.document.title;
curam.util.WordFileEdit.title_return_value=_45;
window.curam_wordIntegration_title_return_value=_45;
return _45;
},setTitle:function(_46){
curam.util.WordFileEdit.getParentWindow().top.document.title=_46;
},hasNamedInput:function(_47){
var _48=curam.util.WordFileEdit.getParentWindow();
var _49=_47.slice(1);
var _4a=curam.util.WordFileEdit._findTextArea(_48,_49,true);
return _4a?true:false;
},closeAppletWindow:function(){
self.close();
},runApplet:function(id){
if(typeof deployJava!="undefined"){
var _4b=deployJava.getPlugin();
if(_4b){
curam.debug.log(_1.getProperty("curam.util.WordFileEdit.version"),_4b.version);
}else{
curam.debug.log(_1.getProperty("curam.util.WordFileEdit.no.plugin"));
}
}else{
curam.debug.log(_1.getProperty("curam.util.WordFileEdit.no.java"));
}
if(typeof deployJava=="undefined"||(!dojo.isChrome&&!deployJava.isPlugin2())){
alert(curam.util.WordFileEdit.noJavaInstalled);
}else{
dojo.mixin(curam.util.WordFileEdit.controlAttributes,{id:id});
var _4c=dojo.create("div",{style:"display:none"});
var _4d=dojo.create("applet",curam.util.WordFileEdit.controlAttributes,_4c);
var _4e=curam.util.WordFileEdit.controlParameters;
for(property in _4e){
dojo.create("param",{name:property,value:_4e[property]},_4d);
}
var _4f=_4c.innerHTML;
dojo.destroy(_4c);
document.write(_4f);
}
}});
return curam.util.WordFileEdit;
});
