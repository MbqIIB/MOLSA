//>>built
define("curam/ui/ClientDataAccessor",["curam/util/Request","curam/debug","curam/util/ResourceBundle"],function(_1){
dojo.requireLocalization("curam.application","Debug");
var _2=new curam.util.ResourceBundle("Debug");
return dojo.declare("curam.ui.ClientDataAccessor",null,{get:function(_3,_4,_5,_6){
var _7="servlet/PathResolver"+"?p="+_3;
if(_5==undefined){
_5=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_6==undefined){
_6=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
_1.post({url:_7,headers:{"Content-Encoding":"UTF-8"},handleAs:"text",preventCache:true,load:_4,error:_5,handle:_6});
},getList:function(_8,_9,_a,_b){
var _c="servlet/PathResolver"+"?r=l&p="+_8;
if(_a==undefined){
_a=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_b==undefined){
_b=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
_1.post({url:_c,headers:{"Content-Encoding":"UTF-8"},handleAs:"json",preventCache:true,load:_9,error:_a,handle:_b});
},getRaw:function(_d,_e,_f,_10){
var _11="servlet/PathResolver"+"?r=j&p="+_d;
if(_f==undefined){
_f=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_10==undefined){
_10=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
_1.post({url:_11,headers:{"Content-Encoding":"UTF-8"},handleAs:"json",preventCache:true,load:_e,error:_f,handle:_10});
},set:function(_12,_13,_14,_15,_16){
var _17="servlet/PathResolver"+"?r=x&p="+_12+"&v="+encodeURIComponent(_13);
if(_15==undefined||_15==null){
_15=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_16==undefined||_16==null){
_16=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
if(_14==undefined||_14==null){
_14=dojo.hitch(this,this.handleClientDataAccessorSuccess);
}
_1.post({url:_17,headers:{"Content-Encoding":"UTF-8"},handleAs:"text",preventCache:true,load:_14,error:_15,handle:_16});
},handleClientDataAccessorError:function(_18,_19){
var _1a=_2.getProperty("curam.ui.ClientDataAccessor.err.1")+"PathResolverServlet : ";
var _1b=_2.getProperty("curam.ui.ClientDataAccessor.err.2");
curam.debug.log(_1a+_18+_1b+_19);
},handleClientDataAccessorSuccess:function(_1c,_1d){
curam.debug.log("curam.ui.ClientDataAccessor.handleClientDataAccessorSuccess : "+_1c);
},handleClientDataAccessorCallback:function(_1e,_1f){
curam.debug.log("curam.ui.ClientDataAccessor.handleClientDataAccessorCallback :"+" "+_2.getProperty("curam.ui.ClientDataAccessor.callback"));
}});
});
