//>>built
define("curam/ui/UIMPageAdaptor",["curam/tab","curam/define","curam/debug","curam/util","curam/ui/PageRequest","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.ui.UIMPageAdaptor",{initialize:function(){
if(jsScreenContext.hasContextBits("MODAL")){
return;
}
curam.util.connect(dojo.body(),"onclick",curam.ui.UIMPageAdaptor.clickHandler);
var _2=null;
var _3=null;
if(!jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")){
_2=curam.util.getTopmostWindow().dojo;
_3="/iframe-loaded/"+window.jsPageID;
curam.debug.log(_1.getProperty("curam.ui.UIMPageAdaptor.event")+_3);
_2.publish(_3);
}
},externalInitialize:function(){
if(jsScreenContext.hasContextBits("MODAL")){
return;
}
curam.util.connect(dojo.body(),"onclick",curam.ui.UIMPageAdaptor.clickHandler);
},externalClickHandler:function(_4,_5){
var _6=new curam.ui.PageRequest(_5.href);
var _7=window.top.dijit.byId("curam-app");
if(_7!=null){
var _8=[];
var i=0;
for(param in _6.parameters){
_8[i]={paramKey:param,paramValue:_6.parameters[param]};
i=i+1;
}
var _9={pageID:_6.pageID,param:_8};
if(_7._isNavBarItem(_6.pageID)){
dojo.stopEvent(_4||window.event);
window.top.displayContent(_9);
}else{
if(_7._isUIMFragment(_6.pageID)){
dojo.stopEvent(_4||window.event);
window.top.displayContent(_9);
}
}
}
},clickHandler:function(_a){
var _b=null;
if(_a.target.nodeName=="A"){
if(curam.ui.UIMPageAdaptor.allowLinkToContinue(_a.target)){
return;
}
_b=_a.target;
}else{
if((_a.target.nodeName=="IMG"&&!dojo.hasClass(_a.target.parentNode,"file-download"))||(_a.target.nodeName=="SPAN"&&(_a.target.className=="middle"||_a.target.className=="bidi"))){
_b=cm.getParentByType(_a.target,"A");
}
}
if(_b!=null){
if(!_b.href||_b.href.length==0){
dojo.stopEvent(_a||window.event);
return;
}
if(jsScreenContext.hasContextBits("EXTAPP")){
curam.ui.UIMPageAdaptor.externalClickHandler(_a,_b);
}else{
dojo.stopEvent(_a||window.event);
if(curam.ui.UIMPageAdaptor.shouldLinkOpenInNewWindow(_b)){
window.open(_b.href);
}else{
if(curam.ui.UIMPageAdaptor.isLinkValidForTabProcessing(_b)){
var _c=new curam.ui.PageRequest(_b.href);
if(jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")||jsScreenContext.hasContextBits("NESTED_UIM")){
_c.pageHolder=window;
}
curam.tab.getTabController().handlePageRequest(_c);
}
}
}
}
},allowLinkToContinue:function(_d){
if(_d&&_d._submitButton){
return true;
}
if(_d&&_d.href){
return (_d.href.indexOf("/servlet/FileDownload")!=-1||_d.href.indexOf("#")!=-1||_d.href.substr(0,7)=="mailto:");
}else{
return false;
}
},isLinkValidForTabProcessing:function(_e){
if(!_e||(dojo.hasClass(_e,"popup-action")||dojo.hasClass(_e,"list-details-row-toggle"))){
return false;
}
return true;
},shouldLinkOpenInNewWindow:function(_f){
return dojo.hasAttr(_f,"target")&&!curam.util.isInternal(_f.href);
},setTabTitleAndName:function(){
var _10=dojo.byId("tab-title").innerHTML;
var _11=dojo.byId("tab-name").innerHTML;
window.parent.dojo.publish("tab.title.name.set",[window.frameElement,_10,_11]);
}});
return curam.ui.UIMPageAdaptor;
});
