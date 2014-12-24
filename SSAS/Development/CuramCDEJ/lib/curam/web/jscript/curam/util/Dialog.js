//>>built
define("curam/util/Dialog",["curam/util","curam/define","curam/dialog","curam/util/onLoad","curam/debug","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.Dialog",{_id:null,_unsubscribes:[],open:function(_2,_3,_4){
var _5=_2+curam.util.makeQueryString(_3);
var _6={href:_5};
var _7=null;
if(_4){
_7="width="+_4.width+",height="+_4.height;
}
window.jsModals=true;
curam.util.openModalDialog(_6,_7);
},init:function(){
var _8=curam.util.getTopmostWindow();
var _9=_8.dojo.subscribe("/curam/dialog/SetId",null,function(_a){
curam.util.Dialog._id=_a;
curam.debug.log(_1.getProperty("curam.util.Dialog.id.success"),curam.util.Dialog._id);
_8.dojo.unsubscribe(_9);
});
curam.util.Dialog._unsubscribes.push(_9);
_8.dojo.publish("/curam/dialog/init");
if(!curam.util.Dialog._id){
curam.debug.log(_1.getProperty("curam.util.Dialog.id.fail"));
}
dojo.addOnUnload(function(){
curam.util.Dialog._releaseHandlers();
window.parent.dojo.publish("/curam/dialog/iframeUnloaded",[curam.util.Dialog._id,window]);
});
},registerGetTitleFunc:function(_b){
curam.util.onLoad.addPublisher(function(_c){
_c.title=_b();
});
},registerGetSizeFunc:function(_d){
curam.util.onLoad.addPublisher(function(_e){
_e.windowOptions=_d();
});
},registerAfterDisplayHandler:function(_f){
var _10=curam.util.getTopmostWindow();
curam.util.Dialog._unsubscribes.push(_10.dojo.subscribe("/curam/dialog/AfterDisplay",null,function(_11){
if(_11==curam.util.Dialog._id){
_f();
}
}));
},registerBeforeCloseHandler:function(_12){
var _13=curam.util.getTopmostWindow();
curam.util.Dialog._unsubscribes.push(_13.dojo.subscribe("/curam/dialog/BeforeClose",null,function(_14){
if(_14===curam.util.Dialog._id){
_12();
}
}));
},pageLoadFinished:function(){
var _15=curam.util.getTopmostWindow();
curam.util.Dialog._unsTokenReleaseHandlers=_15.dojo.subscribe("/curam/dialog/BeforeClose",null,function(_16){
if(_16==curam.util.Dialog._id){
curam.util.Dialog._releaseHandlers();
}
});
curam.util.onLoad.execute();
},_releaseHandlers:function(){
var _17=curam.util.getTopmostWindow();
dojo.forEach(curam.util.Dialog._unsubscribes,_17.dojo.unsubscribe);
curam.util.Dialog._unsubscribes=[];
_17.dojo.unsubscribe(curam.util.Dialog._unsTokenReleaseHandlers);
curam.util.Dialog._unsTokenReleaseHandlers=null;
},close:function(_18,_19,_1a){
var _1b=curam.dialog.getParentWindow(window);
if(_18&&!_19){
curam.dialog.forceParentRefresh();
_1b.curam.util.redirectWindow(null);
}else{
if(_19){
var _1c=_19;
if(_19.indexOf("Page.do")==-1&&_19.indexOf("Action.do")==-1){
_1c=_19+"Page.do"+curam.util.makeQueryString(_1a);
}
_1b.curam.util.redirectWindow(_1c);
}
}
var _1d=curam.util.getTopmostWindow();
_1d.dojo.publish("/curam/dialog/close",[curam.util.Dialog._id]);
},closeAndSubmitParent:function(_1e){
var _1f=curam.dialog.getParentWindow(window);
var _20=_1f.document.forms["mainForm"];
var _21=curam.util.getTopmostWindow();
if(_20==null||_20==undefined){
_21.dojo.publish("/curam/dialog/close",[curam.util.Dialog._id]);
return;
}
var _22=function(_23){
for(var _24 in _23){
if(_23.hasOwnProperty(_24)){
return false;
}
}
return true;
};
if(_1e&&!_22(_1e)){
var _25=dojo.query("input[type=text])",_20);
var _26=dojo.filter(_25,function(_27){
return _27.readOnly==false;
});
dojo.forEach(_26,function(_28){
_28.value="";
});
for(var _29 in _1e){
var _2a=_26[parseInt(_29)];
if(_2a){
var _2b=dojo.query("input[name="+_2a.id+"]",_20)[0];
if(_2b){
_2b.value=_1e[_29];
}else{
_2a.value=_1e[_29];
}
}
}
}else{
}
_1f.dojo.publish("/curam/page/refresh");
_20.submit();
_21.dojo.publish("/curam/dialog/close",[curam.util.Dialog._id]);
}});
});
