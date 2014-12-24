//>>built
define("curam/util/Request",["dojo/_base/xhr","curam/debug","curam/util/ResourceBundle","curam/util/LocalConfig"],function(_1,_2,_3,_4){
dojo.requireLocalization("curam.application","Request");
var _5=new _3("Request"),_6=null,_7=function(_8){
if(_6){
return _6(_8);
}else{
return _8.responseText.indexOf("action=\"j_security_check\"")>0;
}
},_9=function(_a,_b){
if(_7(_b.xhr)){
_2.log(_5.getProperty("sessionExpired"));
alert(_5.getProperty("sessionExpired"));
}else{
_2.log(_5.getProperty("ajaxError"));
alert(_5.getProperty("ajaxError"));
}
_2.log(_a);
_2.log("HTTP status was: "+_b.xhr.status);
},_c=function(_d,_e){
var _f=_4.readOption("ajaxDebugMode","false")=="true";
var _10=_e.error;
if(_f){
_e.error=function(err,_11){
if(_e.errorHandlerOverrideDefault!==true){
_9(err,_11);
}
if(_10){
_10(err,_11);
}
};
}
var _12=_d(_e);
return _12;
};
var _13={post:function(_14){
return _c(_1.post,_14);
},get:function(_15){
return _c(_1.get,_15);
},setLoginPageDetector:function(_16){
_6=_16;
}};
return _13;
});
