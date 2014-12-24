//>>built
define("curam/util/ResourceBundle",["dojo/i18n","dojo/string"],function(_1,_2){
var _3=dojo.declare("curam.util.ResourceBundle",null,{_bundle:undefined,constructor:function(_4,_5){
var _6=_4.split(".");
var _7=_6[_6.length-1];
var _8=_6.length==1?"curam.application":_4.slice(0,_4.length-_7.length-1);
try{
var b=_1.getLocalization(_8,_7,_5);
if(this._isEmpty(b)){
throw new Error("Empty resource bundle.");
}else{
this._bundle=b;
}
}
catch(e){
throw new Error("Unable to access resource bundle: "+_8+"."+_7+": "+e.message);
}
},_isEmpty:function(_9){
for(var _a in _9){
return false;
}
return true;
},getProperty:function(_b,_c){
var _d=this._bundle[_b];
var _e=_d;
if(_c){
_e=_2.substitute(_d,_c);
}
return _e;
}});
return _3;
});
