//>>built
define("curam/debug",["curam/define","curam/util/LocalConfig"],function(_1,_2){
_1.singleton("curam.debug",{log:function(){
if(curam.debug.enabled()){
try{
var a=arguments;
if(!dojo.isIE){
console.log.apply(console,a);
}else{
var _3=a.length;
var sa=curam.debug._serializeArgument;
switch(_3){
case 1:
console.log(arguments[0]);
break;
case 2:
console.log(a[0],sa(a[1]));
break;
case 3:
console.log(a[0],sa(a[1]),sa(a[2]));
break;
case 4:
console.log(a[0],sa(a[1]),sa(a[2]),sa(a[3]));
break;
case 5:
console.log(a[0],sa(a[1]),sa(a[2]),sa(a[3]),sa(a[4]));
break;
case 6:
console.log(a[0],sa(a[1]),sa(a[2]),sa(a[3]),sa(a[4]),sa(a[5]));
break;
default:
console.log("[Incomplete message - "+(_3-5)+" message a truncated] "+a[0],sa(a[1]),sa(a[2]),sa(a[3]),sa(a[4]),sa(a[5]));
}
}
}
catch(e){
console.log(e);
}
}
},_serializeArgument:function(_4){
if(typeof _4!="undefined"&&typeof _4.nodeType!="undefined"&&typeof _4.cloneNode!="undefined"){
return ""+_4;
}else{
if(curam.debug._isWindow(_4)){
return _4.location.href;
}else{
if(curam.debug._isArray(_4)&&curam.debug._isWindow(_4[0])){
return "[array of window objects, length "+_4.length+"]";
}else{
return dojo.toJson(_4);
}
}
}
},_isArray:function(_5){
return typeof _5!="undefined"&&(dojo.isArray(_5)||typeof _5.length!="undefined");
},_isWindow:function(_6){
var _7=typeof _6!="undefined"&&typeof _6.closed!="undefined"&&_6.closed;
if(_7){
return true;
}else{
return typeof _6!="undefined"&&typeof _6.location!="undefined"&&typeof _6.navigator!="undefined"&&typeof _6.document!="undefined"&&typeof _6.closed!="undefined";
}
},enabled:function(){
return _2.readOption("jsTraceLog","false")=="true";
},_setup:function(_8){
_2.seedOption("jsTraceLog",_8.trace,"false");
_2.seedOption("ajaxDebugMode",_8.ajaxDebug,"false");
_2.seedOption("asyncProgressMonitor",_8.asyncProgressMonitor,"false");
}});
return curam.debug;
});
