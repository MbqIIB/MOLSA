//>>built
require({cache:{"url:curam/layout/resources/UIMController.html":"<div id=\"uimcontroller_${uid}\" class=\"uimcontroller_${uid} uimController ${classList}\" data-dojo-attach-point=\"uimController\">\r\n  <div style=\"display:none;\" \r\n       id=\"uimcontroller_tc_${uid}\" \r\n       class=\"ipnTabController in-page-nav-tabContainer\"\r\n       data-dojo-attach-point=\"tabController\" \r\n       data-dojo-type=\"curam.layout.TabContainer\">\r\n  </div>\r\n  <div class=\"contentPanelFrameWrapper\"  \r\n        data-dojo-attach-point=\"frameWrapper\">\r\n    <iframe frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\"\r\n             allowTransparency=\"true\" \r\n             id=\"${iframeId}\" \r\n             data-dojo-attach-point=\"frame\"                 \r\n             class=\"${iframeId} ${iframeClassList}\"\r\n             iscpiframe=\"${iscpiframe}\"\r\n             title=\"${title}\" >\r\n    </iframe>\r\n  </div> \r\n</div>"}});
define("curam/UIMController",["dojo/text!curam/layout/resources/UIMController.html","dijit/_Widget","dijit/_Templated","dijit/layout/ContentPane","curam/tab","curam/debug","curam/util","curam/util/onLoad","curam/util/ResourceBundle"],function(_1){
dojo.requireLocalization("curam.application","Debug");
var _2=new curam.util.ResourceBundle("Debug");
var _3=dojo.declare("curam.UIMController",[dijit._Widget,dijit._Templated],{TAB_HEIGHT:20,EVENT:{TOPIC_PREFIX:"UIMController.InPageNav_"},TOPIC_LOADED:"/curam/uim/controller/loaded",frameLoadEvent:"",uid:"",url:"",tabControllerId:"",oldTabsTitlesList:[],newTabsTitlesList:[],widgetsInTemplate:true,finishedLoadingTabs:false,classList:"",iframeId:"",height:"",width:"",iframeClassList:"",iscpiframe:"false",ipnTabClickEvent:null,title:"",handleIPNTabClickListener:null,inPageNavItems:null,loadFrameOnCreate:true,resizeFrameOnLoad:false,templateString:_1,inDialog:false,constructor:function(_4){
if(!_4.uid){
throw "'uid' attribute not provided to constructor for"+" curam.UIMController(url,uid)";
}
this.uid="uimcontroller_"+_4.uid;
this.tabControllerId="uimcontroller_tc_"+_4.uid;
this.newTabsTitlesList=[];
this.ipnTabClickEvent=this.tabControllerId+"-selectChild";
if(this.height==""){
this.height="99%";
}
if(this.width==""){
this.width="99%";
}
curam.debug.log(_2.getProperty("curam.UIMController.new")+" curam.UIMController()...");
curam.debug.log("curam.UIMController "+_2.getProperty("curam.UIMController.identifier")+" "+this.uid);
curam.debug.log("curam.UIMController "+_2.getProperty("curam.UIMController.url")+" "+this.url);
curam.debug.log("curam.UIMController "+_2.getProperty("curam.UIMController.identifier")+" "+this.tabControllerId);
curam.debug.log("curam.UIMController: newTabsTitlesList "+" "+this.newTabsTitlesList);
return this.uimController;
},postCreate:function(){
this.frameLoadEvent=this.EVENT.TOPIC_PREFIX+this.frame.id;
this.setURL(this.url);
var _5=dojo.hitch(this,"processFrameLoadEvent");
curam.util.onLoad.addSubscriber(this.frame.id,_5);
dojo.connect(this,"destroy",function(){
curam.util.onLoad.removeSubscriber(this.iframeId,_5);
this.fLoadFunct=null;
});
if(this.inDialog){
dojo.style(this.frame,{width:this.width,height:this.height});
}
curam.debug.log("curam.UIMController: loadFrameOnCreate="+this.loadFrameOnCreate);
curam.debug.log("curam.UIMController "+_2.getProperty("curam.UIMController.url")+this.url);
if(this.loadFrameOnCreate==true&&typeof (this.url)!="undefined"){
curam.debug.log("curam.UIMController: "+_2.getProperty("uram.UIMController.loading"));
this.loadPage();
}
},setURL:function(_6){
if(_6.indexOf("Page.do")==-1){
this.absoluteURL=true;
this.url=_6;
}else{
this.absoluteURL=false;
this.url=this._trimURL(_6);
}
},processFrameLoadEvent:function(_7,_8){
curam.debug.log("curam.UIMController: processFrameLoadEvent "+_2.getProperty("curam.UIMController.processing.IPN")+_8);
this.inPageNavItems=_8.inPageNavItems;
curam.debug.log("curam.UIMController: processFrameLoadEvent: "+_2.getProperty("curam.UIMController.processing"));
curam.debug.log("curam.UIMController.processFrameLoadEvent: this.tabController: "+this.tabController);
if(this.resizeFrameOnLoad==true){
var _9=_8.height;
curam.debug.log(_2.getProperty("curam.UIMController.resizing")+_9);
if(_9){
dojo.style(this.getIFrame(),{height:_9+"px"});
}
}
curam.debug.log(_2.getProperty("curam.UIMController.IPN.items"),this.inPageNavItems);
if(!this.hasInPageNavigation()){
curam.debug.log(_2.getProperty("curam.UIMController.no.IPN"));
this.clearIPNTabs();
if(!this._tabControllerHidden()){
curam.debug.log(_2.getProperty("curam.UIMController.hiding"));
this.showTabContainer(false);
}
dojo.publish(this.TOPIC_LOADED);
return;
}
curam.debug.log(_2.getProperty("curam.UIMController.extract"));
var _a=-1;
for(var i=0;i<this.inPageNavItems.length;i++){
this.newTabsTitlesList.push(this.inPageNavItems[i].title);
if(this.inPageNavItems[i].selected==true){
_a=i;
}
curam.debug.log(_2.getProperty("curam.UIMController.IPN.")+"["+this.inPageNavItems[i].title+", "+this.inPageNavItems[i].href+", "+this.inPageNavItems[i].selected+"]");
}
var _b=!(this.compareLists(this.oldTabsTitlesList,this.newTabsTitlesList));
if(_b){
this.clearIPNTabs(this);
this.createIPNTabs(this.inPageNavItems);
if(this._tabControllerHidden()){
this.showTabContainer(true);
}
}else{
curam.debug.log(_2.getProperty("curam.UIMController.no.change"));
if(_a>-1){
var _c=this.tabController.getIndexOfChild(this.tabController.selectedChildWidget);
if(_c!=_a){
curam.debug.log(_2.getProperty("curam.UIMController.change")+_c+_2.getProperty("curam.UIMController.to")+_a);
this.toggleIPNTabClickEventListener("off");
this.tabController.selectChild(this.tabController.getChildren()[_a]);
this.toggleIPNTabClickEventListener("on");
}
}
}
this.newTabsTitlesList=[];
curam.debug.log(_2.getProperty("curam.UIMController.clear")+this.newTabsTitlesList);
this.finishedLoadingTabs=true;
dojo.publish(this.TOPIC_LOADED);
dojo.publish("/curam/tab/labelUpdated");
},_tabControllerHidden:function(){
return dojo.style(this.tabController.domNode,"display")=="none";
},toggleIPNTabClickEventListener:function(_d){
if(_d=="off"){
if(this.handleIPNTabClickListener!=null){
curam.debug.log(_2.getProperty("curam.UIMController.off.listener"));
dojo.unsubscribe(this.handleIPNTabClickListener);
}
}else{
curam.debug.log(_2.getProperty("curam.UIMController.on.listener"));
this.handleIPNTabClickListener=this.subscribe(this.ipnTabClickEvent,dojo.hitch(this,this.handleIPNTabClick));
}
},handleIPNTabClick:function(_e){
if(this.finishedLoadingTabs){
curam.debug.log(_2.getProperty("curam.UIMController.finishing"));
this.finishedLoadingTabs=false;
this.setURL(this._getURLByTitle(_e.title));
this.loadPage();
}
},createIPNTabs:function(_f){
this.toggleIPNTabClickEventListener("off");
if(!this.tabController){
console.error("curam.UIMController.createIPNTabs: "+_2.getProperty("uram.UIMController.no.widget")+" '"+this.tabControllerId+"'");
}else{
curam.debug.log("curam.UIMController.createIPNTabs: "+_2.getProperty("curam.UIMController.creating.tabs")+_f);
var _10=null;
for(var i=0;i<_f.length;i++){
var cp=new dijit.layout.ContentPane({title:_f[i].title});
this.tabController.addChild(cp);
if(_f[i].selected==true||_10==null){
_10=cp;
}
this.oldTabsTitlesList.push(_f[i].title);
curam.debug.log("curam.UIMController.createIPNTabs: "+_2.getProperty("curam.UIMController.adding.tabs")+_f[i].title);
}
this.tabController.startup();
this.tabController.selectChild(_10);
}
this.toggleIPNTabClickEventListener("on");
this.newTabsTitlesList=[];
},clearIPNTabs:function(){
curam.debug.log("curam.UIMController.createIPNTabs: "+_2.getProperty("curam.UIMController.clearing.tabs")+this.oldTabsTitlesList);
this.toggleIPNTabClickEventListener("off");
this.tabController.destroyDescendants();
this.tabController.selectedChildWidget=null;
this.oldTabsTitlesList=[];
this.toggleIPNTabClickEventListener("on");
curam.debug.log("curam.UIMController.createIPNTabs: "+_2.getProperty("curam.UIMController.clearing.notify")+this.oldTabsTitlesList);
},compareLists:function(_11,_12){
curam.debug.log("curam.UIMController.compareLists: "+_2.getProperty("curam.UIMController.comparing.tabs"));
curam.debug.log(_2.getProperty("curam.UIMController.tab.list1")+_11);
curam.debug.log(_2.getProperty("curam.UIMController.tab.list1")+_12);
var _13=true;
if(_11.length!=_12.length){
_13=false;
}
for(var i=0;i<_11.length;i++){
if(_11[i]!=_12[i]){
_13=false;
}
}
curam.debug.log(_2.getProperty("curam.UIMController.result")+_13);
return _13;
},_getURLByTitle:function(_14){
var url=null;
dojo.forEach(this.inPageNavItems,function(_15){
if(_15.title==_14){
url=_15.href;
}
});
curam.debug.log(url);
return url;
},_trimURL:function(_16){
var idx=_16.lastIndexOf("/");
if(idx>-1&&idx<=_16.length){
return _16.substring(idx+1);
}else{
return _16;
}
},hasInPageNavigation:function(){
return this.inPageNavItems!=null;
},getIFrame:function(){
return this.frame;
},loadPage:function(_17){
if(typeof (this.url)=="undefined"||this.url==null){
var e=new Error("curam.UIMController: Cannot load page as URL has not been set");
if(_17){
_17.errback(e);
}
throw e;
}
if(_17){
var st=curam.util.subscribe(this.TOPIC_LOADED,function(){
curam.util.unsubscribe(st);
_17.callback();
});
}
var _18=this._getFullURL();
curam.debug.log("curam.UIMController.loadPage(): "+_2.getProperty("curam.UIMController.set.source")+this.frame.id+" to url: "+_18);
dojo.attr(this.frame,"src",_18);
},_getFullURL:function(){
if(typeof (this.absoluteURL)!="undefined"&&this.absoluteURL==true){
return this.url;
}
var _19;
if(this.url.indexOf("?")==-1){
_19="?";
}else{
_19="&";
}
var _1a=curam.config?curam.config.locale:jsL;
var _1b="";
if(window==curam.util.getTopmostWindow()){
_1b=_1a+"/";
}
if(this.url.indexOf("o3nocache=")==-1){
return _1b+this.url+_19+curam.util.getCacheBusterParameter();
}else{
return _1b+this.url;
}
},showTabContainer:function(_1c){
if(_1c&&!this.hasInPageNavigation()){
curam.debug.log(_2.getProperty("curam.UIMController.ignore.reuest"));
return;
}
dojo.style(this.frameWrapper,"top",(_1c?this.TAB_HEIGHT+7:"0")+"px");
dojo.style(this.tabController.domNode,"display",_1c?"block":"none");
if(_1c){
this.tabController.resize();
}
},setDimensionsForModalDialog:function(w,h,_1d){
curam.debug.log("curam.UIMController:setDimensionsForModalDialog() - "+"w="+w+", h="+h);
dojo.style(this.frame,{width:w+"px",height:h+"px"});
dojo.style(this.tabController.domNode,{width:w+"px"});
if(typeof (_1d.inPageNavItems)!="undefined"){
h+=this.TAB_HEIGHT+5;
curam.debug.log("cura.UIMController:setDimensionsForModalDialog() - "+_2.getProperty("curam.UIMController.height"));
}
dojo.style(this.domNode,{width:w+"px",height:h+"px"});
},destroy:function(){
this.iframe=null;
this.inPageNavItems=null;
dojo.unsubscribe(this.handleIPNTabClickListener);
this.tabController.destroy();
this.inherited(arguments);
}});
return _3;
});
