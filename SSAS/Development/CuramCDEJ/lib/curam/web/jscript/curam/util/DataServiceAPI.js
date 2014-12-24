//>>built
define("curam/util/DataServiceAPI",["curam/util/Request","curam/define","curam/debug","curam/util/ResourceBundle"],function(_1){
dojo.requireLocalization("curam.application","Debug");
var _2=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.DataServiceAPI",{getDataService:function(_3,_4,_5,_6,_7,_8){
var _9=curam.util.DataServiceAPI._constructPath(_3)+curam.util.DataServiceAPI._encodeParameters(_4);
curam.debug.log(_2.getProperty("curam.util.DataServiceAPI.get"));
curam.util.DataServiceAPI._doDataService("GET",_9,undefined,_5,_6,_7,_8);
},postDataService:function(_a,_b,_c,_d,_e,_f){
var _10=curam.util.DataServiceAPI._constructPath(_a);
curam.debug.log(_2.getProperty("curam.util.DataServiceAPI.post"));
curam.util.DataServiceAPI._doDataService("POST",_10,_b,_c,_d,_e,_f);
},_constructPath:function(_11){
var _12=window;
var _13=curam.util.getTopmostWindow();
return curam.util.DataServiceAPI._constructPathValue(_11,_12,_13);
},_constructPathValue:function(_14,_15,_16){
if(_14===""||typeof _14==="undefined"){
throw "Data Service: pageId must be set.";
}
var _17="";
if(_15.location.pathname===_16.location.pathname){
var _18=_16.curam&&_16.curam.config&&_16.curam.config.locale;
_17=(_18||"en")+"/";
}
return _17+_14+"Page.do";
},_encodeParameters:function(_19){
if(typeof _19==="undefined"||dojo.toJson(_19)==="{}"){
curam.debug.log(_2.getProperty("curam.util.DataServiceAPI.no.params"));
return "";
}
var _1a=[];
for(var _1b in _19){
_1a.push(_1b+"="+encodeURIComponent(_19[_1b]));
}
return "?"+_1a.join("&");
},_doDataService:function(_1c,_1d,_1e,_1f,_20,_21,_22){
if(typeof _20==="undefined"){
_20=dojo.hitch(this,this._handleDataServiceError);
}
if(typeof _21==="undefined"){
_21=dojo.hitch(this,this._handleDataServiceCallback);
}
if(typeof _1f==="undefined"||_1f==null){
_1f=dojo.hitch(this,this._handleDataServiceSuccess);
}
if(_1c==="GET"){
_1.get({url:_1d,headers:{"Content-Encoding":"UTF-8"},handleAs:(_22||"json"),load:_1f,error:_20,handle:_21});
}else{
_1.post({url:_1d,headers:{"Content-Encoding":"UTF-8"},handleAs:(_22||"json"),preventCache:true,load:_1f,error:_20,handle:_21,content:(_1e||"")});
}
},_handleDataServiceError:function(_23,_24){
var _25=_2.getProperty("curam.util.DataServiceAPI.error.1");
var _26=_2.getProperty("curam.util.DataServiceAPI.error.2");
curam.debug.log(_25+_23+_26+_24);
return "Data Service: Generic Error Handler";
},_handleDataServiceSuccess:function(_27,_28){
curam.debug.log("curam.util.DataServiceAPI._handleDataServiceSuccess : "+_27);
return "Data Service: Generic Success Handler";
},_handleDataServiceCallback:function(_29,_2a){
curam.debug.log("curam.util.DataServiceAPI._handleDataServiceCallback : "+_29);
return "Data Service: Generic Handler";
}});
return curam.util.DataServiceAPI;
});
