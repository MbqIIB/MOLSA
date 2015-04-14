//>>built
define("curam/smartPanel",["curam/tab","curam/util/onLoad","curam/define"],function(){
curam.define.singleton("curam.smartPanel",{setupOnLoad:function(_1){
curam.util.onLoad.addSubscriber(_1,curam.smartPanel._handleSmartPanelLoad);
dojo.ready(function(){
var _2=dojo.query("."+_1)[0];
if(!dojo.attr(_2,"src")){
var _3=dojo.query(".outer-navigation-tab")[0];
var _4=_3?dijit.byNode(_3):null;
if(_4){
var _5=null;
if(dojo.isBodyLtr()){
_5=_4.getSplitter("right");
}else{
_5=_4.getSplitter("left");
}
_5.connect(_5,"onMouseUp",curam.smartPanel.loadSmartPanelIframe);
}
}
});
},_handleSmartPanelLoad:function(_6,_7){
var _8=dojo.query("."+_6)[0];
var _9=dojo.attr(_8,"src");
curam.smartPanel.addTitle(_6);
var _a="smartpanel.content.loaded";
if(_9){
_8.setAttribute("iframeLoaded","true");
if(dojo.attr(_8,"_SPContentLoaded")==="true"){
dojo.publish("smartPanel.loaded",[_8]);
}else{
dojo.subscribe(_a,function(_b){
if(_b!=_8){
return;
}
dojo.publish("smartPanel.loaded",[_8]);
});
}
}
},loadSmartPanelIframe:function(){
var _c=curam.tab.getSmartPanelIframe();
if(_c){
var _d=dojo.attr(_c,"src");
if(_d==""){
var _d=dojo.attr(_c,"_srcContents");
dojo.attr(_c,"src",_d);
}
}
},addTitle:function(_e){
var _f=dojo.query("."+_e)[0];
var _10=SMART_PANEL_TITLE+" - "+_f.contentWindow.document.title;
_f.setAttribute("title",_10);
}});
return curam.smartPanel;
});
