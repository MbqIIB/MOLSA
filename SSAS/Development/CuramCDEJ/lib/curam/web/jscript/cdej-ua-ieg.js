//>>built
require({cache:{"dijit/form/TextBox":function(){
require({cache:{"url:dijit/form/templates/TextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"}});
define("dijit/form/TextBox",["dojo/_base/declare","dojo/dom-construct","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/_base/sniff","dojo/_base/window","./_FormValueWidget","./_TextBoxMixin","dojo/text!./templates/TextBox.html",".."],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){
var _c=_1([_8,_9],{templateString:_a,_singleNodeTemplate:"<input class=\"dijit dijitReset dijitLeft dijitInputField\" data-dojo-attach-point=\"textbox,focusNode\" autocomplete=\"off\" type=\"${type}\" ${!nameAttrSetting} />",_buttonInputDisabled:_6("ie")?"disabled":"",baseClass:"dijitTextBox",postMixInProperties:function(){
var _d=this.type.toLowerCase();
if(this.templateString&&this.templateString.toLowerCase()=="input"||((_d=="hidden"||_d=="file")&&this.templateString==this.constructor.prototype.templateString)){
this.templateString=this._singleNodeTemplate;
}
this.inherited(arguments);
},_onInput:function(e){
this.inherited(arguments);
if(this.intermediateChanges){
var _e=this;
setTimeout(function(){
_e._handleOnChange(_e.get("value"),false);
},0);
}
},_setPlaceHolderAttr:function(v){
this._set("placeHolder",v);
if(!this._phspan){
this._attachPoints.push("_phspan");
this._phspan=_2.create("span",{onmousedown:function(e){
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
},_setValueAttr:function(_f,_10,_11){
this.inherited(arguments);
this._updatePlaceHolder();
},getDisplayedValue:function(){
_4.deprecated(this.declaredClass+"::getDisplayedValue() is deprecated. Use set('displayedValue') instead.","","2.0");
return this.get("displayedValue");
},setDisplayedValue:function(_12){
_4.deprecated(this.declaredClass+"::setDisplayedValue() is deprecated. Use set('displayedValue', ...) instead.","","2.0");
this.set("displayedValue",_12);
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
if(_6("ie")){
_c=_1(_c,{declaredClass:"dijit.form.TextBox",_isTextSelected:function(){
var _13=_7.doc.selection.createRange();
var _14=_13.parentElement();
return _14==this.textbox&&_13.text.length==0;
},postCreate:function(){
this.inherited(arguments);
setTimeout(_5.hitch(this,function(){
try{
var s=_3.getComputedStyle(this.domNode);
if(s){
var ff=s.fontFamily;
if(ff){
var _15=this.domNode.getElementsByTagName("INPUT");
if(_15){
for(var i=0;i<_15.length;i++){
_15[i].style.fontFamily=ff;
}
}
}
}
}
catch(e){
}
}),0);
}});
_b._setSelectionRange=_9._setSelectionRange=function(_16,_17,_18){
if(_16.createTextRange){
var r=_16.createTextRange();
r.collapse(true);
r.moveStart("character",-99999);
r.moveStart("character",_17);
r.moveEnd("character",_18-_17);
r.select();
}
};
}else{
if(_6("mozilla")){
_c=_1(_c,{declaredClass:"dijit.form.TextBox",_onBlur:function(e){
this.inherited(arguments);
if(this.selectOnClick){
this.textbox.selectionStart=this.textbox.selectionEnd=undefined;
}
}});
}else{
_c.prototype.declaredClass="dijit.form.TextBox";
}
}
_5.setObject("dijit.form.TextBox",_c);
return _c;
});
},"url:curam/widget/templates/IDXComboBox.html":"<div id=\"widget_${id}\" class=\"dijitReset dijitInline idxComposite\" dojoAttachPoint=\"_popupStateNode\"\r\n  ><div class=\"idxLabel dijitInline dijitHidden\"\r\n    ><span class=\"idxRequiredIcon\">*&nbsp</span\r\n    ><label for=\"${id}\" dojoAttachPoint=\"compLabelNode\"\r\n    ></label\r\n  ></div\r\n  ><div class=\"dijitInline\"\r\n    ><div class=\"dijit dijitInline dijitReset dijitInlineTable dijitLeft\" role=\"listbox\" dojoAttachPoint=\"stateNode,oneuiBaseNode,_aroundNode\"\r\n      ><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer' dojoAttachPoint=\"_buttonNode\" role=\"presentation\"\r\n      ><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n      ${_buttonInputDisabled}\r\n      /></div\r\n      ><div class=\"dijitReset dijitInputField dijitInputContainer\" role=\"listbox\" dojoAttachPoint=\"inputContainer\" dojoAttachEvent=\"onmouseenter: _onInputContainerEnter, onmouseleave: _onInputContainerLeave\"\r\n        ><input class='dijitReset dijitInputInner' ${!nameAttrSetting}  type=\"text\" autocomplete=\"off\" dojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\" \r\n      /></div\r\n    ></div\r\n    ><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"\r\n    ></div\r\n    ><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\r\n      ><div class=\"dijitValidationIcon\"\r\n      ><input class=\"dijitReset dijitInputField  dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n    ></div></div\r\n    ><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\r\n  ></div\r\n></div>","url:idx/oneui/templates/HoverHelpTooltip.html":"<div class=\"idxOneuiHoverHelpTooltip idxOneuiHoverHelpTooltipLeft\" role=\"dialog\"\r\n\t><div role=\"document\"\r\n\t\t><span data-dojo-attach-point=\"closeButtonNode\" class=\"idxOneuiHoverHelpTooltipCloseIcon\" data-dojo-attach-event=\"ondijitclick: hideOnClickClose\" role=\"button\" tabIndex=\"0\"></span\r\n\t></div\r\n\t><div data-dojo-attach-point=\"outerContainerNode\" class=\"idxOneuiHoverHelpTooltipContainer idxOneuiHoverHelpTooltipContents\"\r\n\t\t><div data-dojo-attach-point=\"containerNode\" role=\"document\" tabindex=0></div\r\n\t\t><a target=\"_blank\" href=\"#updateme\" class=\"idxOneuiHoverHelpTooltipLearnLink\" data-dojo-attach-point=\"learnMoreNode\"><span>${learnMoreLabel}</span></a\r\n\t></div\r\n\t><div class=\"idxOneuiHoverHelpTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\r\n></div>","dijit/_base/scroll":function(){
define("dijit/_base/scroll",["dojo/window",".."],function(_19,_1a){
_1a.scrollIntoView=function(_1b,pos){
_19.scrollIntoView(_1b,pos);
};
});
},"dijit/_TemplatedMixin":function(){
define("dijit/_TemplatedMixin",["dojo/_base/lang","dojo/touch","./_WidgetBase","dojo/string","dojo/cache","dojo/_base/array","dojo/_base/declare","dojo/dom-construct","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(_1c,_1d,_1e,_1f,_20,_21,_22,_23,has,_24,win){
var _25=_22("dijit._TemplatedMixin",null,{templateString:null,templatePath:null,_skipNodeCache:false,_earlyTemplatedStartup:false,constructor:function(){
this._attachPoints=[];
this._attachEvents=[];
},_stringRepl:function(_26){
var _27=this.declaredClass,_28=this;
return _1f.substitute(_26,this,function(_29,key){
if(key.charAt(0)=="!"){
_29=_1c.getObject(key.substr(1),false,_28);
}
if(typeof _29=="undefined"){
throw new Error(_27+" template:"+key);
}
if(_29==null){
return "";
}
return key.charAt(0)=="!"?_29:_29.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
if(!this.templateString){
this.templateString=_20(this.templatePath,{sanitize:true});
}
var _2a=_25.getCachedTemplate(this.templateString,this._skipNodeCache);
var _2b;
if(_1c.isString(_2a)){
_2b=_23.toDom(this._stringRepl(_2a));
if(_2b.nodeType!=1){
throw new Error("Invalid template: "+_2a);
}
}else{
_2b=_2a.cloneNode(true);
}
this.domNode=_2b;
this.inherited(arguments);
this._attachTemplateNodes(_2b,function(n,p){
return n.getAttribute(p);
});
this._beforeFillContent();
this._fillContent(this.srcNodeRef);
},_beforeFillContent:function(){
},_fillContent:function(_2c){
var _2d=this.containerNode;
if(_2c&&_2d){
while(_2c.hasChildNodes()){
_2d.appendChild(_2c.firstChild);
}
}
},_attachTemplateNodes:function(_2e,_2f){
var _30=_1c.isArray(_2e)?_2e:(_2e.all||_2e.getElementsByTagName("*"));
var x=_1c.isArray(_2e)?0:-1;
for(;x<_30.length;x++){
var _31=(x==-1)?_2e:_30[x];
if(this.widgetsInTemplate&&(_2f(_31,"dojoType")||_2f(_31,"data-dojo-type"))){
continue;
}
var _32=_2f(_31,"dojoAttachPoint")||_2f(_31,"data-dojo-attach-point");
if(_32){
var _33,_34=_32.split(/\s*,\s*/);
while((_33=_34.shift())){
if(_1c.isArray(this[_33])){
this[_33].push(_31);
}else{
this[_33]=_31;
}
this._attachPoints.push(_33);
}
}
var _35=_2f(_31,"dojoAttachEvent")||_2f(_31,"data-dojo-attach-event");
if(_35){
var _36,_37=_35.split(/\s*,\s*/);
var _38=_1c.trim;
while((_36=_37.shift())){
if(_36){
var _39=null;
if(_36.indexOf(":")!=-1){
var _3a=_36.split(":");
_36=_38(_3a[0]);
_39=_38(_3a[1]);
}else{
_36=_38(_36);
}
if(!_39){
_39=_36;
}
this._attachEvents.push(this.connect(_31,_1d[_36]||_36,_39));
}
}
}
}
},destroyRendering:function(){
_21.forEach(this._attachPoints,function(_3b){
delete this[_3b];
},this);
this._attachPoints=[];
_21.forEach(this._attachEvents,this.disconnect,this);
this._attachEvents=[];
this.inherited(arguments);
}});
_25._templateCache={};
_25.getCachedTemplate=function(_3c,_3d){
var _3e=_25._templateCache;
var key=_3c;
var _3f=_3e[key];
if(_3f){
try{
if(!_3f.ownerDocument||_3f.ownerDocument==win.doc){
return _3f;
}
}
catch(e){
}
_23.destroy(_3f);
}
_3c=_1f.trim(_3c);
if(_3d||_3c.match(/\$\{([^\}]+)\}/g)){
return (_3e[key]=_3c);
}else{
var _40=_23.toDom(_3c);
if(_40.nodeType!=1){
throw new Error("Invalid template: "+_3c);
}
return (_3e[key]=_40);
}
};
if(has("ie")){
_24.addOnWindowUnload(function(){
var _41=_25._templateCache;
for(var key in _41){
var _42=_41[key];
if(typeof _42=="object"){
_23.destroy(_42);
}
delete _41[key];
}
});
}
_1c.extend(_1e,{dojoAttachEvent:"",dojoAttachPoint:""});
return _25;
});
},"curam/util/UimDialog":function(){
define("curam/util/UimDialog",["curam/util/RuntimeContext","curam/util/external","curam/util","curam/define","curam/dialog","curam/util/DialogObject"],function(_43,_44){
curam.define.singleton("curam.util.UimDialog",{open:function(_45,_46,_47){
var url=_45+curam.util.makeQueryString(_46);
return this.openUrl(url,_47);
},openUrl:function(url,_48){
var _49=curam.util.getCacheBusterParameter();
var _4a=new curam.util.DialogObject(_49);
var _4b=null;
if(_48){
_4b="width="+_48.width+",height="+_48.height;
}
curam.util.openModalDialog({href:this._addRpu(url)},_4b,null,null,_49);
return _4a;
},_addRpu:function(url){
var _4c=url;
if(curam.tab.inTabbedUI()){
var _4d=curam.tab.getContentPanelIframe();
if(_4d){
_4c=curam.util.setRpu(url,new _43(_4d.contentWindow));
}
}else{
if(_44.inExternalApp()){
var _4e=_44.getUimParentWindow();
if(_4e){
_4c=curam.util.setRpu(url,new _43(_4e));
}
}
}
return _4c;
},get:function(){
if(curam.dialog._id==null){
throw "Dialog infrastructure not ready.";
}
return new curam.util.DialogObject(null,curam.dialog._id);
},ready:function(_4f){
if(curam.dialog._id==null){
dojo.subscribe("/curam/dialog/ready",_4f);
}else{
_4f();
}
},_getDialogFrameWindow:function(_50){
var _51=window.top.dijit.byId(_50);
return _51.uimController.getIFrame().contentWindow;
}});
return curam.util.UimDialog;
});
},"curam/util/DialogObject":function(){
define("curam/util/DialogObject",["curam/dialog","curam/util"],function(){
var _52=dojo.declare("curam.util.DialogObject",null,{_id:null,constructor:function(_53,id){
if(!id){
var _54=window.top.dojo.subscribe("/curam/dialog/uim/opened/"+_53,this,function(_55){
this._id=_55;
window.top.dojo.unsubscribe(_54);
});
}else{
this._id=id;
}
},registerBeforeCloseHandler:function(_56){
var _57=window.top.dojo.subscribe("/curam/dialog/BeforeClose",this,function(_58){
if(_58==this._id){
_56();
}
window.top.dojo.unsubscribe(_57);
});
},registerOnDisplayHandler:function(_59){
if(curam.dialog._displayed==true){
_59(curam.dialog._size);
}else{
var ut=window.top.dojo.subscribe("/curam/dialog/displayed",this,function(_5a,_5b){
if(_5a==this._id){
_59(_5b);
}
window.top.dojo.unsubscribe(ut);
});
}
},close:function(_5c,_5d,_5e){
var win=curam.util.UimDialog._getDialogFrameWindow(this._id);
var _5f=win.curam.dialog.getParentWindow(win);
if(_5c&&!_5d){
win.curam.dialog.forceParentRefresh();
curam.dialog.doRedirect(_5f,null);
}else{
if(_5d){
var _60=_5d;
if(_5d.indexOf("Page.do")==-1){
_60=_5d+"Page.do"+curam.util.makeQueryString(_5e);
}
curam.dialog.doRedirect(_5f,_60);
}
}
curam.dialog.closeModalDialog();
}});
return _52;
});
},"dijit/_CssStateMixin":function(){
define("dijit/_CssStateMixin",["dojo/touch","dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/_base/lang","dojo/_base/window"],function(_61,_62,_63,_64,_65,win){
return _63("dijit._CssStateMixin",[],{cssStateNodes:{},hovering:false,active:false,_applyAttributes:function(){
this.inherited(arguments);
_62.forEach(["onmouseenter","onmouseleave",_61.press],function(e){
this.connect(this.domNode,e,"_cssMouseEvent");
},this);
_62.forEach(["disabled","readOnly","checked","selected","focused","state","hovering","active"],function(_66){
this.watch(_66,_65.hitch(this,"_setStateClass"));
},this);
for(var ap in this.cssStateNodes){
this._trackMouseState(this[ap],this.cssStateNodes[ap]);
}
this._setStateClass();
},_cssMouseEvent:function(_67){
if(!this.disabled){
switch(_67.type){
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
var _68=this.connect(win.body(),_61.release,function(){
this._mouseDown=false;
this._set("active",false);
this.disconnect(_68);
});
break;
}
}
},_setStateClass:function(){
var _69=this.baseClass.split(" ");
function _6a(_6b){
_69=_69.concat(_62.map(_69,function(c){
return c+_6b;
}),"dijit"+_6b);
};
if(!this.isLeftToRight()){
_6a("Rtl");
}
var _6c=this.checked=="mixed"?"Mixed":(this.checked?"Checked":"");
if(this.checked){
_6a(_6c);
}
if(this.state){
_6a(this.state);
}
if(this.selected){
_6a("Selected");
}
if(this.disabled){
_6a("Disabled");
}else{
if(this.readOnly){
_6a("ReadOnly");
}else{
if(this.active){
_6a("Active");
}else{
if(this.hovering){
_6a("Hover");
}
}
}
}
if(this.focused){
_6a("Focused");
}
var tn=this.stateNode||this.domNode,_6d={};
_62.forEach(tn.className.split(" "),function(c){
_6d[c]=true;
});
if("_stateClasses" in this){
_62.forEach(this._stateClasses,function(c){
delete _6d[c];
});
}
_62.forEach(_69,function(c){
_6d[c]=true;
});
var _6e=[];
for(var c in _6d){
_6e.push(c);
}
var cls=_6e.join(" ");
if(cls!=tn.className){
tn.className=cls;
}
this._stateClasses=_69;
},_trackMouseState:function(_6f,_70){
var _71=false,_72=false,_73=false;
var _74=this,cn=_65.hitch(this,"connect",_6f);
function _75(){
var _76=("disabled" in _74&&_74.disabled)||("readonly" in _74&&_74.readonly);
_64.toggle(_6f,_70+"Hover",_71&&!_72&&!_76);
_64.toggle(_6f,_70+"Active",_72&&!_76);
_64.toggle(_6f,_70+"Focused",_73&&!_76);
};
cn("onmouseenter",function(){
_71=true;
_75();
});
cn("onmouseleave",function(){
_71=false;
_72=false;
_75();
});
cn(_61.press,function(){
_72=true;
_75();
});
cn(_61.release,function(){
_72=false;
_75();
});
cn("onfocus",function(){
_73=true;
_75();
});
cn("onblur",function(){
_73=false;
_75();
});
this.watch("disabled",_75);
this.watch("readOnly",_75);
}});
});
},"dijit/layout/ScrollingTabController":function(){
require({cache:{"url:dijit/layout/templates/ScrollingTabController.html":"<div class=\"dijitTabListContainer-${tabPosition} tabStrip-disabled dijitLayoutContainer\"><!-- CURAM-FIX: removed style=\"visibility:hidden, dd the tabStrip-disabled class by default.\" -->\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerMenuButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_menuBtn\"\r\n\t\t\tdata-dojo-props=\"containerId: '${containerId}', iconClass: 'dijitTabStripMenuIcon',\r\n\t\t\t\t\tdropDownPosition: ['below-alt', 'above-alt']\"\r\n\t\t\tdata-dojo-attach-point=\"_menuBtn\" showLabel=\"false\" title=\"\">&#9660;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_leftBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideLeftIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_leftBtn\" data-dojo-attach-event=\"onClick: doSlideLeft\">&#9664;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_rightBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideRightIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_rightBtn\" data-dojo-attach-event=\"onClick: doSlideRight\">&#9654;</div>\r\n\t<div class='dijitTabListWrapper dijitTabContainerTopNone dijitAlignClient' data-dojo-attach-point='tablistWrapper'>\r\n\t\t<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'\r\n\t\t\t\tdata-dojo-attach-point='containerNode' class='nowrapTabStrip dijitTabContainerTop-tabs'></div>\r\n\t</div>\r\n</div>\r\n","url:dijit/layout/templates/_ScrollingTabControllerButton.html":"<div data-dojo-attach-event=\"onclick:_onClick\">\n\t<div role=\"presentation\" class=\"dijitTabInnerDiv\" data-dojo-attach-point=\"innerDiv,focusNode\">\n\t\t<div role=\"presentation\" class=\"dijitTabContent dijitButtonContents\" data-dojo-attach-point=\"tabContent\">\n\t\t\t<img role=\"presentation\" alt=\"\" src=\"${_blankGif}\" class=\"dijitTabStripIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t\t<span data-dojo-attach-point=\"containerNode,titleNode\" class=\"dijitButtonText\"></span>\n\t\t</div>\n\t</div>\n</div>"}});
define("dijit/layout/ScrollingTabController",["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/fx","dojo/_base/lang","dojo/query","dojo/_base/sniff","../registry","dojo/text!./templates/ScrollingTabController.html","dojo/text!./templates/_ScrollingTabControllerButton.html","./TabController","./utils","../_WidgetsInTemplateMixin","../Menu","../MenuItem","../form/Button","../_HasDropDown","dojo/NodeList-dom"],function(_77,_78,_79,_7a,_7b,fx,_7c,_7d,has,_7e,_7f,_80,_81,_82,_83,_84,_85,_86,_87){
var _88=_78("dijit.layout.ScrollingTabController",[_81,_83],{baseClass:"dijitTabController dijitScrollingTabController",templateString:_7f,useMenu:true,useSlider:true,tabStripClass:"",widgetsInTemplate:true,_minScroll:5,_setClassAttr:{node:"containerNode",type:"class"},_tabsWidth:-1,_tablistMenuItemIdSuffix:"_stcMi",buildRendering:function(){
this.inherited(arguments);
var n=this.domNode;
this.scrollNode=this.tablistWrapper;
this._initButtons();
if(!this.tabStripClass){
this.tabStripClass="dijitTabContainer"+this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"")+"None";
_79.add(n,"tabStrip-disabled");
}
_79.add(this.tablistWrapper,this.tabStripClass);
},onStartup:function(){
this.inherited(arguments);
this._postStartup=true;
},onAddChild:function(_89,_8a){
this.inherited(arguments);
var _8b=_89.id;
this.bustSizeCache=true;
this._tabsWidth=-1;
_77.forEach(["label","iconClass"],function(_8c){
this.pane2watches[_89.id].push(this.pane2button[_89.id].watch(_8c,_7c.hitch(this,function(){
if(this._postStartup&&this._dim){
this.resize(this._dim);
}
if(this._dim){
this.bustSizeCache=true;
this._tabsWidth=-1;
this.pane2button[_8b].domNode._width=0;
}
})));
},this);
var _8d=function(pid,_8e){
var _8f=null;
if(_8e._menuBtn.dropDown){
var _90=dojo.query(pid+_8e._tablistMenuItemIdSuffix,_8e._menuBtn.dropDown.domNode)[0];
if(_90){
_8f=dijit.byNode(_90);
}
}
return _8f;
};
this.pane2button[_8b].connect(this.pane2button[_8b],"_setCuramVisibleAttr",_7c.hitch(this,function(){
var _91=_8d(_8b,this);
if(_91){
this._setCuramVisibility(_91,_8b);
}
}));
this.pane2button[_8b].connect(this.pane2button[_8b],"_setCuramDisabledAttr",_7c.hitch(this,function(){
var _92=_8d(_8b,this);
if(_92){
this._setCuramAvailability(_92,_8b);
}
}));
_7b.set(this.containerNode,"width",(_7b.get(this.containerNode,"width")+200)+"px");
},_setCuramVisibility:function(_93,_94){
var _95=this.pane2button[_94].curamVisible;
if(_95){
dojo.replaceClass(_93.domNode,"visible","hidden");
}else{
dojo.replaceClass(_93.domNode,"hidden","visible");
}
},_setCuramAvailability:function(_96,_97){
var _98=!this.pane2button[_97].curamDisabled;
_96.disabled=!_98;
if(_98){
dojo.replaceClass(_96.domNode,"enabled","disabled");
}else{
dojo.replaceClass(_96.domNode,"disabled","enabled");
}
},_getNodeWidth:function(_99){
if(!_99._width){
_99._width=dojo.style(_99,"width");
}
return _99._width;
},destroyRendering:function(_9a){
_77.forEach(this._attachPoints,function(_9b){
delete this[_9b];
},this);
this._attachPoints=[];
_77.forEach(this._attachEvents,this.disconnect,this);
this.attachEvents=[];
},destroy:function(){
if(this._menuBtn){
this._menuBtn._curamOwnerController=null;
}
this.inherited(arguments);
},onRemoveChild:function(_9c,_9d){
var _9e=this.pane2button[_9c.id];
if(this._selectedTab===_9e.domNode){
this._selectedTab=null;
}
this.inherited(arguments);
this.bustSizeCache=true;
this._tabsWidth=-1;
},_initButtons:function(){
this.subscribe("tab.title.name.finished",this._measureBtns);
this._btnWidth=0;
this._buttons=_7d("> .tabStripButton",this.domNode).filter(function(btn){
if((this.useMenu&&btn==this._menuBtn.domNode)||(this.useSlider&&(btn==this._rightBtn.domNode||btn==this._leftBtn.domNode))){
this._btnWidth+=_7a.getMarginBoxSimple(btn).w;
return true;
}else{
_7b.set(btn,"display","none");
return false;
}
},this);
this._menuBtn._curamOwnerController=this;
},_getTabsWidth:function(){
if(this._tabsWidth>-1){
return this._tabsWidth;
}
var _9f=this.getChildren();
if(_9f.length){
var _a0=_9f[this.isLeftToRight()?_9f.length-1:0].domNode;
var _a1=this._getNodeWidth(_a0);
this._tabsWidth=_a0.offsetLeft+_a1;
return this._tabsWidth;
}else{
return 0;
}
},_enableBtn:function(_a2){
var _a3=this._getTabsWidth();
_a2=_a2||_7b.get(this.scrollNode,"width");
return _a3>0&&_a2<_a3;
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
var cb=this._contentBox=_82.marginBox2contentBox(this.domNode,{h:0,w:dim.w});
cb.h=this.scrollNodeHeight;
_7a.setContentSize(this.domNode,cb);
var _a4=this._enableBtn(this._contentBox.w);
this._buttons.style("display",_a4?"":"none");
this._leftBtn.layoutAlign="left";
this._rightBtn.layoutAlign="right";
this._menuBtn.layoutAlign=this.isLeftToRight()?"right":"left";
var _a5;
if(_a4){
_a5=dijit.layout.layoutChildren(this.domNode,this._contentBox,[this._menuBtn,this._leftBtn,this._rightBtn,{domNode:this.scrollNode,layoutAlign:"client",fakeWidget:true}]);
}else{
_a5=dijit.layout.layoutChildren(this.domNode,this._contentBox,[{domNode:this.scrollNode,layoutAlign:"client",fakeWidget:true}]);
}
this.scrollNode._width=_a5.client.w;
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
return (this.isLeftToRight()||has("ie")<8||(has("ie")&&has("quirks"))||has("webkit"))?this.scrollNode.scrollLeft:_7b.get(this.containerNode,"width")-_7b.get(this.scrollNode,"width")+(has("ie")==8?-1:1)*this.scrollNode.scrollLeft;
},_convertToScrollLeft:function(val){
if(this.isLeftToRight()||has("ie")<8||(has("ie")&&has("quirks"))||has("webkit")){
return val;
}else{
var _a6=_7b.get(this.containerNode,"width")-_7b.get(this.scrollNode,"width");
return (has("ie")==8?-1:1)*(val-_a6);
}
},onSelectChild:function(_a7){
var tab=this.pane2button[_a7.id];
if(!tab||!_a7){
return;
}
var _a8=tab.domNode;
if(_a8!=this._selectedTab){
this._selectedTab=_a8;
if(this._postResize){
var _a9=this._getNodeWidth(this.scrollNode);
if(this._getTabsWidth()<_a9){
tab.onClick(null);
}else{
var sl=this._getScroll();
if(sl>_a8.offsetLeft||sl+_a9<_a8.offsetLeft+this._getNodeWidth(_a8)){
this.createSmoothScroll().play();
}
}
}
}
this.inherited(arguments);
},_getScrollBounds:function(){
var _aa=this.getChildren(),_ab=this._getNodeWidth(this.scrollNode),_ac=this._getNodeWidth(this.containerNode),_ad=_ac-_ab,_ae=this._getTabsWidth();
if(_aa.length&&_ae>_ab){
return {min:this.isLeftToRight()?0:this._getNodeWidth(_aa[_aa.length-1].domNode),max:this.isLeftToRight()?_ae-_ab:_ad};
}else{
var _af=this.isLeftToRight()?0:_ad;
return {min:_af,max:_af};
}
},_getScrollForSelectedTab:function(){
var w=this.scrollNode,n=this._selectedTab,_b0=_7b.get(this.scrollNode,"width"),_b1=this._getScrollBounds();
var pos=(n.offsetLeft+_7b.get(n,"width")/2)-_b0/2;
pos=Math.min(Math.max(pos,_b1.min),_b1.max);
return pos;
},createSmoothScroll:function(x){
if(arguments.length>0){
var _b2=this._getScrollBounds();
x=Math.min(Math.max(x,_b2.min),_b2.max);
}else{
x=this._getScrollForSelectedTab();
}
if(this._anim&&this._anim.status()=="playing"){
this._anim.stop();
}
var _b3=this,w=this.scrollNode,_b4=new fx.Animation({beforeBegin:function(){
if(this.curve){
delete this.curve;
}
var _b5=w.scrollLeft,_b6=_b3._convertToScrollLeft(x);
_b4.curve=new fx._Line(_b5,_b6);
},onAnimate:function(val){
w.scrollLeft=val;
}});
this._anim=_b4;
this._setButtonClass(x);
return _b4;
},_getBtnNode:function(e){
var n=e.target;
while(n&&!_79.contains(n,"tabStripButton")){
n=n.parentNode;
}
return n;
},doSlideRight:function(e){
this.doSlide(1,this._getBtnNode(e));
},doSlideLeft:function(e){
this.doSlide(-1,this._getBtnNode(e));
},doSlide:function(_b7,_b8){
if(_b8&&_79.contains(_b8,"dijitTabDisabled")){
return;
}
var _b9=_7b.get(this.scrollNode,"width");
var d=(_b9*0.75)*_b7;
var to=this._getScroll()+d;
this._setButtonClass(to);
this.createSmoothScroll(to).play();
},_setButtonClass:function(_ba){
var _bb=this._getScrollBounds();
this._leftBtn.set("disabled",_ba<=_bb.min);
this._rightBtn.set("disabled",_ba>=_bb.max);
}});
var _bc=_78("dijit.layout._ScrollingTabControllerButtonMixin",null,{baseClass:"dijitTab tabStripButton",templateString:_80,tabIndex:"",isFocusable:function(){
return false;
}});
_78("dijit.layout._ScrollingTabControllerButton",[_86,_bc]);
_78("dijit.layout._ScrollingTabControllerMenuButton",[_86,_87,_bc],{containerId:"",tabIndex:"-1",isLoaded:function(){
return false;
},loadDropDown:function(_bd){
this.dropDown=new _84({id:this.containerId+"_menu",dir:this.dir,lang:this.lang,textDir:this.textDir});
var _be=_7e.byId(this.containerId);
_77.forEach(_be.getChildren(),function(_bf){
var _c0=new _85({id:_bf.id+"_stcMi",label:_bf.title,iconClass:_bf.iconClass,dir:_bf.dir,lang:_bf.lang,textDir:_bf.textDir,onClick:function(){
_be.selectChild(_bf);
}});
this.dropDown.addChild(_c0);
},this);
dojo.forEach(this.dropDown.getChildren(),_7c.hitch(this,function(_c1){
var _c2=_c1.id.split(this._curamOwnerController._tablistMenuItemIdSuffix)[0];
this._curamOwnerController._setCuramAvailability(_c1,_c2);
this._curamOwnerController._setCuramVisibility(_c1,_c2);
dojo.connect(_c1,"destroy",function(){
setDynState=null;
});
}));
_bd();
},closeDropDown:function(_c3){
this.inherited(arguments);
if(this.dropDown){
this.dropDown.destroyRecursive();
delete this.dropDown;
}
}});
return _88;
});
},"dijit/place":function(){
define("dijit/place",["dojo/_base/array","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/window","dojo/window",".","dojo/_base/lang"],function(_c4,_c5,_c6,_c7,win,_c8,_c9,_ca){
function _cb(_cc,_cd,_ce,_cf){
var _d0=_c8.getBox();
if(!_cc.parentNode||String(_cc.parentNode.tagName).toLowerCase()!="body"){
win.body().appendChild(_cc);
}
var _d1=null;
_c4.some(_cd,function(_d2){
var _d3=_d2.corner;
var pos=_d2.pos;
var _d4=0;
var _d5={w:{"L":_d0.l+_d0.w-pos.x,"R":pos.x-_d0.l,"M":_d0.w}[_d3.charAt(1)],h:{"T":_d0.t+_d0.h-pos.y,"B":pos.y-_d0.t,"M":_d0.h}[_d3.charAt(0)]};
if(_ce){
var res=_ce(_cc,_d2.aroundCorner,_d3,_d5,_cf);
_d4=typeof res=="undefined"?0:res;
}
var _d6=_cc.style;
var _d7=_d6.display;
var _d8=_d6.visibility;
if(_d6.display=="none"){
_d6.visibility="hidden";
_d6.display="";
}
var mb=_c5.getMarginBox(_cc);
_d6.display=_d7;
_d6.visibility=_d8;
var _d9={"L":pos.x,"R":pos.x-mb.w,"M":Math.max(_d0.l,Math.min(_d0.l+_d0.w,pos.x+(mb.w>>1))-mb.w)}[_d3.charAt(1)],_da={"T":pos.y,"B":pos.y-mb.h,"M":Math.max(_d0.t,Math.min(_d0.t+_d0.h,pos.y+(mb.h>>1))-mb.h)}[_d3.charAt(0)],_db=Math.max(_d0.l,_d9),_dc=Math.max(_d0.t,_da),_dd=Math.min(_d0.l+_d0.w,_d9+mb.w),_de=Math.min(_d0.t+_d0.h,_da+mb.h),_df=_dd-_db,_e0=_de-_dc;
_d4+=(mb.w-_df)+(mb.h-_e0);
if(_ca.exists("curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm")&&curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm==true){
if((_d3.charAt(0)=="T"||_d3.charAt(1)=="L")&&_d4>0){
_d4=mb.w+mb.h;
}
}
if(_d1==null||_d4<_d1.overflow){
_d1={corner:_d3,aroundCorner:_d2.aroundCorner,x:_db,y:_dc,w:_df,h:_e0,overflow:_d4,spaceAvailable:_d5};
}
return !_d4;
});
if(_d1.overflow&&_ce){
_ce(_cc,_d1.aroundCorner,_d1.corner,_d1.spaceAvailable,_cf);
}
var l=_c5.isBodyLtr(),s=_cc.style;
s.top=_d1.y+"px";
s[l?"left":"right"]=(l?_d1.x:_d0.w-_d1.x-_d1.w)+"px";
s[l?"right":"left"]="auto";
return _d1;
};
return (_c9.place={at:function(_e1,pos,_e2,_e3){
var _e4=_c4.map(_e2,function(_e5){
var c={corner:_e5,pos:{x:pos.x,y:pos.y}};
if(_e3){
c.pos.x+=_e5.charAt(1)=="L"?_e3.x:-_e3.x;
c.pos.y+=_e5.charAt(0)=="T"?_e3.y:-_e3.y;
}
return c;
});
return _cb(_e1,_e4);
},around:function(_e6,_e7,_e8,_e9,_ea){
var _eb=(typeof _e7=="string"||"offsetWidth" in _e7)?_c5.position(_e7,true):_e7;
if(_e7.parentNode){
var _ec=_c6.getComputedStyle(_e7).position=="absolute";
var _ed=_e7.parentNode;
while(_ed&&_ed.nodeType==1&&_ed.nodeName!="BODY"){
var _ee=_c5.position(_ed,true),pcs=_c6.getComputedStyle(_ed);
if(/relative|absolute/.test(pcs.position)){
_ec=false;
}
if(!_ec&&/hidden|auto|scroll/.test(pcs.overflow)){
var _ef=Math.min(_eb.y+_eb.h,_ee.y+_ee.h);
var _f0=Math.min(_eb.x+_eb.w,_ee.x+_ee.w);
_eb.x=Math.max(_eb.x,_ee.x);
_eb.y=Math.max(_eb.y,_ee.y);
_eb.h=_ef-_eb.y;
_eb.w=_f0-_eb.x;
}
if(pcs.position=="absolute"){
_ec=true;
}
_ed=_ed.parentNode;
}
}
var x=_eb.x,y=_eb.y,_f1="w" in _eb?_eb.w:(_eb.w=_eb.width),_f2="h" in _eb?_eb.h:(_c7.deprecated("place.around: dijit.place.__Rectangle: { x:"+x+", y:"+y+", height:"+_eb.height+", width:"+_f1+" } has been deprecated.  Please use { x:"+x+", y:"+y+", h:"+_eb.height+", w:"+_f1+" }","","2.0"),_eb.h=_eb.height);
var _f3=[];
function _f4(_f5,_f6){
_f3.push({aroundCorner:_f5,corner:_f6,pos:{x:{"L":x,"R":x+_f1,"M":x+(_f1>>1)}[_f5.charAt(1)],y:{"T":y,"B":y+_f2,"M":y+(_f2>>1)}[_f5.charAt(0)]}});
};
_c4.forEach(_e8,function(pos){
var ltr=_e9;
switch(pos){
case "above-centered":
_f4("TM","BM");
break;
case "below-centered":
_f4("BM","TM");
break;
case "after-centered":
ltr=!ltr;
case "before-centered":
_f4(ltr?"ML":"MR",ltr?"MR":"ML");
break;
case "after":
ltr=!ltr;
case "before":
_f4(ltr?"TL":"TR",ltr?"TR":"TL");
_f4(ltr?"BL":"BR",ltr?"BR":"BL");
break;
case "below-alt":
ltr=!ltr;
case "below":
_f4(ltr?"BL":"BR",ltr?"TL":"TR");
_f4(ltr?"BR":"BL",ltr?"TR":"TL");
break;
case "above-alt":
ltr=!ltr;
case "above":
_f4(ltr?"TL":"TR",ltr?"BL":"BR");
_f4(ltr?"TR":"TL",ltr?"BR":"BL");
break;
default:
_f4(pos.aroundCorner,pos.corner);
}
});
var _f7=_cb(_e6,_f3,_ea,{w:_f1,h:_f2});
_f7.aroundNodePos=_eb;
return _f7;
}});
});
},"dijit/_HasDropDown":function(){
define("dijit/_HasDropDown",["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/keys","dojo/_base/lang","dojo/touch","dojo/_base/window","dojo/window","./registry","./focus","./popup","./_FocusMixin"],function(_f8,_f9,_fa,dom,_fb,_fc,_fd,_fe,has,_ff,lang,_100,win,_101,_102,_103,_104,_105){
return _f8("dijit._HasDropDown",_105,{_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:true,forceWidth:false,maxHeight:0,dropDownPosition:["below","above"],_stopClickEvents:true,_onDropDownMouseDown:function(e){
if(this.disabled||this.readOnly){
return;
}
e.preventDefault();
this._docHandler=this.connect(win.doc,_100.release,"_onDropDownMouseUp");
this.toggleDropDown();
},_onDropDownMouseUp:function(e){
if(e&&this._docHandler){
this.disconnect(this._docHandler);
}
var _106=this.dropDown,_107=false;
if(e&&this._opened){
var c=_fd.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_107){
if(_fc.contains(t,"dijitPopup")){
_107=true;
}else{
t=t.parentNode;
}
}
if(_107){
t=e.target;
if(_106.onItemClick){
var _108;
while(t&&!(_108=_102.byNode(t))){
t=t.parentNode;
}
if(_108&&_108.onClick&&_108.getParent){
_108.getParent().onItemClick(_108,e);
}
}
return;
}
}
}
if(this._opened){
if(_106.focus&&_106.autoFocus!==false){
window.setTimeout(lang.hitch(_106,"focus"),1);
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
_fa.stop(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _109={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
_fc.add(this._arrowWrapperNode||this._buttonNode,"dijit"+_109+"ArrowButton");
},postCreate:function(){
this.inherited(arguments);
this.connect(this._buttonNode,_100.press,"_onDropDownMouseDown");
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
var d=this.dropDown,_10a=e.target;
if(d&&this._opened&&d.handleKey){
if(d.handleKey(e)===false){
_fa.stop(e);
return;
}
}
if(d&&this._opened&&e.charOrCode==_ff.ESCAPE){
this.closeDropDown();
_fa.stop(e);
}else{
if(!this._opened&&(e.charOrCode==_ff.DOWN_ARROW||((e.charOrCode==_ff.ENTER||e.charOrCode==" ")&&((_10a.tagName||"").toLowerCase()!=="input"||(_10a.type&&_10a.type.toLowerCase()!=="text"))))){
this._toggleOnKeyUp=true;
_fa.stop(e);
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
var _10b=_103.curNode&&this.dropDown&&dom.isDescendant(_103.curNode,this.dropDown.domNode);
this.closeDropDown(_10b);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_10c){
_10c();
},loadAndOpenDropDown:function(){
var d=new _f9(),_10d=lang.hitch(this,function(){
this.openDropDown();
d.resolve(this.dropDown);
});
if(!this.isLoaded()){
this.loadDropDown(_10d);
}else{
_10d();
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
var _10e=this.dropDown,_10f=_10e.domNode,_110=this._aroundNode||this.domNode,self=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_10f.style.width){
this._explicitDDWidth=true;
}
if(_10f.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _111={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_111.width="";
}
if(!this._explicitDDHeight){
_111.height="";
}
_fe.set(_10f,_111);
var _112=this.maxHeight;
if(_112==-1){
var _113=_101.getBox(),_114=_fd.position(_110,false);
_112=Math.floor(Math.max(_114.y,_113.h-(_114.y+_114.h)));
}
_104.moveOffScreen(_10e);
if(_10e.startup&&!_10e._started){
_10e.startup();
}
var mb=_fd.getMarginSize(_10f);
var _115=(_112&&mb.h>_112);
_fe.set(_10f,{overflowX:"hidden",overflowY:_115?"auto":"hidden"});
if(_115){
mb.h=_112;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_110.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_110.offsetWidth);
}else{
delete mb.w;
}
}
if(lang.isFunction(_10e.resize)){
_10e.resize(mb);
}else{
_fd.setMarginBox(_10f,mb);
}
}
var _116=_104.open({parent:this,popup:_10e,around:_110,orient:this.dropDownPosition,onExecute:function(){
self.closeDropDown(true);
},onCancel:function(){
self.closeDropDown(true);
},onClose:function(){
_fb.set(self._popupStateNode,"popupActive",false);
_fc.remove(self._popupStateNode,"dijitHasDropDownOpen");
self._opened=false;
}});
_fb.set(this._popupStateNode,"popupActive","true");
_fc.add(self._popupStateNode,"dijitHasDropDownOpen");
this._opened=true;
return _116;
},closeDropDown:function(_117){
if(this._opened){
if(_117){
this.focus();
}
_104.close(this.dropDown);
this._opened=false;
}
}});
});
},"curam/util/Request":function(){
define("curam/util/Request",["dojo/_base/xhr","curam/debug","curam/util/ResourceBundle","curam/util/LocalConfig"],function(xhr,_118,_119,_11a){
dojo.requireLocalization("curam.application","Request");
var _11b=new _119("Request"),_11c=null,_11d=function(_11e){
if(_11c){
return _11c(_11e);
}else{
return _11e.responseText.indexOf("action=\"j_security_check\"")>0;
}
},_11f=function(err,_120){
if(_11d(_120.xhr)){
_118.log(_11b.getProperty("sessionExpired"));
alert(_11b.getProperty("sessionExpired"));
}else{
_118.log(_11b.getProperty("ajaxError"));
alert(_11b.getProperty("ajaxError"));
}
_118.log(err);
_118.log("HTTP status was: "+_120.xhr.status);
},_121=function(_122,args){
var _123=_11a.readOption("ajaxDebugMode","false")=="true";
var _124=args.error;
if(_123){
args.error=function(err,_125){
if(args.errorHandlerOverrideDefault!==true){
_11f(err,_125);
}
if(_124){
_124(err,_125);
}
};
}
var _126=_122(args);
return _126;
};
var _127={post:function(args){
return _121(xhr.post,args);
},get:function(args){
return _121(xhr.get,args);
},setLoginPageDetector:function(_128){
_11c=_128;
}};
return _127;
});
},"dijit/_MenuBase":function(){
define("dijit/_MenuBase",["./popup","dojo/window","./_Widget","./_KeyNavContainer","./_TemplatedMixin","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/lang","dojo/_base/array"],function(pm,_129,_12a,_12b,_12c,_12d,dom,_12e,_12f,lang,_130){
return _12d("dijit._MenuBase",[_12a,_12c,_12b],{parentMenu:null,popupDelay:500,onExecute:function(){
},onCancel:function(){
},_moveToPopup:function(evt){
if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){
this.focusedChild._onClick(evt);
}else{
var _131=this._getTopMenu();
if(_131&&_131._isMenuBar){
_131.focusNext();
}
}
},_onPopupHover:function(){
if(this.currentPopup&&this.currentPopup._pendingClose_timer){
var _132=this.currentPopup.parentMenu;
if(_132.focusedChild){
_132.focusedChild._setSelected(false);
}
_132.focusedChild=this.currentPopup.from_item;
_132.focusedChild._setSelected(true);
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
var _133=item.popup;
if(_133){
this._stopPendingCloseTimer(_133);
_133._pendingClose_timer=setTimeout(function(){
_133._pendingClose_timer=null;
if(_133.parentMenu){
_133.parentMenu.currentPopup=null;
}
pm.close(_133);
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
},_stopPendingCloseTimer:function(_134){
if(_134._pendingClose_timer){
clearTimeout(_134._pendingClose_timer);
_134._pendingClose_timer=null;
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
var _135=this.focusedChild;
if(!_135){
return;
}
var _136=_135.popup;
if(_136.isShowingNow){
return;
}
if(this.currentPopup){
this._stopPendingCloseTimer(this.currentPopup);
pm.close(this.currentPopup);
}
_136.parentMenu=this;
_136.from_item=_135;
var self=this;
pm.open({parent:this,popup:_136,around:_135.domNode,orient:this._orient||["after","before"],onCancel:function(){
self.focusChild(_135);
self._cleanUp();
_135._setSelected(true);
self.focusedChild=_135;
},onExecute:lang.hitch(this,"_cleanUp")});
this.currentPopup=_136;
if(this.popupHoverHandle){
this.disconnect(this.popupHoverHandle);
}
this.popupHoverHandle=this.connect(_136.domNode,"onmouseenter","_onPopupHover");
if(_136.focus){
_136._focus_timer=setTimeout(lang.hitch(_136,function(){
this._focus_timer=null;
this.focus();
}),0);
}
},_markActive:function(){
this.isActive=true;
_12f.replace(this.domNode,"dijitMenuActive","dijitMenuPassive");
},onOpen:function(){
this.isShowingNow=true;
this._markActive();
},_markInactive:function(){
this.isActive=false;
_12f.replace(this.domNode,"dijitMenuPassive","dijitMenuActive");
},onClose:function(){
this._stopFocusTimer();
this._markInactive();
this.isShowingNow=false;
this.parentMenu=null;
},_closeChild:function(){
this._stopPopupTimer();
if(this.currentPopup){
if(_130.indexOf(this._focusManager.activeStack,this.id)>=0){
_12e.set(this.focusedChild.focusNode,"tabIndex",this.tabIndex);
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
},"curam/dialog":function(){
define("curam/dialog",["curam/util","curam/debug","curam/util/external","curam/util/Refresh","curam/tab","curam/util/RuntimeContext","curam/define","curam/util/onLoad","cm/_base/_dom","curam/util/ResourceBundle"],function(util,_137,_138){
dojo.requireLocalization("curam.application","Debug");
var _139=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.dialog",{MODAL_PREV_FLAG:"o3modalprev",MODAL_PREV_FLAG_INPUT:"curam_dialog_prev_marker",FORCE_CLOSE:false,ERROR_MESSAGES_HEADER:"error-messages-header",_hierarchy:[],_id:null,_displayedHandlerUnsToken:null,_displayed:false,_size:null,_justClose:false,validTargets:{"_top":true,"_self":true},initModal:function(_13a,_13b){
curam.dialog.pageId=_13a;
curam.dialog.messagesExist=_13b;
var _13c=util.getTopmostWindow();
var _13d=false;
var _13e=_13c.dojo.subscribe("/curam/dialog/SetId",this,function(_13f){
_137.log("curam.dialog: "+_139.getProperty("curam.dialog.id"),_13f);
curam.dialog._id=_13f;
_13d=true;
_13c.dojo.unsubscribe(_13e);
});
_13c.dojo.publish("/curam/dialog/init");
if(!_13d){
_137.log("curam.dialog: "+_139.getProperty("curam.dialog.no.id"));
_13c.dojo.unsubscribe(_13e);
}
if(curam.dialog.closeDialog(false)){
return;
}
curam.dialog._displayedHandlerUnsToken=util.getTopmostWindow().dojo.subscribe("/curam/dialog/displayed",null,function(_140,size){
if(_140==curam.dialog._id){
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
var _141=dojo.byId("o3ctx");
var sc=new curam.util.ScreenContext(jsScreenContext.getValue());
sc.addContextBits("ACTION|ERROR");
_141.value=sc.getValue();
util.connect(form,"onsubmit",curam.dialog.formSubmitHandler);
}
window.curamModal=true;
});
dojo.addOnUnload(function(){
util.getTopmostWindow().dojo.publish("/curam/dialog/iframeUnloaded",[curam.dialog._id,window]);
});
if(_13d){
dojo.publish("/curam/dialog/ready");
}
},closeDialog:function(_142){
if(_142){
curam.dialog.forceClose();
}
var _143=curam.dialog.checkClose(curam.dialog.pageId);
if(_143){
util.onLoad.addPublisher(function(_144){
_144.modalClosing=true;
});
if(curam.dialog.messagesExist){
dojo.addOnLoad(function(){
var _145=dojo.byId(util.ERROR_MESSAGES_CONTAINER);
var _146=dojo.byId(util.ERROR_MESSAGES_LIST);
var _147=dojo.byId(curam.dialog.ERROR_MESSAGES_HEADER);
if(_146&&_147){
util.saveInformationalMsgs(_143);
util.disableInformationalLoad();
}else{
_143();
}
});
}else{
_143();
}
return true;
}
return false;
},addFormInput:function(form,type,name,_148){
return dojo.create("input",{"type":type,"name":name,"value":_148},form);
},checkClose:function(_149){
if(curam.dialog._justClose){
return function(){
curam.dialog.closeModalDialog();
};
}
var _14a=curam.dialog.getParentWindow(window);
if(!_14a){
return false;
}
var href=window.location.href;
var _14b=curam.dialog.MODAL_PREV_FLAG;
var _14c=util.getUrlParamValue(href,_14b);
var _14d=true;
if(_14c){
if(_14a){
if(_14c==_149){
_14d=false;
}
}
}else{
_14d=false;
}
var _14e=util.getUrlParamValue(href,"o3ctx");
if(_14e){
var sc=new curam.util.ScreenContext();
sc.setContext(_14e);
if(sc.hasContextBits("TREE|ACTION")){
_14d=false;
}
}
if(_14d||curam.dialog.FORCE_CLOSE){
if(!curam.dialog.FORCE_CLOSE){
if(_14c=="user-prefs-editor"){
return function(){
if(_14a&&_14a.location!==util.getTopmostWindow().location){
curam.dialog.doRedirect(_14a);
}
curam.dialog.closeModalDialog();
};
}
return function(){
var rp=util.removeUrlParam;
href=rp(rp(rp(href,_14b),"o3frame"),util.PREVENT_CACHE_FLAG);
href=util.adjustTargetContext(_14a,href);
if(_14a&&_14a.location!==util.getTopmostWindow().location){
curam.dialog.doRedirect(_14a,href,true);
}else{
curam.tab.getTabController().handleLinkClick(href);
}
curam.dialog.closeModalDialog();
};
}else{
return function(){
if(_14a!==util.getTopmostWindow()){
_14a.curam.util.loadInformationalMsgs();
}
curam.dialog.closeModalDialog();
};
}
}
return false;
},getParentWindow:function(_14f){
if(!_14f){
_137.log("curam.dialog.getParentWindow(): "+_139.getProperty("curam.dialog.no.child"),window);
_137.log("returning as parent = ",window.parent.location.href);
return window.parent;
}
_137.log("curam.dialog.getParentWindow(): "+_139.getProperty("curam.dialog.child"),_14f.location.href);
var _150=curam.dialog._getDialogHierarchy();
for(var i=0;i<_150.length;i++){
if(_150[i]==_14f){
var _151=(i>0)?_150[i-1]:_150[0];
_137.log("curam.dialog.getParentWindow(): "+_139.getProperty("curam.dialog.parent.window"),_151);
return _151;
}
}
_137.log("curam.dialog.getParentWindow(): "+_139.getProperty("curam.dialog.child.not.found"),_14f.location.href);
_137.log("curam.dialog.getParentWindow(): "+_139.getProperty("curam.dialog.hierarchy"),_150);
var ret=_150.length>0?_150[_150.length-1]:undefined;
_137.log("curam.dialog.getParentWindow(): "+_139.getProperty("curam.dialog.returning.parent"),ret?ret.location.href:"undefined");
return ret;
},_getDialogHierarchy:function(){
var _152=util.getTopmostWindow();
_152.require(["curam/dialog"]);
return _152.curam.dialog._hierarchy;
},pushOntoDialogHierarchy:function(_153){
var _154=curam.dialog._getDialogHierarchy();
if(dojo.indexOf(_154,_153)<0){
_154.push(_153);
_137.log(_139.getProperty("curam.dialog.add.hierarchy"),_153.location.href);
_137.log(_139.getProperty("curam.dialog.full.hierarchy"),_154);
}
},removeFromDialogHierarchy:function(_155){
var _156=curam.dialog._getDialogHierarchy();
if(!_155||_156[_156.length-1]==_155){
_156.pop();
}else{
_137.log("curam.dialog.removeFromDialogHierarchy(): "+_139.getProperty("curam.dialog.ignore.request"));
try{
_137.log(_155.location.href);
}
catch(e){
_137.log(e.message);
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
},_isSameBaseUrl:function(href,rtc,_157){
if(href&&href.indexOf("#")==0){
return true;
}
var _158=href.split("?");
var _159=rtc.getHref().split("?");
if(_158[0].indexOf("/")<0){
var _15a=_159[0].split("/");
_159[0]=_15a[_15a.length-1];
}
if(_159[0].indexOf("/")<0){
var _15a=_158[0].split("/");
_158[0]=_15a[_15a.length-1];
}
if(_157&&_157==true){
_158[0]=curam.dialog.stripPageOrActionFromUrl(_158[0]);
_159[0]=curam.dialog.stripPageOrActionFromUrl(_159[0]);
}
if(_158[0]==_159[0]){
return true;
}
return false;
},modalEventHandler:function(_15b){
curam.dialog._doHandleModalEvent(_15b,new curam.util.RuntimeContext(window),curam.dialog.closeModalDialog,curam.dialog.doRedirect);
},_doHandleModalEvent:function(e,rtc,_15c,_15d){
var _15e=e.target;
var u=util;
switch(_15e.tagName){
case "INPUT":
if(dojo.attr(_15e,"type")=="submit"&&typeof _15e.form!="undefined"){
_15e.form.setAttribute("keepModal",_15e.getAttribute("keepModal"));
}
return true;
case "IMG":
case "SPAN":
case "DIV":
_15e=cm.getParentByType(_15e,"A");
if(_15e==null){
return;
}
case "A":
if(_15e._submitButton){
_15e._submitButton.form.setAttribute("keepModal",_15e._submitButton.getAttribute("keepModal"));
return;
}
break;
default:
return true;
}
var _15f=dojo.stopEvent;
var href=_15e.getAttribute("href");
if(href==""){
_15c();
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
var _160=_15e.getAttribute("target");
if(_160&&!curam.dialog.validTargets[_160]){
return true;
}
if(href&&href.indexOf("/servlet/FileDownload?")>-1){
var _161=dojo.create("iframe",{src:href},dojo.body());
_161.style.display="none";
_15f(e);
return false;
}
if(dojo.hasClass(_15e,"external-link")){
return true;
}
if(util.isSameUrl(href,null,rtc)){
if(href.indexOf("#")<0){
href=u.replaceUrlParam(href,"o3frame","modal");
href=u.replaceUrlParam(href,"o3ctx",ctx.getValue());
_15d(window,href);
return false;
}
return true;
}
if(href&&curam.dialog._isSameBaseUrl(href,rtc,true)&&!_15e.getAttribute("keepModal")){
_15e.setAttribute("keepModal","true");
}
var _162=curam.dialog.getParentWindow(rtc.contextObject());
if(_15e&&_15e.getAttribute){
_15f(e);
if(_15e.getAttribute("keepModal")=="true"){
href=u.replaceUrlParam(href,"o3frame","modal");
href=u.replaceUrlParam(href,"o3ctx",ctx.getValue());
_15d(window,href);
}else{
if(_162){
href=u.removeUrlParam(href,"o3frame");
href=u.removeUrlParam(href,curam.dialog.MODAL_PREV_FLAG);
if(_162.location!==util.getTopmostWindow().location){
var _163=new curam.util.RuntimeContext(_162);
var _164=_163.getHref();
_164=u.removeUrlParam(_164,"o3frame");
if(util.isActionPage(_164)){
if(!curam.dialog._isSameBaseUrl(href,_163,true)){
href=u.adjustTargetContext(_162,href);
_15d(_162,href);
}
}else{
if(!util.isSameUrl(href,_164)){
href=u.adjustTargetContext(_162,href);
curam.dialog.doRedirect(_162,href);
}
}
}else{
var _165=new curam.util.ScreenContext("TAB");
href=u.replaceUrlParam(href,"o3ctx",_165.getValue());
curam.tab.getTabController().handleLinkClick(href);
}
_15c();
}
}
return false;
}
if(_162&&typeof (_15e)=="undefined"||_15e==null||_15e=="_self"||_15e==""){
_15f(e);
href=href.replace(/[&?]o3frame=modal/g,"").replace("%3Fo3frame%3Dmodal","").replace("?o3frame%3Dmodal","");
href=util.updateCtx(href);
if(_162.location!==util.getTopmostWindow().location){
_15d(_162,href);
}else{
var _165=new curam.util.ScreenContext("TAB");
href=u.replaceUrlParam(href,"o3ctx",_165.getValue());
curam.tab.getTabController().handleLinkClick(href);
}
_15c();
return false;
}
return true;
},formSubmitHandler:function(e){
var _166=curam.dialog.getParentWindow(window);
if(typeof _166=="undefined"){
return true;
}
e.target.method="post";
e.target.setAttribute("target",window.name);
var _167=e.target.action;
var _168=curam.dialog.MODAL_PREV_FLAG;
var _169=curam.dialog.MODAL_PREV_FLAG_INPUT;
var u=util;
var _16a=dojo.byId(_169);
if(_16a){
_16a.parentNode.removeChild(_16a);
}
if(e.target.getAttribute("keepModal")!="true"&&!jsScreenContext.hasContextBits("AGENDA")){
var _16b="multipart/form-data";
if(e.target.enctype==_16b||e.target.encoding==_16b){
e.target.action=u.removeUrlParam(_167,_168);
_16a=curam.dialog.addFormInput(e.target,"hidden",_168,curam.dialog.pageId);
_16a.setAttribute("id",_169);
_16a.id=_169;
}else{
e.target.action=u.replaceUrlParam(_167,_168,curam.dialog.pageId);
}
}else{
e.target.action=u.removeUrlParam(_167,_168);
}
_166.curam.util.invalidatePage();
if(!jsScreenContext.hasContextBits("EXTAPP")){
util.firePageSubmittedEvent("dialog");
}
return true;
},forceClose:function(){
curam.dialog.FORCE_CLOSE=true;
},forceParentRefresh:function(){
var _16c=curam.dialog.getParentWindow(window);
if(!_16c){
return;
}
_16c.curam.util.FORCE_REFRESH=true;
},closeModalDialog:function(){
var _16d=util.getTopmostWindow();
if(curam.dialog._displayedHandlerUnsToken!=null){
_16d.dojo.unsubscribe(curam.dialog._displayedHandlerUnsToken);
curam.dialog._displayedHandlerUnsToken=null;
}
if(typeof (curam.dialog._id)=="undefined"||curam.dialog._id==null){
var _16e=window.frameElement.id;
var _16f=_16e.substring(7);
curam.dialog._id=_16f;
_137.log("curam.dialog.closeModalDialog() "+_139.getProperty("curam.dialog.modal.id")+_16f);
}
_137.log("publishing /curam/dialog/close for ",curam.dialog._id);
util.getTopmostWindow().dojo.publish("/curam/dialog/close",[curam.dialog._id]);
_137.log("publishing /curam/dialog/close for ",curam.dialog._id);
},parseWindowOptions:function(_170){
var opts={};
if(_170){
_137.log("curam.dialog.parseWindowOptions "+_139.getProperty("curam.dialog.parsing"),_170);
var _171=_170.split(",");
var _172;
for(var i=0;i<_171.length;i++){
_172=_171[i].split("=");
opts[_172[0]]=_172[1];
}
_137.log("done:",dojo.toJson(opts));
}else{
_137.log("curam.dialog.parseWindowOptions "+_139.getProperty("curam.dialog.no.options"));
}
return opts;
},doRedirect:function(_173,href,_174,_175){
window.curamDialogRedirecting=true;
_173.curam.util.redirectWindow(href,_174,_175);
},closeGracefully:function(){
curam.dialog._justClose=true;
}});
return curam.dialog;
});
},"idx/oneui/_CssStateMixin":function(){
define("idx/oneui/_CssStateMixin",["dojo","dijit/dijit","dijit/_WidgetBase"],function(dojo,_176,_177){
return dojo.declare("idx.oneui._CssStateMixin",[],{cssStateNodes:{},hovering:false,active:false,_applyAttributes:function(){
_177.prototype._applyAttributes.apply(this,arguments);
dojo.forEach(["onmouseenter","onmouseleave","onmousedown"],function(e){
this.connect(this.stateNode,e,"_cssMouseEvent");
},this);
dojo.forEach(["disabled","readOnly","checked","selected","focused","state","hovering","active","required"],function(attr){
this.watch(attr,dojo.hitch(this,"_setStateClass"));
},this);
for(var ap in this.cssStateNodes){
this._trackMouseState(this[ap],this.cssStateNodes[ap]);
}
this._setStateClass();
},_cssMouseEvent:function(_178){
if(!this.disabled){
switch(_178.type){
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
this._set("active",true);
this._mouseDown=true;
var _179=this.connect(dojo.body(),"onmouseup",function(){
this._mouseDown=false;
this._set("active",false);
this.disconnect(_179);
});
break;
}
}
},_setStateClass:function(){
var _17a=this._getModifiedClasses(this.oneuiBaseClass);
this._applyStateClass(this.stateNode,_17a);
_17a=this._getModifiedClasses(this.baseClass);
this._applyStateClass(this.domNode,_17a);
},_getModifiedClasses:function(_17b){
var _17c=_17b.split(" ");
function _17d(_17e){
_17c=_17c.concat(dojo.map(_17c,function(c){
return c+_17e;
}),"dijit"+_17e);
};
if(!this.isLeftToRight()){
_17d("Rtl");
}
var _17f=this.checked=="mixed"?"Mixed":(this.checked?"Checked":"");
if(this.checked){
_17d(_17f);
}
if(this.state){
_17d(this.state);
}
if(this.selected){
_17d("Selected");
}
if(this.required){
_17d("Required");
}
if(this.disabled){
_17d("Disabled");
}else{
if(this.readOnly){
_17d("ReadOnly");
}else{
if(this.active){
_17d("Active");
}else{
if(this.hovering){
_17d("Hover");
}
}
}
}
if(this.focused){
_17d("Focused");
}
return _17c;
},_applyStateClass:function(node,_180){
var _181={};
dojo.forEach(node.className.split(" "),function(c){
_181[c]=true;
});
if("_stateClasses" in node){
dojo.forEach(node._stateClasses,function(c){
delete _181[c];
});
}
dojo.forEach(_180,function(c){
_181[c]=true;
});
var _182=[];
for(var c in _181){
_182.push(c);
}
node.className=_182.join(" ");
node._stateClasses=_180;
},_trackMouseState:function(node,_183){
var _184=false,_185=false,_186=false;
var self=this,cn=dojo.hitch(this,"connect",node);
function _187(){
var _188=("disabled" in self&&self.disabled)||("readonly" in self&&self.readonly);
dojo.toggleClass(node,_183+"Hover",_184&&!_185&&!_188);
dojo.toggleClass(node,_183+"Active",_185&&!_188);
dojo.toggleClass(node,_183+"Focused",_186&&!_188);
};
cn("onmouseenter",function(){
_184=true;
_187();
});
cn("onmouseleave",function(){
_184=false;
_185=false;
_187();
});
cn("onmousedown",function(){
_185=true;
_187();
});
cn("onmouseup",function(){
_185=false;
_187();
});
cn("onfocus",function(){
_186=true;
_187();
});
cn("onblur",function(){
_186=false;
_187();
});
this.watch("disabled",_187);
this.watch("readOnly",_187);
}});
});
},"dijit/focus":function(){
define("dijit/focus",["dojo/aspect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/Evented","dojo/_base/lang","dojo/on","dojo/ready","dojo/_base/sniff","dojo/Stateful","dojo/_base/unload","dojo/_base/window","dojo/window","./a11y","./registry","."],function(_189,_18a,dom,_18b,_18c,_18d,lang,on,_18e,has,_18f,_190,win,_191,a11y,_192,_193){
var _194=_18a([_18f,_18d],{curNode:null,activeStack:[],constructor:function(){
var _195=lang.hitch(this,function(node){
if(dom.isDescendant(this.curNode,node)){
this.set("curNode",null);
}
if(dom.isDescendant(this.prevNode,node)){
this.set("prevNode",null);
}
});
_189.before(_18c,"empty",_195);
_189.before(_18c,"destroy",_195);
},registerIframe:function(_196){
return this.registerWin(_196.contentWindow,_196);
},registerWin:function(_197,_198){
var _199=this;
var _19a=function(evt){
_199._justMouseDowned=true;
setTimeout(function(){
_199._justMouseDowned=false;
},0);
if(has("ie")&&evt&&evt.srcElement&&evt.srcElement.parentNode==null){
return;
}
_199._onTouchNode(_198||evt.target||evt.srcElement,"mouse");
};
var doc=has("ie")?_197.document.documentElement:_197.document;
if(doc){
if(has("ie")){
_197.document.body.attachEvent("onmousedown",_19a);
var _19b=function(evt){
var tag=evt.srcElement.tagName.toLowerCase();
if(tag=="#document"||tag=="body"){
return;
}
if(a11y.isTabNavigable(evt.srcElement)){
_199._onFocusNode(_198||evt.srcElement);
}else{
_199._onTouchNode(_198||evt.srcElement);
}
};
doc.attachEvent("onactivate",_19b);
var _19c=function(evt){
_199._onBlurNode(_198||evt.srcElement);
};
doc.attachEvent("ondeactivate",_19c);
return {remove:function(){
_197.document.detachEvent("onmousedown",_19a);
doc.detachEvent("onactivate",_19b);
doc.detachEvent("ondeactivate",_19c);
doc=null;
}};
}else{
doc.body.addEventListener("mousedown",_19a,true);
doc.body.addEventListener("touchstart",_19a,true);
var _19d=function(evt){
_199._onFocusNode(_198||evt.target);
};
doc.addEventListener("focus",_19d,true);
var _19e=function(evt){
_199._onBlurNode(_198||evt.target);
};
doc.addEventListener("blur",_19e,true);
return {remove:function(){
doc.body.removeEventListener("mousedown",_19a,true);
doc.body.removeEventListener("touchstart",_19a,true);
doc.removeEventListener("focus",_19d,true);
doc.removeEventListener("blur",_19e,true);
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
var _19f=[];
try{
while(node){
var _1a0=_18b.get(node,"dijitPopupParent");
if(_1a0){
node=_192.byId(_1a0).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===win.body()){
break;
}
node=_191.get(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId"),_1a1=id&&_192.byId(id);
if(_1a1&&!(by=="mouse"&&_1a1.get("disabled"))){
_19f.unshift(id);
}
node=node.parentNode;
}
}
}
}
catch(e){
}
this._setStack(_19f,by);
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
},_setStack:function(_1a2,by){
var _1a3=this.activeStack;
this.set("activeStack",_1a2);
for(var _1a4=0;_1a4<Math.min(_1a3.length,_1a2.length);_1a4++){
if(_1a3[_1a4]!=_1a2[_1a4]){
break;
}
}
var _1a5;
for(var i=_1a3.length-1;i>=_1a4;i--){
_1a5=_192.byId(_1a3[i]);
if(_1a5){
_1a5._hasBeenBlurred=true;
_1a5.set("focused",false);
if(_1a5._focusManager==this){
_1a5._onBlur(by);
}
this.emit("widget-blur",_1a5,by);
}
}
for(i=_1a4;i<_1a2.length;i++){
_1a5=_192.byId(_1a2[i]);
if(_1a5){
_1a5.set("focused",true);
if(_1a5._focusManager==this){
_1a5._onFocus(by);
}
this.emit("widget-focus",_1a5,by);
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
var _1a6=new _194();
_18e(function(){
var _1a7=_1a6.registerWin(win.doc.parentWindow||win.doc.defaultView);
if(has("ie")){
_190.addOnWindowUnload(function(){
_1a7.remove();
_1a7=null;
});
}
});
_193.focus=function(node){
_1a6.focus(node);
};
for(var attr in _1a6){
if(!/^_/.test(attr)){
_193.focus[attr]=typeof _1a6[attr]=="function"?lang.hitch(_1a6,attr):_1a6[attr];
}
}
_1a6.watch(function(attr,_1a8,_1a9){
_193.focus[attr]=_1a9;
});
return _1a6;
});
},"dojo/i18n":function(){
define("dojo/i18n",["./_base/kernel","require","./has","./_base/array","./_base/config","./_base/lang","./_base/xhr","./json"],function(dojo,_1aa,has,_1ab,_1ac,lang,xhr,json){
true||has.add("dojo-preload-i18n-Api",1);
true||has.add("dojo-v1x-i18n-Api",1);
var _1ad=dojo.i18n={},_1ae=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,_1af=function(root,_1b0,_1b1,_1b2){
for(var _1b3=[_1b1+_1b2],_1b4=_1b0.split("-"),_1b5="",i=0;i<_1b4.length;i++){
_1b5+=(_1b5?"-":"")+_1b4[i];
if(!root||root[_1b5]){
_1b3.push(_1b1+_1b5+"/"+_1b2);
}
}
return _1b3;
},_1b6={},_1b7=dojo.getL10nName=function(_1b8,_1b9,_1ba){
_1ba=_1ba?_1ba.toLowerCase():dojo.locale;
_1b8="dojo/i18n!"+_1b8.replace(/\./g,"/");
_1b9=_1b9.replace(/\./g,"/");
return (/root/i.test(_1ba))?(_1b8+"/nls/"+_1b9):(_1b8+"/nls/"+_1ba+"/"+_1b9);
},_1bb=function(_1bc,_1bd,_1be,_1bf,_1c0,load){
_1bc([_1bd],function(root){
var _1c1=lang.clone(root.root),_1c2=_1af(!root._v1x&&root,_1c0,_1be,_1bf);
_1bc(_1c2,function(){
for(var i=1;i<_1c2.length;i++){
_1c1=lang.mixin(lang.clone(_1c1),arguments[i]);
}
var _1c3=_1bd+"/"+_1c0;
_1b6[_1c3]=_1c1;
load();
});
});
},_1c4=function(id,_1c5){
return /^\./.test(id)?_1c5(id):id;
},_1c6=function(_1c7){
var list=_1ac.extraLocale||[];
list=lang.isArray(list)?list:[list];
list.push(_1c7);
return list;
},load=function(id,_1c8,load){
if(1){
var _1c9=id.split("*"),_1ca=_1c9[1]=="preload";
if(_1ca){
if(!_1b6[id]){
_1b6[id]=1;
_1cb(_1c9[2],json.parse(_1c9[3]),1);
}
load(1);
}
if(_1ca||_1cc(id,_1c8,load)){
return;
}
}
var _1cd=_1ae.exec(id),_1ce=_1cd[1]+"/",_1cf=_1cd[5]||_1cd[4],_1d0=_1ce+_1cf,_1d1=(_1cd[5]&&_1cd[4]),_1d2=_1d1||dojo.locale,_1d3=_1d0+"/"+_1d2,_1d4=_1d1?[_1d2]:_1c6(_1d2),_1d5=_1d4.length,_1d6=function(){
if(!--_1d5){
load(lang.delegate(_1b6[_1d3]));
}
};
_1ab.forEach(_1d4,function(_1d7){
var _1d8=_1d0+"/"+_1d7;
if(1){
_1d9(_1d8);
}
if(!_1b6[_1d8]){
_1bb(_1c8,_1d0,_1ce,_1cf,_1d7,_1d6);
}else{
_1d6();
}
});
};
if(has("dojo-unit-tests")){
var _1da=_1ad.unitTests=[];
}
if(1||1){
var _1db=_1ad.normalizeLocale=function(_1dc){
var _1dd=_1dc?_1dc.toLowerCase():dojo.locale;
return _1dd=="root"?"ROOT":_1dd;
},isXd=function(mid){
return (1&&1)?_1aa.isXdUrl(_1aa.toUrl(mid+".js")):true;
},_1de=0,_1df=[],_1cb=_1ad._preloadLocalizations=function(_1e0,_1e1,_1e2){
function _1e3(_1e4,func){
var _1e5=_1e4.split("-");
while(_1e5.length){
if(func(_1e5.join("-"))){
return true;
}
_1e5.pop();
}
return func("ROOT");
};
function _1e6(_1e7){
_1e7=_1db(_1e7);
_1e3(_1e7,function(loc){
if(_1ab.indexOf(_1e1,loc)>=0){
var mid=_1e0.replace(/\./g,"/")+"_"+loc;
_1de++;
(isXd(mid)||_1e2?_1aa:_1eb)([mid],function(_1e8){
for(var p in _1e8){
_1b6[p+"/"+loc]=_1e8[p];
}
--_1de;
while(!_1de&&_1df.length){
load.apply(null,_1df.shift());
}
});
return true;
}
return false;
});
};
_1e6();
_1ab.forEach(dojo.config.extraLocale,_1e6);
},_1cc=function(id,_1e9,load){
if(_1de){
_1df.push([id,_1e9,load]);
}
return _1de;
};
}
if(1){
var _1ea=new Function("__bundle","__checkForLegacyModules","__mid","var define = function(){define.called = 1;},"+"    require = function(){define.called = 1;};"+"try{"+"define.called = 0;"+"eval(__bundle);"+"if(define.called==1)"+"return 1;"+"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"+"return __checkForLegacyModules;"+"}catch(e){}"+"try{"+"return eval('('+__bundle+')');"+"}catch(e){"+"return e;"+"}"),_1eb=function(deps,_1ec){
var _1ed=[];
_1ab.forEach(deps,function(mid){
var url=_1aa.toUrl(mid+".js");
function load(text){
var _1ee=_1ea(text,_1d9,mid);
if(_1ee===1){
_1aa([mid],function(_1ef){
_1ed.push(_1b6[url]=_1ef);
});
}else{
if(_1ee instanceof Error){
console.error("failed to evaluate i18n bundle; url="+url,_1ee);
_1ee={};
}
_1ed.push(_1b6[url]=(/nls\/[^\/]+\/[^\/]+$/.test(url)?_1ee:{root:_1ee,_v1x:1}));
}
};
if(_1b6[url]){
_1ed.push(_1b6[url]);
}else{
var _1f0=_1aa.syncLoadNls(mid);
if(_1f0){
_1ed.push(_1f0);
}else{
if(!xhr){
try{
_1aa.getText(url,true,load);
}
catch(e){
_1ed.push(_1b6[url]={});
}
}else{
xhr.get({url:url,sync:true,load:load,error:function(){
_1ed.push(_1b6[url]={});
}});
}
}
}
});
_1ec&&_1ec.apply(null,_1ed);
},_1d9=function(_1f1){
for(var _1f2,_1f3=_1f1.split("/"),_1f4=dojo.global[_1f3[0]],i=1;_1f4&&i<_1f3.length-1;_1f4=_1f4[_1f3[i++]]){
}
if(_1f4){
_1f2=_1f4[_1f3[i]];
if(!_1f2){
_1f2=_1f4[_1f3[i].replace(/-/g,"_")];
}
if(_1f2){
_1b6[_1f1]=_1f2;
}
}
return _1f2;
};
_1ad.getLocalization=function(_1f5,_1f6,_1f7){
var _1f8,_1f9=_1b7(_1f5,_1f6,_1f7).substring(10);
load(_1f9,(!isXd(_1f9)?_1eb:_1aa),function(_1fa){
_1f8=_1fa;
});
return _1f8;
};
if(has("dojo-unit-tests")){
_1da.push(function(doh){
doh.register("tests.i18n.unit",function(t){
var _1fb;
_1fb=_1ea("{prop:1}");
t.is({prop:1},_1fb);
t.is(undefined,_1fb[1]);
_1fb=_1ea("({prop:1})");
t.is({prop:1},_1fb);
t.is(undefined,_1fb[1]);
_1fb=_1ea("{'prop-x':1}");
t.is({"prop-x":1},_1fb);
t.is(undefined,_1fb[1]);
_1fb=_1ea("({'prop-x':1})");
t.is({"prop-x":1},_1fb);
t.is(undefined,_1fb[1]);
_1fb=_1ea("define({'prop-x':1})");
t.is(1,_1fb);
_1fb=_1ea("this is total nonsense and should throw an error");
t.is(_1fb instanceof Error,true);
});
});
}
}
return lang.mixin(_1ad,{dynamic:true,normalize:_1c4,load:load,cache:_1b6});
});
},"dijit/hccss":function(){
define("dijit/hccss",["require","dojo/_base/config","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/ready","dojo/_base/sniff","dojo/_base/window"],function(_1fc,_1fd,_1fe,_1ff,_200,_201,has,win){
if(has("ie")||has("mozilla")){
_201(90,function(){
var div=_1ff.create("div",{id:"a11yTestNode",style:{cssText:"border: 1px solid;"+"border-color:red green;"+"position: absolute;"+"height: 5px;"+"top: -999px;"+"background-image: url(\""+(_1fd.blankGif||_1fc.toUrl("dojo/resources/blank.gif"))+"\");"}},win.body());
var cs=_200.getComputedStyle(div);
if(cs){
var _202=cs.backgroundImage;
var _203=(cs.borderTopColor==cs.borderRightColor)||(_202!=null&&(_202=="none"||_202=="url(invalid-url:)"));
if(_203){
_1fe.add(win.body(),"dijit_a11y");
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
},"curam/util/LocalConfig":function(){
define("curam/util/LocalConfig",[],function(){
var _204=function(name){
return "curam_util_LocalConfig_"+name;
},_205=function(name,_206){
var _207=_204(name);
if(typeof top[_207]==="undefined"){
top[_207]=_206;
}
return top[_207];
},_208=function(name){
return top[_204(name)];
};
_205("seedValues",{}),_205("overrides",{});
var _209=function(_20a,_20b){
if(typeof _20a!=="undefined"&&typeof _20a!=="string"){
throw new Error("Invalid "+_20b+" type: "+typeof _20a+"; expected string");
}
};
var _20c={seedOption:function(name,_20d,_20e){
_209(_20d,"value");
_209(_20e,"defaultValue");
_208("seedValues")[name]=(typeof _20d!=="undefined")?_20d:_20e;
},overrideOption:function(name,_20f){
_209(_20f,"value");
if(typeof (Storage)!=="undefined"){
localStorage[name]=_20f;
}else{
_208("overrides")[name]=_20f;
}
},readOption:function(name,_210){
_209(_210,"defaultValue");
var _211=null;
if(typeof (Storage)!=="undefined"&&typeof localStorage[name]!=="undefined"){
_211=localStorage[name];
}else{
if(typeof _208("overrides")[name]!=="undefined"){
_211=_208("overrides")[name];
}else{
if(typeof _208("seedValues")[name]!=="undefined"){
_211=_208("seedValues")[name];
}else{
_211=_210;
}
}
}
return _211;
},clearOption:function(name){
if(typeof (Storage)!=="undefined"){
localStorage.removeItem(name);
}
delete _208("overrides")[name];
delete _208("seedValues")[name];
}};
return _20c;
});
},"dijit/form/_ComboBoxMenuMixin":function(){
define("dijit/form/_ComboBoxMenuMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/i18n","dojo/_base/window","dojo/i18n!./nls/ComboBox"],function(_212,_213,_214,i18n,win){
return _213("dijit.form._ComboBoxMenuMixin",null,{_messages:null,postMixInProperties:function(){
this.inherited(arguments);
this._messages=i18n.getLocalization("dijit.form","ComboBox",this.lang);
},buildRendering:function(){
this.inherited(arguments);
this.previousButton.innerHTML=this._messages["previousMessage"];
this.nextButton.innerHTML=this._messages["nextMessage"];
},_setValueAttr:function(_215){
this.value=_215;
this.onChange(_215);
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
},_createOption:function(item,_216){
var _217=this._createMenuItem();
var _218=_216(item);
if(_218.html){
_217.innerHTML=_218.label;
}else{
_217.appendChild(win.doc.createTextNode(_218.label));
}
if(_217.innerHTML==""){
_217.innerHTML="&#160;";
}
this.applyTextDir(_217,(_217.innerText||_217.textContent||""));
_217.item=item;
return _217;
},createOptions:function(_219,_21a,_21b){
this.items=_219;
this.previousButton.style.display=(_21a.start==0)?"none":"";
_214.set(this.previousButton,"id",this.id+"_prev");
_212.forEach(_219,function(item,i){
var _21c=this._createOption(item,_21b);
_21c.setAttribute("item",i);
_214.set(_21c,"id",this.id+i);
this.nextButton.parentNode.insertBefore(_21c,this.nextButton);
},this);
var _21d=false;
if(_219.total&&!_219.total.then&&_219.total!=-1){
if((_21a.start+_21a.count)<_219.total){
_21d=true;
}else{
if((_21a.start+_21a.count)>_219.total&&_21a.count==_219.length){
_21d=true;
}
}
}else{
if(_21a.count==_219.length){
_21d=true;
}
}
this.nextButton.style.display=_21d?"":"none";
_214.set(this.nextButton,"id",this.id+"_next");
},clearResultList:function(){
var _21e=this.containerNode;
while(_21e.childNodes.length>2){
_21e.removeChild(_21e.childNodes[_21e.childNodes.length-2]);
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
define("dojo/parser",["./_base/kernel","./_base/lang","./_base/array","./_base/config","./_base/html","./_base/window","./_base/url","./_base/json","./aspect","./date/stamp","./has","./query","./on","./ready"],function(dojo,_21f,_220,_221,_222,_223,_224,_225,_226,_227,has,_228,don,_229){
new Date("X");
if(1){
var form=document.createElement("form");
has.add("dom-attributes-explicit",form.attributes.length==0);
has.add("dom-attributes-specified-flag",form.attributes.length<40);
}
dojo.parser=new function(){
var _22a={};
function _22b(_22c){
var map={};
for(var name in _22c){
if(name.charAt(0)=="_"){
continue;
}
map[name.toLowerCase()]=name;
}
return map;
};
_226.after(_21f,"extend",function(){
_22a={};
},true);
var _22d={};
function _22e(type){
var map=_22d[type]||(_22d[type]={});
return map["__type"]||(map["__type"]=(_21f.getObject(type)||require(type)));
};
this._functionFromScript=function(_22f,_230){
var _231="";
var _232="";
var _233=(_22f.getAttribute(_230+"args")||_22f.getAttribute("args"));
if(_233){
_220.forEach(_233.split(/\s*,\s*/),function(part,idx){
_231+="var "+part+" = arguments["+idx+"]; ";
});
}
var _234=_22f.getAttribute("with");
if(_234&&_234.length){
_220.forEach(_234.split(/\s*,\s*/),function(part){
_231+="with("+part+"){";
_232+="}";
});
}
return new Function(_231+_22f.innerHTML+_232);
};
this.instantiate=function(_235,_236,_237){
_236=_236||{};
_237=_237||{};
var _238=(_237.scope||dojo._scopeName)+"Type",_239="data-"+(_237.scope||dojo._scopeName)+"-",_23a=_239+"type";
var list=[];
_220.forEach(_235,function(node){
var type=_238 in _236?_236[_238]:node.getAttribute(_23a)||node.getAttribute(_238);
if(type){
list.push({node:node,"type":type});
}
});
return this._instantiate(list,_236,_237);
};
this._instantiate=function(_23b,_23c,_23d){
var _23e=[];
var _23f=(_23d.scope||dojo._scopeName)+"Type",_240="data-"+(_23d.scope||dojo._scopeName)+"-",_241=_240+"type",_242=_240+"props",_243=_240+"attach-point",_244=_240+"attach-event",_245=_240+"id",_246=_240+"mixins";
var _247={};
_220.forEach([_242,_241,_23f,_245,"jsId",_243,_244,"dojoAttachPoint","dojoAttachEvent","class","style",_246],function(name){
_247[name.toLowerCase()]=name.replace(_23d.scope,"dojo");
});
function _248(type,_249){
return type.createSubclass&&type.createSubclass(_249)||type.extend.apply(type,_249);
};
_220.forEach(_23b,function(obj){
if(!obj){
return;
}
var node=obj.node,type=obj.type,_24a=node.getAttribute(_246),ctor;
if(_24a){
var map=_22d[type];
_24a=_24a.replace(/ /g,"");
ctor=map&&map[_24a];
if(!ctor){
ctor=_22e(type);
ctor=_22d[type][_24a]=_248(ctor,_220.map(_24a.split(","),_22e));
}
}else{
ctor=_22e(type);
}
var _24b=ctor&&ctor.prototype;
var _24c={};
if(_23d.defaults){
_21f.mixin(_24c,_23d.defaults);
}
if(obj.inherited){
_21f.mixin(_24c,obj.inherited);
}
var _24d;
if(has("dom-attributes-explicit")){
_24d=node.attributes;
}else{
if(has("dom-attributes-specified-flag")){
_24d=_220.filter(node.attributes,function(a){
return a.specified;
});
}else{
var _24e=/^input$|^img$/i.test(node.nodeName)?node:node.cloneNode(false),_24f=_24e.outerHTML.replace(/=[^\s"']+|="[^"]*"|='[^']*'/g,"").replace(/^\s*<[a-zA-Z0-9]*\s*/,"").replace(/\s*>.*$/,"");
_24d=_220.map(_24f.split(/\s+/),function(name){
var _250=name.toLowerCase();
return {name:name,value:(node.nodeName=="LI"&&name=="value")||_250=="enctype"?node.getAttribute(_250):node.getAttributeNode(_250).value};
});
}
}
var i=0,item;
while(item=_24d[i++]){
var name=item.name,_251=name.toLowerCase(),_252=item.value;
if(_251 in _247){
switch(_247[_251]){
case "data-dojo-props":
var _253=_252;
break;
case "data-dojo-id":
case "jsId":
var _254=_252;
break;
case "data-dojo-attach-point":
case "dojoAttachPoint":
_24c.dojoAttachPoint=_252;
break;
case "data-dojo-attach-event":
case "dojoAttachEvent":
_24c.dojoAttachEvent=_252;
break;
case "class":
_24c["class"]=node.className;
break;
case "style":
_24c["style"]=node.style&&node.style.cssText;
break;
}
}else{
if(!(name in _24b)){
var map=(_22a[type]||(_22a[type]=_22b(_24b)));
name=map[_251]||name;
}
if(name in _24b){
switch(typeof _24b[name]){
case "string":
_24c[name]=_252;
break;
case "number":
_24c[name]=_252.length?Number(_252):NaN;
break;
case "boolean":
_24c[name]=_252.toLowerCase()!="false";
break;
case "function":
if(_252===""||_252.search(/[^\w\.]+/i)!=-1){
_24c[name]=new Function(_252);
}else{
_24c[name]=_21f.getObject(_252,false)||new Function(_252);
}
break;
default:
var pVal=_24b[name];
_24c[name]=(pVal&&"length" in pVal)?(_252?_252.split(/\s*,\s*/):[]):(pVal instanceof Date)?(_252==""?new Date(""):_252=="now"?new Date():_227.fromISOString(_252)):(pVal instanceof dojo._Url)?(dojo.baseUrl+_252):_225.fromJson(_252);
}
}else{
_24c[name]=_252;
}
}
}
if(_253){
try{
_253=_225.fromJson.call(_23d.propsThis,"{"+_253+"}");
_21f.mixin(_24c,_253);
}
catch(e){
throw new Error(e.toString()+" in data-dojo-props='"+_253+"'");
}
}
_21f.mixin(_24c,_23c);
var _255=obj.scripts||(ctor&&(ctor._noScript||_24b._noScript)?[]:_228("> script[type^='dojo/']",node));
var _256=[],_257=[],_258=[],on=[];
if(_255){
for(i=0;i<_255.length;i++){
var _259=_255[i];
node.removeChild(_259);
var _25a=(_259.getAttribute(_240+"event")||_259.getAttribute("event")),prop=_259.getAttribute(_240+"prop"),_25b=_259.getAttribute("type"),nf=this._functionFromScript(_259,_240);
if(_25a){
if(_25b=="dojo/connect"){
_256.push({event:_25a,func:nf});
}else{
if(_25b=="dojo/on"){
on.push({event:_25a,func:nf});
}else{
_24c[_25a]=nf;
}
}
}else{
if(_25b=="dojo/watch"){
_258.push({prop:prop,func:nf});
}else{
_257.push(nf);
}
}
}
}
var _25c=ctor.markupFactory||_24b.markupFactory;
var _25d=_25c?_25c(_24c,node,ctor):new ctor(_24c,node);
_23e.push(_25d);
if(_254){
_21f.setObject(_254,_25d);
}
for(i=0;i<_256.length;i++){
_226.after(_25d,_256[i].event,dojo.hitch(_25d,_256[i].func),true);
}
for(i=0;i<_257.length;i++){
_257[i].call(_25d);
}
for(i=0;i<_258.length;i++){
_25d.watch(_258[i].prop,_258[i].func);
}
for(i=0;i<on.length;i++){
don(_25d,on[i].event,on[i].func);
}
},this);
if(!_23c._started){
_220.forEach(_23e,function(_25e){
if(!_23d.noStart&&_25e&&_21f.isFunction(_25e.startup)&&!_25e._started){
_25e.startup();
}
});
}
return _23e;
};
this.scan=function(root,_25f){
var list=[];
var _260=(_25f.scope||dojo._scopeName)+"Type",_261="data-"+(_25f.scope||dojo._scopeName)+"-",_262=_261+"type",_263=_261+"textdir";
var node=root.firstChild;
var _264=_25f.inherited;
if(!_264){
function _265(node,attr){
return (node.getAttribute&&node.getAttribute(attr))||(node!==_223.doc&&node!==_223.doc.documentElement&&node.parentNode?_265(node.parentNode,attr):null);
};
_264={dir:_265(root,"dir"),lang:_265(root,"lang"),textDir:_265(root,_263)};
for(var key in _264){
if(!_264[key]){
delete _264[key];
}
}
}
var _266={inherited:_264};
var _267;
var _268;
function _269(_26a){
if(!_26a.inherited){
_26a.inherited={};
var node=_26a.node,_26b=_269(_26a.parent);
var _26c={dir:node.getAttribute("dir")||_26b.dir,lang:node.getAttribute("lang")||_26b.lang,textDir:node.getAttribute(_263)||_26b.textDir};
for(var key in _26c){
if(_26c[key]){
_26a.inherited[key]=_26c[key];
}
}
}
return _26a.inherited;
};
while(true){
if(!node){
if(!_266||!_266.node){
break;
}
node=_266.node.nextSibling;
_267=_266.scripts;
_268=false;
_266=_266.parent;
continue;
}
if(node.nodeType!=1){
node=node.nextSibling;
continue;
}
if(_267&&node.nodeName.toLowerCase()=="script"){
type=node.getAttribute("type");
if(type&&/^dojo\/\w/i.test(type)){
_267.push(node);
}
node=node.nextSibling;
continue;
}
if(_268){
node=node.nextSibling;
continue;
}
var type=node.getAttribute(_262)||node.getAttribute(_260);
var _26d=node.firstChild;
if(!type&&(!_26d||(_26d.nodeType==3&&!_26d.nextSibling))){
node=node.nextSibling;
continue;
}
var _26e={node:node,scripts:_267,parent:_266};
var ctor;
try{
ctor=type&&_22e(type);
}
catch(e){
}
var _26f=ctor&&!ctor.prototype._noScript?[]:null;
if(type){
list.push({"type":type,node:node,scripts:_26f,inherited:_269(_26e)});
}
node=_26d;
_267=_26f;
_268=ctor&&ctor.prototype.stopParser&&!(_25f.template);
_266=_26e;
}
return list;
};
this.parse=function(_270,_271){
var root;
if(!_271&&_270&&_270.rootNode){
_271=_270;
root=_271.rootNode;
}else{
if(_270&&_21f.isObject(_270)&&!("nodeType" in _270)){
_271=_270;
}else{
root=_270;
}
}
root=root?_222.byId(root):_223.body();
_271=_271||{};
var list=this.scan(root,_271);
var _272=_271.template?{template:true}:{};
return this._instantiate(list,_272,_271);
};
}();
if(_221.parseOnLoad){
_229(100,dojo.parser,"parse");
}
return dojo.parser;
});
},"idx/oneui/form/_CompositeMixin":function(){
define("idx/oneui/form/_CompositeMixin",["dojo/_base/declare","dojo/_base/lang","dojo/dom-attr","dojo/dom","dojo/i18n","dojo/query","dojo/dom-class","dojo/dom-style","dijit/_base/wai","../HoverHelpTooltip","../common","./_FocusManager"],function(_273,lang,_274,dom,i18n,_275,_276,_277,wai,_278,_279,_27a){
lang.extend(_278._MasterHoverHelpTooltip,{hoverFocus:false});
return _273("idx.oneui.form._CompositeMixin",null,{labelAlignment:"horizontal",label:"",labelWidth:"",fieldWidth:"",hintPosition:"inside",hint:"",required:false,unit:"",_focusManager:_27a,_setLabelAlignmentAttr:function(_27b){
var h=_27b=="horizontal";
_275(".idxLabel",this.domNode).toggleClass("dijitInline",h);
_275(".idxCompContainer",this.domNode).toggleClass("dijitInline",h);
this._set("labelAlignment",_27b);
},_setLabelAttr:function(_27c){
this.compLabelNode.innerHTML=_27c;
_275(".idxLabel",this.domNode).toggleClass("dijitHidden",/^\s*$/.test(_27c));
this._set("label",_27c);
},_setRequiredAttr:function(_27d){
wai.setWaiState(this.focusNode,"required",_27d+"");
this._set("required",_27d);
if(_27d){
this._set("state","Incomplete");
}
},_setHintPositionAttr:function(_27e){
if(!this.compHintNode){
return;
}
_276.toggle(this.compHintNode,"dijitVisible",_27e!="inside");
this._set("hintPosition",_27e);
this.set("hint",this.hint);
},_setHintAttr:function(hint){
if(!this.compHintNode){
return;
}
this.set("placeHolder",this.hintPosition=="inside"?hint:"");
this.compHintNode.innerHTML=this.hintPosition=="inside"?"":hint;
if(this.hintPosition=="outside"){
_274.set(this.compHintNode,"id",this.id+"_hint_outside");
}
dijit.setWaiState(this.focusNode,"describedby",this.id+"_hint_"+this.hintPosition);
this._set("hint",hint);
},_setPlaceHolderAttr:function(v){
this._set("placeHolder",v);
if(!this._phspan){
this._attachPoints.push("_phspan");
this._phspan=dojo.create("span",{className:"dijitPlaceHolder dijitInputField",id:this.id+"_hint_inside"},this.focusNode,"after");
}
this._phspan.innerHTML="";
this._phspan.appendChild(document.createTextNode(v));
this._phspan.style.display=(this.placeHolder&&!this.focused&&!this.textbox.value)?"":"none";
},_setUnitAttr:function(unit){
if(!this.compUnitNode){
return;
}
this.compUnitNode.innerHTML=unit;
_276.toggle(this.compUnitNode,"dijitHidden",/^\s*$/.test(unit));
this._set("unit",unit);
},_setLabelWidthAttr:function(_27f){
if(!_27f){
return;
}
var _280=_279.normalizedLength(_27f);
_275(".idxLabel",this.domNode).style("width",_280+"px");
},_setFieldWidthAttr:function(_281){
if(!_281){
return;
}
var _282=_279.normalizedLength(_281);
_277.set(this.oneuiBaseNode,"width",_282+"px");
},_isValidFocusNode:function(_283){
return dom.isDescendant(_283,this.oneuiBaseNode)||!dom.isDescendant(_283,this.domNode);
},reset:function(){
this.set("state","");
this.message="";
this.inherited(arguments);
}});
});
},"dijit/form/ToggleButton":function(){
define("dijit/form/ToggleButton",["dojo/_base/declare","dojo/_base/kernel","./Button","./_ToggleButtonMixin"],function(_284,_285,_286,_287){
return _284("dijit.form.ToggleButton",[_286,_287],{baseClass:"dijitToggleButton",setChecked:function(_288){
_285.deprecated("setChecked("+_288+") is deprecated. Use set('checked',"+_288+") instead.","","2.0");
this.set("checked",_288);
}});
});
},"dojo/date/stamp":function(){
define("dojo/date/stamp",["../_base/kernel","../_base/lang","../_base/array"],function(dojo,lang,_289){
lang.getObject("date.stamp",true,dojo);
dojo.date.stamp.fromISOString=function(_28a,_28b){
if(!dojo.date.stamp._isoRegExp){
dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
}
var _28c=dojo.date.stamp._isoRegExp.exec(_28a),_28d=null;
if(_28c){
_28c.shift();
if(_28c[1]){
_28c[1]--;
}
if(_28c[6]){
_28c[6]*=1000;
}
if(_28b){
_28b=new Date(_28b);
_289.forEach(_289.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(prop){
return _28b["get"+prop]();
}),function(_28e,_28f){
_28c[_28f]=_28c[_28f]||_28e;
});
}
_28d=new Date(_28c[0]||1970,_28c[1]||0,_28c[2]||1,_28c[3]||0,_28c[4]||0,_28c[5]||0,_28c[6]||0);
if(_28c[0]<100){
_28d.setFullYear(_28c[0]||1970);
}
var _290=0,_291=_28c[7]&&_28c[7].charAt(0);
if(_291!="Z"){
_290=((_28c[8]||0)*60)+(Number(_28c[9])||0);
if(_291!="-"){
_290*=-1;
}
}
if(_291){
_290-=_28d.getTimezoneOffset();
}
if(_290){
_28d.setTime(_28d.getTime()+_290*60000);
}
}
return _28d;
};
dojo.date.stamp.toISOString=function(_292,_293){
var _294=function(n){
return (n<10)?"0"+n:n;
};
_293=_293||{};
var _295=[],_296=_293.zulu?"getUTC":"get",date="";
if(_293.selector!="time"){
var year=_292[_296+"FullYear"]();
date=["0000".substr((year+"").length)+year,_294(_292[_296+"Month"]()+1),_294(_292[_296+"Date"]())].join("-");
}
_295.push(date);
if(_293.selector!="date"){
var time=[_294(_292[_296+"Hours"]()),_294(_292[_296+"Minutes"]()),_294(_292[_296+"Seconds"]())].join(":");
var _297=_292[_296+"Milliseconds"]();
if(_293.milliseconds){
time+="."+(_297<100?"0":"")+_294(_297);
}
if(_293.zulu){
time+="Z";
}else{
if(_293.selector!="time"){
var _298=_292.getTimezoneOffset();
var _299=Math.abs(_298);
time+=(_298>0?"-":"+")+_294(Math.floor(_299/60))+":"+_294(_299%60);
}
}
_295.push(time);
}
return _295.join("T");
};
return dojo.date.stamp;
});
},"dojo/Stateful":function(){
define("dojo/Stateful",["./_base/declare","./_base/lang","./_base/array"],function(_29a,lang,_29b){
return _29a("dojo.Stateful",null,{postscript:function(_29c){
if(_29c){
lang.mixin(this,_29c);
}
},get:function(name){
return this[name];
},set:function(name,_29d){
if(typeof name==="object"){
for(var x in name){
if(name.hasOwnProperty(x)&&x!="_watchCallbacks"){
this.set(x,name[x]);
}
}
return this;
}
var _29e=this[name];
this[name]=_29d;
if(this._watchCallbacks){
this._watchCallbacks(name,_29e,_29d);
}
return this;
},watch:function(name,_29f){
var _2a0=this._watchCallbacks;
if(!_2a0){
var self=this;
_2a0=this._watchCallbacks=function(name,_2a1,_2a2,_2a3){
var _2a4=function(_2a5){
if(_2a5){
_2a5=_2a5.slice();
for(var i=0,l=_2a5.length;i<l;i++){
_2a5[i].call(self,name,_2a1,_2a2);
}
}
};
_2a4(_2a0["_"+name]);
if(!_2a3){
_2a4(_2a0["*"]);
}
};
}
if(!_29f&&typeof name==="function"){
_29f=name;
name="*";
}else{
name="_"+name;
}
var _2a6=_2a0[name];
if(typeof _2a6!=="object"){
_2a6=_2a0[name]=[];
}
_2a6.push(_29f);
return {unwatch:function(){
_2a6.splice(_29b.indexOf(_2a6,_29f),1);
}};
}});
});
},"dijit/form/_AutoCompleterMixin":function(){
define("dijit/form/_AutoCompleterMixin",["dojo/_base/connect","dojo/data/util/filter","dojo/_base/declare","dojo/_base/Deferred","dojo/dom-attr","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/query","dojo/regexp","dojo/_base/sniff","dojo/string","dojo/_base/window","./DataList","../registry","./_TextBoxMixin"],function(_2a7,_2a8,_2a9,_2aa,_2ab,_2ac,keys,lang,_2ad,_2ae,has,_2af,win,_2b0,_2b1,_2b2){
return _2a9("dijit.form._AutoCompleterMixin",null,{item:null,pageSize:Infinity,store:null,fetchProperties:{},query:{},autoComplete:true,highlightMatch:"first",searchDelay:100,searchAttr:"name",labelAttr:"",labelType:"text",queryExpr:"${0}*",ignoreCase:true,maxHeight:-1,_stopClickEvents:false,_getCaretPos:function(_2b3){
var pos=0;
if(typeof (_2b3.selectionStart)=="number"){
pos=_2b3.selectionStart;
}else{
if(has("ie")){
var tr=win.doc.selection.createRange().duplicate();
var ntr=_2b3.createTextRange();
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
},_setCaretPos:function(_2b4,_2b5){
_2b5=parseInt(_2b5);
_2b2.selectInputText(_2b4,_2b5,_2b5);
},_setDisabledAttr:function(_2b6){
this.inherited(arguments);
this.domNode.setAttribute("aria-disabled",_2b6);
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
var _2b7=false;
var pw=this.dropDown;
var _2b8=null;
this._prev_key_backspace=false;
this._abortQuery();
this.inherited(arguments);
if(this._opened){
_2b8=pw.getHighlightedOption();
}
switch(key){
case keys.PAGE_DOWN:
case keys.DOWN_ARROW:
case keys.PAGE_UP:
case keys.UP_ARROW:
if(this._opened){
this._announceOption(_2b8);
}
_2ac.stop(evt);
break;
case keys.ENTER:
if(_2b8){
if(_2b8==pw.nextButton){
this._nextSearch(1);
_2ac.stop(evt);
break;
}else{
if(_2b8==pw.previousButton){
this._nextSearch(-1);
_2ac.stop(evt);
break;
}
}
}else{
this._setBlurValue();
this._setCaretPos(this.focusNode,this.focusNode.value.length);
}
if(this._opened||this._fetchHandle){
_2ac.stop(evt);
}
case keys.TAB:
var _2b9=this.get("displayedValue");
if(pw&&(_2b9==pw._messages["previousMessage"]||_2b9==pw._messages["nextMessage"])){
break;
}
if(_2b8){
this._selectOption(_2b8);
}
case keys.ESCAPE:
if(this._opened){
this._lastQuery=null;
this.closeDropDown();
}
break;
case " ":
if(_2b8){
_2ac.stop(evt);
this._selectOption(_2b8);
this.closeDropDown();
}else{
_2b7=true;
}
break;
case keys.DELETE:
case keys.BACKSPACE:
this._prev_key_backspace=true;
_2b7=true;
break;
default:
_2b7=typeof key=="string"||key==229;
}
if(_2b7){
this.item=undefined;
this.searchTimer=setTimeout(lang.hitch(this,"_startSearchFromInput"),1);
}
},_autoCompleteText:function(text){
var fn=this.focusNode;
_2b2.selectInputText(fn,fn.value.length);
var _2ba=this.ignoreCase?"toLowerCase":"substr";
if(text[_2ba](0).indexOf(this.focusNode.value[_2ba](0))==0){
var cpos=this.autoComplete?this._getCaretPos(fn):fn.value.length;
if((cpos+1)>fn.value.length){
fn.value=text;
_2b2.selectInputText(fn,cpos);
}
}else{
fn.value=text;
_2b2.selectInputText(fn);
}
},_openResultList:function(_2bb,_2bc,_2bd){
this._fetchHandle=null;
if(this.disabled||this.readOnly||(_2bc[this.searchAttr]!==this._lastQuery)){
return;
}
var _2be=this.dropDown.getHighlightedOption();
this.dropDown.clearResultList();
if(!_2bb.length&&_2bd.start==0){
this.closeDropDown();
return;
}
this.dropDown.createOptions(_2bb,_2bd,lang.hitch(this,"_getMenuLabelFromItem"));
this._showResultList();
if(_2bd.direction){
if(1==_2bd.direction){
this.dropDown.highlightFirstOption();
}else{
if(-1==_2bd.direction){
this.dropDown.highlightLastOption();
}
}
if(_2be){
this._announceOption(this.dropDown.getHighlightedOption());
}
}else{
if(this.autoComplete&&!this._prev_key_backspace&&!/^[*]+$/.test(_2bc[this.searchAttr].toString())){
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
var _2bf=this.get("displayedValue");
var pw=this.dropDown;
if(pw&&(_2bf==pw._messages["previousMessage"]||_2bf==pw._messages["nextMessage"])){
this._setValueAttr(this._lastValueReported,true);
}else{
if(typeof this.item=="undefined"){
this.item=null;
this.set("displayedValue",_2bf);
}else{
if(this.value!=this._lastValueReported){
this._handleOnChange(this.value,true);
}
this._refreshState();
}
}
},_setItemAttr:function(item,_2c0,_2c1){
var _2c2="";
if(item){
if(!_2c1){
_2c1=this.store._oldAPI?this.store.getValue(item,this.searchAttr):item[this.searchAttr];
}
_2c2=this._getValueField()!=this.searchAttr?this.store.getIdentity(item):_2c1;
}
this.set("value",_2c2,_2c0,_2c1,item);
},_announceOption:function(node){
if(!node){
return;
}
var _2c3;
if(node==this.dropDown.nextButton||node==this.dropDown.previousButton){
_2c3=node.innerHTML;
this.item=undefined;
this.value="";
}else{
var item=this.dropDown.items[node.getAttribute("item")];
_2c3=(this.store._oldAPI?this.store.getValue(item,this.searchAttr):item[this.searchAttr]).toString();
this.set("item",item,false,_2c3);
}
this.focusNode.value=this.focusNode.value.substring(0,this._lastInput.length);
this.focusNode.setAttribute("aria-activedescendant",_2ab.get(node,"id"));
this._autoCompleteText(_2c3);
},_selectOption:function(_2c4){
this.closeDropDown();
if(_2c4){
this._announceOption(_2c4);
}
this._setCaretPos(this.focusNode,this.focusNode.value.length);
this._handleOnChange(this.value,true);
},_startSearchAll:function(){
this._startSearch("");
},_startSearchFromInput:function(){
this._startSearch(this.focusNode.value.replace(/([\\\*\?])/g,"\\$1"));
},_getQueryString:function(text){
return _2af.substitute(this.queryExpr,[text]);
},_startSearch:function(key){
if(!this.dropDown){
var _2c5=this.id+"_popup",_2c6=lang.isString(this.dropDownClass)?lang.getObject(this.dropDownClass,false):this.dropDownClass;
this.dropDown=new _2c6({onChange:lang.hitch(this,this._selectOption),id:_2c5,dir:this.dir,textDir:this.textDir});
this.focusNode.removeAttribute("aria-activedescendant");
this.textbox.setAttribute("aria-owns",_2c5);
}
this._lastInput=key;
var _2c7=lang.clone(this.query);
var _2c8={start:0,count:this.pageSize,queryOptions:{ignoreCase:this.ignoreCase,deep:true}};
lang.mixin(_2c8,this.fetchProperties);
var qs=this._getQueryString(key),q;
if(this.store._oldAPI){
q=qs;
}else{
q=_2a8.patternToRegExp(qs,this.ignoreCase);
q.toString=function(){
return qs;
};
}
this._lastQuery=_2c7[this.searchAttr]=q;
var _2c9=this,_2ca=function(){
var _2cb=_2c9._fetchHandle=_2c9.store.query(_2c7,_2c8);
_2aa.when(_2cb,function(res){
_2c9._fetchHandle=null;
res.total=_2cb.total;
_2c9._openResultList(res,_2c7,_2c8);
},function(err){
_2c9._fetchHandle=null;
if(!_2c9._cancelingQuery){
console.error(_2c9.declaredClass+" "+err.toString());
_2c9.closeDropDown();
}
});
};
this.searchTimer=setTimeout(lang.hitch(this,function(_2cc,_2cd){
this.searchTimer=null;
_2ca();
this._nextSearch=this.dropDown.onPage=function(_2ce){
_2c8.start+=_2c8.count*_2ce;
_2c8.direction=_2ce;
_2ca();
_2cd.focus();
};
},_2c7,this),this.searchDelay);
},_getValueField:function(){
return this.searchAttr;
},constructor:function(){
this.query={};
this.fetchProperties={};
},postMixInProperties:function(){
if(!this.store){
var _2cf=this.srcNodeRef;
var list=this.list;
if(list){
this.store=_2b1.byId(list);
}else{
this.store=new _2b0({},_2cf);
}
if(!("value" in this.params)){
var item=(this.item=this.store.fetchSelectedItem());
if(item){
var _2d0=this._getValueField();
this.value=this.store._oldAPI?this.store.getValue(item,_2d0):item[_2d0];
}
}
}
this.inherited(arguments);
},postCreate:function(){
var _2d1=_2ad("label[for=\""+this.id+"\"]");
if(_2d1.length){
_2d1[0].id=(this.id+"_label");
this.domNode.setAttribute("aria-labelledby",_2d1[0].id);
}
this.inherited(arguments);
},_getMenuLabelFromItem:function(item){
var _2d2=this.labelFunc(item,this.store),_2d3=this.labelType;
if(this.highlightMatch!="none"&&this.labelType=="text"&&this._lastInput){
_2d2=this.doHighlight(_2d2,this._escapeHtml(this._lastInput));
_2d3="html";
}
return {html:_2d3=="html",label:_2d2};
},doHighlight:function(_2d4,find){
var _2d5=(this.ignoreCase?"i":"")+(this.highlightMatch=="all"?"g":""),i=this.queryExpr.indexOf("${0}");
find=_2ae.escapeString(find);
return this._escapeHtml(_2d4).replace(new RegExp((i==0?"^":"")+"("+find+")"+(i==(this.queryExpr.length-4)?"$":""),_2d5),"<span class=\"dijitComboBoxHighlightMatch\">$1</span>");
},_escapeHtml:function(str){
str=String(str).replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
return str;
},reset:function(){
this.item=null;
this.inherited(arguments);
},labelFunc:function(item,_2d6){
return (_2d6._oldAPI?_2d6.getValue(item,this.labelAttr||this.searchAttr):item[this.labelAttr||this.searchAttr]).toString();
},_setValueAttr:function(_2d7,_2d8,_2d9,item){
this._set("item",item||null);
if(!_2d7){
_2d7="";
}
this.inherited(arguments);
},_setTextDirAttr:function(_2da){
this.inherited(arguments);
if(this.dropDown){
this.dropDown._set("textDir",_2da);
}
}});
});
},"url:dijit/layout/templates/_ScrollingTabControllerButton.html":"<div data-dojo-attach-event=\"onclick:_onClick\">\n\t<div role=\"presentation\" class=\"dijitTabInnerDiv\" data-dojo-attach-point=\"innerDiv,focusNode\">\n\t\t<div role=\"presentation\" class=\"dijitTabContent dijitButtonContents\" data-dojo-attach-point=\"tabContent\">\n\t\t\t<img role=\"presentation\" alt=\"\" src=\"${_blankGif}\" class=\"dijitTabStripIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t\t<span data-dojo-attach-point=\"containerNode,titleNode\" class=\"dijitButtonText\"></span>\n\t\t</div>\n\t</div>\n</div>","dijit/form/MappedTextBox":function(){
define("dijit/form/MappedTextBox",["dojo/_base/declare","dojo/dom-construct","./ValidationTextBox"],function(_2db,_2dc,_2dd){
return _2db("dijit.form.MappedTextBox",_2dd,{postMixInProperties:function(){
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
this.valueNode=_2dc.place("<input type='hidden'"+(this.name?" name='"+this.name.replace(/'/g,"&quot;")+"'":"")+"/>",this.textbox,"after");
},reset:function(){
this.valueNode.value="";
this.inherited(arguments);
}});
});
},"dijit/form/ComboBoxMixin":function(){
require({cache:{"url:dijit/form/templates/DropDownBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdata-dojo-attach-point=\"_buttonNode, _popupStateNode\" role=\"presentation\"\n\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdata-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\n\t/></div\n></div>\n"}});
define("dijit/form/ComboBoxMixin",["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/kernel","dojo/_base/lang","dojo/store/util/QueryResults","./_AutoCompleterMixin","./_ComboBoxMenu","../_HasDropDown","dojo/text!./templates/DropDownBox.html"],function(_2de,_2df,_2e0,lang,_2e1,_2e2,_2e3,_2e4,_2e5){
return _2de("dijit.form.ComboBoxMixin",[_2e4,_2e2],{dropDownClass:_2e3,hasDownArrow:true,templateString:_2e5,baseClass:"dijitTextBox dijitComboBox",cssStateNodes:{"_buttonNode":"dijitDownArrowButton"},_setHasDownArrowAttr:function(val){
this._set("hasDownArrow",val);
this._buttonNode.style.display=val?"":"none";
},_showResultList:function(){
this.displayMessage("");
this.inherited(arguments);
},_setStoreAttr:function(_2e6){
if(!_2e6.get){
lang.mixin(_2e6,{_oldAPI:true,get:function(id){
var _2e7=new _2df();
this.fetchItemByIdentity({identity:id,onItem:function(_2e8){
_2e7.resolve(_2e8);
},onError:function(_2e9){
_2e7.reject(_2e9);
}});
return _2e7.promise;
},query:function(_2ea,_2eb){
var _2ec=new _2df(function(){
_2ed.abort&&_2ed.abort();
});
var _2ed=this.fetch(lang.mixin({query:_2ea,onBegin:function(_2ee){
_2ec.total=_2ee;
},onComplete:function(_2ef){
_2ec.resolve(_2ef);
},onError:function(_2f0){
_2ec.reject(_2f0);
}},_2eb));
return _2e1(_2ec);
}});
}
this._set("store",_2e6);
},postMixInProperties:function(){
if(this.params.store){
this._setStoreAttr(this.params.store);
}
this.inherited(arguments);
if(!this.params.store){
var _2f1=this.declaredClass;
lang.mixin(this.store,{getValue:function(item,attr){
_2e0.deprecated(_2f1+".store.getValue(item, attr) is deprecated for builtin store.  Use item.attr directly","","2.0");
return item[attr];
},getLabel:function(item){
_2e0.deprecated(_2f1+".store.getLabel(item) is deprecated for builtin store.  Use item.label directly","","2.0");
return item.name;
},fetch:function(args){
_2e0.deprecated(_2f1+".store.fetch() is deprecated for builtin store.","Use store.query()","2.0");
var shim=["dojo/data/ObjectStore"];
require(shim,lang.hitch(this,function(_2f2){
new _2f2({objectStore:this}).fetch(args);
}));
}});
}
}});
});
},"dijit/form/_TextBoxMixin":function(){
define("dijit/form/_TextBoxMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/_base/event","dojo/keys","dojo/_base/lang",".."],function(_2f3,_2f4,dom,_2f5,keys,lang,_2f6){
var _2f7=_2f4("dijit.form._TextBoxMixin",null,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",selectOnClick:false,placeHolder:"",_getValueAttr:function(){
return this.parse(this.get("displayedValue"),this.constraints);
},_setValueAttr:function(_2f8,_2f9,_2fa){
var _2fb;
if(_2f8!==undefined){
_2fb=this.filter(_2f8);
if(typeof _2fa!="string"){
if(_2fb!==null&&((typeof _2fb!="number")||!isNaN(_2fb))){
_2fa=this.filter(this.format(_2fb,this.constraints));
}else{
_2fa="";
}
}
}
if(_2fa!=null&&_2fa!=undefined&&((typeof _2fa)!="number"||!isNaN(_2fa))&&this.textbox.value!=_2fa){
this.textbox.value=_2fa;
this._set("displayedValue",this.get("displayedValue"));
}
if(this.textDir=="auto"){
this.applyTextDir(this.focusNode,_2fa);
}
this.inherited(arguments,[_2fb,_2f9]);
},displayedValue:"",_getDisplayedValueAttr:function(){
return this.filter(this.textbox.value);
},_setDisplayedValueAttr:function(_2fc){
if(_2fc===null||_2fc===undefined){
_2fc="";
}else{
if(typeof _2fc!="string"){
_2fc=String(_2fc);
}
}
this.textbox.value=_2fc;
this._setValueAttr(this.get("value"),undefined);
this._set("displayedValue",this.get("displayedValue"));
if(this.textDir=="auto"){
this.applyTextDir(this.focusNode,_2fc);
}
},format:function(_2fd){
return ((_2fd==null||_2fd==undefined)?"":(_2fd.toString?_2fd.toString():_2fd));
},parse:function(_2fe){
return _2fe;
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
var _2ff=function(e){
var _300=e.charOrCode||e.keyCode||229;
if(e.type=="keydown"){
switch(_300){
case keys.SHIFT:
case keys.ALT:
case keys.CTRL:
case keys.META:
case keys.CAPS_LOCK:
return;
default:
if(_300>=65&&_300<=90){
return;
}
}
}
if(e.type=="keypress"&&typeof _300!="string"){
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
var faux=lang.mixin({},e,{charOrCode:_300,wasConsumed:false,preventDefault:function(){
faux.wasConsumed=true;
e.preventDefault();
},stopPropagation:function(){
e.stopPropagation();
}});
if(this.onInput(faux)===false){
_2f5.stop(faux);
}
if(faux.wasConsumed){
return;
}
setTimeout(lang.hitch(this,"_onInput",faux),0);
};
_2f3.forEach(["onkeydown","onkeypress","onpaste","oncut","oninput","oncompositionend"],function(_301){
this.connect(this.textbox,_301,_2ff);
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
_2f7.selectInputText(this.textbox);
}
});
}
this.inherited(arguments);
this._refreshState();
},reset:function(){
this.textbox.value="";
this.inherited(arguments);
},_setTextDirAttr:function(_302){
if(!this._created||this.textDir!=_302){
this._set("textDir",_302);
this.applyTextDir(this.focusNode,this.focusNode.value);
}
}});
_2f7._setSelectionRange=_2f6._setSelectionRange=function(_303,_304,stop){
if(_303.setSelectionRange){
_303.setSelectionRange(_304,stop);
}
};
_2f7.selectInputText=_2f6.selectInputText=function(_305,_306,stop){
_305=dom.byId(_305);
if(isNaN(_306)){
_306=0;
}
if(isNaN(stop)){
stop=_305.value?_305.value.length:0;
}
try{
_305.focus();
_2f7._setSelectionRange(_305,_306,stop);
}
catch(e){
}
};
return _2f7;
});
},"url:dijit/layout/templates/_TabButton.html":"<div role=\"presentation\" data-dojo-attach-point=\"titleNode\" data-dojo-attach-event='onclick:onClick'>\n    <div role=\"presentation\" class='dijitTabInnerDiv' data-dojo-attach-point='innerDiv'>\n        <div role=\"presentation\" class='dijitTabContent' data-dojo-attach-point='tabContent'>\n        \t<div role=\"presentation\" data-dojo-attach-point='focusNode'>\n\t\t        <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" data-dojo-attach-point='iconNode' />\n\t\t        <span data-dojo-attach-point='containerNode' class='tabLabel'></span>\n\t\t        <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\n\t\t        \t\tdata-dojo-attach-event='onclick: onClickCloseButton' role=\"presentation\">\n\t\t            <span data-dojo-attach-point='closeText' class='dijitTabCloseText'>[x]</span\n\t\t        ></span>\n\t\t\t</div>\n        </div>\n    </div>\n</div>\n","curam/util/Dialog":function(){
define("curam/util/Dialog",["curam/util","curam/define","curam/dialog","curam/util/onLoad","curam/debug","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _307=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.Dialog",{_id:null,_unsubscribes:[],open:function(path,_308,_309){
var url=path+curam.util.makeQueryString(_308);
var _30a={href:url};
var _30b=null;
if(_309){
_30b="width="+_309.width+",height="+_309.height;
}
window.jsModals=true;
curam.util.openModalDialog(_30a,_30b);
},init:function(){
var _30c=curam.util.getTopmostWindow();
var _30d=_30c.dojo.subscribe("/curam/dialog/SetId",null,function(_30e){
curam.util.Dialog._id=_30e;
curam.debug.log(_307.getProperty("curam.util.Dialog.id.success"),curam.util.Dialog._id);
_30c.dojo.unsubscribe(_30d);
});
curam.util.Dialog._unsubscribes.push(_30d);
_30c.dojo.publish("/curam/dialog/init");
if(!curam.util.Dialog._id){
curam.debug.log(_307.getProperty("curam.util.Dialog.id.fail"));
}
dojo.addOnUnload(function(){
curam.util.Dialog._releaseHandlers();
window.parent.dojo.publish("/curam/dialog/iframeUnloaded",[curam.util.Dialog._id,window]);
});
},registerGetTitleFunc:function(_30f){
curam.util.onLoad.addPublisher(function(_310){
_310.title=_30f();
});
},registerGetSizeFunc:function(_311){
curam.util.onLoad.addPublisher(function(_312){
_312.windowOptions=_311();
});
},registerAfterDisplayHandler:function(_313){
var _314=curam.util.getTopmostWindow();
curam.util.Dialog._unsubscribes.push(_314.dojo.subscribe("/curam/dialog/AfterDisplay",null,function(_315){
if(_315==curam.util.Dialog._id){
_313();
}
}));
},registerBeforeCloseHandler:function(_316){
var _317=curam.util.getTopmostWindow();
curam.util.Dialog._unsubscribes.push(_317.dojo.subscribe("/curam/dialog/BeforeClose",null,function(_318){
if(_318===curam.util.Dialog._id){
_316();
}
}));
},pageLoadFinished:function(){
var _319=curam.util.getTopmostWindow();
curam.util.Dialog._unsTokenReleaseHandlers=_319.dojo.subscribe("/curam/dialog/BeforeClose",null,function(_31a){
if(_31a==curam.util.Dialog._id){
curam.util.Dialog._releaseHandlers();
}
});
curam.util.onLoad.execute();
},_releaseHandlers:function(){
var _31b=curam.util.getTopmostWindow();
dojo.forEach(curam.util.Dialog._unsubscribes,_31b.dojo.unsubscribe);
curam.util.Dialog._unsubscribes=[];
_31b.dojo.unsubscribe(curam.util.Dialog._unsTokenReleaseHandlers);
curam.util.Dialog._unsTokenReleaseHandlers=null;
},close:function(_31c,_31d,_31e){
var _31f=curam.dialog.getParentWindow(window);
if(_31c&&!_31d){
curam.dialog.forceParentRefresh();
_31f.curam.util.redirectWindow(null);
}else{
if(_31d){
var _320=_31d;
if(_31d.indexOf("Page.do")==-1&&_31d.indexOf("Action.do")==-1){
_320=_31d+"Page.do"+curam.util.makeQueryString(_31e);
}
_31f.curam.util.redirectWindow(_320);
}
}
var _321=curam.util.getTopmostWindow();
_321.dojo.publish("/curam/dialog/close",[curam.util.Dialog._id]);
},closeAndSubmitParent:function(_322){
var _323=curam.dialog.getParentWindow(window);
var _324=_323.document.forms["mainForm"];
var _325=curam.util.getTopmostWindow();
if(_324==null||_324==undefined){
_325.dojo.publish("/curam/dialog/close",[curam.util.Dialog._id]);
return;
}
var _326=function(_327){
for(var _328 in _327){
if(_327.hasOwnProperty(_328)){
return false;
}
}
return true;
};
if(_322&&!_326(_322)){
var _329=dojo.query("input[type=text])",_324);
var _32a=dojo.filter(_329,function(node){
return node.readOnly==false;
});
dojo.forEach(_32a,function(node){
node.value="";
});
for(var _32b in _322){
var _32c=_32a[parseInt(_32b)];
if(_32c){
var _32d=dojo.query("input[name="+_32c.id+"]",_324)[0];
if(_32d){
_32d.value=_322[_32b];
}else{
_32c.value=_322[_32b];
}
}
}
}else{
}
_323.dojo.publish("/curam/page/refresh");
_324.submit();
_325.dojo.publish("/curam/dialog/close",[curam.util.Dialog._id]);
}});
});
},"curam/ajax":function(){
define("curam/ajax",["curam/util/Request"],function(_32e){
var _32f=function(_330,_331){
this.target=_330;
this.inputProvider=_331||"null";
};
var _332={doRequest:function(_333,_334,_335,_336){
var _337="../servlet/JSONServlet";
var _338=this;
if(_335){
_337="../"+_337;
}
var _339={caller:this.target.id,operation:_333,inputProvider:this.inputProvider,args:_334};
function _33a(_33b,_33c){
_33b=dojo.fromJson(_33b);
if(_33b instanceof Array){
if(_33b.length>1){
if(_33c=="getCodeTableSubset"){
_338.fillCTWithBlank(_33b);
}else{
_338.fillCT(_33b);
}
}else{
if(_33c=="getCodeTableSubset"){
_338.fillCTWithBlank(_33b);
}else{
_338.fillSingle(_33b,true);
}
}
}else{
_338.fillSingle(_33b);
}
};
_32e.post({url:_337,handleAs:"text",load:function(data,evt){
_33a(data,_333);
},error:function(){
alert("error");
},content:{"content":dojo.toJson(_339)},preventCache:true,sync:_336});
},fillCT:function(_33d){
this.target.options.length=0;
for(var i=0;i<_33d.length;i++){
this.target.options[i]=new Option(_33d[i]["descr"],_33d[i]["code"],_33d[i]["default"]);
}
},fillCTWithBlank:function(_33e){
this.target.options.length=0;
this.target.options[0]=new Option("");
for(var i=0;i<_33e.length;i++){
this.target.options[i+1]=new Option(_33e[i]["descr"],_33e[i]["code"]);
}
},fillSingle:function(_33f,_340){
if(_340){
this.target.value=_33f[0]["value"];
}else{
this.target.value=_33f["value"];
}
}};
dojo.mixin(_32f.prototype,_332);
dojo.global.AJAXCall=_32f;
return _32f;
});
},"dijit/_base/window":function(){
define("dijit/_base/window",["dojo/window",".."],function(_341,_342){
_342.getDocumentWindow=function(doc){
return _341.get(doc);
};
});
},"idx/oneui/common":function(){
define("idx/oneui/common",["exports","dojo/_base/sniff","dojo/_base/window","dojo/dom-construct"],function(_343,has,win,_344){
function _345(){
var _346={"1em":0,"1ex":0,"100%":0,"12pt":0,"16px":0,"xx-small":0,"x-small":0,"small":0,"medium":0,"large":0,"x-large":0,"xx-large":0};
var p;
if(has("ie")){
win.doc.documentElement.style.fontSize="100%";
}
var div=_344.create("div",{style:{position:"absolute",left:"0",top:"-100px",width:"30px",height:"1000em",borderWidth:"0",margin:"0",padding:"0",outline:"none",lineHeight:"1",overflow:"hidden"}},win.body());
for(p in _346){
div.style.fontSize=p;
_346[p]=Math.round(div.offsetHeight*12/16)*16/12/1000;
}
win.body().removeChild(div);
return _346;
};
var _347=null;
function _348(_349){
if(_349||!_347){
_347=_345();
}
return _347;
};
_343.normalizedLength=function(len){
if(len.length===0){
return 0;
}
if(len.length>2){
var _34a=_348()["12pt"]/12;
var val=parseFloat(len);
switch(len.slice(-2)){
case "px":
return val;
case "pt":
return val*_34a;
case "in":
return val*72*_34a;
case "pc":
return val*12*_34a;
case "mm":
return val*g.mm_in_pt*_34a;
case "cm":
return val*g.cm_in_pt*_34a;
}
}
return parseFloat(len);
};
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
dojo.mixin(dojo.global.curam.define,{singleton:function(_34b,_34c){
var _34d=_34b.split(".");
var _34e=window;
for(var i=0;i<_34d.length;i++){
var part=_34d[i];
if(typeof _34e[part]=="undefined"){
_34e[part]={};
}
_34e=_34e[part];
}
if(_34c){
dojo.mixin(_34e,_34c);
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
},"idx/oneui/form/TextBox":function(){
require({cache:{"url:idx/oneui/form/templates/TextBox.html":"<div id=\"widget_${id}\" class=\"dijitInline dijitReset dijitLeft idxComposite\"\r\n\t><div class=\"idxLabel dijitInline dijitHidden\"><span class=\"idxRequiredIcon\">*&nbsp</span><label for=\"${id}\" dojoAttachPoint=\"compLabelNode\"></label></div\r\n\t><div class=\"dijitInline\"\r\n\t\t><div dojoAttachPoint='stateNode,oneuiBaseNode' class=\"dijit dijitReset dijitInline dijitLeft\" role=\"presentation\"\r\n\t\t\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\r\n\t\t\t\t><input class=\"dijitReset dijitInputInner\" dojoAttachPoint='textbox,focusNode' autocomplete=\"off\" ${!nameAttrSetting} type='${type}'/\r\n\t\t\t></div\r\n\t\t></div\r\n\t\t><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"></div\r\n\t\t><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\r\n\t\t><div class='dijitValidationIcon'\r\n\t\t><input class=\"dijitReset dijitInputField dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n\t\t></div\r\n\t></div\r\n\t><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\r\n\t></div\r\n></div>\r\n"}});
define("idx/oneui/form/TextBox",["dojo/_base/declare","dojo/dom-style","dijit/form/TextBox","dijit/form/ValidationTextBox","../HoverHelpTooltip","../_CssStateMixin","./_CompositeMixin","dojo/text!./templates/TextBox.html"],function(_34f,_350,_351,_352,_353,_354,_355,_356){
return _34f("idx.oneui.form.TextBox",[_352,_354,_355],{instantValidate:false,templateString:_356,baseClass:"idxTextBoxWrap",oneuiBaseClass:"dijitTextBox dijitValidationTextBox",postCreate:function(){
this.inherited(arguments);
if(this.instantValidate){
this.connect(this,"_onInput",function(){
this.validate(this.focused);
});
}else{
this.connect(this,"_onBlur",function(){
this.validate(this.focused);
});
this.connect(this,"_onFocus",function(){
this._set("state","");
if(this.message==""){
return;
}
this.displayMessage(this.message);
this.message="";
});
this.connect(this,"_onInput",function(){
this.displayMessage();
});
}
this.connect(this.iconNode,"onmouseenter",function(){
if(this.message&&_350.get(this.iconNode,"visibility")=="visible"){
_353.show(this.message,this.iconNode,this.tooltipPosition,!this.isLeftToRight());
}
});
},displayMessage:function(_357){
_353.hide(this.oneuiBaseNode);
_353.hide(this.iconNode);
if(_357&&this.focused){
var node=_350.get(this.iconNode,"visibility")=="hidden"?this.oneuiBaseNode:this.iconNode;
_353.show(_357,node,this.tooltipPosition,!this.isLeftToRight());
}
},_setValueAttr:function(){
_351.prototype._setValueAttr.apply(this,arguments);
},_refreshState:function(){
_351.prototype._refreshState.apply(this,arguments);
}});
});
},"dijit/_OnDijitClickMixin":function(){
define("dijit/_OnDijitClickMixin",["dojo/on","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(on,_358,keys,_359,has,_35a,win){
var _35b=null;
if(has("ie")){
(function(){
var _35c=function(evt){
_35b=evt.srcElement;
};
win.doc.attachEvent("onkeydown",_35c);
_35a.addOnWindowUnload(function(){
win.doc.detachEvent("onkeydown",_35c);
});
})();
}else{
win.doc.addEventListener("keydown",function(evt){
_35b=evt.target;
},true);
}
var _35d=function(node,_35e){
if(/input|button/i.test(node.nodeName)){
return on(node,"click",_35e);
}else{
function _35f(e){
return (e.keyCode==keys.ENTER||e.keyCode==keys.SPACE)&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey;
};
var _360=[on(node,"keypress",function(e){
if(_35f(e)){
_35b=e.target;
e.preventDefault();
}
}),on(node,"keyup",function(e){
if(_35f(e)&&e.target==_35b){
_35b=null;
_35e.call(this,e);
}
}),on(node,"click",function(e){
_35e.call(this,e);
})];
return {remove:function(){
_358.forEach(_360,function(h){
h.remove();
});
}};
}
};
return _359("dijit._OnDijitClickMixin",null,{connect:function(obj,_361,_362){
return this.inherited(arguments,[obj,_361=="ondijitclick"?_35d:_361,_362]);
}});
});
},"dijit/form/_ListMouseMixin":function(){
define("dijit/form/_ListMouseMixin",["dojo/_base/declare","dojo/_base/event","dojo/touch","./_ListBase"],function(_363,_364,_365,_366){
return _363("dijit.form._ListMouseMixin",_366,{postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,_365.press,"_onMouseDown");
this.connect(this.domNode,_365.release,"_onMouseUp");
this.connect(this.domNode,"onmouseover","_onMouseOver");
this.connect(this.domNode,"onmouseout","_onMouseOut");
},_onMouseDown:function(evt){
_364.stop(evt);
if(this._hoveredNode){
this.onUnhover(this._hoveredNode);
this._hoveredNode=null;
}
this._isDragging=true;
this._setSelectedAttr(this._getTarget(evt));
},_onMouseUp:function(evt){
_364.stop(evt);
this._isDragging=false;
var _367=this._getSelectedAttr();
var _368=this._getTarget(evt);
var _369=this._hoveredNode;
if(_367&&_368==_367){
this.onClick(_367);
}else{
if(_369&&_368==_369){
this._setSelectedAttr(_369);
this.onClick(_369);
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
},"dojo/cookie":function(){
define("dojo/cookie",["./_base/kernel","./regexp"],function(dojo,_36a){
dojo.cookie=function(name,_36b,_36c){
var c=document.cookie,ret;
if(arguments.length==1){
var _36d=c.match(new RegExp("(?:^|; )"+_36a.escapeString(name)+"=([^;]*)"));
ret=_36d?decodeURIComponent(_36d[1]):undefined;
}else{
_36c=_36c||{};
var exp=_36c.expires;
if(typeof exp=="number"){
var d=new Date();
d.setTime(d.getTime()+exp*24*60*60*1000);
exp=_36c.expires=d;
}
if(exp&&exp.toUTCString){
_36c.expires=exp.toUTCString();
}
_36b=encodeURIComponent(_36b);
var _36e=name+"="+_36b,_36f;
for(_36f in _36c){
_36e+="; "+_36f;
var _370=_36c[_36f];
if(_370!==true){
_36e+="="+_370;
}
}
document.cookie=_36e;
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
},"url:dijit/form/templates/DropDownBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdata-dojo-attach-point=\"_buttonNode, _popupStateNode\" role=\"presentation\"\n\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdata-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\n\t/></div\n></div>\n","curam/util/ui/refresh/TabRefreshController":function(){
define("curam/util/ui/refresh/TabRefreshController",["curam/debug","curam/util/ui/refresh/RefreshEvent","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _371=new curam.util.ResourceBundle("Debug");
var _372=dojo.declare("curam.util.ui.refresh.TabRefreshController",null,{EVENT_REFRESH_MENU:"/curam/refresh/menu",EVENT_REFRESH_NAVIGATION:"/curam/refresh/navigation",EVENT_REFRESH_CONTEXT:"/curam/refresh/context",EVENT_REFRESH_MAIN:"/curam/refresh/main-content",_tabWidgetId:null,_configOnSubmit:null,_configOnLoad:null,_handler:null,_lastSubmitted:null,_currentlyRefreshing:null,constructor:function(_373,_374){
this._configOnSubmit={};
this._configOnLoad={};
if(!_374){
return;
}
this._tabWidgetId=_373;
dojo.forEach(_374.config,dojo.hitch(this,function(item){
this._configOnSubmit[item.page]=item.onsubmit;
this._configOnLoad[item.page]=item.onload;
}));
},pageSubmitted:function(_375,_376){
new curam.util.ui.refresh.RefreshEvent(curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONSUBMIT,_376);
curam.debug.log("curam.util.ui.refresh.TabRefreshController: "+_371.getProperty("curam.util.ui.refresh.TabRefreshController.submit",[_375,_376]));
if(this._configOnSubmit[_375]){
this._lastSubmitted=_375;
curam.debug.log("curam.util.ui.refresh.TabRefreshController: "+_371.getProperty("curam.util.ui.refresh.TabRefreshController"+"submit.notify"));
}
},pageLoaded:function(_377,_378){
var _379=new curam.util.ui.refresh.RefreshEvent(curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONLOAD,_378);
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_371.getProperty("curam.util.ui.refresh.TabRefreshController.load",[_377,_378]));
if(this._currentlyRefreshing&&this._currentlyRefreshing.equals(_379)){
this._currentlyRefreshing=null;
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_371.getProperty("curam.util.ui.refresh.TabRefreshController"+"refresh"));
return;
}
var _37a={};
if(_378==_379.SOURCE_CONTEXT_MAIN&&this._configOnLoad[_377]){
_37a=this._configOnLoad[_377];
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_371.getProperty("curam.util.ui.refresh.TabRefreshController"+".load.config"));
}
if(this._lastSubmitted){
var cfg=this._configOnSubmit[this._lastSubmitted];
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_371.getProperty("curam.util.ui.refresh.TabRefreshController"+".submit.config",[this._lastSubmitted]));
_37a.details=_37a.details||cfg.details;
_37a.menubar=_37a.menubar||cfg.menubar;
_37a.navigation=_37a.navigation||cfg.navigation;
_37a.mainContent=_37a.mainContent||cfg.mainContent;
this._lastSubmitted=null;
}
this._fireRefreshEvents(_37a);
},_fireRefreshEvents:function(cfg){
var _37b=[];
if(cfg.details){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_371.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.context"));
_37b.push(this.EVENT_REFRESH_CONTEXT+"/"+this._tabWidgetId);
}
if(cfg.menubar){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_371.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.menu"));
_37b.push(this.EVENT_REFRESH_MENU+"/"+this._tabWidgetId);
}
if(cfg.navigation){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_371.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.nav"));
_37b.push(this.EVENT_REFRESH_NAVIGATION+"/"+this._tabWidgetId);
}
if(cfg.mainContent){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_371.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.main"));
this._currentlyRefreshing=new curam.util.ui.refresh.RefreshEvent(curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONLOAD,curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN,null);
_37b.push(this.EVENT_REFRESH_MAIN+"/"+this._tabWidgetId);
}
if(_37b.length>0){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_371.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.log",[_37b.length,_37b]));
this._handler(_37b);
}
},setRefreshHandler:function(_37c){
this._handler=_37c;
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
return _372;
});
},"dijit/_base/popup":function(){
define("dijit/_base/popup",["dojo/dom-class","../popup","../BackgroundIframe"],function(_37d,_37e){
var _37f=_37e._createWrapper;
_37e._createWrapper=function(_380){
if(!_380.declaredClass){
_380={_popupWrapper:(_380.parentNode&&_37d.contains(_380.parentNode,"dijitPopup"))?_380.parentNode:null,domNode:_380,destroy:function(){
}};
}
return _37f.call(this,_380);
};
var _381=_37e.open;
_37e.open=function(args){
if(args.orient&&typeof args.orient!="string"&&!("length" in args.orient)){
var ary=[];
for(var key in args.orient){
ary.push({aroundCorner:key,corner:args.orient[key]});
}
args.orient=ary;
}
return _381.call(this,args);
};
return _37e;
});
},"url:curam/layout/resources/TabContainer.html":"<div class=\"dijitTabContainer\">\r\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\r\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer dijitAlignTop\"></div>\r\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container dijitAlignClient\" data-dojo-attach-point=\"containerNode\"></div>\r\n</div>\r\n","url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n","dojo/_base/url":function(){
define("dojo/_base/url",["./kernel"],function(dojo){
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$"),_382=function(){
var n=null,_383=arguments,uri=[_383[0]];
for(var i=1;i<_383.length;i++){
if(!_383[i]){
continue;
}
var _384=new _382(_383[i]+""),_385=new _382(uri[0]+"");
if(_384.path==""&&!_384.scheme&&!_384.authority&&!_384.query){
if(_384.fragment!=n){
_385.fragment=_384.fragment;
}
_384=_385;
}else{
if(!_384.scheme){
_384.scheme=_385.scheme;
if(!_384.authority){
_384.authority=_385.authority;
if(_384.path.charAt(0)!="/"){
var path=_385.path.substring(0,_385.path.lastIndexOf("/")+1)+_384.path;
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
_384.path=segs.join("/");
}
}
}
}
uri=[];
if(_384.scheme){
uri.push(_384.scheme,":");
}
if(_384.authority){
uri.push("//",_384.authority);
}
uri.push(_384.path);
if(_384.query){
uri.push("?",_384.query);
}
if(_384.fragment){
uri.push("#",_384.fragment);
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
_382.prototype.toString=function(){
return this.uri;
};
return dojo._Url=_382;
});
},"curam/widget/FilteringSelect":function(){
define("curam/widget/FilteringSelect",["dijit/registry","dojo/on","dijit/form/FilteringSelect"],function(_386,on){
var _387=dojo.declare("curam.widget.FilteringSelect",dijit.form.FilteringSelect,{enterKeyOnOpenDropDown:false,postMixInProperties:function(){
if(!this.store){
if(dojo.query("> option",this.srcNodeRef)[0]==undefined){
dojo.create("option",{innerHTML:"<!--__o3_BLANK-->"},this.srcNodeRef);
}
}
if(!this.get("store")&&this.srcNodeRef.value==""){
var _388=this.srcNodeRef,_389=dojo.query("> option[value='']",_388);
if(_389.length&&_389[0].innerHTML!="<!--__o3_BLANK-->"){
this.displayedValue=dojo.trim(_389[0].innerHTML);
}
}
this.inherited(arguments);
},postCreate:function(){
on(this.focusNode,"keydown",function(e){
var _38a=_386.byNode(dojo.byId("widget_"+e.target.id));
if(e.keyCode==dojo.keys.ENTER&&_38a._opened){
_38a.enterKeyOnOpenDropDown=true;
}
});
this.inherited(arguments);
},startup:function(){
this.domNode.setAttribute("role","listbox");
this.inherited(arguments);
},_callbackSetLabel:function(_38b,_38c,_38d,_38e){
if((_38c&&_38c[this.searchAttr]!==this._lastQuery)||(!_38c&&_38b.length&&this.get("store").getIdentity(_38b[0])!=this._lastQuery)){
return;
}
if(!_38b.length){
this.set("value","__o3_INVALID",_38e||(_38e===undefined&&!this.focused),this.textbox.value,null);
}else{
this.set("item",_38b[0],_38e);
}
}});
return _387;
});
},"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n","dojo/text":function(){
define("dojo/text",["./_base/kernel","require","./has","./_base/xhr"],function(dojo,_38f,has,xhr){
var _390;
if(1){
_390=function(url,sync,load){
xhr("GET",{url:url,sync:!!sync,load:load});
};
}else{
if(_38f.getText){
_390=_38f.getText;
}else{
console.error("dojo/text plugin failed to load because loader does not support getText");
}
}
var _391={},_392=function(text){
if(text){
text=text.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _393=text.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_393){
text=_393[1];
}
}else{
text="";
}
return text;
},_394={},_395={},_396={dynamic:true,normalize:function(id,_397){
var _398=id.split("!"),url=_398[0];
return (/^\./.test(url)?_397(url):url)+(_398[1]?"!"+_398[1]:"");
},load:function(id,_399,load){
var _39a=id.split("!"),_39b=_39a.length>1,_39c=_39a[0],url=_399.toUrl(_39a[0]),text=_394,_39d=function(text){
load(_39b?_392(text):text);
};
if(_39c in _391){
text=_391[_39c];
}else{
if(url in _399.cache){
text=_399.cache[url];
}else{
if(url in _391){
text=_391[url];
}
}
}
if(text===_394){
if(_395[url]){
_395[url].push(_39d);
}else{
var _39e=_395[url]=[_39d];
_390(url,!_399.async,function(text){
_391[_39c]=_391[url]=text;
for(var i=0;i<_39e.length;){
_39e[i++](text);
}
delete _395[url];
});
}
}else{
_39d(text);
}
}};
dojo.cache=function(_39f,url,_3a0){
var key;
if(typeof _39f=="string"){
if(/\//.test(_39f)){
key=_39f;
_3a0=url;
}else{
key=_38f.toUrl(_39f.replace(/\./g,"/")+(url?("/"+url):""));
}
}else{
key=_39f+"";
_3a0=url;
}
var val=(_3a0!=undefined&&typeof _3a0!="string")?_3a0.value:_3a0,_3a1=_3a0&&_3a0.sanitize;
if(typeof val=="string"){
_391[key]=val;
return _3a1?_392(val):val;
}else{
if(val===null){
delete _391[key];
return null;
}else{
if(!(key in _391)){
_390(key,true,function(text){
_391[key]=text;
});
}
return _3a1?_392(_391[key]):_391[key];
}
}
};
return _396;
});
},"dojo/uacss":function(){
define("dojo/uacss",["./dom-geometry","./_base/lang","./ready","./_base/sniff","./_base/window"],function(_3a2,lang,_3a3,has,_3a4){
var html=_3a4.doc.documentElement,ie=has("ie"),_3a5=has("opera"),maj=Math.floor,ff=has("ff"),_3a6=_3a2.boxModel.replace(/-/,""),_3a7={"dj_quirks":has("quirks"),"dj_opera":_3a5,"dj_khtml":has("khtml"),"dj_webkit":has("webkit"),"dj_safari":has("safari"),"dj_chrome":has("chrome"),"dj_gecko":has("mozilla")};
if(ie){
_3a7["dj_ie"]=true;
_3a7["dj_ie"+maj(ie)]=true;
_3a7["dj_iequirks"]=has("quirks");
}
if(ff){
_3a7["dj_ff"+maj(ff)]=true;
}
_3a7["dj_"+_3a6]=true;
var _3a8="";
for(var clz in _3a7){
if(_3a7[clz]){
_3a8+=clz+" ";
}
}
html.className=lang.trim(html.className+" "+_3a8);
_3a3(90,function(){
if(!_3a2.isBodyLtr()){
var _3a9="dj_rtl dijitRtl "+_3a8.replace(/ /g,"-rtl ");
html.className=lang.trim(html.className+" "+_3a9+"dj_rtl dijitRtl "+_3a8.replace(/ /g,"-rtl "));
}
});
return has;
});
},"dijit/Tooltip":function(){
require({cache:{"url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n"}});
define("dijit/Tooltip",["dojo/_base/array","dojo/_base/declare","dojo/_base/fx","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/_base/sniff","dojo/_base/window","./_base/manager","./place","./_Widget","./_TemplatedMixin","./BackgroundIframe","dojo/text!./templates/Tooltip.html","."],function(_3aa,_3ab,fx,dom,_3ac,_3ad,_3ae,lang,has,win,_3af,_3b0,_3b1,_3b2,_3b3,_3b4,_3b5){
var _3b6=_3ab("dijit._MasterTooltip",[_3b1,_3b2],{duration:_3af.defaultDuration,templateString:_3b4,postCreate:function(){
win.body().appendChild(this.domNode);
this.bgIframe=new _3b3(this.domNode);
this.fadeIn=fx.fadeIn({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onShow")});
this.fadeOut=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHide")});
},show:function(_3b7,_3b8,_3b9,rtl,_3ba){
if(this.aroundNode&&this.aroundNode===_3b8&&this.containerNode.innerHTML==_3b7){
return;
}
this.domNode.width="auto";
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_3b7;
if(_3ba){
this.set("textDir",_3ba);
}
this.containerNode.align=rtl?"right":"left";
var pos=_3b0.around(this.domNode,_3b8,_3b9&&_3b9.length?_3b9:_3bb.defaultPosition,!rtl,lang.hitch(this,"orient"));
var _3bc=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_3bc.y+((_3bc.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_3bc.x+((_3bc.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}
}
_3ae.set(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_3b8;
},orient:function(node,_3bd,_3be,_3bf,_3c0){
this.connectorNode.style.top="";
var _3c1=_3bf.w-this.connectorNode.offsetWidth;
node.className="dijitTooltip "+{"MR-ML":"dijitTooltipRight","ML-MR":"dijitTooltipLeft","TM-BM":"dijitTooltipAbove","BM-TM":"dijitTooltipBelow","BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_3bd+"-"+_3be];
this.domNode.style.width="auto";
var size=_3ad.getContentBox(this.domNode);
var _3c2=Math.min((Math.max(_3c1,1)),size.w);
var _3c3=_3c2<size.w;
this.domNode.style.width=_3c2+"px";
if(_3c3){
this.containerNode.style.overflow="auto";
var _3c4=this.containerNode.scrollWidth;
this.containerNode.style.overflow="visible";
if(_3c4>_3c2){
_3c4=_3c4+_3ae.get(this.domNode,"paddingLeft")+_3ae.get(this.domNode,"paddingRight");
this.domNode.style.width=_3c4+"px";
}
}
if(_3be.charAt(0)=="B"&&_3bd.charAt(0)=="B"){
var mb=_3ad.getMarginBox(node);
var _3c5=this.connectorNode.offsetHeight;
if(mb.h>_3bf.h){
var _3c6=_3bf.h-((_3c0.h+_3c5)>>1);
this.connectorNode.style.top=_3c6+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_3c0.h/2-_3c5/2,0),mb.h-_3c5)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_3c1);
},_onShow:function(){
if(has("ie")){
this.domNode.style.filter="";
}
},hide:function(_3c7){
if(this._onDeck&&this._onDeck[1]==_3c7){
this._onDeck=null;
}else{
if(this.aroundNode===_3c7){
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
_3aa.forEach(node.children,function(_3c8){
this._setAutoTextDir(_3c8);
},this);
},_setTextDirAttr:function(_3c9){
this._set("textDir",_3c9);
if(_3c9=="auto"){
this._setAutoTextDir(this.containerNode);
}else{
this.containerNode.dir=this.textDir;
}
}});
_3b5.showTooltip=function(_3ca,_3cb,_3cc,rtl,_3cd){
if(_3cc){
_3cc=_3aa.map(_3cc,function(val){
return {after:"after-centered",before:"before-centered"}[val]||val;
});
}
if(!_3bb._masterTT){
_3b5._masterTT=_3bb._masterTT=new _3b6();
}
return _3bb._masterTT.show(_3ca,_3cb,_3cc,rtl,_3cd);
};
_3b5.hideTooltip=function(_3ce){
return _3bb._masterTT&&_3bb._masterTT.hide(_3ce);
};
var _3bb=_3ab("dijit.Tooltip",_3b1,{label:"",showDelay:400,connectId:[],position:[],_setConnectIdAttr:function(_3cf){
_3aa.forEach(this._connections||[],function(_3d0){
_3aa.forEach(_3d0,lang.hitch(this,"disconnect"));
},this);
this._connectIds=_3aa.filter(lang.isArrayLike(_3cf)?_3cf:(_3cf?[_3cf]:[]),function(id){
return dom.byId(id);
});
this._connections=_3aa.map(this._connectIds,function(id){
var node=dom.byId(id);
return [this.connect(node,"onmouseenter","_onHover"),this.connect(node,"onmouseleave","_onUnHover"),this.connect(node,"onfocus","_onHover"),this.connect(node,"onblur","_onUnHover")];
},this);
this._set("connectId",_3cf);
},addTarget:function(node){
var id=node.id||node;
if(_3aa.indexOf(this._connectIds,id)==-1){
this.set("connectId",this._connectIds.concat(id));
}
},removeTarget:function(node){
var id=node.id||node,idx=_3aa.indexOf(this._connectIds,id);
if(idx>=0){
this._connectIds.splice(idx,1);
this.set("connectId",this._connectIds);
}
},buildRendering:function(){
this.inherited(arguments);
_3ac.add(this.domNode,"dijitTooltipData");
},startup:function(){
this.inherited(arguments);
var ids=this.connectId;
_3aa.forEach(lang.isArrayLike(ids)?ids:[ids],this.addTarget,this);
},_onHover:function(e){
if(!this._showTimer){
var _3d1=e.target;
this._showTimer=setTimeout(lang.hitch(this,function(){
this.open(_3d1);
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
},open:function(_3d2){
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
_3bb.show(this.label||this.domNode.innerHTML,_3d2,this.position,!this.isLeftToRight(),this.textDir);
this._connectNode=_3d2;
this.onShow(_3d2,this.position);
},close:function(){
if(this._connectNode){
_3bb.hide(this._connectNode);
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
_3bb._MasterTooltip=_3b6;
_3bb.show=_3b5.showTooltip;
_3bb.hide=_3b5.hideTooltip;
_3bb.defaultPosition=["after-centered","before-centered"];
return _3bb;
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
dojo.string.substitute=function(_3d3,map,_3d4,_3d5){
_3d5=_3d5||dojo.global;
_3d4=_3d4?lang.hitch(_3d5,_3d4):function(v){
return v;
};
return _3d3.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_3d6,key,_3d7){
var _3d8=lang.getObject(key,false,map);
if(_3d7){
_3d8=lang.getObject(_3d7,false,_3d5).call(_3d5,_3d8,key);
}
return _3d4(_3d8,key).toString();
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
},"curam/util/ui/refresh/RefreshEvent":function(){
define("curam/util/ui/refresh/RefreshEvent",[],function(){
var _3d9=dojo.declare("curam.util.ui.refresh.RefreshEvent",null,{TYPE_ONLOAD:"onload",TYPE_ONSUBMIT:"onsubmit",SOURCE_CONTEXT_MAIN:"main-content",SOURCE_CONTEXT_DIALOG:"dialog",SOURCE_CONTEXT_INLINE:"inline",_type:null,_context:null,constructor:function(type,_3da){
if(!type||!_3da){
throw "Required parameters missing.";
}
if(!(type==this.TYPE_ONLOAD||type==this.TYPE_ONSUBMIT)){
throw "Unknown type: "+type;
}
if(!(_3da==this.SOURCE_CONTEXT_DIALOG||_3da==this.SOURCE_CONTEXT_INLINE||_3da==this.SOURCE_CONTEXT_MAIN)){
throw "Unknown context: "+_3da;
}
this._type=type;
this._context=_3da;
},equals:function(_3db){
if(typeof _3db!="object"){
return false;
}
if(_3db.declaredClass!=this.declaredClass){
return false;
}
return this._type===_3db._type&&this._context===_3db._context;
}});
return _3d9;
});
},"dijit/dijit":function(){
define("dijit/dijit",[".","./_base","dojo/parser","./_Widget","./_TemplatedMixin","./_Container","./layout/_LayoutWidget","./form/_FormWidget","./form/_FormValueWidget"],function(_3dc){
return _3dc;
});
},"dijit/form/_FormValueMixin":function(){
define("dijit/form/_FormValueMixin",["dojo/_base/declare","dojo/dom-attr","dojo/keys","dojo/_base/sniff","./_FormWidgetMixin"],function(_3dd,_3de,keys,has,_3df){
return _3dd("dijit.form._FormValueMixin",_3df,{readOnly:false,_setReadOnlyAttr:function(_3e0){
_3de.set(this.focusNode,"readOnly",_3e0);
this._set("readOnly",_3e0);
},postCreate:function(){
this.inherited(arguments);
if(has("ie")){
this.connect(this.focusNode||this.domNode,"onkeydown",this._onKeyDown);
}
if(this._resetValue===undefined){
this._lastValueReported=this._resetValue=this.value;
}
},_setValueAttr:function(_3e1,_3e2){
this._handleOnChange(_3e1,_3e2);
},_handleOnChange:function(_3e3,_3e4){
this._set("value",_3e3);
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
},"dijit/form/_FormWidgetMixin":function(){
define("dijit/form/_FormWidgetMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-style","dojo/_base/lang","dojo/mouse","dojo/_base/sniff","dojo/_base/window","dojo/window","../a11y"],function(_3e5,_3e6,_3e7,_3e8,lang,_3e9,has,win,_3ea,a11y){
return _3e6("dijit.form._FormWidgetMixin",null,{name:"",alt:"",value:"",type:"text",tabIndex:"0",_setTabIndexAttr:"focusNode",disabled:false,intermediateChanges:false,scrollOnFocus:true,_setIdAttr:"focusNode",_setDisabledAttr:function(_3eb){
this._set("disabled",_3eb);
_3e7.set(this.focusNode,"disabled",_3eb);
if(this.valueNode){
_3e7.set(this.valueNode,"disabled",_3eb);
}
this.focusNode.setAttribute("aria-disabled",_3eb?"true":"false");
if(_3eb){
this._set("hovering",false);
this._set("active",false);
var _3ec="tabIndex" in this.attributeMap?this.attributeMap.tabIndex:("_setTabIndexAttr" in this)?this._setTabIndexAttr:"focusNode";
_3e5.forEach(lang.isArray(_3ec)?_3ec:[_3ec],function(_3ed){
var node=this[_3ed];
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
var _3ee=this.connect(this.focusNode,"onfocus",function(){
this.disconnect(_3ef);
this.disconnect(_3ee);
});
var _3ef=this.connect(win.body(),"onmouseup",function(){
this.disconnect(_3ef);
this.disconnect(_3ee);
if(this.focused){
this.focus();
}
});
}
if(this.scrollOnFocus){
this.defer(function(){
_3ea.scrollIntoView(this.domNode);
});
}
this.inherited(arguments);
},isFocusable:function(){
return !this.disabled&&this.focusNode&&(_3e8.get(this.domNode,"display")!="none");
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
},_onChangeActive:false,_handleOnChange:function(_3f0,_3f1){
if(this._lastValueReported==undefined&&(_3f1===null||!this._onChangeActive)){
this._resetValue=this._lastValueReported=_3f0;
}
this._pendingOnChange=this._pendingOnChange||(typeof _3f0!=typeof this._lastValueReported)||(this.compare(_3f0,this._lastValueReported)!=0);
if((this.intermediateChanges||_3f1||_3f1===undefined)&&this._pendingOnChange){
this._lastValueReported=_3f0;
this._pendingOnChange=false;
if(this._onChangeActive){
if(this._onChangeHandle){
this._onChangeHandle.remove();
}
this._onChangeHandle=this.defer(function(){
this._onChangeHandle=null;
this.onChange(_3f0);
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
},"dijit/WidgetSet":function(){
define("dijit/WidgetSet",["dojo/_base/array","dojo/_base/declare","dojo/_base/window","./registry"],function(_3f2,_3f3,win,_3f4){
var _3f5=_3f3("dijit.WidgetSet",null,{constructor:function(){
this._hash={};
this.length=0;
},add:function(_3f6){
if(this._hash[_3f6.id]){
throw new Error("Tried to register widget with id=="+_3f6.id+" but that id is already registered");
}
this._hash[_3f6.id]=_3f6;
this.length++;
},remove:function(id){
if(this._hash[id]){
delete this._hash[id];
this.length--;
}
},forEach:function(func,_3f7){
_3f7=_3f7||win.global;
var i=0,id;
for(id in this._hash){
func.call(_3f7,this._hash[id],i++,this._hash);
}
return this;
},filter:function(_3f8,_3f9){
_3f9=_3f9||win.global;
var res=new _3f5(),i=0,id;
for(id in this._hash){
var w=this._hash[id];
if(_3f8.call(_3f9,w,i++,this._hash)){
res.add(w);
}
}
return res;
},byId:function(id){
return this._hash[id];
},byClass:function(cls){
var res=new _3f5(),id,_3fa;
for(id in this._hash){
_3fa=this._hash[id];
if(_3fa.declaredClass==cls){
res.add(_3fa);
}
}
return res;
},toArray:function(){
var ar=[];
for(var id in this._hash){
ar.push(this._hash[id]);
}
return ar;
},map:function(func,_3fb){
return _3f2.map(this.toArray(),func,_3fb);
},every:function(func,_3fc){
_3fc=_3fc||win.global;
var x=0,i;
for(i in this._hash){
if(!func.call(_3fc,this._hash[i],x++,this._hash)){
return false;
}
}
return true;
},some:function(func,_3fd){
_3fd=_3fd||win.global;
var x=0,i;
for(i in this._hash){
if(func.call(_3fd,this._hash[i],x++,this._hash)){
return true;
}
}
return false;
}});
_3f2.forEach(["forEach","filter","byClass","map","every","some"],function(func){
_3f4[func]=_3f5.prototype[func];
});
return _3f5;
});
},"dojo/store/util/SimpleQueryEngine":function(){
define("dojo/store/util/SimpleQueryEngine",["../../_base/array"],function(_3fe){
return function(_3ff,_400){
switch(typeof _3ff){
default:
throw new Error("Can not query with a "+typeof _3ff);
case "object":
case "undefined":
var _401=_3ff;
_3ff=function(_402){
for(var key in _401){
var _403=_401[key];
if(_403&&_403.test){
if(!_403.test(_402[key])){
return false;
}
}else{
if(_403!=_402[key]){
return false;
}
}
}
return true;
};
break;
case "string":
if(!this[_3ff]){
throw new Error("No filter function "+_3ff+" was found in store");
}
_3ff=this[_3ff];
case "function":
}
function _404(_405){
var _406=_3fe.filter(_405,_3ff);
if(_400&&_400.sort){
_406.sort(function(a,b){
for(var sort,i=0;sort=_400.sort[i];i++){
var _407=a[sort.attribute];
var _408=b[sort.attribute];
if(_407!=_408){
return !!sort.descending==_407>_408?-1:1;
}
}
return 0;
});
}
if(_400&&(_400.start||_400.count)){
var _409=_406.length;
_406=_406.slice(_400.start||0,(_400.start||0)+(_400.count||Infinity));
_406.total=_409;
}
return _406;
};
_404.matches=_3ff;
return _404;
};
});
},"dijit/typematic":function(){
define("dijit/typematic",["dojo/_base/array","dojo/_base/connect","dojo/_base/event","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/_base/sniff","."],function(_40a,_40b,_40c,_40d,lang,on,has,_40e){
var _40f=(_40e.typematic={_fireEventAndReload:function(){
this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=Math.max(this._currentTimeout<0?this._initialDelay:(this._subsequentDelay>1?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay)),this._minDelay);
this._timer=setTimeout(lang.hitch(this,"_fireEventAndReload"),this._currentTimeout);
},trigger:function(evt,_410,node,_411,obj,_412,_413,_414){
if(obj!=this._obj){
this.stop();
this._initialDelay=_413||500;
this._subsequentDelay=_412||0.9;
this._minDelay=_414||10;
this._obj=obj;
this._evt=evt;
this._node=node;
this._currentTimeout=-1;
this._count=-1;
this._callback=lang.hitch(_410,_411);
this._fireEventAndReload();
this._evt=lang.mixin({faux:true},evt);
}
},stop:function(){
if(this._timer){
clearTimeout(this._timer);
this._timer=null;
}
if(this._obj){
this._callback(-1,this._node,this._evt);
this._obj=null;
}
},addKeyListener:function(node,_415,_416,_417,_418,_419,_41a){
if(_415.keyCode){
_415.charOrCode=_415.keyCode;
_40d.deprecated("keyCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}else{
if(_415.charCode){
_415.charOrCode=String.fromCharCode(_415.charCode);
_40d.deprecated("charCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}
}
var _41b=[on(node,_40b._keypress,lang.hitch(this,function(evt){
if(evt.charOrCode==_415.charOrCode&&(_415.ctrlKey===undefined||_415.ctrlKey==evt.ctrlKey)&&(_415.altKey===undefined||_415.altKey==evt.altKey)&&(_415.metaKey===undefined||_415.metaKey==(evt.metaKey||false))&&(_415.shiftKey===undefined||_415.shiftKey==evt.shiftKey)){
_40c.stop(evt);
_40f.trigger(evt,_416,node,_417,_415,_418,_419,_41a);
}else{
if(_40f._obj==_415){
_40f.stop();
}
}
})),on(node,"keyup",lang.hitch(this,function(){
if(_40f._obj==_415){
_40f.stop();
}
}))];
return {remove:function(){
_40a.forEach(_41b,function(h){
h.remove();
});
}};
},addMouseListener:function(node,_41c,_41d,_41e,_41f,_420){
var _421=[on(node,"mousedown",lang.hitch(this,function(evt){
_40c.stop(evt);
_40f.trigger(evt,_41c,node,_41d,node,_41e,_41f,_420);
})),on(node,"mouseup",lang.hitch(this,function(evt){
if(this._obj){
_40c.stop(evt);
}
_40f.stop();
})),on(node,"mouseout",lang.hitch(this,function(evt){
_40c.stop(evt);
_40f.stop();
})),on(node,"mousemove",lang.hitch(this,function(evt){
evt.preventDefault();
})),on(node,"dblclick",lang.hitch(this,function(evt){
_40c.stop(evt);
if(has("ie")<9){
_40f.trigger(evt,_41c,node,_41d,node,_41e,_41f,_420);
setTimeout(lang.hitch(this,_40f.stop),50);
}
}))];
return {remove:function(){
_40a.forEach(_421,function(h){
h.remove();
});
}};
},addListener:function(_422,_423,_424,_425,_426,_427,_428,_429){
var _42a=[this.addKeyListener(_423,_424,_425,_426,_427,_428,_429),this.addMouseListener(_422,_425,_426,_427,_428,_429)];
return {remove:function(){
_40a.forEach(_42a,function(h){
h.remove();
});
}};
}});
return _40f;
});
},"dijit/MenuItem":function(){
require({cache:{"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n"}});
define("dijit/MenuItem",["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/event","dojo/_base/kernel","dojo/_base/sniff","./_Widget","./_TemplatedMixin","./_Contained","./_CssStateMixin","dojo/text!./templates/MenuItem.html"],function(_42b,dom,_42c,_42d,_42e,_42f,has,_430,_431,_432,_433,_434){
return _42b("dijit.MenuItem",[_430,_431,_432,_433],{templateString:_434,baseClass:"dijitMenuItem",label:"",_setLabelAttr:{node:"containerNode",type:"innerHTML"},iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},accelKey:"",disabled:false,_fillContent:function(_435){
if(_435&&!("label" in this.params)){
this.set("label",_435.innerHTML);
}
},buildRendering:function(){
this.inherited(arguments);
var _436=this.id+"_text";
_42c.set(this.containerNode,"id",_436);
if(this.accelKeyNode){
_42c.set(this.accelKeyNode,"id",this.id+"_accel");
_436+=" "+this.id+"_accel";
}
this.domNode.setAttribute("aria-labelledby",_436);
dom.setSelectable(this.domNode,false);
},_onHover:function(){
this.getParent().onItemHover(this);
},_onUnhover:function(){
this.getParent().onItemUnhover(this);
this._set("hovering",false);
},_onClick:function(evt){
this.getParent().onItemClick(this,evt);
_42e.stop(evt);
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
},_setSelected:function(_437){
_42d.toggle(this.domNode,"dijitMenuItemSelected",_437);
},setLabel:function(_438){
_42f.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_438);
},setDisabled:function(_439){
_42f.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_439);
},_setDisabledAttr:function(_43a){
this.focusNode.setAttribute("aria-disabled",_43a?"true":"false");
this._set("disabled",_43a);
},_setAccelKeyAttr:function(_43b){
this.accelKeyNode.style.display=_43b?"":"none";
this.accelKeyNode.innerHTML=_43b;
_42c.set(this.containerNode,"colSpan",_43b?"1":"2");
this._set("accelKey",_43b);
}});
});
},"dijit/layout/TabController":function(){
require({cache:{"url:dijit/layout/templates/_TabButton.html":"<div role=\"presentation\" data-dojo-attach-point=\"titleNode\" data-dojo-attach-event='onclick:onClick'>\n    <div role=\"presentation\" class='dijitTabInnerDiv' data-dojo-attach-point='innerDiv'>\n        <div role=\"presentation\" class='dijitTabContent' data-dojo-attach-point='tabContent'>\n        \t<div role=\"presentation\" data-dojo-attach-point='focusNode'>\n\t\t        <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" data-dojo-attach-point='iconNode' />\n\t\t        <span data-dojo-attach-point='containerNode' class='tabLabel'></span>\n\t\t        <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\n\t\t        \t\tdata-dojo-attach-event='onclick: onClickCloseButton' role=\"presentation\">\n\t\t            <span data-dojo-attach-point='closeText' class='dijitTabCloseText'>[x]</span\n\t\t        ></span>\n\t\t\t</div>\n        </div>\n    </div>\n</div>\n"}});
define("dijit/layout/TabController",["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/i18n","dojo/_base/lang","./StackController","../Menu","../MenuItem","dojo/text!./templates/_TabButton.html","dojo/i18n!../nls/common"],function(_43c,dom,_43d,_43e,i18n,lang,_43f,Menu,_440,_441){
var _442=_43c("dijit.layout._TabButton",_43f.StackButton,{baseClass:"dijitTab",cssStateNodes:{closeNode:"dijitTabCloseButton"},templateString:_441,scrollOnFocus:false,buildRendering:function(){
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
_43e.toggle(this.innerDiv,"dijitClosable",disp);
this.closeNode.style.display=disp?"":"none";
if(disp){
var _443=i18n.getLocalization("dijit","common");
if(this.closeNode){
_43d.set(this.closeNode,"title",_443.itemClose);
}
this._closeMenu=new Menu({id:this.id+"_Menu",dir:this.dir,lang:this.lang,textDir:this.textDir,targetNodeIds:[this.domNode]});
this._closeMenu.addChild(new _440({label:_443.itemClose,dir:this.dir,lang:this.lang,textDir:this.textDir,onClick:lang.hitch(this,"onClickCloseButton")}));
}else{
if(this._closeMenu){
this._closeMenu.destroyRecursive();
delete this._closeMenu;
}
}
},_setLabelAttr:function(_444){
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
var _445=_43c("dijit.layout.TabController",_43f,{baseClass:"dijitTabController",templateString:"<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'></div>",tabPosition:"top",buttonWidget:"curam.widget._TabButton",startup:function(){
this.inherited(arguments);
this.connect(this,"onAddChild",function(page,_446){
var _447=this;
page.controlButton._curamPageId=page.id;
page.controlButton.connect(page.controlButton,"_setCuramVisibleAttr",function(){
if(page.controlButton.curamVisible){
var _448=dojo.map(_447.getChildren(),function(btn){
return btn._curamPageId;
});
var _449=curam.tab.getTabWidgetId(curam.tab.getContainerTab(page.domNode));
var _44a=curam.util.TabNavigation.getInsertIndex(_449,_448,page.id);
_447.addChild(page.controlButton,_44a);
}else{
var _44b=page.controlButton;
if(dojo.indexOf(_447.getChildren(),_44b)!=-1){
_447.removeChild(_44b);
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
var _44c=0;
for(var pane in this.pane2button){
var ow=this.pane2button[pane].innerDiv.scrollWidth;
_44c=Math.max(_44c,ow);
}
for(pane in this.pane2button){
this.pane2button[pane].innerDiv.style.width=_44c+"px";
}
},onButtonClick:function(page){
if(!page.controlButton.get("curamDisabled")){
var _44d=dijit.byId(this.containerId);
_44d.selectChild(page);
}
}});
_445.TabButton=_442;
return _445;
});
},"dijit/layout/_LayoutWidget":function(){
define("dijit/layout/_LayoutWidget",["dojo/_base/lang","../_Widget","../_Container","../_Contained","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/sniff","dojo/_base/window"],function(lang,_44e,_44f,_450,_451,_452,_453,_454,has,win){
return _451("dijit.layout._LayoutWidget",[_44e,_44f,_450],{baseClass:"dijitLayoutContainer",isLayoutContainer:true,buildRendering:function(){
this.inherited(arguments);
_452.add(this.domNode,"dijitContainer");
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
var _455=this.getParent&&this.getParent();
if(!(_455&&_455.isLayoutContainer)){
this.resize();
this.connect(win.global,"onresize",function(){
this.resize();
});
}
},resize:function(_456,_457){
var node=this.domNode;
if(_456){
_453.setMarginBox(node,_456);
}
var mb=_457||{};
lang.mixin(mb,_456||{});
if(!("h" in mb)||!("w" in mb)){
mb=lang.mixin(_453.getMarginBox(node),mb);
}
var cs=_454.getComputedStyle(node);
var me=_453.getMarginExtents(node,cs);
var be=_453.getBorderExtents(node,cs);
var bb=(this._borderBox={w:mb.w-(me.w+be.w),h:mb.h-(me.h+be.h)});
var pe=_453.getPadExtents(node,cs);
this._contentBox={l:_454.toPixelValue(node,cs.paddingLeft),t:_454.toPixelValue(node,cs.paddingTop),w:bb.w-pe.w,h:bb.h-pe.h};
this.layout();
},layout:function(){
},_setupChild:function(_458){
var cls=this.baseClass+"-child "+(_458.baseClass?this.baseClass+"-"+_458.baseClass:"");
_452.add(_458.domNode,cls);
},addChild:function(_459,_45a){
this.inherited(arguments);
if(this._started){
this._setupChild(_459);
}
},removeChild:function(_45b){
var cls=this.baseClass+"-child"+(_45b.baseClass?" "+this.baseClass+"-"+_45b.baseClass:"");
_452.remove(_45b.domNode,cls);
this.inherited(arguments);
}});
});
},"dijit/popup":function(){
define("dijit/popup",["dojo/_base/array","dojo/aspect","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/window","./place","./BackgroundIframe","."],function(_45c,_45d,_45e,_45f,dom,_460,_461,_462,_463,_464,has,keys,lang,on,win,_465,_466,_467){
function _468(){
if(this._popupWrapper){
_461.destroy(this._popupWrapper);
delete this._popupWrapper;
}
};
var _469=_45f(null,{_stack:[],_beginZIndex:1000,_idGen:1,_createWrapper:function(_46a){
var _46b=_46a._popupWrapper,node=_46a.domNode;
if(!_46b){
_46b=_461.create("div",{"class":"dijitPopup",style:{display:"none"},role:"presentation"},win.body());
_46b.appendChild(node);
var s=node.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
_46a._popupWrapper=_46b;
_45d.after(_46a,"destroy",_468,true);
}
return _46b;
},moveOffScreen:function(_46c){
var _46d=this._createWrapper(_46c);
_463.set(_46d,{visibility:"hidden",top:"-9999px",display:""});
},hide:function(_46e){
var _46f=this._createWrapper(_46e);
_463.set(_46f,"display","none");
},getTopPopup:function(){
var _470=this._stack;
for(var pi=_470.length-1;pi>0&&_470[pi].parent===_470[pi-1].widget;pi--){
}
return _470[pi];
},open:function(args){
var _471=this._stack,_472=args.popup,_473=args.orient||["below","below-alt","above","above-alt"],ltr=args.parent?args.parent.isLeftToRight():_462.isBodyLtr(),_474=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+this._idGen++);
while(_471.length&&(!args.parent||!dom.isDescendant(args.parent.domNode,_471[_471.length-1].widget.domNode))){
this.close(_471[_471.length-1].widget);
}
var _475=this._createWrapper(_472);
_460.set(_475,{id:id,style:{zIndex:this._beginZIndex+_471.length},"class":"dijitPopup "+(_472.baseClass||_472["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:args.parent?args.parent.id:""});
if(has("bgIframe")&&!_472.bgIframe){
_472.bgIframe=new _466(_475);
}
var best=_474?_465.around(_475,_474,_473,ltr,_472.orient?lang.hitch(_472,"orient"):null):_465.at(_475,args,_473=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],args.padding);
_475.style.display="";
_475.style.visibility="visible";
_472.domNode.style.visibility="visible";
var _476=[];
_476.push(on(_475,_45e._keypress,lang.hitch(this,function(evt){
if(evt.charOrCode==keys.ESCAPE&&args.onCancel){
_464.stop(evt);
args.onCancel();
}else{
if(evt.charOrCode===keys.TAB){
_464.stop(evt);
var _477=this.getTopPopup();
if(_477&&_477.onCancel){
_477.onCancel();
}
}
}
})));
if(_472.onCancel&&args.onCancel){
_476.push(_472.on("cancel",args.onCancel));
}
_476.push(_472.on(_472.onExecute?"execute":"change",lang.hitch(this,function(){
var _478=this.getTopPopup();
if(_478&&_478.onExecute){
_478.onExecute();
}
})));
_471.push({widget:_472,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:_476});
if(_472.onOpen){
_472.onOpen(best);
}
return best;
},close:function(_479){
var _47a=this._stack;
while((_479&&_45c.some(_47a,function(elem){
return elem.widget==_479;
}))||(!_479&&_47a.length)){
var top=_47a.pop(),_47b=top.widget,_47c=top.onClose;
if(_47b.onClose){
_47b.onClose();
}
var h;
while(h=top.handlers.pop()){
h.remove();
}
if(_47b&&_47b.domNode){
this.hide(_47b);
}
if(_47c){
_47c();
}
}
}});
return (_467.popup=new _469());
});
},"dijit/_base/manager":function(){
define("dijit/_base/manager",["dojo/_base/array","dojo/_base/config","../registry",".."],function(_47d,_47e,_47f,_480){
_47d.forEach(["byId","getUniqueId","findWidgets","_destroyAll","byNode","getEnclosingWidget"],function(name){
_480[name]=_47f[name];
});
_480.defaultDuration=_47e["defaultDuration"]||200;
return _480;
});
},"dijit/layout/StackController":function(){
define("dijit/layout/StackController",["dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/_base/sniff","../focus","../registry","../_Widget","../_TemplatedMixin","../_Container","../form/ToggleButton","dojo/i18n!../nls/common"],function(_481,_482,_483,keys,lang,has,_484,_485,_486,_487,_488,_489){
var _48a=_482("dijit.layout._StackButton",_489,{tabIndex:"-1",closeButton:false,_setCheckedAttr:function(_48b,_48c){
this.inherited(arguments);
this.focusNode.removeAttribute("aria-pressed");
},buildRendering:function(evt){
this.inherited(arguments);
(this.focusNode||this.domNode).setAttribute("role","tab");
},onClick:function(){
_484.focus(this.focusNode);
},onClickCloseButton:function(evt){
evt.stopPropagation();
}});
var _48d=_482("dijit.layout.StackController",[_486,_487,_488],{baseClass:"dijitStackController",templateString:"<span role='tablist' data-dojo-attach-event='onkeypress'></span>",containerId:"",buttonWidget:_48a,constructor:function(){
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
_481.forEach(info.children,this.onAddChild,this);
if(info.selected){
this.onSelectChild(info.selected);
}
},destroy:function(){
for(var pane in this.pane2button){
this.onRemoveChild(_485.byId(pane));
}
this.inherited(arguments);
},onAddChild:function(page,_48e){
var cls=lang.isString(this.buttonWidget)?lang.getObject(this.buttonWidget):this.buttonWidget;
var _48f=new cls({id:this.id+"_"+page.id,label:page.title,dir:page.dir,lang:page.lang,textDir:page.textDir,showLabel:page.showTitle,iconClass:page.iconClass,closeButton:page.closable,title:page.tooltip});
_48f.focusNode.setAttribute("aria-selected","false");
var _490=["title","showTitle","iconClass","closable","tooltip"],_491=["label","showLabel","iconClass","closeButton","title"];
this.pane2watches[page.id]=_481.map(_490,function(_492,idx){
return page.watch(_492,function(name,_493,_494){
_48f.set(_491[idx],_494);
});
});
this.pane2connects[page.id]=[this.connect(_48f,"onClick",lang.hitch(this,"onButtonClick",page)),this.connect(_48f,"onClickCloseButton",lang.hitch(this,"onCloseButtonClick",page))];
this.addChild(_48f,_48e);
this.pane2button[page.id]=_48f;
page.controlButton=_48f;
if(!this._currentChild){
_48f.focusNode.setAttribute("tabIndex","0");
_48f.focusNode.setAttribute("aria-selected","true");
this._currentChild=page;
}
if(!this.isLeftToRight()&&has("ie")&&this._rectifyRtlTabList){
this._rectifyRtlTabList();
}
},onRemoveChild:function(page){
if(this._currentChild===page){
this._currentChild=null;
}
_481.forEach(this.pane2connects[page.id],lang.hitch(this,"disconnect"));
delete this.pane2connects[page.id];
_481.forEach(this.pane2watches[page.id],function(w){
w.unwatch();
});
delete this.pane2watches[page.id];
var _495=this.pane2button[page.id];
if(_495){
this.removeChild(_495);
delete this.pane2button[page.id];
_495.destroy();
}
delete page.controlButton;
},onSelectChild:function(page){
if(!page){
return;
}
if(this._currentChild){
var _496=this.pane2button[this._currentChild.id];
_496.set("checked",false);
_496.focusNode.setAttribute("aria-selected","false");
_496.focusNode.setAttribute("tabIndex","-1");
}
var _497=this.pane2button[page.id];
_497.set("checked",true);
_497.focusNode.setAttribute("aria-selected","true");
this._currentChild=page;
_497.focusNode.setAttribute("tabIndex","0");
var _498=_485.byId(this.containerId);
_498.containerNode.setAttribute("aria-labelledby",_497.id);
},onButtonClick:function(page){
if(this._currentChild.id===page.id){
var _499=this.pane2button[page.id];
_499.set("checked",true);
}
var _49a=_485.byId(this.containerId);
_49a.selectChild(page);
},onCloseButtonClick:function(page){
var _49b=_485.byId(this.containerId);
_49b.closeChild(page);
if(this._currentChild){
var b=this.pane2button[this._currentChild.id];
if(b){
_484.focus(b.focusNode||b.domNode);
}
}
},adjacent:function(_49c){
if(!this.isLeftToRight()&&(!this.tabPosition||/top|bottom/.test(this.tabPosition))){
_49c=!_49c;
}
var _49d=this.getChildren();
var _49e=_481.indexOf(_49d,this.pane2button[this._currentChild.id]);
var _49f=_49c?1:_49d.length-1;
return _49d[(_49e+_49f)%_49d.length];
},onkeypress:function(e){
if(this.disabled||e.altKey){
return;
}
var _4a0=null;
if(e.ctrlKey||!e._djpage){
switch(e.charOrCode){
case keys.LEFT_ARROW:
case keys.UP_ARROW:
if(!e._djpage){
_4a0=false;
}
break;
case keys.PAGE_UP:
if(e.ctrlKey){
_4a0=false;
}
break;
case keys.RIGHT_ARROW:
case keys.DOWN_ARROW:
if(!e._djpage){
_4a0=true;
}
break;
case keys.PAGE_DOWN:
if(e.ctrlKey){
_4a0=true;
}
break;
case keys.HOME:
case keys.END:
var _4a1=this.getChildren();
if(_4a1&&_4a1.length){
_4a1[e.charOrCode==keys.HOME?0:_4a1.length-1].onClick();
}
_483.stop(e);
break;
case keys.DELETE:
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
_483.stop(e);
break;
default:
if(e.ctrlKey){
if(e.charOrCode===keys.TAB){
this.adjacent(!e.shiftKey).onClick();
_483.stop(e);
}else{
if(e.charOrCode=="w"){
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
_483.stop(e);
}
}
}
}
if(_4a0!==null){
this.adjacent(_4a0).onClick();
_483.stop(e);
}
}
},onContainerKeyPress:function(info){
info.e._djpage=info.page;
this.onkeypress(info.e);
}});
_48d.StackButton=_48a;
return _48d;
});
},"curam/util/onLoad":function(){
define("curam/util/onLoad",["curam/util","curam/define","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _4a2=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.onLoad",{EVENT:"/curam/frame/load",publishers:[],subscribers:[],defaultGetIdFunction:function(_4a3){
var _4a4=dojo.attr(_4a3,"class").split(" ");
return dojo.filter(_4a4,function(_4a5){
return _4a5.indexOf("iframe-")==0;
})[0];
},addPublisher:function(_4a6){
curam.util.onLoad.publishers.push(_4a6);
},addSubscriber:function(_4a7,_4a8,_4a9){
curam.util.onLoad.subscribers.push({"getId":_4a9?_4a9:curam.util.onLoad.defaultGetIdFunction,"callback":_4a8,"iframeId":_4a7});
},removeSubscriber:function(_4aa,_4ab,_4ac){
curam.util.onLoad.subscribers=dojo.filter(curam.util.onLoad.subscribers,function(_4ad){
return !(_4ad.iframeId==_4aa&&_4ad.callback==_4ab);
});
},execute:function(){
if(window.parent==window){
curam.debug.log("curam.util.onLoad.execute(): "+_4a2.getProperty("curam.util.onLoad.exit"));
return;
}
var _4ae={};
dojo.forEach(curam.util.onLoad.publishers,function(_4af){
_4af(_4ae);
});
curam.util.onLoad.publishers=[];
require(["dojo/io/iframe"]);
var _4b0=dojo.io.iframe.create(null,null,"about:blank");
dojo.attr(_4b0,"id","ie-progress-indicator-helper");
dojo.attr(_4b0,"title","ie-progress-indicator-helper");
window.parent.dojo.publish(curam.util.onLoad.EVENT,[window.frameElement,_4ae]);
}});
curam.util.subscribe(curam.util.onLoad.EVENT,function(_4b1,_4b2){
dojo.forEach(curam.util.onLoad.subscribers,function(_4b3){
var _4b4=_4b3.getId(_4b1);
if(_4b3.iframeId==_4b4){
_4b3.callback(_4b4,_4b2);
}
});
});
return curam.util.onLoad;
});
},"dijit/layout/TabContainer":function(){
define("dijit/layout/TabContainer",["dojo/_base/lang","dojo/_base/declare","./_TabContainerBase","./TabController","./ScrollingTabController"],function(lang,_4b5,_4b6,_4b7,_4b8){
return _4b5("dijit.layout.TabContainer",_4b6,{useMenu:true,useSlider:true,controllerWidget:"",_makeController:function(_4b9){
var cls=this.baseClass+"-tabs"+(this.doLayout?"":" dijitTabNoLayout"),_4b7=lang.getObject(this.controllerWidget);
return new _4b7({id:this.id+"_tablist",dir:this.dir,lang:this.lang,textDir:this.textDir,tabPosition:this.tabPosition,doLayout:this.doLayout,containerId:this.id,"class":cls,nested:this.nested,useMenu:this.useMenu,useSlider:this.useSlider,tabStripClass:this.tabStrip?this.baseClass+(this.tabStrip?"":"No")+"Strip":null},_4b9);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.controllerWidget){
this.controllerWidget=(this.tabPosition=="top"||this.tabPosition=="bottom")&&!this.nested?"dijit.layout.ScrollingTabController":"dijit.layout.TabController";
}
}});
});
},"dijit/BackgroundIframe":function(){
define("dijit/BackgroundIframe",["require",".","dojo/_base/config","dojo/dom-construct","dojo/dom-style","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window"],function(_4ba,_4bb,_4bc,_4bd,_4be,lang,on,has,win){
has.add("bgIframe",has("ie")||has("mozilla"));
var _4bf=new function(){
var _4c0=[];
this.pop=function(){
var _4c1;
if(_4c0.length){
_4c1=_4c0.pop();
_4c1.style.display="";
}else{
if(has("ie")<9){
var burl=_4bc["dojoBlankHtmlUrl"]||_4ba.toUrl("dojo/resources/blank.html")||"javascript:\"\"";
var html="<iframe src='"+burl+"' role='presentation'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_4c1=win.doc.createElement(html);
}else{
_4c1=_4bd.create("iframe");
_4c1.src="javascript:\"\"";
_4c1.className="dijitBackgroundIframe";
_4c1.setAttribute("role","presentation");
_4be.set(_4c1,"opacity",0.1);
}
_4c1.tabIndex=-1;
}
return _4c1;
};
this.push=function(_4c2){
_4c2.style.display="none";
_4c0.push(_4c2);
};
}();
_4bb.BackgroundIframe=function(node){
if(!node.id){
throw new Error("no id");
}
if(has("bgIframe")){
var _4c3=(this.iframe=_4bf.pop());
node.appendChild(_4c3);
if(has("ie")<7||has("quirks")){
this.resize(node);
this._conn=on(node,"resize",lang.hitch(this,function(){
this.resize(node);
}));
}else{
_4be.set(_4c3,{width:"100%",height:"100%"});
}
}
};
lang.extend(_4bb.BackgroundIframe,{resize:function(node){
if(this.iframe){
_4be.set(this.iframe,{width:node.offsetWidth+"px",height:node.offsetHeight+"px"});
}
},destroy:function(){
if(this._conn){
this._conn.remove();
this._conn=null;
}
if(this.iframe){
_4bf.push(this.iframe);
delete this.iframe;
}
}});
return _4bb.BackgroundIframe;
});
},"curam/util/Constants":function(){
define("curam/util/Constants",["curam/define"],function(){
curam.define.singleton("curam.util.Constants",{RETURN_PAGE_PARAM:"__o3rpu"});
return curam.util.Constants;
});
},"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n","dijit/form/Button":function(){
require({cache:{"url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n"}});
define("dijit/form/Button",["require","dojo/_base/declare","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/ready","./_FormWidget","./_ButtonMixin","dojo/text!./templates/Button.html"],function(_4c4,_4c5,_4c6,_4c7,lang,_4c8,_4c9,_4ca,_4cb){
if(!_4c7.isAsync){
_4c8(0,function(){
var _4cc=["dijit/form/DropDownButton","dijit/form/ComboButton","dijit/form/ToggleButton"];
_4c4(_4cc);
});
}
return _4c5("dijit.form.Button",[_4c9,_4ca],{showLabel:true,iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},baseClass:"dijitButton",templateString:_4cb,_setValueAttr:"valueNode",_onClick:function(e){
var ok=this.inherited(arguments);
if(ok){
if(this.valueNode){
this.valueNode.click();
e.preventDefault();
}
}
return ok;
},_fillContent:function(_4cd){
if(_4cd&&(!this.params||!("label" in this.params))){
var _4ce=lang.trim(_4cd.innerHTML);
if(_4ce){
this.label=_4ce;
}
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
_4c6.toggle(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},setLabel:function(_4cf){
_4c7.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_4cf);
},_setLabelAttr:function(_4d0){
this.inherited(arguments);
if(!this.showLabel&&!("title" in this.params)){
this.titleNode.title=lang.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
}});
});
},"url:dijit/layout/templates/TabContainer.html":"<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" data-dojo-attach-point=\"containerNode\"></div>\n</div>\n","dijit/_WidgetBase":function(){
define("dijit/_WidgetBase",["require","dojo/_base/array","dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/ready","dojo/Stateful","dojo/topic","dojo/_base/window","./registry"],function(_4d1,_4d2,_4d3,_4d4,_4d5,_4d6,dom,_4d7,_4d8,_4d9,_4da,_4db,_4dc,lang,on,_4dd,_4de,_4df,win,_4e0){
var _4e1=typeof (dojo.global.perf)!="undefined";
if(!_4dc.isAsync){
_4dd(0,function(){
var _4e2=["dijit/_base/manager"];
_4d1(_4e2);
});
}
var _4e3={};
function _4e4(obj){
var ret={};
for(var attr in obj){
ret[attr.toLowerCase()]=true;
}
return ret;
};
function _4e5(attr){
return function(val){
_4d7[val?"set":"remove"](this.domNode,attr,val);
this._set(attr,val);
};
};
return _4d6("dijit._WidgetBase",_4de,{id:"",_setIdAttr:"domNode",lang:"",_setLangAttr:_4e5("lang"),dir:"",_setDirAttr:_4e5("dir"),textDir:"","class":"",_setClassAttr:{node:"domNode",type:"class"},style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{},_blankGif:_4d4.blankGif||_4d1.toUrl("dojo/resources/blank.gif"),postscript:function(_4e6,_4e7){
this.create(_4e6,_4e7);
},create:function(_4e8,_4e9){
if(_4e1){
perf.widgetStartedLoadingCallback();
}
this.srcNodeRef=dom.byId(_4e9);
this._connects=[];
this._supportingWidgets=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_4e8){
this.params=_4e8;
lang.mixin(this,_4e8);
}
this.postMixInProperties();
if(!this.id){
this.id=_4e0.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
_4e0.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _4ea=this.srcNodeRef;
if(_4ea&&_4ea.parentNode&&this.domNode!==_4ea){
_4ea.parentNode.replaceChild(this.domNode,_4ea);
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
if(_4e1){
perf.widgetLoadedCallback(this);
}
},_applyAttributes:function(){
var ctor=this.constructor,list=ctor._setterAttrs;
if(!list){
list=(ctor._setterAttrs=[]);
for(var attr in this.attributeMap){
list.push(attr);
}
var _4eb=ctor.prototype;
for(var _4ec in _4eb){
if(_4ec in this.attributeMap){
continue;
}
var _4ed="_set"+_4ec.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
})+"Attr";
if(_4ed in _4eb){
list.push(_4ec);
}
}
}
_4d2.forEach(list,function(attr){
if(this.params&&attr in this.params){
}else{
if(this[attr]){
this.set(attr,this[attr]);
}
}
},this);
for(var _4ee in this.params){
this.set(_4ee,this[_4ee]);
}
},postMixInProperties:function(){
},buildRendering:function(){
if(!this.domNode){
this.domNode=this.srcNodeRef||_4d9.create("div");
}
if(this.baseClass){
var _4ef=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_4ef=_4ef.concat(_4d2.map(_4ef,function(name){
return name+"Rtl";
}));
}
_4d8.add(this.domNode,_4ef);
}
},postCreate:function(){
},startup:function(){
if(this._started){
return;
}
this._started=true;
_4d2.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
},destroyRecursive:function(_4f0){
this._beingDestroyed=true;
this.destroyDescendants(_4f0);
this.destroy(_4f0);
},destroy:function(_4f1){
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
this.destroyRendering(_4f1);
_4e0.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_4f2){
if(this.bgIframe){
this.bgIframe.destroy(_4f2);
delete this.bgIframe;
}
if(this.domNode){
if(_4f2){
_4d7.remove(this.domNode,"widgetId");
}else{
_4d9.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_4f2){
_4d9.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_4f3){
_4d2.forEach(this.getChildren(),function(_4f4){
if(_4f4.destroyRecursive){
_4f4.destroyRecursive(_4f3);
}
});
},uninitialize:function(){
return false;
},_setStyleAttr:function(_4f5){
var _4f6=this.domNode;
if(lang.isObject(_4f5)){
_4db.set(_4f6,_4f5);
}else{
if(_4f6.style.cssText){
_4f6.style.cssText+="; "+_4f5;
}else{
_4f6.style.cssText=_4f5;
}
}
this._set("style",_4f5);
},_attrToDom:function(attr,_4f7,_4f8){
_4f8=arguments.length>=3?_4f8:this.attributeMap[attr];
_4d2.forEach(lang.isArray(_4f8)?_4f8:[_4f8],function(_4f9){
var _4fa=this[_4f9.node||_4f9||"domNode"];
var type=_4f9.type||"attribute";
switch(type){
case "attribute":
if(lang.isFunction(_4f7)){
_4f7=lang.hitch(this,_4f7);
}
var _4fb=_4f9.attribute?_4f9.attribute:(/^on[A-Z][a-zA-Z]*$/.test(attr)?attr.toLowerCase():attr);
_4d7.set(_4fa,_4fb,_4f7);
break;
case "innerText":
_4fa.innerHTML="";
_4fa.appendChild(win.doc.createTextNode(_4f7));
break;
case "innerHTML":
_4fa.innerHTML=_4f7;
break;
case "class":
_4d8.replace(_4fa,_4f7,this[attr]);
break;
}
},this);
},get:function(name){
var _4fc=this._getAttrNames(name);
return this[_4fc.g]?this[_4fc.g]():this[name];
},set:function(name,_4fd){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _4fe=this._getAttrNames(name),_4ff=this[_4fe.s];
if(lang.isFunction(_4ff)){
var _500=_4ff.apply(this,Array.prototype.slice.call(arguments,1));
}else{
var _501=this.focusNode&&!lang.isFunction(this.focusNode)?"focusNode":"domNode",tag=this[_501].tagName,_502=_4e3[tag]||(_4e3[tag]=_4e4(this[_501])),map=name in this.attributeMap?this.attributeMap[name]:_4fe.s in this?this[_4fe.s]:((_4fe.l in _502&&typeof _4fd!="function")||/^aria-|^data-|^role$/.test(name))?_501:null;
if(map!=null){
this._attrToDom(name,_4fd,map);
}
this._set(name,_4fd);
}
return _500||this;
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
});
return (apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr",l:uc.toLowerCase()});
},_set:function(name,_503){
var _504=this[name];
this[name]=_503;
if(this._watchCallbacks&&this._created&&_503!==_504){
this._watchCallbacks(name,_504,_503);
}
},on:function(type,func){
return _4d3.after(this,this._onMap(type),func,true);
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
return this.containerNode?_4e0.findWidgets(this.containerNode):[];
},getParent:function(){
return _4e0.getEnclosingWidget(this.domNode.parentNode);
},connect:function(obj,_505,_506){
var _507=_4d5.connect(obj,_505,this,_506);
this._connects.push(_507);
return _507;
},disconnect:function(_508){
var i=_4d2.indexOf(this._connects,_508);
if(i!=-1){
_508.remove();
this._connects.splice(i,1);
}
},subscribe:function(t,_509){
var _50a=_4df.subscribe(t,lang.hitch(this,_509));
this._connects.push(_50a);
return _50a;
},unsubscribe:function(_50b){
this.disconnect(_50b);
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):_4da.isBodyLtr();
},isFocusable:function(){
return this.focus&&(_4db.get(this.domNode,"display")!="none");
},placeAt:function(_50c,_50d){
if(_50c.declaredClass&&_50c.addChild){
_50c.addChild(this,_50d);
}else{
_4d9.place(this.domNode,_50c,_50d);
}
return this;
},getTextDir:function(text,_50e){
return _50e;
},applyTextDir:function(){
},defer:function(fcn,_50f){
var _510=setTimeout(lang.hitch(this,function(){
_510=null;
if(!this._destroyed){
lang.hitch(this,fcn)();
}
}),_50f||0);
return {remove:function(){
if(_510){
clearTimeout(_510);
_510=null;
}
return null;
}};
}});
});
},"dijit/layout/_TabContainerBase":function(){
require({cache:{"url:dijit/layout/templates/TabContainer.html":"<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" data-dojo-attach-point=\"containerNode\"></div>\n</div>\n"}});
define("dijit/layout/_TabContainerBase",["dojo/text!./templates/TabContainer.html","./StackContainer","./utils","../_TemplatedMixin","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style"],function(_511,_512,_513,_514,_515,_516,_517,_518){
return _515("dijit.layout._TabContainerBase",[_512,_514],{tabPosition:"top",baseClass:"dijitTabContainer",tabStrip:false,nested:false,templateString:_511,postMixInProperties:function(){
this.baseClass+=this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"");
this.srcNodeRef&&_518.set(this.srcNodeRef,"visibility","hidden");
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.tablist=this._makeController(this.tablistNode);
if(!this.doLayout){
_516.add(this.domNode,"dijitTabContainerNoLayout");
}
if(this.nested){
_516.add(this.domNode,"dijitTabContainerNested");
_516.add(this.tablist.containerNode,"dijitTabContainerTabListNested");
_516.add(this.tablistSpacer,"dijitTabContainerSpacerNested");
_516.add(this.containerNode,"dijitTabPaneWrapperNested");
}else{
_516.add(this.domNode,"tabStrip-"+(this.tabStrip?"enabled":"disabled"));
}
},_setupChild:function(tab){
_516.add(tab.domNode,"dijitTabPane");
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
var _519=this.tabPosition.replace(/-h/,"");
this.tablist.layoutAlign=_519;
var _51a=[this.tablist,{domNode:this.tablistSpacer,layoutAlign:_519},{domNode:this.containerNode,layoutAlign:"client"}];
_513.layoutChildren(this.domNode,this._contentBox,_51a);
this._containerContentBox=_513.marginBox2contentBox(this.containerNode,_51a[2]);
if(sc&&sc.resize){
sc.resize(this._containerContentBox);
}
}else{
if(this.tablist.resize){
var s=this.tablist.domNode.style;
s.width="0";
var _51b=_517.getContentBox(this.domNode).w;
s.width="";
this.tablist.resize({w:_51b});
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
define("curam/util/Refresh",["curam/util/Request","curam/define","curam/util","curam/tab","curam/debug","curam/util/ContextPanel","curam/util/ui/refresh/TabRefreshController","curam/util/ResourceBundle"],function(_51c){
dojo.requireLocalization("curam.application","Debug");
var _51d=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.Refresh",{submitted:false,pageSubmitted:"",refreshConfig:[],menuBarCallback:null,navigationCallback:null,refreshedOnTabOpen:{},_controllers:{},_pageRefreshButton:undefined,setMenuBarCallbacks:function(_51e,_51f){
if(!curam.util.Refresh.menuBarCallback){
curam.util.Refresh.menuBarCallback={updateMenuItemStates:_51e,getRefreshParams:_51f};
}
},setNavigationCallbacks:function(_520,_521){
if(!curam.util.Refresh.navigationCallback){
curam.util.Refresh.navigationCallback={updateNavItemStates:_520,getRefreshParams:_521};
}
},refreshMenuAndNavigation:function(_522,_523,_524,_525){
curam.debug.log("curam.util.Refresh.refreshMenuAndNavigation: "+"tabWidgetId=%s, refreshMenuBar || refreshNavigation: %s || %s",_522,_523,_524);
if(_525&&curam.util.Refresh.refreshedOnTabOpen[_522]){
curam.debug.log(_51d.getProperty("curam.util.Refresh.stop"));
return;
}else{
if(_525&&!curam.util.Refresh.refreshedOnTabOpen[_522]){
curam.debug.log(_51d.getProperty("curam.util.Refresh.tab.open"));
curam.util.Refresh.refreshedOnTabOpen[_522]=true;
}else{
curam.debug.log(_51d.getProperty("curam.util.Refresh.detect.refresh"));
curam.debug.log(_51d.getProperty("curam.util.Refresh.refresh"));
}
}
if(!_523&&!_524){
curam.debug.log(_51d.getProperty("curam.util.Refresh.no.refresh"));
curam.util.Refresh.refreshedOnTabOpen[_522]=false;
return;
}
var _526={update:function(_527,_528,_529){
curam.debug.log(_51d.getProperty("curam.util.Refresh.dynamic.refresh"),_528);
var ncb=curam.util.Refresh.navigationCallback;
curam.debug.log("refreshNavigation? ",_524);
if(_524&&_528.navData&&ncb){
ncb.updateNavItemStates(_527,_528);
}
var mcb=curam.util.Refresh.menuBarCallback;
curam.debug.log("refreshMenuBar? ",_523);
if(_523&&_528.menuData&&mcb){
mcb.updateMenuItemStates(_527,_528);
}
},error:function(_52a,_52b){
curam.debug.log("========= "+_51d.getProperty("curam.util.Refresh.dynamic.failure")+" ===========");
curam.debug.log(_51d.getProperty("curam.util.Refresh.dynamic.error"),_52a);
curam.debug.log(_51d.getProperty("curam.util.Refresh.dynamic.args"),_52b);
curam.debug.log("==================================================");
}};
var _52c="servlet/JSONServlet?o3c=TAB_DYNAMIC_STATE_QUERY";
var mcb=curam.util.Refresh.menuBarCallback;
if(_523&&mcb){
var _52d=mcb.getRefreshParams(_522);
if(_52d){
_52c+="&"+_52d;
}
}
var ncb=curam.util.Refresh.navigationCallback;
if(_524&&ncb){
var _52e=ncb.getRefreshParams(_522);
if(_52e){
_52c+="&"+_52e;
}
}
curam.debug.log(_51d.getProperty("curam.util.Refresh.dynamic.refresh.req"));
_51c.post({url:_52c,handleAs:"json",preventCache:true,load:dojo.hitch(_526,"update",_522),error:dojo.hitch(_526,"error")});
},addConfig:function(_52f){
var _530=false;
dojo.forEach(curam.util.Refresh.refreshConfig,function(_531){
if(_531.tab==_52f.tab){
_531.config=_52f.config;
_530=true;
}
});
if(!_530){
curam.util.Refresh.refreshConfig.push(_52f);
}
},setupRefreshController:function(_532){
curam.debug.log("curam.util.Refresh.setupRefreshController "+_51d.getProperty("curam.util.ExpandableLists.load.for"),_532);
var _533=dijit.byId(_532);
var _534=_533.tabDescriptor.tabID;
var _535=dojo.filter(curam.util.Refresh.refreshConfig,function(item){
return item.tab==_534;
});
if(_535.length==1){
var _536=_535[0];
var ctl=new curam.util.ui.refresh.TabRefreshController(_532,_536);
curam.util.Refresh._controllers[_532]=ctl;
ctl.setRefreshHandler(curam.util.Refresh.handleRefreshEvent);
}else{
if(_535.length==0){
curam.debug.log(_51d.getProperty("curam.util.Refresh.no.dynamic.refresh"),_532);
var ctl=new curam.util.ui.refresh.TabRefreshController(_532,null);
curam.util.Refresh._controllers[_532]=ctl;
}else{
throw "curam.util.Refresh: multiple dynamic refresh "+"configurations found for tab "+_532;
}
}
curam.tab.executeOnTabClose(function(){
curam.util.Refresh._controllers[_532].destroy();
curam.util.Refresh._controllers[_532]=undefined;
},_532);
},getController:function(_537){
var ctl=curam.util.Refresh._controllers[_537];
if(!ctl){
throw "Refresh controller for tab '"+_537+"' not found!";
}
return ctl;
},handleOnloadNestedInlinePage:function(_538,_539){
curam.debug.log("curam.util.Refresh.handleOnloadNestedInlinePage "+_51d.getProperty("curam.util.Refresh.iframe",[_538,_539]));
var _53a=curam.util.getTopmostWindow();
var _53b=undefined;
var _53c=curam.tab.getSelectedTab();
if(_53c){
_53b=curam.tab.getTabWidgetId(_53c);
}
if(_53b){
curam.debug.log(_51d.getProperty("curam.util.Refresh.parent"),_53b);
_53a.curam.util.Refresh.getController(_53b).pageLoaded(_539.pageID,curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_INLINE);
_53a.dojo.publish("/curam/main-content/page/loaded",[_539.pageID,_53b]);
return true;
}
return false;
},handleRefreshEvent:function(_53d){
var _53e=function(_53f){
curam.util.ContextPanel.refresh(dijit.byId(_53f));
};
var _540=function(_541){
curam.tab.refreshMainContentPanel(dijit.byId(_541));
};
var _542=function(_543,_544,_545){
curam.util.Refresh.refreshMenuAndNavigation(_543,_544,_545);
};
curam.util.Refresh._doRefresh(_53d,_53e,_540,_542);
},_doRefresh:function(_546,_547,_548,_549){
var _54a=null;
var _54b=false;
var _54c=false;
var _54d=false;
var _54e=false;
var trc=curam.util.ui.refresh.TabRefreshController.prototype;
dojo.forEach(_546,function(_54f){
var _550=_54f.lastIndexOf("/");
var _551=_54f.slice(0,_550);
if(!_54a){
_54a=_54f.slice(_550+1,_54f.length);
}
if(_551==trc.EVENT_REFRESH_MENU){
_54b=true;
}
if(_551==trc.EVENT_REFRESH_NAVIGATION){
_54c=true;
}
if(_551==trc.EVENT_REFRESH_CONTEXT){
_54d=true;
}
if(_551==trc.EVENT_REFRESH_MAIN){
_54e=true;
}
});
if(_54d){
_547(_54a);
}
if(_54e){
_548(_54a);
}
_549(_54a,_54b,_54c);
},setupRefreshButton:function(_552){
dojo.ready(function(){
var _553=dojo.query("."+_552)[0];
if(!_553){
throw "Refresh button not found: "+_552;
}
curam.util.Refresh._pageRefreshButton=_553;
var href=window.location.href;
if(curam.util.isActionPage(href)){
dojo.addClass(_553,"disabled");
curam.util.Refresh._pageRefreshButton._curamDisable=true;
}else{
dojo.addClass(_553,"enabled");
curam.util.Refresh._pageRefreshButton["_curamDisable"]=undefined;
}
curam.util.getTopmostWindow().curam.util.setupPreferencesLink(href);
});
},refreshPage:function(_554){
dojo.stopEvent(_554);
var href=window.location.href;
var _555=curam.util.Refresh._pageRefreshButton._curamDisable;
if(_555){
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
var _556=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.ContextPanel",{CONTENT_URL_ATTRIB:"data-content-url",setupLoadEventPublisher:function(_557,_558,_559){
curam.util.ContextPanel._doSetup(_557,_558,_559,function(_55a){
return dijit.byId(_55a);
});
},_doSetup:function(_55b,_55c,_55d,_55e){
var _55f=curam.util.getTopmostWindow().dojo.subscribe(_55b,function(){
var tab=_55e(_55c);
var _560=curam.util.ContextPanel._getIframe(tab);
curam.debug.log(_556.getProperty("curam.util.ContextPanel.loaded"));
curam.util.getTopmostWindow().dojo.publish("/curam/frame/detailsPanelLoaded",[{loaded:true},_55c]);
_560._finishedLoading=true;
if(_560._scheduledRefresh){
curam.util.ContextPanel.refresh(tab);
_560._scheduledRefresh=false;
}
});
curam.util.onLoad.addSubscriber(_55d,curam.util.ContextPanel.addTitle);
curam.tab.unsubscribeOnTabClose(_55f,_55c);
curam.tab.executeOnTabClose(function(){
curam.util.onLoad.removeSubscriber(_55d,curam.util.ContextPanel.addTitle);
},_55c);
},refresh:function(tab){
var _561=curam.util.ContextPanel._getIframe(tab);
if(_561){
curam.debug.log(_556.getProperty("curam.util.ContextPanel.refresh.prep"));
if(_561._finishedLoading){
curam.debug.log(_556.getProperty("curam.util.ContextPanel.refresh"));
_561._finishedLoading=false;
var doc=_561.contentDocument||_561.contentWindow.document;
doc.location.reload(true);
}else{
curam.debug.log(_556.getProperty("curam.util.ContextPanel.refresh.delay"));
_561._scheduledRefresh=true;
}
}
},_getIframe:function(tab){
var _562=dojo.query("iframe.detailsPanelFrame",tab.domNode);
return _562[0];
},addTitle:function(_563){
var _564=dojo.query("."+_563)[0];
var _565=_564.contentWindow.document.title;
_564.setAttribute("title",CONTEXT_PANEL_TITLE+" - "+_565);
},load:function(tab){
var _566=curam.util.ContextPanel._getIframe(tab);
if(_566){
var _567=dojo.attr(_566,curam.util.ContextPanel.CONTENT_URL_ATTRIB);
if(_567&&_567!="undefined"){
_566[curam.util.ContextPanel.CONTENT_URL_ATTRIB]=undefined;
dojo.attr(_566,"src",_567);
}
}
}});
var _568=curam.util.getTopmostWindow();
if(typeof _568._curamContextPanelTabReadyListenerRegistered!="boolean"){
_568.dojo.subscribe("/curam/application/tab/ready",null,function(_569){
curam.util.ContextPanel.load(_569);
});
_568._curamContextPanelTabReadyListenerRegistered=true;
}
return curam.util.ContextPanel;
});
},"curam/util":function(){
define("curam/util",["dojo/dom","dijit/registry","dojo/dom-construct","dojo/ready","dojo/_base/window","dojo/dom-style","dojo/_base/array","dojo/dom-class","dojo/topic","dojo/_base/event","dojo/query","dojo/has","dojo/_base/unload","dojo/dom-geometry","dojo/_base/json","dojo/dom-attr","dojo/_base/lang","dojo/on","curam/define","curam/debug","curam/util/RuntimeContext","curam/util/Constants","dojo/_base/sniff","cm/_base/_dom","curam/util/ResourceBundle"],function(dom,_56a,_56b,_56c,_56d,_56e,_56f,_570,_571,_572,_573,has,_574,geom,json,attr,lang,on){
dojo.requireLocalization("curam.application","Debug");
var _575=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util",{PREVENT_CACHE_FLAG:"o3pc",INFORMATIONAL_MSGS_STORAGE_ID:"__informationals__",ERROR_MESSAGES_CONTAINER:"error-messages-container",ERROR_MESSAGES_LIST:"error-messages",CACHE_BUSTER:0,CACHE_BUSTER_PARAM_NAME:"o3nocache",msgLocaleSelectorActionPage:"$not-locaized$ Usage of the Language Selector is not permitted from an editable page that has previously been submitted.",insertCssText:function(_576,_577){
var id=_577?_577:"_runtime_stylesheet_";
var _578=dom.byId(id);
var _579;
if(_578){
if(_578.styleSheet){
_576=_578.styleSheet.cssText+_576;
_579=_578;
_579.setAttribute("id","_nodeToRm");
}else{
_578.appendChild(document.createTextNode(_576));
return;
}
}
var pa=document.getElementsByTagName("head")[0];
_578=_56b.create("style",{type:"text/css",id:id});
if(_578.styleSheet){
_578.styleSheet.cssText=_576;
}else{
_578.appendChild(document.createTextNode(_576));
}
pa.appendChild(_578);
if(_579){
_579.parentNode.removeChild(_579);
}
},fireRefreshTreeEvent:function(){
if(dojo.global.parent&&dojo.global.parent.amIFrame){
var wpl=dojo.global.parent.loader;
}
if(wpl&&wpl.dojo){
wpl.dojo.publish("refreshTree");
}
},firePageSubmittedEvent:function(_57a){
require(["curam/tab"],function(){
var _57b=curam.tab.getSelectedTab();
if(_57b){
var _57c=curam.tab.getTabWidgetId(_57b);
var _57d=curam.util.getTopmostWindow();
var ctx=(_57a=="dialog")?curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_DIALOG:curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN;
_57d.curam.util.Refresh.getController(_57c).pageSubmitted(dojo.global.jsPageID,ctx);
_57d.dojo.publish("/curam/main-content/page/submitted",[dojo.global.jsPageID,_57c]);
}else{
curam.debug.log("/curam/main-content/page/submitted: "+_575.getProperty("curam.util.no.open"));
}
});
},fireTabOpenedEvent:function(_57e){
curam.util.getTopmostWindow().dojo.publish("curam.tabOpened",[dojo.global.jsPageID,_57e]);
},setupSubmitEventPublisher:function(){
_56c(function(){
var form=dom.byId("mainForm");
if(form){
curam.util.connect(form,"onsubmit",function(){
curam.util.firePageSubmittedEvent("main-content");
});
}
});
},getScrollbar:function(){
var _57f=_56b.create("div",{},_56d.body());
_56e.set(_57f,{width:"100px",height:"100px",overflow:"scroll",position:"absolute",top:"-300px",left:"0px"});
var test=_56b.create("div",{},_57f);
_56e.set(test,{width:"400px",height:"400px"});
var _580=_57f.offsetWidth-_57f.clientWidth;
_56b.destroy(_57f);
return {width:_580};
},isModalWindow:function(){
return (dojo.global.curamModal===undefined)?false:true;
},getTopmostWindow:function(){
if(typeof (dojo.global._curamTopmostWindow)=="undefined"){
var _581=dojo.global;
if(typeof (dojo.global.jsScreenContext)!="undefined"&&dojo.global.jsScreenContext.hasContextBits("CONTEXT_PORTLET")){
dojo.global._curamTopmostWindow=_581;
}else{
if(_581.__extAppTopWin){
dojo.global._curamTopmostWindow=_581;
}else{
while(_581.parent!=_581){
_581=_581.parent;
if(_581.__extAppTopWin){
break;
}
}
dojo.global._curamTopmostWindow=_581;
}
}
}
if(dojo.global._curamTopmostWindow.location.href.indexOf("AppController.do")<0&&typeof (dojo.global._curamTopmostWindow.__extAppTopWin)=="undefined"){
curam.debug.log(_575.getProperty("curam.util.wrong.window")+dojo.global._curamTopmostWindow.location.href);
}
return dojo.global._curamTopmostWindow;
},getUrlParamValue:function(url,_582){
var qPos=url.indexOf("?");
if(qPos<0){
return null;
}
var _583=url.substring(qPos+1,url.length);
function _584(_585){
var _586=_583.split(_585);
_582+="=";
for(var i=0;i<_586.length;i++){
if(_586[i].indexOf(_582)==0){
return _586[i].split("=")[1];
}
}
};
return _584("&")||_584("");
},addUrlParam:function(href,_587,_588,_589){
var hasQ=href.indexOf("?")>-1;
var _58a=_589?_589:"undefined";
if(!hasQ||(_58a==false)){
return href+(hasQ?"&":"?")+_587+"="+_588;
}else{
var _58b=href.split("?");
href=_58b[0]+"?"+_587+"="+_588+(_58b[1]!=""?("&"+_58b[1]):"");
return href;
}
},replaceUrlParam:function(href,_58c,_58d){
href=curam.util.removeUrlParam(href,_58c);
return curam.util.addUrlParam(href,_58c,_58d);
},removeUrlParam:function(url,_58e,_58f){
var qPos=url.indexOf("?");
if(qPos<0){
return url;
}
if(url.indexOf(_58e+"=")<0){
return url;
}
var _590=url.substring(qPos+1,url.length);
var _591=_590.split("&");
var _592;
var _593,_594;
for(var i=0;i<_591.length;i++){
if(_591[i].indexOf(_58e+"=")==0){
_594=false;
if(_58f){
_593=_591[i].split("=");
if(_593.length>1){
if(_593[1]==_58f){
_594=true;
}
}else{
if(_58f==""){
_594=true;
}
}
}else{
_594=true;
}
if(_594){
_591.splice(i,1);
i--;
}
}
}
return url.substring(0,qPos+1)+_591.join("&");
},stripHash:function(url){
var idx=url.indexOf("#");
if(idx<0){
return url;
}
return url.substring(0,url);
},isSameUrl:function(_595,_596,rtc){
if(!_596){
_596=rtc.getHref();
}
if(_595.indexOf("#")==0){
return true;
}
var _597=_595.indexOf("#");
if(_597>-1){
if(_597==0){
return true;
}
var _598=_595.split("#");
var _599=_596.indexOf("#");
if(_599>-1){
if(_599==0){
return true;
}
_596=_596.split("#")[0];
}
return _598[0]==_596;
}
var _59a=function(url){
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
var here=curam.util.stripHash(rp(_596,curam.util.Constants.RETURN_PAGE_PARAM));
var _59b=curam.util.stripHash(rp(_595,curam.util.Constants.RETURN_PAGE_PARAM));
var _59c=_59b.split("?");
var _59d=here.split("?");
_59d[0]=_59a(_59d[0]);
_59c[0]=_59a(_59c[0]);
var _59e=(_59d[0]==_59c[0]||_59d[0].match(_59c[0]+"$")==_59c[0]);
if(!_59e){
return false;
}
if(_59d.length==1&&_59c.length==1&&_59e){
return true;
}else{
var _59f;
var _5a0;
if(typeof _59d[1]!="undefined"&&_59d[1]!=""){
_59f=_59d[1].split("&");
}else{
_59f=new Array();
}
if(typeof _59c[1]!="undefined"&&_59c[1]!=""){
_5a0=_59c[1].split("&");
}else{
_5a0=new Array();
}
curam.debug.log("curam.util.isSameUrl: paramsHere "+_575.getProperty("curam.util.before")+_59f.length);
_59f=_56f.filter(_59f,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_575.getProperty("curam.util.after")+_59f.length);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_575.getProperty("curam.util.before")+_5a0.length);
_5a0=_56f.filter(_5a0,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_575.getProperty("curam.util.after")+_5a0.length);
if(_59f.length!=_5a0.length){
return false;
}
var _5a1={};
var _5a2;
for(var i=0;i<_59f.length;i++){
_5a2=_59f[i].split("=");
_5a1[_5a2[0]]=_5a2[1];
}
for(var i=0;i<_5a0.length;i++){
_5a2=_5a0[i].split("=");
if(_5a1[_5a2[0]]!=_5a2[1]){
curam.debug.log(_575.getProperty("curam.util.no.match",[_5a2[0],_5a2[1],_5a1[_5a2[0]]]));
return false;
}
}
}
return true;
},isNotCDEJParam:function(_5a3){
return !((_5a3.charAt(0)=="o"&&_5a3.charAt(1)=="3")||(_5a3.charAt(0)=="_"&&_5a3.charAt(1)=="_"&&_5a3.charAt(2)=="o"&&_5a3.charAt(3)=="3"));
},setAttributes:function(node,map){
for(var x in map){
node.setAttribute(x,map[x]);
}
},invalidatePage:function(){
curam.PAGE_INVALIDATED=true;
var _5a4=dojo.global.dialogArguments?dojo.global.dialogArguments[0]:opener;
if(_5a4&&_5a4!=dojo.global){
try{
_5a4.curam.util.invalidatePage();
}
catch(e){
curam.debug.log(_575.getProperty("curam.util.error"),e);
}
}
},redirectWindow:function(href,_5a5,_5a6){
var rtc=new curam.util.RuntimeContext(dojo.global);
var _5a7=function(_5a8,_5a9,href,_5aa,_5ab){
curam.util.getFrameRoot(_5a8,_5a9).curam.util.redirectContentPanel(href,_5aa,_5ab);
};
curam.util._doRedirectWindow(href,_5a5,_5a6,dojo.global.jsScreenContext,rtc,curam.util.publishRefreshEvent,_5a7);
},_doRedirectWindow:function(href,_5ac,_5ad,_5ae,rtc,_5af,_5b0){
if(href&&curam.util.isActionPage(href)){
curam.debug.log(_575.getProperty("curam.util.stopping"),href);
return;
}
var rpl=curam.util.replaceUrlParam;
var _5b1=_5ae.hasContextBits("TREE")||_5ae.hasContextBits("AGENDA")||_5ae.hasContextBits("ORG_TREE");
if(curam.util.FORCE_REFRESH){
href=rpl(rtc.getHref(),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
if(curam.util.isModalWindow()||_5b1){
_5af();
dojo.global.location.href=href;
}else{
if(_5ae.hasContextBits("LIST_ROW_INLINE_PAGE")||_5ae.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(href);
}else{
_5af();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
require(["curam/tab"],function(){
_5b0(dojo.global,curam.tab.getTabController().ROOT_OBJ,href,true,true);
});
}
}
}
return;
}
var u=curam.util;
var rtc=new curam.util.RuntimeContext(dojo.global);
if(!_5b1&&!_5ac&&!curam.PAGE_INVALIDATED&&u.isSameUrl(href,null,rtc)){
return;
}
if(curam.util.isModalWindow()||_5b1){
href=rpl(rpl(href,"o3frame","modal"),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
var form=_56b.create("form",{action:href,method:"POST"});
if(!_5b1){
if(!dom.byId("o3ctx")){
form.action=curam.util.removeUrlParam(form.action,"o3ctx");
var _5b2=_56b.create("input",{type:"hidden",id:"o3ctx",name:"o3ctx",value:_5ae.getValue()},form);
}
_56d.body().appendChild(form);
_5af();
form.submit();
}
if(!_5ad){
if(_5b1){
curam.util.redirectFrame(href);
}
}
}else{
if(_5ae.hasContextBits("LIST_ROW_INLINE_PAGE")||_5ae.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(href);
}else{
_5af();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
if(_5ae.hasContextBits("EXTAPP")){
var _5b3=window.top;
_5b3.dijit.byId("curam-app").updateMainContentIframe(href);
}else{
require(["curam/tab"],function(){
curam.util.getFrameRoot(dojo.global,curam.tab.getTabController().ROOT_OBJ).curam.util.redirectContentPanel(href,_5ac);
});
}
}
}
}
},_handleInlinePageRefresh:function(href){
curam.debug.log(_575.getProperty("curam.util.closing.modal"),href);
var _5b4=new curam.ui.PageRequest(href);
require(["curam/tab"],function(){
curam.tab.getTabController().checkPage(_5b4,function(_5b5){
curam.util.publishRefreshEvent();
dojo.global.location.reload(true);
});
});
},redirectContentPanel:function(url,_5b6,_5b7){
require(["curam/tab"],function(){
var _5b8=curam.tab.getContentPanelIframe();
var _5b9=url;
if(_5b8!=null){
var rpu=curam.util.Constants.RETURN_PAGE_PARAM;
var _5ba=null;
if(url.indexOf(rpu+"=")>=0){
curam.debug.log("curam.util.redirectContentPanel: "+_575.getProperty("curam.util.rpu"));
_5ba=decodeURIComponent(curam.util.getUrlParamValue(url,rpu));
}
if(_5ba){
_5ba=curam.util.removeUrlParam(_5ba,rpu);
_5b9=curam.util.replaceUrlParam(url,rpu,encodeURIComponent(_5ba));
}
}
var _5bb=new curam.ui.PageRequest(_5b9);
if(_5b6){
_5bb.forceLoad=true;
}
if(_5b7){
_5bb.justRefresh=true;
}
curam.tab.getTabController().handlePageRequest(_5bb);
});
},redirectFrame:function(href){
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
var _5bc=curam.util.getFrameRoot(dojo.global,"wizard").targetframe;
_5bc.curam.util.publishRefreshEvent();
_5bc.location.href=href;
}else{
if(dojo.global.jsScreenContext.hasContextBits("ORG_TREE")){
var _5bc=curam.util.getFrameRoot(dojo.global,"orgTreeRoot");
_5bc.curam.util.publishRefreshEvent();
_5bc.dojo.publish("orgTree.refreshContent",[href]);
}else{
var _5bd=curam.util.getFrameRoot(dojo.global,"iegtree");
var _5be=_5bd.navframe||_5bd.frames[0];
var _5bf=_5bd.contentframe||_5bd.frames["contentframe"];
_5bf.curam.util.publishRefreshEvent();
if(curam.PAGE_INVALIDATED||_5be.curam.PAGE_INVALIDATED){
var _5c0=curam.util.modifyUrlContext(href,"ACTION");
_5bf.location.href=_5c0;
}else{
_5bf.location.href=href;
}
}
}
return true;
},publishRefreshEvent:function(){
_571.publish("/curam/page/refresh");
},openGenericErrorModalDialog:function(_5c1,_5c2,_5c3,_5c4,_5c5){
var url;
var _5c6;
var sc=new curam.util.ScreenContext("MODAL");
var _5c7="titlePropertyName="+_5c2+"&";
var _5c8="messagePropertyName="+_5c3+"&";
var _5c9="errorModal="+_5c5+"&";
if(_5c4){
_5c6="messagePlaceholder1="+_5c4+"&";
url="generic-modal-error.jspx?"+_5c7+_5c8+_5c6+_5c9+sc.toRequestString();
}else{
url="generic-modal-error.jspx?"+_5c7+_5c8+sc.toRequestString();
}
curam.util.openModalDialog({href:url},_5c1);
},openModalDialog:function(_5ca,_5cb,left,top,_5cc){
var href;
if(!_5ca||!_5ca.href){
_5ca=_572.fix(_5ca);
var _5cd=_5ca.target;
while(_5cd.tagName!="A"&&_5cd!=_56d.body()){
_5cd=_5cd.parentNode;
}
href=_5cd.href;
_5cd._isModal=true;
_572.stop(_5ca);
}else{
href=_5ca.href;
_5ca._isModal=true;
}
require(["curam/dialog"]);
var opts=curam.dialog.parseWindowOptions(_5cb);
curam.util.showModalDialog(href,_5ca,opts["width"],opts["height"],left,top,false,null,null,_5cc);
return false;
},showModalDialog:function(url,_5ce,_5cf,_5d0,left,top,_5d1,_5d2,_5d3,_5d4){
var _5d5=curam.util.getTopmostWindow();
if(dojo.global!=_5d5){
curam.debug.log("curam.util.showModalDialog: "+_575.getProperty("curam.util.redirecting.modal"));
_5d5.curam.util.showModalDialog(url,_5ce,_5cf,_5d0,left,top,_5d1,_5d2,dojo.global,_5d4);
return;
}
var rup=curam.util.replaceUrlParam;
url=rup(url,"o3frame","modal");
url=curam.util.modifyUrlContext(url,"MODAL","TAB|LIST_ROW_INLINE_PAGE|LIST_EVEN_ROW|NESTED_UIM");
url=rup(url,curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
curam.debug.log(_575.getProperty("curam.util.modal.url"),url);
if(_5cf){
_5cf=typeof (_5cf)=="number"?_5cf:parseInt(_5cf);
}
if(_5d0){
_5d0=typeof (_5d0)=="number"?_5d0:parseInt(_5d0);
}
if(!curam.util._isModalCurrentlyOpening()){
curam.util._setModalCurrentlyOpening(true);
require(["curam/ModalDialog"]);
new curam.ModalDialog({href:url,width:_5cf,height:_5d0,openNode:(_5ce&&_5ce.target)?_5ce.target:null,parentWindow:_5d3,uimToken:_5d4});
}
},_isModalCurrentlyOpening:function(){
return curam.util.getTopmostWindow().curam.util._modalOpenInProgress;
},_setModalCurrentlyOpening:function(_5d6){
curam.util.getTopmostWindow().curam.util._modalOpenInProgress=_5d6;
},setupPreferencesLink:function(href){
_56c(function(){
var _5d7=_573(".user-preferences")[0];
if(_5d7){
if(typeof (_5d7._disconnectToken)=="undefined"){
_5d7._disconnectToken=curam.util.connect(_5d7,"onclick",curam.util.openPreferences);
}
if(!href){
href=dojo.global.location.href;
}
if(curam.util.isActionPage(href)){
_570.replace(_5d7,"disabled","enabled");
_5d7._curamDisable=true;
}else{
_570.replace(_5d7,"enabled","disabled");
_5d7._curamDisable=false;
}
}else{
curam.debug.log(_575.getProperty("curam.util.no.setup"));
}
});
},openPreferences:function(_5d8){
_572.stop(_5d8);
if(_5d8.target._curamDisable){
return;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("user-prefs-editor.jspx",{dialogOptions:"width=450"});
});
},openAbout:function(_5d9){
_572.stop(_5d9);
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("about.jsp",{dialogOptions:"width=645,height=480"});
});
},addMinWidthCalendarCluster:function(id){
var _5da=dom.byId(id);
var i=0;
function _5db(evt){
_56f.forEach(_5da.childNodes,function(node){
if(_570.contains(node,"cluster")){
_56e.set(node,"width","97%");
if(node.clientWidth<700){
_56e.set(node,"width","700px");
}
}
});
};
if(has("ie")>6){
_56f.forEach(_5da.childNodes,function(node){
if(_570.contains(node,"cluster")){
_56e.set(node,"minWidth","700px");
}
});
}else{
on(dojo.global,"resize",_5db);
_56c(_5db);
}
},addPopupFieldListener:function(id){
if(!has("ie")||has("ie")>6){
return;
}
if(!curam.util._popupFields){
function _5dc(evt){
var _5dd=0;
var j=0;
var x=0;
var arr=curam.util._popupFields;
_56f.forEach(curam.util._popupFields,function(id){
var _5de=dom.byId(id);
_573("> .popup-actions",_5de).forEach(function(node){
_5dd=node.clientWidth+30;
});
_573("> .desc",_5de).forEach(function(node){
_56e.set(node,"width",Math.max(0,_5de.clientWidth-_5dd)+"px");
});
});
};
curam.util._popupFields=[id];
on(dojo.global,"resize",_5dc);
_56c(_5dc);
}else{
curam.util._popupFields.push(id);
}
},addContentWidthListener:function(id){
if(has("ie")>6){
return;
}
var _5df=_56e.set;
var _5e0=_570.contains;
function _5e1(evt){
var i=0;
var _5e2=dom.byId("content");
if(_5e2){
var _5e3=_5e2.clientWidth;
if(has("ie")==6&&dom.byId("footer")){
var _5e4=_56d.body().clientHeight-100;
_5df(_5e2,"height",_5e4+"px");
var _5e5=dom.byId("sidebar");
if(_5e5){
_5df(_5e5,"height",_5e4+"px");
}
}
try{
_573("> .page-title-bar",_5e2).forEach(function(node){
var _5e6=geom.getMarginSize(node).w-geom.getContentBox(node).w;
if(!has("ie")){
_5e6+=1;
}
_5e3=_5e2.clientWidth-_5e6;
_56e.set(node,"width",_5e3+"px");
});
}
catch(e){
}
_573("> .page-description",_5e2).style("width",_5e3+"px");
_573("> .in-page-navigation",_5e2).style("width",_5e3+"px");
}
};
curam.util.subscribe("/clusterToggle",_5e1);
curam.util.connect(dojo.global,"onresize",_5e1);
_56c(_5e1);
},alterScrollableListBottomBorder:function(id,_5e7){
var _5e8=_5e7;
var _5e9="#"+id+" table";
function _5ea(){
var _5eb=_573(_5e9)[0];
if(_5eb.offsetHeight>=_5e8){
var _5ec=_573(".odd-last-row",_5eb)[0];
if(typeof _5ec!="undefined"){
_570.add(_5ec,"no-bottom-border");
}
}else{
if(_5eb.offsetHeight<_5e8){
var _5ec=_573(".even-last-row",_5eb)[0];
if(typeof _5ec!="undefined"){
_570.add(_5ec,"add-bottom-border");
}
}else{
curam.debug.log("curam.util.alterScrollableListBottomBorder: "+_575.getProperty("curam.util.code"));
}
}
};
_56c(_5ea);
},addFileUploadResizeListener:function(code){
function _5ed(evt){
if(_573(".widget")){
_573(".widget").forEach(function(_5ee){
var _5ef=_5ee.clientWidth;
if(_573(".fileUpload",_5ee)){
_573(".fileUpload",_5ee).forEach(function(_5f0){
fileUploadWidth=_5ef/30;
if(fileUploadWidth<4){
_5f0.size=1;
}else{
_5f0.size=fileUploadWidth;
}
});
}
});
}
};
on(dojo.global,"resize",_5ed);
_56c(_5ed);
},openCenteredNonModalWindow:function(url,_5f1,_5f2,name){
_5f1=Number(_5f1);
_5f2=Number(_5f2);
var _5f3=(screen.width-_5f1)/2;
var _5f4=(screen.height-_5f2)/2;
_5f2=_5f4<0?screen.height:_5f2;
_5f4=Math.max(0,_5f4);
_5f1=_5f3<0?screen.width:_5f1;
_5f3=Math.max(0,_5f3);
var left="left",top="top";
if(has("ff")){
left="screenX",top="screenY";
}
var _5f5="location=no, menubar=no, status=no, toolbar=no, "+"scrollbars=yes, resizable=no";
var _5f6=dojo.global.open(url,name||"name","width="+_5f1+", height="+_5f2+", "+left+"="+_5f3+","+top+"="+_5f4+","+_5f5);
_5f6.resizeTo(_5f1,_5f2);
_5f6.moveTo(_5f3,_5f4);
_5f6.focus();
},adjustTargetContext:function(win,href){
if(win&&win.dojo.global.jsScreenContext){
var _5f7=win.dojo.global.jsScreenContext;
_5f7.updateStates(dojo.global.jsScreenContext);
return curam.util.replaceUrlParam(href,"o3ctx",_5f7.getValue());
}
return href;
},modifyUrlContext:function(url,_5f8,_5f9){
var _5fa=url;
var ctx=new curam.util.ScreenContext();
var _5fb=curam.util.getUrlParamValue(url,"o3ctx");
if(_5fb){
ctx.setContext(_5fb);
}else{
ctx.clear();
}
if(_5f8){
ctx.addContextBits(_5f8);
}
if(_5f9){
ctx.clear(_5f9);
}
_5fa=curam.util.replaceUrlParam(url,"o3ctx",ctx.getValue());
return _5fa;
},updateCtx:function(_5fc){
var _5fd=curam.util.getUrlParamValue(_5fc,"o3ctx");
if(!_5fd){
return _5fc;
}
return curam.util.modifyUrlContext(_5fc,null,"MODAL");
},getFrameRoot:function(_5fe,_5ff){
var _600=false;
var _601=_5fe;
if(_601){
while(_601!=top&&!_601.rootObject){
_601=_601.parent;
}
if(_601.rootObject){
_600=(_601.rootObject==_5ff);
}
}
return _600?_601:null;
},saveInformationalMsgs:function(_602){
curam.util.runStorageFn(function(){
try{
var _603=curam.util.getTopmostWindow().dojox;
_603.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,json.toJson({pageID:_56d.body().id,total:dom.byId(curam.util.ERROR_MESSAGES_CONTAINER).innerHTML,listItems:dom.byId(curam.util.ERROR_MESSAGES_LIST).innerHTML}));
}
catch(e){
curam.debug.log(_575.getProperty("curam.util.exception"),e);
}
},_602);
},runStorageFn:function(fn,_604){
var _605=function(){
fn();
if(_604){
setTimeout(_604,10);
}
};
var _606=curam.util.getTopmostWindow().dojox;
require(["dojox/storage"],function(){
var mgr=_606.storage.manager;
if(mgr.isInitialized()){
_605();
}else{
if(mgr.addOnLoad){
mgr.addOnLoad(_605);
}else{
var _607={exp:_605};
on(mgr,"loaded",_607,"exp");
}
}
});
},disableInformationalLoad:function(){
curam.util._informationalsDisabled=true;
},redirectDirectUrl:function(){
_56c(function(){
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
_56c(function(){
if(dojo.global.jsScreenContext.hasContextBits("CONTEXT_PANEL")){
return;
}
if(curam.util._informationalsDisabled){
return;
}
curam.util.runStorageFn(function(){
var _608=curam.util.getTopmostWindow().dojox;
var msgs=_608.storage.get(curam.util.INFORMATIONAL_MSGS_STORAGE_ID);
if(msgs&&msgs!=""){
msgs=json.fromJson(msgs);
_608.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,"");
var div=dom.byId(curam.util.ERROR_MESSAGES_CONTAINER);
var list=dom.byId(curam.util.ERROR_MESSAGES_LIST);
if(msgs.pageID!=_56d.body().id){
return;
}
if(list){
var _609=_56b.create("ul",{innerHTML:msgs.listItems});
var _60a=[];
for(var i=0;i<list.childNodes.length;i++){
if(list.childNodes[i].tagName=="LI"){
_60a.push(list.childNodes[i]);
}
}
var skip=false;
var _60b=_609.childNodes;
for(var i=0;i<_60b.length;i++){
skip=false;
for(var j=0;j<_60a.length;j++){
if(_60b[i].innerHTML==_60a[j].innerHTML){
skip=true;
break;
}
}
if(!skip){
list.appendChild(_60b[i]);
i--;
}
}
}else{
if(div){
div.innerHTML=msgs.total;
}
}
}
var _60c=dojo.byId("error-messages");
if(_60c&&!dojo.global.jsScreenContext.hasContextBits("MODAL")){
_60c.focus();
}
});
});
},setFocus:function(){
var _60d=curam.util.getUrlParamValue(dojo.global.location.href,"o3frame")=="modal";
if(!_60d){
_56c(curam.util.doSetFocus);
}
},doSetFocus:function(){
var _60e=-1;
var _60f=-1;
var form=document.forms[0];
if(!form){
return false;
}
var _610=form.elements;
var l=_610.length;
var elem;
for(var i=0;i<l;i++){
elem=_610[i];
if(_60e==-1&&(elem.type=="select-one"||elem.type=="text"||elem.tagName=="TEXTAREA")&&!_570.contains(elem,"dijitArrowButtonInner")&&!_570.contains(elem,"dijitValidationInner")){
_60e=i;
}
if(elem.tabIndex=="1"){
elem.tabIndex=0;
_60f=i;
break;
}
}
var elem;
if(_60f!=-1){
elem=_610[_60f];
}else{
if(_60e!=-1){
elem=_610[_60e];
}
}
try{
var _611=dojo.byId("error-messages");
if(_611){
_611.focus();
}else{
elem.focus();
}
}
catch(e){
curam.debug.log(_575.getProperty("curam.util.error.focus"),e.message);
return false;
}
return true;
},openLocaleSelector:function(_612){
_612=_572.fix(_612);
var _613=_612.target;
while(_613&&_613.tagName!="A"){
_613=_613.parentNode;
}
var loc=_613.href;
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
var _614=curam.util.getLastPathSegmentWithQueryString(url);
var _615=_614.split("?")[0];
return _615.indexOf("Action.do")>-1;
},closeLocaleSelector:function(_616){
_616=_572.fix(_616);
_572.stop(_616);
dojo.global.close();
return false;
},getSuffixFromClass:function(node,_617){
var _618=attr.get(node,"class").split(" ");
var _619=_56f.filter(_618,function(_61a){
return _61a.indexOf(_617)==0;
});
if(_619.length>0){
return _619[0].split(_617)[1];
}else{
return null;
}
},getCacheBusterParameter:function(){
return this.CACHE_BUSTER_PARAM_NAME+"="+new Date().getTime()+"_"+this.CACHE_BUSTER++;
},stripeTable:function(_61b,_61c,_61d){
var _61e=_61b.tBodies[0];
var _61f=(_61c?2:1);
if(_61e.rows.length<_61f){
return;
}
var rows=_61e.rows;
for(var i=0;i<rows.length;i+=_61f){
curam.debug.log("curam.util.stripeTable(%s, %s): i = %s",_61b,_61c,i);
var _620=[rows[i]];
if(_61c&&rows[i+1]){
_620.push(rows[i+1]);
}
_56f.forEach(_620,function(row){
_570.remove(row,"odd-last-row");
_570.remove(row,"even-last-row");
});
if(i%(2*_61f)==0){
_56f.forEach(_620,function(row){
cm.replaceClass(row,"odd","even");
});
if(i==_61d){
_56f.forEach(_620,function(row){
_570.add(row,"odd-last-row");
});
}
}else{
_56f.forEach(_620,function(row){
cm.replaceClass(row,"even","odd");
});
if(i==_61d){
_56f.forEach(_620,function(row){
_570.add(row,"even-last-row");
});
}
}
}
},fillString:function(_621,_622){
var _623="";
while(_622>0){
_623+=_621;
_622-=1;
}
return _623;
},updateHeader:function(qId,_624,_625,_626){
var _627=dom.byId("header_"+qId);
_627.firstChild.nextSibling.innerHTML=_624;
answerCell=dom.byId("chosenAnswer_"+qId);
answerCell.innerHTML=_625;
sourceCell=dom.byId("chosenSource_"+qId);
sourceCell.innerHTML=_626;
},search:function(_628,_629){
var _62a=_56a.byId(_628).get("value");
var _62b=_56a.byId(_629);
var _62c=_62b?_62b.get("value"):null;
var _62d="";
var _62e;
var _62f;
if(_62c){
_62f=_62c.split("|");
_62d=_62f[0];
_62e=_62f[1];
}
var _630=curam.util.defaultSearchPageID;
var _631="";
if(_62d===""){
_631=_630+"Page.do?searchText="+encodeURIComponent(_62a);
}else{
_631=_62e+"Page.do?searchText="+encodeURIComponent(_62a)+"&searchType="+encodeURIComponent(_62d);
}
var _632=new curam.ui.PageRequest(_631);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_632);
});
},updateDefaultSearchText:function(_633,_634){
var _635=_56a.byId(_633);
var _636=_56a.byId(_634);
var _637=_635?_635.get("value"):null;
var str=_637.split("|")[2];
_636.set("placeHolder",str);
},updateSearchBtnState:function(_638,_639){
var _63a=_56a.byId(_638);
var btn=dom.byId(_639);
var _63b=_63a.get("value");
if(!_63b||lang.trim(_63b).length<1){
_570.add(btn,"dijitDisabled");
}else{
_570.remove(btn,"dijitDisabled");
}
},furtherOptionsSearch:function(){
var _63c=curam.util.furtherOptionsPageID+"Page.do";
var _63d=new curam.ui.PageRequest(_63c);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_63d);
});
},searchButtonStatus:function(_63e){
var btn=dojo.byId(_63e);
if(!dojo.hasClass(btn,"dijitDisabled")){
return true;
}
},getPageHeight:function(){
var _63f=400;
var _640=0;
if(_573("frameset").length>0){
curam.debug.log("curam.util.getPageHeight() "+_575.getProperty("curam.util.default.height"),_63f);
_640=_63f;
}else{
var _641=function(node){
if(!node){
curam.debug.log(_575.getProperty("curam.util.node"));
return 0;
}
var mb=geom.getMarginSize(node);
var pos=geom.position(node);
return pos.y+mb.h;
};
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")){
var _642=_573("div.bottom")[0];
var _643=_641(_642);
curam.debug.log(_575.getProperty("curam.util.page.height"),_643);
curam.debug.log(_575.getProperty("curam.util.ie7.issue"));
_640=_643+1;
}else{
var _644=dom.byId("content")||dom.byId("wizard-content");
var _645=_573("> *",_644).filter(function(n){
return n.tagName.indexOf("SCRIPT")<0&&_56e.get(n,"visibility")!="hidden"&&_56e.get(n,"display")!="none";
});
var _646=_645[0];
for(var i=1;i<_645.length;i++){
if(_641(_645[i])>=_641(_646)){
_646=_645[i];
}
}
_640=_641(_646);
curam.debug.log("curam.util.getPageHeight() "+_575.getProperty("curam.util.base.height"),_640);
var _647=_573(".actions-panel",_56d.body());
if(_647.length>0){
var _648=geom.getMarginBox(_647[0]).h;
curam.debug.log("curam.util.getPageHeight() "+_575.getProperty("curam.util.panel.height"));
_640+=_648;
_640+=10;
}
var _649=_573("body.details");
if(_649.length>0){
curam.debug.log("curam.util.getPageHeight() "+_575.getProperty("curam.util.bar.height"));
_640+=20;
}
}
}
curam.debug.log("curam.util.getPageHeight() "+_575.getProperty("curam.util.returning"),_640);
return _640;
},toCommaSeparatedList:function(_64a){
var _64b="";
for(var i=0;i<_64a.length;i++){
_64b+=_64a[i];
if(i<_64a.length-1){
_64b+=",";
}
}
return _64b;
},skipLinkFocus:function(){
var dest=dojo.byId("skip-dest");
if(dest){
dest.focus();
}
},setupGenericKeyHandler:function(){
_56c(function(){
var f=function(_64c){
if(dojo.global.jsScreenContext.hasContextBits("MODAL")&&_64c.keyCode==27){
var ev=_572.fix(_64c);
var _64d=_56a.byId(ev.target.id);
var _64e=typeof _64d!="undefined"&&_64d.baseClass=="dijitTextBox dijitComboBox";
if(!_64e){
curam.dialog.closeModalDialog();
}
}
if(_64c.keyCode==13){
var ev=_572.fix(_64c);
var _64f=ev.target.type=="text";
var _650=ev.target.type=="radio";
var _651=ev.target.type=="checkbox";
var _652=ev.target.type=="select-multiple";
var _653=ev.target.type=="password";
var _654=_56a.byId(ev.target.id);
if(typeof _654!="undefined"){
var _655=_56a.byNode(dojo.byId("widget_"+ev.target.id));
if(_655&&_655.enterKeyOnOpenDropDown){
_655.enterKeyOnOpenDropDown=false;
return false;
}
}
var _656=typeof _654!="undefined"&&_654.baseClass=="dijitComboBox";
if((!_64f&&!_650&&!_651&&!_652&&!_653)||_656){
return true;
}
var _657=null;
var _658=_573(".curam-default-action");
if(_658.length>0){
_657=_658[0];
}else{
var _659=_573("input[type='submit']");
if(_659.length>0){
_657=_659[0];
}
}
if(_657!=null){
_572.stop(_572.fix(_64c));
curam.util.clickButton(_657);
return false;
}
dojo.require("curam.dateSelectorUtil");
var _65a=dojo.byId("year");
if(_65a){
dojo.stopEvent(dojo.fixEvent(_64c));
curam.dateSelectorUtil.updateCalendar();
}
}
return true;
};
curam.util.connect(_56d.body(),"onkeyup",f);
});
},enterKeyPress:function(_65b){
if(_65b.keyCode==13){
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
var _65c=elem.parentElement.parentElement.id;
var _65d=dojo.byId("end-"+_65c);
if(_65d){
_65d.focus();
}
}
}
},focusHelpIconOnTab:function(e){
if(!e.shiftKey&&e.keyCode==9){
var _65e=dojo.query(".dijitDialogHelpIcon")[0];
if(_65e){
setTimeout(function(){
_65e.focus();
},5);
}
}
},swapState:function(node,_65f,_660,_661){
if(_65f){
_570.replace(node,_660,_661);
}else{
_570.replace(node,_661,_660);
}
},makeQueryString:function(_662){
if(!_662||_662.length==0){
return "";
}
var _663=[];
for(var _664 in _662){
_663.push(_664+"="+encodeURIComponent(_662[_664]));
}
return "?"+_663.join("&");
},clickHandlerForListActionMenu:function(url,_665,_666,_667){
if(_665){
var href=curam.util.replaceUrlParam(url,"o3frame","modal");
var ctx=dojo.global.jsScreenContext;
ctx.addContextBits("MODAL");
href=curam.util.replaceUrlParam(href,"o3ctx",ctx.getValue());
curam.util.redirectWindow(href);
return;
}
var _668={href:url};
require(["curam/ui/UIMPageAdaptor"]);
if(curam.ui.UIMPageAdaptor.allowLinkToContinue(_668)){
dojo.global.location=url;
return;
}
if(_668!=null){
if(_667){
_572.fix(_667);
_572.stop(_667);
}
if(!_668.href||_668.href.length==0){
return;
}
if(_666&&!curam.util.isInternal(url)){
dojo.global.open(url);
}else{
if(curam.ui.UIMPageAdaptor.isLinkValidForTabProcessing(_668)){
var _669=new curam.ui.PageRequest(_668.href);
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")||dojo.global.jsScreenContext.hasContextBits("NESTED_UIM")){
_669.pageHolder=dojo.global;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_669);
});
}
}
}
},clickHandlerForMailtoLinks:function(_66a,url){
dojo.stopEvent(_66a);
var _66b=dojo.query("#mailto_frame")[0];
if(!_66b){
_66b=dojo.io.iframe.create("mailto_frame","");
}
_66b.src=url;
return false;
},isInternal:function(url){
var path=url.split("?")[0];
var _66c=path.match("Page.do");
if(_66c!=null){
return true;
}
return false;
},getLastPathSegmentWithQueryString:function(url){
var _66d=url.split("?");
var _66e=_66d[0].split("/");
return _66e[_66e.length-1]+(_66d[1]?"?"+_66d[1]:"");
},replaceSubmitButton:function(name){
if(curam.replacedButtons[name]=="true"){
return;
}
var _66f="__o3btn."+name;
var _670;
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_670=_573("input[id='"+_66f+"']");
}else{
_670=_573("input[name='"+_66f+"']");
}
_670.forEach(function(_671,_672,_673){
_671.tabIndex=-1;
var _674=_671.parentNode;
var _675="btn-id-"+_672;
curam.util.setupWidgetLoadMask("a."+_675);
var _676="ac initially-hidden-widget "+_675;
if(_570.contains(_671,"first-action-control")){
_676+=" first-action-control";
}
var _677=_56b.create("a",{"class":_676,href:"#"},_671,"before");
var _678=dojo.query(".page-level-menu")[0];
if(_678){
dojo.attr(_677,"title",_671.value);
}
_56b.create("span",{"class":"filler"},_677,"before");
var left=_56b.create("span",{"class":"left-corner"},_677);
var _679=_56b.create("span",{"class":"right-corner"},left);
var _67a=_56b.create("span",{"class":"middle"},_679);
_67a.appendChild(document.createTextNode(_671.value));
curam.util.addActionControlClass(_677);
on(_677,"click",function(_67b){
curam.util.clickButton(this._submitButton);
_572.stop(_67b);
});
_677._submitButton=_673[0];
_570.add(_671,"hidden-button");
});
curam.replacedButtons[name]="true";
},setupWidgetLoadMask:function(_67c){
curam.util.subscribe("/curam/page/loaded",function(){
var _67d=_573(_67c)[0];
if(_67d){
_56e.set(_67d,"visibility","visible");
}else{
curam.debug.log("setupButtonLoadMask: "+_575.getProperty("curam.util.not.found")+"'"+_67c+"'"+_575.getProperty("curam.util.ignore.mask"));
}
});
},optReplaceSubmitButton:function(name){
if(curam.util.getFrameRoot(dojo.global,"wizard")==null){
curam.util.replaceSubmitButton(name);
return;
}
var _67e=curam.util.getFrameRoot(dojo.global,"wizard").navframe.wizardNavigator;
if(_67e.delegatesSubmit[jsPageID]!="assumed"){
curam.util.replaceSubmitButton(name);
}
},clickButton:function(_67f){
var _680=dom.byId("mainForm");
var _681;
if(!_67f){
curam.debug.log("curam.util.clickButton: "+_575.getProperty("curam.util..no.arg"));
return;
}
if(typeof (_67f)=="string"){
var _682=_67f;
curam.debug.log("curam.util.clickButton: "+_575.getProperty("curam.util.searching")+_575.getProperty("curam.util.id.of")+"'"+_682+"'.");
_67f=_573("input[id='"+_682+"']")[0];
if(!_67f.form&&!_67f.id){
curam.debug.log("curam.util.clickButton: "+_575.getProperty("curam.util.searched")+_575.getProperty("curam.util.id.of")+"'"+_682+_575.getProperty("curam.util.exiting"));
return;
}
}
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_681=_67f;
}else{
_681=_573("input[name='"+_67f.id+"']",_680)[0];
}
try{
if(attr.get(_680,"action").indexOf(jsPageID)==0){
curam.util.publishRefreshEvent();
}
_681.click();
}
catch(e){
curam.debug.log(_575.getProperty("curam.util.exception.clicking"));
}
},printPage:function(_683){
_572.stop(_683);
var _684=dojo.window.get(_683.currentTarget.ownerDocument);
var _685=_684.frameElement;
var _686=_685;
while(_686&&!dojo.hasClass(_686,"tab-content-holder")){
_686=_686.parentNode;
}
var _687=_686;
var _688=dojo.query(".detailsPanelFrame",_687)[0];
if(_688!=undefined&&_688!=null){
_688.contentWindow.focus();
_688.contentWindow.print();
}
_684.focus();
_684.print();
return false;
},addSelectedClass:function(_689){
_570.add(_689.target,"selected");
},removeSelectedClass:function(_68a){
_570.remove(_68a.target,"selected");
},openHelpPage:function(_68b,_68c){
_572.stop(_68b);
dojo.global.open(_68c);
},connect:function(_68d,_68e,_68f){
var h=function(_690){
_68f(_572.fix(_690));
};
if(has("ie")&&has("ie")<9){
_68d.attachEvent(_68e,h);
_574.addOnWindowUnload(function(){
_68d.detachEvent(_68e,h);
});
return {object:_68d,eventName:_68e,handler:h};
}else{
var _691=_68e;
if(_68e.indexOf("on")==0){
_691=_68e.slice(2);
}
var dt=on(_68d,_691,h);
_574.addOnWindowUnload(function(){
dt.remove();
});
return dt;
}
},disconnect:function(_692){
if(has("ie")&&has("ie")<9){
_692.object.detachEvent(_692.eventName,_692.handler);
}else{
_692.remove();
}
},subscribe:function(_693,_694){
var st=_571.subscribe(_693,_694);
_574.addOnWindowUnload(function(){
st.remove();
});
return st;
},unsubscribe:function(_695){
_695.remove();
},addActionControlClickListener:function(_696){
var _697=dom.byId(_696);
var _698=_573(".ac",_697);
if(_698.length>0){
for(var i=0;i<_698.length;i++){
var _699=_698[i];
curam.util.addActionControlClass(_699);
}
}
},addActionControlClass:function(_69a){
curam.util.connect(_69a,"onmousedown",function(){
_570.add(_69a,"selected-button");
curam.util.connect(_69a,"onmouseout",function(){
_570.remove(_69a,"selected-button");
});
});
},getClusterActionSet:function(){
var _69b=dom.byId("content");
var _69c=_573(".blue-action-set",_69b);
if(_69c.length>0){
for(var i=0;i<_69c.length;i++){
curam.util.addActionControlClickListener(_69c[i]);
}
}
},adjustActionButtonWidth:function(){
if(has("ie")==8){
_56c(function(){
if(dojo.global.jsScreenContext.hasContextBits("MODAL")){
_573(".action-set > a").forEach(function(node){
if(node.childNodes[0].offsetWidth>node.offsetWidth){
_56e.set(node,"width",node.childNodes[0].offsetWidth+"px");
_56e.set(node,"display","block");
_56e.set(node,"display","inline-block");
}
});
}
});
}
},setRpu:function(url,rtc,_69d){
if(!url||!rtc||!rtc.getHref()){
throw {name:"Unexpected values",message:"This value not allowed for url or rtc"};
}
var _69e=curam.util.getLastPathSegmentWithQueryString(rtc.getHref());
_69e=curam.util.removeUrlParam(_69e,curam.util.Constants.RETURN_PAGE_PARAM);
if(_69d){
var i;
for(i=0;i<_69d.length;i++){
if(!_69d[i].key||!_69d[i].value){
throw {name:"undefined value error",message:"The object did not contain a valid key/value pair"};
}
_69e=curam.util.replaceUrlParam(_69e,_69d[i].key,_69d[i].value);
}
}
var _69f=curam.util.replaceUrlParam(url,curam.util.Constants.RETURN_PAGE_PARAM,encodeURIComponent(_69e));
curam.debug.log("curam.util.setRpu "+_575.getProperty("curam.util.added.rpu")+_69f);
return _69f;
},retrieveBaseURL:function(){
return dojo.global.location.href.match(".*://[^/]*/[^/]*");
},removeRoleRegion:function(){
var body=dojo.query("body")[0];
dojo.removeAttr(body,"role");
},iframeTitleFallBack:function(){
var _6a0=curam.tab.getContainerTab(curam.tab.getContentPanelIframe());
var _6a1=dojo.byId(curam.tab.getContentPanelIframe());
var _6a2=_6a1.contentWindow.document.title;
var _6a3=dojo.query("div.nowrapTabStrip.dijitTabContainerTop-tabs > div.dijitTabChecked.dijitChecked")[0];
var _6a4=dojo.query("span.tabLabel",_6a3)[0];
var _6a5=dojo.query("div.nowrapTabStrip.dijitTabNoLayout > div.dijitTabChecked.dijitChecked",_6a0.domNode)[0];
var _6a6=dojo.query("span.tabLabel",_6a5)[0];
if(_6a2&&_6a2!=null){
return _6a2;
}else{
if(_6a5){
return _6a6.innerHTML;
}else{
return _6a4.innerHTML;
}
}
},addClassToLastNodeInContentArea:function(){
var _6a7=_573("> div","content");
var _6a8=_6a7.length;
if(_6a8==0){
return "No need to add";
}
var _6a9=_6a7[--_6a8];
while(_570.contains(_6a9,"hidden-action-set")&&_6a9){
_6a9=_6a7[--_6a8];
}
_570.add(_6a9,"last-node");
},highContrastModeType:function(){
var _6aa=dojo.query("body.high-contrast")[0];
return _6aa;
}});
return curam.util;
});
},"dojo/store/Memory":function(){
define("dojo/store/Memory",["../_base/declare","./util/QueryResults","./util/SimpleQueryEngine"],function(_6ab,_6ac,_6ad){
return _6ab("dojo.store.Memory",null,{constructor:function(_6ae){
for(var i in _6ae){
this[i]=_6ae[i];
}
this.setData(this.data||[]);
},data:null,idProperty:"id",index:null,queryEngine:_6ad,get:function(id){
return this.data[this.index[id]];
},getIdentity:function(_6af){
return _6af[this.idProperty];
},put:function(_6b0,_6b1){
var data=this.data,_6b2=this.index,_6b3=this.idProperty;
var id=(_6b1&&"id" in _6b1)?_6b1.id:_6b3 in _6b0?_6b0[_6b3]:Math.random();
if(id in _6b2){
if(_6b1&&_6b1.overwrite===false){
throw new Error("Object already exists");
}
data[_6b2[id]]=_6b0;
}else{
_6b2[id]=data.push(_6b0)-1;
}
return id;
},add:function(_6b4,_6b5){
(_6b5=_6b5||{}).overwrite=false;
return this.put(_6b4,_6b5);
},remove:function(id){
var _6b6=this.index;
var data=this.data;
if(id in _6b6){
data.splice(_6b6[id],1);
this.setData(data);
return true;
}
},query:function(_6b7,_6b8){
return _6ac(this.queryEngine(_6b7,_6b8)(this.data));
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
},"idx/oneui/form/_FocusManager":function(){
define("idx/oneui/form/_FocusManager",["dijit/focus","dojo/_base/window","dojo/window","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/declare","dojo/_base/lang","dijit/registry"],function(_6b9,win,_6ba,dom,_6bb,_6bc,_6bd,lang,_6be){
_6b9._onTouchNode=function(node,by){
var _6bf=node;
if(this._clearActiveWidgetsTimer){
clearTimeout(this._clearActiveWidgetsTimer);
delete this._clearActiveWidgetsTimer;
}
var _6c0=[];
try{
while(node){
var _6c1=_6bb.get(node,"dijitPopupParent");
if(_6c1){
node=_6be.byId(_6c1).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===win.body()){
break;
}
node=_6ba.get(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId"),_6c2=id&&_6be.byId(id);
if(_6c2&&!(by=="mouse"&&_6c2.get("disabled"))){
if(!_6c2._isValidFocusNode||_6c2._isValidFocusNode(_6bf)){
_6c0.unshift(id);
}
}
node=node.parentNode;
}
}
}
}
catch(e){
}
this._setStack(_6c0,by);
};
return _6b9;
});
},"url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n","dijit/_base/sniff":function(){
define("dijit/_base/sniff",["dojo/uacss"],function(){
});
},"dijit/layout/StackContainer":function(){
define("dijit/layout/StackContainer",["dojo/_base/array","dojo/cookie","dojo/_base/declare","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/ready","dojo/topic","../registry","../_WidgetBase","./_LayoutWidget","dojo/i18n!../nls/common"],function(_6c3,_6c4,_6c5,_6c6,_6c7,lang,_6c8,_6c9,_6ca,_6cb,_6cc){
if(!_6c7.isAsync){
_6c8(0,function(){
var _6cd=["dijit/layout/StackController"];
require(_6cd);
});
}
lang.extend(_6cb,{selected:false,closable:false,iconClass:"dijitNoIcon",showTitle:true});
return _6c5("dijit.layout.StackContainer",_6cc,{doLayout:true,persist:false,baseClass:"dijitStackContainer",buildRendering:function(){
this.inherited(arguments);
_6c6.add(this.domNode,"dijitLayoutContainer");
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onkeypress",this._onKeyPress);
},startup:function(){
if(this._started){
return;
}
var _6ce=this.getChildren();
_6c3.forEach(_6ce,this._setupChild,this);
if(this.persist){
this.selectedChildWidget=_6ca.byId(_6c4(this.id+"_selectedChild"));
}else{
_6c3.some(_6ce,function(_6cf){
if(_6cf.selected){
this.selectedChildWidget=_6cf;
}
return _6cf.selected;
},this);
}
var _6d0=this.selectedChildWidget;
if(!_6d0&&_6ce[0]){
_6d0=this.selectedChildWidget=_6ce[0];
_6d0.selected=true;
}
_6c9.publish(this.id+"-startup",{children:_6ce,selected:_6d0});
this.inherited(arguments);
},resize:function(){
if(!this._hasBeenShown){
this._hasBeenShown=true;
var _6d1=this.selectedChildWidget;
if(_6d1){
this._showChild(_6d1);
}
}
this.inherited(arguments);
},_setupChild:function(_6d2){
this.inherited(arguments);
_6c6.replace(_6d2.domNode,"dijitHidden","dijitVisible");
_6d2.domNode.title="";
},addChild:function(_6d3,_6d4){
this.inherited(arguments);
if(this._started){
_6c9.publish(this.id+"-addChild",_6d3,_6d4);
this.layout();
if(!this.selectedChildWidget){
this.selectChild(_6d3);
}
}
},removeChild:function(page){
this.inherited(arguments);
if(this._started){
_6c9.publish(this.id+"-removeChild",page);
}
if(this._descendantsBeingDestroyed){
return;
}
if(this.selectedChildWidget===page){
this.selectedChildWidget=undefined;
if(this._started){
var _6d5=this.getChildren();
if(_6d5.length){
this.selectChild(_6d5[0]);
}
}
}
if(this._started){
this.layout();
}
},selectChild:function(page,_6d6){
page=_6ca.byId(page);
if(this.selectedChildWidget!=page){
var d=this._transition(page,this.selectedChildWidget,_6d6);
if(d){
this._set("selectedChildWidget",page);
_6c9.publish(this.id+"-selectChild",page);
if(this.persist){
_6c4(this.id+"_selectedChild",this.selectedChildWidget.id);
}
}
}
return d;
},_transition:function(_6d7,_6d8){
if(_6d8){
this._hideChild(_6d8);
}
var d=this._showChild(_6d7);
if(d&&_6d7.resize){
if(this.doLayout){
_6d7.resize(this._containerContentBox||this._contentBox);
}else{
_6d7.resize();
}
}
return d;
},_adjacent:function(_6d9){
var _6da=this.getChildren();
var _6db=_6c3.indexOf(_6da,this.selectedChildWidget);
_6db+=_6d9?1:_6da.length-1;
return _6da[_6db%_6da.length];
},forward:function(){
return this.selectChild(this._adjacent(true),true);
},back:function(){
return this.selectChild(this._adjacent(false),true);
},_onKeyPress:function(e){
_6c9.publish(this.id+"-containerKeyPress",{e:e,page:this});
},layout:function(){
var _6dc=this.selectedChildWidget;
if(_6dc&&_6dc.resize){
if(this.doLayout){
_6dc.resize(this._containerContentBox||this._contentBox);
}else{
_6dc.resize();
}
}
},_showChild:function(page){
if(page){
var _6dd=this.getChildren();
page.isFirstChild=(page==_6dd[0]);
page.isLastChild=(page==_6dd[_6dd.length-1]);
page._set("selected",true);
_6c6.replace(page.domNode,"dijitVisible","dijitHidden");
return (page._onShow&&page._onShow())||true;
}
},_hideChild:function(page){
page._set("selected",false);
_6c6.replace(page.domNode,"dijitHidden","dijitVisible");
page.onHide&&page.onHide();
},closeChild:function(page){
var _6de=page.onClose(this,page);
if(_6de){
this.removeChild(page);
page.destroyRecursive();
}
},destroyDescendants:function(_6df){
this._descendantsBeingDestroyed=true;
this.selectedChildWidget=undefined;
_6c3.forEach(this.getChildren(),function(_6e0){
if(!_6df){
this.removeChild(_6e0);
}
_6e0.destroyRecursive(_6df);
},this);
this._descendantsBeingDestroyed=false;
}});
});
},"dojo/regexp":function(){
define("dojo/regexp",["./_base/kernel","./_base/lang"],function(dojo,lang){
lang.getObject("regexp",true,dojo);
dojo.regexp.escapeString=function(str,_6e1){
return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_6e1&&_6e1.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
dojo.regexp.buildGroupRE=function(arr,re,_6e2){
if(!(arr instanceof Array)){
return re(arr);
}
var b=[];
for(var i=0;i<arr.length;i++){
b.push(re(arr[i]));
}
return dojo.regexp.group(b.join("|"),_6e2);
};
dojo.regexp.group=function(_6e3,_6e4){
return "("+(_6e4?"?:":"")+_6e3+")";
};
return dojo.regexp;
});
},"curam/debug":function(){
define("curam/debug",["curam/define","curam/util/LocalConfig"],function(_6e5,_6e6){
_6e5.singleton("curam.debug",{log:function(){
if(curam.debug.enabled()){
try{
var a=arguments;
if(!dojo.isIE){
console.log.apply(console,a);
}else{
var _6e7=a.length;
var sa=curam.debug._serializeArgument;
switch(_6e7){
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
console.log("[Incomplete message - "+(_6e7-5)+" message a truncated] "+a[0],sa(a[1]),sa(a[2]),sa(a[3]),sa(a[4]),sa(a[5]));
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
var _6e8=typeof arg!="undefined"&&typeof arg.closed!="undefined"&&arg.closed;
if(_6e8){
return true;
}else{
return typeof arg!="undefined"&&typeof arg.location!="undefined"&&typeof arg.navigator!="undefined"&&typeof arg.document!="undefined"&&typeof arg.closed!="undefined";
}
},enabled:function(){
return _6e6.readOption("jsTraceLog","false")=="true";
},_setup:function(_6e9){
_6e6.seedOption("jsTraceLog",_6e9.trace,"false");
_6e6.seedOption("ajaxDebugMode",_6e9.ajaxDebug,"false");
_6e6.seedOption("asyncProgressMonitor",_6e9.asyncProgressMonitor,"false");
}});
return curam.debug;
});
},"dijit/DropDownMenu":function(){
require({cache:{"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n"}});
define("dijit/DropDownMenu",["dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/text!./templates/Menu.html","./_OnDijitClickMixin","./_MenuBase"],function(_6ea,_6eb,keys,_6ec,_6ed,_6ee){
return _6ea("dijit.DropDownMenu",[_6ee,_6ed],{templateString:_6ec,baseClass:"dijitMenu",postCreate:function(){
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
_6eb.stop(evt);
break;
case this._closeSubMenuKey:
if(this.parentMenu){
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
}else{
_6eb.stop(evt);
}
break;
}
}});
});
},"dijit/Menu":function(){
define("dijit/Menu",["require","dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window","dojo/window","./popup","./DropDownMenu","dojo/ready"],function(_6ef,_6f0,_6f1,_6f2,dom,_6f3,_6f4,_6f5,_6f6,keys,lang,on,has,win,_6f7,pm,_6f8,_6f9){
if(!_6f6.isAsync){
_6f9(0,function(){
var _6fa=["dijit/MenuItem","dijit/PopupMenuItem","dijit/CheckedMenuItem","dijit/MenuSeparator"];
_6ef(_6fa);
});
}
return _6f1("dijit.Menu",_6f8,{constructor:function(){
this._bindings=[];
},targetNodeIds:[],contextMenuForWindow:false,leftClickToOpen:false,refocus:true,postCreate:function(){
if(this.contextMenuForWindow){
this.bindDomNode(win.body());
}else{
_6f0.forEach(this.targetNodeIds,this.bindDomNode,this);
}
this.inherited(arguments);
},_iframeContentWindow:function(_6fb){
return _6f7.get(this._iframeContentDocument(_6fb))||this._iframeContentDocument(_6fb)["__parent__"]||(_6fb.name&&win.doc.frames[_6fb.name])||null;
},_iframeContentDocument:function(_6fc){
return _6fc.contentDocument||(_6fc.contentWindow&&_6fc.contentWindow.document)||(_6fc.name&&win.doc.frames[_6fc.name]&&win.doc.frames[_6fc.name].document)||null;
},bindDomNode:function(node){
node=dom.byId(node);
var cn;
if(node.tagName.toLowerCase()=="iframe"){
var _6fd=node,_6fe=this._iframeContentWindow(_6fd);
cn=win.withGlobal(_6fe,win.body);
}else{
cn=(node==win.body()?win.doc.documentElement:node);
}
var _6ff={node:node,iframe:_6fd};
_6f3.set(node,"_dijitMenu"+this.id,this._bindings.push(_6ff));
var _700=lang.hitch(this,function(cn){
return [on(cn,this.leftClickToOpen?"click":"contextmenu",lang.hitch(this,function(evt){
_6f2.stop(evt);
this._scheduleOpen(evt.target,_6fd,{x:evt.pageX,y:evt.pageY});
})),on(cn,"keydown",lang.hitch(this,function(evt){
if(evt.shiftKey&&evt.keyCode==keys.F10){
_6f2.stop(evt);
this._scheduleOpen(evt.target,_6fd);
}
}))];
});
_6ff.connects=cn?_700(cn):[];
if(_6fd){
_6ff.onloadHandler=lang.hitch(this,function(){
var _701=this._iframeContentWindow(_6fd);
cn=win.withGlobal(_701,win.body);
_6ff.connects=_700(cn);
});
if(_6fd.addEventListener){
_6fd.addEventListener("load",_6ff.onloadHandler,false);
}else{
_6fd.attachEvent("onload",_6ff.onloadHandler);
}
}
},unBindDomNode:function(_702){
var node;
try{
node=dom.byId(_702);
}
catch(e){
return;
}
var _703="_dijitMenu"+this.id;
if(node&&_6f3.has(node,_703)){
var bid=_6f3.get(node,_703)-1,b=this._bindings[bid],h;
while(h=b.connects.pop()){
h.remove();
}
var _704=b.iframe;
if(_704){
if(_704.removeEventListener){
_704.removeEventListener("load",b.onloadHandler,false);
}else{
_704.detachEvent("onload",b.onloadHandler);
}
}
_6f3.remove(node,_703);
delete this._bindings[bid];
}
},_scheduleOpen:function(_705,_706,_707){
if(!this._openTimer){
this._openTimer=setTimeout(lang.hitch(this,function(){
delete this._openTimer;
this._openMyself({target:_705,iframe:_706,coords:_707});
}),1);
}
},_openMyself:function(args){
var _708=args.target,_709=args.iframe,_70a=args.coords;
if(_70a){
if(_709){
var ifc=_6f4.position(_709,true),_70b=this._iframeContentWindow(_709),_70c=win.withGlobal(_70b,"_docScroll",dojo);
var cs=_6f5.getComputedStyle(_709),tp=_6f5.toPixelValue,left=(has("ie")&&has("quirks")?0:tp(_709,cs.paddingLeft))+(has("ie")&&has("quirks")?tp(_709,cs.borderLeftWidth):0),top=(has("ie")&&has("quirks")?0:tp(_709,cs.paddingTop))+(has("ie")&&has("quirks")?tp(_709,cs.borderTopWidth):0);
_70a.x+=ifc.x+left-_70c.x;
_70a.y+=ifc.y+top-_70c.y;
}
}else{
_70a=_6f4.position(_708,true);
_70a.x+=10;
_70a.y+=10;
}
var self=this;
var _70d=this._focusManager.get("prevNode");
var _70e=this._focusManager.get("curNode");
var _70f=!_70e||(dom.isDescendant(_70e,this.domNode))?_70d:_70e;
function _710(){
if(self.refocus&&_70f){
_70f.focus();
}
pm.close(self);
};
pm.open({popup:this,x:_70a.x,y:_70a.y,onExecute:_710,onCancel:_710,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){
this.inherited("_onBlur",arguments);
pm.close(this);
};
},uninitialize:function(){
_6f0.forEach(this._bindings,function(b){
if(b){
this.unBindDomNode(b.node);
}
},this);
this.inherited(arguments);
}});
});
},"curam/util/RuntimeContext":function(){
define("curam/util/RuntimeContext",[],function(){
var _711=dojo.declare("curam.util.RuntimeContext",null,{_window:null,constructor:function(_712){
this._window=_712;
},getHref:function(){
return this._window.location.href;
},getPathName:function(){
return this._window.location.pathName;
},contextObject:function(){
return this._window;
}});
return _711;
});
},"url:dijit/form/templates/ValidationTextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","url:dijit/form/templates/TextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","dijit/_KeyNavContainer":function(){
define("dijit/_KeyNavContainer",["dojo/_base/kernel","./_Container","./_FocusMixin","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/event","dojo/dom-attr","dojo/_base/lang"],function(_713,_714,_715,_716,keys,_717,_718,_719,lang){
return _717("dijit._KeyNavContainer",[_715,_714],{tabIndex:"0",connectKeyNavHandlers:function(_71a,_71b){
var _71c=(this._keyNavCodes={});
var prev=lang.hitch(this,"focusPrev");
var next=lang.hitch(this,"focusNext");
_716.forEach(_71a,function(code){
_71c[code]=prev;
});
_716.forEach(_71b,function(code){
_71c[code]=next;
});
_71c[keys.HOME]=lang.hitch(this,"focusFirstChild");
_71c[keys.END]=lang.hitch(this,"focusLastChild");
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
this.connect(this.domNode,"onfocus","_onContainerFocus");
},startupKeyNavChildren:function(){
_713.deprecated("startupKeyNavChildren() call no longer needed","","2.0");
},startup:function(){
this.inherited(arguments);
_716.forEach(this.getChildren(),lang.hitch(this,"_startupChild"));
},addChild:function(_71d,_71e){
this.inherited(arguments);
this._startupChild(_71d);
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
},focusChild:function(_71f,last){
if(!_71f){
return;
}
if(this.focusedChild&&_71f!==this.focusedChild){
this._onChildBlur(this.focusedChild);
}
_71f.set("tabIndex",this.tabIndex);
_71f.focus(last?"end":"start");
this._set("focusedChild",_71f);
},_startupChild:function(_720){
_720.set("tabIndex","-1");
this.connect(_720,"_onFocus",function(){
_720.set("tabIndex",this.tabIndex);
});
this.connect(_720,"_onBlur",function(){
_720.set("tabIndex","-1");
});
},_onContainerFocus:function(evt){
if(evt.target!==this.domNode||this.focusedChild){
return;
}
this.focusFirstChild();
_719.set(this.domNode,"tabIndex","-1");
},_onBlur:function(evt){
if(this.tabIndex){
_719.set(this.domNode,"tabIndex",this.tabIndex);
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
_718.stop(evt);
}
},_onChildBlur:function(){
},_getFirstFocusableChild:function(){
return this._getNextFocusableChild(null,1);
},_getLastFocusableChild:function(){
return this._getNextFocusableChild(null,-1);
},_getNextFocusableChild:function(_721,dir){
if(_721){
_721=this._getSiblingOfChild(_721,dir);
}
var _722=this.getChildren();
for(var i=0;i<_722.length;i++){
if(!_721){
_721=_722[(dir>0)?0:(_722.length-1)];
}
if(_721.isFocusable()){
return _721;
}
_721=this._getSiblingOfChild(_721,dir);
}
return null;
}});
});
},"dijit/layout/utils":function(){
define("dijit/layout/utils",["dojo/_base/array","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang",".."],function(_723,_724,_725,_726,lang,_727){
var _728=lang.getObject("layout",true,_727);
_728.marginBox2contentBox=function(node,mb){
var cs=_726.getComputedStyle(node);
var me=_725.getMarginExtents(node,cs);
var pb=_725.getPadBorderExtents(node,cs);
return {l:_726.toPixelValue(node,cs.paddingLeft),t:_726.toPixelValue(node,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)};
};
function _729(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
};
function size(_72a,dim){
var _72b=_72a.resize?_72a.resize(dim):_725.setMarginBox(_72a.domNode,dim);
if(_72a.fakeWidget){
return;
}
if(_72b){
lang.mixin(_72a,_72b);
}else{
lang.mixin(_72a,_725.getMarginBoxSimple(_72a.domNode));
lang.mixin(_72a,dim);
}
};
_728.layoutChildren=function(_72c,dim,_72d,_72e,_72f){
dim=lang.mixin({},dim);
_724.add(_72c,"dijitLayoutContainer");
_72d=_723.filter(_72d,function(item){
return item.region!="center"&&item.layoutAlign!="client";
}).concat(_723.filter(_72d,function(item){
return item.region=="center"||item.layoutAlign=="client";
}));
var _730={};
_723.forEach(_72d,function(_731){
var elm=_731.domNode,pos=(_731.region||_731.layoutAlign);
if(!pos){
throw new Error("No region setting for "+_731.id);
}
var _732=elm.style;
_732.left=dim.l+"px";
_732.top=dim.t+"px";
_732.position="absolute";
_724.add(elm,"dijitAlign"+_729(pos));
var _733={};
if(_72e&&_72e==_731.id){
_733[_731.region=="top"||_731.region=="bottom"?"h":"w"]=_72f;
}
if(pos=="top"||pos=="bottom"){
_733.w=dim.w;
size(_731,_733);
dim.h-=_731.h;
if(pos=="top"){
dim.t+=_731.h;
}else{
_732.top=dim.t+dim.h+"px";
}
}else{
if(pos=="left"||pos=="right"){
_733.h=dim.h;
size(_731,_733);
dim.w-=_731.w;
if(pos=="left"){
dim.l+=_731.w;
}else{
_732.left=dim.l+dim.w+"px";
}
}else{
if(pos=="client"||pos=="center"){
size(_731,dim);
}
}
}
_730[pos]={w:dim.w,h:dim.h};
});
return _730;
};
return {marginBox2contentBox:_728.marginBox2contentBox,layoutChildren:_728.layoutChildren};
});
},"dijit/_Contained":function(){
define("dijit/_Contained",["dojo/_base/declare","./registry"],function(_734,_735){
return _734("dijit._Contained",null,{_getSibling:function(_736){
var node=this.domNode;
do{
node=node[_736+"Sibling"];
}while(node&&node.nodeType!=1);
return node&&_735.byNode(node);
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
},"dijit/form/DataList":function(){
define("dijit/form/DataList",["dojo/_base/declare","dojo/dom","dojo/_base/lang","dojo/query","dojo/store/Memory","../registry"],function(_737,dom,lang,_738,_739,_73a){
function _73b(_73c){
return {id:_73c.value,value:_73c.value,name:lang.trim(_73c.innerText||_73c.textContent||"")};
};
return _737("dijit.form.DataList",_739,{constructor:function(_73d,_73e){
this.domNode=dom.byId(_73e);
lang.mixin(this,_73d);
if(this.id){
_73a.add(this);
}
this.domNode.style.display="none";
this.inherited(arguments,[{data:_738("option",this.domNode).map(_73b)}]);
},destroy:function(){
_73a.remove(this.id);
},fetchSelectedItem:function(){
var _73f=_738("> option[selected]",this.domNode)[0]||_738("> option",this.domNode)[0];
return _73f&&_73b(_73f);
}});
});
},"dijit/_Container":function(){
define("dijit/_Container",["dojo/_base/array","dojo/_base/declare","dojo/dom-construct","./registry"],function(_740,_741,_742,_743){
return _741("dijit._Container",null,{buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_744,_745){
var _746=this.containerNode;
if(_745&&typeof _745=="number"){
var _747=this.getChildren();
if(_747&&_747.length>=_745){
_746=_747[_745-1].domNode;
_745="after";
}
}
_742.place(_744.domNode,_746,_745);
if(this._started&&!_744._started){
_744.startup();
}
},removeChild:function(_748){
if(typeof _748=="number"){
_748=this.getChildren()[_748];
}
if(_748){
var node=_748.domNode;
if(node&&node.parentNode){
node.parentNode.removeChild(node);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},_getSiblingOfChild:function(_749,dir){
var node=_749.domNode,_74a=(dir>0?"nextSibling":"previousSibling");
do{
node=node[_74a];
}while(node&&(node.nodeType!=1||!_743.byNode(node)));
return node&&_743.byNode(node);
},getIndexOfChild:function(_74b){
return _740.indexOf(this.getChildren(),_74b);
}});
});
},"dijit/form/ValidationTextBox":function(){
require({cache:{"url:dijit/form/templates/ValidationTextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"}});
define("dijit/form/ValidationTextBox",["dojo/_base/declare","dojo/i18n","./TextBox","../Tooltip","dojo/text!./templates/ValidationTextBox.html","dojo/i18n!./nls/validate"],function(_74c,i18n,_74d,_74e,_74f){
return _74c("dijit.form.ValidationTextBox",_74d,{templateString:_74f,baseClass:"dijitTextBox dijitValidationTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",missingMessage:"$_unset_$",message:"",constraints:{},regExp:".*",regExpGen:function(){
return this.regExp;
},state:"",tooltipPosition:[],_setValueAttr:function(){
this.inherited(arguments);
this.validate(this.focused);
},validator:function(_750,_751){
return (new RegExp("^(?:"+this.regExpGen(_751)+")"+(this.required?"":"?")+"$")).test(_750)&&(!this.required||!this._isEmpty(_750))&&(this._isEmpty(_750)||this.parse(_750,_751)!==undefined);
},_isValidSubset:function(){
return this.textbox.value.search(this._partialre)==0;
},isValid:function(){
return this.validator(this.textbox.value,this.constraints);
},_isEmpty:function(_752){
return (this.trim?/^\s*$/:/^$/).test(_752);
},getErrorMessage:function(){
return (this.required&&this._isEmpty(this.textbox.value))?this.missingMessage:this.invalidMessage;
},getPromptMessage:function(){
return this.promptMessage;
},_maskValidSubsetError:true,validate:function(_753){
var _754="";
var _755=this.disabled||this.isValid(_753);
if(_755){
this._maskValidSubsetError=true;
}
var _756=this._isEmpty(this.textbox.value);
var _757=!_755&&_753&&this._isValidSubset();
this._set("state",_755?"":(((((!this._hasBeenBlurred||_753)&&_756)||_757)&&this._maskValidSubsetError)?"Incomplete":"Error"));
this.focusNode.setAttribute("aria-invalid",_755?"false":"true");
if(this.state=="Error"){
this._maskValidSubsetError=_753&&_757;
_754=this.getErrorMessage(_753);
}else{
if(this.state=="Incomplete"){
_754=this.getPromptMessage(_753);
this._maskValidSubsetError=!this._hasBeenBlurred||_753;
}else{
if(_756){
_754=this.getPromptMessage(_753);
}
}
}
this.set("message",_754);
return _755;
},displayMessage:function(_758){
if(_758&&this.focused){
_74e.show(_758,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}else{
_74e.hide(this.domNode);
}
},_refreshState:function(){
this.validate(this.focused);
this.inherited(arguments);
},constructor:function(){
this.constraints={};
},_setConstraintsAttr:function(_759){
if(!_759.locale&&this.lang){
_759.locale=this.lang;
}
this._set("constraints",_759);
this._computePartialRE();
},_computePartialRE:function(){
var p=this.regExpGen(this.constraints);
this.regExp=p;
var _75a="";
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
_75a+=re;
break;
case ")":
_75a+="|$)";
break;
default:
_75a+="(?:"+re+"|$)";
break;
}
});
}
try{
"".search(_75a);
}
catch(e){
_75a=this.regExp;
console.warn("RegExp error in "+this.declaredClass+": "+this.regExp);
}
this._partialre="^(?:"+_75a+")$";
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
},_setDisabledAttr:function(_75b){
this.inherited(arguments);
this._refreshState();
},_setRequiredAttr:function(_75c){
this._set("required",_75c);
this.focusNode.setAttribute("aria-required",_75c);
this._refreshState();
},_setMessageAttr:function(_75d){
this._set("message",_75d);
this.displayMessage(_75d);
},reset:function(){
this._maskValidSubsetError=true;
this.inherited(arguments);
},_onBlur:function(){
this.displayMessage("");
this.inherited(arguments);
}});
});
},"dijit/_base":function(){
define("dijit/_base",[".","./a11y","./WidgetSet","./_base/focus","./_base/manager","./_base/place","./_base/popup","./_base/scroll","./_base/sniff","./_base/typematic","./_base/wai","./_base/window"],function(_75e){
return _75e._base;
});
},"dijit/_base/typematic":function(){
define("dijit/_base/typematic",["../typematic"],function(){
});
},"dojo/window":function(){
define("dojo/window",["./_base/lang","./_base/sniff","./_base/window","./dom","./dom-geometry","./dom-style"],function(lang,has,_75f,dom,geom,_760){
var _761=lang.getObject("dojo.window",true);
_761.getBox=function(){
var _762=(_75f.doc.compatMode=="BackCompat")?_75f.body():_75f.doc.documentElement,_763=geom.docScroll(),w,h;
if(has("touch")){
var _764=_75f.doc.parentWindow||_75f.doc.defaultView;
w=_764.innerWidth||_762.clientWidth;
h=_764.innerHeight||_762.clientHeight;
}else{
w=_762.clientWidth;
h=_762.clientHeight;
}
return {l:_763.x,t:_763.y,w:w,h:h};
};
_761.get=function(doc){
if(has("ie")&&_761!==document.parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc.parentWindow||doc.defaultView;
};
_761.scrollIntoView=function(node,pos){
try{
node=dom.byId(node);
var doc=node.ownerDocument||_75f.doc,body=doc.body||_75f.body(),html=doc.documentElement||body.parentNode,isIE=has("ie"),isWK=has("webkit");
if((!(has("mozilla")||isIE||isWK||has("opera"))||node==body||node==html)&&(typeof node.scrollIntoView!="undefined")){
node.scrollIntoView(false);
return;
}
var _765=doc.compatMode=="BackCompat",_766=(isIE>=9&&node.ownerDocument.parentWindow.frameElement)?((html.clientHeight>0&&html.clientWidth>0&&(body.clientHeight==0||body.clientWidth==0||body.clientHeight>html.clientHeight||body.clientWidth>html.clientWidth))?html:body):(_765?body:html),_767=isWK?body:_766,_768=_766.clientWidth,_769=_766.clientHeight,rtl=!geom.isBodyLtr(),_76a=pos||geom.position(node),el=node.parentNode,_76b=function(el){
return ((isIE<=6||(isIE&&_765))?false:(_760.get(el,"position").toLowerCase()=="fixed"));
};
if(_76b(node)){
return;
}
while(el){
if(el==body){
el=_767;
}
var _76c=geom.position(el),_76d=_76b(el);
if(el==_767){
_76c.w=_768;
_76c.h=_769;
if(_767==html&&isIE&&rtl){
_76c.x+=_767.offsetWidth-_76c.w;
}
if(_76c.x<0||!isIE){
_76c.x=0;
}
if(_76c.y<0||!isIE){
_76c.y=0;
}
}else{
var pb=geom.getPadBorderExtents(el);
_76c.w-=pb.w;
_76c.h-=pb.h;
_76c.x+=pb.l;
_76c.y+=pb.t;
var _76e=el.clientWidth,_76f=_76c.w-_76e;
if(_76e>0&&_76f>0){
_76c.w=_76e;
_76c.x+=(rtl&&(isIE||el.clientLeft>pb.l))?_76f:0;
}
_76e=el.clientHeight;
_76f=_76c.h-_76e;
if(_76e>0&&_76f>0){
_76c.h=_76e;
}
}
if(_76d){
if(_76c.y<0){
_76c.h+=_76c.y;
_76c.y=0;
}
if(_76c.x<0){
_76c.w+=_76c.x;
_76c.x=0;
}
if(_76c.y+_76c.h>_769){
_76c.h=_769-_76c.y;
}
if(_76c.x+_76c.w>_768){
_76c.w=_768-_76c.x;
}
}
var l=_76a.x-_76c.x,t=_76a.y-Math.max(_76c.y,0),r=l+_76a.w-_76c.w,bot=t+_76a.h-_76c.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
if(rtl&&((isIE==8&&!_765)||isIE>=9)){
s=-s;
}
_76a.x+=el.scrollLeft;
el.scrollLeft+=s;
_76a.x-=el.scrollLeft;
}
if(bot*t>0){
_76a.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_76a.y-=el.scrollTop;
}
el=(el!=_767)&&!_76d&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
};
require(["dojo/_base/sniff","dojo/on"],function(has,on){
if(has("ie")==8){
var _770=screen.deviceXDPI;
setInterval(function(){
if(screen.deviceXDPI!=_770){
_770=screen.deviceXDPI;
on.emit(_75f.global,"resize");
}
},250);
}
});
return _761;
});
},"dijit/_FocusMixin":function(){
define("dijit/_FocusMixin",["./focus","./_WidgetBase","dojo/_base/declare","dojo/_base/lang"],function(_771,_772,_773,lang){
lang.extend(_772,{focused:false,onFocus:function(){
},onBlur:function(){
},_onFocus:function(){
this.onFocus();
},_onBlur:function(){
this.onBlur();
}});
return _773("dijit._FocusMixin",null,{_focusManager:_771});
});
},"dojo/data/util/filter":function(){
define("dojo/data/util/filter",["dojo/_base/lang"],function(lang){
var _774=lang.getObject("dojo.data.util.filter",true);
_774.patternToRegExp=function(_775,_776){
var rxp="^";
var c=null;
for(var i=0;i<_775.length;i++){
c=_775.charAt(i);
switch(c){
case "\\":
rxp+=c;
i++;
rxp+=_775.charAt(i);
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
if(_776){
return new RegExp(rxp,"mi");
}else{
return new RegExp(rxp,"m");
}
};
return _774;
});
},"dijit/_WidgetsInTemplateMixin":function(){
define("dijit/_WidgetsInTemplateMixin",["dojo/_base/array","dojo/_base/declare","dojo/parser","dijit/registry"],function(_777,_778,_779,_77a){
return _778("dijit._WidgetsInTemplateMixin",null,{_earlyTemplatedStartup:false,widgetsInTemplate:true,_beforeFillContent:function(){
if(this.widgetsInTemplate){
var node=this.domNode;
var cw=(this._startupWidgets=_779.parse(node,{noStart:!this._earlyTemplatedStartup,template:true,inherited:{dir:this.dir,lang:this.lang,textDir:this.textDir},propsThis:this,scope:"dojo"}));
this._supportingWidgets=_77a.findWidgets(node);
this._attachTemplateNodes(cw,function(n,p){
return n[p];
});
}
},startup:function(){
_777.forEach(this._startupWidgets,function(w){
if(w&&!w._started&&w.startup){
w.startup();
}
});
this.inherited(arguments);
}});
});
},"url:idx/oneui/form/templates/TextBox.html":"<div id=\"widget_${id}\" class=\"dijitInline dijitReset dijitLeft idxComposite\"\r\n\t><div class=\"idxLabel dijitInline dijitHidden\"><span class=\"idxRequiredIcon\">*&nbsp</span><label for=\"${id}\" dojoAttachPoint=\"compLabelNode\"></label></div\r\n\t><div class=\"dijitInline\"\r\n\t\t><div dojoAttachPoint='stateNode,oneuiBaseNode' class=\"dijit dijitReset dijitInline dijitLeft\" role=\"presentation\"\r\n\t\t\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\r\n\t\t\t\t><input class=\"dijitReset dijitInputInner\" dojoAttachPoint='textbox,focusNode' autocomplete=\"off\" ${!nameAttrSetting} type='${type}'/\r\n\t\t\t></div\r\n\t\t></div\r\n\t\t><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"></div\r\n\t\t><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\r\n\t\t><div class='dijitValidationIcon'\r\n\t\t><input class=\"dijitReset dijitInputField dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n\t\t></div\r\n\t></div\r\n\t><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\r\n\t></div\r\n></div>\r\n","idx/oneui/HoverHelpTooltip":function(){
require({cache:{"url:idx/oneui/templates/HoverHelpTooltip.html":"<div class=\"idxOneuiHoverHelpTooltip idxOneuiHoverHelpTooltipLeft\" role=\"dialog\"\r\n\t><div role=\"document\"\r\n\t\t><span data-dojo-attach-point=\"closeButtonNode\" class=\"idxOneuiHoverHelpTooltipCloseIcon\" data-dojo-attach-event=\"ondijitclick: hideOnClickClose\" role=\"button\" tabIndex=\"0\"></span\r\n\t></div\r\n\t><div data-dojo-attach-point=\"outerContainerNode\" class=\"idxOneuiHoverHelpTooltipContainer idxOneuiHoverHelpTooltipContents\"\r\n\t\t><div data-dojo-attach-point=\"containerNode\" role=\"document\" tabindex=0></div\r\n\t\t><a target=\"_blank\" href=\"#updateme\" class=\"idxOneuiHoverHelpTooltipLearnLink\" data-dojo-attach-point=\"learnMoreNode\"><span>${learnMoreLabel}</span></a\r\n\t></div\r\n\t><div class=\"idxOneuiHoverHelpTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\r\n></div>"}});
define("idx/oneui/HoverHelpTooltip",["dojo/_base/declare","dojo/_base/fx","dojo/keys","dojo/_base/array","dojo/dom","dojo/_base/lang","dojo/_base/sniff","dijit/focus","dojo/_base/event","dojo/dom-geometry","dijit/place","dijit/a11y","dijit/BackgroundIframe","dojo/dom-style","dojo/_base/window","dijit/_base/manager","dijit/_Widget","dijit/_TemplatedMixin","dijit/Tooltip","dojo/text!./templates/HoverHelpTooltip.html","dijit/dijit","dojo/i18n","dojo/i18n!./nls/HoverHelpTooltip"],function(_77b,fx,keys,_77c,dom,lang,has,_77d,_77e,_77f,_780,a11y,_781,_782,win,_783,_784,_785,_786,_787,_788,i18n){
var _789=_77b("idx.oneui.HoverHelpTooltip",_786,{showDelay:500,hideDelay:800,showLearnMore:false,learnMoreLinkValue:"#updateme",showCloseIcon:true,forceFocus:true,_onHover:function(e){
if(!_789._showTimer){
var _78a=e.target;
_789._showTimer=setTimeout(lang.hitch(this,function(){
this.open(_78a);
}),this.showDelay);
}
if(_789._hideTimer){
clearTimeout(_789._hideTimer);
delete _789._hideTimer;
}
},_onUnHover:function(){
if(_789._showTimer){
clearTimeout(_789._showTimer);
delete _789._showTimer;
}
if(!_789._hideTimer){
_789._hideTimer=setTimeout(lang.hitch(this,function(){
this.close();
}),this.hideDelay);
}
},open:function(_78b){
if(_789._showTimer){
clearTimeout(_789._showTimer);
delete _789._showTimer;
}
_789.show(this.label||this.domNode.innerHTML,_78b,this.position,!this.isLeftToRight(),this.textDir,this.showLearnMore,this.learnMoreLinkValue,this.showCloseIcon,this.forceFocus);
this._connectNode=_78b;
this.onShow(_78b,this.position);
},close:function(){
if(this._connectNode){
_789.hide(this._connectNode);
delete this._connectNode;
this.onHide();
}
if(_789._showTimer){
clearTimeout(_789._showTimer);
delete _789._showTimer;
}
},_setConnectIdAttr:function(_78c){
_77c.forEach(this._connections||[],function(_78d){
_77c.forEach(_78d,lang.hitch(this,"disconnect"));
},this);
this._connectIds=_77c.filter(lang.isArrayLike(_78c)?_78c:(_78c?[_78c]:[]),function(id){
return dom.byId(id);
});
this._connections=_77c.map(this._connectIds,function(id){
var node=dom.byId(id);
return [this.connect(node,"onmouseenter","_onHover"),this.connect(node,"onmouseleave","_onUnHover"),this.connect(node,"onclick","_onHover"),this.connect(node,"onkeypress","_onConnectIdKey")];
},this);
this._set("connectId",_78c);
},_onConnectIdKey:function(evt){
var node=evt.target;
if(evt.charOrCode==keys.ENTER||evt.charOrCode==keys.SPACE||evt.charOrCode==" "||evt.charOrCode==keys.F1){
_789._showTimer=setTimeout(lang.hitch(this,function(){
this.open(node);
}),this.showDelay);
_77e.stop(evt);
}
}});
var _78e=_77b("idx.oneui._MasterHoverHelpTooltip",[_784,_785],{duration:_783.defaultDuration,templateString:_787,learnMoreLabel:"",draggable:true,_firstFocusItem:null,_lastFocusItem:null,postMixInProperties:function(){
this.learnMoreLabel=i18n.getLocalization("idx.oneui","HoverHelpTooltip",this.lang).learnMoreLabel;
},postCreate:function(){
win.body().appendChild(this.domNode);
this.bgIframe=new _781(this.domNode);
this.fadeIn=fx.fadeIn({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onShow")});
this.fadeOut=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHide")});
this.connect(this.domNode,"onkeypress","_onKey");
this.connect(this.domNode,"onmouseenter",lang.hitch(this,function(e){
if(_789._hideTimer){
clearTimeout(_789._hideTimer);
delete _789._hideTimer;
}
this.focus();
this._keepShowing=true;
this.fadeOut.stop();
this.fadeIn.play();
}));
this.connect(this.domNode,"onmouseleave",lang.hitch(this,function(e){
this._keepShowing=false;
_789._hideTimer=setTimeout(lang.hitch(this,function(){
this.hide(this.aroundNode);
}),800);
}));
},show:function(_78f,_790,_791,rtl,_792,_793,_794,_795,_796){
this._lastFocusNode=_77d.curNode;
if(_793){
this.learnMoreNode.style.display="inline";
this.learnMoreNode.href=_794;
}else{
this.learnMoreNode.style.display="none";
}
if(_795||_795==null){
this.closeButtonNode.style.display="inline";
}else{
this.closeButtonNode.style.display="none";
}
this.connectorNode.hidden=false;
if(this.aroundNode&&this.aroundNode===_790&&this.containerNode.innerHTML==_78f){
return;
}
this.domNode.width="auto";
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_78f;
this.set("textDir",_792);
this.containerNode.align=rtl?"right":"left";
var pos=_780.around(this.domNode,_790,_791&&_791.length?_791:_789.defaultPosition,!rtl,lang.hitch(this,"orient"));
var _797=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_797.y+((_797.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_797.x+((_797.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}
}
_782.set(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_790;
if(_796){
this.focus();
}
},orient:function(node,_798,_799,_79a,_79b){
this.connectorNode.style.top="";
var _79c=_79a.w-this.connectorNode.offsetWidth;
node.className="idxOneuiHoverHelpTooltip "+{"MR-ML":"idxOneuiHoverHelpTooltipRight","ML-MR":"idxOneuiHoverHelpTooltipLeft","TM-BM":"idxOneuiHoverHelpTooltipAbove","BM-TM":"idxOneuiHoverHelpTooltipBelow","BL-TL":"idxOneuiHoverHelpTooltipBelow idxOneuiHoverHelpTooltipABLeft","TL-BL":"idxOneuiHoverHelpTooltipAbove idxOneuiHoverHelpTooltipABLeft","BR-TR":"idxOneuiHoverHelpTooltipBelow idxOneuiHoverHelpTooltipABRight","TR-BR":"idxOneuiHoverHelpTooltipAbove idxOneuiHoverHelpTooltipABRight","BR-BL":"idxOneuiHoverHelpTooltipRight","BL-BR":"idxOneuiHoverHelpTooltipLeft","TR-TL":"idxOneuiHoverHelpTooltipRight"}[_798+"-"+_799];
this.domNode.style.width="auto";
var size=_77f.getContentBox(this.domNode);
var _79d=Math.min((Math.max(_79c,1)),size.w);
var _79e=_79d<size.w;
this.domNode.style.width=_79d+"px";
if(_79e){
this.containerNode.style.overflow="auto";
var _79f=this.containerNode.scrollWidth;
this.containerNode.style.overflow="visible";
if(_79f>_79d){
_79f=_79f+_782.get(this.domNode,"paddingLeft")+_782.get(this.domNode,"paddingRight");
this.domNode.style.width=_79f+"px";
}
}
if(_799.charAt(0)=="B"&&_798.charAt(0)=="B"){
var mb=_77f.getMarginBox(node);
var _7a0=this.connectorNode.offsetHeight;
if(mb.h>_79a.h){
var _7a1=_79a.h-((_79b.h+_7a0)>>1);
this.connectorNode.style.top=_7a1+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_79b.h/2-_7a0/2,0),mb.h-_7a0)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_79c);
},focus:function(){
if(this._focus){
return;
}
this._getFocusItems(this.outerContainerNode);
this._focus=true;
_77d.focus(this._firstFocusItem);
},_onShow:function(){
if(has("ie")){
this.domNode.style.filter="";
}
},hide:function(_7a2){
if(this._keepShowing){
this._keepShowing=false;
return;
}
if(this._onDeck&&this._onDeck[1]==_7a2){
this._onDeck=null;
}else{
if(this.aroundNode===_7a2||this.isShowingNow){
this._forceHide();
}
}
},hideOnClickClose:function(){
this._forceHide();
},_forceHide:function(){
_77d.focus(this._lastFocusNode);
this._lastFocusNode=null;
this._firstFocusItem=null;
this._lastFocusItem=null;
this._focus=false;
this.fadeIn.stop();
this.isShowingNow=false;
this.fadeOut.play();
},_getFocusItems:function(){
if(this._firstFocusItem){
this._firstFocusItem=this.closeButtonNode;
return;
}
this._firstFocusItem=this.containerNode;
if(_782.get(this.learnMoreNode,"display")=="none"){
var _7a3=a11y._getTabNavigable(this.containerNode);
this._lastFocusItem=_7a3.last||_7a3.highest||this.containerNode;
}else{
this._lastFocusItem=this.learnMoreNode;
}
},_onKey:function(evt){
var node=evt.target;
if(evt.charOrCode===keys.TAB){
this._getFocusItems(this.outerContainerNode);
}
var _7a4=(this._firstFocusItem==this._lastFocusItem);
if(evt.charOrCode==keys.ESCAPE){
setTimeout(lang.hitch(this,"hideOnClickClose"),0);
_77e.stop(evt);
}else{
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===keys.TAB){
if(!_7a4){
_77d.focus(this._lastFocusItem);
}
_77e.stop(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===keys.TAB&&!evt.shiftKey){
if(!_7a4){
_77d.focus(this._firstFocusItem);
}
_77e.stop(evt);
}else{
if(evt.charOrCode===keys.TAB){
evt.stopPropagation();
}
}
}
}
},_onHide:function(){
this.domNode.style.cssText="";
this.containerNode.innerHTML="";
if(this._onDeck){
this.show.apply(this,this._onDeck);
this._onDeck=null;
}
this.aroundNode=null;
},onBlur:function(){
this._forceHide();
},_setAutoTextDir:function(node){
this.applyTextDir(node,has("ie")?node.outerText:node.textContent);
_77c.forEach(node.children,function(_7a5){
this._setAutoTextDir(_7a5);
},this);
},_setTextDirAttr:function(_7a6){
this._set("textDir",typeof _7a6!="undefined"?_7a6:"");
if(_7a6=="auto"){
this._setAutoTextDir(this.containerNode);
}else{
this.containerNode.dir=this.textDir;
}
}});
_789._MasterHoverHelpTooltip=_78e;
_789.show=idx.oneui.showHoverHelpTooltip=function(_7a7,_7a8,_7a9,rtl,_7aa,_7ab,_7ac,_7ad,_7ae){
if(!_789._masterTT){
idx.oneui._masterTT=_789._masterTT=new _78e();
}
return _789._masterTT.show(_7a7,_7a8,_7a9,rtl,_7aa,_7ab,_7ac,_7ad,_7ae);
};
_789.hide=idx.oneui.hideHoverHelpTooltip=function(_7af){
return _789._masterTT&&_789._masterTT.hide(_7af);
};
_789.defaultPosition=["after-centered","before-centered","below","above"];
return _789;
});
},"dijit/form/FilteringSelect":function(){
define("dijit/form/FilteringSelect",["dojo/data/util/filter","dojo/_base/declare","dojo/_base/Deferred","dojo/_base/lang","./MappedTextBox","./ComboBoxMixin"],function(_7b0,_7b1,_7b2,lang,_7b3,_7b4){
return _7b1("dijit.form.FilteringSelect",[_7b3,_7b4],{required:true,_lastDisplayedValue:"",_isValidSubset:function(){
return this._opened;
},isValid:function(){
return !!this.item||(!this.required&&this.get("displayedValue")=="");
},_refreshState:function(){
if(!this.searchTimer){
this.inherited(arguments);
}
},_callbackSetLabel:function(_7b5,_7b6,_7b7,_7b8){
if((_7b6&&_7b6[this.searchAttr]!==this._lastQuery)||(!_7b6&&_7b5.length&&this.store.getIdentity(_7b5[0])!=this._lastQuery)){
return;
}
if(!_7b5.length){
this.set("value","",_7b8||(_7b8===undefined&&!this.focused),this.textbox.value,null);
}else{
this.set("item",_7b5[0],_7b8);
}
},_openResultList:function(_7b9,_7ba,_7bb){
if(_7ba[this.searchAttr]!==this._lastQuery){
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
},_setValueAttr:function(_7bc,_7bd,_7be,item){
if(!this._onChangeActive){
_7bd=null;
}
if(item===undefined){
if(_7bc===null||_7bc===""){
_7bc="";
if(!lang.isString(_7be)){
this._setDisplayedValueAttr(_7be||"",_7bd);
return;
}
}
var self=this;
this._lastQuery=_7bc;
_7b2.when(this.store.get(_7bc),function(item){
self._callbackSetLabel(item?[item]:[],undefined,undefined,_7bd);
});
}else{
this.valueNode.value=_7bc;
this.inherited(arguments);
}
},_setItemAttr:function(item,_7bf,_7c0){
this.inherited(arguments);
this._lastDisplayedValue=this.textbox.value;
},_getDisplayQueryString:function(text){
return text.replace(/([\\\*\?])/g,"\\$1");
},_setDisplayedValueAttr:function(_7c1,_7c2){
if(_7c1==null){
_7c1="";
}
if(!this._created){
if(!("displayedValue" in this.params)){
return;
}
_7c2=false;
}
if(this.store){
this.closeDropDown();
var _7c3=lang.clone(this.query);
var qs=this._getDisplayQueryString(_7c1),q;
if(this.store._oldAPI){
q=qs;
}else{
q=_7b0.patternToRegExp(qs,this.ignoreCase);
q.toString=function(){
return qs;
};
}
this._lastQuery=_7c3[this.searchAttr]=q;
this.textbox.value=_7c1;
this._lastDisplayedValue=_7c1;
this._set("displayedValue",_7c1);
var _7c4=this;
var _7c5={ignoreCase:this.ignoreCase,deep:true};
lang.mixin(_7c5,this.fetchProperties);
this._fetchHandle=this.store.query(_7c3,_7c5);
_7b2.when(this._fetchHandle,function(_7c6){
_7c4._fetchHandle=null;
_7c4._callbackSetLabel(_7c6||[],_7c3,_7c5,_7c2);
},function(err){
_7c4._fetchHandle=null;
if(!_7c4._cancelingQuery){
console.error("dijit.form.FilteringSelect: "+err.toString());
}
});
}
},undo:function(){
this.set("displayedValue",this._lastDisplayedValue);
}});
});
},"dijit/form/_ButtonMixin":function(){
define("dijit/form/_ButtonMixin",["dojo/_base/declare","dojo/dom","dojo/_base/event","../registry"],function(_7c7,dom,_7c8,_7c9){
return _7c7("dijit.form._ButtonMixin",null,{label:"",type:"button",_onClick:function(e){
if(this.disabled){
_7c8.stop(e);
return false;
}
var _7ca=this.onClick(e)===false;
if(!_7ca&&this.type=="submit"&&!(this.valueNode||this.focusNode).form){
for(var node=this.domNode;node.parentNode;node=node.parentNode){
var _7cb=_7c9.byNode(node);
if(_7cb&&typeof _7cb._onSubmit=="function"){
_7cb._onSubmit(e);
_7ca=true;
break;
}
}
}
if(_7ca){
e.preventDefault();
}
return !_7ca;
},postCreate:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},onClick:function(){
return true;
},_setLabelAttr:function(_7cc){
this._set("label",_7cc);
(this.containerNode||this.focusNode).innerHTML=_7cc;
}});
});
},"dijit/registry":function(){
define("dijit/registry",["dojo/_base/array","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window","."],function(_7cd,has,_7ce,win,_7cf){
var _7d0={},hash={};
var _7d1={length:0,add:function(_7d2){
if(hash[_7d2.id]){
throw new Error("Tried to register widget with id=="+_7d2.id+" but that id is already registered");
}
hash[_7d2.id]=_7d2;
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
},getUniqueId:function(_7d3){
var id;
do{
id=_7d3+"_"+(_7d3 in _7d0?++_7d0[_7d3]:_7d0[_7d3]=0);
}while(hash[id]);
return _7cf._scopeName=="dijit"?id:_7cf._scopeName+"_"+id;
},findWidgets:function(root){
var _7d4=[];
function _7d5(root){
for(var node=root.firstChild;node;node=node.nextSibling){
if(node.nodeType==1){
var _7d6=node.getAttribute("widgetId");
if(_7d6){
var _7d7=hash[_7d6];
if(_7d7){
_7d4.push(_7d7);
}
}else{
_7d5(node);
}
}
}
};
_7d5(root);
return _7d4;
},_destroyAll:function(){
_7cf._curFocus=null;
_7cf._prevFocus=null;
_7cf._activeStack=[];
_7cd.forEach(_7d1.findWidgets(win.body()),function(_7d8){
if(!_7d8._destroyed){
if(_7d8.destroyRecursive){
_7d8.destroyRecursive();
}else{
if(_7d8.destroy){
_7d8.destroy();
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
_7cf.registry=_7d1;
return _7d1;
});
},"curam/layout/TabContainer":function(){
require({cache:{"url:curam/layout/resources/TabContainer.html":"<div class=\"dijitTabContainer\">\r\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\r\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer dijitAlignTop\"></div>\r\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container dijitAlignClient\" data-dojo-attach-point=\"containerNode\"></div>\r\n</div>\r\n"}});
define("curam/layout/TabContainer",["dijit/layout/TabContainer","dojo/text!curam/layout/resources/TabContainer.html"],function(_7d9,_7da){
var _7db=dojo.declare("curam.layout.TabContainer",_7d9,{templateString:_7da,_theSelectedTabIndex:0,_thePage:null,_theChildren:null,postCreate:function(){
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
var _7dc=this.getChildren();
var i=0;
var _7dd=0;
for(i=0;i<_7dc.length;i++){
if(_7dc[i].get("selected")){
_7dd=i;
break;
}
}
this._theSelectedTabIndex=_7dd;
this._thePage=page;
this._theChildren=_7dc;
}
this.inherited(arguments);
}});
return _7db;
});
},"dijit/_base/wai":function(){
define("dijit/_base/wai",["dojo/dom-attr","dojo/_base/lang","..","../hccss"],function(_7de,lang,_7df){
lang.mixin(_7df,{hasWaiRole:function(elem,role){
var _7e0=this.getWaiRole(elem);
return role?(_7e0.indexOf(role)>-1):(_7e0.length>0);
},getWaiRole:function(elem){
return lang.trim((_7de.get(elem,"role")||"").replace("wairole:",""));
},setWaiRole:function(elem,role){
_7de.set(elem,"role",role);
},removeWaiRole:function(elem,role){
var _7e1=_7de.get(elem,"role");
if(!_7e1){
return;
}
if(role){
var t=lang.trim((" "+_7e1+" ").replace(" "+role+" "," "));
_7de.set(elem,"role",t);
}else{
elem.removeAttribute("role");
}
},hasWaiState:function(elem,_7e2){
return elem.hasAttribute?elem.hasAttribute("aria-"+_7e2):!!elem.getAttribute("aria-"+_7e2);
},getWaiState:function(elem,_7e3){
return elem.getAttribute("aria-"+_7e3)||"";
},setWaiState:function(elem,_7e4,_7e5){
elem.setAttribute("aria-"+_7e4,_7e5);
},removeWaiState:function(elem,_7e6){
elem.removeAttribute("aria-"+_7e6);
}});
return _7df;
});
},"curam/util/ResourceBundle":function(){
define("curam/util/ResourceBundle",["dojo/i18n","dojo/string"],function(i18n,_7e7){
var _7e8=dojo.declare("curam.util.ResourceBundle",null,{_bundle:undefined,constructor:function(_7e9,_7ea){
var _7eb=_7e9.split(".");
var _7ec=_7eb[_7eb.length-1];
var _7ed=_7eb.length==1?"curam.application":_7e9.slice(0,_7e9.length-_7ec.length-1);
try{
var b=i18n.getLocalization(_7ed,_7ec,_7ea);
if(this._isEmpty(b)){
throw new Error("Empty resource bundle.");
}else{
this._bundle=b;
}
}
catch(e){
throw new Error("Unable to access resource bundle: "+_7ed+"."+_7ec+": "+e.message);
}
},_isEmpty:function(_7ee){
for(var prop in _7ee){
return false;
}
return true;
},getProperty:function(key,_7ef){
var msg=this._bundle[key];
var _7f0=msg;
if(_7ef){
_7f0=_7e7.substitute(msg,_7ef);
}
return _7f0;
}});
return _7e8;
});
},"dojo/store/util/QueryResults":function(){
define("dojo/store/util/QueryResults",["../../_base/array","../../_base/lang","../../_base/Deferred"],function(_7f1,lang,_7f2){
var util=lang.getObject("dojo.store.util",true);
util.QueryResults=function(_7f3){
if(!_7f3){
return _7f3;
}
if(_7f3.then){
_7f3=lang.delegate(_7f3);
}
function _7f4(_7f5){
if(!_7f3[_7f5]){
_7f3[_7f5]=function(){
var args=arguments;
return _7f2.when(_7f3,function(_7f6){
Array.prototype.unshift.call(args,_7f6);
return util.QueryResults(_7f1[_7f5].apply(_7f1,args));
});
};
}
};
_7f4("forEach");
_7f4("filter");
_7f4("map");
if(!_7f3.total){
_7f3.total=_7f2.when(_7f3,function(_7f7){
return _7f7.length;
});
}
return _7f3;
};
return util.QueryResults;
});
},"dijit/form/_ListBase":function(){
define("dijit/form/_ListBase",["dojo/_base/declare","dojo/window"],function(_7f8,_7f9){
return _7f8("dijit.form._ListBase",null,{selected:null,_getTarget:function(evt){
var tgt=evt.target;
var _7fa=this.containerNode;
if(tgt==_7fa||tgt==this.domNode){
return null;
}
while(tgt&&tgt.parentNode!=_7fa){
tgt=tgt.parentNode;
}
return tgt;
},selectFirstNode:function(){
var _7fb=this.containerNode.firstChild;
while(_7fb&&_7fb.style.display=="none"){
_7fb=_7fb.nextSibling;
}
this._setSelectedAttr(_7fb);
},selectLastNode:function(){
var last=this.containerNode.lastChild;
while(last&&last.style.display=="none"){
last=last.previousSibling;
}
this._setSelectedAttr(last);
},selectNextNode:function(){
var _7fc=this._getSelectedAttr();
if(!_7fc){
this.selectFirstNode();
}else{
var next=_7fc.nextSibling;
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
var _7fd=this._getSelectedAttr();
if(!_7fd){
this.selectLastNode();
}else{
var prev=_7fd.previousSibling;
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
var _7fe=this._getSelectedAttr();
if(_7fe){
this.onDeselect(_7fe);
this.selected=null;
}
if(node&&node.parentNode==this.containerNode){
this.selected=node;
_7f9.scrollIntoView(node);
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
},"dijit/form/_FormWidget":function(){
define("dijit/form/_FormWidget",["dojo/_base/declare","dojo/_base/kernel","dojo/ready","../_Widget","../_CssStateMixin","../_TemplatedMixin","./_FormWidgetMixin"],function(_7ff,_800,_801,_802,_803,_804,_805){
if(!_800.isAsync){
_801(0,function(){
var _806=["dijit/form/_FormValueWidget"];
require(_806);
});
}
return _7ff("dijit.form._FormWidget",[_802,_804,_803,_805],{setDisabled:function(_807){
_800.deprecated("setDisabled("+_807+") is deprecated. Use set('disabled',"+_807+") instead.","","2.0");
this.set("disabled",_807);
},setValue:function(_808){
_800.deprecated("dijit.form._FormWidget:setValue("+_808+") is deprecated.  Use set('value',"+_808+") instead.","","2.0");
this.set("value",_808);
},getValue:function(){
_800.deprecated(this.declaredClass+"::getValue() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},postMixInProperties:function(){
this.nameAttrSetting=this.name?("name=\""+this.name.replace(/'/g,"&quot;")+"\""):"";
this.inherited(arguments);
},_setTypeAttr:null});
});
},"curam/tab":function(){
define("curam/tab",["curam/define","curam/util","curam/util/ScreenContext"],function(){
curam.define.singleton("curam.tab",{SECTION_TAB_CONTAINER_ID:"app-sections-container-dc",SMART_PANEL_IFRAME_ID:"curam_tab_SmartPanelIframe",toBeExecutedOnTabClose:[],_mockSelectedTab:null,getSelectedTab:function(_809){
if(curam.tab._mockSelectedTab){
return curam.tab._mockSelectedTab;
}
if(curam.tab.getTabContainer(_809)){
return curam.tab.getTabContainer(_809).selectedChildWidget;
}
},getTabContainer:function(_80a){
return curam.tab.getTabContainerFromSectionID(_80a||curam.tab.getCurrentSectionId());
},getCurrentSectionId:function(_80b){
var _80c=curam.util.getTopmostWindow().dijit.byId(curam.tab.SECTION_TAB_CONTAINER_ID);
if(_80c){
var _80d=_80c.selectedChildWidget.domNode.id;
return _80d.substring(0,_80d.length-4);
}else{
if(!_80b){
throw new Error("curam.tab.getCurrentSectionId() - application section"+" tab container not found");
}
}
return null;
},inTabbedUI:function(){
return curam.tab.getCurrentSectionId(true)!=null;
},getTabContainerFromSectionID:function(_80e){
var _80f=dijit.byId(_80e+"-stc");
if(!_80f&&window.parent&&window.parent!=window){
_80f=curam.util.getTopmostWindow().dijit.byId(_80e+"-stc");
}
return _80f;
},getTabWidgetId:function(tab){
return tab.id;
},getSelectedTabWidgetId:function(){
return curam.tab.getTabWidgetId(curam.tab.getSelectedTab());
},getContainerTab:function(node){
var _810=dijit.getEnclosingWidget(node);
if(_810&&!_810.tabDescriptor){
_810=curam.tab.getContainerTab(_810.domNode.parentNode);
}
if(!_810||!_810.tabDescriptor){
throw "Containing tab widget could not be found for node: "+node;
}
return _810;
},getContentPanelIframe:function(tab){
var _811=tab?tab:curam.tab.getSelectedTab(),_812=null;
if(_811){
_812=dojo.query("iframe",_811.domNode).filter(function(item){
return dojo.attr(item,"iscpiframe")=="true";
})[0];
}
return _812?_812:null;
},refreshMainContentPanel:function(tab){
var _813=curam.tab.getContentPanelIframe(tab);
_813.contentWindow.curam.util.publishRefreshEvent();
_813.contentWindow.location.reload(true);
},getSmartPanelIframe:function(tab){
var _814=tab?tab:curam.tab.getSelectedTab();
var _815=dojo.query("iframe",_814.domNode).filter(function(item){
return item.id==curam.tab.SMART_PANEL_IFRAME_ID;
})[0];
return _815;
},unsubscribeOnTabClose:function(_816,_817){
curam.tab.toBeExecutedOnTabClose.push(function(_818){
if(_817==_818){
dojo.unsubscribe(_816);
return true;
}
return false;
});
},executeOnTabClose:function(func,_819){
curam.tab.toBeExecutedOnTabClose.push(function(_81a){
if(_819==_81a){
func();
return true;
}
return false;
});
},doExecuteOnTabClose:function(_81b){
var _81c=new Array();
for(var i=0;i<curam.tab.toBeExecutedOnTabClose.length;i++){
var func=curam.tab.toBeExecutedOnTabClose[i];
if(!func(_81b)){
_81c.push(func);
}
}
curam.tab.toBeExecutedOnTabClose=_81c;
},getHandlerForTab:function(_81d,_81e){
return function(_81f,_820){
if(_820==_81e){
_81d(_81f,_81e);
}else{
}
};
},getTabController:function(){
return curam.util.getTopmostWindow().curam.ui.UIController;
},initTabLinks:function(_821){
if(typeof (window.pageContainsClassicIEG)!="undefined"&&window.pageContainsClassicIEG==true){
return;
}
dojo.query("a").forEach(function(link){
if(link.href.indexOf("#")!=0&&link.href.indexOf("javascript:")!=0&&(link.href.indexOf("Page.do")>-1||link.href.indexOf("Frame.do")>-1)){
if(link.href.indexOf("&o3ctx")<0&&link.href.indexOf("?o3ctx")<0){
var _822=(link.href.indexOf("?")>-1)?"&":"?";
link.href+=_822+jsScreenContext.toRequestString();
}
}
});
elements=document.forms;
for(var i=0;i<elements.length;++i){
elem=elements[i];
var _823=dojo.byId("o3ctx");
if(!_823){
var ctx=new curam.util.ScreenContext();
ctx.setContextBits("ACTION");
dojo.create("input",{"type":"hidden","name":"o3ctx","value":ctx.getValue()},elem);
}
dojo.create("input",{"type":"hidden","name":"o3prv","value":jsPageID},elem);
}
if(elements.length>0){
curam.util.getTopmostWindow().dojo.publish("curam.fireNextRequest",[]);
}
},initContent:function(_824,_825){
var _826=dojo.byId("content");
dojo.removeClass(_826,"hidden-panel");
return;
},setupSectionSelectionListener:function(){
dojo.subscribe(curam.tab.SECTION_TAB_CONTAINER_ID+"-selectChild",curam.tab.onSectionSelected);
},onSectionSelected:function(_827){
if(_827.curamDefaultPageID){
var _828;
if(_827.id.substring(_827.id.length-4,_827.id.length)=="-sbc"){
var _829=_827.id.substring(0,_827.id.length-4);
_828=curam.tab.getTabContainer(_829);
}else{
_828=_827;
}
if(_828&&_828.getChildren().length==0){
curam.tab.getTabController().handleUIMPageID(_827.curamDefaultPageID,true);
}
return true;
}
return false;
},setSectionDefaultPage:function(_82a,_82b){
var _82c=dijit.byId(_82a);
if(_82c){
_82c.curamDefaultPageID=_82b;
}else{
throw "curam.tab.setSectionDefaultPage() - cannot find section dijit ID:"+_82a;
}
},publishSmartPanelContentReady:function(){
var _82d="smartpanel.content.loaded";
var _82e=window.frameElement;
_82e.setAttribute("_SPContentLoaded","true");
curam.util.getTopmostWindow().dojo.publish(_82d,[_82e]);
}});
return curam.tab;
});
},"dijit/_base/place":function(){
define("dijit/_base/place",["dojo/_base/array","dojo/_base/lang","dojo/window","../place",".."],function(_82f,lang,_830,_831,_832){
_832.getViewport=function(){
return _830.getBox();
};
_832.placeOnScreen=_831.at;
_832.placeOnScreenAroundElement=function(node,_833,_834,_835){
var _836;
if(lang.isArray(_834)){
_836=_834;
}else{
_836=[];
for(var key in _834){
_836.push({aroundCorner:key,corner:_834[key]});
}
}
return _831.around(node,_833,_836,true,_835);
};
_832.placeOnScreenAroundNode=_832.placeOnScreenAroundElement;
_832.placeOnScreenAroundRectangle=_832.placeOnScreenAroundElement;
_832.getPopupAroundAlignment=function(_837,_838){
var _839={};
_82f.forEach(_837,function(pos){
var ltr=_838;
switch(pos){
case "after":
_839[_838?"BR":"BL"]=_838?"BL":"BR";
break;
case "before":
_839[_838?"BL":"BR"]=_838?"BR":"BL";
break;
case "below-alt":
ltr=!ltr;
case "below":
_839[ltr?"BL":"BR"]=ltr?"TL":"TR";
_839[ltr?"BR":"BL"]=ltr?"TR":"TL";
break;
case "above-alt":
ltr=!ltr;
case "above":
default:
_839[ltr?"TL":"TR"]=ltr?"BL":"BR";
_839[ltr?"TR":"TL"]=ltr?"BR":"BL";
break;
}
});
return _839;
};
return _832;
});
},"dijit/form/_ComboBoxMenu":function(){
define("dijit/form/_ComboBoxMenu",["dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/keys","../_WidgetBase","../_TemplatedMixin","./_ComboBoxMenuMixin","./_ListMouseMixin"],function(_83a,_83b,_83c,_83d,keys,_83e,_83f,_840,_841){
return _83a("dijit.form._ComboBoxMenu",[_83e,_83f,_841,_840],{templateString:"<div class='dijitReset dijitMenu' data-dojo-attach-point='containerNode' style='overflow: auto; overflow-x: hidden;'>"+"<div class='dijitMenuItem dijitMenuPreviousButton' data-dojo-attach-point='previousButton' role='option'></div>"+"<div class='dijitMenuItem dijitMenuNextButton' data-dojo-attach-point='nextButton' role='option'></div>"+"</div>",baseClass:"dijitComboBoxMenu",postCreate:function(){
this.inherited(arguments);
if(!this.isLeftToRight()){
_83b.add(this.previousButton,"dijitMenuItemRtl");
_83b.add(this.nextButton,"dijitMenuItemRtl");
}
},_createMenuItem:function(){
return _83c.create("div",{"class":"dijitReset dijitMenuItem"+(this.isLeftToRight()?"":" dijitMenuItemRtl"),role:"option"});
},onHover:function(node){
_83b.add(node,"dijitMenuItemHover");
},onUnhover:function(node){
_83b.remove(node,"dijitMenuItemHover");
},onSelect:function(node){
_83b.add(node,"dijitMenuItemSelected");
},onDeselect:function(node){
_83b.remove(node,"dijitMenuItemSelected");
},_page:function(up){
var _842=0;
var _843=this.domNode.scrollTop;
var _844=_83d.get(this.domNode,"height");
if(!this.getHighlightedOption()){
this.selectNextNode();
}
while(_842<_844){
var _845=this.getHighlightedOption();
if(up){
if(!_845.previousSibling||_845.previousSibling.style.display=="none"){
break;
}
this.selectPreviousNode();
}else{
if(!_845.nextSibling||_845.nextSibling.style.display=="none"){
break;
}
this.selectNextNode();
}
var _846=this.domNode.scrollTop;
_842+=(_846-_843)*(up?-1:1);
_843=_846;
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
},"cm/_base/_dom":function(){
define("cm/_base/_dom",[],function(){
var cm=dojo.global.cm||{};
dojo.global.cm=cm;
dojo.mixin(cm,{nextSibling:function(node,_847){
return cm._findSibling(node,_847,true);
},prevSibling:function(node,_848){
return cm._findSibling(node,_848,false);
},getInput:function(name,_849){
if(!dojo.isString(name)){
return name;
}
var _84a=dojo.query("input[name='"+name+"'],select[name='"+name+"']");
return _849?(_84a.length>0?_84a:null):(_84a.length>0?_84a[0]:null);
},getParentByClass:function(node,_84b){
node=node.parentNode;
while(node){
if(dojo.hasClass(node,_84b)){
return node;
}
node=node.parentNode;
}
return null;
},getParentByType:function(node,type){
node=node.parentNode;
type=type.toLowerCase();
var _84c="html";
while(node){
if(node.tagName.toLowerCase()==_84c){
break;
}
if(node.tagName.toLowerCase()==type){
return node;
}
node=node.parentNode;
}
return null;
},replaceClass:function(node,_84d,_84e){
dojo.removeClass(node,_84e);
dojo.addClass(node,_84d);
},setClass:function(node,_84f){
node=dojo.byId(node);
var cs=new String(_84f);
try{
if(typeof node.className=="string"){
node.className=cs;
}else{
if(node.setAttribute){
node.setAttribute("class",_84f);
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
},_findSibling:function(node,_850,_851){
if(!node){
return null;
}
if(_850){
_850=_850.toLowerCase();
}
var _852=_851?"nextSibling":"previousSibling";
do{
node=node[_852];
}while(node&&node.nodeType!=1);
if(node&&_850&&_850!=node.tagName.toLowerCase()){
return cm[_851?"nextSibling":"prevSibling"](node,_850);
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
},endsWith:function(str,end,_853){
if(_853){
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
},"url:dijit/layout/templates/ScrollingTabController.html":"<div class=\"dijitTabListContainer-${tabPosition} tabStrip-disabled dijitLayoutContainer\"><!-- CURAM-FIX: removed style=\"visibility:hidden, dd the tabStrip-disabled class by default.\" -->\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerMenuButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_menuBtn\"\r\n\t\t\tdata-dojo-props=\"containerId: '${containerId}', iconClass: 'dijitTabStripMenuIcon',\r\n\t\t\t\t\tdropDownPosition: ['below-alt', 'above-alt']\"\r\n\t\t\tdata-dojo-attach-point=\"_menuBtn\" showLabel=\"false\" title=\"\">&#9660;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_leftBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideLeftIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_leftBtn\" data-dojo-attach-event=\"onClick: doSlideLeft\">&#9664;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_rightBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideRightIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_rightBtn\" data-dojo-attach-event=\"onClick: doSlideRight\">&#9654;</div>\r\n\t<div class='dijitTabListWrapper dijitTabContainerTopNone dijitAlignClient' data-dojo-attach-point='tablistWrapper'>\r\n\t\t<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'\r\n\t\t\t\tdata-dojo-attach-point='containerNode' class='nowrapTabStrip dijitTabContainerTop-tabs'></div>\r\n\t</div>\r\n</div>\r\n","dijit/_base/focus":function(){
define("dijit/_base/focus",["dojo/_base/array","dojo/dom","dojo/_base/lang","dojo/topic","dojo/_base/window","../focus",".."],function(_854,dom,lang,_855,win,_856,_857){
lang.mixin(_857,{_curFocus:null,_prevFocus:null,isCollapsed:function(){
return _857.getBookmark().isCollapsed;
},getBookmark:function(){
var bm,rg,tg,sel=win.doc.selection,cf=_856.curNode;
if(win.global.getSelection){
sel=win.global.getSelection();
if(sel){
if(sel.isCollapsed){
tg=cf?cf.tagName:"";
if(tg){
tg=tg.toLowerCase();
if(tg=="textarea"||(tg=="input"&&(!cf.type||cf.type.toLowerCase()=="text"))){
sel={start:cf.selectionStart,end:cf.selectionEnd,node:cf,pRange:true};
return {isCollapsed:(sel.end<=sel.start),mark:sel};
}
}
bm={isCollapsed:true};
if(sel.rangeCount){
bm.mark=sel.getRangeAt(0).cloneRange();
}
}else{
rg=sel.getRangeAt(0);
bm={isCollapsed:false,mark:rg.cloneRange()};
}
}
}else{
if(sel){
tg=cf?cf.tagName:"";
tg=tg.toLowerCase();
if(cf&&tg&&(tg=="button"||tg=="textarea"||tg=="input")){
if(sel.type&&sel.type.toLowerCase()=="none"){
return {isCollapsed:true,mark:null};
}else{
rg=sel.createRange();
return {isCollapsed:rg.text&&rg.text.length?false:true,mark:{range:rg,pRange:true}};
}
}
bm={};
try{
rg=sel.createRange();
bm.isCollapsed=!(sel.type=="Text"?rg.htmlText.length:rg.length);
}
catch(e){
bm.isCollapsed=true;
return bm;
}
if(sel.type.toUpperCase()=="CONTROL"){
if(rg.length){
bm.mark=[];
var i=0,len=rg.length;
while(i<len){
bm.mark.push(rg.item(i++));
}
}else{
bm.isCollapsed=true;
bm.mark=null;
}
}else{
bm.mark=rg.getBookmark();
}
}else{
console.warn("No idea how to store the current selection for this browser!");
}
}
return bm;
},moveToBookmark:function(_858){
var _859=win.doc,mark=_858.mark;
if(mark){
if(win.global.getSelection){
var sel=win.global.getSelection();
if(sel&&sel.removeAllRanges){
if(mark.pRange){
var n=mark.node;
n.selectionStart=mark.start;
n.selectionEnd=mark.end;
}else{
sel.removeAllRanges();
sel.addRange(mark);
}
}else{
console.warn("No idea how to restore selection for this browser!");
}
}else{
if(_859.selection&&mark){
var rg;
if(mark.pRange){
rg=mark.range;
}else{
if(lang.isArray(mark)){
rg=_859.body.createControlRange();
_854.forEach(mark,function(n){
rg.addElement(n);
});
}else{
rg=_859.body.createTextRange();
rg.moveToBookmark(mark);
}
}
rg.select();
}
}
}
},getFocus:function(menu,_85a){
var node=!_856.curNode||(menu&&dom.isDescendant(_856.curNode,menu.domNode))?_857._prevFocus:_856.curNode;
return {node:node,bookmark:node&&(node==_856.curNode)&&win.withGlobal(_85a||win.global,_857.getBookmark),openedForWindow:_85a};
},_activeStack:[],registerIframe:function(_85b){
return _856.registerIframe(_85b);
},unregisterIframe:function(_85c){
_85c&&_85c.remove();
},registerWin:function(_85d,_85e){
return _856.registerWin(_85d,_85e);
},unregisterWin:function(_85f){
_85f&&_85f.remove();
}});
_856.focus=function(_860){
if(!_860){
return;
}
var node="node" in _860?_860.node:_860,_861=_860.bookmark,_862=_860.openedForWindow,_863=_861?_861.isCollapsed:false;
if(node){
var _864=(node.tagName.toLowerCase()=="iframe")?node.contentWindow:node;
if(_864&&_864.focus){
try{
_864.focus();
}
catch(e){
}
}
_856._onFocusNode(node);
}
if(_861&&win.withGlobal(_862||win.global,_857.isCollapsed)&&!_863){
if(_862){
_862.focus();
}
try{
win.withGlobal(_862||win.global,_857.moveToBookmark,null,[_861]);
}
catch(e2){
}
}
};
_856.watch("curNode",function(name,_865,_866){
_857._curFocus=_866;
_857._prevFocus=_865;
if(_866){
_855.publish("focusNode",_866);
}
});
_856.watch("activeStack",function(name,_867,_868){
_857._activeStack=_868;
});
_856.on("widget-blur",function(_869,by){
_855.publish("widgetBlur",_869,by);
});
_856.on("widget-focus",function(_86a,by){
_855.publish("widgetFocus",_86a,by);
});
return _857;
});
},"curam/util/ScreenContext":function(){
define("curam/util/ScreenContext",[],function(){
var _86b={DEFAULT_CONTEXT:112,SAMPLE22:2,SAMPLE21:1,SAMPLE13:4,SAMPLE12:2,SAMPLE11:1,EXTAPP:1048576,CONTEXT_PORTLET:524288,SMART_PANEL:262144,NESTED_UIM:131072,ORG_TREE:65536,CONTEXT_PANEL:32768,LIST_ROW_INLINE_PAGE:8192,LIST_EVEN_ROW:16384,TAB:4096,TREE:2048,AGENDA:1024,POPUP:512,MODAL:256,HOME:128,HEADER:64,NAVIGATOR:32,FOOTER:16,OVAL:8,RESOLVE:4,ACTION:2,ERROR:1,EMPTY:0};
var _86c=[["ERROR","ACTION","RESOLVE","OPT_VALIDATION","FOOTER","NAVIGATOR","HEADER","HOME_PAGE","MODAL","POPUP","AGENDA","TREE","TAB","LIST_EVEN_ROW","LIST_ROW_INLINE_PAGE","CONTEXT_PANEL","ORG_TREE","NESTED_UIM","SMART_PANEL","CONTEXT_PORTLET","EXTAPP"],["SAMPLE11","SAMPLE12","SAMPLE13"],["SAMPLE21","SAMPLE22"]];
var _86d=dojo.declare("curam.util.ScreenContext",null,{constructor:function(_86e){
if(_86e){
this.setContext(_86e);
}else{
this.currentContext=[_86b["DEFAULT_CONTEXT"]|_86b["DEFAULT_CONTEXT"]];
}
},setContext:function(_86f){
var tmp=this.setup(_86f);
this.currentContext=((tmp==null)?([_86b["DEFAULT_CONTEXT"]|_86b["DEFAULT_CONTEXT"]]):(tmp));
},addContextBits:function(_870,idx){
if(!_870){
return;
}
var _871=(idx)?idx:0;
var _872=this.parseContext(_870);
if(_872!=null){
this.currentContext[_871]|=_872;
}
return this.currentContext[_871];
},addAll:function(idx){
var _873=(idx)?idx:0;
this.currentContext[_873]=4294967295;
return this.currentContext[_873];
},clear:function(_874,idx){
if(!_874){
this.clearAll();
return;
}
var _875=(idx)?idx:0;
if(_874==0){
return this.currentContext[_875];
}
var _876=this.parseContext(_874);
if(_876!=null){
var _877=this.currentContext[_875]&_876;
this.currentContext[_875]^=_877;
}
return this.currentContext[_875];
},clearAll:function(idx){
if(idx){
this.currentContext[idx]=0;
}else{
for(var i=0;i<this.currentContext.length;i++){
this.currentContext[i]=0;
}
}
},updateStates:function(_878){
this.clear("ERROR|ACTION|RESOLVE");
this.currentContext[0]=this.currentContext[0]|(_878&7);
},hasContextBits:function(_879,idx){
if(!_879){
return false;
}
var _87a=(idx)?idx:0;
var _87b=this.parseContext(_879);
if(_87b!=null){
var _87c=this.currentContext[_87a]&_87b;
return (_87c==_87b);
}
return false;
},getValue:function(){
var _87d="";
for(var i=0;i<this.currentContext.length;i++){
_87d+=this.currentContext[i]+"|";
}
return _87d.substring(0,_87d.length-1);
},toRequestString:function(){
return "o3ctx="+this.getValue();
},toBinary:function(){
var _87e="";
for(var i=0;i<this.currentContext.length;i++){
_87e+=this.currentContext[i].toString(2)+"|";
}
return _87e.substring(0,_87e.length-1);
},toString:function(){
var _87f="";
for(var i=0;i<this.currentContext.length;i++){
var _880="";
var j=0;
while(j<_86c[i].length){
if(((this.currentContext[i]>>j)&1)!=0){
_880+=","+_86c[i][j];
}
j++;
}
if(_880==""){
return "{}";
}
_87f+="|"+_880.replace(",","{")+((_880.length==0)?"":"}");
}
return _87f.substring(1);
},parseContext:function(_881){
var _882=_881.replace(/,/g,"|");
var _883=_882.split("|");
var tmp=isNaN(_883[0])?parseInt(_86b[_883[0]]):_883[0];
for(var i=1;i<_883.length;i++){
tmp=tmp|(isNaN(_883[i])?parseInt(_86b[_883[i]]):_883[i]);
}
return (isNaN(tmp)?null:tmp);
},setup:function(_884){
if(!_884){
return null;
}
var _885=(""+_884).split("|");
var _886=new Array(_885.length);
for(var i=0;i<_885.length;i++){
_886[i]=this.parseContext(_885[_885.length-i-1]);
_886[i]=_886[i]|_886[i];
if(!_886[i]||isNaN(_886[i])||_886[i]>4294967295){
return null;
}
}
return _886;
}});
return _86d;
});
},"dijit/a11y":function(){
define("dijit/a11y",["dojo/_base/array","dojo/_base/config","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-style","dojo/_base/sniff","./_base/manager","."],function(_887,_888,_889,dom,_88a,_88b,has,_88c,_88d){
var _88e=(_88d._isElementShown=function(elem){
var s=_88b.get(elem);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(_88a.get(elem,"type")!="hidden");
});
_88d.hasDefaultTabStop=function(elem){
switch(elem.nodeName.toLowerCase()){
case "a":
return _88a.has(elem,"href");
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
var _88f=elem.contentDocument;
if("designMode" in _88f&&_88f.designMode=="on"){
return true;
}
body=_88f.body;
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
var _890=(_88d.isTabNavigable=function(elem){
if(_88a.get(elem,"disabled")){
return false;
}else{
if(_88a.has(elem,"tabIndex")){
return _88a.get(elem,"tabIndex")>=0;
}else{
return _88d.hasDefaultTabStop(elem);
}
}
});
_88d._getTabNavigable=function(root){
var _891,last,_892,_893,_894,_895,_896={};
function _897(node){
return node&&node.tagName.toLowerCase()=="input"&&node.type&&node.type.toLowerCase()=="radio"&&node.name&&node.name.toLowerCase();
};
var _898=function(_899){
for(var _89a=_899.firstChild;_89a;_89a=_89a.nextSibling){
if(_89a.nodeType!=1||(has("ie")<=9&&_89a.scopeName!=="HTML")||!_88e(_89a)){
continue;
}
if(_890(_89a)){
var _89b=_88a.get(_89a,"tabIndex");
if(!_88a.has(_89a,"tabIndex")||_89b==0){
if(!_891){
_891=_89a;
}
last=_89a;
}else{
if(_89b>0){
if(!_892||_89b<_893){
_893=_89b;
_892=_89a;
}
if(!_894||_89b>=_895){
_895=_89b;
_894=_89a;
}
}
}
var rn=_897(_89a);
if(_88a.get(_89a,"checked")&&rn){
_896[rn]=_89a;
}
}
if(_89a.nodeName.toUpperCase()!="SELECT"){
_898(_89a);
}
}
};
if(_88e(root)){
_898(root);
}
function rs(node){
return _896[_897(node)]||node;
};
return {first:rs(_891),last:rs(last),lowest:rs(_892),highest:rs(_894)};
};
_88d.getFirstInTabbingOrder=function(root){
var _89c=_88d._getTabNavigable(dom.byId(root));
return _89c.lowest?_89c.lowest:_89c.first;
};
_88d.getLastInTabbingOrder=function(root){
var _89d=_88d._getTabNavigable(dom.byId(root));
return _89d.last?_89d.last:_89d.highest;
};
return {hasDefaultTabStop:_88d.hasDefaultTabStop,isTabNavigable:_88d.isTabNavigable,_getTabNavigable:_88d._getTabNavigable,getFirstInTabbingOrder:_88d.getFirstInTabbingOrder,getLastInTabbingOrder:_88d.getLastInTabbingOrder};
});
},"idx/oneui/form/_ValidationMixin":function(){
define("idx/oneui/form/_ValidationMixin",["dojo/_base/declare","dojo/dom-style","dojo/i18n","dijit/_base/wai","../HoverHelpTooltip","dojo/i18n!dijit/form/nls/validate"],function(_89e,_89f,i18n,wai,_8a0,nls){
return _89e("idx.oneui.form._ValidationMixin",null,{instantValidate:false,required:false,invalidMessage:"$_unset_$",missingMessage:null,tooltipPosition:[],postMixInProperties:function(){
this.inherited(arguments);
this.missingMessage||(this.missingMessage=nls.missingMessage);
},postCreate:function(){
this.inherited(arguments);
if(this.instantValidate){
this.connect(this,this.extension["input"],function(){
this.validate(this.focused);
});
}else{
this.connect(this,this.extension["blur"],function(){
this.validate(this.focused);
});
this.connect(this,this.extension["focus"],function(){
this._set("state","");
if(this.message==""){
return;
}
this.displayMessage(this.message);
this.message="";
});
this.connect(this,this.extension["input"],function(){
this.displayMessage();
});
}
this.connect(this.iconNode,"onmouseenter",function(){
if(this.message&&_89f.get(this.iconNode,"visibility")=="visible"){
_8a0.show(this.message,this.iconNode,this.tooltipPosition,!this.isLeftToRight());
}
});
},_isValid:function(_8a1){
return this.isValid(_8a1)&&!(this.required&&this._isEmpty());
},_isEmpty:function(){
return false;
},isValid:function(_8a2){
return true;
},getErrorMessage:function(_8a3){
return (this.required&&this._isEmpty())?this.missingMessage:this.invalidMessage;
},validate:function(_8a4){
var _8a5,_8a6=this.disabled||this._isValid(_8a4);
this.set("state",_8a6?"":"Error");
wai.setWaiState(this.focusNode,"invalid",!_8a6);
if(this.state=="Error"){
_8a5=this.getErrorMessage(_8a4);
}
this._set("message",_8a5);
this.displayMessage(_8a5);
return _8a6;
},displayMessage:function(_8a7,_8a8){
_8a0.hide(this.oneuiBaseNode);
_8a0.hide(this.iconNode);
if(_8a7&&this.focused||_8a8){
var node=_89f.get(this.iconNode,"visibility")=="hidden"?this.oneuiBaseNode:this.iconNode;
_8a0.show(_8a7,node,this.tooltipPosition,!this.isLeftToRight());
}
},_onBlur:function(){
this.inherited(arguments);
this.displayMessage("");
}});
});
},"dijit/form/_ToggleButtonMixin":function(){
define("dijit/form/_ToggleButtonMixin",["dojo/_base/declare","dojo/dom-attr"],function(_8a9,_8aa){
return _8a9("dijit.form._ToggleButtonMixin",null,{checked:false,_aria_attr:"aria-pressed",_onClick:function(evt){
var _8ab=this.checked;
this._set("checked",!_8ab);
var ret=this.inherited(arguments);
this.set("checked",ret?this.checked:_8ab);
return ret;
},_setCheckedAttr:function(_8ac,_8ad){
this._set("checked",_8ac);
_8aa.set(this.focusNode||this.domNode,"checked",_8ac);
(this.focusNode||this.domNode).setAttribute(this._aria_attr,_8ac?"true":"false");
this._handleOnChange(_8ac,_8ad);
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
}});
});
},"dijit/_Widget":function(){
define("dijit/_Widget",["dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/ready","./registry","./_WidgetBase","./_OnDijitClickMixin","./_FocusMixin","dojo/uacss","./hccss"],function(_8ae,_8af,_8b0,_8b1,_8b2,lang,_8b3,_8b4,_8b5,_8b6,_8b7,_8b8){
function _8b9(){
};
function _8ba(_8bb){
return function(obj,_8bc,_8bd,_8be){
if(obj&&typeof _8bc=="string"&&obj[_8bc]==_8b9){
return obj.on(_8bc.substring(2).toLowerCase(),lang.hitch(_8bd,_8be));
}
return _8bb.apply(_8b0,arguments);
};
};
_8ae.around(_8b0,"connect",_8ba);
if(_8b2.connect){
_8ae.around(_8b2,"connect",_8ba);
}
var _8bf=_8b1("dijit._Widget",[_8b6,_8b7,_8b8],{onClick:_8b9,onDblClick:_8b9,onKeyDown:_8b9,onKeyPress:_8b9,onKeyUp:_8b9,onMouseDown:_8b9,onMouseMove:_8b9,onMouseOut:_8b9,onMouseOver:_8b9,onMouseLeave:_8b9,onMouseEnter:_8b9,onMouseUp:_8b9,constructor:function(_8c0){
this._toConnect={};
for(var name in _8c0){
if(this[name]===_8b9){
this._toConnect[name.replace(/^on/,"").toLowerCase()]=_8c0[name];
delete _8c0[name];
}
}
},postCreate:function(){
this.inherited(arguments);
for(var name in this._toConnect){
this.on(name,this._toConnect[name]);
}
delete this._toConnect;
},on:function(type,func){
if(this[this._onMap(type)]===_8b9){
return _8b0.connect(this.domNode,type.toLowerCase(),this,func);
}
return this.inherited(arguments);
},_setFocusedAttr:function(val){
this._focused=val;
this._set("focused",val);
},setAttribute:function(attr,_8c1){
_8b2.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(attr,_8c1);
},attr:function(name,_8c2){
if(_8af.isDebug){
var _8c3=arguments.callee._ach||(arguments.callee._ach={}),_8c4=(arguments.callee.caller||"unknown caller").toString();
if(!_8c3[_8c4]){
_8b2.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+_8c4,"","2.0");
_8c3[_8c4]=true;
}
}
var args=arguments.length;
if(args>=2||typeof name==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(name);
}
},getDescendants:function(){
_8b2.deprecated(this.declaredClass+"::getDescendants() is deprecated. Use getChildren() instead.","","2.0");
return this.containerNode?_8b3("[widgetId]",this.containerNode).map(_8b5.byNode):[];
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
if(!_8b2.isAsync){
_8b4(0,function(){
var _8c5=["dijit/_base"];
require(_8c5);
});
}
return _8bf;
});
},"dojo/touch":function(){
define("dojo/touch",["./_base/kernel","./on","./has","./mouse"],function(dojo,on,has,_8c6){
function _8c7(type){
return function(node,_8c8){
return on(node,type,_8c8);
};
};
var _8c9=has("touch");
dojo.touch={press:_8c7(_8c9?"touchstart":"mousedown"),move:_8c7(_8c9?"touchmove":"mousemove"),release:_8c7(_8c9?"touchend":"mouseup"),cancel:_8c9?_8c7("touchcancel"):_8c6.leave};
return dojo.touch;
});
},"idx/oneui/form/FilteringSelect":function(){
require({cache:{"url:idx/oneui/form/templates/ComboBox.html":"<div id=\"widget_${id}\" class=\"dijitReset dijitInline idxComposite\" dojoAttachPoint=\"_popupStateNode\"\r\n\t><div class=\"idxLabel dijitInline dijitHidden\"\r\n\t\t><span class=\"idxRequiredIcon\">*&nbsp</span\r\n\t\t><label for=\"${id}\" dojoAttachPoint=\"compLabelNode\"\r\n\t\t></label\r\n\t></div\r\n\t><div class=\"dijitInline\"\r\n\t\t><div class=\"dijit dijitInline dijitReset dijitInlineTable dijitLeft\" role=\"combobox\" dojoAttachPoint=\"stateNode,oneuiBaseNode,_aroundNode\"\r\n\t\t\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer' dojoAttachPoint=\"_buttonNode\" role=\"presentation\"\r\n\t\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t\t\t${_buttonInputDisabled}\r\n\t\t\t/></div\r\n\t\t\t><div class=\"dijitReset dijitInputField dijitInputContainer\" dojoAttachPoint=\"inputContainer\" dojoAttachEvent=\"onmouseenter: _onInputContainerEnter, onmouseleave: _onInputContainerLeave\"\r\n\t\t\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting}  type=\"text\" autocomplete=\"off\" dojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\" \r\n\t\t\t/></div\r\n\t\t></div\r\n\t\t><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"\r\n\t\t></div\r\n\t\t><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\r\n\t\t\t><div class=\"dijitValidationIcon\"\r\n\t\t\t><input class=\"dijitReset dijitInputField  dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n\t\t></div></div\r\n\t\t><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\r\n\t></div\r\n></div>"}});
define("idx/oneui/form/FilteringSelect",["dojo/_base/declare","dojo/_base/lang","dojo/dom-class","dojo/dom-style","dojo/window","dijit/form/FilteringSelect","./_CompositeMixin","./_ValidationMixin","../_CssStateMixin","../HoverHelpTooltip","./TextBox","dojo/text!./templates/ComboBox.html"],function(_8ca,lang,_8cb,_8cc,_8cd,_8ce,_8cf,_8d0,_8d1,_8d2,_8d3,_8d4){
return _8ca("idx.oneui.form.FilteringSelect",[_8ce,_8cf,_8d1],{baseClass:"idxFilteringSelectWrap",oneuiBaseClass:"dijitTextBox dijitComboBox",templateString:_8d4,selectOnClick:true,missingMessage:"$_unset_$",cssStateNodes:{"_buttonNode":"dijitDownArrowButton"},postCreate:function(){
this.inherited(arguments);
this.messageTooltip=new _8d2({connectId:[this.iconNode],label:this.message,position:this.tooltipPosition,forceFocus:false});
},isValid:function(){
return this.item||(!this.required&&this.get("displayedValue")=="");
},_isEmpty:function(){
return (/^\s*$/.test(this.textbox.value||""));
},_openResultList:function(_8d5,_8d6,_8d7){
if(_8d6[this.searchAttr]!==this._lastQuery){
return;
}
this._fetchHandle=null;
if(this.disabled||this.readOnly||(_8d6[this.searchAttr]!==this._lastQuery)){
return;
}
var _8d8=this.dropDown.getHighlightedOption();
this.dropDown.clearResultList();
if(!_8d5.length&&_8d7.start==0){
this.closeDropDown();
return;
}
var _8d9=this.dropDown.createOptions(_8d5,_8d7,lang.hitch(this,"_getMenuLabelFromItem"));
this._showResultList();
if(!this._lastInput){
for(var i=0;i<_8d9.length;i++){
if(_8d9[i].item){
var _8da=this.store.getValue(_8d9[i].item,this.searchAttr).toString();
if(_8da==this.displayedValue){
this.dropDown._setSelectedAttr(_8d9[i]);
_8cd.scrollIntoView(this.dropDown.selected);
break;
}
}
}
}
if(_8d7.direction){
if(1==_8d7.direction){
this.dropDown.highlightFirstOption();
}else{
if(-1==_8d7.direction){
this.dropDown.highlightLastOption();
}
}
if(_8d8){
this._announceOption(this.dropDown.getHighlightedOption());
}
}else{
if(this.autoComplete&&!this._prev_key_backspace&&!/^[*]+$/.test(_8d6[this.searchAttr].toString())){
this._announceOption(_8d9[1]);
}
}
if(this.item===undefined){
this.validate(true);
}
},_onInputContainerEnter:function(){
_8cb.toggle(this.oneuiBaseNode,"dijitComboBoxInputContainerHover",true);
},_onInputContainerLeave:function(){
_8cb.toggle(this.oneuiBaseNode,"dijitComboBoxInputContainerHover",false);
},displayMessage:function(_8db,_8dc){
if(this.messageTooltip){
this.messageTooltip.set("label",_8db);
if(_8db&&this.focused||_8dc){
var node=_8cc.get(this.iconNode,"visibility")=="hidden"?this.oneuiBaseNode:this.iconNode;
this.messageTooltip.open(node);
}else{
this.messageTooltip.close();
}
}
}});
});
},"curam/widget/IDXFilteringSelect":function(){
require({cache:{"url:curam/widget/templates/IDXComboBox.html":"<div id=\"widget_${id}\" class=\"dijitReset dijitInline idxComposite\" dojoAttachPoint=\"_popupStateNode\"\r\n  ><div class=\"idxLabel dijitInline dijitHidden\"\r\n    ><span class=\"idxRequiredIcon\">*&nbsp</span\r\n    ><label for=\"${id}\" dojoAttachPoint=\"compLabelNode\"\r\n    ></label\r\n  ></div\r\n  ><div class=\"dijitInline\"\r\n    ><div class=\"dijit dijitInline dijitReset dijitInlineTable dijitLeft\" role=\"listbox\" dojoAttachPoint=\"stateNode,oneuiBaseNode,_aroundNode\"\r\n      ><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer' dojoAttachPoint=\"_buttonNode\" role=\"presentation\"\r\n      ><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n      ${_buttonInputDisabled}\r\n      /></div\r\n      ><div class=\"dijitReset dijitInputField dijitInputContainer\" role=\"listbox\" dojoAttachPoint=\"inputContainer\" dojoAttachEvent=\"onmouseenter: _onInputContainerEnter, onmouseleave: _onInputContainerLeave\"\r\n        ><input class='dijitReset dijitInputInner' ${!nameAttrSetting}  type=\"text\" autocomplete=\"off\" dojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\" \r\n      /></div\r\n    ></div\r\n    ><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"\r\n    ></div\r\n    ><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\r\n      ><div class=\"dijitValidationIcon\"\r\n      ><input class=\"dijitReset dijitInputField  dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n    ></div></div\r\n    ><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\r\n  ></div\r\n></div>"}});
define("curam/widget/IDXFilteringSelect",["dijit/registry","dojo/on","dojo/text!curam/widget/templates/IDXComboBox.html","idx/oneui/form/FilteringSelect"],function(_8dd,on,_8de){
var _8df=dojo.declare("curam.widget.IDXFilteringSelect",idx.oneui.form.FilteringSelect,{templateString:_8de,enterKeyOnOpenDropDown:false,postCreate:function(){
on(this.focusNode,"keydown",function(e){
var _8e0=_8dd.byNode(dojo.byId("widget_"+e.target.id));
if(e.keyCode==dojo.keys.ENTER&&_8e0._opened){
_8e0.enterKeyOnOpenDropDown=true;
}
});
this.inherited(arguments);
}});
return _8df;
});
},"dijit/form/_FormValueWidget":function(){
define("dijit/form/_FormValueWidget",["dojo/_base/declare","dojo/_base/sniff","./_FormWidget","./_FormValueMixin"],function(_8e1,has,_8e2,_8e3){
return _8e1("dijit.form._FormValueWidget",[_8e2,_8e3],{_layoutHackIE7:function(){
if(has("ie")==7){
var _8e4=this.domNode;
var _8e5=_8e4.parentNode;
var _8e6=_8e4.firstChild||_8e4;
var _8e7=_8e6.style.filter;
var _8e8=this;
while(_8e5&&_8e5.clientHeight==0){
(function ping(){
var _8e9=_8e8.connect(_8e5,"onscroll",function(){
_8e8.disconnect(_8e9);
_8e6.style.filter=(new Date()).getMilliseconds();
setTimeout(function(){
_8e6.style.filter=_8e7;
},0);
});
})();
_8e5=_8e5.parentNode;
}
}
}});
});
},"url:idx/oneui/form/templates/ComboBox.html":"<div id=\"widget_${id}\" class=\"dijitReset dijitInline idxComposite\" dojoAttachPoint=\"_popupStateNode\"\r\n\t><div class=\"idxLabel dijitInline dijitHidden\"\r\n\t\t><span class=\"idxRequiredIcon\">*&nbsp</span\r\n\t\t><label for=\"${id}\" dojoAttachPoint=\"compLabelNode\"\r\n\t\t></label\r\n\t></div\r\n\t><div class=\"dijitInline\"\r\n\t\t><div class=\"dijit dijitInline dijitReset dijitInlineTable dijitLeft\" role=\"combobox\" dojoAttachPoint=\"stateNode,oneuiBaseNode,_aroundNode\"\r\n\t\t\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer' dojoAttachPoint=\"_buttonNode\" role=\"presentation\"\r\n\t\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t\t\t${_buttonInputDisabled}\r\n\t\t\t/></div\r\n\t\t\t><div class=\"dijitReset dijitInputField dijitInputContainer\" dojoAttachPoint=\"inputContainer\" dojoAttachEvent=\"onmouseenter: _onInputContainerEnter, onmouseleave: _onInputContainerLeave\"\r\n\t\t\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting}  type=\"text\" autocomplete=\"off\" dojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\" \r\n\t\t\t/></div\r\n\t\t></div\r\n\t\t><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"\r\n\t\t></div\r\n\t\t><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\r\n\t\t\t><div class=\"dijitValidationIcon\"\r\n\t\t\t><input class=\"dijitReset dijitInputField  dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n\t\t></div></div\r\n\t\t><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\r\n\t></div\r\n></div>","*now":function(r){
r(["dojo/i18n!*preload*dojo/nls/cdej-ua-ieg*[\"ar\",\"ca\",\"cs\",\"da\",\"de\",\"el\",\"en-gb\",\"en-us\",\"es-es\",\"fi-fi\",\"fr-fr\",\"he-il\",\"hu\",\"it-it\",\"ja-jp\",\"ko-kr\",\"nl-nl\",\"nb\",\"pl\",\"pt-br\",\"pt-pt\",\"ru\",\"sk\",\"sl\",\"sv\",\"th\",\"tr\",\"zh-tw\",\"zh-cn\",\"ROOT\"]"]);
}}});
define("dojo/cdej-ua-ieg",[],1);
