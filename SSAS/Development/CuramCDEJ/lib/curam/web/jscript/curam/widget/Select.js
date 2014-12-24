//>>built
define("curam/widget/Select",["dojo/dom-style","dijit/popup","dojo/dom-geometry","dojo/_base/lang","dojo/dom-attr","dojo/dom-class","dijit/form/Select"],function(_1,_2,_3,_4,_5,_6){
var _7=dojo.declare("curam.widget.Select",dijit.form.Select,{openDropDown:function(){
var _8=this.dropDown,_9=_8.domNode,_a=this._aroundNode||this.domNode,_b=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_9.style.width){
this._explicitDDWidth=true;
}
if(_9.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _c={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_c.width="";
}
if(!this._explicitDDHeight){
_c.height="";
}
_1.set(_9,_c);
var _d=this.maxHeight;
if(_d==-1){
var _e=winUtils.getBox(),_f=_3.position(_a,false);
_d=Math.floor(Math.max(_f.y,_e.h-(_f.y+_f.h)));
}
_2.moveOffScreen(_8);
if(_8.startup&&!_8._started){
_8.startup();
}
var mb=_3.getMarginSize(_9);
var _10=(_d&&mb.h>_d);
_1.set(_9,{overflowX:"hidden",overflowY:_10?"auto":"hidden"});
if(_10){
mb.h=_d;
if("w" in mb){
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_a.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_a.offsetWidth);
}else{
delete mb.w;
}
}
if(_4.isFunction(_8.resize)){
_8.resize(mb);
}else{
_3.setMarginBox(_9,mb);
}
}
var _11=_2.open({parent:this,popup:_8,around:_a,orient:this.dropDownPosition,onExecute:function(){
_b.closeDropDown(true);
},onCancel:function(){
_b.closeDropDown(true);
},onClose:function(){
_5.set(_b._popupStateNode,"popupActive",false);
_6.remove(_b._popupStateNode,"dijitHasDropDownOpen");
_b._opened=false;
}});
_5.set(this._popupStateNode,"popupActive","true");
_6.add(_b._popupStateNode,"dijitHasDropDownOpen");
this._opened=true;
return _11;
}});
return _7;
});
