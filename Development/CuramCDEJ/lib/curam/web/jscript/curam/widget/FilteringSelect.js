//>>built
define("curam/widget/FilteringSelect",["dijit/registry","dojo/on","dijit/form/FilteringSelect"],function(_1,on){
var _2=dojo.declare("curam.widget.FilteringSelect",dijit.form.FilteringSelect,{enterKeyOnOpenDropDown:false,postMixInProperties:function(){
if(!this.store){
if(dojo.query("> option",this.srcNodeRef)[0]==undefined){
dojo.create("option",{innerHTML:"<!--__o3_BLANK-->"},this.srcNodeRef);
}
}
if(!this.get("store")&&this.srcNodeRef.value==""){
var _3=this.srcNodeRef,_4=dojo.query("> option[value='']",_3);
if(_4.length&&_4[0].innerHTML!="<!--__o3_BLANK-->"){
this.displayedValue=dojo.trim(_4[0].innerHTML);
}
}
this.inherited(arguments);
},postCreate:function(){
on(this.focusNode,"keydown",function(e){
var _5=_1.byNode(dojo.byId("widget_"+e.target.id));
if(e.keyCode==dojo.keys.ENTER&&_5._opened){
_5.enterKeyOnOpenDropDown=true;
}
});
this.inherited(arguments);
},startup:function(){
this.domNode.setAttribute("role","listbox");
this.inherited(arguments);
},_callbackSetLabel:function(_6,_7,_8,_9){
if((_7&&_7[this.searchAttr]!==this._lastQuery)||(!_7&&_6.length&&this.get("store").getIdentity(_6[0])!=this._lastQuery)){
return;
}
if(!_6.length){
this.set("value","__o3_INVALID",_9||(_9===undefined&&!this.focused),this.textbox.value,null);
}else{
this.set("item",_6[0],_9);
}
}});
return _2;
});
