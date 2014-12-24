//>>built
define("curam/widget/IDXSelect",["dojo/_base/array","dojo/_base/lang","idx/oneui/form/Select"],function(_1,_2){
var _3=dojo.declare("curam.widget.IDXSelect",idx.oneui.form.Select,{focusSelectedItem:function(){
var _4=this.value;
if(typeof _4!="undefined"){
if(!_2.isArray(_4)){
_4=[_4];
}
var _5=_1.some(this._getChildren(),function(_6){
var _7=false;
if(typeof _6.option!="undefined"){
_7=_4[0]===_6.option.value;
}
if(_7){
this.dropDown.focusChild(_6);
}
return _7;
},this);
if(!_5){
this.dropDown.focusFirstChild();
}
}else{
console.warn("Value is not defined");
}
}});
return _3;
});
