//>>built
define("curam/tab/TabDescriptor",["curam/tab/TabSessionManager","curam/debug","curam/util/ResourceBundle"],function(_1){
dojo.requireLocalization("curam.application","Debug");
var _2=new curam.util.ResourceBundle("Debug");
var _3=dojo.declare("curam.tab.TabDescriptor",null,{constructor:function(_4,_5){
this.sectionID=_4?_4:null;
this.tabID=_5?_5:null;
this.tabSignature=null;
this.tabContent=null;
this.tabParamNames=null;
this.isHomePage=false;
},toJson:function(){
var _6={"sectionID":this.sectionID,"tabID":this.tabID,"tabSignature":this.tabSignature,"tabParamNames":this.tabParamNames,"isHomePage":this.isHomePage};
_6.tabContent=this.tabContent?this.tabContent:null;
return dojo.toJson(_6);
},setTabContent:function(_7,_8){
if(this.tabContent){
this._log(_2.getProperty("curam.tab.TabDescriptor.content.changed"));
}else{
this._log(_2.getProperty("curam.tab.TabDescriptor.content.set"));
}
var _9=dojo.clone(_7.parameters);
dojo.mixin(_9,_7.cdejParameters);
if(!this.tabContent){
this.tabContent={};
}
this.tabContent.parameters=_9;
this.tabContent.pageID=_7.pageID;
if(_8){
this.tabContent.tabName=_8;
}else{
if(!this.tabContent.tabName){
this.tabContent.tabName="";
}
}
this._save();
dojo.publish("/curam/tab/labelUpdated");
},setTabSignature:function(_a,_b,_c){
if(!this.tabSignature){
this.tabParamNames=_a.slice(0);
this.tabParamNames.sort();
this.tabSignature=this._generateSignature(this.tabID,this.tabParamNames,_b);
this._log(_2.getProperty("curam.tab.TabDescriptor.signature.set"));
this._save();
if(!_c){
this._select();
}
}else{
this._log(_2.getProperty("curam.tab.TabDescriptor.signature.not.set"));
}
},matchesPageRequest:function(_d){
return this.tabSignature&&this.tabSignature==this._generateSignature(this.tabID,this.tabParamNames,_d);
},_generateSignature:function(_e,_f,_10){
var _11=_e;
if(_f){
for(var i=0;i<_f.length;i++){
var _12=_f[i];
if(_10.parameters[_12]){
_11+="|"+_12+"="+_10.parameters[_12];
}
}
}
return _11;
},_save:function(){
if(this.tabContent&&this.tabSignature){
this._log(_2.getProperty("curam.tab.TabDescriptor.saving"));
new _1().tabUpdated(this);
}
},_select:function(){
if(this.tabSignature){
this._log(_2.getProperty("curam.tab.TabDescriptor.selecting"));
new _1().tabSelected(this);
}
},_log:function(msg){
if(curam.debug.enabled()){
curam.debug.log("TAB DESCRIPTOR: "+msg+" ["+this.toJson()+"]");
}
}});
dojo.mixin(curam.tab.TabDescriptor,{fromJson:function(_13){
var _14=null;
if(_13){
var _15=dojo.fromJson(_13);
var _14=new curam.tab.TabDescriptor(_15.sectionID,_15.tabID);
if(_15.tabSignature){
_14.tabSignature=_15.tabSignature;
}
if(_15.tabContent){
_14.tabContent=_15.tabContent;
}
if(_15.tabParamNames){
_14.tabParamNames=_15.tabParamNames;
}
if(_15.isHomePage){
_14.isHomePage=_15.isHomePage;
}
}
return _14;
}});
return _3;
});
