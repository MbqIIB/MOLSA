//>>built
define("curam/util/onLoad",["curam/util","curam/define","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.onLoad",{EVENT:"/curam/frame/load",publishers:[],subscribers:[],defaultGetIdFunction:function(_2){
var _3=dojo.attr(_2,"class").split(" ");
return dojo.filter(_3,function(_4){
return _4.indexOf("iframe-")==0;
})[0];
},addPublisher:function(_5){
curam.util.onLoad.publishers.push(_5);
},addSubscriber:function(_6,_7,_8){
curam.util.onLoad.subscribers.push({"getId":_8?_8:curam.util.onLoad.defaultGetIdFunction,"callback":_7,"iframeId":_6});
},removeSubscriber:function(_9,_a,_b){
curam.util.onLoad.subscribers=dojo.filter(curam.util.onLoad.subscribers,function(_c){
return !(_c.iframeId==_9&&_c.callback==_a);
});
},execute:function(){
if(window.parent==window){
curam.debug.log("curam.util.onLoad.execute(): "+_1.getProperty("curam.util.onLoad.exit"));
return;
}
var _d={};
dojo.forEach(curam.util.onLoad.publishers,function(_e){
_e(_d);
});
curam.util.onLoad.publishers=[];
require(["dojo/io/iframe"]);
var _f=dojo.io.iframe.create(null,null,"about:blank");
dojo.attr(_f,"id","ie-progress-indicator-helper");
dojo.attr(_f,"title","ie-progress-indicator-helper");
window.parent.dojo.publish(curam.util.onLoad.EVENT,[window.frameElement,_d]);
}});
curam.util.subscribe(curam.util.onLoad.EVENT,function(_10,_11){
dojo.forEach(curam.util.onLoad.subscribers,function(_12){
var _13=_12.getId(_10);
if(_12.iframeId==_13){
_12.callback(_13,_11);
}
});
});
return curam.util.onLoad;
});
