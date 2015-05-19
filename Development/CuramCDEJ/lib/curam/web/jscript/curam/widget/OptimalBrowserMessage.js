//>>built
require({cache:{"url:curam/widget/templates/OptimalBrowserMessage.html":"<div>\n  <div class=\"hidden\"\n       data-dojo-type=\"dojox/layout/ContentPane\"\n       data-dojo-attach-point=\"_optimalMessage\">\n  </div>\n</div>\n"}});
define("curam/widget/OptimalBrowserMessage",["dojo/_base/declare","dojo/_base/lang","curam/util","curam/util/UIMFragment","curam/ui/ClientDataAccessor","dijit/_Widget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/form/Button","dojo/text!curam/widget/templates/OptimalBrowserMessage.html"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c){
return _1("curam.widget.OptimalBrowserMessage",[_6,_7,_8],{OPTIMAL_BROWSER_MSG:"optimal-browser-msg",isExternalApp:null,optimalBrowserMsgPaddingCSS:"optimal-browser-banner",optimalBrowserNode:null,appSectionsNode:null,appBannerHeaderNode:null,intApp:"internal",extApp:"external",context:null,templateString:_c,widgetsInTemplate:true,baseClass:"",optimalBrowserNodeID:"_optimalMessage",_appConfig:null,postMixInProperties:function(){
this.inherited(arguments);
},startup:function(){
this.inherited(arguments);
this._init();
this._loadNodes(this._optimalMessage.id);
},_init:function(){
da=new _5();
da.getRaw("/config/tablayout/settings["+curam.config.appID+"]",_2.hitch(this,function(_d){
console.log("External App config data:"+_d);
this._appConfig=_d;
this._getAppConfig();
}),function(_e,_f){
console.log("External App config data load error:"+_e);
},null);
},_getAppConfig:function(){
var _10=this._appConfig.optimalBrowserMessageEnabled;
var _11=_3.getTopmostWindow().dojox;
var _12=this._createStorageKey(this.OPTIMAL_BROWSER_MSG);
var _13=this;
var _14=false;
if(_10=="true"|_10=="TRUE"){
_3.runStorageFn(function(){
_14=true;
_13.context=_11;
return _13._isOptimalBrowserCheckDue(_11,_12,_13);
});
if(!_14){
return this._isOptimalBrowserCheckDue(this.context,_12,_13);
}
}
return false;
},_isOptimalBrowserCheckDue:function(_15,_16,_17){
if(_15!=undefined){
var _18=_15.storage.get(_16);
if(_18&&_18!=""){
if(new Date(_17._getTargetDate())>new Date(_18)){
_17._executeBrowserVersionCheck(_15);
return true;
}
}else{
_17._executeBrowserVersionCheck(_15);
return true;
}
return false;
}
},_executeBrowserVersionCheck:function(_19){
var _1a=this._appConfig.ieMinVersion;
var _1b=this._appConfig.ieMaxVersion;
var _1c=this._appConfig.ffMinVersion;
var _1d=this._appConfig.ffMaxVersion;
var _1e=this._appConfig.chromeMinVersion;
var _1f=this._appConfig.chromeMaxVersion;
var _20=this._appConfig.safariMinVersion;
var _21=this._appConfig.safariMaxVersion;
var _22=dojo.isIE;
var _23=dojo.isFF;
var _24=dojo.isChrome;
var _25=dojo.isSafari;
if(_22!=undefined){
return this._isCurrentBrowserVerSupported(_19,_22,_1a,_1b);
}else{
if(_23!=undefined&&this.isExternalApp){
return this._isCurrentBrowserVerSupported(_19,_23,_1c,_1d);
}else{
if(_24!=undefined){
return this._isCurrentBrowserVerSupported(_19,_24,_1e,_1f);
}else{
if(_25!=undefined&&this.isExternalApp){
return this._isCurrentBrowserVerSupported(_19,_25,_20,_21);
}
}
}
}
return false;
},_isCurrentBrowserVerSupported:function(_26,_27,_28,_29){
var _2a=false;
if(_28>0){
if(_27<_28){
_2a=true;
this._displayOptimalBrowserMsg(_26);
return true;
}
}
if(_29>0&&!_2a){
if(_27>_29){
this._displayOptimalBrowserMsg(_26);
return true;
}
}
return false;
},_displayOptimalBrowserMsg:function(_2b){
this._addOrRemoveCssForInternalApp(true,this.optimalBrowserMsgPaddingCSS);
_4.get({url:"optimal-browser-msg-fragment.jspx",targetID:this._optimalMessage.id});
this._postRenderingTasks(_2b);
},_postRenderingTasks:function(_2c){
var _2d=this._optimalMessage.id;
dojo.addOnLoad(function(){
var _2e=dojo.byId(_2d);
dojo.removeClass(_2e,_2e.className);
});
if(_2c.storage!=undefined){
_2c.storage.put(this._createStorageKey(this.OPTIMAL_BROWSER_MSG),this._getTargetDate(this._appConfig.nextBrowserCheck));
}
return _2c;
},_loadNodes:function(_2f){
dojo.addOnLoad(function(){
this.optimalBrowserNode=dojo.byId(_2f);
this.appSectionsNode=dojo.byId("app-sections-container-dc");
this.appBannerHeaderNode=dojo.byId("app-header-container-dc");
});
},_createStorageKey:function(_30){
if(this.isExternalApp){
_30=_30+"_"+this.extApp;
}else{
_30=_30+"_"+this.intApp;
}
return _30;
},_addOrRemoveCssForInternalApp:function(_31,_32){
var _33=this.isExternalApp;
dojo.addOnLoad(function(){
if(!_33){
if(_31){
dojo.addClass(this.appSectionsNode,_32);
if(this.appBannerHeaderNode){
dojo.addClass(this.appSectionsNode.children.item(1),_32);
dojo.addClass(this.appSectionsNode.children.item(2),_32);
}
}else{
dojo.removeClass(this.appSectionsNode,_32);
if(this.appBannerHeaderNode){
dojo.removeClass(this.appSectionsNode.children.item(1),_32);
dojo.removeClass(this.appSectionsNode.children.item(2),_32);
}
}
}
});
},_getTargetDate:function(_34){
var _35=new Date();
if(_34==undefined){
_35.setDate(_35.getDate());
}else{
_35.setDate(_35.getDate()+_34);
}
return _35.toUTCString();
},exitOptimalBrowserMessageBox:function(){
var _36=dojo.byId(this._optimalMessage.id);
if(_36){
_36.parentNode.removeChild(_36);
}
this._addOrRemoveCssForInternalApp(false,this.optimalBrowserMsgPaddingCSS);
}});
});
