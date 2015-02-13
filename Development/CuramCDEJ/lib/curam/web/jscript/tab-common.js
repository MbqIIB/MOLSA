dojo.provide("curam.ui.ClientDataAccessor");
dojo.require("curam.debug");
dojo.require("curam.util.ResourceBundle");
var bundle=new curam.util.ResourceBundle("Debug");
dojo.declare("curam.ui.ClientDataAccessor",null,{get:function(_1,_2,_3,_4){
var _5="servlet/PathResolver"+"?p="+_1;
if(_3==undefined){
_3=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_4==undefined){
_4=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
dojo.xhrPost({url:_5,headers:{"Content-Encoding":"UTF-8"},handleAs:"text",preventCache:true,load:_2,error:_3,handle:_4});
},getList:function(_6,_7,_8,_9){
var _a="servlet/PathResolver"+"?r=l&p="+_6;
if(_8==undefined){
_8=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_9==undefined){
_9=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
dojo.xhrPost({url:_a,headers:{"Content-Encoding":"UTF-8"},handleAs:"json",preventCache:true,load:_7,error:_8,handle:_9});
},getRaw:function(_b,_c,_d,_e){
var _f="servlet/PathResolver"+"?r=j&p="+_b;
if(_d==undefined){
_d=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_e==undefined){
_e=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
dojo.xhrPost({url:_f,headers:{"Content-Encoding":"UTF-8"},handleAs:"json",preventCache:true,load:_c,error:_d,handle:_e});
},set:function(_10,_11,_12,_13,_14){
var _15="servlet/PathResolver"+"?r=x&p="+_10+"&v="+encodeURIComponent(_11);
if(_13==undefined||_13==null){
_13=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_14==undefined||_14==null){
_14=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
if(_12==undefined||_12==null){
_12=dojo.hitch(this,this.handleClientDataAccessorSuccess);
}
dojo.xhrPost({url:_15,headers:{"Content-Encoding":"UTF-8"},handleAs:"text",preventCache:true,load:_12,error:_13,handle:_14});
},handleClientDataAccessorError:function(_16,_17){
log(bundle.getProperty("tab-common.error")+" PathResolverServlet : "+_16+bundle.getProperty("tab-common.args")+" "+_17);
},handleClientDataAccessorSuccess:function(_18,_19){
log("handleClientDataAccessorSuccess : "+_18);
},handleClientDataAccessorCallback:function(_1a,_1b){
log("handleClientDataAccessorCallback : "+" "+bundle.getProperty("tab-common.nothing"));
}});

