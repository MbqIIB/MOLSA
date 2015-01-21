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
this.containerNode._width=0;
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
if(this.isLeftToRight()){
this._tabsWidth=_14a.offsetLeft+_14b;
}else{
var _14c=_149[_149.length-1].domNode;
this._tabsWidth=_14a.offsetLeft+_14b-_14c.offsetLeft;
}
return this._tabsWidth;
}else{
return 0;
}
},_enableBtn:function(_14d){
var _14e=this._getTabsWidth();
_14d=_14d||_12b.get(this.scrollNode,"width");
return _14e>0&&_14d<_14e;
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
var _14f=this._enableBtn(this._contentBox.w);
this._buttons.style("display",_14f?"":"none");
this._leftBtn.layoutAlign="left";
this._rightBtn.layoutAlign="right";
this._menuBtn.layoutAlign=this.isLeftToRight()?"right":"left";
var _150;
if(_14f){
_150=dijit.layout.layoutChildren(this.domNode,this._contentBox,[this._menuBtn,this._leftBtn,this._rightBtn,{domNode:this.scrollNode,layoutAlign:"client",fakeWidget:true}]);
}else{
_150=dijit.layout.layoutChildren(this.domNode,this._contentBox,[{domNode:this.scrollNode,layoutAlign:"client",fakeWidget:true}]);
}
this.scrollNode._width=_150.client.w;
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
return (this.isLeftToRight()||has("ie")<8||(has("ie")&&has("quirks"))||has("webkit"))?this.scrollNode.scrollLeft:_12b.get(this.containerNode,"width")-_12b.get(this.scrollNode,"width")+(has("ie")>=8?-1:1)*this.scrollNode.scrollLeft;
},_convertToScrollLeft:function(val){
if(this.isLeftToRight()||has("ie")<8||(has("ie")&&has("quirks"))||has("webkit")){
return val;
}else{
var _151=_12b.get(this.containerNode,"width")-_12b.get(this.scrollNode,"width");
return (has("ie")>=8?-1:1)*(val-_151);
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
var _152=this._getNodeWidth(this.scrollNode);
if(this._getTabsWidth()<_152){
tab.onClick(null);
}else{
var sl=this._getScroll();
if(sl>node.offsetLeft||sl+_152<node.offsetLeft+this._getNodeWidth(node)){
this.createSmoothScroll().play();
}
}
}
}
this.inherited(arguments);
},_getScrollBounds:function(){
var _153=this.getChildren(),_154=this._getNodeWidth(this.scrollNode),_155=this._getNodeWidth(this.containerNode),_156=_155-_154,_157=this._getTabsWidth();
if(_153.length&&_157>_154){
return {min:this.isLeftToRight()?0:_153[_153.length-1].domNode.offsetLeft-10,max:this.isLeftToRight()?_157-_154:_156};
}else{
var _158=this.isLeftToRight()?0:_156;
return {min:_158,max:_158};
}
},_getScrollForSelectedTab:function(){
var w=this.scrollNode,n=this._selectedTab,_159=_12b.get(this.scrollNode,"width"),_15a=this._getScrollBounds();
var pos=(n.offsetLeft+_12b.get(n,"width")/2)-_159/2;
pos=Math.min(Math.max(pos,_15a.min),_15a.max);
return pos;
},createSmoothScroll:function(x){
if(arguments.length>0){
var _15b=this._getScrollBounds();
x=Math.min(Math.max(x,_15b.min),_15b.max);
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
},doSlide:function(_15c,node){
if(node&&_129.contains(node,"dijitTabDisabled")){
return;
}
var _15d=_12b.get(this.scrollNode,"width");
var d=(_15d*0.75)*_15c;
var to=this._getScroll()+d;
this._setButtonClass(to);
this.createSmoothScroll(to).play();
},_setButtonClass:function(_15e){
var _15f=this._getScrollBounds();
this._leftBtn.set("disabled",_15e<=_15f.min);
this._rightBtn.set("disabled",_15e>=_15f.max);
}});
var _160=_128("dijit.layout._ScrollingTabControllerButtonMixin",null,{baseClass:"dijitTab tabStripButton",templateString:_12f,tabIndex:"",isFocusable:function(){
return false;
}});
_128("dijit.layout._ScrollingTabControllerButton",[_134,_160]);
_128("dijit.layout._ScrollingTabControllerMenuButton",[_134,_135,_160],{containerId:"",tabIndex:"-1",isLoaded:function(){
return false;
},loadDropDown:function(_161){
this.dropDown=new Menu({id:this.containerId+"_menu",dir:this.dir,lang:this.lang,textDir:this.textDir});
var _162=_12d.byId(this.containerId);
_127.forEach(_162.getChildren(),function(page){
var _163=new _133({id:page.id+"_stcMi",label:page.title,iconClass:page.iconClass,dir:page.dir,lang:page.lang,textDir:page.textDir,onClick:function(){
_162.selectChild(page);
}});
this.dropDown.addChild(_163);
},this);
dojo.forEach(this.dropDown.getChildren(),lang.hitch(this,function(_164){
var _165=_164.id.split(this._curamOwnerController._tablistMenuItemIdSuffix)[0];
this._curamOwnerController._setCuramAvailability(_164,_165);
this._curamOwnerController._setCuramVisibility(_164,_165);
dojo.connect(_164,"destroy",function(){
setDynState=null;
});
}));
_161();
},closeDropDown:function(_166){
this.inherited(arguments);
if(this.dropDown){
this.dropDown.destroyRecursive();
delete this.dropDown;
}
}});
return _136;
});
},"url:dijit/form/templates/ComboButton.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" data-dojo-attach-point=\"buttonNode\" data-dojo-attach-event=\"ondijitclick:_onClick,onkeypress:_onButtonKeyPress\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" data-dojo-attach-point=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdata-dojo-attach-point=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdata-dojo-attach-event=\"onkeypress:_onArrowKeyPress\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" data-dojo-attach-point=\"valueNode\"\n\t\t/></td></tr></tbody\n></table>\n","dijit/place":function(){
define("dijit/place",["dojo/_base/array","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/window","dojo/window",".","dojo/_base/lang"],function(_167,_168,_169,_16a,win,_16b,_16c,lang){
function _16d(node,_16e,_16f,_170){
var view=_16b.getBox();
if(!node.parentNode||String(node.parentNode.tagName).toLowerCase()!="body"){
win.body().appendChild(node);
}
var best=null;
_167.some(_16e,function(_171){
var _172=_171.corner;
var pos=_171.pos;
var _173=0;
var _174={w:{"L":view.l+view.w-pos.x,"R":pos.x-view.l,"M":view.w}[_172.charAt(1)],h:{"T":view.t+view.h-pos.y,"B":pos.y-view.t,"M":view.h}[_172.charAt(0)]};
if(_16f){
var res=_16f(node,_171.aroundCorner,_172,_174,_170);
_173=typeof res=="undefined"?0:res;
}
var _175=node.style;
var _176=_175.display;
var _177=_175.visibility;
if(_175.display=="none"){
_175.visibility="hidden";
_175.display="";
}
var mb=_168.getMarginBox(node);
_175.display=_176;
_175.visibility=_177;
var _178={"L":pos.x,"R":pos.x-mb.w,"M":Math.max(view.l,Math.min(view.l+view.w,pos.x+(mb.w>>1))-mb.w)}[_172.charAt(1)],_179={"T":pos.y,"B":pos.y-mb.h,"M":Math.max(view.t,Math.min(view.t+view.h,pos.y+(mb.h>>1))-mb.h)}[_172.charAt(0)],_17a=Math.max(view.l,_178),_17b=Math.max(view.t,_179),endX=Math.min(view.l+view.w,_178+mb.w),endY=Math.min(view.t+view.h,_179+mb.h),_17c=endX-_17a,_17d=endY-_17b;
_173+=(mb.w-_17c)+(mb.h-_17d);
var l=_168.isBodyLtr();
if(lang.exists("curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm")&&curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm==true){
if((_172.charAt(0)=="T"||(_172.charAt(1)=="L"&&l)||(_172.charAt(1)=="R"&&!l))&&_173>0){
_173=mb.w+mb.h;
}
}
if(best==null||_173<best.overflow){
best={corner:_172,aroundCorner:_171.aroundCorner,x:_17a,y:_17b,w:_17c,h:_17d,overflow:_173,spaceAvailable:_174};
}
return !_173;
});
if(best.overflow&&_16f){
_16f(node,best.aroundCorner,best.corner,best.spaceAvailable,_170);
}
var l=_168.isBodyLtr(),s=node.style;
s.top=best.y+"px";
s[l?"left":"right"]=(l?best.x:view.w-best.x-best.w)+"px";
s[l?"right":"left"]="auto";
return best;
};
return (_16c.place={at:function(node,pos,_17e,_17f){
var _180=_167.map(_17e,function(_181){
var c={corner:_181,pos:{x:pos.x,y:pos.y}};
if(_17f){
c.pos.x+=_181.charAt(1)=="L"?_17f.x:-_17f.x;
c.pos.y+=_181.charAt(0)=="T"?_17f.y:-_17f.y;
}
return c;
});
return _16d(node,_180);
},around:function(node,_182,_183,_184,_185){
var _186=(typeof _182=="string"||"offsetWidth" in _182)?_168.position(_182,true):_182;
if(_182.parentNode){
var _187=_169.getComputedStyle(_182).position=="absolute";
var _188=_182.parentNode;
while(_188&&_188.nodeType==1&&_188.nodeName!="BODY"){
var _189=_168.position(_188,true),pcs=_169.getComputedStyle(_188);
if(/relative|absolute/.test(pcs.position)){
_187=false;
}
if(!_187&&/hidden|auto|scroll/.test(pcs.overflow)){
var _18a=Math.min(_186.y+_186.h,_189.y+_189.h);
var _18b=Math.min(_186.x+_186.w,_189.x+_189.w);
_186.x=Math.max(_186.x,_189.x);
_186.y=Math.max(_186.y,_189.y);
_186.h=_18a-_186.y;
_186.w=_18b-_186.x;
}
if(pcs.position=="absolute"){
_187=true;
}
_188=_188.parentNode;
}
}
var x=_186.x,y=_186.y,_18c="w" in _186?_186.w:(_186.w=_186.width),_18d="h" in _186?_186.h:(_16a.deprecated("place.around: dijit.place.__Rectangle: { x:"+x+", y:"+y+", height:"+_186.height+", width:"+_18c+" } has been deprecated.  Please use { x:"+x+", y:"+y+", h:"+_186.height+", w:"+_18c+" }","","2.0"),_186.h=_186.height);
var _18e=[];
function push(_18f,_190){
_18e.push({aroundCorner:_18f,corner:_190,pos:{x:{"L":x,"R":x+_18c,"M":x+(_18c>>1)}[_18f.charAt(1)],y:{"T":y,"B":y+_18d,"M":y+(_18d>>1)}[_18f.charAt(0)]}});
};
_167.forEach(_183,function(pos){
var ltr=_184;
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
var _191=_16d(node,_18e,_185,{w:_18c,h:_18d});
_191.aroundNodePos=_186;
return _191;
}});
});
},"dijit/_HasDropDown":function(){
define("dijit/_HasDropDown",["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/keys","dojo/_base/lang","dojo/touch","dojo/_base/window","dojo/window","./registry","./focus","./popup","./_FocusMixin"],function(_192,_193,_194,dom,_195,_196,_197,_198,has,keys,lang,_199,win,_19a,_19b,_19c,_19d,_19e){
return _192("dijit._HasDropDown",_19e,{_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:true,forceWidth:false,maxHeight:0,dropDownPosition:["below","above"],_stopClickEvents:true,_onDropDownMouseDown:function(e){
if(this.disabled||this.readOnly){
return;
}
e.preventDefault();
this._docHandler=this.connect(win.doc,_199.release,"_onDropDownMouseUp");
this.toggleDropDown();
},_onDropDownMouseUp:function(e){
if(e&&this._docHandler){
this.disconnect(this._docHandler);
}
var _19f=this.dropDown,_1a0=false;
if(e&&this._opened){
var c=_197.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_1a0){
if(_196.contains(t,"dijitPopup")){
_1a0=true;
}else{
t=t.parentNode;
}
}
if(_1a0){
t=e.target;
if(_19f.onItemClick){
var _1a1;
while(t&&!(_1a1=_19b.byNode(t))){
t=t.parentNode;
}
if(_1a1&&_1a1.onClick&&_1a1.getParent){
_1a1.getParent().onItemClick(_1a1,e);
}
}
return;
}
}
}
if(this._opened){
if(_19f.focus&&_19f.autoFocus!==false){
window.setTimeout(lang.hitch(_19f,"focus"),1);
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
_194.stop(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _1a2={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
_196.add(this._arrowWrapperNode||this._buttonNode,"dijit"+_1a2+"ArrowButton");
},postCreate:function(){
this.inherited(arguments);
this.connect(this._buttonNode,_199.press,"_onDropDownMouseDown");
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
var d=this.dropDown,_1a3=e.target;
if(d&&this._opened&&d.handleKey){
if(d.handleKey(e)===false){
_194.stop(e);
return;
}
}
if(d&&this._opened&&e.charOrCode==keys.ESCAPE){
this.closeDropDown();
_194.stop(e);
}else{
if(!this._opened&&(e.charOrCode==keys.DOWN_ARROW||((e.charOrCode==keys.ENTER||e.charOrCode==" ")&&((_1a3.tagName||"").toLowerCase()!=="input"||(_1a3.type&&_1a3.type.toLowerCase()!=="text"))))){
this._toggleOnKeyUp=true;
_194.stop(e);
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
var _1a4=_19c.curNode&&this.dropDown&&dom.isDescendant(_19c.curNode,this.dropDown.domNode);
this.closeDropDown(_1a4);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_1a5){
_1a5();
},loadAndOpenDropDown:function(){
var d=new _193(),_1a6=lang.hitch(this,function(){
this.openDropDown();
d.resolve(this.dropDown);
});
if(!this.isLoaded()){
this.loadDropDown(_1a6);
}else{
_1a6();
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
var _1a7=this.dropDown,_1a8=_1a7.domNode,_1a9=this._aroundNode||this.domNode,self=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_1a8.style.width){
this._explicitDDWidth=true;
}
if(_1a8.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _1aa={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_1aa.width="";
}
if(!this._explicitDDHeight){
_1aa.height="";
}
_198.set(_1a8,_1aa);
var _1ab=this.maxHeight;
if(_1ab==-1){
var _1ac=_19a.getBox(),_1ad=_197.position(_1a9,false);
_1ab=Math.floor(Math.max(_1ad.y,_1ac.h-(_1ad.y+_1ad.h)));
}
_19d.moveOffScreen(_1a7);
if(_1a7.startup&&!_1a7._started){
_1a7.startup();
}
var mb=_197.getMarginSize(_1a8);
var _1ae=(_1ab&&mb.h>_1ab);
_198.set(_1a8,{overflowX:"hidden",overflowY:_1ae?"auto":"hidden"});
if(_1ae){
mb.h=_1ab;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_1a9.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_1a9.offsetWidth);
}else{
delete mb.w;
}
}
if(lang.isFunction(_1a7.resize)){
_1a7.resize(mb);
}else{
_197.setMarginBox(_1a8,mb);
}
}
var _1af=_19d.open({parent:this,popup:_1a7,around:_1a9,orient:this.dropDownPosition,onExecute:function(){
self.closeDropDown(true);
},onCancel:function(){
self.closeDropDown(true);
},onClose:function(){
_195.set(self._popupStateNode,"popupActive",false);
_196.remove(self._popupStateNode,"dijitHasDropDownOpen");
self._opened=false;
}});
_195.set(this._popupStateNode,"popupActive","true");
_196.add(self._popupStateNode,"dijitHasDropDownOpen");
this._opened=true;
return _1af;
},closeDropDown:function(_1b0){
if(this._opened){
if(_1b0){
this.focus();
}
_19d.close(this.dropDown);
this._opened=false;
}
}});
});
},"curam/util/Request":function(){
define("curam/util/Request",["dojo/_base/xhr","curam/debug","curam/util/ResourceBundle","curam/util/LocalConfig"],function(xhr,_1b1,_1b2,_1b3){
dojo.requireLocalization("curam.application","Request");
var _1b4=new _1b2("Request"),_1b5=null,_1b6=function(_1b7){
if(_1b5){
return _1b5(_1b7);
}else{
return _1b7.responseText.indexOf("action=\"j_security_check\"")>0;
}
},_1b8=function(err,_1b9){
if(_1b6(_1b9.xhr)){
_1b1.log(_1b4.getProperty("sessionExpired"));
alert(_1b4.getProperty("sessionExpired"));
}else{
_1b1.log(_1b4.getProperty("ajaxError"));
alert(_1b4.getProperty("ajaxError"));
}
_1b1.log(err);
_1b1.log("HTTP status was: "+_1b9.xhr.status);
},_1ba=function(_1bb,args){
var _1bc=_1b3.readOption("ajaxDebugMode","false")=="true";
var _1bd=args.error;
if(_1bc){
args.error=function(err,_1be){
if(args.errorHandlerOverrideDefault!==true){
_1b8(err,_1be);
}
if(_1bd){
_1bd(err,_1be);
}
};
}
var _1bf=_1bb(args);
return _1bf;
};
var _1c0={post:function(args){
return _1ba(xhr.post,args);
},get:function(args){
return _1ba(xhr.get,args);
},setLoginPageDetector:function(_1c1){
_1b5=_1c1;
}};
return _1c0;
});
},"dijit/tree/TreeStoreModel":function(){
define("dijit/tree/TreeStoreModel",["dojo/_base/array","dojo/aspect","dojo/_base/declare","dojo/_base/json","dojo/_base/lang"],function(_1c2,_1c3,_1c4,json,lang){
return _1c4("dijit.tree.TreeStoreModel",null,{store:null,childrenAttrs:["children"],newItemIdAttr:"id",labelAttr:"",root:null,query:null,deferItemLoadingUntilExpand:false,constructor:function(args){
lang.mixin(this,args);
this.connects=[];
var _1c5=this.store;
if(!_1c5.getFeatures()["dojo.data.api.Identity"]){
throw new Error("dijit.Tree: store must support dojo.data.Identity");
}
if(_1c5.getFeatures()["dojo.data.api.Notification"]){
this.connects=this.connects.concat([_1c3.after(_1c5,"onNew",lang.hitch(this,"onNewItem"),true),_1c3.after(_1c5,"onDelete",lang.hitch(this,"onDeleteItem"),true),_1c3.after(_1c5,"onSet",lang.hitch(this,"onSetItem"),true)]);
}
},destroy:function(){
var h;
while(h=this.connects.pop()){
h.remove();
}
},getRoot:function(_1c6,_1c7){
if(this.root){
_1c6(this.root);
}else{
this.store.fetch({query:this.query,onComplete:lang.hitch(this,function(_1c8){
if(_1c8.length!=1){
throw new Error(this.declaredClass+": query "+json.stringify(this.query)+" returned "+_1c8.length+" items, but must return exactly one item");
}
this.root=_1c8[0];
_1c6(this.root);
}),onError:_1c7});
}
},mayHaveChildren:function(item){
return _1c2.some(this.childrenAttrs,function(attr){
return this.store.hasAttribute(item,attr);
},this);
},getChildren:function(_1c9,_1ca,_1cb){
var _1cc=this.store;
if(!_1cc.isItemLoaded(_1c9)){
var _1cd=lang.hitch(this,arguments.callee);
_1cc.loadItem({item:_1c9,onItem:function(_1ce){
_1cd(_1ce,_1ca,_1cb);
},onError:_1cb});
return;
}
var _1cf=[];
for(var i=0;i<this.childrenAttrs.length;i++){
var vals=_1cc.getValues(_1c9,this.childrenAttrs[i]);
_1cf=_1cf.concat(vals);
}
var _1d0=0;
if(!this.deferItemLoadingUntilExpand){
_1c2.forEach(_1cf,function(item){
if(!_1cc.isItemLoaded(item)){
_1d0++;
}
});
}
if(_1d0==0){
_1ca(_1cf);
}else{
_1c2.forEach(_1cf,function(item,idx){
if(!_1cc.isItemLoaded(item)){
_1cc.loadItem({item:item,onItem:function(item){
_1cf[idx]=item;
if(--_1d0==0){
_1ca(_1cf);
}
},onError:_1cb});
}
});
}
},isItem:function(_1d1){
return this.store.isItem(_1d1);
},fetchItemByIdentity:function(_1d2){
this.store.fetchItemByIdentity(_1d2);
},getIdentity:function(item){
return this.store.getIdentity(item);
},getLabel:function(item){
if(this.labelAttr){
return this.store.getValue(item,this.labelAttr);
}else{
return this.store.getLabel(item);
}
},newItem:function(args,_1d3,_1d4){
var _1d5={parent:_1d3,attribute:this.childrenAttrs[0]},_1d6;
if(this.newItemIdAttr&&args[this.newItemIdAttr]){
this.fetchItemByIdentity({identity:args[this.newItemIdAttr],scope:this,onItem:function(item){
if(item){
this.pasteItem(item,null,_1d3,true,_1d4);
}else{
_1d6=this.store.newItem(args,_1d5);
if(_1d6&&(_1d4!=undefined)){
this.pasteItem(_1d6,_1d3,_1d3,false,_1d4);
}
}
}});
}else{
_1d6=this.store.newItem(args,_1d5);
if(_1d6&&(_1d4!=undefined)){
this.pasteItem(_1d6,_1d3,_1d3,false,_1d4);
}
}
},pasteItem:function(_1d7,_1d8,_1d9,_1da,_1db){
var _1dc=this.store,_1dd=this.childrenAttrs[0];
if(_1d8){
_1c2.forEach(this.childrenAttrs,function(attr){
if(_1dc.containsValue(_1d8,attr,_1d7)){
if(!_1da){
var _1de=_1c2.filter(_1dc.getValues(_1d8,attr),function(x){
return x!=_1d7;
});
_1dc.setValues(_1d8,attr,_1de);
}
_1dd=attr;
}
});
}
if(_1d9){
if(typeof _1db=="number"){
var _1df=_1dc.getValues(_1d9,_1dd).slice();
_1df.splice(_1db,0,_1d7);
_1dc.setValues(_1d9,_1dd,_1df);
}else{
_1dc.setValues(_1d9,_1dd,_1dc.getValues(_1d9,_1dd).concat(_1d7));
}
}
},onChange:function(){
},onChildrenChange:function(){
},onDelete:function(){
},onNewItem:function(item,_1e0){
if(!_1e0){
return;
}
this.getChildren(_1e0.item,lang.hitch(this,function(_1e1){
this.onChildrenChange(_1e0.item,_1e1);
}));
},onDeleteItem:function(item){
this.onDelete(item);
},onSetItem:function(item,_1e2){
if(_1c2.indexOf(this.childrenAttrs,_1e2)!=-1){
this.getChildren(item,lang.hitch(this,function(_1e3){
this.onChildrenChange(item,_1e3);
}));
}else{
this.onChange(item);
}
}});
});
},"dijit/_MenuBase":function(){
define("dijit/_MenuBase",["./popup","dojo/window","./_Widget","./_KeyNavContainer","./_TemplatedMixin","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/lang","dojo/_base/array"],function(pm,_1e4,_1e5,_1e6,_1e7,_1e8,dom,_1e9,_1ea,lang,_1eb){
return _1e8("dijit._MenuBase",[_1e5,_1e7,_1e6],{parentMenu:null,popupDelay:500,onExecute:function(){
},onCancel:function(){
},_moveToPopup:function(evt){
if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){
this.focusedChild._onClick(evt);
}else{
var _1ec=this._getTopMenu();
if(_1ec&&_1ec._isMenuBar){
_1ec.focusNext();
}
}
},_onPopupHover:function(){
if(this.currentPopup&&this.currentPopup._pendingClose_timer){
var _1ed=this.currentPopup.parentMenu;
if(_1ed.focusedChild){
_1ed.focusedChild._setSelected(false);
}
_1ed.focusedChild=this.currentPopup.from_item;
_1ed.focusedChild._setSelected(true);
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
var _1ee=item.popup;
if(_1ee){
this._stopPendingCloseTimer(_1ee);
_1ee._pendingClose_timer=setTimeout(function(){
_1ee._pendingClose_timer=null;
if(_1ee.parentMenu){
_1ee.parentMenu.currentPopup=null;
}
pm.close(_1ee);
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
},_stopPendingCloseTimer:function(_1ef){
if(_1ef._pendingClose_timer){
clearTimeout(_1ef._pendingClose_timer);
_1ef._pendingClose_timer=null;
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
var _1f0=this.focusedChild;
if(!_1f0){
return;
}
var _1f1=_1f0.popup;
if(_1f1.isShowingNow){
return;
}
if(this.currentPopup){
this._stopPendingCloseTimer(this.currentPopup);
pm.close(this.currentPopup);
}
_1f1.parentMenu=this;
_1f1.from_item=_1f0;
var self=this;
pm.open({parent:this,popup:_1f1,around:_1f0.domNode,orient:this._orient||["after","before"],onCancel:function(){
self.focusChild(_1f0);
self._cleanUp();
_1f0._setSelected(true);
self.focusedChild=_1f0;
},onExecute:lang.hitch(this,"_cleanUp")});
this.currentPopup=_1f1;
if(this.popupHoverHandle){
this.disconnect(this.popupHoverHandle);
}
this.popupHoverHandle=this.connect(_1f1.domNode,"onmouseenter","_onPopupHover");
if(_1f1.focus){
_1f1._focus_timer=setTimeout(lang.hitch(_1f1,function(){
this._focus_timer=null;
this.focus();
}),0);
}
},_markActive:function(){
this.isActive=true;
_1ea.replace(this.domNode,"dijitMenuActive","dijitMenuPassive");
},onOpen:function(){
this.isShowingNow=true;
this._markActive();
},_markInactive:function(){
this.isActive=false;
_1ea.replace(this.domNode,"dijitMenuPassive","dijitMenuActive");
},onClose:function(){
this._stopFocusTimer();
this._markInactive();
this.isShowingNow=false;
this.parentMenu=null;
},_closeChild:function(){
this._stopPopupTimer();
if(this.currentPopup){
if(_1eb.indexOf(this._focusManager.activeStack,this.id)>=0){
_1e9.set(this.focusedChild.focusNode,"tabIndex",this.tabIndex);
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
define("curam/omega3-util",["dojo/dom-geometry","curam/util","curam/html","curam/GlobalVars","cm/_base/_dom","cm/_base/_form","curam/util/RuntimeContext","curam/util/ResourceBundle"],function(_1f2){
dojo.requireLocalization("curam.application","Debug");
var _1f3=new curam.util.ResourceBundle("Debug");
var _1f4={getAnchorPosition:function(_1f5){
var _1f6=false;
var _1f7=new Object();
var x=0;
var y=0;
x=AnchorPosition_getPageOffsetLeft(document.getElementById(_1f5));
y=AnchorPosition_getPageOffsetTop(document.getElementById(_1f5));
_1f7.x=x;
_1f7.y=y;
return _1f7;
},getAnchorWindowPosition:function(_1f8){
var _1f9=getAnchorPosition(_1f8);
var x=0;
var y=0;
if(isNaN(window.screenX)){
x=_1f9.x-document.body.scrollLeft+window.screenLeft;
y=_1f9.y-document.body.scrollTop+window.screenTop;
}else{
x=_1f9.x+window.screenX+(window.outerWidth-window.innerWidth)-window.pageXOffset;
y=_1f9.y+window.screenY+(window.outerHeight-24-window.innerHeight)-window.pageYOffset;
}
_1f9.x=x;
_1f9.y=y;
return _1f9;
},AnchorPosition_getPageOffsetLeft:function(el){
var ol=el.offsetLeft;
while((el=el.offsetParent)!=null){
ol+=el.offsetLeft;
}
return ol;
},AnchorPosition_getWindowOffsetLeft:function(el){
var _1fa=document.body.scrollLeft;
return AnchorPosition_getPageOffsetLeft(el)-_1fa;
},AnchorPosition_getPageOffsetTop:function(el){
var ot=el.offsetTop;
while((el=el.offsetParent)!=null){
ot+=el.offsetTop;
}
return ot;
},AnchorPosition_getWindowOffsetTop:function(el){
var _1fb=document.body.scrollTop;
return AnchorPosition_getPageOffsetTop(el)-_1fb;
},PopupMapping:function(name,_1fc){
this.name=name;
this.targetWidgetID=_1fc;
},openPopupFromCTCode:function(_1fd,_1fe,_1ff,_200){
var list=_1ff.parentNode.parentNode.parentNode.childNodes[0];
var _201=dijit.byNode(list);
if(_201){
var _202=_201.getValue();
}else{
var list=_1ff.parentNode.parentNode.parentNode.childNodes[1];
var _202=list.options[list.selectedIndex].value;
}
if(_202!=""){
if(curam.popupCTCodeMappings[_202]){
openPopupFromDomain(_1fd,_1fe,curam.popupCTCodeMappings[_202],_200,false);
}
}
},openPopupFromCTCodeNoDomain:function(_203,_204,_205,_206){
var list=_205.parentNode.parentNode.parentNode.childNodes[2];
var _207=dijit.byNode(list);
var _208;
var _209;
var _20a;
var _20b;
var _20c;
var _20d;
var _20e;
var _20f;
if(_207){
var _210=_207.getValue();
}else{
var list=_205.parentNode.parentNode.parentNode.childNodes[1];
var _210=list.options[list.selectedIndex].value;
}
if(_210!=""){
if(curam.popupCTCodeMappings[_210]){
_208=getPopupProperties(curam.popupCTCodeMappings[_210]);
_209=_208.pageID;
_20a=_208.createPageID;
_20b=_208.height;
_20c=_208.width;
_20d=_208.scrollBars;
_20e=_208.insertMode;
_20f=_208.codeTableCode;
var _211=_208.uimType;
if(_211=="DYNAMIC"){
openPopup(_203,_204,null,_209,_20a,_20c,_20b,_20d,_20e,null,null,_206,false);
}
}
}
},openPopupFromDomain:function(_212,_213,_214,_215,_216){
var _217=getPopupProperties(_214);
var _218=_217.pageID;
var _219=_217.createPageID;
var _21a=_217.height;
var _21b=_217.width;
var _21c=_217.scrollBars;
var _21d=_217.insertMode;
var _21e=_217.codeTableCode;
openPopup(_212,_213,_214,_218,_219,_21b,_21a,_21c,_21d,_21e,_215,_216);
},openPopupNoDomain:function(_21f,_220,_221,_222,_223,_224,_225,_226,_227,_228){
openPopup(_21f,_220,null,_221,_222,_223,_224,_225,_226,null,null,_227,_228);
},openPopup:function(_229,_22a,_22b,_22c,_22d,_22e,_22f,_230,_231,_232,_233,_234){
setMappingsLoaded(_22a);
var _235=getAnchorWindowPosition(_229);
_235.y=_235.y+25;
if(_235.x+_22e>screen.availWidth){
_235.x-=(_235.x+_22e)-screen.availWidth;
_235.x-=15;
}
if(_235.y+_22f>screen.availHeight){
_235.y-=(_235.y+_22f)-screen.availHeight;
_235.y-=35;
}
if(curam.popupWindow&&!curam.popupWindow.closed){
curam.popupWindow.close();
}
curam.currentPopupInstanceName=_22a;
curam.currentPopupProps=setPopupProperties(_22c,_22b,_232,_22e,_22f,_230,_22d,_231,null);
var ctx=jsScreenContext;
ctx.addContextBits("POPUP");
ctx.clear("TAB|TREE|AGENDA");
var url="";
if(_234==true){
url=_22d;
}else{
url=_22c;
}
if(_233&&_233.length>0){
url=url+"?"+_233;
url+="&";
}else{
url+="?";
}
url+=ctx.toRequestString();
if(window.curam.util.showModalDialog){
curam.util.showModalDialog(url,null,_22e,_22f,_235.x,_235.y,false,null,null);
}else{
curam.popupWindow=window.open(url,createWindowName(curam.currentPopupInstanceName),getPopupAttributes(_22e,_22f,_230)+"screenX="+_235.x+",left="+_235.x+",screenY="+_235.y+","+"top="+_235.y);
}
},addPopupMapping:function(_236,_237,_238){
var _239=curam.popupMappingRepository;
if(curam.popupMappingLoaded[_236]==true){
return;
}
if(_239[_236]==null){
_239[_236]=[];
_239[_236][_237]=[];
_239[_236][_237][0]=_238;
}else{
if(_239[_236][_237]==null){
_239[_236][_237]=[];
_239[_236][_237][0]=_238;
}else{
var _23a=_239[_236][_237].length;
_239[_236][_237][_23a]=_238;
}
}
},setMappingsLoaded:function(_23b){
curam.popupMappingLoaded[_23b]=true;
},executeMapping:function(_23c,_23d){
var pmr=curam.popupMappingRepository;
var cpin=curam.currentPopupInstanceName;
if(!pmr||!pmr[cpin]||pmr[cpin][_23c]==null){
return;
}
for(var i=0;i<pmr[cpin][_23c].length;i++){
var _23e=null;
_23e=dojo.byId(pmr[cpin][_23c][i]);
if(_23e.tagName=="SPAN"){
_23e.innerHTML=curam.html.splitWithTag(_23d,null,null,escapeXML);
_23e.setAttribute("title",_23d);
_23e._reposition=_23e._reposition||dojo.query("div",_23e).length>0;
if(_23e._reposition){
var _23f=cm.nextSibling(_23e,"span");
if(_23f){
var _240=_1f2.getMarginBoxSimple(_23e).h;
var _241=_1f2.getMarginBoxSimple(_23f).h;
dojo.style(_23f,"position","relative");
var diff=_240-_241-((dojo.isIE&&dojo.isIE<9)?2:0);
dojo.style(_23f,"bottom","-"+(diff)+"px");
}
}
}else{
if(_23e.tagName=="TEXTAREA"){
if(curam.currentPopupProps.insertMode=="insert"){
insertAtCursor(_23e,escapeXML(_23d));
}else{
if(curam.currentPopupProps.insertMode=="append"){
_23e.value+=_23d;
}else{
_23e.value=_23d;
}
}
}else{
if(dijit.byId(pmr[cpin][_23c][i])){
dijit.byId(pmr[cpin][_23c][i]).set("value",_23d);
_23e.value=_23d;
}else{
_23e.value=_23d;
}
}
}
}
},insertAtCursor:function(_242,_243){
if(document.selection){
_242.focus();
sel=document.selection.createRange();
sel.text=_243;
}else{
if(_242.selectionStart||_242.selectionStart=="0"){
var _244=_242.selectionStart;
var _245=_242.selectionEnd;
_242.value=_242.value.substring(0,_244)+_243+_242.value.substring(_245,_242.value.length);
}else{
_242.value+=_243;
}
}
},escapeXML:function(_246){
return _246.replace(/&/g,"&#38;").replace(/</g,"&#60;").replace(/>/g,"&#62;").replace(/"/g,"&#34;").replace(/'/g,"&#39;");
},executeOpenerMapping:function(_247,_248){
var _249=undefined;
if(curam.util.isModalWindow()){
_249=curam.dialog.getParentWindow(window);
}else{
if(window.dialogArguments){
_249=window.dialogArguments[0];
}
}
if((_249)&&(!_249.closed)){
_249.executeMapping(_247,_248);
}else{
curam.debug.log("curam.omega3-util.executeOpenerMapping:, "+_1f3.getProperty("curam.omega3-util.parent"));
}
},storePopupInputFromWidget:function(name,_24a){
var _24b=null;
_24b=dojo.byId(_24a).value;
if(_24b){
curam.popupInputs[name]=_24b;
}else{
curam.popupInputs[name]="";
}
},getPopupInput:function(name){
if(curam.popupInputs[name]!=null){
return curam.popupInputs[name];
}else{
return "";
}
},PopupProperties:function(_24c,_24d,_24e,_24f,_250,_251,_252){
this.width=_24d;
this.height=_24e;
this.scrollBars=_24f;
this.pageID=_24c;
this.createPageID=_250;
if(_251==null){
this.insertMode="overwrite";
}else{
this.insertMode=_251;
}
if(_252!=null){
this.uimType=_252;
}
},setPopupProperties:function(_253,_254,_255,_256,_257,_258,_259,_25a,_25b){
if(_255){
curam.popupCTCodeMappings[_255]=_254;
}
curam.popupPropertiesRepository[_254]=new PopupProperties(_253,_256,_257,_258,_259,_25a,_25b);
},getPopupAttributes:function(_25c,_25d,_25e){
var _25f="width="+_25c+","+"height="+_25d+","+"scrollbars="+(_25e?"yes":"no")+",";
return _25f;
},getPopupAttributesIEModal:function(_260){
var _261="dialogWidth:"+curam.popupPropertiesRepository[_260].width+"px;"+"dialogHeight:"+curam.popupPropertiesRepository[_260].height+"px;";
return _261;
},trimFileExtension:function(_262){
var _263=_262.lastIndexOf("/")+1;
if(_263==-1){
_263=_262.lastIndexOf("\\")+1;
}
if(_263==-1){
_263=0;
}
return _262.substring(_263,_262.lastIndexOf("."));
},getPopupProperties:function(_264){
return curam.popupPropertiesRepository[_264];
},validateDate:function(_265){
require(["curam/validation"]);
return curam.validation.validateDate(_265).valid;
},addStartDate:function(_266){
require(["curam/validation"]);
var _267=dojo.byId("startDate").value;
var _268=curam.validation.validateDate(_267);
if(_268.valid){
var _269=dojo.byId("gotoDate");
_269.href=curam.util.replaceUrlParam(_269.href,"startDate",_267);
return true;
}else{
require(["curam/validation/calendar"],function(){
alert(curam.validation.calendar.invalidGotoDateEntered.replace("%s",_267).replace("%s",jsDFs));
});
dojo.stopEvent(_266);
return false;
}
},checkEnter:function(_26a){
if(_26a.keyCode==13){
if(addStartDate(_26a)){
var _26b=dojo.byId("gotoDate");
window.location=_26b.href;
return true;
}
return false;
}
return true;
},createWindowName:function(_26c){
var _26d=new String("");
for(var i=0;i<_26c.length;i++){
var ch=_26c.charAt(i);
if(ch=="$"||ch=="."){
_26d+="_";
}else{
_26d+=ch;
}
}
return _26d;
},clearPopup:function(_26e,_26f){
var _270=_26e.id.substring(0,_26e.id.indexOf("_clear"));
var _271=_270+"_value";
var _272=_270+"_desc";
var _273=_270+"_deschf";
var _274=dojo.byId(_271);
if(_274){
if(_274.tagName=="INPUT"){
_274.value="";
}else{
if(_274.tagName=="TEXTAREA"){
_274.value="";
}
}
if(_274.tagName=="SPAN"){
_274.innerHTML=curam.POPUP_EMPTY_SPAN_VALUE;
}
}
var _275=dojo.byId(_272);
if(_275){
if(_275.tagName=="INPUT"){
_275.value="";
}else{
if(_275.tagName=="TEXTAREA"){
_275.value="";
}else{
if(_275.tagName=="SPAN"){
_275.innerHTML=curam.POPUP_EMPTY_SPAN_VALUE;
_275.removeAttribute("title");
}
}
}
}
var _276=dojo.byId(_273);
if(_276){
if(_276.tagName=="INPUT"){
_276.value="";
}else{
_276.innerHTML="&nbsp";
}
}
if(_26f){
_26f=dojo.fixEvent(_26f);
dojo.stopEvent(_26f);
}
return false;
},swapImage:function(_277,_278){
dojo.byId(_277).src=_278;
},appendTabColumn:function(_279,_27a){
var _27b;
var _27c=[];
dojo.query("input[name='"+_279+"']").filter(function(_27d){
return _27d.checked;
}).forEach(function(_27e){
_27c.push(_27e.value);
});
_27b=_27c.join("\t");
_27a.href=_27a.href+(_27a.href.indexOf("?")==-1?"?":"&");
if(_27b!=""){
_27a.href=_27a.href+_279+"="+encodeURIComponent(_27b);
}else{
_27a.href=_27a.href+_279+"=";
}
},ToggleAll:function(e,_27f){
dojo.query("input[name='"+_27f+"']").forEach(function(_280){
if(_280.checked===true){
_280.checked=false;
}else{
_280.checked=true;
}
});
},ToggleSelectAll:function(e,_281){
if(e.checked){
CheckAll(_281);
}else{
ClearAll(_281);
}
},CheckAll:function(_282){
dojo.query("input[name='"+_282+"']").forEach(function(_283){
_283.checked=true;
});
},ClearAll:function(_284){
dojo.query("input[name='"+_284+"']").forEach(function(_285){
_285.checked=false;
});
},Check:function(e){
e.checked=true;
},Clear:function(e){
e.checked=false;
},ChooseSelectAll:function(e,_286,_287){
var sAll=dojo.byId(_286);
if(sAll){
if(dojo.query("input[name='"+_287+"']").every("return item.checked")){
Check(sAll);
}else{
Clear(sAll);
}
}
},selectAllIfNeeded:function(_288,_289){
if(dojo.query("input[name='"+_289+"']").some("return !item.checked")){
return;
}
var sAll=dojo.byId(_288);
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
},dc:function(_28a,_28b,_28c){
if(cm.wasFormSubmitted(_28a)){
var evt=dojo.fixEvent(_28c);
dojo.stopEvent(evt);
return false;
}
cm.setFormSubmitted(_28a,1);
return true;
},setFocus:function(){
curam.util.setFocus();
},setParentFocus:function(_28d){
curam.debug.log("curam.omega3-util.setParentFocus: "+_1f3.getProperty("curam.omega3-util.called"));
var _28e=curam.dialog.getParentWindow(window);
if(!_28e.closed){
_28e.focus();
}else{
alert("The parent window has been closed");
}
if(_28d||window.event){
dojo.stopEvent(_28d||window.event);
}
curam.dialog.closeModalDialog();
},createElement:function(name,_28f,_290,text){
var e=dojo.create(name,_28f);
if(_290){
for(key in _290){
e.style[key]=_290[key];
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
var _291=getParentWin();
var _292=dojo.query("INPUT");
var _293=[];
dojo.query("INPUT[type='checkbox']").forEach(function(item){
if(item.checked&&item.id.indexOf("__o3mswa")<0){
_293.push(item.value);
}
});
var _294=dojo.toJson(_293);
_291.newQuestions=_294;
_291.curam.matrix.Constants.container.matrix.addQuestionsFromPopup();
curam.dialog.closeModalDialog();
return false;
},addOutcomesFromPopup:function(evt){
evt=dojo.fixEvent(evt);
dojo.stopEvent(evt);
if(window._outcomesAdded){
return;
}
window._outcomesAdded=true;
var _295=[];
dojo.query("INPUT[type='checkbox']").forEach(function(item){
if(item.checked&&item.id.indexOf("__o3mswa")<0){
_295.push(item.value);
}
});
getParentWin().curam.matrix.Constants.container.matrix.addOutcomesFromPopup(_295);
curam.dialog.closeModalDialog();
return false;
},addMatrixQuestionsPopupListener:function(){
addMatrixPopupListener(addQuestionsFromPopup);
},addMatrixOutcomesPopupListener:function(){
addMatrixPopupListener(addOutcomesFromPopup);
},addMatrixPopupListener:function(fn){
dojo.query("form").connect("onsubmit",fn);
},getRequestParams:function(_296){
var _297=[];
var uri=new dojo._Url(_296);
if(uri.query!=null){
var _298=uri.query.split("&");
for(var i=0;i<_298.length;i++){
var arr=_298[i].split("=");
_297[arr[0]]=arr[1];
}
}
return _297;
},openModalDialog:function(_299,_29a,left,top){
curam.util.openModalDialog(_299,_29a,left,top);
},initCluster:function(_29b){
var _29c=_29b.parentNode;
var _29d=dojo.query("div.toggle-group",_29c);
if(_29d.length>=1){
return _29d[0];
}
var next=cm.nextSibling(_29b,"p")||cm.nextSibling(_29b,"table");
if(!next){
return;
}
_29d=dojo.create("div",{"class":"toggle-group"},next,"before");
var arr=[];
var _29e=dojo.query("p.description",_29b)[0];
if(_29e){
arr.push(_29e);
var _29f=dojo.style(_29b,"marginBottom");
dojo.style(_29b,"marginBottom",0);
dojo.style(_29e,"marginBottom",_29f+"px");
}
var _2a0=_29c;
while(_2a0&&!(dojo.hasClass(_2a0,"cluster")||dojo.hasClass(_2a0,"list"))){
_2a0=_2a0.parentNode;
}
_29d.isClosed=dojo.hasClass(_2a0,"uncollapse")?true:false;
if(_29d.isClosed){
dojo.style(_29d,"display","none");
}
for(var _2a1=0;_2a1<_29c.childNodes.length;_2a1++){
if(_29c.childNodes[_2a1]==_29b||_29c.childNodes[_2a1]==_29d){
continue;
}
arr.push(_29c.childNodes[_2a1]);
}
for(var _2a1=0;_2a1<arr.length;_2a1++){
_29d.appendChild(arr[_2a1]);
}
return _29d;
},initClusterHeight:function(_2a2,_2a3,_2a4){
if(_2a2.correctHeight){
return;
}
var _2a5=dojo._getBorderBox(_2a3).h;
var _2a6=0,_2a7;
for(var _2a8=0;_2a8<_2a2.childNodes.length;_2a8++){
_2a7=_2a2.childNodes[_2a8];
if(_2a7==_2a3){
continue;
}
_2a6+=dojo._getBorderBox(_2a7).h;
}
if(_2a6==0){
return;
}
if(_2a4){
dojo.style(_2a3.parentNode,"height","");
}
_2a2.correctHeight=_2a6;
},getCursorPosition:function(e){
e=e||dojo.global().event;
var _2a9={x:0,y:0};
if(e.pageX||e.pageY){
_2a9.x=e.pageX;
_2a9.y=e.pageY;
}else{
var de=dojo.doc().documentElement;
var db=dojo.body();
_2a9.x=e.clientX+((de||db)["scrollLeft"])-((de||db)["clientLeft"]);
_2a9.y=e.clientY+((de||db)["scrollTop"])-((de||db)["clientTop"]);
}
return _2a9;
},overElement:function(_2aa,e){
_2aa=dojo.byId(_2aa);
var _2ab=getCursorPosition(e);
var bb=dojo._getBorderBox(_2aa);
var _2ac=dojo._abs(_2aa,true);
var top=_2ac.y;
var _2ad=top+bb.h;
var left=_2ac.x;
var _2ae=left+bb.w;
return (_2ab.x>=left&&_2ab.x<=_2ae&&_2ab.y>=top&&_2ab.y<=_2ad);
},toggleCluster:function(_2af,_2b0){
var _2b1=_2af;
while(_2af&&!(dojo.hasClass(_2af,"cluster")||dojo.hasClass(_2af,"list"))){
_2af=_2af.parentNode;
}
var _2b2=false;
var _2b3=dojo.query(" > :not(.header-wrapper) ",_2af.childNodes[0]);
if(!dojo.hasClass(_2b3[0],"toggleDiv")){
var _2b4=dojo.create("div",{className:"toggleDiv"},_2b3[0].parentNode);
var _2b5=dojo.create("div",{className:"toggleDiv2"},_2b3[0].parentNode);
_2b3.forEach(function(node){
if(node.tagName!="DIV"){
_2b4.appendChild(node);
}else{
_2b5.appendChild(node);
}
});
}else{
var _2b4=_2b3[0];
var _2b5=_2b3[1];
}
var desc=dojo.query(" > .header-wrapper p ",_2af.childNodes[0])[0];
if(typeof desc!="undefined"){
_2b2=true;
}
if(dojo.hasClass(_2af,"init-collapsed")){
dojo.removeClass(_2af,"init-collapsed");
dojo.style(_2b4,"display","none");
}
if(!_2b4||_2b4.inAnimation){
return;
}
require(["dojo/fx"],function(fx){
var _2b6={node:_2b4,duration:600,onBegin:function(){
_2b4.inAnimation=true;
dojo.removeClass(_2af,"is-collapsed");
dojo.addClass(_2af,"is-uncollapsed");
dojo.attr(_2b1,"aria-expanded","true");
dojo.stopEvent(_2b0);
},onEnd:function(){
_2b4.inAnimation=false;
}};
var _2b7={node:_2b4,duration:600,onBegin:function(){
_2b4.inAnimation=true;
dojo.removeClass(_2af,"is-uncollapsed");
dojo.addClass(_2af,"is-collapsed");
dojo.attr(_2b1,"aria-expanded","false");
dojo.stopEvent(_2b0);
},onEnd:function(){
_2b4.inAnimation=false;
}};
if(_2b5.hasChildNodes()){
var _2b8={node:_2b5,duration:600};
var _2b9={node:_2b5,duration:600};
}
if(_2b2){
var _2ba={node:desc,duration:100};
var _2bb={node:desc,duration:100,delay:500};
}
if(dojo.hasClass(_2af,"is-collapsed")){
if(typeof _2ba!="undefined"){
fx.wipeIn(_2ba).play();
}
fx.wipeIn(_2b6).play();
if(typeof _2b8!="undefined"){
fx.wipeIn(_2b8).play();
}
}else{
if(dojo.hasClass(_2af,"is-uncollapsed")){
if(typeof _2b9!="undefined"){
fx.wipeOut(_2b9).play();
}
fx.wipeOut(_2b7).play();
if(typeof _2bb!="undefined"){
fx.wipeOut(_2bb).play();
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
},openUserPrefsEditor:function(_2bc){
_2bc=dojo.fixEvent(_2bc);
var _2bd=_2bc.target;
while(_2bd&&_2bd.tagName!="A"){
_2bd=_2bd.parentNode;
}
var _2be={location:{href:_2bd.href}};
var rtc=new curam.util.RuntimeContext(_2be);
var href=curam.util.setRpu("user-locale-selector.jspx",rtc);
openModalDialog({href:href},"width=500,height=300",200,150,false);
return false;
},calendarOpenModalDialog:function(_2bf,_2c0){
dojo.stopEvent(_2bf);
curam.util.openModalDialog(_2c0,"");
}};
for(prop in _1f4){
dojo.global[prop]=_1f4[prop];
}
return _1f4;
});
},"curam/dialog":function(){
define("curam/dialog",["curam/util","curam/debug","curam/util/external","curam/util/Refresh","curam/tab","curam/util/RuntimeContext","curam/define","curam/util/onLoad","cm/_base/_dom","curam/util/ResourceBundle"],function(util,_2c1,_2c2){
dojo.requireLocalization("curam.application","Debug");
var _2c3=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.dialog",{MODAL_PREV_FLAG:"o3modalprev",MODAL_PREV_FLAG_INPUT:"curam_dialog_prev_marker",FORCE_CLOSE:false,ERROR_MESSAGES_HEADER:"error-messages-header",_hierarchy:[],_id:null,_displayedHandlerUnsToken:null,_displayed:false,_size:null,_justClose:false,validTargets:{"_top":true,"_self":true},initModal:function(_2c4,_2c5){
curam.dialog.pageId=_2c4;
curam.dialog.messagesExist=_2c5;
var _2c6=util.getTopmostWindow();
var _2c7=false;
var _2c8=_2c6.dojo.subscribe("/curam/dialog/SetId",this,function(_2c9){
_2c1.log("curam.dialog: "+_2c3.getProperty("curam.dialog.id"),_2c9);
curam.dialog._id=_2c9;
_2c7=true;
_2c6.dojo.unsubscribe(_2c8);
});
_2c6.dojo.publish("/curam/dialog/init");
if(!_2c7){
_2c1.log("curam.dialog: "+_2c3.getProperty("curam.dialog.no.id"));
_2c6.dojo.unsubscribe(_2c8);
}
if(curam.dialog.closeDialog(false)){
return;
}
curam.dialog._displayedHandlerUnsToken=util.getTopmostWindow().dojo.subscribe("/curam/dialog/displayed",null,function(_2ca,size){
if(_2ca==curam.dialog._id){
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
var _2cb=dojo.byId("o3ctx");
var sc=new curam.util.ScreenContext(jsScreenContext.getValue());
sc.addContextBits("ACTION|ERROR");
_2cb.value=sc.getValue();
util.connect(form,"onsubmit",curam.dialog.formSubmitHandler);
}
window.curamModal=true;
});
dojo.addOnUnload(function(){
util.getTopmostWindow().dojo.publish("/curam/dialog/iframeUnloaded",[curam.dialog._id,window]);
});
if(_2c7){
dojo.publish("/curam/dialog/ready");
}
},closeDialog:function(_2cc){
if(_2cc){
curam.dialog.forceClose();
}
var _2cd=curam.dialog.checkClose(curam.dialog.pageId);
if(_2cd){
util.onLoad.addPublisher(function(_2ce){
_2ce.modalClosing=true;
});
if(curam.dialog.messagesExist){
dojo.addOnLoad(function(){
var _2cf=dojo.byId(util.ERROR_MESSAGES_CONTAINER);
var _2d0=dojo.byId(util.ERROR_MESSAGES_LIST);
var _2d1=dojo.byId(curam.dialog.ERROR_MESSAGES_HEADER);
if(_2d0&&_2d1){
util.saveInformationalMsgs(_2cd);
util.disableInformationalLoad();
}else{
_2cd();
}
});
}else{
_2cd();
}
return true;
}
return false;
},addFormInput:function(form,type,name,_2d2){
return dojo.create("input",{"type":type,"name":name,"value":_2d2},form);
},checkClose:function(_2d3){
if(curam.dialog._justClose){
return function(){
curam.dialog.closeModalDialog();
};
}
var _2d4=curam.dialog.getParentWindow(window);
if(!_2d4){
return false;
}
var href=window.location.href;
var _2d5=curam.dialog.MODAL_PREV_FLAG;
var _2d6=util.getUrlParamValue(href,_2d5);
var _2d7=true;
if(_2d6){
if(_2d4){
if(_2d6==_2d3){
_2d7=false;
}
}
}else{
_2d7=false;
}
var _2d8=util.getUrlParamValue(href,"o3ctx");
if(_2d8){
var sc=new curam.util.ScreenContext();
sc.setContext(_2d8);
if(sc.hasContextBits("TREE|ACTION")){
_2d7=false;
}
}
if(_2d7||curam.dialog.FORCE_CLOSE){
if(!curam.dialog.FORCE_CLOSE){
if(_2d6=="user-prefs-editor"){
return function(){
if(_2d4&&_2d4.location!==util.getTopmostWindow().location){
curam.dialog.doRedirect(_2d4);
}
curam.dialog.closeModalDialog();
};
}
return function(){
var rp=util.removeUrlParam;
href=rp(rp(rp(href,_2d5),"o3frame"),util.PREVENT_CACHE_FLAG);
href=util.adjustTargetContext(_2d4,href);
if(_2d4&&_2d4.location!==util.getTopmostWindow().location){
curam.dialog.doRedirect(_2d4,href,true);
}else{
curam.tab.getTabController().handleLinkClick(href);
}
curam.dialog.closeModalDialog();
};
}else{
return function(){
if(_2d4!==util.getTopmostWindow()){
_2d4.curam.util.loadInformationalMsgs();
}
curam.dialog.closeModalDialog();
};
}
}
return false;
},getParentWindow:function(_2d9){
if(!_2d9){
_2c1.log("curam.dialog.getParentWindow(): "+_2c3.getProperty("curam.dialog.no.child"),window);
_2c1.log("returning as parent = ",window.parent.location.href);
return window.parent;
}
_2c1.log("curam.dialog.getParentWindow(): "+_2c3.getProperty("curam.dialog.child"),_2d9.location.href);
var _2da=curam.dialog._getDialogHierarchy();
for(var i=0;i<_2da.length;i++){
if(_2da[i]==_2d9){
var _2db=(i>0)?_2da[i-1]:_2da[0];
_2c1.log("curam.dialog.getParentWindow(): "+_2c3.getProperty("curam.dialog.parent.window"),_2db);
return _2db;
}
}
_2c1.log("curam.dialog.getParentWindow(): "+_2c3.getProperty("curam.dialog.child.not.found"),_2d9.location.href);
_2c1.log("curam.dialog.getParentWindow(): "+_2c3.getProperty("curam.dialog.hierarchy"),_2da);
var ret=_2da.length>0?_2da[_2da.length-1]:undefined;
_2c1.log("curam.dialog.getParentWindow(): "+_2c3.getProperty("curam.dialog.returning.parent"),ret?ret.location.href:"undefined");
return ret;
},_getDialogHierarchy:function(){
var _2dc=util.getTopmostWindow();
_2dc.require(["curam/dialog"]);
return _2dc.curam.dialog._hierarchy;
},pushOntoDialogHierarchy:function(_2dd){
var _2de=curam.dialog._getDialogHierarchy();
if(dojo.indexOf(_2de,_2dd)<0){
_2de.push(_2dd);
_2c1.log(_2c3.getProperty("curam.dialog.add.hierarchy"),_2dd.location.href);
_2c1.log(_2c3.getProperty("curam.dialog.full.hierarchy"),_2de);
}
},removeFromDialogHierarchy:function(_2df){
var _2e0=curam.dialog._getDialogHierarchy();
if(!_2df||_2e0[_2e0.length-1]==_2df){
_2e0.pop();
}else{
_2c1.log("curam.dialog.removeFromDialogHierarchy(): "+_2c3.getProperty("curam.dialog.ignore.request"));
try{
_2c1.log(_2df.location.href);
}
catch(e){
_2c1.log(e.message);
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
},_isSameBaseUrl:function(href,rtc,_2e1){
if(href&&href.indexOf("#")==0){
return true;
}
var _2e2=href.split("?");
var _2e3=rtc.getHref().split("?");
if(_2e2[0].indexOf("/")<0){
var _2e4=_2e3[0].split("/");
_2e3[0]=_2e4[_2e4.length-1];
}
if(_2e3[0].indexOf("/")<0){
var _2e4=_2e2[0].split("/");
_2e2[0]=_2e4[_2e4.length-1];
}
if(_2e1&&_2e1==true){
_2e2[0]=curam.dialog.stripPageOrActionFromUrl(_2e2[0]);
_2e3[0]=curam.dialog.stripPageOrActionFromUrl(_2e3[0]);
}
if(_2e2[0]==_2e3[0]){
return true;
}
return false;
},modalEventHandler:function(_2e5){
curam.dialog._doHandleModalEvent(_2e5,new curam.util.RuntimeContext(window),curam.dialog.closeModalDialog,curam.dialog.doRedirect);
},_doHandleModalEvent:function(e,rtc,_2e6,_2e7){
var _2e8=e.target;
var u=util;
switch(_2e8.tagName){
case "INPUT":
if(dojo.attr(_2e8,"type")=="submit"&&typeof _2e8.form!="undefined"){
_2e8.form.setAttribute("keepModal",_2e8.getAttribute("keepModal"));
}
return true;
case "IMG":
case "SPAN":
case "DIV":
_2e8=cm.getParentByType(_2e8,"A");
if(_2e8==null){
return;
}
case "A":
if(_2e8._submitButton){
_2e8._submitButton.form.setAttribute("keepModal",_2e8._submitButton.getAttribute("keepModal"));
return;
}
break;
default:
return true;
}
var _2e9=dojo.stopEvent;
var href=_2e8.getAttribute("href");
if(href==""){
_2e6();
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
var _2ea=_2e8.getAttribute("target");
if(_2ea&&!curam.dialog.validTargets[_2ea]){
return true;
}
if(href&&href.indexOf("/servlet/FileDownload?")>-1){
var _2eb=dojo.create("iframe",{src:href},dojo.body());
_2eb.style.display="none";
_2e9(e);
return false;
}
if(dojo.hasClass(_2e8,"external-link")){
return true;
}
if(util.isSameUrl(href,null,rtc)){
if(href.indexOf("#")<0){
href=u.replaceUrlParam(href,"o3frame","modal");
href=u.replaceUrlParam(href,"o3ctx",ctx.getValue());
_2e7(window,href);
return false;
}
return true;
}
if(href&&curam.dialog._isSameBaseUrl(href,rtc,true)&&!_2e8.getAttribute("keepModal")){
_2e8.setAttribute("keepModal","true");
}
var _2ec=curam.dialog.getParentWindow(rtc.contextObject());
if(_2e8&&_2e8.getAttribute){
_2e9(e);
if(_2e8.getAttribute("keepModal")=="true"){
href=u.replaceUrlParam(href,"o3frame","modal");
href=u.replaceUrlParam(href,"o3ctx",ctx.getValue());
_2e7(window,href);
}else{
if(_2ec){
href=u.removeUrlParam(href,"o3frame");
href=u.removeUrlParam(href,curam.dialog.MODAL_PREV_FLAG);
if(_2ec.location!==util.getTopmostWindow().location){
var _2ed=new curam.util.RuntimeContext(_2ec);
var _2ee=_2ed.getHref();
_2ee=u.removeUrlParam(_2ee,"o3frame");
if(util.isActionPage(_2ee)){
if(!curam.dialog._isSameBaseUrl(href,_2ed,true)){
href=u.adjustTargetContext(_2ec,href);
_2e7(_2ec,href);
}
}else{
if(!util.isSameUrl(href,_2ee)){
href=u.adjustTargetContext(_2ec,href);
curam.dialog.doRedirect(_2ec,href);
}
}
}else{
var _2ef=new curam.util.ScreenContext("TAB");
href=u.replaceUrlParam(href,"o3ctx",_2ef.getValue());
curam.tab.getTabController().handleLinkClick(href);
}
_2e6();
}
}
return false;
}
if(_2ec&&typeof (_2e8)=="undefined"||_2e8==null||_2e8=="_self"||_2e8==""){
_2e9(e);
href=href.replace(/[&?]o3frame=modal/g,"").replace("%3Fo3frame%3Dmodal","").replace("?o3frame%3Dmodal","");
href=util.updateCtx(href);
if(_2ec.location!==util.getTopmostWindow().location){
_2e7(_2ec,href);
}else{
var _2ef=new curam.util.ScreenContext("TAB");
href=u.replaceUrlParam(href,"o3ctx",_2ef.getValue());
curam.tab.getTabController().handleLinkClick(href);
}
_2e6();
return false;
}
return true;
},formSubmitHandler:function(e){
var _2f0=curam.dialog.getParentWindow(window);
if(typeof _2f0=="undefined"){
return true;
}
e.target.method="post";
e.target.setAttribute("target",window.name);
var _2f1=e.target.action;
var _2f2=curam.dialog.MODAL_PREV_FLAG;
var _2f3=curam.dialog.MODAL_PREV_FLAG_INPUT;
var u=util;
var _2f4=dojo.byId(_2f3);
if(_2f4){
_2f4.parentNode.removeChild(_2f4);
}
if(e.target.getAttribute("keepModal")!="true"&&!jsScreenContext.hasContextBits("AGENDA")){
var _2f5="multipart/form-data";
if(e.target.enctype==_2f5||e.target.encoding==_2f5){
e.target.action=u.removeUrlParam(_2f1,_2f2);
_2f4=curam.dialog.addFormInput(e.target,"hidden",_2f2,curam.dialog.pageId);
_2f4.setAttribute("id",_2f3);
_2f4.id=_2f3;
}else{
e.target.action=u.replaceUrlParam(_2f1,_2f2,curam.dialog.pageId);
}
}else{
e.target.action=u.removeUrlParam(_2f1,_2f2);
}
_2f0.curam.util.invalidatePage();
if(!jsScreenContext.hasContextBits("EXTAPP")){
util.firePageSubmittedEvent("dialog");
}
return true;
},forceClose:function(){
curam.dialog.FORCE_CLOSE=true;
},forceParentRefresh:function(){
var _2f6=curam.dialog.getParentWindow(window);
if(!_2f6){
return;
}
_2f6.curam.util.FORCE_REFRESH=true;
},closeModalDialog:function(){
var _2f7=util.getTopmostWindow();
if(curam.dialog._displayedHandlerUnsToken!=null){
_2f7.dojo.unsubscribe(curam.dialog._displayedHandlerUnsToken);
curam.dialog._displayedHandlerUnsToken=null;
}
if(typeof (curam.dialog._id)=="undefined"||curam.dialog._id==null){
var _2f8=window.frameElement.id;
var _2f9=_2f8.substring(7);
curam.dialog._id=_2f9;
_2c1.log("curam.dialog.closeModalDialog() "+_2c3.getProperty("curam.dialog.modal.id")+_2f9);
}
_2c1.log("publishing /curam/dialog/close for ",curam.dialog._id);
util.getTopmostWindow().dojo.publish("/curam/dialog/close",[curam.dialog._id]);
_2c1.log("publishing /curam/dialog/close for ",curam.dialog._id);
},parseWindowOptions:function(_2fa){
var opts={};
if(_2fa){
_2c1.log("curam.dialog.parseWindowOptions "+_2c3.getProperty("curam.dialog.parsing"),_2fa);
var _2fb=_2fa.split(",");
var _2fc;
for(var i=0;i<_2fb.length;i++){
_2fc=_2fb[i].split("=");
opts[_2fc[0]]=_2fc[1];
}
_2c1.log("done:",dojo.toJson(opts));
}else{
_2c1.log("curam.dialog.parseWindowOptions "+_2c3.getProperty("curam.dialog.no.options"));
}
return opts;
},doRedirect:function(_2fd,href,_2fe,_2ff){
window.curamDialogRedirecting=true;
_2fd.curam.util.redirectWindow(href,_2fe,_2ff);
},closeGracefully:function(){
curam.dialog._justClose=true;
}});
return curam.dialog;
});
},"curam/date/locale":function(){
define("curam/date/locale",["curam/define","dojo/_base/lang","dojo/date/locale"],function(_300,lang,_301){
var _302=_301._getGregorianBundle;
function _303(_304){
var _305=_302(_304);
if(LOCALIZED_MONTH_NAMES){
_305["months-format-abbr"]=LOCALIZED_SHORT_MONTH_NAMES;
_305["months-format-wide"]=LOCALIZED_MONTH_NAMES;
}
return _305;
};
_300.singleton("curam.date.locale",{});
lang.mixin(curam.date.locale,_301);
curam.date.locale.format=function(_306,_307){
_301._getGregorianBundle=_303;
var _308=_301.format(_306,_307);
_301._getGregorianBundle=_302;
return _308;
};
curam.date.locale.parse=function(_309,_30a){
_301._getGregorianBundle=_303;
var _30b=_301.parse(_309,_30a);
_301._getGregorianBundle=_302;
return _30b;
};
return curam.date.locale;
});
},"dijit/focus":function(){
define("dijit/focus",["dojo/aspect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/Evented","dojo/_base/lang","dojo/on","dojo/ready","dojo/_base/sniff","dojo/Stateful","dojo/_base/unload","dojo/_base/window","dojo/window","./a11y","./registry","."],function(_30c,_30d,dom,_30e,_30f,_310,lang,on,_311,has,_312,_313,win,_314,a11y,_315,_316){
var _317=_30d([_312,_310],{curNode:null,activeStack:[],constructor:function(){
var _318=lang.hitch(this,function(node){
if(dom.isDescendant(this.curNode,node)){
this.set("curNode",null);
}
if(dom.isDescendant(this.prevNode,node)){
this.set("prevNode",null);
}
});
_30c.before(_30f,"empty",_318);
_30c.before(_30f,"destroy",_318);
},registerIframe:function(_319){
return this.registerWin(_319.contentWindow,_319);
},registerWin:function(_31a,_31b){
var _31c=this;
var _31d=function(evt){
_31c._justMouseDowned=true;
setTimeout(function(){
_31c._justMouseDowned=false;
},0);
if(has("ie")&&evt&&evt.srcElement&&evt.srcElement.parentNode==null){
return;
}
_31c._onTouchNode(_31b||evt.target||evt.srcElement,"mouse");
};
var doc=has("ie")?_31a.document.documentElement:_31a.document;
if(doc){
if(has("ie")){
_31a.document.body.attachEvent("onmousedown",_31d);
var _31e=function(evt){
var tag=evt.srcElement.tagName.toLowerCase();
if(tag=="#document"||tag=="body"){
return;
}
if(a11y.isTabNavigable(evt.srcElement)){
_31c._onFocusNode(_31b||evt.srcElement);
}else{
_31c._onTouchNode(_31b||evt.srcElement);
}
};
doc.attachEvent("onactivate",_31e);
var _31f=function(evt){
_31c._onBlurNode(_31b||evt.srcElement);
};
doc.attachEvent("ondeactivate",_31f);
return {remove:function(){
_31a.document.detachEvent("onmousedown",_31d);
doc.detachEvent("onactivate",_31e);
doc.detachEvent("ondeactivate",_31f);
doc=null;
}};
}else{
doc.body.addEventListener("mousedown",_31d,true);
doc.body.addEventListener("touchstart",_31d,true);
var _320=function(evt){
_31c._onFocusNode(_31b||evt.target);
};
doc.addEventListener("focus",_320,true);
var _321=function(evt){
_31c._onBlurNode(_31b||evt.target);
};
doc.addEventListener("blur",_321,true);
return {remove:function(){
doc.body.removeEventListener("mousedown",_31d,true);
doc.body.removeEventListener("touchstart",_31d,true);
doc.removeEventListener("focus",_320,true);
doc.removeEventListener("blur",_321,true);
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
var _322=[];
try{
while(node){
var _323=_30e.get(node,"dijitPopupParent");
if(_323){
node=_315.byId(_323).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===win.body()){
break;
}
node=_314.get(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId"),_324=id&&_315.byId(id);
if(_324&&!(by=="mouse"&&_324.get("disabled"))){
_322.unshift(id);
}
node=node.parentNode;
}
}
}
}
catch(e){
}
this._setStack(_322,by);
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
},_setStack:function(_325,by){
var _326=this.activeStack;
this.set("activeStack",_325);
for(var _327=0;_327<Math.min(_326.length,_325.length);_327++){
if(_326[_327]!=_325[_327]){
break;
}
}
var _328;
for(var i=_326.length-1;i>=_327;i--){
_328=_315.byId(_326[i]);
if(_328){
_328._hasBeenBlurred=true;
_328.set("focused",false);
if(_328._focusManager==this){
_328._onBlur(by);
}
this.emit("widget-blur",_328,by);
}
}
for(i=_327;i<_325.length;i++){
_328=_315.byId(_325[i]);
if(_328){
_328.set("focused",true);
if(_328._focusManager==this){
_328._onFocus(by);
}
this.emit("widget-focus",_328,by);
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
var _329=new _317();
_311(function(){
var _32a=_329.registerWin(win.doc.parentWindow||win.doc.defaultView);
if(has("ie")){
_313.addOnWindowUnload(function(){
_32a.remove();
_32a=null;
});
}
});
_316.focus=function(node){
_329.focus(node);
};
for(var attr in _329){
if(!/^_/.test(attr)){
_316.focus[attr]=typeof _329[attr]=="function"?lang.hitch(_329,attr):_329[attr];
}
}
_329.watch(function(attr,_32b,_32c){
_316.focus[attr]=_32c;
});
return _329;
});
},"dojo/i18n":function(){
define("dojo/i18n",["./_base/kernel","require","./has","./_base/array","./_base/config","./_base/lang","./_base/xhr","./json"],function(dojo,_32d,has,_32e,_32f,lang,xhr,json){
true||has.add("dojo-preload-i18n-Api",1);
true||has.add("dojo-v1x-i18n-Api",1);
var _330=dojo.i18n={},_331=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,_332=function(root,_333,_334,_335){
for(var _336=[_334+_335],_337=_333.split("-"),_338="",i=0;i<_337.length;i++){
_338+=(_338?"-":"")+_337[i];
if(!root||root[_338]){
_336.push(_334+_338+"/"+_335);
}
}
return _336;
},_339={},_33a=dojo.getL10nName=function(_33b,_33c,_33d){
_33d=_33d?_33d.toLowerCase():dojo.locale;
_33b="dojo/i18n!"+_33b.replace(/\./g,"/");
_33c=_33c.replace(/\./g,"/");
return (/root/i.test(_33d))?(_33b+"/nls/"+_33c):(_33b+"/nls/"+_33d+"/"+_33c);
},_33e=function(_33f,_340,_341,_342,_343,load){
_33f([_340],function(root){
var _344=lang.clone(root.root),_345=_332(!root._v1x&&root,_343,_341,_342);
_33f(_345,function(){
for(var i=1;i<_345.length;i++){
_344=lang.mixin(lang.clone(_344),arguments[i]);
}
var _346=_340+"/"+_343;
_339[_346]=_344;
load();
});
});
},_347=function(id,_348){
return /^\./.test(id)?_348(id):id;
},_349=function(_34a){
var list=_32f.extraLocale||[];
list=lang.isArray(list)?list:[list];
list.push(_34a);
return list;
},load=function(id,_34b,load){
if(1){
var _34c=id.split("*"),_34d=_34c[1]=="preload";
if(_34d){
if(!_339[id]){
_339[id]=1;
_34e(_34c[2],json.parse(_34c[3]),1);
}
load(1);
}
if(_34d||_34f(id,_34b,load)){
return;
}
}
var _350=_331.exec(id),_351=_350[1]+"/",_352=_350[5]||_350[4],_353=_351+_352,_354=(_350[5]&&_350[4]),_355=_354||dojo.locale,_356=_353+"/"+_355,_357=_354?[_355]:_349(_355),_358=_357.length,_359=function(){
if(!--_358){
load(lang.delegate(_339[_356]));
}
};
_32e.forEach(_357,function(_35a){
var _35b=_353+"/"+_35a;
if(1){
_35c(_35b);
}
if(!_339[_35b]){
_33e(_34b,_353,_351,_352,_35a,_359);
}else{
_359();
}
});
};
if(has("dojo-unit-tests")){
var _35d=_330.unitTests=[];
}
if(1||1){
var _35e=_330.normalizeLocale=function(_35f){
var _360=_35f?_35f.toLowerCase():dojo.locale;
return _360=="root"?"ROOT":_360;
},isXd=function(mid){
return (1&&1)?_32d.isXdUrl(_32d.toUrl(mid+".js")):true;
},_361=0,_362=[],_34e=_330._preloadLocalizations=function(_363,_364,_365){
function _366(_367,func){
var _368=_367.split("-");
while(_368.length){
if(func(_368.join("-"))){
return true;
}
_368.pop();
}
return func("ROOT");
};
function _369(_36a){
_36a=_35e(_36a);
_366(_36a,function(loc){
if(_32e.indexOf(_364,loc)>=0){
var mid=_363.replace(/\./g,"/")+"_"+loc;
_361++;
(isXd(mid)||_365?_32d:_36e)([mid],function(_36b){
for(var p in _36b){
_339[p+"/"+loc]=_36b[p];
}
--_361;
while(!_361&&_362.length){
load.apply(null,_362.shift());
}
});
return true;
}
return false;
});
};
_369();
_32e.forEach(dojo.config.extraLocale,_369);
},_34f=function(id,_36c,load){
if(_361){
_362.push([id,_36c,load]);
}
return _361;
};
}
if(1){
var _36d=new Function("__bundle","__checkForLegacyModules","__mid","var define = function(){define.called = 1;},"+"    require = function(){define.called = 1;};"+"try{"+"define.called = 0;"+"eval(__bundle);"+"if(define.called==1)"+"return 1;"+"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"+"return __checkForLegacyModules;"+"}catch(e){}"+"try{"+"return eval('('+__bundle+')');"+"}catch(e){"+"return e;"+"}"),_36e=function(deps,_36f){
var _370=[];
_32e.forEach(deps,function(mid){
var url=_32d.toUrl(mid+".js");
function load(text){
var _371=_36d(text,_35c,mid);
if(_371===1){
_32d([mid],function(_372){
_370.push(_339[url]=_372);
});
}else{
if(_371 instanceof Error){
console.error("failed to evaluate i18n bundle; url="+url,_371);
_371={};
}
_370.push(_339[url]=(/nls\/[^\/]+\/[^\/]+$/.test(url)?_371:{root:_371,_v1x:1}));
}
};
if(_339[url]){
_370.push(_339[url]);
}else{
var _373=_32d.syncLoadNls(mid);
if(_373){
_370.push(_373);
}else{
if(!xhr){
try{
_32d.getText(url,true,load);
}
catch(e){
_370.push(_339[url]={});
}
}else{
xhr.get({url:url,sync:true,load:load,error:function(){
_370.push(_339[url]={});
}});
}
}
}
});
_36f&&_36f.apply(null,_370);
},_35c=function(_374){
for(var _375,_376=_374.split("/"),_377=dojo.global[_376[0]],i=1;_377&&i<_376.length-1;_377=_377[_376[i++]]){
}
if(_377){
_375=_377[_376[i]];
if(!_375){
_375=_377[_376[i].replace(/-/g,"_")];
}
if(_375){
_339[_374]=_375;
}
}
return _375;
};
_330.getLocalization=function(_378,_379,_37a){
var _37b,_37c=_33a(_378,_379,_37a).substring(10);
load(_37c,(!isXd(_37c)?_36e:_32d),function(_37d){
_37b=_37d;
});
return _37b;
};
if(has("dojo-unit-tests")){
_35d.push(function(doh){
doh.register("tests.i18n.unit",function(t){
var _37e;
_37e=_36d("{prop:1}");
t.is({prop:1},_37e);
t.is(undefined,_37e[1]);
_37e=_36d("({prop:1})");
t.is({prop:1},_37e);
t.is(undefined,_37e[1]);
_37e=_36d("{'prop-x':1}");
t.is({"prop-x":1},_37e);
t.is(undefined,_37e[1]);
_37e=_36d("({'prop-x':1})");
t.is({"prop-x":1},_37e);
t.is(undefined,_37e[1]);
_37e=_36d("define({'prop-x':1})");
t.is(1,_37e);
_37e=_36d("this is total nonsense and should throw an error");
t.is(_37e instanceof Error,true);
});
});
}
}
return lang.mixin(_330,{dynamic:true,normalize:_347,load:load,cache:_339});
});
},"dijit/hccss":function(){
define("dijit/hccss",["require","dojo/_base/config","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/ready","dojo/_base/sniff","dojo/_base/window"],function(_37f,_380,_381,_382,_383,_384,has,win){
if(has("ie")||has("mozilla")){
_384(90,function(){
var div=_382.create("div",{id:"a11yTestNode",style:{cssText:"border: 1px solid;"+"border-color:red green;"+"position: absolute;"+"height: 5px;"+"top: -999px;"+"background-image: url(\""+(_380.blankGif||_37f.toUrl("dojo/resources/blank.gif"))+"\");"}},win.body());
var cs=_383.getComputedStyle(div);
if(cs){
var _385=cs.backgroundImage;
var _386=(cs.borderTopColor==cs.borderRightColor)||(_385!=null&&(_385=="none"||_385=="url(invalid-url:)"));
if(_386){
_381.add(win.body(),"dijit_a11y");
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
var _387=function(name){
return "curam_util_LocalConfig_"+name;
},_388=function(name,_389){
var _38a=_387(name);
if(typeof top[_38a]==="undefined"){
top[_38a]=_389;
}
return top[_38a];
},_38b=function(name){
return top[_387(name)];
};
_388("seedValues",{}),_388("overrides",{});
var _38c=function(_38d,_38e){
if(typeof _38d!=="undefined"&&typeof _38d!=="string"){
throw new Error("Invalid "+_38e+" type: "+typeof _38d+"; expected string");
}
};
var _38f={seedOption:function(name,_390,_391){
_38c(_390,"value");
_38c(_391,"defaultValue");
_38b("seedValues")[name]=(typeof _390!=="undefined")?_390:_391;
},overrideOption:function(name,_392){
_38c(_392,"value");
if(typeof (Storage)!=="undefined"){
localStorage[name]=_392;
}else{
_38b("overrides")[name]=_392;
}
},readOption:function(name,_393){
_38c(_393,"defaultValue");
var _394=null;
if(typeof (Storage)!=="undefined"&&typeof localStorage[name]!=="undefined"){
_394=localStorage[name];
}else{
if(typeof _38b("overrides")[name]!=="undefined"){
_394=_38b("overrides")[name];
}else{
if(typeof _38b("seedValues")[name]!=="undefined"){
_394=_38b("seedValues")[name];
}else{
_394=_393;
}
}
}
return _394;
},clearOption:function(name){
if(typeof (Storage)!=="undefined"){
localStorage.removeItem(name);
}
delete _38b("overrides")[name];
delete _38b("seedValues")[name];
}};
return _38f;
});
},"dijit/PopupMenuBarItem":function(){
define("dijit/PopupMenuBarItem",["dojo/_base/declare","./PopupMenuItem","./MenuBarItem"],function(_395,_396,_397){
var _398=_397._MenuBarItemMixin;
return _395("dijit.PopupMenuBarItem",[_396,_398],{});
});
},"dijit/tree/ForestStoreModel":function(){
define("dijit/tree/ForestStoreModel",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/_base/window","./TreeStoreModel"],function(_399,_39a,lang,win,_39b){
return _39a("dijit.tree.ForestStoreModel",_39b,{rootId:"$root$",rootLabel:"ROOT",query:null,constructor:function(_39c){
this.root={store:this,root:true,id:_39c.rootId,label:_39c.rootLabel,children:_39c.rootChildren};
},mayHaveChildren:function(item){
return item===this.root||this.inherited(arguments);
},getChildren:function(_39d,_39e,_39f){
if(_39d===this.root){
if(this.root.children){
_39e(this.root.children);
}else{
this.store.fetch({query:this.query,onComplete:lang.hitch(this,function(_3a0){
this.root.children=_3a0;
_39e(_3a0);
}),onError:_39f});
}
}else{
this.inherited(arguments);
}
},isItem:function(_3a1){
return (_3a1===this.root)?true:this.inherited(arguments);
},fetchItemByIdentity:function(_3a2){
if(_3a2.identity==this.root.id){
var _3a3=_3a2.scope?_3a2.scope:win.global;
if(_3a2.onItem){
_3a2.onItem.call(_3a3,this.root);
}
}else{
this.inherited(arguments);
}
},getIdentity:function(item){
return (item===this.root)?this.root.id:this.inherited(arguments);
},getLabel:function(item){
return (item===this.root)?this.root.label:this.inherited(arguments);
},newItem:function(args,_3a4,_3a5){
if(_3a4===this.root){
this.onNewRootItem(args);
return this.store.newItem(args);
}else{
return this.inherited(arguments);
}
},onNewRootItem:function(){
},pasteItem:function(_3a6,_3a7,_3a8,_3a9,_3aa){
if(_3a7===this.root){
if(!_3a9){
this.onLeaveRoot(_3a6);
}
}
this.inherited(arguments,[_3a6,_3a7===this.root?null:_3a7,_3a8===this.root?null:_3a8,_3a9,_3aa]);
if(_3a8===this.root){
this.onAddToRoot(_3a6);
}
},onAddToRoot:function(item){
console.log(this,": item ",item," added to root");
},onLeaveRoot:function(item){
console.log(this,": item ",item," removed from root");
},_requeryTop:function(){
var _3ab=this.root.children||[];
this.store.fetch({query:this.query,onComplete:lang.hitch(this,function(_3ac){
this.root.children=_3ac;
if(_3ab.length!=_3ac.length||_399.some(_3ab,function(item,idx){
return _3ac[idx]!=item;
})){
this.onChildrenChange(this.root,_3ac);
}
})});
},onNewItem:function(item,_3ad){
this._requeryTop();
this.inherited(arguments);
},onDeleteItem:function(item){
if(_399.indexOf(this.root.children,item)!=-1){
this._requeryTop();
}
this.inherited(arguments);
},onSetItem:function(item,_3ae,_3af,_3b0){
this._requeryTop();
this.inherited(arguments);
}});
});
},"curam/i18n":function(){
define("curam/i18n",["curam/define"],function(){
curam.define.singleton("curam.i18n",{values:{},set:function(key,_3b1){
curam.i18n.values[key]=_3b1;
},get:function(key){
return curam.i18n.values[key];
}});
return curam.i18n;
});
},"curam/pagination":function(){
define("curam/pagination",["curam/define","dojo/parser","curam/pagination/ControlPanel","curam/pagination/StateController","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _3b2=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.pagination",{defaultPageSize:15,threshold:15,listModels:{},ROW_COUNT_CLASS_NAME:"numRows-",ESC_SCRIPT_START:"<!--@pg@",ESC_SCRIPT_END:"@pg@-->",localizedStrings:{firstPage_btn:"|<",firstPage_title:"$not-localized$ First page",prevPage_btn:"<",prevPage_title:"$not-localized$ Previous page",nextPage_btn:">",nextPage_title:"$not-localized$ Next page",lastPage_btn:">|",lastPage_title:"$not-localized$ Last page",pageSize_title:"$not-localized$ Page size",pagination_info:"$not-localized$ Displaying rows %s to %s out of %s",page_title:"Go to page"},addPagination:function(_3b3,_3b4){
var _3b5=_3b3.getRowCount();
if(_3b5<=curam.pagination.threshold){
_3b3.showRange(1,_3b5);
return;
}
var _3b6=_3b3.getId();
curam.debug.log("curam.pagination.addPagination: listId: ",_3b6);
if(curam.pagination.listModels[_3b6]){
throw "Pagination on this list has already been initialized: "+_3b6;
}
curam.pagination.listModels[_3b6]=_3b3;
curam.debug.log("curam.pagination.listModels : ",curam.pagination.listModels);
var gui=new curam.pagination.ControlPanel(_3b4);
var _3b7=new curam.pagination.StateController(_3b3,gui);
_3b3._controller=_3b7;
dojo.subscribe("/curam/list/toBeSorted",this,function(_3b8){
curam.debug.log(_3b2.getProperty("curam.omega3-util.received")+" /curam/list/toBeSorted "+_3b2.getProperty("curam.omega3-util.for")+":",_3b8);
curam.pagination.unpackAll(curam.pagination.listModels[_3b8]);
});
dojo.subscribe("/curam/list/sorted",this,function(_3b9){
curam.debug.log(_3b2.getProperty("curam.omega3-util.received")+" /curam/list/sorted "+_3b2.getProperty("curam.omega3-util.for")+":",_3b9);
curam.pagination.paginatedListSorted(curam.pagination.listModels[_3b9]);
});
_3b7.gotoFirst();
},paginatedListSorted:function(_3ba){
_3ba._controller.reset();
},unpackRows:function(_3bb){
var _3bc=_3bb.innerHTML;
var _3bd=dojo.hasClass(_3bb,"has-row-actions");
if(_3bd){
_3bc=_3bc.replace(new RegExp(curam.pagination.ESC_SCRIPT_START,"g"),"<script type=\"text/javascript\">");
_3bc=_3bc.replace(new RegExp(curam.pagination.ESC_SCRIPT_END,"g"),"</script>");
}
var _3be=dojo._toDom(_3bc);
if(_3bd){
dojo.query("script",_3be).forEach(function(s){
eval(s.innerHTML);
});
dojo.parser.parse(_3be);
}
dojo.place(_3be,_3bb,"replace");
},unpackAll:function(_3bf){
_3bf._controller.gotoLast();
},readListContent:function(_3c0){
return dojo.query("tbody > *",_3c0).filter(function(n){
return typeof (n.tagName)!="undefined"&&(n.tagName=="TR"||(n.tagName=="SCRIPT"&&dojo.attr(n,"type")=="list-row-container"));
});
},getNumRowsInBlock:function(_3c1){
var _3c2=dojo.filter(_3c1.className.split(" "),function(cn){
return cn.indexOf(curam.pagination.ROW_COUNT_CLASS_NAME)==0;
});
return parseInt(_3c2[0].split(curam.pagination.ROW_COUNT_CLASS_NAME)[1]);
}});
return curam.pagination;
});
},"dijit/TitlePane":function(){
require({cache:{"url:dijit/templates/TitlePane.html":"<div>\n\t<div data-dojo-attach-event=\"onclick:_onTitleClick, onkeypress:_onTitleKey\"\n\t\t\tclass=\"dijitTitlePaneTitle\" data-dojo-attach-point=\"titleBarNode\">\n\t\t<div class=\"dijitTitlePaneTitleFocus\" data-dojo-attach-point=\"focusNode\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"arrowNode\" class=\"dijitArrowNode\" role=\"presentation\"\n\t\t\t/><span data-dojo-attach-point=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span\n\t\t\t><span data-dojo-attach-point=\"titleNode\" class=\"dijitTitlePaneTextNode\"></span>\n\t\t</div>\n\t</div>\n\t<div class=\"dijitTitlePaneContentOuter\" data-dojo-attach-point=\"hideNode\" role=\"presentation\">\n\t\t<div class=\"dijitReset\" data-dojo-attach-point=\"wipeNode\" role=\"presentation\">\n\t\t\t<div class=\"dijitTitlePaneContentInner\" data-dojo-attach-point=\"containerNode\" role=\"region\" id=\"${id}_pane\">\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"}});
define("dijit/TitlePane",["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/_base/event","dojo/fx","dojo/_base/kernel","dojo/keys","./_CssStateMixin","./_TemplatedMixin","./layout/ContentPane","dojo/text!./templates/TitlePane.html","./_base/manager"],function(_3c3,_3c4,dom,_3c5,_3c6,_3c7,_3c8,_3c9,_3ca,keys,_3cb,_3cc,_3cd,_3ce,_3cf){
return _3c4("dijit.TitlePane",[_3cd,_3cc,_3cb],{title:"",_setTitleAttr:{node:"titleNode",type:"innerHTML"},open:true,toggleable:true,tabIndex:"0",duration:_3cf.defaultDuration,baseClass:"dijitTitlePane",templateString:_3ce,doLayout:false,_setTooltipAttr:{node:"focusNode",type:"attribute",attribute:"title"},buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.titleNode,false);
},postCreate:function(){
this.inherited(arguments);
if(this.toggleable){
this._trackMouseState(this.titleBarNode,"dijitTitlePaneTitle");
}
var _3d0=this.hideNode,_3d1=this.wipeNode;
this._wipeIn=_3c9.wipeIn({node:_3d1,duration:this.duration,beforeBegin:function(){
_3d0.style.display="";
}});
this._wipeOut=_3c9.wipeOut({node:_3d1,duration:this.duration,onEnd:function(){
_3d0.style.display="none";
}});
},_setOpenAttr:function(open,_3d2){
_3c3.forEach([this._wipeIn,this._wipeOut],function(_3d3){
if(_3d3&&_3d3.status()=="playing"){
_3d3.stop();
}
});
if(_3d2){
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
},_setToggleableAttr:function(_3d4){
this.focusNode.setAttribute("role",_3d4?"button":"heading");
if(_3d4){
this.focusNode.setAttribute("aria-controls",this.id+"_pane");
_3c5.set(this.focusNode,"tabIndex",this.tabIndex);
}else{
_3c5.remove(this.focusNode,"tabIndex");
}
this._set("toggleable",_3d4);
this._setCss();
},_setContentAttr:function(_3d5){
if(!this.open||!this._wipeOut||this._wipeOut.status()=="playing"){
this.inherited(arguments);
}else{
if(this._wipeIn&&this._wipeIn.status()=="playing"){
this._wipeIn.stop();
}
_3c7.setMarginBox(this.wipeNode,{h:_3c7.getMarginBox(this.wipeNode).h});
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
var _3d6=this._titleBarClass;
this._titleBarClass="dijit"+(this.toggleable?"":"Fixed")+(this.open?"Open":"Closed");
_3c6.replace(node,this._titleBarClass,_3d6||"");
this.arrowNodeInner.innerHTML=this.open?"-":"+";
},_onTitleKey:function(e){
if(e.charOrCode==keys.ENTER||e.charOrCode==" "){
if(this.toggleable){
this.toggle();
}
_3c8.stop(e);
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
},setTitle:function(_3d7){
_3ca.deprecated("dijit.TitlePane.setTitle() is deprecated.  Use set('title', ...) instead.","","2.0");
this.set("title",_3d7);
}});
});
},"url:curam/widget/resources/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:${onClickValue}\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n","curam/charting":function(){
define("curam/charting",["dojo/dom-class","dojo/ready","cm/_base/_dom","curam/define"],function(_3d8,_3d9,dom,_3da){
_3da.singleton("curam.charting",{alignChartWrapper:function(node){
_3d9(function(){
node=dom.getParentByClass(dojo.byId(node),"cluster");
if(node){
_3d8.add(node,"chart-panel");
}
});
}});
return curam.charting;
});
},"curam/widget/ComboBox":function(){
require({cache:{"url:curam/widget/templates/ComboBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\r\n  id=\"widget_${id}\"\r\n  role=\"listbox\"\r\n  ><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\r\n    data-dojo-attach-point=\"_buttonNode, _popupStateNode\" role=\"presentation\"\r\n    ><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n      ${_buttonInputDisabled}\r\n  /></div\r\n  ><div class='dijitReset dijitValidationContainer'\r\n    ><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n  /></div\r\n  ><div class=\"dijitReset dijitInputField dijitInputContainer\" role=\"listbox\"\r\n    ><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\r\n      data-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\r\n  /></div\r\n></div>\r\n"}});
define("curam/widget/ComboBox",["dijit/registry","dojo/on","dojo/text!curam/widget/templates/ComboBox.html","dijit/form/ComboBox"],function(_3db,on,_3dc){
var _3dd=dojo.declare("curam.widget.ComboBox",dijit.form.ComboBox,{templateString:_3dc,enterKeyOnOpenDropDown:false,postCreate:function(){
on(this.focusNode,"keydown",function(e){
var _3de=_3db.byNode(dojo.byId("widget_"+e.target.id));
if(e.keyCode==dojo.keys.ENTER&&_3de._opened){
_3de.enterKeyOnOpenDropDown=true;
}
});
this.inherited(arguments);
}});
return _3dd;
});
},"dijit/form/_ComboBoxMenuMixin":function(){
define("dijit/form/_ComboBoxMenuMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/i18n","dojo/_base/window","dojo/i18n!./nls/ComboBox"],function(_3df,_3e0,_3e1,i18n,win){
return _3e0("dijit.form._ComboBoxMenuMixin",null,{_messages:null,postMixInProperties:function(){
this.inherited(arguments);
this._messages=i18n.getLocalization("dijit.form","ComboBox",this.lang);
},buildRendering:function(){
this.inherited(arguments);
this.previousButton.innerHTML=this._messages["previousMessage"];
this.nextButton.innerHTML=this._messages["nextMessage"];
},_setValueAttr:function(_3e2){
this.value=_3e2;
this.onChange(_3e2);
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
},_createOption:function(item,_3e3){
var _3e4=this._createMenuItem();
var _3e5=_3e3(item);
if(_3e5.html){
_3e4.innerHTML=_3e5.label;
}else{
_3e4.appendChild(win.doc.createTextNode(_3e5.label));
}
if(_3e4.innerHTML==""){
_3e4.innerHTML="&#160;";
}
this.applyTextDir(_3e4,(_3e4.innerText||_3e4.textContent||""));
_3e4.item=item;
return _3e4;
},createOptions:function(_3e6,_3e7,_3e8){
this.items=_3e6;
this.previousButton.style.display=(_3e7.start==0)?"none":"";
_3e1.set(this.previousButton,"id",this.id+"_prev");
_3df.forEach(_3e6,function(item,i){
var _3e9=this._createOption(item,_3e8);
_3e9.setAttribute("item",i);
_3e1.set(_3e9,"id",this.id+i);
this.nextButton.parentNode.insertBefore(_3e9,this.nextButton);
},this);
var _3ea=false;
if(_3e6.total&&!_3e6.total.then&&_3e6.total!=-1){
if((_3e7.start+_3e7.count)<_3e6.total){
_3ea=true;
}else{
if((_3e7.start+_3e7.count)>_3e6.total&&_3e7.count==_3e6.length){
_3ea=true;
}
}
}else{
if(_3e7.count==_3e6.length){
_3ea=true;
}
}
this.nextButton.style.display=_3ea?"":"none";
_3e1.set(this.nextButton,"id",this.id+"_next");
},clearResultList:function(){
var _3eb=this.containerNode;
while(_3eb.childNodes.length>2){
_3eb.removeChild(_3eb.childNodes[_3eb.childNodes.length-2]);
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
define("dojo/parser",["./_base/kernel","./_base/lang","./_base/array","./_base/config","./_base/html","./_base/window","./_base/url","./_base/json","./aspect","./date/stamp","./has","./query","./on","./ready"],function(dojo,_3ec,_3ed,_3ee,_3ef,_3f0,_3f1,_3f2,_3f3,_3f4,has,_3f5,don,_3f6){
new Date("X");
if(1){
var form=document.createElement("form");
has.add("dom-attributes-explicit",form.attributes.length==0);
has.add("dom-attributes-specified-flag",form.attributes.length<40);
}
dojo.parser=new function(){
var _3f7={};
function _3f8(_3f9){
var map={};
for(var name in _3f9){
if(name.charAt(0)=="_"){
continue;
}
map[name.toLowerCase()]=name;
}
return map;
};
_3f3.after(_3ec,"extend",function(){
_3f7={};
},true);
var _3fa={};
function _3fb(type){
var map=_3fa[type]||(_3fa[type]={});
return map["__type"]||(map["__type"]=(_3ec.getObject(type)||require(type)));
};
this._functionFromScript=function(_3fc,_3fd){
var _3fe="";
var _3ff="";
var _400=(_3fc.getAttribute(_3fd+"args")||_3fc.getAttribute("args"));
if(_400){
_3ed.forEach(_400.split(/\s*,\s*/),function(part,idx){
_3fe+="var "+part+" = arguments["+idx+"]; ";
});
}
var _401=_3fc.getAttribute("with");
if(_401&&_401.length){
_3ed.forEach(_401.split(/\s*,\s*/),function(part){
_3fe+="with("+part+"){";
_3ff+="}";
});
}
return new Function(_3fe+_3fc.innerHTML+_3ff);
};
this.instantiate=function(_402,_403,_404){
_403=_403||{};
_404=_404||{};
var _405=(_404.scope||dojo._scopeName)+"Type",_406="data-"+(_404.scope||dojo._scopeName)+"-",_407=_406+"type";
var list=[];
_3ed.forEach(_402,function(node){
var type=_405 in _403?_403[_405]:node.getAttribute(_407)||node.getAttribute(_405);
if(type){
list.push({node:node,"type":type});
}
});
return this._instantiate(list,_403,_404);
};
this._instantiate=function(_408,_409,_40a){
var _40b=[];
var _40c=(_40a.scope||dojo._scopeName)+"Type",_40d="data-"+(_40a.scope||dojo._scopeName)+"-",_40e=_40d+"type",_40f=_40d+"props",_410=_40d+"attach-point",_411=_40d+"attach-event",_412=_40d+"id",_413=_40d+"mixins";
var _414={};
_3ed.forEach([_40f,_40e,_40c,_412,"jsId",_410,_411,"dojoAttachPoint","dojoAttachEvent","class","style",_413],function(name){
_414[name.toLowerCase()]=name.replace(_40a.scope,"dojo");
});
function _415(type,_416){
return type.createSubclass&&type.createSubclass(_416)||type.extend.apply(type,_416);
};
_3ed.forEach(_408,function(obj){
if(!obj){
return;
}
var node=obj.node,type=obj.type,_417=node.getAttribute(_413),ctor;
if(_417){
var map=_3fa[type];
_417=_417.replace(/ /g,"");
ctor=map&&map[_417];
if(!ctor){
ctor=_3fb(type);
ctor=_3fa[type][_417]=_415(ctor,_3ed.map(_417.split(","),_3fb));
}
}else{
ctor=_3fb(type);
}
var _418=ctor&&ctor.prototype;
var _419={};
if(_40a.defaults){
_3ec.mixin(_419,_40a.defaults);
}
if(obj.inherited){
_3ec.mixin(_419,obj.inherited);
}
var _41a;
if(has("dom-attributes-explicit")){
_41a=node.attributes;
}else{
if(has("dom-attributes-specified-flag")){
_41a=_3ed.filter(node.attributes,function(a){
return a.specified;
});
}else{
var _41b=/^input$|^img$/i.test(node.nodeName)?node:node.cloneNode(false),_41c=_41b.outerHTML.replace(/=[^\s"']+|="[^"]*"|='[^']*'/g,"").replace(/^\s*<[a-zA-Z0-9]*\s*/,"").replace(/\s*>.*$/,"");
_41a=_3ed.map(_41c.split(/\s+/),function(name){
var _41d=name.toLowerCase();
return {name:name,value:(node.nodeName=="LI"&&name=="value")||_41d=="enctype"?node.getAttribute(_41d):node.getAttributeNode(_41d).value};
});
}
}
var i=0,item;
while(item=_41a[i++]){
var name=item.name,_41e=name.toLowerCase(),_41f=item.value;
if(_41e in _414){
switch(_414[_41e]){
case "data-dojo-props":
var _420=_41f;
break;
case "data-dojo-id":
case "jsId":
var _421=_41f;
break;
case "data-dojo-attach-point":
case "dojoAttachPoint":
_419.dojoAttachPoint=_41f;
break;
case "data-dojo-attach-event":
case "dojoAttachEvent":
_419.dojoAttachEvent=_41f;
break;
case "class":
_419["class"]=node.className;
break;
case "style":
_419["style"]=node.style&&node.style.cssText;
break;
}
}else{
if(!(name in _418)){
var map=(_3f7[type]||(_3f7[type]=_3f8(_418)));
name=map[_41e]||name;
}
if(name in _418){
switch(typeof _418[name]){
case "string":
_419[name]=_41f;
break;
case "number":
_419[name]=_41f.length?Number(_41f):NaN;
break;
case "boolean":
_419[name]=_41f.toLowerCase()!="false";
break;
case "function":
if(_41f===""||_41f.search(/[^\w\.]+/i)!=-1){
_419[name]=new Function(_41f);
}else{
_419[name]=_3ec.getObject(_41f,false)||new Function(_41f);
}
break;
default:
var pVal=_418[name];
_419[name]=(pVal&&"length" in pVal)?(_41f?_41f.split(/\s*,\s*/):[]):(pVal instanceof Date)?(_41f==""?new Date(""):_41f=="now"?new Date():_3f4.fromISOString(_41f)):(pVal instanceof dojo._Url)?(dojo.baseUrl+_41f):_3f2.fromJson(_41f);
}
}else{
_419[name]=_41f;
}
}
}
if(_420){
try{
_420=_3f2.fromJson.call(_40a.propsThis,"{"+_420+"}");
_3ec.mixin(_419,_420);
}
catch(e){
throw new Error(e.toString()+" in data-dojo-props='"+_420+"'");
}
}
_3ec.mixin(_419,_409);
var _422=obj.scripts||(ctor&&(ctor._noScript||_418._noScript)?[]:_3f5("> script[type^='dojo/']",node));
var _423=[],_424=[],_425=[],on=[];
if(_422){
for(i=0;i<_422.length;i++){
var _426=_422[i];
node.removeChild(_426);
var _427=(_426.getAttribute(_40d+"event")||_426.getAttribute("event")),prop=_426.getAttribute(_40d+"prop"),_428=_426.getAttribute("type"),nf=this._functionFromScript(_426,_40d);
if(_427){
if(_428=="dojo/connect"){
_423.push({event:_427,func:nf});
}else{
if(_428=="dojo/on"){
on.push({event:_427,func:nf});
}else{
_419[_427]=nf;
}
}
}else{
if(_428=="dojo/watch"){
_425.push({prop:prop,func:nf});
}else{
_424.push(nf);
}
}
}
}
var _429=ctor.markupFactory||_418.markupFactory;
var _42a=_429?_429(_419,node,ctor):new ctor(_419,node);
_40b.push(_42a);
if(_421){
_3ec.setObject(_421,_42a);
}
for(i=0;i<_423.length;i++){
_3f3.after(_42a,_423[i].event,dojo.hitch(_42a,_423[i].func),true);
}
for(i=0;i<_424.length;i++){
_424[i].call(_42a);
}
for(i=0;i<_425.length;i++){
_42a.watch(_425[i].prop,_425[i].func);
}
for(i=0;i<on.length;i++){
don(_42a,on[i].event,on[i].func);
}
},this);
if(!_409._started){
_3ed.forEach(_40b,function(_42b){
if(!_40a.noStart&&_42b&&_3ec.isFunction(_42b.startup)&&!_42b._started){
_42b.startup();
}
});
}
return _40b;
};
this.scan=function(root,_42c){
var list=[];
var _42d=(_42c.scope||dojo._scopeName)+"Type",_42e="data-"+(_42c.scope||dojo._scopeName)+"-",_42f=_42e+"type",_430=_42e+"textdir";
var node=root.firstChild;
var _431=_42c.inherited;
if(!_431){
function _432(node,attr){
return (node.getAttribute&&node.getAttribute(attr))||(node!==_3f0.doc&&node!==_3f0.doc.documentElement&&node.parentNode?_432(node.parentNode,attr):null);
};
_431={dir:_432(root,"dir"),lang:_432(root,"lang"),textDir:_432(root,_430)};
for(var key in _431){
if(!_431[key]){
delete _431[key];
}
}
}
var _433={inherited:_431};
var _434;
var _435;
function _436(_437){
if(!_437.inherited){
_437.inherited={};
var node=_437.node,_438=_436(_437.parent);
var _439={dir:node.getAttribute("dir")||_438.dir,lang:node.getAttribute("lang")||_438.lang,textDir:node.getAttribute(_430)||_438.textDir};
for(var key in _439){
if(_439[key]){
_437.inherited[key]=_439[key];
}
}
}
return _437.inherited;
};
while(true){
if(!node){
if(!_433||!_433.node){
break;
}
node=_433.node.nextSibling;
_434=_433.scripts;
_435=false;
_433=_433.parent;
continue;
}
if(node.nodeType!=1){
node=node.nextSibling;
continue;
}
if(_434&&node.nodeName.toLowerCase()=="script"){
type=node.getAttribute("type");
if(type&&/^dojo\/\w/i.test(type)){
_434.push(node);
}
node=node.nextSibling;
continue;
}
if(_435){
node=node.nextSibling;
continue;
}
var type=node.getAttribute(_42f)||node.getAttribute(_42d);
var _43a=node.firstChild;
if(!type&&(!_43a||(_43a.nodeType==3&&!_43a.nextSibling))){
node=node.nextSibling;
continue;
}
var _43b={node:node,scripts:_434,parent:_433};
var ctor;
try{
ctor=type&&_3fb(type);
}
catch(e){
}
var _43c=ctor&&!ctor.prototype._noScript?[]:null;
if(type){
list.push({"type":type,node:node,scripts:_43c,inherited:_436(_43b)});
}
node=_43a;
_434=_43c;
_435=ctor&&ctor.prototype.stopParser&&!(_42c.template);
_433=_43b;
}
return list;
};
this.parse=function(_43d,_43e){
var root;
if(!_43e&&_43d&&_43d.rootNode){
_43e=_43d;
root=_43e.rootNode;
}else{
if(_43d&&_3ec.isObject(_43d)&&!("nodeType" in _43d)){
_43e=_43d;
}else{
root=_43d;
}
}
root=root?_3ef.byId(root):_3f0.body();
_43e=_43e||{};
var list=this.scan(root,_43e);
var _43f=_43e.template?{template:true}:{};
return this._instantiate(list,_43f,_43e);
};
}();
if(_3ee.parseOnLoad){
_3f6(100,dojo.parser,"parse");
}
return dojo.parser;
});
},"dojox/html/_base":function(){
define("dojox/html/_base",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/xhr","dojo/_base/window","dojo/_base/sniff","dojo/_base/url","dojo/dom-construct","dojo/html","dojo/_base/declare"],function(dojo,lang,_440,_441,has,_442,_443,_444){
var html=dojo.getObject("dojox.html",true);
if(has("ie")){
var _445=/(AlphaImageLoader\([^)]*?src=(['"]))(?![a-z]+:|\/)([^\r\n;}]+?)(\2[^)]*\)\s*[;}]?)/g;
}
var _446=/(?:(?:@import\s*(['"])(?![a-z]+:|\/)([^\r\n;{]+?)\1)|url\(\s*(['"]?)(?![a-z]+:|\/)([^\r\n;]+?)\3\s*\))([a-z, \s]*[;}]?)/g;
var _447=html._adjustCssPaths=function(_448,_449){
if(!_449||!_448){
return;
}
if(_445){
_449=_449.replace(_445,function(_44a,pre,_44b,url,post){
return pre+(new _442(_448,"./"+url).toString())+post;
});
}
return _449.replace(_446,function(_44c,_44d,_44e,_44f,_450,_451){
if(_44e){
return "@import \""+(new _442(_448,"./"+_44e).toString())+"\""+_451;
}else{
return "url("+(new _442(_448,"./"+_450).toString())+")"+_451;
}
});
};
var _452=/(<[a-z][a-z0-9]*\s[^>]*)(?:(href|src)=(['"]?)([^>]*?)\3|style=(['"]?)([^>]*?)\5)([^>]*>)/gi;
var _453=html._adjustHtmlPaths=function(_454,cont){
var url=_454||"./";
return cont.replace(_452,function(tag,_455,name,_456,_457,_458,_459,end){
return _455+(name?(name+"="+_456+(new _442(url,_457).toString())+_456):("style="+_458+_447(url,_459)+_458))+end;
});
};
var _45a=html._snarfStyles=function(_45b,cont,_45c){
_45c.attributes=[];
return cont.replace(/(?:<style([^>]*)>([\s\S]*?)<\/style>|<link\s+(?=[^>]*rel=['"]?stylesheet)([^>]*?href=(['"])([^>]*?)\4[^>\/]*)\/?>)/gi,function(_45d,_45e,_45f,_460,_461,href){
var i,attr=(_45e||_460||"").replace(/^\s*([\s\S]*?)\s*$/i,"$1");
if(_45f){
i=_45c.push(_45b?_447(_45b,_45f):_45f);
}else{
i=_45c.push("@import \""+href+"\";");
attr=attr.replace(/\s*(?:rel|href)=(['"])?[^\s]*\1\s*/gi,"");
}
if(attr){
attr=attr.split(/\s+/);
var _462={},tmp;
for(var j=0,e=attr.length;j<e;j++){
tmp=attr[j].split("=");
_462[tmp[0]]=tmp[1].replace(/^\s*['"]?([\s\S]*?)['"]?\s*$/,"$1");
}
_45c.attributes[i-1]=_462;
}
return "";
});
};
var _463=html._snarfScripts=function(cont,_464){
_464.code="";
cont=cont.replace(/<[!][-][-](.|\s)*?[-][-]>/g,function(_465){
return _465.replace(/<(\/?)script\b/ig,"&lt;$1Script");
});
function _466(src){
if(_464.downloadRemote){
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
_440.get({url:src,sync:true,load:function(code){
_464.code+=code+";";
},error:_464.errBack});
}
};
return cont.replace(/<script\s*(?![^>]*type=['"]?(?:dojo\/|text\/html\b))(?:[^>]*?(?:src=(['"]?)([^>]*?)\1[^>]*)?)*>([\s\S]*?)<\/script>/gi,function(_467,_468,src,code){
if(src){
_466(src);
}else{
_464.code+=code;
}
return "";
});
};
var _469=html.evalInGlobal=function(code,_46a){
_46a=_46a||_441.doc.body;
var n=_46a.ownerDocument.createElement("script");
n.type="text/javascript";
_46a.appendChild(n);
n.text=code;
};
html._ContentSetter=dojo.declare(_444._ContentSetter,{adjustPaths:false,referencePath:".",renderStyles:false,executeScripts:false,scriptHasHooks:false,scriptHookReplacement:null,_renderStyles:function(_46b){
this._styleNodes=[];
var st,att,_46c,doc=this.node.ownerDocument;
var head=doc.getElementsByTagName("head")[0];
for(var i=0,e=_46b.length;i<e;i++){
_46c=_46b[i];
att=_46b.attributes[i];
st=doc.createElement("style");
st.setAttribute("type","text/css");
for(var x in att){
st.setAttribute(x,att[x]);
}
this._styleNodes.push(st);
head.appendChild(st);
if(st.styleSheet){
st.styleSheet.cssText=_46c;
}else{
st.appendChild(doc.createTextNode(_46c));
}
}
},empty:function(){
this.inherited("empty",arguments);
this._styles=[];
},onBegin:function(){
this.inherited("onBegin",arguments);
var cont=this.content,node=this.node;
var _46d=this._styles;
if(lang.isString(cont)){
if(this.adjustPaths&&this.referencePath){
cont=_453(this.referencePath,cont);
}
if(this.renderStyles||this.cleanContent){
cont=_45a(this.referencePath,cont,_46d);
}
if(this.executeScripts){
var _46e=this;
var _46f={downloadRemote:true,errBack:function(e){
_46e._onError.call(_46e,"Exec","Error downloading remote script in \""+_46e.id+"\"",e);
}};
cont=_463(cont,_46f);
this._code=_46f.code;
}
}
this.content=cont;
},onEnd:function(){
var code=this._code,_470=this._styles;
if(this._styleNodes&&this._styleNodes.length){
while(this._styleNodes.length){
_443.destroy(this._styleNodes.pop());
}
}
if(this.renderStyles&&_470&&_470.length){
this._renderStyles(_470);
}
if(this.executeScripts&&code){
if(this.cleanContent){
code=code.replace(/(<!--|(?:\/\/)?-->|<!\[CDATA\[|\]\]>)/g,"");
}
if(this.scriptHasHooks){
code=code.replace(/_container_(?!\s*=[^=])/g,this.scriptHookReplacement);
}
try{
_469(code,this.node);
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
_443.destroy(this._styleNodes.pop());
}
}
delete this._styleNodes;
dojo.mixin(this,html._ContentSetter.prototype);
}});
html.set=function(node,cont,_471){
if(!_471){
return _444._setNodeContent(node,cont,true);
}else{
var op=new html._ContentSetter(dojo.mixin(_471,{content:cont,node:node}));
return op.set();
}
};
return html;
});
},"url:dijit/form/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n","curam/widget/OptimalBrowserMessage":function(){
require({cache:{"url:curam/widget/templates/OptimalBrowserMessage.html":"<div>\n  <div class=\"hidden\"\n       data-dojo-type=\"dojox/layout/ContentPane\"\n       data-dojo-attach-point=\"_optimalMessage\">\n  </div>\n</div>\n"}});
define("curam/widget/OptimalBrowserMessage",["dojo/_base/declare","dojo/_base/lang","curam/util","curam/util/UIMFragment","curam/ui/ClientDataAccessor","dijit/_Widget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/form/Button","dojo/text!curam/widget/templates/OptimalBrowserMessage.html"],function(_472,lang,util,_473,_474,_475,_476,_477,_478,_479,_47a,_47b){
return _472("curam.widget.OptimalBrowserMessage",[_475,_476,_477],{OPTIMAL_BROWSER_MSG:"optimal-browser-msg",isExternalApp:null,optimalBrowserMsgPaddingCSS:"optimal-browser-banner",optimalBrowserNode:null,appSectionsNode:null,appBannerHeaderNode:null,intApp:"internal",extApp:"external",context:null,templateString:_47b,widgetsInTemplate:true,baseClass:"",optimalBrowserNodeID:"_optimalMessage",_appConfig:null,postMixInProperties:function(){
this.inherited(arguments);
},startup:function(){
this.inherited(arguments);
this._init();
this._loadNodes(this._optimalMessage.id);
},_init:function(){
da=new _474();
da.getRaw("/config/tablayout/settings["+curam.config.appID+"]",lang.hitch(this,function(data){
console.log("External App config data:"+data);
this._appConfig=data;
this._getAppConfig();
}),function(_47c,args){
console.log("External App config data load error:"+_47c);
},null);
},_getAppConfig:function(){
var _47d=this._appConfig.optimalBrowserMessageEnabled;
var _47e=util.getTopmostWindow().dojox;
var _47f=this._createStorageKey(this.OPTIMAL_BROWSER_MSG);
var _480=this;
var _481=false;
if(_47d=="true"|_47d=="TRUE"){
util.runStorageFn(function(){
_481=true;
_480.context=_47e;
return _480._isOptimalBrowserCheckDue(_47e,_47f,_480);
});
if(!_481){
return this._isOptimalBrowserCheckDue(this.context,_47f,_480);
}
}
return false;
},_isOptimalBrowserCheckDue:function(_482,_483,_484){
if(_482!=undefined){
var _485=_482.storage.get(_483);
if(_485&&_485!=""){
if(new Date(_484._getTargetDate())>new Date(_485)){
_484._executeBrowserVersionCheck(_482);
return true;
}
}else{
_484._executeBrowserVersionCheck(_482);
return true;
}
return false;
}
},_executeBrowserVersionCheck:function(_486){
var _487=this._appConfig.ieMinVersion;
var _488=this._appConfig.ieMaxVersion;
var _489=this._appConfig.ffMinVersion;
var _48a=this._appConfig.ffMaxVersion;
var _48b=this._appConfig.chromeMinVersion;
var _48c=this._appConfig.chromeMaxVersion;
var _48d=this._appConfig.safariMinVersion;
var _48e=this._appConfig.safariMaxVersion;
var _48f=dojo.isIE;
var _490=dojo.isFF;
var _491=dojo.isChrome;
var _492=dojo.isSafari;
if(_48f!=undefined){
return this._isCurrentBrowserVerSupported(_486,_48f,_487,_488);
}else{
if(_490!=undefined&&this.isExternalApp){
return this._isCurrentBrowserVerSupported(_486,_490,_489,_48a);
}else{
if(_491!=undefined){
return this._isCurrentBrowserVerSupported(_486,_491,_48b,_48c);
}else{
if(_492!=undefined&&this.isExternalApp){
return this._isCurrentBrowserVerSupported(_486,_492,_48d,_48e);
}
}
}
}
return false;
},_isCurrentBrowserVerSupported:function(_493,_494,_495,_496){
var _497=false;
if(_495>0){
if(_494<_495){
_497=true;
this._displayOptimalBrowserMsg(_493);
return true;
}
}
if(_496>0&&!_497){
if(_494>_496){
this._displayOptimalBrowserMsg(_493);
return true;
}
}
return false;
},_displayOptimalBrowserMsg:function(_498){
this._addOrRemoveCssForInternalApp(true,this.optimalBrowserMsgPaddingCSS);
_473.get({url:"optimal-browser-msg-fragment.jspx",targetID:this._optimalMessage.id});
this._postRenderingTasks(_498);
},_postRenderingTasks:function(_499){
var _49a=this._optimalMessage.id;
dojo.addOnLoad(function(){
var _49b=dojo.byId(_49a);
dojo.removeClass(_49b,_49b.className);
});
if(_499.storage!=undefined){
_499.storage.put(this._createStorageKey(this.OPTIMAL_BROWSER_MSG),this._getTargetDate(this._appConfig.nextBrowserCheck));
}
return _499;
},_loadNodes:function(_49c){
dojo.addOnLoad(function(){
this.optimalBrowserNode=dojo.byId(_49c);
this.appSectionsNode=dojo.byId("app-sections-container-dc");
this.appBannerHeaderNode=dojo.byId("app-header-container-dc");
});
},_createStorageKey:function(_49d){
if(this.isExternalApp){
_49d=_49d+"_"+this.extApp;
}else{
_49d=_49d+"_"+this.intApp;
}
return _49d;
},_addOrRemoveCssForInternalApp:function(_49e,_49f){
var _4a0=this.isExternalApp;
dojo.addOnLoad(function(){
if(!_4a0){
if(_49e){
dojo.addClass(this.appSectionsNode,_49f);
if(this.appBannerHeaderNode){
dojo.addClass(this.appSectionsNode.children.item(1),_49f);
dojo.addClass(this.appSectionsNode.children.item(2),_49f);
}
}else{
dojo.removeClass(this.appSectionsNode,_49f);
if(this.appBannerHeaderNode){
dojo.removeClass(this.appSectionsNode.children.item(1),_49f);
dojo.removeClass(this.appSectionsNode.children.item(2),_49f);
}
}
}
});
},_getTargetDate:function(_4a1){
var _4a2=new Date();
if(_4a1==undefined){
_4a2.setDate(_4a2.getDate());
}else{
_4a2.setDate(_4a2.getDate()+_4a1);
}
return _4a2.toUTCString();
},exitOptimalBrowserMessageBox:function(){
var _4a3=dojo.byId(this._optimalMessage.id);
if(_4a3){
_4a3.parentNode.removeChild(_4a3);
}
this._addOrRemoveCssForInternalApp(false,this.optimalBrowserMsgPaddingCSS);
}});
});
},"dijit/form/ToggleButton":function(){
define("dijit/form/ToggleButton",["dojo/_base/declare","dojo/_base/kernel","./Button","./_ToggleButtonMixin"],function(_4a4,_4a5,_4a6,_4a7){
return _4a4("dijit.form.ToggleButton",[_4a6,_4a7],{baseClass:"dijitToggleButton",setChecked:function(_4a8){
_4a5.deprecated("setChecked("+_4a8+") is deprecated. Use set('checked',"+_4a8+") instead.","","2.0");
this.set("checked",_4a8);
}});
});
},"dojo/date/stamp":function(){
define("dojo/date/stamp",["../_base/kernel","../_base/lang","../_base/array"],function(dojo,lang,_4a9){
lang.getObject("date.stamp",true,dojo);
dojo.date.stamp.fromISOString=function(_4aa,_4ab){
if(!dojo.date.stamp._isoRegExp){
dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
}
var _4ac=dojo.date.stamp._isoRegExp.exec(_4aa),_4ad=null;
if(_4ac){
_4ac.shift();
if(_4ac[1]){
_4ac[1]--;
}
if(_4ac[6]){
_4ac[6]*=1000;
}
if(_4ab){
_4ab=new Date(_4ab);
_4a9.forEach(_4a9.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(prop){
return _4ab["get"+prop]();
}),function(_4ae,_4af){
_4ac[_4af]=_4ac[_4af]||_4ae;
});
}
_4ad=new Date(_4ac[0]||1970,_4ac[1]||0,_4ac[2]||1,_4ac[3]||0,_4ac[4]||0,_4ac[5]||0,_4ac[6]||0);
if(_4ac[0]<100){
_4ad.setFullYear(_4ac[0]||1970);
}
var _4b0=0,_4b1=_4ac[7]&&_4ac[7].charAt(0);
if(_4b1!="Z"){
_4b0=((_4ac[8]||0)*60)+(Number(_4ac[9])||0);
if(_4b1!="-"){
_4b0*=-1;
}
}
if(_4b1){
_4b0-=_4ad.getTimezoneOffset();
}
if(_4b0){
_4ad.setTime(_4ad.getTime()+_4b0*60000);
}
}
return _4ad;
};
dojo.date.stamp.toISOString=function(_4b2,_4b3){
var _4b4=function(n){
return (n<10)?"0"+n:n;
};
_4b3=_4b3||{};
var _4b5=[],_4b6=_4b3.zulu?"getUTC":"get",date="";
if(_4b3.selector!="time"){
var year=_4b2[_4b6+"FullYear"]();
date=["0000".substr((year+"").length)+year,_4b4(_4b2[_4b6+"Month"]()+1),_4b4(_4b2[_4b6+"Date"]())].join("-");
}
_4b5.push(date);
if(_4b3.selector!="date"){
var time=[_4b4(_4b2[_4b6+"Hours"]()),_4b4(_4b2[_4b6+"Minutes"]()),_4b4(_4b2[_4b6+"Seconds"]())].join(":");
var _4b7=_4b2[_4b6+"Milliseconds"]();
if(_4b3.milliseconds){
time+="."+(_4b7<100?"0":"")+_4b4(_4b7);
}
if(_4b3.zulu){
time+="Z";
}else{
if(_4b3.selector!="time"){
var _4b8=_4b2.getTimezoneOffset();
var _4b9=Math.abs(_4b8);
time+=(_4b8>0?"-":"+")+_4b4(Math.floor(_4b9/60))+":"+_4b4(_4b9%60);
}
}
_4b5.push(time);
}
return _4b5.join("T");
};
return dojo.date.stamp;
});
},"dojo/Stateful":function(){
define("dojo/Stateful",["./_base/declare","./_base/lang","./_base/array"],function(_4ba,lang,_4bb){
return _4ba("dojo.Stateful",null,{postscript:function(_4bc){
if(_4bc){
lang.mixin(this,_4bc);
}
},get:function(name){
return this[name];
},set:function(name,_4bd){
if(typeof name==="object"){
for(var x in name){
if(name.hasOwnProperty(x)&&x!="_watchCallbacks"){
this.set(x,name[x]);
}
}
return this;
}
var _4be=this[name];
this[name]=_4bd;
if(this._watchCallbacks){
this._watchCallbacks(name,_4be,_4bd);
}
return this;
},watch:function(name,_4bf){
var _4c0=this._watchCallbacks;
if(!_4c0){
var self=this;
_4c0=this._watchCallbacks=function(name,_4c1,_4c2,_4c3){
var _4c4=function(_4c5){
if(_4c5){
_4c5=_4c5.slice();
for(var i=0,l=_4c5.length;i<l;i++){
_4c5[i].call(self,name,_4c1,_4c2);
}
}
};
_4c4(_4c0["_"+name]);
if(!_4c3){
_4c4(_4c0["*"]);
}
};
}
if(!_4bf&&typeof name==="function"){
_4bf=name;
name="*";
}else{
name="_"+name;
}
var _4c6=_4c0[name];
if(typeof _4c6!=="object"){
_4c6=_4c0[name]=[];
}
_4c6.push(_4bf);
return {unwatch:function(){
_4c6.splice(_4bb.indexOf(_4c6,_4bf),1);
}};
}});
});
},"curam/ModalDialog":function(){
require({cache:{"url:curam/layout/resources/Dialog.html":"<div class=\"dijitDialog\" role=\"alertdialog\" aria-labelledby=\"${id}_title\">\r\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\r\n\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span>\r\n\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" aria-label=\"${closeModalText}\" tabIndex=\"0\" onKeyDown=\"curam.util.isShiftTab(event)\">\r\n\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\">${closeModalText}</span>\r\n\t</span>\r\n  <span id=\"${id}_prompt\" class=\"hidden\" data-dojo-attach-point=\"promptText\">${modalPromptText}</span>\r\n\t</div>\r\n\t\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\r\n</div>\r\n"}});
define("curam/ModalDialog",["dojo/text!curam/layout/resources/Dialog.html","dojo/dom-geometry","curam/util/external","dijit/Dialog","curam/dialog","curam/tab","curam/debug","curam/ModalUIMController","curam/util/RuntimeContext","curam/util/ResourceBundle"],function(_4c7,_4c8,_4c9){
dojo.requireLocalization("curam.application","Debug");
var _4ca=new curam.util.ResourceBundle("Debug");
var _4cb=dojo.declare("curam.ModalDialog",dijit.Dialog,{templateString:_4c7,autofocus:false,refocus:false,iframeHref:"",iframe:undefined,width:undefined,height:undefined,defaultWidth:600,closeModalText:LOCALISED_MODAL_CLOSE_BUTTON,modalPromptText:". "+LOCALISED_MODAL_SCREEN_READER_PROMPT+" .",maximumWidth:null,maximumHeight:null,_determinedWidth:null,_determinedHeight:null,_horizontalModalSpace:100,_verticalModalSpace:50,duration:5,parentWindow:undefined,isRegisteredForClosing:false,unsubscribes:undefined,modalconnects:undefined,onIframeLoadHandler:undefined,initialized:false,initDone:false,initUnsubToken:null,uimController:null,_helpIcon:null,_title:null,_isMobileUA:false,_isMobileUADialogPositioned:false,uimToken:undefined,postCreate:function(){
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
var _4cc=dojo.subscribe("/curam/dialog/iframeUnloaded",this,function(_4cd,_4ce){
if(this.id==_4cd){
curam.debug.log(_4ca.getProperty("curam.ModalDialog.unload"),_4cd);
curam.dialog.removeFromDialogHierarchy(_4ce);
dojo.style(this.iframe,"visibility","hidden");
this.initDone=false;
this._registerInitListener();
}
});
this.unsubscribes.push(_4cc);
var _4cf=dojo.hitch(this,function(_4d0,_4d1){
curam.debug.log(_4ca.getProperty("curam.ModalDialog.load.init"),_4d0);
curam.util.onLoad.removeSubscriber(this._getEventIdentifier(),_4cf);
curam.dialog.pushOntoDialogHierarchy(this.iframe.contentWindow);
this._determineSize(_4d1);
this._setTabIndex(this.iframe,"0");
if(!this.isRegisteredForClosing){
var _4d2=curam.util.getTopmostWindow();
this.unsubscribes.push(_4d2.dojo.subscribe("/curam/dialog/close",this,function(_4d3){
if(this.id==_4d3){
curam.debug.log("/curam/dialog/close "+_4ca.getProperty("curam.ModalDialog.event.for"),_4d3);
this.hide();
}
}));
this.isRegisteredForClosing=true;
}
this.doShow(_4d1);
this._notifyModalDisplayed();
});
curam.util.onLoad.addSubscriber(this._getEventIdentifier(),_4cf);
var _4d4=true;
this.onLoadSubsequentHandler=dojo.hitch(this,function(_4d5,_4d6){
if(_4d4){
_4d4=false;
}else{
curam.debug.log(_4ca.getProperty("curam.ModalDialog.load"),_4d5);
if(!_4d6.modalClosing){
curam.dialog.pushOntoDialogHierarchy(this.iframe.contentWindow);
this._determineSize(_4d6);
this._position(true);
this.doShow(_4d6);
this._notifyModalDisplayed();
}else{
curam.debug.log(_4ca.getProperty("curam.ModalDialog.close"));
}
}
var _4d7=dojo.byId(_4d5);
var _4d8=_4d7.contentWindow.document.title;
_4d7.setAttribute("title",LOCALISED_MODAL_FRAME_TITLE+" - "+_4d8);
});
curam.util.onLoad.addSubscriber(this._getEventIdentifier(),this.onLoadSubsequentHandler);
this.unsubscribes.push(curam.util.getTopmostWindow().dojo.subscribe("/curam/dialog/iframeFailedToLoad",this,function(_4d9){
curam.util.onLoad.removeSubscriber(this._getEventIdentifier(),_4cf);
this._determineSize({height:450,title:"Error!"});
this.doShow();
this._notifyModalDisplayed();
}));
this.unsubscribes.push(curam.util.getTopmostWindow().dojo.subscribe("/curam/dialog/displayed",this,this._setFocusHandler));
this.unsubscribes.push(curam.util.getTopmostWindow().dojo.subscribe("/curam/dialog/displayed",this,function(_4da){
if(_4da==this.id){
curam.util.getTopmostWindow().dojo.publish("/curam/dialog/AfterDisplay",[_4da]);
}
}));
this.unsubscribes.push(curam.util.getTopmostWindow().dojo.subscribe("/curam/dialog/displayed",this,function(){
curam.util._setModalCurrentlyOpening(false);
}));
var _4db=function(_4dc){
return _4dc.indexOf(":")>0;
};
var _4dd=_4db(this.iframeHref)?this.iframeHref:this._getBaseUrl(curam.util.getTopmostWindow().location.href)+jsL+"/"+this.iframeHref;
this.uimController=new curam.ModalUIMController({uid:this.id,url:_4dd,loadFrameOnCreate:false,inDialog:true,iframeId:this._getEventIdentifier(),width:this._calculateWidth(this.width)+"px",height:this.maximumHeight+"px"});
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
var _4de=dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,function(){
this.domNode.style.display="none";
dijit.Dialog._DialogLevelManager.hide(this);
this._fadeOutDeferred.callback(true);
delete this._fadeOutDeferred;
})});
this._fadeOutDeferred=new dojo.Deferred(dojo.hitch(this,function(){
_4de.stop();
delete this._fadeOutDeferred;
}));
dojo.hitch(this,"onHide")();
_4de.play();
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
},_getBaseUrl:function(_4df){
var _4e0=_4df.indexOf("?");
_4df=(_4e0>-1)?_4df.substring(0,_4e0):_4df;
var _4e1=_4df.lastIndexOf("/");
return _4df.substring(0,_4e1+1);
},_setupHelpIcon:function(_4e2){
var _4e3=typeof _4e2!="undefined"?_4e2.helpEnabled:false;
var _4e4=_4e3?_4e2.helpExtension:"";
var _4e5=_4e3?_4e2.pageID:"";
var _4e6=dojo.query(".modalDialog span.dijitDialogCloseIcon");
for(var i=0;i<_4e6.length;i++){
if(_4e3&&!this._helpIcon){
this._helpIcon=this._createHelpIcon("dijitDialogHelpIcon","dijitDialogHelpIcon-hover",_4e4,_4e6[i]);
this._helpIcon.setAttribute("role","button");
this._setTabIndex(this._helpIcon,"0");
this._helpIcon.setAttribute("onKeyDown","curam.util.isShiftTab(event)");
this._helpIcon._enabled=false;
}
this._setTabIndex(_4e6[i],"0");
}
if(_4e3&&this._helpIcon){
this._helpIcon._pageID=_4e5;
}
if((_4e3&&this._helpIcon&&this._helpIcon._enabled)||(!_4e3||!this._helpIcon||!this._helpIcon._enabled)){
return;
}
dojo.style(this._helpIcon,"display",_4e3?"":"none");
this._helpIcon._enabled=_4e3;
},_createHelpIcon:function(_4e7,_4e8,_4e9,_4ea){
var icon=dojo.create("span",{"class":_4e7,"waiRole":"presentation","title":LOCALISED_MODAL_HELP_ALT});
dojo.place(icon,_4ea,"before");
this.connect(icon,"onclick",function(){
var _4eb=curam.config?curam.config.locale:jsL;
var url;
url="./help.jsp?pageID="+this._helpIcon._pageID;
window.open(url);
});
this.connect(icon,"onkeypress",function(){
if(curam.util.enterKeyPress(event)){
var _4ec=curam.config?curam.config.locale:jsL;
var url;
url="./help.jsp?pageID="+this._helpIcon._pageID;
window.open(url);
}
});
if(_4e8){
this.connect(icon,"onmouseover",function(){
dojo.addClass(icon,_4e8);
});
this.connect(icon,"onmouseout",function(){
dojo.removeClass(icon,_4e8);
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
},_registerOnIframeLoad:function(_4ed){
if(dojo.isIE&&dojo.isIE<9){
this.onIframeLoadHandler=dojo.hitch(this,function(){
if(typeof this.iframe!="undefined"&&typeof this.iframe.readyState!="undefined"&&this.iframe.readyState=="complete"){
_4ed();
}
});
this.iframe.attachEvent("onreadystatechange",this.onIframeLoadHandler);
}else{
this.modalconnects.push(dojo.connect(this.iframe,"onload",this,_4ed));
}
},_startDrag:function(_4ee){
if(!this.iframe){
return;
}
if(_4ee&&_4ee.node&&_4ee.node===this.domNode){
var _4ef=dojo.create("div",{"class":"overlay-iframe"});
_4ef.innerHTML="";
dojo.place(_4ef,this.iframe,"before");
var size=dojo.contentBox(this.containerNode);
dojo.style(_4ef,{width:size.w+"px",height:size.h+"px"});
var _4f0=_4c8.getMarginBoxSimple(dijit._underlay.domNode);
var _4f1={l:_4f0.w-size.w-10,t:_4f0.h-size.h-30};
this._moveable.onMove=function(_4f2,_4f3,e){
_4f3.l=Math.max(5,Math.min(_4f3.l,_4f1.l));
_4f3.t=Math.max(5,Math.min(_4f3.t,_4f1.t));
dojo.dnd.Moveable.prototype.onMove.apply(this,[_4f2,_4f3,e]);
};
}
},_loadErrorHandler:function(){
curam.debug.log(_4ca.getProperty("curam.ModalDialog.onload.notify"),this.iframe);
if(!this.initDone){
dojo.unsubscribe(this.initUnsubToken);
curam.debug.log(_4ca.getProperty("curam.ModalDialog.firing")+" /curam/dialog/iframeFailedToLoad "+_4ca.getProperty("curam.ModalDialog.for"),this.id);
curam.util.getTopmostWindow().dojo.publish("/curam/dialog/iframeFailedToLoad",[this.id]);
}else{
curam.debug.log("UIM "+_4ca.getProperty("curam.ModalDialog.onload.success"));
}
},_setFocusHandler:function(_4f4){
if(_4f4==this.id&&this.initDone){
curam.debug.log("curam.ModalDialog_setFocusHandler(): "+_4ca.getProperty("curam.ModalDialog.execute"),_4f4);
var _4f5=this.iframe.contentWindow;
var _4f6=_4f5.curam.util.doSetFocus();
if(!_4f6){
if(typeof _4f5.dijit=="object"&&typeof _4f5.dijit.focus=="function"){
_4f5.dijit.focus(this.iframe);
}else{
this.iframe.focus();
}
}
}
},_modalDisplayedHandler:function(_4f7){
if(_4f7==this.id){
curam.debug.log(_4ca.getProperty("curam.ModalDialog.dialog.open.1")+"("+this.id+")"+_4ca.getProperty("curam.ModalDialog.dialog.open.2"));
this._markAsActiveDialog(true);
}else{
if(!this.deactivatedBy){
curam.debug.log(_4ca.getProperty("curam.ModalDialog.dialog.deactivating.1")+"("+this.id+"),"+_4ca.getProperty("curam.ModalDialog.dialog.deactivating.2"),_4f7);
this._markAsActiveDialog(false);
this.deactivatedBy=_4f7;
}
}
},_modalClosedHandler:function(_4f8){
if(this.deactivatedBy==_4f8){
curam.debug.log(_4ca.getProperty("curam.ModalDialog.dialog.activating.1")+"("+this.id+"),"+_4ca.getProperty("curam.ModalDialog.dialog.activating.2"),_4f8);
this._markAsActiveDialog(true);
delete this.deactivatedBy;
}
},_destroyOldModals:function(){
require(["curam/dialog"]);
if(!curam.dialog.oldModalsToDestroy){
curam.dialog.oldModalsToDestroy=[];
}
dojo.forEach(curam.dialog.oldModalsToDestroy,function(_4f9){
_4f9._cleanupIframe();
_4f9.destroyRecursive();
});
curam.dialog.oldModalsToDestroy=[];
},_initParentWindowRef:function(){
if(!this.parentWindow){
var _4fa=null;
if(curam.tab.inTabbedUI()){
_4fa=curam.tab.getContentPanelIframe();
}else{
if(_4c9.inExternalApp()){
_4fa=_4c9.getUimParentWindow();
}
}
if(_4fa){
this.parentWindow=_4fa.contentWindow;
}
}else{
if(dojo.hasClass(this.parentWindow.frameElement,"detailsPanelFrame")){
var _4fb=curam.tab.getContentPanelIframe();
var _4fc=curam.util.getLastPathSegmentWithQueryString(_4fb.src);
_4fc=curam.util.removeUrlParam(_4fc,"__o3rpu");
curam.debug.log("o3rpu "+_4ca.getProperty("curam.ModalDialog.property"),encodeURIComponent(_4fc));
this.iframeHref=curam.util.replaceUrlParam(this.iframeHref,"__o3rpu",encodeURIComponent(_4fc));
this.parentWindow=_4fb.contentWindow;
}
}
},_notifyModalDisplayed:function(){
curam.debug.log(_4ca.getProperty("curam.ModalDialog.publishing")+" /curam/dialog/displayed "+_4ca.getProperty("curam.ModalDialog.for"),this.id);
curam.util.getTopmostWindow().dojo.publish("/curam/dialog/displayed",[this.id,{width:this._determinedWidth,height:this._determinedHeight}]);
},_markAsActiveDialog:function(_4fd){
var _4fe="curam-active-modal";
if(_4fd){
dojo.addClass(this.iframe,_4fe);
curam.debug.log(_4ca.getProperty("curam.ModalDialog.add.class"),[this.id,this.iframeHref]);
}else{
dojo.removeClass(this.iframe,_4fe);
curam.debug.log(_4ca.getProperty("curam.ModalDialog.remove.class"),[this.id,this.iframe.src]);
}
},_setHrefAttr:function(href){
curam.debug.log("setHrefAttr");
this.iframeHref=href;
this.inherited(arguments);
},_setTabIndex:function(_4ff,_500){
_4ff.setAttribute("tabIndex",_500);
},_position:function(_501){
curam.debug.log(_4ca.getProperty("curam.ModalDialog.position"));
if(this._isMobileUADialogPositioned==false&&(this.open||_501)){
this.inherited(arguments);
if(this._isMobileUA==true){
this._isMobileUADialogPositioned=true;
}
}else{
curam.debug.log(_4ca.getProperty("curam.ModalDialog.ignoring")+" curam.ModalDialog_position");
}
},_calculateWidth:function(_502){
if(_502){
_502=new Number(_502);
if(!this._isCDEJModal&&typeof (G11N_MODAL_DIALOG_ADJUSTMENT_FACTOR)!="undefined"){
_502*=G11N_MODAL_DIALOG_ADJUSTMENT_FACTOR;
}
if(_502>this.maximumWidth){
curam.debug.log(_4ca.getProperty("curam.ModalDialog.specified.width.over"),this.maximumWidth);
return this.maximumWidth;
}else{
return Math.floor(_502);
}
}else{
var _503=this.defaultWidth;
if(!this._isCDEJModal&&typeof (G11N_MODAL_DIALOG_ADJUSTMENT_FACTOR)!="undefined"){
_503*=G11N_MODAL_DIALOG_ADJUSTMENT_FACTOR;
}
curam.debug.log(_4ca.getProperty("curam.ModalDialog.default.width"),_503);
if(_503>this.maximumWidth){
curam.debug.log(_4ca.getProperty("curam.ModalDialog.default.width.over"),this.maximumWidth);
return this.maximumWidth;
}else{
return Math.floor(_503);
}
}
},_calculateHeight:function(_504,_505){
if(_504){
_504=new Number(_504);
if(_504>this.maximumHeight){
curam.debug.log("specified height exceeds available space, "+"overriding with max available height of ",this.maximumHeight);
return this.maximumHeight;
}else{
if(_504<modalMinimumHeight){
curam.debug.log(_4ca.getProperty("curam.ModalDialog.specified.height.over.1"),modalMinimumHeight);
return modalMinimumHeight;
}else{
return _504;
}
}
}else{
curam.debug.log(_4ca.getProperty("curam.ModalDialog.no.height"),_505);
if(_505>this.maximumHeight){
curam.debug.log(_4ca.getProperty("curam.ModalDialog.calculated.height.over.1"),this.maximumHeight);
return this.maximumHeight;
}else{
if(_505<modalMinimumHeight){
curam.debug.log(_4ca.getProperty("curam.ModalDialog.calculated.height.over.2"),modalMinimumHeight);
return modalMinimumHeight;
}else{
return _505;
}
}
}
},_determineSize:function(_506){
var _507=_506.height;
var _508=_506.windowOptions;
curam.debug.log(_4ca.getProperty("curam.ModalDialog.size"));
try{
var w=this._calculateWidth(this.width);
var h=this._calculateHeight(this.height,_507);
if(_508){
if(_508["width"]||_508["height"]){
curam.debug.log(_4ca.getProperty("curam.ModalDialog.options"));
w=this._calculateWidth(_508["width"]);
h=this._calculateHeight(_508["height"],_507);
}
}
curam.debug.log("curam.ModalDialog:_determineSize() %s x %s",w,h);
this.uimController.setDimensionsForModalDialog(w,h,_506);
this._determinedWidth=w;
this._determinedHeight=h;
this.setTitle(_506,w);
}
catch(e){
curam.debug.log("curam.ModalDialog:_determineSize() : "+_4ca.getProperty("curam.ModalDialog.error")+dojo.toJson(e));
}
},setTitle:function(_509,_50a){
var _50b=_509.title;
if(!_50b){
curam.debug.log("curam.ModalDialog.setTitle() - "+_4ca.getProperty("curam.ModalDialog.no.title"));
_50b="";
}
var _50c=_509.messageTitleAppend;
curam.debug.log("curam.ModalDialog.setTitle('%s')",_50b);
var _50d=_50b.indexOf(_50c);
if(_50d!=-1){
var _50e=dojo.create("span",{innerHTML:_50c,"class":"messagesPresent"});
_50b=_50b.split(_50c).join("<span class=\"messagesPresent\">"+_50c+"</span>");
}
this.titleNode.innerHTML=_50b;
dojo.style(this.titleBar,{width:_50a+"px",height:21+"px"});
dojo.style(this.titleNode,"width",Math.ceil(_50a*0.85)+"px");
},doShow:function(_50f){
curam.debug.log("curam.ModalDialog.doShow(): "+_4ca.getProperty("curam.ModalDialog.show"));
if(!this.initialized){
this.initialized=true;
}
this._setupHelpIcon(_50f);
this.show();
dojo.style(this.iframe,"visibility","visible");
dojo.style(this.domNode,{visibility:"visible"});
},_onHideHandler:function(){
curam.util.getTopmostWindow().dojo.publish("/curam/dialog/BeforeClose",[this.id]);
dojo.style(this.domNode,{visibility:"hidden",display:"block"});
require(["curam/dialog"]);
curam.dialog.removeFromDialogHierarchy(this.iframe.contentWindow);
curam.dialog.removeFromDialogHierarchy(this.parentWindow);
var _510=curam.util.getTopmostWindow();
_510.dojo.publish("/curam/dialog/closed",[this.id]);
dojo.unsubscribe(this.initUnsubToken);
dojo.forEach(this.unsubscribes,_510.dojo.unsubscribe);
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
curam.debug.log(_4ca.getProperty("curam.ModalDialog.deactivating",[this.id]));
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
return _4cb;
});
},"curam/util/portlet/PortletAdaptor":function(){
define("curam/util/portlet/PortletAdaptor",["curam/define","curam/util"],function(){
curam.define.singleton("curam.util.portlet.PortletAdaptor",{initPortlet:function(_511){
curam.util.portlet.PortletAdaptor.modifyPortletLinks();
curam.util.portlet.PortletAdaptor.setTimeoutForBIRTChartPortlets(_511);
return "initialized";
},modifyPortletLinks:function(){
var _512;
var _513=dojo.query("div#podContainer a");
_513.forEach(function(link){
dojo.attr(link,"target","_newWindow");
if(link.onclick!=null&&link.onclick.toString().indexOf("curam.util.UimDialog")!=-1){
var _514=link.innerText||link.textContent;
if(_514!=undefined&&_514.length>0&&_514.lastIndexOf("...")==-1){
var _515=document.createElement("div");
_515.appendChild(document.createTextNode(_514));
link.parentNode.appendChild(_515);
}
_512=link.parentNode;
dojo.destroy(link);
}
if(typeof (_512)=="undefined"){
_512=link.parentNode;
}
});
return _512;
},setTimeoutForBIRTChartPortlets:function(_516){
setTimeout(function(){
curam.util.getTopmostWindow().dojo.publish("pods.fullyloaded");
},_516);
}});
return curam.util.portlet.PortletAdaptor;
});
},"curam/GlobalVars":function(){
define("curam/GlobalVars",["curam/util"],function(){
var _517={popupMappingRepository:[],popupMappingLoaded:[],popupInputs:[],currentPopupProps:null,currentPopupInstanceName:"",popupWindow:null,popupCTCodeMappings:[],popupPropertiesRepository:[],POPUP_EMPTY_SPAN_MIN_SIZE:25,POPUP_EMPTY_SPAN_CHAR:" ",POPUP_EMPTY_SPAN_VALUE:null,replacedButtons:[]};
var gc=dojo.global.curam;
dojo.mixin(gc,_517);
gc.POPUP_EMPTY_SPAN_VALUE=curam.util.fillString(gc.POPUP_EMPTY_SPAN_CHAR,gc.POPUP_EMPTY_SPAN_MIN_SIZE);
return _517;
});
},"dijit/form/ComboButton":function(){
require({cache:{"url:dijit/form/templates/ComboButton.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" data-dojo-attach-point=\"buttonNode\" data-dojo-attach-event=\"ondijitclick:_onClick,onkeypress:_onButtonKeyPress\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" data-dojo-attach-point=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdata-dojo-attach-point=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdata-dojo-attach-event=\"onkeypress:_onArrowKeyPress\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" data-dojo-attach-point=\"valueNode\"\n\t\t/></td></tr></tbody\n></table>\n"}});
define("dijit/form/ComboButton",["dojo/_base/declare","dojo/_base/event","dojo/keys","../focus","./DropDownButton","dojo/text!./templates/ComboButton.html"],function(_518,_519,keys,_51a,_51b,_51c){
return _518("dijit.form.ComboButton",_51b,{templateString:_51c,_setIdAttr:"",_setTabIndexAttr:["focusNode","titleNode"],_setTitleAttr:"titleNode",optionsTitle:"",baseClass:"dijitComboButton",cssStateNodes:{"buttonNode":"dijitButtonNode","titleNode":"dijitButtonContents","_popupStateNode":"dijitDownArrowButton"},_focusedNode:null,_onButtonKeyPress:function(evt){
if(evt.charOrCode==keys[this.isLeftToRight()?"RIGHT_ARROW":"LEFT_ARROW"]){
_51a.focus(this._popupStateNode);
_519.stop(evt);
}
},_onArrowKeyPress:function(evt){
if(evt.charOrCode==keys[this.isLeftToRight()?"LEFT_ARROW":"RIGHT_ARROW"]){
_51a.focus(this.titleNode);
_519.stop(evt);
}
},focus:function(_51d){
if(!this.disabled){
_51a.focus(_51d=="start"?this.titleNode:this._popupStateNode);
}
}});
});
},"dijit/form/_AutoCompleterMixin":function(){
define("dijit/form/_AutoCompleterMixin",["dojo/_base/connect","dojo/data/util/filter","dojo/_base/declare","dojo/_base/Deferred","dojo/dom-attr","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/query","dojo/regexp","dojo/_base/sniff","dojo/string","dojo/_base/window","./DataList","../registry","./_TextBoxMixin"],function(_51e,_51f,_520,_521,_522,_523,keys,lang,_524,_525,has,_526,win,_527,_528,_529){
return _520("dijit.form._AutoCompleterMixin",null,{item:null,pageSize:Infinity,store:null,fetchProperties:{},query:{},autoComplete:true,highlightMatch:"first",searchDelay:100,searchAttr:"name",labelAttr:"",labelType:"text",queryExpr:"${0}*",ignoreCase:true,maxHeight:-1,_stopClickEvents:false,_getCaretPos:function(_52a){
var pos=0;
if(typeof (_52a.selectionStart)=="number"){
pos=_52a.selectionStart;
}else{
if(has("ie")){
var tr=win.doc.selection.createRange().duplicate();
var ntr=_52a.createTextRange();
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
},_setCaretPos:function(_52b,_52c){
_52c=parseInt(_52c);
_529.selectInputText(_52b,_52c,_52c);
},_setDisabledAttr:function(_52d){
this.inherited(arguments);
this.domNode.setAttribute("aria-disabled",_52d);
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
var _52e=false;
var pw=this.dropDown;
var _52f=null;
this._prev_key_backspace=false;
this._abortQuery();
this.inherited(arguments);
if(this._opened){
_52f=pw.getHighlightedOption();
}
switch(key){
case keys.PAGE_DOWN:
case keys.DOWN_ARROW:
case keys.PAGE_UP:
case keys.UP_ARROW:
if(this._opened){
this._announceOption(_52f);
}
_523.stop(evt);
break;
case keys.ENTER:
if(_52f){
if(_52f==pw.nextButton){
this._nextSearch(1);
_523.stop(evt);
break;
}else{
if(_52f==pw.previousButton){
this._nextSearch(-1);
_523.stop(evt);
break;
}
}
}else{
this._setBlurValue();
this._setCaretPos(this.focusNode,this.focusNode.value.length);
}
if(this._opened||this._fetchHandle){
_523.stop(evt);
}
case keys.TAB:
var _530=this.get("displayedValue");
if(pw&&(_530==pw._messages["previousMessage"]||_530==pw._messages["nextMessage"])){
break;
}
if(_52f){
this._selectOption(_52f);
}
case keys.ESCAPE:
if(this._opened){
this._lastQuery=null;
this.closeDropDown();
}
break;
case " ":
if(_52f){
_523.stop(evt);
this._selectOption(_52f);
this.closeDropDown();
}else{
_52e=true;
}
break;
case keys.DELETE:
case keys.BACKSPACE:
this._prev_key_backspace=true;
_52e=true;
break;
default:
_52e=typeof key=="string"||key==229;
}
if(_52e){
this.item=undefined;
this.searchTimer=setTimeout(lang.hitch(this,"_startSearchFromInput"),1);
}
},_autoCompleteText:function(text){
var fn=this.focusNode;
_529.selectInputText(fn,fn.value.length);
var _531=this.ignoreCase?"toLowerCase":"substr";
if(text[_531](0).indexOf(this.focusNode.value[_531](0))==0){
var cpos=this.autoComplete?this._getCaretPos(fn):fn.value.length;
if((cpos+1)>fn.value.length){
fn.value=text;
_529.selectInputText(fn,cpos);
}
}else{
fn.value=text;
_529.selectInputText(fn);
}
},_openResultList:function(_532,_533,_534){
this._fetchHandle=null;
if(this.disabled||this.readOnly||(_533[this.searchAttr]!==this._lastQuery)){
return;
}
var _535=this.dropDown.getHighlightedOption();
this.dropDown.clearResultList();
if(!_532.length&&_534.start==0){
this.closeDropDown();
return;
}
this.dropDown.createOptions(_532,_534,lang.hitch(this,"_getMenuLabelFromItem"));
this._showResultList();
if(_534.direction){
if(1==_534.direction){
this.dropDown.highlightFirstOption();
}else{
if(-1==_534.direction){
this.dropDown.highlightLastOption();
}
}
if(_535){
this._announceOption(this.dropDown.getHighlightedOption());
}
}else{
if(this.autoComplete&&!this._prev_key_backspace&&!/^[*]+$/.test(_533[this.searchAttr].toString())){
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
var _536=this.get("displayedValue");
var pw=this.dropDown;
if(pw&&(_536==pw._messages["previousMessage"]||_536==pw._messages["nextMessage"])){
this._setValueAttr(this._lastValueReported,true);
}else{
if(typeof this.item=="undefined"){
this.item=null;
this.set("displayedValue",_536);
}else{
if(this.value!=this._lastValueReported){
this._handleOnChange(this.value,true);
}
this._refreshState();
}
}
},_setItemAttr:function(item,_537,_538){
var _539="";
if(item){
if(!_538){
_538=this.store._oldAPI?this.store.getValue(item,this.searchAttr):item[this.searchAttr];
}
_539=this._getValueField()!=this.searchAttr?this.store.getIdentity(item):_538;
}
this.set("value",_539,_537,_538,item);
},_announceOption:function(node){
if(!node){
return;
}
var _53a;
if(node==this.dropDown.nextButton||node==this.dropDown.previousButton){
_53a=node.innerHTML;
this.item=undefined;
this.value="";
}else{
var item=this.dropDown.items[node.getAttribute("item")];
_53a=(this.store._oldAPI?this.store.getValue(item,this.searchAttr):item[this.searchAttr]).toString();
this.set("item",item,false,_53a);
}
this.focusNode.value=this.focusNode.value.substring(0,this._lastInput.length);
this.focusNode.setAttribute("aria-activedescendant",_522.get(node,"id"));
this._autoCompleteText(_53a);
},_selectOption:function(_53b){
this.closeDropDown();
if(_53b){
this._announceOption(_53b);
}
this._setCaretPos(this.focusNode,this.focusNode.value.length);
this._handleOnChange(this.value,true);
},_startSearchAll:function(){
this._startSearch("");
},_startSearchFromInput:function(){
this._startSearch(this.focusNode.value.replace(/([\\\*\?])/g,"\\$1"));
},_getQueryString:function(text){
return _526.substitute(this.queryExpr,[text]);
},_startSearch:function(key){
if(!this.dropDown){
var _53c=this.id+"_popup",_53d=lang.isString(this.dropDownClass)?lang.getObject(this.dropDownClass,false):this.dropDownClass;
this.dropDown=new _53d({onChange:lang.hitch(this,this._selectOption),id:_53c,dir:this.dir,textDir:this.textDir});
this.focusNode.removeAttribute("aria-activedescendant");
this.textbox.setAttribute("aria-owns",_53c);
}
this._lastInput=key;
var _53e=lang.clone(this.query);
var _53f={start:0,count:this.pageSize,queryOptions:{ignoreCase:this.ignoreCase,deep:true}};
lang.mixin(_53f,this.fetchProperties);
var qs=this._getQueryString(key),q;
if(this.store._oldAPI){
q=qs;
}else{
q=_51f.patternToRegExp(qs,this.ignoreCase);
q.toString=function(){
return qs;
};
}
this._lastQuery=_53e[this.searchAttr]=q;
var _540=this,_541=function(){
var _542=_540._fetchHandle=_540.store.query(_53e,_53f);
_521.when(_542,function(res){
_540._fetchHandle=null;
res.total=_542.total;
_540._openResultList(res,_53e,_53f);
},function(err){
_540._fetchHandle=null;
if(!_540._cancelingQuery){
console.error(_540.declaredClass+" "+err.toString());
_540.closeDropDown();
}
});
};
this.searchTimer=setTimeout(lang.hitch(this,function(_543,_544){
this.searchTimer=null;
_541();
this._nextSearch=this.dropDown.onPage=function(_545){
_53f.start+=_53f.count*_545;
_53f.direction=_545;
_541();
_544.focus();
};
},_53e,this),this.searchDelay);
},_getValueField:function(){
return this.searchAttr;
},constructor:function(){
this.query={};
this.fetchProperties={};
},postMixInProperties:function(){
if(!this.store){
var _546=this.srcNodeRef;
var list=this.list;
if(list){
this.store=_528.byId(list);
}else{
this.store=new _527({},_546);
}
if(!("value" in this.params)){
var item=(this.item=this.store.fetchSelectedItem());
if(item){
var _547=this._getValueField();
this.value=this.store._oldAPI?this.store.getValue(item,_547):item[_547];
}
}
}
this.inherited(arguments);
},postCreate:function(){
var _548=_524("label[for=\""+this.id+"\"]");
if(_548.length){
_548[0].id=(this.id+"_label");
this.domNode.setAttribute("aria-labelledby",_548[0].id);
}
this.inherited(arguments);
},_getMenuLabelFromItem:function(item){
var _549=this.labelFunc(item,this.store),_54a=this.labelType;
if(this.highlightMatch!="none"&&this.labelType=="text"&&this._lastInput){
_549=this.doHighlight(_549,this._escapeHtml(this._lastInput));
_54a="html";
}
return {html:_54a=="html",label:_549};
},doHighlight:function(_54b,find){
var _54c=(this.ignoreCase?"i":"")+(this.highlightMatch=="all"?"g":""),i=this.queryExpr.indexOf("${0}");
find=_525.escapeString(find);
return this._escapeHtml(_54b).replace(new RegExp((i==0?"^":"")+"("+find+")"+(i==(this.queryExpr.length-4)?"$":""),_54c),"<span class=\"dijitComboBoxHighlightMatch\">$1</span>");
},_escapeHtml:function(str){
str=String(str).replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
return str;
},reset:function(){
this.item=null;
this.inherited(arguments);
},labelFunc:function(item,_54d){
return (_54d._oldAPI?_54d.getValue(item,this.labelAttr||this.searchAttr):item[this.labelAttr||this.searchAttr]).toString();
},_setValueAttr:function(_54e,_54f,_550,item){
this._set("item",item||null);
if(!_54e){
_54e="";
}
this.inherited(arguments);
},_setTextDirAttr:function(_551){
this.inherited(arguments);
if(this.dropDown){
this.dropDown._set("textDir",_551);
}
}});
});
},"url:dijit/layout/templates/_ScrollingTabControllerButton.html":"<div data-dojo-attach-event=\"onclick:_onClick\">\n\t<div role=\"presentation\" class=\"dijitTabInnerDiv\" data-dojo-attach-point=\"innerDiv,focusNode\">\n\t\t<div role=\"presentation\" class=\"dijitTabContent dijitButtonContents\" data-dojo-attach-point=\"tabContent\">\n\t\t\t<img role=\"presentation\" alt=\"\" src=\"${_blankGif}\" class=\"dijitTabStripIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t\t<span data-dojo-attach-point=\"containerNode,titleNode\" class=\"dijitButtonText\"></span>\n\t\t</div>\n\t</div>\n</div>","cm/_base/_form":function(){
define("cm/_base/_form",[],function(){
var cm=dojo.global.cm||{};
dojo.global.cm=cm;
dojo.mixin(cm,{checkAll:function(_552,_553){
cm.query("input[type='checkbox']",_553).forEach("item.checked = "+(_552?"true":"false"));
},setFormSubmitted:function(form,_554){
form._alreadySubmitted=_554;
},wasFormSubmitted:function(form){
return form._alreadySubmitted;
},getFormItems:function(){
if(cm._formItems){
return cm._formItems;
}
var _555=dojo.query("input[name='__o3fmeta']");
var data=_555.length>0?dojo.fromJson(_555[0].value):{};
var _556=[];
for(var x in data){
_556.push(x);
}
cm._formItems=new function(){
this.length=function(){
return _556.length;
};
this.getNames=function(){
return _556;
};
this.getInputs=function(_557){
var _558=[];
dojo.forEach(_556,function(name,_559){
if(!_557||this.isMandatory(_559)){
_558.push("[name='"+name+"']");
}
},this);
return _558.length>0?dojo.query(_558.join(",")):[];
};
function fn(_55a){
return function(_55b){
var d=data[dojo.isString(_55b)?_55b:_556[_55b]];
return d?d[_55a]:null;
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
define("dijit/form/MappedTextBox",["dojo/_base/declare","dojo/dom-construct","./ValidationTextBox"],function(_55c,_55d,_55e){
return _55c("dijit.form.MappedTextBox",_55e,{postMixInProperties:function(){
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
this.valueNode=_55d.place("<input type='hidden'"+(this.name?" name='"+this.name.replace(/'/g,"&quot;")+"'":"")+"/>",this.textbox,"after");
},reset:function(){
this.valueNode.value="";
this.inherited(arguments);
}});
});
},"dijit/form/ComboBoxMixin":function(){
require({cache:{"url:dijit/form/templates/DropDownBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdata-dojo-attach-point=\"_buttonNode, _popupStateNode\" role=\"presentation\"\n\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdata-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\n\t/></div\n></div>\n"}});
define("dijit/form/ComboBoxMixin",["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/kernel","dojo/_base/lang","dojo/store/util/QueryResults","./_AutoCompleterMixin","./_ComboBoxMenu","../_HasDropDown","dojo/text!./templates/DropDownBox.html"],function(_55f,_560,_561,lang,_562,_563,_564,_565,_566){
return _55f("dijit.form.ComboBoxMixin",[_565,_563],{dropDownClass:_564,hasDownArrow:true,templateString:_566,baseClass:"dijitTextBox dijitComboBox",cssStateNodes:{"_buttonNode":"dijitDownArrowButton"},_setHasDownArrowAttr:function(val){
this._set("hasDownArrow",val);
this._buttonNode.style.display=val?"":"none";
},_showResultList:function(){
this.displayMessage("");
this.inherited(arguments);
},_setStoreAttr:function(_567){
if(!_567.get){
lang.mixin(_567,{_oldAPI:true,get:function(id){
var _568=new _560();
this.fetchItemByIdentity({identity:id,onItem:function(_569){
_568.resolve(_569);
},onError:function(_56a){
_568.reject(_56a);
}});
return _568.promise;
},query:function(_56b,_56c){
var _56d=new _560(function(){
_56e.abort&&_56e.abort();
});
var _56e=this.fetch(lang.mixin({query:_56b,onBegin:function(_56f){
_56d.total=_56f;
},onComplete:function(_570){
_56d.resolve(_570);
},onError:function(_571){
_56d.reject(_571);
}},_56c));
return _562(_56d);
}});
}
this._set("store",_567);
},postMixInProperties:function(){
if(this.params.store){
this._setStoreAttr(this.params.store);
}
this.inherited(arguments);
if(!this.params.store){
var _572=this.declaredClass;
lang.mixin(this.store,{getValue:function(item,attr){
_561.deprecated(_572+".store.getValue(item, attr) is deprecated for builtin store.  Use item.attr directly","","2.0");
return item[attr];
},getLabel:function(item){
_561.deprecated(_572+".store.getLabel(item) is deprecated for builtin store.  Use item.label directly","","2.0");
return item.name;
},fetch:function(args){
_561.deprecated(_572+".store.fetch() is deprecated for builtin store.","Use store.query()","2.0");
var shim=["dojo/data/ObjectStore"];
require(shim,lang.hitch(this,function(_573){
new _573({objectStore:this}).fetch(args);
}));
}});
}
}});
});
},"dijit/form/_TextBoxMixin":function(){
define("dijit/form/_TextBoxMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/_base/event","dojo/keys","dojo/_base/lang",".."],function(_574,_575,dom,_576,keys,lang,_577){
var _578=_575("dijit.form._TextBoxMixin",null,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",selectOnClick:false,placeHolder:"",_getValueAttr:function(){
return this.parse(this.get("displayedValue"),this.constraints);
},_setValueAttr:function(_579,_57a,_57b){
var _57c;
if(_579!==undefined){
_57c=this.filter(_579);
if(typeof _57b!="string"){
if(_57c!==null&&((typeof _57c!="number")||!isNaN(_57c))){
_57b=this.filter(this.format(_57c,this.constraints));
}else{
_57b="";
}
}
}
if(_57b!=null&&_57b!=undefined&&((typeof _57b)!="number"||!isNaN(_57b))&&this.textbox.value!=_57b){
this.textbox.value=_57b;
this._set("displayedValue",this.get("displayedValue"));
}
if(this.textDir=="auto"){
this.applyTextDir(this.focusNode,_57b);
}
this.inherited(arguments,[_57c,_57a]);
},displayedValue:"",_getDisplayedValueAttr:function(){
return this.filter(this.textbox.value);
},_setDisplayedValueAttr:function(_57d){
if(_57d===null||_57d===undefined){
_57d="";
}else{
if(typeof _57d!="string"){
_57d=String(_57d);
}
}
this.textbox.value=_57d;
this._setValueAttr(this.get("value"),undefined);
this._set("displayedValue",this.get("displayedValue"));
if(this.textDir=="auto"){
this.applyTextDir(this.focusNode,_57d);
}
},format:function(_57e){
return ((_57e==null||_57e==undefined)?"":(_57e.toString?_57e.toString():_57e));
},parse:function(_57f){
return _57f;
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
var _580=function(e){
var _581=e.charOrCode||e.keyCode||229;
if(e.type=="keydown"){
switch(_581){
case keys.SHIFT:
case keys.ALT:
case keys.CTRL:
case keys.META:
case keys.CAPS_LOCK:
return;
default:
if(_581>=65&&_581<=90){
return;
}
}
}
if(e.type=="keypress"&&typeof _581!="string"){
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
var faux=lang.mixin({},e,{charOrCode:_581,wasConsumed:false,preventDefault:function(){
faux.wasConsumed=true;
e.preventDefault();
},stopPropagation:function(){
e.stopPropagation();
}});
if(this.onInput(faux)===false){
_576.stop(faux);
}
if(faux.wasConsumed){
return;
}
setTimeout(lang.hitch(this,"_onInput",faux),0);
};
_574.forEach(["onkeydown","onkeypress","onpaste","oncut","oninput","oncompositionend"],function(_582){
this.connect(this.textbox,_582,_580);
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
_578.selectInputText(this.textbox);
}
});
}
this.inherited(arguments);
this._refreshState();
},reset:function(){
this.textbox.value="";
this.inherited(arguments);
},_setTextDirAttr:function(_583){
if(!this._created||this.textDir!=_583){
this._set("textDir",_583);
this.applyTextDir(this.focusNode,this.focusNode.value);
}
}});
_578._setSelectionRange=_577._setSelectionRange=function(_584,_585,stop){
if(_584.setSelectionRange){
_584.setSelectionRange(_585,stop);
}
};
_578.selectInputText=_577.selectInputText=function(_586,_587,stop){
_586=dom.byId(_586);
if(isNaN(_587)){
_587=0;
}
if(isNaN(stop)){
stop=_586.value?_586.value.length:0;
}
try{
_586.focus();
_578._setSelectionRange(_586,_587,stop);
}
catch(e){
}
};
return _578;
});
},"url:dijit/layout/templates/_TabButton.html":"<div role=\"presentation\" data-dojo-attach-point=\"titleNode\" data-dojo-attach-event='onclick:onClick'>\n    <div role=\"presentation\" class='dijitTabInnerDiv' data-dojo-attach-point='innerDiv'>\n        <div role=\"presentation\" class='dijitTabContent' data-dojo-attach-point='tabContent'>\n        \t<div role=\"presentation\" data-dojo-attach-point='focusNode'>\n\t\t        <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" data-dojo-attach-point='iconNode' />\n\t\t        <span data-dojo-attach-point='containerNode' class='tabLabel'></span>\n\t\t        <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\n\t\t        \t\tdata-dojo-attach-event='onclick: onClickCloseButton' role=\"presentation\">\n\t\t            <span data-dojo-attach-point='closeText' class='dijitTabCloseText'>[x]</span\n\t\t        ></span>\n\t\t\t</div>\n        </div>\n    </div>\n</div>\n","curam/ajax":function(){
define("curam/ajax",["curam/util/Request"],function(_588){
var _589=function(_58a,_58b){
this.target=_58a;
this.inputProvider=_58b||"null";
};
var _58c={doRequest:function(_58d,_58e,_58f,_590){
var _591="../servlet/JSONServlet";
var _592=this;
if(_58f){
_591="../"+_591;
}
var _593={caller:this.target.id,operation:_58d,inputProvider:this.inputProvider,args:_58e};
function _594(_595,_596){
_595=dojo.fromJson(_595);
if(_595 instanceof Array){
if(_595.length>1){
if(_596=="getCodeTableSubset"){
_592.fillCTWithBlank(_595);
}else{
_592.fillCT(_595);
}
}else{
if(_596=="getCodeTableSubset"){
_592.fillCTWithBlank(_595);
}else{
_592.fillSingle(_595,true);
}
}
}else{
_592.fillSingle(_595);
}
};
_588.post({url:_591,handleAs:"text",load:function(data,evt){
_594(data,_58d);
},error:function(){
alert("error");
},content:{"content":dojo.toJson(_593)},preventCache:true,sync:_590});
},fillCT:function(_597){
this.target.options.length=0;
for(var i=0;i<_597.length;i++){
this.target.options[i]=new Option(_597[i]["descr"],_597[i]["code"],_597[i]["default"]);
}
},fillCTWithBlank:function(_598){
this.target.options.length=0;
this.target.options[0]=new Option("");
for(var i=0;i<_598.length;i++){
this.target.options[i+1]=new Option(_598[i]["descr"],_598[i]["code"]);
}
},fillSingle:function(_599,_59a){
if(_59a){
this.target.value=_599[0]["value"];
}else{
this.target.value=_599["value"];
}
}};
dojo.mixin(_589.prototype,_58c);
dojo.global.AJAXCall=_589;
return _589;
});
},"curam/util/Dialog":function(){
define("curam/util/Dialog",["curam/util","curam/define","curam/dialog","curam/util/onLoad","curam/debug","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _59b=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.Dialog",{_id:null,_unsubscribes:[],open:function(path,_59c,_59d){
var url=path+curam.util.makeQueryString(_59c);
var _59e={href:url};
var _59f=null;
if(_59d){
_59f="width="+_59d.width+",height="+_59d.height;
}
window.jsModals=true;
curam.util.openModalDialog(_59e,_59f);
},init:function(){
var _5a0=curam.util.getTopmostWindow();
var _5a1=_5a0.dojo.subscribe("/curam/dialog/SetId",null,function(_5a2){
curam.util.Dialog._id=_5a2;
curam.debug.log(_59b.getProperty("curam.util.Dialog.id.success"),curam.util.Dialog._id);
_5a0.dojo.unsubscribe(_5a1);
});
curam.util.Dialog._unsubscribes.push(_5a1);
_5a0.dojo.publish("/curam/dialog/init");
if(!curam.util.Dialog._id){
curam.debug.log(_59b.getProperty("curam.util.Dialog.id.fail"));
}
dojo.addOnUnload(function(){
curam.util.Dialog._releaseHandlers();
window.parent.dojo.publish("/curam/dialog/iframeUnloaded",[curam.util.Dialog._id,window]);
});
},registerGetTitleFunc:function(_5a3){
curam.util.onLoad.addPublisher(function(_5a4){
_5a4.title=_5a3();
});
},registerGetSizeFunc:function(_5a5){
curam.util.onLoad.addPublisher(function(_5a6){
_5a6.windowOptions=_5a5();
});
},registerAfterDisplayHandler:function(_5a7){
var _5a8=curam.util.getTopmostWindow();
curam.util.Dialog._unsubscribes.push(_5a8.dojo.subscribe("/curam/dialog/AfterDisplay",null,function(_5a9){
if(_5a9==curam.util.Dialog._id){
_5a7();
}
}));
},registerBeforeCloseHandler:function(_5aa){
var _5ab=curam.util.getTopmostWindow();
curam.util.Dialog._unsubscribes.push(_5ab.dojo.subscribe("/curam/dialog/BeforeClose",null,function(_5ac){
if(_5ac===curam.util.Dialog._id){
_5aa();
}
}));
},pageLoadFinished:function(){
var _5ad=curam.util.getTopmostWindow();
curam.util.Dialog._unsTokenReleaseHandlers=_5ad.dojo.subscribe("/curam/dialog/BeforeClose",null,function(_5ae){
if(_5ae==curam.util.Dialog._id){
curam.util.Dialog._releaseHandlers();
}
});
curam.util.onLoad.execute();
},_releaseHandlers:function(){
var _5af=curam.util.getTopmostWindow();
dojo.forEach(curam.util.Dialog._unsubscribes,_5af.dojo.unsubscribe);
curam.util.Dialog._unsubscribes=[];
_5af.dojo.unsubscribe(curam.util.Dialog._unsTokenReleaseHandlers);
curam.util.Dialog._unsTokenReleaseHandlers=null;
},close:function(_5b0,_5b1,_5b2){
var _5b3=curam.dialog.getParentWindow(window);
if(_5b0&&!_5b1){
curam.dialog.forceParentRefresh();
_5b3.curam.util.redirectWindow(null);
}else{
if(_5b1){
var _5b4=_5b1;
if(_5b1.indexOf("Page.do")==-1&&_5b1.indexOf("Action.do")==-1){
_5b4=_5b1+"Page.do"+curam.util.makeQueryString(_5b2);
}
_5b3.curam.util.redirectWindow(_5b4);
}
}
var _5b5=curam.util.getTopmostWindow();
_5b5.dojo.publish("/curam/dialog/close",[curam.util.Dialog._id]);
},closeAndSubmitParent:function(_5b6){
var _5b7=curam.dialog.getParentWindow(window);
var _5b8=_5b7.document.forms["mainForm"];
var _5b9=curam.util.getTopmostWindow();
if(_5b8==null||_5b8==undefined){
_5b9.dojo.publish("/curam/dialog/close",[curam.util.Dialog._id]);
return;
}
var _5ba=function(_5bb){
for(var _5bc in _5bb){
if(_5bb.hasOwnProperty(_5bc)){
return false;
}
}
return true;
};
if(_5b6&&!_5ba(_5b6)){
var _5bd=dojo.query("input[type=text])",_5b8);
var _5be=dojo.filter(_5bd,function(node){
return node.readOnly==false;
});
dojo.forEach(_5be,function(node){
node.value="";
});
for(var _5bf in _5b6){
var _5c0=_5be[parseInt(_5bf)];
if(_5c0){
var _5c1=dojo.query("input[name="+_5c0.id+"]",_5b8)[0];
if(_5c1){
_5c1.value=_5b6[_5bf];
}else{
_5c0.value=_5b6[_5bf];
}
}
}
}else{
}
_5b7.dojo.publish("/curam/page/refresh");
_5b8.submit();
_5b9.dojo.publish("/curam/dialog/close",[curam.util.Dialog._id]);
}});
});
},"dijit/PopupMenuItem":function(){
define("dijit/PopupMenuItem",["dojo/_base/declare","dojo/dom-style","dojo/query","dojo/_base/window","./registry","./MenuItem","./hccss"],function(_5c2,_5c3,_5c4,win,_5c5,_5c6){
return _5c2("dijit.PopupMenuItem",_5c6,{_fillContent:function(){
if(this.srcNodeRef){
var _5c7=_5c4("*",this.srcNodeRef);
this.inherited(arguments,[_5c7[0]]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(!this.popup){
var node=_5c4("[widgetId]",this.dropDownContainer)[0];
this.popup=_5c5.byNode(node);
}
win.body().appendChild(this.popup.domNode);
this.popup.startup();
this.popup.domNode.style.display="none";
if(this.arrowWrapper){
_5c3.set(this.arrowWrapper,"visibility","");
}
this.focusNode.setAttribute("aria-haspopup","true");
},destroyDescendants:function(_5c8){
if(this.popup){
if(!this.popup._destroyed){
this.popup.destroyRecursive(_5c8);
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
},registerBehavior:function(name,_5c9){
cm.behaviors[name]=_5c9;
}});
return cm;
});
},"curam/pagination/DefaultListModel":function(){
define("curam/pagination/DefaultListModel",["curam/debug","curam/pagination","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _5ca=new curam.util.ResourceBundle("Debug");
var _5cb=dojo.declare("curam.pagination.DefaultListModel",null,{_rowCount:null,constructor:function(_5cc){
this.tableNode=dojo.query("table.paginated-list-id-"+_5cc)[0];
if(!this.tableNode){
throw "Table node for ID "+_5cc+" not found - failing!";
}
curam.debug.log("curam.pagination.DefaultListModel "+_5ca.getProperty("curam.pagination.DefaultListModel"),this.tableNode);
this._id=_5cc;
},getId:function(){
return this._id;
},getRowCount:function(){
if(this._rowCount==null){
this._rowCount=0;
var _5cd=dojo.query("tbody > script.hidden-list-rows",this.tableNode);
for(var i=0;i<_5cd.length;i++){
var _5ce=_5cd[i];
var _5cf=(i==_5cd.length-1);
if(!_5cf){
this._rowCount+=curam.pagination.getNumRowsInBlock(_5ce);
}else{
curam.pagination.unpackRows(_5ce);
}
}
var _5d0=dojo.query("tbody > tr",this.tableNode).length;
this._rowCount+=_5d0;
}
return this._rowCount;
},hideRange:function(_5d1,_5d2){
var rows=this._getRowNodes(_5d1,_5d2);
for(var i=_5d1;i<=_5d2;i++){
dojo.style(rows[i-1],{"display":"none"});
dojo.removeClass(rows[i-1],"even-last-row");
dojo.removeClass(rows[i-1],"odd-last-row");
}
},showRange:function(_5d3,_5d4){
var rows=this._getRowNodes(_5d3,_5d4);
var _5d5=(_5d4%2==0)?"even-last-row":"odd-last-row";
dojo.addClass(rows[_5d4-1],_5d5);
for(var i=_5d3;i<=_5d4;i++){
dojo.style(rows[i-1],{"display":""});
}
},_getRowNodes:function(_5d6,_5d7){
var _5d8=curam.pagination.readListContent(this.tableNode);
for(var i=1;i<=_5d7&&i<=_5d8.length;i++){
var node=_5d8[i-1];
if(node.tagName=="SCRIPT"){
curam.pagination.unpackRows(node);
_5d8=curam.pagination.readListContent(this.tableNode);
i--;
}
}
return dojo.query("tbody > tr",this.tableNode);
}});
return _5cb;
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
dojo.mixin(dojo.global.curam.define,{singleton:function(_5d9,_5da){
var _5db=_5d9.split(".");
var _5dc=window;
for(var i=0;i<_5db.length;i++){
var part=_5db[i];
if(typeof _5dc[part]=="undefined"){
_5dc[part]={};
}
_5dc=_5dc[part];
}
if(_5da){
dojo.mixin(_5dc,_5da);
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
define("dijit/_OnDijitClickMixin",["dojo/on","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(on,_5dd,keys,_5de,has,_5df,win){
var _5e0=null;
if(has("ie")){
(function(){
var _5e1=function(evt){
_5e0=evt.srcElement;
};
win.doc.attachEvent("onkeydown",_5e1);
_5df.addOnWindowUnload(function(){
win.doc.detachEvent("onkeydown",_5e1);
});
})();
}else{
win.doc.addEventListener("keydown",function(evt){
_5e0=evt.target;
},true);
}
var _5e2=function(node,_5e3){
if(/input|button/i.test(node.nodeName)){
return on(node,"click",_5e3);
}else{
function _5e4(e){
return (e.keyCode==keys.ENTER||e.keyCode==keys.SPACE)&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey;
};
var _5e5=[on(node,"keypress",function(e){
if(_5e4(e)){
_5e0=e.target;
e.preventDefault();
}
}),on(node,"keyup",function(e){
if(_5e4(e)&&e.target==_5e0){
_5e0=null;
_5e3.call(this,e);
}
}),on(node,"click",function(e){
_5e3.call(this,e);
})];
return {remove:function(){
_5dd.forEach(_5e5,function(h){
h.remove();
});
}};
}
};
return _5de("dijit._OnDijitClickMixin",null,{connect:function(obj,_5e6,_5e7){
return this.inherited(arguments,[obj,_5e6=="ondijitclick"?_5e2:_5e6,_5e7]);
}});
});
},"curam/layout/ScrollingTabController":function(){
define("curam/layout/ScrollingTabController",["dijit/layout/ScrollingTabController","curam/debug"],function(_5e8){
var _5e9=dojo.declare("curam.layout.ScrollingTabController",_5e8,{onStartup:function(){
this.inherited(arguments);
this.updateTabStyle();
},updateTabStyle:function(){
var kids=this.getChildren();
curam.debug.log("curam.layout.ScrollingTabController.updateTabStyle kids = ",this.domNode);
dojo.forEach(kids,function(_5ea,_5eb,_5ec){
dojo.removeClass(_5ea.domNode,["first-class","last-class"]);
if(_5eb==0){
dojo.addClass(_5ea.domNode,"first");
}else{
if(_5eb==_5ec.length-1){
dojo.addClass(_5ea.domNode,"last");
}
}
});
var _5ed=dojo.query(".nowrapTabStrip",this.domNode)[0];
dojo.replaceClass(_5ed,"nowrapSecTabStrip","nowrapTabStrip");
var _5ee=document.createElement("div");
dojo.addClass(_5ee,"block-slope");
dojo.addClass(_5ee,"dijitTab");
_5ee.innerHTML="&#x200B;";
_5ed.appendChild(_5ee);
}});
return _5e9;
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
var b,t,w,h,rx,ry,dx=0,dy=0,_5ef,_5f0;
for(var n=e.target;n;){
if(n.nodeType==1&&(n.tagName.toLowerCase() in dojo.dnd._validNodes)){
var s=dojo.getComputedStyle(n),_5f1=(s.overflow.toLowerCase() in dojo.dnd._validOverflow),_5f2=(s.overflowX.toLowerCase() in dojo.dnd._validOverflow),_5f3=(s.overflowY.toLowerCase() in dojo.dnd._validOverflow);
if(_5f1||_5f2||_5f3){
b=dojo._getContentBox(n,s);
t=dojo.position(n,true);
}
if(_5f1||_5f2){
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
_5ef=n.scrollLeft;
n.scrollLeft=n.scrollLeft+dx;
}
}
if(_5f1||_5f3){
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
_5f0=n.scrollTop;
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
var _5f4=dojo.dnd.Moveable.prototype.onMove;
dojo.declare("dojo.dnd.TimedMoveable",dojo.dnd.Moveable,{timeout:40,constructor:function(node,_5f5){
if(!_5f5){
_5f5={};
}
if(_5f5.timeout&&typeof _5f5.timeout=="number"&&_5f5.timeout>=0){
this.timeout=_5f5.timeout;
}
},onMoveStop:function(_5f6){
if(_5f6._timer){
clearTimeout(_5f6._timer);
_5f4.call(this,_5f6,_5f6._leftTop);
}
dojo.dnd.Moveable.prototype.onMoveStop.apply(this,arguments);
},onMove:function(_5f7,_5f8){
_5f7._leftTop=_5f8;
if(!_5f7._timer){
var _5f9=this;
_5f7._timer=setTimeout(function(){
_5f7._timer=null;
_5f4.call(_5f9,_5f7,_5f7._leftTop);
},this.timeout);
}
}});
return dojo.dnd.TimedMoveable;
});
},"dijit/_BidiSupport":function(){
define("dijit/_BidiSupport",["./_WidgetBase"],function(_5fa){
_5fa.extend({getTextDir:function(text){
return this.textDir=="auto"?this._checkContextual(text):this.textDir;
},_checkContextual:function(text){
var fdc=/[A-Za-z\u05d0-\u065f\u066a-\u06ef\u06fa-\u07ff\ufb1d-\ufdff\ufe70-\ufefc]/.exec(text);
return fdc?(fdc[0]<="z"?"ltr":"rtl"):this.dir?this.dir:this.isLeftToRight()?"ltr":"rtl";
},applyTextDir:function(_5fb,text){
var _5fc=this.textDir=="auto"?this._checkContextual(text):this.textDir;
if(_5fb.dir!=_5fc){
_5fb.dir=_5fc;
}
}});
return _5fa;
});
},"dijit/form/_ListMouseMixin":function(){
define("dijit/form/_ListMouseMixin",["dojo/_base/declare","dojo/_base/event","dojo/touch","./_ListBase"],function(_5fd,_5fe,_5ff,_600){
return _5fd("dijit.form._ListMouseMixin",_600,{postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,_5ff.press,"_onMouseDown");
this.connect(this.domNode,_5ff.release,"_onMouseUp");
this.connect(this.domNode,"onmouseover","_onMouseOver");
this.connect(this.domNode,"onmouseout","_onMouseOut");
},_onMouseDown:function(evt){
_5fe.stop(evt);
if(this._hoveredNode){
this.onUnhover(this._hoveredNode);
this._hoveredNode=null;
}
this._isDragging=true;
this._setSelectedAttr(this._getTarget(evt));
},_onMouseUp:function(evt){
_5fe.stop(evt);
this._isDragging=false;
var _601=this._getSelectedAttr();
var _602=this._getTarget(evt);
var _603=this._hoveredNode;
if(_601&&_602==_601){
this.onClick(_601);
}else{
if(_603&&_602==_603){
this._setSelectedAttr(_603);
this.onClick(_603);
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
var _604=new curam.util.ResourceBundle("Debug");
var _605=dojo.declare("curam.pagination.ExpandableListModel",null,{_rowCount:null,constructor:function(_606){
this.tableNode=dojo.query("table.paginated-list-id-"+_606)[0];
if(!this.tableNode){
throw "Table node for ID "+_606+" not found - failing!";
}
curam.debug.log("curam.pagination.ExpandableListModel "+_604.getProperty("curam.pagination.ExpandableListModel"),this.tableNode);
this._id=_606;
},getId:function(){
return this._id;
},getRowCount:function(){
if(this._rowCount==null){
this._rowCount=0;
var _607=dojo.query("tbody > script.hidden-list-rows",this.tableNode);
for(var i=0;i<_607.length;i++){
var _608=_607[i];
var _609=(i==_607.length-1);
if(!_609){
this._rowCount+=(curam.pagination.getNumRowsInBlock(_608)*2);
}else{
curam.pagination.unpackRows(_608);
}
}
var _60a=dojo.query("tbody > tr",this.tableNode).length;
this._rowCount+=_60a;
}
if(this._rowCount<=1){
return 1;
}else{
return this._rowCount/2;
}
},hideRange:function(_60b,_60c){
var rows=this._getRowNodes(_60b,_60c);
for(var i=_60b;i<=_60c;i++){
var _60d=(2*i)-2;
var _60e=(2*i)-1;
dojo.style(rows[_60d],"display","none");
dojo.removeClass(rows[_60d],"even-last-row");
dojo.removeClass(rows[_60d],"odd-last-row");
if(rows.length>_60e){
var _60f=rows[_60e];
if(_60f){
_60f._curam_pagination_expanded=curam.util.ExpandableLists.isDetailsRowExpanded(_60f);
curam.util.ExpandableLists.setDetailsRowExpandedState(rows[_60d],_60f,false);
}
}
}
},showRange:function(_610,_611){
var rows=this._getRowNodes(_610,_611);
var _612=(_611%2==0)?"even-last-row":"odd-last-row";
dojo.addClass(rows[(_611*2)-2],_612);
for(var i=_610;i<=_611;i++){
var _613=(2*i)-2;
var _614=(2*i)-1;
dojo.style(rows[_613],"display","");
if(rows.length>_614){
var _615=rows[_614];
if(_615){
curam.util.ExpandableLists.setDetailsRowExpandedState(rows[_613],_615,_615._curam_pagination_expanded);
}
}
}
},_getRowNodes:function(_616,_617){
var _618=curam.pagination.readListContent(this.tableNode);
for(var i=1;i<=(_617*2)&&i<=_618.length;i++){
var node=_618[i-1];
if(node.tagName=="SCRIPT"){
curam.pagination.unpackRows(node);
_618=curam.pagination.readListContent(this.tableNode);
i--;
}
}
return dojo.query("tbody > tr",this.tableNode);
}});
return _605;
});
},"url:dijit/templates/Tree.html":"<div class=\"dijitTree dijitTreeContainer\" role=\"tree\"\n\tdata-dojo-attach-event=\"onkeypress:_onKeyPress\">\n\t<div class=\"dijitInline dijitTreeIndent\" style=\"position: absolute; top: -9999px\" data-dojo-attach-point=\"indentDetector\"></div>\n</div>\n","curam/inPageNavigation":function(){
define("curam/inPageNavigation",["curam/tab","curam/ui/PageRequest","curam/debug","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _619=new curam.util.ResourceBundle("Debug");
var _61a=dojo.declare("curam.inPageNavigation",null,{title:"",href:"",selected:false,constructor:function(args){
this.title=args.title;
this.href=args.href;
this.selected=args.selected;
curam.debug.log("curam.inPageNavigation "+_619.getProperty("curam.inPageNavigation.msg")+this);
},getLinks:function(){
var _61b=dojo.query(".in-page-navigation-tabs")[0];
var _61c=dojo.query("li",_61b);
var _61d=new Array();
dojo.forEach(_61c,function(link){
var _61e=dojo.query("a",link)[0];
if(!_61e){
return;
}
var _61f=_61e.innerText||_61e.textContent;
var _620=false;
dojo.filter(dojo.attr(_61e,"class").split(" "),function(_621){
if(_621=="in-page-current-link"){
_620=true;
return;
}
});
var href=dojo.attr(_61e,"href");
var _622=new curam.inPageNavigation({"title":_61f,"selected":_620,"href":href});
_61d.push(_622);
});
return _61d;
},processMainContentAreaLinks:function(){
dojo.addOnLoad(function(){
var _623=dojo.query(".ipn-page")[0];
if(_623){
var _624=dijit.byId(dojo.attr(_623,"id"));
var _625=_624.getChildren()[0];
_624.removeChild(_625);
if(_624.getChildren().length==0){
return;
}
var _626=dojo.query(".in-page-nav-contentWrapper")[0];
var _627=dojo.query("> *",_626);
var _628=_627[_627.length-1];
var pos=dojo.position(_628);
var _629=pos.y;
var _62a="height: "+_629+"px;";
dojo.attr(_626,"style",_62a);
dojo.connect(_624,"_transition",function(_62b,_62c){
var link=dojo.query(".in-page-link",_62b.id)[0];
var _62d=new curam.ui.PageRequest(link.href);
if(jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")){
_62d.pageHolder=window;
}
curam.tab.getTabController().handlePageRequest(_62d);
});
dojo.style(_623,"visibility","visible");
}
});
}});
return _61a;
});
},"dojo/cookie":function(){
define("dojo/cookie",["./_base/kernel","./regexp"],function(dojo,_62e){
dojo.cookie=function(name,_62f,_630){
var c=document.cookie,ret;
if(arguments.length==1){
var _631=c.match(new RegExp("(?:^|; )"+_62e.escapeString(name)+"=([^;]*)"));
ret=_631?decodeURIComponent(_631[1]):undefined;
}else{
_630=_630||{};
var exp=_630.expires;
if(typeof exp=="number"){
var d=new Date();
d.setTime(d.getTime()+exp*24*60*60*1000);
exp=_630.expires=d;
}
if(exp&&exp.toUTCString){
_630.expires=exp.toUTCString();
}
_62f=encodeURIComponent(_62f);
var _632=name+"="+_62f,_633;
for(_633 in _630){
_632+="; "+_633;
var _634=_630[_633];
if(_634!==true){
_632+="="+_634;
}
}
document.cookie=_632;
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
define("curam/ModalUIMController",["dojo/text!curam/layout/resources/ModalUIMController.html","dojo/parser","curam/UIMController","curam/debug","curam/util/onLoad","curam/util/ResourceBundle"],function(_635){
dojo.requireLocalization("curam.application","Debug");
var _636=new curam.util.ResourceBundle("Debug");
var _637=dojo.declare("curam.ModalUIMController",[curam.UIMController],{startModalUIMController:LOCALISED_ACCESSIBILITY_MODAL_START,endModalUIMController:LOCALISED_ACCESSIBILITY_MODAL_END,templateString:"<div id=\"uimcontroller_${uid}\" class=\"uimcontroller_${uid} uimController ${classList}\" data-dojo-attach-point=\"uimController\">\r\n  <div style=\"display:none;\" \r\n       id=\"uimcontroller_tc_${uid}\" \r\n       class=\"ipnTabController in-page-nav-tabContainer\"\r\n       data-dojo-attach-point=\"tabController\" \r\n       data-dojo-type=\"curam.layout.TabContainer\">\r\n  </div>\r\n  <div class=\"contentPanelFrameWrapper\"  \r\n        data-dojo-attach-point=\"frameWrapper\">\r\n     <iframe frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\"\r\n             allowTransparency=\"true\" \r\n             id=\"${iframeId}\" \r\n             data-dojo-attach-point=\"frame\"                 \r\n             class=\"${iframeId} ${iframeClassList}\"\r\n             iscpiframe=\"${iscpiframe}\"\r\n             title=\"${title}\" >\r\n    </iframe>\r\n    <span onkeyDown=\"curam.util.focusHelpIconOnTab(event)\" tabIndex=\"0\" class=\"hidden\" id=\"end-${uid}\">${endModalUIMController}</span>\r\n  </div> \r\n</div>"});
return _637;
});
},"curam/util/ui/refresh/TabRefreshController":function(){
define("curam/util/ui/refresh/TabRefreshController",["curam/debug","curam/util/ui/refresh/RefreshEvent","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _638=new curam.util.ResourceBundle("Debug");
var _639=dojo.declare("curam.util.ui.refresh.TabRefreshController",null,{EVENT_REFRESH_MENU:"/curam/refresh/menu",EVENT_REFRESH_NAVIGATION:"/curam/refresh/navigation",EVENT_REFRESH_CONTEXT:"/curam/refresh/context",EVENT_REFRESH_MAIN:"/curam/refresh/main-content",_tabWidgetId:null,_configOnSubmit:null,_configOnLoad:null,_handler:null,_lastSubmitted:null,_currentlyRefreshing:null,constructor:function(_63a,_63b){
this._configOnSubmit={};
this._configOnLoad={};
if(!_63b){
return;
}
this._tabWidgetId=_63a;
dojo.forEach(_63b.config,dojo.hitch(this,function(item){
this._configOnSubmit[item.page]=item.onsubmit;
this._configOnLoad[item.page]=item.onload;
}));
},pageSubmitted:function(_63c,_63d){
new curam.util.ui.refresh.RefreshEvent(curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONSUBMIT,_63d);
curam.debug.log("curam.util.ui.refresh.TabRefreshController: "+_638.getProperty("curam.util.ui.refresh.TabRefreshController.submit",[_63c,_63d]));
if(this._configOnSubmit[_63c]){
this._lastSubmitted=_63c;
curam.debug.log("curam.util.ui.refresh.TabRefreshController: "+_638.getProperty("curam.util.ui.refresh.TabRefreshController"+"submit.notify"));
}
},pageLoaded:function(_63e,_63f){
var _640=new curam.util.ui.refresh.RefreshEvent(curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONLOAD,_63f);
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_638.getProperty("curam.util.ui.refresh.TabRefreshController.load",[_63e,_63f]));
if(this._currentlyRefreshing&&this._currentlyRefreshing.equals(_640)){
this._currentlyRefreshing=null;
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_638.getProperty("curam.util.ui.refresh.TabRefreshController"+"refresh"));
return;
}
var _641={};
if(_63f==_640.SOURCE_CONTEXT_MAIN&&this._configOnLoad[_63e]){
_641=this._configOnLoad[_63e];
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_638.getProperty("curam.util.ui.refresh.TabRefreshController"+".load.config"));
}
if(this._lastSubmitted){
var cfg=this._configOnSubmit[this._lastSubmitted];
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_638.getProperty("curam.util.ui.refresh.TabRefreshController"+".submit.config",[this._lastSubmitted]));
_641.details=_641.details||cfg.details;
_641.menubar=_641.menubar||cfg.menubar;
_641.navigation=_641.navigation||cfg.navigation;
_641.mainContent=_641.mainContent||cfg.mainContent;
this._lastSubmitted=null;
}
this._fireRefreshEvents(_641);
},_fireRefreshEvents:function(cfg){
var _642=[];
if(cfg.details){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_638.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.context"));
_642.push(this.EVENT_REFRESH_CONTEXT+"/"+this._tabWidgetId);
}
if(cfg.menubar){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_638.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.menu"));
_642.push(this.EVENT_REFRESH_MENU+"/"+this._tabWidgetId);
}
if(cfg.navigation){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_638.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.nav"));
_642.push(this.EVENT_REFRESH_NAVIGATION+"/"+this._tabWidgetId);
}
if(cfg.mainContent){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_638.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.main"));
this._currentlyRefreshing=new curam.util.ui.refresh.RefreshEvent(curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONLOAD,curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN,null);
_642.push(this.EVENT_REFRESH_MAIN+"/"+this._tabWidgetId);
}
if(_642.length>0){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_638.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.log",[_642.length,_642]));
this._handler(_642);
}
},setRefreshHandler:function(_643){
this._handler=_643;
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
return _639;
});
},"url:curam/layout/resources/TabContainer.html":"<div class=\"dijitTabContainer\">\r\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\r\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer dijitAlignTop\"></div>\r\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container dijitAlignClient\" data-dojo-attach-point=\"containerNode\"></div>\r\n</div>\r\n","curam/core-uim":function(){
define("curam/core-uim",["cm/_base/_dom","cm/_base/_form","cm/_base/_pageBehaviors","curam/util","curam/date","curam/validation","curam/util/ScreenContext","curam/util/onLoad","curam/ui/UIMPageAdaptor","curam/util/ExpandableLists","curam/util/Refresh","curam/omega3-util","dijit/layout/ContentPane","curam/layout/TabContainer","curam/inPageNavigation"],function(){
});
},"curam/widget/_TabButton":function(){
require({cache:{"url:curam/widget/templates/_TabButton.html":"<div role=\"presentation\" data-dojo-attach-point=\"titleNode\" data-dojo-attach-event='onclick:onClick' class='dijitTab'>\r\n    <div role=\"presentation\" class='dijitTabInnerDiv' data-dojo-attach-point='innerDiv'>\r\n        <div role=\"presentation\" class='dijitTabContent' data-dojo-attach-point='tabContent'>\r\n          <div role=\"presentation\" aria-labelledby='${id}_tabLabel'>\r\n            <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" data-dojo-attach-point='iconNode' />\r\n            <span data-dojo-attach-point='containerNode,focusNode' class='tabLabel' id='${id}_tabLabel'></span>\r\n            <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\r\n                data-dojo-attach-event='onclick: onClickCloseButton' role=\"presentation\">\r\n                <span data-dojo-attach-point='closeText' class='dijitTabCloseText'>Close Tab</span\r\n            ></span>\r\n      </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"}});
define("curam/widget/_TabButton",["dojo/dom-attr","dojo/dom-class","dojo/i18n","dojo/_base/lang","dojo/text!curam/widget/templates/_TabButton.html","dojo/_base/connect","dijit/layout/StackController","dijit/Menu","dijit/MenuItem","curam/widget/MenuItem","curam/util/ResourceBundle"],function(_644,_645,i18n,lang,_646,_647){
dojo.requireLocalization("curam.application","TabMenu");
var _648=new curam.util.ResourceBundle("TabMenu");
_647.subscribe("/curam/tab/labelUpdated",function(){
var tabs,_649=dojo.query(".dijitTabContainerTop-tabs");
_649.forEach(function(_64a){
tabs=dojo.query(".tabLabel",_64a);
tabs.forEach(function(tab,_64b){
var _64c="  ["+(_64b+1)+" "+LOCALISED_TABCONTAINER_CONTEXT_OF+" "+tabs.length+"]";
var _64d=tabs[_64b].innerHTML;
tab.setAttribute("aria-label",_64d+_64c);
tab.setAttribute("title",_64d);
});
});
});
var _64e=dojo.declare("curam.widget._TabButton",dijit.layout._StackButton,{templateString:_646,scrollOnFocus:false,curamDisabled:false,curamVisible:true,baseClass:"dijitTab",postMixInProperties:function(){
if(!this.iconClass){
this.iconClass="dijitTabButtonIcon";
}
},postCreate:function(){
this.inherited(arguments);
dojo.setSelectable(this.containerNode,false);
if(this.iconNode.className=="dijitTabButtonIcon"){
dojo.style(this.iconNode,"width","1px");
}
_644.set(this.focusNode,"id",this.id+"_tabLabel");
},startup:function(){
if(dojo.isIE==6){
this.inherited(arguments);
}else{
dijit.layout._StackButton.prototype.startup.apply(this,arguments);
}
},_setCloseButtonAttr:function(disp){
this._set("closeButton",disp);
_645.toggle(this.innerDiv,"dijitClosable",disp);
this.closeNode.style.display=disp?"":"none";
if(disp){
var _64f=i18n.getLocalization("dijit","common");
if(this.closeNode){
_644.set(this.closeNode,"title",_64f.itemClose);
}
this._closeMenu=new dijit.Menu({id:this.id+"_Menu",dir:this.dir,lang:this.lang,textDir:this.textDir,targetNodeIds:[this.domNode]});
var _650=new curam.widget.MenuItem({onClickValue:"_onClick",label:_64f.itemClose,dir:this.dir,lang:this.lang,textDir:this.textDir,onClick:lang.hitch(this,"onClickCloseButton")});
var _651=new curam.widget.MenuItem({onClickValue:"_onClickAll",label:_648.getProperty("close.all.tabs.text"),dir:this.dir,lang:this.lang,textDir:this.textDir,onClick:lang.hitch(this,"onClickCloseButton")});
this._closeMenu.addChild(_650);
this._closeMenu.addChild(_651);
}else{
dojo.addClass(this.titleNode,"hasNoCloseButton");
if(this._closeMenu){
this._closeMenu.destroyRecursive();
delete this._closeMenu;
}
}
},_setCuramDisabledAttr:function(_652){
this.curamDisabled=_652;
this._swapState(this.domNode,this.curamDisabled,"disabled","enabled");
},_setCuramVisibleAttr:function(_653){
this.curamVisible=_653;
this._swapState(this.domNode,this.curamVisible,"visible","hidden");
},_swapState:function(node,_654,_655,_656){
if(_654){
dojo.replaceClass(node,_655,_656);
}else{
dojo.replaceClass(node,_656,_655);
}
},destroy:function(){
_647.publish("/curam/tab/labelUpdated");
if(this._closeMenu){
this._closeMenu.destroyRecursive();
delete this._closeMenu;
}
this.inherited(arguments);
}});
return _64e;
});
},"curam/widget/DropDownButton":function(){
require({cache:{"url:curam/widget/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n"}});
define("curam/widget/DropDownButton",["dojo/text!curam/widget/templates/DropDownButton.html","dijit/form/DropDownButton"],function(_657){
var _658=dojo.declare("curam.widget.DropDownButton",dijit.form.DropDownButton,{templateString:_657});
return _658;
});
},"url:curam/widget/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n","url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n","curam/validation/calendar":function(){
define("curam/validation/calendar",["curam/define"],function(){
curam.define.singleton("curam.validation.calendar",{invalidGotoDateEntered:null});
return curam.validation.calendar;
});
},"curam/util/ExpandableLists":function(){
define("curam/util/ExpandableLists",["curam/util","curam/debug","curam/UIMController","curam/util/ui/refresh/RefreshEvent","curam/define","curam/contentPanel","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _659=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.ExpandableLists",{_minimumExpandedHeight:[],stateData:[],_LIST_ID_PREFIX:"list-id-",_ROW_ID_PREFIX:"row-id-",_EVENT_TOGGLE:"/curam/list/row/toggle",_EVENT_TYPE_EXPANDED:"Expanded",_EVENT_TYPE_COLLAPSED:"Collapsed",setupToggleHandler:function(){
dojo.ready(function(){
var _65a=curam.util.ExpandableLists;
var _65b=function(_65c,_65d,_65e){
curam.debug.log(_659.getProperty("curam.util.ExpandableLists.event",[_65e,_65c,_65d]));
if(_65e==_65a._EVENT_TYPE_EXPANDED){
var _65f=_65a._getListData(_65c);
var _660=dojo.filter(_65f.expandedRows,function(item){
return item==_65d;
});
if(_660.length==0){
_65f.expandedRows.push(_65d);
}
}else{
var _65f=_65a._getListData(_65c);
_65f.expandedRows=dojo.filter(_65f.expandedRows,function(item){
return item!=_65d;
});
if(_65f.expandedRows.length==0){
_65a._removeListData(_65c);
}
}
curam.debug.log("curam.util.ExpandableLists.setupToggleHandler stateData: ",_65a.stateData);
};
dojo.subscribe(_65a._EVENT_TOGGLE,this,_65b);
dojo.subscribe("/curam/page/refresh",this,_65a._saveStateData);
});
},_saveStateData:function(){
var _661=curam.util.ExpandableLists;
curam.debug.log("/curam/page/refresh"+_659.getProperty("curam.util.ExpandableLists.refresh"),_661.stateData);
curam.util.runStorageFn(function(){
try{
dojo.forEach(_661.stateData,function(item){
var data=dojo.toJson(item);
curam.debug.log(_659.getProperty("curam.util.ExpandableLists.exception"),data);
var _662=curam.util.getTopmostWindow().dojox;
_662.storage.put(_661._sanitizeKey(item.listId),data);
});
}
catch(e){
curam.debug.log(_659.getProperty("curam.util.ExpandableLists.exception"),e);
}
});
},_sanitizeKey:function(key){
return key.replace("-","_");
},loadStateData:function(_663){
if(typeof (window.curamDialogRedirecting)!="undefined"){
curam.debug.log("curam.util.ExpandableLists.loadStateData "+_659.getProperty("curam.util.ExpandableLists.load.exit"));
return;
}
var _664=curam.util.ExpandableLists;
var _665=function(){
curam.debug.log("curam.util.ExpandableLists.loadStateData "+ +_659.getProperty("curam.util.ExpandableLists.load.for"),_663);
var _666=curam.util.getTopmostWindow().dojox;
var _667=_666.storage.get(_664._sanitizeKey(_663));
if(_667&&_667!=""){
var _668=dojo.fromJson(_667);
var _669=dojo.query("table."+_664._LIST_ID_PREFIX+_663);
dojo.forEach(_668.expandedRows,function(item){
curam.debug.log(_659.getProperty("curam.util.ExpandableLists.load.row"),item);
var _66a=dojo.query("tr."+_664._ROW_ID_PREFIX+item,_669[0]);
if(_66a.length>0){
var _66b=dojo.query("a.list-details-row-toggle",cm.prevSibling(_66a[0],"tr"));
if(_66b.length==1){
_664._toggleDetailsRow(_66b[0]);
}else{
curam.debug.log(_659.getProperty("curam.util.ExpandableLists.load.button"+".disabled"));
}
}else{
curam.debug.log(_659.getProperty("curam.util.ExpandableLists.load.row.disabled"));
}
});
_666.storage.put(_664._sanitizeKey(_663),"");
}else{
curam.debug.log(_659.getProperty("curam.util.ExpandableLists.load.no.data"));
}
};
dojo.ready(function(){
curam.util.runStorageFn(_665);
});
},_getListData:function(_66c){
var _66d=curam.util.ExpandableLists.stateData;
var _66e=dojo.filter(_66d,function(item){
return item.listId==_66c;
});
if(_66e.length==0){
_66e.push({listId:_66c,expandedRows:[]});
_66d.push(_66e[0]);
}
return _66e[0];
},_removeListData:function(_66f){
var _670=curam.util.ExpandableLists;
_670.stateData=dojo.filter(_670.stateData,function(item){
return item.listId!=_66f;
});
},toggleListDetailsRow:function(_671){
if(_671){
_671=dojo.fixEvent(_671);
dojo.stopEvent(_671);
var _672=_671.currentTarget;
curam.util.ExpandableLists._toggleDetailsRow(_672);
}
},_generateUimController:function(_673){
var _674=dojo.query("td",_673)[0];
var _675=dojo.query("div",_673)[0];
var _676=new curam.UIMController({uid:dojo.attr(_675,"uid"),url:dojo.attr(_675,"url"),iframeId:dojo.attr(_675,"iframeId"),iframeClassList:dojo.attr(_675,"iframeClassList"),loadFrameOnCreate:dojo.attr(_675,"loadFrameOnCreate")});
_674.appendChild(_676.domNode);
if(_675&&_674){
_674.removeChild(_675);
}
return _676;
},_toggleDetailsRow:function(_677){
curam.debug.log("curam.util.ExpandableLists._toggleDetailsRow "+_659.getProperty("curam.util.ExpandableLists.load.for"),_677);
var _678=curam.util.ExpandableLists;
var _679=cm.getParentByType(_677,"tr");
var _67a=cm.nextSibling(_679,"tr");
var _67b=!_678.isDetailsRowExpanded(_67a);
_678._handleStripingAndRoundedCorners(_679,_67a,_67b);
var _67c=dojo.query("div.uimController",_67a);
var _67d=null;
var _67e=null;
if(_67c==null||_67c.length==0){
_67e=_678._generateUimController(_67a);
}else{
_67d=_67c[0];
_67e=dijit.byNode(_67d);
}
if(typeof (_67e)=="undefined"||_67e==null){
throw "UIMController Dijit not found for node: "+_67d;
}
var _67f=dojo.attr(_67e.frame,"src");
var _680=false;
_678.setDetailsRowExpandedState(_679,_67a,_67b,_677);
var def=new dojo.Deferred();
if(!_67f||_67f==null||_67f==""){
_67e.loadPage(def);
}else{
_680=true;
def.callback();
}
def.addCallback(function(){
var _681=_67e.hasInPageNavigation();
_680=_680||_681;
if(_681){
_67e.showTabContainer(_67b);
}
if(_680){
curam.util.ExpandableLists.resizeExpandableListAncestors(window);
}
var _682=_67b?_678._EVENT_TYPE_EXPANDED:_678._EVENT_TYPE_COLLAPSED;
var _683=_678._findListId(_67a);
var _684=curam.util.getSuffixFromClass(_67a,_678._ROW_ID_PREFIX);
dojo.publish(_678._EVENT_TOGGLE,[_683,_684,_682]);
if(!curam.util.ExpandableLists._isExternalApp(window)){
var _682=_67b?"ListDetailsRow.Expand":"ListDetailsRow.Collapse";
var _685={url:dojo.attr(_67e.frame,"src"),eventType:_682};
var _686=curam.tab.getSelectedTab();
if(_686){
var _687=curam.tab.getTabWidgetId(_686);
curam.util.getTopmostWindow().dojo.publish("expandedList.toggle",[window.frameElement,_685,_687]);
}
}
});
},_handleStripingAndRoundedCorners:function(_688,_689,_68a){
var odd="odd";
var even="even";
var _68b="row-no-border";
var _68c="odd-last-row";
var _68d="even-last-row";
if(!curam.util.ExpandableLists._isLastRow(_688,_689)){
if(dojo.hasClass(_688,odd)){
dojo.addClass(_689,odd);
}else{
if(dojo.hasClass(_688,even)){
dojo.addClass(_689,even);
}
}
}else{
if(_68a){
if(dojo.hasClass(_688,_68c)){
dojo.removeClass(_688,_68c);
dojo.addClass(_688,odd);
dojo.addClass(_689,odd);
dojo.addClass(_689,_68c);
}else{
if(dojo.hasClass(_688,_68d)){
dojo.removeClass(_688,_68d);
dojo.addClass(_688,even);
dojo.addClass(_689,even);
dojo.addClass(_689,_68d);
}
}
}else{
if(dojo.hasClass(_688,odd)){
dojo.removeClass(_688,odd);
dojo.addClass(_688,_68c);
dojo.removeClass(_689,_68c);
dojo.removeClass(_689,odd);
}else{
if(dojo.hasClass(_688,even)){
dojo.removeClass(_688,even);
dojo.addClass(_688,_68d);
dojo.removeClass(_689,even);
dojo.removeClass(_689,_68d);
}
}
}
}
if(_68a){
dojo.addClass(_688,_68b);
}else{
dojo.removeClass(_688,_68b);
}
if(dojo.hasClass(_688,_68b)){
dojo.removeClass(_689,"collapsed");
}else{
dojo.addClass(_689,"collapsed");
}
},setDetailsRowExpandedState:function(_68e,_68f,_690,_691){
var _692=curam.util.ExpandableLists.isDetailsRowExpanded(_68f);
dojo.removeClass(_68f,"collapsed");
if(!_692){
dojo.addClass(_68f,"collapsed");
}
if(_68e.style.display=="none"){
_68f.setAttribute("style","display:none");
}else{
_68f.removeAttribute("style");
}
if(_691){
if(_690){
dojo.addClass(_691,"expanded");
}else{
dojo.removeClass(_691,"expanded");
}
}
},_isLastRow:function(_693,_694){
return dojo.hasClass(_693,"even-last-row")||dojo.hasClass(_693,"odd-last-row")||dojo.hasClass(_694,"even-last-row")||dojo.hasClass(_694,"odd-last-row");
},isDetailsRowExpanded:function(_695){
return !dojo.hasClass(_695,"collapsed");
},listRowFrameLoaded:function(_696,_697){
curam.debug.log("========= "+_659.getProperty("curam.util.ExpandableLists.page.load")+" =======");
curam.debug.log(_696);
curam.debug.log(dojo.toJson(_697));
var _698=dojo.byId(_696);
if(!_698){
throw "List Row Expanded: No iframe found";
}
if(!_698._spExpListPageLoadListener){
_698._spExpListPageLoadListener="true";
}else{
if(!curam.util.ExpandableLists._isExternalApp(window)){
curam.contentPanel.publishSmartPanelExpListPageLoad(_698);
}
}
var _699=curam.util.ExpandableLists._findListId(_698);
var _69a=curam.util.ExpandableLists.getMinimumExpandedHeight(_699);
var _69b=_697.height;
if(_69b<_69a){
curam.debug.log(_659.getProperty("curam.util.ExpandableLists.min.height",[_69a]));
_69b=_69a;
}else{
curam.debug.log(_659.getProperty("curam.util.ExpandableLists.height",[_69b]));
}
curam.util.ExpandableLists._resizeIframe(_698,_69b);
curam.util.ExpandableLists.resizeExpandableListAncestors(window);
curam.util.ExpandableLists._setFrameTitle(_698,_697);
if(!curam.util.ExpandableLists._isExternalApp(window)){
var _69c=curam.tab.getSelectedTab();
if(_69c){
var _69d=curam.tab.getTabWidgetId(_69c);
var _69e=curam.util.getTopmostWindow();
_69e.curam.util.Refresh.getController(_69d).pageLoaded(_697.pageID,curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_INLINE);
}
}
curam.debug.log("================================================");
},_resizeIframe:function(_69f,_6a0){
dojo.style(_69f,{height:_6a0+"px"});
},_setFrameTitle:function(_6a1,_6a2){
_6a1.title=_6a1.title+" "+_6a2.title;
},_findListId:function(_6a3){
return curam.util.getSuffixFromClass(cm.getParentByType(_6a3,"table"),curam.util.ExpandableLists._LIST_ID_PREFIX);
},resizeExpandableListAncestors:function(_6a4){
curam.debug.log("curam.util.ExpandableLists.resizeExpandableListAncestors: ",_6a4.location.href);
if(_6a4&&_6a4!==window.top&&typeof (_6a4.frameElement)!="undefined"&&(dojo.hasClass(_6a4.frameElement,"expanded_row_iframe")||curam.util.ExpandableLists.isNestedUIM(_6a4))){
var _6a5=_6a4.curam.util.getPageHeight();
curam.debug.log("curam.util.ExpandableLists"+".resizeExpandableListAncestors: "+_659.getProperty("curam.util.ExpandableLists.resize.height"),_6a5);
curam.util.ExpandableLists._resizeIframe(_6a4.frameElement,_6a5);
curam.util.ExpandableLists.resizeExpandableListAncestors(_6a4.parent);
}else{
curam.debug.log("curam.util.ExpandableLists"+".resizeExpandableListAncestors: "+_659.getProperty("curam.util.ExpandableLists.resize.end"));
return;
}
},isNestedUIM:function(_6a6){
if(_6a6&&_6a6.jsScreenContext){
return _6a6.jsScreenContext.hasContextBits("NESTED_UIM");
}else{
return false;
}
},_isExternalApp:function(_6a7){
if(_6a7&&_6a7.jsScreenContext){
return _6a7.jsScreenContext.hasContextBits("EXTAPP");
}else{
return false;
}
},setMinimumExpandedHeight:function(_6a8,_6a9){
curam.util.ExpandableLists._minimumExpandedHeight.push({listId:_6a8,minExpHeight:_6a9});
},getMinimumExpandedHeight:function(_6aa){
var data=dojo.filter(curam.util.ExpandableLists._minimumExpandedHeight,function(item){
return item.listId==_6aa;
});
if(data.length==1){
return data[0].minExpHeight;
}else{
curam.debug.log(_659.getProperty("curam.util.ExpandableLists.default.height"),_6aa);
return 30;
}
}});
return curam.util.ExpandableLists;
});
},"dojo/_base/url":function(){
define("dojo/_base/url",["./kernel"],function(dojo){
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$"),_6ab=function(){
var n=null,_6ac=arguments,uri=[_6ac[0]];
for(var i=1;i<_6ac.length;i++){
if(!_6ac[i]){
continue;
}
var _6ad=new _6ab(_6ac[i]+""),_6ae=new _6ab(uri[0]+"");
if(_6ad.path==""&&!_6ad.scheme&&!_6ad.authority&&!_6ad.query){
if(_6ad.fragment!=n){
_6ae.fragment=_6ad.fragment;
}
_6ad=_6ae;
}else{
if(!_6ad.scheme){
_6ad.scheme=_6ae.scheme;
if(!_6ad.authority){
_6ad.authority=_6ae.authority;
if(_6ad.path.charAt(0)!="/"){
var path=_6ae.path.substring(0,_6ae.path.lastIndexOf("/")+1)+_6ad.path;
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
_6ad.path=segs.join("/");
}
}
}
}
uri=[];
if(_6ad.scheme){
uri.push(_6ad.scheme,":");
}
if(_6ad.authority){
uri.push("//",_6ad.authority);
}
uri.push(_6ad.path);
if(_6ad.query){
uri.push("?",_6ad.query);
}
if(_6ad.fragment){
uri.push("#",_6ad.fragment);
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
_6ab.prototype.toString=function(){
return this.uri;
};
return dojo._Url=_6ab;
});
},"curam/widget/FilteringSelect":function(){
define("curam/widget/FilteringSelect",["dijit/registry","dojo/on","dijit/form/FilteringSelect"],function(_6af,on){
var _6b0=dojo.declare("curam.widget.FilteringSelect",dijit.form.FilteringSelect,{enterKeyOnOpenDropDown:false,postMixInProperties:function(){
if(!this.store){
if(dojo.query("> option",this.srcNodeRef)[0]==undefined){
dojo.create("option",{innerHTML:"<!--__o3_BLANK-->"},this.srcNodeRef);
}
}
if(!this.get("store")&&this.srcNodeRef.value==""){
var _6b1=this.srcNodeRef,_6b2=dojo.query("> option[value='']",_6b1);
if(_6b2.length&&_6b2[0].innerHTML!="<!--__o3_BLANK-->"){
this.displayedValue=dojo.trim(_6b2[0].innerHTML);
}
}
this.inherited(arguments);
},postCreate:function(){
on(this.focusNode,"keydown",function(e){
var _6b3=_6af.byNode(dojo.byId("widget_"+e.target.id));
if(e.keyCode==dojo.keys.ENTER&&_6b3._opened){
_6b3.enterKeyOnOpenDropDown=true;
}
});
this.inherited(arguments);
},startup:function(){
this.domNode.setAttribute("role","listbox");
this.inherited(arguments);
},_callbackSetLabel:function(_6b4,_6b5,_6b6,_6b7){
if((_6b5&&_6b5[this.searchAttr]!==this._lastQuery)||(!_6b5&&_6b4.length&&this.get("store").getIdentity(_6b4[0])!=this._lastQuery)){
return;
}
if(!_6b4.length){
this.set("value","__o3_INVALID",_6b7||(_6b7===undefined&&!this.focused),this.textbox.value,null);
}else{
this.set("item",_6b4[0],_6b7);
}
}});
return _6b0;
});
},"dojo/text":function(){
define("dojo/text",["./_base/kernel","require","./has","./_base/xhr"],function(dojo,_6b8,has,xhr){
var _6b9;
if(1){
_6b9=function(url,sync,load){
xhr("GET",{url:url,sync:!!sync,load:load});
};
}else{
if(_6b8.getText){
_6b9=_6b8.getText;
}else{
console.error("dojo/text plugin failed to load because loader does not support getText");
}
}
var _6ba={},_6bb=function(text){
if(text){
text=text.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _6bc=text.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_6bc){
text=_6bc[1];
}
}else{
text="";
}
return text;
},_6bd={},_6be={},_6bf={dynamic:true,normalize:function(id,_6c0){
var _6c1=id.split("!"),url=_6c1[0];
return (/^\./.test(url)?_6c0(url):url)+(_6c1[1]?"!"+_6c1[1]:"");
},load:function(id,_6c2,load){
var _6c3=id.split("!"),_6c4=_6c3.length>1,_6c5=_6c3[0],url=_6c2.toUrl(_6c3[0]),text=_6bd,_6c6=function(text){
load(_6c4?_6bb(text):text);
};
if(_6c5 in _6ba){
text=_6ba[_6c5];
}else{
if(url in _6c2.cache){
text=_6c2.cache[url];
}else{
if(url in _6ba){
text=_6ba[url];
}
}
}
if(text===_6bd){
if(_6be[url]){
_6be[url].push(_6c6);
}else{
var _6c7=_6be[url]=[_6c6];
_6b9(url,!_6c2.async,function(text){
_6ba[_6c5]=_6ba[url]=text;
for(var i=0;i<_6c7.length;){
_6c7[i++](text);
}
delete _6be[url];
});
}
}else{
_6c6(text);
}
}};
dojo.cache=function(_6c8,url,_6c9){
var key;
if(typeof _6c8=="string"){
if(/\//.test(_6c8)){
key=_6c8;
_6c9=url;
}else{
key=_6b8.toUrl(_6c8.replace(/\./g,"/")+(url?("/"+url):""));
}
}else{
key=_6c8+"";
_6c9=url;
}
var val=(_6c9!=undefined&&typeof _6c9!="string")?_6c9.value:_6c9,_6ca=_6c9&&_6c9.sanitize;
if(typeof val=="string"){
_6ba[key]=val;
return _6ca?_6bb(val):val;
}else{
if(val===null){
delete _6ba[key];
return null;
}else{
if(!(key in _6ba)){
_6b9(key,true,function(text){
_6ba[key]=text;
});
}
return _6ca?_6bb(_6ba[key]):_6ba[key];
}
}
};
return _6bf;
});
},"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n","curam/util/TabNavigation":function(){
define("curam/util/TabNavigation",["curam/debug","curam/define","curam/util","curam/tab","curam/util/Refresh","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _6cb=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.TabNavigation",{CACHE_BUSTER:0,CACHE_BUSTER_PARAM_NAME:"o3nocache",disabledItems:{},tabLists:{},init:function(_6cc,_6cd){
var _6ce=_6cc+"child-nav-selectChild";
var _6cf=dojo.subscribe(_6ce,"",function(){
curam.util.TabNavigation.onParentSelect(null,_6cc);
});
curam.tab.unsubscribeOnTabClose(_6cf,_6cd);
},onParentSelect:function(_6d0,_6d1){
var _6d2=_6d1+"-child-nav";
var _6d3=dijit.byId(_6d2);
var _6d4=true;
if(!_6d0){
var _6d4=false;
var _6d5=_6d1+"-parent-nav";
var _6d6=dijit.byId(_6d5);
_6d0=_6d6.selectedChildWidget;
}
if(_6d0.curamDoNoReload){
_6d4=false;
_6d0.setAttribute("curamDoNoReload",null);
}
var _6d7=_6d0.id+"-Stack";
var _6d8=dijit.byId(_6d7);
var href=dojo.attr(_6d8.get("srcNodeRef"),"page-ref");
if(!href){
var _6d9=_6d8;
if(_6d9){
var link=dojo.query("li.selected > div.link",_6d9.id)[0];
href=dojo.attr(link,"page-ref");
}else{
throw new Error("Could not find a page reference. The menu item '"+_6d0.id+"' has no page reference and no selected child item was found.");
}
}
if(_6d4){
var ifr=curam.util.TabNavigation.getIframe(_6d1);
if(dojo.isIE&&dojo.isIE<9){
ifrBody=ifr.contentWindow.document.body;
}else{
ifrBody=ifr.contentDocument.activeElement;
}
var _6da=function(){
_6d3.selectChild(_6d8);
dojo.style(_6d3.domNode,"visibility","visible");
dojo.style(ifr,"visibility","visible");
};
if(dojo.isIE&&dojo.isIE<9){
var lh=function(){
if(ifr.readyState=="complete"){
ifr.detachEvent("onreadystatechange",lh);
_6da();
}
};
ifr.attachEvent("onreadystatechange",lh);
}else{
var dt=dojo.connect(ifr,"onload",null,function(){
dojo.disconnect(dt);
_6da();
});
}
dojo.query("div.list",ifrBody).forEach(function(node){
dojo.addClass(node,"hidden");
});
dojo.style(ifr,"visibility","hidden");
dojo.style(_6d3.domNode,"visibility","hidden");
curam.util.TabNavigation.loadIframe(href,_6d1);
}
var open=curam.util.TabNavigation.childMenuExists(_6d0);
curam.util.TabNavigation.toggleChildMenu(open,_6d1);
},childMenuExists:function(_6db){
var _6dc=_6db.id+"-Stack";
var _6dd=dojo.query("#"+_6dc+" ul");
if(_6dd.length==0){
return false;
}else{
return true;
}
},toggleChildMenu:function(open,_6de){
var _6df=_6de+"-navigation-tab";
var _6e0=dojo.byId(_6df);
var _6e1=dojo.query(".content-area-container",_6e0)[0];
var _6e2=dojo.query(".child-nav",_6e0)[0];
if(!open){
var _6e3="0px";
var _6e4=((getComputedStyle(_6e1).direction=="ltr")?{left:_6e3}:{right:_6e3});
var _6e5={width:_6e3};
dojo.style(_6e1,_6e4);
dojo.style(_6e2,_6e5);
}else{
var _6e6=dojo.attr(_6e0,"child-menu-width");
var _6e4=((getComputedStyle(_6e1).direction=="ltr")?{left:_6e6}:{right:_6e6});
var _6e5={width:_6e6};
dojo.style(_6e1,_6e4);
dojo.style(_6e2,_6e5);
}
},handleChildSelect:function(_6e7,_6e8,_6e9){
if(!curam.util.TabNavigation.isSelectable(_6e7.parentNode.id)){
dojo.stopEvent(dojo.fixEvent(_6e9));
return false;
}
var ul=curam.util.TabNavigation.getNext(_6e7,"UL");
var _6ea=ul.childNodes;
for(var i=0;i<_6ea.length;i++){
dojo.replaceClass(_6ea[i],"not-selected","selected");
}
dojo.replaceClass(_6e7.parentNode,"selected","not-selected");
var href=dojo.attr(_6e7,"page-ref");
curam.util.TabNavigation.loadIframe(href,_6e8);
return true;
},isSelectable:function(_6eb){
return !curam.util.TabNavigation.disabledItems[_6eb];
},getNext:function(_6ec,_6ed){
var _6ee=_6ec.parentNode;
if(_6ee==null){
curam.debug.log(_6cb.getProperty("curam.util.TabNavigation.error",[_6ed]));
return null;
}
if(_6ee.nodeName===_6ed){
return _6ee;
}else{
var _6ee=curam.util.TabNavigation.getNext(_6ee,_6ed);
return _6ee;
}
},loadIframe:function(href,_6ef){
var _6f0=curam.util.TabNavigation.getIframe(_6ef);
dojo.attr(_6f0,"src",href+"&"+this.getCacheBusterParameter());
},getIframe:function(_6f1){
var _6f2=_6f1+"-navigation-tab";
var _6f3=dojo.byId(_6f2);
var _6f4=dojo.query("iframe",_6f3);
return _6f4[0];
},getCacheBusterParameter:function(){
return this.CACHE_BUSTER_PARAM_NAME+"="+new Date().getTime()+"_"+this.CACHE_BUSTER++;
},setupOnParentSelect:function(_6f5,_6f6,_6f7){
var _6f8=dojo.byId(_6f5+"-navigation-tab");
var _6f9=curam.tab.getContainerTab(_6f8);
_6f9.subscribe(_6f5+"-child-nav-startup",function(){
curam.util.TabNavigation.onParentSelect(null,_6f5);
var tabs=_6f7.split(",");
for(tabID in tabs){
var _6fa=curam.util.TabNavigation.findNavItem("navItem_"+this.id+"_"+tabs[tabID]);
if(_6fa!=null){
_6fa.set("curamVisible",false);
}
}
});
_6f9.subscribe(_6f6,function(_6fb){
curam.util.TabNavigation.onParentSelect(_6fb,_6f5);
});
},setupRefresh:function(_6fc){
curam.util.Refresh.setNavigationCallbacks(curam.util.TabNavigation.updateNavItemStates,curam.util.TabNavigation.getRefreshParams);
var _6fd=function(){
var _6fe=function(_6ff,_700){
return curam.util.Refresh.refreshMenuAndNavigation(_700,true,true,true);
};
var _701=curam.tab.getHandlerForTab(_6fe,_6fc);
var _702=curam.util.getTopmostWindow();
var _703=_702.dojo.subscribe("curam.tabOpened",null,function(_704,_705){
_701(_704,_705);
_702.dojo.unsubscribe(_703);
});
};
var _706=curam.util.TabNavigation.dynamicNavigationData[_6fc];
_706.registerTabOpenHandler=_6fd;
_706.registerTabOpenHandler();
},getRefreshParams:function(_707){
curam.debug.log("curam.util.TabNavigation.getRefreshParams(%s)",_707);
var _708=curam.util.TabNavigation.dynamicNavigationData[_707];
if(!_708){
curam.debug.log(_6cb.getProperty("curam.util.TabNavigation.no.dynamic"));
return null;
}
var _709="navId="+_708.navigationId;
_709+="&navItemIds="+curam.util.toCommaSeparatedList(_708.dynamicNavItemIds);
_709+="&navLoaders="+curam.util.toCommaSeparatedList(_708.dynamicNavLoaders);
_709+="&navPageParameters="+_708.pageParameters;
return _709;
},updateNavItemStates:function(_70a,data){
var _70b=data.navData;
for(var i=0;i<_70b.itemStates.length;i++){
curam.util.TabNavigation.updateNavItemState(_70b.itemStates[i],_70a);
}
},updateNavItemState:function(_70c,_70d){
var _70e=curam.util.TabNavigation.findNavItem("navItem_"+_70d+"_"+_70c.id);
if(_70e!=null){
if(!_70e.domNode){
curam.util.TabNavigation.disabledItems[_70e.id]=!_70c.enabled;
curam.util.swapState(_70e,_70c.enabled,"enabled","disabled");
curam.util.swapState(_70e,_70c.visible,"visible","hidden");
}else{
_70e.set("curamDisabled",!_70c.enabled);
_70e.set("curamVisible",_70c.visible);
}
}
},findNavItem:function(_70f){
var _710=dojo.query("."+_70f);
if(_710.length==1){
var node=_710[0];
var _711=dijit.byNode(node);
if(!_711){
return node;
}else{
return _711.controlButton;
}
}else{
curam.debug.log(_6cb.getProperty("curam.util.TabNavigation.item",[_70f]));
return null;
}
},addRollOverClass:function(_712){
dojo.addClass(_712.target,"hover");
curam.util.connect(_712.target,"onmouseout",function(){
dojo.removeClass(_712.target,"hover");
});
},setupOnLoadListener:function(_713,_714){
var _715=dojo.fromJson(_714);
var _716=function(_717,_718){
curam.util.TabNavigation.handleContentAreaUpdate(_717,_718,_715);
};
var _719=curam.tab.getHandlerForTab(_716,_713);
var _71a=curam.util.getTopmostWindow();
var _71b=_71a.dojo.subscribe("/curam/main-content/page/loaded",null,_719);
curam.tab.unsubscribeOnTabClose(_71b,_713);
},setupTabList:function(_71c,_71d){
if(!curam.util.TabNavigation.tabLists[_71c]){
curam.tab.executeOnTabClose(function(){
delete curam.util.TabNavigation.tabLists[_71c];
},_71c);
}
delete curam.util.TabNavigation.tabLists[_71c];
curam.util.TabNavigation.tabLists[_71c]=_71d;
},handleContentAreaUpdate:function(_71e,_71f,_720){
var ids=_720[_71e];
if(ids){
var _721=ids["dojoTabId"];
var _722=_721+"-parent-nav";
var _723=ids["tabId"];
var _724=ids["childId"];
var _725=dijit.byId(_723);
var _726=dijit.byId(_722);
if(_725){
if(_726.selectedChildWidget!=_725){
_725.setAttribute("curamDoNoReload",true);
_726.selectChild(_725);
}
if(_724){
var _727=_723+"-Stack";
var _728=_721+"-child-nav";
var _729=dijit.byId(_728);
var _72a=dijit.byId(_727);
_729.selectChild(_72a);
var _72b=dojo.query("li",_72a.domNode);
for(var i=0;i<_72b.length;i++){
var _72c=_72b[i];
if(_72c.id==_724){
var _72d=_72c;
}
}
if(_72d){
if(!dojo.hasClass(_72d,"selected")){
var _72e=_72d.parentNode.childNodes;
for(var i=0;i<_72e.length;i++){
dojo.replaceClass(_72e[i],"not-selected","selected");
}
dojo.replaceClass(_72d,"selected","not-selected");
}
}
}
}
}
},getInsertIndex:function(_72f,_730,_731){
var _732=curam.util.TabNavigation.tabLists[_72f];
var _733=dojo.indexOf(_732,_731);
var _734=_733;
for(var i=_733-1;i>=0;i--){
if(dojo.indexOf(_730,_732[i])<0){
_734--;
}
}
return _734;
}});
return curam.util.TabNavigation;
});
},"dojo/uacss":function(){
define("dojo/uacss",["./dom-geometry","./_base/lang","./ready","./_base/sniff","./_base/window"],function(_735,lang,_736,has,_737){
var html=_737.doc.documentElement,ie=has("ie"),_738=has("opera"),maj=Math.floor,ff=has("ff"),_739=_735.boxModel.replace(/-/,""),_73a={"dj_quirks":has("quirks"),"dj_opera":_738,"dj_khtml":has("khtml"),"dj_webkit":has("webkit"),"dj_safari":has("safari"),"dj_chrome":has("chrome"),"dj_gecko":has("mozilla")};
if(ie){
_73a["dj_ie"]=true;
_73a["dj_ie"+maj(ie)]=true;
_73a["dj_iequirks"]=has("quirks");
}
if(ff){
_73a["dj_ff"+maj(ff)]=true;
}
_73a["dj_"+_739]=true;
var _73b="";
for(var clz in _73a){
if(_73a[clz]){
_73b+=clz+" ";
}
}
html.className=lang.trim(html.className+" "+_73b);
_736(90,function(){
if(!_735.isBodyLtr()){
var _73c="dj_rtl dijitRtl "+_73b.replace(/ /g,"-rtl ");
html.className=lang.trim(html.className+" "+_73c+"dj_rtl dijitRtl "+_73b.replace(/ /g,"-rtl "));
}
});
return has;
});
},"dijit/Tooltip":function(){
require({cache:{"url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n"}});
define("dijit/Tooltip",["dojo/_base/array","dojo/_base/declare","dojo/_base/fx","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/_base/sniff","dojo/_base/window","./_base/manager","./place","./_Widget","./_TemplatedMixin","./BackgroundIframe","dojo/text!./templates/Tooltip.html","."],function(_73d,_73e,fx,dom,_73f,_740,_741,lang,has,win,_742,_743,_744,_745,_746,_747,_748){
var _749=_73e("dijit._MasterTooltip",[_744,_745],{duration:_742.defaultDuration,templateString:_747,postCreate:function(){
win.body().appendChild(this.domNode);
this.bgIframe=new _746(this.domNode);
this.fadeIn=fx.fadeIn({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onShow")});
this.fadeOut=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHide")});
},show:function(_74a,_74b,_74c,rtl,_74d){
if(this.aroundNode&&this.aroundNode===_74b&&this.containerNode.innerHTML==_74a){
return;
}
this.domNode.width="auto";
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_74a;
if(_74d){
this.set("textDir",_74d);
}
this.containerNode.align=rtl?"right":"left";
var pos=_743.around(this.domNode,_74b,_74c&&_74c.length?_74c:_74e.defaultPosition,!rtl,lang.hitch(this,"orient"));
var _74f=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_74f.y+((_74f.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_74f.x+((_74f.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}
}
_741.set(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_74b;
},orient:function(node,_750,_751,_752,_753){
this.connectorNode.style.top="";
var _754=_752.w-this.connectorNode.offsetWidth;
node.className="dijitTooltip "+{"MR-ML":"dijitTooltipRight","ML-MR":"dijitTooltipLeft","TM-BM":"dijitTooltipAbove","BM-TM":"dijitTooltipBelow","BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_750+"-"+_751];
this.domNode.style.width="auto";
var size=_740.getContentBox(this.domNode);
var _755=Math.min((Math.max(_754,1)),size.w);
var _756=_755<size.w;
this.domNode.style.width=_755+"px";
if(_756){
this.containerNode.style.overflow="auto";
var _757=this.containerNode.scrollWidth;
this.containerNode.style.overflow="visible";
if(_757>_755){
_757=_757+_741.get(this.domNode,"paddingLeft")+_741.get(this.domNode,"paddingRight");
this.domNode.style.width=_757+"px";
}
}
if(_751.charAt(0)=="B"&&_750.charAt(0)=="B"){
var mb=_740.getMarginBox(node);
var _758=this.connectorNode.offsetHeight;
if(mb.h>_752.h){
var _759=_752.h-((_753.h+_758)>>1);
this.connectorNode.style.top=_759+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_753.h/2-_758/2,0),mb.h-_758)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_754);
},_onShow:function(){
if(has("ie")){
this.domNode.style.filter="";
}
},hide:function(_75a){
if(this._onDeck&&this._onDeck[1]==_75a){
this._onDeck=null;
}else{
if(this.aroundNode===_75a){
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
_73d.forEach(node.children,function(_75b){
this._setAutoTextDir(_75b);
},this);
},_setTextDirAttr:function(_75c){
this._set("textDir",_75c);
if(_75c=="auto"){
this._setAutoTextDir(this.containerNode);
}else{
this.containerNode.dir=this.textDir;
}
}});
_748.showTooltip=function(_75d,_75e,_75f,rtl,_760){
if(_75f){
_75f=_73d.map(_75f,function(val){
return {after:"after-centered",before:"before-centered"}[val]||val;
});
}
if(!_74e._masterTT){
_748._masterTT=_74e._masterTT=new _749();
}
return _74e._masterTT.show(_75d,_75e,_75f,rtl,_760);
};
_748.hideTooltip=function(_761){
return _74e._masterTT&&_74e._masterTT.hide(_761);
};
var _74e=_73e("dijit.Tooltip",_744,{label:"",showDelay:400,connectId:[],position:[],_setConnectIdAttr:function(_762){
_73d.forEach(this._connections||[],function(_763){
_73d.forEach(_763,lang.hitch(this,"disconnect"));
},this);
this._connectIds=_73d.filter(lang.isArrayLike(_762)?_762:(_762?[_762]:[]),function(id){
return dom.byId(id);
});
this._connections=_73d.map(this._connectIds,function(id){
var node=dom.byId(id);
return [this.connect(node,"onmouseenter","_onHover"),this.connect(node,"onmouseleave","_onUnHover"),this.connect(node,"onfocus","_onHover"),this.connect(node,"onblur","_onUnHover")];
},this);
this._set("connectId",_762);
},addTarget:function(node){
var id=node.id||node;
if(_73d.indexOf(this._connectIds,id)==-1){
this.set("connectId",this._connectIds.concat(id));
}
},removeTarget:function(node){
var id=node.id||node,idx=_73d.indexOf(this._connectIds,id);
if(idx>=0){
this._connectIds.splice(idx,1);
this.set("connectId",this._connectIds);
}
},buildRendering:function(){
this.inherited(arguments);
_73f.add(this.domNode,"dijitTooltipData");
},startup:function(){
this.inherited(arguments);
var ids=this.connectId;
_73d.forEach(lang.isArrayLike(ids)?ids:[ids],this.addTarget,this);
},_onHover:function(e){
if(!this._showTimer){
var _764=e.target;
this._showTimer=setTimeout(lang.hitch(this,function(){
this.open(_764);
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
},open:function(_765){
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
_74e.show(this.label||this.domNode.innerHTML,_765,this.position,!this.isLeftToRight(),this.textDir);
this._connectNode=_765;
this.onShow(_765,this.position);
},close:function(){
if(this._connectNode){
_74e.hide(this._connectNode);
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
_74e._MasterTooltip=_749;
_74e.show=_748.showTooltip;
_74e.hide=_748.hideTooltip;
_74e.defaultPosition=["after-centered","before-centered"];
return _74e;
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
dojo.string.substitute=function(_766,map,_767,_768){
_768=_768||dojo.global;
_767=_767?lang.hitch(_768,_767):function(v){
return v;
};
return _766.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_769,key,_76a){
var _76b=lang.getObject(key,false,map);
if(_76a){
_76b=lang.getObject(_76a,false,_768).call(_768,_76b,key);
}
return _767(_76b,key).toString();
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
var _76c=dojo.declare("curam.util.ui.refresh.RefreshEvent",null,{TYPE_ONLOAD:"onload",TYPE_ONSUBMIT:"onsubmit",SOURCE_CONTEXT_MAIN:"main-content",SOURCE_CONTEXT_DIALOG:"dialog",SOURCE_CONTEXT_INLINE:"inline",_type:null,_context:null,constructor:function(type,_76d){
if(!type||!_76d){
throw "Required parameters missing.";
}
if(!(type==this.TYPE_ONLOAD||type==this.TYPE_ONSUBMIT)){
throw "Unknown type: "+type;
}
if(!(_76d==this.SOURCE_CONTEXT_DIALOG||_76d==this.SOURCE_CONTEXT_INLINE||_76d==this.SOURCE_CONTEXT_MAIN)){
throw "Unknown context: "+_76d;
}
this._type=type;
this._context=_76d;
},equals:function(_76e){
if(typeof _76e!="object"){
return false;
}
if(_76e.declaredClass!=this.declaredClass){
return false;
}
return this._type===_76e._type&&this._context===_76e._context;
}});
return _76c;
});
},"dijit/layout/AccordionPane":function(){
define("dijit/layout/AccordionPane",["dojo/_base/declare","dojo/_base/kernel","./ContentPane"],function(_76f,_770,_771){
return _76f("dijit.layout.AccordionPane",_771,{constructor:function(){
_770.deprecated("dijit.layout.AccordionPane deprecated, use ContentPane instead","","2.0");
},onSelected:function(){
}});
});
},"dijit/form/_FormValueMixin":function(){
define("dijit/form/_FormValueMixin",["dojo/_base/declare","dojo/dom-attr","dojo/keys","dojo/_base/sniff","./_FormWidgetMixin"],function(_772,_773,keys,has,_774){
return _772("dijit.form._FormValueMixin",_774,{readOnly:false,_setReadOnlyAttr:function(_775){
_773.set(this.focusNode,"readOnly",_775);
this._set("readOnly",_775);
},postCreate:function(){
this.inherited(arguments);
if(has("ie")){
this.connect(this.focusNode||this.domNode,"onkeydown",this._onKeyDown);
}
if(this._resetValue===undefined){
this._lastValueReported=this._resetValue=this.value;
}
},_setValueAttr:function(_776,_777){
this._handleOnChange(_776,_777);
},_handleOnChange:function(_778,_779){
this._set("value",_778);
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
define("dojox/layout/ContentPane",["dojo/_base/lang","dojo/_base/xhr","dijit/layout/ContentPane","dojox/html/_base","dojo/_base/declare"],function(lang,_77a,_77b,_77c,_77d){
return _77d("dojox.layout.ContentPane",_77b,{adjustPaths:false,cleanContent:false,renderStyles:false,executeScripts:true,scriptHasHooks:false,constructor:function(){
this.ioArgs={};
this.ioMethod=_77a.get;
},onExecError:function(e){
},_setContent:function(cont){
var _77e=this._contentSetter;
if(!(_77e&&_77e instanceof _77c._ContentSetter)){
_77e=this._contentSetter=new _77c._ContentSetter({node:this.containerNode,_onError:lang.hitch(this,this._onError),onContentError:lang.hitch(this,function(e){
var _77f=this.onContentError(e);
try{
this.containerNode.innerHTML=_77f;
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
define("dijit/form/DropDownButton",["dojo/_base/declare","dojo/_base/lang","dojo/query","../registry","../popup","./Button","../_Container","../_HasDropDown","dojo/text!./templates/DropDownButton.html"],function(_780,lang,_781,_782,_783,_784,_785,_786,_787){
return _780("dijit.form.DropDownButton",[_784,_785,_786],{baseClass:"dijitDropDownButton",templateString:_787,_fillContent:function(){
if(this.srcNodeRef){
var _788=_781("*",this.srcNodeRef);
this.inherited(arguments,[_788[0]]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
if(!this.dropDown&&this.dropDownContainer){
var _789=_781("[widgetId]",this.dropDownContainer)[0];
this.dropDown=_782.byNode(_789);
delete this.dropDownContainer;
}
if(this.dropDown){
_783.hide(this.dropDown);
}
this.inherited(arguments);
},isLoaded:function(){
var _78a=this.dropDown;
return (!!_78a&&(!_78a.href||_78a.isLoaded));
},loadDropDown:function(_78b){
var _78c=this.dropDown;
var _78d=_78c.on("load",lang.hitch(this,function(){
_78d.remove();
_78b();
}));
_78c.refresh();
},isFocusable:function(){
return this.inherited(arguments)&&!this._mouseDown;
}});
});
},"dijit/form/_FormWidgetMixin":function(){
define("dijit/form/_FormWidgetMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-style","dojo/_base/lang","dojo/mouse","dojo/_base/sniff","dojo/_base/window","dojo/window","../a11y"],function(_78e,_78f,_790,_791,lang,_792,has,win,_793,a11y){
return _78f("dijit.form._FormWidgetMixin",null,{name:"",alt:"",value:"",type:"text",tabIndex:"0",_setTabIndexAttr:"focusNode",disabled:false,intermediateChanges:false,scrollOnFocus:true,_setIdAttr:"focusNode",_setDisabledAttr:function(_794){
this._set("disabled",_794);
_790.set(this.focusNode,"disabled",_794);
if(this.valueNode){
_790.set(this.valueNode,"disabled",_794);
}
this.focusNode.setAttribute("aria-disabled",_794?"true":"false");
if(_794){
this._set("hovering",false);
this._set("active",false);
var _795="tabIndex" in this.attributeMap?this.attributeMap.tabIndex:("_setTabIndexAttr" in this)?this._setTabIndexAttr:"focusNode";
_78e.forEach(lang.isArray(_795)?_795:[_795],function(_796){
var node=this[_796];
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
var _797=this.connect(this.focusNode,"onfocus",function(){
this.disconnect(_798);
this.disconnect(_797);
});
var _798=this.connect(win.body(),"onmouseup",function(){
this.disconnect(_798);
this.disconnect(_797);
if(this.focused){
this.focus();
}
});
}
if(this.scrollOnFocus){
this.defer(function(){
_793.scrollIntoView(this.domNode);
});
}
this.inherited(arguments);
},isFocusable:function(){
return !this.disabled&&this.focusNode&&(_791.get(this.domNode,"display")!="none");
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
},_onChangeActive:false,_handleOnChange:function(_799,_79a){
if(this._lastValueReported==undefined&&(_79a===null||!this._onChangeActive)){
this._resetValue=this._lastValueReported=_799;
}
this._pendingOnChange=this._pendingOnChange||(typeof _799!=typeof this._lastValueReported)||(this.compare(_799,this._lastValueReported)!=0);
if((this.intermediateChanges||_79a||_79a===undefined)&&this._pendingOnChange){
this._lastValueReported=_799;
this._pendingOnChange=false;
if(this._onChangeActive){
if(this._onChangeHandle){
this._onChangeHandle.remove();
}
this._onChangeHandle=this.defer(function(){
this._onChangeHandle=null;
this.onChange(_799);
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
dojo.date.getDaysInMonth=function(_79b){
var _79c=_79b.getMonth();
var days=[31,28,31,30,31,30,31,31,30,31,30,31];
if(_79c==1&&dojo.date.isLeapYear(_79b)){
return 29;
}
return days[_79c];
};
dojo.date.isLeapYear=function(_79d){
var year=_79d.getFullYear();
return !(year%400)||(!(year%4)&&!!(year%100));
};
dojo.date.getTimezoneName=function(_79e){
var str=_79e.toString();
var tz="";
var _79f;
var pos=str.indexOf("(");
if(pos>-1){
tz=str.substring(++pos,str.indexOf(")"));
}else{
var pat=/([A-Z\/]+) \d{4}$/;
if((_79f=str.match(pat))){
tz=_79f[1];
}else{
str=_79e.toLocaleString();
pat=/ ([A-Z\/]+)$/;
if((_79f=str.match(pat))){
tz=_79f[1];
}
}
}
return (tz=="AM"||tz=="PM")?"":tz;
};
dojo.date.compare=function(_7a0,_7a1,_7a2){
_7a0=new Date(+_7a0);
_7a1=new Date(+(_7a1||new Date()));
if(_7a2=="date"){
_7a0.setHours(0,0,0,0);
_7a1.setHours(0,0,0,0);
}else{
if(_7a2=="time"){
_7a0.setFullYear(0,0,0);
_7a1.setFullYear(0,0,0);
}
}
if(_7a0>_7a1){
return 1;
}
if(_7a0<_7a1){
return -1;
}
return 0;
};
dojo.date.add=function(date,_7a3,_7a4){
var sum=new Date(+date);
var _7a5=false;
var _7a6="Date";
switch(_7a3){
case "day":
break;
case "weekday":
var days,_7a7;
var mod=_7a4%5;
if(!mod){
days=(_7a4>0)?5:-5;
_7a7=(_7a4>0)?((_7a4-5)/5):((_7a4+5)/5);
}else{
days=mod;
_7a7=parseInt(_7a4/5);
}
var strt=date.getDay();
var adj=0;
if(strt==6&&_7a4>0){
adj=1;
}else{
if(strt==0&&_7a4<0){
adj=-1;
}
}
var trgt=strt+days;
if(trgt==0||trgt==6){
adj=(_7a4>0)?2:-2;
}
_7a4=(7*_7a7)+days+adj;
break;
case "year":
_7a6="FullYear";
_7a5=true;
break;
case "week":
_7a4*=7;
break;
case "quarter":
_7a4*=3;
case "month":
_7a5=true;
_7a6="Month";
break;
default:
_7a6="UTC"+_7a3.charAt(0).toUpperCase()+_7a3.substring(1)+"s";
}
if(_7a6){
sum["set"+_7a6](sum["get"+_7a6]()+_7a4);
}
if(_7a5&&(sum.getDate()<date.getDate())){
sum.setDate(0);
}
return sum;
};
dojo.date.difference=function(_7a8,_7a9,_7aa){
_7a9=_7a9||new Date();
_7aa=_7aa||"day";
var _7ab=_7a9.getFullYear()-_7a8.getFullYear();
var _7ac=1;
switch(_7aa){
case "quarter":
var m1=_7a8.getMonth();
var m2=_7a9.getMonth();
var q1=Math.floor(m1/3)+1;
var q2=Math.floor(m2/3)+1;
q2+=(_7ab*4);
_7ac=q2-q1;
break;
case "weekday":
var days=Math.round(dojo.date.difference(_7a8,_7a9,"day"));
var _7ad=parseInt(dojo.date.difference(_7a8,_7a9,"week"));
var mod=days%7;
if(mod==0){
days=_7ad*5;
}else{
var adj=0;
var aDay=_7a8.getDay();
var bDay=_7a9.getDay();
_7ad=parseInt(days/7);
mod=days%7;
var _7ae=new Date(_7a8);
_7ae.setDate(_7ae.getDate()+(_7ad*7));
var _7af=_7ae.getDay();
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
case (_7af+mod)>5:
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
case (_7af+mod)<0:
adj=2;
}
}
}
days+=adj;
days-=(_7ad*2);
}
_7ac=days;
break;
case "year":
_7ac=_7ab;
break;
case "month":
_7ac=(_7a9.getMonth()-_7a8.getMonth())+(_7ab*12);
break;
case "week":
_7ac=parseInt(dojo.date.difference(_7a8,_7a9,"day")/7);
break;
case "day":
_7ac/=24;
case "hour":
_7ac/=60;
case "minute":
_7ac/=60;
case "second":
_7ac/=1000;
case "millisecond":
_7ac*=_7a9.getTime()-_7a8.getTime();
}
return Math.round(_7ac);
};
return dojo.date;
});
},"curam/widget/TransferList":function(){
define("curam/widget/TransferList",["dijit/_Widget","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _7b0=new curam.util.ResourceBundle("Debug");
var _7b1=dojo.declare("curam.widget.TransferList",dijit._Widget,{btnNames:["allRight","toRight","toLeft","allLeft"],btnValues:[" "," "," "," "],bntClasses:["allRight","toRight","toLeft","allLeft"],rightEmptyText:"",widgetType:"TransferList",postCreate:function(){
var _7b2=this.domNode.parentNode;
dojo.addClass(_7b2,"transferlistparent");
var _7b3=cm.nextSibling(this.domNode);
this.leftList=this.domNode;
var _7b4=dojo.create("table",{"class":"transfer-list"});
var _7b5=dojo.create("tbody",{},_7b4);
var _7b6=dojo.create("tr",{},_7b5);
var _7b7=dojo.create("td");
var _7b8=dojo.create("td",{"class":"controls"});
var self=this;
function _7b9(name){
return function(){
self.setSelection(name);
return false;
};
};
function _7ba(id){
return function(){
dojo.addClass(dojo.byId(id),"active");
return false;
};
};
function _7bb(id){
return function(){
dojo.removeClass(dojo.byId(id),"active");
return false;
};
};
for(j=0;j<4;j++){
var _7bc=dojo.create("div",{},_7b8);
var _7bd=new Array(LOCALISED_TRANSFER_LIST_RA,LOCALISED_TRANSFER_LIST_R,LOCALISED_TRANSFER_LIST_L,LOCALISED_TRANSFER_LIST_LA);
var btn=dojo.create("input",{type:"button",id:this.btnNames[j]+this.domNode.name,value:this.btnValues[j],"class":this.bntClasses[j],"title":_7bd[j]},_7bc);
btn.listtwins=this;
dojo.connect(btn,"onclick",_7b9(btn.id));
dojo.connect(btn,"onmousedown",_7ba(btn.id));
dojo.connect(btn,"onmouseup",_7bb(btn.id));
dojo.connect(btn,"onmouseout",_7bb(btn.id));
}
var _7be=document.createElement("td");
var _7bf=dojo.create("select",{id:this.domNode.name,name:this.domNode.name,multiple:"multiple","class":"selected",size:5},_7be);
dojo.attr(this.domNode,{name:"__o3ign."+_7bf.name,id:"__o3ign."+_7bf.name,"class":"selected",size:5});
this.rightList=_7bf;
dojo.connect(this.leftList,"ondblclick",_7b9("toRight"));
dojo.connect(this.rightList,"ondblclick",_7b9("toLeft"));
function _7c0(name){
return function(evt){
if(evt.keyCode==evt.KEY_ENTER){
self.setSelection(name);
}
return false;
};
};
dojo.connect(this.leftList,"onkeydown",_7c0("toRight"));
dojo.connect(this.rightList,"onkeydown",_7c0("toLeft"));
_7b7.appendChild(this.domNode);
_7b6.appendChild(_7b7);
_7b6.appendChild(_7b8);
_7b6.appendChild(_7be);
if(_7b3){
_7b2.insertBefore(_7b4,_7b3);
}else{
_7b2.appendChild(_7b4);
}
this.setInitialSelection();
this.adjustEmpties(this.leftList,this.rightList);
var form=cm.getParentByType(this.domNode,"form");
if(!form){
curam.debug.log("curam.widget.TransferList "+_7b0.getProperty("curam.widget.TransferList.msg"));
return;
}
dojo.connect(form,"onsubmit",function(){
var _7c1=self.rightList;
var _7c2=new Array();
for(k1=0;k1<_7c1.options.length;k1++){
_7c2[_7c2.length]=_7c1.options[k1];
}
_7c1.options.length=0;
for(k2=0;k2<_7c2.length;k2++){
_7c2[k2].selected=true;
_7c1.appendChild(_7c2[k2]);
}
});
dojo.connect(window,"onresize",this.selectWidthSetting);
dojo.addOnLoad(this.selectWidthSetting);
},setSelection:function(id){
var _7c3=(id.indexOf("all")>-1);
var _7c4=(id.indexOf("Right")>-1)?this.leftList:this.rightList;
var _7c5=(id.indexOf("Left")>-1)?this.leftList:this.rightList;
if(_7c4.options[0]!=null&&_7c4.options[0].text!=this.rightEmptyText){
if(_7c5.options[0]!=null&&(_7c5.options[0].text==this.rightEmptyText||_7c5.options[0].text=="")){
_7c5.options[0]=null;
}
this.transferOptions(_7c4,_7c5,_7c3);
this.adjustEmpties(this.leftList,this.rightList);
}
},setInitialSelection:function(){
this.transferOptions(this.leftList,this.rightList,false);
},adjustEmpties:function(_7c6,_7c7){
if(_7c7.options.length==0){
_7c7.options[0]=new Option(this.rightEmptyText,"",false,false);
}
},transferOptions:function(_7c8,_7c9,_7ca){
if(_7c8&&_7c9){
var _7cb=new Array();
dojo.forEach(_7c8.options,function(opt){
if(_7ca||opt.selected){
_7cb[_7cb.length]=opt;
}
});
this.appendAll(_7c9,_7cb);
}
},appendAll:function(_7cc,_7cd){
for(var i=0;i<_7cd.length;i++){
_7cd[i].selected=true;
_7cc.appendChild(_7cd[i]);
}
},selectWidthSetting:function(){
if(dojo.query(".transfer-list select.selected")){
dojo.query(".transfer-list select.selected").forEach(function(_7ce){
var _7cf=_7ce.parentNode.clientWidth;
_7ce.style.width=_7cf+"px";
});
}
}});
return _7b1;
});
},"curam/date":function(){
define("curam/date",["curam/define","dojo/date","curam/date/locale","dojo/date/stamp"],function(def,date,loc,_7d0){
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
var _7d1=loc.format(d,{selector:"date",datePattern:fmt,locale:curam.date.getLocale()});
return _7d1;
},getDateFromFormat:function(str,fmt){
var res=loc.parse(str,{selector:"date",datePattern:fmt,locale:curam.date.getLocale()});
return (res==null)?"0":res;
},ISO8601StringToDate:function(val){
return _7d0.fromISOString(val);
},getLocale:function(){
var _7d2=(typeof jsL!="undefined"&&jsL)?jsL:(curam.config?curam.config.locale:null);
return _7d2||curam.date.testLocale||"en";
}});
return curam.date;
});
},"dijit/layout/_ContentPaneResizeMixin":function(){
define("dijit/layout/_ContentPaneResizeMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/_base/lang","dojo/query","dojo/_base/sniff","dojo/_base/window","../registry","./utils","../_Contained"],function(_7d3,_7d4,_7d5,_7d6,_7d7,lang,_7d8,has,win,_7d9,_7da,_7db){
return _7d4("dijit.layout._ContentPaneResizeMixin",null,{doLayout:true,isLayoutContainer:true,startup:function(){
if(this._started){
return;
}
var _7dc=this.getParent();
this._childOfLayoutWidget=_7dc&&_7dc.isLayoutContainer;
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
var _7dd=_7d8("> *",this.containerNode).filter(function(node){
return node.tagName!=="SCRIPT";
}),_7de=_7dd.filter(function(node){
return _7d5.has(node,"data-dojo-type")||_7d5.has(node,"dojoType")||_7d5.has(node,"widgetId");
}),_7df=_7d3.filter(_7de.map(_7d9.byNode),function(_7e0){
return _7e0&&_7e0.domNode&&_7e0.resize;
});
if(_7dd.length==_7de.length&&_7df.length==1){
this._singleChild=_7df[0];
}else{
delete this._singleChild;
}
_7d6.toggle(this.containerNode,this.baseClass+"SingleChild",!!this._singleChild);
},resize:function(_7e1,_7e2){
if(!this._wasShown&&this.open!==false){
this._onShow();
}
this._resizeCalled=true;
this._scheduleLayout(_7e1,_7e2);
},_scheduleLayout:function(_7e3,_7e4){
if(this._isShown()){
this._layout(_7e3,_7e4);
}else{
this._needLayout=true;
this._changeSize=_7e3;
this._resultSize=_7e4;
}
},_layout:function(_7e5,_7e6){
if(_7e5){
_7d7.setMarginBox(this.domNode,_7e5);
}
var cn=this.containerNode;
if(cn===this.domNode){
var mb=_7e6||{};
lang.mixin(mb,_7e5||{});
if(!("h" in mb)||!("w" in mb)){
mb=lang.mixin(_7d7.getMarginBox(cn),mb);
}
this._contentBox=_7da.marginBox2contentBox(cn,mb);
}else{
this._contentBox=_7d7.getContentBox(cn);
}
this._layoutChildren();
delete this._needLayout;
},_layoutChildren:function(){
if(this.doLayout){
this._checkIfSingleChild();
}
if(this._singleChild&&this._singleChild.resize){
var cb=this._contentBox||_7d7.getContentBox(this.containerNode);
this._singleChild.resize({w:cb.w,h:cb.h});
}else{
_7d3.forEach(this.getChildren(),function(_7e7){
if(_7e7.resize){
_7e7.resize();
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
var node=this.domNode,_7e8=this.domNode.parentNode;
return (node.style.display!="none")&&(node.style.visibility!="hidden")&&!_7d6.contains(node,"dijitHidden")&&_7e8&&_7e8.style&&(_7e8.style.display!="none");
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
define("dojo/dnd/Moveable",["../main","../Evented","../touch","./Mover"],function(dojo,_7e9,_7ea){
dojo.declare("dojo.dnd.Moveable",[_7e9],{handle:"",delay:0,skip:false,constructor:function(node,_7eb){
this.node=dojo.byId(node);
if(!_7eb){
_7eb={};
}
this.handle=_7eb.handle?dojo.byId(_7eb.handle):null;
if(!this.handle){
this.handle=this.node;
}
this.delay=_7eb.delay>0?_7eb.delay:0;
this.skip=_7eb.skip;
this.mover=_7eb.mover?_7eb.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,_7ea.press,this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")];
},markupFactory:function(_7ec,node,ctor){
return new ctor(node,_7ec);
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null;
},onMouseDown:function(e){
if(this.skip&&dojo.dnd.isFormElement(e)){
return;
}
if(this.delay){
this.events.push(dojo.connect(this.handle,_7ea.move,this,"onMouseMove"),dojo.connect(this.handle,_7ea.release,this,"onMouseUp"));
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
},onMoveStart:function(_7ed){
dojo.publish("/dnd/move/start",[_7ed]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem");
},onMoveStop:function(_7ee){
dojo.publish("/dnd/move/stop",[_7ee]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem");
},onFirstMove:function(_7ef,e){
},onMove:function(_7f0,_7f1,e){
this.onMoving(_7f0,_7f1);
var s=_7f0.node.style;
s.left=_7f1.l+"px";
s.top=_7f1.t+"px";
this.onMoved(_7f0,_7f1);
},onMoving:function(_7f2,_7f3){
},onMoved:function(_7f4,_7f5){
}});
return dojo.dnd.Moveable;
});
},"dijit/TooltipDialog":function(){
require({cache:{"url:dijit/templates/TooltipDialog.html":"<div role=\"presentation\" tabIndex=\"-1\">\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" data-dojo-attach-point=\"containerNode\" role=\"dialog\"></div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\"></div>\n</div>\n"}});
define("dijit/TooltipDialog",["dojo/_base/declare","dojo/dom-class","dojo/_base/event","dojo/keys","dojo/_base/lang","./focus","./layout/ContentPane","./_DialogMixin","./form/_FormMixin","./_TemplatedMixin","dojo/text!./templates/TooltipDialog.html","."],function(_7f6,_7f7,_7f8,keys,lang,_7f9,_7fa,_7fb,_7fc,_7fd,_7fe,_7ff){
return _7f6("dijit.TooltipDialog",[_7fa,_7fd,_7fc,_7fb],{title:"",doLayout:false,autofocus:true,baseClass:"dijitTooltipDialog",_firstFocusItem:null,_lastFocusItem:null,templateString:_7fe,_setTitleAttr:function(_800){
this.containerNode.title=_800;
this._set("title",_800);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
},orient:function(node,_801,_802){
var newC="dijitTooltipAB"+(_802.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(_802.charAt(0)=="T"?"Below":"Above");
_7f7.replace(this.domNode,newC,this._currentOrientClass||"");
this._currentOrientClass=newC;
},focus:function(){
this._getFocusItems(this.containerNode);
_7f9.focus(this._firstFocusItem);
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
var _803=(this._firstFocusItem==this._lastFocusItem);
if(evt.charOrCode==keys.ESCAPE){
setTimeout(lang.hitch(this,"onCancel"),0);
_7f8.stop(evt);
}else{
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===keys.TAB){
if(!_803){
_7f9.focus(this._lastFocusItem);
}
_7f8.stop(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===keys.TAB&&!evt.shiftKey){
if(!_803){
_7f9.focus(this._firstFocusItem);
}
_7f8.stop(evt);
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
define("dojo/store/util/SimpleQueryEngine",["../../_base/array"],function(_804){
return function(_805,_806){
switch(typeof _805){
default:
throw new Error("Can not query with a "+typeof _805);
case "object":
case "undefined":
var _807=_805;
_805=function(_808){
for(var key in _807){
var _809=_807[key];
if(_809&&_809.test){
if(!_809.test(_808[key])){
return false;
}
}else{
if(_809!=_808[key]){
return false;
}
}
}
return true;
};
break;
case "string":
if(!this[_805]){
throw new Error("No filter function "+_805+" was found in store");
}
_805=this[_805];
case "function":
}
function _80a(_80b){
var _80c=_804.filter(_80b,_805);
if(_806&&_806.sort){
_80c.sort(function(a,b){
for(var sort,i=0;sort=_806.sort[i];i++){
var _80d=a[sort.attribute];
var _80e=b[sort.attribute];
if(_80d!=_80e){
return !!sort.descending==_80d>_80e?-1:1;
}
}
return 0;
});
}
if(_806&&(_806.start||_806.count)){
var _80f=_80c.length;
_80c=_80c.slice(_806.start||0,(_806.start||0)+(_806.count||Infinity));
_80c.total=_80f;
}
return _80c;
};
_80a.matches=_805;
return _80a;
};
});
},"dijit/MenuItem":function(){
require({cache:{"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n"}});
define("dijit/MenuItem",["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/event","dojo/_base/kernel","dojo/_base/sniff","./_Widget","./_TemplatedMixin","./_Contained","./_CssStateMixin","dojo/text!./templates/MenuItem.html"],function(_810,dom,_811,_812,_813,_814,has,_815,_816,_817,_818,_819){
return _810("dijit.MenuItem",[_815,_816,_817,_818],{templateString:_819,baseClass:"dijitMenuItem",label:"",_setLabelAttr:{node:"containerNode",type:"innerHTML"},iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},accelKey:"",disabled:false,_fillContent:function(_81a){
if(_81a&&!("label" in this.params)){
this.set("label",_81a.innerHTML);
}
},buildRendering:function(){
this.inherited(arguments);
var _81b=this.id+"_text";
_811.set(this.containerNode,"id",_81b);
if(this.accelKeyNode){
_811.set(this.accelKeyNode,"id",this.id+"_accel");
_81b+=" "+this.id+"_accel";
}
this.domNode.setAttribute("aria-labelledby",_81b);
dom.setSelectable(this.domNode,false);
},_onHover:function(){
this.getParent().onItemHover(this);
},_onUnhover:function(){
this.getParent().onItemUnhover(this);
this._set("hovering",false);
},_onClick:function(evt){
this.getParent().onItemClick(this,evt);
_813.stop(evt);
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
},_setSelected:function(_81c){
_812.toggle(this.domNode,"dijitMenuItemSelected",_81c);
},setLabel:function(_81d){
_814.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_81d);
},setDisabled:function(_81e){
_814.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_81e);
},_setDisabledAttr:function(_81f){
this.focusNode.setAttribute("aria-disabled",_81f?"true":"false");
this._set("disabled",_81f);
},_setAccelKeyAttr:function(_820){
this.accelKeyNode.style.display=_820?"":"none";
this.accelKeyNode.innerHTML=_820;
_811.set(this.containerNode,"colSpan",_820?"1":"2");
this._set("accelKey",_820);
}});
});
},"dijit/layout/TabController":function(){
require({cache:{"url:dijit/layout/templates/_TabButton.html":"<div role=\"presentation\" data-dojo-attach-point=\"titleNode\" data-dojo-attach-event='onclick:onClick'>\n    <div role=\"presentation\" class='dijitTabInnerDiv' data-dojo-attach-point='innerDiv'>\n        <div role=\"presentation\" class='dijitTabContent' data-dojo-attach-point='tabContent'>\n        \t<div role=\"presentation\" data-dojo-attach-point='focusNode'>\n\t\t        <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" data-dojo-attach-point='iconNode' />\n\t\t        <span data-dojo-attach-point='containerNode' class='tabLabel'></span>\n\t\t        <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\n\t\t        \t\tdata-dojo-attach-event='onclick: onClickCloseButton' role=\"presentation\">\n\t\t            <span data-dojo-attach-point='closeText' class='dijitTabCloseText'>[x]</span\n\t\t        ></span>\n\t\t\t</div>\n        </div>\n    </div>\n</div>\n"}});
define("dijit/layout/TabController",["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/i18n","dojo/_base/lang","./StackController","../Menu","../MenuItem","dojo/text!./templates/_TabButton.html","dojo/i18n!../nls/common"],function(_821,dom,_822,_823,i18n,lang,_824,Menu,_825,_826){
var _827=_821("dijit.layout._TabButton",_824.StackButton,{baseClass:"dijitTab",cssStateNodes:{closeNode:"dijitTabCloseButton"},templateString:_826,scrollOnFocus:false,buildRendering:function(){
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
_823.toggle(this.innerDiv,"dijitClosable",disp);
this.closeNode.style.display=disp?"":"none";
if(disp){
var _828=i18n.getLocalization("dijit","common");
if(this.closeNode){
_822.set(this.closeNode,"title",_828.itemClose);
}
this._closeMenu=new Menu({id:this.id+"_Menu",dir:this.dir,lang:this.lang,textDir:this.textDir,targetNodeIds:[this.domNode]});
this._closeMenu.addChild(new _825({label:_828.itemClose,dir:this.dir,lang:this.lang,textDir:this.textDir,onClick:lang.hitch(this,"onClickCloseButton")}));
}else{
if(this._closeMenu){
this._closeMenu.destroyRecursive();
delete this._closeMenu;
}
}
},_setLabelAttr:function(_829){
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
var _82a=_821("dijit.layout.TabController",_824,{baseClass:"dijitTabController",templateString:"<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'></div>",tabPosition:"top",buttonWidget:"curam.widget._TabButton",startup:function(){
this.inherited(arguments);
this.connect(this,"onAddChild",function(page,_82b){
var _82c=this;
page.controlButton._curamPageId=page.id;
page.controlButton.connect(page.controlButton,"_setCuramVisibleAttr",function(){
if(page.controlButton.curamVisible){
var _82d=dojo.map(_82c.getChildren(),function(btn){
return btn._curamPageId;
});
var _82e=curam.tab.getTabWidgetId(curam.tab.getContainerTab(page.domNode));
var _82f=curam.util.TabNavigation.getInsertIndex(_82e,_82d,page.id);
_82c.addChild(page.controlButton,_82f);
}else{
var _830=page.controlButton;
if(dojo.indexOf(_82c.getChildren(),_830)!=-1){
_82c.removeChild(_830);
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
var _831=0;
for(var pane in this.pane2button){
var ow=this.pane2button[pane].innerDiv.scrollWidth;
_831=Math.max(_831,ow);
}
for(pane in this.pane2button){
this.pane2button[pane].innerDiv.style.width=_831+"px";
}
},onButtonClick:function(page){
if(!page.controlButton.get("curamDisabled")){
var _832=dijit.byId(this.containerId);
_832.selectChild(page);
}
}});
_82a.TabButton=_827;
return _82a;
});
},"dijit/MenuBarItem":function(){
require({cache:{"url:dijit/templates/MenuBarItem.html":"<div class=\"dijitReset dijitInline dijitMenuItem dijitMenuItemLabel\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<span data-dojo-attach-point=\"containerNode\"></span>\n</div>\n"}});
define("dijit/MenuBarItem",["dojo/_base/declare","./MenuItem","dojo/text!./templates/MenuBarItem.html"],function(_833,_834,_835){
var _836=_833("dijit._MenuBarItemMixin",null,{templateString:_835,_setIconClassAttr:null});
var _837=_833("dijit.MenuBarItem",[_834,_836],{});
_837._MenuBarItemMixin=_836;
return _837;
});
},"dojo/cldr/supplemental":function(){
define("dojo/cldr/supplemental",["../_base/kernel","../_base/lang","../i18n"],function(dojo,lang){
lang.getObject("cldr.supplemental",true,dojo);
dojo.cldr.supplemental.getFirstDayOfWeek=function(_838){
var _839={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,sy:6,tn:6,ye:6,ar:0,as:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,il:0,"in":0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mn:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,zw:0};
var _83a=dojo.cldr.supplemental._region(_838);
var dow=_839[_83a];
return (dow===undefined)?1:dow;
};
dojo.cldr.supplemental._region=function(_83b){
_83b=dojo.i18n.normalizeLocale(_83b);
var tags=_83b.split("-");
var _83c=tags[1];
if(!_83c){
_83c={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",he:"il",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[tags[0]];
}else{
if(_83c.length==4){
_83c=tags[2];
}
}
return _83c;
};
dojo.cldr.supplemental.getWeekend=function(_83d){
var _83e={"in":0,af:4,dz:4,ir:4,om:4,sa:4,ye:4,ae:5,bh:5,eg:5,il:5,iq:5,jo:5,kw:5,ly:5,ma:5,qa:5,sd:5,sy:5,tn:5};
var _83f={af:5,dz:5,ir:5,om:5,sa:5,ye:5,ae:6,bh:5,eg:6,il:6,iq:6,jo:6,kw:6,ly:6,ma:6,qa:6,sd:6,sy:6,tn:6};
var _840=dojo.cldr.supplemental._region(_83d);
var _841=_83e[_840];
var end=_83f[_840];
if(_841===undefined){
_841=6;
}
if(end===undefined){
end=0;
}
return {start:_841,end:end};
};
return dojo.cldr.supplemental;
});
},"dijit/MenuBar":function(){
require({cache:{"url:dijit/templates/MenuBar.html":"<div class=\"dijitMenuBar dijitMenuPassive\" data-dojo-attach-point=\"containerNode\"  role=\"menubar\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress: _onKeyPress\"></div>\n"}});
define("dijit/MenuBar",["dojo/_base/declare","dojo/_base/event","dojo/keys","./_MenuBase","dojo/text!./templates/MenuBar.html"],function(_842,_843,keys,_844,_845){
return _842("dijit.MenuBar",_844,{templateString:_845,baseClass:"dijitMenuBar",_isMenuBar:true,postCreate:function(){
var l=this.isLeftToRight();
this.connectKeyNavHandlers(l?[keys.LEFT_ARROW]:[keys.RIGHT_ARROW],l?[keys.RIGHT_ARROW]:[keys.LEFT_ARROW]);
this._orient=["below"];
},focusChild:function(item){
var _846=this.focusedChild,_847=_846&&_846.popup&&_846.popup.isShowingNow;
this.inherited(arguments);
if(_847&&item.popup&&!item.disabled){
this._openPopup();
}
},_onKeyPress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
switch(evt.charOrCode){
case keys.DOWN_ARROW:
this._moveToPopup(evt);
_843.stop(evt);
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
},publishSmartPanelExpListPageLoad:function(_848){
if(ct.getSmartPanelIframe()){
cu.getTopmostWindow().dojo.publish("expandedList.pageLoaded",[_848.contentWindow.location.href]);
}
},setupOnLoad:function(_849,_84a){
curam.debug.log("curam.contenPanel: setupOnLoad: "+_849+" "+_84a);
curam.contentPanel.initSmartPanelExpListPageLoadListener();
var _84b=curam.contentPanel.iframeOnloadHandler;
cu.onLoad.addSubscriber(_849,_84b);
curam.contentPanel.targetSmartPanel(_849,_84a);
ct.executeOnTabClose(function(){
cu.onLoad.removeSubscriber(_849,_84b);
},_84a);
},iframeOnloadHandler:function(_84c,_84d){
var _84e=ct.getContainerTab(dojo.query("iframe."+_84c)[0]);
var _84f=ct.getTabWidgetId(_84e);
var _850=dojo.byId(_84c);
var _851=_850.contentWindow.document.title;
if(_851==""){
var _852=curam.util.iframeTitleFallBack();
_850.contentWindow.document.title=_852;
}
dojo.attr(_850,"title",CONTENT_PANEL_TITLE+" - "+curam.util.iframeTitleFallBack());
dojo.attr(_850,"data-done-loading",true);
cu.Refresh.getController(_84f).pageLoaded(_84d.pageID,cu.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN);
dojo.publish("/curam/main-content/page/loaded",[_84d.pageID,_84f]);
},spOnLoadHandler:function(_853,_854){
var _855=dojo.query("."+_853)[0];
curam.contentPanel.checkSmartPanelLoaded(_855.src,"TabContentArea.Reloaded");
},checkSmartPanelLoaded:function(url,_856){
var _857=ct.getSmartPanelIframe();
var _858=dojo.attr(_857,"iframeLoaded");
if(_858=="true"){
curam.contentPanel.smartPanelPublisher(_857,url,_856);
}else{
var _859=curam.tab.getContainerTab(_857);
var _85a=curam.tab.getTabWidgetId(_859);
var _85b=dojo.subscribe("smartPanel.loaded",function(_85c){
if(_85c!=_857){
return;
}
curam.contentPanel.smartPanelPublisher(_857,url,_856);
});
curam.tab.unsubscribeOnTabClose(_85b,_85a);
}
},smartPanelPublisher:function(_85d,url,_85e){
var _85f=new curam.ui.PageRequest(url);
_85d.contentWindow.dojo.publish("contentPane.targetSmartPanel",[{"eventType":_85e,"pageId":_85f.pageID,"parameters":_85f.parameters}]);
},targetSmartPanel:function(_860,_861){
curam.debug.log("curam.contentPanel:targetSmartPanel(): "+_860+" "+_861);
var _862=ct.getSmartPanelIframe();
var _863=_861;
if(_862){
var spId=curam.util.onLoad.defaultGetIdFunction(_862);
var _864=dojo.subscribe("expandedList.toggle",function(_865,_866,_867){
if(_863===_867){
curam.contentPanel.checkSmartPanelLoaded(_866.url,_866.eventType);
}
});
var _868=curam.contentPanel.spOnLoadHandler;
cu.onLoad.addSubscriber(_860,_868);
ct.executeOnTabClose(function(){
dojo.unsubscribe(_864);
cu.onLoad.removeSubscriber(_860,_868);
cu.onLoad.removeSubscriber(spId,curam.smartPanel._handleSmartPanelLoad);
},_861);
}
}});
return curam.contentPanel;
});
},"dijit/layout/_LayoutWidget":function(){
define("dijit/layout/_LayoutWidget",["dojo/_base/lang","../_Widget","../_Container","../_Contained","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/sniff","dojo/_base/window"],function(lang,_869,_86a,_86b,_86c,_86d,_86e,_86f,has,win){
return _86c("dijit.layout._LayoutWidget",[_869,_86a,_86b],{baseClass:"dijitLayoutContainer",isLayoutContainer:true,buildRendering:function(){
this.inherited(arguments);
_86d.add(this.domNode,"dijitContainer");
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
var _870=this.getParent&&this.getParent();
if(!(_870&&_870.isLayoutContainer)){
this.resize();
this.connect(win.global,"onresize",function(){
this.resize();
});
}
},resize:function(_871,_872){
var node=this.domNode;
if(_871){
_86e.setMarginBox(node,_871);
}
var mb=_872||{};
lang.mixin(mb,_871||{});
if(!("h" in mb)||!("w" in mb)){
mb=lang.mixin(_86e.getMarginBox(node),mb);
}
var cs=_86f.getComputedStyle(node);
var me=_86e.getMarginExtents(node,cs);
var be=_86e.getBorderExtents(node,cs);
var bb=(this._borderBox={w:mb.w-(me.w+be.w),h:mb.h-(me.h+be.h)});
var pe=_86e.getPadExtents(node,cs);
this._contentBox={l:_86f.toPixelValue(node,cs.paddingLeft),t:_86f.toPixelValue(node,cs.paddingTop),w:bb.w-pe.w,h:bb.h-pe.h};
this.layout();
},layout:function(){
},_setupChild:function(_873){
var cls=this.baseClass+"-child "+(_873.baseClass?this.baseClass+"-"+_873.baseClass:"");
_86d.add(_873.domNode,cls);
},addChild:function(_874,_875){
this.inherited(arguments);
if(this._started){
this._setupChild(_874);
}
},removeChild:function(_876){
var cls=this.baseClass+"-child"+(_876.baseClass?" "+this.baseClass+"-"+_876.baseClass:"");
_86d.remove(_876.domNode,cls);
this.inherited(arguments);
}});
});
},"curam/util/SessionTimeout":function(){
define("curam/util/SessionTimeout",["curam/util","dojo/_base/lang","curam/debug","curam/html","curam/util/UimDialog","curam/util/ResourceBundle"],function(util,lang,_877,html,_878){
dojo.requireLocalization("curam.application","TimeoutWarning");
var _879=new curam.util.ResourceBundle("TimeoutWarning");
curam.define.singleton("curam.util.SessionTimeout",{logoutPageID:"",minutes:0,seconds:0,userMessageNode:null,userMessageNodeID:"userMessage",displayTimerNodeID:"displayTimer",stopTimer:false,updatedUserMessage:null,dismissModalBtnTxt:null,displayButtonCssNames:".initially-hidden-widget.btn-id-1",doLogout:true,timeForDialogToAppear:0,sessTimeoutWarningJSPXDialog:"external-session-timeout-warning-dialog.jspx",sessTimeoutJSPXDialog:"external-session-timeout-dialog.jspx",bufferingPeriod:null,checkSessionExpired:function(_87a,_87b,_87c,_87d){
this.width=_87a;
this.height=_87b;
this.timeoutPeriod=_87c;
this.stopChecking=false;
this.interval=10000;
this.bufferingPeriod=_87d==undefined?30000:_87d*1000;
this.executeChecking=setInterval(function(){
curam.util.SessionTimeout._executeSessionExpiredCheck();
},this.interval);
},_executeSessionExpiredCheck:function(){
var _87e=curam.util.getCookie("sessionExpiry");
if(this.currSessionExpCookie){
if(this.currSessionExpCookie!=_87e){
this.timeForDialogToAppear=-10000;
this.validCookie=this._sessionExpiryCookieIsAsExpected(_87e);
}
}else{
this.validCookie=this._sessionExpiryCookieIsAsExpected(_87e);
this._ammendTimeoutPeriodForMisconfiguration(this.validCookie);
}
this.currSessionExpCookie=_87e;
this.timeForDialogToAppear=this.timeForDialogToAppear+this.interval;
if(this.validCookie){
this.sessionExpiry=Math.abs(this.validCookie[0]);
this.serverTime=Math.abs(this.validCookie[1]);
var _87f=this.serverTime+this.timeForDialogToAppear+this.bufferingPeriod;
var _880=this.sessionExpiry-(this.timeoutPeriod*1000);
this.totalExpirySeverTime=_880;
this.totalCurrServerTime=_87f;
if(_87f>=_880&&this.stopChecking!=true){
this.stopChecking=true;
if(window.top.openModal!=undefined){
window.top.openModal(this.sessTimeoutWarningJSPXDialog,{width:this.width,height:this.height});
}
clearInterval(this.executeChecking);
}
}
},_sessionExpiryCookieIsAsExpected:function(_881){
var _882=true;
if(_881!=null){
var _883=_881.split("-",2);
if(_883&&_883.length==2){
for(token in _883){
var _884=Math.abs(token);
if(isNaN(_884)){
_882=false;
}
}
if(_882==true){
return _883;
}
}
}
},_ammendTimeoutPeriodForMisconfiguration:function(_885){
if(_885){
var _886=Math.abs(this.validCookie[0]);
var _887=Math.abs(this.validCookie[1]);
var _888=(_886-(_887+this.interval+this.bufferingPeriod))/1000;
_888=_888<=0?0:_888;
var _889=this.getTimeoutWarningConfig();
if(_889){
var _88a=_889.timeout;
_88a=_88a<=0?0:_88a;
if(_88a>=_888){
this.getTimeoutWarningConfig("timeout",_888);
}
}
}
},getTimeoutWarningConfig:function(_88b,_88c){
if(window.top.getAppConfig){
var _88d=window.top.getAppConfig();
var _88e=_88d.timeoutWarning;
if(_88e&&_88b&&_88c){
_88e[_88b]=_88c;
}
return _88e;
}
},displayTimerAndLogout:function(_88f,_890,_891,_892,_893,_894){
this.executeTimer=setInterval(function(){
curam.util.SessionTimeout.timer();
},1000);
this.minutes=~~(_890/60);
this.seconds=_890%60;
this.timerNode=dojo.byId(this.displayTimerNodeID);
this.userMessageNode=dojo.byId(this.userMessageNodeID);
this.logoutPageID=_88f;
this.updatedUserMessage=_891;
this.dismissModalBtnTxt=_892;
this.expiredTitleText=_893;
this.titleNode=window.top.dojo.byId(_894);
},timer:function(){
if(this.stopTimer!=true){
var _895="";
if(this.seconds<10){
_895=this.minutes+" : 0"+this.seconds;
}else{
_895=this.minutes+" : "+this.seconds;
}
this.timerNode.innerHTML="&#x202A;"+_895+"&#x202C;";
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
},quitTimeoutWarningDialog:function(_896){
var _897={pageID:this.logoutPageID};
window.top.displayContent(_897);
},dismissTimeoutDialog:function(){
window.top.location=jsBaseURL+"/"+"application.do";
},continueUsingApp:function(){
_877.log(_879.getProperty("continueApp"));
this.stopTimer();
},dismissTimeoutWarningModal:function(){
_877.log(_879.getProperty("dismissTimeoutModal"));
},displayUserMsgAsParagraphs:function(msg,_898){
var _899;
if(_898){
_899=_898;
}else{
_899=dojo.byId(this.userMessageNodeID);
}
var _89a=curam.html.splitWithTag(msg,"\\n","p");
_899.innerHTML=_89a;
this.userMessageNode=_899;
}});
return curam.util.SessionTimeout;
});
},"dojo/behavior":function(){
define("dojo/behavior",["./_base/kernel","./_base/lang","./_base/array","./_base/connect","./query","./ready"],function(dojo,lang,_89b,_89c,_89d,_89e){
dojo.behavior=new function(){
function _89f(obj,name){
if(!obj[name]){
obj[name]=[];
}
return obj[name];
};
var _8a0=0;
function _8a1(obj,_8a2,func){
var _8a3={};
for(var x in obj){
if(typeof _8a3[x]=="undefined"){
if(!func){
_8a2(obj[x],x);
}else{
func.call(_8a2,obj[x],x);
}
}
}
};
this._behaviors={};
this.add=function(_8a4){
_8a1(_8a4,this,function(_8a5,name){
var _8a6=_89f(this._behaviors,name);
if(typeof _8a6["id"]!="number"){
_8a6.id=_8a0++;
}
var _8a7=[];
_8a6.push(_8a7);
if((lang.isString(_8a5))||(lang.isFunction(_8a5))){
_8a5={found:_8a5};
}
_8a1(_8a5,function(rule,_8a8){
_89f(_8a7,_8a8).push(rule);
});
});
};
var _8a9=function(node,_8aa,_8ab){
if(lang.isString(_8aa)){
if(_8ab=="found"){
_89c.publish(_8aa,[node]);
}else{
_89c.connect(node,_8ab,function(){
_89c.publish(_8aa,arguments);
});
}
}else{
if(lang.isFunction(_8aa)){
if(_8ab=="found"){
_8aa(node);
}else{
_89c.connect(node,_8ab,_8aa);
}
}
}
};
this.apply=function(){
_8a1(this._behaviors,function(_8ac,id){
_89d(id).forEach(function(elem){
var _8ad=0;
var bid="_dj_behavior_"+_8ac.id;
if(typeof elem[bid]=="number"){
_8ad=elem[bid];
if(_8ad==(_8ac.length)){
return;
}
}
for(var x=_8ad,tver;tver=_8ac[x];x++){
_8a1(tver,function(_8ae,_8af){
if(lang.isArray(_8ae)){
_89b.forEach(_8ae,function(_8b0){
_8a9(elem,_8b0,_8af);
});
}
});
}
elem[bid]=_8ac.length;
});
});
};
};
_89e(dojo.behavior,"apply");
return dojo.behavior;
});
},"dijit/popup":function(){
define("dijit/popup",["dojo/_base/array","dojo/aspect","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/window","./place","./BackgroundIframe","."],function(_8b1,_8b2,_8b3,_8b4,dom,_8b5,_8b6,_8b7,_8b8,_8b9,has,keys,lang,on,win,_8ba,_8bb,_8bc){
function _8bd(){
if(this._popupWrapper){
_8b6.destroy(this._popupWrapper);
delete this._popupWrapper;
}
};
var _8be=_8b4(null,{_stack:[],_beginZIndex:1000,_idGen:1,_createWrapper:function(_8bf){
var _8c0=_8bf._popupWrapper,node=_8bf.domNode;
if(!_8c0){
_8c0=_8b6.create("div",{"class":"dijitPopup",style:{display:"none"},role:"presentation"},win.body());
_8c0.appendChild(node);
var s=node.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
_8bf._popupWrapper=_8c0;
_8b2.after(_8bf,"destroy",_8bd,true);
}
return _8c0;
},moveOffScreen:function(_8c1){
var _8c2=this._createWrapper(_8c1);
_8b8.set(_8c2,{visibility:"hidden",top:"-9999px",display:""});
},hide:function(_8c3){
var _8c4=this._createWrapper(_8c3);
_8b8.set(_8c4,"display","none");
},getTopPopup:function(){
var _8c5=this._stack;
for(var pi=_8c5.length-1;pi>0&&_8c5[pi].parent===_8c5[pi-1].widget;pi--){
}
return _8c5[pi];
},open:function(args){
var _8c6=this._stack,_8c7=args.popup,_8c8=args.orient||["below","below-alt","above","above-alt"],ltr=args.parent?args.parent.isLeftToRight():_8b7.isBodyLtr(),_8c9=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+this._idGen++);
while(_8c6.length&&(!args.parent||!dom.isDescendant(args.parent.domNode,_8c6[_8c6.length-1].widget.domNode))){
this.close(_8c6[_8c6.length-1].widget);
}
var _8ca=this._createWrapper(_8c7);
_8b5.set(_8ca,{id:id,style:{zIndex:this._beginZIndex+_8c6.length},"class":"dijitPopup "+(_8c7.baseClass||_8c7["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:args.parent?args.parent.id:""});
if(has("bgIframe")&&!_8c7.bgIframe){
_8c7.bgIframe=new _8bb(_8ca);
}
var best=_8c9?_8ba.around(_8ca,_8c9,_8c8,ltr,_8c7.orient?lang.hitch(_8c7,"orient"):null):_8ba.at(_8ca,args,_8c8=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],args.padding);
_8ca.style.display="";
_8ca.style.visibility="visible";
_8c7.domNode.style.visibility="visible";
var _8cb=[];
_8cb.push(on(_8ca,_8b3._keypress,lang.hitch(this,function(evt){
if(evt.charOrCode==keys.ESCAPE&&args.onCancel){
_8b9.stop(evt);
args.onCancel();
}else{
if(evt.charOrCode===keys.TAB){
_8b9.stop(evt);
var _8cc=this.getTopPopup();
if(_8cc&&_8cc.onCancel){
_8cc.onCancel();
}
}
}
})));
if(_8c7.onCancel&&args.onCancel){
_8cb.push(_8c7.on("cancel",args.onCancel));
}
_8cb.push(_8c7.on(_8c7.onExecute?"execute":"change",lang.hitch(this,function(){
var _8cd=this.getTopPopup();
if(_8cd&&_8cd.onExecute){
_8cd.onExecute();
}
})));
_8c6.push({widget:_8c7,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:_8cb});
if(_8c7.onOpen){
_8c7.onOpen(best);
}
return best;
},close:function(_8ce){
var _8cf=this._stack;
while((_8ce&&_8b1.some(_8cf,function(elem){
return elem.widget==_8ce;
}))||(!_8ce&&_8cf.length)){
var top=_8cf.pop(),_8d0=top.widget,_8d1=top.onClose;
if(_8d0.onClose){
_8d0.onClose();
}
var h;
while(h=top.handlers.pop()){
h.remove();
}
if(_8d0&&_8d0.domNode){
this.hide(_8d0);
}
if(_8d1){
_8d1();
}
}
}});
return (_8bc.popup=new _8be());
});
},"dijit/_base/manager":function(){
define("dijit/_base/manager",["dojo/_base/array","dojo/_base/config","../registry",".."],function(_8d2,_8d3,_8d4,_8d5){
_8d2.forEach(["byId","getUniqueId","findWidgets","_destroyAll","byNode","getEnclosingWidget"],function(name){
_8d5[name]=_8d4[name];
});
_8d5.defaultDuration=_8d3["defaultDuration"]||200;
return _8d5;
});
},"dijit/layout/StackController":function(){
define("dijit/layout/StackController",["dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/_base/sniff","../focus","../registry","../_Widget","../_TemplatedMixin","../_Container","../form/ToggleButton","dojo/i18n!../nls/common"],function(_8d6,_8d7,_8d8,keys,lang,has,_8d9,_8da,_8db,_8dc,_8dd,_8de){
var _8df=_8d7("dijit.layout._StackButton",_8de,{tabIndex:"-1",closeButton:false,_setCheckedAttr:function(_8e0,_8e1){
this.inherited(arguments);
this.focusNode.removeAttribute("aria-pressed");
},buildRendering:function(evt){
this.inherited(arguments);
(this.focusNode||this.domNode).setAttribute("role","tab");
},onClick:function(){
_8d9.focus(this.focusNode);
},onClickCloseButton:function(evt){
evt.stopPropagation();
}});
var _8e2=_8d7("dijit.layout.StackController",[_8db,_8dc,_8dd],{baseClass:"dijitStackController",templateString:"<span role='tablist' data-dojo-attach-event='onkeypress'></span>",containerId:"",buttonWidget:_8df,constructor:function(){
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
_8d6.forEach(info.children,this.onAddChild,this);
if(info.selected){
this.onSelectChild(info.selected);
}
},destroy:function(){
for(var pane in this.pane2button){
this.onRemoveChild(_8da.byId(pane));
}
this.inherited(arguments);
},onAddChild:function(page,_8e3){
var cls=lang.isString(this.buttonWidget)?lang.getObject(this.buttonWidget):this.buttonWidget;
var _8e4=new cls({id:this.id+"_"+page.id,label:page.title,dir:page.dir,lang:page.lang,textDir:page.textDir,showLabel:page.showTitle,iconClass:page.iconClass,closeButton:page.closable,title:page.tooltip});
_8e4.focusNode.setAttribute("aria-selected","false");
var _8e5=["title","showTitle","iconClass","closable","tooltip"],_8e6=["label","showLabel","iconClass","closeButton","title"];
this.pane2watches[page.id]=_8d6.map(_8e5,function(_8e7,idx){
return page.watch(_8e7,function(name,_8e8,_8e9){
_8e4.set(_8e6[idx],_8e9);
});
});
this.pane2connects[page.id]=[this.connect(_8e4,"onClick",lang.hitch(this,"onButtonClick",page)),this.connect(_8e4,"onClickCloseButton",lang.hitch(this,"onCloseButtonClick",page))];
this.addChild(_8e4,_8e3);
this.pane2button[page.id]=_8e4;
page.controlButton=_8e4;
if(!this._currentChild){
_8e4.focusNode.setAttribute("tabIndex","0");
_8e4.focusNode.setAttribute("aria-selected","true");
this._currentChild=page;
}
if(!this.isLeftToRight()&&has("ie")&&this._rectifyRtlTabList){
this._rectifyRtlTabList();
}
},onRemoveChild:function(page){
if(this._currentChild===page){
this._currentChild=null;
}
_8d6.forEach(this.pane2connects[page.id],lang.hitch(this,"disconnect"));
delete this.pane2connects[page.id];
_8d6.forEach(this.pane2watches[page.id],function(w){
w.unwatch();
});
delete this.pane2watches[page.id];
var _8ea=this.pane2button[page.id];
if(_8ea){
this.removeChild(_8ea);
delete this.pane2button[page.id];
_8ea.destroy();
}
delete page.controlButton;
},onSelectChild:function(page){
if(!page){
return;
}
if(this._currentChild){
var _8eb=this.pane2button[this._currentChild.id];
_8eb.set("checked",false);
_8eb.focusNode.setAttribute("aria-selected","false");
_8eb.focusNode.setAttribute("tabIndex","-1");
}
var _8ec=this.pane2button[page.id];
_8ec.set("checked",true);
_8ec.focusNode.setAttribute("aria-selected","true");
this._currentChild=page;
_8ec.focusNode.setAttribute("tabIndex","0");
var _8ed=_8da.byId(this.containerId);
_8ed.containerNode.setAttribute("aria-labelledby",_8ec.id);
},onButtonClick:function(page){
if(this._currentChild.id===page.id){
var _8ee=this.pane2button[page.id];
_8ee.set("checked",true);
}
var _8ef=_8da.byId(this.containerId);
_8ef.selectChild(page);
},onCloseButtonClick:function(page){
var _8f0=_8da.byId(this.containerId);
_8f0.closeChild(page);
if(this._currentChild){
var b=this.pane2button[this._currentChild.id];
if(b){
_8d9.focus(b.focusNode||b.domNode);
}
}
},adjacent:function(_8f1){
if(!this.isLeftToRight()&&(!this.tabPosition||/top|bottom/.test(this.tabPosition))){
_8f1=!_8f1;
}
var _8f2=this.getChildren();
var _8f3=_8d6.indexOf(_8f2,this.pane2button[this._currentChild.id]);
var _8f4=_8f1?1:_8f2.length-1;
return _8f2[(_8f3+_8f4)%_8f2.length];
},onkeypress:function(e){
if(this.disabled||e.altKey){
return;
}
var _8f5=null;
if(e.ctrlKey||!e._djpage){
switch(e.charOrCode){
case keys.LEFT_ARROW:
case keys.UP_ARROW:
if(!e._djpage){
_8f5=false;
}
break;
case keys.PAGE_UP:
if(e.ctrlKey){
_8f5=false;
}
break;
case keys.RIGHT_ARROW:
case keys.DOWN_ARROW:
if(!e._djpage){
_8f5=true;
}
break;
case keys.PAGE_DOWN:
if(e.ctrlKey){
_8f5=true;
}
break;
case keys.HOME:
case keys.END:
var _8f6=this.getChildren();
if(_8f6&&_8f6.length){
_8f6[e.charOrCode==keys.HOME?0:_8f6.length-1].onClick();
}
_8d8.stop(e);
break;
case keys.DELETE:
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
_8d8.stop(e);
break;
default:
if(e.ctrlKey){
if(e.charOrCode===keys.TAB){
this.adjacent(!e.shiftKey).onClick();
_8d8.stop(e);
}else{
if(e.charOrCode=="w"){
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
_8d8.stop(e);
}
}
}
}
if(_8f5!==null){
this.adjacent(_8f5).onClick();
_8d8.stop(e);
}
}
},onContainerKeyPress:function(info){
info.e._djpage=info.page;
this.onkeypress(info.e);
}});
_8e2.StackButton=_8df;
return _8e2;
});
},"curam/util/onLoad":function(){
define("curam/util/onLoad",["curam/util","curam/define","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _8f7=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.onLoad",{EVENT:"/curam/frame/load",publishers:[],subscribers:[],defaultGetIdFunction:function(_8f8){
var _8f9=dojo.attr(_8f8,"class").split(" ");
return dojo.filter(_8f9,function(_8fa){
return _8fa.indexOf("iframe-")==0;
})[0];
},addPublisher:function(_8fb){
curam.util.onLoad.publishers.push(_8fb);
},addSubscriber:function(_8fc,_8fd,_8fe){
curam.util.onLoad.subscribers.push({"getId":_8fe?_8fe:curam.util.onLoad.defaultGetIdFunction,"callback":_8fd,"iframeId":_8fc});
},removeSubscriber:function(_8ff,_900,_901){
curam.util.onLoad.subscribers=dojo.filter(curam.util.onLoad.subscribers,function(_902){
return !(_902.iframeId==_8ff&&_902.callback==_900);
});
},execute:function(){
if(window.parent==window){
curam.debug.log("curam.util.onLoad.execute(): "+_8f7.getProperty("curam.util.onLoad.exit"));
return;
}
var _903={};
dojo.forEach(curam.util.onLoad.publishers,function(_904){
_904(_903);
});
curam.util.onLoad.publishers=[];
require(["dojo/io/iframe"]);
var _905=dojo.io.iframe.create(null,null,"about:blank");
dojo.attr(_905,"id","ie-progress-indicator-helper");
dojo.attr(_905,"title","ie-progress-indicator-helper");
window.parent.dojo.publish(curam.util.onLoad.EVENT,[window.frameElement,_903]);
}});
curam.util.subscribe(curam.util.onLoad.EVENT,function(_906,_907){
dojo.forEach(curam.util.onLoad.subscribers,function(_908){
var _909=_908.getId(_906);
if(_908.iframeId==_909){
_908.callback(_909,_907);
}
});
});
return curam.util.onLoad;
});
},"url:curam/widget/templates/ComboBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\r\n  id=\"widget_${id}\"\r\n  role=\"listbox\"\r\n  ><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\r\n    data-dojo-attach-point=\"_buttonNode, _popupStateNode\" role=\"presentation\"\r\n    ><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n      ${_buttonInputDisabled}\r\n  /></div\r\n  ><div class='dijitReset dijitValidationContainer'\r\n    ><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n  /></div\r\n  ><div class=\"dijitReset dijitInputField dijitInputContainer\" role=\"listbox\"\r\n    ><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\r\n      data-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\r\n  /></div\r\n></div>\r\n","url:dijit/templates/TooltipDialog.html":"<div role=\"presentation\" tabIndex=\"-1\">\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" data-dojo-attach-point=\"containerNode\" role=\"dialog\"></div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\"></div>\n</div>\n","dojo/dnd/Mover":function(){
define("dojo/dnd/Mover",["../main","../Evented","../touch","./common","./autoscroll"],function(dojo,_90a,_90b){
dojo.declare("dojo.dnd.Mover",[_90a],{constructor:function(node,e,host){
this.node=dojo.byId(node);
this.marginBox={l:e.pageX,t:e.pageY};
this.mouseButton=e.button;
var h=(this.host=host),d=node.ownerDocument;
this.events=[dojo.connect(d,_90b.move,this,"onFirstMove"),dojo.connect(d,_90b.move,this,"onMouseMove"),dojo.connect(d,_90b.release,this,"onMouseUp"),dojo.connect(d,"ondragstart",dojo.stopEvent),dojo.connect(d.body,"onselectstart",dojo.stopEvent)];
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
define("dijit/layout/TabContainer",["dojo/_base/lang","dojo/_base/declare","./_TabContainerBase","./TabController","./ScrollingTabController"],function(lang,_90c,_90d,_90e,_90f){
return _90c("dijit.layout.TabContainer",_90d,{useMenu:true,useSlider:true,controllerWidget:"",_makeController:function(_910){
var cls=this.baseClass+"-tabs"+(this.doLayout?"":" dijitTabNoLayout"),_90e=lang.getObject(this.controllerWidget);
return new _90e({id:this.id+"_tablist",dir:this.dir,lang:this.lang,textDir:this.textDir,tabPosition:this.tabPosition,doLayout:this.doLayout,containerId:this.id,"class":cls,nested:this.nested,useMenu:this.useMenu,useSlider:this.useSlider,tabStripClass:this.tabStrip?this.baseClass+(this.tabStrip?"":"No")+"Strip":null},_910);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.controllerWidget){
this.controllerWidget=(this.tabPosition=="top"||this.tabPosition=="bottom")&&!this.nested?"dijit.layout.ScrollingTabController":"dijit.layout.TabController";
}
}});
});
},"curam/ui/ClientDataAccessor":function(){
define("curam/ui/ClientDataAccessor",["curam/util/Request","curam/debug","curam/util/ResourceBundle"],function(_911){
dojo.requireLocalization("curam.application","Debug");
var _912=new curam.util.ResourceBundle("Debug");
return dojo.declare("curam.ui.ClientDataAccessor",null,{get:function(path,_913,_914,_915){
var _916="servlet/PathResolver"+"?p="+path;
if(_914==undefined){
_914=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_915==undefined){
_915=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
_911.post({url:_916,headers:{"Content-Encoding":"UTF-8"},handleAs:"text",preventCache:true,load:_913,error:_914,handle:_915});
},getList:function(path,_917,_918,_919){
var _91a="servlet/PathResolver"+"?r=l&p="+path;
if(_918==undefined){
_918=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_919==undefined){
_919=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
_911.post({url:_91a,headers:{"Content-Encoding":"UTF-8"},handleAs:"json",preventCache:true,load:_917,error:_918,handle:_919});
},getRaw:function(path,_91b,_91c,_91d){
var _91e="servlet/PathResolver"+"?r=j&p="+path;
if(_91c==undefined){
_91c=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_91d==undefined){
_91d=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
_911.post({url:_91e,headers:{"Content-Encoding":"UTF-8"},handleAs:"json",preventCache:true,load:_91b,error:_91c,handle:_91d});
},set:function(path,_91f,_920,_921,_922){
var _923="servlet/PathResolver"+"?r=x&p="+path+"&v="+encodeURIComponent(_91f);
if(_921==undefined||_921==null){
_921=dojo.hitch(this,this.handleClientDataAccessorError);
}
if(_922==undefined||_922==null){
_922=dojo.hitch(this,this.handleClientDataAccessorCallback);
}
if(_920==undefined||_920==null){
_920=dojo.hitch(this,this.handleClientDataAccessorSuccess);
}
_911.post({url:_923,headers:{"Content-Encoding":"UTF-8"},handleAs:"text",preventCache:true,load:_920,error:_921,handle:_922});
},handleClientDataAccessorError:function(_924,_925){
var _926=_912.getProperty("curam.ui.ClientDataAccessor.err.1")+"PathResolverServlet : ";
var _927=_912.getProperty("curam.ui.ClientDataAccessor.err.2");
curam.debug.log(_926+_924+_927+_925);
},handleClientDataAccessorSuccess:function(_928,_929){
curam.debug.log("curam.ui.ClientDataAccessor.handleClientDataAccessorSuccess : "+_928);
},handleClientDataAccessorCallback:function(_92a,_92b){
curam.debug.log("curam.ui.ClientDataAccessor.handleClientDataAccessorCallback :"+" "+_912.getProperty("curam.ui.ClientDataAccessor.callback"));
}});
});
},"dijit/BackgroundIframe":function(){
define("dijit/BackgroundIframe",["require",".","dojo/_base/config","dojo/dom-construct","dojo/dom-style","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window"],function(_92c,_92d,_92e,_92f,_930,lang,on,has,win){
has.add("bgIframe",has("ie")||has("mozilla"));
var _931=new function(){
var _932=[];
this.pop=function(){
var _933;
if(_932.length){
_933=_932.pop();
_933.style.display="";
}else{
if(has("ie")<9){
var burl=_92e["dojoBlankHtmlUrl"]||_92c.toUrl("dojo/resources/blank.html")||"javascript:\"\"";
var html="<iframe src='"+burl+"' role='presentation'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_933=win.doc.createElement(html);
}else{
_933=_92f.create("iframe");
_933.src="javascript:\"\"";
_933.className="dijitBackgroundIframe";
_933.setAttribute("role","presentation");
_930.set(_933,"opacity",0.1);
}
_933.tabIndex=-1;
}
return _933;
};
this.push=function(_934){
_934.style.display="none";
_932.push(_934);
};
}();
_92d.BackgroundIframe=function(node){
if(!node.id){
throw new Error("no id");
}
if(has("bgIframe")){
var _935=(this.iframe=_931.pop());
node.appendChild(_935);
if(has("ie")<7||has("quirks")){
this.resize(node);
this._conn=on(node,"resize",lang.hitch(this,function(){
this.resize(node);
}));
}else{
_930.set(_935,{width:"100%",height:"100%"});
}
}
};
lang.extend(_92d.BackgroundIframe,{resize:function(node){
if(this.iframe){
_930.set(this.iframe,{width:node.offsetWidth+"px",height:node.offsetHeight+"px"});
}
},destroy:function(){
if(this._conn){
this._conn.remove();
this._conn=null;
}
if(this.iframe){
_931.push(this.iframe);
delete this.iframe;
}
}});
return _92d.BackgroundIframe;
});
},"curam/validation":function(){
define("curam/validation",["curam/define","curam/date"],function(){
curam.define.singleton("curam.validation",{FILE_UPLOAD_FLGS:[],fileUploadChecker:null,invalidPathMsg:null,preventKeyPress:function(_936){
if(dojo.isIE){
_936.cancelBubble=true;
_936.returnValue=false;
return false;
}
return true;
},activateFileUploadChecker:function(code){
if(!curam.validation.fileUploadChecker){
curam.validation.fileUploadChecker=function(){
var form=dojo.byId("mainForm");
var _937=function(evt){
var _938=curam.validation.FILE_UPLOAD_FLGS;
for(var i=0;i<_938.length;i++){
var _939=_938[i];
var _93a=cm.nextSibling(dojo.byId(_939),"input");
if(!curam.validation.isValidFilePath(_93a.value)){
dojo.stopEvent(evt);
alert(curam.validation.invalidPathMsg+" '"+_93a.value+"'");
cm.setFormSubmitted(form,0);
return false;
}
}
return true;
};
dojo.connect(form,"onsubmit",_937);
};
dojo.addOnLoad(curam.validation.fileUploadChecker);
}
},isValidFilePath:function(path){
return true;
},validateDate:function(_93b){
var _93c={valid:curam.date.isDate(_93b,jsDF),validFormat:jsDF.toLowerCase()};
return _93c;
}});
return curam.validation;
});
},"curam/util/ui/ApplicationTabbedUiController":function(){
define("curam/util/ui/ApplicationTabbedUiController",["curam/debug","dojox/layout/ContentPane","curam/tab","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _93d=new curam.util.ResourceBundle("Debug");
var _93e=dojo.declare("curam.util.ui.ApplicationTabbedUiController",null,{_tabContainer:null,constructor:function(_93f){
this._tabContainer=_93f;
},findOpenTab:function(_940){
var _941=_940.tabDescriptor;
var _942=curam.tab.getTabContainer(_941.sectionID);
var _943=null;
var tabs=undefined;
var _944=undefined;
if(_942!=undefined){
tabs=_942.getChildren();
_944=_942.selectedChildWidget;
}
if(_944){
var _945=_944.tabDescriptor;
this._log(_93d.getProperty("curam.util.ui.ApplicationTabbedUiController.testing"));
if(_940.uimPageRequest.openInCurrentTab||(_945.tabID==_941.tabID&&_945.matchesPageRequest(_940.uimPageRequest))){
this._openInCurrentTab(_940.uimPageRequest);
_943=_944;
}
}
if(!_943&&tabs){
var _946=true;
this._log(_93d.getProperty("curam.util.ui.ApplicationTabbedUiController.searching")+" "+tabs.length+" "+_93d.getProperty("curam.util.ui.ApplicationTabbedUiController.tabs"));
for(var i=0;i<tabs.length;i++){
var _947=tabs[i];
var _948=_947.tabDescriptor;
if(_948&&_948.tabID==_941.tabID){
if((_946&&_948.tabSignature==_948.tabID)||_948.matchesPageRequest(_940.uimPageRequest)){
_943=_947;
break;
}
_946=false;
}
}
}
this._log(_93d.getProperty("curam.util.ui.ApplicationTabbedUiController.searched")+" '"+_941.tabID+"'. "+_93d.getProperty("curam.util.ui.ApplicationTabbedUiController.found")+" "+(_943?_93d.getProperty("curam.util.ui.ApplicationTabbedUiController.a"):_93d.getProperty("curam.util.ui.ApplicationTabbedUiController.no"))+" "+_93d.getProperty("curam.util.ui.ApplicationTabbedUiController.match"));
return _943;
},openPageInCurrentTab:function(_949){
var _94a=curam.tab.getSelectedTab();
var _94b=undefined;
if(_94a){
_94b=dojo.query(".nav-panel",_94a.domNode)[0];
}
if(_94b){
var _94c;
if(_949.getURL().indexOf("?")==-1){
_94c="?";
}else{
_94c="&";
}
var loc=curam.config?curam.config.locale:jsL;
var _94d=jsBaseURL+"/"+loc+"/"+_949.getURL()+_94c+curam.tab.getTabController().getCacheBusterParameter();
if(_949.pageHolder){
_949.pageHolder.location.href=_94d;
}else{
var _94e=dojo.query(".contentPanelFrame",_94b)[0];
_94e.src=_94d;
}
}
},_openInCurrentTab:function(_94f){
var _950=curam.tab.getSelectedTab();
var _951=undefined;
if(_950){
_951=dojo.query(".nav-panel",_950.domNode)[0];
}
if(_951){
var _952=dojo.query(".contentPanelFrame",_951)[0];
_94f.cdejParameters["o3ctx"]="4096";
var loc=curam.config?curam.config.locale:jsL;
var url=loc+"/"+_94f.getURL();
if(url.indexOf("?")==-1){
url+="?";
}else{
url+="&";
}
_952.src=url+curam.tab.getTabController().getCacheBusterParameter();
}
},refreshExistingPageInTab:function(tab){
var _953=curam.tab.getContentPanelIframe(tab);
_953.contentWindow.location.reload(true);
},selectTab:function(tab){
this._tabContainer.selectChild(tab);
},createTab:function(_954){
this._log("createTab(): "+_93d.getProperty("curam.util.ui.ApplicationTabbedUiController.start"));
var _955=_954.tabDescriptor;
var _956="";
if(_955.tabContent&&_955.tabContent.tabName){
_956=_955.tabContent.tabName;
}
var cp=new dojox.layout.ContentPane({tabDescriptor:_955,uimPageRequest:_954.uimPageRequest,title:_956,closable:!_955.isHomePage,preventCache:true,"class":"tab-content-holder dijitContentPane dijitHidden "+"dijitTabContainerTop-child "+"dijitTabContainerTop-dijitContentPane dijitTabPane",onDownloadStart:function(){
return "&nbsp;";
}});
var _957=[];
_954.uimPageRequest.cdejParameters["o3ctx"]="4096";
var _958=dojo.connect(cp,"onDownloadEnd",null,function(){
curam.util.fireTabOpenedEvent(cp.id);
});
_957.push(_958);
_958=dojo.connect(cp,"destroy",null,function(){
curam.tab.doExecuteOnTabClose(cp.id);
});
_957.push(_958);
_957.push(dojo.connect(cp,"destroy",function(){
dojo.forEach(_957,dojo.disconnect);
}));
_958=dojo.connect(cp,"set",function(name,_959){
if(name=="title"&&arguments.length==2){
curam.debug.log(_93d.getProperty("curam.util.ui.ApplicationTabbedUiController.title"));
cp.tabDescriptor.setTabContent(_954.uimPageRequest,_959);
var _95a=curam.tab.getSelectedTab();
if(_95a){
var _95b=_95a.domNode.parentNode;
if(_95b){
_95b.focus();
}
}
}
});
_957.push(_958);
_958=dojo.connect(cp,"onClose",function(){
new curam.tab.TabSessionManager().tabClosed(cp.tabDescriptor);
});
_957.push(_958);
var qs=_954.uimPageRequest.getQueryString();
var href="TabContent.do"+"?"+curam.tab.getTabController().COMMAND_PARAM_NAME+"=PAGE&"+curam.tab.getTabController().PAGE_ID_PARAM_NAME+"="+_954.uimPageRequest.pageID+(qs.length>0?"&"+qs:"")+"&o3tabid="+_955.tabID+"&o3tabWidgetId="+cp.id;
this._log(_93d.getProperty("curam.util.ui.ApplicationTabbedUiController.href")+" "+href);
cp.set("href",href);
this._log(_93d.getProperty("curam.util.ui.ApplicationTabbedUiController.finished")+" ",cp.tabDescriptor);
return cp;
},insertTabIntoApp:function(_95c,_95d){
var _95e=null;
if(_95d){
if(this._tabContainer.hasChildren()){
_95e=this._tabContainer.selectedChildWidget;
}
this._tabContainer.addChild(_95c,0);
}else{
this._tabContainer.addChild(_95c);
}
return _95e;
},_log:function(msg,_95f){
if(curam.debug.enabled()){
curam.debug.log("curam.util.ui.ApplicationTabbedUiController: "+msg+(_95f?" "+dojo.toJson(_95f):""));
}
}});
return _93e;
});
},"curam/util/Constants":function(){
define("curam/util/Constants",["curam/define"],function(){
curam.define.singleton("curam.util.Constants",{RETURN_PAGE_PARAM:"__o3rpu"});
return curam.util.Constants;
});
},"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n","curam/ui/PageRequest":function(){
define("curam/ui/PageRequest",["curam/debug","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _960=new curam.util.ResourceBundle("Debug");
var _961=dojo.declare("curam.ui.PageRequest",null,{forceLoad:false,justRefresh:false,constructor:function(_962,_963,_964){
this.parameters={};
this.cdejParameters={};
this.cdejParameters["o3ctx"]="4096";
if(_963){
this.isHomePage=true;
}else{
this.isHomePage=false;
}
if(_964){
this.openInCurrentTab=true;
}else{
this.openInCurrentTab=false;
}
this.pageHolder=null;
var url;
if(dojo.isString(_962)){
url=_962;
curam.debug.log("PAGE REQUEST: "+_960.getProperty("curam.ui.PageRequest.url")+" "+url);
}else{
curam.debug.log("PAGE REQUEST: "+_960.getProperty("curam.ui.PageRequest.descriptor")+" "+_962.toJson());
var tc=_962.tabContent;
url=tc.pageID+"Page.do";
var _965=true;
for(param in tc.parameters){
if(_965){
url+="?";
_965=false;
}else{
url+="&";
}
url+=param+"="+encodeURIComponent(tc.parameters[param]);
}
curam.debug.log("PAGE REQUEST: "+_960.getProperty("curam.ui.PageRequest.derived")+" "+url);
}
var _966=url.split("?");
this.parseUIMPageID(_966[0]);
if(_966.length==2){
this.parseParameters(_966[1]);
}
},parseUIMPageID:function(url){
var _967=url.split("/");
var _968=_967[_967.length-1];
this.pageID=_968.replace("Page.do","");
},parseParameterName:function(name){
if(name.charAt(0)=="a"&&name.charAt(1)=="m"&&name.charAt(2)=="p"&&name.charAt(3)==";"){
return name.substring(4,name.length);
}else{
return name;
}
},parseParameters:function(_969){
var _96a=_969.split("&");
for(var i=0;i<_96a.length;i++){
var _96b=_96a[i].split("=");
var _96c=this.parseParameterName(_96b[0]);
if(_96c.length>0){
if(!this.isCDEJParam(_96c)){
this.parameters[_96c]=decodeURIComponent(_96b[1].replace(/\+/g," "));
}else{
if(_96c!="o3nocache"){
this.cdejParameters[_96c]=decodeURIComponent(_96b[1].replace(/\+/g," "));
}
}
}
}
},isCDEJParam:function(_96d){
return (_96d.charAt(0)=="o"&&_96d.charAt(1)=="3")||(_96d.charAt(0)=="_"&&_96d.charAt(1)=="_"&&_96d.charAt(2)=="o"&&_96d.charAt(3)=="3");
},getQueryString:function(_96e){
var _96f="";
var _970;
for(_970 in this.parameters){
_96f+=_970+"="+encodeURIComponent(this.parameters[_970])+"&";
}
if(!_96e==true||_96e==false){
for(_970 in this.cdejParameters){
_96f+=_970+"="+encodeURIComponent(this.cdejParameters[_970])+"&";
}
}
_96f=_96f.substring(0,_96f.length-1);
this.queryString=_96f;
return this.queryString;
},getURL:function(_971){
var _972=this.pageID+"Page.do";
var qs=this.getQueryString(_971);
if(qs!=""){
_972+="?"+qs;
}
this.url=_972;
return this.url;
}});
return _961;
});
},"curam/widget/Select":function(){
define("curam/widget/Select",["dojo/dom-style","dijit/popup","dojo/dom-geometry","dojo/_base/lang","dojo/dom-attr","dojo/dom-class","dijit/form/Select"],function(_973,_974,_975,lang,_976,_977){
var _978=dojo.declare("curam.widget.Select",dijit.form.Select,{openDropDown:function(){
var _979=this.dropDown,_97a=_979.domNode,_97b=this._aroundNode||this.domNode,self=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_97a.style.width){
this._explicitDDWidth=true;
}
if(_97a.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _97c={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_97c.width="";
}
if(!this._explicitDDHeight){
_97c.height="";
}
_973.set(_97a,_97c);
var _97d=this.maxHeight;
if(_97d==-1){
var _97e=winUtils.getBox(),_97f=_975.position(_97b,false);
_97d=Math.floor(Math.max(_97f.y,_97e.h-(_97f.y+_97f.h)));
}
_974.moveOffScreen(_979);
if(_979.startup&&!_979._started){
_979.startup();
}
var mb=_975.getMarginSize(_97a);
var _980=(_97d&&mb.h>_97d);
_973.set(_97a,{overflowX:"hidden",overflowY:_980?"auto":"hidden"});
if(_980){
mb.h=_97d;
if("w" in mb){
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_97b.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_97b.offsetWidth);
}else{
delete mb.w;
}
}
if(lang.isFunction(_979.resize)){
_979.resize(mb);
}else{
_975.setMarginBox(_97a,mb);
}
}
var _981=_974.open({parent:this,popup:_979,around:_97b,orient:this.dropDownPosition,onExecute:function(){
self.closeDropDown(true);
},onCancel:function(){
self.closeDropDown(true);
},onClose:function(){
_976.set(self._popupStateNode,"popupActive",false);
_977.remove(self._popupStateNode,"dijitHasDropDownOpen");
self._opened=false;
}});
_976.set(this._popupStateNode,"popupActive","true");
_977.add(self._popupStateNode,"dijitHasDropDownOpen");
this._opened=true;
return _981;
}});
return _978;
});
},"url:dijit/layout/templates/TabContainer.html":"<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" data-dojo-attach-point=\"containerNode\"></div>\n</div>\n","dijit/form/Button":function(){
require({cache:{"url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n"}});
define("dijit/form/Button",["require","dojo/_base/declare","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/ready","./_FormWidget","./_ButtonMixin","dojo/text!./templates/Button.html"],function(_982,_983,_984,_985,lang,_986,_987,_988,_989){
if(!_985.isAsync){
_986(0,function(){
var _98a=["dijit/form/DropDownButton","dijit/form/ComboButton","dijit/form/ToggleButton"];
_982(_98a);
});
}
return _983("dijit.form.Button",[_987,_988],{showLabel:true,iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},baseClass:"dijitButton",templateString:_989,_setValueAttr:"valueNode",_onClick:function(e){
var ok=this.inherited(arguments);
if(ok){
if(this.valueNode){
this.valueNode.click();
e.preventDefault();
}
}
return ok;
},_fillContent:function(_98b){
if(_98b&&(!this.params||!("label" in this.params))){
var _98c=lang.trim(_98b.innerHTML);
if(_98c){
this.label=_98c;
}
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
_984.toggle(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},setLabel:function(_98d){
_985.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_98d);
},_setLabelAttr:function(_98e){
this.inherited(arguments);
if(!this.showLabel&&!("title" in this.params)){
this.titleNode.title=lang.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
}});
});
},"curam/widget/Menu":function(){
define("curam/widget/Menu",["dijit/Menu","curam/util","curam/debug","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _98f=new curam.util.ResourceBundle("Debug");
var Menu=dojo.declare("curam.widget.Menu",dijit.Menu,{_CSS_CLASS_ACTIVE_MENU:"curam-active-menu",_EVENT_OPENED:"/curam/menu/opened",_EVENT_CLOSED:"/curam/menu/closed",_amIActive:false,postCreate:function(){
curam.debug.log(_98f.getProperty("curam.widget.Menu.created",[this.id]));
this.connect(this,"onOpen",dojo.hitch(this,function(){
curam.debug.log(_98f.getProperty("curam.widget.Menu.opened",[this.id]));
curam.util.getTopmostWindow().dojo.publish(this._EVENT_OPENED,[this.id]);
this._markAsActive(true);
}));
var _990=curam.util.getTopmostWindow().dojo.subscribe(this._EVENT_OPENED,this,function(_991){
curam.debug.log(_98f.getProperty("curam.widget.Menu.event",[this.id,this._amIActive?"active":"passive",_991]));
if(this.id!=_991&&this._amIActive){
curam.debug.log(_98f.getProperty("curam.widget.Menu.deactivate"));
this._markAsActive(false);
var _992=curam.util.getTopmostWindow().dojo.subscribe(this._EVENT_CLOSED,this,function(_993){
if(_993==_991){
curam.debug.log(_98f.getProperty("curam.widget.Menu.reactivate",[_991,this.id]));
dojo.unsubscribe(_992);
this._markAsActive(true);
}
});
}
});
this.connect(this,"onClose",dojo.hitch(this,function(){
curam.debug.log(_98f.getProperty("curam.widget.Menu.closing",[this.id]));
curam.util.getTopmostWindow().dojo.publish(this._EVENT_CLOSED,[this.id]);
this._markAsActive(false);
dojo.unsubscribe(_990);
}));
this.inherited(arguments);
},_markAsActive:function(_994){
if(_994){
curam.debug.log(_98f.getProperty("curam.widget.Menu.add.class"),this.id);
dojo.addClass(this.domNode,this._CSS_CLASS_ACTIVE_MENU);
}else{
curam.debug.log(_98f.getProperty("curam.widget.Menu.remove.class"),this.id);
dojo.removeClass(this.domNode,this._CSS_CLASS_ACTIVE_MENU);
}
this._amIActive=_994;
}});
return Menu;
});
},"dojo/dnd/move":function(){
define("dojo/dnd/move",["../main","./Mover","./Moveable"],function(dojo){
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){
},within:false,constructor:function(node,_995){
if(!_995){
_995={};
}
this.constraints=_995.constraints;
this.within=_995.within;
},onFirstMove:function(_996){
var c=this.constraintBox=this.constraints.call(this,_996);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(this.within){
var mb=dojo._getMarginSize(_996.node);
c.r-=mb.w;
c.b-=mb.h;
}
},onMove:function(_997,_998){
var c=this.constraintBox,s=_997.node.style;
this.onMoving(_997,_998);
_998.l=_998.l<c.l?c.l:c.r<_998.l?c.r:_998.l;
_998.t=_998.t<c.t?c.t:c.b<_998.t?c.b:_998.t;
s.left=_998.l+"px";
s.top=_998.t+"px";
this.onMoved(_997,_998);
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},constructor:function(node,_999){
var box=_999&&_999.box;
this.constraints=function(){
return box;
};
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",constructor:function(node,_99a){
var area=_99a&&_99a.area;
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
define("dijit/_WidgetBase",["require","dojo/_base/array","dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/ready","dojo/Stateful","dojo/topic","dojo/_base/window","./registry"],function(_99b,_99c,_99d,_99e,_99f,_9a0,dom,_9a1,_9a2,_9a3,_9a4,_9a5,_9a6,lang,on,_9a7,_9a8,_9a9,win,_9aa){
var _9ab=typeof (dojo.global.perf)!="undefined";
if(!_9a6.isAsync){
_9a7(0,function(){
var _9ac=["dijit/_base/manager"];
_99b(_9ac);
});
}
var _9ad={};
function _9ae(obj){
var ret={};
for(var attr in obj){
ret[attr.toLowerCase()]=true;
}
return ret;
};
function _9af(attr){
return function(val){
_9a1[val?"set":"remove"](this.domNode,attr,val);
this._set(attr,val);
};
};
return _9a0("dijit._WidgetBase",_9a8,{id:"",_setIdAttr:"domNode",lang:"",_setLangAttr:_9af("lang"),dir:"",_setDirAttr:_9af("dir"),textDir:"","class":"",_setClassAttr:{node:"domNode",type:"class"},style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{},_blankGif:_99e.blankGif||_99b.toUrl("dojo/resources/blank.gif"),postscript:function(_9b0,_9b1){
this.create(_9b0,_9b1);
},create:function(_9b2,_9b3){
if(_9ab){
perf.widgetStartedLoadingCallback();
}
this.srcNodeRef=dom.byId(_9b3);
this._connects=[];
this._supportingWidgets=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_9b2){
this.params=_9b2;
lang.mixin(this,_9b2);
}
this.postMixInProperties();
if(!this.id){
this.id=_9aa.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
_9aa.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _9b4=this.srcNodeRef;
if(_9b4&&_9b4.parentNode&&this.domNode!==_9b4){
_9b4.parentNode.replaceChild(this.domNode,_9b4);
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
if(_9ab){
perf.widgetLoadedCallback(this);
}
},_applyAttributes:function(){
var ctor=this.constructor,list=ctor._setterAttrs;
if(!list){
list=(ctor._setterAttrs=[]);
for(var attr in this.attributeMap){
list.push(attr);
}
var _9b5=ctor.prototype;
for(var _9b6 in _9b5){
if(_9b6 in this.attributeMap){
continue;
}
var _9b7="_set"+_9b6.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
})+"Attr";
if(_9b7 in _9b5){
list.push(_9b6);
}
}
}
_99c.forEach(list,function(attr){
if(this.params&&attr in this.params){
}else{
if(this[attr]){
this.set(attr,this[attr]);
}
}
},this);
for(var _9b8 in this.params){
this.set(_9b8,this[_9b8]);
}
},postMixInProperties:function(){
},buildRendering:function(){
if(!this.domNode){
this.domNode=this.srcNodeRef||_9a3.create("div");
}
if(this.baseClass){
var _9b9=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_9b9=_9b9.concat(_99c.map(_9b9,function(name){
return name+"Rtl";
}));
}
_9a2.add(this.domNode,_9b9);
}
},postCreate:function(){
},startup:function(){
if(this._started){
return;
}
this._started=true;
_99c.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
},destroyRecursive:function(_9ba){
this._beingDestroyed=true;
this.destroyDescendants(_9ba);
this.destroy(_9ba);
},destroy:function(_9bb){
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
this.destroyRendering(_9bb);
_9aa.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_9bc){
if(this.bgIframe){
this.bgIframe.destroy(_9bc);
delete this.bgIframe;
}
if(this.domNode){
if(_9bc){
_9a1.remove(this.domNode,"widgetId");
}else{
_9a3.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_9bc){
_9a3.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_9bd){
_99c.forEach(this.getChildren(),function(_9be){
if(_9be.destroyRecursive){
_9be.destroyRecursive(_9bd);
}
});
},uninitialize:function(){
return false;
},_setStyleAttr:function(_9bf){
var _9c0=this.domNode;
if(lang.isObject(_9bf)){
_9a5.set(_9c0,_9bf);
}else{
if(_9c0.style.cssText){
_9c0.style.cssText+="; "+_9bf;
}else{
_9c0.style.cssText=_9bf;
}
}
this._set("style",_9bf);
},_attrToDom:function(attr,_9c1,_9c2){
_9c2=arguments.length>=3?_9c2:this.attributeMap[attr];
_99c.forEach(lang.isArray(_9c2)?_9c2:[_9c2],function(_9c3){
var _9c4=this[_9c3.node||_9c3||"domNode"];
var type=_9c3.type||"attribute";
switch(type){
case "attribute":
if(lang.isFunction(_9c1)){
_9c1=lang.hitch(this,_9c1);
}
var _9c5=_9c3.attribute?_9c3.attribute:(/^on[A-Z][a-zA-Z]*$/.test(attr)?attr.toLowerCase():attr);
_9a1.set(_9c4,_9c5,_9c1);
break;
case "innerText":
_9c4.innerHTML="";
_9c4.appendChild(win.doc.createTextNode(_9c1));
break;
case "innerHTML":
_9c4.innerHTML=_9c1;
break;
case "class":
_9a2.replace(_9c4,_9c1,this[attr]);
break;
}
},this);
},get:function(name){
var _9c6=this._getAttrNames(name);
return this[_9c6.g]?this[_9c6.g]():this[name];
},set:function(name,_9c7){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _9c8=this._getAttrNames(name),_9c9=this[_9c8.s];
if(lang.isFunction(_9c9)){
var _9ca=_9c9.apply(this,Array.prototype.slice.call(arguments,1));
}else{
var _9cb=this.focusNode&&!lang.isFunction(this.focusNode)?"focusNode":"domNode",tag=this[_9cb].tagName,_9cc=_9ad[tag]||(_9ad[tag]=_9ae(this[_9cb])),map=name in this.attributeMap?this.attributeMap[name]:_9c8.s in this?this[_9c8.s]:((_9c8.l in _9cc&&typeof _9c7!="function")||/^aria-|^data-|^role$/.test(name))?_9cb:null;
if(map!=null){
this._attrToDom(name,_9c7,map);
}
this._set(name,_9c7);
}
return _9ca||this;
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
});
return (apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr",l:uc.toLowerCase()});
},_set:function(name,_9cd){
var _9ce=this[name];
this[name]=_9cd;
if(this._watchCallbacks&&this._created&&_9cd!==_9ce){
this._watchCallbacks(name,_9ce,_9cd);
}
},on:function(type,func){
return _99d.after(this,this._onMap(type),func,true);
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
return this.containerNode?_9aa.findWidgets(this.containerNode):[];
},getParent:function(){
return _9aa.getEnclosingWidget(this.domNode.parentNode);
},connect:function(obj,_9cf,_9d0){
var _9d1=_99f.connect(obj,_9cf,this,_9d0);
this._connects.push(_9d1);
return _9d1;
},disconnect:function(_9d2){
var i=_99c.indexOf(this._connects,_9d2);
if(i!=-1){
_9d2.remove();
this._connects.splice(i,1);
}
},subscribe:function(t,_9d3){
var _9d4=_9a9.subscribe(t,lang.hitch(this,_9d3));
this._connects.push(_9d4);
return _9d4;
},unsubscribe:function(_9d5){
this.disconnect(_9d5);
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):_9a4.isBodyLtr();
},isFocusable:function(){
return this.focus&&(_9a5.get(this.domNode,"display")!="none");
},placeAt:function(_9d6,_9d7){
if(_9d6.declaredClass&&_9d6.addChild){
_9d6.addChild(this,_9d7);
}else{
_9a3.place(this.domNode,_9d6,_9d7);
}
return this;
},getTextDir:function(text,_9d8){
return _9d8;
},applyTextDir:function(){
},defer:function(fcn,_9d9){
var _9da=setTimeout(lang.hitch(this,function(){
_9da=null;
if(!this._destroyed){
lang.hitch(this,fcn)();
}
}),_9d9||0);
return {remove:function(){
if(_9da){
clearTimeout(_9da);
_9da=null;
}
return null;
}};
}});
});
},"dijit/layout/_TabContainerBase":function(){
require({cache:{"url:dijit/layout/templates/TabContainer.html":"<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" data-dojo-attach-point=\"containerNode\"></div>\n</div>\n"}});
define("dijit/layout/_TabContainerBase",["dojo/text!./templates/TabContainer.html","./StackContainer","./utils","../_TemplatedMixin","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style"],function(_9db,_9dc,_9dd,_9de,_9df,_9e0,_9e1,_9e2){
return _9df("dijit.layout._TabContainerBase",[_9dc,_9de],{tabPosition:"top",baseClass:"dijitTabContainer",tabStrip:false,nested:false,templateString:_9db,postMixInProperties:function(){
this.baseClass+=this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"");
this.srcNodeRef&&_9e2.set(this.srcNodeRef,"visibility","hidden");
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.tablist=this._makeController(this.tablistNode);
if(!this.doLayout){
_9e0.add(this.domNode,"dijitTabContainerNoLayout");
}
if(this.nested){
_9e0.add(this.domNode,"dijitTabContainerNested");
_9e0.add(this.tablist.containerNode,"dijitTabContainerTabListNested");
_9e0.add(this.tablistSpacer,"dijitTabContainerSpacerNested");
_9e0.add(this.containerNode,"dijitTabPaneWrapperNested");
}else{
_9e0.add(this.domNode,"tabStrip-"+(this.tabStrip?"enabled":"disabled"));
}
},_setupChild:function(tab){
_9e0.add(tab.domNode,"dijitTabPane");
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
var _9e3=this.tabPosition.replace(/-h/,"");
this.tablist.layoutAlign=_9e3;
var _9e4=[this.tablist,{domNode:this.tablistSpacer,layoutAlign:_9e3},{domNode:this.containerNode,layoutAlign:"client"}];
_9dd.layoutChildren(this.domNode,this._contentBox,_9e4);
this._containerContentBox=_9dd.marginBox2contentBox(this.containerNode,_9e4[2]);
if(sc&&sc.resize){
sc.resize(this._containerContentBox);
}
}else{
if(this.tablist.resize){
var s=this.tablist.domNode.style;
s.width="0";
var _9e5=_9e1.getContentBox(this.domNode).w;
s.width="";
this.tablist.resize({w:_9e5});
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
define("curam/util/Refresh",["curam/util/Request","curam/define","curam/util","curam/tab","curam/debug","curam/util/ContextPanel","curam/util/ui/refresh/TabRefreshController","curam/util/ResourceBundle"],function(_9e6){
dojo.requireLocalization("curam.application","Debug");
var _9e7=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.Refresh",{submitted:false,pageSubmitted:"",refreshConfig:[],menuBarCallback:null,navigationCallback:null,refreshedOnTabOpen:{},_controllers:{},_pageRefreshButton:undefined,setMenuBarCallbacks:function(_9e8,_9e9){
if(!curam.util.Refresh.menuBarCallback){
curam.util.Refresh.menuBarCallback={updateMenuItemStates:_9e8,getRefreshParams:_9e9};
}
},setNavigationCallbacks:function(_9ea,_9eb){
if(!curam.util.Refresh.navigationCallback){
curam.util.Refresh.navigationCallback={updateNavItemStates:_9ea,getRefreshParams:_9eb};
}
},refreshMenuAndNavigation:function(_9ec,_9ed,_9ee,_9ef){
curam.debug.log("curam.util.Refresh.refreshMenuAndNavigation: "+"tabWidgetId=%s, refreshMenuBar || refreshNavigation: %s || %s",_9ec,_9ed,_9ee);
if(_9ef&&curam.util.Refresh.refreshedOnTabOpen[_9ec]){
curam.debug.log(_9e7.getProperty("curam.util.Refresh.stop"));
return;
}else{
if(_9ef&&!curam.util.Refresh.refreshedOnTabOpen[_9ec]){
curam.debug.log(_9e7.getProperty("curam.util.Refresh.tab.open"));
curam.util.Refresh.refreshedOnTabOpen[_9ec]=true;
}else{
curam.debug.log(_9e7.getProperty("curam.util.Refresh.detect.refresh"));
curam.debug.log(_9e7.getProperty("curam.util.Refresh.refresh"));
}
}
if(!_9ed&&!_9ee){
curam.debug.log(_9e7.getProperty("curam.util.Refresh.no.refresh"));
curam.util.Refresh.refreshedOnTabOpen[_9ec]=false;
return;
}
var _9f0={update:function(_9f1,_9f2,_9f3){
curam.debug.log(_9e7.getProperty("curam.util.Refresh.dynamic.refresh"),_9f2);
var ncb=curam.util.Refresh.navigationCallback;
curam.debug.log("refreshNavigation? ",_9ee);
if(_9ee&&_9f2.navData&&ncb){
ncb.updateNavItemStates(_9f1,_9f2);
}
var mcb=curam.util.Refresh.menuBarCallback;
curam.debug.log("refreshMenuBar? ",_9ed);
if(_9ed&&_9f2.menuData&&mcb){
mcb.updateMenuItemStates(_9f1,_9f2);
}
},error:function(_9f4,_9f5){
curam.debug.log("========= "+_9e7.getProperty("curam.util.Refresh.dynamic.failure")+" ===========");
curam.debug.log(_9e7.getProperty("curam.util.Refresh.dynamic.error"),_9f4);
curam.debug.log(_9e7.getProperty("curam.util.Refresh.dynamic.args"),_9f5);
curam.debug.log("==================================================");
}};
var _9f6="servlet/JSONServlet?o3c=TAB_DYNAMIC_STATE_QUERY";
var mcb=curam.util.Refresh.menuBarCallback;
if(_9ed&&mcb){
var _9f7=mcb.getRefreshParams(_9ec);
if(_9f7){
_9f6+="&"+_9f7;
}
}
var ncb=curam.util.Refresh.navigationCallback;
if(_9ee&&ncb){
var _9f8=ncb.getRefreshParams(_9ec);
if(_9f8){
_9f6+="&"+_9f8;
}
}
curam.debug.log(_9e7.getProperty("curam.util.Refresh.dynamic.refresh.req"));
_9e6.post({url:_9f6,handleAs:"json",preventCache:true,load:dojo.hitch(_9f0,"update",_9ec),error:dojo.hitch(_9f0,"error")});
},addConfig:function(_9f9){
var _9fa=false;
dojo.forEach(curam.util.Refresh.refreshConfig,function(_9fb){
if(_9fb.tab==_9f9.tab){
_9fb.config=_9f9.config;
_9fa=true;
}
});
if(!_9fa){
curam.util.Refresh.refreshConfig.push(_9f9);
}
},setupRefreshController:function(_9fc){
curam.debug.log("curam.util.Refresh.setupRefreshController "+_9e7.getProperty("curam.util.ExpandableLists.load.for"),_9fc);
var _9fd=dijit.byId(_9fc);
var _9fe=_9fd.tabDescriptor.tabID;
var _9ff=dojo.filter(curam.util.Refresh.refreshConfig,function(item){
return item.tab==_9fe;
});
if(_9ff.length==1){
var _a00=_9ff[0];
var ctl=new curam.util.ui.refresh.TabRefreshController(_9fc,_a00);
curam.util.Refresh._controllers[_9fc]=ctl;
ctl.setRefreshHandler(curam.util.Refresh.handleRefreshEvent);
}else{
if(_9ff.length==0){
curam.debug.log(_9e7.getProperty("curam.util.Refresh.no.dynamic.refresh"),_9fc);
var ctl=new curam.util.ui.refresh.TabRefreshController(_9fc,null);
curam.util.Refresh._controllers[_9fc]=ctl;
}else{
throw "curam.util.Refresh: multiple dynamic refresh "+"configurations found for tab "+_9fc;
}
}
curam.tab.executeOnTabClose(function(){
curam.util.Refresh._controllers[_9fc].destroy();
curam.util.Refresh._controllers[_9fc]=undefined;
},_9fc);
},getController:function(_a01){
var ctl=curam.util.Refresh._controllers[_a01];
if(!ctl){
throw "Refresh controller for tab '"+_a01+"' not found!";
}
return ctl;
},handleOnloadNestedInlinePage:function(_a02,_a03){
curam.debug.log("curam.util.Refresh.handleOnloadNestedInlinePage "+_9e7.getProperty("curam.util.Refresh.iframe",[_a02,_a03]));
var _a04=curam.util.getTopmostWindow();
var _a05=undefined;
var _a06=curam.tab.getSelectedTab();
if(_a06){
_a05=curam.tab.getTabWidgetId(_a06);
}
if(_a05){
curam.debug.log(_9e7.getProperty("curam.util.Refresh.parent"),_a05);
_a04.curam.util.Refresh.getController(_a05).pageLoaded(_a03.pageID,curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_INLINE);
_a04.dojo.publish("/curam/main-content/page/loaded",[_a03.pageID,_a05]);
return true;
}
return false;
},handleRefreshEvent:function(_a07){
var _a08=function(_a09){
curam.util.ContextPanel.refresh(dijit.byId(_a09));
};
var _a0a=function(_a0b){
curam.tab.refreshMainContentPanel(dijit.byId(_a0b));
};
var _a0c=function(_a0d,_a0e,_a0f){
curam.util.Refresh.refreshMenuAndNavigation(_a0d,_a0e,_a0f);
};
curam.util.Refresh._doRefresh(_a07,_a08,_a0a,_a0c);
},_doRefresh:function(_a10,_a11,_a12,_a13){
var _a14=null;
var _a15=false;
var _a16=false;
var _a17=false;
var _a18=false;
var trc=curam.util.ui.refresh.TabRefreshController.prototype;
dojo.forEach(_a10,function(_a19){
var _a1a=_a19.lastIndexOf("/");
var _a1b=_a19.slice(0,_a1a);
if(!_a14){
_a14=_a19.slice(_a1a+1,_a19.length);
}
if(_a1b==trc.EVENT_REFRESH_MENU){
_a15=true;
}
if(_a1b==trc.EVENT_REFRESH_NAVIGATION){
_a16=true;
}
if(_a1b==trc.EVENT_REFRESH_CONTEXT){
_a17=true;
}
if(_a1b==trc.EVENT_REFRESH_MAIN){
_a18=true;
}
});
if(_a17){
_a11(_a14);
}
if(_a18){
_a12(_a14);
}
_a13(_a14,_a15,_a16);
},setupRefreshButton:function(_a1c){
dojo.ready(function(){
var _a1d=dojo.query("."+_a1c)[0];
if(!_a1d){
throw "Refresh button not found: "+_a1c;
}
curam.util.Refresh._pageRefreshButton=_a1d;
var href=window.location.href;
if(curam.util.isActionPage(href)){
dojo.addClass(_a1d,"disabled");
curam.util.Refresh._pageRefreshButton._curamDisable=true;
}else{
dojo.addClass(_a1d,"enabled");
curam.util.Refresh._pageRefreshButton["_curamDisable"]=undefined;
}
curam.util.getTopmostWindow().curam.util.setupPreferencesLink(href);
});
},refreshPage:function(_a1e){
dojo.stopEvent(_a1e);
var href=window.location.href;
var _a1f=curam.util.Refresh._pageRefreshButton._curamDisable;
if(_a1f){
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
var _a20=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.ContextPanel",{CONTENT_URL_ATTRIB:"data-content-url",setupLoadEventPublisher:function(_a21,_a22,_a23){
curam.util.ContextPanel._doSetup(_a21,_a22,_a23,function(_a24){
return dijit.byId(_a24);
});
},_doSetup:function(_a25,_a26,_a27,_a28){
var _a29=curam.util.getTopmostWindow().dojo.subscribe(_a25,function(){
var tab=_a28(_a26);
var _a2a=curam.util.ContextPanel._getIframe(tab);
curam.debug.log(_a20.getProperty("curam.util.ContextPanel.loaded"));
curam.util.getTopmostWindow().dojo.publish("/curam/frame/detailsPanelLoaded",[{loaded:true},_a26]);
_a2a._finishedLoading=true;
if(_a2a._scheduledRefresh){
curam.util.ContextPanel.refresh(tab);
_a2a._scheduledRefresh=false;
}
});
curam.util.onLoad.addSubscriber(_a27,curam.util.ContextPanel.addTitle);
curam.tab.unsubscribeOnTabClose(_a29,_a26);
curam.tab.executeOnTabClose(function(){
curam.util.onLoad.removeSubscriber(_a27,curam.util.ContextPanel.addTitle);
},_a26);
},refresh:function(tab){
var _a2b=curam.util.ContextPanel._getIframe(tab);
if(_a2b){
curam.debug.log(_a20.getProperty("curam.util.ContextPanel.refresh.prep"));
if(_a2b._finishedLoading){
curam.debug.log(_a20.getProperty("curam.util.ContextPanel.refresh"));
_a2b._finishedLoading=false;
var doc=_a2b.contentDocument||_a2b.contentWindow.document;
doc.location.reload(true);
}else{
curam.debug.log(_a20.getProperty("curam.util.ContextPanel.refresh.delay"));
_a2b._scheduledRefresh=true;
}
}
},_getIframe:function(tab){
var _a2c=dojo.query("iframe.detailsPanelFrame",tab.domNode);
return _a2c[0];
},addTitle:function(_a2d){
var _a2e=dojo.query("."+_a2d)[0];
var _a2f=_a2e.contentWindow.document.title;
_a2e.setAttribute("title",CONTEXT_PANEL_TITLE+" - "+_a2f);
},load:function(tab){
var _a30=curam.util.ContextPanel._getIframe(tab);
if(_a30){
var _a31=dojo.attr(_a30,curam.util.ContextPanel.CONTENT_URL_ATTRIB);
if(_a31&&_a31!="undefined"){
_a30[curam.util.ContextPanel.CONTENT_URL_ATTRIB]=undefined;
dojo.attr(_a30,"src",_a31);
}
}
}});
var _a32=curam.util.getTopmostWindow();
if(typeof _a32._curamContextPanelTabReadyListenerRegistered!="boolean"){
_a32.dojo.subscribe("/curam/application/tab/ready",null,function(_a33){
curam.util.ContextPanel.load(_a33);
});
_a32._curamContextPanelTabReadyListenerRegistered=true;
}
return curam.util.ContextPanel;
});
},"curam/util":function(){
define("curam/util",["dojo/dom","dijit/registry","dojo/dom-construct","dojo/ready","dojo/_base/window","dojo/dom-style","dojo/_base/array","dojo/dom-class","dojo/topic","dojo/_base/event","dojo/query","dojo/has","dojo/_base/unload","dojo/dom-geometry","dojo/_base/json","dojo/dom-attr","dojo/_base/lang","dojo/on","dijit/_BidiSupport","curam/define","curam/debug","curam/util/RuntimeContext","curam/util/Constants","dojo/_base/sniff","cm/_base/_dom","curam/util/ResourceBundle"],function(dom,_a34,_a35,_a36,_a37,_a38,_a39,_a3a,_a3b,_a3c,_a3d,has,_a3e,geom,json,attr,lang,on,bidi){
dojo.requireLocalization("curam.application","Debug");
var _a3f=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util",{PREVENT_CACHE_FLAG:"o3pc",INFORMATIONAL_MSGS_STORAGE_ID:"__informationals__",ERROR_MESSAGES_CONTAINER:"error-messages-container",ERROR_MESSAGES_LIST:"error-messages",CACHE_BUSTER:0,CACHE_BUSTER_PARAM_NAME:"o3nocache",msgLocaleSelectorActionPage:"$not-locaized$ Usage of the Language Selector is not permitted from an editable page that has previously been submitted.",insertCssText:function(_a40,_a41){
var id=_a41?_a41:"_runtime_stylesheet_";
var _a42=dom.byId(id);
var _a43;
if(_a42){
if(_a42.styleSheet){
_a40=_a42.styleSheet.cssText+_a40;
_a43=_a42;
_a43.setAttribute("id","_nodeToRm");
}else{
_a42.appendChild(document.createTextNode(_a40));
return;
}
}
var pa=document.getElementsByTagName("head")[0];
_a42=_a35.create("style",{type:"text/css",id:id});
if(_a42.styleSheet){
_a42.styleSheet.cssText=_a40;
}else{
_a42.appendChild(document.createTextNode(_a40));
}
pa.appendChild(_a42);
if(_a43){
_a43.parentNode.removeChild(_a43);
}
},fireRefreshTreeEvent:function(){
if(dojo.global.parent&&dojo.global.parent.amIFrame){
var wpl=dojo.global.parent.loader;
}
if(wpl&&wpl.dojo){
wpl.dojo.publish("refreshTree");
}
},firePageSubmittedEvent:function(_a44){
require(["curam/tab"],function(){
var _a45=curam.tab.getSelectedTab();
if(_a45){
var _a46=curam.tab.getTabWidgetId(_a45);
var _a47=curam.util.getTopmostWindow();
var ctx=(_a44=="dialog")?curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_DIALOG:curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN;
_a47.curam.util.Refresh.getController(_a46).pageSubmitted(dojo.global.jsPageID,ctx);
_a47.dojo.publish("/curam/main-content/page/submitted",[dojo.global.jsPageID,_a46]);
}else{
curam.debug.log("/curam/main-content/page/submitted: "+_a3f.getProperty("curam.util.no.open"));
}
});
},fireTabOpenedEvent:function(_a48){
curam.util.getTopmostWindow().dojo.publish("curam.tabOpened",[dojo.global.jsPageID,_a48]);
},setupSubmitEventPublisher:function(){
_a36(function(){
var form=dom.byId("mainForm");
if(form){
curam.util.connect(form,"onsubmit",function(){
curam.util.firePageSubmittedEvent("main-content");
});
}
});
},getScrollbar:function(){
var _a49=_a35.create("div",{},_a37.body());
_a38.set(_a49,{width:"100px",height:"100px",overflow:"scroll",position:"absolute",top:"-300px",left:"0px"});
var test=_a35.create("div",{},_a49);
_a38.set(test,{width:"400px",height:"400px"});
var _a4a=_a49.offsetWidth-_a49.clientWidth;
_a35.destroy(_a49);
return {width:_a4a};
},isModalWindow:function(){
return (dojo.global.curamModal===undefined)?false:true;
},getTopmostWindow:function(){
if(typeof (dojo.global._curamTopmostWindow)=="undefined"){
var _a4b=dojo.global;
if(typeof (dojo.global.jsScreenContext)!="undefined"&&dojo.global.jsScreenContext.hasContextBits("CONTEXT_PORTLET")){
dojo.global._curamTopmostWindow=_a4b;
}else{
if(_a4b.__extAppTopWin){
dojo.global._curamTopmostWindow=_a4b;
}else{
while(_a4b.parent!=_a4b){
_a4b=_a4b.parent;
if(_a4b.__extAppTopWin){
break;
}
}
dojo.global._curamTopmostWindow=_a4b;
}
}
}
if(dojo.global._curamTopmostWindow.location.href.indexOf("AppController.do")<0&&typeof (dojo.global._curamTopmostWindow.__extAppTopWin)=="undefined"){
curam.debug.log(_a3f.getProperty("curam.util.wrong.window")+dojo.global._curamTopmostWindow.location.href);
}
return dojo.global._curamTopmostWindow;
},getUrlParamValue:function(url,_a4c){
var qPos=url.indexOf("?");
if(qPos<0){
return null;
}
var _a4d=url.substring(qPos+1,url.length);
function _a4e(_a4f){
var _a50=_a4d.split(_a4f);
_a4c+="=";
for(var i=0;i<_a50.length;i++){
if(_a50[i].indexOf(_a4c)==0){
return _a50[i].split("=")[1];
}
}
};
return _a4e("&")||_a4e("");
},addUrlParam:function(href,_a51,_a52,_a53){
var hasQ=href.indexOf("?")>-1;
var _a54=_a53?_a53:"undefined";
if(!hasQ||(_a54==false)){
return href+(hasQ?"&":"?")+_a51+"="+_a52;
}else{
var _a55=href.split("?");
href=_a55[0]+"?"+_a51+"="+_a52+(_a55[1]!=""?("&"+_a55[1]):"");
return href;
}
},replaceUrlParam:function(href,_a56,_a57){
href=curam.util.removeUrlParam(href,_a56);
return curam.util.addUrlParam(href,_a56,_a57);
},removeUrlParam:function(url,_a58,_a59){
var qPos=url.indexOf("?");
if(qPos<0){
return url;
}
if(url.indexOf(_a58+"=")<0){
return url;
}
var _a5a=url.substring(qPos+1,url.length);
var _a5b=_a5a.split("&");
var _a5c;
var _a5d,_a5e;
for(var i=0;i<_a5b.length;i++){
if(_a5b[i].indexOf(_a58+"=")==0){
_a5e=false;
if(_a59){
_a5d=_a5b[i].split("=");
if(_a5d.length>1){
if(_a5d[1]==_a59){
_a5e=true;
}
}else{
if(_a59==""){
_a5e=true;
}
}
}else{
_a5e=true;
}
if(_a5e){
_a5b.splice(i,1);
i--;
}
}
}
return url.substring(0,qPos+1)+_a5b.join("&");
},stripHash:function(url){
var idx=url.indexOf("#");
if(idx<0){
return url;
}
return url.substring(0,url);
},isSameUrl:function(_a5f,_a60,rtc){
if(!_a60){
_a60=rtc.getHref();
}
if(_a5f.indexOf("#")==0){
return true;
}
var _a61=_a5f.indexOf("#");
if(_a61>-1){
if(_a61==0){
return true;
}
var _a62=_a5f.split("#");
var _a63=_a60.indexOf("#");
if(_a63>-1){
if(_a63==0){
return true;
}
_a60=_a60.split("#")[0];
}
return _a62[0]==_a60;
}
var _a64=function(url){
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
var here=curam.util.stripHash(rp(_a60,curam.util.Constants.RETURN_PAGE_PARAM));
var _a65=curam.util.stripHash(rp(_a5f,curam.util.Constants.RETURN_PAGE_PARAM));
var _a66=_a65.split("?");
var _a67=here.split("?");
_a67[0]=_a64(_a67[0]);
_a66[0]=_a64(_a66[0]);
var _a68=(_a67[0]==_a66[0]||_a67[0].match(_a66[0]+"$")==_a66[0]);
if(!_a68){
return false;
}
if(_a67.length==1&&_a66.length==1&&_a68){
return true;
}else{
var _a69;
var _a6a;
if(typeof _a67[1]!="undefined"&&_a67[1]!=""){
_a69=_a67[1].split("&");
}else{
_a69=new Array();
}
if(typeof _a66[1]!="undefined"&&_a66[1]!=""){
_a6a=_a66[1].split("&");
}else{
_a6a=new Array();
}
curam.debug.log("curam.util.isSameUrl: paramsHere "+_a3f.getProperty("curam.util.before")+_a69.length);
_a69=_a39.filter(_a69,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_a3f.getProperty("curam.util.after")+_a69.length);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_a3f.getProperty("curam.util.before")+_a6a.length);
_a6a=_a39.filter(_a6a,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_a3f.getProperty("curam.util.after")+_a6a.length);
if(_a69.length!=_a6a.length){
return false;
}
var _a6b={};
var _a6c;
for(var i=0;i<_a69.length;i++){
_a6c=_a69[i].split("=");
_a6b[_a6c[0]]=_a6c[1];
}
for(var i=0;i<_a6a.length;i++){
_a6c=_a6a[i].split("=");
if(_a6b[_a6c[0]]!=_a6c[1]){
curam.debug.log(_a3f.getProperty("curam.util.no.match",[_a6c[0],_a6c[1],_a6b[_a6c[0]]]));
return false;
}
}
}
return true;
},isNotCDEJParam:function(_a6d){
return !((_a6d.charAt(0)=="o"&&_a6d.charAt(1)=="3")||(_a6d.charAt(0)=="_"&&_a6d.charAt(1)=="_"&&_a6d.charAt(2)=="o"&&_a6d.charAt(3)=="3"));
},setAttributes:function(node,map){
for(var x in map){
node.setAttribute(x,map[x]);
}
},invalidatePage:function(){
curam.PAGE_INVALIDATED=true;
var _a6e=dojo.global.dialogArguments?dojo.global.dialogArguments[0]:opener;
if(_a6e&&_a6e!=dojo.global){
try{
_a6e.curam.util.invalidatePage();
}
catch(e){
curam.debug.log(_a3f.getProperty("curam.util.error"),e);
}
}
},redirectWindow:function(href,_a6f,_a70){
var rtc=new curam.util.RuntimeContext(dojo.global);
var _a71=function(_a72,_a73,href,_a74,_a75){
curam.util.getFrameRoot(_a72,_a73).curam.util.redirectContentPanel(href,_a74,_a75);
};
curam.util._doRedirectWindow(href,_a6f,_a70,dojo.global.jsScreenContext,rtc,curam.util.publishRefreshEvent,_a71);
},_doRedirectWindow:function(href,_a76,_a77,_a78,rtc,_a79,_a7a){
if(href&&curam.util.isActionPage(href)){
curam.debug.log(_a3f.getProperty("curam.util.stopping"),href);
return;
}
var rpl=curam.util.replaceUrlParam;
var _a7b=_a78.hasContextBits("TREE")||_a78.hasContextBits("AGENDA")||_a78.hasContextBits("ORG_TREE");
if(curam.util.FORCE_REFRESH){
href=rpl(rtc.getHref(),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
if(curam.util.isModalWindow()||_a7b){
_a79();
dojo.global.location.href=href;
}else{
if(_a78.hasContextBits("LIST_ROW_INLINE_PAGE")||_a78.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(href);
}else{
_a79();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
require(["curam/tab"],function(){
_a7a(dojo.global,curam.tab.getTabController().ROOT_OBJ,href,true,true);
});
}
}
}
return;
}
var u=curam.util;
var rtc=new curam.util.RuntimeContext(dojo.global);
if(!_a7b&&!_a76&&!curam.PAGE_INVALIDATED&&u.isSameUrl(href,null,rtc)){
return;
}
if(curam.util.isModalWindow()||_a7b){
href=rpl(rpl(href,"o3frame","modal"),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
var form=_a35.create("form",{action:href,method:"POST"});
if(!_a7b){
if(!dom.byId("o3ctx")){
form.action=curam.util.removeUrlParam(form.action,"o3ctx");
var _a7c=_a35.create("input",{type:"hidden",id:"o3ctx",name:"o3ctx",value:_a78.getValue()},form);
}
_a37.body().appendChild(form);
_a79();
form.submit();
}
if(!_a77){
if(_a7b){
curam.util.redirectFrame(href);
}
}
}else{
if(_a78.hasContextBits("LIST_ROW_INLINE_PAGE")||_a78.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(href);
}else{
_a79();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
if(_a78.hasContextBits("EXTAPP")){
var _a7d=window.top;
_a7d.dijit.byId("curam-app").updateMainContentIframe(href);
}else{
require(["curam/tab"],function(){
curam.util.getFrameRoot(dojo.global,curam.tab.getTabController().ROOT_OBJ).curam.util.redirectContentPanel(href,_a76);
});
}
}
}
}
},_handleInlinePageRefresh:function(href){
curam.debug.log(_a3f.getProperty("curam.util.closing.modal"),href);
var _a7e=new curam.ui.PageRequest(href);
require(["curam/tab"],function(){
curam.tab.getTabController().checkPage(_a7e,function(_a7f){
curam.util.publishRefreshEvent();
dojo.global.location.reload(true);
});
});
},redirectContentPanel:function(url,_a80,_a81){
require(["curam/tab"],function(){
var _a82=curam.tab.getContentPanelIframe();
var _a83=url;
if(_a82!=null){
var rpu=curam.util.Constants.RETURN_PAGE_PARAM;
var _a84=null;
if(url.indexOf(rpu+"=")>=0){
curam.debug.log("curam.util.redirectContentPanel: "+_a3f.getProperty("curam.util.rpu"));
_a84=decodeURIComponent(curam.util.getUrlParamValue(url,rpu));
}
if(_a84){
_a84=curam.util.removeUrlParam(_a84,rpu);
_a83=curam.util.replaceUrlParam(url,rpu,encodeURIComponent(_a84));
}
}
var _a85=new curam.ui.PageRequest(_a83);
if(_a80){
_a85.forceLoad=true;
}
if(_a81){
_a85.justRefresh=true;
}
curam.tab.getTabController().handlePageRequest(_a85);
});
},redirectFrame:function(href){
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
var _a86=curam.util.getFrameRoot(dojo.global,"wizard").targetframe;
_a86.curam.util.publishRefreshEvent();
_a86.location.href=href;
}else{
if(dojo.global.jsScreenContext.hasContextBits("ORG_TREE")){
var _a86=curam.util.getFrameRoot(dojo.global,"orgTreeRoot");
_a86.curam.util.publishRefreshEvent();
_a86.dojo.publish("orgTree.refreshContent",[href]);
}else{
var _a87=curam.util.getFrameRoot(dojo.global,"iegtree");
var _a88=_a87.navframe||_a87.frames[0];
var _a89=_a87.contentframe||_a87.frames["contentframe"];
_a89.curam.util.publishRefreshEvent();
if(curam.PAGE_INVALIDATED||_a88.curam.PAGE_INVALIDATED){
var _a8a=curam.util.modifyUrlContext(href,"ACTION");
_a89.location.href=_a8a;
}else{
_a89.location.href=href;
}
}
}
return true;
},publishRefreshEvent:function(){
_a3b.publish("/curam/page/refresh");
},openGenericErrorModalDialog:function(_a8b,_a8c,_a8d,_a8e,_a8f){
var url;
var _a90;
var sc=new curam.util.ScreenContext("MODAL");
var _a91="titlePropertyName="+_a8c+"&";
var _a92="messagePropertyName="+_a8d+"&";
var _a93="errorModal="+_a8f+"&";
if(_a8e){
_a90="messagePlaceholder1="+_a8e+"&";
url="generic-modal-error.jspx?"+_a91+_a92+_a90+_a93+sc.toRequestString();
}else{
url="generic-modal-error.jspx?"+_a91+_a92+sc.toRequestString();
}
curam.util.openModalDialog({href:url},_a8b);
},openModalDialog:function(_a94,_a95,left,top,_a96){
var href;
if(!_a94||!_a94.href){
_a94=_a3c.fix(_a94);
var _a97=_a94.target;
while(_a97.tagName!="A"&&_a97!=_a37.body()){
_a97=_a97.parentNode;
}
href=_a97.href;
_a97._isModal=true;
_a3c.stop(_a94);
}else{
href=_a94.href;
_a94._isModal=true;
}
require(["curam/dialog"]);
var opts=curam.dialog.parseWindowOptions(_a95);
curam.util.showModalDialog(href,_a94,opts["width"],opts["height"],left,top,false,null,null,_a96);
return false;
},showModalDialog:function(url,_a98,_a99,_a9a,left,top,_a9b,_a9c,_a9d,_a9e){
var _a9f=curam.util.getTopmostWindow();
if(dojo.global!=_a9f){
curam.debug.log("curam.util.showModalDialog: "+_a3f.getProperty("curam.util.redirecting.modal"));
_a9f.curam.util.showModalDialog(url,_a98,_a99,_a9a,left,top,_a9b,_a9c,dojo.global,_a9e);
return;
}
var rup=curam.util.replaceUrlParam;
url=rup(url,"o3frame","modal");
url=curam.util.modifyUrlContext(url,"MODAL","TAB|LIST_ROW_INLINE_PAGE|LIST_EVEN_ROW|NESTED_UIM");
url=rup(url,curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
curam.debug.log(_a3f.getProperty("curam.util.modal.url"),url);
if(_a99){
_a99=typeof (_a99)=="number"?_a99:parseInt(_a99);
}
if(_a9a){
_a9a=typeof (_a9a)=="number"?_a9a:parseInt(_a9a);
}
if(!curam.util._isModalCurrentlyOpening()){
curam.util._setModalCurrentlyOpening(true);
require(["curam/ModalDialog"]);
new curam.ModalDialog({href:url,width:_a99,height:_a9a,openNode:(_a98&&_a98.target)?_a98.target:null,parentWindow:_a9d,uimToken:_a9e});
}
},_isModalCurrentlyOpening:function(){
return curam.util.getTopmostWindow().curam.util._modalOpenInProgress;
},_setModalCurrentlyOpening:function(_aa0){
curam.util.getTopmostWindow().curam.util._modalOpenInProgress=_aa0;
},setupPreferencesLink:function(href){
_a36(function(){
var _aa1=_a3d(".user-preferences")[0];
if(_aa1){
if(typeof (_aa1._disconnectToken)=="undefined"){
_aa1._disconnectToken=curam.util.connect(_aa1,"onclick",curam.util.openPreferences);
}
if(!href){
href=dojo.global.location.href;
}
if(curam.util.isActionPage(href)){
_a3a.replace(_aa1,"disabled","enabled");
_aa1._curamDisable=true;
}else{
_a3a.replace(_aa1,"enabled","disabled");
_aa1._curamDisable=false;
}
}else{
curam.debug.log(_a3f.getProperty("curam.util.no.setup"));
}
});
},openPreferences:function(_aa2){
_a3c.stop(_aa2);
if(_aa2.target._curamDisable){
return;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("user-prefs-editor.jspx",{dialogOptions:"width=450"});
});
},openAbout:function(_aa3){
_a3c.stop(_aa3);
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("about.jsp",{dialogOptions:"width=645,height=480"});
});
},addMinWidthCalendarCluster:function(id){
var _aa4=dom.byId(id);
var i=0;
function _aa5(evt){
_a39.forEach(_aa4.childNodes,function(node){
if(_a3a.contains(node,"cluster")){
_a38.set(node,"width","97%");
if(node.clientWidth<700){
_a38.set(node,"width","700px");
}
}
});
};
if(has("ie")>6){
_a39.forEach(_aa4.childNodes,function(node){
if(_a3a.contains(node,"cluster")){
_a38.set(node,"minWidth","700px");
}
});
}else{
on(dojo.global,"resize",_aa5);
_a36(_aa5);
}
},addPopupFieldListener:function(id){
if(!has("ie")||has("ie")>6){
return;
}
if(!curam.util._popupFields){
function _aa6(evt){
var _aa7=0;
var j=0;
var x=0;
var arr=curam.util._popupFields;
_a39.forEach(curam.util._popupFields,function(id){
var _aa8=dom.byId(id);
_a3d("> .popup-actions",_aa8).forEach(function(node){
_aa7=node.clientWidth+30;
});
_a3d("> .desc",_aa8).forEach(function(node){
_a38.set(node,"width",Math.max(0,_aa8.clientWidth-_aa7)+"px");
});
});
};
curam.util._popupFields=[id];
on(dojo.global,"resize",_aa6);
_a36(_aa6);
}else{
curam.util._popupFields.push(id);
}
},addContentWidthListener:function(id){
if(has("ie")>6){
return;
}
var _aa9=_a38.set;
var _aaa=_a3a.contains;
function _aab(evt){
var i=0;
var _aac=dom.byId("content");
if(_aac){
var _aad=_aac.clientWidth;
if(has("ie")==6&&dom.byId("footer")){
var _aae=_a37.body().clientHeight-100;
_aa9(_aac,"height",_aae+"px");
var _aaf=dom.byId("sidebar");
if(_aaf){
_aa9(_aaf,"height",_aae+"px");
}
}
try{
_a3d("> .page-title-bar",_aac).forEach(function(node){
var _ab0=geom.getMarginSize(node).w-geom.getContentBox(node).w;
if(!has("ie")){
_ab0+=1;
}
_aad=_aac.clientWidth-_ab0;
_a38.set(node,"width",_aad+"px");
});
}
catch(e){
}
_a3d("> .page-description",_aac).style("width",_aad+"px");
_a3d("> .in-page-navigation",_aac).style("width",_aad+"px");
}
};
curam.util.subscribe("/clusterToggle",_aab);
curam.util.connect(dojo.global,"onresize",_aab);
_a36(_aab);
},alterScrollableListBottomBorder:function(id,_ab1){
var _ab2=_ab1;
var _ab3="#"+id+" table";
function _ab4(){
var _ab5=_a3d(_ab3)[0];
if(_ab5.offsetHeight>=_ab2){
var _ab6=_a3d(".odd-last-row",_ab5)[0];
if(typeof _ab6!="undefined"){
_a3a.add(_ab6,"no-bottom-border");
}
}else{
if(_ab5.offsetHeight<_ab2){
var _ab6=_a3d(".even-last-row",_ab5)[0];
if(typeof _ab6!="undefined"){
_a3a.add(_ab6,"add-bottom-border");
}
}else{
curam.debug.log("curam.util.alterScrollableListBottomBorder: "+_a3f.getProperty("curam.util.code"));
}
}
};
_a36(_ab4);
},addFileUploadResizeListener:function(code){
function _ab7(evt){
if(_a3d(".widget")){
_a3d(".widget").forEach(function(_ab8){
var _ab9=_ab8.clientWidth;
if(_a3d(".fileUpload",_ab8)){
_a3d(".fileUpload",_ab8).forEach(function(_aba){
fileUploadWidth=_ab9/30;
if(fileUploadWidth<4){
_aba.size=1;
}else{
_aba.size=fileUploadWidth;
}
});
}
});
}
};
on(dojo.global,"resize",_ab7);
_a36(_ab7);
},openCenteredNonModalWindow:function(url,_abb,_abc,name){
_abb=Number(_abb);
_abc=Number(_abc);
var _abd=(screen.width-_abb)/2;
var _abe=(screen.height-_abc)/2;
_abc=_abe<0?screen.height:_abc;
_abe=Math.max(0,_abe);
_abb=_abd<0?screen.width:_abb;
_abd=Math.max(0,_abd);
var left="left",top="top";
if(has("ff")){
left="screenX",top="screenY";
}
var _abf="location=no, menubar=no, status=no, toolbar=no, "+"scrollbars=yes, resizable=no";
var _ac0=dojo.global.open(url,name||"name","width="+_abb+", height="+_abc+", "+left+"="+_abd+","+top+"="+_abe+","+_abf);
_ac0.resizeTo(_abb,_abc);
_ac0.moveTo(_abd,_abe);
_ac0.focus();
},adjustTargetContext:function(win,href){
if(win&&win.dojo.global.jsScreenContext){
var _ac1=win.dojo.global.jsScreenContext;
_ac1.updateStates(dojo.global.jsScreenContext);
return curam.util.replaceUrlParam(href,"o3ctx",_ac1.getValue());
}
return href;
},modifyUrlContext:function(url,_ac2,_ac3){
var _ac4=url;
var ctx=new curam.util.ScreenContext();
var _ac5=curam.util.getUrlParamValue(url,"o3ctx");
if(_ac5){
ctx.setContext(_ac5);
}else{
ctx.clear();
}
if(_ac2){
ctx.addContextBits(_ac2);
}
if(_ac3){
ctx.clear(_ac3);
}
_ac4=curam.util.replaceUrlParam(url,"o3ctx",ctx.getValue());
return _ac4;
},updateCtx:function(_ac6){
var _ac7=curam.util.getUrlParamValue(_ac6,"o3ctx");
if(!_ac7){
return _ac6;
}
return curam.util.modifyUrlContext(_ac6,null,"MODAL");
},getFrameRoot:function(_ac8,_ac9){
var _aca=false;
var _acb=_ac8;
if(_acb){
while(_acb!=top&&!_acb.rootObject){
_acb=_acb.parent;
}
if(_acb.rootObject){
_aca=(_acb.rootObject==_ac9);
}
}
return _aca?_acb:null;
},saveInformationalMsgs:function(_acc){
curam.util.runStorageFn(function(){
try{
var _acd=curam.util.getTopmostWindow().dojox;
_acd.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,json.toJson({pageID:_a37.body().id,total:dom.byId(curam.util.ERROR_MESSAGES_CONTAINER).innerHTML,listItems:dom.byId(curam.util.ERROR_MESSAGES_LIST).innerHTML}));
}
catch(e){
curam.debug.log(_a3f.getProperty("curam.util.exception"),e);
}
},_acc);
},runStorageFn:function(fn,_ace){
var _acf=function(){
fn();
if(_ace){
setTimeout(_ace,10);
}
};
var _ad0=curam.util.getTopmostWindow().dojox;
require(["dojox/storage"],function(){
var mgr=_ad0.storage.manager;
if(mgr.isInitialized()){
_acf();
}else{
if(mgr.addOnLoad){
mgr.addOnLoad(_acf);
}else{
var _ad1={exp:_acf};
on(mgr,"loaded",_ad1,"exp");
}
}
});
},disableInformationalLoad:function(){
curam.util._informationalsDisabled=true;
},redirectDirectUrl:function(){
_a36(function(){
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
_a36(function(){
if(dojo.global.jsScreenContext.hasContextBits("CONTEXT_PANEL")){
return;
}
if(curam.util._informationalsDisabled){
return;
}
curam.util.runStorageFn(function(){
var _ad2=curam.util.getTopmostWindow().dojox;
var msgs=_ad2.storage.get(curam.util.INFORMATIONAL_MSGS_STORAGE_ID);
if(msgs&&msgs!=""){
msgs=json.fromJson(msgs);
_ad2.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,"");
var div=dom.byId(curam.util.ERROR_MESSAGES_CONTAINER);
var list=dom.byId(curam.util.ERROR_MESSAGES_LIST);
if(msgs.pageID!=_a37.body().id){
return;
}
if(list){
var _ad3=_a35.create("ul",{innerHTML:msgs.listItems});
var _ad4=[];
for(var i=0;i<list.childNodes.length;i++){
if(list.childNodes[i].tagName=="LI"){
_ad4.push(list.childNodes[i]);
}
}
var skip=false;
var _ad5=_ad3.childNodes;
for(var i=0;i<_ad5.length;i++){
skip=false;
for(var j=0;j<_ad4.length;j++){
if(_ad5[i].innerHTML==_ad4[j].innerHTML){
skip=true;
break;
}
}
if(!skip){
list.appendChild(_ad5[i]);
i--;
}
}
}else{
if(div){
div.innerHTML=msgs.total;
}
}
}
var _ad6=dojo.byId("error-messages");
if(_ad6&&!dojo.global.jsScreenContext.hasContextBits("MODAL")){
_ad6.focus();
}
});
});
},setFocus:function(){
var _ad7=curam.util.getUrlParamValue(dojo.global.location.href,"o3frame")=="modal";
if(!_ad7){
_a36(curam.util.doSetFocus);
}
},doSetFocus:function(){
var _ad8=-1;
var _ad9=-1;
var form=document.forms[0];
if(!form){
return false;
}
var _ada=form.elements;
var l=_ada.length;
var elem;
for(var i=0;i<l;i++){
elem=_ada[i];
if(_ad8==-1&&(elem.type=="select-one"||elem.type=="text"||elem.tagName=="TEXTAREA")&&!_a3a.contains(elem,"dijitArrowButtonInner")&&!_a3a.contains(elem,"dijitValidationInner")){
_ad8=i;
}
if(elem.tabIndex=="1"){
elem.tabIndex=0;
_ad9=i;
break;
}
}
var elem;
if(_ad9!=-1){
elem=_ada[_ad9];
}else{
if(_ad8!=-1){
elem=_ada[_ad8];
}
}
try{
var _adb=dojo.byId("error-messages");
if(_adb){
_adb.focus();
}else{
elem.focus();
}
}
catch(e){
curam.debug.log(_a3f.getProperty("curam.util.error.focus"),e.message);
return false;
}
return true;
},openLocaleSelector:function(_adc){
_adc=_a3c.fix(_adc);
var _add=_adc.target;
while(_add&&_add.tagName!="A"){
_add=_add.parentNode;
}
var loc=_add.href;
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
var _ade=curam.util.getLastPathSegmentWithQueryString(url);
var _adf=_ade.split("?")[0];
return _adf.indexOf("Action.do")>-1;
},closeLocaleSelector:function(_ae0){
_ae0=_a3c.fix(_ae0);
_a3c.stop(_ae0);
dojo.global.close();
return false;
},getSuffixFromClass:function(node,_ae1){
var _ae2=attr.get(node,"class").split(" ");
var _ae3=_a39.filter(_ae2,function(_ae4){
return _ae4.indexOf(_ae1)==0;
});
if(_ae3.length>0){
return _ae3[0].split(_ae1)[1];
}else{
return null;
}
},getCacheBusterParameter:function(){
return this.CACHE_BUSTER_PARAM_NAME+"="+new Date().getTime()+"_"+this.CACHE_BUSTER++;
},stripeTable:function(_ae5,_ae6,_ae7){
var _ae8=_ae5.tBodies[0];
var _ae9=(_ae6?2:1);
if(_ae8.rows.length<_ae9){
return;
}
var rows=_ae8.rows;
for(var i=0;i<rows.length;i+=_ae9){
curam.debug.log("curam.util.stripeTable(%s, %s): i = %s",_ae5,_ae6,i);
var _aea=[rows[i]];
if(_ae6&&rows[i+1]){
_aea.push(rows[i+1]);
}
_a39.forEach(_aea,function(row){
_a3a.remove(row,"odd-last-row");
_a3a.remove(row,"even-last-row");
});
if(i%(2*_ae9)==0){
_a39.forEach(_aea,function(row){
cm.replaceClass(row,"odd","even");
});
if(i==_ae7){
_a39.forEach(_aea,function(row){
_a3a.add(row,"odd-last-row");
});
}
}else{
_a39.forEach(_aea,function(row){
cm.replaceClass(row,"even","odd");
});
if(i==_ae7){
_a39.forEach(_aea,function(row){
_a3a.add(row,"even-last-row");
});
}
}
}
},fillString:function(_aeb,_aec){
var _aed="";
while(_aec>0){
_aed+=_aeb;
_aec-=1;
}
return _aed;
},updateHeader:function(qId,_aee,_aef,_af0){
var _af1=dom.byId("header_"+qId);
_af1.firstChild.nextSibling.innerHTML=_aee;
answerCell=dom.byId("chosenAnswer_"+qId);
answerCell.innerHTML=_aef;
sourceCell=dom.byId("chosenSource_"+qId);
sourceCell.innerHTML=_af0;
},search:function(_af2,_af3){
var _af4=_a34.byId(_af2).get("value");
var _af5=_a34.byId(_af3);
var _af6=_af5?_af5.get("value"):null;
var _af7="";
var _af8;
var _af9;
if(_af6){
_af9=_af6.split("|");
_af7=_af9[0];
_af8=_af9[1];
}
var _afa=curam.util.defaultSearchPageID;
var _afb="";
if(_af7===""){
_afb=_afa+"Page.do?searchText="+encodeURIComponent(_af4);
}else{
_afb=_af8+"Page.do?searchText="+encodeURIComponent(_af4)+"&searchType="+encodeURIComponent(_af7);
}
var _afc=new curam.ui.PageRequest(_afb);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_afc);
});
},updateDefaultSearchText:function(_afd,_afe){
var _aff=_a34.byId(_afd);
var _b00=_a34.byId(_afe);
var _b01=_aff?_aff.get("value"):null;
var str=_b01.split("|")[2];
_b00.set("placeHolder",str);
},updateSearchBtnState:function(_b02,_b03){
var _b04=_a34.byId(_b02);
var btn=dom.byId(_b03);
var _b05=_b04.get("value");
if(!_b05||lang.trim(_b05).length<1){
_a3a.add(btn,"dijitDisabled");
}else{
_a3a.remove(btn,"dijitDisabled");
}
},furtherOptionsSearch:function(){
var _b06=curam.util.furtherOptionsPageID+"Page.do";
var _b07=new curam.ui.PageRequest(_b06);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_b07);
});
},searchButtonStatus:function(_b08){
var btn=dojo.byId(_b08);
if(!dojo.hasClass(btn,"dijitDisabled")){
return true;
}
},getPageHeight:function(){
var _b09=400;
var _b0a=0;
if(_a3d("frameset").length>0){
curam.debug.log("curam.util.getPageHeight() "+_a3f.getProperty("curam.util.default.height"),_b09);
_b0a=_b09;
}else{
var _b0b=function(node){
if(!node){
curam.debug.log(_a3f.getProperty("curam.util.node"));
return 0;
}
var mb=geom.getMarginSize(node);
var pos=geom.position(node);
return pos.y+mb.h;
};
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")){
var _b0c=_a3d("div.bottom")[0];
var _b0d=_b0b(_b0c);
curam.debug.log(_a3f.getProperty("curam.util.page.height"),_b0d);
curam.debug.log(_a3f.getProperty("curam.util.ie7.issue"));
_b0a=_b0d+1;
}else{
var _b0e=dom.byId("content")||dom.byId("wizard-content");
var _b0f=_a3d("> *",_b0e).filter(function(n){
return n.tagName.indexOf("SCRIPT")<0&&_a38.get(n,"visibility")!="hidden"&&_a38.get(n,"display")!="none";
});
var _b10=_b0f[0];
for(var i=1;i<_b0f.length;i++){
if(_b0b(_b0f[i])>=_b0b(_b10)){
_b10=_b0f[i];
}
}
_b0a=_b0b(_b10);
curam.debug.log("curam.util.getPageHeight() "+_a3f.getProperty("curam.util.base.height"),_b0a);
var _b11=_a3d(".actions-panel",_a37.body());
if(_b11.length>0){
var _b12=geom.getMarginBox(_b11[0]).h;
curam.debug.log("curam.util.getPageHeight() "+_a3f.getProperty("curam.util.panel.height"));
_b0a+=_b12;
_b0a+=10;
}
var _b13=_a3d("body.details");
if(_b13.length>0){
curam.debug.log("curam.util.getPageHeight() "+_a3f.getProperty("curam.util.bar.height"));
_b0a+=20;
}
}
}
curam.debug.log("curam.util.getPageHeight() "+_a3f.getProperty("curam.util.returning"),_b0a);
return _b0a;
},toCommaSeparatedList:function(_b14){
var _b15="";
for(var i=0;i<_b14.length;i++){
_b15+=_b14[i];
if(i<_b14.length-1){
_b15+=",";
}
}
return _b15;
},skipLinkFocus:function(){
var dest=dojo.byId("skip-dest");
if(dest){
dest.focus();
}
},showHideSkipLink:function(e){
var _b16=dojo.byId("skipLink");
if(_b16){
var _b17=_b16.parentNode;
if(e.type=="focus"&&_a3a.contains(_b17,"hidden")){
_a3a.remove(_b17,"hidden");
}else{
if(e.type=="blur"&&!_a3a.contains(_b17,"hidden")){
_a3a.add(_b17,"hidden");
}
}
}
},setupGenericKeyHandler:function(){
_a36(function(){
var f=function(_b18){
if(dojo.global.jsScreenContext.hasContextBits("MODAL")&&_b18.keyCode==27){
var ev=_a3c.fix(_b18);
var _b19=_a34.byId(ev.target.id);
var _b1a=typeof _b19!="undefined"&&_b19.baseClass=="dijitTextBox dijitComboBox";
if(!_b1a){
curam.dialog.closeModalDialog();
}
}
if(_b18.keyCode==13){
var ev=_a3c.fix(_b18);
var _b1b=ev.target.type=="text";
var _b1c=ev.target.type=="radio";
var _b1d=ev.target.type=="checkbox";
var _b1e=ev.target.type=="select-multiple";
var _b1f=ev.target.type=="password";
var _b20=_a34.byId(ev.target.id);
if(typeof _b20!="undefined"){
var _b21=_a34.byNode(dojo.byId("widget_"+ev.target.id));
if(_b21&&_b21.enterKeyOnOpenDropDown){
_b21.enterKeyOnOpenDropDown=false;
return false;
}
}
var _b22=typeof _b20!="undefined"&&_b20.baseClass=="dijitComboBox";
if((!_b1b&&!_b1c&&!_b1d&&!_b1e&&!_b1f)||_b22){
return true;
}
var _b23=null;
var _b24=_a3d(".curam-default-action");
if(_b24.length>0){
_b23=_b24[0];
}else{
var _b25=_a3d("input[type='submit']");
if(_b25.length>0){
_b23=_b25[0];
}
}
if(_b23!=null){
_a3c.stop(_a3c.fix(_b18));
curam.util.clickButton(_b23);
return false;
}
dojo.require("curam.dateSelectorUtil");
var _b26=dojo.byId("year");
if(_b26){
dojo.stopEvent(dojo.fixEvent(_b18));
curam.dateSelectorUtil.updateCalendar();
}
}
return true;
};
curam.util.connect(_a37.body(),"onkeyup",f);
});
},enterKeyPress:function(_b27){
if(_b27.keyCode==13){
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
var _b28=elem.parentElement.parentElement.id;
var _b29=dojo.byId("end-"+_b28);
if(_b29){
_b29.focus();
}
}
}
},focusHelpIconOnTab:function(e){
if(!e.shiftKey&&e.keyCode==9){
var _b2a=dojo.query(".dijitDialogHelpIcon")[0];
if(_b2a){
setTimeout(function(){
_b2a.focus();
},5);
}
}
},swapState:function(node,_b2b,_b2c,_b2d){
if(_b2b){
_a3a.replace(node,_b2c,_b2d);
}else{
_a3a.replace(node,_b2d,_b2c);
}
},makeQueryString:function(_b2e){
if(!_b2e||_b2e.length==0){
return "";
}
var _b2f=[];
for(var _b30 in _b2e){
_b2f.push(_b30+"="+encodeURIComponent(_b2e[_b30]));
}
return "?"+_b2f.join("&");
},clickHandlerForListActionMenu:function(url,_b31,_b32,_b33){
if(_b31){
var href=curam.util.replaceUrlParam(url,"o3frame","modal");
var ctx=dojo.global.jsScreenContext;
ctx.addContextBits("MODAL");
href=curam.util.replaceUrlParam(href,"o3ctx",ctx.getValue());
curam.util.redirectWindow(href);
return;
}
var _b34={href:url};
require(["curam/ui/UIMPageAdaptor"]);
if(curam.ui.UIMPageAdaptor.allowLinkToContinue(_b34)){
dojo.global.location=url;
return;
}
if(_b34!=null){
if(_b33){
_a3c.fix(_b33);
_a3c.stop(_b33);
}
if(!_b34.href||_b34.href.length==0){
return;
}
if(_b32&&!curam.util.isInternal(url)){
dojo.global.open(url);
}else{
if(curam.ui.UIMPageAdaptor.isLinkValidForTabProcessing(_b34)){
var _b35=new curam.ui.PageRequest(_b34.href);
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")||dojo.global.jsScreenContext.hasContextBits("NESTED_UIM")){
_b35.pageHolder=dojo.global;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_b35);
});
}
}
}
},clickHandlerForMailtoLinks:function(_b36,url){
dojo.stopEvent(_b36);
var _b37=dojo.query("#mailto_frame")[0];
if(!_b37){
_b37=dojo.io.iframe.create("mailto_frame","");
}
_b37.src=url;
return false;
},isInternal:function(url){
var path=url.split("?")[0];
var _b38=path.match("Page.do");
if(_b38!=null){
return true;
}
return false;
},getLastPathSegmentWithQueryString:function(url){
var _b39=url.split("?");
var _b3a=_b39[0].split("/");
return _b3a[_b3a.length-1]+(_b39[1]?"?"+_b39[1]:"");
},replaceSubmitButton:function(name,_b3b){
if(curam.replacedButtons[name]=="true"){
return;
}
var _b3c="__o3btn."+name;
var _b3d;
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_b3d=_a3d("input[id='"+_b3c+"']");
}else{
_b3d=_a3d("input[name='"+_b3c+"']");
}
_b3d.forEach(function(_b3e,_b3f,_b40){
if(_b3b){
var _b41=_b40[1];
_b41.setAttribute("value",_b3b);
}
_b3e.tabIndex=-1;
var _b42=_b3e.parentNode;
var _b43="btn-id-"+_b3f;
curam.util.setupWidgetLoadMask("a."+_b43);
var _b44="ac initially-hidden-widget "+_b43;
if(_a3a.contains(_b3e,"first-action-control")){
_b44+=" first-action-control";
}
var _b45=_a35.create("a",{"class":_b44,href:"#"},_b3e,"before");
var _b46=dojo.query(".page-level-menu")[0];
if(_b46){
dojo.attr(_b45,"title",_b3e.value);
}
_a35.create("span",{"class":"filler"},_b45,"before");
var left=_a35.create("span",{"class":"left-corner"},_b45);
var _b47=_a35.create("span",{"class":"right-corner"},left);
var _b48=_a35.create("span",{"class":"middle"},_b47);
_b48.appendChild(document.createTextNode(_b3e.value));
curam.util.addActionControlClass(_b45);
on(_b45,"click",function(_b49){
curam.util.clickButton(this._submitButton);
_a3c.stop(_b49);
});
_b45._submitButton=_b40[0];
_a3a.add(_b3e,"hidden-button");
});
curam.replacedButtons[name]="true";
},setupWidgetLoadMask:function(_b4a){
curam.util.subscribe("/curam/page/loaded",function(){
var _b4b=_a3d(_b4a)[0];
if(_b4b){
_a38.set(_b4b,"visibility","visible");
}else{
curam.debug.log("setupButtonLoadMask: "+_a3f.getProperty("curam.util.not.found")+"'"+_b4a+"'"+_a3f.getProperty("curam.util.ignore.mask"));
}
});
},optReplaceSubmitButton:function(name){
if(curam.util.getFrameRoot(dojo.global,"wizard")==null){
curam.util.replaceSubmitButton(name);
return;
}
var _b4c=curam.util.getFrameRoot(dojo.global,"wizard").navframe.wizardNavigator;
if(_b4c.delegatesSubmit[jsPageID]!="assumed"){
curam.util.replaceSubmitButton(name);
}
},clickButton:function(_b4d){
var _b4e=dom.byId("mainForm");
var _b4f;
if(!_b4d){
curam.debug.log("curam.util.clickButton: "+_a3f.getProperty("curam.util..no.arg"));
return;
}
if(typeof (_b4d)=="string"){
var _b50=_b4d;
curam.debug.log("curam.util.clickButton: "+_a3f.getProperty("curam.util.searching")+_a3f.getProperty("curam.util.id.of")+"'"+_b50+"'.");
_b4d=_a3d("input[id='"+_b50+"']")[0];
if(!_b4d.form&&!_b4d.id){
curam.debug.log("curam.util.clickButton: "+_a3f.getProperty("curam.util.searched")+_a3f.getProperty("curam.util.id.of")+"'"+_b50+_a3f.getProperty("curam.util.exiting"));
return;
}
}
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_b4f=_b4d;
}else{
_b4f=_a3d("input[name='"+_b4d.id+"']",_b4e)[0];
}
try{
if(attr.get(_b4e,"action").indexOf(jsPageID)==0){
curam.util.publishRefreshEvent();
}
_b4f.click();
}
catch(e){
curam.debug.log(_a3f.getProperty("curam.util.exception.clicking"));
}
},printPage:function(_b51){
_a3c.stop(_b51);
var _b52=dojo.window.get(_b51.currentTarget.ownerDocument);
var _b53=_b52.frameElement;
var _b54=_b53;
while(_b54&&!dojo.hasClass(_b54,"tab-content-holder")){
_b54=_b54.parentNode;
}
var _b55=_b54;
var _b56=dojo.query(".detailsPanelFrame",_b55)[0];
if(_b56!=undefined&&_b56!=null){
_b56.contentWindow.focus();
_b56.contentWindow.print();
}
_b52.focus();
_b52.print();
return false;
},addSelectedClass:function(_b57){
_a3a.add(_b57.target,"selected");
},removeSelectedClass:function(_b58){
_a3a.remove(_b58.target,"selected");
},openHelpPage:function(_b59,_b5a){
_a3c.stop(_b59);
dojo.global.open(_b5a);
},connect:function(_b5b,_b5c,_b5d){
var h=function(_b5e){
_b5d(_a3c.fix(_b5e));
};
if(has("ie")&&has("ie")<9){
_b5b.attachEvent(_b5c,h);
_a3e.addOnWindowUnload(function(){
_b5b.detachEvent(_b5c,h);
});
return {object:_b5b,eventName:_b5c,handler:h};
}else{
var _b5f=_b5c;
if(_b5c.indexOf("on")==0){
_b5f=_b5c.slice(2);
}
var dt=on(_b5b,_b5f,h);
_a3e.addOnWindowUnload(function(){
dt.remove();
});
return dt;
}
},disconnect:function(_b60){
if(has("ie")&&has("ie")<9){
_b60.object.detachEvent(_b60.eventName,_b60.handler);
}else{
_b60.remove();
}
},subscribe:function(_b61,_b62){
var st=_a3b.subscribe(_b61,_b62);
_a3e.addOnWindowUnload(function(){
st.remove();
});
return st;
},unsubscribe:function(_b63){
_b63.remove();
},addActionControlClickListener:function(_b64){
var _b65=dom.byId(_b64);
var _b66=_a3d(".ac",_b65);
if(_b66.length>0){
for(var i=0;i<_b66.length;i++){
var _b67=_b66[i];
curam.util.addActionControlClass(_b67);
}
}
},addActionControlClass:function(_b68){
curam.util.connect(_b68,"onmousedown",function(){
_a3a.add(_b68,"selected-button");
curam.util.connect(_b68,"onmouseout",function(){
_a3a.remove(_b68,"selected-button");
});
});
},getClusterActionSet:function(){
var _b69=dom.byId("content");
var _b6a=_a3d(".blue-action-set",_b69);
if(_b6a.length>0){
for(var i=0;i<_b6a.length;i++){
curam.util.addActionControlClickListener(_b6a[i]);
}
}
},adjustActionButtonWidth:function(){
if(has("ie")==8){
_a36(function(){
if(dojo.global.jsScreenContext.hasContextBits("MODAL")){
_a3d(".action-set > a").forEach(function(node){
if(node.childNodes[0].offsetWidth>node.offsetWidth){
_a38.set(node,"width",node.childNodes[0].offsetWidth+"px");
_a38.set(node,"display","block");
_a38.set(node,"display","inline-block");
}
});
}
});
}
},setRpu:function(url,rtc,_b6b){
if(!url||!rtc||!rtc.getHref()){
throw {name:"Unexpected values",message:"This value not allowed for url or rtc"};
}
var _b6c=curam.util.getLastPathSegmentWithQueryString(rtc.getHref());
_b6c=curam.util.removeUrlParam(_b6c,curam.util.Constants.RETURN_PAGE_PARAM);
if(_b6b){
var i;
for(i=0;i<_b6b.length;i++){
if(!_b6b[i].key||!_b6b[i].value){
throw {name:"undefined value error",message:"The object did not contain a valid key/value pair"};
}
_b6c=curam.util.replaceUrlParam(_b6c,_b6b[i].key,_b6b[i].value);
}
}
var _b6d=curam.util.replaceUrlParam(url,curam.util.Constants.RETURN_PAGE_PARAM,encodeURIComponent(_b6c));
curam.debug.log("curam.util.setRpu "+_a3f.getProperty("curam.util.added.rpu")+_b6d);
return _b6d;
},retrieveBaseURL:function(){
return dojo.global.location.href.match(".*://[^/]*/[^/]*");
},removeRoleRegion:function(){
var body=dojo.query("body")[0];
dojo.removeAttr(body,"role");
},iframeTitleFallBack:function(){
var _b6e=curam.tab.getContainerTab(curam.tab.getContentPanelIframe());
var _b6f=dojo.byId(curam.tab.getContentPanelIframe());
var _b70=_b6f.contentWindow.document.title;
var _b71=dojo.query("div.nowrapTabStrip.dijitTabContainerTop-tabs > div.dijitTabChecked.dijitChecked")[0];
var _b72=dojo.query("span.tabLabel",_b71)[0];
var _b73=dojo.query("div.nowrapTabStrip.dijitTabNoLayout > div.dijitTabChecked.dijitChecked",_b6e.domNode)[0];
var _b74=dojo.query("span.tabLabel",_b73)[0];
if(_b70&&_b70!=null){
return _b70;
}else{
if(_b73){
return _b74.innerHTML;
}else{
return _b72.innerHTML;
}
}
},addClassToLastNodeInContentArea:function(){
var _b75=_a3d("> div","content");
var _b76=_b75.length;
if(_b76==0){
return "No need to add";
}
var _b77=_b75[--_b76];
while(_a3a.contains(_b77,"hidden-action-set")&&_b77){
_b77=_b75[--_b76];
}
_a3a.add(_b77,"last-node");
},highContrastModeType:function(){
var _b78=dojo.query("body.high-contrast")[0];
return _b78;
},processBidiContextual:function(_b79){
_b79.dir=bidi.prototype._checkContextual(_b79.value);
},getCookie:function(name){
var dc=document.cookie;
var _b7a=name+"=";
var _b7b=dc.indexOf("; "+_b7a);
if(_b7b==-1){
_b7b=dc.indexOf(_b7a);
if(_b7b!=0){
return null;
}
}else{
_b7b+=2;
}
var end=document.cookie.indexOf(";",_b7b);
if(end==-1){
end=dc.length;
}
return unescape(dc.substring(_b7b+_b7a.length,end));
}});
return curam.util;
});
},"dojo/store/Memory":function(){
define("dojo/store/Memory",["../_base/declare","./util/QueryResults","./util/SimpleQueryEngine"],function(_b7c,_b7d,_b7e){
return _b7c("dojo.store.Memory",null,{constructor:function(_b7f){
for(var i in _b7f){
this[i]=_b7f[i];
}
this.setData(this.data||[]);
},data:null,idProperty:"id",index:null,queryEngine:_b7e,get:function(id){
return this.data[this.index[id]];
},getIdentity:function(_b80){
return _b80[this.idProperty];
},put:function(_b81,_b82){
var data=this.data,_b83=this.index,_b84=this.idProperty;
var id=(_b82&&"id" in _b82)?_b82.id:_b84 in _b81?_b81[_b84]:Math.random();
if(id in _b83){
if(_b82&&_b82.overwrite===false){
throw new Error("Object already exists");
}
data[_b83[id]]=_b81;
}else{
_b83[id]=data.push(_b81)-1;
}
return id;
},add:function(_b85,_b86){
(_b86=_b86||{}).overwrite=false;
return this.put(_b85,_b86);
},remove:function(id){
var _b87=this.index;
var data=this.data;
if(id in _b87){
data.splice(_b87[id],1);
this.setData(data);
return true;
}
},query:function(_b88,_b89){
return _b7d(this.queryEngine(_b88,_b89)(this.data));
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
curam.define.singleton("curam.util.ListSort",{makeSortable:function(_b8a,_b8b,_b8c,_b8d){
dojo.addOnLoad(function(){
_b8a=dojo.byId(_b8a);
if(_b8a.tHead==null){
return;
}else{
if(_b8a.tHead.rows&&_b8a.tHead.rows.length>0){
var _b8e=_b8a.tHead.rows[0];
if(!_b8e){
return;
}
}
}
var trim=dojo.trim;
for(var i=0;i<_b8e.cells.length;i++){
var cell=_b8e.cells[i];
if(cell.id&&cell.childNodes[0]){
var _b8f=cell.childNodes[0];
if(_b8f.childNodes[0]&&_b8f.childNodes[0].nodeType==3){
var txt=trim(_b8f.childNodes[0].nodeValue);
if((txt.length>0)&&(txt!=" ")){
var _b90=dojo.create("a",{href:"#"});
_b90["table"]=_b8a;
_b90["paginationId"]=_b8b;
_b90.appendChild(document.createTextNode(txt));
curam.util.connect(_b90,"onclick",curam.util.ListSort.sortTable);
var _b91=dojo.create("span",{className:"hidden"},_b90,"right");
_b91.appendChild(document.createTextNode(_b8d));
dojo.empty(_b8f);
_b8f.appendChild(_b90);
}
}
}
}
var _b92=dojo.query(".hidden-table-header a");
for(var i=0;i<_b92.length;i++){
var _b93=_b92[i];
_b93.setAttribute("tabindex","-1");
_b92.length-1;
}
_b8a._sortUp=true;
_b8a._isExpandableList=_b8c;
});
},sortTable:function(_b94){
var link;
if(typeof (_b94.nodeType)!="undefined"){
link=_b94;
}else{
link=_b94.target;
dojo.stopEvent(_b94);
}
window.dojo.publish("/curam/list/toBeSorted",[link["paginationId"]]);
var th=link.parentNode.parentNode;
var _b95=th.cellIndex;
if(dojo.isIE&&curam.content&&curam.content.LIST_MENUS_ENABLED){
_b95=0;
var _b96=th.previousSibling;
while(_b96){
if(_b96.tagName=="TH"){
_b95++;
}
_b96=_b96.previousSibling;
}
}
var _b97=link["table"];
var _b98=_b97._isExpandableList;
var _b99=(_b98?2:1);
var _b9a=_b97.tBodies[0];
if(_b9a.rows.length<=_b99){
return;
}
var _b9b=function(a,b){
aa=curam.util.ListSort.getSpanDataSort(a.cells[_b95]);
if(isNaN(aa)){
aa=0;
}
bb=curam.util.ListSort.getSpanDataSort(b.cells[_b95]);
if(isNaN(bb)){
bb=0;
}
return aa-bb;
};
var _b9c=[];
var _b9d=_b9a.rows.length-_b99;
for(var j=0;j<_b9a.rows.length/_b99;j++){
var _b9e=j*_b99;
_b9c[j]=_b9a.rows[_b9e];
if(_b98){
_b9c[j]._detailRow=_b9a.rows[_b9e+1];
}
if(dojo.style(_b9a.rows[_b9e],"display")!="none"&&dojo.style(_b9a.rows[_b9e],"visible")!="false"){
_b9d=_b9e;
}
}
_b9c.sort(_b9b);
if(!_b97._sortUp){
_b9c.reverse();
}
_b97._sortUp=!_b97._sortUp;
var _b9f=_b9a.firstChild;
for(var i=0;i<_b9c.length;i++){
var _ba0=_b9c[i];
if(_b98){
var _ba1=_ba0._detailRow;
_b9a.appendChild(_ba0);
var next=cm.nextSibling(_ba0,"tr");
if(next){
_b9a.insertBefore(_ba1,next);
}else{
_b9a.appendChild(_ba1);
}
_b9f=cm.nextSibling(_ba1,"tr");
}else{
_b9a.appendChild(_ba0);
}
}
curam.util.stripeTable(_b97,_b98,_b9d);
window.dojo.publish("/curam/list/sorted",[link["paginationId"]]);
},sortScrollableList:function(_ba2,_ba3){
dojo.stopEvent(_ba2);
var idx=_ba3.indexOf("_slh");
var _ba4=_ba3.substring(0,idx);
var _ba5=dojo.byId(_ba4);
if(typeof (_ba5)=="undefined"){
return;
}
var _ba6=dojo.query("a",_ba5)[0];
curam.util.ListSort.sortTable(_ba6);
},getSpanDataSort:function(el){
var _ba7=el.getElementsByTagName("span");
curam.debug.log(el.getElementsByTagName("span"));
for(var i=0;i<_ba7.length;i++){
if(dojo.attr(_ba7[i],"data-curam-sort-order")!==""){
spanElement=_ba7[i];
}
}
curam.debug.log("getSpanDataSort ==="+dojo.attr(spanElement,"data-curam-sort-order"));
return spanElement?parseInt(dojo.attr(spanElement,"data-curam-sort-order"))||0:0;
}});
return curam.util.ListSort;
});
},"dijit/layout/StackContainer":function(){
define("dijit/layout/StackContainer",["dojo/_base/array","dojo/cookie","dojo/_base/declare","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/ready","dojo/topic","../registry","../_WidgetBase","./_LayoutWidget","dojo/i18n!../nls/common"],function(_ba8,_ba9,_baa,_bab,_bac,lang,_bad,_bae,_baf,_bb0,_bb1){
if(!_bac.isAsync){
_bad(0,function(){
var _bb2=["dijit/layout/StackController"];
require(_bb2);
});
}
lang.extend(_bb0,{selected:false,closable:false,iconClass:"dijitNoIcon",showTitle:true});
return _baa("dijit.layout.StackContainer",_bb1,{doLayout:true,persist:false,baseClass:"dijitStackContainer",buildRendering:function(){
this.inherited(arguments);
_bab.add(this.domNode,"dijitLayoutContainer");
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onkeypress",this._onKeyPress);
},startup:function(){
if(this._started){
return;
}
var _bb3=this.getChildren();
_ba8.forEach(_bb3,this._setupChild,this);
if(this.persist){
this.selectedChildWidget=_baf.byId(_ba9(this.id+"_selectedChild"));
}else{
_ba8.some(_bb3,function(_bb4){
if(_bb4.selected){
this.selectedChildWidget=_bb4;
}
return _bb4.selected;
},this);
}
var _bb5=this.selectedChildWidget;
if(!_bb5&&_bb3[0]){
_bb5=this.selectedChildWidget=_bb3[0];
_bb5.selected=true;
}
_bae.publish(this.id+"-startup",{children:_bb3,selected:_bb5});
this.inherited(arguments);
},resize:function(){
if(!this._hasBeenShown){
this._hasBeenShown=true;
var _bb6=this.selectedChildWidget;
if(_bb6){
this._showChild(_bb6);
}
}
this.inherited(arguments);
},_setupChild:function(_bb7){
this.inherited(arguments);
_bab.replace(_bb7.domNode,"dijitHidden","dijitVisible");
_bb7.domNode.title="";
},addChild:function(_bb8,_bb9){
this.inherited(arguments);
if(this._started){
_bae.publish(this.id+"-addChild",_bb8,_bb9);
this.layout();
if(!this.selectedChildWidget){
this.selectChild(_bb8);
}
}
},removeChild:function(page){
this.inherited(arguments);
if(this._started){
_bae.publish(this.id+"-removeChild",page);
}
if(this._descendantsBeingDestroyed){
return;
}
if(this.selectedChildWidget===page){
this.selectedChildWidget=undefined;
if(this._started){
var _bba=this.getChildren();
if(_bba.length){
this.selectChild(_bba[0]);
}
}
}
if(this._started){
this.layout();
}
},selectChild:function(page,_bbb){
page=_baf.byId(page);
if(this.selectedChildWidget!=page){
var d=this._transition(page,this.selectedChildWidget,_bbb);
if(d){
this._set("selectedChildWidget",page);
_bae.publish(this.id+"-selectChild",page);
if(this.persist){
_ba9(this.id+"_selectedChild",this.selectedChildWidget.id);
}
}
}
return d;
},_transition:function(_bbc,_bbd){
if(_bbd){
this._hideChild(_bbd);
}
var d=this._showChild(_bbc);
if(d&&_bbc.resize){
if(this.doLayout){
_bbc.resize(this._containerContentBox||this._contentBox);
}else{
_bbc.resize();
}
}
return d;
},_adjacent:function(_bbe){
var _bbf=this.getChildren();
var _bc0=_ba8.indexOf(_bbf,this.selectedChildWidget);
_bc0+=_bbe?1:_bbf.length-1;
return _bbf[_bc0%_bbf.length];
},forward:function(){
return this.selectChild(this._adjacent(true),true);
},back:function(){
return this.selectChild(this._adjacent(false),true);
},_onKeyPress:function(e){
_bae.publish(this.id+"-containerKeyPress",{e:e,page:this});
},layout:function(){
var _bc1=this.selectedChildWidget;
if(_bc1&&_bc1.resize){
if(this.doLayout){
_bc1.resize(this._containerContentBox||this._contentBox);
}else{
_bc1.resize();
}
}
},_showChild:function(page){
if(page){
var _bc2=this.getChildren();
page.isFirstChild=(page==_bc2[0]);
page.isLastChild=(page==_bc2[_bc2.length-1]);
page._set("selected",true);
_bab.replace(page.domNode,"dijitVisible","dijitHidden");
return (page._onShow&&page._onShow())||true;
}
},_hideChild:function(page){
page._set("selected",false);
_bab.replace(page.domNode,"dijitHidden","dijitVisible");
page.onHide&&page.onHide();
},closeChild:function(page){
var _bc3=page.onClose(this,page);
if(_bc3){
this.removeChild(page);
page.destroyRecursive();
}
},destroyDescendants:function(_bc4){
this._descendantsBeingDestroyed=true;
this.selectedChildWidget=undefined;
_ba8.forEach(this.getChildren(),function(_bc5){
if(!_bc4){
this.removeChild(_bc5);
}
_bc5.destroyRecursive(_bc4);
},this);
this._descendantsBeingDestroyed=false;
}});
});
},"dojo/regexp":function(){
define("dojo/regexp",["./_base/kernel","./_base/lang"],function(dojo,lang){
lang.getObject("regexp",true,dojo);
dojo.regexp.escapeString=function(str,_bc6){
return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_bc6&&_bc6.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
dojo.regexp.buildGroupRE=function(arr,re,_bc7){
if(!(arr instanceof Array)){
return re(arr);
}
var b=[];
for(var i=0;i<arr.length;i++){
b.push(re(arr[i]));
}
return dojo.regexp.group(b.join("|"),_bc7);
};
dojo.regexp.group=function(_bc8,_bc9){
return "("+(_bc9?"?:":"")+_bc8+")";
};
return dojo.regexp;
});
},"curam/UIMController":function(){
require({cache:{"url:curam/layout/resources/UIMController.html":"<div id=\"uimcontroller_${uid}\" class=\"uimcontroller_${uid} uimController ${classList}\" data-dojo-attach-point=\"uimController\">\r\n  <div style=\"display:none;\" \r\n       id=\"uimcontroller_tc_${uid}\" \r\n       class=\"ipnTabController in-page-nav-tabContainer\"\r\n       data-dojo-attach-point=\"tabController\" \r\n       data-dojo-type=\"curam.layout.TabContainer\">\r\n  </div>\r\n  <div class=\"contentPanelFrameWrapper\"  \r\n        data-dojo-attach-point=\"frameWrapper\">\r\n    <iframe frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\"\r\n             allowTransparency=\"true\" \r\n             id=\"${iframeId}\" \r\n             data-dojo-attach-point=\"frame\"                 \r\n             class=\"${iframeId} ${iframeClassList}\"\r\n             iscpiframe=\"${iscpiframe}\"\r\n             title=\"${title}\" >\r\n    </iframe>\r\n  </div> \r\n</div>"}});
define("curam/UIMController",["dojo/text!curam/layout/resources/UIMController.html","dijit/_Widget","dijit/_Templated","dijit/layout/ContentPane","curam/tab","curam/debug","curam/util","curam/util/onLoad","curam/util/ResourceBundle"],function(_bca){
dojo.requireLocalization("curam.application","Debug");
var _bcb=new curam.util.ResourceBundle("Debug");
var _bcc=dojo.declare("curam.UIMController",[dijit._Widget,dijit._Templated],{TAB_HEIGHT:20,EVENT:{TOPIC_PREFIX:"UIMController.InPageNav_"},TOPIC_LOADED:"/curam/uim/controller/loaded",frameLoadEvent:"",uid:"",url:"",tabControllerId:"",oldTabsTitlesList:[],newTabsTitlesList:[],widgetsInTemplate:true,finishedLoadingTabs:false,classList:"",iframeId:"",height:"",width:"",iframeClassList:"",iscpiframe:"false",ipnTabClickEvent:null,title:"",handleIPNTabClickListener:null,inPageNavItems:null,loadFrameOnCreate:true,resizeFrameOnLoad:false,templateString:_bca,inDialog:false,constructor:function(args){
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
curam.debug.log(_bcb.getProperty("curam.UIMController.new")+" curam.UIMController()...");
curam.debug.log("curam.UIMController "+_bcb.getProperty("curam.UIMController.identifier")+" "+this.uid);
curam.debug.log("curam.UIMController "+_bcb.getProperty("curam.UIMController.url")+" "+this.url);
curam.debug.log("curam.UIMController "+_bcb.getProperty("curam.UIMController.identifier")+" "+this.tabControllerId);
curam.debug.log("curam.UIMController: newTabsTitlesList "+" "+this.newTabsTitlesList);
return this.uimController;
},postCreate:function(){
this.frameLoadEvent=this.EVENT.TOPIC_PREFIX+this.frame.id;
this.setURL(this.url);
var _bcd=dojo.hitch(this,"processFrameLoadEvent");
curam.util.onLoad.addSubscriber(this.frame.id,_bcd);
dojo.connect(this,"destroy",function(){
curam.util.onLoad.removeSubscriber(this.iframeId,_bcd);
this.fLoadFunct=null;
});
if(this.inDialog){
dojo.style(this.frame,{width:this.width,height:this.height});
}
curam.debug.log("curam.UIMController: loadFrameOnCreate="+this.loadFrameOnCreate);
curam.debug.log("curam.UIMController "+_bcb.getProperty("curam.UIMController.url")+this.url);
if(this.loadFrameOnCreate==true&&typeof (this.url)!="undefined"){
curam.debug.log("curam.UIMController: "+_bcb.getProperty("uram.UIMController.loading"));
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
},processFrameLoadEvent:function(_bce,_bcf){
curam.debug.log("curam.UIMController: processFrameLoadEvent "+_bcb.getProperty("curam.UIMController.processing.IPN")+_bcf);
this.inPageNavItems=_bcf.inPageNavItems;
curam.debug.log("curam.UIMController: processFrameLoadEvent: "+_bcb.getProperty("curam.UIMController.processing"));
curam.debug.log("curam.UIMController.processFrameLoadEvent: this.tabController: "+this.tabController);
if(this.resizeFrameOnLoad==true){
var _bd0=_bcf.height;
curam.debug.log(_bcb.getProperty("curam.UIMController.resizing")+_bd0);
if(_bd0){
dojo.style(this.getIFrame(),{height:_bd0+"px"});
}
}
curam.debug.log(_bcb.getProperty("curam.UIMController.IPN.items"),this.inPageNavItems);
if(!this.hasInPageNavigation()){
curam.debug.log(_bcb.getProperty("curam.UIMController.no.IPN"));
this.clearIPNTabs();
if(!this._tabControllerHidden()){
curam.debug.log(_bcb.getProperty("curam.UIMController.hiding"));
this.showTabContainer(false);
}
dojo.publish(this.TOPIC_LOADED);
return;
}
curam.debug.log(_bcb.getProperty("curam.UIMController.extract"));
var _bd1=-1;
for(var i=0;i<this.inPageNavItems.length;i++){
this.newTabsTitlesList.push(this.inPageNavItems[i].title);
if(this.inPageNavItems[i].selected==true){
_bd1=i;
}
curam.debug.log(_bcb.getProperty("curam.UIMController.IPN.")+"["+this.inPageNavItems[i].title+", "+this.inPageNavItems[i].href+", "+this.inPageNavItems[i].selected+"]");
}
var _bd2=!(this.compareLists(this.oldTabsTitlesList,this.newTabsTitlesList));
if(_bd2){
this.clearIPNTabs(this);
this.createIPNTabs(this.inPageNavItems);
if(this._tabControllerHidden()){
this.showTabContainer(true);
}
}else{
curam.debug.log(_bcb.getProperty("curam.UIMController.no.change"));
if(_bd1>-1){
var _bd3=this.tabController.getIndexOfChild(this.tabController.selectedChildWidget);
if(_bd3!=_bd1){
curam.debug.log(_bcb.getProperty("curam.UIMController.change")+_bd3+_bcb.getProperty("curam.UIMController.to")+_bd1);
this.toggleIPNTabClickEventListener("off");
this.tabController.selectChild(this.tabController.getChildren()[_bd1]);
this.toggleIPNTabClickEventListener("on");
}
}
}
this.newTabsTitlesList=[];
curam.debug.log(_bcb.getProperty("curam.UIMController.clear")+this.newTabsTitlesList);
this.finishedLoadingTabs=true;
dojo.publish(this.TOPIC_LOADED);
dojo.publish("/curam/tab/labelUpdated");
},_tabControllerHidden:function(){
return dojo.style(this.tabController.domNode,"display")=="none";
},toggleIPNTabClickEventListener:function(_bd4){
if(_bd4=="off"){
if(this.handleIPNTabClickListener!=null){
curam.debug.log(_bcb.getProperty("curam.UIMController.off.listener"));
dojo.unsubscribe(this.handleIPNTabClickListener);
}
}else{
curam.debug.log(_bcb.getProperty("curam.UIMController.on.listener"));
this.handleIPNTabClickListener=this.subscribe(this.ipnTabClickEvent,dojo.hitch(this,this.handleIPNTabClick));
}
},handleIPNTabClick:function(tab){
if(this.finishedLoadingTabs){
curam.debug.log(_bcb.getProperty("curam.UIMController.finishing"));
this.finishedLoadingTabs=false;
this.setURL(this._getURLByTitle(tab.title));
this.loadPage();
}
},createIPNTabs:function(_bd5){
this.toggleIPNTabClickEventListener("off");
if(!this.tabController){
console.error("curam.UIMController.createIPNTabs: "+_bcb.getProperty("uram.UIMController.no.widget")+" '"+this.tabControllerId+"'");
}else{
curam.debug.log("curam.UIMController.createIPNTabs: "+_bcb.getProperty("curam.UIMController.creating.tabs")+_bd5);
var _bd6=null;
for(var i=0;i<_bd5.length;i++){
var cp=new dijit.layout.ContentPane({title:_bd5[i].title});
this.tabController.addChild(cp);
if(_bd5[i].selected==true||_bd6==null){
_bd6=cp;
}
this.oldTabsTitlesList.push(_bd5[i].title);
curam.debug.log("curam.UIMController.createIPNTabs: "+_bcb.getProperty("curam.UIMController.adding.tabs")+_bd5[i].title);
}
this.tabController.startup();
this.tabController.selectChild(_bd6);
}
this.toggleIPNTabClickEventListener("on");
this.newTabsTitlesList=[];
},clearIPNTabs:function(){
curam.debug.log("curam.UIMController.createIPNTabs: "+_bcb.getProperty("curam.UIMController.clearing.tabs")+this.oldTabsTitlesList);
this.toggleIPNTabClickEventListener("off");
this.tabController.destroyDescendants();
this.tabController.selectedChildWidget=null;
this.oldTabsTitlesList=[];
this.toggleIPNTabClickEventListener("on");
curam.debug.log("curam.UIMController.createIPNTabs: "+_bcb.getProperty("curam.UIMController.clearing.notify")+this.oldTabsTitlesList);
},compareLists:function(_bd7,_bd8){
curam.debug.log("curam.UIMController.compareLists: "+_bcb.getProperty("curam.UIMController.comparing.tabs"));
curam.debug.log(_bcb.getProperty("curam.UIMController.tab.list1")+_bd7);
curam.debug.log(_bcb.getProperty("curam.UIMController.tab.list1")+_bd8);
var _bd9=true;
if(_bd7.length!=_bd8.length){
_bd9=false;
}
for(var i=0;i<_bd7.length;i++){
if(_bd7[i]!=_bd8[i]){
_bd9=false;
}
}
curam.debug.log(_bcb.getProperty("curam.UIMController.result")+_bd9);
return _bd9;
},_getURLByTitle:function(_bda){
var url=null;
dojo.forEach(this.inPageNavItems,function(_bdb){
if(_bdb.title==_bda){
url=_bdb.href;
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
},loadPage:function(_bdc){
if(typeof (this.url)=="undefined"||this.url==null){
var e=new Error("curam.UIMController: Cannot load page as URL has not been set");
if(_bdc){
_bdc.errback(e);
}
throw e;
}
if(_bdc){
var st=curam.util.subscribe(this.TOPIC_LOADED,function(){
curam.util.unsubscribe(st);
_bdc.callback();
});
}
var _bdd=this._getFullURL();
curam.debug.log("curam.UIMController.loadPage(): "+_bcb.getProperty("curam.UIMController.set.source")+this.frame.id+" to url: "+_bdd);
dojo.attr(this.frame,"src",_bdd);
},_getFullURL:function(){
if(typeof (this.absoluteURL)!="undefined"&&this.absoluteURL==true){
return this.url;
}
var _bde;
if(this.url.indexOf("?")==-1){
_bde="?";
}else{
_bde="&";
}
var _bdf=curam.config?curam.config.locale:jsL;
var _be0="";
if(window==curam.util.getTopmostWindow()){
_be0=_bdf+"/";
}
if(this.url.indexOf("o3nocache=")==-1){
return _be0+this.url+_bde+curam.util.getCacheBusterParameter();
}else{
return _be0+this.url;
}
},showTabContainer:function(show){
if(show&&!this.hasInPageNavigation()){
curam.debug.log(_bcb.getProperty("curam.UIMController.ignore.reuest"));
return;
}
dojo.style(this.frameWrapper,"top",(show?this.TAB_HEIGHT+7:"0")+"px");
dojo.style(this.tabController.domNode,"display",show?"block":"none");
if(show){
this.tabController.resize();
}
},setDimensionsForModalDialog:function(w,h,_be1){
curam.debug.log("curam.UIMController:setDimensionsForModalDialog() - "+"w="+w+", h="+h);
dojo.style(this.frame,{width:w+"px",height:h+"px"});
dojo.style(this.tabController.domNode,{width:w+"px"});
if(typeof (_be1.inPageNavItems)!="undefined"){
h+=this.TAB_HEIGHT+5;
curam.debug.log("cura.UIMController:setDimensionsForModalDialog() - "+_bcb.getProperty("curam.UIMController.height"));
}
dojo.style(this.domNode,{width:w+"px",height:h+"px"});
},destroy:function(){
this.iframe=null;
this.inPageNavItems=null;
dojo.unsubscribe(this.handleIPNTabClickListener);
this.tabController.destroy();
this.inherited(arguments);
}});
return _bcc;
});
},"curam/debug":function(){
define("curam/debug",["curam/define","curam/util/LocalConfig"],function(_be2,_be3){
_be2.singleton("curam.debug",{log:function(){
if(curam.debug.enabled()){
try{
var a=arguments;
if(!dojo.isIE){
console.log.apply(console,a);
}else{
var _be4=a.length;
var sa=curam.debug._serializeArgument;
switch(_be4){
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
console.log("[Incomplete message - "+(_be4-5)+" message a truncated] "+a[0],sa(a[1]),sa(a[2]),sa(a[3]),sa(a[4]),sa(a[5]));
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
var _be5=typeof arg!="undefined"&&typeof arg.closed!="undefined"&&arg.closed;
if(_be5){
return true;
}else{
return typeof arg!="undefined"&&typeof arg.location!="undefined"&&typeof arg.navigator!="undefined"&&typeof arg.document!="undefined"&&typeof arg.closed!="undefined";
}
},enabled:function(){
return _be3.readOption("jsTraceLog","false")=="true";
},_setup:function(_be6){
_be3.seedOption("jsTraceLog",_be6.trace,"false");
_be3.seedOption("ajaxDebugMode",_be6.ajaxDebug,"false");
_be3.seedOption("asyncProgressMonitor",_be6.asyncProgressMonitor,"false");
}});
return curam.debug;
});
},"dijit/form/ComboBox":function(){
define("dijit/form/ComboBox",["dojo/_base/declare","./ValidationTextBox","./ComboBoxMixin"],function(_be7,_be8,_be9){
return _be7("dijit.form.ComboBox",[_be8,_be9],{});
});
},"dijit/form/_FormMixin":function(){
define("dijit/form/_FormMixin",["dojo/_base/array","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/window"],function(_bea,_beb,_bec,lang,_bed){
return _beb("dijit.form._FormMixin",null,{state:"",_getDescendantFormWidgets:function(_bee){
var res=[];
_bea.forEach(_bee||this.getChildren(),function(_bef){
if("value" in _bef){
res.push(_bef);
}else{
res=res.concat(this._getDescendantFormWidgets(_bef.getChildren()));
}
},this);
return res;
},reset:function(){
_bea.forEach(this._getDescendantFormWidgets(),function(_bf0){
if(_bf0.reset){
_bf0.reset();
}
});
},validate:function(){
var _bf1=false;
return _bea.every(_bea.map(this._getDescendantFormWidgets(),function(_bf2){
_bf2._hasBeenBlurred=true;
var _bf3=_bf2.disabled||!_bf2.validate||_bf2.validate();
if(!_bf3&&!_bf1){
_bed.scrollIntoView(_bf2.containerNode||_bf2.domNode);
_bf2.focus();
_bf1=true;
}
return _bf3;
}),function(item){
return item;
});
},setValues:function(val){
_bec.deprecated(this.declaredClass+"::setValues() is deprecated. Use set('value', val) instead.","","2.0");
return this.set("value",val);
},_setValueAttr:function(obj){
var map={};
_bea.forEach(this._getDescendantFormWidgets(),function(_bf4){
if(!_bf4.name){
return;
}
var _bf5=map[_bf4.name]||(map[_bf4.name]=[]);
_bf5.push(_bf4);
});
for(var name in map){
if(!map.hasOwnProperty(name)){
continue;
}
var _bf6=map[name],_bf7=lang.getObject(name,false,obj);
if(_bf7===undefined){
continue;
}
if(!lang.isArray(_bf7)){
_bf7=[_bf7];
}
if(typeof _bf6[0].checked=="boolean"){
_bea.forEach(_bf6,function(w){
w.set("value",_bea.indexOf(_bf7,w.value)!=-1);
});
}else{
if(_bf6[0].multiple){
_bf6[0].set("value",_bf7);
}else{
_bea.forEach(_bf6,function(w,i){
w.set("value",_bf7[i]);
});
}
}
}
},getValues:function(){
_bec.deprecated(this.declaredClass+"::getValues() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},_getValueAttr:function(){
var obj={};
_bea.forEach(this._getDescendantFormWidgets(),function(_bf8){
var name=_bf8.name;
if(!name||_bf8.disabled){
return;
}
var _bf9=_bf8.get("value");
if(typeof _bf8.checked=="boolean"){
if(/Radio/.test(_bf8.declaredClass)){
if(_bf9!==false){
lang.setObject(name,_bf9,obj);
}else{
_bf9=lang.getObject(name,false,obj);
if(_bf9===undefined){
lang.setObject(name,null,obj);
}
}
}else{
var ary=lang.getObject(name,false,obj);
if(!ary){
ary=[];
lang.setObject(name,ary,obj);
}
if(_bf9!==false){
ary.push(_bf9);
}
}
}else{
var prev=lang.getObject(name,false,obj);
if(typeof prev!="undefined"){
if(lang.isArray(prev)){
prev.push(_bf9);
}else{
lang.setObject(name,[prev,_bf9],obj);
}
}else{
lang.setObject(name,_bf9,obj);
}
}
});
return obj;
},isValid:function(){
return this.state=="";
},onValidStateChange:function(){
},_getState:function(){
var _bfa=_bea.map(this._descendants,function(w){
return w.get("state")||"";
});
return _bea.indexOf(_bfa,"Error")>=0?"Error":_bea.indexOf(_bfa,"Incomplete")>=0?"Incomplete":"";
},disconnectChildren:function(){
_bea.forEach(this._childConnections||[],lang.hitch(this,"disconnect"));
_bea.forEach(this._childWatches||[],function(w){
w.unwatch();
});
},connectChildren:function(_bfb){
var _bfc=this;
this.disconnectChildren();
this._descendants=this._getDescendantFormWidgets();
var set=_bfb?function(name,val){
_bfc[name]=val;
}:lang.hitch(this,"_set");
set("value",this.get("value"));
set("state",this._getState());
var _bfd=(this._childConnections=[]),_bfe=(this._childWatches=[]);
_bea.forEach(_bea.filter(this._descendants,function(item){
return item.validate;
}),function(_bff){
_bea.forEach(["state","disabled"],function(attr){
_bfe.push(_bff.watch(attr,function(){
_bfc.set("state",_bfc._getState());
}));
});
});
var _c00=function(){
if(_bfc._onChangeDelayTimer){
clearTimeout(_bfc._onChangeDelayTimer);
}
_bfc._onChangeDelayTimer=setTimeout(function(){
delete _bfc._onChangeDelayTimer;
_bfc._set("value",_bfc.get("value"));
},10);
};
_bea.forEach(_bea.filter(this._descendants,function(item){
return item.onChange;
}),function(_c01){
_bfd.push(_bfc.connect(_c01,"onChange",_c00));
_bfe.push(_c01.watch("disabled",_c00));
});
},startup:function(){
this.inherited(arguments);
this.connectChildren(true);
this.watch("state",function(attr,_c02,_c03){
this.onValidStateChange(_c03=="");
});
},destroy:function(){
this.disconnectChildren();
this.inherited(arguments);
}});
});
},"dijit/DropDownMenu":function(){
require({cache:{"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n"}});
define("dijit/DropDownMenu",["dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/text!./templates/Menu.html","./_OnDijitClickMixin","./_MenuBase"],function(_c04,_c05,keys,_c06,_c07,_c08){
return _c04("dijit.DropDownMenu",[_c08,_c07],{templateString:_c06,baseClass:"dijitMenu",postCreate:function(){
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
_c05.stop(evt);
break;
case this._closeSubMenuKey:
if(this.parentMenu){
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
}else{
_c05.stop(evt);
}
break;
}
}});
});
},"dojo/data/util/simpleFetch":function(){
define("dojo/data/util/simpleFetch",["dojo/_base/lang","dojo/_base/window","./sorter"],function(lang,_c09,_c0a){
var _c0b=lang.getObject("dojo.data.util.simpleFetch",true);
_c0b.fetch=function(_c0c){
_c0c=_c0c||{};
if(!_c0c.store){
_c0c.store=this;
}
var self=this;
var _c0d=function(_c0e,_c0f){
if(_c0f.onError){
var _c10=_c0f.scope||_c09.global;
_c0f.onError.call(_c10,_c0e,_c0f);
}
};
var _c11=function(_c12,_c13){
var _c14=_c13.abort||null;
var _c15=false;
var _c16=_c13.start?_c13.start:0;
var _c17=(_c13.count&&(_c13.count!==Infinity))?(_c16+_c13.count):_c12.length;
_c13.abort=function(){
_c15=true;
if(_c14){
_c14.call(_c13);
}
};
var _c18=_c13.scope||_c09.global;
if(!_c13.store){
_c13.store=self;
}
if(_c13.onBegin){
_c13.onBegin.call(_c18,_c12.length,_c13);
}
if(_c13.sort){
_c12.sort(_c0a.createSortFunction(_c13.sort,self));
}
if(_c13.onItem){
for(var i=_c16;(i<_c12.length)&&(i<_c17);++i){
var item=_c12[i];
if(!_c15){
_c13.onItem.call(_c18,item,_c13);
}
}
}
if(_c13.onComplete&&!_c15){
var _c19=null;
if(!_c13.onItem){
_c19=_c12.slice(_c16,_c17);
}
_c13.onComplete.call(_c18,_c19,_c13);
}
};
this._fetchItems(_c0c,_c11,_c0d);
return _c0c;
};
return _c0b;
});
},"url:curam/layout/resources/UIMController.html":"<div id=\"uimcontroller_${uid}\" class=\"uimcontroller_${uid} uimController ${classList}\" data-dojo-attach-point=\"uimController\">\r\n  <div style=\"display:none;\" \r\n       id=\"uimcontroller_tc_${uid}\" \r\n       class=\"ipnTabController in-page-nav-tabContainer\"\r\n       data-dojo-attach-point=\"tabController\" \r\n       data-dojo-type=\"curam.layout.TabContainer\">\r\n  </div>\r\n  <div class=\"contentPanelFrameWrapper\"  \r\n        data-dojo-attach-point=\"frameWrapper\">\r\n    <iframe frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\"\r\n             allowTransparency=\"true\" \r\n             id=\"${iframeId}\" \r\n             data-dojo-attach-point=\"frame\"                 \r\n             class=\"${iframeId} ${iframeClassList}\"\r\n             iscpiframe=\"${iscpiframe}\"\r\n             title=\"${title}\" >\r\n    </iframe>\r\n  </div> \r\n</div>","dijit/Menu":function(){
define("dijit/Menu",["require","dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window","dojo/window","./popup","./DropDownMenu","dojo/ready"],function(_c1a,_c1b,_c1c,_c1d,dom,_c1e,_c1f,_c20,_c21,keys,lang,on,has,win,_c22,pm,_c23,_c24){
if(!_c21.isAsync){
_c24(0,function(){
var _c25=["dijit/MenuItem","dijit/PopupMenuItem","dijit/CheckedMenuItem","dijit/MenuSeparator"];
_c1a(_c25);
});
}
return _c1c("dijit.Menu",_c23,{constructor:function(){
this._bindings=[];
},targetNodeIds:[],contextMenuForWindow:false,leftClickToOpen:false,refocus:true,postCreate:function(){
if(this.contextMenuForWindow){
this.bindDomNode(win.body());
}else{
_c1b.forEach(this.targetNodeIds,this.bindDomNode,this);
}
this.inherited(arguments);
},_iframeContentWindow:function(_c26){
return _c22.get(this._iframeContentDocument(_c26))||this._iframeContentDocument(_c26)["__parent__"]||(_c26.name&&win.doc.frames[_c26.name])||null;
},_iframeContentDocument:function(_c27){
return _c27.contentDocument||(_c27.contentWindow&&_c27.contentWindow.document)||(_c27.name&&win.doc.frames[_c27.name]&&win.doc.frames[_c27.name].document)||null;
},bindDomNode:function(node){
node=dom.byId(node);
var cn;
if(node.tagName.toLowerCase()=="iframe"){
var _c28=node,_c29=this._iframeContentWindow(_c28);
cn=win.withGlobal(_c29,win.body);
}else{
cn=(node==win.body()?win.doc.documentElement:node);
}
var _c2a={node:node,iframe:_c28};
_c1e.set(node,"_dijitMenu"+this.id,this._bindings.push(_c2a));
var _c2b=lang.hitch(this,function(cn){
return [on(cn,this.leftClickToOpen?"click":"contextmenu",lang.hitch(this,function(evt){
_c1d.stop(evt);
this._scheduleOpen(evt.target,_c28,{x:evt.pageX,y:evt.pageY});
})),on(cn,"keydown",lang.hitch(this,function(evt){
if(evt.shiftKey&&evt.keyCode==keys.F10){
_c1d.stop(evt);
this._scheduleOpen(evt.target,_c28);
}
}))];
});
_c2a.connects=cn?_c2b(cn):[];
if(_c28){
_c2a.onloadHandler=lang.hitch(this,function(){
var _c2c=this._iframeContentWindow(_c28);
cn=win.withGlobal(_c2c,win.body);
_c2a.connects=_c2b(cn);
});
if(_c28.addEventListener){
_c28.addEventListener("load",_c2a.onloadHandler,false);
}else{
_c28.attachEvent("onload",_c2a.onloadHandler);
}
}
},unBindDomNode:function(_c2d){
var node;
try{
node=dom.byId(_c2d);
}
catch(e){
return;
}
var _c2e="_dijitMenu"+this.id;
if(node&&_c1e.has(node,_c2e)){
var bid=_c1e.get(node,_c2e)-1,b=this._bindings[bid],h;
while(h=b.connects.pop()){
h.remove();
}
var _c2f=b.iframe;
if(_c2f){
if(_c2f.removeEventListener){
_c2f.removeEventListener("load",b.onloadHandler,false);
}else{
_c2f.detachEvent("onload",b.onloadHandler);
}
}
_c1e.remove(node,_c2e);
delete this._bindings[bid];
}
},_scheduleOpen:function(_c30,_c31,_c32){
if(!this._openTimer){
this._openTimer=setTimeout(lang.hitch(this,function(){
delete this._openTimer;
this._openMyself({target:_c30,iframe:_c31,coords:_c32});
}),1);
}
},_openMyself:function(args){
var _c33=args.target,_c34=args.iframe,_c35=args.coords;
if(_c35){
if(_c34){
var ifc=_c1f.position(_c34,true),_c36=this._iframeContentWindow(_c34),_c37=win.withGlobal(_c36,"_docScroll",dojo);
var cs=_c20.getComputedStyle(_c34),tp=_c20.toPixelValue,left=(has("ie")&&has("quirks")?0:tp(_c34,cs.paddingLeft))+(has("ie")&&has("quirks")?tp(_c34,cs.borderLeftWidth):0),top=(has("ie")&&has("quirks")?0:tp(_c34,cs.paddingTop))+(has("ie")&&has("quirks")?tp(_c34,cs.borderTopWidth):0);
_c35.x+=ifc.x+left-_c37.x;
_c35.y+=ifc.y+top-_c37.y;
}
}else{
_c35=_c1f.position(_c33,true);
_c35.x+=10;
_c35.y+=10;
}
var self=this;
var _c38=this._focusManager.get("prevNode");
var _c39=this._focusManager.get("curNode");
var _c3a=!_c39||(dom.isDescendant(_c39,this.domNode))?_c38:_c39;
function _c3b(){
if(self.refocus&&_c3a){
_c3a.focus();
}
pm.close(self);
};
pm.open({popup:this,x:_c35.x,y:_c35.y,onExecute:_c3b,onCancel:_c3b,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){
this.inherited("_onBlur",arguments);
pm.close(this);
};
},uninitialize:function(){
_c1b.forEach(this._bindings,function(b){
if(b){
this.unBindDomNode(b.node);
}
},this);
this.inherited(arguments);
}});
});
},"curam/widget/DivButton":function(){
require({cache:{"url:curam/widget/resources/DivButton.html":"<div id=\"${id}\" class=\"${className}\" dojoAttachEvent=\"onclick:onClick\" dojoAttachPoint=\"containerNode\"></div>\r\n\r\n {\r\n      templateString: \"<div id='${id}' class='${className}' \"\r\n            + \"dojoAttachEvent='onclick:onClick' dojoAttachPoint='containerNode'></div>\"\r\n    }\r\n\r\n"}});
define("curam/widget/DivButton",["curam/util","curam/matrix/Constants","dojo/text!curam/widget/resources/DivButton.html","dijit/_Widget","dijit/_Templated"],function(util,_c3c,_c3d){
var _c3e=dojo.declare("curam.widget.DivButtonBase",dijit._Widget,{isContainer:true,disabled:false,menuId:"",id:"",className:"",postCreate:function(args,frag){
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
var _c3f=dojo.create("span",{},this.domNode,"before");
}
dojo.body().appendChild(this.domNode);
if(_c3f){
dojo.place(this.domNode,_c3f,"before");
dojo.destroy(_c3f);
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
if(_c3c.container.matrix.isValidationActive()){
if(menu.isShowingNow){
menu.close();
}
return false;
}
return true;
},_setActiveMenu:function(_c40){
var menu=dijit.byId(_c40);
if(!menu){
return;
}
if(menu.isShowingNow){
this.setActiveMenuId();
}
},_toggleMenu:function(_c41,_c42){
this._setActiveMenu(_c41);
dijit.byId(_c41).setButton(this);
}});
var _c43=dojo.declare("curam.widget.DivButton",[curam.widget.DivButtonBase,dijit._Templated],{templateString:_c3d});
dojo.declare("curam.widget.QuestionButton",curam.widget.DivButtonBase,{postCreate:function(){
this.className+="number number-col-eval q-ct-eval-"+this.qId;
util.connect(this.domNode,"onmouseover",dojo.hitch(this,this.onMouseOver));
this.inherited(arguments);
},onMouseOver:function(_c44){
curam.matrix.util.buttonMouseOver(_c44);
},_toggleMenu:function(_c45,_c46){
this._setActiveMenu(_c45);
dijit.byId(_c45).setButton(this);
},setActiveMenuId:function(){
window.activeMenuID=this.domNode.parentNode.id;
}});
dojo.declare("curam.widget.AnswerButton",curam.widget.DivButtonBase,{className:"image",_toggleMenu:function(_c47,_c48){
this._setActiveMenu(_c47);
var menu=dijit.byId(_c47);
var node=_c48.target?_c48.target:_c48;
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
dojo.declare("curam.widget.CombinationButton",curam.widget.DivButtonBase,{className:"image",_toggleMenu:function(_c49,_c4a){
this._setActiveMenu(_c49);
dijit.byId(_c49).setButton(this);
var node=_c4a.target?_c4a.target:_c4a;
var menu=dijit.byId(_c49);
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
},_toggleMenu:function(_c4b,_c4c){
this._setActiveMenu(_c4b);
dijit.byId(_c4b).setButton(this);
}});
dojo.declare("curam.widget.ScoreButton",curam.widget.PriorityButton,{});
return _c3e;
});
},"curam/layout/CuramTabContainer":function(){
define("curam/layout/CuramTabContainer",["dijit/layout/TabContainer","curam/layout/ScrollingTabController"],function(_c4d){
var _c4e=dojo.declare("curam.layout.CuramTabContainer",_c4d,{postMixInProperties:function(){
if(!this.controllerWidget){
this.controllerWidget=(this.tabPosition=="top"||this.tabPosition=="bottom")&&!this.nested?"curam.layout.ScrollingTabController":"dijit.layout.TabController";
}
this.inherited(arguments);
}});
return _c4e;
});
},"dijit/layout/ContentPane":function(){
define("dijit/layout/ContentPane",["dojo/_base/kernel","dojo/_base/lang","../_Widget","./_ContentPaneResizeMixin","dojo/string","dojo/html","dojo/i18n!../nls/loading","dojo/_base/array","dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-attr","dojo/_base/window","dojo/_base/xhr","dojo/i18n"],function(_c4f,lang,_c50,_c51,_c52,html,_c53,_c54,_c55,_c56,dom,_c57,win,xhr,i18n){
var _c58=typeof (dojo.global.perf)!="undefined";
return _c55("dijit.layout.ContentPane",[_c50,_c51],{href:"",content:"",extractContent:false,parseOnLoad:true,parserScope:_c4f._scopeName,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'><span class='dijitInline dijitIconLoading'></span>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'><span class='dijitInline dijitIconError'></span>${errorState}</span>",isLoaded:false,baseClass:"dijitContentPane",ioArgs:{},onLoadDeferred:null,_setTitleAttr:null,stopParser:true,template:false,create:function(_c59,_c5a){
if((!_c59||!_c59.template)&&_c5a&&!("href" in _c59)&&!("content" in _c59)){
var df=win.doc.createDocumentFragment();
_c5a=dom.byId(_c5a);
while(_c5a.firstChild){
df.appendChild(_c5a.firstChild);
}
_c59=lang.delegate(_c59,{content:df});
}
this.inherited(arguments,[_c59,_c5a]);
},postMixInProperties:function(){
this.inherited(arguments);
var _c5b=i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=_c52.substitute(this.loadingMessage,_c5b);
this.errorMessage=_c52.substitute(this.errorMessage,_c5b);
},buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
this.domNode.title="";
if(!_c57.get(this.domNode,"role")){
this.domNode.setAttribute("role","group");
}
this.domNode.removeAttribute("title");
},startup:function(){
this.inherited(arguments);
if(this._contentSetter){
_c54.forEach(this._contentSetter.parseResults,function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
},this);
}
},setHref:function(href){
_c4f.deprecated("dijit.layout.ContentPane.setHref() is deprecated. Use set('href', ...) instead.","","2.0");
return this.set("href",href);
},_setHrefAttr:function(href){
this.cancel();
this.onLoadDeferred=new _c56(lang.hitch(this,"cancel"));
this.onLoadDeferred.addCallback(lang.hitch(this,"onLoad"));
this._set("href",href);
if(this.preload||(this._created&&this._isShown())){
this._load();
}else{
this._hrefChanged=true;
}
return this.onLoadDeferred;
},setContent:function(data){
_c4f.deprecated("dijit.layout.ContentPane.setContent() is deprecated.  Use set('content', ...) instead.","","2.0");
this.set("content",data);
},_setContentAttr:function(data){
this._set("href","");
this.cancel();
this.onLoadDeferred=new _c56(lang.hitch(this,"cancel"));
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
},destroyRecursive:function(_c5c){
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
this.onLoadDeferred=new _c56(lang.hitch(this,"cancel"));
this.onLoadDeferred.addCallback(lang.hitch(this,"onLoad"));
this._load();
return this.onLoadDeferred;
},_load:function(){
if(_c58){
perf.widgetStartedLoadingCallback();
}
this._setContent(this.onDownloadStart(),true);
var self=this;
var _c5d={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(lang.isObject(this.ioArgs)){
lang.mixin(_c5d,this.ioArgs);
}
var hand=(this._xhrDfd=(this.ioMethod||xhr.get)(_c5d));
hand.addCallback(function(html){
try{
self._isDownloaded=true;
self._setContent(html,false);
self.onDownloadEnd();
}
catch(err){
self._onError("Content",err);
}
if(_c58){
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
},destroyDescendants:function(_c5e){
if(this.isLoaded){
this._onUnloadHandler();
}
var _c5f=this._contentSetter;
_c54.forEach(this.getChildren(),function(_c60){
if(_c60.destroyRecursive){
_c60.destroyRecursive(_c5e);
}
});
if(_c5f){
_c54.forEach(_c5f.parseResults,function(_c61){
if(_c61.destroyRecursive&&_c61.domNode&&_c61.domNode.parentNode==win.body()){
_c61.destroyRecursive(_c5e);
}
});
delete _c5f.parseResults;
}
if(!_c5e){
html._emptyNode(this.containerNode);
}
delete this._singleChild;
},_setContent:function(cont,_c62){
this.destroyDescendants();
var _c63=this._contentSetter;
if(!(_c63&&_c63 instanceof html._ContentSetter)){
_c63=this._contentSetter=new html._ContentSetter({node:this.containerNode,_onError:lang.hitch(this,this._onError),onContentError:lang.hitch(this,function(e){
var _c64=this.onContentError(e);
try{
this.containerNode.innerHTML=_c64;
}
catch(e){
console.error("Fatal "+this.id+" could not change content due to "+e.message,e);
}
})});
}
var _c65=lang.mixin({cleanContent:this.cleanContent,extractContent:this.extractContent,parseContent:!cont.domNode&&this.parseOnLoad,parserScope:this.parserScope,startup:false,dir:this.dir,lang:this.lang,textDir:this.textDir},this._contentSetterParams||{});
_c63.set((lang.isObject(cont)&&cont.domNode)?cont.domNode:cont,_c65);
delete this._contentSetterParams;
if(this.doLayout){
this._checkIfSingleChild();
}
if(!_c62){
if(this._started){
delete this._started;
this.startup();
this._scheduleLayout();
}
this._onLoadHandler(cont);
}
},_onError:function(type,err,_c66){
this.onLoadDeferred.errback(err);
var _c67=this["on"+type+"Error"].call(this,err);
if(_c66){
console.error(_c66,err);
}else{
if(_c67){
this._setContent(_c67,true);
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
var _c68=dojo.declare("curam.pagination.ControlPanel",null,{first:"FIRST",last:"LAST",previous:"PREV",next:"NEXT",page:"GOTO_PAGE",pageSize:"PAGE_SIZE",rowInfo:"ROW_INFO",classFirst:"first",classLast:"last",classPrevious:"previous",classNext:"next",classPage:"page",classDisplayInfo:"display_info",_controls:undefined,currentPage:0,lastPage:9999,currentPageSize:0,directLinkRangeWidth:3,parentNode:undefined,handlers:undefined,directLinksDisconnects:undefined,constructor:function(_c69){
this._controls={};
this.handlers={};
this.directLinksDisconnects=[];
var loc=this._localize;
var ul=dojo.create("ul",null,_c69);
dojo.addClass(ul,"pagination-control-list");
this._controls[this.pageSize]=this._createDropdownControl(this.pageSize,loc("pageSize_title"),ul);
this._controls[this.rowInfo]=this._createDisplayControl(this.rowInfo,loc("pagination_info",["$dummy$","$dummy$","$dummy$"]),ul,null,null);
this._controls[this.first]=this._createLinkControl(this.first,loc("firstPage_btn"),ul,null,this.classFirst,loc("firstPage_title"));
this._controls[this.previous]=this._createLinkControl(this.previous,loc("prevPage_btn"),ul,null,this.classPrevious,loc("prevPage_title"));
this._controls[this.page]=[];
this._controls[this.page].push(this._createLinkControl(this.page,"direct-page-links-section",ul,null,this.classPage,loc("page_title")));
this._controls[this.next]=this._createLinkControl(this.next,loc("nextPage_btn"),ul,null,this.classNext,loc("nextPage_title"));
this._controls[this.last]=this._createLinkControl(this.last,loc("lastPage_btn"),ul,null,this.classLast,loc("lastPage_title"));
this.parentNode=_c69;
dojo.style(_c69,{"display":""});
},_localize:function(_c6a,_c6b){
var _c6c=curam.pagination.localizedStrings[_c6a];
if(!_c6b){
return _c6c;
}
for(var i=0;i<_c6b.length;i++){
_c6c=_c6c.replace(/%s/i,_c6b[i]);
}
return _c6c;
},_createLinkControl:function(_c6d,text,_c6e,_c6f,_c70,_c71){
var cls=_c70!=null?_c70:"";
var li=dojo.create("li",{"id":_c6d,"class":cls},_c6e,_c6f);
dojo.addClass(li,"pagination-control-list-item enabled");
var a=dojo.create("a",{"innerHTML":text,"href":"#","title":_c71},li);
dojo.addClass(a,"pagination-link");
if(_c6d==this.first||_c6d==this.last||_c6d==this.previous||_c6d==this.next){
if(curam.util.highContrastModeType()){
var _c72="../CDEJ/themes/v6/images/high-contrast/"+_c6d+"-contrast"+".png";
dojo.create("img",{"src":_c72,"alt":_c71},a);
}else{
var _c72="../CDEJ/themes/v6/images/"+_c6d+".png";
dojo.create("img",{"src":_c72,"alt":_c71},a);
}
}else{
var text=dojo.create("p",{"innerHTML":text},li);
dojo.addClass(text,"pagination-text");
}
return li;
},_createDropdownControl:function(_c73,text,_c74,_c75){
var li=dojo.create("li",{"id":_c73},_c74,_c75);
dojo.addClass(li,"pagination-control-list-item");
var _c76="page-size-select"+new Date().getTime();
var _c77=dojo.create("label",{"innerHTML":text+": ","for":_c76},li);
dojo.addClass(_c77,"pagination-page-size-dropdown-label");
var _c78=dojo.create("select",{"title":text,"id":_c76},li);
li._type="dropdown";
return li;
},_createDisplayControl:function(_c79,text,_c7a,_c7b,_c7c){
var cls=_c7c!=null?_c7c:"";
var li=dojo.create("li",{"id":_c79,"class":cls},_c7a,_c7b);
dojo.addClass(li,"pagination-control-list-item");
var text=dojo.create("p",{"innerHTML":"["+text+"]"},li);
return li;
},updateState:function(_c7d){
curam.debug.log("curam.pagination.ControlPanel.updateState: ",_c7d);
if(typeof (_c7d.first)!="undefined"){
this._setEnabled(this._controls[this.first],_c7d.first);
}
if(typeof (_c7d.previous)!="undefined"){
this._setEnabled(this._controls[this.previous],_c7d.previous);
}
if(typeof (_c7d.next)!="undefined"){
this._setEnabled(this._controls[this.next],_c7d.next);
}
if(typeof (_c7d.last)!="undefined"){
this._setEnabled(this._controls[this.last],_c7d.last);
}
if(typeof (_c7d.currentPage)!="undefined"){
this.currentPage=_c7d.currentPage;
}
if(typeof (_c7d.lastPage)!="undefined"){
this.lastPage=_c7d.lastPage;
}
if(typeof (_c7d.currentPageSize)!="undefined"){
this.currentPageSize=_c7d.currentPageSize;
}
if(typeof (_c7d.directLinkRangeWidth)!="undefined"){
this.directLinkRangeWidth=_c7d.directLinkRangeWidth;
}
if(typeof (_c7d.rowInfo)!="undefined"){
var _c7e=this._controls[this.rowInfo].previousSibling;
dojo.destroy(this._controls[this.rowInfo]);
var _c7f=_c7d.rowInfo[0];
var end=_c7d.rowInfo[1];
var _c80=_c7d.rowInfo[2];
var _c81=this._localize("pagination_info",[_c7f,end,_c80]);
this._controls[this.rowInfo]=this._createDisplayControl(this.rowInfo,_c81,_c7e,"after",this.classDisplayInfo);
}
if(typeof (_c7d.pageSizeOptions)!="undefined"){
var _c82=dojo.query("select",this._controls[this.pageSize])[0];
dojo.forEach(_c82.childNodes,function(item){
dojo.destroy(item);
});
for(var i=0;i<_c7d.pageSizeOptions.length;i++){
var _c83=_c7d.pageSizeOptions[i];
var _c84=dojo.create("option",{"value":_c83,"innerHTML":_c83},_c82);
if(_c83==this.currentPageSize){
dojo.attr(_c84,"selected","selected");
}
}
}
this._updateDirectLinks();
var _c85=dijit.byId("content");
if(_c85){
_c85.resize();
}
},setHandlers:function(_c86){
curam.debug.log("curam.pagination.ControlPanel.setHandlers: ",_c86);
this.handlers=_c86;
if(_c86.first){
this._connectSimpleHandler(this._controls[this.first],_c86.first);
}
if(_c86.previous){
this._connectSimpleHandler(this._controls[this.previous],_c86.previous);
}
if(_c86.next){
this._connectSimpleHandler(this._controls[this.next],_c86.next);
}
if(_c86.last){
this._connectSimpleHandler(this._controls[this.last],_c86.last);
}
if(_c86.page){
this._connectDirectLinkHandlers(_c86.page);
}
if(_c86.pageSize){
var _c87=dojo.query("select",this._controls[this.pageSize])[0];
dojo.connect(_c87,"onchange",dojo.hitch(this,function(_c88){
var _c89=_c88.target.value;
this.currentPageSize=_c89;
_c86.pageSize(this.currentPageSize);
var _c8a=dojo.query("option",_c87);
_c8a.forEach(function(_c8b){
if(dojo.attr(_c8b,"value")==_c89){
dojo.attr(_c8b,"selected","selected");
}else{
dojo.removeAttr(_c8b,"selected");
}
});
}));
}
},_connectSimpleHandler:function(_c8c,_c8d){
var h=_c8d?_c8d:_c8c._handler;
this._removeSimpleHandler(_c8c);
var _c8e=curam.util.connect(_c8c,"onclick",function(_c8f){
dojo.stopEvent(_c8f);
h();
});
_c8c._handler=h;
_c8c._disconnect=_c8e;
},_removeSimpleHandler:function(_c90){
if(_c90._disconnect){
curam.util.disconnect(_c90._disconnect);
}
},reset:function(){
curam.debug.log("curam.pagination.ControlPanel.reset");
},_getDirectLinkPageNumbers:function(){
var _c91=2*this.directLinkRangeWidth+1;
var p=this.currentPage;
var _c92=[];
var num=p>this.directLinkRangeWidth?p-this.directLinkRangeWidth:1;
for(var i=0;i<_c91;i++){
_c92[i]=num++;
if(num>this.lastPage){
break;
}
}
return _c92;
},_updateDirectLinks:function(){
curam.debug.log("curam.pagination.ControlPanel._updateDirectLinks");
var loc=this._localize;
var _c93=this._controls[this.page];
dojo.query("div.pagination-direct-links-dots").forEach(dojo.destroy);
var _c94=_c93[0].previousSibling;
dojo.style(this.parentNode,"display","none");
for(var i=0;i<_c93.length;i++){
if(_c93._dots){
dojo.destroy(_c93._dots);
}
dojo.destroy(_c93[i]);
_c93[i]=undefined;
}
this._controls[this.page]=[];
_c93=this._controls[this.page];
var _c95=this._getDirectLinkPageNumbers();
for(var i=0;i<_c95.length;i++){
var _c96=_c95[i];
_c93[i]=this._createLinkControl(this.page+"("+_c96+")",_c96,_c94,"after",null,loc("page_title")+" "+_c96);
dojo.addClass(_c93[i],"pagination-direct-link");
if(_c96==this.currentPage){
dojo.addClass(_c93[i],"selected");
}
_c94=_c93[i];
_c93[i]._pageNum=_c96;
}
var _c97=_c93[0];
dojo.addClass(_c97,"firstDirectLink");
if(_c95[0]>1){
dojo.addClass(_c97,"has-previous");
var dots=dojo.create("div",{innerHTML:"..."},_c97,"before");
dojo.addClass(dots,"pagination-direct-links-dots");
}
var _c98=_c93[_c93.length-1];
dojo.addClass(_c98,"lastDirectLink");
if(_c95[_c95.length-1]<this.lastPage){
dojo.addClass(_c98,"has-next");
var dots=dojo.create("div",{innerHTML:"..."},_c98,"after");
dojo.addClass(dots,"pagination-direct-links-dots");
}
if(this.handlers.page){
this._connectDirectLinkHandlers(this.handlers.page);
}
dojo.style(this.parentNode,"display","");
},_connectDirectLinkHandlers:function(_c99){
dojo.forEach(this.directLinksDisconnects,dojo.disconnect);
this.directLinksDisconnects=[];
var _c9a=this._controls[this.page];
for(var i=0;i<_c9a.length;i++){
var _c9b=_c9a[i];
var h=function(_c9c){
dojo.stopEvent(_c9c);
_c99(this._pageNum);
};
h._pageNum=_c9b._pageNum;
this.directLinksDisconnects.push(dojo.connect(_c9b,"onclick",h));
}
},_setEnabled:function(_c9d,_c9e){
if(_c9e){
this._connectSimpleHandler(_c9d);
dojo.replaceClass(_c9d,"enabled","disabled");
}else{
this._removeSimpleHandler(_c9d);
dojo.replaceClass(_c9d,"disabled","enabled");
}
}});
return _c68;
});
},"curam/util/RuntimeContext":function(){
define("curam/util/RuntimeContext",[],function(){
var _c9f=dojo.declare("curam.util.RuntimeContext",null,{_window:null,constructor:function(_ca0){
this._window=_ca0;
},getHref:function(){
return this._window.location.href;
},getPathName:function(){
return this._window.location.pathName;
},contextObject:function(){
return this._window;
}});
return _c9f;
});
},"url:dijit/form/templates/ValidationTextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","url:dijit/form/templates/TextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","dijit/layout/utils":function(){
define("dijit/layout/utils",["dojo/_base/array","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang",".."],function(_ca1,_ca2,_ca3,_ca4,lang,_ca5){
var _ca6=lang.getObject("layout",true,_ca5);
_ca6.marginBox2contentBox=function(node,mb){
var cs=_ca4.getComputedStyle(node);
var me=_ca3.getMarginExtents(node,cs);
var pb=_ca3.getPadBorderExtents(node,cs);
return {l:_ca4.toPixelValue(node,cs.paddingLeft),t:_ca4.toPixelValue(node,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)};
};
function _ca7(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
};
function size(_ca8,dim){
var _ca9=_ca8.resize?_ca8.resize(dim):_ca3.setMarginBox(_ca8.domNode,dim);
if(_ca8.fakeWidget){
return;
}
if(_ca9){
lang.mixin(_ca8,_ca9);
}else{
lang.mixin(_ca8,_ca3.getMarginBoxSimple(_ca8.domNode));
lang.mixin(_ca8,dim);
}
};
_ca6.layoutChildren=function(_caa,dim,_cab,_cac,_cad){
dim=lang.mixin({},dim);
_ca2.add(_caa,"dijitLayoutContainer");
_cab=_ca1.filter(_cab,function(item){
return item.region!="center"&&item.layoutAlign!="client";
}).concat(_ca1.filter(_cab,function(item){
return item.region=="center"||item.layoutAlign=="client";
}));
var _cae={};
_ca1.forEach(_cab,function(_caf){
var elm=_caf.domNode,pos=(_caf.region||_caf.layoutAlign);
if(!pos){
throw new Error("No region setting for "+_caf.id);
}
var _cb0=elm.style;
_cb0.left=dim.l+"px";
_cb0.top=dim.t+"px";
_cb0.position="absolute";
_ca2.add(elm,"dijitAlign"+_ca7(pos));
var _cb1={};
if(_cac&&_cac==_caf.id){
_cb1[_caf.region=="top"||_caf.region=="bottom"?"h":"w"]=_cad;
}
if(pos=="top"||pos=="bottom"){
_cb1.w=dim.w;
size(_caf,_cb1);
dim.h-=_caf.h;
if(pos=="top"){
dim.t+=_caf.h;
}else{
_cb0.top=dim.t+dim.h+"px";
}
}else{
if(pos=="left"||pos=="right"){
_cb1.h=dim.h;
size(_caf,_cb1);
dim.w-=_caf.w;
if(pos=="left"){
dim.l+=_caf.w;
}else{
_cb0.left=dim.l+dim.w+"px";
}
}else{
if(pos=="client"||pos=="center"){
size(_caf,dim);
}
}
}
_cae[pos]={w:dim.w,h:dim.h};
});
return _cae;
};
return {marginBox2contentBox:_ca6.marginBox2contentBox,layoutChildren:_ca6.layoutChildren};
});
},"dijit/_Contained":function(){
define("dijit/_Contained",["dojo/_base/declare","./registry"],function(_cb2,_cb3){
return _cb2("dijit._Contained",null,{_getSibling:function(_cb4){
var node=this.domNode;
do{
node=node[_cb4+"Sibling"];
}while(node&&node.nodeType!=1);
return node&&_cb3.byNode(node);
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
define("dijit/_KeyNavContainer",["dojo/_base/kernel","./_Container","./_FocusMixin","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/event","dojo/dom-attr","dojo/_base/lang"],function(_cb5,_cb6,_cb7,_cb8,keys,_cb9,_cba,_cbb,lang){
return _cb9("dijit._KeyNavContainer",[_cb7,_cb6],{tabIndex:"0",connectKeyNavHandlers:function(_cbc,_cbd){
var _cbe=(this._keyNavCodes={});
var prev=lang.hitch(this,"focusPrev");
var next=lang.hitch(this,"focusNext");
_cb8.forEach(_cbc,function(code){
_cbe[code]=prev;
});
_cb8.forEach(_cbd,function(code){
_cbe[code]=next;
});
_cbe[keys.HOME]=lang.hitch(this,"focusFirstChild");
_cbe[keys.END]=lang.hitch(this,"focusLastChild");
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
this.connect(this.domNode,"onfocus","_onContainerFocus");
},startupKeyNavChildren:function(){
_cb5.deprecated("startupKeyNavChildren() call no longer needed","","2.0");
},startup:function(){
this.inherited(arguments);
_cb8.forEach(this.getChildren(),lang.hitch(this,"_startupChild"));
},addChild:function(_cbf,_cc0){
this.inherited(arguments);
this._startupChild(_cbf);
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
},focusChild:function(_cc1,last){
if(!_cc1){
return;
}
if(this.focusedChild&&_cc1!==this.focusedChild){
this._onChildBlur(this.focusedChild);
}
_cc1.set("tabIndex",this.tabIndex);
_cc1.focus(last?"end":"start");
this._set("focusedChild",_cc1);
},_startupChild:function(_cc2){
_cc2.set("tabIndex","-1");
this.connect(_cc2,"_onFocus",function(){
_cc2.set("tabIndex",this.tabIndex);
});
this.connect(_cc2,"_onBlur",function(){
_cc2.set("tabIndex","-1");
});
},_onContainerFocus:function(evt){
if(evt.target!==this.domNode||this.focusedChild){
return;
}
this.focusFirstChild();
_cbb.set(this.domNode,"tabIndex","-1");
},_onBlur:function(evt){
if(this.tabIndex){
_cbb.set(this.domNode,"tabIndex",this.tabIndex);
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
_cba.stop(evt);
}
},_onChildBlur:function(){
},_getFirstFocusableChild:function(){
return this._getNextFocusableChild(null,1);
},_getLastFocusableChild:function(){
return this._getNextFocusableChild(null,-1);
},_getNextFocusableChild:function(_cc3,dir){
if(_cc3){
_cc3=this._getSiblingOfChild(_cc3,dir);
}
var _cc4=this.getChildren();
for(var i=0;i<_cc4.length;i++){
if(!_cc3){
_cc3=_cc4[(dir>0)?0:(_cc4.length-1)];
}
if(_cc3.isFocusable()){
return _cc3;
}
_cc3=this._getSiblingOfChild(_cc3,dir);
}
return null;
}});
});
},"curam/ui/SectionShortcutsPanel":function(){
define("curam/ui/SectionShortcutsPanel",["curam/define","curam/tab","curam/util","curam/ui/UIController"],function(){
var _cc5=curam.define.singleton("curam.ui.SectionShortcutsPanel",{handleClickOnAnchorElement:function(_cc6,_cc7){
if(!_cc7){
curam.tab.getTabController().handleUIMPageID(_cc6);
}else{
curam.ui.SectionShortcutsPanel.openInModal(_cc6);
}
},handleClick:function(_cc8,item){
var _cc9=eval(_cc8+"JsonStore");
var _cca=_cc9.getValue(item,"pageID");
var _ccb=_cc9.getValue(item,"openInModal");
if(!_ccb){
curam.tab.getTabController().handleUIMPageID(_cca);
}else{
curam.ui.SectionShortcutsPanel.openInModal(_cca);
}
},openInModal:function(_ccc){
var _ccd=_ccc+"Page.do";
var _cce={};
curam.tab.getTabController().handleLinkClick(_ccd,_cce);
},setupCleanupScript:function(_ccf){
dojo.ready(function(){
var _cd0=eval(_ccf+"JsonStore");
dojo.addOnWindowUnload(function(){
_cd0.close();
});
});
}});
return _cc5;
});
},"curam/util/WordFileEdit":function(){
define("curam/util/WordFileEdit",["curam/define","dijit/DialogUnderlay","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _cd1=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.WordFileEdit",{_clickedFinish:false,_buttonIdPart:"__o3btn.",searchWindow:null,cantLoadControlMsg:"$unlocalized$ cannot load Word integration control",cantSubmitMsg:"$unlocalized$ cannot submit data",searchWindowTitlePrefix:"SEARCH",useApplet:(function(){
return typeof dojo.isIE=="undefined";
})(),controlAttributes:{},controlParameters:{},submitSaveWordFileEdit:function(_cd2,_cd3){
try{
var _cd4=curam.util.WordFileEdit.getParentWindow();
var _cd5=curam.util.WordFileEdit._findTextArea(_cd4,_cd2);
_cd5.value=_cd3;
_cd4.document.forms[0].submit();
}
catch(e){
alert("Error saving: "+dojo.toJson(e));
}
return;
},openWordFileEditWindow:function(_cd6,_cd7,_cd8){
if(curam.util.WordFileEdit.getSearchPage().length>0){
curam.util.WordFileEdit.displaySearchWindow(_cd6,_cd7,_cd8);
}else{
curam.util.WordFileEdit.doOpenWordFileEditWindow(_cd6,_cd7,_cd8);
}
},doOpenWordFileEditWindow:function(_cd9,_cda,_cdb){
var _cdc=100;
var _cdd=100;
var _cde=Math.floor((screen.width-_cdc)/2);
var _cdf=Math.floor((screen.height-_cdd)/2);
window.open("../word-file-edit.jsp?id="+_cd9+"&document-field="+_cda+"&details-field="+_cdb,new Date().valueOf(),"toolbar=no,menubar=no,location=no,scrollbars=no,"+"resizable=no,top="+_cdf+",left="+_cde+",width="+_cdc+",height="+_cdd);
},displaySearchWindow:function(_ce0,_ce1,_ce2,_ce3){
if(!_ce3){
_ce3=0;
}
if(_ce3>3){
return;
}
if(_ce3==0){
curam.util.WordFileEdit.searchWindow=window.open("about:blank","searchWindow","left=40000,top=40000,scrollbars=yes");
}
var _ce4=false;
try{
var _ce5=curam.util.WordFileEdit.searchWindow.document.title;
if(_ce5.indexOf(searchWindowTitlePrefix+":")==-1){
curam.util.WordFileEdit.searchWindow.document.title=searchWindowTitlePrefix+":"+_ce0;
}else{
_ce4=true;
}
_ce5=curam.util.WordFileEdit.searchWindow.document.title;
if(!_ce4&&_ce5.indexOf(searchWindowTitlePrefix+":")!=-1){
_ce4=true;
}
}
catch(e){
}
if(!_ce4){
_ce3++;
window.setTimeout("displaySearchWindow('"+_ce0+"','"+_ce1+"','"+_ce2+"',"+_ce3+")",500);
}else{
curam.util.WordFileEdit.doOpenWordFileEditWindow(_ce0,_ce1,_ce2);
}
},redisplaySearchWindow:function(_ce6,_ce7){
if(!_ce7){
_ce7=0;
}
if(_ce7>3){
return;
}
if(_ce7==0){
curam.util.WordFileEdit.searchWindow=window.open("about:blank","searchWindow","left=40000,top=40000");
}
var _ce8=false;
try{
var _ce9=curam.util.WordFileEdit.searchWindow.document.title;
if(_ce9.indexOf(searchWindowTitlePrefix+":")==-1){
curam.util.WordFileEdit.searchWindow.document.title=searchWindowTitlePrefix+":"+_ce6;
}else{
_ce8=true;
}
_ce9=curam.util.WordFileEdit.searchWindow.document.title;
if(!_ce8&&_ce9.indexOf(searchWindowTitlePrefix+":")!=-1){
_ce8=true;
}
}
catch(e){
}
if(!_ce8){
_ce7++;
window.setTimeout("redisplaySearchWindow('"+_ce6+"',"+_ce7+")",500);
}
},getSearchPage:function(_cea){
var _ceb="";
try{
if(!_cea){
_ceb=document.getElementById("searchPage").value;
}else{
var _cec=curam.util.WordFileEdit.getParentWindow();
_ceb=_cec.document.getElementById("searchPage").value;
}
}
catch(e){
}
return _ceb;
},initialize:function(_ced){
var _cee=curam.util.WordFileEdit.getParentWindow();
try{
var _cef=dojo.byId(_ced);
if(typeof _cef!="undefined"){
curam.util.WordFileEdit._setOverlay(true);
if(curam.util.WordFileEdit.useApplet){
if(!dojo.isIE){
var _cf0=_cee.frameElement;
curam.util.connect(_cf0,"onload",function(evt){
var _cf1=dojo.fixEvent(evt,_cf0);
var url=_cf0.contentWindow.location.href;
try{
_cef.mainApplicationPageLoaded(url);
}
catch(e){
alert("Error calling mainApplicationPageLoaded on applet: "+e.message);
}
});
_cee.top.dojo.addOnUnload(function(){
_cef.mainApplicationPageUnloaded();
});
}
}else{
_cef.openDocument();
}
}else{
curam.util.WordFileEdit._setOverlay(false);
curam.util.WordFileEdit.closeAppletWindow();
}
}
catch(e){
curam.util.WordFileEdit._setOverlay(false);
curam.util.WordFileEdit.closeAppletWindow();
_cee.curam.util.WordFileEdit.cannotLoadControl(e);
}
},_setOverlay:function(_cf2){
try{
var _cf3=curam.util.WordFileEdit.getParentWindow();
var _cf4=(_cf3!=null)?_cf3.curam.util.getTopmostWindow():curam.util.getTopmostWindow();
if(_cf4!=window){
_cf4.dojo.require("curam/util/WordFileEdit");
_cf4.curam.util.WordFileEdit._setOverlay(_cf2);
return;
}
if(!curam.util.WordFileEdit._overlay){
curam.util.WordFileEdit._overlay=new dijit.DialogUnderlay({dialogId:"dummy","class":"word-file-edit-overlay"});
}
var ovr=curam.util.WordFileEdit._overlay;
if(_cf2){
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
},getWordFileEditParentTextareaValue:function(_cf5){
var _cf6="";
try{
var _cf7=curam.util.WordFileEdit.getParentWindow();
var _cf8=curam.util.WordFileEdit._findTextArea(_cf7,_cf5);
_cf6=_cf8.value;
}
catch(e){
alert("getWordFileEditParentTextareaValue('"+_cf5+"'): \r"+e.message);
}
return _cf6;
},_findTextArea:function(_cf9,_cfa,_cfb){
var _cfc=null;
if(!_cfb){
_cfc=_cf9.dojo.query("input[name='"+_cfa+"']",_cf9.dojo.body())[0];
}else{
_cfc=_cf9.dojo.query("input[name$='"+_cfa+"']",_cf9.dojo.body())[0];
}
return _cfc;
},finishedWordFileEditWindow:function(_cfd,_cfe,_cff){
if(!curam.util.WordFileEdit._clickedFinish){
curam.util.WordFileEdit.doFinishWordFileEditWindow(_cfd,_cfe,_cff);
curam.util.WordFileEdit._clickedFinish=true;
}
},doFinishWordFileEditWindow:function(_d00,_d01,_d02){
var _d03=false;
var _d04=false;
try{
var _d05=curam.util.WordFileEdit.getParentWindow();
if(_d01&&_d02){
_d04=true;
var _d06=curam.util.WordFileEdit._findTextArea(_d05,_d01);
_d06.value=_d02;
}
var _d07=_d05.dojo.query("form input");
for(var i=0;i<_d07.length&&!_d03;i++){
if(_d07[i].id.substring(0,curam.util.WordFileEdit._buttonIdPart.length).toLowerCase()==curam.util.WordFileEdit._buttonIdPart.toLowerCase()){
_d03=true;
if(!_d04){
var _d06=curam.util.WordFileEdit._findTextArea(_d05,_d01);
_d06.value="";
var _d08=false;
var _d09;
var _d0a=_d07[i];
try{
while(_d0a.tagName.toUpperCase()!="BODY"&&!_d08){
if(_d0a.tagName.toUpperCase()=="FORM"){
_d08=true;
_d09=_d0a;
}else{
_d0a=_d0a.parentElement;
}
}
}
catch(e){
alert("doFinishWordFileEditWindow: "+e.message);
}
if(_d08){
var _d0b="<input type=\"hidden\" name=\"__o3NoSave\" value=\"true\"/>";
_d09.innerHTML+=_d0b;
}
}
_d05.curam.util.clickButton(_d07[i].id);
if(_d00.length>0){
_d05.document.body.innerHTML=_d00;
}
curam.util.WordFileEdit._setOverlay(false);
return;
}
}
if(!_d03){
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
},screenAlertWordFileEditWindow:function(_d0c){
try{
curam.util.WordFileEdit.getParentWindow().alert(_d0c);
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
var _d0d=curam.util.WordFileEdit.getParentWindow();
var doc=_d0d.document;
var _d0e=doc.URL;
var _d0f=_d0d.dojo.query("form",doc)[0];
var _d10=_d0f.action;
var _d11=_d0e.substr(0,_d0e.lastIndexOf("/")+1);
window.curam.util.WordFileEdit.urlPath_return_value=_d11;
var _d12=(dojo.isIE>=8)?_d10:_d11+_d10;
window.curam.util.WordFileEdit.allowedUrl_return_value=_d12;
return [_d11,_d12];
}
catch(e){
alert("getUrls: "+dojo.toJson(e));
}
},getTitle:function(){
var _d13=curam.util.WordFileEdit.getParentWindow().top.document.title;
curam.util.WordFileEdit.title_return_value=_d13;
window.curam_wordIntegration_title_return_value=_d13;
return _d13;
},setTitle:function(_d14){
curam.util.WordFileEdit.getParentWindow().top.document.title=_d14;
},hasNamedInput:function(_d15){
var _d16=curam.util.WordFileEdit.getParentWindow();
var _d17=_d15.slice(1);
var _d18=curam.util.WordFileEdit._findTextArea(_d16,_d17,true);
return _d18?true:false;
},closeAppletWindow:function(){
self.close();
},runApplet:function(id){
if(typeof deployJava!="undefined"){
var _d19=deployJava.getPlugin();
if(_d19){
curam.debug.log(_cd1.getProperty("curam.util.WordFileEdit.version"),_d19.version);
}else{
curam.debug.log(_cd1.getProperty("curam.util.WordFileEdit.no.plugin"));
}
}else{
curam.debug.log(_cd1.getProperty("curam.util.WordFileEdit.no.java"));
}
if(typeof deployJava=="undefined"||(!dojo.isChrome&&!deployJava.isPlugin2())){
alert(curam.util.WordFileEdit.noJavaInstalled);
}else{
dojo.mixin(curam.util.WordFileEdit.controlAttributes,{id:id});
var _d1a=dojo.create("div",{style:"display:none"});
var _d1b=dojo.create("applet",curam.util.WordFileEdit.controlAttributes,_d1a);
var _d1c=curam.util.WordFileEdit.controlParameters;
for(property in _d1c){
dojo.create("param",{name:property,value:_d1c[property]},_d1b);
}
var _d1d=_d1a.innerHTML;
dojo.destroy(_d1a);
document.write(_d1d);
}
}});
return curam.util.WordFileEdit;
});
},"dijit/form/DataList":function(){
define("dijit/form/DataList",["dojo/_base/declare","dojo/dom","dojo/_base/lang","dojo/query","dojo/store/Memory","../registry"],function(_d1e,dom,lang,_d1f,_d20,_d21){
function _d22(_d23){
return {id:_d23.value,value:_d23.value,name:lang.trim(_d23.innerText||_d23.textContent||"")};
};
return _d1e("dijit.form.DataList",_d20,{constructor:function(_d24,_d25){
this.domNode=dom.byId(_d25);
lang.mixin(this,_d24);
if(this.id){
_d21.add(this);
}
this.domNode.style.display="none";
this.inherited(arguments,[{data:_d1f("option",this.domNode).map(_d22)}]);
},destroy:function(){
_d21.remove(this.id);
},fetchSelectedItem:function(){
var _d26=_d1f("> option[selected]",this.domNode)[0]||_d1f("> option",this.domNode)[0];
return _d26&&_d22(_d26);
}});
});
},"url:dijit/templates/Dialog.html":"<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span>\n\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabIndex=\"-1\">\n\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t</span>\n\t</div>\n\t\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n","url:dijit/templates/MenuBar.html":"<div class=\"dijitMenuBar dijitMenuPassive\" data-dojo-attach-point=\"containerNode\"  role=\"menubar\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress: _onKeyPress\"></div>\n","dijit/tree/_dndSelector":function(){
define("dijit/tree/_dndSelector",["dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/lang","dojo/mouse","dojo/on","dojo/touch","dojo/_base/window","./_dndContainer"],function(_d27,_d28,_d29,lang,_d2a,on,_d2b,win,_d2c){
return _d29("dijit.tree._dndSelector",_d2c,{constructor:function(){
this.selection={};
this.anchor=null;
this.events.push(on(this.tree.domNode,_d2b.press,lang.hitch(this,"onMouseDown")),on(this.tree.domNode,_d2b.release,lang.hitch(this,"onMouseUp")),on(this.tree.domNode,_d2b.move,lang.hitch(this,"onMouseMove")));
},singular:false,getSelectedTreeNodes:function(){
var _d2d=[],sel=this.selection;
for(var i in sel){
_d2d.push(sel[i]);
}
return _d2d;
},selectNone:function(){
this.setSelection([]);
return this;
},destroy:function(){
this.inherited(arguments);
this.selection=this.anchor=null;
},addTreeNode:function(node,_d2e){
this.setSelection(this.getSelectedTreeNodes().concat([node]));
if(_d2e){
this.anchor=node;
}
return node;
},removeTreeNode:function(node){
this.setSelection(this._setDifference(this.getSelectedTreeNodes(),[node]));
return node;
},isTreeNodeSelected:function(node){
return node.id&&!!this.selection[node.id];
},setSelection:function(_d2f){
var _d30=this.getSelectedTreeNodes();
_d27.forEach(this._setDifference(_d30,_d2f),lang.hitch(this,function(node){
node.setSelected(false);
if(this.anchor==node){
delete this.anchor;
}
delete this.selection[node.id];
}));
_d27.forEach(this._setDifference(_d2f,_d30),lang.hitch(this,function(node){
node.setSelected(true);
this.selection[node.id]=node;
}));
this._updateSelectionProperties();
},_setDifference:function(xs,ys){
_d27.forEach(ys,function(y){
y.__exclude__=true;
});
var ret=_d27.filter(xs,function(x){
return !x.__exclude__;
});
_d27.forEach(ys,function(y){
delete y["__exclude__"];
});
return ret;
},_updateSelectionProperties:function(){
var _d31=this.getSelectedTreeNodes();
var _d32=[],_d33=[];
_d27.forEach(_d31,function(node){
_d33.push(node);
_d32.push(node.getTreePath());
});
var _d34=_d27.map(_d33,function(node){
return node.item;
});
this.tree._set("paths",_d32);
this.tree._set("path",_d32[0]||[]);
this.tree._set("selectedNodes",_d33);
this.tree._set("selectedNode",_d33[0]||null);
this.tree._set("selectedItems",_d34);
this.tree._set("selectedItem",_d34[0]||null);
},onMouseDown:function(e){
if(!this.current||this.tree.isExpandoNode(e.target,this.current)){
return;
}
if(!_d2a.isLeft(e)){
return;
}
e.preventDefault();
var _d35=this.current,copy=_d28.isCopyKey(e),id=_d35.id;
if(!this.singular&&!e.shiftKey&&this.selection[id]){
this._doDeselect=true;
return;
}else{
this._doDeselect=false;
}
this.userSelect(_d35,copy,e.shiftKey);
},onMouseUp:function(e){
if(!this._doDeselect){
return;
}
this._doDeselect=false;
this.userSelect(this.current,_d28.isCopyKey(e),e.shiftKey);
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
},userSelect:function(node,_d36,_d37){
if(this.singular){
if(this.anchor==node&&_d36){
this.selectNone();
}else{
this.setSelection([node]);
this.anchor=node;
}
}else{
if(_d37&&this.anchor){
var cr=this._compareNodes(this.anchor.rowNode,node.rowNode),_d38,end,_d39=this.anchor;
if(cr<0){
_d38=_d39;
end=node;
}else{
_d38=node;
end=_d39;
}
var _d3a=[];
while(_d38!=end){
_d3a.push(_d38);
_d38=this.tree._getNextNode(_d38);
}
_d3a.push(end);
this.setSelection(_d3a);
}else{
if(this.selection[node.id]&&_d36){
this.removeTreeNode(node);
}else{
if(_d36){
this.addTreeNode(node,true);
}else{
this.setSelection([node]);
this.anchor=node;
}
}
}
}
},getItem:function(key){
var _d3b=this.selection[key];
return {data:_d3b,type:["treeNode"]};
},forInSelectedItems:function(f,o){
o=o||win.global;
for(var id in this.selection){
f.call(o,this.getItem(id),id,this);
}
}});
});
},"dijit/_Container":function(){
define("dijit/_Container",["dojo/_base/array","dojo/_base/declare","dojo/dom-construct","./registry"],function(_d3c,_d3d,_d3e,_d3f){
return _d3d("dijit._Container",null,{buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_d40,_d41){
var _d42=this.containerNode;
if(_d41&&typeof _d41=="number"){
var _d43=this.getChildren();
if(_d43&&_d43.length>=_d41){
_d42=_d43[_d41-1].domNode;
_d41="after";
}
}
_d3e.place(_d40.domNode,_d42,_d41);
if(this._started&&!_d40._started){
_d40.startup();
}
},removeChild:function(_d44){
if(typeof _d44=="number"){
_d44=this.getChildren()[_d44];
}
if(_d44){
var node=_d44.domNode;
if(node&&node.parentNode){
node.parentNode.removeChild(node);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},_getSiblingOfChild:function(_d45,dir){
var node=_d45.domNode,_d46=(dir>0?"nextSibling":"previousSibling");
do{
node=node[_d46];
}while(node&&(node.nodeType!=1||!_d3f.byNode(node)));
return node&&_d3f.byNode(node);
},getIndexOfChild:function(_d47){
return _d3c.indexOf(this.getChildren(),_d47);
}});
});
},"dojo/data/ItemFileReadStore":function(){
define("dojo/data/ItemFileReadStore",["../_base/kernel","../_base/lang","../_base/declare","../_base/array","../_base/xhr","../Evented","../_base/window","./util/filter","./util/simpleFetch","../date/stamp"],function(_d48,lang,_d49,_d4a,xhr,_d4b,_d4c,_d4d,_d4e,_d4f){
var _d50=_d49("dojo.data.ItemFileReadStore",[_d4b],{constructor:function(_d51){
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._jsonFileUrl=_d51.url;
this._ccUrl=_d51.url;
this.url=_d51.url;
this._jsonData=_d51.data;
this.data=null;
this._datatypeMap=_d51.typeMap||{};
if(!this._datatypeMap["Date"]){
this._datatypeMap["Date"]={type:Date,deserialize:function(_d52){
return _d4f.fromISOString(_d52);
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
if(_d51.urlPreventCache!==undefined){
this.urlPreventCache=_d51.urlPreventCache?true:false;
}
if(_d51.hierarchical!==undefined){
this.hierarchical=_d51.hierarchical?true:false;
}
if(_d51.clearOnClose){
this.clearOnClose=true;
}
if("failOk" in _d51){
this.failOk=_d51.failOk?true:false;
}
},url:"",_ccUrl:"",data:null,typeMap:null,clearOnClose:false,urlPreventCache:false,failOk:false,hierarchical:true,_assertIsItem:function(item){
if(!this.isItem(item)){
throw new Error("dojo.data.ItemFileReadStore: Invalid item argument.");
}
},_assertIsAttribute:function(_d53){
if(typeof _d53!=="string"){
throw new Error("dojo.data.ItemFileReadStore: Invalid attribute argument.");
}
},getValue:function(item,_d54,_d55){
var _d56=this.getValues(item,_d54);
return (_d56.length>0)?_d56[0]:_d55;
},getValues:function(item,_d57){
this._assertIsItem(item);
this._assertIsAttribute(_d57);
return (item[_d57]||[]).slice(0);
},getAttributes:function(item){
this._assertIsItem(item);
var _d58=[];
for(var key in item){
if((key!==this._storeRefPropName)&&(key!==this._itemNumPropName)&&(key!==this._rootItemPropName)&&(key!==this._reverseRefMap)){
_d58.push(key);
}
}
return _d58;
},hasAttribute:function(item,_d59){
this._assertIsItem(item);
this._assertIsAttribute(_d59);
return (_d59 in item);
},containsValue:function(item,_d5a,_d5b){
var _d5c=undefined;
if(typeof _d5b==="string"){
_d5c=_d4d.patternToRegExp(_d5b,false);
}
return this._containsValue(item,_d5a,_d5b,_d5c);
},_containsValue:function(item,_d5d,_d5e,_d5f){
return _d4a.some(this.getValues(item,_d5d),function(_d60){
if(_d60!==null&&!lang.isObject(_d60)&&_d5f){
if(_d60.toString().match(_d5f)){
return true;
}
}else{
if(_d5e===_d60){
return true;
}
}
});
},isItem:function(_d61){
if(_d61&&_d61[this._storeRefPropName]===this){
if(this._arrayOfAllItems[_d61[this._itemNumPropName]]===_d61){
return true;
}
}
return false;
},isItemLoaded:function(_d62){
return this.isItem(_d62);
},loadItem:function(_d63){
this._assertIsItem(_d63.item);
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
},_fetchItems:function(_d64,_d65,_d66){
var self=this,_d67=function(_d68,_d69){
var _d6a=[],i,key;
if(_d68.query){
var _d6b,_d6c=_d68.queryOptions?_d68.queryOptions.ignoreCase:false;
var _d6d={};
for(key in _d68.query){
_d6b=_d68.query[key];
if(typeof _d6b==="string"){
_d6d[key]=_d4d.patternToRegExp(_d6b,_d6c);
}else{
if(_d6b instanceof RegExp){
_d6d[key]=_d6b;
}
}
}
for(i=0;i<_d69.length;++i){
var _d6e=true;
var _d6f=_d69[i];
if(_d6f===null){
_d6e=false;
}else{
for(key in _d68.query){
_d6b=_d68.query[key];
if(!self._containsValue(_d6f,key,_d6b,_d6d[key])){
_d6e=false;
}
}
}
if(_d6e){
_d6a.push(_d6f);
}
}
_d65(_d6a,_d68);
}else{
for(i=0;i<_d69.length;++i){
var item=_d69[i];
if(item!==null){
_d6a.push(item);
}
}
_d65(_d6a,_d68);
}
};
if(this._loadFinished){
_d67(_d64,this._getItemsArray(_d64.queryOptions));
}else{
if(this._jsonFileUrl!==this._ccUrl){
_d48.deprecated("dojo.data.ItemFileReadStore: ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
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
this._queuedFetches.push({args:_d64,filter:_d67});
}else{
this._loadInProgress=true;
var _d70={url:self._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk};
var _d71=xhr.get(_d70);
_d71.addCallback(function(data){
try{
self._getItemsFromLoadedData(data);
self._loadFinished=true;
self._loadInProgress=false;
_d67(_d64,self._getItemsArray(_d64.queryOptions));
self._handleQueuedFetches();
}
catch(e){
self._loadFinished=true;
self._loadInProgress=false;
_d66(e,_d64);
}
});
_d71.addErrback(function(_d72){
self._loadInProgress=false;
_d66(_d72,_d64);
});
var _d73=null;
if(_d64.abort){
_d73=_d64.abort;
}
_d64.abort=function(){
var df=_d71;
if(df&&df.fired===-1){
df.cancel();
df=null;
}
if(_d73){
_d73.call(_d64);
}
};
}
}else{
if(this._jsonData){
try{
this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
_d67(_d64,this._getItemsArray(_d64.queryOptions));
}
catch(e){
_d66(e,_d64);
}
}else{
_d66(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),_d64);
}
}
}
},_handleQueuedFetches:function(){
if(this._queuedFetches.length>0){
for(var i=0;i<this._queuedFetches.length;i++){
var _d74=this._queuedFetches[i],_d75=_d74.args,_d76=_d74.filter;
if(_d76){
_d76(_d75,this._getItemsArray(_d75.queryOptions));
}else{
this.fetchItemByIdentity(_d75);
}
}
this._queuedFetches=[];
}
},_getItemsArray:function(_d77){
if(_d77&&_d77.deep){
return this._arrayOfAllItems;
}
return this._arrayOfTopLevelItems;
},close:function(_d78){
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
},_getItemsFromLoadedData:function(_d79){
var _d7a=false,self=this;
function _d7b(_d7c){
return (_d7c!==null)&&(typeof _d7c==="object")&&(!lang.isArray(_d7c)||_d7a)&&(!lang.isFunction(_d7c))&&(_d7c.constructor==Object||lang.isArray(_d7c))&&(typeof _d7c._reference==="undefined")&&(typeof _d7c._type==="undefined")&&(typeof _d7c._value==="undefined")&&self.hierarchical;
};
function _d7d(_d7e){
self._arrayOfAllItems.push(_d7e);
for(var _d7f in _d7e){
var _d80=_d7e[_d7f];
if(_d80){
if(lang.isArray(_d80)){
var _d81=_d80;
for(var k=0;k<_d81.length;++k){
var _d82=_d81[k];
if(_d7b(_d82)){
_d7d(_d82);
}
}
}else{
if(_d7b(_d80)){
_d7d(_d80);
}
}
}
}
};
this._labelAttr=_d79.label;
var i,item;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=_d79.items;
for(i=0;i<this._arrayOfTopLevelItems.length;++i){
item=this._arrayOfTopLevelItems[i];
if(lang.isArray(item)){
_d7a=true;
}
_d7d(item);
item[this._rootItemPropName]=true;
}
var _d83={},key;
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
for(key in item){
if(key!==this._rootItemPropName){
var _d84=item[key];
if(_d84!==null){
if(!lang.isArray(_d84)){
item[key]=[_d84];
}
}else{
item[key]=[null];
}
}
_d83[key]=key;
}
}
while(_d83[this._storeRefPropName]){
this._storeRefPropName+="_";
}
while(_d83[this._itemNumPropName]){
this._itemNumPropName+="_";
}
while(_d83[this._reverseRefMap]){
this._reverseRefMap+="_";
}
var _d85;
var _d86=_d79.identifier;
if(_d86){
this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=_d86;
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
_d85=item[_d86];
var _d87=_d85[0];
if(!Object.hasOwnProperty.call(this._itemsByIdentity,_d87)){
this._itemsByIdentity[_d87]=item;
}else{
if(this._jsonFileUrl){
throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+_d86+"].  Value collided: ["+_d87+"]");
}else{
if(this._jsonData){
throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+_d86+"].  Value collided: ["+_d87+"]");
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
_d85=item[key];
for(var j=0;j<_d85.length;++j){
_d84=_d85[j];
if(_d84!==null&&typeof _d84=="object"){
if(("_type" in _d84)&&("_value" in _d84)){
var type=_d84._type;
var _d88=this._datatypeMap[type];
if(!_d88){
throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+type+"'");
}else{
if(lang.isFunction(_d88)){
_d85[j]=new _d88(_d84._value);
}else{
if(lang.isFunction(_d88.deserialize)){
_d85[j]=_d88.deserialize(_d84._value);
}else{
throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function");
}
}
}
}
if(_d84._reference){
var _d89=_d84._reference;
if(!lang.isObject(_d89)){
_d85[j]=this._getItemByIdentity(_d89);
}else{
for(var k=0;k<this._arrayOfAllItems.length;++k){
var _d8a=this._arrayOfAllItems[k],_d8b=true;
for(var _d8c in _d89){
if(_d8a[_d8c]!=_d89[_d8c]){
_d8b=false;
}
}
if(_d8b){
_d85[j]=_d8a;
}
}
}
if(this.referenceIntegrity){
var _d8d=_d85[j];
if(this.isItem(_d8d)){
this._addReferenceToMap(_d8d,item,key);
}
}
}else{
if(this.isItem(_d84)){
if(this.referenceIntegrity){
this._addReferenceToMap(_d84,item,key);
}
}
}
}
}
}
}
},_addReferenceToMap:function(_d8e,_d8f,_d90){
},getIdentity:function(item){
var _d91=this._features["dojo.data.api.Identity"];
if(_d91===Number){
return item[this._itemNumPropName];
}else{
var _d92=item[_d91];
if(_d92){
return _d92[0];
}
}
return null;
},fetchItemByIdentity:function(_d93){
var item,_d94;
if(!this._loadFinished){
var self=this;
if(this._jsonFileUrl!==this._ccUrl){
_d48.deprecated("dojo.data.ItemFileReadStore: ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
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
this._queuedFetches.push({args:_d93});
}else{
this._loadInProgress=true;
var _d95={url:self._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk};
var _d96=xhr.get(_d95);
_d96.addCallback(function(data){
var _d97=_d93.scope?_d93.scope:_d4c.global;
try{
self._getItemsFromLoadedData(data);
self._loadFinished=true;
self._loadInProgress=false;
item=self._getItemByIdentity(_d93.identity);
if(_d93.onItem){
_d93.onItem.call(_d97,item);
}
self._handleQueuedFetches();
}
catch(error){
self._loadInProgress=false;
if(_d93.onError){
_d93.onError.call(_d97,error);
}
}
});
_d96.addErrback(function(_d98){
self._loadInProgress=false;
if(_d93.onError){
var _d99=_d93.scope?_d93.scope:_d4c.global;
_d93.onError.call(_d99,_d98);
}
});
}
}else{
if(this._jsonData){
self._getItemsFromLoadedData(self._jsonData);
self._jsonData=null;
self._loadFinished=true;
item=self._getItemByIdentity(_d93.identity);
if(_d93.onItem){
_d94=_d93.scope?_d93.scope:_d4c.global;
_d93.onItem.call(_d94,item);
}
}
}
}else{
item=this._getItemByIdentity(_d93.identity);
if(_d93.onItem){
_d94=_d93.scope?_d93.scope:_d4c.global;
_d93.onItem.call(_d94,item);
}
}
},_getItemByIdentity:function(_d9a){
var item=null;
if(this._itemsByIdentity){
if(Object.hasOwnProperty.call(this._itemsByIdentity,_d9a)){
item=this._itemsByIdentity[_d9a];
}
}else{
if(Object.hasOwnProperty.call(this._arrayOfAllItems,_d9a)){
item=this._arrayOfAllItems[_d9a];
}
}
if(item===undefined){
item=null;
}
return item;
},getIdentityAttributes:function(item){
var _d9b=this._features["dojo.data.api.Identity"];
if(_d9b===Number){
return null;
}else{
return [_d9b];
}
},_forceLoad:function(){
var self=this;
if(this._jsonFileUrl!==this._ccUrl){
_d48.deprecated("dojo.data.ItemFileReadStore: ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
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
var _d9c={url:this._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk,sync:true};
var _d9d=xhr.get(_d9c);
_d9d.addCallback(function(data){
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
_d9d.addErrback(function(_d9e){
throw _d9e;
});
}else{
if(this._jsonData){
self._getItemsFromLoadedData(self._jsonData);
self._jsonData=null;
self._loadFinished=true;
}
}
}});
lang.extend(_d50,_d4e);
return _d50;
});
},"curam/tab/util":function(){
define("curam/tab/util",["dojo/dom-geometry","curam/define","curam/debug","curam/util/ResourceBundle"],function(_d9f){
dojo.requireLocalization("curam.application","Debug");
var _da0=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.tab.util",{toggleDetailsPanel:function(_da1){
_da1=dojo.fixEvent(_da1);
dojo.stopEvent(_da1);
var _da2=_da1.target;
if(_da2._animating){
return;
}
_da2._animating=true;
var _da3=_da2.parentNode;
while(_da3&&!dojo.hasClass(_da3,"detailsPanel-bc")){
_da3=_da3.parentNode;
}
var _da4=_da3;
while(_da3&&!dojo.hasClass(_da3,"summaryPane")){
_da3=_da3.parentNode;
}
var _da5=_da3;
while(_da3){
if(dojo.hasClass(_da3,"dijitBorderContainer")&&!dojo.hasClass(_da3,"detailsPanel-bc")){
break;
}
if(dojo.hasClass(_da3,"tab-wrapper")){
break;
}
_da3=_da3.parentNode;
}
var _da6=_da3;
headerPanelNode=dojo.query(".detailsPanelTitleBar",_da4)[0];
detailsPanelNode=dojo.query(".detailsContentPane",_da4)[0];
var kids=_da6.children;
var _da7=dojo.filter(kids,function(_da8){
if(dojo.hasClass(_da8,"splitter-pane")||dojo.hasClass(_da8,"dijitSplitterH")){
return _da8;
}
})[0];
var _da9=dojo.filter(kids,function(_daa){
if(dojo.hasClass(_daa,"nav-panel")){
return _daa;
}
})[0];
var _dab=_d9f.getMarginBoxSimple(headerPanelNode).h;
var _dac=_d9f.getMarginBoxSimple(_da5).h;
var _dad=_da7.offsetHeight;
var _dae=_d9f.getMarginBoxSimple(_da9).h;
var _daf=dojo.query(".detailsContentPane",_da4)[0];
if(_dab!=_da5.clientHeight){
dojo.addClass(_da2,"collapsed");
dojo.addClass(_daf,"collapsed");
curam.debug.log(_da0.getProperty("curam.tab.util.collapsing"));
_da4._previousHeight=_dac;
_da9._previousHeight=_dae;
dojo.animateProperty({node:_da5,duration:500,properties:{height:{end:_dab}}}).play();
if(dojo.hasClass(_da7,"splitter-pane")){
dojo.animateProperty({node:detailsPanelNode,duration:500,properties:{height:{end:0}}}).play();
}
dojo.animateProperty({node:_da7,duration:500,properties:{top:{end:(_dab+_dad)}}}).play();
dojo.animateProperty({node:_da9,duration:500,properties:{top:{end:(_dab+_dad)}},onEnd:function(){
_da2._animating=false;
if(dojo.hasClass(_da7,"dijitSplitterH")){
dojo.style(_da9,"height",(_da9._previousHeight+_da4._previousHeight-_dab)+"px");
}
}}).play();
}else{
dojo.removeClass(_da2,"collapsed");
dojo.removeClass(_daf,"collapsed");
curam.debug.log(_da0.getProperty("curam.tab.util.expanding"));
dojo.style(_da5,"height",_da4._previousHeight+"px");
if(dojo.hasClass(_da7,"splitter-pane")){
dojo.animateProperty({node:detailsPanelNode,duration:500,properties:{height:{end:_da4._previousHeight-_dab}}}).play();
}
dojo.animateProperty({node:_da7,duration:500,properties:{top:{end:(_da4._previousHeight+_dad)}}}).play();
dojo.animateProperty({node:_da9,duration:500,properties:{top:{end:(_da4._previousHeight+_dad)}},onEnd:function(){
_da2._animating=false;
if(dojo.hasClass(_da7,"dijitSplitterH")){
dojo.style(_da9,"height",_da9._previousHeight+"px");
}
}}).play();
}
}});
return curam.tab.util;
});
},"dojo/html":function(){
define("dojo/html",["./_base/kernel","./_base/lang","./_base/array","./_base/declare","./dom","./dom-construct","./parser"],function(dojo,lang,_db0,_db1,dom,_db2,_db3){
lang.getObject("html",true,dojo);
var _db4=0;
dojo.html._secureForInnerHtml=function(cont){
return cont.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"");
};
dojo.html._emptyNode=_db2.empty;
dojo.html._setNodeContent=function(node,cont){
_db2.empty(node);
if(cont){
if(typeof cont=="string"){
cont=_db2.toDom(cont,node.ownerDocument);
}
if(!cont.nodeType&&lang.isArrayLike(cont)){
for(var _db5=cont.length,i=0;i<cont.length;i=_db5==cont.length?i+1:0){
_db2.place(cont[i],node,"last");
}
}else{
_db2.place(cont,node,"last");
}
}
return node;
};
_db1("dojo.html._ContentSetter",null,{node:"",content:"",id:"",cleanContent:false,extractContent:false,parseContent:false,parserScope:dojo._scopeName,startup:true,constructor:function(_db6,node){
lang.mixin(this,_db6||{});
node=this.node=dom.byId(this.node||node);
if(!this.id){
this.id=["Setter",(node)?node.id||node.tagName:"",_db4++].join("_");
}
},set:function(cont,_db7){
if(undefined!==cont){
this.content=cont;
}
if(_db7){
this._mixin(_db7);
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
var _db8=this.onContentError(e);
try{
node.innerHTML=_db8;
}
catch(e){
console.error("Fatal "+this.declaredClass+".setContent could not change content due to "+e.message,e);
}
}
this.node=node;
},empty:function(){
if(this.parseResults&&this.parseResults.length){
_db0.forEach(this.parseResults,function(w){
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
var _db9=cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_db9){
cont=_db9[1];
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
},_mixin:function(_dba){
var _dbb={},key;
for(key in _dba){
if(key in _dbb){
continue;
}
this[key]=_dba[key];
}
},_parse:function(){
var _dbc=this.node;
try{
var _dbd={};
_db0.forEach(["dir","lang","textDir"],function(name){
if(this[name]){
_dbd[name]=this[name];
}
},this);
this.parseResults=_db3.parse({rootNode:_dbc,noStart:!this.startup,inherited:_dbd,scope:this.parserScope});
}
catch(e){
this._onError("Content",e,"Error parsing in _ContentSetter#"+this.id);
}
},_onError:function(type,err,_dbe){
var _dbf=this["on"+type+"Error"].call(this,err);
if(_dbe){
console.error(_dbe,err);
}else{
if(_dbf){
dojo.html._setNodeContent(this.node,_dbf,true);
}
}
}});
dojo.html.set=function(node,cont,_dc0){
if(undefined==cont){
console.warn("dojo.html.set: no cont argument provided, using empty string");
cont="";
}
if(!_dc0){
return dojo.html._setNodeContent(node,cont,true);
}else{
var op=new dojo.html._ContentSetter(lang.mixin(_dc0,{content:cont,node:node}));
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
function _dc1(type){
return function(evt){
cm.validation.validateMandatory(evt.target?evt.target:evt,type);
};
};
function _dc2(type,_dc3){
var obj={};
var fn=_dc1(type);
dojo.forEach(_dc3,function(evt){
obj[evt]=fn;
});
obj.found=function(node){
cm.validation.registerValidation(node.getAttribute("name"),fn,node);
fn(node);
};
return obj;
};
cm.registerBehavior("MANDATORY_FIELD_VALIDATION",{"input[type='text'],input[type='password']":_dc2("text",["blur","onkeyup"]),"input[type='checkbox']":_dc2("checkbox",["blur","onclick"]),"select":_dc2("select",["blur","onchange"]),"input[type='radio']":_dc2("radio",["blur","onclick"])});
return cm;
});
},"dijit/form/ValidationTextBox":function(){
require({cache:{"url:dijit/form/templates/ValidationTextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"}});
define("dijit/form/ValidationTextBox",["dojo/_base/declare","dojo/i18n","./TextBox","../Tooltip","dojo/text!./templates/ValidationTextBox.html","dojo/i18n!./nls/validate"],function(_dc4,i18n,_dc5,_dc6,_dc7){
return _dc4("dijit.form.ValidationTextBox",_dc5,{templateString:_dc7,baseClass:"dijitTextBox dijitValidationTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",missingMessage:"$_unset_$",message:"",constraints:{},regExp:".*",regExpGen:function(){
return this.regExp;
},state:"",tooltipPosition:[],_setValueAttr:function(){
this.inherited(arguments);
this.validate(this.focused);
},validator:function(_dc8,_dc9){
return (new RegExp("^(?:"+this.regExpGen(_dc9)+")"+(this.required?"":"?")+"$")).test(_dc8)&&(!this.required||!this._isEmpty(_dc8))&&(this._isEmpty(_dc8)||this.parse(_dc8,_dc9)!==undefined);
},_isValidSubset:function(){
return this.textbox.value.search(this._partialre)==0;
},isValid:function(){
return this.validator(this.textbox.value,this.constraints);
},_isEmpty:function(_dca){
return (this.trim?/^\s*$/:/^$/).test(_dca);
},getErrorMessage:function(){
return (this.required&&this._isEmpty(this.textbox.value))?this.missingMessage:this.invalidMessage;
},getPromptMessage:function(){
return this.promptMessage;
},_maskValidSubsetError:true,validate:function(_dcb){
var _dcc="";
var _dcd=this.disabled||this.isValid(_dcb);
if(_dcd){
this._maskValidSubsetError=true;
}
var _dce=this._isEmpty(this.textbox.value);
var _dcf=!_dcd&&_dcb&&this._isValidSubset();
this._set("state",_dcd?"":(((((!this._hasBeenBlurred||_dcb)&&_dce)||_dcf)&&this._maskValidSubsetError)?"Incomplete":"Error"));
this.focusNode.setAttribute("aria-invalid",_dcd?"false":"true");
if(this.state=="Error"){
this._maskValidSubsetError=_dcb&&_dcf;
_dcc=this.getErrorMessage(_dcb);
}else{
if(this.state=="Incomplete"){
_dcc=this.getPromptMessage(_dcb);
this._maskValidSubsetError=!this._hasBeenBlurred||_dcb;
}else{
if(_dce){
_dcc=this.getPromptMessage(_dcb);
}
}
}
this.set("message",_dcc);
return _dcd;
},displayMessage:function(_dd0){
if(_dd0&&this.focused){
_dc6.show(_dd0,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}else{
_dc6.hide(this.domNode);
}
},_refreshState:function(){
this.validate(this.focused);
this.inherited(arguments);
},constructor:function(){
this.constraints={};
},_setConstraintsAttr:function(_dd1){
if(!_dd1.locale&&this.lang){
_dd1.locale=this.lang;
}
this._set("constraints",_dd1);
this._computePartialRE();
},_computePartialRE:function(){
var p=this.regExpGen(this.constraints);
this.regExp=p;
var _dd2="";
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
_dd2+=re;
break;
case ")":
_dd2+="|$)";
break;
default:
_dd2+="(?:"+re+"|$)";
break;
}
});
}
try{
"".search(_dd2);
}
catch(e){
_dd2=this.regExp;
console.warn("RegExp error in "+this.declaredClass+": "+this.regExp);
}
this._partialre="^(?:"+_dd2+")$";
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
},_setDisabledAttr:function(_dd3){
this.inherited(arguments);
this._refreshState();
},_setRequiredAttr:function(_dd4){
this._set("required",_dd4);
this.focusNode.setAttribute("aria-required",_dd4);
this._refreshState();
},_setMessageAttr:function(_dd5){
this._set("message",_dd5);
this.displayMessage(_dd5);
},reset:function(){
this._maskValidSubsetError=true;
this.inherited(arguments);
},_onBlur:function(){
this.displayMessage("");
this.inherited(arguments);
}});
});
},"dijit/layout/BorderContainer":function(){
define("dijit/layout/BorderContainer",["dojo/_base/array","dojo/cookie","dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/on","dojo/touch","dojo/_base/window","../_WidgetBase","../_Widget","../_TemplatedMixin","./_LayoutWidget","./utils"],function(_dd6,_dd7,_dd8,_dd9,_dda,_ddb,_ddc,_ddd,keys,lang,on,_dde,win,_ddf,_de0,_de1,_de2,_de3){
var _de4=_dd8("dijit.layout._Splitter",[_de0,_de1],{live:true,templateString:"<div class=\"dijitSplitter\" data-dojo-attach-event=\"onkeypress:_onKeyPress,press:_startDrag,onmouseenter:_onMouse,onmouseleave:_onMouse\" tabIndex=\"0\" role=\"separator\"><div class=\"dijitSplitterThumb\"></div></div>",constructor:function(){
this._handlers=[];
},postMixInProperties:function(){
this.inherited(arguments);
this.horizontal=/top|bottom/.test(this.region);
this._factor=/top|left/.test(this.region)?1:-1;
this._cookieName=this.container.id+"_"+this.region;
},buildRendering:function(){
this.inherited(arguments);
_dd9.add(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V"));
if(this.container.persist){
var _de5=_dd7(this._cookieName);
if(_de5){
this.child.domNode.style[this.horizontal?"height":"width"]=_de5;
}
}
},_computeMaxSize:function(){
var dim=this.horizontal?"h":"w",_de6=_ddb.getMarginBox(this.child.domNode)[dim],_de7=_dd6.filter(this.container.getChildren(),function(_de8){
return _de8.region=="center";
})[0],_de9=_ddb.getMarginBox(_de7.domNode)[dim];
return Math.min(this.child.maxSize,_de6+_de9);
},_startDrag:function(e){
if(!this.cover){
this.cover=win.doc.createElement("div");
_dd9.add(this.cover,"dijitSplitterCover");
_dda.place(this.cover,this.child.domNode,"after");
}
_dd9.add(this.cover,"dijitSplitterCoverActive");
if(this.fake){
_dda.destroy(this.fake);
}
if(!(this._resize=this.live)){
(this.fake=this.domNode.cloneNode(true)).removeAttribute("id");
_dd9.add(this.domNode,"dijitSplitterShadow");
_dda.place(this.fake,this.domNode,"after");
}
_dd9.add(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active");
if(this.fake){
_dd9.remove(this.fake,"dijitSplitterHover dijitSplitter"+(this.horizontal?"H":"V")+"Hover");
}
var _dea=this._factor,_deb=this.horizontal,axis=_deb?"pageY":"pageX",_dec=e[axis],_ded=this.domNode.style,dim=_deb?"h":"w",_dee=_ddb.getMarginBox(this.child.domNode)[dim],max=this._computeMaxSize(),min=this.child.minSize||20,_def=this.region,_df0=_def=="top"||_def=="bottom"?"top":"left",_df1=parseInt(_ded[_df0],10),_df2=this._resize,_df3=lang.hitch(this.container,"_layoutChildren",this.child.id),de=win.doc;
this._handlers=this._handlers.concat([on(de,_dde.move,this._drag=function(e,_df4){
var _df5=e[axis]-_dec,_df6=_dea*_df5+_dee,_df7=Math.max(Math.min(_df6,max),min);
if(_df2||_df4){
_df3(_df7);
}
_ded[_df0]=_df5+_df1+_dea*(_df7-_df6)+"px";
}),on(de,"dragstart",_ddd.stop),on(win.body(),"selectstart",_ddd.stop),on(de,_dde.release,lang.hitch(this,"_stopDrag"))]);
_ddd.stop(e);
},_onMouse:function(e){
var o=(e.type=="mouseover"||e.type=="mouseenter");
_dd9.toggle(this.domNode,"dijitSplitterHover",o);
_dd9.toggle(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V")+"Hover",o);
},_stopDrag:function(e){
try{
if(this.cover){
_dd9.remove(this.cover,"dijitSplitterCoverActive");
}
if(this.fake){
_dda.destroy(this.fake);
}
_dd9.remove(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active dijitSplitterShadow");
this._drag(e);
this._drag(e,true);
}
finally{
this._cleanupHandlers();
delete this._drag;
}
if(this.container.persist){
_dd7(this._cookieName,this.child.domNode.style[this.horizontal?"height":"width"],{expires:365});
}
},_cleanupHandlers:function(){
var h;
while(h=this._handlers.pop()){
h.remove();
}
},_onKeyPress:function(e){
this._resize=true;
var _df8=this.horizontal;
var tick=1;
switch(e.charOrCode){
case _df8?keys.UP_ARROW:keys.LEFT_ARROW:
tick*=-1;
case _df8?keys.DOWN_ARROW:keys.RIGHT_ARROW:
break;
default:
return;
}
var _df9=_ddb.getMarginSize(this.child.domNode)[_df8?"h":"w"]+this._factor*tick;
this.container._layoutChildren(this.child.id,Math.max(Math.min(_df9,this._computeMaxSize()),this.child.minSize));
_ddd.stop(e);
},destroy:function(){
this._cleanupHandlers();
delete this.child;
delete this.container;
delete this.cover;
delete this.fake;
this.inherited(arguments);
}});
var _dfa=_dd8("dijit.layout._Gutter",[_de0,_de1],{templateString:"<div class=\"dijitGutter\" role=\"presentation\"></div>",postMixInProperties:function(){
this.inherited(arguments);
this.horizontal=/top|bottom/.test(this.region);
},buildRendering:function(){
this.inherited(arguments);
_dd9.add(this.domNode,"dijitGutter"+(this.horizontal?"H":"V"));
}});
var _dfb=_dd8("dijit.layout.BorderContainer",_de2,{design:"headline",gutters:true,liveSplitters:true,persist:false,baseClass:"dijitBorderContainer",_splitterClass:_de4,postMixInProperties:function(){
if(!this.gutters){
this.baseClass+="NoGutter";
}
this.inherited(arguments);
},startup:function(){
if(this._started){
return;
}
_dd6.forEach(this.getChildren(),this._setupChild,this);
this.inherited(arguments);
},_setupChild:function(_dfc){
var _dfd=_dfc.region;
if(_dfd){
this.inherited(arguments);
_dd9.add(_dfc.domNode,this.baseClass+"Pane");
var ltr=this.isLeftToRight();
if(_dfd=="leading"){
_dfd=ltr?"left":"right";
}
if(_dfd=="trailing"){
_dfd=ltr?"right":"left";
}
if(_dfd!="center"&&(_dfc.splitter||this.gutters)&&!_dfc._splitterWidget){
var _dfe=_dfc.splitter?this._splitterClass:_dfa;
if(lang.isString(_dfe)){
_dfe=lang.getObject(_dfe);
}
var _dff=new _dfe({id:_dfc.id+"_splitter",container:this,child:_dfc,region:_dfd,live:this.liveSplitters});
_dff.isSplitter=true;
_dfc._splitterWidget=_dff;
_dda.place(_dff.domNode,_dfc.domNode,"after");
_dff.startup();
}
_dfc.region=_dfd;
}
},layout:function(){
this._layoutChildren();
},addChild:function(_e00,_e01){
this.inherited(arguments);
if(this._started){
this.layout();
}
},removeChild:function(_e02){
var _e03=_e02.region;
var _e04=_e02._splitterWidget;
if(_e04){
_e04.destroy();
delete _e02._splitterWidget;
}
this.inherited(arguments);
if(this._started){
this._layoutChildren();
}
_dd9.remove(_e02.domNode,this.baseClass+"Pane");
_ddc.set(_e02.domNode,{top:"auto",bottom:"auto",left:"auto",right:"auto",position:"static"});
_ddc.set(_e02.domNode,_e03=="top"||_e03=="bottom"?"width":"height","auto");
},getChildren:function(){
return _dd6.filter(this.inherited(arguments),function(_e05){
return !_e05.isSplitter;
});
},getSplitter:function(_e06){
return _dd6.filter(this.getChildren(),function(_e07){
return _e07.region==_e06;
})[0]._splitterWidget;
},resize:function(_e08,_e09){
if(!this.cs||!this.pe){
var node=this.domNode;
this.cs=_ddc.getComputedStyle(node);
this.pe=_ddb.getPadExtents(node,this.cs);
this.pe.r=_ddc.toPixelValue(node,this.cs.paddingRight);
this.pe.b=_ddc.toPixelValue(node,this.cs.paddingBottom);
_ddc.set(node,"padding","0px");
}
this.inherited(arguments);
},_layoutChildren:function(_e0a,_e0b){
if(!this._borderBox||!this._borderBox.h){
return;
}
var _e0c=_dd6.map(this.getChildren(),function(_e0d,idx){
return {pane:_e0d,weight:[_e0d.region=="center"?Infinity:0,_e0d.layoutPriority,(this.design=="sidebar"?1:-1)*(/top|bottom/.test(_e0d.region)?1:-1),idx]};
},this);
_e0c.sort(function(a,b){
var aw=a.weight,bw=b.weight;
for(var i=0;i<aw.length;i++){
if(aw[i]!=bw[i]){
return aw[i]-bw[i];
}
}
return 0;
});
var _e0e=[];
_dd6.forEach(_e0c,function(_e0f){
var pane=_e0f.pane;
_e0e.push(pane);
if(pane._splitterWidget){
_e0e.push(pane._splitterWidget);
}
});
var dim={l:this.pe.l,t:this.pe.t,w:this._borderBox.w-this.pe.w,h:this._borderBox.h-this.pe.h};
_de3.layoutChildren(this.domNode,dim,_e0e,_e0a,_e0b);
},destroyRecursive:function(){
_dd6.forEach(this.getChildren(),function(_e10){
var _e11=_e10._splitterWidget;
if(_e11){
_e11.destroy();
}
delete _e10._splitterWidget;
});
this.inherited(arguments);
}});
lang.extend(_ddf,{region:"",layoutPriority:0,splitter:false,minSize:0,maxSize:Infinity});
_dfb._Splitter=_de4;
_dfb._Gutter=_dfa;
return _dfb;
});
},"curam/html":function(){
define("curam/html",["curam/define"],function(){
curam.define.singleton("curam.html",{splitWithTag:function(_e12,_e13,_e14,_e15){
var _e16=_e12.split(_e13||"\n");
if(_e16.length<2){
return _e15?_e15(_e12):_e12;
}
var t=(_e14||"div")+">";
var _e17="<"+t,_e18="</"+t;
if(_e15){
for(var i=0;i<_e16.length;i++){
_e16[i]=_e15(_e16[i]);
}
}
return _e17+_e16.join(_e18+_e17)+_e18;
}});
return curam.html;
});
},"dojo/window":function(){
define("dojo/window",["./_base/lang","./_base/sniff","./_base/window","./dom","./dom-geometry","./dom-style"],function(lang,has,_e19,dom,geom,_e1a){
var _e1b=lang.getObject("dojo.window",true);
_e1b.getBox=function(){
var _e1c=(_e19.doc.compatMode=="BackCompat")?_e19.body():_e19.doc.documentElement,_e1d=geom.docScroll(),w,h;
if(has("touch")){
var _e1e=_e19.doc.parentWindow||_e19.doc.defaultView;
w=_e1e.innerWidth||_e1c.clientWidth;
h=_e1e.innerHeight||_e1c.clientHeight;
}else{
w=_e1c.clientWidth;
h=_e1c.clientHeight;
}
return {l:_e1d.x,t:_e1d.y,w:w,h:h};
};
_e1b.get=function(doc){
if(has("ie")&&_e1b!==document.parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc.parentWindow||doc.defaultView;
};
_e1b.scrollIntoView=function(node,pos){
try{
node=dom.byId(node);
var doc=node.ownerDocument||_e19.doc,body=doc.body||_e19.body(),html=doc.documentElement||body.parentNode,isIE=has("ie"),isWK=has("webkit");
if((!(has("mozilla")||isIE||isWK||has("opera"))||node==body||node==html)&&(typeof node.scrollIntoView!="undefined")){
node.scrollIntoView(false);
return;
}
var _e1f=doc.compatMode=="BackCompat",_e20=(isIE>=9&&node.ownerDocument.parentWindow.frameElement)?((html.clientHeight>0&&html.clientWidth>0&&(body.clientHeight==0||body.clientWidth==0||body.clientHeight>html.clientHeight||body.clientWidth>html.clientWidth))?html:body):(_e1f?body:html),_e21=isWK?body:_e20,_e22=_e20.clientWidth,_e23=_e20.clientHeight,rtl=!geom.isBodyLtr(),_e24=pos||geom.position(node),el=node.parentNode,_e25=function(el){
return ((isIE<=6||(isIE&&_e1f))?false:(_e1a.get(el,"position").toLowerCase()=="fixed"));
};
if(_e25(node)){
return;
}
while(el){
if(el==body){
el=_e21;
}
var _e26=geom.position(el),_e27=_e25(el);
if(el==_e21){
_e26.w=_e22;
_e26.h=_e23;
if(_e21==html&&isIE&&rtl){
_e26.x+=_e21.offsetWidth-_e26.w;
}
if(_e26.x<0||!isIE){
_e26.x=0;
}
if(_e26.y<0||!isIE){
_e26.y=0;
}
}else{
var pb=geom.getPadBorderExtents(el);
_e26.w-=pb.w;
_e26.h-=pb.h;
_e26.x+=pb.l;
_e26.y+=pb.t;
var _e28=el.clientWidth,_e29=_e26.w-_e28;
if(_e28>0&&_e29>0){
_e26.w=_e28;
_e26.x+=(rtl&&(isIE||el.clientLeft>pb.l))?_e29:0;
}
_e28=el.clientHeight;
_e29=_e26.h-_e28;
if(_e28>0&&_e29>0){
_e26.h=_e28;
}
}
if(_e27){
if(_e26.y<0){
_e26.h+=_e26.y;
_e26.y=0;
}
if(_e26.x<0){
_e26.w+=_e26.x;
_e26.x=0;
}
if(_e26.y+_e26.h>_e23){
_e26.h=_e23-_e26.y;
}
if(_e26.x+_e26.w>_e22){
_e26.w=_e22-_e26.x;
}
}
var l=_e24.x-_e26.x,t=_e24.y-Math.max(_e26.y,0),r=l+_e24.w-_e26.w,bot=t+_e24.h-_e26.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
if(rtl&&((isIE==8&&!_e1f)||isIE>=9)){
s=-s;
}
_e24.x+=el.scrollLeft;
el.scrollLeft+=s;
_e24.x-=el.scrollLeft;
}
if(bot*t>0){
_e24.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_e24.y-=el.scrollTop;
}
el=(el!=_e21)&&!_e27&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
};
require(["dojo/_base/sniff","dojo/on"],function(has,on){
if(has("ie")==8){
var _e2a=screen.deviceXDPI;
setInterval(function(){
if(screen.deviceXDPI!=_e2a){
_e2a=screen.deviceXDPI;
on.emit(_e19.global,"resize");
}
},250);
}
});
return _e1b;
});
},"curam/pagination/StateController":function(){
define("curam/pagination/StateController",["curam/pagination","curam/debug"],function(){
var _e2b=dojo.declare("curam.pagination.StateController",null,{pageSize:undefined,currentPage:0,_listModel:undefined,_gui:undefined,constructor:function(_e2c,gui){
this.pageSize=curam.pagination.defaultPageSize;
this._listModel=_e2c;
this.pageSize=curam.pagination.defaultPageSize;
this._gui=gui;
var _e2d={};
_e2d.pageSizeOptions=[15,30,45];
_e2d.pageSizeOptions.contains=function(val){
for(var i=0;i<_e2d.pageSizeOptions.length;i++){
if(_e2d.pageSizeOptions[i]==val){
return true;
}
}
return false;
};
if(!_e2d.pageSizeOptions.contains(curam.pagination.defaultPageSize)){
_e2d.pageSizeOptions.push(curam.pagination.defaultPageSize);
_e2d.pageSizeOptions.sort(function(a,b){
return a-b;
});
}
_e2d.currentPageSize=this.pageSize;
_e2d.directLinkRangeWidth=3;
_e2d.lastPage=this._getLastPageNumber();
this._gui.updateState(_e2d);
var _e2e={};
_e2e.first=dojo.hitch(this,this.gotoFirst);
_e2e.last=dojo.hitch(this,this.gotoLast);
_e2e.previous=dojo.hitch(this,this.gotoPrevious);
_e2e.next=dojo.hitch(this,this.gotoNext);
_e2e.page=dojo.hitch(this,this.gotoPage);
_e2e.pageSize=dojo.hitch(this,this.changePageSize);
this._gui.setHandlers(_e2e);
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
var _e2f=this._getLastPageNumber();
if(this.currentPage!=_e2f){
this.gotoPage(_e2f);
}
},gotoPrevious:function(){
if(this.currentPage>1){
this.gotoPage(this.currentPage-1);
}
},gotoNext:function(){
curam.debug.log("curam.pagination.StateController.gotoNext");
var _e30=this._getLastPageNumber();
if(this.currentPage<_e30){
this.gotoPage(this.currentPage+1);
}
},gotoPage:function(_e31){
curam.debug.log("curam.pagination.StateController.gotoPage: ",_e31);
if(this.currentPage!=0){
this._listModel.hideRange(this._calcRangeStart(this.currentPage),this._calcRangeEnd(this.currentPage));
}
this._listModel.showRange(this._calcRangeStart(_e31),this._calcRangeEnd(_e31));
this.currentPage=_e31;
this._updateGui();
},changePageSize:function(_e32){
curam.debug.log("curam.pagination.StateController.changePageSize: ",_e32);
this.pageSize=_e32;
var _e33={};
_e33.currentPageSize=_e32;
_e33.lastPage=this._getLastPageNumber();
this._gui.updateState(_e33);
this.reset();
},_calcRangeStart:function(_e34){
return (_e34*this.pageSize)-this.pageSize+1;
},_calcRangeEnd:function(_e35){
if(_e35!=this._getLastPageNumber()){
return _e35*this.pageSize;
}else{
return this._listModel.getRowCount();
}
},_getLastPageNumber:function(){
var _e36=this._listModel.getRowCount();
var mod=_e36%this.pageSize;
return ((_e36-mod)/this.pageSize)+(mod>0?1:0);
},_updateGui:function(){
var _e37={};
_e37.first=this.currentPage>1;
_e37.previous=_e37.first;
_e37.next=this.currentPage<this._getLastPageNumber();
_e37.last=_e37.next;
_e37.currentPage=this.currentPage;
_e37.rowInfo=[this._calcRangeStart(this.currentPage),this._calcRangeEnd(this.currentPage),this._listModel.getRowCount()];
this._gui.updateState(_e37);
}});
return _e2b;
});
},"dijit/_FocusMixin":function(){
define("dijit/_FocusMixin",["./focus","./_WidgetBase","dojo/_base/declare","dojo/_base/lang"],function(_e38,_e39,_e3a,lang){
lang.extend(_e39,{focused:false,onFocus:function(){
},onBlur:function(){
},_onFocus:function(){
this.onFocus();
},_onBlur:function(){
this.onBlur();
}});
return _e3a("dijit._FocusMixin",null,{_focusManager:_e38});
});
},"dojo/data/util/filter":function(){
define("dojo/data/util/filter",["dojo/_base/lang"],function(lang){
var _e3b=lang.getObject("dojo.data.util.filter",true);
_e3b.patternToRegExp=function(_e3c,_e3d){
var rxp="^";
var c=null;
for(var i=0;i<_e3c.length;i++){
c=_e3c.charAt(i);
switch(c){
case "\\":
rxp+=c;
i++;
rxp+=_e3c.charAt(i);
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
if(_e3d){
return new RegExp(rxp,"mi");
}else{
return new RegExp(rxp,"m");
}
};
return _e3b;
});
},"dijit/_WidgetsInTemplateMixin":function(){
define("dijit/_WidgetsInTemplateMixin",["dojo/_base/array","dojo/_base/declare","dojo/parser","dijit/registry"],function(_e3e,_e3f,_e40,_e41){
return _e3f("dijit._WidgetsInTemplateMixin",null,{_earlyTemplatedStartup:false,widgetsInTemplate:true,_beforeFillContent:function(){
if(this.widgetsInTemplate){
var node=this.domNode;
var cw=(this._startupWidgets=_e40.parse(node,{noStart:!this._earlyTemplatedStartup,template:true,inherited:{dir:this.dir,lang:this.lang,textDir:this.textDir},propsThis:this,scope:"dojo"}));
this._supportingWidgets=_e41.findWidgets(node);
this._attachTemplateNodes(cw,function(n,p){
return n[p];
});
}
},startup:function(){
_e3e.forEach(this._startupWidgets,function(w){
if(w&&!w._started&&w.startup){
w.startup();
}
});
this.inherited(arguments);
}});
});
},"url:dijit/templates/MenuBarItem.html":"<div class=\"dijitReset dijitInline dijitMenuItem dijitMenuItemLabel\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<span data-dojo-attach-point=\"containerNode\"></span>\n</div>\n","url:curam/widget/templates/OptimalBrowserMessage.html":"<div>\n  <div class=\"hidden\"\n       data-dojo-type=\"dojox/layout/ContentPane\"\n       data-dojo-attach-point=\"_optimalMessage\">\n  </div>\n</div>\n","curam/util/Navigation":function(){
define("curam/util/Navigation",["curam/util","curam/tab","curam/define"],function(){
curam.define.singleton("curam.util.Navigation",{goToPage:function(_e42,_e43){
var url=_e42+"Page.do"+curam.util.makeQueryString(_e43);
curam.util.Navigation.goToUrl(url);
},goToUrl:function(_e44){
curam.tab.getTabController().processURL(_e44);
}});
return curam.util.Navigation;
});
},"dijit/form/FilteringSelect":function(){
define("dijit/form/FilteringSelect",["dojo/data/util/filter","dojo/_base/declare","dojo/_base/Deferred","dojo/_base/lang","./MappedTextBox","./ComboBoxMixin"],function(_e45,_e46,_e47,lang,_e48,_e49){
return _e46("dijit.form.FilteringSelect",[_e48,_e49],{required:true,_lastDisplayedValue:"",_isValidSubset:function(){
return this._opened;
},isValid:function(){
return !!this.item||(!this.required&&this.get("displayedValue")=="");
},_refreshState:function(){
if(!this.searchTimer){
this.inherited(arguments);
}
},_callbackSetLabel:function(_e4a,_e4b,_e4c,_e4d){
if((_e4b&&_e4b[this.searchAttr]!==this._lastQuery)||(!_e4b&&_e4a.length&&this.store.getIdentity(_e4a[0])!=this._lastQuery)){
return;
}
if(!_e4a.length){
this.set("value","",_e4d||(_e4d===undefined&&!this.focused),this.textbox.value,null);
}else{
this.set("item",_e4a[0],_e4d);
}
},_openResultList:function(_e4e,_e4f,_e50){
if(_e4f[this.searchAttr]!==this._lastQuery){
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
},_setValueAttr:function(_e51,_e52,_e53,item){
if(!this._onChangeActive){
_e52=null;
}
if(item===undefined){
if(_e51===null||_e51===""){
_e51="";
if(!lang.isString(_e53)){
this._setDisplayedValueAttr(_e53||"",_e52);
return;
}
}
var self=this;
this._lastQuery=_e51;
_e47.when(this.store.get(_e51),function(item){
self._callbackSetLabel(item?[item]:[],undefined,undefined,_e52);
});
}else{
this.valueNode.value=_e51;
this.inherited(arguments);
}
},_setItemAttr:function(item,_e54,_e55){
this.inherited(arguments);
this._lastDisplayedValue=this.textbox.value;
},_getDisplayQueryString:function(text){
return text.replace(/([\\\*\?])/g,"\\$1");
},_setDisplayedValueAttr:function(_e56,_e57){
if(_e56==null){
_e56="";
}
if(!this._created){
if(!("displayedValue" in this.params)){
return;
}
_e57=false;
}
if(this.store){
this.closeDropDown();
var _e58=lang.clone(this.query);
var qs=this._getDisplayQueryString(_e56),q;
if(this.store._oldAPI){
q=qs;
}else{
q=_e45.patternToRegExp(qs,this.ignoreCase);
q.toString=function(){
return qs;
};
}
this._lastQuery=_e58[this.searchAttr]=q;
this.textbox.value=_e56;
this._lastDisplayedValue=_e56;
this._set("displayedValue",_e56);
var _e59=this;
var _e5a={ignoreCase:this.ignoreCase,deep:true};
lang.mixin(_e5a,this.fetchProperties);
this._fetchHandle=this.store.query(_e58,_e5a);
_e47.when(this._fetchHandle,function(_e5b){
_e59._fetchHandle=null;
_e59._callbackSetLabel(_e5b||[],_e58,_e5a,_e57);
},function(err){
_e59._fetchHandle=null;
if(!_e59._cancelingQuery){
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
var _e5c=lang.getObject("dojo.data.util.sorter",true);
_e5c.basicComparator=function(a,b){
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
_e5c.createSortFunction=function(_e5d,_e5e){
var _e5f=[];
function _e60(attr,dir,comp,s){
return function(_e61,_e62){
var a=s.getValue(_e61,attr);
var b=s.getValue(_e62,attr);
return dir*comp(a,b);
};
};
var _e63;
var map=_e5e.comparatorMap;
var bc=_e5c.basicComparator;
for(var i=0;i<_e5d.length;i++){
_e63=_e5d[i];
var attr=_e63.attribute;
if(attr){
var dir=(_e63.descending)?-1:1;
var comp=bc;
if(map){
if(typeof attr!=="string"&&("toString" in attr)){
attr=attr.toString();
}
comp=map[attr]||bc;
}
_e5f.push(_e60(attr,dir,comp,_e5e));
}
}
return function(rowA,rowB){
var i=0;
while(i<_e5f.length){
var ret=_e5f[i++](rowA,rowB);
if(ret!==0){
return ret;
}
}
return 0;
};
};
return _e5c;
});
},"dijit/form/_ButtonMixin":function(){
define("dijit/form/_ButtonMixin",["dojo/_base/declare","dojo/dom","dojo/_base/event","../registry"],function(_e64,dom,_e65,_e66){
return _e64("dijit.form._ButtonMixin",null,{label:"",type:"button",_onClick:function(e){
if(this.disabled){
_e65.stop(e);
return false;
}
var _e67=this.onClick(e)===false;
if(!_e67&&this.type=="submit"&&!(this.valueNode||this.focusNode).form){
for(var node=this.domNode;node.parentNode;node=node.parentNode){
var _e68=_e66.byNode(node);
if(_e68&&typeof _e68._onSubmit=="function"){
_e68._onSubmit(e);
_e67=true;
break;
}
}
}
if(_e67){
e.preventDefault();
}
return !_e67;
},postCreate:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},onClick:function(){
return true;
},_setLabelAttr:function(_e69){
this._set("label",_e69);
(this.containerNode||this.focusNode).innerHTML=_e69;
}});
});
},"dijit/registry":function(){
define("dijit/registry",["dojo/_base/array","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window","."],function(_e6a,has,_e6b,win,_e6c){
var _e6d={},hash={};
var _e6e={length:0,add:function(_e6f){
if(hash[_e6f.id]){
throw new Error("Tried to register widget with id=="+_e6f.id+" but that id is already registered");
}
hash[_e6f.id]=_e6f;
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
},getUniqueId:function(_e70){
var id;
do{
id=_e70+"_"+(_e70 in _e6d?++_e6d[_e70]:_e6d[_e70]=0);
}while(hash[id]);
return _e6c._scopeName=="dijit"?id:_e6c._scopeName+"_"+id;
},findWidgets:function(root){
var _e71=[];
function _e72(root){
for(var node=root.firstChild;node;node=node.nextSibling){
if(node.nodeType==1){
var _e73=node.getAttribute("widgetId");
if(_e73){
var _e74=hash[_e73];
if(_e74){
_e71.push(_e74);
}
}else{
_e72(node);
}
}
}
};
_e72(root);
return _e71;
},_destroyAll:function(){
_e6c._curFocus=null;
_e6c._prevFocus=null;
_e6c._activeStack=[];
_e6a.forEach(_e6e.findWidgets(win.body()),function(_e75){
if(!_e75._destroyed){
if(_e75.destroyRecursive){
_e75.destroyRecursive();
}else{
if(_e75.destroy){
_e75.destroy();
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
_e6c.registry=_e6e;
return _e6e;
});
},"dojo/date/locale":function(){
define("dojo/date/locale",["../_base/kernel","../_base/lang","../_base/array","../date","../cldr/supplemental","../regexp","../string","../i18n!../cldr/nls/gregorian"],function(dojo,lang,_e76,date,cldr,_e77,_e78,_e79){
lang.getObject("date.locale",true,dojo);
function _e7a(_e7b,_e7c,_e7d,_e7e){
return _e7e.replace(/([a-z])\1*/ig,function(_e7f){
var s,pad,c=_e7f.charAt(0),l=_e7f.length,_e80=["abbr","wide","narrow"];
switch(c){
case "G":
s=_e7c[(l<4)?"eraAbbr":"eraNames"][_e7b.getFullYear()<0?0:1];
break;
case "y":
s=_e7b.getFullYear();
switch(l){
case 1:
break;
case 2:
if(!_e7d.fullYear){
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
s=Math.ceil((_e7b.getMonth()+1)/3);
pad=true;
break;
case "M":
var m=_e7b.getMonth();
if(l<3){
s=m+1;
pad=true;
}else{
var _e81=["months","format",_e80[l-3]].join("-");
s=_e7c[_e81][m];
}
break;
case "w":
var _e82=0;
s=dojo.date.locale._getWeekOfYear(_e7b,_e82);
pad=true;
break;
case "d":
s=_e7b.getDate();
pad=true;
break;
case "D":
s=dojo.date.locale._getDayOfYear(_e7b);
pad=true;
break;
case "E":
var d=_e7b.getDay();
if(l<3){
s=d+1;
pad=true;
}else{
var _e83=["days","format",_e80[l-3]].join("-");
s=_e7c[_e83][d];
}
break;
case "a":
var _e84=(_e7b.getHours()<12)?"am":"pm";
s=_e7d[_e84]||_e7c["dayPeriods-format-wide-"+_e84];
break;
case "h":
case "H":
case "K":
case "k":
var h=_e7b.getHours();
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
s=_e7b.getMinutes();
pad=true;
break;
case "s":
s=_e7b.getSeconds();
pad=true;
break;
case "S":
s=Math.round(_e7b.getMilliseconds()*Math.pow(10,l-3));
pad=true;
break;
case "v":
case "z":
s=dojo.date.locale._getZone(_e7b,true,_e7d);
if(s){
break;
}
l=4;
case "Z":
var _e85=dojo.date.locale._getZone(_e7b,false,_e7d);
var tz=[(_e85<=0?"+":"-"),_e78.pad(Math.floor(Math.abs(_e85)/60),2),_e78.pad(Math.abs(_e85)%60,2)];
if(l==4){
tz.splice(0,0,"GMT");
tz.splice(3,0,":");
}
s=tz.join("");
break;
default:
throw new Error("dojo.date.locale.format: invalid pattern char: "+_e7e);
}
if(pad){
s=_e78.pad(s,l);
}
return s;
});
};
dojo.date.locale._getZone=function(_e86,_e87,_e88){
if(_e87){
return date.getTimezoneName(_e86);
}else{
return _e86.getTimezoneOffset();
}
};
dojo.date.locale.format=function(_e89,_e8a){
_e8a=_e8a||{};
var _e8b=dojo.i18n.normalizeLocale(_e8a.locale),_e8c=_e8a.formatLength||"short",_e8d=dojo.date.locale._getGregorianBundle(_e8b),str=[],_e8e=lang.hitch(this,_e7a,_e89,_e8d,_e8a);
if(_e8a.selector=="year"){
return _e8f(_e8d["dateFormatItem-yyyy"]||"yyyy",_e8e);
}
var _e90;
if(_e8a.selector!="date"){
_e90=_e8a.timePattern||_e8d["timeFormat-"+_e8c];
if(_e90){
str.push(_e8f(_e90,_e8e));
}
}
if(_e8a.selector!="time"){
_e90=_e8a.datePattern||_e8d["dateFormat-"+_e8c];
if(_e90){
str.push(_e8f(_e90,_e8e));
}
}
return str.length==1?str[0]:_e8d["dateTimeFormat-"+_e8c].replace(/\{(\d+)\}/g,function(_e91,key){
return str[key];
});
};
dojo.date.locale.regexp=function(_e92){
return dojo.date.locale._parseInfo(_e92).regexp;
};
dojo.date.locale._parseInfo=function(_e93){
_e93=_e93||{};
var _e94=dojo.i18n.normalizeLocale(_e93.locale),_e95=dojo.date.locale._getGregorianBundle(_e94),_e96=_e93.formatLength||"short",_e97=_e93.datePattern||_e95["dateFormat-"+_e96],_e98=_e93.timePattern||_e95["timeFormat-"+_e96],_e99;
if(_e93.selector=="date"){
_e99=_e97;
}else{
if(_e93.selector=="time"){
_e99=_e98;
}else{
_e99=_e95["dateTimeFormat-"+_e96].replace(/\{(\d+)\}/g,function(_e9a,key){
return [_e98,_e97][key];
});
}
}
var _e9b=[],re=_e8f(_e99,lang.hitch(this,_e9c,_e9b,_e95,_e93));
return {regexp:re,tokens:_e9b,bundle:_e95};
};
dojo.date.locale.parse=function(_e9d,_e9e){
var _e9f=/[\u200E\u200F\u202A\u202E]/g,info=dojo.date.locale._parseInfo(_e9e),_ea0=info.tokens,_ea1=info.bundle,re=new RegExp("^"+info.regexp.replace(_e9f,"")+"$",info.strict?"":"i"),_ea2=re.exec(_e9d&&_e9d.replace(_e9f,""));
if(!_ea2){
return null;
}
var _ea3=["abbr","wide","narrow"],_ea4=[1970,0,1,0,0,0,0],amPm="",_ea5=dojo.every(_ea2,function(v,i){
if(!i){
return true;
}
var _ea6=_ea0[i-1];
var l=_ea6.length;
switch(_ea6.charAt(0)){
case "y":
if(l!=2&&_e9e.strict){
_ea4[0]=v;
}else{
if(v<100){
v=Number(v);
var year=""+new Date().getFullYear(),_ea7=year.substring(0,2)*100,_ea8=Math.min(Number(year.substring(2,4))+20,99);
_ea4[0]=(v<_ea8)?_ea7+v:_ea7-100+v;
}else{
if(_e9e.strict){
return false;
}
_ea4[0]=v;
}
}
break;
case "M":
if(l>2){
var _ea9=_ea1["months-format-"+_ea3[l-3]].concat();
if(!_e9e.strict){
v=v.replace(".","").toLowerCase();
_ea9=dojo.map(_ea9,function(s){
return s.replace(".","").toLowerCase();
});
}
v=dojo.indexOf(_ea9,v);
if(v==-1){
return false;
}
}else{
v--;
}
_ea4[1]=v;
break;
case "E":
case "e":
var days=_ea1["days-format-"+_ea3[l-3]].concat();
if(!_e9e.strict){
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
_ea4[1]=0;
case "d":
_ea4[2]=v;
break;
case "a":
var am=_e9e.am||_ea1["dayPeriods-format-wide-am"],pm=_e9e.pm||_ea1["dayPeriods-format-wide-pm"];
if(!_e9e.strict){
var _eaa=/\./g;
v=v.replace(_eaa,"").toLowerCase();
am=am.replace(_eaa,"").toLowerCase();
pm=pm.replace(_eaa,"").toLowerCase();
}
if(_e9e.strict&&v!=am&&v!=pm){
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
_ea4[3]=v;
break;
case "m":
_ea4[4]=v;
break;
case "s":
_ea4[5]=v;
break;
case "S":
_ea4[6]=v;
}
return true;
});
var _eab=+_ea4[3];
if(amPm==="p"&&_eab<12){
_ea4[3]=_eab+12;
}else{
if(amPm==="a"&&_eab==12){
_ea4[3]=0;
}
}
var _eac=new Date(_ea4[0],_ea4[1],_ea4[2],_ea4[3],_ea4[4],_ea4[5],_ea4[6]);
if(_e9e.strict){
_eac.setFullYear(_ea4[0]);
}
var _ead=_ea0.join(""),_eae=_ead.indexOf("d")!=-1,_eaf=_ead.indexOf("M")!=-1;
if(!_ea5||(_eaf&&_eac.getMonth()>_ea4[1])||(_eae&&_eac.getDate()>_ea4[2])){
return null;
}
if((_eaf&&_eac.getMonth()<_ea4[1])||(_eae&&_eac.getDate()<_ea4[2])){
_eac=date.add(_eac,"hour",1);
}
return _eac;
};
function _e8f(_eb0,_eb1,_eb2,_eb3){
var _eb4=function(x){
return x;
};
_eb1=_eb1||_eb4;
_eb2=_eb2||_eb4;
_eb3=_eb3||_eb4;
var _eb5=_eb0.match(/(''|[^'])+/g),_eb6=_eb0.charAt(0)=="'";
dojo.forEach(_eb5,function(_eb7,i){
if(!_eb7){
_eb5[i]="";
}else{
_eb5[i]=(_eb6?_eb2:_eb1)(_eb7.replace(/''/g,"'"));
_eb6=!_eb6;
}
});
return _eb3(_eb5.join(""));
};
function _e9c(_eb8,_eb9,_eba,_ebb){
_ebb=_e77.escapeString(_ebb);
if(!_eba.strict){
_ebb=_ebb.replace(" a"," ?a");
}
return _ebb.replace(/([a-z])\1*/ig,function(_ebc){
var s,c=_ebc.charAt(0),l=_ebc.length,p2="",p3="";
if(_eba.strict){
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
var am=_eba.am||_eb9["dayPeriods-format-wide-am"],pm=_eba.pm||_eb9["dayPeriods-format-wide-pm"];
s=am+"|"+pm;
if(!_eba.strict){
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
if(_eb8){
_eb8.push(_ebc);
}
return "("+s+")";
}).replace(/[\xa0 ]/g,"[\\s\\xa0]");
};
var _ebd=[];
dojo.date.locale.addCustomFormats=function(_ebe,_ebf){
_ebd.push({pkg:_ebe,name:_ebf});
};
dojo.date.locale._getGregorianBundle=function(_ec0){
var _ec1={};
dojo.forEach(_ebd,function(desc){
var _ec2=dojo.i18n.getLocalization(desc.pkg,desc.name,_ec0);
_ec1=lang.mixin(_ec1,_ec2);
},this);
return _ec1;
};
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(item,type,_ec3,_ec4){
var _ec5,_ec6=dojo.date.locale._getGregorianBundle(_ec4),_ec7=[item,_ec3,type];
if(_ec3=="standAlone"){
var key=_ec7.join("-");
_ec5=_ec6[key];
if(_ec5[0]==1){
_ec5=undefined;
}
}
_ec7[1]="format";
return (_ec5||_ec6[_ec7.join("-")]).concat();
};
dojo.date.locale.isWeekend=function(_ec8,_ec9){
var _eca=cldr.getWeekend(_ec9),day=(_ec8||new Date()).getDay();
if(_eca.end<_eca.start){
_eca.end+=7;
if(day<_eca.start){
day+=7;
}
}
return day>=_eca.start&&day<=_eca.end;
};
dojo.date.locale._getDayOfYear=function(_ecb){
return date.difference(new Date(_ecb.getFullYear(),0,1,_ecb.getHours()),_ecb)+1;
};
dojo.date.locale._getWeekOfYear=function(_ecc,_ecd){
if(arguments.length==1){
_ecd=0;
}
var _ece=new Date(_ecc.getFullYear(),0,1).getDay(),adj=(_ece-_ecd+7)%7,week=Math.floor((dojo.date.locale._getDayOfYear(_ecc)+adj-1)/7);
if(_ece==_ecd){
week++;
}
return week;
};
return dojo.date.locale;
});
},"dijit/tree/_dndContainer":function(){
define("dijit/tree/_dndContainer",["dojo/aspect","dojo/_base/declare","dojo/dom-class","dojo/_base/event","dojo/_base/lang","dojo/mouse","dojo/on"],function(_ecf,_ed0,_ed1,_ed2,lang,_ed3,on){
return _ed0("dijit.tree._dndContainer",null,{constructor:function(tree,_ed4){
this.tree=tree;
this.node=tree.domNode;
lang.mixin(this,_ed4);
this.current=null;
this.containerState="";
_ed1.add(this.node,"dojoDndContainer");
this.events=[on(this.node,_ed3.enter,lang.hitch(this,"onOverEvent")),on(this.node,_ed3.leave,lang.hitch(this,"onOutEvent")),_ecf.after(this.tree,"_onNodeMouseEnter",lang.hitch(this,"onMouseOver"),true),_ecf.after(this.tree,"_onNodeMouseLeave",lang.hitch(this,"onMouseOut"),true),on(this.node,"dragstart",lang.hitch(_ed2,"stop")),on(this.node,"selectstart",lang.hitch(_ed2,"stop"))];
},destroy:function(){
var h;
while(h=this.events.pop()){
h.remove();
}
this.node=this.parent=null;
},onMouseOver:function(_ed5){
this.current=_ed5;
},onMouseOut:function(){
this.current=null;
},_changeState:function(type,_ed6){
var _ed7="dojoDnd"+type;
var _ed8=type.toLowerCase()+"State";
_ed1.replace(this.node,_ed7+_ed6,_ed7+this[_ed8]);
this[_ed8]=_ed6;
},_addItemClass:function(node,type){
_ed1.add(node,"dojoDndItem"+type);
},_removeItemClass:function(node,type){
_ed1.remove(node,"dojoDndItem"+type);
},onOverEvent:function(){
this._changeState("Container","Over");
},onOutEvent:function(){
this._changeState("Container","");
}});
});
},"curam/layout/TabContainer":function(){
require({cache:{"url:curam/layout/resources/TabContainer.html":"<div class=\"dijitTabContainer\">\r\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\r\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer dijitAlignTop\"></div>\r\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container dijitAlignClient\" data-dojo-attach-point=\"containerNode\"></div>\r\n</div>\r\n"}});
define("curam/layout/TabContainer",["dijit/layout/TabContainer","dojo/text!curam/layout/resources/TabContainer.html"],function(_ed9,_eda){
var _edb=dojo.declare("curam.layout.TabContainer",_ed9,{templateString:_eda,_theSelectedTabIndex:0,_thePage:null,_theChildren:null,postCreate:function(){
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
var _edc=this.getChildren();
var i=0;
var _edd=0;
for(i=0;i<_edc.length;i++){
if(_edc[i].get("selected")){
_edd=i;
break;
}
}
this._theSelectedTabIndex=_edd;
this._thePage=page;
this._theChildren=_edc;
}
this.inherited(arguments);
}});
return _edb;
});
},"dijit/form/_FormSelectWidget":function(){
define("dijit/form/_FormSelectWidget",["dojo/_base/array","dojo/aspect","dojo/data/util/sorter","dojo/_base/declare","dojo/dom","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/query","./_FormValueWidget"],function(_ede,_edf,_ee0,_ee1,dom,_ee2,_ee3,lang,_ee4,_ee5){
return _ee1("dijit.form._FormSelectWidget",_ee5,{multiple:false,options:null,store:null,query:null,queryOptions:null,onFetch:null,sortByLabel:true,loadChildrenOnOpen:false,getOptions:function(_ee6){
var _ee7=_ee6,opts=this.options||[],l=opts.length;
if(_ee7===undefined){
return opts;
}
if(lang.isArray(_ee7)){
return _ede.map(_ee7,"return this.getOptions(item);",this);
}
if(lang.isObject(_ee6)){
if(!_ede.some(this.options,function(o,idx){
if(o===_ee7||(o.value&&o.value===_ee7.value)){
_ee7=idx;
return true;
}
return false;
})){
_ee7=-1;
}
}
if(typeof _ee7=="string"){
for(var i=0;i<l;i++){
if(opts[i].value===_ee7){
_ee7=i;
break;
}
}
}
if(typeof _ee7=="number"&&_ee7>=0&&_ee7<l){
return this.options[_ee7];
}
return null;
},addOption:function(_ee8){
if(!lang.isArray(_ee8)){
_ee8=[_ee8];
}
_ede.forEach(_ee8,function(i){
if(i&&lang.isObject(i)){
this.options.push(i);
}
},this);
this._loadChildren();
},removeOption:function(_ee9){
if(!lang.isArray(_ee9)){
_ee9=[_ee9];
}
var _eea=this.getOptions(_ee9);
_ede.forEach(_eea,function(i){
if(i){
this.options=_ede.filter(this.options,function(node){
return (node.value!==i.value||node.label!==i.label);
});
this._removeOptionItem(i);
}
},this);
this._loadChildren();
},updateOption:function(_eeb){
if(!lang.isArray(_eeb)){
_eeb=[_eeb];
}
_ede.forEach(_eeb,function(i){
var _eec=this.getOptions(i),k;
if(_eec){
for(k in i){
_eec[k]=i[k];
}
}
},this);
this._loadChildren();
},setStore:function(_eed,_eee,_eef){
var _ef0=this.store;
_eef=_eef||{};
if(_ef0!==_eed){
var h;
while(h=this._notifyConnections.pop()){
h.remove();
}
if(_eed&&_eed.getFeatures()["dojo.data.api.Notification"]){
this._notifyConnections=[_edf.after(_eed,"onNew",lang.hitch(this,"_onNewItem"),true),_edf.after(_eed,"onDelete",lang.hitch(this,"_onDeleteItem"),true),_edf.after(_eed,"onSet",lang.hitch(this,"_onSetItem"),true)];
}
this._set("store",_eed);
}
this._onChangeActive=false;
if(this.options&&this.options.length){
this.removeOption(this.options);
}
if(_eed){
this._loadingStore=true;
_eed.fetch(lang.delegate(_eef,{onComplete:function(_ef1,opts){
if(this.sortByLabel&&!_eef.sort&&_ef1.length){
_ef1.sort(_ee0.createSortFunction([{attribute:_eed.getLabelAttributes(_ef1[0])[0]}],_eed));
}
if(_eef.onFetch){
_ef1=_eef.onFetch.call(this,_ef1,opts);
}
_ede.forEach(_ef1,function(i){
this._addOptionForItem(i);
},this);
this._loadingStore=false;
this.set("value","_pendingValue" in this?this._pendingValue:_eee);
delete this._pendingValue;
if(!this.loadChildrenOnOpen){
this._loadChildren();
}else{
this._pseudoLoadChildren(_ef1);
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
return _ef0;
},_setValueAttr:function(_ef2,_ef3){
if(this._loadingStore){
this._pendingValue=_ef2;
return;
}
var opts=this.getOptions()||[];
if(!lang.isArray(_ef2)){
_ef2=[_ef2];
}
_ede.forEach(_ef2,function(i,idx){
if(!lang.isObject(i)){
i=i+"";
}
if(typeof i==="string"){
_ef2[idx]=_ede.filter(opts,function(node){
return node.value===i;
})[0]||{value:"",label:""};
}
},this);
_ef2=_ede.filter(_ef2,function(i){
return i&&i.value;
});
if(!this.multiple&&(!_ef2[0]||!_ef2[0].value)&&opts.length){
_ef2[0]=opts[0];
}
_ede.forEach(opts,function(i){
i.selected=_ede.some(_ef2,function(v){
return v.value===i.value;
});
});
var val=_ede.map(_ef2,function(i){
return i.value;
}),disp=_ede.map(_ef2,function(i){
return i.label;
});
this._set("value",this.multiple?val:val[0]);
this._setDisplay(this.multiple?disp:disp[0]);
this._updateSelection();
this._handleOnChange(this.value,_ef3);
},_getDisplayedValueAttr:function(){
var val=this.get("value");
if(!lang.isArray(val)){
val=[val];
}
var ret=_ede.map(this.getOptions(val),function(v){
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
_ede.forEach(this._getChildren(),function(_ef4){
_ef4.destroyRecursive();
});
_ede.forEach(this.options,this._addOptionItem,this);
this._updateSelection();
},_updateSelection:function(){
this._set("value",this._getValueFromOpts());
var val=this.value;
if(!lang.isArray(val)){
val=[val];
}
if(val&&val[0]){
_ede.forEach(this._getChildren(),function(_ef5){
var _ef6=_ede.some(val,function(v){
return _ef5.option&&(v===_ef5.option.value);
});
_ee2.toggle(_ef5.domNode,this.baseClass+"SelectedOption",_ef6);
_ef5.domNode.setAttribute("aria-selected",_ef6);
},this);
}
},_getValueFromOpts:function(){
var opts=this.getOptions()||[];
if(!this.multiple&&opts.length){
var opt=_ede.filter(opts,function(i){
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
return _ede.map(_ede.filter(opts,function(i){
return i.selected;
}),function(i){
return i.value;
})||[];
}
}
return "";
},_onNewItem:function(item,_ef7){
if(!_ef7||!_ef7.parent){
this._addOptionForItem(item);
}
},_onDeleteItem:function(item){
var _ef8=this.store;
this.removeOption(_ef8.getIdentity(item));
},_onSetItem:function(item){
this.updateOption(this._getOptionObjForItem(item));
},_getOptionObjForItem:function(item){
var _ef9=this.store,_efa=_ef9.getLabel(item),_efb=(_efa?_ef9.getIdentity(item):null);
return {value:_efb,label:_efa,item:item};
},_addOptionForItem:function(item){
var _efc=this.store;
if(!_efc.isItemLoaded(item)){
_efc.loadItem({item:item,onItem:function(i){
this._addOptionForItem(i);
},scope:this});
return;
}
var _efd=this._getOptionObjForItem(item);
this.addOption(_efd);
},constructor:function(_efe){
this._oValue=(_efe||{}).value||null;
this._notifyConnections=[];
},buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},_fillContent:function(){
var opts=this.options;
if(!opts){
opts=this.options=this.srcNodeRef?_ee4("> *",this.srcNodeRef).map(function(node){
if(node.getAttribute("type")==="separator"){
return {value:"",label:"",selected:false,disabled:false};
}
return {value:(node.getAttribute("data-"+_ee3._scopeName+"-value")||node.getAttribute("value")),label:String(node.innerHTML),selected:node.getAttribute("selected")||false,disabled:node.getAttribute("disabled")||false};
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
var _eff=this.store,_f00={};
_ede.forEach(["query","queryOptions","onFetch"],function(i){
if(this[i]){
_f00[i]=this[i];
}
delete this[i];
},this);
if(_eff&&_eff.getFeatures()["dojo.data.api.Identity"]){
this.store=null;
this.setStore(_eff,this._oValue,_f00);
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
define("curam/util/ResourceBundle",["dojo/i18n","dojo/string"],function(i18n,_f01){
var _f02=dojo.declare("curam.util.ResourceBundle",null,{_bundle:undefined,constructor:function(_f03,_f04){
var _f05=_f03.split(".");
var _f06=_f05[_f05.length-1];
var _f07=_f05.length==1?"curam.application":_f03.slice(0,_f03.length-_f06.length-1);
try{
var b=i18n.getLocalization(_f07,_f06,_f04);
if(this._isEmpty(b)){
throw new Error("Empty resource bundle.");
}else{
this._bundle=b;
}
}
catch(e){
throw new Error("Unable to access resource bundle: "+_f07+"."+_f06+": "+e.message);
}
},_isEmpty:function(_f08){
for(var prop in _f08){
return false;
}
return true;
},getProperty:function(key,_f09){
var msg=this._bundle[key];
var _f0a=msg;
if(_f09){
_f0a=_f01.substitute(msg,_f09);
}
return _f0a;
}});
return _f02;
});
},"dijit/form/Select":function(){
require({cache:{"url:dijit/form/templates/Select.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tdata-dojo-attach-point=\"_buttonNode,tableNode,focusNode\" cellspacing='0' cellpadding='0'\n\trole=\"combobox\" aria-haspopup=\"true\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonContents dijitButtonNode\" role=\"presentation\"\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"  data-dojo-attach-point=\"containerNode,_popupStateNode\"></span\n\t\t\t><input type=\"hidden\" ${!nameAttrSetting} data-dojo-attach-point=\"valueNode\" value=\"${value}\" aria-hidden=\"true\"\n\t\t/></td><td class=\"dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton\"\n\t\t\t\tdata-dojo-attach-point=\"titleNode\" role=\"presentation\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t></tr></tbody\n></table>\n"}});
define("dijit/form/Select",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/_base/event","dojo/i18n","dojo/_base/lang","./_FormSelectWidget","../_HasDropDown","../Menu","../MenuItem","../MenuSeparator","../Tooltip","dojo/text!./templates/Select.html","dojo/i18n!./nls/validate"],function(_f0b,_f0c,_f0d,_f0e,_f0f,_f10,_f11,i18n,lang,_f12,_f13,Menu,_f14,_f15,_f16,_f17){
var _f18=_f0c("dijit.form._SelectMenu",Menu,{buildRendering:function(){
this.inherited(arguments);
var o=(this.menuTableNode=this.domNode);
var n=(this.domNode=_f0f.create("div",{style:{overflowX:"hidden",overflowY:"scroll"}}));
if(o.parentNode){
o.parentNode.replaceChild(n,o);
}
_f0e.remove(o,"dijitMenuTable");
n.className=o.className+" dijitSelectMenu";
o.className="dijitReset dijitMenuTable";
o.setAttribute("role","listbox");
n.setAttribute("role","presentation");
n.appendChild(o);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onmousemove",_f11.stop);
},resize:function(mb){
if(mb){
_f10.setMarginBox(this.domNode,mb);
if("w" in mb){
this.menuTableNode.style.width="100%";
}
}
}});
var _f19=_f0c("dijit.form.Select",[_f12,_f13],{baseClass:"dijitSelect",templateString:_f17,required:false,state:"",message:"",tooltipPosition:[],emptyLabel:"&#160;",_isLoaded:false,_childrenLoaded:false,_fillContent:function(){
this.inherited(arguments);
if(this.options.length&&!this.value&&this.srcNodeRef){
var si=this.srcNodeRef.selectedIndex||0;
this.value=this.options[si>=0?si:0].value;
}
this.dropDown=new _f18({id:this.id+"_menu"});
_f0e.add(this.dropDown.domNode,this.baseClass+"Menu");
},_getMenuItemForOption:function(_f1a){
if(!_f1a.value&&!_f1a.label){
return new _f15();
}else{
var _f1b=lang.hitch(this,"_setValueAttr",_f1a);
var item=new _f14({option:_f1a,label:_f1a.label||this.emptyLabel,onClick:_f1b,disabled:_f1a.disabled||false});
item.focusNode.setAttribute("role","listitem");
return item;
}
},_addOptionItem:function(_f1c){
if(this.dropDown){
this.dropDown.addChild(this._getMenuItemForOption(_f1c));
}
},_getChildren:function(){
if(!this.dropDown){
return [];
}
return this.dropDown.getChildren();
},_loadChildren:function(_f1d){
if(_f1d===true){
if(this.dropDown){
delete this.dropDown.focusedChild;
}
if(this.options.length){
this.inherited(arguments);
}else{
_f0b.forEach(this._getChildren(),function(_f1e){
_f1e.destroyRecursive();
});
var item=new _f14({label:"&#160;"});
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
},_setValueAttr:function(_f1f){
this.inherited(arguments);
_f0d.set(this.valueNode,"value",this.get("value"));
this.validate(this.focused);
},_setDisabledAttr:function(_f20){
this.inherited(arguments);
this.validate(this.focused);
},_setRequiredAttr:function(_f21){
this._set("required",_f21);
this.focusNode.setAttribute("aria-required",_f21);
this.validate(this.focused);
},_setDisplay:function(_f22){
var lbl=_f22||this.emptyLabel;
this.containerNode.innerHTML="<span class=\"dijitReset dijitInline "+this.baseClass+"Label\">"+lbl+"</span>";
this.focusNode.setAttribute("aria-valuetext",lbl);
},validate:function(_f23){
var _f24=this.disabled||this.isValid(_f23);
this._set("state",_f24?"":"Incomplete");
this.focusNode.setAttribute("aria-invalid",_f24?"false":"true");
var _f25=_f24?"":this._missingMsg;
if(_f25&&this.focused&&this._hasBeenBlurred){
_f16.show(_f25,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}else{
_f16.hide(this.domNode);
}
this._set("message",_f25);
return _f24;
},isValid:function(){
return (!this.required||this.value===0||!(/^\s*$/.test(this.value||"")));
},reset:function(){
this.inherited(arguments);
_f16.hide(this.domNode);
this.validate(this.focused);
},postMixInProperties:function(){
this.inherited(arguments);
this._missingMsg=i18n.getLocalization("dijit.form","validate",this.lang).missingMessage;
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onmousemove",_f11.stop);
},_setStyleAttr:function(_f26){
this.inherited(arguments);
_f0e.toggle(this.domNode,this.baseClass+"FixedWidth",!!this.domNode.style.width);
},isLoaded:function(){
return this._isLoaded;
},loadDropDown:function(_f27){
this._loadChildren(true);
this._isLoaded=true;
_f27();
},closeDropDown:function(){
this.inherited(arguments);
if(this.dropDown&&this.dropDown.menuTableNode){
this.dropDown.menuTableNode.style.width="";
}
},uninitialize:function(_f28){
if(this.dropDown&&!this.dropDown._destroyed){
this.dropDown.destroyRecursive(_f28);
delete this.dropDown;
}
this.inherited(arguments);
},_onFocus:function(){
this.validate(true);
this.inherited(arguments);
},_onBlur:function(){
_f16.hide(this.domNode);
this.inherited(arguments);
}});
_f19._Menu=_f18;
return _f19;
});
},"url:curam/layout/resources/Dialog.html":"<div class=\"dijitDialog\" role=\"alertdialog\" aria-labelledby=\"${id}_title\">\r\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\r\n\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span>\r\n\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" aria-label=\"${closeModalText}\" tabIndex=\"0\" onKeyDown=\"curam.util.isShiftTab(event)\">\r\n\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\">${closeModalText}</span>\r\n\t</span>\r\n  <span id=\"${id}_prompt\" class=\"hidden\" data-dojo-attach-point=\"promptText\">${modalPromptText}</span>\r\n\t</div>\r\n\t\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\r\n</div>\r\n","dojo/store/util/QueryResults":function(){
define("dojo/store/util/QueryResults",["../../_base/array","../../_base/lang","../../_base/Deferred"],function(_f29,lang,_f2a){
var util=lang.getObject("dojo.store.util",true);
util.QueryResults=function(_f2b){
if(!_f2b){
return _f2b;
}
if(_f2b.then){
_f2b=lang.delegate(_f2b);
}
function _f2c(_f2d){
if(!_f2b[_f2d]){
_f2b[_f2d]=function(){
var args=arguments;
return _f2a.when(_f2b,function(_f2e){
Array.prototype.unshift.call(args,_f2e);
return util.QueryResults(_f29[_f2d].apply(_f29,args));
});
};
}
};
_f2c("forEach");
_f2c("filter");
_f2c("map");
if(!_f2b.total){
_f2b.total=_f2a.when(_f2b,function(_f2f){
return _f2f.length;
});
}
return _f2b;
};
return util.QueryResults;
});
},"curam/FastUIMController":function(){
define("curam/FastUIMController",["dojo/parser","curam/UIMController","curam/debug","curam/util/onLoad","curam/util/ResourceBundle"],function(_f30){
dojo.requireLocalization("curam.application","Debug");
var _f31=new curam.util.ResourceBundle("Debug");
var _f32=dojo.declare("curam.FastUIMController",[curam.UIMController],{buildRendering:function(){
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
curam.debug.log("curam.FastUIMController "+_f31.getProperty("curam.FastUIMControlle.msg"));
}else{
var _f33=dojo.hitch(this,"processFrameLoadEvent");
curam.util.onLoad.addSubscriber(this.frame.id,_f33);
dojo.connect(this,"destroy",function(){
curam.util.onLoad.removeSubscriber(this.iframeId,_f33);
_f33=null;
});
}
if(this.inDialog){
dojo.style(this.frame,{width:this.width,height:this.height});
}
},_iframeLoaded:function(){
return dojo.attr(this.frame,"data-done-loading")=="true";
}});
return _f32;
});
},"curam/widget/DeferredDropDownButton":function(){
require({cache:{"url:curam/widget/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n"}});
define("curam/widget/DeferredDropDownButton",["dijit/form/DropDownButton","dojo/text!curam/widget/templates/DropDownButton.html","dijit/form/Button","dijit/MenuItem","curam/debug","curam/util","curam/util/ResourceBundle"],function(_f34,_f35){
dojo.requireLocalization("curam.application","Debug");
var _f36=new curam.util.ResourceBundle("Debug");
var _f37=dojo.declare("curam.widget.DeferredDropDownButton",dijit.form.DropDownButton,{templateString:_f35,o3tabId:null,useCustomPlaceAlgorithm:false,startup:function(){
if(this._started){
return;
}
var _f38=dojo.attr(this.domNode,"class").split(" ");
dojo.forEach(_f38,dojo.hitch(this,function(_f39){
if(_f39.indexOf("tab-widget-id-")!=-1){
this.o3tabId=_f39.slice(14,_f39.length);
}
}));
this.widgetTemplate=curam.widgetTemplates?curam.widgetTemplates[this.id]:null;
dijit.form.Button.prototype.startup.apply(this);
},toggleDropDown:function(){
if(!this.dropDown&&this.widgetTemplate){
this.widgetTemplate=this.widgetTemplate.split("&lt;").join("<").split("&gt;").join(">").split("&amp;").join("&").split("&quot;").join("'");
var _f3a=dojo.create("div",{innerHTML:this.widgetTemplate,style:{display:"none"}},dojo.body());
this.dropDown=dojo.parser.parse(_f3a)[0];
var menu=dijit.byNode(_f3a.firstChild);
if(menu.getChildren().length==0){
var mi=new dijit.MenuItem({disabled:true,label:LOCALISED_EMPTY_MENU_MARKER});
menu.addChild(mi);
}
this.widgetTemplate=null;
curam.debug.log(_f36.getProperty("curam.widget.DeferredDropDownButton.publish")+" /curam/menu/created "+_f36.getProperty("curam.widget.DeferredDropDownButton.for"),this.o3tabId);
var _f3b=curam.util.getTopmostWindow();
_f3b.dojo.publish("/curam/menu/created",[this.o3tabId]);
}
this.inherited(arguments);
},openDropDown:function(){
curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm=true;
this.inherited(arguments);
curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm=false;
}});
return _f37;
});
},"dijit/form/_ListBase":function(){
define("dijit/form/_ListBase",["dojo/_base/declare","dojo/window"],function(_f3c,_f3d){
return _f3c("dijit.form._ListBase",null,{selected:null,_getTarget:function(evt){
var tgt=evt.target;
var _f3e=this.containerNode;
if(tgt==_f3e||tgt==this.domNode){
return null;
}
while(tgt&&tgt.parentNode!=_f3e){
tgt=tgt.parentNode;
}
return tgt;
},selectFirstNode:function(){
var _f3f=this.containerNode.firstChild;
while(_f3f&&_f3f.style.display=="none"){
_f3f=_f3f.nextSibling;
}
this._setSelectedAttr(_f3f);
},selectLastNode:function(){
var last=this.containerNode.lastChild;
while(last&&last.style.display=="none"){
last=last.previousSibling;
}
this._setSelectedAttr(last);
},selectNextNode:function(){
var _f40=this._getSelectedAttr();
if(!_f40){
this.selectFirstNode();
}else{
var next=_f40.nextSibling;
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
var _f41=this._getSelectedAttr();
if(!_f41){
this.selectLastNode();
}else{
var prev=_f41.previousSibling;
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
var _f42=this._getSelectedAttr();
if(_f42){
this.onDeselect(_f42);
this.selected=null;
}
if(node&&node.parentNode==this.containerNode){
this.selected=node;
_f3d.scrollIntoView(node);
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
define("curam/util/UIMFragment",["curam/util/Request","curam/define","curam/debug","curam/util/ScreenContext"],function(_f43){
curam.define.singleton("curam.util.UIMFragment",{get:function(args){
var _f44=args&&args.pageID;
var url=args&&args.url;
var _f45=args&&args.params;
var _f46=args&&args.onLoad;
var _f47=args&&args.onDownloadError;
var _f48=args&&args.targetID;
if(_f48===""||typeof _f48==="undefined"){
throw "UIMFragment: targetID must be set.";
}
var _f49=null;
if(url){
_f49=url;
}else{
_f49=curam.util.UIMFragment._constructPath(_f44)+curam.util.UIMFragment._addCDEJParameters()+curam.util.UIMFragment._encodeParameters(_f45);
}
curam.debug.log("UIMFragment: GET to "+_f49);
curam.util.UIMFragment._doService(_f49,_f48,args,_f46,_f47);
},submitForm:function(_f4a){
var _f4a=dojo.fixEvent(_f4a);
var _f4b=_f4a.target;
dojo.stopEvent(_f4a);
var _f4c={url:curam.util.UIMFragment._constructFormActionPath(_f4b),form:_f4b,load:function(data){
var cp=dijit.getEnclosingWidget(_f4b);
cp.set("content",data);
},error:function(_f4d){
alert("form error: error!!");
}};
_f43.post(_f4c);
console.log(_f4a+" "+_f4b);
},_constructFormActionPath:function(_f4e){
var _f4f="";
if(window===window.top){
_f4f=curam.config.locale+"/";
}
return _f4f+_f4e.getAttribute("action");
},_initForm:function(_f50){
var _f51=dojo.query("form",dijit.byId(_f50).domNode)[0];
if(_f51){
dojo.connect(_f51,"onsubmit",curam.util.UIMFragment.submitForm);
}
},_constructPath:function(_f52){
var _f53=window;
var _f54=window.top;
return curam.util.UIMFragment._constructPathValue(_f52,_f53,_f54);
},_constructPathValue:function(_f55,_f56,_f57){
if(_f55===""||typeof _f55==="undefined"){
throw "UIMFragment: pageID must be set.";
}
var _f58="";
if(_f56.location.pathname===_f57.location.pathname){
var _f59=_f57.curam&&_f57.curam.config&&_f57.curam.config.locale;
_f58=(_f59||"en")+"/";
}
return _f58+_f55+"Page.do";
},_encodeParameters:function(_f5a){
if(typeof _f5a==="undefined"||dojo.toJson(_f5a)==="{}"){
curam.debug.log("UIMFragment: No params included in request.");
return "";
}
var _f5b=[];
for(var _f5c in _f5a){
_f5b.push(_f5c+"="+encodeURIComponent(_f5a[_f5c]));
}
return "&"+_f5b.join("&");
},_addCDEJParameters:function(){
return "?"+jsScreenContext.toRequestString();
},_doService:function(url,_f5d,args,_f5e,_f5f){
var cp=dijit.byId(_f5d);
cp.onLoad=dojo.hitch(cp,curam.util.UIMFragment._handleLoadSuccess,args,_f5e);
cp.preventCache=true;
cp.set("href",url);
},_handleDownloadError:function(_f60){
curam.debug.log("Error invoking the UIMFragment: "+_f60);
return "UIMFragment: Generic Error Handler";
},_handleLoadSuccess:function(_f61,_f62){
curam.util.UIMFragment._initForm(_f61.targetID);
if(_f62){
_f62(this);
}
curam.debug.log("");
return "UIMFragment: Generic Success Handler";
}});
return curam.util.UIMFragment;
});
},"dijit/form/_FormWidget":function(){
define("dijit/form/_FormWidget",["dojo/_base/declare","dojo/_base/kernel","dojo/ready","../_Widget","../_CssStateMixin","../_TemplatedMixin","./_FormWidgetMixin"],function(_f63,_f64,_f65,_f66,_f67,_f68,_f69){
if(!_f64.isAsync){
_f65(0,function(){
var _f6a=["dijit/form/_FormValueWidget"];
require(_f6a);
});
}
return _f63("dijit.form._FormWidget",[_f66,_f68,_f67,_f69],{setDisabled:function(_f6b){
_f64.deprecated("setDisabled("+_f6b+") is deprecated. Use set('disabled',"+_f6b+") instead.","","2.0");
this.set("disabled",_f6b);
},setValue:function(_f6c){
_f64.deprecated("dijit.form._FormWidget:setValue("+_f6c+") is deprecated.  Use set('value',"+_f6c+") instead.","","2.0");
this.set("value",_f6c);
},getValue:function(){
_f64.deprecated(this.declaredClass+"::getValue() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},postMixInProperties:function(){
this.nameAttrSetting=this.name?("name=\""+this.name.replace(/'/g,"&quot;")+"\""):"";
this.inherited(arguments);
},_setTypeAttr:null});
});
},"dojo/DeferredList":function(){
define("dojo/DeferredList",["./_base/kernel","./_base/Deferred","./_base/array"],function(dojo,_f6d,_f6e){
dojo.DeferredList=function(list,_f6f,_f70,_f71,_f72){
var _f73=[];
_f6d.call(this);
var self=this;
if(list.length===0&&!_f6f){
this.resolve([0,[]]);
}
var _f74=0;
_f6e.forEach(list,function(item,i){
item.then(function(_f75){
if(_f6f){
self.resolve([i,_f75]);
}else{
_f76(true,_f75);
}
},function(_f77){
if(_f70){
self.reject(_f77);
}else{
_f76(false,_f77);
}
if(_f71){
return null;
}
throw _f77;
});
function _f76(_f78,_f79){
_f73[i]=[_f78,_f79];
_f74++;
if(_f74===list.length){
self.resolve(_f73);
}
};
});
};
dojo.DeferredList.prototype=new _f6d();
dojo.DeferredList.prototype.gatherResults=function(_f7a){
var d=new dojo.DeferredList(_f7a,false,true,false);
d.addCallback(function(_f7b){
var ret=[];
_f6e.forEach(_f7b,function(_f7c){
ret.push(_f7c[1]);
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
define("dijit/CheckedMenuItem",["dojo/_base/declare","dojo/dom-class","./MenuItem","dojo/text!./templates/CheckedMenuItem.html","./hccss"],function(_f7d,_f7e,_f7f,_f80){
return _f7d("dijit.CheckedMenuItem",_f7f,{templateString:_f80,checked:false,_setCheckedAttr:function(_f81){
_f7e.toggle(this.domNode,"dijitCheckedMenuItemChecked",_f81);
this.domNode.setAttribute("aria-checked",_f81);
this._set("checked",_f81);
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
define("dojo/io/iframe",["../main","require"],function(dojo,_f82){
dojo.getObject("io",true,dojo);
dojo.io.iframe={create:function(_f83,_f84,uri){
if(window[_f83]){
return window[_f83];
}
if(window.frames[_f83]){
return window.frames[_f83];
}
var turi=uri;
if(!turi){
if(dojo.config["useXDomain"]&&!dojo.config["dojoBlankHtmlUrl"]){
console.warn("dojo.io.iframe.create: When using cross-domain Dojo builds,"+" please save dojo/resources/blank.html to your domain and set djConfig.dojoBlankHtmlUrl"+" to the path on your domain to blank.html");
}
turi=(dojo.config["dojoBlankHtmlUrl"]||_f82.toUrl("../resources/blank.html"));
}
var _f85=dojo.place("<iframe id=\""+_f83+"\" name=\""+_f83+"\" src=\""+turi+"\" onload=\""+_f84+"\" style=\"position: absolute; left: 1px; top: 1px; height: 1px; width: 1px; visibility: hidden\">",dojo.body());
window[_f83]=_f85;
return _f85;
},setSrc:function(_f86,src,_f87){
try{
if(!_f87){
if(dojo.isWebKit){
_f86.location=src;
}else{
frames[_f86.name].location=src;
}
}else{
var idoc;
if(dojo.isIE||dojo.isWebKit){
idoc=_f86.contentWindow.document;
}else{
idoc=_f86.contentWindow;
}
if(!idoc){
_f86.location=src;
}else{
idoc.location.replace(src);
}
}
}
catch(e){
console.log("dojo.io.iframe.setSrc: ",e);
}
},doc:function(_f88){
return _f88.contentDocument||(((_f88.name)&&(_f88.document)&&(dojo.doc.getElementsByTagName("iframe")[_f88.name].contentWindow)&&(dojo.doc.getElementsByTagName("iframe")[_f88.name].contentWindow.document)))||((_f88.name)&&(dojo.doc.frames[_f88.name])&&(dojo.doc.frames[_f88.name].document))||null;
},send:function(args){
if(!this["_frame"]){
this._frame=this.create(this._iframeName,dojo._scopeName+".io.iframe._iframeOnload();");
}
var dfd=dojo._ioSetArgs(args,function(dfd){
dfd.canceled=true;
dfd.ioArgs._callNext();
},function(dfd){
var _f89=null;
try{
var _f8a=dfd.ioArgs;
var dii=dojo.io.iframe;
var ifd=dii.doc(dii._frame);
var _f8b=_f8a.handleAs;
_f89=ifd;
if(_f8b!="html"){
if(_f8b=="xml"){
if(dojo.isIE<9||(dojo.isIE&&dojo.isQuirks)){
dojo.query("a",dii._frame.contentWindow.document.documentElement).orphan();
var _f8c=(dii._frame.contentWindow.document).documentElement.innerText;
_f8c=_f8c.replace(/>\s+</g,"><");
_f8c=dojo.trim(_f8c);
var _f8d={responseText:_f8c};
_f89=dojo._contentHandlers["xml"](_f8d);
}
}else{
_f89=ifd.getElementsByTagName("textarea")[0].value;
if(_f8b=="json"){
_f89=dojo.fromJson(_f89);
}else{
if(_f8b=="javascript"){
_f89=dojo.eval(_f89);
}
}
}
}
}
catch(e){
_f89=e;
}
finally{
_f8a._callNext();
}
return _f89;
},function(_f8e,dfd){
dfd.ioArgs._hasError=true;
dfd.ioArgs._callNext();
return _f8e;
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
var _f8f=dfd.ioArgs;
var args=_f8f.args;
_f8f._contentToClean=[];
var fn=dojo.byId(args["form"]);
var _f90=args["content"]||{};
if(fn){
if(_f90){
var _f91=function(name,_f92){
dojo.create("input",{type:"hidden",name:name,value:_f92},fn);
_f8f._contentToClean.push(name);
};
for(var x in _f90){
var val=_f90[x];
if(dojo.isArray(val)&&val.length>1){
var i;
for(i=0;i<val.length;i++){
_f91(x,val[i]);
}
}else{
if(!fn[x]){
_f91(x,val);
}else{
fn[x].value=val;
}
}
}
}
var _f93=fn.getAttributeNode("action");
var _f94=fn.getAttributeNode("method");
var _f95=fn.getAttributeNode("target");
if(args["url"]){
_f8f._originalAction=_f93?_f93.value:null;
if(_f93){
_f93.value=args.url;
}else{
fn.setAttribute("action",args.url);
}
}
if(!_f94||!_f94.value){
if(_f94){
_f94.value=(args["method"])?args["method"]:"post";
}else{
fn.setAttribute("method",(args["method"])?args["method"]:"post");
}
}
_f8f._originalTarget=_f95?_f95.value:null;
if(_f95){
_f95.value=this._iframeName;
}else{
fn.setAttribute("target",this._iframeName);
}
fn.target=this._iframeName;
dojo._ioNotifyStart(dfd);
fn.submit();
}else{
var _f96=args.url+(args.url.indexOf("?")>-1?"&":"?")+_f8f.query;
dojo._ioNotifyStart(dfd);
this.setSrc(this._frame,_f96,true);
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
var _f97=dfd.ioArgs;
var args=_f97.args;
var _f98=dojo.byId(args.form);
if(_f98){
var _f99=_f97._contentToClean;
for(var i=0;i<_f99.length;i++){
var key=_f99[i];
for(var j=0;j<_f98.childNodes.length;j++){
var _f9a=_f98.childNodes[j];
if(_f9a.name==key){
dojo.destroy(_f9a);
break;
}
}
}
if(_f97["_originalAction"]){
_f98.setAttribute("action",_f97._originalAction);
}
if(_f97["_originalTarget"]){
_f98.setAttribute("target",_f97._originalTarget);
_f98.target=_f97._originalTarget;
}
}
_f97._finished=true;
}};
return dojo.io.iframe;
});
},"curam/lnf":function(){
define("curam/lnf",["curam/define"],function(){
curam.define.singleton("curam.lnf",{setCTParent:function(id){
var _f9b=dojo.byId(id);
var _f9c=_f9b.parentNode;
if(_f9c.tagName=="TD"){
dojo.addClass(_f9c,"codetable");
}
}});
return curam.lnf;
});
},"curam/widget/MenuItem":function(){
require({cache:{"url:curam/widget/resources/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:${onClickValue}\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n"}});
define("curam/widget/MenuItem",["dijit/MenuItem","dojo/text!curam/widget/resources/MenuItem.html"],function(_f9d,_f9e){
var _f9f=dojo.declare("curam.widget.MenuItem",_f9d,{templateString:_f9e,onClickValue:"",_onClickAll:function(evt){
this.getParent().onItemClick(this,evt);
var _fa0=curam.tab.getTabContainer();
var _fa1=_fa0.getChildren();
for(var i=0;i<_fa1.length;i++){
if(_fa1[i].closable){
_fa0.closeChild(_fa1[i]);
}
}
}});
return _f9f;
});
},"curam/tab":function(){
define("curam/tab",["curam/define","curam/util","curam/util/ScreenContext"],function(){
curam.define.singleton("curam.tab",{SECTION_TAB_CONTAINER_ID:"app-sections-container-dc",SMART_PANEL_IFRAME_ID:"curam_tab_SmartPanelIframe",toBeExecutedOnTabClose:[],_mockSelectedTab:null,getSelectedTab:function(_fa2){
if(curam.tab._mockSelectedTab){
return curam.tab._mockSelectedTab;
}
if(curam.tab.getTabContainer(_fa2)){
return curam.tab.getTabContainer(_fa2).selectedChildWidget;
}
},getTabContainer:function(_fa3){
return curam.tab.getTabContainerFromSectionID(_fa3||curam.tab.getCurrentSectionId());
},getCurrentSectionId:function(_fa4){
var _fa5=curam.util.getTopmostWindow().dijit.byId(curam.tab.SECTION_TAB_CONTAINER_ID);
if(_fa5){
var _fa6=_fa5.selectedChildWidget.domNode.id;
return _fa6.substring(0,_fa6.length-4);
}else{
if(!_fa4){
throw new Error("curam.tab.getCurrentSectionId() - application section"+" tab container not found");
}
}
return null;
},inTabbedUI:function(){
return curam.tab.getCurrentSectionId(true)!=null;
},getTabContainerFromSectionID:function(_fa7){
var _fa8=dijit.byId(_fa7+"-stc");
if(!_fa8&&window.parent&&window.parent!=window){
_fa8=curam.util.getTopmostWindow().dijit.byId(_fa7+"-stc");
}
return _fa8;
},getTabWidgetId:function(tab){
return tab.id;
},getSelectedTabWidgetId:function(){
return curam.tab.getTabWidgetId(curam.tab.getSelectedTab());
},getContainerTab:function(node){
var _fa9=dijit.getEnclosingWidget(node);
if(_fa9&&!_fa9.tabDescriptor){
_fa9=curam.tab.getContainerTab(_fa9.domNode.parentNode);
}
if(!_fa9||!_fa9.tabDescriptor){
throw "Containing tab widget could not be found for node: "+node;
}
return _fa9;
},getContentPanelIframe:function(tab){
var _faa=tab?tab:curam.tab.getSelectedTab(),_fab=null;
if(_faa){
_fab=dojo.query("iframe",_faa.domNode).filter(function(item){
return dojo.attr(item,"iscpiframe")=="true";
})[0];
}
return _fab?_fab:null;
},refreshMainContentPanel:function(tab){
var _fac=curam.tab.getContentPanelIframe(tab);
_fac.contentWindow.curam.util.publishRefreshEvent();
_fac.contentWindow.location.reload(true);
},getSmartPanelIframe:function(tab){
var _fad=tab?tab:curam.tab.getSelectedTab();
var _fae=dojo.query("iframe",_fad.domNode).filter(function(item){
return item.id==curam.tab.SMART_PANEL_IFRAME_ID;
})[0];
return _fae;
},unsubscribeOnTabClose:function(_faf,_fb0){
curam.tab.toBeExecutedOnTabClose.push(function(_fb1){
if(_fb0==_fb1){
dojo.unsubscribe(_faf);
return true;
}
return false;
});
},executeOnTabClose:function(func,_fb2){
curam.tab.toBeExecutedOnTabClose.push(function(_fb3){
if(_fb2==_fb3){
func();
return true;
}
return false;
});
},doExecuteOnTabClose:function(_fb4){
var _fb5=new Array();
for(var i=0;i<curam.tab.toBeExecutedOnTabClose.length;i++){
var func=curam.tab.toBeExecutedOnTabClose[i];
if(!func(_fb4)){
_fb5.push(func);
}
}
curam.tab.toBeExecutedOnTabClose=_fb5;
},getHandlerForTab:function(_fb6,_fb7){
return function(_fb8,_fb9){
if(_fb9==_fb7){
_fb6(_fb8,_fb7);
}else{
}
};
},getTabController:function(){
return curam.util.getTopmostWindow().curam.ui.UIController;
},initTabLinks:function(_fba){
if(typeof (window.pageContainsClassicIEG)!="undefined"&&window.pageContainsClassicIEG==true){
return;
}
dojo.query("a").forEach(function(link){
if(link.href.indexOf("#")!=0&&link.href.indexOf("javascript:")!=0&&(link.href.indexOf("Page.do")>-1||link.href.indexOf("Frame.do")>-1)){
if(link.href.indexOf("&o3ctx")<0&&link.href.indexOf("?o3ctx")<0){
var _fbb=(link.href.indexOf("?")>-1)?"&":"?";
link.href+=_fbb+jsScreenContext.toRequestString();
}
}
});
elements=document.forms;
for(var i=0;i<elements.length;++i){
elem=elements[i];
var _fbc=dojo.byId("o3ctx");
if(!_fbc){
var ctx=new curam.util.ScreenContext();
ctx.setContextBits("ACTION");
dojo.create("input",{"type":"hidden","name":"o3ctx","value":ctx.getValue()},elem);
}
dojo.create("input",{"type":"hidden","name":"o3prv","value":jsPageID},elem);
}
if(elements.length>0){
curam.util.getTopmostWindow().dojo.publish("curam.fireNextRequest",[]);
}
},initContent:function(_fbd,_fbe){
var _fbf=dojo.byId("content");
dojo.removeClass(_fbf,"hidden-panel");
return;
},setupSectionSelectionListener:function(){
dojo.subscribe(curam.tab.SECTION_TAB_CONTAINER_ID+"-selectChild",curam.tab.onSectionSelected);
},onSectionSelected:function(_fc0){
if(_fc0.curamDefaultPageID){
var _fc1;
if(_fc0.id.substring(_fc0.id.length-4,_fc0.id.length)=="-sbc"){
var _fc2=_fc0.id.substring(0,_fc0.id.length-4);
_fc1=curam.tab.getTabContainer(_fc2);
}else{
_fc1=_fc0;
}
if(_fc1&&_fc1.getChildren().length==0){
curam.tab.getTabController().handleUIMPageID(_fc0.curamDefaultPageID,true);
}
return true;
}
return false;
},setSectionDefaultPage:function(_fc3,_fc4){
var _fc5=dijit.byId(_fc3);
if(_fc5){
_fc5.curamDefaultPageID=_fc4;
}else{
throw "curam.tab.setSectionDefaultPage() - cannot find section dijit ID:"+_fc3;
}
},publishSmartPanelContentReady:function(){
var _fc6="smartpanel.content.loaded";
var _fc7=window.frameElement;
_fc7.setAttribute("_SPContentLoaded","true");
curam.util.getTopmostWindow().dojo.publish(_fc6,[_fc7]);
}});
return curam.tab;
});
},"curam/util/FrequencyEditor":function(){
define("curam/util/FrequencyEditor",["curam/util","curam/define","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _fc8=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.FrequencyEditor",{CORRECTOR:1,DAILY_FREQUENCY:0,WEEKLY_FREQUENCY:1,MONTHLY_FREQUENCY:2,YEARLY_FREQUENCY:3,BIMONTHLY_FREQUENCY:4,EVERY_DAY_MASK:201,EVERY_WEEKDAY_MASK:202,EVERY_WEEKENDDAY_MASK:203,MON_MASK:1,TUE_MASK:2,WED_MASK:4,THU_MASK:8,FRI_MASK:16,SAT_MASK:32,SUN_MASK:64,daysInMonth:[31,28,31,30,31,30,31,31,30,31,30,31],EVERY_DAY:0,EVERY_WEEKDAY:1,MON:0,TUE:1,WED:2,THU:3,FRI:4,SAT:5,SUN:6,START_DATE:0,MONTH_DAY_NUM:1,MONTH_SEL_DAY:2,DAY_NUM:0,SEL_DAY:1,SEL_MONTH_DAY_NUM:0,SEL_MONTH_SEL_DAY:1,allowableCharsForNumeric:["1","2","3","4","5","6","7","8","9","0",dojo.keys.LEFT_ARROW,dojo.keys.RIGHT_ARROW,dojo.keys.DELETE,dojo.keys.ENTER,dojo.keys.BACKSPACE,dojo.keys.END,dojo.keys.HOME,dojo.keys.TAB,dojo.keys.F5],allowableDayString:["32","33","34","35","36"],allowableDayOfWeekMask:["201","202","203","1","2","4","8","16","32","64"],allowableFirstDayStringForBimonthly:["32","33","34","35"],allowableSecondDayStringForBimonthly:["33","34","35","36"],allowableWeekdayStringForBimonthly:["1","2","4","8","16","32","64"],allowableMonthString:["1","2","3","4","5","6","7","8","9","10","11","12"],initPage:function(){
var _fc9=curam.dialog.getParentWindow(window);
if(formActivated==true){
executeOpenerMapping("freq_text",translatedPatternString);
executeOpenerMapping("freq_data",patternString);
curam.dialog.closeModalDialog();
return false;
}
var freq=_fc9.getPopupInput("initFreq");
curam.debug.log(_fc8.getProperty("curam.util.FrequencyEditor.input"),freq);
if(!freq||freq==null||freq.length==0){
document.theForm.freqType[0].checked=true;
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_DAY].checked=true;
return true;
}
var _fca=parseInt(freq.charAt(0),10);
if(_fca==curam.util.FrequencyEditor.DAILY_FREQUENCY){
curam.util.FrequencyEditor.setupDailyFrequency(freq);
}else{
if(_fca==curam.util.FrequencyEditor.WEEKLY_FREQUENCY){
curam.util.FrequencyEditor.setupWeeklyFrequency(freq);
}else{
if(_fca==curam.util.FrequencyEditor.MONTHLY_FREQUENCY){
curam.util.FrequencyEditor.setupMonthlyFrequency(freq);
}else{
if(_fca==curam.util.FrequencyEditor.YEARLY_FREQUENCY){
curam.util.FrequencyEditor.setupYearlyFrequency(freq);
}else{
if(_fca==curam.util.FrequencyEditor.BIMONTHLY_FREQUENCY){
curam.util.FrequencyEditor.setupBimonthlyFrequency(freq);
}else{
alert(errorMsgs.freqPattern);
}
}
}
}
}
return true;
},setupDailyFrequency:function(_fcb){
var _fcc=_fcb.substr(4,3);
document.theForm.freqType[curam.util.FrequencyEditor.DAILY_FREQUENCY].checked=true;
if(parseInt(_fcc,10)==curam.util.FrequencyEditor.EVERY_WEEKDAY_MASK){
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_WEEKDAY].checked=true;
}else{
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_DAY].checked=true;
var _fcd=parseInt(_fcb.substr(1,3),10);
document.theForm.daily_num.value=""+_fcd;
}
},setupWeeklyFrequency:function(_fce){
var _fcf=parseInt(_fce.substr(4,3),10);
document.theForm.freqType[curam.util.FrequencyEditor.WEEKLY_FREQUENCY].checked=true;
if(_fcf&curam.util.FrequencyEditor.MON_MASK){
document.theForm.weekly_select_mon.checked=true;
}
if(_fcf&curam.util.FrequencyEditor.TUE_MASK){
document.theForm.weekly_select_tue.checked=true;
}
if(_fcf&curam.util.FrequencyEditor.WED_MASK){
document.theForm.weekly_select_wed.checked=true;
}
if(_fcf&curam.util.FrequencyEditor.THU_MASK){
document.theForm.weekly_select_thur.checked=true;
}
if(_fcf&curam.util.FrequencyEditor.FRI_MASK){
document.theForm.weekly_select_fri.checked=true;
}
if(_fcf&curam.util.FrequencyEditor.SAT_MASK){
document.theForm.weekly_select_sat.checked=true;
}
if(_fcf&curam.util.FrequencyEditor.SUN_MASK){
document.theForm.weekly_select_sun.checked=true;
}
var _fd0=parseInt(_fce.substr(1,3),10);
document.theForm.weekly_num.value=""+_fd0;
},setupMonthlyFrequency:function(_fd1){
var _fd2=parseInt(_fd1.substr(1,3),10);
var _fd3=parseInt(_fd1.substr(4,3),10);
var _fd4=parseInt(_fd1.substr(7,2),10);
document.theForm.freqType[curam.util.FrequencyEditor.MONTHLY_FREQUENCY].checked=true;
if(_fd4==0){
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.START_DATE].checked=true;
document.theForm.monthly0_month_interval.value=_fd2;
}else{
if(_fd4<=31){
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.MONTH_DAY_NUM].checked=true;
document.theForm.monthly1_day_num.value=_fd4;
document.theForm.monthly1_month_interval.value=_fd2;
}else{
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.MONTH_SEL_DAY].checked=true;
var _fd5=dijit.byId("monthly2_select_day_num");
_fd5.set("value",_fd4);
_fd5=dijit.byId("monthly2_select_day");
_fd5.set("value",_fd3);
document.theForm.monthly2_month_interval.value=_fd2;
}
}
},setupBimonthlyFrequency:function(_fd6){
var _fd7=parseInt(_fd6.substr(1,2),10);
var _fd8=parseInt(_fd6.substr(4,3),10);
var _fd9=parseInt(_fd6.substr(7,2),10);
document.theForm.freqType[curam.util.FrequencyEditor.BIMONTHLY_FREQUENCY-curam.util.FrequencyEditor.CORRECTOR].checked=true;
if(_fd9<=31){
document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked=true;
document.theForm.bimonthly1_day1_num.value=_fd9;
document.theForm.bimonthly1_day2_num.value=_fd7;
}else{
document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.SEL_DAY].checked=true;
var _fda=dijit.byId("bimonthly2_select_day1_num");
_fda.set("value",_fd9);
_fda=dijit.byId("bimonthly2_select_day2_num");
_fda.set("value",_fd7);
_fda=dijit.byId("bimonthly2_select_weekday");
_fda.set("value",_fd8);
}
},setupYearlyFrequency:function(_fdb){
var _fdc=parseInt(_fdb.substr(1,3),10);
var _fdd=parseInt(_fdb.substr(4,3),10);
var _fde=parseInt(_fdb.substr(7,2),10);
document.theForm.freqType[curam.util.FrequencyEditor.YEARLY_FREQUENCY+curam.util.FrequencyEditor.CORRECTOR].checked=true;
if(_fde<=31){
document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_DAY_NUM].checked=true;
var _fdf=dijit.byId("yearly1_select_month");
_fdf.set("value",_fdc);
document.theForm.yearly1_day_num.value=_fde;
}else{
document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_SEL_DAY].checked=true;
var _fdf=dijit.byId("yearly2_select_day_num");
_fdf.set("value",_fde);
_fdf=dijit.byId("yearly2_select_day");
_fdf.set("value",_fdd);
_fdf=dijit.byId("yearly2_select_month");
_fdf.set("value",_fdc);
}
},createPatternString:function(){
var _fe0=null;
var _fe1=false;
if(document.theForm.freqType[0].checked==true){
_fe1=curam.util.FrequencyEditor.createDailyPatternString();
}else{
if(document.theForm.freqType[1].checked==true){
_fe1=curam.util.FrequencyEditor.createWeeklyPatternString();
}else{
if(document.theForm.freqType[2].checked==true){
_fe1=curam.util.FrequencyEditor.createMonthlyPatternString();
}else{
if(document.theForm.freqType[3].checked==true){
_fe1=curam.util.FrequencyEditor.createBimonthlyPatternString();
}else{
_fe1=curam.util.FrequencyEditor.createYearlyPatternString();
}
}
}
}
if(_fe1){
curam.util.FrequencyEditor.disableRowBorder();
return true;
}else{
return false;
}
},createDailyPatternString:function(){
var _fe2="0";
if(document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_DAY].checked==true){
var _fe3=parseInt(document.theForm.daily_num.value,10);
if(curam.util.FrequencyEditor.validateDailyPattern(_fe3)){
_fe2+=curam.util.FrequencyEditor.doZeroPadding(_fe3,3);
_fe2+="000";
}else{
return false;
}
}else{
_fe2+="001";
_fe2+=curam.util.FrequencyEditor.EVERY_WEEKDAY_MASK;
}
_fe2+="00";
document.theForm.patternString.value=_fe2;
return true;
},validateDailyPattern:function(_fe4){
if(isNaN(_fe4)||_fe4<1){
alert(errorMsgs.everyDay);
return false;
}
return true;
},createWeeklyPatternString:function(){
var _fe5="1";
var _fe6=0;
var _fe7=parseInt(document.theForm.weekly_num.value,10);
if(curam.util.FrequencyEditor.validateWeeklyPattern(_fe7)){
_fe5+=curam.util.FrequencyEditor.doZeroPadding(_fe7,3);
var _fe8=false;
var _fe9=document.theForm.weekly_select_mon;
if(_fe9.checked==true){
_fe8=true;
_fe6+=_fe9.value-0;
}
_fe9=document.theForm.weekly_select_tue;
if(_fe9.checked==true){
_fe8=true;
_fe6+=_fe9.value-0;
}
_fe9=document.theForm.weekly_select_wed;
if(_fe9.checked==true){
_fe8=true;
_fe6+=_fe9.value-0;
}
_fe9=document.theForm.weekly_select_thur;
if(_fe9.checked==true){
_fe8=true;
_fe6+=_fe9.value-0;
}
_fe9=document.theForm.weekly_select_fri;
if(_fe9.checked==true){
_fe8=true;
_fe6+=_fe9.value-0;
}
_fe9=document.theForm.weekly_select_sat;
if(_fe9.checked==true){
_fe8=true;
_fe6+=_fe9.value-0;
}
_fe9=document.theForm.weekly_select_sun;
if(_fe9.checked==true){
_fe8=true;
_fe6+=_fe9.value-0;
}
if(!_fe8){
alert(errorMsgs.noDaySelected);
return false;
}
if(_fe6>0){
_fe5+=curam.util.FrequencyEditor.doZeroPadding(_fe6,3);
}else{
_fe5+="000";
}
_fe5+="00";
document.theForm.patternString.value=_fe5;
return true;
}
return false;
},validateWeeklyPattern:function(_fea){
if(isNaN(_fea)||_fea<1){
alert(errorMsgs.everyWeek);
return false;
}
return true;
},createMonthlyPatternString:function(){
var _feb="2";
if(document.theForm.monthlyFreqType[curam.util.FrequencyEditor.START_DATE].checked==true){
var _fec=parseInt(document.theForm.monthly0_month_interval.value,10);
if(!curam.util.FrequencyEditor.validateMonthlyData(_fec)){
return false;
}
var _fed=0;
_feb+=curam.util.FrequencyEditor.doZeroPadding(_fec,3);
_feb+="000";
_feb+=curam.util.FrequencyEditor.doZeroPadding(_fed,2);
}else{
if(document.theForm.monthlyFreqType[curam.util.FrequencyEditor.MONTH_DAY_NUM].checked==true){
var _fec=parseInt(document.theForm.monthly1_month_interval.value,10);
var _fed=parseInt(document.theForm.monthly1_day_num.value,10);
if(!curam.util.FrequencyEditor.validateMonthlyData(_fec,_fed)){
return false;
}
_feb+=curam.util.FrequencyEditor.doZeroPadding(_fec,3);
_feb+="000";
_feb+=curam.util.FrequencyEditor.doZeroPadding(_fed,2);
}else{
var _fec=parseInt(document.theForm.monthly2_month_interval.value,10);
if(!curam.util.FrequencyEditor.validateMonthlyData(_fec)){
return false;
}
var day=dijit.byId("monthly2_select_day_num").get("value");
var _fee=dijit.byId("monthly2_select_day").get("value");
if(!curam.util.FrequencyEditor.validateDayWeekString(day,_fee,_feb)){
return false;
}
_feb+=curam.util.FrequencyEditor.doZeroPadding(_fec,3);
_feb+=curam.util.FrequencyEditor.doZeroPadding(_fee,3);
_feb+=curam.util.FrequencyEditor.doZeroPadding(day,2);
}
}
document.theForm.patternString.value=_feb;
return true;
},validateMonthlyData:function(_fef,_ff0){
if(isNaN(_fef)||_fef<1||_fef>100){
alert(errorMsgs.monthNum);
return false;
}
if(_ff0==null){
return true;
}
if(isNaN(_ff0)||_ff0<1||_ff0>28){
alert(errorMsgs.dayNum);
return false;
}
return true;
},validateDayWeekString:function(day,_ff1,_ff2){
var days=curam.util.FrequencyEditor.allowableDayString;
var _ff3=curam.util.FrequencyEditor.allowableDayOfWeekMask;
var _ff4=false;
var _ff5=false;
for(var i=0;i<days.length;i++){
if(day==days[i]){
_ff4=true;
break;
}
}
for(var i=0;i<_ff3.length;i++){
if(_ff1==_ff3[i]){
_ff5=true;
break;
}
}
if(_ff4&&_ff5){
return true;
}else{
if(!_ff4){
if(_ff2=="2"){
alert(errorMsgs.dayStringForMonthly);
}else{
if(_ff2=="3"){
alert(errorMsgs.dayStringForYearly);
}else{
alert(errorMsgs.dayString);
}
}
return false;
}else{
if(!_ff5){
if(_ff2=="2"){
alert(errorMsgs.dayOfWeekMaskForMonthly);
}else{
if(_ff2=="3"){
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
var _ff6="4";
var _ff7;
if(document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked==true){
var _ff8=parseInt(document.theForm.bimonthly1_day1_num.value,10);
var _ff9=parseInt(document.theForm.bimonthly1_day2_num.value,10);
if(!curam.util.FrequencyEditor.validateBimonthlyData(_ff8,_ff9,null)){
return false;
}
if(_ff8>_ff9){
_ff7=_ff8;
_ff8=_ff9;
_ff9=_ff7;
}
_ff6+=curam.util.FrequencyEditor.doZeroPadding(_ff9,2);
_ff6+="0000";
_ff6+=curam.util.FrequencyEditor.doZeroPadding(_ff8,2);
}else{
var _ffa=dijit.byId("bimonthly2_select_day1_num");
var _ffb=_ffa.get("value");
_ffa=dijit.byId("bimonthly2_select_day2_num");
var _ffc=_ffa.get("value");
_ffa=dijit.byId("bimonthly2_select_weekday");
var _ffd=_ffa.get("value");
if(!curam.util.FrequencyEditor.validateBimonthlyDataString(_ffb,_ffc,_ffd)){
return false;
}
if(_ffb>_ffc){
_ff7=_ffb;
_ffb=_ffc;
_ffc=_ff7;
}
if(!curam.util.FrequencyEditor.validateBimonthlyData(_ffb,_ffc,_ffd)){
return false;
}
_ff6+=curam.util.FrequencyEditor.doZeroPadding(_ffc,2);
_ff6+="0";
_ff6+=curam.util.FrequencyEditor.doZeroPadding(_ffd,3);
_ff6+=curam.util.FrequencyEditor.doZeroPadding(_ffb,2);
}
document.theForm.patternString.value=_ff6;
return true;
},validateBimonthlyData:function(_ffe,_fff,_1000){
if(_1000!=null){
if(isNaN(_1000)||_1000<1||_1000>64){
alert(errorMsgs.weekend);
return false;
}
}else{
if(isNaN(_ffe)||_ffe<1||_ffe>28||isNaN(_fff)||_fff<1||_fff>28){
alert(errorMsgs.dayNum);
return false;
}
}
if(_ffe==_fff){
alert(errorMsgs.dayDiff);
return false;
}
return true;
},validateBimonthlyDataString:function(_1001,_1002,_1003){
var _1004=curam.util.FrequencyEditor.allowableFirstDayStringForBimonthly;
var _1005=curam.util.FrequencyEditor.allowableSecondDayStringForBimonthly;
var _1006=curam.util.FrequencyEditor.allowableWeekdayStringForBimonthly;
var _1007=false;
var _1008=false;
var _1009=false;
for(var i=0;i<_1004.length;i++){
if(_1001==_1004[i]){
_1007=true;
break;
}
}
for(var i=0;i<_1005.length;i++){
if(_1002==_1005[i]){
_1008=true;
break;
}
}
for(var i=0;i<_1006.length;i++){
if(_1003==_1006[i]){
_1009=true;
break;
}
}
if(_1007&&_1008&&_1009){
return true;
}else{
if(!_1007){
alert(errorMsgs.firstDayString);
return false;
}else{
if(!_1008){
alert(errorMsgs.secondDayString);
return false;
}else{
if(!_1009){
alert(errorMsgs.weekend);
return false;
}
}
}
}
},createYearlyPatternString:function(){
var _100a="3";
var _100b=null;
if(document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_DAY_NUM].checked==true){
_100b=dijit.byId("yearly1_select_month");
var _100c=_100b.get("value");
_100a+=curam.util.FrequencyEditor.doZeroPadding(_100c,3);
_100a+="000";
if(!curam.util.FrequencyEditor.validateMonthString(_100c)){
return false;
}
var _100d=parseInt(document.theForm.yearly1_day_num.value,10);
if(!curam.util.FrequencyEditor.validateYearlyData(_100d,_100c)){
return false;
}
_100a+=curam.util.FrequencyEditor.doZeroPadding(_100d,2);
}else{
var day=dijit.byId("yearly2_select_day_num").get("value");
var _100e=dijit.byId("yearly2_select_day").get("value");
var month=dijit.byId("yearly2_select_month").get("value");
if(!curam.util.FrequencyEditor.validateDayWeekString(day,_100e,_100a)){
return false;
}
if(!curam.util.FrequencyEditor.validateMonthString(month)){
return false;
}
_100a+=curam.util.FrequencyEditor.doZeroPadding(month,3);
_100a+=curam.util.FrequencyEditor.doZeroPadding(_100e,3);
_100a+=curam.util.FrequencyEditor.doZeroPadding(day,2);
}
document.theForm.patternString.value=_100a;
return true;
},validateYearlyData:function(_100f,_1010){
if(isNaN(_100f)||_100f<1||_100f>curam.util.FrequencyEditor.daysInMonth[_1010-1]){
alert(errorMsgs.dayNumAnd+"  "+curam.util.FrequencyEditor.daysInMonth[_1010-1]);
return false;
}
return true;
},validateMonthString:function(month){
var _1011=curam.util.FrequencyEditor.allowableMonthString;
for(var i=0;i<_1011.length;i++){
if(month==_1011[i]){
return true;
}
}
alert(errorMsgs.monthString);
return false;
},doZeroPadding:function(_1012,_1013){
var _1014=""+_1012;
var _1015=_1013-_1014.length;
for(var i=0;i<_1015;i++){
_1014="0"+_1014;
}
return _1014;
},_setFirstLevelRadioButton:function(_1016){
var _1017=dojo.query("input[name='freqType']",dojo.byId("mainForm"))[_1016];
if(_1017==null){
throw new Error("The radio button for the selected"+" frequency type could not be found!");
}
if(!_1017.checked){
dojo.query("input[type='radio']:checked",dojo.byId("mainForm")).forEach(function(_1018){
_1018.checked=false;
});
if(_1016!=curam.util.FrequencyEditor.WEEKLY_FREQUENCY){
dojo.query("input[type='checkbox']:checked",dojo.byId("mainForm")).forEach(function(_1019){
_1019.checked=false;
});
}
_1017.checked=true;
}
},_setSecondLevelRadioButton:function(_101a){
if(_101a==undefined){
return "undefined";
}
var _101b;
if(_101a.domNode){
_101b=_101a.domNode;
}else{
_101b=_101a;
}
if(_101b.tagName.toLowerCase()=="input"&&dojo.attr(_101b,"type")=="radio"){
_101b.checked=true;
return "radio node clicked";
}
var _101c=cm.getParentByType(_101b,"TD");
if(_101c==null){
throw new Error("Exception: The row contains the node should be found");
}
var _101d=dojo.query("input[type = 'radio']",_101c)[0];
if(_101d==null){
throw new Error("Exception: The radio node should exist");
}else{
_101d.checked=true;
return "text input or codetable clicked";
}
},setSelectedFreqType:function(_101e,_101f){
curam.debug.log("curam.util.FrequencyEditor: "+_fc8.getProperty("curam.util.FrequencyEditor.radio"));
curam.util.FrequencyEditor._setFirstLevelRadioButton(_101e);
curam.util.FrequencyEditor._setSecondLevelRadioButton(_101f);
},setDefaultOption:function(_1020){
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_DAY].checked=false;
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_WEEKDAY].checked=false;
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked=false;
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.SEL_DAY].checked=false;
document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked=false;
document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.SEL_DAY].checked=false;
document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_DAY_NUM].checked=false;
document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_SEL_DAY].checked=false;
if(_1020!=curam.util.FrequencyEditor.WEEKLY_FREQUENCY){
document.theForm.weekly_select_mon.checked=false;
document.theForm.weekly_select_tue.checked=false;
document.theForm.weekly_select_wed.checked=false;
document.theForm.weekly_select_thur.checked=false;
document.theForm.weekly_select_fri.checked=false;
document.theForm.weekly_select_sat.checked=false;
document.theForm.weekly_select_sun.checked=false;
}
if(_1020==curam.util.FrequencyEditor.DAILY_FREQUENCY){
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_DAY].checked=true;
}else{
if(_1020==curam.util.FrequencyEditor.WEEKLY_FREQUENCY){
document.theForm.weekly_select_mon.checked=true;
}else{
if(_1020==curam.util.FrequencyEditor.MONTHLY_FREQUENCY){
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked=true;
}else{
if(_1020==curam.util.FrequencyEditor.BIMONTHLY_FREQUENCY){
document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked=true;
}else{
if(_1020==curam.util.FrequencyEditor.YEARLY_FREQUENCY){
document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_DAY_NUM].checked=true;
}
}
}
}
}
},_doPosNumbericInputChecker:function(_1021){
if(_1021==""){
return false;
}
var chars=curam.util.FrequencyEditor.allowableCharsForNumeric;
for(var i=0;i<chars.length;i++){
if(_1021==chars[i]){
return true;
}
}
return false;
},posNumericInputChecker:function(event){
event=dojo.fixEvent(event);
var _1022=event.keyChar;
var _1023=curam.util.FrequencyEditor._doPosNumbericInputChecker(_1022);
if(!_1023){
dojo.stopEvent(event);
}
},prePopulateTextFields:function(_1024){
return function(e){
for(var i=0;i<_1024.length;i++){
if(!_1024[i].value||_1024[i].value==""){
_1024[i].value=1;
}
}
};
},disableRowBorder:function(){
dojo.query("form[name='theForm'] table tr").forEach(function(node){
dojo.addClass(node,"row-no-border");
});
},addInputListener:function(){
dojo.ready(function(){
var _1025=[];
dojo.query("input[type='text']:not(input.dijitReset)").forEach(function(input){
_1025.push(input);
curam.util.connect(input,"onkeypress",curam.util.FrequencyEditor.posNumericInputChecker);
});
curam.util.connect(dojo.byId("mainForm"),"onsubmit",function(event){
curam.util.FrequencyEditor.prePopulateTextFields(_1025);
});
});
},replacePlaceholderWithDomNode:function(){
dojo.query("body#Curam_frequency-editor table tr td.frequency").forEach(function(_1026){
curam.util.FrequencyEditor._parse(_1026);
});
},_parse:function(node){
var _1027=dojo.query("> .node-needs-replacement",node);
var _1028=dojo.query("> span",node)[0];
if(_1028==null||_1028==undefined){
throw new Error("Exception: Some text string is missing for some certain "+"frequency type, please check the 'frequency-editor.jsp' file.");
}
var _1029=_1028.innerHTML;
var _102a=/%[^%]*%/g;
var _102b=_1029.match(_102a);
if(_1027.length==0&&_102b==null){
return "No need to parse";
}else{
if(_1027.length==0&&_102b!=null){
throw new Error("The text string '"+_1029+"' from the 'FrequencyPatternSelector.properties'"+" should not have any placeholder.");
}else{
if(_1027.length!=0&&_102b==null){
throw new Error("The text string '"+_1029+"' from the 'FrequencyPatternSelector.properties'"+" should have some placeholders.");
}
}
}
if(dojo.hasClass(node,"weekly-frequency")){
if(_102b.length!=2){
throw new Error("The text string '"+_1029+"' from the 'FrequencyPatternSelector.properties' "+"has the incorrect number of placeholders.");
}
var _102c=dojo.clone(_1027[0]);
_1027.forEach(dojo.destroy);
dojo.removeClass(_102c,"node-needs-replacement");
var _102d=_102c.className.match(_102a);
var _102e;
for(var i=0;i<_102b.length;i++){
if(_102b[i]!=_102d){
_102e=_102b[i];
break;
}
}
var _102f=_1029.split(_102e);
var _1030=_102f[0];
var _1031=_102f[1];
var _1032;
if(_1030.indexOf(_102d)!=-1){
_1032=true;
_1030=_1030.replace(_102d,"<span class='"+_102d+"'>placeholder</span>");
}else{
_1032=false;
_1031=_1031.replace(_102d,"<span class='"+_102d+"'>placeholder</span>");
}
if(_1031==""){
_1028.innerHTML=_1030;
dojo.place(_102c,dojo.query("span."+_102d,_1028)[0],"replace");
}else{
_1028.innerHTML=_1030;
var _1033=node.parentNode.nextSibling.nextSibling;
var _1034=dojo.create("tr",{"class":"blue"});
var _1035=dojo.create("td",{"class":"bottom"},_1034);
_1035.colSpan="4";
dojo.style(_1035,"paddingLeft","20px");
var _1036=dojo.create("span",{innerHTML:_1031},_1035);
dojo.place(_1034,_1033,"after");
if(_1032){
dojo.place(_102c,dojo.query("span."+_102d,_1028)[0],"replace");
}else{
dojo.place(_102c,dojo.query("span."+_102d,_1036)[0],"replace");
}
dojo.query("td.day",_1033).forEach(function(_1037){
dojo.removeClass(_1037,"bottom");
});
if(_1030==""){
dojo.removeClass(node,"top");
}
dojo.query("th.type",node.parentNode)[0].rowSpan="4";
}
return "Parsed Successfully";
}
if(_1027.length!=_102b.length){
throw new Error("The text string '"+_1029+"' from the 'FrequencyPatternSelector.properties' "+"has the incorrect number of placeholders.");
}
var _1038=dojo.clone(_1027);
_1027.forEach(dojo.destroy);
for(i=0;i<_102b.length;i++){
var _1039=_102b[i];
_1029=_1029.replace(_1039,"<span class='"+_1039+"'>placeholder</span>");
}
_1028.innerHTML=_1029;
_1038.forEach(function(_103a,i){
dojo.removeClass(_103a,"node-needs-replacement");
var _103b=_103a.className.match(_102a);
dojo.place(_103a,dojo.query("span."+_103b,node)[0],"replace");
});
return "Parsed Successfully";
}});
return curam.util.FrequencyEditor;
});
},"dijit/MenuSeparator":function(){
require({cache:{"url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>"}});
define("dijit/MenuSeparator",["dojo/_base/declare","dojo/dom","./_WidgetBase","./_TemplatedMixin","./_Contained","dojo/text!./templates/MenuSeparator.html"],function(_103c,dom,_103d,_103e,_103f,_1040){
return _103c("dijit.MenuSeparator",[_103d,_103e,_103f],{templateString:_1040,buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.domNode,false);
},isFocusable:function(){
return false;
}});
});
},"dijit/form/_ComboBoxMenu":function(){
define("dijit/form/_ComboBoxMenu",["dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/keys","../_WidgetBase","../_TemplatedMixin","./_ComboBoxMenuMixin","./_ListMouseMixin"],function(_1041,_1042,_1043,_1044,keys,_1045,_1046,_1047,_1048){
return _1041("dijit.form._ComboBoxMenu",[_1045,_1046,_1048,_1047],{templateString:"<div class='dijitReset dijitMenu' data-dojo-attach-point='containerNode' style='overflow: auto; overflow-x: hidden;'>"+"<div class='dijitMenuItem dijitMenuPreviousButton' data-dojo-attach-point='previousButton' role='option'></div>"+"<div class='dijitMenuItem dijitMenuNextButton' data-dojo-attach-point='nextButton' role='option'></div>"+"</div>",baseClass:"dijitComboBoxMenu",postCreate:function(){
this.inherited(arguments);
if(!this.isLeftToRight()){
_1042.add(this.previousButton,"dijitMenuItemRtl");
_1042.add(this.nextButton,"dijitMenuItemRtl");
}
},_createMenuItem:function(){
return _1043.create("div",{"class":"dijitReset dijitMenuItem"+(this.isLeftToRight()?"":" dijitMenuItemRtl"),role:"option"});
},onHover:function(node){
_1042.add(node,"dijitMenuItemHover");
},onUnhover:function(node){
_1042.remove(node,"dijitMenuItemHover");
},onSelect:function(node){
_1042.add(node,"dijitMenuItemSelected");
},onDeselect:function(node){
_1042.remove(node,"dijitMenuItemSelected");
},_page:function(up){
var _1049=0;
var _104a=this.domNode.scrollTop;
var _104b=_1044.get(this.domNode,"height");
if(!this.getHighlightedOption()){
this.selectNextNode();
}
while(_1049<_104b){
var _104c=this.getHighlightedOption();
if(up){
if(!_104c.previousSibling||_104c.previousSibling.style.display=="none"){
break;
}
this.selectPreviousNode();
}else{
if(!_104c.nextSibling||_104c.nextSibling.style.display=="none"){
break;
}
this.selectNextNode();
}
var _104d=this.domNode.scrollTop;
_1049+=(_104d-_104a)*(up?-1:1);
_104a=_104d;
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
dojo.mixin(cm,{nextSibling:function(node,_104e){
return cm._findSibling(node,_104e,true);
},prevSibling:function(node,_104f){
return cm._findSibling(node,_104f,false);
},getInput:function(name,_1050){
if(!dojo.isString(name)){
return name;
}
var _1051=dojo.query("input[name='"+name+"'],select[name='"+name+"']");
return _1050?(_1051.length>0?_1051:null):(_1051.length>0?_1051[0]:null);
},getParentByClass:function(node,_1052){
node=node.parentNode;
while(node){
if(dojo.hasClass(node,_1052)){
return node;
}
node=node.parentNode;
}
return null;
},getParentByType:function(node,type){
node=node.parentNode;
type=type.toLowerCase();
var _1053="html";
while(node){
if(node.tagName.toLowerCase()==_1053){
break;
}
if(node.tagName.toLowerCase()==type){
return node;
}
node=node.parentNode;
}
return null;
},replaceClass:function(node,_1054,_1055){
dojo.removeClass(node,_1055);
dojo.addClass(node,_1054);
},setClass:function(node,_1056){
node=dojo.byId(node);
var cs=new String(_1056);
try{
if(typeof node.className=="string"){
node.className=cs;
}else{
if(node.setAttribute){
node.setAttribute("class",_1056);
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
},_findSibling:function(node,_1057,_1058){
if(!node){
return null;
}
if(_1057){
_1057=_1057.toLowerCase();
}
var param=_1058?"nextSibling":"previousSibling";
do{
node=node[param];
}while(node&&node.nodeType!=1);
if(node&&_1057&&_1057!=node.tagName.toLowerCase()){
return cm[_1058?"nextSibling":"prevSibling"](node,_1057);
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
},endsWith:function(str,end,_1059){
if(_1059){
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
var _105a=new curam.util.ResourceBundle("Debug");
var _105b=dojo.declare("curam.tab.TabSessionManager",null,{init:function(_105c){
if(_105c){
this._directBrowseURL=_105c;
}
new curam.ui.ClientDataAccessor().getRaw("/data/tab/get",dojo.hitch(this,this._restoreTabSession),dojo.hitch(this,this._handleGetTabFailure));
},_handleGetTabFailure:function(error,_105d){
var _105e=curam.tab.getTabContainer();
var _105f=dojo.toJson(error);
this._log(_105a.getProperty("curam.tab.TabSessionManager.error")+_105f);
var tab=new dojox.layout.ContentPane({title:"Error",closable:true,content:"An error occurred. Try refreshing the browser or contact your "+"administrator if it persists. Error: "+error.message});
_105e.addChild(tab);
},_restoreTabSession:function(_1060,_1061){
var _1062=[];
var _1063=[];
var _1064=[];
curam.tab.getTabController().MAX_NUM_TABS=_1060.maxTabs;
var _1065=this._isNewSession();
var _1066=_1065?null:this._getPrevSelectedTab();
var _1067=this._getHomePageTab();
_1066=_1066?_1066:_1067;
this.tabSelected(_1066);
_1064[_1067.sectionID]=true;
if(_1060&&_1060.tabs&&_1060.tabs.length>0){
var tabs=_1060.tabs;
this._log(_105a.getProperty("curam.tab.TabSessionManager.previous")+tabs.length+" "+_105a.getProperty("curam.tab.TabSessionManager.tabs"));
for(var i=0;i<tabs.length;i++){
var newTD=curam.tab.TabDescriptor.fromJson(tabs[i]);
if(newTD.tabSignature==_1067.tabSignature){
if(!_1065){
if(this._directBrowseURL){
_1066=newTD;
}else{
_1067=newTD;
}
}
}else{
if(newTD.sectionID==_1066.sectionID){
_1062.push(newTD);
}else{
_1063.push(newTD);
}
}
_1064[newTD.sectionID]=true;
}
if(_1067.sectionID==_1066.sectionID){
_1062.unshift(_1067);
}else{
_1063.unshift(_1067);
}
}else{
this._log(_105a.getProperty("curam.tab.TabSessionManager.no.session"));
_1062.push(_1067);
}
this._restoreSectionTabs(_1062,_1066);
this._restoreSectionTabs(_1063,null);
this._selectedTD=_1066;
this._connectSelectionListeners(_1064);
if(this._directBrowseURL){
var _1068=this._createDirectBrowseClosure();
var _1069=curam.util.getTopmostWindow();
var _106a=_1069.dojo.subscribe("/curam/main-content/page/loaded",null,function(_106b,_106c){
var that=_1068.getThis();
var _106d=that._directBrowseURL;
var _106e=that._selectedTD.tabContent.pageID;
if(_106b===_106e){
require(["curam/util/Navigation"],function(nav){
nav.goToUrl(_106d);
});
that._selectedTD.tabContent.pageID=_106d.replace(/Page.do\??.*/,"");
that.tabSelected(that._selectedTD);
dojo.unsubscribe(_106a);
}
});
}
},_createDirectBrowseClosure:function(){
var that=this;
return {getThis:function(){
return that;
}};
},_restoreSectionTabs:function(_106f,_1070){
this._log(_105a.getProperty("curam.tab.TabSessionManager.saved.tabs"));
for(var i=0;i<_106f.length;i++){
var _1071=_106f[i];
this._log(_105a.getProperty("curam.tab.TabSessionManager.saved.tab"),_1071,i);
dojo.publish(curam.tab.getTabController().TAB_TOPIC,[new curam.ui.OpenTabEvent(_1071,null,this._isOpenInBackground(_1071,_1070,i))]);
}
},_connectSelectionListeners:function(_1072){
var _1073=false;
for(var _1074 in _1072){
if(curam.tab.getTabContainer(_1074)){
dojo.subscribe(curam.tab.getTabContainer(_1074).id+"-selectChild",dojo.hitch(this,this.tabContentPaneSelected));
_1073=true;
}
}
dojo.subscribe(curam.tab.SECTION_TAB_CONTAINER_ID+"-selectChild",dojo.hitch(this,this.tabSectionSelected));
return _1073;
},tabUpdated:function(_1075){
this._log(_105a.getProperty("curam.tab.TabSessionManager.saving.tab"),_1075);
new curam.ui.ClientDataAccessor().set("/data/tab/update",_1075.toJson());
},tabClosed:function(_1076){
this._log(_105a.getProperty("curam.tab.TabSessionManager.tab.closed"),_1076);
new curam.ui.ClientDataAccessor().set("/data/tab/close",_1076.toJson());
},tabSelected:function(_1077){
this._log(_105a.getProperty("curam.tab.TabSessionManager.selected.tab"),_1077);
if(_1077.tabSignature){
curam.util.runStorageFn(function(){
var _1078=curam.util.getTopmostWindow().dojox;
_1078.storage.put(curam.tab.TabSessionManager.SELECTED_TAB_KEY,_1077.toJson());
});
this._log(_105a.getProperty("curam.tab.TabSessionManager.recorded"),_1077);
}else{
this._log(_105a.getProperty("curam.tab.TabSessionManager.not.recorded"),_1077);
}
},tabContentPaneSelected:function(_1079){
if(_1079.tabDescriptor){
this.tabSelected(_1079.tabDescriptor);
}else{
this._log(_105a.getProperty("curam.tab.TabSessionManager.no.descriptor"));
}
},tabSectionSelected:function(_107a){
var _107b=false;
if(_107a){
var id=_107a.id;
this._log(_105a.getProperty("curam.tab.TabSessionManager.new.section")+" '"+id+"'.");
var _107c=id.substring(0,id.length-4);
var _107d=curam.tab.getSelectedTab(_107c);
if(_107d){
this._log(_105a.getProperty("curam.tab.TabSessionManager.changing.selection"));
this.tabContentPaneSelected(_107d);
_107b=true;
}else{
this._log(_105a.getProperty("curam.tab.TabSessionManager.not.changing.selection"));
}
}else{
this._log(_105a.getProperty("curam.tab.TabSessionManager.no.container"));
}
return _107b;
},_isNewSession:function(){
var _107e=this._getJSessionID();
if(!_107e){
return true;
}
var _107f=curam.util.getTopmostWindow().dojox;
var _1080=_107f.encoding.digests.SHA1(_107e);
var _1081;
var _107f=curam.util.getTopmostWindow().dojox;
curam.util.runStorageFn(function(){
_1081=_107f.storage.get(curam.tab.TabSessionManager.SELECTED_TAB_SESSION_KEY);
});
this._log(_105a.getProperty("curam.tab.TabSessionManager.session.id")+" '"+_1080+"'. "+_105a.getProperty("curam.tab.TabSessionManager.old.session.id")+" '"+_1081+"'.");
if(_1080!=_1081){
this._log(_105a.getProperty("curam.tab.TabSessionManager.new.session"));
curam.util.runStorageFn(function(){
_107f.storage.put(curam.tab.TabSessionManager.SELECTED_TAB_SESSION_KEY,_1080);
});
curam.util.runStorageFn(function(){
_107f.storage.remove(curam.tab.TabSessionManager.SELECTED_TAB_KEY);
});
return true;
}
this._log(_105a.getProperty("curam.tab.TabSessionManager.refreshed.session"));
return false;
},_getJSessionID:function(){
var key="JSESSIONID=";
var _1082=null;
if(document.cookie){
var begin=document.cookie.indexOf(key);
if(begin!=-1){
var end=document.cookie.indexOf(";",begin+key.length);
_1082=unescape(document.cookie.substring(begin+key.length,end==-1?document.cookie.length:end));
}
}
return _1082;
},_getPrevSelectedTab:function(){
this._log(_105a.getProperty("curam.tab.TabSessionManager.previous.tab"));
var _1083;
curam.util.runStorageFn(function(){
var _1084=curam.util.getTopmostWindow().dojox;
_1083=_1084.storage.get(curam.tab.TabSessionManager.SELECTED_TAB_KEY);
});
var _1085=null;
if(_1083){
_1085=curam.tab.TabDescriptor.fromJson(_1083);
this._log(_105a.getProperty("curam.tab.TabSessionManager.previous.tab.found"),_1085);
}else{
this._log(_105a.getProperty("curam.tab.TabSessionManager.previous.tab.not.found"));
}
return _1085;
},_isOpenInBackground:function(newTD,_1086,pos){
var _1087=true;
if(_1086&&_1086.tabSignature==newTD.tabSignature){
this._log(_105a.getProperty("curam.tab.TabSessionManager.foreground"),newTD,pos);
_1087=false;
}else{
this._log(_105a.getProperty("curam.tab.TabSessionManager.background"),newTD,pos);
}
return _1087;
},_getHomePageTab:function(){
this._log(_105a.getProperty("curam.tab.TabSessionManager.home.page")+" '"+USER_HOME_PAGE_ID+"'.");
if(!USER_HOME_PAGE_TAB_ASSOC.tabIDs||!USER_HOME_PAGE_TAB_ASSOC.sectionID){
throw new Error("The application cannot be launched because the home page, '"+USER_HOME_PAGE_ID+"', has not been associated with a section or "+" tab.");
}
var tabID=USER_HOME_PAGE_TAB_ASSOC.tabIDs[0];
var _1088=USER_HOME_PAGE_TAB_ASSOC.sectionID;
var _1089=new curam.tab.TabDescriptor(_1088,tabID);
var _108a=new curam.ui.PageRequest(USER_HOME_PAGE_ID,true);
_1089.isHomePage=true;
_1089.setTabSignature([],_108a,true);
_1089.setTabContent(_108a);
this._log(_105a.getProperty("curam.tab.TabSessionManager.created"),_1089);
return _1089;
},_log:function(msg,_108b,pos){
if(curam.debug.enabled()){
var _108c="TAB SESSION";
if(typeof pos=="number"){
_108c+=" [pos="+pos+"]";
}
curam.debug.log(_108c+": "+msg+(_108b?" "+_108b.toJson():""));
}
}});
dojo.mixin(curam.tab.TabSessionManager,{SELECTED_TAB_KEY:"curam_selected_tab",SELECTED_TAB_SESSION_KEY:"curam_selected_tab_session"});
return _105b;
});
},"dojo/require":function(){
define("dojo/require",["./_base/loader"],function(_108d){
return {dynamic:0,normalize:function(id){
return id;
},load:_108d.require};
});
},"url:dijit/layout/templates/ScrollingTabController.html":"<div class=\"dijitTabListContainer-${tabPosition} tabStrip-disabled dijitLayoutContainer\"><!-- CURAM-FIX: removed style=\"visibility:hidden, dd the tabStrip-disabled class by default.\" -->\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerMenuButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_menuBtn\"\r\n\t\t\tdata-dojo-props=\"containerId: '${containerId}', iconClass: 'dijitTabStripMenuIcon',\r\n\t\t\t\t\tdropDownPosition: ['below-alt', 'above-alt']\"\r\n\t\t\tdata-dojo-attach-point=\"_menuBtn\" showLabel=\"false\" title=\"\">&#9660;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_leftBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideLeftIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_leftBtn\" data-dojo-attach-event=\"onClick: doSlideLeft\">&#9664;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_rightBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideRightIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_rightBtn\" data-dojo-attach-event=\"onClick: doSlideRight\">&#9654;</div>\r\n\t<div class='dijitTabListWrapper dijitTabContainerTopNone dijitAlignClient' data-dojo-attach-point='tablistWrapper'>\r\n\t\t<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'\r\n\t\t\t\tdata-dojo-attach-point='containerNode' class='nowrapTabStrip dijitTabContainerTop-tabs'></div>\r\n\t</div>\r\n</div>\r\n","dijit/Dialog":function(){
require({cache:{"url:dijit/templates/Dialog.html":"<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span>\n\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabIndex=\"-1\">\n\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t</span>\n\t</div>\n\t\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n"}});
define("dijit/Dialog",["require","dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/_base/fx","dojo/i18n","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/ready","dojo/_base/sniff","dojo/_base/window","dojo/window","dojo/dnd/Moveable","dojo/dnd/TimedMoveable","./focus","./_base/manager","./_Widget","./_TemplatedMixin","./_CssStateMixin","./form/_FormMixin","./_DialogMixin","./DialogUnderlay","./layout/ContentPane","dojo/text!./templates/Dialog.html",".","dojo/i18n!./nls/common"],function(_108e,array,_108f,_1090,_1091,dom,_1092,_1093,_1094,event,fx,i18n,_1095,keys,lang,on,ready,has,win,_1096,_1097,_1098,focus,_1099,_109a,_109b,_109c,_109d,_109e,_109f,_10a0,_10a1,dijit){
var _10a2=_1090("dijit._DialogBase",[_109b,_109d,_109e,_109c],{templateString:_10a1,baseClass:"dijitDialog",cssStateNodes:{closeButtonNode:"dijitDialogCloseIcon"},_setTitleAttr:[{node:"titleNode",type:"innerHTML"},{node:"titleBar",type:"attribute"}],open:false,duration:_1099.defaultDuration,refocus:true,autofocus:true,_firstFocusItem:null,_lastFocusItem:null,doLayout:false,draggable:true,"aria-describedby":"",postMixInProperties:function(){
var _10a3=i18n.getLocalization("dijit","common");
lang.mixin(this,_10a3);
this.inherited(arguments);
},postCreate:function(){
_1094.set(this.domNode,{display:"none",position:"absolute"});
win.body().appendChild(this.domNode);
this.inherited(arguments);
this.connect(this,"onExecute","hide");
this.connect(this,"onCancel","hide");
this._modalconnects=[];
},onLoad:function(){
this._position();
if(this.autofocus&&_10a4.isTop(this)){
this._getFocusItems(this.domNode);
focus.focus(this._firstFocusItem);
}
this.inherited(arguments);
},_endDrag:function(){
var _10a5=_1093.position(this.domNode),_10a6=_1096.getBox();
_10a5.y=Math.min(Math.max(_10a5.y,0),(_10a6.h-_10a5.h));
_10a5.x=Math.min(Math.max(_10a5.x,0),(_10a6.w-_10a5.w));
this._relativePosition=_10a5;
this._position();
},_setup:function(){
var node=this.domNode;
if(this.titleBar&&this.draggable){
this._moveable=new ((has("ie")==6)?_1098:_1097)(node,{handle:this.titleBar});
this.connect(this._moveable,"onMoveStop","_endDrag");
}else{
_1092.add(node,"dijitDialogFixed");
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
_1094.set(this.containerNode,{width:"auto",height:"auto"});
}
var bb=_1093.position(this.domNode);
var _10a7=_1096.getBox();
if(bb.w>=_10a7.w||bb.h>=_10a7.h){
var w=Math.min(bb.w,Math.floor(_10a7.w*0.75)),h=Math.min(bb.h,Math.floor(_10a7.h*0.75));
if(this._singleChild&&this._singleChild.resize){
this._singleChildOriginalStyle=this._singleChild.domNode.style.cssText;
this._singleChild.resize({w:w,h:h});
}else{
_1094.set(this.containerNode,{width:w+"px",height:h+"px",overflow:"auto",position:"relative"});
}
}else{
if(this._singleChild&&this._singleChild.resize){
this._singleChild.resize();
}
}
},_position:function(){
if(!_1092.contains(win.body(),"dojoMove")){
var node=this.domNode,_10a8=_1096.getBox(),p=this._relativePosition,bb=p?null:_1093.position(node),l=Math.floor(_10a8.l+(p?p.x:(_10a8.w-bb.w)/2)),t=Math.floor(_10a8.t+(p?p.y:(_10a8.h-bb.h)/2));
_1094.set(node,{left:l+"px",top:t+"px"});
}
},_onKey:function(evt){
if(evt.charOrCode){
var node=evt.target;
if(evt.charOrCode===keys.TAB){
this._getFocusItems(this.domNode);
}
var _10a9=(this._firstFocusItem==this._lastFocusItem);
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===keys.TAB){
if(!_10a9){
focus.focus(this._lastFocusItem);
}
event.stop(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===keys.TAB&&!evt.shiftKey){
if(!_10a9){
focus.focus(this._firstFocusItem);
}
event.stop(evt);
}else{
while(node){
if(node==this.domNode||_1092.contains(node,"dijitPopup")){
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
var _10aa=_1096.getBox();
if(!this._oldViewport||_10aa.h!=this._oldViewport.h||_10aa.w!=this._oldViewport.w){
this.layout();
this._oldViewport=_10aa;
}
})));
}
this._modalconnects.push(on(this.domNode,_108f._keypress,lang.hitch(this,"_onKey")));
_1094.set(this.domNode,{opacity:0,display:""});
this._set("open",true);
this._onShow();
this._size();
this._position();
var _10ab;
this._fadeInDeferred=new _1091(lang.hitch(this,function(){
_10ab.stop();
delete this._fadeInDeferred;
}));
_10ab=fx.fadeIn({node:this.domNode,duration:this.duration,beforeBegin:lang.hitch(this,function(){
_10a4.show(this,this.underlayAttrs);
}),onEnd:lang.hitch(this,function(){
if(this.autofocus&&_10a4.isTop(this)){
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
var _10ac;
this._fadeOutDeferred=new _1091(lang.hitch(this,function(){
_10ac.stop();
delete this._fadeOutDeferred;
}));
this._fadeOutDeferred.then(lang.hitch(this,"onHide"));
_10ac=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,function(){
this.domNode.style.display="none";
_10a4.hide(this);
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
_10a4.hide(this);
this.inherited(arguments);
}});
var _10ad=_1090("dijit.Dialog",[_10a0,_10a2],{});
_10ad._DialogBase=_10a2;
var _10a4=_10ad._DialogLevelManager={_beginZIndex:950,show:function(_10ae,_10af){
ds[ds.length-1].focus=focus.curNode;
var _10b0=dijit._underlay;
if(!_10b0||_10b0._destroyed){
_10b0=dijit._underlay=new _109f(_10af);
}else{
_10b0.set(_10ae.underlayAttrs);
}
var _10b1=ds[ds.length-1].dialog?ds[ds.length-1].zIndex+2:_10ad._DialogLevelManager._beginZIndex;
if(ds.length==1){
_10b0.show();
}
_1094.set(dijit._underlay.domNode,"zIndex",_10b1-1);
_1094.set(_10ae.domNode,"zIndex",_10b1);
ds.push({dialog:_10ae,underlayAttrs:_10af,zIndex:_10b1});
},hide:function(_10b2){
if(ds[ds.length-1].dialog==_10b2){
ds.pop();
var pd=ds[ds.length-1];
if(ds.length==1){
if(!dijit._underlay._destroyed){
dijit._underlay.hide();
}
}else{
_1094.set(dijit._underlay.domNode,"zIndex",pd.zIndex-1);
dijit._underlay.set(pd.underlayAttrs);
}
if(_10b2.refocus){
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
}),_10b2);
if(idx!=-1){
ds.splice(idx,1);
}
}
},isTop:function(_10b3){
return ds[ds.length-1].dialog==_10b3;
}};
var ds=_10ad._dialogStack=[{dialog:null,focus:null,underlayAttrs:null}];
if(!_1095.isAsync){
ready(0,function(){
var _10b4=["dijit/TooltipDialog"];
_108e(_10b4);
});
}
return _10ad;
});
},"curam/layout/EmptyContentPane":function(){
define("curam/layout/EmptyContentPane",["dijit/layout/ContentPane"],function(){
var _10b5=dojo.declare("curam.layout.EmptyContentPane",dijit.layout.ContentPane,{baseClass:"",_layoutChildren:function(){
},resize:function(){
}});
return _10b5;
});
},"curam/util/ScreenContext":function(){
define("curam/util/ScreenContext",[],function(){
var _10b6={DEFAULT_CONTEXT:112,SAMPLE22:2,SAMPLE21:1,SAMPLE13:4,SAMPLE12:2,SAMPLE11:1,EXTAPP:1048576,CONTEXT_PORTLET:524288,SMART_PANEL:262144,NESTED_UIM:131072,ORG_TREE:65536,CONTEXT_PANEL:32768,LIST_ROW_INLINE_PAGE:8192,LIST_EVEN_ROW:16384,TAB:4096,TREE:2048,AGENDA:1024,POPUP:512,MODAL:256,HOME:128,HEADER:64,NAVIGATOR:32,FOOTER:16,OVAL:8,RESOLVE:4,ACTION:2,ERROR:1,EMPTY:0};
var _10b7=[["ERROR","ACTION","RESOLVE","OPT_VALIDATION","FOOTER","NAVIGATOR","HEADER","HOME_PAGE","MODAL","POPUP","AGENDA","TREE","TAB","LIST_EVEN_ROW","LIST_ROW_INLINE_PAGE","CONTEXT_PANEL","ORG_TREE","NESTED_UIM","SMART_PANEL","CONTEXT_PORTLET","EXTAPP"],["SAMPLE11","SAMPLE12","SAMPLE13"],["SAMPLE21","SAMPLE22"]];
var _10b8=dojo.declare("curam.util.ScreenContext",null,{constructor:function(_10b9){
if(_10b9){
this.setContext(_10b9);
}else{
this.currentContext=[_10b6["DEFAULT_CONTEXT"]|_10b6["DEFAULT_CONTEXT"]];
}
},setContext:function(_10ba){
var tmp=this.setup(_10ba);
this.currentContext=((tmp==null)?([_10b6["DEFAULT_CONTEXT"]|_10b6["DEFAULT_CONTEXT"]]):(tmp));
},addContextBits:function(_10bb,idx){
if(!_10bb){
return;
}
var navig=(idx)?idx:0;
var _10bc=this.parseContext(_10bb);
if(_10bc!=null){
this.currentContext[navig]|=_10bc;
}
return this.currentContext[navig];
},addAll:function(idx){
var navig=(idx)?idx:0;
this.currentContext[navig]=4294967295;
return this.currentContext[navig];
},clear:function(_10bd,idx){
if(!_10bd){
this.clearAll();
return;
}
var navig=(idx)?idx:0;
if(_10bd==0){
return this.currentContext[navig];
}
var _10be=this.parseContext(_10bd);
if(_10be!=null){
var _10bf=this.currentContext[navig]&_10be;
this.currentContext[navig]^=_10bf;
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
},updateStates:function(_10c0){
this.clear("ERROR|ACTION|RESOLVE");
this.currentContext[0]=this.currentContext[0]|(_10c0&7);
},hasContextBits:function(_10c1,idx){
if(!_10c1){
return false;
}
var navig=(idx)?idx:0;
var _10c2=this.parseContext(_10c1);
if(_10c2!=null){
var merge=this.currentContext[navig]&_10c2;
return (merge==_10c2);
}
return false;
},getValue:function(){
var _10c3="";
for(var i=0;i<this.currentContext.length;i++){
_10c3+=this.currentContext[i]+"|";
}
return _10c3.substring(0,_10c3.length-1);
},toRequestString:function(){
return "o3ctx="+this.getValue();
},toBinary:function(){
var _10c4="";
for(var i=0;i<this.currentContext.length;i++){
_10c4+=this.currentContext[i].toString(2)+"|";
}
return _10c4.substring(0,_10c4.length-1);
},toString:function(){
var _10c5="";
for(var i=0;i<this.currentContext.length;i++){
var _10c6="";
var j=0;
while(j<_10b7[i].length){
if(((this.currentContext[i]>>j)&1)!=0){
_10c6+=","+_10b7[i][j];
}
j++;
}
if(_10c6==""){
return "{}";
}
_10c5+="|"+_10c6.replace(",","{")+((_10c6.length==0)?"":"}");
}
return _10c5.substring(1);
},parseContext:function(_10c7){
var _10c8=_10c7.replace(/,/g,"|");
var parts=_10c8.split("|");
var tmp=isNaN(parts[0])?parseInt(_10b6[parts[0]]):parts[0];
for(var i=1;i<parts.length;i++){
tmp=tmp|(isNaN(parts[i])?parseInt(_10b6[parts[i]]):parts[i]);
}
return (isNaN(tmp)?null:tmp);
},setup:function(_10c9){
if(!_10c9){
return null;
}
var _10ca=(""+_10c9).split("|");
var _10cb=new Array(_10ca.length);
for(var i=0;i<_10ca.length;i++){
_10cb[i]=this.parseContext(_10ca[_10ca.length-i-1]);
_10cb[i]=_10cb[i]|_10cb[i];
if(!_10cb[i]||isNaN(_10cb[i])||_10cb[i]>4294967295){
return null;
}
}
return _10cb;
}});
return _10b8;
});
},"dijit/a11y":function(){
define("dijit/a11y",["dojo/_base/array","dojo/_base/config","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-style","dojo/_base/sniff","./_base/manager","."],function(array,_10cc,_10cd,dom,_10ce,_10cf,has,_10d0,dijit){
var shown=(dijit._isElementShown=function(elem){
var s=_10cf.get(elem);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(_10ce.get(elem,"type")!="hidden");
});
dijit.hasDefaultTabStop=function(elem){
switch(elem.nodeName.toLowerCase()){
case "a":
return _10ce.has(elem,"href");
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
var _10d1=elem.contentDocument;
if("designMode" in _10d1&&_10d1.designMode=="on"){
return true;
}
body=_10d1.body;
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
var _10d2=(dijit.isTabNavigable=function(elem){
if(_10ce.get(elem,"disabled")){
return false;
}else{
if(_10ce.has(elem,"tabIndex")){
return _10ce.get(elem,"tabIndex")>=0;
}else{
return dijit.hasDefaultTabStop(elem);
}
}
});
dijit._getTabNavigable=function(root){
var first,last,_10d3,_10d4,_10d5,_10d6,_10d7={};
function _10d8(node){
return node&&node.tagName.toLowerCase()=="input"&&node.type&&node.type.toLowerCase()=="radio"&&node.name&&node.name.toLowerCase();
};
var _10d9=function(_10da){
for(var child=_10da.firstChild;child;child=child.nextSibling){
if(child.nodeType!=1||(has("ie")<=9&&child.scopeName!=="HTML")||!shown(child)){
continue;
}
if(_10d2(child)){
var _10db=_10ce.get(child,"tabIndex");
if(!_10ce.has(child,"tabIndex")||_10db==0){
if(!first){
first=child;
}
last=child;
}else{
if(_10db>0){
if(!_10d3||_10db<_10d4){
_10d4=_10db;
_10d3=child;
}
if(!_10d5||_10db>=_10d6){
_10d6=_10db;
_10d5=child;
}
}
}
var rn=_10d8(child);
if(_10ce.get(child,"checked")&&rn){
_10d7[rn]=child;
}
}
if(child.nodeName.toUpperCase()!="SELECT"){
_10d9(child);
}
}
};
if(shown(root)){
_10d9(root);
}
function rs(node){
return _10d7[_10d8(node)]||node;
};
return {first:rs(first),last:rs(last),lowest:rs(_10d3),highest:rs(_10d5)};
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
define("dijit/form/_ToggleButtonMixin",["dojo/_base/declare","dojo/dom-attr"],function(_10dc,_10dd){
return _10dc("dijit.form._ToggleButtonMixin",null,{checked:false,_aria_attr:"aria-pressed",_onClick:function(evt){
var _10de=this.checked;
this._set("checked",!_10de);
var ret=this.inherited(arguments);
this.set("checked",ret?this.checked:_10de);
return ret;
},_setCheckedAttr:function(value,_10df){
this._set("checked",value);
_10dd.set(this.focusNode||this.domNode,"checked",value);
(this.focusNode||this.domNode).setAttribute(this._aria_attr,value?"true":"false");
this._handleOnChange(value,_10df);
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
}});
});
},"dijit/_Widget":function(){
define("dijit/_Widget",["dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/ready","./registry","./_WidgetBase","./_OnDijitClickMixin","./_FocusMixin","dojo/uacss","./hccss"],function(_10e0,_10e1,_10e2,_10e3,_10e4,lang,query,ready,_10e5,_10e6,_10e7,_10e8){
function _10e9(){
};
function _10ea(_10eb){
return function(obj,event,scope,_10ec){
if(obj&&typeof event=="string"&&obj[event]==_10e9){
return obj.on(event.substring(2).toLowerCase(),lang.hitch(scope,_10ec));
}
return _10eb.apply(_10e2,arguments);
};
};
_10e0.around(_10e2,"connect",_10ea);
if(_10e4.connect){
_10e0.around(_10e4,"connect",_10ea);
}
var _10ed=_10e3("dijit._Widget",[_10e6,_10e7,_10e8],{onClick:_10e9,onDblClick:_10e9,onKeyDown:_10e9,onKeyPress:_10e9,onKeyUp:_10e9,onMouseDown:_10e9,onMouseMove:_10e9,onMouseOut:_10e9,onMouseOver:_10e9,onMouseLeave:_10e9,onMouseEnter:_10e9,onMouseUp:_10e9,constructor:function(_10ee){
this._toConnect={};
for(var name in _10ee){
if(this[name]===_10e9){
this._toConnect[name.replace(/^on/,"").toLowerCase()]=_10ee[name];
delete _10ee[name];
}
}
},postCreate:function(){
this.inherited(arguments);
for(var name in this._toConnect){
this.on(name,this._toConnect[name]);
}
delete this._toConnect;
},on:function(type,func){
if(this[this._onMap(type)]===_10e9){
return _10e2.connect(this.domNode,type.toLowerCase(),this,func);
}
return this.inherited(arguments);
},_setFocusedAttr:function(val){
this._focused=val;
this._set("focused",val);
},setAttribute:function(attr,value){
_10e4.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(attr,value);
},attr:function(name,value){
if(_10e1.isDebug){
var _10ef=arguments.callee._ach||(arguments.callee._ach={}),_10f0=(arguments.callee.caller||"unknown caller").toString();
if(!_10ef[_10f0]){
_10e4.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+_10f0,"","2.0");
_10ef[_10f0]=true;
}
}
var args=arguments.length;
if(args>=2||typeof name==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(name);
}
},getDescendants:function(){
_10e4.deprecated(this.declaredClass+"::getDescendants() is deprecated. Use getChildren() instead.","","2.0");
return this.containerNode?query("[widgetId]",this.containerNode).map(_10e5.byNode):[];
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
if(!_10e4.isAsync){
ready(0,function(){
var _10f1=["dijit/_base"];
require(_10f1);
});
}
return _10ed;
});
},"dojo/touch":function(){
define("dojo/touch",["./_base/kernel","./on","./has","./mouse"],function(dojo,on,has,mouse){
function _10f2(type){
return function(node,_10f3){
return on(node,type,_10f3);
};
};
var touch=has("touch");
dojo.touch={press:_10f2(touch?"touchstart":"mousedown"),move:_10f2(touch?"touchmove":"mousemove"),release:_10f2(touch?"touchend":"mouseup"),cancel:touch?_10f2("touchcancel"):mouse.leave};
return dojo.touch;
});
},"url:dijit/form/templates/Select.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tdata-dojo-attach-point=\"_buttonNode,tableNode,focusNode\" cellspacing='0' cellpadding='0'\n\trole=\"combobox\" aria-haspopup=\"true\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonContents dijitButtonNode\" role=\"presentation\"\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"  data-dojo-attach-point=\"containerNode,_popupStateNode\"></span\n\t\t\t><input type=\"hidden\" ${!nameAttrSetting} data-dojo-attach-point=\"valueNode\" value=\"${value}\" aria-hidden=\"true\"\n\t\t/></td><td class=\"dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton\"\n\t\t\t\tdata-dojo-attach-point=\"titleNode\" role=\"presentation\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t></tr></tbody\n></table>\n","dojo/fx":function(){
define("dojo/fx",["./_base/lang","./Evented","./_base/kernel","./_base/array","./_base/connect","./_base/fx","./dom","./dom-style","./dom-geometry","./ready","require"],function(lang,_10f4,dojo,_10f5,_10f6,_10f7,dom,_10f8,geom,ready,_10f9){
if(!dojo.isAsync){
ready(0,function(){
var _10fa=["./fx/Toggler"];
_10f9(_10fa);
});
}
var _10fb=dojo.fx={};
var _10fc={_fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,args||[]);
}
return this;
}};
var _10fd=function(_10fe){
this._index=-1;
this._animations=_10fe||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
_10f5.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
_10fd.prototype=new _10f4();
lang.extend(_10fd,{_onAnimate:function(){
this._fire("onAnimate",arguments);
},_onEnd:function(){
_10f6.disconnect(this._onAnimateCtx);
_10f6.disconnect(this._onEndCtx);
this._onAnimateCtx=this._onEndCtx=null;
if(this._index+1==this._animations.length){
this._fire("onEnd");
}else{
this._current=this._animations[++this._index];
this._onAnimateCtx=_10f6.connect(this._current,"onAnimate",this,"_onAnimate");
this._onEndCtx=_10f6.connect(this._current,"onEnd",this,"_onEnd");
this._current.play(0,true);
}
},play:function(delay,_10ff){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_10ff&&this._current.status()=="playing"){
return this;
}
var _1100=_10f6.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_1101=_10f6.connect(this._current,"onBegin",this,function(arg){
this._fire("onBegin",arguments);
}),_1102=_10f6.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
_10f6.disconnect(_1100);
_10f6.disconnect(_1101);
_10f6.disconnect(_1102);
});
if(this._onAnimateCtx){
_10f6.disconnect(this._onAnimateCtx);
}
this._onAnimateCtx=_10f6.connect(this._current,"onAnimate",this,"_onAnimate");
if(this._onEndCtx){
_10f6.disconnect(this._onEndCtx);
}
this._onEndCtx=_10f6.connect(this._current,"onEnd",this,"_onEnd");
this._current.play.apply(this._current,arguments);
return this;
},pause:function(){
if(this._current){
var e=_10f6.connect(this._current,"onPause",this,function(arg){
this._fire("onPause",arguments);
_10f6.disconnect(e);
});
this._current.pause();
}
return this;
},gotoPercent:function(_1103,_1104){
this.pause();
var _1105=this.duration*_1103;
this._current=null;
_10f5.some(this._animations,function(a){
if(a.duration<=_1105){
this._current=a;
return true;
}
_1105-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_1105/this._current.duration,_1104);
}
return this;
},stop:function(_1106){
if(this._current){
if(_1106){
for(;this._index+1<this._animations.length;++this._index){
this._animations[this._index].stop(true);
}
this._current=this._animations[this._index];
}
var e=_10f6.connect(this._current,"onStop",this,function(arg){
this._fire("onStop",arguments);
_10f6.disconnect(e);
});
this._current.stop();
}
return this;
},status:function(){
return this._current?this._current.status():"stopped";
},destroy:function(){
if(this._onAnimateCtx){
_10f6.disconnect(this._onAnimateCtx);
}
if(this._onEndCtx){
_10f6.disconnect(this._onEndCtx);
}
}});
lang.extend(_10fd,_10fc);
_10fb.chain=function(_1107){
return new _10fd(_1107);
};
var _1108=function(_1109){
this._animations=_1109||[];
this._connects=[];
this._finished=0;
this.duration=0;
_10f5.forEach(_1109,function(a){
var _110a=a.duration;
if(a.delay){
_110a+=a.delay;
}
if(this.duration<_110a){
this.duration=_110a;
}
this._connects.push(_10f6.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new _10f7.Animation({curve:[0,1],duration:this.duration});
var self=this;
_10f5.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop","onEnd"],function(evt){
self._connects.push(_10f6.connect(self._pseudoAnimation,evt,function(){
self._fire(evt,arguments);
}));
});
};
lang.extend(_1108,{_doAction:function(_110b,args){
_10f5.forEach(this._animations,function(a){
a[_110b].apply(a,args);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_110c,args){
var t=this._pseudoAnimation;
t[_110c].apply(t,args);
},play:function(delay,_110d){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_110e,_110f){
var ms=this.duration*_110e;
_10f5.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_110f);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_1110){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
_10f5.forEach(this._connects,_10f6.disconnect);
}});
lang.extend(_1108,_10fc);
_10fb.combine=function(_1111){
return new _1108(_1111);
};
_10fb.wipeIn=function(args){
var node=args.node=dom.byId(args.node),s=node.style,o;
var anim=_10f7.animateProperty(lang.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _1112=_10f8.get(node,"height");
return Math.max(_1112,1);
}
},end:function(){
return node.scrollHeight;
}}}},args));
var fini=function(){
s.height="auto";
s.overflow=o;
};
_10f6.connect(anim,"onStop",fini);
_10f6.connect(anim,"onEnd",fini);
return anim;
};
_10fb.wipeOut=function(args){
var node=args.node=dom.byId(args.node),s=node.style,o;
var anim=_10f7.animateProperty(lang.mixin({properties:{height:{end:1}}},args));
_10f6.connect(anim,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
var fini=function(){
s.overflow=o;
s.height="auto";
s.display="none";
};
_10f6.connect(anim,"onStop",fini);
_10f6.connect(anim,"onEnd",fini);
return anim;
};
_10fb.slideTo=function(args){
var node=args.node=dom.byId(args.node),top=null,left=null;
var init=(function(n){
return function(){
var cs=_10f8.getComputedStyle(n);
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
var anim=_10f7.animateProperty(lang.mixin({properties:{top:args.top||0,left:args.left||0}},args));
_10f6.connect(anim,"beforeBegin",anim,init);
return anim;
};
return _10fb;
});
},"dijit/_DialogMixin":function(){
define("dijit/_DialogMixin",["dojo/_base/declare","./a11y"],function(_1113,a11y){
return _1113("dijit._DialogMixin",null,{execute:function(){
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
define("curam/tab/TabDescriptor",["curam/tab/TabSessionManager","curam/debug","curam/util/ResourceBundle"],function(_1114){
dojo.requireLocalization("curam.application","Debug");
var _1115=new curam.util.ResourceBundle("Debug");
var _1116=dojo.declare("curam.tab.TabDescriptor",null,{constructor:function(_1117,tabID){
this.sectionID=_1117?_1117:null;
this.tabID=tabID?tabID:null;
this.tabSignature=null;
this.tabContent=null;
this.tabParamNames=null;
this.isHomePage=false;
},toJson:function(){
var value={"sectionID":this.sectionID,"tabID":this.tabID,"tabSignature":this.tabSignature,"tabParamNames":this.tabParamNames,"isHomePage":this.isHomePage};
value.tabContent=this.tabContent?this.tabContent:null;
return dojo.toJson(value);
},setTabContent:function(_1118,_1119){
if(this.tabContent){
this._log(_1115.getProperty("curam.tab.TabDescriptor.content.changed"));
}else{
this._log(_1115.getProperty("curam.tab.TabDescriptor.content.set"));
}
var _111a=dojo.clone(_1118.parameters);
dojo.mixin(_111a,_1118.cdejParameters);
if(!this.tabContent){
this.tabContent={};
}
this.tabContent.parameters=_111a;
this.tabContent.pageID=_1118.pageID;
if(_1119){
this.tabContent.tabName=_1119;
}else{
if(!this.tabContent.tabName){
this.tabContent.tabName="";
}
}
this._save();
dojo.publish("/curam/tab/labelUpdated");
},setTabSignature:function(_111b,_111c,_111d){
if(!this.tabSignature){
this.tabParamNames=_111b.slice(0);
this.tabParamNames.sort();
this.tabSignature=this._generateSignature(this.tabID,this.tabParamNames,_111c);
this._log(_1115.getProperty("curam.tab.TabDescriptor.signature.set"));
this._save();
if(!_111d){
this._select();
}
}else{
this._log(_1115.getProperty("curam.tab.TabDescriptor.signature.not.set"));
}
},matchesPageRequest:function(_111e){
return this.tabSignature&&this.tabSignature==this._generateSignature(this.tabID,this.tabParamNames,_111e);
},_generateSignature:function(tabID,_111f,_1120){
var _1121=tabID;
if(_111f){
for(var i=0;i<_111f.length;i++){
var name=_111f[i];
if(_1120.parameters[name]){
_1121+="|"+name+"="+_1120.parameters[name];
}
}
}
return _1121;
},_save:function(){
if(this.tabContent&&this.tabSignature){
this._log(_1115.getProperty("curam.tab.TabDescriptor.saving"));
new _1114().tabUpdated(this);
}
},_select:function(){
if(this.tabSignature){
this._log(_1115.getProperty("curam.tab.TabDescriptor.selecting"));
new _1114().tabSelected(this);
}
},_log:function(msg){
if(curam.debug.enabled()){
curam.debug.log("TAB DESCRIPTOR: "+msg+" ["+this.toJson()+"]");
}
}});
dojo.mixin(curam.tab.TabDescriptor,{fromJson:function(_1122){
var _1123=null;
if(_1122){
var rawTD=dojo.fromJson(_1122);
var _1123=new curam.tab.TabDescriptor(rawTD.sectionID,rawTD.tabID);
if(rawTD.tabSignature){
_1123.tabSignature=rawTD.tabSignature;
}
if(rawTD.tabContent){
_1123.tabContent=rawTD.tabContent;
}
if(rawTD.tabParamNames){
_1123.tabParamNames=rawTD.tabParamNames;
}
if(rawTD.isHomePage){
_1123.isHomePage=rawTD.isHomePage;
}
}
return _1123;
}});
return _1116;
});
},"curam/ui/OpenTabEvent":function(){
define("curam/ui/OpenTabEvent",["curam/ui/PageRequest"],function(_1124){
var _1125=dojo.declare("curam.ui.OpenTabEvent",null,{constructor:function(_1126,_1127,_1128){
this.tabDescriptor=_1126;
this.openInBackground=_1128?true:false;
if(_1127){
this.uimPageRequest=_1127;
}else{
this.uimPageRequest=new _1124(_1126,_1126.isHomePage);
}
}});
return _1125;
});
},"curam/widgets":function(){
define("curam/widgets",[],function(){
var _1129=function(_112a){
this.accordion=new _112b(_112a,this);
this.accordion.switchboard=this;
};
var _112c={updateButtons:function(){
var _112d=this.accordion;
this.collapser.disabled=_112d.staysStill(false);
this.expander.disabled=_112d.staysStill(true);
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
dojo.mixin(_1129.prototype,_112c);
var _112b=function(_112e,_112f){
var _1130;
this.panelHeight="250px";
this.accordMode=true;
this.switchboard=_112f;
this.topElement=dojo.byId(_112e);
this.tabs=[];
var _1131=dojo.query("div",this.topElement);
for(var i=0;i<_1131.length;i++){
if(_1131[i].className=="accordionTab"){
while(_1131[++i].className!="tabHeader"){
}
_1130=_1131[i];
while(_1131[++i].className!="tabContent"){
}
this.tabs[this.tabs.length]=new _1132(this,_1130,_1131[i]);
}
}
this.lastTab=this.tabs[0];
for(var i=1;i<this.tabs.length;i++){
this.tabs[i].collapse(false);
}
};
var _1133={expandAll:function(){
var _1134=this.switchboard.accordion;
for(var i=0;i<_1134.tabs.length;i++){
_1134.tabs[i].stateExpanded();
}
this.src="../themes/classic/images/evidence-review/CollapseAllButton.png";
this.onclick=_1134.collapseAll;
},collapseAll:function(){
var _1135=this.switchboard.accordion;
for(var i=0;i<_1135.tabs.length;i++){
_1135.tabs[i].collapse(false);
}
_1135.lastTab.expand(false);
this.src="../themes/classic/images/evidence-review/ExpandAllButton.png";
this.onclick=_1135.expandAll;
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
},staysStill:function(_1136){
var _1137=0;
var _1138=this.tabs.length;
for(var i=0;i<_1138;i++){
if(this.tabs[i].expanded==true){
_1137++;
}
}
return (_1136==true)?(_1138-_1137==0):(_1137==1);
}};
dojo.mixin(_112b.prototype,_1133);
var _1132=function(_1139,_113a,_113b){
this.accordion=_1139;
this.switchboard=_1139.switchboard;
this.header=_113a;
this.header.tab=this;
this.content=_113b;
dojo.style(this.content,{height:_1139.panelHeight,overflow:"auto"});
this.content.tab=this;
this.expanded=true;
dojo.connect(this.header,"onclick",this.toggleState);
dojo.connect(this.header,"onmouseover",this.hoverStyle);
dojo.connect(this.header,"onmouseout",this.stillStyle);
};
var _113c={hoverStyle:function(e){
if(!this.tab.expanded){
this.className+=" tabHeaderHover";
}
},stillStyle:function(e){
this.className="tabHeader";
},collapse:function(_113d){
if(this.accordion.lastTab==this){
return;
}
if(this.accordion.staysStill(false)){
return;
}
if(_113d&&this.accordion.accordMode==false){
new _113e(this.content,"down");
}else{
dojo.style(this.content,{height:"1px",display:"none"});
}
this.expanded=false;
this.content.style.overflow="hidden";
if(this.accordion.accordMode==false){
this.switchboard.updateButtons();
}
},expand:function(_113f){
if(this.accordion.lastTab==this){
return;
}
if(this.accordion.staysStill(true)){
return;
}
var _1140=this.accordion.lastTab;
this.stateExpanded(_113f);
this.accordion.lastTab=this;
if(this.accordion.accordMode==true){
_1140.collapse(true);
}else{
this.switchboard.updateButtons();
}
},stateExpanded:function(_1141){
if(_1141){
this.content.style.display="";
if(this.accordion.accordMode==true){
new _1142(this.content,this.accordion.lastTab.content);
}else{
new _113e(this.content,"up");
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
dojo.mixin(_1132.prototype,_113c);
var _113e=function(_1143,_1144){
this.contentRef=_1143;
this.direction=_1144;
this.duration=100;
this.steps=6;
this.step();
};
var _1145={step:function(){
var _1146;
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
var _1147=Math.round(this.duration/this.steps);
if(this.direction=="down"){
_1146=this.steps>0?(parseInt(this.contentRef.offsetHeight)-1)/this.steps:0;
}else{
_1146=this.steps>0?(parseInt(this.contentRef.tab.accordion.panelHeight)-parseInt(this.contentRef.offsetHeight))/this.steps:0;
}
this.resizeBy(_1146);
this.duration-=_1147;
this.steps--;
this.timer=setTimeout(dojo.hitch(this,this.step),_1147);
},resizeBy:function(_1148){
var _1149=this.contentRef.offsetHeight;
var _114a=parseInt(_1148);
if(_1148!=0){
if(this.direction=="down"){
this.contentRef.style.height=(_1149-_114a)+"px";
}else{
this.contentRef.style.height=(_1149+_114a)+"px";
}
}
}};
dojo.mixin(_113e.prototype,_1145);
var _1142=function(_114b,_114c){
this.collapsingContent=_114c;
this.collapsingContent.style.overflow="hidden";
this.expandingContent=_114b;
this.limit=250;
this.duration=100;
this.steps=10;
this.expandingContent.style.display="";
this.step();
};
var _114d={step:function(){
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
var _114e=Math.round(this.duration/this.steps);
var _114f=this.steps>0?(parseInt(this.collapsingContent.style.height)-1)/this.steps:0;
this.resizeBoth(_114f);
this.duration-=_114e;
this.steps--;
this.timer=setTimeout(dojo.hitch(this,this.step),_114e);
},resizeBoth:function(_1150){
var h1=parseInt(this.collapsingContent.style.height);
var h2=parseInt(this.expandingContent.style.height);
var _1151=parseInt(_1150);
if(_1150!=0){
if(h2+_1151<this.limit){
this.collapsingContent.style.height=(h1-_1151)+"px";
this.expandingContent.style.height=(h2+_1151)+"px";
}
}
}};
dojo.mixin(_1142.prototype,_114d);
var _1152={version:"1",AccordionControl:_1129,AccordionWidget:_112b,AccordionTab:_1132,SingleSlowMotion:_113e,SynchroSlowMotion:_1142,registerAccordion:function(id){
_1129.constructor(id);
}};
var _1153=function(_1154){
this.steps=_1154;
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
var _1155={addRegion:function(_1156){
this.regions[this.regions.length]=_1156;
},drawMap:function(){
var _1157;
if(this.steps%2==0){
_1157=this.steps/2;
}else{
_1157=(this.steps-1)/2;
}
var step=parseInt(255/_1157);
var red,green,blue;
for(var i=0;i<this.steps;++i){
var _1158;
if(i==0){
_1158="#ff0000";
}else{
if(i==(this.steps-1)){
_1158="#0000ff";
}else{
if(i==_1157){
_1158="#ffffff";
}else{
if(i>_1157){
var green=255;
var red=255;
green-=(i-_1157)*step;
red-=(i-_1157)*step;
_1158=this.rgbToHex(red,green,255);
}else{
if(i<_1157){
green=0;
blue=0;
green+=step*i;
blue+=step*i;
_1158=this.rgbToHex(255,green,blue);
}
}
}
}
}
var table=dojo.byId("heatmapTable");
if(table){
var _1159=table.getElementsByTagName("td");
for(var j=0;j<_1159.length;j++){
if(_1159[j].className.indexOf("region"+this.regions[i])>-1){
_1159[j].style.background=_1158;
if(i>_1157){
dojo.style(dojo.query("a",_1159[j])[0],"color","white");
}
}
}
}
dojo.style(dojo.byId("legendImage"+this.regions[i]),{color:_1158,background:_1158});
}
},rgbToHex:function(r,g,b){
var rr=this.RGB[r];
var gg=this.RGB[g];
var bb=this.RGB[b];
return "#"+rr+gg+bb;
}};
dojo.mixin(_1153.prototype,_1155);
dojo.global.getDataIn=function(_115a){
return eval(_115a);
};
dojo.global.Widgets=_1152;
dojo.global.HeatMap=_1153;
return _1152;
});
},"dijit/Tree":function(){
require({cache:{"url:dijit/templates/TreeNode.html":"<div class=\"dijitTreeNode\" role=\"presentation\"\n\t><div data-dojo-attach-point=\"rowNode\" class=\"dijitTreeRow\" role=\"presentation\" data-dojo-attach-event=\"onmouseenter:_onMouseEnter, onmouseleave:_onMouseLeave, onclick:_onClick, ondblclick:_onDblClick\"\n\t\t><img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"expandoNode\" class=\"dijitTreeExpando\" role=\"presentation\"\n\t\t/><span data-dojo-attach-point=\"expandoNodeText\" class=\"dijitExpandoText\" role=\"presentation\"\n\t\t></span\n\t\t><span data-dojo-attach-point=\"contentNode\"\n\t\t\tclass=\"dijitTreeContent\" role=\"presentation\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"iconNode\" class=\"dijitIcon dijitTreeIcon\" role=\"presentation\"\n\t\t\t/><span data-dojo-attach-point=\"labelNode\" class=\"dijitTreeLabel\" role=\"treeitem\" tabindex=\"-1\" aria-selected=\"false\" data-dojo-attach-event=\"onfocus:_onLabelFocus\"></span>\n\t\t</span\n\t></div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitTreeContainer\" role=\"presentation\" style=\"display: none;\"></div>\n</div>\n","url:dijit/templates/Tree.html":"<div class=\"dijitTree dijitTreeContainer\" role=\"tree\"\n\tdata-dojo-attach-event=\"onkeypress:_onKeyPress\">\n\t<div class=\"dijitInline dijitTreeIndent\" style=\"position: absolute; top: -9999px\" data-dojo-attach-point=\"indentDetector\"></div>\n</div>\n"}});
define("dijit/Tree",["dojo/_base/array","dojo/_base/connect","dojo/cookie","dojo/_base/declare","dojo/_base/Deferred","dojo/DeferredList","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/fx","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/topic","./focus","./registry","./_base/manager","./_Widget","./_TemplatedMixin","./_Container","./_Contained","./_CssStateMixin","dojo/text!./templates/TreeNode.html","dojo/text!./templates/Tree.html","./tree/TreeStoreModel","./tree/ForestStoreModel","./tree/_dndSelector"],function(array,_115b,_115c,_115d,_115e,_115f,dom,_1160,_1161,_1162,event,_1163,_1164,keys,lang,topic,focus,_1165,_1166,_1167,_1168,_1169,_116a,_116b,_116c,_116d,_116e,_116f,_1170){
var _1171=_115d("dijit._TreeNode",[_1167,_1168,_1169,_116a,_116b],{item:null,isTreeNode:true,label:"",_setLabelAttr:{node:"labelNode",type:"innerText"},isExpandable:null,isExpanded:false,state:"UNCHECKED",templateString:_116c,baseClass:"dijitTreeNode",cssStateNodes:{rowNode:"dijitTreeRow",labelNode:"dijitTreeLabel"},_setTooltipAttr:{node:"rowNode",type:"attribute",attribute:"title"},buildRendering:function(){
this.inherited(arguments);
this._setExpando();
this._updateItemClasses(this.item);
if(this.isExpandable){
this.labelNode.setAttribute("aria-expanded",this.isExpanded);
}
this.setSelected(false);
},_setIndentAttr:function(_1172){
var _1173=(Math.max(_1172,0)*this.tree._nodePixelIndent)+"px";
_1162.set(this.domNode,"backgroundPosition",_1173+" 0px");
_1162.set(this.rowNode,this.isLeftToRight()?"paddingLeft":"paddingRight",_1173);
array.forEach(this.getChildren(),function(child){
child.set("indent",_1172+1);
});
this._set("indent",_1172);
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
var _1174="_"+lower+"Class";
var _1175=lower+"Node";
var _1176=this[_1174];
this[_1174]=this.tree["get"+upper+"Class"](item,this.isExpanded);
_1160.replace(this[_1175],this[_1174]||"",_1176||"");
_1162.set(this[_1175],this.tree["get"+upper+"Style"](item,this.isExpanded)||{});
},_updateLayout:function(){
var _1177=this.getParent();
if(!_1177||!_1177.rowNode||_1177.rowNode.style.display=="none"){
_1160.add(this.domNode,"dijitTreeIsRoot");
}else{
_1160.toggle(this.domNode,"dijitTreeIsLast",!this.getNextSibling());
}
},_setExpando:function(_1178){
var _1179=["dijitTreeExpandoLoading","dijitTreeExpandoOpened","dijitTreeExpandoClosed","dijitTreeExpandoLeaf"],_117a=["*","-","+","*"],idx=_1178?0:(this.isExpandable?(this.isExpanded?1:2):3);
_1160.replace(this.expandoNode,_1179[idx],_1179);
this.expandoNodeText.innerHTML=_117a[idx];
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
_1160.add(this.contentNode,"dijitTreeContentExpanded");
this._setExpando();
this._updateItemClasses(this.item);
if(this==this.tree.rootNode&&this.tree.showRoot){
this.tree.domNode.setAttribute("aria-expanded","true");
}
var def,_117b=_1163.wipeIn({node:this.containerNode,duration:_1166.defaultDuration,onEnd:function(){
def.callback(true);
}});
def=(this._expandDeferred=new _115e(function(){
_117b.stop();
}));
_117b.play();
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
_1160.remove(this.contentNode,"dijitTreeContentExpanded");
this._setExpando();
this._updateItemClasses(this.item);
if(!this._wipeOut){
this._wipeOut=_1163.wipeOut({node:this.containerNode,duration:_1166.defaultDuration});
}
this._wipeOut.play();
},indent:0,setChildItems:function(items){
var tree=this.tree,model=tree.model,defs=[];
array.forEach(this.getChildren(),function(child){
_1169.prototype.removeChild.call(this,child);
},this);
this.state="LOADED";
if(items&&items.length>0){
this.isExpandable=true;
array.forEach(items,function(item){
var id=model.getIdentity(item),_117c=tree._itemNodesMap[id],node;
if(_117c){
for(var i=0;i<_117c.length;i++){
if(_117c[i]&&!_117c[i].getParent()){
node=_117c[i];
node.set("indent",this.indent+1);
break;
}
}
}
if(!node){
node=this.tree._createTreeNode({item:item,tree:tree,isExpandable:model.mayHaveChildren(item),label:tree.getLabel(item),tooltip:tree.getTooltip(item),dir:tree.dir,lang:tree.lang,textDir:tree.textDir,indent:this.indent+1});
if(_117c){
_117c.push(node);
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
return new _115f(defs);
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
var _117d=this.getChildren();
if(_117d.length==0){
this.isExpandable=false;
this.collapse();
}
array.forEach(_117d,function(child){
child._updateLayout();
});
},makeExpandable:function(){
this.isExpandable=true;
this._setExpando(false);
},_onLabelFocus:function(){
this.tree._onNodeFocus(this);
},setSelected:function(_117e){
this.labelNode.setAttribute("aria-selected",_117e);
_1160.toggle(this.rowNode,"dijitTreeRowSelected",_117e);
},setFocusable:function(_117f){
this.labelNode.setAttribute("tabIndex",_117f?"0":"-1");
},_onClick:function(evt){
this.tree._onClick(this,evt);
},_onDblClick:function(evt){
this.tree._onDblClick(this,evt);
},_onMouseEnter:function(evt){
this.tree._onNodeMouseEnter(this,evt);
},_onMouseLeave:function(evt){
this.tree._onNodeMouseLeave(this,evt);
},_setTextDirAttr:function(_1180){
if(_1180&&((this.textDir!=_1180)||!this._created)){
this._set("textDir",_1180);
this.applyTextDir(this.labelNode,this.labelNode.innerText||this.labelNode.textContent||"");
array.forEach(this.getChildren(),function(_1181){
_1181.set("textDir",_1180);
},this);
}
}});
var Tree=_115d("dijit.Tree",[_1167,_1168],{store:null,model:null,query:null,label:"",showRoot:true,childrenAttr:["children"],paths:[],path:[],selectedItems:null,selectedItem:null,openOnClick:false,openOnDblClick:false,templateString:_116d,persist:true,autoExpand:false,dndController:_1170,dndParams:["onDndDrop","itemCreator","onDndCancel","checkAcceptance","checkItemAcceptance","dragThreshold","betweenThreshold"],onDndDrop:null,itemCreator:null,onDndCancel:null,checkAcceptance:null,checkItemAcceptance:null,dragThreshold:5,betweenThreshold:0,_nodePixelIndent:19,_publish:function(_1182,_1183){
topic.publish(this.id,lang.mixin({tree:this,event:_1182},_1183||{}));
},postMixInProperties:function(){
this.tree=this;
if(this.autoExpand){
this.persist=false;
}
this._itemNodesMap={};
if(!this.cookieName&&this.id){
this.cookieName=this.id+"SaveStateCookie";
}
this._loadDeferred=new _115e();
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
var _1184={};
for(var i=0;i<this.dndParams.length;i++){
if(this[this.dndParams[i]]){
_1184[this.dndParams[i]]=this[this.dndParams[i]];
}
}
this.dndController=new this.dndController(this,_1184);
}
this._load();
},_store2model:function(){
this._v10Compat=true;
_1164.deprecated("Tree: from version 2.0, should specify a model object rather than a store/query");
var _1185={id:this.id+"_ForestStoreModel",store:this.store,query:this.query,childrenAttrs:this.childrenAttr};
if(this.params.mayHaveChildren){
_1185.mayHaveChildren=lang.hitch(this,"mayHaveChildren");
}
if(this.params.getItemChildren){
_1185.getChildren=lang.hitch(this,function(item,_1186,_1187){
this.getItemChildren((this._v10Compat&&item===this.model.root)?null:item,_1186,_1187);
});
}
this.model=new _116f(_1185);
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
var _1188=this.model.getIdentity(item);
if(this._itemNodesMap[_1188]){
this._itemNodesMap[_1188].push(rn);
}else{
this._itemNodesMap[_1188]=[rn];
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
var _1189=lang.isString(item)?item:this.model.getIdentity(item);
return [].concat(this._itemNodesMap[_1189]);
},_setSelectedItemAttr:function(item){
this.set("selectedItems",[item]);
},_setSelectedItemsAttr:function(items){
var tree=this;
this._loadDeferred.addCallback(lang.hitch(this,function(){
var _118a=array.map(items,function(item){
return (!item||lang.isString(item))?item:tree.model.getIdentity(item);
});
var nodes=[];
array.forEach(_118a,function(id){
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
return new _115f(array.map(paths,function(path){
var d=new _115e();
path=array.map(path,function(item){
return lang.isString(item)?item:tree.model.getIdentity(item);
});
if(path.length){
tree._loadDeferred.addCallback(function(){
_118b(path,[tree.rootNode],d);
});
}else{
d.errback("Empty path");
}
return d;
})).addCallback(_118c);
function _118b(path,nodes,def){
var _118d=path.shift();
var _118e=array.filter(nodes,function(node){
return node.getIdentity()==_118d;
})[0];
if(!!_118e){
if(path.length){
tree._expandNode(_118e).addCallback(function(){
_118b(path,_118e.getChildren(),def);
});
}else{
def.callback(_118e);
}
}else{
def.errback("Could not expand path at "+_118d);
}
};
function _118c(_118f){
tree.set("selectedNodes",array.map(array.filter(_118f,function(x){
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
},getIconClass:function(item,_1190){
return (!item||this.model.mayHaveChildren(item))?(_1190?"dijitFolderOpened":"dijitFolderClosed"):"dijitLeaf";
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
var _1191=_1165.getEnclosingWidget(e.target);
if(!_1191){
return;
}
var key=e.charOrCode;
if(typeof key=="string"&&key!=" "){
if(!e.altKey&&!e.ctrlKey&&!e.shiftKey&&!e.metaKey){
this._onLetterKeyNav({node:_1191,key:key.toLowerCase()});
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
this[this._keyHandlerMap[key]]({node:_1191,item:_1191.item,evt:e});
event.stop(e);
}
}
},_onEnterKey:function(_1192){
this._publish("execute",{item:_1192.item,node:_1192.node});
this.dndController.userSelect(_1192.node,_115b.isCopyKey(_1192.evt),_1192.evt.shiftKey);
this.onClick(_1192.item,_1192.node,_1192.evt);
},_onDownArrow:function(_1193){
var node=this._getNextNode(_1193.node);
if(node&&node.isTreeNode){
this.focusNode(node);
}
},_onUpArrow:function(_1194){
var node=_1194.node;
var _1195=node.getPreviousSibling();
if(_1195){
node=_1195;
while(node.isExpandable&&node.isExpanded&&node.hasChildren()){
var _1196=node.getChildren();
node=_1196[_1196.length-1];
}
}else{
var _1197=node.getParent();
if(!(!this.showRoot&&_1197===this.rootNode)){
node=_1197;
}
}
if(node&&node.isTreeNode){
this.focusNode(node);
}
},_onRightArrow:function(_1198){
var node=_1198.node;
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
},_onLeftArrow:function(_1199){
var node=_1199.node;
if(node.isExpandable&&node.isExpanded){
this._collapseNode(node);
}else{
var _119a=node.getParent();
if(_119a&&_119a.isTreeNode&&!(!this.showRoot&&_119a===this.rootNode)){
this.focusNode(_119a);
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
},multiCharSearchDuration:250,_onLetterKeyNav:function(_119b){
var cs=this._curSearch;
if(cs){
cs.pattern=cs.pattern+_119b.key;
clearTimeout(cs.timer);
}else{
cs=this._curSearch={pattern:_119b.key,startNode:_119b.node};
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
},isExpandoNode:function(node,_119c){
return dom.isDescendant(node,_119c.expandoNode);
},_onClick:function(_119d,e){
var _119e=e.target,_119f=this.isExpandoNode(_119e,_119d);
if((this.openOnClick&&_119d.isExpandable)||_119f){
if(_119d.isExpandable){
this._onExpandoClick({node:_119d});
}
}else{
this._publish("execute",{item:_119d.item,node:_119d,evt:e});
this.onClick(_119d.item,_119d,e);
this.focusNode(_119d);
}
event.stop(e);
},_onDblClick:function(_11a0,e){
var _11a1=e.target,_11a2=(_11a1==_11a0.expandoNode||_11a1==_11a0.expandoNodeText);
if((this.openOnDblClick&&_11a0.isExpandable)||_11a2){
if(_11a0.isExpandable){
this._onExpandoClick({node:_11a0});
}
}else{
this._publish("execute",{item:_11a0.item,node:_11a0,evt:e});
this.onDblClick(_11a0.item,_11a0,e);
this.focusNode(_11a0);
}
event.stop(e);
},_onExpandoClick:function(_11a3){
var node=_11a3.node;
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
var _11a4=node.getNextSibling();
if(_11a4){
return _11a4;
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
},_expandNode:function(node,_11a5){
if(node._expandNodeDeferred&&!_11a5){
return node._expandNodeDeferred;
}
var model=this.model,item=node.item,_11a6=this;
switch(node.state){
case "UNCHECKED":
node.markProcessing();
var def=(node._expandNodeDeferred=new _115e());
model.getChildren(item,function(items){
node.unmarkProcessing();
var scid=node.setChildItems(items);
var ed=_11a6._expandNode(node,true);
scid.addCallback(function(){
ed.addCallback(function(){
def.callback();
});
});
},function(err){
console.error(_11a6,": error loading root children: ",err);
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
var model=this.model,_11a7=model.getIdentity(item),nodes=this._itemNodesMap[_11a7];
if(nodes){
var label=this.getLabel(item),_11a8=this.getTooltip(item);
array.forEach(nodes,function(node){
node.set({item:item,label:label,tooltip:_11a8});
node._updateItemClasses(item);
});
}
},_onItemChildrenChange:function(_11a9,_11aa){
var model=this.model,_11ab=model.getIdentity(_11a9),_11ac=this._itemNodesMap[_11ab];
if(_11ac){
array.forEach(_11ac,function(_11ad){
_11ad.setChildItems(_11aa);
});
}
},_onItemDelete:function(item){
var model=this.model,_11ae=model.getIdentity(item),nodes=this._itemNodesMap[_11ae];
if(nodes){
array.forEach(nodes,function(node){
this.dndController.removeTreeNode(node);
var _11af=node.getParent();
if(_11af){
_11af.removeChild(node);
}
node.destroyRecursive();
},this);
delete this._itemNodesMap[_11ae];
}
},_initState:function(){
this._openedNodes={};
if(this.persist&&this.cookieName){
var oreo=_115c(this.cookieName);
if(oreo){
array.forEach(oreo.split(","),function(item){
this._openedNodes[item]=true;
},this);
}
}
},_state:function(node,_11b0){
if(!this.persist){
return false;
}
var path=array.map(node.getTreePath(),function(item){
return this.model.getIdentity(item);
},this).join("/");
if(arguments.length===1){
return this._openedNodes[path];
}else{
if(_11b0){
this._openedNodes[path]=true;
}else{
delete this._openedNodes[path];
}
var ary=[];
for(var id in this._openedNodes){
ary.push(id);
}
_115c(this.cookieName,ary.join(","),{expires:365});
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
},resize:function(_11b1){
if(_11b1){
_1161.setMarginBox(this.domNode,_11b1);
}
this._nodePixelIndent=_1161.position(this.tree.indentDetector).w;
if(this.tree.rootNode){
this.tree.rootNode.set("indent",this.showRoot?0:-1);
}
},_createTreeNode:function(args){
return new _1171(args);
},_setTextDirAttr:function(_11b2){
if(_11b2&&this.textDir!=_11b2){
this._set("textDir",_11b2);
this.rootNode.set("textDir",_11b2);
}
}});
Tree._TreeNode=_1171;
return Tree;
});
},"dijit/form/_FormValueWidget":function(){
define("dijit/form/_FormValueWidget",["dojo/_base/declare","dojo/_base/sniff","./_FormWidget","./_FormValueMixin"],function(_11b3,has,_11b4,_11b5){
return _11b3("dijit.form._FormValueWidget",[_11b4,_11b5],{_layoutHackIE7:function(){
if(has("ie")==7){
var _11b6=this.domNode;
var _11b7=_11b6.parentNode;
var _11b8=_11b6.firstChild||_11b6;
var _11b9=_11b8.style.filter;
var _11ba=this;
while(_11b7&&_11b7.clientHeight==0){
(function ping(){
var _11bb=_11ba.connect(_11b7,"onscroll",function(){
_11ba.disconnect(_11bb);
_11b8.style.filter=(new Date()).getMilliseconds();
setTimeout(function(){
_11b8.style.filter=_11b9;
},0);
});
})();
_11b7=_11b7.parentNode;
}
}
}});
});
},"curam/util/TabActionsMenu":function(){
define("curam/util/TabActionsMenu",["curam/tab","curam/debug","curam/define","curam/util","curam/util/Refresh","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _11bc=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.TabActionsMenu",{_tabMenuStates:{},getRefreshParams:function(_11bd){
curam.debug.log("curam.util.TabActionsMenu.getRefreshParams(%s)",_11bd);
if(!curam.util.TabActionsMenu.dynamicMenuBarData[_11bd]){
curam.debug.log(_11bc.getProperty("curam.util.TabActionsMenu.no.dynamic"));
return null;
}
var _11be="menuId="+curam.util.TabActionsMenu.dynamicMenuBarData[_11bd].menuBarId;
_11be+="&menuItemIds="+curam.util.toCommaSeparatedList(curam.util.TabActionsMenu.dynamicMenuBarData[_11bd].dynamicMenuItemIds);
_11be+="&menuLoaders="+curam.util.toCommaSeparatedList(curam.util.TabActionsMenu.dynamicMenuBarData[_11bd].dynamicMenuLoaders);
_11be+="&menuPageParameters="+curam.util.TabActionsMenu.dynamicMenuBarData[_11bd].pageParameters;
return _11be;
},updateMenuItemStates:function(_11bf,data){
var _11c0=data.menuData;
var _11c1=function(){
for(var i=0;i<_11c0.itemStates.length;i++){
curam.util.TabActionsMenu.updateMenuItemState(_11c0.itemStates[i],_11bf);
}
};
if(curam.util.TabActionsMenu._isMenuCreated(_11bf)){
_11c1();
}else{
var _11c2=curam.util.getTopmostWindow();
var _11c3=_11c2.dojo.subscribe("/curam/menu/created",this,function(tabId){
curam.debug.log("Received /curam/menu/created "+_11bc.getProperty("curam.util.ExpandableLists.load.for"),tabId);
if(tabId==_11bf){
curam.debug.log(_11bc.getProperty("curam.util.TabActionsMenu.match"));
curam.util.TabActionsMenu._tabMenuStates[tabId]=true;
_11c1();
_11c2.dojo.unsubscribe(_11c3);
}
});
curam.tab.unsubscribeOnTabClose(_11c3,_11bf);
}
},_isMenuCreated:function(tabId){
return curam.util.TabActionsMenu._tabMenuStates[tabId]==true;
},updateMenuItemState:function(_11c4,_11c5){
var _11c6=dijit.byId("menuItem_"+_11c5+"_"+_11c4.id);
if(_11c6!=null){
_11c6.disabled=!_11c4.enabled;
curam.util.swapState(_11c6.domNode,_11c4.enabled,"enabled","disabled");
curam.util.swapState(_11c6.domNode,_11c4.visible,"visible","hidden");
if(_11c6.disabled){
_11c6.domNode.setAttribute("aria-disabled","true");
}
}
},setupHandlers:function(_11c7){
curam.util.Refresh.setMenuBarCallbacks(curam.util.TabActionsMenu.updateMenuItemStates,curam.util.TabActionsMenu.getRefreshParams);
var _11c8=function(){
var _11c9=function(_11ca,_11cb){
return curam.util.Refresh.refreshMenuAndNavigation(_11cb,true,true,true);
};
var _11cc=curam.tab.getHandlerForTab(_11c9,_11c7);
var _11cd=curam.util.getTopmostWindow();
var _11ce=_11cd.dojo.subscribe("curam.tabOpened",null,function(_11cf,_11d0){
_11cc(_11cf,_11d0);
_11cd.dojo.unsubscribe(_11ce);
});
};
curam.util.TabActionsMenu.dynamicMenuBarData[_11c7].registerTabOpenHandler=_11c8;
curam.util.TabActionsMenu.dynamicMenuBarData[_11c7].registerTabOpenHandler();
curam.tab.executeOnTabClose(function(){
curam.util.TabActionsMenu.dynamicMenuBarData[_11c7].registerTabOpenHandler=null;
delete curam.util.TabActionsMenu.dynamicMenuBarData[_11c7];
},_11c7);
},handleOnClick:function(url,_11d1){
if(_11d1){
curam.tab.getTabController().handleDownLoadClick(url);
}else{
curam.tab.getTabController().handleLinkClick(url);
}
},handleOnClickModal:function(url,_11d2){
var _11d3={dialogOptions:_11d2};
curam.tab.getTabController().handleLinkClick(url,_11d3);
}});
return curam.util.TabActionsMenu;
});
},"url:curam/widget/templates/_TabButton.html":"<div role=\"presentation\" data-dojo-attach-point=\"titleNode\" data-dojo-attach-event='onclick:onClick' class='dijitTab'>\r\n    <div role=\"presentation\" class='dijitTabInnerDiv' data-dojo-attach-point='innerDiv'>\r\n        <div role=\"presentation\" class='dijitTabContent' data-dojo-attach-point='tabContent'>\r\n          <div role=\"presentation\" aria-labelledby='${id}_tabLabel'>\r\n            <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" data-dojo-attach-point='iconNode' />\r\n            <span data-dojo-attach-point='containerNode,focusNode' class='tabLabel' id='${id}_tabLabel'></span>\r\n            <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\r\n                data-dojo-attach-event='onclick: onClickCloseButton' role=\"presentation\">\r\n                <span data-dojo-attach-point='closeText' class='dijitTabCloseText'>Close Tab</span\r\n            ></span>\r\n      </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n","*now":function(r){
r(["dojo/i18n!*preload*dojo/nls/cdej*[\"ar\",\"ca\",\"cs\",\"da\",\"de\",\"el\",\"en-gb\",\"en-us\",\"es-es\",\"fi-fi\",\"fr-fr\",\"he-il\",\"hu\",\"it-it\",\"ja-jp\",\"ko-kr\",\"nl-nl\",\"nb\",\"pl\",\"pt-br\",\"pt-pt\",\"ru\",\"sk\",\"sl\",\"sv\",\"th\",\"tr\",\"zh-tw\",\"zh-cn\",\"ROOT\"]"]);
}}});
define("dojo/cdej",[],1);
