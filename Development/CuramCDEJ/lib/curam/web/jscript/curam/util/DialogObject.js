//>>built
define("curam/util/DialogObject",["curam/dialog","curam/util"],function(){
var _1=dojo.declare("curam.util.DialogObject",null,{_id:null,constructor:function(_2,id){
if(!id){
var _3=window.top.dojo.subscribe("/curam/dialog/uim/opened/"+_2,this,function(_4){
this._id=_4;
window.top.dojo.unsubscribe(_3);
});
}else{
this._id=id;
}
},registerBeforeCloseHandler:function(_5){
var _6=window.top.dojo.subscribe("/curam/dialog/BeforeClose",this,function(_7){
if(_7==this._id){
_5();
}
window.top.dojo.unsubscribe(_6);
});
},registerOnDisplayHandler:function(_8){
if(curam.dialog._displayed==true){
_8(curam.dialog._size);
}else{
var ut=window.top.dojo.subscribe("/curam/dialog/displayed",this,function(_9,_a){
if(_9==this._id){
_8(_a);
}
window.top.dojo.unsubscribe(ut);
});
}
},close:function(_b,_c,_d){
var _e=curam.util.UimDialog._getDialogFrameWindow(this._id);
var _f=_e.curam.dialog.getParentWindow(_e);
if(_b&&!_c){
_e.curam.dialog.forceParentRefresh();
curam.dialog.doRedirect(_f,null);
}else{
if(_c){
var _10=_c;
if(_c.indexOf("Page.do")==-1){
_10=_c+"Page.do"+curam.util.makeQueryString(_d);
}
curam.dialog.doRedirect(_f,_10);
}
}
curam.dialog.closeModalDialog();
}});
return _1;
});
