//>>built
require({cache:{"curam/ui/UIMPageAdaptor":function(){
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
if((_a.target.nodeName=="IMG"&&!dojo.hasClass(_a.target.parentNode,"file-download"))||(_a.target.nodeName=="SPAN"&&_a.target.className=="middle")){
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
},"url:dijit/templates/CheckedMenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitemcheckbox\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuItemIcon dijitCheckedMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t<span class=\"dijitCheckedMenuItemIconChar\">&#10003;</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,labelNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&#160;</td>\n</tr>\n","dijit/form/TextBox":function(){
require({cache:{"url:dijit/form/templates/TextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"}});
define("dijit/form/TextBox",["dojo/_base/declare","dojo/dom-construct","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/_base/sniff","dojo/_base/window","./_FormValueWidget","./_TextBoxMixin","dojo/text!./templates/TextBox.html",".."],function(_12,_13,_14,_15,_16,has,win,_17,_18,_19,_1a){
var _1b=_12([_17,_18],{templateString:_19,_singleNodeTemplate:"<input class=\"dijit dijitReset dijitLeft dijitInputField\" data-dojo-attach-point=\"textbox,focusNode\" autocomplete=\"off\" type=\"${type}\" ${!nameAttrSetting} />",_buttonInputDisabled:has("ie")?"disabled":"",baseClass:"dijitTextBox",postMixInProperties:function(){
var _1c=this.type.toLowerCase();
if(this.templateString&&this.templateString.toLowerCase()=="input"||((_1c=="hidden"||_1c=="file")&&this.templateString==this.constructor.prototype.templateString)){
this.templateString=this._singleNodeTemplate;
}
this.inherited(arguments);
},_onInput:function(e){
this.inherited(arguments);
if(this.intermediateChanges){
var _1d=this;
setTimeout(function(){
_1d._handleOnChange(_1d.get("value"),false);
},0);
}
},_setPlaceHolderAttr:function(v){
this._set("placeHolder",v);
if(!this._phspan){
this._attachPoints.push("_phspan");
this._phspan=_13.create("span",{onmousedown:function(e){
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
},_setValueAttr:function(_1e,_1f,_20){
this.inherited(arguments);
this._updatePlaceHolder();
},getDisplayedValue:function(){
_15.deprecated(this.declaredClass+"::getDisplayedValue() is deprecated. Use set('displayedValue') instead.","","2.0");
return this.get("displayedValue");
},setDisplayedValue:function(_21){
_15.deprecated(this.declaredClass+"::setDisplayedValue() is deprecated. Use set('displayedValue', ...) instead.","","2.0");
this.set("displayedValue",_21);
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
_1b=_12(_1b,{declaredClass:"dijit.form.TextBox",_isTextSelected:function(){
var _22=win.doc.selection.createRange();
var _23=_22.parentElement();
return _23==this.textbox&&_22.text.length==0;
},postCreate:function(){
this.inherited(arguments);
setTimeout(_16.hitch(this,function(){
try{
var s=_14.getComputedStyle(this.domNode);
if(s){
var ff=s.fontFamily;
if(ff){
var _24=this.domNode.getElementsByTagName("INPUT");
if(_24){
for(var i=0;i<_24.length;i++){
_24[i].style.fontFamily=ff;
}
}
}
}
}
catch(e){
}
}),0);
}});
_1a._setSelectionRange=_18._setSelectionRange=function(_25,_26,_27){
if(_25.createTextRange){
var r=_25.createTextRange();
r.collapse(true);
r.moveStart("character",-99999);
r.moveStart("character",_26);
r.moveEnd("character",_27-_26);
r.select();
}
};
}else{
if(has("mozilla")){
_1b=_12(_1b,{declaredClass:"dijit.form.TextBox",_onBlur:function(e){
this.inherited(arguments);
if(this.selectOnClick){
this.textbox.selectionStart=this.textbox.selectionEnd=undefined;
}
}});
}else{
_1b.prototype.declaredClass="dijit.form.TextBox";
}
}
_16.setObject("dijit.form.TextBox",_1b);
return _1b;
});
},"curam/codetable-hierarchy":function(){
define("curam/codetable-hierarchy",["curam/util/Request","dojo/data/ItemFileReadStore","curam/widget/FilteringSelect","curam/util/ResourceBundle"],function(_28){
dojo.requireLocalization("curam.application","Debug");
var _29=new curam.util.ResourceBundle("Debug");
var _2a={initLists:function(_2b,_2c,_2d){
this.noOptionCode=_2b;
this.noOptionDesc=_2c;
this.ddInfo=_2d;
this.lists=function(){
var _2e=null;
for(var i=_2d.length-1;i>=0;i--){
_2e=new _2a.DropDown(dijit.byId(_2d[i].id),_2d[i].ctName,_2b,_2c,_2e);
}
};
dojo.addOnLoad(this.lists);
},DropDown:function(_2f,_30,_31,_32,_33){
this.node=_2f.domNode;
this.widgetNode=_2f;
this.codeTableName=_30;
this.noOptionCode=_31;
this.noOptionDesc=_32;
this.next=_33;
var _34=this;
this.populate=function(){
if(!_34.widgetNode.get("value")){
_34.resetNext(_34);
}else{
if(_34.next!=null){
_34.resetNext(_34);
if(_34.widgetNode.get("value")==0){
return;
}
_28.post({url:"../servlet/JSONServlet",handleAs:"text",preventCache:true,load:function(_35,evt){
if(_35.length<3){
curam.debug.log(_29.getProperty("curam.codetable-hierarchy.msg.1")+_34.codeTableName+_29.getProperty("curam.codetable-hierarchy.msg.2")+_34.widgetNode.get("value"));
return;
}
var _36=dojo.fromJson(_35);
_36.unshift({"value":_34.noOptionCode,"name":""});
var _37=dijit.byId(_34.next.widgetNode.id);
var _38=new dojo.data.ItemFileReadStore({data:{label:"name",identifier:"value",items:_36}});
_38.fetch({onComplete:function(_39,_3a){
_37.set("store",_38);
_37.set("value",_34.noOptionCode);
}});
},error:function(_3b){
curam.debug.log(_3b);
},content:{"content":dojo.toJson({operation:"getCodeTableSubsetForFilteringSelect",args:[_34.codeTableName,_34.widgetNode.get("value")]})}});
}
}
};
this.resetNext=function(_3c){
while(_3c.next!=null){
var _3d=[];
_3d.unshift({"value":_3c.noOptionCode,"name":_3c.noOptionDesc});
var _3e=dijit.byId(_3c.next.widgetNode.id);
var _3f=new dojo.data.ItemFileReadStore({data:{label:"name",identifier:"value",items:_3d}});
_3f.fetch({onComplete:function(_40,_41){
_3e.set("store",_3f);
_3e.set("displayedValue",_3c.noOptionDesc);
}});
_3c=_3c.next;
}
};
if(_33!=null){
dojo.connect(this.widgetNode,"onChange",this.populate);
}
}};
dojo.global.CodeTableHierarchy=_2a;
return _2a;
});
},"dijit/_TemplatedMixin":function(){
define("dijit/_TemplatedMixin",["dojo/_base/lang","dojo/touch","./_WidgetBase","dojo/string","dojo/cache","dojo/_base/array","dojo/_base/declare","dojo/dom-construct","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(_42,_43,_44,_45,_46,_47,_48,_49,has,_4a,win){
var _4b=_48("dijit._TemplatedMixin",null,{templateString:null,templatePath:null,_skipNodeCache:false,_earlyTemplatedStartup:false,constructor:function(){
this._attachPoints=[];
this._attachEvents=[];
},_stringRepl:function(_4c){
var _4d=this.declaredClass,_4e=this;
return _45.substitute(_4c,this,function(_4f,key){
if(key.charAt(0)=="!"){
_4f=_42.getObject(key.substr(1),false,_4e);
}
if(typeof _4f=="undefined"){
throw new Error(_4d+" template:"+key);
}
if(_4f==null){
return "";
}
return key.charAt(0)=="!"?_4f:_4f.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
if(!this.templateString){
this.templateString=_46(this.templatePath,{sanitize:true});
}
var _50=_4b.getCachedTemplate(this.templateString,this._skipNodeCache);
var _51;
if(_42.isString(_50)){
_51=_49.toDom(this._stringRepl(_50));
if(_51.nodeType!=1){
throw new Error("Invalid template: "+_50);
}
}else{
_51=_50.cloneNode(true);
}
this.domNode=_51;
this.inherited(arguments);
this._attachTemplateNodes(_51,function(n,p){
return n.getAttribute(p);
});
this._beforeFillContent();
this._fillContent(this.srcNodeRef);
},_beforeFillContent:function(){
},_fillContent:function(_52){
var _53=this.containerNode;
if(_52&&_53){
while(_52.hasChildNodes()){
_53.appendChild(_52.firstChild);
}
}
},_attachTemplateNodes:function(_54,_55){
var _56=_42.isArray(_54)?_54:(_54.all||_54.getElementsByTagName("*"));
var x=_42.isArray(_54)?0:-1;
for(;x<_56.length;x++){
var _57=(x==-1)?_54:_56[x];
if(this.widgetsInTemplate&&(_55(_57,"dojoType")||_55(_57,"data-dojo-type"))){
continue;
}
var _58=_55(_57,"dojoAttachPoint")||_55(_57,"data-dojo-attach-point");
if(_58){
var _59,_5a=_58.split(/\s*,\s*/);
while((_59=_5a.shift())){
if(_42.isArray(this[_59])){
this[_59].push(_57);
}else{
this[_59]=_57;
}
this._attachPoints.push(_59);
}
}
var _5b=_55(_57,"dojoAttachEvent")||_55(_57,"data-dojo-attach-event");
if(_5b){
var _5c,_5d=_5b.split(/\s*,\s*/);
var _5e=_42.trim;
while((_5c=_5d.shift())){
if(_5c){
var _5f=null;
if(_5c.indexOf(":")!=-1){
var _60=_5c.split(":");
_5c=_5e(_60[0]);
_5f=_5e(_60[1]);
}else{
_5c=_5e(_5c);
}
if(!_5f){
_5f=_5c;
}
this._attachEvents.push(this.connect(_57,_43[_5c]||_5c,_5f));
}
}
}
}
},destroyRendering:function(){
_47.forEach(this._attachPoints,function(_61){
delete this[_61];
},this);
this._attachPoints=[];
_47.forEach(this._attachEvents,this.disconnect,this);
this._attachEvents=[];
this.inherited(arguments);
}});
_4b._templateCache={};
_4b.getCachedTemplate=function(_62,_63){
var _64=_4b._templateCache;
var key=_62;
var _65=_64[key];
if(_65){
try{
if(!_65.ownerDocument||_65.ownerDocument==win.doc){
return _65;
}
}
catch(e){
}
_49.destroy(_65);
}
_62=_45.trim(_62);
if(_63||_62.match(/\$\{([^\}]+)\}/g)){
return (_64[key]=_62);
}else{
var _66=_49.toDom(_62);
if(_66.nodeType!=1){
throw new Error("Invalid template: "+_62);
}
return (_64[key]=_66);
}
};
if(has("ie")){
_4a.addOnWindowUnload(function(){
var _67=_4b._templateCache;
for(var key in _67){
var _68=_67[key];
if(typeof _68=="object"){
_49.destroy(_68);
}
delete _67[key];
}
});
}
_42.extend(_44,{dojoAttachEvent:"",dojoAttachPoint:""});
return _4b;
});
},"curam/util/UimDialog":function(){
define("curam/util/UimDialog",["curam/util/RuntimeContext","curam/util/external","curam/util","curam/define","curam/dialog","curam/util/DialogObject"],function(_69,_6a){
curam.define.singleton("curam.util.UimDialog",{open:function(_6b,_6c,_6d){
var url=_6b+curam.util.makeQueryString(_6c);
return this.openUrl(url,_6d);
},openUrl:function(url,_6e){
var _6f=curam.util.getCacheBusterParameter();
var _70=new curam.util.DialogObject(_6f);
var _71=null;
if(_6e){
_71="width="+_6e.width+",height="+_6e.height;
}
curam.util.openModalDialog({href:this._addRpu(url)},_71,null,null,_6f);
return _70;
},_addRpu:function(url){
var _72=url;
if(curam.tab.inTabbedUI()){
var _73=curam.tab.getContentPanelIframe();
if(_73){
_72=curam.util.setRpu(url,new _69(_73.contentWindow));
}
}else{
if(_6a.inExternalApp()){
var _74=_6a.getUimParentWindow();
if(_74){
_72=curam.util.setRpu(url,new _69(_74));
}
}
}
return _72;
},get:function(){
if(curam.dialog._id==null){
throw "Dialog infrastructure not ready.";
}
return new curam.util.DialogObject(null,curam.dialog._id);
},ready:function(_75){
if(curam.dialog._id==null){
dojo.subscribe("/curam/dialog/ready",_75);
}else{
_75();
}
},_getDialogFrameWindow:function(_76){
var _77=window.top.dijit.byId(_76);
return _77.uimController.getIFrame().contentWindow;
}});
return curam.util.UimDialog;
});
},"dijit/_Templated":function(){
define("dijit/_Templated",["./_WidgetBase","./_TemplatedMixin","./_WidgetsInTemplateMixin","dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/_base/kernel"],function(_78,_79,_7a,_7b,_7c,_7d,_7e){
_7d.extend(_78,{waiRole:"",waiState:""});
return _7c("dijit._Templated",[_79,_7a],{widgetsInTemplate:false,constructor:function(){
_7e.deprecated(this.declaredClass+": dijit._Templated deprecated, use dijit._TemplatedMixin and if necessary dijit._WidgetsInTemplateMixin","","2.0");
},_attachTemplateNodes:function(_7f,_80){
this.inherited(arguments);
var _81=_7d.isArray(_7f)?_7f:(_7f.all||_7f.getElementsByTagName("*"));
var x=_7d.isArray(_7f)?0:-1;
for(;x<_81.length;x++){
var _82=(x==-1)?_7f:_81[x];
var _83=_80(_82,"waiRole");
if(_83){
_82.setAttribute("role",_83);
}
var _84=_80(_82,"waiState");
if(_84){
_7b.forEach(_84.split(/\s*,\s*/),function(_85){
if(_85.indexOf("-")!=-1){
var _86=_85.split("-");
_82.setAttribute("aria-"+_86[0],_86[1]);
}
});
}
}
}});
});
},"curam/util/DialogObject":function(){
define("curam/util/DialogObject",["curam/dialog","curam/util"],function(){
var _87=dojo.declare("curam.util.DialogObject",null,{_id:null,constructor:function(_88,id){
if(!id){
var _89=window.top.dojo.subscribe("/curam/dialog/uim/opened/"+_88,this,function(_8a){
this._id=_8a;
window.top.dojo.unsubscribe(_89);
});
}else{
this._id=id;
}
},registerBeforeCloseHandler:function(_8b){
var _8c=window.top.dojo.subscribe("/curam/dialog/BeforeClose",this,function(_8d){
if(_8d==this._id){
_8b();
}
window.top.dojo.unsubscribe(_8c);
});
},registerOnDisplayHandler:function(_8e){
if(curam.dialog._displayed==true){
_8e(curam.dialog._size);
}else{
var ut=window.top.dojo.subscribe("/curam/dialog/displayed",this,function(_8f,_90){
if(_8f==this._id){
_8e(_90);
}
window.top.dojo.unsubscribe(ut);
});
}
},close:function(_91,_92,_93){
var win=curam.util.UimDialog._getDialogFrameWindow(this._id);
var _94=win.curam.dialog.getParentWindow(win);
if(_91&&!_92){
win.curam.dialog.forceParentRefresh();
curam.dialog.doRedirect(_94,null);
}else{
if(_92){
var _95=_92;
if(_92.indexOf("Page.do")==-1){
_95=_92+"Page.do"+curam.util.makeQueryString(_93);
}
curam.dialog.doRedirect(_94,_95);
}
}
curam.dialog.closeModalDialog();
}});
return _87;
});
},"dijit/_CssStateMixin":function(){
define("dijit/_CssStateMixin",["dojo/touch","dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/_base/lang","dojo/_base/window"],function(_96,_97,_98,_99,_9a,win){
return _98("dijit._CssStateMixin",[],{cssStateNodes:{},hovering:false,active:false,_applyAttributes:function(){
this.inherited(arguments);
_97.forEach(["onmouseenter","onmouseleave",_96.press],function(e){
this.connect(this.domNode,e,"_cssMouseEvent");
},this);
_97.forEach(["disabled","readOnly","checked","selected","focused","state","hovering","active"],function(_9b){
this.watch(_9b,_9a.hitch(this,"_setStateClass"));
},this);
for(var ap in this.cssStateNodes){
this._trackMouseState(this[ap],this.cssStateNodes[ap]);
}
this._setStateClass();
},_cssMouseEvent:function(_9c){
if(!this.disabled){
switch(_9c.type){
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
var _9d=this.connect(win.body(),_96.release,function(){
this._mouseDown=false;
this._set("active",false);
this.disconnect(_9d);
});
break;
}
}
},_setStateClass:function(){
var _9e=this.baseClass.split(" ");
function _9f(_a0){
_9e=_9e.concat(_97.map(_9e,function(c){
return c+_a0;
}),"dijit"+_a0);
};
if(!this.isLeftToRight()){
_9f("Rtl");
}
var _a1=this.checked=="mixed"?"Mixed":(this.checked?"Checked":"");
if(this.checked){
_9f(_a1);
}
if(this.state){
_9f(this.state);
}
if(this.selected){
_9f("Selected");
}
if(this.disabled){
_9f("Disabled");
}else{
if(this.readOnly){
_9f("ReadOnly");
}else{
if(this.active){
_9f("Active");
}else{
if(this.hovering){
_9f("Hover");
}
}
}
}
if(this.focused){
_9f("Focused");
}
var tn=this.stateNode||this.domNode,_a2={};
_97.forEach(tn.className.split(" "),function(c){
_a2[c]=true;
});
if("_stateClasses" in this){
_97.forEach(this._stateClasses,function(c){
delete _a2[c];
});
}
_97.forEach(_9e,function(c){
_a2[c]=true;
});
var _a3=[];
for(var c in _a2){
_a3.push(c);
}
var cls=_a3.join(" ");
if(cls!=tn.className){
tn.className=cls;
}
this._stateClasses=_9e;
},_trackMouseState:function(_a4,_a5){
var _a6=false,_a7=false,_a8=false;
var _a9=this,cn=_9a.hitch(this,"connect",_a4);
function _aa(){
var _ab=("disabled" in _a9&&_a9.disabled)||("readonly" in _a9&&_a9.readonly);
_99.toggle(_a4,_a5+"Hover",_a6&&!_a7&&!_ab);
_99.toggle(_a4,_a5+"Active",_a7&&!_ab);
_99.toggle(_a4,_a5+"Focused",_a8&&!_ab);
};
cn("onmouseenter",function(){
_a6=true;
_aa();
});
cn("onmouseleave",function(){
_a6=false;
_a7=false;
_aa();
});
cn(_96.press,function(){
_a7=true;
_aa();
});
cn(_96.release,function(){
_a7=false;
_aa();
});
cn("onfocus",function(){
_a8=true;
_aa();
});
cn("onblur",function(){
_a8=false;
_aa();
});
this.watch("disabled",_aa);
this.watch("readOnly",_aa);
}});
});
},"curam/ui/UIController":function(){
define("curam/ui/UIController",["dojo/_base/lang","dojo/json","curam/util/Request","curam/define","curam/util/RuntimeContext","curam/tab/TabDescriptor","curam/util/ui/ApplicationTabbedUiController","curam/util/ResourceBundle"],function(_ac,_ad,_ae){
dojo.requireLocalization("curam.application","Debug");
var _af=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.ui.UIController",{TAB_TOPIC:"/app/tab",ROOT_OBJ:"curam.ui.UIController",PAGE_ASSOCIATIONS:{},RESOLVE_PAGES:{},PAGE_ID_PARAM_NAME:"o3pid",COMMAND_PARAM_NAME:"o3c",CACHE_BUSTER:0,CACHE_BUSTER_PARAM_NAME:"o3nocache",DUPLICATE_TAB_MAPPING_ERROR:"dupTabError",UNASSOCIATED_SHORTCUT_ERROR:"looseShortcutError",LOAD_MASK_TIMEOUT:15000,TABS_INFO_MODAL_TITLE_PROP_NAME:"title.info",TABS_ERROR_MODAL_TITLE_PROP_NAME:"title.error",TABS_INFO_MODAL_MSG_PROP_NAME:"message.max.tabs.info",TABS_ERROR_MODAL_MSG_PROP_NAME:"message.max.tabs.error",TABS_MSG_PLACEHOLDER_MAX_TABS:-1,MAX_NUM_TABS:-1,MAX_TABS_MODAL_SIZE:"width=470,height=80",initialize:function(_b0){
curam.ui.UIController._log("curam.ui.UIController.initialize()");
curam.ui.UIController._log("dojo.isQuirks: "+dojo.isQuirks);
window.rootObject=curam.ui.UIController.ROOT_OBJ;
curam.util.subscribe(curam.ui.UIController.TAB_TOPIC,curam.ui.UIController.tabTopicHandler);
curam.util.subscribe("tab.title.name.set",curam.ui.UIController.setTabTitleAndName);
if(_b0){
new curam.tab.TabSessionManager().init(_b0);
}else{
new curam.tab.TabSessionManager().init();
}
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.event"));
},ajaxPostFailure:function(err){
curam.ui.UIController._log("========= "+_af.getProperty("curam.ui.UIController.test")+" JSON "+_af.getProperty("curam.ui.UIController.servlet.failure")+" =========");
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.error")+" "+err);
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.args")+" "+ioargs);
curam.ui.UIController._log("============================================");
},instantiateTab:function(_b1,_b2,_b3){
var _b4=dijit.byId(_b2);
if(_b4){
curam.util.getTopmostWindow().dojo.publish("/curam/application/tab/requested",[_b2]);
var td=_b4.tabDescriptor;
var _b5="'"+td.tabID+"/"+_b2+"'";
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.instantiating")+" "+_b5+" "+_af.getProperty("curam.ui.UIController.with.signature"));
td.setTabSignature(_b1,_b4.uimPageRequest);
var _b6=function(){
var _b7=dojo.query("#"+_b2+" .tab-wrapper .tab-load-mask")[0];
if(_b7&&dojo.style(_b7,"display")!="none"){
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.revealing")+" "+_b5+" "+_af.getProperty("curam.ui.UIController.now"));
dojo.style(_b7,"display","none");
curam.util.getTopmostWindow().dojo.publish("/curam/application/tab/revealed",[_b2]);
}
};
if(!_b3){
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.no.details"));
_b6();
}else{
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.has.details")+_b5+_af.getProperty("curam.ui.UIController.listeners"));
dojo.global.tabLoadMaskTimeout=setTimeout(_b6,curam.ui.UIController.LOAD_MASK_TIMEOUT);
var _b8=false;
var _b9=function(){
if(_b8){
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.panels.loaded"));
_b6();
clearTimeout(dojo.global.tabLoadMaskTimeout);
}else{
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.panels.not.loaded")+" "+_b5+" "+_af.getProperty("curam.ui.UIController.later"));
_b8=true;
}
};
var _ba=dojo.connect(_b4,"onDownloadEnd",function(){
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.content.pane.loaded")+" "+_af.getProperty("curam.ui.UIController.reveal")+" "+_b5+" "+_af.getProperty("curam.ui.UIController.now"));
_b9();
dojo.disconnect(_ba);
});
var _bb=curam.util.getTopmostWindow().dojo.subscribe("/curam/frame/detailsPanelLoaded",function(_bc,_bd){
if(_b2==_bd){
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.details.panel.loaded")+" "+_b5+" "+ +_af.getProperty("curam.ui.UIController.now"));
_b9();
dojo.unsubscribe(_bb);
}
});
}
var _be=curam.tab.getHandlerForTab(function(_bf,_c0){
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.content.pane.changed")+" "+_b5+" "+_af.getProperty("curam.ui.UIController.now"));
curam.ui.UIController._contentPanelUpdated(_b4);
},_b2);
var _c1=curam.util.getTopmostWindow().dojo.subscribe("/curam/main-content/page/loaded",null,_be);
curam.tab.unsubscribeOnTabClose(_c1,_b2);
}else{
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.tab.not.found")+" '"+_b2+"'.");
}
},_contentPanelUpdated:function(tab){
var _c2=curam.tab.getContentPanelIframe(tab);
tab.tabDescriptor.setTabContent(new curam.ui.PageRequest(_c2.src),null);
},getCacheBusterParameter:function(){
return curam.ui.UIController.CACHE_BUSTER_PARAM_NAME+"="+new Date().getTime()+"_"+curam.ui.UIController.CACHE_BUSTER++;
},_getTabbedUiApi:function(_c3){
var _c4=curam.ui.UIController._selectSection(_c3);
return new curam.util.ui.ApplicationTabbedUiController(_c4);
},_selectSection:function(_c5){
var _c6=_c5?!_c5.openInBackground:true;
var _c7=dijit.byId(curam.tab.SECTION_TAB_CONTAINER_ID);
var _c8=_c5?_c5.tabDescriptor.sectionID:curam.tab.getCurrentSectionId();
var _c9=dijit.byId(_c8+"-sbc");
var _ca=curam.tab.getTabContainer(_c8);
if(_c6){
if(_c9){
_c7.selectChild(_c9);
}else{
_c7.selectChild(_ca);
}
}
return _ca;
},tabTopicHandler:function(_cb){
var api=curam.ui.UIController._getTabbedUiApi(_cb);
curam.ui.UIController._doHandleTabEvent(_cb,api);
},_doHandleTabEvent:function(_cc,_cd){
var _ce=_cc.tabDescriptor;
var _cf=_ce.sectionID;
var _d0=curam.tab.getTabContainer(_cf);
var _d1=curam.util.getTopmostWindow().dojo;
var _d2=false;
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.fired")+" "+_cf+" : "+_ce.tabID+" : "+_cc.uimPageRequest.pageID);
var tab=_cd.findOpenTab(_cc);
if(tab===null&&_ac.exists("selectedChildWidget.tabDescriptor.isHomePage",_d0)&&_d0.selectedChildWidget.tabDescriptor.isHomePage===true&&_d0.selectedChildWidget.tabDescriptor.tabID===_cc.tabDescriptor.tabID){
tab=_d0.selectedChildWidget;
}
if(!tab){
if(_d0==undefined){
return false;
}
var _d3=_d0.getChildren().length+1;
var _d4=this.MAX_NUM_TABS;
var _d5=this._checkMaxNumOpenTabsExceeded(_d4,_d3);
if(_d5){
return true;
}
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.creating"));
tab=_cd.createTab(_cc);
tab.connect(tab,"onLoad",function(){
var _d6=curam.tab.getContentPanelIframe(tab);
dojo.attr(_d6,"src",dojo.attr(_d6,"data-content-url"));
_d1.publish("/curam/application/tab/ready",[tab]);
});
_d2=true;
}
if(_d2){
var _d7=_cd.insertTabIntoApp(tab,_cc.uimPageRequest.isHomePage);
if(!_cc.openInBackground){
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.new.fore.tab"),tab.tabDescriptor);
_cd.selectTab(tab);
if(_d7!=null){
_cd.selectTab(_d7);
}
}else{
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.new.back.tab"),tab.tabDescriptor);
}
this._checkMaxNumOpenTabsReached(_d4,_d3);
}else{
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.show.page"),tab.tabDescriptor);
_cd.selectTab(tab);
if(_cc.uimPageRequest.justRefresh){
_cd.refreshExistingPageInTab(tab);
}else{
if(_cc.uimPageRequest.forceLoad){
_cd.openPageInCurrentTab(_cc.uimPageRequest);
}else{
var _d8=tab.tabDescriptor;
var _d9=_d8.tabID==_cc.tabDescriptor.tabID&&_d8.matchesPageRequest(_cc.uimPageRequest);
var _da=_d8.tabContent.pageID==_cc.uimPageRequest.pageID;
if(_d9&&!_da){
_cd.openPageInCurrentTab(_cc.uimPageRequest);
}
}
}
}
return true;
},_checkMaxNumOpenTabsReached:function(_db,_dc){
if(_dc==_db){
this.TABS_MSG_PLACEHOLDER_MAX_TABS=_db;
curam.util.openGenericErrorModalDialog(this.MAX_TABS_MODAL_SIZE,this.TABS_INFO_MODAL_TITLE_PROP_NAME,this.TABS_INFO_MODAL_MSG_PROP_NAME,this.TABS_MSG_PLACEHOLDER_MAX_TABS,false);
return true;
}
},_checkMaxNumOpenTabsExceeded:function(_dd,_de){
if(_de>_dd){
this.TABS_MSG_PLACEHOLDER_MAX_TABS=_dd;
curam.util.openGenericErrorModalDialog(this.MAX_TABS_MODAL_SIZE,this.TABS_ERROR_MODAL_TITLE_PROP_NAME,this.TABS_ERROR_MODAL_MSG_PROP_NAME,this.TABS_MSG_PLACEHOLDER_MAX_TABS,true);
return true;
}
},checkPage:function(_df,_e0){
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.checking.page")+" '"+_df.pageID+"'.");
if(_df.pageID==""){
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.ignoring")+" "+_df.getURL());
return;
}
var _e1=curam.ui.UIController._ensurePageAssociationInitialized(_df,function(){
if(curam.ui.UIController.isPageAssociationInitialized(_df.pageID,curam.ui.UIController.PAGE_ASSOCIATIONS)){
curam.ui.UIController.checkPage(_df,_e0);
}else{
var msg=_af.getProperty("curam.ui.UIController.failed");
curam.ui.UIController._log(msg);
throw new Error(msg);
}
});
if(_e1){
try{
var _e2=curam.ui.UIController.getTabDescriptorForPage(_df.pageID,curam.ui.UIController.PAGE_ASSOCIATIONS);
if(_e2!=null){
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.page.opened")+" '"+_df.pageID+"'. "+_af.getProperty("curam.ui.UIController.sec.id")+" '"+_e2.sectionID+"'. "+_af.getProperty("curam.ui.UIController.tab.id")+" '"+_e2.tabID+"'.");
if(_df.isHomePage){
_e2.isHomePage=true;
}
_e2.setTabContent(_df);
dojo.publish(curam.ui.UIController.TAB_TOPIC,[new curam.ui.OpenTabEvent(_e2,_df)]);
}else{
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.page.id")+" '"+_df.pageID+"'.");
if(!_e0){
if(typeof curam.tab.getSelectedTab()=="undefined"){
throw {name:curam.ui.UIController.UNASSOCIATED_SHORTCUT_ERROR,message:"ERROR:The requested page "+_df.pageID+" is not associated with any tab and there is no "+"tab to open it!"};
}
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.load"));
curam.ui.UIController._getTabbedUiApi().openPageInCurrentTab(_df);
}else{
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.unmapped"));
_e0(_df);
}
}
}
catch(e){
if(e.name==curam.ui.UIController.DUPLICATE_TAB_MAPPING_ERROR){
alert(e.message);
curam.ui.UIController._getTabbedUiApi().openPageInCurrentTab(_df);
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
},isPageAssociationInitialized:function(_e3,_e4){
var _e5=_e4[_e3];
return !(typeof _e5=="undefined");
},_ensurePageAssociationInitialized:function(_e6,_e7){
if(!curam.ui.UIController.isPageAssociationInitialized(_e6.pageID,curam.ui.UIController.PAGE_ASSOCIATIONS)){
var _e8="/config/tablayout/associated["+_e6.pageID+"]["+USER_APPLICATION_ID+"]";
new curam.ui.ClientDataAccessor().getRaw(_e8,function(_e9){
curam.ui.UIController.initializePageAssociations(_e6,_e9);
_e7();
},function(_ea,_eb){
var msg=curam_ui_UIController_data_error+" "+_ea;
curam.ui.UIController._log(msg);
if(!curam.ui.UIController._isLoginPage(_eb.xhr)){
alert(msg);
}
curam.util.getTopmostWindow().location.reload(true);
},null);
return false;
}
return true;
},_isLoginPage:function(_ec){
return _ec.responseText.indexOf("action=\"j_security_check\"")>0;
},initializePageAssociations:function(_ed,_ee){
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.got.assoc")+" '"+_ed.pageID+"'.");
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.assoc"),_ee);
if(_ee){
if(_ee.tabIDs&&_ee.tabIDs.length>0){
curam.ui.UIController.PAGE_ASSOCIATIONS[_ed.pageID]=_ee;
}else{
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.no.mappings")+" '"+_ed.pageID+"'.");
curam.ui.UIController.PAGE_ASSOCIATIONS[_ed.pageID]=null;
}
}else{
throw "initializePageAssociations did not recieve a valid response.";
}
},getTabDescriptorForPage:function(_ef,_f0){
var _f1=_f0[_ef];
if(!curam.ui.UIController.isPageAssociationInitialized(_ef,_f0)){
throw "Page associations have not been initialized for: "+_ef;
}
if(_f1!=null){
var _f2=curam.ui.UIController.getTabFromMappings(_f1.tabIDs,curam.tab.getSelectedTab());
return new curam.tab.TabDescriptor(_f1.sectionID,_f2);
}else{
return null;
}
},getTabFromMappings:function(_f3,_f4){
if(!_f4){
if(_f3.length==1){
return _f3[0];
}else{
if(_f3.length>1){
throw "Home page mapped to multiple tabs";
}
}
}
var _f5=_f4.tabDescriptor.tabID;
for(var i=0;i<_f3.length;i++){
if(_f5==_f3[i]){
return _f5;
}
}
if(_f3.length==1){
return _f3[0];
}else{
if(_f3.length>1){
throw {name:curam.ui.UIController.DUPLICATE_TAB_MAPPING_ERROR,message:"ERROR: The page that you are trying to link to is associated with "+"multiple tabs: ["+_f3.toString()+"]. Therefore the "+"tab to open cannot be determined and the page will open in the "+"current tab. Please report this error.",tabID:_f5};
}else{
}
}
},handleUIMPageID:function(_f6,_f7){
var _f8=_f7?true:false;
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.handling.uim")+" '"+_f6+"'. Page is "+(_f8?"":"not ")+_af.getProperty("curam.ui.UIController.default.sec"));
curam.ui.UIController.handlePageRequest(new curam.ui.PageRequest(_f6+"Page.do",_f8));
},processURL:function(url){
var _f9=new curam.ui.PageRequest(url);
curam.ui.UIController.handlePageRequest(_f9);
},handlePageRequest:function(_fa){
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.handling.page")+" '"+_fa.pageID+"'. "+_af.getProperty("curam.ui.UIController.panel.will")+(_fa.forceRefresh?"":_af.getProperty("curam.ui.UIController.not"))+_af.getProperty("curam.ui.UIController.reload"));
var _fb=curam.ui.UIController.checkResolvePage(_fa,_fa.forceRefresh);
if(_fb==true){
curam.ui.UIController.checkPage(_fa);
}
},checkResolvePage:function(_fc,_fd){
if(_fd){
return true;
}
var _fe=curam.ui.UIController.RESOLVE_PAGES[_fc.pageID];
if(_fe==false){
return true;
}else{
var _ff;
if(_fc.getURL().indexOf("?")==-1){
_ff="?";
}else{
_ff="&";
}
var loc=curam.config?curam.config.locale+"/":"";
_ae.post({url:loc+_fc.getURL()+_ff+"o3resolve=true",handleAs:"text",preventCache:true,load:dojo.hitch(curam.ui.UIController,"resolvePageCheckSuccess",_fc),error:dojo.hitch(curam.ui.UIController,"resolvePageCheckFailure",_fc)});
return false;
}
},resolvePageCheckSuccess:function(_100,_101,_102){
var _103=false;
var _104;
var _105;
var _106;
if(_101.substring(2,0)=="{\""&&_101.charAt(_101.length-1)=="}"){
_103=true;
_101=_ad.parse(_101,true);
_104=_101.pageID;
_105=_101.pageURL;
}else{
_103=false;
}
if(_103&&_100.pageID!=_104){
curam.ui.UIController.RESOLVE_PAGES[_100.pageID]=true;
_105=_105.replace("&amp;o3resolve=true","");
_105=_105.replace("&o3resolve=true","");
_105=_105.replace("o3resolve=true","");
for(paramName in _100.cdejParameters){
if(paramName.length>0&&paramName.indexOf("__o3")!=-1){
if(_105.indexOf("?")==-1){
_105+="?"+paramName+"="+encodeURIComponent(_100.cdejParameters[paramName]);
}else{
_105+="&"+paramName+"="+encodeURIComponent(_100.cdejParameters[paramName]);
}
}
}
_106=new curam.ui.PageRequest(_105);
}else{
curam.ui.UIController.RESOLVE_PAGES[_100.pageID]=false;
_106=_100;
}
curam.ui.UIController.checkPage(_106);
},resolvePageCheckFailure:function(_107,_108,_109){
curam.ui.UIController.RESOLVE_PAGES[_107.pageID]=false;
curam.ui.UIController.checkPage(_107);
},setTabTitleAndName:function(_10a,_10b,_10c){
var tab=curam.tab.getContainerTab(_10a);
if(tab){
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.changing.tab")+" '"+_10b+"', '"+_10c+"'. "+_af.getProperty("curam.ui.UIController.descriptor.before"),tab.tabDescriptor);
dojo.query("span.detailsTitleText",tab.domNode)[0].innerHTML=_10b;
var _10d=dojo.query("span.detailsTitleText",tab.domNode)[0];
_10d.setAttribute("title",_10b);
tab.set("title",_10c);
dojo.publish("tab.title.name.finished");
}else{
curam.ui.UIController._log(_af.getProperty("curam.ui.UIController.cannot.change")+" '"+_10b+"', '"+_10c+"'. "+_af.getProperty("curam.ui.UIController.iframe")+" '"+_10a.id+"'.");
}
},handleLinkClick:function(_10e,_10f){
curam.ui.UIController._doHandleLinkClick(_10e,_10f,curam.tab.getContentPanelIframe(),curam.ui.UIController.handlePageRequest,curam.util.openModalDialog);
},_doHandleLinkClick:function(_110,_111,_112,_113,_114){
var _115=_110;
if(_112){
var rtc=new curam.util.RuntimeContext(_112.contentWindow);
var _116=null;
if(_111){
_116=[{key:"o3frame",value:"modal"}];
}
_115=curam.util.setRpu(_110,rtc,_116);
}
if(_111&&curam.config&&curam.config.modalsEnabled!="false"){
var _117=_111.openDialogFunction||_114;
var _118=_111.args||[{href:_115},_111.dialogOptions];
_117.apply(this,_118);
}else{
var _119=new curam.ui.PageRequest(_115);
_113(_119);
}
},handleDownLoadClickLegacy:function(_11a){
require(["dojo/io/iframe"]);
var _11b=dojo.io.iframe.create("o3lrm_frame","");
_11b.src=location.href.substring(0,location.href.lastIndexOf("/"))+decodeURIComponent(_11a.replace(/\+/g," "));
return;
},handleDownLoadClick:function(_11c){
var _11d=curam.tab.getContentPanelIframe();
_11d.src=location.href.substring(0,location.href.lastIndexOf("/"))+decodeURIComponent(_11c.replace(/\+/g," "))+"&"+jsScreenContext.toRequestString();
return;
},_log:function(msg,_11e){
if(curam.debug.enabled()){
curam.debug.log("UI CONTROLLER: "+msg+(_11e?" "+dojo.toJson(_11e):""));
}
}});
return curam.ui.UIController;
});
},"dijit/DialogUnderlay":function(){
define("dijit/DialogUnderlay",["dojo/_base/declare","dojo/dom-attr","dojo/_base/window","dojo/window","./_Widget","./_TemplatedMixin","./BackgroundIframe"],function(_11f,_120,win,_121,_122,_123,_124){
return _11f("dijit.DialogUnderlay",[_122,_123],{templateString:"<div class='dijitDialogUnderlayWrapper'><div class='dijitDialogUnderlay' data-dojo-attach-point='node'></div></div>",dialogId:"","class":"",_setDialogIdAttr:function(id){
_120.set(this.node,"id",id+"_underlay");
this._set("dialogId",id);
},_setClassAttr:function(_125){
this.node.className="dijitDialogUnderlay "+_125;
this._set("class",_125);
},postCreate:function(){
win.body().appendChild(this.domNode);
},layout:function(){
var is=this.node.style,os=this.domNode.style;
os.display="none";
var _126=_121.getBox();
os.top=_126.t+"px";
os.left=_126.l+"px";
is.width=_126.w+"px";
is.height=_126.h+"px";
os.display="block";
},show:function(){
this.domNode.style.display="block";
this.layout();
this.bgIframe=new _124(this.domNode);
},hide:function(){
this.bgIframe.destroy();
delete this.bgIframe;
this.domNode.style.display="none";
}});
});
},"dijit/layout/ScrollingTabController":function(){
require({cache:{"url:dijit/layout/templates/ScrollingTabController.html":"<div class=\"dijitTabListContainer-${tabPosition} tabStrip-disabled dijitLayoutContainer\"><!-- CURAM-FIX: removed style=\"visibility:hidden, dd the tabStrip-disabled class by default.\" -->\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerMenuButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_menuBtn\"\r\n\t\t\tdata-dojo-props=\"containerId: '${containerId}', iconClass: 'dijitTabStripMenuIcon',\r\n\t\t\t\t\tdropDownPosition: ['below-alt', 'above-alt']\"\r\n\t\t\tdata-dojo-attach-point=\"_menuBtn\" showLabel=\"false\" title=\"\">&#9660;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_leftBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideLeftIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_leftBtn\" data-dojo-attach-event=\"onClick: doSlideLeft\">&#9664;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_rightBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideRightIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_rightBtn\" data-dojo-attach-event=\"onClick: doSlideRight\">&#9654;</div>\r\n\t<div class='dijitTabListWrapper dijitTabContainerTopNone dijitAlignClient' data-dojo-attach-point='tablistWrapper'>\r\n\t\t<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'\r\n\t\t\t\tdata-dojo-attach-point='containerNode' class='nowrapTabStrip dijitTabContainerTop-tabs'></div>\r\n\t</div>\r\n</div>\r\n","url:dijit/layout/templates/_ScrollingTabControllerButton.html":"<div data-dojo-attach-event=\"onclick:_onClick\">\n\t<div role=\"presentation\" class=\"dijitTabInnerDiv\" data-dojo-attach-point=\"innerDiv,focusNode\">\n\t\t<div role=\"presentation\" class=\"dijitTabContent dijitButtonContents\" data-dojo-attach-point=\"tabContent\">\n\t\t\t<img role=\"presentation\" alt=\"\" src=\"${_blankGif}\" class=\"dijitTabStripIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t\t<span data-dojo-attach-point=\"containerNode,titleNode\" class=\"dijitButtonText\"></span>\n\t\t</div>\n\t</div>\n</div>"}});
define("dijit/layout/ScrollingTabController",["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/fx","dojo/_base/lang","dojo/query","dojo/_base/sniff","../registry","dojo/text!./templates/ScrollingTabController.html","dojo/text!./templates/_ScrollingTabControllerButton.html","./TabController","./utils","../_WidgetsInTemplateMixin","../Menu","../MenuItem","../form/Button","../_HasDropDown","dojo/NodeList-dom"],function(_127,_128,_129,_12a,_12b,fx,lang,_12c,has,_12d,_12e,_12f,_130,_131,_132,Menu,_133,_134,_135){
var _136=_128("dijit.layout.ScrollingTabController",[_130,_132],{baseClass:"dijitTabController dijitScrollingTabController",templateString:_12e,useMenu:true,useSlider:true,tabStripClass:"",widgetsInTemplate:true,_minScroll:5,_setClassAttr:{node:"containerNode",type:"class"},_tabsWidth:-1,_tablistMenuItemIdSuffix:"_stcMi",buildRendering:function(){
this.inherited(arguments);
var n=this.domNode;
this.scrollNode=this.tablistWrapper;
this._initButtons();
if(!this.tabStripClass){
this.tabStripClass="dijitTabContainer"+this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"")+"None";
_129.add(n,"tabStrip-disabled");
}
_129.add(this.tablistWrapper,this.tabStripClass);
},onStartup:function(){
this.inherited(arguments);
this._postStartup=true;
},onAddChild:function(page,_137){
this.inherited(arguments);
var _138=page.id;
this.bustSizeCache=true;
this._tabsWidth=-1;
_127.forEach(["label","iconClass"],function(attr){
this.pane2watches[page.id].push(this.pane2button[page.id].watch(attr,lang.hitch(this,function(){
if(this._postStartup&&this._dim){
this.resize(this._dim);
}
if(this._dim){
this.bustSizeCache=true;
this._tabsWidth=-1;
this.pane2button[_138].domNode._width=0;
}
})));
},this);
var _139=function(pid,_13a){
var _13b=null;
if(_13a._menuBtn.dropDown){
var _13c=dojo.query(pid+_13a._tablistMenuItemIdSuffix,_13a._menuBtn.dropDown.domNode)[0];
if(_13c){
_13b=dijit.byNode(_13c);
}
}
return _13b;
};
this.pane2button[_138].connect(this.pane2button[_138],"_setCuramVisibleAttr",lang.hitch(this,function(){
var _13d=_139(_138,this);
if(_13d){
this._setCuramVisibility(_13d,_138);
}
}));
this.pane2button[_138].connect(this.pane2button[_138],"_setCuramDisabledAttr",lang.hitch(this,function(){
var _13e=_139(_138,this);
if(_13e){
this._setCuramAvailability(_13e,_138);
}
}));
_12b.set(this.containerNode,"width",(_12b.get(this.containerNode,"width")+200)+"px");
},_setCuramVisibility:function(_13f,_140){
var _141=this.pane2button[_140].curamVisible;
if(_141){
dojo.replaceClass(_13f.domNode,"visible","hidden");
}else{
dojo.replaceClass(_13f.domNode,"hidden","visible");
}
},_setCuramAvailability:function(_142,_143){
var _144=!this.pane2button[_143].curamDisabled;
_142.disabled=!_144;
if(_144){
dojo.replaceClass(_142.domNode,"enabled","disabled");
}else{
dojo.replaceClass(_142.domNode,"disabled","enabled");
}
},_getNodeWidth:function(node){
if(!node._width){
node._width=dojo.style(node,"width");
}
return node._width;
},destroyRendering:function(_145){
_127.forEach(this._attachPoints,function(_146){
delete this[_146];
},this);
this._attachPoints=[];
_127.forEach(this._attachEvents,this.disconnect,this);
this.attachEvents=[];
},destroy:function(){
if(this._menuBtn){
this._menuBtn._curamOwnerController=null;
}
this.inherited(arguments);
},onRemoveChild:function(page,_147){
var _148=this.pane2button[page.id];
if(this._selectedTab===_148.domNode){
this._selectedTab=null;
}
this.inherited(arguments);
this.bustSizeCache=true;
this._tabsWidth=-1;
},_initButtons:function(){
this.subscribe("tab.title.name.finished",this._measureBtns);
this._btnWidth=0;
this._buttons=_12c("> .tabStripButton",this.domNode).filter(function(btn){
if((this.useMenu&&btn==this._menuBtn.domNode)||(this.useSlider&&(btn==this._rightBtn.domNode||btn==this._leftBtn.domNode))){
this._btnWidth+=_12a.getMarginBoxSimple(btn).w;
return true;
}else{
_12b.set(btn,"display","none");
return false;
}
},this);
this._menuBtn._curamOwnerController=this;
},_getTabsWidth:function(){
if(this._tabsWidth>-1){
return this._tabsWidth;
}
var _149=this.getChildren();
if(_149.length){
var _14a=_149[this.isLeftToRight()?_149.length-1:0].domNode;
var _14b=this._getNodeWidth(_14a);
this._tabsWidth=_14a.offsetLeft+_14b;
return this._tabsWidth;
}else{
return 0;
}
},_enableBtn:function(_14c){
var _14d=this._getTabsWidth();
_14c=_14c||_12b.get(this.scrollNode,"width");
return _14d>0&&_14c<_14d;
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
var cb=this._contentBox=_131.marginBox2contentBox(this.domNode,{h:0,w:dim.w});
cb.h=this.scrollNodeHeight;
_12a.setContentSize(this.domNode,cb);
var _14e=this._enableBtn(this._contentBox.w);
this._buttons.style("display",_14e?"":"none");
this._leftBtn.layoutAlign="left";
this._rightBtn.layoutAlign="right";
this._menuBtn.layoutAlign=this.isLeftToRight()?"right":"left";
var _14f;
if(_14e){
_14f=dijit.layout.layoutChildren(this.domNode,this._contentBox,[this._menuBtn,this._leftBtn,this._rightBtn,{domNode:this.scrollNode,layoutAlign:"client",fakeWidget:true}]);
}else{
_14f=dijit.layout.layoutChildren(this.domNode,this._contentBox,[{domNode:this.scrollNode,layoutAlign:"client",fakeWidget:true}]);
}
this.scrollNode._width=_14f.client.w;
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
return (this.isLeftToRight()||has("ie")<8||(has("ie")&&has("quirks"))||has("webkit"))?this.scrollNode.scrollLeft:_12b.get(this.containerNode,"width")-_12b.get(this.scrollNode,"width")+(has("ie")==8?-1:1)*this.scrollNode.scrollLeft;
},_convertToScrollLeft:function(val){
if(this.isLeftToRight()||has("ie")<8||(has("ie")&&has("quirks"))||has("webkit")){
return val;
}else{
var _150=_12b.get(this.containerNode,"width")-_12b.get(this.scrollNode,"width");
return (has("ie")==8?-1:1)*(val-_150);
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
var _151=this._getNodeWidth(this.scrollNode);
if(this._getTabsWidth()<_151){
tab.onClick(null);
}else{
var sl=this._getScroll();
if(sl>node.offsetLeft||sl+_151<node.offsetLeft+this._getNodeWidth(node)){
this.createSmoothScroll().play();
}
}
}
}
this.inherited(arguments);
},_getScrollBounds:function(){
var _152=this.getChildren(),_153=this._getNodeWidth(this.scrollNode),_154=this._getNodeWidth(this.containerNode),_155=_154-_153,_156=this._getTabsWidth();
if(_152.length&&_156>_153){
return {min:this.isLeftToRight()?0:this._getNodeWidth(_152[_152.length-1].domNode),max:this.isLeftToRight()?_156-_153:_155};
}else{
var _157=this.isLeftToRight()?0:_155;
return {min:_157,max:_157};
}
},_getScrollForSelectedTab:function(){
var w=this.scrollNode,n=this._selectedTab,_158=_12b.get(this.scrollNode,"width"),_159=this._getScrollBounds();
var pos=(n.offsetLeft+_12b.get(n,"width")/2)-_158/2;
pos=Math.min(Math.max(pos,_159.min),_159.max);
return pos;
},createSmoothScroll:function(x){
if(arguments.length>0){
var _15a=this._getScrollBounds();
x=Math.min(Math.max(x,_15a.min),_15a.max);
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
while(n&&!_129.contains(n,"tabStripButton")){
n=n.parentNode;
}
return n;
},doSlideRight:function(e){
this.doSlide(1,this._getBtnNode(e));
},doSlideLeft:function(e){
this.doSlide(-1,this._getBtnNode(e));
},doSlide:function(_15b,node){
if(node&&_129.contains(node,"dijitTabDisabled")){
return;
}
var _15c=_12b.get(this.scrollNode,"width");
var d=(_15c*0.75)*_15b;
var to=this._getScroll()+d;
this._setButtonClass(to);
this.createSmoothScroll(to).play();
},_setButtonClass:function(_15d){
var _15e=this._getScrollBounds();
this._leftBtn.set("disabled",_15d<=_15e.min);
this._rightBtn.set("disabled",_15d>=_15e.max);
}});
var _15f=_128("dijit.layout._ScrollingTabControllerButtonMixin",null,{baseClass:"dijitTab tabStripButton",templateString:_12f,tabIndex:"",isFocusable:function(){
return false;
}});
_128("dijit.layout._ScrollingTabControllerButton",[_134,_15f]);
_128("dijit.layout._ScrollingTabControllerMenuButton",[_134,_135,_15f],{containerId:"",tabIndex:"-1",isLoaded:function(){
return false;
},loadDropDown:function(_160){
this.dropDown=new Menu({id:this.containerId+"_menu",dir:this.dir,lang:this.lang,textDir:this.textDir});
var _161=_12d.byId(this.containerId);
_127.forEach(_161.getChildren(),function(page){
var _162=new _133({id:page.id+"_stcMi",label:page.title,iconClass:page.iconClass,dir:page.dir,lang:page.lang,textDir:page.textDir,onClick:function(){
_161.selectChild(page);
}});
this.dropDown.addChild(_162);
},this);
dojo.forEach(this.dropDown.getChildren(),lang.hitch(this,function(_163){
var _164=_163.id.split(this._curamOwnerController._tablistMenuItemIdSuffix)[0];
this._curamOwnerController._setCuramAvailability(_163,_164);
this._curamOwnerController._setCuramVisibility(_163,_164);
dojo.connect(_163,"destroy",function(){
setDynState=null;
});
}));
_160();
},closeDropDown:function(_165){
this.inherited(arguments);
if(this.dropDown){
this.dropDown.destroyRecursive();
delete this.dropDown;
}
}});
return _136;
});
},"url:dijit/form/templates/ComboButton.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" data-dojo-attach-point=\"buttonNode\" data-dojo-attach-event=\"ondijitclick:_onClick,onkeypress:_onButtonKeyPress\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" data-dojo-attach-point=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdata-dojo-attach-point=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdata-dojo-attach-event=\"onkeypress:_onArrowKeyPress\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" data-dojo-attach-point=\"valueNode\"\n\t\t/></td></tr></tbody\n></table>\n","dijit/place":function(){
define("dijit/place",["dojo/_base/array","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/window","dojo/window",".","dojo/_base/lang"],function(_166,_167,_168,_169,win,_16a,_16b,lang){
function _16c(node,_16d,_16e,_16f){
var view=_16a.getBox();
if(!node.parentNode||String(node.parentNode.tagName).toLowerCase()!="body"){
win.body().appendChild(node);
}
var best=null;
_166.some(_16d,function(_170){
var _171=_170.corner;
var pos=_170.pos;
var _172=0;
var _173={w:{"L":view.l+view.w-pos.x,"R":pos.x-view.l,"M":view.w}[_171.charAt(1)],h:{"T":view.t+view.h-pos.y,"B":pos.y-view.t,"M":view.h}[_171.charAt(0)]};
if(_16e){
var res=_16e(node,_170.aroundCorner,_171,_173,_16f);
_172=typeof res=="undefined"?0:res;
}
var _174=node.style;
var _175=_174.display;
var _176=_174.visibility;
if(_174.display=="none"){
_174.visibility="hidden";
_174.display="";
}
var mb=_167.getMarginBox(node);
_174.display=_175;
_174.visibility=_176;
var _177={"L":pos.x,"R":pos.x-mb.w,"M":Math.max(view.l,Math.min(view.l+view.w,pos.x+(mb.w>>1))-mb.w)}[_171.charAt(1)],_178={"T":pos.y,"B":pos.y-mb.h,"M":Math.max(view.t,Math.min(view.t+view.h,pos.y+(mb.h>>1))-mb.h)}[_171.charAt(0)],_179=Math.max(view.l,_177),_17a=Math.max(view.t,_178),endX=Math.min(view.l+view.w,_177+mb.w),endY=Math.min(view.t+view.h,_178+mb.h),_17b=endX-_179,_17c=endY-_17a;
_172+=(mb.w-_17b)+(mb.h-_17c);
if(lang.exists("curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm")&&curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm==true){
if((_171.charAt(0)=="T"||_171.charAt(1)=="L")&&_172>0){
_172=mb.w+mb.h;
}
}
if(best==null||_172<best.overflow){
best={corner:_171,aroundCorner:_170.aroundCorner,x:_179,y:_17a,w:_17b,h:_17c,overflow:_172,spaceAvailable:_173};
}
return !_172;
});
if(best.overflow&&_16e){
_16e(node,best.aroundCorner,best.corner,best.spaceAvailable,_16f);
}
var l=_167.isBodyLtr(),s=node.style;
s.top=best.y+"px";
s[l?"left":"right"]=(l?best.x:view.w-best.x-best.w)+"px";
s[l?"right":"left"]="auto";
return best;
};
return (_16b.place={at:function(node,pos,_17d,_17e){
var _17f=_166.map(_17d,function(_180){
var c={corner:_180,pos:{x:pos.x,y:pos.y}};
if(_17e){
c.pos.x+=_180.charAt(1)=="L"?_17e.x:-_17e.x;
c.pos.y+=_180.charAt(0)=="T"?_17e.y:-_17e.y;
}
return c;
});
return _16c(node,_17f);
},around:function(node,_181,_182,_183,_184){
var _185=(typeof _181=="string"||"offsetWidth" in _181)?_167.position(_181,true):_181;
if(_181.parentNode){
var _186=_168.getComputedStyle(_181).position=="absolute";
var _187=_181.parentNode;
while(_187&&_187.nodeType==1&&_187.nodeName!="BODY"){
var _188=_167.position(_187,true),pcs=_168.getComputedStyle(_187);
if(/relative|absolute/.test(pcs.position)){
_186=false;
}
if(!_186&&/hidden|auto|scroll/.test(pcs.overflow)){
var _189=Math.min(_185.y+_185.h,_188.y+_188.h);
var _18a=Math.min(_185.x+_185.w,_188.x+_188.w);
_185.x=Math.max(_185.x,_188.x);
_185.y=Math.max(_185.y,_188.y);
_185.h=_189-_185.y;
_185.w=_18a-_185.x;
}
if(pcs.position=="absolute"){
_186=true;
}
_187=_187.parentNode;
}
}
var x=_185.x,y=_185.y,_18b="w" in _185?_185.w:(_185.w=_185.width),_18c="h" in _185?_185.h:(_169.deprecated("place.around: dijit.place.__Rectangle: { x:"+x+", y:"+y+", height:"+_185.height+", width:"+_18b+" } has been deprecated.  Please use { x:"+x+", y:"+y+", h:"+_185.height+", w:"+_18b+" }","","2.0"),_185.h=_185.height);
var _18d=[];
function push(_18e,_18f){
_18d.push({aroundCorner:_18e,corner:_18f,pos:{x:{"L":x,"R":x+_18b,"M":x+(_18b>>1)}[_18e.charAt(1)],y:{"T":y,"B":y+_18c,"M":y+(_18c>>1)}[_18e.charAt(0)]}});
};
_166.forEach(_182,function(pos){
var ltr=_183;
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
var _190=_16c(node,_18d,_184,{w:_18b,h:_18c});
_190.aroundNodePos=_185;
return _190;
}});
});
},"dijit/_HasDropDown":function(){
define("dijit/_HasDropDown",["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/keys","dojo/_base/lang","dojo/touch","dojo/_base/window","dojo/window","./registry","./focus","./popup","./_FocusMixin"],function(_191,_192,_193,dom,_194,_195,_196,_197,has,keys,lang,_198,win,_199,_19a,_19b,_19c,_19d){
return _191("dijit._HasDropDown",_19d,{_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:true,forceWidth:false,maxHeight:0,dropDownPosition:["below","above"],_stopClickEvents:true,_onDropDownMouseDown:function(e){
if(this.disabled||this.readOnly){
return;
}
e.preventDefault();
this._docHandler=this.connect(win.doc,_198.release,"_onDropDownMouseUp");
this.toggleDropDown();
},_onDropDownMouseUp:function(e){
if(e&&this._docHandler){
this.disconnect(this._docHandler);
}
var _19e=this.dropDown,_19f=false;
if(e&&this._opened){
var c=_196.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_19f){
if(_195.contains(t,"dijitPopup")){
_19f=true;
}else{
t=t.parentNode;
}
}
if(_19f){
t=e.target;
if(_19e.onItemClick){
var _1a0;
while(t&&!(_1a0=_19a.byNode(t))){
t=t.parentNode;
}
if(_1a0&&_1a0.onClick&&_1a0.getParent){
_1a0.getParent().onItemClick(_1a0,e);
}
}
return;
}
}
}
if(this._opened){
if(_19e.focus&&_19e.autoFocus!==false){
window.setTimeout(lang.hitch(_19e,"focus"),1);
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
_193.stop(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _1a1={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
_195.add(this._arrowWrapperNode||this._buttonNode,"dijit"+_1a1+"ArrowButton");
},postCreate:function(){
this.inherited(arguments);
this.connect(this._buttonNode,_198.press,"_onDropDownMouseDown");
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
var d=this.dropDown,_1a2=e.target;
if(d&&this._opened&&d.handleKey){
if(d.handleKey(e)===false){
_193.stop(e);
return;
}
}
if(d&&this._opened&&e.charOrCode==keys.ESCAPE){
this.closeDropDown();
_193.stop(e);
}else{
if(!this._opened&&(e.charOrCode==keys.DOWN_ARROW||((e.charOrCode==keys.ENTER||e.charOrCode==" ")&&((_1a2.tagName||"").toLowerCase()!=="input"||(_1a2.type&&_1a2.type.toLowerCase()!=="text"))))){
this._toggleOnKeyUp=true;
_193.stop(e);
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
var _1a3=_19b.curNode&&this.dropDown&&dom.isDescendant(_19b.curNode,this.dropDown.domNode);
this.closeDropDown(_1a3);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_1a4){
_1a4();
},loadAndOpenDropDown:function(){
var d=new _192(),_1a5=lang.hitch(this,function(){
this.openDropDown();
d.resolve(this.dropDown);
});
if(!this.isLoaded()){
this.loadDropDown(_1a5);
}else{
_1a5();
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
var _1a6=this.dropDown,_1a7=_1a6.domNode,_1a8=this._aroundNode||this.domNode,self=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_1a7.style.width){
this._explicitDDWidth=true;
}
if(_1a7.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _1a9={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_1a9.width="";
}
if(!this._explicitDDHeight){
_1a9.height="";
}
_197.set(_1a7,_1a9);
var _1aa=this.maxHeight;
if(_1aa==-1){
var _1ab=_199.getBox(),_1ac=_196.position(_1a8,false);
_1aa=Math.floor(Math.max(_1ac.y,_1ab.h-(_1ac.y+_1ac.h)));
}
_19c.moveOffScreen(_1a6);
if(_1a6.startup&&!_1a6._started){
_1a6.startup();
}
var mb=_196.getMarginSize(_1a7);
var _1ad=(_1aa&&mb.h>_1aa);
_197.set(_1a7,{overflowX:"hidden",overflowY:_1ad?"auto":"hidden"});
if(_1ad){
mb.h=_1aa;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_1a8.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_1a8.offsetWidth);
}else{
delete mb.w;
}
}
if(lang.isFunction(_1a6.resize)){
_1a6.resize(mb);
}else{
_196.setMarginBox(_1a7,mb);
}
}
var _1ae=_19c.open({parent:this,popup:_1a6,around:_1a8,orient:this.dropDownPosition,onExecute:function(){
self.closeDropDown(true);
},onCancel:function(){
self.closeDropDown(true);
},onClose:function(){
_194.set(self._popupStateNode,"popupActive",false);
_195.remove(self._popupStateNode,"dijitHasDropDownOpen");
self._opened=false;
}});
_194.set(this._popupStateNode,"popupActive","true");
_195.add(self._popupStateNode,"dijitHasDropDownOpen");
this._opened=true;
return _1ae;
},closeDropDown:function(_1af){
if(this._opened){
if(_1af){
this.focus();
}
_19c.close(this.dropDown);
this._opened=false;
}
}});
});
},"curam/util/Request":function(){
define("curam/util/Request",["dojo/_base/xhr","curam/debug","curam/util/ResourceBundle","curam/util/LocalConfig"],function(xhr,_1b0,_1b1,_1b2){
dojo.requireLocalization("curam.application","Request");
var _1b3=new _1b1("Request"),_1b4=null,_1b5=function(_1b6){
if(_1b4){
return _1b4(_1b6);
}else{
return _1b6.responseText.indexOf("action=\"j_security_check\"")>0;
}
},_1b7=function(err,_1b8){
if(_1b5(_1b8.xhr)){
_1b0.log(_1b3.getProperty("sessionExpired"));
alert(_1b3.getProperty("sessionExpired"));
}else{
_1b0.log(_1b3.getProperty("ajaxError"));
alert(_1b3.getProperty("ajaxError"));
}
_1b0.log(err);
_1b0.log("HTTP status was: "+_1b8.xhr.status);
},_1b9=function(_1ba,args){
var _1bb=_1b2.readOption("ajaxDebugMode","false")=="true";
var _1bc=args.error;
if(_1bb){
args.error=function(err,_1bd){
if(args.errorHandlerOverrideDefault!==true){
_1b7(err,_1bd);
}
if(_1bc){
_1bc(err,_1bd);
}
};
}
var _1be=_1ba(args);
return _1be;
};
var _1bf={post:function(args){
return _1b9(xhr.post,args);
},get:function(args){
return _1b9(xhr.get,args);
},setLoginPageDetector:function(_1c0){
_1b4=_1c0;
}};
return _1bf;
});
},"dijit/tree/TreeStoreModel":function(){
define("dijit/tree/TreeStoreModel",["dojo/_base/array","dojo/aspect","dojo/_base/declare","dojo/_base/json","dojo/_base/lang"],function(_1c1,_1c2,_1c3,json,lang){
return _1c3("dijit.tree.TreeStoreModel",null,{store:null,childrenAttrs:["children"],newItemIdAttr:"id",labelAttr:"",root:null,query:null,deferItemLoadingUntilExpand:false,constructor:function(args){
lang.mixin(this,args);
this.connects=[];
var _1c4=this.store;
if(!_1c4.getFeatures()["dojo.data.api.Identity"]){
throw new Error("dijit.Tree: store must support dojo.data.Identity");
}
if(_1c4.getFeatures()["dojo.data.api.Notification"]){
this.connects=this.connects.concat([_1c2.after(_1c4,"onNew",lang.hitch(this,"onNewItem"),true),_1c2.after(_1c4,"onDelete",lang.hitch(this,"onDeleteItem"),true),_1c2.after(_1c4,"onSet",lang.hitch(this,"onSetItem"),true)]);
}
},destroy:function(){
var h;
while(h=this.connects.pop()){
h.remove();
}
},getRoot:function(_1c5,_1c6){
if(this.root){
_1c5(this.root);
}else{
this.store.fetch({query:this.query,onComplete:lang.hitch(this,function(_1c7){
if(_1c7.length!=1){
throw new Error(this.declaredClass+": query "+json.stringify(this.query)+" returned "+_1c7.length+" items, but must return exactly one item");
}
this.root=_1c7[0];
_1c5(this.root);
}),onError:_1c6});
}
},mayHaveChildren:function(item){
return _1c1.some(this.childrenAttrs,function(attr){
return this.store.hasAttribute(item,attr);
},this);
},getChildren:function(_1c8,_1c9,_1ca){
var _1cb=this.store;
if(!_1cb.isItemLoaded(_1c8)){
var _1cc=lang.hitch(this,arguments.callee);
_1cb.loadItem({item:_1c8,onItem:function(_1cd){
_1cc(_1cd,_1c9,_1ca);
},onError:_1ca});
return;
}
var _1ce=[];
for(var i=0;i<this.childrenAttrs.length;i++){
var vals=_1cb.getValues(_1c8,this.childrenAttrs[i]);
_1ce=_1ce.concat(vals);
}
var _1cf=0;
if(!this.deferItemLoadingUntilExpand){
_1c1.forEach(_1ce,function(item){
if(!_1cb.isItemLoaded(item)){
_1cf++;
}
});
}
if(_1cf==0){
_1c9(_1ce);
}else{
_1c1.forEach(_1ce,function(item,idx){
if(!_1cb.isItemLoaded(item)){
_1cb.loadItem({item:item,onItem:function(item){
_1ce[idx]=item;
if(--_1cf==0){
_1c9(_1ce);
}
},onError:_1ca});
}
});
}
},isItem:function(_1d0){
return this.store.isItem(_1d0);
},fetchItemByIdentity:function(_1d1){
this.store.fetchItemByIdentity(_1d1);
},getIdentity:function(item){
return this.store.getIdentity(item);
},getLabel:function(item){
if(this.labelAttr){
return this.store.getValue(item,this.labelAttr);
}else{
return this.store.getLabel(item);
}
},newItem:function(args,_1d2,_1d3){
var _1d4={parent:_1d2,attribute:this.childrenAttrs[0]},_1d5;
if(this.newItemIdAttr&&args[this.newItemIdAttr]){
this.fetchItemByIdentity({identity:args[this.newItemIdAttr],scope:this,onItem:function(item){
if(item){
this.pasteItem(item,null,_1d2,true,_1d3);
}else{
_1d5=this.store.newItem(args,_1d4);
if(_1d5&&(_1d3!=undefined)){
this.pasteItem(_1d5,_1d2,_1d2,false,_1d3);
}
}
}});
}else{
_1d5=this.store.newItem(args,_1d4);
if(_1d5&&(_1d3!=undefined)){
this.pasteItem(_1d5,_1d2,_1d2,false,_1d3);
}
}
},pasteItem:function(_1d6,_1d7,_1d8,_1d9,_1da){
var _1db=this.store,_1dc=this.childrenAttrs[0];
if(_1d7){
_1c1.forEach(this.childrenAttrs,function(attr){
if(_1db.containsValue(_1d7,attr,_1d6)){
if(!_1d9){
var _1dd=_1c1.filter(_1db.getValues(_1d7,attr),function(x){
return x!=_1d6;
});
_1db.setValues(_1d7,attr,_1dd);
}
_1dc=attr;
}
});
}
if(_1d8){
if(typeof _1da=="number"){
var _1de=_1db.getValues(_1d8,_1dc).slice();
_1de.splice(_1da,0,_1d6);
_1db.setValues(_1d8,_1dc,_1de);
}else{
_1db.setValues(_1d8,_1dc,_1db.getValues(_1d8,_1dc).concat(_1d6));
}
}
},onChange:function(){
},onChildrenChange:function(){
},onDelete:function(){
},onNewItem:function(item,_1df){
if(!_1df){
return;
}
this.getChildren(_1df.item,lang.hitch(this,function(_1e0){
this.onChildrenChange(_1df.item,_1e0);
}));
},onDeleteItem:function(item){
this.onDelete(item);
},onSetItem:function(item,_1e1){
if(_1c1.indexOf(this.childrenAttrs,_1e1)!=-1){
this.getChildren(item,lang.hitch(this,function(_1e2){
this.onChildrenChange(item,_1e2);
}));
}else{
this.onChange(item);
}
}});
});
},"dijit/_MenuBase":function(){
define("dijit/_MenuBase",["./popup","dojo/window","./_Widget","./_KeyNavContainer","./_TemplatedMixin","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/lang","dojo/_base/array"],function(pm,_1e3,_1e4,_1e5,_1e6,_1e7,dom,_1e8,_1e9,lang,_1ea){
return _1e7("dijit._MenuBase",[_1e4,_1e6,_1e5],{parentMenu:null,popupDelay:500,onExecute:function(){
},onCancel:function(){
},_moveToPopup:function(evt){
if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){
this.focusedChild._onClick(evt);
}else{
var _1eb=this._getTopMenu();
if(_1eb&&_1eb._isMenuBar){
_1eb.focusNext();
}
}
},_onPopupHover:function(){
if(this.currentPopup&&this.currentPopup._pendingClose_timer){
var _1ec=this.currentPopup.parentMenu;
if(_1ec.focusedChild){
_1ec.focusedChild._setSelected(false);
}
_1ec.focusedChild=this.currentPopup.from_item;
_1ec.focusedChild._setSelected(true);
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
var _1ed=item.popup;
if(_1ed){
this._stopPendingCloseTimer(_1ed);
_1ed._pendingClose_timer=setTimeout(function(){
_1ed._pendingClose_timer=null;
if(_1ed.parentMenu){
_1ed.parentMenu.currentPopup=null;
}
pm.close(_1ed);
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
},_stopPendingCloseTimer:function(_1ee){
if(_1ee._pendingClose_timer){
clearTimeout(_1ee._pendingClose_timer);
_1ee._pendingClose_timer=null;
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
var _1ef=this.focusedChild;
if(!_1ef){
return;
}
var _1f0=_1ef.popup;
if(_1f0.isShowingNow){
return;
}
if(this.currentPopup){
this._stopPendingCloseTimer(this.currentPopup);
pm.close(this.currentPopup);
}
_1f0.parentMenu=this;
_1f0.from_item=_1ef;
var self=this;
pm.open({parent:this,popup:_1f0,around:_1ef.domNode,orient:this._orient||["after","before"],onCancel:function(){
self.focusChild(_1ef);
self._cleanUp();
_1ef._setSelected(true);
self.focusedChild=_1ef;
},onExecute:lang.hitch(this,"_cleanUp")});
this.currentPopup=_1f0;
if(this.popupHoverHandle){
this.disconnect(this.popupHoverHandle);
}
this.popupHoverHandle=this.connect(_1f0.domNode,"onmouseenter","_onPopupHover");
if(_1f0.focus){
_1f0._focus_timer=setTimeout(lang.hitch(_1f0,function(){
this._focus_timer=null;
this.focus();
}),0);
}
},_markActive:function(){
this.isActive=true;
_1e9.replace(this.domNode,"dijitMenuActive","dijitMenuPassive");
},onOpen:function(){
this.isShowingNow=true;
this._markActive();
},_markInactive:function(){
this.isActive=false;
_1e9.replace(this.domNode,"dijitMenuPassive","dijitMenuActive");
},onClose:function(){
this._stopFocusTimer();
this._markInactive();
this.isShowingNow=false;
this.parentMenu=null;
},_closeChild:function(){
this._stopPopupTimer();
if(this.currentPopup){
if(_1ea.indexOf(this._focusManager.activeStack,this.id)>=0){
_1e8.set(this.focusedChild.focusNode,"tabIndex",this.tabIndex);
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
},"curam/omega3-util":function(){
define("curam/omega3-util",["dojo/dom-geometry","curam/util","curam/html","curam/GlobalVars","cm/_base/_dom","cm/_base/_form","curam/util/RuntimeContext","curam/util/ResourceBundle"],function(_1f1){
dojo.requireLocalization("curam.application","Debug");
var _1f2=new curam.util.ResourceBundle("Debug");
var _1f3={getAnchorPosition:function(_1f4){
var _1f5=false;
var _1f6=new Object();
var x=0;
var y=0;
x=AnchorPosition_getPageOffsetLeft(document.getElementById(_1f4));
y=AnchorPosition_getPageOffsetTop(document.getElementById(_1f4));
_1f6.x=x;
_1f6.y=y;
return _1f6;
},getAnchorWindowPosition:function(_1f7){
var _1f8=getAnchorPosition(_1f7);
var x=0;
var y=0;
if(isNaN(window.screenX)){
x=_1f8.x-document.body.scrollLeft+window.screenLeft;
y=_1f8.y-document.body.scrollTop+window.screenTop;
}else{
x=_1f8.x+window.screenX+(window.outerWidth-window.innerWidth)-window.pageXOffset;
y=_1f8.y+window.screenY+(window.outerHeight-24-window.innerHeight)-window.pageYOffset;
}
_1f8.x=x;
_1f8.y=y;
return _1f8;
},AnchorPosition_getPageOffsetLeft:function(el){
var ol=el.offsetLeft;
while((el=el.offsetParent)!=null){
ol+=el.offsetLeft;
}
return ol;
},AnchorPosition_getWindowOffsetLeft:function(el){
var _1f9=document.body.scrollLeft;
return AnchorPosition_getPageOffsetLeft(el)-_1f9;
},AnchorPosition_getPageOffsetTop:function(el){
var ot=el.offsetTop;
while((el=el.offsetParent)!=null){
ot+=el.offsetTop;
}
return ot;
},AnchorPosition_getWindowOffsetTop:function(el){
var _1fa=document.body.scrollTop;
return AnchorPosition_getPageOffsetTop(el)-_1fa;
},PopupMapping:function(name,_1fb){
this.name=name;
this.targetWidgetID=_1fb;
},openPopupFromCTCode:function(_1fc,_1fd,_1fe,_1ff){
var list=_1fe.parentNode.parentNode.parentNode.childNodes[0];
var _200=dijit.byNode(list);
if(_200){
var _201=_200.getValue();
}else{
var list=_1fe.parentNode.parentNode.parentNode.childNodes[1];
var _201=list.options[list.selectedIndex].value;
}
if(_201!=""){
if(curam.popupCTCodeMappings[_201]){
openPopupFromDomain(_1fc,_1fd,curam.popupCTCodeMappings[_201],_1ff,false);
}
}
},openPopupFromCTCodeNoDomain:function(_202,_203,_204,_205){
var list=_204.parentNode.parentNode.parentNode.childNodes[2];
var _206=dijit.byNode(list);
var _207;
var _208;
var _209;
var _20a;
var _20b;
var _20c;
var _20d;
var _20e;
if(_206){
var _20f=_206.getValue();
}else{
var list=_204.parentNode.parentNode.parentNode.childNodes[1];
var _20f=list.options[list.selectedIndex].value;
}
if(_20f!=""){
if(curam.popupCTCodeMappings[_20f]){
_207=getPopupProperties(curam.popupCTCodeMappings[_20f]);
_208=_207.pageID;
_209=_207.createPageID;
_20a=_207.height;
_20b=_207.width;
_20c=_207.scrollBars;
_20d=_207.insertMode;
_20e=_207.codeTableCode;
var _210=_207.uimType;
if(_210=="DYNAMIC"){
openPopup(_202,_203,null,_208,_209,_20b,_20a,_20c,_20d,null,null,_205,false);
}
}
}
},openPopupFromDomain:function(_211,_212,_213,_214,_215){
var _216=getPopupProperties(_213);
var _217=_216.pageID;
var _218=_216.createPageID;
var _219=_216.height;
var _21a=_216.width;
var _21b=_216.scrollBars;
var _21c=_216.insertMode;
var _21d=_216.codeTableCode;
openPopup(_211,_212,_213,_217,_218,_21a,_219,_21b,_21c,_21d,_214,_215);
},openPopupNoDomain:function(_21e,_21f,_220,_221,_222,_223,_224,_225,_226,_227){
openPopup(_21e,_21f,null,_220,_221,_222,_223,_224,_225,null,null,_226,_227);
},openPopup:function(_228,_229,_22a,_22b,_22c,_22d,_22e,_22f,_230,_231,_232,_233){
setMappingsLoaded(_229);
var _234=getAnchorWindowPosition(_228);
_234.y=_234.y+25;
if(_234.x+_22d>screen.availWidth){
_234.x-=(_234.x+_22d)-screen.availWidth;
_234.x-=15;
}
if(_234.y+_22e>screen.availHeight){
_234.y-=(_234.y+_22e)-screen.availHeight;
_234.y-=35;
}
if(curam.popupWindow&&!curam.popupWindow.closed){
curam.popupWindow.close();
}
curam.currentPopupInstanceName=_229;
curam.currentPopupProps=setPopupProperties(_22b,_22a,_231,_22d,_22e,_22f,_22c,_230,null);
var ctx=jsScreenContext;
ctx.addContextBits("POPUP");
ctx.clear("TAB|TREE|AGENDA");
var url="";
if(_233==true){
url=_22c;
}else{
url=_22b;
}
if(_232&&_232.length>0){
url=url+"?"+_232;
url+="&";
}else{
url+="?";
}
url+=ctx.toRequestString();
if(window.curam.util.showModalDialog){
curam.util.showModalDialog(url,null,_22d,_22e,_234.x,_234.y,false,null,null);
}else{
curam.popupWindow=window.open(url,createWindowName(curam.currentPopupInstanceName),getPopupAttributes(_22d,_22e,_22f)+"screenX="+_234.x+",left="+_234.x+",screenY="+_234.y+","+"top="+_234.y);
}
},addPopupMapping:function(_235,_236,_237){
var _238=curam.popupMappingRepository;
if(curam.popupMappingLoaded[_235]==true){
return;
}
if(_238[_235]==null){
_238[_235]=[];
_238[_235][_236]=[];
_238[_235][_236][0]=_237;
}else{
if(_238[_235][_236]==null){
_238[_235][_236]=[];
_238[_235][_236][0]=_237;
}else{
var _239=_238[_235][_236].length;
_238[_235][_236][_239]=_237;
}
}
},setMappingsLoaded:function(_23a){
curam.popupMappingLoaded[_23a]=true;
},executeMapping:function(_23b,_23c){
var pmr=curam.popupMappingRepository;
var cpin=curam.currentPopupInstanceName;
if(!pmr||!pmr[cpin]||pmr[cpin][_23b]==null){
return;
}
for(var i=0;i<pmr[cpin][_23b].length;i++){
var _23d=null;
_23d=dojo.byId(pmr[cpin][_23b][i]);
if(_23d.tagName=="SPAN"){
_23d.innerHTML=curam.html.splitWithTag(_23c,null,null,escapeXML);
_23d.setAttribute("title",_23c);
_23d._reposition=_23d._reposition||dojo.query("div",_23d).length>0;
if(_23d._reposition){
var _23e=cm.nextSibling(_23d,"span");
if(_23e){
var _23f=_1f1.getMarginBoxSimple(_23d).h;
var _240=_1f1.getMarginBoxSimple(_23e).h;
dojo.style(_23e,"position","relative");
var diff=_23f-_240-((dojo.isIE&&dojo.isIE<9)?2:0);
dojo.style(_23e,"bottom","-"+(diff)+"px");
}
}
}else{
if(_23d.tagName=="TEXTAREA"){
if(curam.currentPopupProps.insertMode=="insert"){
insertAtCursor(_23d,escapeXML(_23c));
}else{
if(curam.currentPopupProps.insertMode=="append"){
_23d.value+=_23c;
}else{
_23d.value=_23c;
}
}
}else{
if(dijit.byId(pmr[cpin][_23b][i])){
dijit.byId(pmr[cpin][_23b][i]).set("value",_23c);
_23d.value=_23c;
}else{
_23d.value=_23c;
}
}
}
}
},insertAtCursor:function(_241,_242){
if(document.selection){
_241.focus();
sel=document.selection.createRange();
sel.text=_242;
}else{
if(_241.selectionStart||_241.selectionStart=="0"){
var _243=_241.selectionStart;
var _244=_241.selectionEnd;
_241.value=_241.value.substring(0,_243)+_242+_241.value.substring(_244,_241.value.length);
}else{
_241.value+=_242;
}
}
},escapeXML:function(_245){
return _245.replace(/&/g,"&#38;").replace(/</g,"&#60;").replace(/>/g,"&#62;").replace(/"/g,"&#34;").replace(/'/g,"&#39;");
},executeOpenerMapping:function(_246,_247){
var _248=undefined;
if(curam.util.isModalWindow()){
_248=curam.dialog.getParentWindow(window);
}else{
if(window.dialogArguments){
_248=window.dialogArguments[0];
}
}
if((_248)&&(!_248.closed)){
_248.executeMapping(_246,_247);
}else{
curam.debug.log("curam.omega3-util.executeOpenerMapping:, "+_1f2.getProperty("curam.omega3-util.parent"));
}
},storePopupInputFromWidget:function(name,_249){
var _24a=null;
_24a=dojo.byId(_249).value;
if(_24a){
curam.popupInputs[name]=_24a;
}else{
curam.popupInputs[name]="";
}
},getPopupInput:function(name){
if(curam.popupInputs[name]!=null){
return curam.popupInputs[name];
}else{
return "";
}
},PopupProperties:function(_24b,_24c,_24d,_24e,_24f,_250,_251){
this.width=_24c;
this.height=_24d;
this.scrollBars=_24e;
this.pageID=_24b;
this.createPageID=_24f;
if(_250==null){
this.insertMode="overwrite";
}else{
this.insertMode=_250;
}
if(_251!=null){
this.uimType=_251;
}
},setPopupProperties:function(_252,_253,_254,_255,_256,_257,_258,_259,_25a){
if(_254){
curam.popupCTCodeMappings[_254]=_253;
}
curam.popupPropertiesRepository[_253]=new PopupProperties(_252,_255,_256,_257,_258,_259,_25a);
},getPopupAttributes:function(_25b,_25c,_25d){
var _25e="width="+_25b+","+"height="+_25c+","+"scrollbars="+(_25d?"yes":"no")+",";
return _25e;
},getPopupAttributesIEModal:function(_25f){
var _260="dialogWidth:"+curam.popupPropertiesRepository[_25f].width+"px;"+"dialogHeight:"+curam.popupPropertiesRepository[_25f].height+"px;";
return _260;
},trimFileExtension:function(_261){
var _262=_261.lastIndexOf("/")+1;
if(_262==-1){
_262=_261.lastIndexOf("\\")+1;
}
if(_262==-1){
_262=0;
}
return _261.substring(_262,_261.lastIndexOf("."));
},getPopupProperties:function(_263){
return curam.popupPropertiesRepository[_263];
},validateDate:function(_264){
require(["curam/validation"]);
return curam.validation.validateDate(_264).valid;
},addStartDate:function(_265){
require(["curam/validation"]);
var _266=dojo.byId("startDate").value;
var _267=curam.validation.validateDate(_266);
if(_267.valid){
var _268=dojo.byId("gotoDate");
_268.href=curam.util.replaceUrlParam(_268.href,"startDate",_266);
return true;
}else{
require(["curam/validation/calendar"],function(){
alert(curam.validation.calendar.invalidGotoDateEntered.replace("%s",_266).replace("%s",jsDFs));
});
dojo.stopEvent(_265);
return false;
}
},checkEnter:function(_269){
if(_269.keyCode==13){
if(addStartDate(_269)){
var _26a=dojo.byId("gotoDate");
window.location=_26a.href;
return true;
}
return false;
}
return true;
},createWindowName:function(_26b){
var _26c=new String("");
for(var i=0;i<_26b.length;i++){
var ch=_26b.charAt(i);
if(ch=="$"||ch=="."){
_26c+="_";
}else{
_26c+=ch;
}
}
return _26c;
},clearPopup:function(_26d,_26e){
var _26f=_26d.id.substring(0,_26d.id.indexOf("_clear"));
var _270=_26f+"_value";
var _271=_26f+"_desc";
var _272=_26f+"_deschf";
var _273=dojo.byId(_270);
if(_273){
if(_273.tagName=="INPUT"){
_273.value="";
}else{
if(_273.tagName=="TEXTAREA"){
_273.value="";
}
}
if(_273.tagName=="SPAN"){
_273.innerHTML=curam.POPUP_EMPTY_SPAN_VALUE;
}
}
var _274=dojo.byId(_271);
if(_274){
if(_274.tagName=="INPUT"){
_274.value="";
}else{
if(_274.tagName=="TEXTAREA"){
_274.value="";
}else{
if(_274.tagName=="SPAN"){
_274.innerHTML=curam.POPUP_EMPTY_SPAN_VALUE;
_274.removeAttribute("title");
}
}
}
}
var _275=dojo.byId(_272);
if(_275){
if(_275.tagName=="INPUT"){
_275.value="";
}else{
_275.innerHTML="&nbsp";
}
}
if(_26e){
_26e=dojo.fixEvent(_26e);
dojo.stopEvent(_26e);
}
return false;
},swapImage:function(_276,_277){
dojo.byId(_276).src=_277;
},appendTabColumn:function(_278,_279){
var _27a;
var _27b=[];
dojo.query("input[name='"+_278+"']").filter(function(_27c){
return _27c.checked;
}).forEach(function(_27d){
_27b.push(_27d.value);
});
_27a=_27b.join("\t");
_279.href=_279.href+(_279.href.indexOf("?")==-1?"?":"&");
if(_27a!=""){
_279.href=_279.href+_278+"="+encodeURIComponent(_27a);
}else{
_279.href=_279.href+_278+"=";
}
},ToggleAll:function(e,_27e){
dojo.query("input[name='"+_27e+"']").forEach(function(_27f){
if(_27f.checked===true){
_27f.checked=false;
}else{
_27f.checked=true;
}
});
},ToggleSelectAll:function(e,_280){
if(e.checked){
CheckAll(_280);
}else{
ClearAll(_280);
}
},CheckAll:function(_281){
dojo.query("input[name='"+_281+"']").forEach(function(_282){
_282.checked=true;
});
},ClearAll:function(_283){
dojo.query("input[name='"+_283+"']").forEach(function(_284){
_284.checked=false;
});
},Check:function(e){
e.checked=true;
},Clear:function(e){
e.checked=false;
},ChooseSelectAll:function(e,_285,_286){
var sAll=dojo.byId(_285);
if(sAll){
if(dojo.query("input[name='"+_286+"']").every("return item.checked")){
Check(sAll);
}else{
Clear(sAll);
}
}
},selectAllIfNeeded:function(_287,_288){
if(dojo.query("input[name='"+_288+"']").some("return !item.checked")){
return;
}
var sAll=dojo.byId(_287);
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
},dc:function(_289,_28a,_28b){
if(cm.wasFormSubmitted(_289)){
var evt=dojo.fixEvent(_28b);
dojo.stopEvent(evt);
return false;
}
cm.setFormSubmitted(_289,1);
return true;
},setFocus:function(){
curam.util.setFocus();
},setParentFocus:function(_28c){
curam.debug.log("curam.omega3-util.setParentFocus: "+_1f2.getProperty("curam.omega3-util.called"));
var _28d=curam.dialog.getParentWindow(window);
if(!_28d.closed){
_28d.focus();
}else{
alert("The parent window has been closed");
}
if(_28c||window.event){
dojo.stopEvent(_28c||window.event);
}
curam.dialog.closeModalDialog();
},createElement:function(name,_28e,_28f,text){
var e=dojo.create(name,_28e);
if(_28f){
for(key in _28f){
e.style[key]=_28f[key];
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
var _290=getParentWin();
var _291=dojo.query("INPUT");
var _292=[];
dojo.query("INPUT[type='checkbox']").forEach(function(item){
if(item.checked&&item.id.indexOf("__o3mswa")<0){
_292.push(item.value);
}
});
var _293=dojo.toJson(_292);
_290.newQuestions=_293;
_290.curam.matrix.Constants.container.matrix.addQuestionsFromPopup();
curam.dialog.closeModalDialog();
return false;
},addOutcomesFromPopup:function(evt){
evt=dojo.fixEvent(evt);
dojo.stopEvent(evt);
if(window._outcomesAdded){
return;
}
window._outcomesAdded=true;
var _294=[];
dojo.query("INPUT[type='checkbox']").forEach(function(item){
if(item.checked&&item.id.indexOf("__o3mswa")<0){
_294.push(item.value);
}
});
getParentWin().curam.matrix.Constants.container.matrix.addOutcomesFromPopup(_294);
curam.dialog.closeModalDialog();
return false;
},addMatrixQuestionsPopupListener:function(){
addMatrixPopupListener(addQuestionsFromPopup);
},addMatrixOutcomesPopupListener:function(){
addMatrixPopupListener(addOutcomesFromPopup);
},addMatrixPopupListener:function(fn){
dojo.query("form").connect("onsubmit",fn);
},getRequestParams:function(_295){
var _296=[];
var uri=new dojo._Url(_295);
if(uri.query!=null){
var _297=uri.query.split("&");
for(var i=0;i<_297.length;i++){
var arr=_297[i].split("=");
_296[arr[0]]=arr[1];
}
}
return _296;
},openModalDialog:function(_298,_299,left,top){
curam.util.openModalDialog(_298,_299,left,top);
},initCluster:function(_29a){
var _29b=_29a.parentNode;
var _29c=dojo.query("div.toggle-group",_29b);
if(_29c.length>=1){
return _29c[0];
}
var next=cm.nextSibling(_29a,"p")||cm.nextSibling(_29a,"table");
if(!next){
return;
}
_29c=dojo.create("div",{"class":"toggle-group"},next,"before");
var arr=[];
var _29d=dojo.query("p.description",_29a)[0];
if(_29d){
arr.push(_29d);
var _29e=dojo.style(_29a,"marginBottom");
dojo.style(_29a,"marginBottom",0);
dojo.style(_29d,"marginBottom",_29e+"px");
}
var _29f=_29b;
while(_29f&&!(dojo.hasClass(_29f,"cluster")||dojo.hasClass(_29f,"list"))){
_29f=_29f.parentNode;
}
_29c.isClosed=dojo.hasClass(_29f,"uncollapse")?true:false;
if(_29c.isClosed){
dojo.style(_29c,"display","none");
}
for(var _2a0=0;_2a0<_29b.childNodes.length;_2a0++){
if(_29b.childNodes[_2a0]==_29a||_29b.childNodes[_2a0]==_29c){
continue;
}
arr.push(_29b.childNodes[_2a0]);
}
for(var _2a0=0;_2a0<arr.length;_2a0++){
_29c.appendChild(arr[_2a0]);
}
return _29c;
},initClusterHeight:function(_2a1,_2a2,_2a3){
if(_2a1.correctHeight){
return;
}
var _2a4=dojo._getBorderBox(_2a2).h;
var _2a5=0,_2a6;
for(var _2a7=0;_2a7<_2a1.childNodes.length;_2a7++){
_2a6=_2a1.childNodes[_2a7];
if(_2a6==_2a2){
continue;
}
_2a5+=dojo._getBorderBox(_2a6).h;
}
if(_2a5==0){
return;
}
if(_2a3){
dojo.style(_2a2.parentNode,"height","");
}
_2a1.correctHeight=_2a5;
},getCursorPosition:function(e){
e=e||dojo.global().event;
var _2a8={x:0,y:0};
if(e.pageX||e.pageY){
_2a8.x=e.pageX;
_2a8.y=e.pageY;
}else{
var de=dojo.doc().documentElement;
var db=dojo.body();
_2a8.x=e.clientX+((de||db)["scrollLeft"])-((de||db)["clientLeft"]);
_2a8.y=e.clientY+((de||db)["scrollTop"])-((de||db)["clientTop"]);
}
return _2a8;
},overElement:function(_2a9,e){
_2a9=dojo.byId(_2a9);
var _2aa=getCursorPosition(e);
var bb=dojo._getBorderBox(_2a9);
var _2ab=dojo._abs(_2a9,true);
var top=_2ab.y;
var _2ac=top+bb.h;
var left=_2ab.x;
var _2ad=left+bb.w;
return (_2aa.x>=left&&_2aa.x<=_2ad&&_2aa.y>=top&&_2aa.y<=_2ac);
},toggleCluster:function(_2ae,_2af){
var _2b0=_2ae;
while(_2ae&&!(dojo.hasClass(_2ae,"cluster")||dojo.hasClass(_2ae,"list"))){
_2ae=_2ae.parentNode;
}
var _2b1=false;
var _2b2=dojo.query(" > :not(.header-wrapper) ",_2ae.childNodes[0]);
if(!dojo.hasClass(_2b2[0],"toggleDiv")){
var _2b3=dojo.create("div",{className:"toggleDiv"},_2b2[0].parentNode);
var _2b4=dojo.create("div",{className:"toggleDiv2"},_2b2[0].parentNode);
_2b2.forEach(function(node){
if(node.tagName!="DIV"){
_2b3.appendChild(node);
}else{
_2b4.appendChild(node);
}
});
}else{
var _2b3=_2b2[0];
var _2b4=_2b2[1];
}
var desc=dojo.query(" > .header-wrapper p ",_2ae.childNodes[0])[0];
if(typeof desc!="undefined"){
_2b1=true;
}
if(dojo.hasClass(_2ae,"init-collapsed")){
dojo.removeClass(_2ae,"init-collapsed");
dojo.style(_2b3,"display","none");
}
if(!_2b3||_2b3.inAnimation){
return;
}
require(["dojo/fx"],function(fx){
var _2b5={node:_2b3,duration:600,onBegin:function(){
_2b3.inAnimation=true;
dojo.removeClass(_2ae,"is-collapsed");
dojo.addClass(_2ae,"is-uncollapsed");
dojo.attr(_2b0,"aria-expanded","true");
dojo.stopEvent(_2af);
},onEnd:function(){
_2b3.inAnimation=false;
}};
var _2b6={node:_2b3,duration:600,onBegin:function(){
_2b3.inAnimation=true;
dojo.removeClass(_2ae,"is-uncollapsed");
dojo.addClass(_2ae,"is-collapsed");
dojo.attr(_2b0,"aria-expanded","false");
dojo.stopEvent(_2af);
},onEnd:function(){
_2b3.inAnimation=false;
}};
if(_2b4.hasChildNodes()){
var _2b7={node:_2b4,duration:600};
var _2b8={node:_2b4,duration:600};
}
if(_2b1){
var _2b9={node:desc,duration:100};
var _2ba={node:desc,duration:100,delay:500};
}
if(dojo.hasClass(_2ae,"is-collapsed")){
if(typeof _2b9!="undefined"){
fx.wipeIn(_2b9).play();
}
fx.wipeIn(_2b5).play();
if(typeof _2b7!="undefined"){
fx.wipeIn(_2b7).play();
}
}else{
if(dojo.hasClass(_2ae,"is-uncollapsed")){
if(typeof _2b8!="undefined"){
fx.wipeOut(_2b8).play();
}
fx.wipeOut(_2b6).play();
if(typeof _2ba!="undefined"){
fx.wipeOut(_2ba).play();
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
},openUserPrefsEditor:function(_2bb){
_2bb=dojo.fixEvent(_2bb);
var _2bc=_2bb.target;
while(_2bc&&_2bc.tagName!="A"){
_2bc=_2bc.parentNode;
}
var _2bd={location:{href:_2bc.href}};
var rtc=new curam.util.RuntimeContext(_2bd);
var href=curam.util.setRpu("user-locale-selector.jspx",rtc);
openModalDialog({href:href},"width=500,height=300",200,150,false);
return false;
},calendarOpenModalDialog:function(_2be,_2bf){
dojo.stopEvent(_2be);
curam.util.openModalDialog(_2bf,"");
}};
for(prop in _1f3){
dojo.global[prop]=_1f3[prop];
}
return _1f3;
});
},"curam/dialog":function(){
define("curam/dialog",["curam/util","curam/debug","curam/util/external","curam/util/Refresh","curam/tab","curam/util/RuntimeContext","curam/define","curam/util/onLoad","cm/_base/_dom","curam/util/ResourceBundle"],function(util,_2c0,_2c1){
dojo.requireLocalization("curam.application","Debug");
var _2c2=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.dialog",{MODAL_PREV_FLAG:"o3modalprev",MODAL_PREV_FLAG_INPUT:"curam_dialog_prev_marker",FORCE_CLOSE:false,ERROR_MESSAGES_HEADER:"error-messages-header",_hierarchy:[],_id:null,_displayedHandlerUnsToken:null,_displayed:false,_size:null,_justClose:false,validTargets:{"_top":true,"_self":true},initModal:function(_2c3,_2c4){
curam.dialog.pageId=_2c3;
curam.dialog.messagesExist=_2c4;
var _2c5=util.getTopmostWindow();
var _2c6=false;
var _2c7=_2c5.dojo.subscribe("/curam/dialog/SetId",this,function(_2c8){
_2c0.log("curam.dialog: "+_2c2.getProperty("curam.dialog.id"),_2c8);
curam.dialog._id=_2c8;
_2c6=true;
_2c5.dojo.unsubscribe(_2c7);
});
_2c5.dojo.publish("/curam/dialog/init");
if(!_2c6){
_2c0.log("curam.dialog: "+_2c2.getProperty("curam.dialog.no.id"));
_2c5.dojo.unsubscribe(_2c7);
}
if(curam.dialog.closeDialog(false)){
return;
}
curam.dialog._displayedHandlerUnsToken=util.getTopmostWindow().dojo.subscribe("/curam/dialog/displayed",null,function(_2c9,size){
if(_2c9==curam.dialog._id){
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
var _2ca=dojo.byId("o3ctx");
var sc=new curam.util.ScreenContext(jsScreenContext.getValue());
sc.addContextBits("ACTION|ERROR");
_2ca.value=sc.getValue();
util.connect(form,"onsubmit",curam.dialog.formSubmitHandler);
}
window.curamModal=true;
});
dojo.addOnUnload(function(){
util.getTopmostWindow().dojo.publish("/curam/dialog/iframeUnloaded",[curam.dialog._id,window]);
});
if(_2c6){
dojo.publish("/curam/dialog/ready");
}
},closeDialog:function(_2cb){
if(_2cb){
curam.dialog.forceClose();
}
var _2cc=curam.dialog.checkClose(curam.dialog.pageId);
if(_2cc){
util.onLoad.addPublisher(function(_2cd){
_2cd.modalClosing=true;
});
if(curam.dialog.messagesExist){
dojo.addOnLoad(function(){
var _2ce=dojo.byId(util.ERROR_MESSAGES_CONTAINER);
var _2cf=dojo.byId(util.ERROR_MESSAGES_LIST);
var _2d0=dojo.byId(curam.dialog.ERROR_MESSAGES_HEADER);
if(_2cf&&_2d0){
util.saveInformationalMsgs(_2cc);
util.disableInformationalLoad();
}else{
_2cc();
}
});
}else{
_2cc();
}
return true;
}
return false;
},addFormInput:function(form,type,name,_2d1){
return dojo.create("input",{"type":type,"name":name,"value":_2d1},form);
},checkClose:function(_2d2){
if(curam.dialog._justClose){
return function(){
curam.dialog.closeModalDialog();
};
}
var _2d3=curam.dialog.getParentWindow(window);
if(!_2d3){
return false;
}
var href=window.location.href;
var _2d4=curam.dialog.MODAL_PREV_FLAG;
var _2d5=util.getUrlParamValue(href,_2d4);
var _2d6=true;
if(_2d5){
if(_2d3){
if(_2d5==_2d2){
_2d6=false;
}
}
}else{
_2d6=false;
}
var _2d7=util.getUrlParamValue(href,"o3ctx");
if(_2d7){
var sc=new curam.util.ScreenContext();
sc.setContext(_2d7);
if(sc.hasContextBits("TREE|ACTION")){
_2d6=false;
}
}
if(_2d6||curam.dialog.FORCE_CLOSE){
if(!curam.dialog.FORCE_CLOSE){
if(_2d5=="user-prefs-editor"){
return function(){
if(_2d3&&_2d3.location!==util.getTopmostWindow().location){
curam.dialog.doRedirect(_2d3);
}
curam.dialog.closeModalDialog();
};
}
return function(){
var rp=util.removeUrlParam;
href=rp(rp(rp(href,_2d4),"o3frame"),util.PREVENT_CACHE_FLAG);
href=util.adjustTargetContext(_2d3,href);
if(_2d3&&_2d3.location!==util.getTopmostWindow().location){
curam.dialog.doRedirect(_2d3,href,true);
}else{
curam.tab.getTabController().handleLinkClick(href);
}
curam.dialog.closeModalDialog();
};
}else{
return function(){
if(_2d3!==util.getTopmostWindow()){
_2d3.curam.util.loadInformationalMsgs();
}
curam.dialog.closeModalDialog();
};
}
}
return false;
},getParentWindow:function(_2d8){
if(!_2d8){
_2c0.log("curam.dialog.getParentWindow(): "+_2c2.getProperty("curam.dialog.no.child"),window);
_2c0.log("returning as parent = ",window.parent.location.href);
return window.parent;
}
_2c0.log("curam.dialog.getParentWindow(): "+_2c2.getProperty("curam.dialog.child"),_2d8.location.href);
var _2d9=curam.dialog._getDialogHierarchy();
for(var i=0;i<_2d9.length;i++){
if(_2d9[i]==_2d8){
var _2da=(i>0)?_2d9[i-1]:_2d9[0];
_2c0.log("curam.dialog.getParentWindow(): "+_2c2.getProperty("curam.dialog.parent.window"),_2da);
return _2da;
}
}
_2c0.log("curam.dialog.getParentWindow(): "+_2c2.getProperty("curam.dialog.child.not.found"),_2d8.location.href);
_2c0.log("curam.dialog.getParentWindow(): "+_2c2.getProperty("curam.dialog.hierarchy"),_2d9);
var ret=_2d9.length>0?_2d9[_2d9.length-1]:undefined;
_2c0.log("curam.dialog.getParentWindow(): "+_2c2.getProperty("curam.dialog.returning.parent"),ret?ret.location.href:"undefined");
return ret;
},_getDialogHierarchy:function(){
var _2db=util.getTopmostWindow();
_2db.require(["curam/dialog"]);
return _2db.curam.dialog._hierarchy;
},pushOntoDialogHierarchy:function(_2dc){
var _2dd=curam.dialog._getDialogHierarchy();
if(dojo.indexOf(_2dd,_2dc)<0){
_2dd.push(_2dc);
_2c0.log(_2c2.getProperty("curam.dialog.add.hierarchy"),_2dc.location.href);
_2c0.log(_2c2.getProperty("curam.dialog.full.hierarchy"),_2dd);
}
},removeFromDialogHierarchy:function(_2de){
var _2df=curam.dialog._getDialogHierarchy();
if(!_2de||_2df[_2df.length-1]==_2de){
_2df.pop();
}else{
_2c0.log("curam.dialog.removeFromDialogHierarchy(): "+_2c2.getProperty("curam.dialog.ignore.request"));
try{
_2c0.log(_2de.location.href);
}
catch(e){
_2c0.log(e.message);
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
},_isSameBaseUrl:function(href,rtc,_2e0){
if(href&&href.indexOf("#")==0){
return true;
}
var _2e1=href.split("?");
var _2e2=rtc.getHref().split("?");
if(_2e1[0].indexOf("/")<0){
var _2e3=_2e2[0].split("/");
_2e2[0]=_2e3[_2e3.length-1];
}
if(_2e2[0].indexOf("/")<0){
var _2e3=_2e1[0].split("/");
_2e1[0]=_2e3[_2e3.length-1];
}
if(_2e0&&_2e0==true){
_2e1[0]=curam.dialog.stripPageOrActionFromUrl(_2e1[0]);
_2e2[0]=curam.dialog.stripPageOrActionFromUrl(_2e2[0]);
}
if(_2e1[0]==_2e2[0]){
return true;
}
return false;
},modalEventHandler:function(_2e4){
curam.dialog._doHandleModalEvent(_2e4,new curam.util.RuntimeContext(window),curam.dialog.closeModalDialog,curam.dialog.doRedirect);
},_doHandleModalEvent:function(e,rtc,_2e5,_2e6){
var _2e7=e.target;
var u=util;
switch(_2e7.tagName){
case "INPUT":
if(dojo.attr(_2e7,"type")=="submit"&&typeof _2e7.form!="undefined"){
_2e7.form.setAttribute("keepModal",_2e7.getAttribute("keepModal"));
}
return true;
case "IMG":
case "SPAN":
case "DIV":
_2e7=cm.getParentByType(_2e7,"A");
if(_2e7==null){
return;
}
case "A":
if(_2e7._submitButton){
_2e7._submitButton.form.setAttribute("keepModal",_2e7._submitButton.getAttribute("keepModal"));
return;
}
break;
default:
return true;
}
var _2e8=dojo.stopEvent;
var href=_2e7.getAttribute("href");
if(href==""){
_2e5();
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
var _2e9=_2e7.getAttribute("target");
if(_2e9&&!curam.dialog.validTargets[_2e9]){
return true;
}
if(href&&href.indexOf("/servlet/FileDownload?")>-1){
var _2ea=dojo.create("iframe",{src:href},dojo.body());
_2ea.style.display="none";
_2e8(e);
return false;
}
if(dojo.hasClass(_2e7,"external-link")){
return true;
}
if(util.isSameUrl(href,null,rtc)){
if(href.indexOf("#")<0){
href=u.replaceUrlParam(href,"o3frame","modal");
href=u.replaceUrlParam(href,"o3ctx",ctx.getValue());
_2e6(window,href);
return false;
}
return true;
}
if(href&&curam.dialog._isSameBaseUrl(href,rtc,true)&&!_2e7.getAttribute("keepModal")){
_2e7.setAttribute("keepModal","true");
}
var _2eb=curam.dialog.getParentWindow(rtc.contextObject());
if(_2e7&&_2e7.getAttribute){
_2e8(e);
if(_2e7.getAttribute("keepModal")=="true"){
href=u.replaceUrlParam(href,"o3frame","modal");
href=u.replaceUrlParam(href,"o3ctx",ctx.getValue());
_2e6(window,href);
}else{
if(_2eb){
href=u.removeUrlParam(href,"o3frame");
href=u.removeUrlParam(href,curam.dialog.MODAL_PREV_FLAG);
if(_2eb.location!==util.getTopmostWindow().location){
var _2ec=new curam.util.RuntimeContext(_2eb);
var _2ed=_2ec.getHref();
_2ed=u.removeUrlParam(_2ed,"o3frame");
if(util.isActionPage(_2ed)){
if(!curam.dialog._isSameBaseUrl(href,_2ec,true)){
href=u.adjustTargetContext(_2eb,href);
_2e6(_2eb,href);
}
}else{
if(!util.isSameUrl(href,_2ed)){
href=u.adjustTargetContext(_2eb,href);
curam.dialog.doRedirect(_2eb,href);
}
}
}else{
var _2ee=new curam.util.ScreenContext("TAB");
href=u.replaceUrlParam(href,"o3ctx",_2ee.getValue());
curam.tab.getTabController().handleLinkClick(href);
}
_2e5();
}
}
return false;
}
if(_2eb&&typeof (_2e7)=="undefined"||_2e7==null||_2e7=="_self"||_2e7==""){
_2e8(e);
href=href.replace(/[&?]o3frame=modal/g,"").replace("%3Fo3frame%3Dmodal","").replace("?o3frame%3Dmodal","");
href=util.updateCtx(href);
if(_2eb.location!==util.getTopmostWindow().location){
_2e6(_2eb,href);
}else{
var _2ee=new curam.util.ScreenContext("TAB");
href=u.replaceUrlParam(href,"o3ctx",_2ee.getValue());
curam.tab.getTabController().handleLinkClick(href);
}
_2e5();
return false;
}
return true;
},formSubmitHandler:function(e){
var _2ef=curam.dialog.getParentWindow(window);
if(typeof _2ef=="undefined"){
return true;
}
e.target.method="post";
e.target.setAttribute("target",window.name);
var _2f0=e.target.action;
var _2f1=curam.dialog.MODAL_PREV_FLAG;
var _2f2=curam.dialog.MODAL_PREV_FLAG_INPUT;
var u=util;
var _2f3=dojo.byId(_2f2);
if(_2f3){
_2f3.parentNode.removeChild(_2f3);
}
if(e.target.getAttribute("keepModal")!="true"&&!jsScreenContext.hasContextBits("AGENDA")){
var _2f4="multipart/form-data";
if(e.target.enctype==_2f4||e.target.encoding==_2f4){
e.target.action=u.removeUrlParam(_2f0,_2f1);
_2f3=curam.dialog.addFormInput(e.target,"hidden",_2f1,curam.dialog.pageId);
_2f3.setAttribute("id",_2f2);
_2f3.id=_2f2;
}else{
e.target.action=u.replaceUrlParam(_2f0,_2f1,curam.dialog.pageId);
}
}else{
e.target.action=u.removeUrlParam(_2f0,_2f1);
}
_2ef.curam.util.invalidatePage();
if(!jsScreenContext.hasContextBits("EXTAPP")){
util.firePageSubmittedEvent("dialog");
}
return true;
},forceClose:function(){
curam.dialog.FORCE_CLOSE=true;
},forceParentRefresh:function(){
var _2f5=curam.dialog.getParentWindow(window);
if(!_2f5){
return;
}
_2f5.curam.util.FORCE_REFRESH=true;
},closeModalDialog:function(){
var _2f6=util.getTopmostWindow();
if(curam.dialog._displayedHandlerUnsToken!=null){
_2f6.dojo.unsubscribe(curam.dialog._displayedHandlerUnsToken);
curam.dialog._displayedHandlerUnsToken=null;
}
if(typeof (curam.dialog._id)=="undefined"||curam.dialog._id==null){
var _2f7=window.frameElement.id;
var _2f8=_2f7.substring(7);
curam.dialog._id=_2f8;
_2c0.log("curam.dialog.closeModalDialog() "+_2c2.getProperty("curam.dialog.modal.id")+_2f8);
}
_2c0.log("publishing /curam/dialog/close for ",curam.dialog._id);
util.getTopmostWindow().dojo.publish("/curam/dialog/close",[curam.dialog._id]);
_2c0.log("publishing /curam/dialog/close for ",curam.dialog._id);
},parseWindowOptions:function(_2f9){
var opts={};
if(_2f9){
_2c0.log("curam.dialog.parseWindowOptions "+_2c2.getProperty("curam.dialog.parsing"),_2f9);
var _2fa=_2f9.split(",");
var _2fb;
for(var i=0;i<_2fa.length;i++){
_2fb=_2fa[i].split("=");
opts[_2fb[0]]=_2fb[1];
}
_2c0.log("done:",dojo.toJson(opts));
}else{
_2c0.log("curam.dialog.parseWindowOptions "+_2c2.getProperty("curam.dialog.no.options"));
}
return opts;
},doRedirect:function(_2fc,href,_2fd,_2fe){
window.curamDialogRedirecting=true;
_2fc.curam.util.redirectWindow(href,_2fd,_2fe);
},closeGracefully:function(){
curam.dialog._justClose=true;
}});
return curam.dialog;
});
},"curam/date/locale":function(){
define("curam/date/locale",["curam/define","dojo/_base/lang","dojo/date/locale"],function(_2ff,lang,_300){
var _301=_300._getGregorianBundle;
function _302(_303){
var _304=_301(_303);
if(LOCALIZED_MONTH_NAMES){
_304["months-format-abbr"]=LOCALIZED_SHORT_MONTH_NAMES;
_304["months-format-wide"]=LOCALIZED_MONTH_NAMES;
}
return _304;
};
_2ff.singleton("curam.date.locale",{});
lang.mixin(curam.date.locale,_300);
curam.date.locale.format=function(_305,_306){
_300._getGregorianBundle=_302;
var _307=_300.format(_305,_306);
_300._getGregorianBundle=_301;
return _307;
};
curam.date.locale.parse=function(_308,_309){
_300._getGregorianBundle=_302;
var _30a=_300.parse(_308,_309);
_300._getGregorianBundle=_301;
return _30a;
};
return curam.date.locale;
});
},"dijit/focus":function(){
define("dijit/focus",["dojo/aspect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/Evented","dojo/_base/lang","dojo/on","dojo/ready","dojo/_base/sniff","dojo/Stateful","dojo/_base/unload","dojo/_base/window","dojo/window","./a11y","./registry","."],function(_30b,_30c,dom,_30d,_30e,_30f,lang,on,_310,has,_311,_312,win,_313,a11y,_314,_315){
var _316=_30c([_311,_30f],{curNode:null,activeStack:[],constructor:function(){
var _317=lang.hitch(this,function(node){
if(dom.isDescendant(this.curNode,node)){
this.set("curNode",null);
}
if(dom.isDescendant(this.prevNode,node)){
this.set("prevNode",null);
}
});
_30b.before(_30e,"empty",_317);
_30b.before(_30e,"destroy",_317);
},registerIframe:function(_318){
return this.registerWin(_318.contentWindow,_318);
},registerWin:function(_319,_31a){
var _31b=this;
var _31c=function(evt){
_31b._justMouseDowned=true;
setTimeout(function(){
_31b._justMouseDowned=false;
},0);
if(has("ie")&&evt&&evt.srcElement&&evt.srcElement.parentNode==null){
return;
}
_31b._onTouchNode(_31a||evt.target||evt.srcElement,"mouse");
};
var doc=has("ie")?_319.document.documentElement:_319.document;
if(doc){
if(has("ie")){
_319.document.body.attachEvent("onmousedown",_31c);
var _31d=function(evt){
var tag=evt.srcElement.tagName.toLowerCase();
if(tag=="#document"||tag=="body"){
return;
}
if(a11y.isTabNavigable(evt.srcElement)){
_31b._onFocusNode(_31a||evt.srcElement);
}else{
_31b._onTouchNode(_31a||evt.srcElement);
}
};
doc.attachEvent("onactivate",_31d);
var _31e=function(evt){
_31b._onBlurNode(_31a||evt.srcElement);
};
doc.attachEvent("ondeactivate",_31e);
return {remove:function(){
_319.document.detachEvent("onmousedown",_31c);
doc.detachEvent("onactivate",_31d);
doc.detachEvent("ondeactivate",_31e);
doc=null;
}};
}else{
doc.body.addEventListener("mousedown",_31c,true);
doc.body.addEventListener("touchstart",_31c,true);
var _31f=function(evt){
_31b._onFocusNode(_31a||evt.target);
};
doc.addEventListener("focus",_31f,true);
var _320=function(evt){
_31b._onBlurNode(_31a||evt.target);
};
doc.addEventListener("blur",_320,true);
return {remove:function(){
doc.body.removeEventListener("mousedown",_31c,true);
doc.body.removeEventListener("touchstart",_31c,true);
doc.removeEventListener("focus",_31f,true);
doc.removeEventListener("blur",_320,true);
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
var _321=[];
try{
while(node){
var _322=_30d.get(node,"dijitPopupParent");
if(_322){
node=_314.byId(_322).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===win.body()){
break;
}
node=_313.get(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId"),_323=id&&_314.byId(id);
if(_323&&!(by=="mouse"&&_323.get("disabled"))){
_321.unshift(id);
}
node=node.parentNode;
}
}
}
}
catch(e){
}
this._setStack(_321,by);
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
},_setStack:function(_324,by){
var _325=this.activeStack;
this.set("activeStack",_324);
for(var _326=0;_326<Math.min(_325.length,_324.length);_326++){
if(_325[_326]!=_324[_326]){
break;
}
}
var _327;
for(var i=_325.length-1;i>=_326;i--){
_327=_314.byId(_325[i]);
if(_327){
_327._hasBeenBlurred=true;
_327.set("focused",false);
if(_327._focusManager==this){
_327._onBlur(by);
}
this.emit("widget-blur",_327,by);
}
}
for(i=_326;i<_324.length;i++){
_327=_314.byId(_324[i]);
if(_327){
_327.set("focused",true);
if(_327._focusManager==this){
_327._onFocus(by);
}
this.emit("widget-focus",_327,by);
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
var _328=new _316();
_310(function(){
var _329=_328.registerWin(win.doc.parentWindow||win.doc.defaultView);
if(has("ie")){
_312.addOnWindowUnload(function(){
_329.remove();
_329=null;
});
}
});
_315.focus=function(node){
_328.focus(node);
};
for(var attr in _328){
if(!/^_/.test(attr)){
_315.focus[attr]=typeof _328[attr]=="function"?lang.hitch(_328,attr):_328[attr];
}
}
_328.watch(function(attr,_32a,_32b){
_315.focus[attr]=_32b;
});
return _328;
});
},"dojo/i18n":function(){
define("dojo/i18n",["./_base/kernel","require","./has","./_base/array","./_base/config","./_base/lang","./_base/xhr","./json"],function(dojo,_32c,has,_32d,_32e,lang,xhr,json){
true||has.add("dojo-preload-i18n-Api",1);
true||has.add("dojo-v1x-i18n-Api",1);
var _32f=dojo.i18n={},_330=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,_331=function(root,_332,_333,_334){
for(var _335=[_333+_334],_336=_332.split("-"),_337="",i=0;i<_336.length;i++){
_337+=(_337?"-":"")+_336[i];
if(!root||root[_337]){
_335.push(_333+_337+"/"+_334);
}
}
return _335;
},_338={},_339=dojo.getL10nName=function(_33a,_33b,_33c){
_33c=_33c?_33c.toLowerCase():dojo.locale;
_33a="dojo/i18n!"+_33a.replace(/\./g,"/");
_33b=_33b.replace(/\./g,"/");
return (/root/i.test(_33c))?(_33a+"/nls/"+_33b):(_33a+"/nls/"+_33c+"/"+_33b);
},_33d=function(_33e,_33f,_340,_341,_342,load){
_33e([_33f],function(root){
var _343=lang.clone(root.root),_344=_331(!root._v1x&&root,_342,_340,_341);
_33e(_344,function(){
for(var i=1;i<_344.length;i++){
_343=lang.mixin(lang.clone(_343),arguments[i]);
}
var _345=_33f+"/"+_342;
_338[_345]=_343;
load();
});
});
},_346=function(id,_347){
return /^\./.test(id)?_347(id):id;
},_348=function(_349){
var list=_32e.extraLocale||[];
list=lang.isArray(list)?list:[list];
list.push(_349);
return list;
},load=function(id,_34a,load){
if(1){
var _34b=id.split("*"),_34c=_34b[1]=="preload";
if(_34c){
if(!_338[id]){
_338[id]=1;
_34d(_34b[2],json.parse(_34b[3]),1);
}
load(1);
}
if(_34c||_34e(id,_34a,load)){
return;
}
}
var _34f=_330.exec(id),_350=_34f[1]+"/",_351=_34f[5]||_34f[4],_352=_350+_351,_353=(_34f[5]&&_34f[4]),_354=_353||dojo.locale,_355=_352+"/"+_354,_356=_353?[_354]:_348(_354),_357=_356.length,_358=function(){
if(!--_357){
load(lang.delegate(_338[_355]));
}
};
_32d.forEach(_356,function(_359){
var _35a=_352+"/"+_359;
if(1){
_35b(_35a);
}
if(!_338[_35a]){
_33d(_34a,_352,_350,_351,_359,_358);
}else{
_358();
}
});
};
if(has("dojo-unit-tests")){
var _35c=_32f.unitTests=[];
}
if(1||1){
var _35d=_32f.normalizeLocale=function(_35e){
var _35f=_35e?_35e.toLowerCase():dojo.locale;
return _35f=="root"?"ROOT":_35f;
},isXd=function(mid){
return (1&&1)?_32c.isXdUrl(_32c.toUrl(mid+".js")):true;
},_360=0,_361=[],_34d=_32f._preloadLocalizations=function(_362,_363,_364){
function _365(_366,func){
var _367=_366.split("-");
while(_367.length){
if(func(_367.join("-"))){
return true;
}
_367.pop();
}
return func("ROOT");
};
function _368(_369){
_369=_35d(_369);
_365(_369,function(loc){
if(_32d.indexOf(_363,loc)>=0){
var mid=_362.replace(/\./g,"/")+"_"+loc;
_360++;
(isXd(mid)||_364?_32c:_36d)([mid],function(_36a){
for(var p in _36a){
_338[p+"/"+loc]=_36a[p];
}
--_360;
while(!_360&&_361.length){
load.apply(null,_361.shift());
}
});
return true;
}
return false;
});
};
_368();
_32d.forEach(dojo.config.extraLocale,_368);
},_34e=function(id,_36b,load){
if(_360){
_361.push([id,_36b,load]);
}
return _360;
};
}
if(1){
var _36c=new Function("__bundle","__checkForLegacyModules","__mid","var define = function(){define.called = 1;},"+"    require = function(){define.called = 1;};"+"try{"+"define.called = 0;"+"eval(__bundle);"+"if(define.called==1)"+"return 1;"+"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"+"return __checkForLegacyModules;"+"}catch(e){}"+"try{"+"return eval('('+__bundle+')');"+"}catch(e){"+"return e;"+"}"),_36d=function(deps,_36e){
var _36f=[];
_32d.forEach(deps,function(mid){
var url=_32c.toUrl(mid+".js");
function load(text){
var _370=_36c(text,_35b,mid);
if(_370===1){
_32c([mid],function(_371){
_36f.push(_338[url]=_371);
});
}else{
if(_370 instanceof Error){
console.error("failed to evaluate i18n bundle; url="+url,_370);
_370={};
}
_36f.push(_338[url]=(/nls\/[^\/]+\/[^\/]+$/.test(url)?_370:{root:_370,_v1x:1}));
}
};
if(_338[url]){
_36f.push(_338[url]);
}else{
var _372=_32c.syncLoadNls(mid);
if(_372){
_36f.push(_372);
}else{
if(!xhr){
try{
_32c.getText(url,true,load);
}
catch(e){
_36f.push(_338[url]={});
}
}else{
xhr.get({url:url,sync:true,load:load,error:function(){
_36f.push(_338[url]={});
}});
}
}
}
});
_36e&&_36e.apply(null,_36f);
},_35b=function(_373){
for(var _374,_375=_373.split("/"),_376=dojo.global[_375[0]],i=1;_376&&i<_375.length-1;_376=_376[_375[i++]]){
}
if(_376){
_374=_376[_375[i]];
if(!_374){
_374=_376[_375[i].replace(/-/g,"_")];
}
if(_374){
_338[_373]=_374;
}
}
return _374;
};
_32f.getLocalization=function(_377,_378,_379){
var _37a,_37b=_339(_377,_378,_379).substring(10);
load(_37b,(!isXd(_37b)?_36d:_32c),function(_37c){
_37a=_37c;
});
return _37a;
};
if(has("dojo-unit-tests")){
_35c.push(function(doh){
doh.register("tests.i18n.unit",function(t){
var _37d;
_37d=_36c("{prop:1}");
t.is({prop:1},_37d);
t.is(undefined,_37d[1]);
_37d=_36c("({prop:1})");
t.is({prop:1},_37d);
t.is(undefined,_37d[1]);
_37d=_36c("{'prop-x':1}");
t.is({"prop-x":1},_37d);
t.is(undefined,_37d[1]);
_37d=_36c("({'prop-x':1})");
t.is({"prop-x":1},_37d);
t.is(undefined,_37d[1]);
_37d=_36c("define({'prop-x':1})");
t.is(1,_37d);
_37d=_36c("this is total nonsense and should throw an error");
t.is(_37d instanceof Error,true);
});
});
}
}
return lang.mixin(_32f,{dynamic:true,normalize:_346,load:load,cache:_338});
});
},"dijit/hccss":function(){
define("dijit/hccss",["require","dojo/_base/config","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/ready","dojo/_base/sniff","dojo/_base/window"],function(_37e,_37f,_380,_381,_382,_383,has,win){
if(has("ie")||has("mozilla")){
_383(90,function(){
var div=_381.create("div",{id:"a11yTestNode",style:{cssText:"border: 1px solid;"+"border-color:red green;"+"position: absolute;"+"height: 5px;"+"top: -999px;"+"background-image: url(\""+(_37f.blankGif||_37e.toUrl("dojo/resources/blank.gif"))+"\");"}},win.body());
var cs=_382.getComputedStyle(div);
if(cs){
var _384=cs.backgroundImage;
var _385=(cs.borderTopColor==cs.borderRightColor)||(_384!=null&&(_384=="none"||_384=="url(invalid-url:)"));
if(_385){
_380.add(win.body(),"dijit_a11y");
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
},"url:curam/layout/resources/ModalUIMController.html":"<div id=\"uimcontroller_${uid}\" class=\"uimcontroller_${uid} uimController ${classList}\" data-dojo-attach-point=\"uimController\">\r\n  <div style=\"display:none;\" \r\n       id=\"uimcontroller_tc_${uid}\" \r\n       class=\"ipnTabController in-page-nav-tabContainer\"\r\n       data-dojo-attach-point=\"tabController\" \r\n       data-dojo-type=\"curam.layout.TabContainer\">\r\n  </div>\r\n  <div class=\"contentPanelFrameWrapper3\"  \r\n        data-dojo-attach-point=\"frameWrapper\">\r\n    <iframe frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\"\r\n             allowTransparency=\"true\" \r\n             id=\"${iframeId}\" \r\n             data-dojo-attach-point=\"frame\"                 \r\n             class=\"${iframeId} ${iframeClassList}\"\r\n             iscpiframe=\"${iscpiframe}\"\r\n             title=\"${title}\" >\r\n    </iframe>\r\n    <span tabIndex=\"0\" class=\"hidden\" id=\"end-${uid}\">${endModalUIMController}</span>\r\n  </div> \r\n</div>","curam/util/LocalConfig":function(){
define("curam/util/LocalConfig",[],function(){
var _386=function(name){
return "curam_util_LocalConfig_"+name;
},_387=function(name,_388){
var _389=_386(name);
if(typeof top[_389]==="undefined"){
top[_389]=_388;
}
return top[_389];
},_38a=function(name){
return top[_386(name)];
};
_387("seedValues",{}),_387("overrides",{});
var _38b=function(_38c,_38d){
if(typeof _38c!=="undefined"&&typeof _38c!=="string"){
throw new Error("Invalid "+_38d+" type: "+typeof _38c+"; expected string");
}
};
var _38e={seedOption:function(name,_38f,_390){
_38b(_38f,"value");
_38b(_390,"defaultValue");
_38a("seedValues")[name]=(typeof _38f!=="undefined")?_38f:_390;
},overrideOption:function(name,_391){
_38b(_391,"value");
if(typeof (Storage)!=="undefined"){
localStorage[name]=_391;
}else{
_38a("overrides")[name]=_391;
}
},readOption:function(name,_392){
_38b(_392,"defaultValue");
var _393=null;
if(typeof (Storage)!=="undefined"&&typeof localStorage[name]!=="undefined"){
_393=localStorage[name];
}else{
if(typeof _38a("overrides")[name]!=="undefined"){
_393=_38a("overrides")[name];
}else{
if(typeof _38a("seedValues")[name]!=="undefined"){
_393=_38a("seedValues")[name];
}else{
_393=_392;
}
}
}
return _393;
},clearOption:function(name){
if(typeof (Storage)!=="undefined"){
localStorage.removeItem(name);
}
delete _38a("overrides")[name];
delete _38a("seedValues")[name];
}};
return _38e;
});
},"dijit/PopupMenuBarItem":function(){
define("dijit/PopupMenuBarItem",["dojo/_base/declare","./PopupMenuItem","./MenuBarItem"],function(_394,_395,_396){
var _397=_396._MenuBarItemMixin;
return _394("dijit.PopupMenuBarItem",[_395,_397],{});
});
},"dijit/tree/ForestStoreModel":function(){
define("dijit/tree/ForestStoreModel",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/_base/window","./TreeStoreModel"],function(_398,_399,lang,win,_39a){
return _399("dijit.tree.ForestStoreModel",_39a,{rootId:"$root$",rootLabel:"ROOT",query:null,constructor:function(_39b){
this.root={store:this,root:true,id:_39b.rootId,label:_39b.rootLabel,children:_39b.rootChildren};
},mayHaveChildren:function(item){
return item===this.root||this.inherited(arguments);
},getChildren:function(_39c,_39d,_39e){
if(_39c===this.root){
if(this.root.children){
_39d(this.root.children);
}else{
this.store.fetch({query:this.query,onComplete:lang.hitch(this,function(_39f){
this.root.children=_39f;
_39d(_39f);
}),onError:_39e});
}
}else{
this.inherited(arguments);
}
},isItem:function(_3a0){
return (_3a0===this.root)?true:this.inherited(arguments);
},fetchItemByIdentity:function(_3a1){
if(_3a1.identity==this.root.id){
var _3a2=_3a1.scope?_3a1.scope:win.global;
if(_3a1.onItem){
_3a1.onItem.call(_3a2,this.root);
}
}else{
this.inherited(arguments);
}
},getIdentity:function(item){
return (item===this.root)?this.root.id:this.inherited(arguments);
},getLabel:function(item){
return (item===this.root)?this.root.label:this.inherited(arguments);
},newItem:function(args,_3a3,_3a4){
if(_3a3===this.root){
this.onNewRootItem(args);
return this.store.newItem(args);
}else{
return this.inherited(arguments);
}
},onNewRootItem:function(){
},pasteItem:function(_3a5,_3a6,_3a7,_3a8,_3a9){
if(_3a6===this.root){
if(!_3a8){
this.onLeaveRoot(_3a5);
}
}
this.inherited(arguments,[_3a5,_3a6===this.root?null:_3a6,_3a7===this.root?null:_3a7,_3a8,_3a9]);
if(_3a7===this.root){
this.onAddToRoot(_3a5);
}
},onAddToRoot:function(item){
console.log(this,": item ",item," added to root");
},onLeaveRoot:function(item){
console.log(this,": item ",item," removed from root");
},_requeryTop:function(){
var _3aa=this.root.children||[];
this.store.fetch({query:this.query,onComplete:lang.hitch(this,function(_3ab){
this.root.children=_3ab;
if(_3aa.length!=_3ab.length||_398.some(_3aa,function(item,idx){
return _3ab[idx]!=item;
})){
this.onChildrenChange(this.root,_3ab);
}
})});
},onNewItem:function(item,_3ac){
this._requeryTop();
this.inherited(arguments);
},onDeleteItem:function(item){
if(_398.indexOf(this.root.children,item)!=-1){
this._requeryTop();
}
this.inherited(arguments);
},onSetItem:function(item,_3ad,_3ae,_3af){
this._requeryTop();
this.inherited(arguments);
}});
});
},"curam/i18n":function(){
define("curam/i18n",["curam/define"],function(){
curam.define.singleton("curam.i18n",{values:{},set:function(key,_3b0){
curam.i18n.values[key]=_3b0;
},get:function(key){
return curam.i18n.values[key];
}});
return curam.i18n;
});
},"curam/pagination":function(){
define("curam/pagination",["curam/define","dojo/parser","curam/pagination/ControlPanel","curam/pagination/StateController","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _3b1=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.pagination",{defaultPageSize:15,threshold:15,listModels:{},ROW_COUNT_CLASS_NAME:"numRows-",ESC_SCRIPT_START:"<!--@pg@",ESC_SCRIPT_END:"@pg@-->",localizedStrings:{firstPage_btn:"|<",firstPage_title:"$not-localized$ First page",prevPage_btn:"<",prevPage_title:"$not-localized$ Previous page",nextPage_btn:">",nextPage_title:"$not-localized$ Next page",lastPage_btn:">|",lastPage_title:"$not-localized$ Last page",pageSize_title:"$not-localized$ Page size",pagination_info:"$not-localized$ Displaying rows %s to %s out of %s",page_title:"Go to page"},addPagination:function(_3b2,_3b3){
var _3b4=_3b2.getRowCount();
if(_3b4<=curam.pagination.threshold){
_3b2.showRange(1,_3b4);
return;
}
var _3b5=_3b2.getId();
curam.debug.log("curam.pagination.addPagination: listId: ",_3b5);
if(curam.pagination.listModels[_3b5]){
throw "Pagination on this list has already been initialized: "+_3b5;
}
curam.pagination.listModels[_3b5]=_3b2;
curam.debug.log("curam.pagination.listModels : ",curam.pagination.listModels);
var gui=new curam.pagination.ControlPanel(_3b3);
var _3b6=new curam.pagination.StateController(_3b2,gui);
_3b2._controller=_3b6;
dojo.subscribe("/curam/list/toBeSorted",this,function(_3b7){
curam.debug.log(_3b1.getProperty("curam.omega3-util.received")+" /curam/list/toBeSorted "+_3b1.getProperty("curam.omega3-util.for")+":",_3b7);
curam.pagination.unpackAll(curam.pagination.listModels[_3b7]);
});
dojo.subscribe("/curam/list/sorted",this,function(_3b8){
curam.debug.log(_3b1.getProperty("curam.omega3-util.received")+" /curam/list/sorted "+_3b1.getProperty("curam.omega3-util.for")+":",_3b8);
curam.pagination.paginatedListSorted(curam.pagination.listModels[_3b8]);
});
_3b6.gotoFirst();
},paginatedListSorted:function(_3b9){
_3b9._controller.reset();
},unpackRows:function(_3ba){
var _3bb=_3ba.innerHTML;
var _3bc=dojo.hasClass(_3ba,"has-row-actions");
if(_3bc){
_3bb=_3bb.replace(new RegExp(curam.pagination.ESC_SCRIPT_START,"g"),"<script type=\"text/javascript\">");
_3bb=_3bb.replace(new RegExp(curam.pagination.ESC_SCRIPT_END,"g"),"</script>");
}
var _3bd=dojo._toDom(_3bb);
if(_3bc){
dojo.query("script",_3bd).forEach(function(s){
eval(s.innerHTML);
});
dojo.parser.parse(_3bd);
}
dojo.place(_3bd,_3ba,"replace");
},unpackAll:function(_3be){
_3be._controller.gotoLast();
},readListContent:function(_3bf){
return dojo.query("tbody > *",_3bf).filter(function(n){
return typeof (n.tagName)!="undefined"&&(n.tagName=="TR"||(n.tagName=="SCRIPT"&&dojo.attr(n,"type")=="list-row-container"));
});
},getNumRowsInBlock:function(_3c0){
var _3c1=dojo.filter(_3c0.className.split(" "),function(cn){
return cn.indexOf(curam.pagination.ROW_COUNT_CLASS_NAME)==0;
});
return parseInt(_3c1[0].split(curam.pagination.ROW_COUNT_CLASS_NAME)[1]);
}});
return curam.pagination;
});
},"dijit/TitlePane":function(){
require({cache:{"url:dijit/templates/TitlePane.html":"<div>\n\t<div data-dojo-attach-event=\"onclick:_onTitleClick, onkeypress:_onTitleKey\"\n\t\t\tclass=\"dijitTitlePaneTitle\" data-dojo-attach-point=\"titleBarNode\">\n\t\t<div class=\"dijitTitlePaneTitleFocus\" data-dojo-attach-point=\"focusNode\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"arrowNode\" class=\"dijitArrowNode\" role=\"presentation\"\n\t\t\t/><span data-dojo-attach-point=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span\n\t\t\t><span data-dojo-attach-point=\"titleNode\" class=\"dijitTitlePaneTextNode\"></span>\n\t\t</div>\n\t</div>\n\t<div class=\"dijitTitlePaneContentOuter\" data-dojo-attach-point=\"hideNode\" role=\"presentation\">\n\t\t<div class=\"dijitReset\" data-dojo-attach-point=\"wipeNode\" role=\"presentation\">\n\t\t\t<div class=\"dijitTitlePaneContentInner\" data-dojo-attach-point=\"containerNode\" role=\"region\" id=\"${id}_pane\">\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"}});
define("dijit/TitlePane",["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/_base/event","dojo/fx","dojo/_base/kernel","dojo/keys","./_CssStateMixin","./_TemplatedMixin","./layout/ContentPane","dojo/text!./templates/TitlePane.html","./_base/manager"],function(_3c2,_3c3,dom,_3c4,_3c5,_3c6,_3c7,_3c8,_3c9,keys,_3ca,_3cb,_3cc,_3cd,_3ce){
return _3c3("dijit.TitlePane",[_3cc,_3cb,_3ca],{title:"",_setTitleAttr:{node:"titleNode",type:"innerHTML"},open:true,toggleable:true,tabIndex:"0",duration:_3ce.defaultDuration,baseClass:"dijitTitlePane",templateString:_3cd,doLayout:false,_setTooltipAttr:{node:"focusNode",type:"attribute",attribute:"title"},buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.titleNode,false);
},postCreate:function(){
this.inherited(arguments);
if(this.toggleable){
this._trackMouseState(this.titleBarNode,"dijitTitlePaneTitle");
}
var _3cf=this.hideNode,_3d0=this.wipeNode;
this._wipeIn=_3c8.wipeIn({node:_3d0,duration:this.duration,beforeBegin:function(){
_3cf.style.display="";
}});
this._wipeOut=_3c8.wipeOut({node:_3d0,duration:this.duration,onEnd:function(){
_3cf.style.display="none";
}});
},_setOpenAttr:function(open,_3d1){
_3c2.forEach([this._wipeIn,this._wipeOut],function(_3d2){
if(_3d2&&_3d2.status()=="playing"){
_3d2.stop();
}
});
if(_3d1){
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
},_setToggleableAttr:function(_3d3){
this.focusNode.setAttribute("role",_3d3?"button":"heading");
if(_3d3){
this.focusNode.setAttribute("aria-controls",this.id+"_pane");
_3c4.set(this.focusNode,"tabIndex",this.tabIndex);
}else{
_3c4.remove(this.focusNode,"tabIndex");
}
this._set("toggleable",_3d3);
this._setCss();
},_setContentAttr:function(_3d4){
if(!this.open||!this._wipeOut||this._wipeOut.status()=="playing"){
this.inherited(arguments);
}else{
if(this._wipeIn&&this._wipeIn.status()=="playing"){
this._wipeIn.stop();
}
_3c6.setMarginBox(this.wipeNode,{h:_3c6.getMarginBox(this.wipeNode).h});
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
var _3d5=this._titleBarClass;
this._titleBarClass="dijit"+(this.toggleable?"":"Fixed")+(this.open?"Open":"Closed");
_3c5.replace(node,this._titleBarClass,_3d5||"");
this.arrowNodeInner.innerHTML=this.open?"-":"+";
},_onTitleKey:function(e){
if(e.charOrCode==keys.ENTER||e.charOrCode==" "){
if(this.toggleable){
this.toggle();
}
_3c7.stop(e);
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
},setTitle:function(_3d6){
_3c9.deprecated("dijit.TitlePane.setTitle() is deprecated.  Use set('title', ...) instead.","","2.0");
this.set("title",_3d6);
}});
});
},"url:curam/widget/resources/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:${onClickValue}\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n","curam/charting":function(){
define("curam/charting",["dojo/dom-class","dojo/ready","cm/_base/_dom","curam/define"],function(_3d7,_3d8,dom,_3d9){
_3d9.singleton("curam.charting",{alignChartWrapper:function(node){
_3d8(function(){
node=dom.getParentByClass(dojo.byId(node),"cluster");
if(node){
_3d7.add(node,"chart-panel");
}
});
}});
return curam.charting;
});
},"curam/widget/ComboBox":function(){
require({cache:{"url:curam/widget/templates/ComboBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\r\n  id=\"widget_${id}\"\r\n  role=\"listbox\"\r\n  ><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\r\n    data-dojo-attach-point=\"_buttonNode, _popupStateNode\" role=\"presentation\"\r\n    ><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n      ${_buttonInputDisabled}\r\n  /></div\r\n  ><div class='dijitReset dijitValidationContainer'\r\n    ><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n  /></div\r\n  ><div class=\"dijitReset dijitInputField dijitInputContainer\" role=\"listbox\"\r\n    ><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\r\n      data-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\r\n  /></div\r\n></div>\r\n"}});
define("curam/widget/ComboBox",["dijit/registry","dojo/on","dojo/text!curam/widget/templates/ComboBox.html","dijit/form/ComboBox"],function(_3da,on,_3db){
var _3dc=dojo.declare("curam.widget.ComboBox",dijit.form.ComboBox,{templateString:_3db,enterKeyOnOpenDropDown:false,postCreate:function(){
on(this.focusNode,"keydown",function(e){
var _3dd=_3da.byNode(dojo.byId("widget_"+e.target.id));
if(e.keyCode==dojo.keys.ENTER&&_3dd._opened){
_3dd.enterKeyOnOpenDropDown=true;
}
});
this.inherited(arguments);
}});
return _3dc;
});
},"dijit/form/_ComboBoxMenuMixin":function(){
define("dijit/form/_ComboBoxMenuMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/i18n","dojo/_base/window","dojo/i18n!./nls/ComboBox"],function(_3de,_3df,_3e0,i18n,win){
return _3df("dijit.form._ComboBoxMenuMixin",null,{_messages:null,postMixInProperties:function(){
this.inherited(arguments);
this._messages=i18n.getLocalization("dijit.form","ComboBox",this.lang);
},buildRendering:function(){
this.inherited(arguments);
this.previousButton.innerHTML=this._messages["previousMessage"];
this.nextButton.innerHTML=this._messages["nextMessage"];
},_setValueAttr:function(_3e1){
this.value=_3e1;
this.onChange(_3e1);
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
},_createOption:function(item,_3e2){
var _3e3=this._createMenuItem();
var _3e4=_3e2(item);
if(_3e4.html){
_3e3.innerHTML=_3e4.label;
}else{
_3e3.appendChild(win.doc.createTextNode(_3e4.label));
}
if(_3e3.innerHTML==""){
_3e3.innerHTML="&#160;";
}
this.applyTextDir(_3e3,(_3e3.innerText||_3e3.textContent||""));
_3e3.item=item;
return _3e3;
},createOptions:function(_3e5,_3e6,_3e7){
this.items=_3e5;
this.previousButton.style.display=(_3e6.start==0)?"none":"";
_3e0.set(this.previousButton,"id",this.id+"_prev");
_3de.forEach(_3e5,function(item,i){
var _3e8=this._createOption(item,_3e7);
_3e8.setAttribute("item",i);
_3e0.set(_3e8,"id",this.id+i);
this.nextButton.parentNode.insertBefore(_3e8,this.nextButton);
},this);
var _3e9=false;
if(_3e5.total&&!_3e5.total.then&&_3e5.total!=-1){
if((_3e6.start+_3e6.count)<_3e5.total){
_3e9=true;
}else{
if((_3e6.start+_3e6.count)>_3e5.total&&_3e6.count==_3e5.length){
_3e9=true;
}
}
}else{
if(_3e6.count==_3e5.length){
_3e9=true;
}
}
this.nextButton.style.display=_3e9?"":"none";
_3e0.set(this.nextButton,"id",this.id+"_next");
},clearResultList:function(){
var _3ea=this.containerNode;
while(_3ea.childNodes.length>2){
_3ea.removeChild(_3ea.childNodes[_3ea.childNodes.length-2]);
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
},"dojo/parser":function(){
define("dojo/parser",["./_base/kernel","./_base/lang","./_base/array","./_base/config","./_base/html","./_base/window","./_base/url","./_base/json","./aspect","./date/stamp","./has","./query","./on","./ready"],function(dojo,_3eb,_3ec,_3ed,_3ee,_3ef,_3f0,_3f1,_3f2,_3f3,has,_3f4,don,_3f5){
new Date("X");
if(1){
var form=document.createElement("form");
has.add("dom-attributes-explicit",form.attributes.length==0);
has.add("dom-attributes-specified-flag",form.attributes.length<40);
}
dojo.parser=new function(){
var _3f6={};
function _3f7(_3f8){
var map={};
for(var name in _3f8){
if(name.charAt(0)=="_"){
continue;
}
map[name.toLowerCase()]=name;
}
return map;
};
_3f2.after(_3eb,"extend",function(){
_3f6={};
},true);
var _3f9={};
function _3fa(type){
var map=_3f9[type]||(_3f9[type]={});
return map["__type"]||(map["__type"]=(_3eb.getObject(type)||require(type)));
};
this._functionFromScript=function(_3fb,_3fc){
var _3fd="";
var _3fe="";
var _3ff=(_3fb.getAttribute(_3fc+"args")||_3fb.getAttribute("args"));
if(_3ff){
_3ec.forEach(_3ff.split(/\s*,\s*/),function(part,idx){
_3fd+="var "+part+" = arguments["+idx+"]; ";
});
}
var _400=_3fb.getAttribute("with");
if(_400&&_400.length){
_3ec.forEach(_400.split(/\s*,\s*/),function(part){
_3fd+="with("+part+"){";
_3fe+="}";
});
}
return new Function(_3fd+_3fb.innerHTML+_3fe);
};
this.instantiate=function(_401,_402,_403){
_402=_402||{};
_403=_403||{};
var _404=(_403.scope||dojo._scopeName)+"Type",_405="data-"+(_403.scope||dojo._scopeName)+"-",_406=_405+"type";
var list=[];
_3ec.forEach(_401,function(node){
var type=_404 in _402?_402[_404]:node.getAttribute(_406)||node.getAttribute(_404);
if(type){
list.push({node:node,"type":type});
}
});
return this._instantiate(list,_402,_403);
};
this._instantiate=function(_407,_408,_409){
var _40a=[];
var _40b=(_409.scope||dojo._scopeName)+"Type",_40c="data-"+(_409.scope||dojo._scopeName)+"-",_40d=_40c+"type",_40e=_40c+"props",_40f=_40c+"attach-point",_410=_40c+"attach-event",_411=_40c+"id",_412=_40c+"mixins";
var _413={};
_3ec.forEach([_40e,_40d,_40b,_411,"jsId",_40f,_410,"dojoAttachPoint","dojoAttachEvent","class","style",_412],function(name){
_413[name.toLowerCase()]=name.replace(_409.scope,"dojo");
});
function _414(type,_415){
return type.createSubclass&&type.createSubclass(_415)||type.extend.apply(type,_415);
};
_3ec.forEach(_407,function(obj){
if(!obj){
return;
}
var node=obj.node,type=obj.type,_416=node.getAttribute(_412),ctor;
if(_416){
var map=_3f9[type];
_416=_416.replace(/ /g,"");
ctor=map&&map[_416];
if(!ctor){
ctor=_3fa(type);
ctor=_3f9[type][_416]=_414(ctor,_3ec.map(_416.split(","),_3fa));
}
}else{
ctor=_3fa(type);
}
var _417=ctor&&ctor.prototype;
var _418={};
if(_409.defaults){
_3eb.mixin(_418,_409.defaults);
}
if(obj.inherited){
_3eb.mixin(_418,obj.inherited);
}
var _419;
if(has("dom-attributes-explicit")){
_419=node.attributes;
}else{
if(has("dom-attributes-specified-flag")){
_419=_3ec.filter(node.attributes,function(a){
return a.specified;
});
}else{
var _41a=/^input$|^img$/i.test(node.nodeName)?node:node.cloneNode(false),_41b=_41a.outerHTML.replace(/=[^\s"']+|="[^"]*"|='[^']*'/g,"").replace(/^\s*<[a-zA-Z0-9]*\s*/,"").replace(/\s*>.*$/,"");
_419=_3ec.map(_41b.split(/\s+/),function(name){
var _41c=name.toLowerCase();
return {name:name,value:(node.nodeName=="LI"&&name=="value")||_41c=="enctype"?node.getAttribute(_41c):node.getAttributeNode(_41c).value};
});
}
}
var i=0,item;
while(item=_419[i++]){
var name=item.name,_41d=name.toLowerCase(),_41e=item.value;
if(_41d in _413){
switch(_413[_41d]){
case "data-dojo-props":
var _41f=_41e;
break;
case "data-dojo-id":
case "jsId":
var _420=_41e;
break;
case "data-dojo-attach-point":
case "dojoAttachPoint":
_418.dojoAttachPoint=_41e;
break;
case "data-dojo-attach-event":
case "dojoAttachEvent":
_418.dojoAttachEvent=_41e;
break;
case "class":
_418["class"]=node.className;
break;
case "style":
_418["style"]=node.style&&node.style.cssText;
break;
}
}else{
if(!(name in _417)){
var map=(_3f6[type]||(_3f6[type]=_3f7(_417)));
name=map[_41d]||name;
}
if(name in _417){
switch(typeof _417[name]){
case "string":
_418[name]=_41e;
break;
case "number":
_418[name]=_41e.length?Number(_41e):NaN;
break;
case "boolean":
_418[name]=_41e.toLowerCase()!="false";
break;
case "function":
if(_41e===""||_41e.search(/[^\w\.]+/i)!=-1){
_418[name]=new Function(_41e);
}else{
_418[name]=_3eb.getObject(_41e,false)||new Function(_41e);
}
break;
default:
var pVal=_417[name];
_418[name]=(pVal&&"length" in pVal)?(_41e?_41e.split(/\s*,\s*/):[]):(pVal instanceof Date)?(_41e==""?new Date(""):_41e=="now"?new Date():_3f3.fromISOString(_41e)):(pVal instanceof dojo._Url)?(dojo.baseUrl+_41e):_3f1.fromJson(_41e);
}
}else{
_418[name]=_41e;
}
}
}
if(_41f){
try{
_41f=_3f1.fromJson.call(_409.propsThis,"{"+_41f+"}");
_3eb.mixin(_418,_41f);
}
catch(e){
throw new Error(e.toString()+" in data-dojo-props='"+_41f+"'");
}
}
_3eb.mixin(_418,_408);
var _421=obj.scripts||(ctor&&(ctor._noScript||_417._noScript)?[]:_3f4("> script[type^='dojo/']",node));
var _422=[],_423=[],_424=[],on=[];
if(_421){
for(i=0;i<_421.length;i++){
var _425=_421[i];
node.removeChild(_425);
var _426=(_425.getAttribute(_40c+"event")||_425.getAttribute("event")),prop=_425.getAttribute(_40c+"prop"),_427=_425.getAttribute("type"),nf=this._functionFromScript(_425,_40c);
if(_426){
if(_427=="dojo/connect"){
_422.push({event:_426,func:nf});
}else{
if(_427=="dojo/on"){
on.push({event:_426,func:nf});
}else{
_418[_426]=nf;
}
}
}else{
if(_427=="dojo/watch"){
_424.push({prop:prop,func:nf});
}else{
_423.push(nf);
}
}
}
}
var _428=ctor.markupFactory||_417.markupFactory;
var _429=_428?_428(_418,node,ctor):new ctor(_418,node);
_40a.push(_429);
if(_420){
_3eb.setObject(_420,_429);
}
for(i=0;i<_422.length;i++){
_3f2.after(_429,_422[i].event,dojo.hitch(_429,_422[i].func),true);
}
for(i=0;i<_423.length;i++){
_423[i].call(_429);
}
for(i=0;i<_424.length;i++){
_429.watch(_424[i].prop,_424[i].func);
}
for(i=0;i<on.length;i++){
don(_429,on[i].event,on[i].func);
}
},this);
if(!_408._started){
_3ec.forEach(_40a,function(_42a){
if(!_409.noStart&&_42a&&_3eb.isFunction(_42a.startup)&&!_42a._started){
_42a.startup();
}
});
}
return _40a;
};
this.scan=function(root,_42b){
var list=[];
var _42c=(_42b.scope||dojo._scopeName)+"Type",_42d="data-"+(_42b.scope||dojo._scopeName)+"-",_42e=_42d+"type",_42f=_42d+"textdir";
var node=root.firstChild;
var _430=_42b.inherited;
if(!_430){
function _431(node,attr){
return (node.getAttribute&&node.getAttribute(attr))||(node!==_3ef.doc&&node!==_3ef.doc.documentElement&&node.parentNode?_431(node.parentNode,attr):null);
};
_430={dir:_431(root,"dir"),lang:_431(root,"lang"),textDir:_431(root,_42f)};
for(var key in _430){
if(!_430[key]){
delete _430[key];
}
}
}
var _432={inherited:_430};
var _433;
var _434;
function _435(_436){
if(!_436.inherited){
_436.inherited={};
var node=_436.node,_437=_435(_436.parent);
var _438={dir:node.getAttribute("dir")||_437.dir,lang:node.getAttribute("lang")||_437.lang,textDir:node.getAttribute(_42f)||_437.textDir};
for(var key in _438){
if(_438[key]){
_436.inherited[key]=_438[key];
}
}
}
return _436.inherited;
};
while(true){
if(!node){
if(!_432||!_432.node){
break;
}
node=_432.node.nextSibling;
_433=_432.scripts;
_434=false;
_432=_432.parent;
continue;
}
if(node.nodeType!=1){
node=node.nextSibling;
continue;
}
if(_433&&node.nodeName.toLowerCase()=="script"){
type=node.getAttribute("type");
if(type&&/^dojo\/\w/i.test(type)){
_433.push(node);
}
node=node.nextSibling;
continue;
}
if(_434){
node=node.nextSibling;
continue;
}
var type=node.getAttribute(_42e)||node.getAttribute(_42c);
var _439=node.firstChild;
if(!type&&(!_439||(_439.nodeType==3&&!_439.nextSibling))){
node=node.nextSibling;
continue;
}
var _43a={node:node,scripts:_433,parent:_432};
var ctor;
try{
ctor=type&&_3fa(type);
}
catch(e){
}
var _43b=ctor&&!ctor.prototype._noScript?[]:null;
if(type){
list.push({"type":type,node:node,scripts:_43b,inherited:_435(_43a)});
}
node=_439;
_433=_43b;
_434=ctor&&ctor.prototype.stopParser&&!(_42b.template);
_432=_43a;
}
return list;
};
this.parse=function(_43c,_43d){
var root;
if(!_43d&&_43c&&_43c.rootNode){
_43d=_43c;
root=_43d.rootNode;
}else{
if(_43c&&_3eb.isObject(_43c)&&!("nodeType" in _43c)){
_43d=_43c;
}else{
root=_43c;
}
}
root=root?_3ee.byId(root):_3ef.body();
_43d=_43d||{};
var list=this.scan(root,_43d);
var _43e=_43d.template?{template:true}:{};
return this._instantiate(list,_43e,_43d);
};
}();
if(_3ed.parseOnLoad){
_3f5(100,dojo.parser,"parse");
}
return dojo.parser;
});
},"dojox/html/_base":function(){
define("dojox/html/_base",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/xhr","dojo/_base/window","dojo/_base/sniff","dojo/_base/url","dojo/dom-construct","dojo/html","dojo/_base/declare"],function(dojo,lang,_43f,_440,has,_441,_442,_443){
var html=dojo.getObject("dojox.html",true);
if(has("ie")){
var _444=/(AlphaImageLoader\([^)]*?src=(['"]))(?![a-z]+:|\/)([^\r\n;}]+?)(\2[^)]*\)\s*[;}]?)/g;
}
var _445=/(?:(?:@import\s*(['"])(?![a-z]+:|\/)([^\r\n;{]+?)\1)|url\(\s*(['"]?)(?![a-z]+:|\/)([^\r\n;]+?)\3\s*\))([a-z, \s]*[;}]?)/g;
var _446=html._adjustCssPaths=function(_447,_448){
if(!_448||!_447){
return;
}
if(_444){
_448=_448.replace(_444,function(_449,pre,_44a,url,post){
return pre+(new _441(_447,"./"+url).toString())+post;
});
}
return _448.replace(_445,function(_44b,_44c,_44d,_44e,_44f,_450){
if(_44d){
return "@import \""+(new _441(_447,"./"+_44d).toString())+"\""+_450;
}else{
return "url("+(new _441(_447,"./"+_44f).toString())+")"+_450;
}
});
};
var _451=/(<[a-z][a-z0-9]*\s[^>]*)(?:(href|src)=(['"]?)([^>]*?)\3|style=(['"]?)([^>]*?)\5)([^>]*>)/gi;
var _452=html._adjustHtmlPaths=function(_453,cont){
var url=_453||"./";
return cont.replace(_451,function(tag,_454,name,_455,_456,_457,_458,end){
return _454+(name?(name+"="+_455+(new _441(url,_456).toString())+_455):("style="+_457+_446(url,_458)+_457))+end;
});
};
var _459=html._snarfStyles=function(_45a,cont,_45b){
_45b.attributes=[];
return cont.replace(/(?:<style([^>]*)>([\s\S]*?)<\/style>|<link\s+(?=[^>]*rel=['"]?stylesheet)([^>]*?href=(['"])([^>]*?)\4[^>\/]*)\/?>)/gi,function(_45c,_45d,_45e,_45f,_460,href){
var i,attr=(_45d||_45f||"").replace(/^\s*([\s\S]*?)\s*$/i,"$1");
if(_45e){
i=_45b.push(_45a?_446(_45a,_45e):_45e);
}else{
i=_45b.push("@import \""+href+"\";");
attr=attr.replace(/\s*(?:rel|href)=(['"])?[^\s]*\1\s*/gi,"");
}
if(attr){
attr=attr.split(/\s+/);
var _461={},tmp;
for(var j=0,e=attr.length;j<e;j++){
tmp=attr[j].split("=");
_461[tmp[0]]=tmp[1].replace(/^\s*['"]?([\s\S]*?)['"]?\s*$/,"$1");
}
_45b.attributes[i-1]=_461;
}
return "";
});
};
var _462=html._snarfScripts=function(cont,_463){
_463.code="";
cont=cont.replace(/<[!][-][-](.|\s)*?[-][-]>/g,function(_464){
return _464.replace(/<(\/?)script\b/ig,"&lt;$1Script");
});
function _465(src){
if(_463.downloadRemote){
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
_43f.get({url:src,sync:true,load:function(code){
_463.code+=code+";";
},error:_463.errBack});
}
};
return cont.replace(/<script\s*(?![^>]*type=['"]?(?:dojo\/|text\/html\b))(?:[^>]*?(?:src=(['"]?)([^>]*?)\1[^>]*)?)*>([\s\S]*?)<\/script>/gi,function(_466,_467,src,code){
if(src){
_465(src);
}else{
_463.code+=code;
}
return "";
});
};
var _468=html.evalInGlobal=function(code,_469){
_469=_469||_440.doc.body;
var n=_469.ownerDocument.createElement("script");
n.type="text/javascript";
_469.appendChild(n);
n.text=code;
};
html._ContentSetter=dojo.declare(_443._ContentSetter,{adjustPaths:false,referencePath:".",renderStyles:false,executeScripts:false,scriptHasHooks:false,scriptHookReplacement:null,_renderStyles:function(_46a){
this._styleNodes=[];
var st,att,_46b,doc=this.node.ownerDocument;
var head=doc.getElementsByTagName("head")[0];
for(var i=0,e=_46a.length;i<e;i++){
_46b=_46a[i];
att=_46a.attributes[i];
st=doc.createElement("style");
st.setAttribute("type","text/css");
for(var x in att){
st.setAttribute(x,att[x]);
}
this._styleNodes.push(st);
head.appendChild(st);
if(st.styleSheet){
st.styleSheet.cssText=_46b;
}else{
st.appendChild(doc.createTextNode(_46b));
}
}
},empty:function(){
this.inherited("empty",arguments);
this._styles=[];
},onBegin:function(){
this.inherited("onBegin",arguments);
var cont=this.content,node=this.node;
var _46c=this._styles;
if(lang.isString(cont)){
if(this.adjustPaths&&this.referencePath){
cont=_452(this.referencePath,cont);
}
if(this.renderStyles||this.cleanContent){
cont=_459(this.referencePath,cont,_46c);
}
if(this.executeScripts){
var _46d=this;
var _46e={downloadRemote:true,errBack:function(e){
_46d._onError.call(_46d,"Exec","Error downloading remote script in \""+_46d.id+"\"",e);
}};
cont=_462(cont,_46e);
this._code=_46e.code;
}
}
this.content=cont;
},onEnd:function(){
var code=this._code,_46f=this._styles;
if(this._styleNodes&&this._styleNodes.length){
while(this._styleNodes.length){
_442.destroy(this._styleNodes.pop());
}
}
if(this.renderStyles&&_46f&&_46f.length){
this._renderStyles(_46f);
}
if(this.executeScripts&&code){
if(this.cleanContent){
code=code.replace(/(<!--|(?:\/\/)?-->|<!\[CDATA\[|\]\]>)/g,"");
}
if(this.scriptHasHooks){
code=code.replace(/_container_(?!\s*=[^=])/g,this.scriptHookReplacement);
}
try{
_468(code,this.node);
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
_442.destroy(this._styleNodes.pop());
}
}
delete this._styleNodes;
dojo.mixin(this,html._ContentSetter.prototype);
}});
html.set=function(node,cont,_470){
if(!_470){
return _443._setNodeContent(node,cont,true);
}else{
var op=new html._ContentSetter(dojo.mixin(_470,{content:cont,node:node}));
return op.set();
}
};
return html;
});
},"url:dijit/form/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n","curam/widget/OptimalBrowserMessage":function(){
require({cache:{"url:curam/widget/templates/OptimalBrowserMessage.html":"<div>\n  <div class=\"hidden\"\n       data-dojo-type=\"dojox/layout/ContentPane\"\n       data-dojo-attach-point=\"_optimalMessage\">\n  </div>\n</div>\n"}});
define("curam/widget/OptimalBrowserMessage",["dojo/_base/declare","dojo/_base/lang","curam/util","curam/util/UIMFragment","curam/ui/ClientDataAccessor","dijit/_Widget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/form/Button","dojo/text!curam/widget/templates/OptimalBrowserMessage.html"],function(_471,lang,util,_472,_473,_474,_475,_476,_477,_478,_479,_47a){
return _471("curam.widget.OptimalBrowserMessage",[_474,_475,_476],{OPTIMAL_BROWSER_MSG:"optimal-browser-msg",isExternalApp:null,optimalBrowserMsgPaddingCSS:"optimal-browser-banner",optimalBrowserNode:null,appSectionsNode:null,appBannerHeaderNode:null,intApp:"internal",extApp:"external",context:null,templateString:_47a,widgetsInTemplate:true,baseClass:"",optimalBrowserNodeID:"_optimalMessage",_appConfig:null,postMixInProperties:function(){
this.inherited(arguments);
},startup:function(){
this.inherited(arguments);
this._init();
this._loadNodes(this._optimalMessage.id);
},_init:function(){
da=new _473();
da.getRaw("/config/tablayout/settings["+curam.config.appID+"]",lang.hitch(this,function(data){
console.log("External App config data:"+data);
this._appConfig=data;
this._getAppConfig();
}),function(_47b,args){
console.log("External App config data load error:"+_47b);
},null);
},_getAppConfig:function(){
var _47c=this._appConfig.optimalBrowserMessageEnabled;
var _47d=util.getTopmostWindow().dojox;
var _47e=this._createStorageKey(this.OPTIMAL_BROWSER_MSG);
var _47f=this;
var _480=false;
if(_47c=="true"|_47c=="TRUE"){
util.runStorageFn(function(){
_480=true;
_47f.context=_47d;
return _47f._isOptimalBrowserCheckDue(_47d,_47e,_47f);
});
if(!_480){
return this._isOptimalBrowserCheckDue(this.context,_47e,_47f);
}
}
return false;
},_isOptimalBrowserCheckDue:function(_481,_482,_483){
if(_481!=undefined){
var _484=_481.storage.get(_482);
if(_484&&_484!=""){
if(new Date(_483._getTargetDate())>new Date(_484)){
_483._executeBrowserVersionCheck(_481);
return true;
}
}else{
_483._executeBrowserVersionCheck(_481);
return true;
}
return false;
}
},_executeBrowserVersionCheck:function(_485){
var _486=this._appConfig.ieMinVersion;
var _487=this._appConfig.ieMaxVersion;
var _488=this._appConfig.ffMinVersion;
var _489=this._appConfig.ffMaxVersion;
var _48a=this._appConfig.chromeMinVersion;
var _48b=this._appConfig.chromeMaxVersion;
var _48c=this._appConfig.safariMinVersion;
var _48d=this._appConfig.safariMaxVersion;
var _48e=dojo.isIE;
var _48f=dojo.isFF;
var _490=dojo.isChrome;
var _491=dojo.isSafari;
if(_48e!=undefined){
return this._isCurrentBrowserVerSupported(_485,_48e,_486,_487);
}else{
if(_48f!=undefined&&this.isExternalApp){
return this._isCurrentBrowserVerSupported(_485,_48f,_488,_489);
}else{
if(_490!=undefined){
return this._isCurrentBrowserVerSupported(_485,_490,_48a,_48b);
}else{
if(_491!=undefined&&this.isExternalApp){
return this._isCurrentBrowserVerSupported(_485,_491,_48c,_48d);
}
}
}
}
return false;
},_isCurrentBrowserVerSupported:function(_492,_493,_494,_495){
var _496=false;
if(_494>0){
if(_493<_494){
_496=true;
this._displayOptimalBrowserMsg(_492);
return true;
}
}
if(_495>0&&!_496){
if(_493>_495){
this._displayOptimalBrowserMsg(_492);
return true;
}
}
return false;
},_displayOptimalBrowserMsg:function(_497){
this._addOrRemoveCssForInternalApp(true,this.optimalBrowserMsgPaddingCSS);
_472.get({url:"optimal-browser-msg-fragment.jspx",targetID:this._optimalMessage.id});
this._postRenderingTasks(_497);
},_postRenderingTasks:function(_498){
var _499=this._optimalMessage.id;
dojo.addOnLoad(function(){
var _49a=dojo.byId(_499);
dojo.removeClass(_49a,_49a.className);
});
if(_498.storage!=undefined){
_498.storage.put(this._createStorageKey(this.OPTIMAL_BROWSER_MSG),this._getTargetDate(this._appConfig.nextBrowserCheck));
}
return _498;
},_loadNodes:function(_49b){
dojo.addOnLoad(function(){
this.optimalBrowserNode=dojo.byId(_49b);
this.appSectionsNode=dojo.byId("app-sections-container-dc");
this.appBannerHeaderNode=dojo.byId("app-header-container-dc");
});
},_createStorageKey:function(_49c){
if(this.isExternalApp){
_49c=_49c+"_"+this.extApp;
}else{
_49c=_49c+"_"+this.intApp;
}
return _49c;
},_addOrRemoveCssForInternalApp:function(_49d,_49e){
var _49f=this.isExternalApp;
dojo.addOnLoad(function(){
if(!_49f){
if(_49d){
dojo.addClass(this.appSectionsNode,_49e);
if(this.appBannerHeaderNode){
dojo.addClass(this.appSectionsNode.children.item(1),_49e);
dojo.addClass(this.appSectionsNode.children.item(2),_49e);
}
}else{
dojo.removeClass(this.appSectionsNode,_49e);
if(this.appBannerHeaderNode){
dojo.removeClass(this.appSectionsNode.children.item(1),_49e);
dojo.removeClass(this.appSectionsNode.children.item(2),_49e);
}
}
}
});
},_getTargetDate:function(_4a0){
var _4a1=new Date();
if(_4a0==undefined){
_4a1.setDate(_4a1.getDate());
}else{
_4a1.setDate(_4a1.getDate()+_4a0);
}
return _4a1.toUTCString();
},exitOptimalBrowserMessageBox:function(){
var _4a2=dojo.byId(this._optimalMessage.id);
if(_4a2){
_4a2.parentNode.removeChild(_4a2);
}
this._addOrRemoveCssForInternalApp(false,this.optimalBrowserMsgPaddingCSS);
}});
});
},"dijit/form/ToggleButton":function(){
define("dijit/form/ToggleButton",["dojo/_base/declare","dojo/_base/kernel","./Button","./_ToggleButtonMixin"],function(_4a3,_4a4,_4a5,_4a6){
return _4a3("dijit.form.ToggleButton",[_4a5,_4a6],{baseClass:"dijitToggleButton",setChecked:function(_4a7){
_4a4.deprecated("setChecked("+_4a7+") is deprecated. Use set('checked',"+_4a7+") instead.","","2.0");
this.set("checked",_4a7);
}});
});
},"dojo/date/stamp":function(){
define("dojo/date/stamp",["../_base/kernel","../_base/lang","../_base/array"],function(dojo,lang,_4a8){
lang.getObject("date.stamp",true,dojo);
dojo.date.stamp.fromISOString=function(_4a9,_4aa){
if(!dojo.date.stamp._isoRegExp){
dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
}
var _4ab=dojo.date.stamp._isoRegExp.exec(_4a9),_4ac=null;
if(_4ab){
_4ab.shift();
if(_4ab[1]){
_4ab[1]--;
}
if(_4ab[6]){
_4ab[6]*=1000;
}
if(_4aa){
_4aa=new Date(_4aa);
_4a8.forEach(_4a8.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(prop){
return _4aa["get"+prop]();
}),function(_4ad,_4ae){
_4ab[_4ae]=_4ab[_4ae]||_4ad;
});
}
_4ac=new Date(_4ab[0]||1970,_4ab[1]||0,_4ab[2]||1,_4ab[3]||0,_4ab[4]||0,_4ab[5]||0,_4ab[6]||0);
if(_4ab[0]<100){
_4ac.setFullYear(_4ab[0]||1970);
}
var _4af=0,_4b0=_4ab[7]&&_4ab[7].charAt(0);
if(_4b0!="Z"){
_4af=((_4ab[8]||0)*60)+(Number(_4ab[9])||0);
if(_4b0!="-"){
_4af*=-1;
}
}
if(_4b0){
_4af-=_4ac.getTimezoneOffset();
}
if(_4af){
_4ac.setTime(_4ac.getTime()+_4af*60000);
}
}
return _4ac;
};
dojo.date.stamp.toISOString=function(_4b1,_4b2){
var _4b3=function(n){
return (n<10)?"0"+n:n;
};
_4b2=_4b2||{};
var _4b4=[],_4b5=_4b2.zulu?"getUTC":"get",date="";
if(_4b2.selector!="time"){
var year=_4b1[_4b5+"FullYear"]();
date=["0000".substr((year+"").length)+year,_4b3(_4b1[_4b5+"Month"]()+1),_4b3(_4b1[_4b5+"Date"]())].join("-");
}
_4b4.push(date);
if(_4b2.selector!="date"){
var time=[_4b3(_4b1[_4b5+"Hours"]()),_4b3(_4b1[_4b5+"Minutes"]()),_4b3(_4b1[_4b5+"Seconds"]())].join(":");
var _4b6=_4b1[_4b5+"Milliseconds"]();
if(_4b2.milliseconds){
time+="."+(_4b6<100?"0":"")+_4b3(_4b6);
}
if(_4b2.zulu){
time+="Z";
}else{
if(_4b2.selector!="time"){
var _4b7=_4b1.getTimezoneOffset();
var _4b8=Math.abs(_4b7);
time+=(_4b7>0?"-":"+")+_4b3(Math.floor(_4b8/60))+":"+_4b3(_4b8%60);
}
}
_4b4.push(time);
}
return _4b4.join("T");
};
return dojo.date.stamp;
});
},"dojo/Stateful":function(){
define("dojo/Stateful",["./_base/declare","./_base/lang","./_base/array"],function(_4b9,lang,_4ba){
return _4b9("dojo.Stateful",null,{postscript:function(_4bb){
if(_4bb){
lang.mixin(this,_4bb);
}
},get:function(name){
return this[name];
},set:function(name,_4bc){
if(typeof name==="object"){
for(var x in name){
if(name.hasOwnProperty(x)&&x!="_watchCallbacks"){
this.set(x,name[x]);
}
}
return this;
}
var _4bd=this[name];
this[name]=_4bc;
if(this._watchCallbacks){
this._watchCallbacks(name,_4bd,_4bc);
}
return this;
},watch:function(name,_4be){
var _4bf=this._watchCallbacks;
if(!_4bf){
var self=this;
_4bf=this._watchCallbacks=function(name,_4c0,_4c1,_4c2){
var _4c3=function(_4c4){
if(_4c4){
_4c4=_4c4.slice();
for(var i=0,l=_4c4.length;i<l;i++){
_4c4[i].call(self,name,_4c0,_4c1);
}
}
};
_4c3(_4bf["_"+name]);
if(!_4c2){
_4c3(_4bf["*"]);
}
};
}
if(!_4be&&typeof name==="function"){
_4be=name;
name="*";
}else{
name="_"+name;
}
var _4c5=_4bf[name];
if(typeof _4c5!=="object"){
_4c5=_4bf[name]=[];
}
_4c5.push(_4be);
return {unwatch:function(){
_4c5.splice(_4ba.indexOf(_4c5,_4be),1);
}};
}});
});
},"curam/ModalDialog":function(){
require({cache:{"url:curam/layout/resources/Dialog.html":"<div class=\"dijitDialog\" role=\"alertdialog\" aria-labelledby=\"${id}_title\">\r\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\r\n\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span>\r\n\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" aria-label=\"${closeModalText}\" tabIndex=\"0\" onKeyDown=\"curam.util.isShiftTab(event)\">\r\n\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\">${closeModalText}</span>\r\n\t</span>\r\n  <span id=\"${id}_prompt\" class=\"hidden\" data-dojo-attach-point=\"promptText\">${modalPromptText}</span>\r\n\t</div>\r\n\t\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\r\n</div>\r\n"}});
define("curam/ModalDialog",["dojo/text!curam/layout/resources/Dialog.html","dojo/dom-geometry","curam/util/external","dijit/Dialog","curam/dialog","curam/tab","curam/debug","curam/ModalUIMController","curam/util/RuntimeContext","curam/util/ResourceBundle"],function(_4c6,_4c7,_4c8){
dojo.requireLocalization("curam.application","Debug");
var _4c9=new curam.util.ResourceBundle("Debug");
var _4ca=dojo.declare("curam.ModalDialog",dijit.Dialog,{templateString:_4c6,autofocus:false,refocus:false,iframeHref:"",iframe:undefined,width:undefined,height:undefined,defaultWidth:600,closeModalText:LOCALISED_MODAL_CLOSE_BUTTON,modalPromptText:". "+LOCALISED_MODAL_SCREEN_READER_PROMPT+" .",maximumWidth:null,maximumHeight:null,_determinedWidth:null,_determinedHeight:null,_horizontalModalSpace:100,_verticalModalSpace:50,duration:5,parentWindow:undefined,isRegisteredForClosing:false,unsubscribes:undefined,modalconnects:undefined,onIframeLoadHandler:undefined,initialized:false,initDone:false,initUnsubToken:null,uimController:null,_helpIcon:null,_title:null,_isMobileUA:false,_isMobileUADialogPositioned:false,uimToken:undefined,postCreate:function(){
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
var _4cb=dojo.subscribe("/curam/dialog/iframeUnloaded",this,function(_4cc,_4cd){
if(this.id==_4cc){
curam.debug.log(_4c9.getProperty("curam.ModalDialog.unload"),_4cc);
curam.dialog.removeFromDialogHierarchy(_4cd);
dojo.style(this.iframe,"visibility","hidden");
this.initDone=false;
this._registerInitListener();
}
});
this.unsubscribes.push(_4cb);
var _4ce=dojo.hitch(this,function(_4cf,_4d0){
curam.debug.log(_4c9.getProperty("curam.ModalDialog.load.init"),_4cf);
curam.util.onLoad.removeSubscriber(this._getEventIdentifier(),_4ce);
curam.dialog.pushOntoDialogHierarchy(this.iframe.contentWindow);
this._determineSize(_4d0);
this._setTabIndex(this.iframe,"0");
if(!this.isRegisteredForClosing){
var _4d1=curam.util.getTopmostWindow();
this.unsubscribes.push(_4d1.dojo.subscribe("/curam/dialog/close",this,function(_4d2){
if(this.id==_4d2){
curam.debug.log("/curam/dialog/close "+_4c9.getProperty("curam.ModalDialog.event.for"),_4d2);
this.hide();
}
}));
this.isRegisteredForClosing=true;
}
this.doShow(_4d0);
this._notifyModalDisplayed();
});
curam.util.onLoad.addSubscriber(this._getEventIdentifier(),_4ce);
var _4d3=true;
this.onLoadSubsequentHandler=dojo.hitch(this,function(_4d4,_4d5){
if(_4d3){
_4d3=false;
}else{
curam.debug.log(_4c9.getProperty("curam.ModalDialog.load"),_4d4);
if(!_4d5.modalClosing){
curam.dialog.pushOntoDialogHierarchy(this.iframe.contentWindow);
this._determineSize(_4d5);
this._position(true);
this.doShow(_4d5);
this._notifyModalDisplayed();
}else{
curam.debug.log(_4c9.getProperty("curam.ModalDialog.close"));
}
}
var _4d6=dojo.byId(_4d4);
var _4d7=_4d6.contentWindow.document.title;
_4d6.setAttribute("title",LOCALISED_MODAL_FRAME_TITLE+" - "+_4d7);
});
curam.util.onLoad.addSubscriber(this._getEventIdentifier(),this.onLoadSubsequentHandler);
this.unsubscribes.push(curam.util.getTopmostWindow().dojo.subscribe("/curam/dialog/iframeFailedToLoad",this,function(_4d8){
curam.util.onLoad.removeSubscriber(this._getEventIdentifier(),_4ce);
this._determineSize({height:450,title:"Error!"});
this.doShow();
this._notifyModalDisplayed();
}));
this.unsubscribes.push(curam.util.getTopmostWindow().dojo.subscribe("/curam/dialog/displayed",this,this._setFocusHandler));
this.unsubscribes.push(curam.util.getTopmostWindow().dojo.subscribe("/curam/dialog/displayed",this,function(_4d9){
if(_4d9==this.id){
curam.util.getTopmostWindow().dojo.publish("/curam/dialog/AfterDisplay",[_4d9]);
}
}));
this.unsubscribes.push(curam.util.getTopmostWindow().dojo.subscribe("/curam/dialog/displayed",this,function(){
curam.util._setModalCurrentlyOpening(false);
}));
var _4da=function(_4db){
return _4db.indexOf(":")>0;
};
var _4dc=_4da(this.iframeHref)?this.iframeHref:this._getBaseUrl(curam.util.getTopmostWindow().location.href)+jsL+"/"+this.iframeHref;
this.uimController=new curam.ModalUIMController({uid:this.id,url:_4dc,loadFrameOnCreate:false,inDialog:true,iframeId:this._getEventIdentifier(),width:this._calculateWidth(this.width)+"px",height:this.maximumHeight+"px"});
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
var _4dd=dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,function(){
this.domNode.style.display="none";
dijit.Dialog._DialogLevelManager.hide(this);
this._fadeOutDeferred.callback(true);
delete this._fadeOutDeferred;
})});
this._fadeOutDeferred=new dojo.Deferred(dojo.hitch(this,function(){
_4dd.stop();
delete this._fadeOutDeferred;
}));
dojo.hitch(this,"onHide")();
_4dd.play();
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
},_getBaseUrl:function(_4de){
var _4df=_4de.indexOf("?");
_4de=(_4df>-1)?_4de.substring(0,_4df):_4de;
var _4e0=_4de.lastIndexOf("/");
return _4de.substring(0,_4e0+1);
},_setupHelpIcon:function(_4e1){
var _4e2=typeof _4e1!="undefined"?_4e1.helpEnabled:false;
var _4e3=_4e2?_4e1.helpExtension:"";
var _4e4=_4e2?_4e1.pageID:"";
var _4e5=dojo.query(".modalDialog span.dijitDialogCloseIcon");
for(var i=0;i<_4e5.length;i++){
if(_4e2&&!this._helpIcon){
this._helpIcon=this._createHelpIcon("dijitDialogHelpIcon","dijitDialogHelpIcon-hover",_4e3,_4e5[i]);
this._helpIcon.setAttribute("role","button");
this._setTabIndex(this._helpIcon,"0");
this._helpIcon.setAttribute("onKeyDown","curam.util.isShiftTab(event)");
this._helpIcon._enabled=false;
}
this._setTabIndex(_4e5[i],"0");
}
if(_4e2&&this._helpIcon){
this._helpIcon._pageID=_4e4;
}
if((_4e2&&this._helpIcon&&this._helpIcon._enabled)||(!_4e2||!this._helpIcon||!this._helpIcon._enabled)){
return;
}
dojo.style(this._helpIcon,"display",_4e2?"":"none");
this._helpIcon._enabled=_4e2;
},_createHelpIcon:function(_4e6,_4e7,_4e8,_4e9){
var icon=dojo.create("span",{"class":_4e6,"waiRole":"presentation","title":LOCALISED_MODAL_HELP_ALT});
dojo.place(icon,_4e9,"before");
this.connect(icon,"onclick",function(){
var _4ea=curam.config?curam.config.locale:jsL;
var url;
url="./help.jsp?pageID="+this._helpIcon._pageID;
window.open(url);
});
this.connect(icon,"onkeypress",function(){
if(curam.util.enterKeyPress(event)){
var _4eb=curam.config?curam.config.locale:jsL;
var url;
url="./help.jsp?pageID="+this._helpIcon._pageID;
window.open(url);
}
});
if(_4e7){
this.connect(icon,"onmouseover",function(){
dojo.addClass(icon,_4e7);
});
this.connect(icon,"onmouseout",function(){
dojo.removeClass(icon,_4e7);
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
},_registerOnIframeLoad:function(_4ec){
if(dojo.isIE&&dojo.isIE<9){
this.onIframeLoadHandler=dojo.hitch(this,function(){
if(typeof this.iframe!="undefined"&&typeof this.iframe.readyState!="undefined"&&this.iframe.readyState=="complete"){
_4ec();
}
});
this.iframe.attachEvent("onreadystatechange",this.onIframeLoadHandler);
}else{
this.modalconnects.push(dojo.connect(this.iframe,"onload",this,_4ec));
}
},_startDrag:function(_4ed){
if(!this.iframe){
return;
}
if(_4ed&&_4ed.node&&_4ed.node===this.domNode){
var _4ee=dojo.create("div",{"class":"overlay-iframe"});
_4ee.innerHTML="";
dojo.place(_4ee,this.iframe,"before");
var size=dojo.contentBox(this.containerNode);
dojo.style(_4ee,{width:size.w+"px",height:size.h+"px"});
var _4ef=_4c7.getMarginBoxSimple(dijit._underlay.domNode);
var _4f0={l:_4ef.w-size.w-10,t:_4ef.h-size.h-30};
this._moveable.onMove=function(_4f1,_4f2,e){
_4f2.l=Math.max(5,Math.min(_4f2.l,_4f0.l));
_4f2.t=Math.max(5,Math.min(_4f2.t,_4f0.t));
dojo.dnd.Moveable.prototype.onMove.apply(this,[_4f1,_4f2,e]);
};
}
},_loadErrorHandler:function(){
curam.debug.log(_4c9.getProperty("curam.ModalDialog.onload.notify"),this.iframe);
if(!this.initDone){
dojo.unsubscribe(this.initUnsubToken);
curam.debug.log(_4c9.getProperty("curam.ModalDialog.firing")+" /curam/dialog/iframeFailedToLoad "+_4c9.getProperty("curam.ModalDialog.for"),this.id);
curam.util.getTopmostWindow().dojo.publish("/curam/dialog/iframeFailedToLoad",[this.id]);
}else{
curam.debug.log("UIM "+_4c9.getProperty("curam.ModalDialog.onload.success"));
}
},_setFocusHandler:function(_4f3){
if(_4f3==this.id&&this.initDone){
curam.debug.log("curam.ModalDialog_setFocusHandler(): "+_4c9.getProperty("curam.ModalDialog.execute"),_4f3);
var _4f4=this.iframe.contentWindow;
var _4f5=_4f4.curam.util.doSetFocus();
if(!_4f5){
if(typeof _4f4.dijit=="object"&&typeof _4f4.dijit.focus=="function"){
_4f4.dijit.focus(this.iframe);
}else{
this.iframe.focus();
}
}
}
},_modalDisplayedHandler:function(_4f6){
if(_4f6==this.id){
curam.debug.log(_4c9.getProperty("curam.ModalDialog.dialog.open.1")+"("+this.id+")"+_4c9.getProperty("curam.ModalDialog.dialog.open.2"));
this._markAsActiveDialog(true);
}else{
if(!this.deactivatedBy){
curam.debug.log(_4c9.getProperty("curam.ModalDialog.dialog.deactivating.1")+"("+this.id+"),"+_4c9.getProperty("curam.ModalDialog.dialog.deactivating.2"),_4f6);
this._markAsActiveDialog(false);
this.deactivatedBy=_4f6;
}
}
},_modalClosedHandler:function(_4f7){
if(this.deactivatedBy==_4f7){
curam.debug.log(_4c9.getProperty("curam.ModalDialog.dialog.activating.1")+"("+this.id+"),"+_4c9.getProperty("curam.ModalDialog.dialog.activating.2"),_4f7);
this._markAsActiveDialog(true);
delete this.deactivatedBy;
}
},_destroyOldModals:function(){
require(["curam/dialog"]);
if(!curam.dialog.oldModalsToDestroy){
curam.dialog.oldModalsToDestroy=[];
}
dojo.forEach(curam.dialog.oldModalsToDestroy,function(_4f8){
_4f8._cleanupIframe();
_4f8.destroyRecursive();
});
curam.dialog.oldModalsToDestroy=[];
},_initParentWindowRef:function(){
if(!this.parentWindow){
var _4f9=null;
if(curam.tab.inTabbedUI()){
_4f9=curam.tab.getContentPanelIframe();
}else{
if(_4c8.inExternalApp()){
_4f9=_4c8.getUimParentWindow();
}
}
if(_4f9){
this.parentWindow=_4f9.contentWindow;
}
}else{
if(dojo.hasClass(this.parentWindow.frameElement,"detailsPanelFrame")){
var _4fa=curam.tab.getContentPanelIframe();
var _4fb=curam.util.getLastPathSegmentWithQueryString(_4fa.src);
_4fb=curam.util.removeUrlParam(_4fb,"__o3rpu");
curam.debug.log("o3rpu "+_4c9.getProperty("curam.ModalDialog.property"),encodeURIComponent(_4fb));
this.iframeHref=curam.util.replaceUrlParam(this.iframeHref,"__o3rpu",encodeURIComponent(_4fb));
this.parentWindow=_4fa.contentWindow;
}
}
},_notifyModalDisplayed:function(){
curam.debug.log(_4c9.getProperty("curam.ModalDialog.publishing")+" /curam/dialog/displayed "+_4c9.getProperty("curam.ModalDialog.for"),this.id);
curam.util.getTopmostWindow().dojo.publish("/curam/dialog/displayed",[this.id,{width:this._determinedWidth,height:this._determinedHeight}]);
},_markAsActiveDialog:function(_4fc){
var _4fd="curam-active-modal";
if(_4fc){
dojo.addClass(this.iframe,_4fd);
curam.debug.log(_4c9.getProperty("curam.ModalDialog.add.class"),[this.id,this.iframeHref]);
}else{
dojo.removeClass(this.iframe,_4fd);
curam.debug.log(_4c9.getProperty("curam.ModalDialog.remove.class"),[this.id,this.iframe.src]);
}
},_setHrefAttr:function(href){
curam.debug.log("setHrefAttr");
this.iframeHref=href;
this.inherited(arguments);
},_setTabIndex:function(_4fe,_4ff){
_4fe.setAttribute("tabIndex",_4ff);
},_position:function(_500){
curam.debug.log(_4c9.getProperty("curam.ModalDialog.position"));
if(this._isMobileUADialogPositioned==false&&(this.open||_500)){
this.inherited(arguments);
if(this._isMobileUA==true){
this._isMobileUADialogPositioned=true;
}
}else{
curam.debug.log(_4c9.getProperty("curam.ModalDialog.ignoring")+" curam.ModalDialog_position");
}
},_calculateWidth:function(_501){
if(_501){
_501=new Number(_501);
if(!this._isCDEJModal&&typeof (G11N_MODAL_DIALOG_ADJUSTMENT_FACTOR)!="undefined"){
_501*=G11N_MODAL_DIALOG_ADJUSTMENT_FACTOR;
}
if(_501>this.maximumWidth){
curam.debug.log(_4c9.getProperty("curam.ModalDialog.specified.width.over"),this.maximumWidth);
return this.maximumWidth;
}else{
return Math.floor(_501);
}
}else{
var _502=this.defaultWidth;
if(!this._isCDEJModal&&typeof (G11N_MODAL_DIALOG_ADJUSTMENT_FACTOR)!="undefined"){
_502*=G11N_MODAL_DIALOG_ADJUSTMENT_FACTOR;
}
curam.debug.log(_4c9.getProperty("curam.ModalDialog.default.width"),_502);
if(_502>this.maximumWidth){
curam.debug.log(_4c9.getProperty("curam.ModalDialog.default.width.over"),this.maximumWidth);
return this.maximumWidth;
}else{
return Math.floor(_502);
}
}
},_calculateHeight:function(_503,_504){
if(_503){
_503=new Number(_503);
if(_503>this.maximumHeight){
curam.debug.log("specified height exceeds available space, "+"overriding with max available height of ",this.maximumHeight);
return this.maximumHeight;
}else{
if(_503<modalMinimumHeight){
curam.debug.log(_4c9.getProperty("curam.ModalDialog.specified.height.over.1"),modalMinimumHeight);
return modalMinimumHeight;
}else{
return _503;
}
}
}else{
curam.debug.log(_4c9.getProperty("curam.ModalDialog.no.height"),_504);
if(_504>this.maximumHeight){
curam.debug.log(_4c9.getProperty("curam.ModalDialog.calculated.height.over.1"),this.maximumHeight);
return this.maximumHeight;
}else{
if(_504<modalMinimumHeight){
curam.debug.log(_4c9.getProperty("curam.ModalDialog.calculated.height.over.2"),modalMinimumHeight);
return modalMinimumHeight;
}else{
return _504;
}
}
}
},_determineSize:function(_505){
var _506=_505.height;
var _507=_505.windowOptions;
curam.debug.log(_4c9.getProperty("curam.ModalDialog.size"));
try{
var w=this._calculateWidth(this.width);
var h=this._calculateHeight(this.height,_506);
if(_507){
if(_507["width"]||_507["height"]){
curam.debug.log(_4c9.getProperty("curam.ModalDialog.options"));
w=this._calculateWidth(_507["width"]);
h=this._calculateHeight(_507["height"],_506);
}
}
curam.debug.log("curam.ModalDialog:_determineSize() %s x %s",w,h);
this.uimController.setDimensionsForModalDialog(w,h,_505);
this._determinedWidth=w;
this._determinedHeight=h;
this.setTitle(_505,w);
}
catch(e){
curam.debug.log("curam.ModalDialog:_determineSize() : "+_4c9.getProperty("curam.ModalDialog.error")+dojo.toJson(e));
}
},setTitle:function(_508,_509){
var _50a=_508.title;
if(!_50a){
curam.debug.log("curam.ModalDialog.setTitle() - "+_4c9.getProperty("curam.ModalDialog.no.title"));
_50a="";
}
var _50b=_508.messageTitleAppend;
curam.debug.log("curam.ModalDialog.setTitle('%s')",_50a);
var _50c=_50a.indexOf(_50b);
if(_50c!=-1){
var _50d=dojo.create("span",{innerHTML:_50b,"class":"messagesPresent"});
_50a=_50a.split(_50b).join("<span class=\"messagesPresent\">"+_50b+"</span>");
}
this.titleNode.innerHTML=_50a;
dojo.style(this.titleBar,{width:_509+"px",height:21+"px"});
dojo.style(this.titleNode,"width",Math.ceil(_509*0.85)+"px");
},doShow:function(_50e){
curam.debug.log("curam.ModalDialog.doShow(): "+_4c9.getProperty("curam.ModalDialog.show"));
if(!this.initialized){
this.initialized=true;
}
this._setupHelpIcon(_50e);
this.show();
dojo.style(this.iframe,"visibility","visible");
dojo.style(this.domNode,{visibility:"visible"});
},_onHideHandler:function(){
curam.util.getTopmostWindow().dojo.publish("/curam/dialog/BeforeClose",[this.id]);
dojo.style(this.domNode,{visibility:"hidden",display:"block"});
require(["curam/dialog"]);
curam.dialog.removeFromDialogHierarchy(this.iframe.contentWindow);
curam.dialog.removeFromDialogHierarchy(this.parentWindow);
var _50f=curam.util.getTopmostWindow();
_50f.dojo.publish("/curam/dialog/closed",[this.id]);
dojo.unsubscribe(this.initUnsubToken);
dojo.forEach(this.unsubscribes,_50f.dojo.unsubscribe);
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
curam.debug.log(_4c9.getProperty("curam.ModalDialog.deactivating",[this.id]));
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
return _4ca;
});
},"curam/util/portlet/PortletAdaptor":function(){
define("curam/util/portlet/PortletAdaptor",["curam/define","curam/util"],function(){
curam.define.singleton("curam.util.portlet.PortletAdaptor",{initPortlet:function(_510){
curam.util.portlet.PortletAdaptor.modifyPortletLinks();
curam.util.portlet.PortletAdaptor.setTimeoutForBIRTChartPortlets(_510);
return "initialized";
},modifyPortletLinks:function(){
var _511;
var _512=dojo.query("div#podContainer a");
_512.forEach(function(link){
dojo.attr(link,"target","_newWindow");
if(link.onclick!=null&&link.onclick.toString().indexOf("curam.util.UimDialog")!=-1){
var _513=link.innerText||link.textContent;
if(_513!=undefined&&_513.length>0&&_513.lastIndexOf("...")==-1){
var _514=document.createElement("div");
_514.appendChild(document.createTextNode(_513));
link.parentNode.appendChild(_514);
}
_511=link.parentNode;
dojo.destroy(link);
}
if(typeof (_511)=="undefined"){
_511=link.parentNode;
}
});
return _511;
},setTimeoutForBIRTChartPortlets:function(_515){
setTimeout(function(){
curam.util.getTopmostWindow().dojo.publish("pods.fullyloaded");
},_515);
}});
return curam.util.portlet.PortletAdaptor;
});
},"curam/GlobalVars":function(){
define("curam/GlobalVars",["curam/util"],function(){
var _516={popupMappingRepository:[],popupMappingLoaded:[],popupInputs:[],currentPopupProps:null,currentPopupInstanceName:"",popupWindow:null,popupCTCodeMappings:[],popupPropertiesRepository:[],POPUP_EMPTY_SPAN_MIN_SIZE:25,POPUP_EMPTY_SPAN_CHAR:" ",POPUP_EMPTY_SPAN_VALUE:null,replacedButtons:[]};
var gc=dojo.global.curam;
dojo.mixin(gc,_516);
gc.POPUP_EMPTY_SPAN_VALUE=curam.util.fillString(gc.POPUP_EMPTY_SPAN_CHAR,gc.POPUP_EMPTY_SPAN_MIN_SIZE);
return _516;
});
},"dijit/form/ComboButton":function(){
require({cache:{"url:dijit/form/templates/ComboButton.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" data-dojo-attach-point=\"buttonNode\" data-dojo-attach-event=\"ondijitclick:_onClick,onkeypress:_onButtonKeyPress\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" data-dojo-attach-point=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdata-dojo-attach-point=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdata-dojo-attach-event=\"onkeypress:_onArrowKeyPress\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" data-dojo-attach-point=\"valueNode\"\n\t\t/></td></tr></tbody\n></table>\n"}});
define("dijit/form/ComboButton",["dojo/_base/declare","dojo/_base/event","dojo/keys","../focus","./DropDownButton","dojo/text!./templates/ComboButton.html"],function(_517,_518,keys,_519,_51a,_51b){
return _517("dijit.form.ComboButton",_51a,{templateString:_51b,_setIdAttr:"",_setTabIndexAttr:["focusNode","titleNode"],_setTitleAttr:"titleNode",optionsTitle:"",baseClass:"dijitComboButton",cssStateNodes:{"buttonNode":"dijitButtonNode","titleNode":"dijitButtonContents","_popupStateNode":"dijitDownArrowButton"},_focusedNode:null,_onButtonKeyPress:function(evt){
if(evt.charOrCode==keys[this.isLeftToRight()?"RIGHT_ARROW":"LEFT_ARROW"]){
_519.focus(this._popupStateNode);
_518.stop(evt);
}
},_onArrowKeyPress:function(evt){
if(evt.charOrCode==keys[this.isLeftToRight()?"LEFT_ARROW":"RIGHT_ARROW"]){
_519.focus(this.titleNode);
_518.stop(evt);
}
},focus:function(_51c){
if(!this.disabled){
_519.focus(_51c=="start"?this.titleNode:this._popupStateNode);
}
}});
});
},"dijit/form/_AutoCompleterMixin":function(){
define("dijit/form/_AutoCompleterMixin",["dojo/_base/connect","dojo/data/util/filter","dojo/_base/declare","dojo/_base/Deferred","dojo/dom-attr","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/query","dojo/regexp","dojo/_base/sniff","dojo/string","dojo/_base/window","./DataList","../registry","./_TextBoxMixin"],function(_51d,_51e,_51f,_520,_521,_522,keys,lang,_523,_524,has,_525,win,_526,_527,_528){
return _51f("dijit.form._AutoCompleterMixin",null,{item:null,pageSize:Infinity,store:null,fetchProperties:{},query:{},autoComplete:true,highlightMatch:"first",searchDelay:100,searchAttr:"name",labelAttr:"",labelType:"text",queryExpr:"${0}*",ignoreCase:true,maxHeight:-1,_stopClickEvents:false,_getCaretPos:function(_529){
var pos=0;
if(typeof (_529.selectionStart)=="number"){
pos=_529.selectionStart;
}else{
if(has("ie")){
var tr=win.doc.selection.createRange().duplicate();
var ntr=_529.createTextRange();
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
},_setCaretPos:function(_52a,_52b){
_52b=parseInt(_52b);
_528.selectInputText(_52a,_52b,_52b);
},_setDisabledAttr:function(_52c){
this.inherited(arguments);
this.domNode.setAttribute("aria-disabled",_52c);
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
var _52d=false;
var pw=this.dropDown;
var _52e=null;
this._prev_key_backspace=false;
this._abortQuery();
this.inherited(arguments);
if(this._opened){
_52e=pw.getHighlightedOption();
}
switch(key){
case keys.PAGE_DOWN:
case keys.DOWN_ARROW:
case keys.PAGE_UP:
case keys.UP_ARROW:
if(this._opened){
this._announceOption(_52e);
}
_522.stop(evt);
break;
case keys.ENTER:
if(_52e){
if(_52e==pw.nextButton){
this._nextSearch(1);
_522.stop(evt);
break;
}else{
if(_52e==pw.previousButton){
this._nextSearch(-1);
_522.stop(evt);
break;
}
}
}else{
this._setBlurValue();
this._setCaretPos(this.focusNode,this.focusNode.value.length);
}
if(this._opened||this._fetchHandle){
_522.stop(evt);
}
case keys.TAB:
var _52f=this.get("displayedValue");
if(pw&&(_52f==pw._messages["previousMessage"]||_52f==pw._messages["nextMessage"])){
break;
}
if(_52e){
this._selectOption(_52e);
}
case keys.ESCAPE:
if(this._opened){
this._lastQuery=null;
this.closeDropDown();
}
break;
case " ":
if(_52e){
_522.stop(evt);
this._selectOption(_52e);
this.closeDropDown();
}else{
_52d=true;
}
break;
case keys.DELETE:
case keys.BACKSPACE:
this._prev_key_backspace=true;
_52d=true;
break;
default:
_52d=typeof key=="string"||key==229;
}
if(_52d){
this.item=undefined;
this.searchTimer=setTimeout(lang.hitch(this,"_startSearchFromInput"),1);
}
},_autoCompleteText:function(text){
var fn=this.focusNode;
_528.selectInputText(fn,fn.value.length);
var _530=this.ignoreCase?"toLowerCase":"substr";
if(text[_530](0).indexOf(this.focusNode.value[_530](0))==0){
var cpos=this.autoComplete?this._getCaretPos(fn):fn.value.length;
if((cpos+1)>fn.value.length){
fn.value=text;
_528.selectInputText(fn,cpos);
}
}else{
fn.value=text;
_528.selectInputText(fn);
}
},_openResultList:function(_531,_532,_533){
this._fetchHandle=null;
if(this.disabled||this.readOnly||(_532[this.searchAttr]!==this._lastQuery)){
return;
}
var _534=this.dropDown.getHighlightedOption();
this.dropDown.clearResultList();
if(!_531.length&&_533.start==0){
this.closeDropDown();
return;
}
this.dropDown.createOptions(_531,_533,lang.hitch(this,"_getMenuLabelFromItem"));
this._showResultList();
if(_533.direction){
if(1==_533.direction){
this.dropDown.highlightFirstOption();
}else{
if(-1==_533.direction){
this.dropDown.highlightLastOption();
}
}
if(_534){
this._announceOption(this.dropDown.getHighlightedOption());
}
}else{
if(this.autoComplete&&!this._prev_key_backspace&&!/^[*]+$/.test(_532[this.searchAttr].toString())){
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
var _535=this.get("displayedValue");
var pw=this.dropDown;
if(pw&&(_535==pw._messages["previousMessage"]||_535==pw._messages["nextMessage"])){
this._setValueAttr(this._lastValueReported,true);
}else{
if(typeof this.item=="undefined"){
this.item=null;
this.set("displayedValue",_535);
}else{
if(this.value!=this._lastValueReported){
this._handleOnChange(this.value,true);
}
this._refreshState();
}
}
},_setItemAttr:function(item,_536,_537){
var _538="";
if(item){
if(!_537){
_537=this.store._oldAPI?this.store.getValue(item,this.searchAttr):item[this.searchAttr];
}
_538=this._getValueField()!=this.searchAttr?this.store.getIdentity(item):_537;
}
this.set("value",_538,_536,_537,item);
},_announceOption:function(node){
if(!node){
return;
}
var _539;
if(node==this.dropDown.nextButton||node==this.dropDown.previousButton){
_539=node.innerHTML;
this.item=undefined;
this.value="";
}else{
var item=this.dropDown.items[node.getAttribute("item")];
_539=(this.store._oldAPI?this.store.getValue(item,this.searchAttr):item[this.searchAttr]).toString();
this.set("item",item,false,_539);
}
this.focusNode.value=this.focusNode.value.substring(0,this._lastInput.length);
this.focusNode.setAttribute("aria-activedescendant",_521.get(node,"id"));
this._autoCompleteText(_539);
},_selectOption:function(_53a){
this.closeDropDown();
if(_53a){
this._announceOption(_53a);
}
this._setCaretPos(this.focusNode,this.focusNode.value.length);
this._handleOnChange(this.value,true);
},_startSearchAll:function(){
this._startSearch("");
},_startSearchFromInput:function(){
this._startSearch(this.focusNode.value.replace(/([\\\*\?])/g,"\\$1"));
},_getQueryString:function(text){
return _525.substitute(this.queryExpr,[text]);
},_startSearch:function(key){
if(!this.dropDown){
var _53b=this.id+"_popup",_53c=lang.isString(this.dropDownClass)?lang.getObject(this.dropDownClass,false):this.dropDownClass;
this.dropDown=new _53c({onChange:lang.hitch(this,this._selectOption),id:_53b,dir:this.dir,textDir:this.textDir});
this.focusNode.removeAttribute("aria-activedescendant");
this.textbox.setAttribute("aria-owns",_53b);
}
this._lastInput=key;
var _53d=lang.clone(this.query);
var _53e={start:0,count:this.pageSize,queryOptions:{ignoreCase:this.ignoreCase,deep:true}};
lang.mixin(_53e,this.fetchProperties);
var qs=this._getQueryString(key),q;
if(this.store._oldAPI){
q=qs;
}else{
q=_51e.patternToRegExp(qs,this.ignoreCase);
q.toString=function(){
return qs;
};
}
this._lastQuery=_53d[this.searchAttr]=q;
var _53f=this,_540=function(){
var _541=_53f._fetchHandle=_53f.store.query(_53d,_53e);
_520.when(_541,function(res){
_53f._fetchHandle=null;
res.total=_541.total;
_53f._openResultList(res,_53d,_53e);
},function(err){
_53f._fetchHandle=null;
if(!_53f._cancelingQuery){
console.error(_53f.declaredClass+" "+err.toString());
_53f.closeDropDown();
}
});
};
this.searchTimer=setTimeout(lang.hitch(this,function(_542,_543){
this.searchTimer=null;
_540();
this._nextSearch=this.dropDown.onPage=function(_544){
_53e.start+=_53e.count*_544;
_53e.direction=_544;
_540();
_543.focus();
};
},_53d,this),this.searchDelay);
},_getValueField:function(){
return this.searchAttr;
},constructor:function(){
this.query={};
this.fetchProperties={};
},postMixInProperties:function(){
if(!this.store){
var _545=this.srcNodeRef;
var list=this.list;
if(list){
this.store=_527.byId(list);
}else{
this.store=new _526({},_545);
}
if(!("value" in this.params)){
var item=(this.item=this.store.fetchSelectedItem());
if(item){
var _546=this._getValueField();
this.value=this.store._oldAPI?this.store.getValue(item,_546):item[_546];
}
}
}
this.inherited(arguments);
},postCreate:function(){
var _547=_523("label[for=\""+this.id+"\"]");
if(_547.length){
_547[0].id=(this.id+"_label");
this.domNode.setAttribute("aria-labelledby",_547[0].id);
}
this.inherited(arguments);
},_getMenuLabelFromItem:function(item){
var _548=this.labelFunc(item,this.store),_549=this.labelType;
if(this.highlightMatch!="none"&&this.labelType=="text"&&this._lastInput){
_548=this.doHighlight(_548,this._escapeHtml(this._lastInput));
_549="html";
}
return {html:_549=="html",label:_548};
},doHighlight:function(_54a,find){
var _54b=(this.ignoreCase?"i":"")+(this.highlightMatch=="all"?"g":""),i=this.queryExpr.indexOf("${0}");
find=_524.escapeString(find);
return this._escapeHtml(_54a).replace(new RegExp((i==0?"^":"")+"("+find+")"+(i==(this.queryExpr.length-4)?"$":""),_54b),"<span class=\"dijitComboBoxHighlightMatch\">$1</span>");
},_escapeHtml:function(str){
str=String(str).replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
return str;
},reset:function(){
this.item=null;
this.inherited(arguments);
},labelFunc:function(item,_54c){
return (_54c._oldAPI?_54c.getValue(item,this.labelAttr||this.searchAttr):item[this.labelAttr||this.searchAttr]).toString();
},_setValueAttr:function(_54d,_54e,_54f,item){
this._set("item",item||null);
if(!_54d){
_54d="";
}
this.inherited(arguments);
},_setTextDirAttr:function(_550){
this.inherited(arguments);
if(this.dropDown){
this.dropDown._set("textDir",_550);
}
}});
});
},"url:dijit/layout/templates/_ScrollingTabControllerButton.html":"<div data-dojo-attach-event=\"onclick:_onClick\">\n\t<div role=\"presentation\" class=\"dijitTabInnerDiv\" data-dojo-attach-point=\"innerDiv,focusNode\">\n\t\t<div role=\"presentation\" class=\"dijitTabContent dijitButtonContents\" data-dojo-attach-point=\"tabContent\">\n\t\t\t<img role=\"presentation\" alt=\"\" src=\"${_blankGif}\" class=\"dijitTabStripIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t\t<span data-dojo-attach-point=\"containerNode,titleNode\" class=\"dijitButtonText\"></span>\n\t\t</div>\n\t</div>\n</div>","cm/_base/_form":function(){
define("cm/_base/_form",[],function(){
var cm=dojo.global.cm||{};
dojo.global.cm=cm;
dojo.mixin(cm,{checkAll:function(_551,_552){
cm.query("input[type='checkbox']",_552).forEach("item.checked = "+(_551?"true":"false"));
},setFormSubmitted:function(form,_553){
form._alreadySubmitted=_553;
},wasFormSubmitted:function(form){
return form._alreadySubmitted;
},getFormItems:function(){
if(cm._formItems){
return cm._formItems;
}
var _554=dojo.query("input[name='__o3fmeta']");
var data=_554.length>0?dojo.fromJson(_554[0].value):{};
var _555=[];
for(var x in data){
_555.push(x);
}
cm._formItems=new function(){
this.length=function(){
return _555.length;
};
this.getNames=function(){
return _555;
};
this.getInputs=function(_556){
var _557=[];
dojo.forEach(_555,function(name,_558){
if(!_556||this.isMandatory(_558)){
_557.push("[name='"+name+"']");
}
},this);
return _557.length>0?dojo.query(_557.join(",")):[];
};
function fn(_559){
return function(_55a){
var d=data[dojo.isString(_55a)?_55a:_555[_55a]];
return d?d[_559]:null;
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
},"dijit/form/MappedTextBox":function(){
define("dijit/form/MappedTextBox",["dojo/_base/declare","dojo/dom-construct","./ValidationTextBox"],function(_55b,_55c,_55d){
return _55b("dijit.form.MappedTextBox",_55d,{postMixInProperties:function(){
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
this.valueNode=_55c.place("<input type='hidden'"+(this.name?" name='"+this.name.replace(/'/g,"&quot;")+"'":"")+"/>",this.textbox,"after");
},reset:function(){
this.valueNode.value="";
this.inherited(arguments);
}});
});
},"dijit/form/ComboBoxMixin":function(){
require({cache:{"url:dijit/form/templates/DropDownBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdata-dojo-attach-point=\"_buttonNode, _popupStateNode\" role=\"presentation\"\n\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdata-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\n\t/></div\n></div>\n"}});
define("dijit/form/ComboBoxMixin",["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/kernel","dojo/_base/lang","dojo/store/util/QueryResults","./_AutoCompleterMixin","./_ComboBoxMenu","../_HasDropDown","dojo/text!./templates/DropDownBox.html"],function(_55e,_55f,_560,lang,_561,_562,_563,_564,_565){
return _55e("dijit.form.ComboBoxMixin",[_564,_562],{dropDownClass:_563,hasDownArrow:true,templateString:_565,baseClass:"dijitTextBox dijitComboBox",cssStateNodes:{"_buttonNode":"dijitDownArrowButton"},_setHasDownArrowAttr:function(val){
this._set("hasDownArrow",val);
this._buttonNode.style.display=val?"":"none";
},_showResultList:function(){
this.displayMessage("");
this.inherited(arguments);
},_setStoreAttr:function(_566){
if(!_566.get){
lang.mixin(_566,{_oldAPI:true,get:function(id){
var _567=new _55f();
this.fetchItemByIdentity({identity:id,onItem:function(_568){
_567.resolve(_568);
},onError:function(_569){
_567.reject(_569);
}});
return _567.promise;
},query:function(_56a,_56b){
var _56c=new _55f(function(){
_56d.abort&&_56d.abort();
});
var _56d=this.fetch(lang.mixin({query:_56a,onBegin:function(_56e){
_56c.total=_56e;
},onComplete:function(_56f){
_56c.resolve(_56f);
},onError:function(_570){
_56c.reject(_570);
}},_56b));
return _561(_56c);
}});
}
this._set("store",_566);
},postMixInProperties:function(){
if(this.params.store){
this._setStoreAttr(this.params.store);
}
this.inherited(arguments);
if(!this.params.store){
var _571=this.declaredClass;
lang.mixin(this.store,{getValue:function(item,attr){
_560.deprecated(_571+".store.getValue(item, attr) is deprecated for builtin store.  Use item.attr directly","","2.0");
return item[attr];
},getLabel:function(item){
_560.deprecated(_571+".store.getLabel(item) is deprecated for builtin store.  Use item.label directly","","2.0");
return item.name;
},fetch:function(args){
_560.deprecated(_571+".store.fetch() is deprecated for builtin store.","Use store.query()","2.0");
var shim=["dojo/data/ObjectStore"];
require(shim,lang.hitch(this,function(_572){
new _572({objectStore:this}).fetch(args);
}));
}});
}
}});
});
},"dijit/form/_TextBoxMixin":function(){
define("dijit/form/_TextBoxMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/_base/event","dojo/keys","dojo/_base/lang",".."],function(_573,_574,dom,_575,keys,lang,_576){
var _577=_574("dijit.form._TextBoxMixin",null,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",selectOnClick:false,placeHolder:"",_getValueAttr:function(){
return this.parse(this.get("displayedValue"),this.constraints);
},_setValueAttr:function(_578,_579,_57a){
var _57b;
if(_578!==undefined){
_57b=this.filter(_578);
if(typeof _57a!="string"){
if(_57b!==null&&((typeof _57b!="number")||!isNaN(_57b))){
_57a=this.filter(this.format(_57b,this.constraints));
}else{
_57a="";
}
}
}
if(_57a!=null&&_57a!=undefined&&((typeof _57a)!="number"||!isNaN(_57a))&&this.textbox.value!=_57a){
this.textbox.value=_57a;
this._set("displayedValue",this.get("displayedValue"));
}
if(this.textDir=="auto"){
this.applyTextDir(this.focusNode,_57a);
}
this.inherited(arguments,[_57b,_579]);
},displayedValue:"",_getDisplayedValueAttr:function(){
return this.filter(this.textbox.value);
},_setDisplayedValueAttr:function(_57c){
if(_57c===null||_57c===undefined){
_57c="";
}else{
if(typeof _57c!="string"){
_57c=String(_57c);
}
}
this.textbox.value=_57c;
this._setValueAttr(this.get("value"),undefined);
this._set("displayedValue",this.get("displayedValue"));
if(this.textDir=="auto"){
this.applyTextDir(this.focusNode,_57c);
}
},format:function(_57d){
return ((_57d==null||_57d==undefined)?"":(_57d.toString?_57d.toString():_57d));
},parse:function(_57e){
return _57e;
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
var _57f=function(e){
var _580=e.charOrCode||e.keyCode||229;
if(e.type=="keydown"){
switch(_580){
case keys.SHIFT:
case keys.ALT:
case keys.CTRL:
case keys.META:
case keys.CAPS_LOCK:
return;
default:
if(_580>=65&&_580<=90){
return;
}
}
}
if(e.type=="keypress"&&typeof _580!="string"){
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
var faux=lang.mixin({},e,{charOrCode:_580,wasConsumed:false,preventDefault:function(){
faux.wasConsumed=true;
e.preventDefault();
},stopPropagation:function(){
e.stopPropagation();
}});
if(this.onInput(faux)===false){
_575.stop(faux);
}
if(faux.wasConsumed){
return;
}
setTimeout(lang.hitch(this,"_onInput",faux),0);
};
_573.forEach(["onkeydown","onkeypress","onpaste","oncut","oninput","oncompositionend"],function(_581){
this.connect(this.textbox,_581,_57f);
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
_577.selectInputText(this.textbox);
}
});
}
this.inherited(arguments);
this._refreshState();
},reset:function(){
this.textbox.value="";
this.inherited(arguments);
},_setTextDirAttr:function(_582){
if(!this._created||this.textDir!=_582){
this._set("textDir",_582);
this.applyTextDir(this.focusNode,this.focusNode.value);
}
}});
_577._setSelectionRange=_576._setSelectionRange=function(_583,_584,stop){
if(_583.setSelectionRange){
_583.setSelectionRange(_584,stop);
}
};
_577.selectInputText=_576.selectInputText=function(_585,_586,stop){
_585=dom.byId(_585);
if(isNaN(_586)){
_586=0;
}
if(isNaN(stop)){
stop=_585.value?_585.value.length:0;
}
try{
_585.focus();
_577._setSelectionRange(_585,_586,stop);
}
catch(e){
}
};
return _577;
});
},"url:dijit/layout/templates/_TabButton.html":"<div role=\"presentation\" data-dojo-attach-point=\"titleNode\" data-dojo-attach-event='onclick:onClick'>\n    <div role=\"presentation\" class='dijitTabInnerDiv' data-dojo-attach-point='innerDiv'>\n        <div role=\"presentation\" class='dijitTabContent' data-dojo-attach-point='tabContent'>\n        \t<div role=\"presentation\" data-dojo-attach-point='focusNode'>\n\t\t        <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" data-dojo-attach-point='iconNode' />\n\t\t        <span data-dojo-attach-point='containerNode' class='tabLabel'></span>\n\t\t        <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\n\t\t        \t\tdata-dojo-attach-event='onclick: onClickCloseButton' role=\"presentation\">\n\t\t            <span data-dojo-attach-point='closeText' class='dijitTabCloseText'>[x]</span\n\t\t        ></span>\n\t\t\t</div>\n        </div>\n    </div>\n</div>\n","curam/ajax":function(){
define("curam/ajax",["curam/util/Request"],function(_587){
var _588=function(_589,_58a){
this.target=_589;
this.inputProvider=_58a||"null";
};
var _58b={doRequest:function(_58c,_58d,_58e,_58f){
var _590="../servlet/JSONServlet";
var _591=this;
if(_58e){
_590="../"+_590;
}
var _592={caller:this.target.id,operation:_58c,inputProvider:this.inputProvider,args:_58d};
function _593(_594,_595){
_594=dojo.fromJson(_594);
if(_594 instanceof Array){
if(_594.length>1){
if(_595=="getCodeTableSubset"){
_591.fillCTWithBlank(_594);
}else{
_591.fillCT(_594);
}
}else{
if(_595=="getCodeTableSubset"){
_591.fillCTWithBlank(_594);
}else{
_591.fillSingle(_594,true);
}
}
}else{
_591.fillSingle(_594);
}
};
_587.post({url:_590,handleAs:"text",load:function(data,evt){
_593(data,_58c);
},error:function(){
alert("error");
},content:{"content":dojo.toJson(_592)},preventCache:true,sync:_58f});
},fillCT:function(_596){
this.target.options.length=0;
for(var i=0;i<_596.length;i++){
this.target.options[i]=new Option(_596[i]["descr"],_596[i]["code"],_596[i]["default"]);
}
},fillCTWithBlank:function(_597){
this.target.options.length=0;
this.target.options[0]=new Option("");
for(var i=0;i<_597.length;i++){
this.target.options[i+1]=new Option(_597[i]["descr"],_597[i]["code"]);
}
},fillSingle:function(_598,_599){
if(_599){
this.target.value=_598[0]["value"];
}else{
this.target.value=_598["value"];
}
}};
dojo.mixin(_588.prototype,_58b);
dojo.global.AJAXCall=_588;
return _588;
});
},"curam/util/Dialog":function(){
define("curam/util/Dialog",["curam/util","curam/define","curam/dialog","curam/util/onLoad","curam/debug","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _59a=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.Dialog",{_id:null,_unsubscribes:[],open:function(path,_59b,_59c){
var url=path+curam.util.makeQueryString(_59b);
var _59d={href:url};
var _59e=null;
if(_59c){
_59e="width="+_59c.width+",height="+_59c.height;
}
window.jsModals=true;
curam.util.openModalDialog(_59d,_59e);
},init:function(){
var _59f=curam.util.getTopmostWindow();
var _5a0=_59f.dojo.subscribe("/curam/dialog/SetId",null,function(_5a1){
curam.util.Dialog._id=_5a1;
curam.debug.log(_59a.getProperty("curam.util.Dialog.id.success"),curam.util.Dialog._id);
_59f.dojo.unsubscribe(_5a0);
});
curam.util.Dialog._unsubscribes.push(_5a0);
_59f.dojo.publish("/curam/dialog/init");
if(!curam.util.Dialog._id){
curam.debug.log(_59a.getProperty("curam.util.Dialog.id.fail"));
}
dojo.addOnUnload(function(){
curam.util.Dialog._releaseHandlers();
window.parent.dojo.publish("/curam/dialog/iframeUnloaded",[curam.util.Dialog._id,window]);
});
},registerGetTitleFunc:function(_5a2){
curam.util.onLoad.addPublisher(function(_5a3){
_5a3.title=_5a2();
});
},registerGetSizeFunc:function(_5a4){
curam.util.onLoad.addPublisher(function(_5a5){
_5a5.windowOptions=_5a4();
});
},registerAfterDisplayHandler:function(_5a6){
var _5a7=curam.util.getTopmostWindow();
curam.util.Dialog._unsubscribes.push(_5a7.dojo.subscribe("/curam/dialog/AfterDisplay",null,function(_5a8){
if(_5a8==curam.util.Dialog._id){
_5a6();
}
}));
},registerBeforeCloseHandler:function(_5a9){
var _5aa=curam.util.getTopmostWindow();
curam.util.Dialog._unsubscribes.push(_5aa.dojo.subscribe("/curam/dialog/BeforeClose",null,function(_5ab){
if(_5ab===curam.util.Dialog._id){
_5a9();
}
}));
},pageLoadFinished:function(){
var _5ac=curam.util.getTopmostWindow();
curam.util.Dialog._unsTokenReleaseHandlers=_5ac.dojo.subscribe("/curam/dialog/BeforeClose",null,function(_5ad){
if(_5ad==curam.util.Dialog._id){
curam.util.Dialog._releaseHandlers();
}
});
curam.util.onLoad.execute();
},_releaseHandlers:function(){
var _5ae=curam.util.getTopmostWindow();
dojo.forEach(curam.util.Dialog._unsubscribes,_5ae.dojo.unsubscribe);
curam.util.Dialog._unsubscribes=[];
_5ae.dojo.unsubscribe(curam.util.Dialog._unsTokenReleaseHandlers);
curam.util.Dialog._unsTokenReleaseHandlers=null;
},close:function(_5af,_5b0,_5b1){
var _5b2=curam.dialog.getParentWindow(window);
if(_5af&&!_5b0){
curam.dialog.forceParentRefresh();
_5b2.curam.util.redirectWindow(null);
}else{
if(_5b0){
var _5b3=_5b0;
if(_5b0.indexOf("Page.do")==-1&&_5b0.indexOf("Action.do")==-1){
_5b3=_5b0+"Page.do"+curam.util.makeQueryString(_5b1);
}
_5b2.curam.util.redirectWindow(_5b3);
}
}
var _5b4=curam.util.getTopmostWindow();
_5b4.dojo.publish("/curam/dialog/close",[curam.util.Dialog._id]);
},closeAndSubmitParent:function(_5b5){
var _5b6=curam.dialog.getParentWindow(window);
var _5b7=_5b6.document.forms["mainForm"];
var _5b8=curam.util.getTopmostWindow();
if(_5b7==null||_5b7==undefined){
_5b8.dojo.publish("/curam/dialog/close",[curam.util.Dialog._id]);
return;
}
var _5b9=function(_5ba){
for(var _5bb in _5ba){
if(_5ba.hasOwnProperty(_5bb)){
return false;
}
}
return true;
};
if(_5b5&&!_5b9(_5b5)){
var _5bc=dojo.query("input[type=text])",_5b7);
var _5bd=dojo.filter(_5bc,function(node){
return node.readOnly==false;
});
dojo.forEach(_5bd,function(node){
node.value="";
});
for(var _5be in _5b5){
var _5bf=_5bd[parseInt(_5be)];
if(_5bf){
var _5c0=dojo.query("input[name="+_5bf.id+"]",_5b7)[0];
if(_5c0){
_5c0.value=_5b5[_5be];
}else{
_5bf.value=_5b5[_5be];
}
}
}
}else{
}
_5b6.dojo.publish("/curam/page/refresh");
_5b7.submit();
_5b8.dojo.publish("/curam/dialog/close",[curam.util.Dialog._id]);
}});
});
},"dijit/PopupMenuItem":function(){
define("dijit/PopupMenuItem",["dojo/_base/declare","dojo/dom-style","dojo/query","dojo/_base/window","./registry","./MenuItem","./hccss"],function(_5c1,_5c2,_5c3,win,_5c4,_5c5){
return _5c1("dijit.PopupMenuItem",_5c5,{_fillContent:function(){
if(this.srcNodeRef){
var _5c6=_5c3("*",this.srcNodeRef);
this.inherited(arguments,[_5c6[0]]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(!this.popup){
var node=_5c3("[widgetId]",this.dropDownContainer)[0];
this.popup=_5c4.byNode(node);
}
win.body().appendChild(this.popup.domNode);
this.popup.startup();
this.popup.domNode.style.display="none";
if(this.arrowWrapper){
_5c2.set(this.arrowWrapper,"visibility","");
}
this.focusNode.setAttribute("aria-haspopup","true");
},destroyDescendants:function(_5c7){
if(this.popup){
if(!this.popup._destroyed){
this.popup.destroyRecursive(_5c7);
}
delete this.popup;
}
this.inherited(arguments);
}});
});
},"cm/_base/_behavior":function(){
define("cm/_base/_behavior",["dojo/behavior"],function(){
var cm=dojo.global.cm||{};
dojo.global.cm=cm;
dojo.mixin(cm,{behaviors:{},addedBehaviors:{},addBehavior:function(name){
var b=cm.behaviors[name];
if(b&&!cm.addedBehaviors[name]){
dojo.behavior.add(b);
cm.addedBehaviors[name]=true;
dojo.behavior.apply();
}
},registerBehavior:function(name,_5c8){
cm.behaviors[name]=_5c8;
}});
return cm;
});
},"curam/pagination/DefaultListModel":function(){
define("curam/pagination/DefaultListModel",["curam/debug","curam/pagination","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _5c9=new curam.util.ResourceBundle("Debug");
var _5ca=dojo.declare("curam.pagination.DefaultListModel",null,{_rowCount:null,constructor:function(_5cb){
this.tableNode=dojo.query("table.paginated-list-id-"+_5cb)[0];
if(!this.tableNode){
throw "Table node for ID "+_5cb+" not found - failing!";
}
curam.debug.log("curam.pagination.DefaultListModel "+_5c9.getProperty("curam.pagination.DefaultListModel"),this.tableNode);
this._id=_5cb;
},getId:function(){
return this._id;
},getRowCount:function(){
if(this._rowCount==null){
this._rowCount=0;
var _5cc=dojo.query("tbody > script.hidden-list-rows",this.tableNode);
for(var i=0;i<_5cc.length;i++){
var _5cd=_5cc[i];
var _5ce=(i==_5cc.length-1);
if(!_5ce){
this._rowCount+=curam.pagination.getNumRowsInBlock(_5cd);
}else{
curam.pagination.unpackRows(_5cd);
}
}
var _5cf=dojo.query("tbody > tr",this.tableNode).length;
this._rowCount+=_5cf;
}
return this._rowCount;
},hideRange:function(_5d0,_5d1){
var rows=this._getRowNodes(_5d0,_5d1);
for(var i=_5d0;i<=_5d1;i++){
dojo.style(rows[i-1],{"display":"none"});
dojo.removeClass(rows[i-1],"even-last-row");
dojo.removeClass(rows[i-1],"odd-last-row");
}
},showRange:function(_5d2,_5d3){
var rows=this._getRowNodes(_5d2,_5d3);
var _5d4=(_5d3%2==0)?"even-last-row":"odd-last-row";
dojo.addClass(rows[_5d3-1],_5d4);
for(var i=_5d2;i<=_5d3;i++){
dojo.style(rows[i-1],{"display":""});
}
},_getRowNodes:function(_5d5,_5d6){
var _5d7=curam.pagination.readListContent(this.tableNode);
for(var i=1;i<=_5d6&&i<=_5d7.length;i++){
var node=_5d7[i-1];
if(node.tagName=="SCRIPT"){
curam.pagination.unpackRows(node);
_5d7=curam.pagination.readListContent(this.tableNode);
i--;
}
}
return dojo.query("tbody > tr",this.tableNode);
}});
return _5ca;
});
},"dijit/main":function(){
define("dijit/main",["dojo/_base/kernel"],function(dojo){
return dojo.dijit;
});
},"curam/define":function(){
define("curam/define",[],function(){
if(typeof (dojo.global.curam)=="undefined"){
dojo.global.curam={};
}
if(typeof (dojo.global.curam.define)=="undefined"){
dojo.mixin(dojo.global.curam,{define:{}});
}
dojo.mixin(dojo.global.curam.define,{singleton:function(_5d8,_5d9){
var _5da=_5d8.split(".");
var _5db=window;
for(var i=0;i<_5da.length;i++){
var part=_5da[i];
if(typeof _5db[part]=="undefined"){
_5db[part]={};
}
_5db=_5db[part];
}
if(_5d9){
dojo.mixin(_5db,_5d9);
}
}});
return dojo.global.curam.define;
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
},"dijit/_OnDijitClickMixin":function(){
define("dijit/_OnDijitClickMixin",["dojo/on","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(on,_5dc,keys,_5dd,has,_5de,win){
var _5df=null;
if(has("ie")){
(function(){
var _5e0=function(evt){
_5df=evt.srcElement;
};
win.doc.attachEvent("onkeydown",_5e0);
_5de.addOnWindowUnload(function(){
win.doc.detachEvent("onkeydown",_5e0);
});
})();
}else{
win.doc.addEventListener("keydown",function(evt){
_5df=evt.target;
},true);
}
var _5e1=function(node,_5e2){
if(/input|button/i.test(node.nodeName)){
return on(node,"click",_5e2);
}else{
function _5e3(e){
return (e.keyCode==keys.ENTER||e.keyCode==keys.SPACE)&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey;
};
var _5e4=[on(node,"keypress",function(e){
if(_5e3(e)){
_5df=e.target;
e.preventDefault();
}
}),on(node,"keyup",function(e){
if(_5e3(e)&&e.target==_5df){
_5df=null;
_5e2.call(this,e);
}
}),on(node,"click",function(e){
_5e2.call(this,e);
})];
return {remove:function(){
_5dc.forEach(_5e4,function(h){
h.remove();
});
}};
}
};
return _5dd("dijit._OnDijitClickMixin",null,{connect:function(obj,_5e5,_5e6){
return this.inherited(arguments,[obj,_5e5=="ondijitclick"?_5e1:_5e5,_5e6]);
}});
});
},"curam/layout/ScrollingTabController":function(){
define("curam/layout/ScrollingTabController",["dijit/layout/ScrollingTabController","curam/debug"],function(_5e7){
var _5e8=dojo.declare("curam.layout.ScrollingTabController",_5e7,{onStartup:function(){
this.inherited(arguments);
this.updateTabStyle();
},updateTabStyle:function(){
var kids=this.getChildren();
curam.debug.log("curam.layout.ScrollingTabController.updateTabStyle kids = ",this.domNode);
dojo.forEach(kids,function(_5e9,_5ea,_5eb){
dojo.removeClass(_5e9.domNode,["first-class","last-class"]);
if(_5ea==0){
dojo.addClass(_5e9.domNode,"first");
}else{
if(_5ea==_5eb.length-1){
dojo.addClass(_5e9.domNode,"last");
}
}
});
var _5ec=dojo.query(".nowrapTabStrip",this.domNode)[0];
dojo.replaceClass(_5ec,"nowrapSecTabStrip","nowrapTabStrip");
var _5ed=document.createElement("div");
dojo.addClass(_5ed,"block-slope");
dojo.addClass(_5ed,"dijitTab");
_5ed.innerHTML="&#x200B;";
_5ec.appendChild(_5ed);
}});
return _5e8;
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
var b,t,w,h,rx,ry,dx=0,dy=0,_5ee,_5ef;
for(var n=e.target;n;){
if(n.nodeType==1&&(n.tagName.toLowerCase() in dojo.dnd._validNodes)){
var s=dojo.getComputedStyle(n),_5f0=(s.overflow.toLowerCase() in dojo.dnd._validOverflow),_5f1=(s.overflowX.toLowerCase() in dojo.dnd._validOverflow),_5f2=(s.overflowY.toLowerCase() in dojo.dnd._validOverflow);
if(_5f0||_5f1||_5f2){
b=dojo._getContentBox(n,s);
t=dojo.position(n,true);
}
if(_5f0||_5f1){
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
_5ee=n.scrollLeft;
n.scrollLeft=n.scrollLeft+dx;
}
}
if(_5f0||_5f2){
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
_5ef=n.scrollTop;
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
},"url:dijit/templates/TreeNode.html":"<div class=\"dijitTreeNode\" role=\"presentation\"\n\t><div data-dojo-attach-point=\"rowNode\" class=\"dijitTreeRow\" role=\"presentation\" data-dojo-attach-event=\"onmouseenter:_onMouseEnter, onmouseleave:_onMouseLeave, onclick:_onClick, ondblclick:_onDblClick\"\n\t\t><img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"expandoNode\" class=\"dijitTreeExpando\" role=\"presentation\"\n\t\t/><span data-dojo-attach-point=\"expandoNodeText\" class=\"dijitExpandoText\" role=\"presentation\"\n\t\t></span\n\t\t><span data-dojo-attach-point=\"contentNode\"\n\t\t\tclass=\"dijitTreeContent\" role=\"presentation\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"iconNode\" class=\"dijitIcon dijitTreeIcon\" role=\"presentation\"\n\t\t\t/><span data-dojo-attach-point=\"labelNode\" class=\"dijitTreeLabel\" role=\"treeitem\" tabindex=\"-1\" aria-selected=\"false\" data-dojo-attach-event=\"onfocus:_onLabelFocus\"></span>\n\t\t</span\n\t></div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitTreeContainer\" role=\"presentation\" style=\"display: none;\"></div>\n</div>\n","dojo/dnd/TimedMoveable":function(){
define("dojo/dnd/TimedMoveable",["../main","./Moveable"],function(dojo){
var _5f3=dojo.dnd.Moveable.prototype.onMove;
dojo.declare("dojo.dnd.TimedMoveable",dojo.dnd.Moveable,{timeout:40,constructor:function(node,_5f4){
if(!_5f4){
_5f4={};
}
if(_5f4.timeout&&typeof _5f4.timeout=="number"&&_5f4.timeout>=0){
this.timeout=_5f4.timeout;
}
},onMoveStop:function(_5f5){
if(_5f5._timer){
clearTimeout(_5f5._timer);
_5f3.call(this,_5f5,_5f5._leftTop);
}
dojo.dnd.Moveable.prototype.onMoveStop.apply(this,arguments);
},onMove:function(_5f6,_5f7){
_5f6._leftTop=_5f7;
if(!_5f6._timer){
var _5f8=this;
_5f6._timer=setTimeout(function(){
_5f6._timer=null;
_5f3.call(_5f8,_5f6,_5f6._leftTop);
},this.timeout);
}
}});
return dojo.dnd.TimedMoveable;
});
},"dijit/form/_ListMouseMixin":function(){
define("dijit/form/_ListMouseMixin",["dojo/_base/declare","dojo/_base/event","dojo/touch","./_ListBase"],function(_5f9,_5fa,_5fb,_5fc){
return _5f9("dijit.form._ListMouseMixin",_5fc,{postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,_5fb.press,"_onMouseDown");
this.connect(this.domNode,_5fb.release,"_onMouseUp");
this.connect(this.domNode,"onmouseover","_onMouseOver");
this.connect(this.domNode,"onmouseout","_onMouseOut");
},_onMouseDown:function(evt){
_5fa.stop(evt);
if(this._hoveredNode){
this.onUnhover(this._hoveredNode);
this._hoveredNode=null;
}
this._isDragging=true;
this._setSelectedAttr(this._getTarget(evt));
},_onMouseUp:function(evt){
_5fa.stop(evt);
this._isDragging=false;
var _5fd=this._getSelectedAttr();
var _5fe=this._getTarget(evt);
var _5ff=this._hoveredNode;
if(_5fd&&_5fe==_5fd){
this.onClick(_5fd);
}else{
if(_5ff&&_5fe==_5ff){
this._setSelectedAttr(_5ff);
this.onClick(_5ff);
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
},"curam/pagination/ExpandableListModel":function(){
define("curam/pagination/ExpandableListModel",["curam/util/ExpandableLists","curam/debug","curam/pagination","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _600=new curam.util.ResourceBundle("Debug");
var _601=dojo.declare("curam.pagination.ExpandableListModel",null,{_rowCount:null,constructor:function(_602){
this.tableNode=dojo.query("table.paginated-list-id-"+_602)[0];
if(!this.tableNode){
throw "Table node for ID "+_602+" not found - failing!";
}
curam.debug.log("curam.pagination.ExpandableListModel "+_600.getProperty("curam.pagination.ExpandableListModel"),this.tableNode);
this._id=_602;
},getId:function(){
return this._id;
},getRowCount:function(){
if(this._rowCount==null){
this._rowCount=0;
var _603=dojo.query("tbody > script.hidden-list-rows",this.tableNode);
for(var i=0;i<_603.length;i++){
var _604=_603[i];
var _605=(i==_603.length-1);
if(!_605){
this._rowCount+=(curam.pagination.getNumRowsInBlock(_604)*2);
}else{
curam.pagination.unpackRows(_604);
}
}
var _606=dojo.query("tbody > tr",this.tableNode).length;
this._rowCount+=_606;
}
if(this._rowCount<=1){
return 1;
}else{
return this._rowCount/2;
}
},hideRange:function(_607,_608){
var rows=this._getRowNodes(_607,_608);
for(var i=_607;i<=_608;i++){
var _609=(2*i)-2;
var _60a=(2*i)-1;
dojo.style(rows[_609],"display","none");
dojo.removeClass(rows[_609],"even-last-row");
dojo.removeClass(rows[_609],"odd-last-row");
if(rows.length>_60a){
var _60b=rows[_60a];
if(_60b){
_60b._curam_pagination_expanded=curam.util.ExpandableLists.isDetailsRowExpanded(_60b);
curam.util.ExpandableLists.setDetailsRowExpandedState(rows[_609],_60b,false);
}
}
}
},showRange:function(_60c,_60d){
var rows=this._getRowNodes(_60c,_60d);
var _60e=(_60d%2==0)?"even-last-row":"odd-last-row";
dojo.addClass(rows[(_60d*2)-2],_60e);
for(var i=_60c;i<=_60d;i++){
var _60f=(2*i)-2;
var _610=(2*i)-1;
dojo.style(rows[_60f],"display","");
if(rows.length>_610){
var _611=rows[_610];
if(_611){
curam.util.ExpandableLists.setDetailsRowExpandedState(rows[_60f],_611,_611._curam_pagination_expanded);
}
}
}
},_getRowNodes:function(_612,_613){
var _614=curam.pagination.readListContent(this.tableNode);
for(var i=1;i<=(_613*2)&&i<=_614.length;i++){
var node=_614[i-1];
if(node.tagName=="SCRIPT"){
curam.pagination.unpackRows(node);
_614=curam.pagination.readListContent(this.tableNode);
i--;
}
}
return dojo.query("tbody > tr",this.tableNode);
}});
return _601;
});
},"url:dijit/templates/Tree.html":"<div class=\"dijitTree dijitTreeContainer\" role=\"tree\"\n\tdata-dojo-attach-event=\"onkeypress:_onKeyPress\">\n\t<div class=\"dijitInline dijitTreeIndent\" style=\"position: absolute; top: -9999px\" data-dojo-attach-point=\"indentDetector\"></div>\n</div>\n","curam/inPageNavigation":function(){
define("curam/inPageNavigation",["curam/tab","curam/ui/PageRequest","curam/debug","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _615=new curam.util.ResourceBundle("Debug");
var _616=dojo.declare("curam.inPageNavigation",null,{title:"",href:"",selected:false,constructor:function(args){
this.title=args.title;
this.href=args.href;
this.selected=args.selected;
curam.debug.log("curam.inPageNavigation "+_615.getProperty("curam.inPageNavigation.msg")+this);
},getLinks:function(){
var _617=dojo.query(".in-page-navigation-tabs")[0];
var _618=dojo.query("li",_617);
var _619=new Array();
dojo.forEach(_618,function(link){
var _61a=dojo.query("a",link)[0];
if(!_61a){
return;
}
var _61b=_61a.innerText||_61a.textContent;
var _61c=false;
dojo.filter(dojo.attr(_61a,"class").split(" "),function(_61d){
if(_61d=="in-page-current-link"){
_61c=true;
return;
}
});
var href=dojo.attr(_61a,"href");
var _61e=new curam.inPageNavigation({"title":_61b,"selected":_61c,"href":href});
_619.push(_61e);
});
return _619;
},processMainContentAreaLinks:function(){
dojo.addOnLoad(function(){
var _61f=dojo.query(".ipn-page")[0];
if(_61f){
var _620=dijit.byId(dojo.attr(_61f,"id"));
var _621=_620.getChildren()[0];
_620.removeChild(_621);
if(_620.getChildren().length==0){
return;
}
var _622=dojo.query(".in-page-nav-contentWrapper")[0];
var _623=dojo.query("> *",_622);
var _624=_623[_623.length-1];
var pos=dojo.position(_624);
var _625=pos.y;
var _626="height: "+_625+"px;";
dojo.attr(_622,"style",_626);
dojo.connect(_620,"_transition",function(_627,_628){
var link=dojo.query(".in-page-link",_627.id)[0];
var _629=new curam.ui.PageRequest(link.href);
if(jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")){
_629.pageHolder=window;
}
curam.tab.getTabController().handlePageRequest(_629);
});
dojo.style(_61f,"visibility","visible");
}
});
}});
return _616;
});
},"dojo/cookie":function(){
define("dojo/cookie",["./_base/kernel","./regexp"],function(dojo,_62a){
dojo.cookie=function(name,_62b,_62c){
var c=document.cookie,ret;
if(arguments.length==1){
var _62d=c.match(new RegExp("(?:^|; )"+_62a.escapeString(name)+"=([^;]*)"));
ret=_62d?decodeURIComponent(_62d[1]):undefined;
}else{
_62c=_62c||{};
var exp=_62c.expires;
if(typeof exp=="number"){
var d=new Date();
d.setTime(d.getTime()+exp*24*60*60*1000);
exp=_62c.expires=d;
}
if(exp&&exp.toUTCString){
_62c.expires=exp.toUTCString();
}
_62b=encodeURIComponent(_62b);
var _62e=name+"="+_62b,_62f;
for(_62f in _62c){
_62e+="; "+_62f;
var _630=_62c[_62f];
if(_630!==true){
_62e+="="+_630;
}
}
document.cookie=_62e;
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
},"dojo/cache":function(){
define("dojo/cache",["./_base/kernel","./text"],function(dojo,text){
return dojo.cache;
});
},"url:dijit/form/templates/DropDownBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdata-dojo-attach-point=\"_buttonNode, _popupStateNode\" role=\"presentation\"\n\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdata-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\n\t/></div\n></div>\n","curam/ModalUIMController":function(){
require({cache:{"url:curam/layout/resources/ModalUIMController.html":"<div id=\"uimcontroller_${uid}\" class=\"uimcontroller_${uid} uimController ${classList}\" data-dojo-attach-point=\"uimController\">\r\n  <div style=\"display:none;\" \r\n       id=\"uimcontroller_tc_${uid}\" \r\n       class=\"ipnTabController in-page-nav-tabContainer\"\r\n       data-dojo-attach-point=\"tabController\" \r\n       data-dojo-type=\"curam.layout.TabContainer\">\r\n  </div>\r\n  <div class=\"contentPanelFrameWrapper3\"  \r\n        data-dojo-attach-point=\"frameWrapper\">\r\n    <iframe frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\"\r\n             allowTransparency=\"true\" \r\n             id=\"${iframeId}\" \r\n             data-dojo-attach-point=\"frame\"                 \r\n             class=\"${iframeId} ${iframeClassList}\"\r\n             iscpiframe=\"${iscpiframe}\"\r\n             title=\"${title}\" >\r\n    </iframe>\r\n    <span tabIndex=\"0\" class=\"hidden\" id=\"end-${uid}\">${endModalUIMController}</span>\r\n  </div> \r\n</div>"}});
define("curam/ModalUIMController",["dojo/text!curam/layout/resources/ModalUIMController.html","dojo/parser","curam/UIMController","curam/debug","curam/util/onLoad","curam/util/ResourceBundle"],function(_631){
dojo.requireLocalization("curam.application","Debug");
var _632=new curam.util.ResourceBundle("Debug");
var _633=dojo.declare("curam.ModalUIMController",[curam.UIMController],{startModalUIMController:LOCALISED_ACCESSIBILITY_MODAL_START,endModalUIMController:LOCALISED_ACCESSIBILITY_MODAL_END,templateString:"<div id=\"uimcontroller_${uid}\" class=\"uimcontroller_${uid} uimController ${classList}\" data-dojo-attach-point=\"uimController\">\r\n  <div style=\"display:none;\" \r\n       id=\"uimcontroller_tc_${uid}\" \r\n       class=\"ipnTabController in-page-nav-tabContainer\"\r\n       data-dojo-attach-point=\"tabController\" \r\n       data-dojo-type=\"curam.layout.TabContainer\">\r\n  </div>\r\n  <div class=\"contentPanelFrameWrapper\"  \r\n        data-dojo-attach-point=\"frameWrapper\">\r\n     <iframe frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\"\r\n             allowTransparency=\"true\" \r\n             id=\"${iframeId}\" \r\n             data-dojo-attach-point=\"frame\"                 \r\n             class=\"${iframeId} ${iframeClassList}\"\r\n             iscpiframe=\"${iscpiframe}\"\r\n             title=\"${title}\" >\r\n    </iframe>\r\n    <span onkeyDown=\"curam.util.focusHelpIconOnTab(event)\" tabIndex=\"0\" class=\"hidden\" id=\"end-${uid}\">${endModalUIMController}</span>\r\n  </div> \r\n</div>"});
return _633;
});
},"curam/util/ui/refresh/TabRefreshController":function(){
define("curam/util/ui/refresh/TabRefreshController",["curam/debug","curam/util/ui/refresh/RefreshEvent","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _634=new curam.util.ResourceBundle("Debug");
var _635=dojo.declare("curam.util.ui.refresh.TabRefreshController",null,{EVENT_REFRESH_MENU:"/curam/refresh/menu",EVENT_REFRESH_NAVIGATION:"/curam/refresh/navigation",EVENT_REFRESH_CONTEXT:"/curam/refresh/context",EVENT_REFRESH_MAIN:"/curam/refresh/main-content",_tabWidgetId:null,_configOnSubmit:null,_configOnLoad:null,_handler:null,_lastSubmitted:null,_currentlyRefreshing:null,constructor:function(_636,_637){
this._configOnSubmit={};
this._configOnLoad={};
if(!_637){
return;
}
this._tabWidgetId=_636;
dojo.forEach(_637.config,dojo.hitch(this,function(item){
this._configOnSubmit[item.page]=item.onsubmit;
this._configOnLoad[item.page]=item.onload;
}));
},pageSubmitted:function(_638,_639){
new curam.util.ui.refresh.RefreshEvent(curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONSUBMIT,_639);
curam.debug.log("curam.util.ui.refresh.TabRefreshController: "+_634.getProperty("curam.util.ui.refresh.TabRefreshController.submit",[_638,_639]));
if(this._configOnSubmit[_638]){
this._lastSubmitted=_638;
curam.debug.log("curam.util.ui.refresh.TabRefreshController: "+_634.getProperty("curam.util.ui.refresh.TabRefreshController"+"submit.notify"));
}
},pageLoaded:function(_63a,_63b){
var _63c=new curam.util.ui.refresh.RefreshEvent(curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONLOAD,_63b);
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_634.getProperty("curam.util.ui.refresh.TabRefreshController.load",[_63a,_63b]));
if(this._currentlyRefreshing&&this._currentlyRefreshing.equals(_63c)){
this._currentlyRefreshing=null;
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_634.getProperty("curam.util.ui.refresh.TabRefreshController"+"refresh"));
return;
}
var _63d={};
if(_63b==_63c.SOURCE_CONTEXT_MAIN&&this._configOnLoad[_63a]){
_63d=this._configOnLoad[_63a];
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_634.getProperty("curam.util.ui.refresh.TabRefreshController"+".load.config"));
}
if(this._lastSubmitted){
var cfg=this._configOnSubmit[this._lastSubmitted];
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_634.getProperty("curam.util.ui.refresh.TabRefreshController"+".submit.config",[this._lastSubmitted]));
_63d.details=_63d.details||cfg.details;
_63d.menubar=_63d.menubar||cfg.menubar;
_63d.navigation=_63d.navigation||cfg.navigation;
_63d.mainContent=_63d.mainContent||cfg.mainContent;
this._lastSubmitted=null;
}
this._fireRefreshEvents(_63d);
},_fireRefreshEvents:function(cfg){
var _63e=[];
if(cfg.details){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_634.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.context"));
_63e.push(this.EVENT_REFRESH_CONTEXT+"/"+this._tabWidgetId);
}
if(cfg.menubar){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_634.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.menu"));
_63e.push(this.EVENT_REFRESH_MENU+"/"+this._tabWidgetId);
}
if(cfg.navigation){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_634.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.nav"));
_63e.push(this.EVENT_REFRESH_NAVIGATION+"/"+this._tabWidgetId);
}
if(cfg.mainContent){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_634.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.main"));
this._currentlyRefreshing=new curam.util.ui.refresh.RefreshEvent(curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONLOAD,curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN,null);
_63e.push(this.EVENT_REFRESH_MAIN+"/"+this._tabWidgetId);
}
if(_63e.length>0){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_634.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.log",[_63e.length,_63e]));
this._handler(_63e);
}
},setRefreshHandler:function(_63f){
this._handler=_63f;
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
return _635;
});
},"url:curam/layout/resources/TabContainer.html":"<div class=\"dijitTabContainer\">\r\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\r\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer dijitAlignTop\"></div>\r\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container dijitAlignClient\" data-dojo-attach-point=\"containerNode\"></div>\r\n</div>\r\n","curam/core-uim":function(){
define("curam/core-uim",["cm/_base/_dom","cm/_base/_form","cm/_base/_pageBehaviors","curam/util","curam/date","curam/validation","curam/util/ScreenContext","curam/util/onLoad","curam/ui/UIMPageAdaptor","curam/util/ExpandableLists","curam/util/Refresh","curam/omega3-util","dijit/layout/ContentPane","curam/layout/TabContainer","curam/inPageNavigation"],function(){
});
},"curam/widget/_TabButton":function(){
require({cache:{"url:curam/widget/templates/_TabButton.html":"<div role=\"presentation\" data-dojo-attach-point=\"titleNode\" data-dojo-attach-event='onclick:onClick' class='dijitTab'>\r\n    <div role=\"presentation\" class='dijitTabInnerDiv' data-dojo-attach-point='innerDiv'>\r\n        <div role=\"presentation\" class='dijitTabContent' data-dojo-attach-point='tabContent'>\r\n          <div role=\"presentation\" aria-labelledby='${id}_tabLabel'>\r\n            <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" data-dojo-attach-point='iconNode' />\r\n            <span data-dojo-attach-point='containerNode,focusNode' class='tabLabel' id='${id}_tabLabel'></span>\r\n            <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\r\n                data-dojo-attach-event='onclick: onClickCloseButton' role=\"presentation\">\r\n                <span data-dojo-attach-point='closeText' class='dijitTabCloseText'>Close Tab</span\r\n            ></span>\r\n      </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"}});
define("curam/widget/_TabButton",["dojo/dom-attr","dojo/dom-class","dojo/i18n","dojo/_base/lang","dojo/text!curam/widget/templates/_TabButton.html","dojo/_base/connect","dijit/layout/StackController","dijit/Menu","dijit/MenuItem","curam/widget/MenuItem","curam/util/ResourceBundle"],function(_640,_641,i18n,lang,_642,_643){
dojo.requireLocalization("curam.application","TabMenu");
var _644=new curam.util.ResourceBundle("TabMenu");
_643.subscribe("/curam/tab/labelUpdated",function(){
var tabs,_645=dojo.query(".dijitTabContainerTop-tabs");
_645.forEach(function(_646){
tabs=dojo.query(".tabLabel",_646);
tabs.forEach(function(tab,_647){
var _648="  ["+(_647+1)+" "+LOCALISED_TABCONTAINER_CONTEXT_OF+" "+tabs.length+"]";
var _649=tabs[_647].innerHTML;
tab.setAttribute("aria-label",_649+_648);
tab.setAttribute("title",_649);
});
});
});
var _64a=dojo.declare("curam.widget._TabButton",dijit.layout._StackButton,{templateString:_642,scrollOnFocus:false,curamDisabled:false,curamVisible:true,baseClass:"dijitTab",postMixInProperties:function(){
if(!this.iconClass){
this.iconClass="dijitTabButtonIcon";
}
},postCreate:function(){
this.inherited(arguments);
dojo.setSelectable(this.containerNode,false);
if(this.iconNode.className=="dijitTabButtonIcon"){
dojo.style(this.iconNode,"width","1px");
}
_640.set(this.focusNode,"id",this.id+"_tabLabel");
},startup:function(){
if(dojo.isIE==6){
this.inherited(arguments);
}else{
dijit.layout._StackButton.prototype.startup.apply(this,arguments);
}
},_setCloseButtonAttr:function(disp){
this._set("closeButton",disp);
_641.toggle(this.innerDiv,"dijitClosable",disp);
this.closeNode.style.display=disp?"":"none";
if(disp){
var _64b=i18n.getLocalization("dijit","common");
if(this.closeNode){
_640.set(this.closeNode,"title",_64b.itemClose);
}
this._closeMenu=new dijit.Menu({id:this.id+"_Menu",dir:this.dir,lang:this.lang,textDir:this.textDir,targetNodeIds:[this.domNode]});
var _64c=new curam.widget.MenuItem({onClickValue:"_onClick",label:_64b.itemClose,dir:this.dir,lang:this.lang,textDir:this.textDir,onClick:lang.hitch(this,"onClickCloseButton")});
var _64d=new curam.widget.MenuItem({onClickValue:"_onClickAll",label:_644.getProperty("close.all.tabs.text"),dir:this.dir,lang:this.lang,textDir:this.textDir,onClick:lang.hitch(this,"onClickCloseButton")});
this._closeMenu.addChild(_64c);
this._closeMenu.addChild(_64d);
}else{
dojo.addClass(this.titleNode,"hasNoCloseButton");
if(this._closeMenu){
this._closeMenu.destroyRecursive();
delete this._closeMenu;
}
}
},_setCuramDisabledAttr:function(_64e){
this.curamDisabled=_64e;
this._swapState(this.domNode,this.curamDisabled,"disabled","enabled");
},_setCuramVisibleAttr:function(_64f){
this.curamVisible=_64f;
this._swapState(this.domNode,this.curamVisible,"visible","hidden");
},_swapState:function(node,_650,_651,_652){
if(_650){
dojo.replaceClass(node,_651,_652);
}else{
dojo.replaceClass(node,_652,_651);
}
},destroy:function(){
_643.publish("/curam/tab/labelUpdated");
if(this._closeMenu){
this._closeMenu.destroyRecursive();
delete this._closeMenu;
}
this.inherited(arguments);
}});
return _64a;
});
},"curam/widget/DropDownButton":function(){
require({cache:{"url:curam/widget/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n"}});
define("curam/widget/DropDownButton",["dojo/text!curam/widget/templates/DropDownButton.html","dijit/form/DropDownButton"],function(_653){
var _654=dojo.declare("curam.widget.DropDownButton",dijit.form.DropDownButton,{templateString:_653});
return _654;
});
},"url:curam/widget/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n","url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n","curam/validation/calendar":function(){
define("curam/validation/calendar",["curam/define"],function(){
curam.define.singleton("curam.validation.calendar",{invalidGotoDateEntered:null});
return curam.validation.calendar;
});
},"curam/util/ExpandableLists":function(){
define("curam/util/ExpandableLists",["curam/util","curam/debug","curam/UIMController","curam/util/ui/refresh/RefreshEvent","curam/define","curam/contentPanel","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _655=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.ExpandableLists",{_minimumExpandedHeight:[],stateData:[],_LIST_ID_PREFIX:"list-id-",_ROW_ID_PREFIX:"row-id-",_EVENT_TOGGLE:"/curam/list/row/toggle",_EVENT_TYPE_EXPANDED:"Expanded",_EVENT_TYPE_COLLAPSED:"Collapsed",setupToggleHandler:function(){
dojo.ready(function(){
var _656=curam.util.ExpandableLists;
var _657=function(_658,_659,_65a){
curam.debug.log(_655.getProperty("curam.util.ExpandableLists.event",[_65a,_658,_659]));
if(_65a==_656._EVENT_TYPE_EXPANDED){
var _65b=_656._getListData(_658);
var _65c=dojo.filter(_65b.expandedRows,function(item){
return item==_659;
});
if(_65c.length==0){
_65b.expandedRows.push(_659);
}
}else{
var _65b=_656._getListData(_658);
_65b.expandedRows=dojo.filter(_65b.expandedRows,function(item){
return item!=_659;
});
if(_65b.expandedRows.length==0){
_656._removeListData(_658);
}
}
curam.debug.log("curam.util.ExpandableLists.setupToggleHandler stateData: ",_656.stateData);
};
dojo.subscribe(_656._EVENT_TOGGLE,this,_657);
dojo.subscribe("/curam/page/refresh",this,_656._saveStateData);
});
},_saveStateData:function(){
var _65d=curam.util.ExpandableLists;
curam.debug.log("/curam/page/refresh"+_655.getProperty("curam.util.ExpandableLists.refresh"),_65d.stateData);
curam.util.runStorageFn(function(){
try{
dojo.forEach(_65d.stateData,function(item){
var data=dojo.toJson(item);
curam.debug.log(_655.getProperty("curam.util.ExpandableLists.exception"),data);
var _65e=curam.util.getTopmostWindow().dojox;
_65e.storage.put(_65d._sanitizeKey(item.listId),data);
});
}
catch(e){
curam.debug.log(_655.getProperty("curam.util.ExpandableLists.exception"),e);
}
});
},_sanitizeKey:function(key){
return key.replace("-","_");
},loadStateData:function(_65f){
if(typeof (window.curamDialogRedirecting)!="undefined"){
curam.debug.log("curam.util.ExpandableLists.loadStateData "+_655.getProperty("curam.util.ExpandableLists.load.exit"));
return;
}
var _660=curam.util.ExpandableLists;
var _661=function(){
curam.debug.log("curam.util.ExpandableLists.loadStateData "+ +_655.getProperty("curam.util.ExpandableLists.load.for"),_65f);
var _662=curam.util.getTopmostWindow().dojox;
var _663=_662.storage.get(_660._sanitizeKey(_65f));
if(_663&&_663!=""){
var _664=dojo.fromJson(_663);
var _665=dojo.query("table."+_660._LIST_ID_PREFIX+_65f);
dojo.forEach(_664.expandedRows,function(item){
curam.debug.log(_655.getProperty("curam.util.ExpandableLists.load.row"),item);
var _666=dojo.query("tr."+_660._ROW_ID_PREFIX+item,_665[0]);
if(_666.length>0){
var _667=dojo.query("a.list-details-row-toggle",cm.prevSibling(_666[0],"tr"));
if(_667.length==1){
_660._toggleDetailsRow(_667[0]);
}else{
curam.debug.log(_655.getProperty("curam.util.ExpandableLists.load.button"+".disabled"));
}
}else{
curam.debug.log(_655.getProperty("curam.util.ExpandableLists.load.row.disabled"));
}
});
_662.storage.put(_660._sanitizeKey(_65f),"");
}else{
curam.debug.log(_655.getProperty("curam.util.ExpandableLists.load.no.data"));
}
};
dojo.ready(function(){
curam.util.runStorageFn(_661);
});
},_getListData:function(_668){
var _669=curam.util.ExpandableLists.stateData;
var _66a=dojo.filter(_669,function(item){
return item.listId==_668;
});
if(_66a.length==0){
_66a.push({listId:_668,expandedRows:[]});
_669.push(_66a[0]);
}
return _66a[0];
},_removeListData:function(_66b){
var _66c=curam.util.ExpandableLists;
_66c.stateData=dojo.filter(_66c.stateData,function(item){
return item.listId!=_66b;
});
},toggleListDetailsRow:function(_66d){
if(_66d){
_66d=dojo.fixEvent(_66d);
dojo.stopEvent(_66d);
var _66e=_66d.currentTarget;
curam.util.ExpandableLists._toggleDetailsRow(_66e);
}
},_generateUimController:function(_66f){
var _670=dojo.query("td",_66f)[0];
var _671=dojo.query("div",_66f)[0];
var _672=new curam.UIMController({uid:dojo.attr(_671,"uid"),url:dojo.attr(_671,"url"),iframeId:dojo.attr(_671,"iframeId"),iframeClassList:dojo.attr(_671,"iframeClassList"),loadFrameOnCreate:dojo.attr(_671,"loadFrameOnCreate")});
_670.appendChild(_672.domNode);
if(_671&&_670){
_670.removeChild(_671);
}
return _672;
},_toggleDetailsRow:function(_673){
curam.debug.log("curam.util.ExpandableLists._toggleDetailsRow "+_655.getProperty("curam.util.ExpandableLists.load.for"),_673);
var _674=curam.util.ExpandableLists;
var _675=cm.getParentByType(_673,"tr");
var _676=cm.nextSibling(_675,"tr");
var _677=!_674.isDetailsRowExpanded(_676);
_674._handleStripingAndRoundedCorners(_675,_676,_677);
var _678=dojo.query("div.uimController",_676);
var _679=null;
var _67a=null;
if(_678==null||_678.length==0){
_67a=_674._generateUimController(_676);
}else{
_679=_678[0];
_67a=dijit.byNode(_679);
}
if(typeof (_67a)=="undefined"||_67a==null){
throw "UIMController Dijit not found for node: "+_679;
}
var _67b=dojo.attr(_67a.frame,"src");
var _67c=false;
_674.setDetailsRowExpandedState(_675,_676,_677,_673);
var def=new dojo.Deferred();
if(!_67b||_67b==null||_67b==""){
_67a.loadPage(def);
}else{
_67c=true;
def.callback();
}
def.addCallback(function(){
var _67d=_67a.hasInPageNavigation();
_67c=_67c||_67d;
if(_67d){
_67a.showTabContainer(_677);
}
if(_67c){
curam.util.ExpandableLists.resizeExpandableListAncestors(window);
}
var _67e=_677?_674._EVENT_TYPE_EXPANDED:_674._EVENT_TYPE_COLLAPSED;
var _67f=_674._findListId(_676);
var _680=curam.util.getSuffixFromClass(_676,_674._ROW_ID_PREFIX);
dojo.publish(_674._EVENT_TOGGLE,[_67f,_680,_67e]);
if(!curam.util.ExpandableLists._isExternalApp(window)){
var _67e=_677?"ListDetailsRow.Expand":"ListDetailsRow.Collapse";
var _681={url:dojo.attr(_67a.frame,"src"),eventType:_67e};
var _682=curam.tab.getSelectedTab();
if(_682){
var _683=curam.tab.getTabWidgetId(_682);
curam.util.getTopmostWindow().dojo.publish("expandedList.toggle",[window.frameElement,_681,_683]);
}
}
});
},_handleStripingAndRoundedCorners:function(_684,_685,_686){
var odd="odd";
var even="even";
var _687="row-no-border";
var _688="odd-last-row";
var _689="even-last-row";
if(!curam.util.ExpandableLists._isLastRow(_684,_685)){
if(dojo.hasClass(_684,odd)){
dojo.addClass(_685,odd);
}else{
if(dojo.hasClass(_684,even)){
dojo.addClass(_685,even);
}
}
}else{
if(_686){
if(dojo.hasClass(_684,_688)){
dojo.removeClass(_684,_688);
dojo.addClass(_684,odd);
dojo.addClass(_685,odd);
dojo.addClass(_685,_688);
}else{
if(dojo.hasClass(_684,_689)){
dojo.removeClass(_684,_689);
dojo.addClass(_684,even);
dojo.addClass(_685,even);
dojo.addClass(_685,_689);
}
}
}else{
if(dojo.hasClass(_684,odd)){
dojo.removeClass(_684,odd);
dojo.addClass(_684,_688);
dojo.removeClass(_685,_688);
dojo.removeClass(_685,odd);
}else{
if(dojo.hasClass(_684,even)){
dojo.removeClass(_684,even);
dojo.addClass(_684,_689);
dojo.removeClass(_685,even);
dojo.removeClass(_685,_689);
}
}
}
}
if(_686){
dojo.addClass(_684,_687);
}else{
dojo.removeClass(_684,_687);
}
if(dojo.hasClass(_684,_687)){
dojo.removeClass(_685,"collapsed");
}else{
dojo.addClass(_685,"collapsed");
}
},setDetailsRowExpandedState:function(_68a,_68b,_68c,_68d){
var _68e=curam.util.ExpandableLists.isDetailsRowExpanded(_68b);
dojo.removeClass(_68b,"collapsed");
if(!_68e){
dojo.addClass(_68b,"collapsed");
}
if(_68a.style.display=="none"){
_68b.setAttribute("style","display:none");
}else{
_68b.removeAttribute("style");
}
if(_68d){
if(_68c){
dojo.addClass(_68d,"expanded");
}else{
dojo.removeClass(_68d,"expanded");
}
}
},_isLastRow:function(_68f,_690){
return dojo.hasClass(_68f,"even-last-row")||dojo.hasClass(_68f,"odd-last-row")||dojo.hasClass(_690,"even-last-row")||dojo.hasClass(_690,"odd-last-row");
},isDetailsRowExpanded:function(_691){
return !dojo.hasClass(_691,"collapsed");
},listRowFrameLoaded:function(_692,_693){
curam.debug.log("========= "+_655.getProperty("curam.util.ExpandableLists.page.load")+" =======");
curam.debug.log(_692);
curam.debug.log(dojo.toJson(_693));
var _694=dojo.byId(_692);
if(!_694){
throw "List Row Expanded: No iframe found";
}
if(!_694._spExpListPageLoadListener){
_694._spExpListPageLoadListener="true";
}else{
if(!curam.util.ExpandableLists._isExternalApp(window)){
curam.contentPanel.publishSmartPanelExpListPageLoad(_694);
}
}
var _695=curam.util.ExpandableLists._findListId(_694);
var _696=curam.util.ExpandableLists.getMinimumExpandedHeight(_695);
var _697=_693.height;
if(_697<_696){
curam.debug.log(_655.getProperty("curam.util.ExpandableLists.min.height",[_696]));
_697=_696;
}else{
curam.debug.log(_655.getProperty("curam.util.ExpandableLists.height",[_697]));
}
curam.util.ExpandableLists._resizeIframe(_694,_697);
curam.util.ExpandableLists.resizeExpandableListAncestors(window);
curam.util.ExpandableLists._setFrameTitle(_694,_693);
if(!curam.util.ExpandableLists._isExternalApp(window)){
var _698=curam.tab.getSelectedTab();
if(_698){
var _699=curam.tab.getTabWidgetId(_698);
var _69a=curam.util.getTopmostWindow();
_69a.curam.util.Refresh.getController(_699).pageLoaded(_693.pageID,curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_INLINE);
}
}
curam.debug.log("================================================");
},_resizeIframe:function(_69b,_69c){
dojo.style(_69b,{height:_69c+"px"});
},_setFrameTitle:function(_69d,_69e){
_69d.title=_69d.title+" "+_69e.title;
},_findListId:function(_69f){
return curam.util.getSuffixFromClass(cm.getParentByType(_69f,"table"),curam.util.ExpandableLists._LIST_ID_PREFIX);
},resizeExpandableListAncestors:function(_6a0){
curam.debug.log("curam.util.ExpandableLists.resizeExpandableListAncestors: ",_6a0.location.href);
if(_6a0&&_6a0!==window.top&&typeof (_6a0.frameElement)!="undefined"&&(dojo.hasClass(_6a0.frameElement,"expanded_row_iframe")||curam.util.ExpandableLists.isNestedUIM(_6a0))){
var _6a1=_6a0.curam.util.getPageHeight();
curam.debug.log("curam.util.ExpandableLists"+".resizeExpandableListAncestors: "+_655.getProperty("curam.util.ExpandableLists.resize.height"),_6a1);
curam.util.ExpandableLists._resizeIframe(_6a0.frameElement,_6a1);
curam.util.ExpandableLists.resizeExpandableListAncestors(_6a0.parent);
}else{
curam.debug.log("curam.util.ExpandableLists"+".resizeExpandableListAncestors: "+_655.getProperty("curam.util.ExpandableLists.resize.end"));
return;
}
},isNestedUIM:function(_6a2){
if(_6a2&&_6a2.jsScreenContext){
return _6a2.jsScreenContext.hasContextBits("NESTED_UIM");
}else{
return false;
}
},_isExternalApp:function(_6a3){
if(_6a3&&_6a3.jsScreenContext){
return _6a3.jsScreenContext.hasContextBits("EXTAPP");
}else{
return false;
}
},setMinimumExpandedHeight:function(_6a4,_6a5){
curam.util.ExpandableLists._minimumExpandedHeight.push({listId:_6a4,minExpHeight:_6a5});
},getMinimumExpandedHeight:function(_6a6){
var data=dojo.filter(curam.util.ExpandableLists._minimumExpandedHeight,function(item){
return item.listId==_6a6;
});
if(data.length==1){
return data[0].minExpHeight;
}else{
curam.debug.log(_655.getProperty("curam.util.ExpandableLists.default.height"),_6a6);
return 30;
}
}});
return curam.util.ExpandableLists;
});
},"dojo/_base/url":function(){
define("dojo/_base/url",["./kernel"],function(dojo){
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$"),_6a7=function(){
var n=null,_6a8=arguments,uri=[_6a8[0]];
for(var i=1;i<_6a8.length;i++){
if(!_6a8[i]){
continue;
}
var _6a9=new _6a7(_6a8[i]+""),_6aa=new _6a7(uri[0]+"");
if(_6a9.path==""&&!_6a9.scheme&&!_6a9.authority&&!_6a9.query){
if(_6a9.fragment!=n){
_6aa.fragment=_6a9.fragment;
}
_6a9=_6aa;
}else{
if(!_6a9.scheme){
_6a9.scheme=_6aa.scheme;
if(!_6a9.authority){
_6a9.authority=_6aa.authority;
if(_6a9.path.charAt(0)!="/"){
var path=_6aa.path.substring(0,_6aa.path.lastIndexOf("/")+1)+_6a9.path;
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
_6a9.path=segs.join("/");
}
}
}
}
uri=[];
if(_6a9.scheme){
uri.push(_6a9.scheme,":");
}
if(_6a9.authority){
uri.push("//",_6a9.authority);
}
uri.push(_6a9.path);
if(_6a9.query){
uri.push("?",_6a9.query);
}
if(_6a9.fragment){
uri.push("#",_6a9.fragment);
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
_6a7.prototype.toString=function(){
return this.uri;
};
return dojo._Url=_6a7;
});
},"curam/widget/FilteringSelect":function(){
define("curam/widget/FilteringSelect",["dijit/registry","dojo/on","dijit/form/FilteringSelect"],function(_6ab,on){
var _6ac=dojo.declare("curam.widget.FilteringSelect",dijit.form.FilteringSelect,{enterKeyOnOpenDropDown:false,postMixInProperties:function(){
if(!this.store){
if(dojo.query("> option",this.srcNodeRef)[0]==undefined){
dojo.create("option",{innerHTML:"<!--__o3_BLANK-->"},this.srcNodeRef);
}
}
if(!this.get("store")&&this.srcNodeRef.value==""){
var _6ad=this.srcNodeRef,_6ae=dojo.query("> option[value='']",_6ad);
if(_6ae.length&&_6ae[0].innerHTML!="<!--__o3_BLANK-->"){
this.displayedValue=dojo.trim(_6ae[0].innerHTML);
}
}
this.inherited(arguments);
},postCreate:function(){
on(this.focusNode,"keydown",function(e){
var _6af=_6ab.byNode(dojo.byId("widget_"+e.target.id));
if(e.keyCode==dojo.keys.ENTER&&_6af._opened){
_6af.enterKeyOnOpenDropDown=true;
}
});
this.inherited(arguments);
},startup:function(){
this.domNode.setAttribute("role","listbox");
this.inherited(arguments);
},_callbackSetLabel:function(_6b0,_6b1,_6b2,_6b3){
if((_6b1&&_6b1[this.searchAttr]!==this._lastQuery)||(!_6b1&&_6b0.length&&this.get("store").getIdentity(_6b0[0])!=this._lastQuery)){
return;
}
if(!_6b0.length){
this.set("value","__o3_INVALID",_6b3||(_6b3===undefined&&!this.focused),this.textbox.value,null);
}else{
this.set("item",_6b0[0],_6b3);
}
}});
return _6ac;
});
},"dojo/text":function(){
define("dojo/text",["./_base/kernel","require","./has","./_base/xhr"],function(dojo,_6b4,has,xhr){
var _6b5;
if(1){
_6b5=function(url,sync,load){
xhr("GET",{url:url,sync:!!sync,load:load});
};
}else{
if(_6b4.getText){
_6b5=_6b4.getText;
}else{
console.error("dojo/text plugin failed to load because loader does not support getText");
}
}
var _6b6={},_6b7=function(text){
if(text){
text=text.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _6b8=text.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_6b8){
text=_6b8[1];
}
}else{
text="";
}
return text;
},_6b9={},_6ba={},_6bb={dynamic:true,normalize:function(id,_6bc){
var _6bd=id.split("!"),url=_6bd[0];
return (/^\./.test(url)?_6bc(url):url)+(_6bd[1]?"!"+_6bd[1]:"");
},load:function(id,_6be,load){
var _6bf=id.split("!"),_6c0=_6bf.length>1,_6c1=_6bf[0],url=_6be.toUrl(_6bf[0]),text=_6b9,_6c2=function(text){
load(_6c0?_6b7(text):text);
};
if(_6c1 in _6b6){
text=_6b6[_6c1];
}else{
if(url in _6be.cache){
text=_6be.cache[url];
}else{
if(url in _6b6){
text=_6b6[url];
}
}
}
if(text===_6b9){
if(_6ba[url]){
_6ba[url].push(_6c2);
}else{
var _6c3=_6ba[url]=[_6c2];
_6b5(url,!_6be.async,function(text){
_6b6[_6c1]=_6b6[url]=text;
for(var i=0;i<_6c3.length;){
_6c3[i++](text);
}
delete _6ba[url];
});
}
}else{
_6c2(text);
}
}};
dojo.cache=function(_6c4,url,_6c5){
var key;
if(typeof _6c4=="string"){
if(/\//.test(_6c4)){
key=_6c4;
_6c5=url;
}else{
key=_6b4.toUrl(_6c4.replace(/\./g,"/")+(url?("/"+url):""));
}
}else{
key=_6c4+"";
_6c5=url;
}
var val=(_6c5!=undefined&&typeof _6c5!="string")?_6c5.value:_6c5,_6c6=_6c5&&_6c5.sanitize;
if(typeof val=="string"){
_6b6[key]=val;
return _6c6?_6b7(val):val;
}else{
if(val===null){
delete _6b6[key];
return null;
}else{
if(!(key in _6b6)){
_6b5(key,true,function(text){
_6b6[key]=text;
});
}
return _6c6?_6b7(_6b6[key]):_6b6[key];
}
}
};
return _6bb;
});
},"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n","curam/util/TabNavigation":function(){
define("curam/util/TabNavigation",["curam/debug","curam/define","curam/util","curam/tab","curam/util/Refresh","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _6c7=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.TabNavigation",{CACHE_BUSTER:0,CACHE_BUSTER_PARAM_NAME:"o3nocache",disabledItems:{},tabLists:{},init:function(_6c8,_6c9){
var _6ca=_6c8+"child-nav-selectChild";
var _6cb=dojo.subscribe(_6ca,"",function(){
curam.util.TabNavigation.onParentSelect(null,_6c8);
});
curam.tab.unsubscribeOnTabClose(_6cb,_6c9);
},onParentSelect:function(_6cc,_6cd){
var _6ce=_6cd+"-child-nav";
var _6cf=dijit.byId(_6ce);
var _6d0=true;
if(!_6cc){
var _6d0=false;
var _6d1=_6cd+"-parent-nav";
var _6d2=dijit.byId(_6d1);
_6cc=_6d2.selectedChildWidget;
}
if(_6cc.curamDoNoReload){
_6d0=false;
_6cc.setAttribute("curamDoNoReload",null);
}
var _6d3=_6cc.id+"-Stack";
var _6d4=dijit.byId(_6d3);
var href=dojo.attr(_6d4.get("srcNodeRef"),"page-ref");
if(!href){
var _6d5=_6d4;
if(_6d5){
var link=dojo.query("li.selected > div.link",_6d5.id)[0];
href=dojo.attr(link,"page-ref");
}else{
throw new Error("Could not find a page reference. The menu item '"+_6cc.id+"' has no page reference and no selected child item was found.");
}
}
if(_6d0){
var ifr=curam.util.TabNavigation.getIframe(_6cd);
if(dojo.isIE&&dojo.isIE<9){
ifrBody=ifr.contentWindow.document.body;
}else{
ifrBody=ifr.contentDocument.activeElement;
}
var _6d6=function(){
_6cf.selectChild(_6d4);
dojo.style(_6cf.domNode,"visibility","visible");
dojo.style(ifr,"visibility","visible");
};
if(dojo.isIE&&dojo.isIE<9){
var lh=function(){
if(ifr.readyState=="complete"){
ifr.detachEvent("onreadystatechange",lh);
_6d6();
}
};
ifr.attachEvent("onreadystatechange",lh);
}else{
var dt=dojo.connect(ifr,"onload",null,function(){
dojo.disconnect(dt);
_6d6();
});
}
dojo.query("div.list",ifrBody).forEach(function(node){
dojo.addClass(node,"hidden");
});
dojo.style(ifr,"visibility","hidden");
dojo.style(_6cf.domNode,"visibility","hidden");
curam.util.TabNavigation.loadIframe(href,_6cd);
}
var open=curam.util.TabNavigation.childMenuExists(_6cc);
curam.util.TabNavigation.toggleChildMenu(open,_6cd);
},childMenuExists:function(_6d7){
var _6d8=_6d7.id+"-Stack";
var _6d9=dojo.query("#"+_6d8+" ul");
if(_6d9.length==0){
return false;
}else{
return true;
}
},toggleChildMenu:function(open,_6da){
var _6db=_6da+"-navigation-tab";
var _6dc=dojo.byId(_6db);
var _6dd=dojo.query(".content-area-container",_6dc)[0];
var _6de=dojo.query(".child-nav",_6dc)[0];
if(!open){
var _6df="0px";
var _6e0={left:_6df};
var _6e1={width:_6df};
dojo.style(_6dd,_6e0);
dojo.style(_6de,_6e1);
}else{
var _6e2=dojo.attr(_6dc,"child-menu-width");
var _6e0={left:_6e2};
var _6e1={width:_6e2};
dojo.style(_6dd,_6e0);
dojo.style(_6de,_6e1);
}
},handleChildSelect:function(_6e3,_6e4,_6e5){
if(!curam.util.TabNavigation.isSelectable(_6e3.parentNode.id)){
dojo.stopEvent(dojo.fixEvent(_6e5));
return false;
}
var ul=curam.util.TabNavigation.getNext(_6e3,"UL");
var _6e6=ul.childNodes;
for(var i=0;i<_6e6.length;i++){
dojo.replaceClass(_6e6[i],"not-selected","selected");
}
dojo.replaceClass(_6e3.parentNode,"selected","not-selected");
var href=dojo.attr(_6e3,"page-ref");
curam.util.TabNavigation.loadIframe(href,_6e4);
return true;
},isSelectable:function(_6e7){
return !curam.util.TabNavigation.disabledItems[_6e7];
},getNext:function(_6e8,_6e9){
var _6ea=_6e8.parentNode;
if(_6ea==null){
curam.debug.log(_6c7.getProperty("curam.util.TabNavigation.error",[_6e9]));
return null;
}
if(_6ea.nodeName===_6e9){
return _6ea;
}else{
var _6ea=curam.util.TabNavigation.getNext(_6ea,_6e9);
return _6ea;
}
},loadIframe:function(href,_6eb){
var _6ec=curam.util.TabNavigation.getIframe(_6eb);
dojo.attr(_6ec,"src",href+"&"+this.getCacheBusterParameter());
},getIframe:function(_6ed){
var _6ee=_6ed+"-navigation-tab";
var _6ef=dojo.byId(_6ee);
var _6f0=dojo.query("iframe",_6ef);
return _6f0[0];
},getCacheBusterParameter:function(){
return this.CACHE_BUSTER_PARAM_NAME+"="+new Date().getTime()+"_"+this.CACHE_BUSTER++;
},setupOnParentSelect:function(_6f1,_6f2,_6f3){
var _6f4=dojo.byId(_6f1+"-navigation-tab");
var _6f5=curam.tab.getContainerTab(_6f4);
_6f5.subscribe(_6f1+"-child-nav-startup",function(){
curam.util.TabNavigation.onParentSelect(null,_6f1);
var tabs=_6f3.split(",");
for(tabID in tabs){
var _6f6=curam.util.TabNavigation.findNavItem("navItem_"+this.id+"_"+tabs[tabID]);
if(_6f6!=null){
_6f6.set("curamVisible",false);
}
}
});
_6f5.subscribe(_6f2,function(_6f7){
curam.util.TabNavigation.onParentSelect(_6f7,_6f1);
});
},setupRefresh:function(_6f8){
curam.util.Refresh.setNavigationCallbacks(curam.util.TabNavigation.updateNavItemStates,curam.util.TabNavigation.getRefreshParams);
var _6f9=function(){
var _6fa=function(_6fb,_6fc){
return curam.util.Refresh.refreshMenuAndNavigation(_6fc,true,true,true);
};
var _6fd=curam.tab.getHandlerForTab(_6fa,_6f8);
var _6fe=curam.util.getTopmostWindow();
var _6ff=_6fe.dojo.subscribe("curam.tabOpened",null,function(_700,_701){
_6fd(_700,_701);
_6fe.dojo.unsubscribe(_6ff);
});
};
var _702=curam.util.TabNavigation.dynamicNavigationData[_6f8];
_702.registerTabOpenHandler=_6f9;
_702.registerTabOpenHandler();
},getRefreshParams:function(_703){
curam.debug.log("curam.util.TabNavigation.getRefreshParams(%s)",_703);
var _704=curam.util.TabNavigation.dynamicNavigationData[_703];
if(!_704){
curam.debug.log(_6c7.getProperty("curam.util.TabNavigation.no.dynamic"));
return null;
}
var _705="navId="+_704.navigationId;
_705+="&navItemIds="+curam.util.toCommaSeparatedList(_704.dynamicNavItemIds);
_705+="&navLoaders="+curam.util.toCommaSeparatedList(_704.dynamicNavLoaders);
_705+="&navPageParameters="+_704.pageParameters;
return _705;
},updateNavItemStates:function(_706,data){
var _707=data.navData;
for(var i=0;i<_707.itemStates.length;i++){
curam.util.TabNavigation.updateNavItemState(_707.itemStates[i],_706);
}
},updateNavItemState:function(_708,_709){
var _70a=curam.util.TabNavigation.findNavItem("navItem_"+_709+"_"+_708.id);
if(_70a!=null){
if(!_70a.domNode){
curam.util.TabNavigation.disabledItems[_70a.id]=!_708.enabled;
curam.util.swapState(_70a,_708.enabled,"enabled","disabled");
curam.util.swapState(_70a,_708.visible,"visible","hidden");
}else{
_70a.set("curamDisabled",!_708.enabled);
_70a.set("curamVisible",_708.visible);
}
}
},findNavItem:function(_70b){
var _70c=dojo.query("."+_70b);
if(_70c.length==1){
var node=_70c[0];
var _70d=dijit.byNode(node);
if(!_70d){
return node;
}else{
return _70d.controlButton;
}
}else{
curam.debug.log(_6c7.getProperty("curam.util.TabNavigation.item",[_70b]));
return null;
}
},addRollOverClass:function(_70e){
dojo.addClass(_70e.target,"hover");
curam.util.connect(_70e.target,"onmouseout",function(){
dojo.removeClass(_70e.target,"hover");
});
},setupOnLoadListener:function(_70f,_710){
var _711=dojo.fromJson(_710);
var _712=function(_713,_714){
curam.util.TabNavigation.handleContentAreaUpdate(_713,_714,_711);
};
var _715=curam.tab.getHandlerForTab(_712,_70f);
var _716=curam.util.getTopmostWindow();
var _717=_716.dojo.subscribe("/curam/main-content/page/loaded",null,_715);
curam.tab.unsubscribeOnTabClose(_717,_70f);
},setupTabList:function(_718,_719){
if(!curam.util.TabNavigation.tabLists[_718]){
curam.tab.executeOnTabClose(function(){
delete curam.util.TabNavigation.tabLists[_718];
},_718);
}
delete curam.util.TabNavigation.tabLists[_718];
curam.util.TabNavigation.tabLists[_718]=_719;
},handleContentAreaUpdate:function(_71a,_71b,_71c){
var ids=_71c[_71a];
if(ids){
var _71d=ids["dojoTabId"];
var _71e=_71d+"-parent-nav";
var _71f=ids["tabId"];
var _720=ids["childId"];
var _721=dijit.byId(_71f);
var _722=dijit.byId(_71e);
if(_721){
if(_722.selectedChildWidget!=_721){
_721.setAttribute("curamDoNoReload",true);
_722.selectChild(_721);
}
if(_720){
var _723=_71f+"-Stack";
var _724=_71d+"-child-nav";
var _725=dijit.byId(_724);
var _726=dijit.byId(_723);
_725.selectChild(_726);
var _727=dojo.query("li",_726.domNode);
for(var i=0;i<_727.length;i++){
var _728=_727[i];
if(_728.id==_720){
var _729=_728;
}
}
if(_729){
if(!dojo.hasClass(_729,"selected")){
var _72a=_729.parentNode.childNodes;
for(var i=0;i<_72a.length;i++){
dojo.replaceClass(_72a[i],"not-selected","selected");
}
dojo.replaceClass(_729,"selected","not-selected");
}
}
}
}
}
},getInsertIndex:function(_72b,_72c,_72d){
var _72e=curam.util.TabNavigation.tabLists[_72b];
var _72f=dojo.indexOf(_72e,_72d);
var _730=_72f;
for(var i=_72f-1;i>=0;i--){
if(dojo.indexOf(_72c,_72e[i])<0){
_730--;
}
}
return _730;
}});
return curam.util.TabNavigation;
});
},"dojo/uacss":function(){
define("dojo/uacss",["./dom-geometry","./_base/lang","./ready","./_base/sniff","./_base/window"],function(_731,lang,_732,has,_733){
var html=_733.doc.documentElement,ie=has("ie"),_734=has("opera"),maj=Math.floor,ff=has("ff"),_735=_731.boxModel.replace(/-/,""),_736={"dj_quirks":has("quirks"),"dj_opera":_734,"dj_khtml":has("khtml"),"dj_webkit":has("webkit"),"dj_safari":has("safari"),"dj_chrome":has("chrome"),"dj_gecko":has("mozilla")};
if(ie){
_736["dj_ie"]=true;
_736["dj_ie"+maj(ie)]=true;
_736["dj_iequirks"]=has("quirks");
}
if(ff){
_736["dj_ff"+maj(ff)]=true;
}
_736["dj_"+_735]=true;
var _737="";
for(var clz in _736){
if(_736[clz]){
_737+=clz+" ";
}
}
html.className=lang.trim(html.className+" "+_737);
_732(90,function(){
if(!_731.isBodyLtr()){
var _738="dj_rtl dijitRtl "+_737.replace(/ /g,"-rtl ");
html.className=lang.trim(html.className+" "+_738+"dj_rtl dijitRtl "+_737.replace(/ /g,"-rtl "));
}
});
return has;
});
},"dijit/Tooltip":function(){
require({cache:{"url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n"}});
define("dijit/Tooltip",["dojo/_base/array","dojo/_base/declare","dojo/_base/fx","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/_base/sniff","dojo/_base/window","./_base/manager","./place","./_Widget","./_TemplatedMixin","./BackgroundIframe","dojo/text!./templates/Tooltip.html","."],function(_739,_73a,fx,dom,_73b,_73c,_73d,lang,has,win,_73e,_73f,_740,_741,_742,_743,_744){
var _745=_73a("dijit._MasterTooltip",[_740,_741],{duration:_73e.defaultDuration,templateString:_743,postCreate:function(){
win.body().appendChild(this.domNode);
this.bgIframe=new _742(this.domNode);
this.fadeIn=fx.fadeIn({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onShow")});
this.fadeOut=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHide")});
},show:function(_746,_747,_748,rtl,_749){
if(this.aroundNode&&this.aroundNode===_747&&this.containerNode.innerHTML==_746){
return;
}
this.domNode.width="auto";
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_746;
if(_749){
this.set("textDir",_749);
}
this.containerNode.align=rtl?"right":"left";
var pos=_73f.around(this.domNode,_747,_748&&_748.length?_748:_74a.defaultPosition,!rtl,lang.hitch(this,"orient"));
var _74b=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_74b.y+((_74b.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_74b.x+((_74b.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}
}
_73d.set(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_747;
},orient:function(node,_74c,_74d,_74e,_74f){
this.connectorNode.style.top="";
var _750=_74e.w-this.connectorNode.offsetWidth;
node.className="dijitTooltip "+{"MR-ML":"dijitTooltipRight","ML-MR":"dijitTooltipLeft","TM-BM":"dijitTooltipAbove","BM-TM":"dijitTooltipBelow","BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_74c+"-"+_74d];
this.domNode.style.width="auto";
var size=_73c.getContentBox(this.domNode);
var _751=Math.min((Math.max(_750,1)),size.w);
var _752=_751<size.w;
this.domNode.style.width=_751+"px";
if(_752){
this.containerNode.style.overflow="auto";
var _753=this.containerNode.scrollWidth;
this.containerNode.style.overflow="visible";
if(_753>_751){
_753=_753+_73d.get(this.domNode,"paddingLeft")+_73d.get(this.domNode,"paddingRight");
this.domNode.style.width=_753+"px";
}
}
if(_74d.charAt(0)=="B"&&_74c.charAt(0)=="B"){
var mb=_73c.getMarginBox(node);
var _754=this.connectorNode.offsetHeight;
if(mb.h>_74e.h){
var _755=_74e.h-((_74f.h+_754)>>1);
this.connectorNode.style.top=_755+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_74f.h/2-_754/2,0),mb.h-_754)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_750);
},_onShow:function(){
if(has("ie")){
this.domNode.style.filter="";
}
},hide:function(_756){
if(this._onDeck&&this._onDeck[1]==_756){
this._onDeck=null;
}else{
if(this.aroundNode===_756){
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
_739.forEach(node.children,function(_757){
this._setAutoTextDir(_757);
},this);
},_setTextDirAttr:function(_758){
this._set("textDir",_758);
if(_758=="auto"){
this._setAutoTextDir(this.containerNode);
}else{
this.containerNode.dir=this.textDir;
}
}});
_744.showTooltip=function(_759,_75a,_75b,rtl,_75c){
if(_75b){
_75b=_739.map(_75b,function(val){
return {after:"after-centered",before:"before-centered"}[val]||val;
});
}
if(!_74a._masterTT){
_744._masterTT=_74a._masterTT=new _745();
}
return _74a._masterTT.show(_759,_75a,_75b,rtl,_75c);
};
_744.hideTooltip=function(_75d){
return _74a._masterTT&&_74a._masterTT.hide(_75d);
};
var _74a=_73a("dijit.Tooltip",_740,{label:"",showDelay:400,connectId:[],position:[],_setConnectIdAttr:function(_75e){
_739.forEach(this._connections||[],function(_75f){
_739.forEach(_75f,lang.hitch(this,"disconnect"));
},this);
this._connectIds=_739.filter(lang.isArrayLike(_75e)?_75e:(_75e?[_75e]:[]),function(id){
return dom.byId(id);
});
this._connections=_739.map(this._connectIds,function(id){
var node=dom.byId(id);
return [this.connect(node,"onmouseenter","_onHover"),this.connect(node,"onmouseleave","_onUnHover"),this.connect(node,"onfocus","_onHover"),this.connect(node,"onblur","_onUnHover")];
},this);
this._set("connectId",_75e);
},addTarget:function(node){
var id=node.id||node;
if(_739.indexOf(this._connectIds,id)==-1){
this.set("connectId",this._connectIds.concat(id));
}
},removeTarget:function(node){
var id=node.id||node,idx=_739.indexOf(this._connectIds,id);
if(idx>=0){
this._connectIds.splice(idx,1);
this.set("connectId",this._connectIds);
}
},buildRendering:function(){
this.inherited(arguments);
_73b.add(this.domNode,"dijitTooltipData");
},startup:function(){
this.inherited(arguments);
var ids=this.connectId;
_739.forEach(lang.isArrayLike(ids)?ids:[ids],this.addTarget,this);
},_onHover:function(e){
if(!this._showTimer){
var _760=e.target;
this._showTimer=setTimeout(lang.hitch(this,function(){
this.open(_760);
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
},open:function(_761){
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
_74a.show(this.label||this.domNode.innerHTML,_761,this.position,!this.isLeftToRight(),this.textDir);
this._connectNode=_761;
this.onShow(_761,this.position);
},close:function(){
if(this._connectNode){
_74a.hide(this._connectNode);
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
_74a._MasterTooltip=_745;
_74a.show=_744.showTooltip;
_74a.hide=_744.hideTooltip;
_74a.defaultPosition=["after-centered","before-centered"];
return _74a;
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
dojo.string.substitute=function(_762,map,_763,_764){
_764=_764||dojo.global;
_763=_763?lang.hitch(_764,_763):function(v){
return v;
};
return _762.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_765,key,_766){
var _767=lang.getObject(key,false,map);
if(_766){
_767=lang.getObject(_766,false,_764).call(_764,_767,key);
}
return _763(_767,key).toString();
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
},"url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>","curam/util/ui/refresh/RefreshEvent":function(){
define("curam/util/ui/refresh/RefreshEvent",[],function(){
var _768=dojo.declare("curam.util.ui.refresh.RefreshEvent",null,{TYPE_ONLOAD:"onload",TYPE_ONSUBMIT:"onsubmit",SOURCE_CONTEXT_MAIN:"main-content",SOURCE_CONTEXT_DIALOG:"dialog",SOURCE_CONTEXT_INLINE:"inline",_type:null,_context:null,constructor:function(type,_769){
if(!type||!_769){
throw "Required parameters missing.";
}
if(!(type==this.TYPE_ONLOAD||type==this.TYPE_ONSUBMIT)){
throw "Unknown type: "+type;
}
if(!(_769==this.SOURCE_CONTEXT_DIALOG||_769==this.SOURCE_CONTEXT_INLINE||_769==this.SOURCE_CONTEXT_MAIN)){
throw "Unknown context: "+_769;
}
this._type=type;
this._context=_769;
},equals:function(_76a){
if(typeof _76a!="object"){
return false;
}
if(_76a.declaredClass!=this.declaredClass){
return false;
}
return this._type===_76a._type&&this._context===_76a._context;
}});
return _768;
});
},"dijit/layout/AccordionPane":function(){
define("dijit/layout/AccordionPane",["dojo/_base/declare","dojo/_base/kernel","./ContentPane"],function(_76b,_76c,_76d){
return _76b("dijit.layout.AccordionPane",_76d,{constructor:function(){
_76c.deprecated("dijit.layout.AccordionPane deprecated, use ContentPane instead","","2.0");
},onSelected:function(){
}});
});
},"dijit/form/_FormValueMixin":function(){
define("dijit/form/_FormValueMixin",["dojo/_base/declare","dojo/dom-attr","dojo/keys","dojo/_base/sniff","./_FormWidgetMixin"],function(_76e,_76f,keys,has,_770){
return _76e("dijit.form._FormValueMixin",_770,{readOnly:false,_setReadOnlyAttr:function(_771){
_76f.set(this.focusNode,"readOnly",_771);
this._set("readOnly",_771);
},postCreate:function(){
this.inherited(arguments);
if(has("ie")){
this.connect(this.focusNode||this.domNode,"onkeydown",this._onKeyDown);
}
if(this._resetValue===undefined){
this._lastValueReported=this._resetValue=this.value;
}
},_setValueAttr:function(_772,_773){
this._handleOnChange(_772,_773);
},_handleOnChange:function(_774,_775){
this._set("value",_774);
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
},"dojox/layout/ContentPane":function(){
define("dojox/layout/ContentPane",["dojo/_base/lang","dojo/_base/xhr","dijit/layout/ContentPane","dojox/html/_base","dojo/_base/declare"],function(lang,_776,_777,_778,_779){
return _779("dojox.layout.ContentPane",_777,{adjustPaths:false,cleanContent:false,renderStyles:false,executeScripts:true,scriptHasHooks:false,constructor:function(){
this.ioArgs={};
this.ioMethod=_776.get;
},onExecError:function(e){
},_setContent:function(cont){
var _77a=this._contentSetter;
if(!(_77a&&_77a instanceof _778._ContentSetter)){
_77a=this._contentSetter=new _778._ContentSetter({node:this.containerNode,_onError:lang.hitch(this,this._onError),onContentError:lang.hitch(this,function(e){
var _77b=this.onContentError(e);
try{
this.containerNode.innerHTML=_77b;
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
},"dijit/form/DropDownButton":function(){
require({cache:{"url:dijit/form/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n"}});
define("dijit/form/DropDownButton",["dojo/_base/declare","dojo/_base/lang","dojo/query","../registry","../popup","./Button","../_Container","../_HasDropDown","dojo/text!./templates/DropDownButton.html"],function(_77c,lang,_77d,_77e,_77f,_780,_781,_782,_783){
return _77c("dijit.form.DropDownButton",[_780,_781,_782],{baseClass:"dijitDropDownButton",templateString:_783,_fillContent:function(){
if(this.srcNodeRef){
var _784=_77d("*",this.srcNodeRef);
this.inherited(arguments,[_784[0]]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
if(!this.dropDown&&this.dropDownContainer){
var _785=_77d("[widgetId]",this.dropDownContainer)[0];
this.dropDown=_77e.byNode(_785);
delete this.dropDownContainer;
}
if(this.dropDown){
_77f.hide(this.dropDown);
}
this.inherited(arguments);
},isLoaded:function(){
var _786=this.dropDown;
return (!!_786&&(!_786.href||_786.isLoaded));
},loadDropDown:function(_787){
var _788=this.dropDown;
var _789=_788.on("load",lang.hitch(this,function(){
_789.remove();
_787();
}));
_788.refresh();
},isFocusable:function(){
return this.inherited(arguments)&&!this._mouseDown;
}});
});
},"dijit/form/_FormWidgetMixin":function(){
define("dijit/form/_FormWidgetMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-style","dojo/_base/lang","dojo/mouse","dojo/_base/sniff","dojo/_base/window","dojo/window","../a11y"],function(_78a,_78b,_78c,_78d,lang,_78e,has,win,_78f,a11y){
return _78b("dijit.form._FormWidgetMixin",null,{name:"",alt:"",value:"",type:"text",tabIndex:"0",_setTabIndexAttr:"focusNode",disabled:false,intermediateChanges:false,scrollOnFocus:true,_setIdAttr:"focusNode",_setDisabledAttr:function(_790){
this._set("disabled",_790);
_78c.set(this.focusNode,"disabled",_790);
if(this.valueNode){
_78c.set(this.valueNode,"disabled",_790);
}
this.focusNode.setAttribute("aria-disabled",_790?"true":"false");
if(_790){
this._set("hovering",false);
this._set("active",false);
var _791="tabIndex" in this.attributeMap?this.attributeMap.tabIndex:("_setTabIndexAttr" in this)?this._setTabIndexAttr:"focusNode";
_78a.forEach(lang.isArray(_791)?_791:[_791],function(_792){
var node=this[_792];
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
var _793=this.connect(this.focusNode,"onfocus",function(){
this.disconnect(_794);
this.disconnect(_793);
});
var _794=this.connect(win.body(),"onmouseup",function(){
this.disconnect(_794);
this.disconnect(_793);
if(this.focused){
this.focus();
}
});
}
if(this.scrollOnFocus){
this.defer(function(){
_78f.scrollIntoView(this.domNode);
});
}
this.inherited(arguments);
},isFocusable:function(){
return !this.disabled&&this.focusNode&&(_78d.get(this.domNode,"display")!="none");
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
},_onChangeActive:false,_handleOnChange:function(_795,_796){
if(this._lastValueReported==undefined&&(_796===null||!this._onChangeActive)){
this._resetValue=this._lastValueReported=_795;
}
this._pendingOnChange=this._pendingOnChange||(typeof _795!=typeof this._lastValueReported)||(this.compare(_795,this._lastValueReported)!=0);
if((this.intermediateChanges||_796||_796===undefined)&&this._pendingOnChange){
this._lastValueReported=_795;
this._pendingOnChange=false;
if(this._onChangeActive){
if(this._onChangeHandle){
this._onChangeHandle.remove();
}
this._onChangeHandle=this.defer(function(){
this._onChangeHandle=null;
this.onChange(_795);
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
},"dojo/date":function(){
define("dojo/date",["./_base/kernel","./_base/lang"],function(dojo,lang){
lang.getObject("date",true,dojo);
dojo.date.getDaysInMonth=function(_797){
var _798=_797.getMonth();
var days=[31,28,31,30,31,30,31,31,30,31,30,31];
if(_798==1&&dojo.date.isLeapYear(_797)){
return 29;
}
return days[_798];
};
dojo.date.isLeapYear=function(_799){
var year=_799.getFullYear();
return !(year%400)||(!(year%4)&&!!(year%100));
};
dojo.date.getTimezoneName=function(_79a){
var str=_79a.toString();
var tz="";
var _79b;
var pos=str.indexOf("(");
if(pos>-1){
tz=str.substring(++pos,str.indexOf(")"));
}else{
var pat=/([A-Z\/]+) \d{4}$/;
if((_79b=str.match(pat))){
tz=_79b[1];
}else{
str=_79a.toLocaleString();
pat=/ ([A-Z\/]+)$/;
if((_79b=str.match(pat))){
tz=_79b[1];
}
}
}
return (tz=="AM"||tz=="PM")?"":tz;
};
dojo.date.compare=function(_79c,_79d,_79e){
_79c=new Date(+_79c);
_79d=new Date(+(_79d||new Date()));
if(_79e=="date"){
_79c.setHours(0,0,0,0);
_79d.setHours(0,0,0,0);
}else{
if(_79e=="time"){
_79c.setFullYear(0,0,0);
_79d.setFullYear(0,0,0);
}
}
if(_79c>_79d){
return 1;
}
if(_79c<_79d){
return -1;
}
return 0;
};
dojo.date.add=function(date,_79f,_7a0){
var sum=new Date(+date);
var _7a1=false;
var _7a2="Date";
switch(_79f){
case "day":
break;
case "weekday":
var days,_7a3;
var mod=_7a0%5;
if(!mod){
days=(_7a0>0)?5:-5;
_7a3=(_7a0>0)?((_7a0-5)/5):((_7a0+5)/5);
}else{
days=mod;
_7a3=parseInt(_7a0/5);
}
var strt=date.getDay();
var adj=0;
if(strt==6&&_7a0>0){
adj=1;
}else{
if(strt==0&&_7a0<0){
adj=-1;
}
}
var trgt=strt+days;
if(trgt==0||trgt==6){
adj=(_7a0>0)?2:-2;
}
_7a0=(7*_7a3)+days+adj;
break;
case "year":
_7a2="FullYear";
_7a1=true;
break;
case "week":
_7a0*=7;
break;
case "quarter":
_7a0*=3;
case "month":
_7a1=true;
_7a2="Month";
break;
default:
_7a2="UTC"+_79f.charAt(0).toUpperCase()+_79f.substring(1)+"s";
}
if(_7a2){
sum["set"+_7a2](sum["get"+_7a2]()+_7a0);
}
if(_7a1&&(sum.getDate()<date.getDate())){
sum.setDate(0);
}
return sum;
};
dojo.date.difference=function(_7a4,_7a5,_7a6){
_7a5=_7a5||new Date();
_7a6=_7a6||"day";
var _7a7=_7a5.getFullYear()-_7a4.getFullYear();
var _7a8=1;
switch(_7a6){
case "quarter":
var m1=_7a4.getMonth();
var m2=_7a5.getMonth();
var q1=Math.floor(m1/3)+1;
var q2=Math.floor(m2/3)+1;
q2+=(_7a7*4);
_7a8=q2-q1;
break;
case "weekday":
var days=Math.round(dojo.date.difference(_7a4,_7a5,"day"));
var _7a9=parseInt(dojo.date.difference(_7a4,_7a5,"week"));
var mod=days%7;
if(mod==0){
days=_7a9*5;
}else{
var adj=0;
var aDay=_7a4.getDay();
var bDay=_7a5.getDay();
_7a9=parseInt(days/7);
mod=days%7;
var _7aa=new Date(_7a4);
_7aa.setDate(_7aa.getDate()+(_7a9*7));
var _7ab=_7aa.getDay();
if(days>0){
switch(true){
case aDay==6:
adj=-1;
break;
case aDay==0:
adj=0;
break;
case bDay==6:
adj=-1;
break;
case bDay==0:
adj=-2;
break;
case (_7ab+mod)>5:
adj=-2;
}
}else{
if(days<0){
switch(true){
case aDay==6:
adj=0;
break;
case aDay==0:
adj=1;
break;
case bDay==6:
adj=2;
break;
case bDay==0:
adj=1;
break;
case (_7ab+mod)<0:
adj=2;
}
}
}
days+=adj;
days-=(_7a9*2);
}
_7a8=days;
break;
case "year":
_7a8=_7a7;
break;
case "month":
_7a8=(_7a5.getMonth()-_7a4.getMonth())+(_7a7*12);
break;
case "week":
_7a8=parseInt(dojo.date.difference(_7a4,_7a5,"day")/7);
break;
case "day":
_7a8/=24;
case "hour":
_7a8/=60;
case "minute":
_7a8/=60;
case "second":
_7a8/=1000;
case "millisecond":
_7a8*=_7a5.getTime()-_7a4.getTime();
}
return Math.round(_7a8);
};
return dojo.date;
});
},"curam/widget/TransferList":function(){
define("curam/widget/TransferList",["dijit/_Widget","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _7ac=new curam.util.ResourceBundle("Debug");
var _7ad=dojo.declare("curam.widget.TransferList",dijit._Widget,{btnNames:["allRight","toRight","toLeft","allLeft"],btnValues:[" "," "," "," "],bntClasses:["allRight","toRight","toLeft","allLeft"],rightEmptyText:"",widgetType:"TransferList",postCreate:function(){
var _7ae=this.domNode.parentNode;
dojo.addClass(_7ae,"transferlistparent");
var _7af=cm.nextSibling(this.domNode);
this.leftList=this.domNode;
var _7b0=dojo.create("table",{"class":"transfer-list"});
var _7b1=dojo.create("tbody",{},_7b0);
var _7b2=dojo.create("tr",{},_7b1);
var _7b3=dojo.create("td");
var _7b4=dojo.create("td",{"class":"controls"});
var self=this;
function _7b5(name){
return function(){
self.setSelection(name);
return false;
};
};
function _7b6(id){
return function(){
dojo.addClass(dojo.byId(id),"active");
return false;
};
};
function _7b7(id){
return function(){
dojo.removeClass(dojo.byId(id),"active");
return false;
};
};
for(j=0;j<4;j++){
var _7b8=dojo.create("div",{},_7b4);
var _7b9=new Array(LOCALISED_TRANSFER_LIST_RA,LOCALISED_TRANSFER_LIST_R,LOCALISED_TRANSFER_LIST_L,LOCALISED_TRANSFER_LIST_LA);
var btn=dojo.create("input",{type:"button",id:this.btnNames[j]+this.domNode.name,value:this.btnValues[j],"class":this.bntClasses[j],"title":_7b9[j]},_7b8);
btn.listtwins=this;
dojo.connect(btn,"onclick",_7b5(btn.id));
dojo.connect(btn,"onmousedown",_7b6(btn.id));
dojo.connect(btn,"onmouseup",_7b7(btn.id));
dojo.connect(btn,"onmouseout",_7b7(btn.id));
}
var _7ba=document.createElement("td");
var _7bb=dojo.create("select",{id:this.domNode.name,name:this.domNode.name,multiple:"multiple","class":"selected",size:5},_7ba);
dojo.attr(this.domNode,{name:"__o3ign."+_7bb.name,id:"__o3ign."+_7bb.name,"class":"selected",size:5});
this.rightList=_7bb;
dojo.connect(this.leftList,"ondblclick",_7b5("toRight"));
dojo.connect(this.rightList,"ondblclick",_7b5("toLeft"));
function _7bc(name){
return function(evt){
if(evt.keyCode==evt.KEY_ENTER){
self.setSelection(name);
}
return false;
};
};
dojo.connect(this.leftList,"onkeydown",_7bc("toRight"));
dojo.connect(this.rightList,"onkeydown",_7bc("toLeft"));
_7b3.appendChild(this.domNode);
_7b2.appendChild(_7b3);
_7b2.appendChild(_7b4);
_7b2.appendChild(_7ba);
if(_7af){
_7ae.insertBefore(_7b0,_7af);
}else{
_7ae.appendChild(_7b0);
}
this.setInitialSelection();
this.adjustEmpties(this.leftList,this.rightList);
var form=cm.getParentByType(this.domNode,"form");
if(!form){
curam.debug.log("curam.widget.TransferList "+_7ac.getProperty("curam.widget.TransferList.msg"));
return;
}
dojo.connect(form,"onsubmit",function(){
var _7bd=self.rightList;
var _7be=new Array();
for(k1=0;k1<_7bd.options.length;k1++){
_7be[_7be.length]=_7bd.options[k1];
}
_7bd.options.length=0;
for(k2=0;k2<_7be.length;k2++){
_7be[k2].selected=true;
_7bd.appendChild(_7be[k2]);
}
});
dojo.connect(window,"onresize",this.selectWidthSetting);
dojo.addOnLoad(this.selectWidthSetting);
},setSelection:function(id){
var _7bf=(id.indexOf("all")>-1);
var _7c0=(id.indexOf("Right")>-1)?this.leftList:this.rightList;
var _7c1=(id.indexOf("Left")>-1)?this.leftList:this.rightList;
if(_7c0.options[0]!=null&&_7c0.options[0].text!=this.rightEmptyText){
if(_7c1.options[0]!=null&&(_7c1.options[0].text==this.rightEmptyText||_7c1.options[0].text=="")){
_7c1.options[0]=null;
}
this.transferOptions(_7c0,_7c1,_7bf);
this.adjustEmpties(this.leftList,this.rightList);
}
},setInitialSelection:function(){
this.transferOptions(this.leftList,this.rightList,false);
},adjustEmpties:function(_7c2,_7c3){
if(_7c3.options.length==0){
_7c3.options[0]=new Option(this.rightEmptyText,"",false,false);
}
},transferOptions:function(_7c4,_7c5,_7c6){
if(_7c4&&_7c5){
var _7c7=new Array();
dojo.forEach(_7c4.options,function(opt){
if(_7c6||opt.selected){
_7c7[_7c7.length]=opt;
}
});
this.appendAll(_7c5,_7c7);
}
},appendAll:function(_7c8,_7c9){
for(var i=0;i<_7c9.length;i++){
_7c9[i].selected=true;
_7c8.appendChild(_7c9[i]);
}
},selectWidthSetting:function(){
if(dojo.query(".transfer-list select.selected")){
dojo.query(".transfer-list select.selected").forEach(function(_7ca){
var _7cb=_7ca.parentNode.clientWidth;
_7ca.style.width=_7cb+"px";
});
}
}});
return _7ad;
});
},"curam/date":function(){
define("curam/date",["curam/define","dojo/date","curam/date/locale","dojo/date/stamp"],function(def,date,loc,_7cc){
curam.define.singleton("curam.date",{testLocale:null,isDate:function(str,fmt){
return (curam.date.getDateFromFormat(str,fmt)!=0);
},compareDates:function(d1,df1,d2,df2){
var d1=curam.date.getDateFromFormat(d1,df1);
if(d1==0){
return -1;
}
var d2=curam.date.getDateFromFormat(d2,df2);
if(d2==0){
return -1;
}
return date.compare(d1,d2,"date");
},formatDate:function(d,fmt){
var _7cd=loc.format(d,{selector:"date",datePattern:fmt,locale:curam.date.getLocale()});
return _7cd;
},getDateFromFormat:function(str,fmt){
var res=loc.parse(str,{selector:"date",datePattern:fmt,locale:curam.date.getLocale()});
return (res==null)?"0":res;
},ISO8601StringToDate:function(val){
return _7cc.fromISOString(val);
},getLocale:function(){
var _7ce=(typeof jsL!="undefined"&&jsL)?jsL:(curam.config?curam.config.locale:null);
return _7ce||curam.date.testLocale||"en";
}});
return curam.date;
});
},"dijit/layout/_ContentPaneResizeMixin":function(){
define("dijit/layout/_ContentPaneResizeMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/_base/lang","dojo/query","dojo/_base/sniff","dojo/_base/window","../registry","./utils","../_Contained"],function(_7cf,_7d0,_7d1,_7d2,_7d3,lang,_7d4,has,win,_7d5,_7d6,_7d7){
return _7d0("dijit.layout._ContentPaneResizeMixin",null,{doLayout:true,isLayoutContainer:true,startup:function(){
if(this._started){
return;
}
var _7d8=this.getParent();
this._childOfLayoutWidget=_7d8&&_7d8.isLayoutContainer;
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
var _7d9=_7d4("> *",this.containerNode).filter(function(node){
return node.tagName!=="SCRIPT";
}),_7da=_7d9.filter(function(node){
return _7d1.has(node,"data-dojo-type")||_7d1.has(node,"dojoType")||_7d1.has(node,"widgetId");
}),_7db=_7cf.filter(_7da.map(_7d5.byNode),function(_7dc){
return _7dc&&_7dc.domNode&&_7dc.resize;
});
if(_7d9.length==_7da.length&&_7db.length==1){
this._singleChild=_7db[0];
}else{
delete this._singleChild;
}
_7d2.toggle(this.containerNode,this.baseClass+"SingleChild",!!this._singleChild);
},resize:function(_7dd,_7de){
if(!this._wasShown&&this.open!==false){
this._onShow();
}
this._resizeCalled=true;
this._scheduleLayout(_7dd,_7de);
},_scheduleLayout:function(_7df,_7e0){
if(this._isShown()){
this._layout(_7df,_7e0);
}else{
this._needLayout=true;
this._changeSize=_7df;
this._resultSize=_7e0;
}
},_layout:function(_7e1,_7e2){
if(_7e1){
_7d3.setMarginBox(this.domNode,_7e1);
}
var cn=this.containerNode;
if(cn===this.domNode){
var mb=_7e2||{};
lang.mixin(mb,_7e1||{});
if(!("h" in mb)||!("w" in mb)){
mb=lang.mixin(_7d3.getMarginBox(cn),mb);
}
this._contentBox=_7d6.marginBox2contentBox(cn,mb);
}else{
this._contentBox=_7d3.getContentBox(cn);
}
this._layoutChildren();
delete this._needLayout;
},_layoutChildren:function(){
if(this.doLayout){
this._checkIfSingleChild();
}
if(this._singleChild&&this._singleChild.resize){
var cb=this._contentBox||_7d3.getContentBox(this.containerNode);
this._singleChild.resize({w:cb.w,h:cb.h});
}else{
_7cf.forEach(this.getChildren(),function(_7e3){
if(_7e3.resize){
_7e3.resize();
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
var node=this.domNode,_7e4=this.domNode.parentNode;
return (node.style.display!="none")&&(node.style.visibility!="hidden")&&!_7d2.contains(node,"dijitHidden")&&_7e4&&_7e4.style&&(_7e4.style.display!="none");
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
},"curam/matrix/Constants":function(){
define("curam/matrix/Constants",["curam/define"],function(){
curam.define.singleton("curam.matrix.Constants",{ANSWER_TYPE_CODETABLE:"codetable",ANSWER_TYPE_NUMERIC:"numeric",ANSWER_TYPE_BOOLEAN:"boolean",ANSWER_TYPE_STRING:"string",SPECIFIC_VALUE:"specificvalue",MIN_MAX:"minmax",MATRIX_BORDER_SIZE:1,COMBINATION_CELL_WIDTH:22,columnLetters:new Array("C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"),container:null});
return curam.matrix.Constants;
});
},"dojo/dnd/Moveable":function(){
define("dojo/dnd/Moveable",["../main","../Evented","../touch","./Mover"],function(dojo,_7e5,_7e6){
dojo.declare("dojo.dnd.Moveable",[_7e5],{handle:"",delay:0,skip:false,constructor:function(node,_7e7){
this.node=dojo.byId(node);
if(!_7e7){
_7e7={};
}
this.handle=_7e7.handle?dojo.byId(_7e7.handle):null;
if(!this.handle){
this.handle=this.node;
}
this.delay=_7e7.delay>0?_7e7.delay:0;
this.skip=_7e7.skip;
this.mover=_7e7.mover?_7e7.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,_7e6.press,this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")];
},markupFactory:function(_7e8,node,ctor){
return new ctor(node,_7e8);
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null;
},onMouseDown:function(e){
if(this.skip&&dojo.dnd.isFormElement(e)){
return;
}
if(this.delay){
this.events.push(dojo.connect(this.handle,_7e6.move,this,"onMouseMove"),dojo.connect(this.handle,_7e6.release,this,"onMouseUp"));
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
},onMoveStart:function(_7e9){
dojo.publish("/dnd/move/start",[_7e9]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem");
},onMoveStop:function(_7ea){
dojo.publish("/dnd/move/stop",[_7ea]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem");
},onFirstMove:function(_7eb,e){
},onMove:function(_7ec,_7ed,e){
this.onMoving(_7ec,_7ed);
var s=_7ec.node.style;
s.left=_7ed.l+"px";
s.top=_7ed.t+"px";
this.onMoved(_7ec,_7ed);
},onMoving:function(_7ee,_7ef){
},onMoved:function(_7f0,_7f1){
}});
return dojo.dnd.Moveable;
});
},"dijit/TooltipDialog":function(){
require({cache:{"url:dijit/templates/TooltipDialog.html":"<div role=\"presentation\" tabIndex=\"-1\">\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" data-dojo-attach-point=\"containerNode\" role=\"dialog\"></div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\"></div>\n</div>\n"}});
define("dijit/TooltipDialog",["dojo/_base/declare","dojo/dom-class","dojo/_base/event","dojo/keys","dojo/_base/lang","./focus","./layout/ContentPane","./_DialogMixin","./form/_FormMixin","./_TemplatedMixin","dojo/text!./templates/TooltipDialog.html","."],function(_7f2,_7f3,_7f4,keys,lang,_7f5,_7f6,_7f7,_7f8,_7f9,_7fa,_7fb){
return _7f2("dijit.TooltipDialog",[_7f6,_7f9,_7f8,_7f7],{title:"",doLayout:false,autofocus:true,baseClass:"dijitTooltipDialog",_firstFocusItem:null,_lastFocusItem:null,templateString:_7fa,_setTitleAttr:function(_7fc){
this.containerNode.title=_7fc;
this._set("title",_7fc);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
},orient:function(node,_7fd,_7fe){
var newC="dijitTooltipAB"+(_7fe.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(_7fe.charAt(0)=="T"?"Below":"Above");
_7f3.replace(this.domNode,newC,this._currentOrientClass||"");
this._currentOrientClass=newC;
},focus:function(){
this._getFocusItems(this.containerNode);
_7f5.focus(this._firstFocusItem);
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
var _7ff=(this._firstFocusItem==this._lastFocusItem);
if(evt.charOrCode==keys.ESCAPE){
setTimeout(lang.hitch(this,"onCancel"),0);
_7f4.stop(evt);
}else{
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===keys.TAB){
if(!_7ff){
_7f5.focus(this._lastFocusItem);
}
_7f4.stop(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===keys.TAB&&!evt.shiftKey){
if(!_7ff){
_7f5.focus(this._firstFocusItem);
}
_7f4.stop(evt);
}else{
if(evt.charOrCode===keys.TAB){
evt.stopPropagation();
}
}
}
}
}});
});
},"dojo/store/util/SimpleQueryEngine":function(){
define("dojo/store/util/SimpleQueryEngine",["../../_base/array"],function(_800){
return function(_801,_802){
switch(typeof _801){
default:
throw new Error("Can not query with a "+typeof _801);
case "object":
case "undefined":
var _803=_801;
_801=function(_804){
for(var key in _803){
var _805=_803[key];
if(_805&&_805.test){
if(!_805.test(_804[key])){
return false;
}
}else{
if(_805!=_804[key]){
return false;
}
}
}
return true;
};
break;
case "string":
if(!this[_801]){
throw new Error("No filter function "+_801+" was found in store");
}
_801=this[_801];
case "function":
}
function _806(_807){
var _808=_800.filter(_807,_801);
if(_802&&_802.sort){
_808.sort(function(a,b){
for(var sort,i=0;sort=_802.sort[i];i++){
var _809=a[sort.attribute];
var _80a=b[sort.attribute];
if(_809!=_80a){
return !!sort.descending==_809>_80a?-1:1;
}
}
return 0;
});
}
if(_802&&(_802.start||_802.count)){
var _80b=_808.length;
_808=_808.slice(_802.start||0,(_802.start||0)+(_802.count||Infinity));
_808.total=_80b;
}
return _808;
};
_806.matches=_801;
return _806;
};
});
},"dijit/MenuItem":function(){
require({cache:{"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n"}});
define("dijit/MenuItem",["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/event","dojo/_base/kernel","dojo/_base/sniff","./_Widget","./_TemplatedMixin","./_Contained","./_CssStateMixin","dojo/text!./templates/MenuItem.html"],function(_80c,dom,_80d,_80e,_80f,_810,has,_811,_812,_813,_814,_815){
return _80c("dijit.MenuItem",[_811,_812,_813,_814],{templateString:_815,baseClass:"dijitMenuItem",label:"",_setLabelAttr:{node:"containerNode",type:"innerHTML"},iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},accelKey:"",disabled:false,_fillContent:function(_816){
if(_816&&!("label" in this.params)){
this.set("label",_816.innerHTML);
}
},buildRendering:function(){
this.inherited(arguments);
var _817=this.id+"_text";
_80d.set(this.containerNode,"id",_817);
if(this.accelKeyNode){
_80d.set(this.accelKeyNode,"id",this.id+"_accel");
_817+=" "+this.id+"_accel";
}
this.domNode.setAttribute("aria-labelledby",_817);
dom.setSelectable(this.domNode,false);
},_onHover:function(){
this.getParent().onItemHover(this);
},_onUnhover:function(){
this.getParent().onItemUnhover(this);
this._set("hovering",false);
},_onClick:function(evt){
this.getParent().onItemClick(this,evt);
_80f.stop(evt);
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
},_setSelected:function(_818){
_80e.toggle(this.domNode,"dijitMenuItemSelected",_818);
},setLabel:function(_819){
_810.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_819);
},setDisabled:function(_81a){
_810.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_81a);
},_setDisabledAttr:function(_81b){
this.focusNode.setAttribute("aria-disabled",_81b?"true":"false");
this._set("disabled",_81b);
},_setAccelKeyAttr:function(_81c){
this.accelKeyNode.style.display=_81c?"":"none";
this.accelKeyNode.innerHTML=_81c;
_80d.set(this.containerNode,"colSpan",_81c?"1":"2");
this._set("accelKey",_81c);
}});
});
},"dijit/layout/TabController":function(){
require({cache:{"url:dijit/layout/templates/_TabButton.html":"<div role=\"presentation\" data-dojo-attach-point=\"titleNode\" data-dojo-attach-event='onclick:onClick'>\n    <div role=\"presentation\" class='dijitTabInnerDiv' data-dojo-attach-point='innerDiv'>\n        <div role=\"presentation\" class='dijitTabContent' data-dojo-attach-point='tabContent'>\n        \t<div role=\"presentation\" data-dojo-attach-point='focusNode'>\n\t\t        <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" data-dojo-attach-point='iconNode' />\n\t\t        <span data-dojo-attach-point='containerNode' class='tabLabel'></span>\n\t\t        <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\n\t\t        \t\tdata-dojo-attach-event='onclick: onClickCloseButton' role=\"presentation\">\n\t\t            <span data-dojo-attach-point='closeText' class='dijitTabCloseText'>[x]</span\n\t\t        ></span>\n\t\t\t</div>\n        </div>\n    </div>\n</div>\n"}});
define("dijit/layout/TabController",["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/i18n","dojo/_base/lang","./StackController","../Menu","../MenuItem","dojo/text!./templates/_TabButton.html","dojo/i18n!../nls/common"],function(_81d,dom,_81e,_81f,i18n,lang,_820,Menu,_821,_822){
var _823=_81d("dijit.layout._TabButton",_820.StackButton,{baseClass:"dijitTab",cssStateNodes:{closeNode:"dijitTabCloseButton"},templateString:_822,scrollOnFocus:false,buildRendering:function(){
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
_81f.toggle(this.innerDiv,"dijitClosable",disp);
this.closeNode.style.display=disp?"":"none";
if(disp){
var _824=i18n.getLocalization("dijit","common");
if(this.closeNode){
_81e.set(this.closeNode,"title",_824.itemClose);
}
this._closeMenu=new Menu({id:this.id+"_Menu",dir:this.dir,lang:this.lang,textDir:this.textDir,targetNodeIds:[this.domNode]});
this._closeMenu.addChild(new _821({label:_824.itemClose,dir:this.dir,lang:this.lang,textDir:this.textDir,onClick:lang.hitch(this,"onClickCloseButton")}));
}else{
if(this._closeMenu){
this._closeMenu.destroyRecursive();
delete this._closeMenu;
}
}
},_setLabelAttr:function(_825){
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
var _826=_81d("dijit.layout.TabController",_820,{baseClass:"dijitTabController",templateString:"<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'></div>",tabPosition:"top",buttonWidget:"curam.widget._TabButton",startup:function(){
this.inherited(arguments);
this.connect(this,"onAddChild",function(page,_827){
var _828=this;
page.controlButton._curamPageId=page.id;
page.controlButton.connect(page.controlButton,"_setCuramVisibleAttr",function(){
if(page.controlButton.curamVisible){
var _829=dojo.map(_828.getChildren(),function(btn){
return btn._curamPageId;
});
var _82a=curam.tab.getTabWidgetId(curam.tab.getContainerTab(page.domNode));
var _82b=curam.util.TabNavigation.getInsertIndex(_82a,_829,page.id);
_828.addChild(page.controlButton,_82b);
}else{
var _82c=page.controlButton;
if(dojo.indexOf(_828.getChildren(),_82c)!=-1){
_828.removeChild(_82c);
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
var _82d=0;
for(var pane in this.pane2button){
var ow=this.pane2button[pane].innerDiv.scrollWidth;
_82d=Math.max(_82d,ow);
}
for(pane in this.pane2button){
this.pane2button[pane].innerDiv.style.width=_82d+"px";
}
},onButtonClick:function(page){
if(!page.controlButton.get("curamDisabled")){
var _82e=dijit.byId(this.containerId);
_82e.selectChild(page);
}
}});
_826.TabButton=_823;
return _826;
});
},"dijit/MenuBarItem":function(){
require({cache:{"url:dijit/templates/MenuBarItem.html":"<div class=\"dijitReset dijitInline dijitMenuItem dijitMenuItemLabel\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<span data-dojo-attach-point=\"containerNode\"></span>\n</div>\n"}});
define("dijit/MenuBarItem",["dojo/_base/declare","./MenuItem","dojo/text!./templates/MenuBarItem.html"],function(_82f,_830,_831){
var _832=_82f("dijit._MenuBarItemMixin",null,{templateString:_831,_setIconClassAttr:null});
var _833=_82f("dijit.MenuBarItem",[_830,_832],{});
_833._MenuBarItemMixin=_832;
return _833;
});
},"dojo/cldr/supplemental":function(){
define("dojo/cldr/supplemental",["../_base/kernel","../_base/lang","../i18n"],function(dojo,lang){
lang.getObject("cldr.supplemental",true,dojo);
dojo.cldr.supplemental.getFirstDayOfWeek=function(_834){
var _835={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,sy:6,tn:6,ye:6,ar:0,as:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,il:0,"in":0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mn:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,zw:0};
var _836=dojo.cldr.supplemental._region(_834);
var dow=_835[_836];
return (dow===undefined)?1:dow;
};
dojo.cldr.supplemental._region=function(_837){
_837=dojo.i18n.normalizeLocale(_837);
var tags=_837.split("-");
var _838=tags[1];
if(!_838){
_838={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",he:"il",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[tags[0]];
}else{
if(_838.length==4){
_838=tags[2];
}
}
return _838;
};
dojo.cldr.supplemental.getWeekend=function(_839){
var _83a={"in":0,af:4,dz:4,ir:4,om:4,sa:4,ye:4,ae:5,bh:5,eg:5,il:5,iq:5,jo:5,kw:5,ly:5,ma:5,qa:5,sd:5,sy:5,tn:5};
var _83b={af:5,dz:5,ir:5,om:5,sa:5,ye:5,ae:6,bh:5,eg:6,il:6,iq:6,jo:6,kw:6,ly:6,ma:6,qa:6,sd:6,sy:6,tn:6};
var _83c=dojo.cldr.supplemental._region(_839);
var _83d=_83a[_83c];
var end=_83b[_83c];
if(_83d===undefined){
_83d=6;
}
if(end===undefined){
end=0;
}
return {start:_83d,end:end};
};
return dojo.cldr.supplemental;
});
},"dijit/MenuBar":function(){
require({cache:{"url:dijit/templates/MenuBar.html":"<div class=\"dijitMenuBar dijitMenuPassive\" data-dojo-attach-point=\"containerNode\"  role=\"menubar\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress: _onKeyPress\"></div>\n"}});
define("dijit/MenuBar",["dojo/_base/declare","dojo/_base/event","dojo/keys","./_MenuBase","dojo/text!./templates/MenuBar.html"],function(_83e,_83f,keys,_840,_841){
return _83e("dijit.MenuBar",_840,{templateString:_841,baseClass:"dijitMenuBar",_isMenuBar:true,postCreate:function(){
var l=this.isLeftToRight();
this.connectKeyNavHandlers(l?[keys.LEFT_ARROW]:[keys.RIGHT_ARROW],l?[keys.RIGHT_ARROW]:[keys.LEFT_ARROW]);
this._orient=["below"];
},focusChild:function(item){
var _842=this.focusedChild,_843=_842&&_842.popup&&_842.popup.isShowingNow;
this.inherited(arguments);
if(_843&&item.popup&&!item.disabled){
this._openPopup();
}
},_onKeyPress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
switch(evt.charOrCode){
case keys.DOWN_ARROW:
this._moveToPopup(evt);
_83f.stop(evt);
}
},onItemClick:function(item,evt){
if(item.popup&&item.popup.isShowingNow){
item.popup.onCancel();
}else{
this.inherited(arguments);
}
}});
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
},publishSmartPanelExpListPageLoad:function(_844){
if(ct.getSmartPanelIframe()){
cu.getTopmostWindow().dojo.publish("expandedList.pageLoaded",[_844.contentWindow.location.href]);
}
},setupOnLoad:function(_845,_846){
curam.debug.log("curam.contenPanel: setupOnLoad: "+_845+" "+_846);
curam.contentPanel.initSmartPanelExpListPageLoadListener();
var _847=curam.contentPanel.iframeOnloadHandler;
cu.onLoad.addSubscriber(_845,_847);
curam.contentPanel.targetSmartPanel(_845,_846);
ct.executeOnTabClose(function(){
cu.onLoad.removeSubscriber(_845,_847);
},_846);
},iframeOnloadHandler:function(_848,_849){
var _84a=ct.getContainerTab(dojo.query("iframe."+_848)[0]);
var _84b=ct.getTabWidgetId(_84a);
var _84c=dojo.byId(_848);
var _84d=_84c.contentWindow.document.title;
if(_84d==""){
var _84e=curam.util.iframeTitleFallBack();
_84c.contentWindow.document.title=_84e;
}
dojo.attr(_84c,"title",CONTENT_PANEL_TITLE+" - "+curam.util.iframeTitleFallBack());
dojo.attr(_84c,"data-done-loading",true);
cu.Refresh.getController(_84b).pageLoaded(_849.pageID,cu.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN);
dojo.publish("/curam/main-content/page/loaded",[_849.pageID,_84b]);
},spOnLoadHandler:function(_84f,_850){
var _851=dojo.query("."+_84f)[0];
curam.contentPanel.checkSmartPanelLoaded(_851.src,"TabContentArea.Reloaded");
},checkSmartPanelLoaded:function(url,_852){
var _853=ct.getSmartPanelIframe();
var _854=dojo.attr(_853,"iframeLoaded");
if(_854=="true"){
curam.contentPanel.smartPanelPublisher(_853,url,_852);
}else{
var _855=curam.tab.getContainerTab(_853);
var _856=curam.tab.getTabWidgetId(_855);
var _857=dojo.subscribe("smartPanel.loaded",function(_858){
if(_858!=_853){
return;
}
curam.contentPanel.smartPanelPublisher(_853,url,_852);
});
curam.tab.unsubscribeOnTabClose(_857,_856);
}
},smartPanelPublisher:function(_859,url,_85a){
var _85b=new curam.ui.PageRequest(url);
_859.contentWindow.dojo.publish("contentPane.targetSmartPanel",[{"eventType":_85a,"pageId":_85b.pageID,"parameters":_85b.parameters}]);
},targetSmartPanel:function(_85c,_85d){
curam.debug.log("curam.contentPanel:targetSmartPanel(): "+_85c+" "+_85d);
var _85e=ct.getSmartPanelIframe();
var _85f=_85d;
if(_85e){
var spId=curam.util.onLoad.defaultGetIdFunction(_85e);
var _860=dojo.subscribe("expandedList.toggle",function(_861,_862,_863){
if(_85f===_863){
curam.contentPanel.checkSmartPanelLoaded(_862.url,_862.eventType);
}
});
var _864=curam.contentPanel.spOnLoadHandler;
cu.onLoad.addSubscriber(_85c,_864);
ct.executeOnTabClose(function(){
dojo.unsubscribe(_860);
cu.onLoad.removeSubscriber(_85c,_864);
cu.onLoad.removeSubscriber(spId,curam.smartPanel._handleSmartPanelLoad);
},_85d);
}
}});
return curam.contentPanel;
});
},"dijit/layout/_LayoutWidget":function(){
define("dijit/layout/_LayoutWidget",["dojo/_base/lang","../_Widget","../_Container","../_Contained","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/sniff","dojo/_base/window"],function(lang,_865,_866,_867,_868,_869,_86a,_86b,has,win){
return _868("dijit.layout._LayoutWidget",[_865,_866,_867],{baseClass:"dijitLayoutContainer",isLayoutContainer:true,buildRendering:function(){
this.inherited(arguments);
_869.add(this.domNode,"dijitContainer");
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
var _86c=this.getParent&&this.getParent();
if(!(_86c&&_86c.isLayoutContainer)){
this.resize();
this.connect(win.global,"onresize",function(){
this.resize();
});
}
},resize:function(_86d,_86e){
var node=this.domNode;
if(_86d){
_86a.setMarginBox(node,_86d);
}
var mb=_86e||{};
lang.mixin(mb,_86d||{});
if(!("h" in mb)||!("w" in mb)){
mb=lang.mixin(_86a.getMarginBox(node),mb);
}
var cs=_86b.getComputedStyle(node);
var me=_86a.getMarginExtents(node,cs);
var be=_86a.getBorderExtents(node,cs);
var bb=(this._borderBox={w:mb.w-(me.w+be.w),h:mb.h-(me.h+be.h)});
var pe=_86a.getPadExtents(node,cs);
this._contentBox={l:_86b.toPixelValue(node,cs.paddingLeft),t:_86b.toPixelValue(node,cs.paddingTop),w:bb.w-pe.w,h:bb.h-pe.h};
this.layout();
},layout:function(){
},_setupChild:function(_86f){
var cls=this.baseClass+"-child "+(_86f.baseClass?this.baseClass+"-"+_86f.baseClass:"");
_869.add(_86f.domNode,cls);
},addChild:function(_870,_871){
this.inherited(arguments);
if(this._started){
this._setupChild(_870);
}
},removeChild:function(_872){
var cls=this.baseClass+"-child"+(_872.baseClass?" "+this.baseClass+"-"+_872.baseClass:"");
_869.remove(_872.domNode,cls);
this.inherited(arguments);
}});
});
},"dojo/behavior":function(){
define("dojo/behavior",["./_base/kernel","./_base/lang","./_base/array","./_base/connect","./query","./ready"],function(dojo,lang,_873,_874,_875,_876){
dojo.behavior=new function(){
function _877(obj,name){
if(!obj[name]){
obj[name]=[];
}
return obj[name];
};
var _878=0;
function _879(obj,_87a,func){
var _87b={};
for(var x in obj){
if(typeof _87b[x]=="undefined"){
if(!func){
_87a(obj[x],x);
}else{
func.call(_87a,obj[x],x);
}
}
}
};
this._behaviors={};
this.add=function(_87c){
_879(_87c,this,function(_87d,name){
var _87e=_877(this._behaviors,name);
if(typeof _87e["id"]!="number"){
_87e.id=_878++;
}
var _87f=[];
_87e.push(_87f);
if((lang.isString(_87d))||(lang.isFunction(_87d))){
_87d={found:_87d};
}
_879(_87d,function(rule,_880){
_877(_87f,_880).push(rule);
});
});
};
var _881=function(node,_882,_883){
if(lang.isString(_882)){
if(_883=="found"){
_874.publish(_882,[node]);
}else{
_874.connect(node,_883,function(){
_874.publish(_882,arguments);
});
}
}else{
if(lang.isFunction(_882)){
if(_883=="found"){
_882(node);
}else{
_874.connect(node,_883,_882);
}
}
}
};
this.apply=function(){
_879(this._behaviors,function(_884,id){
_875(id).forEach(function(elem){
var _885=0;
var bid="_dj_behavior_"+_884.id;
if(typeof elem[bid]=="number"){
_885=elem[bid];
if(_885==(_884.length)){
return;
}
}
for(var x=_885,tver;tver=_884[x];x++){
_879(tver,function(_886,_887){
if(lang.isArray(_886)){
_873.forEach(_886,function(_888){
_881(elem,_888,_887);
});
}
});
}
elem[bid]=_884.length;
});
});
};
};
_876(dojo.behavior,"apply");
return dojo.behavior;
});
},"dijit/popup":function(){
define("dijit/popup",["dojo/_base/array","dojo/aspect","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/window","./place","./BackgroundIframe","."],function(_889,_88a,_88b,_88c,dom,_88d,_88e,_88f,_890,_891,has,keys,lang,on,win,_892,_893,_894){
function _895(){
if(this._popupWrapper){
_88e.destroy(this._popupWrapper);
delete this._popupWrapper;
}
};
var _896=_88c(null,{_stack:[],_beginZIndex:1000,_idGen:1,_createWrapper:function(_897){
var _898=_897._popupWrapper,node=_897.domNode;
if(!_898){
_898=_88e.create("div",{"class":"dijitPopup",style:{display:"none"},role:"presentation"},win.body());
_898.appendChild(node);
var s=node.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
_897._popupWrapper=_898;
_88a.after(_897,"destroy",_895,true);
}
return _898;
},moveOffScreen:function(_899){
var _89a=this._createWrapper(_899);
_890.set(_89a,{visibility:"hidden",top:"-9999px",display:""});
},hide:function(_89b){
var _89c=this._createWrapper(_89b);
_890.set(_89c,"display","none");
},getTopPopup:function(){
var _89d=this._stack;
for(var pi=_89d.length-1;pi>0&&_89d[pi].parent===_89d[pi-1].widget;pi--){
}
return _89d[pi];
},open:function(args){
var _89e=this._stack,_89f=args.popup,_8a0=args.orient||["below","below-alt","above","above-alt"],ltr=args.parent?args.parent.isLeftToRight():_88f.isBodyLtr(),_8a1=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+this._idGen++);
while(_89e.length&&(!args.parent||!dom.isDescendant(args.parent.domNode,_89e[_89e.length-1].widget.domNode))){
this.close(_89e[_89e.length-1].widget);
}
var _8a2=this._createWrapper(_89f);
_88d.set(_8a2,{id:id,style:{zIndex:this._beginZIndex+_89e.length},"class":"dijitPopup "+(_89f.baseClass||_89f["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:args.parent?args.parent.id:""});
if(has("bgIframe")&&!_89f.bgIframe){
_89f.bgIframe=new _893(_8a2);
}
var best=_8a1?_892.around(_8a2,_8a1,_8a0,ltr,_89f.orient?lang.hitch(_89f,"orient"):null):_892.at(_8a2,args,_8a0=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],args.padding);
_8a2.style.display="";
_8a2.style.visibility="visible";
_89f.domNode.style.visibility="visible";
var _8a3=[];
_8a3.push(on(_8a2,_88b._keypress,lang.hitch(this,function(evt){
if(evt.charOrCode==keys.ESCAPE&&args.onCancel){
_891.stop(evt);
args.onCancel();
}else{
if(evt.charOrCode===keys.TAB){
_891.stop(evt);
var _8a4=this.getTopPopup();
if(_8a4&&_8a4.onCancel){
_8a4.onCancel();
}
}
}
})));
if(_89f.onCancel&&args.onCancel){
_8a3.push(_89f.on("cancel",args.onCancel));
}
_8a3.push(_89f.on(_89f.onExecute?"execute":"change",lang.hitch(this,function(){
var _8a5=this.getTopPopup();
if(_8a5&&_8a5.onExecute){
_8a5.onExecute();
}
})));
_89e.push({widget:_89f,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:_8a3});
if(_89f.onOpen){
_89f.onOpen(best);
}
return best;
},close:function(_8a6){
var _8a7=this._stack;
while((_8a6&&_889.some(_8a7,function(elem){
return elem.widget==_8a6;
}))||(!_8a6&&_8a7.length)){
var top=_8a7.pop(),_8a8=top.widget,_8a9=top.onClose;
if(_8a8.onClose){
_8a8.onClose();
}
var h;
while(h=top.handlers.pop()){
h.remove();
}
if(_8a8&&_8a8.domNode){
this.hide(_8a8);
}
if(_8a9){
_8a9();
}
}
}});
return (_894.popup=new _896());
});
},"dijit/_base/manager":function(){
define("dijit/_base/manager",["dojo/_base/array","dojo/_base/config","../registry",".."],function(_8aa,_8ab,_8ac,_8ad){
_8aa.forEach(["byId","getUniqueId","findWidgets","_destroyAll","byNode","getEnclosingWidget"],function(name){
_8ad[name]=_8ac[name];
});
_8ad.defaultDuration=_8ab["defaultDuration"]||200;
return _8ad;
});
},"dijit/layout/StackController":function(){
define("dijit/layout/StackController",["dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/_base/sniff","../focus","../registry","../_Widget","../_TemplatedMixin","../_Container","../form/ToggleButton","dojo/i18n!../nls/common"],function(_8ae,_8af,_8b0,keys,lang,has,_8b1,_8b2,_8b3,_8b4,_8b5,_8b6){
var _8b7=_8af("dijit.layout._StackButton",_8b6,{tabIndex:"-1",closeButton:false,_setCheckedAttr:function(_8b8,_8b9){
this.inherited(arguments);
this.focusNode.removeAttribute("aria-pressed");
},buildRendering:function(evt){
this.inherited(arguments);
(this.focusNode||this.domNode).setAttribute("role","tab");
},onClick:function(){
_8b1.focus(this.focusNode);
},onClickCloseButton:function(evt){
evt.stopPropagation();
}});
var _8ba=_8af("dijit.layout.StackController",[_8b3,_8b4,_8b5],{baseClass:"dijitStackController",templateString:"<span role='tablist' data-dojo-attach-event='onkeypress'></span>",containerId:"",buttonWidget:_8b7,constructor:function(){
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
_8ae.forEach(info.children,this.onAddChild,this);
if(info.selected){
this.onSelectChild(info.selected);
}
},destroy:function(){
for(var pane in this.pane2button){
this.onRemoveChild(_8b2.byId(pane));
}
this.inherited(arguments);
},onAddChild:function(page,_8bb){
var cls=lang.isString(this.buttonWidget)?lang.getObject(this.buttonWidget):this.buttonWidget;
var _8bc=new cls({id:this.id+"_"+page.id,label:page.title,dir:page.dir,lang:page.lang,textDir:page.textDir,showLabel:page.showTitle,iconClass:page.iconClass,closeButton:page.closable,title:page.tooltip});
_8bc.focusNode.setAttribute("aria-selected","false");
var _8bd=["title","showTitle","iconClass","closable","tooltip"],_8be=["label","showLabel","iconClass","closeButton","title"];
this.pane2watches[page.id]=_8ae.map(_8bd,function(_8bf,idx){
return page.watch(_8bf,function(name,_8c0,_8c1){
_8bc.set(_8be[idx],_8c1);
});
});
this.pane2connects[page.id]=[this.connect(_8bc,"onClick",lang.hitch(this,"onButtonClick",page)),this.connect(_8bc,"onClickCloseButton",lang.hitch(this,"onCloseButtonClick",page))];
this.addChild(_8bc,_8bb);
this.pane2button[page.id]=_8bc;
page.controlButton=_8bc;
if(!this._currentChild){
_8bc.focusNode.setAttribute("tabIndex","0");
_8bc.focusNode.setAttribute("aria-selected","true");
this._currentChild=page;
}
if(!this.isLeftToRight()&&has("ie")&&this._rectifyRtlTabList){
this._rectifyRtlTabList();
}
},onRemoveChild:function(page){
if(this._currentChild===page){
this._currentChild=null;
}
_8ae.forEach(this.pane2connects[page.id],lang.hitch(this,"disconnect"));
delete this.pane2connects[page.id];
_8ae.forEach(this.pane2watches[page.id],function(w){
w.unwatch();
});
delete this.pane2watches[page.id];
var _8c2=this.pane2button[page.id];
if(_8c2){
this.removeChild(_8c2);
delete this.pane2button[page.id];
_8c2.destroy();
}
delete page.controlButton;
},onSelectChild:function(page){
if(!page){
return;
}
if(this._currentChild){
var _8c3=this.pane2button[this._currentChild.id];
_8c3.set("checked",false);
_8c3.focusNode.setAttribute("aria-selected","false");
_8c3.focusNode.setAttribute("tabIndex","-1");
}
var _8c4=this.pane2button[page.id];
_8c4.set("checked",true);
_8c4.focusNode.setAttribute("aria-selected","true");
this._currentChild=page;
_8c4.focusNode.setAttribute("tabIndex","0");
var _8c5=_8b2.byId(this.containerId);
_8c5.containerNode.setAttribute("aria-labelledby",_8c4.id);
},onButtonClick:function(page){
if(this._currentChild.id===page.id){
var _8c6=this.pane2button[page.id];
_8c6.set("checked",true);
}
var _8c7=_8b2.byId(this.containerId);
_8c7.selectChild(page);
},onCloseButtonClick:function(page){
var _8c8=_8b2.byId(this.containerId);
_8c8.closeChild(page);
if(this._currentChild){
var b=this.pane2button[this._currentChild.id];
if(b){
_8b1.focus(b.focusNode||b.domNode);
}
}
},adjacent:function(_8c9){
if(!this.isLeftToRight()&&(!this.tabPosition||/top|bottom/.test(this.tabPosition))){
_8c9=!_8c9;
}
var _8ca=this.getChildren();
var _8cb=_8ae.indexOf(_8ca,this.pane2button[this._currentChild.id]);
var _8cc=_8c9?1:_8ca.length-1;
return _8ca[(_8cb+_8cc)%_8ca.length];
},onkeypress:function(e){
if(this.disabled||e.altKey){
return;
}
var _8cd=null;
if(e.ctrlKey||!e._djpage){
switch(e.charOrCode){
case keys.LEFT_ARROW:
case keys.UP_ARROW:
if(!e._djpage){
_8cd=false;
}
break;
case keys.PAGE_UP:
if(e.ctrlKey){
_8cd=false;
}
break;
case keys.RIGHT_ARROW:
case keys.DOWN_ARROW:
if(!e._djpage){
_8cd=true;
}
break;
case keys.PAGE_DOWN:
if(e.ctrlKey){
_8cd=true;
}
break;
case keys.HOME:
case keys.END:
var _8ce=this.getChildren();
if(_8ce&&_8ce.length){
_8ce[e.charOrCode==keys.HOME?0:_8ce.length-1].onClick();
}
_8b0.stop(e);
break;
case keys.DELETE:
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
_8b0.stop(e);
break;
default:
if(e.ctrlKey){
if(e.charOrCode===keys.TAB){
this.adjacent(!e.shiftKey).onClick();
_8b0.stop(e);
}else{
if(e.charOrCode=="w"){
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
_8b0.stop(e);
}
}
}
}
if(_8cd!==null){
this.adjacent(_8cd).onClick();
_8b0.stop(e);
}
}
},onContainerKeyPress:function(info){
info.e._djpage=info.page;
this.onkeypress(info.e);
}});
_8ba.StackButton=_8b7;
return _8ba;
});
},"curam/util/onLoad":function(){
define("curam/util/onLoad",["curam/util","curam/define","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _8cf=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.onLoad",{EVENT:"/curam/frame/load",publishers:[],subscribers:[],defaultGetIdFunction:function(_8d0){
var _8d1=dojo.attr(_8d0,"class").split(" ");
return dojo.filter(_8d1,function(_8d2){
return _8d2.indexOf("iframe-")==0;
})[0];
},addPublisher:function(_8d3){
curam.util.onLoad.publishers.push(_8d3);
},addSubscriber:function(_8d4,_8d5,_8d6){
curam.util.onLoad.subscribers.push({"getId":_8d6?_8d6:curam.util.onLoad.defaultGetIdFunction,"callback":_8d5,"iframeId":_8d4});
},removeSubscriber:function(_8d7,_8d8,_8d9){
curam.util.onLoad.subscribers=dojo.filter(curam.util.onLoad.subscribers,function(_8da){
return !(_8da.iframeId==_8d7&&_8da.callback==_8d8);
});
},execute:function(){
if(window.parent==window){
curam.debug.log("curam.util.onLoad.execute(): "+_8cf.getProperty("curam.util.onLoad.exit"));
return;
}
var _8db={};
dojo.forEach(curam.util.onLoad.publishers,function(_8dc){
_8dc(_8db);
});
curam.util.onLoad.publishers=[];
require(["dojo/io/iframe"]);
var _8dd=dojo.io.iframe.create(null,null,"about:blank");
dojo.attr(_8dd,"id","ie-progress-indicator-helper");
dojo.attr(_8dd,"title","ie-progress-indicator-helper");
window.parent.dojo.publish(curam.util.onLoad.EVENT,[window.frameElement,_8db]);
}});
curam.util.subscribe(curam.util.onLoad.EVENT,function(_8de,_8df){
dojo.forEach(curam.util.onLoad.subscribers,function(_8e0){
var _8e1=_8e0.getId(_8de);
if(_8e0.iframeId==_8e1){
_8e0.callback(_8e1,_8df);
}
});
});
return curam.util.onLoad;
});
},"url:curam/widget/templates/ComboBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\r\n  id=\"widget_${id}\"\r\n  role=\"listbox\"\r\n  ><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\r\n    data-dojo-attach-point=\"_buttonNode, _popupStateNode\" role=\"presentation\"\r\n    ><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n      ${_buttonInputDisabled}\r\n  /></div\r\n  ><div class='dijitReset dijitValidationContainer'\r\n    ><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n  /></div\r\n  ><div class=\"dijitReset dijitInputField dijitInputContainer\" role=\"listbox\"\r\n    ><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\r\n      data-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\r\n  /></div\r\n></div>\r\n","url:dijit/templates/TooltipDialog.html":"<div role=\"presentation\" tabIndex=\"-1\">\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" data-dojo-attach-point=\"containerNode\" role=\"dialog\"></div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\"></div>\n</div>\n","dojo/dnd/Mover":function(){
define("dojo/dnd/Mover",["../main","../Evented","../touch","./common","./autoscroll"],function(dojo,_8e2,_8e3){
dojo.declare("dojo.dnd.Mover",[_8e2],{constructor:function(node,e,host){
this.node=dojo.byId(node);
this.marginBox={l:e.pageX,t:e.pageY};
this.mouseButton=e.button;
var h=(this.host=host),d=node.ownerDocument;
this.events=[dojo.connect(d,_8e3.move,this,"onFirstMove"),dojo.connect(d,_8e3.move,this,"onMouseMove"),dojo.connect(d,_8e3.release,this,"onMouseUp"),dojo.connect(d,"ondragstart",dojo.stopEvent),dojo.connect(d.body,"onselectstart",dojo.stopEvent)];
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
},"dijit/layout/TabContainer":function(){
define("dijit/layout/TabContainer",["dojo/_base/lang","dojo/_base/declare","./_TabContainerBase","./TabController","./ScrollingTabController"],function(lang,_8e4,_8e5,_8e6,_8e7){
return _8e4("dijit.layout.TabContainer",_8e5,{useMenu:true,useSlider:true,controllerWidget:"",_makeController:function(_8e8){
var cls=this.baseClass+"-tabs"+(this.doLayout?"":" dijitTabNoLayout"),_8e6=lang.getObject(this.controllerWidget);
return new _8e6({id:this.id+"_tablist",dir:this.dir,lang:this.lang,textDir:this.textDir,tabPosition:this.tabPosition,doLayout:this.doLayout,containerId:this.id,"class":cls,nested:this.nested,useMenu:this.useMenu,useSlider:this.useSlider,tabStripClass:this.tabStrip?this.baseClass+(this.tabStrip?"":"No")+"Strip":null},_8e8);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.controllerWidget){
this.controllerWidget=(this.tabPosition=="top"||this.tabPosition=="bottom")&&!this.nested?"dijit.layout.ScrollingTabController":"dijit.layout.TabController";
}
}});
});
},"curam/ui/ClientDataAccessor":function(){
define("curam/ui/ClientDataAccessor",["curam/util/Request","curam/debug","curam/util/ResourceBundle"],function(_8e9){
dojo.requireLocalization("curam.application","Debug");
var _8ea=new curam.util.ResourceBundle("Debug");
return dojo.declare("curam.ui.ClientDataAccessor",null,{get:function(path,_8eb,_8ec,_8ed){
var _8ee="servlet/PathResolver"+"?p="+path;
if(_8ec==undefined){
_8ec=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_8ed==undefined){
_8ed=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
_8e9.post({url:_8ee,headers:{"Content-Encoding":"UTF-8"},handleAs:"text",preventCache:true,load:_8eb,error:_8ec,handle:_8ed});
},getList:function(path,_8ef,_8f0,_8f1){
var _8f2="servlet/PathResolver"+"?r=l&p="+path;
if(_8f0==undefined){
_8f0=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_8f1==undefined){
_8f1=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
_8e9.post({url:_8f2,headers:{"Content-Encoding":"UTF-8"},handleAs:"json",preventCache:true,load:_8ef,error:_8f0,handle:_8f1});
},getRaw:function(path,_8f3,_8f4,_8f5){
var _8f6="servlet/PathResolver"+"?r=j&p="+path;
if(_8f4==undefined){
_8f4=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_8f5==undefined){
_8f5=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
_8e9.post({url:_8f6,headers:{"Content-Encoding":"UTF-8"},handleAs:"json",preventCache:true,load:_8f3,error:_8f4,handle:_8f5});
},set:function(path,_8f7,_8f8,_8f9,_8fa){
var _8fb="servlet/PathResolver"+"?r=x&p="+path+"&v="+encodeURIComponent(_8f7);
if(_8f9==undefined||_8f9==null){
_8f9=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_8fa==undefined||_8fa==null){
_8fa=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
if(_8f8==undefined||_8f8==null){
_8f8=dojo.hitch(this,this.handleClientDataAccessorSuccess);
}
_8e9.post({url:_8fb,headers:{"Content-Encoding":"UTF-8"},handleAs:"text",preventCache:true,load:_8f8,error:_8f9,handle:_8fa});
},handleClientDataAccessorError:function(_8fc,_8fd){
var _8fe=_8ea.getProperty("curam.ui.ClientDataAccessor.err.1")+"PathResolverServlet : ";
var _8ff=_8ea.getProperty("curam.ui.ClientDataAccessor.err.2");
curam.debug.log(_8fe+_8fc+_8ff+_8fd);
},handleClientDataAccessorSuccess:function(_900,_901){
curam.debug.log("curam.ui.ClientDataAccessor.handleClientDataAccessorSuccess : "+_900);
},handleClientDataAccessorCallback:function(_902,_903){
curam.debug.log("curam.ui.ClientDataAccessor.handleClientDataAccessorCallback :"+" "+_8ea.getProperty("curam.ui.ClientDataAccessor.callback"));
}});
});
},"dijit/BackgroundIframe":function(){
define("dijit/BackgroundIframe",["require",".","dojo/_base/config","dojo/dom-construct","dojo/dom-style","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window"],function(_904,_905,_906,_907,_908,lang,on,has,win){
has.add("bgIframe",has("ie")||has("mozilla"));
var _909=new function(){
var _90a=[];
this.pop=function(){
var _90b;
if(_90a.length){
_90b=_90a.pop();
_90b.style.display="";
}else{
if(has("ie")<9){
var burl=_906["dojoBlankHtmlUrl"]||_904.toUrl("dojo/resources/blank.html")||"javascript:\"\"";
var html="<iframe src='"+burl+"' role='presentation'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_90b=win.doc.createElement(html);
}else{
_90b=_907.create("iframe");
_90b.src="javascript:\"\"";
_90b.className="dijitBackgroundIframe";
_90b.setAttribute("role","presentation");
_908.set(_90b,"opacity",0.1);
}
_90b.tabIndex=-1;
}
return _90b;
};
this.push=function(_90c){
_90c.style.display="none";
_90a.push(_90c);
};
}();
_905.BackgroundIframe=function(node){
if(!node.id){
throw new Error("no id");
}
if(has("bgIframe")){
var _90d=(this.iframe=_909.pop());
node.appendChild(_90d);
if(has("ie")<7||has("quirks")){
this.resize(node);
this._conn=on(node,"resize",lang.hitch(this,function(){
this.resize(node);
}));
}else{
_908.set(_90d,{width:"100%",height:"100%"});
}
}
};
lang.extend(_905.BackgroundIframe,{resize:function(node){
if(this.iframe){
_908.set(this.iframe,{width:node.offsetWidth+"px",height:node.offsetHeight+"px"});
}
},destroy:function(){
if(this._conn){
this._conn.remove();
this._conn=null;
}
if(this.iframe){
_909.push(this.iframe);
delete this.iframe;
}
}});
return _905.BackgroundIframe;
});
},"curam/validation":function(){
define("curam/validation",["curam/define","curam/date"],function(){
curam.define.singleton("curam.validation",{FILE_UPLOAD_FLGS:[],fileUploadChecker:null,invalidPathMsg:null,preventKeyPress:function(_90e){
if(dojo.isIE){
_90e.cancelBubble=true;
_90e.returnValue=false;
return false;
}
return true;
},activateFileUploadChecker:function(code){
if(!curam.validation.fileUploadChecker){
curam.validation.fileUploadChecker=function(){
var form=dojo.byId("mainForm");
var _90f=function(evt){
var _910=curam.validation.FILE_UPLOAD_FLGS;
for(var i=0;i<_910.length;i++){
var _911=_910[i];
var _912=cm.nextSibling(dojo.byId(_911),"input");
if(!curam.validation.isValidFilePath(_912.value)){
dojo.stopEvent(evt);
alert(curam.validation.invalidPathMsg+" '"+_912.value+"'");
cm.setFormSubmitted(form,0);
return false;
}
}
return true;
};
dojo.connect(form,"onsubmit",_90f);
};
dojo.addOnLoad(curam.validation.fileUploadChecker);
}
},isValidFilePath:function(path){
return true;
},validateDate:function(_913){
var _914={valid:curam.date.isDate(_913,jsDF),validFormat:jsDF.toLowerCase()};
return _914;
}});
return curam.validation;
});
},"curam/util/ui/ApplicationTabbedUiController":function(){
define("curam/util/ui/ApplicationTabbedUiController",["curam/debug","dojox/layout/ContentPane","curam/tab","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _915=new curam.util.ResourceBundle("Debug");
var _916=dojo.declare("curam.util.ui.ApplicationTabbedUiController",null,{_tabContainer:null,constructor:function(_917){
this._tabContainer=_917;
},findOpenTab:function(_918){
var _919=_918.tabDescriptor;
var _91a=curam.tab.getTabContainer(_919.sectionID);
var _91b=null;
var tabs=undefined;
var _91c=undefined;
if(_91a!=undefined){
tabs=_91a.getChildren();
_91c=_91a.selectedChildWidget;
}
if(_91c){
var _91d=_91c.tabDescriptor;
this._log(_915.getProperty("curam.util.ui.ApplicationTabbedUiController.testing"));
if(_918.uimPageRequest.openInCurrentTab||(_91d.tabID==_919.tabID&&_91d.matchesPageRequest(_918.uimPageRequest))){
this._openInCurrentTab(_918.uimPageRequest);
_91b=_91c;
}
}
if(!_91b&&tabs){
var _91e=true;
this._log(_915.getProperty("curam.util.ui.ApplicationTabbedUiController.searching")+" "+tabs.length+" "+_915.getProperty("curam.util.ui.ApplicationTabbedUiController.tabs"));
for(var i=0;i<tabs.length;i++){
var _91f=tabs[i];
var _920=_91f.tabDescriptor;
if(_920&&_920.tabID==_919.tabID){
if((_91e&&_920.tabSignature==_920.tabID)||_920.matchesPageRequest(_918.uimPageRequest)){
_91b=_91f;
break;
}
_91e=false;
}
}
}
this._log(_915.getProperty("curam.util.ui.ApplicationTabbedUiController.searched")+" '"+_919.tabID+"'. "+_915.getProperty("curam.util.ui.ApplicationTabbedUiController.found")+" "+(_91b?_915.getProperty("curam.util.ui.ApplicationTabbedUiController.a"):_915.getProperty("curam.util.ui.ApplicationTabbedUiController.no"))+" "+_915.getProperty("curam.util.ui.ApplicationTabbedUiController.match"));
return _91b;
},openPageInCurrentTab:function(_921){
var _922=curam.tab.getSelectedTab();
var _923=undefined;
if(_922){
_923=dojo.query(".nav-panel",_922.domNode)[0];
}
if(_923){
var _924;
if(_921.getURL().indexOf("?")==-1){
_924="?";
}else{
_924="&";
}
var loc=curam.config?curam.config.locale:jsL;
var _925=jsBaseURL+"/"+loc+"/"+_921.getURL()+_924+curam.tab.getTabController().getCacheBusterParameter();
if(_921.pageHolder){
_921.pageHolder.location.href=_925;
}else{
var _926=dojo.query(".contentPanelFrame",_923)[0];
_926.src=_925;
}
}
},_openInCurrentTab:function(_927){
var _928=curam.tab.getSelectedTab();
var _929=undefined;
if(_928){
_929=dojo.query(".nav-panel",_928.domNode)[0];
}
if(_929){
var _92a=dojo.query(".contentPanelFrame",_929)[0];
_927.cdejParameters["o3ctx"]="4096";
var loc=curam.config?curam.config.locale:jsL;
var url=loc+"/"+_927.getURL();
if(url.indexOf("?")==-1){
url+="?";
}else{
url+="&";
}
_92a.src=url+curam.tab.getTabController().getCacheBusterParameter();
}
},refreshExistingPageInTab:function(tab){
var _92b=curam.tab.getContentPanelIframe(tab);
_92b.contentWindow.location.reload(true);
},selectTab:function(tab){
this._tabContainer.selectChild(tab);
},createTab:function(_92c){
this._log("createTab(): "+_915.getProperty("curam.util.ui.ApplicationTabbedUiController.start"));
var _92d=_92c.tabDescriptor;
var _92e="";
if(_92d.tabContent&&_92d.tabContent.tabName){
_92e=_92d.tabContent.tabName;
}
var cp=new dojox.layout.ContentPane({tabDescriptor:_92d,uimPageRequest:_92c.uimPageRequest,title:_92e,closable:!_92d.isHomePage,preventCache:true,"class":"tab-content-holder dijitContentPane dijitHidden "+"dijitTabContainerTop-child "+"dijitTabContainerTop-dijitContentPane dijitTabPane",onDownloadStart:function(){
return "&nbsp;";
}});
var _92f=[];
_92c.uimPageRequest.cdejParameters["o3ctx"]="4096";
var _930=dojo.connect(cp,"onDownloadEnd",null,function(){
curam.util.fireTabOpenedEvent(cp.id);
});
_92f.push(_930);
_930=dojo.connect(cp,"destroy",null,function(){
curam.tab.doExecuteOnTabClose(cp.id);
});
_92f.push(_930);
_92f.push(dojo.connect(cp,"destroy",function(){
dojo.forEach(_92f,dojo.disconnect);
}));
_930=dojo.connect(cp,"set",function(name,_931){
if(name=="title"&&arguments.length==2){
curam.debug.log(_915.getProperty("curam.util.ui.ApplicationTabbedUiController.title"));
cp.tabDescriptor.setTabContent(_92c.uimPageRequest,_931);
var _932=curam.tab.getSelectedTab();
if(_932){
var _933=_932.domNode.parentNode;
if(_933){
_933.focus();
}
}
}
});
_92f.push(_930);
_930=dojo.connect(cp,"onClose",function(){
new curam.tab.TabSessionManager().tabClosed(cp.tabDescriptor);
});
_92f.push(_930);
var qs=_92c.uimPageRequest.getQueryString();
var href="TabContent.do"+"?"+curam.tab.getTabController().COMMAND_PARAM_NAME+"=PAGE&"+curam.tab.getTabController().PAGE_ID_PARAM_NAME+"="+_92c.uimPageRequest.pageID+(qs.length>0?"&"+qs:"")+"&o3tabid="+_92d.tabID+"&o3tabWidgetId="+cp.id;
this._log(_915.getProperty("curam.util.ui.ApplicationTabbedUiController.href")+" "+href);
cp.set("href",href);
this._log(_915.getProperty("curam.util.ui.ApplicationTabbedUiController.finished")+" ",cp.tabDescriptor);
return cp;
},insertTabIntoApp:function(_934,_935){
var _936=null;
if(_935){
if(this._tabContainer.hasChildren()){
_936=this._tabContainer.selectedChildWidget;
}
this._tabContainer.addChild(_934,0);
}else{
this._tabContainer.addChild(_934);
}
return _936;
},_log:function(msg,_937){
if(curam.debug.enabled()){
curam.debug.log("curam.util.ui.ApplicationTabbedUiController: "+msg+(_937?" "+dojo.toJson(_937):""));
}
}});
return _916;
});
},"curam/util/Constants":function(){
define("curam/util/Constants",["curam/define"],function(){
curam.define.singleton("curam.util.Constants",{RETURN_PAGE_PARAM:"__o3rpu"});
return curam.util.Constants;
});
},"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n","curam/ui/PageRequest":function(){
define("curam/ui/PageRequest",["curam/debug","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _938=new curam.util.ResourceBundle("Debug");
var _939=dojo.declare("curam.ui.PageRequest",null,{forceLoad:false,justRefresh:false,constructor:function(_93a,_93b,_93c){
this.parameters={};
this.cdejParameters={};
this.cdejParameters["o3ctx"]="4096";
if(_93b){
this.isHomePage=true;
}else{
this.isHomePage=false;
}
if(_93c){
this.openInCurrentTab=true;
}else{
this.openInCurrentTab=false;
}
this.pageHolder=null;
var url;
if(dojo.isString(_93a)){
url=_93a;
curam.debug.log("PAGE REQUEST: "+_938.getProperty("curam.ui.PageRequest.url")+" "+url);
}else{
curam.debug.log("PAGE REQUEST: "+_938.getProperty("curam.ui.PageRequest.descriptor")+" "+_93a.toJson());
var tc=_93a.tabContent;
url=tc.pageID+"Page.do";
var _93d=true;
for(param in tc.parameters){
if(_93d){
url+="?";
_93d=false;
}else{
url+="&";
}
url+=param+"="+encodeURIComponent(tc.parameters[param]);
}
curam.debug.log("PAGE REQUEST: "+_938.getProperty("curam.ui.PageRequest.derived")+" "+url);
}
var _93e=url.split("?");
this.parseUIMPageID(_93e[0]);
if(_93e.length==2){
this.parseParameters(_93e[1]);
}
},parseUIMPageID:function(url){
var _93f=url.split("/");
var _940=_93f[_93f.length-1];
this.pageID=_940.replace("Page.do","");
},parseParameterName:function(name){
if(name.charAt(0)=="a"&&name.charAt(1)=="m"&&name.charAt(2)=="p"&&name.charAt(3)==";"){
return name.substring(4,name.length);
}else{
return name;
}
},parseParameters:function(_941){
var _942=_941.split("&");
for(var i=0;i<_942.length;i++){
var _943=_942[i].split("=");
var _944=this.parseParameterName(_943[0]);
if(_944.length>0){
if(!this.isCDEJParam(_944)){
this.parameters[_944]=decodeURIComponent(_943[1].replace(/\+/g," "));
}else{
if(_944!="o3nocache"){
this.cdejParameters[_944]=decodeURIComponent(_943[1].replace(/\+/g," "));
}
}
}
}
},isCDEJParam:function(_945){
return (_945.charAt(0)=="o"&&_945.charAt(1)=="3")||(_945.charAt(0)=="_"&&_945.charAt(1)=="_"&&_945.charAt(2)=="o"&&_945.charAt(3)=="3");
},getQueryString:function(_946){
var _947="";
var _948;
for(_948 in this.parameters){
_947+=_948+"="+encodeURIComponent(this.parameters[_948])+"&";
}
if(!_946==true||_946==false){
for(_948 in this.cdejParameters){
_947+=_948+"="+encodeURIComponent(this.cdejParameters[_948])+"&";
}
}
_947=_947.substring(0,_947.length-1);
this.queryString=_947;
return this.queryString;
},getURL:function(_949){
var _94a=this.pageID+"Page.do";
var qs=this.getQueryString(_949);
if(qs!=""){
_94a+="?"+qs;
}
this.url=_94a;
return this.url;
}});
return _939;
});
},"curam/widget/Select":function(){
define("curam/widget/Select",["dojo/dom-style","dijit/popup","dojo/dom-geometry","dojo/_base/lang","dojo/dom-attr","dojo/dom-class","dijit/form/Select"],function(_94b,_94c,_94d,lang,_94e,_94f){
var _950=dojo.declare("curam.widget.Select",dijit.form.Select,{openDropDown:function(){
var _951=this.dropDown,_952=_951.domNode,_953=this._aroundNode||this.domNode,self=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_952.style.width){
this._explicitDDWidth=true;
}
if(_952.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _954={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_954.width="";
}
if(!this._explicitDDHeight){
_954.height="";
}
_94b.set(_952,_954);
var _955=this.maxHeight;
if(_955==-1){
var _956=winUtils.getBox(),_957=_94d.position(_953,false);
_955=Math.floor(Math.max(_957.y,_956.h-(_957.y+_957.h)));
}
_94c.moveOffScreen(_951);
if(_951.startup&&!_951._started){
_951.startup();
}
var mb=_94d.getMarginSize(_952);
var _958=(_955&&mb.h>_955);
_94b.set(_952,{overflowX:"hidden",overflowY:_958?"auto":"hidden"});
if(_958){
mb.h=_955;
if("w" in mb){
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_953.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_953.offsetWidth);
}else{
delete mb.w;
}
}
if(lang.isFunction(_951.resize)){
_951.resize(mb);
}else{
_94d.setMarginBox(_952,mb);
}
}
var _959=_94c.open({parent:this,popup:_951,around:_953,orient:this.dropDownPosition,onExecute:function(){
self.closeDropDown(true);
},onCancel:function(){
self.closeDropDown(true);
},onClose:function(){
_94e.set(self._popupStateNode,"popupActive",false);
_94f.remove(self._popupStateNode,"dijitHasDropDownOpen");
self._opened=false;
}});
_94e.set(this._popupStateNode,"popupActive","true");
_94f.add(self._popupStateNode,"dijitHasDropDownOpen");
this._opened=true;
return _959;
}});
return _950;
});
},"url:dijit/layout/templates/TabContainer.html":"<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" data-dojo-attach-point=\"containerNode\"></div>\n</div>\n","dijit/form/Button":function(){
require({cache:{"url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n"}});
define("dijit/form/Button",["require","dojo/_base/declare","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/ready","./_FormWidget","./_ButtonMixin","dojo/text!./templates/Button.html"],function(_95a,_95b,_95c,_95d,lang,_95e,_95f,_960,_961){
if(!_95d.isAsync){
_95e(0,function(){
var _962=["dijit/form/DropDownButton","dijit/form/ComboButton","dijit/form/ToggleButton"];
_95a(_962);
});
}
return _95b("dijit.form.Button",[_95f,_960],{showLabel:true,iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},baseClass:"dijitButton",templateString:_961,_setValueAttr:"valueNode",_onClick:function(e){
var ok=this.inherited(arguments);
if(ok){
if(this.valueNode){
this.valueNode.click();
e.preventDefault();
}
}
return ok;
},_fillContent:function(_963){
if(_963&&(!this.params||!("label" in this.params))){
var _964=lang.trim(_963.innerHTML);
if(_964){
this.label=_964;
}
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
_95c.toggle(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},setLabel:function(_965){
_95d.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_965);
},_setLabelAttr:function(_966){
this.inherited(arguments);
if(!this.showLabel&&!("title" in this.params)){
this.titleNode.title=lang.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
}});
});
},"curam/widget/Menu":function(){
define("curam/widget/Menu",["dijit/Menu","curam/util","curam/debug","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _967=new curam.util.ResourceBundle("Debug");
var Menu=dojo.declare("curam.widget.Menu",dijit.Menu,{_CSS_CLASS_ACTIVE_MENU:"curam-active-menu",_EVENT_OPENED:"/curam/menu/opened",_EVENT_CLOSED:"/curam/menu/closed",_amIActive:false,postCreate:function(){
curam.debug.log(_967.getProperty("curam.widget.Menu.created",[this.id]));
this.connect(this,"onOpen",dojo.hitch(this,function(){
curam.debug.log(_967.getProperty("curam.widget.Menu.opened",[this.id]));
curam.util.getTopmostWindow().dojo.publish(this._EVENT_OPENED,[this.id]);
this._markAsActive(true);
}));
var _968=curam.util.getTopmostWindow().dojo.subscribe(this._EVENT_OPENED,this,function(_969){
curam.debug.log(_967.getProperty("curam.widget.Menu.event",[this.id,this._amIActive?"active":"passive",_969]));
if(this.id!=_969&&this._amIActive){
curam.debug.log(_967.getProperty("curam.widget.Menu.deactivate"));
this._markAsActive(false);
var _96a=curam.util.getTopmostWindow().dojo.subscribe(this._EVENT_CLOSED,this,function(_96b){
if(_96b==_969){
curam.debug.log(_967.getProperty("curam.widget.Menu.reactivate",[_969,this.id]));
dojo.unsubscribe(_96a);
this._markAsActive(true);
}
});
}
});
this.connect(this,"onClose",dojo.hitch(this,function(){
curam.debug.log(_967.getProperty("curam.widget.Menu.closing",[this.id]));
curam.util.getTopmostWindow().dojo.publish(this._EVENT_CLOSED,[this.id]);
this._markAsActive(false);
dojo.unsubscribe(_968);
}));
this.inherited(arguments);
},_markAsActive:function(_96c){
if(_96c){
curam.debug.log(_967.getProperty("curam.widget.Menu.add.class"),this.id);
dojo.addClass(this.domNode,this._CSS_CLASS_ACTIVE_MENU);
}else{
curam.debug.log(_967.getProperty("curam.widget.Menu.remove.class"),this.id);
dojo.removeClass(this.domNode,this._CSS_CLASS_ACTIVE_MENU);
}
this._amIActive=_96c;
}});
return Menu;
});
},"dojo/dnd/move":function(){
define("dojo/dnd/move",["../main","./Mover","./Moveable"],function(dojo){
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){
},within:false,constructor:function(node,_96d){
if(!_96d){
_96d={};
}
this.constraints=_96d.constraints;
this.within=_96d.within;
},onFirstMove:function(_96e){
var c=this.constraintBox=this.constraints.call(this,_96e);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(this.within){
var mb=dojo._getMarginSize(_96e.node);
c.r-=mb.w;
c.b-=mb.h;
}
},onMove:function(_96f,_970){
var c=this.constraintBox,s=_96f.node.style;
this.onMoving(_96f,_970);
_970.l=_970.l<c.l?c.l:c.r<_970.l?c.r:_970.l;
_970.t=_970.t<c.t?c.t:c.b<_970.t?c.b:_970.t;
s.left=_970.l+"px";
s.top=_970.t+"px";
this.onMoved(_96f,_970);
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},constructor:function(node,_971){
var box=_971&&_971.box;
this.constraints=function(){
return box;
};
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",constructor:function(node,_972){
var area=_972&&_972.area;
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
},"dijit/_WidgetBase":function(){
define("dijit/_WidgetBase",["require","dojo/_base/array","dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/ready","dojo/Stateful","dojo/topic","dojo/_base/window","./registry"],function(_973,_974,_975,_976,_977,_978,dom,_979,_97a,_97b,_97c,_97d,_97e,lang,on,_97f,_980,_981,win,_982){
var _983=typeof (dojo.global.perf)!="undefined";
if(!_97e.isAsync){
_97f(0,function(){
var _984=["dijit/_base/manager"];
_973(_984);
});
}
var _985={};
function _986(obj){
var ret={};
for(var attr in obj){
ret[attr.toLowerCase()]=true;
}
return ret;
};
function _987(attr){
return function(val){
_979[val?"set":"remove"](this.domNode,attr,val);
this._set(attr,val);
};
};
return _978("dijit._WidgetBase",_980,{id:"",_setIdAttr:"domNode",lang:"",_setLangAttr:_987("lang"),dir:"",_setDirAttr:_987("dir"),textDir:"","class":"",_setClassAttr:{node:"domNode",type:"class"},style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{},_blankGif:_976.blankGif||_973.toUrl("dojo/resources/blank.gif"),postscript:function(_988,_989){
this.create(_988,_989);
},create:function(_98a,_98b){
if(_983){
perf.widgetStartedLoadingCallback();
}
this.srcNodeRef=dom.byId(_98b);
this._connects=[];
this._supportingWidgets=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_98a){
this.params=_98a;
lang.mixin(this,_98a);
}
this.postMixInProperties();
if(!this.id){
this.id=_982.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
_982.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _98c=this.srcNodeRef;
if(_98c&&_98c.parentNode&&this.domNode!==_98c){
_98c.parentNode.replaceChild(this.domNode,_98c);
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
if(_983){
perf.widgetLoadedCallback(this);
}
},_applyAttributes:function(){
var ctor=this.constructor,list=ctor._setterAttrs;
if(!list){
list=(ctor._setterAttrs=[]);
for(var attr in this.attributeMap){
list.push(attr);
}
var _98d=ctor.prototype;
for(var _98e in _98d){
if(_98e in this.attributeMap){
continue;
}
var _98f="_set"+_98e.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
})+"Attr";
if(_98f in _98d){
list.push(_98e);
}
}
}
_974.forEach(list,function(attr){
if(this.params&&attr in this.params){
}else{
if(this[attr]){
this.set(attr,this[attr]);
}
}
},this);
for(var _990 in this.params){
this.set(_990,this[_990]);
}
},postMixInProperties:function(){
},buildRendering:function(){
if(!this.domNode){
this.domNode=this.srcNodeRef||_97b.create("div");
}
if(this.baseClass){
var _991=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_991=_991.concat(_974.map(_991,function(name){
return name+"Rtl";
}));
}
_97a.add(this.domNode,_991);
}
},postCreate:function(){
},startup:function(){
if(this._started){
return;
}
this._started=true;
_974.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
},destroyRecursive:function(_992){
this._beingDestroyed=true;
this.destroyDescendants(_992);
this.destroy(_992);
},destroy:function(_993){
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
this.destroyRendering(_993);
_982.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_994){
if(this.bgIframe){
this.bgIframe.destroy(_994);
delete this.bgIframe;
}
if(this.domNode){
if(_994){
_979.remove(this.domNode,"widgetId");
}else{
_97b.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_994){
_97b.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_995){
_974.forEach(this.getChildren(),function(_996){
if(_996.destroyRecursive){
_996.destroyRecursive(_995);
}
});
},uninitialize:function(){
return false;
},_setStyleAttr:function(_997){
var _998=this.domNode;
if(lang.isObject(_997)){
_97d.set(_998,_997);
}else{
if(_998.style.cssText){
_998.style.cssText+="; "+_997;
}else{
_998.style.cssText=_997;
}
}
this._set("style",_997);
},_attrToDom:function(attr,_999,_99a){
_99a=arguments.length>=3?_99a:this.attributeMap[attr];
_974.forEach(lang.isArray(_99a)?_99a:[_99a],function(_99b){
var _99c=this[_99b.node||_99b||"domNode"];
var type=_99b.type||"attribute";
switch(type){
case "attribute":
if(lang.isFunction(_999)){
_999=lang.hitch(this,_999);
}
var _99d=_99b.attribute?_99b.attribute:(/^on[A-Z][a-zA-Z]*$/.test(attr)?attr.toLowerCase():attr);
_979.set(_99c,_99d,_999);
break;
case "innerText":
_99c.innerHTML="";
_99c.appendChild(win.doc.createTextNode(_999));
break;
case "innerHTML":
_99c.innerHTML=_999;
break;
case "class":
_97a.replace(_99c,_999,this[attr]);
break;
}
},this);
},get:function(name){
var _99e=this._getAttrNames(name);
return this[_99e.g]?this[_99e.g]():this[name];
},set:function(name,_99f){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _9a0=this._getAttrNames(name),_9a1=this[_9a0.s];
if(lang.isFunction(_9a1)){
var _9a2=_9a1.apply(this,Array.prototype.slice.call(arguments,1));
}else{
var _9a3=this.focusNode&&!lang.isFunction(this.focusNode)?"focusNode":"domNode",tag=this[_9a3].tagName,_9a4=_985[tag]||(_985[tag]=_986(this[_9a3])),map=name in this.attributeMap?this.attributeMap[name]:_9a0.s in this?this[_9a0.s]:((_9a0.l in _9a4&&typeof _99f!="function")||/^aria-|^data-|^role$/.test(name))?_9a3:null;
if(map!=null){
this._attrToDom(name,_99f,map);
}
this._set(name,_99f);
}
return _9a2||this;
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
});
return (apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr",l:uc.toLowerCase()});
},_set:function(name,_9a5){
var _9a6=this[name];
this[name]=_9a5;
if(this._watchCallbacks&&this._created&&_9a5!==_9a6){
this._watchCallbacks(name,_9a6,_9a5);
}
},on:function(type,func){
return _975.after(this,this._onMap(type),func,true);
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
return this.containerNode?_982.findWidgets(this.containerNode):[];
},getParent:function(){
return _982.getEnclosingWidget(this.domNode.parentNode);
},connect:function(obj,_9a7,_9a8){
var _9a9=_977.connect(obj,_9a7,this,_9a8);
this._connects.push(_9a9);
return _9a9;
},disconnect:function(_9aa){
var i=_974.indexOf(this._connects,_9aa);
if(i!=-1){
_9aa.remove();
this._connects.splice(i,1);
}
},subscribe:function(t,_9ab){
var _9ac=_981.subscribe(t,lang.hitch(this,_9ab));
this._connects.push(_9ac);
return _9ac;
},unsubscribe:function(_9ad){
this.disconnect(_9ad);
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):_97c.isBodyLtr();
},isFocusable:function(){
return this.focus&&(_97d.get(this.domNode,"display")!="none");
},placeAt:function(_9ae,_9af){
if(_9ae.declaredClass&&_9ae.addChild){
_9ae.addChild(this,_9af);
}else{
_97b.place(this.domNode,_9ae,_9af);
}
return this;
},getTextDir:function(text,_9b0){
return _9b0;
},applyTextDir:function(){
},defer:function(fcn,_9b1){
var _9b2=setTimeout(lang.hitch(this,function(){
_9b2=null;
if(!this._destroyed){
lang.hitch(this,fcn)();
}
}),_9b1||0);
return {remove:function(){
if(_9b2){
clearTimeout(_9b2);
_9b2=null;
}
return null;
}};
}});
});
},"dijit/layout/_TabContainerBase":function(){
require({cache:{"url:dijit/layout/templates/TabContainer.html":"<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" data-dojo-attach-point=\"containerNode\"></div>\n</div>\n"}});
define("dijit/layout/_TabContainerBase",["dojo/text!./templates/TabContainer.html","./StackContainer","./utils","../_TemplatedMixin","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style"],function(_9b3,_9b4,_9b5,_9b6,_9b7,_9b8,_9b9,_9ba){
return _9b7("dijit.layout._TabContainerBase",[_9b4,_9b6],{tabPosition:"top",baseClass:"dijitTabContainer",tabStrip:false,nested:false,templateString:_9b3,postMixInProperties:function(){
this.baseClass+=this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"");
this.srcNodeRef&&_9ba.set(this.srcNodeRef,"visibility","hidden");
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.tablist=this._makeController(this.tablistNode);
if(!this.doLayout){
_9b8.add(this.domNode,"dijitTabContainerNoLayout");
}
if(this.nested){
_9b8.add(this.domNode,"dijitTabContainerNested");
_9b8.add(this.tablist.containerNode,"dijitTabContainerTabListNested");
_9b8.add(this.tablistSpacer,"dijitTabContainerSpacerNested");
_9b8.add(this.containerNode,"dijitTabPaneWrapperNested");
}else{
_9b8.add(this.domNode,"tabStrip-"+(this.tabStrip?"enabled":"disabled"));
}
},_setupChild:function(tab){
_9b8.add(tab.domNode,"dijitTabPane");
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
var _9bb=this.tabPosition.replace(/-h/,"");
this.tablist.layoutAlign=_9bb;
var _9bc=[this.tablist,{domNode:this.tablistSpacer,layoutAlign:_9bb},{domNode:this.containerNode,layoutAlign:"client"}];
_9b5.layoutChildren(this.domNode,this._contentBox,_9bc);
this._containerContentBox=_9b5.marginBox2contentBox(this.containerNode,_9bc[2]);
if(sc&&sc.resize){
sc.resize(this._containerContentBox);
}
}else{
if(this.tablist.resize){
var s=this.tablist.domNode.style;
s.width="0";
var _9bd=_9b9.getContentBox(this.domNode).w;
s.width="";
this.tablist.resize({w:_9bd});
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
},"curam/util/Refresh":function(){
define("curam/util/Refresh",["curam/util/Request","curam/define","curam/util","curam/tab","curam/debug","curam/util/ContextPanel","curam/util/ui/refresh/TabRefreshController","curam/util/ResourceBundle"],function(_9be){
dojo.requireLocalization("curam.application","Debug");
var _9bf=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.Refresh",{submitted:false,pageSubmitted:"",refreshConfig:[],menuBarCallback:null,navigationCallback:null,refreshedOnTabOpen:{},_controllers:{},_pageRefreshButton:undefined,setMenuBarCallbacks:function(_9c0,_9c1){
if(!curam.util.Refresh.menuBarCallback){
curam.util.Refresh.menuBarCallback={updateMenuItemStates:_9c0,getRefreshParams:_9c1};
}
},setNavigationCallbacks:function(_9c2,_9c3){
if(!curam.util.Refresh.navigationCallback){
curam.util.Refresh.navigationCallback={updateNavItemStates:_9c2,getRefreshParams:_9c3};
}
},refreshMenuAndNavigation:function(_9c4,_9c5,_9c6,_9c7){
curam.debug.log("curam.util.Refresh.refreshMenuAndNavigation: "+"tabWidgetId=%s, refreshMenuBar || refreshNavigation: %s || %s",_9c4,_9c5,_9c6);
if(_9c7&&curam.util.Refresh.refreshedOnTabOpen[_9c4]){
curam.debug.log(_9bf.getProperty("curam.util.Refresh.stop"));
return;
}else{
if(_9c7&&!curam.util.Refresh.refreshedOnTabOpen[_9c4]){
curam.debug.log(_9bf.getProperty("curam.util.Refresh.tab.open"));
curam.util.Refresh.refreshedOnTabOpen[_9c4]=true;
}else{
curam.debug.log(_9bf.getProperty("curam.util.Refresh.detect.refresh"));
curam.debug.log(_9bf.getProperty("curam.util.Refresh.refresh"));
}
}
if(!_9c5&&!_9c6){
curam.debug.log(_9bf.getProperty("curam.util.Refresh.no.refresh"));
curam.util.Refresh.refreshedOnTabOpen[_9c4]=false;
return;
}
var _9c8={update:function(_9c9,_9ca,_9cb){
curam.debug.log(_9bf.getProperty("curam.util.Refresh.dynamic.refresh"),_9ca);
var ncb=curam.util.Refresh.navigationCallback;
curam.debug.log("refreshNavigation? ",_9c6);
if(_9c6&&_9ca.navData&&ncb){
ncb.updateNavItemStates(_9c9,_9ca);
}
var mcb=curam.util.Refresh.menuBarCallback;
curam.debug.log("refreshMenuBar? ",_9c5);
if(_9c5&&_9ca.menuData&&mcb){
mcb.updateMenuItemStates(_9c9,_9ca);
}
},error:function(_9cc,_9cd){
curam.debug.log("========= "+_9bf.getProperty("curam.util.Refresh.dynamic.failure")+" ===========");
curam.debug.log(_9bf.getProperty("curam.util.Refresh.dynamic.error"),_9cc);
curam.debug.log(_9bf.getProperty("curam.util.Refresh.dynamic.args"),_9cd);
curam.debug.log("==================================================");
}};
var _9ce="servlet/JSONServlet?o3c=TAB_DYNAMIC_STATE_QUERY";
var mcb=curam.util.Refresh.menuBarCallback;
if(_9c5&&mcb){
var _9cf=mcb.getRefreshParams(_9c4);
if(_9cf){
_9ce+="&"+_9cf;
}
}
var ncb=curam.util.Refresh.navigationCallback;
if(_9c6&&ncb){
var _9d0=ncb.getRefreshParams(_9c4);
if(_9d0){
_9ce+="&"+_9d0;
}
}
curam.debug.log(_9bf.getProperty("curam.util.Refresh.dynamic.refresh.req"));
_9be.post({url:_9ce,handleAs:"json",preventCache:true,load:dojo.hitch(_9c8,"update",_9c4),error:dojo.hitch(_9c8,"error")});
},addConfig:function(_9d1){
var _9d2=false;
dojo.forEach(curam.util.Refresh.refreshConfig,function(_9d3){
if(_9d3.tab==_9d1.tab){
_9d3.config=_9d1.config;
_9d2=true;
}
});
if(!_9d2){
curam.util.Refresh.refreshConfig.push(_9d1);
}
},setupRefreshController:function(_9d4){
curam.debug.log("curam.util.Refresh.setupRefreshController "+_9bf.getProperty("curam.util.ExpandableLists.load.for"),_9d4);
var _9d5=dijit.byId(_9d4);
var _9d6=_9d5.tabDescriptor.tabID;
var _9d7=dojo.filter(curam.util.Refresh.refreshConfig,function(item){
return item.tab==_9d6;
});
if(_9d7.length==1){
var _9d8=_9d7[0];
var ctl=new curam.util.ui.refresh.TabRefreshController(_9d4,_9d8);
curam.util.Refresh._controllers[_9d4]=ctl;
ctl.setRefreshHandler(curam.util.Refresh.handleRefreshEvent);
}else{
if(_9d7.length==0){
curam.debug.log(_9bf.getProperty("curam.util.Refresh.no.dynamic.refresh"),_9d4);
var ctl=new curam.util.ui.refresh.TabRefreshController(_9d4,null);
curam.util.Refresh._controllers[_9d4]=ctl;
}else{
throw "curam.util.Refresh: multiple dynamic refresh "+"configurations found for tab "+_9d4;
}
}
curam.tab.executeOnTabClose(function(){
curam.util.Refresh._controllers[_9d4].destroy();
curam.util.Refresh._controllers[_9d4]=undefined;
},_9d4);
},getController:function(_9d9){
var ctl=curam.util.Refresh._controllers[_9d9];
if(!ctl){
throw "Refresh controller for tab '"+_9d9+"' not found!";
}
return ctl;
},handleOnloadNestedInlinePage:function(_9da,_9db){
curam.debug.log("curam.util.Refresh.handleOnloadNestedInlinePage "+_9bf.getProperty("curam.util.Refresh.iframe",[_9da,_9db]));
var _9dc=curam.util.getTopmostWindow();
var _9dd=undefined;
var _9de=curam.tab.getSelectedTab();
if(_9de){
_9dd=curam.tab.getTabWidgetId(_9de);
}
if(_9dd){
curam.debug.log(_9bf.getProperty("curam.util.Refresh.parent"),_9dd);
_9dc.curam.util.Refresh.getController(_9dd).pageLoaded(_9db.pageID,curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_INLINE);
_9dc.dojo.publish("/curam/main-content/page/loaded",[_9db.pageID,_9dd]);
return true;
}
return false;
},handleRefreshEvent:function(_9df){
var _9e0=function(_9e1){
curam.util.ContextPanel.refresh(dijit.byId(_9e1));
};
var _9e2=function(_9e3){
curam.tab.refreshMainContentPanel(dijit.byId(_9e3));
};
var _9e4=function(_9e5,_9e6,_9e7){
curam.util.Refresh.refreshMenuAndNavigation(_9e5,_9e6,_9e7);
};
curam.util.Refresh._doRefresh(_9df,_9e0,_9e2,_9e4);
},_doRefresh:function(_9e8,_9e9,_9ea,_9eb){
var _9ec=null;
var _9ed=false;
var _9ee=false;
var _9ef=false;
var _9f0=false;
var trc=curam.util.ui.refresh.TabRefreshController.prototype;
dojo.forEach(_9e8,function(_9f1){
var _9f2=_9f1.lastIndexOf("/");
var _9f3=_9f1.slice(0,_9f2);
if(!_9ec){
_9ec=_9f1.slice(_9f2+1,_9f1.length);
}
if(_9f3==trc.EVENT_REFRESH_MENU){
_9ed=true;
}
if(_9f3==trc.EVENT_REFRESH_NAVIGATION){
_9ee=true;
}
if(_9f3==trc.EVENT_REFRESH_CONTEXT){
_9ef=true;
}
if(_9f3==trc.EVENT_REFRESH_MAIN){
_9f0=true;
}
});
if(_9ef){
_9e9(_9ec);
}
if(_9f0){
_9ea(_9ec);
}
_9eb(_9ec,_9ed,_9ee);
},setupRefreshButton:function(_9f4){
dojo.ready(function(){
var _9f5=dojo.query("."+_9f4)[0];
if(!_9f5){
throw "Refresh button not found: "+_9f4;
}
curam.util.Refresh._pageRefreshButton=_9f5;
var href=window.location.href;
if(curam.util.isActionPage(href)){
dojo.addClass(_9f5,"disabled");
curam.util.Refresh._pageRefreshButton._curamDisable=true;
}else{
dojo.addClass(_9f5,"enabled");
curam.util.Refresh._pageRefreshButton["_curamDisable"]=undefined;
}
curam.util.getTopmostWindow().curam.util.setupPreferencesLink(href);
});
},refreshPage:function(_9f6){
dojo.stopEvent(_9f6);
var href=window.location.href;
var _9f7=curam.util.Refresh._pageRefreshButton._curamDisable;
if(_9f7){
return;
}
curam.util.FORCE_REFRESH=true;
curam.util.redirectWindow(href,true);
}});
return curam.util.Refresh;
});
},"curam/util/ContextPanel":function(){
define("curam/util/ContextPanel",["curam/util","curam/tab","curam/debug","curam/define","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _9f8=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.ContextPanel",{CONTENT_URL_ATTRIB:"data-content-url",setupLoadEventPublisher:function(_9f9,_9fa,_9fb){
curam.util.ContextPanel._doSetup(_9f9,_9fa,_9fb,function(_9fc){
return dijit.byId(_9fc);
});
},_doSetup:function(_9fd,_9fe,_9ff,_a00){
var _a01=curam.util.getTopmostWindow().dojo.subscribe(_9fd,function(){
var tab=_a00(_9fe);
var _a02=curam.util.ContextPanel._getIframe(tab);
curam.debug.log(_9f8.getProperty("curam.util.ContextPanel.loaded"));
curam.util.getTopmostWindow().dojo.publish("/curam/frame/detailsPanelLoaded",[{loaded:true},_9fe]);
_a02._finishedLoading=true;
if(_a02._scheduledRefresh){
curam.util.ContextPanel.refresh(tab);
_a02._scheduledRefresh=false;
}
});
curam.util.onLoad.addSubscriber(_9ff,curam.util.ContextPanel.addTitle);
curam.tab.unsubscribeOnTabClose(_a01,_9fe);
curam.tab.executeOnTabClose(function(){
curam.util.onLoad.removeSubscriber(_9ff,curam.util.ContextPanel.addTitle);
},_9fe);
},refresh:function(tab){
var _a03=curam.util.ContextPanel._getIframe(tab);
if(_a03){
curam.debug.log(_9f8.getProperty("curam.util.ContextPanel.refresh.prep"));
if(_a03._finishedLoading){
curam.debug.log(_9f8.getProperty("curam.util.ContextPanel.refresh"));
_a03._finishedLoading=false;
var doc=_a03.contentDocument||_a03.contentWindow.document;
doc.location.reload(true);
}else{
curam.debug.log(_9f8.getProperty("curam.util.ContextPanel.refresh.delay"));
_a03._scheduledRefresh=true;
}
}
},_getIframe:function(tab){
var _a04=dojo.query("iframe.detailsPanelFrame",tab.domNode);
return _a04[0];
},addTitle:function(_a05){
var _a06=dojo.query("."+_a05)[0];
var _a07=_a06.contentWindow.document.title;
_a06.setAttribute("title",CONTEXT_PANEL_TITLE+" - "+_a07);
},load:function(tab){
var _a08=curam.util.ContextPanel._getIframe(tab);
if(_a08){
var _a09=dojo.attr(_a08,curam.util.ContextPanel.CONTENT_URL_ATTRIB);
if(_a09&&_a09!="undefined"){
_a08[curam.util.ContextPanel.CONTENT_URL_ATTRIB]=undefined;
dojo.attr(_a08,"src",_a09);
}
}
}});
var _a0a=curam.util.getTopmostWindow();
if(typeof _a0a._curamContextPanelTabReadyListenerRegistered!="boolean"){
_a0a.dojo.subscribe("/curam/application/tab/ready",null,function(_a0b){
curam.util.ContextPanel.load(_a0b);
});
_a0a._curamContextPanelTabReadyListenerRegistered=true;
}
return curam.util.ContextPanel;
});
},"curam/util":function(){
define("curam/util",["dojo/dom","dijit/registry","dojo/dom-construct","dojo/ready","dojo/_base/window","dojo/dom-style","dojo/_base/array","dojo/dom-class","dojo/topic","dojo/_base/event","dojo/query","dojo/has","dojo/_base/unload","dojo/dom-geometry","dojo/_base/json","dojo/dom-attr","dojo/_base/lang","dojo/on","curam/define","curam/debug","curam/util/RuntimeContext","curam/util/Constants","dojo/_base/sniff","cm/_base/_dom","curam/util/ResourceBundle"],function(dom,_a0c,_a0d,_a0e,_a0f,_a10,_a11,_a12,_a13,_a14,_a15,has,_a16,geom,json,attr,lang,on){
dojo.requireLocalization("curam.application","Debug");
var _a17=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util",{PREVENT_CACHE_FLAG:"o3pc",INFORMATIONAL_MSGS_STORAGE_ID:"__informationals__",ERROR_MESSAGES_CONTAINER:"error-messages-container",ERROR_MESSAGES_LIST:"error-messages",CACHE_BUSTER:0,CACHE_BUSTER_PARAM_NAME:"o3nocache",msgLocaleSelectorActionPage:"$not-locaized$ Usage of the Language Selector is not permitted from an editable page that has previously been submitted.",insertCssText:function(_a18,_a19){
var id=_a19?_a19:"_runtime_stylesheet_";
var _a1a=dom.byId(id);
var _a1b;
if(_a1a){
if(_a1a.styleSheet){
_a18=_a1a.styleSheet.cssText+_a18;
_a1b=_a1a;
_a1b.setAttribute("id","_nodeToRm");
}else{
_a1a.appendChild(document.createTextNode(_a18));
return;
}
}
var pa=document.getElementsByTagName("head")[0];
_a1a=_a0d.create("style",{type:"text/css",id:id});
if(_a1a.styleSheet){
_a1a.styleSheet.cssText=_a18;
}else{
_a1a.appendChild(document.createTextNode(_a18));
}
pa.appendChild(_a1a);
if(_a1b){
_a1b.parentNode.removeChild(_a1b);
}
},fireRefreshTreeEvent:function(){
if(dojo.global.parent&&dojo.global.parent.amIFrame){
var wpl=dojo.global.parent.loader;
}
if(wpl&&wpl.dojo){
wpl.dojo.publish("refreshTree");
}
},firePageSubmittedEvent:function(_a1c){
require(["curam/tab"],function(){
var _a1d=curam.tab.getSelectedTab();
if(_a1d){
var _a1e=curam.tab.getTabWidgetId(_a1d);
var _a1f=curam.util.getTopmostWindow();
var ctx=(_a1c=="dialog")?curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_DIALOG:curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN;
_a1f.curam.util.Refresh.getController(_a1e).pageSubmitted(dojo.global.jsPageID,ctx);
_a1f.dojo.publish("/curam/main-content/page/submitted",[dojo.global.jsPageID,_a1e]);
}else{
curam.debug.log("/curam/main-content/page/submitted: "+_a17.getProperty("curam.util.no.open"));
}
});
},fireTabOpenedEvent:function(_a20){
curam.util.getTopmostWindow().dojo.publish("curam.tabOpened",[dojo.global.jsPageID,_a20]);
},setupSubmitEventPublisher:function(){
_a0e(function(){
var form=dom.byId("mainForm");
if(form){
curam.util.connect(form,"onsubmit",function(){
curam.util.firePageSubmittedEvent("main-content");
});
}
});
},getScrollbar:function(){
var _a21=_a0d.create("div",{},_a0f.body());
_a10.set(_a21,{width:"100px",height:"100px",overflow:"scroll",position:"absolute",top:"-300px",left:"0px"});
var test=_a0d.create("div",{},_a21);
_a10.set(test,{width:"400px",height:"400px"});
var _a22=_a21.offsetWidth-_a21.clientWidth;
_a0d.destroy(_a21);
return {width:_a22};
},isModalWindow:function(){
return (dojo.global.curamModal===undefined)?false:true;
},getTopmostWindow:function(){
if(typeof (dojo.global._curamTopmostWindow)=="undefined"){
var _a23=dojo.global;
if(typeof (dojo.global.jsScreenContext)!="undefined"&&dojo.global.jsScreenContext.hasContextBits("CONTEXT_PORTLET")){
dojo.global._curamTopmostWindow=_a23;
}else{
if(_a23.__extAppTopWin){
dojo.global._curamTopmostWindow=_a23;
}else{
while(_a23.parent!=_a23){
_a23=_a23.parent;
if(_a23.__extAppTopWin){
break;
}
}
dojo.global._curamTopmostWindow=_a23;
}
}
}
if(dojo.global._curamTopmostWindow.location.href.indexOf("AppController.do")<0&&typeof (dojo.global._curamTopmostWindow.__extAppTopWin)=="undefined"){
curam.debug.log(_a17.getProperty("curam.util.wrong.window")+dojo.global._curamTopmostWindow.location.href);
}
return dojo.global._curamTopmostWindow;
},getUrlParamValue:function(url,_a24){
var qPos=url.indexOf("?");
if(qPos<0){
return null;
}
var _a25=url.substring(qPos+1,url.length);
function _a26(_a27){
var _a28=_a25.split(_a27);
_a24+="=";
for(var i=0;i<_a28.length;i++){
if(_a28[i].indexOf(_a24)==0){
return _a28[i].split("=")[1];
}
}
};
return _a26("&")||_a26("");
},addUrlParam:function(href,_a29,_a2a,_a2b){
var hasQ=href.indexOf("?")>-1;
var _a2c=_a2b?_a2b:"undefined";
if(!hasQ||(_a2c==false)){
return href+(hasQ?"&":"?")+_a29+"="+_a2a;
}else{
var _a2d=href.split("?");
href=_a2d[0]+"?"+_a29+"="+_a2a+(_a2d[1]!=""?("&"+_a2d[1]):"");
return href;
}
},replaceUrlParam:function(href,_a2e,_a2f){
href=curam.util.removeUrlParam(href,_a2e);
return curam.util.addUrlParam(href,_a2e,_a2f);
},removeUrlParam:function(url,_a30,_a31){
var qPos=url.indexOf("?");
if(qPos<0){
return url;
}
if(url.indexOf(_a30+"=")<0){
return url;
}
var _a32=url.substring(qPos+1,url.length);
var _a33=_a32.split("&");
var _a34;
var _a35,_a36;
for(var i=0;i<_a33.length;i++){
if(_a33[i].indexOf(_a30+"=")==0){
_a36=false;
if(_a31){
_a35=_a33[i].split("=");
if(_a35.length>1){
if(_a35[1]==_a31){
_a36=true;
}
}else{
if(_a31==""){
_a36=true;
}
}
}else{
_a36=true;
}
if(_a36){
_a33.splice(i,1);
i--;
}
}
}
return url.substring(0,qPos+1)+_a33.join("&");
},stripHash:function(url){
var idx=url.indexOf("#");
if(idx<0){
return url;
}
return url.substring(0,url);
},isSameUrl:function(_a37,_a38,rtc){
if(!_a38){
_a38=rtc.getHref();
}
if(_a37.indexOf("#")==0){
return true;
}
var _a39=_a37.indexOf("#");
if(_a39>-1){
if(_a39==0){
return true;
}
var _a3a=_a37.split("#");
var _a3b=_a38.indexOf("#");
if(_a3b>-1){
if(_a3b==0){
return true;
}
_a38=_a38.split("#")[0];
}
return _a3a[0]==_a38;
}
var _a3c=function(url){
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
var here=curam.util.stripHash(rp(_a38,curam.util.Constants.RETURN_PAGE_PARAM));
var _a3d=curam.util.stripHash(rp(_a37,curam.util.Constants.RETURN_PAGE_PARAM));
var _a3e=_a3d.split("?");
var _a3f=here.split("?");
_a3f[0]=_a3c(_a3f[0]);
_a3e[0]=_a3c(_a3e[0]);
var _a40=(_a3f[0]==_a3e[0]||_a3f[0].match(_a3e[0]+"$")==_a3e[0]);
if(!_a40){
return false;
}
if(_a3f.length==1&&_a3e.length==1&&_a40){
return true;
}else{
var _a41;
var _a42;
if(typeof _a3f[1]!="undefined"&&_a3f[1]!=""){
_a41=_a3f[1].split("&");
}else{
_a41=new Array();
}
if(typeof _a3e[1]!="undefined"&&_a3e[1]!=""){
_a42=_a3e[1].split("&");
}else{
_a42=new Array();
}
curam.debug.log("curam.util.isSameUrl: paramsHere "+_a17.getProperty("curam.util.before")+_a41.length);
_a41=_a11.filter(_a41,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_a17.getProperty("curam.util.after")+_a41.length);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_a17.getProperty("curam.util.before")+_a42.length);
_a42=_a11.filter(_a42,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_a17.getProperty("curam.util.after")+_a42.length);
if(_a41.length!=_a42.length){
return false;
}
var _a43={};
var _a44;
for(var i=0;i<_a41.length;i++){
_a44=_a41[i].split("=");
_a43[_a44[0]]=_a44[1];
}
for(var i=0;i<_a42.length;i++){
_a44=_a42[i].split("=");
if(_a43[_a44[0]]!=_a44[1]){
curam.debug.log(_a17.getProperty("curam.util.no.match",[_a44[0],_a44[1],_a43[_a44[0]]]));
return false;
}
}
}
return true;
},isNotCDEJParam:function(_a45){
return !((_a45.charAt(0)=="o"&&_a45.charAt(1)=="3")||(_a45.charAt(0)=="_"&&_a45.charAt(1)=="_"&&_a45.charAt(2)=="o"&&_a45.charAt(3)=="3"));
},setAttributes:function(node,map){
for(var x in map){
node.setAttribute(x,map[x]);
}
},invalidatePage:function(){
curam.PAGE_INVALIDATED=true;
var _a46=dojo.global.dialogArguments?dojo.global.dialogArguments[0]:opener;
if(_a46&&_a46!=dojo.global){
try{
_a46.curam.util.invalidatePage();
}
catch(e){
curam.debug.log(_a17.getProperty("curam.util.error"),e);
}
}
},redirectWindow:function(href,_a47,_a48){
var rtc=new curam.util.RuntimeContext(dojo.global);
var _a49=function(_a4a,_a4b,href,_a4c,_a4d){
curam.util.getFrameRoot(_a4a,_a4b).curam.util.redirectContentPanel(href,_a4c,_a4d);
};
curam.util._doRedirectWindow(href,_a47,_a48,dojo.global.jsScreenContext,rtc,curam.util.publishRefreshEvent,_a49);
},_doRedirectWindow:function(href,_a4e,_a4f,_a50,rtc,_a51,_a52){
if(href&&curam.util.isActionPage(href)){
curam.debug.log(_a17.getProperty("curam.util.stopping"),href);
return;
}
var rpl=curam.util.replaceUrlParam;
var _a53=_a50.hasContextBits("TREE")||_a50.hasContextBits("AGENDA")||_a50.hasContextBits("ORG_TREE");
if(curam.util.FORCE_REFRESH){
href=rpl(rtc.getHref(),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
if(curam.util.isModalWindow()||_a53){
_a51();
dojo.global.location.href=href;
}else{
if(_a50.hasContextBits("LIST_ROW_INLINE_PAGE")||_a50.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(href);
}else{
_a51();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
require(["curam/tab"],function(){
_a52(dojo.global,curam.tab.getTabController().ROOT_OBJ,href,true,true);
});
}
}
}
return;
}
var u=curam.util;
var rtc=new curam.util.RuntimeContext(dojo.global);
if(!_a53&&!_a4e&&!curam.PAGE_INVALIDATED&&u.isSameUrl(href,null,rtc)){
return;
}
if(curam.util.isModalWindow()||_a53){
href=rpl(rpl(href,"o3frame","modal"),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
var form=_a0d.create("form",{action:href,method:"POST"});
if(!_a53){
if(!dom.byId("o3ctx")){
form.action=curam.util.removeUrlParam(form.action,"o3ctx");
var _a54=_a0d.create("input",{type:"hidden",id:"o3ctx",name:"o3ctx",value:_a50.getValue()},form);
}
_a0f.body().appendChild(form);
_a51();
form.submit();
}
if(!_a4f){
if(_a53){
curam.util.redirectFrame(href);
}
}
}else{
if(_a50.hasContextBits("LIST_ROW_INLINE_PAGE")||_a50.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(href);
}else{
_a51();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
if(_a50.hasContextBits("EXTAPP")){
var _a55=window.top;
_a55.dijit.byId("curam-app").updateMainContentIframe(href);
}else{
require(["curam/tab"],function(){
curam.util.getFrameRoot(dojo.global,curam.tab.getTabController().ROOT_OBJ).curam.util.redirectContentPanel(href,_a4e);
});
}
}
}
}
},_handleInlinePageRefresh:function(href){
curam.debug.log(_a17.getProperty("curam.util.closing.modal"),href);
var _a56=new curam.ui.PageRequest(href);
require(["curam/tab"],function(){
curam.tab.getTabController().checkPage(_a56,function(_a57){
curam.util.publishRefreshEvent();
dojo.global.location.reload(true);
});
});
},redirectContentPanel:function(url,_a58,_a59){
require(["curam/tab"],function(){
var _a5a=curam.tab.getContentPanelIframe();
var _a5b=url;
if(_a5a!=null){
var rpu=curam.util.Constants.RETURN_PAGE_PARAM;
var _a5c=null;
if(url.indexOf(rpu+"=")>=0){
curam.debug.log("curam.util.redirectContentPanel: "+_a17.getProperty("curam.util.rpu"));
_a5c=decodeURIComponent(curam.util.getUrlParamValue(url,rpu));
}
if(_a5c){
_a5c=curam.util.removeUrlParam(_a5c,rpu);
_a5b=curam.util.replaceUrlParam(url,rpu,encodeURIComponent(_a5c));
}
}
var _a5d=new curam.ui.PageRequest(_a5b);
if(_a58){
_a5d.forceLoad=true;
}
if(_a59){
_a5d.justRefresh=true;
}
curam.tab.getTabController().handlePageRequest(_a5d);
});
},redirectFrame:function(href){
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
var _a5e=curam.util.getFrameRoot(dojo.global,"wizard").targetframe;
_a5e.curam.util.publishRefreshEvent();
_a5e.location.href=href;
}else{
if(dojo.global.jsScreenContext.hasContextBits("ORG_TREE")){
var _a5e=curam.util.getFrameRoot(dojo.global,"orgTreeRoot");
_a5e.curam.util.publishRefreshEvent();
_a5e.dojo.publish("orgTree.refreshContent",[href]);
}else{
var _a5f=curam.util.getFrameRoot(dojo.global,"iegtree");
var _a60=_a5f.navframe||_a5f.frames[0];
var _a61=_a5f.contentframe||_a5f.frames["contentframe"];
_a61.curam.util.publishRefreshEvent();
if(curam.PAGE_INVALIDATED||_a60.curam.PAGE_INVALIDATED){
var _a62=curam.util.modifyUrlContext(href,"ACTION");
_a61.location.href=_a62;
}else{
_a61.location.href=href;
}
}
}
return true;
},publishRefreshEvent:function(){
_a13.publish("/curam/page/refresh");
},openGenericErrorModalDialog:function(_a63,_a64,_a65,_a66,_a67){
var url;
var _a68;
var sc=new curam.util.ScreenContext("MODAL");
var _a69="titlePropertyName="+_a64+"&";
var _a6a="messagePropertyName="+_a65+"&";
var _a6b="errorModal="+_a67+"&";
if(_a66){
_a68="messagePlaceholder1="+_a66+"&";
url="generic-modal-error.jspx?"+_a69+_a6a+_a68+_a6b+sc.toRequestString();
}else{
url="generic-modal-error.jspx?"+_a69+_a6a+sc.toRequestString();
}
curam.util.openModalDialog({href:url},_a63);
},openModalDialog:function(_a6c,_a6d,left,top,_a6e){
var href;
if(!_a6c||!_a6c.href){
_a6c=_a14.fix(_a6c);
var _a6f=_a6c.target;
while(_a6f.tagName!="A"&&_a6f!=_a0f.body()){
_a6f=_a6f.parentNode;
}
href=_a6f.href;
_a6f._isModal=true;
_a14.stop(_a6c);
}else{
href=_a6c.href;
_a6c._isModal=true;
}
require(["curam/dialog"]);
var opts=curam.dialog.parseWindowOptions(_a6d);
curam.util.showModalDialog(href,_a6c,opts["width"],opts["height"],left,top,false,null,null,_a6e);
return false;
},showModalDialog:function(url,_a70,_a71,_a72,left,top,_a73,_a74,_a75,_a76){
var _a77=curam.util.getTopmostWindow();
if(dojo.global!=_a77){
curam.debug.log("curam.util.showModalDialog: "+_a17.getProperty("curam.util.redirecting.modal"));
_a77.curam.util.showModalDialog(url,_a70,_a71,_a72,left,top,_a73,_a74,dojo.global,_a76);
return;
}
var rup=curam.util.replaceUrlParam;
url=rup(url,"o3frame","modal");
url=curam.util.modifyUrlContext(url,"MODAL","TAB|LIST_ROW_INLINE_PAGE|LIST_EVEN_ROW|NESTED_UIM");
url=rup(url,curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
curam.debug.log(_a17.getProperty("curam.util.modal.url"),url);
if(_a71){
_a71=typeof (_a71)=="number"?_a71:parseInt(_a71);
}
if(_a72){
_a72=typeof (_a72)=="number"?_a72:parseInt(_a72);
}
if(!curam.util._isModalCurrentlyOpening()){
curam.util._setModalCurrentlyOpening(true);
require(["curam/ModalDialog"]);
new curam.ModalDialog({href:url,width:_a71,height:_a72,openNode:(_a70&&_a70.target)?_a70.target:null,parentWindow:_a75,uimToken:_a76});
}
},_isModalCurrentlyOpening:function(){
return curam.util.getTopmostWindow().curam.util._modalOpenInProgress;
},_setModalCurrentlyOpening:function(_a78){
curam.util.getTopmostWindow().curam.util._modalOpenInProgress=_a78;
},setupPreferencesLink:function(href){
_a0e(function(){
var _a79=_a15(".user-preferences")[0];
if(_a79){
if(typeof (_a79._disconnectToken)=="undefined"){
_a79._disconnectToken=curam.util.connect(_a79,"onclick",curam.util.openPreferences);
}
if(!href){
href=dojo.global.location.href;
}
if(curam.util.isActionPage(href)){
_a12.replace(_a79,"disabled","enabled");
_a79._curamDisable=true;
}else{
_a12.replace(_a79,"enabled","disabled");
_a79._curamDisable=false;
}
}else{
curam.debug.log(_a17.getProperty("curam.util.no.setup"));
}
});
},openPreferences:function(_a7a){
_a14.stop(_a7a);
if(_a7a.target._curamDisable){
return;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("user-prefs-editor.jspx",{dialogOptions:"width=450"});
});
},openAbout:function(_a7b){
_a14.stop(_a7b);
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("about.jsp",{dialogOptions:"width=645,height=480"});
});
},addMinWidthCalendarCluster:function(id){
var _a7c=dom.byId(id);
var i=0;
function _a7d(evt){
_a11.forEach(_a7c.childNodes,function(node){
if(_a12.contains(node,"cluster")){
_a10.set(node,"width","97%");
if(node.clientWidth<700){
_a10.set(node,"width","700px");
}
}
});
};
if(has("ie")>6){
_a11.forEach(_a7c.childNodes,function(node){
if(_a12.contains(node,"cluster")){
_a10.set(node,"minWidth","700px");
}
});
}else{
on(dojo.global,"resize",_a7d);
_a0e(_a7d);
}
},addPopupFieldListener:function(id){
if(!has("ie")||has("ie")>6){
return;
}
if(!curam.util._popupFields){
function _a7e(evt){
var _a7f=0;
var j=0;
var x=0;
var arr=curam.util._popupFields;
_a11.forEach(curam.util._popupFields,function(id){
var _a80=dom.byId(id);
_a15("> .popup-actions",_a80).forEach(function(node){
_a7f=node.clientWidth+30;
});
_a15("> .desc",_a80).forEach(function(node){
_a10.set(node,"width",Math.max(0,_a80.clientWidth-_a7f)+"px");
});
});
};
curam.util._popupFields=[id];
on(dojo.global,"resize",_a7e);
_a0e(_a7e);
}else{
curam.util._popupFields.push(id);
}
},addContentWidthListener:function(id){
if(has("ie")>6){
return;
}
var _a81=_a10.set;
var _a82=_a12.contains;
function _a83(evt){
var i=0;
var _a84=dom.byId("content");
if(_a84){
var _a85=_a84.clientWidth;
if(has("ie")==6&&dom.byId("footer")){
var _a86=_a0f.body().clientHeight-100;
_a81(_a84,"height",_a86+"px");
var _a87=dom.byId("sidebar");
if(_a87){
_a81(_a87,"height",_a86+"px");
}
}
try{
_a15("> .page-title-bar",_a84).forEach(function(node){
var _a88=geom.getMarginSize(node).w-geom.getContentBox(node).w;
if(!has("ie")){
_a88+=1;
}
_a85=_a84.clientWidth-_a88;
_a10.set(node,"width",_a85+"px");
});
}
catch(e){
}
_a15("> .page-description",_a84).style("width",_a85+"px");
_a15("> .in-page-navigation",_a84).style("width",_a85+"px");
}
};
curam.util.subscribe("/clusterToggle",_a83);
curam.util.connect(dojo.global,"onresize",_a83);
_a0e(_a83);
},alterScrollableListBottomBorder:function(id,_a89){
var _a8a=_a89;
var _a8b="#"+id+" table";
function _a8c(){
var _a8d=_a15(_a8b)[0];
if(_a8d.offsetHeight>=_a8a){
var _a8e=_a15(".odd-last-row",_a8d)[0];
if(typeof _a8e!="undefined"){
_a12.add(_a8e,"no-bottom-border");
}
}else{
if(_a8d.offsetHeight<_a8a){
var _a8e=_a15(".even-last-row",_a8d)[0];
if(typeof _a8e!="undefined"){
_a12.add(_a8e,"add-bottom-border");
}
}else{
curam.debug.log("curam.util.alterScrollableListBottomBorder: "+_a17.getProperty("curam.util.code"));
}
}
};
_a0e(_a8c);
},addFileUploadResizeListener:function(code){
function _a8f(evt){
if(_a15(".widget")){
_a15(".widget").forEach(function(_a90){
var _a91=_a90.clientWidth;
if(_a15(".fileUpload",_a90)){
_a15(".fileUpload",_a90).forEach(function(_a92){
fileUploadWidth=_a91/30;
if(fileUploadWidth<4){
_a92.size=1;
}else{
_a92.size=fileUploadWidth;
}
});
}
});
}
};
on(dojo.global,"resize",_a8f);
_a0e(_a8f);
},openCenteredNonModalWindow:function(url,_a93,_a94,name){
_a93=Number(_a93);
_a94=Number(_a94);
var _a95=(screen.width-_a93)/2;
var _a96=(screen.height-_a94)/2;
_a94=_a96<0?screen.height:_a94;
_a96=Math.max(0,_a96);
_a93=_a95<0?screen.width:_a93;
_a95=Math.max(0,_a95);
var left="left",top="top";
if(has("ff")){
left="screenX",top="screenY";
}
var _a97="location=no, menubar=no, status=no, toolbar=no, "+"scrollbars=yes, resizable=no";
var _a98=dojo.global.open(url,name||"name","width="+_a93+", height="+_a94+", "+left+"="+_a95+","+top+"="+_a96+","+_a97);
_a98.resizeTo(_a93,_a94);
_a98.moveTo(_a95,_a96);
_a98.focus();
},adjustTargetContext:function(win,href){
if(win&&win.dojo.global.jsScreenContext){
var _a99=win.dojo.global.jsScreenContext;
_a99.updateStates(dojo.global.jsScreenContext);
return curam.util.replaceUrlParam(href,"o3ctx",_a99.getValue());
}
return href;
},modifyUrlContext:function(url,_a9a,_a9b){
var _a9c=url;
var ctx=new curam.util.ScreenContext();
var _a9d=curam.util.getUrlParamValue(url,"o3ctx");
if(_a9d){
ctx.setContext(_a9d);
}else{
ctx.clear();
}
if(_a9a){
ctx.addContextBits(_a9a);
}
if(_a9b){
ctx.clear(_a9b);
}
_a9c=curam.util.replaceUrlParam(url,"o3ctx",ctx.getValue());
return _a9c;
},updateCtx:function(_a9e){
var _a9f=curam.util.getUrlParamValue(_a9e,"o3ctx");
if(!_a9f){
return _a9e;
}
return curam.util.modifyUrlContext(_a9e,null,"MODAL");
},getFrameRoot:function(_aa0,_aa1){
var _aa2=false;
var _aa3=_aa0;
if(_aa3){
while(_aa3!=top&&!_aa3.rootObject){
_aa3=_aa3.parent;
}
if(_aa3.rootObject){
_aa2=(_aa3.rootObject==_aa1);
}
}
return _aa2?_aa3:null;
},saveInformationalMsgs:function(_aa4){
curam.util.runStorageFn(function(){
try{
var _aa5=curam.util.getTopmostWindow().dojox;
_aa5.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,json.toJson({pageID:_a0f.body().id,total:dom.byId(curam.util.ERROR_MESSAGES_CONTAINER).innerHTML,listItems:dom.byId(curam.util.ERROR_MESSAGES_LIST).innerHTML}));
}
catch(e){
curam.debug.log(_a17.getProperty("curam.util.exception"),e);
}
},_aa4);
},runStorageFn:function(fn,_aa6){
var _aa7=function(){
fn();
if(_aa6){
setTimeout(_aa6,10);
}
};
var _aa8=curam.util.getTopmostWindow().dojox;
require(["dojox/storage"],function(){
var mgr=_aa8.storage.manager;
if(mgr.isInitialized()){
_aa7();
}else{
if(mgr.addOnLoad){
mgr.addOnLoad(_aa7);
}else{
var _aa9={exp:_aa7};
on(mgr,"loaded",_aa9,"exp");
}
}
});
},disableInformationalLoad:function(){
curam.util._informationalsDisabled=true;
},redirectDirectUrl:function(){
_a0e(function(){
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
_a0e(function(){
if(dojo.global.jsScreenContext.hasContextBits("CONTEXT_PANEL")){
return;
}
if(curam.util._informationalsDisabled){
return;
}
curam.util.runStorageFn(function(){
var _aaa=curam.util.getTopmostWindow().dojox;
var msgs=_aaa.storage.get(curam.util.INFORMATIONAL_MSGS_STORAGE_ID);
if(msgs&&msgs!=""){
msgs=json.fromJson(msgs);
_aaa.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,"");
var div=dom.byId(curam.util.ERROR_MESSAGES_CONTAINER);
var list=dom.byId(curam.util.ERROR_MESSAGES_LIST);
if(msgs.pageID!=_a0f.body().id){
return;
}
if(list){
var _aab=_a0d.create("ul",{innerHTML:msgs.listItems});
var _aac=[];
for(var i=0;i<list.childNodes.length;i++){
if(list.childNodes[i].tagName=="LI"){
_aac.push(list.childNodes[i]);
}
}
var skip=false;
var _aad=_aab.childNodes;
for(var i=0;i<_aad.length;i++){
skip=false;
for(var j=0;j<_aac.length;j++){
if(_aad[i].innerHTML==_aac[j].innerHTML){
skip=true;
break;
}
}
if(!skip){
list.appendChild(_aad[i]);
i--;
}
}
}else{
if(div){
div.innerHTML=msgs.total;
}
}
}
var _aae=dojo.byId("error-messages");
if(_aae&&!dojo.global.jsScreenContext.hasContextBits("MODAL")){
_aae.focus();
}
});
});
},setFocus:function(){
var _aaf=curam.util.getUrlParamValue(dojo.global.location.href,"o3frame")=="modal";
if(!_aaf){
_a0e(curam.util.doSetFocus);
}
},doSetFocus:function(){
var _ab0=-1;
var _ab1=-1;
var form=document.forms[0];
if(!form){
return false;
}
var _ab2=form.elements;
var l=_ab2.length;
var elem;
for(var i=0;i<l;i++){
elem=_ab2[i];
if(_ab0==-1&&(elem.type=="select-one"||elem.type=="text"||elem.tagName=="TEXTAREA")&&!_a12.contains(elem,"dijitArrowButtonInner")&&!_a12.contains(elem,"dijitValidationInner")){
_ab0=i;
}
if(elem.tabIndex=="1"){
elem.tabIndex=0;
_ab1=i;
break;
}
}
var elem;
if(_ab1!=-1){
elem=_ab2[_ab1];
}else{
if(_ab0!=-1){
elem=_ab2[_ab0];
}
}
try{
var _ab3=dojo.byId("error-messages");
if(_ab3){
_ab3.focus();
}else{
elem.focus();
}
}
catch(e){
curam.debug.log(_a17.getProperty("curam.util.error.focus"),e.message);
return false;
}
return true;
},openLocaleSelector:function(_ab4){
_ab4=_a14.fix(_ab4);
var _ab5=_ab4.target;
while(_ab5&&_ab5.tagName!="A"){
_ab5=_ab5.parentNode;
}
var loc=_ab5.href;
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
var _ab6=curam.util.getLastPathSegmentWithQueryString(url);
var _ab7=_ab6.split("?")[0];
return _ab7.indexOf("Action.do")>-1;
},closeLocaleSelector:function(_ab8){
_ab8=_a14.fix(_ab8);
_a14.stop(_ab8);
dojo.global.close();
return false;
},getSuffixFromClass:function(node,_ab9){
var _aba=attr.get(node,"class").split(" ");
var _abb=_a11.filter(_aba,function(_abc){
return _abc.indexOf(_ab9)==0;
});
if(_abb.length>0){
return _abb[0].split(_ab9)[1];
}else{
return null;
}
},getCacheBusterParameter:function(){
return this.CACHE_BUSTER_PARAM_NAME+"="+new Date().getTime()+"_"+this.CACHE_BUSTER++;
},stripeTable:function(_abd,_abe,_abf){
var _ac0=_abd.tBodies[0];
var _ac1=(_abe?2:1);
if(_ac0.rows.length<_ac1){
return;
}
var rows=_ac0.rows;
for(var i=0;i<rows.length;i+=_ac1){
curam.debug.log("curam.util.stripeTable(%s, %s): i = %s",_abd,_abe,i);
var _ac2=[rows[i]];
if(_abe&&rows[i+1]){
_ac2.push(rows[i+1]);
}
_a11.forEach(_ac2,function(row){
_a12.remove(row,"odd-last-row");
_a12.remove(row,"even-last-row");
});
if(i%(2*_ac1)==0){
_a11.forEach(_ac2,function(row){
cm.replaceClass(row,"odd","even");
});
if(i==_abf){
_a11.forEach(_ac2,function(row){
_a12.add(row,"odd-last-row");
});
}
}else{
_a11.forEach(_ac2,function(row){
cm.replaceClass(row,"even","odd");
});
if(i==_abf){
_a11.forEach(_ac2,function(row){
_a12.add(row,"even-last-row");
});
}
}
}
},fillString:function(_ac3,_ac4){
var _ac5="";
while(_ac4>0){
_ac5+=_ac3;
_ac4-=1;
}
return _ac5;
},updateHeader:function(qId,_ac6,_ac7,_ac8){
var _ac9=dom.byId("header_"+qId);
_ac9.firstChild.nextSibling.innerHTML=_ac6;
answerCell=dom.byId("chosenAnswer_"+qId);
answerCell.innerHTML=_ac7;
sourceCell=dom.byId("chosenSource_"+qId);
sourceCell.innerHTML=_ac8;
},search:function(_aca,_acb){
var _acc=_a0c.byId(_aca).get("value");
var _acd=_a0c.byId(_acb);
var _ace=_acd?_acd.get("value"):null;
var _acf="";
var _ad0;
var _ad1;
if(_ace){
_ad1=_ace.split("|");
_acf=_ad1[0];
_ad0=_ad1[1];
}
var _ad2=curam.util.defaultSearchPageID;
var _ad3="";
if(_acf===""){
_ad3=_ad2+"Page.do?searchText="+encodeURIComponent(_acc);
}else{
_ad3=_ad0+"Page.do?searchText="+encodeURIComponent(_acc)+"&searchType="+encodeURIComponent(_acf);
}
var _ad4=new curam.ui.PageRequest(_ad3);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_ad4);
});
},updateDefaultSearchText:function(_ad5,_ad6){
var _ad7=_a0c.byId(_ad5);
var _ad8=_a0c.byId(_ad6);
var _ad9=_ad7?_ad7.get("value"):null;
var str=_ad9.split("|")[2];
_ad8.set("placeHolder",str);
},updateSearchBtnState:function(_ada,_adb){
var _adc=_a0c.byId(_ada);
var btn=dom.byId(_adb);
var _add=_adc.get("value");
if(!_add||lang.trim(_add).length<1){
_a12.add(btn,"dijitDisabled");
}else{
_a12.remove(btn,"dijitDisabled");
}
},furtherOptionsSearch:function(){
var _ade=curam.util.furtherOptionsPageID+"Page.do";
var _adf=new curam.ui.PageRequest(_ade);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_adf);
});
},searchButtonStatus:function(_ae0){
var btn=dojo.byId(_ae0);
if(!dojo.hasClass(btn,"dijitDisabled")){
return true;
}
},getPageHeight:function(){
var _ae1=400;
var _ae2=0;
if(_a15("frameset").length>0){
curam.debug.log("curam.util.getPageHeight() "+_a17.getProperty("curam.util.default.height"),_ae1);
_ae2=_ae1;
}else{
var _ae3=function(node){
if(!node){
curam.debug.log(_a17.getProperty("curam.util.node"));
return 0;
}
var mb=geom.getMarginSize(node);
var pos=geom.position(node);
return pos.y+mb.h;
};
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")){
var _ae4=_a15("div.bottom")[0];
var _ae5=_ae3(_ae4);
curam.debug.log(_a17.getProperty("curam.util.page.height"),_ae5);
curam.debug.log(_a17.getProperty("curam.util.ie7.issue"));
_ae2=_ae5+1;
}else{
var _ae6=dom.byId("content")||dom.byId("wizard-content");
var _ae7=_a15("> *",_ae6).filter(function(n){
return n.tagName.indexOf("SCRIPT")<0&&_a10.get(n,"visibility")!="hidden"&&_a10.get(n,"display")!="none";
});
var _ae8=_ae7[0];
for(var i=1;i<_ae7.length;i++){
if(_ae3(_ae7[i])>=_ae3(_ae8)){
_ae8=_ae7[i];
}
}
_ae2=_ae3(_ae8);
curam.debug.log("curam.util.getPageHeight() "+_a17.getProperty("curam.util.base.height"),_ae2);
var _ae9=_a15(".actions-panel",_a0f.body());
if(_ae9.length>0){
var _aea=geom.getMarginBox(_ae9[0]).h;
curam.debug.log("curam.util.getPageHeight() "+_a17.getProperty("curam.util.panel.height"));
_ae2+=_aea;
_ae2+=10;
}
var _aeb=_a15("body.details");
if(_aeb.length>0){
curam.debug.log("curam.util.getPageHeight() "+_a17.getProperty("curam.util.bar.height"));
_ae2+=20;
}
}
}
curam.debug.log("curam.util.getPageHeight() "+_a17.getProperty("curam.util.returning"),_ae2);
return _ae2;
},toCommaSeparatedList:function(_aec){
var _aed="";
for(var i=0;i<_aec.length;i++){
_aed+=_aec[i];
if(i<_aec.length-1){
_aed+=",";
}
}
return _aed;
},skipLinkFocus:function(){
var dest=dojo.byId("skip-dest");
if(dest){
dest.focus();
}
},setupGenericKeyHandler:function(){
_a0e(function(){
var f=function(_aee){
if(dojo.global.jsScreenContext.hasContextBits("MODAL")&&_aee.keyCode==27){
var ev=_a14.fix(_aee);
var _aef=_a0c.byId(ev.target.id);
var _af0=typeof _aef!="undefined"&&_aef.baseClass=="dijitTextBox dijitComboBox";
if(!_af0){
curam.dialog.closeModalDialog();
}
}
if(_aee.keyCode==13){
var ev=_a14.fix(_aee);
var _af1=ev.target.type=="text";
var _af2=ev.target.type=="radio";
var _af3=ev.target.type=="checkbox";
var _af4=ev.target.type=="select-multiple";
var _af5=ev.target.type=="password";
var _af6=_a0c.byId(ev.target.id);
if(typeof _af6!="undefined"){
var _af7=_a0c.byNode(dojo.byId("widget_"+ev.target.id));
if(_af7&&_af7.enterKeyOnOpenDropDown){
_af7.enterKeyOnOpenDropDown=false;
return false;
}
}
var _af8=typeof _af6!="undefined"&&_af6.baseClass=="dijitComboBox";
if((!_af1&&!_af2&&!_af3&&!_af4&&!_af5)||_af8){
return true;
}
var _af9=null;
var _afa=_a15(".curam-default-action");
if(_afa.length>0){
_af9=_afa[0];
}else{
var _afb=_a15("input[type='submit']");
if(_afb.length>0){
_af9=_afb[0];
}
}
if(_af9!=null){
_a14.stop(_a14.fix(_aee));
curam.util.clickButton(_af9);
return false;
}
dojo.require("curam.dateSelectorUtil");
var _afc=dojo.byId("year");
if(_afc){
dojo.stopEvent(dojo.fixEvent(_aee));
curam.dateSelectorUtil.updateCalendar();
}
}
return true;
};
curam.util.connect(_a0f.body(),"onkeyup",f);
});
},enterKeyPress:function(_afd){
if(_afd.keyCode==13){
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
var _afe=elem.parentElement.parentElement.id;
var _aff=dojo.byId("end-"+_afe);
if(_aff){
_aff.focus();
}
}
}
},focusHelpIconOnTab:function(e){
if(!e.shiftKey&&e.keyCode==9){
var _b00=dojo.query(".dijitDialogHelpIcon")[0];
if(_b00){
setTimeout(function(){
_b00.focus();
},5);
}
}
},swapState:function(node,_b01,_b02,_b03){
if(_b01){
_a12.replace(node,_b02,_b03);
}else{
_a12.replace(node,_b03,_b02);
}
},makeQueryString:function(_b04){
if(!_b04||_b04.length==0){
return "";
}
var _b05=[];
for(var _b06 in _b04){
_b05.push(_b06+"="+encodeURIComponent(_b04[_b06]));
}
return "?"+_b05.join("&");
},clickHandlerForListActionMenu:function(url,_b07,_b08,_b09){
if(_b07){
var href=curam.util.replaceUrlParam(url,"o3frame","modal");
var ctx=dojo.global.jsScreenContext;
ctx.addContextBits("MODAL");
href=curam.util.replaceUrlParam(href,"o3ctx",ctx.getValue());
curam.util.redirectWindow(href);
return;
}
var _b0a={href:url};
require(["curam/ui/UIMPageAdaptor"]);
if(curam.ui.UIMPageAdaptor.allowLinkToContinue(_b0a)){
dojo.global.location=url;
return;
}
if(_b0a!=null){
if(_b09){
_a14.fix(_b09);
_a14.stop(_b09);
}
if(!_b0a.href||_b0a.href.length==0){
return;
}
if(_b08&&!curam.util.isInternal(url)){
dojo.global.open(url);
}else{
if(curam.ui.UIMPageAdaptor.isLinkValidForTabProcessing(_b0a)){
var _b0b=new curam.ui.PageRequest(_b0a.href);
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")||dojo.global.jsScreenContext.hasContextBits("NESTED_UIM")){
_b0b.pageHolder=dojo.global;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_b0b);
});
}
}
}
},clickHandlerForMailtoLinks:function(_b0c,url){
dojo.stopEvent(_b0c);
var _b0d=dojo.query("#mailto_frame")[0];
if(!_b0d){
_b0d=dojo.io.iframe.create("mailto_frame","");
}
_b0d.src=url;
return false;
},isInternal:function(url){
var path=url.split("?")[0];
var _b0e=path.match("Page.do");
if(_b0e!=null){
return true;
}
return false;
},getLastPathSegmentWithQueryString:function(url){
var _b0f=url.split("?");
var _b10=_b0f[0].split("/");
return _b10[_b10.length-1]+(_b0f[1]?"?"+_b0f[1]:"");
},replaceSubmitButton:function(name){
if(curam.replacedButtons[name]=="true"){
return;
}
var _b11="__o3btn."+name;
var _b12;
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_b12=_a15("input[id='"+_b11+"']");
}else{
_b12=_a15("input[name='"+_b11+"']");
}
_b12.forEach(function(_b13,_b14,_b15){
_b13.tabIndex=-1;
var _b16=_b13.parentNode;
var _b17="btn-id-"+_b14;
curam.util.setupWidgetLoadMask("a."+_b17);
var _b18="ac initially-hidden-widget "+_b17;
if(_a12.contains(_b13,"first-action-control")){
_b18+=" first-action-control";
}
var _b19=_a0d.create("a",{"class":_b18,href:"#"},_b13,"before");
var _b1a=dojo.query(".page-level-menu")[0];
if(_b1a){
dojo.attr(_b19,"title",_b13.value);
}
_a0d.create("span",{"class":"filler"},_b19,"before");
var left=_a0d.create("span",{"class":"left-corner"},_b19);
var _b1b=_a0d.create("span",{"class":"right-corner"},left);
var _b1c=_a0d.create("span",{"class":"middle"},_b1b);
_b1c.appendChild(document.createTextNode(_b13.value));
curam.util.addActionControlClass(_b19);
on(_b19,"click",function(_b1d){
curam.util.clickButton(this._submitButton);
_a14.stop(_b1d);
});
_b19._submitButton=_b15[0];
_a12.add(_b13,"hidden-button");
});
curam.replacedButtons[name]="true";
},setupWidgetLoadMask:function(_b1e){
curam.util.subscribe("/curam/page/loaded",function(){
var _b1f=_a15(_b1e)[0];
if(_b1f){
_a10.set(_b1f,"visibility","visible");
}else{
curam.debug.log("setupButtonLoadMask: "+_a17.getProperty("curam.util.not.found")+"'"+_b1e+"'"+_a17.getProperty("curam.util.ignore.mask"));
}
});
},optReplaceSubmitButton:function(name){
if(curam.util.getFrameRoot(dojo.global,"wizard")==null){
curam.util.replaceSubmitButton(name);
return;
}
var _b20=curam.util.getFrameRoot(dojo.global,"wizard").navframe.wizardNavigator;
if(_b20.delegatesSubmit[jsPageID]!="assumed"){
curam.util.replaceSubmitButton(name);
}
},clickButton:function(_b21){
var _b22=dom.byId("mainForm");
var _b23;
if(!_b21){
curam.debug.log("curam.util.clickButton: "+_a17.getProperty("curam.util..no.arg"));
return;
}
if(typeof (_b21)=="string"){
var _b24=_b21;
curam.debug.log("curam.util.clickButton: "+_a17.getProperty("curam.util.searching")+_a17.getProperty("curam.util.id.of")+"'"+_b24+"'.");
_b21=_a15("input[id='"+_b24+"']")[0];
if(!_b21.form&&!_b21.id){
curam.debug.log("curam.util.clickButton: "+_a17.getProperty("curam.util.searched")+_a17.getProperty("curam.util.id.of")+"'"+_b24+_a17.getProperty("curam.util.exiting"));
return;
}
}
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_b23=_b21;
}else{
_b23=_a15("input[name='"+_b21.id+"']",_b22)[0];
}
try{
if(attr.get(_b22,"action").indexOf(jsPageID)==0){
curam.util.publishRefreshEvent();
}
_b23.click();
}
catch(e){
curam.debug.log(_a17.getProperty("curam.util.exception.clicking"));
}
},printPage:function(_b25){
_a14.stop(_b25);
var _b26=dojo.window.get(_b25.currentTarget.ownerDocument);
var _b27=_b26.frameElement;
var _b28=_b27;
while(_b28&&!dojo.hasClass(_b28,"tab-content-holder")){
_b28=_b28.parentNode;
}
var _b29=_b28;
var _b2a=dojo.query(".detailsPanelFrame",_b29)[0];
if(_b2a!=undefined&&_b2a!=null){
_b2a.contentWindow.focus();
_b2a.contentWindow.print();
}
_b26.focus();
_b26.print();
return false;
},addSelectedClass:function(_b2b){
_a12.add(_b2b.target,"selected");
},removeSelectedClass:function(_b2c){
_a12.remove(_b2c.target,"selected");
},openHelpPage:function(_b2d,_b2e){
_a14.stop(_b2d);
dojo.global.open(_b2e);
},connect:function(_b2f,_b30,_b31){
var h=function(_b32){
_b31(_a14.fix(_b32));
};
if(has("ie")&&has("ie")<9){
_b2f.attachEvent(_b30,h);
_a16.addOnWindowUnload(function(){
_b2f.detachEvent(_b30,h);
});
return {object:_b2f,eventName:_b30,handler:h};
}else{
var _b33=_b30;
if(_b30.indexOf("on")==0){
_b33=_b30.slice(2);
}
var dt=on(_b2f,_b33,h);
_a16.addOnWindowUnload(function(){
dt.remove();
});
return dt;
}
},disconnect:function(_b34){
if(has("ie")&&has("ie")<9){
_b34.object.detachEvent(_b34.eventName,_b34.handler);
}else{
_b34.remove();
}
},subscribe:function(_b35,_b36){
var st=_a13.subscribe(_b35,_b36);
_a16.addOnWindowUnload(function(){
st.remove();
});
return st;
},unsubscribe:function(_b37){
_b37.remove();
},addActionControlClickListener:function(_b38){
var _b39=dom.byId(_b38);
var _b3a=_a15(".ac",_b39);
if(_b3a.length>0){
for(var i=0;i<_b3a.length;i++){
var _b3b=_b3a[i];
curam.util.addActionControlClass(_b3b);
}
}
},addActionControlClass:function(_b3c){
curam.util.connect(_b3c,"onmousedown",function(){
_a12.add(_b3c,"selected-button");
curam.util.connect(_b3c,"onmouseout",function(){
_a12.remove(_b3c,"selected-button");
});
});
},getClusterActionSet:function(){
var _b3d=dom.byId("content");
var _b3e=_a15(".blue-action-set",_b3d);
if(_b3e.length>0){
for(var i=0;i<_b3e.length;i++){
curam.util.addActionControlClickListener(_b3e[i]);
}
}
},adjustActionButtonWidth:function(){
if(has("ie")==8){
_a0e(function(){
if(dojo.global.jsScreenContext.hasContextBits("MODAL")){
_a15(".action-set > a").forEach(function(node){
if(node.childNodes[0].offsetWidth>node.offsetWidth){
_a10.set(node,"width",node.childNodes[0].offsetWidth+"px");
_a10.set(node,"display","block");
_a10.set(node,"display","inline-block");
}
});
}
});
}
},setRpu:function(url,rtc,_b3f){
if(!url||!rtc||!rtc.getHref()){
throw {name:"Unexpected values",message:"This value not allowed for url or rtc"};
}
var _b40=curam.util.getLastPathSegmentWithQueryString(rtc.getHref());
_b40=curam.util.removeUrlParam(_b40,curam.util.Constants.RETURN_PAGE_PARAM);
if(_b3f){
var i;
for(i=0;i<_b3f.length;i++){
if(!_b3f[i].key||!_b3f[i].value){
throw {name:"undefined value error",message:"The object did not contain a valid key/value pair"};
}
_b40=curam.util.replaceUrlParam(_b40,_b3f[i].key,_b3f[i].value);
}
}
var _b41=curam.util.replaceUrlParam(url,curam.util.Constants.RETURN_PAGE_PARAM,encodeURIComponent(_b40));
curam.debug.log("curam.util.setRpu "+_a17.getProperty("curam.util.added.rpu")+_b41);
return _b41;
},retrieveBaseURL:function(){
return dojo.global.location.href.match(".*://[^/]*/[^/]*");
},removeRoleRegion:function(){
var body=dojo.query("body")[0];
dojo.removeAttr(body,"role");
},iframeTitleFallBack:function(){
var _b42=curam.tab.getContainerTab(curam.tab.getContentPanelIframe());
var _b43=dojo.byId(curam.tab.getContentPanelIframe());
var _b44=_b43.contentWindow.document.title;
var _b45=dojo.query("div.nowrapTabStrip.dijitTabContainerTop-tabs > div.dijitTabChecked.dijitChecked")[0];
var _b46=dojo.query("span.tabLabel",_b45)[0];
var _b47=dojo.query("div.nowrapTabStrip.dijitTabNoLayout > div.dijitTabChecked.dijitChecked",_b42.domNode)[0];
var _b48=dojo.query("span.tabLabel",_b47)[0];
if(_b44&&_b44!=null){
return _b44;
}else{
if(_b47){
return _b48.innerHTML;
}else{
return _b46.innerHTML;
}
}
},addClassToLastNodeInContentArea:function(){
var _b49=_a15("> div","content");
var _b4a=_b49.length;
if(_b4a==0){
return "No need to add";
}
var _b4b=_b49[--_b4a];
while(_a12.contains(_b4b,"hidden-action-set")&&_b4b){
_b4b=_b49[--_b4a];
}
_a12.add(_b4b,"last-node");
},highContrastModeType:function(){
var _b4c=dojo.query("body.high-contrast")[0];
return _b4c;
}});
return curam.util;
});
},"dojo/store/Memory":function(){
define("dojo/store/Memory",["../_base/declare","./util/QueryResults","./util/SimpleQueryEngine"],function(_b4d,_b4e,_b4f){
return _b4d("dojo.store.Memory",null,{constructor:function(_b50){
for(var i in _b50){
this[i]=_b50[i];
}
this.setData(this.data||[]);
},data:null,idProperty:"id",index:null,queryEngine:_b4f,get:function(id){
return this.data[this.index[id]];
},getIdentity:function(_b51){
return _b51[this.idProperty];
},put:function(_b52,_b53){
var data=this.data,_b54=this.index,_b55=this.idProperty;
var id=(_b53&&"id" in _b53)?_b53.id:_b55 in _b52?_b52[_b55]:Math.random();
if(id in _b54){
if(_b53&&_b53.overwrite===false){
throw new Error("Object already exists");
}
data[_b54[id]]=_b52;
}else{
_b54[id]=data.push(_b52)-1;
}
return id;
},add:function(_b56,_b57){
(_b57=_b57||{}).overwrite=false;
return this.put(_b56,_b57);
},remove:function(id){
var _b58=this.index;
var data=this.data;
if(id in _b58){
data.splice(_b58[id],1);
this.setData(data);
return true;
}
},query:function(_b59,_b5a){
return _b4e(this.queryEngine(_b59,_b5a)(this.data));
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
},"url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n","curam/util/ListSort":function(){
define("curam/util/ListSort",["curam/util","curam/debug","curam/define"],function(){
curam.define.singleton("curam.util.ListSort",{makeSortable:function(_b5b,_b5c,_b5d,_b5e){
dojo.addOnLoad(function(){
_b5b=dojo.byId(_b5b);
if(_b5b.tHead==null){
return;
}else{
if(_b5b.tHead.rows&&_b5b.tHead.rows.length>0){
var _b5f=_b5b.tHead.rows[0];
if(!_b5f){
return;
}
}
}
var trim=dojo.trim;
for(var i=0;i<_b5f.cells.length;i++){
var cell=_b5f.cells[i];
if(cell.id&&cell.childNodes[0]){
var _b60=cell.childNodes[0];
if(_b60.childNodes[0]&&_b60.childNodes[0].nodeType==3){
var txt=trim(_b60.childNodes[0].nodeValue);
if((txt.length>0)&&(txt!=" ")){
var _b61=dojo.create("a",{href:"#"});
_b61["table"]=_b5b;
_b61["paginationId"]=_b5c;
_b61.appendChild(document.createTextNode(txt));
curam.util.connect(_b61,"onclick",curam.util.ListSort.sortTable);
var _b62=dojo.create("span",{className:"hidden"},_b61,"right");
_b62.appendChild(document.createTextNode(_b5e));
dojo.empty(_b60);
_b60.appendChild(_b61);
}
}
}
}
var _b63=dojo.query(".hidden-table-header a");
for(var i=0;i<_b63.length;i++){
var _b64=_b63[i];
_b64.setAttribute("tabindex","-1");
_b63.length-1;
}
_b5b._sortUp=true;
_b5b._isExpandableList=_b5d;
});
},sortTable:function(_b65){
var link;
if(typeof (_b65.nodeType)!="undefined"){
link=_b65;
}else{
link=_b65.target;
dojo.stopEvent(_b65);
}
window.dojo.publish("/curam/list/toBeSorted",[link["paginationId"]]);
var th=link.parentNode.parentNode;
var _b66=th.cellIndex;
if(dojo.isIE&&curam.content&&curam.content.LIST_MENUS_ENABLED){
_b66=0;
var _b67=th.previousSibling;
while(_b67){
if(_b67.tagName=="TH"){
_b66++;
}
_b67=_b67.previousSibling;
}
}
var _b68=link["table"];
var _b69=_b68._isExpandableList;
var _b6a=(_b69?2:1);
var _b6b=_b68.tBodies[0];
if(_b6b.rows.length<=_b6a){
return;
}
var _b6c=function(a,b){
aa=curam.util.ListSort.getSpanDataSort(a.cells[_b66]);
if(isNaN(aa)){
aa=0;
}
bb=curam.util.ListSort.getSpanDataSort(b.cells[_b66]);
if(isNaN(bb)){
bb=0;
}
return aa-bb;
};
var _b6d=[];
var _b6e=_b6b.rows.length-_b6a;
for(var j=0;j<_b6b.rows.length/_b6a;j++){
var _b6f=j*_b6a;
_b6d[j]=_b6b.rows[_b6f];
if(_b69){
_b6d[j]._detailRow=_b6b.rows[_b6f+1];
}
if(dojo.style(_b6b.rows[_b6f],"display")!="none"&&dojo.style(_b6b.rows[_b6f],"visible")!="false"){
_b6e=_b6f;
}
}
_b6d.sort(_b6c);
if(!_b68._sortUp){
_b6d.reverse();
}
_b68._sortUp=!_b68._sortUp;
var _b70=_b6b.firstChild;
for(var i=0;i<_b6d.length;i++){
var _b71=_b6d[i];
if(_b69){
var _b72=_b71._detailRow;
_b6b.appendChild(_b71);
var next=cm.nextSibling(_b71,"tr");
if(next){
_b6b.insertBefore(_b72,next);
}else{
_b6b.appendChild(_b72);
}
_b70=cm.nextSibling(_b72,"tr");
}else{
_b6b.appendChild(_b71);
}
}
curam.util.stripeTable(_b68,_b69,_b6e);
window.dojo.publish("/curam/list/sorted",[link["paginationId"]]);
},sortScrollableList:function(_b73,_b74){
dojo.stopEvent(_b73);
var idx=_b74.indexOf("_slh");
var _b75=_b74.substring(0,idx);
var _b76=dojo.byId(_b75);
if(typeof (_b76)=="undefined"){
return;
}
var _b77=dojo.query("a",_b76)[0];
curam.util.ListSort.sortTable(_b77);
},getSpanDataSort:function(el){
var _b78=el.getElementsByTagName("span");
curam.debug.log(el.getElementsByTagName("span"));
for(var i=0;i<_b78.length;i++){
if(dojo.attr(_b78[i],"data-curam-sort-order")!==""){
spanElement=_b78[i];
}
}
curam.debug.log("getSpanDataSort ==="+dojo.attr(spanElement,"data-curam-sort-order"));
return spanElement?parseInt(dojo.attr(spanElement,"data-curam-sort-order"))||0:0;
}});
return curam.util.ListSort;
});
},"dijit/layout/StackContainer":function(){
define("dijit/layout/StackContainer",["dojo/_base/array","dojo/cookie","dojo/_base/declare","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/ready","dojo/topic","../registry","../_WidgetBase","./_LayoutWidget","dojo/i18n!../nls/common"],function(_b79,_b7a,_b7b,_b7c,_b7d,lang,_b7e,_b7f,_b80,_b81,_b82){
if(!_b7d.isAsync){
_b7e(0,function(){
var _b83=["dijit/layout/StackController"];
require(_b83);
});
}
lang.extend(_b81,{selected:false,closable:false,iconClass:"dijitNoIcon",showTitle:true});
return _b7b("dijit.layout.StackContainer",_b82,{doLayout:true,persist:false,baseClass:"dijitStackContainer",buildRendering:function(){
this.inherited(arguments);
_b7c.add(this.domNode,"dijitLayoutContainer");
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onkeypress",this._onKeyPress);
},startup:function(){
if(this._started){
return;
}
var _b84=this.getChildren();
_b79.forEach(_b84,this._setupChild,this);
if(this.persist){
this.selectedChildWidget=_b80.byId(_b7a(this.id+"_selectedChild"));
}else{
_b79.some(_b84,function(_b85){
if(_b85.selected){
this.selectedChildWidget=_b85;
}
return _b85.selected;
},this);
}
var _b86=this.selectedChildWidget;
if(!_b86&&_b84[0]){
_b86=this.selectedChildWidget=_b84[0];
_b86.selected=true;
}
_b7f.publish(this.id+"-startup",{children:_b84,selected:_b86});
this.inherited(arguments);
},resize:function(){
if(!this._hasBeenShown){
this._hasBeenShown=true;
var _b87=this.selectedChildWidget;
if(_b87){
this._showChild(_b87);
}
}
this.inherited(arguments);
},_setupChild:function(_b88){
this.inherited(arguments);
_b7c.replace(_b88.domNode,"dijitHidden","dijitVisible");
_b88.domNode.title="";
},addChild:function(_b89,_b8a){
this.inherited(arguments);
if(this._started){
_b7f.publish(this.id+"-addChild",_b89,_b8a);
this.layout();
if(!this.selectedChildWidget){
this.selectChild(_b89);
}
}
},removeChild:function(page){
this.inherited(arguments);
if(this._started){
_b7f.publish(this.id+"-removeChild",page);
}
if(this._descendantsBeingDestroyed){
return;
}
if(this.selectedChildWidget===page){
this.selectedChildWidget=undefined;
if(this._started){
var _b8b=this.getChildren();
if(_b8b.length){
this.selectChild(_b8b[0]);
}
}
}
if(this._started){
this.layout();
}
},selectChild:function(page,_b8c){
page=_b80.byId(page);
if(this.selectedChildWidget!=page){
var d=this._transition(page,this.selectedChildWidget,_b8c);
if(d){
this._set("selectedChildWidget",page);
_b7f.publish(this.id+"-selectChild",page);
if(this.persist){
_b7a(this.id+"_selectedChild",this.selectedChildWidget.id);
}
}
}
return d;
},_transition:function(_b8d,_b8e){
if(_b8e){
this._hideChild(_b8e);
}
var d=this._showChild(_b8d);
if(d&&_b8d.resize){
if(this.doLayout){
_b8d.resize(this._containerContentBox||this._contentBox);
}else{
_b8d.resize();
}
}
return d;
},_adjacent:function(_b8f){
var _b90=this.getChildren();
var _b91=_b79.indexOf(_b90,this.selectedChildWidget);
_b91+=_b8f?1:_b90.length-1;
return _b90[_b91%_b90.length];
},forward:function(){
return this.selectChild(this._adjacent(true),true);
},back:function(){
return this.selectChild(this._adjacent(false),true);
},_onKeyPress:function(e){
_b7f.publish(this.id+"-containerKeyPress",{e:e,page:this});
},layout:function(){
var _b92=this.selectedChildWidget;
if(_b92&&_b92.resize){
if(this.doLayout){
_b92.resize(this._containerContentBox||this._contentBox);
}else{
_b92.resize();
}
}
},_showChild:function(page){
if(page){
var _b93=this.getChildren();
page.isFirstChild=(page==_b93[0]);
page.isLastChild=(page==_b93[_b93.length-1]);
page._set("selected",true);
_b7c.replace(page.domNode,"dijitVisible","dijitHidden");
return (page._onShow&&page._onShow())||true;
}
},_hideChild:function(page){
page._set("selected",false);
_b7c.replace(page.domNode,"dijitHidden","dijitVisible");
page.onHide&&page.onHide();
},closeChild:function(page){
var _b94=page.onClose(this,page);
if(_b94){
this.removeChild(page);
page.destroyRecursive();
}
},destroyDescendants:function(_b95){
this._descendantsBeingDestroyed=true;
this.selectedChildWidget=undefined;
_b79.forEach(this.getChildren(),function(_b96){
if(!_b95){
this.removeChild(_b96);
}
_b96.destroyRecursive(_b95);
},this);
this._descendantsBeingDestroyed=false;
}});
});
},"dojo/regexp":function(){
define("dojo/regexp",["./_base/kernel","./_base/lang"],function(dojo,lang){
lang.getObject("regexp",true,dojo);
dojo.regexp.escapeString=function(str,_b97){
return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_b97&&_b97.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
dojo.regexp.buildGroupRE=function(arr,re,_b98){
if(!(arr instanceof Array)){
return re(arr);
}
var b=[];
for(var i=0;i<arr.length;i++){
b.push(re(arr[i]));
}
return dojo.regexp.group(b.join("|"),_b98);
};
dojo.regexp.group=function(_b99,_b9a){
return "("+(_b9a?"?:":"")+_b99+")";
};
return dojo.regexp;
});
},"curam/UIMController":function(){
require({cache:{"url:curam/layout/resources/UIMController.html":"<div id=\"uimcontroller_${uid}\" class=\"uimcontroller_${uid} uimController ${classList}\" data-dojo-attach-point=\"uimController\">\r\n  <div style=\"display:none;\" \r\n       id=\"uimcontroller_tc_${uid}\" \r\n       class=\"ipnTabController in-page-nav-tabContainer\"\r\n       data-dojo-attach-point=\"tabController\" \r\n       data-dojo-type=\"curam.layout.TabContainer\">\r\n  </div>\r\n  <div class=\"contentPanelFrameWrapper\"  \r\n        data-dojo-attach-point=\"frameWrapper\">\r\n    <iframe frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\"\r\n             allowTransparency=\"true\" \r\n             id=\"${iframeId}\" \r\n             data-dojo-attach-point=\"frame\"                 \r\n             class=\"${iframeId} ${iframeClassList}\"\r\n             iscpiframe=\"${iscpiframe}\"\r\n             title=\"${title}\" >\r\n    </iframe>\r\n  </div> \r\n</div>"}});
define("curam/UIMController",["dojo/text!curam/layout/resources/UIMController.html","dijit/_Widget","dijit/_Templated","dijit/layout/ContentPane","curam/tab","curam/debug","curam/util","curam/util/onLoad","curam/util/ResourceBundle"],function(_b9b){
dojo.requireLocalization("curam.application","Debug");
var _b9c=new curam.util.ResourceBundle("Debug");
var _b9d=dojo.declare("curam.UIMController",[dijit._Widget,dijit._Templated],{TAB_HEIGHT:20,EVENT:{TOPIC_PREFIX:"UIMController.InPageNav_"},TOPIC_LOADED:"/curam/uim/controller/loaded",frameLoadEvent:"",uid:"",url:"",tabControllerId:"",oldTabsTitlesList:[],newTabsTitlesList:[],widgetsInTemplate:true,finishedLoadingTabs:false,classList:"",iframeId:"",height:"",width:"",iframeClassList:"",iscpiframe:"false",ipnTabClickEvent:null,title:"",handleIPNTabClickListener:null,inPageNavItems:null,loadFrameOnCreate:true,resizeFrameOnLoad:false,templateString:_b9b,inDialog:false,constructor:function(args){
if(!args.uid){
throw "'uid' attribute not provided to constructor for"+" curam.UIMController(url,uid)";
}
this.uid="uimcontroller_"+args.uid;
this.tabControllerId="uimcontroller_tc_"+args.uid;
this.newTabsTitlesList=[];
this.ipnTabClickEvent=this.tabControllerId+"-selectChild";
if(this.height==""){
this.height="99%";
}
if(this.width==""){
this.width="99%";
}
curam.debug.log(_b9c.getProperty("curam.UIMController.new")+" curam.UIMController()...");
curam.debug.log("curam.UIMController "+_b9c.getProperty("curam.UIMController.identifier")+" "+this.uid);
curam.debug.log("curam.UIMController "+_b9c.getProperty("curam.UIMController.url")+" "+this.url);
curam.debug.log("curam.UIMController "+_b9c.getProperty("curam.UIMController.identifier")+" "+this.tabControllerId);
curam.debug.log("curam.UIMController: newTabsTitlesList "+" "+this.newTabsTitlesList);
return this.uimController;
},postCreate:function(){
this.frameLoadEvent=this.EVENT.TOPIC_PREFIX+this.frame.id;
this.setURL(this.url);
var _b9e=dojo.hitch(this,"processFrameLoadEvent");
curam.util.onLoad.addSubscriber(this.frame.id,_b9e);
dojo.connect(this,"destroy",function(){
curam.util.onLoad.removeSubscriber(this.iframeId,_b9e);
this.fLoadFunct=null;
});
if(this.inDialog){
dojo.style(this.frame,{width:this.width,height:this.height});
}
curam.debug.log("curam.UIMController: loadFrameOnCreate="+this.loadFrameOnCreate);
curam.debug.log("curam.UIMController "+_b9c.getProperty("curam.UIMController.url")+this.url);
if(this.loadFrameOnCreate==true&&typeof (this.url)!="undefined"){
curam.debug.log("curam.UIMController: "+_b9c.getProperty("uram.UIMController.loading"));
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
},processFrameLoadEvent:function(_b9f,_ba0){
curam.debug.log("curam.UIMController: processFrameLoadEvent "+_b9c.getProperty("curam.UIMController.processing.IPN")+_ba0);
this.inPageNavItems=_ba0.inPageNavItems;
curam.debug.log("curam.UIMController: processFrameLoadEvent: "+_b9c.getProperty("curam.UIMController.processing"));
curam.debug.log("curam.UIMController.processFrameLoadEvent: this.tabController: "+this.tabController);
if(this.resizeFrameOnLoad==true){
var _ba1=_ba0.height;
curam.debug.log(_b9c.getProperty("curam.UIMController.resizing")+_ba1);
if(_ba1){
dojo.style(this.getIFrame(),{height:_ba1+"px"});
}
}
curam.debug.log(_b9c.getProperty("curam.UIMController.IPN.items"),this.inPageNavItems);
if(!this.hasInPageNavigation()){
curam.debug.log(_b9c.getProperty("curam.UIMController.no.IPN"));
this.clearIPNTabs();
if(!this._tabControllerHidden()){
curam.debug.log(_b9c.getProperty("curam.UIMController.hiding"));
this.showTabContainer(false);
}
dojo.publish(this.TOPIC_LOADED);
return;
}
curam.debug.log(_b9c.getProperty("curam.UIMController.extract"));
var _ba2=-1;
for(var i=0;i<this.inPageNavItems.length;i++){
this.newTabsTitlesList.push(this.inPageNavItems[i].title);
if(this.inPageNavItems[i].selected==true){
_ba2=i;
}
curam.debug.log(_b9c.getProperty("curam.UIMController.IPN.")+"["+this.inPageNavItems[i].title+", "+this.inPageNavItems[i].href+", "+this.inPageNavItems[i].selected+"]");
}
var _ba3=!(this.compareLists(this.oldTabsTitlesList,this.newTabsTitlesList));
if(_ba3){
this.clearIPNTabs(this);
this.createIPNTabs(this.inPageNavItems);
if(this._tabControllerHidden()){
this.showTabContainer(true);
}
}else{
curam.debug.log(_b9c.getProperty("curam.UIMController.no.change"));
if(_ba2>-1){
var _ba4=this.tabController.getIndexOfChild(this.tabController.selectedChildWidget);
if(_ba4!=_ba2){
curam.debug.log(_b9c.getProperty("curam.UIMController.change")+_ba4+_b9c.getProperty("curam.UIMController.to")+_ba2);
this.toggleIPNTabClickEventListener("off");
this.tabController.selectChild(this.tabController.getChildren()[_ba2]);
this.toggleIPNTabClickEventListener("on");
}
}
}
this.newTabsTitlesList=[];
curam.debug.log(_b9c.getProperty("curam.UIMController.clear")+this.newTabsTitlesList);
this.finishedLoadingTabs=true;
dojo.publish(this.TOPIC_LOADED);
dojo.publish("/curam/tab/labelUpdated");
},_tabControllerHidden:function(){
return dojo.style(this.tabController.domNode,"display")=="none";
},toggleIPNTabClickEventListener:function(_ba5){
if(_ba5=="off"){
if(this.handleIPNTabClickListener!=null){
curam.debug.log(_b9c.getProperty("curam.UIMController.off.listener"));
dojo.unsubscribe(this.handleIPNTabClickListener);
}
}else{
curam.debug.log(_b9c.getProperty("curam.UIMController.on.listener"));
this.handleIPNTabClickListener=this.subscribe(this.ipnTabClickEvent,dojo.hitch(this,this.handleIPNTabClick));
}
},handleIPNTabClick:function(tab){
if(this.finishedLoadingTabs){
curam.debug.log(_b9c.getProperty("curam.UIMController.finishing"));
this.finishedLoadingTabs=false;
this.setURL(this._getURLByTitle(tab.title));
this.loadPage();
}
},createIPNTabs:function(_ba6){
this.toggleIPNTabClickEventListener("off");
if(!this.tabController){
console.error("curam.UIMController.createIPNTabs: "+_b9c.getProperty("uram.UIMController.no.widget")+" '"+this.tabControllerId+"'");
}else{
curam.debug.log("curam.UIMController.createIPNTabs: "+_b9c.getProperty("curam.UIMController.creating.tabs")+_ba6);
var _ba7=null;
for(var i=0;i<_ba6.length;i++){
var cp=new dijit.layout.ContentPane({title:_ba6[i].title});
this.tabController.addChild(cp);
if(_ba6[i].selected==true||_ba7==null){
_ba7=cp;
}
this.oldTabsTitlesList.push(_ba6[i].title);
curam.debug.log("curam.UIMController.createIPNTabs: "+_b9c.getProperty("curam.UIMController.adding.tabs")+_ba6[i].title);
}
this.tabController.startup();
this.tabController.selectChild(_ba7);
}
this.toggleIPNTabClickEventListener("on");
this.newTabsTitlesList=[];
},clearIPNTabs:function(){
curam.debug.log("curam.UIMController.createIPNTabs: "+_b9c.getProperty("curam.UIMController.clearing.tabs")+this.oldTabsTitlesList);
this.toggleIPNTabClickEventListener("off");
this.tabController.destroyDescendants();
this.tabController.selectedChildWidget=null;
this.oldTabsTitlesList=[];
this.toggleIPNTabClickEventListener("on");
curam.debug.log("curam.UIMController.createIPNTabs: "+_b9c.getProperty("curam.UIMController.clearing.notify")+this.oldTabsTitlesList);
},compareLists:function(_ba8,_ba9){
curam.debug.log("curam.UIMController.compareLists: "+_b9c.getProperty("curam.UIMController.comparing.tabs"));
curam.debug.log(_b9c.getProperty("curam.UIMController.tab.list1")+_ba8);
curam.debug.log(_b9c.getProperty("curam.UIMController.tab.list1")+_ba9);
var _baa=true;
if(_ba8.length!=_ba9.length){
_baa=false;
}
for(var i=0;i<_ba8.length;i++){
if(_ba8[i]!=_ba9[i]){
_baa=false;
}
}
curam.debug.log(_b9c.getProperty("curam.UIMController.result")+_baa);
return _baa;
},_getURLByTitle:function(_bab){
var url=null;
dojo.forEach(this.inPageNavItems,function(_bac){
if(_bac.title==_bab){
url=_bac.href;
}
});
curam.debug.log(url);
return url;
},_trimURL:function(href){
var idx=href.lastIndexOf("/");
if(idx>-1&&idx<=href.length){
return href.substring(idx+1);
}else{
return href;
}
},hasInPageNavigation:function(){
return this.inPageNavItems!=null;
},getIFrame:function(){
return this.frame;
},loadPage:function(_bad){
if(typeof (this.url)=="undefined"||this.url==null){
var e=new Error("curam.UIMController: Cannot load page as URL has not been set");
if(_bad){
_bad.errback(e);
}
throw e;
}
if(_bad){
var st=curam.util.subscribe(this.TOPIC_LOADED,function(){
curam.util.unsubscribe(st);
_bad.callback();
});
}
var _bae=this._getFullURL();
curam.debug.log("curam.UIMController.loadPage(): "+_b9c.getProperty("curam.UIMController.set.source")+this.frame.id+" to url: "+_bae);
dojo.attr(this.frame,"src",_bae);
},_getFullURL:function(){
if(typeof (this.absoluteURL)!="undefined"&&this.absoluteURL==true){
return this.url;
}
var _baf;
if(this.url.indexOf("?")==-1){
_baf="?";
}else{
_baf="&";
}
var _bb0=curam.config?curam.config.locale:jsL;
var _bb1="";
if(window==curam.util.getTopmostWindow()){
_bb1=_bb0+"/";
}
if(this.url.indexOf("o3nocache=")==-1){
return _bb1+this.url+_baf+curam.util.getCacheBusterParameter();
}else{
return _bb1+this.url;
}
},showTabContainer:function(show){
if(show&&!this.hasInPageNavigation()){
curam.debug.log(_b9c.getProperty("curam.UIMController.ignore.reuest"));
return;
}
dojo.style(this.frameWrapper,"top",(show?this.TAB_HEIGHT+7:"0")+"px");
dojo.style(this.tabController.domNode,"display",show?"block":"none");
if(show){
this.tabController.resize();
}
},setDimensionsForModalDialog:function(w,h,_bb2){
curam.debug.log("curam.UIMController:setDimensionsForModalDialog() - "+"w="+w+", h="+h);
dojo.style(this.frame,{width:w+"px",height:h+"px"});
dojo.style(this.tabController.domNode,{width:w+"px"});
if(typeof (_bb2.inPageNavItems)!="undefined"){
h+=this.TAB_HEIGHT+5;
curam.debug.log("cura.UIMController:setDimensionsForModalDialog() - "+_b9c.getProperty("curam.UIMController.height"));
}
dojo.style(this.domNode,{width:w+"px",height:h+"px"});
},destroy:function(){
this.iframe=null;
this.inPageNavItems=null;
dojo.unsubscribe(this.handleIPNTabClickListener);
this.tabController.destroy();
this.inherited(arguments);
}});
return _b9d;
});
},"curam/debug":function(){
define("curam/debug",["curam/define","curam/util/LocalConfig"],function(_bb3,_bb4){
_bb3.singleton("curam.debug",{log:function(){
if(curam.debug.enabled()){
try{
var a=arguments;
if(!dojo.isIE){
console.log.apply(console,a);
}else{
var _bb5=a.length;
var sa=curam.debug._serializeArgument;
switch(_bb5){
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
console.log("[Incomplete message - "+(_bb5-5)+" message a truncated] "+a[0],sa(a[1]),sa(a[2]),sa(a[3]),sa(a[4]),sa(a[5]));
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
var _bb6=typeof arg!="undefined"&&typeof arg.closed!="undefined"&&arg.closed;
if(_bb6){
return true;
}else{
return typeof arg!="undefined"&&typeof arg.location!="undefined"&&typeof arg.navigator!="undefined"&&typeof arg.document!="undefined"&&typeof arg.closed!="undefined";
}
},enabled:function(){
return _bb4.readOption("jsTraceLog","false")=="true";
},_setup:function(_bb7){
_bb4.seedOption("jsTraceLog",_bb7.trace,"false");
_bb4.seedOption("ajaxDebugMode",_bb7.ajaxDebug,"false");
_bb4.seedOption("asyncProgressMonitor",_bb7.asyncProgressMonitor,"false");
}});
return curam.debug;
});
},"dijit/form/ComboBox":function(){
define("dijit/form/ComboBox",["dojo/_base/declare","./ValidationTextBox","./ComboBoxMixin"],function(_bb8,_bb9,_bba){
return _bb8("dijit.form.ComboBox",[_bb9,_bba],{});
});
},"dijit/form/_FormMixin":function(){
define("dijit/form/_FormMixin",["dojo/_base/array","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/window"],function(_bbb,_bbc,_bbd,lang,_bbe){
return _bbc("dijit.form._FormMixin",null,{state:"",_getDescendantFormWidgets:function(_bbf){
var res=[];
_bbb.forEach(_bbf||this.getChildren(),function(_bc0){
if("value" in _bc0){
res.push(_bc0);
}else{
res=res.concat(this._getDescendantFormWidgets(_bc0.getChildren()));
}
},this);
return res;
},reset:function(){
_bbb.forEach(this._getDescendantFormWidgets(),function(_bc1){
if(_bc1.reset){
_bc1.reset();
}
});
},validate:function(){
var _bc2=false;
return _bbb.every(_bbb.map(this._getDescendantFormWidgets(),function(_bc3){
_bc3._hasBeenBlurred=true;
var _bc4=_bc3.disabled||!_bc3.validate||_bc3.validate();
if(!_bc4&&!_bc2){
_bbe.scrollIntoView(_bc3.containerNode||_bc3.domNode);
_bc3.focus();
_bc2=true;
}
return _bc4;
}),function(item){
return item;
});
},setValues:function(val){
_bbd.deprecated(this.declaredClass+"::setValues() is deprecated. Use set('value', val) instead.","","2.0");
return this.set("value",val);
},_setValueAttr:function(obj){
var map={};
_bbb.forEach(this._getDescendantFormWidgets(),function(_bc5){
if(!_bc5.name){
return;
}
var _bc6=map[_bc5.name]||(map[_bc5.name]=[]);
_bc6.push(_bc5);
});
for(var name in map){
if(!map.hasOwnProperty(name)){
continue;
}
var _bc7=map[name],_bc8=lang.getObject(name,false,obj);
if(_bc8===undefined){
continue;
}
if(!lang.isArray(_bc8)){
_bc8=[_bc8];
}
if(typeof _bc7[0].checked=="boolean"){
_bbb.forEach(_bc7,function(w){
w.set("value",_bbb.indexOf(_bc8,w.value)!=-1);
});
}else{
if(_bc7[0].multiple){
_bc7[0].set("value",_bc8);
}else{
_bbb.forEach(_bc7,function(w,i){
w.set("value",_bc8[i]);
});
}
}
}
},getValues:function(){
_bbd.deprecated(this.declaredClass+"::getValues() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},_getValueAttr:function(){
var obj={};
_bbb.forEach(this._getDescendantFormWidgets(),function(_bc9){
var name=_bc9.name;
if(!name||_bc9.disabled){
return;
}
var _bca=_bc9.get("value");
if(typeof _bc9.checked=="boolean"){
if(/Radio/.test(_bc9.declaredClass)){
if(_bca!==false){
lang.setObject(name,_bca,obj);
}else{
_bca=lang.getObject(name,false,obj);
if(_bca===undefined){
lang.setObject(name,null,obj);
}
}
}else{
var ary=lang.getObject(name,false,obj);
if(!ary){
ary=[];
lang.setObject(name,ary,obj);
}
if(_bca!==false){
ary.push(_bca);
}
}
}else{
var prev=lang.getObject(name,false,obj);
if(typeof prev!="undefined"){
if(lang.isArray(prev)){
prev.push(_bca);
}else{
lang.setObject(name,[prev,_bca],obj);
}
}else{
lang.setObject(name,_bca,obj);
}
}
});
return obj;
},isValid:function(){
return this.state=="";
},onValidStateChange:function(){
},_getState:function(){
var _bcb=_bbb.map(this._descendants,function(w){
return w.get("state")||"";
});
return _bbb.indexOf(_bcb,"Error")>=0?"Error":_bbb.indexOf(_bcb,"Incomplete")>=0?"Incomplete":"";
},disconnectChildren:function(){
_bbb.forEach(this._childConnections||[],lang.hitch(this,"disconnect"));
_bbb.forEach(this._childWatches||[],function(w){
w.unwatch();
});
},connectChildren:function(_bcc){
var _bcd=this;
this.disconnectChildren();
this._descendants=this._getDescendantFormWidgets();
var set=_bcc?function(name,val){
_bcd[name]=val;
}:lang.hitch(this,"_set");
set("value",this.get("value"));
set("state",this._getState());
var _bce=(this._childConnections=[]),_bcf=(this._childWatches=[]);
_bbb.forEach(_bbb.filter(this._descendants,function(item){
return item.validate;
}),function(_bd0){
_bbb.forEach(["state","disabled"],function(attr){
_bcf.push(_bd0.watch(attr,function(){
_bcd.set("state",_bcd._getState());
}));
});
});
var _bd1=function(){
if(_bcd._onChangeDelayTimer){
clearTimeout(_bcd._onChangeDelayTimer);
}
_bcd._onChangeDelayTimer=setTimeout(function(){
delete _bcd._onChangeDelayTimer;
_bcd._set("value",_bcd.get("value"));
},10);
};
_bbb.forEach(_bbb.filter(this._descendants,function(item){
return item.onChange;
}),function(_bd2){
_bce.push(_bcd.connect(_bd2,"onChange",_bd1));
_bcf.push(_bd2.watch("disabled",_bd1));
});
},startup:function(){
this.inherited(arguments);
this.connectChildren(true);
this.watch("state",function(attr,_bd3,_bd4){
this.onValidStateChange(_bd4=="");
});
},destroy:function(){
this.disconnectChildren();
this.inherited(arguments);
}});
});
},"dijit/DropDownMenu":function(){
require({cache:{"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n"}});
define("dijit/DropDownMenu",["dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/text!./templates/Menu.html","./_OnDijitClickMixin","./_MenuBase"],function(_bd5,_bd6,keys,_bd7,_bd8,_bd9){
return _bd5("dijit.DropDownMenu",[_bd9,_bd8],{templateString:_bd7,baseClass:"dijitMenu",postCreate:function(){
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
_bd6.stop(evt);
break;
case this._closeSubMenuKey:
if(this.parentMenu){
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
}else{
_bd6.stop(evt);
}
break;
}
}});
});
},"dojo/data/util/simpleFetch":function(){
define("dojo/data/util/simpleFetch",["dojo/_base/lang","dojo/_base/window","./sorter"],function(lang,_bda,_bdb){
var _bdc=lang.getObject("dojo.data.util.simpleFetch",true);
_bdc.fetch=function(_bdd){
_bdd=_bdd||{};
if(!_bdd.store){
_bdd.store=this;
}
var self=this;
var _bde=function(_bdf,_be0){
if(_be0.onError){
var _be1=_be0.scope||_bda.global;
_be0.onError.call(_be1,_bdf,_be0);
}
};
var _be2=function(_be3,_be4){
var _be5=_be4.abort||null;
var _be6=false;
var _be7=_be4.start?_be4.start:0;
var _be8=(_be4.count&&(_be4.count!==Infinity))?(_be7+_be4.count):_be3.length;
_be4.abort=function(){
_be6=true;
if(_be5){
_be5.call(_be4);
}
};
var _be9=_be4.scope||_bda.global;
if(!_be4.store){
_be4.store=self;
}
if(_be4.onBegin){
_be4.onBegin.call(_be9,_be3.length,_be4);
}
if(_be4.sort){
_be3.sort(_bdb.createSortFunction(_be4.sort,self));
}
if(_be4.onItem){
for(var i=_be7;(i<_be3.length)&&(i<_be8);++i){
var item=_be3[i];
if(!_be6){
_be4.onItem.call(_be9,item,_be4);
}
}
}
if(_be4.onComplete&&!_be6){
var _bea=null;
if(!_be4.onItem){
_bea=_be3.slice(_be7,_be8);
}
_be4.onComplete.call(_be9,_bea,_be4);
}
};
this._fetchItems(_bdd,_be2,_bde);
return _bdd;
};
return _bdc;
});
},"url:curam/layout/resources/UIMController.html":"<div id=\"uimcontroller_${uid}\" class=\"uimcontroller_${uid} uimController ${classList}\" data-dojo-attach-point=\"uimController\">\r\n  <div style=\"display:none;\" \r\n       id=\"uimcontroller_tc_${uid}\" \r\n       class=\"ipnTabController in-page-nav-tabContainer\"\r\n       data-dojo-attach-point=\"tabController\" \r\n       data-dojo-type=\"curam.layout.TabContainer\">\r\n  </div>\r\n  <div class=\"contentPanelFrameWrapper\"  \r\n        data-dojo-attach-point=\"frameWrapper\">\r\n    <iframe frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\"\r\n             allowTransparency=\"true\" \r\n             id=\"${iframeId}\" \r\n             data-dojo-attach-point=\"frame\"                 \r\n             class=\"${iframeId} ${iframeClassList}\"\r\n             iscpiframe=\"${iscpiframe}\"\r\n             title=\"${title}\" >\r\n    </iframe>\r\n  </div> \r\n</div>","dijit/Menu":function(){
define("dijit/Menu",["require","dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window","dojo/window","./popup","./DropDownMenu","dojo/ready"],function(_beb,_bec,_bed,_bee,dom,_bef,_bf0,_bf1,_bf2,keys,lang,on,has,win,_bf3,pm,_bf4,_bf5){
if(!_bf2.isAsync){
_bf5(0,function(){
var _bf6=["dijit/MenuItem","dijit/PopupMenuItem","dijit/CheckedMenuItem","dijit/MenuSeparator"];
_beb(_bf6);
});
}
return _bed("dijit.Menu",_bf4,{constructor:function(){
this._bindings=[];
},targetNodeIds:[],contextMenuForWindow:false,leftClickToOpen:false,refocus:true,postCreate:function(){
if(this.contextMenuForWindow){
this.bindDomNode(win.body());
}else{
_bec.forEach(this.targetNodeIds,this.bindDomNode,this);
}
this.inherited(arguments);
},_iframeContentWindow:function(_bf7){
return _bf3.get(this._iframeContentDocument(_bf7))||this._iframeContentDocument(_bf7)["__parent__"]||(_bf7.name&&win.doc.frames[_bf7.name])||null;
},_iframeContentDocument:function(_bf8){
return _bf8.contentDocument||(_bf8.contentWindow&&_bf8.contentWindow.document)||(_bf8.name&&win.doc.frames[_bf8.name]&&win.doc.frames[_bf8.name].document)||null;
},bindDomNode:function(node){
node=dom.byId(node);
var cn;
if(node.tagName.toLowerCase()=="iframe"){
var _bf9=node,_bfa=this._iframeContentWindow(_bf9);
cn=win.withGlobal(_bfa,win.body);
}else{
cn=(node==win.body()?win.doc.documentElement:node);
}
var _bfb={node:node,iframe:_bf9};
_bef.set(node,"_dijitMenu"+this.id,this._bindings.push(_bfb));
var _bfc=lang.hitch(this,function(cn){
return [on(cn,this.leftClickToOpen?"click":"contextmenu",lang.hitch(this,function(evt){
_bee.stop(evt);
this._scheduleOpen(evt.target,_bf9,{x:evt.pageX,y:evt.pageY});
})),on(cn,"keydown",lang.hitch(this,function(evt){
if(evt.shiftKey&&evt.keyCode==keys.F10){
_bee.stop(evt);
this._scheduleOpen(evt.target,_bf9);
}
}))];
});
_bfb.connects=cn?_bfc(cn):[];
if(_bf9){
_bfb.onloadHandler=lang.hitch(this,function(){
var _bfd=this._iframeContentWindow(_bf9);
cn=win.withGlobal(_bfd,win.body);
_bfb.connects=_bfc(cn);
});
if(_bf9.addEventListener){
_bf9.addEventListener("load",_bfb.onloadHandler,false);
}else{
_bf9.attachEvent("onload",_bfb.onloadHandler);
}
}
},unBindDomNode:function(_bfe){
var node;
try{
node=dom.byId(_bfe);
}
catch(e){
return;
}
var _bff="_dijitMenu"+this.id;
if(node&&_bef.has(node,_bff)){
var bid=_bef.get(node,_bff)-1,b=this._bindings[bid],h;
while(h=b.connects.pop()){
h.remove();
}
var _c00=b.iframe;
if(_c00){
if(_c00.removeEventListener){
_c00.removeEventListener("load",b.onloadHandler,false);
}else{
_c00.detachEvent("onload",b.onloadHandler);
}
}
_bef.remove(node,_bff);
delete this._bindings[bid];
}
},_scheduleOpen:function(_c01,_c02,_c03){
if(!this._openTimer){
this._openTimer=setTimeout(lang.hitch(this,function(){
delete this._openTimer;
this._openMyself({target:_c01,iframe:_c02,coords:_c03});
}),1);
}
},_openMyself:function(args){
var _c04=args.target,_c05=args.iframe,_c06=args.coords;
if(_c06){
if(_c05){
var ifc=_bf0.position(_c05,true),_c07=this._iframeContentWindow(_c05),_c08=win.withGlobal(_c07,"_docScroll",dojo);
var cs=_bf1.getComputedStyle(_c05),tp=_bf1.toPixelValue,left=(has("ie")&&has("quirks")?0:tp(_c05,cs.paddingLeft))+(has("ie")&&has("quirks")?tp(_c05,cs.borderLeftWidth):0),top=(has("ie")&&has("quirks")?0:tp(_c05,cs.paddingTop))+(has("ie")&&has("quirks")?tp(_c05,cs.borderTopWidth):0);
_c06.x+=ifc.x+left-_c08.x;
_c06.y+=ifc.y+top-_c08.y;
}
}else{
_c06=_bf0.position(_c04,true);
_c06.x+=10;
_c06.y+=10;
}
var self=this;
var _c09=this._focusManager.get("prevNode");
var _c0a=this._focusManager.get("curNode");
var _c0b=!_c0a||(dom.isDescendant(_c0a,this.domNode))?_c09:_c0a;
function _c0c(){
if(self.refocus&&_c0b){
_c0b.focus();
}
pm.close(self);
};
pm.open({popup:this,x:_c06.x,y:_c06.y,onExecute:_c0c,onCancel:_c0c,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){
this.inherited("_onBlur",arguments);
pm.close(this);
};
},uninitialize:function(){
_bec.forEach(this._bindings,function(b){
if(b){
this.unBindDomNode(b.node);
}
},this);
this.inherited(arguments);
}});
});
},"curam/widget/DivButton":function(){
require({cache:{"url:curam/widget/resources/DivButton.html":"<div id=\"${id}\" class=\"${className}\" dojoAttachEvent=\"onclick:onClick\" dojoAttachPoint=\"containerNode\"></div>\r\n\r\n {\r\n      templateString: \"<div id='${id}' class='${className}' \"\r\n            + \"dojoAttachEvent='onclick:onClick' dojoAttachPoint='containerNode'></div>\"\r\n    }\r\n\r\n"}});
define("curam/widget/DivButton",["curam/util","curam/matrix/Constants","dojo/text!curam/widget/resources/DivButton.html","dijit/_Widget","dijit/_Templated"],function(util,_c0d,_c0e){
var _c0f=dojo.declare("curam.widget.DivButtonBase",dijit._Widget,{isContainer:true,disabled:false,menuId:"",id:"",className:"",postCreate:function(args,frag){
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
var _c10=dojo.create("span",{},this.domNode,"before");
}
dojo.body().appendChild(this.domNode);
if(_c10){
dojo.place(this.domNode,_c10,"before");
dojo.destroy(_c10);
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
if(_c0d.container.matrix.isValidationActive()){
if(menu.isShowingNow){
menu.close();
}
return false;
}
return true;
},_setActiveMenu:function(_c11){
var menu=dijit.byId(_c11);
if(!menu){
return;
}
if(menu.isShowingNow){
this.setActiveMenuId();
}
},_toggleMenu:function(_c12,_c13){
this._setActiveMenu(_c12);
dijit.byId(_c12).setButton(this);
}});
var _c14=dojo.declare("curam.widget.DivButton",[curam.widget.DivButtonBase,dijit._Templated],{templateString:_c0e});
dojo.declare("curam.widget.QuestionButton",curam.widget.DivButtonBase,{postCreate:function(){
this.className+="number number-col-eval q-ct-eval-"+this.qId;
util.connect(this.domNode,"onmouseover",dojo.hitch(this,this.onMouseOver));
this.inherited(arguments);
},onMouseOver:function(_c15){
curam.matrix.util.buttonMouseOver(_c15);
},_toggleMenu:function(_c16,_c17){
this._setActiveMenu(_c16);
dijit.byId(_c16).setButton(this);
},setActiveMenuId:function(){
window.activeMenuID=this.domNode.parentNode.id;
}});
dojo.declare("curam.widget.AnswerButton",curam.widget.DivButtonBase,{className:"image",_toggleMenu:function(_c18,_c19){
this._setActiveMenu(_c18);
var menu=dijit.byId(_c18);
var node=_c19.target?_c19.target:_c19;
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
dojo.declare("curam.widget.CombinationButton",curam.widget.DivButtonBase,{className:"image",_toggleMenu:function(_c1a,_c1b){
this._setActiveMenu(_c1a);
dijit.byId(_c1a).setButton(this);
var node=_c1b.target?_c1b.target:_c1b;
var menu=dijit.byId(_c1a);
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
},_toggleMenu:function(_c1c,_c1d){
this._setActiveMenu(_c1c);
dijit.byId(_c1c).setButton(this);
}});
dojo.declare("curam.widget.ScoreButton",curam.widget.PriorityButton,{});
return _c0f;
});
},"curam/layout/CuramTabContainer":function(){
define("curam/layout/CuramTabContainer",["dijit/layout/TabContainer","curam/layout/ScrollingTabController"],function(_c1e){
var _c1f=dojo.declare("curam.layout.CuramTabContainer",_c1e,{postMixInProperties:function(){
if(!this.controllerWidget){
this.controllerWidget=(this.tabPosition=="top"||this.tabPosition=="bottom")&&!this.nested?"curam.layout.ScrollingTabController":"dijit.layout.TabController";
}
this.inherited(arguments);
}});
return _c1f;
});
},"dijit/layout/ContentPane":function(){
define("dijit/layout/ContentPane",["dojo/_base/kernel","dojo/_base/lang","../_Widget","./_ContentPaneResizeMixin","dojo/string","dojo/html","dojo/i18n!../nls/loading","dojo/_base/array","dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-attr","dojo/_base/window","dojo/_base/xhr","dojo/i18n"],function(_c20,lang,_c21,_c22,_c23,html,_c24,_c25,_c26,_c27,dom,_c28,win,xhr,i18n){
var _c29=typeof (dojo.global.perf)!="undefined";
return _c26("dijit.layout.ContentPane",[_c21,_c22],{href:"",content:"",extractContent:false,parseOnLoad:true,parserScope:_c20._scopeName,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'><span class='dijitInline dijitIconLoading'></span>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'><span class='dijitInline dijitIconError'></span>${errorState}</span>",isLoaded:false,baseClass:"dijitContentPane",ioArgs:{},onLoadDeferred:null,_setTitleAttr:null,stopParser:true,template:false,create:function(_c2a,_c2b){
if((!_c2a||!_c2a.template)&&_c2b&&!("href" in _c2a)&&!("content" in _c2a)){
var df=win.doc.createDocumentFragment();
_c2b=dom.byId(_c2b);
while(_c2b.firstChild){
df.appendChild(_c2b.firstChild);
}
_c2a=lang.delegate(_c2a,{content:df});
}
this.inherited(arguments,[_c2a,_c2b]);
},postMixInProperties:function(){
this.inherited(arguments);
var _c2c=i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=_c23.substitute(this.loadingMessage,_c2c);
this.errorMessage=_c23.substitute(this.errorMessage,_c2c);
},buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
this.domNode.title="";
if(!_c28.get(this.domNode,"role")){
this.domNode.setAttribute("role","group");
}
this.domNode.removeAttribute("title");
},startup:function(){
this.inherited(arguments);
if(this._contentSetter){
_c25.forEach(this._contentSetter.parseResults,function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
},this);
}
},setHref:function(href){
_c20.deprecated("dijit.layout.ContentPane.setHref() is deprecated. Use set('href', ...) instead.","","2.0");
return this.set("href",href);
},_setHrefAttr:function(href){
this.cancel();
this.onLoadDeferred=new _c27(lang.hitch(this,"cancel"));
this.onLoadDeferred.addCallback(lang.hitch(this,"onLoad"));
this._set("href",href);
if(this.preload||(this._created&&this._isShown())){
this._load();
}else{
this._hrefChanged=true;
}
return this.onLoadDeferred;
},setContent:function(data){
_c20.deprecated("dijit.layout.ContentPane.setContent() is deprecated.  Use set('content', ...) instead.","","2.0");
this.set("content",data);
},_setContentAttr:function(data){
this._set("href","");
this.cancel();
this.onLoadDeferred=new _c27(lang.hitch(this,"cancel"));
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
},destroyRecursive:function(_c2d){
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
this.onLoadDeferred=new _c27(lang.hitch(this,"cancel"));
this.onLoadDeferred.addCallback(lang.hitch(this,"onLoad"));
this._load();
return this.onLoadDeferred;
},_load:function(){
if(_c29){
perf.widgetStartedLoadingCallback();
}
this._setContent(this.onDownloadStart(),true);
var self=this;
var _c2e={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(lang.isObject(this.ioArgs)){
lang.mixin(_c2e,this.ioArgs);
}
var hand=(this._xhrDfd=(this.ioMethod||xhr.get)(_c2e));
hand.addCallback(function(html){
try{
self._isDownloaded=true;
self._setContent(html,false);
self.onDownloadEnd();
}
catch(err){
self._onError("Content",err);
}
if(_c29){
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
},destroyDescendants:function(_c2f){
if(this.isLoaded){
this._onUnloadHandler();
}
var _c30=this._contentSetter;
_c25.forEach(this.getChildren(),function(_c31){
if(_c31.destroyRecursive){
_c31.destroyRecursive(_c2f);
}
});
if(_c30){
_c25.forEach(_c30.parseResults,function(_c32){
if(_c32.destroyRecursive&&_c32.domNode&&_c32.domNode.parentNode==win.body()){
_c32.destroyRecursive(_c2f);
}
});
delete _c30.parseResults;
}
if(!_c2f){
html._emptyNode(this.containerNode);
}
delete this._singleChild;
},_setContent:function(cont,_c33){
this.destroyDescendants();
var _c34=this._contentSetter;
if(!(_c34&&_c34 instanceof html._ContentSetter)){
_c34=this._contentSetter=new html._ContentSetter({node:this.containerNode,_onError:lang.hitch(this,this._onError),onContentError:lang.hitch(this,function(e){
var _c35=this.onContentError(e);
try{
this.containerNode.innerHTML=_c35;
}
catch(e){
console.error("Fatal "+this.id+" could not change content due to "+e.message,e);
}
})});
}
var _c36=lang.mixin({cleanContent:this.cleanContent,extractContent:this.extractContent,parseContent:!cont.domNode&&this.parseOnLoad,parserScope:this.parserScope,startup:false,dir:this.dir,lang:this.lang,textDir:this.textDir},this._contentSetterParams||{});
_c34.set((lang.isObject(cont)&&cont.domNode)?cont.domNode:cont,_c36);
delete this._contentSetterParams;
if(this.doLayout){
this._checkIfSingleChild();
}
if(!_c33){
if(this._started){
delete this._started;
this.startup();
this._scheduleLayout();
}
this._onLoadHandler(cont);
}
},_onError:function(type,err,_c37){
this.onLoadDeferred.errback(err);
var _c38=this["on"+type+"Error"].call(this,err);
if(_c37){
console.error(_c37,err);
}else{
if(_c38){
this._setContent(_c38,true);
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
},"curam/pagination/ControlPanel":function(){
define("curam/pagination/ControlPanel",["curam/pagination","curam/debug","curam/util"],function(){
var _c39=dojo.declare("curam.pagination.ControlPanel",null,{first:"FIRST",last:"LAST",previous:"PREV",next:"NEXT",page:"GOTO_PAGE",pageSize:"PAGE_SIZE",rowInfo:"ROW_INFO",classFirst:"first",classLast:"last",classPrevious:"previous",classNext:"next",classPage:"page",classDisplayInfo:"display_info",_controls:undefined,currentPage:0,lastPage:9999,currentPageSize:0,directLinkRangeWidth:3,parentNode:undefined,handlers:undefined,directLinksDisconnects:undefined,constructor:function(_c3a){
this._controls={};
this.handlers={};
this.directLinksDisconnects=[];
var loc=this._localize;
var ul=dojo.create("ul",null,_c3a);
dojo.addClass(ul,"pagination-control-list");
this._controls[this.pageSize]=this._createDropdownControl(this.pageSize,loc("pageSize_title"),ul);
this._controls[this.rowInfo]=this._createDisplayControl(this.rowInfo,loc("pagination_info",["$dummy$","$dummy$","$dummy$"]),ul,null,null);
this._controls[this.first]=this._createLinkControl(this.first,loc("firstPage_btn"),ul,null,this.classFirst,loc("firstPage_title"));
this._controls[this.previous]=this._createLinkControl(this.previous,loc("prevPage_btn"),ul,null,this.classPrevious,loc("prevPage_title"));
this._controls[this.page]=[];
this._controls[this.page].push(this._createLinkControl(this.page,"direct-page-links-section",ul,null,this.classPage,loc("page_title")));
this._controls[this.next]=this._createLinkControl(this.next,loc("nextPage_btn"),ul,null,this.classNext,loc("nextPage_title"));
this._controls[this.last]=this._createLinkControl(this.last,loc("lastPage_btn"),ul,null,this.classLast,loc("lastPage_title"));
this.parentNode=_c3a;
dojo.style(_c3a,{"display":""});
},_localize:function(_c3b,_c3c){
var _c3d=curam.pagination.localizedStrings[_c3b];
if(!_c3c){
return _c3d;
}
for(var i=0;i<_c3c.length;i++){
_c3d=_c3d.replace(/%s/i,_c3c[i]);
}
return _c3d;
},_createLinkControl:function(_c3e,text,_c3f,_c40,_c41,_c42){
var cls=_c41!=null?_c41:"";
var li=dojo.create("li",{"id":_c3e,"class":cls},_c3f,_c40);
dojo.addClass(li,"pagination-control-list-item enabled");
var a=dojo.create("a",{"innerHTML":text,"href":"#","title":_c42},li);
dojo.addClass(a,"pagination-link");
if(_c3e==this.first||_c3e==this.last||_c3e==this.previous||_c3e==this.next){
if(curam.util.highContrastModeType()){
var _c43="../CDEJ/themes/v6/images/high-contrast/"+_c3e+"-contrast"+".png";
dojo.create("img",{"src":_c43,"alt":_c42},a);
}else{
var _c43="../CDEJ/themes/v6/images/"+_c3e+".png";
dojo.create("img",{"src":_c43,"alt":_c42},a);
}
}else{
var text=dojo.create("p",{"innerHTML":text},li);
dojo.addClass(text,"pagination-text");
}
return li;
},_createDropdownControl:function(_c44,text,_c45,_c46){
var li=dojo.create("li",{"id":_c44},_c45,_c46);
dojo.addClass(li,"pagination-control-list-item");
var _c47="page-size-select"+new Date().getTime();
var _c48=dojo.create("label",{"innerHTML":text+": ","for":_c47},li);
dojo.addClass(_c48,"pagination-page-size-dropdown-label");
var _c49=dojo.create("select",{"title":text,"id":_c47},li);
li._type="dropdown";
return li;
},_createDisplayControl:function(_c4a,text,_c4b,_c4c,_c4d){
var cls=_c4d!=null?_c4d:"";
var li=dojo.create("li",{"id":_c4a,"class":cls},_c4b,_c4c);
dojo.addClass(li,"pagination-control-list-item");
var text=dojo.create("p",{"innerHTML":"["+text+"]"},li);
return li;
},updateState:function(_c4e){
curam.debug.log("curam.pagination.ControlPanel.updateState: ",_c4e);
if(typeof (_c4e.first)!="undefined"){
this._setEnabled(this._controls[this.first],_c4e.first);
}
if(typeof (_c4e.previous)!="undefined"){
this._setEnabled(this._controls[this.previous],_c4e.previous);
}
if(typeof (_c4e.next)!="undefined"){
this._setEnabled(this._controls[this.next],_c4e.next);
}
if(typeof (_c4e.last)!="undefined"){
this._setEnabled(this._controls[this.last],_c4e.last);
}
if(typeof (_c4e.currentPage)!="undefined"){
this.currentPage=_c4e.currentPage;
}
if(typeof (_c4e.lastPage)!="undefined"){
this.lastPage=_c4e.lastPage;
}
if(typeof (_c4e.currentPageSize)!="undefined"){
this.currentPageSize=_c4e.currentPageSize;
}
if(typeof (_c4e.directLinkRangeWidth)!="undefined"){
this.directLinkRangeWidth=_c4e.directLinkRangeWidth;
}
if(typeof (_c4e.rowInfo)!="undefined"){
var _c4f=this._controls[this.rowInfo].previousSibling;
dojo.destroy(this._controls[this.rowInfo]);
var _c50=_c4e.rowInfo[0];
var end=_c4e.rowInfo[1];
var _c51=_c4e.rowInfo[2];
var _c52=this._localize("pagination_info",[_c50,end,_c51]);
this._controls[this.rowInfo]=this._createDisplayControl(this.rowInfo,_c52,_c4f,"after",this.classDisplayInfo);
}
if(typeof (_c4e.pageSizeOptions)!="undefined"){
var _c53=dojo.query("select",this._controls[this.pageSize])[0];
dojo.forEach(_c53.childNodes,function(item){
dojo.destroy(item);
});
for(var i=0;i<_c4e.pageSizeOptions.length;i++){
var _c54=_c4e.pageSizeOptions[i];
var _c55=dojo.create("option",{"value":_c54,"innerHTML":_c54},_c53);
if(_c54==this.currentPageSize){
dojo.attr(_c55,"selected","selected");
}
}
}
this._updateDirectLinks();
var _c56=dijit.byId("content");
if(_c56){
_c56.resize();
}
},setHandlers:function(_c57){
curam.debug.log("curam.pagination.ControlPanel.setHandlers: ",_c57);
this.handlers=_c57;
if(_c57.first){
this._connectSimpleHandler(this._controls[this.first],_c57.first);
}
if(_c57.previous){
this._connectSimpleHandler(this._controls[this.previous],_c57.previous);
}
if(_c57.next){
this._connectSimpleHandler(this._controls[this.next],_c57.next);
}
if(_c57.last){
this._connectSimpleHandler(this._controls[this.last],_c57.last);
}
if(_c57.page){
this._connectDirectLinkHandlers(_c57.page);
}
if(_c57.pageSize){
var _c58=dojo.query("select",this._controls[this.pageSize])[0];
dojo.connect(_c58,"onchange",dojo.hitch(this,function(_c59){
var _c5a=_c59.target.value;
this.currentPageSize=_c5a;
_c57.pageSize(this.currentPageSize);
var _c5b=dojo.query("option",_c58);
_c5b.forEach(function(_c5c){
if(dojo.attr(_c5c,"value")==_c5a){
dojo.attr(_c5c,"selected","selected");
}else{
dojo.removeAttr(_c5c,"selected");
}
});
}));
}
},_connectSimpleHandler:function(_c5d,_c5e){
var h=_c5e?_c5e:_c5d._handler;
this._removeSimpleHandler(_c5d);
var _c5f=curam.util.connect(_c5d,"onclick",function(_c60){
dojo.stopEvent(_c60);
h();
});
_c5d._handler=h;
_c5d._disconnect=_c5f;
},_removeSimpleHandler:function(_c61){
if(_c61._disconnect){
curam.util.disconnect(_c61._disconnect);
}
},reset:function(){
curam.debug.log("curam.pagination.ControlPanel.reset");
},_getDirectLinkPageNumbers:function(){
var _c62=2*this.directLinkRangeWidth+1;
var p=this.currentPage;
var _c63=[];
var num=p>this.directLinkRangeWidth?p-this.directLinkRangeWidth:1;
for(var i=0;i<_c62;i++){
_c63[i]=num++;
if(num>this.lastPage){
break;
}
}
return _c63;
},_updateDirectLinks:function(){
curam.debug.log("curam.pagination.ControlPanel._updateDirectLinks");
var loc=this._localize;
var _c64=this._controls[this.page];
dojo.query("div.pagination-direct-links-dots").forEach(dojo.destroy);
var _c65=_c64[0].previousSibling;
dojo.style(this.parentNode,"display","none");
for(var i=0;i<_c64.length;i++){
if(_c64._dots){
dojo.destroy(_c64._dots);
}
dojo.destroy(_c64[i]);
_c64[i]=undefined;
}
this._controls[this.page]=[];
_c64=this._controls[this.page];
var _c66=this._getDirectLinkPageNumbers();
for(var i=0;i<_c66.length;i++){
var _c67=_c66[i];
_c64[i]=this._createLinkControl(this.page+"("+_c67+")",_c67,_c65,"after",null,loc("page_title")+" "+_c67);
dojo.addClass(_c64[i],"pagination-direct-link");
if(_c67==this.currentPage){
dojo.addClass(_c64[i],"selected");
}
_c65=_c64[i];
_c64[i]._pageNum=_c67;
}
var _c68=_c64[0];
dojo.addClass(_c68,"firstDirectLink");
if(_c66[0]>1){
dojo.addClass(_c68,"has-previous");
var dots=dojo.create("div",{innerHTML:"..."},_c68,"before");
dojo.addClass(dots,"pagination-direct-links-dots");
}
var _c69=_c64[_c64.length-1];
dojo.addClass(_c69,"lastDirectLink");
if(_c66[_c66.length-1]<this.lastPage){
dojo.addClass(_c69,"has-next");
var dots=dojo.create("div",{innerHTML:"..."},_c69,"after");
dojo.addClass(dots,"pagination-direct-links-dots");
}
if(this.handlers.page){
this._connectDirectLinkHandlers(this.handlers.page);
}
dojo.style(this.parentNode,"display","");
},_connectDirectLinkHandlers:function(_c6a){
dojo.forEach(this.directLinksDisconnects,dojo.disconnect);
this.directLinksDisconnects=[];
var _c6b=this._controls[this.page];
for(var i=0;i<_c6b.length;i++){
var _c6c=_c6b[i];
var h=function(_c6d){
dojo.stopEvent(_c6d);
_c6a(this._pageNum);
};
h._pageNum=_c6c._pageNum;
this.directLinksDisconnects.push(dojo.connect(_c6c,"onclick",h));
}
},_setEnabled:function(_c6e,_c6f){
if(_c6f){
this._connectSimpleHandler(_c6e);
dojo.replaceClass(_c6e,"enabled","disabled");
}else{
this._removeSimpleHandler(_c6e);
dojo.replaceClass(_c6e,"disabled","enabled");
}
}});
return _c39;
});
},"curam/util/RuntimeContext":function(){
define("curam/util/RuntimeContext",[],function(){
var _c70=dojo.declare("curam.util.RuntimeContext",null,{_window:null,constructor:function(_c71){
this._window=_c71;
},getHref:function(){
return this._window.location.href;
},getPathName:function(){
return this._window.location.pathName;
},contextObject:function(){
return this._window;
}});
return _c70;
});
},"url:dijit/form/templates/ValidationTextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","url:dijit/form/templates/TextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","dijit/layout/utils":function(){
define("dijit/layout/utils",["dojo/_base/array","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang",".."],function(_c72,_c73,_c74,_c75,lang,_c76){
var _c77=lang.getObject("layout",true,_c76);
_c77.marginBox2contentBox=function(node,mb){
var cs=_c75.getComputedStyle(node);
var me=_c74.getMarginExtents(node,cs);
var pb=_c74.getPadBorderExtents(node,cs);
return {l:_c75.toPixelValue(node,cs.paddingLeft),t:_c75.toPixelValue(node,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)};
};
function _c78(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
};
function size(_c79,dim){
var _c7a=_c79.resize?_c79.resize(dim):_c74.setMarginBox(_c79.domNode,dim);
if(_c79.fakeWidget){
return;
}
if(_c7a){
lang.mixin(_c79,_c7a);
}else{
lang.mixin(_c79,_c74.getMarginBoxSimple(_c79.domNode));
lang.mixin(_c79,dim);
}
};
_c77.layoutChildren=function(_c7b,dim,_c7c,_c7d,_c7e){
dim=lang.mixin({},dim);
_c73.add(_c7b,"dijitLayoutContainer");
_c7c=_c72.filter(_c7c,function(item){
return item.region!="center"&&item.layoutAlign!="client";
}).concat(_c72.filter(_c7c,function(item){
return item.region=="center"||item.layoutAlign=="client";
}));
var _c7f={};
_c72.forEach(_c7c,function(_c80){
var elm=_c80.domNode,pos=(_c80.region||_c80.layoutAlign);
if(!pos){
throw new Error("No region setting for "+_c80.id);
}
var _c81=elm.style;
_c81.left=dim.l+"px";
_c81.top=dim.t+"px";
_c81.position="absolute";
_c73.add(elm,"dijitAlign"+_c78(pos));
var _c82={};
if(_c7d&&_c7d==_c80.id){
_c82[_c80.region=="top"||_c80.region=="bottom"?"h":"w"]=_c7e;
}
if(pos=="top"||pos=="bottom"){
_c82.w=dim.w;
size(_c80,_c82);
dim.h-=_c80.h;
if(pos=="top"){
dim.t+=_c80.h;
}else{
_c81.top=dim.t+dim.h+"px";
}
}else{
if(pos=="left"||pos=="right"){
_c82.h=dim.h;
size(_c80,_c82);
dim.w-=_c80.w;
if(pos=="left"){
dim.l+=_c80.w;
}else{
_c81.left=dim.l+dim.w+"px";
}
}else{
if(pos=="client"||pos=="center"){
size(_c80,dim);
}
}
}
_c7f[pos]={w:dim.w,h:dim.h};
});
return _c7f;
};
return {marginBox2contentBox:_c77.marginBox2contentBox,layoutChildren:_c77.layoutChildren};
});
},"dijit/_Contained":function(){
define("dijit/_Contained",["dojo/_base/declare","./registry"],function(_c83,_c84){
return _c83("dijit._Contained",null,{_getSibling:function(_c85){
var node=this.domNode;
do{
node=node[_c85+"Sibling"];
}while(node&&node.nodeType!=1);
return node&&_c84.byNode(node);
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
},"dijit/_KeyNavContainer":function(){
define("dijit/_KeyNavContainer",["dojo/_base/kernel","./_Container","./_FocusMixin","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/event","dojo/dom-attr","dojo/_base/lang"],function(_c86,_c87,_c88,_c89,keys,_c8a,_c8b,_c8c,lang){
return _c8a("dijit._KeyNavContainer",[_c88,_c87],{tabIndex:"0",connectKeyNavHandlers:function(_c8d,_c8e){
var _c8f=(this._keyNavCodes={});
var prev=lang.hitch(this,"focusPrev");
var next=lang.hitch(this,"focusNext");
_c89.forEach(_c8d,function(code){
_c8f[code]=prev;
});
_c89.forEach(_c8e,function(code){
_c8f[code]=next;
});
_c8f[keys.HOME]=lang.hitch(this,"focusFirstChild");
_c8f[keys.END]=lang.hitch(this,"focusLastChild");
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
this.connect(this.domNode,"onfocus","_onContainerFocus");
},startupKeyNavChildren:function(){
_c86.deprecated("startupKeyNavChildren() call no longer needed","","2.0");
},startup:function(){
this.inherited(arguments);
_c89.forEach(this.getChildren(),lang.hitch(this,"_startupChild"));
},addChild:function(_c90,_c91){
this.inherited(arguments);
this._startupChild(_c90);
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
},focusChild:function(_c92,last){
if(!_c92){
return;
}
if(this.focusedChild&&_c92!==this.focusedChild){
this._onChildBlur(this.focusedChild);
}
_c92.set("tabIndex",this.tabIndex);
_c92.focus(last?"end":"start");
this._set("focusedChild",_c92);
},_startupChild:function(_c93){
_c93.set("tabIndex","-1");
this.connect(_c93,"_onFocus",function(){
_c93.set("tabIndex",this.tabIndex);
});
this.connect(_c93,"_onBlur",function(){
_c93.set("tabIndex","-1");
});
},_onContainerFocus:function(evt){
if(evt.target!==this.domNode||this.focusedChild){
return;
}
this.focusFirstChild();
_c8c.set(this.domNode,"tabIndex","-1");
},_onBlur:function(evt){
if(this.tabIndex){
_c8c.set(this.domNode,"tabIndex",this.tabIndex);
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
_c8b.stop(evt);
}
},_onChildBlur:function(){
},_getFirstFocusableChild:function(){
return this._getNextFocusableChild(null,1);
},_getLastFocusableChild:function(){
return this._getNextFocusableChild(null,-1);
},_getNextFocusableChild:function(_c94,dir){
if(_c94){
_c94=this._getSiblingOfChild(_c94,dir);
}
var _c95=this.getChildren();
for(var i=0;i<_c95.length;i++){
if(!_c94){
_c94=_c95[(dir>0)?0:(_c95.length-1)];
}
if(_c94.isFocusable()){
return _c94;
}
_c94=this._getSiblingOfChild(_c94,dir);
}
return null;
}});
});
},"curam/ui/SectionShortcutsPanel":function(){
define("curam/ui/SectionShortcutsPanel",["curam/define","curam/tab","curam/util","curam/ui/UIController"],function(){
var _c96=curam.define.singleton("curam.ui.SectionShortcutsPanel",{handleClickOnAnchorElement:function(_c97,_c98){
if(!_c98){
curam.tab.getTabController().handleUIMPageID(_c97);
}else{
curam.ui.SectionShortcutsPanel.openInModal(_c97);
}
},handleClick:function(_c99,item){
var _c9a=eval(_c99+"JsonStore");
var _c9b=_c9a.getValue(item,"pageID");
var _c9c=_c9a.getValue(item,"openInModal");
if(!_c9c){
curam.tab.getTabController().handleUIMPageID(_c9b);
}else{
curam.ui.SectionShortcutsPanel.openInModal(_c9b);
}
},openInModal:function(_c9d){
var _c9e=_c9d+"Page.do";
var _c9f={};
curam.tab.getTabController().handleLinkClick(_c9e,_c9f);
},setupCleanupScript:function(_ca0){
dojo.ready(function(){
var _ca1=eval(_ca0+"JsonStore");
dojo.addOnWindowUnload(function(){
_ca1.close();
});
});
}});
return _c96;
});
},"curam/util/WordFileEdit":function(){
define("curam/util/WordFileEdit",["curam/define","dijit/DialogUnderlay","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _ca2=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.WordFileEdit",{_clickedFinish:false,_buttonIdPart:"__o3btn.",searchWindow:null,cantLoadControlMsg:"$unlocalized$ cannot load Word integration control",cantSubmitMsg:"$unlocalized$ cannot submit data",searchWindowTitlePrefix:"SEARCH",useApplet:(function(){
return typeof dojo.isIE=="undefined";
})(),controlAttributes:{},controlParameters:{},submitSaveWordFileEdit:function(_ca3,_ca4){
try{
var _ca5=curam.util.WordFileEdit.getParentWindow();
var _ca6=curam.util.WordFileEdit._findTextArea(_ca5,_ca3);
_ca6.value=_ca4;
_ca5.document.forms[0].submit();
}
catch(e){
alert("Error saving: "+dojo.toJson(e));
}
return;
},openWordFileEditWindow:function(_ca7,_ca8,_ca9){
if(curam.util.WordFileEdit.getSearchPage().length>0){
curam.util.WordFileEdit.displaySearchWindow(_ca7,_ca8,_ca9);
}else{
curam.util.WordFileEdit.doOpenWordFileEditWindow(_ca7,_ca8,_ca9);
}
},doOpenWordFileEditWindow:function(_caa,_cab,_cac){
var _cad=100;
var _cae=100;
var _caf=Math.floor((screen.width-_cad)/2);
var _cb0=Math.floor((screen.height-_cae)/2);
window.open("../word-file-edit.jsp?id="+_caa+"&document-field="+_cab+"&details-field="+_cac,new Date().valueOf(),"toolbar=no,menubar=no,location=no,scrollbars=no,"+"resizable=no,top="+_cb0+",left="+_caf+",width="+_cad+",height="+_cae);
},displaySearchWindow:function(_cb1,_cb2,_cb3,_cb4){
if(!_cb4){
_cb4=0;
}
if(_cb4>3){
return;
}
if(_cb4==0){
curam.util.WordFileEdit.searchWindow=window.open("about:blank","searchWindow","left=40000,top=40000,scrollbars=yes");
}
var _cb5=false;
try{
var _cb6=curam.util.WordFileEdit.searchWindow.document.title;
if(_cb6.indexOf(searchWindowTitlePrefix+":")==-1){
curam.util.WordFileEdit.searchWindow.document.title=searchWindowTitlePrefix+":"+_cb1;
}else{
_cb5=true;
}
_cb6=curam.util.WordFileEdit.searchWindow.document.title;
if(!_cb5&&_cb6.indexOf(searchWindowTitlePrefix+":")!=-1){
_cb5=true;
}
}
catch(e){
}
if(!_cb5){
_cb4++;
window.setTimeout("displaySearchWindow('"+_cb1+"','"+_cb2+"','"+_cb3+"',"+_cb4+")",500);
}else{
curam.util.WordFileEdit.doOpenWordFileEditWindow(_cb1,_cb2,_cb3);
}
},redisplaySearchWindow:function(_cb7,_cb8){
if(!_cb8){
_cb8=0;
}
if(_cb8>3){
return;
}
if(_cb8==0){
curam.util.WordFileEdit.searchWindow=window.open("about:blank","searchWindow","left=40000,top=40000");
}
var _cb9=false;
try{
var _cba=curam.util.WordFileEdit.searchWindow.document.title;
if(_cba.indexOf(searchWindowTitlePrefix+":")==-1){
curam.util.WordFileEdit.searchWindow.document.title=searchWindowTitlePrefix+":"+_cb7;
}else{
_cb9=true;
}
_cba=curam.util.WordFileEdit.searchWindow.document.title;
if(!_cb9&&_cba.indexOf(searchWindowTitlePrefix+":")!=-1){
_cb9=true;
}
}
catch(e){
}
if(!_cb9){
_cb8++;
window.setTimeout("redisplaySearchWindow('"+_cb7+"',"+_cb8+")",500);
}
},getSearchPage:function(_cbb){
var _cbc="";
try{
if(!_cbb){
_cbc=document.getElementById("searchPage").value;
}else{
var _cbd=curam.util.WordFileEdit.getParentWindow();
_cbc=_cbd.document.getElementById("searchPage").value;
}
}
catch(e){
}
return _cbc;
},initialize:function(_cbe){
var _cbf=curam.util.WordFileEdit.getParentWindow();
try{
var _cc0=dojo.byId(_cbe);
if(typeof _cc0!="undefined"){
curam.util.WordFileEdit._setOverlay(true);
if(curam.util.WordFileEdit.useApplet){
if(!dojo.isIE){
var _cc1=_cbf.frameElement;
curam.util.connect(_cc1,"onload",function(evt){
var _cc2=dojo.fixEvent(evt,_cc1);
var url=_cc1.contentWindow.location.href;
try{
_cc0.mainApplicationPageLoaded(url);
}
catch(e){
alert("Error calling mainApplicationPageLoaded on applet: "+e.message);
}
});
_cbf.top.dojo.addOnUnload(function(){
_cc0.mainApplicationPageUnloaded();
});
}
}else{
_cc0.openDocument();
}
}else{
curam.util.WordFileEdit._setOverlay(false);
curam.util.WordFileEdit.closeAppletWindow();
}
}
catch(e){
curam.util.WordFileEdit._setOverlay(false);
curam.util.WordFileEdit.closeAppletWindow();
_cbf.curam.util.WordFileEdit.cannotLoadControl(e);
}
},_setOverlay:function(_cc3){
try{
var _cc4=curam.util.WordFileEdit.getParentWindow();
var _cc5=(_cc4!=null)?_cc4.curam.util.getTopmostWindow():curam.util.getTopmostWindow();
if(_cc5!=window){
_cc5.dojo.require("curam/util/WordFileEdit");
_cc5.curam.util.WordFileEdit._setOverlay(_cc3);
return;
}
if(!curam.util.WordFileEdit._overlay){
curam.util.WordFileEdit._overlay=new dijit.DialogUnderlay({dialogId:"dummy","class":"word-file-edit-overlay"});
}
var ovr=curam.util.WordFileEdit._overlay;
if(_cc3){
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
},getWordFileEditParentTextareaValue:function(_cc6){
var _cc7="";
try{
var _cc8=curam.util.WordFileEdit.getParentWindow();
var _cc9=curam.util.WordFileEdit._findTextArea(_cc8,_cc6);
_cc7=_cc9.value;
}
catch(e){
alert("getWordFileEditParentTextareaValue('"+_cc6+"'): \r"+e.message);
}
return _cc7;
},_findTextArea:function(_cca,_ccb,_ccc){
var _ccd=null;
if(!_ccc){
_ccd=_cca.dojo.query("input[name='"+_ccb+"']",_cca.dojo.body())[0];
}else{
_ccd=_cca.dojo.query("input[name$='"+_ccb+"']",_cca.dojo.body())[0];
}
return _ccd;
},finishedWordFileEditWindow:function(_cce,_ccf,_cd0){
if(!curam.util.WordFileEdit._clickedFinish){
curam.util.WordFileEdit.doFinishWordFileEditWindow(_cce,_ccf,_cd0);
curam.util.WordFileEdit._clickedFinish=true;
}
},doFinishWordFileEditWindow:function(_cd1,_cd2,_cd3){
var _cd4=false;
var _cd5=false;
try{
var _cd6=curam.util.WordFileEdit.getParentWindow();
if(_cd2&&_cd3){
_cd5=true;
var _cd7=curam.util.WordFileEdit._findTextArea(_cd6,_cd2);
_cd7.value=_cd3;
}
var _cd8=_cd6.dojo.query("form input");
for(var i=0;i<_cd8.length&&!_cd4;i++){
if(_cd8[i].id.substring(0,curam.util.WordFileEdit._buttonIdPart.length).toLowerCase()==curam.util.WordFileEdit._buttonIdPart.toLowerCase()){
_cd4=true;
if(!_cd5){
var _cd7=curam.util.WordFileEdit._findTextArea(_cd6,_cd2);
_cd7.value="";
var _cd9=false;
var _cda;
var _cdb=_cd8[i];
try{
while(_cdb.tagName.toUpperCase()!="BODY"&&!_cd9){
if(_cdb.tagName.toUpperCase()=="FORM"){
_cd9=true;
_cda=_cdb;
}else{
_cdb=_cdb.parentElement;
}
}
}
catch(e){
alert("doFinishWordFileEditWindow: "+e.message);
}
if(_cd9){
var _cdc="<input type=\"hidden\" name=\"__o3NoSave\" value=\"true\"/>";
_cda.innerHTML+=_cdc;
}
}
_cd6.curam.util.clickButton(_cd8[i].id);
if(_cd1.length>0){
_cd6.document.body.innerHTML=_cd1;
}
curam.util.WordFileEdit._setOverlay(false);
return;
}
}
if(!_cd4){
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
},screenAlertWordFileEditWindow:function(_cdd){
try{
curam.util.WordFileEdit.getParentWindow().alert(_cdd);
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
var _cde=curam.util.WordFileEdit.getParentWindow();
var doc=_cde.document;
var _cdf=doc.URL;
var _ce0=_cde.dojo.query("form",doc)[0];
var _ce1=_ce0.action;
var _ce2=_cdf.substr(0,_cdf.lastIndexOf("/")+1);
window.curam.util.WordFileEdit.urlPath_return_value=_ce2;
var _ce3=(dojo.isIE>=8)?_ce1:_ce2+_ce1;
window.curam.util.WordFileEdit.allowedUrl_return_value=_ce3;
return [_ce2,_ce3];
}
catch(e){
alert("getUrls: "+dojo.toJson(e));
}
},getTitle:function(){
var _ce4=curam.util.WordFileEdit.getParentWindow().top.document.title;
curam.util.WordFileEdit.title_return_value=_ce4;
window.curam_wordIntegration_title_return_value=_ce4;
return _ce4;
},setTitle:function(_ce5){
curam.util.WordFileEdit.getParentWindow().top.document.title=_ce5;
},hasNamedInput:function(_ce6){
var _ce7=curam.util.WordFileEdit.getParentWindow();
var _ce8=_ce6.slice(1);
var _ce9=curam.util.WordFileEdit._findTextArea(_ce7,_ce8,true);
return _ce9?true:false;
},closeAppletWindow:function(){
self.close();
},runApplet:function(id){
if(typeof deployJava!="undefined"){
var _cea=deployJava.getPlugin();
if(_cea){
curam.debug.log(_ca2.getProperty("curam.util.WordFileEdit.version"),_cea.version);
}else{
curam.debug.log(_ca2.getProperty("curam.util.WordFileEdit.no.plugin"));
}
}else{
curam.debug.log(_ca2.getProperty("curam.util.WordFileEdit.no.java"));
}
if(typeof deployJava=="undefined"||(!dojo.isChrome&&!deployJava.isPlugin2())){
alert(curam.util.WordFileEdit.noJavaInstalled);
}else{
dojo.mixin(curam.util.WordFileEdit.controlAttributes,{id:id});
var _ceb=dojo.create("div",{style:"display:none"});
var _cec=dojo.create("applet",curam.util.WordFileEdit.controlAttributes,_ceb);
var _ced=curam.util.WordFileEdit.controlParameters;
for(property in _ced){
dojo.create("param",{name:property,value:_ced[property]},_cec);
}
var _cee=_ceb.innerHTML;
dojo.destroy(_ceb);
document.write(_cee);
}
}});
return curam.util.WordFileEdit;
});
},"dijit/form/DataList":function(){
define("dijit/form/DataList",["dojo/_base/declare","dojo/dom","dojo/_base/lang","dojo/query","dojo/store/Memory","../registry"],function(_cef,dom,lang,_cf0,_cf1,_cf2){
function _cf3(_cf4){
return {id:_cf4.value,value:_cf4.value,name:lang.trim(_cf4.innerText||_cf4.textContent||"")};
};
return _cef("dijit.form.DataList",_cf1,{constructor:function(_cf5,_cf6){
this.domNode=dom.byId(_cf6);
lang.mixin(this,_cf5);
if(this.id){
_cf2.add(this);
}
this.domNode.style.display="none";
this.inherited(arguments,[{data:_cf0("option",this.domNode).map(_cf3)}]);
},destroy:function(){
_cf2.remove(this.id);
},fetchSelectedItem:function(){
var _cf7=_cf0("> option[selected]",this.domNode)[0]||_cf0("> option",this.domNode)[0];
return _cf7&&_cf3(_cf7);
}});
});
},"url:dijit/templates/Dialog.html":"<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span>\n\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabIndex=\"-1\">\n\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t</span>\n\t</div>\n\t\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n","url:dijit/templates/MenuBar.html":"<div class=\"dijitMenuBar dijitMenuPassive\" data-dojo-attach-point=\"containerNode\"  role=\"menubar\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress: _onKeyPress\"></div>\n","dijit/tree/_dndSelector":function(){
define("dijit/tree/_dndSelector",["dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/lang","dojo/mouse","dojo/on","dojo/touch","dojo/_base/window","./_dndContainer"],function(_cf8,_cf9,_cfa,lang,_cfb,on,_cfc,win,_cfd){
return _cfa("dijit.tree._dndSelector",_cfd,{constructor:function(){
this.selection={};
this.anchor=null;
this.events.push(on(this.tree.domNode,_cfc.press,lang.hitch(this,"onMouseDown")),on(this.tree.domNode,_cfc.release,lang.hitch(this,"onMouseUp")),on(this.tree.domNode,_cfc.move,lang.hitch(this,"onMouseMove")));
},singular:false,getSelectedTreeNodes:function(){
var _cfe=[],sel=this.selection;
for(var i in sel){
_cfe.push(sel[i]);
}
return _cfe;
},selectNone:function(){
this.setSelection([]);
return this;
},destroy:function(){
this.inherited(arguments);
this.selection=this.anchor=null;
},addTreeNode:function(node,_cff){
this.setSelection(this.getSelectedTreeNodes().concat([node]));
if(_cff){
this.anchor=node;
}
return node;
},removeTreeNode:function(node){
this.setSelection(this._setDifference(this.getSelectedTreeNodes(),[node]));
return node;
},isTreeNodeSelected:function(node){
return node.id&&!!this.selection[node.id];
},setSelection:function(_d00){
var _d01=this.getSelectedTreeNodes();
_cf8.forEach(this._setDifference(_d01,_d00),lang.hitch(this,function(node){
node.setSelected(false);
if(this.anchor==node){
delete this.anchor;
}
delete this.selection[node.id];
}));
_cf8.forEach(this._setDifference(_d00,_d01),lang.hitch(this,function(node){
node.setSelected(true);
this.selection[node.id]=node;
}));
this._updateSelectionProperties();
},_setDifference:function(xs,ys){
_cf8.forEach(ys,function(y){
y.__exclude__=true;
});
var ret=_cf8.filter(xs,function(x){
return !x.__exclude__;
});
_cf8.forEach(ys,function(y){
delete y["__exclude__"];
});
return ret;
},_updateSelectionProperties:function(){
var _d02=this.getSelectedTreeNodes();
var _d03=[],_d04=[];
_cf8.forEach(_d02,function(node){
_d04.push(node);
_d03.push(node.getTreePath());
});
var _d05=_cf8.map(_d04,function(node){
return node.item;
});
this.tree._set("paths",_d03);
this.tree._set("path",_d03[0]||[]);
this.tree._set("selectedNodes",_d04);
this.tree._set("selectedNode",_d04[0]||null);
this.tree._set("selectedItems",_d05);
this.tree._set("selectedItem",_d05[0]||null);
},onMouseDown:function(e){
if(!this.current||this.tree.isExpandoNode(e.target,this.current)){
return;
}
if(!_cfb.isLeft(e)){
return;
}
e.preventDefault();
var _d06=this.current,copy=_cf9.isCopyKey(e),id=_d06.id;
if(!this.singular&&!e.shiftKey&&this.selection[id]){
this._doDeselect=true;
return;
}else{
this._doDeselect=false;
}
this.userSelect(_d06,copy,e.shiftKey);
},onMouseUp:function(e){
if(!this._doDeselect){
return;
}
this._doDeselect=false;
this.userSelect(this.current,_cf9.isCopyKey(e),e.shiftKey);
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
},userSelect:function(node,_d07,_d08){
if(this.singular){
if(this.anchor==node&&_d07){
this.selectNone();
}else{
this.setSelection([node]);
this.anchor=node;
}
}else{
if(_d08&&this.anchor){
var cr=this._compareNodes(this.anchor.rowNode,node.rowNode),_d09,end,_d0a=this.anchor;
if(cr<0){
_d09=_d0a;
end=node;
}else{
_d09=node;
end=_d0a;
}
var _d0b=[];
while(_d09!=end){
_d0b.push(_d09);
_d09=this.tree._getNextNode(_d09);
}
_d0b.push(end);
this.setSelection(_d0b);
}else{
if(this.selection[node.id]&&_d07){
this.removeTreeNode(node);
}else{
if(_d07){
this.addTreeNode(node,true);
}else{
this.setSelection([node]);
this.anchor=node;
}
}
}
}
},getItem:function(key){
var _d0c=this.selection[key];
return {data:_d0c,type:["treeNode"]};
},forInSelectedItems:function(f,o){
o=o||win.global;
for(var id in this.selection){
f.call(o,this.getItem(id),id,this);
}
}});
});
},"dijit/_Container":function(){
define("dijit/_Container",["dojo/_base/array","dojo/_base/declare","dojo/dom-construct","./registry"],function(_d0d,_d0e,_d0f,_d10){
return _d0e("dijit._Container",null,{buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_d11,_d12){
var _d13=this.containerNode;
if(_d12&&typeof _d12=="number"){
var _d14=this.getChildren();
if(_d14&&_d14.length>=_d12){
_d13=_d14[_d12-1].domNode;
_d12="after";
}
}
_d0f.place(_d11.domNode,_d13,_d12);
if(this._started&&!_d11._started){
_d11.startup();
}
},removeChild:function(_d15){
if(typeof _d15=="number"){
_d15=this.getChildren()[_d15];
}
if(_d15){
var node=_d15.domNode;
if(node&&node.parentNode){
node.parentNode.removeChild(node);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},_getSiblingOfChild:function(_d16,dir){
var node=_d16.domNode,_d17=(dir>0?"nextSibling":"previousSibling");
do{
node=node[_d17];
}while(node&&(node.nodeType!=1||!_d10.byNode(node)));
return node&&_d10.byNode(node);
},getIndexOfChild:function(_d18){
return _d0d.indexOf(this.getChildren(),_d18);
}});
});
},"dojo/data/ItemFileReadStore":function(){
define("dojo/data/ItemFileReadStore",["../_base/kernel","../_base/lang","../_base/declare","../_base/array","../_base/xhr","../Evented","../_base/window","./util/filter","./util/simpleFetch","../date/stamp"],function(_d19,lang,_d1a,_d1b,xhr,_d1c,_d1d,_d1e,_d1f,_d20){
var _d21=_d1a("dojo.data.ItemFileReadStore",[_d1c],{constructor:function(_d22){
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._jsonFileUrl=_d22.url;
this._ccUrl=_d22.url;
this.url=_d22.url;
this._jsonData=_d22.data;
this.data=null;
this._datatypeMap=_d22.typeMap||{};
if(!this._datatypeMap["Date"]){
this._datatypeMap["Date"]={type:Date,deserialize:function(_d23){
return _d20.fromISOString(_d23);
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
if(_d22.urlPreventCache!==undefined){
this.urlPreventCache=_d22.urlPreventCache?true:false;
}
if(_d22.hierarchical!==undefined){
this.hierarchical=_d22.hierarchical?true:false;
}
if(_d22.clearOnClose){
this.clearOnClose=true;
}
if("failOk" in _d22){
this.failOk=_d22.failOk?true:false;
}
},url:"",_ccUrl:"",data:null,typeMap:null,clearOnClose:false,urlPreventCache:false,failOk:false,hierarchical:true,_assertIsItem:function(item){
if(!this.isItem(item)){
throw new Error("dojo.data.ItemFileReadStore: Invalid item argument.");
}
},_assertIsAttribute:function(_d24){
if(typeof _d24!=="string"){
throw new Error("dojo.data.ItemFileReadStore: Invalid attribute argument.");
}
},getValue:function(item,_d25,_d26){
var _d27=this.getValues(item,_d25);
return (_d27.length>0)?_d27[0]:_d26;
},getValues:function(item,_d28){
this._assertIsItem(item);
this._assertIsAttribute(_d28);
return (item[_d28]||[]).slice(0);
},getAttributes:function(item){
this._assertIsItem(item);
var _d29=[];
for(var key in item){
if((key!==this._storeRefPropName)&&(key!==this._itemNumPropName)&&(key!==this._rootItemPropName)&&(key!==this._reverseRefMap)){
_d29.push(key);
}
}
return _d29;
},hasAttribute:function(item,_d2a){
this._assertIsItem(item);
this._assertIsAttribute(_d2a);
return (_d2a in item);
},containsValue:function(item,_d2b,_d2c){
var _d2d=undefined;
if(typeof _d2c==="string"){
_d2d=_d1e.patternToRegExp(_d2c,false);
}
return this._containsValue(item,_d2b,_d2c,_d2d);
},_containsValue:function(item,_d2e,_d2f,_d30){
return _d1b.some(this.getValues(item,_d2e),function(_d31){
if(_d31!==null&&!lang.isObject(_d31)&&_d30){
if(_d31.toString().match(_d30)){
return true;
}
}else{
if(_d2f===_d31){
return true;
}
}
});
},isItem:function(_d32){
if(_d32&&_d32[this._storeRefPropName]===this){
if(this._arrayOfAllItems[_d32[this._itemNumPropName]]===_d32){
return true;
}
}
return false;
},isItemLoaded:function(_d33){
return this.isItem(_d33);
},loadItem:function(_d34){
this._assertIsItem(_d34.item);
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
},_fetchItems:function(_d35,_d36,_d37){
var self=this,_d38=function(_d39,_d3a){
var _d3b=[],i,key;
if(_d39.query){
var _d3c,_d3d=_d39.queryOptions?_d39.queryOptions.ignoreCase:false;
var _d3e={};
for(key in _d39.query){
_d3c=_d39.query[key];
if(typeof _d3c==="string"){
_d3e[key]=_d1e.patternToRegExp(_d3c,_d3d);
}else{
if(_d3c instanceof RegExp){
_d3e[key]=_d3c;
}
}
}
for(i=0;i<_d3a.length;++i){
var _d3f=true;
var _d40=_d3a[i];
if(_d40===null){
_d3f=false;
}else{
for(key in _d39.query){
_d3c=_d39.query[key];
if(!self._containsValue(_d40,key,_d3c,_d3e[key])){
_d3f=false;
}
}
}
if(_d3f){
_d3b.push(_d40);
}
}
_d36(_d3b,_d39);
}else{
for(i=0;i<_d3a.length;++i){
var item=_d3a[i];
if(item!==null){
_d3b.push(item);
}
}
_d36(_d3b,_d39);
}
};
if(this._loadFinished){
_d38(_d35,this._getItemsArray(_d35.queryOptions));
}else{
if(this._jsonFileUrl!==this._ccUrl){
_d19.deprecated("dojo.data.ItemFileReadStore: ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
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
this._queuedFetches.push({args:_d35,filter:_d38});
}else{
this._loadInProgress=true;
var _d41={url:self._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk};
var _d42=xhr.get(_d41);
_d42.addCallback(function(data){
try{
self._getItemsFromLoadedData(data);
self._loadFinished=true;
self._loadInProgress=false;
_d38(_d35,self._getItemsArray(_d35.queryOptions));
self._handleQueuedFetches();
}
catch(e){
self._loadFinished=true;
self._loadInProgress=false;
_d37(e,_d35);
}
});
_d42.addErrback(function(_d43){
self._loadInProgress=false;
_d37(_d43,_d35);
});
var _d44=null;
if(_d35.abort){
_d44=_d35.abort;
}
_d35.abort=function(){
var df=_d42;
if(df&&df.fired===-1){
df.cancel();
df=null;
}
if(_d44){
_d44.call(_d35);
}
};
}
}else{
if(this._jsonData){
try{
this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
_d38(_d35,this._getItemsArray(_d35.queryOptions));
}
catch(e){
_d37(e,_d35);
}
}else{
_d37(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),_d35);
}
}
}
},_handleQueuedFetches:function(){
if(this._queuedFetches.length>0){
for(var i=0;i<this._queuedFetches.length;i++){
var _d45=this._queuedFetches[i],_d46=_d45.args,_d47=_d45.filter;
if(_d47){
_d47(_d46,this._getItemsArray(_d46.queryOptions));
}else{
this.fetchItemByIdentity(_d46);
}
}
this._queuedFetches=[];
}
},_getItemsArray:function(_d48){
if(_d48&&_d48.deep){
return this._arrayOfAllItems;
}
return this._arrayOfTopLevelItems;
},close:function(_d49){
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
},_getItemsFromLoadedData:function(_d4a){
var _d4b=false,self=this;
function _d4c(_d4d){
return (_d4d!==null)&&(typeof _d4d==="object")&&(!lang.isArray(_d4d)||_d4b)&&(!lang.isFunction(_d4d))&&(_d4d.constructor==Object||lang.isArray(_d4d))&&(typeof _d4d._reference==="undefined")&&(typeof _d4d._type==="undefined")&&(typeof _d4d._value==="undefined")&&self.hierarchical;
};
function _d4e(_d4f){
self._arrayOfAllItems.push(_d4f);
for(var _d50 in _d4f){
var _d51=_d4f[_d50];
if(_d51){
if(lang.isArray(_d51)){
var _d52=_d51;
for(var k=0;k<_d52.length;++k){
var _d53=_d52[k];
if(_d4c(_d53)){
_d4e(_d53);
}
}
}else{
if(_d4c(_d51)){
_d4e(_d51);
}
}
}
}
};
this._labelAttr=_d4a.label;
var i,item;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=_d4a.items;
for(i=0;i<this._arrayOfTopLevelItems.length;++i){
item=this._arrayOfTopLevelItems[i];
if(lang.isArray(item)){
_d4b=true;
}
_d4e(item);
item[this._rootItemPropName]=true;
}
var _d54={},key;
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
for(key in item){
if(key!==this._rootItemPropName){
var _d55=item[key];
if(_d55!==null){
if(!lang.isArray(_d55)){
item[key]=[_d55];
}
}else{
item[key]=[null];
}
}
_d54[key]=key;
}
}
while(_d54[this._storeRefPropName]){
this._storeRefPropName+="_";
}
while(_d54[this._itemNumPropName]){
this._itemNumPropName+="_";
}
while(_d54[this._reverseRefMap]){
this._reverseRefMap+="_";
}
var _d56;
var _d57=_d4a.identifier;
if(_d57){
this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=_d57;
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
_d56=item[_d57];
var _d58=_d56[0];
if(!Object.hasOwnProperty.call(this._itemsByIdentity,_d58)){
this._itemsByIdentity[_d58]=item;
}else{
if(this._jsonFileUrl){
throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+_d57+"].  Value collided: ["+_d58+"]");
}else{
if(this._jsonData){
throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+_d57+"].  Value collided: ["+_d58+"]");
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
_d56=item[key];
for(var j=0;j<_d56.length;++j){
_d55=_d56[j];
if(_d55!==null&&typeof _d55=="object"){
if(("_type" in _d55)&&("_value" in _d55)){
var type=_d55._type;
var _d59=this._datatypeMap[type];
if(!_d59){
throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+type+"'");
}else{
if(lang.isFunction(_d59)){
_d56[j]=new _d59(_d55._value);
}else{
if(lang.isFunction(_d59.deserialize)){
_d56[j]=_d59.deserialize(_d55._value);
}else{
throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function");
}
}
}
}
if(_d55._reference){
var _d5a=_d55._reference;
if(!lang.isObject(_d5a)){
_d56[j]=this._getItemByIdentity(_d5a);
}else{
for(var k=0;k<this._arrayOfAllItems.length;++k){
var _d5b=this._arrayOfAllItems[k],_d5c=true;
for(var _d5d in _d5a){
if(_d5b[_d5d]!=_d5a[_d5d]){
_d5c=false;
}
}
if(_d5c){
_d56[j]=_d5b;
}
}
}
if(this.referenceIntegrity){
var _d5e=_d56[j];
if(this.isItem(_d5e)){
this._addReferenceToMap(_d5e,item,key);
}
}
}else{
if(this.isItem(_d55)){
if(this.referenceIntegrity){
this._addReferenceToMap(_d55,item,key);
}
}
}
}
}
}
}
},_addReferenceToMap:function(_d5f,_d60,_d61){
},getIdentity:function(item){
var _d62=this._features["dojo.data.api.Identity"];
if(_d62===Number){
return item[this._itemNumPropName];
}else{
var _d63=item[_d62];
if(_d63){
return _d63[0];
}
}
return null;
},fetchItemByIdentity:function(_d64){
var item,_d65;
if(!this._loadFinished){
var self=this;
if(this._jsonFileUrl!==this._ccUrl){
_d19.deprecated("dojo.data.ItemFileReadStore: ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
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
this._queuedFetches.push({args:_d64});
}else{
this._loadInProgress=true;
var _d66={url:self._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk};
var _d67=xhr.get(_d66);
_d67.addCallback(function(data){
var _d68=_d64.scope?_d64.scope:_d1d.global;
try{
self._getItemsFromLoadedData(data);
self._loadFinished=true;
self._loadInProgress=false;
item=self._getItemByIdentity(_d64.identity);
if(_d64.onItem){
_d64.onItem.call(_d68,item);
}
self._handleQueuedFetches();
}
catch(error){
self._loadInProgress=false;
if(_d64.onError){
_d64.onError.call(_d68,error);
}
}
});
_d67.addErrback(function(_d69){
self._loadInProgress=false;
if(_d64.onError){
var _d6a=_d64.scope?_d64.scope:_d1d.global;
_d64.onError.call(_d6a,_d69);
}
});
}
}else{
if(this._jsonData){
self._getItemsFromLoadedData(self._jsonData);
self._jsonData=null;
self._loadFinished=true;
item=self._getItemByIdentity(_d64.identity);
if(_d64.onItem){
_d65=_d64.scope?_d64.scope:_d1d.global;
_d64.onItem.call(_d65,item);
}
}
}
}else{
item=this._getItemByIdentity(_d64.identity);
if(_d64.onItem){
_d65=_d64.scope?_d64.scope:_d1d.global;
_d64.onItem.call(_d65,item);
}
}
},_getItemByIdentity:function(_d6b){
var item=null;
if(this._itemsByIdentity){
if(Object.hasOwnProperty.call(this._itemsByIdentity,_d6b)){
item=this._itemsByIdentity[_d6b];
}
}else{
if(Object.hasOwnProperty.call(this._arrayOfAllItems,_d6b)){
item=this._arrayOfAllItems[_d6b];
}
}
if(item===undefined){
item=null;
}
return item;
},getIdentityAttributes:function(item){
var _d6c=this._features["dojo.data.api.Identity"];
if(_d6c===Number){
return null;
}else{
return [_d6c];
}
},_forceLoad:function(){
var self=this;
if(this._jsonFileUrl!==this._ccUrl){
_d19.deprecated("dojo.data.ItemFileReadStore: ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
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
var _d6d={url:this._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk,sync:true};
var _d6e=xhr.get(_d6d);
_d6e.addCallback(function(data){
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
_d6e.addErrback(function(_d6f){
throw _d6f;
});
}else{
if(this._jsonData){
self._getItemsFromLoadedData(self._jsonData);
self._jsonData=null;
self._loadFinished=true;
}
}
}});
lang.extend(_d21,_d1f);
return _d21;
});
},"curam/tab/util":function(){
define("curam/tab/util",["dojo/dom-geometry","curam/define","curam/debug","curam/util/ResourceBundle"],function(_d70){
dojo.requireLocalization("curam.application","Debug");
var _d71=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.tab.util",{toggleDetailsPanel:function(_d72){
_d72=dojo.fixEvent(_d72);
dojo.stopEvent(_d72);
var _d73=_d72.target;
if(_d73._animating){
return;
}
_d73._animating=true;
var _d74=_d73.parentNode;
while(_d74&&!dojo.hasClass(_d74,"detailsPanel-bc")){
_d74=_d74.parentNode;
}
var _d75=_d74;
while(_d74&&!dojo.hasClass(_d74,"summaryPane")){
_d74=_d74.parentNode;
}
var _d76=_d74;
while(_d74){
if(dojo.hasClass(_d74,"dijitBorderContainer")&&!dojo.hasClass(_d74,"detailsPanel-bc")){
break;
}
if(dojo.hasClass(_d74,"tab-wrapper")){
break;
}
_d74=_d74.parentNode;
}
var _d77=_d74;
headerPanelNode=dojo.query(".detailsPanelTitleBar",_d75)[0];
detailsPanelNode=dojo.query(".detailsContentPane",_d75)[0];
var kids=_d77.children;
var _d78=dojo.filter(kids,function(_d79){
if(dojo.hasClass(_d79,"splitter-pane")||dojo.hasClass(_d79,"dijitSplitterH")){
return _d79;
}
})[0];
var _d7a=dojo.filter(kids,function(_d7b){
if(dojo.hasClass(_d7b,"nav-panel")){
return _d7b;
}
})[0];
var _d7c=_d70.getMarginBoxSimple(headerPanelNode).h;
var _d7d=_d70.getMarginBoxSimple(_d76).h;
var _d7e=_d78.offsetHeight;
var _d7f=_d70.getMarginBoxSimple(_d7a).h;
var _d80=dojo.query(".detailsContentPane",_d75)[0];
if(_d7c!=_d76.clientHeight){
dojo.addClass(_d73,"collapsed");
dojo.addClass(_d80,"collapsed");
curam.debug.log(_d71.getProperty("curam.tab.util.collapsing"));
_d75._previousHeight=_d7d;
_d7a._previousHeight=_d7f;
dojo.animateProperty({node:_d76,duration:500,properties:{height:{end:_d7c}}}).play();
if(dojo.hasClass(_d78,"splitter-pane")){
dojo.animateProperty({node:detailsPanelNode,duration:500,properties:{height:{end:0}}}).play();
}
dojo.animateProperty({node:_d78,duration:500,properties:{top:{end:(_d7c+_d7e)}}}).play();
dojo.animateProperty({node:_d7a,duration:500,properties:{top:{end:(_d7c+_d7e)}},onEnd:function(){
_d73._animating=false;
if(dojo.hasClass(_d78,"dijitSplitterH")){
dojo.style(_d7a,"height",(_d7a._previousHeight+_d75._previousHeight-_d7c)+"px");
}
}}).play();
}else{
dojo.removeClass(_d73,"collapsed");
dojo.removeClass(_d80,"collapsed");
curam.debug.log(_d71.getProperty("curam.tab.util.expanding"));
dojo.style(_d76,"height",_d75._previousHeight+"px");
if(dojo.hasClass(_d78,"splitter-pane")){
dojo.animateProperty({node:detailsPanelNode,duration:500,properties:{height:{end:_d75._previousHeight-_d7c}}}).play();
}
dojo.animateProperty({node:_d78,duration:500,properties:{top:{end:(_d75._previousHeight+_d7e)}}}).play();
dojo.animateProperty({node:_d7a,duration:500,properties:{top:{end:(_d75._previousHeight+_d7e)}},onEnd:function(){
_d73._animating=false;
if(dojo.hasClass(_d78,"dijitSplitterH")){
dojo.style(_d7a,"height",_d7a._previousHeight+"px");
}
}}).play();
}
}});
return curam.tab.util;
});
},"dojo/html":function(){
define("dojo/html",["./_base/kernel","./_base/lang","./_base/array","./_base/declare","./dom","./dom-construct","./parser"],function(dojo,lang,_d81,_d82,dom,_d83,_d84){
lang.getObject("html",true,dojo);
var _d85=0;
dojo.html._secureForInnerHtml=function(cont){
return cont.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"");
};
dojo.html._emptyNode=_d83.empty;
dojo.html._setNodeContent=function(node,cont){
_d83.empty(node);
if(cont){
if(typeof cont=="string"){
cont=_d83.toDom(cont,node.ownerDocument);
}
if(!cont.nodeType&&lang.isArrayLike(cont)){
for(var _d86=cont.length,i=0;i<cont.length;i=_d86==cont.length?i+1:0){
_d83.place(cont[i],node,"last");
}
}else{
_d83.place(cont,node,"last");
}
}
return node;
};
_d82("dojo.html._ContentSetter",null,{node:"",content:"",id:"",cleanContent:false,extractContent:false,parseContent:false,parserScope:dojo._scopeName,startup:true,constructor:function(_d87,node){
lang.mixin(this,_d87||{});
node=this.node=dom.byId(this.node||node);
if(!this.id){
this.id=["Setter",(node)?node.id||node.tagName:"",_d85++].join("_");
}
},set:function(cont,_d88){
if(undefined!==cont){
this.content=cont;
}
if(_d88){
this._mixin(_d88);
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
var _d89=this.onContentError(e);
try{
node.innerHTML=_d89;
}
catch(e){
console.error("Fatal "+this.declaredClass+".setContent could not change content due to "+e.message,e);
}
}
this.node=node;
},empty:function(){
if(this.parseResults&&this.parseResults.length){
_d81.forEach(this.parseResults,function(w){
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
var _d8a=cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_d8a){
cont=_d8a[1];
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
},_mixin:function(_d8b){
var _d8c={},key;
for(key in _d8b){
if(key in _d8c){
continue;
}
this[key]=_d8b[key];
}
},_parse:function(){
var _d8d=this.node;
try{
var _d8e={};
_d81.forEach(["dir","lang","textDir"],function(name){
if(this[name]){
_d8e[name]=this[name];
}
},this);
this.parseResults=_d84.parse({rootNode:_d8d,noStart:!this.startup,inherited:_d8e,scope:this.parserScope});
}
catch(e){
this._onError("Content",e,"Error parsing in _ContentSetter#"+this.id);
}
},_onError:function(type,err,_d8f){
var _d90=this["on"+type+"Error"].call(this,err);
if(_d8f){
console.error(_d8f,err);
}else{
if(_d90){
dojo.html._setNodeContent(this.node,_d90,true);
}
}
}});
dojo.html.set=function(node,cont,_d91){
if(undefined==cont){
console.warn("dojo.html.set: no cont argument provided, using empty string");
cont="";
}
if(!_d91){
return dojo.html._setNodeContent(node,cont,true);
}else{
var op=new dojo.html._ContentSetter(lang.mixin(_d91,{content:cont,node:node}));
return op.set();
}
};
return dojo.html;
});
},"url:dijit/templates/TitlePane.html":"<div>\n\t<div data-dojo-attach-event=\"onclick:_onTitleClick, onkeypress:_onTitleKey\"\n\t\t\tclass=\"dijitTitlePaneTitle\" data-dojo-attach-point=\"titleBarNode\">\n\t\t<div class=\"dijitTitlePaneTitleFocus\" data-dojo-attach-point=\"focusNode\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"arrowNode\" class=\"dijitArrowNode\" role=\"presentation\"\n\t\t\t/><span data-dojo-attach-point=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span\n\t\t\t><span data-dojo-attach-point=\"titleNode\" class=\"dijitTitlePaneTextNode\"></span>\n\t\t</div>\n\t</div>\n\t<div class=\"dijitTitlePaneContentOuter\" data-dojo-attach-point=\"hideNode\" role=\"presentation\">\n\t\t<div class=\"dijitReset\" data-dojo-attach-point=\"wipeNode\" role=\"presentation\">\n\t\t\t<div class=\"dijitTitlePaneContentInner\" data-dojo-attach-point=\"containerNode\" role=\"region\" id=\"${id}_pane\">\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n","cm/_base/_pageBehaviors":function(){
define("cm/_base/_pageBehaviors",["cm/_base/_behavior"],function(){
var cm=dojo.global.cm||{};
dojo.global.cm=cm;
cm.registerBehavior("FORM_SINGLE_SUBMIT",{"form":{"onsubmit":function(evt){
if(cm.wasFormSubmitted(evt.target)){
try{
dojo.stopEvent(evt);
}
catch(e){
}
return false;
}
cm.setFormSubmitted(evt.target,true);
}}});
function _d92(type){
return function(evt){
cm.validation.validateMandatory(evt.target?evt.target:evt,type);
};
};
function _d93(type,_d94){
var obj={};
var fn=_d92(type);
dojo.forEach(_d94,function(evt){
obj[evt]=fn;
});
obj.found=function(node){
cm.validation.registerValidation(node.getAttribute("name"),fn,node);
fn(node);
};
return obj;
};
cm.registerBehavior("MANDATORY_FIELD_VALIDATION",{"input[type='text'],input[type='password']":_d93("text",["blur","onkeyup"]),"input[type='checkbox']":_d93("checkbox",["blur","onclick"]),"select":_d93("select",["blur","onchange"]),"input[type='radio']":_d93("radio",["blur","onclick"])});
return cm;
});
},"dijit/form/ValidationTextBox":function(){
require({cache:{"url:dijit/form/templates/ValidationTextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"}});
define("dijit/form/ValidationTextBox",["dojo/_base/declare","dojo/i18n","./TextBox","../Tooltip","dojo/text!./templates/ValidationTextBox.html","dojo/i18n!./nls/validate"],function(_d95,i18n,_d96,_d97,_d98){
return _d95("dijit.form.ValidationTextBox",_d96,{templateString:_d98,baseClass:"dijitTextBox dijitValidationTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",missingMessage:"$_unset_$",message:"",constraints:{},regExp:".*",regExpGen:function(){
return this.regExp;
},state:"",tooltipPosition:[],_setValueAttr:function(){
this.inherited(arguments);
this.validate(this.focused);
},validator:function(_d99,_d9a){
return (new RegExp("^(?:"+this.regExpGen(_d9a)+")"+(this.required?"":"?")+"$")).test(_d99)&&(!this.required||!this._isEmpty(_d99))&&(this._isEmpty(_d99)||this.parse(_d99,_d9a)!==undefined);
},_isValidSubset:function(){
return this.textbox.value.search(this._partialre)==0;
},isValid:function(){
return this.validator(this.textbox.value,this.constraints);
},_isEmpty:function(_d9b){
return (this.trim?/^\s*$/:/^$/).test(_d9b);
},getErrorMessage:function(){
return (this.required&&this._isEmpty(this.textbox.value))?this.missingMessage:this.invalidMessage;
},getPromptMessage:function(){
return this.promptMessage;
},_maskValidSubsetError:true,validate:function(_d9c){
var _d9d="";
var _d9e=this.disabled||this.isValid(_d9c);
if(_d9e){
this._maskValidSubsetError=true;
}
var _d9f=this._isEmpty(this.textbox.value);
var _da0=!_d9e&&_d9c&&this._isValidSubset();
this._set("state",_d9e?"":(((((!this._hasBeenBlurred||_d9c)&&_d9f)||_da0)&&this._maskValidSubsetError)?"Incomplete":"Error"));
this.focusNode.setAttribute("aria-invalid",_d9e?"false":"true");
if(this.state=="Error"){
this._maskValidSubsetError=_d9c&&_da0;
_d9d=this.getErrorMessage(_d9c);
}else{
if(this.state=="Incomplete"){
_d9d=this.getPromptMessage(_d9c);
this._maskValidSubsetError=!this._hasBeenBlurred||_d9c;
}else{
if(_d9f){
_d9d=this.getPromptMessage(_d9c);
}
}
}
this.set("message",_d9d);
return _d9e;
},displayMessage:function(_da1){
if(_da1&&this.focused){
_d97.show(_da1,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}else{
_d97.hide(this.domNode);
}
},_refreshState:function(){
this.validate(this.focused);
this.inherited(arguments);
},constructor:function(){
this.constraints={};
},_setConstraintsAttr:function(_da2){
if(!_da2.locale&&this.lang){
_da2.locale=this.lang;
}
this._set("constraints",_da2);
this._computePartialRE();
},_computePartialRE:function(){
var p=this.regExpGen(this.constraints);
this.regExp=p;
var _da3="";
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
_da3+=re;
break;
case ")":
_da3+="|$)";
break;
default:
_da3+="(?:"+re+"|$)";
break;
}
});
}
try{
"".search(_da3);
}
catch(e){
_da3=this.regExp;
console.warn("RegExp error in "+this.declaredClass+": "+this.regExp);
}
this._partialre="^(?:"+_da3+")$";
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
},_setDisabledAttr:function(_da4){
this.inherited(arguments);
this._refreshState();
},_setRequiredAttr:function(_da5){
this._set("required",_da5);
this.focusNode.setAttribute("aria-required",_da5);
this._refreshState();
},_setMessageAttr:function(_da6){
this._set("message",_da6);
this.displayMessage(_da6);
},reset:function(){
this._maskValidSubsetError=true;
this.inherited(arguments);
},_onBlur:function(){
this.displayMessage("");
this.inherited(arguments);
}});
});
},"dijit/layout/BorderContainer":function(){
define("dijit/layout/BorderContainer",["dojo/_base/array","dojo/cookie","dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/on","dojo/touch","dojo/_base/window","../_WidgetBase","../_Widget","../_TemplatedMixin","./_LayoutWidget","./utils"],function(_da7,_da8,_da9,_daa,_dab,_dac,_dad,_dae,keys,lang,on,_daf,win,_db0,_db1,_db2,_db3,_db4){
var _db5=_da9("dijit.layout._Splitter",[_db1,_db2],{live:true,templateString:"<div class=\"dijitSplitter\" data-dojo-attach-event=\"onkeypress:_onKeyPress,press:_startDrag,onmouseenter:_onMouse,onmouseleave:_onMouse\" tabIndex=\"0\" role=\"separator\"><div class=\"dijitSplitterThumb\"></div></div>",constructor:function(){
this._handlers=[];
},postMixInProperties:function(){
this.inherited(arguments);
this.horizontal=/top|bottom/.test(this.region);
this._factor=/top|left/.test(this.region)?1:-1;
this._cookieName=this.container.id+"_"+this.region;
},buildRendering:function(){
this.inherited(arguments);
_daa.add(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V"));
if(this.container.persist){
var _db6=_da8(this._cookieName);
if(_db6){
this.child.domNode.style[this.horizontal?"height":"width"]=_db6;
}
}
},_computeMaxSize:function(){
var dim=this.horizontal?"h":"w",_db7=_dac.getMarginBox(this.child.domNode)[dim],_db8=_da7.filter(this.container.getChildren(),function(_db9){
return _db9.region=="center";
})[0],_dba=_dac.getMarginBox(_db8.domNode)[dim];
return Math.min(this.child.maxSize,_db7+_dba);
},_startDrag:function(e){
if(!this.cover){
this.cover=win.doc.createElement("div");
_daa.add(this.cover,"dijitSplitterCover");
_dab.place(this.cover,this.child.domNode,"after");
}
_daa.add(this.cover,"dijitSplitterCoverActive");
if(this.fake){
_dab.destroy(this.fake);
}
if(!(this._resize=this.live)){
(this.fake=this.domNode.cloneNode(true)).removeAttribute("id");
_daa.add(this.domNode,"dijitSplitterShadow");
_dab.place(this.fake,this.domNode,"after");
}
_daa.add(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active");
if(this.fake){
_daa.remove(this.fake,"dijitSplitterHover dijitSplitter"+(this.horizontal?"H":"V")+"Hover");
}
var _dbb=this._factor,_dbc=this.horizontal,axis=_dbc?"pageY":"pageX",_dbd=e[axis],_dbe=this.domNode.style,dim=_dbc?"h":"w",_dbf=_dac.getMarginBox(this.child.domNode)[dim],max=this._computeMaxSize(),min=this.child.minSize||20,_dc0=this.region,_dc1=_dc0=="top"||_dc0=="bottom"?"top":"left",_dc2=parseInt(_dbe[_dc1],10),_dc3=this._resize,_dc4=lang.hitch(this.container,"_layoutChildren",this.child.id),de=win.doc;
this._handlers=this._handlers.concat([on(de,_daf.move,this._drag=function(e,_dc5){
var _dc6=e[axis]-_dbd,_dc7=_dbb*_dc6+_dbf,_dc8=Math.max(Math.min(_dc7,max),min);
if(_dc3||_dc5){
_dc4(_dc8);
}
_dbe[_dc1]=_dc6+_dc2+_dbb*(_dc8-_dc7)+"px";
}),on(de,"dragstart",_dae.stop),on(win.body(),"selectstart",_dae.stop),on(de,_daf.release,lang.hitch(this,"_stopDrag"))]);
_dae.stop(e);
},_onMouse:function(e){
var o=(e.type=="mouseover"||e.type=="mouseenter");
_daa.toggle(this.domNode,"dijitSplitterHover",o);
_daa.toggle(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V")+"Hover",o);
},_stopDrag:function(e){
try{
if(this.cover){
_daa.remove(this.cover,"dijitSplitterCoverActive");
}
if(this.fake){
_dab.destroy(this.fake);
}
_daa.remove(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active dijitSplitterShadow");
this._drag(e);
this._drag(e,true);
}
finally{
this._cleanupHandlers();
delete this._drag;
}
if(this.container.persist){
_da8(this._cookieName,this.child.domNode.style[this.horizontal?"height":"width"],{expires:365});
}
},_cleanupHandlers:function(){
var h;
while(h=this._handlers.pop()){
h.remove();
}
},_onKeyPress:function(e){
this._resize=true;
var _dc9=this.horizontal;
var tick=1;
switch(e.charOrCode){
case _dc9?keys.UP_ARROW:keys.LEFT_ARROW:
tick*=-1;
case _dc9?keys.DOWN_ARROW:keys.RIGHT_ARROW:
break;
default:
return;
}
var _dca=_dac.getMarginSize(this.child.domNode)[_dc9?"h":"w"]+this._factor*tick;
this.container._layoutChildren(this.child.id,Math.max(Math.min(_dca,this._computeMaxSize()),this.child.minSize));
_dae.stop(e);
},destroy:function(){
this._cleanupHandlers();
delete this.child;
delete this.container;
delete this.cover;
delete this.fake;
this.inherited(arguments);
}});
var _dcb=_da9("dijit.layout._Gutter",[_db1,_db2],{templateString:"<div class=\"dijitGutter\" role=\"presentation\"></div>",postMixInProperties:function(){
this.inherited(arguments);
this.horizontal=/top|bottom/.test(this.region);
},buildRendering:function(){
this.inherited(arguments);
_daa.add(this.domNode,"dijitGutter"+(this.horizontal?"H":"V"));
}});
var _dcc=_da9("dijit.layout.BorderContainer",_db3,{design:"headline",gutters:true,liveSplitters:true,persist:false,baseClass:"dijitBorderContainer",_splitterClass:_db5,postMixInProperties:function(){
if(!this.gutters){
this.baseClass+="NoGutter";
}
this.inherited(arguments);
},startup:function(){
if(this._started){
return;
}
_da7.forEach(this.getChildren(),this._setupChild,this);
this.inherited(arguments);
},_setupChild:function(_dcd){
var _dce=_dcd.region;
if(_dce){
this.inherited(arguments);
_daa.add(_dcd.domNode,this.baseClass+"Pane");
var ltr=this.isLeftToRight();
if(_dce=="leading"){
_dce=ltr?"left":"right";
}
if(_dce=="trailing"){
_dce=ltr?"right":"left";
}
if(_dce!="center"&&(_dcd.splitter||this.gutters)&&!_dcd._splitterWidget){
var _dcf=_dcd.splitter?this._splitterClass:_dcb;
if(lang.isString(_dcf)){
_dcf=lang.getObject(_dcf);
}
var _dd0=new _dcf({id:_dcd.id+"_splitter",container:this,child:_dcd,region:_dce,live:this.liveSplitters});
_dd0.isSplitter=true;
_dcd._splitterWidget=_dd0;
_dab.place(_dd0.domNode,_dcd.domNode,"after");
_dd0.startup();
}
_dcd.region=_dce;
}
},layout:function(){
this._layoutChildren();
},addChild:function(_dd1,_dd2){
this.inherited(arguments);
if(this._started){
this.layout();
}
},removeChild:function(_dd3){
var _dd4=_dd3.region;
var _dd5=_dd3._splitterWidget;
if(_dd5){
_dd5.destroy();
delete _dd3._splitterWidget;
}
this.inherited(arguments);
if(this._started){
this._layoutChildren();
}
_daa.remove(_dd3.domNode,this.baseClass+"Pane");
_dad.set(_dd3.domNode,{top:"auto",bottom:"auto",left:"auto",right:"auto",position:"static"});
_dad.set(_dd3.domNode,_dd4=="top"||_dd4=="bottom"?"width":"height","auto");
},getChildren:function(){
return _da7.filter(this.inherited(arguments),function(_dd6){
return !_dd6.isSplitter;
});
},getSplitter:function(_dd7){
return _da7.filter(this.getChildren(),function(_dd8){
return _dd8.region==_dd7;
})[0]._splitterWidget;
},resize:function(_dd9,_dda){
if(!this.cs||!this.pe){
var node=this.domNode;
this.cs=_dad.getComputedStyle(node);
this.pe=_dac.getPadExtents(node,this.cs);
this.pe.r=_dad.toPixelValue(node,this.cs.paddingRight);
this.pe.b=_dad.toPixelValue(node,this.cs.paddingBottom);
_dad.set(node,"padding","0px");
}
this.inherited(arguments);
},_layoutChildren:function(_ddb,_ddc){
if(!this._borderBox||!this._borderBox.h){
return;
}
var _ddd=_da7.map(this.getChildren(),function(_dde,idx){
return {pane:_dde,weight:[_dde.region=="center"?Infinity:0,_dde.layoutPriority,(this.design=="sidebar"?1:-1)*(/top|bottom/.test(_dde.region)?1:-1),idx]};
},this);
_ddd.sort(function(a,b){
var aw=a.weight,bw=b.weight;
for(var i=0;i<aw.length;i++){
if(aw[i]!=bw[i]){
return aw[i]-bw[i];
}
}
return 0;
});
var _ddf=[];
_da7.forEach(_ddd,function(_de0){
var pane=_de0.pane;
_ddf.push(pane);
if(pane._splitterWidget){
_ddf.push(pane._splitterWidget);
}
});
var dim={l:this.pe.l,t:this.pe.t,w:this._borderBox.w-this.pe.w,h:this._borderBox.h-this.pe.h};
_db4.layoutChildren(this.domNode,dim,_ddf,_ddb,_ddc);
},destroyRecursive:function(){
_da7.forEach(this.getChildren(),function(_de1){
var _de2=_de1._splitterWidget;
if(_de2){
_de2.destroy();
}
delete _de1._splitterWidget;
});
this.inherited(arguments);
}});
lang.extend(_db0,{region:"",layoutPriority:0,splitter:false,minSize:0,maxSize:Infinity});
_dcc._Splitter=_db5;
_dcc._Gutter=_dcb;
return _dcc;
});
},"curam/html":function(){
define("curam/html",["curam/define"],function(){
curam.define.singleton("curam.html",{splitWithTag:function(_de3,_de4,_de5,_de6){
var _de7=_de3.split(_de4||"\n");
if(_de7.length<2){
return _de6?_de6(_de3):_de3;
}
var t=(_de5||"div")+">";
var _de8="<"+t,_de9="</"+t;
if(_de6){
for(var i=0;i<_de7.length;i++){
_de7[i]=_de6(_de7[i]);
}
}
return _de8+_de7.join(_de9+_de8)+_de9;
}});
return curam.html;
});
},"dojo/window":function(){
define("dojo/window",["./_base/lang","./_base/sniff","./_base/window","./dom","./dom-geometry","./dom-style"],function(lang,has,_dea,dom,geom,_deb){
var _dec=lang.getObject("dojo.window",true);
_dec.getBox=function(){
var _ded=(_dea.doc.compatMode=="BackCompat")?_dea.body():_dea.doc.documentElement,_dee=geom.docScroll(),w,h;
if(has("touch")){
var _def=_dea.doc.parentWindow||_dea.doc.defaultView;
w=_def.innerWidth||_ded.clientWidth;
h=_def.innerHeight||_ded.clientHeight;
}else{
w=_ded.clientWidth;
h=_ded.clientHeight;
}
return {l:_dee.x,t:_dee.y,w:w,h:h};
};
_dec.get=function(doc){
if(has("ie")&&_dec!==document.parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc.parentWindow||doc.defaultView;
};
_dec.scrollIntoView=function(node,pos){
try{
node=dom.byId(node);
var doc=node.ownerDocument||_dea.doc,body=doc.body||_dea.body(),html=doc.documentElement||body.parentNode,isIE=has("ie"),isWK=has("webkit");
if((!(has("mozilla")||isIE||isWK||has("opera"))||node==body||node==html)&&(typeof node.scrollIntoView!="undefined")){
node.scrollIntoView(false);
return;
}
var _df0=doc.compatMode=="BackCompat",_df1=(isIE>=9&&node.ownerDocument.parentWindow.frameElement)?((html.clientHeight>0&&html.clientWidth>0&&(body.clientHeight==0||body.clientWidth==0||body.clientHeight>html.clientHeight||body.clientWidth>html.clientWidth))?html:body):(_df0?body:html),_df2=isWK?body:_df1,_df3=_df1.clientWidth,_df4=_df1.clientHeight,rtl=!geom.isBodyLtr(),_df5=pos||geom.position(node),el=node.parentNode,_df6=function(el){
return ((isIE<=6||(isIE&&_df0))?false:(_deb.get(el,"position").toLowerCase()=="fixed"));
};
if(_df6(node)){
return;
}
while(el){
if(el==body){
el=_df2;
}
var _df7=geom.position(el),_df8=_df6(el);
if(el==_df2){
_df7.w=_df3;
_df7.h=_df4;
if(_df2==html&&isIE&&rtl){
_df7.x+=_df2.offsetWidth-_df7.w;
}
if(_df7.x<0||!isIE){
_df7.x=0;
}
if(_df7.y<0||!isIE){
_df7.y=0;
}
}else{
var pb=geom.getPadBorderExtents(el);
_df7.w-=pb.w;
_df7.h-=pb.h;
_df7.x+=pb.l;
_df7.y+=pb.t;
var _df9=el.clientWidth,_dfa=_df7.w-_df9;
if(_df9>0&&_dfa>0){
_df7.w=_df9;
_df7.x+=(rtl&&(isIE||el.clientLeft>pb.l))?_dfa:0;
}
_df9=el.clientHeight;
_dfa=_df7.h-_df9;
if(_df9>0&&_dfa>0){
_df7.h=_df9;
}
}
if(_df8){
if(_df7.y<0){
_df7.h+=_df7.y;
_df7.y=0;
}
if(_df7.x<0){
_df7.w+=_df7.x;
_df7.x=0;
}
if(_df7.y+_df7.h>_df4){
_df7.h=_df4-_df7.y;
}
if(_df7.x+_df7.w>_df3){
_df7.w=_df3-_df7.x;
}
}
var l=_df5.x-_df7.x,t=_df5.y-Math.max(_df7.y,0),r=l+_df5.w-_df7.w,bot=t+_df5.h-_df7.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
if(rtl&&((isIE==8&&!_df0)||isIE>=9)){
s=-s;
}
_df5.x+=el.scrollLeft;
el.scrollLeft+=s;
_df5.x-=el.scrollLeft;
}
if(bot*t>0){
_df5.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_df5.y-=el.scrollTop;
}
el=(el!=_df2)&&!_df8&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
};
require(["dojo/_base/sniff","dojo/on"],function(has,on){
if(has("ie")==8){
var _dfb=screen.deviceXDPI;
setInterval(function(){
if(screen.deviceXDPI!=_dfb){
_dfb=screen.deviceXDPI;
on.emit(_dea.global,"resize");
}
},250);
}
});
return _dec;
});
},"curam/pagination/StateController":function(){
define("curam/pagination/StateController",["curam/pagination","curam/debug"],function(){
var _dfc=dojo.declare("curam.pagination.StateController",null,{pageSize:undefined,currentPage:0,_listModel:undefined,_gui:undefined,constructor:function(_dfd,gui){
this.pageSize=curam.pagination.defaultPageSize;
this._listModel=_dfd;
this.pageSize=curam.pagination.defaultPageSize;
this._gui=gui;
var _dfe={};
_dfe.pageSizeOptions=[15,30,45];
_dfe.pageSizeOptions.contains=function(val){
for(var i=0;i<_dfe.pageSizeOptions.length;i++){
if(_dfe.pageSizeOptions[i]==val){
return true;
}
}
return false;
};
if(!_dfe.pageSizeOptions.contains(curam.pagination.defaultPageSize)){
_dfe.pageSizeOptions.push(curam.pagination.defaultPageSize);
_dfe.pageSizeOptions.sort(function(a,b){
return a-b;
});
}
_dfe.currentPageSize=this.pageSize;
_dfe.directLinkRangeWidth=3;
_dfe.lastPage=this._getLastPageNumber();
this._gui.updateState(_dfe);
var _dff={};
_dff.first=dojo.hitch(this,this.gotoFirst);
_dff.last=dojo.hitch(this,this.gotoLast);
_dff.previous=dojo.hitch(this,this.gotoPrevious);
_dff.next=dojo.hitch(this,this.gotoNext);
_dff.page=dojo.hitch(this,this.gotoPage);
_dff.pageSize=dojo.hitch(this,this.changePageSize);
this._gui.setHandlers(_dff);
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
var _e00=this._getLastPageNumber();
if(this.currentPage!=_e00){
this.gotoPage(_e00);
}
},gotoPrevious:function(){
if(this.currentPage>1){
this.gotoPage(this.currentPage-1);
}
},gotoNext:function(){
curam.debug.log("curam.pagination.StateController.gotoNext");
var _e01=this._getLastPageNumber();
if(this.currentPage<_e01){
this.gotoPage(this.currentPage+1);
}
},gotoPage:function(_e02){
curam.debug.log("curam.pagination.StateController.gotoPage: ",_e02);
if(this.currentPage!=0){
this._listModel.hideRange(this._calcRangeStart(this.currentPage),this._calcRangeEnd(this.currentPage));
}
this._listModel.showRange(this._calcRangeStart(_e02),this._calcRangeEnd(_e02));
this.currentPage=_e02;
this._updateGui();
},changePageSize:function(_e03){
curam.debug.log("curam.pagination.StateController.changePageSize: ",_e03);
this.pageSize=_e03;
var _e04={};
_e04.currentPageSize=_e03;
_e04.lastPage=this._getLastPageNumber();
this._gui.updateState(_e04);
this.reset();
},_calcRangeStart:function(_e05){
return (_e05*this.pageSize)-this.pageSize+1;
},_calcRangeEnd:function(_e06){
if(_e06!=this._getLastPageNumber()){
return _e06*this.pageSize;
}else{
return this._listModel.getRowCount();
}
},_getLastPageNumber:function(){
var _e07=this._listModel.getRowCount();
var mod=_e07%this.pageSize;
return ((_e07-mod)/this.pageSize)+(mod>0?1:0);
},_updateGui:function(){
var _e08={};
_e08.first=this.currentPage>1;
_e08.previous=_e08.first;
_e08.next=this.currentPage<this._getLastPageNumber();
_e08.last=_e08.next;
_e08.currentPage=this.currentPage;
_e08.rowInfo=[this._calcRangeStart(this.currentPage),this._calcRangeEnd(this.currentPage),this._listModel.getRowCount()];
this._gui.updateState(_e08);
}});
return _dfc;
});
},"dijit/_FocusMixin":function(){
define("dijit/_FocusMixin",["./focus","./_WidgetBase","dojo/_base/declare","dojo/_base/lang"],function(_e09,_e0a,_e0b,lang){
lang.extend(_e0a,{focused:false,onFocus:function(){
},onBlur:function(){
},_onFocus:function(){
this.onFocus();
},_onBlur:function(){
this.onBlur();
}});
return _e0b("dijit._FocusMixin",null,{_focusManager:_e09});
});
},"dojo/data/util/filter":function(){
define("dojo/data/util/filter",["dojo/_base/lang"],function(lang){
var _e0c=lang.getObject("dojo.data.util.filter",true);
_e0c.patternToRegExp=function(_e0d,_e0e){
var rxp="^";
var c=null;
for(var i=0;i<_e0d.length;i++){
c=_e0d.charAt(i);
switch(c){
case "\\":
rxp+=c;
i++;
rxp+=_e0d.charAt(i);
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
if(_e0e){
return new RegExp(rxp,"mi");
}else{
return new RegExp(rxp,"m");
}
};
return _e0c;
});
},"dijit/_WidgetsInTemplateMixin":function(){
define("dijit/_WidgetsInTemplateMixin",["dojo/_base/array","dojo/_base/declare","dojo/parser","dijit/registry"],function(_e0f,_e10,_e11,_e12){
return _e10("dijit._WidgetsInTemplateMixin",null,{_earlyTemplatedStartup:false,widgetsInTemplate:true,_beforeFillContent:function(){
if(this.widgetsInTemplate){
var node=this.domNode;
var cw=(this._startupWidgets=_e11.parse(node,{noStart:!this._earlyTemplatedStartup,template:true,inherited:{dir:this.dir,lang:this.lang,textDir:this.textDir},propsThis:this,scope:"dojo"}));
this._supportingWidgets=_e12.findWidgets(node);
this._attachTemplateNodes(cw,function(n,p){
return n[p];
});
}
},startup:function(){
_e0f.forEach(this._startupWidgets,function(w){
if(w&&!w._started&&w.startup){
w.startup();
}
});
this.inherited(arguments);
}});
});
},"url:dijit/templates/MenuBarItem.html":"<div class=\"dijitReset dijitInline dijitMenuItem dijitMenuItemLabel\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<span data-dojo-attach-point=\"containerNode\"></span>\n</div>\n","url:curam/widget/templates/OptimalBrowserMessage.html":"<div>\n  <div class=\"hidden\"\n       data-dojo-type=\"dojox/layout/ContentPane\"\n       data-dojo-attach-point=\"_optimalMessage\">\n  </div>\n</div>\n","curam/util/Navigation":function(){
define("curam/util/Navigation",["curam/util","curam/tab","curam/define"],function(){
curam.define.singleton("curam.util.Navigation",{goToPage:function(_e13,_e14){
var url=_e13+"Page.do"+curam.util.makeQueryString(_e14);
curam.util.Navigation.goToUrl(url);
},goToUrl:function(_e15){
curam.tab.getTabController().processURL(_e15);
}});
return curam.util.Navigation;
});
},"dijit/form/FilteringSelect":function(){
define("dijit/form/FilteringSelect",["dojo/data/util/filter","dojo/_base/declare","dojo/_base/Deferred","dojo/_base/lang","./MappedTextBox","./ComboBoxMixin"],function(_e16,_e17,_e18,lang,_e19,_e1a){
return _e17("dijit.form.FilteringSelect",[_e19,_e1a],{required:true,_lastDisplayedValue:"",_isValidSubset:function(){
return this._opened;
},isValid:function(){
return !!this.item||(!this.required&&this.get("displayedValue")=="");
},_refreshState:function(){
if(!this.searchTimer){
this.inherited(arguments);
}
},_callbackSetLabel:function(_e1b,_e1c,_e1d,_e1e){
if((_e1c&&_e1c[this.searchAttr]!==this._lastQuery)||(!_e1c&&_e1b.length&&this.store.getIdentity(_e1b[0])!=this._lastQuery)){
return;
}
if(!_e1b.length){
this.set("value","",_e1e||(_e1e===undefined&&!this.focused),this.textbox.value,null);
}else{
this.set("item",_e1b[0],_e1e);
}
},_openResultList:function(_e1f,_e20,_e21){
if(_e20[this.searchAttr]!==this._lastQuery){
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
},_setValueAttr:function(_e22,_e23,_e24,item){
if(!this._onChangeActive){
_e23=null;
}
if(item===undefined){
if(_e22===null||_e22===""){
_e22="";
if(!lang.isString(_e24)){
this._setDisplayedValueAttr(_e24||"",_e23);
return;
}
}
var self=this;
this._lastQuery=_e22;
_e18.when(this.store.get(_e22),function(item){
self._callbackSetLabel(item?[item]:[],undefined,undefined,_e23);
});
}else{
this.valueNode.value=_e22;
this.inherited(arguments);
}
},_setItemAttr:function(item,_e25,_e26){
this.inherited(arguments);
this._lastDisplayedValue=this.textbox.value;
},_getDisplayQueryString:function(text){
return text.replace(/([\\\*\?])/g,"\\$1");
},_setDisplayedValueAttr:function(_e27,_e28){
if(_e27==null){
_e27="";
}
if(!this._created){
if(!("displayedValue" in this.params)){
return;
}
_e28=false;
}
if(this.store){
this.closeDropDown();
var _e29=lang.clone(this.query);
var qs=this._getDisplayQueryString(_e27),q;
if(this.store._oldAPI){
q=qs;
}else{
q=_e16.patternToRegExp(qs,this.ignoreCase);
q.toString=function(){
return qs;
};
}
this._lastQuery=_e29[this.searchAttr]=q;
this.textbox.value=_e27;
this._lastDisplayedValue=_e27;
this._set("displayedValue",_e27);
var _e2a=this;
var _e2b={ignoreCase:this.ignoreCase,deep:true};
lang.mixin(_e2b,this.fetchProperties);
this._fetchHandle=this.store.query(_e29,_e2b);
_e18.when(this._fetchHandle,function(_e2c){
_e2a._fetchHandle=null;
_e2a._callbackSetLabel(_e2c||[],_e29,_e2b,_e28);
},function(err){
_e2a._fetchHandle=null;
if(!_e2a._cancelingQuery){
console.error("dijit.form.FilteringSelect: "+err.toString());
}
});
}
},undo:function(){
this.set("displayedValue",this._lastDisplayedValue);
}});
});
},"dojo/data/util/sorter":function(){
define("dojo/data/util/sorter",["dojo/_base/lang"],function(lang){
var _e2d=lang.getObject("dojo.data.util.sorter",true);
_e2d.basicComparator=function(a,b){
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
_e2d.createSortFunction=function(_e2e,_e2f){
var _e30=[];
function _e31(attr,dir,comp,s){
return function(_e32,_e33){
var a=s.getValue(_e32,attr);
var b=s.getValue(_e33,attr);
return dir*comp(a,b);
};
};
var _e34;
var map=_e2f.comparatorMap;
var bc=_e2d.basicComparator;
for(var i=0;i<_e2e.length;i++){
_e34=_e2e[i];
var attr=_e34.attribute;
if(attr){
var dir=(_e34.descending)?-1:1;
var comp=bc;
if(map){
if(typeof attr!=="string"&&("toString" in attr)){
attr=attr.toString();
}
comp=map[attr]||bc;
}
_e30.push(_e31(attr,dir,comp,_e2f));
}
}
return function(rowA,rowB){
var i=0;
while(i<_e30.length){
var ret=_e30[i++](rowA,rowB);
if(ret!==0){
return ret;
}
}
return 0;
};
};
return _e2d;
});
},"dijit/form/_ButtonMixin":function(){
define("dijit/form/_ButtonMixin",["dojo/_base/declare","dojo/dom","dojo/_base/event","../registry"],function(_e35,dom,_e36,_e37){
return _e35("dijit.form._ButtonMixin",null,{label:"",type:"button",_onClick:function(e){
if(this.disabled){
_e36.stop(e);
return false;
}
var _e38=this.onClick(e)===false;
if(!_e38&&this.type=="submit"&&!(this.valueNode||this.focusNode).form){
for(var node=this.domNode;node.parentNode;node=node.parentNode){
var _e39=_e37.byNode(node);
if(_e39&&typeof _e39._onSubmit=="function"){
_e39._onSubmit(e);
_e38=true;
break;
}
}
}
if(_e38){
e.preventDefault();
}
return !_e38;
},postCreate:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},onClick:function(){
return true;
},_setLabelAttr:function(_e3a){
this._set("label",_e3a);
(this.containerNode||this.focusNode).innerHTML=_e3a;
}});
});
},"dijit/registry":function(){
define("dijit/registry",["dojo/_base/array","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window","."],function(_e3b,has,_e3c,win,_e3d){
var _e3e={},hash={};
var _e3f={length:0,add:function(_e40){
if(hash[_e40.id]){
throw new Error("Tried to register widget with id=="+_e40.id+" but that id is already registered");
}
hash[_e40.id]=_e40;
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
},getUniqueId:function(_e41){
var id;
do{
id=_e41+"_"+(_e41 in _e3e?++_e3e[_e41]:_e3e[_e41]=0);
}while(hash[id]);
return _e3d._scopeName=="dijit"?id:_e3d._scopeName+"_"+id;
},findWidgets:function(root){
var _e42=[];
function _e43(root){
for(var node=root.firstChild;node;node=node.nextSibling){
if(node.nodeType==1){
var _e44=node.getAttribute("widgetId");
if(_e44){
var _e45=hash[_e44];
if(_e45){
_e42.push(_e45);
}
}else{
_e43(node);
}
}
}
};
_e43(root);
return _e42;
},_destroyAll:function(){
_e3d._curFocus=null;
_e3d._prevFocus=null;
_e3d._activeStack=[];
_e3b.forEach(_e3f.findWidgets(win.body()),function(_e46){
if(!_e46._destroyed){
if(_e46.destroyRecursive){
_e46.destroyRecursive();
}else{
if(_e46.destroy){
_e46.destroy();
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
_e3d.registry=_e3f;
return _e3f;
});
},"dojo/date/locale":function(){
define("dojo/date/locale",["../_base/kernel","../_base/lang","../_base/array","../date","../cldr/supplemental","../regexp","../string","../i18n!../cldr/nls/gregorian"],function(dojo,lang,_e47,date,cldr,_e48,_e49,_e4a){
lang.getObject("date.locale",true,dojo);
function _e4b(_e4c,_e4d,_e4e,_e4f){
return _e4f.replace(/([a-z])\1*/ig,function(_e50){
var s,pad,c=_e50.charAt(0),l=_e50.length,_e51=["abbr","wide","narrow"];
switch(c){
case "G":
s=_e4d[(l<4)?"eraAbbr":"eraNames"][_e4c.getFullYear()<0?0:1];
break;
case "y":
s=_e4c.getFullYear();
switch(l){
case 1:
break;
case 2:
if(!_e4e.fullYear){
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
s=Math.ceil((_e4c.getMonth()+1)/3);
pad=true;
break;
case "M":
var m=_e4c.getMonth();
if(l<3){
s=m+1;
pad=true;
}else{
var _e52=["months","format",_e51[l-3]].join("-");
s=_e4d[_e52][m];
}
break;
case "w":
var _e53=0;
s=dojo.date.locale._getWeekOfYear(_e4c,_e53);
pad=true;
break;
case "d":
s=_e4c.getDate();
pad=true;
break;
case "D":
s=dojo.date.locale._getDayOfYear(_e4c);
pad=true;
break;
case "E":
var d=_e4c.getDay();
if(l<3){
s=d+1;
pad=true;
}else{
var _e54=["days","format",_e51[l-3]].join("-");
s=_e4d[_e54][d];
}
break;
case "a":
var _e55=(_e4c.getHours()<12)?"am":"pm";
s=_e4e[_e55]||_e4d["dayPeriods-format-wide-"+_e55];
break;
case "h":
case "H":
case "K":
case "k":
var h=_e4c.getHours();
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
s=_e4c.getMinutes();
pad=true;
break;
case "s":
s=_e4c.getSeconds();
pad=true;
break;
case "S":
s=Math.round(_e4c.getMilliseconds()*Math.pow(10,l-3));
pad=true;
break;
case "v":
case "z":
s=dojo.date.locale._getZone(_e4c,true,_e4e);
if(s){
break;
}
l=4;
case "Z":
var _e56=dojo.date.locale._getZone(_e4c,false,_e4e);
var tz=[(_e56<=0?"+":"-"),_e49.pad(Math.floor(Math.abs(_e56)/60),2),_e49.pad(Math.abs(_e56)%60,2)];
if(l==4){
tz.splice(0,0,"GMT");
tz.splice(3,0,":");
}
s=tz.join("");
break;
default:
throw new Error("dojo.date.locale.format: invalid pattern char: "+_e4f);
}
if(pad){
s=_e49.pad(s,l);
}
return s;
});
};
dojo.date.locale._getZone=function(_e57,_e58,_e59){
if(_e58){
return date.getTimezoneName(_e57);
}else{
return _e57.getTimezoneOffset();
}
};
dojo.date.locale.format=function(_e5a,_e5b){
_e5b=_e5b||{};
var _e5c=dojo.i18n.normalizeLocale(_e5b.locale),_e5d=_e5b.formatLength||"short",_e5e=dojo.date.locale._getGregorianBundle(_e5c),str=[],_e5f=lang.hitch(this,_e4b,_e5a,_e5e,_e5b);
if(_e5b.selector=="year"){
return _e60(_e5e["dateFormatItem-yyyy"]||"yyyy",_e5f);
}
var _e61;
if(_e5b.selector!="date"){
_e61=_e5b.timePattern||_e5e["timeFormat-"+_e5d];
if(_e61){
str.push(_e60(_e61,_e5f));
}
}
if(_e5b.selector!="time"){
_e61=_e5b.datePattern||_e5e["dateFormat-"+_e5d];
if(_e61){
str.push(_e60(_e61,_e5f));
}
}
return str.length==1?str[0]:_e5e["dateTimeFormat-"+_e5d].replace(/\{(\d+)\}/g,function(_e62,key){
return str[key];
});
};
dojo.date.locale.regexp=function(_e63){
return dojo.date.locale._parseInfo(_e63).regexp;
};
dojo.date.locale._parseInfo=function(_e64){
_e64=_e64||{};
var _e65=dojo.i18n.normalizeLocale(_e64.locale),_e66=dojo.date.locale._getGregorianBundle(_e65),_e67=_e64.formatLength||"short",_e68=_e64.datePattern||_e66["dateFormat-"+_e67],_e69=_e64.timePattern||_e66["timeFormat-"+_e67],_e6a;
if(_e64.selector=="date"){
_e6a=_e68;
}else{
if(_e64.selector=="time"){
_e6a=_e69;
}else{
_e6a=_e66["dateTimeFormat-"+_e67].replace(/\{(\d+)\}/g,function(_e6b,key){
return [_e69,_e68][key];
});
}
}
var _e6c=[],re=_e60(_e6a,lang.hitch(this,_e6d,_e6c,_e66,_e64));
return {regexp:re,tokens:_e6c,bundle:_e66};
};
dojo.date.locale.parse=function(_e6e,_e6f){
var _e70=/[\u200E\u200F\u202A\u202E]/g,info=dojo.date.locale._parseInfo(_e6f),_e71=info.tokens,_e72=info.bundle,re=new RegExp("^"+info.regexp.replace(_e70,"")+"$",info.strict?"":"i"),_e73=re.exec(_e6e&&_e6e.replace(_e70,""));
if(!_e73){
return null;
}
var _e74=["abbr","wide","narrow"],_e75=[1970,0,1,0,0,0,0],amPm="",_e76=dojo.every(_e73,function(v,i){
if(!i){
return true;
}
var _e77=_e71[i-1];
var l=_e77.length;
switch(_e77.charAt(0)){
case "y":
if(l!=2&&_e6f.strict){
_e75[0]=v;
}else{
if(v<100){
v=Number(v);
var year=""+new Date().getFullYear(),_e78=year.substring(0,2)*100,_e79=Math.min(Number(year.substring(2,4))+20,99);
_e75[0]=(v<_e79)?_e78+v:_e78-100+v;
}else{
if(_e6f.strict){
return false;
}
_e75[0]=v;
}
}
break;
case "M":
if(l>2){
var _e7a=_e72["months-format-"+_e74[l-3]].concat();
if(!_e6f.strict){
v=v.replace(".","").toLowerCase();
_e7a=dojo.map(_e7a,function(s){
return s.replace(".","").toLowerCase();
});
}
v=dojo.indexOf(_e7a,v);
if(v==-1){
return false;
}
}else{
v--;
}
_e75[1]=v;
break;
case "E":
case "e":
var days=_e72["days-format-"+_e74[l-3]].concat();
if(!_e6f.strict){
v=v.toLowerCase();
days=dojo.map(days,function(d){
return d.toLowerCase();
});
}
v=dojo.indexOf(days,v);
if(v==-1){
return false;
}
break;
case "D":
_e75[1]=0;
case "d":
_e75[2]=v;
break;
case "a":
var am=_e6f.am||_e72["dayPeriods-format-wide-am"],pm=_e6f.pm||_e72["dayPeriods-format-wide-pm"];
if(!_e6f.strict){
var _e7b=/\./g;
v=v.replace(_e7b,"").toLowerCase();
am=am.replace(_e7b,"").toLowerCase();
pm=pm.replace(_e7b,"").toLowerCase();
}
if(_e6f.strict&&v!=am&&v!=pm){
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
_e75[3]=v;
break;
case "m":
_e75[4]=v;
break;
case "s":
_e75[5]=v;
break;
case "S":
_e75[6]=v;
}
return true;
});
var _e7c=+_e75[3];
if(amPm==="p"&&_e7c<12){
_e75[3]=_e7c+12;
}else{
if(amPm==="a"&&_e7c==12){
_e75[3]=0;
}
}
var _e7d=new Date(_e75[0],_e75[1],_e75[2],_e75[3],_e75[4],_e75[5],_e75[6]);
if(_e6f.strict){
_e7d.setFullYear(_e75[0]);
}
var _e7e=_e71.join(""),_e7f=_e7e.indexOf("d")!=-1,_e80=_e7e.indexOf("M")!=-1;
if(!_e76||(_e80&&_e7d.getMonth()>_e75[1])||(_e7f&&_e7d.getDate()>_e75[2])){
return null;
}
if((_e80&&_e7d.getMonth()<_e75[1])||(_e7f&&_e7d.getDate()<_e75[2])){
_e7d=date.add(_e7d,"hour",1);
}
return _e7d;
};
function _e60(_e81,_e82,_e83,_e84){
var _e85=function(x){
return x;
};
_e82=_e82||_e85;
_e83=_e83||_e85;
_e84=_e84||_e85;
var _e86=_e81.match(/(''|[^'])+/g),_e87=_e81.charAt(0)=="'";
dojo.forEach(_e86,function(_e88,i){
if(!_e88){
_e86[i]="";
}else{
_e86[i]=(_e87?_e83:_e82)(_e88.replace(/''/g,"'"));
_e87=!_e87;
}
});
return _e84(_e86.join(""));
};
function _e6d(_e89,_e8a,_e8b,_e8c){
_e8c=_e48.escapeString(_e8c);
if(!_e8b.strict){
_e8c=_e8c.replace(" a"," ?a");
}
return _e8c.replace(/([a-z])\1*/ig,function(_e8d){
var s,c=_e8d.charAt(0),l=_e8d.length,p2="",p3="";
if(_e8b.strict){
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
var am=_e8b.am||_e8a["dayPeriods-format-wide-am"],pm=_e8b.pm||_e8a["dayPeriods-format-wide-pm"];
s=am+"|"+pm;
if(!_e8b.strict){
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
if(_e89){
_e89.push(_e8d);
}
return "("+s+")";
}).replace(/[\xa0 ]/g,"[\\s\\xa0]");
};
var _e8e=[];
dojo.date.locale.addCustomFormats=function(_e8f,_e90){
_e8e.push({pkg:_e8f,name:_e90});
};
dojo.date.locale._getGregorianBundle=function(_e91){
var _e92={};
dojo.forEach(_e8e,function(desc){
var _e93=dojo.i18n.getLocalization(desc.pkg,desc.name,_e91);
_e92=lang.mixin(_e92,_e93);
},this);
return _e92;
};
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(item,type,_e94,_e95){
var _e96,_e97=dojo.date.locale._getGregorianBundle(_e95),_e98=[item,_e94,type];
if(_e94=="standAlone"){
var key=_e98.join("-");
_e96=_e97[key];
if(_e96[0]==1){
_e96=undefined;
}
}
_e98[1]="format";
return (_e96||_e97[_e98.join("-")]).concat();
};
dojo.date.locale.isWeekend=function(_e99,_e9a){
var _e9b=cldr.getWeekend(_e9a),day=(_e99||new Date()).getDay();
if(_e9b.end<_e9b.start){
_e9b.end+=7;
if(day<_e9b.start){
day+=7;
}
}
return day>=_e9b.start&&day<=_e9b.end;
};
dojo.date.locale._getDayOfYear=function(_e9c){
return date.difference(new Date(_e9c.getFullYear(),0,1,_e9c.getHours()),_e9c)+1;
};
dojo.date.locale._getWeekOfYear=function(_e9d,_e9e){
if(arguments.length==1){
_e9e=0;
}
var _e9f=new Date(_e9d.getFullYear(),0,1).getDay(),adj=(_e9f-_e9e+7)%7,week=Math.floor((dojo.date.locale._getDayOfYear(_e9d)+adj-1)/7);
if(_e9f==_e9e){
week++;
}
return week;
};
return dojo.date.locale;
});
},"dijit/tree/_dndContainer":function(){
define("dijit/tree/_dndContainer",["dojo/aspect","dojo/_base/declare","dojo/dom-class","dojo/_base/event","dojo/_base/lang","dojo/mouse","dojo/on"],function(_ea0,_ea1,_ea2,_ea3,lang,_ea4,on){
return _ea1("dijit.tree._dndContainer",null,{constructor:function(tree,_ea5){
this.tree=tree;
this.node=tree.domNode;
lang.mixin(this,_ea5);
this.current=null;
this.containerState="";
_ea2.add(this.node,"dojoDndContainer");
this.events=[on(this.node,_ea4.enter,lang.hitch(this,"onOverEvent")),on(this.node,_ea4.leave,lang.hitch(this,"onOutEvent")),_ea0.after(this.tree,"_onNodeMouseEnter",lang.hitch(this,"onMouseOver"),true),_ea0.after(this.tree,"_onNodeMouseLeave",lang.hitch(this,"onMouseOut"),true),on(this.node,"dragstart",lang.hitch(_ea3,"stop")),on(this.node,"selectstart",lang.hitch(_ea3,"stop"))];
},destroy:function(){
var h;
while(h=this.events.pop()){
h.remove();
}
this.node=this.parent=null;
},onMouseOver:function(_ea6){
this.current=_ea6;
},onMouseOut:function(){
this.current=null;
},_changeState:function(type,_ea7){
var _ea8="dojoDnd"+type;
var _ea9=type.toLowerCase()+"State";
_ea2.replace(this.node,_ea8+_ea7,_ea8+this[_ea9]);
this[_ea9]=_ea7;
},_addItemClass:function(node,type){
_ea2.add(node,"dojoDndItem"+type);
},_removeItemClass:function(node,type){
_ea2.remove(node,"dojoDndItem"+type);
},onOverEvent:function(){
this._changeState("Container","Over");
},onOutEvent:function(){
this._changeState("Container","");
}});
});
},"curam/layout/TabContainer":function(){
require({cache:{"url:curam/layout/resources/TabContainer.html":"<div class=\"dijitTabContainer\">\r\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\r\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer dijitAlignTop\"></div>\r\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container dijitAlignClient\" data-dojo-attach-point=\"containerNode\"></div>\r\n</div>\r\n"}});
define("curam/layout/TabContainer",["dijit/layout/TabContainer","dojo/text!curam/layout/resources/TabContainer.html"],function(_eaa,_eab){
var _eac=dojo.declare("curam.layout.TabContainer",_eaa,{templateString:_eab,_theSelectedTabIndex:0,_thePage:null,_theChildren:null,postCreate:function(){
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
var _ead=this.getChildren();
var i=0;
var _eae=0;
for(i=0;i<_ead.length;i++){
if(_ead[i].get("selected")){
_eae=i;
break;
}
}
this._theSelectedTabIndex=_eae;
this._thePage=page;
this._theChildren=_ead;
}
this.inherited(arguments);
}});
return _eac;
});
},"dijit/form/_FormSelectWidget":function(){
define("dijit/form/_FormSelectWidget",["dojo/_base/array","dojo/aspect","dojo/data/util/sorter","dojo/_base/declare","dojo/dom","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/query","./_FormValueWidget"],function(_eaf,_eb0,_eb1,_eb2,dom,_eb3,_eb4,lang,_eb5,_eb6){
return _eb2("dijit.form._FormSelectWidget",_eb6,{multiple:false,options:null,store:null,query:null,queryOptions:null,onFetch:null,sortByLabel:true,loadChildrenOnOpen:false,getOptions:function(_eb7){
var _eb8=_eb7,opts=this.options||[],l=opts.length;
if(_eb8===undefined){
return opts;
}
if(lang.isArray(_eb8)){
return _eaf.map(_eb8,"return this.getOptions(item);",this);
}
if(lang.isObject(_eb7)){
if(!_eaf.some(this.options,function(o,idx){
if(o===_eb8||(o.value&&o.value===_eb8.value)){
_eb8=idx;
return true;
}
return false;
})){
_eb8=-1;
}
}
if(typeof _eb8=="string"){
for(var i=0;i<l;i++){
if(opts[i].value===_eb8){
_eb8=i;
break;
}
}
}
if(typeof _eb8=="number"&&_eb8>=0&&_eb8<l){
return this.options[_eb8];
}
return null;
},addOption:function(_eb9){
if(!lang.isArray(_eb9)){
_eb9=[_eb9];
}
_eaf.forEach(_eb9,function(i){
if(i&&lang.isObject(i)){
this.options.push(i);
}
},this);
this._loadChildren();
},removeOption:function(_eba){
if(!lang.isArray(_eba)){
_eba=[_eba];
}
var _ebb=this.getOptions(_eba);
_eaf.forEach(_ebb,function(i){
if(i){
this.options=_eaf.filter(this.options,function(node){
return (node.value!==i.value||node.label!==i.label);
});
this._removeOptionItem(i);
}
},this);
this._loadChildren();
},updateOption:function(_ebc){
if(!lang.isArray(_ebc)){
_ebc=[_ebc];
}
_eaf.forEach(_ebc,function(i){
var _ebd=this.getOptions(i),k;
if(_ebd){
for(k in i){
_ebd[k]=i[k];
}
}
},this);
this._loadChildren();
},setStore:function(_ebe,_ebf,_ec0){
var _ec1=this.store;
_ec0=_ec0||{};
if(_ec1!==_ebe){
var h;
while(h=this._notifyConnections.pop()){
h.remove();
}
if(_ebe&&_ebe.getFeatures()["dojo.data.api.Notification"]){
this._notifyConnections=[_eb0.after(_ebe,"onNew",lang.hitch(this,"_onNewItem"),true),_eb0.after(_ebe,"onDelete",lang.hitch(this,"_onDeleteItem"),true),_eb0.after(_ebe,"onSet",lang.hitch(this,"_onSetItem"),true)];
}
this._set("store",_ebe);
}
this._onChangeActive=false;
if(this.options&&this.options.length){
this.removeOption(this.options);
}
if(_ebe){
this._loadingStore=true;
_ebe.fetch(lang.delegate(_ec0,{onComplete:function(_ec2,opts){
if(this.sortByLabel&&!_ec0.sort&&_ec2.length){
_ec2.sort(_eb1.createSortFunction([{attribute:_ebe.getLabelAttributes(_ec2[0])[0]}],_ebe));
}
if(_ec0.onFetch){
_ec2=_ec0.onFetch.call(this,_ec2,opts);
}
_eaf.forEach(_ec2,function(i){
this._addOptionForItem(i);
},this);
this._loadingStore=false;
this.set("value","_pendingValue" in this?this._pendingValue:_ebf);
delete this._pendingValue;
if(!this.loadChildrenOnOpen){
this._loadChildren();
}else{
this._pseudoLoadChildren(_ec2);
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
return _ec1;
},_setValueAttr:function(_ec3,_ec4){
if(this._loadingStore){
this._pendingValue=_ec3;
return;
}
var opts=this.getOptions()||[];
if(!lang.isArray(_ec3)){
_ec3=[_ec3];
}
_eaf.forEach(_ec3,function(i,idx){
if(!lang.isObject(i)){
i=i+"";
}
if(typeof i==="string"){
_ec3[idx]=_eaf.filter(opts,function(node){
return node.value===i;
})[0]||{value:"",label:""};
}
},this);
_ec3=_eaf.filter(_ec3,function(i){
return i&&i.value;
});
if(!this.multiple&&(!_ec3[0]||!_ec3[0].value)&&opts.length){
_ec3[0]=opts[0];
}
_eaf.forEach(opts,function(i){
i.selected=_eaf.some(_ec3,function(v){
return v.value===i.value;
});
});
var val=_eaf.map(_ec3,function(i){
return i.value;
}),disp=_eaf.map(_ec3,function(i){
return i.label;
});
this._set("value",this.multiple?val:val[0]);
this._setDisplay(this.multiple?disp:disp[0]);
this._updateSelection();
this._handleOnChange(this.value,_ec4);
},_getDisplayedValueAttr:function(){
var val=this.get("value");
if(!lang.isArray(val)){
val=[val];
}
var ret=_eaf.map(this.getOptions(val),function(v){
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
_eaf.forEach(this._getChildren(),function(_ec5){
_ec5.destroyRecursive();
});
_eaf.forEach(this.options,this._addOptionItem,this);
this._updateSelection();
},_updateSelection:function(){
this._set("value",this._getValueFromOpts());
var val=this.value;
if(!lang.isArray(val)){
val=[val];
}
if(val&&val[0]){
_eaf.forEach(this._getChildren(),function(_ec6){
var _ec7=_eaf.some(val,function(v){
return _ec6.option&&(v===_ec6.option.value);
});
_eb3.toggle(_ec6.domNode,this.baseClass+"SelectedOption",_ec7);
_ec6.domNode.setAttribute("aria-selected",_ec7);
},this);
}
},_getValueFromOpts:function(){
var opts=this.getOptions()||[];
if(!this.multiple&&opts.length){
var opt=_eaf.filter(opts,function(i){
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
return _eaf.map(_eaf.filter(opts,function(i){
return i.selected;
}),function(i){
return i.value;
})||[];
}
}
return "";
},_onNewItem:function(item,_ec8){
if(!_ec8||!_ec8.parent){
this._addOptionForItem(item);
}
},_onDeleteItem:function(item){
var _ec9=this.store;
this.removeOption(_ec9.getIdentity(item));
},_onSetItem:function(item){
this.updateOption(this._getOptionObjForItem(item));
},_getOptionObjForItem:function(item){
var _eca=this.store,_ecb=_eca.getLabel(item),_ecc=(_ecb?_eca.getIdentity(item):null);
return {value:_ecc,label:_ecb,item:item};
},_addOptionForItem:function(item){
var _ecd=this.store;
if(!_ecd.isItemLoaded(item)){
_ecd.loadItem({item:item,onItem:function(i){
this._addOptionForItem(i);
},scope:this});
return;
}
var _ece=this._getOptionObjForItem(item);
this.addOption(_ece);
},constructor:function(_ecf){
this._oValue=(_ecf||{}).value||null;
this._notifyConnections=[];
},buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},_fillContent:function(){
var opts=this.options;
if(!opts){
opts=this.options=this.srcNodeRef?_eb5("> *",this.srcNodeRef).map(function(node){
if(node.getAttribute("type")==="separator"){
return {value:"",label:"",selected:false,disabled:false};
}
return {value:(node.getAttribute("data-"+_eb4._scopeName+"-value")||node.getAttribute("value")),label:String(node.innerHTML),selected:node.getAttribute("selected")||false,disabled:node.getAttribute("disabled")||false};
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
var _ed0=this.store,_ed1={};
_eaf.forEach(["query","queryOptions","onFetch"],function(i){
if(this[i]){
_ed1[i]=this[i];
}
delete this[i];
},this);
if(_ed0&&_ed0.getFeatures()["dojo.data.api.Identity"]){
this.store=null;
this.setStore(_ed0,this._oValue,_ed1);
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
},"curam/util/ResourceBundle":function(){
define("curam/util/ResourceBundle",["dojo/i18n","dojo/string"],function(i18n,_ed2){
var _ed3=dojo.declare("curam.util.ResourceBundle",null,{_bundle:undefined,constructor:function(_ed4,_ed5){
var _ed6=_ed4.split(".");
var _ed7=_ed6[_ed6.length-1];
var _ed8=_ed6.length==1?"curam.application":_ed4.slice(0,_ed4.length-_ed7.length-1);
try{
var b=i18n.getLocalization(_ed8,_ed7,_ed5);
if(this._isEmpty(b)){
throw new Error("Empty resource bundle.");
}else{
this._bundle=b;
}
}
catch(e){
throw new Error("Unable to access resource bundle: "+_ed8+"."+_ed7+": "+e.message);
}
},_isEmpty:function(_ed9){
for(var prop in _ed9){
return false;
}
return true;
},getProperty:function(key,_eda){
var msg=this._bundle[key];
var _edb=msg;
if(_eda){
_edb=_ed2.substitute(msg,_eda);
}
return _edb;
}});
return _ed3;
});
},"dijit/form/Select":function(){
require({cache:{"url:dijit/form/templates/Select.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tdata-dojo-attach-point=\"_buttonNode,tableNode,focusNode\" cellspacing='0' cellpadding='0'\n\trole=\"combobox\" aria-haspopup=\"true\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonContents dijitButtonNode\" role=\"presentation\"\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"  data-dojo-attach-point=\"containerNode,_popupStateNode\"></span\n\t\t\t><input type=\"hidden\" ${!nameAttrSetting} data-dojo-attach-point=\"valueNode\" value=\"${value}\" aria-hidden=\"true\"\n\t\t/></td><td class=\"dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton\"\n\t\t\t\tdata-dojo-attach-point=\"titleNode\" role=\"presentation\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t></tr></tbody\n></table>\n"}});
define("dijit/form/Select",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/_base/event","dojo/i18n","dojo/_base/lang","./_FormSelectWidget","../_HasDropDown","../Menu","../MenuItem","../MenuSeparator","../Tooltip","dojo/text!./templates/Select.html","dojo/i18n!./nls/validate"],function(_edc,_edd,_ede,_edf,_ee0,_ee1,_ee2,i18n,lang,_ee3,_ee4,Menu,_ee5,_ee6,_ee7,_ee8){
var _ee9=_edd("dijit.form._SelectMenu",Menu,{buildRendering:function(){
this.inherited(arguments);
var o=(this.menuTableNode=this.domNode);
var n=(this.domNode=_ee0.create("div",{style:{overflowX:"hidden",overflowY:"scroll"}}));
if(o.parentNode){
o.parentNode.replaceChild(n,o);
}
_edf.remove(o,"dijitMenuTable");
n.className=o.className+" dijitSelectMenu";
o.className="dijitReset dijitMenuTable";
o.setAttribute("role","listbox");
n.setAttribute("role","presentation");
n.appendChild(o);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onmousemove",_ee2.stop);
},resize:function(mb){
if(mb){
_ee1.setMarginBox(this.domNode,mb);
if("w" in mb){
this.menuTableNode.style.width="100%";
}
}
}});
var _eea=_edd("dijit.form.Select",[_ee3,_ee4],{baseClass:"dijitSelect",templateString:_ee8,required:false,state:"",message:"",tooltipPosition:[],emptyLabel:"&#160;",_isLoaded:false,_childrenLoaded:false,_fillContent:function(){
this.inherited(arguments);
if(this.options.length&&!this.value&&this.srcNodeRef){
var si=this.srcNodeRef.selectedIndex||0;
this.value=this.options[si>=0?si:0].value;
}
this.dropDown=new _ee9({id:this.id+"_menu"});
_edf.add(this.dropDown.domNode,this.baseClass+"Menu");
},_getMenuItemForOption:function(_eeb){
if(!_eeb.value&&!_eeb.label){
return new _ee6();
}else{
var _eec=lang.hitch(this,"_setValueAttr",_eeb);
var item=new _ee5({option:_eeb,label:_eeb.label||this.emptyLabel,onClick:_eec,disabled:_eeb.disabled||false});
item.focusNode.setAttribute("role","listitem");
return item;
}
},_addOptionItem:function(_eed){
if(this.dropDown){
this.dropDown.addChild(this._getMenuItemForOption(_eed));
}
},_getChildren:function(){
if(!this.dropDown){
return [];
}
return this.dropDown.getChildren();
},_loadChildren:function(_eee){
if(_eee===true){
if(this.dropDown){
delete this.dropDown.focusedChild;
}
if(this.options.length){
this.inherited(arguments);
}else{
_edc.forEach(this._getChildren(),function(_eef){
_eef.destroyRecursive();
});
var item=new _ee5({label:"&#160;"});
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
},_setValueAttr:function(_ef0){
this.inherited(arguments);
_ede.set(this.valueNode,"value",this.get("value"));
this.validate(this.focused);
},_setDisabledAttr:function(_ef1){
this.inherited(arguments);
this.validate(this.focused);
},_setRequiredAttr:function(_ef2){
this._set("required",_ef2);
this.focusNode.setAttribute("aria-required",_ef2);
this.validate(this.focused);
},_setDisplay:function(_ef3){
var lbl=_ef3||this.emptyLabel;
this.containerNode.innerHTML="<span class=\"dijitReset dijitInline "+this.baseClass+"Label\">"+lbl+"</span>";
this.focusNode.setAttribute("aria-valuetext",lbl);
},validate:function(_ef4){
var _ef5=this.disabled||this.isValid(_ef4);
this._set("state",_ef5?"":"Incomplete");
this.focusNode.setAttribute("aria-invalid",_ef5?"false":"true");
var _ef6=_ef5?"":this._missingMsg;
if(_ef6&&this.focused&&this._hasBeenBlurred){
_ee7.show(_ef6,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}else{
_ee7.hide(this.domNode);
}
this._set("message",_ef6);
return _ef5;
},isValid:function(){
return (!this.required||this.value===0||!(/^\s*$/.test(this.value||"")));
},reset:function(){
this.inherited(arguments);
_ee7.hide(this.domNode);
this.validate(this.focused);
},postMixInProperties:function(){
this.inherited(arguments);
this._missingMsg=i18n.getLocalization("dijit.form","validate",this.lang).missingMessage;
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onmousemove",_ee2.stop);
},_setStyleAttr:function(_ef7){
this.inherited(arguments);
_edf.toggle(this.domNode,this.baseClass+"FixedWidth",!!this.domNode.style.width);
},isLoaded:function(){
return this._isLoaded;
},loadDropDown:function(_ef8){
this._loadChildren(true);
this._isLoaded=true;
_ef8();
},closeDropDown:function(){
this.inherited(arguments);
if(this.dropDown&&this.dropDown.menuTableNode){
this.dropDown.menuTableNode.style.width="";
}
},uninitialize:function(_ef9){
if(this.dropDown&&!this.dropDown._destroyed){
this.dropDown.destroyRecursive(_ef9);
delete this.dropDown;
}
this.inherited(arguments);
},_onFocus:function(){
this.validate(true);
this.inherited(arguments);
},_onBlur:function(){
_ee7.hide(this.domNode);
this.inherited(arguments);
}});
_eea._Menu=_ee9;
return _eea;
});
},"url:curam/layout/resources/Dialog.html":"<div class=\"dijitDialog\" role=\"alertdialog\" aria-labelledby=\"${id}_title\">\r\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\r\n\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span>\r\n\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" aria-label=\"${closeModalText}\" tabIndex=\"0\" onKeyDown=\"curam.util.isShiftTab(event)\">\r\n\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\">${closeModalText}</span>\r\n\t</span>\r\n  <span id=\"${id}_prompt\" class=\"hidden\" data-dojo-attach-point=\"promptText\">${modalPromptText}</span>\r\n\t</div>\r\n\t\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\r\n</div>\r\n","dojo/store/util/QueryResults":function(){
define("dojo/store/util/QueryResults",["../../_base/array","../../_base/lang","../../_base/Deferred"],function(_efa,lang,_efb){
var util=lang.getObject("dojo.store.util",true);
util.QueryResults=function(_efc){
if(!_efc){
return _efc;
}
if(_efc.then){
_efc=lang.delegate(_efc);
}
function _efd(_efe){
if(!_efc[_efe]){
_efc[_efe]=function(){
var args=arguments;
return _efb.when(_efc,function(_eff){
Array.prototype.unshift.call(args,_eff);
return util.QueryResults(_efa[_efe].apply(_efa,args));
});
};
}
};
_efd("forEach");
_efd("filter");
_efd("map");
if(!_efc.total){
_efc.total=_efb.when(_efc,function(_f00){
return _f00.length;
});
}
return _efc;
};
return util.QueryResults;
});
},"curam/FastUIMController":function(){
define("curam/FastUIMController",["dojo/parser","curam/UIMController","curam/debug","curam/util/onLoad","curam/util/ResourceBundle"],function(_f01){
dojo.requireLocalization("curam.application","Debug");
var _f02=new curam.util.ResourceBundle("Debug");
var _f03=dojo.declare("curam.FastUIMController",[curam.UIMController],{buildRendering:function(){
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
curam.debug.log("curam.FastUIMController "+_f02.getProperty("curam.FastUIMControlle.msg"));
}else{
var _f04=dojo.hitch(this,"processFrameLoadEvent");
curam.util.onLoad.addSubscriber(this.frame.id,_f04);
dojo.connect(this,"destroy",function(){
curam.util.onLoad.removeSubscriber(this.iframeId,_f04);
_f04=null;
});
}
if(this.inDialog){
dojo.style(this.frame,{width:this.width,height:this.height});
}
},_iframeLoaded:function(){
return dojo.attr(this.frame,"data-done-loading")=="true";
}});
return _f03;
});
},"curam/widget/DeferredDropDownButton":function(){
require({cache:{"url:curam/widget/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n"}});
define("curam/widget/DeferredDropDownButton",["dijit/form/DropDownButton","dojo/text!curam/widget/templates/DropDownButton.html","dijit/form/Button","dijit/MenuItem","curam/debug","curam/util","curam/util/ResourceBundle"],function(_f05,_f06){
dojo.requireLocalization("curam.application","Debug");
var _f07=new curam.util.ResourceBundle("Debug");
var _f08=dojo.declare("curam.widget.DeferredDropDownButton",dijit.form.DropDownButton,{templateString:_f06,o3tabId:null,useCustomPlaceAlgorithm:false,startup:function(){
if(this._started){
return;
}
var _f09=dojo.attr(this.domNode,"class").split(" ");
dojo.forEach(_f09,dojo.hitch(this,function(_f0a){
if(_f0a.indexOf("tab-widget-id-")!=-1){
this.o3tabId=_f0a.slice(14,_f0a.length);
}
}));
this.widgetTemplate=curam.widgetTemplates?curam.widgetTemplates[this.id]:null;
dijit.form.Button.prototype.startup.apply(this);
},toggleDropDown:function(){
if(!this.dropDown&&this.widgetTemplate){
this.widgetTemplate=this.widgetTemplate.split("&lt;").join("<").split("&gt;").join(">").split("&amp;").join("&").split("&quot;").join("'");
var _f0b=dojo.create("div",{innerHTML:this.widgetTemplate,style:{display:"none"}},dojo.body());
this.dropDown=dojo.parser.parse(_f0b)[0];
var menu=dijit.byNode(_f0b.firstChild);
if(menu.getChildren().length==0){
var mi=new dijit.MenuItem({disabled:true,label:LOCALISED_EMPTY_MENU_MARKER});
menu.addChild(mi);
}
this.widgetTemplate=null;
curam.debug.log(_f07.getProperty("curam.widget.DeferredDropDownButton.publish")+" /curam/menu/created "+_f07.getProperty("curam.widget.DeferredDropDownButton.for"),this.o3tabId);
var _f0c=curam.util.getTopmostWindow();
_f0c.dojo.publish("/curam/menu/created",[this.o3tabId]);
}
this.inherited(arguments);
},openDropDown:function(){
curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm=true;
this.inherited(arguments);
curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm=false;
}});
return _f08;
});
},"dijit/form/_ListBase":function(){
define("dijit/form/_ListBase",["dojo/_base/declare","dojo/window"],function(_f0d,_f0e){
return _f0d("dijit.form._ListBase",null,{selected:null,_getTarget:function(evt){
var tgt=evt.target;
var _f0f=this.containerNode;
if(tgt==_f0f||tgt==this.domNode){
return null;
}
while(tgt&&tgt.parentNode!=_f0f){
tgt=tgt.parentNode;
}
return tgt;
},selectFirstNode:function(){
var _f10=this.containerNode.firstChild;
while(_f10&&_f10.style.display=="none"){
_f10=_f10.nextSibling;
}
this._setSelectedAttr(_f10);
},selectLastNode:function(){
var last=this.containerNode.lastChild;
while(last&&last.style.display=="none"){
last=last.previousSibling;
}
this._setSelectedAttr(last);
},selectNextNode:function(){
var _f11=this._getSelectedAttr();
if(!_f11){
this.selectFirstNode();
}else{
var next=_f11.nextSibling;
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
var _f12=this._getSelectedAttr();
if(!_f12){
this.selectLastNode();
}else{
var prev=_f12.previousSibling;
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
var _f13=this._getSelectedAttr();
if(_f13){
this.onDeselect(_f13);
this.selected=null;
}
if(node&&node.parentNode==this.containerNode){
this.selected=node;
_f0e.scrollIntoView(node);
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
},"curam/util/UIMFragment":function(){
define("curam/util/UIMFragment",["curam/util/Request","curam/define","curam/debug","curam/util/ScreenContext"],function(_f14){
curam.define.singleton("curam.util.UIMFragment",{get:function(args){
var _f15=args&&args.pageID;
var url=args&&args.url;
var _f16=args&&args.params;
var _f17=args&&args.onLoad;
var _f18=args&&args.onDownloadError;
var _f19=args&&args.targetID;
if(_f19===""||typeof _f19==="undefined"){
throw "UIMFragment: targetID must be set.";
}
var _f1a=null;
if(url){
_f1a=url;
}else{
_f1a=curam.util.UIMFragment._constructPath(_f15)+curam.util.UIMFragment._addCDEJParameters()+curam.util.UIMFragment._encodeParameters(_f16);
}
curam.debug.log("UIMFragment: GET to "+_f1a);
curam.util.UIMFragment._doService(_f1a,_f19,args,_f17,_f18);
},submitForm:function(_f1b){
var _f1b=dojo.fixEvent(_f1b);
var _f1c=_f1b.target;
dojo.stopEvent(_f1b);
var _f1d={url:curam.util.UIMFragment._constructFormActionPath(_f1c),form:_f1c,load:function(data){
var cp=dijit.getEnclosingWidget(_f1c);
cp.set("content",data);
},error:function(_f1e){
alert("form error: error!!");
}};
_f14.post(_f1d);
console.log(_f1b+" "+_f1c);
},_constructFormActionPath:function(_f1f){
var _f20="";
if(window===window.top){
_f20=curam.config.locale+"/";
}
return _f20+_f1f.getAttribute("action");
},_initForm:function(_f21){
var _f22=dojo.query("form",dijit.byId(_f21).domNode)[0];
if(_f22){
dojo.connect(_f22,"onsubmit",curam.util.UIMFragment.submitForm);
}
},_constructPath:function(_f23){
var _f24=window;
var _f25=window.top;
return curam.util.UIMFragment._constructPathValue(_f23,_f24,_f25);
},_constructPathValue:function(_f26,_f27,_f28){
if(_f26===""||typeof _f26==="undefined"){
throw "UIMFragment: pageID must be set.";
}
var _f29="";
if(_f27.location.pathname===_f28.location.pathname){
var _f2a=_f28.curam&&_f28.curam.config&&_f28.curam.config.locale;
_f29=(_f2a||"en")+"/";
}
return _f29+_f26+"Page.do";
},_encodeParameters:function(_f2b){
if(typeof _f2b==="undefined"||dojo.toJson(_f2b)==="{}"){
curam.debug.log("UIMFragment: No params included in request.");
return "";
}
var _f2c=[];
for(var _f2d in _f2b){
_f2c.push(_f2d+"="+encodeURIComponent(_f2b[_f2d]));
}
return "&"+_f2c.join("&");
},_addCDEJParameters:function(){
return "?"+jsScreenContext.toRequestString();
},_doService:function(url,_f2e,args,_f2f,_f30){
var cp=dijit.byId(_f2e);
cp.onLoad=dojo.hitch(cp,curam.util.UIMFragment._handleLoadSuccess,args,_f2f);
cp.preventCache=true;
cp.set("href",url);
},_handleDownloadError:function(_f31){
curam.debug.log("Error invoking the UIMFragment: "+_f31);
return "UIMFragment: Generic Error Handler";
},_handleLoadSuccess:function(_f32,_f33){
curam.util.UIMFragment._initForm(_f32.targetID);
if(_f33){
_f33(this);
}
curam.debug.log("");
return "UIMFragment: Generic Success Handler";
}});
return curam.util.UIMFragment;
});
},"dijit/form/_FormWidget":function(){
define("dijit/form/_FormWidget",["dojo/_base/declare","dojo/_base/kernel","dojo/ready","../_Widget","../_CssStateMixin","../_TemplatedMixin","./_FormWidgetMixin"],function(_f34,_f35,_f36,_f37,_f38,_f39,_f3a){
if(!_f35.isAsync){
_f36(0,function(){
var _f3b=["dijit/form/_FormValueWidget"];
require(_f3b);
});
}
return _f34("dijit.form._FormWidget",[_f37,_f39,_f38,_f3a],{setDisabled:function(_f3c){
_f35.deprecated("setDisabled("+_f3c+") is deprecated. Use set('disabled',"+_f3c+") instead.","","2.0");
this.set("disabled",_f3c);
},setValue:function(_f3d){
_f35.deprecated("dijit.form._FormWidget:setValue("+_f3d+") is deprecated.  Use set('value',"+_f3d+") instead.","","2.0");
this.set("value",_f3d);
},getValue:function(){
_f35.deprecated(this.declaredClass+"::getValue() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},postMixInProperties:function(){
this.nameAttrSetting=this.name?("name=\""+this.name.replace(/'/g,"&quot;")+"\""):"";
this.inherited(arguments);
},_setTypeAttr:null});
});
},"dojo/DeferredList":function(){
define("dojo/DeferredList",["./_base/kernel","./_base/Deferred","./_base/array"],function(dojo,_f3e,_f3f){
dojo.DeferredList=function(list,_f40,_f41,_f42,_f43){
var _f44=[];
_f3e.call(this);
var self=this;
if(list.length===0&&!_f40){
this.resolve([0,[]]);
}
var _f45=0;
_f3f.forEach(list,function(item,i){
item.then(function(_f46){
if(_f40){
self.resolve([i,_f46]);
}else{
_f47(true,_f46);
}
},function(_f48){
if(_f41){
self.reject(_f48);
}else{
_f47(false,_f48);
}
if(_f42){
return null;
}
throw _f48;
});
function _f47(_f49,_f4a){
_f44[i]=[_f49,_f4a];
_f45++;
if(_f45===list.length){
self.resolve(_f44);
}
};
});
};
dojo.DeferredList.prototype=new _f3e();
dojo.DeferredList.prototype.gatherResults=function(_f4b){
var d=new dojo.DeferredList(_f4b,false,true,false);
d.addCallback(function(_f4c){
var ret=[];
_f3f.forEach(_f4c,function(_f4d){
ret.push(_f4d[1]);
});
return ret;
});
return d;
};
return dojo.DeferredList;
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
},"dijit/CheckedMenuItem":function(){
require({cache:{"url:dijit/templates/CheckedMenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitemcheckbox\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuItemIcon dijitCheckedMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t<span class=\"dijitCheckedMenuItemIconChar\">&#10003;</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,labelNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&#160;</td>\n</tr>\n"}});
define("dijit/CheckedMenuItem",["dojo/_base/declare","dojo/dom-class","./MenuItem","dojo/text!./templates/CheckedMenuItem.html","./hccss"],function(_f4e,_f4f,_f50,_f51){
return _f4e("dijit.CheckedMenuItem",_f50,{templateString:_f51,checked:false,_setCheckedAttr:function(_f52){
_f4f.toggle(this.domNode,"dijitCheckedMenuItemChecked",_f52);
this.domNode.setAttribute("aria-checked",_f52);
this._set("checked",_f52);
},iconClass:"",onChange:function(){
},_onClick:function(e){
if(!this.disabled){
this.set("checked",!this.checked);
this.onChange(this.checked);
}
this.inherited(arguments);
}});
});
},"dojo/io/iframe":function(){
define("dojo/io/iframe",["../main","require"],function(dojo,_f53){
dojo.getObject("io",true,dojo);
dojo.io.iframe={create:function(_f54,_f55,uri){
if(window[_f54]){
return window[_f54];
}
if(window.frames[_f54]){
return window.frames[_f54];
}
var turi=uri;
if(!turi){
if(dojo.config["useXDomain"]&&!dojo.config["dojoBlankHtmlUrl"]){
console.warn("dojo.io.iframe.create: When using cross-domain Dojo builds,"+" please save dojo/resources/blank.html to your domain and set djConfig.dojoBlankHtmlUrl"+" to the path on your domain to blank.html");
}
turi=(dojo.config["dojoBlankHtmlUrl"]||_f53.toUrl("../resources/blank.html"));
}
var _f56=dojo.place("<iframe id=\""+_f54+"\" name=\""+_f54+"\" src=\""+turi+"\" onload=\""+_f55+"\" style=\"position: absolute; left: 1px; top: 1px; height: 1px; width: 1px; visibility: hidden\">",dojo.body());
window[_f54]=_f56;
return _f56;
},setSrc:function(_f57,src,_f58){
try{
if(!_f58){
if(dojo.isWebKit){
_f57.location=src;
}else{
frames[_f57.name].location=src;
}
}else{
var idoc;
if(dojo.isIE||dojo.isWebKit){
idoc=_f57.contentWindow.document;
}else{
idoc=_f57.contentWindow;
}
if(!idoc){
_f57.location=src;
}else{
idoc.location.replace(src);
}
}
}
catch(e){
console.log("dojo.io.iframe.setSrc: ",e);
}
},doc:function(_f59){
return _f59.contentDocument||(((_f59.name)&&(_f59.document)&&(dojo.doc.getElementsByTagName("iframe")[_f59.name].contentWindow)&&(dojo.doc.getElementsByTagName("iframe")[_f59.name].contentWindow.document)))||((_f59.name)&&(dojo.doc.frames[_f59.name])&&(dojo.doc.frames[_f59.name].document))||null;
},send:function(args){
if(!this["_frame"]){
this._frame=this.create(this._iframeName,dojo._scopeName+".io.iframe._iframeOnload();");
}
var dfd=dojo._ioSetArgs(args,function(dfd){
dfd.canceled=true;
dfd.ioArgs._callNext();
},function(dfd){
var _f5a=null;
try{
var _f5b=dfd.ioArgs;
var dii=dojo.io.iframe;
var ifd=dii.doc(dii._frame);
var _f5c=_f5b.handleAs;
_f5a=ifd;
if(_f5c!="html"){
if(_f5c=="xml"){
if(dojo.isIE<9||(dojo.isIE&&dojo.isQuirks)){
dojo.query("a",dii._frame.contentWindow.document.documentElement).orphan();
var _f5d=(dii._frame.contentWindow.document).documentElement.innerText;
_f5d=_f5d.replace(/>\s+</g,"><");
_f5d=dojo.trim(_f5d);
var _f5e={responseText:_f5d};
_f5a=dojo._contentHandlers["xml"](_f5e);
}
}else{
_f5a=ifd.getElementsByTagName("textarea")[0].value;
if(_f5c=="json"){
_f5a=dojo.fromJson(_f5a);
}else{
if(_f5c=="javascript"){
_f5a=dojo.eval(_f5a);
}
}
}
}
}
catch(e){
_f5a=e;
}
finally{
_f5b._callNext();
}
return _f5a;
},function(_f5f,dfd){
dfd.ioArgs._hasError=true;
dfd.ioArgs._callNext();
return _f5f;
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
var _f60=dfd.ioArgs;
var args=_f60.args;
_f60._contentToClean=[];
var fn=dojo.byId(args["form"]);
var _f61=args["content"]||{};
if(fn){
if(_f61){
var _f62=function(name,_f63){
dojo.create("input",{type:"hidden",name:name,value:_f63},fn);
_f60._contentToClean.push(name);
};
for(var x in _f61){
var val=_f61[x];
if(dojo.isArray(val)&&val.length>1){
var i;
for(i=0;i<val.length;i++){
_f62(x,val[i]);
}
}else{
if(!fn[x]){
_f62(x,val);
}else{
fn[x].value=val;
}
}
}
}
var _f64=fn.getAttributeNode("action");
var _f65=fn.getAttributeNode("method");
var _f66=fn.getAttributeNode("target");
if(args["url"]){
_f60._originalAction=_f64?_f64.value:null;
if(_f64){
_f64.value=args.url;
}else{
fn.setAttribute("action",args.url);
}
}
if(!_f65||!_f65.value){
if(_f65){
_f65.value=(args["method"])?args["method"]:"post";
}else{
fn.setAttribute("method",(args["method"])?args["method"]:"post");
}
}
_f60._originalTarget=_f66?_f66.value:null;
if(_f66){
_f66.value=this._iframeName;
}else{
fn.setAttribute("target",this._iframeName);
}
fn.target=this._iframeName;
dojo._ioNotifyStart(dfd);
fn.submit();
}else{
var _f67=args.url+(args.url.indexOf("?")>-1?"&":"?")+_f60.query;
dojo._ioNotifyStart(dfd);
this.setSrc(this._frame,_f67,true);
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
var _f68=dfd.ioArgs;
var args=_f68.args;
var _f69=dojo.byId(args.form);
if(_f69){
var _f6a=_f68._contentToClean;
for(var i=0;i<_f6a.length;i++){
var key=_f6a[i];
for(var j=0;j<_f69.childNodes.length;j++){
var _f6b=_f69.childNodes[j];
if(_f6b.name==key){
dojo.destroy(_f6b);
break;
}
}
}
if(_f68["_originalAction"]){
_f69.setAttribute("action",_f68._originalAction);
}
if(_f68["_originalTarget"]){
_f69.setAttribute("target",_f68._originalTarget);
_f69.target=_f68._originalTarget;
}
}
_f68._finished=true;
}};
return dojo.io.iframe;
});
},"curam/lnf":function(){
define("curam/lnf",["curam/define"],function(){
curam.define.singleton("curam.lnf",{setCTParent:function(id){
var _f6c=dojo.byId(id);
var _f6d=_f6c.parentNode;
if(_f6d.tagName=="TD"){
dojo.addClass(_f6d,"codetable");
}
}});
return curam.lnf;
});
},"curam/widget/MenuItem":function(){
require({cache:{"url:curam/widget/resources/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:${onClickValue}\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n"}});
define("curam/widget/MenuItem",["dijit/MenuItem","dojo/text!curam/widget/resources/MenuItem.html"],function(_f6e,_f6f){
var _f70=dojo.declare("curam.widget.MenuItem",_f6e,{templateString:_f6f,onClickValue:"",_onClickAll:function(evt){
this.getParent().onItemClick(this,evt);
var _f71=curam.tab.getTabContainer();
var _f72=_f71.getChildren();
for(var i=0;i<_f72.length;i++){
if(_f72[i].closable){
_f71.closeChild(_f72[i]);
}
}
}});
return _f70;
});
},"curam/tab":function(){
define("curam/tab",["curam/define","curam/util","curam/util/ScreenContext"],function(){
curam.define.singleton("curam.tab",{SECTION_TAB_CONTAINER_ID:"app-sections-container-dc",SMART_PANEL_IFRAME_ID:"curam_tab_SmartPanelIframe",toBeExecutedOnTabClose:[],_mockSelectedTab:null,getSelectedTab:function(_f73){
if(curam.tab._mockSelectedTab){
return curam.tab._mockSelectedTab;
}
if(curam.tab.getTabContainer(_f73)){
return curam.tab.getTabContainer(_f73).selectedChildWidget;
}
},getTabContainer:function(_f74){
return curam.tab.getTabContainerFromSectionID(_f74||curam.tab.getCurrentSectionId());
},getCurrentSectionId:function(_f75){
var _f76=curam.util.getTopmostWindow().dijit.byId(curam.tab.SECTION_TAB_CONTAINER_ID);
if(_f76){
var _f77=_f76.selectedChildWidget.domNode.id;
return _f77.substring(0,_f77.length-4);
}else{
if(!_f75){
throw new Error("curam.tab.getCurrentSectionId() - application section"+" tab container not found");
}
}
return null;
},inTabbedUI:function(){
return curam.tab.getCurrentSectionId(true)!=null;
},getTabContainerFromSectionID:function(_f78){
var _f79=dijit.byId(_f78+"-stc");
if(!_f79&&window.parent&&window.parent!=window){
_f79=curam.util.getTopmostWindow().dijit.byId(_f78+"-stc");
}
return _f79;
},getTabWidgetId:function(tab){
return tab.id;
},getSelectedTabWidgetId:function(){
return curam.tab.getTabWidgetId(curam.tab.getSelectedTab());
},getContainerTab:function(node){
var _f7a=dijit.getEnclosingWidget(node);
if(_f7a&&!_f7a.tabDescriptor){
_f7a=curam.tab.getContainerTab(_f7a.domNode.parentNode);
}
if(!_f7a||!_f7a.tabDescriptor){
throw "Containing tab widget could not be found for node: "+node;
}
return _f7a;
},getContentPanelIframe:function(tab){
var _f7b=tab?tab:curam.tab.getSelectedTab(),_f7c=null;
if(_f7b){
_f7c=dojo.query("iframe",_f7b.domNode).filter(function(item){
return dojo.attr(item,"iscpiframe")=="true";
})[0];
}
return _f7c?_f7c:null;
},refreshMainContentPanel:function(tab){
var _f7d=curam.tab.getContentPanelIframe(tab);
_f7d.contentWindow.curam.util.publishRefreshEvent();
_f7d.contentWindow.location.reload(true);
},getSmartPanelIframe:function(tab){
var _f7e=tab?tab:curam.tab.getSelectedTab();
var _f7f=dojo.query("iframe",_f7e.domNode).filter(function(item){
return item.id==curam.tab.SMART_PANEL_IFRAME_ID;
})[0];
return _f7f;
},unsubscribeOnTabClose:function(_f80,_f81){
curam.tab.toBeExecutedOnTabClose.push(function(_f82){
if(_f81==_f82){
dojo.unsubscribe(_f80);
return true;
}
return false;
});
},executeOnTabClose:function(func,_f83){
curam.tab.toBeExecutedOnTabClose.push(function(_f84){
if(_f83==_f84){
func();
return true;
}
return false;
});
},doExecuteOnTabClose:function(_f85){
var _f86=new Array();
for(var i=0;i<curam.tab.toBeExecutedOnTabClose.length;i++){
var func=curam.tab.toBeExecutedOnTabClose[i];
if(!func(_f85)){
_f86.push(func);
}
}
curam.tab.toBeExecutedOnTabClose=_f86;
},getHandlerForTab:function(_f87,_f88){
return function(_f89,_f8a){
if(_f8a==_f88){
_f87(_f89,_f88);
}else{
}
};
},getTabController:function(){
return curam.util.getTopmostWindow().curam.ui.UIController;
},initTabLinks:function(_f8b){
if(typeof (window.pageContainsClassicIEG)!="undefined"&&window.pageContainsClassicIEG==true){
return;
}
dojo.query("a").forEach(function(link){
if(link.href.indexOf("#")!=0&&link.href.indexOf("javascript:")!=0&&(link.href.indexOf("Page.do")>-1||link.href.indexOf("Frame.do")>-1)){
if(link.href.indexOf("&o3ctx")<0&&link.href.indexOf("?o3ctx")<0){
var _f8c=(link.href.indexOf("?")>-1)?"&":"?";
link.href+=_f8c+jsScreenContext.toRequestString();
}
}
});
elements=document.forms;
for(var i=0;i<elements.length;++i){
elem=elements[i];
var _f8d=dojo.byId("o3ctx");
if(!_f8d){
var ctx=new curam.util.ScreenContext();
ctx.setContextBits("ACTION");
dojo.create("input",{"type":"hidden","name":"o3ctx","value":ctx.getValue()},elem);
}
dojo.create("input",{"type":"hidden","name":"o3prv","value":jsPageID},elem);
}
if(elements.length>0){
curam.util.getTopmostWindow().dojo.publish("curam.fireNextRequest",[]);
}
},initContent:function(_f8e,_f8f){
var _f90=dojo.byId("content");
dojo.removeClass(_f90,"hidden-panel");
return;
},setupSectionSelectionListener:function(){
dojo.subscribe(curam.tab.SECTION_TAB_CONTAINER_ID+"-selectChild",curam.tab.onSectionSelected);
},onSectionSelected:function(_f91){
if(_f91.curamDefaultPageID){
var _f92;
if(_f91.id.substring(_f91.id.length-4,_f91.id.length)=="-sbc"){
var _f93=_f91.id.substring(0,_f91.id.length-4);
_f92=curam.tab.getTabContainer(_f93);
}else{
_f92=_f91;
}
if(_f92&&_f92.getChildren().length==0){
curam.tab.getTabController().handleUIMPageID(_f91.curamDefaultPageID,true);
}
return true;
}
return false;
},setSectionDefaultPage:function(_f94,_f95){
var _f96=dijit.byId(_f94);
if(_f96){
_f96.curamDefaultPageID=_f95;
}else{
throw "curam.tab.setSectionDefaultPage() - cannot find section dijit ID:"+_f94;
}
},publishSmartPanelContentReady:function(){
var _f97="smartpanel.content.loaded";
var _f98=window.frameElement;
_f98.setAttribute("_SPContentLoaded","true");
curam.util.getTopmostWindow().dojo.publish(_f97,[_f98]);
}});
return curam.tab;
});
},"curam/util/FrequencyEditor":function(){
define("curam/util/FrequencyEditor",["curam/util","curam/define","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _f99=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.FrequencyEditor",{CORRECTOR:1,DAILY_FREQUENCY:0,WEEKLY_FREQUENCY:1,MONTHLY_FREQUENCY:2,YEARLY_FREQUENCY:3,BIMONTHLY_FREQUENCY:4,EVERY_DAY_MASK:201,EVERY_WEEKDAY_MASK:202,EVERY_WEEKENDDAY_MASK:203,MON_MASK:1,TUE_MASK:2,WED_MASK:4,THU_MASK:8,FRI_MASK:16,SAT_MASK:32,SUN_MASK:64,daysInMonth:[31,28,31,30,31,30,31,31,30,31,30,31],EVERY_DAY:0,EVERY_WEEKDAY:1,MON:0,TUE:1,WED:2,THU:3,FRI:4,SAT:5,SUN:6,START_DATE:0,MONTH_DAY_NUM:1,MONTH_SEL_DAY:2,DAY_NUM:0,SEL_DAY:1,SEL_MONTH_DAY_NUM:0,SEL_MONTH_SEL_DAY:1,allowableCharsForNumeric:["1","2","3","4","5","6","7","8","9","0",dojo.keys.LEFT_ARROW,dojo.keys.RIGHT_ARROW,dojo.keys.DELETE,dojo.keys.ENTER,dojo.keys.BACKSPACE,dojo.keys.END,dojo.keys.HOME,dojo.keys.TAB,dojo.keys.F5],allowableDayString:["32","33","34","35","36"],allowableDayOfWeekMask:["201","202","203","1","2","4","8","16","32","64"],allowableFirstDayStringForBimonthly:["32","33","34","35"],allowableSecondDayStringForBimonthly:["33","34","35","36"],allowableWeekdayStringForBimonthly:["1","2","4","8","16","32","64"],allowableMonthString:["1","2","3","4","5","6","7","8","9","10","11","12"],initPage:function(){
var _f9a=curam.dialog.getParentWindow(window);
if(formActivated==true){
executeOpenerMapping("freq_text",translatedPatternString);
executeOpenerMapping("freq_data",patternString);
curam.dialog.closeModalDialog();
return false;
}
var freq=_f9a.getPopupInput("initFreq");
curam.debug.log(_f99.getProperty("curam.util.FrequencyEditor.input"),freq);
if(!freq||freq==null||freq.length==0){
document.theForm.freqType[0].checked=true;
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_DAY].checked=true;
return true;
}
var _f9b=parseInt(freq.charAt(0),10);
if(_f9b==curam.util.FrequencyEditor.DAILY_FREQUENCY){
curam.util.FrequencyEditor.setupDailyFrequency(freq);
}else{
if(_f9b==curam.util.FrequencyEditor.WEEKLY_FREQUENCY){
curam.util.FrequencyEditor.setupWeeklyFrequency(freq);
}else{
if(_f9b==curam.util.FrequencyEditor.MONTHLY_FREQUENCY){
curam.util.FrequencyEditor.setupMonthlyFrequency(freq);
}else{
if(_f9b==curam.util.FrequencyEditor.YEARLY_FREQUENCY){
curam.util.FrequencyEditor.setupYearlyFrequency(freq);
}else{
if(_f9b==curam.util.FrequencyEditor.BIMONTHLY_FREQUENCY){
curam.util.FrequencyEditor.setupBimonthlyFrequency(freq);
}else{
alert(errorMsgs.freqPattern);
}
}
}
}
}
return true;
},setupDailyFrequency:function(_f9c){
var _f9d=_f9c.substr(4,3);
document.theForm.freqType[curam.util.FrequencyEditor.DAILY_FREQUENCY].checked=true;
if(parseInt(_f9d,10)==curam.util.FrequencyEditor.EVERY_WEEKDAY_MASK){
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_WEEKDAY].checked=true;
}else{
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_DAY].checked=true;
var _f9e=parseInt(_f9c.substr(1,3),10);
document.theForm.daily_num.value=""+_f9e;
}
},setupWeeklyFrequency:function(_f9f){
var _fa0=parseInt(_f9f.substr(4,3),10);
document.theForm.freqType[curam.util.FrequencyEditor.WEEKLY_FREQUENCY].checked=true;
if(_fa0&curam.util.FrequencyEditor.MON_MASK){
document.theForm.weekly_select_mon.checked=true;
}
if(_fa0&curam.util.FrequencyEditor.TUE_MASK){
document.theForm.weekly_select_tue.checked=true;
}
if(_fa0&curam.util.FrequencyEditor.WED_MASK){
document.theForm.weekly_select_wed.checked=true;
}
if(_fa0&curam.util.FrequencyEditor.THU_MASK){
document.theForm.weekly_select_thur.checked=true;
}
if(_fa0&curam.util.FrequencyEditor.FRI_MASK){
document.theForm.weekly_select_fri.checked=true;
}
if(_fa0&curam.util.FrequencyEditor.SAT_MASK){
document.theForm.weekly_select_sat.checked=true;
}
if(_fa0&curam.util.FrequencyEditor.SUN_MASK){
document.theForm.weekly_select_sun.checked=true;
}
var _fa1=parseInt(_f9f.substr(1,3),10);
document.theForm.weekly_num.value=""+_fa1;
},setupMonthlyFrequency:function(_fa2){
var _fa3=parseInt(_fa2.substr(1,3),10);
var _fa4=parseInt(_fa2.substr(4,3),10);
var _fa5=parseInt(_fa2.substr(7,2),10);
document.theForm.freqType[curam.util.FrequencyEditor.MONTHLY_FREQUENCY].checked=true;
if(_fa5==0){
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.START_DATE].checked=true;
document.theForm.monthly0_month_interval.value=_fa3;
}else{
if(_fa5<=31){
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.MONTH_DAY_NUM].checked=true;
document.theForm.monthly1_day_num.value=_fa5;
document.theForm.monthly1_month_interval.value=_fa3;
}else{
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.MONTH_SEL_DAY].checked=true;
var _fa6=dijit.byId("monthly2_select_day_num");
_fa6.set("value",_fa5);
_fa6=dijit.byId("monthly2_select_day");
_fa6.set("value",_fa4);
document.theForm.monthly2_month_interval.value=_fa3;
}
}
},setupBimonthlyFrequency:function(_fa7){
var _fa8=parseInt(_fa7.substr(1,2),10);
var _fa9=parseInt(_fa7.substr(4,3),10);
var _faa=parseInt(_fa7.substr(7,2),10);
document.theForm.freqType[curam.util.FrequencyEditor.BIMONTHLY_FREQUENCY-curam.util.FrequencyEditor.CORRECTOR].checked=true;
if(_faa<=31){
document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked=true;
document.theForm.bimonthly1_day1_num.value=_faa;
document.theForm.bimonthly1_day2_num.value=_fa8;
}else{
document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.SEL_DAY].checked=true;
var _fab=dijit.byId("bimonthly2_select_day1_num");
_fab.set("value",_faa);
_fab=dijit.byId("bimonthly2_select_day2_num");
_fab.set("value",_fa8);
_fab=dijit.byId("bimonthly2_select_weekday");
_fab.set("value",_fa9);
}
},setupYearlyFrequency:function(_fac){
var _fad=parseInt(_fac.substr(1,3),10);
var _fae=parseInt(_fac.substr(4,3),10);
var _faf=parseInt(_fac.substr(7,2),10);
document.theForm.freqType[curam.util.FrequencyEditor.YEARLY_FREQUENCY+curam.util.FrequencyEditor.CORRECTOR].checked=true;
if(_faf<=31){
document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_DAY_NUM].checked=true;
var _fb0=dijit.byId("yearly1_select_month");
_fb0.set("value",_fad);
document.theForm.yearly1_day_num.value=_faf;
}else{
document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_SEL_DAY].checked=true;
var _fb0=dijit.byId("yearly2_select_day_num");
_fb0.set("value",_faf);
_fb0=dijit.byId("yearly2_select_day");
_fb0.set("value",_fae);
_fb0=dijit.byId("yearly2_select_month");
_fb0.set("value",_fad);
}
},createPatternString:function(){
var _fb1=null;
var _fb2=false;
if(document.theForm.freqType[0].checked==true){
_fb2=curam.util.FrequencyEditor.createDailyPatternString();
}else{
if(document.theForm.freqType[1].checked==true){
_fb2=curam.util.FrequencyEditor.createWeeklyPatternString();
}else{
if(document.theForm.freqType[2].checked==true){
_fb2=curam.util.FrequencyEditor.createMonthlyPatternString();
}else{
if(document.theForm.freqType[3].checked==true){
_fb2=curam.util.FrequencyEditor.createBimonthlyPatternString();
}else{
_fb2=curam.util.FrequencyEditor.createYearlyPatternString();
}
}
}
}
if(_fb2){
curam.util.FrequencyEditor.disableRowBorder();
return true;
}else{
return false;
}
},createDailyPatternString:function(){
var _fb3="0";
if(document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_DAY].checked==true){
var _fb4=parseInt(document.theForm.daily_num.value,10);
if(curam.util.FrequencyEditor.validateDailyPattern(_fb4)){
_fb3+=curam.util.FrequencyEditor.doZeroPadding(_fb4,3);
_fb3+="000";
}else{
return false;
}
}else{
_fb3+="001";
_fb3+=curam.util.FrequencyEditor.EVERY_WEEKDAY_MASK;
}
_fb3+="00";
document.theForm.patternString.value=_fb3;
return true;
},validateDailyPattern:function(_fb5){
if(isNaN(_fb5)||_fb5<1){
alert(errorMsgs.everyDay);
return false;
}
return true;
},createWeeklyPatternString:function(){
var _fb6="1";
var _fb7=0;
var _fb8=parseInt(document.theForm.weekly_num.value,10);
if(curam.util.FrequencyEditor.validateWeeklyPattern(_fb8)){
_fb6+=curam.util.FrequencyEditor.doZeroPadding(_fb8,3);
var _fb9=false;
var _fba=document.theForm.weekly_select_mon;
if(_fba.checked==true){
_fb9=true;
_fb7+=_fba.value-0;
}
_fba=document.theForm.weekly_select_tue;
if(_fba.checked==true){
_fb9=true;
_fb7+=_fba.value-0;
}
_fba=document.theForm.weekly_select_wed;
if(_fba.checked==true){
_fb9=true;
_fb7+=_fba.value-0;
}
_fba=document.theForm.weekly_select_thur;
if(_fba.checked==true){
_fb9=true;
_fb7+=_fba.value-0;
}
_fba=document.theForm.weekly_select_fri;
if(_fba.checked==true){
_fb9=true;
_fb7+=_fba.value-0;
}
_fba=document.theForm.weekly_select_sat;
if(_fba.checked==true){
_fb9=true;
_fb7+=_fba.value-0;
}
_fba=document.theForm.weekly_select_sun;
if(_fba.checked==true){
_fb9=true;
_fb7+=_fba.value-0;
}
if(!_fb9){
alert(errorMsgs.noDaySelected);
return false;
}
if(_fb7>0){
_fb6+=curam.util.FrequencyEditor.doZeroPadding(_fb7,3);
}else{
_fb6+="000";
}
_fb6+="00";
document.theForm.patternString.value=_fb6;
return true;
}
return false;
},validateWeeklyPattern:function(_fbb){
if(isNaN(_fbb)||_fbb<1){
alert(errorMsgs.everyWeek);
return false;
}
return true;
},createMonthlyPatternString:function(){
var _fbc="2";
if(document.theForm.monthlyFreqType[curam.util.FrequencyEditor.START_DATE].checked==true){
var _fbd=parseInt(document.theForm.monthly0_month_interval.value,10);
if(!curam.util.FrequencyEditor.validateMonthlyData(_fbd)){
return false;
}
var _fbe=0;
_fbc+=curam.util.FrequencyEditor.doZeroPadding(_fbd,3);
_fbc+="000";
_fbc+=curam.util.FrequencyEditor.doZeroPadding(_fbe,2);
}else{
if(document.theForm.monthlyFreqType[curam.util.FrequencyEditor.MONTH_DAY_NUM].checked==true){
var _fbd=parseInt(document.theForm.monthly1_month_interval.value,10);
var _fbe=parseInt(document.theForm.monthly1_day_num.value,10);
if(!curam.util.FrequencyEditor.validateMonthlyData(_fbd,_fbe)){
return false;
}
_fbc+=curam.util.FrequencyEditor.doZeroPadding(_fbd,3);
_fbc+="000";
_fbc+=curam.util.FrequencyEditor.doZeroPadding(_fbe,2);
}else{
var _fbd=parseInt(document.theForm.monthly2_month_interval.value,10);
if(!curam.util.FrequencyEditor.validateMonthlyData(_fbd)){
return false;
}
var day=dijit.byId("monthly2_select_day_num").get("value");
var _fbf=dijit.byId("monthly2_select_day").get("value");
if(!curam.util.FrequencyEditor.validateDayWeekString(day,_fbf,_fbc)){
return false;
}
_fbc+=curam.util.FrequencyEditor.doZeroPadding(_fbd,3);
_fbc+=curam.util.FrequencyEditor.doZeroPadding(_fbf,3);
_fbc+=curam.util.FrequencyEditor.doZeroPadding(day,2);
}
}
document.theForm.patternString.value=_fbc;
return true;
},validateMonthlyData:function(_fc0,_fc1){
if(isNaN(_fc0)||_fc0<1||_fc0>100){
alert(errorMsgs.monthNum);
return false;
}
if(_fc1==null){
return true;
}
if(isNaN(_fc1)||_fc1<1||_fc1>28){
alert(errorMsgs.dayNum);
return false;
}
return true;
},validateDayWeekString:function(day,_fc2,_fc3){
var days=curam.util.FrequencyEditor.allowableDayString;
var _fc4=curam.util.FrequencyEditor.allowableDayOfWeekMask;
var _fc5=false;
var _fc6=false;
for(var i=0;i<days.length;i++){
if(day==days[i]){
_fc5=true;
break;
}
}
for(var i=0;i<_fc4.length;i++){
if(_fc2==_fc4[i]){
_fc6=true;
break;
}
}
if(_fc5&&_fc6){
return true;
}else{
if(!_fc5){
if(_fc3=="2"){
alert(errorMsgs.dayStringForMonthly);
}else{
if(_fc3=="3"){
alert(errorMsgs.dayStringForYearly);
}else{
alert(errorMsgs.dayString);
}
}
return false;
}else{
if(!_fc6){
if(_fc3=="2"){
alert(errorMsgs.dayOfWeekMaskForMonthly);
}else{
if(_fc3=="3"){
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
var _fc7="4";
var _fc8;
if(document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked==true){
var _fc9=parseInt(document.theForm.bimonthly1_day1_num.value,10);
var _fca=parseInt(document.theForm.bimonthly1_day2_num.value,10);
if(!curam.util.FrequencyEditor.validateBimonthlyData(_fc9,_fca,null)){
return false;
}
if(_fc9>_fca){
_fc8=_fc9;
_fc9=_fca;
_fca=_fc8;
}
_fc7+=curam.util.FrequencyEditor.doZeroPadding(_fca,2);
_fc7+="0000";
_fc7+=curam.util.FrequencyEditor.doZeroPadding(_fc9,2);
}else{
var _fcb=dijit.byId("bimonthly2_select_day1_num");
var _fcc=_fcb.get("value");
_fcb=dijit.byId("bimonthly2_select_day2_num");
var _fcd=_fcb.get("value");
_fcb=dijit.byId("bimonthly2_select_weekday");
var _fce=_fcb.get("value");
if(!curam.util.FrequencyEditor.validateBimonthlyDataString(_fcc,_fcd,_fce)){
return false;
}
if(_fcc>_fcd){
_fc8=_fcc;
_fcc=_fcd;
_fcd=_fc8;
}
if(!curam.util.FrequencyEditor.validateBimonthlyData(_fcc,_fcd,_fce)){
return false;
}
_fc7+=curam.util.FrequencyEditor.doZeroPadding(_fcd,2);
_fc7+="0";
_fc7+=curam.util.FrequencyEditor.doZeroPadding(_fce,3);
_fc7+=curam.util.FrequencyEditor.doZeroPadding(_fcc,2);
}
document.theForm.patternString.value=_fc7;
return true;
},validateBimonthlyData:function(_fcf,_fd0,_fd1){
if(_fd1!=null){
if(isNaN(_fd1)||_fd1<1||_fd1>64){
alert(errorMsgs.weekend);
return false;
}
}else{
if(isNaN(_fcf)||_fcf<1||_fcf>28||isNaN(_fd0)||_fd0<1||_fd0>28){
alert(errorMsgs.dayNum);
return false;
}
}
if(_fcf==_fd0){
alert(errorMsgs.dayDiff);
return false;
}
return true;
},validateBimonthlyDataString:function(_fd2,_fd3,_fd4){
var _fd5=curam.util.FrequencyEditor.allowableFirstDayStringForBimonthly;
var _fd6=curam.util.FrequencyEditor.allowableSecondDayStringForBimonthly;
var _fd7=curam.util.FrequencyEditor.allowableWeekdayStringForBimonthly;
var _fd8=false;
var _fd9=false;
var _fda=false;
for(var i=0;i<_fd5.length;i++){
if(_fd2==_fd5[i]){
_fd8=true;
break;
}
}
for(var i=0;i<_fd6.length;i++){
if(_fd3==_fd6[i]){
_fd9=true;
break;
}
}
for(var i=0;i<_fd7.length;i++){
if(_fd4==_fd7[i]){
_fda=true;
break;
}
}
if(_fd8&&_fd9&&_fda){
return true;
}else{
if(!_fd8){
alert(errorMsgs.firstDayString);
return false;
}else{
if(!_fd9){
alert(errorMsgs.secondDayString);
return false;
}else{
if(!_fda){
alert(errorMsgs.weekend);
return false;
}
}
}
}
},createYearlyPatternString:function(){
var _fdb="3";
var _fdc=null;
if(document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_DAY_NUM].checked==true){
_fdc=dijit.byId("yearly1_select_month");
var _fdd=_fdc.get("value");
_fdb+=curam.util.FrequencyEditor.doZeroPadding(_fdd,3);
_fdb+="000";
if(!curam.util.FrequencyEditor.validateMonthString(_fdd)){
return false;
}
var _fde=parseInt(document.theForm.yearly1_day_num.value,10);
if(!curam.util.FrequencyEditor.validateYearlyData(_fde,_fdd)){
return false;
}
_fdb+=curam.util.FrequencyEditor.doZeroPadding(_fde,2);
}else{
var day=dijit.byId("yearly2_select_day_num").get("value");
var _fdf=dijit.byId("yearly2_select_day").get("value");
var _fe0=dijit.byId("yearly2_select_month").get("value");
if(!curam.util.FrequencyEditor.validateDayWeekString(day,_fdf,_fdb)){
return false;
}
if(!curam.util.FrequencyEditor.validateMonthString(_fe0)){
return false;
}
_fdb+=curam.util.FrequencyEditor.doZeroPadding(_fe0,3);
_fdb+=curam.util.FrequencyEditor.doZeroPadding(_fdf,3);
_fdb+=curam.util.FrequencyEditor.doZeroPadding(day,2);
}
document.theForm.patternString.value=_fdb;
return true;
},validateYearlyData:function(_fe1,_fe2){
if(isNaN(_fe1)||_fe1<1||_fe1>curam.util.FrequencyEditor.daysInMonth[_fe2-1]){
alert(errorMsgs.dayNumAnd+"  "+curam.util.FrequencyEditor.daysInMonth[_fe2-1]);
return false;
}
return true;
},validateMonthString:function(_fe3){
var _fe4=curam.util.FrequencyEditor.allowableMonthString;
for(var i=0;i<_fe4.length;i++){
if(_fe3==_fe4[i]){
return true;
}
}
alert(errorMsgs.monthString);
return false;
},doZeroPadding:function(_fe5,_fe6){
var _fe7=""+_fe5;
var _fe8=_fe6-_fe7.length;
for(var i=0;i<_fe8;i++){
_fe7="0"+_fe7;
}
return _fe7;
},_setFirstLevelRadioButton:function(_fe9){
var _fea=dojo.query("input[name='freqType']",dojo.byId("mainForm"))[_fe9];
if(_fea==null){
throw new Error("The radio button for the selected"+" frequency type could not be found!");
}
if(!_fea.checked){
dojo.query("input[type='radio']:checked",dojo.byId("mainForm")).forEach(function(_feb){
_feb.checked=false;
});
if(_fe9!=curam.util.FrequencyEditor.WEEKLY_FREQUENCY){
dojo.query("input[type='checkbox']:checked",dojo.byId("mainForm")).forEach(function(_fec){
_fec.checked=false;
});
}
_fea.checked=true;
}
},_setSecondLevelRadioButton:function(_fed){
if(_fed==undefined){
return "undefined";
}
var _fee;
if(_fed.domNode){
_fee=_fed.domNode;
}else{
_fee=_fed;
}
if(_fee.tagName.toLowerCase()=="input"&&dojo.attr(_fee,"type")=="radio"){
_fee.checked=true;
return "radio node clicked";
}
var _fef=cm.getParentByType(_fee,"TD");
if(_fef==null){
throw new Error("Exception: The row contains the node should be found");
}
var _ff0=dojo.query("input[type = 'radio']",_fef)[0];
if(_ff0==null){
throw new Error("Exception: The radio node should exist");
}else{
_ff0.checked=true;
return "text input or codetable clicked";
}
},setSelectedFreqType:function(_ff1,_ff2){
curam.debug.log("curam.util.FrequencyEditor: "+_f99.getProperty("curam.util.FrequencyEditor.radio"));
curam.util.FrequencyEditor._setFirstLevelRadioButton(_ff1);
curam.util.FrequencyEditor._setSecondLevelRadioButton(_ff2);
},setDefaultOption:function(_ff3){
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_DAY].checked=false;
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_WEEKDAY].checked=false;
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked=false;
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.SEL_DAY].checked=false;
document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked=false;
document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.SEL_DAY].checked=false;
document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_DAY_NUM].checked=false;
document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_SEL_DAY].checked=false;
if(_ff3!=curam.util.FrequencyEditor.WEEKLY_FREQUENCY){
document.theForm.weekly_select_mon.checked=false;
document.theForm.weekly_select_tue.checked=false;
document.theForm.weekly_select_wed.checked=false;
document.theForm.weekly_select_thur.checked=false;
document.theForm.weekly_select_fri.checked=false;
document.theForm.weekly_select_sat.checked=false;
document.theForm.weekly_select_sun.checked=false;
}
if(_ff3==curam.util.FrequencyEditor.DAILY_FREQUENCY){
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_DAY].checked=true;
}else{
if(_ff3==curam.util.FrequencyEditor.WEEKLY_FREQUENCY){
document.theForm.weekly_select_mon.checked=true;
}else{
if(_ff3==curam.util.FrequencyEditor.MONTHLY_FREQUENCY){
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked=true;
}else{
if(_ff3==curam.util.FrequencyEditor.BIMONTHLY_FREQUENCY){
document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked=true;
}else{
if(_ff3==curam.util.FrequencyEditor.YEARLY_FREQUENCY){
document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_DAY_NUM].checked=true;
}
}
}
}
}
},_doPosNumbericInputChecker:function(_ff4){
if(_ff4==""){
return false;
}
var _ff5=curam.util.FrequencyEditor.allowableCharsForNumeric;
for(var i=0;i<_ff5.length;i++){
if(_ff4==_ff5[i]){
return true;
}
}
return false;
},posNumericInputChecker:function(_ff6){
_ff6=dojo.fixEvent(_ff6);
var _ff7=_ff6.keyChar;
var _ff8=curam.util.FrequencyEditor._doPosNumbericInputChecker(_ff7);
if(!_ff8){
dojo.stopEvent(_ff6);
}
},prePopulateTextFields:function(_ff9){
return function(e){
for(var i=0;i<_ff9.length;i++){
if(!_ff9[i].value||_ff9[i].value==""){
_ff9[i].value=1;
}
}
};
},disableRowBorder:function(){
dojo.query("form[name='theForm'] table tr").forEach(function(node){
dojo.addClass(node,"row-no-border");
});
},addInputListener:function(){
dojo.ready(function(){
var _ffa=[];
dojo.query("input[type='text']:not(input.dijitReset)").forEach(function(_ffb){
_ffa.push(_ffb);
curam.util.connect(_ffb,"onkeypress",curam.util.FrequencyEditor.posNumericInputChecker);
});
curam.util.connect(dojo.byId("mainForm"),"onsubmit",function(_ffc){
curam.util.FrequencyEditor.prePopulateTextFields(_ffa);
});
});
},replacePlaceholderWithDomNode:function(){
dojo.query("body#Curam_frequency-editor table tr td.frequency").forEach(function(_ffd){
curam.util.FrequencyEditor._parse(_ffd);
});
},_parse:function(node){
var _ffe=dojo.query("> .node-needs-replacement",node);
var _fff=dojo.query("> span",node)[0];
if(_fff==null||_fff==undefined){
throw new Error("Exception: Some text string is missing for some certain "+"frequency type, please check the 'frequency-editor.jsp' file.");
}
var _1000=_fff.innerHTML;
var _1001=/%[^%]*%/g;
var _1002=_1000.match(_1001);
if(_ffe.length==0&&_1002==null){
return "No need to parse";
}else{
if(_ffe.length==0&&_1002!=null){
throw new Error("The text string '"+_1000+"' from the 'FrequencyPatternSelector.properties'"+" should not have any placeholder.");
}else{
if(_ffe.length!=0&&_1002==null){
throw new Error("The text string '"+_1000+"' from the 'FrequencyPatternSelector.properties'"+" should have some placeholders.");
}
}
}
if(dojo.hasClass(node,"weekly-frequency")){
if(_1002.length!=2){
throw new Error("The text string '"+_1000+"' from the 'FrequencyPatternSelector.properties' "+"has the incorrect number of placeholders.");
}
var _1003=dojo.clone(_ffe[0]);
_ffe.forEach(dojo.destroy);
dojo.removeClass(_1003,"node-needs-replacement");
var _1004=_1003.className.match(_1001);
var _1005;
for(var i=0;i<_1002.length;i++){
if(_1002[i]!=_1004){
_1005=_1002[i];
break;
}
}
var _1006=_1000.split(_1005);
var _1007=_1006[0];
var _1008=_1006[1];
var _1009;
if(_1007.indexOf(_1004)!=-1){
_1009=true;
_1007=_1007.replace(_1004,"<span class='"+_1004+"'>placeholder</span>");
}else{
_1009=false;
_1008=_1008.replace(_1004,"<span class='"+_1004+"'>placeholder</span>");
}
if(_1008==""){
_fff.innerHTML=_1007;
dojo.place(_1003,dojo.query("span."+_1004,_fff)[0],"replace");
}else{
_fff.innerHTML=_1007;
var _100a=node.parentNode.nextSibling.nextSibling;
var _100b=dojo.create("tr",{"class":"blue"});
var _100c=dojo.create("td",{"class":"bottom"},_100b);
_100c.colSpan="4";
dojo.style(_100c,"paddingLeft","20px");
var _100d=dojo.create("span",{innerHTML:_1008},_100c);
dojo.place(_100b,_100a,"after");
if(_1009){
dojo.place(_1003,dojo.query("span."+_1004,_fff)[0],"replace");
}else{
dojo.place(_1003,dojo.query("span."+_1004,_100d)[0],"replace");
}
dojo.query("td.day",_100a).forEach(function(_100e){
dojo.removeClass(_100e,"bottom");
});
if(_1007==""){
dojo.removeClass(node,"top");
}
dojo.query("th.type",node.parentNode)[0].rowSpan="4";
}
return "Parsed Successfully";
}
if(_ffe.length!=_1002.length){
throw new Error("The text string '"+_1000+"' from the 'FrequencyPatternSelector.properties' "+"has the incorrect number of placeholders.");
}
var _100f=dojo.clone(_ffe);
_ffe.forEach(dojo.destroy);
for(i=0;i<_1002.length;i++){
var _1010=_1002[i];
_1000=_1000.replace(_1010,"<span class='"+_1010+"'>placeholder</span>");
}
_fff.innerHTML=_1000;
_100f.forEach(function(_1011,i){
dojo.removeClass(_1011,"node-needs-replacement");
var _1012=_1011.className.match(_1001);
dojo.place(_1011,dojo.query("span."+_1012,node)[0],"replace");
});
return "Parsed Successfully";
}});
return curam.util.FrequencyEditor;
});
},"dijit/MenuSeparator":function(){
require({cache:{"url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>"}});
define("dijit/MenuSeparator",["dojo/_base/declare","dojo/dom","./_WidgetBase","./_TemplatedMixin","./_Contained","dojo/text!./templates/MenuSeparator.html"],function(_1013,dom,_1014,_1015,_1016,_1017){
return _1013("dijit.MenuSeparator",[_1014,_1015,_1016],{templateString:_1017,buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.domNode,false);
},isFocusable:function(){
return false;
}});
});
},"dijit/form/_ComboBoxMenu":function(){
define("dijit/form/_ComboBoxMenu",["dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/keys","../_WidgetBase","../_TemplatedMixin","./_ComboBoxMenuMixin","./_ListMouseMixin"],function(_1018,_1019,_101a,_101b,keys,_101c,_101d,_101e,_101f){
return _1018("dijit.form._ComboBoxMenu",[_101c,_101d,_101f,_101e],{templateString:"<div class='dijitReset dijitMenu' data-dojo-attach-point='containerNode' style='overflow: auto; overflow-x: hidden;'>"+"<div class='dijitMenuItem dijitMenuPreviousButton' data-dojo-attach-point='previousButton' role='option'></div>"+"<div class='dijitMenuItem dijitMenuNextButton' data-dojo-attach-point='nextButton' role='option'></div>"+"</div>",baseClass:"dijitComboBoxMenu",postCreate:function(){
this.inherited(arguments);
if(!this.isLeftToRight()){
_1019.add(this.previousButton,"dijitMenuItemRtl");
_1019.add(this.nextButton,"dijitMenuItemRtl");
}
},_createMenuItem:function(){
return _101a.create("div",{"class":"dijitReset dijitMenuItem"+(this.isLeftToRight()?"":" dijitMenuItemRtl"),role:"option"});
},onHover:function(node){
_1019.add(node,"dijitMenuItemHover");
},onUnhover:function(node){
_1019.remove(node,"dijitMenuItemHover");
},onSelect:function(node){
_1019.add(node,"dijitMenuItemSelected");
},onDeselect:function(node){
_1019.remove(node,"dijitMenuItemSelected");
},_page:function(up){
var _1020=0;
var _1021=this.domNode.scrollTop;
var _1022=_101b.get(this.domNode,"height");
if(!this.getHighlightedOption()){
this.selectNextNode();
}
while(_1020<_1022){
var _1023=this.getHighlightedOption();
if(up){
if(!_1023.previousSibling||_1023.previousSibling.style.display=="none"){
break;
}
this.selectPreviousNode();
}else{
if(!_1023.nextSibling||_1023.nextSibling.style.display=="none"){
break;
}
this.selectNextNode();
}
var _1024=this.domNode.scrollTop;
_1020+=(_1024-_1021)*(up?-1:1);
_1021=_1024;
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
},"url:curam/widget/resources/DivButton.html":"<div id=\"${id}\" class=\"${className}\" dojoAttachEvent=\"onclick:onClick\" dojoAttachPoint=\"containerNode\"></div>\r\n\r\n {\r\n      templateString: \"<div id='${id}' class='${className}' \"\r\n            + \"dojoAttachEvent='onclick:onClick' dojoAttachPoint='containerNode'></div>\"\r\n    }\r\n\r\n","cm/_base/_dom":function(){
define("cm/_base/_dom",[],function(){
var cm=dojo.global.cm||{};
dojo.global.cm=cm;
dojo.mixin(cm,{nextSibling:function(node,_1025){
return cm._findSibling(node,_1025,true);
},prevSibling:function(node,_1026){
return cm._findSibling(node,_1026,false);
},getInput:function(name,_1027){
if(!dojo.isString(name)){
return name;
}
var _1028=dojo.query("input[name='"+name+"'],select[name='"+name+"']");
return _1027?(_1028.length>0?_1028:null):(_1028.length>0?_1028[0]:null);
},getParentByClass:function(node,_1029){
node=node.parentNode;
while(node){
if(dojo.hasClass(node,_1029)){
return node;
}
node=node.parentNode;
}
return null;
},getParentByType:function(node,type){
node=node.parentNode;
type=type.toLowerCase();
var _102a="html";
while(node){
if(node.tagName.toLowerCase()==_102a){
break;
}
if(node.tagName.toLowerCase()==type){
return node;
}
node=node.parentNode;
}
return null;
},replaceClass:function(node,_102b,_102c){
dojo.removeClass(node,_102c);
dojo.addClass(node,_102b);
},setClass:function(node,_102d){
node=dojo.byId(node);
var cs=new String(_102d);
try{
if(typeof node.className=="string"){
node.className=cs;
}else{
if(node.setAttribute){
node.setAttribute("class",_102d);
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
},_findSibling:function(node,_102e,_102f){
if(!node){
return null;
}
if(_102e){
_102e=_102e.toLowerCase();
}
var param=_102f?"nextSibling":"previousSibling";
do{
node=node[param];
}while(node&&node.nodeType!=1);
if(node&&_102e&&_102e!=node.tagName.toLowerCase()){
return cm[_102f?"nextSibling":"prevSibling"](node,_102e);
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
},endsWith:function(str,end,_1030){
if(_1030){
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
},"curam/tab/TabSessionManager":function(){
define("curam/tab/TabSessionManager",["curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1031=new curam.util.ResourceBundle("Debug");
var _1032=dojo.declare("curam.tab.TabSessionManager",null,{init:function(_1033){
if(_1033){
this._directBrowseURL=_1033;
}
new curam.ui.ClientDataAccessor().getRaw("/data/tab/get",dojo.hitch(this,this._restoreTabSession),dojo.hitch(this,this._handleGetTabFailure));
},_handleGetTabFailure:function(error,_1034){
var _1035=curam.tab.getTabContainer();
var _1036=dojo.toJson(error);
this._log(_1031.getProperty("curam.tab.TabSessionManager.error")+_1036);
var tab=new dojox.layout.ContentPane({title:"Error",closable:true,content:"An error occurred. Try refreshing the browser or contact your "+"administrator if it persists. Error: "+error.message});
_1035.addChild(tab);
},_restoreTabSession:function(_1037,_1038){
var _1039=[];
var _103a=[];
var _103b=[];
curam.tab.getTabController().MAX_NUM_TABS=_1037.maxTabs;
var _103c=this._isNewSession();
var _103d=_103c?null:this._getPrevSelectedTab();
var _103e=this._getHomePageTab();
_103d=_103d?_103d:_103e;
this.tabSelected(_103d);
_103b[_103e.sectionID]=true;
if(_1037&&_1037.tabs&&_1037.tabs.length>0){
var tabs=_1037.tabs;
this._log(_1031.getProperty("curam.tab.TabSessionManager.previous")+tabs.length+" "+_1031.getProperty("curam.tab.TabSessionManager.tabs"));
for(var i=0;i<tabs.length;i++){
var newTD=curam.tab.TabDescriptor.fromJson(tabs[i]);
if(newTD.tabSignature==_103e.tabSignature){
if(!_103c){
if(this._directBrowseURL){
_103d=newTD;
}else{
_103e=newTD;
}
}
}else{
if(newTD.sectionID==_103d.sectionID){
_1039.push(newTD);
}else{
_103a.push(newTD);
}
}
_103b[newTD.sectionID]=true;
}
if(_103e.sectionID==_103d.sectionID){
_1039.unshift(_103e);
}else{
_103a.unshift(_103e);
}
}else{
this._log(_1031.getProperty("curam.tab.TabSessionManager.no.session"));
_1039.push(_103e);
}
this._restoreSectionTabs(_1039,_103d);
this._restoreSectionTabs(_103a,null);
this._selectedTD=_103d;
this._connectSelectionListeners(_103b);
if(this._directBrowseURL){
var _103f=this._createDirectBrowseClosure();
var _1040=curam.util.getTopmostWindow();
var _1041=_1040.dojo.subscribe("/curam/main-content/page/loaded",null,function(_1042,_1043){
var that=_103f.getThis();
var _1044=that._directBrowseURL;
var _1045=that._selectedTD.tabContent.pageID;
if(_1042===_1045){
require(["curam/util/Navigation"],function(nav){
nav.goToUrl(_1044);
});
that._selectedTD.tabContent.pageID=_1044.replace(/Page.do\??.*/,"");
that.tabSelected(that._selectedTD);
dojo.unsubscribe(_1041);
}
});
}
},_createDirectBrowseClosure:function(){
var that=this;
return {getThis:function(){
return that;
}};
},_restoreSectionTabs:function(_1046,_1047){
this._log(_1031.getProperty("curam.tab.TabSessionManager.saved.tabs"));
for(var i=0;i<_1046.length;i++){
var _1048=_1046[i];
this._log(_1031.getProperty("curam.tab.TabSessionManager.saved.tab"),_1048,i);
dojo.publish(curam.tab.getTabController().TAB_TOPIC,[new curam.ui.OpenTabEvent(_1048,null,this._isOpenInBackground(_1048,_1047,i))]);
}
},_connectSelectionListeners:function(_1049){
var _104a=false;
for(var _104b in _1049){
if(curam.tab.getTabContainer(_104b)){
dojo.subscribe(curam.tab.getTabContainer(_104b).id+"-selectChild",dojo.hitch(this,this.tabContentPaneSelected));
_104a=true;
}
}
dojo.subscribe(curam.tab.SECTION_TAB_CONTAINER_ID+"-selectChild",dojo.hitch(this,this.tabSectionSelected));
return _104a;
},tabUpdated:function(_104c){
this._log(_1031.getProperty("curam.tab.TabSessionManager.saving.tab"),_104c);
new curam.ui.ClientDataAccessor().set("/data/tab/update",_104c.toJson());
},tabClosed:function(_104d){
this._log(_1031.getProperty("curam.tab.TabSessionManager.tab.closed"),_104d);
new curam.ui.ClientDataAccessor().set("/data/tab/close",_104d.toJson());
},tabSelected:function(_104e){
this._log(_1031.getProperty("curam.tab.TabSessionManager.selected.tab"),_104e);
if(_104e.tabSignature){
curam.util.runStorageFn(function(){
var _104f=curam.util.getTopmostWindow().dojox;
_104f.storage.put(curam.tab.TabSessionManager.SELECTED_TAB_KEY,_104e.toJson());
});
this._log(_1031.getProperty("curam.tab.TabSessionManager.recorded"),_104e);
}else{
this._log(_1031.getProperty("curam.tab.TabSessionManager.not.recorded"),_104e);
}
},tabContentPaneSelected:function(_1050){
if(_1050.tabDescriptor){
this.tabSelected(_1050.tabDescriptor);
}else{
this._log(_1031.getProperty("curam.tab.TabSessionManager.no.descriptor"));
}
},tabSectionSelected:function(_1051){
var _1052=false;
if(_1051){
var id=_1051.id;
this._log(_1031.getProperty("curam.tab.TabSessionManager.new.section")+" '"+id+"'.");
var _1053=id.substring(0,id.length-4);
var _1054=curam.tab.getSelectedTab(_1053);
if(_1054){
this._log(_1031.getProperty("curam.tab.TabSessionManager.changing.selection"));
this.tabContentPaneSelected(_1054);
_1052=true;
}else{
this._log(_1031.getProperty("curam.tab.TabSessionManager.not.changing.selection"));
}
}else{
this._log(_1031.getProperty("curam.tab.TabSessionManager.no.container"));
}
return _1052;
},_isNewSession:function(){
var _1055=this._getJSessionID();
if(!_1055){
return true;
}
var _1056=curam.util.getTopmostWindow().dojox;
var _1057=_1056.encoding.digests.SHA1(_1055);
var _1058;
var _1056=curam.util.getTopmostWindow().dojox;
curam.util.runStorageFn(function(){
_1058=_1056.storage.get(curam.tab.TabSessionManager.SELECTED_TAB_SESSION_KEY);
});
this._log(_1031.getProperty("curam.tab.TabSessionManager.session.id")+" '"+_1057+"'. "+_1031.getProperty("curam.tab.TabSessionManager.old.session.id")+" '"+_1058+"'.");
if(_1057!=_1058){
this._log(_1031.getProperty("curam.tab.TabSessionManager.new.session"));
curam.util.runStorageFn(function(){
_1056.storage.put(curam.tab.TabSessionManager.SELECTED_TAB_SESSION_KEY,_1057);
});
curam.util.runStorageFn(function(){
_1056.storage.remove(curam.tab.TabSessionManager.SELECTED_TAB_KEY);
});
return true;
}
this._log(_1031.getProperty("curam.tab.TabSessionManager.refreshed.session"));
return false;
},_getJSessionID:function(){
var key="JSESSIONID=";
var _1059=null;
if(document.cookie){
var begin=document.cookie.indexOf(key);
if(begin!=-1){
var end=document.cookie.indexOf(";",begin+key.length);
_1059=unescape(document.cookie.substring(begin+key.length,end==-1?document.cookie.length:end));
}
}
return _1059;
},_getPrevSelectedTab:function(){
this._log(_1031.getProperty("curam.tab.TabSessionManager.previous.tab"));
var _105a;
curam.util.runStorageFn(function(){
var _105b=curam.util.getTopmostWindow().dojox;
_105a=_105b.storage.get(curam.tab.TabSessionManager.SELECTED_TAB_KEY);
});
var _105c=null;
if(_105a){
_105c=curam.tab.TabDescriptor.fromJson(_105a);
this._log(_1031.getProperty("curam.tab.TabSessionManager.previous.tab.found"),_105c);
}else{
this._log(_1031.getProperty("curam.tab.TabSessionManager.previous.tab.not.found"));
}
return _105c;
},_isOpenInBackground:function(newTD,_105d,pos){
var _105e=true;
if(_105d&&_105d.tabSignature==newTD.tabSignature){
this._log(_1031.getProperty("curam.tab.TabSessionManager.foreground"),newTD,pos);
_105e=false;
}else{
this._log(_1031.getProperty("curam.tab.TabSessionManager.background"),newTD,pos);
}
return _105e;
},_getHomePageTab:function(){
this._log(_1031.getProperty("curam.tab.TabSessionManager.home.page")+" '"+USER_HOME_PAGE_ID+"'.");
if(!USER_HOME_PAGE_TAB_ASSOC.tabIDs||!USER_HOME_PAGE_TAB_ASSOC.sectionID){
throw new Error("The application cannot be launched because the home page, '"+USER_HOME_PAGE_ID+"', has not been associated with a section or "+" tab.");
}
var tabID=USER_HOME_PAGE_TAB_ASSOC.tabIDs[0];
var _105f=USER_HOME_PAGE_TAB_ASSOC.sectionID;
var _1060=new curam.tab.TabDescriptor(_105f,tabID);
var _1061=new curam.ui.PageRequest(USER_HOME_PAGE_ID,true);
_1060.isHomePage=true;
_1060.setTabSignature([],_1061,true);
_1060.setTabContent(_1061);
this._log(_1031.getProperty("curam.tab.TabSessionManager.created"),_1060);
return _1060;
},_log:function(msg,_1062,pos){
if(curam.debug.enabled()){
var _1063="TAB SESSION";
if(typeof pos=="number"){
_1063+=" [pos="+pos+"]";
}
curam.debug.log(_1063+": "+msg+(_1062?" "+_1062.toJson():""));
}
}});
dojo.mixin(curam.tab.TabSessionManager,{SELECTED_TAB_KEY:"curam_selected_tab",SELECTED_TAB_SESSION_KEY:"curam_selected_tab_session"});
return _1032;
});
},"dojo/require":function(){
define("dojo/require",["./_base/loader"],function(_1064){
return {dynamic:0,normalize:function(id){
return id;
},load:_1064.require};
});
},"url:dijit/layout/templates/ScrollingTabController.html":"<div class=\"dijitTabListContainer-${tabPosition} tabStrip-disabled dijitLayoutContainer\"><!-- CURAM-FIX: removed style=\"visibility:hidden, dd the tabStrip-disabled class by default.\" -->\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerMenuButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_menuBtn\"\r\n\t\t\tdata-dojo-props=\"containerId: '${containerId}', iconClass: 'dijitTabStripMenuIcon',\r\n\t\t\t\t\tdropDownPosition: ['below-alt', 'above-alt']\"\r\n\t\t\tdata-dojo-attach-point=\"_menuBtn\" showLabel=\"false\" title=\"\">&#9660;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_leftBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideLeftIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_leftBtn\" data-dojo-attach-event=\"onClick: doSlideLeft\">&#9664;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_rightBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideRightIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_rightBtn\" data-dojo-attach-event=\"onClick: doSlideRight\">&#9654;</div>\r\n\t<div class='dijitTabListWrapper dijitTabContainerTopNone dijitAlignClient' data-dojo-attach-point='tablistWrapper'>\r\n\t\t<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'\r\n\t\t\t\tdata-dojo-attach-point='containerNode' class='nowrapTabStrip dijitTabContainerTop-tabs'></div>\r\n\t</div>\r\n</div>\r\n","dijit/Dialog":function(){
require({cache:{"url:dijit/templates/Dialog.html":"<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span>\n\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabIndex=\"-1\">\n\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t</span>\n\t</div>\n\t\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n"}});
define("dijit/Dialog",["require","dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/_base/fx","dojo/i18n","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/ready","dojo/_base/sniff","dojo/_base/window","dojo/window","dojo/dnd/Moveable","dojo/dnd/TimedMoveable","./focus","./_base/manager","./_Widget","./_TemplatedMixin","./_CssStateMixin","./form/_FormMixin","./_DialogMixin","./DialogUnderlay","./layout/ContentPane","dojo/text!./templates/Dialog.html",".","dojo/i18n!./nls/common"],function(_1065,array,_1066,_1067,_1068,dom,_1069,_106a,_106b,event,fx,i18n,_106c,keys,lang,on,ready,has,win,_106d,_106e,_106f,focus,_1070,_1071,_1072,_1073,_1074,_1075,_1076,_1077,_1078,dijit){
var _1079=_1067("dijit._DialogBase",[_1072,_1074,_1075,_1073],{templateString:_1078,baseClass:"dijitDialog",cssStateNodes:{closeButtonNode:"dijitDialogCloseIcon"},_setTitleAttr:[{node:"titleNode",type:"innerHTML"},{node:"titleBar",type:"attribute"}],open:false,duration:_1070.defaultDuration,refocus:true,autofocus:true,_firstFocusItem:null,_lastFocusItem:null,doLayout:false,draggable:true,"aria-describedby":"",postMixInProperties:function(){
var _107a=i18n.getLocalization("dijit","common");
lang.mixin(this,_107a);
this.inherited(arguments);
},postCreate:function(){
_106b.set(this.domNode,{display:"none",position:"absolute"});
win.body().appendChild(this.domNode);
this.inherited(arguments);
this.connect(this,"onExecute","hide");
this.connect(this,"onCancel","hide");
this._modalconnects=[];
},onLoad:function(){
this._position();
if(this.autofocus&&_107b.isTop(this)){
this._getFocusItems(this.domNode);
focus.focus(this._firstFocusItem);
}
this.inherited(arguments);
},_endDrag:function(){
var _107c=_106a.position(this.domNode),_107d=_106d.getBox();
_107c.y=Math.min(Math.max(_107c.y,0),(_107d.h-_107c.h));
_107c.x=Math.min(Math.max(_107c.x,0),(_107d.w-_107c.w));
this._relativePosition=_107c;
this._position();
},_setup:function(){
var node=this.domNode;
if(this.titleBar&&this.draggable){
this._moveable=new ((has("ie")==6)?_106f:_106e)(node,{handle:this.titleBar});
this.connect(this._moveable,"onMoveStop","_endDrag");
}else{
_1069.add(node,"dijitDialogFixed");
}
this.underlayAttrs={dialogId:this.id,"class":array.map(this["class"].split(/\s/),function(s){
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
_106b.set(this.containerNode,{width:"auto",height:"auto"});
}
var bb=_106a.position(this.domNode);
var _107e=_106d.getBox();
if(bb.w>=_107e.w||bb.h>=_107e.h){
var w=Math.min(bb.w,Math.floor(_107e.w*0.75)),h=Math.min(bb.h,Math.floor(_107e.h*0.75));
if(this._singleChild&&this._singleChild.resize){
this._singleChildOriginalStyle=this._singleChild.domNode.style.cssText;
this._singleChild.resize({w:w,h:h});
}else{
_106b.set(this.containerNode,{width:w+"px",height:h+"px",overflow:"auto",position:"relative"});
}
}else{
if(this._singleChild&&this._singleChild.resize){
this._singleChild.resize();
}
}
},_position:function(){
if(!_1069.contains(win.body(),"dojoMove")){
var node=this.domNode,_107f=_106d.getBox(),p=this._relativePosition,bb=p?null:_106a.position(node),l=Math.floor(_107f.l+(p?p.x:(_107f.w-bb.w)/2)),t=Math.floor(_107f.t+(p?p.y:(_107f.h-bb.h)/2));
_106b.set(node,{left:l+"px",top:t+"px"});
}
},_onKey:function(evt){
if(evt.charOrCode){
var node=evt.target;
if(evt.charOrCode===keys.TAB){
this._getFocusItems(this.domNode);
}
var _1080=(this._firstFocusItem==this._lastFocusItem);
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===keys.TAB){
if(!_1080){
focus.focus(this._lastFocusItem);
}
event.stop(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===keys.TAB&&!evt.shiftKey){
if(!_1080){
focus.focus(this._firstFocusItem);
}
event.stop(evt);
}else{
while(node){
if(node==this.domNode||_1069.contains(node,"dijitPopup")){
if(evt.charOrCode==keys.ESCAPE){
this.onCancel();
}else{
return;
}
}
node=node.parentNode;
}
if(evt.charOrCode!==keys.TAB){
event.stop(evt);
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
this._modalconnects.push(on(window,"scroll",lang.hitch(this,"layout")));
this._modalconnects.push(on(window,"resize",lang.hitch(this,function(){
var _1081=_106d.getBox();
if(!this._oldViewport||_1081.h!=this._oldViewport.h||_1081.w!=this._oldViewport.w){
this.layout();
this._oldViewport=_1081;
}
})));
}
this._modalconnects.push(on(this.domNode,_1066._keypress,lang.hitch(this,"_onKey")));
_106b.set(this.domNode,{opacity:0,display:""});
this._set("open",true);
this._onShow();
this._size();
this._position();
var _1082;
this._fadeInDeferred=new _1068(lang.hitch(this,function(){
_1082.stop();
delete this._fadeInDeferred;
}));
_1082=fx.fadeIn({node:this.domNode,duration:this.duration,beforeBegin:lang.hitch(this,function(){
_107b.show(this,this.underlayAttrs);
}),onEnd:lang.hitch(this,function(){
if(this.autofocus&&_107b.isTop(this)){
this._getFocusItems(this.domNode);
focus.focus(this._firstFocusItem);
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
var _1083;
this._fadeOutDeferred=new _1068(lang.hitch(this,function(){
_1083.stop();
delete this._fadeOutDeferred;
}));
this._fadeOutDeferred.then(lang.hitch(this,"onHide"));
_1083=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,function(){
this.domNode.style.display="none";
_107b.hide(this);
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
if(dijit._underlay){
dijit._underlay.layout();
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
_107b.hide(this);
this.inherited(arguments);
}});
var _1084=_1067("dijit.Dialog",[_1077,_1079],{});
_1084._DialogBase=_1079;
var _107b=_1084._DialogLevelManager={_beginZIndex:950,show:function(_1085,_1086){
ds[ds.length-1].focus=focus.curNode;
var _1087=dijit._underlay;
if(!_1087||_1087._destroyed){
_1087=dijit._underlay=new _1076(_1086);
}else{
_1087.set(_1085.underlayAttrs);
}
var _1088=ds[ds.length-1].dialog?ds[ds.length-1].zIndex+2:_1084._DialogLevelManager._beginZIndex;
if(ds.length==1){
_1087.show();
}
_106b.set(dijit._underlay.domNode,"zIndex",_1088-1);
_106b.set(_1085.domNode,"zIndex",_1088);
ds.push({dialog:_1085,underlayAttrs:_1086,zIndex:_1088});
},hide:function(_1089){
if(ds[ds.length-1].dialog==_1089){
ds.pop();
var pd=ds[ds.length-1];
if(ds.length==1){
if(!dijit._underlay._destroyed){
dijit._underlay.hide();
}
}else{
_106b.set(dijit._underlay.domNode,"zIndex",pd.zIndex-1);
dijit._underlay.set(pd.underlayAttrs);
}
if(_1089.refocus){
var focus=pd.focus;
if(pd.dialog&&(!focus||!dom.isDescendant(focus,pd.dialog.domNode))){
pd.dialog._getFocusItems(pd.dialog.domNode);
focus=pd.dialog._firstFocusItem;
}
if(focus){
try{
focus.focus();
}
catch(e){
}
}
}
}else{
var idx=array.indexOf(array.map(ds,function(elem){
return elem.dialog;
}),_1089);
if(idx!=-1){
ds.splice(idx,1);
}
}
},isTop:function(_108a){
return ds[ds.length-1].dialog==_108a;
}};
var ds=_1084._dialogStack=[{dialog:null,focus:null,underlayAttrs:null}];
if(!_106c.isAsync){
ready(0,function(){
var _108b=["dijit/TooltipDialog"];
_1065(_108b);
});
}
return _1084;
});
},"curam/layout/EmptyContentPane":function(){
define("curam/layout/EmptyContentPane",["dijit/layout/ContentPane"],function(){
var _108c=dojo.declare("curam.layout.EmptyContentPane",dijit.layout.ContentPane,{baseClass:"",_layoutChildren:function(){
},resize:function(){
}});
return _108c;
});
},"curam/util/ScreenContext":function(){
define("curam/util/ScreenContext",[],function(){
var _108d={DEFAULT_CONTEXT:112,SAMPLE22:2,SAMPLE21:1,SAMPLE13:4,SAMPLE12:2,SAMPLE11:1,EXTAPP:1048576,CONTEXT_PORTLET:524288,SMART_PANEL:262144,NESTED_UIM:131072,ORG_TREE:65536,CONTEXT_PANEL:32768,LIST_ROW_INLINE_PAGE:8192,LIST_EVEN_ROW:16384,TAB:4096,TREE:2048,AGENDA:1024,POPUP:512,MODAL:256,HOME:128,HEADER:64,NAVIGATOR:32,FOOTER:16,OVAL:8,RESOLVE:4,ACTION:2,ERROR:1,EMPTY:0};
var _108e=[["ERROR","ACTION","RESOLVE","OPT_VALIDATION","FOOTER","NAVIGATOR","HEADER","HOME_PAGE","MODAL","POPUP","AGENDA","TREE","TAB","LIST_EVEN_ROW","LIST_ROW_INLINE_PAGE","CONTEXT_PANEL","ORG_TREE","NESTED_UIM","SMART_PANEL","CONTEXT_PORTLET","EXTAPP"],["SAMPLE11","SAMPLE12","SAMPLE13"],["SAMPLE21","SAMPLE22"]];
var _108f=dojo.declare("curam.util.ScreenContext",null,{constructor:function(_1090){
if(_1090){
this.setContext(_1090);
}else{
this.currentContext=[_108d["DEFAULT_CONTEXT"]|_108d["DEFAULT_CONTEXT"]];
}
},setContext:function(_1091){
var tmp=this.setup(_1091);
this.currentContext=((tmp==null)?([_108d["DEFAULT_CONTEXT"]|_108d["DEFAULT_CONTEXT"]]):(tmp));
},addContextBits:function(_1092,idx){
if(!_1092){
return;
}
var navig=(idx)?idx:0;
var _1093=this.parseContext(_1092);
if(_1093!=null){
this.currentContext[navig]|=_1093;
}
return this.currentContext[navig];
},addAll:function(idx){
var navig=(idx)?idx:0;
this.currentContext[navig]=4294967295;
return this.currentContext[navig];
},clear:function(_1094,idx){
if(!_1094){
this.clearAll();
return;
}
var navig=(idx)?idx:0;
if(_1094==0){
return this.currentContext[navig];
}
var _1095=this.parseContext(_1094);
if(_1095!=null){
var _1096=this.currentContext[navig]&_1095;
this.currentContext[navig]^=_1096;
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
},updateStates:function(_1097){
this.clear("ERROR|ACTION|RESOLVE");
this.currentContext[0]=this.currentContext[0]|(_1097&7);
},hasContextBits:function(_1098,idx){
if(!_1098){
return false;
}
var navig=(idx)?idx:0;
var _1099=this.parseContext(_1098);
if(_1099!=null){
var merge=this.currentContext[navig]&_1099;
return (merge==_1099);
}
return false;
},getValue:function(){
var _109a="";
for(var i=0;i<this.currentContext.length;i++){
_109a+=this.currentContext[i]+"|";
}
return _109a.substring(0,_109a.length-1);
},toRequestString:function(){
return "o3ctx="+this.getValue();
},toBinary:function(){
var _109b="";
for(var i=0;i<this.currentContext.length;i++){
_109b+=this.currentContext[i].toString(2)+"|";
}
return _109b.substring(0,_109b.length-1);
},toString:function(){
var _109c="";
for(var i=0;i<this.currentContext.length;i++){
var _109d="";
var j=0;
while(j<_108e[i].length){
if(((this.currentContext[i]>>j)&1)!=0){
_109d+=","+_108e[i][j];
}
j++;
}
if(_109d==""){
return "{}";
}
_109c+="|"+_109d.replace(",","{")+((_109d.length==0)?"":"}");
}
return _109c.substring(1);
},parseContext:function(_109e){
var _109f=_109e.replace(/,/g,"|");
var parts=_109f.split("|");
var tmp=isNaN(parts[0])?parseInt(_108d[parts[0]]):parts[0];
for(var i=1;i<parts.length;i++){
tmp=tmp|(isNaN(parts[i])?parseInt(_108d[parts[i]]):parts[i]);
}
return (isNaN(tmp)?null:tmp);
},setup:function(_10a0){
if(!_10a0){
return null;
}
var _10a1=(""+_10a0).split("|");
var _10a2=new Array(_10a1.length);
for(var i=0;i<_10a1.length;i++){
_10a2[i]=this.parseContext(_10a1[_10a1.length-i-1]);
_10a2[i]=_10a2[i]|_10a2[i];
if(!_10a2[i]||isNaN(_10a2[i])||_10a2[i]>4294967295){
return null;
}
}
return _10a2;
}});
return _108f;
});
},"dijit/a11y":function(){
define("dijit/a11y",["dojo/_base/array","dojo/_base/config","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-style","dojo/_base/sniff","./_base/manager","."],function(array,_10a3,_10a4,dom,_10a5,_10a6,has,_10a7,dijit){
var shown=(dijit._isElementShown=function(elem){
var s=_10a6.get(elem);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(_10a5.get(elem,"type")!="hidden");
});
dijit.hasDefaultTabStop=function(elem){
switch(elem.nodeName.toLowerCase()){
case "a":
return _10a5.has(elem,"href");
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
var _10a8=elem.contentDocument;
if("designMode" in _10a8&&_10a8.designMode=="on"){
return true;
}
body=_10a8.body;
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
var _10a9=(dijit.isTabNavigable=function(elem){
if(_10a5.get(elem,"disabled")){
return false;
}else{
if(_10a5.has(elem,"tabIndex")){
return _10a5.get(elem,"tabIndex")>=0;
}else{
return dijit.hasDefaultTabStop(elem);
}
}
});
dijit._getTabNavigable=function(root){
var first,last,_10aa,_10ab,_10ac,_10ad,_10ae={};
function _10af(node){
return node&&node.tagName.toLowerCase()=="input"&&node.type&&node.type.toLowerCase()=="radio"&&node.name&&node.name.toLowerCase();
};
var _10b0=function(_10b1){
for(var child=_10b1.firstChild;child;child=child.nextSibling){
if(child.nodeType!=1||(has("ie")<=9&&child.scopeName!=="HTML")||!shown(child)){
continue;
}
if(_10a9(child)){
var _10b2=_10a5.get(child,"tabIndex");
if(!_10a5.has(child,"tabIndex")||_10b2==0){
if(!first){
first=child;
}
last=child;
}else{
if(_10b2>0){
if(!_10aa||_10b2<_10ab){
_10ab=_10b2;
_10aa=child;
}
if(!_10ac||_10b2>=_10ad){
_10ad=_10b2;
_10ac=child;
}
}
}
var rn=_10af(child);
if(_10a5.get(child,"checked")&&rn){
_10ae[rn]=child;
}
}
if(child.nodeName.toUpperCase()!="SELECT"){
_10b0(child);
}
}
};
if(shown(root)){
_10b0(root);
}
function rs(node){
return _10ae[_10af(node)]||node;
};
return {first:rs(first),last:rs(last),lowest:rs(_10aa),highest:rs(_10ac)};
};
dijit.getFirstInTabbingOrder=function(root){
var elems=dijit._getTabNavigable(dom.byId(root));
return elems.lowest?elems.lowest:elems.first;
};
dijit.getLastInTabbingOrder=function(root){
var elems=dijit._getTabNavigable(dom.byId(root));
return elems.last?elems.last:elems.highest;
};
return {hasDefaultTabStop:dijit.hasDefaultTabStop,isTabNavigable:dijit.isTabNavigable,_getTabNavigable:dijit._getTabNavigable,getFirstInTabbingOrder:dijit.getFirstInTabbingOrder,getLastInTabbingOrder:dijit.getLastInTabbingOrder};
});
},"dijit/form/_ToggleButtonMixin":function(){
define("dijit/form/_ToggleButtonMixin",["dojo/_base/declare","dojo/dom-attr"],function(_10b3,_10b4){
return _10b3("dijit.form._ToggleButtonMixin",null,{checked:false,_aria_attr:"aria-pressed",_onClick:function(evt){
var _10b5=this.checked;
this._set("checked",!_10b5);
var ret=this.inherited(arguments);
this.set("checked",ret?this.checked:_10b5);
return ret;
},_setCheckedAttr:function(value,_10b6){
this._set("checked",value);
_10b4.set(this.focusNode||this.domNode,"checked",value);
(this.focusNode||this.domNode).setAttribute(this._aria_attr,value?"true":"false");
this._handleOnChange(value,_10b6);
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
}});
});
},"dijit/_Widget":function(){
define("dijit/_Widget",["dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/ready","./registry","./_WidgetBase","./_OnDijitClickMixin","./_FocusMixin","dojo/uacss","./hccss"],function(_10b7,_10b8,_10b9,_10ba,_10bb,lang,query,ready,_10bc,_10bd,_10be,_10bf){
function _10c0(){
};
function _10c1(_10c2){
return function(obj,event,scope,_10c3){
if(obj&&typeof event=="string"&&obj[event]==_10c0){
return obj.on(event.substring(2).toLowerCase(),lang.hitch(scope,_10c3));
}
return _10c2.apply(_10b9,arguments);
};
};
_10b7.around(_10b9,"connect",_10c1);
if(_10bb.connect){
_10b7.around(_10bb,"connect",_10c1);
}
var _10c4=_10ba("dijit._Widget",[_10bd,_10be,_10bf],{onClick:_10c0,onDblClick:_10c0,onKeyDown:_10c0,onKeyPress:_10c0,onKeyUp:_10c0,onMouseDown:_10c0,onMouseMove:_10c0,onMouseOut:_10c0,onMouseOver:_10c0,onMouseLeave:_10c0,onMouseEnter:_10c0,onMouseUp:_10c0,constructor:function(_10c5){
this._toConnect={};
for(var name in _10c5){
if(this[name]===_10c0){
this._toConnect[name.replace(/^on/,"").toLowerCase()]=_10c5[name];
delete _10c5[name];
}
}
},postCreate:function(){
this.inherited(arguments);
for(var name in this._toConnect){
this.on(name,this._toConnect[name]);
}
delete this._toConnect;
},on:function(type,func){
if(this[this._onMap(type)]===_10c0){
return _10b9.connect(this.domNode,type.toLowerCase(),this,func);
}
return this.inherited(arguments);
},_setFocusedAttr:function(val){
this._focused=val;
this._set("focused",val);
},setAttribute:function(attr,value){
_10bb.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(attr,value);
},attr:function(name,value){
if(_10b8.isDebug){
var _10c6=arguments.callee._ach||(arguments.callee._ach={}),_10c7=(arguments.callee.caller||"unknown caller").toString();
if(!_10c6[_10c7]){
_10bb.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+_10c7,"","2.0");
_10c6[_10c7]=true;
}
}
var args=arguments.length;
if(args>=2||typeof name==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(name);
}
},getDescendants:function(){
_10bb.deprecated(this.declaredClass+"::getDescendants() is deprecated. Use getChildren() instead.","","2.0");
return this.containerNode?query("[widgetId]",this.containerNode).map(_10bc.byNode):[];
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
if(!_10bb.isAsync){
ready(0,function(){
var _10c8=["dijit/_base"];
require(_10c8);
});
}
return _10c4;
});
},"dojo/touch":function(){
define("dojo/touch",["./_base/kernel","./on","./has","./mouse"],function(dojo,on,has,mouse){
function _10c9(type){
return function(node,_10ca){
return on(node,type,_10ca);
};
};
var touch=has("touch");
dojo.touch={press:_10c9(touch?"touchstart":"mousedown"),move:_10c9(touch?"touchmove":"mousemove"),release:_10c9(touch?"touchend":"mouseup"),cancel:touch?_10c9("touchcancel"):mouse.leave};
return dojo.touch;
});
},"url:dijit/form/templates/Select.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tdata-dojo-attach-point=\"_buttonNode,tableNode,focusNode\" cellspacing='0' cellpadding='0'\n\trole=\"combobox\" aria-haspopup=\"true\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonContents dijitButtonNode\" role=\"presentation\"\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"  data-dojo-attach-point=\"containerNode,_popupStateNode\"></span\n\t\t\t><input type=\"hidden\" ${!nameAttrSetting} data-dojo-attach-point=\"valueNode\" value=\"${value}\" aria-hidden=\"true\"\n\t\t/></td><td class=\"dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton\"\n\t\t\t\tdata-dojo-attach-point=\"titleNode\" role=\"presentation\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t></tr></tbody\n></table>\n","dojo/fx":function(){
define("dojo/fx",["./_base/lang","./Evented","./_base/kernel","./_base/array","./_base/connect","./_base/fx","./dom","./dom-style","./dom-geometry","./ready","require"],function(lang,_10cb,dojo,_10cc,_10cd,_10ce,dom,_10cf,geom,ready,_10d0){
if(!dojo.isAsync){
ready(0,function(){
var _10d1=["./fx/Toggler"];
_10d0(_10d1);
});
}
var _10d2=dojo.fx={};
var _10d3={_fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,args||[]);
}
return this;
}};
var _10d4=function(_10d5){
this._index=-1;
this._animations=_10d5||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
_10cc.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
_10d4.prototype=new _10cb();
lang.extend(_10d4,{_onAnimate:function(){
this._fire("onAnimate",arguments);
},_onEnd:function(){
_10cd.disconnect(this._onAnimateCtx);
_10cd.disconnect(this._onEndCtx);
this._onAnimateCtx=this._onEndCtx=null;
if(this._index+1==this._animations.length){
this._fire("onEnd");
}else{
this._current=this._animations[++this._index];
this._onAnimateCtx=_10cd.connect(this._current,"onAnimate",this,"_onAnimate");
this._onEndCtx=_10cd.connect(this._current,"onEnd",this,"_onEnd");
this._current.play(0,true);
}
},play:function(delay,_10d6){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_10d6&&this._current.status()=="playing"){
return this;
}
var _10d7=_10cd.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_10d8=_10cd.connect(this._current,"onBegin",this,function(arg){
this._fire("onBegin",arguments);
}),_10d9=_10cd.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
_10cd.disconnect(_10d7);
_10cd.disconnect(_10d8);
_10cd.disconnect(_10d9);
});
if(this._onAnimateCtx){
_10cd.disconnect(this._onAnimateCtx);
}
this._onAnimateCtx=_10cd.connect(this._current,"onAnimate",this,"_onAnimate");
if(this._onEndCtx){
_10cd.disconnect(this._onEndCtx);
}
this._onEndCtx=_10cd.connect(this._current,"onEnd",this,"_onEnd");
this._current.play.apply(this._current,arguments);
return this;
},pause:function(){
if(this._current){
var e=_10cd.connect(this._current,"onPause",this,function(arg){
this._fire("onPause",arguments);
_10cd.disconnect(e);
});
this._current.pause();
}
return this;
},gotoPercent:function(_10da,_10db){
this.pause();
var _10dc=this.duration*_10da;
this._current=null;
_10cc.some(this._animations,function(a){
if(a.duration<=_10dc){
this._current=a;
return true;
}
_10dc-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_10dc/this._current.duration,_10db);
}
return this;
},stop:function(_10dd){
if(this._current){
if(_10dd){
for(;this._index+1<this._animations.length;++this._index){
this._animations[this._index].stop(true);
}
this._current=this._animations[this._index];
}
var e=_10cd.connect(this._current,"onStop",this,function(arg){
this._fire("onStop",arguments);
_10cd.disconnect(e);
});
this._current.stop();
}
return this;
},status:function(){
return this._current?this._current.status():"stopped";
},destroy:function(){
if(this._onAnimateCtx){
_10cd.disconnect(this._onAnimateCtx);
}
if(this._onEndCtx){
_10cd.disconnect(this._onEndCtx);
}
}});
lang.extend(_10d4,_10d3);
_10d2.chain=function(_10de){
return new _10d4(_10de);
};
var _10df=function(_10e0){
this._animations=_10e0||[];
this._connects=[];
this._finished=0;
this.duration=0;
_10cc.forEach(_10e0,function(a){
var _10e1=a.duration;
if(a.delay){
_10e1+=a.delay;
}
if(this.duration<_10e1){
this.duration=_10e1;
}
this._connects.push(_10cd.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new _10ce.Animation({curve:[0,1],duration:this.duration});
var self=this;
_10cc.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop","onEnd"],function(evt){
self._connects.push(_10cd.connect(self._pseudoAnimation,evt,function(){
self._fire(evt,arguments);
}));
});
};
lang.extend(_10df,{_doAction:function(_10e2,args){
_10cc.forEach(this._animations,function(a){
a[_10e2].apply(a,args);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_10e3,args){
var t=this._pseudoAnimation;
t[_10e3].apply(t,args);
},play:function(delay,_10e4){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_10e5,_10e6){
var ms=this.duration*_10e5;
_10cc.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_10e6);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_10e7){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
_10cc.forEach(this._connects,_10cd.disconnect);
}});
lang.extend(_10df,_10d3);
_10d2.combine=function(_10e8){
return new _10df(_10e8);
};
_10d2.wipeIn=function(args){
var node=args.node=dom.byId(args.node),s=node.style,o;
var anim=_10ce.animateProperty(lang.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _10e9=_10cf.get(node,"height");
return Math.max(_10e9,1);
}
},end:function(){
return node.scrollHeight;
}}}},args));
var fini=function(){
s.height="auto";
s.overflow=o;
};
_10cd.connect(anim,"onStop",fini);
_10cd.connect(anim,"onEnd",fini);
return anim;
};
_10d2.wipeOut=function(args){
var node=args.node=dom.byId(args.node),s=node.style,o;
var anim=_10ce.animateProperty(lang.mixin({properties:{height:{end:1}}},args));
_10cd.connect(anim,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
var fini=function(){
s.overflow=o;
s.height="auto";
s.display="none";
};
_10cd.connect(anim,"onStop",fini);
_10cd.connect(anim,"onEnd",fini);
return anim;
};
_10d2.slideTo=function(args){
var node=args.node=dom.byId(args.node),top=null,left=null;
var init=(function(n){
return function(){
var cs=_10cf.getComputedStyle(n);
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
var anim=_10ce.animateProperty(lang.mixin({properties:{top:args.top||0,left:args.left||0}},args));
_10cd.connect(anim,"beforeBegin",anim,init);
return anim;
};
return _10d2;
});
},"dijit/_DialogMixin":function(){
define("dijit/_DialogMixin",["dojo/_base/declare","./a11y"],function(_10ea,a11y){
return _10ea("dijit._DialogMixin",null,{execute:function(){
},onCancel:function(){
},onExecute:function(){
},_onSubmit:function(){
this.onExecute();
this.execute(this.get("value"));
},_getFocusItems:function(){
var elems=a11y._getTabNavigable(this.containerNode);
this._firstFocusItem=elems.lowest||elems.first||this.closeButtonNode||this.domNode;
this._lastFocusItem=elems.last||elems.highest||this._firstFocusItem;
}});
});
},"curam/tab/TabDescriptor":function(){
define("curam/tab/TabDescriptor",["curam/tab/TabSessionManager","curam/debug","curam/util/ResourceBundle"],function(_10eb){
dojo.requireLocalization("curam.application","Debug");
var _10ec=new curam.util.ResourceBundle("Debug");
var _10ed=dojo.declare("curam.tab.TabDescriptor",null,{constructor:function(_10ee,tabID){
this.sectionID=_10ee?_10ee:null;
this.tabID=tabID?tabID:null;
this.tabSignature=null;
this.tabContent=null;
this.tabParamNames=null;
this.isHomePage=false;
},toJson:function(){
var value={"sectionID":this.sectionID,"tabID":this.tabID,"tabSignature":this.tabSignature,"tabParamNames":this.tabParamNames,"isHomePage":this.isHomePage};
value.tabContent=this.tabContent?this.tabContent:null;
return dojo.toJson(value);
},setTabContent:function(_10ef,_10f0){
if(this.tabContent){
this._log(_10ec.getProperty("curam.tab.TabDescriptor.content.changed"));
}else{
this._log(_10ec.getProperty("curam.tab.TabDescriptor.content.set"));
}
var _10f1=dojo.clone(_10ef.parameters);
dojo.mixin(_10f1,_10ef.cdejParameters);
if(!this.tabContent){
this.tabContent={};
}
this.tabContent.parameters=_10f1;
this.tabContent.pageID=_10ef.pageID;
if(_10f0){
this.tabContent.tabName=_10f0;
}else{
if(!this.tabContent.tabName){
this.tabContent.tabName="";
}
}
this._save();
dojo.publish("/curam/tab/labelUpdated");
},setTabSignature:function(_10f2,_10f3,_10f4){
if(!this.tabSignature){
this.tabParamNames=_10f2.slice(0);
this.tabParamNames.sort();
this.tabSignature=this._generateSignature(this.tabID,this.tabParamNames,_10f3);
this._log(_10ec.getProperty("curam.tab.TabDescriptor.signature.set"));
this._save();
if(!_10f4){
this._select();
}
}else{
this._log(_10ec.getProperty("curam.tab.TabDescriptor.signature.not.set"));
}
},matchesPageRequest:function(_10f5){
return this.tabSignature&&this.tabSignature==this._generateSignature(this.tabID,this.tabParamNames,_10f5);
},_generateSignature:function(tabID,_10f6,_10f7){
var _10f8=tabID;
if(_10f6){
for(var i=0;i<_10f6.length;i++){
var name=_10f6[i];
if(_10f7.parameters[name]){
_10f8+="|"+name+"="+_10f7.parameters[name];
}
}
}
return _10f8;
},_save:function(){
if(this.tabContent&&this.tabSignature){
this._log(_10ec.getProperty("curam.tab.TabDescriptor.saving"));
new _10eb().tabUpdated(this);
}
},_select:function(){
if(this.tabSignature){
this._log(_10ec.getProperty("curam.tab.TabDescriptor.selecting"));
new _10eb().tabSelected(this);
}
},_log:function(msg){
if(curam.debug.enabled()){
curam.debug.log("TAB DESCRIPTOR: "+msg+" ["+this.toJson()+"]");
}
}});
dojo.mixin(curam.tab.TabDescriptor,{fromJson:function(_10f9){
var _10fa=null;
if(_10f9){
var rawTD=dojo.fromJson(_10f9);
var _10fa=new curam.tab.TabDescriptor(rawTD.sectionID,rawTD.tabID);
if(rawTD.tabSignature){
_10fa.tabSignature=rawTD.tabSignature;
}
if(rawTD.tabContent){
_10fa.tabContent=rawTD.tabContent;
}
if(rawTD.tabParamNames){
_10fa.tabParamNames=rawTD.tabParamNames;
}
if(rawTD.isHomePage){
_10fa.isHomePage=rawTD.isHomePage;
}
}
return _10fa;
}});
return _10ed;
});
},"curam/ui/OpenTabEvent":function(){
define("curam/ui/OpenTabEvent",["curam/ui/PageRequest"],function(_10fb){
var _10fc=dojo.declare("curam.ui.OpenTabEvent",null,{constructor:function(_10fd,_10fe,_10ff){
this.tabDescriptor=_10fd;
this.openInBackground=_10ff?true:false;
if(_10fe){
this.uimPageRequest=_10fe;
}else{
this.uimPageRequest=new _10fb(_10fd,_10fd.isHomePage);
}
}});
return _10fc;
});
},"curam/widgets":function(){
define("curam/widgets",[],function(){
var _1100=function(_1101){
this.accordion=new _1102(_1101,this);
this.accordion.switchboard=this;
};
var _1103={updateButtons:function(){
var _1104=this.accordion;
this.collapser.disabled=_1104.staysStill(false);
this.expander.disabled=_1104.staysStill(true);
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
dojo.mixin(_1100.prototype,_1103);
var _1102=function(_1105,_1106){
var _1107;
this.panelHeight="250px";
this.accordMode=true;
this.switchboard=_1106;
this.topElement=dojo.byId(_1105);
this.tabs=[];
var _1108=dojo.query("div",this.topElement);
for(var i=0;i<_1108.length;i++){
if(_1108[i].className=="accordionTab"){
while(_1108[++i].className!="tabHeader"){
}
_1107=_1108[i];
while(_1108[++i].className!="tabContent"){
}
this.tabs[this.tabs.length]=new _1109(this,_1107,_1108[i]);
}
}
this.lastTab=this.tabs[0];
for(var i=1;i<this.tabs.length;i++){
this.tabs[i].collapse(false);
}
};
var _110a={expandAll:function(){
var _110b=this.switchboard.accordion;
for(var i=0;i<_110b.tabs.length;i++){
_110b.tabs[i].stateExpanded();
}
this.src="../themes/classic/images/evidence-review/CollapseAllButton.png";
this.onclick=_110b.collapseAll;
},collapseAll:function(){
var _110c=this.switchboard.accordion;
for(var i=0;i<_110c.tabs.length;i++){
_110c.tabs[i].collapse(false);
}
_110c.lastTab.expand(false);
this.src="../themes/classic/images/evidence-review/ExpandAllButton.png";
this.onclick=_110c.expandAll;
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
},staysStill:function(_110d){
var _110e=0;
var _110f=this.tabs.length;
for(var i=0;i<_110f;i++){
if(this.tabs[i].expanded==true){
_110e++;
}
}
return (_110d==true)?(_110f-_110e==0):(_110e==1);
}};
dojo.mixin(_1102.prototype,_110a);
var _1109=function(_1110,_1111,_1112){
this.accordion=_1110;
this.switchboard=_1110.switchboard;
this.header=_1111;
this.header.tab=this;
this.content=_1112;
dojo.style(this.content,{height:_1110.panelHeight,overflow:"auto"});
this.content.tab=this;
this.expanded=true;
dojo.connect(this.header,"onclick",this.toggleState);
dojo.connect(this.header,"onmouseover",this.hoverStyle);
dojo.connect(this.header,"onmouseout",this.stillStyle);
};
var _1113={hoverStyle:function(e){
if(!this.tab.expanded){
this.className+=" tabHeaderHover";
}
},stillStyle:function(e){
this.className="tabHeader";
},collapse:function(_1114){
if(this.accordion.lastTab==this){
return;
}
if(this.accordion.staysStill(false)){
return;
}
if(_1114&&this.accordion.accordMode==false){
new _1115(this.content,"down");
}else{
dojo.style(this.content,{height:"1px",display:"none"});
}
this.expanded=false;
this.content.style.overflow="hidden";
if(this.accordion.accordMode==false){
this.switchboard.updateButtons();
}
},expand:function(_1116){
if(this.accordion.lastTab==this){
return;
}
if(this.accordion.staysStill(true)){
return;
}
var _1117=this.accordion.lastTab;
this.stateExpanded(_1116);
this.accordion.lastTab=this;
if(this.accordion.accordMode==true){
_1117.collapse(true);
}else{
this.switchboard.updateButtons();
}
},stateExpanded:function(_1118){
if(_1118){
this.content.style.display="";
if(this.accordion.accordMode==true){
new _1119(this.content,this.accordion.lastTab.content);
}else{
new _1115(this.content,"up");
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
dojo.mixin(_1109.prototype,_1113);
var _1115=function(_111a,_111b){
this.contentRef=_111a;
this.direction=_111b;
this.duration=100;
this.steps=6;
this.step();
};
var _111c={step:function(){
var _111d;
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
var _111e=Math.round(this.duration/this.steps);
if(this.direction=="down"){
_111d=this.steps>0?(parseInt(this.contentRef.offsetHeight)-1)/this.steps:0;
}else{
_111d=this.steps>0?(parseInt(this.contentRef.tab.accordion.panelHeight)-parseInt(this.contentRef.offsetHeight))/this.steps:0;
}
this.resizeBy(_111d);
this.duration-=_111e;
this.steps--;
this.timer=setTimeout(dojo.hitch(this,this.step),_111e);
},resizeBy:function(_111f){
var _1120=this.contentRef.offsetHeight;
var _1121=parseInt(_111f);
if(_111f!=0){
if(this.direction=="down"){
this.contentRef.style.height=(_1120-_1121)+"px";
}else{
this.contentRef.style.height=(_1120+_1121)+"px";
}
}
}};
dojo.mixin(_1115.prototype,_111c);
var _1119=function(_1122,_1123){
this.collapsingContent=_1123;
this.collapsingContent.style.overflow="hidden";
this.expandingContent=_1122;
this.limit=250;
this.duration=100;
this.steps=10;
this.expandingContent.style.display="";
this.step();
};
var _1124={step:function(){
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
var _1125=Math.round(this.duration/this.steps);
var _1126=this.steps>0?(parseInt(this.collapsingContent.style.height)-1)/this.steps:0;
this.resizeBoth(_1126);
this.duration-=_1125;
this.steps--;
this.timer=setTimeout(dojo.hitch(this,this.step),_1125);
},resizeBoth:function(_1127){
var h1=parseInt(this.collapsingContent.style.height);
var h2=parseInt(this.expandingContent.style.height);
var _1128=parseInt(_1127);
if(_1127!=0){
if(h2+_1128<this.limit){
this.collapsingContent.style.height=(h1-_1128)+"px";
this.expandingContent.style.height=(h2+_1128)+"px";
}
}
}};
dojo.mixin(_1119.prototype,_1124);
var _1129={version:"1",AccordionControl:_1100,AccordionWidget:_1102,AccordionTab:_1109,SingleSlowMotion:_1115,SynchroSlowMotion:_1119,registerAccordion:function(id){
_1100.constructor(id);
}};
var _112a=function(_112b){
this.steps=_112b;
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
var _112c={addRegion:function(_112d){
this.regions[this.regions.length]=_112d;
},drawMap:function(){
var _112e;
if(this.steps%2==0){
_112e=this.steps/2;
}else{
_112e=(this.steps-1)/2;
}
var step=parseInt(255/_112e);
var red,green,blue;
for(var i=0;i<this.steps;++i){
var _112f;
if(i==0){
_112f="#ff0000";
}else{
if(i==(this.steps-1)){
_112f="#0000ff";
}else{
if(i==_112e){
_112f="#ffffff";
}else{
if(i>_112e){
var green=255;
var red=255;
green-=(i-_112e)*step;
red-=(i-_112e)*step;
_112f=this.rgbToHex(red,green,255);
}else{
if(i<_112e){
green=0;
blue=0;
green+=step*i;
blue+=step*i;
_112f=this.rgbToHex(255,green,blue);
}
}
}
}
}
var table=dojo.byId("heatmapTable");
if(table){
var _1130=table.getElementsByTagName("td");
for(var j=0;j<_1130.length;j++){
if(_1130[j].className.indexOf("region"+this.regions[i])>-1){
_1130[j].style.background=_112f;
if(i>_112e){
dojo.style(dojo.query("a",_1130[j])[0],"color","white");
}
}
}
}
dojo.style(dojo.byId("legendImage"+this.regions[i]),{color:_112f,background:_112f});
}
},rgbToHex:function(r,g,b){
var rr=this.RGB[r];
var gg=this.RGB[g];
var bb=this.RGB[b];
return "#"+rr+gg+bb;
}};
dojo.mixin(_112a.prototype,_112c);
dojo.global.getDataIn=function(_1131){
return eval(_1131);
};
dojo.global.Widgets=_1129;
dojo.global.HeatMap=_112a;
return _1129;
});
},"dijit/Tree":function(){
require({cache:{"url:dijit/templates/TreeNode.html":"<div class=\"dijitTreeNode\" role=\"presentation\"\n\t><div data-dojo-attach-point=\"rowNode\" class=\"dijitTreeRow\" role=\"presentation\" data-dojo-attach-event=\"onmouseenter:_onMouseEnter, onmouseleave:_onMouseLeave, onclick:_onClick, ondblclick:_onDblClick\"\n\t\t><img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"expandoNode\" class=\"dijitTreeExpando\" role=\"presentation\"\n\t\t/><span data-dojo-attach-point=\"expandoNodeText\" class=\"dijitExpandoText\" role=\"presentation\"\n\t\t></span\n\t\t><span data-dojo-attach-point=\"contentNode\"\n\t\t\tclass=\"dijitTreeContent\" role=\"presentation\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"iconNode\" class=\"dijitIcon dijitTreeIcon\" role=\"presentation\"\n\t\t\t/><span data-dojo-attach-point=\"labelNode\" class=\"dijitTreeLabel\" role=\"treeitem\" tabindex=\"-1\" aria-selected=\"false\" data-dojo-attach-event=\"onfocus:_onLabelFocus\"></span>\n\t\t</span\n\t></div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitTreeContainer\" role=\"presentation\" style=\"display: none;\"></div>\n</div>\n","url:dijit/templates/Tree.html":"<div class=\"dijitTree dijitTreeContainer\" role=\"tree\"\n\tdata-dojo-attach-event=\"onkeypress:_onKeyPress\">\n\t<div class=\"dijitInline dijitTreeIndent\" style=\"position: absolute; top: -9999px\" data-dojo-attach-point=\"indentDetector\"></div>\n</div>\n"}});
define("dijit/Tree",["dojo/_base/array","dojo/_base/connect","dojo/cookie","dojo/_base/declare","dojo/_base/Deferred","dojo/DeferredList","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/fx","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/topic","./focus","./registry","./_base/manager","./_Widget","./_TemplatedMixin","./_Container","./_Contained","./_CssStateMixin","dojo/text!./templates/TreeNode.html","dojo/text!./templates/Tree.html","./tree/TreeStoreModel","./tree/ForestStoreModel","./tree/_dndSelector"],function(array,_1132,_1133,_1134,_1135,_1136,dom,_1137,_1138,_1139,event,_113a,_113b,keys,lang,topic,focus,_113c,_113d,_113e,_113f,_1140,_1141,_1142,_1143,_1144,_1145,_1146,_1147){
var _1148=_1134("dijit._TreeNode",[_113e,_113f,_1140,_1141,_1142],{item:null,isTreeNode:true,label:"",_setLabelAttr:{node:"labelNode",type:"innerText"},isExpandable:null,isExpanded:false,state:"UNCHECKED",templateString:_1143,baseClass:"dijitTreeNode",cssStateNodes:{rowNode:"dijitTreeRow",labelNode:"dijitTreeLabel"},_setTooltipAttr:{node:"rowNode",type:"attribute",attribute:"title"},buildRendering:function(){
this.inherited(arguments);
this._setExpando();
this._updateItemClasses(this.item);
if(this.isExpandable){
this.labelNode.setAttribute("aria-expanded",this.isExpanded);
}
this.setSelected(false);
},_setIndentAttr:function(_1149){
var _114a=(Math.max(_1149,0)*this.tree._nodePixelIndent)+"px";
_1139.set(this.domNode,"backgroundPosition",_114a+" 0px");
_1139.set(this.rowNode,this.isLeftToRight()?"paddingLeft":"paddingRight",_114a);
array.forEach(this.getChildren(),function(child){
child.set("indent",_1149+1);
});
this._set("indent",_1149);
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
var _114b="_"+lower+"Class";
var _114c=lower+"Node";
var _114d=this[_114b];
this[_114b]=this.tree["get"+upper+"Class"](item,this.isExpanded);
_1137.replace(this[_114c],this[_114b]||"",_114d||"");
_1139.set(this[_114c],this.tree["get"+upper+"Style"](item,this.isExpanded)||{});
},_updateLayout:function(){
var _114e=this.getParent();
if(!_114e||!_114e.rowNode||_114e.rowNode.style.display=="none"){
_1137.add(this.domNode,"dijitTreeIsRoot");
}else{
_1137.toggle(this.domNode,"dijitTreeIsLast",!this.getNextSibling());
}
},_setExpando:function(_114f){
var _1150=["dijitTreeExpandoLoading","dijitTreeExpandoOpened","dijitTreeExpandoClosed","dijitTreeExpandoLeaf"],_1151=["*","-","+","*"],idx=_114f?0:(this.isExpandable?(this.isExpanded?1:2):3);
_1137.replace(this.expandoNode,_1150[idx],_1150);
this.expandoNodeText.innerHTML=_1151[idx];
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
_1137.add(this.contentNode,"dijitTreeContentExpanded");
this._setExpando();
this._updateItemClasses(this.item);
if(this==this.tree.rootNode&&this.tree.showRoot){
this.tree.domNode.setAttribute("aria-expanded","true");
}
var def,_1152=_113a.wipeIn({node:this.containerNode,duration:_113d.defaultDuration,onEnd:function(){
def.callback(true);
}});
def=(this._expandDeferred=new _1135(function(){
_1152.stop();
}));
_1152.play();
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
_1137.remove(this.contentNode,"dijitTreeContentExpanded");
this._setExpando();
this._updateItemClasses(this.item);
if(!this._wipeOut){
this._wipeOut=_113a.wipeOut({node:this.containerNode,duration:_113d.defaultDuration});
}
this._wipeOut.play();
},indent:0,setChildItems:function(items){
var tree=this.tree,model=tree.model,defs=[];
array.forEach(this.getChildren(),function(child){
_1140.prototype.removeChild.call(this,child);
},this);
this.state="LOADED";
if(items&&items.length>0){
this.isExpandable=true;
array.forEach(items,function(item){
var id=model.getIdentity(item),_1153=tree._itemNodesMap[id],node;
if(_1153){
for(var i=0;i<_1153.length;i++){
if(_1153[i]&&!_1153[i].getParent()){
node=_1153[i];
node.set("indent",this.indent+1);
break;
}
}
}
if(!node){
node=this.tree._createTreeNode({item:item,tree:tree,isExpandable:model.mayHaveChildren(item),label:tree.getLabel(item),tooltip:tree.getTooltip(item),dir:tree.dir,lang:tree.lang,textDir:tree.textDir,indent:this.indent+1});
if(_1153){
_1153.push(node);
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
return new _1136(defs);
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
var _1154=this.getChildren();
if(_1154.length==0){
this.isExpandable=false;
this.collapse();
}
array.forEach(_1154,function(child){
child._updateLayout();
});
},makeExpandable:function(){
this.isExpandable=true;
this._setExpando(false);
},_onLabelFocus:function(){
this.tree._onNodeFocus(this);
},setSelected:function(_1155){
this.labelNode.setAttribute("aria-selected",_1155);
_1137.toggle(this.rowNode,"dijitTreeRowSelected",_1155);
},setFocusable:function(_1156){
this.labelNode.setAttribute("tabIndex",_1156?"0":"-1");
},_onClick:function(evt){
this.tree._onClick(this,evt);
},_onDblClick:function(evt){
this.tree._onDblClick(this,evt);
},_onMouseEnter:function(evt){
this.tree._onNodeMouseEnter(this,evt);
},_onMouseLeave:function(evt){
this.tree._onNodeMouseLeave(this,evt);
},_setTextDirAttr:function(_1157){
if(_1157&&((this.textDir!=_1157)||!this._created)){
this._set("textDir",_1157);
this.applyTextDir(this.labelNode,this.labelNode.innerText||this.labelNode.textContent||"");
array.forEach(this.getChildren(),function(_1158){
_1158.set("textDir",_1157);
},this);
}
}});
var Tree=_1134("dijit.Tree",[_113e,_113f],{store:null,model:null,query:null,label:"",showRoot:true,childrenAttr:["children"],paths:[],path:[],selectedItems:null,selectedItem:null,openOnClick:false,openOnDblClick:false,templateString:_1144,persist:true,autoExpand:false,dndController:_1147,dndParams:["onDndDrop","itemCreator","onDndCancel","checkAcceptance","checkItemAcceptance","dragThreshold","betweenThreshold"],onDndDrop:null,itemCreator:null,onDndCancel:null,checkAcceptance:null,checkItemAcceptance:null,dragThreshold:5,betweenThreshold:0,_nodePixelIndent:19,_publish:function(_1159,_115a){
topic.publish(this.id,lang.mixin({tree:this,event:_1159},_115a||{}));
},postMixInProperties:function(){
this.tree=this;
if(this.autoExpand){
this.persist=false;
}
this._itemNodesMap={};
if(!this.cookieName&&this.id){
this.cookieName=this.id+"SaveStateCookie";
}
this._loadDeferred=new _1135();
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
var _115b={};
for(var i=0;i<this.dndParams.length;i++){
if(this[this.dndParams[i]]){
_115b[this.dndParams[i]]=this[this.dndParams[i]];
}
}
this.dndController=new this.dndController(this,_115b);
}
this._load();
},_store2model:function(){
this._v10Compat=true;
_113b.deprecated("Tree: from version 2.0, should specify a model object rather than a store/query");
var _115c={id:this.id+"_ForestStoreModel",store:this.store,query:this.query,childrenAttrs:this.childrenAttr};
if(this.params.mayHaveChildren){
_115c.mayHaveChildren=lang.hitch(this,"mayHaveChildren");
}
if(this.params.getItemChildren){
_115c.getChildren=lang.hitch(this,function(item,_115d,_115e){
this.getItemChildren((this._v10Compat&&item===this.model.root)?null:item,_115d,_115e);
});
}
this.model=new _1146(_115c);
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
var _115f=this.model.getIdentity(item);
if(this._itemNodesMap[_115f]){
this._itemNodesMap[_115f].push(rn);
}else{
this._itemNodesMap[_115f]=[rn];
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
var _1160=lang.isString(item)?item:this.model.getIdentity(item);
return [].concat(this._itemNodesMap[_1160]);
},_setSelectedItemAttr:function(item){
this.set("selectedItems",[item]);
},_setSelectedItemsAttr:function(items){
var tree=this;
this._loadDeferred.addCallback(lang.hitch(this,function(){
var _1161=array.map(items,function(item){
return (!item||lang.isString(item))?item:tree.model.getIdentity(item);
});
var nodes=[];
array.forEach(_1161,function(id){
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
return new _1136(array.map(paths,function(path){
var d=new _1135();
path=array.map(path,function(item){
return lang.isString(item)?item:tree.model.getIdentity(item);
});
if(path.length){
tree._loadDeferred.addCallback(function(){
_1162(path,[tree.rootNode],d);
});
}else{
d.errback("Empty path");
}
return d;
})).addCallback(_1163);
function _1162(path,nodes,def){
var _1164=path.shift();
var _1165=array.filter(nodes,function(node){
return node.getIdentity()==_1164;
})[0];
if(!!_1165){
if(path.length){
tree._expandNode(_1165).addCallback(function(){
_1162(path,_1165.getChildren(),def);
});
}else{
def.callback(_1165);
}
}else{
def.errback("Could not expand path at "+_1164);
}
};
function _1163(_1166){
tree.set("selectedNodes",array.map(array.filter(_1166,function(x){
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
},getIconClass:function(item,_1167){
return (!item||this.model.mayHaveChildren(item))?(_1167?"dijitFolderOpened":"dijitFolderClosed"):"dijitLeaf";
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
var _1168=_113c.getEnclosingWidget(e.target);
if(!_1168){
return;
}
var key=e.charOrCode;
if(typeof key=="string"&&key!=" "){
if(!e.altKey&&!e.ctrlKey&&!e.shiftKey&&!e.metaKey){
this._onLetterKeyNav({node:_1168,key:key.toLowerCase()});
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
this[this._keyHandlerMap[key]]({node:_1168,item:_1168.item,evt:e});
event.stop(e);
}
}
},_onEnterKey:function(_1169){
this._publish("execute",{item:_1169.item,node:_1169.node});
this.dndController.userSelect(_1169.node,_1132.isCopyKey(_1169.evt),_1169.evt.shiftKey);
this.onClick(_1169.item,_1169.node,_1169.evt);
},_onDownArrow:function(_116a){
var node=this._getNextNode(_116a.node);
if(node&&node.isTreeNode){
this.focusNode(node);
}
},_onUpArrow:function(_116b){
var node=_116b.node;
var _116c=node.getPreviousSibling();
if(_116c){
node=_116c;
while(node.isExpandable&&node.isExpanded&&node.hasChildren()){
var _116d=node.getChildren();
node=_116d[_116d.length-1];
}
}else{
var _116e=node.getParent();
if(!(!this.showRoot&&_116e===this.rootNode)){
node=_116e;
}
}
if(node&&node.isTreeNode){
this.focusNode(node);
}
},_onRightArrow:function(_116f){
var node=_116f.node;
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
},_onLeftArrow:function(_1170){
var node=_1170.node;
if(node.isExpandable&&node.isExpanded){
this._collapseNode(node);
}else{
var _1171=node.getParent();
if(_1171&&_1171.isTreeNode&&!(!this.showRoot&&_1171===this.rootNode)){
this.focusNode(_1171);
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
},multiCharSearchDuration:250,_onLetterKeyNav:function(_1172){
var cs=this._curSearch;
if(cs){
cs.pattern=cs.pattern+_1172.key;
clearTimeout(cs.timer);
}else{
cs=this._curSearch={pattern:_1172.key,startNode:_1172.node};
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
},isExpandoNode:function(node,_1173){
return dom.isDescendant(node,_1173.expandoNode);
},_onClick:function(_1174,e){
var _1175=e.target,_1176=this.isExpandoNode(_1175,_1174);
if((this.openOnClick&&_1174.isExpandable)||_1176){
if(_1174.isExpandable){
this._onExpandoClick({node:_1174});
}
}else{
this._publish("execute",{item:_1174.item,node:_1174,evt:e});
this.onClick(_1174.item,_1174,e);
this.focusNode(_1174);
}
event.stop(e);
},_onDblClick:function(_1177,e){
var _1178=e.target,_1179=(_1178==_1177.expandoNode||_1178==_1177.expandoNodeText);
if((this.openOnDblClick&&_1177.isExpandable)||_1179){
if(_1177.isExpandable){
this._onExpandoClick({node:_1177});
}
}else{
this._publish("execute",{item:_1177.item,node:_1177,evt:e});
this.onDblClick(_1177.item,_1177,e);
this.focusNode(_1177);
}
event.stop(e);
},_onExpandoClick:function(_117a){
var node=_117a.node;
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
var _117b=node.getNextSibling();
if(_117b){
return _117b;
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
},_expandNode:function(node,_117c){
if(node._expandNodeDeferred&&!_117c){
return node._expandNodeDeferred;
}
var model=this.model,item=node.item,_117d=this;
switch(node.state){
case "UNCHECKED":
node.markProcessing();
var def=(node._expandNodeDeferred=new _1135());
model.getChildren(item,function(items){
node.unmarkProcessing();
var scid=node.setChildItems(items);
var ed=_117d._expandNode(node,true);
scid.addCallback(function(){
ed.addCallback(function(){
def.callback();
});
});
},function(err){
console.error(_117d,": error loading root children: ",err);
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
var model=this.model,_117e=model.getIdentity(item),nodes=this._itemNodesMap[_117e];
if(nodes){
var label=this.getLabel(item),_117f=this.getTooltip(item);
array.forEach(nodes,function(node){
node.set({item:item,label:label,tooltip:_117f});
node._updateItemClasses(item);
});
}
},_onItemChildrenChange:function(_1180,_1181){
var model=this.model,_1182=model.getIdentity(_1180),_1183=this._itemNodesMap[_1182];
if(_1183){
array.forEach(_1183,function(_1184){
_1184.setChildItems(_1181);
});
}
},_onItemDelete:function(item){
var model=this.model,_1185=model.getIdentity(item),nodes=this._itemNodesMap[_1185];
if(nodes){
array.forEach(nodes,function(node){
this.dndController.removeTreeNode(node);
var _1186=node.getParent();
if(_1186){
_1186.removeChild(node);
}
node.destroyRecursive();
},this);
delete this._itemNodesMap[_1185];
}
},_initState:function(){
this._openedNodes={};
if(this.persist&&this.cookieName){
var oreo=_1133(this.cookieName);
if(oreo){
array.forEach(oreo.split(","),function(item){
this._openedNodes[item]=true;
},this);
}
}
},_state:function(node,_1187){
if(!this.persist){
return false;
}
var path=array.map(node.getTreePath(),function(item){
return this.model.getIdentity(item);
},this).join("/");
if(arguments.length===1){
return this._openedNodes[path];
}else{
if(_1187){
this._openedNodes[path]=true;
}else{
delete this._openedNodes[path];
}
var ary=[];
for(var id in this._openedNodes){
ary.push(id);
}
_1133(this.cookieName,ary.join(","),{expires:365});
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
},resize:function(_1188){
if(_1188){
_1138.setMarginBox(this.domNode,_1188);
}
this._nodePixelIndent=_1138.position(this.tree.indentDetector).w;
if(this.tree.rootNode){
this.tree.rootNode.set("indent",this.showRoot?0:-1);
}
},_createTreeNode:function(args){
return new _1148(args);
},_setTextDirAttr:function(_1189){
if(_1189&&this.textDir!=_1189){
this._set("textDir",_1189);
this.rootNode.set("textDir",_1189);
}
}});
Tree._TreeNode=_1148;
return Tree;
});
},"dijit/form/_FormValueWidget":function(){
define("dijit/form/_FormValueWidget",["dojo/_base/declare","dojo/_base/sniff","./_FormWidget","./_FormValueMixin"],function(_118a,has,_118b,_118c){
return _118a("dijit.form._FormValueWidget",[_118b,_118c],{_layoutHackIE7:function(){
if(has("ie")==7){
var _118d=this.domNode;
var _118e=_118d.parentNode;
var _118f=_118d.firstChild||_118d;
var _1190=_118f.style.filter;
var _1191=this;
while(_118e&&_118e.clientHeight==0){
(function ping(){
var _1192=_1191.connect(_118e,"onscroll",function(){
_1191.disconnect(_1192);
_118f.style.filter=(new Date()).getMilliseconds();
setTimeout(function(){
_118f.style.filter=_1190;
},0);
});
})();
_118e=_118e.parentNode;
}
}
}});
});
},"curam/util/TabActionsMenu":function(){
define("curam/util/TabActionsMenu",["curam/tab","curam/debug","curam/define","curam/util","curam/util/Refresh","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1193=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.TabActionsMenu",{_tabMenuStates:{},getRefreshParams:function(_1194){
curam.debug.log("curam.util.TabActionsMenu.getRefreshParams(%s)",_1194);
if(!curam.util.TabActionsMenu.dynamicMenuBarData[_1194]){
curam.debug.log(_1193.getProperty("curam.util.TabActionsMenu.no.dynamic"));
return null;
}
var _1195="menuId="+curam.util.TabActionsMenu.dynamicMenuBarData[_1194].menuBarId;
_1195+="&menuItemIds="+curam.util.toCommaSeparatedList(curam.util.TabActionsMenu.dynamicMenuBarData[_1194].dynamicMenuItemIds);
_1195+="&menuLoaders="+curam.util.toCommaSeparatedList(curam.util.TabActionsMenu.dynamicMenuBarData[_1194].dynamicMenuLoaders);
_1195+="&menuPageParameters="+curam.util.TabActionsMenu.dynamicMenuBarData[_1194].pageParameters;
return _1195;
},updateMenuItemStates:function(_1196,data){
var _1197=data.menuData;
var _1198=function(){
for(var i=0;i<_1197.itemStates.length;i++){
curam.util.TabActionsMenu.updateMenuItemState(_1197.itemStates[i],_1196);
}
};
if(curam.util.TabActionsMenu._isMenuCreated(_1196)){
_1198();
}else{
var _1199=curam.util.getTopmostWindow();
var _119a=_1199.dojo.subscribe("/curam/menu/created",this,function(tabId){
curam.debug.log("Received /curam/menu/created "+_1193.getProperty("curam.util.ExpandableLists.load.for"),tabId);
if(tabId==_1196){
curam.debug.log(_1193.getProperty("curam.util.TabActionsMenu.match"));
curam.util.TabActionsMenu._tabMenuStates[tabId]=true;
_1198();
_1199.dojo.unsubscribe(_119a);
}
});
curam.tab.unsubscribeOnTabClose(_119a,_1196);
}
},_isMenuCreated:function(tabId){
return curam.util.TabActionsMenu._tabMenuStates[tabId]==true;
},updateMenuItemState:function(_119b,_119c){
var _119d=dijit.byId("menuItem_"+_119c+"_"+_119b.id);
if(_119d!=null){
_119d.disabled=!_119b.enabled;
curam.util.swapState(_119d.domNode,_119b.enabled,"enabled","disabled");
curam.util.swapState(_119d.domNode,_119b.visible,"visible","hidden");
if(_119d.disabled){
_119d.domNode.setAttribute("aria-disabled","true");
}
}
},setupHandlers:function(_119e){
curam.util.Refresh.setMenuBarCallbacks(curam.util.TabActionsMenu.updateMenuItemStates,curam.util.TabActionsMenu.getRefreshParams);
var _119f=function(){
var _11a0=function(_11a1,_11a2){
return curam.util.Refresh.refreshMenuAndNavigation(_11a2,true,true,true);
};
var _11a3=curam.tab.getHandlerForTab(_11a0,_119e);
var _11a4=curam.util.getTopmostWindow();
var _11a5=_11a4.dojo.subscribe("curam.tabOpened",null,function(_11a6,_11a7){
_11a3(_11a6,_11a7);
_11a4.dojo.unsubscribe(_11a5);
});
};
curam.util.TabActionsMenu.dynamicMenuBarData[_119e].registerTabOpenHandler=_119f;
curam.util.TabActionsMenu.dynamicMenuBarData[_119e].registerTabOpenHandler();
curam.tab.executeOnTabClose(function(){
curam.util.TabActionsMenu.dynamicMenuBarData[_119e].registerTabOpenHandler=null;
delete curam.util.TabActionsMenu.dynamicMenuBarData[_119e];
},_119e);
},handleOnClick:function(url,_11a8){
if(_11a8){
curam.tab.getTabController().handleDownLoadClick(url);
}else{
curam.tab.getTabController().handleLinkClick(url);
}
},handleOnClickModal:function(url,_11a9){
var _11aa={dialogOptions:_11a9};
curam.tab.getTabController().handleLinkClick(url,_11aa);
}});
return curam.util.TabActionsMenu;
});
},"url:curam/widget/templates/_TabButton.html":"<div role=\"presentation\" data-dojo-attach-point=\"titleNode\" data-dojo-attach-event='onclick:onClick' class='dijitTab'>\r\n    <div role=\"presentation\" class='dijitTabInnerDiv' data-dojo-attach-point='innerDiv'>\r\n        <div role=\"presentation\" class='dijitTabContent' data-dojo-attach-point='tabContent'>\r\n          <div role=\"presentation\" aria-labelledby='${id}_tabLabel'>\r\n            <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" data-dojo-attach-point='iconNode' />\r\n            <span data-dojo-attach-point='containerNode,focusNode' class='tabLabel' id='${id}_tabLabel'></span>\r\n            <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\r\n                data-dojo-attach-event='onclick: onClickCloseButton' role=\"presentation\">\r\n                <span data-dojo-attach-point='closeText' class='dijitTabCloseText'>Close Tab</span\r\n            ></span>\r\n      </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n","*now":function(r){
r(["dojo/i18n!*preload*dojo/nls/cdej*[\"ar\",\"ca\",\"cs\",\"da\",\"de\",\"el\",\"en-gb\",\"en-us\",\"es-es\",\"fi-fi\",\"fr-fr\",\"he-il\",\"hu\",\"it-it\",\"ja-jp\",\"ko-kr\",\"nl-nl\",\"nb\",\"pl\",\"pt-br\",\"pt-pt\",\"ru\",\"sk\",\"sl\",\"sv\",\"th\",\"tr\",\"zh-tw\",\"zh-cn\",\"ROOT\"]"]);
}}});
define("dojo/cdej",[],1);
