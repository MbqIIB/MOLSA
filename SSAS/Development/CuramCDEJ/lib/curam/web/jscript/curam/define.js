//>>built
define("curam/define",[],function(){
if(typeof (dojo.global.curam)=="undefined"){
dojo.global.curam={};
}
if(typeof (dojo.global.curam.define)=="undefined"){
dojo.mixin(dojo.global.curam,{define:{}});
}
dojo.mixin(dojo.global.curam.define,{singleton:function(_1,_2){
var _3=_1.split(".");
var _4=window;
for(var i=0;i<_3.length;i++){
var _5=_3[i];
if(typeof _4[_5]=="undefined"){
_4[_5]={};
}
_4=_4[_5];
}
if(_2){
dojo.mixin(_4,_2);
}
}});
return dojo.global.curam.define;
});
