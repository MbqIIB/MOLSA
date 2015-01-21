//>>built
require({cache:{"url:dijit/templates/TitlePane.html":"<div>\n\t<div data-dojo-attach-event=\"onclick:_onTitleClick, onkeypress:_onTitleKey\"\n\t\t\tclass=\"dijitTitlePaneTitle\" data-dojo-attach-point=\"titleBarNode\">\n\t\t<div class=\"dijitTitlePaneTitleFocus\" data-dojo-attach-point=\"focusNode\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"arrowNode\" class=\"dijitArrowNode\" role=\"presentation\"\n\t\t\t/><span data-dojo-attach-point=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span\n\t\t\t><span data-dojo-attach-point=\"titleNode\" class=\"dijitTitlePaneTextNode\"></span>\n\t\t</div>\n\t</div>\n\t<div class=\"dijitTitlePaneContentOuter\" data-dojo-attach-point=\"hideNode\" role=\"presentation\">\n\t\t<div class=\"dijitReset\" data-dojo-attach-point=\"wipeNode\" role=\"presentation\">\n\t\t\t<div class=\"dijitTitlePaneContentInner\" data-dojo-attach-point=\"containerNode\" role=\"region\" id=\"${id}_pane\">\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n","curam/date":function(){
define("curam/date",["curam/define","dojo/date","curam/date/locale","dojo/date/stamp"],function(_1,_2,_3,_4){
curam.define.singleton("curam.date",{testLocale:null,isDate:function(_5,_6){
return (curam.date.getDateFromFormat(_5,_6)!=0);
},compareDates:function(d1,_7,d2,_8){
var d1=curam.date.getDateFromFormat(d1,_7);
if(d1==0){
return -1;
}
var d2=curam.date.getDateFromFormat(d2,_8);
if(d2==0){
return -1;
}
return _2.compare(d1,d2,"date");
},formatDate:function(d,_9){
var _a=_3.format(d,{selector:"date",datePattern:_9,locale:curam.date.getLocale()});
return _a;
},getDateFromFormat:function(_b,_c){
var _d=_3.parse(_b,{selector:"date",datePattern:_c,locale:curam.date.getLocale()});
return (_d==null)?"0":_d;
},ISO8601StringToDate:function(_e){
return _4.fromISOString(_e);
},getLocale:function(){
var _f=(typeof jsL!="undefined"&&jsL)?jsL:(curam.config?curam.config.locale:null);
return _f||curam.date.testLocale||"en";
}});
return curam.date;
});
},"dojo/date":function(){
define("dojo/date",["./_base/kernel","./_base/lang"],function(_10,_11){
_11.getObject("date",true,_10);
_10.date.getDaysInMonth=function(_12){
var _13=_12.getMonth();
var _14=[31,28,31,30,31,30,31,31,30,31,30,31];
if(_13==1&&_10.date.isLeapYear(_12)){
return 29;
}
return _14[_13];
};
_10.date.isLeapYear=function(_15){
var _16=_15.getFullYear();
return !(_16%400)||(!(_16%4)&&!!(_16%100));
};
_10.date.getTimezoneName=function(_17){
var str=_17.toString();
var tz="";
var _18;
var pos=str.indexOf("(");
if(pos>-1){
tz=str.substring(++pos,str.indexOf(")"));
}else{
var pat=/([A-Z\/]+) \d{4}$/;
if((_18=str.match(pat))){
tz=_18[1];
}else{
str=_17.toLocaleString();
pat=/ ([A-Z\/]+)$/;
if((_18=str.match(pat))){
tz=_18[1];
}
}
}
return (tz=="AM"||tz=="PM")?"":tz;
};
_10.date.compare=function(_19,_1a,_1b){
_19=new Date(+_19);
_1a=new Date(+(_1a||new Date()));
if(_1b=="date"){
_19.setHours(0,0,0,0);
_1a.setHours(0,0,0,0);
}else{
if(_1b=="time"){
_19.setFullYear(0,0,0);
_1a.setFullYear(0,0,0);
}
}
if(_19>_1a){
return 1;
}
if(_19<_1a){
return -1;
}
return 0;
};
_10.date.add=function(_1c,_1d,_1e){
var sum=new Date(+_1c);
var _1f=false;
var _20="Date";
switch(_1d){
case "day":
break;
case "weekday":
var _21,_22;
var mod=_1e%5;
if(!mod){
_21=(_1e>0)?5:-5;
_22=(_1e>0)?((_1e-5)/5):((_1e+5)/5);
}else{
_21=mod;
_22=parseInt(_1e/5);
}
var _23=_1c.getDay();
var adj=0;
if(_23==6&&_1e>0){
adj=1;
}else{
if(_23==0&&_1e<0){
adj=-1;
}
}
var _24=_23+_21;
if(_24==0||_24==6){
adj=(_1e>0)?2:-2;
}
_1e=(7*_22)+_21+adj;
break;
case "year":
_20="FullYear";
_1f=true;
break;
case "week":
_1e*=7;
break;
case "quarter":
_1e*=3;
case "month":
_1f=true;
_20="Month";
break;
default:
_20="UTC"+_1d.charAt(0).toUpperCase()+_1d.substring(1)+"s";
}
if(_20){
sum["set"+_20](sum["get"+_20]()+_1e);
}
if(_1f&&(sum.getDate()<_1c.getDate())){
sum.setDate(0);
}
return sum;
};
_10.date.difference=function(_25,_26,_27){
_26=_26||new Date();
_27=_27||"day";
var _28=_26.getFullYear()-_25.getFullYear();
var _29=1;
switch(_27){
case "quarter":
var m1=_25.getMonth();
var m2=_26.getMonth();
var q1=Math.floor(m1/3)+1;
var q2=Math.floor(m2/3)+1;
q2+=(_28*4);
_29=q2-q1;
break;
case "weekday":
var _2a=Math.round(_10.date.difference(_25,_26,"day"));
var _2b=parseInt(_10.date.difference(_25,_26,"week"));
var mod=_2a%7;
if(mod==0){
_2a=_2b*5;
}else{
var adj=0;
var _2c=_25.getDay();
var _2d=_26.getDay();
_2b=parseInt(_2a/7);
mod=_2a%7;
var _2e=new Date(_25);
_2e.setDate(_2e.getDate()+(_2b*7));
var _2f=_2e.getDay();
if(_2a>0){
switch(true){
case _2c==6:
adj=-1;
break;
case _2c==0:
adj=0;
break;
case _2d==6:
adj=-1;
break;
case _2d==0:
adj=-2;
break;
case (_2f+mod)>5:
adj=-2;
}
}else{
if(_2a<0){
switch(true){
case _2c==6:
adj=0;
break;
case _2c==0:
adj=1;
break;
case _2d==6:
adj=2;
break;
case _2d==0:
adj=1;
break;
case (_2f+mod)<0:
adj=2;
}
}
}
_2a+=adj;
_2a-=(_2b*2);
}
_29=_2a;
break;
case "year":
_29=_28;
break;
case "month":
_29=(_26.getMonth()-_25.getMonth())+(_28*12);
break;
case "week":
_29=parseInt(_10.date.difference(_25,_26,"day")/7);
break;
case "day":
_29/=24;
case "hour":
_29/=60;
case "minute":
_29/=60;
case "second":
_29/=1000;
case "millisecond":
_29*=_26.getTime()-_25.getTime();
}
return Math.round(_29);
};
return _10.date;
});
},"curam/UIMController":function(){
require({cache:{"url:curam/layout/resources/UIMController.html":"<div id=\"uimcontroller_${uid}\" class=\"uimcontroller_${uid} uimController ${classList}\" data-dojo-attach-point=\"uimController\">\r\n  <div style=\"display:none;\" \r\n       id=\"uimcontroller_tc_${uid}\" \r\n       class=\"ipnTabController in-page-nav-tabContainer\"\r\n       data-dojo-attach-point=\"tabController\" \r\n       data-dojo-type=\"curam.layout.TabContainer\">\r\n  </div>\r\n  <div class=\"contentPanelFrameWrapper\"  \r\n        data-dojo-attach-point=\"frameWrapper\">\r\n    <iframe frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\"\r\n             allowTransparency=\"true\" \r\n             id=\"${iframeId}\" \r\n             data-dojo-attach-point=\"frame\"                 \r\n             class=\"${iframeId} ${iframeClassList}\"\r\n             iscpiframe=\"${iscpiframe}\"\r\n             title=\"${title}\" >\r\n    </iframe>\r\n  </div> \r\n</div>"}});
define("curam/UIMController",["dojo/text!curam/layout/resources/UIMController.html","dijit/_Widget","dijit/_Templated","dijit/layout/ContentPane","curam/tab","curam/debug","curam/util","curam/util/onLoad","curam/util/ResourceBundle"],function(_30){
dojo.requireLocalization("curam.application","Debug");
var _31=new curam.util.ResourceBundle("Debug");
var _32=dojo.declare("curam.UIMController",[dijit._Widget,dijit._Templated],{TAB_HEIGHT:20,EVENT:{TOPIC_PREFIX:"UIMController.InPageNav_"},TOPIC_LOADED:"/curam/uim/controller/loaded",frameLoadEvent:"",uid:"",url:"",tabControllerId:"",oldTabsTitlesList:[],newTabsTitlesList:[],widgetsInTemplate:true,finishedLoadingTabs:false,classList:"",iframeId:"",height:"",width:"",iframeClassList:"",iscpiframe:"false",ipnTabClickEvent:null,title:"",handleIPNTabClickListener:null,inPageNavItems:null,loadFrameOnCreate:true,resizeFrameOnLoad:false,templateString:_30,inDialog:false,constructor:function(_33){
if(!_33.uid){
throw "'uid' attribute not provided to constructor for"+" curam.UIMController(url,uid)";
}
this.uid="uimcontroller_"+_33.uid;
this.tabControllerId="uimcontroller_tc_"+_33.uid;
this.newTabsTitlesList=[];
this.ipnTabClickEvent=this.tabControllerId+"-selectChild";
if(this.height==""){
this.height="99%";
}
if(this.width==""){
this.width="99%";
}
curam.debug.log(_31.getProperty("curam.UIMController.new")+" curam.UIMController()...");
curam.debug.log("curam.UIMController "+_31.getProperty("curam.UIMController.identifier")+" "+this.uid);
curam.debug.log("curam.UIMController "+_31.getProperty("curam.UIMController.url")+" "+this.url);
curam.debug.log("curam.UIMController "+_31.getProperty("curam.UIMController.identifier")+" "+this.tabControllerId);
curam.debug.log("curam.UIMController: newTabsTitlesList "+" "+this.newTabsTitlesList);
return this.uimController;
},postCreate:function(){
this.frameLoadEvent=this.EVENT.TOPIC_PREFIX+this.frame.id;
this.setURL(this.url);
var _34=dojo.hitch(this,"processFrameLoadEvent");
curam.util.onLoad.addSubscriber(this.frame.id,_34);
dojo.connect(this,"destroy",function(){
curam.util.onLoad.removeSubscriber(this.iframeId,_34);
this.fLoadFunct=null;
});
if(this.inDialog){
dojo.style(this.frame,{width:this.width,height:this.height});
}
curam.debug.log("curam.UIMController: loadFrameOnCreate="+this.loadFrameOnCreate);
curam.debug.log("curam.UIMController "+_31.getProperty("curam.UIMController.url")+this.url);
if(this.loadFrameOnCreate==true&&typeof (this.url)!="undefined"){
curam.debug.log("curam.UIMController: "+_31.getProperty("uram.UIMController.loading"));
this.loadPage();
}
},setURL:function(url){
if(url.indexOf("Page.do")==-1){
this.absoluteURL=true;
this.url=url;
}else{
this.absoluteURL=false;
this.url=this._trimURL(url);
}
},processFrameLoadEvent:function(_35,_36){
curam.debug.log("curam.UIMController: processFrameLoadEvent "+_31.getProperty("curam.UIMController.processing.IPN")+_36);
this.inPageNavItems=_36.inPageNavItems;
curam.debug.log("curam.UIMController: processFrameLoadEvent: "+_31.getProperty("curam.UIMController.processing"));
curam.debug.log("curam.UIMController.processFrameLoadEvent: this.tabController: "+this.tabController);
if(this.resizeFrameOnLoad==true){
var _37=_36.height;
curam.debug.log(_31.getProperty("curam.UIMController.resizing")+_37);
if(_37){
dojo.style(this.getIFrame(),{height:_37+"px"});
}
}
curam.debug.log(_31.getProperty("curam.UIMController.IPN.items"),this.inPageNavItems);
if(!this.hasInPageNavigation()){
curam.debug.log(_31.getProperty("curam.UIMController.no.IPN"));
this.clearIPNTabs();
if(!this._tabControllerHidden()){
curam.debug.log(_31.getProperty("curam.UIMController.hiding"));
this.showTabContainer(false);
}
dojo.publish(this.TOPIC_LOADED);
return;
}
curam.debug.log(_31.getProperty("curam.UIMController.extract"));
var _38=-1;
for(var i=0;i<this.inPageNavItems.length;i++){
this.newTabsTitlesList.push(this.inPageNavItems[i].title);
if(this.inPageNavItems[i].selected==true){
_38=i;
}
curam.debug.log(_31.getProperty("curam.UIMController.IPN.")+"["+this.inPageNavItems[i].title+", "+this.inPageNavItems[i].href+", "+this.inPageNavItems[i].selected+"]");
}
var _39=!(this.compareLists(this.oldTabsTitlesList,this.newTabsTitlesList));
if(_39){
this.clearIPNTabs(this);
this.createIPNTabs(this.inPageNavItems);
if(this._tabControllerHidden()){
this.showTabContainer(true);
}
}else{
curam.debug.log(_31.getProperty("curam.UIMController.no.change"));
if(_38>-1){
var _3a=this.tabController.getIndexOfChild(this.tabController.selectedChildWidget);
if(_3a!=_38){
curam.debug.log(_31.getProperty("curam.UIMController.change")+_3a+_31.getProperty("curam.UIMController.to")+_38);
this.toggleIPNTabClickEventListener("off");
this.tabController.selectChild(this.tabController.getChildren()[_38]);
this.toggleIPNTabClickEventListener("on");
}
}
}
this.newTabsTitlesList=[];
curam.debug.log(_31.getProperty("curam.UIMController.clear")+this.newTabsTitlesList);
this.finishedLoadingTabs=true;
dojo.publish(this.TOPIC_LOADED);
dojo.publish("/curam/tab/labelUpdated");
},_tabControllerHidden:function(){
return dojo.style(this.tabController.domNode,"display")=="none";
},toggleIPNTabClickEventListener:function(_3b){
if(_3b=="off"){
if(this.handleIPNTabClickListener!=null){
curam.debug.log(_31.getProperty("curam.UIMController.off.listener"));
dojo.unsubscribe(this.handleIPNTabClickListener);
}
}else{
curam.debug.log(_31.getProperty("curam.UIMController.on.listener"));
this.handleIPNTabClickListener=this.subscribe(this.ipnTabClickEvent,dojo.hitch(this,this.handleIPNTabClick));
}
},handleIPNTabClick:function(tab){
if(this.finishedLoadingTabs){
curam.debug.log(_31.getProperty("curam.UIMController.finishing"));
this.finishedLoadingTabs=false;
this.setURL(this._getURLByTitle(tab.title));
this.loadPage();
}
},createIPNTabs:function(_3c){
this.toggleIPNTabClickEventListener("off");
if(!this.tabController){
console.error("curam.UIMController.createIPNTabs: "+_31.getProperty("uram.UIMController.no.widget")+" '"+this.tabControllerId+"'");
}else{
curam.debug.log("curam.UIMController.createIPNTabs: "+_31.getProperty("curam.UIMController.creating.tabs")+_3c);
var _3d=null;
for(var i=0;i<_3c.length;i++){
var cp=new dijit.layout.ContentPane({title:_3c[i].title});
this.tabController.addChild(cp);
if(_3c[i].selected==true||_3d==null){
_3d=cp;
}
this.oldTabsTitlesList.push(_3c[i].title);
curam.debug.log("curam.UIMController.createIPNTabs: "+_31.getProperty("curam.UIMController.adding.tabs")+_3c[i].title);
}
this.tabController.startup();
this.tabController.selectChild(_3d);
}
this.toggleIPNTabClickEventListener("on");
this.newTabsTitlesList=[];
},clearIPNTabs:function(){
curam.debug.log("curam.UIMController.createIPNTabs: "+_31.getProperty("curam.UIMController.clearing.tabs")+this.oldTabsTitlesList);
this.toggleIPNTabClickEventListener("off");
this.tabController.destroyDescendants();
this.tabController.selectedChildWidget=null;
this.oldTabsTitlesList=[];
this.toggleIPNTabClickEventListener("on");
curam.debug.log("curam.UIMController.createIPNTabs: "+_31.getProperty("curam.UIMController.clearing.notify")+this.oldTabsTitlesList);
},compareLists:function(_3e,_3f){
curam.debug.log("curam.UIMController.compareLists: "+_31.getProperty("curam.UIMController.comparing.tabs"));
curam.debug.log(_31.getProperty("curam.UIMController.tab.list1")+_3e);
curam.debug.log(_31.getProperty("curam.UIMController.tab.list1")+_3f);
var _40=true;
if(_3e.length!=_3f.length){
_40=false;
}
for(var i=0;i<_3e.length;i++){
if(_3e[i]!=_3f[i]){
_40=false;
}
}
curam.debug.log(_31.getProperty("curam.UIMController.result")+_40);
return _40;
},_getURLByTitle:function(_41){
var url=null;
dojo.forEach(this.inPageNavItems,function(_42){
if(_42.title==_41){
url=_42.href;
}
});
curam.debug.log(url);
return url;
},_trimURL:function(_43){
var idx=_43.lastIndexOf("/");
if(idx>-1&&idx<=_43.length){
return _43.substring(idx+1);
}else{
return _43;
}
},hasInPageNavigation:function(){
return this.inPageNavItems!=null;
},getIFrame:function(){
return this.frame;
},loadPage:function(_44){
if(typeof (this.url)=="undefined"||this.url==null){
var e=new Error("curam.UIMController: Cannot load page as URL has not been set");
if(_44){
_44.errback(e);
}
throw e;
}
if(_44){
var st=curam.util.subscribe(this.TOPIC_LOADED,function(){
curam.util.unsubscribe(st);
_44.callback();
});
}
var _45=this._getFullURL();
curam.debug.log("curam.UIMController.loadPage(): "+_31.getProperty("curam.UIMController.set.source")+this.frame.id+" to url: "+_45);
dojo.attr(this.frame,"src",_45);
},_getFullURL:function(){
if(typeof (this.absoluteURL)!="undefined"&&this.absoluteURL==true){
return this.url;
}
var _46;
if(this.url.indexOf("?")==-1){
_46="?";
}else{
_46="&";
}
var _47=curam.config?curam.config.locale:jsL;
var _48="";
if(window==curam.util.getTopmostWindow()){
_48=_47+"/";
}
if(this.url.indexOf("o3nocache=")==-1){
return _48+this.url+_46+curam.util.getCacheBusterParameter();
}else{
return _48+this.url;
}
},showTabContainer:function(_49){
if(_49&&!this.hasInPageNavigation()){
curam.debug.log(_31.getProperty("curam.UIMController.ignore.reuest"));
return;
}
dojo.style(this.frameWrapper,"top",(_49?this.TAB_HEIGHT+7:"0")+"px");
dojo.style(this.tabController.domNode,"display",_49?"block":"none");
if(_49){
this.tabController.resize();
}
},setDimensionsForModalDialog:function(w,h,_4a){
curam.debug.log("curam.UIMController:setDimensionsForModalDialog() - "+"w="+w+", h="+h);
dojo.style(this.frame,{width:w+"px",height:h+"px"});
dojo.style(this.tabController.domNode,{width:w+"px"});
if(typeof (_4a.inPageNavItems)!="undefined"){
h+=this.TAB_HEIGHT+5;
curam.debug.log("cura.UIMController:setDimensionsForModalDialog() - "+_31.getProperty("curam.UIMController.height"));
}
dojo.style(this.domNode,{width:w+"px",height:h+"px"});
},destroy:function(){
this.iframe=null;
this.inPageNavItems=null;
dojo.unsubscribe(this.handleIPNTabClickListener);
this.tabController.destroy();
this.inherited(arguments);
}});
return _32;
});
},"dojox/storage/WhatWGStorageProvider":function(){
define("dojox/storage/WhatWGStorageProvider",["dijit","dojo","dojox","dojo/require!dojox/storage/Provider,dojox/storage/manager"],function(_4b,_4c,_4d){
_4c.provide("dojox.storage.WhatWGStorageProvider");
_4c.require("dojox.storage.Provider");
_4c.require("dojox.storage.manager");
_4c.declare("dojox.storage.WhatWGStorageProvider",[_4d.storage.Provider],{initialized:false,_domain:null,_available:null,_statusHandler:null,_allNamespaces:null,_storageEventListener:null,initialize:function(){
if(_4c.config["disableWhatWGStorage"]==true){
return;
}
this._domain=location.hostname;
this.initialized=true;
_4d.storage.manager.loaded();
},isAvailable:function(){
try{
var _4e=globalStorage[location.hostname];
}
catch(e){
this._available=false;
return this._available;
}
this._available=true;
return this._available;
},put:function(key,_4f,_50,_51){
if(this.isValidKey(key)==false){
throw new Error("Invalid key given: "+key);
}
_51=_51||this.DEFAULT_NAMESPACE;
key=this.getFullKey(key,_51);
this._statusHandler=_50;
if(_4c.isString(_4f)){
_4f="string:"+_4f;
}else{
_4f=_4c.toJson(_4f);
}
var _52=_4c.hitch(this,function(evt){
window.removeEventListener("storage",_52,false);
if(_50){
_50.call(null,this.SUCCESS,key,null,_51);
}
});
window.addEventListener("storage",_52,false);
try{
var _53=globalStorage[this._domain];
_53.setItem(key,_4f);
}
catch(e){
this._statusHandler.call(null,this.FAILED,key,e.toString(),_51);
}
},get:function(key,_54){
if(this.isValidKey(key)==false){
throw new Error("Invalid key given: "+key);
}
_54=_54||this.DEFAULT_NAMESPACE;
key=this.getFullKey(key,_54);
var _55=globalStorage[this._domain];
var _56=_55.getItem(key);
if(_56==null||_56==""){
return null;
}
_56=_56.value;
if(_4c.isString(_56)&&(/^string:/.test(_56))){
_56=_56.substring("string:".length);
}else{
_56=_4c.fromJson(_56);
}
return _56;
},getNamespaces:function(){
var _57=[this.DEFAULT_NAMESPACE];
var _58={};
var _59=globalStorage[this._domain];
var _5a=/^__([^_]*)_/;
for(var i=0;i<_59.length;i++){
var _5b=_59.key(i);
if(_5a.test(_5b)==true){
var _5c=_5b.match(_5a)[1];
if(typeof _58[_5c]=="undefined"){
_58[_5c]=true;
_57.push(_5c);
}
}
}
return _57;
},getKeys:function(_5d){
_5d=_5d||this.DEFAULT_NAMESPACE;
if(this.isValidKey(_5d)==false){
throw new Error("Invalid namespace given: "+_5d);
}
var _5e;
if(_5d==this.DEFAULT_NAMESPACE){
_5e=new RegExp("^([^_]{2}.*)$");
}else{
_5e=new RegExp("^__"+_5d+"_(.*)$");
}
var _5f=globalStorage[this._domain];
var _60=[];
for(var i=0;i<_5f.length;i++){
var _61=_5f.key(i);
if(_5e.test(_61)==true){
_61=_61.match(_5e)[1];
_60.push(_61);
}
}
return _60;
},clear:function(_62){
_62=_62||this.DEFAULT_NAMESPACE;
if(this.isValidKey(_62)==false){
throw new Error("Invalid namespace given: "+_62);
}
var _63;
if(_62==this.DEFAULT_NAMESPACE){
_63=new RegExp("^[^_]{2}");
}else{
_63=new RegExp("^__"+_62+"_");
}
var _64=globalStorage[this._domain];
var _65=[];
for(var i=0;i<_64.length;i++){
if(_63.test(_64.key(i))==true){
_65[_65.length]=_64.key(i);
}
}
_4c.forEach(_65,_4c.hitch(_64,"removeItem"));
},remove:function(key,_66){
key=this.getFullKey(key,_66);
var _67=globalStorage[this._domain];
_67.removeItem(key);
},isPermanent:function(){
return true;
},getMaximumSize:function(){
return this.SIZE_NO_LIMIT;
},hasSettingsUI:function(){
return false;
},showSettingsUI:function(){
throw new Error(this.declaredClass+" does not support a storage settings user-interface");
},hideSettingsUI:function(){
throw new Error(this.declaredClass+" does not support a storage settings user-interface");
},getFullKey:function(key,_68){
_68=_68||this.DEFAULT_NAMESPACE;
if(this.isValidKey(_68)==false){
throw new Error("Invalid namespace given: "+_68);
}
if(_68==this.DEFAULT_NAMESPACE){
return key;
}else{
return "__"+_68+"_"+key;
}
}});
_4d.storage.manager.register("dojox.storage.WhatWGStorageProvider",new _4d.storage.WhatWGStorageProvider());
});
},"curam/ajax":function(){
define("curam/ajax",["curam/util/Request"],function(_69){
var _6a=function(_6b,_6c){
this.target=_6b;
this.inputProvider=_6c||"null";
};
var _6d={doRequest:function(_6e,_6f,_70,_71){
var _72="../servlet/JSONServlet";
var _73=this;
if(_70){
_72="../"+_72;
}
var _74={caller:this.target.id,operation:_6e,inputProvider:this.inputProvider,args:_6f};
function _75(_76,_77){
_76=dojo.fromJson(_76);
if(_76 instanceof Array){
if(_76.length>1){
if(_77=="getCodeTableSubset"){
_73.fillCTWithBlank(_76);
}else{
_73.fillCT(_76);
}
}else{
if(_77=="getCodeTableSubset"){
_73.fillCTWithBlank(_76);
}else{
_73.fillSingle(_76,true);
}
}
}else{
_73.fillSingle(_76);
}
};
_69.post({url:_72,handleAs:"text",load:function(_78,evt){
_75(_78,_6e);
},error:function(){
alert("error");
},content:{"content":dojo.toJson(_74)},preventCache:true,sync:_71});
},fillCT:function(_79){
this.target.options.length=0;
for(var i=0;i<_79.length;i++){
this.target.options[i]=new Option(_79[i]["descr"],_79[i]["code"],_79[i]["default"]);
}
},fillCTWithBlank:function(_7a){
this.target.options.length=0;
this.target.options[0]=new Option("");
for(var i=0;i<_7a.length;i++){
this.target.options[i+1]=new Option(_7a[i]["descr"],_7a[i]["code"]);
}
},fillSingle:function(_7b,_7c){
if(_7c){
this.target.value=_7b[0]["value"];
}else{
this.target.value=_7b["value"];
}
}};
dojo.mixin(_6a.prototype,_6d);
dojo.global.AJAXCall=_6a;
return _6a;
});
},"curam/util/Request":function(){
define("curam/util/Request",["dojo/_base/xhr","curam/debug","curam/util/ResourceBundle","curam/util/LocalConfig"],function(xhr,_7d,_7e,_7f){
dojo.requireLocalization("curam.application","Request");
var _80=new _7e("Request"),_81=null,_82=function(_83){
if(_81){
return _81(_83);
}else{
return _83.responseText.indexOf("action=\"j_security_check\"")>0;
}
},_84=function(err,_85){
if(_82(_85.xhr)){
_7d.log(_80.getProperty("sessionExpired"));
alert(_80.getProperty("sessionExpired"));
}else{
_7d.log(_80.getProperty("ajaxError"));
alert(_80.getProperty("ajaxError"));
}
_7d.log(err);
_7d.log("HTTP status was: "+_85.xhr.status);
},_86=function(_87,_88){
var _89=_7f.readOption("ajaxDebugMode","false")=="true";
var _8a=_88.error;
if(_89){
_88.error=function(err,_8b){
if(_88.errorHandlerOverrideDefault!==true){
_84(err,_8b);
}
if(_8a){
_8a(err,_8b);
}
};
}
var _8c=_87(_88);
return _8c;
};
var _8d={post:function(_8e){
return _86(xhr.post,_8e);
},get:function(_8f){
return _86(xhr.get,_8f);
},setLoginPageDetector:function(_90){
_81=_90;
}};
return _8d;
});
},"curam/widget/DropDownButton":function(){
require({cache:{"url:curam/widget/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n"}});
define("curam/widget/DropDownButton",["dojo/text!curam/widget/templates/DropDownButton.html","dijit/form/DropDownButton"],function(_91){
var _92=dojo.declare("curam.widget.DropDownButton",dijit.form.DropDownButton,{templateString:_91});
return _92;
});
},"cm/_base/_form":function(){
define("cm/_base/_form",[],function(){
var cm=dojo.global.cm||{};
dojo.global.cm=cm;
dojo.mixin(cm,{checkAll:function(_93,_94){
cm.query("input[type='checkbox']",_94).forEach("item.checked = "+(_93?"true":"false"));
},setFormSubmitted:function(_95,_96){
_95._alreadySubmitted=_96;
},wasFormSubmitted:function(_97){
return _97._alreadySubmitted;
},getFormItems:function(){
if(cm._formItems){
return cm._formItems;
}
var _98=dojo.query("input[name='__o3fmeta']");
var _99=_98.length>0?dojo.fromJson(_98[0].value):{};
var _9a=[];
for(var x in _99){
_9a.push(x);
}
cm._formItems=new function(){
this.length=function(){
return _9a.length;
};
this.getNames=function(){
return _9a;
};
this.getInputs=function(_9b){
var _9c=[];
dojo.forEach(_9a,function(_9d,_9e){
if(!_9b||this.isMandatory(_9e)){
_9c.push("[name='"+_9d+"']");
}
},this);
return _9c.length>0?dojo.query(_9c.join(",")):[];
};
function fn(_9f){
return function(_a0){
var d=_99[dojo.isString(_a0)?_a0:_9a[_a0]];
return d?d[_9f]:null;
};
};
this.getTargetPath=fn(0);
this.getLabel=fn(1);
this.getDomain=fn(2);
this.isMandatory=fn(3);
};
return cm._formItems;
}});
return cm;
});
},"dijit/MenuBar":function(){
require({cache:{"url:dijit/templates/MenuBar.html":"<div class=\"dijitMenuBar dijitMenuPassive\" data-dojo-attach-point=\"containerNode\"  role=\"menubar\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress: _onKeyPress\"></div>\n"}});
define("dijit/MenuBar",["dojo/_base/declare","dojo/_base/event","dojo/keys","./_MenuBase","dojo/text!./templates/MenuBar.html"],function(_a1,_a2,_a3,_a4,_a5){
return _a1("dijit.MenuBar",_a4,{templateString:_a5,baseClass:"dijitMenuBar",_isMenuBar:true,postCreate:function(){
var l=this.isLeftToRight();
this.connectKeyNavHandlers(l?[_a3.LEFT_ARROW]:[_a3.RIGHT_ARROW],l?[_a3.RIGHT_ARROW]:[_a3.LEFT_ARROW]);
this._orient=["below"];
},focusChild:function(_a6){
var _a7=this.focusedChild,_a8=_a7&&_a7.popup&&_a7.popup.isShowingNow;
this.inherited(arguments);
if(_a8&&_a6.popup&&!_a6.disabled){
this._openPopup();
}
},_onKeyPress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
switch(evt.charOrCode){
case _a3.DOWN_ARROW:
this._moveToPopup(evt);
_a2.stop(evt);
}
},onItemClick:function(_a9,evt){
if(_a9.popup&&_a9.popup.isShowingNow){
_a9.popup.onCancel();
}else{
this.inherited(arguments);
}
}});
});
},"url:curam/widget/templates/_TabButton.html":"<div role=\"presentation\" data-dojo-attach-point=\"titleNode\" data-dojo-attach-event='onclick:onClick' class='dijitTab'>\r\n    <div role=\"presentation\" class='dijitTabInnerDiv' data-dojo-attach-point='innerDiv'>\r\n        <div role=\"presentation\" class='dijitTabContent' data-dojo-attach-point='tabContent'>\r\n          <div role=\"presentation\" aria-labelledby='${id}_tabLabel'>\r\n            <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" data-dojo-attach-point='iconNode' />\r\n            <span data-dojo-attach-point='containerNode,focusNode' class='tabLabel' id='${id}_tabLabel'></span>\r\n            <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\r\n                data-dojo-attach-event='onclick: onClickCloseButton' role=\"presentation\">\r\n                <span data-dojo-attach-point='closeText' class='dijitTabCloseText'>Close Tab</span\r\n            ></span>\r\n      </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n","dijit/Dialog":function(){
require({cache:{"url:dijit/templates/Dialog.html":"<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span>\n\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabIndex=\"-1\">\n\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t</span>\n\t</div>\n\t\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n"}});
define("dijit/Dialog",["require","dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/_base/fx","dojo/i18n","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/ready","dojo/_base/sniff","dojo/_base/window","dojo/window","dojo/dnd/Moveable","dojo/dnd/TimedMoveable","./focus","./_base/manager","./_Widget","./_TemplatedMixin","./_CssStateMixin","./form/_FormMixin","./_DialogMixin","./DialogUnderlay","./layout/ContentPane","dojo/text!./templates/Dialog.html",".","dojo/i18n!./nls/common"],function(_aa,_ab,_ac,_ad,_ae,dom,_af,_b0,_b1,_b2,fx,_b3,_b4,_b5,_b6,on,_b7,has,win,_b8,_b9,_ba,_bb,_bc,_bd,_be,_bf,_c0,_c1,_c2,_c3,_c4,_c5){
var _c6=_ad("dijit._DialogBase",[_be,_c0,_c1,_bf],{templateString:_c4,baseClass:"dijitDialog",cssStateNodes:{closeButtonNode:"dijitDialogCloseIcon"},_setTitleAttr:[{node:"titleNode",type:"innerHTML"},{node:"titleBar",type:"attribute"}],open:false,duration:_bc.defaultDuration,refocus:true,autofocus:true,_firstFocusItem:null,_lastFocusItem:null,doLayout:false,draggable:true,"aria-describedby":"",postMixInProperties:function(){
var _c7=_b3.getLocalization("dijit","common");
_b6.mixin(this,_c7);
this.inherited(arguments);
},postCreate:function(){
_b1.set(this.domNode,{display:"none",position:"absolute"});
win.body().appendChild(this.domNode);
this.inherited(arguments);
this.connect(this,"onExecute","hide");
this.connect(this,"onCancel","hide");
this._modalconnects=[];
},onLoad:function(){
this._position();
if(this.autofocus&&_c8.isTop(this)){
this._getFocusItems(this.domNode);
_bb.focus(this._firstFocusItem);
}
this.inherited(arguments);
},_endDrag:function(){
var _c9=_b0.position(this.domNode),_ca=_b8.getBox();
_c9.y=Math.min(Math.max(_c9.y,0),(_ca.h-_c9.h));
_c9.x=Math.min(Math.max(_c9.x,0),(_ca.w-_c9.w));
this._relativePosition=_c9;
this._position();
},_setup:function(){
var _cb=this.domNode;
if(this.titleBar&&this.draggable){
this._moveable=new ((has("ie")==6)?_ba:_b9)(_cb,{handle:this.titleBar});
this.connect(this._moveable,"onMoveStop","_endDrag");
}else{
_af.add(_cb,"dijitDialogFixed");
}
this.underlayAttrs={dialogId:this.id,"class":_ab.map(this["class"].split(/\s/),function(s){
return s+"_underlay";
}).join(" ")};
},_size:function(){
this._checkIfSingleChild();
if(this._singleChild){
if(this._singleChildOriginalStyle){
this._singleChild.domNode.style.cssText=this._singleChildOriginalStyle;
}
delete this._singleChildOriginalStyle;
}else{
_b1.set(this.containerNode,{width:"auto",height:"auto"});
}
var bb=_b0.position(this.domNode);
var _cc=_b8.getBox();
if(bb.w>=_cc.w||bb.h>=_cc.h){
var w=Math.min(bb.w,Math.floor(_cc.w*0.75)),h=Math.min(bb.h,Math.floor(_cc.h*0.75));
if(this._singleChild&&this._singleChild.resize){
this._singleChildOriginalStyle=this._singleChild.domNode.style.cssText;
this._singleChild.resize({w:w,h:h});
}else{
_b1.set(this.containerNode,{width:w+"px",height:h+"px",overflow:"auto",position:"relative"});
}
}else{
if(this._singleChild&&this._singleChild.resize){
this._singleChild.resize();
}
}
},_position:function(){
if(!_af.contains(win.body(),"dojoMove")){
var _cd=this.domNode,_ce=_b8.getBox(),p=this._relativePosition,bb=p?null:_b0.position(_cd),l=Math.floor(_ce.l+(p?p.x:(_ce.w-bb.w)/2)),t=Math.floor(_ce.t+(p?p.y:(_ce.h-bb.h)/2));
_b1.set(_cd,{left:l+"px",top:t+"px"});
}
},_onKey:function(evt){
if(evt.charOrCode){
var _cf=evt.target;
if(evt.charOrCode===_b5.TAB){
this._getFocusItems(this.domNode);
}
var _d0=(this._firstFocusItem==this._lastFocusItem);
if(_cf==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===_b5.TAB){
if(!_d0){
_bb.focus(this._lastFocusItem);
}
_b2.stop(evt);
}else{
if(_cf==this._lastFocusItem&&evt.charOrCode===_b5.TAB&&!evt.shiftKey){
if(!_d0){
_bb.focus(this._firstFocusItem);
}
_b2.stop(evt);
}else{
while(_cf){
if(_cf==this.domNode||_af.contains(_cf,"dijitPopup")){
if(evt.charOrCode==_b5.ESCAPE){
this.onCancel();
}else{
return;
}
}
_cf=_cf.parentNode;
}
if(evt.charOrCode!==_b5.TAB){
_b2.stop(evt);
}else{
if(!has("opera")){
try{
this._firstFocusItem.focus();
}
catch(e){
}
}
}
}
}
}
},show:function(){
if(this.open){
return;
}
if(!this._started){
this.startup();
}
if(!this._alreadyInitialized){
this._setup();
this._alreadyInitialized=true;
}
if(this._fadeOutDeferred){
this._fadeOutDeferred.cancel();
}
if(!has("touch")){
this._modalconnects.push(on(window,"scroll",_b6.hitch(this,"layout")));
this._modalconnects.push(on(window,"resize",_b6.hitch(this,function(){
var _d1=_b8.getBox();
if(!this._oldViewport||_d1.h!=this._oldViewport.h||_d1.w!=this._oldViewport.w){
this.layout();
this._oldViewport=_d1;
}
})));
}
this._modalconnects.push(on(this.domNode,_ac._keypress,_b6.hitch(this,"_onKey")));
_b1.set(this.domNode,{opacity:0,display:""});
this._set("open",true);
this._onShow();
this._size();
this._position();
var _d2;
this._fadeInDeferred=new _ae(_b6.hitch(this,function(){
_d2.stop();
delete this._fadeInDeferred;
}));
_d2=fx.fadeIn({node:this.domNode,duration:this.duration,beforeBegin:_b6.hitch(this,function(){
_c8.show(this,this.underlayAttrs);
}),onEnd:_b6.hitch(this,function(){
if(this.autofocus&&_c8.isTop(this)){
this._getFocusItems(this.domNode);
_bb.focus(this._firstFocusItem);
}
this._fadeInDeferred.callback(true);
delete this._fadeInDeferred;
})}).play();
return this._fadeInDeferred;
},hide:function(){
if(!this._alreadyInitialized){
return;
}
if(this._fadeInDeferred){
this._fadeInDeferred.cancel();
}
var _d3;
this._fadeOutDeferred=new _ae(_b6.hitch(this,function(){
_d3.stop();
delete this._fadeOutDeferred;
}));
this._fadeOutDeferred.then(_b6.hitch(this,"onHide"));
_d3=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:_b6.hitch(this,function(){
this.domNode.style.display="none";
_c8.hide(this);
this._fadeOutDeferred.callback(true);
delete this._fadeOutDeferred;
})}).play();
if(this._scrollConnected){
this._scrollConnected=false;
}
var h;
while(h=this._modalconnects.pop()){
h.remove();
}
if(this._relativePosition){
delete this._relativePosition;
}
this._set("open",false);
return this._fadeOutDeferred;
},layout:function(){
if(this.domNode.style.display!="none"){
if(_c5._underlay){
_c5._underlay.layout();
}
this._position();
}
},destroy:function(){
if(this._fadeInDeferred){
this._fadeInDeferred.cancel();
}
if(this._fadeOutDeferred){
this._fadeOutDeferred.cancel();
}
if(this._moveable){
this._moveable.destroy();
}
var h;
while(h=this._modalconnects.pop()){
h.remove();
}
_c8.hide(this);
this.inherited(arguments);
}});
var _d4=_ad("dijit.Dialog",[_c3,_c6],{});
_d4._DialogBase=_c6;
var _c8=_d4._DialogLevelManager={_beginZIndex:950,show:function(_d5,_d6){
ds[ds.length-1].focus=_bb.curNode;
var _d7=_c5._underlay;
if(!_d7||_d7._destroyed){
_d7=_c5._underlay=new _c2(_d6);
}else{
_d7.set(_d5.underlayAttrs);
}
var _d8=ds[ds.length-1].dialog?ds[ds.length-1].zIndex+2:_d4._DialogLevelManager._beginZIndex;
if(ds.length==1){
_d7.show();
}
_b1.set(_c5._underlay.domNode,"zIndex",_d8-1);
_b1.set(_d5.domNode,"zIndex",_d8);
ds.push({dialog:_d5,underlayAttrs:_d6,zIndex:_d8});
},hide:function(_d9){
if(ds[ds.length-1].dialog==_d9){
ds.pop();
var pd=ds[ds.length-1];
if(ds.length==1){
if(!_c5._underlay._destroyed){
_c5._underlay.hide();
}
}else{
_b1.set(_c5._underlay.domNode,"zIndex",pd.zIndex-1);
_c5._underlay.set(pd.underlayAttrs);
}
if(_d9.refocus){
var _da=pd.focus;
if(pd.dialog&&(!_da||!dom.isDescendant(_da,pd.dialog.domNode))){
pd.dialog._getFocusItems(pd.dialog.domNode);
_da=pd.dialog._firstFocusItem;
}
if(_da){
try{
_da.focus();
}
catch(e){
}
}
}
}else{
var idx=_ab.indexOf(_ab.map(ds,function(_db){
return _db.dialog;
}),_d9);
if(idx!=-1){
ds.splice(idx,1);
}
}
},isTop:function(_dc){
return ds[ds.length-1].dialog==_dc;
}};
var ds=_d4._dialogStack=[{dialog:null,focus:null,underlayAttrs:null}];
if(!_b4.isAsync){
_b7(0,function(){
var _dd=["dijit/TooltipDialog"];
_aa(_dd);
});
}
return _d4;
});
},"dojo/date/locale":function(){
define("dojo/date/locale",["../_base/kernel","../_base/lang","../_base/array","../date","../cldr/supplemental","../regexp","../string","../i18n!../cldr/nls/gregorian"],function(_de,_df,_e0,_e1,_e2,_e3,_e4,_e5){
_df.getObject("date.locale",true,_de);
function _e6(_e7,_e8,_e9,_ea){
return _ea.replace(/([a-z])\1*/ig,function(_eb){
var s,pad,c=_eb.charAt(0),l=_eb.length,_ec=["abbr","wide","narrow"];
switch(c){
case "G":
s=_e8[(l<4)?"eraAbbr":"eraNames"][_e7.getFullYear()<0?0:1];
break;
case "y":
s=_e7.getFullYear();
switch(l){
case 1:
break;
case 2:
if(!_e9.fullYear){
s=String(s);
s=s.substr(s.length-2);
break;
}
default:
pad=true;
}
break;
case "Q":
case "q":
s=Math.ceil((_e7.getMonth()+1)/3);
pad=true;
break;
case "M":
var m=_e7.getMonth();
if(l<3){
s=m+1;
pad=true;
}else{
var _ed=["months","format",_ec[l-3]].join("-");
s=_e8[_ed][m];
}
break;
case "w":
var _ee=0;
s=_de.date.locale._getWeekOfYear(_e7,_ee);
pad=true;
break;
case "d":
s=_e7.getDate();
pad=true;
break;
case "D":
s=_de.date.locale._getDayOfYear(_e7);
pad=true;
break;
case "E":
var d=_e7.getDay();
if(l<3){
s=d+1;
pad=true;
}else{
var _ef=["days","format",_ec[l-3]].join("-");
s=_e8[_ef][d];
}
break;
case "a":
var _f0=(_e7.getHours()<12)?"am":"pm";
s=_e9[_f0]||_e8["dayPeriods-format-wide-"+_f0];
break;
case "h":
case "H":
case "K":
case "k":
var h=_e7.getHours();
switch(c){
case "h":
s=(h%12)||12;
break;
case "H":
s=h;
break;
case "K":
s=(h%12);
break;
case "k":
s=h||24;
break;
}
pad=true;
break;
case "m":
s=_e7.getMinutes();
pad=true;
break;
case "s":
s=_e7.getSeconds();
pad=true;
break;
case "S":
s=Math.round(_e7.getMilliseconds()*Math.pow(10,l-3));
pad=true;
break;
case "v":
case "z":
s=_de.date.locale._getZone(_e7,true,_e9);
if(s){
break;
}
l=4;
case "Z":
var _f1=_de.date.locale._getZone(_e7,false,_e9);
var tz=[(_f1<=0?"+":"-"),_e4.pad(Math.floor(Math.abs(_f1)/60),2),_e4.pad(Math.abs(_f1)%60,2)];
if(l==4){
tz.splice(0,0,"GMT");
tz.splice(3,0,":");
}
s=tz.join("");
break;
default:
throw new Error("dojo.date.locale.format: invalid pattern char: "+_ea);
}
if(pad){
s=_e4.pad(s,l);
}
return s;
});
};
_de.date.locale._getZone=function(_f2,_f3,_f4){
if(_f3){
return _e1.getTimezoneName(_f2);
}else{
return _f2.getTimezoneOffset();
}
};
_de.date.locale.format=function(_f5,_f6){
_f6=_f6||{};
var _f7=_de.i18n.normalizeLocale(_f6.locale),_f8=_f6.formatLength||"short",_f9=_de.date.locale._getGregorianBundle(_f7),str=[],_fa=_df.hitch(this,_e6,_f5,_f9,_f6);
if(_f6.selector=="year"){
return _fb(_f9["dateFormatItem-yyyy"]||"yyyy",_fa);
}
var _fc;
if(_f6.selector!="date"){
_fc=_f6.timePattern||_f9["timeFormat-"+_f8];
if(_fc){
str.push(_fb(_fc,_fa));
}
}
if(_f6.selector!="time"){
_fc=_f6.datePattern||_f9["dateFormat-"+_f8];
if(_fc){
str.push(_fb(_fc,_fa));
}
}
return str.length==1?str[0]:_f9["dateTimeFormat-"+_f8].replace(/\{(\d+)\}/g,function(_fd,key){
return str[key];
});
};
_de.date.locale.regexp=function(_fe){
return _de.date.locale._parseInfo(_fe).regexp;
};
_de.date.locale._parseInfo=function(_ff){
_ff=_ff||{};
var _100=_de.i18n.normalizeLocale(_ff.locale),_101=_de.date.locale._getGregorianBundle(_100),_102=_ff.formatLength||"short",_103=_ff.datePattern||_101["dateFormat-"+_102],_104=_ff.timePattern||_101["timeFormat-"+_102],_105;
if(_ff.selector=="date"){
_105=_103;
}else{
if(_ff.selector=="time"){
_105=_104;
}else{
_105=_101["dateTimeFormat-"+_102].replace(/\{(\d+)\}/g,function(_106,key){
return [_104,_103][key];
});
}
}
var _107=[],re=_fb(_105,_df.hitch(this,_108,_107,_101,_ff));
return {regexp:re,tokens:_107,bundle:_101};
};
_de.date.locale.parse=function(_109,_10a){
var _10b=/[\u200E\u200F\u202A\u202E]/g,info=_de.date.locale._parseInfo(_10a),_10c=info.tokens,_10d=info.bundle,re=new RegExp("^"+info.regexp.replace(_10b,"")+"$",info.strict?"":"i"),_10e=re.exec(_109&&_109.replace(_10b,""));
if(!_10e){
return null;
}
var _10f=["abbr","wide","narrow"],_110=[1970,0,1,0,0,0,0],amPm="",_111=_de.every(_10e,function(v,i){
if(!i){
return true;
}
var _112=_10c[i-1];
var l=_112.length;
switch(_112.charAt(0)){
case "y":
if(l!=2&&_10a.strict){
_110[0]=v;
}else{
if(v<100){
v=Number(v);
var year=""+new Date().getFullYear(),_113=year.substring(0,2)*100,_114=Math.min(Number(year.substring(2,4))+20,99);
_110[0]=(v<_114)?_113+v:_113-100+v;
}else{
if(_10a.strict){
return false;
}
_110[0]=v;
}
}
break;
case "M":
if(l>2){
var _115=_10d["months-format-"+_10f[l-3]].concat();
if(!_10a.strict){
v=v.replace(".","").toLowerCase();
_115=_de.map(_115,function(s){
return s.replace(".","").toLowerCase();
});
}
v=_de.indexOf(_115,v);
if(v==-1){
return false;
}
}else{
v--;
}
_110[1]=v;
break;
case "E":
case "e":
var days=_10d["days-format-"+_10f[l-3]].concat();
if(!_10a.strict){
v=v.toLowerCase();
days=_de.map(days,function(d){
return d.toLowerCase();
});
}
v=_de.indexOf(days,v);
if(v==-1){
return false;
}
break;
case "D":
_110[1]=0;
case "d":
_110[2]=v;
break;
case "a":
var am=_10a.am||_10d["dayPeriods-format-wide-am"],pm=_10a.pm||_10d["dayPeriods-format-wide-pm"];
if(!_10a.strict){
var _116=/\./g;
v=v.replace(_116,"").toLowerCase();
am=am.replace(_116,"").toLowerCase();
pm=pm.replace(_116,"").toLowerCase();
}
if(_10a.strict&&v!=am&&v!=pm){
return false;
}
amPm=(v==pm)?"p":(v==am)?"a":"";
break;
case "K":
if(v==24){
v=0;
}
case "h":
case "H":
case "k":
if(v>23){
return false;
}
_110[3]=v;
break;
case "m":
_110[4]=v;
break;
case "s":
_110[5]=v;
break;
case "S":
_110[6]=v;
}
return true;
});
var _117=+_110[3];
if(amPm==="p"&&_117<12){
_110[3]=_117+12;
}else{
if(amPm==="a"&&_117==12){
_110[3]=0;
}
}
var _118=new Date(_110[0],_110[1],_110[2],_110[3],_110[4],_110[5],_110[6]);
if(_10a.strict){
_118.setFullYear(_110[0]);
}
var _119=_10c.join(""),_11a=_119.indexOf("d")!=-1,_11b=_119.indexOf("M")!=-1;
if(!_111||(_11b&&_118.getMonth()>_110[1])||(_11a&&_118.getDate()>_110[2])){
return null;
}
if((_11b&&_118.getMonth()<_110[1])||(_11a&&_118.getDate()<_110[2])){
_118=_e1.add(_118,"hour",1);
}
return _118;
};
function _fb(_11c,_11d,_11e,_11f){
var _120=function(x){
return x;
};
_11d=_11d||_120;
_11e=_11e||_120;
_11f=_11f||_120;
var _121=_11c.match(/(''|[^'])+/g),_122=_11c.charAt(0)=="'";
_de.forEach(_121,function(_123,i){
if(!_123){
_121[i]="";
}else{
_121[i]=(_122?_11e:_11d)(_123.replace(/''/g,"'"));
_122=!_122;
}
});
return _11f(_121.join(""));
};
function _108(_124,_125,_126,_127){
_127=_e3.escapeString(_127);
if(!_126.strict){
_127=_127.replace(" a"," ?a");
}
return _127.replace(/([a-z])\1*/ig,function(_128){
var s,c=_128.charAt(0),l=_128.length,p2="",p3="";
if(_126.strict){
if(l>1){
p2="0"+"{"+(l-1)+"}";
}
if(l>2){
p3="0"+"{"+(l-2)+"}";
}
}else{
p2="0?";
p3="0{0,2}";
}
switch(c){
case "y":
s="\\d{2,4}";
break;
case "M":
s=(l>2)?"\\S+?":"1[0-2]|"+p2+"[1-9]";
break;
case "D":
s="[12][0-9][0-9]|3[0-5][0-9]|36[0-6]|"+p2+"[1-9][0-9]|"+p3+"[1-9]";
break;
case "d":
s="3[01]|[12]\\d|"+p2+"[1-9]";
break;
case "w":
s="[1-4][0-9]|5[0-3]|"+p2+"[1-9]";
break;
case "E":
s="\\S+";
break;
case "h":
s="1[0-2]|"+p2+"[1-9]";
break;
case "k":
s="1[01]|"+p2+"\\d";
break;
case "H":
s="1\\d|2[0-3]|"+p2+"\\d";
break;
case "K":
s="1\\d|2[0-4]|"+p2+"[1-9]";
break;
case "m":
case "s":
s="[0-5]\\d";
break;
case "S":
s="\\d{"+l+"}";
break;
case "a":
var am=_126.am||_125["dayPeriods-format-wide-am"],pm=_126.pm||_125["dayPeriods-format-wide-pm"];
s=am+"|"+pm;
if(!_126.strict){
if(am!=am.toLowerCase()){
s+="|"+am.toLowerCase();
}
if(pm!=pm.toLowerCase()){
s+="|"+pm.toLowerCase();
}
if(s.indexOf(".")!=-1){
s+="|"+s.replace(/\./g,"");
}
}
s=s.replace(/\./g,"\\.");
break;
default:
s=".*";
}
if(_124){
_124.push(_128);
}
return "("+s+")";
}).replace(/[\xa0 ]/g,"[\\s\\xa0]");
};
var _129=[];
_de.date.locale.addCustomFormats=function(_12a,_12b){
_129.push({pkg:_12a,name:_12b});
};
_de.date.locale._getGregorianBundle=function(_12c){
var _12d={};
_de.forEach(_129,function(desc){
var _12e=_de.i18n.getLocalization(desc.pkg,desc.name,_12c);
_12d=_df.mixin(_12d,_12e);
},this);
return _12d;
};
_de.date.locale.addCustomFormats("dojo.cldr","gregorian");
_de.date.locale.getNames=function(item,type,_12f,_130){
var _131,_132=_de.date.locale._getGregorianBundle(_130),_133=[item,_12f,type];
if(_12f=="standAlone"){
var key=_133.join("-");
_131=_132[key];
if(_131[0]==1){
_131=undefined;
}
}
_133[1]="format";
return (_131||_132[_133.join("-")]).concat();
};
_de.date.locale.isWeekend=function(_134,_135){
var _136=_e2.getWeekend(_135),day=(_134||new Date()).getDay();
if(_136.end<_136.start){
_136.end+=7;
if(day<_136.start){
day+=7;
}
}
return day>=_136.start&&day<=_136.end;
};
_de.date.locale._getDayOfYear=function(_137){
return _e1.difference(new Date(_137.getFullYear(),0,1,_137.getHours()),_137)+1;
};
_de.date.locale._getWeekOfYear=function(_138,_139){
if(arguments.length==1){
_139=0;
}
var _13a=new Date(_138.getFullYear(),0,1).getDay(),adj=(_13a-_139+7)%7,week=Math.floor((_de.date.locale._getDayOfYear(_138)+adj-1)/7);
if(_13a==_139){
week++;
}
return week;
};
return _de.date.locale;
});
},"dijit/_Templated":function(){
define("dijit/_Templated",["./_WidgetBase","./_TemplatedMixin","./_WidgetsInTemplateMixin","dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/_base/kernel"],function(_13b,_13c,_13d,_13e,_13f,lang,_140){
lang.extend(_13b,{waiRole:"",waiState:""});
return _13f("dijit._Templated",[_13c,_13d],{widgetsInTemplate:false,constructor:function(){
_140.deprecated(this.declaredClass+": dijit._Templated deprecated, use dijit._TemplatedMixin and if necessary dijit._WidgetsInTemplateMixin","","2.0");
},_attachTemplateNodes:function(_141,_142){
this.inherited(arguments);
var _143=lang.isArray(_141)?_141:(_141.all||_141.getElementsByTagName("*"));
var x=lang.isArray(_141)?0:-1;
for(;x<_143.length;x++){
var _144=(x==-1)?_141:_143[x];
var role=_142(_144,"waiRole");
if(role){
_144.setAttribute("role",role);
}
var _145=_142(_144,"waiState");
if(_145){
_13e.forEach(_145.split(/\s*,\s*/),function(_146){
if(_146.indexOf("-")!=-1){
var pair=_146.split("-");
_144.setAttribute("aria-"+pair[0],pair[1]);
}
});
}
}
}});
});
},"dojo/require":function(){
define("dojo/require",["./_base/loader"],function(_147){
return {dynamic:0,normalize:function(id){
return id;
},load:_147.require};
});
},"dijit/MenuSeparator":function(){
require({cache:{"url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>"}});
define("dijit/MenuSeparator",["dojo/_base/declare","dojo/dom","./_WidgetBase","./_TemplatedMixin","./_Contained","dojo/text!./templates/MenuSeparator.html"],function(_148,dom,_149,_14a,_14b,_14c){
return _148("dijit.MenuSeparator",[_149,_14a,_14b],{templateString:_14c,buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.domNode,false);
},isFocusable:function(){
return false;
}});
});
},"dijit/form/ToggleButton":function(){
define("dijit/form/ToggleButton",["dojo/_base/declare","dojo/_base/kernel","./Button","./_ToggleButtonMixin"],function(_14d,_14e,_14f,_150){
return _14d("dijit.form.ToggleButton",[_14f,_150],{baseClass:"dijitToggleButton",setChecked:function(_151){
_14e.deprecated("setChecked("+_151+") is deprecated. Use set('checked',"+_151+") instead.","","2.0");
this.set("checked",_151);
}});
});
},"curam/util/Dialog":function(){
define("curam/util/Dialog",["curam/util","curam/define","curam/dialog","curam/util/onLoad","curam/debug","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _152=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.Dialog",{_id:null,_unsubscribes:[],open:function(path,_153,_154){
var url=path+curam.util.makeQueryString(_153);
var _155={href:url};
var _156=null;
if(_154){
_156="width="+_154.width+",height="+_154.height;
}
window.jsModals=true;
curam.util.openModalDialog(_155,_156);
},init:function(){
var _157=curam.util.getTopmostWindow();
var _158=_157.dojo.subscribe("/curam/dialog/SetId",null,function(_159){
curam.util.Dialog._id=_159;
curam.debug.log(_152.getProperty("curam.util.Dialog.id.success"),curam.util.Dialog._id);
_157.dojo.unsubscribe(_158);
});
curam.util.Dialog._unsubscribes.push(_158);
_157.dojo.publish("/curam/dialog/init");
if(!curam.util.Dialog._id){
curam.debug.log(_152.getProperty("curam.util.Dialog.id.fail"));
}
dojo.addOnUnload(function(){
curam.util.Dialog._releaseHandlers();
window.parent.dojo.publish("/curam/dialog/iframeUnloaded",[curam.util.Dialog._id,window]);
});
},registerGetTitleFunc:function(_15a){
curam.util.onLoad.addPublisher(function(_15b){
_15b.title=_15a();
});
},registerGetSizeFunc:function(_15c){
curam.util.onLoad.addPublisher(function(_15d){
_15d.windowOptions=_15c();
});
},registerAfterDisplayHandler:function(_15e){
var _15f=curam.util.getTopmostWindow();
curam.util.Dialog._unsubscribes.push(_15f.dojo.subscribe("/curam/dialog/AfterDisplay",null,function(_160){
if(_160==curam.util.Dialog._id){
_15e();
}
}));
},registerBeforeCloseHandler:function(_161){
var _162=curam.util.getTopmostWindow();
curam.util.Dialog._unsubscribes.push(_162.dojo.subscribe("/curam/dialog/BeforeClose",null,function(_163){
if(_163===curam.util.Dialog._id){
_161();
}
}));
},pageLoadFinished:function(){
var _164=curam.util.getTopmostWindow();
curam.util.Dialog._unsTokenReleaseHandlers=_164.dojo.subscribe("/curam/dialog/BeforeClose",null,function(_165){
if(_165==curam.util.Dialog._id){
curam.util.Dialog._releaseHandlers();
}
});
curam.util.onLoad.execute();
},_releaseHandlers:function(){
var _166=curam.util.getTopmostWindow();
dojo.forEach(curam.util.Dialog._unsubscribes,_166.dojo.unsubscribe);
curam.util.Dialog._unsubscribes=[];
_166.dojo.unsubscribe(curam.util.Dialog._unsTokenReleaseHandlers);
curam.util.Dialog._unsTokenReleaseHandlers=null;
},close:function(_167,_168,_169){
var _16a=curam.dialog.getParentWindow(window);
if(_167&&!_168){
curam.dialog.forceParentRefresh();
_16a.curam.util.redirectWindow(null);
}else{
if(_168){
var _16b=_168;
if(_168.indexOf("Page.do")==-1&&_168.indexOf("Action.do")==-1){
_16b=_168+"Page.do"+curam.util.makeQueryString(_169);
}
_16a.curam.util.redirectWindow(_16b);
}
}
var _16c=curam.util.getTopmostWindow();
_16c.dojo.publish("/curam/dialog/close",[curam.util.Dialog._id]);
},closeAndSubmitParent:function(_16d){
var _16e=curam.dialog.getParentWindow(window);
var _16f=_16e.document.forms["mainForm"];
var _170=curam.util.getTopmostWindow();
if(_16f==null||_16f==undefined){
_170.dojo.publish("/curam/dialog/close",[curam.util.Dialog._id]);
return;
}
var _171=function(_172){
for(var _173 in _172){
if(_172.hasOwnProperty(_173)){
return false;
}
}
return true;
};
if(_16d&&!_171(_16d)){
var _174=dojo.query("input[type=text])",_16f);
var _175=dojo.filter(_174,function(node){
return node.readOnly==false;
});
dojo.forEach(_175,function(node){
node.value="";
});
for(var _176 in _16d){
var _177=_175[parseInt(_176)];
if(_177){
var _178=dojo.query("input[name="+_177.id+"]",_16f)[0];
if(_178){
_178.value=_16d[_176];
}else{
_177.value=_16d[_176];
}
}
}
}else{
}
_16e.dojo.publish("/curam/page/refresh");
_16f.submit();
_170.dojo.publish("/curam/dialog/close",[curam.util.Dialog._id]);
}});
});
},"url:curam/widget/resources/DivButton.html":"<div id=\"${id}\" class=\"${className}\" dojoAttachEvent=\"onclick:onClick\" dojoAttachPoint=\"containerNode\"></div>\r\n\r\n {\r\n      templateString: \"<div id='${id}' class='${className}' \"\r\n            + \"dojoAttachEvent='onclick:onClick' dojoAttachPoint='containerNode'></div>\"\r\n    }\r\n\r\n","dijit/CheckedMenuItem":function(){
require({cache:{"url:dijit/templates/CheckedMenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitemcheckbox\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuItemIcon dijitCheckedMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t<span class=\"dijitCheckedMenuItemIconChar\">&#10003;</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,labelNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&#160;</td>\n</tr>\n"}});
define("dijit/CheckedMenuItem",["dojo/_base/declare","dojo/dom-class","./MenuItem","dojo/text!./templates/CheckedMenuItem.html","./hccss"],function(_179,_17a,_17b,_17c){
return _179("dijit.CheckedMenuItem",_17b,{templateString:_17c,checked:false,_setCheckedAttr:function(_17d){
_17a.toggle(this.domNode,"dijitCheckedMenuItemChecked",_17d);
this.domNode.setAttribute("aria-checked",_17d);
this._set("checked",_17d);
},iconClass:"",onChange:function(){
},_onClick:function(e){
if(!this.disabled){
this.set("checked",!this.checked);
this.onChange(this.checked);
}
this.inherited(arguments);
}});
});
},"url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n","dojox/html/_base":function(){
define("dojox/html/_base",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/xhr","dojo/_base/window","dojo/_base/sniff","dojo/_base/url","dojo/dom-construct","dojo/html","dojo/_base/declare"],function(dojo,lang,_17e,_17f,has,_180,_181,_182){
var html=dojo.getObject("dojox.html",true);
if(has("ie")){
var _183=/(AlphaImageLoader\([^)]*?src=(['"]))(?![a-z]+:|\/)([^\r\n;}]+?)(\2[^)]*\)\s*[;}]?)/g;
}
var _184=/(?:(?:@import\s*(['"])(?![a-z]+:|\/)([^\r\n;{]+?)\1)|url\(\s*(['"]?)(?![a-z]+:|\/)([^\r\n;]+?)\3\s*\))([a-z, \s]*[;}]?)/g;
var _185=html._adjustCssPaths=function(_186,_187){
if(!_187||!_186){
return;
}
if(_183){
_187=_187.replace(_183,function(_188,pre,_189,url,post){
return pre+(new _180(_186,"./"+url).toString())+post;
});
}
return _187.replace(_184,function(_18a,_18b,_18c,_18d,_18e,_18f){
if(_18c){
return "@import \""+(new _180(_186,"./"+_18c).toString())+"\""+_18f;
}else{
return "url("+(new _180(_186,"./"+_18e).toString())+")"+_18f;
}
});
};
var _190=/(<[a-z][a-z0-9]*\s[^>]*)(?:(href|src)=(['"]?)([^>]*?)\3|style=(['"]?)([^>]*?)\5)([^>]*>)/gi;
var _191=html._adjustHtmlPaths=function(_192,cont){
var url=_192||"./";
return cont.replace(_190,function(tag,_193,name,_194,_195,_196,_197,end){
return _193+(name?(name+"="+_194+(new _180(url,_195).toString())+_194):("style="+_196+_185(url,_197)+_196))+end;
});
};
var _198=html._snarfStyles=function(_199,cont,_19a){
_19a.attributes=[];
return cont.replace(/(?:<style([^>]*)>([\s\S]*?)<\/style>|<link\s+(?=[^>]*rel=['"]?stylesheet)([^>]*?href=(['"])([^>]*?)\4[^>\/]*)\/?>)/gi,function(_19b,_19c,_19d,_19e,_19f,href){
var i,attr=(_19c||_19e||"").replace(/^\s*([\s\S]*?)\s*$/i,"$1");
if(_19d){
i=_19a.push(_199?_185(_199,_19d):_19d);
}else{
i=_19a.push("@import \""+href+"\";");
attr=attr.replace(/\s*(?:rel|href)=(['"])?[^\s]*\1\s*/gi,"");
}
if(attr){
attr=attr.split(/\s+/);
var _1a0={},tmp;
for(var j=0,e=attr.length;j<e;j++){
tmp=attr[j].split("=");
_1a0[tmp[0]]=tmp[1].replace(/^\s*['"]?([\s\S]*?)['"]?\s*$/,"$1");
}
_19a.attributes[i-1]=_1a0;
}
return "";
});
};
var _1a1=html._snarfScripts=function(cont,_1a2){
_1a2.code="";
cont=cont.replace(/<[!][-][-](.|\s)*?[-][-]>/g,function(_1a3){
return _1a3.replace(/<(\/?)script\b/ig,"&lt;$1Script");
});
function _1a4(src){
if(_1a2.downloadRemote){
src=src.replace(/&([a-z0-9#]+);/g,function(m,name){
switch(name){
case "amp":
return "&";
case "gt":
return ">";
case "lt":
return "<";
default:
return name.charAt(0)=="#"?String.fromCharCode(name.substring(1)):"&"+name+";";
}
});
_17e.get({url:src,sync:true,load:function(code){
_1a2.code+=code+";";
},error:_1a2.errBack});
}
};
return cont.replace(/<script\s*(?![^>]*type=['"]?(?:dojo\/|text\/html\b))(?:[^>]*?(?:src=(['"]?)([^>]*?)\1[^>]*)?)*>([\s\S]*?)<\/script>/gi,function(_1a5,_1a6,src,code){
if(src){
_1a4(src);
}else{
_1a2.code+=code;
}
return "";
});
};
var _1a7=html.evalInGlobal=function(code,_1a8){
_1a8=_1a8||_17f.doc.body;
var n=_1a8.ownerDocument.createElement("script");
n.type="text/javascript";
_1a8.appendChild(n);
n.text=code;
};
html._ContentSetter=dojo.declare(_182._ContentSetter,{adjustPaths:false,referencePath:".",renderStyles:false,executeScripts:false,scriptHasHooks:false,scriptHookReplacement:null,_renderStyles:function(_1a9){
this._styleNodes=[];
var st,att,_1aa,doc=this.node.ownerDocument;
var head=doc.getElementsByTagName("head")[0];
for(var i=0,e=_1a9.length;i<e;i++){
_1aa=_1a9[i];
att=_1a9.attributes[i];
st=doc.createElement("style");
st.setAttribute("type","text/css");
for(var x in att){
st.setAttribute(x,att[x]);
}
this._styleNodes.push(st);
head.appendChild(st);
if(st.styleSheet){
st.styleSheet.cssText=_1aa;
}else{
st.appendChild(doc.createTextNode(_1aa));
}
}
},empty:function(){
this.inherited("empty",arguments);
this._styles=[];
},onBegin:function(){
this.inherited("onBegin",arguments);
var cont=this.content,node=this.node;
var _1ab=this._styles;
if(lang.isString(cont)){
if(this.adjustPaths&&this.referencePath){
cont=_191(this.referencePath,cont);
}
if(this.renderStyles||this.cleanContent){
cont=_198(this.referencePath,cont,_1ab);
}
if(this.executeScripts){
var _1ac=this;
var _1ad={downloadRemote:true,errBack:function(e){
_1ac._onError.call(_1ac,"Exec","Error downloading remote script in \""+_1ac.id+"\"",e);
}};
cont=_1a1(cont,_1ad);
this._code=_1ad.code;
}
}
this.content=cont;
},onEnd:function(){
var code=this._code,_1ae=this._styles;
if(this._styleNodes&&this._styleNodes.length){
while(this._styleNodes.length){
_181.destroy(this._styleNodes.pop());
}
}
if(this.renderStyles&&_1ae&&_1ae.length){
this._renderStyles(_1ae);
}
if(this.executeScripts&&code){
if(this.cleanContent){
code=code.replace(/(<!--|(?:\/\/)?-->|<!\[CDATA\[|\]\]>)/g,"");
}
if(this.scriptHasHooks){
code=code.replace(/_container_(?!\s*=[^=])/g,this.scriptHookReplacement);
}
try{
_1a7(code,this.node);
}
catch(e){
this._onError("Exec","Error eval script in "+this.id+", "+e.message,e);
}
}
this.inherited("onEnd",arguments);
},tearDown:function(){
this.inherited(arguments);
delete this._styles;
if(this._styleNodes&&this._styleNodes.length){
while(this._styleNodes.length){
_181.destroy(this._styleNodes.pop());
}
}
delete this._styleNodes;
dojo.mixin(this,html._ContentSetter.prototype);
}});
html.set=function(node,cont,_1af){
if(!_1af){
return _182._setNodeContent(node,cont,true);
}else{
var op=new html._ContentSetter(dojo.mixin(_1af,{content:cont,node:node}));
return op.set();
}
};
return html;
});
},"dijit/_DialogMixin":function(){
define("dijit/_DialogMixin",["dojo/_base/declare","./a11y"],function(_1b0,a11y){
return _1b0("dijit._DialogMixin",null,{execute:function(){
},onCancel:function(){
},onExecute:function(){
},_onSubmit:function(){
this.onExecute();
this.execute(this.get("value"));
},_getFocusItems:function(){
var _1b1=a11y._getTabNavigable(this.containerNode);
this._firstFocusItem=_1b1.lowest||_1b1.first||this.closeButtonNode||this.domNode;
this._lastFocusItem=_1b1.last||_1b1.highest||this._firstFocusItem;
}});
});
},"curam/widget/FilteringSelect":function(){
define("curam/widget/FilteringSelect",["dijit/registry","dojo/on","dijit/form/FilteringSelect"],function(_1b2,on){
var _1b3=dojo.declare("curam.widget.FilteringSelect",dijit.form.FilteringSelect,{enterKeyOnOpenDropDown:false,postMixInProperties:function(){
if(!this.store){
if(dojo.query("> option",this.srcNodeRef)[0]==undefined){
dojo.create("option",{innerHTML:"<!--__o3_BLANK-->"},this.srcNodeRef);
}
}
if(!this.get("store")&&this.srcNodeRef.value==""){
var _1b4=this.srcNodeRef,_1b5=dojo.query("> option[value='']",_1b4);
if(_1b5.length&&_1b5[0].innerHTML!="<!--__o3_BLANK-->"){
this.displayedValue=dojo.trim(_1b5[0].innerHTML);
}
}
this.inherited(arguments);
},postCreate:function(){
on(this.focusNode,"keydown",function(e){
var _1b6=_1b2.byNode(dojo.byId("widget_"+e.target.id));
if(e.keyCode==dojo.keys.ENTER&&_1b6._opened){
_1b6.enterKeyOnOpenDropDown=true;
}
});
this.inherited(arguments);
},startup:function(){
this.domNode.setAttribute("role","listbox");
this.inherited(arguments);
},_callbackSetLabel:function(_1b7,_1b8,_1b9,_1ba){
if((_1b8&&_1b8[this.searchAttr]!==this._lastQuery)||(!_1b8&&_1b7.length&&this.get("store").getIdentity(_1b7[0])!=this._lastQuery)){
return;
}
if(!_1b7.length){
this.set("value","__o3_INVALID",_1ba||(_1ba===undefined&&!this.focused),this.textbox.value,null);
}else{
this.set("item",_1b7[0],_1ba);
}
}});
return _1b3;
});
},"dijit/_Widget":function(){
define("dijit/_Widget",["dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/ready","./registry","./_WidgetBase","./_OnDijitClickMixin","./_FocusMixin","dojo/uacss","./hccss"],function(_1bb,_1bc,_1bd,_1be,_1bf,lang,_1c0,_1c1,_1c2,_1c3,_1c4,_1c5){
function _1c6(){
};
function _1c7(_1c8){
return function(obj,_1c9,_1ca,_1cb){
if(obj&&typeof _1c9=="string"&&obj[_1c9]==_1c6){
return obj.on(_1c9.substring(2).toLowerCase(),lang.hitch(_1ca,_1cb));
}
return _1c8.apply(_1bd,arguments);
};
};
_1bb.around(_1bd,"connect",_1c7);
if(_1bf.connect){
_1bb.around(_1bf,"connect",_1c7);
}
var _1cc=_1be("dijit._Widget",[_1c3,_1c4,_1c5],{onClick:_1c6,onDblClick:_1c6,onKeyDown:_1c6,onKeyPress:_1c6,onKeyUp:_1c6,onMouseDown:_1c6,onMouseMove:_1c6,onMouseOut:_1c6,onMouseOver:_1c6,onMouseLeave:_1c6,onMouseEnter:_1c6,onMouseUp:_1c6,constructor:function(_1cd){
this._toConnect={};
for(var name in _1cd){
if(this[name]===_1c6){
this._toConnect[name.replace(/^on/,"").toLowerCase()]=_1cd[name];
delete _1cd[name];
}
}
},postCreate:function(){
this.inherited(arguments);
for(var name in this._toConnect){
this.on(name,this._toConnect[name]);
}
delete this._toConnect;
},on:function(type,func){
if(this[this._onMap(type)]===_1c6){
return _1bd.connect(this.domNode,type.toLowerCase(),this,func);
}
return this.inherited(arguments);
},_setFocusedAttr:function(val){
this._focused=val;
this._set("focused",val);
},setAttribute:function(attr,_1ce){
_1bf.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(attr,_1ce);
},attr:function(name,_1cf){
if(_1bc.isDebug){
var _1d0=arguments.callee._ach||(arguments.callee._ach={}),_1d1=(arguments.callee.caller||"unknown caller").toString();
if(!_1d0[_1d1]){
_1bf.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+_1d1,"","2.0");
_1d0[_1d1]=true;
}
}
var args=arguments.length;
if(args>=2||typeof name==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(name);
}
},getDescendants:function(){
_1bf.deprecated(this.declaredClass+"::getDescendants() is deprecated. Use getChildren() instead.","","2.0");
return this.containerNode?_1c0("[widgetId]",this.containerNode).map(_1c2.byNode):[];
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
if(!_1bf.isAsync){
_1c1(0,function(){
var _1d2=["dijit/_base"];
require(_1d2);
});
}
return _1cc;
});
},"dijit/layout/AccordionContainer":function(){
require({cache:{"url:dijit/layout/templates/AccordionButton.html":"<div data-dojo-attach-event='onclick:_onTitleClick' class='dijitAccordionTitle' role=\"presentation\">\n\t<div data-dojo-attach-point='titleNode,focusNode' data-dojo-attach-event='onkeypress:_onTitleKeyPress'\n\t\t\tclass='dijitAccordionTitleFocus' role=\"tab\" aria-expanded=\"false\"\n\t\t><span class='dijitInline dijitAccordionArrow' role=\"presentation\"></span\n\t\t><span class='arrowTextUp' role=\"presentation\">+</span\n\t\t><span class='arrowTextDown' role=\"presentation\">-</span\n\t\t><img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon\" data-dojo-attach-point='iconNode' style=\"vertical-align: middle\" role=\"presentation\"/>\n\t\t<span role=\"presentation\" data-dojo-attach-point='titleTextNode' class='dijitAccordionText'></span>\n\t</div>\n</div>\n"}});
define("dijit/layout/AccordionContainer",["require","dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/_base/fx","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/_base/sniff","dojo/topic","../focus","../_base/manager","dojo/ready","../_Widget","../_Container","../_TemplatedMixin","../_CssStateMixin","./StackContainer","./ContentPane","dojo/text!./templates/AccordionButton.html"],function(_1d3,_1d4,_1d5,_1d6,fx,dom,_1d7,_1d8,_1d9,_1da,_1db,keys,lang,has,_1dc,_1dd,_1de,_1df,_1e0,_1e1,_1e2,_1e3,_1e4,_1e5,_1e6){
var _1e7=_1d5("dijit.layout._AccordionButton",[_1e0,_1e2,_1e3],{templateString:_1e6,label:"",_setLabelAttr:{node:"titleTextNode",type:"innerHTML"},title:"",_setTitleAttr:{node:"titleTextNode",type:"attribute",attribute:"title"},iconClassAttr:"",_setIconClassAttr:{node:"iconNode",type:"class"},baseClass:"dijitAccordionTitle",getParent:function(){
return this.parent;
},buildRendering:function(){
this.inherited(arguments);
var _1e8=this.id.replace(" ","_");
_1d7.set(this.titleTextNode,"id",_1e8+"_title");
this.focusNode.setAttribute("aria-labelledby",_1d7.get(this.titleTextNode,"id"));
dom.setSelectable(this.domNode,false);
},getTitleHeight:function(){
return _1da.getMarginSize(this.domNode).h;
},_onTitleClick:function(){
var _1e9=this.getParent();
_1e9.selectChild(this.contentWidget,true);
_1dd.focus(this.focusNode);
},_onTitleKeyPress:function(evt){
return this.getParent()._onKeyPress(evt,this.contentWidget);
},_setSelectedAttr:function(_1ea){
this._set("selected",_1ea);
this.focusNode.setAttribute("aria-expanded",_1ea);
this.focusNode.setAttribute("aria-selected",_1ea);
this.focusNode.setAttribute("tabIndex",_1ea?"0":"-1");
}});
var _1eb=_1d5("dijit.layout._AccordionInnerContainer",[_1e0,_1e3],{baseClass:"dijitAccordionInnerContainer",isLayoutContainer:true,buildRendering:function(){
this.domNode=_1d9.place("<div class='"+this.baseClass+"' role='presentation'>",this.contentWidget.domNode,"after");
var _1ec=this.contentWidget,cls=lang.isString(this.buttonWidget)?lang.getObject(this.buttonWidget):this.buttonWidget;
this.button=_1ec._buttonWidget=(new cls({contentWidget:_1ec,label:_1ec.title,title:_1ec.tooltip,dir:_1ec.dir,lang:_1ec.lang,textDir:_1ec.textDir,iconClass:_1ec.iconClass,id:_1ec.id+"_button",parent:this.parent})).placeAt(this.domNode);
this.containerNode=_1d9.place("<div class='dijitAccordionChildWrapper' style='display:none'>",this.domNode);
_1d9.place(this.contentWidget.domNode,this.containerNode);
},postCreate:function(){
this.inherited(arguments);
var _1ed=this.button;
this._contentWidgetWatches=[this.contentWidget.watch("title",lang.hitch(this,function(name,_1ee,_1ef){
_1ed.set("label",_1ef);
})),this.contentWidget.watch("tooltip",lang.hitch(this,function(name,_1f0,_1f1){
_1ed.set("title",_1f1);
})),this.contentWidget.watch("iconClass",lang.hitch(this,function(name,_1f2,_1f3){
_1ed.set("iconClass",_1f3);
}))];
},_setSelectedAttr:function(_1f4){
this._set("selected",_1f4);
this.button.set("selected",_1f4);
if(_1f4){
var cw=this.contentWidget;
if(cw.onSelected){
cw.onSelected();
}
}
},startup:function(){
this.contentWidget.startup();
},destroy:function(){
this.button.destroyRecursive();
_1d4.forEach(this._contentWidgetWatches||[],function(w){
w.unwatch();
});
delete this.contentWidget._buttonWidget;
delete this.contentWidget._wrapperWidget;
this.inherited(arguments);
},destroyDescendants:function(_1f5){
this.contentWidget.destroyRecursive(_1f5);
}});
var _1f6=_1d5("dijit.layout.AccordionContainer",_1e4,{duration:_1de.defaultDuration,buttonWidget:_1e7,baseClass:"dijitAccordionContainer",buildRendering:function(){
this.inherited(arguments);
this.domNode.style.overflow="hidden";
this.domNode.setAttribute("role","tablist");
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(this.selectedChildWidget){
var _1f7=this.selectedChildWidget.containerNode.style;
_1f7.display="";
_1f7.overflow="auto";
this.selectedChildWidget._wrapperWidget.set("selected",true);
}
},layout:function(){
var _1f8=this.selectedChildWidget;
if(!_1f8){
return;
}
var _1f9=_1f8._wrapperWidget.domNode,_1fa=_1da.getMarginExtents(_1f9),_1fb=_1da.getPadBorderExtents(_1f9),_1fc=_1f8._wrapperWidget.containerNode,_1fd=_1da.getMarginExtents(_1fc),_1fe=_1da.getPadBorderExtents(_1fc),_1ff=this._contentBox;
var _200=0;
_1d4.forEach(this.getChildren(),function(_201){
if(_201!=_1f8){
_200+=_1da.getMarginSize(_201._wrapperWidget.domNode).h;
}
});
this._verticalSpace=_1ff.h-_200-_1fa.h-_1fb.h-_1fd.h-_1fe.h-_1f8._buttonWidget.getTitleHeight();
this._containerContentBox={h:this._verticalSpace,w:this._contentBox.w-_1fa.w-_1fb.w-_1fd.w-_1fe.w};
if(_1f8){
_1f8.resize(this._containerContentBox);
}
},_setupChild:function(_202){
_202._wrapperWidget=_1eb({contentWidget:_202,buttonWidget:this.buttonWidget,id:_202.id+"_wrapper",dir:_202.dir,lang:_202.lang,textDir:_202.textDir,parent:this});
this.inherited(arguments);
},addChild:function(_203,_204){
if(this._started){
var _205=this.containerNode;
if(_204&&typeof _204=="number"){
var _206=_1e0.prototype.getChildren.call(this);
if(_206&&_206.length>=_204){
_205=_206[_204-1].domNode;
_204="after";
}
}
_1d9.place(_203.domNode,_205,_204);
if(!_203._started){
_203.startup();
}
this._setupChild(_203);
_1dc.publish(this.id+"-addChild",_203,_204);
this.layout();
if(!this.selectedChildWidget){
this.selectChild(_203);
}
}else{
this.inherited(arguments);
}
},removeChild:function(_207){
if(_207._wrapperWidget){
_1d9.place(_207.domNode,_207._wrapperWidget.domNode,"after");
_207._wrapperWidget.destroy();
delete _207._wrapperWidget;
}
_1d8.remove(_207.domNode,"dijitHidden");
this.inherited(arguments);
},getChildren:function(){
return _1d4.map(this.inherited(arguments),function(_208){
return _208.declaredClass=="dijit.layout._AccordionInnerContainer"?_208.contentWidget:_208;
},this);
},destroy:function(){
if(this._animation){
this._animation.stop();
}
_1d4.forEach(this.getChildren(),function(_209){
if(_209._wrapperWidget){
_209._wrapperWidget.destroy();
}else{
_209.destroyRecursive();
}
});
this.inherited(arguments);
},_showChild:function(_20a){
_20a._wrapperWidget.containerNode.style.display="block";
return this.inherited(arguments);
},_hideChild:function(_20b){
_20b._wrapperWidget.containerNode.style.display="none";
this.inherited(arguments);
},_transition:function(_20c,_20d,_20e){
if(has("ie")<8){
_20e=false;
}
if(this._animation){
this._animation.stop(true);
delete this._animation;
}
var self=this;
if(_20c){
_20c._wrapperWidget.set("selected",true);
var d=this._showChild(_20c);
if(this.doLayout&&_20c.resize){
_20c.resize(this._containerContentBox);
}
}
if(_20d){
_20d._wrapperWidget.set("selected",false);
if(!_20e){
this._hideChild(_20d);
}
}
if(_20e){
var _20f=_20c._wrapperWidget.containerNode,_210=_20d._wrapperWidget.containerNode;
var _211=_20c._wrapperWidget.containerNode,_212=_1da.getMarginExtents(_211),_213=_1da.getPadBorderExtents(_211),_214=_212.h+_213.h;
_210.style.height=(self._verticalSpace-_214)+"px";
this._animation=new fx.Animation({node:_20f,duration:this.duration,curve:[1,this._verticalSpace-_214-1],onAnimate:function(_215){
_215=Math.floor(_215);
_20f.style.height=_215+"px";
_210.style.height=(self._verticalSpace-_214-_215)+"px";
},onEnd:function(){
delete self._animation;
_20f.style.height="auto";
_20d._wrapperWidget.containerNode.style.display="none";
_210.style.height="auto";
self._hideChild(_20d);
}});
this._animation.onStop=this._animation.onEnd;
this._animation.play();
}
return d;
},_onKeyPress:function(e,_216){
if(this.disabled||e.altKey||!(_216||e.ctrlKey)){
return;
}
var c=e.charOrCode;
if((_216&&(c==keys.LEFT_ARROW||c==keys.UP_ARROW))||(e.ctrlKey&&c==keys.PAGE_UP)){
this._adjacent(false)._buttonWidget._onTitleClick();
_1d6.stop(e);
}else{
if((_216&&(c==keys.RIGHT_ARROW||c==keys.DOWN_ARROW))||(e.ctrlKey&&(c==keys.PAGE_DOWN||c==keys.TAB))){
this._adjacent(true)._buttonWidget._onTitleClick();
_1d6.stop(e);
}
}
}});
if(!_1db.isAsync){
_1df(0,function(){
var _217=["dijit/layout/AccordionPane"];
_1d3(_217);
});
}
_1f6._InnerContainer=_1eb;
_1f6._Button=_1e7;
return _1f6;
});
},"url:curam/layout/resources/TabContainer.html":"<div class=\"dijitTabContainer\">\r\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\r\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer dijitAlignTop\"></div>\r\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container dijitAlignClient\" data-dojo-attach-point=\"containerNode\"></div>\r\n</div>\r\n","dojox/storage/Provider":function(){
define("dojox/storage/Provider",["dijit","dojo","dojox"],function(_218,dojo,_219){
dojo.provide("dojox.storage.Provider");
dojo.declare("dojox.storage.Provider",null,{constructor:function(){
},SUCCESS:"success",FAILED:"failed",PENDING:"pending",SIZE_NOT_AVAILABLE:"Size not available",SIZE_NO_LIMIT:"No size limit",DEFAULT_NAMESPACE:"default",onHideSettingsUI:null,initialize:function(){
console.warn("dojox.storage.initialize not implemented");
},isAvailable:function(){
console.warn("dojox.storage.isAvailable not implemented");
},put:function(key,_21a,_21b,_21c){
console.warn("dojox.storage.put not implemented");
},get:function(key,_21d){
console.warn("dojox.storage.get not implemented");
},hasKey:function(key,_21e){
return !!this.get(key,_21e);
},getKeys:function(_21f){
console.warn("dojox.storage.getKeys not implemented");
},clear:function(_220){
console.warn("dojox.storage.clear not implemented");
},remove:function(key,_221){
console.warn("dojox.storage.remove not implemented");
},getNamespaces:function(){
console.warn("dojox.storage.getNamespaces not implemented");
},isPermanent:function(){
console.warn("dojox.storage.isPermanent not implemented");
},getMaximumSize:function(){
console.warn("dojox.storage.getMaximumSize not implemented");
},putMultiple:function(keys,_222,_223,_224){
for(var i=0;i<keys.length;i++){
_219.storage.put(keys[i],_222[i],_223,_224);
}
},getMultiple:function(keys,_225){
var _226=[];
for(var i=0;i<keys.length;i++){
_226.push(_219.storage.get(keys[i],_225));
}
return _226;
},removeMultiple:function(keys,_227){
for(var i=0;i<keys.length;i++){
_219.storage.remove(keys[i],_227);
}
},isValidKeyArray:function(keys){
if(keys===null||keys===undefined||!dojo.isArray(keys)){
return false;
}
return !dojo.some(keys,function(key){
return !this.isValidKey(key);
},this);
},hasSettingsUI:function(){
return false;
},showSettingsUI:function(){
console.warn("dojox.storage.showSettingsUI not implemented");
},hideSettingsUI:function(){
console.warn("dojox.storage.hideSettingsUI not implemented");
},isValidKey:function(_228){
if(_228===null||_228===undefined){
return false;
}
return /^[0-9A-Za-z_]*$/.test(_228);
},getResourceList:function(){
return [];
}});
});
},"curam/lnf":function(){
define("curam/lnf",["curam/define"],function(){
curam.define.singleton("curam.lnf",{setCTParent:function(id){
var _229=dojo.byId(id);
var _22a=_229.parentNode;
if(_22a.tagName=="TD"){
dojo.addClass(_22a,"codetable");
}
}});
return curam.lnf;
});
},"dojo/data/util/filter":function(){
define("dojo/data/util/filter",["dojo/_base/lang"],function(lang){
var _22b=lang.getObject("dojo.data.util.filter",true);
_22b.patternToRegExp=function(_22c,_22d){
var rxp="^";
var c=null;
for(var i=0;i<_22c.length;i++){
c=_22c.charAt(i);
switch(c){
case "\\":
rxp+=c;
i++;
rxp+=_22c.charAt(i);
break;
case "*":
rxp+=".*";
break;
case "?":
rxp+=".";
break;
case "$":
case "^":
case "/":
case "+":
case ".":
case "|":
case "(":
case ")":
case "{":
case "}":
case "[":
case "]":
rxp+="\\";
default:
rxp+=c;
}
}
rxp+="$";
if(_22d){
return new RegExp(rxp,"mi");
}else{
return new RegExp(rxp,"m");
}
};
return _22b;
});
},"dojo/dnd/common":function(){
define("dojo/dnd/common",["../main"],function(dojo){
dojo.getObject("dnd",true,dojo);
dojo.dnd.getCopyKeyState=dojo.isCopyKey;
dojo.dnd._uniqueId=0;
dojo.dnd.getUniqueId=function(){
var id;
do{
id=dojo._scopeName+"Unique"+(++dojo.dnd._uniqueId);
}while(dojo.byId(id));
return id;
};
dojo.dnd._empty={};
dojo.dnd.isFormElement=function(e){
var t=e.target;
if(t.nodeType==3){
t=t.parentNode;
}
return " button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0;
};
return dojo.dnd;
});
},"dijit/tree/ForestStoreModel":function(){
define("dijit/tree/ForestStoreModel",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/_base/window","./TreeStoreModel"],function(_22e,_22f,lang,win,_230){
return _22f("dijit.tree.ForestStoreModel",_230,{rootId:"$root$",rootLabel:"ROOT",query:null,constructor:function(_231){
this.root={store:this,root:true,id:_231.rootId,label:_231.rootLabel,children:_231.rootChildren};
},mayHaveChildren:function(item){
return item===this.root||this.inherited(arguments);
},getChildren:function(_232,_233,_234){
if(_232===this.root){
if(this.root.children){
_233(this.root.children);
}else{
this.store.fetch({query:this.query,onComplete:lang.hitch(this,function(_235){
this.root.children=_235;
_233(_235);
}),onError:_234});
}
}else{
this.inherited(arguments);
}
},isItem:function(_236){
return (_236===this.root)?true:this.inherited(arguments);
},fetchItemByIdentity:function(_237){
if(_237.identity==this.root.id){
var _238=_237.scope?_237.scope:win.global;
if(_237.onItem){
_237.onItem.call(_238,this.root);
}
}else{
this.inherited(arguments);
}
},getIdentity:function(item){
return (item===this.root)?this.root.id:this.inherited(arguments);
},getLabel:function(item){
return (item===this.root)?this.root.label:this.inherited(arguments);
},newItem:function(args,_239,_23a){
if(_239===this.root){
this.onNewRootItem(args);
return this.store.newItem(args);
}else{
return this.inherited(arguments);
}
},onNewRootItem:function(){
},pasteItem:function(_23b,_23c,_23d,_23e,_23f){
if(_23c===this.root){
if(!_23e){
this.onLeaveRoot(_23b);
}
}
this.inherited(arguments,[_23b,_23c===this.root?null:_23c,_23d===this.root?null:_23d,_23e,_23f]);
if(_23d===this.root){
this.onAddToRoot(_23b);
}
},onAddToRoot:function(item){
console.log(this,": item ",item," added to root");
},onLeaveRoot:function(item){
console.log(this,": item ",item," removed from root");
},_requeryTop:function(){
var _240=this.root.children||[];
this.store.fetch({query:this.query,onComplete:lang.hitch(this,function(_241){
this.root.children=_241;
if(_240.length!=_241.length||_22e.some(_240,function(item,idx){
return _241[idx]!=item;
})){
this.onChildrenChange(this.root,_241);
}
})});
},onNewItem:function(item,_242){
this._requeryTop();
this.inherited(arguments);
},onDeleteItem:function(item){
if(_22e.indexOf(this.root.children,item)!=-1){
this._requeryTop();
}
this.inherited(arguments);
},onSetItem:function(item,_243,_244,_245){
this._requeryTop();
this.inherited(arguments);
}});
});
},"curam/util/ResourceBundle":function(){
define("curam/util/ResourceBundle",["dojo/i18n","dojo/string"],function(i18n,_246){
var _247=dojo.declare("curam.util.ResourceBundle",null,{_bundle:undefined,constructor:function(_248,_249){
var _24a=_248.split(".");
var _24b=_24a[_24a.length-1];
var _24c=_24a.length==1?"curam.application":_248.slice(0,_248.length-_24b.length-1);
try{
var b=i18n.getLocalization(_24c,_24b,_249);
if(this._isEmpty(b)){
throw new Error("Empty resource bundle.");
}else{
this._bundle=b;
}
}
catch(e){
throw new Error("Unable to access resource bundle: "+_24c+"."+_24b+": "+e.message);
}
},_isEmpty:function(_24d){
for(var prop in _24d){
return false;
}
return true;
},getProperty:function(key,_24e){
var msg=this._bundle[key];
var _24f=msg;
if(_24e){
_24f=_246.substitute(msg,_24e);
}
return _24f;
}});
return _247;
});
},"dijit/Menu":function(){
define("dijit/Menu",["require","dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window","dojo/window","./popup","./DropDownMenu","dojo/ready"],function(_250,_251,_252,_253,dom,_254,_255,_256,_257,keys,lang,on,has,win,_258,pm,_259,_25a){
if(!_257.isAsync){
_25a(0,function(){
var _25b=["dijit/MenuItem","dijit/PopupMenuItem","dijit/CheckedMenuItem","dijit/MenuSeparator"];
_250(_25b);
});
}
return _252("dijit.Menu",_259,{constructor:function(){
this._bindings=[];
},targetNodeIds:[],contextMenuForWindow:false,leftClickToOpen:false,refocus:true,postCreate:function(){
if(this.contextMenuForWindow){
this.bindDomNode(win.body());
}else{
_251.forEach(this.targetNodeIds,this.bindDomNode,this);
}
this.inherited(arguments);
},_iframeContentWindow:function(_25c){
return _258.get(this._iframeContentDocument(_25c))||this._iframeContentDocument(_25c)["__parent__"]||(_25c.name&&win.doc.frames[_25c.name])||null;
},_iframeContentDocument:function(_25d){
return _25d.contentDocument||(_25d.contentWindow&&_25d.contentWindow.document)||(_25d.name&&win.doc.frames[_25d.name]&&win.doc.frames[_25d.name].document)||null;
},bindDomNode:function(node){
node=dom.byId(node);
var cn;
if(node.tagName.toLowerCase()=="iframe"){
var _25e=node,_25f=this._iframeContentWindow(_25e);
cn=win.withGlobal(_25f,win.body);
}else{
cn=(node==win.body()?win.doc.documentElement:node);
}
var _260={node:node,iframe:_25e};
_254.set(node,"_dijitMenu"+this.id,this._bindings.push(_260));
var _261=lang.hitch(this,function(cn){
return [on(cn,this.leftClickToOpen?"click":"contextmenu",lang.hitch(this,function(evt){
_253.stop(evt);
this._scheduleOpen(evt.target,_25e,{x:evt.pageX,y:evt.pageY});
})),on(cn,"keydown",lang.hitch(this,function(evt){
if(evt.shiftKey&&evt.keyCode==keys.F10){
_253.stop(evt);
this._scheduleOpen(evt.target,_25e);
}
}))];
});
_260.connects=cn?_261(cn):[];
if(_25e){
_260.onloadHandler=lang.hitch(this,function(){
var _262=this._iframeContentWindow(_25e);
cn=win.withGlobal(_262,win.body);
_260.connects=_261(cn);
});
if(_25e.addEventListener){
_25e.addEventListener("load",_260.onloadHandler,false);
}else{
_25e.attachEvent("onload",_260.onloadHandler);
}
}
},unBindDomNode:function(_263){
var node;
try{
node=dom.byId(_263);
}
catch(e){
return;
}
var _264="_dijitMenu"+this.id;
if(node&&_254.has(node,_264)){
var bid=_254.get(node,_264)-1,b=this._bindings[bid],h;
while(h=b.connects.pop()){
h.remove();
}
var _265=b.iframe;
if(_265){
if(_265.removeEventListener){
_265.removeEventListener("load",b.onloadHandler,false);
}else{
_265.detachEvent("onload",b.onloadHandler);
}
}
_254.remove(node,_264);
delete this._bindings[bid];
}
},_scheduleOpen:function(_266,_267,_268){
if(!this._openTimer){
this._openTimer=setTimeout(lang.hitch(this,function(){
delete this._openTimer;
this._openMyself({target:_266,iframe:_267,coords:_268});
}),1);
}
},_openMyself:function(args){
var _269=args.target,_26a=args.iframe,_26b=args.coords;
if(_26b){
if(_26a){
var ifc=_255.position(_26a,true),_26c=this._iframeContentWindow(_26a),_26d=win.withGlobal(_26c,"_docScroll",dojo);
var cs=_256.getComputedStyle(_26a),tp=_256.toPixelValue,left=(has("ie")&&has("quirks")?0:tp(_26a,cs.paddingLeft))+(has("ie")&&has("quirks")?tp(_26a,cs.borderLeftWidth):0),top=(has("ie")&&has("quirks")?0:tp(_26a,cs.paddingTop))+(has("ie")&&has("quirks")?tp(_26a,cs.borderTopWidth):0);
_26b.x+=ifc.x+left-_26d.x;
_26b.y+=ifc.y+top-_26d.y;
}
}else{
_26b=_255.position(_269,true);
_26b.x+=10;
_26b.y+=10;
}
var self=this;
var _26e=this._focusManager.get("prevNode");
var _26f=this._focusManager.get("curNode");
var _270=!_26f||(dom.isDescendant(_26f,this.domNode))?_26e:_26f;
function _271(){
if(self.refocus&&_270){
_270.focus();
}
pm.close(self);
};
pm.open({popup:this,x:_26b.x,y:_26b.y,onExecute:_271,onCancel:_271,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){
this.inherited("_onBlur",arguments);
pm.close(this);
};
},uninitialize:function(){
_251.forEach(this._bindings,function(b){
if(b){
this.unBindDomNode(b.node);
}
},this);
this.inherited(arguments);
}});
});
},"curam/util/TabNavigation":function(){
define("curam/util/TabNavigation",["curam/debug","curam/define","curam/util","curam/tab","curam/util/Refresh","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _272=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.TabNavigation",{CACHE_BUSTER:0,CACHE_BUSTER_PARAM_NAME:"o3nocache",disabledItems:{},tabLists:{},init:function(_273,_274){
var _275=_273+"child-nav-selectChild";
var _276=dojo.subscribe(_275,"",function(){
curam.util.TabNavigation.onParentSelect(null,_273);
});
curam.tab.unsubscribeOnTabClose(_276,_274);
},onParentSelect:function(_277,_278){
var _279=_278+"-child-nav";
var _27a=dijit.byId(_279);
var _27b=true;
if(!_277){
var _27b=false;
var _27c=_278+"-parent-nav";
var _27d=dijit.byId(_27c);
_277=_27d.selectedChildWidget;
}
if(_277.curamDoNoReload){
_27b=false;
_277.setAttribute("curamDoNoReload",null);
}
var _27e=_277.id+"-Stack";
var _27f=dijit.byId(_27e);
var href=dojo.attr(_27f.get("srcNodeRef"),"page-ref");
if(!href){
var _280=_27f;
if(_280){
var link=dojo.query("li.selected > div.link",_280.id)[0];
href=dojo.attr(link,"page-ref");
}else{
throw new Error("Could not find a page reference. The menu item '"+_277.id+"' has no page reference and no selected child item was found.");
}
}
if(_27b){
var ifr=curam.util.TabNavigation.getIframe(_278);
if(dojo.isIE&&dojo.isIE<9){
ifrBody=ifr.contentWindow.document.body;
}else{
ifrBody=ifr.contentDocument.activeElement;
}
var _281=function(){
_27a.selectChild(_27f);
dojo.style(_27a.domNode,"visibility","visible");
dojo.style(ifr,"visibility","visible");
};
if(dojo.isIE&&dojo.isIE<9){
var lh=function(){
if(ifr.readyState=="complete"){
ifr.detachEvent("onreadystatechange",lh);
_281();
}
};
ifr.attachEvent("onreadystatechange",lh);
}else{
var dt=dojo.connect(ifr,"onload",null,function(){
dojo.disconnect(dt);
_281();
});
}
dojo.query("div.list",ifrBody).forEach(function(node){
dojo.addClass(node,"hidden");
});
dojo.style(ifr,"visibility","hidden");
dojo.style(_27a.domNode,"visibility","hidden");
curam.util.TabNavigation.loadIframe(href,_278);
}
var open=curam.util.TabNavigation.childMenuExists(_277);
curam.util.TabNavigation.toggleChildMenu(open,_278);
},childMenuExists:function(_282){
var _283=_282.id+"-Stack";
var _284=dojo.query("#"+_283+" ul");
if(_284.length==0){
return false;
}else{
return true;
}
},toggleChildMenu:function(open,_285){
var _286=_285+"-navigation-tab";
var _287=dojo.byId(_286);
var _288=dojo.query(".content-area-container",_287)[0];
var _289=dojo.query(".child-nav",_287)[0];
if(!open){
var _28a="0px";
var _28b=((getComputedStyle(_288).direction=="ltr")?{left:_28a}:{right:_28a});
var _28c={width:_28a};
dojo.style(_288,_28b);
dojo.style(_289,_28c);
}else{
var _28d=dojo.attr(_287,"child-menu-width");
var _28b=((getComputedStyle(_288).direction=="ltr")?{left:_28d}:{right:_28d});
var _28c={width:_28d};
dojo.style(_288,_28b);
dojo.style(_289,_28c);
}
},handleChildSelect:function(_28e,_28f,_290){
if(!curam.util.TabNavigation.isSelectable(_28e.parentNode.id)){
dojo.stopEvent(dojo.fixEvent(_290));
return false;
}
var ul=curam.util.TabNavigation.getNext(_28e,"UL");
var _291=ul.childNodes;
for(var i=0;i<_291.length;i++){
dojo.replaceClass(_291[i],"not-selected","selected");
}
dojo.replaceClass(_28e.parentNode,"selected","not-selected");
var href=dojo.attr(_28e,"page-ref");
curam.util.TabNavigation.loadIframe(href,_28f);
return true;
},isSelectable:function(_292){
return !curam.util.TabNavigation.disabledItems[_292];
},getNext:function(_293,_294){
var _295=_293.parentNode;
if(_295==null){
curam.debug.log(_272.getProperty("curam.util.TabNavigation.error",[_294]));
return null;
}
if(_295.nodeName===_294){
return _295;
}else{
var _295=curam.util.TabNavigation.getNext(_295,_294);
return _295;
}
},loadIframe:function(href,_296){
var _297=curam.util.TabNavigation.getIframe(_296);
dojo.attr(_297,"src",href+"&"+this.getCacheBusterParameter());
},getIframe:function(_298){
var _299=_298+"-navigation-tab";
var _29a=dojo.byId(_299);
var _29b=dojo.query("iframe",_29a);
return _29b[0];
},getCacheBusterParameter:function(){
return this.CACHE_BUSTER_PARAM_NAME+"="+new Date().getTime()+"_"+this.CACHE_BUSTER++;
},setupOnParentSelect:function(_29c,_29d,_29e){
var _29f=dojo.byId(_29c+"-navigation-tab");
var _2a0=curam.tab.getContainerTab(_29f);
_2a0.subscribe(_29c+"-child-nav-startup",function(){
curam.util.TabNavigation.onParentSelect(null,_29c);
var tabs=_29e.split(",");
for(tabID in tabs){
var _2a1=curam.util.TabNavigation.findNavItem("navItem_"+this.id+"_"+tabs[tabID]);
if(_2a1!=null){
_2a1.set("curamVisible",false);
}
}
});
_2a0.subscribe(_29d,function(_2a2){
curam.util.TabNavigation.onParentSelect(_2a2,_29c);
});
},setupRefresh:function(_2a3){
curam.util.Refresh.setNavigationCallbacks(curam.util.TabNavigation.updateNavItemStates,curam.util.TabNavigation.getRefreshParams);
var _2a4=function(){
var _2a5=function(_2a6,_2a7){
return curam.util.Refresh.refreshMenuAndNavigation(_2a7,true,true,true);
};
var _2a8=curam.tab.getHandlerForTab(_2a5,_2a3);
var _2a9=curam.util.getTopmostWindow();
var _2aa=_2a9.dojo.subscribe("curam.tabOpened",null,function(_2ab,_2ac){
_2a8(_2ab,_2ac);
_2a9.dojo.unsubscribe(_2aa);
});
};
var _2ad=curam.util.TabNavigation.dynamicNavigationData[_2a3];
_2ad.registerTabOpenHandler=_2a4;
_2ad.registerTabOpenHandler();
},getRefreshParams:function(_2ae){
curam.debug.log("curam.util.TabNavigation.getRefreshParams(%s)",_2ae);
var _2af=curam.util.TabNavigation.dynamicNavigationData[_2ae];
if(!_2af){
curam.debug.log(_272.getProperty("curam.util.TabNavigation.no.dynamic"));
return null;
}
var _2b0="navId="+_2af.navigationId;
_2b0+="&navItemIds="+curam.util.toCommaSeparatedList(_2af.dynamicNavItemIds);
_2b0+="&navLoaders="+curam.util.toCommaSeparatedList(_2af.dynamicNavLoaders);
_2b0+="&navPageParameters="+_2af.pageParameters;
return _2b0;
},updateNavItemStates:function(_2b1,data){
var _2b2=data.navData;
for(var i=0;i<_2b2.itemStates.length;i++){
curam.util.TabNavigation.updateNavItemState(_2b2.itemStates[i],_2b1);
}
},updateNavItemState:function(_2b3,_2b4){
var _2b5=curam.util.TabNavigation.findNavItem("navItem_"+_2b4+"_"+_2b3.id);
if(_2b5!=null){
if(!_2b5.domNode){
curam.util.TabNavigation.disabledItems[_2b5.id]=!_2b3.enabled;
curam.util.swapState(_2b5,_2b3.enabled,"enabled","disabled");
curam.util.swapState(_2b5,_2b3.visible,"visible","hidden");
}else{
_2b5.set("curamDisabled",!_2b3.enabled);
_2b5.set("curamVisible",_2b3.visible);
}
}
},findNavItem:function(_2b6){
var _2b7=dojo.query("."+_2b6);
if(_2b7.length==1){
var node=_2b7[0];
var _2b8=dijit.byNode(node);
if(!_2b8){
return node;
}else{
return _2b8.controlButton;
}
}else{
curam.debug.log(_272.getProperty("curam.util.TabNavigation.item",[_2b6]));
return null;
}
},addRollOverClass:function(_2b9){
dojo.addClass(_2b9.target,"hover");
curam.util.connect(_2b9.target,"onmouseout",function(){
dojo.removeClass(_2b9.target,"hover");
});
},setupOnLoadListener:function(_2ba,_2bb){
var _2bc=dojo.fromJson(_2bb);
var _2bd=function(_2be,_2bf){
curam.util.TabNavigation.handleContentAreaUpdate(_2be,_2bf,_2bc);
};
var _2c0=curam.tab.getHandlerForTab(_2bd,_2ba);
var _2c1=curam.util.getTopmostWindow();
var _2c2=_2c1.dojo.subscribe("/curam/main-content/page/loaded",null,_2c0);
curam.tab.unsubscribeOnTabClose(_2c2,_2ba);
},setupTabList:function(_2c3,_2c4){
if(!curam.util.TabNavigation.tabLists[_2c3]){
curam.tab.executeOnTabClose(function(){
delete curam.util.TabNavigation.tabLists[_2c3];
},_2c3);
}
delete curam.util.TabNavigation.tabLists[_2c3];
curam.util.TabNavigation.tabLists[_2c3]=_2c4;
},handleContentAreaUpdate:function(_2c5,_2c6,_2c7){
var ids=_2c7[_2c5];
if(ids){
var _2c8=ids["dojoTabId"];
var _2c9=_2c8+"-parent-nav";
var _2ca=ids["tabId"];
var _2cb=ids["childId"];
var _2cc=dijit.byId(_2ca);
var _2cd=dijit.byId(_2c9);
if(_2cc){
if(_2cd.selectedChildWidget!=_2cc){
_2cc.setAttribute("curamDoNoReload",true);
_2cd.selectChild(_2cc);
}
if(_2cb){
var _2ce=_2ca+"-Stack";
var _2cf=_2c8+"-child-nav";
var _2d0=dijit.byId(_2cf);
var _2d1=dijit.byId(_2ce);
_2d0.selectChild(_2d1);
var _2d2=dojo.query("li",_2d1.domNode);
for(var i=0;i<_2d2.length;i++){
var _2d3=_2d2[i];
if(_2d3.id==_2cb){
var _2d4=_2d3;
}
}
if(_2d4){
if(!dojo.hasClass(_2d4,"selected")){
var _2d5=_2d4.parentNode.childNodes;
for(var i=0;i<_2d5.length;i++){
dojo.replaceClass(_2d5[i],"not-selected","selected");
}
dojo.replaceClass(_2d4,"selected","not-selected");
}
}
}
}
}
},getInsertIndex:function(_2d6,_2d7,_2d8){
var _2d9=curam.util.TabNavigation.tabLists[_2d6];
var _2da=dojo.indexOf(_2d9,_2d8);
var _2db=_2da;
for(var i=_2da-1;i>=0;i--){
if(dojo.indexOf(_2d7,_2d9[i])<0){
_2db--;
}
}
return _2db;
}});
return curam.util.TabNavigation;
});
},"curam/pagination/ControlPanel":function(){
define("curam/pagination/ControlPanel",["curam/pagination","curam/debug","curam/util"],function(){
var _2dc=dojo.declare("curam.pagination.ControlPanel",null,{first:"FIRST",last:"LAST",previous:"PREV",next:"NEXT",page:"GOTO_PAGE",pageSize:"PAGE_SIZE",rowInfo:"ROW_INFO",classFirst:"first",classLast:"last",classPrevious:"previous",classNext:"next",classPage:"page",classDisplayInfo:"display_info",_controls:undefined,currentPage:0,lastPage:9999,currentPageSize:0,directLinkRangeWidth:3,parentNode:undefined,handlers:undefined,directLinksDisconnects:undefined,constructor:function(_2dd){
this._controls={};
this.handlers={};
this.directLinksDisconnects=[];
var loc=this._localize;
var ul=dojo.create("ul",null,_2dd);
dojo.addClass(ul,"pagination-control-list");
this._controls[this.pageSize]=this._createDropdownControl(this.pageSize,loc("pageSize_title"),ul);
this._controls[this.rowInfo]=this._createDisplayControl(this.rowInfo,loc("pagination_info",["$dummy$","$dummy$","$dummy$"]),ul,null,null);
this._controls[this.first]=this._createLinkControl(this.first,loc("firstPage_btn"),ul,null,this.classFirst,loc("firstPage_title"));
this._controls[this.previous]=this._createLinkControl(this.previous,loc("prevPage_btn"),ul,null,this.classPrevious,loc("prevPage_title"));
this._controls[this.page]=[];
this._controls[this.page].push(this._createLinkControl(this.page,"direct-page-links-section",ul,null,this.classPage,loc("page_title")));
this._controls[this.next]=this._createLinkControl(this.next,loc("nextPage_btn"),ul,null,this.classNext,loc("nextPage_title"));
this._controls[this.last]=this._createLinkControl(this.last,loc("lastPage_btn"),ul,null,this.classLast,loc("lastPage_title"));
this.parentNode=_2dd;
dojo.style(_2dd,{"display":""});
},_localize:function(_2de,_2df){
var _2e0=curam.pagination.localizedStrings[_2de];
if(!_2df){
return _2e0;
}
for(var i=0;i<_2df.length;i++){
_2e0=_2e0.replace(/%s/i,_2df[i]);
}
return _2e0;
},_createLinkControl:function(_2e1,text,_2e2,_2e3,_2e4,_2e5){
var cls=_2e4!=null?_2e4:"";
var li=dojo.create("li",{"id":_2e1,"class":cls},_2e2,_2e3);
dojo.addClass(li,"pagination-control-list-item enabled");
var a=dojo.create("a",{"innerHTML":text,"href":"#","title":_2e5},li);
dojo.addClass(a,"pagination-link");
if(_2e1==this.first||_2e1==this.last||_2e1==this.previous||_2e1==this.next){
if(curam.util.highContrastModeType()){
var _2e6="../CDEJ/themes/v6/images/high-contrast/"+_2e1+"-contrast"+".png";
dojo.create("img",{"src":_2e6,"alt":_2e5},a);
}else{
var _2e6="../CDEJ/themes/v6/images/"+_2e1+".png";
dojo.create("img",{"src":_2e6,"alt":_2e5},a);
}
}else{
var text=dojo.create("p",{"innerHTML":text},li);
dojo.addClass(text,"pagination-text");
}
return li;
},_createDropdownControl:function(_2e7,text,_2e8,_2e9){
var li=dojo.create("li",{"id":_2e7},_2e8,_2e9);
dojo.addClass(li,"pagination-control-list-item");
var _2ea="page-size-select"+new Date().getTime();
var _2eb=dojo.create("label",{"innerHTML":text+": ","for":_2ea},li);
dojo.addClass(_2eb,"pagination-page-size-dropdown-label");
var _2ec=dojo.create("select",{"title":text,"id":_2ea},li);
li._type="dropdown";
return li;
},_createDisplayControl:function(_2ed,text,_2ee,_2ef,_2f0){
var cls=_2f0!=null?_2f0:"";
var li=dojo.create("li",{"id":_2ed,"class":cls},_2ee,_2ef);
dojo.addClass(li,"pagination-control-list-item");
var text=dojo.create("p",{"innerHTML":"["+text+"]"},li);
return li;
},updateState:function(_2f1){
curam.debug.log("curam.pagination.ControlPanel.updateState: ",_2f1);
if(typeof (_2f1.first)!="undefined"){
this._setEnabled(this._controls[this.first],_2f1.first);
}
if(typeof (_2f1.previous)!="undefined"){
this._setEnabled(this._controls[this.previous],_2f1.previous);
}
if(typeof (_2f1.next)!="undefined"){
this._setEnabled(this._controls[this.next],_2f1.next);
}
if(typeof (_2f1.last)!="undefined"){
this._setEnabled(this._controls[this.last],_2f1.last);
}
if(typeof (_2f1.currentPage)!="undefined"){
this.currentPage=_2f1.currentPage;
}
if(typeof (_2f1.lastPage)!="undefined"){
this.lastPage=_2f1.lastPage;
}
if(typeof (_2f1.currentPageSize)!="undefined"){
this.currentPageSize=_2f1.currentPageSize;
}
if(typeof (_2f1.directLinkRangeWidth)!="undefined"){
this.directLinkRangeWidth=_2f1.directLinkRangeWidth;
}
if(typeof (_2f1.rowInfo)!="undefined"){
var _2f2=this._controls[this.rowInfo].previousSibling;
dojo.destroy(this._controls[this.rowInfo]);
var _2f3=_2f1.rowInfo[0];
var end=_2f1.rowInfo[1];
var _2f4=_2f1.rowInfo[2];
var _2f5=this._localize("pagination_info",[_2f3,end,_2f4]);
this._controls[this.rowInfo]=this._createDisplayControl(this.rowInfo,_2f5,_2f2,"after",this.classDisplayInfo);
}
if(typeof (_2f1.pageSizeOptions)!="undefined"){
var _2f6=dojo.query("select",this._controls[this.pageSize])[0];
dojo.forEach(_2f6.childNodes,function(item){
dojo.destroy(item);
});
for(var i=0;i<_2f1.pageSizeOptions.length;i++){
var _2f7=_2f1.pageSizeOptions[i];
var _2f8=dojo.create("option",{"value":_2f7,"innerHTML":_2f7},_2f6);
if(_2f7==this.currentPageSize){
dojo.attr(_2f8,"selected","selected");
}
}
}
this._updateDirectLinks();
var _2f9=dijit.byId("content");
if(_2f9){
_2f9.resize();
}
},setHandlers:function(_2fa){
curam.debug.log("curam.pagination.ControlPanel.setHandlers: ",_2fa);
this.handlers=_2fa;
if(_2fa.first){
this._connectSimpleHandler(this._controls[this.first],_2fa.first);
}
if(_2fa.previous){
this._connectSimpleHandler(this._controls[this.previous],_2fa.previous);
}
if(_2fa.next){
this._connectSimpleHandler(this._controls[this.next],_2fa.next);
}
if(_2fa.last){
this._connectSimpleHandler(this._controls[this.last],_2fa.last);
}
if(_2fa.page){
this._connectDirectLinkHandlers(_2fa.page);
}
if(_2fa.pageSize){
var _2fb=dojo.query("select",this._controls[this.pageSize])[0];
dojo.connect(_2fb,"onchange",dojo.hitch(this,function(_2fc){
var _2fd=_2fc.target.value;
this.currentPageSize=_2fd;
_2fa.pageSize(this.currentPageSize);
var _2fe=dojo.query("option",_2fb);
_2fe.forEach(function(_2ff){
if(dojo.attr(_2ff,"value")==_2fd){
dojo.attr(_2ff,"selected","selected");
}else{
dojo.removeAttr(_2ff,"selected");
}
});
}));
}
},_connectSimpleHandler:function(_300,_301){
var h=_301?_301:_300._handler;
this._removeSimpleHandler(_300);
var _302=curam.util.connect(_300,"onclick",function(_303){
dojo.stopEvent(_303);
h();
});
_300._handler=h;
_300._disconnect=_302;
},_removeSimpleHandler:function(_304){
if(_304._disconnect){
curam.util.disconnect(_304._disconnect);
}
},reset:function(){
curam.debug.log("curam.pagination.ControlPanel.reset");
},_getDirectLinkPageNumbers:function(){
var _305=2*this.directLinkRangeWidth+1;
var p=this.currentPage;
var _306=[];
var num=p>this.directLinkRangeWidth?p-this.directLinkRangeWidth:1;
for(var i=0;i<_305;i++){
_306[i]=num++;
if(num>this.lastPage){
break;
}
}
return _306;
},_updateDirectLinks:function(){
curam.debug.log("curam.pagination.ControlPanel._updateDirectLinks");
var loc=this._localize;
var _307=this._controls[this.page];
dojo.query("div.pagination-direct-links-dots").forEach(dojo.destroy);
var _308=_307[0].previousSibling;
dojo.style(this.parentNode,"display","none");
for(var i=0;i<_307.length;i++){
if(_307._dots){
dojo.destroy(_307._dots);
}
dojo.destroy(_307[i]);
_307[i]=undefined;
}
this._controls[this.page]=[];
_307=this._controls[this.page];
var _309=this._getDirectLinkPageNumbers();
for(var i=0;i<_309.length;i++){
var _30a=_309[i];
_307[i]=this._createLinkControl(this.page+"("+_30a+")",_30a,_308,"after",null,loc("page_title")+" "+_30a);
dojo.addClass(_307[i],"pagination-direct-link");
if(_30a==this.currentPage){
dojo.addClass(_307[i],"selected");
}
_308=_307[i];
_307[i]._pageNum=_30a;
}
var _30b=_307[0];
dojo.addClass(_30b,"firstDirectLink");
if(_309[0]>1){
dojo.addClass(_30b,"has-previous");
var dots=dojo.create("div",{innerHTML:"..."},_30b,"before");
dojo.addClass(dots,"pagination-direct-links-dots");
}
var _30c=_307[_307.length-1];
dojo.addClass(_30c,"lastDirectLink");
if(_309[_309.length-1]<this.lastPage){
dojo.addClass(_30c,"has-next");
var dots=dojo.create("div",{innerHTML:"..."},_30c,"after");
dojo.addClass(dots,"pagination-direct-links-dots");
}
if(this.handlers.page){
this._connectDirectLinkHandlers(this.handlers.page);
}
dojo.style(this.parentNode,"display","");
},_connectDirectLinkHandlers:function(_30d){
dojo.forEach(this.directLinksDisconnects,dojo.disconnect);
this.directLinksDisconnects=[];
var _30e=this._controls[this.page];
for(var i=0;i<_30e.length;i++){
var _30f=_30e[i];
var h=function(_310){
dojo.stopEvent(_310);
_30d(this._pageNum);
};
h._pageNum=_30f._pageNum;
this.directLinksDisconnects.push(dojo.connect(_30f,"onclick",h));
}
},_setEnabled:function(_311,_312){
if(_312){
this._connectSimpleHandler(_311);
dojo.replaceClass(_311,"enabled","disabled");
}else{
this._removeSimpleHandler(_311);
dojo.replaceClass(_311,"disabled","enabled");
}
}});
return _2dc;
});
},"url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n","dijit/form/MappedTextBox":function(){
define("dijit/form/MappedTextBox",["dojo/_base/declare","dojo/dom-construct","./ValidationTextBox"],function(_313,_314,_315){
return _313("dijit.form.MappedTextBox",_315,{postMixInProperties:function(){
this.inherited(arguments);
this.nameAttrSetting="";
},_setNameAttr:null,serialize:function(val){
return val.toString?val.toString():"";
},toString:function(){
var val=this.filter(this.get("value"));
return val!=null?(typeof val=="string"?val:this.serialize(val,this.constraints)):"";
},validate:function(){
this.valueNode.value=this.toString();
return this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.valueNode=_314.place("<input type='hidden'"+(this.name?" name='"+this.name.replace(/'/g,"&quot;")+"'":"")+"/>",this.textbox,"after");
},reset:function(){
this.valueNode.value="";
this.inherited(arguments);
}});
});
},"url:dijit/form/templates/Select.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tdata-dojo-attach-point=\"_buttonNode,tableNode,focusNode\" cellspacing='0' cellpadding='0'\n\trole=\"combobox\" aria-haspopup=\"true\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonContents dijitButtonNode\" role=\"presentation\"\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"  data-dojo-attach-point=\"containerNode,_popupStateNode\"></span\n\t\t\t><input type=\"hidden\" ${!nameAttrSetting} data-dojo-attach-point=\"valueNode\" value=\"${value}\" aria-hidden=\"true\"\n\t\t/></td><td class=\"dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton\"\n\t\t\t\tdata-dojo-attach-point=\"titleNode\" role=\"presentation\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t></tr></tbody\n></table>\n","dojox/layout/ContentPane":function(){
define("dojox/layout/ContentPane",["dojo/_base/lang","dojo/_base/xhr","dijit/layout/ContentPane","dojox/html/_base","dojo/_base/declare"],function(lang,_316,_317,_318,_319){
return _319("dojox.layout.ContentPane",_317,{adjustPaths:false,cleanContent:false,renderStyles:false,executeScripts:true,scriptHasHooks:false,constructor:function(){
this.ioArgs={};
this.ioMethod=_316.get;
},onExecError:function(e){
},_setContent:function(cont){
var _31a=this._contentSetter;
if(!(_31a&&_31a instanceof _318._ContentSetter)){
_31a=this._contentSetter=new _318._ContentSetter({node:this.containerNode,_onError:lang.hitch(this,this._onError),onContentError:lang.hitch(this,function(e){
var _31b=this.onContentError(e);
try{
this.containerNode.innerHTML=_31b;
}
catch(e){
console.error("Fatal "+this.id+" could not change content due to "+e.message,e);
}
})});
}
this._contentSetterParams={adjustPaths:Boolean(this.adjustPaths&&(this.href||this.referencePath)),referencePath:this.href||this.referencePath,renderStyles:this.renderStyles,executeScripts:this.executeScripts,scriptHasHooks:this.scriptHasHooks,scriptHookReplacement:"dijit.byId('"+this.id+"')"};
this.inherited("_setContent",arguments);
}});
});
},"curam/date/locale":function(){
define("curam/date/locale",["curam/define","dojo/_base/lang","dojo/date/locale"],function(_31c,lang,_31d){
var _31e=_31d._getGregorianBundle;
function _31f(_320){
var _321=_31e(_320);
if(LOCALIZED_MONTH_NAMES){
_321["months-format-abbr"]=LOCALIZED_SHORT_MONTH_NAMES;
_321["months-format-wide"]=LOCALIZED_MONTH_NAMES;
}
return _321;
};
_31c.singleton("curam.date.locale",{});
lang.mixin(curam.date.locale,_31d);
curam.date.locale.format=function(_322,_323){
_31d._getGregorianBundle=_31f;
var _324=_31d.format(_322,_323);
_31d._getGregorianBundle=_31e;
return _324;
};
curam.date.locale.parse=function(_325,_326){
_31d._getGregorianBundle=_31f;
var _327=_31d.parse(_325,_326);
_31d._getGregorianBundle=_31e;
return _327;
};
return curam.date.locale;
});
},"curam/util/WordFileEdit":function(){
define("curam/util/WordFileEdit",["curam/define","dijit/DialogUnderlay","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _328=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.WordFileEdit",{_clickedFinish:false,_buttonIdPart:"__o3btn.",searchWindow:null,cantLoadControlMsg:"$unlocalized$ cannot load Word integration control",cantSubmitMsg:"$unlocalized$ cannot submit data",searchWindowTitlePrefix:"SEARCH",useApplet:(function(){
return typeof dojo.isIE=="undefined";
})(),controlAttributes:{},controlParameters:{},submitSaveWordFileEdit:function(_329,_32a){
try{
var _32b=curam.util.WordFileEdit.getParentWindow();
var _32c=curam.util.WordFileEdit._findTextArea(_32b,_329);
_32c.value=_32a;
_32b.document.forms[0].submit();
}
catch(e){
alert("Error saving: "+dojo.toJson(e));
}
return;
},openWordFileEditWindow:function(_32d,_32e,_32f){
if(curam.util.WordFileEdit.getSearchPage().length>0){
curam.util.WordFileEdit.displaySearchWindow(_32d,_32e,_32f);
}else{
curam.util.WordFileEdit.doOpenWordFileEditWindow(_32d,_32e,_32f);
}
},doOpenWordFileEditWindow:function(_330,_331,_332){
var _333=100;
var _334=100;
var _335=Math.floor((screen.width-_333)/2);
var _336=Math.floor((screen.height-_334)/2);
window.open("../word-file-edit.jsp?id="+_330+"&document-field="+_331+"&details-field="+_332,new Date().valueOf(),"toolbar=no,menubar=no,location=no,scrollbars=no,"+"resizable=no,top="+_336+",left="+_335+",width="+_333+",height="+_334);
},displaySearchWindow:function(_337,_338,_339,_33a){
if(!_33a){
_33a=0;
}
if(_33a>3){
return;
}
if(_33a==0){
curam.util.WordFileEdit.searchWindow=window.open("about:blank","searchWindow","left=40000,top=40000,scrollbars=yes");
}
var _33b=false;
try{
var _33c=curam.util.WordFileEdit.searchWindow.document.title;
if(_33c.indexOf(searchWindowTitlePrefix+":")==-1){
curam.util.WordFileEdit.searchWindow.document.title=searchWindowTitlePrefix+":"+_337;
}else{
_33b=true;
}
_33c=curam.util.WordFileEdit.searchWindow.document.title;
if(!_33b&&_33c.indexOf(searchWindowTitlePrefix+":")!=-1){
_33b=true;
}
}
catch(e){
}
if(!_33b){
_33a++;
window.setTimeout("displaySearchWindow('"+_337+"','"+_338+"','"+_339+"',"+_33a+")",500);
}else{
curam.util.WordFileEdit.doOpenWordFileEditWindow(_337,_338,_339);
}
},redisplaySearchWindow:function(_33d,_33e){
if(!_33e){
_33e=0;
}
if(_33e>3){
return;
}
if(_33e==0){
curam.util.WordFileEdit.searchWindow=window.open("about:blank","searchWindow","left=40000,top=40000");
}
var _33f=false;
try{
var _340=curam.util.WordFileEdit.searchWindow.document.title;
if(_340.indexOf(searchWindowTitlePrefix+":")==-1){
curam.util.WordFileEdit.searchWindow.document.title=searchWindowTitlePrefix+":"+_33d;
}else{
_33f=true;
}
_340=curam.util.WordFileEdit.searchWindow.document.title;
if(!_33f&&_340.indexOf(searchWindowTitlePrefix+":")!=-1){
_33f=true;
}
}
catch(e){
}
if(!_33f){
_33e++;
window.setTimeout("redisplaySearchWindow('"+_33d+"',"+_33e+")",500);
}
},getSearchPage:function(_341){
var _342="";
try{
if(!_341){
_342=document.getElementById("searchPage").value;
}else{
var _343=curam.util.WordFileEdit.getParentWindow();
_342=_343.document.getElementById("searchPage").value;
}
}
catch(e){
}
return _342;
},initialize:function(_344){
var _345=curam.util.WordFileEdit.getParentWindow();
try{
var _346=dojo.byId(_344);
if(typeof _346!="undefined"){
curam.util.WordFileEdit._setOverlay(true);
if(curam.util.WordFileEdit.useApplet){
if(!dojo.isIE){
var _347=_345.frameElement;
curam.util.connect(_347,"onload",function(evt){
var _348=dojo.fixEvent(evt,_347);
var url=_347.contentWindow.location.href;
try{
_346.mainApplicationPageLoaded(url);
}
catch(e){
alert("Error calling mainApplicationPageLoaded on applet: "+e.message);
}
});
_345.top.dojo.addOnUnload(function(){
_346.mainApplicationPageUnloaded();
});
}
}else{
_346.openDocument();
}
}else{
curam.util.WordFileEdit._setOverlay(false);
curam.util.WordFileEdit.closeAppletWindow();
}
}
catch(e){
curam.util.WordFileEdit._setOverlay(false);
curam.util.WordFileEdit.closeAppletWindow();
_345.curam.util.WordFileEdit.cannotLoadControl(e);
}
},_setOverlay:function(_349){
try{
var _34a=curam.util.WordFileEdit.getParentWindow();
var _34b=(_34a!=null)?_34a.curam.util.getTopmostWindow():curam.util.getTopmostWindow();
if(_34b!=window){
_34b.dojo.require("curam/util/WordFileEdit");
_34b.curam.util.WordFileEdit._setOverlay(_349);
return;
}
if(!curam.util.WordFileEdit._overlay){
curam.util.WordFileEdit._overlay=new dijit.DialogUnderlay({dialogId:"dummy","class":"word-file-edit-overlay"});
}
var ovr=curam.util.WordFileEdit._overlay;
if(_349){
dojo.style(ovr.domNode,"zIndex",9999);
ovr.show();
}else{
ovr.hide();
}
}
catch(e){
alert("_setOverlay ERROR: "+e.message);
}
},cannotLoadControl:function(e){
var msg=dojo.isIE&&!curam.util.WordFileEdit.useApplet?curam.util.WordFileEdit.cantLoadControlMsgIE:curam.util.WordFileEdit.cantLoadControlMsg;
alert(msg+"\rERROR: "+e.message);
history.go(-1);
},setStatusTextWordFileEditWindow:function(text){
try{
document.getElementById("statustext").innerHTML=text;
}
catch(e){
}
},getWordFileEditParentTextareaValue:function(_34c){
var _34d="";
try{
var _34e=curam.util.WordFileEdit.getParentWindow();
var _34f=curam.util.WordFileEdit._findTextArea(_34e,_34c);
_34d=_34f.value;
}
catch(e){
alert("getWordFileEditParentTextareaValue('"+_34c+"'): \r"+e.message);
}
return _34d;
},_findTextArea:function(_350,_351,_352){
var _353=null;
if(!_352){
_353=_350.dojo.query("input[name='"+_351+"']",_350.dojo.body())[0];
}else{
_353=_350.dojo.query("input[name$='"+_351+"']",_350.dojo.body())[0];
}
return _353;
},finishedWordFileEditWindow:function(_354,_355,_356){
if(!curam.util.WordFileEdit._clickedFinish){
curam.util.WordFileEdit.doFinishWordFileEditWindow(_354,_355,_356);
curam.util.WordFileEdit._clickedFinish=true;
}
},doFinishWordFileEditWindow:function(_357,_358,_359){
var _35a=false;
var _35b=false;
try{
var _35c=curam.util.WordFileEdit.getParentWindow();
if(_358&&_359){
_35b=true;
var _35d=curam.util.WordFileEdit._findTextArea(_35c,_358);
_35d.value=_359;
}
var _35e=_35c.dojo.query("form input");
for(var i=0;i<_35e.length&&!_35a;i++){
if(_35e[i].id.substring(0,curam.util.WordFileEdit._buttonIdPart.length).toLowerCase()==curam.util.WordFileEdit._buttonIdPart.toLowerCase()){
_35a=true;
if(!_35b){
var _35d=curam.util.WordFileEdit._findTextArea(_35c,_358);
_35d.value="";
var _35f=false;
var _360;
var _361=_35e[i];
try{
while(_361.tagName.toUpperCase()!="BODY"&&!_35f){
if(_361.tagName.toUpperCase()=="FORM"){
_35f=true;
_360=_361;
}else{
_361=_361.parentElement;
}
}
}
catch(e){
alert("doFinishWordFileEditWindow: "+e.message);
}
if(_35f){
var _362="<input type=\"hidden\" name=\"__o3NoSave\" value=\"true\"/>";
_360.innerHTML+=_362;
}
}
_35c.curam.util.clickButton(_35e[i].id);
if(_357.length>0){
_35c.document.body.innerHTML=_357;
}
curam.util.WordFileEdit._setOverlay(false);
return;
}
}
if(!_35a){
alert(curam.util.WordFileEdit.cantSubmitMsg);
try{
curam.util.WordFileEdit._setOverlay(false);
curam.util.WordFileEdit.closeAppletWindow();
}
catch(e){
}
}
}
catch(e){
alert("doFinishWordFileEditWindow: "+e.message);
curam.util.WordFileEdit._setOverlay(false);
curam.util.WordFileEdit.closeAppletWindow();
}
},screenAlertWordFileEditWindow:function(_363){
try{
curam.util.WordFileEdit.getParentWindow().alert(_363);
}
catch(e){
}
},hideSubmitButtons:function(){
dojo.query("a.ac").forEach(function(item){
item.style.display="none";
});
},getParentWindow:function(){
return window.opener;
},getUrls:function(){
try{
var _364=curam.util.WordFileEdit.getParentWindow();
var doc=_364.document;
var _365=doc.URL;
var _366=_364.dojo.query("form",doc)[0];
var _367=_366.action;
var _368=_365.substr(0,_365.lastIndexOf("/")+1);
window.curam.util.WordFileEdit.urlPath_return_value=_368;
var _369=(dojo.isIE>=8)?_367:_368+_367;
window.curam.util.WordFileEdit.allowedUrl_return_value=_369;
return [_368,_369];
}
catch(e){
alert("getUrls: "+dojo.toJson(e));
}
},getTitle:function(){
var _36a=curam.util.WordFileEdit.getParentWindow().top.document.title;
curam.util.WordFileEdit.title_return_value=_36a;
window.curam_wordIntegration_title_return_value=_36a;
return _36a;
},setTitle:function(_36b){
curam.util.WordFileEdit.getParentWindow().top.document.title=_36b;
},hasNamedInput:function(_36c){
var _36d=curam.util.WordFileEdit.getParentWindow();
var _36e=_36c.slice(1);
var _36f=curam.util.WordFileEdit._findTextArea(_36d,_36e,true);
return _36f?true:false;
},closeAppletWindow:function(){
self.close();
},runApplet:function(id){
if(typeof deployJava!="undefined"){
var _370=deployJava.getPlugin();
if(_370){
curam.debug.log(_328.getProperty("curam.util.WordFileEdit.version"),_370.version);
}else{
curam.debug.log(_328.getProperty("curam.util.WordFileEdit.no.plugin"));
}
}else{
curam.debug.log(_328.getProperty("curam.util.WordFileEdit.no.java"));
}
if(typeof deployJava=="undefined"||(!dojo.isChrome&&!deployJava.isPlugin2())){
alert(curam.util.WordFileEdit.noJavaInstalled);
}else{
dojo.mixin(curam.util.WordFileEdit.controlAttributes,{id:id});
var _371=dojo.create("div",{style:"display:none"});
var _372=dojo.create("applet",curam.util.WordFileEdit.controlAttributes,_371);
var _373=curam.util.WordFileEdit.controlParameters;
for(property in _373){
dojo.create("param",{name:property,value:_373[property]},_372);
}
var _374=_371.innerHTML;
dojo.destroy(_371);
document.write(_374);
}
}});
return curam.util.WordFileEdit;
});
},"dojo/dnd/Moveable":function(){
define("dojo/dnd/Moveable",["../main","../Evented","../touch","./Mover"],function(dojo,_375,_376){
dojo.declare("dojo.dnd.Moveable",[_375],{handle:"",delay:0,skip:false,constructor:function(node,_377){
this.node=dojo.byId(node);
if(!_377){
_377={};
}
this.handle=_377.handle?dojo.byId(_377.handle):null;
if(!this.handle){
this.handle=this.node;
}
this.delay=_377.delay>0?_377.delay:0;
this.skip=_377.skip;
this.mover=_377.mover?_377.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,_376.press,this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")];
},markupFactory:function(_378,node,ctor){
return new ctor(node,_378);
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null;
},onMouseDown:function(e){
if(this.skip&&dojo.dnd.isFormElement(e)){
return;
}
if(this.delay){
this.events.push(dojo.connect(this.handle,_376.move,this,"onMouseMove"),dojo.connect(this.handle,_376.release,this,"onMouseUp"));
this._lastX=e.pageX;
this._lastY=e.pageY;
}else{
this.onDragDetected(e);
}
dojo.stopEvent(e);
},onMouseMove:function(e){
if(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay){
this.onMouseUp(e);
this.onDragDetected(e);
}
dojo.stopEvent(e);
},onMouseUp:function(e){
for(var i=0;i<2;++i){
dojo.disconnect(this.events.pop());
}
dojo.stopEvent(e);
},onSelectStart:function(e){
if(!this.skip||!dojo.dnd.isFormElement(e)){
dojo.stopEvent(e);
}
},onDragDetected:function(e){
new this.mover(this.node,e,this);
},onMoveStart:function(_379){
dojo.publish("/dnd/move/start",[_379]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem");
},onMoveStop:function(_37a){
dojo.publish("/dnd/move/stop",[_37a]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem");
},onFirstMove:function(_37b,e){
},onMove:function(_37c,_37d,e){
this.onMoving(_37c,_37d);
var s=_37c.node.style;
s.left=_37d.l+"px";
s.top=_37d.t+"px";
this.onMoved(_37c,_37d);
},onMoving:function(_37e,_37f){
},onMoved:function(_380,_381){
}});
return dojo.dnd.Moveable;
});
},"dojo/store/util/QueryResults":function(){
define("dojo/store/util/QueryResults",["../../_base/array","../../_base/lang","../../_base/Deferred"],function(_382,lang,_383){
var util=lang.getObject("dojo.store.util",true);
util.QueryResults=function(_384){
if(!_384){
return _384;
}
if(_384.then){
_384=lang.delegate(_384);
}
function _385(_386){
if(!_384[_386]){
_384[_386]=function(){
var args=arguments;
return _383.when(_384,function(_387){
Array.prototype.unshift.call(args,_387);
return util.QueryResults(_382[_386].apply(_382,args));
});
};
}
};
_385("forEach");
_385("filter");
_385("map");
if(!_384.total){
_384.total=_383.when(_384,function(_388){
return _388.length;
});
}
return _384;
};
return util.QueryResults;
});
},"url:dijit/layout/templates/_ScrollingTabControllerButton.html":"<div data-dojo-attach-event=\"onclick:_onClick\">\n\t<div role=\"presentation\" class=\"dijitTabInnerDiv\" data-dojo-attach-point=\"innerDiv,focusNode\">\n\t\t<div role=\"presentation\" class=\"dijitTabContent dijitButtonContents\" data-dojo-attach-point=\"tabContent\">\n\t\t\t<img role=\"presentation\" alt=\"\" src=\"${_blankGif}\" class=\"dijitTabStripIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t\t<span data-dojo-attach-point=\"containerNode,titleNode\" class=\"dijitButtonText\"></span>\n\t\t</div>\n\t</div>\n</div>","curam/pagination/DefaultListModel":function(){
define("curam/pagination/DefaultListModel",["curam/debug","curam/pagination","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _389=new curam.util.ResourceBundle("Debug");
var _38a=dojo.declare("curam.pagination.DefaultListModel",null,{_rowCount:null,constructor:function(_38b){
this.tableNode=dojo.query("table.paginated-list-id-"+_38b)[0];
if(!this.tableNode){
throw "Table node for ID "+_38b+" not found - failing!";
}
curam.debug.log("curam.pagination.DefaultListModel "+_389.getProperty("curam.pagination.DefaultListModel"),this.tableNode);
this._id=_38b;
},getId:function(){
return this._id;
},getRowCount:function(){
if(this._rowCount==null){
this._rowCount=0;
var _38c=dojo.query("tbody > script.hidden-list-rows",this.tableNode);
for(var i=0;i<_38c.length;i++){
var _38d=_38c[i];
var _38e=(i==_38c.length-1);
if(!_38e){
this._rowCount+=curam.pagination.getNumRowsInBlock(_38d);
}else{
curam.pagination.unpackRows(_38d);
}
}
var _38f=dojo.query("tbody > tr",this.tableNode).length;
this._rowCount+=_38f;
}
return this._rowCount;
},hideRange:function(_390,_391){
var rows=this._getRowNodes(_390,_391);
for(var i=_390;i<=_391;i++){
dojo.style(rows[i-1],{"display":"none"});
dojo.removeClass(rows[i-1],"even-last-row");
dojo.removeClass(rows[i-1],"odd-last-row");
}
},showRange:function(_392,_393){
var rows=this._getRowNodes(_392,_393);
var _394=(_393%2==0)?"even-last-row":"odd-last-row";
dojo.addClass(rows[_393-1],_394);
for(var i=_392;i<=_393;i++){
dojo.style(rows[i-1],{"display":""});
}
},_getRowNodes:function(_395,_396){
var _397=curam.pagination.readListContent(this.tableNode);
for(var i=1;i<=_396&&i<=_397.length;i++){
var node=_397[i-1];
if(node.tagName=="SCRIPT"){
curam.pagination.unpackRows(node);
_397=curam.pagination.readListContent(this.tableNode);
i--;
}
}
return dojo.query("tbody > tr",this.tableNode);
}});
return _38a;
});
},"dijit/form/DropDownButton":function(){
require({cache:{"url:dijit/form/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n"}});
define("dijit/form/DropDownButton",["dojo/_base/declare","dojo/_base/lang","dojo/query","../registry","../popup","./Button","../_Container","../_HasDropDown","dojo/text!./templates/DropDownButton.html"],function(_398,lang,_399,_39a,_39b,_39c,_39d,_39e,_39f){
return _398("dijit.form.DropDownButton",[_39c,_39d,_39e],{baseClass:"dijitDropDownButton",templateString:_39f,_fillContent:function(){
if(this.srcNodeRef){
var _3a0=_399("*",this.srcNodeRef);
this.inherited(arguments,[_3a0[0]]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
if(!this.dropDown&&this.dropDownContainer){
var _3a1=_399("[widgetId]",this.dropDownContainer)[0];
this.dropDown=_39a.byNode(_3a1);
delete this.dropDownContainer;
}
if(this.dropDown){
_39b.hide(this.dropDown);
}
this.inherited(arguments);
},isLoaded:function(){
var _3a2=this.dropDown;
return (!!_3a2&&(!_3a2.href||_3a2.isLoaded));
},loadDropDown:function(_3a3){
var _3a4=this.dropDown;
var _3a5=_3a4.on("load",lang.hitch(this,function(){
_3a5.remove();
_3a3();
}));
_3a4.refresh();
},isFocusable:function(){
return this.inherited(arguments)&&!this._mouseDown;
}});
});
},"dojo/regexp":function(){
define("dojo/regexp",["./_base/kernel","./_base/lang"],function(dojo,lang){
lang.getObject("regexp",true,dojo);
dojo.regexp.escapeString=function(str,_3a6){
return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_3a6&&_3a6.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
dojo.regexp.buildGroupRE=function(arr,re,_3a7){
if(!(arr instanceof Array)){
return re(arr);
}
var b=[];
for(var i=0;i<arr.length;i++){
b.push(re(arr[i]));
}
return dojo.regexp.group(b.join("|"),_3a7);
};
dojo.regexp.group=function(_3a8,_3a9){
return "("+(_3a9?"?:":"")+_3a8+")";
};
return dojo.regexp;
});
},"curam/layout/TabContainer":function(){
require({cache:{"url:curam/layout/resources/TabContainer.html":"<div class=\"dijitTabContainer\">\r\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\r\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer dijitAlignTop\"></div>\r\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container dijitAlignClient\" data-dojo-attach-point=\"containerNode\"></div>\r\n</div>\r\n"}});
define("curam/layout/TabContainer",["dijit/layout/TabContainer","dojo/text!curam/layout/resources/TabContainer.html"],function(_3aa,_3ab){
var _3ac=dojo.declare("curam.layout.TabContainer",_3aa,{templateString:_3ab,_theSelectedTabIndex:0,_thePage:null,_theChildren:null,postCreate:function(){
this.inherited(arguments);
var tl=this.tablist;
this.connect(tl,"onRemoveChild","_changeTab");
},_changeTab:function(){
if(this._beingDestroyed){
this._thePage=null;
this._theChildren=null;
return;
}
if(this._theChildren==null){
return;
}
if(this._theChildren[this._theSelectedTabIndex]!=this._thePage){
this.selectChild(this._theChildren[this._theSelectedTabIndex]);
this._thePage=null;
this._theChildren=null;
return;
}
if(this._theChildren.length<1){
this._thePage=null;
return;
}else{
if(this._theChildren.length==1){
this.selectChild(this._theChildren[this._theChildren.length-1]);
this._thePage=null;
this._theChildren=null;
}else{
if(this._theSelectedTabIndex==(this._theChildren.length-1)){
this.selectChild(this._theChildren[this._theChildren.length-2]);
}else{
if(this._theSelectedTabIndex==0){
this.selectChild(this._theChildren[1]);
}else{
if(this._theChildren.length>2){
this.selectChild(this._theChildren[this._theSelectedTabIndex+1]);
}
}
}
this._thePage=null;
this._theChildren=null;
}
}
},removeChild:function(page){
if(this._started&&!this._beingDestroyed){
var _3ad=this.getChildren();
var i=0;
var _3ae=0;
for(i=0;i<_3ad.length;i++){
if(_3ad[i].get("selected")){
_3ae=i;
break;
}
}
this._theSelectedTabIndex=_3ae;
this._thePage=page;
this._theChildren=_3ad;
}
this.inherited(arguments);
}});
return _3ac;
});
},"url:curam/layout/resources/ModalUIMController.html":"<div id=\"uimcontroller_${uid}\" class=\"uimcontroller_${uid} uimController ${classList}\" data-dojo-attach-point=\"uimController\">\r\n  <div style=\"display:none;\" \r\n       id=\"uimcontroller_tc_${uid}\" \r\n       class=\"ipnTabController in-page-nav-tabContainer\"\r\n       data-dojo-attach-point=\"tabController\" \r\n       data-dojo-type=\"curam.layout.TabContainer\">\r\n  </div>\r\n  <div class=\"contentPanelFrameWrapper3\"  \r\n        data-dojo-attach-point=\"frameWrapper\">\r\n    <iframe frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\"\r\n             allowTransparency=\"true\" \r\n             id=\"${iframeId}\" \r\n             data-dojo-attach-point=\"frame\"                 \r\n             class=\"${iframeId} ${iframeClassList}\"\r\n             iscpiframe=\"${iscpiframe}\"\r\n             title=\"${title}\" >\r\n    </iframe>\r\n    <span tabIndex=\"0\" class=\"hidden\" id=\"end-${uid}\">${endModalUIMController}</span>\r\n  </div> \r\n</div>","curam/ui/SectionShortcutsPanel":function(){
define("curam/ui/SectionShortcutsPanel",["curam/define","curam/tab","curam/util","curam/ui/UIController"],function(){
var _3af=curam.define.singleton("curam.ui.SectionShortcutsPanel",{handleClickOnAnchorElement:function(_3b0,_3b1){
if(!_3b1){
curam.tab.getTabController().handleUIMPageID(_3b0);
}else{
curam.ui.SectionShortcutsPanel.openInModal(_3b0);
}
},handleClick:function(_3b2,item){
var _3b3=eval(_3b2+"JsonStore");
var _3b4=_3b3.getValue(item,"pageID");
var _3b5=_3b3.getValue(item,"openInModal");
if(!_3b5){
curam.tab.getTabController().handleUIMPageID(_3b4);
}else{
curam.ui.SectionShortcutsPanel.openInModal(_3b4);
}
},openInModal:function(_3b6){
var _3b7=_3b6+"Page.do";
var _3b8={};
curam.tab.getTabController().handleLinkClick(_3b7,_3b8);
},setupCleanupScript:function(_3b9){
dojo.ready(function(){
var _3ba=eval(_3b9+"JsonStore");
dojo.addOnWindowUnload(function(){
_3ba.close();
});
});
}});
return _3af;
});
},"dojo/string":function(){
define("dojo/string",["./_base/kernel","./_base/lang"],function(dojo,lang){
lang.getObject("string",true,dojo);
dojo.string.rep=function(str,num){
if(num<=0||!str){
return "";
}
var buf=[];
for(;;){
if(num&1){
buf.push(str);
}
if(!(num>>=1)){
break;
}
str+=str;
}
return buf.join("");
};
dojo.string.pad=function(text,size,ch,end){
if(!ch){
ch="0";
}
var out=String(text),pad=dojo.string.rep(ch,Math.ceil((size-out.length)/ch.length));
return end?out+pad:pad+out;
};
dojo.string.substitute=function(_3bb,map,_3bc,_3bd){
_3bd=_3bd||dojo.global;
_3bc=_3bc?lang.hitch(_3bd,_3bc):function(v){
return v;
};
return _3bb.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_3be,key,_3bf){
var _3c0=lang.getObject(key,false,map);
if(_3bf){
_3c0=lang.getObject(_3bf,false,_3bd).call(_3bd,_3c0,key);
}
return _3bc(_3c0,key).toString();
});
};
dojo.string.trim=String.prototype.trim?lang.trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
};
return dojo.string;
});
},"dijit/_Contained":function(){
define("dijit/_Contained",["dojo/_base/declare","./registry"],function(_3c1,_3c2){
return _3c1("dijit._Contained",null,{_getSibling:function(_3c3){
var node=this.domNode;
do{
node=node[_3c3+"Sibling"];
}while(node&&node.nodeType!=1);
return node&&_3c2.byNode(node);
},getPreviousSibling:function(){
return this._getSibling("previous");
},getNextSibling:function(){
return this._getSibling("next");
},getIndexInParent:function(){
var p=this.getParent();
if(!p||!p.getIndexOfChild){
return -1;
}
return p.getIndexOfChild(this);
}});
});
},"curam/util/UIMFragment":function(){
define("curam/util/UIMFragment",["curam/util/Request","curam/define","curam/debug","curam/util/ScreenContext"],function(_3c4){
curam.define.singleton("curam.util.UIMFragment",{get:function(args){
var _3c5=args&&args.pageID;
var url=args&&args.url;
var _3c6=args&&args.params;
var _3c7=args&&args.onLoad;
var _3c8=args&&args.onDownloadError;
var _3c9=args&&args.targetID;
if(_3c9===""||typeof _3c9==="undefined"){
throw "UIMFragment: targetID must be set.";
}
var _3ca=null;
if(url){
_3ca=url;
}else{
_3ca=curam.util.UIMFragment._constructPath(_3c5)+curam.util.UIMFragment._addCDEJParameters()+curam.util.UIMFragment._encodeParameters(_3c6);
}
curam.debug.log("UIMFragment: GET to "+_3ca);
curam.util.UIMFragment._doService(_3ca,_3c9,args,_3c7,_3c8);
},submitForm:function(_3cb){
var _3cb=dojo.fixEvent(_3cb);
var _3cc=_3cb.target;
dojo.stopEvent(_3cb);
var _3cd={url:curam.util.UIMFragment._constructFormActionPath(_3cc),form:_3cc,load:function(data){
var cp=dijit.getEnclosingWidget(_3cc);
cp.set("content",data);
},error:function(_3ce){
alert("form error: error!!");
}};
_3c4.post(_3cd);
console.log(_3cb+" "+_3cc);
},_constructFormActionPath:function(_3cf){
var _3d0="";
if(window===window.top){
_3d0=curam.config.locale+"/";
}
return _3d0+_3cf.getAttribute("action");
},_initForm:function(_3d1){
var _3d2=dojo.query("form",dijit.byId(_3d1).domNode)[0];
if(_3d2){
dojo.connect(_3d2,"onsubmit",curam.util.UIMFragment.submitForm);
}
},_constructPath:function(_3d3){
var _3d4=window;
var _3d5=window.top;
return curam.util.UIMFragment._constructPathValue(_3d3,_3d4,_3d5);
},_constructPathValue:function(_3d6,_3d7,_3d8){
if(_3d6===""||typeof _3d6==="undefined"){
throw "UIMFragment: pageID must be set.";
}
var _3d9="";
if(_3d7.location.pathname===_3d8.location.pathname){
var _3da=_3d8.curam&&_3d8.curam.config&&_3d8.curam.config.locale;
_3d9=(_3da||"en")+"/";
}
return _3d9+_3d6+"Page.do";
},_encodeParameters:function(_3db){
if(typeof _3db==="undefined"||dojo.toJson(_3db)==="{}"){
curam.debug.log("UIMFragment: No params included in request.");
return "";
}
var _3dc=[];
for(var _3dd in _3db){
_3dc.push(_3dd+"="+encodeURIComponent(_3db[_3dd]));
}
return "&"+_3dc.join("&");
},_addCDEJParameters:function(){
return "?"+jsScreenContext.toRequestString();
},_doService:function(url,_3de,args,_3df,_3e0){
var cp=dijit.byId(_3de);
cp.onLoad=dojo.hitch(cp,curam.util.UIMFragment._handleLoadSuccess,args,_3df);
cp.preventCache=true;
cp.set("href",url);
},_handleDownloadError:function(_3e1){
curam.debug.log("Error invoking the UIMFragment: "+_3e1);
return "UIMFragment: Generic Error Handler";
},_handleLoadSuccess:function(_3e2,_3e3){
curam.util.UIMFragment._initForm(_3e2.targetID);
if(_3e3){
_3e3(this);
}
curam.debug.log("");
return "UIMFragment: Generic Success Handler";
}});
return curam.util.UIMFragment;
});
},"curam/tab/TabDescriptor":function(){
define("curam/tab/TabDescriptor",["curam/tab/TabSessionManager","curam/debug","curam/util/ResourceBundle"],function(_3e4){
dojo.requireLocalization("curam.application","Debug");
var _3e5=new curam.util.ResourceBundle("Debug");
var _3e6=dojo.declare("curam.tab.TabDescriptor",null,{constructor:function(_3e7,_3e8){
this.sectionID=_3e7?_3e7:null;
this.tabID=_3e8?_3e8:null;
this.tabSignature=null;
this.tabContent=null;
this.tabParamNames=null;
this.isHomePage=false;
},toJson:function(){
var _3e9={"sectionID":this.sectionID,"tabID":this.tabID,"tabSignature":this.tabSignature,"tabParamNames":this.tabParamNames,"isHomePage":this.isHomePage};
_3e9.tabContent=this.tabContent?this.tabContent:null;
return dojo.toJson(_3e9);
},setTabContent:function(_3ea,_3eb){
if(this.tabContent){
this._log(_3e5.getProperty("curam.tab.TabDescriptor.content.changed"));
}else{
this._log(_3e5.getProperty("curam.tab.TabDescriptor.content.set"));
}
var _3ec=dojo.clone(_3ea.parameters);
dojo.mixin(_3ec,_3ea.cdejParameters);
if(!this.tabContent){
this.tabContent={};
}
this.tabContent.parameters=_3ec;
this.tabContent.pageID=_3ea.pageID;
if(_3eb){
this.tabContent.tabName=_3eb;
}else{
if(!this.tabContent.tabName){
this.tabContent.tabName="";
}
}
this._save();
dojo.publish("/curam/tab/labelUpdated");
},setTabSignature:function(_3ed,_3ee,_3ef){
if(!this.tabSignature){
this.tabParamNames=_3ed.slice(0);
this.tabParamNames.sort();
this.tabSignature=this._generateSignature(this.tabID,this.tabParamNames,_3ee);
this._log(_3e5.getProperty("curam.tab.TabDescriptor.signature.set"));
this._save();
if(!_3ef){
this._select();
}
}else{
this._log(_3e5.getProperty("curam.tab.TabDescriptor.signature.not.set"));
}
},matchesPageRequest:function(_3f0){
return this.tabSignature&&this.tabSignature==this._generateSignature(this.tabID,this.tabParamNames,_3f0);
},_generateSignature:function(_3f1,_3f2,_3f3){
var _3f4=_3f1;
if(_3f2){
for(var i=0;i<_3f2.length;i++){
var name=_3f2[i];
if(_3f3.parameters[name]){
_3f4+="|"+name+"="+_3f3.parameters[name];
}
}
}
return _3f4;
},_save:function(){
if(this.tabContent&&this.tabSignature){
this._log(_3e5.getProperty("curam.tab.TabDescriptor.saving"));
new _3e4().tabUpdated(this);
}
},_select:function(){
if(this.tabSignature){
this._log(_3e5.getProperty("curam.tab.TabDescriptor.selecting"));
new _3e4().tabSelected(this);
}
},_log:function(msg){
if(curam.debug.enabled()){
curam.debug.log("TAB DESCRIPTOR: "+msg+" ["+this.toJson()+"]");
}
}});
dojo.mixin(curam.tab.TabDescriptor,{fromJson:function(_3f5){
var _3f6=null;
if(_3f5){
var _3f7=dojo.fromJson(_3f5);
var _3f6=new curam.tab.TabDescriptor(_3f7.sectionID,_3f7.tabID);
if(_3f7.tabSignature){
_3f6.tabSignature=_3f7.tabSignature;
}
if(_3f7.tabContent){
_3f6.tabContent=_3f7.tabContent;
}
if(_3f7.tabParamNames){
_3f6.tabParamNames=_3f7.tabParamNames;
}
if(_3f7.isHomePage){
_3f6.isHomePage=_3f7.isHomePage;
}
}
return _3f6;
}});
return _3e6;
});
},"dojox/storage/manager":function(){
define("dojox/storage/manager",["dijit","dojo","dojox"],function(_3f8,dojo,_3f9){
dojo.provide("dojox.storage.manager");
_3f9.storage.manager=new function(){
this.currentProvider=null;
this.available=false;
this.providers=[];
this._initialized=false;
this._onLoadListeners=[];
this.initialize=function(){
this.autodetect();
};
this.register=function(name,_3fa){
this.providers.push(_3fa);
this.providers[name]=_3fa;
};
this.setProvider=function(_3fb){
};
this.autodetect=function(){
if(this._initialized){
return;
}
var _3fc=dojo.config["forceStorageProvider"]||false;
var _3fd;
for(var i=0;i<this.providers.length;i++){
_3fd=this.providers[i];
if(_3fc&&_3fc==_3fd.declaredClass){
_3fd.isAvailable();
break;
}else{
if(!_3fc&&_3fd.isAvailable()){
break;
}
}
}
if(!_3fd){
this._initialized=true;
this.available=false;
this.currentProvider=null;
console.warn("No storage provider found for this platform");
this.loaded();
return;
}
this.currentProvider=_3fd;
dojo.mixin(_3f9.storage,this.currentProvider);
_3f9.storage.initialize();
this._initialized=true;
this.available=true;
};
this.isAvailable=function(){
return this.available;
};
this.addOnLoad=function(func){
this._onLoadListeners.push(func);
if(this.isInitialized()){
this._fireLoaded();
}
};
this.removeOnLoad=function(func){
for(var i=0;i<this._onLoadListeners.length;i++){
if(func==this._onLoadListeners[i]){
this._onLoadListeners.splice(i,1);
break;
}
}
};
this.isInitialized=function(){
if(this.currentProvider!=null&&this.currentProvider.declaredClass=="dojox.storage.FlashStorageProvider"&&_3f9.flash.ready==false){
return false;
}else{
return this._initialized;
}
};
this.supportsProvider=function(_3fe){
try{
var _3ff=eval("new "+_3fe+"()");
var _400=_3ff.isAvailable();
if(!_400){
return false;
}
return _400;
}
catch(e){
return false;
}
};
this.getProvider=function(){
return this.currentProvider;
};
this.loaded=function(){
this._fireLoaded();
};
this._fireLoaded=function(){
dojo.forEach(this._onLoadListeners,function(i){
try{
i();
}
catch(e){
console.debug(e);
}
});
};
this.getResourceList=function(){
var _401=[];
dojo.forEach(_3f9.storage.manager.providers,function(_402){
_401=_401.concat(_402.getResourceList());
});
return _401;
};
};
});
},"dijit/_Container":function(){
define("dijit/_Container",["dojo/_base/array","dojo/_base/declare","dojo/dom-construct","./registry"],function(_403,_404,_405,_406){
return _404("dijit._Container",null,{buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_407,_408){
var _409=this.containerNode;
if(_408&&typeof _408=="number"){
var _40a=this.getChildren();
if(_40a&&_40a.length>=_408){
_409=_40a[_408-1].domNode;
_408="after";
}
}
_405.place(_407.domNode,_409,_408);
if(this._started&&!_407._started){
_407.startup();
}
},removeChild:function(_40b){
if(typeof _40b=="number"){
_40b=this.getChildren()[_40b];
}
if(_40b){
var node=_40b.domNode;
if(node&&node.parentNode){
node.parentNode.removeChild(node);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},_getSiblingOfChild:function(_40c,dir){
var node=_40c.domNode,_40d=(dir>0?"nextSibling":"previousSibling");
do{
node=node[_40d];
}while(node&&(node.nodeType!=1||!_406.byNode(node)));
return node&&_406.byNode(node);
},getIndexOfChild:function(_40e){
return _403.indexOf(this.getChildren(),_40e);
}});
});
},"dijit/layout/BorderContainer":function(){
define("dijit/layout/BorderContainer",["dojo/_base/array","dojo/cookie","dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/on","dojo/touch","dojo/_base/window","../_WidgetBase","../_Widget","../_TemplatedMixin","./_LayoutWidget","./utils"],function(_40f,_410,_411,_412,_413,_414,_415,_416,keys,lang,on,_417,win,_418,_419,_41a,_41b,_41c){
var _41d=_411("dijit.layout._Splitter",[_419,_41a],{live:true,templateString:"<div class=\"dijitSplitter\" data-dojo-attach-event=\"onkeypress:_onKeyPress,press:_startDrag,onmouseenter:_onMouse,onmouseleave:_onMouse\" tabIndex=\"0\" role=\"separator\"><div class=\"dijitSplitterThumb\"></div></div>",constructor:function(){
this._handlers=[];
},postMixInProperties:function(){
this.inherited(arguments);
this.horizontal=/top|bottom/.test(this.region);
this._factor=/top|left/.test(this.region)?1:-1;
this._cookieName=this.container.id+"_"+this.region;
},buildRendering:function(){
this.inherited(arguments);
_412.add(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V"));
if(this.container.persist){
var _41e=_410(this._cookieName);
if(_41e){
this.child.domNode.style[this.horizontal?"height":"width"]=_41e;
}
}
},_computeMaxSize:function(){
var dim=this.horizontal?"h":"w",_41f=_414.getMarginBox(this.child.domNode)[dim],_420=_40f.filter(this.container.getChildren(),function(_421){
return _421.region=="center";
})[0],_422=_414.getMarginBox(_420.domNode)[dim];
return Math.min(this.child.maxSize,_41f+_422);
},_startDrag:function(e){
if(!this.cover){
this.cover=win.doc.createElement("div");
_412.add(this.cover,"dijitSplitterCover");
_413.place(this.cover,this.child.domNode,"after");
}
_412.add(this.cover,"dijitSplitterCoverActive");
if(this.fake){
_413.destroy(this.fake);
}
if(!(this._resize=this.live)){
(this.fake=this.domNode.cloneNode(true)).removeAttribute("id");
_412.add(this.domNode,"dijitSplitterShadow");
_413.place(this.fake,this.domNode,"after");
}
_412.add(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active");
if(this.fake){
_412.remove(this.fake,"dijitSplitterHover dijitSplitter"+(this.horizontal?"H":"V")+"Hover");
}
var _423=this._factor,_424=this.horizontal,axis=_424?"pageY":"pageX",_425=e[axis],_426=this.domNode.style,dim=_424?"h":"w",_427=_414.getMarginBox(this.child.domNode)[dim],max=this._computeMaxSize(),min=this.child.minSize||20,_428=this.region,_429=_428=="top"||_428=="bottom"?"top":"left",_42a=parseInt(_426[_429],10),_42b=this._resize,_42c=lang.hitch(this.container,"_layoutChildren",this.child.id),de=win.doc;
this._handlers=this._handlers.concat([on(de,_417.move,this._drag=function(e,_42d){
var _42e=e[axis]-_425,_42f=_423*_42e+_427,_430=Math.max(Math.min(_42f,max),min);
if(_42b||_42d){
_42c(_430);
}
_426[_429]=_42e+_42a+_423*(_430-_42f)+"px";
}),on(de,"dragstart",_416.stop),on(win.body(),"selectstart",_416.stop),on(de,_417.release,lang.hitch(this,"_stopDrag"))]);
_416.stop(e);
},_onMouse:function(e){
var o=(e.type=="mouseover"||e.type=="mouseenter");
_412.toggle(this.domNode,"dijitSplitterHover",o);
_412.toggle(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V")+"Hover",o);
},_stopDrag:function(e){
try{
if(this.cover){
_412.remove(this.cover,"dijitSplitterCoverActive");
}
if(this.fake){
_413.destroy(this.fake);
}
_412.remove(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active dijitSplitterShadow");
this._drag(e);
this._drag(e,true);
}
finally{
this._cleanupHandlers();
delete this._drag;
}
if(this.container.persist){
_410(this._cookieName,this.child.domNode.style[this.horizontal?"height":"width"],{expires:365});
}
},_cleanupHandlers:function(){
var h;
while(h=this._handlers.pop()){
h.remove();
}
},_onKeyPress:function(e){
this._resize=true;
var _431=this.horizontal;
var tick=1;
switch(e.charOrCode){
case _431?keys.UP_ARROW:keys.LEFT_ARROW:
tick*=-1;
case _431?keys.DOWN_ARROW:keys.RIGHT_ARROW:
break;
default:
return;
}
var _432=_414.getMarginSize(this.child.domNode)[_431?"h":"w"]+this._factor*tick;
this.container._layoutChildren(this.child.id,Math.max(Math.min(_432,this._computeMaxSize()),this.child.minSize));
_416.stop(e);
},destroy:function(){
this._cleanupHandlers();
delete this.child;
delete this.container;
delete this.cover;
delete this.fake;
this.inherited(arguments);
}});
var _433=_411("dijit.layout._Gutter",[_419,_41a],{templateString:"<div class=\"dijitGutter\" role=\"presentation\"></div>",postMixInProperties:function(){
this.inherited(arguments);
this.horizontal=/top|bottom/.test(this.region);
},buildRendering:function(){
this.inherited(arguments);
_412.add(this.domNode,"dijitGutter"+(this.horizontal?"H":"V"));
}});
var _434=_411("dijit.layout.BorderContainer",_41b,{design:"headline",gutters:true,liveSplitters:true,persist:false,baseClass:"dijitBorderContainer",_splitterClass:_41d,postMixInProperties:function(){
if(!this.gutters){
this.baseClass+="NoGutter";
}
this.inherited(arguments);
},startup:function(){
if(this._started){
return;
}
_40f.forEach(this.getChildren(),this._setupChild,this);
this.inherited(arguments);
},_setupChild:function(_435){
var _436=_435.region;
if(_436){
this.inherited(arguments);
_412.add(_435.domNode,this.baseClass+"Pane");
var ltr=this.isLeftToRight();
if(_436=="leading"){
_436=ltr?"left":"right";
}
if(_436=="trailing"){
_436=ltr?"right":"left";
}
if(_436!="center"&&(_435.splitter||this.gutters)&&!_435._splitterWidget){
var _437=_435.splitter?this._splitterClass:_433;
if(lang.isString(_437)){
_437=lang.getObject(_437);
}
var _438=new _437({id:_435.id+"_splitter",container:this,child:_435,region:_436,live:this.liveSplitters});
_438.isSplitter=true;
_435._splitterWidget=_438;
_413.place(_438.domNode,_435.domNode,"after");
_438.startup();
}
_435.region=_436;
}
},layout:function(){
this._layoutChildren();
},addChild:function(_439,_43a){
this.inherited(arguments);
if(this._started){
this.layout();
}
},removeChild:function(_43b){
var _43c=_43b.region;
var _43d=_43b._splitterWidget;
if(_43d){
_43d.destroy();
delete _43b._splitterWidget;
}
this.inherited(arguments);
if(this._started){
this._layoutChildren();
}
_412.remove(_43b.domNode,this.baseClass+"Pane");
_415.set(_43b.domNode,{top:"auto",bottom:"auto",left:"auto",right:"auto",position:"static"});
_415.set(_43b.domNode,_43c=="top"||_43c=="bottom"?"width":"height","auto");
},getChildren:function(){
return _40f.filter(this.inherited(arguments),function(_43e){
return !_43e.isSplitter;
});
},getSplitter:function(_43f){
return _40f.filter(this.getChildren(),function(_440){
return _440.region==_43f;
})[0]._splitterWidget;
},resize:function(_441,_442){
if(!this.cs||!this.pe){
var node=this.domNode;
this.cs=_415.getComputedStyle(node);
this.pe=_414.getPadExtents(node,this.cs);
this.pe.r=_415.toPixelValue(node,this.cs.paddingRight);
this.pe.b=_415.toPixelValue(node,this.cs.paddingBottom);
_415.set(node,"padding","0px");
}
this.inherited(arguments);
},_layoutChildren:function(_443,_444){
if(!this._borderBox||!this._borderBox.h){
return;
}
var _445=_40f.map(this.getChildren(),function(_446,idx){
return {pane:_446,weight:[_446.region=="center"?Infinity:0,_446.layoutPriority,(this.design=="sidebar"?1:-1)*(/top|bottom/.test(_446.region)?1:-1),idx]};
},this);
_445.sort(function(a,b){
var aw=a.weight,bw=b.weight;
for(var i=0;i<aw.length;i++){
if(aw[i]!=bw[i]){
return aw[i]-bw[i];
}
}
return 0;
});
var _447=[];
_40f.forEach(_445,function(_448){
var pane=_448.pane;
_447.push(pane);
if(pane._splitterWidget){
_447.push(pane._splitterWidget);
}
});
var dim={l:this.pe.l,t:this.pe.t,w:this._borderBox.w-this.pe.w,h:this._borderBox.h-this.pe.h};
_41c.layoutChildren(this.domNode,dim,_447,_443,_444);
},destroyRecursive:function(){
_40f.forEach(this.getChildren(),function(_449){
var _44a=_449._splitterWidget;
if(_44a){
_44a.destroy();
}
delete _449._splitterWidget;
});
this.inherited(arguments);
}});
lang.extend(_418,{region:"",layoutPriority:0,splitter:false,minSize:0,maxSize:Infinity});
_434._Splitter=_41d;
_434._Gutter=_433;
return _434;
});
},"dojo/dnd/Mover":function(){
define("dojo/dnd/Mover",["../main","../Evented","../touch","./common","./autoscroll"],function(dojo,_44b,_44c){
dojo.declare("dojo.dnd.Mover",[_44b],{constructor:function(node,e,host){
this.node=dojo.byId(node);
this.marginBox={l:e.pageX,t:e.pageY};
this.mouseButton=e.button;
var h=(this.host=host),d=node.ownerDocument;
this.events=[dojo.connect(d,_44c.move,this,"onFirstMove"),dojo.connect(d,_44c.move,this,"onMouseMove"),dojo.connect(d,_44c.release,this,"onMouseUp"),dojo.connect(d,"ondragstart",dojo.stopEvent),dojo.connect(d.body,"onselectstart",dojo.stopEvent)];
if(h&&h.onMoveStart){
h.onMoveStart(this);
}
},onMouseMove:function(e){
dojo.dnd.autoScroll(e);
var m=this.marginBox;
this.host.onMove(this,{l:m.l+e.pageX,t:m.t+e.pageY},e);
dojo.stopEvent(e);
},onMouseUp:function(e){
if(dojo.isWebKit&&dojo.isMac&&this.mouseButton==2?e.button==0:this.mouseButton==e.button){
this.destroy();
}
dojo.stopEvent(e);
},onFirstMove:function(e){
var s=this.node.style,l,t,h=this.host;
switch(s.position){
case "relative":
case "absolute":
l=Math.round(parseFloat(s.left))||0;
t=Math.round(parseFloat(s.top))||0;
break;
default:
s.position="absolute";
var m=dojo.marginBox(this.node);
var b=dojo.doc.body;
var bs=dojo.getComputedStyle(b);
var bm=dojo._getMarginBox(b,bs);
var bc=dojo._getContentBox(b,bs);
l=m.l-(bc.l-bm.l);
t=m.t-(bc.t-bm.t);
break;
}
this.marginBox.l=l-this.marginBox.l;
this.marginBox.t=t-this.marginBox.t;
if(h&&h.onFirstMove){
h.onFirstMove(this,e);
}
dojo.disconnect(this.events.shift());
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
var h=this.host;
if(h&&h.onMoveStop){
h.onMoveStop(this);
}
this.events=this.node=this.host=null;
}});
return dojo.dnd.Mover;
});
},"dijit/form/ComboBoxMixin":function(){
require({cache:{"url:dijit/form/templates/DropDownBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdata-dojo-attach-point=\"_buttonNode, _popupStateNode\" role=\"presentation\"\n\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdata-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\n\t/></div\n></div>\n"}});
define("dijit/form/ComboBoxMixin",["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/kernel","dojo/_base/lang","dojo/store/util/QueryResults","./_AutoCompleterMixin","./_ComboBoxMenu","../_HasDropDown","dojo/text!./templates/DropDownBox.html"],function(_44d,_44e,_44f,lang,_450,_451,_452,_453,_454){
return _44d("dijit.form.ComboBoxMixin",[_453,_451],{dropDownClass:_452,hasDownArrow:true,templateString:_454,baseClass:"dijitTextBox dijitComboBox",cssStateNodes:{"_buttonNode":"dijitDownArrowButton"},_setHasDownArrowAttr:function(val){
this._set("hasDownArrow",val);
this._buttonNode.style.display=val?"":"none";
},_showResultList:function(){
this.displayMessage("");
this.inherited(arguments);
},_setStoreAttr:function(_455){
if(!_455.get){
lang.mixin(_455,{_oldAPI:true,get:function(id){
var _456=new _44e();
this.fetchItemByIdentity({identity:id,onItem:function(_457){
_456.resolve(_457);
},onError:function(_458){
_456.reject(_458);
}});
return _456.promise;
},query:function(_459,_45a){
var _45b=new _44e(function(){
_45c.abort&&_45c.abort();
});
var _45c=this.fetch(lang.mixin({query:_459,onBegin:function(_45d){
_45b.total=_45d;
},onComplete:function(_45e){
_45b.resolve(_45e);
},onError:function(_45f){
_45b.reject(_45f);
}},_45a));
return _450(_45b);
}});
}
this._set("store",_455);
},postMixInProperties:function(){
if(this.params.store){
this._setStoreAttr(this.params.store);
}
this.inherited(arguments);
if(!this.params.store){
var _460=this.declaredClass;
lang.mixin(this.store,{getValue:function(item,attr){
_44f.deprecated(_460+".store.getValue(item, attr) is deprecated for builtin store.  Use item.attr directly","","2.0");
return item[attr];
},getLabel:function(item){
_44f.deprecated(_460+".store.getLabel(item) is deprecated for builtin store.  Use item.label directly","","2.0");
return item.name;
},fetch:function(args){
_44f.deprecated(_460+".store.fetch() is deprecated for builtin store.","Use store.query()","2.0");
var shim=["dojo/data/ObjectStore"];
require(shim,lang.hitch(this,function(_461){
new _461({objectStore:this}).fetch(args);
}));
}});
}
}});
});
},"dijit/form/Select":function(){
require({cache:{"url:dijit/form/templates/Select.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tdata-dojo-attach-point=\"_buttonNode,tableNode,focusNode\" cellspacing='0' cellpadding='0'\n\trole=\"combobox\" aria-haspopup=\"true\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonContents dijitButtonNode\" role=\"presentation\"\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"  data-dojo-attach-point=\"containerNode,_popupStateNode\"></span\n\t\t\t><input type=\"hidden\" ${!nameAttrSetting} data-dojo-attach-point=\"valueNode\" value=\"${value}\" aria-hidden=\"true\"\n\t\t/></td><td class=\"dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton\"\n\t\t\t\tdata-dojo-attach-point=\"titleNode\" role=\"presentation\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t></tr></tbody\n></table>\n"}});
define("dijit/form/Select",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/_base/event","dojo/i18n","dojo/_base/lang","./_FormSelectWidget","../_HasDropDown","../Menu","../MenuItem","../MenuSeparator","../Tooltip","dojo/text!./templates/Select.html","dojo/i18n!./nls/validate"],function(_462,_463,_464,_465,_466,_467,_468,i18n,lang,_469,_46a,Menu,_46b,_46c,_46d,_46e){
var _46f=_463("dijit.form._SelectMenu",Menu,{buildRendering:function(){
this.inherited(arguments);
var o=(this.menuTableNode=this.domNode);
var n=(this.domNode=_466.create("div",{style:{overflowX:"hidden",overflowY:"scroll"}}));
if(o.parentNode){
o.parentNode.replaceChild(n,o);
}
_465.remove(o,"dijitMenuTable");
n.className=o.className+" dijitSelectMenu";
o.className="dijitReset dijitMenuTable";
o.setAttribute("role","listbox");
n.setAttribute("role","presentation");
n.appendChild(o);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onmousemove",_468.stop);
},resize:function(mb){
if(mb){
_467.setMarginBox(this.domNode,mb);
if("w" in mb){
this.menuTableNode.style.width="100%";
}
}
}});
var _470=_463("dijit.form.Select",[_469,_46a],{baseClass:"dijitSelect",templateString:_46e,required:false,state:"",message:"",tooltipPosition:[],emptyLabel:"&#160;",_isLoaded:false,_childrenLoaded:false,_fillContent:function(){
this.inherited(arguments);
if(this.options.length&&!this.value&&this.srcNodeRef){
var si=this.srcNodeRef.selectedIndex||0;
this.value=this.options[si>=0?si:0].value;
}
this.dropDown=new _46f({id:this.id+"_menu"});
_465.add(this.dropDown.domNode,this.baseClass+"Menu");
},_getMenuItemForOption:function(_471){
if(!_471.value&&!_471.label){
return new _46c();
}else{
var _472=lang.hitch(this,"_setValueAttr",_471);
var item=new _46b({option:_471,label:_471.label||this.emptyLabel,onClick:_472,disabled:_471.disabled||false});
item.focusNode.setAttribute("role","listitem");
return item;
}
},_addOptionItem:function(_473){
if(this.dropDown){
this.dropDown.addChild(this._getMenuItemForOption(_473));
}
},_getChildren:function(){
if(!this.dropDown){
return [];
}
return this.dropDown.getChildren();
},_loadChildren:function(_474){
if(_474===true){
if(this.dropDown){
delete this.dropDown.focusedChild;
}
if(this.options.length){
this.inherited(arguments);
}else{
_462.forEach(this._getChildren(),function(_475){
_475.destroyRecursive();
});
var item=new _46b({label:"&#160;"});
this.dropDown.addChild(item);
}
}else{
this._updateSelection();
}
this._isLoaded=false;
this._childrenLoaded=true;
if(!this._loadingStore){
this._setValueAttr(this.value);
}
},_setValueAttr:function(_476){
this.inherited(arguments);
_464.set(this.valueNode,"value",this.get("value"));
this.validate(this.focused);
},_setDisabledAttr:function(_477){
this.inherited(arguments);
this.validate(this.focused);
},_setRequiredAttr:function(_478){
this._set("required",_478);
this.focusNode.setAttribute("aria-required",_478);
this.validate(this.focused);
},_setDisplay:function(_479){
var lbl=_479||this.emptyLabel;
this.containerNode.innerHTML="<span class=\"dijitReset dijitInline "+this.baseClass+"Label\">"+lbl+"</span>";
this.focusNode.setAttribute("aria-valuetext",lbl);
},validate:function(_47a){
var _47b=this.disabled||this.isValid(_47a);
this._set("state",_47b?"":"Incomplete");
this.focusNode.setAttribute("aria-invalid",_47b?"false":"true");
var _47c=_47b?"":this._missingMsg;
if(_47c&&this.focused&&this._hasBeenBlurred){
_46d.show(_47c,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}else{
_46d.hide(this.domNode);
}
this._set("message",_47c);
return _47b;
},isValid:function(){
return (!this.required||this.value===0||!(/^\s*$/.test(this.value||"")));
},reset:function(){
this.inherited(arguments);
_46d.hide(this.domNode);
this.validate(this.focused);
},postMixInProperties:function(){
this.inherited(arguments);
this._missingMsg=i18n.getLocalization("dijit.form","validate",this.lang).missingMessage;
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onmousemove",_468.stop);
},_setStyleAttr:function(_47d){
this.inherited(arguments);
_465.toggle(this.domNode,this.baseClass+"FixedWidth",!!this.domNode.style.width);
},isLoaded:function(){
return this._isLoaded;
},loadDropDown:function(_47e){
this._loadChildren(true);
this._isLoaded=true;
_47e();
},closeDropDown:function(){
this.inherited(arguments);
if(this.dropDown&&this.dropDown.menuTableNode){
this.dropDown.menuTableNode.style.width="";
}
},uninitialize:function(_47f){
if(this.dropDown&&!this.dropDown._destroyed){
this.dropDown.destroyRecursive(_47f);
delete this.dropDown;
}
this.inherited(arguments);
},_onFocus:function(){
this.validate(true);
this.inherited(arguments);
},_onBlur:function(){
_46d.hide(this.domNode);
this.inherited(arguments);
}});
_470._Menu=_46f;
return _470;
});
},"dijit/_base/manager":function(){
define("dijit/_base/manager",["dojo/_base/array","dojo/_base/config","../registry",".."],function(_480,_481,_482,_483){
_480.forEach(["byId","getUniqueId","findWidgets","_destroyAll","byNode","getEnclosingWidget"],function(name){
_483[name]=_482[name];
});
_483.defaultDuration=_481["defaultDuration"]||200;
return _483;
});
},"dojo/data/ItemFileReadStore":function(){
define("dojo/data/ItemFileReadStore",["../_base/kernel","../_base/lang","../_base/declare","../_base/array","../_base/xhr","../Evented","../_base/window","./util/filter","./util/simpleFetch","../date/stamp"],function(_484,lang,_485,_486,xhr,_487,_488,_489,_48a,_48b){
var _48c=_485("dojo.data.ItemFileReadStore",[_487],{constructor:function(_48d){
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._jsonFileUrl=_48d.url;
this._ccUrl=_48d.url;
this.url=_48d.url;
this._jsonData=_48d.data;
this.data=null;
this._datatypeMap=_48d.typeMap||{};
if(!this._datatypeMap["Date"]){
this._datatypeMap["Date"]={type:Date,deserialize:function(_48e){
return _48b.fromISOString(_48e);
}};
}
this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._itemsByIdentity=null;
this._storeRefPropName="_S";
this._itemNumPropName="_0";
this._rootItemPropName="_RI";
this._reverseRefMap="_RRM";
this._loadInProgress=false;
this._queuedFetches=[];
if(_48d.urlPreventCache!==undefined){
this.urlPreventCache=_48d.urlPreventCache?true:false;
}
if(_48d.hierarchical!==undefined){
this.hierarchical=_48d.hierarchical?true:false;
}
if(_48d.clearOnClose){
this.clearOnClose=true;
}
if("failOk" in _48d){
this.failOk=_48d.failOk?true:false;
}
},url:"",_ccUrl:"",data:null,typeMap:null,clearOnClose:false,urlPreventCache:false,failOk:false,hierarchical:true,_assertIsItem:function(item){
if(!this.isItem(item)){
throw new Error("dojo.data.ItemFileReadStore: Invalid item argument.");
}
},_assertIsAttribute:function(_48f){
if(typeof _48f!=="string"){
throw new Error("dojo.data.ItemFileReadStore: Invalid attribute argument.");
}
},getValue:function(item,_490,_491){
var _492=this.getValues(item,_490);
return (_492.length>0)?_492[0]:_491;
},getValues:function(item,_493){
this._assertIsItem(item);
this._assertIsAttribute(_493);
return (item[_493]||[]).slice(0);
},getAttributes:function(item){
this._assertIsItem(item);
var _494=[];
for(var key in item){
if((key!==this._storeRefPropName)&&(key!==this._itemNumPropName)&&(key!==this._rootItemPropName)&&(key!==this._reverseRefMap)){
_494.push(key);
}
}
return _494;
},hasAttribute:function(item,_495){
this._assertIsItem(item);
this._assertIsAttribute(_495);
return (_495 in item);
},containsValue:function(item,_496,_497){
var _498=undefined;
if(typeof _497==="string"){
_498=_489.patternToRegExp(_497,false);
}
return this._containsValue(item,_496,_497,_498);
},_containsValue:function(item,_499,_49a,_49b){
return _486.some(this.getValues(item,_499),function(_49c){
if(_49c!==null&&!lang.isObject(_49c)&&_49b){
if(_49c.toString().match(_49b)){
return true;
}
}else{
if(_49a===_49c){
return true;
}
}
});
},isItem:function(_49d){
if(_49d&&_49d[this._storeRefPropName]===this){
if(this._arrayOfAllItems[_49d[this._itemNumPropName]]===_49d){
return true;
}
}
return false;
},isItemLoaded:function(_49e){
return this.isItem(_49e);
},loadItem:function(_49f){
this._assertIsItem(_49f.item);
},getFeatures:function(){
return this._features;
},getLabel:function(item){
if(this._labelAttr&&this.isItem(item)){
return this.getValue(item,this._labelAttr);
}
return undefined;
},getLabelAttributes:function(item){
if(this._labelAttr){
return [this._labelAttr];
}
return null;
},_fetchItems:function(_4a0,_4a1,_4a2){
var self=this,_4a3=function(_4a4,_4a5){
var _4a6=[],i,key;
if(_4a4.query){
var _4a7,_4a8=_4a4.queryOptions?_4a4.queryOptions.ignoreCase:false;
var _4a9={};
for(key in _4a4.query){
_4a7=_4a4.query[key];
if(typeof _4a7==="string"){
_4a9[key]=_489.patternToRegExp(_4a7,_4a8);
}else{
if(_4a7 instanceof RegExp){
_4a9[key]=_4a7;
}
}
}
for(i=0;i<_4a5.length;++i){
var _4aa=true;
var _4ab=_4a5[i];
if(_4ab===null){
_4aa=false;
}else{
for(key in _4a4.query){
_4a7=_4a4.query[key];
if(!self._containsValue(_4ab,key,_4a7,_4a9[key])){
_4aa=false;
}
}
}
if(_4aa){
_4a6.push(_4ab);
}
}
_4a1(_4a6,_4a4);
}else{
for(i=0;i<_4a5.length;++i){
var item=_4a5[i];
if(item!==null){
_4a6.push(item);
}
}
_4a1(_4a6,_4a4);
}
};
if(this._loadFinished){
_4a3(_4a0,this._getItemsArray(_4a0.queryOptions));
}else{
if(this._jsonFileUrl!==this._ccUrl){
_484.deprecated("dojo.data.ItemFileReadStore: ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
this._ccUrl=this._jsonFileUrl;
this.url=this._jsonFileUrl;
}else{
if(this.url!==this._ccUrl){
this._jsonFileUrl=this.url;
this._ccUrl=this.url;
}
}
if(this.data!=null){
this._jsonData=this.data;
this.data=null;
}
if(this._jsonFileUrl){
if(this._loadInProgress){
this._queuedFetches.push({args:_4a0,filter:_4a3});
}else{
this._loadInProgress=true;
var _4ac={url:self._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk};
var _4ad=xhr.get(_4ac);
_4ad.addCallback(function(data){
try{
self._getItemsFromLoadedData(data);
self._loadFinished=true;
self._loadInProgress=false;
_4a3(_4a0,self._getItemsArray(_4a0.queryOptions));
self._handleQueuedFetches();
}
catch(e){
self._loadFinished=true;
self._loadInProgress=false;
_4a2(e,_4a0);
}
});
_4ad.addErrback(function(_4ae){
self._loadInProgress=false;
_4a2(_4ae,_4a0);
});
var _4af=null;
if(_4a0.abort){
_4af=_4a0.abort;
}
_4a0.abort=function(){
var df=_4ad;
if(df&&df.fired===-1){
df.cancel();
df=null;
}
if(_4af){
_4af.call(_4a0);
}
};
}
}else{
if(this._jsonData){
try{
this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
_4a3(_4a0,this._getItemsArray(_4a0.queryOptions));
}
catch(e){
_4a2(e,_4a0);
}
}else{
_4a2(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),_4a0);
}
}
}
},_handleQueuedFetches:function(){
if(this._queuedFetches.length>0){
for(var i=0;i<this._queuedFetches.length;i++){
var _4b0=this._queuedFetches[i],_4b1=_4b0.args,_4b2=_4b0.filter;
if(_4b2){
_4b2(_4b1,this._getItemsArray(_4b1.queryOptions));
}else{
this.fetchItemByIdentity(_4b1);
}
}
this._queuedFetches=[];
}
},_getItemsArray:function(_4b3){
if(_4b3&&_4b3.deep){
return this._arrayOfAllItems;
}
return this._arrayOfTopLevelItems;
},close:function(_4b4){
if(this.clearOnClose&&this._loadFinished&&!this._loadInProgress){
if(((this._jsonFileUrl==""||this._jsonFileUrl==null)&&(this.url==""||this.url==null))&&this.data==null){
console.debug("dojo.data.ItemFileReadStore: WARNING!  Data reload "+" information has not been provided."+"  Please set 'url' or 'data' to the appropriate value before"+" the next fetch");
}
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._itemsByIdentity=null;
this._loadInProgress=false;
this._queuedFetches=[];
}
},_getItemsFromLoadedData:function(_4b5){
var _4b6=false,self=this;
function _4b7(_4b8){
return (_4b8!==null)&&(typeof _4b8==="object")&&(!lang.isArray(_4b8)||_4b6)&&(!lang.isFunction(_4b8))&&(_4b8.constructor==Object||lang.isArray(_4b8))&&(typeof _4b8._reference==="undefined")&&(typeof _4b8._type==="undefined")&&(typeof _4b8._value==="undefined")&&self.hierarchical;
};
function _4b9(_4ba){
self._arrayOfAllItems.push(_4ba);
for(var _4bb in _4ba){
var _4bc=_4ba[_4bb];
if(_4bc){
if(lang.isArray(_4bc)){
var _4bd=_4bc;
for(var k=0;k<_4bd.length;++k){
var _4be=_4bd[k];
if(_4b7(_4be)){
_4b9(_4be);
}
}
}else{
if(_4b7(_4bc)){
_4b9(_4bc);
}
}
}
}
};
this._labelAttr=_4b5.label;
var i,item;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=_4b5.items;
for(i=0;i<this._arrayOfTopLevelItems.length;++i){
item=this._arrayOfTopLevelItems[i];
if(lang.isArray(item)){
_4b6=true;
}
_4b9(item);
item[this._rootItemPropName]=true;
}
var _4bf={},key;
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
for(key in item){
if(key!==this._rootItemPropName){
var _4c0=item[key];
if(_4c0!==null){
if(!lang.isArray(_4c0)){
item[key]=[_4c0];
}
}else{
item[key]=[null];
}
}
_4bf[key]=key;
}
}
while(_4bf[this._storeRefPropName]){
this._storeRefPropName+="_";
}
while(_4bf[this._itemNumPropName]){
this._itemNumPropName+="_";
}
while(_4bf[this._reverseRefMap]){
this._reverseRefMap+="_";
}
var _4c1;
var _4c2=_4b5.identifier;
if(_4c2){
this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=_4c2;
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
_4c1=item[_4c2];
var _4c3=_4c1[0];
if(!Object.hasOwnProperty.call(this._itemsByIdentity,_4c3)){
this._itemsByIdentity[_4c3]=item;
}else{
if(this._jsonFileUrl){
throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+_4c2+"].  Value collided: ["+_4c3+"]");
}else{
if(this._jsonData){
throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+_4c2+"].  Value collided: ["+_4c3+"]");
}
}
}
}
}else{
this._features["dojo.data.api.Identity"]=Number;
}
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
item[this._storeRefPropName]=this;
item[this._itemNumPropName]=i;
}
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
for(key in item){
_4c1=item[key];
for(var j=0;j<_4c1.length;++j){
_4c0=_4c1[j];
if(_4c0!==null&&typeof _4c0=="object"){
if(("_type" in _4c0)&&("_value" in _4c0)){
var type=_4c0._type;
var _4c4=this._datatypeMap[type];
if(!_4c4){
throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+type+"'");
}else{
if(lang.isFunction(_4c4)){
_4c1[j]=new _4c4(_4c0._value);
}else{
if(lang.isFunction(_4c4.deserialize)){
_4c1[j]=_4c4.deserialize(_4c0._value);
}else{
throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function");
}
}
}
}
if(_4c0._reference){
var _4c5=_4c0._reference;
if(!lang.isObject(_4c5)){
_4c1[j]=this._getItemByIdentity(_4c5);
}else{
for(var k=0;k<this._arrayOfAllItems.length;++k){
var _4c6=this._arrayOfAllItems[k],_4c7=true;
for(var _4c8 in _4c5){
if(_4c6[_4c8]!=_4c5[_4c8]){
_4c7=false;
}
}
if(_4c7){
_4c1[j]=_4c6;
}
}
}
if(this.referenceIntegrity){
var _4c9=_4c1[j];
if(this.isItem(_4c9)){
this._addReferenceToMap(_4c9,item,key);
}
}
}else{
if(this.isItem(_4c0)){
if(this.referenceIntegrity){
this._addReferenceToMap(_4c0,item,key);
}
}
}
}
}
}
}
},_addReferenceToMap:function(_4ca,_4cb,_4cc){
},getIdentity:function(item){
var _4cd=this._features["dojo.data.api.Identity"];
if(_4cd===Number){
return item[this._itemNumPropName];
}else{
var _4ce=item[_4cd];
if(_4ce){
return _4ce[0];
}
}
return null;
},fetchItemByIdentity:function(_4cf){
var item,_4d0;
if(!this._loadFinished){
var self=this;
if(this._jsonFileUrl!==this._ccUrl){
_484.deprecated("dojo.data.ItemFileReadStore: ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
this._ccUrl=this._jsonFileUrl;
this.url=this._jsonFileUrl;
}else{
if(this.url!==this._ccUrl){
this._jsonFileUrl=this.url;
this._ccUrl=this.url;
}
}
if(this.data!=null&&this._jsonData==null){
this._jsonData=this.data;
this.data=null;
}
if(this._jsonFileUrl){
if(this._loadInProgress){
this._queuedFetches.push({args:_4cf});
}else{
this._loadInProgress=true;
var _4d1={url:self._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk};
var _4d2=xhr.get(_4d1);
_4d2.addCallback(function(data){
var _4d3=_4cf.scope?_4cf.scope:_488.global;
try{
self._getItemsFromLoadedData(data);
self._loadFinished=true;
self._loadInProgress=false;
item=self._getItemByIdentity(_4cf.identity);
if(_4cf.onItem){
_4cf.onItem.call(_4d3,item);
}
self._handleQueuedFetches();
}
catch(error){
self._loadInProgress=false;
if(_4cf.onError){
_4cf.onError.call(_4d3,error);
}
}
});
_4d2.addErrback(function(_4d4){
self._loadInProgress=false;
if(_4cf.onError){
var _4d5=_4cf.scope?_4cf.scope:_488.global;
_4cf.onError.call(_4d5,_4d4);
}
});
}
}else{
if(this._jsonData){
self._getItemsFromLoadedData(self._jsonData);
self._jsonData=null;
self._loadFinished=true;
item=self._getItemByIdentity(_4cf.identity);
if(_4cf.onItem){
_4d0=_4cf.scope?_4cf.scope:_488.global;
_4cf.onItem.call(_4d0,item);
}
}
}
}else{
item=this._getItemByIdentity(_4cf.identity);
if(_4cf.onItem){
_4d0=_4cf.scope?_4cf.scope:_488.global;
_4cf.onItem.call(_4d0,item);
}
}
},_getItemByIdentity:function(_4d6){
var item=null;
if(this._itemsByIdentity){
if(Object.hasOwnProperty.call(this._itemsByIdentity,_4d6)){
item=this._itemsByIdentity[_4d6];
}
}else{
if(Object.hasOwnProperty.call(this._arrayOfAllItems,_4d6)){
item=this._arrayOfAllItems[_4d6];
}
}
if(item===undefined){
item=null;
}
return item;
},getIdentityAttributes:function(item){
var _4d7=this._features["dojo.data.api.Identity"];
if(_4d7===Number){
return null;
}else{
return [_4d7];
}
},_forceLoad:function(){
var self=this;
if(this._jsonFileUrl!==this._ccUrl){
_484.deprecated("dojo.data.ItemFileReadStore: ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
this._ccUrl=this._jsonFileUrl;
this.url=this._jsonFileUrl;
}else{
if(this.url!==this._ccUrl){
this._jsonFileUrl=this.url;
this._ccUrl=this.url;
}
}
if(this.data!=null){
this._jsonData=this.data;
this.data=null;
}
if(this._jsonFileUrl){
var _4d8={url:this._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk,sync:true};
var _4d9=xhr.get(_4d8);
_4d9.addCallback(function(data){
try{
if(self._loadInProgress!==true&&!self._loadFinished){
self._getItemsFromLoadedData(data);
self._loadFinished=true;
}else{
if(self._loadInProgress){
throw new Error("dojo.data.ItemFileReadStore:  Unable to perform a synchronous load, an async load is in progress.");
}
}
}
catch(e){
console.log(e);
throw e;
}
});
_4d9.addErrback(function(_4da){
throw _4da;
});
}else{
if(this._jsonData){
self._getItemsFromLoadedData(self._jsonData);
self._jsonData=null;
self._loadFinished=true;
}
}
}});
lang.extend(_48c,_48a);
return _48c;
});
},"curam/validation/calendar":function(){
define("curam/validation/calendar",["curam/define"],function(){
curam.define.singleton("curam.validation.calendar",{invalidGotoDateEntered:null});
return curam.validation.calendar;
});
},"curam/widget/_TabButton":function(){
require({cache:{"url:curam/widget/templates/_TabButton.html":"<div role=\"presentation\" data-dojo-attach-point=\"titleNode\" data-dojo-attach-event='onclick:onClick' class='dijitTab'>\r\n    <div role=\"presentation\" class='dijitTabInnerDiv' data-dojo-attach-point='innerDiv'>\r\n        <div role=\"presentation\" class='dijitTabContent' data-dojo-attach-point='tabContent'>\r\n          <div role=\"presentation\" aria-labelledby='${id}_tabLabel'>\r\n            <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" data-dojo-attach-point='iconNode' />\r\n            <span data-dojo-attach-point='containerNode,focusNode' class='tabLabel' id='${id}_tabLabel'></span>\r\n            <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\r\n                data-dojo-attach-event='onclick: onClickCloseButton' role=\"presentation\">\r\n                <span data-dojo-attach-point='closeText' class='dijitTabCloseText'>Close Tab</span\r\n            ></span>\r\n      </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"}});
define("curam/widget/_TabButton",["dojo/dom-attr","dojo/dom-class","dojo/i18n","dojo/_base/lang","dojo/text!curam/widget/templates/_TabButton.html","dojo/_base/connect","dijit/layout/StackController","dijit/Menu","dijit/MenuItem","curam/widget/MenuItem","curam/util/ResourceBundle"],function(_4db,_4dc,i18n,lang,_4dd,_4de){
dojo.requireLocalization("curam.application","TabMenu");
var _4df=new curam.util.ResourceBundle("TabMenu");
_4de.subscribe("/curam/tab/labelUpdated",function(){
var tabs,_4e0=dojo.query(".dijitTabContainerTop-tabs");
_4e0.forEach(function(_4e1){
tabs=dojo.query(".tabLabel",_4e1);
tabs.forEach(function(tab,_4e2){
var _4e3="  ["+(_4e2+1)+" "+LOCALISED_TABCONTAINER_CONTEXT_OF+" "+tabs.length+"]";
var _4e4=tabs[_4e2].innerHTML;
tab.setAttribute("aria-label",_4e4+_4e3);
tab.setAttribute("title",_4e4);
});
});
});
var _4e5=dojo.declare("curam.widget._TabButton",dijit.layout._StackButton,{templateString:_4dd,scrollOnFocus:false,curamDisabled:false,curamVisible:true,baseClass:"dijitTab",postMixInProperties:function(){
if(!this.iconClass){
this.iconClass="dijitTabButtonIcon";
}
},postCreate:function(){
this.inherited(arguments);
dojo.setSelectable(this.containerNode,false);
if(this.iconNode.className=="dijitTabButtonIcon"){
dojo.style(this.iconNode,"width","1px");
}
_4db.set(this.focusNode,"id",this.id+"_tabLabel");
},startup:function(){
if(dojo.isIE==6){
this.inherited(arguments);
}else{
dijit.layout._StackButton.prototype.startup.apply(this,arguments);
}
},_setCloseButtonAttr:function(disp){
this._set("closeButton",disp);
_4dc.toggle(this.innerDiv,"dijitClosable",disp);
this.closeNode.style.display=disp?"":"none";
if(disp){
var _4e6=i18n.getLocalization("dijit","common");
if(this.closeNode){
_4db.set(this.closeNode,"title",_4e6.itemClose);
}
this._closeMenu=new dijit.Menu({id:this.id+"_Menu",dir:this.dir,lang:this.lang,textDir:this.textDir,targetNodeIds:[this.domNode]});
var _4e7=new curam.widget.MenuItem({onClickValue:"_onClick",label:_4e6.itemClose,dir:this.dir,lang:this.lang,textDir:this.textDir,onClick:lang.hitch(this,"onClickCloseButton")});
var _4e8=new curam.widget.MenuItem({onClickValue:"_onClickAll",label:_4df.getProperty("close.all.tabs.text"),dir:this.dir,lang:this.lang,textDir:this.textDir,onClick:lang.hitch(this,"onClickCloseButton")});
this._closeMenu.addChild(_4e7);
this._closeMenu.addChild(_4e8);
}else{
dojo.addClass(this.titleNode,"hasNoCloseButton");
if(this._closeMenu){
this._closeMenu.destroyRecursive();
delete this._closeMenu;
}
}
},_setCuramDisabledAttr:function(_4e9){
this.curamDisabled=_4e9;
this._swapState(this.domNode,this.curamDisabled,"disabled","enabled");
},_setCuramVisibleAttr:function(_4ea){
this.curamVisible=_4ea;
this._swapState(this.domNode,this.curamVisible,"visible","hidden");
},_swapState:function(node,_4eb,_4ec,_4ed){
if(_4eb){
dojo.replaceClass(node,_4ec,_4ed);
}else{
dojo.replaceClass(node,_4ed,_4ec);
}
},destroy:function(){
_4de.publish("/curam/tab/labelUpdated");
if(this._closeMenu){
this._closeMenu.destroyRecursive();
delete this._closeMenu;
}
this.inherited(arguments);
}});
return _4e5;
});
},"dijit/form/ComboButton":function(){
require({cache:{"url:dijit/form/templates/ComboButton.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" data-dojo-attach-point=\"buttonNode\" data-dojo-attach-event=\"ondijitclick:_onClick,onkeypress:_onButtonKeyPress\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" data-dojo-attach-point=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdata-dojo-attach-point=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdata-dojo-attach-event=\"onkeypress:_onArrowKeyPress\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" data-dojo-attach-point=\"valueNode\"\n\t\t/></td></tr></tbody\n></table>\n"}});
define("dijit/form/ComboButton",["dojo/_base/declare","dojo/_base/event","dojo/keys","../focus","./DropDownButton","dojo/text!./templates/ComboButton.html"],function(_4ee,_4ef,keys,_4f0,_4f1,_4f2){
return _4ee("dijit.form.ComboButton",_4f1,{templateString:_4f2,_setIdAttr:"",_setTabIndexAttr:["focusNode","titleNode"],_setTitleAttr:"titleNode",optionsTitle:"",baseClass:"dijitComboButton",cssStateNodes:{"buttonNode":"dijitButtonNode","titleNode":"dijitButtonContents","_popupStateNode":"dijitDownArrowButton"},_focusedNode:null,_onButtonKeyPress:function(evt){
if(evt.charOrCode==keys[this.isLeftToRight()?"RIGHT_ARROW":"LEFT_ARROW"]){
_4f0.focus(this._popupStateNode);
_4ef.stop(evt);
}
},_onArrowKeyPress:function(evt){
if(evt.charOrCode==keys[this.isLeftToRight()?"LEFT_ARROW":"RIGHT_ARROW"]){
_4f0.focus(this.titleNode);
_4ef.stop(evt);
}
},focus:function(_4f3){
if(!this.disabled){
_4f0.focus(_4f3=="start"?this.titleNode:this._popupStateNode);
}
}});
});
},"curam/pagination/ExpandableListModel":function(){
define("curam/pagination/ExpandableListModel",["curam/util/ExpandableLists","curam/debug","curam/pagination","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _4f4=new curam.util.ResourceBundle("Debug");
var _4f5=dojo.declare("curam.pagination.ExpandableListModel",null,{_rowCount:null,constructor:function(_4f6){
this.tableNode=dojo.query("table.paginated-list-id-"+_4f6)[0];
if(!this.tableNode){
throw "Table node for ID "+_4f6+" not found - failing!";
}
curam.debug.log("curam.pagination.ExpandableListModel "+_4f4.getProperty("curam.pagination.ExpandableListModel"),this.tableNode);
this._id=_4f6;
},getId:function(){
return this._id;
},getRowCount:function(){
if(this._rowCount==null){
this._rowCount=0;
var _4f7=dojo.query("tbody > script.hidden-list-rows",this.tableNode);
for(var i=0;i<_4f7.length;i++){
var _4f8=_4f7[i];
var _4f9=(i==_4f7.length-1);
if(!_4f9){
this._rowCount+=(curam.pagination.getNumRowsInBlock(_4f8)*2);
}else{
curam.pagination.unpackRows(_4f8);
}
}
var _4fa=dojo.query("tbody > tr",this.tableNode).length;
this._rowCount+=_4fa;
}
if(this._rowCount<=1){
return 1;
}else{
return this._rowCount/2;
}
},hideRange:function(_4fb,_4fc){
var rows=this._getRowNodes(_4fb,_4fc);
for(var i=_4fb;i<=_4fc;i++){
var _4fd=(2*i)-2;
var _4fe=(2*i)-1;
dojo.style(rows[_4fd],"display","none");
dojo.removeClass(rows[_4fd],"even-last-row");
dojo.removeClass(rows[_4fd],"odd-last-row");
if(rows.length>_4fe){
var _4ff=rows[_4fe];
if(_4ff){
_4ff._curam_pagination_expanded=curam.util.ExpandableLists.isDetailsRowExpanded(_4ff);
curam.util.ExpandableLists.setDetailsRowExpandedState(rows[_4fd],_4ff,false);
}
}
}
},showRange:function(_500,_501){
var rows=this._getRowNodes(_500,_501);
var _502=(_501%2==0)?"even-last-row":"odd-last-row";
dojo.addClass(rows[(_501*2)-2],_502);
for(var i=_500;i<=_501;i++){
var _503=(2*i)-2;
var _504=(2*i)-1;
dojo.style(rows[_503],"display","");
if(rows.length>_504){
var _505=rows[_504];
if(_505){
curam.util.ExpandableLists.setDetailsRowExpandedState(rows[_503],_505,_505._curam_pagination_expanded);
}
}
}
},_getRowNodes:function(_506,_507){
var _508=curam.pagination.readListContent(this.tableNode);
for(var i=1;i<=(_507*2)&&i<=_508.length;i++){
var node=_508[i-1];
if(node.tagName=="SCRIPT"){
curam.pagination.unpackRows(node);
_508=curam.pagination.readListContent(this.tableNode);
i--;
}
}
return dojo.query("tbody > tr",this.tableNode);
}});
return _4f5;
});
},"dojo/touch":function(){
define("dojo/touch",["./_base/kernel","./on","./has","./mouse"],function(dojo,on,has,_509){
function _50a(type){
return function(node,_50b){
return on(node,type,_50b);
};
};
var _50c=has("touch");
dojo.touch={press:_50a(_50c?"touchstart":"mousedown"),move:_50a(_50c?"touchmove":"mousemove"),release:_50a(_50c?"touchend":"mouseup"),cancel:_50c?_50a("touchcancel"):_509.leave};
return dojo.touch;
});
},"dojo/cache":function(){
define("dojo/cache",["./_base/kernel","./text"],function(dojo,text){
return dojo.cache;
});
},"dijit/DialogUnderlay":function(){
define("dijit/DialogUnderlay",["dojo/_base/declare","dojo/dom-attr","dojo/_base/window","dojo/window","./_Widget","./_TemplatedMixin","./BackgroundIframe"],function(_50d,_50e,win,_50f,_510,_511,_512){
return _50d("dijit.DialogUnderlay",[_510,_511],{templateString:"<div class='dijitDialogUnderlayWrapper'><div class='dijitDialogUnderlay' data-dojo-attach-point='node'></div></div>",dialogId:"","class":"",_setDialogIdAttr:function(id){
_50e.set(this.node,"id",id+"_underlay");
this._set("dialogId",id);
},_setClassAttr:function(_513){
this.node.className="dijitDialogUnderlay "+_513;
this._set("class",_513);
},postCreate:function(){
win.body().appendChild(this.domNode);
},layout:function(){
var is=this.node.style,os=this.domNode.style;
os.display="none";
var _514=_50f.getBox();
os.top=_514.t+"px";
os.left=_514.l+"px";
is.width=_514.w+"px";
is.height=_514.h+"px";
os.display="block";
},show:function(){
this.domNode.style.display="block";
this.layout();
this.bgIframe=new _512(this.domNode);
},hide:function(){
this.bgIframe.destroy();
delete this.bgIframe;
this.domNode.style.display="none";
}});
});
},"dijit/form/_ToggleButtonMixin":function(){
define("dijit/form/_ToggleButtonMixin",["dojo/_base/declare","dojo/dom-attr"],function(_515,_516){
return _515("dijit.form._ToggleButtonMixin",null,{checked:false,_aria_attr:"aria-pressed",_onClick:function(evt){
var _517=this.checked;
this._set("checked",!_517);
var ret=this.inherited(arguments);
this.set("checked",ret?this.checked:_517);
return ret;
},_setCheckedAttr:function(_518,_519){
this._set("checked",_518);
_516.set(this.focusNode||this.domNode,"checked",_518);
(this.focusNode||this.domNode).setAttribute(this._aria_attr,_518?"true":"false");
this._handleOnChange(_518,_519);
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
}});
});
},"dojo/store/util/SimpleQueryEngine":function(){
define("dojo/store/util/SimpleQueryEngine",["../../_base/array"],function(_51a){
return function(_51b,_51c){
switch(typeof _51b){
default:
throw new Error("Can not query with a "+typeof _51b);
case "object":
case "undefined":
var _51d=_51b;
_51b=function(_51e){
for(var key in _51d){
var _51f=_51d[key];
if(_51f&&_51f.test){
if(!_51f.test(_51e[key])){
return false;
}
}else{
if(_51f!=_51e[key]){
return false;
}
}
}
return true;
};
break;
case "string":
if(!this[_51b]){
throw new Error("No filter function "+_51b+" was found in store");
}
_51b=this[_51b];
case "function":
}
function _520(_521){
var _522=_51a.filter(_521,_51b);
if(_51c&&_51c.sort){
_522.sort(function(a,b){
for(var sort,i=0;sort=_51c.sort[i];i++){
var _523=a[sort.attribute];
var _524=b[sort.attribute];
if(_523!=_524){
return !!sort.descending==_523>_524?-1:1;
}
}
return 0;
});
}
if(_51c&&(_51c.start||_51c.count)){
var _525=_522.length;
_522=_522.slice(_51c.start||0,(_51c.start||0)+(_51c.count||Infinity));
_522.total=_525;
}
return _522;
};
_520.matches=_51b;
return _520;
};
});
},"dijit/_TemplatedMixin":function(){
define("dijit/_TemplatedMixin",["dojo/_base/lang","dojo/touch","./_WidgetBase","dojo/string","dojo/cache","dojo/_base/array","dojo/_base/declare","dojo/dom-construct","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(lang,_526,_527,_528,_529,_52a,_52b,_52c,has,_52d,win){
var _52e=_52b("dijit._TemplatedMixin",null,{templateString:null,templatePath:null,_skipNodeCache:false,_earlyTemplatedStartup:false,constructor:function(){
this._attachPoints=[];
this._attachEvents=[];
},_stringRepl:function(tmpl){
var _52f=this.declaredClass,_530=this;
return _528.substitute(tmpl,this,function(_531,key){
if(key.charAt(0)=="!"){
_531=lang.getObject(key.substr(1),false,_530);
}
if(typeof _531=="undefined"){
throw new Error(_52f+" template:"+key);
}
if(_531==null){
return "";
}
return key.charAt(0)=="!"?_531:_531.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
if(!this.templateString){
this.templateString=_529(this.templatePath,{sanitize:true});
}
var _532=_52e.getCachedTemplate(this.templateString,this._skipNodeCache);
var node;
if(lang.isString(_532)){
node=_52c.toDom(this._stringRepl(_532));
if(node.nodeType!=1){
throw new Error("Invalid template: "+_532);
}
}else{
node=_532.cloneNode(true);
}
this.domNode=node;
this.inherited(arguments);
this._attachTemplateNodes(node,function(n,p){
return n.getAttribute(p);
});
this._beforeFillContent();
this._fillContent(this.srcNodeRef);
},_beforeFillContent:function(){
},_fillContent:function(_533){
var dest=this.containerNode;
if(_533&&dest){
while(_533.hasChildNodes()){
dest.appendChild(_533.firstChild);
}
}
},_attachTemplateNodes:function(_534,_535){
var _536=lang.isArray(_534)?_534:(_534.all||_534.getElementsByTagName("*"));
var x=lang.isArray(_534)?0:-1;
for(;x<_536.length;x++){
var _537=(x==-1)?_534:_536[x];
if(this.widgetsInTemplate&&(_535(_537,"dojoType")||_535(_537,"data-dojo-type"))){
continue;
}
var _538=_535(_537,"dojoAttachPoint")||_535(_537,"data-dojo-attach-point");
if(_538){
var _539,_53a=_538.split(/\s*,\s*/);
while((_539=_53a.shift())){
if(lang.isArray(this[_539])){
this[_539].push(_537);
}else{
this[_539]=_537;
}
this._attachPoints.push(_539);
}
}
var _53b=_535(_537,"dojoAttachEvent")||_535(_537,"data-dojo-attach-event");
if(_53b){
var _53c,_53d=_53b.split(/\s*,\s*/);
var trim=lang.trim;
while((_53c=_53d.shift())){
if(_53c){
var _53e=null;
if(_53c.indexOf(":")!=-1){
var _53f=_53c.split(":");
_53c=trim(_53f[0]);
_53e=trim(_53f[1]);
}else{
_53c=trim(_53c);
}
if(!_53e){
_53e=_53c;
}
this._attachEvents.push(this.connect(_537,_526[_53c]||_53c,_53e));
}
}
}
}
},destroyRendering:function(){
_52a.forEach(this._attachPoints,function(_540){
delete this[_540];
},this);
this._attachPoints=[];
_52a.forEach(this._attachEvents,this.disconnect,this);
this._attachEvents=[];
this.inherited(arguments);
}});
_52e._templateCache={};
_52e.getCachedTemplate=function(_541,_542){
var _543=_52e._templateCache;
var key=_541;
var _544=_543[key];
if(_544){
try{
if(!_544.ownerDocument||_544.ownerDocument==win.doc){
return _544;
}
}
catch(e){
}
_52c.destroy(_544);
}
_541=_528.trim(_541);
if(_542||_541.match(/\$\{([^\}]+)\}/g)){
return (_543[key]=_541);
}else{
var node=_52c.toDom(_541);
if(node.nodeType!=1){
throw new Error("Invalid template: "+_541);
}
return (_543[key]=node);
}
};
if(has("ie")){
_52d.addOnWindowUnload(function(){
var _545=_52e._templateCache;
for(var key in _545){
var _546=_545[key];
if(typeof _546=="object"){
_52c.destroy(_546);
}
delete _545[key];
}
});
}
lang.extend(_527,{dojoAttachEvent:"",dojoAttachPoint:""});
return _52e;
});
},"curam/smartPanel":function(){
define("curam/smartPanel",["curam/tab","curam/util/onLoad","curam/define"],function(){
curam.define.singleton("curam.smartPanel",{setupOnLoad:function(_547){
curam.util.onLoad.addSubscriber(_547,curam.smartPanel._handleSmartPanelLoad);
dojo.ready(function(){
var _548=dojo.query("."+_547)[0];
if(!dojo.attr(_548,"src")){
var _549=dojo.query(".outer-navigation-tab")[0];
var _54a=_549?dijit.byNode(_549):null;
if(_54a){
var _54b=null;
if(dojo.isBodyLtr()){
_54b=_54a.getSplitter("right");
}else{
_54b=_54a.getSplitter("left");
}
_54b.connect(_54b,"onMouseUp",curam.smartPanel.loadSmartPanelIframe);
}
}
});
},_handleSmartPanelLoad:function(_54c,_54d){
var _54e=dojo.query("."+_54c)[0];
var src=dojo.attr(_54e,"src");
curam.smartPanel.addTitle(_54c);
var _54f="smartpanel.content.loaded";
if(src){
_54e.setAttribute("iframeLoaded","true");
if(dojo.attr(_54e,"_SPContentLoaded")==="true"){
dojo.publish("smartPanel.loaded",[_54e]);
}else{
dojo.subscribe(_54f,function(_550){
if(_550!=_54e){
return;
}
dojo.publish("smartPanel.loaded",[_54e]);
});
}
}
},loadSmartPanelIframe:function(){
var _551=curam.tab.getSmartPanelIframe();
if(_551){
var src=dojo.attr(_551,"src");
if(src==""){
var src=dojo.attr(_551,"_srcContents");
dojo.attr(_551,"src",src);
}
}
},addTitle:function(_552){
var _553=dojo.query("."+_552)[0];
var _554=SMART_PANEL_TITLE+" - "+_553.contentWindow.document.title;
_553.setAttribute("title",_554);
}});
return curam.smartPanel;
});
},"curam/util/ui/refresh/RefreshEvent":function(){
define("curam/util/ui/refresh/RefreshEvent",[],function(){
var _555=dojo.declare("curam.util.ui.refresh.RefreshEvent",null,{TYPE_ONLOAD:"onload",TYPE_ONSUBMIT:"onsubmit",SOURCE_CONTEXT_MAIN:"main-content",SOURCE_CONTEXT_DIALOG:"dialog",SOURCE_CONTEXT_INLINE:"inline",_type:null,_context:null,constructor:function(type,_556){
if(!type||!_556){
throw "Required parameters missing.";
}
if(!(type==this.TYPE_ONLOAD||type==this.TYPE_ONSUBMIT)){
throw "Unknown type: "+type;
}
if(!(_556==this.SOURCE_CONTEXT_DIALOG||_556==this.SOURCE_CONTEXT_INLINE||_556==this.SOURCE_CONTEXT_MAIN)){
throw "Unknown context: "+_556;
}
this._type=type;
this._context=_556;
},equals:function(_557){
if(typeof _557!="object"){
return false;
}
if(_557.declaredClass!=this.declaredClass){
return false;
}
return this._type===_557._type&&this._context===_557._context;
}});
return _555;
});
},"url:dijit/templates/Tree.html":"<div class=\"dijitTree dijitTreeContainer\" role=\"tree\"\n\tdata-dojo-attach-event=\"onkeypress:_onKeyPress\">\n\t<div class=\"dijitInline dijitTreeIndent\" style=\"position: absolute; top: -9999px\" data-dojo-attach-point=\"indentDetector\"></div>\n</div>\n","url:dijit/form/templates/ComboButton.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" data-dojo-attach-point=\"buttonNode\" data-dojo-attach-event=\"ondijitclick:_onClick,onkeypress:_onButtonKeyPress\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" data-dojo-attach-point=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdata-dojo-attach-point=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdata-dojo-attach-event=\"onkeypress:_onArrowKeyPress\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" data-dojo-attach-point=\"valueNode\"\n\t\t/></td></tr></tbody\n></table>\n","curam/ui/UIMPageAdaptor":function(){
define("curam/ui/UIMPageAdaptor",["curam/tab","curam/define","curam/debug","curam/util","curam/ui/PageRequest","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _558=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.ui.UIMPageAdaptor",{initialize:function(){
if(jsScreenContext.hasContextBits("MODAL")){
return;
}
curam.util.connect(dojo.body(),"onclick",curam.ui.UIMPageAdaptor.clickHandler);
var _559=null;
var _55a=null;
if(!jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")){
_559=curam.util.getTopmostWindow().dojo;
_55a="/iframe-loaded/"+window.jsPageID;
curam.debug.log(_558.getProperty("curam.ui.UIMPageAdaptor.event")+_55a);
_559.publish(_55a);
}
},externalInitialize:function(){
if(jsScreenContext.hasContextBits("MODAL")){
return;
}
curam.util.connect(dojo.body(),"onclick",curam.ui.UIMPageAdaptor.clickHandler);
},externalClickHandler:function(_55b,_55c){
var _55d=new curam.ui.PageRequest(_55c.href);
var _55e=window.top.dijit.byId("curam-app");
if(_55e!=null){
var _55f=[];
var i=0;
for(param in _55d.parameters){
_55f[i]={paramKey:param,paramValue:_55d.parameters[param]};
i=i+1;
}
var args={pageID:_55d.pageID,param:_55f};
if(_55e._isNavBarItem(_55d.pageID)){
dojo.stopEvent(_55b||window.event);
window.top.displayContent(args);
}else{
if(_55e._isUIMFragment(_55d.pageID)){
dojo.stopEvent(_55b||window.event);
window.top.displayContent(args);
}
}
}
},clickHandler:function(_560){
var _561=null;
if(_560.target.nodeName=="A"){
if(curam.ui.UIMPageAdaptor.allowLinkToContinue(_560.target)){
return;
}
_561=_560.target;
}else{
if((_560.target.nodeName=="IMG"&&!dojo.hasClass(_560.target.parentNode,"file-download"))||(_560.target.nodeName=="SPAN"&&(_560.target.className=="middle"||_560.target.className=="bidi"))){
_561=cm.getParentByType(_560.target,"A");
}
}
if(_561!=null){
if(!_561.href||_561.href.length==0){
dojo.stopEvent(_560||window.event);
return;
}
if(jsScreenContext.hasContextBits("EXTAPP")){
curam.ui.UIMPageAdaptor.externalClickHandler(_560,_561);
}else{
dojo.stopEvent(_560||window.event);
if(curam.ui.UIMPageAdaptor.shouldLinkOpenInNewWindow(_561)){
window.open(_561.href);
}else{
if(curam.ui.UIMPageAdaptor.isLinkValidForTabProcessing(_561)){
var _562=new curam.ui.PageRequest(_561.href);
if(jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")||jsScreenContext.hasContextBits("NESTED_UIM")){
_562.pageHolder=window;
}
curam.tab.getTabController().handlePageRequest(_562);
}
}
}
}
},allowLinkToContinue:function(_563){
if(_563&&_563._submitButton){
return true;
}
if(_563&&_563.href){
return (_563.href.indexOf("/servlet/FileDownload")!=-1||_563.href.indexOf("#")!=-1||_563.href.substr(0,7)=="mailto:");
}else{
return false;
}
},isLinkValidForTabProcessing:function(_564){
if(!_564||(dojo.hasClass(_564,"popup-action")||dojo.hasClass(_564,"list-details-row-toggle"))){
return false;
}
return true;
},shouldLinkOpenInNewWindow:function(_565){
return dojo.hasAttr(_565,"target")&&!curam.util.isInternal(_565.href);
},setTabTitleAndName:function(){
var _566=dojo.byId("tab-title").innerHTML;
var _567=dojo.byId("tab-name").innerHTML;
window.parent.dojo.publish("tab.title.name.set",[window.frameElement,_566,_567]);
}});
return curam.ui.UIMPageAdaptor;
});
},"curam/ModalDialog":function(){
require({cache:{"url:curam/layout/resources/Dialog.html":"<div class=\"dijitDialog\" role=\"alertdialog\" aria-labelledby=\"${id}_title\">\r\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\r\n\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span>\r\n\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" aria-label=\"${closeModalText}\" tabIndex=\"0\" onKeyDown=\"curam.util.isShiftTab(event)\">\r\n\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\">${closeModalText}</span>\r\n\t</span>\r\n  <span id=\"${id}_prompt\" class=\"hidden\" data-dojo-attach-point=\"promptText\">${modalPromptText}</span>\r\n\t</div>\r\n\t\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\r\n</div>\r\n"}});
define("curam/ModalDialog",["dojo/text!curam/layout/resources/Dialog.html","dojo/dom-geometry","curam/util/external","dijit/Dialog","curam/dialog","curam/tab","curam/debug","curam/ModalUIMController","curam/util/RuntimeContext","curam/util/ResourceBundle"],function(_568,_569,_56a){
dojo.requireLocalization("curam.application","Debug");
var _56b=new curam.util.ResourceBundle("Debug");
var _56c=dojo.declare("curam.ModalDialog",dijit.Dialog,{templateString:_568,autofocus:false,refocus:false,iframeHref:"",iframe:undefined,width:undefined,height:undefined,defaultWidth:600,closeModalText:LOCALISED_MODAL_CLOSE_BUTTON,modalPromptText:". "+LOCALISED_MODAL_SCREEN_READER_PROMPT+" .",maximumWidth:null,maximumHeight:null,_determinedWidth:null,_determinedHeight:null,_horizontalModalSpace:100,_verticalModalSpace:50,duration:5,parentWindow:undefined,isRegisteredForClosing:false,unsubscribes:undefined,modalconnects:undefined,onIframeLoadHandler:undefined,initialized:false,initDone:false,initUnsubToken:null,uimController:null,_helpIcon:null,_title:null,_isMobileUA:false,_isMobileUADialogPositioned:false,uimToken:undefined,postCreate:function(){
curam.debug.log("curam.ModalDialog.postCreate(): w=%s; h=%s",this.width?this.width:"not given",this.height?this.height:"not given");
this._destroyOldModals();
this._isMobileUA=curam.util.getTopmostWindow().curam.config.mobileUserAgent;
if(typeof (this._isMobileUA)!="boolean"){
this._isMobileUA=false;
}
this.draggable=!this._isMobileUA;
this.maximumWidth=dijit.getViewport().w-this._horizontalModalSpace;
this.maximumHeight=dijit.getViewport().h-this._verticalModalSpace;
if(jsScreenContext.hasContextBits("EXTAPP")){
this.maximumHeight-=this._verticalModalSpace;
}
this.inherited(arguments);
this.unsubscribes=[];
this.modalconnects=[];
this._isCDEJModal=(this.iframeHref.indexOf("CDEJ/popups")>-1||this.iframeHref.indexOf("frequency-editor.jsp")>-1);
dojo.style(this.domNode,"left","-10000px");
dojo.style(this.domNode,"top","1px");
dojo.style(this.domNode,"display","");
dojo.style(this.domNode,"visibility","hidden");
dojo.addClass(this.domNode,"modalDialog");
this._initParentWindowRef();
if(this.parentWindow){
curam.dialog.pushOntoDialogHierarchy(this.parentWindow);
}else{
curam.dialog.pushOntoDialogHierarchy(curam.util.getTopmostWindow());
}
this.unsubscribes.push(this.subscribe("/dnd/move/start",dojo.hitch(this,this._startDrag)));
this.unsubscribes.push(this.subscribe("/dnd/move/stop",function(){
var ovr=dojo.query(".overlay-iframe")[0];
if(ovr){
dojo.destroy(ovr);
}
}));
this._registerInitListener();
var _56d=dojo.subscribe("/curam/dialog/iframeUnloaded",this,function(_56e,_56f){
if(this.id==_56e){
curam.debug.log(_56b.getProperty("curam.ModalDialog.unload"),_56e);
curam.dialog.removeFromDialogHierarchy(_56f);
dojo.style(this.iframe,"visibility","hidden");
this.initDone=false;
this._registerInitListener();
}
});
this.unsubscribes.push(_56d);
var _570=dojo.hitch(this,function(_571,_572){
curam.debug.log(_56b.getProperty("curam.ModalDialog.load.init"),_571);
curam.util.onLoad.removeSubscriber(this._getEventIdentifier(),_570);
curam.dialog.pushOntoDialogHierarchy(this.iframe.contentWindow);
this._determineSize(_572);
this._setTabIndex(this.iframe,"0");
if(!this.isRegisteredForClosing){
var _573=curam.util.getTopmostWindow();
this.unsubscribes.push(_573.dojo.subscribe("/curam/dialog/close",this,function(_574){
if(this.id==_574){
curam.debug.log("/curam/dialog/close "+_56b.getProperty("curam.ModalDialog.event.for"),_574);
this.hide();
}
}));
this.isRegisteredForClosing=true;
}
this.doShow(_572);
this._notifyModalDisplayed();
});
curam.util.onLoad.addSubscriber(this._getEventIdentifier(),_570);
var _575=true;
this.onLoadSubsequentHandler=dojo.hitch(this,function(_576,_577){
if(_575){
_575=false;
}else{
curam.debug.log(_56b.getProperty("curam.ModalDialog.load"),_576);
if(!_577.modalClosing){
curam.dialog.pushOntoDialogHierarchy(this.iframe.contentWindow);
this._determineSize(_577);
this._position(true);
this.doShow(_577);
this._notifyModalDisplayed();
}else{
curam.debug.log(_56b.getProperty("curam.ModalDialog.close"));
}
}
var _578=dojo.byId(_576);
var _579=_578.contentWindow.document.title;
_578.setAttribute("title",LOCALISED_MODAL_FRAME_TITLE+" - "+_579);
});
curam.util.onLoad.addSubscriber(this._getEventIdentifier(),this.onLoadSubsequentHandler);
this.unsubscribes.push(curam.util.getTopmostWindow().dojo.subscribe("/curam/dialog/iframeFailedToLoad",this,function(_57a){
curam.util.onLoad.removeSubscriber(this._getEventIdentifier(),_570);
this._determineSize({height:450,title:"Error!"});
this.doShow();
this._notifyModalDisplayed();
}));
this.unsubscribes.push(curam.util.getTopmostWindow().dojo.subscribe("/curam/dialog/displayed",this,this._setFocusHandler));
this.unsubscribes.push(curam.util.getTopmostWindow().dojo.subscribe("/curam/dialog/displayed",this,function(_57b){
if(_57b==this.id){
curam.util.getTopmostWindow().dojo.publish("/curam/dialog/AfterDisplay",[_57b]);
}
}));
this.unsubscribes.push(curam.util.getTopmostWindow().dojo.subscribe("/curam/dialog/displayed",this,function(){
curam.util._setModalCurrentlyOpening(false);
}));
var _57c=function(_57d){
return _57d.indexOf(":")>0;
};
var _57e=_57c(this.iframeHref)?this.iframeHref:this._getBaseUrl(curam.util.getTopmostWindow().location.href)+jsL+"/"+this.iframeHref;
this.uimController=new curam.ModalUIMController({uid:this.id,url:_57e,loadFrameOnCreate:false,inDialog:true,iframeId:this._getEventIdentifier(),width:this._calculateWidth(this.width)+"px",height:this.maximumHeight+"px"});
curam.debug.log("DEBUG: ModalDialog.js:postCreate(): uimController: "+this.uimController);
this.iframe=this.uimController.getIFrame();
curam.debug.log("DEBUG: ModalDialog.js:postCreate(): uimController.domNode: "+this.uimController.domNode);
this.modalconnects.push(dojo.connect(this,"onHide",this,this._onHideHandler));
this.set("content",this.uimController.domNode);
dojo.addClass(this.iframe,this._getEventIdentifier());
this.unsubscribes.push(curam.util.getTopmostWindow().dojo.subscribe("/curam/dialog/displayed",this,this._modalDisplayedHandler));
this.unsubscribes.push(curam.util.getTopmostWindow().dojo.subscribe("/curam/dialog/closed",this,this._modalClosedHandler));
this._registerOnIframeLoad(dojo.hitch(this,this._loadErrorHandler));
this.uimController.loadPage();
},hide:function(){
if(!this._alreadyInitialized){
return;
}
if(this._fadeInDeferred){
this._fadeInDeferred.cancel();
}
var _57f=dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,function(){
this.domNode.style.display="none";
dijit.Dialog._DialogLevelManager.hide(this);
this._fadeOutDeferred.callback(true);
delete this._fadeOutDeferred;
})});
this._fadeOutDeferred=new dojo.Deferred(dojo.hitch(this,function(){
_57f.stop();
delete this._fadeOutDeferred;
}));
dojo.hitch(this,"onHide")();
_57f.play();
if(this._scrollConnected){
this._scrollConnected=false;
}
var h;
while(h=this._modalconnects.pop()){
h.remove();
}
if(this._relativePosition){
delete this._relativePosition;
}
this._set("open",false);
return this._fadeOutDeferred;
},_getBaseUrl:function(_580){
var _581=_580.indexOf("?");
_580=(_581>-1)?_580.substring(0,_581):_580;
var _582=_580.lastIndexOf("/");
return _580.substring(0,_582+1);
},_setupHelpIcon:function(_583){
var _584=typeof _583!="undefined"?_583.helpEnabled:false;
var _585=_584?_583.helpExtension:"";
var _586=_584?_583.pageID:"";
var _587=dojo.query(".modalDialog span.dijitDialogCloseIcon");
for(var i=0;i<_587.length;i++){
if(_584&&!this._helpIcon){
this._helpIcon=this._createHelpIcon("dijitDialogHelpIcon","dijitDialogHelpIcon-hover",_585,_587[i]);
this._helpIcon.setAttribute("role","button");
this._setTabIndex(this._helpIcon,"0");
this._helpIcon.setAttribute("onKeyDown","curam.util.isShiftTab(event)");
this._helpIcon._enabled=false;
}
this._setTabIndex(_587[i],"0");
}
if(_584&&this._helpIcon){
this._helpIcon._pageID=_586;
}
if((_584&&this._helpIcon&&this._helpIcon._enabled)||(!_584||!this._helpIcon||!this._helpIcon._enabled)){
return;
}
dojo.style(this._helpIcon,"display",_584?"":"none");
this._helpIcon._enabled=_584;
},_createHelpIcon:function(_588,_589,_58a,_58b){
var icon=dojo.create("span",{"class":_588,"waiRole":"presentation","title":LOCALISED_MODAL_HELP_ALT});
dojo.place(icon,_58b,"before");
this.connect(icon,"onclick",function(){
var _58c=curam.config?curam.config.locale:jsL;
var url;
url="./help.jsp?pageID="+this._helpIcon._pageID;
window.open(url);
});
this.connect(icon,"onkeypress",function(){
if(curam.util.enterKeyPress(event)){
var _58d=curam.config?curam.config.locale:jsL;
var url;
url="./help.jsp?pageID="+this._helpIcon._pageID;
window.open(url);
}
});
if(_589){
this.connect(icon,"onmouseover",function(){
dojo.addClass(icon,_589);
});
this.connect(icon,"onmouseout",function(){
dojo.removeClass(icon,_589);
});
}
return icon;
},_registerInitListener:function(){
this.initUnsubToken=dojo.subscribe("/curam/dialog/init",this,function(){
dojo.publish("/curam/dialog/SetId",[this.id]);
this.initDone=true;
if(this.uimToken){
dojo.publish("/curam/dialog/uim/opened/"+this.uimToken,[this.id]);
}
dojo.unsubscribe(this.initUnsubToken);
});
},_getEventIdentifier:function(){
return "iframe-"+this.id;
},_registerOnIframeLoad:function(_58e){
if(dojo.isIE&&dojo.isIE<9){
this.onIframeLoadHandler=dojo.hitch(this,function(){
if(typeof this.iframe!="undefined"&&typeof this.iframe.readyState!="undefined"&&this.iframe.readyState=="complete"){
_58e();
}
});
this.iframe.attachEvent("onreadystatechange",this.onIframeLoadHandler);
}else{
this.modalconnects.push(dojo.connect(this.iframe,"onload",this,_58e));
}
},_startDrag:function(_58f){
if(!this.iframe){
return;
}
if(_58f&&_58f.node&&_58f.node===this.domNode){
var _590=dojo.create("div",{"class":"overlay-iframe"});
_590.innerHTML="";
dojo.place(_590,this.iframe,"before");
var size=dojo.contentBox(this.containerNode);
dojo.style(_590,{width:size.w+"px",height:size.h+"px"});
var _591=_569.getMarginBoxSimple(dijit._underlay.domNode);
var _592={l:_591.w-size.w-10,t:_591.h-size.h-30};
this._moveable.onMove=function(_593,_594,e){
_594.l=Math.max(5,Math.min(_594.l,_592.l));
_594.t=Math.max(5,Math.min(_594.t,_592.t));
dojo.dnd.Moveable.prototype.onMove.apply(this,[_593,_594,e]);
};
}
},_loadErrorHandler:function(){
curam.debug.log(_56b.getProperty("curam.ModalDialog.onload.notify"),this.iframe);
if(!this.initDone){
dojo.unsubscribe(this.initUnsubToken);
curam.debug.log(_56b.getProperty("curam.ModalDialog.firing")+" /curam/dialog/iframeFailedToLoad "+_56b.getProperty("curam.ModalDialog.for"),this.id);
curam.util.getTopmostWindow().dojo.publish("/curam/dialog/iframeFailedToLoad",[this.id]);
}else{
curam.debug.log("UIM "+_56b.getProperty("curam.ModalDialog.onload.success"));
}
},_setFocusHandler:function(_595){
if(_595==this.id&&this.initDone){
curam.debug.log("curam.ModalDialog_setFocusHandler(): "+_56b.getProperty("curam.ModalDialog.execute"),_595);
var _596=this.iframe.contentWindow;
var _597=_596.curam.util.doSetFocus();
if(!_597){
if(typeof _596.dijit=="object"&&typeof _596.dijit.focus=="function"){
_596.dijit.focus(this.iframe);
}else{
this.iframe.focus();
}
}
}
},_modalDisplayedHandler:function(_598){
if(_598==this.id){
curam.debug.log(_56b.getProperty("curam.ModalDialog.dialog.open.1")+"("+this.id+")"+_56b.getProperty("curam.ModalDialog.dialog.open.2"));
this._markAsActiveDialog(true);
}else{
if(!this.deactivatedBy){
curam.debug.log(_56b.getProperty("curam.ModalDialog.dialog.deactivating.1")+"("+this.id+"),"+_56b.getProperty("curam.ModalDialog.dialog.deactivating.2"),_598);
this._markAsActiveDialog(false);
this.deactivatedBy=_598;
}
}
},_modalClosedHandler:function(_599){
if(this.deactivatedBy==_599){
curam.debug.log(_56b.getProperty("curam.ModalDialog.dialog.activating.1")+"("+this.id+"),"+_56b.getProperty("curam.ModalDialog.dialog.activating.2"),_599);
this._markAsActiveDialog(true);
delete this.deactivatedBy;
}
},_destroyOldModals:function(){
require(["curam/dialog"]);
if(!curam.dialog.oldModalsToDestroy){
curam.dialog.oldModalsToDestroy=[];
}
dojo.forEach(curam.dialog.oldModalsToDestroy,function(_59a){
_59a._cleanupIframe();
_59a.destroyRecursive();
});
curam.dialog.oldModalsToDestroy=[];
},_initParentWindowRef:function(){
if(!this.parentWindow){
var _59b=null;
if(curam.tab.inTabbedUI()){
_59b=curam.tab.getContentPanelIframe();
}else{
if(_56a.inExternalApp()){
_59b=_56a.getUimParentWindow();
}
}
if(_59b){
this.parentWindow=_59b.contentWindow;
}
}else{
if(dojo.hasClass(this.parentWindow.frameElement,"detailsPanelFrame")){
var _59c=curam.tab.getContentPanelIframe();
var _59d=curam.util.getLastPathSegmentWithQueryString(_59c.src);
_59d=curam.util.removeUrlParam(_59d,"__o3rpu");
curam.debug.log("o3rpu "+_56b.getProperty("curam.ModalDialog.property"),encodeURIComponent(_59d));
this.iframeHref=curam.util.replaceUrlParam(this.iframeHref,"__o3rpu",encodeURIComponent(_59d));
this.parentWindow=_59c.contentWindow;
}
}
},_notifyModalDisplayed:function(){
curam.debug.log(_56b.getProperty("curam.ModalDialog.publishing")+" /curam/dialog/displayed "+_56b.getProperty("curam.ModalDialog.for"),this.id);
curam.util.getTopmostWindow().dojo.publish("/curam/dialog/displayed",[this.id,{width:this._determinedWidth,height:this._determinedHeight}]);
},_markAsActiveDialog:function(_59e){
var _59f="curam-active-modal";
if(_59e){
dojo.addClass(this.iframe,_59f);
curam.debug.log(_56b.getProperty("curam.ModalDialog.add.class"),[this.id,this.iframeHref]);
}else{
dojo.removeClass(this.iframe,_59f);
curam.debug.log(_56b.getProperty("curam.ModalDialog.remove.class"),[this.id,this.iframe.src]);
}
},_setHrefAttr:function(href){
curam.debug.log("setHrefAttr");
this.iframeHref=href;
this.inherited(arguments);
},_setTabIndex:function(_5a0,_5a1){
_5a0.setAttribute("tabIndex",_5a1);
},_position:function(_5a2){
curam.debug.log(_56b.getProperty("curam.ModalDialog.position"));
if(this._isMobileUADialogPositioned==false&&(this.open||_5a2)){
this.inherited(arguments);
if(this._isMobileUA==true){
this._isMobileUADialogPositioned=true;
}
}else{
curam.debug.log(_56b.getProperty("curam.ModalDialog.ignoring")+" curam.ModalDialog_position");
}
},_calculateWidth:function(_5a3){
if(_5a3){
_5a3=new Number(_5a3);
if(!this._isCDEJModal&&typeof (G11N_MODAL_DIALOG_ADJUSTMENT_FACTOR)!="undefined"){
_5a3*=G11N_MODAL_DIALOG_ADJUSTMENT_FACTOR;
}
if(_5a3>this.maximumWidth){
curam.debug.log(_56b.getProperty("curam.ModalDialog.specified.width.over"),this.maximumWidth);
return this.maximumWidth;
}else{
return Math.floor(_5a3);
}
}else{
var _5a4=this.defaultWidth;
if(!this._isCDEJModal&&typeof (G11N_MODAL_DIALOG_ADJUSTMENT_FACTOR)!="undefined"){
_5a4*=G11N_MODAL_DIALOG_ADJUSTMENT_FACTOR;
}
curam.debug.log(_56b.getProperty("curam.ModalDialog.default.width"),_5a4);
if(_5a4>this.maximumWidth){
curam.debug.log(_56b.getProperty("curam.ModalDialog.default.width.over"),this.maximumWidth);
return this.maximumWidth;
}else{
return Math.floor(_5a4);
}
}
},_calculateHeight:function(_5a5,_5a6){
if(_5a5){
_5a5=new Number(_5a5);
if(_5a5>this.maximumHeight){
curam.debug.log("specified height exceeds available space, "+"overriding with max available height of ",this.maximumHeight);
return this.maximumHeight;
}else{
if(_5a5<modalMinimumHeight){
curam.debug.log(_56b.getProperty("curam.ModalDialog.specified.height.over.1"),modalMinimumHeight);
return modalMinimumHeight;
}else{
return _5a5;
}
}
}else{
curam.debug.log(_56b.getProperty("curam.ModalDialog.no.height"),_5a6);
if(_5a6>this.maximumHeight){
curam.debug.log(_56b.getProperty("curam.ModalDialog.calculated.height.over.1"),this.maximumHeight);
return this.maximumHeight;
}else{
if(_5a6<modalMinimumHeight){
curam.debug.log(_56b.getProperty("curam.ModalDialog.calculated.height.over.2"),modalMinimumHeight);
return modalMinimumHeight;
}else{
return _5a6;
}
}
}
},_determineSize:function(_5a7){
var _5a8=_5a7.height;
var _5a9=_5a7.windowOptions;
curam.debug.log(_56b.getProperty("curam.ModalDialog.size"));
try{
var w=this._calculateWidth(this.width);
var h=this._calculateHeight(this.height,_5a8);
if(_5a9){
if(_5a9["width"]||_5a9["height"]){
curam.debug.log(_56b.getProperty("curam.ModalDialog.options"));
w=this._calculateWidth(_5a9["width"]);
h=this._calculateHeight(_5a9["height"],_5a8);
}
}
curam.debug.log("curam.ModalDialog:_determineSize() %s x %s",w,h);
this.uimController.setDimensionsForModalDialog(w,h,_5a7);
this._determinedWidth=w;
this._determinedHeight=h;
this.setTitle(_5a7,w);
}
catch(e){
curam.debug.log("curam.ModalDialog:_determineSize() : "+_56b.getProperty("curam.ModalDialog.error")+dojo.toJson(e));
}
},setTitle:function(_5aa,_5ab){
var _5ac=_5aa.title;
if(!_5ac){
curam.debug.log("curam.ModalDialog.setTitle() - "+_56b.getProperty("curam.ModalDialog.no.title"));
_5ac="";
}
var _5ad=_5aa.messageTitleAppend;
curam.debug.log("curam.ModalDialog.setTitle('%s')",_5ac);
var _5ae=_5ac.indexOf(_5ad);
if(_5ae!=-1){
var _5af=dojo.create("span",{innerHTML:_5ad,"class":"messagesPresent"});
_5ac=_5ac.split(_5ad).join("<span class=\"messagesPresent\">"+_5ad+"</span>");
}
this.titleNode.innerHTML=_5ac;
dojo.style(this.titleBar,{width:_5ab+"px",height:21+"px"});
dojo.style(this.titleNode,"width",Math.ceil(_5ab*0.85)+"px");
},doShow:function(_5b0){
curam.debug.log("curam.ModalDialog.doShow(): "+_56b.getProperty("curam.ModalDialog.show"));
if(!this.initialized){
this.initialized=true;
}
this._setupHelpIcon(_5b0);
this.show();
dojo.style(this.iframe,"visibility","visible");
dojo.style(this.domNode,{visibility:"visible"});
},_onHideHandler:function(){
curam.util.getTopmostWindow().dojo.publish("/curam/dialog/BeforeClose",[this.id]);
dojo.style(this.domNode,{visibility:"hidden",display:"block"});
require(["curam/dialog"]);
curam.dialog.removeFromDialogHierarchy(this.iframe.contentWindow);
curam.dialog.removeFromDialogHierarchy(this.parentWindow);
var _5b1=curam.util.getTopmostWindow();
_5b1.dojo.publish("/curam/dialog/closed",[this.id]);
dojo.unsubscribe(this.initUnsubToken);
dojo.forEach(this.unsubscribes,_5b1.dojo.unsubscribe);
this.unsubscribes=[];
dojo.forEach(this.modalconnects,dojo.disconnect);
this.modalconnects=[];
if(dojo.isIE&&dojo.isIE<9){
this.iframe.detachEvent("onreadystatechange",this.onIframeLoadHandler);
}
curam.util.onLoad.removeSubscriber(this._getEventIdentifier(),this.onLoadSubsequentHandler);
if(this._explodeNode&&this._explodeNode.parentNode){
this._explodeNode.parentNode.removeChild(this._explodeNode);
}
curam.debug.log(_56b.getProperty("curam.ModalDialog.deactivating",[this.id]));
this._markAsActiveDialog(false);
if(typeof this.parentWindow!="undefined"&&this.parentWindow!=null){
this.parentWindow.focus();
}
delete this.parentWindow;
curam.dialog.oldModalsToDestroy.push(this);
},_cleanupIframe:function(){
delete this.content;
delete this.uimController;
var ifrm=this.iframe;
ifrm.src="";
delete this.iframe;
dojo.destroy(ifrm);
}});
return _56c;
});
},"curam/widget/OptimalBrowserMessage":function(){
require({cache:{"url:curam/widget/templates/OptimalBrowserMessage.html":"<div>\n  <div class=\"hidden\"\n       data-dojo-type=\"dojox/layout/ContentPane\"\n       data-dojo-attach-point=\"_optimalMessage\">\n  </div>\n</div>\n"}});
define("curam/widget/OptimalBrowserMessage",["dojo/_base/declare","dojo/_base/lang","curam/util","curam/util/UIMFragment","curam/ui/ClientDataAccessor","dijit/_Widget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/form/Button","dojo/text!curam/widget/templates/OptimalBrowserMessage.html"],function(_5b2,lang,util,_5b3,_5b4,_5b5,_5b6,_5b7,_5b8,_5b9,_5ba,_5bb){
return _5b2("curam.widget.OptimalBrowserMessage",[_5b5,_5b6,_5b7],{OPTIMAL_BROWSER_MSG:"optimal-browser-msg",isExternalApp:null,optimalBrowserMsgPaddingCSS:"optimal-browser-banner",optimalBrowserNode:null,appSectionsNode:null,appBannerHeaderNode:null,intApp:"internal",extApp:"external",context:null,templateString:_5bb,widgetsInTemplate:true,baseClass:"",optimalBrowserNodeID:"_optimalMessage",_appConfig:null,postMixInProperties:function(){
this.inherited(arguments);
},startup:function(){
this.inherited(arguments);
this._init();
this._loadNodes(this._optimalMessage.id);
},_init:function(){
da=new _5b4();
da.getRaw("/config/tablayout/settings["+curam.config.appID+"]",lang.hitch(this,function(data){
console.log("External App config data:"+data);
this._appConfig=data;
this._getAppConfig();
}),function(_5bc,args){
console.log("External App config data load error:"+_5bc);
},null);
},_getAppConfig:function(){
var _5bd=this._appConfig.optimalBrowserMessageEnabled;
var _5be=util.getTopmostWindow().dojox;
var _5bf=this._createStorageKey(this.OPTIMAL_BROWSER_MSG);
var _5c0=this;
var _5c1=false;
if(_5bd=="true"|_5bd=="TRUE"){
util.runStorageFn(function(){
_5c1=true;
_5c0.context=_5be;
return _5c0._isOptimalBrowserCheckDue(_5be,_5bf,_5c0);
});
if(!_5c1){
return this._isOptimalBrowserCheckDue(this.context,_5bf,_5c0);
}
}
return false;
},_isOptimalBrowserCheckDue:function(_5c2,_5c3,_5c4){
if(_5c2!=undefined){
var _5c5=_5c2.storage.get(_5c3);
if(_5c5&&_5c5!=""){
if(new Date(_5c4._getTargetDate())>new Date(_5c5)){
_5c4._executeBrowserVersionCheck(_5c2);
return true;
}
}else{
_5c4._executeBrowserVersionCheck(_5c2);
return true;
}
return false;
}
},_executeBrowserVersionCheck:function(_5c6){
var _5c7=this._appConfig.ieMinVersion;
var _5c8=this._appConfig.ieMaxVersion;
var _5c9=this._appConfig.ffMinVersion;
var _5ca=this._appConfig.ffMaxVersion;
var _5cb=this._appConfig.chromeMinVersion;
var _5cc=this._appConfig.chromeMaxVersion;
var _5cd=this._appConfig.safariMinVersion;
var _5ce=this._appConfig.safariMaxVersion;
var _5cf=dojo.isIE;
var _5d0=dojo.isFF;
var _5d1=dojo.isChrome;
var _5d2=dojo.isSafari;
if(_5cf!=undefined){
return this._isCurrentBrowserVerSupported(_5c6,_5cf,_5c7,_5c8);
}else{
if(_5d0!=undefined&&this.isExternalApp){
return this._isCurrentBrowserVerSupported(_5c6,_5d0,_5c9,_5ca);
}else{
if(_5d1!=undefined){
return this._isCurrentBrowserVerSupported(_5c6,_5d1,_5cb,_5cc);
}else{
if(_5d2!=undefined&&this.isExternalApp){
return this._isCurrentBrowserVerSupported(_5c6,_5d2,_5cd,_5ce);
}
}
}
}
return false;
},_isCurrentBrowserVerSupported:function(_5d3,_5d4,_5d5,_5d6){
var _5d7=false;
if(_5d5>0){
if(_5d4<_5d5){
_5d7=true;
this._displayOptimalBrowserMsg(_5d3);
return true;
}
}
if(_5d6>0&&!_5d7){
if(_5d4>_5d6){
this._displayOptimalBrowserMsg(_5d3);
return true;
}
}
return false;
},_displayOptimalBrowserMsg:function(_5d8){
this._addOrRemoveCssForInternalApp(true,this.optimalBrowserMsgPaddingCSS);
_5b3.get({url:"optimal-browser-msg-fragment.jspx",targetID:this._optimalMessage.id});
this._postRenderingTasks(_5d8);
},_postRenderingTasks:function(_5d9){
var _5da=this._optimalMessage.id;
dojo.addOnLoad(function(){
var _5db=dojo.byId(_5da);
dojo.removeClass(_5db,_5db.className);
});
if(_5d9.storage!=undefined){
_5d9.storage.put(this._createStorageKey(this.OPTIMAL_BROWSER_MSG),this._getTargetDate(this._appConfig.nextBrowserCheck));
}
return _5d9;
},_loadNodes:function(_5dc){
dojo.addOnLoad(function(){
this.optimalBrowserNode=dojo.byId(_5dc);
this.appSectionsNode=dojo.byId("app-sections-container-dc");
this.appBannerHeaderNode=dojo.byId("app-header-container-dc");
});
},_createStorageKey:function(_5dd){
if(this.isExternalApp){
_5dd=_5dd+"_"+this.extApp;
}else{
_5dd=_5dd+"_"+this.intApp;
}
return _5dd;
},_addOrRemoveCssForInternalApp:function(_5de,_5df){
var _5e0=this.isExternalApp;
dojo.addOnLoad(function(){
if(!_5e0){
if(_5de){
dojo.addClass(this.appSectionsNode,_5df);
if(this.appBannerHeaderNode){
dojo.addClass(this.appSectionsNode.children.item(1),_5df);
dojo.addClass(this.appSectionsNode.children.item(2),_5df);
}
}else{
dojo.removeClass(this.appSectionsNode,_5df);
if(this.appBannerHeaderNode){
dojo.removeClass(this.appSectionsNode.children.item(1),_5df);
dojo.removeClass(this.appSectionsNode.children.item(2),_5df);
}
}
}
});
},_getTargetDate:function(_5e1){
var _5e2=new Date();
if(_5e1==undefined){
_5e2.setDate(_5e2.getDate());
}else{
_5e2.setDate(_5e2.getDate()+_5e1);
}
return _5e2.toUTCString();
},exitOptimalBrowserMessageBox:function(){
var _5e3=dojo.byId(this._optimalMessage.id);
if(_5e3){
_5e3.parentNode.removeChild(_5e3);
}
this._addOrRemoveCssForInternalApp(false,this.optimalBrowserMsgPaddingCSS);
}});
});
},"dijit/form/_TextBoxMixin":function(){
define("dijit/form/_TextBoxMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/_base/event","dojo/keys","dojo/_base/lang",".."],function(_5e4,_5e5,dom,_5e6,keys,lang,_5e7){
var _5e8=_5e5("dijit.form._TextBoxMixin",null,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",selectOnClick:false,placeHolder:"",_getValueAttr:function(){
return this.parse(this.get("displayedValue"),this.constraints);
},_setValueAttr:function(_5e9,_5ea,_5eb){
var _5ec;
if(_5e9!==undefined){
_5ec=this.filter(_5e9);
if(typeof _5eb!="string"){
if(_5ec!==null&&((typeof _5ec!="number")||!isNaN(_5ec))){
_5eb=this.filter(this.format(_5ec,this.constraints));
}else{
_5eb="";
}
}
}
if(_5eb!=null&&_5eb!=undefined&&((typeof _5eb)!="number"||!isNaN(_5eb))&&this.textbox.value!=_5eb){
this.textbox.value=_5eb;
this._set("displayedValue",this.get("displayedValue"));
}
if(this.textDir=="auto"){
this.applyTextDir(this.focusNode,_5eb);
}
this.inherited(arguments,[_5ec,_5ea]);
},displayedValue:"",_getDisplayedValueAttr:function(){
return this.filter(this.textbox.value);
},_setDisplayedValueAttr:function(_5ed){
if(_5ed===null||_5ed===undefined){
_5ed="";
}else{
if(typeof _5ed!="string"){
_5ed=String(_5ed);
}
}
this.textbox.value=_5ed;
this._setValueAttr(this.get("value"),undefined);
this._set("displayedValue",this.get("displayedValue"));
if(this.textDir=="auto"){
this.applyTextDir(this.focusNode,_5ed);
}
},format:function(_5ee){
return ((_5ee==null||_5ee==undefined)?"":(_5ee.toString?_5ee.toString():_5ee));
},parse:function(_5ef){
return _5ef;
},_refreshState:function(){
},onInput:function(){
},__skipInputEvent:false,_onInput:function(){
if(this.textDir=="auto"){
this.applyTextDir(this.focusNode,this.focusNode.value);
}
this._refreshState();
this._set("displayedValue",this.get("displayedValue"));
},postCreate:function(){
this.textbox.setAttribute("value",this.textbox.value);
this.inherited(arguments);
var _5f0=function(e){
var _5f1=e.charOrCode||e.keyCode||229;
if(e.type=="keydown"){
switch(_5f1){
case keys.SHIFT:
case keys.ALT:
case keys.CTRL:
case keys.META:
case keys.CAPS_LOCK:
return;
default:
if(_5f1>=65&&_5f1<=90){
return;
}
}
}
if(e.type=="keypress"&&typeof _5f1!="string"){
return;
}
if(e.type=="input"){
if(this.__skipInputEvent){
this.__skipInputEvent=false;
return;
}
}else{
this.__skipInputEvent=true;
}
var faux=lang.mixin({},e,{charOrCode:_5f1,wasConsumed:false,preventDefault:function(){
faux.wasConsumed=true;
e.preventDefault();
},stopPropagation:function(){
e.stopPropagation();
}});
if(this.onInput(faux)===false){
_5e6.stop(faux);
}
if(faux.wasConsumed){
return;
}
setTimeout(lang.hitch(this,"_onInput",faux),0);
};
_5e4.forEach(["onkeydown","onkeypress","onpaste","oncut","oninput","oncompositionend"],function(_5f2){
this.connect(this.textbox,_5f2,_5f0);
},this);
},_blankValue:"",filter:function(val){
if(val===null){
return this._blankValue;
}
if(typeof val!="string"){
return val;
}
if(this.trim){
val=lang.trim(val);
}
if(this.uppercase){
val=val.toUpperCase();
}
if(this.lowercase){
val=val.toLowerCase();
}
if(this.propercase){
val=val.replace(/[^\s]+/g,function(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
});
}
return val;
},_setBlurValue:function(){
this._setValueAttr(this.get("value"),true);
},_onBlur:function(e){
if(this.disabled){
return;
}
this._setBlurValue();
this.inherited(arguments);
if(this._selectOnClickHandle){
this.disconnect(this._selectOnClickHandle);
}
},_isTextSelected:function(){
return this.textbox.selectionStart==this.textbox.selectionEnd;
},_onFocus:function(by){
if(this.disabled||this.readOnly){
return;
}
if(this.selectOnClick&&by=="mouse"){
this._selectOnClickHandle=this.connect(this.domNode,"onmouseup",function(){
this.disconnect(this._selectOnClickHandle);
if(this._isTextSelected()){
_5e8.selectInputText(this.textbox);
}
});
}
this.inherited(arguments);
this._refreshState();
},reset:function(){
this.textbox.value="";
this.inherited(arguments);
},_setTextDirAttr:function(_5f3){
if(!this._created||this.textDir!=_5f3){
this._set("textDir",_5f3);
this.applyTextDir(this.focusNode,this.focusNode.value);
}
}});
_5e8._setSelectionRange=_5e7._setSelectionRange=function(_5f4,_5f5,stop){
if(_5f4.setSelectionRange){
_5f4.setSelectionRange(_5f5,stop);
}
};
_5e8.selectInputText=_5e7.selectInputText=function(_5f6,_5f7,stop){
_5f6=dom.byId(_5f6);
if(isNaN(_5f7)){
_5f7=0;
}
if(isNaN(stop)){
stop=_5f6.value?_5f6.value.length:0;
}
try{
_5f6.focus();
_5e8._setSelectionRange(_5f6,_5f7,stop);
}
catch(e){
}
};
return _5e8;
});
},"url:curam/widget/templates/OptimalBrowserMessage.html":"<div>\n  <div class=\"hidden\"\n       data-dojo-type=\"dojox/layout/ContentPane\"\n       data-dojo-attach-point=\"_optimalMessage\">\n  </div>\n</div>\n","dijit/a11y":function(){
define("dijit/a11y",["dojo/_base/array","dojo/_base/config","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-style","dojo/_base/sniff","./_base/manager","."],function(_5f8,_5f9,_5fa,dom,_5fb,_5fc,has,_5fd,_5fe){
var _5ff=(_5fe._isElementShown=function(elem){
var s=_5fc.get(elem);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(_5fb.get(elem,"type")!="hidden");
});
_5fe.hasDefaultTabStop=function(elem){
switch(elem.nodeName.toLowerCase()){
case "a":
return _5fb.has(elem,"href");
case "area":
case "button":
case "input":
case "object":
case "select":
case "textarea":
return true;
case "iframe":
var body;
try{
var _600=elem.contentDocument;
if("designMode" in _600&&_600.designMode=="on"){
return true;
}
body=_600.body;
}
catch(e1){
try{
body=elem.contentWindow.document.body;
}
catch(e2){
return false;
}
}
return body&&(body.contentEditable=="true"||(body.firstChild&&body.firstChild.contentEditable=="true"));
default:
return elem.contentEditable=="true";
}
};
var _601=(_5fe.isTabNavigable=function(elem){
if(_5fb.get(elem,"disabled")){
return false;
}else{
if(_5fb.has(elem,"tabIndex")){
return _5fb.get(elem,"tabIndex")>=0;
}else{
return _5fe.hasDefaultTabStop(elem);
}
}
});
_5fe._getTabNavigable=function(root){
var _602,last,_603,_604,_605,_606,_607={};
function _608(node){
return node&&node.tagName.toLowerCase()=="input"&&node.type&&node.type.toLowerCase()=="radio"&&node.name&&node.name.toLowerCase();
};
var _609=function(_60a){
for(var _60b=_60a.firstChild;_60b;_60b=_60b.nextSibling){
if(_60b.nodeType!=1||(has("ie")<=9&&_60b.scopeName!=="HTML")||!_5ff(_60b)){
continue;
}
if(_601(_60b)){
var _60c=_5fb.get(_60b,"tabIndex");
if(!_5fb.has(_60b,"tabIndex")||_60c==0){
if(!_602){
_602=_60b;
}
last=_60b;
}else{
if(_60c>0){
if(!_603||_60c<_604){
_604=_60c;
_603=_60b;
}
if(!_605||_60c>=_606){
_606=_60c;
_605=_60b;
}
}
}
var rn=_608(_60b);
if(_5fb.get(_60b,"checked")&&rn){
_607[rn]=_60b;
}
}
if(_60b.nodeName.toUpperCase()!="SELECT"){
_609(_60b);
}
}
};
if(_5ff(root)){
_609(root);
}
function rs(node){
return _607[_608(node)]||node;
};
return {first:rs(_602),last:rs(last),lowest:rs(_603),highest:rs(_605)};
};
_5fe.getFirstInTabbingOrder=function(root){
var _60d=_5fe._getTabNavigable(dom.byId(root));
return _60d.lowest?_60d.lowest:_60d.first;
};
_5fe.getLastInTabbingOrder=function(root){
var _60e=_5fe._getTabNavigable(dom.byId(root));
return _60e.last?_60e.last:_60e.highest;
};
return {hasDefaultTabStop:_5fe.hasDefaultTabStop,isTabNavigable:_5fe.isTabNavigable,_getTabNavigable:_5fe._getTabNavigable,getFirstInTabbingOrder:_5fe.getFirstInTabbingOrder,getLastInTabbingOrder:_5fe.getLastInTabbingOrder};
});
},"url:dijit/templates/Dialog.html":"<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span>\n\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabIndex=\"-1\">\n\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t</span>\n\t</div>\n\t\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n","dijit/form/TextBox":function(){
require({cache:{"url:dijit/form/templates/TextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"}});
define("dijit/form/TextBox",["dojo/_base/declare","dojo/dom-construct","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/_base/sniff","dojo/_base/window","./_FormValueWidget","./_TextBoxMixin","dojo/text!./templates/TextBox.html",".."],function(_60f,_610,_611,_612,lang,has,win,_613,_614,_615,_616){
var _617=_60f([_613,_614],{templateString:_615,_singleNodeTemplate:"<input class=\"dijit dijitReset dijitLeft dijitInputField\" data-dojo-attach-point=\"textbox,focusNode\" autocomplete=\"off\" type=\"${type}\" ${!nameAttrSetting} />",_buttonInputDisabled:has("ie")?"disabled":"",baseClass:"dijitTextBox",postMixInProperties:function(){
var type=this.type.toLowerCase();
if(this.templateString&&this.templateString.toLowerCase()=="input"||((type=="hidden"||type=="file")&&this.templateString==this.constructor.prototype.templateString)){
this.templateString=this._singleNodeTemplate;
}
this.inherited(arguments);
},_onInput:function(e){
this.inherited(arguments);
if(this.intermediateChanges){
var _618=this;
setTimeout(function(){
_618._handleOnChange(_618.get("value"),false);
},0);
}
},_setPlaceHolderAttr:function(v){
this._set("placeHolder",v);
if(!this._phspan){
this._attachPoints.push("_phspan");
this._phspan=_610.create("span",{onmousedown:function(e){
e.preventDefault();
},className:"dijitPlaceHolder dijitInputField"},this.textbox,"after");
}
this._phspan.innerHTML="";
this._phspan.appendChild(document.createTextNode(v));
this._updatePlaceHolder();
},_updatePlaceHolder:function(){
if(this._phspan){
this._phspan.style.display=(this.placeHolder&&!this.focused&&!this.textbox.value)?"":"none";
}
},_setValueAttr:function(_619,_61a,_61b){
this.inherited(arguments);
this._updatePlaceHolder();
},getDisplayedValue:function(){
_612.deprecated(this.declaredClass+"::getDisplayedValue() is deprecated. Use set('displayedValue') instead.","","2.0");
return this.get("displayedValue");
},setDisplayedValue:function(_61c){
_612.deprecated(this.declaredClass+"::setDisplayedValue() is deprecated. Use set('displayedValue', ...) instead.","","2.0");
this.set("displayedValue",_61c);
},_onBlur:function(e){
if(this.disabled){
return;
}
this.inherited(arguments);
this._updatePlaceHolder();
},_onFocus:function(by){
if(this.disabled||this.readOnly){
return;
}
this.inherited(arguments);
this._updatePlaceHolder();
}});
if(has("ie")){
_617=_60f(_617,{declaredClass:"dijit.form.TextBox",_isTextSelected:function(){
var _61d=win.doc.selection.createRange();
var _61e=_61d.parentElement();
return _61e==this.textbox&&_61d.text.length==0;
},postCreate:function(){
this.inherited(arguments);
setTimeout(lang.hitch(this,function(){
try{
var s=_611.getComputedStyle(this.domNode);
if(s){
var ff=s.fontFamily;
if(ff){
var _61f=this.domNode.getElementsByTagName("INPUT");
if(_61f){
for(var i=0;i<_61f.length;i++){
_61f[i].style.fontFamily=ff;
}
}
}
}
}
catch(e){
}
}),0);
}});
_616._setSelectionRange=_614._setSelectionRange=function(_620,_621,stop){
if(_620.createTextRange){
var r=_620.createTextRange();
r.collapse(true);
r.moveStart("character",-99999);
r.moveStart("character",_621);
r.moveEnd("character",stop-_621);
r.select();
}
};
}else{
if(has("mozilla")){
_617=_60f(_617,{declaredClass:"dijit.form.TextBox",_onBlur:function(e){
this.inherited(arguments);
if(this.selectOnClick){
this.textbox.selectionStart=this.textbox.selectionEnd=undefined;
}
}});
}else{
_617.prototype.declaredClass="dijit.form.TextBox";
}
}
lang.setObject("dijit.form.TextBox",_617);
return _617;
});
},"dijit/layout/StackContainer":function(){
define("dijit/layout/StackContainer",["dojo/_base/array","dojo/cookie","dojo/_base/declare","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/ready","dojo/topic","../registry","../_WidgetBase","./_LayoutWidget","dojo/i18n!../nls/common"],function(_622,_623,_624,_625,_626,lang,_627,_628,_629,_62a,_62b){
if(!_626.isAsync){
_627(0,function(){
var _62c=["dijit/layout/StackController"];
require(_62c);
});
}
lang.extend(_62a,{selected:false,closable:false,iconClass:"dijitNoIcon",showTitle:true});
return _624("dijit.layout.StackContainer",_62b,{doLayout:true,persist:false,baseClass:"dijitStackContainer",buildRendering:function(){
this.inherited(arguments);
_625.add(this.domNode,"dijitLayoutContainer");
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onkeypress",this._onKeyPress);
},startup:function(){
if(this._started){
return;
}
var _62d=this.getChildren();
_622.forEach(_62d,this._setupChild,this);
if(this.persist){
this.selectedChildWidget=_629.byId(_623(this.id+"_selectedChild"));
}else{
_622.some(_62d,function(_62e){
if(_62e.selected){
this.selectedChildWidget=_62e;
}
return _62e.selected;
},this);
}
var _62f=this.selectedChildWidget;
if(!_62f&&_62d[0]){
_62f=this.selectedChildWidget=_62d[0];
_62f.selected=true;
}
_628.publish(this.id+"-startup",{children:_62d,selected:_62f});
this.inherited(arguments);
},resize:function(){
if(!this._hasBeenShown){
this._hasBeenShown=true;
var _630=this.selectedChildWidget;
if(_630){
this._showChild(_630);
}
}
this.inherited(arguments);
},_setupChild:function(_631){
this.inherited(arguments);
_625.replace(_631.domNode,"dijitHidden","dijitVisible");
_631.domNode.title="";
},addChild:function(_632,_633){
this.inherited(arguments);
if(this._started){
_628.publish(this.id+"-addChild",_632,_633);
this.layout();
if(!this.selectedChildWidget){
this.selectChild(_632);
}
}
},removeChild:function(page){
this.inherited(arguments);
if(this._started){
_628.publish(this.id+"-removeChild",page);
}
if(this._descendantsBeingDestroyed){
return;
}
if(this.selectedChildWidget===page){
this.selectedChildWidget=undefined;
if(this._started){
var _634=this.getChildren();
if(_634.length){
this.selectChild(_634[0]);
}
}
}
if(this._started){
this.layout();
}
},selectChild:function(page,_635){
page=_629.byId(page);
if(this.selectedChildWidget!=page){
var d=this._transition(page,this.selectedChildWidget,_635);
if(d){
this._set("selectedChildWidget",page);
_628.publish(this.id+"-selectChild",page);
if(this.persist){
_623(this.id+"_selectedChild",this.selectedChildWidget.id);
}
}
}
return d;
},_transition:function(_636,_637){
if(_637){
this._hideChild(_637);
}
var d=this._showChild(_636);
if(d&&_636.resize){
if(this.doLayout){
_636.resize(this._containerContentBox||this._contentBox);
}else{
_636.resize();
}
}
return d;
},_adjacent:function(_638){
var _639=this.getChildren();
var _63a=_622.indexOf(_639,this.selectedChildWidget);
_63a+=_638?1:_639.length-1;
return _639[_63a%_639.length];
},forward:function(){
return this.selectChild(this._adjacent(true),true);
},back:function(){
return this.selectChild(this._adjacent(false),true);
},_onKeyPress:function(e){
_628.publish(this.id+"-containerKeyPress",{e:e,page:this});
},layout:function(){
var _63b=this.selectedChildWidget;
if(_63b&&_63b.resize){
if(this.doLayout){
_63b.resize(this._containerContentBox||this._contentBox);
}else{
_63b.resize();
}
}
},_showChild:function(page){
if(page){
var _63c=this.getChildren();
page.isFirstChild=(page==_63c[0]);
page.isLastChild=(page==_63c[_63c.length-1]);
page._set("selected",true);
_625.replace(page.domNode,"dijitVisible","dijitHidden");
return (page._onShow&&page._onShow())||true;
}
},_hideChild:function(page){
page._set("selected",false);
_625.replace(page.domNode,"dijitHidden","dijitVisible");
page.onHide&&page.onHide();
},closeChild:function(page){
var _63d=page.onClose(this,page);
if(_63d){
this.removeChild(page);
page.destroyRecursive();
}
},destroyDescendants:function(_63e){
this._descendantsBeingDestroyed=true;
this.selectedChildWidget=undefined;
_622.forEach(this.getChildren(),function(_63f){
if(!_63e){
this.removeChild(_63f);
}
_63f.destroyRecursive(_63e);
},this);
this._descendantsBeingDestroyed=false;
}});
});
},"curam/util/external":function(){
define("curam/util/external",["curam/util"],function(util){
curam.define.singleton("curam.util.external",{inExternalApp:function(){
return jsScreenContext.hasContextBits("EXTAPP");
},getUimParentWindow:function(){
if(util.getTopmostWindow()===dojo.global){
return null;
}else{
return dojo.global;
}
}});
return curam.util.external;
});
},"dojox/storage/CookieStorageProvider":function(){
define("dojox/storage/CookieStorageProvider",["dijit","dojo","dojox","dojo/require!dojox/storage/Provider,dojox/storage/manager,dojo/cookie"],function(_640,dojo,_641){
dojo.provide("dojox.storage.CookieStorageProvider");
dojo.require("dojox.storage.Provider");
dojo.require("dojox.storage.manager");
dojo.require("dojo.cookie");
dojo.declare("dojox.storage.CookieStorageProvider",[_641.storage.Provider],{store:null,cookieName:"dojoxStorageCookie",storageLife:730,initialize:function(){
this.store=dojo.fromJson(dojo.cookie(this.cookieName))||{};
this.initialized=true;
_641.storage.manager.loaded();
},isAvailable:function(){
return dojo.cookie.isSupported();
},put:function(key,_642,_643,_644){
this._assertIsValidKey(key);
_644=_644||this.DEFAULT_NAMESPACE;
this._assertIsValidNamespace(_644);
fullKey=this.getFullKey(key,_644);
this.store[fullKey]=dojo.toJson(_642);
this._save();
var _645=dojo.toJson(this.store)===dojo.cookie(this.cookieName);
if(!_645){
this.remove(key,_644);
}
if(_643){
_643(_645?this.SUCCESS:this.FAILED,key,null,_644);
}
},get:function(key,_646){
this._assertIsValidKey(key);
_646=_646||this.DEFAULT_NAMESPACE;
this._assertIsValidNamespace(_646);
key=this.getFullKey(key,_646);
return this.store[key]?dojo.fromJson(this.store[key]):null;
},getKeys:function(_647){
_647=_647||this.DEFAULT_NAMESPACE;
this._assertIsValidNamespace(_647);
_647="__"+_647+"_";
var keys=[];
for(var _648 in this.store){
if(this._beginsWith(_648,_647)){
_648=_648.substring(_647.length);
keys.push(_648);
}
}
return keys;
},clear:function(_649){
_649=_649||this.DEFAULT_NAMESPACE;
this._assertIsValidNamespace(_649);
_649="__"+_649+"_";
for(var _64a in this.store){
if(this._beginsWith(_64a,_649)){
delete (this.store[_64a]);
}
}
this._save();
},remove:function(key,_64b){
_64b=_64b||this.DEFAULT_NAMESPACE;
this._assertIsValidNamespace(_64b);
this._assertIsValidKey(key);
key=this.getFullKey(key,_64b);
delete this.store[key];
this._save();
},getNamespaces:function(){
var _64c=[this.DEFAULT_NAMESPACE];
var _64d={};
_64d[this.DEFAULT_NAMESPACE]=true;
var _64e=/^__([^_]*)_/;
for(var _64f in this.store){
if(_64e.test(_64f)==true){
var _650=_64f.match(_64e)[1];
if(typeof _64d[_650]=="undefined"){
_64d[_650]=true;
_64c.push(_650);
}
}
}
return _64c;
},isPermanent:function(){
return true;
},getMaximumSize:function(){
return 4;
},hasSettingsUI:function(){
return false;
},isValidKey:function(_651){
if(_651===null||_651===undefined){
return false;
}
return /^[0-9A-Za-z_-]*$/.test(_651);
},isValidNamespace:function(_652){
if(_652===null||_652===undefined){
return false;
}
return /^[0-9A-Za-z-]*$/.test(_652);
},getFullKey:function(key,_653){
return "__"+_653+"_"+key;
},_save:function(){
dojo.cookie(this.cookieName,dojo.toJson(this.store),{expires:this.storageLife});
},_beginsWith:function(_654,_655){
if(_655.length>_654.length){
return false;
}
return _654.substring(0,_655.length)===_655;
},_assertIsValidNamespace:function(_656){
if(this.isValidNamespace(_656)===false){
throw new Error("Invalid namespace given: "+_656);
}
},_assertIsValidKey:function(key){
if(this.isValidKey(key)===false){
throw new Error("Invalid key given: "+key);
}
}});
_641.storage.manager.register("dojox.storage.CookieStorageProvider",new _641.storage.CookieStorageProvider());
});
},"curam/util/Navigation":function(){
define("curam/util/Navigation",["curam/util","curam/tab","curam/define"],function(){
curam.define.singleton("curam.util.Navigation",{goToPage:function(_657,_658){
var url=_657+"Page.do"+curam.util.makeQueryString(_658);
curam.util.Navigation.goToUrl(url);
},goToUrl:function(_659){
curam.tab.getTabController().processURL(_659);
}});
return curam.util.Navigation;
});
},"curam/util/RuntimeContext":function(){
define("curam/util/RuntimeContext",[],function(){
var _65a=dojo.declare("curam.util.RuntimeContext",null,{_window:null,constructor:function(_65b){
this._window=_65b;
},getHref:function(){
return this._window.location.href;
},getPathName:function(){
return this._window.location.pathName;
},contextObject:function(){
return this._window;
}});
return _65a;
});
},"dojox/encoding/digests/_base":function(){
define("dojox/encoding/digests/_base",["dojo/_base/lang"],function(lang){
var d=lang.getObject("dojox.encoding.digests",true);
d.outputTypes={Base64:0,Hex:1,String:2,Raw:3};
d.addWords=function(a,b){
var l=(a&65535)+(b&65535);
var m=(a>>16)+(b>>16)+(l>>16);
return (m<<16)|(l&65535);
};
var _65c=8;
var mask=(1<<_65c)-1;
d.stringToWord=function(s){
var wa=[];
for(var i=0,l=s.length*_65c;i<l;i+=_65c){
wa[i>>5]|=(s.charCodeAt(i/_65c)&mask)<<(i%32);
}
return wa;
};
d.wordToString=function(wa){
var s=[];
for(var i=0,l=wa.length*32;i<l;i+=_65c){
s.push(String.fromCharCode((wa[i>>5]>>>(i%32))&mask));
}
return s.join("");
};
d.wordToHex=function(wa){
var h="0123456789abcdef",s=[];
for(var i=0,l=wa.length*4;i<l;i++){
s.push(h.charAt((wa[i>>2]>>((i%4)*8+4))&15)+h.charAt((wa[i>>2]>>((i%4)*8))&15));
}
return s.join("");
};
d.wordToBase64=function(wa){
var p="=",tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s=[];
for(var i=0,l=wa.length*4;i<l;i+=3){
var t=(((wa[i>>2]>>8*(i%4))&255)<<16)|(((wa[i+1>>2]>>8*((i+1)%4))&255)<<8)|((wa[i+2>>2]>>8*((i+2)%4))&255);
for(var j=0;j<4;j++){
if(i*8+j*6>wa.length*32){
s.push(p);
}else{
s.push(tab.charAt((t>>6*(3-j))&63));
}
}
}
return s.join("");
};
return d;
});
},"dijit/form/_FormWidgetMixin":function(){
define("dijit/form/_FormWidgetMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-style","dojo/_base/lang","dojo/mouse","dojo/_base/sniff","dojo/_base/window","dojo/window","../a11y"],function(_65d,_65e,_65f,_660,lang,_661,has,win,_662,a11y){
return _65e("dijit.form._FormWidgetMixin",null,{name:"",alt:"",value:"",type:"text",tabIndex:"0",_setTabIndexAttr:"focusNode",disabled:false,intermediateChanges:false,scrollOnFocus:true,_setIdAttr:"focusNode",_setDisabledAttr:function(_663){
this._set("disabled",_663);
_65f.set(this.focusNode,"disabled",_663);
if(this.valueNode){
_65f.set(this.valueNode,"disabled",_663);
}
this.focusNode.setAttribute("aria-disabled",_663?"true":"false");
if(_663){
this._set("hovering",false);
this._set("active",false);
var _664="tabIndex" in this.attributeMap?this.attributeMap.tabIndex:("_setTabIndexAttr" in this)?this._setTabIndexAttr:"focusNode";
_65d.forEach(lang.isArray(_664)?_664:[_664],function(_665){
var node=this[_665];
if(has("webkit")||a11y.hasDefaultTabStop(node)){
node.setAttribute("tabIndex","-1");
}else{
node.removeAttribute("tabIndex");
}
},this);
}else{
if(this.tabIndex!=""){
this.set("tabIndex",this.tabIndex);
}
}
},_onFocus:function(by){
if(by=="mouse"&&this.isFocusable()){
var _666=this.connect(this.focusNode,"onfocus",function(){
this.disconnect(_667);
this.disconnect(_666);
});
var _667=this.connect(win.body(),"onmouseup",function(){
this.disconnect(_667);
this.disconnect(_666);
if(this.focused){
this.focus();
}
});
}
if(this.scrollOnFocus){
this.defer(function(){
_662.scrollIntoView(this.domNode);
});
}
this.inherited(arguments);
},isFocusable:function(){
return !this.disabled&&this.focusNode&&(_660.get(this.domNode,"display")!="none");
},focus:function(){
if(!this.disabled&&this.focusNode.focus){
try{
this.focusNode.focus();
}
catch(e){
}
}
},compare:function(val1,val2){
if(typeof val1=="number"&&typeof val2=="number"){
return (isNaN(val1)&&isNaN(val2))?0:val1-val2;
}else{
if(val1>val2){
return 1;
}else{
if(val1<val2){
return -1;
}else{
return 0;
}
}
}
},onChange:function(){
},_onChangeActive:false,_handleOnChange:function(_668,_669){
if(this._lastValueReported==undefined&&(_669===null||!this._onChangeActive)){
this._resetValue=this._lastValueReported=_668;
}
this._pendingOnChange=this._pendingOnChange||(typeof _668!=typeof this._lastValueReported)||(this.compare(_668,this._lastValueReported)!=0);
if((this.intermediateChanges||_669||_669===undefined)&&this._pendingOnChange){
this._lastValueReported=_668;
this._pendingOnChange=false;
if(this._onChangeActive){
if(this._onChangeHandle){
this._onChangeHandle.remove();
}
this._onChangeHandle=this.defer(function(){
this._onChangeHandle=null;
this.onChange(_668);
});
}
}
},create:function(){
this.inherited(arguments);
this._onChangeActive=true;
},destroy:function(){
if(this._onChangeHandle){
this._onChangeHandle.remove();
this.onChange(this._lastValueReported);
}
this.inherited(arguments);
}});
});
},"curam/util/ContextPanel":function(){
define("curam/util/ContextPanel",["curam/util","curam/tab","curam/debug","curam/define","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _66a=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.ContextPanel",{CONTENT_URL_ATTRIB:"data-content-url",setupLoadEventPublisher:function(_66b,_66c,_66d){
curam.util.ContextPanel._doSetup(_66b,_66c,_66d,function(_66e){
return dijit.byId(_66e);
});
},_doSetup:function(_66f,_670,_671,_672){
var _673=curam.util.getTopmostWindow().dojo.subscribe(_66f,function(){
var tab=_672(_670);
var _674=curam.util.ContextPanel._getIframe(tab);
curam.debug.log(_66a.getProperty("curam.util.ContextPanel.loaded"));
curam.util.getTopmostWindow().dojo.publish("/curam/frame/detailsPanelLoaded",[{loaded:true},_670]);
_674._finishedLoading=true;
if(_674._scheduledRefresh){
curam.util.ContextPanel.refresh(tab);
_674._scheduledRefresh=false;
}
});
curam.util.onLoad.addSubscriber(_671,curam.util.ContextPanel.addTitle);
curam.tab.unsubscribeOnTabClose(_673,_670);
curam.tab.executeOnTabClose(function(){
curam.util.onLoad.removeSubscriber(_671,curam.util.ContextPanel.addTitle);
},_670);
},refresh:function(tab){
var _675=curam.util.ContextPanel._getIframe(tab);
if(_675){
curam.debug.log(_66a.getProperty("curam.util.ContextPanel.refresh.prep"));
if(_675._finishedLoading){
curam.debug.log(_66a.getProperty("curam.util.ContextPanel.refresh"));
_675._finishedLoading=false;
var doc=_675.contentDocument||_675.contentWindow.document;
doc.location.reload(true);
}else{
curam.debug.log(_66a.getProperty("curam.util.ContextPanel.refresh.delay"));
_675._scheduledRefresh=true;
}
}
},_getIframe:function(tab){
var _676=dojo.query("iframe.detailsPanelFrame",tab.domNode);
return _676[0];
},addTitle:function(_677){
var _678=dojo.query("."+_677)[0];
var _679=_678.contentWindow.document.title;
_678.setAttribute("title",CONTEXT_PANEL_TITLE+" - "+_679);
},load:function(tab){
var _67a=curam.util.ContextPanel._getIframe(tab);
if(_67a){
var _67b=dojo.attr(_67a,curam.util.ContextPanel.CONTENT_URL_ATTRIB);
if(_67b&&_67b!="undefined"){
_67a[curam.util.ContextPanel.CONTENT_URL_ATTRIB]=undefined;
dojo.attr(_67a,"src",_67b);
}
}
}});
var _67c=curam.util.getTopmostWindow();
if(typeof _67c._curamContextPanelTabReadyListenerRegistered!="boolean"){
_67c.dojo.subscribe("/curam/application/tab/ready",null,function(_67d){
curam.util.ContextPanel.load(_67d);
});
_67c._curamContextPanelTabReadyListenerRegistered=true;
}
return curam.util.ContextPanel;
});
},"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n","curam/widget/Menu":function(){
define("curam/widget/Menu",["dijit/Menu","curam/util","curam/debug","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _67e=new curam.util.ResourceBundle("Debug");
var Menu=dojo.declare("curam.widget.Menu",dijit.Menu,{_CSS_CLASS_ACTIVE_MENU:"curam-active-menu",_EVENT_OPENED:"/curam/menu/opened",_EVENT_CLOSED:"/curam/menu/closed",_amIActive:false,postCreate:function(){
curam.debug.log(_67e.getProperty("curam.widget.Menu.created",[this.id]));
this.connect(this,"onOpen",dojo.hitch(this,function(){
curam.debug.log(_67e.getProperty("curam.widget.Menu.opened",[this.id]));
curam.util.getTopmostWindow().dojo.publish(this._EVENT_OPENED,[this.id]);
this._markAsActive(true);
}));
var _67f=curam.util.getTopmostWindow().dojo.subscribe(this._EVENT_OPENED,this,function(_680){
curam.debug.log(_67e.getProperty("curam.widget.Menu.event",[this.id,this._amIActive?"active":"passive",_680]));
if(this.id!=_680&&this._amIActive){
curam.debug.log(_67e.getProperty("curam.widget.Menu.deactivate"));
this._markAsActive(false);
var _681=curam.util.getTopmostWindow().dojo.subscribe(this._EVENT_CLOSED,this,function(_682){
if(_682==_680){
curam.debug.log(_67e.getProperty("curam.widget.Menu.reactivate",[_680,this.id]));
dojo.unsubscribe(_681);
this._markAsActive(true);
}
});
}
});
this.connect(this,"onClose",dojo.hitch(this,function(){
curam.debug.log(_67e.getProperty("curam.widget.Menu.closing",[this.id]));
curam.util.getTopmostWindow().dojo.publish(this._EVENT_CLOSED,[this.id]);
this._markAsActive(false);
dojo.unsubscribe(_67f);
}));
this.inherited(arguments);
},_markAsActive:function(_683){
if(_683){
curam.debug.log(_67e.getProperty("curam.widget.Menu.add.class"),this.id);
dojo.addClass(this.domNode,this._CSS_CLASS_ACTIVE_MENU);
}else{
curam.debug.log(_67e.getProperty("curam.widget.Menu.remove.class"),this.id);
dojo.removeClass(this.domNode,this._CSS_CLASS_ACTIVE_MENU);
}
this._amIActive=_683;
}});
return Menu;
});
},"dojox/main":function(){
define("dojox/main",["dojo/_base/kernel"],function(dojo){
return dojo.dojox;
});
},"url:dijit/layout/templates/_TabButton.html":"<div role=\"presentation\" data-dojo-attach-point=\"titleNode\" data-dojo-attach-event='onclick:onClick'>\n    <div role=\"presentation\" class='dijitTabInnerDiv' data-dojo-attach-point='innerDiv'>\n        <div role=\"presentation\" class='dijitTabContent' data-dojo-attach-point='tabContent'>\n        \t<div role=\"presentation\" data-dojo-attach-point='focusNode'>\n\t\t        <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" data-dojo-attach-point='iconNode' />\n\t\t        <span data-dojo-attach-point='containerNode' class='tabLabel'></span>\n\t\t        <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\n\t\t        \t\tdata-dojo-attach-event='onclick: onClickCloseButton' role=\"presentation\">\n\t\t            <span data-dojo-attach-point='closeText' class='dijitTabCloseText'>[x]</span\n\t\t        ></span>\n\t\t\t</div>\n        </div>\n    </div>\n</div>\n","url:dojox/layout/resources/ExpandoPane.html":"<div class=\"dojoxExpandoPane\">\n\t<div dojoAttachPoint=\"titleWrapper\" class=\"dojoxExpandoTitle\">\n\t\t<div class=\"dojoxExpandoIcon\" dojoAttachPoint=\"iconNode\" dojoAttachEvent=\"onclick:toggle\"><span class=\"a11yNode\">X</span></div>\t\t\t\n\t\t<span class=\"dojoxExpandoTitleNode\" dojoAttachPoint=\"titleNode\">${title}</span>\n\t</div>\n\t<div class=\"dojoxExpandoWrapper\" dojoAttachPoint=\"cwrapper\" dojoAttachEvent=\"ondblclick:_trap\">\n\t\t<div class=\"dojoxExpandoContent\" dojoAttachPoint=\"containerNode\"></div>\n\t</div>\n</div>\n","curam/widget/DivButton":function(){
require({cache:{"url:curam/widget/resources/DivButton.html":"<div id=\"${id}\" class=\"${className}\" dojoAttachEvent=\"onclick:onClick\" dojoAttachPoint=\"containerNode\"></div>\r\n\r\n {\r\n      templateString: \"<div id='${id}' class='${className}' \"\r\n            + \"dojoAttachEvent='onclick:onClick' dojoAttachPoint='containerNode'></div>\"\r\n    }\r\n\r\n"}});
define("curam/widget/DivButton",["curam/util","curam/matrix/Constants","dojo/text!curam/widget/resources/DivButton.html","dijit/_Widget","dijit/_Templated"],function(util,_684,_685){
var _686=dojo.declare("curam.widget.DivButtonBase",dijit._Widget,{isContainer:true,disabled:false,menuId:"",id:"",className:"",postCreate:function(args,frag){
this.sizeMyself();
dijit.byId(this.menuId).bindDomNode(this.domNode);
util.connect(this.domNode,"onclick",dojo.hitch(this,this.onClick));
if(this.className){
dojo.addClass(this.domNode,this.className);
}
if(!this.containerNode){
this.containerNode=this.domNode;
}
},setActiveMenuId:function(){
if(this.domNode.id&&this.domNode.id.length>0&&!dojo.hasClass(this.domNode,"image")){
window.activeMenuID=this.domNode.id;
}else{
window.activeMenuID=this.domNode.parentNode.id;
}
},sizeMyself:function(){
if(this.domNode.parentNode){
var _687=dojo.create("span",{},this.domNode,"before");
}
dojo.body().appendChild(this.domNode);
if(_687){
dojo.place(this.domNode,_687,"before");
dojo.destroy(_687);
}
},sizeMyselfHelper:function(){
var mb=dojo.marginBox(this.containerNode);
this.height=mb.h;
this.containerWidth=mb.w;
dojo.style(this.domNode,"width",this.containerWidth+"px");
},onClick:function(e){
if(!this.disabled){
this._toggleMenu(this.menuId,e);
}
},_checkValidation:function(menu){
if(_684.container.matrix.isValidationActive()){
if(menu.isShowingNow){
menu.close();
}
return false;
}
return true;
},_setActiveMenu:function(_688){
var menu=dijit.byId(_688);
if(!menu){
return;
}
if(menu.isShowingNow){
this.setActiveMenuId();
}
},_toggleMenu:function(_689,_68a){
this._setActiveMenu(_689);
dijit.byId(_689).setButton(this);
}});
var _68b=dojo.declare("curam.widget.DivButton",[curam.widget.DivButtonBase,dijit._Templated],{templateString:_685});
dojo.declare("curam.widget.QuestionButton",curam.widget.DivButtonBase,{postCreate:function(){
this.className+="number number-col-eval q-ct-eval-"+this.qId;
util.connect(this.domNode,"onmouseover",dojo.hitch(this,this.onMouseOver));
this.inherited(arguments);
},onMouseOver:function(_68c){
curam.matrix.util.buttonMouseOver(_68c);
},_toggleMenu:function(_68d,_68e){
this._setActiveMenu(_68d);
dijit.byId(_68d).setButton(this);
},setActiveMenuId:function(){
window.activeMenuID=this.domNode.parentNode.id;
}});
dojo.declare("curam.widget.AnswerButton",curam.widget.DivButtonBase,{className:"image",_toggleMenu:function(_68f,_690){
this._setActiveMenu(_68f);
var menu=dijit.byId(_68f);
var node=_690.target?_690.target:_690;
if(!menu){
return;
}
if(!this._checkValidation(menu)){
return;
}
menu.setButton(this);
if(node){
if((!node.id||!node.id.indexOf("ans-")==0)&&node.parentNode&&node.parentNode.id){
menu.answerId=node.parentNode.id;
}else{
menu.answerId=node.id;
}
}else{
menu.answerId=null;
}
},setActiveMenuId:function(){
window.activeMenuID=this.domNode.parentNode.id;
}});
dojo.declare("curam.widget.CombinationButton",curam.widget.DivButtonBase,{className:"image",_toggleMenu:function(_691,_692){
this._setActiveMenu(_691);
dijit.byId(_691).setButton(this);
var node=_692.target?_692.target:_692;
var menu=dijit.byId(_691);
if(!menu){
return;
}
if(!this._checkValidation(menu)){
return;
}
if(node){
if(node.cellId&&node.cellId.length>0){
menu.combinationId=node.cellId;
}else{
if(node.id&&node.id.length>0&&!dojo.hasClass(node,"image")){
menu.combinationId=node.id;
}else{
if(node.parentNode){
menu.combinationId=node.parentNode.id;
}else{
menu.combinationId=node.cellId;
}
}
}
}else{
menu.combinationId=null;
}
}});
dojo.declare("curam.widget.PriorityButton",curam.widget.DivButtonBase,{className:"column-id column-eval pri-col-eval",postCreate:function(){
dojo.attr(this.domNode,"id",this.id);
this.inherited(arguments);
},_toggleMenu:function(_693,_694){
this._setActiveMenu(_693);
dijit.byId(_693).setButton(this);
}});
dojo.declare("curam.widget.ScoreButton",curam.widget.PriorityButton,{});
return _686;
});
},"dojox/storage/_common":function(){
define("dojox/storage/_common",["dijit","dojo","dojox","dojo/require!dojox/storage/Provider,dojox/storage/manager,dojox/storage/LocalStorageProvider,dojox/storage/WhatWGStorageProvider,dojox/storage/BehaviorStorageProvider,dojox/storage/CookieStorageProvider"],function(_695,dojo,_696){
dojo.provide("dojox.storage._common");
dojo.require("dojox.storage.Provider");
dojo.require("dojox.storage.manager");
dojo.require("dojox.storage.LocalStorageProvider");
dojo.require("dojox.storage.WhatWGStorageProvider");
dojo.require("dojox.storage.BehaviorStorageProvider");
dojo.require("dojox.storage.CookieStorageProvider");
_696.storage.manager.initialize();
});
},"url:dijit/templates/TreeNode.html":"<div class=\"dijitTreeNode\" role=\"presentation\"\n\t><div data-dojo-attach-point=\"rowNode\" class=\"dijitTreeRow\" role=\"presentation\" data-dojo-attach-event=\"onmouseenter:_onMouseEnter, onmouseleave:_onMouseLeave, onclick:_onClick, ondblclick:_onDblClick\"\n\t\t><img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"expandoNode\" class=\"dijitTreeExpando\" role=\"presentation\"\n\t\t/><span data-dojo-attach-point=\"expandoNodeText\" class=\"dijitExpandoText\" role=\"presentation\"\n\t\t></span\n\t\t><span data-dojo-attach-point=\"contentNode\"\n\t\t\tclass=\"dijitTreeContent\" role=\"presentation\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"iconNode\" class=\"dijitIcon dijitTreeIcon\" role=\"presentation\"\n\t\t\t/><span data-dojo-attach-point=\"labelNode\" class=\"dijitTreeLabel\" role=\"treeitem\" tabindex=\"-1\" aria-selected=\"false\" data-dojo-attach-event=\"onfocus:_onLabelFocus\"></span>\n\t\t</span\n\t></div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitTreeContainer\" role=\"presentation\" style=\"display: none;\"></div>\n</div>\n","url:dijit/form/templates/TextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","curam/util/ListSort":function(){
define("curam/util/ListSort",["curam/util","curam/debug","curam/define"],function(){
curam.define.singleton("curam.util.ListSort",{makeSortable:function(_697,_698,_699,_69a){
dojo.addOnLoad(function(){
_697=dojo.byId(_697);
if(_697.tHead==null){
return;
}else{
if(_697.tHead.rows&&_697.tHead.rows.length>0){
var _69b=_697.tHead.rows[0];
if(!_69b){
return;
}
}
}
var trim=dojo.trim;
for(var i=0;i<_69b.cells.length;i++){
var cell=_69b.cells[i];
if(cell.id&&cell.childNodes[0]){
var _69c=cell.childNodes[0];
if(_69c.childNodes[0]&&_69c.childNodes[0].nodeType==3){
var txt=trim(_69c.childNodes[0].nodeValue);
if((txt.length>0)&&(txt!=" ")){
var _69d=dojo.create("a",{href:"#"});
_69d["table"]=_697;
_69d["paginationId"]=_698;
_69d.appendChild(document.createTextNode(txt));
curam.util.connect(_69d,"onclick",curam.util.ListSort.sortTable);
var _69e=dojo.create("span",{className:"hidden"},_69d,"right");
_69e.appendChild(document.createTextNode(_69a));
dojo.empty(_69c);
_69c.appendChild(_69d);
}
}
}
}
var _69f=dojo.query(".hidden-table-header a");
for(var i=0;i<_69f.length;i++){
var _6a0=_69f[i];
_6a0.setAttribute("tabindex","-1");
_69f.length-1;
}
_697._sortUp=true;
_697._isExpandableList=_699;
});
},sortTable:function(_6a1){
var link;
if(typeof (_6a1.nodeType)!="undefined"){
link=_6a1;
}else{
link=_6a1.target;
dojo.stopEvent(_6a1);
}
window.dojo.publish("/curam/list/toBeSorted",[link["paginationId"]]);
var th=link.parentNode.parentNode;
var _6a2=th.cellIndex;
if(dojo.isIE&&curam.content&&curam.content.LIST_MENUS_ENABLED){
_6a2=0;
var _6a3=th.previousSibling;
while(_6a3){
if(_6a3.tagName=="TH"){
_6a2++;
}
_6a3=_6a3.previousSibling;
}
}
var _6a4=link["table"];
var _6a5=_6a4._isExpandableList;
var _6a6=(_6a5?2:1);
var _6a7=_6a4.tBodies[0];
if(_6a7.rows.length<=_6a6){
return;
}
var _6a8=function(a,b){
aa=curam.util.ListSort.getSpanDataSort(a.cells[_6a2]);
if(isNaN(aa)){
aa=0;
}
bb=curam.util.ListSort.getSpanDataSort(b.cells[_6a2]);
if(isNaN(bb)){
bb=0;
}
return aa-bb;
};
var _6a9=[];
var _6aa=_6a7.rows.length-_6a6;
for(var j=0;j<_6a7.rows.length/_6a6;j++){
var _6ab=j*_6a6;
_6a9[j]=_6a7.rows[_6ab];
if(_6a5){
_6a9[j]._detailRow=_6a7.rows[_6ab+1];
}
if(dojo.style(_6a7.rows[_6ab],"display")!="none"&&dojo.style(_6a7.rows[_6ab],"visible")!="false"){
_6aa=_6ab;
}
}
_6a9.sort(_6a8);
if(!_6a4._sortUp){
_6a9.reverse();
}
_6a4._sortUp=!_6a4._sortUp;
var _6ac=_6a7.firstChild;
for(var i=0;i<_6a9.length;i++){
var _6ad=_6a9[i];
if(_6a5){
var _6ae=_6ad._detailRow;
_6a7.appendChild(_6ad);
var next=cm.nextSibling(_6ad,"tr");
if(next){
_6a7.insertBefore(_6ae,next);
}else{
_6a7.appendChild(_6ae);
}
_6ac=cm.nextSibling(_6ae,"tr");
}else{
_6a7.appendChild(_6ad);
}
}
curam.util.stripeTable(_6a4,_6a5,_6aa);
window.dojo.publish("/curam/list/sorted",[link["paginationId"]]);
},sortScrollableList:function(_6af,_6b0){
dojo.stopEvent(_6af);
var idx=_6b0.indexOf("_slh");
var _6b1=_6b0.substring(0,idx);
var _6b2=dojo.byId(_6b1);
if(typeof (_6b2)=="undefined"){
return;
}
var _6b3=dojo.query("a",_6b2)[0];
curam.util.ListSort.sortTable(_6b3);
},getSpanDataSort:function(el){
var _6b4=el.getElementsByTagName("span");
curam.debug.log(el.getElementsByTagName("span"));
for(var i=0;i<_6b4.length;i++){
if(dojo.attr(_6b4[i],"data-curam-sort-order")!==""){
spanElement=_6b4[i];
}
}
curam.debug.log("getSpanDataSort ==="+dojo.attr(spanElement,"data-curam-sort-order"));
return spanElement?parseInt(dojo.attr(spanElement,"data-curam-sort-order"))||0:0;
}});
return curam.util.ListSort;
});
},"curam/matrix/Constants":function(){
define("curam/matrix/Constants",["curam/define"],function(){
curam.define.singleton("curam.matrix.Constants",{ANSWER_TYPE_CODETABLE:"codetable",ANSWER_TYPE_NUMERIC:"numeric",ANSWER_TYPE_BOOLEAN:"boolean",ANSWER_TYPE_STRING:"string",SPECIFIC_VALUE:"specificvalue",MIN_MAX:"minmax",MATRIX_BORDER_SIZE:1,COMBINATION_CELL_WIDTH:22,columnLetters:new Array("C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"),container:null});
return curam.matrix.Constants;
});
},"dojo/fx":function(){
define("dojo/fx",["./_base/lang","./Evented","./_base/kernel","./_base/array","./_base/connect","./_base/fx","./dom","./dom-style","./dom-geometry","./ready","require"],function(lang,_6b5,dojo,_6b6,_6b7,_6b8,dom,_6b9,geom,_6ba,_6bb){
if(!dojo.isAsync){
_6ba(0,function(){
var _6bc=["./fx/Toggler"];
_6bb(_6bc);
});
}
var _6bd=dojo.fx={};
var _6be={_fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,args||[]);
}
return this;
}};
var _6bf=function(_6c0){
this._index=-1;
this._animations=_6c0||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
_6b6.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
_6bf.prototype=new _6b5();
lang.extend(_6bf,{_onAnimate:function(){
this._fire("onAnimate",arguments);
},_onEnd:function(){
_6b7.disconnect(this._onAnimateCtx);
_6b7.disconnect(this._onEndCtx);
this._onAnimateCtx=this._onEndCtx=null;
if(this._index+1==this._animations.length){
this._fire("onEnd");
}else{
this._current=this._animations[++this._index];
this._onAnimateCtx=_6b7.connect(this._current,"onAnimate",this,"_onAnimate");
this._onEndCtx=_6b7.connect(this._current,"onEnd",this,"_onEnd");
this._current.play(0,true);
}
},play:function(_6c1,_6c2){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_6c2&&this._current.status()=="playing"){
return this;
}
var _6c3=_6b7.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_6c4=_6b7.connect(this._current,"onBegin",this,function(arg){
this._fire("onBegin",arguments);
}),_6c5=_6b7.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
_6b7.disconnect(_6c3);
_6b7.disconnect(_6c4);
_6b7.disconnect(_6c5);
});
if(this._onAnimateCtx){
_6b7.disconnect(this._onAnimateCtx);
}
this._onAnimateCtx=_6b7.connect(this._current,"onAnimate",this,"_onAnimate");
if(this._onEndCtx){
_6b7.disconnect(this._onEndCtx);
}
this._onEndCtx=_6b7.connect(this._current,"onEnd",this,"_onEnd");
this._current.play.apply(this._current,arguments);
return this;
},pause:function(){
if(this._current){
var e=_6b7.connect(this._current,"onPause",this,function(arg){
this._fire("onPause",arguments);
_6b7.disconnect(e);
});
this._current.pause();
}
return this;
},gotoPercent:function(_6c6,_6c7){
this.pause();
var _6c8=this.duration*_6c6;
this._current=null;
_6b6.some(this._animations,function(a){
if(a.duration<=_6c8){
this._current=a;
return true;
}
_6c8-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_6c8/this._current.duration,_6c7);
}
return this;
},stop:function(_6c9){
if(this._current){
if(_6c9){
for(;this._index+1<this._animations.length;++this._index){
this._animations[this._index].stop(true);
}
this._current=this._animations[this._index];
}
var e=_6b7.connect(this._current,"onStop",this,function(arg){
this._fire("onStop",arguments);
_6b7.disconnect(e);
});
this._current.stop();
}
return this;
},status:function(){
return this._current?this._current.status():"stopped";
},destroy:function(){
if(this._onAnimateCtx){
_6b7.disconnect(this._onAnimateCtx);
}
if(this._onEndCtx){
_6b7.disconnect(this._onEndCtx);
}
}});
lang.extend(_6bf,_6be);
_6bd.chain=function(_6ca){
return new _6bf(_6ca);
};
var _6cb=function(_6cc){
this._animations=_6cc||[];
this._connects=[];
this._finished=0;
this.duration=0;
_6b6.forEach(_6cc,function(a){
var _6cd=a.duration;
if(a.delay){
_6cd+=a.delay;
}
if(this.duration<_6cd){
this.duration=_6cd;
}
this._connects.push(_6b7.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new _6b8.Animation({curve:[0,1],duration:this.duration});
var self=this;
_6b6.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop","onEnd"],function(evt){
self._connects.push(_6b7.connect(self._pseudoAnimation,evt,function(){
self._fire(evt,arguments);
}));
});
};
lang.extend(_6cb,{_doAction:function(_6ce,args){
_6b6.forEach(this._animations,function(a){
a[_6ce].apply(a,args);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_6cf,args){
var t=this._pseudoAnimation;
t[_6cf].apply(t,args);
},play:function(_6d0,_6d1){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_6d2,_6d3){
var ms=this.duration*_6d2;
_6b6.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_6d3);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_6d4){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
_6b6.forEach(this._connects,_6b7.disconnect);
}});
lang.extend(_6cb,_6be);
_6bd.combine=function(_6d5){
return new _6cb(_6d5);
};
_6bd.wipeIn=function(args){
var node=args.node=dom.byId(args.node),s=node.style,o;
var anim=_6b8.animateProperty(lang.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _6d6=_6b9.get(node,"height");
return Math.max(_6d6,1);
}
},end:function(){
return node.scrollHeight;
}}}},args));
var fini=function(){
s.height="auto";
s.overflow=o;
};
_6b7.connect(anim,"onStop",fini);
_6b7.connect(anim,"onEnd",fini);
return anim;
};
_6bd.wipeOut=function(args){
var node=args.node=dom.byId(args.node),s=node.style,o;
var anim=_6b8.animateProperty(lang.mixin({properties:{height:{end:1}}},args));
_6b7.connect(anim,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
var fini=function(){
s.overflow=o;
s.height="auto";
s.display="none";
};
_6b7.connect(anim,"onStop",fini);
_6b7.connect(anim,"onEnd",fini);
return anim;
};
_6bd.slideTo=function(args){
var node=args.node=dom.byId(args.node),top=null,left=null;
var init=(function(n){
return function(){
var cs=_6b9.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
left=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=geom.position(n,true);
top=ret.y;
left=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=left+"px";
}
};
})(node);
init();
var anim=_6b8.animateProperty(lang.mixin({properties:{top:args.top||0,left:args.left||0}},args));
_6b7.connect(anim,"beforeBegin",anim,init);
return anim;
};
return _6bd;
});
},"curam/inPageNavigation":function(){
define("curam/inPageNavigation",["curam/tab","curam/ui/PageRequest","curam/debug","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _6d7=new curam.util.ResourceBundle("Debug");
var _6d8=dojo.declare("curam.inPageNavigation",null,{title:"",href:"",selected:false,constructor:function(args){
this.title=args.title;
this.href=args.href;
this.selected=args.selected;
curam.debug.log("curam.inPageNavigation "+_6d7.getProperty("curam.inPageNavigation.msg")+this);
},getLinks:function(){
var _6d9=dojo.query(".in-page-navigation-tabs")[0];
var _6da=dojo.query("li",_6d9);
var _6db=new Array();
dojo.forEach(_6da,function(link){
var _6dc=dojo.query("a",link)[0];
if(!_6dc){
return;
}
var _6dd=_6dc.innerText||_6dc.textContent;
var _6de=false;
dojo.filter(dojo.attr(_6dc,"class").split(" "),function(_6df){
if(_6df=="in-page-current-link"){
_6de=true;
return;
}
});
var href=dojo.attr(_6dc,"href");
var _6e0=new curam.inPageNavigation({"title":_6dd,"selected":_6de,"href":href});
_6db.push(_6e0);
});
return _6db;
},processMainContentAreaLinks:function(){
dojo.addOnLoad(function(){
var _6e1=dojo.query(".ipn-page")[0];
if(_6e1){
var _6e2=dijit.byId(dojo.attr(_6e1,"id"));
var _6e3=_6e2.getChildren()[0];
_6e2.removeChild(_6e3);
if(_6e2.getChildren().length==0){
return;
}
var _6e4=dojo.query(".in-page-nav-contentWrapper")[0];
var _6e5=dojo.query("> *",_6e4);
var _6e6=_6e5[_6e5.length-1];
var pos=dojo.position(_6e6);
var _6e7=pos.y;
var _6e8="height: "+_6e7+"px;";
dojo.attr(_6e4,"style",_6e8);
dojo.connect(_6e2,"_transition",function(_6e9,_6ea){
var link=dojo.query(".in-page-link",_6e9.id)[0];
var _6eb=new curam.ui.PageRequest(link.href);
if(jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")){
_6eb.pageHolder=window;
}
curam.tab.getTabController().handlePageRequest(_6eb);
});
dojo.style(_6e1,"visibility","visible");
}
});
}});
return _6d8;
});
},"curam/util/LocalConfig":function(){
define("curam/util/LocalConfig",[],function(){
var _6ec=function(name){
return "curam_util_LocalConfig_"+name;
},_6ed=function(name,_6ee){
var _6ef=_6ec(name);
if(typeof top[_6ef]==="undefined"){
top[_6ef]=_6ee;
}
return top[_6ef];
},_6f0=function(name){
return top[_6ec(name)];
};
_6ed("seedValues",{}),_6ed("overrides",{});
var _6f1=function(_6f2,_6f3){
if(typeof _6f2!=="undefined"&&typeof _6f2!=="string"){
throw new Error("Invalid "+_6f3+" type: "+typeof _6f2+"; expected string");
}
};
var _6f4={seedOption:function(name,_6f5,_6f6){
_6f1(_6f5,"value");
_6f1(_6f6,"defaultValue");
_6f0("seedValues")[name]=(typeof _6f5!=="undefined")?_6f5:_6f6;
},overrideOption:function(name,_6f7){
_6f1(_6f7,"value");
if(typeof (Storage)!=="undefined"){
localStorage[name]=_6f7;
}else{
_6f0("overrides")[name]=_6f7;
}
},readOption:function(name,_6f8){
_6f1(_6f8,"defaultValue");
var _6f9=null;
if(typeof (Storage)!=="undefined"&&typeof localStorage[name]!=="undefined"){
_6f9=localStorage[name];
}else{
if(typeof _6f0("overrides")[name]!=="undefined"){
_6f9=_6f0("overrides")[name];
}else{
if(typeof _6f0("seedValues")[name]!=="undefined"){
_6f9=_6f0("seedValues")[name];
}else{
_6f9=_6f8;
}
}
}
return _6f9;
},clearOption:function(name){
if(typeof (Storage)!=="undefined"){
localStorage.removeItem(name);
}
delete _6f0("overrides")[name];
delete _6f0("seedValues")[name];
}};
return _6f4;
});
},"dojo/data/util/sorter":function(){
define("dojo/data/util/sorter",["dojo/_base/lang"],function(lang){
var _6fa=lang.getObject("dojo.data.util.sorter",true);
_6fa.basicComparator=function(a,b){
var r=-1;
if(a===null){
a=undefined;
}
if(b===null){
b=undefined;
}
if(a==b){
r=0;
}else{
if(a>b||a==null){
r=1;
}
}
return r;
};
_6fa.createSortFunction=function(_6fb,_6fc){
var _6fd=[];
function _6fe(attr,dir,comp,s){
return function(_6ff,_700){
var a=s.getValue(_6ff,attr);
var b=s.getValue(_700,attr);
return dir*comp(a,b);
};
};
var _701;
var map=_6fc.comparatorMap;
var bc=_6fa.basicComparator;
for(var i=0;i<_6fb.length;i++){
_701=_6fb[i];
var attr=_701.attribute;
if(attr){
var dir=(_701.descending)?-1:1;
var comp=bc;
if(map){
if(typeof attr!=="string"&&("toString" in attr)){
attr=attr.toString();
}
comp=map[attr]||bc;
}
_6fd.push(_6fe(attr,dir,comp,_6fc));
}
}
return function(rowA,rowB){
var i=0;
while(i<_6fd.length){
var ret=_6fd[i++](rowA,rowB);
if(ret!==0){
return ret;
}
}
return 0;
};
};
return _6fa;
});
},"curam/ui/PageRequest":function(){
define("curam/ui/PageRequest",["curam/debug","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _702=new curam.util.ResourceBundle("Debug");
var _703=dojo.declare("curam.ui.PageRequest",null,{forceLoad:false,justRefresh:false,constructor:function(_704,_705,_706){
this.parameters={};
this.cdejParameters={};
this.cdejParameters["o3ctx"]="4096";
if(_705){
this.isHomePage=true;
}else{
this.isHomePage=false;
}
if(_706){
this.openInCurrentTab=true;
}else{
this.openInCurrentTab=false;
}
this.pageHolder=null;
var url;
if(dojo.isString(_704)){
url=_704;
curam.debug.log("PAGE REQUEST: "+_702.getProperty("curam.ui.PageRequest.url")+" "+url);
}else{
curam.debug.log("PAGE REQUEST: "+_702.getProperty("curam.ui.PageRequest.descriptor")+" "+_704.toJson());
var tc=_704.tabContent;
url=tc.pageID+"Page.do";
var _707=true;
for(param in tc.parameters){
if(_707){
url+="?";
_707=false;
}else{
url+="&";
}
url+=param+"="+encodeURIComponent(tc.parameters[param]);
}
curam.debug.log("PAGE REQUEST: "+_702.getProperty("curam.ui.PageRequest.derived")+" "+url);
}
var _708=url.split("?");
this.parseUIMPageID(_708[0]);
if(_708.length==2){
this.parseParameters(_708[1]);
}
},parseUIMPageID:function(url){
var _709=url.split("/");
var _70a=_709[_709.length-1];
this.pageID=_70a.replace("Page.do","");
},parseParameterName:function(name){
if(name.charAt(0)=="a"&&name.charAt(1)=="m"&&name.charAt(2)=="p"&&name.charAt(3)==";"){
return name.substring(4,name.length);
}else{
return name;
}
},parseParameters:function(_70b){
var _70c=_70b.split("&");
for(var i=0;i<_70c.length;i++){
var _70d=_70c[i].split("=");
var _70e=this.parseParameterName(_70d[0]);
if(_70e.length>0){
if(!this.isCDEJParam(_70e)){
this.parameters[_70e]=decodeURIComponent(_70d[1].replace(/\+/g," "));
}else{
if(_70e!="o3nocache"){
this.cdejParameters[_70e]=decodeURIComponent(_70d[1].replace(/\+/g," "));
}
}
}
}
},isCDEJParam:function(_70f){
return (_70f.charAt(0)=="o"&&_70f.charAt(1)=="3")||(_70f.charAt(0)=="_"&&_70f.charAt(1)=="_"&&_70f.charAt(2)=="o"&&_70f.charAt(3)=="3");
},getQueryString:function(_710){
var _711="";
var _712;
for(_712 in this.parameters){
_711+=_712+"="+encodeURIComponent(this.parameters[_712])+"&";
}
if(!_710==true||_710==false){
for(_712 in this.cdejParameters){
_711+=_712+"="+encodeURIComponent(this.cdejParameters[_712])+"&";
}
}
_711=_711.substring(0,_711.length-1);
this.queryString=_711;
return this.queryString;
},getURL:function(_713){
var _714=this.pageID+"Page.do";
var qs=this.getQueryString(_713);
if(qs!=""){
_714+="?"+qs;
}
this.url=_714;
return this.url;
}});
return _703;
});
},"dojo/window":function(){
define("dojo/window",["./_base/lang","./_base/sniff","./_base/window","./dom","./dom-geometry","./dom-style"],function(lang,has,_715,dom,geom,_716){
var _717=lang.getObject("dojo.window",true);
_717.getBox=function(){
var _718=(_715.doc.compatMode=="BackCompat")?_715.body():_715.doc.documentElement,_719=geom.docScroll(),w,h;
if(has("touch")){
var _71a=_715.doc.parentWindow||_715.doc.defaultView;
w=_71a.innerWidth||_718.clientWidth;
h=_71a.innerHeight||_718.clientHeight;
}else{
w=_718.clientWidth;
h=_718.clientHeight;
}
return {l:_719.x,t:_719.y,w:w,h:h};
};
_717.get=function(doc){
if(has("ie")&&_717!==document.parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc.parentWindow||doc.defaultView;
};
_717.scrollIntoView=function(node,pos){
try{
node=dom.byId(node);
var doc=node.ownerDocument||_715.doc,body=doc.body||_715.body(),html=doc.documentElement||body.parentNode,isIE=has("ie"),isWK=has("webkit");
if((!(has("mozilla")||isIE||isWK||has("opera"))||node==body||node==html)&&(typeof node.scrollIntoView!="undefined")){
node.scrollIntoView(false);
return;
}
var _71b=doc.compatMode=="BackCompat",_71c=(isIE>=9&&node.ownerDocument.parentWindow.frameElement)?((html.clientHeight>0&&html.clientWidth>0&&(body.clientHeight==0||body.clientWidth==0||body.clientHeight>html.clientHeight||body.clientWidth>html.clientWidth))?html:body):(_71b?body:html),_71d=isWK?body:_71c,_71e=_71c.clientWidth,_71f=_71c.clientHeight,rtl=!geom.isBodyLtr(),_720=pos||geom.position(node),el=node.parentNode,_721=function(el){
return ((isIE<=6||(isIE&&_71b))?false:(_716.get(el,"position").toLowerCase()=="fixed"));
};
if(_721(node)){
return;
}
while(el){
if(el==body){
el=_71d;
}
var _722=geom.position(el),_723=_721(el);
if(el==_71d){
_722.w=_71e;
_722.h=_71f;
if(_71d==html&&isIE&&rtl){
_722.x+=_71d.offsetWidth-_722.w;
}
if(_722.x<0||!isIE){
_722.x=0;
}
if(_722.y<0||!isIE){
_722.y=0;
}
}else{
var pb=geom.getPadBorderExtents(el);
_722.w-=pb.w;
_722.h-=pb.h;
_722.x+=pb.l;
_722.y+=pb.t;
var _724=el.clientWidth,_725=_722.w-_724;
if(_724>0&&_725>0){
_722.w=_724;
_722.x+=(rtl&&(isIE||el.clientLeft>pb.l))?_725:0;
}
_724=el.clientHeight;
_725=_722.h-_724;
if(_724>0&&_725>0){
_722.h=_724;
}
}
if(_723){
if(_722.y<0){
_722.h+=_722.y;
_722.y=0;
}
if(_722.x<0){
_722.w+=_722.x;
_722.x=0;
}
if(_722.y+_722.h>_71f){
_722.h=_71f-_722.y;
}
if(_722.x+_722.w>_71e){
_722.w=_71e-_722.x;
}
}
var l=_720.x-_722.x,t=_720.y-Math.max(_722.y,0),r=l+_720.w-_722.w,bot=t+_720.h-_722.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
if(rtl&&((isIE==8&&!_71b)||isIE>=9)){
s=-s;
}
_720.x+=el.scrollLeft;
el.scrollLeft+=s;
_720.x-=el.scrollLeft;
}
if(bot*t>0){
_720.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_720.y-=el.scrollTop;
}
el=(el!=_71d)&&!_723&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
};
require(["dojo/_base/sniff","dojo/on"],function(has,on){
if(has("ie")==8){
var _726=screen.deviceXDPI;
setInterval(function(){
if(screen.deviceXDPI!=_726){
_726=screen.deviceXDPI;
on.emit(_715.global,"resize");
}
},250);
}
});
return _717;
});
},"dojo/DeferredList":function(){
define("dojo/DeferredList",["./_base/kernel","./_base/Deferred","./_base/array"],function(dojo,_727,_728){
dojo.DeferredList=function(list,_729,_72a,_72b,_72c){
var _72d=[];
_727.call(this);
var self=this;
if(list.length===0&&!_729){
this.resolve([0,[]]);
}
var _72e=0;
_728.forEach(list,function(item,i){
item.then(function(_72f){
if(_729){
self.resolve([i,_72f]);
}else{
_730(true,_72f);
}
},function(_731){
if(_72a){
self.reject(_731);
}else{
_730(false,_731);
}
if(_72b){
return null;
}
throw _731;
});
function _730(_732,_733){
_72d[i]=[_732,_733];
_72e++;
if(_72e===list.length){
self.resolve(_72d);
}
};
});
};
dojo.DeferredList.prototype=new _727();
dojo.DeferredList.prototype.gatherResults=function(_734){
var d=new dojo.DeferredList(_734,false,true,false);
d.addCallback(function(_735){
var ret=[];
_728.forEach(_735,function(_736){
ret.push(_736[1]);
});
return ret;
});
return d;
};
return dojo.DeferredList;
});
},"curam/widgets":function(){
define("curam/widgets",[],function(){
var _737=function(_738){
this.accordion=new _739(_738,this);
this.accordion.switchboard=this;
};
var _73a={updateButtons:function(){
var _73b=this.accordion;
this.collapser.disabled=_73b.staysStill(false);
this.expander.disabled=_73b.staysStill(true);
},switchMode:function(){
if(this.checked){
this.switchboard.accordion.accordMode=false;
this.switchboard.expander.onclick=this.switchboard.accordion.expandRest;
this.switchboard.collapser.style.display="";
this.switchboard.updateButtons();
}else{
this.switchboard.accordion.accordMode=true;
this.switchboard.collapser.style.display="none";
this.switchboard.accordion.collapseAll();
this.switchboard.expander.value="Expand All";
this.switchboard.expander.onclick=this.switchboard.accordion.expandAll;
this.switchboard.expander.disabled=false;
}
}};
dojo.mixin(_737.prototype,_73a);
var _739=function(_73c,_73d){
var _73e;
this.panelHeight="250px";
this.accordMode=true;
this.switchboard=_73d;
this.topElement=dojo.byId(_73c);
this.tabs=[];
var _73f=dojo.query("div",this.topElement);
for(var i=0;i<_73f.length;i++){
if(_73f[i].className=="accordionTab"){
while(_73f[++i].className!="tabHeader"){
}
_73e=_73f[i];
while(_73f[++i].className!="tabContent"){
}
this.tabs[this.tabs.length]=new _740(this,_73e,_73f[i]);
}
}
this.lastTab=this.tabs[0];
for(var i=1;i<this.tabs.length;i++){
this.tabs[i].collapse(false);
}
};
var _741={expandAll:function(){
var _742=this.switchboard.accordion;
for(var i=0;i<_742.tabs.length;i++){
_742.tabs[i].stateExpanded();
}
this.src="../themes/classic/images/evidence-review/CollapseAllButton.png";
this.onclick=_742.collapseAll;
},collapseAll:function(){
var _743=this.switchboard.accordion;
for(var i=0;i<_743.tabs.length;i++){
_743.tabs[i].collapse(false);
}
_743.lastTab.expand(false);
this.src="../themes/classic/images/evidence-review/ExpandAllButton.png";
this.onclick=_743.expandAll;
},expandRest:function(){
if(!this.switchboard.accordion.staysStill(true)){
this.switchboard.accordion.expandAll();
}
this.switchboard.updateButtons();
},collapseRest:function(){
if(!this.switchboard.accordion.staysStill(false)){
this.switchboard.accordion.collapseAll();
}
this.switchboard.updateButtons();
},staysStill:function(_744){
var _745=0;
var _746=this.tabs.length;
for(var i=0;i<_746;i++){
if(this.tabs[i].expanded==true){
_745++;
}
}
return (_744==true)?(_746-_745==0):(_745==1);
}};
dojo.mixin(_739.prototype,_741);
var _740=function(_747,_748,_749){
this.accordion=_747;
this.switchboard=_747.switchboard;
this.header=_748;
this.header.tab=this;
this.content=_749;
dojo.style(this.content,{height:_747.panelHeight,overflow:"auto"});
this.content.tab=this;
this.expanded=true;
dojo.connect(this.header,"onclick",this.toggleState);
dojo.connect(this.header,"onmouseover",this.hoverStyle);
dojo.connect(this.header,"onmouseout",this.stillStyle);
};
var _74a={hoverStyle:function(e){
if(!this.tab.expanded){
this.className+=" tabHeaderHover";
}
},stillStyle:function(e){
this.className="tabHeader";
},collapse:function(_74b){
if(this.accordion.lastTab==this){
return;
}
if(this.accordion.staysStill(false)){
return;
}
if(_74b&&this.accordion.accordMode==false){
new _74c(this.content,"down");
}else{
dojo.style(this.content,{height:"1px",display:"none"});
}
this.expanded=false;
this.content.style.overflow="hidden";
if(this.accordion.accordMode==false){
this.switchboard.updateButtons();
}
},expand:function(_74d){
if(this.accordion.lastTab==this){
return;
}
if(this.accordion.staysStill(true)){
return;
}
var _74e=this.accordion.lastTab;
this.stateExpanded(_74d);
this.accordion.lastTab=this;
if(this.accordion.accordMode==true){
_74e.collapse(true);
}else{
this.switchboard.updateButtons();
}
},stateExpanded:function(_74f){
if(_74f){
this.content.style.display="";
if(this.accordion.accordMode==true){
new _750(this.content,this.accordion.lastTab.content);
}else{
new _74c(this.content,"up");
}
}else{
dojo.style(this.content,{height:this.accordion.panelHeight,display:"",overflow:"auto"});
this.expanded=true;
}
},toggleState:function(){
if(this.tab.expanded==true){
this.tab.collapse(true);
}else{
this.tab.expand(true);
}
}};
dojo.mixin(_740.prototype,_74a);
var _74c=function(_751,_752){
this.contentRef=_751;
this.direction=_752;
this.duration=100;
this.steps=6;
this.step();
};
var _753={step:function(){
var _754;
if(this.steps<=0){
if(this.direction=="down"){
dojo.style(this.contentRef,{height:"1px",display:"none"});
this.contentRef.tab.expanded=false;
}else{
this.contentRef.style.height=this.contentRef.tab.accordion.panelHeight;
this.contentRef.tab.expanded=true;
}
this.contentRef.tab.switchboard.updateButtons();
return;
}
if(this.timer){
clearTimeout(this.timer);
}
var _755=Math.round(this.duration/this.steps);
if(this.direction=="down"){
_754=this.steps>0?(parseInt(this.contentRef.offsetHeight)-1)/this.steps:0;
}else{
_754=this.steps>0?(parseInt(this.contentRef.tab.accordion.panelHeight)-parseInt(this.contentRef.offsetHeight))/this.steps:0;
}
this.resizeBy(_754);
this.duration-=_755;
this.steps--;
this.timer=setTimeout(dojo.hitch(this,this.step),_755);
},resizeBy:function(_756){
var _757=this.contentRef.offsetHeight;
var _758=parseInt(_756);
if(_756!=0){
if(this.direction=="down"){
this.contentRef.style.height=(_757-_758)+"px";
}else{
this.contentRef.style.height=(_757+_758)+"px";
}
}
}};
dojo.mixin(_74c.prototype,_753);
var _750=function(_759,_75a){
this.collapsingContent=_75a;
this.collapsingContent.style.overflow="hidden";
this.expandingContent=_759;
this.limit=250;
this.duration=100;
this.steps=10;
this.expandingContent.style.display="";
this.step();
};
var _75b={step:function(){
if(this.steps<=0){
dojo.style(this.collapsingContent,{height:"1px",display:"none"});
dojo.style(this.collapsingContent,{height:this.limit,overflow:"auto"});
this.collapsingContent.tab.expanded=false;
this.expandingContent.tab.expanded=true;
return;
}
if(this.timer){
clearTimeout(this.timer);
}
var _75c=Math.round(this.duration/this.steps);
var _75d=this.steps>0?(parseInt(this.collapsingContent.style.height)-1)/this.steps:0;
this.resizeBoth(_75d);
this.duration-=_75c;
this.steps--;
this.timer=setTimeout(dojo.hitch(this,this.step),_75c);
},resizeBoth:function(_75e){
var h1=parseInt(this.collapsingContent.style.height);
var h2=parseInt(this.expandingContent.style.height);
var _75f=parseInt(_75e);
if(_75e!=0){
if(h2+_75f<this.limit){
this.collapsingContent.style.height=(h1-_75f)+"px";
this.expandingContent.style.height=(h2+_75f)+"px";
}
}
}};
dojo.mixin(_750.prototype,_75b);
var _760={version:"1",AccordionControl:_737,AccordionWidget:_739,AccordionTab:_740,SingleSlowMotion:_74c,SynchroSlowMotion:_750,registerAccordion:function(id){
_737.constructor(id);
}};
var _761=function(_762){
this.steps=_762;
this.regions=new Array();
this.RGB=new Array(256);
var k=0;
var hex=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
for(var i=0;i<16;i++){
for(j=0;j<16;j++){
this.RGB[k]=hex[i]+hex[j];
k++;
}
}
};
var _763={addRegion:function(_764){
this.regions[this.regions.length]=_764;
},drawMap:function(){
var _765;
if(this.steps%2==0){
_765=this.steps/2;
}else{
_765=(this.steps-1)/2;
}
var step=parseInt(255/_765);
var red,_766,blue;
for(var i=0;i<this.steps;++i){
var _767;
if(i==0){
_767="#ff0000";
}else{
if(i==(this.steps-1)){
_767="#0000ff";
}else{
if(i==_765){
_767="#ffffff";
}else{
if(i>_765){
var _766=255;
var red=255;
_766-=(i-_765)*step;
red-=(i-_765)*step;
_767=this.rgbToHex(red,_766,255);
}else{
if(i<_765){
_766=0;
blue=0;
_766+=step*i;
blue+=step*i;
_767=this.rgbToHex(255,_766,blue);
}
}
}
}
}
var _768=dojo.byId("heatmapTable");
if(_768){
var _769=_768.getElementsByTagName("td");
for(var j=0;j<_769.length;j++){
if(_769[j].className.indexOf("region"+this.regions[i])>-1){
_769[j].style.background=_767;
if(i>_765){
dojo.style(dojo.query("a",_769[j])[0],"color","white");
}
}
}
}
dojo.style(dojo.byId("legendImage"+this.regions[i]),{color:_767,background:_767});
}
},rgbToHex:function(r,g,b){
var rr=this.RGB[r];
var gg=this.RGB[g];
var bb=this.RGB[b];
return "#"+rr+gg+bb;
}};
dojo.mixin(_761.prototype,_763);
dojo.global.getDataIn=function(_76a){
return eval(_76a);
};
dojo.global.Widgets=_760;
dojo.global.HeatMap=_761;
return _760;
});
},"dijit/registry":function(){
define("dijit/registry",["dojo/_base/array","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window","."],function(_76b,has,_76c,win,_76d){
var _76e={},hash={};
var _76f={length:0,add:function(_770){
if(hash[_770.id]){
throw new Error("Tried to register widget with id=="+_770.id+" but that id is already registered");
}
hash[_770.id]=_770;
this.length++;
},remove:function(id){
if(hash[id]){
delete hash[id];
this.length--;
}
},byId:function(id){
return typeof id=="string"?hash[id]:id;
},byNode:function(node){
return hash[node.getAttribute("widgetId")];
},toArray:function(){
var ar=[];
for(var id in hash){
ar.push(hash[id]);
}
return ar;
},getUniqueId:function(_771){
var id;
do{
id=_771+"_"+(_771 in _76e?++_76e[_771]:_76e[_771]=0);
}while(hash[id]);
return _76d._scopeName=="dijit"?id:_76d._scopeName+"_"+id;
},findWidgets:function(root){
var _772=[];
function _773(root){
for(var node=root.firstChild;node;node=node.nextSibling){
if(node.nodeType==1){
var _774=node.getAttribute("widgetId");
if(_774){
var _775=hash[_774];
if(_775){
_772.push(_775);
}
}else{
_773(node);
}
}
}
};
_773(root);
return _772;
},_destroyAll:function(){
_76d._curFocus=null;
_76d._prevFocus=null;
_76d._activeStack=[];
_76b.forEach(_76f.findWidgets(win.body()),function(_776){
if(!_776._destroyed){
if(_776.destroyRecursive){
_776.destroyRecursive();
}else{
if(_776.destroy){
_776.destroy();
}
}
}
});
},getEnclosingWidget:function(node){
while(node){
var id=node.getAttribute&&node.getAttribute("widgetId");
if(id){
return hash[id];
}
node=node.parentNode;
}
return null;
},_hash:hash};
_76d.registry=_76f;
return _76f;
});
},"url:dijit/layout/templates/AccordionButton.html":"<div data-dojo-attach-event='onclick:_onTitleClick' class='dijitAccordionTitle' role=\"presentation\">\n\t<div data-dojo-attach-point='titleNode,focusNode' data-dojo-attach-event='onkeypress:_onTitleKeyPress'\n\t\t\tclass='dijitAccordionTitleFocus' role=\"tab\" aria-expanded=\"false\"\n\t\t><span class='dijitInline dijitAccordionArrow' role=\"presentation\"></span\n\t\t><span class='arrowTextUp' role=\"presentation\">+</span\n\t\t><span class='arrowTextDown' role=\"presentation\">-</span\n\t\t><img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon\" data-dojo-attach-point='iconNode' style=\"vertical-align: middle\" role=\"presentation\"/>\n\t\t<span role=\"presentation\" data-dojo-attach-point='titleTextNode' class='dijitAccordionText'></span>\n\t</div>\n</div>\n","curam/validation":function(){
define("curam/validation",["curam/define","curam/date"],function(){
curam.define.singleton("curam.validation",{FILE_UPLOAD_FLGS:[],fileUploadChecker:null,invalidPathMsg:null,preventKeyPress:function(_777){
if(dojo.isIE){
_777.cancelBubble=true;
_777.returnValue=false;
return false;
}
return true;
},activateFileUploadChecker:function(code){
if(!curam.validation.fileUploadChecker){
curam.validation.fileUploadChecker=function(){
var form=dojo.byId("mainForm");
var _778=function(evt){
var _779=curam.validation.FILE_UPLOAD_FLGS;
for(var i=0;i<_779.length;i++){
var _77a=_779[i];
var _77b=cm.nextSibling(dojo.byId(_77a),"input");
if(!curam.validation.isValidFilePath(_77b.value)){
dojo.stopEvent(evt);
alert(curam.validation.invalidPathMsg+" '"+_77b.value+"'");
cm.setFormSubmitted(form,0);
return false;
}
}
return true;
};
dojo.connect(form,"onsubmit",_778);
};
dojo.addOnLoad(curam.validation.fileUploadChecker);
}
},isValidFilePath:function(path){
return true;
},validateDate:function(_77c){
var _77d={valid:curam.date.isDate(_77c,jsDF),validFormat:jsDF.toLowerCase()};
return _77d;
}});
return curam.validation;
});
},"dijit/PopupMenuBarItem":function(){
define("dijit/PopupMenuBarItem",["dojo/_base/declare","./PopupMenuItem","./MenuBarItem"],function(_77e,_77f,_780){
var _781=_780._MenuBarItemMixin;
return _77e("dijit.PopupMenuBarItem",[_77f,_781],{});
});
},"dijit/form/_FormMixin":function(){
define("dijit/form/_FormMixin",["dojo/_base/array","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/window"],function(_782,_783,_784,lang,_785){
return _783("dijit.form._FormMixin",null,{state:"",_getDescendantFormWidgets:function(_786){
var res=[];
_782.forEach(_786||this.getChildren(),function(_787){
if("value" in _787){
res.push(_787);
}else{
res=res.concat(this._getDescendantFormWidgets(_787.getChildren()));
}
},this);
return res;
},reset:function(){
_782.forEach(this._getDescendantFormWidgets(),function(_788){
if(_788.reset){
_788.reset();
}
});
},validate:function(){
var _789=false;
return _782.every(_782.map(this._getDescendantFormWidgets(),function(_78a){
_78a._hasBeenBlurred=true;
var _78b=_78a.disabled||!_78a.validate||_78a.validate();
if(!_78b&&!_789){
_785.scrollIntoView(_78a.containerNode||_78a.domNode);
_78a.focus();
_789=true;
}
return _78b;
}),function(item){
return item;
});
},setValues:function(val){
_784.deprecated(this.declaredClass+"::setValues() is deprecated. Use set('value', val) instead.","","2.0");
return this.set("value",val);
},_setValueAttr:function(obj){
var map={};
_782.forEach(this._getDescendantFormWidgets(),function(_78c){
if(!_78c.name){
return;
}
var _78d=map[_78c.name]||(map[_78c.name]=[]);
_78d.push(_78c);
});
for(var name in map){
if(!map.hasOwnProperty(name)){
continue;
}
var _78e=map[name],_78f=lang.getObject(name,false,obj);
if(_78f===undefined){
continue;
}
if(!lang.isArray(_78f)){
_78f=[_78f];
}
if(typeof _78e[0].checked=="boolean"){
_782.forEach(_78e,function(w){
w.set("value",_782.indexOf(_78f,w.value)!=-1);
});
}else{
if(_78e[0].multiple){
_78e[0].set("value",_78f);
}else{
_782.forEach(_78e,function(w,i){
w.set("value",_78f[i]);
});
}
}
}
},getValues:function(){
_784.deprecated(this.declaredClass+"::getValues() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},_getValueAttr:function(){
var obj={};
_782.forEach(this._getDescendantFormWidgets(),function(_790){
var name=_790.name;
if(!name||_790.disabled){
return;
}
var _791=_790.get("value");
if(typeof _790.checked=="boolean"){
if(/Radio/.test(_790.declaredClass)){
if(_791!==false){
lang.setObject(name,_791,obj);
}else{
_791=lang.getObject(name,false,obj);
if(_791===undefined){
lang.setObject(name,null,obj);
}
}
}else{
var ary=lang.getObject(name,false,obj);
if(!ary){
ary=[];
lang.setObject(name,ary,obj);
}
if(_791!==false){
ary.push(_791);
}
}
}else{
var prev=lang.getObject(name,false,obj);
if(typeof prev!="undefined"){
if(lang.isArray(prev)){
prev.push(_791);
}else{
lang.setObject(name,[prev,_791],obj);
}
}else{
lang.setObject(name,_791,obj);
}
}
});
return obj;
},isValid:function(){
return this.state=="";
},onValidStateChange:function(){
},_getState:function(){
var _792=_782.map(this._descendants,function(w){
return w.get("state")||"";
});
return _782.indexOf(_792,"Error")>=0?"Error":_782.indexOf(_792,"Incomplete")>=0?"Incomplete":"";
},disconnectChildren:function(){
_782.forEach(this._childConnections||[],lang.hitch(this,"disconnect"));
_782.forEach(this._childWatches||[],function(w){
w.unwatch();
});
},connectChildren:function(_793){
var _794=this;
this.disconnectChildren();
this._descendants=this._getDescendantFormWidgets();
var set=_793?function(name,val){
_794[name]=val;
}:lang.hitch(this,"_set");
set("value",this.get("value"));
set("state",this._getState());
var _795=(this._childConnections=[]),_796=(this._childWatches=[]);
_782.forEach(_782.filter(this._descendants,function(item){
return item.validate;
}),function(_797){
_782.forEach(["state","disabled"],function(attr){
_796.push(_797.watch(attr,function(){
_794.set("state",_794._getState());
}));
});
});
var _798=function(){
if(_794._onChangeDelayTimer){
clearTimeout(_794._onChangeDelayTimer);
}
_794._onChangeDelayTimer=setTimeout(function(){
delete _794._onChangeDelayTimer;
_794._set("value",_794.get("value"));
},10);
};
_782.forEach(_782.filter(this._descendants,function(item){
return item.onChange;
}),function(_799){
_795.push(_794.connect(_799,"onChange",_798));
_796.push(_799.watch("disabled",_798));
});
},startup:function(){
this.inherited(arguments);
this.connectChildren(true);
this.watch("state",function(attr,_79a,_79b){
this.onValidStateChange(_79b=="");
});
},destroy:function(){
this.disconnectChildren();
this.inherited(arguments);
}});
});
},"dijit/BackgroundIframe":function(){
define("dijit/BackgroundIframe",["require",".","dojo/_base/config","dojo/dom-construct","dojo/dom-style","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window"],function(_79c,_79d,_79e,_79f,_7a0,lang,on,has,win){
has.add("bgIframe",has("ie")||has("mozilla"));
var _7a1=new function(){
var _7a2=[];
this.pop=function(){
var _7a3;
if(_7a2.length){
_7a3=_7a2.pop();
_7a3.style.display="";
}else{
if(has("ie")<9){
var burl=_79e["dojoBlankHtmlUrl"]||_79c.toUrl("dojo/resources/blank.html")||"javascript:\"\"";
var html="<iframe src='"+burl+"' role='presentation'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_7a3=win.doc.createElement(html);
}else{
_7a3=_79f.create("iframe");
_7a3.src="javascript:\"\"";
_7a3.className="dijitBackgroundIframe";
_7a3.setAttribute("role","presentation");
_7a0.set(_7a3,"opacity",0.1);
}
_7a3.tabIndex=-1;
}
return _7a3;
};
this.push=function(_7a4){
_7a4.style.display="none";
_7a2.push(_7a4);
};
}();
_79d.BackgroundIframe=function(node){
if(!node.id){
throw new Error("no id");
}
if(has("bgIframe")){
var _7a5=(this.iframe=_7a1.pop());
node.appendChild(_7a5);
if(has("ie")<7||has("quirks")){
this.resize(node);
this._conn=on(node,"resize",lang.hitch(this,function(){
this.resize(node);
}));
}else{
_7a0.set(_7a5,{width:"100%",height:"100%"});
}
}
};
lang.extend(_79d.BackgroundIframe,{resize:function(node){
if(this.iframe){
_7a0.set(this.iframe,{width:node.offsetWidth+"px",height:node.offsetHeight+"px"});
}
},destroy:function(){
if(this._conn){
this._conn.remove();
this._conn=null;
}
if(this.iframe){
_7a1.push(this.iframe);
delete this.iframe;
}
}});
return _79d.BackgroundIframe;
});
},"dijit/layout/TabController":function(){
require({cache:{"url:dijit/layout/templates/_TabButton.html":"<div role=\"presentation\" data-dojo-attach-point=\"titleNode\" data-dojo-attach-event='onclick:onClick'>\n    <div role=\"presentation\" class='dijitTabInnerDiv' data-dojo-attach-point='innerDiv'>\n        <div role=\"presentation\" class='dijitTabContent' data-dojo-attach-point='tabContent'>\n        \t<div role=\"presentation\" data-dojo-attach-point='focusNode'>\n\t\t        <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" data-dojo-attach-point='iconNode' />\n\t\t        <span data-dojo-attach-point='containerNode' class='tabLabel'></span>\n\t\t        <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\n\t\t        \t\tdata-dojo-attach-event='onclick: onClickCloseButton' role=\"presentation\">\n\t\t            <span data-dojo-attach-point='closeText' class='dijitTabCloseText'>[x]</span\n\t\t        ></span>\n\t\t\t</div>\n        </div>\n    </div>\n</div>\n"}});
define("dijit/layout/TabController",["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/i18n","dojo/_base/lang","./StackController","../Menu","../MenuItem","dojo/text!./templates/_TabButton.html","dojo/i18n!../nls/common"],function(_7a6,dom,_7a7,_7a8,i18n,lang,_7a9,Menu,_7aa,_7ab){
var _7ac=_7a6("dijit.layout._TabButton",_7a9.StackButton,{baseClass:"dijitTab",cssStateNodes:{closeNode:"dijitTabCloseButton"},templateString:_7ab,scrollOnFocus:false,buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.containerNode,false);
},startup:function(){
this.inherited(arguments);
var n=this.domNode;
setTimeout(function(){
n.className=n.className;
},1);
},_setCloseButtonAttr:function(disp){
this._set("closeButton",disp);
_7a8.toggle(this.innerDiv,"dijitClosable",disp);
this.closeNode.style.display=disp?"":"none";
if(disp){
var _7ad=i18n.getLocalization("dijit","common");
if(this.closeNode){
_7a7.set(this.closeNode,"title",_7ad.itemClose);
}
this._closeMenu=new Menu({id:this.id+"_Menu",dir:this.dir,lang:this.lang,textDir:this.textDir,targetNodeIds:[this.domNode]});
this._closeMenu.addChild(new _7aa({label:_7ad.itemClose,dir:this.dir,lang:this.lang,textDir:this.textDir,onClick:lang.hitch(this,"onClickCloseButton")}));
}else{
if(this._closeMenu){
this._closeMenu.destroyRecursive();
delete this._closeMenu;
}
}
},_setLabelAttr:function(_7ae){
this.inherited(arguments);
if(!this.showLabel&&!this.params.title){
this.iconNode.alt=lang.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
},destroy:function(){
if(this._closeMenu){
this._closeMenu.destroyRecursive();
delete this._closeMenu;
}
this.inherited(arguments);
}});
var _7af=_7a6("dijit.layout.TabController",_7a9,{baseClass:"dijitTabController",templateString:"<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'></div>",tabPosition:"top",buttonWidget:"curam.widget._TabButton",startup:function(){
this.inherited(arguments);
this.connect(this,"onAddChild",function(page,_7b0){
var _7b1=this;
page.controlButton._curamPageId=page.id;
page.controlButton.connect(page.controlButton,"_setCuramVisibleAttr",function(){
if(page.controlButton.curamVisible){
var _7b2=dojo.map(_7b1.getChildren(),function(btn){
return btn._curamPageId;
});
var _7b3=curam.tab.getTabWidgetId(curam.tab.getContainerTab(page.domNode));
var _7b4=curam.util.TabNavigation.getInsertIndex(_7b3,_7b2,page.id);
_7b1.addChild(page.controlButton,_7b4);
}else{
var _7b5=page.controlButton;
if(dojo.indexOf(_7b1.getChildren(),_7b5)!=-1){
_7b1.removeChild(_7b5);
}
}
});
});
},_rectifyRtlTabList:function(){
if(0>=this.tabPosition.indexOf("-h")){
return;
}
if(!this.pane2button){
return;
}
var _7b6=0;
for(var pane in this.pane2button){
var ow=this.pane2button[pane].innerDiv.scrollWidth;
_7b6=Math.max(_7b6,ow);
}
for(pane in this.pane2button){
this.pane2button[pane].innerDiv.style.width=_7b6+"px";
}
},onButtonClick:function(page){
if(!page.controlButton.get("curamDisabled")){
var _7b7=dijit.byId(this.containerId);
_7b7.selectChild(page);
}
}});
_7af.TabButton=_7ac;
return _7af;
});
},"dijit/_MenuBase":function(){
define("dijit/_MenuBase",["./popup","dojo/window","./_Widget","./_KeyNavContainer","./_TemplatedMixin","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/lang","dojo/_base/array"],function(pm,_7b8,_7b9,_7ba,_7bb,_7bc,dom,_7bd,_7be,lang,_7bf){
return _7bc("dijit._MenuBase",[_7b9,_7bb,_7ba],{parentMenu:null,popupDelay:500,onExecute:function(){
},onCancel:function(){
},_moveToPopup:function(evt){
if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){
this.focusedChild._onClick(evt);
}else{
var _7c0=this._getTopMenu();
if(_7c0&&_7c0._isMenuBar){
_7c0.focusNext();
}
}
},_onPopupHover:function(){
if(this.currentPopup&&this.currentPopup._pendingClose_timer){
var _7c1=this.currentPopup.parentMenu;
if(_7c1.focusedChild){
_7c1.focusedChild._setSelected(false);
}
_7c1.focusedChild=this.currentPopup.from_item;
_7c1.focusedChild._setSelected(true);
this._stopPendingCloseTimer(this.currentPopup);
}
},onItemHover:function(item){
if(this.isActive){
this.focusChild(item);
if(this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer){
this.hover_timer=setTimeout(lang.hitch(this,"_openPopup"),this.popupDelay);
}
}
if(this.focusedChild){
this.focusChild(item);
}
this._hoveredChild=item;
},_onChildBlur:function(item){
this._stopPopupTimer();
item._setSelected(false);
var _7c2=item.popup;
if(_7c2){
this._stopPendingCloseTimer(_7c2);
_7c2._pendingClose_timer=setTimeout(function(){
_7c2._pendingClose_timer=null;
if(_7c2.parentMenu){
_7c2.parentMenu.currentPopup=null;
}
pm.close(_7c2);
},this.popupDelay);
}
},onItemUnhover:function(item){
if(this.isActive){
this._stopPopupTimer();
}
if(this._hoveredChild==item){
this._hoveredChild=null;
}
},_stopPopupTimer:function(){
if(this.hover_timer){
clearTimeout(this.hover_timer);
this.hover_timer=null;
}
},_stopPendingCloseTimer:function(_7c3){
if(_7c3._pendingClose_timer){
clearTimeout(_7c3._pendingClose_timer);
_7c3._pendingClose_timer=null;
}
},_stopFocusTimer:function(){
if(this._focus_timer){
clearTimeout(this._focus_timer);
this._focus_timer=null;
}
},_getTopMenu:function(){
for(var top=this;top.parentMenu;top=top.parentMenu){
}
return top;
},onItemClick:function(item,evt){
if(typeof this.isShowingNow=="undefined"){
this._markActive();
}
this.focusChild(item);
if(item.disabled){
return false;
}
if(item.popup){
this._openPopup();
}else{
this.onExecute();
item.onClick(evt);
}
},_openPopup:function(){
this._stopPopupTimer();
var _7c4=this.focusedChild;
if(!_7c4){
return;
}
var _7c5=_7c4.popup;
if(_7c5.isShowingNow){
return;
}
if(this.currentPopup){
this._stopPendingCloseTimer(this.currentPopup);
pm.close(this.currentPopup);
}
_7c5.parentMenu=this;
_7c5.from_item=_7c4;
var self=this;
pm.open({parent:this,popup:_7c5,around:_7c4.domNode,orient:this._orient||["after","before"],onCancel:function(){
self.focusChild(_7c4);
self._cleanUp();
_7c4._setSelected(true);
self.focusedChild=_7c4;
},onExecute:lang.hitch(this,"_cleanUp")});
this.currentPopup=_7c5;
if(this.popupHoverHandle){
this.disconnect(this.popupHoverHandle);
}
this.popupHoverHandle=this.connect(_7c5.domNode,"onmouseenter","_onPopupHover");
if(_7c5.focus){
_7c5._focus_timer=setTimeout(lang.hitch(_7c5,function(){
this._focus_timer=null;
this.focus();
}),0);
}
},_markActive:function(){
this.isActive=true;
_7be.replace(this.domNode,"dijitMenuActive","dijitMenuPassive");
},onOpen:function(){
this.isShowingNow=true;
this._markActive();
},_markInactive:function(){
this.isActive=false;
_7be.replace(this.domNode,"dijitMenuPassive","dijitMenuActive");
},onClose:function(){
this._stopFocusTimer();
this._markInactive();
this.isShowingNow=false;
this.parentMenu=null;
},_closeChild:function(){
this._stopPopupTimer();
if(this.currentPopup){
if(_7bf.indexOf(this._focusManager.activeStack,this.id)>=0){
_7bd.set(this.focusedChild.focusNode,"tabIndex",this.tabIndex);
this.focusedChild.focusNode.focus();
}
pm.close(this.currentPopup);
this.currentPopup=null;
}
if(this.focusedChild){
this.focusedChild._setSelected(false);
this.focusedChild._onUnhover();
this.focusedChild=null;
}
},_onItemFocus:function(item){
if(this._hoveredChild&&this._hoveredChild!=item){
this._hoveredChild._onUnhover();
}
},_onBlur:function(){
this._cleanUp();
this.inherited(arguments);
},_cleanUp:function(){
this._closeChild();
if(typeof this.isShowingNow=="undefined"){
this._markInactive();
}
}});
});
},"curam/ModalUIMController":function(){
require({cache:{"url:curam/layout/resources/ModalUIMController.html":"<div id=\"uimcontroller_${uid}\" class=\"uimcontroller_${uid} uimController ${classList}\" data-dojo-attach-point=\"uimController\">\r\n  <div style=\"display:none;\" \r\n       id=\"uimcontroller_tc_${uid}\" \r\n       class=\"ipnTabController in-page-nav-tabContainer\"\r\n       data-dojo-attach-point=\"tabController\" \r\n       data-dojo-type=\"curam.layout.TabContainer\">\r\n  </div>\r\n  <div class=\"contentPanelFrameWrapper3\"  \r\n        data-dojo-attach-point=\"frameWrapper\">\r\n    <iframe frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\"\r\n             allowTransparency=\"true\" \r\n             id=\"${iframeId}\" \r\n             data-dojo-attach-point=\"frame\"                 \r\n             class=\"${iframeId} ${iframeClassList}\"\r\n             iscpiframe=\"${iscpiframe}\"\r\n             title=\"${title}\" >\r\n    </iframe>\r\n    <span tabIndex=\"0\" class=\"hidden\" id=\"end-${uid}\">${endModalUIMController}</span>\r\n  </div> \r\n</div>"}});
define("curam/ModalUIMController",["dojo/text!curam/layout/resources/ModalUIMController.html","dojo/parser","curam/UIMController","curam/debug","curam/util/onLoad","curam/util/ResourceBundle"],function(_7c6){
dojo.requireLocalization("curam.application","Debug");
var _7c7=new curam.util.ResourceBundle("Debug");
var _7c8=dojo.declare("curam.ModalUIMController",[curam.UIMController],{startModalUIMController:LOCALISED_ACCESSIBILITY_MODAL_START,endModalUIMController:LOCALISED_ACCESSIBILITY_MODAL_END,templateString:"<div id=\"uimcontroller_${uid}\" class=\"uimcontroller_${uid} uimController ${classList}\" data-dojo-attach-point=\"uimController\">\r\n  <div style=\"display:none;\" \r\n       id=\"uimcontroller_tc_${uid}\" \r\n       class=\"ipnTabController in-page-nav-tabContainer\"\r\n       data-dojo-attach-point=\"tabController\" \r\n       data-dojo-type=\"curam.layout.TabContainer\">\r\n  </div>\r\n  <div class=\"contentPanelFrameWrapper\"  \r\n        data-dojo-attach-point=\"frameWrapper\">\r\n     <iframe frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\"\r\n             allowTransparency=\"true\" \r\n             id=\"${iframeId}\" \r\n             data-dojo-attach-point=\"frame\"                 \r\n             class=\"${iframeId} ${iframeClassList}\"\r\n             iscpiframe=\"${iscpiframe}\"\r\n             title=\"${title}\" >\r\n    </iframe>\r\n    <span onkeyDown=\"curam.util.focusHelpIconOnTab(event)\" tabIndex=\"0\" class=\"hidden\" id=\"end-${uid}\">${endModalUIMController}</span>\r\n  </div> \r\n</div>"});
return _7c8;
});
},"dijit/layout/ScrollingTabController":function(){
require({cache:{"url:dijit/layout/templates/ScrollingTabController.html":"<div class=\"dijitTabListContainer-${tabPosition} tabStrip-disabled dijitLayoutContainer\"><!-- CURAM-FIX: removed style=\"visibility:hidden, dd the tabStrip-disabled class by default.\" -->\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerMenuButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_menuBtn\"\r\n\t\t\tdata-dojo-props=\"containerId: '${containerId}', iconClass: 'dijitTabStripMenuIcon',\r\n\t\t\t\t\tdropDownPosition: ['below-alt', 'above-alt']\"\r\n\t\t\tdata-dojo-attach-point=\"_menuBtn\" showLabel=\"false\" title=\"\">&#9660;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_leftBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideLeftIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_leftBtn\" data-dojo-attach-event=\"onClick: doSlideLeft\">&#9664;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_rightBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideRightIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_rightBtn\" data-dojo-attach-event=\"onClick: doSlideRight\">&#9654;</div>\r\n\t<div class='dijitTabListWrapper dijitTabContainerTopNone dijitAlignClient' data-dojo-attach-point='tablistWrapper'>\r\n\t\t<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'\r\n\t\t\t\tdata-dojo-attach-point='containerNode' class='nowrapTabStrip dijitTabContainerTop-tabs'></div>\r\n\t</div>\r\n</div>\r\n","url:dijit/layout/templates/_ScrollingTabControllerButton.html":"<div data-dojo-attach-event=\"onclick:_onClick\">\n\t<div role=\"presentation\" class=\"dijitTabInnerDiv\" data-dojo-attach-point=\"innerDiv,focusNode\">\n\t\t<div role=\"presentation\" class=\"dijitTabContent dijitButtonContents\" data-dojo-attach-point=\"tabContent\">\n\t\t\t<img role=\"presentation\" alt=\"\" src=\"${_blankGif}\" class=\"dijitTabStripIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t\t<span data-dojo-attach-point=\"containerNode,titleNode\" class=\"dijitButtonText\"></span>\n\t\t</div>\n\t</div>\n</div>"}});
define("dijit/layout/ScrollingTabController",["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/fx","dojo/_base/lang","dojo/query","dojo/_base/sniff","../registry","dojo/text!./templates/ScrollingTabController.html","dojo/text!./templates/_ScrollingTabControllerButton.html","./TabController","./utils","../_WidgetsInTemplateMixin","../Menu","../MenuItem","../form/Button","../_HasDropDown","dojo/NodeList-dom"],function(_7c9,_7ca,_7cb,_7cc,_7cd,fx,lang,_7ce,has,_7cf,_7d0,_7d1,_7d2,_7d3,_7d4,Menu,_7d5,_7d6,_7d7){
var _7d8=_7ca("dijit.layout.ScrollingTabController",[_7d2,_7d4],{baseClass:"dijitTabController dijitScrollingTabController",templateString:_7d0,useMenu:true,useSlider:true,tabStripClass:"",widgetsInTemplate:true,_minScroll:5,_setClassAttr:{node:"containerNode",type:"class"},_tabsWidth:-1,_tablistMenuItemIdSuffix:"_stcMi",buildRendering:function(){
this.inherited(arguments);
var n=this.domNode;
this.scrollNode=this.tablistWrapper;
this._initButtons();
if(!this.tabStripClass){
this.tabStripClass="dijitTabContainer"+this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"")+"None";
_7cb.add(n,"tabStrip-disabled");
}
_7cb.add(this.tablistWrapper,this.tabStripClass);
},onStartup:function(){
this.inherited(arguments);
this._postStartup=true;
},onAddChild:function(page,_7d9){
this.inherited(arguments);
var _7da=page.id;
this.bustSizeCache=true;
this._tabsWidth=-1;
_7c9.forEach(["label","iconClass"],function(attr){
this.pane2watches[page.id].push(this.pane2button[page.id].watch(attr,lang.hitch(this,function(){
if(this._postStartup&&this._dim){
this.resize(this._dim);
}
if(this._dim){
this.bustSizeCache=true;
this._tabsWidth=-1;
this.pane2button[_7da].domNode._width=0;
}
})));
},this);
var _7db=function(pid,_7dc){
var _7dd=null;
if(_7dc._menuBtn.dropDown){
var _7de=dojo.query(pid+_7dc._tablistMenuItemIdSuffix,_7dc._menuBtn.dropDown.domNode)[0];
if(_7de){
_7dd=dijit.byNode(_7de);
}
}
return _7dd;
};
this.pane2button[_7da].connect(this.pane2button[_7da],"_setCuramVisibleAttr",lang.hitch(this,function(){
var _7df=_7db(_7da,this);
if(_7df){
this._setCuramVisibility(_7df,_7da);
}
}));
this.pane2button[_7da].connect(this.pane2button[_7da],"_setCuramDisabledAttr",lang.hitch(this,function(){
var _7e0=_7db(_7da,this);
if(_7e0){
this._setCuramAvailability(_7e0,_7da);
}
}));
_7cd.set(this.containerNode,"width",(_7cd.get(this.containerNode,"width")+200)+"px");
this.containerNode._width=0;
},_setCuramVisibility:function(_7e1,_7e2){
var _7e3=this.pane2button[_7e2].curamVisible;
if(_7e3){
dojo.replaceClass(_7e1.domNode,"visible","hidden");
}else{
dojo.replaceClass(_7e1.domNode,"hidden","visible");
}
},_setCuramAvailability:function(_7e4,_7e5){
var _7e6=!this.pane2button[_7e5].curamDisabled;
_7e4.disabled=!_7e6;
if(_7e6){
dojo.replaceClass(_7e4.domNode,"enabled","disabled");
}else{
dojo.replaceClass(_7e4.domNode,"disabled","enabled");
}
},_getNodeWidth:function(node){
if(!node._width){
node._width=dojo.style(node,"width");
}
return node._width;
},destroyRendering:function(_7e7){
_7c9.forEach(this._attachPoints,function(_7e8){
delete this[_7e8];
},this);
this._attachPoints=[];
_7c9.forEach(this._attachEvents,this.disconnect,this);
this.attachEvents=[];
},destroy:function(){
if(this._menuBtn){
this._menuBtn._curamOwnerController=null;
}
this.inherited(arguments);
},onRemoveChild:function(page,_7e9){
var _7ea=this.pane2button[page.id];
if(this._selectedTab===_7ea.domNode){
this._selectedTab=null;
}
this.inherited(arguments);
this.bustSizeCache=true;
this._tabsWidth=-1;
},_initButtons:function(){
this.subscribe("tab.title.name.finished",this._measureBtns);
this._btnWidth=0;
this._buttons=_7ce("> .tabStripButton",this.domNode).filter(function(btn){
if((this.useMenu&&btn==this._menuBtn.domNode)||(this.useSlider&&(btn==this._rightBtn.domNode||btn==this._leftBtn.domNode))){
this._btnWidth+=_7cc.getMarginBoxSimple(btn).w;
return true;
}else{
_7cd.set(btn,"display","none");
return false;
}
},this);
this._menuBtn._curamOwnerController=this;
},_getTabsWidth:function(){
if(this._tabsWidth>-1){
return this._tabsWidth;
}
var _7eb=this.getChildren();
if(_7eb.length){
var _7ec=_7eb[this.isLeftToRight()?_7eb.length-1:0].domNode;
var _7ed=this._getNodeWidth(_7ec);
if(this.isLeftToRight()){
this._tabsWidth=_7ec.offsetLeft+_7ed;
}else{
var _7ee=_7eb[_7eb.length-1].domNode;
this._tabsWidth=_7ec.offsetLeft+_7ed-_7ee.offsetLeft;
}
return this._tabsWidth;
}else{
return 0;
}
},_enableBtn:function(_7ef){
var _7f0=this._getTabsWidth();
_7ef=_7ef||_7cd.get(this.scrollNode,"width");
return _7f0>0&&_7ef<_7f0;
},_measureBtns:function(){
if(this._enableBtn()&&this._rightBtn.domNode.style.display=="none"){
this.resize(this._dim);
if(this.isLeftToRight()){
this._rightBtn.set("disabled",true);
}else{
this._leftBtn.set("disabled",true);
}
}
},resize:function(dim){
if(dojo.query("> *",this.containerNode).length<1){
if(this.domNode.style.height!="1px"){
dojo.style(this.domNode,"height","1px");
}
return;
}
if(!this.bustSizeCache&&this._dim&&dim&&this._dim.w==dim.w){
return;
}
this.bustSizeCache=false;
this.scrollNodeHeight=this.scrollNodeHeight||this.scrollNode.offsetHeight;
this._dim=dim;
this.scrollNode.style.height="auto";
var cb=this._contentBox=_7d3.marginBox2contentBox(this.domNode,{h:0,w:dim.w});
cb.h=this.scrollNodeHeight;
_7cc.setContentSize(this.domNode,cb);
var _7f1=this._enableBtn(this._contentBox.w);
this._buttons.style("display",_7f1?"":"none");
this._leftBtn.layoutAlign="left";
this._rightBtn.layoutAlign="right";
this._menuBtn.layoutAlign=this.isLeftToRight()?"right":"left";
var _7f2;
if(_7f1){
_7f2=dijit.layout.layoutChildren(this.domNode,this._contentBox,[this._menuBtn,this._leftBtn,this._rightBtn,{domNode:this.scrollNode,layoutAlign:"client",fakeWidget:true}]);
}else{
_7f2=dijit.layout.layoutChildren(this.domNode,this._contentBox,[{domNode:this.scrollNode,layoutAlign:"client",fakeWidget:true}]);
}
this.scrollNode._width=_7f2.client.w;
if(this._selectedTab){
if(this._anim&&this._anim.status()=="playing"){
this._anim.stop();
}
this.scrollNode.scrollLeft=this._convertToScrollLeft(this._getScrollForSelectedTab());
}
this._setButtonClass(this._getScroll());
this._postResize=true;
return {h:this._contentBox.h,w:dim.w};
},_getScroll:function(){
return (this.isLeftToRight()||has("ie")<8||(has("ie")&&has("quirks"))||has("webkit"))?this.scrollNode.scrollLeft:_7cd.get(this.containerNode,"width")-_7cd.get(this.scrollNode,"width")+(has("ie")>=8?-1:1)*this.scrollNode.scrollLeft;
},_convertToScrollLeft:function(val){
if(this.isLeftToRight()||has("ie")<8||(has("ie")&&has("quirks"))||has("webkit")){
return val;
}else{
var _7f3=_7cd.get(this.containerNode,"width")-_7cd.get(this.scrollNode,"width");
return (has("ie")>=8?-1:1)*(val-_7f3);
}
},onSelectChild:function(page){
var tab=this.pane2button[page.id];
if(!tab||!page){
return;
}
var node=tab.domNode;
if(node!=this._selectedTab){
this._selectedTab=node;
if(this._postResize){
var _7f4=this._getNodeWidth(this.scrollNode);
if(this._getTabsWidth()<_7f4){
tab.onClick(null);
}else{
var sl=this._getScroll();
if(sl>node.offsetLeft||sl+_7f4<node.offsetLeft+this._getNodeWidth(node)){
this.createSmoothScroll().play();
}
}
}
}
this.inherited(arguments);
},_getScrollBounds:function(){
var _7f5=this.getChildren(),_7f6=this._getNodeWidth(this.scrollNode),_7f7=this._getNodeWidth(this.containerNode),_7f8=_7f7-_7f6,_7f9=this._getTabsWidth();
if(_7f5.length&&_7f9>_7f6){
return {min:this.isLeftToRight()?0:_7f5[_7f5.length-1].domNode.offsetLeft-10,max:this.isLeftToRight()?_7f9-_7f6:_7f8};
}else{
var _7fa=this.isLeftToRight()?0:_7f8;
return {min:_7fa,max:_7fa};
}
},_getScrollForSelectedTab:function(){
var w=this.scrollNode,n=this._selectedTab,_7fb=_7cd.get(this.scrollNode,"width"),_7fc=this._getScrollBounds();
var pos=(n.offsetLeft+_7cd.get(n,"width")/2)-_7fb/2;
pos=Math.min(Math.max(pos,_7fc.min),_7fc.max);
return pos;
},createSmoothScroll:function(x){
if(arguments.length>0){
var _7fd=this._getScrollBounds();
x=Math.min(Math.max(x,_7fd.min),_7fd.max);
}else{
x=this._getScrollForSelectedTab();
}
if(this._anim&&this._anim.status()=="playing"){
this._anim.stop();
}
var self=this,w=this.scrollNode,anim=new fx.Animation({beforeBegin:function(){
if(this.curve){
delete this.curve;
}
var oldS=w.scrollLeft,newS=self._convertToScrollLeft(x);
anim.curve=new fx._Line(oldS,newS);
},onAnimate:function(val){
w.scrollLeft=val;
}});
this._anim=anim;
this._setButtonClass(x);
return anim;
},_getBtnNode:function(e){
var n=e.target;
while(n&&!_7cb.contains(n,"tabStripButton")){
n=n.parentNode;
}
return n;
},doSlideRight:function(e){
this.doSlide(1,this._getBtnNode(e));
},doSlideLeft:function(e){
this.doSlide(-1,this._getBtnNode(e));
},doSlide:function(_7fe,node){
if(node&&_7cb.contains(node,"dijitTabDisabled")){
return;
}
var _7ff=_7cd.get(this.scrollNode,"width");
var d=(_7ff*0.75)*_7fe;
var to=this._getScroll()+d;
this._setButtonClass(to);
this.createSmoothScroll(to).play();
},_setButtonClass:function(_800){
var _801=this._getScrollBounds();
this._leftBtn.set("disabled",_800<=_801.min);
this._rightBtn.set("disabled",_800>=_801.max);
}});
var _802=_7ca("dijit.layout._ScrollingTabControllerButtonMixin",null,{baseClass:"dijitTab tabStripButton",templateString:_7d1,tabIndex:"",isFocusable:function(){
return false;
}});
_7ca("dijit.layout._ScrollingTabControllerButton",[_7d6,_802]);
_7ca("dijit.layout._ScrollingTabControllerMenuButton",[_7d6,_7d7,_802],{containerId:"",tabIndex:"-1",isLoaded:function(){
return false;
},loadDropDown:function(_803){
this.dropDown=new Menu({id:this.containerId+"_menu",dir:this.dir,lang:this.lang,textDir:this.textDir});
var _804=_7cf.byId(this.containerId);
_7c9.forEach(_804.getChildren(),function(page){
var _805=new _7d5({id:page.id+"_stcMi",label:page.title,iconClass:page.iconClass,dir:page.dir,lang:page.lang,textDir:page.textDir,onClick:function(){
_804.selectChild(page);
}});
this.dropDown.addChild(_805);
},this);
dojo.forEach(this.dropDown.getChildren(),lang.hitch(this,function(_806){
var _807=_806.id.split(this._curamOwnerController._tablistMenuItemIdSuffix)[0];
this._curamOwnerController._setCuramAvailability(_806,_807);
this._curamOwnerController._setCuramVisibility(_806,_807);
dojo.connect(_806,"destroy",function(){
setDynState=null;
});
}));
_803();
},closeDropDown:function(_808){
this.inherited(arguments);
if(this.dropDown){
this.dropDown.destroyRecursive();
delete this.dropDown;
}
}});
return _7d8;
});
},"dijit/form/_ListMouseMixin":function(){
define("dijit/form/_ListMouseMixin",["dojo/_base/declare","dojo/_base/event","dojo/touch","./_ListBase"],function(_809,_80a,_80b,_80c){
return _809("dijit.form._ListMouseMixin",_80c,{postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,_80b.press,"_onMouseDown");
this.connect(this.domNode,_80b.release,"_onMouseUp");
this.connect(this.domNode,"onmouseover","_onMouseOver");
this.connect(this.domNode,"onmouseout","_onMouseOut");
},_onMouseDown:function(evt){
_80a.stop(evt);
if(this._hoveredNode){
this.onUnhover(this._hoveredNode);
this._hoveredNode=null;
}
this._isDragging=true;
this._setSelectedAttr(this._getTarget(evt));
},_onMouseUp:function(evt){
_80a.stop(evt);
this._isDragging=false;
var _80d=this._getSelectedAttr();
var _80e=this._getTarget(evt);
var _80f=this._hoveredNode;
if(_80d&&_80e==_80d){
this.onClick(_80d);
}else{
if(_80f&&_80e==_80f){
this._setSelectedAttr(_80f);
this.onClick(_80f);
}
}
},_onMouseOut:function(){
if(this._hoveredNode){
this.onUnhover(this._hoveredNode);
if(this._getSelectedAttr()==this._hoveredNode){
this.onSelect(this._hoveredNode);
}
this._hoveredNode=null;
}
if(this._isDragging){
this._cancelDrag=(new Date()).getTime()+1000;
}
},_onMouseOver:function(evt){
if(this._cancelDrag){
var time=(new Date()).getTime();
if(time>this._cancelDrag){
this._isDragging=false;
}
this._cancelDrag=null;
}
var node=this._getTarget(evt);
if(!node){
return;
}
if(this._hoveredNode!=node){
if(this._hoveredNode){
this._onMouseOut({target:this._hoveredNode});
}
if(node&&node.parentNode==this.containerNode){
if(this._isDragging){
this._setSelectedAttr(node);
}else{
this._hoveredNode=node;
this.onHover(node);
}
}
}
}});
});
},"url:dijit/form/templates/ValidationTextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","curam/util/Constants":function(){
define("curam/util/Constants",["curam/define"],function(){
curam.define.singleton("curam.util.Constants",{RETURN_PAGE_PARAM:"__o3rpu"});
return curam.util.Constants;
});
},"curam/tab/TabSessionManager":function(){
define("curam/tab/TabSessionManager",["curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _810=new curam.util.ResourceBundle("Debug");
var _811=dojo.declare("curam.tab.TabSessionManager",null,{init:function(_812){
if(_812){
this._directBrowseURL=_812;
}
new curam.ui.ClientDataAccessor().getRaw("/data/tab/get",dojo.hitch(this,this._restoreTabSession),dojo.hitch(this,this._handleGetTabFailure));
},_handleGetTabFailure:function(_813,_814){
var _815=curam.tab.getTabContainer();
var _816=dojo.toJson(_813);
this._log(_810.getProperty("curam.tab.TabSessionManager.error")+_816);
var tab=new dojox.layout.ContentPane({title:"Error",closable:true,content:"An error occurred. Try refreshing the browser or contact your "+"administrator if it persists. Error: "+_813.message});
_815.addChild(tab);
},_restoreTabSession:function(_817,_818){
var _819=[];
var _81a=[];
var _81b=[];
curam.tab.getTabController().MAX_NUM_TABS=_817.maxTabs;
var _81c=this._isNewSession();
var _81d=_81c?null:this._getPrevSelectedTab();
var _81e=this._getHomePageTab();
_81d=_81d?_81d:_81e;
this.tabSelected(_81d);
_81b[_81e.sectionID]=true;
if(_817&&_817.tabs&&_817.tabs.length>0){
var tabs=_817.tabs;
this._log(_810.getProperty("curam.tab.TabSessionManager.previous")+tabs.length+" "+_810.getProperty("curam.tab.TabSessionManager.tabs"));
for(var i=0;i<tabs.length;i++){
var _81f=curam.tab.TabDescriptor.fromJson(tabs[i]);
if(_81f.tabSignature==_81e.tabSignature){
if(!_81c){
if(this._directBrowseURL){
_81d=_81f;
}else{
_81e=_81f;
}
}
}else{
if(_81f.sectionID==_81d.sectionID){
_819.push(_81f);
}else{
_81a.push(_81f);
}
}
_81b[_81f.sectionID]=true;
}
if(_81e.sectionID==_81d.sectionID){
_819.unshift(_81e);
}else{
_81a.unshift(_81e);
}
}else{
this._log(_810.getProperty("curam.tab.TabSessionManager.no.session"));
_819.push(_81e);
}
this._restoreSectionTabs(_819,_81d);
this._restoreSectionTabs(_81a,null);
this._selectedTD=_81d;
this._connectSelectionListeners(_81b);
if(this._directBrowseURL){
var _820=this._createDirectBrowseClosure();
var _821=curam.util.getTopmostWindow();
var _822=_821.dojo.subscribe("/curam/main-content/page/loaded",null,function(_823,_824){
var that=_820.getThis();
var _825=that._directBrowseURL;
var _826=that._selectedTD.tabContent.pageID;
if(_823===_826){
require(["curam/util/Navigation"],function(nav){
nav.goToUrl(_825);
});
that._selectedTD.tabContent.pageID=_825.replace(/Page.do\??.*/,"");
that.tabSelected(that._selectedTD);
dojo.unsubscribe(_822);
}
});
}
},_createDirectBrowseClosure:function(){
var that=this;
return {getThis:function(){
return that;
}};
},_restoreSectionTabs:function(_827,_828){
this._log(_810.getProperty("curam.tab.TabSessionManager.saved.tabs"));
for(var i=0;i<_827.length;i++){
var _829=_827[i];
this._log(_810.getProperty("curam.tab.TabSessionManager.saved.tab"),_829,i);
dojo.publish(curam.tab.getTabController().TAB_TOPIC,[new curam.ui.OpenTabEvent(_829,null,this._isOpenInBackground(_829,_828,i))]);
}
},_connectSelectionListeners:function(_82a){
var _82b=false;
for(var _82c in _82a){
if(curam.tab.getTabContainer(_82c)){
dojo.subscribe(curam.tab.getTabContainer(_82c).id+"-selectChild",dojo.hitch(this,this.tabContentPaneSelected));
_82b=true;
}
}
dojo.subscribe(curam.tab.SECTION_TAB_CONTAINER_ID+"-selectChild",dojo.hitch(this,this.tabSectionSelected));
return _82b;
},tabUpdated:function(_82d){
this._log(_810.getProperty("curam.tab.TabSessionManager.saving.tab"),_82d);
new curam.ui.ClientDataAccessor().set("/data/tab/update",_82d.toJson());
},tabClosed:function(_82e){
this._log(_810.getProperty("curam.tab.TabSessionManager.tab.closed"),_82e);
new curam.ui.ClientDataAccessor().set("/data/tab/close",_82e.toJson());
},tabSelected:function(_82f){
this._log(_810.getProperty("curam.tab.TabSessionManager.selected.tab"),_82f);
if(_82f.tabSignature){
curam.util.runStorageFn(function(){
var _830=curam.util.getTopmostWindow().dojox;
_830.storage.put(curam.tab.TabSessionManager.SELECTED_TAB_KEY,_82f.toJson());
});
this._log(_810.getProperty("curam.tab.TabSessionManager.recorded"),_82f);
}else{
this._log(_810.getProperty("curam.tab.TabSessionManager.not.recorded"),_82f);
}
},tabContentPaneSelected:function(_831){
if(_831.tabDescriptor){
this.tabSelected(_831.tabDescriptor);
}else{
this._log(_810.getProperty("curam.tab.TabSessionManager.no.descriptor"));
}
},tabSectionSelected:function(_832){
var _833=false;
if(_832){
var id=_832.id;
this._log(_810.getProperty("curam.tab.TabSessionManager.new.section")+" '"+id+"'.");
var _834=id.substring(0,id.length-4);
var _835=curam.tab.getSelectedTab(_834);
if(_835){
this._log(_810.getProperty("curam.tab.TabSessionManager.changing.selection"));
this.tabContentPaneSelected(_835);
_833=true;
}else{
this._log(_810.getProperty("curam.tab.TabSessionManager.not.changing.selection"));
}
}else{
this._log(_810.getProperty("curam.tab.TabSessionManager.no.container"));
}
return _833;
},_isNewSession:function(){
var _836=this._getJSessionID();
if(!_836){
return true;
}
var _837=curam.util.getTopmostWindow().dojox;
var _838=_837.encoding.digests.SHA1(_836);
var _839;
var _837=curam.util.getTopmostWindow().dojox;
curam.util.runStorageFn(function(){
_839=_837.storage.get(curam.tab.TabSessionManager.SELECTED_TAB_SESSION_KEY);
});
this._log(_810.getProperty("curam.tab.TabSessionManager.session.id")+" '"+_838+"'. "+_810.getProperty("curam.tab.TabSessionManager.old.session.id")+" '"+_839+"'.");
if(_838!=_839){
this._log(_810.getProperty("curam.tab.TabSessionManager.new.session"));
curam.util.runStorageFn(function(){
_837.storage.put(curam.tab.TabSessionManager.SELECTED_TAB_SESSION_KEY,_838);
});
curam.util.runStorageFn(function(){
_837.storage.remove(curam.tab.TabSessionManager.SELECTED_TAB_KEY);
});
return true;
}
this._log(_810.getProperty("curam.tab.TabSessionManager.refreshed.session"));
return false;
},_getJSessionID:function(){
var key="JSESSIONID=";
var _83a=null;
if(document.cookie){
var _83b=document.cookie.indexOf(key);
if(_83b!=-1){
var end=document.cookie.indexOf(";",_83b+key.length);
_83a=unescape(document.cookie.substring(_83b+key.length,end==-1?document.cookie.length:end));
}
}
return _83a;
},_getPrevSelectedTab:function(){
this._log(_810.getProperty("curam.tab.TabSessionManager.previous.tab"));
var _83c;
curam.util.runStorageFn(function(){
var _83d=curam.util.getTopmostWindow().dojox;
_83c=_83d.storage.get(curam.tab.TabSessionManager.SELECTED_TAB_KEY);
});
var _83e=null;
if(_83c){
_83e=curam.tab.TabDescriptor.fromJson(_83c);
this._log(_810.getProperty("curam.tab.TabSessionManager.previous.tab.found"),_83e);
}else{
this._log(_810.getProperty("curam.tab.TabSessionManager.previous.tab.not.found"));
}
return _83e;
},_isOpenInBackground:function(_83f,_840,pos){
var _841=true;
if(_840&&_840.tabSignature==_83f.tabSignature){
this._log(_810.getProperty("curam.tab.TabSessionManager.foreground"),_83f,pos);
_841=false;
}else{
this._log(_810.getProperty("curam.tab.TabSessionManager.background"),_83f,pos);
}
return _841;
},_getHomePageTab:function(){
this._log(_810.getProperty("curam.tab.TabSessionManager.home.page")+" '"+USER_HOME_PAGE_ID+"'.");
if(!USER_HOME_PAGE_TAB_ASSOC.tabIDs||!USER_HOME_PAGE_TAB_ASSOC.sectionID){
throw new Error("The application cannot be launched because the home page, '"+USER_HOME_PAGE_ID+"', has not been associated with a section or "+" tab.");
}
var _842=USER_HOME_PAGE_TAB_ASSOC.tabIDs[0];
var _843=USER_HOME_PAGE_TAB_ASSOC.sectionID;
var _844=new curam.tab.TabDescriptor(_843,_842);
var _845=new curam.ui.PageRequest(USER_HOME_PAGE_ID,true);
_844.isHomePage=true;
_844.setTabSignature([],_845,true);
_844.setTabContent(_845);
this._log(_810.getProperty("curam.tab.TabSessionManager.created"),_844);
return _844;
},_log:function(msg,_846,pos){
if(curam.debug.enabled()){
var _847="TAB SESSION";
if(typeof pos=="number"){
_847+=" [pos="+pos+"]";
}
curam.debug.log(_847+": "+msg+(_846?" "+_846.toJson():""));
}
}});
dojo.mixin(curam.tab.TabSessionManager,{SELECTED_TAB_KEY:"curam_selected_tab",SELECTED_TAB_SESSION_KEY:"curam_selected_tab_session"});
return _811;
});
},"dijit/tree/_dndSelector":function(){
define("dijit/tree/_dndSelector",["dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/lang","dojo/mouse","dojo/on","dojo/touch","dojo/_base/window","./_dndContainer"],function(_848,_849,_84a,lang,_84b,on,_84c,win,_84d){
return _84a("dijit.tree._dndSelector",_84d,{constructor:function(){
this.selection={};
this.anchor=null;
this.events.push(on(this.tree.domNode,_84c.press,lang.hitch(this,"onMouseDown")),on(this.tree.domNode,_84c.release,lang.hitch(this,"onMouseUp")),on(this.tree.domNode,_84c.move,lang.hitch(this,"onMouseMove")));
},singular:false,getSelectedTreeNodes:function(){
var _84e=[],sel=this.selection;
for(var i in sel){
_84e.push(sel[i]);
}
return _84e;
},selectNone:function(){
this.setSelection([]);
return this;
},destroy:function(){
this.inherited(arguments);
this.selection=this.anchor=null;
},addTreeNode:function(node,_84f){
this.setSelection(this.getSelectedTreeNodes().concat([node]));
if(_84f){
this.anchor=node;
}
return node;
},removeTreeNode:function(node){
this.setSelection(this._setDifference(this.getSelectedTreeNodes(),[node]));
return node;
},isTreeNodeSelected:function(node){
return node.id&&!!this.selection[node.id];
},setSelection:function(_850){
var _851=this.getSelectedTreeNodes();
_848.forEach(this._setDifference(_851,_850),lang.hitch(this,function(node){
node.setSelected(false);
if(this.anchor==node){
delete this.anchor;
}
delete this.selection[node.id];
}));
_848.forEach(this._setDifference(_850,_851),lang.hitch(this,function(node){
node.setSelected(true);
this.selection[node.id]=node;
}));
this._updateSelectionProperties();
},_setDifference:function(xs,ys){
_848.forEach(ys,function(y){
y.__exclude__=true;
});
var ret=_848.filter(xs,function(x){
return !x.__exclude__;
});
_848.forEach(ys,function(y){
delete y["__exclude__"];
});
return ret;
},_updateSelectionProperties:function(){
var _852=this.getSelectedTreeNodes();
var _853=[],_854=[];
_848.forEach(_852,function(node){
_854.push(node);
_853.push(node.getTreePath());
});
var _855=_848.map(_854,function(node){
return node.item;
});
this.tree._set("paths",_853);
this.tree._set("path",_853[0]||[]);
this.tree._set("selectedNodes",_854);
this.tree._set("selectedNode",_854[0]||null);
this.tree._set("selectedItems",_855);
this.tree._set("selectedItem",_855[0]||null);
},onMouseDown:function(e){
if(!this.current||this.tree.isExpandoNode(e.target,this.current)){
return;
}
if(!_84b.isLeft(e)){
return;
}
e.preventDefault();
var _856=this.current,copy=_849.isCopyKey(e),id=_856.id;
if(!this.singular&&!e.shiftKey&&this.selection[id]){
this._doDeselect=true;
return;
}else{
this._doDeselect=false;
}
this.userSelect(_856,copy,e.shiftKey);
},onMouseUp:function(e){
if(!this._doDeselect){
return;
}
this._doDeselect=false;
this.userSelect(this.current,_849.isCopyKey(e),e.shiftKey);
},onMouseMove:function(){
this._doDeselect=false;
},_compareNodes:function(n1,n2){
if(n1===n2){
return 0;
}
if("sourceIndex" in document.documentElement){
return n1.sourceIndex-n2.sourceIndex;
}else{
if("compareDocumentPosition" in document.documentElement){
return n1.compareDocumentPosition(n2)&2?1:-1;
}else{
if(document.createRange){
var r1=doc.createRange();
r1.setStartBefore(n1);
var r2=doc.createRange();
r2.setStartBefore(n2);
return r1.compareBoundaryPoints(r1.END_TO_END,r2);
}else{
throw Error("dijit.tree._compareNodes don't know how to compare two different nodes in this browser");
}
}
}
},userSelect:function(node,_857,_858){
if(this.singular){
if(this.anchor==node&&_857){
this.selectNone();
}else{
this.setSelection([node]);
this.anchor=node;
}
}else{
if(_858&&this.anchor){
var cr=this._compareNodes(this.anchor.rowNode,node.rowNode),_859,end,_85a=this.anchor;
if(cr<0){
_859=_85a;
end=node;
}else{
_859=node;
end=_85a;
}
var _85b=[];
while(_859!=end){
_85b.push(_859);
_859=this.tree._getNextNode(_859);
}
_85b.push(end);
this.setSelection(_85b);
}else{
if(this.selection[node.id]&&_857){
this.removeTreeNode(node);
}else{
if(_857){
this.addTreeNode(node,true);
}else{
this.setSelection([node]);
this.anchor=node;
}
}
}
}
},getItem:function(key){
var _85c=this.selection[key];
return {data:_85c,type:["treeNode"]};
},forInSelectedItems:function(f,o){
o=o||win.global;
for(var id in this.selection){
f.call(o,this.getItem(id),id,this);
}
}});
});
},"dijit/_OnDijitClickMixin":function(){
define("dijit/_OnDijitClickMixin",["dojo/on","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(on,_85d,keys,_85e,has,_85f,win){
var _860=null;
if(has("ie")){
(function(){
var _861=function(evt){
_860=evt.srcElement;
};
win.doc.attachEvent("onkeydown",_861);
_85f.addOnWindowUnload(function(){
win.doc.detachEvent("onkeydown",_861);
});
})();
}else{
win.doc.addEventListener("keydown",function(evt){
_860=evt.target;
},true);
}
var _862=function(node,_863){
if(/input|button/i.test(node.nodeName)){
return on(node,"click",_863);
}else{
function _864(e){
return (e.keyCode==keys.ENTER||e.keyCode==keys.SPACE)&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey;
};
var _865=[on(node,"keypress",function(e){
if(_864(e)){
_860=e.target;
e.preventDefault();
}
}),on(node,"keyup",function(e){
if(_864(e)&&e.target==_860){
_860=null;
_863.call(this,e);
}
}),on(node,"click",function(e){
_863.call(this,e);
})];
return {remove:function(){
_85d.forEach(_865,function(h){
h.remove();
});
}};
}
};
return _85e("dijit._OnDijitClickMixin",null,{connect:function(obj,_866,_867){
return this.inherited(arguments,[obj,_866=="ondijitclick"?_862:_866,_867]);
}});
});
},"curam/pagination":function(){
define("curam/pagination",["curam/define","dojo/parser","curam/pagination/ControlPanel","curam/pagination/StateController","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _868=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.pagination",{defaultPageSize:15,threshold:15,listModels:{},ROW_COUNT_CLASS_NAME:"numRows-",ESC_SCRIPT_START:"<!--@pg@",ESC_SCRIPT_END:"@pg@-->",localizedStrings:{firstPage_btn:"|<",firstPage_title:"$not-localized$ First page",prevPage_btn:"<",prevPage_title:"$not-localized$ Previous page",nextPage_btn:">",nextPage_title:"$not-localized$ Next page",lastPage_btn:">|",lastPage_title:"$not-localized$ Last page",pageSize_title:"$not-localized$ Page size",pagination_info:"$not-localized$ Displaying rows %s to %s out of %s",page_title:"Go to page"},addPagination:function(_869,_86a){
var _86b=_869.getRowCount();
if(_86b<=curam.pagination.threshold){
_869.showRange(1,_86b);
return;
}
var _86c=_869.getId();
curam.debug.log("curam.pagination.addPagination: listId: ",_86c);
if(curam.pagination.listModels[_86c]){
throw "Pagination on this list has already been initialized: "+_86c;
}
curam.pagination.listModels[_86c]=_869;
curam.debug.log("curam.pagination.listModels : ",curam.pagination.listModels);
var gui=new curam.pagination.ControlPanel(_86a);
var _86d=new curam.pagination.StateController(_869,gui);
_869._controller=_86d;
dojo.subscribe("/curam/list/toBeSorted",this,function(_86e){
curam.debug.log(_868.getProperty("curam.omega3-util.received")+" /curam/list/toBeSorted "+_868.getProperty("curam.omega3-util.for")+":",_86e);
curam.pagination.unpackAll(curam.pagination.listModels[_86e]);
});
dojo.subscribe("/curam/list/sorted",this,function(_86f){
curam.debug.log(_868.getProperty("curam.omega3-util.received")+" /curam/list/sorted "+_868.getProperty("curam.omega3-util.for")+":",_86f);
curam.pagination.paginatedListSorted(curam.pagination.listModels[_86f]);
});
_86d.gotoFirst();
},paginatedListSorted:function(_870){
_870._controller.reset();
},unpackRows:function(_871){
var _872=_871.innerHTML;
var _873=dojo.hasClass(_871,"has-row-actions");
if(_873){
_872=_872.replace(new RegExp(curam.pagination.ESC_SCRIPT_START,"g"),"<script type=\"text/javascript\">");
_872=_872.replace(new RegExp(curam.pagination.ESC_SCRIPT_END,"g"),"</script>");
}
var _874=dojo._toDom(_872);
if(_873){
dojo.query("script",_874).forEach(function(s){
eval(s.innerHTML);
});
dojo.parser.parse(_874);
}
dojo.place(_874,_871,"replace");
},unpackAll:function(_875){
_875._controller.gotoLast();
},readListContent:function(_876){
return dojo.query("tbody > *",_876).filter(function(n){
return typeof (n.tagName)!="undefined"&&(n.tagName=="TR"||(n.tagName=="SCRIPT"&&dojo.attr(n,"type")=="list-row-container"));
});
},getNumRowsInBlock:function(_877){
var _878=dojo.filter(_877.className.split(" "),function(cn){
return cn.indexOf(curam.pagination.ROW_COUNT_CLASS_NAME)==0;
});
return parseInt(_878[0].split(curam.pagination.ROW_COUNT_CLASS_NAME)[1]);
}});
return curam.pagination;
});
},"url:curam/layout/resources/Dialog.html":"<div class=\"dijitDialog\" role=\"alertdialog\" aria-labelledby=\"${id}_title\">\r\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\r\n\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span>\r\n\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" aria-label=\"${closeModalText}\" tabIndex=\"0\" onKeyDown=\"curam.util.isShiftTab(event)\">\r\n\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\">${closeModalText}</span>\r\n\t</span>\r\n  <span id=\"${id}_prompt\" class=\"hidden\" data-dojo-attach-point=\"promptText\">${modalPromptText}</span>\r\n\t</div>\r\n\t\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\r\n</div>\r\n","url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n","dijit/layout/StackController":function(){
define("dijit/layout/StackController",["dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/_base/sniff","../focus","../registry","../_Widget","../_TemplatedMixin","../_Container","../form/ToggleButton","dojo/i18n!../nls/common"],function(_879,_87a,_87b,keys,lang,has,_87c,_87d,_87e,_87f,_880,_881){
var _882=_87a("dijit.layout._StackButton",_881,{tabIndex:"-1",closeButton:false,_setCheckedAttr:function(_883,_884){
this.inherited(arguments);
this.focusNode.removeAttribute("aria-pressed");
},buildRendering:function(evt){
this.inherited(arguments);
(this.focusNode||this.domNode).setAttribute("role","tab");
},onClick:function(){
_87c.focus(this.focusNode);
},onClickCloseButton:function(evt){
evt.stopPropagation();
}});
var _885=_87a("dijit.layout.StackController",[_87e,_87f,_880],{baseClass:"dijitStackController",templateString:"<span role='tablist' data-dojo-attach-event='onkeypress'></span>",containerId:"",buttonWidget:_882,constructor:function(){
this.pane2button={};
this.pane2connects={};
this.pane2watches={};
},postCreate:function(){
this.inherited(arguments);
this.subscribe(this.containerId+"-startup","onStartup");
this.subscribe(this.containerId+"-addChild","onAddChild");
this.subscribe(this.containerId+"-removeChild","onRemoveChild");
this.subscribe(this.containerId+"-selectChild","onSelectChild");
this.subscribe(this.containerId+"-containerKeyPress","onContainerKeyPress");
},onStartup:function(info){
_879.forEach(info.children,this.onAddChild,this);
if(info.selected){
this.onSelectChild(info.selected);
}
},destroy:function(){
for(var pane in this.pane2button){
this.onRemoveChild(_87d.byId(pane));
}
this.inherited(arguments);
},onAddChild:function(page,_886){
var cls=lang.isString(this.buttonWidget)?lang.getObject(this.buttonWidget):this.buttonWidget;
var _887=new cls({id:this.id+"_"+page.id,label:page.title,dir:page.dir,lang:page.lang,textDir:page.textDir,showLabel:page.showTitle,iconClass:page.iconClass,closeButton:page.closable,title:page.tooltip});
_887.focusNode.setAttribute("aria-selected","false");
var _888=["title","showTitle","iconClass","closable","tooltip"],_889=["label","showLabel","iconClass","closeButton","title"];
this.pane2watches[page.id]=_879.map(_888,function(_88a,idx){
return page.watch(_88a,function(name,_88b,_88c){
_887.set(_889[idx],_88c);
});
});
this.pane2connects[page.id]=[this.connect(_887,"onClick",lang.hitch(this,"onButtonClick",page)),this.connect(_887,"onClickCloseButton",lang.hitch(this,"onCloseButtonClick",page))];
this.addChild(_887,_886);
this.pane2button[page.id]=_887;
page.controlButton=_887;
if(!this._currentChild){
_887.focusNode.setAttribute("tabIndex","0");
_887.focusNode.setAttribute("aria-selected","true");
this._currentChild=page;
}
if(!this.isLeftToRight()&&has("ie")&&this._rectifyRtlTabList){
this._rectifyRtlTabList();
}
},onRemoveChild:function(page){
if(this._currentChild===page){
this._currentChild=null;
}
_879.forEach(this.pane2connects[page.id],lang.hitch(this,"disconnect"));
delete this.pane2connects[page.id];
_879.forEach(this.pane2watches[page.id],function(w){
w.unwatch();
});
delete this.pane2watches[page.id];
var _88d=this.pane2button[page.id];
if(_88d){
this.removeChild(_88d);
delete this.pane2button[page.id];
_88d.destroy();
}
delete page.controlButton;
},onSelectChild:function(page){
if(!page){
return;
}
if(this._currentChild){
var _88e=this.pane2button[this._currentChild.id];
_88e.set("checked",false);
_88e.focusNode.setAttribute("aria-selected","false");
_88e.focusNode.setAttribute("tabIndex","-1");
}
var _88f=this.pane2button[page.id];
_88f.set("checked",true);
_88f.focusNode.setAttribute("aria-selected","true");
this._currentChild=page;
_88f.focusNode.setAttribute("tabIndex","0");
var _890=_87d.byId(this.containerId);
_890.containerNode.setAttribute("aria-labelledby",_88f.id);
},onButtonClick:function(page){
if(this._currentChild.id===page.id){
var _891=this.pane2button[page.id];
_891.set("checked",true);
}
var _892=_87d.byId(this.containerId);
_892.selectChild(page);
},onCloseButtonClick:function(page){
var _893=_87d.byId(this.containerId);
_893.closeChild(page);
if(this._currentChild){
var b=this.pane2button[this._currentChild.id];
if(b){
_87c.focus(b.focusNode||b.domNode);
}
}
},adjacent:function(_894){
if(!this.isLeftToRight()&&(!this.tabPosition||/top|bottom/.test(this.tabPosition))){
_894=!_894;
}
var _895=this.getChildren();
var _896=_879.indexOf(_895,this.pane2button[this._currentChild.id]);
var _897=_894?1:_895.length-1;
return _895[(_896+_897)%_895.length];
},onkeypress:function(e){
if(this.disabled||e.altKey){
return;
}
var _898=null;
if(e.ctrlKey||!e._djpage){
switch(e.charOrCode){
case keys.LEFT_ARROW:
case keys.UP_ARROW:
if(!e._djpage){
_898=false;
}
break;
case keys.PAGE_UP:
if(e.ctrlKey){
_898=false;
}
break;
case keys.RIGHT_ARROW:
case keys.DOWN_ARROW:
if(!e._djpage){
_898=true;
}
break;
case keys.PAGE_DOWN:
if(e.ctrlKey){
_898=true;
}
break;
case keys.HOME:
case keys.END:
var _899=this.getChildren();
if(_899&&_899.length){
_899[e.charOrCode==keys.HOME?0:_899.length-1].onClick();
}
_87b.stop(e);
break;
case keys.DELETE:
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
_87b.stop(e);
break;
default:
if(e.ctrlKey){
if(e.charOrCode===keys.TAB){
this.adjacent(!e.shiftKey).onClick();
_87b.stop(e);
}else{
if(e.charOrCode=="w"){
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
_87b.stop(e);
}
}
}
}
if(_898!==null){
this.adjacent(_898).onClick();
_87b.stop(e);
}
}
},onContainerKeyPress:function(info){
info.e._djpage=info.page;
this.onkeypress(info.e);
}});
_885.StackButton=_882;
return _885;
});
},"dojox/layout/ExpandoPane":function(){
require({cache:{"url:dojox/layout/resources/ExpandoPane.html":"<div class=\"dojoxExpandoPane\">\n\t<div dojoAttachPoint=\"titleWrapper\" class=\"dojoxExpandoTitle\">\n\t\t<div class=\"dojoxExpandoIcon\" dojoAttachPoint=\"iconNode\" dojoAttachEvent=\"onclick:toggle\"><span class=\"a11yNode\">X</span></div>\t\t\t\n\t\t<span class=\"dojoxExpandoTitleNode\" dojoAttachPoint=\"titleNode\">${title}</span>\n\t</div>\n\t<div class=\"dojoxExpandoWrapper\" dojoAttachPoint=\"cwrapper\" dojoAttachEvent=\"ondblclick:_trap\">\n\t\t<div class=\"dojoxExpandoContent\" dojoAttachPoint=\"containerNode\"></div>\n\t</div>\n</div>\n"}});
define("dojox/layout/ExpandoPane",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/declare","dojo/_base/array","dojo/_base/connect","dojo/_base/event","dojo/_base/fx","dojo/dom-style","dojo/dom-class","dojo/dom-geometry","dojo/text!./resources/ExpandoPane.html","dijit/layout/ContentPane","dijit/_TemplatedMixin","dijit/_Contained","dijit/_Container"],function(_89a,lang,_89b,_89c,_89d,_89e,_89f,_8a0,_8a1,_8a2,_8a3,_8a4,_8a5,_8a6,_8a7){
_89a.experimental("dojox.layout.ExpandoPane");
return _89b("dojox.layout.ExpandoPane",[_8a4,_8a5,_8a6,_8a7],{attributeMap:lang.delegate(_8a4.prototype.attributeMap,{title:{node:"titleNode",type:"innerHTML"}}),templateString:_8a3,easeOut:"dojo._DefaultEasing",easeIn:"dojo._DefaultEasing",duration:420,startExpanded:true,previewOpacity:0.75,previewOnDblClick:false,baseClass:"dijitExpandoPane",postCreate:function(){
this.inherited(arguments);
this._animConnects=[];
this._isHorizontal=true;
if(lang.isString(this.easeOut)){
this.easeOut=lang.getObject(this.easeOut);
}
if(lang.isString(this.easeIn)){
this.easeIn=lang.getObject(this.easeIn);
}
var _8a8="",rtl=!this.isLeftToRight();
if(this.region){
switch(this.region){
case "trailing":
case "right":
_8a8=rtl?"Left":"Right";
break;
case "leading":
case "left":
_8a8=rtl?"Right":"Left";
break;
case "top":
_8a8="Top";
break;
case "bottom":
_8a8="Bottom";
break;
}
_8a1.add(this.domNode,"dojoxExpando"+_8a8);
_8a1.add(this.iconNode,"dojoxExpandoIcon"+_8a8);
this._isHorizontal=/top|bottom/.test(this.region);
}
_8a0.set(this.domNode,{overflow:"hidden",padding:0});
this.connect(this.domNode,"ondblclick",this.previewOnDblClick?"preview":"toggle");
if(this.previewOnDblClick){
this.connect(this.getParent(),"_layoutChildren",lang.hitch(this,function(){
this._isonlypreview=false;
}));
}
},_startupSizes:function(){
this._container=this.getParent();
this._closedSize=this._titleHeight=_8a2.getMarginBox(this.titleWrapper).h;
if(this.splitter){
var myid=this.id;
_89c.forEach(dijit.registry.toArray(),function(w){
if(w&&w.child&&w.child.id==myid){
this.connect(w,"_stopDrag","_afterResize");
}
},this);
}
this._currentSize=_8a2.getContentBox(this.domNode);
this._showSize=this._currentSize[(this._isHorizontal?"h":"w")];
this._setupAnims();
if(this.startExpanded){
this._showing=true;
}else{
this._showing=false;
this._hideWrapper();
this._hideAnim.gotoPercent(99,true);
}
this._hasSizes=true;
},_afterResize:function(e){
var tmp=this._currentSize;
this._currentSize=_8a2.getMarginBox(this.domNode);
var n=this._currentSize[(this._isHorizontal?"h":"w")];
if(n>this._titleHeight){
if(!this._showing){
this._showing=!this._showing;
this._showEnd();
}
this._showSize=n;
this._setupAnims();
}else{
this._showSize=tmp[(this._isHorizontal?"h":"w")];
this._showing=false;
this._hideWrapper();
this._hideAnim.gotoPercent(89,true);
}
},_setupAnims:function(){
_89c.forEach(this._animConnects,_89d.disconnect);
var _8a9={node:this.domNode,duration:this.duration},_8aa=this._isHorizontal,_8ab={},_8ac={},_8ad=_8aa?"height":"width";
_8ab[_8ad]={end:this._showSize};
_8ac[_8ad]={end:this._closedSize};
this._showAnim=_89f.animateProperty(lang.mixin(_8a9,{easing:this.easeIn,properties:_8ab}));
this._hideAnim=_89f.animateProperty(lang.mixin(_8a9,{easing:this.easeOut,properties:_8ac}));
this._animConnects=[_89d.connect(this._showAnim,"onEnd",this,"_showEnd"),_89d.connect(this._hideAnim,"onEnd",this,"_hideEnd")];
},preview:function(){
if(!this._showing){
this._isonlypreview=!this._isonlypreview;
}
this.toggle();
},toggle:function(){
if(this._showing){
this._hideWrapper();
this._showAnim&&this._showAnim.stop();
this._hideAnim.play();
}else{
this._hideAnim&&this._hideAnim.stop();
this._showAnim.play();
}
this._showing=!this._showing;
},_hideWrapper:function(){
_8a1.add(this.domNode,"dojoxExpandoClosed");
_8a0.set(this.cwrapper,{visibility:"hidden",opacity:"0",overflow:"hidden"});
},_showEnd:function(){
_8a0.set(this.cwrapper,{opacity:0,visibility:"visible"});
_89f.anim(this.cwrapper,{opacity:this._isonlypreview?this.previewOpacity:1},227);
_8a1.remove(this.domNode,"dojoxExpandoClosed");
if(!this._isonlypreview){
setTimeout(lang.hitch(this._container,"layout"),15);
}else{
this._previewShowing=true;
this.resize();
}
},_hideEnd:function(){
if(!this._isonlypreview){
setTimeout(lang.hitch(this._container,"layout"),25);
}else{
this._previewShowing=false;
}
this._isonlypreview=false;
},resize:function(_8ae){
if(!this._hasSizes){
this._startupSizes(_8ae);
}
var _8af=_8a2.getMarginBox(this.domNode);
this._contentBox={w:_8ae&&"w" in _8ae?_8ae.w:_8af.w,h:(_8ae&&"h" in _8ae?_8ae.h:_8af.h)-this._titleHeight};
_8a0.set(this.containerNode,"height",this._contentBox.h+"px");
if(_8ae){
_8a2.setMarginBox(this.domNode,_8ae);
}
this._layoutChildren();
},_trap:function(e){
_89e.stop(e);
}});
});
},"curam/layout/ExpandoPane":function(){
require({cache:{"url:curam/layout/resources/ExpandoPane.html":"<div class=\"dojoxExpandoPane dojoxExpando${orient} ${startupCls}\">\r\n\t<div dojoAttachPoint=\"titleWrapper\" class=\"dojoxExpandoTitle\">\r\n\t\t<div class=\"dojoxExpandoIcon dojoxExpandoIcon${orient}\" role=\"button\" aria-label=\"${expandIconAlt}\" tabIndex=\"0\" dojoAttachPoint=\"iconNode\" dojoAttachEvent=\"onclick:toggle,onkeypress: enterCheck\"></div>\r\n\t\t<span class=\"dojoxExpandoTitleNode\" dojoAttachPoint=\"titleNode\" title=\"${title}\">${title}</span>\r\n\t</div>\r\n\t<div class=\"dojoxExpandoWrapper\" dojoAttachPoint=\"cwrapper\" dojoAttachEvent=\"ondblclick:_trap\">\r\n\t\t<div class=\"dojoxExpandoContent\" dojoAttachPoint=\"containerNode\"></div>\r\n\t</div>\r\n</div>\r\n"}});
define("curam/layout/ExpandoPane",["curam/smartPanel","dojo/_base/lang","dojo/_base/array","dojo/dom-geometry","dojo/dom-style","dojo/_base/fx","dojo/dom-class","dojo/text!curam/layout/resources/ExpandoPane.html","dojox/layout/ExpandoPane","curam/util/ResourceBundle"],function(_8b0,lang,_8b1,_8b2,_8b3,_8b4,_8b5,_8b6){
dojo.requireLocalization("curam.application","Debug");
var _8b7=new curam.util.ResourceBundle("Debug");
var _8b8=dojo.declare("curam.layout.ExpandoPane",dojox.layout.ExpandoPane,{templateString:_8b6,startupCls:"",expandIconAlt:"",postMixInProperties:function(){
var _8b9="",rtl=!this.isLeftToRight();
if(this.region){
switch(this.region){
case "trailing":
case "right":
_8b9=rtl?"Left":"Right";
break;
case "leading":
case "left":
_8b9=rtl?"Right":"Left";
break;
case "top":
_8b9="Top";
break;
case "bottom":
_8b9="Bottom";
break;
}
this.orient=_8b9;
}
if(!this.startExpanded){
this.startupCls="dojoxExpandoClosed";
}
this._openWidth=null;
if(!this.startExpanded){
if(this.srcNodeRef&&this.srcNodeRef.style.width){
this._openWidth=dojo.style(this.srcNodeRef,"width");
var _8ba=this.style;
if(_8ba&&_8ba.toLowerCase().indexOf("width")>-1){
var _8bb=_8ba.split(";");
var pair;
for(var i=0;i<_8bb.length;i++){
if(dojo.trim(_8bb[i]).length==0){
_8bb.splice(i,1);
i--;
}else{
pair=_8bb[i].split(":");
if(dojo.trim(pair[0]).toLowerCase()=="width"){
_8bb.splice(i,1);
i--;
}
}
}
this.style=_8bb.length>0?_8bb.join(";")+";":"";
}
}
}
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"ondblclick",this.previewOnDblClick?"preview":"toggle");
if(this.previewOnDblClick){
this.connect(this.getParent(),"_layoutChildren",dojo.hitch(this,function(){
this._isonlypreview=false;
}));
}
},_startupSizes:function(){
this._container=this.getParent();
this._closedSize=this._titleHeight=_8b2.getMarginBoxSimple(this.titleWrapper).h;
curam.debug.log(_8b7.getProperty("curam.layout.ExpandoPane.size")+" "+this._closedSize);
if(this.splitter){
var myid=this.id;
_8b1.forEach(dijit.registry.toArray(),function(w){
if(w&&w.child&&w.child.id==myid){
this.connect(w,"_stopDrag","_afterResize");
}
},this);
}
this._currentSize=_8b2.getContentBox(this.domNode);
if(this._openWidth){
curam.debug.log(_8b7.getProperty("curam.layout.ExpandoPane.changing.size.changing")+"currentSize.w "+_8b7.getProperty("curam.layout.ExpandoPane.changing.size.from")+this._currentSize.w+" "+_8b7.getProperty("curam.layout.ExpandoPane.changing.size.to")+this._openWidth);
this._currentSize.w=this._openWidth;
}
curam.debug.log("this._currentSize = ",this._currentSize);
this._showSize=this._currentSize[(this._isHorizontal?"h":"w")];
this._setupAnims();
if(this.startExpanded){
this._showing=true;
}else{
this._showing=false;
this._hideWrapper();
}
this._hasSizes=true;
},resize:function(_8bc){
if(!this._hasSizes){
this._startupSizes(_8bc);
}
var _8bd=_8b2.getMarginBoxSimple(this.domNode);
this._contentBox={w:_8bc&&"w" in _8bc?_8bc.w:_8bd.w,h:(_8bc&&"h" in _8bc?_8bc.h:_8bd.h)-this._titleHeight};
_8b3.set(this.containerNode,"height",this._contentBox.h+"px");
if(_8bc){
_8b2.setMarginBox(this.domNode,_8bc);
}
this._layoutChildren();
},_afterResize:function(e){
var _8be=dojox.layout.ExpandoPane.prototype._afterResize;
_8be._useMarginBoxSimple=true;
_8be.apply(this,arguments);
delete _8be._useMarginBoxSimple;
},enterCheck:function(evt){
if(evt.keyCode==13){
this.toggle();
dojo.stopEvent(evt);
}
},toggle:function(){
if(!this._showing){
if(dojo.hasClass(this.domNode,"smart-panel")){
_8b0.loadSmartPanelIframe();
}
}
this.inherited(arguments);
if(dojo.query(".dijitExpandoPane .dijitAccordionTitle")){
var _8bf;
dojo.query(".dijitExpandoPane .dijitAccordionTitle").forEach(function(node){
_8bf=node;
});
dojo.addClass(_8bf,"dijitAccordionTitle-last");
}
},_hideWrapper:function(){
_8b5.add(this.domNode,"dojoxExpandoClosed");
_8b3.set(this.cwrapper,{opacity:"0"});
},_showEnd:function(){
_8b3.set(this.cwrapper,{opacity:0});
_8b4.anim(this.cwrapper,{opacity:this._isonlypreview?this.previewOpacity:1},227);
_8b5.remove(this.domNode,"dojoxExpandoClosed");
if(!this._isonlypreview){
setTimeout(lang.hitch(this._container,"layout"),15);
}else{
this._previewShowing=true;
this.resize();
}
}});
return _8b8;
});
},"dijit/form/_FormValueMixin":function(){
define("dijit/form/_FormValueMixin",["dojo/_base/declare","dojo/dom-attr","dojo/keys","dojo/_base/sniff","./_FormWidgetMixin"],function(_8c0,_8c1,keys,has,_8c2){
return _8c0("dijit.form._FormValueMixin",_8c2,{readOnly:false,_setReadOnlyAttr:function(_8c3){
_8c1.set(this.focusNode,"readOnly",_8c3);
this._set("readOnly",_8c3);
},postCreate:function(){
this.inherited(arguments);
if(has("ie")){
this.connect(this.focusNode||this.domNode,"onkeydown",this._onKeyDown);
}
if(this._resetValue===undefined){
this._lastValueReported=this._resetValue=this.value;
}
},_setValueAttr:function(_8c4,_8c5){
this._handleOnChange(_8c4,_8c5);
},_handleOnChange:function(_8c6,_8c7){
this._set("value",_8c6);
this.inherited(arguments);
},undo:function(){
this._setValueAttr(this._lastValueReported,false);
},reset:function(){
this._hasBeenBlurred=false;
this._setValueAttr(this._resetValue,true);
},_onKeyDown:function(e){
if(e.keyCode==keys.ESCAPE&&!(e.ctrlKey||e.altKey||e.metaKey)){
var te;
if(has("ie")<9||(has("ie")&&has("quirks"))){
e.preventDefault();
te=document.createEventObject();
te.keyCode=keys.ESCAPE;
te.shiftKey=e.shiftKey;
e.srcElement.fireEvent("onkeypress",te);
}
}
}});
});
},"dojo/date/stamp":function(){
define("dojo/date/stamp",["../_base/kernel","../_base/lang","../_base/array"],function(dojo,lang,_8c8){
lang.getObject("date.stamp",true,dojo);
dojo.date.stamp.fromISOString=function(_8c9,_8ca){
if(!dojo.date.stamp._isoRegExp){
dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
}
var _8cb=dojo.date.stamp._isoRegExp.exec(_8c9),_8cc=null;
if(_8cb){
_8cb.shift();
if(_8cb[1]){
_8cb[1]--;
}
if(_8cb[6]){
_8cb[6]*=1000;
}
if(_8ca){
_8ca=new Date(_8ca);
_8c8.forEach(_8c8.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(prop){
return _8ca["get"+prop]();
}),function(_8cd,_8ce){
_8cb[_8ce]=_8cb[_8ce]||_8cd;
});
}
_8cc=new Date(_8cb[0]||1970,_8cb[1]||0,_8cb[2]||1,_8cb[3]||0,_8cb[4]||0,_8cb[5]||0,_8cb[6]||0);
if(_8cb[0]<100){
_8cc.setFullYear(_8cb[0]||1970);
}
var _8cf=0,_8d0=_8cb[7]&&_8cb[7].charAt(0);
if(_8d0!="Z"){
_8cf=((_8cb[8]||0)*60)+(Number(_8cb[9])||0);
if(_8d0!="-"){
_8cf*=-1;
}
}
if(_8d0){
_8cf-=_8cc.getTimezoneOffset();
}
if(_8cf){
_8cc.setTime(_8cc.getTime()+_8cf*60000);
}
}
return _8cc;
};
dojo.date.stamp.toISOString=function(_8d1,_8d2){
var _8d3=function(n){
return (n<10)?"0"+n:n;
};
_8d2=_8d2||{};
var _8d4=[],_8d5=_8d2.zulu?"getUTC":"get",date="";
if(_8d2.selector!="time"){
var year=_8d1[_8d5+"FullYear"]();
date=["0000".substr((year+"").length)+year,_8d3(_8d1[_8d5+"Month"]()+1),_8d3(_8d1[_8d5+"Date"]())].join("-");
}
_8d4.push(date);
if(_8d2.selector!="date"){
var time=[_8d3(_8d1[_8d5+"Hours"]()),_8d3(_8d1[_8d5+"Minutes"]()),_8d3(_8d1[_8d5+"Seconds"]())].join(":");
var _8d6=_8d1[_8d5+"Milliseconds"]();
if(_8d2.milliseconds){
time+="."+(_8d6<100?"0":"")+_8d3(_8d6);
}
if(_8d2.zulu){
time+="Z";
}else{
if(_8d2.selector!="time"){
var _8d7=_8d1.getTimezoneOffset();
var _8d8=Math.abs(_8d7);
time+=(_8d7>0?"-":"+")+_8d3(Math.floor(_8d8/60))+":"+_8d3(_8d8%60);
}
}
_8d4.push(time);
}
return _8d4.join("T");
};
return dojo.date.stamp;
});
},"dijit/layout/AccordionPane":function(){
define("dijit/layout/AccordionPane",["dojo/_base/declare","dojo/_base/kernel","./ContentPane"],function(_8d9,_8da,_8db){
return _8d9("dijit.layout.AccordionPane",_8db,{constructor:function(){
_8da.deprecated("dijit.layout.AccordionPane deprecated, use ContentPane instead","","2.0");
},onSelected:function(){
}});
});
},"curam/omega3-util":function(){
define("curam/omega3-util",["dojo/dom-geometry","curam/util","curam/html","curam/GlobalVars","cm/_base/_dom","cm/_base/_form","curam/util/RuntimeContext","curam/util/ResourceBundle"],function(_8dc){
dojo.requireLocalization("curam.application","Debug");
var _8dd=new curam.util.ResourceBundle("Debug");
var _8de={getAnchorPosition:function(_8df){
var _8e0=false;
var _8e1=new Object();
var x=0;
var y=0;
x=AnchorPosition_getPageOffsetLeft(document.getElementById(_8df));
y=AnchorPosition_getPageOffsetTop(document.getElementById(_8df));
_8e1.x=x;
_8e1.y=y;
return _8e1;
},getAnchorWindowPosition:function(_8e2){
var _8e3=getAnchorPosition(_8e2);
var x=0;
var y=0;
if(isNaN(window.screenX)){
x=_8e3.x-document.body.scrollLeft+window.screenLeft;
y=_8e3.y-document.body.scrollTop+window.screenTop;
}else{
x=_8e3.x+window.screenX+(window.outerWidth-window.innerWidth)-window.pageXOffset;
y=_8e3.y+window.screenY+(window.outerHeight-24-window.innerHeight)-window.pageYOffset;
}
_8e3.x=x;
_8e3.y=y;
return _8e3;
},AnchorPosition_getPageOffsetLeft:function(el){
var ol=el.offsetLeft;
while((el=el.offsetParent)!=null){
ol+=el.offsetLeft;
}
return ol;
},AnchorPosition_getWindowOffsetLeft:function(el){
var _8e4=document.body.scrollLeft;
return AnchorPosition_getPageOffsetLeft(el)-_8e4;
},AnchorPosition_getPageOffsetTop:function(el){
var ot=el.offsetTop;
while((el=el.offsetParent)!=null){
ot+=el.offsetTop;
}
return ot;
},AnchorPosition_getWindowOffsetTop:function(el){
var _8e5=document.body.scrollTop;
return AnchorPosition_getPageOffsetTop(el)-_8e5;
},PopupMapping:function(name,_8e6){
this.name=name;
this.targetWidgetID=_8e6;
},openPopupFromCTCode:function(_8e7,_8e8,_8e9,_8ea){
var list=_8e9.parentNode.parentNode.parentNode.childNodes[0];
var _8eb=dijit.byNode(list);
if(_8eb){
var _8ec=_8eb.getValue();
}else{
var list=_8e9.parentNode.parentNode.parentNode.childNodes[1];
var _8ec=list.options[list.selectedIndex].value;
}
if(_8ec!=""){
if(curam.popupCTCodeMappings[_8ec]){
openPopupFromDomain(_8e7,_8e8,curam.popupCTCodeMappings[_8ec],_8ea,false);
}
}
},openPopupFromCTCodeNoDomain:function(_8ed,_8ee,_8ef,_8f0){
var list=_8ef.parentNode.parentNode.parentNode.childNodes[2];
var _8f1=dijit.byNode(list);
var _8f2;
var _8f3;
var _8f4;
var _8f5;
var _8f6;
var _8f7;
var _8f8;
var _8f9;
if(_8f1){
var _8fa=_8f1.getValue();
}else{
var list=_8ef.parentNode.parentNode.parentNode.childNodes[1];
var _8fa=list.options[list.selectedIndex].value;
}
if(_8fa!=""){
if(curam.popupCTCodeMappings[_8fa]){
_8f2=getPopupProperties(curam.popupCTCodeMappings[_8fa]);
_8f3=_8f2.pageID;
_8f4=_8f2.createPageID;
_8f5=_8f2.height;
_8f6=_8f2.width;
_8f7=_8f2.scrollBars;
_8f8=_8f2.insertMode;
_8f9=_8f2.codeTableCode;
var _8fb=_8f2.uimType;
if(_8fb=="DYNAMIC"){
openPopup(_8ed,_8ee,null,_8f3,_8f4,_8f6,_8f5,_8f7,_8f8,null,null,_8f0,false);
}
}
}
},openPopupFromDomain:function(_8fc,_8fd,_8fe,_8ff,_900){
var _901=getPopupProperties(_8fe);
var _902=_901.pageID;
var _903=_901.createPageID;
var _904=_901.height;
var _905=_901.width;
var _906=_901.scrollBars;
var _907=_901.insertMode;
var _908=_901.codeTableCode;
openPopup(_8fc,_8fd,_8fe,_902,_903,_905,_904,_906,_907,_908,_8ff,_900);
},openPopupNoDomain:function(_909,_90a,_90b,_90c,_90d,_90e,_90f,_910,_911,_912){
openPopup(_909,_90a,null,_90b,_90c,_90d,_90e,_90f,_910,null,null,_911,_912);
},openPopup:function(_913,_914,_915,_916,_917,_918,_919,_91a,_91b,_91c,_91d,_91e){
setMappingsLoaded(_914);
var _91f=getAnchorWindowPosition(_913);
_91f.y=_91f.y+25;
if(_91f.x+_918>screen.availWidth){
_91f.x-=(_91f.x+_918)-screen.availWidth;
_91f.x-=15;
}
if(_91f.y+_919>screen.availHeight){
_91f.y-=(_91f.y+_919)-screen.availHeight;
_91f.y-=35;
}
if(curam.popupWindow&&!curam.popupWindow.closed){
curam.popupWindow.close();
}
curam.currentPopupInstanceName=_914;
curam.currentPopupProps=setPopupProperties(_916,_915,_91c,_918,_919,_91a,_917,_91b,null);
var ctx=jsScreenContext;
ctx.addContextBits("POPUP");
ctx.clear("TAB|TREE|AGENDA");
var url="";
if(_91e==true){
url=_917;
}else{
url=_916;
}
if(_91d&&_91d.length>0){
url=url+"?"+_91d;
url+="&";
}else{
url+="?";
}
url+=ctx.toRequestString();
if(window.curam.util.showModalDialog){
curam.util.showModalDialog(url,null,_918,_919,_91f.x,_91f.y,false,null,null);
}else{
curam.popupWindow=window.open(url,createWindowName(curam.currentPopupInstanceName),getPopupAttributes(_918,_919,_91a)+"screenX="+_91f.x+",left="+_91f.x+",screenY="+_91f.y+","+"top="+_91f.y);
}
},addPopupMapping:function(_920,_921,_922){
var _923=curam.popupMappingRepository;
if(curam.popupMappingLoaded[_920]==true){
return;
}
if(_923[_920]==null){
_923[_920]=[];
_923[_920][_921]=[];
_923[_920][_921][0]=_922;
}else{
if(_923[_920][_921]==null){
_923[_920][_921]=[];
_923[_920][_921][0]=_922;
}else{
var _924=_923[_920][_921].length;
_923[_920][_921][_924]=_922;
}
}
},setMappingsLoaded:function(_925){
curam.popupMappingLoaded[_925]=true;
},executeMapping:function(_926,_927){
var pmr=curam.popupMappingRepository;
var cpin=curam.currentPopupInstanceName;
if(!pmr||!pmr[cpin]||pmr[cpin][_926]==null){
return;
}
for(var i=0;i<pmr[cpin][_926].length;i++){
var _928=null;
_928=dojo.byId(pmr[cpin][_926][i]);
if(_928.tagName=="SPAN"){
_928.innerHTML=curam.html.splitWithTag(_927,null,null,escapeXML);
_928.setAttribute("title",_927);
_928._reposition=_928._reposition||dojo.query("div",_928).length>0;
if(_928._reposition){
var _929=cm.nextSibling(_928,"span");
if(_929){
var _92a=_8dc.getMarginBoxSimple(_928).h;
var _92b=_8dc.getMarginBoxSimple(_929).h;
dojo.style(_929,"position","relative");
var diff=_92a-_92b-((dojo.isIE&&dojo.isIE<9)?2:0);
dojo.style(_929,"bottom","-"+(diff)+"px");
}
}
}else{
if(_928.tagName=="TEXTAREA"){
if(curam.currentPopupProps.insertMode=="insert"){
insertAtCursor(_928,escapeXML(_927));
}else{
if(curam.currentPopupProps.insertMode=="append"){
_928.value+=_927;
}else{
_928.value=_927;
}
}
}else{
if(dijit.byId(pmr[cpin][_926][i])){
dijit.byId(pmr[cpin][_926][i]).set("value",_927);
_928.value=_927;
}else{
_928.value=_927;
}
}
}
}
},insertAtCursor:function(_92c,_92d){
if(document.selection){
_92c.focus();
sel=document.selection.createRange();
sel.text=_92d;
}else{
if(_92c.selectionStart||_92c.selectionStart=="0"){
var _92e=_92c.selectionStart;
var _92f=_92c.selectionEnd;
_92c.value=_92c.value.substring(0,_92e)+_92d+_92c.value.substring(_92f,_92c.value.length);
}else{
_92c.value+=_92d;
}
}
},escapeXML:function(_930){
return _930.replace(/&/g,"&#38;").replace(/</g,"&#60;").replace(/>/g,"&#62;").replace(/"/g,"&#34;").replace(/'/g,"&#39;");
},executeOpenerMapping:function(_931,_932){
var _933=undefined;
if(curam.util.isModalWindow()){
_933=curam.dialog.getParentWindow(window);
}else{
if(window.dialogArguments){
_933=window.dialogArguments[0];
}
}
if((_933)&&(!_933.closed)){
_933.executeMapping(_931,_932);
}else{
curam.debug.log("curam.omega3-util.executeOpenerMapping:, "+_8dd.getProperty("curam.omega3-util.parent"));
}
},storePopupInputFromWidget:function(name,_934){
var _935=null;
_935=dojo.byId(_934).value;
if(_935){
curam.popupInputs[name]=_935;
}else{
curam.popupInputs[name]="";
}
},getPopupInput:function(name){
if(curam.popupInputs[name]!=null){
return curam.popupInputs[name];
}else{
return "";
}
},PopupProperties:function(_936,_937,_938,_939,_93a,_93b,_93c){
this.width=_937;
this.height=_938;
this.scrollBars=_939;
this.pageID=_936;
this.createPageID=_93a;
if(_93b==null){
this.insertMode="overwrite";
}else{
this.insertMode=_93b;
}
if(_93c!=null){
this.uimType=_93c;
}
},setPopupProperties:function(_93d,_93e,_93f,_940,_941,_942,_943,_944,_945){
if(_93f){
curam.popupCTCodeMappings[_93f]=_93e;
}
curam.popupPropertiesRepository[_93e]=new PopupProperties(_93d,_940,_941,_942,_943,_944,_945);
},getPopupAttributes:function(_946,_947,_948){
var _949="width="+_946+","+"height="+_947+","+"scrollbars="+(_948?"yes":"no")+",";
return _949;
},getPopupAttributesIEModal:function(_94a){
var _94b="dialogWidth:"+curam.popupPropertiesRepository[_94a].width+"px;"+"dialogHeight:"+curam.popupPropertiesRepository[_94a].height+"px;";
return _94b;
},trimFileExtension:function(_94c){
var _94d=_94c.lastIndexOf("/")+1;
if(_94d==-1){
_94d=_94c.lastIndexOf("\\")+1;
}
if(_94d==-1){
_94d=0;
}
return _94c.substring(_94d,_94c.lastIndexOf("."));
},getPopupProperties:function(_94e){
return curam.popupPropertiesRepository[_94e];
},validateDate:function(_94f){
require(["curam/validation"]);
return curam.validation.validateDate(_94f).valid;
},addStartDate:function(_950){
require(["curam/validation"]);
var _951=dojo.byId("startDate").value;
var _952=curam.validation.validateDate(_951);
if(_952.valid){
var _953=dojo.byId("gotoDate");
_953.href=curam.util.replaceUrlParam(_953.href,"startDate",_951);
return true;
}else{
require(["curam/validation/calendar"],function(){
alert(curam.validation.calendar.invalidGotoDateEntered.replace("%s",_951).replace("%s",jsDFs));
});
dojo.stopEvent(_950);
return false;
}
},checkEnter:function(_954){
if(_954.keyCode==13){
if(addStartDate(_954)){
var _955=dojo.byId("gotoDate");
window.location=_955.href;
return true;
}
return false;
}
return true;
},createWindowName:function(_956){
var _957=new String("");
for(var i=0;i<_956.length;i++){
var ch=_956.charAt(i);
if(ch=="$"||ch=="."){
_957+="_";
}else{
_957+=ch;
}
}
return _957;
},clearPopup:function(_958,_959){
var _95a=_958.id.substring(0,_958.id.indexOf("_clear"));
var _95b=_95a+"_value";
var _95c=_95a+"_desc";
var _95d=_95a+"_deschf";
var _95e=dojo.byId(_95b);
if(_95e){
if(_95e.tagName=="INPUT"){
_95e.value="";
}else{
if(_95e.tagName=="TEXTAREA"){
_95e.value="";
}
}
if(_95e.tagName=="SPAN"){
_95e.innerHTML=curam.POPUP_EMPTY_SPAN_VALUE;
}
}
var _95f=dojo.byId(_95c);
if(_95f){
if(_95f.tagName=="INPUT"){
_95f.value="";
}else{
if(_95f.tagName=="TEXTAREA"){
_95f.value="";
}else{
if(_95f.tagName=="SPAN"){
_95f.innerHTML=curam.POPUP_EMPTY_SPAN_VALUE;
_95f.removeAttribute("title");
}
}
}
}
var _960=dojo.byId(_95d);
if(_960){
if(_960.tagName=="INPUT"){
_960.value="";
}else{
_960.innerHTML="&nbsp";
}
}
if(_959){
_959=dojo.fixEvent(_959);
dojo.stopEvent(_959);
}
return false;
},swapImage:function(_961,_962){
dojo.byId(_961).src=_962;
},appendTabColumn:function(_963,_964){
var _965;
var _966=[];
dojo.query("input[name='"+_963+"']").filter(function(_967){
return _967.checked;
}).forEach(function(_968){
_966.push(_968.value);
});
_965=_966.join("\t");
_964.href=_964.href+(_964.href.indexOf("?")==-1?"?":"&");
if(_965!=""){
_964.href=_964.href+_963+"="+encodeURIComponent(_965);
}else{
_964.href=_964.href+_963+"=";
}
},ToggleAll:function(e,_969){
dojo.query("input[name='"+_969+"']").forEach(function(_96a){
if(_96a.checked===true){
_96a.checked=false;
}else{
_96a.checked=true;
}
});
},ToggleSelectAll:function(e,_96b){
if(e.checked){
CheckAll(_96b);
}else{
ClearAll(_96b);
}
},CheckAll:function(_96c){
dojo.query("input[name='"+_96c+"']").forEach(function(_96d){
_96d.checked=true;
});
},ClearAll:function(_96e){
dojo.query("input[name='"+_96e+"']").forEach(function(_96f){
_96f.checked=false;
});
},Check:function(e){
e.checked=true;
},Clear:function(e){
e.checked=false;
},ChooseSelectAll:function(e,_970,_971){
var sAll=dojo.byId(_970);
if(sAll){
if(dojo.query("input[name='"+_971+"']").every("return item.checked")){
Check(sAll);
}else{
Clear(sAll);
}
}
},selectAllIfNeeded:function(_972,_973){
if(dojo.query("input[name='"+_973+"']").some("return !item.checked")){
return;
}
var sAll=dojo.byId(_972);
if(sAll){
Check(sAll);
}
},CopyToClipboard:function(txt){
if(window.clipboardData){
clipboardData.clearData();
clipboardData.setData("Text",txt);
window.status="pasted";
window.status="";
}
},dc:function(_974,_975,_976){
if(cm.wasFormSubmitted(_974)){
var evt=dojo.fixEvent(_976);
dojo.stopEvent(evt);
return false;
}
cm.setFormSubmitted(_974,1);
return true;
},setFocus:function(){
curam.util.setFocus();
},setParentFocus:function(_977){
curam.debug.log("curam.omega3-util.setParentFocus: "+_8dd.getProperty("curam.omega3-util.called"));
var _978=curam.dialog.getParentWindow(window);
if(!_978.closed){
_978.focus();
}else{
alert("The parent window has been closed");
}
if(_977||window.event){
dojo.stopEvent(_977||window.event);
}
curam.dialog.closeModalDialog();
},createElement:function(name,_979,_97a,text){
var e=dojo.create(name,_979);
if(_97a){
for(key in _97a){
e.style[key]=_97a[key];
}
}
if(text){
e.appendChild(document.createTextNode(text));
}
return e;
},getParentWin:function(){
return curam.dialog.getParentWindow(window);
},addQuestionsFromPopup:function(evt){
evt=dojo.fixEvent(evt);
dojo.stopEvent(evt);
if(window._questionsAdded){
return;
}
window._questionsAdded=true;
var _97b=getParentWin();
var _97c=dojo.query("INPUT");
var _97d=[];
dojo.query("INPUT[type='checkbox']").forEach(function(item){
if(item.checked&&item.id.indexOf("__o3mswa")<0){
_97d.push(item.value);
}
});
var _97e=dojo.toJson(_97d);
_97b.newQuestions=_97e;
_97b.curam.matrix.Constants.container.matrix.addQuestionsFromPopup();
curam.dialog.closeModalDialog();
return false;
},addOutcomesFromPopup:function(evt){
evt=dojo.fixEvent(evt);
dojo.stopEvent(evt);
if(window._outcomesAdded){
return;
}
window._outcomesAdded=true;
var _97f=[];
dojo.query("INPUT[type='checkbox']").forEach(function(item){
if(item.checked&&item.id.indexOf("__o3mswa")<0){
_97f.push(item.value);
}
});
getParentWin().curam.matrix.Constants.container.matrix.addOutcomesFromPopup(_97f);
curam.dialog.closeModalDialog();
return false;
},addMatrixQuestionsPopupListener:function(){
addMatrixPopupListener(addQuestionsFromPopup);
},addMatrixOutcomesPopupListener:function(){
addMatrixPopupListener(addOutcomesFromPopup);
},addMatrixPopupListener:function(fn){
dojo.query("form").connect("onsubmit",fn);
},getRequestParams:function(_980){
var _981=[];
var uri=new dojo._Url(_980);
if(uri.query!=null){
var _982=uri.query.split("&");
for(var i=0;i<_982.length;i++){
var arr=_982[i].split("=");
_981[arr[0]]=arr[1];
}
}
return _981;
},openModalDialog:function(_983,_984,left,top){
curam.util.openModalDialog(_983,_984,left,top);
},initCluster:function(_985){
var _986=_985.parentNode;
var _987=dojo.query("div.toggle-group",_986);
if(_987.length>=1){
return _987[0];
}
var next=cm.nextSibling(_985,"p")||cm.nextSibling(_985,"table");
if(!next){
return;
}
_987=dojo.create("div",{"class":"toggle-group"},next,"before");
var arr=[];
var _988=dojo.query("p.description",_985)[0];
if(_988){
arr.push(_988);
var _989=dojo.style(_985,"marginBottom");
dojo.style(_985,"marginBottom",0);
dojo.style(_988,"marginBottom",_989+"px");
}
var _98a=_986;
while(_98a&&!(dojo.hasClass(_98a,"cluster")||dojo.hasClass(_98a,"list"))){
_98a=_98a.parentNode;
}
_987.isClosed=dojo.hasClass(_98a,"uncollapse")?true:false;
if(_987.isClosed){
dojo.style(_987,"display","none");
}
for(var _98b=0;_98b<_986.childNodes.length;_98b++){
if(_986.childNodes[_98b]==_985||_986.childNodes[_98b]==_987){
continue;
}
arr.push(_986.childNodes[_98b]);
}
for(var _98b=0;_98b<arr.length;_98b++){
_987.appendChild(arr[_98b]);
}
return _987;
},initClusterHeight:function(_98c,_98d,_98e){
if(_98c.correctHeight){
return;
}
var _98f=dojo._getBorderBox(_98d).h;
var _990=0,_991;
for(var _992=0;_992<_98c.childNodes.length;_992++){
_991=_98c.childNodes[_992];
if(_991==_98d){
continue;
}
_990+=dojo._getBorderBox(_991).h;
}
if(_990==0){
return;
}
if(_98e){
dojo.style(_98d.parentNode,"height","");
}
_98c.correctHeight=_990;
},getCursorPosition:function(e){
e=e||dojo.global().event;
var _993={x:0,y:0};
if(e.pageX||e.pageY){
_993.x=e.pageX;
_993.y=e.pageY;
}else{
var de=dojo.doc().documentElement;
var db=dojo.body();
_993.x=e.clientX+((de||db)["scrollLeft"])-((de||db)["clientLeft"]);
_993.y=e.clientY+((de||db)["scrollTop"])-((de||db)["clientTop"]);
}
return _993;
},overElement:function(_994,e){
_994=dojo.byId(_994);
var _995=getCursorPosition(e);
var bb=dojo._getBorderBox(_994);
var _996=dojo._abs(_994,true);
var top=_996.y;
var _997=top+bb.h;
var left=_996.x;
var _998=left+bb.w;
return (_995.x>=left&&_995.x<=_998&&_995.y>=top&&_995.y<=_997);
},toggleCluster:function(_999,_99a){
var _99b=_999;
while(_999&&!(dojo.hasClass(_999,"cluster")||dojo.hasClass(_999,"list"))){
_999=_999.parentNode;
}
var _99c=false;
var _99d=dojo.query(" > :not(.header-wrapper) ",_999.childNodes[0]);
if(!dojo.hasClass(_99d[0],"toggleDiv")){
var _99e=dojo.create("div",{className:"toggleDiv"},_99d[0].parentNode);
var _99f=dojo.create("div",{className:"toggleDiv2"},_99d[0].parentNode);
_99d.forEach(function(node){
if(node.tagName!="DIV"){
_99e.appendChild(node);
}else{
_99f.appendChild(node);
}
});
}else{
var _99e=_99d[0];
var _99f=_99d[1];
}
var desc=dojo.query(" > .header-wrapper p ",_999.childNodes[0])[0];
if(typeof desc!="undefined"){
_99c=true;
}
if(dojo.hasClass(_999,"init-collapsed")){
dojo.removeClass(_999,"init-collapsed");
dojo.style(_99e,"display","none");
}
if(!_99e||_99e.inAnimation){
return;
}
require(["dojo/fx"],function(fx){
var _9a0={node:_99e,duration:600,onBegin:function(){
_99e.inAnimation=true;
dojo.removeClass(_999,"is-collapsed");
dojo.addClass(_999,"is-uncollapsed");
dojo.attr(_99b,"aria-expanded","true");
dojo.stopEvent(_99a);
},onEnd:function(){
_99e.inAnimation=false;
}};
var _9a1={node:_99e,duration:600,onBegin:function(){
_99e.inAnimation=true;
dojo.removeClass(_999,"is-uncollapsed");
dojo.addClass(_999,"is-collapsed");
dojo.attr(_99b,"aria-expanded","false");
dojo.stopEvent(_99a);
},onEnd:function(){
_99e.inAnimation=false;
}};
if(_99f.hasChildNodes()){
var _9a2={node:_99f,duration:600};
var _9a3={node:_99f,duration:600};
}
if(_99c){
var _9a4={node:desc,duration:100};
var _9a5={node:desc,duration:100,delay:500};
}
if(dojo.hasClass(_999,"is-collapsed")){
if(typeof _9a4!="undefined"){
fx.wipeIn(_9a4).play();
}
fx.wipeIn(_9a0).play();
if(typeof _9a2!="undefined"){
fx.wipeIn(_9a2).play();
}
}else{
if(dojo.hasClass(_999,"is-uncollapsed")){
if(typeof _9a3!="undefined"){
fx.wipeOut(_9a3).play();
}
fx.wipeOut(_9a1).play();
if(typeof _9a5!="undefined"){
fx.wipeOut(_9a5).play();
}
}else{
curam.debug.log("The cluster does not have a class name indicating"+"its collapsed/uncollapsed state");
}
}
});
},disableClusterToggle:function(node){
dojo.addOnLoad(function(){
node=dojo.byId(node);
var body=dojo.body();
while(node&&node!=body){
if(dojo.hasClass(node,"is-collapsed")||dojo.hasClass(node,"is-uncollapsed")){
dojo.removeClass(node,"is-collapsed");
dojo.removeClass(node,"is-uncollapsed");
dojo.removeAttr(dojo.query("SPAN.grouptoggleArrow",node)[0],"onclick");
}
node=node.parentNode;
}
});
},openUserPrefsEditor:function(_9a6){
_9a6=dojo.fixEvent(_9a6);
var _9a7=_9a6.target;
while(_9a7&&_9a7.tagName!="A"){
_9a7=_9a7.parentNode;
}
var _9a8={location:{href:_9a7.href}};
var rtc=new curam.util.RuntimeContext(_9a8);
var href=curam.util.setRpu("user-locale-selector.jspx",rtc);
openModalDialog({href:href},"width=500,height=300",200,150,false);
return false;
},calendarOpenModalDialog:function(_9a9,_9aa){
dojo.stopEvent(_9a9);
curam.util.openModalDialog(_9aa,"");
}};
for(prop in _8de){
dojo.global[prop]=_8de[prop];
}
return _8de;
});
},"dijit/form/_AutoCompleterMixin":function(){
define("dijit/form/_AutoCompleterMixin",["dojo/_base/connect","dojo/data/util/filter","dojo/_base/declare","dojo/_base/Deferred","dojo/dom-attr","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/query","dojo/regexp","dojo/_base/sniff","dojo/string","dojo/_base/window","./DataList","../registry","./_TextBoxMixin"],function(_9ab,_9ac,_9ad,_9ae,_9af,_9b0,keys,lang,_9b1,_9b2,has,_9b3,win,_9b4,_9b5,_9b6){
return _9ad("dijit.form._AutoCompleterMixin",null,{item:null,pageSize:Infinity,store:null,fetchProperties:{},query:{},autoComplete:true,highlightMatch:"first",searchDelay:100,searchAttr:"name",labelAttr:"",labelType:"text",queryExpr:"${0}*",ignoreCase:true,maxHeight:-1,_stopClickEvents:false,_getCaretPos:function(_9b7){
var pos=0;
if(typeof (_9b7.selectionStart)=="number"){
pos=_9b7.selectionStart;
}else{
if(has("ie")){
var tr=win.doc.selection.createRange().duplicate();
var ntr=_9b7.createTextRange();
tr.move("character",0);
ntr.move("character",0);
try{
ntr.setEndPoint("EndToEnd",tr);
pos=String(ntr.text).replace(/\r/g,"").length;
}
catch(e){
}
}
}
return pos;
},_setCaretPos:function(_9b8,_9b9){
_9b9=parseInt(_9b9);
_9b6.selectInputText(_9b8,_9b9,_9b9);
},_setDisabledAttr:function(_9ba){
this.inherited(arguments);
this.domNode.setAttribute("aria-disabled",_9ba);
},_abortQuery:function(){
if(this.searchTimer){
clearTimeout(this.searchTimer);
this.searchTimer=null;
}
if(this._fetchHandle){
if(this._fetchHandle.cancel){
this._cancelingQuery=true;
this._fetchHandle.cancel();
this._cancelingQuery=false;
}
this._fetchHandle=null;
}
},_onInput:function(evt){
this.inherited(arguments);
if(evt.charOrCode==229){
this._onKey(evt);
}
},_onKey:function(evt){
if(this.disabled||this.readOnly){
return;
}
var key=evt.charOrCode;
if(evt.altKey||((evt.ctrlKey||evt.metaKey)&&(key!="x"&&key!="v"))||key==keys.SHIFT){
return;
}
var _9bb=false;
var pw=this.dropDown;
var _9bc=null;
this._prev_key_backspace=false;
this._abortQuery();
this.inherited(arguments);
if(this._opened){
_9bc=pw.getHighlightedOption();
}
switch(key){
case keys.PAGE_DOWN:
case keys.DOWN_ARROW:
case keys.PAGE_UP:
case keys.UP_ARROW:
if(this._opened){
this._announceOption(_9bc);
}
_9b0.stop(evt);
break;
case keys.ENTER:
if(_9bc){
if(_9bc==pw.nextButton){
this._nextSearch(1);
_9b0.stop(evt);
break;
}else{
if(_9bc==pw.previousButton){
this._nextSearch(-1);
_9b0.stop(evt);
break;
}
}
}else{
this._setBlurValue();
this._setCaretPos(this.focusNode,this.focusNode.value.length);
}
if(this._opened||this._fetchHandle){
_9b0.stop(evt);
}
case keys.TAB:
var _9bd=this.get("displayedValue");
if(pw&&(_9bd==pw._messages["previousMessage"]||_9bd==pw._messages["nextMessage"])){
break;
}
if(_9bc){
this._selectOption(_9bc);
}
case keys.ESCAPE:
if(this._opened){
this._lastQuery=null;
this.closeDropDown();
}
break;
case " ":
if(_9bc){
_9b0.stop(evt);
this._selectOption(_9bc);
this.closeDropDown();
}else{
_9bb=true;
}
break;
case keys.DELETE:
case keys.BACKSPACE:
this._prev_key_backspace=true;
_9bb=true;
break;
default:
_9bb=typeof key=="string"||key==229;
}
if(_9bb){
this.item=undefined;
this.searchTimer=setTimeout(lang.hitch(this,"_startSearchFromInput"),1);
}
},_autoCompleteText:function(text){
var fn=this.focusNode;
_9b6.selectInputText(fn,fn.value.length);
var _9be=this.ignoreCase?"toLowerCase":"substr";
if(text[_9be](0).indexOf(this.focusNode.value[_9be](0))==0){
var cpos=this.autoComplete?this._getCaretPos(fn):fn.value.length;
if((cpos+1)>fn.value.length){
fn.value=text;
_9b6.selectInputText(fn,cpos);
}
}else{
fn.value=text;
_9b6.selectInputText(fn);
}
},_openResultList:function(_9bf,_9c0,_9c1){
this._fetchHandle=null;
if(this.disabled||this.readOnly||(_9c0[this.searchAttr]!==this._lastQuery)){
return;
}
var _9c2=this.dropDown.getHighlightedOption();
this.dropDown.clearResultList();
if(!_9bf.length&&_9c1.start==0){
this.closeDropDown();
return;
}
this.dropDown.createOptions(_9bf,_9c1,lang.hitch(this,"_getMenuLabelFromItem"));
this._showResultList();
if(_9c1.direction){
if(1==_9c1.direction){
this.dropDown.highlightFirstOption();
}else{
if(-1==_9c1.direction){
this.dropDown.highlightLastOption();
}
}
if(_9c2){
this._announceOption(this.dropDown.getHighlightedOption());
}
}else{
if(this.autoComplete&&!this._prev_key_backspace&&!/^[*]+$/.test(_9c0[this.searchAttr].toString())){
this._announceOption(this.dropDown.containerNode.firstChild.nextSibling);
}
}
},_showResultList:function(){
this.closeDropDown(true);
this.openDropDown();
this.domNode.setAttribute("aria-expanded","true");
},loadDropDown:function(){
this._startSearchAll();
},isLoaded:function(){
return false;
},closeDropDown:function(){
this._abortQuery();
if(this._opened){
this.inherited(arguments);
this.domNode.setAttribute("aria-expanded","false");
this.focusNode.removeAttribute("aria-activedescendant");
}
},_setBlurValue:function(){
var _9c3=this.get("displayedValue");
var pw=this.dropDown;
if(pw&&(_9c3==pw._messages["previousMessage"]||_9c3==pw._messages["nextMessage"])){
this._setValueAttr(this._lastValueReported,true);
}else{
if(typeof this.item=="undefined"){
this.item=null;
this.set("displayedValue",_9c3);
}else{
if(this.value!=this._lastValueReported){
this._handleOnChange(this.value,true);
}
this._refreshState();
}
}
},_setItemAttr:function(item,_9c4,_9c5){
var _9c6="";
if(item){
if(!_9c5){
_9c5=this.store._oldAPI?this.store.getValue(item,this.searchAttr):item[this.searchAttr];
}
_9c6=this._getValueField()!=this.searchAttr?this.store.getIdentity(item):_9c5;
}
this.set("value",_9c6,_9c4,_9c5,item);
},_announceOption:function(node){
if(!node){
return;
}
var _9c7;
if(node==this.dropDown.nextButton||node==this.dropDown.previousButton){
_9c7=node.innerHTML;
this.item=undefined;
this.value="";
}else{
var item=this.dropDown.items[node.getAttribute("item")];
_9c7=(this.store._oldAPI?this.store.getValue(item,this.searchAttr):item[this.searchAttr]).toString();
this.set("item",item,false,_9c7);
}
this.focusNode.value=this.focusNode.value.substring(0,this._lastInput.length);
this.focusNode.setAttribute("aria-activedescendant",_9af.get(node,"id"));
this._autoCompleteText(_9c7);
},_selectOption:function(_9c8){
this.closeDropDown();
if(_9c8){
this._announceOption(_9c8);
}
this._setCaretPos(this.focusNode,this.focusNode.value.length);
this._handleOnChange(this.value,true);
},_startSearchAll:function(){
this._startSearch("");
},_startSearchFromInput:function(){
this._startSearch(this.focusNode.value.replace(/([\\\*\?])/g,"\\$1"));
},_getQueryString:function(text){
return _9b3.substitute(this.queryExpr,[text]);
},_startSearch:function(key){
if(!this.dropDown){
var _9c9=this.id+"_popup",_9ca=lang.isString(this.dropDownClass)?lang.getObject(this.dropDownClass,false):this.dropDownClass;
this.dropDown=new _9ca({onChange:lang.hitch(this,this._selectOption),id:_9c9,dir:this.dir,textDir:this.textDir});
this.focusNode.removeAttribute("aria-activedescendant");
this.textbox.setAttribute("aria-owns",_9c9);
}
this._lastInput=key;
var _9cb=lang.clone(this.query);
var _9cc={start:0,count:this.pageSize,queryOptions:{ignoreCase:this.ignoreCase,deep:true}};
lang.mixin(_9cc,this.fetchProperties);
var qs=this._getQueryString(key),q;
if(this.store._oldAPI){
q=qs;
}else{
q=_9ac.patternToRegExp(qs,this.ignoreCase);
q.toString=function(){
return qs;
};
}
this._lastQuery=_9cb[this.searchAttr]=q;
var _9cd=this,_9ce=function(){
var _9cf=_9cd._fetchHandle=_9cd.store.query(_9cb,_9cc);
_9ae.when(_9cf,function(res){
_9cd._fetchHandle=null;
res.total=_9cf.total;
_9cd._openResultList(res,_9cb,_9cc);
},function(err){
_9cd._fetchHandle=null;
if(!_9cd._cancelingQuery){
console.error(_9cd.declaredClass+" "+err.toString());
_9cd.closeDropDown();
}
});
};
this.searchTimer=setTimeout(lang.hitch(this,function(_9d0,_9d1){
this.searchTimer=null;
_9ce();
this._nextSearch=this.dropDown.onPage=function(_9d2){
_9cc.start+=_9cc.count*_9d2;
_9cc.direction=_9d2;
_9ce();
_9d1.focus();
};
},_9cb,this),this.searchDelay);
},_getValueField:function(){
return this.searchAttr;
},constructor:function(){
this.query={};
this.fetchProperties={};
},postMixInProperties:function(){
if(!this.store){
var _9d3=this.srcNodeRef;
var list=this.list;
if(list){
this.store=_9b5.byId(list);
}else{
this.store=new _9b4({},_9d3);
}
if(!("value" in this.params)){
var item=(this.item=this.store.fetchSelectedItem());
if(item){
var _9d4=this._getValueField();
this.value=this.store._oldAPI?this.store.getValue(item,_9d4):item[_9d4];
}
}
}
this.inherited(arguments);
},postCreate:function(){
var _9d5=_9b1("label[for=\""+this.id+"\"]");
if(_9d5.length){
_9d5[0].id=(this.id+"_label");
this.domNode.setAttribute("aria-labelledby",_9d5[0].id);
}
this.inherited(arguments);
},_getMenuLabelFromItem:function(item){
var _9d6=this.labelFunc(item,this.store),_9d7=this.labelType;
if(this.highlightMatch!="none"&&this.labelType=="text"&&this._lastInput){
_9d6=this.doHighlight(_9d6,this._escapeHtml(this._lastInput));
_9d7="html";
}
return {html:_9d7=="html",label:_9d6};
},doHighlight:function(_9d8,find){
var _9d9=(this.ignoreCase?"i":"")+(this.highlightMatch=="all"?"g":""),i=this.queryExpr.indexOf("${0}");
find=_9b2.escapeString(find);
return this._escapeHtml(_9d8).replace(new RegExp((i==0?"^":"")+"("+find+")"+(i==(this.queryExpr.length-4)?"$":""),_9d9),"<span class=\"dijitComboBoxHighlightMatch\">$1</span>");
},_escapeHtml:function(str){
str=String(str).replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
return str;
},reset:function(){
this.item=null;
this.inherited(arguments);
},labelFunc:function(item,_9da){
return (_9da._oldAPI?_9da.getValue(item,this.labelAttr||this.searchAttr):item[this.labelAttr||this.searchAttr]).toString();
},_setValueAttr:function(_9db,_9dc,_9dd,item){
this._set("item",item||null);
if(!_9db){
_9db="";
}
this.inherited(arguments);
},_setTextDirAttr:function(_9de){
this.inherited(arguments);
if(this.dropDown){
this.dropDown._set("textDir",_9de);
}
}});
});
},"dijit/TitlePane":function(){
require({cache:{"url:dijit/templates/TitlePane.html":"<div>\n\t<div data-dojo-attach-event=\"onclick:_onTitleClick, onkeypress:_onTitleKey\"\n\t\t\tclass=\"dijitTitlePaneTitle\" data-dojo-attach-point=\"titleBarNode\">\n\t\t<div class=\"dijitTitlePaneTitleFocus\" data-dojo-attach-point=\"focusNode\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"arrowNode\" class=\"dijitArrowNode\" role=\"presentation\"\n\t\t\t/><span data-dojo-attach-point=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span\n\t\t\t><span data-dojo-attach-point=\"titleNode\" class=\"dijitTitlePaneTextNode\"></span>\n\t\t</div>\n\t</div>\n\t<div class=\"dijitTitlePaneContentOuter\" data-dojo-attach-point=\"hideNode\" role=\"presentation\">\n\t\t<div class=\"dijitReset\" data-dojo-attach-point=\"wipeNode\" role=\"presentation\">\n\t\t\t<div class=\"dijitTitlePaneContentInner\" data-dojo-attach-point=\"containerNode\" role=\"region\" id=\"${id}_pane\">\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"}});
define("dijit/TitlePane",["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/_base/event","dojo/fx","dojo/_base/kernel","dojo/keys","./_CssStateMixin","./_TemplatedMixin","./layout/ContentPane","dojo/text!./templates/TitlePane.html","./_base/manager"],function(_9df,_9e0,dom,_9e1,_9e2,_9e3,_9e4,_9e5,_9e6,keys,_9e7,_9e8,_9e9,_9ea,_9eb){
return _9e0("dijit.TitlePane",[_9e9,_9e8,_9e7],{title:"",_setTitleAttr:{node:"titleNode",type:"innerHTML"},open:true,toggleable:true,tabIndex:"0",duration:_9eb.defaultDuration,baseClass:"dijitTitlePane",templateString:_9ea,doLayout:false,_setTooltipAttr:{node:"focusNode",type:"attribute",attribute:"title"},buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.titleNode,false);
},postCreate:function(){
this.inherited(arguments);
if(this.toggleable){
this._trackMouseState(this.titleBarNode,"dijitTitlePaneTitle");
}
var _9ec=this.hideNode,_9ed=this.wipeNode;
this._wipeIn=_9e5.wipeIn({node:_9ed,duration:this.duration,beforeBegin:function(){
_9ec.style.display="";
}});
this._wipeOut=_9e5.wipeOut({node:_9ed,duration:this.duration,onEnd:function(){
_9ec.style.display="none";
}});
},_setOpenAttr:function(open,_9ee){
_9df.forEach([this._wipeIn,this._wipeOut],function(_9ef){
if(_9ef&&_9ef.status()=="playing"){
_9ef.stop();
}
});
if(_9ee){
var anim=this[open?"_wipeIn":"_wipeOut"];
anim.play();
}else{
this.hideNode.style.display=this.wipeNode.style.display=open?"":"none";
}
if(this._started){
if(open){
this._onShow();
}else{
this.onHide();
}
}
this.arrowNodeInner.innerHTML=open?"-":"+";
this.containerNode.setAttribute("aria-hidden",open?"false":"true");
this.focusNode.setAttribute("aria-pressed",open?"true":"false");
this._set("open",open);
this._setCss();
},_setToggleableAttr:function(_9f0){
this.focusNode.setAttribute("role",_9f0?"button":"heading");
if(_9f0){
this.focusNode.setAttribute("aria-controls",this.id+"_pane");
_9e1.set(this.focusNode,"tabIndex",this.tabIndex);
}else{
_9e1.remove(this.focusNode,"tabIndex");
}
this._set("toggleable",_9f0);
this._setCss();
},_setContentAttr:function(_9f1){
if(!this.open||!this._wipeOut||this._wipeOut.status()=="playing"){
this.inherited(arguments);
}else{
if(this._wipeIn&&this._wipeIn.status()=="playing"){
this._wipeIn.stop();
}
_9e3.setMarginBox(this.wipeNode,{h:_9e3.getMarginBox(this.wipeNode).h});
this.inherited(arguments);
if(this._wipeIn){
this._wipeIn.play();
}else{
this.hideNode.style.display="";
}
}
},toggle:function(){
this._setOpenAttr(!this.open,true);
},_setCss:function(){
var node=this.titleBarNode||this.focusNode;
var _9f2=this._titleBarClass;
this._titleBarClass="dijit"+(this.toggleable?"":"Fixed")+(this.open?"Open":"Closed");
_9e2.replace(node,this._titleBarClass,_9f2||"");
this.arrowNodeInner.innerHTML=this.open?"-":"+";
},_onTitleKey:function(e){
if(e.charOrCode==keys.ENTER||e.charOrCode==" "){
if(this.toggleable){
this.toggle();
}
_9e4.stop(e);
}else{
if(e.charOrCode==keys.DOWN_ARROW&&this.open){
this.containerNode.focus();
e.preventDefault();
}
}
},_onTitleClick:function(){
if(this.toggleable){
this.toggle();
}
},setTitle:function(_9f3){
_9e6.deprecated("dijit.TitlePane.setTitle() is deprecated.  Use set('title', ...) instead.","","2.0");
this.set("title",_9f3);
}});
});
},"curam/layout/EmptyContentPane":function(){
define("curam/layout/EmptyContentPane",["dijit/layout/ContentPane"],function(){
var _9f4=dojo.declare("curam.layout.EmptyContentPane",dijit.layout.ContentPane,{baseClass:"",_layoutChildren:function(){
},resize:function(){
}});
return _9f4;
});
},"dijit/place":function(){
define("dijit/place",["dojo/_base/array","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/window","dojo/window",".","dojo/_base/lang"],function(_9f5,_9f6,_9f7,_9f8,win,_9f9,_9fa,lang){
function _9fb(node,_9fc,_9fd,_9fe){
var view=_9f9.getBox();
if(!node.parentNode||String(node.parentNode.tagName).toLowerCase()!="body"){
win.body().appendChild(node);
}
var best=null;
_9f5.some(_9fc,function(_9ff){
var _a00=_9ff.corner;
var pos=_9ff.pos;
var _a01=0;
var _a02={w:{"L":view.l+view.w-pos.x,"R":pos.x-view.l,"M":view.w}[_a00.charAt(1)],h:{"T":view.t+view.h-pos.y,"B":pos.y-view.t,"M":view.h}[_a00.charAt(0)]};
if(_9fd){
var res=_9fd(node,_9ff.aroundCorner,_a00,_a02,_9fe);
_a01=typeof res=="undefined"?0:res;
}
var _a03=node.style;
var _a04=_a03.display;
var _a05=_a03.visibility;
if(_a03.display=="none"){
_a03.visibility="hidden";
_a03.display="";
}
var mb=_9f6.getMarginBox(node);
_a03.display=_a04;
_a03.visibility=_a05;
var _a06={"L":pos.x,"R":pos.x-mb.w,"M":Math.max(view.l,Math.min(view.l+view.w,pos.x+(mb.w>>1))-mb.w)}[_a00.charAt(1)],_a07={"T":pos.y,"B":pos.y-mb.h,"M":Math.max(view.t,Math.min(view.t+view.h,pos.y+(mb.h>>1))-mb.h)}[_a00.charAt(0)],_a08=Math.max(view.l,_a06),_a09=Math.max(view.t,_a07),endX=Math.min(view.l+view.w,_a06+mb.w),endY=Math.min(view.t+view.h,_a07+mb.h),_a0a=endX-_a08,_a0b=endY-_a09;
_a01+=(mb.w-_a0a)+(mb.h-_a0b);
var l=_9f6.isBodyLtr();
if(lang.exists("curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm")&&curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm==true){
if((_a00.charAt(0)=="T"||(_a00.charAt(1)=="L"&&l)||(_a00.charAt(1)=="R"&&!l))&&_a01>0){
_a01=mb.w+mb.h;
}
}
if(best==null||_a01<best.overflow){
best={corner:_a00,aroundCorner:_9ff.aroundCorner,x:_a08,y:_a09,w:_a0a,h:_a0b,overflow:_a01,spaceAvailable:_a02};
}
return !_a01;
});
if(best.overflow&&_9fd){
_9fd(node,best.aroundCorner,best.corner,best.spaceAvailable,_9fe);
}
var l=_9f6.isBodyLtr(),s=node.style;
s.top=best.y+"px";
s[l?"left":"right"]=(l?best.x:view.w-best.x-best.w)+"px";
s[l?"right":"left"]="auto";
return best;
};
return (_9fa.place={at:function(node,pos,_a0c,_a0d){
var _a0e=_9f5.map(_a0c,function(_a0f){
var c={corner:_a0f,pos:{x:pos.x,y:pos.y}};
if(_a0d){
c.pos.x+=_a0f.charAt(1)=="L"?_a0d.x:-_a0d.x;
c.pos.y+=_a0f.charAt(0)=="T"?_a0d.y:-_a0d.y;
}
return c;
});
return _9fb(node,_a0e);
},around:function(node,_a10,_a11,_a12,_a13){
var _a14=(typeof _a10=="string"||"offsetWidth" in _a10)?_9f6.position(_a10,true):_a10;
if(_a10.parentNode){
var _a15=_9f7.getComputedStyle(_a10).position=="absolute";
var _a16=_a10.parentNode;
while(_a16&&_a16.nodeType==1&&_a16.nodeName!="BODY"){
var _a17=_9f6.position(_a16,true),pcs=_9f7.getComputedStyle(_a16);
if(/relative|absolute/.test(pcs.position)){
_a15=false;
}
if(!_a15&&/hidden|auto|scroll/.test(pcs.overflow)){
var _a18=Math.min(_a14.y+_a14.h,_a17.y+_a17.h);
var _a19=Math.min(_a14.x+_a14.w,_a17.x+_a17.w);
_a14.x=Math.max(_a14.x,_a17.x);
_a14.y=Math.max(_a14.y,_a17.y);
_a14.h=_a18-_a14.y;
_a14.w=_a19-_a14.x;
}
if(pcs.position=="absolute"){
_a15=true;
}
_a16=_a16.parentNode;
}
}
var x=_a14.x,y=_a14.y,_a1a="w" in _a14?_a14.w:(_a14.w=_a14.width),_a1b="h" in _a14?_a14.h:(_9f8.deprecated("place.around: dijit.place.__Rectangle: { x:"+x+", y:"+y+", height:"+_a14.height+", width:"+_a1a+" } has been deprecated.  Please use { x:"+x+", y:"+y+", h:"+_a14.height+", w:"+_a1a+" }","","2.0"),_a14.h=_a14.height);
var _a1c=[];
function push(_a1d,_a1e){
_a1c.push({aroundCorner:_a1d,corner:_a1e,pos:{x:{"L":x,"R":x+_a1a,"M":x+(_a1a>>1)}[_a1d.charAt(1)],y:{"T":y,"B":y+_a1b,"M":y+(_a1b>>1)}[_a1d.charAt(0)]}});
};
_9f5.forEach(_a11,function(pos){
var ltr=_a12;
switch(pos){
case "above-centered":
push("TM","BM");
break;
case "below-centered":
push("BM","TM");
break;
case "after-centered":
ltr=!ltr;
case "before-centered":
push(ltr?"ML":"MR",ltr?"MR":"ML");
break;
case "after":
ltr=!ltr;
case "before":
push(ltr?"TL":"TR",ltr?"TR":"TL");
push(ltr?"BL":"BR",ltr?"BR":"BL");
break;
case "below-alt":
ltr=!ltr;
case "below":
push(ltr?"BL":"BR",ltr?"TL":"TR");
push(ltr?"BR":"BL",ltr?"TR":"TL");
break;
case "above-alt":
ltr=!ltr;
case "above":
push(ltr?"TL":"TR",ltr?"BL":"BR");
push(ltr?"TR":"TL",ltr?"BR":"BL");
break;
default:
push(pos.aroundCorner,pos.corner);
}
});
var _a1f=_9fb(node,_a1c,_a13,{w:_a1a,h:_a1b});
_a1f.aroundNodePos=_a14;
return _a1f;
}});
});
},"dijit/form/ComboBox":function(){
define("dijit/form/ComboBox",["dojo/_base/declare","./ValidationTextBox","./ComboBoxMixin"],function(_a20,_a21,_a22){
return _a20("dijit.form.ComboBox",[_a21,_a22],{});
});
},"dijit/layout/_LayoutWidget":function(){
define("dijit/layout/_LayoutWidget",["dojo/_base/lang","../_Widget","../_Container","../_Contained","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/sniff","dojo/_base/window"],function(lang,_a23,_a24,_a25,_a26,_a27,_a28,_a29,has,win){
return _a26("dijit.layout._LayoutWidget",[_a23,_a24,_a25],{baseClass:"dijitLayoutContainer",isLayoutContainer:true,buildRendering:function(){
this.inherited(arguments);
_a27.add(this.domNode,"dijitContainer");
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
var _a2a=this.getParent&&this.getParent();
if(!(_a2a&&_a2a.isLayoutContainer)){
this.resize();
this.connect(win.global,"onresize",function(){
this.resize();
});
}
},resize:function(_a2b,_a2c){
var node=this.domNode;
if(_a2b){
_a28.setMarginBox(node,_a2b);
}
var mb=_a2c||{};
lang.mixin(mb,_a2b||{});
if(!("h" in mb)||!("w" in mb)){
mb=lang.mixin(_a28.getMarginBox(node),mb);
}
var cs=_a29.getComputedStyle(node);
var me=_a28.getMarginExtents(node,cs);
var be=_a28.getBorderExtents(node,cs);
var bb=(this._borderBox={w:mb.w-(me.w+be.w),h:mb.h-(me.h+be.h)});
var pe=_a28.getPadExtents(node,cs);
this._contentBox={l:_a29.toPixelValue(node,cs.paddingLeft),t:_a29.toPixelValue(node,cs.paddingTop),w:bb.w-pe.w,h:bb.h-pe.h};
this.layout();
},layout:function(){
},_setupChild:function(_a2d){
var cls=this.baseClass+"-child "+(_a2d.baseClass?this.baseClass+"-"+_a2d.baseClass:"");
_a27.add(_a2d.domNode,cls);
},addChild:function(_a2e,_a2f){
this.inherited(arguments);
if(this._started){
this._setupChild(_a2e);
}
},removeChild:function(_a30){
var cls=this.baseClass+"-child"+(_a30.baseClass?" "+this.baseClass+"-"+_a30.baseClass:"");
_a27.remove(_a30.domNode,cls);
this.inherited(arguments);
}});
});
},"dojo/cldr/supplemental":function(){
define("dojo/cldr/supplemental",["../_base/kernel","../_base/lang","../i18n"],function(dojo,lang){
lang.getObject("cldr.supplemental",true,dojo);
dojo.cldr.supplemental.getFirstDayOfWeek=function(_a31){
var _a32={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,sy:6,tn:6,ye:6,ar:0,as:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,il:0,"in":0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mn:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,zw:0};
var _a33=dojo.cldr.supplemental._region(_a31);
var dow=_a32[_a33];
return (dow===undefined)?1:dow;
};
dojo.cldr.supplemental._region=function(_a34){
_a34=dojo.i18n.normalizeLocale(_a34);
var tags=_a34.split("-");
var _a35=tags[1];
if(!_a35){
_a35={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",he:"il",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[tags[0]];
}else{
if(_a35.length==4){
_a35=tags[2];
}
}
return _a35;
};
dojo.cldr.supplemental.getWeekend=function(_a36){
var _a37={"in":0,af:4,dz:4,ir:4,om:4,sa:4,ye:4,ae:5,bh:5,eg:5,il:5,iq:5,jo:5,kw:5,ly:5,ma:5,qa:5,sd:5,sy:5,tn:5};
var _a38={af:5,dz:5,ir:5,om:5,sa:5,ye:5,ae:6,bh:5,eg:6,il:6,iq:6,jo:6,kw:6,ly:6,ma:6,qa:6,sd:6,sy:6,tn:6};
var _a39=dojo.cldr.supplemental._region(_a36);
var _a3a=_a37[_a39];
var end=_a38[_a39];
if(_a3a===undefined){
_a3a=6;
}
if(end===undefined){
end=0;
}
return {start:_a3a,end:end};
};
return dojo.cldr.supplemental;
});
},"url:dijit/form/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n","dijit/layout/_ContentPaneResizeMixin":function(){
define("dijit/layout/_ContentPaneResizeMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/_base/lang","dojo/query","dojo/_base/sniff","dojo/_base/window","../registry","./utils","../_Contained"],function(_a3b,_a3c,_a3d,_a3e,_a3f,lang,_a40,has,win,_a41,_a42,_a43){
return _a3c("dijit.layout._ContentPaneResizeMixin",null,{doLayout:true,isLayoutContainer:true,startup:function(){
if(this._started){
return;
}
var _a44=this.getParent();
this._childOfLayoutWidget=_a44&&_a44.isLayoutContainer;
this._needLayout=!this._childOfLayoutWidget;
this.inherited(arguments);
if(this._isShown()){
this._onShow();
}
if(!this._childOfLayoutWidget){
this.connect(has("ie")?this.domNode:win.global,"onresize",function(){
this._needLayout=!this._childOfLayoutWidget;
this.resize();
});
}
},_checkIfSingleChild:function(){
var _a45=_a40("> *",this.containerNode).filter(function(node){
return node.tagName!=="SCRIPT";
}),_a46=_a45.filter(function(node){
return _a3d.has(node,"data-dojo-type")||_a3d.has(node,"dojoType")||_a3d.has(node,"widgetId");
}),_a47=_a3b.filter(_a46.map(_a41.byNode),function(_a48){
return _a48&&_a48.domNode&&_a48.resize;
});
if(_a45.length==_a46.length&&_a47.length==1){
this._singleChild=_a47[0];
}else{
delete this._singleChild;
}
_a3e.toggle(this.containerNode,this.baseClass+"SingleChild",!!this._singleChild);
},resize:function(_a49,_a4a){
if(!this._wasShown&&this.open!==false){
this._onShow();
}
this._resizeCalled=true;
this._scheduleLayout(_a49,_a4a);
},_scheduleLayout:function(_a4b,_a4c){
if(this._isShown()){
this._layout(_a4b,_a4c);
}else{
this._needLayout=true;
this._changeSize=_a4b;
this._resultSize=_a4c;
}
},_layout:function(_a4d,_a4e){
if(_a4d){
_a3f.setMarginBox(this.domNode,_a4d);
}
var cn=this.containerNode;
if(cn===this.domNode){
var mb=_a4e||{};
lang.mixin(mb,_a4d||{});
if(!("h" in mb)||!("w" in mb)){
mb=lang.mixin(_a3f.getMarginBox(cn),mb);
}
this._contentBox=_a42.marginBox2contentBox(cn,mb);
}else{
this._contentBox=_a3f.getContentBox(cn);
}
this._layoutChildren();
delete this._needLayout;
},_layoutChildren:function(){
if(this.doLayout){
this._checkIfSingleChild();
}
if(this._singleChild&&this._singleChild.resize){
var cb=this._contentBox||_a3f.getContentBox(this.containerNode);
this._singleChild.resize({w:cb.w,h:cb.h});
}else{
_a3b.forEach(this.getChildren(),function(_a4f){
if(_a4f.resize){
_a4f.resize();
}
});
}
},_isShown:function(){
if(this._childOfLayoutWidget){
if(this._resizeCalled&&"open" in this){
return this.open;
}
return this._resizeCalled;
}else{
if("open" in this){
return this.open;
}else{
var node=this.domNode,_a50=this.domNode.parentNode;
return (node.style.display!="none")&&(node.style.visibility!="hidden")&&!_a3e.contains(node,"dijitHidden")&&_a50&&_a50.style&&(_a50.style.display!="none");
}
}
},_onShow:function(){
if(this._needLayout){
this._layout(this._changeSize,this._resultSize);
}
this.inherited(arguments);
this._wasShown=true;
}});
});
},"dijit/form/_ButtonMixin":function(){
define("dijit/form/_ButtonMixin",["dojo/_base/declare","dojo/dom","dojo/_base/event","../registry"],function(_a51,dom,_a52,_a53){
return _a51("dijit.form._ButtonMixin",null,{label:"",type:"button",_onClick:function(e){
if(this.disabled){
_a52.stop(e);
return false;
}
var _a54=this.onClick(e)===false;
if(!_a54&&this.type=="submit"&&!(this.valueNode||this.focusNode).form){
for(var node=this.domNode;node.parentNode;node=node.parentNode){
var _a55=_a53.byNode(node);
if(_a55&&typeof _a55._onSubmit=="function"){
_a55._onSubmit(e);
_a54=true;
break;
}
}
}
if(_a54){
e.preventDefault();
}
return !_a54;
},postCreate:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},onClick:function(){
return true;
},_setLabelAttr:function(_a56){
this._set("label",_a56);
(this.containerNode||this.focusNode).innerHTML=_a56;
}});
});
},"curam/pagination/StateController":function(){
define("curam/pagination/StateController",["curam/pagination","curam/debug"],function(){
var _a57=dojo.declare("curam.pagination.StateController",null,{pageSize:undefined,currentPage:0,_listModel:undefined,_gui:undefined,constructor:function(_a58,gui){
this.pageSize=curam.pagination.defaultPageSize;
this._listModel=_a58;
this.pageSize=curam.pagination.defaultPageSize;
this._gui=gui;
var _a59={};
_a59.pageSizeOptions=[15,30,45];
_a59.pageSizeOptions.contains=function(val){
for(var i=0;i<_a59.pageSizeOptions.length;i++){
if(_a59.pageSizeOptions[i]==val){
return true;
}
}
return false;
};
if(!_a59.pageSizeOptions.contains(curam.pagination.defaultPageSize)){
_a59.pageSizeOptions.push(curam.pagination.defaultPageSize);
_a59.pageSizeOptions.sort(function(a,b){
return a-b;
});
}
_a59.currentPageSize=this.pageSize;
_a59.directLinkRangeWidth=3;
_a59.lastPage=this._getLastPageNumber();
this._gui.updateState(_a59);
var _a5a={};
_a5a.first=dojo.hitch(this,this.gotoFirst);
_a5a.last=dojo.hitch(this,this.gotoLast);
_a5a.previous=dojo.hitch(this,this.gotoPrevious);
_a5a.next=dojo.hitch(this,this.gotoNext);
_a5a.page=dojo.hitch(this,this.gotoPage);
_a5a.pageSize=dojo.hitch(this,this.changePageSize);
this._gui.setHandlers(_a5a);
},reset:function(){
this._listModel.hideRange(1,this._listModel.getRowCount());
this.currentPage=0;
this._gui.reset();
this.gotoFirst();
},gotoFirst:function(){
if(this.currentPage!=1){
this.gotoPage(1);
}
},gotoLast:function(){
var _a5b=this._getLastPageNumber();
if(this.currentPage!=_a5b){
this.gotoPage(_a5b);
}
},gotoPrevious:function(){
if(this.currentPage>1){
this.gotoPage(this.currentPage-1);
}
},gotoNext:function(){
curam.debug.log("curam.pagination.StateController.gotoNext");
var _a5c=this._getLastPageNumber();
if(this.currentPage<_a5c){
this.gotoPage(this.currentPage+1);
}
},gotoPage:function(_a5d){
curam.debug.log("curam.pagination.StateController.gotoPage: ",_a5d);
if(this.currentPage!=0){
this._listModel.hideRange(this._calcRangeStart(this.currentPage),this._calcRangeEnd(this.currentPage));
}
this._listModel.showRange(this._calcRangeStart(_a5d),this._calcRangeEnd(_a5d));
this.currentPage=_a5d;
this._updateGui();
},changePageSize:function(_a5e){
curam.debug.log("curam.pagination.StateController.changePageSize: ",_a5e);
this.pageSize=_a5e;
var _a5f={};
_a5f.currentPageSize=_a5e;
_a5f.lastPage=this._getLastPageNumber();
this._gui.updateState(_a5f);
this.reset();
},_calcRangeStart:function(_a60){
return (_a60*this.pageSize)-this.pageSize+1;
},_calcRangeEnd:function(_a61){
if(_a61!=this._getLastPageNumber()){
return _a61*this.pageSize;
}else{
return this._listModel.getRowCount();
}
},_getLastPageNumber:function(){
var _a62=this._listModel.getRowCount();
var mod=_a62%this.pageSize;
return ((_a62-mod)/this.pageSize)+(mod>0?1:0);
},_updateGui:function(){
var _a63={};
_a63.first=this.currentPage>1;
_a63.previous=_a63.first;
_a63.next=this.currentPage<this._getLastPageNumber();
_a63.last=_a63.next;
_a63.currentPage=this.currentPage;
_a63.rowInfo=[this._calcRangeStart(this.currentPage),this._calcRangeEnd(this.currentPage),this._listModel.getRowCount()];
this._gui.updateState(_a63);
}});
return _a57;
});
},"dojox/storage/LocalStorageProvider":function(){
define("dojox/storage/LocalStorageProvider",["dijit","dojo","dojox","dojo/require!dojox/storage/Provider,dojox/storage/manager"],function(_a64,dojo,_a65){
dojo.provide("dojox.storage.LocalStorageProvider");
dojo.require("dojox.storage.Provider");
dojo.require("dojox.storage.manager");
dojo.declare("dojox.storage.LocalStorageProvider",[_a65.storage.Provider],{store:null,initialize:function(){
this.store=localStorage;
this.initialized=true;
_a65.storage.manager.loaded();
},isAvailable:function(){
return typeof localStorage!="undefined";
},put:function(key,_a66,_a67,_a68){
this._assertIsValidKey(key);
_a68=_a68||this.DEFAULT_NAMESPACE;
this._assertIsValidNamespace(_a68);
var _a69=this.getFullKey(key,_a68);
_a66=dojo.toJson(_a66);
try{
this.store.setItem(_a69,_a66);
if(_a67){
_a67(this.SUCCESS,key,null,_a68);
}
}
catch(e){
if(_a67){
_a67(this.FAILED,key,e.toString(),_a68);
}
}
},get:function(key,_a6a){
this._assertIsValidKey(key);
_a6a=_a6a||this.DEFAULT_NAMESPACE;
this._assertIsValidNamespace(_a6a);
key=this.getFullKey(key,_a6a);
return dojo.fromJson(this.store.getItem(key));
},getKeys:function(_a6b){
_a6b=_a6b||this.DEFAULT_NAMESPACE;
this._assertIsValidNamespace(_a6b);
_a6b="__"+_a6b+"_";
var keys=[];
for(var i=0;i<this.store.length;i++){
var _a6c=this.store.key(i);
if(this._beginsWith(_a6c,_a6b)){
_a6c=_a6c.substring(_a6b.length);
keys.push(_a6c);
}
}
return keys;
},clear:function(_a6d){
_a6d=_a6d||this.DEFAULT_NAMESPACE;
this._assertIsValidNamespace(_a6d);
_a6d="__"+_a6d+"_";
var keys=[];
for(var i=0;i<this.store.length;i++){
if(this._beginsWith(this.store.key(i),_a6d)){
keys.push(this.store.key(i));
}
}
dojo.forEach(keys,dojo.hitch(this.store,"removeItem"));
},remove:function(key,_a6e){
_a6e=_a6e||this.DEFAULT_NAMESPACE;
this._assertIsValidNamespace(_a6e);
this.store.removeItem(this.getFullKey(key,_a6e));
},getNamespaces:function(){
var _a6f=[this.DEFAULT_NAMESPACE];
var _a70={};
_a70[this.DEFAULT_NAMESPACE]=true;
var _a71=/^__([^_]*)_/;
for(var i=0;i<this.store.length;i++){
var _a72=this.store.key(i);
if(_a71.test(_a72)==true){
var _a73=_a72.match(_a71)[1];
if(typeof _a70[_a73]=="undefined"){
_a70[_a73]=true;
_a6f.push(_a73);
}
}
}
return _a6f;
},isPermanent:function(){
return true;
},getMaximumSize:function(){
return _a65.storage.SIZE_NO_LIMIT;
},hasSettingsUI:function(){
return false;
},isValidKey:function(_a74){
if(_a74===null||_a74===undefined){
return false;
}
return /^[0-9A-Za-z_-]*$/.test(_a74);
},isValidNamespace:function(_a75){
if(_a75===null||_a75===undefined){
return false;
}
return /^[0-9A-Za-z-]*$/.test(_a75);
},getFullKey:function(key,_a76){
return "__"+_a76+"_"+key;
},_beginsWith:function(_a77,_a78){
if(_a78.length>_a77.length){
return false;
}
return _a77.substring(0,_a78.length)===_a78;
},_assertIsValidNamespace:function(_a79){
if(this.isValidNamespace(_a79)===false){
throw new Error("Invalid namespace given: "+_a79);
}
},_assertIsValidKey:function(key){
if(this.isValidKey(key)===false){
throw new Error("Invalid key given: "+key);
}
}});
_a65.storage.manager.register("dojox.storage.LocalStorageProvider",new _a65.storage.LocalStorageProvider());
});
},"curam/util/TabActionsMenu":function(){
define("curam/util/TabActionsMenu",["curam/tab","curam/debug","curam/define","curam/util","curam/util/Refresh","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _a7a=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.TabActionsMenu",{_tabMenuStates:{},getRefreshParams:function(_a7b){
curam.debug.log("curam.util.TabActionsMenu.getRefreshParams(%s)",_a7b);
if(!curam.util.TabActionsMenu.dynamicMenuBarData[_a7b]){
curam.debug.log(_a7a.getProperty("curam.util.TabActionsMenu.no.dynamic"));
return null;
}
var _a7c="menuId="+curam.util.TabActionsMenu.dynamicMenuBarData[_a7b].menuBarId;
_a7c+="&menuItemIds="+curam.util.toCommaSeparatedList(curam.util.TabActionsMenu.dynamicMenuBarData[_a7b].dynamicMenuItemIds);
_a7c+="&menuLoaders="+curam.util.toCommaSeparatedList(curam.util.TabActionsMenu.dynamicMenuBarData[_a7b].dynamicMenuLoaders);
_a7c+="&menuPageParameters="+curam.util.TabActionsMenu.dynamicMenuBarData[_a7b].pageParameters;
return _a7c;
},updateMenuItemStates:function(_a7d,data){
var _a7e=data.menuData;
var _a7f=function(){
for(var i=0;i<_a7e.itemStates.length;i++){
curam.util.TabActionsMenu.updateMenuItemState(_a7e.itemStates[i],_a7d);
}
};
if(curam.util.TabActionsMenu._isMenuCreated(_a7d)){
_a7f();
}else{
var _a80=curam.util.getTopmostWindow();
var _a81=_a80.dojo.subscribe("/curam/menu/created",this,function(_a82){
curam.debug.log("Received /curam/menu/created "+_a7a.getProperty("curam.util.ExpandableLists.load.for"),_a82);
if(_a82==_a7d){
curam.debug.log(_a7a.getProperty("curam.util.TabActionsMenu.match"));
curam.util.TabActionsMenu._tabMenuStates[_a82]=true;
_a7f();
_a80.dojo.unsubscribe(_a81);
}
});
curam.tab.unsubscribeOnTabClose(_a81,_a7d);
}
},_isMenuCreated:function(_a83){
return curam.util.TabActionsMenu._tabMenuStates[_a83]==true;
},updateMenuItemState:function(_a84,_a85){
var _a86=dijit.byId("menuItem_"+_a85+"_"+_a84.id);
if(_a86!=null){
_a86.disabled=!_a84.enabled;
curam.util.swapState(_a86.domNode,_a84.enabled,"enabled","disabled");
curam.util.swapState(_a86.domNode,_a84.visible,"visible","hidden");
if(_a86.disabled){
_a86.domNode.setAttribute("aria-disabled","true");
}
}
},setupHandlers:function(_a87){
curam.util.Refresh.setMenuBarCallbacks(curam.util.TabActionsMenu.updateMenuItemStates,curam.util.TabActionsMenu.getRefreshParams);
var _a88=function(){
var _a89=function(_a8a,_a8b){
return curam.util.Refresh.refreshMenuAndNavigation(_a8b,true,true,true);
};
var _a8c=curam.tab.getHandlerForTab(_a89,_a87);
var _a8d=curam.util.getTopmostWindow();
var _a8e=_a8d.dojo.subscribe("curam.tabOpened",null,function(_a8f,_a90){
_a8c(_a8f,_a90);
_a8d.dojo.unsubscribe(_a8e);
});
};
curam.util.TabActionsMenu.dynamicMenuBarData[_a87].registerTabOpenHandler=_a88;
curam.util.TabActionsMenu.dynamicMenuBarData[_a87].registerTabOpenHandler();
curam.tab.executeOnTabClose(function(){
curam.util.TabActionsMenu.dynamicMenuBarData[_a87].registerTabOpenHandler=null;
delete curam.util.TabActionsMenu.dynamicMenuBarData[_a87];
},_a87);
},handleOnClick:function(url,_a91){
if(_a91){
curam.tab.getTabController().handleDownLoadClick(url);
}else{
curam.tab.getTabController().handleLinkClick(url);
}
},handleOnClickModal:function(url,_a92){
var _a93={dialogOptions:_a92};
curam.tab.getTabController().handleLinkClick(url,_a93);
}});
return curam.util.TabActionsMenu;
});
},"dijit/tree/TreeStoreModel":function(){
define("dijit/tree/TreeStoreModel",["dojo/_base/array","dojo/aspect","dojo/_base/declare","dojo/_base/json","dojo/_base/lang"],function(_a94,_a95,_a96,json,lang){
return _a96("dijit.tree.TreeStoreModel",null,{store:null,childrenAttrs:["children"],newItemIdAttr:"id",labelAttr:"",root:null,query:null,deferItemLoadingUntilExpand:false,constructor:function(args){
lang.mixin(this,args);
this.connects=[];
var _a97=this.store;
if(!_a97.getFeatures()["dojo.data.api.Identity"]){
throw new Error("dijit.Tree: store must support dojo.data.Identity");
}
if(_a97.getFeatures()["dojo.data.api.Notification"]){
this.connects=this.connects.concat([_a95.after(_a97,"onNew",lang.hitch(this,"onNewItem"),true),_a95.after(_a97,"onDelete",lang.hitch(this,"onDeleteItem"),true),_a95.after(_a97,"onSet",lang.hitch(this,"onSetItem"),true)]);
}
},destroy:function(){
var h;
while(h=this.connects.pop()){
h.remove();
}
},getRoot:function(_a98,_a99){
if(this.root){
_a98(this.root);
}else{
this.store.fetch({query:this.query,onComplete:lang.hitch(this,function(_a9a){
if(_a9a.length!=1){
throw new Error(this.declaredClass+": query "+json.stringify(this.query)+" returned "+_a9a.length+" items, but must return exactly one item");
}
this.root=_a9a[0];
_a98(this.root);
}),onError:_a99});
}
},mayHaveChildren:function(item){
return _a94.some(this.childrenAttrs,function(attr){
return this.store.hasAttribute(item,attr);
},this);
},getChildren:function(_a9b,_a9c,_a9d){
var _a9e=this.store;
if(!_a9e.isItemLoaded(_a9b)){
var _a9f=lang.hitch(this,arguments.callee);
_a9e.loadItem({item:_a9b,onItem:function(_aa0){
_a9f(_aa0,_a9c,_a9d);
},onError:_a9d});
return;
}
var _aa1=[];
for(var i=0;i<this.childrenAttrs.length;i++){
var vals=_a9e.getValues(_a9b,this.childrenAttrs[i]);
_aa1=_aa1.concat(vals);
}
var _aa2=0;
if(!this.deferItemLoadingUntilExpand){
_a94.forEach(_aa1,function(item){
if(!_a9e.isItemLoaded(item)){
_aa2++;
}
});
}
if(_aa2==0){
_a9c(_aa1);
}else{
_a94.forEach(_aa1,function(item,idx){
if(!_a9e.isItemLoaded(item)){
_a9e.loadItem({item:item,onItem:function(item){
_aa1[idx]=item;
if(--_aa2==0){
_a9c(_aa1);
}
},onError:_a9d});
}
});
}
},isItem:function(_aa3){
return this.store.isItem(_aa3);
},fetchItemByIdentity:function(_aa4){
this.store.fetchItemByIdentity(_aa4);
},getIdentity:function(item){
return this.store.getIdentity(item);
},getLabel:function(item){
if(this.labelAttr){
return this.store.getValue(item,this.labelAttr);
}else{
return this.store.getLabel(item);
}
},newItem:function(args,_aa5,_aa6){
var _aa7={parent:_aa5,attribute:this.childrenAttrs[0]},_aa8;
if(this.newItemIdAttr&&args[this.newItemIdAttr]){
this.fetchItemByIdentity({identity:args[this.newItemIdAttr],scope:this,onItem:function(item){
if(item){
this.pasteItem(item,null,_aa5,true,_aa6);
}else{
_aa8=this.store.newItem(args,_aa7);
if(_aa8&&(_aa6!=undefined)){
this.pasteItem(_aa8,_aa5,_aa5,false,_aa6);
}
}
}});
}else{
_aa8=this.store.newItem(args,_aa7);
if(_aa8&&(_aa6!=undefined)){
this.pasteItem(_aa8,_aa5,_aa5,false,_aa6);
}
}
},pasteItem:function(_aa9,_aaa,_aab,_aac,_aad){
var _aae=this.store,_aaf=this.childrenAttrs[0];
if(_aaa){
_a94.forEach(this.childrenAttrs,function(attr){
if(_aae.containsValue(_aaa,attr,_aa9)){
if(!_aac){
var _ab0=_a94.filter(_aae.getValues(_aaa,attr),function(x){
return x!=_aa9;
});
_aae.setValues(_aaa,attr,_ab0);
}
_aaf=attr;
}
});
}
if(_aab){
if(typeof _aad=="number"){
var _ab1=_aae.getValues(_aab,_aaf).slice();
_ab1.splice(_aad,0,_aa9);
_aae.setValues(_aab,_aaf,_ab1);
}else{
_aae.setValues(_aab,_aaf,_aae.getValues(_aab,_aaf).concat(_aa9));
}
}
},onChange:function(){
},onChildrenChange:function(){
},onDelete:function(){
},onNewItem:function(item,_ab2){
if(!_ab2){
return;
}
this.getChildren(_ab2.item,lang.hitch(this,function(_ab3){
this.onChildrenChange(_ab2.item,_ab3);
}));
},onDeleteItem:function(item){
this.onDelete(item);
},onSetItem:function(item,_ab4){
if(_a94.indexOf(this.childrenAttrs,_ab4)!=-1){
this.getChildren(item,lang.hitch(this,function(_ab5){
this.onChildrenChange(item,_ab5);
}));
}else{
this.onChange(item);
}
}});
});
},"curam/layout/ScrollingTabController":function(){
define("curam/layout/ScrollingTabController",["dijit/layout/ScrollingTabController","curam/debug"],function(_ab6){
var _ab7=dojo.declare("curam.layout.ScrollingTabController",_ab6,{onStartup:function(){
this.inherited(arguments);
this.updateTabStyle();
},updateTabStyle:function(){
var kids=this.getChildren();
curam.debug.log("curam.layout.ScrollingTabController.updateTabStyle kids = ",this.domNode);
dojo.forEach(kids,function(_ab8,_ab9,_aba){
dojo.removeClass(_ab8.domNode,["first-class","last-class"]);
if(_ab9==0){
dojo.addClass(_ab8.domNode,"first");
}else{
if(_ab9==_aba.length-1){
dojo.addClass(_ab8.domNode,"last");
}
}
});
var _abb=dojo.query(".nowrapTabStrip",this.domNode)[0];
dojo.replaceClass(_abb,"nowrapSecTabStrip","nowrapTabStrip");
var _abc=document.createElement("div");
dojo.addClass(_abc,"block-slope");
dojo.addClass(_abc,"dijitTab");
_abc.innerHTML="&#x200B;";
_abb.appendChild(_abc);
}});
return _ab7;
});
},"url:dijit/templates/TooltipDialog.html":"<div role=\"presentation\" tabIndex=\"-1\">\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" data-dojo-attach-point=\"containerNode\" role=\"dialog\"></div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\"></div>\n</div>\n","dojo/dnd/TimedMoveable":function(){
define("dojo/dnd/TimedMoveable",["../main","./Moveable"],function(dojo){
var _abd=dojo.dnd.Moveable.prototype.onMove;
dojo.declare("dojo.dnd.TimedMoveable",dojo.dnd.Moveable,{timeout:40,constructor:function(node,_abe){
if(!_abe){
_abe={};
}
if(_abe.timeout&&typeof _abe.timeout=="number"&&_abe.timeout>=0){
this.timeout=_abe.timeout;
}
},onMoveStop:function(_abf){
if(_abf._timer){
clearTimeout(_abf._timer);
_abd.call(this,_abf,_abf._leftTop);
}
dojo.dnd.Moveable.prototype.onMoveStop.apply(this,arguments);
},onMove:function(_ac0,_ac1){
_ac0._leftTop=_ac1;
if(!_ac0._timer){
var _ac2=this;
_ac0._timer=setTimeout(function(){
_ac0._timer=null;
_abd.call(_ac2,_ac0,_ac0._leftTop);
},this.timeout);
}
}});
return dojo.dnd.TimedMoveable;
});
},"dojox/storage/BehaviorStorageProvider":function(){
define("dojox/storage/BehaviorStorageProvider",["dijit","dojo","dojox","dojo/require!dojox/storage/Provider,dojox/storage/manager"],function(_ac3,dojo,_ac4){
dojo.provide("dojox.storage.BehaviorStorageProvider");
dojo.require("dojox.storage.Provider");
dojo.require("dojox.storage.manager");
dojo.declare("dojox.storage.BehaviorStorageProvider",[_ac4.storage.Provider],{store:null,storeName:"__dojox_BehaviorStorage",keys:[],initialize:function(){
try{
this.store=this._createStore();
this.store.load(this.storeName);
}
catch(e){
throw new Error("Store is not available: "+e);
}
var keys=this.get("keys","dojoxSystemNS");
this.keys=keys||[];
this.initialized=true;
_ac4.storage.manager.loaded();
},isAvailable:function(){
return dojo.isIE&&dojo.isIE>=5;
},_createStore:function(){
var _ac5=dojo.create("link",{id:this.storeName+"Node",style:{"display":"none"}},dojo.query("head")[0]);
_ac5.addBehavior("#default#userdata");
return _ac5;
},put:function(key,_ac6,_ac7,_ac8){
this._assertIsValidKey(key);
_ac8=_ac8||this.DEFAULT_NAMESPACE;
this._assertIsValidNamespace(_ac8);
var _ac9=this.getFullKey(key,_ac8);
_ac6=dojo.toJson(_ac6);
this.store.setAttribute(_ac9,_ac6);
this.store.save(this.storeName);
var _aca=this.store.getAttribute(_ac9)===_ac6;
if(_aca){
this._addKey(_ac9);
this.store.setAttribute("__dojoxSystemNS_keys",dojo.toJson(this.keys));
this.store.save(this.storeName);
}
if(_ac7){
_ac7(_aca?this.SUCCESS:this.FAILED,key,null,_ac8);
}
},get:function(key,_acb){
this._assertIsValidKey(key);
_acb=_acb||this.DEFAULT_NAMESPACE;
this._assertIsValidNamespace(_acb);
key=this.getFullKey(key,_acb);
return dojo.fromJson(this.store.getAttribute(key));
},getKeys:function(_acc){
_acc=_acc||this.DEFAULT_NAMESPACE;
this._assertIsValidNamespace(_acc);
_acc="__"+_acc+"_";
var keys=[];
for(var i=0;i<this.keys.length;i++){
var _acd=this.keys[i];
if(this._beginsWith(_acd,_acc)){
_acd=_acd.substring(_acc.length);
keys.push(_acd);
}
}
return keys;
},clear:function(_ace){
_ace=_ace||this.DEFAULT_NAMESPACE;
this._assertIsValidNamespace(_ace);
_ace="__"+_ace+"_";
var keys=[];
for(var i=0;i<this.keys.length;i++){
var _acf=this.keys[i];
if(this._beginsWith(_acf,_ace)){
keys.push(_acf);
}
}
dojo.forEach(keys,function(key){
this.store.removeAttribute(key);
this._removeKey(key);
},this);
this.put("keys",this.keys,null,"dojoxSystemNS");
this.store.save(this.storeName);
},remove:function(key,_ad0){
this._assertIsValidKey(key);
_ad0=_ad0||this.DEFAULT_NAMESPACE;
this._assertIsValidNamespace(_ad0);
key=this.getFullKey(key,_ad0);
this.store.removeAttribute(key);
this._removeKey(key);
this.put("keys",this.keys,null,"dojoxSystemNS");
this.store.save(this.storeName);
},getNamespaces:function(){
var _ad1=[this.DEFAULT_NAMESPACE];
var _ad2={};
_ad2[this.DEFAULT_NAMESPACE]=true;
var _ad3=/^__([^_]*)_/;
for(var i=0;i<this.keys.length;i++){
var _ad4=this.keys[i];
if(_ad3.test(_ad4)==true){
var _ad5=_ad4.match(_ad3)[1];
if(typeof _ad2[_ad5]=="undefined"){
_ad2[_ad5]=true;
_ad1.push(_ad5);
}
}
}
return _ad1;
},isPermanent:function(){
return true;
},getMaximumSize:function(){
return 64;
},hasSettingsUI:function(){
return false;
},isValidKey:function(_ad6){
if(_ad6===null||_ad6===undefined){
return false;
}
return /^[0-9A-Za-z_-]*$/.test(_ad6);
},isValidNamespace:function(_ad7){
if(_ad7===null||_ad7===undefined){
return false;
}
return /^[0-9A-Za-z-]*$/.test(_ad7);
},getFullKey:function(key,_ad8){
return "__"+_ad8+"_"+key;
},_beginsWith:function(_ad9,_ada){
if(_ada.length>_ad9.length){
return false;
}
return _ad9.substring(0,_ada.length)===_ada;
},_assertIsValidNamespace:function(_adb){
if(this.isValidNamespace(_adb)===false){
throw new Error("Invalid namespace given: "+_adb);
}
},_assertIsValidKey:function(key){
if(this.isValidKey(key)===false){
throw new Error("Invalid key given: "+key);
}
},_addKey:function(key){
this._removeKey(key);
this.keys.push(key);
},_removeKey:function(key){
this.keys=dojo.filter(this.keys,function(item){
return item!==key;
},this);
}});
_ac4.storage.manager.register("dojox.storage.BehaviorStorageProvider",new _ac4.storage.BehaviorStorageProvider());
});
},"url:dijit/layout/templates/TabContainer.html":"<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" data-dojo-attach-point=\"containerNode\"></div>\n</div>\n","dijit/hccss":function(){
define("dijit/hccss",["require","dojo/_base/config","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/ready","dojo/_base/sniff","dojo/_base/window"],function(_adc,_add,_ade,_adf,_ae0,_ae1,has,win){
if(has("ie")||has("mozilla")){
_ae1(90,function(){
var div=_adf.create("div",{id:"a11yTestNode",style:{cssText:"border: 1px solid;"+"border-color:red green;"+"position: absolute;"+"height: 5px;"+"top: -999px;"+"background-image: url(\""+(_add.blankGif||_adc.toUrl("dojo/resources/blank.gif"))+"\");"}},win.body());
var cs=_ae0.getComputedStyle(div);
if(cs){
var _ae2=cs.backgroundImage;
var _ae3=(cs.borderTopColor==cs.borderRightColor)||(_ae2!=null&&(_ae2=="none"||_ae2=="url(invalid-url:)"));
if(_ae3){
_ade.add(win.body(),"dijit_a11y");
}
if(has("ie")){
div.outerHTML="";
}else{
win.body().removeChild(div);
}
}
});
}
});
},"dijit/popup":function(){
define("dijit/popup",["dojo/_base/array","dojo/aspect","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/window","./place","./BackgroundIframe","."],function(_ae4,_ae5,_ae6,_ae7,dom,_ae8,_ae9,_aea,_aeb,_aec,has,keys,lang,on,win,_aed,_aee,_aef){
function _af0(){
if(this._popupWrapper){
_ae9.destroy(this._popupWrapper);
delete this._popupWrapper;
}
};
var _af1=_ae7(null,{_stack:[],_beginZIndex:1000,_idGen:1,_createWrapper:function(_af2){
var _af3=_af2._popupWrapper,node=_af2.domNode;
if(!_af3){
_af3=_ae9.create("div",{"class":"dijitPopup",style:{display:"none"},role:"presentation"},win.body());
_af3.appendChild(node);
var s=node.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
_af2._popupWrapper=_af3;
_ae5.after(_af2,"destroy",_af0,true);
}
return _af3;
},moveOffScreen:function(_af4){
var _af5=this._createWrapper(_af4);
_aeb.set(_af5,{visibility:"hidden",top:"-9999px",display:""});
},hide:function(_af6){
var _af7=this._createWrapper(_af6);
_aeb.set(_af7,"display","none");
},getTopPopup:function(){
var _af8=this._stack;
for(var pi=_af8.length-1;pi>0&&_af8[pi].parent===_af8[pi-1].widget;pi--){
}
return _af8[pi];
},open:function(args){
var _af9=this._stack,_afa=args.popup,_afb=args.orient||["below","below-alt","above","above-alt"],ltr=args.parent?args.parent.isLeftToRight():_aea.isBodyLtr(),_afc=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+this._idGen++);
while(_af9.length&&(!args.parent||!dom.isDescendant(args.parent.domNode,_af9[_af9.length-1].widget.domNode))){
this.close(_af9[_af9.length-1].widget);
}
var _afd=this._createWrapper(_afa);
_ae8.set(_afd,{id:id,style:{zIndex:this._beginZIndex+_af9.length},"class":"dijitPopup "+(_afa.baseClass||_afa["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:args.parent?args.parent.id:""});
if(has("bgIframe")&&!_afa.bgIframe){
_afa.bgIframe=new _aee(_afd);
}
var best=_afc?_aed.around(_afd,_afc,_afb,ltr,_afa.orient?lang.hitch(_afa,"orient"):null):_aed.at(_afd,args,_afb=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],args.padding);
_afd.style.display="";
_afd.style.visibility="visible";
_afa.domNode.style.visibility="visible";
var _afe=[];
_afe.push(on(_afd,_ae6._keypress,lang.hitch(this,function(evt){
if(evt.charOrCode==keys.ESCAPE&&args.onCancel){
_aec.stop(evt);
args.onCancel();
}else{
if(evt.charOrCode===keys.TAB){
_aec.stop(evt);
var _aff=this.getTopPopup();
if(_aff&&_aff.onCancel){
_aff.onCancel();
}
}
}
})));
if(_afa.onCancel&&args.onCancel){
_afe.push(_afa.on("cancel",args.onCancel));
}
_afe.push(_afa.on(_afa.onExecute?"execute":"change",lang.hitch(this,function(){
var _b00=this.getTopPopup();
if(_b00&&_b00.onExecute){
_b00.onExecute();
}
})));
_af9.push({widget:_afa,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:_afe});
if(_afa.onOpen){
_afa.onOpen(best);
}
return best;
},close:function(_b01){
var _b02=this._stack;
while((_b01&&_ae4.some(_b02,function(elem){
return elem.widget==_b01;
}))||(!_b01&&_b02.length)){
var top=_b02.pop(),_b03=top.widget,_b04=top.onClose;
if(_b03.onClose){
_b03.onClose();
}
var h;
while(h=top.handlers.pop()){
h.remove();
}
if(_b03&&_b03.domNode){
this.hide(_b03);
}
if(_b04){
_b04();
}
}
}});
return (_aef.popup=new _af1());
});
},"dijit/layout/TabContainer":function(){
define("dijit/layout/TabContainer",["dojo/_base/lang","dojo/_base/declare","./_TabContainerBase","./TabController","./ScrollingTabController"],function(lang,_b05,_b06,_b07,_b08){
return _b05("dijit.layout.TabContainer",_b06,{useMenu:true,useSlider:true,controllerWidget:"",_makeController:function(_b09){
var cls=this.baseClass+"-tabs"+(this.doLayout?"":" dijitTabNoLayout"),_b07=lang.getObject(this.controllerWidget);
return new _b07({id:this.id+"_tablist",dir:this.dir,lang:this.lang,textDir:this.textDir,tabPosition:this.tabPosition,doLayout:this.doLayout,containerId:this.id,"class":cls,nested:this.nested,useMenu:this.useMenu,useSlider:this.useSlider,tabStripClass:this.tabStrip?this.baseClass+(this.tabStrip?"":"No")+"Strip":null},_b09);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.controllerWidget){
this.controllerWidget=(this.tabPosition=="top"||this.tabPosition=="bottom")&&!this.nested?"dijit.layout.ScrollingTabController":"dijit.layout.TabController";
}
}});
});
},"dijit/form/_FormValueWidget":function(){
define("dijit/form/_FormValueWidget",["dojo/_base/declare","dojo/_base/sniff","./_FormWidget","./_FormValueMixin"],function(_b0a,has,_b0b,_b0c){
return _b0a("dijit.form._FormValueWidget",[_b0b,_b0c],{_layoutHackIE7:function(){
if(has("ie")==7){
var _b0d=this.domNode;
var _b0e=_b0d.parentNode;
var _b0f=_b0d.firstChild||_b0d;
var _b10=_b0f.style.filter;
var _b11=this;
while(_b0e&&_b0e.clientHeight==0){
(function ping(){
var _b12=_b11.connect(_b0e,"onscroll",function(){
_b11.disconnect(_b12);
_b0f.style.filter=(new Date()).getMilliseconds();
setTimeout(function(){
_b0f.style.filter=_b10;
},0);
});
})();
_b0e=_b0e.parentNode;
}
}
}});
});
},"dijit/_BidiSupport":function(){
define("dijit/_BidiSupport",["./_WidgetBase"],function(_b13){
_b13.extend({getTextDir:function(text){
return this.textDir=="auto"?this._checkContextual(text):this.textDir;
},_checkContextual:function(text){
var fdc=/[A-Za-z\u05d0-\u065f\u066a-\u06ef\u06fa-\u07ff\ufb1d-\ufdff\ufe70-\ufefc]/.exec(text);
return fdc?(fdc[0]<="z"?"ltr":"rtl"):this.dir?this.dir:this.isLeftToRight()?"ltr":"rtl";
},applyTextDir:function(_b14,text){
var _b15=this.textDir=="auto"?this._checkContextual(text):this.textDir;
if(_b14.dir!=_b15){
_b14.dir=_b15;
}
}});
return _b13;
});
},"curam/util/UimDialog":function(){
define("curam/util/UimDialog",["curam/util/RuntimeContext","curam/util/external","curam/util","curam/define","curam/dialog","curam/util/DialogObject"],function(_b16,_b17){
curam.define.singleton("curam.util.UimDialog",{open:function(path,_b18,_b19){
var url=path+curam.util.makeQueryString(_b18);
return this.openUrl(url,_b19);
},openUrl:function(url,_b1a){
var _b1b=curam.util.getCacheBusterParameter();
var _b1c=new curam.util.DialogObject(_b1b);
var _b1d=null;
if(_b1a){
_b1d="width="+_b1a.width+",height="+_b1a.height;
}
curam.util.openModalDialog({href:this._addRpu(url)},_b1d,null,null,_b1b);
return _b1c;
},_addRpu:function(url){
var _b1e=url;
if(curam.tab.inTabbedUI()){
var _b1f=curam.tab.getContentPanelIframe();
if(_b1f){
_b1e=curam.util.setRpu(url,new _b16(_b1f.contentWindow));
}
}else{
if(_b17.inExternalApp()){
var _b20=_b17.getUimParentWindow();
if(_b20){
_b1e=curam.util.setRpu(url,new _b16(_b20));
}
}
}
return _b1e;
},get:function(){
if(curam.dialog._id==null){
throw "Dialog infrastructure not ready.";
}
return new curam.util.DialogObject(null,curam.dialog._id);
},ready:function(_b21){
if(curam.dialog._id==null){
dojo.subscribe("/curam/dialog/ready",_b21);
}else{
_b21();
}
},_getDialogFrameWindow:function(_b22){
var _b23=window.top.dijit.byId(_b22);
return _b23.uimController.getIFrame().contentWindow;
}});
return curam.util.UimDialog;
});
},"dijit/tree/_dndContainer":function(){
define("dijit/tree/_dndContainer",["dojo/aspect","dojo/_base/declare","dojo/dom-class","dojo/_base/event","dojo/_base/lang","dojo/mouse","dojo/on"],function(_b24,_b25,_b26,_b27,lang,_b28,on){
return _b25("dijit.tree._dndContainer",null,{constructor:function(tree,_b29){
this.tree=tree;
this.node=tree.domNode;
lang.mixin(this,_b29);
this.current=null;
this.containerState="";
_b26.add(this.node,"dojoDndContainer");
this.events=[on(this.node,_b28.enter,lang.hitch(this,"onOverEvent")),on(this.node,_b28.leave,lang.hitch(this,"onOutEvent")),_b24.after(this.tree,"_onNodeMouseEnter",lang.hitch(this,"onMouseOver"),true),_b24.after(this.tree,"_onNodeMouseLeave",lang.hitch(this,"onMouseOut"),true),on(this.node,"dragstart",lang.hitch(_b27,"stop")),on(this.node,"selectstart",lang.hitch(_b27,"stop"))];
},destroy:function(){
var h;
while(h=this.events.pop()){
h.remove();
}
this.node=this.parent=null;
},onMouseOver:function(_b2a){
this.current=_b2a;
},onMouseOut:function(){
this.current=null;
},_changeState:function(type,_b2b){
var _b2c="dojoDnd"+type;
var _b2d=type.toLowerCase()+"State";
_b26.replace(this.node,_b2c+_b2b,_b2c+this[_b2d]);
this[_b2d]=_b2b;
},_addItemClass:function(node,type){
_b26.add(node,"dojoDndItem"+type);
},_removeItemClass:function(node,type){
_b26.remove(node,"dojoDndItem"+type);
},onOverEvent:function(){
this._changeState("Container","Over");
},onOutEvent:function(){
this._changeState("Container","");
}});
});
},"dijit/focus":function(){
define("dijit/focus",["dojo/aspect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/Evented","dojo/_base/lang","dojo/on","dojo/ready","dojo/_base/sniff","dojo/Stateful","dojo/_base/unload","dojo/_base/window","dojo/window","./a11y","./registry","."],function(_b2e,_b2f,dom,_b30,_b31,_b32,lang,on,_b33,has,_b34,_b35,win,_b36,a11y,_b37,_b38){
var _b39=_b2f([_b34,_b32],{curNode:null,activeStack:[],constructor:function(){
var _b3a=lang.hitch(this,function(node){
if(dom.isDescendant(this.curNode,node)){
this.set("curNode",null);
}
if(dom.isDescendant(this.prevNode,node)){
this.set("prevNode",null);
}
});
_b2e.before(_b31,"empty",_b3a);
_b2e.before(_b31,"destroy",_b3a);
},registerIframe:function(_b3b){
return this.registerWin(_b3b.contentWindow,_b3b);
},registerWin:function(_b3c,_b3d){
var _b3e=this;
var _b3f=function(evt){
_b3e._justMouseDowned=true;
setTimeout(function(){
_b3e._justMouseDowned=false;
},0);
if(has("ie")&&evt&&evt.srcElement&&evt.srcElement.parentNode==null){
return;
}
_b3e._onTouchNode(_b3d||evt.target||evt.srcElement,"mouse");
};
var doc=has("ie")?_b3c.document.documentElement:_b3c.document;
if(doc){
if(has("ie")){
_b3c.document.body.attachEvent("onmousedown",_b3f);
var _b40=function(evt){
var tag=evt.srcElement.tagName.toLowerCase();
if(tag=="#document"||tag=="body"){
return;
}
if(a11y.isTabNavigable(evt.srcElement)){
_b3e._onFocusNode(_b3d||evt.srcElement);
}else{
_b3e._onTouchNode(_b3d||evt.srcElement);
}
};
doc.attachEvent("onactivate",_b40);
var _b41=function(evt){
_b3e._onBlurNode(_b3d||evt.srcElement);
};
doc.attachEvent("ondeactivate",_b41);
return {remove:function(){
_b3c.document.detachEvent("onmousedown",_b3f);
doc.detachEvent("onactivate",_b40);
doc.detachEvent("ondeactivate",_b41);
doc=null;
}};
}else{
doc.body.addEventListener("mousedown",_b3f,true);
doc.body.addEventListener("touchstart",_b3f,true);
var _b42=function(evt){
_b3e._onFocusNode(_b3d||evt.target);
};
doc.addEventListener("focus",_b42,true);
var _b43=function(evt){
_b3e._onBlurNode(_b3d||evt.target);
};
doc.addEventListener("blur",_b43,true);
return {remove:function(){
doc.body.removeEventListener("mousedown",_b3f,true);
doc.body.removeEventListener("touchstart",_b3f,true);
doc.removeEventListener("focus",_b42,true);
doc.removeEventListener("blur",_b43,true);
doc=null;
}};
}
}
},_onBlurNode:function(){
this.set("prevNode",this.curNode);
this.set("curNode",null);
if(this._justMouseDowned){
return;
}
if(this._clearActiveWidgetsTimer){
clearTimeout(this._clearActiveWidgetsTimer);
}
this._clearActiveWidgetsTimer=setTimeout(lang.hitch(this,function(){
delete this._clearActiveWidgetsTimer;
this._setStack([]);
this.prevNode=null;
}),100);
},_onTouchNode:function(node,by){
if(this._clearActiveWidgetsTimer){
clearTimeout(this._clearActiveWidgetsTimer);
delete this._clearActiveWidgetsTimer;
}
var _b44=[];
try{
while(node){
var _b45=_b30.get(node,"dijitPopupParent");
if(_b45){
node=_b37.byId(_b45).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===win.body()){
break;
}
node=_b36.get(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId"),_b46=id&&_b37.byId(id);
if(_b46&&!(by=="mouse"&&_b46.get("disabled"))){
_b44.unshift(id);
}
node=node.parentNode;
}
}
}
}
catch(e){
}
this._setStack(_b44,by);
},_onFocusNode:function(node){
if(!node){
return;
}
if(node.nodeType==9){
return;
}
this._onTouchNode(node);
if(node==this.curNode){
return;
}
this.set("curNode",node);
},_setStack:function(_b47,by){
var _b48=this.activeStack;
this.set("activeStack",_b47);
for(var _b49=0;_b49<Math.min(_b48.length,_b47.length);_b49++){
if(_b48[_b49]!=_b47[_b49]){
break;
}
}
var _b4a;
for(var i=_b48.length-1;i>=_b49;i--){
_b4a=_b37.byId(_b48[i]);
if(_b4a){
_b4a._hasBeenBlurred=true;
_b4a.set("focused",false);
if(_b4a._focusManager==this){
_b4a._onBlur(by);
}
this.emit("widget-blur",_b4a,by);
}
}
for(i=_b49;i<_b47.length;i++){
_b4a=_b37.byId(_b47[i]);
if(_b4a){
_b4a.set("focused",true);
if(_b4a._focusManager==this){
_b4a._onFocus(by);
}
this.emit("widget-focus",_b4a,by);
}
}
},focus:function(node){
if(node){
try{
node.focus();
}
catch(e){
}
}
}});
var _b4b=new _b39();
_b33(function(){
var _b4c=_b4b.registerWin(win.doc.parentWindow||win.doc.defaultView);
if(has("ie")){
_b35.addOnWindowUnload(function(){
_b4c.remove();
_b4c=null;
});
}
});
_b38.focus=function(node){
_b4b.focus(node);
};
for(var attr in _b4b){
if(!/^_/.test(attr)){
_b38.focus[attr]=typeof _b4b[attr]=="function"?lang.hitch(_b4b,attr):_b4b[attr];
}
}
_b4b.watch(function(attr,_b4d,_b4e){
_b38.focus[attr]=_b4e;
});
return _b4b;
});
},"curam/util/ExpandableLists":function(){
define("curam/util/ExpandableLists",["curam/util","curam/debug","curam/UIMController","curam/util/ui/refresh/RefreshEvent","curam/define","curam/contentPanel","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _b4f=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.ExpandableLists",{_minimumExpandedHeight:[],stateData:[],_LIST_ID_PREFIX:"list-id-",_ROW_ID_PREFIX:"row-id-",_EVENT_TOGGLE:"/curam/list/row/toggle",_EVENT_TYPE_EXPANDED:"Expanded",_EVENT_TYPE_COLLAPSED:"Collapsed",setupToggleHandler:function(){
dojo.ready(function(){
var _b50=curam.util.ExpandableLists;
var _b51=function(_b52,_b53,_b54){
curam.debug.log(_b4f.getProperty("curam.util.ExpandableLists.event",[_b54,_b52,_b53]));
if(_b54==_b50._EVENT_TYPE_EXPANDED){
var _b55=_b50._getListData(_b52);
var _b56=dojo.filter(_b55.expandedRows,function(item){
return item==_b53;
});
if(_b56.length==0){
_b55.expandedRows.push(_b53);
}
}else{
var _b55=_b50._getListData(_b52);
_b55.expandedRows=dojo.filter(_b55.expandedRows,function(item){
return item!=_b53;
});
if(_b55.expandedRows.length==0){
_b50._removeListData(_b52);
}
}
curam.debug.log("curam.util.ExpandableLists.setupToggleHandler stateData: ",_b50.stateData);
};
dojo.subscribe(_b50._EVENT_TOGGLE,this,_b51);
dojo.subscribe("/curam/page/refresh",this,_b50._saveStateData);
});
},_saveStateData:function(){
var _b57=curam.util.ExpandableLists;
curam.debug.log("/curam/page/refresh"+_b4f.getProperty("curam.util.ExpandableLists.refresh"),_b57.stateData);
curam.util.runStorageFn(function(){
try{
dojo.forEach(_b57.stateData,function(item){
var data=dojo.toJson(item);
curam.debug.log(_b4f.getProperty("curam.util.ExpandableLists.exception"),data);
var _b58=curam.util.getTopmostWindow().dojox;
_b58.storage.put(_b57._sanitizeKey(item.listId),data);
});
}
catch(e){
curam.debug.log(_b4f.getProperty("curam.util.ExpandableLists.exception"),e);
}
});
},_sanitizeKey:function(key){
return key.replace("-","_");
},loadStateData:function(_b59){
if(typeof (window.curamDialogRedirecting)!="undefined"){
curam.debug.log("curam.util.ExpandableLists.loadStateData "+_b4f.getProperty("curam.util.ExpandableLists.load.exit"));
return;
}
var _b5a=curam.util.ExpandableLists;
var _b5b=function(){
curam.debug.log("curam.util.ExpandableLists.loadStateData "+ +_b4f.getProperty("curam.util.ExpandableLists.load.for"),_b59);
var _b5c=curam.util.getTopmostWindow().dojox;
var _b5d=_b5c.storage.get(_b5a._sanitizeKey(_b59));
if(_b5d&&_b5d!=""){
var _b5e=dojo.fromJson(_b5d);
var _b5f=dojo.query("table."+_b5a._LIST_ID_PREFIX+_b59);
dojo.forEach(_b5e.expandedRows,function(item){
curam.debug.log(_b4f.getProperty("curam.util.ExpandableLists.load.row"),item);
var _b60=dojo.query("tr."+_b5a._ROW_ID_PREFIX+item,_b5f[0]);
if(_b60.length>0){
var _b61=dojo.query("a.list-details-row-toggle",cm.prevSibling(_b60[0],"tr"));
if(_b61.length==1){
_b5a._toggleDetailsRow(_b61[0]);
}else{
curam.debug.log(_b4f.getProperty("curam.util.ExpandableLists.load.button"+".disabled"));
}
}else{
curam.debug.log(_b4f.getProperty("curam.util.ExpandableLists.load.row.disabled"));
}
});
_b5c.storage.put(_b5a._sanitizeKey(_b59),"");
}else{
curam.debug.log(_b4f.getProperty("curam.util.ExpandableLists.load.no.data"));
}
};
dojo.ready(function(){
curam.util.runStorageFn(_b5b);
});
},_getListData:function(_b62){
var _b63=curam.util.ExpandableLists.stateData;
var _b64=dojo.filter(_b63,function(item){
return item.listId==_b62;
});
if(_b64.length==0){
_b64.push({listId:_b62,expandedRows:[]});
_b63.push(_b64[0]);
}
return _b64[0];
},_removeListData:function(_b65){
var _b66=curam.util.ExpandableLists;
_b66.stateData=dojo.filter(_b66.stateData,function(item){
return item.listId!=_b65;
});
},toggleListDetailsRow:function(_b67){
if(_b67){
_b67=dojo.fixEvent(_b67);
dojo.stopEvent(_b67);
var _b68=_b67.currentTarget;
curam.util.ExpandableLists._toggleDetailsRow(_b68);
}
},_generateUimController:function(_b69){
var _b6a=dojo.query("td",_b69)[0];
var _b6b=dojo.query("div",_b69)[0];
var _b6c=new curam.UIMController({uid:dojo.attr(_b6b,"uid"),url:dojo.attr(_b6b,"url"),iframeId:dojo.attr(_b6b,"iframeId"),iframeClassList:dojo.attr(_b6b,"iframeClassList"),loadFrameOnCreate:dojo.attr(_b6b,"loadFrameOnCreate")});
_b6a.appendChild(_b6c.domNode);
if(_b6b&&_b6a){
_b6a.removeChild(_b6b);
}
return _b6c;
},_toggleDetailsRow:function(_b6d){
curam.debug.log("curam.util.ExpandableLists._toggleDetailsRow "+_b4f.getProperty("curam.util.ExpandableLists.load.for"),_b6d);
var _b6e=curam.util.ExpandableLists;
var _b6f=cm.getParentByType(_b6d,"tr");
var _b70=cm.nextSibling(_b6f,"tr");
var _b71=!_b6e.isDetailsRowExpanded(_b70);
_b6e._handleStripingAndRoundedCorners(_b6f,_b70,_b71);
var _b72=dojo.query("div.uimController",_b70);
var _b73=null;
var _b74=null;
if(_b72==null||_b72.length==0){
_b74=_b6e._generateUimController(_b70);
}else{
_b73=_b72[0];
_b74=dijit.byNode(_b73);
}
if(typeof (_b74)=="undefined"||_b74==null){
throw "UIMController Dijit not found for node: "+_b73;
}
var _b75=dojo.attr(_b74.frame,"src");
var _b76=false;
_b6e.setDetailsRowExpandedState(_b6f,_b70,_b71,_b6d);
var def=new dojo.Deferred();
if(!_b75||_b75==null||_b75==""){
_b74.loadPage(def);
}else{
_b76=true;
def.callback();
}
def.addCallback(function(){
var _b77=_b74.hasInPageNavigation();
_b76=_b76||_b77;
if(_b77){
_b74.showTabContainer(_b71);
}
if(_b76){
curam.util.ExpandableLists.resizeExpandableListAncestors(window);
}
var _b78=_b71?_b6e._EVENT_TYPE_EXPANDED:_b6e._EVENT_TYPE_COLLAPSED;
var _b79=_b6e._findListId(_b70);
var _b7a=curam.util.getSuffixFromClass(_b70,_b6e._ROW_ID_PREFIX);
dojo.publish(_b6e._EVENT_TOGGLE,[_b79,_b7a,_b78]);
if(!curam.util.ExpandableLists._isExternalApp(window)){
var _b78=_b71?"ListDetailsRow.Expand":"ListDetailsRow.Collapse";
var _b7b={url:dojo.attr(_b74.frame,"src"),eventType:_b78};
var _b7c=curam.tab.getSelectedTab();
if(_b7c){
var _b7d=curam.tab.getTabWidgetId(_b7c);
curam.util.getTopmostWindow().dojo.publish("expandedList.toggle",[window.frameElement,_b7b,_b7d]);
}
}
});
},_handleStripingAndRoundedCorners:function(_b7e,_b7f,_b80){
var odd="odd";
var even="even";
var _b81="row-no-border";
var _b82="odd-last-row";
var _b83="even-last-row";
if(!curam.util.ExpandableLists._isLastRow(_b7e,_b7f)){
if(dojo.hasClass(_b7e,odd)){
dojo.addClass(_b7f,odd);
}else{
if(dojo.hasClass(_b7e,even)){
dojo.addClass(_b7f,even);
}
}
}else{
if(_b80){
if(dojo.hasClass(_b7e,_b82)){
dojo.removeClass(_b7e,_b82);
dojo.addClass(_b7e,odd);
dojo.addClass(_b7f,odd);
dojo.addClass(_b7f,_b82);
}else{
if(dojo.hasClass(_b7e,_b83)){
dojo.removeClass(_b7e,_b83);
dojo.addClass(_b7e,even);
dojo.addClass(_b7f,even);
dojo.addClass(_b7f,_b83);
}
}
}else{
if(dojo.hasClass(_b7e,odd)){
dojo.removeClass(_b7e,odd);
dojo.addClass(_b7e,_b82);
dojo.removeClass(_b7f,_b82);
dojo.removeClass(_b7f,odd);
}else{
if(dojo.hasClass(_b7e,even)){
dojo.removeClass(_b7e,even);
dojo.addClass(_b7e,_b83);
dojo.removeClass(_b7f,even);
dojo.removeClass(_b7f,_b83);
}
}
}
}
if(_b80){
dojo.addClass(_b7e,_b81);
}else{
dojo.removeClass(_b7e,_b81);
}
if(dojo.hasClass(_b7e,_b81)){
dojo.removeClass(_b7f,"collapsed");
}else{
dojo.addClass(_b7f,"collapsed");
}
},setDetailsRowExpandedState:function(_b84,_b85,_b86,_b87){
var _b88=curam.util.ExpandableLists.isDetailsRowExpanded(_b85);
dojo.removeClass(_b85,"collapsed");
if(!_b88){
dojo.addClass(_b85,"collapsed");
}
if(_b84.style.display=="none"){
_b85.setAttribute("style","display:none");
}else{
_b85.removeAttribute("style");
}
if(_b87){
if(_b86){
dojo.addClass(_b87,"expanded");
}else{
dojo.removeClass(_b87,"expanded");
}
}
},_isLastRow:function(_b89,_b8a){
return dojo.hasClass(_b89,"even-last-row")||dojo.hasClass(_b89,"odd-last-row")||dojo.hasClass(_b8a,"even-last-row")||dojo.hasClass(_b8a,"odd-last-row");
},isDetailsRowExpanded:function(_b8b){
return !dojo.hasClass(_b8b,"collapsed");
},listRowFrameLoaded:function(_b8c,_b8d){
curam.debug.log("========= "+_b4f.getProperty("curam.util.ExpandableLists.page.load")+" =======");
curam.debug.log(_b8c);
curam.debug.log(dojo.toJson(_b8d));
var _b8e=dojo.byId(_b8c);
if(!_b8e){
throw "List Row Expanded: No iframe found";
}
if(!_b8e._spExpListPageLoadListener){
_b8e._spExpListPageLoadListener="true";
}else{
if(!curam.util.ExpandableLists._isExternalApp(window)){
curam.contentPanel.publishSmartPanelExpListPageLoad(_b8e);
}
}
var _b8f=curam.util.ExpandableLists._findListId(_b8e);
var _b90=curam.util.ExpandableLists.getMinimumExpandedHeight(_b8f);
var _b91=_b8d.height;
if(_b91<_b90){
curam.debug.log(_b4f.getProperty("curam.util.ExpandableLists.min.height",[_b90]));
_b91=_b90;
}else{
curam.debug.log(_b4f.getProperty("curam.util.ExpandableLists.height",[_b91]));
}
curam.util.ExpandableLists._resizeIframe(_b8e,_b91);
curam.util.ExpandableLists.resizeExpandableListAncestors(window);
curam.util.ExpandableLists._setFrameTitle(_b8e,_b8d);
if(!curam.util.ExpandableLists._isExternalApp(window)){
var _b92=curam.tab.getSelectedTab();
if(_b92){
var _b93=curam.tab.getTabWidgetId(_b92);
var _b94=curam.util.getTopmostWindow();
_b94.curam.util.Refresh.getController(_b93).pageLoaded(_b8d.pageID,curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_INLINE);
}
}
curam.debug.log("================================================");
},_resizeIframe:function(_b95,_b96){
dojo.style(_b95,{height:_b96+"px"});
},_setFrameTitle:function(_b97,_b98){
_b97.title=_b97.title+" "+_b98.title;
},_findListId:function(_b99){
return curam.util.getSuffixFromClass(cm.getParentByType(_b99,"table"),curam.util.ExpandableLists._LIST_ID_PREFIX);
},resizeExpandableListAncestors:function(_b9a){
curam.debug.log("curam.util.ExpandableLists.resizeExpandableListAncestors: ",_b9a.location.href);
if(_b9a&&_b9a!==window.top&&typeof (_b9a.frameElement)!="undefined"&&(dojo.hasClass(_b9a.frameElement,"expanded_row_iframe")||curam.util.ExpandableLists.isNestedUIM(_b9a))){
var _b9b=_b9a.curam.util.getPageHeight();
curam.debug.log("curam.util.ExpandableLists"+".resizeExpandableListAncestors: "+_b4f.getProperty("curam.util.ExpandableLists.resize.height"),_b9b);
curam.util.ExpandableLists._resizeIframe(_b9a.frameElement,_b9b);
curam.util.ExpandableLists.resizeExpandableListAncestors(_b9a.parent);
}else{
curam.debug.log("curam.util.ExpandableLists"+".resizeExpandableListAncestors: "+_b4f.getProperty("curam.util.ExpandableLists.resize.end"));
return;
}
},isNestedUIM:function(_b9c){
if(_b9c&&_b9c.jsScreenContext){
return _b9c.jsScreenContext.hasContextBits("NESTED_UIM");
}else{
return false;
}
},_isExternalApp:function(_b9d){
if(_b9d&&_b9d.jsScreenContext){
return _b9d.jsScreenContext.hasContextBits("EXTAPP");
}else{
return false;
}
},setMinimumExpandedHeight:function(_b9e,_b9f){
curam.util.ExpandableLists._minimumExpandedHeight.push({listId:_b9e,minExpHeight:_b9f});
},getMinimumExpandedHeight:function(_ba0){
var data=dojo.filter(curam.util.ExpandableLists._minimumExpandedHeight,function(item){
return item.listId==_ba0;
});
if(data.length==1){
return data[0].minExpHeight;
}else{
curam.debug.log(_b4f.getProperty("curam.util.ExpandableLists.default.height"),_ba0);
return 30;
}
}});
return curam.util.ExpandableLists;
});
},"curam/tab":function(){
define("curam/tab",["curam/define","curam/util","curam/util/ScreenContext"],function(){
curam.define.singleton("curam.tab",{SECTION_TAB_CONTAINER_ID:"app-sections-container-dc",SMART_PANEL_IFRAME_ID:"curam_tab_SmartPanelIframe",toBeExecutedOnTabClose:[],_mockSelectedTab:null,getSelectedTab:function(_ba1){
if(curam.tab._mockSelectedTab){
return curam.tab._mockSelectedTab;
}
if(curam.tab.getTabContainer(_ba1)){
return curam.tab.getTabContainer(_ba1).selectedChildWidget;
}
},getTabContainer:function(_ba2){
return curam.tab.getTabContainerFromSectionID(_ba2||curam.tab.getCurrentSectionId());
},getCurrentSectionId:function(_ba3){
var _ba4=curam.util.getTopmostWindow().dijit.byId(curam.tab.SECTION_TAB_CONTAINER_ID);
if(_ba4){
var _ba5=_ba4.selectedChildWidget.domNode.id;
return _ba5.substring(0,_ba5.length-4);
}else{
if(!_ba3){
throw new Error("curam.tab.getCurrentSectionId() - application section"+" tab container not found");
}
}
return null;
},inTabbedUI:function(){
return curam.tab.getCurrentSectionId(true)!=null;
},getTabContainerFromSectionID:function(_ba6){
var _ba7=dijit.byId(_ba6+"-stc");
if(!_ba7&&window.parent&&window.parent!=window){
_ba7=curam.util.getTopmostWindow().dijit.byId(_ba6+"-stc");
}
return _ba7;
},getTabWidgetId:function(tab){
return tab.id;
},getSelectedTabWidgetId:function(){
return curam.tab.getTabWidgetId(curam.tab.getSelectedTab());
},getContainerTab:function(node){
var _ba8=dijit.getEnclosingWidget(node);
if(_ba8&&!_ba8.tabDescriptor){
_ba8=curam.tab.getContainerTab(_ba8.domNode.parentNode);
}
if(!_ba8||!_ba8.tabDescriptor){
throw "Containing tab widget could not be found for node: "+node;
}
return _ba8;
},getContentPanelIframe:function(tab){
var _ba9=tab?tab:curam.tab.getSelectedTab(),_baa=null;
if(_ba9){
_baa=dojo.query("iframe",_ba9.domNode).filter(function(item){
return dojo.attr(item,"iscpiframe")=="true";
})[0];
}
return _baa?_baa:null;
},refreshMainContentPanel:function(tab){
var _bab=curam.tab.getContentPanelIframe(tab);
_bab.contentWindow.curam.util.publishRefreshEvent();
_bab.contentWindow.location.reload(true);
},getSmartPanelIframe:function(tab){
var _bac=tab?tab:curam.tab.getSelectedTab();
var _bad=dojo.query("iframe",_bac.domNode).filter(function(item){
return item.id==curam.tab.SMART_PANEL_IFRAME_ID;
})[0];
return _bad;
},unsubscribeOnTabClose:function(_bae,_baf){
curam.tab.toBeExecutedOnTabClose.push(function(_bb0){
if(_baf==_bb0){
dojo.unsubscribe(_bae);
return true;
}
return false;
});
},executeOnTabClose:function(func,_bb1){
curam.tab.toBeExecutedOnTabClose.push(function(_bb2){
if(_bb1==_bb2){
func();
return true;
}
return false;
});
},doExecuteOnTabClose:function(_bb3){
var _bb4=new Array();
for(var i=0;i<curam.tab.toBeExecutedOnTabClose.length;i++){
var func=curam.tab.toBeExecutedOnTabClose[i];
if(!func(_bb3)){
_bb4.push(func);
}
}
curam.tab.toBeExecutedOnTabClose=_bb4;
},getHandlerForTab:function(_bb5,_bb6){
return function(_bb7,_bb8){
if(_bb8==_bb6){
_bb5(_bb7,_bb6);
}else{
}
};
},getTabController:function(){
return curam.util.getTopmostWindow().curam.ui.UIController;
},initTabLinks:function(_bb9){
if(typeof (window.pageContainsClassicIEG)!="undefined"&&window.pageContainsClassicIEG==true){
return;
}
dojo.query("a").forEach(function(link){
if(link.href.indexOf("#")!=0&&link.href.indexOf("javascript:")!=0&&(link.href.indexOf("Page.do")>-1||link.href.indexOf("Frame.do")>-1)){
if(link.href.indexOf("&o3ctx")<0&&link.href.indexOf("?o3ctx")<0){
var _bba=(link.href.indexOf("?")>-1)?"&":"?";
link.href+=_bba+jsScreenContext.toRequestString();
}
}
});
elements=document.forms;
for(var i=0;i<elements.length;++i){
elem=elements[i];
var _bbb=dojo.byId("o3ctx");
if(!_bbb){
var ctx=new curam.util.ScreenContext();
ctx.setContextBits("ACTION");
dojo.create("input",{"type":"hidden","name":"o3ctx","value":ctx.getValue()},elem);
}
dojo.create("input",{"type":"hidden","name":"o3prv","value":jsPageID},elem);
}
if(elements.length>0){
curam.util.getTopmostWindow().dojo.publish("curam.fireNextRequest",[]);
}
},initContent:function(_bbc,_bbd){
var _bbe=dojo.byId("content");
dojo.removeClass(_bbe,"hidden-panel");
return;
},setupSectionSelectionListener:function(){
dojo.subscribe(curam.tab.SECTION_TAB_CONTAINER_ID+"-selectChild",curam.tab.onSectionSelected);
},onSectionSelected:function(_bbf){
if(_bbf.curamDefaultPageID){
var _bc0;
if(_bbf.id.substring(_bbf.id.length-4,_bbf.id.length)=="-sbc"){
var _bc1=_bbf.id.substring(0,_bbf.id.length-4);
_bc0=curam.tab.getTabContainer(_bc1);
}else{
_bc0=_bbf;
}
if(_bc0&&_bc0.getChildren().length==0){
curam.tab.getTabController().handleUIMPageID(_bbf.curamDefaultPageID,true);
}
return true;
}
return false;
},setSectionDefaultPage:function(_bc2,_bc3){
var _bc4=dijit.byId(_bc2);
if(_bc4){
_bc4.curamDefaultPageID=_bc3;
}else{
throw "curam.tab.setSectionDefaultPage() - cannot find section dijit ID:"+_bc2;
}
},publishSmartPanelContentReady:function(){
var _bc5="smartpanel.content.loaded";
var _bc6=window.frameElement;
_bc6.setAttribute("_SPContentLoaded","true");
curam.util.getTopmostWindow().dojo.publish(_bc5,[_bc6]);
}});
return curam.tab;
});
},"dojo/text":function(){
define("dojo/text",["./_base/kernel","require","./has","./_base/xhr"],function(dojo,_bc7,has,xhr){
var _bc8;
if(1){
_bc8=function(url,sync,load){
xhr("GET",{url:url,sync:!!sync,load:load});
};
}else{
if(_bc7.getText){
_bc8=_bc7.getText;
}else{
console.error("dojo/text plugin failed to load because loader does not support getText");
}
}
var _bc9={},_bca=function(text){
if(text){
text=text.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _bcb=text.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_bcb){
text=_bcb[1];
}
}else{
text="";
}
return text;
},_bcc={},_bcd={},_bce={dynamic:true,normalize:function(id,_bcf){
var _bd0=id.split("!"),url=_bd0[0];
return (/^\./.test(url)?_bcf(url):url)+(_bd0[1]?"!"+_bd0[1]:"");
},load:function(id,_bd1,load){
var _bd2=id.split("!"),_bd3=_bd2.length>1,_bd4=_bd2[0],url=_bd1.toUrl(_bd2[0]),text=_bcc,_bd5=function(text){
load(_bd3?_bca(text):text);
};
if(_bd4 in _bc9){
text=_bc9[_bd4];
}else{
if(url in _bd1.cache){
text=_bd1.cache[url];
}else{
if(url in _bc9){
text=_bc9[url];
}
}
}
if(text===_bcc){
if(_bcd[url]){
_bcd[url].push(_bd5);
}else{
var _bd6=_bcd[url]=[_bd5];
_bc8(url,!_bd1.async,function(text){
_bc9[_bd4]=_bc9[url]=text;
for(var i=0;i<_bd6.length;){
_bd6[i++](text);
}
delete _bcd[url];
});
}
}else{
_bd5(text);
}
}};
dojo.cache=function(_bd7,url,_bd8){
var key;
if(typeof _bd7=="string"){
if(/\//.test(_bd7)){
key=_bd7;
_bd8=url;
}else{
key=_bc7.toUrl(_bd7.replace(/\./g,"/")+(url?("/"+url):""));
}
}else{
key=_bd7+"";
_bd8=url;
}
var val=(_bd8!=undefined&&typeof _bd8!="string")?_bd8.value:_bd8,_bd9=_bd8&&_bd8.sanitize;
if(typeof val=="string"){
_bc9[key]=val;
return _bd9?_bca(val):val;
}else{
if(val===null){
delete _bc9[key];
return null;
}else{
if(!(key in _bc9)){
_bc8(key,true,function(text){
_bc9[key]=text;
});
}
return _bd9?_bca(_bc9[key]):_bc9[key];
}
}
};
return _bce;
});
},"curam/i18n":function(){
define("curam/i18n",["curam/define"],function(){
curam.define.singleton("curam.i18n",{values:{},set:function(key,_bda){
curam.i18n.values[key]=_bda;
},get:function(key){
return curam.i18n.values[key];
}});
return curam.i18n;
});
},"dojo/i18n":function(){
define("dojo/i18n",["./_base/kernel","require","./has","./_base/array","./_base/config","./_base/lang","./_base/xhr","./json"],function(dojo,_bdb,has,_bdc,_bdd,lang,xhr,json){
true||has.add("dojo-preload-i18n-Api",1);
true||has.add("dojo-v1x-i18n-Api",1);
var _bde=dojo.i18n={},_bdf=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,_be0=function(root,_be1,_be2,_be3){
for(var _be4=[_be2+_be3],_be5=_be1.split("-"),_be6="",i=0;i<_be5.length;i++){
_be6+=(_be6?"-":"")+_be5[i];
if(!root||root[_be6]){
_be4.push(_be2+_be6+"/"+_be3);
}
}
return _be4;
},_be7={},_be8=dojo.getL10nName=function(_be9,_bea,_beb){
_beb=_beb?_beb.toLowerCase():dojo.locale;
_be9="dojo/i18n!"+_be9.replace(/\./g,"/");
_bea=_bea.replace(/\./g,"/");
return (/root/i.test(_beb))?(_be9+"/nls/"+_bea):(_be9+"/nls/"+_beb+"/"+_bea);
},_bec=function(_bed,_bee,_bef,_bf0,_bf1,load){
_bed([_bee],function(root){
var _bf2=lang.clone(root.root),_bf3=_be0(!root._v1x&&root,_bf1,_bef,_bf0);
_bed(_bf3,function(){
for(var i=1;i<_bf3.length;i++){
_bf2=lang.mixin(lang.clone(_bf2),arguments[i]);
}
var _bf4=_bee+"/"+_bf1;
_be7[_bf4]=_bf2;
load();
});
});
},_bf5=function(id,_bf6){
return /^\./.test(id)?_bf6(id):id;
},_bf7=function(_bf8){
var list=_bdd.extraLocale||[];
list=lang.isArray(list)?list:[list];
list.push(_bf8);
return list;
},load=function(id,_bf9,load){
if(1){
var _bfa=id.split("*"),_bfb=_bfa[1]=="preload";
if(_bfb){
if(!_be7[id]){
_be7[id]=1;
_bfc(_bfa[2],json.parse(_bfa[3]),1);
}
load(1);
}
if(_bfb||_bfd(id,_bf9,load)){
return;
}
}
var _bfe=_bdf.exec(id),_bff=_bfe[1]+"/",_c00=_bfe[5]||_bfe[4],_c01=_bff+_c00,_c02=(_bfe[5]&&_bfe[4]),_c03=_c02||dojo.locale,_c04=_c01+"/"+_c03,_c05=_c02?[_c03]:_bf7(_c03),_c06=_c05.length,_c07=function(){
if(!--_c06){
load(lang.delegate(_be7[_c04]));
}
};
_bdc.forEach(_c05,function(_c08){
var _c09=_c01+"/"+_c08;
if(1){
_c0a(_c09);
}
if(!_be7[_c09]){
_bec(_bf9,_c01,_bff,_c00,_c08,_c07);
}else{
_c07();
}
});
};
if(has("dojo-unit-tests")){
var _c0b=_bde.unitTests=[];
}
if(1||1){
var _c0c=_bde.normalizeLocale=function(_c0d){
var _c0e=_c0d?_c0d.toLowerCase():dojo.locale;
return _c0e=="root"?"ROOT":_c0e;
},isXd=function(mid){
return (1&&1)?_bdb.isXdUrl(_bdb.toUrl(mid+".js")):true;
},_c0f=0,_c10=[],_bfc=_bde._preloadLocalizations=function(_c11,_c12,_c13){
function _c14(_c15,func){
var _c16=_c15.split("-");
while(_c16.length){
if(func(_c16.join("-"))){
return true;
}
_c16.pop();
}
return func("ROOT");
};
function _c17(_c18){
_c18=_c0c(_c18);
_c14(_c18,function(loc){
if(_bdc.indexOf(_c12,loc)>=0){
var mid=_c11.replace(/\./g,"/")+"_"+loc;
_c0f++;
(isXd(mid)||_c13?_bdb:_c1c)([mid],function(_c19){
for(var p in _c19){
_be7[p+"/"+loc]=_c19[p];
}
--_c0f;
while(!_c0f&&_c10.length){
load.apply(null,_c10.shift());
}
});
return true;
}
return false;
});
};
_c17();
_bdc.forEach(dojo.config.extraLocale,_c17);
},_bfd=function(id,_c1a,load){
if(_c0f){
_c10.push([id,_c1a,load]);
}
return _c0f;
};
}
if(1){
var _c1b=new Function("__bundle","__checkForLegacyModules","__mid","var define = function(){define.called = 1;},"+"    require = function(){define.called = 1;};"+"try{"+"define.called = 0;"+"eval(__bundle);"+"if(define.called==1)"+"return 1;"+"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"+"return __checkForLegacyModules;"+"}catch(e){}"+"try{"+"return eval('('+__bundle+')');"+"}catch(e){"+"return e;"+"}"),_c1c=function(deps,_c1d){
var _c1e=[];
_bdc.forEach(deps,function(mid){
var url=_bdb.toUrl(mid+".js");
function load(text){
var _c1f=_c1b(text,_c0a,mid);
if(_c1f===1){
_bdb([mid],function(_c20){
_c1e.push(_be7[url]=_c20);
});
}else{
if(_c1f instanceof Error){
console.error("failed to evaluate i18n bundle; url="+url,_c1f);
_c1f={};
}
_c1e.push(_be7[url]=(/nls\/[^\/]+\/[^\/]+$/.test(url)?_c1f:{root:_c1f,_v1x:1}));
}
};
if(_be7[url]){
_c1e.push(_be7[url]);
}else{
var _c21=_bdb.syncLoadNls(mid);
if(_c21){
_c1e.push(_c21);
}else{
if(!xhr){
try{
_bdb.getText(url,true,load);
}
catch(e){
_c1e.push(_be7[url]={});
}
}else{
xhr.get({url:url,sync:true,load:load,error:function(){
_c1e.push(_be7[url]={});
}});
}
}
}
});
_c1d&&_c1d.apply(null,_c1e);
},_c0a=function(_c22){
for(var _c23,_c24=_c22.split("/"),_c25=dojo.global[_c24[0]],i=1;_c25&&i<_c24.length-1;_c25=_c25[_c24[i++]]){
}
if(_c25){
_c23=_c25[_c24[i]];
if(!_c23){
_c23=_c25[_c24[i].replace(/-/g,"_")];
}
if(_c23){
_be7[_c22]=_c23;
}
}
return _c23;
};
_bde.getLocalization=function(_c26,_c27,_c28){
var _c29,_c2a=_be8(_c26,_c27,_c28).substring(10);
load(_c2a,(!isXd(_c2a)?_c1c:_bdb),function(_c2b){
_c29=_c2b;
});
return _c29;
};
if(has("dojo-unit-tests")){
_c0b.push(function(doh){
doh.register("tests.i18n.unit",function(t){
var _c2c;
_c2c=_c1b("{prop:1}");
t.is({prop:1},_c2c);
t.is(undefined,_c2c[1]);
_c2c=_c1b("({prop:1})");
t.is({prop:1},_c2c);
t.is(undefined,_c2c[1]);
_c2c=_c1b("{'prop-x':1}");
t.is({"prop-x":1},_c2c);
t.is(undefined,_c2c[1]);
_c2c=_c1b("({'prop-x':1})");
t.is({"prop-x":1},_c2c);
t.is(undefined,_c2c[1]);
_c2c=_c1b("define({'prop-x':1})");
t.is(1,_c2c);
_c2c=_c1b("this is total nonsense and should throw an error");
t.is(_c2c instanceof Error,true);
});
});
}
}
return lang.mixin(_bde,{dynamic:true,normalize:_bf5,load:load,cache:_be7});
});
},"dojox/encoding/digests/SHA1":function(){
define("dojox/encoding/digests/SHA1",["./_base"],function(dxd){
var _c2d=8,mask=(1<<_c2d)-1;
function R(n,c){
return (n<<c)|(n>>>(32-c));
};
function FT(t,b,c,d){
if(t<20){
return (b&c)|((~b)&d);
}
if(t<40){
return b^c^d;
}
if(t<60){
return (b&c)|(b&d)|(c&d);
}
return b^c^d;
};
function KT(t){
return (t<20)?1518500249:(t<40)?1859775393:(t<60)?-1894007588:-899497514;
};
function core(x,len){
x[len>>5]|=128<<(24-len%32);
x[((len+64>>9)<<4)+15]=len;
var w=new Array(80),a=1732584193,b=-271733879,c=-1732584194,d=271733878,e=-1009589776;
for(var i=0;i<x.length;i+=16){
var olda=a,oldb=b,oldc=c,oldd=d,olde=e;
for(var j=0;j<80;j++){
if(j<16){
w[j]=x[i+j];
}else{
w[j]=R(w[j-3]^w[j-8]^w[j-14]^w[j-16],1);
}
var t=dxd.addWords(dxd.addWords(R(a,5),FT(j,b,c,d)),dxd.addWords(dxd.addWords(e,w[j]),KT(j)));
e=d;
d=c;
c=R(b,30);
b=a;
a=t;
}
a=dxd.addWords(a,olda);
b=dxd.addWords(b,oldb);
c=dxd.addWords(c,oldc);
d=dxd.addWords(d,oldd);
e=dxd.addWords(e,olde);
}
return [a,b,c,d,e];
};
function hmac(data,key){
var wa=_c2e(key);
if(wa.length>16){
wa=core(wa,key.length*_c2d);
}
var ipad=new Array(16),opad=new Array(16);
for(var i=0;i<16;i++){
ipad[i]=wa[i]^909522486;
opad[i]=wa[i]^1549556828;
}
var hash=core(ipad.concat(_c2e(data)),512+data.length*_c2d);
return core(opad.concat(hash),512+160);
};
function _c2e(s){
var wa=[];
for(var i=0,l=s.length*_c2d;i<l;i+=_c2d){
wa[i>>5]|=(s.charCodeAt(i/_c2d)&mask)<<(32-_c2d-i%32);
}
return wa;
};
function _c2f(wa){
var h="0123456789abcdef",s=[];
for(var i=0,l=wa.length*4;i<l;i++){
s.push(h.charAt((wa[i>>2]>>((3-i%4)*8+4))&15),h.charAt((wa[i>>2]>>((3-i%4)*8))&15));
}
return s.join("");
};
function _c30(wa){
var s=[];
for(var i=0,l=wa.length*32;i<l;i+=_c2d){
s.push(String.fromCharCode((wa[i>>5]>>>(32-_c2d-i%32))&mask));
}
return s.join("");
};
function _c31(wa){
var p="=",tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s=[];
for(var i=0,l=wa.length*4;i<l;i+=3){
var t=(((wa[i>>2]>>8*(3-i%4))&255)<<16)|(((wa[i+1>>2]>>8*(3-(i+1)%4))&255)<<8)|((wa[i+2>>2]>>8*(3-(i+2)%4))&255);
for(var j=0;j<4;j++){
if(i*8+j*6>wa.length*32){
s.push(p);
}else{
s.push(tab.charAt((t>>6*(3-j))&63));
}
}
}
return s.join("");
};
dxd.SHA1=function(data,_c32){
var out=_c32||dxd.outputTypes.Base64;
var wa=core(_c2e(data),data.length*_c2d);
switch(out){
case dxd.outputTypes.Raw:
return wa;
case dxd.outputTypes.Hex:
return _c2f(wa);
case dxd.outputTypes.String:
return _c30(wa);
default:
return _c31(wa);
}
};
dxd.SHA1._hmac=function(data,key,_c33){
var out=_c33||dxd.outputTypes.Base64;
var wa=hmac(data,key);
switch(out){
case dxd.outputTypes.Raw:
return wa;
case dxd.outputTypes.Hex:
return _c2f(wa);
case dxd.outputTypes.String:
return _c30(wa);
default:
return _c31(wa);
}
};
return dxd.SHA1;
});
},"dojo/data/util/simpleFetch":function(){
define("dojo/data/util/simpleFetch",["dojo/_base/lang","dojo/_base/window","./sorter"],function(lang,_c34,_c35){
var _c36=lang.getObject("dojo.data.util.simpleFetch",true);
_c36.fetch=function(_c37){
_c37=_c37||{};
if(!_c37.store){
_c37.store=this;
}
var self=this;
var _c38=function(_c39,_c3a){
if(_c3a.onError){
var _c3b=_c3a.scope||_c34.global;
_c3a.onError.call(_c3b,_c39,_c3a);
}
};
var _c3c=function(_c3d,_c3e){
var _c3f=_c3e.abort||null;
var _c40=false;
var _c41=_c3e.start?_c3e.start:0;
var _c42=(_c3e.count&&(_c3e.count!==Infinity))?(_c41+_c3e.count):_c3d.length;
_c3e.abort=function(){
_c40=true;
if(_c3f){
_c3f.call(_c3e);
}
};
var _c43=_c3e.scope||_c34.global;
if(!_c3e.store){
_c3e.store=self;
}
if(_c3e.onBegin){
_c3e.onBegin.call(_c43,_c3d.length,_c3e);
}
if(_c3e.sort){
_c3d.sort(_c35.createSortFunction(_c3e.sort,self));
}
if(_c3e.onItem){
for(var i=_c41;(i<_c3d.length)&&(i<_c42);++i){
var item=_c3d[i];
if(!_c40){
_c3e.onItem.call(_c43,item,_c3e);
}
}
}
if(_c3e.onComplete&&!_c40){
var _c44=null;
if(!_c3e.onItem){
_c44=_c3d.slice(_c41,_c42);
}
_c3e.onComplete.call(_c43,_c44,_c3e);
}
};
this._fetchItems(_c37,_c3c,_c38);
return _c37;
};
return _c36;
});
},"curam/util":function(){
define("curam/util",["dojo/dom","dijit/registry","dojo/dom-construct","dojo/ready","dojo/_base/window","dojo/dom-style","dojo/_base/array","dojo/dom-class","dojo/topic","dojo/_base/event","dojo/query","dojo/has","dojo/_base/unload","dojo/dom-geometry","dojo/_base/json","dojo/dom-attr","dojo/_base/lang","dojo/on","dijit/_BidiSupport","curam/define","curam/debug","curam/util/RuntimeContext","curam/util/Constants","dojo/_base/sniff","cm/_base/_dom","curam/util/ResourceBundle"],function(dom,_c45,_c46,_c47,_c48,_c49,_c4a,_c4b,_c4c,_c4d,_c4e,has,_c4f,geom,json,attr,lang,on,bidi){
dojo.requireLocalization("curam.application","Debug");
var _c50=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util",{PREVENT_CACHE_FLAG:"o3pc",INFORMATIONAL_MSGS_STORAGE_ID:"__informationals__",ERROR_MESSAGES_CONTAINER:"error-messages-container",ERROR_MESSAGES_LIST:"error-messages",CACHE_BUSTER:0,CACHE_BUSTER_PARAM_NAME:"o3nocache",msgLocaleSelectorActionPage:"$not-locaized$ Usage of the Language Selector is not permitted from an editable page that has previously been submitted.",insertCssText:function(_c51,_c52){
var id=_c52?_c52:"_runtime_stylesheet_";
var _c53=dom.byId(id);
var _c54;
if(_c53){
if(_c53.styleSheet){
_c51=_c53.styleSheet.cssText+_c51;
_c54=_c53;
_c54.setAttribute("id","_nodeToRm");
}else{
_c53.appendChild(document.createTextNode(_c51));
return;
}
}
var pa=document.getElementsByTagName("head")[0];
_c53=_c46.create("style",{type:"text/css",id:id});
if(_c53.styleSheet){
_c53.styleSheet.cssText=_c51;
}else{
_c53.appendChild(document.createTextNode(_c51));
}
pa.appendChild(_c53);
if(_c54){
_c54.parentNode.removeChild(_c54);
}
},fireRefreshTreeEvent:function(){
if(dojo.global.parent&&dojo.global.parent.amIFrame){
var wpl=dojo.global.parent.loader;
}
if(wpl&&wpl.dojo){
wpl.dojo.publish("refreshTree");
}
},firePageSubmittedEvent:function(_c55){
require(["curam/tab"],function(){
var _c56=curam.tab.getSelectedTab();
if(_c56){
var _c57=curam.tab.getTabWidgetId(_c56);
var _c58=curam.util.getTopmostWindow();
var ctx=(_c55=="dialog")?curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_DIALOG:curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN;
_c58.curam.util.Refresh.getController(_c57).pageSubmitted(dojo.global.jsPageID,ctx);
_c58.dojo.publish("/curam/main-content/page/submitted",[dojo.global.jsPageID,_c57]);
}else{
curam.debug.log("/curam/main-content/page/submitted: "+_c50.getProperty("curam.util.no.open"));
}
});
},fireTabOpenedEvent:function(_c59){
curam.util.getTopmostWindow().dojo.publish("curam.tabOpened",[dojo.global.jsPageID,_c59]);
},setupSubmitEventPublisher:function(){
_c47(function(){
var form=dom.byId("mainForm");
if(form){
curam.util.connect(form,"onsubmit",function(){
curam.util.firePageSubmittedEvent("main-content");
});
}
});
},getScrollbar:function(){
var _c5a=_c46.create("div",{},_c48.body());
_c49.set(_c5a,{width:"100px",height:"100px",overflow:"scroll",position:"absolute",top:"-300px",left:"0px"});
var test=_c46.create("div",{},_c5a);
_c49.set(test,{width:"400px",height:"400px"});
var _c5b=_c5a.offsetWidth-_c5a.clientWidth;
_c46.destroy(_c5a);
return {width:_c5b};
},isModalWindow:function(){
return (dojo.global.curamModal===undefined)?false:true;
},getTopmostWindow:function(){
if(typeof (dojo.global._curamTopmostWindow)=="undefined"){
var _c5c=dojo.global;
if(typeof (dojo.global.jsScreenContext)!="undefined"&&dojo.global.jsScreenContext.hasContextBits("CONTEXT_PORTLET")){
dojo.global._curamTopmostWindow=_c5c;
}else{
if(_c5c.__extAppTopWin){
dojo.global._curamTopmostWindow=_c5c;
}else{
while(_c5c.parent!=_c5c){
_c5c=_c5c.parent;
if(_c5c.__extAppTopWin){
break;
}
}
dojo.global._curamTopmostWindow=_c5c;
}
}
}
if(dojo.global._curamTopmostWindow.location.href.indexOf("AppController.do")<0&&typeof (dojo.global._curamTopmostWindow.__extAppTopWin)=="undefined"){
curam.debug.log(_c50.getProperty("curam.util.wrong.window")+dojo.global._curamTopmostWindow.location.href);
}
return dojo.global._curamTopmostWindow;
},getUrlParamValue:function(url,_c5d){
var qPos=url.indexOf("?");
if(qPos<0){
return null;
}
var _c5e=url.substring(qPos+1,url.length);
function _c5f(_c60){
var _c61=_c5e.split(_c60);
_c5d+="=";
for(var i=0;i<_c61.length;i++){
if(_c61[i].indexOf(_c5d)==0){
return _c61[i].split("=")[1];
}
}
};
return _c5f("&")||_c5f("");
},addUrlParam:function(href,_c62,_c63,_c64){
var hasQ=href.indexOf("?")>-1;
var _c65=_c64?_c64:"undefined";
if(!hasQ||(_c65==false)){
return href+(hasQ?"&":"?")+_c62+"="+_c63;
}else{
var _c66=href.split("?");
href=_c66[0]+"?"+_c62+"="+_c63+(_c66[1]!=""?("&"+_c66[1]):"");
return href;
}
},replaceUrlParam:function(href,_c67,_c68){
href=curam.util.removeUrlParam(href,_c67);
return curam.util.addUrlParam(href,_c67,_c68);
},removeUrlParam:function(url,_c69,_c6a){
var qPos=url.indexOf("?");
if(qPos<0){
return url;
}
if(url.indexOf(_c69+"=")<0){
return url;
}
var _c6b=url.substring(qPos+1,url.length);
var _c6c=_c6b.split("&");
var _c6d;
var _c6e,_c6f;
for(var i=0;i<_c6c.length;i++){
if(_c6c[i].indexOf(_c69+"=")==0){
_c6f=false;
if(_c6a){
_c6e=_c6c[i].split("=");
if(_c6e.length>1){
if(_c6e[1]==_c6a){
_c6f=true;
}
}else{
if(_c6a==""){
_c6f=true;
}
}
}else{
_c6f=true;
}
if(_c6f){
_c6c.splice(i,1);
i--;
}
}
}
return url.substring(0,qPos+1)+_c6c.join("&");
},stripHash:function(url){
var idx=url.indexOf("#");
if(idx<0){
return url;
}
return url.substring(0,url);
},isSameUrl:function(_c70,_c71,rtc){
if(!_c71){
_c71=rtc.getHref();
}
if(_c70.indexOf("#")==0){
return true;
}
var _c72=_c70.indexOf("#");
if(_c72>-1){
if(_c72==0){
return true;
}
var _c73=_c70.split("#");
var _c74=_c71.indexOf("#");
if(_c74>-1){
if(_c74==0){
return true;
}
_c71=_c71.split("#")[0];
}
return _c73[0]==_c71;
}
var _c75=function(url){
var idx=url.lastIndexOf("Page.do");
var len=7;
if(idx<0){
idx=url.lastIndexOf("Action.do");
len=9;
}
if(idx<0){
idx=url.lastIndexOf("Frame.do");
len=8;
}
if(idx>-1&&idx==url.length-len){
return url.substring(0,idx);
}
return url;
};
var rp=curam.util.removeUrlParam;
var here=curam.util.stripHash(rp(_c71,curam.util.Constants.RETURN_PAGE_PARAM));
var _c76=curam.util.stripHash(rp(_c70,curam.util.Constants.RETURN_PAGE_PARAM));
var _c77=_c76.split("?");
var _c78=here.split("?");
_c78[0]=_c75(_c78[0]);
_c77[0]=_c75(_c77[0]);
var _c79=(_c78[0]==_c77[0]||_c78[0].match(_c77[0]+"$")==_c77[0]);
if(!_c79){
return false;
}
if(_c78.length==1&&_c77.length==1&&_c79){
return true;
}else{
var _c7a;
var _c7b;
if(typeof _c78[1]!="undefined"&&_c78[1]!=""){
_c7a=_c78[1].split("&");
}else{
_c7a=new Array();
}
if(typeof _c77[1]!="undefined"&&_c77[1]!=""){
_c7b=_c77[1].split("&");
}else{
_c7b=new Array();
}
curam.debug.log("curam.util.isSameUrl: paramsHere "+_c50.getProperty("curam.util.before")+_c7a.length);
_c7a=_c4a.filter(_c7a,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_c50.getProperty("curam.util.after")+_c7a.length);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_c50.getProperty("curam.util.before")+_c7b.length);
_c7b=_c4a.filter(_c7b,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_c50.getProperty("curam.util.after")+_c7b.length);
if(_c7a.length!=_c7b.length){
return false;
}
var _c7c={};
var _c7d;
for(var i=0;i<_c7a.length;i++){
_c7d=_c7a[i].split("=");
_c7c[_c7d[0]]=_c7d[1];
}
for(var i=0;i<_c7b.length;i++){
_c7d=_c7b[i].split("=");
if(_c7c[_c7d[0]]!=_c7d[1]){
curam.debug.log(_c50.getProperty("curam.util.no.match",[_c7d[0],_c7d[1],_c7c[_c7d[0]]]));
return false;
}
}
}
return true;
},isNotCDEJParam:function(_c7e){
return !((_c7e.charAt(0)=="o"&&_c7e.charAt(1)=="3")||(_c7e.charAt(0)=="_"&&_c7e.charAt(1)=="_"&&_c7e.charAt(2)=="o"&&_c7e.charAt(3)=="3"));
},setAttributes:function(node,map){
for(var x in map){
node.setAttribute(x,map[x]);
}
},invalidatePage:function(){
curam.PAGE_INVALIDATED=true;
var _c7f=dojo.global.dialogArguments?dojo.global.dialogArguments[0]:opener;
if(_c7f&&_c7f!=dojo.global){
try{
_c7f.curam.util.invalidatePage();
}
catch(e){
curam.debug.log(_c50.getProperty("curam.util.error"),e);
}
}
},redirectWindow:function(href,_c80,_c81){
var rtc=new curam.util.RuntimeContext(dojo.global);
var _c82=function(_c83,_c84,href,_c85,_c86){
curam.util.getFrameRoot(_c83,_c84).curam.util.redirectContentPanel(href,_c85,_c86);
};
curam.util._doRedirectWindow(href,_c80,_c81,dojo.global.jsScreenContext,rtc,curam.util.publishRefreshEvent,_c82);
},_doRedirectWindow:function(href,_c87,_c88,_c89,rtc,_c8a,_c8b){
if(href&&curam.util.isActionPage(href)){
curam.debug.log(_c50.getProperty("curam.util.stopping"),href);
return;
}
var rpl=curam.util.replaceUrlParam;
var _c8c=_c89.hasContextBits("TREE")||_c89.hasContextBits("AGENDA")||_c89.hasContextBits("ORG_TREE");
if(curam.util.FORCE_REFRESH){
href=rpl(rtc.getHref(),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
if(curam.util.isModalWindow()||_c8c){
_c8a();
dojo.global.location.href=href;
}else{
if(_c89.hasContextBits("LIST_ROW_INLINE_PAGE")||_c89.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(href);
}else{
_c8a();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
require(["curam/tab"],function(){
_c8b(dojo.global,curam.tab.getTabController().ROOT_OBJ,href,true,true);
});
}
}
}
return;
}
var u=curam.util;
var rtc=new curam.util.RuntimeContext(dojo.global);
if(!_c8c&&!_c87&&!curam.PAGE_INVALIDATED&&u.isSameUrl(href,null,rtc)){
return;
}
if(curam.util.isModalWindow()||_c8c){
href=rpl(rpl(href,"o3frame","modal"),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
var form=_c46.create("form",{action:href,method:"POST"});
if(!_c8c){
if(!dom.byId("o3ctx")){
form.action=curam.util.removeUrlParam(form.action,"o3ctx");
var _c8d=_c46.create("input",{type:"hidden",id:"o3ctx",name:"o3ctx",value:_c89.getValue()},form);
}
_c48.body().appendChild(form);
_c8a();
form.submit();
}
if(!_c88){
if(_c8c){
curam.util.redirectFrame(href);
}
}
}else{
if(_c89.hasContextBits("LIST_ROW_INLINE_PAGE")||_c89.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(href);
}else{
_c8a();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
if(_c89.hasContextBits("EXTAPP")){
var _c8e=window.top;
_c8e.dijit.byId("curam-app").updateMainContentIframe(href);
}else{
require(["curam/tab"],function(){
curam.util.getFrameRoot(dojo.global,curam.tab.getTabController().ROOT_OBJ).curam.util.redirectContentPanel(href,_c87);
});
}
}
}
}
},_handleInlinePageRefresh:function(href){
curam.debug.log(_c50.getProperty("curam.util.closing.modal"),href);
var _c8f=new curam.ui.PageRequest(href);
require(["curam/tab"],function(){
curam.tab.getTabController().checkPage(_c8f,function(_c90){
curam.util.publishRefreshEvent();
dojo.global.location.reload(true);
});
});
},redirectContentPanel:function(url,_c91,_c92){
require(["curam/tab"],function(){
var _c93=curam.tab.getContentPanelIframe();
var _c94=url;
if(_c93!=null){
var rpu=curam.util.Constants.RETURN_PAGE_PARAM;
var _c95=null;
if(url.indexOf(rpu+"=")>=0){
curam.debug.log("curam.util.redirectContentPanel: "+_c50.getProperty("curam.util.rpu"));
_c95=decodeURIComponent(curam.util.getUrlParamValue(url,rpu));
}
if(_c95){
_c95=curam.util.removeUrlParam(_c95,rpu);
_c94=curam.util.replaceUrlParam(url,rpu,encodeURIComponent(_c95));
}
}
var _c96=new curam.ui.PageRequest(_c94);
if(_c91){
_c96.forceLoad=true;
}
if(_c92){
_c96.justRefresh=true;
}
curam.tab.getTabController().handlePageRequest(_c96);
});
},redirectFrame:function(href){
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
var _c97=curam.util.getFrameRoot(dojo.global,"wizard").targetframe;
_c97.curam.util.publishRefreshEvent();
_c97.location.href=href;
}else{
if(dojo.global.jsScreenContext.hasContextBits("ORG_TREE")){
var _c97=curam.util.getFrameRoot(dojo.global,"orgTreeRoot");
_c97.curam.util.publishRefreshEvent();
_c97.dojo.publish("orgTree.refreshContent",[href]);
}else{
var _c98=curam.util.getFrameRoot(dojo.global,"iegtree");
var _c99=_c98.navframe||_c98.frames[0];
var _c9a=_c98.contentframe||_c98.frames["contentframe"];
_c9a.curam.util.publishRefreshEvent();
if(curam.PAGE_INVALIDATED||_c99.curam.PAGE_INVALIDATED){
var _c9b=curam.util.modifyUrlContext(href,"ACTION");
_c9a.location.href=_c9b;
}else{
_c9a.location.href=href;
}
}
}
return true;
},publishRefreshEvent:function(){
_c4c.publish("/curam/page/refresh");
},openGenericErrorModalDialog:function(_c9c,_c9d,_c9e,_c9f,_ca0){
var url;
var _ca1;
var sc=new curam.util.ScreenContext("MODAL");
var _ca2="titlePropertyName="+_c9d+"&";
var _ca3="messagePropertyName="+_c9e+"&";
var _ca4="errorModal="+_ca0+"&";
if(_c9f){
_ca1="messagePlaceholder1="+_c9f+"&";
url="generic-modal-error.jspx?"+_ca2+_ca3+_ca1+_ca4+sc.toRequestString();
}else{
url="generic-modal-error.jspx?"+_ca2+_ca3+sc.toRequestString();
}
curam.util.openModalDialog({href:url},_c9c);
},openModalDialog:function(_ca5,_ca6,left,top,_ca7){
var href;
if(!_ca5||!_ca5.href){
_ca5=_c4d.fix(_ca5);
var _ca8=_ca5.target;
while(_ca8.tagName!="A"&&_ca8!=_c48.body()){
_ca8=_ca8.parentNode;
}
href=_ca8.href;
_ca8._isModal=true;
_c4d.stop(_ca5);
}else{
href=_ca5.href;
_ca5._isModal=true;
}
require(["curam/dialog"]);
var opts=curam.dialog.parseWindowOptions(_ca6);
curam.util.showModalDialog(href,_ca5,opts["width"],opts["height"],left,top,false,null,null,_ca7);
return false;
},showModalDialog:function(url,_ca9,_caa,_cab,left,top,_cac,_cad,_cae,_caf){
var _cb0=curam.util.getTopmostWindow();
if(dojo.global!=_cb0){
curam.debug.log("curam.util.showModalDialog: "+_c50.getProperty("curam.util.redirecting.modal"));
_cb0.curam.util.showModalDialog(url,_ca9,_caa,_cab,left,top,_cac,_cad,dojo.global,_caf);
return;
}
var rup=curam.util.replaceUrlParam;
url=rup(url,"o3frame","modal");
url=curam.util.modifyUrlContext(url,"MODAL","TAB|LIST_ROW_INLINE_PAGE|LIST_EVEN_ROW|NESTED_UIM");
url=rup(url,curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
curam.debug.log(_c50.getProperty("curam.util.modal.url"),url);
if(_caa){
_caa=typeof (_caa)=="number"?_caa:parseInt(_caa);
}
if(_cab){
_cab=typeof (_cab)=="number"?_cab:parseInt(_cab);
}
if(!curam.util._isModalCurrentlyOpening()){
curam.util._setModalCurrentlyOpening(true);
require(["curam/ModalDialog"]);
new curam.ModalDialog({href:url,width:_caa,height:_cab,openNode:(_ca9&&_ca9.target)?_ca9.target:null,parentWindow:_cae,uimToken:_caf});
}
},_isModalCurrentlyOpening:function(){
return curam.util.getTopmostWindow().curam.util._modalOpenInProgress;
},_setModalCurrentlyOpening:function(_cb1){
curam.util.getTopmostWindow().curam.util._modalOpenInProgress=_cb1;
},setupPreferencesLink:function(href){
_c47(function(){
var _cb2=_c4e(".user-preferences")[0];
if(_cb2){
if(typeof (_cb2._disconnectToken)=="undefined"){
_cb2._disconnectToken=curam.util.connect(_cb2,"onclick",curam.util.openPreferences);
}
if(!href){
href=dojo.global.location.href;
}
if(curam.util.isActionPage(href)){
_c4b.replace(_cb2,"disabled","enabled");
_cb2._curamDisable=true;
}else{
_c4b.replace(_cb2,"enabled","disabled");
_cb2._curamDisable=false;
}
}else{
curam.debug.log(_c50.getProperty("curam.util.no.setup"));
}
});
},openPreferences:function(_cb3){
_c4d.stop(_cb3);
if(_cb3.target._curamDisable){
return;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("user-prefs-editor.jspx",{dialogOptions:"width=450"});
});
},openAbout:function(_cb4){
_c4d.stop(_cb4);
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("about.jsp",{dialogOptions:"width=645,height=480"});
});
},addMinWidthCalendarCluster:function(id){
var _cb5=dom.byId(id);
var i=0;
function _cb6(evt){
_c4a.forEach(_cb5.childNodes,function(node){
if(_c4b.contains(node,"cluster")){
_c49.set(node,"width","97%");
if(node.clientWidth<700){
_c49.set(node,"width","700px");
}
}
});
};
if(has("ie")>6){
_c4a.forEach(_cb5.childNodes,function(node){
if(_c4b.contains(node,"cluster")){
_c49.set(node,"minWidth","700px");
}
});
}else{
on(dojo.global,"resize",_cb6);
_c47(_cb6);
}
},addPopupFieldListener:function(id){
if(!has("ie")||has("ie")>6){
return;
}
if(!curam.util._popupFields){
function _cb7(evt){
var _cb8=0;
var j=0;
var x=0;
var arr=curam.util._popupFields;
_c4a.forEach(curam.util._popupFields,function(id){
var _cb9=dom.byId(id);
_c4e("> .popup-actions",_cb9).forEach(function(node){
_cb8=node.clientWidth+30;
});
_c4e("> .desc",_cb9).forEach(function(node){
_c49.set(node,"width",Math.max(0,_cb9.clientWidth-_cb8)+"px");
});
});
};
curam.util._popupFields=[id];
on(dojo.global,"resize",_cb7);
_c47(_cb7);
}else{
curam.util._popupFields.push(id);
}
},addContentWidthListener:function(id){
if(has("ie")>6){
return;
}
var _cba=_c49.set;
var _cbb=_c4b.contains;
function _cbc(evt){
var i=0;
var _cbd=dom.byId("content");
if(_cbd){
var _cbe=_cbd.clientWidth;
if(has("ie")==6&&dom.byId("footer")){
var _cbf=_c48.body().clientHeight-100;
_cba(_cbd,"height",_cbf+"px");
var _cc0=dom.byId("sidebar");
if(_cc0){
_cba(_cc0,"height",_cbf+"px");
}
}
try{
_c4e("> .page-title-bar",_cbd).forEach(function(node){
var _cc1=geom.getMarginSize(node).w-geom.getContentBox(node).w;
if(!has("ie")){
_cc1+=1;
}
_cbe=_cbd.clientWidth-_cc1;
_c49.set(node,"width",_cbe+"px");
});
}
catch(e){
}
_c4e("> .page-description",_cbd).style("width",_cbe+"px");
_c4e("> .in-page-navigation",_cbd).style("width",_cbe+"px");
}
};
curam.util.subscribe("/clusterToggle",_cbc);
curam.util.connect(dojo.global,"onresize",_cbc);
_c47(_cbc);
},alterScrollableListBottomBorder:function(id,_cc2){
var _cc3=_cc2;
var _cc4="#"+id+" table";
function _cc5(){
var _cc6=_c4e(_cc4)[0];
if(_cc6.offsetHeight>=_cc3){
var _cc7=_c4e(".odd-last-row",_cc6)[0];
if(typeof _cc7!="undefined"){
_c4b.add(_cc7,"no-bottom-border");
}
}else{
if(_cc6.offsetHeight<_cc3){
var _cc7=_c4e(".even-last-row",_cc6)[0];
if(typeof _cc7!="undefined"){
_c4b.add(_cc7,"add-bottom-border");
}
}else{
curam.debug.log("curam.util.alterScrollableListBottomBorder: "+_c50.getProperty("curam.util.code"));
}
}
};
_c47(_cc5);
},addFileUploadResizeListener:function(code){
function _cc8(evt){
if(_c4e(".widget")){
_c4e(".widget").forEach(function(_cc9){
var _cca=_cc9.clientWidth;
if(_c4e(".fileUpload",_cc9)){
_c4e(".fileUpload",_cc9).forEach(function(_ccb){
fileUploadWidth=_cca/30;
if(fileUploadWidth<4){
_ccb.size=1;
}else{
_ccb.size=fileUploadWidth;
}
});
}
});
}
};
on(dojo.global,"resize",_cc8);
_c47(_cc8);
},openCenteredNonModalWindow:function(url,_ccc,_ccd,name){
_ccc=Number(_ccc);
_ccd=Number(_ccd);
var _cce=(screen.width-_ccc)/2;
var _ccf=(screen.height-_ccd)/2;
_ccd=_ccf<0?screen.height:_ccd;
_ccf=Math.max(0,_ccf);
_ccc=_cce<0?screen.width:_ccc;
_cce=Math.max(0,_cce);
var left="left",top="top";
if(has("ff")){
left="screenX",top="screenY";
}
var _cd0="location=no, menubar=no, status=no, toolbar=no, "+"scrollbars=yes, resizable=no";
var _cd1=dojo.global.open(url,name||"name","width="+_ccc+", height="+_ccd+", "+left+"="+_cce+","+top+"="+_ccf+","+_cd0);
_cd1.resizeTo(_ccc,_ccd);
_cd1.moveTo(_cce,_ccf);
_cd1.focus();
},adjustTargetContext:function(win,href){
if(win&&win.dojo.global.jsScreenContext){
var _cd2=win.dojo.global.jsScreenContext;
_cd2.updateStates(dojo.global.jsScreenContext);
return curam.util.replaceUrlParam(href,"o3ctx",_cd2.getValue());
}
return href;
},modifyUrlContext:function(url,_cd3,_cd4){
var _cd5=url;
var ctx=new curam.util.ScreenContext();
var _cd6=curam.util.getUrlParamValue(url,"o3ctx");
if(_cd6){
ctx.setContext(_cd6);
}else{
ctx.clear();
}
if(_cd3){
ctx.addContextBits(_cd3);
}
if(_cd4){
ctx.clear(_cd4);
}
_cd5=curam.util.replaceUrlParam(url,"o3ctx",ctx.getValue());
return _cd5;
},updateCtx:function(_cd7){
var _cd8=curam.util.getUrlParamValue(_cd7,"o3ctx");
if(!_cd8){
return _cd7;
}
return curam.util.modifyUrlContext(_cd7,null,"MODAL");
},getFrameRoot:function(_cd9,_cda){
var _cdb=false;
var _cdc=_cd9;
if(_cdc){
while(_cdc!=top&&!_cdc.rootObject){
_cdc=_cdc.parent;
}
if(_cdc.rootObject){
_cdb=(_cdc.rootObject==_cda);
}
}
return _cdb?_cdc:null;
},saveInformationalMsgs:function(_cdd){
curam.util.runStorageFn(function(){
try{
var _cde=curam.util.getTopmostWindow().dojox;
_cde.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,json.toJson({pageID:_c48.body().id,total:dom.byId(curam.util.ERROR_MESSAGES_CONTAINER).innerHTML,listItems:dom.byId(curam.util.ERROR_MESSAGES_LIST).innerHTML}));
}
catch(e){
curam.debug.log(_c50.getProperty("curam.util.exception"),e);
}
},_cdd);
},runStorageFn:function(fn,_cdf){
var _ce0=function(){
fn();
if(_cdf){
setTimeout(_cdf,10);
}
};
var _ce1=curam.util.getTopmostWindow().dojox;
require(["dojox/storage"],function(){
var mgr=_ce1.storage.manager;
if(mgr.isInitialized()){
_ce0();
}else{
if(mgr.addOnLoad){
mgr.addOnLoad(_ce0);
}else{
var _ce2={exp:_ce0};
on(mgr,"loaded",_ce2,"exp");
}
}
});
},disableInformationalLoad:function(){
curam.util._informationalsDisabled=true;
},redirectDirectUrl:function(){
_c47(function(){
if(dojo.global.parent==dojo.global){
var url=document.location.href;
var idx=url.lastIndexOf("/");
if(idx>-1){
if(idx<=url.length){
url=url.substring(idx+1);
}
}
dojo.global.location=jsBaseURL+"/AppController.do?o3gtu="+encodeURIComponent(url);
}
});
},loadInformationalMsgs:function(){
_c47(function(){
if(dojo.global.jsScreenContext.hasContextBits("CONTEXT_PANEL")){
return;
}
if(curam.util._informationalsDisabled){
return;
}
curam.util.runStorageFn(function(){
var _ce3=curam.util.getTopmostWindow().dojox;
var msgs=_ce3.storage.get(curam.util.INFORMATIONAL_MSGS_STORAGE_ID);
if(msgs&&msgs!=""){
msgs=json.fromJson(msgs);
_ce3.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,"");
var div=dom.byId(curam.util.ERROR_MESSAGES_CONTAINER);
var list=dom.byId(curam.util.ERROR_MESSAGES_LIST);
if(msgs.pageID!=_c48.body().id){
return;
}
if(list){
var _ce4=_c46.create("ul",{innerHTML:msgs.listItems});
var _ce5=[];
for(var i=0;i<list.childNodes.length;i++){
if(list.childNodes[i].tagName=="LI"){
_ce5.push(list.childNodes[i]);
}
}
var skip=false;
var _ce6=_ce4.childNodes;
for(var i=0;i<_ce6.length;i++){
skip=false;
for(var j=0;j<_ce5.length;j++){
if(_ce6[i].innerHTML==_ce5[j].innerHTML){
skip=true;
break;
}
}
if(!skip){
list.appendChild(_ce6[i]);
i--;
}
}
}else{
if(div){
div.innerHTML=msgs.total;
}
}
}
var _ce7=dojo.byId("error-messages");
if(_ce7&&!dojo.global.jsScreenContext.hasContextBits("MODAL")){
_ce7.focus();
}
});
});
},setFocus:function(){
var _ce8=curam.util.getUrlParamValue(dojo.global.location.href,"o3frame")=="modal";
if(!_ce8){
_c47(curam.util.doSetFocus);
}
},doSetFocus:function(){
var _ce9=-1;
var _cea=-1;
var form=document.forms[0];
if(!form){
return false;
}
var _ceb=form.elements;
var l=_ceb.length;
var elem;
for(var i=0;i<l;i++){
elem=_ceb[i];
if(_ce9==-1&&(elem.type=="select-one"||elem.type=="text"||elem.tagName=="TEXTAREA")&&!_c4b.contains(elem,"dijitArrowButtonInner")&&!_c4b.contains(elem,"dijitValidationInner")){
_ce9=i;
}
if(elem.tabIndex=="1"){
elem.tabIndex=0;
_cea=i;
break;
}
}
var elem;
if(_cea!=-1){
elem=_ceb[_cea];
}else{
if(_ce9!=-1){
elem=_ceb[_ce9];
}
}
try{
var _cec=dojo.byId("error-messages");
if(_cec){
_cec.focus();
}else{
elem.focus();
}
}
catch(e){
curam.debug.log(_c50.getProperty("curam.util.error.focus"),e.message);
return false;
}
return true;
},openLocaleSelector:function(_ced){
_ced=_c4d.fix(_ced);
var _cee=_ced.target;
while(_cee&&_cee.tagName!="A"){
_cee=_cee.parentNode;
}
var loc=_cee.href;
var rpu=curam.util.getUrlParamValue(loc,"__o3rpu");
rpu=curam.util.removeUrlParam(rpu,"__o3rpu");
var href="user-locale-selector.jspx"+"?__o3rpu="+rpu;
if(!curam.util.isActionPage(dojo.global.location.href)){
openModalDialog({href:href},"width=500,height=300",200,150);
}else{
alert(curam.util.msgLocaleSelectorActionPage);
}
return false;
},isActionPage:function(url){
var _cef=curam.util.getLastPathSegmentWithQueryString(url);
var _cf0=_cef.split("?")[0];
return _cf0.indexOf("Action.do")>-1;
},closeLocaleSelector:function(_cf1){
_cf1=_c4d.fix(_cf1);
_c4d.stop(_cf1);
dojo.global.close();
return false;
},getSuffixFromClass:function(node,_cf2){
var _cf3=attr.get(node,"class").split(" ");
var _cf4=_c4a.filter(_cf3,function(_cf5){
return _cf5.indexOf(_cf2)==0;
});
if(_cf4.length>0){
return _cf4[0].split(_cf2)[1];
}else{
return null;
}
},getCacheBusterParameter:function(){
return this.CACHE_BUSTER_PARAM_NAME+"="+new Date().getTime()+"_"+this.CACHE_BUSTER++;
},stripeTable:function(_cf6,_cf7,_cf8){
var _cf9=_cf6.tBodies[0];
var _cfa=(_cf7?2:1);
if(_cf9.rows.length<_cfa){
return;
}
var rows=_cf9.rows;
for(var i=0;i<rows.length;i+=_cfa){
curam.debug.log("curam.util.stripeTable(%s, %s): i = %s",_cf6,_cf7,i);
var _cfb=[rows[i]];
if(_cf7&&rows[i+1]){
_cfb.push(rows[i+1]);
}
_c4a.forEach(_cfb,function(row){
_c4b.remove(row,"odd-last-row");
_c4b.remove(row,"even-last-row");
});
if(i%(2*_cfa)==0){
_c4a.forEach(_cfb,function(row){
cm.replaceClass(row,"odd","even");
});
if(i==_cf8){
_c4a.forEach(_cfb,function(row){
_c4b.add(row,"odd-last-row");
});
}
}else{
_c4a.forEach(_cfb,function(row){
cm.replaceClass(row,"even","odd");
});
if(i==_cf8){
_c4a.forEach(_cfb,function(row){
_c4b.add(row,"even-last-row");
});
}
}
}
},fillString:function(_cfc,_cfd){
var _cfe="";
while(_cfd>0){
_cfe+=_cfc;
_cfd-=1;
}
return _cfe;
},updateHeader:function(qId,_cff,_d00,_d01){
var _d02=dom.byId("header_"+qId);
_d02.firstChild.nextSibling.innerHTML=_cff;
answerCell=dom.byId("chosenAnswer_"+qId);
answerCell.innerHTML=_d00;
sourceCell=dom.byId("chosenSource_"+qId);
sourceCell.innerHTML=_d01;
},search:function(_d03,_d04){
var _d05=_c45.byId(_d03).get("value");
var _d06=_c45.byId(_d04);
var _d07=_d06?_d06.get("value"):null;
var _d08="";
var _d09;
var _d0a;
if(_d07){
_d0a=_d07.split("|");
_d08=_d0a[0];
_d09=_d0a[1];
}
var _d0b=curam.util.defaultSearchPageID;
var _d0c="";
if(_d08===""){
_d0c=_d0b+"Page.do?searchText="+encodeURIComponent(_d05);
}else{
_d0c=_d09+"Page.do?searchText="+encodeURIComponent(_d05)+"&searchType="+encodeURIComponent(_d08);
}
var _d0d=new curam.ui.PageRequest(_d0c);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_d0d);
});
},updateDefaultSearchText:function(_d0e,_d0f){
var _d10=_c45.byId(_d0e);
var _d11=_c45.byId(_d0f);
var _d12=_d10?_d10.get("value"):null;
var str=_d12.split("|")[2];
_d11.set("placeHolder",str);
},updateSearchBtnState:function(_d13,_d14){
var _d15=_c45.byId(_d13);
var btn=dom.byId(_d14);
var _d16=_d15.get("value");
if(!_d16||lang.trim(_d16).length<1){
_c4b.add(btn,"dijitDisabled");
}else{
_c4b.remove(btn,"dijitDisabled");
}
},furtherOptionsSearch:function(){
var _d17=curam.util.furtherOptionsPageID+"Page.do";
var _d18=new curam.ui.PageRequest(_d17);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_d18);
});
},searchButtonStatus:function(_d19){
var btn=dojo.byId(_d19);
if(!dojo.hasClass(btn,"dijitDisabled")){
return true;
}
},getPageHeight:function(){
var _d1a=400;
var _d1b=0;
if(_c4e("frameset").length>0){
curam.debug.log("curam.util.getPageHeight() "+_c50.getProperty("curam.util.default.height"),_d1a);
_d1b=_d1a;
}else{
var _d1c=function(node){
if(!node){
curam.debug.log(_c50.getProperty("curam.util.node"));
return 0;
}
var mb=geom.getMarginSize(node);
var pos=geom.position(node);
return pos.y+mb.h;
};
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")){
var _d1d=_c4e("div.bottom")[0];
var _d1e=_d1c(_d1d);
curam.debug.log(_c50.getProperty("curam.util.page.height"),_d1e);
curam.debug.log(_c50.getProperty("curam.util.ie7.issue"));
_d1b=_d1e+1;
}else{
var _d1f=dom.byId("content")||dom.byId("wizard-content");
var _d20=_c4e("> *",_d1f).filter(function(n){
return n.tagName.indexOf("SCRIPT")<0&&_c49.get(n,"visibility")!="hidden"&&_c49.get(n,"display")!="none";
});
var _d21=_d20[0];
for(var i=1;i<_d20.length;i++){
if(_d1c(_d20[i])>=_d1c(_d21)){
_d21=_d20[i];
}
}
_d1b=_d1c(_d21);
curam.debug.log("curam.util.getPageHeight() "+_c50.getProperty("curam.util.base.height"),_d1b);
var _d22=_c4e(".actions-panel",_c48.body());
if(_d22.length>0){
var _d23=geom.getMarginBox(_d22[0]).h;
curam.debug.log("curam.util.getPageHeight() "+_c50.getProperty("curam.util.panel.height"));
_d1b+=_d23;
_d1b+=10;
}
var _d24=_c4e("body.details");
if(_d24.length>0){
curam.debug.log("curam.util.getPageHeight() "+_c50.getProperty("curam.util.bar.height"));
_d1b+=20;
}
}
}
curam.debug.log("curam.util.getPageHeight() "+_c50.getProperty("curam.util.returning"),_d1b);
return _d1b;
},toCommaSeparatedList:function(_d25){
var _d26="";
for(var i=0;i<_d25.length;i++){
_d26+=_d25[i];
if(i<_d25.length-1){
_d26+=",";
}
}
return _d26;
},skipLinkFocus:function(){
var dest=dojo.byId("skip-dest");
if(dest){
dest.focus();
}
},showHideSkipLink:function(e){
var _d27=dojo.byId("skipLink");
if(_d27){
var _d28=_d27.parentNode;
if(e.type=="focus"&&_c4b.contains(_d28,"hidden")){
_c4b.remove(_d28,"hidden");
}else{
if(e.type=="blur"&&!_c4b.contains(_d28,"hidden")){
_c4b.add(_d28,"hidden");
}
}
}
},setupGenericKeyHandler:function(){
_c47(function(){
var f=function(_d29){
if(dojo.global.jsScreenContext.hasContextBits("MODAL")&&_d29.keyCode==27){
var ev=_c4d.fix(_d29);
var _d2a=_c45.byId(ev.target.id);
var _d2b=typeof _d2a!="undefined"&&_d2a.baseClass=="dijitTextBox dijitComboBox";
if(!_d2b){
curam.dialog.closeModalDialog();
}
}
if(_d29.keyCode==13){
var ev=_c4d.fix(_d29);
var _d2c=ev.target.type=="text";
var _d2d=ev.target.type=="radio";
var _d2e=ev.target.type=="checkbox";
var _d2f=ev.target.type=="select-multiple";
var _d30=ev.target.type=="password";
var _d31=_c45.byId(ev.target.id);
if(typeof _d31!="undefined"){
var _d32=_c45.byNode(dojo.byId("widget_"+ev.target.id));
if(_d32&&_d32.enterKeyOnOpenDropDown){
_d32.enterKeyOnOpenDropDown=false;
return false;
}
}
var _d33=typeof _d31!="undefined"&&_d31.baseClass=="dijitComboBox";
if((!_d2c&&!_d2d&&!_d2e&&!_d2f&&!_d30)||_d33){
return true;
}
var _d34=null;
var _d35=_c4e(".curam-default-action");
if(_d35.length>0){
_d34=_d35[0];
}else{
var _d36=_c4e("input[type='submit']");
if(_d36.length>0){
_d34=_d36[0];
}
}
if(_d34!=null){
_c4d.stop(_c4d.fix(_d29));
curam.util.clickButton(_d34);
return false;
}
dojo.require("curam.dateSelectorUtil");
var _d37=dojo.byId("year");
if(_d37){
dojo.stopEvent(dojo.fixEvent(_d29));
curam.dateSelectorUtil.updateCalendar();
}
}
return true;
};
curam.util.connect(_c48.body(),"onkeyup",f);
});
},enterKeyPress:function(_d38){
if(_d38.keyCode==13){
return true;
}
},isShiftTab:function(e){
if(e.shiftKey&&e.keyCode==9){
var elem,evt=e?e:event;
if(evt.srcElement){
elem=evt.srcElement;
}else{
if(evt.target){
elem=evt.target;
}
}
if(elem.previousSibling.className=="dijitDialogHelpIcon"){
return false;
}else{
var _d39=elem.parentElement.parentElement.id;
var _d3a=dojo.byId("end-"+_d39);
if(_d3a){
_d3a.focus();
}
}
}
},focusHelpIconOnTab:function(e){
if(!e.shiftKey&&e.keyCode==9){
var _d3b=dojo.query(".dijitDialogHelpIcon")[0];
if(_d3b){
setTimeout(function(){
_d3b.focus();
},5);
}
}
},swapState:function(node,_d3c,_d3d,_d3e){
if(_d3c){
_c4b.replace(node,_d3d,_d3e);
}else{
_c4b.replace(node,_d3e,_d3d);
}
},makeQueryString:function(_d3f){
if(!_d3f||_d3f.length==0){
return "";
}
var _d40=[];
for(var _d41 in _d3f){
_d40.push(_d41+"="+encodeURIComponent(_d3f[_d41]));
}
return "?"+_d40.join("&");
},clickHandlerForListActionMenu:function(url,_d42,_d43,_d44){
if(_d42){
var href=curam.util.replaceUrlParam(url,"o3frame","modal");
var ctx=dojo.global.jsScreenContext;
ctx.addContextBits("MODAL");
href=curam.util.replaceUrlParam(href,"o3ctx",ctx.getValue());
curam.util.redirectWindow(href);
return;
}
var _d45={href:url};
require(["curam/ui/UIMPageAdaptor"]);
if(curam.ui.UIMPageAdaptor.allowLinkToContinue(_d45)){
dojo.global.location=url;
return;
}
if(_d45!=null){
if(_d44){
_c4d.fix(_d44);
_c4d.stop(_d44);
}
if(!_d45.href||_d45.href.length==0){
return;
}
if(_d43&&!curam.util.isInternal(url)){
dojo.global.open(url);
}else{
if(curam.ui.UIMPageAdaptor.isLinkValidForTabProcessing(_d45)){
var _d46=new curam.ui.PageRequest(_d45.href);
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")||dojo.global.jsScreenContext.hasContextBits("NESTED_UIM")){
_d46.pageHolder=dojo.global;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_d46);
});
}
}
}
},clickHandlerForMailtoLinks:function(_d47,url){
dojo.stopEvent(_d47);
var _d48=dojo.query("#mailto_frame")[0];
if(!_d48){
_d48=dojo.io.iframe.create("mailto_frame","");
}
_d48.src=url;
return false;
},isInternal:function(url){
var path=url.split("?")[0];
var _d49=path.match("Page.do");
if(_d49!=null){
return true;
}
return false;
},getLastPathSegmentWithQueryString:function(url){
var _d4a=url.split("?");
var _d4b=_d4a[0].split("/");
return _d4b[_d4b.length-1]+(_d4a[1]?"?"+_d4a[1]:"");
},replaceSubmitButton:function(name,_d4c){
if(curam.replacedButtons[name]=="true"){
return;
}
var _d4d="__o3btn."+name;
var _d4e;
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_d4e=_c4e("input[id='"+_d4d+"']");
}else{
_d4e=_c4e("input[name='"+_d4d+"']");
}
_d4e.forEach(function(_d4f,_d50,_d51){
if(_d4c){
var _d52=_d51[1];
_d52.setAttribute("value",_d4c);
}
_d4f.tabIndex=-1;
var _d53=_d4f.parentNode;
var _d54="btn-id-"+_d50;
curam.util.setupWidgetLoadMask("a."+_d54);
var _d55="ac initially-hidden-widget "+_d54;
if(_c4b.contains(_d4f,"first-action-control")){
_d55+=" first-action-control";
}
var _d56=_c46.create("a",{"class":_d55,href:"#"},_d4f,"before");
var _d57=dojo.query(".page-level-menu")[0];
if(_d57){
dojo.attr(_d56,"title",_d4f.value);
}
_c46.create("span",{"class":"filler"},_d56,"before");
var left=_c46.create("span",{"class":"left-corner"},_d56);
var _d58=_c46.create("span",{"class":"right-corner"},left);
var _d59=_c46.create("span",{"class":"middle"},_d58);
_d59.appendChild(document.createTextNode(_d4f.value));
curam.util.addActionControlClass(_d56);
on(_d56,"click",function(_d5a){
curam.util.clickButton(this._submitButton);
_c4d.stop(_d5a);
});
_d56._submitButton=_d51[0];
_c4b.add(_d4f,"hidden-button");
});
curam.replacedButtons[name]="true";
},setupWidgetLoadMask:function(_d5b){
curam.util.subscribe("/curam/page/loaded",function(){
var _d5c=_c4e(_d5b)[0];
if(_d5c){
_c49.set(_d5c,"visibility","visible");
}else{
curam.debug.log("setupButtonLoadMask: "+_c50.getProperty("curam.util.not.found")+"'"+_d5b+"'"+_c50.getProperty("curam.util.ignore.mask"));
}
});
},optReplaceSubmitButton:function(name){
if(curam.util.getFrameRoot(dojo.global,"wizard")==null){
curam.util.replaceSubmitButton(name);
return;
}
var _d5d=curam.util.getFrameRoot(dojo.global,"wizard").navframe.wizardNavigator;
if(_d5d.delegatesSubmit[jsPageID]!="assumed"){
curam.util.replaceSubmitButton(name);
}
},clickButton:function(_d5e){
var _d5f=dom.byId("mainForm");
var _d60;
if(!_d5e){
curam.debug.log("curam.util.clickButton: "+_c50.getProperty("curam.util..no.arg"));
return;
}
if(typeof (_d5e)=="string"){
var _d61=_d5e;
curam.debug.log("curam.util.clickButton: "+_c50.getProperty("curam.util.searching")+_c50.getProperty("curam.util.id.of")+"'"+_d61+"'.");
_d5e=_c4e("input[id='"+_d61+"']")[0];
if(!_d5e.form&&!_d5e.id){
curam.debug.log("curam.util.clickButton: "+_c50.getProperty("curam.util.searched")+_c50.getProperty("curam.util.id.of")+"'"+_d61+_c50.getProperty("curam.util.exiting"));
return;
}
}
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_d60=_d5e;
}else{
_d60=_c4e("input[name='"+_d5e.id+"']",_d5f)[0];
}
try{
if(attr.get(_d5f,"action").indexOf(jsPageID)==0){
curam.util.publishRefreshEvent();
}
_d60.click();
}
catch(e){
curam.debug.log(_c50.getProperty("curam.util.exception.clicking"));
}
},printPage:function(_d62){
_c4d.stop(_d62);
var _d63=dojo.window.get(_d62.currentTarget.ownerDocument);
var _d64=_d63.frameElement;
var _d65=_d64;
while(_d65&&!dojo.hasClass(_d65,"tab-content-holder")){
_d65=_d65.parentNode;
}
var _d66=_d65;
var _d67=dojo.query(".detailsPanelFrame",_d66)[0];
if(_d67!=undefined&&_d67!=null){
_d67.contentWindow.focus();
_d67.contentWindow.print();
}
_d63.focus();
_d63.print();
return false;
},addSelectedClass:function(_d68){
_c4b.add(_d68.target,"selected");
},removeSelectedClass:function(_d69){
_c4b.remove(_d69.target,"selected");
},openHelpPage:function(_d6a,_d6b){
_c4d.stop(_d6a);
dojo.global.open(_d6b);
},connect:function(_d6c,_d6d,_d6e){
var h=function(_d6f){
_d6e(_c4d.fix(_d6f));
};
if(has("ie")&&has("ie")<9){
_d6c.attachEvent(_d6d,h);
_c4f.addOnWindowUnload(function(){
_d6c.detachEvent(_d6d,h);
});
return {object:_d6c,eventName:_d6d,handler:h};
}else{
var _d70=_d6d;
if(_d6d.indexOf("on")==0){
_d70=_d6d.slice(2);
}
var dt=on(_d6c,_d70,h);
_c4f.addOnWindowUnload(function(){
dt.remove();
});
return dt;
}
},disconnect:function(_d71){
if(has("ie")&&has("ie")<9){
_d71.object.detachEvent(_d71.eventName,_d71.handler);
}else{
_d71.remove();
}
},subscribe:function(_d72,_d73){
var st=_c4c.subscribe(_d72,_d73);
_c4f.addOnWindowUnload(function(){
st.remove();
});
return st;
},unsubscribe:function(_d74){
_d74.remove();
},addActionControlClickListener:function(_d75){
var _d76=dom.byId(_d75);
var _d77=_c4e(".ac",_d76);
if(_d77.length>0){
for(var i=0;i<_d77.length;i++){
var _d78=_d77[i];
curam.util.addActionControlClass(_d78);
}
}
},addActionControlClass:function(_d79){
curam.util.connect(_d79,"onmousedown",function(){
_c4b.add(_d79,"selected-button");
curam.util.connect(_d79,"onmouseout",function(){
_c4b.remove(_d79,"selected-button");
});
});
},getClusterActionSet:function(){
var _d7a=dom.byId("content");
var _d7b=_c4e(".blue-action-set",_d7a);
if(_d7b.length>0){
for(var i=0;i<_d7b.length;i++){
curam.util.addActionControlClickListener(_d7b[i]);
}
}
},adjustActionButtonWidth:function(){
if(has("ie")==8){
_c47(function(){
if(dojo.global.jsScreenContext.hasContextBits("MODAL")){
_c4e(".action-set > a").forEach(function(node){
if(node.childNodes[0].offsetWidth>node.offsetWidth){
_c49.set(node,"width",node.childNodes[0].offsetWidth+"px");
_c49.set(node,"display","block");
_c49.set(node,"display","inline-block");
}
});
}
});
}
},setRpu:function(url,rtc,_d7c){
if(!url||!rtc||!rtc.getHref()){
throw {name:"Unexpected values",message:"This value not allowed for url or rtc"};
}
var _d7d=curam.util.getLastPathSegmentWithQueryString(rtc.getHref());
_d7d=curam.util.removeUrlParam(_d7d,curam.util.Constants.RETURN_PAGE_PARAM);
if(_d7c){
var i;
for(i=0;i<_d7c.length;i++){
if(!_d7c[i].key||!_d7c[i].value){
throw {name:"undefined value error",message:"The object did not contain a valid key/value pair"};
}
_d7d=curam.util.replaceUrlParam(_d7d,_d7c[i].key,_d7c[i].value);
}
}
var _d7e=curam.util.replaceUrlParam(url,curam.util.Constants.RETURN_PAGE_PARAM,encodeURIComponent(_d7d));
curam.debug.log("curam.util.setRpu "+_c50.getProperty("curam.util.added.rpu")+_d7e);
return _d7e;
},retrieveBaseURL:function(){
return dojo.global.location.href.match(".*://[^/]*/[^/]*");
},removeRoleRegion:function(){
var body=dojo.query("body")[0];
dojo.removeAttr(body,"role");
},iframeTitleFallBack:function(){
var _d7f=curam.tab.getContainerTab(curam.tab.getContentPanelIframe());
var _d80=dojo.byId(curam.tab.getContentPanelIframe());
var _d81=_d80.contentWindow.document.title;
var _d82=dojo.query("div.nowrapTabStrip.dijitTabContainerTop-tabs > div.dijitTabChecked.dijitChecked")[0];
var _d83=dojo.query("span.tabLabel",_d82)[0];
var _d84=dojo.query("div.nowrapTabStrip.dijitTabNoLayout > div.dijitTabChecked.dijitChecked",_d7f.domNode)[0];
var _d85=dojo.query("span.tabLabel",_d84)[0];
if(_d81&&_d81!=null){
return _d81;
}else{
if(_d84){
return _d85.innerHTML;
}else{
return _d83.innerHTML;
}
}
},addClassToLastNodeInContentArea:function(){
var _d86=_c4e("> div","content");
var _d87=_d86.length;
if(_d87==0){
return "No need to add";
}
var _d88=_d86[--_d87];
while(_c4b.contains(_d88,"hidden-action-set")&&_d88){
_d88=_d86[--_d87];
}
_c4b.add(_d88,"last-node");
},highContrastModeType:function(){
var _d89=dojo.query("body.high-contrast")[0];
return _d89;
},processBidiContextual:function(_d8a){
_d8a.dir=bidi.prototype._checkContextual(_d8a.value);
},getCookie:function(name){
var dc=document.cookie;
var _d8b=name+"=";
var _d8c=dc.indexOf("; "+_d8b);
if(_d8c==-1){
_d8c=dc.indexOf(_d8b);
if(_d8c!=0){
return null;
}
}else{
_d8c+=2;
}
var end=document.cookie.indexOf(";",_d8c);
if(end==-1){
end=dc.length;
}
return unescape(dc.substring(_d8c+_d8b.length,end));
}});
return curam.util;
});
},"curam/dialog":function(){
define("curam/dialog",["curam/util","curam/debug","curam/util/external","curam/util/Refresh","curam/tab","curam/util/RuntimeContext","curam/define","curam/util/onLoad","cm/_base/_dom","curam/util/ResourceBundle"],function(util,_d8d,_d8e){
dojo.requireLocalization("curam.application","Debug");
var _d8f=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.dialog",{MODAL_PREV_FLAG:"o3modalprev",MODAL_PREV_FLAG_INPUT:"curam_dialog_prev_marker",FORCE_CLOSE:false,ERROR_MESSAGES_HEADER:"error-messages-header",_hierarchy:[],_id:null,_displayedHandlerUnsToken:null,_displayed:false,_size:null,_justClose:false,validTargets:{"_top":true,"_self":true},initModal:function(_d90,_d91){
curam.dialog.pageId=_d90;
curam.dialog.messagesExist=_d91;
var _d92=util.getTopmostWindow();
var _d93=false;
var _d94=_d92.dojo.subscribe("/curam/dialog/SetId",this,function(_d95){
_d8d.log("curam.dialog: "+_d8f.getProperty("curam.dialog.id"),_d95);
curam.dialog._id=_d95;
_d93=true;
_d92.dojo.unsubscribe(_d94);
});
_d92.dojo.publish("/curam/dialog/init");
if(!_d93){
_d8d.log("curam.dialog: "+_d8f.getProperty("curam.dialog.no.id"));
_d92.dojo.unsubscribe(_d94);
}
if(curam.dialog.closeDialog(false)){
return;
}
curam.dialog._displayedHandlerUnsToken=util.getTopmostWindow().dojo.subscribe("/curam/dialog/displayed",null,function(_d96,size){
if(_d96==curam.dialog._id){
curam.dialog._displayed=true;
curam.dialog._size=size;
util.getTopmostWindow().dojo.unsubscribe(curam.dialog._displayedHandlerUnsToken);
curam.dialog._displayedHandlerUnsToken=null;
}
});
if(jsScreenContext.hasContextBits("AGENDA")||jsScreenContext.hasContextBits("TREE")){
dojo.addOnUnload(function(){
util.getTopmostWindow().dojo.unsubscribe(curam.dialog._displayedHandlerUnsToken);
curam.dialog._displayedHandlerUnsToken=null;
});
}
dojo.addOnLoad(function(){
util.connect(dojo.body(),"onclick",curam.dialog.modalEventHandler);
for(var i=0;i<document.forms.length;i++){
var form=document.forms[i];
curam.dialog.addFormInput(form,"hidden","o3frame","modal");
var _d97=dojo.byId("o3ctx");
var sc=new curam.util.ScreenContext(jsScreenContext.getValue());
sc.addContextBits("ACTION|ERROR");
_d97.value=sc.getValue();
util.connect(form,"onsubmit",curam.dialog.formSubmitHandler);
}
window.curamModal=true;
});
dojo.addOnUnload(function(){
util.getTopmostWindow().dojo.publish("/curam/dialog/iframeUnloaded",[curam.dialog._id,window]);
});
if(_d93){
dojo.publish("/curam/dialog/ready");
}
},closeDialog:function(_d98){
if(_d98){
curam.dialog.forceClose();
}
var _d99=curam.dialog.checkClose(curam.dialog.pageId);
if(_d99){
util.onLoad.addPublisher(function(_d9a){
_d9a.modalClosing=true;
});
if(curam.dialog.messagesExist){
dojo.addOnLoad(function(){
var _d9b=dojo.byId(util.ERROR_MESSAGES_CONTAINER);
var _d9c=dojo.byId(util.ERROR_MESSAGES_LIST);
var _d9d=dojo.byId(curam.dialog.ERROR_MESSAGES_HEADER);
if(_d9c&&_d9d){
util.saveInformationalMsgs(_d99);
util.disableInformationalLoad();
}else{
_d99();
}
});
}else{
_d99();
}
return true;
}
return false;
},addFormInput:function(form,type,name,_d9e){
return dojo.create("input",{"type":type,"name":name,"value":_d9e},form);
},checkClose:function(_d9f){
if(curam.dialog._justClose){
return function(){
curam.dialog.closeModalDialog();
};
}
var _da0=curam.dialog.getParentWindow(window);
if(!_da0){
return false;
}
var href=window.location.href;
var _da1=curam.dialog.MODAL_PREV_FLAG;
var _da2=util.getUrlParamValue(href,_da1);
var _da3=true;
if(_da2){
if(_da0){
if(_da2==_d9f){
_da3=false;
}
}
}else{
_da3=false;
}
var _da4=util.getUrlParamValue(href,"o3ctx");
if(_da4){
var sc=new curam.util.ScreenContext();
sc.setContext(_da4);
if(sc.hasContextBits("TREE|ACTION")){
_da3=false;
}
}
if(_da3||curam.dialog.FORCE_CLOSE){
if(!curam.dialog.FORCE_CLOSE){
if(_da2=="user-prefs-editor"){
return function(){
if(_da0&&_da0.location!==util.getTopmostWindow().location){
curam.dialog.doRedirect(_da0);
}
curam.dialog.closeModalDialog();
};
}
return function(){
var rp=util.removeUrlParam;
href=rp(rp(rp(href,_da1),"o3frame"),util.PREVENT_CACHE_FLAG);
href=util.adjustTargetContext(_da0,href);
if(_da0&&_da0.location!==util.getTopmostWindow().location){
curam.dialog.doRedirect(_da0,href,true);
}else{
curam.tab.getTabController().handleLinkClick(href);
}
curam.dialog.closeModalDialog();
};
}else{
return function(){
if(_da0!==util.getTopmostWindow()){
_da0.curam.util.loadInformationalMsgs();
}
curam.dialog.closeModalDialog();
};
}
}
return false;
},getParentWindow:function(_da5){
if(!_da5){
_d8d.log("curam.dialog.getParentWindow(): "+_d8f.getProperty("curam.dialog.no.child"),window);
_d8d.log("returning as parent = ",window.parent.location.href);
return window.parent;
}
_d8d.log("curam.dialog.getParentWindow(): "+_d8f.getProperty("curam.dialog.child"),_da5.location.href);
var _da6=curam.dialog._getDialogHierarchy();
for(var i=0;i<_da6.length;i++){
if(_da6[i]==_da5){
var _da7=(i>0)?_da6[i-1]:_da6[0];
_d8d.log("curam.dialog.getParentWindow(): "+_d8f.getProperty("curam.dialog.parent.window"),_da7);
return _da7;
}
}
_d8d.log("curam.dialog.getParentWindow(): "+_d8f.getProperty("curam.dialog.child.not.found"),_da5.location.href);
_d8d.log("curam.dialog.getParentWindow(): "+_d8f.getProperty("curam.dialog.hierarchy"),_da6);
var ret=_da6.length>0?_da6[_da6.length-1]:undefined;
_d8d.log("curam.dialog.getParentWindow(): "+_d8f.getProperty("curam.dialog.returning.parent"),ret?ret.location.href:"undefined");
return ret;
},_getDialogHierarchy:function(){
var _da8=util.getTopmostWindow();
_da8.require(["curam/dialog"]);
return _da8.curam.dialog._hierarchy;
},pushOntoDialogHierarchy:function(_da9){
var _daa=curam.dialog._getDialogHierarchy();
if(dojo.indexOf(_daa,_da9)<0){
_daa.push(_da9);
_d8d.log(_d8f.getProperty("curam.dialog.add.hierarchy"),_da9.location.href);
_d8d.log(_d8f.getProperty("curam.dialog.full.hierarchy"),_daa);
}
},removeFromDialogHierarchy:function(_dab){
var _dac=curam.dialog._getDialogHierarchy();
if(!_dab||_dac[_dac.length-1]==_dab){
_dac.pop();
}else{
_d8d.log("curam.dialog.removeFromDialogHierarchy(): "+_d8f.getProperty("curam.dialog.ignore.request"));
try{
_d8d.log(_dab.location.href);
}
catch(e){
_d8d.log(e.message);
}
}
},stripPageOrActionFromUrl:function(url){
var idx=url.lastIndexOf("Page.do");
var len=7;
if(idx<0){
idx=url.lastIndexOf("Action.do");
len=9;
}
if(idx<0){
idx=url.lastIndexOf("Frame.do");
len=8;
}
if(idx>-1&&idx==url.length-len){
return url.substring(0,idx);
}
return url;
},_isSameBaseUrl:function(href,rtc,_dad){
if(href&&href.indexOf("#")==0){
return true;
}
var _dae=href.split("?");
var _daf=rtc.getHref().split("?");
if(_dae[0].indexOf("/")<0){
var _db0=_daf[0].split("/");
_daf[0]=_db0[_db0.length-1];
}
if(_daf[0].indexOf("/")<0){
var _db0=_dae[0].split("/");
_dae[0]=_db0[_db0.length-1];
}
if(_dad&&_dad==true){
_dae[0]=curam.dialog.stripPageOrActionFromUrl(_dae[0]);
_daf[0]=curam.dialog.stripPageOrActionFromUrl(_daf[0]);
}
if(_dae[0]==_daf[0]){
return true;
}
return false;
},modalEventHandler:function(_db1){
curam.dialog._doHandleModalEvent(_db1,new curam.util.RuntimeContext(window),curam.dialog.closeModalDialog,curam.dialog.doRedirect);
},_doHandleModalEvent:function(e,rtc,_db2,_db3){
var _db4=e.target;
var u=util;
switch(_db4.tagName){
case "INPUT":
if(dojo.attr(_db4,"type")=="submit"&&typeof _db4.form!="undefined"){
_db4.form.setAttribute("keepModal",_db4.getAttribute("keepModal"));
}
return true;
case "IMG":
case "SPAN":
case "DIV":
_db4=cm.getParentByType(_db4,"A");
if(_db4==null){
return;
}
case "A":
if(_db4._submitButton){
_db4._submitButton.form.setAttribute("keepModal",_db4._submitButton.getAttribute("keepModal"));
return;
}
break;
default:
return true;
}
var _db5=dojo.stopEvent;
var href=_db4.getAttribute("href");
if(href==""){
_db2();
return false;
}
if(href.indexOf("javascript")==0){
return false;
}
var ctx=jsScreenContext;
ctx.addContextBits("MODAL");
if(!href){
return false;
}
var _db6=_db4.getAttribute("target");
if(_db6&&!curam.dialog.validTargets[_db6]){
return true;
}
if(href&&href.indexOf("/servlet/FileDownload?")>-1){
var _db7=dojo.create("iframe",{src:href},dojo.body());
_db7.style.display="none";
_db5(e);
return false;
}
if(dojo.hasClass(_db4,"external-link")){
return true;
}
if(util.isSameUrl(href,null,rtc)){
if(href.indexOf("#")<0){
href=u.replaceUrlParam(href,"o3frame","modal");
href=u.replaceUrlParam(href,"o3ctx",ctx.getValue());
_db3(window,href);
return false;
}
return true;
}
if(href&&curam.dialog._isSameBaseUrl(href,rtc,true)&&!_db4.getAttribute("keepModal")){
_db4.setAttribute("keepModal","true");
}
var _db8=curam.dialog.getParentWindow(rtc.contextObject());
if(_db4&&_db4.getAttribute){
_db5(e);
if(_db4.getAttribute("keepModal")=="true"){
href=u.replaceUrlParam(href,"o3frame","modal");
href=u.replaceUrlParam(href,"o3ctx",ctx.getValue());
_db3(window,href);
}else{
if(_db8){
href=u.removeUrlParam(href,"o3frame");
href=u.removeUrlParam(href,curam.dialog.MODAL_PREV_FLAG);
if(_db8.location!==util.getTopmostWindow().location){
var _db9=new curam.util.RuntimeContext(_db8);
var _dba=_db9.getHref();
_dba=u.removeUrlParam(_dba,"o3frame");
if(util.isActionPage(_dba)){
if(!curam.dialog._isSameBaseUrl(href,_db9,true)){
href=u.adjustTargetContext(_db8,href);
_db3(_db8,href);
}
}else{
if(!util.isSameUrl(href,_dba)){
href=u.adjustTargetContext(_db8,href);
curam.dialog.doRedirect(_db8,href);
}
}
}else{
var _dbb=new curam.util.ScreenContext("TAB");
href=u.replaceUrlParam(href,"o3ctx",_dbb.getValue());
curam.tab.getTabController().handleLinkClick(href);
}
_db2();
}
}
return false;
}
if(_db8&&typeof (_db4)=="undefined"||_db4==null||_db4=="_self"||_db4==""){
_db5(e);
href=href.replace(/[&?]o3frame=modal/g,"").replace("%3Fo3frame%3Dmodal","").replace("?o3frame%3Dmodal","");
href=util.updateCtx(href);
if(_db8.location!==util.getTopmostWindow().location){
_db3(_db8,href);
}else{
var _dbb=new curam.util.ScreenContext("TAB");
href=u.replaceUrlParam(href,"o3ctx",_dbb.getValue());
curam.tab.getTabController().handleLinkClick(href);
}
_db2();
return false;
}
return true;
},formSubmitHandler:function(e){
var _dbc=curam.dialog.getParentWindow(window);
if(typeof _dbc=="undefined"){
return true;
}
e.target.method="post";
e.target.setAttribute("target",window.name);
var _dbd=e.target.action;
var _dbe=curam.dialog.MODAL_PREV_FLAG;
var _dbf=curam.dialog.MODAL_PREV_FLAG_INPUT;
var u=util;
var _dc0=dojo.byId(_dbf);
if(_dc0){
_dc0.parentNode.removeChild(_dc0);
}
if(e.target.getAttribute("keepModal")!="true"&&!jsScreenContext.hasContextBits("AGENDA")){
var _dc1="multipart/form-data";
if(e.target.enctype==_dc1||e.target.encoding==_dc1){
e.target.action=u.removeUrlParam(_dbd,_dbe);
_dc0=curam.dialog.addFormInput(e.target,"hidden",_dbe,curam.dialog.pageId);
_dc0.setAttribute("id",_dbf);
_dc0.id=_dbf;
}else{
e.target.action=u.replaceUrlParam(_dbd,_dbe,curam.dialog.pageId);
}
}else{
e.target.action=u.removeUrlParam(_dbd,_dbe);
}
_dbc.curam.util.invalidatePage();
if(!jsScreenContext.hasContextBits("EXTAPP")){
util.firePageSubmittedEvent("dialog");
}
return true;
},forceClose:function(){
curam.dialog.FORCE_CLOSE=true;
},forceParentRefresh:function(){
var _dc2=curam.dialog.getParentWindow(window);
if(!_dc2){
return;
}
_dc2.curam.util.FORCE_REFRESH=true;
},closeModalDialog:function(){
var _dc3=util.getTopmostWindow();
if(curam.dialog._displayedHandlerUnsToken!=null){
_dc3.dojo.unsubscribe(curam.dialog._displayedHandlerUnsToken);
curam.dialog._displayedHandlerUnsToken=null;
}
if(typeof (curam.dialog._id)=="undefined"||curam.dialog._id==null){
var _dc4=window.frameElement.id;
var _dc5=_dc4.substring(7);
curam.dialog._id=_dc5;
_d8d.log("curam.dialog.closeModalDialog() "+_d8f.getProperty("curam.dialog.modal.id")+_dc5);
}
_d8d.log("publishing /curam/dialog/close for ",curam.dialog._id);
util.getTopmostWindow().dojo.publish("/curam/dialog/close",[curam.dialog._id]);
_d8d.log("publishing /curam/dialog/close for ",curam.dialog._id);
},parseWindowOptions:function(_dc6){
var opts={};
if(_dc6){
_d8d.log("curam.dialog.parseWindowOptions "+_d8f.getProperty("curam.dialog.parsing"),_dc6);
var _dc7=_dc6.split(",");
var _dc8;
for(var i=0;i<_dc7.length;i++){
_dc8=_dc7[i].split("=");
opts[_dc8[0]]=_dc8[1];
}
_d8d.log("done:",dojo.toJson(opts));
}else{
_d8d.log("curam.dialog.parseWindowOptions "+_d8f.getProperty("curam.dialog.no.options"));
}
return opts;
},doRedirect:function(_dc9,href,_dca,_dcb){
window.curamDialogRedirecting=true;
_dc9.curam.util.redirectWindow(href,_dca,_dcb);
},closeGracefully:function(){
curam.dialog._justClose=true;
}});
return curam.dialog;
});
},"dijit/_CssStateMixin":function(){
define("dijit/_CssStateMixin",["dojo/touch","dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/_base/lang","dojo/_base/window"],function(_dcc,_dcd,_dce,_dcf,lang,win){
return _dce("dijit._CssStateMixin",[],{cssStateNodes:{},hovering:false,active:false,_applyAttributes:function(){
this.inherited(arguments);
_dcd.forEach(["onmouseenter","onmouseleave",_dcc.press],function(e){
this.connect(this.domNode,e,"_cssMouseEvent");
},this);
_dcd.forEach(["disabled","readOnly","checked","selected","focused","state","hovering","active"],function(attr){
this.watch(attr,lang.hitch(this,"_setStateClass"));
},this);
for(var ap in this.cssStateNodes){
this._trackMouseState(this[ap],this.cssStateNodes[ap]);
}
this._setStateClass();
},_cssMouseEvent:function(_dd0){
if(!this.disabled){
switch(_dd0.type){
case "mouseenter":
case "mouseover":
this._set("hovering",true);
this._set("active",this._mouseDown);
break;
case "mouseleave":
case "mouseout":
this._set("hovering",false);
this._set("active",false);
break;
case "mousedown":
case "touchpress":
this._set("active",true);
this._mouseDown=true;
var _dd1=this.connect(win.body(),_dcc.release,function(){
this._mouseDown=false;
this._set("active",false);
this.disconnect(_dd1);
});
break;
}
}
},_setStateClass:function(){
var _dd2=this.baseClass.split(" ");
function _dd3(_dd4){
_dd2=_dd2.concat(_dcd.map(_dd2,function(c){
return c+_dd4;
}),"dijit"+_dd4);
};
if(!this.isLeftToRight()){
_dd3("Rtl");
}
var _dd5=this.checked=="mixed"?"Mixed":(this.checked?"Checked":"");
if(this.checked){
_dd3(_dd5);
}
if(this.state){
_dd3(this.state);
}
if(this.selected){
_dd3("Selected");
}
if(this.disabled){
_dd3("Disabled");
}else{
if(this.readOnly){
_dd3("ReadOnly");
}else{
if(this.active){
_dd3("Active");
}else{
if(this.hovering){
_dd3("Hover");
}
}
}
}
if(this.focused){
_dd3("Focused");
}
var tn=this.stateNode||this.domNode,_dd6={};
_dcd.forEach(tn.className.split(" "),function(c){
_dd6[c]=true;
});
if("_stateClasses" in this){
_dcd.forEach(this._stateClasses,function(c){
delete _dd6[c];
});
}
_dcd.forEach(_dd2,function(c){
_dd6[c]=true;
});
var _dd7=[];
for(var c in _dd6){
_dd7.push(c);
}
var cls=_dd7.join(" ");
if(cls!=tn.className){
tn.className=cls;
}
this._stateClasses=_dd2;
},_trackMouseState:function(node,_dd8){
var _dd9=false,_dda=false,_ddb=false;
var self=this,cn=lang.hitch(this,"connect",node);
function _ddc(){
var _ddd=("disabled" in self&&self.disabled)||("readonly" in self&&self.readonly);
_dcf.toggle(node,_dd8+"Hover",_dd9&&!_dda&&!_ddd);
_dcf.toggle(node,_dd8+"Active",_dda&&!_ddd);
_dcf.toggle(node,_dd8+"Focused",_ddb&&!_ddd);
};
cn("onmouseenter",function(){
_dd9=true;
_ddc();
});
cn("onmouseleave",function(){
_dd9=false;
_dda=false;
_ddc();
});
cn(_dcc.press,function(){
_dda=true;
_ddc();
});
cn(_dcc.release,function(){
_dda=false;
_ddc();
});
cn("onfocus",function(){
_ddb=true;
_ddc();
});
cn("onblur",function(){
_ddb=false;
_ddc();
});
this.watch("disabled",_ddc);
this.watch("readOnly",_ddc);
}});
});
},"curam/tab/util":function(){
define("curam/tab/util",["dojo/dom-geometry","curam/define","curam/debug","curam/util/ResourceBundle"],function(_dde){
dojo.requireLocalization("curam.application","Debug");
var _ddf=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.tab.util",{toggleDetailsPanel:function(_de0){
_de0=dojo.fixEvent(_de0);
dojo.stopEvent(_de0);
var _de1=_de0.target;
if(_de1._animating){
return;
}
_de1._animating=true;
var _de2=_de1.parentNode;
while(_de2&&!dojo.hasClass(_de2,"detailsPanel-bc")){
_de2=_de2.parentNode;
}
var _de3=_de2;
while(_de2&&!dojo.hasClass(_de2,"summaryPane")){
_de2=_de2.parentNode;
}
var _de4=_de2;
while(_de2){
if(dojo.hasClass(_de2,"dijitBorderContainer")&&!dojo.hasClass(_de2,"detailsPanel-bc")){
break;
}
if(dojo.hasClass(_de2,"tab-wrapper")){
break;
}
_de2=_de2.parentNode;
}
var _de5=_de2;
headerPanelNode=dojo.query(".detailsPanelTitleBar",_de3)[0];
detailsPanelNode=dojo.query(".detailsContentPane",_de3)[0];
var kids=_de5.children;
var _de6=dojo.filter(kids,function(_de7){
if(dojo.hasClass(_de7,"splitter-pane")||dojo.hasClass(_de7,"dijitSplitterH")){
return _de7;
}
})[0];
var _de8=dojo.filter(kids,function(_de9){
if(dojo.hasClass(_de9,"nav-panel")){
return _de9;
}
})[0];
var _dea=_dde.getMarginBoxSimple(headerPanelNode).h;
var _deb=_dde.getMarginBoxSimple(_de4).h;
var _dec=_de6.offsetHeight;
var _ded=_dde.getMarginBoxSimple(_de8).h;
var _dee=dojo.query(".detailsContentPane",_de3)[0];
if(_dea!=_de4.clientHeight){
dojo.addClass(_de1,"collapsed");
dojo.addClass(_dee,"collapsed");
curam.debug.log(_ddf.getProperty("curam.tab.util.collapsing"));
_de3._previousHeight=_deb;
_de8._previousHeight=_ded;
dojo.animateProperty({node:_de4,duration:500,properties:{height:{end:_dea}}}).play();
if(dojo.hasClass(_de6,"splitter-pane")){
dojo.animateProperty({node:detailsPanelNode,duration:500,properties:{height:{end:0}}}).play();
}
dojo.animateProperty({node:_de6,duration:500,properties:{top:{end:(_dea+_dec)}}}).play();
dojo.animateProperty({node:_de8,duration:500,properties:{top:{end:(_dea+_dec)}},onEnd:function(){
_de1._animating=false;
if(dojo.hasClass(_de6,"dijitSplitterH")){
dojo.style(_de8,"height",(_de8._previousHeight+_de3._previousHeight-_dea)+"px");
}
}}).play();
}else{
dojo.removeClass(_de1,"collapsed");
dojo.removeClass(_dee,"collapsed");
curam.debug.log(_ddf.getProperty("curam.tab.util.expanding"));
dojo.style(_de4,"height",_de3._previousHeight+"px");
if(dojo.hasClass(_de6,"splitter-pane")){
dojo.animateProperty({node:detailsPanelNode,duration:500,properties:{height:{end:_de3._previousHeight-_dea}}}).play();
}
dojo.animateProperty({node:_de6,duration:500,properties:{top:{end:(_de3._previousHeight+_dec)}}}).play();
dojo.animateProperty({node:_de8,duration:500,properties:{top:{end:(_de3._previousHeight+_dec)}},onEnd:function(){
_de1._animating=false;
if(dojo.hasClass(_de6,"dijitSplitterH")){
dojo.style(_de8,"height",_de8._previousHeight+"px");
}
}}).play();
}
}});
return curam.tab.util;
});
},"curam/widget/DeferredDropDownButton":function(){
require({cache:{"url:curam/widget/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n"}});
define("curam/widget/DeferredDropDownButton",["dijit/form/DropDownButton","dojo/text!curam/widget/templates/DropDownButton.html","dijit/form/Button","dijit/MenuItem","curam/debug","curam/util","curam/util/ResourceBundle"],function(_def,_df0){
dojo.requireLocalization("curam.application","Debug");
var _df1=new curam.util.ResourceBundle("Debug");
var _df2=dojo.declare("curam.widget.DeferredDropDownButton",dijit.form.DropDownButton,{templateString:_df0,o3tabId:null,useCustomPlaceAlgorithm:false,startup:function(){
if(this._started){
return;
}
var _df3=dojo.attr(this.domNode,"class").split(" ");
dojo.forEach(_df3,dojo.hitch(this,function(_df4){
if(_df4.indexOf("tab-widget-id-")!=-1){
this.o3tabId=_df4.slice(14,_df4.length);
}
}));
this.widgetTemplate=curam.widgetTemplates?curam.widgetTemplates[this.id]:null;
dijit.form.Button.prototype.startup.apply(this);
},toggleDropDown:function(){
if(!this.dropDown&&this.widgetTemplate){
this.widgetTemplate=this.widgetTemplate.split("&lt;").join("<").split("&gt;").join(">").split("&amp;").join("&").split("&quot;").join("'");
var _df5=dojo.create("div",{innerHTML:this.widgetTemplate,style:{display:"none"}},dojo.body());
this.dropDown=dojo.parser.parse(_df5)[0];
var menu=dijit.byNode(_df5.firstChild);
if(menu.getChildren().length==0){
var mi=new dijit.MenuItem({disabled:true,label:LOCALISED_EMPTY_MENU_MARKER});
menu.addChild(mi);
}
this.widgetTemplate=null;
curam.debug.log(_df1.getProperty("curam.widget.DeferredDropDownButton.publish")+" /curam/menu/created "+_df1.getProperty("curam.widget.DeferredDropDownButton.for"),this.o3tabId);
var _df6=curam.util.getTopmostWindow();
_df6.dojo.publish("/curam/menu/created",[this.o3tabId]);
}
this.inherited(arguments);
},openDropDown:function(){
curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm=true;
this.inherited(arguments);
curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm=false;
}});
return _df2;
});
},"dijit/form/FilteringSelect":function(){
define("dijit/form/FilteringSelect",["dojo/data/util/filter","dojo/_base/declare","dojo/_base/Deferred","dojo/_base/lang","./MappedTextBox","./ComboBoxMixin"],function(_df7,_df8,_df9,lang,_dfa,_dfb){
return _df8("dijit.form.FilteringSelect",[_dfa,_dfb],{required:true,_lastDisplayedValue:"",_isValidSubset:function(){
return this._opened;
},isValid:function(){
return !!this.item||(!this.required&&this.get("displayedValue")=="");
},_refreshState:function(){
if(!this.searchTimer){
this.inherited(arguments);
}
},_callbackSetLabel:function(_dfc,_dfd,_dfe,_dff){
if((_dfd&&_dfd[this.searchAttr]!==this._lastQuery)||(!_dfd&&_dfc.length&&this.store.getIdentity(_dfc[0])!=this._lastQuery)){
return;
}
if(!_dfc.length){
this.set("value","",_dff||(_dff===undefined&&!this.focused),this.textbox.value,null);
}else{
this.set("item",_dfc[0],_dff);
}
},_openResultList:function(_e00,_e01,_e02){
if(_e01[this.searchAttr]!==this._lastQuery){
return;
}
this.inherited(arguments);
if(this.item===undefined){
this.validate(true);
}
},_getValueAttr:function(){
return this.valueNode.value;
},_getValueField:function(){
return "value";
},_setValueAttr:function(_e03,_e04,_e05,item){
if(!this._onChangeActive){
_e04=null;
}
if(item===undefined){
if(_e03===null||_e03===""){
_e03="";
if(!lang.isString(_e05)){
this._setDisplayedValueAttr(_e05||"",_e04);
return;
}
}
var self=this;
this._lastQuery=_e03;
_df9.when(this.store.get(_e03),function(item){
self._callbackSetLabel(item?[item]:[],undefined,undefined,_e04);
});
}else{
this.valueNode.value=_e03;
this.inherited(arguments);
}
},_setItemAttr:function(item,_e06,_e07){
this.inherited(arguments);
this._lastDisplayedValue=this.textbox.value;
},_getDisplayQueryString:function(text){
return text.replace(/([\\\*\?])/g,"\\$1");
},_setDisplayedValueAttr:function(_e08,_e09){
if(_e08==null){
_e08="";
}
if(!this._created){
if(!("displayedValue" in this.params)){
return;
}
_e09=false;
}
if(this.store){
this.closeDropDown();
var _e0a=lang.clone(this.query);
var qs=this._getDisplayQueryString(_e08),q;
if(this.store._oldAPI){
q=qs;
}else{
q=_df7.patternToRegExp(qs,this.ignoreCase);
q.toString=function(){
return qs;
};
}
this._lastQuery=_e0a[this.searchAttr]=q;
this.textbox.value=_e08;
this._lastDisplayedValue=_e08;
this._set("displayedValue",_e08);
var _e0b=this;
var _e0c={ignoreCase:this.ignoreCase,deep:true};
lang.mixin(_e0c,this.fetchProperties);
this._fetchHandle=this.store.query(_e0a,_e0c);
_df9.when(this._fetchHandle,function(_e0d){
_e0b._fetchHandle=null;
_e0b._callbackSetLabel(_e0d||[],_e0a,_e0c,_e09);
},function(err){
_e0b._fetchHandle=null;
if(!_e0b._cancelingQuery){
console.error("dijit.form.FilteringSelect: "+err.toString());
}
});
}
},undo:function(){
this.set("displayedValue",this._lastDisplayedValue);
}});
});
},"dijit/_WidgetBase":function(){
define("dijit/_WidgetBase",["require","dojo/_base/array","dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/ready","dojo/Stateful","dojo/topic","dojo/_base/window","./registry"],function(_e0e,_e0f,_e10,_e11,_e12,_e13,dom,_e14,_e15,_e16,_e17,_e18,_e19,lang,on,_e1a,_e1b,_e1c,win,_e1d){
var _e1e=typeof (dojo.global.perf)!="undefined";
if(!_e19.isAsync){
_e1a(0,function(){
var _e1f=["dijit/_base/manager"];
_e0e(_e1f);
});
}
var _e20={};
function _e21(obj){
var ret={};
for(var attr in obj){
ret[attr.toLowerCase()]=true;
}
return ret;
};
function _e22(attr){
return function(val){
_e14[val?"set":"remove"](this.domNode,attr,val);
this._set(attr,val);
};
};
return _e13("dijit._WidgetBase",_e1b,{id:"",_setIdAttr:"domNode",lang:"",_setLangAttr:_e22("lang"),dir:"",_setDirAttr:_e22("dir"),textDir:"","class":"",_setClassAttr:{node:"domNode",type:"class"},style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{},_blankGif:_e11.blankGif||_e0e.toUrl("dojo/resources/blank.gif"),postscript:function(_e23,_e24){
this.create(_e23,_e24);
},create:function(_e25,_e26){
if(_e1e){
perf.widgetStartedLoadingCallback();
}
this.srcNodeRef=dom.byId(_e26);
this._connects=[];
this._supportingWidgets=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_e25){
this.params=_e25;
lang.mixin(this,_e25);
}
this.postMixInProperties();
if(!this.id){
this.id=_e1d.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
_e1d.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _e27=this.srcNodeRef;
if(_e27&&_e27.parentNode&&this.domNode!==_e27){
_e27.parentNode.replaceChild(this.domNode,_e27);
}
}
if(this.domNode){
this.domNode.setAttribute("widgetId",this.id);
}
this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){
delete this.srcNodeRef;
}
this._created=true;
if(_e1e){
perf.widgetLoadedCallback(this);
}
},_applyAttributes:function(){
var ctor=this.constructor,list=ctor._setterAttrs;
if(!list){
list=(ctor._setterAttrs=[]);
for(var attr in this.attributeMap){
list.push(attr);
}
var _e28=ctor.prototype;
for(var _e29 in _e28){
if(_e29 in this.attributeMap){
continue;
}
var _e2a="_set"+_e29.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
})+"Attr";
if(_e2a in _e28){
list.push(_e29);
}
}
}
_e0f.forEach(list,function(attr){
if(this.params&&attr in this.params){
}else{
if(this[attr]){
this.set(attr,this[attr]);
}
}
},this);
for(var _e2b in this.params){
this.set(_e2b,this[_e2b]);
}
},postMixInProperties:function(){
},buildRendering:function(){
if(!this.domNode){
this.domNode=this.srcNodeRef||_e16.create("div");
}
if(this.baseClass){
var _e2c=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_e2c=_e2c.concat(_e0f.map(_e2c,function(name){
return name+"Rtl";
}));
}
_e15.add(this.domNode,_e2c);
}
},postCreate:function(){
},startup:function(){
if(this._started){
return;
}
this._started=true;
_e0f.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
},destroyRecursive:function(_e2d){
this._beingDestroyed=true;
this.destroyDescendants(_e2d);
this.destroy(_e2d);
},destroy:function(_e2e){
this._beingDestroyed=true;
this.uninitialize();
var c;
while((c=this._connects.pop())){
c.remove();
}
var w;
while((w=this._supportingWidgets.pop())){
if(w.destroyRecursive){
w.destroyRecursive();
}else{
if(w.destroy){
w.destroy();
}
}
}
this.destroyRendering(_e2e);
_e1d.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_e2f){
if(this.bgIframe){
this.bgIframe.destroy(_e2f);
delete this.bgIframe;
}
if(this.domNode){
if(_e2f){
_e14.remove(this.domNode,"widgetId");
}else{
_e16.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_e2f){
_e16.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_e30){
_e0f.forEach(this.getChildren(),function(_e31){
if(_e31.destroyRecursive){
_e31.destroyRecursive(_e30);
}
});
},uninitialize:function(){
return false;
},_setStyleAttr:function(_e32){
var _e33=this.domNode;
if(lang.isObject(_e32)){
_e18.set(_e33,_e32);
}else{
if(_e33.style.cssText){
_e33.style.cssText+="; "+_e32;
}else{
_e33.style.cssText=_e32;
}
}
this._set("style",_e32);
},_attrToDom:function(attr,_e34,_e35){
_e35=arguments.length>=3?_e35:this.attributeMap[attr];
_e0f.forEach(lang.isArray(_e35)?_e35:[_e35],function(_e36){
var _e37=this[_e36.node||_e36||"domNode"];
var type=_e36.type||"attribute";
switch(type){
case "attribute":
if(lang.isFunction(_e34)){
_e34=lang.hitch(this,_e34);
}
var _e38=_e36.attribute?_e36.attribute:(/^on[A-Z][a-zA-Z]*$/.test(attr)?attr.toLowerCase():attr);
_e14.set(_e37,_e38,_e34);
break;
case "innerText":
_e37.innerHTML="";
_e37.appendChild(win.doc.createTextNode(_e34));
break;
case "innerHTML":
_e37.innerHTML=_e34;
break;
case "class":
_e15.replace(_e37,_e34,this[attr]);
break;
}
},this);
},get:function(name){
var _e39=this._getAttrNames(name);
return this[_e39.g]?this[_e39.g]():this[name];
},set:function(name,_e3a){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _e3b=this._getAttrNames(name),_e3c=this[_e3b.s];
if(lang.isFunction(_e3c)){
var _e3d=_e3c.apply(this,Array.prototype.slice.call(arguments,1));
}else{
var _e3e=this.focusNode&&!lang.isFunction(this.focusNode)?"focusNode":"domNode",tag=this[_e3e].tagName,_e3f=_e20[tag]||(_e20[tag]=_e21(this[_e3e])),map=name in this.attributeMap?this.attributeMap[name]:_e3b.s in this?this[_e3b.s]:((_e3b.l in _e3f&&typeof _e3a!="function")||/^aria-|^data-|^role$/.test(name))?_e3e:null;
if(map!=null){
this._attrToDom(name,_e3a,map);
}
this._set(name,_e3a);
}
return _e3d||this;
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
});
return (apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr",l:uc.toLowerCase()});
},_set:function(name,_e40){
var _e41=this[name];
this[name]=_e40;
if(this._watchCallbacks&&this._created&&_e40!==_e41){
this._watchCallbacks(name,_e41,_e40);
}
},on:function(type,func){
return _e10.after(this,this._onMap(type),func,true);
},_onMap:function(type){
var ctor=this.constructor,map=ctor._onMap;
if(!map){
map=(ctor._onMap={});
for(var attr in ctor.prototype){
if(/^on/.test(attr)){
map[attr.replace(/^on/,"").toLowerCase()]=attr;
}
}
}
return map[type.toLowerCase()];
},toString:function(){
return "[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]";
},getChildren:function(){
return this.containerNode?_e1d.findWidgets(this.containerNode):[];
},getParent:function(){
return _e1d.getEnclosingWidget(this.domNode.parentNode);
},connect:function(obj,_e42,_e43){
var _e44=_e12.connect(obj,_e42,this,_e43);
this._connects.push(_e44);
return _e44;
},disconnect:function(_e45){
var i=_e0f.indexOf(this._connects,_e45);
if(i!=-1){
_e45.remove();
this._connects.splice(i,1);
}
},subscribe:function(t,_e46){
var _e47=_e1c.subscribe(t,lang.hitch(this,_e46));
this._connects.push(_e47);
return _e47;
},unsubscribe:function(_e48){
this.disconnect(_e48);
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):_e17.isBodyLtr();
},isFocusable:function(){
return this.focus&&(_e18.get(this.domNode,"display")!="none");
},placeAt:function(_e49,_e4a){
if(_e49.declaredClass&&_e49.addChild){
_e49.addChild(this,_e4a);
}else{
_e16.place(this.domNode,_e49,_e4a);
}
return this;
},getTextDir:function(text,_e4b){
return _e4b;
},applyTextDir:function(){
},defer:function(fcn,_e4c){
var _e4d=setTimeout(lang.hitch(this,function(){
_e4d=null;
if(!this._destroyed){
lang.hitch(this,fcn)();
}
}),_e4c||0);
return {remove:function(){
if(_e4d){
clearTimeout(_e4d);
_e4d=null;
}
return null;
}};
}});
});
},"dojo/cookie":function(){
define("dojo/cookie",["./_base/kernel","./regexp"],function(dojo,_e4e){
dojo.cookie=function(name,_e4f,_e50){
var c=document.cookie,ret;
if(arguments.length==1){
var _e51=c.match(new RegExp("(?:^|; )"+_e4e.escapeString(name)+"=([^;]*)"));
ret=_e51?decodeURIComponent(_e51[1]):undefined;
}else{
_e50=_e50||{};
var exp=_e50.expires;
if(typeof exp=="number"){
var d=new Date();
d.setTime(d.getTime()+exp*24*60*60*1000);
exp=_e50.expires=d;
}
if(exp&&exp.toUTCString){
_e50.expires=exp.toUTCString();
}
_e4f=encodeURIComponent(_e4f);
var _e52=name+"="+_e4f,_e53;
for(_e53 in _e50){
_e52+="; "+_e53;
var _e54=_e50[_e53];
if(_e54!==true){
_e52+="="+_e54;
}
}
document.cookie=_e52;
}
return ret;
};
dojo.cookie.isSupported=function(){
if(!("cookieEnabled" in navigator)){
this("__djCookieTest__","CookiesAllowed");
navigator.cookieEnabled=this("__djCookieTest__")=="CookiesAllowed";
if(navigator.cookieEnabled){
this("__djCookieTest__","",{expires:-1});
}
}
return navigator.cookieEnabled;
};
return dojo.cookie;
});
},"dijit/MenuBarItem":function(){
require({cache:{"url:dijit/templates/MenuBarItem.html":"<div class=\"dijitReset dijitInline dijitMenuItem dijitMenuItemLabel\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<span data-dojo-attach-point=\"containerNode\"></span>\n</div>\n"}});
define("dijit/MenuBarItem",["dojo/_base/declare","./MenuItem","dojo/text!./templates/MenuBarItem.html"],function(_e55,_e56,_e57){
var _e58=_e55("dijit._MenuBarItemMixin",null,{templateString:_e57,_setIconClassAttr:null});
var _e59=_e55("dijit.MenuBarItem",[_e56,_e58],{});
_e59._MenuBarItemMixin=_e58;
return _e59;
});
},"dojo/uacss":function(){
define("dojo/uacss",["./dom-geometry","./_base/lang","./ready","./_base/sniff","./_base/window"],function(_e5a,lang,_e5b,has,_e5c){
var html=_e5c.doc.documentElement,ie=has("ie"),_e5d=has("opera"),maj=Math.floor,ff=has("ff"),_e5e=_e5a.boxModel.replace(/-/,""),_e5f={"dj_quirks":has("quirks"),"dj_opera":_e5d,"dj_khtml":has("khtml"),"dj_webkit":has("webkit"),"dj_safari":has("safari"),"dj_chrome":has("chrome"),"dj_gecko":has("mozilla")};
if(ie){
_e5f["dj_ie"]=true;
_e5f["dj_ie"+maj(ie)]=true;
_e5f["dj_iequirks"]=has("quirks");
}
if(ff){
_e5f["dj_ff"+maj(ff)]=true;
}
_e5f["dj_"+_e5e]=true;
var _e60="";
for(var clz in _e5f){
if(_e5f[clz]){
_e60+=clz+" ";
}
}
html.className=lang.trim(html.className+" "+_e60);
_e5b(90,function(){
if(!_e5a.isBodyLtr()){
var _e61="dj_rtl dijitRtl "+_e60.replace(/ /g,"-rtl ");
html.className=lang.trim(html.className+" "+_e61+"dj_rtl dijitRtl "+_e60.replace(/ /g,"-rtl "));
}
});
return has;
});
},"curam/util/Refresh":function(){
define("curam/util/Refresh",["curam/util/Request","curam/define","curam/util","curam/tab","curam/debug","curam/util/ContextPanel","curam/util/ui/refresh/TabRefreshController","curam/util/ResourceBundle"],function(_e62){
dojo.requireLocalization("curam.application","Debug");
var _e63=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.Refresh",{submitted:false,pageSubmitted:"",refreshConfig:[],menuBarCallback:null,navigationCallback:null,refreshedOnTabOpen:{},_controllers:{},_pageRefreshButton:undefined,setMenuBarCallbacks:function(_e64,_e65){
if(!curam.util.Refresh.menuBarCallback){
curam.util.Refresh.menuBarCallback={updateMenuItemStates:_e64,getRefreshParams:_e65};
}
},setNavigationCallbacks:function(_e66,_e67){
if(!curam.util.Refresh.navigationCallback){
curam.util.Refresh.navigationCallback={updateNavItemStates:_e66,getRefreshParams:_e67};
}
},refreshMenuAndNavigation:function(_e68,_e69,_e6a,_e6b){
curam.debug.log("curam.util.Refresh.refreshMenuAndNavigation: "+"tabWidgetId=%s, refreshMenuBar || refreshNavigation: %s || %s",_e68,_e69,_e6a);
if(_e6b&&curam.util.Refresh.refreshedOnTabOpen[_e68]){
curam.debug.log(_e63.getProperty("curam.util.Refresh.stop"));
return;
}else{
if(_e6b&&!curam.util.Refresh.refreshedOnTabOpen[_e68]){
curam.debug.log(_e63.getProperty("curam.util.Refresh.tab.open"));
curam.util.Refresh.refreshedOnTabOpen[_e68]=true;
}else{
curam.debug.log(_e63.getProperty("curam.util.Refresh.detect.refresh"));
curam.debug.log(_e63.getProperty("curam.util.Refresh.refresh"));
}
}
if(!_e69&&!_e6a){
curam.debug.log(_e63.getProperty("curam.util.Refresh.no.refresh"));
curam.util.Refresh.refreshedOnTabOpen[_e68]=false;
return;
}
var _e6c={update:function(_e6d,_e6e,_e6f){
curam.debug.log(_e63.getProperty("curam.util.Refresh.dynamic.refresh"),_e6e);
var ncb=curam.util.Refresh.navigationCallback;
curam.debug.log("refreshNavigation? ",_e6a);
if(_e6a&&_e6e.navData&&ncb){
ncb.updateNavItemStates(_e6d,_e6e);
}
var mcb=curam.util.Refresh.menuBarCallback;
curam.debug.log("refreshMenuBar? ",_e69);
if(_e69&&_e6e.menuData&&mcb){
mcb.updateMenuItemStates(_e6d,_e6e);
}
},error:function(_e70,_e71){
curam.debug.log("========= "+_e63.getProperty("curam.util.Refresh.dynamic.failure")+" ===========");
curam.debug.log(_e63.getProperty("curam.util.Refresh.dynamic.error"),_e70);
curam.debug.log(_e63.getProperty("curam.util.Refresh.dynamic.args"),_e71);
curam.debug.log("==================================================");
}};
var _e72="servlet/JSONServlet?o3c=TAB_DYNAMIC_STATE_QUERY";
var mcb=curam.util.Refresh.menuBarCallback;
if(_e69&&mcb){
var _e73=mcb.getRefreshParams(_e68);
if(_e73){
_e72+="&"+_e73;
}
}
var ncb=curam.util.Refresh.navigationCallback;
if(_e6a&&ncb){
var _e74=ncb.getRefreshParams(_e68);
if(_e74){
_e72+="&"+_e74;
}
}
curam.debug.log(_e63.getProperty("curam.util.Refresh.dynamic.refresh.req"));
_e62.post({url:_e72,handleAs:"json",preventCache:true,load:dojo.hitch(_e6c,"update",_e68),error:dojo.hitch(_e6c,"error")});
},addConfig:function(_e75){
var _e76=false;
dojo.forEach(curam.util.Refresh.refreshConfig,function(_e77){
if(_e77.tab==_e75.tab){
_e77.config=_e75.config;
_e76=true;
}
});
if(!_e76){
curam.util.Refresh.refreshConfig.push(_e75);
}
},setupRefreshController:function(_e78){
curam.debug.log("curam.util.Refresh.setupRefreshController "+_e63.getProperty("curam.util.ExpandableLists.load.for"),_e78);
var _e79=dijit.byId(_e78);
var _e7a=_e79.tabDescriptor.tabID;
var _e7b=dojo.filter(curam.util.Refresh.refreshConfig,function(item){
return item.tab==_e7a;
});
if(_e7b.length==1){
var _e7c=_e7b[0];
var ctl=new curam.util.ui.refresh.TabRefreshController(_e78,_e7c);
curam.util.Refresh._controllers[_e78]=ctl;
ctl.setRefreshHandler(curam.util.Refresh.handleRefreshEvent);
}else{
if(_e7b.length==0){
curam.debug.log(_e63.getProperty("curam.util.Refresh.no.dynamic.refresh"),_e78);
var ctl=new curam.util.ui.refresh.TabRefreshController(_e78,null);
curam.util.Refresh._controllers[_e78]=ctl;
}else{
throw "curam.util.Refresh: multiple dynamic refresh "+"configurations found for tab "+_e78;
}
}
curam.tab.executeOnTabClose(function(){
curam.util.Refresh._controllers[_e78].destroy();
curam.util.Refresh._controllers[_e78]=undefined;
},_e78);
},getController:function(_e7d){
var ctl=curam.util.Refresh._controllers[_e7d];
if(!ctl){
throw "Refresh controller for tab '"+_e7d+"' not found!";
}
return ctl;
},handleOnloadNestedInlinePage:function(_e7e,_e7f){
curam.debug.log("curam.util.Refresh.handleOnloadNestedInlinePage "+_e63.getProperty("curam.util.Refresh.iframe",[_e7e,_e7f]));
var _e80=curam.util.getTopmostWindow();
var _e81=undefined;
var _e82=curam.tab.getSelectedTab();
if(_e82){
_e81=curam.tab.getTabWidgetId(_e82);
}
if(_e81){
curam.debug.log(_e63.getProperty("curam.util.Refresh.parent"),_e81);
_e80.curam.util.Refresh.getController(_e81).pageLoaded(_e7f.pageID,curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_INLINE);
_e80.dojo.publish("/curam/main-content/page/loaded",[_e7f.pageID,_e81]);
return true;
}
return false;
},handleRefreshEvent:function(_e83){
var _e84=function(_e85){
curam.util.ContextPanel.refresh(dijit.byId(_e85));
};
var _e86=function(_e87){
curam.tab.refreshMainContentPanel(dijit.byId(_e87));
};
var _e88=function(_e89,_e8a,_e8b){
curam.util.Refresh.refreshMenuAndNavigation(_e89,_e8a,_e8b);
};
curam.util.Refresh._doRefresh(_e83,_e84,_e86,_e88);
},_doRefresh:function(_e8c,_e8d,_e8e,_e8f){
var _e90=null;
var _e91=false;
var _e92=false;
var _e93=false;
var _e94=false;
var trc=curam.util.ui.refresh.TabRefreshController.prototype;
dojo.forEach(_e8c,function(_e95){
var _e96=_e95.lastIndexOf("/");
var _e97=_e95.slice(0,_e96);
if(!_e90){
_e90=_e95.slice(_e96+1,_e95.length);
}
if(_e97==trc.EVENT_REFRESH_MENU){
_e91=true;
}
if(_e97==trc.EVENT_REFRESH_NAVIGATION){
_e92=true;
}
if(_e97==trc.EVENT_REFRESH_CONTEXT){
_e93=true;
}
if(_e97==trc.EVENT_REFRESH_MAIN){
_e94=true;
}
});
if(_e93){
_e8d(_e90);
}
if(_e94){
_e8e(_e90);
}
_e8f(_e90,_e91,_e92);
},setupRefreshButton:function(_e98){
dojo.ready(function(){
var _e99=dojo.query("."+_e98)[0];
if(!_e99){
throw "Refresh button not found: "+_e98;
}
curam.util.Refresh._pageRefreshButton=_e99;
var href=window.location.href;
if(curam.util.isActionPage(href)){
dojo.addClass(_e99,"disabled");
curam.util.Refresh._pageRefreshButton._curamDisable=true;
}else{
dojo.addClass(_e99,"enabled");
curam.util.Refresh._pageRefreshButton["_curamDisable"]=undefined;
}
curam.util.getTopmostWindow().curam.util.setupPreferencesLink(href);
});
},refreshPage:function(_e9a){
dojo.stopEvent(_e9a);
var href=window.location.href;
var _e9b=curam.util.Refresh._pageRefreshButton._curamDisable;
if(_e9b){
return;
}
curam.util.FORCE_REFRESH=true;
curam.util.redirectWindow(href,true);
}});
return curam.util.Refresh;
});
},"dijit/form/_FormWidget":function(){
define("dijit/form/_FormWidget",["dojo/_base/declare","dojo/_base/kernel","dojo/ready","../_Widget","../_CssStateMixin","../_TemplatedMixin","./_FormWidgetMixin"],function(_e9c,_e9d,_e9e,_e9f,_ea0,_ea1,_ea2){
if(!_e9d.isAsync){
_e9e(0,function(){
var _ea3=["dijit/form/_FormValueWidget"];
require(_ea3);
});
}
return _e9c("dijit.form._FormWidget",[_e9f,_ea1,_ea0,_ea2],{setDisabled:function(_ea4){
_e9d.deprecated("setDisabled("+_ea4+") is deprecated. Use set('disabled',"+_ea4+") instead.","","2.0");
this.set("disabled",_ea4);
},setValue:function(_ea5){
_e9d.deprecated("dijit.form._FormWidget:setValue("+_ea5+") is deprecated.  Use set('value',"+_ea5+") instead.","","2.0");
this.set("value",_ea5);
},getValue:function(){
_e9d.deprecated(this.declaredClass+"::getValue() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},postMixInProperties:function(){
this.nameAttrSetting=this.name?("name=\""+this.name.replace(/'/g,"&quot;")+"\""):"";
this.inherited(arguments);
},_setTypeAttr:null});
});
},"curam/contentPanel":function(){
define("curam/contentPanel",["curam/util","curam/tab","curam/define","curam/debug","curam/ui/PageRequest"],function(cu,ct){
curam.define.singleton("curam.contentPanel",{initSmartPanelExpListPageLoadListener:function(){
if(!cu.getTopmostWindow().dojo.body()._spListenerInitialized){
cu.getTopmostWindow().dojo.subscribe("expandedList.pageLoaded",curam.contentPanel.smartPanelExpListPageLoadListener);
cu.getTopmostWindow().dojo.body()._spListenerInitialized="true";
}
},smartPanelExpListPageLoadListener:function(data){
if(ct.getSmartPanelIframe()){
curam.contentPanel.checkSmartPanelLoaded(data,"ExpandedList.TabContentArea.Reloaded");
}
},publishSmartPanelExpListPageLoad:function(_ea6){
if(ct.getSmartPanelIframe()){
cu.getTopmostWindow().dojo.publish("expandedList.pageLoaded",[_ea6.contentWindow.location.href]);
}
},setupOnLoad:function(_ea7,_ea8){
curam.debug.log("curam.contenPanel: setupOnLoad: "+_ea7+" "+_ea8);
curam.contentPanel.initSmartPanelExpListPageLoadListener();
var _ea9=curam.contentPanel.iframeOnloadHandler;
cu.onLoad.addSubscriber(_ea7,_ea9);
curam.contentPanel.targetSmartPanel(_ea7,_ea8);
ct.executeOnTabClose(function(){
cu.onLoad.removeSubscriber(_ea7,_ea9);
},_ea8);
},iframeOnloadHandler:function(_eaa,_eab){
var _eac=ct.getContainerTab(dojo.query("iframe."+_eaa)[0]);
var _ead=ct.getTabWidgetId(_eac);
var _eae=dojo.byId(_eaa);
var _eaf=_eae.contentWindow.document.title;
if(_eaf==""){
var _eb0=curam.util.iframeTitleFallBack();
_eae.contentWindow.document.title=_eb0;
}
dojo.attr(_eae,"title",CONTENT_PANEL_TITLE+" - "+curam.util.iframeTitleFallBack());
dojo.attr(_eae,"data-done-loading",true);
cu.Refresh.getController(_ead).pageLoaded(_eab.pageID,cu.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN);
dojo.publish("/curam/main-content/page/loaded",[_eab.pageID,_ead]);
},spOnLoadHandler:function(_eb1,_eb2){
var _eb3=dojo.query("."+_eb1)[0];
curam.contentPanel.checkSmartPanelLoaded(_eb3.src,"TabContentArea.Reloaded");
},checkSmartPanelLoaded:function(url,_eb4){
var _eb5=ct.getSmartPanelIframe();
var _eb6=dojo.attr(_eb5,"iframeLoaded");
if(_eb6=="true"){
curam.contentPanel.smartPanelPublisher(_eb5,url,_eb4);
}else{
var _eb7=curam.tab.getContainerTab(_eb5);
var _eb8=curam.tab.getTabWidgetId(_eb7);
var _eb9=dojo.subscribe("smartPanel.loaded",function(_eba){
if(_eba!=_eb5){
return;
}
curam.contentPanel.smartPanelPublisher(_eb5,url,_eb4);
});
curam.tab.unsubscribeOnTabClose(_eb9,_eb8);
}
},smartPanelPublisher:function(_ebb,url,_ebc){
var _ebd=new curam.ui.PageRequest(url);
_ebb.contentWindow.dojo.publish("contentPane.targetSmartPanel",[{"eventType":_ebc,"pageId":_ebd.pageID,"parameters":_ebd.parameters}]);
},targetSmartPanel:function(_ebe,_ebf){
curam.debug.log("curam.contentPanel:targetSmartPanel(): "+_ebe+" "+_ebf);
var _ec0=ct.getSmartPanelIframe();
var _ec1=_ebf;
if(_ec0){
var spId=curam.util.onLoad.defaultGetIdFunction(_ec0);
var _ec2=dojo.subscribe("expandedList.toggle",function(_ec3,_ec4,_ec5){
if(_ec1===_ec5){
curam.contentPanel.checkSmartPanelLoaded(_ec4.url,_ec4.eventType);
}
});
var _ec6=curam.contentPanel.spOnLoadHandler;
cu.onLoad.addSubscriber(_ebe,_ec6);
ct.executeOnTabClose(function(){
dojo.unsubscribe(_ec2);
cu.onLoad.removeSubscriber(_ebe,_ec6);
cu.onLoad.removeSubscriber(spId,curam.smartPanel._handleSmartPanelLoad);
},_ebf);
}
}});
return curam.contentPanel;
});
},"curam/widget/Select":function(){
define("curam/widget/Select",["dojo/dom-style","dijit/popup","dojo/dom-geometry","dojo/_base/lang","dojo/dom-attr","dojo/dom-class","dijit/form/Select"],function(_ec7,_ec8,_ec9,lang,_eca,_ecb){
var _ecc=dojo.declare("curam.widget.Select",dijit.form.Select,{openDropDown:function(){
var _ecd=this.dropDown,_ece=_ecd.domNode,_ecf=this._aroundNode||this.domNode,self=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_ece.style.width){
this._explicitDDWidth=true;
}
if(_ece.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _ed0={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_ed0.width="";
}
if(!this._explicitDDHeight){
_ed0.height="";
}
_ec7.set(_ece,_ed0);
var _ed1=this.maxHeight;
if(_ed1==-1){
var _ed2=winUtils.getBox(),_ed3=_ec9.position(_ecf,false);
_ed1=Math.floor(Math.max(_ed3.y,_ed2.h-(_ed3.y+_ed3.h)));
}
_ec8.moveOffScreen(_ecd);
if(_ecd.startup&&!_ecd._started){
_ecd.startup();
}
var mb=_ec9.getMarginSize(_ece);
var _ed4=(_ed1&&mb.h>_ed1);
_ec7.set(_ece,{overflowX:"hidden",overflowY:_ed4?"auto":"hidden"});
if(_ed4){
mb.h=_ed1;
if("w" in mb){
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_ecf.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_ecf.offsetWidth);
}else{
delete mb.w;
}
}
if(lang.isFunction(_ecd.resize)){
_ecd.resize(mb);
}else{
_ec9.setMarginBox(_ece,mb);
}
}
var _ed5=_ec8.open({parent:this,popup:_ecd,around:_ecf,orient:this.dropDownPosition,onExecute:function(){
self.closeDropDown(true);
},onCancel:function(){
self.closeDropDown(true);
},onClose:function(){
_eca.set(self._popupStateNode,"popupActive",false);
_ecb.remove(self._popupStateNode,"dijitHasDropDownOpen");
self._opened=false;
}});
_eca.set(this._popupStateNode,"popupActive","true");
_ecb.add(self._popupStateNode,"dijitHasDropDownOpen");
this._opened=true;
return _ed5;
}});
return _ecc;
});
},"dijit/MenuItem":function(){
require({cache:{"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n"}});
define("dijit/MenuItem",["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/event","dojo/_base/kernel","dojo/_base/sniff","./_Widget","./_TemplatedMixin","./_Contained","./_CssStateMixin","dojo/text!./templates/MenuItem.html"],function(_ed6,dom,_ed7,_ed8,_ed9,_eda,has,_edb,_edc,_edd,_ede,_edf){
return _ed6("dijit.MenuItem",[_edb,_edc,_edd,_ede],{templateString:_edf,baseClass:"dijitMenuItem",label:"",_setLabelAttr:{node:"containerNode",type:"innerHTML"},iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},accelKey:"",disabled:false,_fillContent:function(_ee0){
if(_ee0&&!("label" in this.params)){
this.set("label",_ee0.innerHTML);
}
},buildRendering:function(){
this.inherited(arguments);
var _ee1=this.id+"_text";
_ed7.set(this.containerNode,"id",_ee1);
if(this.accelKeyNode){
_ed7.set(this.accelKeyNode,"id",this.id+"_accel");
_ee1+=" "+this.id+"_accel";
}
this.domNode.setAttribute("aria-labelledby",_ee1);
dom.setSelectable(this.domNode,false);
},_onHover:function(){
this.getParent().onItemHover(this);
},_onUnhover:function(){
this.getParent().onItemUnhover(this);
this._set("hovering",false);
},_onClick:function(evt){
this.getParent().onItemClick(this,evt);
_ed9.stop(evt);
},onClick:function(){
},focus:function(){
try{
if(has("ie")==8){
this.containerNode.focus();
}
this.focusNode.focus();
}
catch(e){
}
},_onFocus:function(){
this._setSelected(true);
this.getParent()._onItemFocus(this);
this.inherited(arguments);
},_setSelected:function(_ee2){
_ed8.toggle(this.domNode,"dijitMenuItemSelected",_ee2);
},setLabel:function(_ee3){
_eda.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_ee3);
},setDisabled:function(_ee4){
_eda.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_ee4);
},_setDisabledAttr:function(_ee5){
this.focusNode.setAttribute("aria-disabled",_ee5?"true":"false");
this._set("disabled",_ee5);
},_setAccelKeyAttr:function(_ee6){
this.accelKeyNode.style.display=_ee6?"":"none";
this.accelKeyNode.innerHTML=_ee6;
_ed7.set(this.containerNode,"colSpan",_ee6?"1":"2");
this._set("accelKey",_ee6);
}});
});
},"curam/ui/ClientDataAccessor":function(){
define("curam/ui/ClientDataAccessor",["curam/util/Request","curam/debug","curam/util/ResourceBundle"],function(_ee7){
dojo.requireLocalization("curam.application","Debug");
var _ee8=new curam.util.ResourceBundle("Debug");
return dojo.declare("curam.ui.ClientDataAccessor",null,{get:function(path,_ee9,_eea,_eeb){
var _eec="servlet/PathResolver"+"?p="+path;
if(_eea==undefined){
_eea=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_eeb==undefined){
_eeb=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
_ee7.post({url:_eec,headers:{"Content-Encoding":"UTF-8"},handleAs:"text",preventCache:true,load:_ee9,error:_eea,handle:_eeb});
},getList:function(path,_eed,_eee,_eef){
var _ef0="servlet/PathResolver"+"?r=l&p="+path;
if(_eee==undefined){
_eee=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_eef==undefined){
_eef=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
_ee7.post({url:_ef0,headers:{"Content-Encoding":"UTF-8"},handleAs:"json",preventCache:true,load:_eed,error:_eee,handle:_eef});
},getRaw:function(path,_ef1,_ef2,_ef3){
var _ef4="servlet/PathResolver"+"?r=j&p="+path;
if(_ef2==undefined){
_ef2=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_ef3==undefined){
_ef3=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
_ee7.post({url:_ef4,headers:{"Content-Encoding":"UTF-8"},handleAs:"json",preventCache:true,load:_ef1,error:_ef2,handle:_ef3});
},set:function(path,_ef5,_ef6,_ef7,_ef8){
var _ef9="servlet/PathResolver"+"?r=x&p="+path+"&v="+encodeURIComponent(_ef5);
if(_ef7==undefined||_ef7==null){
_ef7=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_ef8==undefined||_ef8==null){
_ef8=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
if(_ef6==undefined||_ef6==null){
_ef6=dojo.hitch(this,this.handleClientDataAccessorSuccess);
}
_ee7.post({url:_ef9,headers:{"Content-Encoding":"UTF-8"},handleAs:"text",preventCache:true,load:_ef6,error:_ef7,handle:_ef8});
},handleClientDataAccessorError:function(_efa,_efb){
var _efc=_ee8.getProperty("curam.ui.ClientDataAccessor.err.1")+"PathResolverServlet : ";
var _efd=_ee8.getProperty("curam.ui.ClientDataAccessor.err.2");
curam.debug.log(_efc+_efa+_efd+_efb);
},handleClientDataAccessorSuccess:function(_efe,_eff){
curam.debug.log("curam.ui.ClientDataAccessor.handleClientDataAccessorSuccess : "+_efe);
},handleClientDataAccessorCallback:function(_f00,_f01){
curam.debug.log("curam.ui.ClientDataAccessor.handleClientDataAccessorCallback :"+" "+_ee8.getProperty("curam.ui.ClientDataAccessor.callback"));
}});
});
},"curam/util/onLoad":function(){
define("curam/util/onLoad",["curam/util","curam/define","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _f02=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.onLoad",{EVENT:"/curam/frame/load",publishers:[],subscribers:[],defaultGetIdFunction:function(_f03){
var _f04=dojo.attr(_f03,"class").split(" ");
return dojo.filter(_f04,function(_f05){
return _f05.indexOf("iframe-")==0;
})[0];
},addPublisher:function(_f06){
curam.util.onLoad.publishers.push(_f06);
},addSubscriber:function(_f07,_f08,_f09){
curam.util.onLoad.subscribers.push({"getId":_f09?_f09:curam.util.onLoad.defaultGetIdFunction,"callback":_f08,"iframeId":_f07});
},removeSubscriber:function(_f0a,_f0b,_f0c){
curam.util.onLoad.subscribers=dojo.filter(curam.util.onLoad.subscribers,function(_f0d){
return !(_f0d.iframeId==_f0a&&_f0d.callback==_f0b);
});
},execute:function(){
if(window.parent==window){
curam.debug.log("curam.util.onLoad.execute(): "+_f02.getProperty("curam.util.onLoad.exit"));
return;
}
var _f0e={};
dojo.forEach(curam.util.onLoad.publishers,function(_f0f){
_f0f(_f0e);
});
curam.util.onLoad.publishers=[];
require(["dojo/io/iframe"]);
var _f10=dojo.io.iframe.create(null,null,"about:blank");
dojo.attr(_f10,"id","ie-progress-indicator-helper");
dojo.attr(_f10,"title","ie-progress-indicator-helper");
window.parent.dojo.publish(curam.util.onLoad.EVENT,[window.frameElement,_f0e]);
}});
curam.util.subscribe(curam.util.onLoad.EVENT,function(_f11,_f12){
dojo.forEach(curam.util.onLoad.subscribers,function(_f13){
var _f14=_f13.getId(_f11);
if(_f13.iframeId==_f14){
_f13.callback(_f14,_f12);
}
});
});
return curam.util.onLoad;
});
},"curam/widget/MenuItem":function(){
require({cache:{"url:curam/widget/resources/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:${onClickValue}\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n"}});
define("curam/widget/MenuItem",["dijit/MenuItem","dojo/text!curam/widget/resources/MenuItem.html"],function(_f15,_f16){
var _f17=dojo.declare("curam.widget.MenuItem",_f15,{templateString:_f16,onClickValue:"",_onClickAll:function(evt){
this.getParent().onItemClick(this,evt);
var _f18=curam.tab.getTabContainer();
var _f19=_f18.getChildren();
for(var i=0;i<_f19.length;i++){
if(_f19[i].closable){
_f18.closeChild(_f19[i]);
}
}
}});
return _f17;
});
},"dijit/DropDownMenu":function(){
require({cache:{"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n"}});
define("dijit/DropDownMenu",["dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/text!./templates/Menu.html","./_OnDijitClickMixin","./_MenuBase"],function(_f1a,_f1b,keys,_f1c,_f1d,_f1e){
return _f1a("dijit.DropDownMenu",[_f1e,_f1d],{templateString:_f1c,baseClass:"dijitMenu",postCreate:function(){
var l=this.isLeftToRight();
this._openSubMenuKey=l?keys.RIGHT_ARROW:keys.LEFT_ARROW;
this._closeSubMenuKey=l?keys.LEFT_ARROW:keys.RIGHT_ARROW;
this.connectKeyNavHandlers([keys.UP_ARROW],[keys.DOWN_ARROW]);
},_onKeyPress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
switch(evt.charOrCode){
case this._openSubMenuKey:
this._moveToPopup(evt);
_f1b.stop(evt);
break;
case this._closeSubMenuKey:
if(this.parentMenu){
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
}else{
_f1b.stop(evt);
}
break;
}
}});
});
},"curam/util/portlet/PortletAdaptor":function(){
define("curam/util/portlet/PortletAdaptor",["curam/define","curam/util"],function(){
curam.define.singleton("curam.util.portlet.PortletAdaptor",{initPortlet:function(_f1f){
curam.util.portlet.PortletAdaptor.modifyPortletLinks();
curam.util.portlet.PortletAdaptor.setTimeoutForBIRTChartPortlets(_f1f);
return "initialized";
},modifyPortletLinks:function(){
var _f20;
var _f21=dojo.query("div#podContainer a");
_f21.forEach(function(link){
dojo.attr(link,"target","_newWindow");
if(link.onclick!=null&&link.onclick.toString().indexOf("curam.util.UimDialog")!=-1){
var _f22=link.innerText||link.textContent;
if(_f22!=undefined&&_f22.length>0&&_f22.lastIndexOf("...")==-1){
var _f23=document.createElement("div");
_f23.appendChild(document.createTextNode(_f22));
link.parentNode.appendChild(_f23);
}
_f20=link.parentNode;
dojo.destroy(link);
}
if(typeof (_f20)=="undefined"){
_f20=link.parentNode;
}
});
return _f20;
},setTimeoutForBIRTChartPortlets:function(_f24){
setTimeout(function(){
curam.util.getTopmostWindow().dojo.publish("pods.fullyloaded");
},_f24);
}});
return curam.util.portlet.PortletAdaptor;
});
},"cm/_base/_dom":function(){
define("cm/_base/_dom",[],function(){
var cm=dojo.global.cm||{};
dojo.global.cm=cm;
dojo.mixin(cm,{nextSibling:function(node,_f25){
return cm._findSibling(node,_f25,true);
},prevSibling:function(node,_f26){
return cm._findSibling(node,_f26,false);
},getInput:function(name,_f27){
if(!dojo.isString(name)){
return name;
}
var _f28=dojo.query("input[name='"+name+"'],select[name='"+name+"']");
return _f27?(_f28.length>0?_f28:null):(_f28.length>0?_f28[0]:null);
},getParentByClass:function(node,_f29){
node=node.parentNode;
while(node){
if(dojo.hasClass(node,_f29)){
return node;
}
node=node.parentNode;
}
return null;
},getParentByType:function(node,type){
node=node.parentNode;
type=type.toLowerCase();
var _f2a="html";
while(node){
if(node.tagName.toLowerCase()==_f2a){
break;
}
if(node.tagName.toLowerCase()==type){
return node;
}
node=node.parentNode;
}
return null;
},replaceClass:function(node,_f2b,_f2c){
dojo.removeClass(node,_f2c);
dojo.addClass(node,_f2b);
},setClass:function(node,_f2d){
node=dojo.byId(node);
var cs=new String(_f2d);
try{
if(typeof node.className=="string"){
node.className=cs;
}else{
if(node.setAttribute){
node.setAttribute("class",_f2d);
node.className=cs;
}else{
return false;
}
}
}
catch(e){
dojo.debug("dojo.html.setClass() failed",e);
}
return true;
},_findSibling:function(node,_f2e,_f2f){
if(!node){
return null;
}
if(_f2e){
_f2e=_f2e.toLowerCase();
}
var _f30=_f2f?"nextSibling":"previousSibling";
do{
node=node[_f30];
}while(node&&node.nodeType!=1);
if(node&&_f2e&&_f2e!=node.tagName.toLowerCase()){
return cm[_f2f?"nextSibling":"prevSibling"](node,_f2e);
}
return node;
},getViewport:function(){
var d=dojo.doc,dd=d.documentElement,w=window,b=dojo.body();
if(dojo.isMozilla){
return {w:dd.clientWidth,h:w.innerHeight};
}else{
if(!dojo.isOpera&&w.innerWidth){
return {w:w.innerWidth,h:w.innerHeight};
}else{
if(!dojo.isOpera&&dd&&dd.clientWidth){
return {w:dd.clientWidth,h:dd.clientHeight};
}else{
if(b.clientWidth){
return {w:b.clientWidth,h:b.clientHeight};
}
}
}
}
return null;
},toggleDisplay:function(node){
dojo.style(node,"display",dojo.style(node,"display")=="none"?"":"none");
},endsWith:function(str,end,_f31){
if(_f31){
str=str.toLowerCase();
end=end.toLowerCase();
}
if((str.length-end.length)<0){
return false;
}
return str.lastIndexOf(end)==str.length-end.length;
},hide:function(n){
dojo.style(n,"display","none");
},show:function(n){
dojo.style(n,"display","");
}});
return cm;
});
},"dojo/store/Memory":function(){
define("dojo/store/Memory",["../_base/declare","./util/QueryResults","./util/SimpleQueryEngine"],function(_f32,_f33,_f34){
return _f32("dojo.store.Memory",null,{constructor:function(_f35){
for(var i in _f35){
this[i]=_f35[i];
}
this.setData(this.data||[]);
},data:null,idProperty:"id",index:null,queryEngine:_f34,get:function(id){
return this.data[this.index[id]];
},getIdentity:function(_f36){
return _f36[this.idProperty];
},put:function(_f37,_f38){
var data=this.data,_f39=this.index,_f3a=this.idProperty;
var id=(_f38&&"id" in _f38)?_f38.id:_f3a in _f37?_f37[_f3a]:Math.random();
if(id in _f39){
if(_f38&&_f38.overwrite===false){
throw new Error("Object already exists");
}
data[_f39[id]]=_f37;
}else{
_f39[id]=data.push(_f37)-1;
}
return id;
},add:function(_f3b,_f3c){
(_f3c=_f3c||{}).overwrite=false;
return this.put(_f3b,_f3c);
},remove:function(id){
var _f3d=this.index;
var data=this.data;
if(id in _f3d){
data.splice(_f3d[id],1);
this.setData(data);
return true;
}
},query:function(_f3e,_f3f){
return _f33(this.queryEngine(_f3e,_f3f)(this.data));
},setData:function(data){
if(data.items){
this.idProperty=data.identifier;
data=this.data=data.items;
}else{
this.data=data;
}
this.index={};
for(var i=0,l=data.length;i<l;i++){
this.index[data[i][this.idProperty]]=i;
}
}});
});
},"dijit/form/_ListBase":function(){
define("dijit/form/_ListBase",["dojo/_base/declare","dojo/window"],function(_f40,_f41){
return _f40("dijit.form._ListBase",null,{selected:null,_getTarget:function(evt){
var tgt=evt.target;
var _f42=this.containerNode;
if(tgt==_f42||tgt==this.domNode){
return null;
}
while(tgt&&tgt.parentNode!=_f42){
tgt=tgt.parentNode;
}
return tgt;
},selectFirstNode:function(){
var _f43=this.containerNode.firstChild;
while(_f43&&_f43.style.display=="none"){
_f43=_f43.nextSibling;
}
this._setSelectedAttr(_f43);
},selectLastNode:function(){
var last=this.containerNode.lastChild;
while(last&&last.style.display=="none"){
last=last.previousSibling;
}
this._setSelectedAttr(last);
},selectNextNode:function(){
var _f44=this._getSelectedAttr();
if(!_f44){
this.selectFirstNode();
}else{
var next=_f44.nextSibling;
while(next&&next.style.display=="none"){
next=next.nextSibling;
}
if(!next){
this.selectFirstNode();
}else{
this._setSelectedAttr(next);
}
}
},selectPreviousNode:function(){
var _f45=this._getSelectedAttr();
if(!_f45){
this.selectLastNode();
}else{
var prev=_f45.previousSibling;
while(prev&&prev.style.display=="none"){
prev=prev.previousSibling;
}
if(!prev){
this.selectLastNode();
}else{
this._setSelectedAttr(prev);
}
}
},_setSelectedAttr:function(node){
if(this.selected!=node){
var _f46=this._getSelectedAttr();
if(_f46){
this.onDeselect(_f46);
this.selected=null;
}
if(node&&node.parentNode==this.containerNode){
this.selected=node;
_f41.scrollIntoView(node);
this.onSelect(node);
}
}else{
if(node){
this.onSelect(node);
}
}
},_getSelectedAttr:function(){
var v=this.selected;
return (v&&v.parentNode==this.containerNode)?v:(this.selected=null);
}});
});
},"curam/util/DialogObject":function(){
define("curam/util/DialogObject",["curam/dialog","curam/util"],function(){
var _f47=dojo.declare("curam.util.DialogObject",null,{_id:null,constructor:function(_f48,id){
if(!id){
var _f49=window.top.dojo.subscribe("/curam/dialog/uim/opened/"+_f48,this,function(_f4a){
this._id=_f4a;
window.top.dojo.unsubscribe(_f49);
});
}else{
this._id=id;
}
},registerBeforeCloseHandler:function(_f4b){
var _f4c=window.top.dojo.subscribe("/curam/dialog/BeforeClose",this,function(_f4d){
if(_f4d==this._id){
_f4b();
}
window.top.dojo.unsubscribe(_f4c);
});
},registerOnDisplayHandler:function(_f4e){
if(curam.dialog._displayed==true){
_f4e(curam.dialog._size);
}else{
var ut=window.top.dojo.subscribe("/curam/dialog/displayed",this,function(_f4f,size){
if(_f4f==this._id){
_f4e(size);
}
window.top.dojo.unsubscribe(ut);
});
}
},close:function(_f50,_f51,_f52){
var win=curam.util.UimDialog._getDialogFrameWindow(this._id);
var _f53=win.curam.dialog.getParentWindow(win);
if(_f50&&!_f51){
win.curam.dialog.forceParentRefresh();
curam.dialog.doRedirect(_f53,null);
}else{
if(_f51){
var _f54=_f51;
if(_f51.indexOf("Page.do")==-1){
_f54=_f51+"Page.do"+curam.util.makeQueryString(_f52);
}
curam.dialog.doRedirect(_f53,_f54);
}
}
curam.dialog.closeModalDialog();
}});
return _f47;
});
},"curam/define":function(){
define("curam/define",[],function(){
if(typeof (dojo.global.curam)=="undefined"){
dojo.global.curam={};
}
if(typeof (dojo.global.curam.define)=="undefined"){
dojo.mixin(dojo.global.curam,{define:{}});
}
dojo.mixin(dojo.global.curam.define,{singleton:function(_f55,_f56){
var _f57=_f55.split(".");
var _f58=window;
for(var i=0;i<_f57.length;i++){
var part=_f57[i];
if(typeof _f58[part]=="undefined"){
_f58[part]={};
}
_f58=_f58[part];
}
if(_f56){
dojo.mixin(_f58,_f56);
}
}});
return dojo.global.curam.define;
});
},"curam/util/ui/ApplicationTabbedUiController":function(){
define("curam/util/ui/ApplicationTabbedUiController",["curam/debug","dojox/layout/ContentPane","curam/tab","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _f59=new curam.util.ResourceBundle("Debug");
var _f5a=dojo.declare("curam.util.ui.ApplicationTabbedUiController",null,{_tabContainer:null,constructor:function(_f5b){
this._tabContainer=_f5b;
},findOpenTab:function(_f5c){
var _f5d=_f5c.tabDescriptor;
var _f5e=curam.tab.getTabContainer(_f5d.sectionID);
var _f5f=null;
var tabs=undefined;
var _f60=undefined;
if(_f5e!=undefined){
tabs=_f5e.getChildren();
_f60=_f5e.selectedChildWidget;
}
if(_f60){
var _f61=_f60.tabDescriptor;
this._log(_f59.getProperty("curam.util.ui.ApplicationTabbedUiController.testing"));
if(_f5c.uimPageRequest.openInCurrentTab||(_f61.tabID==_f5d.tabID&&_f61.matchesPageRequest(_f5c.uimPageRequest))){
this._openInCurrentTab(_f5c.uimPageRequest);
_f5f=_f60;
}
}
if(!_f5f&&tabs){
var _f62=true;
this._log(_f59.getProperty("curam.util.ui.ApplicationTabbedUiController.searching")+" "+tabs.length+" "+_f59.getProperty("curam.util.ui.ApplicationTabbedUiController.tabs"));
for(var i=0;i<tabs.length;i++){
var _f63=tabs[i];
var _f64=_f63.tabDescriptor;
if(_f64&&_f64.tabID==_f5d.tabID){
if((_f62&&_f64.tabSignature==_f64.tabID)||_f64.matchesPageRequest(_f5c.uimPageRequest)){
_f5f=_f63;
break;
}
_f62=false;
}
}
}
this._log(_f59.getProperty("curam.util.ui.ApplicationTabbedUiController.searched")+" '"+_f5d.tabID+"'. "+_f59.getProperty("curam.util.ui.ApplicationTabbedUiController.found")+" "+(_f5f?_f59.getProperty("curam.util.ui.ApplicationTabbedUiController.a"):_f59.getProperty("curam.util.ui.ApplicationTabbedUiController.no"))+" "+_f59.getProperty("curam.util.ui.ApplicationTabbedUiController.match"));
return _f5f;
},openPageInCurrentTab:function(_f65){
var _f66=curam.tab.getSelectedTab();
var _f67=undefined;
if(_f66){
_f67=dojo.query(".nav-panel",_f66.domNode)[0];
}
if(_f67){
var _f68;
if(_f65.getURL().indexOf("?")==-1){
_f68="?";
}else{
_f68="&";
}
var loc=curam.config?curam.config.locale:jsL;
var _f69=jsBaseURL+"/"+loc+"/"+_f65.getURL()+_f68+curam.tab.getTabController().getCacheBusterParameter();
if(_f65.pageHolder){
_f65.pageHolder.location.href=_f69;
}else{
var _f6a=dojo.query(".contentPanelFrame",_f67)[0];
_f6a.src=_f69;
}
}
},_openInCurrentTab:function(_f6b){
var _f6c=curam.tab.getSelectedTab();
var _f6d=undefined;
if(_f6c){
_f6d=dojo.query(".nav-panel",_f6c.domNode)[0];
}
if(_f6d){
var _f6e=dojo.query(".contentPanelFrame",_f6d)[0];
_f6b.cdejParameters["o3ctx"]="4096";
var loc=curam.config?curam.config.locale:jsL;
var url=loc+"/"+_f6b.getURL();
if(url.indexOf("?")==-1){
url+="?";
}else{
url+="&";
}
_f6e.src=url+curam.tab.getTabController().getCacheBusterParameter();
}
},refreshExistingPageInTab:function(tab){
var _f6f=curam.tab.getContentPanelIframe(tab);
_f6f.contentWindow.location.reload(true);
},selectTab:function(tab){
this._tabContainer.selectChild(tab);
},createTab:function(_f70){
this._log("createTab(): "+_f59.getProperty("curam.util.ui.ApplicationTabbedUiController.start"));
var _f71=_f70.tabDescriptor;
var _f72="";
if(_f71.tabContent&&_f71.tabContent.tabName){
_f72=_f71.tabContent.tabName;
}
var cp=new dojox.layout.ContentPane({tabDescriptor:_f71,uimPageRequest:_f70.uimPageRequest,title:_f72,closable:!_f71.isHomePage,preventCache:true,"class":"tab-content-holder dijitContentPane dijitHidden "+"dijitTabContainerTop-child "+"dijitTabContainerTop-dijitContentPane dijitTabPane",onDownloadStart:function(){
return "&nbsp;";
}});
var _f73=[];
_f70.uimPageRequest.cdejParameters["o3ctx"]="4096";
var _f74=dojo.connect(cp,"onDownloadEnd",null,function(){
curam.util.fireTabOpenedEvent(cp.id);
});
_f73.push(_f74);
_f74=dojo.connect(cp,"destroy",null,function(){
curam.tab.doExecuteOnTabClose(cp.id);
});
_f73.push(_f74);
_f73.push(dojo.connect(cp,"destroy",function(){
dojo.forEach(_f73,dojo.disconnect);
}));
_f74=dojo.connect(cp,"set",function(name,_f75){
if(name=="title"&&arguments.length==2){
curam.debug.log(_f59.getProperty("curam.util.ui.ApplicationTabbedUiController.title"));
cp.tabDescriptor.setTabContent(_f70.uimPageRequest,_f75);
var _f76=curam.tab.getSelectedTab();
if(_f76){
var _f77=_f76.domNode.parentNode;
if(_f77){
_f77.focus();
}
}
}
});
_f73.push(_f74);
_f74=dojo.connect(cp,"onClose",function(){
new curam.tab.TabSessionManager().tabClosed(cp.tabDescriptor);
});
_f73.push(_f74);
var qs=_f70.uimPageRequest.getQueryString();
var href="TabContent.do"+"?"+curam.tab.getTabController().COMMAND_PARAM_NAME+"=PAGE&"+curam.tab.getTabController().PAGE_ID_PARAM_NAME+"="+_f70.uimPageRequest.pageID+(qs.length>0?"&"+qs:"")+"&o3tabid="+_f71.tabID+"&o3tabWidgetId="+cp.id;
this._log(_f59.getProperty("curam.util.ui.ApplicationTabbedUiController.href")+" "+href);
cp.set("href",href);
this._log(_f59.getProperty("curam.util.ui.ApplicationTabbedUiController.finished")+" ",cp.tabDescriptor);
return cp;
},insertTabIntoApp:function(_f78,_f79){
var _f7a=null;
if(_f79){
if(this._tabContainer.hasChildren()){
_f7a=this._tabContainer.selectedChildWidget;
}
this._tabContainer.addChild(_f78,0);
}else{
this._tabContainer.addChild(_f78);
}
return _f7a;
},_log:function(msg,_f7b){
if(curam.debug.enabled()){
curam.debug.log("curam.util.ui.ApplicationTabbedUiController: "+msg+(_f7b?" "+dojo.toJson(_f7b):""));
}
}});
return _f5a;
});
},"dojox/storage":function(){
define("dojox/storage",["dijit","dojo","dojox","dojo/require!dojox/storage/_common"],function(_f7c,dojo,_f7d){
dojo.provide("dojox.storage");
dojo.require("dojox.storage._common");
});
},"dojo/dnd/move":function(){
define("dojo/dnd/move",["../main","./Mover","./Moveable"],function(dojo){
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){
},within:false,constructor:function(node,_f7e){
if(!_f7e){
_f7e={};
}
this.constraints=_f7e.constraints;
this.within=_f7e.within;
},onFirstMove:function(_f7f){
var c=this.constraintBox=this.constraints.call(this,_f7f);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(this.within){
var mb=dojo._getMarginSize(_f7f.node);
c.r-=mb.w;
c.b-=mb.h;
}
},onMove:function(_f80,_f81){
var c=this.constraintBox,s=_f80.node.style;
this.onMoving(_f80,_f81);
_f81.l=_f81.l<c.l?c.l:c.r<_f81.l?c.r:_f81.l;
_f81.t=_f81.t<c.t?c.t:c.b<_f81.t?c.b:_f81.t;
s.left=_f81.l+"px";
s.top=_f81.t+"px";
this.onMoved(_f80,_f81);
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},constructor:function(node,_f82){
var box=_f82&&_f82.box;
this.constraints=function(){
return box;
};
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",constructor:function(node,_f83){
var area=_f83&&_f83.area;
this.constraints=function(){
var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(area=="margin"){
return mb;
}
var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="border"){
return mb;
}
t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="padding"){
return mb;
}
t=dojo._getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb;
};
}});
dojo.dnd.constrainedMover=dojo.dnd.move.constrainedMover;
dojo.dnd.boxConstrainedMover=dojo.dnd.move.boxConstrainedMover;
dojo.dnd.parentConstrainedMover=dojo.dnd.move.parentConstrainedMover;
return dojo.dnd.move;
});
},"curam/ui/UIController":function(){
define("curam/ui/UIController",["dojo/_base/lang","dojo/json","curam/util/Request","curam/define","curam/util/RuntimeContext","curam/tab/TabDescriptor","curam/util/ui/ApplicationTabbedUiController","curam/util/ResourceBundle"],function(lang,_f84,_f85){
dojo.requireLocalization("curam.application","Debug");
var _f86=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.ui.UIController",{TAB_TOPIC:"/app/tab",ROOT_OBJ:"curam.ui.UIController",PAGE_ASSOCIATIONS:{},RESOLVE_PAGES:{},PAGE_ID_PARAM_NAME:"o3pid",COMMAND_PARAM_NAME:"o3c",CACHE_BUSTER:0,CACHE_BUSTER_PARAM_NAME:"o3nocache",DUPLICATE_TAB_MAPPING_ERROR:"dupTabError",UNASSOCIATED_SHORTCUT_ERROR:"looseShortcutError",LOAD_MASK_TIMEOUT:15000,TABS_INFO_MODAL_TITLE_PROP_NAME:"title.info",TABS_ERROR_MODAL_TITLE_PROP_NAME:"title.error",TABS_INFO_MODAL_MSG_PROP_NAME:"message.max.tabs.info",TABS_ERROR_MODAL_MSG_PROP_NAME:"message.max.tabs.error",TABS_MSG_PLACEHOLDER_MAX_TABS:-1,MAX_NUM_TABS:-1,MAX_TABS_MODAL_SIZE:"width=470,height=80",initialize:function(_f87){
curam.ui.UIController._log("curam.ui.UIController.initialize()");
curam.ui.UIController._log("dojo.isQuirks: "+dojo.isQuirks);
window.rootObject=curam.ui.UIController.ROOT_OBJ;
curam.util.subscribe(curam.ui.UIController.TAB_TOPIC,curam.ui.UIController.tabTopicHandler);
curam.util.subscribe("tab.title.name.set",curam.ui.UIController.setTabTitleAndName);
if(_f87){
new curam.tab.TabSessionManager().init(_f87);
}else{
new curam.tab.TabSessionManager().init();
}
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.event"));
},ajaxPostFailure:function(err){
curam.ui.UIController._log("========= "+_f86.getProperty("curam.ui.UIController.test")+" JSON "+_f86.getProperty("curam.ui.UIController.servlet.failure")+" =========");
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.error")+" "+err);
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.args")+" "+ioargs);
curam.ui.UIController._log("============================================");
},instantiateTab:function(_f88,_f89,_f8a){
var _f8b=dijit.byId(_f89);
if(_f8b){
curam.util.getTopmostWindow().dojo.publish("/curam/application/tab/requested",[_f89]);
var td=_f8b.tabDescriptor;
var _f8c="'"+td.tabID+"/"+_f89+"'";
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.instantiating")+" "+_f8c+" "+_f86.getProperty("curam.ui.UIController.with.signature"));
td.setTabSignature(_f88,_f8b.uimPageRequest);
var _f8d=function(){
var _f8e=dojo.query("#"+_f89+" .tab-wrapper .tab-load-mask")[0];
if(_f8e&&dojo.style(_f8e,"display")!="none"){
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.revealing")+" "+_f8c+" "+_f86.getProperty("curam.ui.UIController.now"));
dojo.style(_f8e,"display","none");
curam.util.getTopmostWindow().dojo.publish("/curam/application/tab/revealed",[_f89]);
}
};
if(!_f8a){
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.no.details"));
_f8d();
}else{
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.has.details")+_f8c+_f86.getProperty("curam.ui.UIController.listeners"));
dojo.global.tabLoadMaskTimeout=setTimeout(_f8d,curam.ui.UIController.LOAD_MASK_TIMEOUT);
var _f8f=false;
var _f90=function(){
if(_f8f){
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.panels.loaded"));
_f8d();
clearTimeout(dojo.global.tabLoadMaskTimeout);
}else{
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.panels.not.loaded")+" "+_f8c+" "+_f86.getProperty("curam.ui.UIController.later"));
_f8f=true;
}
};
var _f91=dojo.connect(_f8b,"onDownloadEnd",function(){
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.content.pane.loaded")+" "+_f86.getProperty("curam.ui.UIController.reveal")+" "+_f8c+" "+_f86.getProperty("curam.ui.UIController.now"));
_f90();
dojo.disconnect(_f91);
});
var _f92=curam.util.getTopmostWindow().dojo.subscribe("/curam/frame/detailsPanelLoaded",function(_f93,_f94){
if(_f89==_f94){
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.details.panel.loaded")+" "+_f8c+" "+ +_f86.getProperty("curam.ui.UIController.now"));
_f90();
dojo.unsubscribe(_f92);
}
});
}
var _f95=curam.tab.getHandlerForTab(function(_f96,_f97){
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.content.pane.changed")+" "+_f8c+" "+_f86.getProperty("curam.ui.UIController.now"));
curam.ui.UIController._contentPanelUpdated(_f8b);
},_f89);
var _f98=curam.util.getTopmostWindow().dojo.subscribe("/curam/main-content/page/loaded",null,_f95);
curam.tab.unsubscribeOnTabClose(_f98,_f89);
}else{
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.tab.not.found")+" '"+_f89+"'.");
}
},_contentPanelUpdated:function(tab){
var _f99=curam.tab.getContentPanelIframe(tab);
tab.tabDescriptor.setTabContent(new curam.ui.PageRequest(_f99.src),null);
},getCacheBusterParameter:function(){
return curam.ui.UIController.CACHE_BUSTER_PARAM_NAME+"="+new Date().getTime()+"_"+curam.ui.UIController.CACHE_BUSTER++;
},_getTabbedUiApi:function(_f9a){
var _f9b=curam.ui.UIController._selectSection(_f9a);
return new curam.util.ui.ApplicationTabbedUiController(_f9b);
},_selectSection:function(_f9c){
var _f9d=_f9c?!_f9c.openInBackground:true;
var _f9e=dijit.byId(curam.tab.SECTION_TAB_CONTAINER_ID);
var _f9f=_f9c?_f9c.tabDescriptor.sectionID:curam.tab.getCurrentSectionId();
var _fa0=dijit.byId(_f9f+"-sbc");
var _fa1=curam.tab.getTabContainer(_f9f);
if(_f9d){
if(_fa0){
_f9e.selectChild(_fa0);
}else{
_f9e.selectChild(_fa1);
}
}
return _fa1;
},tabTopicHandler:function(_fa2){
var api=curam.ui.UIController._getTabbedUiApi(_fa2);
curam.ui.UIController._doHandleTabEvent(_fa2,api);
},_doHandleTabEvent:function(_fa3,_fa4){
var _fa5=_fa3.tabDescriptor;
var _fa6=_fa5.sectionID;
var _fa7=curam.tab.getTabContainer(_fa6);
var _fa8=curam.util.getTopmostWindow().dojo;
var _fa9=false;
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.fired")+" "+_fa6+" : "+_fa5.tabID+" : "+_fa3.uimPageRequest.pageID);
var tab=_fa4.findOpenTab(_fa3);
if(tab===null&&lang.exists("selectedChildWidget.tabDescriptor.isHomePage",_fa7)&&_fa7.selectedChildWidget.tabDescriptor.isHomePage===true&&_fa7.selectedChildWidget.tabDescriptor.tabID===_fa3.tabDescriptor.tabID){
tab=_fa7.selectedChildWidget;
}
if(!tab){
if(_fa7==undefined){
return false;
}
var _faa=_fa7.getChildren().length+1;
var _fab=this.MAX_NUM_TABS;
var _fac=this._checkMaxNumOpenTabsExceeded(_fab,_faa);
if(_fac){
return true;
}
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.creating"));
tab=_fa4.createTab(_fa3);
tab.connect(tab,"onLoad",function(){
var _fad=curam.tab.getContentPanelIframe(tab);
dojo.attr(_fad,"src",dojo.attr(_fad,"data-content-url"));
_fa8.publish("/curam/application/tab/ready",[tab]);
});
_fa9=true;
}
if(_fa9){
var _fae=_fa4.insertTabIntoApp(tab,_fa3.uimPageRequest.isHomePage);
if(!_fa3.openInBackground){
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.new.fore.tab"),tab.tabDescriptor);
_fa4.selectTab(tab);
if(_fae!=null){
_fa4.selectTab(_fae);
}
}else{
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.new.back.tab"),tab.tabDescriptor);
}
this._checkMaxNumOpenTabsReached(_fab,_faa);
}else{
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.show.page"),tab.tabDescriptor);
_fa4.selectTab(tab);
if(_fa3.uimPageRequest.justRefresh){
_fa4.refreshExistingPageInTab(tab);
}else{
if(_fa3.uimPageRequest.forceLoad){
_fa4.openPageInCurrentTab(_fa3.uimPageRequest);
}else{
var _faf=tab.tabDescriptor;
var _fb0=_faf.tabID==_fa3.tabDescriptor.tabID&&_faf.matchesPageRequest(_fa3.uimPageRequest);
var _fb1=_faf.tabContent.pageID==_fa3.uimPageRequest.pageID;
if(_fb0&&!_fb1){
_fa4.openPageInCurrentTab(_fa3.uimPageRequest);
}
}
}
}
return true;
},_checkMaxNumOpenTabsReached:function(_fb2,_fb3){
if(_fb3==_fb2){
this.TABS_MSG_PLACEHOLDER_MAX_TABS=_fb2;
curam.util.openGenericErrorModalDialog(this.MAX_TABS_MODAL_SIZE,this.TABS_INFO_MODAL_TITLE_PROP_NAME,this.TABS_INFO_MODAL_MSG_PROP_NAME,this.TABS_MSG_PLACEHOLDER_MAX_TABS,false);
return true;
}
},_checkMaxNumOpenTabsExceeded:function(_fb4,_fb5){
if(_fb5>_fb4){
this.TABS_MSG_PLACEHOLDER_MAX_TABS=_fb4;
curam.util.openGenericErrorModalDialog(this.MAX_TABS_MODAL_SIZE,this.TABS_ERROR_MODAL_TITLE_PROP_NAME,this.TABS_ERROR_MODAL_MSG_PROP_NAME,this.TABS_MSG_PLACEHOLDER_MAX_TABS,true);
return true;
}
},checkPage:function(_fb6,_fb7){
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.checking.page")+" '"+_fb6.pageID+"'.");
if(_fb6.pageID==""){
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.ignoring")+" "+_fb6.getURL());
return;
}
var _fb8=curam.ui.UIController._ensurePageAssociationInitialized(_fb6,function(){
if(curam.ui.UIController.isPageAssociationInitialized(_fb6.pageID,curam.ui.UIController.PAGE_ASSOCIATIONS)){
curam.ui.UIController.checkPage(_fb6,_fb7);
}else{
var msg=_f86.getProperty("curam.ui.UIController.failed");
curam.ui.UIController._log(msg);
throw new Error(msg);
}
});
if(_fb8){
try{
var _fb9=curam.ui.UIController.getTabDescriptorForPage(_fb6.pageID,curam.ui.UIController.PAGE_ASSOCIATIONS);
if(_fb9!=null){
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.page.opened")+" '"+_fb6.pageID+"'. "+_f86.getProperty("curam.ui.UIController.sec.id")+" '"+_fb9.sectionID+"'. "+_f86.getProperty("curam.ui.UIController.tab.id")+" '"+_fb9.tabID+"'.");
if(_fb6.isHomePage){
_fb9.isHomePage=true;
}
_fb9.setTabContent(_fb6);
dojo.publish(curam.ui.UIController.TAB_TOPIC,[new curam.ui.OpenTabEvent(_fb9,_fb6)]);
}else{
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.page.id")+" '"+_fb6.pageID+"'.");
if(!_fb7){
if(typeof curam.tab.getSelectedTab()=="undefined"){
throw {name:curam.ui.UIController.UNASSOCIATED_SHORTCUT_ERROR,message:"ERROR:The requested page "+_fb6.pageID+" is not associated with any tab and there is no "+"tab to open it!"};
}
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.load"));
curam.ui.UIController._getTabbedUiApi().openPageInCurrentTab(_fb6);
}else{
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.unmapped"));
_fb7(_fb6);
}
}
}
catch(e){
if(e.name==curam.ui.UIController.DUPLICATE_TAB_MAPPING_ERROR){
alert(e.message);
curam.ui.UIController._getTabbedUiApi().openPageInCurrentTab(_fb6);
return null;
}else{
if(e.name==curam.ui.UIController.UNASSOCIATED_SHORTCUT_ERROR){
alert(e.message);
console.error(e.message);
return null;
}else{
throw e;
}
}
}
}
},isPageAssociationInitialized:function(_fba,_fbb){
var _fbc=_fbb[_fba];
return !(typeof _fbc=="undefined");
},_ensurePageAssociationInitialized:function(_fbd,_fbe){
if(!curam.ui.UIController.isPageAssociationInitialized(_fbd.pageID,curam.ui.UIController.PAGE_ASSOCIATIONS)){
var path="/config/tablayout/associated["+_fbd.pageID+"]["+USER_APPLICATION_ID+"]";
new curam.ui.ClientDataAccessor().getRaw(path,function(data){
curam.ui.UIController.initializePageAssociations(_fbd,data);
_fbe();
},function(_fbf,args){
var msg=curam_ui_UIController_data_error+" "+_fbf;
curam.ui.UIController._log(msg);
if(!curam.ui.UIController._isLoginPage(args.xhr)){
alert(msg);
}
curam.util.getTopmostWindow().location.reload(true);
},null);
return false;
}
return true;
},_isLoginPage:function(_fc0){
return _fc0.responseText.indexOf("action=\"j_security_check\"")>0;
},initializePageAssociations:function(_fc1,_fc2){
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.got.assoc")+" '"+_fc1.pageID+"'.");
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.assoc"),_fc2);
if(_fc2){
if(_fc2.tabIDs&&_fc2.tabIDs.length>0){
curam.ui.UIController.PAGE_ASSOCIATIONS[_fc1.pageID]=_fc2;
}else{
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.no.mappings")+" '"+_fc1.pageID+"'.");
curam.ui.UIController.PAGE_ASSOCIATIONS[_fc1.pageID]=null;
}
}else{
throw "initializePageAssociations did not recieve a valid response.";
}
},getTabDescriptorForPage:function(_fc3,_fc4){
var _fc5=_fc4[_fc3];
if(!curam.ui.UIController.isPageAssociationInitialized(_fc3,_fc4)){
throw "Page associations have not been initialized for: "+_fc3;
}
if(_fc5!=null){
var _fc6=curam.ui.UIController.getTabFromMappings(_fc5.tabIDs,curam.tab.getSelectedTab());
return new curam.tab.TabDescriptor(_fc5.sectionID,_fc6);
}else{
return null;
}
},getTabFromMappings:function(_fc7,_fc8){
if(!_fc8){
if(_fc7.length==1){
return _fc7[0];
}else{
if(_fc7.length>1){
throw "Home page mapped to multiple tabs";
}
}
}
var _fc9=_fc8.tabDescriptor.tabID;
for(var i=0;i<_fc7.length;i++){
if(_fc9==_fc7[i]){
return _fc9;
}
}
if(_fc7.length==1){
return _fc7[0];
}else{
if(_fc7.length>1){
throw {name:curam.ui.UIController.DUPLICATE_TAB_MAPPING_ERROR,message:"ERROR: The page that you are trying to link to is associated with "+"multiple tabs: ["+_fc7.toString()+"]. Therefore the "+"tab to open cannot be determined and the page will open in the "+"current tab. Please report this error.",tabID:_fc9};
}else{
}
}
},handleUIMPageID:function(_fca,_fcb){
var _fcc=_fcb?true:false;
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.handling.uim")+" '"+_fca+"'. Page is "+(_fcc?"":"not ")+_f86.getProperty("curam.ui.UIController.default.sec"));
curam.ui.UIController.handlePageRequest(new curam.ui.PageRequest(_fca+"Page.do",_fcc));
},processURL:function(url){
var _fcd=new curam.ui.PageRequest(url);
curam.ui.UIController.handlePageRequest(_fcd);
},handlePageRequest:function(_fce){
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.handling.page")+" '"+_fce.pageID+"'. "+_f86.getProperty("curam.ui.UIController.panel.will")+(_fce.forceRefresh?"":_f86.getProperty("curam.ui.UIController.not"))+_f86.getProperty("curam.ui.UIController.reload"));
var _fcf=curam.ui.UIController.checkResolvePage(_fce,_fce.forceRefresh);
if(_fcf==true){
curam.ui.UIController.checkPage(_fce);
}
},checkResolvePage:function(_fd0,_fd1){
if(_fd1){
return true;
}
var _fd2=curam.ui.UIController.RESOLVE_PAGES[_fd0.pageID];
if(_fd2==false){
return true;
}else{
var _fd3;
if(_fd0.getURL().indexOf("?")==-1){
_fd3="?";
}else{
_fd3="&";
}
var loc=curam.config?curam.config.locale+"/":"";
_f85.post({url:loc+_fd0.getURL()+_fd3+"o3resolve=true",handleAs:"text",preventCache:true,load:dojo.hitch(curam.ui.UIController,"resolvePageCheckSuccess",_fd0),error:dojo.hitch(curam.ui.UIController,"resolvePageCheckFailure",_fd0)});
return false;
}
},resolvePageCheckSuccess:function(_fd4,_fd5,_fd6){
var _fd7=false;
var _fd8;
var _fd9;
var _fda;
if(_fd5.substring(2,0)=="{\""&&_fd5.charAt(_fd5.length-1)=="}"){
_fd7=true;
_fd5=_f84.parse(_fd5,true);
_fd8=_fd5.pageID;
_fd9=_fd5.pageURL;
}else{
_fd7=false;
}
if(_fd7&&_fd4.pageID!=_fd8){
curam.ui.UIController.RESOLVE_PAGES[_fd4.pageID]=true;
_fd9=_fd9.replace("&amp;o3resolve=true","");
_fd9=_fd9.replace("&o3resolve=true","");
_fd9=_fd9.replace("o3resolve=true","");
for(paramName in _fd4.cdejParameters){
if(paramName.length>0&&paramName.indexOf("__o3")!=-1){
if(_fd9.indexOf("?")==-1){
_fd9+="?"+paramName+"="+encodeURIComponent(_fd4.cdejParameters[paramName]);
}else{
_fd9+="&"+paramName+"="+encodeURIComponent(_fd4.cdejParameters[paramName]);
}
}
}
_fda=new curam.ui.PageRequest(_fd9);
}else{
curam.ui.UIController.RESOLVE_PAGES[_fd4.pageID]=false;
_fda=_fd4;
}
curam.ui.UIController.checkPage(_fda);
},resolvePageCheckFailure:function(_fdb,_fdc,_fdd){
curam.ui.UIController.RESOLVE_PAGES[_fdb.pageID]=false;
curam.ui.UIController.checkPage(_fdb);
},setTabTitleAndName:function(_fde,_fdf,_fe0){
var tab=curam.tab.getContainerTab(_fde);
if(tab){
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.changing.tab")+" '"+_fdf+"', '"+_fe0+"'. "+_f86.getProperty("curam.ui.UIController.descriptor.before"),tab.tabDescriptor);
dojo.query("span.detailsTitleText",tab.domNode)[0].innerHTML=_fdf;
var _fe1=dojo.query("span.detailsTitleText",tab.domNode)[0];
_fe1.setAttribute("title",_fdf);
tab.set("title",_fe0);
dojo.publish("tab.title.name.finished");
}else{
curam.ui.UIController._log(_f86.getProperty("curam.ui.UIController.cannot.change")+" '"+_fdf+"', '"+_fe0+"'. "+_f86.getProperty("curam.ui.UIController.iframe")+" '"+_fde.id+"'.");
}
},handleLinkClick:function(_fe2,_fe3){
curam.ui.UIController._doHandleLinkClick(_fe2,_fe3,curam.tab.getContentPanelIframe(),curam.ui.UIController.handlePageRequest,curam.util.openModalDialog);
},_doHandleLinkClick:function(_fe4,_fe5,_fe6,_fe7,_fe8){
var _fe9=_fe4;
if(_fe6){
var rtc=new curam.util.RuntimeContext(_fe6.contentWindow);
var _fea=null;
if(_fe5){
_fea=[{key:"o3frame",value:"modal"}];
}
_fe9=curam.util.setRpu(_fe4,rtc,_fea);
}
if(_fe5&&curam.config&&curam.config.modalsEnabled!="false"){
var _feb=_fe5.openDialogFunction||_fe8;
var _fec=_fe5.args||[{href:_fe9},_fe5.dialogOptions];
_feb.apply(this,_fec);
}else{
var _fed=new curam.ui.PageRequest(_fe9);
_fe7(_fed);
}
},handleDownLoadClickLegacy:function(_fee){
require(["dojo/io/iframe"]);
var _fef=dojo.io.iframe.create("o3lrm_frame","");
_fef.src=location.href.substring(0,location.href.lastIndexOf("/"))+decodeURIComponent(_fee.replace(/\+/g," "));
return;
},handleDownLoadClick:function(_ff0){
var _ff1=curam.tab.getContentPanelIframe();
_ff1.src=location.href.substring(0,location.href.lastIndexOf("/"))+decodeURIComponent(_ff0.replace(/\+/g," "))+"&"+jsScreenContext.toRequestString();
return;
},_log:function(msg,_ff2){
if(curam.debug.enabled()){
curam.debug.log("UI CONTROLLER: "+msg+(_ff2?" "+dojo.toJson(_ff2):""));
}
}});
return curam.ui.UIController;
});
},"curam/FastUIMController":function(){
define("curam/FastUIMController",["dojo/parser","curam/UIMController","curam/debug","curam/util/onLoad","curam/util/ResourceBundle"],function(_ff3){
dojo.requireLocalization("curam.application","Debug");
var _ff4=new curam.util.ResourceBundle("Debug");
var _ff5=dojo.declare("curam.FastUIMController",[curam.UIMController],{buildRendering:function(){
this.domNode=this.srcNodeRef;
this._attachTemplateNodes(this.domNode,function(node,prop){
return node.getAttribute(prop);
});
},postCreate:function(){
},startup:function(){
this.tabController=dijit.byId(this.tabControllerId);
dojo.attr(this.frame,"iscpiframe",this.iscpiframe);
dojo.attr(this.frame,"title",this.title);
dojo.addClass(this.frame,this.iframeClassList);
dojo.addClass(this.domNode,this.classList);
this.frameLoadEvent=this.EVENT.TOPIC_PREFIX+this.frame.id;
this.setURL(this.url);
if(this._iframeLoaded()){
curam.debug.log("curam.FastUIMController "+_ff4.getProperty("curam.FastUIMControlle.msg"));
}else{
var _ff6=dojo.hitch(this,"processFrameLoadEvent");
curam.util.onLoad.addSubscriber(this.frame.id,_ff6);
dojo.connect(this,"destroy",function(){
curam.util.onLoad.removeSubscriber(this.iframeId,_ff6);
_ff6=null;
});
}
if(this.inDialog){
dojo.style(this.frame,{width:this.width,height:this.height});
}
},_iframeLoaded:function(){
return dojo.attr(this.frame,"data-done-loading")=="true";
}});
return _ff5;
});
},"dojo/io/iframe":function(){
define("dojo/io/iframe",["../main","require"],function(dojo,_ff7){
dojo.getObject("io",true,dojo);
dojo.io.iframe={create:function(_ff8,_ff9,uri){
if(window[_ff8]){
return window[_ff8];
}
if(window.frames[_ff8]){
return window.frames[_ff8];
}
var turi=uri;
if(!turi){
if(dojo.config["useXDomain"]&&!dojo.config["dojoBlankHtmlUrl"]){
console.warn("dojo.io.iframe.create: When using cross-domain Dojo builds,"+" please save dojo/resources/blank.html to your domain and set djConfig.dojoBlankHtmlUrl"+" to the path on your domain to blank.html");
}
turi=(dojo.config["dojoBlankHtmlUrl"]||_ff7.toUrl("../resources/blank.html"));
}
var _ffa=dojo.place("<iframe id=\""+_ff8+"\" name=\""+_ff8+"\" src=\""+turi+"\" onload=\""+_ff9+"\" style=\"position: absolute; left: 1px; top: 1px; height: 1px; width: 1px; visibility: hidden\">",dojo.body());
window[_ff8]=_ffa;
return _ffa;
},setSrc:function(_ffb,src,_ffc){
try{
if(!_ffc){
if(dojo.isWebKit){
_ffb.location=src;
}else{
frames[_ffb.name].location=src;
}
}else{
var idoc;
if(dojo.isIE||dojo.isWebKit){
idoc=_ffb.contentWindow.document;
}else{
idoc=_ffb.contentWindow;
}
if(!idoc){
_ffb.location=src;
}else{
idoc.location.replace(src);
}
}
}
catch(e){
console.log("dojo.io.iframe.setSrc: ",e);
}
},doc:function(_ffd){
return _ffd.contentDocument||(((_ffd.name)&&(_ffd.document)&&(dojo.doc.getElementsByTagName("iframe")[_ffd.name].contentWindow)&&(dojo.doc.getElementsByTagName("iframe")[_ffd.name].contentWindow.document)))||((_ffd.name)&&(dojo.doc.frames[_ffd.name])&&(dojo.doc.frames[_ffd.name].document))||null;
},send:function(args){
if(!this["_frame"]){
this._frame=this.create(this._iframeName,dojo._scopeName+".io.iframe._iframeOnload();");
}
var dfd=dojo._ioSetArgs(args,function(dfd){
dfd.canceled=true;
dfd.ioArgs._callNext();
},function(dfd){
var _ffe=null;
try{
var _fff=dfd.ioArgs;
var dii=dojo.io.iframe;
var ifd=dii.doc(dii._frame);
var _1000=_fff.handleAs;
_ffe=ifd;
if(_1000!="html"){
if(_1000=="xml"){
if(dojo.isIE<9||(dojo.isIE&&dojo.isQuirks)){
dojo.query("a",dii._frame.contentWindow.document.documentElement).orphan();
var _1001=(dii._frame.contentWindow.document).documentElement.innerText;
_1001=_1001.replace(/>\s+</g,"><");
_1001=dojo.trim(_1001);
var _1002={responseText:_1001};
_ffe=dojo._contentHandlers["xml"](_1002);
}
}else{
_ffe=ifd.getElementsByTagName("textarea")[0].value;
if(_1000=="json"){
_ffe=dojo.fromJson(_ffe);
}else{
if(_1000=="javascript"){
_ffe=dojo.eval(_ffe);
}
}
}
}
}
catch(e){
_ffe=e;
}
finally{
_fff._callNext();
}
return _ffe;
},function(error,dfd){
dfd.ioArgs._hasError=true;
dfd.ioArgs._callNext();
return error;
});
dfd.ioArgs._callNext=function(){
if(!this["_calledNext"]){
this._calledNext=true;
dojo.io.iframe._currentDfd=null;
dojo.io.iframe._fireNextRequest();
}
};
this._dfdQueue.push(dfd);
this._fireNextRequest();
dojo._ioWatch(dfd,function(dfd){
return !dfd.ioArgs["_hasError"];
},function(dfd){
return (!!dfd.ioArgs["_finished"]);
},function(dfd){
if(dfd.ioArgs._finished){
dfd.callback(dfd);
}else{
dfd.errback(new Error("Invalid dojo.io.iframe request state"));
}
});
return dfd;
},_currentDfd:null,_dfdQueue:[],_iframeName:dojo._scopeName+"IoIframe",_fireNextRequest:function(){
try{
if((this._currentDfd)||(this._dfdQueue.length==0)){
return;
}
do{
var dfd=this._currentDfd=this._dfdQueue.shift();
}while(dfd&&dfd.canceled&&this._dfdQueue.length);
if(!dfd||dfd.canceled){
this._currentDfd=null;
return;
}
var _1003=dfd.ioArgs;
var args=_1003.args;
_1003._contentToClean=[];
var fn=dojo.byId(args["form"]);
var _1004=args["content"]||{};
if(fn){
if(_1004){
var _1005=function(name,value){
dojo.create("input",{type:"hidden",name:name,value:value},fn);
_1003._contentToClean.push(name);
};
for(var x in _1004){
var val=_1004[x];
if(dojo.isArray(val)&&val.length>1){
var i;
for(i=0;i<val.length;i++){
_1005(x,val[i]);
}
}else{
if(!fn[x]){
_1005(x,val);
}else{
fn[x].value=val;
}
}
}
}
var _1006=fn.getAttributeNode("action");
var _1007=fn.getAttributeNode("method");
var _1008=fn.getAttributeNode("target");
if(args["url"]){
_1003._originalAction=_1006?_1006.value:null;
if(_1006){
_1006.value=args.url;
}else{
fn.setAttribute("action",args.url);
}
}
if(!_1007||!_1007.value){
if(_1007){
_1007.value=(args["method"])?args["method"]:"post";
}else{
fn.setAttribute("method",(args["method"])?args["method"]:"post");
}
}
_1003._originalTarget=_1008?_1008.value:null;
if(_1008){
_1008.value=this._iframeName;
}else{
fn.setAttribute("target",this._iframeName);
}
fn.target=this._iframeName;
dojo._ioNotifyStart(dfd);
fn.submit();
}else{
var _1009=args.url+(args.url.indexOf("?")>-1?"&":"?")+_1003.query;
dojo._ioNotifyStart(dfd);
this.setSrc(this._frame,_1009,true);
}
}
catch(e){
dfd.errback(e);
}
},_iframeOnload:function(){
var dfd=this._currentDfd;
if(!dfd){
this._fireNextRequest();
return;
}
var _100a=dfd.ioArgs;
var args=_100a.args;
var fNode=dojo.byId(args.form);
if(fNode){
var _100b=_100a._contentToClean;
for(var i=0;i<_100b.length;i++){
var key=_100b[i];
for(var j=0;j<fNode.childNodes.length;j++){
var _100c=fNode.childNodes[j];
if(_100c.name==key){
dojo.destroy(_100c);
break;
}
}
}
if(_100a["_originalAction"]){
fNode.setAttribute("action",_100a._originalAction);
}
if(_100a["_originalTarget"]){
fNode.setAttribute("target",_100a._originalTarget);
fNode.target=_100a._originalTarget;
}
}
_100a._finished=true;
}};
return dojo.io.iframe;
});
},"curam/layout/CuramTabContainer":function(){
define("curam/layout/CuramTabContainer",["dijit/layout/TabContainer","curam/layout/ScrollingTabController"],function(_100d){
var _100e=dojo.declare("curam.layout.CuramTabContainer",_100d,{postMixInProperties:function(){
if(!this.controllerWidget){
this.controllerWidget=(this.tabPosition=="top"||this.tabPosition=="bottom")&&!this.nested?"curam.layout.ScrollingTabController":"dijit.layout.TabController";
}
this.inherited(arguments);
}});
return _100e;
});
},"curam/layout/AccordionContainer":function(){
define("curam/layout/AccordionContainer",["dijit/layout/AccordionContainer","dojo/dom-geometry","dojo/_base/array","dojo/_base/sniff","dojo/_base/fx"],function(ac,_100f,array,has,fx){
var _1010=dojo.declare("curam.layout.AccordionContainer",dijit.layout.AccordionContainer,{layout:function(){
var _1011=this.selectedChildWidget;
if(!_1011){
return;
}
var _1012=_1011._wrapperWidget.domNode,_1013=_100f.getMarginExtents(_1012),_1014=_100f.getPadBorderExtents(_1012),_1015=_1011._wrapperWidget.containerNode,_1016=_100f.getMarginExtents(_1015),_1017=_100f.getPadBorderExtents(_1015),_1018=this._contentBox;
var _1019=0;
array.forEach(this.getChildren(),function(child){
_1019+=child._buttonWidget.getTitleHeight();
});
var _101a=_1011.containerNode.childNodes[0].offsetHeight+20;
if(_1019+_101a<this._contentBox.h){
_101a=this._contentBox.h-_1019;
}
this._containerContentBox={h:_101a,w:this._contentBox.w-_1013.w-_1014.w-_1016.w-_1017.w};
if(_1011){
_1011.resize(this._containerContentBox);
}
},_transition:function(_101b,_101c,_101d){
if(has("ie")<8){
_101d=false;
}
if(this._animation){
this._animation.stop(true);
delete this._animation;
}
var self=this;
if(_101b){
_101b._wrapperWidget.set("selected",true);
_101b.resize({h:0,w:this._containerContentBox.w});
var d=this._showChild(_101b);
if(this.doLayout&&_101b.resize){
var _101e=_101b.containerNode.childNodes[0].offsetHeight+20;
var _101f=0;
dojo.forEach(this.getChildren(),function(child){
_101f+=child._buttonWidget.getTitleHeight();
});
this._containerContentBox.h=this._contentBox.h-_101f;
if(this._containerContentBox.h<_101e){
this._containerContentBox.h=_101e;
}
this._verticalSpace=this._containerContentBox.h;
_101b.resize(this._containerContentBox);
}
}
if(_101c){
_101c._wrapperWidget.set("selected",false);
if(!_101d){
this._hideChild(_101c);
}
}
if(_101d){
var _1020=_101b._wrapperWidget.containerNode,_1021=_101c._wrapperWidget.containerNode;
var _1022=_101b._wrapperWidget.containerNode,_1023=_100f.getMarginExtents(_1022),_1024=_100f.getPadBorderExtents(_1022),_1025=_1023.h+_1024.h;
_1021.style.height=(self._verticalSpace-_1025)+"px";
this._animation=new fx.Animation({node:_1020,duration:this.duration,curve:[1,this._verticalSpace-_1025-1],onAnimate:function(value){
value=Math.floor(value);
_1020.style.height=value+"px";
_1021.style.height=(self._verticalSpace-_1025-value-1)+"px";
},onEnd:function(){
delete self._animation;
_1020.style.height="auto";
_1021.style.height="0px";
}});
this._animation.onStop=this._animation.onEnd;
this._animation.play();
}
return d;
}});
return _1010;
});
},"url:curam/widget/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n","dijit/form/_FormSelectWidget":function(){
define("dijit/form/_FormSelectWidget",["dojo/_base/array","dojo/aspect","dojo/data/util/sorter","dojo/_base/declare","dojo/dom","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/query","./_FormValueWidget"],function(array,_1026,_1027,_1028,dom,_1029,_102a,lang,query,_102b){
return _1028("dijit.form._FormSelectWidget",_102b,{multiple:false,options:null,store:null,query:null,queryOptions:null,onFetch:null,sortByLabel:true,loadChildrenOnOpen:false,getOptions:function(_102c){
var _102d=_102c,opts=this.options||[],l=opts.length;
if(_102d===undefined){
return opts;
}
if(lang.isArray(_102d)){
return array.map(_102d,"return this.getOptions(item);",this);
}
if(lang.isObject(_102c)){
if(!array.some(this.options,function(o,idx){
if(o===_102d||(o.value&&o.value===_102d.value)){
_102d=idx;
return true;
}
return false;
})){
_102d=-1;
}
}
if(typeof _102d=="string"){
for(var i=0;i<l;i++){
if(opts[i].value===_102d){
_102d=i;
break;
}
}
}
if(typeof _102d=="number"&&_102d>=0&&_102d<l){
return this.options[_102d];
}
return null;
},addOption:function(_102e){
if(!lang.isArray(_102e)){
_102e=[_102e];
}
array.forEach(_102e,function(i){
if(i&&lang.isObject(i)){
this.options.push(i);
}
},this);
this._loadChildren();
},removeOption:function(_102f){
if(!lang.isArray(_102f)){
_102f=[_102f];
}
var _1030=this.getOptions(_102f);
array.forEach(_1030,function(i){
if(i){
this.options=array.filter(this.options,function(node){
return (node.value!==i.value||node.label!==i.label);
});
this._removeOptionItem(i);
}
},this);
this._loadChildren();
},updateOption:function(_1031){
if(!lang.isArray(_1031)){
_1031=[_1031];
}
array.forEach(_1031,function(i){
var _1032=this.getOptions(i),k;
if(_1032){
for(k in i){
_1032[k]=i[k];
}
}
},this);
this._loadChildren();
},setStore:function(store,_1033,_1034){
var _1035=this.store;
_1034=_1034||{};
if(_1035!==store){
var h;
while(h=this._notifyConnections.pop()){
h.remove();
}
if(store&&store.getFeatures()["dojo.data.api.Notification"]){
this._notifyConnections=[_1026.after(store,"onNew",lang.hitch(this,"_onNewItem"),true),_1026.after(store,"onDelete",lang.hitch(this,"_onDeleteItem"),true),_1026.after(store,"onSet",lang.hitch(this,"_onSetItem"),true)];
}
this._set("store",store);
}
this._onChangeActive=false;
if(this.options&&this.options.length){
this.removeOption(this.options);
}
if(store){
this._loadingStore=true;
store.fetch(lang.delegate(_1034,{onComplete:function(items,opts){
if(this.sortByLabel&&!_1034.sort&&items.length){
items.sort(_1027.createSortFunction([{attribute:store.getLabelAttributes(items[0])[0]}],store));
}
if(_1034.onFetch){
items=_1034.onFetch.call(this,items,opts);
}
array.forEach(items,function(i){
this._addOptionForItem(i);
},this);
this._loadingStore=false;
this.set("value","_pendingValue" in this?this._pendingValue:_1033);
delete this._pendingValue;
if(!this.loadChildrenOnOpen){
this._loadChildren();
}else{
this._pseudoLoadChildren(items);
}
this._fetchedWith=opts;
this._lastValueReported=this.multiple?[]:null;
this._onChangeActive=true;
this.onSetStore();
this._handleOnChange(this.value);
},scope:this}));
}else{
delete this._fetchedWith;
}
return _1035;
},_setValueAttr:function(_1036,_1037){
if(this._loadingStore){
this._pendingValue=_1036;
return;
}
var opts=this.getOptions()||[];
if(!lang.isArray(_1036)){
_1036=[_1036];
}
array.forEach(_1036,function(i,idx){
if(!lang.isObject(i)){
i=i+"";
}
if(typeof i==="string"){
_1036[idx]=array.filter(opts,function(node){
return node.value===i;
})[0]||{value:"",label:""};
}
},this);
_1036=array.filter(_1036,function(i){
return i&&i.value;
});
if(!this.multiple&&(!_1036[0]||!_1036[0].value)&&opts.length){
_1036[0]=opts[0];
}
array.forEach(opts,function(i){
i.selected=array.some(_1036,function(v){
return v.value===i.value;
});
});
var val=array.map(_1036,function(i){
return i.value;
}),disp=array.map(_1036,function(i){
return i.label;
});
this._set("value",this.multiple?val:val[0]);
this._setDisplay(this.multiple?disp:disp[0]);
this._updateSelection();
this._handleOnChange(this.value,_1037);
},_getDisplayedValueAttr:function(){
var val=this.get("value");
if(!lang.isArray(val)){
val=[val];
}
var ret=array.map(this.getOptions(val),function(v){
if(v&&"label" in v){
return v.label;
}else{
if(v){
return v.value;
}
}
return null;
},this);
return this.multiple?ret:ret[0];
},_loadChildren:function(){
if(this._loadingStore){
return;
}
array.forEach(this._getChildren(),function(child){
child.destroyRecursive();
});
array.forEach(this.options,this._addOptionItem,this);
this._updateSelection();
},_updateSelection:function(){
this._set("value",this._getValueFromOpts());
var val=this.value;
if(!lang.isArray(val)){
val=[val];
}
if(val&&val[0]){
array.forEach(this._getChildren(),function(child){
var _1038=array.some(val,function(v){
return child.option&&(v===child.option.value);
});
_1029.toggle(child.domNode,this.baseClass+"SelectedOption",_1038);
child.domNode.setAttribute("aria-selected",_1038);
},this);
}
},_getValueFromOpts:function(){
var opts=this.getOptions()||[];
if(!this.multiple&&opts.length){
var opt=array.filter(opts,function(i){
return i.selected;
})[0];
if(opt&&opt.value){
return opt.value;
}else{
opts[0].selected=true;
return opts[0].value;
}
}else{
if(this.multiple){
return array.map(array.filter(opts,function(i){
return i.selected;
}),function(i){
return i.value;
})||[];
}
}
return "";
},_onNewItem:function(item,_1039){
if(!_1039||!_1039.parent){
this._addOptionForItem(item);
}
},_onDeleteItem:function(item){
var store=this.store;
this.removeOption(store.getIdentity(item));
},_onSetItem:function(item){
this.updateOption(this._getOptionObjForItem(item));
},_getOptionObjForItem:function(item){
var store=this.store,label=store.getLabel(item),value=(label?store.getIdentity(item):null);
return {value:value,label:label,item:item};
},_addOptionForItem:function(item){
var store=this.store;
if(!store.isItemLoaded(item)){
store.loadItem({item:item,onItem:function(i){
this._addOptionForItem(i);
},scope:this});
return;
}
var _103a=this._getOptionObjForItem(item);
this.addOption(_103a);
},constructor:function(_103b){
this._oValue=(_103b||{}).value||null;
this._notifyConnections=[];
},buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},_fillContent:function(){
var opts=this.options;
if(!opts){
opts=this.options=this.srcNodeRef?query("> *",this.srcNodeRef).map(function(node){
if(node.getAttribute("type")==="separator"){
return {value:"",label:"",selected:false,disabled:false};
}
return {value:(node.getAttribute("data-"+_102a._scopeName+"-value")||node.getAttribute("value")),label:String(node.innerHTML),selected:node.getAttribute("selected")||false,disabled:node.getAttribute("disabled")||false};
},this):[];
}
if(!this.value){
this._set("value",this._getValueFromOpts());
}else{
if(this.multiple&&typeof this.value=="string"){
this._set("value",this.value.split(","));
}
}
},postCreate:function(){
this.inherited(arguments);
this.connect(this,"onChange","_updateSelection");
this.connect(this,"startup","_loadChildren");
this._setValueAttr(this.value,null);
},startup:function(){
this.inherited(arguments);
var store=this.store,_103c={};
array.forEach(["query","queryOptions","onFetch"],function(i){
if(this[i]){
_103c[i]=this[i];
}
delete this[i];
},this);
if(store&&store.getFeatures()["dojo.data.api.Identity"]){
this.store=null;
this.setStore(store,this._oValue,_103c);
}
},destroy:function(){
var h;
while(h=this._notifyConnections.pop()){
h.remove();
}
this.inherited(arguments);
},_addOptionItem:function(){
},_removeOptionItem:function(){
},_setDisplay:function(){
},_getChildren:function(){
return [];
},_getSelectedOptionsAttr:function(){
return this.getOptions(this.get("value"));
},_pseudoLoadChildren:function(){
},onSetStore:function(){
}});
});
},"dijit/form/_ComboBoxMenu":function(){
define("dijit/form/_ComboBoxMenu",["dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/keys","../_WidgetBase","../_TemplatedMixin","./_ComboBoxMenuMixin","./_ListMouseMixin"],function(_103d,_103e,_103f,_1040,keys,_1041,_1042,_1043,_1044){
return _103d("dijit.form._ComboBoxMenu",[_1041,_1042,_1044,_1043],{templateString:"<div class='dijitReset dijitMenu' data-dojo-attach-point='containerNode' style='overflow: auto; overflow-x: hidden;'>"+"<div class='dijitMenuItem dijitMenuPreviousButton' data-dojo-attach-point='previousButton' role='option'></div>"+"<div class='dijitMenuItem dijitMenuNextButton' data-dojo-attach-point='nextButton' role='option'></div>"+"</div>",baseClass:"dijitComboBoxMenu",postCreate:function(){
this.inherited(arguments);
if(!this.isLeftToRight()){
_103e.add(this.previousButton,"dijitMenuItemRtl");
_103e.add(this.nextButton,"dijitMenuItemRtl");
}
},_createMenuItem:function(){
return _103f.create("div",{"class":"dijitReset dijitMenuItem"+(this.isLeftToRight()?"":" dijitMenuItemRtl"),role:"option"});
},onHover:function(node){
_103e.add(node,"dijitMenuItemHover");
},onUnhover:function(node){
_103e.remove(node,"dijitMenuItemHover");
},onSelect:function(node){
_103e.add(node,"dijitMenuItemSelected");
},onDeselect:function(node){
_103e.remove(node,"dijitMenuItemSelected");
},_page:function(up){
var _1045=0;
var _1046=this.domNode.scrollTop;
var _1047=_1040.get(this.domNode,"height");
if(!this.getHighlightedOption()){
this.selectNextNode();
}
while(_1045<_1047){
var _1048=this.getHighlightedOption();
if(up){
if(!_1048.previousSibling||_1048.previousSibling.style.display=="none"){
break;
}
this.selectPreviousNode();
}else{
if(!_1048.nextSibling||_1048.nextSibling.style.display=="none"){
break;
}
this.selectNextNode();
}
var _1049=this.domNode.scrollTop;
_1045+=(_1049-_1046)*(up?-1:1);
_1046=_1049;
}
},handleKey:function(evt){
switch(evt.charOrCode){
case keys.DOWN_ARROW:
this.selectNextNode();
return false;
case keys.PAGE_DOWN:
this._page(false);
return false;
case keys.UP_ARROW:
this.selectPreviousNode();
return false;
case keys.PAGE_UP:
this._page(true);
return false;
default:
return true;
}
}});
});
},"dijit/layout/_TabContainerBase":function(){
require({cache:{"url:dijit/layout/templates/TabContainer.html":"<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" data-dojo-attach-point=\"containerNode\"></div>\n</div>\n"}});
define("dijit/layout/_TabContainerBase",["dojo/text!./templates/TabContainer.html","./StackContainer","./utils","../_TemplatedMixin","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style"],function(_104a,_104b,_104c,_104d,_104e,_104f,_1050,_1051){
return _104e("dijit.layout._TabContainerBase",[_104b,_104d],{tabPosition:"top",baseClass:"dijitTabContainer",tabStrip:false,nested:false,templateString:_104a,postMixInProperties:function(){
this.baseClass+=this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"");
this.srcNodeRef&&_1051.set(this.srcNodeRef,"visibility","hidden");
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.tablist=this._makeController(this.tablistNode);
if(!this.doLayout){
_104f.add(this.domNode,"dijitTabContainerNoLayout");
}
if(this.nested){
_104f.add(this.domNode,"dijitTabContainerNested");
_104f.add(this.tablist.containerNode,"dijitTabContainerTabListNested");
_104f.add(this.tablistSpacer,"dijitTabContainerSpacerNested");
_104f.add(this.containerNode,"dijitTabPaneWrapperNested");
}else{
_104f.add(this.domNode,"tabStrip-"+(this.tabStrip?"enabled":"disabled"));
}
},_setupChild:function(tab){
_104f.add(tab.domNode,"dijitTabPane");
this.inherited(arguments);
},startup:function(){
if(this._started){
return;
}
this.tablist.startup();
this.inherited(arguments);
},layout:function(){
if(!this._contentBox||typeof (this._contentBox.l)=="undefined"){
return;
}
var sc=this.selectedChildWidget;
if(this.doLayout){
var _1052=this.tabPosition.replace(/-h/,"");
this.tablist.layoutAlign=_1052;
var _1053=[this.tablist,{domNode:this.tablistSpacer,layoutAlign:_1052},{domNode:this.containerNode,layoutAlign:"client"}];
_104c.layoutChildren(this.domNode,this._contentBox,_1053);
this._containerContentBox=_104c.marginBox2contentBox(this.containerNode,_1053[2]);
if(sc&&sc.resize){
sc.resize(this._containerContentBox);
}
}else{
if(this.tablist.resize){
var s=this.tablist.domNode.style;
s.width="0";
var width=_1050.getContentBox(this.domNode).w;
s.width="";
this.tablist.resize({w:width});
}
if(sc&&sc.resize){
sc.resize();
}
}
},destroy:function(){
if(this.tablist){
this.tablist.destroy();
}
this.inherited(arguments);
}});
});
},"dijit/_KeyNavContainer":function(){
define("dijit/_KeyNavContainer",["dojo/_base/kernel","./_Container","./_FocusMixin","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/event","dojo/dom-attr","dojo/_base/lang"],function(_1054,_1055,_1056,array,keys,_1057,event,_1058,lang){
return _1057("dijit._KeyNavContainer",[_1056,_1055],{tabIndex:"0",connectKeyNavHandlers:function(_1059,_105a){
var _105b=(this._keyNavCodes={});
var prev=lang.hitch(this,"focusPrev");
var next=lang.hitch(this,"focusNext");
array.forEach(_1059,function(code){
_105b[code]=prev;
});
array.forEach(_105a,function(code){
_105b[code]=next;
});
_105b[keys.HOME]=lang.hitch(this,"focusFirstChild");
_105b[keys.END]=lang.hitch(this,"focusLastChild");
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
this.connect(this.domNode,"onfocus","_onContainerFocus");
},startupKeyNavChildren:function(){
_1054.deprecated("startupKeyNavChildren() call no longer needed","","2.0");
},startup:function(){
this.inherited(arguments);
array.forEach(this.getChildren(),lang.hitch(this,"_startupChild"));
},addChild:function(_105c,_105d){
this.inherited(arguments);
this._startupChild(_105c);
},focus:function(){
this.focusFirstChild();
},focusFirstChild:function(){
this.focusChild(this._getFirstFocusableChild());
},focusLastChild:function(){
this.focusChild(this._getLastFocusableChild());
},focusNext:function(){
this.focusChild(this._getNextFocusableChild(this.focusedChild,1));
},focusPrev:function(){
this.focusChild(this._getNextFocusableChild(this.focusedChild,-1),true);
},focusChild:function(_105e,last){
if(!_105e){
return;
}
if(this.focusedChild&&_105e!==this.focusedChild){
this._onChildBlur(this.focusedChild);
}
_105e.set("tabIndex",this.tabIndex);
_105e.focus(last?"end":"start");
this._set("focusedChild",_105e);
},_startupChild:function(_105f){
_105f.set("tabIndex","-1");
this.connect(_105f,"_onFocus",function(){
_105f.set("tabIndex",this.tabIndex);
});
this.connect(_105f,"_onBlur",function(){
_105f.set("tabIndex","-1");
});
},_onContainerFocus:function(evt){
if(evt.target!==this.domNode||this.focusedChild){
return;
}
this.focusFirstChild();
_1058.set(this.domNode,"tabIndex","-1");
},_onBlur:function(evt){
if(this.tabIndex){
_1058.set(this.domNode,"tabIndex",this.tabIndex);
}
this.focusedChild=null;
this.inherited(arguments);
},_onContainerKeypress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
var func=this._keyNavCodes[evt.charOrCode];
if(func){
func();
event.stop(evt);
}
},_onChildBlur:function(){
},_getFirstFocusableChild:function(){
return this._getNextFocusableChild(null,1);
},_getLastFocusableChild:function(){
return this._getNextFocusableChild(null,-1);
},_getNextFocusableChild:function(child,dir){
if(child){
child=this._getSiblingOfChild(child,dir);
}
var _1060=this.getChildren();
for(var i=0;i<_1060.length;i++){
if(!child){
child=_1060[(dir>0)?0:(_1060.length-1)];
}
if(child.isFocusable()){
return child;
}
child=this._getSiblingOfChild(child,dir);
}
return null;
}});
});
},"dijit/form/DataList":function(){
define("dijit/form/DataList",["dojo/_base/declare","dojo/dom","dojo/_base/lang","dojo/query","dojo/store/Memory","../registry"],function(_1061,dom,lang,query,_1062,_1063){
function _1064(_1065){
return {id:_1065.value,value:_1065.value,name:lang.trim(_1065.innerText||_1065.textContent||"")};
};
return _1061("dijit.form.DataList",_1062,{constructor:function(_1066,_1067){
this.domNode=dom.byId(_1067);
lang.mixin(this,_1066);
if(this.id){
_1063.add(this);
}
this.domNode.style.display="none";
this.inherited(arguments,[{data:query("option",this.domNode).map(_1064)}]);
},destroy:function(){
_1063.remove(this.id);
},fetchSelectedItem:function(){
var _1068=query("> option[selected]",this.domNode)[0]||query("> option",this.domNode)[0];
return _1068&&_1064(_1068);
}});
});
},"dijit/Tooltip":function(){
require({cache:{"url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n"}});
define("dijit/Tooltip",["dojo/_base/array","dojo/_base/declare","dojo/_base/fx","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/_base/sniff","dojo/_base/window","./_base/manager","./place","./_Widget","./_TemplatedMixin","./BackgroundIframe","dojo/text!./templates/Tooltip.html","."],function(array,_1069,fx,dom,_106a,_106b,_106c,lang,has,win,_106d,place,_106e,_106f,_1070,_1071,dijit){
var _1072=_1069("dijit._MasterTooltip",[_106e,_106f],{duration:_106d.defaultDuration,templateString:_1071,postCreate:function(){
win.body().appendChild(this.domNode);
this.bgIframe=new _1070(this.domNode);
this.fadeIn=fx.fadeIn({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onShow")});
this.fadeOut=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHide")});
},show:function(_1073,_1074,_1075,rtl,_1076){
if(this.aroundNode&&this.aroundNode===_1074&&this.containerNode.innerHTML==_1073){
return;
}
this.domNode.width="auto";
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_1073;
if(_1076){
this.set("textDir",_1076);
}
this.containerNode.align=rtl?"right":"left";
var pos=place.around(this.domNode,_1074,_1075&&_1075.length?_1075:_1077.defaultPosition,!rtl,lang.hitch(this,"orient"));
var _1078=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_1078.y+((_1078.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_1078.x+((_1078.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}
}
_106c.set(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_1074;
},orient:function(node,_1079,_107a,_107b,_107c){
this.connectorNode.style.top="";
var _107d=_107b.w-this.connectorNode.offsetWidth;
node.className="dijitTooltip "+{"MR-ML":"dijitTooltipRight","ML-MR":"dijitTooltipLeft","TM-BM":"dijitTooltipAbove","BM-TM":"dijitTooltipBelow","BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_1079+"-"+_107a];
this.domNode.style.width="auto";
var size=_106b.getContentBox(this.domNode);
var width=Math.min((Math.max(_107d,1)),size.w);
var _107e=width<size.w;
this.domNode.style.width=width+"px";
if(_107e){
this.containerNode.style.overflow="auto";
var _107f=this.containerNode.scrollWidth;
this.containerNode.style.overflow="visible";
if(_107f>width){
_107f=_107f+_106c.get(this.domNode,"paddingLeft")+_106c.get(this.domNode,"paddingRight");
this.domNode.style.width=_107f+"px";
}
}
if(_107a.charAt(0)=="B"&&_1079.charAt(0)=="B"){
var mb=_106b.getMarginBox(node);
var _1080=this.connectorNode.offsetHeight;
if(mb.h>_107b.h){
var _1081=_107b.h-((_107c.h+_1080)>>1);
this.connectorNode.style.top=_1081+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_107c.h/2-_1080/2,0),mb.h-_1080)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_107d);
},_onShow:function(){
if(has("ie")){
this.domNode.style.filter="";
}
},hide:function(_1082){
if(this._onDeck&&this._onDeck[1]==_1082){
this._onDeck=null;
}else{
if(this.aroundNode===_1082){
this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play();
}else{
}
}
},_onHide:function(){
this.domNode.style.cssText="";
this.containerNode.innerHTML="";
if(this._onDeck){
this.show.apply(this,this._onDeck);
this._onDeck=null;
}
},_setAutoTextDir:function(node){
this.applyTextDir(node,has("ie")?node.outerText:node.textContent);
array.forEach(node.children,function(child){
this._setAutoTextDir(child);
},this);
},_setTextDirAttr:function(_1083){
this._set("textDir",_1083);
if(_1083=="auto"){
this._setAutoTextDir(this.containerNode);
}else{
this.containerNode.dir=this.textDir;
}
}});
dijit.showTooltip=function(_1084,_1085,_1086,rtl,_1087){
if(_1086){
_1086=array.map(_1086,function(val){
return {after:"after-centered",before:"before-centered"}[val]||val;
});
}
if(!_1077._masterTT){
dijit._masterTT=_1077._masterTT=new _1072();
}
return _1077._masterTT.show(_1084,_1085,_1086,rtl,_1087);
};
dijit.hideTooltip=function(_1088){
return _1077._masterTT&&_1077._masterTT.hide(_1088);
};
var _1077=_1069("dijit.Tooltip",_106e,{label:"",showDelay:400,connectId:[],position:[],_setConnectIdAttr:function(newId){
array.forEach(this._connections||[],function(_1089){
array.forEach(_1089,lang.hitch(this,"disconnect"));
},this);
this._connectIds=array.filter(lang.isArrayLike(newId)?newId:(newId?[newId]:[]),function(id){
return dom.byId(id);
});
this._connections=array.map(this._connectIds,function(id){
var node=dom.byId(id);
return [this.connect(node,"onmouseenter","_onHover"),this.connect(node,"onmouseleave","_onUnHover"),this.connect(node,"onfocus","_onHover"),this.connect(node,"onblur","_onUnHover")];
},this);
this._set("connectId",newId);
},addTarget:function(node){
var id=node.id||node;
if(array.indexOf(this._connectIds,id)==-1){
this.set("connectId",this._connectIds.concat(id));
}
},removeTarget:function(node){
var id=node.id||node,idx=array.indexOf(this._connectIds,id);
if(idx>=0){
this._connectIds.splice(idx,1);
this.set("connectId",this._connectIds);
}
},buildRendering:function(){
this.inherited(arguments);
_106a.add(this.domNode,"dijitTooltipData");
},startup:function(){
this.inherited(arguments);
var ids=this.connectId;
array.forEach(lang.isArrayLike(ids)?ids:[ids],this.addTarget,this);
},_onHover:function(e){
if(!this._showTimer){
var _108a=e.target;
this._showTimer=setTimeout(lang.hitch(this,function(){
this.open(_108a);
}),this.showDelay);
}
},_onUnHover:function(){
if(this._focus){
return;
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
this.close();
},open:function(_108b){
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
_1077.show(this.label||this.domNode.innerHTML,_108b,this.position,!this.isLeftToRight(),this.textDir);
this._connectNode=_108b;
this.onShow(_108b,this.position);
},close:function(){
if(this._connectNode){
_1077.hide(this._connectNode);
delete this._connectNode;
this.onHide();
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
},onShow:function(){
},onHide:function(){
},uninitialize:function(){
this.close();
this.inherited(arguments);
}});
_1077._MasterTooltip=_1072;
_1077.show=dijit.showTooltip;
_1077.hide=dijit.hideTooltip;
_1077.defaultPosition=["after-centered","before-centered"];
return _1077;
});
},"dijit/PopupMenuItem":function(){
define("dijit/PopupMenuItem",["dojo/_base/declare","dojo/dom-style","dojo/query","dojo/_base/window","./registry","./MenuItem","./hccss"],function(_108c,_108d,query,win,_108e,_108f){
return _108c("dijit.PopupMenuItem",_108f,{_fillContent:function(){
if(this.srcNodeRef){
var nodes=query("*",this.srcNodeRef);
this.inherited(arguments,[nodes[0]]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(!this.popup){
var node=query("[widgetId]",this.dropDownContainer)[0];
this.popup=_108e.byNode(node);
}
win.body().appendChild(this.popup.domNode);
this.popup.startup();
this.popup.domNode.style.display="none";
if(this.arrowWrapper){
_108d.set(this.arrowWrapper,"visibility","");
}
this.focusNode.setAttribute("aria-haspopup","true");
},destroyDescendants:function(_1090){
if(this.popup){
if(!this.popup._destroyed){
this.popup.destroyRecursive(_1090);
}
delete this.popup;
}
this.inherited(arguments);
}});
});
},"dijit/main":function(){
define("dijit/main",["dojo/_base/kernel"],function(dojo){
return dojo.dijit;
});
},"dijit/layout/ContentPane":function(){
define("dijit/layout/ContentPane",["dojo/_base/kernel","dojo/_base/lang","../_Widget","./_ContentPaneResizeMixin","dojo/string","dojo/html","dojo/i18n!../nls/loading","dojo/_base/array","dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-attr","dojo/_base/window","dojo/_base/xhr","dojo/i18n"],function(_1091,lang,_1092,_1093,_1094,html,_1095,array,_1096,_1097,dom,_1098,win,xhr,i18n){
var _1099=typeof (dojo.global.perf)!="undefined";
return _1096("dijit.layout.ContentPane",[_1092,_1093],{href:"",content:"",extractContent:false,parseOnLoad:true,parserScope:_1091._scopeName,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'><span class='dijitInline dijitIconLoading'></span>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'><span class='dijitInline dijitIconError'></span>${errorState}</span>",isLoaded:false,baseClass:"dijitContentPane",ioArgs:{},onLoadDeferred:null,_setTitleAttr:null,stopParser:true,template:false,create:function(_109a,_109b){
if((!_109a||!_109a.template)&&_109b&&!("href" in _109a)&&!("content" in _109a)){
var df=win.doc.createDocumentFragment();
_109b=dom.byId(_109b);
while(_109b.firstChild){
df.appendChild(_109b.firstChild);
}
_109a=lang.delegate(_109a,{content:df});
}
this.inherited(arguments,[_109a,_109b]);
},postMixInProperties:function(){
this.inherited(arguments);
var _109c=i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=_1094.substitute(this.loadingMessage,_109c);
this.errorMessage=_1094.substitute(this.errorMessage,_109c);
},buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
this.domNode.title="";
if(!_1098.get(this.domNode,"role")){
this.domNode.setAttribute("role","group");
}
this.domNode.removeAttribute("title");
},startup:function(){
this.inherited(arguments);
if(this._contentSetter){
array.forEach(this._contentSetter.parseResults,function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
},this);
}
},setHref:function(href){
_1091.deprecated("dijit.layout.ContentPane.setHref() is deprecated. Use set('href', ...) instead.","","2.0");
return this.set("href",href);
},_setHrefAttr:function(href){
this.cancel();
this.onLoadDeferred=new _1097(lang.hitch(this,"cancel"));
this.onLoadDeferred.addCallback(lang.hitch(this,"onLoad"));
this._set("href",href);
if(this.preload||(this._created&&this._isShown())){
this._load();
}else{
this._hrefChanged=true;
}
return this.onLoadDeferred;
},setContent:function(data){
_1091.deprecated("dijit.layout.ContentPane.setContent() is deprecated.  Use set('content', ...) instead.","","2.0");
this.set("content",data);
},_setContentAttr:function(data){
this._set("href","");
this.cancel();
this.onLoadDeferred=new _1097(lang.hitch(this,"cancel"));
if(this._created){
this.onLoadDeferred.addCallback(lang.hitch(this,"onLoad"));
}
this._setContent(data||"");
this._isDownloaded=false;
return this.onLoadDeferred;
},_getContentAttr:function(){
return this.containerNode.innerHTML;
},cancel:function(){
if(this._xhrDfd&&(this._xhrDfd.fired==-1)){
this._xhrDfd.cancel();
}
delete this._xhrDfd;
this.onLoadDeferred=null;
},uninitialize:function(){
if(this._beingDestroyed){
this.cancel();
}
this.inherited(arguments);
},destroyRecursive:function(_109d){
if(this._beingDestroyed){
return;
}
this.inherited(arguments);
},_onShow:function(){
this.inherited(arguments);
if(this.href){
if(!this._xhrDfd&&(!this.isLoaded||this._hrefChanged||this.refreshOnShow)){
return this.refresh();
}
}
},refresh:function(){
this.cancel();
this.onLoadDeferred=new _1097(lang.hitch(this,"cancel"));
this.onLoadDeferred.addCallback(lang.hitch(this,"onLoad"));
this._load();
return this.onLoadDeferred;
},_load:function(){
if(_1099){
perf.widgetStartedLoadingCallback();
}
this._setContent(this.onDownloadStart(),true);
var self=this;
var _109e={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(lang.isObject(this.ioArgs)){
lang.mixin(_109e,this.ioArgs);
}
var hand=(this._xhrDfd=(this.ioMethod||xhr.get)(_109e));
hand.addCallback(function(html){
try{
self._isDownloaded=true;
self._setContent(html,false);
self.onDownloadEnd();
}
catch(err){
self._onError("Content",err);
}
if(_1099){
perf.widgetLoadedCallback(self);
}
delete self._xhrDfd;
return html;
});
hand.addErrback(function(err){
if(!hand.canceled){
self._onError("Download",err);
}
delete self._xhrDfd;
return err;
});
delete this._hrefChanged;
},_onLoadHandler:function(data){
this._set("isLoaded",true);
try{
this.onLoadDeferred.callback(data);
}
catch(e){
console.error("Error "+this.widgetId+" running custom onLoad code: "+e.message);
}
},_onUnloadHandler:function(){
this._set("isLoaded",false);
try{
this.onUnload();
}
catch(e){
console.error("Error "+this.widgetId+" running custom onUnload code: "+e.message);
}
},destroyDescendants:function(_109f){
if(this.isLoaded){
this._onUnloadHandler();
}
var _10a0=this._contentSetter;
array.forEach(this.getChildren(),function(_10a1){
if(_10a1.destroyRecursive){
_10a1.destroyRecursive(_109f);
}
});
if(_10a0){
array.forEach(_10a0.parseResults,function(_10a2){
if(_10a2.destroyRecursive&&_10a2.domNode&&_10a2.domNode.parentNode==win.body()){
_10a2.destroyRecursive(_109f);
}
});
delete _10a0.parseResults;
}
if(!_109f){
html._emptyNode(this.containerNode);
}
delete this._singleChild;
},_setContent:function(cont,_10a3){
this.destroyDescendants();
var _10a4=this._contentSetter;
if(!(_10a4&&_10a4 instanceof html._ContentSetter)){
_10a4=this._contentSetter=new html._ContentSetter({node:this.containerNode,_onError:lang.hitch(this,this._onError),onContentError:lang.hitch(this,function(e){
var _10a5=this.onContentError(e);
try{
this.containerNode.innerHTML=_10a5;
}
catch(e){
console.error("Fatal "+this.id+" could not change content due to "+e.message,e);
}
})});
}
var _10a6=lang.mixin({cleanContent:this.cleanContent,extractContent:this.extractContent,parseContent:!cont.domNode&&this.parseOnLoad,parserScope:this.parserScope,startup:false,dir:this.dir,lang:this.lang,textDir:this.textDir},this._contentSetterParams||{});
_10a4.set((lang.isObject(cont)&&cont.domNode)?cont.domNode:cont,_10a6);
delete this._contentSetterParams;
if(this.doLayout){
this._checkIfSingleChild();
}
if(!_10a3){
if(this._started){
delete this._started;
this.startup();
this._scheduleLayout();
}
this._onLoadHandler(cont);
}
},_onError:function(type,err,_10a7){
this.onLoadDeferred.errback(err);
var _10a8=this["on"+type+"Error"].call(this,err);
if(_10a7){
console.error(_10a7,err);
}else{
if(_10a8){
this._setContent(_10a8,true);
}
}
},onLoad:function(){
},onUnload:function(){
},onDownloadStart:function(){
return this.loadingMessage;
},onContentError:function(){
},onDownloadError:function(){
return this.errorMessage;
},onDownloadEnd:function(){
}});
});
},"dijit/_WidgetsInTemplateMixin":function(){
define("dijit/_WidgetsInTemplateMixin",["dojo/_base/array","dojo/_base/declare","dojo/parser","dijit/registry"],function(array,_10a9,_10aa,_10ab){
return _10a9("dijit._WidgetsInTemplateMixin",null,{_earlyTemplatedStartup:false,widgetsInTemplate:true,_beforeFillContent:function(){
if(this.widgetsInTemplate){
var node=this.domNode;
var cw=(this._startupWidgets=_10aa.parse(node,{noStart:!this._earlyTemplatedStartup,template:true,inherited:{dir:this.dir,lang:this.lang,textDir:this.textDir},propsThis:this,scope:"dojo"}));
this._supportingWidgets=_10ab.findWidgets(node);
this._attachTemplateNodes(cw,function(n,p){
return n[p];
});
}
},startup:function(){
array.forEach(this._startupWidgets,function(w){
if(w&&!w._started&&w.startup){
w.startup();
}
});
this.inherited(arguments);
}});
});
},"url:curam/layout/resources/UIMController.html":"<div id=\"uimcontroller_${uid}\" class=\"uimcontroller_${uid} uimController ${classList}\" data-dojo-attach-point=\"uimController\">\r\n  <div style=\"display:none;\" \r\n       id=\"uimcontroller_tc_${uid}\" \r\n       class=\"ipnTabController in-page-nav-tabContainer\"\r\n       data-dojo-attach-point=\"tabController\" \r\n       data-dojo-type=\"curam.layout.TabContainer\">\r\n  </div>\r\n  <div class=\"contentPanelFrameWrapper\"  \r\n        data-dojo-attach-point=\"frameWrapper\">\r\n    <iframe frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\"\r\n             allowTransparency=\"true\" \r\n             id=\"${iframeId}\" \r\n             data-dojo-attach-point=\"frame\"                 \r\n             class=\"${iframeId} ${iframeClassList}\"\r\n             iscpiframe=\"${iscpiframe}\"\r\n             title=\"${title}\" >\r\n    </iframe>\r\n  </div> \r\n</div>","dijit/_HasDropDown":function(){
define("dijit/_HasDropDown",["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/keys","dojo/_base/lang","dojo/touch","dojo/_base/window","dojo/window","./registry","./focus","./popup","./_FocusMixin"],function(_10ac,_10ad,event,dom,_10ae,_10af,_10b0,_10b1,has,keys,lang,touch,win,_10b2,_10b3,focus,popup,_10b4){
return _10ac("dijit._HasDropDown",_10b4,{_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:true,forceWidth:false,maxHeight:0,dropDownPosition:["below","above"],_stopClickEvents:true,_onDropDownMouseDown:function(e){
if(this.disabled||this.readOnly){
return;
}
e.preventDefault();
this._docHandler=this.connect(win.doc,touch.release,"_onDropDownMouseUp");
this.toggleDropDown();
},_onDropDownMouseUp:function(e){
if(e&&this._docHandler){
this.disconnect(this._docHandler);
}
var _10b5=this.dropDown,_10b6=false;
if(e&&this._opened){
var c=_10b0.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_10b6){
if(_10af.contains(t,"dijitPopup")){
_10b6=true;
}else{
t=t.parentNode;
}
}
if(_10b6){
t=e.target;
if(_10b5.onItemClick){
var _10b7;
while(t&&!(_10b7=_10b3.byNode(t))){
t=t.parentNode;
}
if(_10b7&&_10b7.onClick&&_10b7.getParent){
_10b7.getParent().onItemClick(_10b7,e);
}
}
return;
}
}
}
if(this._opened){
if(_10b5.focus&&_10b5.autoFocus!==false){
window.setTimeout(lang.hitch(_10b5,"focus"),1);
}
}else{
setTimeout(lang.hitch(this,"focus"),0);
}
if(has("ios")){
this._justGotMouseUp=true;
setTimeout(lang.hitch(this,function(){
this._justGotMouseUp=false;
}),0);
}
},_onDropDownClick:function(e){
if(has("ios")&&!this._justGotMouseUp){
this._onDropDownMouseDown(e);
this._onDropDownMouseUp(e);
}
if(this._stopClickEvents){
event.stop(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _10b8={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
_10af.add(this._arrowWrapperNode||this._buttonNode,"dijit"+_10b8+"ArrowButton");
},postCreate:function(){
this.inherited(arguments);
this.connect(this._buttonNode,touch.press,"_onDropDownMouseDown");
this.connect(this._buttonNode,"onclick","_onDropDownClick");
this.connect(this.focusNode,"onkeypress","_onKey");
this.connect(this.focusNode,"onkeyup","_onKeyUp");
},destroy:function(){
if(this.dropDown){
if(!this.dropDown._destroyed){
this.dropDown.destroyRecursive();
}
delete this.dropDown;
}
this.inherited(arguments);
},_onKey:function(e){
if(this.disabled||this.readOnly){
return;
}
var d=this.dropDown,_10b9=e.target;
if(d&&this._opened&&d.handleKey){
if(d.handleKey(e)===false){
event.stop(e);
return;
}
}
if(d&&this._opened&&e.charOrCode==keys.ESCAPE){
this.closeDropDown();
event.stop(e);
}else{
if(!this._opened&&(e.charOrCode==keys.DOWN_ARROW||((e.charOrCode==keys.ENTER||e.charOrCode==" ")&&((_10b9.tagName||"").toLowerCase()!=="input"||(_10b9.type&&_10b9.type.toLowerCase()!=="text"))))){
this._toggleOnKeyUp=true;
event.stop(e);
}
}
},_onKeyUp:function(){
if(this._toggleOnKeyUp){
delete this._toggleOnKeyUp;
this.toggleDropDown();
var d=this.dropDown;
if(d&&d.focus){
setTimeout(lang.hitch(d,"focus"),1);
}
}
},_onBlur:function(){
var _10ba=focus.curNode&&this.dropDown&&dom.isDescendant(focus.curNode,this.dropDown.domNode);
this.closeDropDown(_10ba);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_10bb){
_10bb();
},loadAndOpenDropDown:function(){
var d=new _10ad(),_10bc=lang.hitch(this,function(){
this.openDropDown();
d.resolve(this.dropDown);
});
if(!this.isLoaded()){
this.loadDropDown(_10bc);
}else{
_10bc();
}
return d;
},toggleDropDown:function(){
if(this.disabled||this.readOnly){
return;
}
if(!this._opened){
this.loadAndOpenDropDown();
}else{
this.closeDropDown();
}
},openDropDown:function(){
var _10bd=this.dropDown,_10be=_10bd.domNode,_10bf=this._aroundNode||this.domNode,self=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_10be.style.width){
this._explicitDDWidth=true;
}
if(_10be.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _10c0={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_10c0.width="";
}
if(!this._explicitDDHeight){
_10c0.height="";
}
_10b1.set(_10be,_10c0);
var _10c1=this.maxHeight;
if(_10c1==-1){
var _10c2=_10b2.getBox(),_10c3=_10b0.position(_10bf,false);
_10c1=Math.floor(Math.max(_10c3.y,_10c2.h-(_10c3.y+_10c3.h)));
}
popup.moveOffScreen(_10bd);
if(_10bd.startup&&!_10bd._started){
_10bd.startup();
}
var mb=_10b0.getMarginSize(_10be);
var _10c4=(_10c1&&mb.h>_10c1);
_10b1.set(_10be,{overflowX:"hidden",overflowY:_10c4?"auto":"hidden"});
if(_10c4){
mb.h=_10c1;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_10bf.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_10bf.offsetWidth);
}else{
delete mb.w;
}
}
if(lang.isFunction(_10bd.resize)){
_10bd.resize(mb);
}else{
_10b0.setMarginBox(_10be,mb);
}
}
var _10c5=popup.open({parent:this,popup:_10bd,around:_10bf,orient:this.dropDownPosition,onExecute:function(){
self.closeDropDown(true);
},onCancel:function(){
self.closeDropDown(true);
},onClose:function(){
_10ae.set(self._popupStateNode,"popupActive",false);
_10af.remove(self._popupStateNode,"dijitHasDropDownOpen");
self._opened=false;
}});
_10ae.set(this._popupStateNode,"popupActive","true");
_10af.add(self._popupStateNode,"dijitHasDropDownOpen");
this._opened=true;
return _10c5;
},closeDropDown:function(focus){
if(this._opened){
if(focus){
this.focus();
}
popup.close(this.dropDown);
this._opened=false;
}
}});
});
},"url:dijit/form/templates/DropDownBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdata-dojo-attach-point=\"_buttonNode, _popupStateNode\" role=\"presentation\"\n\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdata-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\n\t/></div\n></div>\n","curam/GlobalVars":function(){
define("curam/GlobalVars",["curam/util"],function(){
var _10c6={popupMappingRepository:[],popupMappingLoaded:[],popupInputs:[],currentPopupProps:null,currentPopupInstanceName:"",popupWindow:null,popupCTCodeMappings:[],popupPropertiesRepository:[],POPUP_EMPTY_SPAN_MIN_SIZE:25,POPUP_EMPTY_SPAN_CHAR:" ",POPUP_EMPTY_SPAN_VALUE:null,replacedButtons:[]};
var gc=dojo.global.curam;
dojo.mixin(gc,_10c6);
gc.POPUP_EMPTY_SPAN_VALUE=curam.util.fillString(gc.POPUP_EMPTY_SPAN_CHAR,gc.POPUP_EMPTY_SPAN_MIN_SIZE);
return _10c6;
});
},"curam/html":function(){
define("curam/html",["curam/define"],function(){
curam.define.singleton("curam.html",{splitWithTag:function(value,delim,_10c7,_10c8){
var _10c9=value.split(delim||"\n");
if(_10c9.length<2){
return _10c8?_10c8(value):value;
}
var t=(_10c7||"div")+">";
var _10ca="<"+t,_10cb="</"+t;
if(_10c8){
for(var i=0;i<_10c9.length;i++){
_10c9[i]=_10c8(_10c9[i]);
}
}
return _10ca+_10c9.join(_10cb+_10ca)+_10cb;
}});
return curam.html;
});
},"dojo/html":function(){
define("dojo/html",["./_base/kernel","./_base/lang","./_base/array","./_base/declare","./dom","./dom-construct","./parser"],function(dojo,lang,_10cc,_10cd,dom,_10ce,_10cf){
lang.getObject("html",true,dojo);
var _10d0=0;
dojo.html._secureForInnerHtml=function(cont){
return cont.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"");
};
dojo.html._emptyNode=_10ce.empty;
dojo.html._setNodeContent=function(node,cont){
_10ce.empty(node);
if(cont){
if(typeof cont=="string"){
cont=_10ce.toDom(cont,node.ownerDocument);
}
if(!cont.nodeType&&lang.isArrayLike(cont)){
for(var _10d1=cont.length,i=0;i<cont.length;i=_10d1==cont.length?i+1:0){
_10ce.place(cont[i],node,"last");
}
}else{
_10ce.place(cont,node,"last");
}
}
return node;
};
_10cd("dojo.html._ContentSetter",null,{node:"",content:"",id:"",cleanContent:false,extractContent:false,parseContent:false,parserScope:dojo._scopeName,startup:true,constructor:function(_10d2,node){
lang.mixin(this,_10d2||{});
node=this.node=dom.byId(this.node||node);
if(!this.id){
this.id=["Setter",(node)?node.id||node.tagName:"",_10d0++].join("_");
}
},set:function(cont,_10d3){
if(undefined!==cont){
this.content=cont;
}
if(_10d3){
this._mixin(_10d3);
}
this.onBegin();
this.setContent();
this.onEnd();
return this.node;
},setContent:function(){
var node=this.node;
if(!node){
throw new Error(this.declaredClass+": setContent given no node");
}
try{
node=dojo.html._setNodeContent(node,this.content);
}
catch(e){
var _10d4=this.onContentError(e);
try{
node.innerHTML=_10d4;
}
catch(e){
console.error("Fatal "+this.declaredClass+".setContent could not change content due to "+e.message,e);
}
}
this.node=node;
},empty:function(){
if(this.parseResults&&this.parseResults.length){
_10cc.forEach(this.parseResults,function(w){
if(w.destroy){
w.destroy();
}
});
delete this.parseResults;
}
dojo.html._emptyNode(this.node);
},onBegin:function(){
var cont=this.content;
if(lang.isString(cont)){
if(this.cleanContent){
cont=dojo.html._secureForInnerHtml(cont);
}
if(this.extractContent){
var match=cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(match){
cont=match[1];
}
}
}
this.empty();
this.content=cont;
return this.node;
},onEnd:function(){
if(this.parseContent){
this._parse();
}
return this.node;
},tearDown:function(){
delete this.parseResults;
delete this.node;
delete this.content;
},onContentError:function(err){
return "Error occured setting content: "+err;
},_mixin:function(_10d5){
var empty={},key;
for(key in _10d5){
if(key in empty){
continue;
}
this[key]=_10d5[key];
}
},_parse:function(){
var _10d6=this.node;
try{
var _10d7={};
_10cc.forEach(["dir","lang","textDir"],function(name){
if(this[name]){
_10d7[name]=this[name];
}
},this);
this.parseResults=_10cf.parse({rootNode:_10d6,noStart:!this.startup,inherited:_10d7,scope:this.parserScope});
}
catch(e){
this._onError("Content",e,"Error parsing in _ContentSetter#"+this.id);
}
},_onError:function(type,err,_10d8){
var _10d9=this["on"+type+"Error"].call(this,err);
if(_10d8){
console.error(_10d8,err);
}else{
if(_10d9){
dojo.html._setNodeContent(this.node,_10d9,true);
}
}
}});
dojo.html.set=function(node,cont,_10da){
if(undefined==cont){
console.warn("dojo.html.set: no cont argument provided, using empty string");
cont="";
}
if(!_10da){
return dojo.html._setNodeContent(node,cont,true);
}else{
var op=new dojo.html._ContentSetter(lang.mixin(_10da,{content:cont,node:node}));
return op.set();
}
};
return dojo.html;
});
},"url:dijit/templates/MenuBar.html":"<div class=\"dijitMenuBar dijitMenuPassive\" data-dojo-attach-point=\"containerNode\"  role=\"menubar\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress: _onKeyPress\"></div>\n","dojo/Stateful":function(){
define("dojo/Stateful",["./_base/declare","./_base/lang","./_base/array"],function(_10db,lang,array){
return _10db("dojo.Stateful",null,{postscript:function(mixin){
if(mixin){
lang.mixin(this,mixin);
}
},get:function(name){
return this[name];
},set:function(name,value){
if(typeof name==="object"){
for(var x in name){
if(name.hasOwnProperty(x)&&x!="_watchCallbacks"){
this.set(x,name[x]);
}
}
return this;
}
var _10dc=this[name];
this[name]=value;
if(this._watchCallbacks){
this._watchCallbacks(name,_10dc,value);
}
return this;
},watch:function(name,_10dd){
var _10de=this._watchCallbacks;
if(!_10de){
var self=this;
_10de=this._watchCallbacks=function(name,_10df,value,_10e0){
var _10e1=function(_10e2){
if(_10e2){
_10e2=_10e2.slice();
for(var i=0,l=_10e2.length;i<l;i++){
_10e2[i].call(self,name,_10df,value);
}
}
};
_10e1(_10de["_"+name]);
if(!_10e0){
_10e1(_10de["*"]);
}
};
}
if(!_10dd&&typeof name==="function"){
_10dd=name;
name="*";
}else{
name="_"+name;
}
var _10e3=_10de[name];
if(typeof _10e3!=="object"){
_10e3=_10de[name]=[];
}
_10e3.push(_10dd);
return {unwatch:function(){
_10e3.splice(array.indexOf(_10e3,_10dd),1);
}};
}});
});
},"curam/widget/ComboBox":function(){
require({cache:{"url:curam/widget/templates/ComboBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\r\n  id=\"widget_${id}\"\r\n  role=\"listbox\"\r\n  ><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\r\n    data-dojo-attach-point=\"_buttonNode, _popupStateNode\" role=\"presentation\"\r\n    ><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n      ${_buttonInputDisabled}\r\n  /></div\r\n  ><div class='dijitReset dijitValidationContainer'\r\n    ><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n  /></div\r\n  ><div class=\"dijitReset dijitInputField dijitInputContainer\" role=\"listbox\"\r\n    ><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\r\n      data-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\r\n  /></div\r\n></div>\r\n"}});
define("curam/widget/ComboBox",["dijit/registry","dojo/on","dojo/text!curam/widget/templates/ComboBox.html","dijit/form/ComboBox"],function(_10e4,on,_10e5){
var _10e6=dojo.declare("curam.widget.ComboBox",dijit.form.ComboBox,{templateString:_10e5,enterKeyOnOpenDropDown:false,postCreate:function(){
on(this.focusNode,"keydown",function(e){
var _10e7=_10e4.byNode(dojo.byId("widget_"+e.target.id));
if(e.keyCode==dojo.keys.ENTER&&_10e7._opened){
_10e7.enterKeyOnOpenDropDown=true;
}
});
this.inherited(arguments);
}});
return _10e6;
});
},"dojo/dnd/autoscroll":function(){
define("dojo/dnd/autoscroll",["../main","../window"],function(dojo){
dojo.getObject("dnd",true,dojo);
dojo.dnd.getViewport=dojo.window.getBox;
dojo.dnd.V_TRIGGER_AUTOSCROLL=32;
dojo.dnd.H_TRIGGER_AUTOSCROLL=32;
dojo.dnd.V_AUTOSCROLL_VALUE=16;
dojo.dnd.H_AUTOSCROLL_VALUE=16;
dojo.dnd.autoScroll=function(e){
var v=dojo.window.getBox(),dx=0,dy=0;
if(e.clientX<dojo.dnd.H_TRIGGER_AUTOSCROLL){
dx=-dojo.dnd.H_AUTOSCROLL_VALUE;
}else{
if(e.clientX>v.w-dojo.dnd.H_TRIGGER_AUTOSCROLL){
dx=dojo.dnd.H_AUTOSCROLL_VALUE;
}
}
if(e.clientY<dojo.dnd.V_TRIGGER_AUTOSCROLL){
dy=-dojo.dnd.V_AUTOSCROLL_VALUE;
}else{
if(e.clientY>v.h-dojo.dnd.V_TRIGGER_AUTOSCROLL){
dy=dojo.dnd.V_AUTOSCROLL_VALUE;
}
}
window.scrollBy(dx,dy);
};
dojo.dnd._validNodes={"div":1,"p":1,"td":1};
dojo.dnd._validOverflow={"auto":1,"scroll":1};
dojo.dnd.autoScrollNodes=function(e){
var b,t,w,h,rx,ry,dx=0,dy=0,_10e8,_10e9;
for(var n=e.target;n;){
if(n.nodeType==1&&(n.tagName.toLowerCase() in dojo.dnd._validNodes)){
var s=dojo.getComputedStyle(n),_10ea=(s.overflow.toLowerCase() in dojo.dnd._validOverflow),_10eb=(s.overflowX.toLowerCase() in dojo.dnd._validOverflow),_10ec=(s.overflowY.toLowerCase() in dojo.dnd._validOverflow);
if(_10ea||_10eb||_10ec){
b=dojo._getContentBox(n,s);
t=dojo.position(n,true);
}
if(_10ea||_10eb){
w=Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL,b.w/2);
rx=e.pageX-t.x;
if(dojo.isWebKit||dojo.isOpera){
rx+=dojo.body().scrollLeft;
}
dx=0;
if(rx>0&&rx<b.w){
if(rx<w){
dx=-w;
}else{
if(rx>b.w-w){
dx=w;
}
}
_10e8=n.scrollLeft;
n.scrollLeft=n.scrollLeft+dx;
}
}
if(_10ea||_10ec){
h=Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL,b.h/2);
ry=e.pageY-t.y;
if(dojo.isWebKit||dojo.isOpera){
ry+=dojo.body().scrollTop;
}
dy=0;
if(ry>0&&ry<b.h){
if(ry<h){
dy=-h;
}else{
if(ry>b.h-h){
dy=h;
}
}
_10e9=n.scrollTop;
n.scrollTop=n.scrollTop+dy;
}
}
if(dx||dy){
return;
}
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
dojo.dnd.autoScroll(e);
};
return dojo.dnd;
});
},"url:dijit/templates/CheckedMenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitemcheckbox\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuItemIcon dijitCheckedMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t<span class=\"dijitCheckedMenuItemIconChar\">&#10003;</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,labelNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&#160;</td>\n</tr>\n","curam/util/ScreenContext":function(){
define("curam/util/ScreenContext",[],function(){
var _10ed={DEFAULT_CONTEXT:112,SAMPLE22:2,SAMPLE21:1,SAMPLE13:4,SAMPLE12:2,SAMPLE11:1,EXTAPP:1048576,CONTEXT_PORTLET:524288,SMART_PANEL:262144,NESTED_UIM:131072,ORG_TREE:65536,CONTEXT_PANEL:32768,LIST_ROW_INLINE_PAGE:8192,LIST_EVEN_ROW:16384,TAB:4096,TREE:2048,AGENDA:1024,POPUP:512,MODAL:256,HOME:128,HEADER:64,NAVIGATOR:32,FOOTER:16,OVAL:8,RESOLVE:4,ACTION:2,ERROR:1,EMPTY:0};
var _10ee=[["ERROR","ACTION","RESOLVE","OPT_VALIDATION","FOOTER","NAVIGATOR","HEADER","HOME_PAGE","MODAL","POPUP","AGENDA","TREE","TAB","LIST_EVEN_ROW","LIST_ROW_INLINE_PAGE","CONTEXT_PANEL","ORG_TREE","NESTED_UIM","SMART_PANEL","CONTEXT_PORTLET","EXTAPP"],["SAMPLE11","SAMPLE12","SAMPLE13"],["SAMPLE21","SAMPLE22"]];
var _10ef=dojo.declare("curam.util.ScreenContext",null,{constructor:function(_10f0){
if(_10f0){
this.setContext(_10f0);
}else{
this.currentContext=[_10ed["DEFAULT_CONTEXT"]|_10ed["DEFAULT_CONTEXT"]];
}
},setContext:function(_10f1){
var tmp=this.setup(_10f1);
this.currentContext=((tmp==null)?([_10ed["DEFAULT_CONTEXT"]|_10ed["DEFAULT_CONTEXT"]]):(tmp));
},addContextBits:function(_10f2,idx){
if(!_10f2){
return;
}
var navig=(idx)?idx:0;
var _10f3=this.parseContext(_10f2);
if(_10f3!=null){
this.currentContext[navig]|=_10f3;
}
return this.currentContext[navig];
},addAll:function(idx){
var navig=(idx)?idx:0;
this.currentContext[navig]=4294967295;
return this.currentContext[navig];
},clear:function(_10f4,idx){
if(!_10f4){
this.clearAll();
return;
}
var navig=(idx)?idx:0;
if(_10f4==0){
return this.currentContext[navig];
}
var _10f5=this.parseContext(_10f4);
if(_10f5!=null){
var _10f6=this.currentContext[navig]&_10f5;
this.currentContext[navig]^=_10f6;
}
return this.currentContext[navig];
},clearAll:function(idx){
if(idx){
this.currentContext[idx]=0;
}else{
for(var i=0;i<this.currentContext.length;i++){
this.currentContext[i]=0;
}
}
},updateStates:function(_10f7){
this.clear("ERROR|ACTION|RESOLVE");
this.currentContext[0]=this.currentContext[0]|(_10f7&7);
},hasContextBits:function(_10f8,idx){
if(!_10f8){
return false;
}
var navig=(idx)?idx:0;
var _10f9=this.parseContext(_10f8);
if(_10f9!=null){
var merge=this.currentContext[navig]&_10f9;
return (merge==_10f9);
}
return false;
},getValue:function(){
var _10fa="";
for(var i=0;i<this.currentContext.length;i++){
_10fa+=this.currentContext[i]+"|";
}
return _10fa.substring(0,_10fa.length-1);
},toRequestString:function(){
return "o3ctx="+this.getValue();
},toBinary:function(){
var _10fb="";
for(var i=0;i<this.currentContext.length;i++){
_10fb+=this.currentContext[i].toString(2)+"|";
}
return _10fb.substring(0,_10fb.length-1);
},toString:function(){
var _10fc="";
for(var i=0;i<this.currentContext.length;i++){
var _10fd="";
var j=0;
while(j<_10ee[i].length){
if(((this.currentContext[i]>>j)&1)!=0){
_10fd+=","+_10ee[i][j];
}
j++;
}
if(_10fd==""){
return "{}";
}
_10fc+="|"+_10fd.replace(",","{")+((_10fd.length==0)?"":"}");
}
return _10fc.substring(1);
},parseContext:function(_10fe){
var _10ff=_10fe.replace(/,/g,"|");
var parts=_10ff.split("|");
var tmp=isNaN(parts[0])?parseInt(_10ed[parts[0]]):parts[0];
for(var i=1;i<parts.length;i++){
tmp=tmp|(isNaN(parts[i])?parseInt(_10ed[parts[i]]):parts[i]);
}
return (isNaN(tmp)?null:tmp);
},setup:function(_1100){
if(!_1100){
return null;
}
var _1101=(""+_1100).split("|");
var _1102=new Array(_1101.length);
for(var i=0;i<_1101.length;i++){
_1102[i]=this.parseContext(_1101[_1101.length-i-1]);
_1102[i]=_1102[i]|_1102[i];
if(!_1102[i]||isNaN(_1102[i])||_1102[i]>4294967295){
return null;
}
}
return _1102;
}});
return _10ef;
});
},"dijit/layout/utils":function(){
define("dijit/layout/utils",["dojo/_base/array","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang",".."],function(array,_1103,_1104,_1105,lang,dijit){
var _1106=lang.getObject("layout",true,dijit);
_1106.marginBox2contentBox=function(node,mb){
var cs=_1105.getComputedStyle(node);
var me=_1104.getMarginExtents(node,cs);
var pb=_1104.getPadBorderExtents(node,cs);
return {l:_1105.toPixelValue(node,cs.paddingLeft),t:_1105.toPixelValue(node,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)};
};
function _1107(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
};
function size(_1108,dim){
var _1109=_1108.resize?_1108.resize(dim):_1104.setMarginBox(_1108.domNode,dim);
if(_1108.fakeWidget){
return;
}
if(_1109){
lang.mixin(_1108,_1109);
}else{
lang.mixin(_1108,_1104.getMarginBoxSimple(_1108.domNode));
lang.mixin(_1108,dim);
}
};
_1106.layoutChildren=function(_110a,dim,_110b,_110c,_110d){
dim=lang.mixin({},dim);
_1103.add(_110a,"dijitLayoutContainer");
_110b=array.filter(_110b,function(item){
return item.region!="center"&&item.layoutAlign!="client";
}).concat(array.filter(_110b,function(item){
return item.region=="center"||item.layoutAlign=="client";
}));
var _110e={};
array.forEach(_110b,function(child){
var elm=child.domNode,pos=(child.region||child.layoutAlign);
if(!pos){
throw new Error("No region setting for "+child.id);
}
var _110f=elm.style;
_110f.left=dim.l+"px";
_110f.top=dim.t+"px";
_110f.position="absolute";
_1103.add(elm,"dijitAlign"+_1107(pos));
var _1110={};
if(_110c&&_110c==child.id){
_1110[child.region=="top"||child.region=="bottom"?"h":"w"]=_110d;
}
if(pos=="top"||pos=="bottom"){
_1110.w=dim.w;
size(child,_1110);
dim.h-=child.h;
if(pos=="top"){
dim.t+=child.h;
}else{
_110f.top=dim.t+dim.h+"px";
}
}else{
if(pos=="left"||pos=="right"){
_1110.h=dim.h;
size(child,_1110);
dim.w-=child.w;
if(pos=="left"){
dim.l+=child.w;
}else{
_110f.left=dim.l+dim.w+"px";
}
}else{
if(pos=="client"||pos=="center"){
size(child,dim);
}
}
}
_110e[pos]={w:dim.w,h:dim.h};
});
return _110e;
};
return {marginBox2contentBox:_1106.marginBox2contentBox,layoutChildren:_1106.layoutChildren};
});
},"curam/util/FrequencyEditor":function(){
define("curam/util/FrequencyEditor",["curam/util","curam/define","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1111=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.FrequencyEditor",{CORRECTOR:1,DAILY_FREQUENCY:0,WEEKLY_FREQUENCY:1,MONTHLY_FREQUENCY:2,YEARLY_FREQUENCY:3,BIMONTHLY_FREQUENCY:4,EVERY_DAY_MASK:201,EVERY_WEEKDAY_MASK:202,EVERY_WEEKENDDAY_MASK:203,MON_MASK:1,TUE_MASK:2,WED_MASK:4,THU_MASK:8,FRI_MASK:16,SAT_MASK:32,SUN_MASK:64,daysInMonth:[31,28,31,30,31,30,31,31,30,31,30,31],EVERY_DAY:0,EVERY_WEEKDAY:1,MON:0,TUE:1,WED:2,THU:3,FRI:4,SAT:5,SUN:6,START_DATE:0,MONTH_DAY_NUM:1,MONTH_SEL_DAY:2,DAY_NUM:0,SEL_DAY:1,SEL_MONTH_DAY_NUM:0,SEL_MONTH_SEL_DAY:1,allowableCharsForNumeric:["1","2","3","4","5","6","7","8","9","0",dojo.keys.LEFT_ARROW,dojo.keys.RIGHT_ARROW,dojo.keys.DELETE,dojo.keys.ENTER,dojo.keys.BACKSPACE,dojo.keys.END,dojo.keys.HOME,dojo.keys.TAB,dojo.keys.F5],allowableDayString:["32","33","34","35","36"],allowableDayOfWeekMask:["201","202","203","1","2","4","8","16","32","64"],allowableFirstDayStringForBimonthly:["32","33","34","35"],allowableSecondDayStringForBimonthly:["33","34","35","36"],allowableWeekdayStringForBimonthly:["1","2","4","8","16","32","64"],allowableMonthString:["1","2","3","4","5","6","7","8","9","10","11","12"],initPage:function(){
var _1112=curam.dialog.getParentWindow(window);
if(formActivated==true){
executeOpenerMapping("freq_text",translatedPatternString);
executeOpenerMapping("freq_data",patternString);
curam.dialog.closeModalDialog();
return false;
}
var freq=_1112.getPopupInput("initFreq");
curam.debug.log(_1111.getProperty("curam.util.FrequencyEditor.input"),freq);
if(!freq||freq==null||freq.length==0){
document.theForm.freqType[0].checked=true;
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_DAY].checked=true;
return true;
}
var _1113=parseInt(freq.charAt(0),10);
if(_1113==curam.util.FrequencyEditor.DAILY_FREQUENCY){
curam.util.FrequencyEditor.setupDailyFrequency(freq);
}else{
if(_1113==curam.util.FrequencyEditor.WEEKLY_FREQUENCY){
curam.util.FrequencyEditor.setupWeeklyFrequency(freq);
}else{
if(_1113==curam.util.FrequencyEditor.MONTHLY_FREQUENCY){
curam.util.FrequencyEditor.setupMonthlyFrequency(freq);
}else{
if(_1113==curam.util.FrequencyEditor.YEARLY_FREQUENCY){
curam.util.FrequencyEditor.setupYearlyFrequency(freq);
}else{
if(_1113==curam.util.FrequencyEditor.BIMONTHLY_FREQUENCY){
curam.util.FrequencyEditor.setupBimonthlyFrequency(freq);
}else{
alert(errorMsgs.freqPattern);
}
}
}
}
}
return true;
},setupDailyFrequency:function(_1114){
var _1115=_1114.substr(4,3);
document.theForm.freqType[curam.util.FrequencyEditor.DAILY_FREQUENCY].checked=true;
if(parseInt(_1115,10)==curam.util.FrequencyEditor.EVERY_WEEKDAY_MASK){
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_WEEKDAY].checked=true;
}else{
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_DAY].checked=true;
var _1116=parseInt(_1114.substr(1,3),10);
document.theForm.daily_num.value=""+_1116;
}
},setupWeeklyFrequency:function(_1117){
var _1118=parseInt(_1117.substr(4,3),10);
document.theForm.freqType[curam.util.FrequencyEditor.WEEKLY_FREQUENCY].checked=true;
if(_1118&curam.util.FrequencyEditor.MON_MASK){
document.theForm.weekly_select_mon.checked=true;
}
if(_1118&curam.util.FrequencyEditor.TUE_MASK){
document.theForm.weekly_select_tue.checked=true;
}
if(_1118&curam.util.FrequencyEditor.WED_MASK){
document.theForm.weekly_select_wed.checked=true;
}
if(_1118&curam.util.FrequencyEditor.THU_MASK){
document.theForm.weekly_select_thur.checked=true;
}
if(_1118&curam.util.FrequencyEditor.FRI_MASK){
document.theForm.weekly_select_fri.checked=true;
}
if(_1118&curam.util.FrequencyEditor.SAT_MASK){
document.theForm.weekly_select_sat.checked=true;
}
if(_1118&curam.util.FrequencyEditor.SUN_MASK){
document.theForm.weekly_select_sun.checked=true;
}
var _1119=parseInt(_1117.substr(1,3),10);
document.theForm.weekly_num.value=""+_1119;
},setupMonthlyFrequency:function(_111a){
var _111b=parseInt(_111a.substr(1,3),10);
var _111c=parseInt(_111a.substr(4,3),10);
var _111d=parseInt(_111a.substr(7,2),10);
document.theForm.freqType[curam.util.FrequencyEditor.MONTHLY_FREQUENCY].checked=true;
if(_111d==0){
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.START_DATE].checked=true;
document.theForm.monthly0_month_interval.value=_111b;
}else{
if(_111d<=31){
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.MONTH_DAY_NUM].checked=true;
document.theForm.monthly1_day_num.value=_111d;
document.theForm.monthly1_month_interval.value=_111b;
}else{
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.MONTH_SEL_DAY].checked=true;
var _111e=dijit.byId("monthly2_select_day_num");
_111e.set("value",_111d);
_111e=dijit.byId("monthly2_select_day");
_111e.set("value",_111c);
document.theForm.monthly2_month_interval.value=_111b;
}
}
},setupBimonthlyFrequency:function(_111f){
var _1120=parseInt(_111f.substr(1,2),10);
var _1121=parseInt(_111f.substr(4,3),10);
var _1122=parseInt(_111f.substr(7,2),10);
document.theForm.freqType[curam.util.FrequencyEditor.BIMONTHLY_FREQUENCY-curam.util.FrequencyEditor.CORRECTOR].checked=true;
if(_1122<=31){
document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked=true;
document.theForm.bimonthly1_day1_num.value=_1122;
document.theForm.bimonthly1_day2_num.value=_1120;
}else{
document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.SEL_DAY].checked=true;
var _1123=dijit.byId("bimonthly2_select_day1_num");
_1123.set("value",_1122);
_1123=dijit.byId("bimonthly2_select_day2_num");
_1123.set("value",_1120);
_1123=dijit.byId("bimonthly2_select_weekday");
_1123.set("value",_1121);
}
},setupYearlyFrequency:function(_1124){
var _1125=parseInt(_1124.substr(1,3),10);
var _1126=parseInt(_1124.substr(4,3),10);
var _1127=parseInt(_1124.substr(7,2),10);
document.theForm.freqType[curam.util.FrequencyEditor.YEARLY_FREQUENCY+curam.util.FrequencyEditor.CORRECTOR].checked=true;
if(_1127<=31){
document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_DAY_NUM].checked=true;
var _1128=dijit.byId("yearly1_select_month");
_1128.set("value",_1125);
document.theForm.yearly1_day_num.value=_1127;
}else{
document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_SEL_DAY].checked=true;
var _1128=dijit.byId("yearly2_select_day_num");
_1128.set("value",_1127);
_1128=dijit.byId("yearly2_select_day");
_1128.set("value",_1126);
_1128=dijit.byId("yearly2_select_month");
_1128.set("value",_1125);
}
},createPatternString:function(){
var _1129=null;
var _112a=false;
if(document.theForm.freqType[0].checked==true){
_112a=curam.util.FrequencyEditor.createDailyPatternString();
}else{
if(document.theForm.freqType[1].checked==true){
_112a=curam.util.FrequencyEditor.createWeeklyPatternString();
}else{
if(document.theForm.freqType[2].checked==true){
_112a=curam.util.FrequencyEditor.createMonthlyPatternString();
}else{
if(document.theForm.freqType[3].checked==true){
_112a=curam.util.FrequencyEditor.createBimonthlyPatternString();
}else{
_112a=curam.util.FrequencyEditor.createYearlyPatternString();
}
}
}
}
if(_112a){
curam.util.FrequencyEditor.disableRowBorder();
return true;
}else{
return false;
}
},createDailyPatternString:function(){
var _112b="0";
if(document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_DAY].checked==true){
var _112c=parseInt(document.theForm.daily_num.value,10);
if(curam.util.FrequencyEditor.validateDailyPattern(_112c)){
_112b+=curam.util.FrequencyEditor.doZeroPadding(_112c,3);
_112b+="000";
}else{
return false;
}
}else{
_112b+="001";
_112b+=curam.util.FrequencyEditor.EVERY_WEEKDAY_MASK;
}
_112b+="00";
document.theForm.patternString.value=_112b;
return true;
},validateDailyPattern:function(_112d){
if(isNaN(_112d)||_112d<1){
alert(errorMsgs.everyDay);
return false;
}
return true;
},createWeeklyPatternString:function(){
var _112e="1";
var _112f=0;
var _1130=parseInt(document.theForm.weekly_num.value,10);
if(curam.util.FrequencyEditor.validateWeeklyPattern(_1130)){
_112e+=curam.util.FrequencyEditor.doZeroPadding(_1130,3);
var _1131=false;
var _1132=document.theForm.weekly_select_mon;
if(_1132.checked==true){
_1131=true;
_112f+=_1132.value-0;
}
_1132=document.theForm.weekly_select_tue;
if(_1132.checked==true){
_1131=true;
_112f+=_1132.value-0;
}
_1132=document.theForm.weekly_select_wed;
if(_1132.checked==true){
_1131=true;
_112f+=_1132.value-0;
}
_1132=document.theForm.weekly_select_thur;
if(_1132.checked==true){
_1131=true;
_112f+=_1132.value-0;
}
_1132=document.theForm.weekly_select_fri;
if(_1132.checked==true){
_1131=true;
_112f+=_1132.value-0;
}
_1132=document.theForm.weekly_select_sat;
if(_1132.checked==true){
_1131=true;
_112f+=_1132.value-0;
}
_1132=document.theForm.weekly_select_sun;
if(_1132.checked==true){
_1131=true;
_112f+=_1132.value-0;
}
if(!_1131){
alert(errorMsgs.noDaySelected);
return false;
}
if(_112f>0){
_112e+=curam.util.FrequencyEditor.doZeroPadding(_112f,3);
}else{
_112e+="000";
}
_112e+="00";
document.theForm.patternString.value=_112e;
return true;
}
return false;
},validateWeeklyPattern:function(_1133){
if(isNaN(_1133)||_1133<1){
alert(errorMsgs.everyWeek);
return false;
}
return true;
},createMonthlyPatternString:function(){
var _1134="2";
if(document.theForm.monthlyFreqType[curam.util.FrequencyEditor.START_DATE].checked==true){
var _1135=parseInt(document.theForm.monthly0_month_interval.value,10);
if(!curam.util.FrequencyEditor.validateMonthlyData(_1135)){
return false;
}
var _1136=0;
_1134+=curam.util.FrequencyEditor.doZeroPadding(_1135,3);
_1134+="000";
_1134+=curam.util.FrequencyEditor.doZeroPadding(_1136,2);
}else{
if(document.theForm.monthlyFreqType[curam.util.FrequencyEditor.MONTH_DAY_NUM].checked==true){
var _1135=parseInt(document.theForm.monthly1_month_interval.value,10);
var _1136=parseInt(document.theForm.monthly1_day_num.value,10);
if(!curam.util.FrequencyEditor.validateMonthlyData(_1135,_1136)){
return false;
}
_1134+=curam.util.FrequencyEditor.doZeroPadding(_1135,3);
_1134+="000";
_1134+=curam.util.FrequencyEditor.doZeroPadding(_1136,2);
}else{
var _1135=parseInt(document.theForm.monthly2_month_interval.value,10);
if(!curam.util.FrequencyEditor.validateMonthlyData(_1135)){
return false;
}
var day=dijit.byId("monthly2_select_day_num").get("value");
var _1137=dijit.byId("monthly2_select_day").get("value");
if(!curam.util.FrequencyEditor.validateDayWeekString(day,_1137,_1134)){
return false;
}
_1134+=curam.util.FrequencyEditor.doZeroPadding(_1135,3);
_1134+=curam.util.FrequencyEditor.doZeroPadding(_1137,3);
_1134+=curam.util.FrequencyEditor.doZeroPadding(day,2);
}
}
document.theForm.patternString.value=_1134;
return true;
},validateMonthlyData:function(_1138,_1139){
if(isNaN(_1138)||_1138<1||_1138>100){
alert(errorMsgs.monthNum);
return false;
}
if(_1139==null){
return true;
}
if(isNaN(_1139)||_1139<1||_1139>28){
alert(errorMsgs.dayNum);
return false;
}
return true;
},validateDayWeekString:function(day,_113a,_113b){
var days=curam.util.FrequencyEditor.allowableDayString;
var _113c=curam.util.FrequencyEditor.allowableDayOfWeekMask;
var _113d=false;
var _113e=false;
for(var i=0;i<days.length;i++){
if(day==days[i]){
_113d=true;
break;
}
}
for(var i=0;i<_113c.length;i++){
if(_113a==_113c[i]){
_113e=true;
break;
}
}
if(_113d&&_113e){
return true;
}else{
if(!_113d){
if(_113b=="2"){
alert(errorMsgs.dayStringForMonthly);
}else{
if(_113b=="3"){
alert(errorMsgs.dayStringForYearly);
}else{
alert(errorMsgs.dayString);
}
}
return false;
}else{
if(!_113e){
if(_113b=="2"){
alert(errorMsgs.dayOfWeekMaskForMonthly);
}else{
if(_113b=="3"){
alert(errorMsgs.dayOfWeekMaskForYearly);
}else{
alert(errorMsgs.dayOfWeekMask);
}
}
return false;
}
}
}
},createBimonthlyPatternString:function(){
var _113f="4";
var _1140;
if(document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked==true){
var _1141=parseInt(document.theForm.bimonthly1_day1_num.value,10);
var _1142=parseInt(document.theForm.bimonthly1_day2_num.value,10);
if(!curam.util.FrequencyEditor.validateBimonthlyData(_1141,_1142,null)){
return false;
}
if(_1141>_1142){
_1140=_1141;
_1141=_1142;
_1142=_1140;
}
_113f+=curam.util.FrequencyEditor.doZeroPadding(_1142,2);
_113f+="0000";
_113f+=curam.util.FrequencyEditor.doZeroPadding(_1141,2);
}else{
var _1143=dijit.byId("bimonthly2_select_day1_num");
var _1144=_1143.get("value");
_1143=dijit.byId("bimonthly2_select_day2_num");
var _1145=_1143.get("value");
_1143=dijit.byId("bimonthly2_select_weekday");
var _1146=_1143.get("value");
if(!curam.util.FrequencyEditor.validateBimonthlyDataString(_1144,_1145,_1146)){
return false;
}
if(_1144>_1145){
_1140=_1144;
_1144=_1145;
_1145=_1140;
}
if(!curam.util.FrequencyEditor.validateBimonthlyData(_1144,_1145,_1146)){
return false;
}
_113f+=curam.util.FrequencyEditor.doZeroPadding(_1145,2);
_113f+="0";
_113f+=curam.util.FrequencyEditor.doZeroPadding(_1146,3);
_113f+=curam.util.FrequencyEditor.doZeroPadding(_1144,2);
}
document.theForm.patternString.value=_113f;
return true;
},validateBimonthlyData:function(first,_1147,_1148){
if(_1148!=null){
if(isNaN(_1148)||_1148<1||_1148>64){
alert(errorMsgs.weekend);
return false;
}
}else{
if(isNaN(first)||first<1||first>28||isNaN(_1147)||_1147<1||_1147>28){
alert(errorMsgs.dayNum);
return false;
}
}
if(first==_1147){
alert(errorMsgs.dayDiff);
return false;
}
return true;
},validateBimonthlyDataString:function(_1149,_114a,_114b){
var _114c=curam.util.FrequencyEditor.allowableFirstDayStringForBimonthly;
var _114d=curam.util.FrequencyEditor.allowableSecondDayStringForBimonthly;
var _114e=curam.util.FrequencyEditor.allowableWeekdayStringForBimonthly;
var _114f=false;
var _1150=false;
var _1151=false;
for(var i=0;i<_114c.length;i++){
if(_1149==_114c[i]){
_114f=true;
break;
}
}
for(var i=0;i<_114d.length;i++){
if(_114a==_114d[i]){
_1150=true;
break;
}
}
for(var i=0;i<_114e.length;i++){
if(_114b==_114e[i]){
_1151=true;
break;
}
}
if(_114f&&_1150&&_1151){
return true;
}else{
if(!_114f){
alert(errorMsgs.firstDayString);
return false;
}else{
if(!_1150){
alert(errorMsgs.secondDayString);
return false;
}else{
if(!_1151){
alert(errorMsgs.weekend);
return false;
}
}
}
}
},createYearlyPatternString:function(){
var _1152="3";
var _1153=null;
if(document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_DAY_NUM].checked==true){
_1153=dijit.byId("yearly1_select_month");
var _1154=_1153.get("value");
_1152+=curam.util.FrequencyEditor.doZeroPadding(_1154,3);
_1152+="000";
if(!curam.util.FrequencyEditor.validateMonthString(_1154)){
return false;
}
var _1155=parseInt(document.theForm.yearly1_day_num.value,10);
if(!curam.util.FrequencyEditor.validateYearlyData(_1155,_1154)){
return false;
}
_1152+=curam.util.FrequencyEditor.doZeroPadding(_1155,2);
}else{
var day=dijit.byId("yearly2_select_day_num").get("value");
var _1156=dijit.byId("yearly2_select_day").get("value");
var month=dijit.byId("yearly2_select_month").get("value");
if(!curam.util.FrequencyEditor.validateDayWeekString(day,_1156,_1152)){
return false;
}
if(!curam.util.FrequencyEditor.validateMonthString(month)){
return false;
}
_1152+=curam.util.FrequencyEditor.doZeroPadding(month,3);
_1152+=curam.util.FrequencyEditor.doZeroPadding(_1156,3);
_1152+=curam.util.FrequencyEditor.doZeroPadding(day,2);
}
document.theForm.patternString.value=_1152;
return true;
},validateYearlyData:function(_1157,_1158){
if(isNaN(_1157)||_1157<1||_1157>curam.util.FrequencyEditor.daysInMonth[_1158-1]){
alert(errorMsgs.dayNumAnd+"  "+curam.util.FrequencyEditor.daysInMonth[_1158-1]);
return false;
}
return true;
},validateMonthString:function(month){
var _1159=curam.util.FrequencyEditor.allowableMonthString;
for(var i=0;i<_1159.length;i++){
if(month==_1159[i]){
return true;
}
}
alert(errorMsgs.monthString);
return false;
},doZeroPadding:function(_115a,_115b){
var _115c=""+_115a;
var _115d=_115b-_115c.length;
for(var i=0;i<_115d;i++){
_115c="0"+_115c;
}
return _115c;
},_setFirstLevelRadioButton:function(_115e){
var _115f=dojo.query("input[name='freqType']",dojo.byId("mainForm"))[_115e];
if(_115f==null){
throw new Error("The radio button for the selected"+" frequency type could not be found!");
}
if(!_115f.checked){
dojo.query("input[type='radio']:checked",dojo.byId("mainForm")).forEach(function(_1160){
_1160.checked=false;
});
if(_115e!=curam.util.FrequencyEditor.WEEKLY_FREQUENCY){
dojo.query("input[type='checkbox']:checked",dojo.byId("mainForm")).forEach(function(_1161){
_1161.checked=false;
});
}
_115f.checked=true;
}
},_setSecondLevelRadioButton:function(_1162){
if(_1162==undefined){
return "undefined";
}
var _1163;
if(_1162.domNode){
_1163=_1162.domNode;
}else{
_1163=_1162;
}
if(_1163.tagName.toLowerCase()=="input"&&dojo.attr(_1163,"type")=="radio"){
_1163.checked=true;
return "radio node clicked";
}
var _1164=cm.getParentByType(_1163,"TD");
if(_1164==null){
throw new Error("Exception: The row contains the node should be found");
}
var _1165=dojo.query("input[type = 'radio']",_1164)[0];
if(_1165==null){
throw new Error("Exception: The radio node should exist");
}else{
_1165.checked=true;
return "text input or codetable clicked";
}
},setSelectedFreqType:function(_1166,_1167){
curam.debug.log("curam.util.FrequencyEditor: "+_1111.getProperty("curam.util.FrequencyEditor.radio"));
curam.util.FrequencyEditor._setFirstLevelRadioButton(_1166);
curam.util.FrequencyEditor._setSecondLevelRadioButton(_1167);
},setDefaultOption:function(_1168){
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_DAY].checked=false;
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_WEEKDAY].checked=false;
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked=false;
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.SEL_DAY].checked=false;
document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked=false;
document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.SEL_DAY].checked=false;
document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_DAY_NUM].checked=false;
document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_SEL_DAY].checked=false;
if(_1168!=curam.util.FrequencyEditor.WEEKLY_FREQUENCY){
document.theForm.weekly_select_mon.checked=false;
document.theForm.weekly_select_tue.checked=false;
document.theForm.weekly_select_wed.checked=false;
document.theForm.weekly_select_thur.checked=false;
document.theForm.weekly_select_fri.checked=false;
document.theForm.weekly_select_sat.checked=false;
document.theForm.weekly_select_sun.checked=false;
}
if(_1168==curam.util.FrequencyEditor.DAILY_FREQUENCY){
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_DAY].checked=true;
}else{
if(_1168==curam.util.FrequencyEditor.WEEKLY_FREQUENCY){
document.theForm.weekly_select_mon.checked=true;
}else{
if(_1168==curam.util.FrequencyEditor.MONTHLY_FREQUENCY){
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked=true;
}else{
if(_1168==curam.util.FrequencyEditor.BIMONTHLY_FREQUENCY){
document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked=true;
}else{
if(_1168==curam.util.FrequencyEditor.YEARLY_FREQUENCY){
document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_DAY_NUM].checked=true;
}
}
}
}
}
},_doPosNumbericInputChecker:function(_1169){
if(_1169==""){
return false;
}
var chars=curam.util.FrequencyEditor.allowableCharsForNumeric;
for(var i=0;i<chars.length;i++){
if(_1169==chars[i]){
return true;
}
}
return false;
},posNumericInputChecker:function(event){
event=dojo.fixEvent(event);
var _116a=event.keyChar;
var _116b=curam.util.FrequencyEditor._doPosNumbericInputChecker(_116a);
if(!_116b){
dojo.stopEvent(event);
}
},prePopulateTextFields:function(_116c){
return function(e){
for(var i=0;i<_116c.length;i++){
if(!_116c[i].value||_116c[i].value==""){
_116c[i].value=1;
}
}
};
},disableRowBorder:function(){
dojo.query("form[name='theForm'] table tr").forEach(function(node){
dojo.addClass(node,"row-no-border");
});
},addInputListener:function(){
dojo.ready(function(){
var _116d=[];
dojo.query("input[type='text']:not(input.dijitReset)").forEach(function(input){
_116d.push(input);
curam.util.connect(input,"onkeypress",curam.util.FrequencyEditor.posNumericInputChecker);
});
curam.util.connect(dojo.byId("mainForm"),"onsubmit",function(event){
curam.util.FrequencyEditor.prePopulateTextFields(_116d);
});
});
},replacePlaceholderWithDomNode:function(){
dojo.query("body#Curam_frequency-editor table tr td.frequency").forEach(function(_116e){
curam.util.FrequencyEditor._parse(_116e);
});
},_parse:function(node){
var _116f=dojo.query("> .node-needs-replacement",node);
var _1170=dojo.query("> span",node)[0];
if(_1170==null||_1170==undefined){
throw new Error("Exception: Some text string is missing for some certain "+"frequency type, please check the 'frequency-editor.jsp' file.");
}
var _1171=_1170.innerHTML;
var _1172=/%[^%]*%/g;
var _1173=_1171.match(_1172);
if(_116f.length==0&&_1173==null){
return "No need to parse";
}else{
if(_116f.length==0&&_1173!=null){
throw new Error("The text string '"+_1171+"' from the 'FrequencyPatternSelector.properties'"+" should not have any placeholder.");
}else{
if(_116f.length!=0&&_1173==null){
throw new Error("The text string '"+_1171+"' from the 'FrequencyPatternSelector.properties'"+" should have some placeholders.");
}
}
}
if(dojo.hasClass(node,"weekly-frequency")){
if(_1173.length!=2){
throw new Error("The text string '"+_1171+"' from the 'FrequencyPatternSelector.properties' "+"has the incorrect number of placeholders.");
}
var _1174=dojo.clone(_116f[0]);
_116f.forEach(dojo.destroy);
dojo.removeClass(_1174,"node-needs-replacement");
var _1175=_1174.className.match(_1172);
var _1176;
for(var i=0;i<_1173.length;i++){
if(_1173[i]!=_1175){
_1176=_1173[i];
break;
}
}
var _1177=_1171.split(_1176);
var _1178=_1177[0];
var _1179=_1177[1];
var _117a;
if(_1178.indexOf(_1175)!=-1){
_117a=true;
_1178=_1178.replace(_1175,"<span class='"+_1175+"'>placeholder</span>");
}else{
_117a=false;
_1179=_1179.replace(_1175,"<span class='"+_1175+"'>placeholder</span>");
}
if(_1179==""){
_1170.innerHTML=_1178;
dojo.place(_1174,dojo.query("span."+_1175,_1170)[0],"replace");
}else{
_1170.innerHTML=_1178;
var _117b=node.parentNode.nextSibling.nextSibling;
var _117c=dojo.create("tr",{"class":"blue"});
var _117d=dojo.create("td",{"class":"bottom"},_117c);
_117d.colSpan="4";
dojo.style(_117d,"paddingLeft","20px");
var _117e=dojo.create("span",{innerHTML:_1179},_117d);
dojo.place(_117c,_117b,"after");
if(_117a){
dojo.place(_1174,dojo.query("span."+_1175,_1170)[0],"replace");
}else{
dojo.place(_1174,dojo.query("span."+_1175,_117e)[0],"replace");
}
dojo.query("td.day",_117b).forEach(function(_117f){
dojo.removeClass(_117f,"bottom");
});
if(_1178==""){
dojo.removeClass(node,"top");
}
dojo.query("th.type",node.parentNode)[0].rowSpan="4";
}
return "Parsed Successfully";
}
if(_116f.length!=_1173.length){
throw new Error("The text string '"+_1171+"' from the 'FrequencyPatternSelector.properties' "+"has the incorrect number of placeholders.");
}
var _1180=dojo.clone(_116f);
_116f.forEach(dojo.destroy);
for(i=0;i<_1173.length;i++){
var _1181=_1173[i];
_1171=_1171.replace(_1181,"<span class='"+_1181+"'>placeholder</span>");
}
_1170.innerHTML=_1171;
_1180.forEach(function(_1182,i){
dojo.removeClass(_1182,"node-needs-replacement");
var _1183=_1182.className.match(_1172);
dojo.place(_1182,dojo.query("span."+_1183,node)[0],"replace");
});
return "Parsed Successfully";
}});
return curam.util.FrequencyEditor;
});
},"curam/charting":function(){
define("curam/charting",["dojo/dom-class","dojo/ready","cm/_base/_dom","curam/define"],function(_1184,ready,dom,_1185){
_1185.singleton("curam.charting",{alignChartWrapper:function(node){
ready(function(){
node=dom.getParentByClass(dojo.byId(node),"cluster");
if(node){
_1184.add(node,"chart-panel");
}
});
}});
return curam.charting;
});
},"url:curam/widget/resources/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:${onClickValue}\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n","url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>","dijit/_FocusMixin":function(){
define("dijit/_FocusMixin",["./focus","./_WidgetBase","dojo/_base/declare","dojo/_base/lang"],function(focus,_1186,_1187,lang){
lang.extend(_1186,{focused:false,onFocus:function(){
},onBlur:function(){
},_onFocus:function(){
this.onFocus();
},_onBlur:function(){
this.onBlur();
}});
return _1187("dijit._FocusMixin",null,{_focusManager:focus});
});
},"dijit/form/ValidationTextBox":function(){
require({cache:{"url:dijit/form/templates/ValidationTextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"}});
define("dijit/form/ValidationTextBox",["dojo/_base/declare","dojo/i18n","./TextBox","../Tooltip","dojo/text!./templates/ValidationTextBox.html","dojo/i18n!./nls/validate"],function(_1188,i18n,_1189,_118a,_118b){
return _1188("dijit.form.ValidationTextBox",_1189,{templateString:_118b,baseClass:"dijitTextBox dijitValidationTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",missingMessage:"$_unset_$",message:"",constraints:{},regExp:".*",regExpGen:function(){
return this.regExp;
},state:"",tooltipPosition:[],_setValueAttr:function(){
this.inherited(arguments);
this.validate(this.focused);
},validator:function(value,_118c){
return (new RegExp("^(?:"+this.regExpGen(_118c)+")"+(this.required?"":"?")+"$")).test(value)&&(!this.required||!this._isEmpty(value))&&(this._isEmpty(value)||this.parse(value,_118c)!==undefined);
},_isValidSubset:function(){
return this.textbox.value.search(this._partialre)==0;
},isValid:function(){
return this.validator(this.textbox.value,this.constraints);
},_isEmpty:function(value){
return (this.trim?/^\s*$/:/^$/).test(value);
},getErrorMessage:function(){
return (this.required&&this._isEmpty(this.textbox.value))?this.missingMessage:this.invalidMessage;
},getPromptMessage:function(){
return this.promptMessage;
},_maskValidSubsetError:true,validate:function(_118d){
var _118e="";
var _118f=this.disabled||this.isValid(_118d);
if(_118f){
this._maskValidSubsetError=true;
}
var _1190=this._isEmpty(this.textbox.value);
var _1191=!_118f&&_118d&&this._isValidSubset();
this._set("state",_118f?"":(((((!this._hasBeenBlurred||_118d)&&_1190)||_1191)&&this._maskValidSubsetError)?"Incomplete":"Error"));
this.focusNode.setAttribute("aria-invalid",_118f?"false":"true");
if(this.state=="Error"){
this._maskValidSubsetError=_118d&&_1191;
_118e=this.getErrorMessage(_118d);
}else{
if(this.state=="Incomplete"){
_118e=this.getPromptMessage(_118d);
this._maskValidSubsetError=!this._hasBeenBlurred||_118d;
}else{
if(_1190){
_118e=this.getPromptMessage(_118d);
}
}
}
this.set("message",_118e);
return _118f;
},displayMessage:function(_1192){
if(_1192&&this.focused){
_118a.show(_1192,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}else{
_118a.hide(this.domNode);
}
},_refreshState:function(){
this.validate(this.focused);
this.inherited(arguments);
},constructor:function(){
this.constraints={};
},_setConstraintsAttr:function(_1193){
if(!_1193.locale&&this.lang){
_1193.locale=this.lang;
}
this._set("constraints",_1193);
this._computePartialRE();
},_computePartialRE:function(){
var p=this.regExpGen(this.constraints);
this.regExp=p;
var _1194="";
if(p!=".*"){
this.regExp.replace(/\\.|\[\]|\[.*?[^\\]{1}\]|\{.*?\}|\(\?[=:!]|./g,function(re){
switch(re.charAt(0)){
case "{":
case "+":
case "?":
case "*":
case "^":
case "$":
case "|":
case "(":
_1194+=re;
break;
case ")":
_1194+="|$)";
break;
default:
_1194+="(?:"+re+"|$)";
break;
}
});
}
try{
"".search(_1194);
}
catch(e){
_1194=this.regExp;
console.warn("RegExp error in "+this.declaredClass+": "+this.regExp);
}
this._partialre="^(?:"+_1194+")$";
},postMixInProperties:function(){
this.inherited(arguments);
this.messages=i18n.getLocalization("dijit.form","validate",this.lang);
if(this.invalidMessage=="$_unset_$"){
this.invalidMessage=this.messages.invalidMessage;
}
if(!this.invalidMessage){
this.invalidMessage=this.promptMessage;
}
if(this.missingMessage=="$_unset_$"){
this.missingMessage=this.messages.missingMessage;
}
if(!this.missingMessage){
this.missingMessage=this.invalidMessage;
}
this._setConstraintsAttr(this.constraints);
},_setDisabledAttr:function(value){
this.inherited(arguments);
this._refreshState();
},_setRequiredAttr:function(value){
this._set("required",value);
this.focusNode.setAttribute("aria-required",value);
this._refreshState();
},_setMessageAttr:function(_1195){
this._set("message",_1195);
this.displayMessage(_1195);
},reset:function(){
this._maskValidSubsetError=true;
this.inherited(arguments);
},_onBlur:function(){
this.displayMessage("");
this.inherited(arguments);
}});
});
},"curam/util/SessionTimeout":function(){
define("curam/util/SessionTimeout",["curam/util","dojo/_base/lang","curam/debug","curam/html","curam/util/UimDialog","curam/util/ResourceBundle"],function(util,lang,debug,html,_1196){
dojo.requireLocalization("curam.application","TimeoutWarning");
var _1197=new curam.util.ResourceBundle("TimeoutWarning");
curam.define.singleton("curam.util.SessionTimeout",{logoutPageID:"",minutes:0,seconds:0,userMessageNode:null,userMessageNodeID:"userMessage",displayTimerNodeID:"displayTimer",stopTimer:false,updatedUserMessage:null,dismissModalBtnTxt:null,displayButtonCssNames:".initially-hidden-widget.btn-id-1",doLogout:true,timeForDialogToAppear:0,sessTimeoutWarningJSPXDialog:"external-session-timeout-warning-dialog.jspx",sessTimeoutJSPXDialog:"external-session-timeout-dialog.jspx",bufferingPeriod:null,checkSessionExpired:function(width,_1198,_1199,_119a){
this.width=width;
this.height=_1198;
this.timeoutPeriod=_1199;
this.stopChecking=false;
this.interval=10000;
this.bufferingPeriod=_119a==undefined?30000:_119a*1000;
this.executeChecking=setInterval(function(){
curam.util.SessionTimeout._executeSessionExpiredCheck();
},this.interval);
},_executeSessionExpiredCheck:function(){
var _119b=curam.util.getCookie("sessionExpiry");
if(this.currSessionExpCookie){
if(this.currSessionExpCookie!=_119b){
this.timeForDialogToAppear=-10000;
this.validCookie=this._sessionExpiryCookieIsAsExpected(_119b);
}
}else{
this.validCookie=this._sessionExpiryCookieIsAsExpected(_119b);
this._ammendTimeoutPeriodForMisconfiguration(this.validCookie);
}
this.currSessionExpCookie=_119b;
this.timeForDialogToAppear=this.timeForDialogToAppear+this.interval;
if(this.validCookie){
this.sessionExpiry=Math.abs(this.validCookie[0]);
this.serverTime=Math.abs(this.validCookie[1]);
var _119c=this.serverTime+this.timeForDialogToAppear+this.bufferingPeriod;
var _119d=this.sessionExpiry-(this.timeoutPeriod*1000);
this.totalExpirySeverTime=_119d;
this.totalCurrServerTime=_119c;
if(_119c>=_119d&&this.stopChecking!=true){
this.stopChecking=true;
if(window.top.openModal!=undefined){
window.top.openModal(this.sessTimeoutWarningJSPXDialog,{width:this.width,height:this.height});
}
clearInterval(this.executeChecking);
}
}
},_sessionExpiryCookieIsAsExpected:function(_119e){
var _119f=true;
if(_119e!=null){
var _11a0=_119e.split("-",2);
if(_11a0&&_11a0.length==2){
for(token in _11a0){
var _11a1=Math.abs(token);
if(isNaN(_11a1)){
_119f=false;
}
}
if(_119f==true){
return _11a0;
}
}
}
},_ammendTimeoutPeriodForMisconfiguration:function(_11a2){
if(_11a2){
var _11a3=Math.abs(this.validCookie[0]);
var _11a4=Math.abs(this.validCookie[1]);
var _11a5=(_11a3-(_11a4+this.interval+this.bufferingPeriod))/1000;
_11a5=_11a5<=0?0:_11a5;
var _11a6=this.getTimeoutWarningConfig();
if(_11a6){
var _11a7=_11a6.timeout;
_11a7=_11a7<=0?0:_11a7;
if(_11a7>=_11a5){
this.getTimeoutWarningConfig("timeout",_11a5);
}
}
}
},getTimeoutWarningConfig:function(_11a8,_11a9){
if(window.top.getAppConfig){
var _11aa=window.top.getAppConfig();
var _11ab=_11aa.timeoutWarning;
if(_11ab&&_11a8&&_11a9){
_11ab[_11a8]=_11a9;
}
return _11ab;
}
},displayTimerAndLogout:function(_11ac,_11ad,_11ae,_11af,_11b0,_11b1){
this.executeTimer=setInterval(function(){
curam.util.SessionTimeout.timer();
},1000);
this.minutes=~~(_11ad/60);
this.seconds=_11ad%60;
this.timerNode=dojo.byId(this.displayTimerNodeID);
this.userMessageNode=dojo.byId(this.userMessageNodeID);
this.logoutPageID=_11ac;
this.updatedUserMessage=_11ae;
this.dismissModalBtnTxt=_11af;
this.expiredTitleText=_11b0;
this.titleNode=window.top.dojo.byId(_11b1);
},timer:function(){
if(this.stopTimer!=true){
var _11b2="";
if(this.seconds<10){
_11b2=this.minutes+" : 0"+this.seconds;
}else{
_11b2=this.minutes+" : "+this.seconds;
}
this.timerNode.innerHTML="&#x202A;"+_11b2+"&#x202C;";
if(this.seconds==0){
this.seconds=59;
this.minutes=this.minutes-1;
}else{
this.seconds=this.seconds-1;
}
if(this.minutes==0&&this.seconds==0){
this.quitTimeoutWarningDialog();
this.stopTimer();
}
if(this.seconds==0){
this.minutes=this.minutes-1;
this.seconds=59;
}
}
},stopTimer:function(){
clearInterval(this.executeTimer);
},quitTimeoutWarningDialog:function(close){
var _11b3={pageID:this.logoutPageID};
window.top.displayContent(_11b3);
},dismissTimeoutDialog:function(){
window.top.location=jsBaseURL+"/"+"application.do";
},continueUsingApp:function(){
debug.log(_1197.getProperty("continueApp"));
this.stopTimer();
},dismissTimeoutWarningModal:function(){
debug.log(_1197.getProperty("dismissTimeoutModal"));
},displayUserMsgAsParagraphs:function(msg,_11b4){
var _11b5;
if(_11b4){
_11b5=_11b4;
}else{
_11b5=dojo.byId(this.userMessageNodeID);
}
var _11b6=curam.html.splitWithTag(msg,"\\n","p");
_11b5.innerHTML=_11b6;
this.userMessageNode=_11b5;
}});
return curam.util.SessionTimeout;
});
},"url:dijit/layout/templates/ScrollingTabController.html":"<div class=\"dijitTabListContainer-${tabPosition} tabStrip-disabled dijitLayoutContainer\"><!-- CURAM-FIX: removed style=\"visibility:hidden, dd the tabStrip-disabled class by default.\" -->\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerMenuButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_menuBtn\"\r\n\t\t\tdata-dojo-props=\"containerId: '${containerId}', iconClass: 'dijitTabStripMenuIcon',\r\n\t\t\t\t\tdropDownPosition: ['below-alt', 'above-alt']\"\r\n\t\t\tdata-dojo-attach-point=\"_menuBtn\" showLabel=\"false\" title=\"\">&#9660;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_leftBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideLeftIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_leftBtn\" data-dojo-attach-event=\"onClick: doSlideLeft\">&#9664;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_rightBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideRightIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_rightBtn\" data-dojo-attach-event=\"onClick: doSlideRight\">&#9654;</div>\r\n\t<div class='dijitTabListWrapper dijitTabContainerTopNone dijitAlignClient' data-dojo-attach-point='tablistWrapper'>\r\n\t\t<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'\r\n\t\t\t\tdata-dojo-attach-point='containerNode' class='nowrapTabStrip dijitTabContainerTop-tabs'></div>\r\n\t</div>\r\n</div>\r\n","curam/codetable-hierarchy":function(){
define("curam/codetable-hierarchy",["curam/util/Request","dojo/data/ItemFileReadStore","curam/widget/FilteringSelect","curam/util/ResourceBundle"],function(_11b7){
dojo.requireLocalization("curam.application","Debug");
var _11b8=new curam.util.ResourceBundle("Debug");
var _11b9={initLists:function(_11ba,_11bb,_11bc){
this.noOptionCode=_11ba;
this.noOptionDesc=_11bb;
this.ddInfo=_11bc;
this.lists=function(){
var next=null;
for(var i=_11bc.length-1;i>=0;i--){
next=new _11b9.DropDown(dijit.byId(_11bc[i].id),_11bc[i].ctName,_11ba,_11bb,next);
}
};
dojo.addOnLoad(this.lists);
},DropDown:function(_11bd,_11be,_11bf,_11c0,next){
this.node=_11bd.domNode;
this.widgetNode=_11bd;
this.codeTableName=_11be;
this.noOptionCode=_11bf;
this.noOptionDesc=_11c0;
this.next=next;
var _11c1=this;
this.populate=function(){
if(!_11c1.widgetNode.get("value")){
_11c1.resetNext(_11c1);
}else{
if(_11c1.next!=null){
_11c1.resetNext(_11c1);
if(_11c1.widgetNode.get("value")==0){
return;
}
_11b7.post({url:"../servlet/JSONServlet",handleAs:"text",preventCache:true,load:function(_11c2,evt){
if(_11c2.length<3){
curam.debug.log(_11b8.getProperty("curam.codetable-hierarchy.msg.1")+_11c1.codeTableName+_11b8.getProperty("curam.codetable-hierarchy.msg.2")+_11c1.widgetNode.get("value"));
return;
}
var _11c3=dojo.fromJson(_11c2);
_11c3.unshift({"value":_11c1.noOptionCode,"name":""});
var _11c4=dijit.byId(_11c1.next.widgetNode.id);
var _11c5=new dojo.data.ItemFileReadStore({data:{label:"name",identifier:"value",items:_11c3}});
_11c5.fetch({onComplete:function(item,_11c6){
_11c4.set("store",_11c5);
_11c4.set("value",_11c1.noOptionCode);
}});
},error:function(error){
curam.debug.log(error);
},content:{"content":dojo.toJson({operation:"getCodeTableSubsetForFilteringSelect",args:[_11c1.codeTableName,_11c1.widgetNode.get("value")]})}});
}
}
};
this.resetNext=function(_11c7){
while(_11c7.next!=null){
var _11c8=[];
_11c8.unshift({"value":_11c7.noOptionCode,"name":_11c7.noOptionDesc});
var _11c9=dijit.byId(_11c7.next.widgetNode.id);
var _11ca=new dojo.data.ItemFileReadStore({data:{label:"name",identifier:"value",items:_11c8}});
_11ca.fetch({onComplete:function(item,_11cb){
_11c9.set("store",_11ca);
_11c9.set("displayedValue",_11c7.noOptionDesc);
}});
_11c7=_11c7.next;
}
};
if(next!=null){
dojo.connect(this.widgetNode,"onChange",this.populate);
}
}};
dojo.global.CodeTableHierarchy=_11b9;
return _11b9;
});
},"curam/util/ui/refresh/TabRefreshController":function(){
define("curam/util/ui/refresh/TabRefreshController",["curam/debug","curam/util/ui/refresh/RefreshEvent","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _11cc=new curam.util.ResourceBundle("Debug");
var _11cd=dojo.declare("curam.util.ui.refresh.TabRefreshController",null,{EVENT_REFRESH_MENU:"/curam/refresh/menu",EVENT_REFRESH_NAVIGATION:"/curam/refresh/navigation",EVENT_REFRESH_CONTEXT:"/curam/refresh/context",EVENT_REFRESH_MAIN:"/curam/refresh/main-content",_tabWidgetId:null,_configOnSubmit:null,_configOnLoad:null,_handler:null,_lastSubmitted:null,_currentlyRefreshing:null,constructor:function(_11ce,_11cf){
this._configOnSubmit={};
this._configOnLoad={};
if(!_11cf){
return;
}
this._tabWidgetId=_11ce;
dojo.forEach(_11cf.config,dojo.hitch(this,function(item){
this._configOnSubmit[item.page]=item.onsubmit;
this._configOnLoad[item.page]=item.onload;
}));
},pageSubmitted:function(_11d0,_11d1){
new curam.util.ui.refresh.RefreshEvent(curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONSUBMIT,_11d1);
curam.debug.log("curam.util.ui.refresh.TabRefreshController: "+_11cc.getProperty("curam.util.ui.refresh.TabRefreshController.submit",[_11d0,_11d1]));
if(this._configOnSubmit[_11d0]){
this._lastSubmitted=_11d0;
curam.debug.log("curam.util.ui.refresh.TabRefreshController: "+_11cc.getProperty("curam.util.ui.refresh.TabRefreshController"+"submit.notify"));
}
},pageLoaded:function(_11d2,_11d3){
var event=new curam.util.ui.refresh.RefreshEvent(curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONLOAD,_11d3);
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_11cc.getProperty("curam.util.ui.refresh.TabRefreshController.load",[_11d2,_11d3]));
if(this._currentlyRefreshing&&this._currentlyRefreshing.equals(event)){
this._currentlyRefreshing=null;
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_11cc.getProperty("curam.util.ui.refresh.TabRefreshController"+"refresh"));
return;
}
var _11d4={};
if(_11d3==event.SOURCE_CONTEXT_MAIN&&this._configOnLoad[_11d2]){
_11d4=this._configOnLoad[_11d2];
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_11cc.getProperty("curam.util.ui.refresh.TabRefreshController"+".load.config"));
}
if(this._lastSubmitted){
var cfg=this._configOnSubmit[this._lastSubmitted];
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_11cc.getProperty("curam.util.ui.refresh.TabRefreshController"+".submit.config",[this._lastSubmitted]));
_11d4.details=_11d4.details||cfg.details;
_11d4.menubar=_11d4.menubar||cfg.menubar;
_11d4.navigation=_11d4.navigation||cfg.navigation;
_11d4.mainContent=_11d4.mainContent||cfg.mainContent;
this._lastSubmitted=null;
}
this._fireRefreshEvents(_11d4);
},_fireRefreshEvents:function(cfg){
var _11d5=[];
if(cfg.details){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_11cc.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.context"));
_11d5.push(this.EVENT_REFRESH_CONTEXT+"/"+this._tabWidgetId);
}
if(cfg.menubar){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_11cc.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.menu"));
_11d5.push(this.EVENT_REFRESH_MENU+"/"+this._tabWidgetId);
}
if(cfg.navigation){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_11cc.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.nav"));
_11d5.push(this.EVENT_REFRESH_NAVIGATION+"/"+this._tabWidgetId);
}
if(cfg.mainContent){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_11cc.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.main"));
this._currentlyRefreshing=new curam.util.ui.refresh.RefreshEvent(curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONLOAD,curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN,null);
_11d5.push(this.EVENT_REFRESH_MAIN+"/"+this._tabWidgetId);
}
if(_11d5.length>0){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_11cc.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.log",[_11d5.length,_11d5]));
this._handler(_11d5);
}
},setRefreshHandler:function(_11d6){
this._handler=_11d6;
},destroy:function(){
for(prop in this._configOnSubmit){
if(this._configOnSubmit.hasOwnProperty(prop)){
delete this._configOnSubmit[prop];
}
}
for(prop in this._configOnLoad){
if(this._configOnLoad.hasOwnProperty(prop)){
delete this._configOnLoad[prop];
}
}
this._configOnSubmit={};
this._configOnLoad={};
this._handler=null;
this._lastSubmitted=null;
this._currentlyRefreshing=null;
}});
return _11cd;
});
},"dojo/_base/url":function(){
define("dojo/_base/url",["./kernel"],function(dojo){
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$"),_11d7=function(){
var n=null,_11d8=arguments,uri=[_11d8[0]];
for(var i=1;i<_11d8.length;i++){
if(!_11d8[i]){
continue;
}
var _11d9=new _11d7(_11d8[i]+""),_11da=new _11d7(uri[0]+"");
if(_11d9.path==""&&!_11d9.scheme&&!_11d9.authority&&!_11d9.query){
if(_11d9.fragment!=n){
_11da.fragment=_11d9.fragment;
}
_11d9=_11da;
}else{
if(!_11d9.scheme){
_11d9.scheme=_11da.scheme;
if(!_11d9.authority){
_11d9.authority=_11da.authority;
if(_11d9.path.charAt(0)!="/"){
var path=_11da.path.substring(0,_11da.path.lastIndexOf("/")+1)+_11d9.path;
var segs=path.split("/");
for(var j=0;j<segs.length;j++){
if(segs[j]=="."){
if(j==segs.length-1){
segs[j]="";
}else{
segs.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&segs[0]=="")&&segs[j]==".."&&segs[j-1]!=".."){
if(j==(segs.length-1)){
segs.splice(j,1);
segs[j-1]="";
}else{
segs.splice(j-1,2);
j-=2;
}
}
}
}
_11d9.path=segs.join("/");
}
}
}
}
uri=[];
if(_11d9.scheme){
uri.push(_11d9.scheme,":");
}
if(_11d9.authority){
uri.push("//",_11d9.authority);
}
uri.push(_11d9.path);
if(_11d9.query){
uri.push("?",_11d9.query);
}
if(_11d9.fragment){
uri.push("#",_11d9.fragment);
}
}
this.uri=uri.join("");
var r=this.uri.match(ore);
this.scheme=r[2]||(r[1]?"":n);
this.authority=r[4]||(r[3]?"":n);
this.path=r[5];
this.query=r[7]||(r[6]?"":n);
this.fragment=r[9]||(r[8]?"":n);
if(this.authority!=n){
r=this.authority.match(ire);
this.user=r[3]||n;
this.password=r[4]||n;
this.host=r[6]||r[7];
this.port=r[9]||n;
}
};
_11d7.prototype.toString=function(){
return this.uri;
};
return dojo._Url=_11d7;
});
},"dijit/form/_ComboBoxMenuMixin":function(){
define("dijit/form/_ComboBoxMenuMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/i18n","dojo/_base/window","dojo/i18n!./nls/ComboBox"],function(array,_11db,_11dc,i18n,win){
return _11db("dijit.form._ComboBoxMenuMixin",null,{_messages:null,postMixInProperties:function(){
this.inherited(arguments);
this._messages=i18n.getLocalization("dijit.form","ComboBox",this.lang);
},buildRendering:function(){
this.inherited(arguments);
this.previousButton.innerHTML=this._messages["previousMessage"];
this.nextButton.innerHTML=this._messages["nextMessage"];
},_setValueAttr:function(value){
this.value=value;
this.onChange(value);
},onClick:function(node){
if(node==this.previousButton){
this._setSelectedAttr(null);
this.onPage(-1);
}else{
if(node==this.nextButton){
this._setSelectedAttr(null);
this.onPage(1);
}else{
this.onChange(node);
}
}
},onChange:function(){
},onPage:function(){
},onClose:function(){
this._setSelectedAttr(null);
},_createOption:function(item,_11dd){
var _11de=this._createMenuItem();
var _11df=_11dd(item);
if(_11df.html){
_11de.innerHTML=_11df.label;
}else{
_11de.appendChild(win.doc.createTextNode(_11df.label));
}
if(_11de.innerHTML==""){
_11de.innerHTML="&#160;";
}
this.applyTextDir(_11de,(_11de.innerText||_11de.textContent||""));
_11de.item=item;
return _11de;
},createOptions:function(_11e0,_11e1,_11e2){
this.items=_11e0;
this.previousButton.style.display=(_11e1.start==0)?"none":"";
_11dc.set(this.previousButton,"id",this.id+"_prev");
array.forEach(_11e0,function(item,i){
var _11e3=this._createOption(item,_11e2);
_11e3.setAttribute("item",i);
_11dc.set(_11e3,"id",this.id+i);
this.nextButton.parentNode.insertBefore(_11e3,this.nextButton);
},this);
var _11e4=false;
if(_11e0.total&&!_11e0.total.then&&_11e0.total!=-1){
if((_11e1.start+_11e1.count)<_11e0.total){
_11e4=true;
}else{
if((_11e1.start+_11e1.count)>_11e0.total&&_11e1.count==_11e0.length){
_11e4=true;
}
}
}else{
if(_11e1.count==_11e0.length){
_11e4=true;
}
}
this.nextButton.style.display=_11e4?"":"none";
_11dc.set(this.nextButton,"id",this.id+"_next");
},clearResultList:function(){
var _11e5=this.containerNode;
while(_11e5.childNodes.length>2){
_11e5.removeChild(_11e5.childNodes[_11e5.childNodes.length-2]);
}
this._setSelectedAttr(null);
},highlightFirstOption:function(){
this.selectFirstNode();
},highlightLastOption:function(){
this.selectLastNode();
},selectFirstNode:function(){
this.inherited(arguments);
if(this.getHighlightedOption()==this.previousButton){
this.selectNextNode();
}
},selectLastNode:function(){
this.inherited(arguments);
if(this.getHighlightedOption()==this.nextButton){
this.selectPreviousNode();
}
},getHighlightedOption:function(){
return this._getSelectedAttr();
}});
});
},"dijit/Tree":function(){
require({cache:{"url:dijit/templates/TreeNode.html":"<div class=\"dijitTreeNode\" role=\"presentation\"\n\t><div data-dojo-attach-point=\"rowNode\" class=\"dijitTreeRow\" role=\"presentation\" data-dojo-attach-event=\"onmouseenter:_onMouseEnter, onmouseleave:_onMouseLeave, onclick:_onClick, ondblclick:_onDblClick\"\n\t\t><img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"expandoNode\" class=\"dijitTreeExpando\" role=\"presentation\"\n\t\t/><span data-dojo-attach-point=\"expandoNodeText\" class=\"dijitExpandoText\" role=\"presentation\"\n\t\t></span\n\t\t><span data-dojo-attach-point=\"contentNode\"\n\t\t\tclass=\"dijitTreeContent\" role=\"presentation\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"iconNode\" class=\"dijitIcon dijitTreeIcon\" role=\"presentation\"\n\t\t\t/><span data-dojo-attach-point=\"labelNode\" class=\"dijitTreeLabel\" role=\"treeitem\" tabindex=\"-1\" aria-selected=\"false\" data-dojo-attach-event=\"onfocus:_onLabelFocus\"></span>\n\t\t</span\n\t></div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitTreeContainer\" role=\"presentation\" style=\"display: none;\"></div>\n</div>\n","url:dijit/templates/Tree.html":"<div class=\"dijitTree dijitTreeContainer\" role=\"tree\"\n\tdata-dojo-attach-event=\"onkeypress:_onKeyPress\">\n\t<div class=\"dijitInline dijitTreeIndent\" style=\"position: absolute; top: -9999px\" data-dojo-attach-point=\"indentDetector\"></div>\n</div>\n"}});
define("dijit/Tree",["dojo/_base/array","dojo/_base/connect","dojo/cookie","dojo/_base/declare","dojo/_base/Deferred","dojo/DeferredList","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/fx","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/topic","./focus","./registry","./_base/manager","./_Widget","./_TemplatedMixin","./_Container","./_Contained","./_CssStateMixin","dojo/text!./templates/TreeNode.html","dojo/text!./templates/Tree.html","./tree/TreeStoreModel","./tree/ForestStoreModel","./tree/_dndSelector"],function(array,_11e6,_11e7,_11e8,_11e9,_11ea,dom,_11eb,_11ec,_11ed,event,_11ee,_11ef,keys,lang,topic,focus,_11f0,_11f1,_11f2,_11f3,_11f4,_11f5,_11f6,_11f7,_11f8,_11f9,_11fa,_11fb){
var _11fc=_11e8("dijit._TreeNode",[_11f2,_11f3,_11f4,_11f5,_11f6],{item:null,isTreeNode:true,label:"",_setLabelAttr:{node:"labelNode",type:"innerText"},isExpandable:null,isExpanded:false,state:"UNCHECKED",templateString:_11f7,baseClass:"dijitTreeNode",cssStateNodes:{rowNode:"dijitTreeRow",labelNode:"dijitTreeLabel"},_setTooltipAttr:{node:"rowNode",type:"attribute",attribute:"title"},buildRendering:function(){
this.inherited(arguments);
this._setExpando();
this._updateItemClasses(this.item);
if(this.isExpandable){
this.labelNode.setAttribute("aria-expanded",this.isExpanded);
}
this.setSelected(false);
},_setIndentAttr:function(_11fd){
var _11fe=(Math.max(_11fd,0)*this.tree._nodePixelIndent)+"px";
_11ed.set(this.domNode,"backgroundPosition",_11fe+" 0px");
_11ed.set(this.rowNode,this.isLeftToRight()?"paddingLeft":"paddingRight",_11fe);
array.forEach(this.getChildren(),function(child){
child.set("indent",_11fd+1);
});
this._set("indent",_11fd);
},markProcessing:function(){
this.state="LOADING";
this._setExpando(true);
},unmarkProcessing:function(){
this._setExpando(false);
},_updateItemClasses:function(item){
var tree=this.tree,model=tree.model;
if(tree._v10Compat&&item===model.root){
item=null;
}
this._applyClassAndStyle(item,"icon","Icon");
this._applyClassAndStyle(item,"label","Label");
this._applyClassAndStyle(item,"row","Row");
},_applyClassAndStyle:function(item,lower,upper){
var _11ff="_"+lower+"Class";
var _1200=lower+"Node";
var _1201=this[_11ff];
this[_11ff]=this.tree["get"+upper+"Class"](item,this.isExpanded);
_11eb.replace(this[_1200],this[_11ff]||"",_1201||"");
_11ed.set(this[_1200],this.tree["get"+upper+"Style"](item,this.isExpanded)||{});
},_updateLayout:function(){
var _1202=this.getParent();
if(!_1202||!_1202.rowNode||_1202.rowNode.style.display=="none"){
_11eb.add(this.domNode,"dijitTreeIsRoot");
}else{
_11eb.toggle(this.domNode,"dijitTreeIsLast",!this.getNextSibling());
}
},_setExpando:function(_1203){
var _1204=["dijitTreeExpandoLoading","dijitTreeExpandoOpened","dijitTreeExpandoClosed","dijitTreeExpandoLeaf"],_1205=["*","-","+","*"],idx=_1203?0:(this.isExpandable?(this.isExpanded?1:2):3);
_11eb.replace(this.expandoNode,_1204[idx],_1204);
this.expandoNodeText.innerHTML=_1205[idx];
},expand:function(){
if(this._expandDeferred){
return this._expandDeferred;
}
this._wipeOut&&this._wipeOut.stop();
this.isExpanded=true;
this.labelNode.setAttribute("aria-expanded","true");
if(this.tree.showRoot||this!==this.tree.rootNode){
this.containerNode.setAttribute("role","group");
}
_11eb.add(this.contentNode,"dijitTreeContentExpanded");
this._setExpando();
this._updateItemClasses(this.item);
if(this==this.tree.rootNode&&this.tree.showRoot){
this.tree.domNode.setAttribute("aria-expanded","true");
}
var def,_1206=_11ee.wipeIn({node:this.containerNode,duration:_11f1.defaultDuration,onEnd:function(){
def.callback(true);
}});
def=(this._expandDeferred=new _11e9(function(){
_1206.stop();
}));
_1206.play();
return def;
},collapse:function(){
if(!this.isExpanded){
return;
}
if(this._expandDeferred){
this._expandDeferred.cancel();
delete this._expandDeferred;
}
this.isExpanded=false;
this.labelNode.setAttribute("aria-expanded","false");
if(this==this.tree.rootNode&&this.tree.showRoot){
this.tree.domNode.setAttribute("aria-expanded","false");
}
_11eb.remove(this.contentNode,"dijitTreeContentExpanded");
this._setExpando();
this._updateItemClasses(this.item);
if(!this._wipeOut){
this._wipeOut=_11ee.wipeOut({node:this.containerNode,duration:_11f1.defaultDuration});
}
this._wipeOut.play();
},indent:0,setChildItems:function(items){
var tree=this.tree,model=tree.model,defs=[];
array.forEach(this.getChildren(),function(child){
_11f4.prototype.removeChild.call(this,child);
},this);
this.state="LOADED";
if(items&&items.length>0){
this.isExpandable=true;
array.forEach(items,function(item){
var id=model.getIdentity(item),_1207=tree._itemNodesMap[id],node;
if(_1207){
for(var i=0;i<_1207.length;i++){
if(_1207[i]&&!_1207[i].getParent()){
node=_1207[i];
node.set("indent",this.indent+1);
break;
}
}
}
if(!node){
node=this.tree._createTreeNode({item:item,tree:tree,isExpandable:model.mayHaveChildren(item),label:tree.getLabel(item),tooltip:tree.getTooltip(item),dir:tree.dir,lang:tree.lang,textDir:tree.textDir,indent:this.indent+1});
if(_1207){
_1207.push(node);
}else{
tree._itemNodesMap[id]=[node];
}
}
this.addChild(node);
if(this.tree.autoExpand||this.tree._state(node)){
defs.push(tree._expandNode(node));
}
},this);
array.forEach(this.getChildren(),function(child){
child._updateLayout();
});
}else{
this.isExpandable=false;
}
if(this._setExpando){
this._setExpando(false);
}
this._updateItemClasses(this.item);
if(this==tree.rootNode){
var fc=this.tree.showRoot?this:this.getChildren()[0];
if(fc){
fc.setFocusable(true);
tree.lastFocused=fc;
}else{
tree.domNode.setAttribute("tabIndex","0");
}
}
return new _11ea(defs);
},getTreePath:function(){
var node=this;
var path=[];
while(node&&node!==this.tree.rootNode){
path.unshift(node.item);
node=node.getParent();
}
path.unshift(this.tree.rootNode.item);
return path;
},getIdentity:function(){
return this.tree.model.getIdentity(this.item);
},removeChild:function(node){
this.inherited(arguments);
var _1208=this.getChildren();
if(_1208.length==0){
this.isExpandable=false;
this.collapse();
}
array.forEach(_1208,function(child){
child._updateLayout();
});
},makeExpandable:function(){
this.isExpandable=true;
this._setExpando(false);
},_onLabelFocus:function(){
this.tree._onNodeFocus(this);
},setSelected:function(_1209){
this.labelNode.setAttribute("aria-selected",_1209);
_11eb.toggle(this.rowNode,"dijitTreeRowSelected",_1209);
},setFocusable:function(_120a){
this.labelNode.setAttribute("tabIndex",_120a?"0":"-1");
},_onClick:function(evt){
this.tree._onClick(this,evt);
},_onDblClick:function(evt){
this.tree._onDblClick(this,evt);
},_onMouseEnter:function(evt){
this.tree._onNodeMouseEnter(this,evt);
},_onMouseLeave:function(evt){
this.tree._onNodeMouseLeave(this,evt);
},_setTextDirAttr:function(_120b){
if(_120b&&((this.textDir!=_120b)||!this._created)){
this._set("textDir",_120b);
this.applyTextDir(this.labelNode,this.labelNode.innerText||this.labelNode.textContent||"");
array.forEach(this.getChildren(),function(_120c){
_120c.set("textDir",_120b);
},this);
}
}});
var Tree=_11e8("dijit.Tree",[_11f2,_11f3],{store:null,model:null,query:null,label:"",showRoot:true,childrenAttr:["children"],paths:[],path:[],selectedItems:null,selectedItem:null,openOnClick:false,openOnDblClick:false,templateString:_11f8,persist:true,autoExpand:false,dndController:_11fb,dndParams:["onDndDrop","itemCreator","onDndCancel","checkAcceptance","checkItemAcceptance","dragThreshold","betweenThreshold"],onDndDrop:null,itemCreator:null,onDndCancel:null,checkAcceptance:null,checkItemAcceptance:null,dragThreshold:5,betweenThreshold:0,_nodePixelIndent:19,_publish:function(_120d,_120e){
topic.publish(this.id,lang.mixin({tree:this,event:_120d},_120e||{}));
},postMixInProperties:function(){
this.tree=this;
if(this.autoExpand){
this.persist=false;
}
this._itemNodesMap={};
if(!this.cookieName&&this.id){
this.cookieName=this.id+"SaveStateCookie";
}
this._loadDeferred=new _11e9();
this.inherited(arguments);
},postCreate:function(){
this._initState();
if(!this.model){
this._store2model();
}
this.connect(this.model,"onChange","_onItemChange");
this.connect(this.model,"onChildrenChange","_onItemChildrenChange");
this.connect(this.model,"onDelete","_onItemDelete");
this.inherited(arguments);
if(this.dndController){
if(lang.isString(this.dndController)){
this.dndController=lang.getObject(this.dndController);
}
var _120f={};
for(var i=0;i<this.dndParams.length;i++){
if(this[this.dndParams[i]]){
_120f[this.dndParams[i]]=this[this.dndParams[i]];
}
}
this.dndController=new this.dndController(this,_120f);
}
this._load();
},_store2model:function(){
this._v10Compat=true;
_11ef.deprecated("Tree: from version 2.0, should specify a model object rather than a store/query");
var _1210={id:this.id+"_ForestStoreModel",store:this.store,query:this.query,childrenAttrs:this.childrenAttr};
if(this.params.mayHaveChildren){
_1210.mayHaveChildren=lang.hitch(this,"mayHaveChildren");
}
if(this.params.getItemChildren){
_1210.getChildren=lang.hitch(this,function(item,_1211,_1212){
this.getItemChildren((this._v10Compat&&item===this.model.root)?null:item,_1211,_1212);
});
}
this.model=new _11fa(_1210);
this.showRoot=Boolean(this.label);
},onLoad:function(){
},_load:function(){
this.model.getRoot(lang.hitch(this,function(item){
var rn=(this.rootNode=this.tree._createTreeNode({item:item,tree:this,isExpandable:true,label:this.label||this.getLabel(item),textDir:this.textDir,indent:this.showRoot?0:-1}));
if(!this.showRoot){
rn.rowNode.style.display="none";
this.domNode.setAttribute("role","presentation");
this.domNode.removeAttribute("aria-expanded");
this.domNode.removeAttribute("aria-multiselectable");
rn.labelNode.setAttribute("role","presentation");
rn.containerNode.setAttribute("role","tree");
rn.containerNode.setAttribute("aria-expanded","true");
rn.containerNode.setAttribute("aria-multiselectable",!this.dndController.singular);
}else{
this.domNode.setAttribute("aria-multiselectable",!this.dndController.singular);
}
this.domNode.appendChild(rn.domNode);
var _1213=this.model.getIdentity(item);
if(this._itemNodesMap[_1213]){
this._itemNodesMap[_1213].push(rn);
}else{
this._itemNodesMap[_1213]=[rn];
}
rn._updateLayout();
this._expandNode(rn).addCallback(lang.hitch(this,function(){
this._loadDeferred.callback(true);
this.onLoad();
}));
}),function(err){
console.error(this,": error loading root: ",err);
});
},getNodesByItem:function(item){
if(!item){
return [];
}
var _1214=lang.isString(item)?item:this.model.getIdentity(item);
return [].concat(this._itemNodesMap[_1214]);
},_setSelectedItemAttr:function(item){
this.set("selectedItems",[item]);
},_setSelectedItemsAttr:function(items){
var tree=this;
this._loadDeferred.addCallback(lang.hitch(this,function(){
var _1215=array.map(items,function(item){
return (!item||lang.isString(item))?item:tree.model.getIdentity(item);
});
var nodes=[];
array.forEach(_1215,function(id){
nodes=nodes.concat(tree._itemNodesMap[id]||[]);
});
this.set("selectedNodes",nodes);
}));
},_setPathAttr:function(path){
if(path.length){
return this.set("paths",[path]);
}else{
return this.set("paths",[]);
}
},_setPathsAttr:function(paths){
var tree=this;
return new _11ea(array.map(paths,function(path){
var d=new _11e9();
path=array.map(path,function(item){
return lang.isString(item)?item:tree.model.getIdentity(item);
});
if(path.length){
tree._loadDeferred.addCallback(function(){
_1216(path,[tree.rootNode],d);
});
}else{
d.errback("Empty path");
}
return d;
})).addCallback(_1217);
function _1216(path,nodes,def){
var _1218=path.shift();
var _1219=array.filter(nodes,function(node){
return node.getIdentity()==_1218;
})[0];
if(!!_1219){
if(path.length){
tree._expandNode(_1219).addCallback(function(){
_1216(path,_1219.getChildren(),def);
});
}else{
def.callback(_1219);
}
}else{
def.errback("Could not expand path at "+_1218);
}
};
function _1217(_121a){
tree.set("selectedNodes",array.map(array.filter(_121a,function(x){
return x[0];
}),function(x){
return x[1];
}));
};
},_setSelectedNodeAttr:function(node){
this.set("selectedNodes",[node]);
},_setSelectedNodesAttr:function(nodes){
this._loadDeferred.addCallback(lang.hitch(this,function(){
this.dndController.setSelection(nodes);
}));
},mayHaveChildren:function(){
},getItemChildren:function(){
},getLabel:function(item){
return this.model.getLabel(item);
},getIconClass:function(item,_121b){
return (!item||this.model.mayHaveChildren(item))?(_121b?"dijitFolderOpened":"dijitFolderClosed"):"dijitLeaf";
},getLabelClass:function(){
},getRowClass:function(){
},getIconStyle:function(){
},getLabelStyle:function(){
},getRowStyle:function(){
},getTooltip:function(){
return "";
},_onKeyPress:function(e){
if(e.altKey){
return;
}
var _121c=_11f0.getEnclosingWidget(e.target);
if(!_121c){
return;
}
var key=e.charOrCode;
if(typeof key=="string"&&key!=" "){
if(!e.altKey&&!e.ctrlKey&&!e.shiftKey&&!e.metaKey){
this._onLetterKeyNav({node:_121c,key:key.toLowerCase()});
event.stop(e);
}
}else{
if(this._curSearch){
clearTimeout(this._curSearch.timer);
delete this._curSearch;
}
var map=this._keyHandlerMap;
if(!map){
map={};
map[keys.ENTER]="_onEnterKey";
map[keys.SPACE]=map[" "]="_onEnterKey";
map[this.isLeftToRight()?keys.LEFT_ARROW:keys.RIGHT_ARROW]="_onLeftArrow";
map[this.isLeftToRight()?keys.RIGHT_ARROW:keys.LEFT_ARROW]="_onRightArrow";
map[keys.UP_ARROW]="_onUpArrow";
map[keys.DOWN_ARROW]="_onDownArrow";
map[keys.HOME]="_onHomeKey";
map[keys.END]="_onEndKey";
this._keyHandlerMap=map;
}
if(this._keyHandlerMap[key]){
this[this._keyHandlerMap[key]]({node:_121c,item:_121c.item,evt:e});
event.stop(e);
}
}
},_onEnterKey:function(_121d){
this._publish("execute",{item:_121d.item,node:_121d.node});
this.dndController.userSelect(_121d.node,_11e6.isCopyKey(_121d.evt),_121d.evt.shiftKey);
this.onClick(_121d.item,_121d.node,_121d.evt);
},_onDownArrow:function(_121e){
var node=this._getNextNode(_121e.node);
if(node&&node.isTreeNode){
this.focusNode(node);
}
},_onUpArrow:function(_121f){
var node=_121f.node;
var _1220=node.getPreviousSibling();
if(_1220){
node=_1220;
while(node.isExpandable&&node.isExpanded&&node.hasChildren()){
var _1221=node.getChildren();
node=_1221[_1221.length-1];
}
}else{
var _1222=node.getParent();
if(!(!this.showRoot&&_1222===this.rootNode)){
node=_1222;
}
}
if(node&&node.isTreeNode){
this.focusNode(node);
}
},_onRightArrow:function(_1223){
var node=_1223.node;
if(node.isExpandable&&!node.isExpanded){
this._expandNode(node);
}else{
if(node.hasChildren()){
node=node.getChildren()[0];
if(node&&node.isTreeNode){
this.focusNode(node);
}
}
}
},_onLeftArrow:function(_1224){
var node=_1224.node;
if(node.isExpandable&&node.isExpanded){
this._collapseNode(node);
}else{
var _1225=node.getParent();
if(_1225&&_1225.isTreeNode&&!(!this.showRoot&&_1225===this.rootNode)){
this.focusNode(_1225);
}
}
},_onHomeKey:function(){
var node=this._getRootOrFirstNode();
if(node){
this.focusNode(node);
}
},_onEndKey:function(){
var node=this.rootNode;
while(node.isExpanded){
var c=node.getChildren();
node=c[c.length-1];
}
if(node&&node.isTreeNode){
this.focusNode(node);
}
},multiCharSearchDuration:250,_onLetterKeyNav:function(_1226){
var cs=this._curSearch;
if(cs){
cs.pattern=cs.pattern+_1226.key;
clearTimeout(cs.timer);
}else{
cs=this._curSearch={pattern:_1226.key,startNode:_1226.node};
}
var self=this;
cs.timer=setTimeout(function(){
delete self._curSearch;
},this.multiCharSearchDuration);
var node=cs.startNode;
do{
node=this._getNextNode(node);
if(!node){
node=this._getRootOrFirstNode();
}
}while(node!==cs.startNode&&(node.label.toLowerCase().substr(0,cs.pattern.length)!=cs.pattern));
if(node&&node.isTreeNode){
if(node!==cs.startNode){
this.focusNode(node);
}
}
},isExpandoNode:function(node,_1227){
return dom.isDescendant(node,_1227.expandoNode);
},_onClick:function(_1228,e){
var _1229=e.target,_122a=this.isExpandoNode(_1229,_1228);
if((this.openOnClick&&_1228.isExpandable)||_122a){
if(_1228.isExpandable){
this._onExpandoClick({node:_1228});
}
}else{
this._publish("execute",{item:_1228.item,node:_1228,evt:e});
this.onClick(_1228.item,_1228,e);
this.focusNode(_1228);
}
event.stop(e);
},_onDblClick:function(_122b,e){
var _122c=e.target,_122d=(_122c==_122b.expandoNode||_122c==_122b.expandoNodeText);
if((this.openOnDblClick&&_122b.isExpandable)||_122d){
if(_122b.isExpandable){
this._onExpandoClick({node:_122b});
}
}else{
this._publish("execute",{item:_122b.item,node:_122b,evt:e});
this.onDblClick(_122b.item,_122b,e);
this.focusNode(_122b);
}
event.stop(e);
},_onExpandoClick:function(_122e){
var node=_122e.node;
this.focusNode(node);
if(node.isExpanded){
this._collapseNode(node);
}else{
this._expandNode(node);
}
},onClick:function(){
},onDblClick:function(){
},onOpen:function(){
},onClose:function(){
},_getNextNode:function(node){
if(node.isExpandable&&node.isExpanded&&node.hasChildren()){
return node.getChildren()[0];
}else{
while(node&&node.isTreeNode){
var _122f=node.getNextSibling();
if(_122f){
return _122f;
}
node=node.getParent();
}
return null;
}
},_getRootOrFirstNode:function(){
return this.showRoot?this.rootNode:this.rootNode.getChildren()[0];
},_collapseNode:function(node){
if(node._expandNodeDeferred){
delete node._expandNodeDeferred;
}
if(node.isExpandable){
if(node.state=="LOADING"){
return;
}
node.collapse();
this.onClose(node.item,node);
this._state(node,false);
}
},_expandNode:function(node,_1230){
if(node._expandNodeDeferred&&!_1230){
return node._expandNodeDeferred;
}
var model=this.model,item=node.item,_1231=this;
switch(node.state){
case "UNCHECKED":
node.markProcessing();
var def=(node._expandNodeDeferred=new _11e9());
model.getChildren(item,function(items){
node.unmarkProcessing();
var scid=node.setChildItems(items);
var ed=_1231._expandNode(node,true);
scid.addCallback(function(){
ed.addCallback(function(){
def.callback();
});
});
},function(err){
console.error(_1231,": error loading root children: ",err);
});
break;
default:
def=(node._expandNodeDeferred=node.expand());
this.onOpen(node.item,node);
this._state(node,true);
}
return def;
},focusNode:function(node){
focus.focus(node.labelNode);
},_onNodeFocus:function(node){
if(node&&node!=this.lastFocused){
if(this.lastFocused&&!this.lastFocused._destroyed){
this.lastFocused.setFocusable(false);
}
node.setFocusable(true);
this.lastFocused=node;
}
},_onNodeMouseEnter:function(){
},_onNodeMouseLeave:function(){
},_onItemChange:function(item){
var model=this.model,_1232=model.getIdentity(item),nodes=this._itemNodesMap[_1232];
if(nodes){
var label=this.getLabel(item),_1233=this.getTooltip(item);
array.forEach(nodes,function(node){
node.set({item:item,label:label,tooltip:_1233});
node._updateItemClasses(item);
});
}
},_onItemChildrenChange:function(_1234,_1235){
var model=this.model,_1236=model.getIdentity(_1234),_1237=this._itemNodesMap[_1236];
if(_1237){
array.forEach(_1237,function(_1238){
_1238.setChildItems(_1235);
});
}
},_onItemDelete:function(item){
var model=this.model,_1239=model.getIdentity(item),nodes=this._itemNodesMap[_1239];
if(nodes){
array.forEach(nodes,function(node){
this.dndController.removeTreeNode(node);
var _123a=node.getParent();
if(_123a){
_123a.removeChild(node);
}
node.destroyRecursive();
},this);
delete this._itemNodesMap[_1239];
}
},_initState:function(){
this._openedNodes={};
if(this.persist&&this.cookieName){
var oreo=_11e7(this.cookieName);
if(oreo){
array.forEach(oreo.split(","),function(item){
this._openedNodes[item]=true;
},this);
}
}
},_state:function(node,_123b){
if(!this.persist){
return false;
}
var path=array.map(node.getTreePath(),function(item){
return this.model.getIdentity(item);
},this).join("/");
if(arguments.length===1){
return this._openedNodes[path];
}else{
if(_123b){
this._openedNodes[path]=true;
}else{
delete this._openedNodes[path];
}
var ary=[];
for(var id in this._openedNodes){
ary.push(id);
}
_11e7(this.cookieName,ary.join(","),{expires:365});
}
},destroy:function(){
if(this._curSearch){
clearTimeout(this._curSearch.timer);
delete this._curSearch;
}
if(this.rootNode){
this.rootNode.destroyRecursive();
}
if(this.dndController&&!lang.isString(this.dndController)){
this.dndController.destroy();
}
this.rootNode=null;
this.inherited(arguments);
},destroyRecursive:function(){
this.destroy();
},resize:function(_123c){
if(_123c){
_11ec.setMarginBox(this.domNode,_123c);
}
this._nodePixelIndent=_11ec.position(this.tree.indentDetector).w;
if(this.tree.rootNode){
this.tree.rootNode.set("indent",this.showRoot?0:-1);
}
},_createTreeNode:function(args){
return new _11fc(args);
},_setTextDirAttr:function(_123d){
if(_123d&&this.textDir!=_123d){
this._set("textDir",_123d);
this.rootNode.set("textDir",_123d);
}
}});
Tree._TreeNode=_11fc;
return Tree;
});
},"dijit/form/Button":function(){
require({cache:{"url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n"}});
define("dijit/form/Button",["require","dojo/_base/declare","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/ready","./_FormWidget","./_ButtonMixin","dojo/text!./templates/Button.html"],function(_123e,_123f,_1240,_1241,lang,ready,_1242,_1243,_1244){
if(!_1241.isAsync){
ready(0,function(){
var _1245=["dijit/form/DropDownButton","dijit/form/ComboButton","dijit/form/ToggleButton"];
_123e(_1245);
});
}
return _123f("dijit.form.Button",[_1242,_1243],{showLabel:true,iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},baseClass:"dijitButton",templateString:_1244,_setValueAttr:"valueNode",_onClick:function(e){
var ok=this.inherited(arguments);
if(ok){
if(this.valueNode){
this.valueNode.click();
e.preventDefault();
}
}
return ok;
},_fillContent:function(_1246){
if(_1246&&(!this.params||!("label" in this.params))){
var _1247=lang.trim(_1246.innerHTML);
if(_1247){
this.label=_1247;
}
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
_1240.toggle(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},setLabel:function(_1248){
_1241.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_1248);
},_setLabelAttr:function(_1249){
this.inherited(arguments);
if(!this.showLabel&&!("title" in this.params)){
this.titleNode.title=lang.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
}});
});
},"curam/ui/OpenTabEvent":function(){
define("curam/ui/OpenTabEvent",["curam/ui/PageRequest"],function(_124a){
var _124b=dojo.declare("curam.ui.OpenTabEvent",null,{constructor:function(_124c,_124d,_124e){
this.tabDescriptor=_124c;
this.openInBackground=_124e?true:false;
if(_124d){
this.uimPageRequest=_124d;
}else{
this.uimPageRequest=new _124a(_124c,_124c.isHomePage);
}
}});
return _124b;
});
},"url:curam/layout/resources/ExpandoPane.html":"<div class=\"dojoxExpandoPane dojoxExpando${orient} ${startupCls}\">\r\n\t<div dojoAttachPoint=\"titleWrapper\" class=\"dojoxExpandoTitle\">\r\n\t\t<div class=\"dojoxExpandoIcon dojoxExpandoIcon${orient}\" role=\"button\" aria-label=\"${expandIconAlt}\" tabIndex=\"0\" dojoAttachPoint=\"iconNode\" dojoAttachEvent=\"onclick:toggle,onkeypress: enterCheck\"></div>\r\n\t\t<span class=\"dojoxExpandoTitleNode\" dojoAttachPoint=\"titleNode\" title=\"${title}\">${title}</span>\r\n\t</div>\r\n\t<div class=\"dojoxExpandoWrapper\" dojoAttachPoint=\"cwrapper\" dojoAttachEvent=\"ondblclick:_trap\">\r\n\t\t<div class=\"dojoxExpandoContent\" dojoAttachPoint=\"containerNode\"></div>\r\n\t</div>\r\n</div>\r\n","curam/widget/TransferList":function(){
define("curam/widget/TransferList",["dijit/_Widget","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _124f=new curam.util.ResourceBundle("Debug");
var _1250=dojo.declare("curam.widget.TransferList",dijit._Widget,{btnNames:["allRight","toRight","toLeft","allLeft"],btnValues:[" "," "," "," "],bntClasses:["allRight","toRight","toLeft","allLeft"],rightEmptyText:"",widgetType:"TransferList",postCreate:function(){
var _1251=this.domNode.parentNode;
dojo.addClass(_1251,"transferlistparent");
var _1252=cm.nextSibling(this.domNode);
this.leftList=this.domNode;
var _1253=dojo.create("table",{"class":"transfer-list"});
var _1254=dojo.create("tbody",{},_1253);
var _1255=dojo.create("tr",{},_1254);
var _1256=dojo.create("td");
var _1257=dojo.create("td",{"class":"controls"});
var self=this;
function _1258(name){
return function(){
self.setSelection(name);
return false;
};
};
function _1259(id){
return function(){
dojo.addClass(dojo.byId(id),"active");
return false;
};
};
function _125a(id){
return function(){
dojo.removeClass(dojo.byId(id),"active");
return false;
};
};
for(j=0;j<4;j++){
var _125b=dojo.create("div",{},_1257);
var _125c=new Array(LOCALISED_TRANSFER_LIST_RA,LOCALISED_TRANSFER_LIST_R,LOCALISED_TRANSFER_LIST_L,LOCALISED_TRANSFER_LIST_LA);
var btn=dojo.create("input",{type:"button",id:this.btnNames[j]+this.domNode.name,value:this.btnValues[j],"class":this.bntClasses[j],"title":_125c[j]},_125b);
btn.listtwins=this;
dojo.connect(btn,"onclick",_1258(btn.id));
dojo.connect(btn,"onmousedown",_1259(btn.id));
dojo.connect(btn,"onmouseup",_125a(btn.id));
dojo.connect(btn,"onmouseout",_125a(btn.id));
}
var _125d=document.createElement("td");
var rList=dojo.create("select",{id:this.domNode.name,name:this.domNode.name,multiple:"multiple","class":"selected",size:5},_125d);
dojo.attr(this.domNode,{name:"__o3ign."+rList.name,id:"__o3ign."+rList.name,"class":"selected",size:5});
this.rightList=rList;
dojo.connect(this.leftList,"ondblclick",_1258("toRight"));
dojo.connect(this.rightList,"ondblclick",_1258("toLeft"));
function _125e(name){
return function(evt){
if(evt.keyCode==evt.KEY_ENTER){
self.setSelection(name);
}
return false;
};
};
dojo.connect(this.leftList,"onkeydown",_125e("toRight"));
dojo.connect(this.rightList,"onkeydown",_125e("toLeft"));
_1256.appendChild(this.domNode);
_1255.appendChild(_1256);
_1255.appendChild(_1257);
_1255.appendChild(_125d);
if(_1252){
_1251.insertBefore(_1253,_1252);
}else{
_1251.appendChild(_1253);
}
this.setInitialSelection();
this.adjustEmpties(this.leftList,this.rightList);
var form=cm.getParentByType(this.domNode,"form");
if(!form){
curam.debug.log("curam.widget.TransferList "+_124f.getProperty("curam.widget.TransferList.msg"));
return;
}
dojo.connect(form,"onsubmit",function(){
var _125f=self.rightList;
var _1260=new Array();
for(k1=0;k1<_125f.options.length;k1++){
_1260[_1260.length]=_125f.options[k1];
}
_125f.options.length=0;
for(k2=0;k2<_1260.length;k2++){
_1260[k2].selected=true;
_125f.appendChild(_1260[k2]);
}
});
dojo.connect(window,"onresize",this.selectWidthSetting);
dojo.addOnLoad(this.selectWidthSetting);
},setSelection:function(id){
var _1261=(id.indexOf("all")>-1);
var _1262=(id.indexOf("Right")>-1)?this.leftList:this.rightList;
var _1263=(id.indexOf("Left")>-1)?this.leftList:this.rightList;
if(_1262.options[0]!=null&&_1262.options[0].text!=this.rightEmptyText){
if(_1263.options[0]!=null&&(_1263.options[0].text==this.rightEmptyText||_1263.options[0].text=="")){
_1263.options[0]=null;
}
this.transferOptions(_1262,_1263,_1261);
this.adjustEmpties(this.leftList,this.rightList);
}
},setInitialSelection:function(){
this.transferOptions(this.leftList,this.rightList,false);
},adjustEmpties:function(_1264,_1265){
if(_1265.options.length==0){
_1265.options[0]=new Option(this.rightEmptyText,"",false,false);
}
},transferOptions:function(_1266,_1267,_1268){
if(_1266&&_1267){
var _1269=new Array();
dojo.forEach(_1266.options,function(opt){
if(_1268||opt.selected){
_1269[_1269.length]=opt;
}
});
this.appendAll(_1267,_1269);
}
},appendAll:function(aList,_126a){
for(var i=0;i<_126a.length;i++){
_126a[i].selected=true;
aList.appendChild(_126a[i]);
}
},selectWidthSetting:function(){
if(dojo.query(".transfer-list select.selected")){
dojo.query(".transfer-list select.selected").forEach(function(_126b){
var width=_126b.parentNode.clientWidth;
_126b.style.width=width+"px";
});
}
}});
return _1250;
});
},"dojo/parser":function(){
define("dojo/parser",["./_base/kernel","./_base/lang","./_base/array","./_base/config","./_base/html","./_base/window","./_base/url","./_base/json","./aspect","./date/stamp","./has","./query","./on","./ready"],function(dojo,dlang,_126c,_126d,dhtml,_126e,_126f,djson,_1270,dates,has,query,don,ready){
new Date("X");
if(1){
var form=document.createElement("form");
has.add("dom-attributes-explicit",form.attributes.length==0);
has.add("dom-attributes-specified-flag",form.attributes.length<40);
}
dojo.parser=new function(){
var _1271={};
function _1272(proto){
var map={};
for(var name in proto){
if(name.charAt(0)=="_"){
continue;
}
map[name.toLowerCase()]=name;
}
return map;
};
_1270.after(dlang,"extend",function(){
_1271={};
},true);
var _1273={};
function _1274(type){
var map=_1273[type]||(_1273[type]={});
return map["__type"]||(map["__type"]=(dlang.getObject(type)||require(type)));
};
this._functionFromScript=function(_1275,_1276){
var _1277="";
var _1278="";
var _1279=(_1275.getAttribute(_1276+"args")||_1275.getAttribute("args"));
if(_1279){
_126c.forEach(_1279.split(/\s*,\s*/),function(part,idx){
_1277+="var "+part+" = arguments["+idx+"]; ";
});
}
var _127a=_1275.getAttribute("with");
if(_127a&&_127a.length){
_126c.forEach(_127a.split(/\s*,\s*/),function(part){
_1277+="with("+part+"){";
_1278+="}";
});
}
return new Function(_1277+_1275.innerHTML+_1278);
};
this.instantiate=function(nodes,mixin,_127b){
mixin=mixin||{};
_127b=_127b||{};
var _127c=(_127b.scope||dojo._scopeName)+"Type",_127d="data-"+(_127b.scope||dojo._scopeName)+"-",_127e=_127d+"type";
var list=[];
_126c.forEach(nodes,function(node){
var type=_127c in mixin?mixin[_127c]:node.getAttribute(_127e)||node.getAttribute(_127c);
if(type){
list.push({node:node,"type":type});
}
});
return this._instantiate(list,mixin,_127b);
};
this._instantiate=function(nodes,mixin,_127f){
var _1280=[];
var _1281=(_127f.scope||dojo._scopeName)+"Type",_1282="data-"+(_127f.scope||dojo._scopeName)+"-",_1283=_1282+"type",_1284=_1282+"props",_1285=_1282+"attach-point",_1286=_1282+"attach-event",_1287=_1282+"id",_1288=_1282+"mixins";
var _1289={};
_126c.forEach([_1284,_1283,_1281,_1287,"jsId",_1285,_1286,"dojoAttachPoint","dojoAttachEvent","class","style",_1288],function(name){
_1289[name.toLowerCase()]=name.replace(_127f.scope,"dojo");
});
function _128a(type,_128b){
return type.createSubclass&&type.createSubclass(_128b)||type.extend.apply(type,_128b);
};
_126c.forEach(nodes,function(obj){
if(!obj){
return;
}
var node=obj.node,type=obj.type,_128c=node.getAttribute(_1288),ctor;
if(_128c){
var map=_1273[type];
_128c=_128c.replace(/ /g,"");
ctor=map&&map[_128c];
if(!ctor){
ctor=_1274(type);
ctor=_1273[type][_128c]=_128a(ctor,_126c.map(_128c.split(","),_1274));
}
}else{
ctor=_1274(type);
}
var proto=ctor&&ctor.prototype;
var _128d={};
if(_127f.defaults){
dlang.mixin(_128d,_127f.defaults);
}
if(obj.inherited){
dlang.mixin(_128d,obj.inherited);
}
var _128e;
if(has("dom-attributes-explicit")){
_128e=node.attributes;
}else{
if(has("dom-attributes-specified-flag")){
_128e=_126c.filter(node.attributes,function(a){
return a.specified;
});
}else{
var clone=/^input$|^img$/i.test(node.nodeName)?node:node.cloneNode(false),attrs=clone.outerHTML.replace(/=[^\s"']+|="[^"]*"|='[^']*'/g,"").replace(/^\s*<[a-zA-Z0-9]*\s*/,"").replace(/\s*>.*$/,"");
_128e=_126c.map(attrs.split(/\s+/),function(name){
var _128f=name.toLowerCase();
return {name:name,value:(node.nodeName=="LI"&&name=="value")||_128f=="enctype"?node.getAttribute(_128f):node.getAttributeNode(_128f).value};
});
}
}
var i=0,item;
while(item=_128e[i++]){
var name=item.name,_1290=name.toLowerCase(),value=item.value;
if(_1290 in _1289){
switch(_1289[_1290]){
case "data-dojo-props":
var extra=value;
break;
case "data-dojo-id":
case "jsId":
var _1291=value;
break;
case "data-dojo-attach-point":
case "dojoAttachPoint":
_128d.dojoAttachPoint=value;
break;
case "data-dojo-attach-event":
case "dojoAttachEvent":
_128d.dojoAttachEvent=value;
break;
case "class":
_128d["class"]=node.className;
break;
case "style":
_128d["style"]=node.style&&node.style.cssText;
break;
}
}else{
if(!(name in proto)){
var map=(_1271[type]||(_1271[type]=_1272(proto)));
name=map[_1290]||name;
}
if(name in proto){
switch(typeof proto[name]){
case "string":
_128d[name]=value;
break;
case "number":
_128d[name]=value.length?Number(value):NaN;
break;
case "boolean":
_128d[name]=value.toLowerCase()!="false";
break;
case "function":
if(value===""||value.search(/[^\w\.]+/i)!=-1){
_128d[name]=new Function(value);
}else{
_128d[name]=dlang.getObject(value,false)||new Function(value);
}
break;
default:
var pVal=proto[name];
_128d[name]=(pVal&&"length" in pVal)?(value?value.split(/\s*,\s*/):[]):(pVal instanceof Date)?(value==""?new Date(""):value=="now"?new Date():dates.fromISOString(value)):(pVal instanceof dojo._Url)?(dojo.baseUrl+value):djson.fromJson(value);
}
}else{
_128d[name]=value;
}
}
}
if(extra){
try{
extra=djson.fromJson.call(_127f.propsThis,"{"+extra+"}");
dlang.mixin(_128d,extra);
}
catch(e){
throw new Error(e.toString()+" in data-dojo-props='"+extra+"'");
}
}
dlang.mixin(_128d,mixin);
var _1292=obj.scripts||(ctor&&(ctor._noScript||proto._noScript)?[]:query("> script[type^='dojo/']",node));
var _1293=[],calls=[],watch=[],on=[];
if(_1292){
for(i=0;i<_1292.length;i++){
var _1294=_1292[i];
node.removeChild(_1294);
var event=(_1294.getAttribute(_1282+"event")||_1294.getAttribute("event")),prop=_1294.getAttribute(_1282+"prop"),_1295=_1294.getAttribute("type"),nf=this._functionFromScript(_1294,_1282);
if(event){
if(_1295=="dojo/connect"){
_1293.push({event:event,func:nf});
}else{
if(_1295=="dojo/on"){
on.push({event:event,func:nf});
}else{
_128d[event]=nf;
}
}
}else{
if(_1295=="dojo/watch"){
watch.push({prop:prop,func:nf});
}else{
calls.push(nf);
}
}
}
}
var _1296=ctor.markupFactory||proto.markupFactory;
var _1297=_1296?_1296(_128d,node,ctor):new ctor(_128d,node);
_1280.push(_1297);
if(_1291){
dlang.setObject(_1291,_1297);
}
for(i=0;i<_1293.length;i++){
_1270.after(_1297,_1293[i].event,dojo.hitch(_1297,_1293[i].func),true);
}
for(i=0;i<calls.length;i++){
calls[i].call(_1297);
}
for(i=0;i<watch.length;i++){
_1297.watch(watch[i].prop,watch[i].func);
}
for(i=0;i<on.length;i++){
don(_1297,on[i].event,on[i].func);
}
},this);
if(!mixin._started){
_126c.forEach(_1280,function(_1298){
if(!_127f.noStart&&_1298&&dlang.isFunction(_1298.startup)&&!_1298._started){
_1298.startup();
}
});
}
return _1280;
};
this.scan=function(root,_1299){
var list=[];
var _129a=(_1299.scope||dojo._scopeName)+"Type",_129b="data-"+(_1299.scope||dojo._scopeName)+"-",_129c=_129b+"type",_129d=_129b+"textdir";
var node=root.firstChild;
var _129e=_1299.inherited;
if(!_129e){
function _129f(node,attr){
return (node.getAttribute&&node.getAttribute(attr))||(node!==_126e.doc&&node!==_126e.doc.documentElement&&node.parentNode?_129f(node.parentNode,attr):null);
};
_129e={dir:_129f(root,"dir"),lang:_129f(root,"lang"),textDir:_129f(root,_129d)};
for(var key in _129e){
if(!_129e[key]){
delete _129e[key];
}
}
}
var _12a0={inherited:_129e};
var _12a1;
var _12a2;
function _12a3(_12a4){
if(!_12a4.inherited){
_12a4.inherited={};
var node=_12a4.node,_12a5=_12a3(_12a4.parent);
var _12a6={dir:node.getAttribute("dir")||_12a5.dir,lang:node.getAttribute("lang")||_12a5.lang,textDir:node.getAttribute(_129d)||_12a5.textDir};
for(var key in _12a6){
if(_12a6[key]){
_12a4.inherited[key]=_12a6[key];
}
}
}
return _12a4.inherited;
};
while(true){
if(!node){
if(!_12a0||!_12a0.node){
break;
}
node=_12a0.node.nextSibling;
_12a1=_12a0.scripts;
_12a2=false;
_12a0=_12a0.parent;
continue;
}
if(node.nodeType!=1){
node=node.nextSibling;
continue;
}
if(_12a1&&node.nodeName.toLowerCase()=="script"){
type=node.getAttribute("type");
if(type&&/^dojo\/\w/i.test(type)){
_12a1.push(node);
}
node=node.nextSibling;
continue;
}
if(_12a2){
node=node.nextSibling;
continue;
}
var type=node.getAttribute(_129c)||node.getAttribute(_129a);
var _12a7=node.firstChild;
if(!type&&(!_12a7||(_12a7.nodeType==3&&!_12a7.nextSibling))){
node=node.nextSibling;
continue;
}
var _12a8={node:node,scripts:_12a1,parent:_12a0};
var ctor;
try{
ctor=type&&_1274(type);
}
catch(e){
}
var _12a9=ctor&&!ctor.prototype._noScript?[]:null;
if(type){
list.push({"type":type,node:node,scripts:_12a9,inherited:_12a3(_12a8)});
}
node=_12a7;
_12a1=_12a9;
_12a2=ctor&&ctor.prototype.stopParser&&!(_1299.template);
_12a0=_12a8;
}
return list;
};
this.parse=function(_12aa,_12ab){
var root;
if(!_12ab&&_12aa&&_12aa.rootNode){
_12ab=_12aa;
root=_12ab.rootNode;
}else{
if(_12aa&&dlang.isObject(_12aa)&&!("nodeType" in _12aa)){
_12ab=_12aa;
}else{
root=_12aa;
}
}
root=root?dhtml.byId(root):_126e.body();
_12ab=_12ab||{};
var list=this.scan(root,_12ab);
var mixin=_12ab.template?{template:true}:{};
return this._instantiate(list,mixin,_12ab);
};
}();
if(_126d.parseOnLoad){
ready(100,dojo.parser,"parse");
}
return dojo.parser;
});
},"url:dijit/templates/MenuBarItem.html":"<div class=\"dijitReset dijitInline dijitMenuItem dijitMenuItemLabel\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<span data-dojo-attach-point=\"containerNode\"></span>\n</div>\n","curam/debug":function(){
define("curam/debug",["curam/define","curam/util/LocalConfig"],function(_12ac,_12ad){
_12ac.singleton("curam.debug",{log:function(){
if(curam.debug.enabled()){
try{
var a=arguments;
if(!dojo.isIE){
console.log.apply(console,a);
}else{
var _12ae=a.length;
var sa=curam.debug._serializeArgument;
switch(_12ae){
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
console.log("[Incomplete message - "+(_12ae-5)+" message a truncated] "+a[0],sa(a[1]),sa(a[2]),sa(a[3]),sa(a[4]),sa(a[5]));
}
}
}
catch(e){
console.log(e);
}
}
},_serializeArgument:function(arg){
if(typeof arg!="undefined"&&typeof arg.nodeType!="undefined"&&typeof arg.cloneNode!="undefined"){
return ""+arg;
}else{
if(curam.debug._isWindow(arg)){
return arg.location.href;
}else{
if(curam.debug._isArray(arg)&&curam.debug._isWindow(arg[0])){
return "[array of window objects, length "+arg.length+"]";
}else{
return dojo.toJson(arg);
}
}
}
},_isArray:function(arg){
return typeof arg!="undefined"&&(dojo.isArray(arg)||typeof arg.length!="undefined");
},_isWindow:function(arg){
var _12af=typeof arg!="undefined"&&typeof arg.closed!="undefined"&&arg.closed;
if(_12af){
return true;
}else{
return typeof arg!="undefined"&&typeof arg.location!="undefined"&&typeof arg.navigator!="undefined"&&typeof arg.document!="undefined"&&typeof arg.closed!="undefined";
}
},enabled:function(){
return _12ad.readOption("jsTraceLog","false")=="true";
},_setup:function(_12b0){
_12ad.seedOption("jsTraceLog",_12b0.trace,"false");
_12ad.seedOption("ajaxDebugMode",_12b0.ajaxDebug,"false");
_12ad.seedOption("asyncProgressMonitor",_12b0.asyncProgressMonitor,"false");
}});
return curam.debug;
});
},"url:curam/widget/templates/ComboBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\r\n  id=\"widget_${id}\"\r\n  role=\"listbox\"\r\n  ><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\r\n    data-dojo-attach-point=\"_buttonNode, _popupStateNode\" role=\"presentation\"\r\n    ><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n      ${_buttonInputDisabled}\r\n  /></div\r\n  ><div class='dijitReset dijitValidationContainer'\r\n    ><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n  /></div\r\n  ><div class=\"dijitReset dijitInputField dijitInputContainer\" role=\"listbox\"\r\n    ><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\r\n      data-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\r\n  /></div\r\n></div>\r\n","dijit/TooltipDialog":function(){
require({cache:{"url:dijit/templates/TooltipDialog.html":"<div role=\"presentation\" tabIndex=\"-1\">\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" data-dojo-attach-point=\"containerNode\" role=\"dialog\"></div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\"></div>\n</div>\n"}});
define("dijit/TooltipDialog",["dojo/_base/declare","dojo/dom-class","dojo/_base/event","dojo/keys","dojo/_base/lang","./focus","./layout/ContentPane","./_DialogMixin","./form/_FormMixin","./_TemplatedMixin","dojo/text!./templates/TooltipDialog.html","."],function(_12b1,_12b2,event,keys,lang,focus,_12b3,_12b4,_12b5,_12b6,_12b7,dijit){
return _12b1("dijit.TooltipDialog",[_12b3,_12b6,_12b5,_12b4],{title:"",doLayout:false,autofocus:true,baseClass:"dijitTooltipDialog",_firstFocusItem:null,_lastFocusItem:null,templateString:_12b7,_setTitleAttr:function(title){
this.containerNode.title=title;
this._set("title",title);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
},orient:function(node,_12b8,_12b9){
var newC="dijitTooltipAB"+(_12b9.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(_12b9.charAt(0)=="T"?"Below":"Above");
_12b2.replace(this.domNode,newC,this._currentOrientClass||"");
this._currentOrientClass=newC;
},focus:function(){
this._getFocusItems(this.containerNode);
focus.focus(this._firstFocusItem);
},onOpen:function(pos){
this.orient(this.domNode,pos.aroundCorner,pos.corner);
this._onShow();
},onClose:function(){
this.onHide();
},_onKey:function(evt){
var node=evt.target;
if(evt.charOrCode===keys.TAB){
this._getFocusItems(this.containerNode);
}
var _12ba=(this._firstFocusItem==this._lastFocusItem);
if(evt.charOrCode==keys.ESCAPE){
setTimeout(lang.hitch(this,"onCancel"),0);
event.stop(evt);
}else{
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===keys.TAB){
if(!_12ba){
focus.focus(this._lastFocusItem);
}
event.stop(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===keys.TAB&&!evt.shiftKey){
if(!_12ba){
focus.focus(this._firstFocusItem);
}
event.stop(evt);
}else{
if(evt.charOrCode===keys.TAB){
evt.stopPropagation();
}
}
}
}
}});
});
},"*now":function(r){
r(["dojo/i18n!*preload*dojo/nls/cdej-main*[\"ar\",\"ca\",\"cs\",\"da\",\"de\",\"el\",\"en-gb\",\"en-us\",\"es-es\",\"fi-fi\",\"fr-fr\",\"he-il\",\"hu\",\"it-it\",\"ja-jp\",\"ko-kr\",\"nl-nl\",\"nb\",\"pl\",\"pt-br\",\"pt-pt\",\"ru\",\"sk\",\"sl\",\"sv\",\"th\",\"tr\",\"zh-tw\",\"zh-cn\",\"ROOT\"]"]);
},"*noref":1}});
define("dojo/cdej-main",[],1);
require(["curam/define","curam/debug","curam/util","curam/GlobalVars","curam/date","curam/dialog","curam/date/locale","curam/validation","curam/html","curam/i18n","curam/lnf","curam/tab","curam/charting","curam/UIMController","curam/FastUIMController","curam/contentPanel","curam/inPageNavigation","curam/codetable-hierarchy","curam/omega3-util","curam/widgets","curam/ajax","curam/ModalDialog","curam/layout/EmptyContentPane","curam/layout/CuramTabContainer","curam/layout/TabContainer","curam/pagination","curam/pagination/ControlPanel","curam/pagination/StateController","curam/pagination/ExpandableListModel","curam/pagination/DefaultListModel","curam/validation/calendar","curam/tab/util","curam/tab/TabSessionManager","curam/tab/TabDescriptor","curam/ui/PageRequest","curam/ui/OpenTabEvent","curam/ui/ClientDataAccessor","curam/ui/UIMPageAdaptor","curam/ui/SectionShortcutsPanel","curam/util/ScreenContext","curam/util/WordFileEdit","curam/util/TabActionsMenu","curam/util/ExpandableLists","curam/util/ListSort","curam/util/TabNavigation","curam/util/onLoad","curam/util/UimDialog","curam/util/Request","curam/util/LocalConfig","curam/util/Refresh","curam/util/external","curam/util/RuntimeContext","curam/util/portlet/PortletAdaptor","curam/util/FrequencyEditor","curam/util/Navigation","curam/util/Dialog","curam/util/SessionTimeout","curam/ModalUIMController","curam/widget/_TabButton","curam/widget/ComboBox","curam/widget/DropDownButton","curam/widget/DeferredDropDownButton","curam/widget/DivButton","curam/widget/FilteringSelect","curam/widget/Menu","curam/widget/OptimalBrowserMessage","curam/widget/Select","curam/widget/TransferList","dojo/require","dojo/parser","dojo/html","dojo/aspect","dojo/data/ItemFileReadStore","dojo/data/util/sorter","dojo/data/util/simpleFetch","dojo/data/util/filter","dojo/io/iframe","dojo/dnd/common","dojo/dnd/autoscroll","dojo/dnd/Mover","dojo/dnd/Moveable","dojo/dnd/TimedMoveable","dojo/dnd/move","dojo/i18n","dojo/regexp","dojo/cookie","dojo/DeferredList","dijit/main","dijit/MenuItem","dijit/_KeyNavContainer","dijit/PopupMenuItem","dijit/CheckedMenuItem","dijit/MenuSeparator","dijit/Menu","dijit/_HasDropDown","dijit/_DialogMixin","dijit/form/Select","dijit/form/FilteringSelect","dijit/form/ComboBox","dijit/form/ComboButton","dijit/form/_FormMixin","dijit/form/Button","dijit/form/ToggleButton","dijit/form/_FormSelectWidget","dijit/form/TextBox","dijit/layout/StackController","dijit/layout/AccordionPane","dijit/TitlePane","dijit/layout/BorderContainer","dijit/layout/TabController","dijit/layout/StackContainer","dijit/layout/_TabContainerBase","dijit/layout/TabContainer","dijit/MenuBar","dijit/MenuBarItem","dijit/PopupMenuBarItem","dijit/tree/TreeStoreModel","dijit/tree/ForestStoreModel","dijit/Tree","dijit/TooltipDialog","dijit/DialogUnderlay","dijit/Dialog","dijit/_BidiSupport","curam/ui/UIController","dijit/layout/ScrollingTabController","dojox/encoding/digests/_base","dojox/encoding/digests/SHA1","dojox/storage","dojox/storage/_common","dojox/storage/manager","dojox/storage/Provider","dojox/storage/LocalStorageProvider","dojox/storage/CookieStorageProvider","dojox/storage/WhatWGStorageProvider","dojox/storage/BehaviorStorageProvider","dojox/html/_base","dojox/layout/ExpandoPane","dojox/layout/ContentPane","curam/layout/ExpandoPane","curam/layout/AccordionContainer"]);
