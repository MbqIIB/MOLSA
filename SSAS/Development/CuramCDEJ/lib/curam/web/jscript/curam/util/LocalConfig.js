//>>built
define("curam/util/LocalConfig",[],function(){
var _1=function(_2){
return "curam_util_LocalConfig_"+_2;
},_3=function(_4,_5){
var _6=_1(_4);
if(typeof top[_6]==="undefined"){
top[_6]=_5;
}
return top[_6];
},_7=function(_8){
return top[_1(_8)];
};
_3("seedValues",{}),_3("overrides",{});
var _9=function(_a,_b){
if(typeof _a!=="undefined"&&typeof _a!=="string"){
throw new Error("Invalid "+_b+" type: "+typeof _a+"; expected string");
}
};
var _c={seedOption:function(_d,_e,_f){
_9(_e,"value");
_9(_f,"defaultValue");
_7("seedValues")[_d]=(typeof _e!=="undefined")?_e:_f;
},overrideOption:function(_10,_11){
_9(_11,"value");
if(typeof (Storage)!=="undefined"){
localStorage[_10]=_11;
}else{
_7("overrides")[_10]=_11;
}
},readOption:function(_12,_13){
_9(_13,"defaultValue");
var _14=null;
if(typeof (Storage)!=="undefined"&&typeof localStorage[_12]!=="undefined"){
_14=localStorage[_12];
}else{
if(typeof _7("overrides")[_12]!=="undefined"){
_14=_7("overrides")[_12];
}else{
if(typeof _7("seedValues")[_12]!=="undefined"){
_14=_7("seedValues")[_12];
}else{
_14=_13;
}
}
}
return _14;
},clearOption:function(_15){
if(typeof (Storage)!=="undefined"){
localStorage.removeItem(_15);
}
delete _7("overrides")[_15];
delete _7("seedValues")[_15];
}};
return _c;
});
