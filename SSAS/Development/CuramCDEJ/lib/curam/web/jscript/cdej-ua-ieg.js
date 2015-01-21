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
this.containerNode._width=0;
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
if(this.isLeftToRight()){
this._tabsWidth=_a0.offsetLeft+_a1;
}else{
var _a2=_9f[_9f.length-1].domNode;
this._tabsWidth=_a0.offsetLeft+_a1-_a2.offsetLeft;
}
return this._tabsWidth;
}else{
return 0;
}
},_enableBtn:function(_a3){
var _a4=this._getTabsWidth();
_a3=_a3||_7b.get(this.scrollNode,"width");
return _a4>0&&_a3<_a4;
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
var _a5=this._enableBtn(this._contentBox.w);
this._buttons.style("display",_a5?"":"none");
this._leftBtn.layoutAlign="left";
this._rightBtn.layoutAlign="right";
this._menuBtn.layoutAlign=this.isLeftToRight()?"right":"left";
var _a6;
if(_a5){
_a6=dijit.layout.layoutChildren(this.domNode,this._contentBox,[this._menuBtn,this._leftBtn,this._rightBtn,{domNode:this.scrollNode,layoutAlign:"client",fakeWidget:true}]);
}else{
_a6=dijit.layout.layoutChildren(this.domNode,this._contentBox,[{domNode:this.scrollNode,layoutAlign:"client",fakeWidget:true}]);
}
this.scrollNode._width=_a6.client.w;
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
return (this.isLeftToRight()||has("ie")<8||(has("ie")&&has("quirks"))||has("webkit"))?this.scrollNode.scrollLeft:_7b.get(this.containerNode,"width")-_7b.get(this.scrollNode,"width")+(has("ie")>=8?-1:1)*this.scrollNode.scrollLeft;
},_convertToScrollLeft:function(val){
if(this.isLeftToRight()||has("ie")<8||(has("ie")&&has("quirks"))||has("webkit")){
return val;
}else{
var _a7=_7b.get(this.containerNode,"width")-_7b.get(this.scrollNode,"width");
return (has("ie")>=8?-1:1)*(val-_a7);
}
},onSelectChild:function(_a8){
var tab=this.pane2button[_a8.id];
if(!tab||!_a8){
return;
}
var _a9=tab.domNode;
if(_a9!=this._selectedTab){
this._selectedTab=_a9;
if(this._postResize){
var _aa=this._getNodeWidth(this.scrollNode);
if(this._getTabsWidth()<_aa){
tab.onClick(null);
}else{
var sl=this._getScroll();
if(sl>_a9.offsetLeft||sl+_aa<_a9.offsetLeft+this._getNodeWidth(_a9)){
this.createSmoothScroll().play();
}
}
}
}
this.inherited(arguments);
},_getScrollBounds:function(){
var _ab=this.getChildren(),_ac=this._getNodeWidth(this.scrollNode),_ad=this._getNodeWidth(this.containerNode),_ae=_ad-_ac,_af=this._getTabsWidth();
if(_ab.length&&_af>_ac){
return {min:this.isLeftToRight()?0:_ab[_ab.length-1].domNode.offsetLeft-10,max:this.isLeftToRight()?_af-_ac:_ae};
}else{
var _b0=this.isLeftToRight()?0:_ae;
return {min:_b0,max:_b0};
}
},_getScrollForSelectedTab:function(){
var w=this.scrollNode,n=this._selectedTab,_b1=_7b.get(this.scrollNode,"width"),_b2=this._getScrollBounds();
var pos=(n.offsetLeft+_7b.get(n,"width")/2)-_b1/2;
pos=Math.min(Math.max(pos,_b2.min),_b2.max);
return pos;
},createSmoothScroll:function(x){
if(arguments.length>0){
var _b3=this._getScrollBounds();
x=Math.min(Math.max(x,_b3.min),_b3.max);
}else{
x=this._getScrollForSelectedTab();
}
if(this._anim&&this._anim.status()=="playing"){
this._anim.stop();
}
var _b4=this,w=this.scrollNode,_b5=new fx.Animation({beforeBegin:function(){
if(this.curve){
delete this.curve;
}
var _b6=w.scrollLeft,_b7=_b4._convertToScrollLeft(x);
_b5.curve=new fx._Line(_b6,_b7);
},onAnimate:function(val){
w.scrollLeft=val;
}});
this._anim=_b5;
this._setButtonClass(x);
return _b5;
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
},doSlide:function(_b8,_b9){
if(_b9&&_79.contains(_b9,"dijitTabDisabled")){
return;
}
var _ba=_7b.get(this.scrollNode,"width");
var d=(_ba*0.75)*_b8;
var to=this._getScroll()+d;
this._setButtonClass(to);
this.createSmoothScroll(to).play();
},_setButtonClass:function(_bb){
var _bc=this._getScrollBounds();
this._leftBtn.set("disabled",_bb<=_bc.min);
this._rightBtn.set("disabled",_bb>=_bc.max);
}});
var _bd=_78("dijit.layout._ScrollingTabControllerButtonMixin",null,{baseClass:"dijitTab tabStripButton",templateString:_80,tabIndex:"",isFocusable:function(){
return false;
}});
_78("dijit.layout._ScrollingTabControllerButton",[_86,_bd]);
_78("dijit.layout._ScrollingTabControllerMenuButton",[_86,_87,_bd],{containerId:"",tabIndex:"-1",isLoaded:function(){
return false;
},loadDropDown:function(_be){
this.dropDown=new _84({id:this.containerId+"_menu",dir:this.dir,lang:this.lang,textDir:this.textDir});
var _bf=_7e.byId(this.containerId);
_77.forEach(_bf.getChildren(),function(_c0){
var _c1=new _85({id:_c0.id+"_stcMi",label:_c0.title,iconClass:_c0.iconClass,dir:_c0.dir,lang:_c0.lang,textDir:_c0.textDir,onClick:function(){
_bf.selectChild(_c0);
}});
this.dropDown.addChild(_c1);
},this);
dojo.forEach(this.dropDown.getChildren(),_7c.hitch(this,function(_c2){
var _c3=_c2.id.split(this._curamOwnerController._tablistMenuItemIdSuffix)[0];
this._curamOwnerController._setCuramAvailability(_c2,_c3);
this._curamOwnerController._setCuramVisibility(_c2,_c3);
dojo.connect(_c2,"destroy",function(){
setDynState=null;
});
}));
_be();
},closeDropDown:function(_c4){
this.inherited(arguments);
if(this.dropDown){
this.dropDown.destroyRecursive();
delete this.dropDown;
}
}});
return _88;
});
},"dijit/place":function(){
define("dijit/place",["dojo/_base/array","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/window","dojo/window",".","dojo/_base/lang"],function(_c5,_c6,_c7,_c8,win,_c9,_ca,_cb){
function _cc(_cd,_ce,_cf,_d0){
var _d1=_c9.getBox();
if(!_cd.parentNode||String(_cd.parentNode.tagName).toLowerCase()!="body"){
win.body().appendChild(_cd);
}
var _d2=null;
_c5.some(_ce,function(_d3){
var _d4=_d3.corner;
var pos=_d3.pos;
var _d5=0;
var _d6={w:{"L":_d1.l+_d1.w-pos.x,"R":pos.x-_d1.l,"M":_d1.w}[_d4.charAt(1)],h:{"T":_d1.t+_d1.h-pos.y,"B":pos.y-_d1.t,"M":_d1.h}[_d4.charAt(0)]};
if(_cf){
var res=_cf(_cd,_d3.aroundCorner,_d4,_d6,_d0);
_d5=typeof res=="undefined"?0:res;
}
var _d7=_cd.style;
var _d8=_d7.display;
var _d9=_d7.visibility;
if(_d7.display=="none"){
_d7.visibility="hidden";
_d7.display="";
}
var mb=_c6.getMarginBox(_cd);
_d7.display=_d8;
_d7.visibility=_d9;
var _da={"L":pos.x,"R":pos.x-mb.w,"M":Math.max(_d1.l,Math.min(_d1.l+_d1.w,pos.x+(mb.w>>1))-mb.w)}[_d4.charAt(1)],_db={"T":pos.y,"B":pos.y-mb.h,"M":Math.max(_d1.t,Math.min(_d1.t+_d1.h,pos.y+(mb.h>>1))-mb.h)}[_d4.charAt(0)],_dc=Math.max(_d1.l,_da),_dd=Math.max(_d1.t,_db),_de=Math.min(_d1.l+_d1.w,_da+mb.w),_df=Math.min(_d1.t+_d1.h,_db+mb.h),_e0=_de-_dc,_e1=_df-_dd;
_d5+=(mb.w-_e0)+(mb.h-_e1);
var l=_c6.isBodyLtr();
if(_cb.exists("curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm")&&curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm==true){
if((_d4.charAt(0)=="T"||(_d4.charAt(1)=="L"&&l)||(_d4.charAt(1)=="R"&&!l))&&_d5>0){
_d5=mb.w+mb.h;
}
}
if(_d2==null||_d5<_d2.overflow){
_d2={corner:_d4,aroundCorner:_d3.aroundCorner,x:_dc,y:_dd,w:_e0,h:_e1,overflow:_d5,spaceAvailable:_d6};
}
return !_d5;
});
if(_d2.overflow&&_cf){
_cf(_cd,_d2.aroundCorner,_d2.corner,_d2.spaceAvailable,_d0);
}
var l=_c6.isBodyLtr(),s=_cd.style;
s.top=_d2.y+"px";
s[l?"left":"right"]=(l?_d2.x:_d1.w-_d2.x-_d2.w)+"px";
s[l?"right":"left"]="auto";
return _d2;
};
return (_ca.place={at:function(_e2,pos,_e3,_e4){
var _e5=_c5.map(_e3,function(_e6){
var c={corner:_e6,pos:{x:pos.x,y:pos.y}};
if(_e4){
c.pos.x+=_e6.charAt(1)=="L"?_e4.x:-_e4.x;
c.pos.y+=_e6.charAt(0)=="T"?_e4.y:-_e4.y;
}
return c;
});
return _cc(_e2,_e5);
},around:function(_e7,_e8,_e9,_ea,_eb){
var _ec=(typeof _e8=="string"||"offsetWidth" in _e8)?_c6.position(_e8,true):_e8;
if(_e8.parentNode){
var _ed=_c7.getComputedStyle(_e8).position=="absolute";
var _ee=_e8.parentNode;
while(_ee&&_ee.nodeType==1&&_ee.nodeName!="BODY"){
var _ef=_c6.position(_ee,true),pcs=_c7.getComputedStyle(_ee);
if(/relative|absolute/.test(pcs.position)){
_ed=false;
}
if(!_ed&&/hidden|auto|scroll/.test(pcs.overflow)){
var _f0=Math.min(_ec.y+_ec.h,_ef.y+_ef.h);
var _f1=Math.min(_ec.x+_ec.w,_ef.x+_ef.w);
_ec.x=Math.max(_ec.x,_ef.x);
_ec.y=Math.max(_ec.y,_ef.y);
_ec.h=_f0-_ec.y;
_ec.w=_f1-_ec.x;
}
if(pcs.position=="absolute"){
_ed=true;
}
_ee=_ee.parentNode;
}
}
var x=_ec.x,y=_ec.y,_f2="w" in _ec?_ec.w:(_ec.w=_ec.width),_f3="h" in _ec?_ec.h:(_c8.deprecated("place.around: dijit.place.__Rectangle: { x:"+x+", y:"+y+", height:"+_ec.height+", width:"+_f2+" } has been deprecated.  Please use { x:"+x+", y:"+y+", h:"+_ec.height+", w:"+_f2+" }","","2.0"),_ec.h=_ec.height);
var _f4=[];
function _f5(_f6,_f7){
_f4.push({aroundCorner:_f6,corner:_f7,pos:{x:{"L":x,"R":x+_f2,"M":x+(_f2>>1)}[_f6.charAt(1)],y:{"T":y,"B":y+_f3,"M":y+(_f3>>1)}[_f6.charAt(0)]}});
};
_c5.forEach(_e9,function(pos){
var ltr=_ea;
switch(pos){
case "above-centered":
_f5("TM","BM");
break;
case "below-centered":
_f5("BM","TM");
break;
case "after-centered":
ltr=!ltr;
case "before-centered":
_f5(ltr?"ML":"MR",ltr?"MR":"ML");
break;
case "after":
ltr=!ltr;
case "before":
_f5(ltr?"TL":"TR",ltr?"TR":"TL");
_f5(ltr?"BL":"BR",ltr?"BR":"BL");
break;
case "below-alt":
ltr=!ltr;
case "below":
_f5(ltr?"BL":"BR",ltr?"TL":"TR");
_f5(ltr?"BR":"BL",ltr?"TR":"TL");
break;
case "above-alt":
ltr=!ltr;
case "above":
_f5(ltr?"TL":"TR",ltr?"BL":"BR");
_f5(ltr?"TR":"TL",ltr?"BR":"BL");
break;
default:
_f5(pos.aroundCorner,pos.corner);
}
});
var _f8=_cc(_e7,_f4,_eb,{w:_f2,h:_f3});
_f8.aroundNodePos=_ec;
return _f8;
}});
});
},"dijit/_HasDropDown":function(){
define("dijit/_HasDropDown",["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/keys","dojo/_base/lang","dojo/touch","dojo/_base/window","dojo/window","./registry","./focus","./popup","./_FocusMixin"],function(_f9,_fa,_fb,dom,_fc,_fd,_fe,_ff,has,keys,lang,_100,win,_101,_102,_103,_104,_105){
return _f9("dijit._HasDropDown",_105,{_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:true,forceWidth:false,maxHeight:0,dropDownPosition:["below","above"],_stopClickEvents:true,_onDropDownMouseDown:function(e){
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
var c=_fe.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_107){
if(_fd.contains(t,"dijitPopup")){
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
_fb.stop(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _109={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
_fd.add(this._arrowWrapperNode||this._buttonNode,"dijit"+_109+"ArrowButton");
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
_fb.stop(e);
return;
}
}
if(d&&this._opened&&e.charOrCode==keys.ESCAPE){
this.closeDropDown();
_fb.stop(e);
}else{
if(!this._opened&&(e.charOrCode==keys.DOWN_ARROW||((e.charOrCode==keys.ENTER||e.charOrCode==" ")&&((_10a.tagName||"").toLowerCase()!=="input"||(_10a.type&&_10a.type.toLowerCase()!=="text"))))){
this._toggleOnKeyUp=true;
_fb.stop(e);
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
var d=new _fa(),_10d=lang.hitch(this,function(){
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
_ff.set(_10f,_111);
var _112=this.maxHeight;
if(_112==-1){
var _113=_101.getBox(),_114=_fe.position(_110,false);
_112=Math.floor(Math.max(_114.y,_113.h-(_114.y+_114.h)));
}
_104.moveOffScreen(_10e);
if(_10e.startup&&!_10e._started){
_10e.startup();
}
var mb=_fe.getMarginSize(_10f);
var _115=(_112&&mb.h>_112);
_ff.set(_10f,{overflowX:"hidden",overflowY:_115?"auto":"hidden"});
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
_fe.setMarginBox(_10f,mb);
}
}
var _116=_104.open({parent:this,popup:_10e,around:_110,orient:this.dropDownPosition,onExecute:function(){
self.closeDropDown(true);
},onCancel:function(){
self.closeDropDown(true);
},onClose:function(){
_fc.set(self._popupStateNode,"popupActive",false);
_fd.remove(self._popupStateNode,"dijitHasDropDownOpen");
self._opened=false;
}});
_fc.set(this._popupStateNode,"popupActive","true");
_fd.add(self._popupStateNode,"dijitHasDropDownOpen");
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
},"dijit/_BidiSupport":function(){
define("dijit/_BidiSupport",["./_WidgetBase"],function(_363){
_363.extend({getTextDir:function(text){
return this.textDir=="auto"?this._checkContextual(text):this.textDir;
},_checkContextual:function(text){
var fdc=/[A-Za-z\u05d0-\u065f\u066a-\u06ef\u06fa-\u07ff\ufb1d-\ufdff\ufe70-\ufefc]/.exec(text);
return fdc?(fdc[0]<="z"?"ltr":"rtl"):this.dir?this.dir:this.isLeftToRight()?"ltr":"rtl";
},applyTextDir:function(_364,text){
var _365=this.textDir=="auto"?this._checkContextual(text):this.textDir;
if(_364.dir!=_365){
_364.dir=_365;
}
}});
return _363;
});
},"dijit/form/_ListMouseMixin":function(){
define("dijit/form/_ListMouseMixin",["dojo/_base/declare","dojo/_base/event","dojo/touch","./_ListBase"],function(_366,_367,_368,_369){
return _366("dijit.form._ListMouseMixin",_369,{postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,_368.press,"_onMouseDown");
this.connect(this.domNode,_368.release,"_onMouseUp");
this.connect(this.domNode,"onmouseover","_onMouseOver");
this.connect(this.domNode,"onmouseout","_onMouseOut");
},_onMouseDown:function(evt){
_367.stop(evt);
if(this._hoveredNode){
this.onUnhover(this._hoveredNode);
this._hoveredNode=null;
}
this._isDragging=true;
this._setSelectedAttr(this._getTarget(evt));
},_onMouseUp:function(evt){
_367.stop(evt);
this._isDragging=false;
var _36a=this._getSelectedAttr();
var _36b=this._getTarget(evt);
var _36c=this._hoveredNode;
if(_36a&&_36b==_36a){
this.onClick(_36a);
}else{
if(_36c&&_36b==_36c){
this._setSelectedAttr(_36c);
this.onClick(_36c);
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
define("dojo/cookie",["./_base/kernel","./regexp"],function(dojo,_36d){
dojo.cookie=function(name,_36e,_36f){
var c=document.cookie,ret;
if(arguments.length==1){
var _370=c.match(new RegExp("(?:^|; )"+_36d.escapeString(name)+"=([^;]*)"));
ret=_370?decodeURIComponent(_370[1]):undefined;
}else{
_36f=_36f||{};
var exp=_36f.expires;
if(typeof exp=="number"){
var d=new Date();
d.setTime(d.getTime()+exp*24*60*60*1000);
exp=_36f.expires=d;
}
if(exp&&exp.toUTCString){
_36f.expires=exp.toUTCString();
}
_36e=encodeURIComponent(_36e);
var _371=name+"="+_36e,_372;
for(_372 in _36f){
_371+="; "+_372;
var _373=_36f[_372];
if(_373!==true){
_371+="="+_373;
}
}
document.cookie=_371;
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
var _374=new curam.util.ResourceBundle("Debug");
var _375=dojo.declare("curam.util.ui.refresh.TabRefreshController",null,{EVENT_REFRESH_MENU:"/curam/refresh/menu",EVENT_REFRESH_NAVIGATION:"/curam/refresh/navigation",EVENT_REFRESH_CONTEXT:"/curam/refresh/context",EVENT_REFRESH_MAIN:"/curam/refresh/main-content",_tabWidgetId:null,_configOnSubmit:null,_configOnLoad:null,_handler:null,_lastSubmitted:null,_currentlyRefreshing:null,constructor:function(_376,_377){
this._configOnSubmit={};
this._configOnLoad={};
if(!_377){
return;
}
this._tabWidgetId=_376;
dojo.forEach(_377.config,dojo.hitch(this,function(item){
this._configOnSubmit[item.page]=item.onsubmit;
this._configOnLoad[item.page]=item.onload;
}));
},pageSubmitted:function(_378,_379){
new curam.util.ui.refresh.RefreshEvent(curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONSUBMIT,_379);
curam.debug.log("curam.util.ui.refresh.TabRefreshController: "+_374.getProperty("curam.util.ui.refresh.TabRefreshController.submit",[_378,_379]));
if(this._configOnSubmit[_378]){
this._lastSubmitted=_378;
curam.debug.log("curam.util.ui.refresh.TabRefreshController: "+_374.getProperty("curam.util.ui.refresh.TabRefreshController"+"submit.notify"));
}
},pageLoaded:function(_37a,_37b){
var _37c=new curam.util.ui.refresh.RefreshEvent(curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONLOAD,_37b);
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_374.getProperty("curam.util.ui.refresh.TabRefreshController.load",[_37a,_37b]));
if(this._currentlyRefreshing&&this._currentlyRefreshing.equals(_37c)){
this._currentlyRefreshing=null;
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_374.getProperty("curam.util.ui.refresh.TabRefreshController"+"refresh"));
return;
}
var _37d={};
if(_37b==_37c.SOURCE_CONTEXT_MAIN&&this._configOnLoad[_37a]){
_37d=this._configOnLoad[_37a];
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_374.getProperty("curam.util.ui.refresh.TabRefreshController"+".load.config"));
}
if(this._lastSubmitted){
var cfg=this._configOnSubmit[this._lastSubmitted];
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_374.getProperty("curam.util.ui.refresh.TabRefreshController"+".submit.config",[this._lastSubmitted]));
_37d.details=_37d.details||cfg.details;
_37d.menubar=_37d.menubar||cfg.menubar;
_37d.navigation=_37d.navigation||cfg.navigation;
_37d.mainContent=_37d.mainContent||cfg.mainContent;
this._lastSubmitted=null;
}
this._fireRefreshEvents(_37d);
},_fireRefreshEvents:function(cfg){
var _37e=[];
if(cfg.details){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_374.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.context"));
_37e.push(this.EVENT_REFRESH_CONTEXT+"/"+this._tabWidgetId);
}
if(cfg.menubar){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_374.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.menu"));
_37e.push(this.EVENT_REFRESH_MENU+"/"+this._tabWidgetId);
}
if(cfg.navigation){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_374.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.nav"));
_37e.push(this.EVENT_REFRESH_NAVIGATION+"/"+this._tabWidgetId);
}
if(cfg.mainContent){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_374.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.main"));
this._currentlyRefreshing=new curam.util.ui.refresh.RefreshEvent(curam.util.ui.refresh.RefreshEvent.prototype.TYPE_ONLOAD,curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN,null);
_37e.push(this.EVENT_REFRESH_MAIN+"/"+this._tabWidgetId);
}
if(_37e.length>0){
curam.debug.log("curam.util.ui.refresh.TabRefreshController:"+_374.getProperty("curam.util.ui.refresh.TabRefreshController"+".refresh.log",[_37e.length,_37e]));
this._handler(_37e);
}
},setRefreshHandler:function(_37f){
this._handler=_37f;
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
return _375;
});
},"dijit/_base/popup":function(){
define("dijit/_base/popup",["dojo/dom-class","../popup","../BackgroundIframe"],function(_380,_381){
var _382=_381._createWrapper;
_381._createWrapper=function(_383){
if(!_383.declaredClass){
_383={_popupWrapper:(_383.parentNode&&_380.contains(_383.parentNode,"dijitPopup"))?_383.parentNode:null,domNode:_383,destroy:function(){
}};
}
return _382.call(this,_383);
};
var _384=_381.open;
_381.open=function(args){
if(args.orient&&typeof args.orient!="string"&&!("length" in args.orient)){
var ary=[];
for(var key in args.orient){
ary.push({aroundCorner:key,corner:args.orient[key]});
}
args.orient=ary;
}
return _384.call(this,args);
};
return _381;
});
},"url:curam/layout/resources/TabContainer.html":"<div class=\"dijitTabContainer\">\r\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\r\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer dijitAlignTop\"></div>\r\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container dijitAlignClient\" data-dojo-attach-point=\"containerNode\"></div>\r\n</div>\r\n","url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n","dojo/_base/url":function(){
define("dojo/_base/url",["./kernel"],function(dojo){
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$"),_385=function(){
var n=null,_386=arguments,uri=[_386[0]];
for(var i=1;i<_386.length;i++){
if(!_386[i]){
continue;
}
var _387=new _385(_386[i]+""),_388=new _385(uri[0]+"");
if(_387.path==""&&!_387.scheme&&!_387.authority&&!_387.query){
if(_387.fragment!=n){
_388.fragment=_387.fragment;
}
_387=_388;
}else{
if(!_387.scheme){
_387.scheme=_388.scheme;
if(!_387.authority){
_387.authority=_388.authority;
if(_387.path.charAt(0)!="/"){
var path=_388.path.substring(0,_388.path.lastIndexOf("/")+1)+_387.path;
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
_387.path=segs.join("/");
}
}
}
}
uri=[];
if(_387.scheme){
uri.push(_387.scheme,":");
}
if(_387.authority){
uri.push("//",_387.authority);
}
uri.push(_387.path);
if(_387.query){
uri.push("?",_387.query);
}
if(_387.fragment){
uri.push("#",_387.fragment);
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
_385.prototype.toString=function(){
return this.uri;
};
return dojo._Url=_385;
});
},"curam/widget/FilteringSelect":function(){
define("curam/widget/FilteringSelect",["dijit/registry","dojo/on","dijit/form/FilteringSelect"],function(_389,on){
var _38a=dojo.declare("curam.widget.FilteringSelect",dijit.form.FilteringSelect,{enterKeyOnOpenDropDown:false,postMixInProperties:function(){
if(!this.store){
if(dojo.query("> option",this.srcNodeRef)[0]==undefined){
dojo.create("option",{innerHTML:"<!--__o3_BLANK-->"},this.srcNodeRef);
}
}
if(!this.get("store")&&this.srcNodeRef.value==""){
var _38b=this.srcNodeRef,_38c=dojo.query("> option[value='']",_38b);
if(_38c.length&&_38c[0].innerHTML!="<!--__o3_BLANK-->"){
this.displayedValue=dojo.trim(_38c[0].innerHTML);
}
}
this.inherited(arguments);
},postCreate:function(){
on(this.focusNode,"keydown",function(e){
var _38d=_389.byNode(dojo.byId("widget_"+e.target.id));
if(e.keyCode==dojo.keys.ENTER&&_38d._opened){
_38d.enterKeyOnOpenDropDown=true;
}
});
this.inherited(arguments);
},startup:function(){
this.domNode.setAttribute("role","listbox");
this.inherited(arguments);
},_callbackSetLabel:function(_38e,_38f,_390,_391){
if((_38f&&_38f[this.searchAttr]!==this._lastQuery)||(!_38f&&_38e.length&&this.get("store").getIdentity(_38e[0])!=this._lastQuery)){
return;
}
if(!_38e.length){
this.set("value","__o3_INVALID",_391||(_391===undefined&&!this.focused),this.textbox.value,null);
}else{
this.set("item",_38e[0],_391);
}
}});
return _38a;
});
},"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n","dojo/text":function(){
define("dojo/text",["./_base/kernel","require","./has","./_base/xhr"],function(dojo,_392,has,xhr){
var _393;
if(1){
_393=function(url,sync,load){
xhr("GET",{url:url,sync:!!sync,load:load});
};
}else{
if(_392.getText){
_393=_392.getText;
}else{
console.error("dojo/text plugin failed to load because loader does not support getText");
}
}
var _394={},_395=function(text){
if(text){
text=text.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _396=text.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_396){
text=_396[1];
}
}else{
text="";
}
return text;
},_397={},_398={},_399={dynamic:true,normalize:function(id,_39a){
var _39b=id.split("!"),url=_39b[0];
return (/^\./.test(url)?_39a(url):url)+(_39b[1]?"!"+_39b[1]:"");
},load:function(id,_39c,load){
var _39d=id.split("!"),_39e=_39d.length>1,_39f=_39d[0],url=_39c.toUrl(_39d[0]),text=_397,_3a0=function(text){
load(_39e?_395(text):text);
};
if(_39f in _394){
text=_394[_39f];
}else{
if(url in _39c.cache){
text=_39c.cache[url];
}else{
if(url in _394){
text=_394[url];
}
}
}
if(text===_397){
if(_398[url]){
_398[url].push(_3a0);
}else{
var _3a1=_398[url]=[_3a0];
_393(url,!_39c.async,function(text){
_394[_39f]=_394[url]=text;
for(var i=0;i<_3a1.length;){
_3a1[i++](text);
}
delete _398[url];
});
}
}else{
_3a0(text);
}
}};
dojo.cache=function(_3a2,url,_3a3){
var key;
if(typeof _3a2=="string"){
if(/\//.test(_3a2)){
key=_3a2;
_3a3=url;
}else{
key=_392.toUrl(_3a2.replace(/\./g,"/")+(url?("/"+url):""));
}
}else{
key=_3a2+"";
_3a3=url;
}
var val=(_3a3!=undefined&&typeof _3a3!="string")?_3a3.value:_3a3,_3a4=_3a3&&_3a3.sanitize;
if(typeof val=="string"){
_394[key]=val;
return _3a4?_395(val):val;
}else{
if(val===null){
delete _394[key];
return null;
}else{
if(!(key in _394)){
_393(key,true,function(text){
_394[key]=text;
});
}
return _3a4?_395(_394[key]):_394[key];
}
}
};
return _399;
});
},"dojo/uacss":function(){
define("dojo/uacss",["./dom-geometry","./_base/lang","./ready","./_base/sniff","./_base/window"],function(_3a5,lang,_3a6,has,_3a7){
var html=_3a7.doc.documentElement,ie=has("ie"),_3a8=has("opera"),maj=Math.floor,ff=has("ff"),_3a9=_3a5.boxModel.replace(/-/,""),_3aa={"dj_quirks":has("quirks"),"dj_opera":_3a8,"dj_khtml":has("khtml"),"dj_webkit":has("webkit"),"dj_safari":has("safari"),"dj_chrome":has("chrome"),"dj_gecko":has("mozilla")};
if(ie){
_3aa["dj_ie"]=true;
_3aa["dj_ie"+maj(ie)]=true;
_3aa["dj_iequirks"]=has("quirks");
}
if(ff){
_3aa["dj_ff"+maj(ff)]=true;
}
_3aa["dj_"+_3a9]=true;
var _3ab="";
for(var clz in _3aa){
if(_3aa[clz]){
_3ab+=clz+" ";
}
}
html.className=lang.trim(html.className+" "+_3ab);
_3a6(90,function(){
if(!_3a5.isBodyLtr()){
var _3ac="dj_rtl dijitRtl "+_3ab.replace(/ /g,"-rtl ");
html.className=lang.trim(html.className+" "+_3ac+"dj_rtl dijitRtl "+_3ab.replace(/ /g,"-rtl "));
}
});
return has;
});
},"dijit/Tooltip":function(){
require({cache:{"url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n"}});
define("dijit/Tooltip",["dojo/_base/array","dojo/_base/declare","dojo/_base/fx","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/_base/sniff","dojo/_base/window","./_base/manager","./place","./_Widget","./_TemplatedMixin","./BackgroundIframe","dojo/text!./templates/Tooltip.html","."],function(_3ad,_3ae,fx,dom,_3af,_3b0,_3b1,lang,has,win,_3b2,_3b3,_3b4,_3b5,_3b6,_3b7,_3b8){
var _3b9=_3ae("dijit._MasterTooltip",[_3b4,_3b5],{duration:_3b2.defaultDuration,templateString:_3b7,postCreate:function(){
win.body().appendChild(this.domNode);
this.bgIframe=new _3b6(this.domNode);
this.fadeIn=fx.fadeIn({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onShow")});
this.fadeOut=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHide")});
},show:function(_3ba,_3bb,_3bc,rtl,_3bd){
if(this.aroundNode&&this.aroundNode===_3bb&&this.containerNode.innerHTML==_3ba){
return;
}
this.domNode.width="auto";
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_3ba;
if(_3bd){
this.set("textDir",_3bd);
}
this.containerNode.align=rtl?"right":"left";
var pos=_3b3.around(this.domNode,_3bb,_3bc&&_3bc.length?_3bc:_3be.defaultPosition,!rtl,lang.hitch(this,"orient"));
var _3bf=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_3bf.y+((_3bf.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_3bf.x+((_3bf.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}
}
_3b1.set(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_3bb;
},orient:function(node,_3c0,_3c1,_3c2,_3c3){
this.connectorNode.style.top="";
var _3c4=_3c2.w-this.connectorNode.offsetWidth;
node.className="dijitTooltip "+{"MR-ML":"dijitTooltipRight","ML-MR":"dijitTooltipLeft","TM-BM":"dijitTooltipAbove","BM-TM":"dijitTooltipBelow","BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_3c0+"-"+_3c1];
this.domNode.style.width="auto";
var size=_3b0.getContentBox(this.domNode);
var _3c5=Math.min((Math.max(_3c4,1)),size.w);
var _3c6=_3c5<size.w;
this.domNode.style.width=_3c5+"px";
if(_3c6){
this.containerNode.style.overflow="auto";
var _3c7=this.containerNode.scrollWidth;
this.containerNode.style.overflow="visible";
if(_3c7>_3c5){
_3c7=_3c7+_3b1.get(this.domNode,"paddingLeft")+_3b1.get(this.domNode,"paddingRight");
this.domNode.style.width=_3c7+"px";
}
}
if(_3c1.charAt(0)=="B"&&_3c0.charAt(0)=="B"){
var mb=_3b0.getMarginBox(node);
var _3c8=this.connectorNode.offsetHeight;
if(mb.h>_3c2.h){
var _3c9=_3c2.h-((_3c3.h+_3c8)>>1);
this.connectorNode.style.top=_3c9+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_3c3.h/2-_3c8/2,0),mb.h-_3c8)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_3c4);
},_onShow:function(){
if(has("ie")){
this.domNode.style.filter="";
}
},hide:function(_3ca){
if(this._onDeck&&this._onDeck[1]==_3ca){
this._onDeck=null;
}else{
if(this.aroundNode===_3ca){
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
_3ad.forEach(node.children,function(_3cb){
this._setAutoTextDir(_3cb);
},this);
},_setTextDirAttr:function(_3cc){
this._set("textDir",_3cc);
if(_3cc=="auto"){
this._setAutoTextDir(this.containerNode);
}else{
this.containerNode.dir=this.textDir;
}
}});
_3b8.showTooltip=function(_3cd,_3ce,_3cf,rtl,_3d0){
if(_3cf){
_3cf=_3ad.map(_3cf,function(val){
return {after:"after-centered",before:"before-centered"}[val]||val;
});
}
if(!_3be._masterTT){
_3b8._masterTT=_3be._masterTT=new _3b9();
}
return _3be._masterTT.show(_3cd,_3ce,_3cf,rtl,_3d0);
};
_3b8.hideTooltip=function(_3d1){
return _3be._masterTT&&_3be._masterTT.hide(_3d1);
};
var _3be=_3ae("dijit.Tooltip",_3b4,{label:"",showDelay:400,connectId:[],position:[],_setConnectIdAttr:function(_3d2){
_3ad.forEach(this._connections||[],function(_3d3){
_3ad.forEach(_3d3,lang.hitch(this,"disconnect"));
},this);
this._connectIds=_3ad.filter(lang.isArrayLike(_3d2)?_3d2:(_3d2?[_3d2]:[]),function(id){
return dom.byId(id);
});
this._connections=_3ad.map(this._connectIds,function(id){
var node=dom.byId(id);
return [this.connect(node,"onmouseenter","_onHover"),this.connect(node,"onmouseleave","_onUnHover"),this.connect(node,"onfocus","_onHover"),this.connect(node,"onblur","_onUnHover")];
},this);
this._set("connectId",_3d2);
},addTarget:function(node){
var id=node.id||node;
if(_3ad.indexOf(this._connectIds,id)==-1){
this.set("connectId",this._connectIds.concat(id));
}
},removeTarget:function(node){
var id=node.id||node,idx=_3ad.indexOf(this._connectIds,id);
if(idx>=0){
this._connectIds.splice(idx,1);
this.set("connectId",this._connectIds);
}
},buildRendering:function(){
this.inherited(arguments);
_3af.add(this.domNode,"dijitTooltipData");
},startup:function(){
this.inherited(arguments);
var ids=this.connectId;
_3ad.forEach(lang.isArrayLike(ids)?ids:[ids],this.addTarget,this);
},_onHover:function(e){
if(!this._showTimer){
var _3d4=e.target;
this._showTimer=setTimeout(lang.hitch(this,function(){
this.open(_3d4);
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
},open:function(_3d5){
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
_3be.show(this.label||this.domNode.innerHTML,_3d5,this.position,!this.isLeftToRight(),this.textDir);
this._connectNode=_3d5;
this.onShow(_3d5,this.position);
},close:function(){
if(this._connectNode){
_3be.hide(this._connectNode);
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
_3be._MasterTooltip=_3b9;
_3be.show=_3b8.showTooltip;
_3be.hide=_3b8.hideTooltip;
_3be.defaultPosition=["after-centered","before-centered"];
return _3be;
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
dojo.string.substitute=function(_3d6,map,_3d7,_3d8){
_3d8=_3d8||dojo.global;
_3d7=_3d7?lang.hitch(_3d8,_3d7):function(v){
return v;
};
return _3d6.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_3d9,key,_3da){
var _3db=lang.getObject(key,false,map);
if(_3da){
_3db=lang.getObject(_3da,false,_3d8).call(_3d8,_3db,key);
}
return _3d7(_3db,key).toString();
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
var _3dc=dojo.declare("curam.util.ui.refresh.RefreshEvent",null,{TYPE_ONLOAD:"onload",TYPE_ONSUBMIT:"onsubmit",SOURCE_CONTEXT_MAIN:"main-content",SOURCE_CONTEXT_DIALOG:"dialog",SOURCE_CONTEXT_INLINE:"inline",_type:null,_context:null,constructor:function(type,_3dd){
if(!type||!_3dd){
throw "Required parameters missing.";
}
if(!(type==this.TYPE_ONLOAD||type==this.TYPE_ONSUBMIT)){
throw "Unknown type: "+type;
}
if(!(_3dd==this.SOURCE_CONTEXT_DIALOG||_3dd==this.SOURCE_CONTEXT_INLINE||_3dd==this.SOURCE_CONTEXT_MAIN)){
throw "Unknown context: "+_3dd;
}
this._type=type;
this._context=_3dd;
},equals:function(_3de){
if(typeof _3de!="object"){
return false;
}
if(_3de.declaredClass!=this.declaredClass){
return false;
}
return this._type===_3de._type&&this._context===_3de._context;
}});
return _3dc;
});
},"dijit/dijit":function(){
define("dijit/dijit",[".","./_base","dojo/parser","./_Widget","./_TemplatedMixin","./_Container","./layout/_LayoutWidget","./form/_FormWidget","./form/_FormValueWidget"],function(_3df){
return _3df;
});
},"dijit/form/_FormValueMixin":function(){
define("dijit/form/_FormValueMixin",["dojo/_base/declare","dojo/dom-attr","dojo/keys","dojo/_base/sniff","./_FormWidgetMixin"],function(_3e0,_3e1,keys,has,_3e2){
return _3e0("dijit.form._FormValueMixin",_3e2,{readOnly:false,_setReadOnlyAttr:function(_3e3){
_3e1.set(this.focusNode,"readOnly",_3e3);
this._set("readOnly",_3e3);
},postCreate:function(){
this.inherited(arguments);
if(has("ie")){
this.connect(this.focusNode||this.domNode,"onkeydown",this._onKeyDown);
}
if(this._resetValue===undefined){
this._lastValueReported=this._resetValue=this.value;
}
},_setValueAttr:function(_3e4,_3e5){
this._handleOnChange(_3e4,_3e5);
},_handleOnChange:function(_3e6,_3e7){
this._set("value",_3e6);
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
define("dijit/form/_FormWidgetMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-style","dojo/_base/lang","dojo/mouse","dojo/_base/sniff","dojo/_base/window","dojo/window","../a11y"],function(_3e8,_3e9,_3ea,_3eb,lang,_3ec,has,win,_3ed,a11y){
return _3e9("dijit.form._FormWidgetMixin",null,{name:"",alt:"",value:"",type:"text",tabIndex:"0",_setTabIndexAttr:"focusNode",disabled:false,intermediateChanges:false,scrollOnFocus:true,_setIdAttr:"focusNode",_setDisabledAttr:function(_3ee){
this._set("disabled",_3ee);
_3ea.set(this.focusNode,"disabled",_3ee);
if(this.valueNode){
_3ea.set(this.valueNode,"disabled",_3ee);
}
this.focusNode.setAttribute("aria-disabled",_3ee?"true":"false");
if(_3ee){
this._set("hovering",false);
this._set("active",false);
var _3ef="tabIndex" in this.attributeMap?this.attributeMap.tabIndex:("_setTabIndexAttr" in this)?this._setTabIndexAttr:"focusNode";
_3e8.forEach(lang.isArray(_3ef)?_3ef:[_3ef],function(_3f0){
var node=this[_3f0];
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
var _3f1=this.connect(this.focusNode,"onfocus",function(){
this.disconnect(_3f2);
this.disconnect(_3f1);
});
var _3f2=this.connect(win.body(),"onmouseup",function(){
this.disconnect(_3f2);
this.disconnect(_3f1);
if(this.focused){
this.focus();
}
});
}
if(this.scrollOnFocus){
this.defer(function(){
_3ed.scrollIntoView(this.domNode);
});
}
this.inherited(arguments);
},isFocusable:function(){
return !this.disabled&&this.focusNode&&(_3eb.get(this.domNode,"display")!="none");
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
},_onChangeActive:false,_handleOnChange:function(_3f3,_3f4){
if(this._lastValueReported==undefined&&(_3f4===null||!this._onChangeActive)){
this._resetValue=this._lastValueReported=_3f3;
}
this._pendingOnChange=this._pendingOnChange||(typeof _3f3!=typeof this._lastValueReported)||(this.compare(_3f3,this._lastValueReported)!=0);
if((this.intermediateChanges||_3f4||_3f4===undefined)&&this._pendingOnChange){
this._lastValueReported=_3f3;
this._pendingOnChange=false;
if(this._onChangeActive){
if(this._onChangeHandle){
this._onChangeHandle.remove();
}
this._onChangeHandle=this.defer(function(){
this._onChangeHandle=null;
this.onChange(_3f3);
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
define("dijit/WidgetSet",["dojo/_base/array","dojo/_base/declare","dojo/_base/window","./registry"],function(_3f5,_3f6,win,_3f7){
var _3f8=_3f6("dijit.WidgetSet",null,{constructor:function(){
this._hash={};
this.length=0;
},add:function(_3f9){
if(this._hash[_3f9.id]){
throw new Error("Tried to register widget with id=="+_3f9.id+" but that id is already registered");
}
this._hash[_3f9.id]=_3f9;
this.length++;
},remove:function(id){
if(this._hash[id]){
delete this._hash[id];
this.length--;
}
},forEach:function(func,_3fa){
_3fa=_3fa||win.global;
var i=0,id;
for(id in this._hash){
func.call(_3fa,this._hash[id],i++,this._hash);
}
return this;
},filter:function(_3fb,_3fc){
_3fc=_3fc||win.global;
var res=new _3f8(),i=0,id;
for(id in this._hash){
var w=this._hash[id];
if(_3fb.call(_3fc,w,i++,this._hash)){
res.add(w);
}
}
return res;
},byId:function(id){
return this._hash[id];
},byClass:function(cls){
var res=new _3f8(),id,_3fd;
for(id in this._hash){
_3fd=this._hash[id];
if(_3fd.declaredClass==cls){
res.add(_3fd);
}
}
return res;
},toArray:function(){
var ar=[];
for(var id in this._hash){
ar.push(this._hash[id]);
}
return ar;
},map:function(func,_3fe){
return _3f5.map(this.toArray(),func,_3fe);
},every:function(func,_3ff){
_3ff=_3ff||win.global;
var x=0,i;
for(i in this._hash){
if(!func.call(_3ff,this._hash[i],x++,this._hash)){
return false;
}
}
return true;
},some:function(func,_400){
_400=_400||win.global;
var x=0,i;
for(i in this._hash){
if(func.call(_400,this._hash[i],x++,this._hash)){
return true;
}
}
return false;
}});
_3f5.forEach(["forEach","filter","byClass","map","every","some"],function(func){
_3f7[func]=_3f8.prototype[func];
});
return _3f8;
});
},"dojo/store/util/SimpleQueryEngine":function(){
define("dojo/store/util/SimpleQueryEngine",["../../_base/array"],function(_401){
return function(_402,_403){
switch(typeof _402){
default:
throw new Error("Can not query with a "+typeof _402);
case "object":
case "undefined":
var _404=_402;
_402=function(_405){
for(var key in _404){
var _406=_404[key];
if(_406&&_406.test){
if(!_406.test(_405[key])){
return false;
}
}else{
if(_406!=_405[key]){
return false;
}
}
}
return true;
};
break;
case "string":
if(!this[_402]){
throw new Error("No filter function "+_402+" was found in store");
}
_402=this[_402];
case "function":
}
function _407(_408){
var _409=_401.filter(_408,_402);
if(_403&&_403.sort){
_409.sort(function(a,b){
for(var sort,i=0;sort=_403.sort[i];i++){
var _40a=a[sort.attribute];
var _40b=b[sort.attribute];
if(_40a!=_40b){
return !!sort.descending==_40a>_40b?-1:1;
}
}
return 0;
});
}
if(_403&&(_403.start||_403.count)){
var _40c=_409.length;
_409=_409.slice(_403.start||0,(_403.start||0)+(_403.count||Infinity));
_409.total=_40c;
}
return _409;
};
_407.matches=_402;
return _407;
};
});
},"dijit/typematic":function(){
define("dijit/typematic",["dojo/_base/array","dojo/_base/connect","dojo/_base/event","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/_base/sniff","."],function(_40d,_40e,_40f,_410,lang,on,has,_411){
var _412=(_411.typematic={_fireEventAndReload:function(){
this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=Math.max(this._currentTimeout<0?this._initialDelay:(this._subsequentDelay>1?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay)),this._minDelay);
this._timer=setTimeout(lang.hitch(this,"_fireEventAndReload"),this._currentTimeout);
},trigger:function(evt,_413,node,_414,obj,_415,_416,_417){
if(obj!=this._obj){
this.stop();
this._initialDelay=_416||500;
this._subsequentDelay=_415||0.9;
this._minDelay=_417||10;
this._obj=obj;
this._evt=evt;
this._node=node;
this._currentTimeout=-1;
this._count=-1;
this._callback=lang.hitch(_413,_414);
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
},addKeyListener:function(node,_418,_419,_41a,_41b,_41c,_41d){
if(_418.keyCode){
_418.charOrCode=_418.keyCode;
_410.deprecated("keyCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}else{
if(_418.charCode){
_418.charOrCode=String.fromCharCode(_418.charCode);
_410.deprecated("charCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}
}
var _41e=[on(node,_40e._keypress,lang.hitch(this,function(evt){
if(evt.charOrCode==_418.charOrCode&&(_418.ctrlKey===undefined||_418.ctrlKey==evt.ctrlKey)&&(_418.altKey===undefined||_418.altKey==evt.altKey)&&(_418.metaKey===undefined||_418.metaKey==(evt.metaKey||false))&&(_418.shiftKey===undefined||_418.shiftKey==evt.shiftKey)){
_40f.stop(evt);
_412.trigger(evt,_419,node,_41a,_418,_41b,_41c,_41d);
}else{
if(_412._obj==_418){
_412.stop();
}
}
})),on(node,"keyup",lang.hitch(this,function(){
if(_412._obj==_418){
_412.stop();
}
}))];
return {remove:function(){
_40d.forEach(_41e,function(h){
h.remove();
});
}};
},addMouseListener:function(node,_41f,_420,_421,_422,_423){
var _424=[on(node,"mousedown",lang.hitch(this,function(evt){
_40f.stop(evt);
_412.trigger(evt,_41f,node,_420,node,_421,_422,_423);
})),on(node,"mouseup",lang.hitch(this,function(evt){
if(this._obj){
_40f.stop(evt);
}
_412.stop();
})),on(node,"mouseout",lang.hitch(this,function(evt){
_40f.stop(evt);
_412.stop();
})),on(node,"mousemove",lang.hitch(this,function(evt){
evt.preventDefault();
})),on(node,"dblclick",lang.hitch(this,function(evt){
_40f.stop(evt);
if(has("ie")<9){
_412.trigger(evt,_41f,node,_420,node,_421,_422,_423);
setTimeout(lang.hitch(this,_412.stop),50);
}
}))];
return {remove:function(){
_40d.forEach(_424,function(h){
h.remove();
});
}};
},addListener:function(_425,_426,_427,_428,_429,_42a,_42b,_42c){
var _42d=[this.addKeyListener(_426,_427,_428,_429,_42a,_42b,_42c),this.addMouseListener(_425,_428,_429,_42a,_42b,_42c)];
return {remove:function(){
_40d.forEach(_42d,function(h){
h.remove();
});
}};
}});
return _412;
});
},"dijit/MenuItem":function(){
require({cache:{"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n"}});
define("dijit/MenuItem",["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/event","dojo/_base/kernel","dojo/_base/sniff","./_Widget","./_TemplatedMixin","./_Contained","./_CssStateMixin","dojo/text!./templates/MenuItem.html"],function(_42e,dom,_42f,_430,_431,_432,has,_433,_434,_435,_436,_437){
return _42e("dijit.MenuItem",[_433,_434,_435,_436],{templateString:_437,baseClass:"dijitMenuItem",label:"",_setLabelAttr:{node:"containerNode",type:"innerHTML"},iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},accelKey:"",disabled:false,_fillContent:function(_438){
if(_438&&!("label" in this.params)){
this.set("label",_438.innerHTML);
}
},buildRendering:function(){
this.inherited(arguments);
var _439=this.id+"_text";
_42f.set(this.containerNode,"id",_439);
if(this.accelKeyNode){
_42f.set(this.accelKeyNode,"id",this.id+"_accel");
_439+=" "+this.id+"_accel";
}
this.domNode.setAttribute("aria-labelledby",_439);
dom.setSelectable(this.domNode,false);
},_onHover:function(){
this.getParent().onItemHover(this);
},_onUnhover:function(){
this.getParent().onItemUnhover(this);
this._set("hovering",false);
},_onClick:function(evt){
this.getParent().onItemClick(this,evt);
_431.stop(evt);
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
},_setSelected:function(_43a){
_430.toggle(this.domNode,"dijitMenuItemSelected",_43a);
},setLabel:function(_43b){
_432.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_43b);
},setDisabled:function(_43c){
_432.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_43c);
},_setDisabledAttr:function(_43d){
this.focusNode.setAttribute("aria-disabled",_43d?"true":"false");
this._set("disabled",_43d);
},_setAccelKeyAttr:function(_43e){
this.accelKeyNode.style.display=_43e?"":"none";
this.accelKeyNode.innerHTML=_43e;
_42f.set(this.containerNode,"colSpan",_43e?"1":"2");
this._set("accelKey",_43e);
}});
});
},"dijit/layout/TabController":function(){
require({cache:{"url:dijit/layout/templates/_TabButton.html":"<div role=\"presentation\" data-dojo-attach-point=\"titleNode\" data-dojo-attach-event='onclick:onClick'>\n    <div role=\"presentation\" class='dijitTabInnerDiv' data-dojo-attach-point='innerDiv'>\n        <div role=\"presentation\" class='dijitTabContent' data-dojo-attach-point='tabContent'>\n        \t<div role=\"presentation\" data-dojo-attach-point='focusNode'>\n\t\t        <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" data-dojo-attach-point='iconNode' />\n\t\t        <span data-dojo-attach-point='containerNode' class='tabLabel'></span>\n\t\t        <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\n\t\t        \t\tdata-dojo-attach-event='onclick: onClickCloseButton' role=\"presentation\">\n\t\t            <span data-dojo-attach-point='closeText' class='dijitTabCloseText'>[x]</span\n\t\t        ></span>\n\t\t\t</div>\n        </div>\n    </div>\n</div>\n"}});
define("dijit/layout/TabController",["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/i18n","dojo/_base/lang","./StackController","../Menu","../MenuItem","dojo/text!./templates/_TabButton.html","dojo/i18n!../nls/common"],function(_43f,dom,_440,_441,i18n,lang,_442,Menu,_443,_444){
var _445=_43f("dijit.layout._TabButton",_442.StackButton,{baseClass:"dijitTab",cssStateNodes:{closeNode:"dijitTabCloseButton"},templateString:_444,scrollOnFocus:false,buildRendering:function(){
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
_441.toggle(this.innerDiv,"dijitClosable",disp);
this.closeNode.style.display=disp?"":"none";
if(disp){
var _446=i18n.getLocalization("dijit","common");
if(this.closeNode){
_440.set(this.closeNode,"title",_446.itemClose);
}
this._closeMenu=new Menu({id:this.id+"_Menu",dir:this.dir,lang:this.lang,textDir:this.textDir,targetNodeIds:[this.domNode]});
this._closeMenu.addChild(new _443({label:_446.itemClose,dir:this.dir,lang:this.lang,textDir:this.textDir,onClick:lang.hitch(this,"onClickCloseButton")}));
}else{
if(this._closeMenu){
this._closeMenu.destroyRecursive();
delete this._closeMenu;
}
}
},_setLabelAttr:function(_447){
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
var _448=_43f("dijit.layout.TabController",_442,{baseClass:"dijitTabController",templateString:"<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'></div>",tabPosition:"top",buttonWidget:"curam.widget._TabButton",startup:function(){
this.inherited(arguments);
this.connect(this,"onAddChild",function(page,_449){
var _44a=this;
page.controlButton._curamPageId=page.id;
page.controlButton.connect(page.controlButton,"_setCuramVisibleAttr",function(){
if(page.controlButton.curamVisible){
var _44b=dojo.map(_44a.getChildren(),function(btn){
return btn._curamPageId;
});
var _44c=curam.tab.getTabWidgetId(curam.tab.getContainerTab(page.domNode));
var _44d=curam.util.TabNavigation.getInsertIndex(_44c,_44b,page.id);
_44a.addChild(page.controlButton,_44d);
}else{
var _44e=page.controlButton;
if(dojo.indexOf(_44a.getChildren(),_44e)!=-1){
_44a.removeChild(_44e);
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
var _44f=0;
for(var pane in this.pane2button){
var ow=this.pane2button[pane].innerDiv.scrollWidth;
_44f=Math.max(_44f,ow);
}
for(pane in this.pane2button){
this.pane2button[pane].innerDiv.style.width=_44f+"px";
}
},onButtonClick:function(page){
if(!page.controlButton.get("curamDisabled")){
var _450=dijit.byId(this.containerId);
_450.selectChild(page);
}
}});
_448.TabButton=_445;
return _448;
});
},"dijit/layout/_LayoutWidget":function(){
define("dijit/layout/_LayoutWidget",["dojo/_base/lang","../_Widget","../_Container","../_Contained","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/sniff","dojo/_base/window"],function(lang,_451,_452,_453,_454,_455,_456,_457,has,win){
return _454("dijit.layout._LayoutWidget",[_451,_452,_453],{baseClass:"dijitLayoutContainer",isLayoutContainer:true,buildRendering:function(){
this.inherited(arguments);
_455.add(this.domNode,"dijitContainer");
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
var _458=this.getParent&&this.getParent();
if(!(_458&&_458.isLayoutContainer)){
this.resize();
this.connect(win.global,"onresize",function(){
this.resize();
});
}
},resize:function(_459,_45a){
var node=this.domNode;
if(_459){
_456.setMarginBox(node,_459);
}
var mb=_45a||{};
lang.mixin(mb,_459||{});
if(!("h" in mb)||!("w" in mb)){
mb=lang.mixin(_456.getMarginBox(node),mb);
}
var cs=_457.getComputedStyle(node);
var me=_456.getMarginExtents(node,cs);
var be=_456.getBorderExtents(node,cs);
var bb=(this._borderBox={w:mb.w-(me.w+be.w),h:mb.h-(me.h+be.h)});
var pe=_456.getPadExtents(node,cs);
this._contentBox={l:_457.toPixelValue(node,cs.paddingLeft),t:_457.toPixelValue(node,cs.paddingTop),w:bb.w-pe.w,h:bb.h-pe.h};
this.layout();
},layout:function(){
},_setupChild:function(_45b){
var cls=this.baseClass+"-child "+(_45b.baseClass?this.baseClass+"-"+_45b.baseClass:"");
_455.add(_45b.domNode,cls);
},addChild:function(_45c,_45d){
this.inherited(arguments);
if(this._started){
this._setupChild(_45c);
}
},removeChild:function(_45e){
var cls=this.baseClass+"-child"+(_45e.baseClass?" "+this.baseClass+"-"+_45e.baseClass:"");
_455.remove(_45e.domNode,cls);
this.inherited(arguments);
}});
});
},"dijit/popup":function(){
define("dijit/popup",["dojo/_base/array","dojo/aspect","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/window","./place","./BackgroundIframe","."],function(_45f,_460,_461,_462,dom,_463,_464,_465,_466,_467,has,keys,lang,on,win,_468,_469,_46a){
function _46b(){
if(this._popupWrapper){
_464.destroy(this._popupWrapper);
delete this._popupWrapper;
}
};
var _46c=_462(null,{_stack:[],_beginZIndex:1000,_idGen:1,_createWrapper:function(_46d){
var _46e=_46d._popupWrapper,node=_46d.domNode;
if(!_46e){
_46e=_464.create("div",{"class":"dijitPopup",style:{display:"none"},role:"presentation"},win.body());
_46e.appendChild(node);
var s=node.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
_46d._popupWrapper=_46e;
_460.after(_46d,"destroy",_46b,true);
}
return _46e;
},moveOffScreen:function(_46f){
var _470=this._createWrapper(_46f);
_466.set(_470,{visibility:"hidden",top:"-9999px",display:""});
},hide:function(_471){
var _472=this._createWrapper(_471);
_466.set(_472,"display","none");
},getTopPopup:function(){
var _473=this._stack;
for(var pi=_473.length-1;pi>0&&_473[pi].parent===_473[pi-1].widget;pi--){
}
return _473[pi];
},open:function(args){
var _474=this._stack,_475=args.popup,_476=args.orient||["below","below-alt","above","above-alt"],ltr=args.parent?args.parent.isLeftToRight():_465.isBodyLtr(),_477=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+this._idGen++);
while(_474.length&&(!args.parent||!dom.isDescendant(args.parent.domNode,_474[_474.length-1].widget.domNode))){
this.close(_474[_474.length-1].widget);
}
var _478=this._createWrapper(_475);
_463.set(_478,{id:id,style:{zIndex:this._beginZIndex+_474.length},"class":"dijitPopup "+(_475.baseClass||_475["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:args.parent?args.parent.id:""});
if(has("bgIframe")&&!_475.bgIframe){
_475.bgIframe=new _469(_478);
}
var best=_477?_468.around(_478,_477,_476,ltr,_475.orient?lang.hitch(_475,"orient"):null):_468.at(_478,args,_476=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],args.padding);
_478.style.display="";
_478.style.visibility="visible";
_475.domNode.style.visibility="visible";
var _479=[];
_479.push(on(_478,_461._keypress,lang.hitch(this,function(evt){
if(evt.charOrCode==keys.ESCAPE&&args.onCancel){
_467.stop(evt);
args.onCancel();
}else{
if(evt.charOrCode===keys.TAB){
_467.stop(evt);
var _47a=this.getTopPopup();
if(_47a&&_47a.onCancel){
_47a.onCancel();
}
}
}
})));
if(_475.onCancel&&args.onCancel){
_479.push(_475.on("cancel",args.onCancel));
}
_479.push(_475.on(_475.onExecute?"execute":"change",lang.hitch(this,function(){
var _47b=this.getTopPopup();
if(_47b&&_47b.onExecute){
_47b.onExecute();
}
})));
_474.push({widget:_475,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:_479});
if(_475.onOpen){
_475.onOpen(best);
}
return best;
},close:function(_47c){
var _47d=this._stack;
while((_47c&&_45f.some(_47d,function(elem){
return elem.widget==_47c;
}))||(!_47c&&_47d.length)){
var top=_47d.pop(),_47e=top.widget,_47f=top.onClose;
if(_47e.onClose){
_47e.onClose();
}
var h;
while(h=top.handlers.pop()){
h.remove();
}
if(_47e&&_47e.domNode){
this.hide(_47e);
}
if(_47f){
_47f();
}
}
}});
return (_46a.popup=new _46c());
});
},"dijit/_base/manager":function(){
define("dijit/_base/manager",["dojo/_base/array","dojo/_base/config","../registry",".."],function(_480,_481,_482,_483){
_480.forEach(["byId","getUniqueId","findWidgets","_destroyAll","byNode","getEnclosingWidget"],function(name){
_483[name]=_482[name];
});
_483.defaultDuration=_481["defaultDuration"]||200;
return _483;
});
},"dijit/layout/StackController":function(){
define("dijit/layout/StackController",["dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/_base/sniff","../focus","../registry","../_Widget","../_TemplatedMixin","../_Container","../form/ToggleButton","dojo/i18n!../nls/common"],function(_484,_485,_486,keys,lang,has,_487,_488,_489,_48a,_48b,_48c){
var _48d=_485("dijit.layout._StackButton",_48c,{tabIndex:"-1",closeButton:false,_setCheckedAttr:function(_48e,_48f){
this.inherited(arguments);
this.focusNode.removeAttribute("aria-pressed");
},buildRendering:function(evt){
this.inherited(arguments);
(this.focusNode||this.domNode).setAttribute("role","tab");
},onClick:function(){
_487.focus(this.focusNode);
},onClickCloseButton:function(evt){
evt.stopPropagation();
}});
var _490=_485("dijit.layout.StackController",[_489,_48a,_48b],{baseClass:"dijitStackController",templateString:"<span role='tablist' data-dojo-attach-event='onkeypress'></span>",containerId:"",buttonWidget:_48d,constructor:function(){
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
_484.forEach(info.children,this.onAddChild,this);
if(info.selected){
this.onSelectChild(info.selected);
}
},destroy:function(){
for(var pane in this.pane2button){
this.onRemoveChild(_488.byId(pane));
}
this.inherited(arguments);
},onAddChild:function(page,_491){
var cls=lang.isString(this.buttonWidget)?lang.getObject(this.buttonWidget):this.buttonWidget;
var _492=new cls({id:this.id+"_"+page.id,label:page.title,dir:page.dir,lang:page.lang,textDir:page.textDir,showLabel:page.showTitle,iconClass:page.iconClass,closeButton:page.closable,title:page.tooltip});
_492.focusNode.setAttribute("aria-selected","false");
var _493=["title","showTitle","iconClass","closable","tooltip"],_494=["label","showLabel","iconClass","closeButton","title"];
this.pane2watches[page.id]=_484.map(_493,function(_495,idx){
return page.watch(_495,function(name,_496,_497){
_492.set(_494[idx],_497);
});
});
this.pane2connects[page.id]=[this.connect(_492,"onClick",lang.hitch(this,"onButtonClick",page)),this.connect(_492,"onClickCloseButton",lang.hitch(this,"onCloseButtonClick",page))];
this.addChild(_492,_491);
this.pane2button[page.id]=_492;
page.controlButton=_492;
if(!this._currentChild){
_492.focusNode.setAttribute("tabIndex","0");
_492.focusNode.setAttribute("aria-selected","true");
this._currentChild=page;
}
if(!this.isLeftToRight()&&has("ie")&&this._rectifyRtlTabList){
this._rectifyRtlTabList();
}
},onRemoveChild:function(page){
if(this._currentChild===page){
this._currentChild=null;
}
_484.forEach(this.pane2connects[page.id],lang.hitch(this,"disconnect"));
delete this.pane2connects[page.id];
_484.forEach(this.pane2watches[page.id],function(w){
w.unwatch();
});
delete this.pane2watches[page.id];
var _498=this.pane2button[page.id];
if(_498){
this.removeChild(_498);
delete this.pane2button[page.id];
_498.destroy();
}
delete page.controlButton;
},onSelectChild:function(page){
if(!page){
return;
}
if(this._currentChild){
var _499=this.pane2button[this._currentChild.id];
_499.set("checked",false);
_499.focusNode.setAttribute("aria-selected","false");
_499.focusNode.setAttribute("tabIndex","-1");
}
var _49a=this.pane2button[page.id];
_49a.set("checked",true);
_49a.focusNode.setAttribute("aria-selected","true");
this._currentChild=page;
_49a.focusNode.setAttribute("tabIndex","0");
var _49b=_488.byId(this.containerId);
_49b.containerNode.setAttribute("aria-labelledby",_49a.id);
},onButtonClick:function(page){
if(this._currentChild.id===page.id){
var _49c=this.pane2button[page.id];
_49c.set("checked",true);
}
var _49d=_488.byId(this.containerId);
_49d.selectChild(page);
},onCloseButtonClick:function(page){
var _49e=_488.byId(this.containerId);
_49e.closeChild(page);
if(this._currentChild){
var b=this.pane2button[this._currentChild.id];
if(b){
_487.focus(b.focusNode||b.domNode);
}
}
},adjacent:function(_49f){
if(!this.isLeftToRight()&&(!this.tabPosition||/top|bottom/.test(this.tabPosition))){
_49f=!_49f;
}
var _4a0=this.getChildren();
var _4a1=_484.indexOf(_4a0,this.pane2button[this._currentChild.id]);
var _4a2=_49f?1:_4a0.length-1;
return _4a0[(_4a1+_4a2)%_4a0.length];
},onkeypress:function(e){
if(this.disabled||e.altKey){
return;
}
var _4a3=null;
if(e.ctrlKey||!e._djpage){
switch(e.charOrCode){
case keys.LEFT_ARROW:
case keys.UP_ARROW:
if(!e._djpage){
_4a3=false;
}
break;
case keys.PAGE_UP:
if(e.ctrlKey){
_4a3=false;
}
break;
case keys.RIGHT_ARROW:
case keys.DOWN_ARROW:
if(!e._djpage){
_4a3=true;
}
break;
case keys.PAGE_DOWN:
if(e.ctrlKey){
_4a3=true;
}
break;
case keys.HOME:
case keys.END:
var _4a4=this.getChildren();
if(_4a4&&_4a4.length){
_4a4[e.charOrCode==keys.HOME?0:_4a4.length-1].onClick();
}
_486.stop(e);
break;
case keys.DELETE:
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
_486.stop(e);
break;
default:
if(e.ctrlKey){
if(e.charOrCode===keys.TAB){
this.adjacent(!e.shiftKey).onClick();
_486.stop(e);
}else{
if(e.charOrCode=="w"){
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
_486.stop(e);
}
}
}
}
if(_4a3!==null){
this.adjacent(_4a3).onClick();
_486.stop(e);
}
}
},onContainerKeyPress:function(info){
info.e._djpage=info.page;
this.onkeypress(info.e);
}});
_490.StackButton=_48d;
return _490;
});
},"curam/util/onLoad":function(){
define("curam/util/onLoad",["curam/util","curam/define","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _4a5=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.onLoad",{EVENT:"/curam/frame/load",publishers:[],subscribers:[],defaultGetIdFunction:function(_4a6){
var _4a7=dojo.attr(_4a6,"class").split(" ");
return dojo.filter(_4a7,function(_4a8){
return _4a8.indexOf("iframe-")==0;
})[0];
},addPublisher:function(_4a9){
curam.util.onLoad.publishers.push(_4a9);
},addSubscriber:function(_4aa,_4ab,_4ac){
curam.util.onLoad.subscribers.push({"getId":_4ac?_4ac:curam.util.onLoad.defaultGetIdFunction,"callback":_4ab,"iframeId":_4aa});
},removeSubscriber:function(_4ad,_4ae,_4af){
curam.util.onLoad.subscribers=dojo.filter(curam.util.onLoad.subscribers,function(_4b0){
return !(_4b0.iframeId==_4ad&&_4b0.callback==_4ae);
});
},execute:function(){
if(window.parent==window){
curam.debug.log("curam.util.onLoad.execute(): "+_4a5.getProperty("curam.util.onLoad.exit"));
return;
}
var _4b1={};
dojo.forEach(curam.util.onLoad.publishers,function(_4b2){
_4b2(_4b1);
});
curam.util.onLoad.publishers=[];
require(["dojo/io/iframe"]);
var _4b3=dojo.io.iframe.create(null,null,"about:blank");
dojo.attr(_4b3,"id","ie-progress-indicator-helper");
dojo.attr(_4b3,"title","ie-progress-indicator-helper");
window.parent.dojo.publish(curam.util.onLoad.EVENT,[window.frameElement,_4b1]);
}});
curam.util.subscribe(curam.util.onLoad.EVENT,function(_4b4,_4b5){
dojo.forEach(curam.util.onLoad.subscribers,function(_4b6){
var _4b7=_4b6.getId(_4b4);
if(_4b6.iframeId==_4b7){
_4b6.callback(_4b7,_4b5);
}
});
});
return curam.util.onLoad;
});
},"dijit/layout/TabContainer":function(){
define("dijit/layout/TabContainer",["dojo/_base/lang","dojo/_base/declare","./_TabContainerBase","./TabController","./ScrollingTabController"],function(lang,_4b8,_4b9,_4ba,_4bb){
return _4b8("dijit.layout.TabContainer",_4b9,{useMenu:true,useSlider:true,controllerWidget:"",_makeController:function(_4bc){
var cls=this.baseClass+"-tabs"+(this.doLayout?"":" dijitTabNoLayout"),_4ba=lang.getObject(this.controllerWidget);
return new _4ba({id:this.id+"_tablist",dir:this.dir,lang:this.lang,textDir:this.textDir,tabPosition:this.tabPosition,doLayout:this.doLayout,containerId:this.id,"class":cls,nested:this.nested,useMenu:this.useMenu,useSlider:this.useSlider,tabStripClass:this.tabStrip?this.baseClass+(this.tabStrip?"":"No")+"Strip":null},_4bc);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.controllerWidget){
this.controllerWidget=(this.tabPosition=="top"||this.tabPosition=="bottom")&&!this.nested?"dijit.layout.ScrollingTabController":"dijit.layout.TabController";
}
}});
});
},"dijit/BackgroundIframe":function(){
define("dijit/BackgroundIframe",["require",".","dojo/_base/config","dojo/dom-construct","dojo/dom-style","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window"],function(_4bd,_4be,_4bf,_4c0,_4c1,lang,on,has,win){
has.add("bgIframe",has("ie")||has("mozilla"));
var _4c2=new function(){
var _4c3=[];
this.pop=function(){
var _4c4;
if(_4c3.length){
_4c4=_4c3.pop();
_4c4.style.display="";
}else{
if(has("ie")<9){
var burl=_4bf["dojoBlankHtmlUrl"]||_4bd.toUrl("dojo/resources/blank.html")||"javascript:\"\"";
var html="<iframe src='"+burl+"' role='presentation'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_4c4=win.doc.createElement(html);
}else{
_4c4=_4c0.create("iframe");
_4c4.src="javascript:\"\"";
_4c4.className="dijitBackgroundIframe";
_4c4.setAttribute("role","presentation");
_4c1.set(_4c4,"opacity",0.1);
}
_4c4.tabIndex=-1;
}
return _4c4;
};
this.push=function(_4c5){
_4c5.style.display="none";
_4c3.push(_4c5);
};
}();
_4be.BackgroundIframe=function(node){
if(!node.id){
throw new Error("no id");
}
if(has("bgIframe")){
var _4c6=(this.iframe=_4c2.pop());
node.appendChild(_4c6);
if(has("ie")<7||has("quirks")){
this.resize(node);
this._conn=on(node,"resize",lang.hitch(this,function(){
this.resize(node);
}));
}else{
_4c1.set(_4c6,{width:"100%",height:"100%"});
}
}
};
lang.extend(_4be.BackgroundIframe,{resize:function(node){
if(this.iframe){
_4c1.set(this.iframe,{width:node.offsetWidth+"px",height:node.offsetHeight+"px"});
}
},destroy:function(){
if(this._conn){
this._conn.remove();
this._conn=null;
}
if(this.iframe){
_4c2.push(this.iframe);
delete this.iframe;
}
}});
return _4be.BackgroundIframe;
});
},"curam/util/Constants":function(){
define("curam/util/Constants",["curam/define"],function(){
curam.define.singleton("curam.util.Constants",{RETURN_PAGE_PARAM:"__o3rpu"});
return curam.util.Constants;
});
},"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n","dijit/form/Button":function(){
require({cache:{"url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n"}});
define("dijit/form/Button",["require","dojo/_base/declare","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/ready","./_FormWidget","./_ButtonMixin","dojo/text!./templates/Button.html"],function(_4c7,_4c8,_4c9,_4ca,lang,_4cb,_4cc,_4cd,_4ce){
if(!_4ca.isAsync){
_4cb(0,function(){
var _4cf=["dijit/form/DropDownButton","dijit/form/ComboButton","dijit/form/ToggleButton"];
_4c7(_4cf);
});
}
return _4c8("dijit.form.Button",[_4cc,_4cd],{showLabel:true,iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},baseClass:"dijitButton",templateString:_4ce,_setValueAttr:"valueNode",_onClick:function(e){
var ok=this.inherited(arguments);
if(ok){
if(this.valueNode){
this.valueNode.click();
e.preventDefault();
}
}
return ok;
},_fillContent:function(_4d0){
if(_4d0&&(!this.params||!("label" in this.params))){
var _4d1=lang.trim(_4d0.innerHTML);
if(_4d1){
this.label=_4d1;
}
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
_4c9.toggle(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},setLabel:function(_4d2){
_4ca.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_4d2);
},_setLabelAttr:function(_4d3){
this.inherited(arguments);
if(!this.showLabel&&!("title" in this.params)){
this.titleNode.title=lang.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
}});
});
},"url:dijit/layout/templates/TabContainer.html":"<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" data-dojo-attach-point=\"containerNode\"></div>\n</div>\n","dijit/_WidgetBase":function(){
define("dijit/_WidgetBase",["require","dojo/_base/array","dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/ready","dojo/Stateful","dojo/topic","dojo/_base/window","./registry"],function(_4d4,_4d5,_4d6,_4d7,_4d8,_4d9,dom,_4da,_4db,_4dc,_4dd,_4de,_4df,lang,on,_4e0,_4e1,_4e2,win,_4e3){
var _4e4=typeof (dojo.global.perf)!="undefined";
if(!_4df.isAsync){
_4e0(0,function(){
var _4e5=["dijit/_base/manager"];
_4d4(_4e5);
});
}
var _4e6={};
function _4e7(obj){
var ret={};
for(var attr in obj){
ret[attr.toLowerCase()]=true;
}
return ret;
};
function _4e8(attr){
return function(val){
_4da[val?"set":"remove"](this.domNode,attr,val);
this._set(attr,val);
};
};
return _4d9("dijit._WidgetBase",_4e1,{id:"",_setIdAttr:"domNode",lang:"",_setLangAttr:_4e8("lang"),dir:"",_setDirAttr:_4e8("dir"),textDir:"","class":"",_setClassAttr:{node:"domNode",type:"class"},style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{},_blankGif:_4d7.blankGif||_4d4.toUrl("dojo/resources/blank.gif"),postscript:function(_4e9,_4ea){
this.create(_4e9,_4ea);
},create:function(_4eb,_4ec){
if(_4e4){
perf.widgetStartedLoadingCallback();
}
this.srcNodeRef=dom.byId(_4ec);
this._connects=[];
this._supportingWidgets=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_4eb){
this.params=_4eb;
lang.mixin(this,_4eb);
}
this.postMixInProperties();
if(!this.id){
this.id=_4e3.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
_4e3.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _4ed=this.srcNodeRef;
if(_4ed&&_4ed.parentNode&&this.domNode!==_4ed){
_4ed.parentNode.replaceChild(this.domNode,_4ed);
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
if(_4e4){
perf.widgetLoadedCallback(this);
}
},_applyAttributes:function(){
var ctor=this.constructor,list=ctor._setterAttrs;
if(!list){
list=(ctor._setterAttrs=[]);
for(var attr in this.attributeMap){
list.push(attr);
}
var _4ee=ctor.prototype;
for(var _4ef in _4ee){
if(_4ef in this.attributeMap){
continue;
}
var _4f0="_set"+_4ef.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
})+"Attr";
if(_4f0 in _4ee){
list.push(_4ef);
}
}
}
_4d5.forEach(list,function(attr){
if(this.params&&attr in this.params){
}else{
if(this[attr]){
this.set(attr,this[attr]);
}
}
},this);
for(var _4f1 in this.params){
this.set(_4f1,this[_4f1]);
}
},postMixInProperties:function(){
},buildRendering:function(){
if(!this.domNode){
this.domNode=this.srcNodeRef||_4dc.create("div");
}
if(this.baseClass){
var _4f2=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_4f2=_4f2.concat(_4d5.map(_4f2,function(name){
return name+"Rtl";
}));
}
_4db.add(this.domNode,_4f2);
}
},postCreate:function(){
},startup:function(){
if(this._started){
return;
}
this._started=true;
_4d5.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
},destroyRecursive:function(_4f3){
this._beingDestroyed=true;
this.destroyDescendants(_4f3);
this.destroy(_4f3);
},destroy:function(_4f4){
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
this.destroyRendering(_4f4);
_4e3.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_4f5){
if(this.bgIframe){
this.bgIframe.destroy(_4f5);
delete this.bgIframe;
}
if(this.domNode){
if(_4f5){
_4da.remove(this.domNode,"widgetId");
}else{
_4dc.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_4f5){
_4dc.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_4f6){
_4d5.forEach(this.getChildren(),function(_4f7){
if(_4f7.destroyRecursive){
_4f7.destroyRecursive(_4f6);
}
});
},uninitialize:function(){
return false;
},_setStyleAttr:function(_4f8){
var _4f9=this.domNode;
if(lang.isObject(_4f8)){
_4de.set(_4f9,_4f8);
}else{
if(_4f9.style.cssText){
_4f9.style.cssText+="; "+_4f8;
}else{
_4f9.style.cssText=_4f8;
}
}
this._set("style",_4f8);
},_attrToDom:function(attr,_4fa,_4fb){
_4fb=arguments.length>=3?_4fb:this.attributeMap[attr];
_4d5.forEach(lang.isArray(_4fb)?_4fb:[_4fb],function(_4fc){
var _4fd=this[_4fc.node||_4fc||"domNode"];
var type=_4fc.type||"attribute";
switch(type){
case "attribute":
if(lang.isFunction(_4fa)){
_4fa=lang.hitch(this,_4fa);
}
var _4fe=_4fc.attribute?_4fc.attribute:(/^on[A-Z][a-zA-Z]*$/.test(attr)?attr.toLowerCase():attr);
_4da.set(_4fd,_4fe,_4fa);
break;
case "innerText":
_4fd.innerHTML="";
_4fd.appendChild(win.doc.createTextNode(_4fa));
break;
case "innerHTML":
_4fd.innerHTML=_4fa;
break;
case "class":
_4db.replace(_4fd,_4fa,this[attr]);
break;
}
},this);
},get:function(name){
var _4ff=this._getAttrNames(name);
return this[_4ff.g]?this[_4ff.g]():this[name];
},set:function(name,_500){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _501=this._getAttrNames(name),_502=this[_501.s];
if(lang.isFunction(_502)){
var _503=_502.apply(this,Array.prototype.slice.call(arguments,1));
}else{
var _504=this.focusNode&&!lang.isFunction(this.focusNode)?"focusNode":"domNode",tag=this[_504].tagName,_505=_4e6[tag]||(_4e6[tag]=_4e7(this[_504])),map=name in this.attributeMap?this.attributeMap[name]:_501.s in this?this[_501.s]:((_501.l in _505&&typeof _500!="function")||/^aria-|^data-|^role$/.test(name))?_504:null;
if(map!=null){
this._attrToDom(name,_500,map);
}
this._set(name,_500);
}
return _503||this;
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
});
return (apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr",l:uc.toLowerCase()});
},_set:function(name,_506){
var _507=this[name];
this[name]=_506;
if(this._watchCallbacks&&this._created&&_506!==_507){
this._watchCallbacks(name,_507,_506);
}
},on:function(type,func){
return _4d6.after(this,this._onMap(type),func,true);
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
return this.containerNode?_4e3.findWidgets(this.containerNode):[];
},getParent:function(){
return _4e3.getEnclosingWidget(this.domNode.parentNode);
},connect:function(obj,_508,_509){
var _50a=_4d8.connect(obj,_508,this,_509);
this._connects.push(_50a);
return _50a;
},disconnect:function(_50b){
var i=_4d5.indexOf(this._connects,_50b);
if(i!=-1){
_50b.remove();
this._connects.splice(i,1);
}
},subscribe:function(t,_50c){
var _50d=_4e2.subscribe(t,lang.hitch(this,_50c));
this._connects.push(_50d);
return _50d;
},unsubscribe:function(_50e){
this.disconnect(_50e);
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):_4dd.isBodyLtr();
},isFocusable:function(){
return this.focus&&(_4de.get(this.domNode,"display")!="none");
},placeAt:function(_50f,_510){
if(_50f.declaredClass&&_50f.addChild){
_50f.addChild(this,_510);
}else{
_4dc.place(this.domNode,_50f,_510);
}
return this;
},getTextDir:function(text,_511){
return _511;
},applyTextDir:function(){
},defer:function(fcn,_512){
var _513=setTimeout(lang.hitch(this,function(){
_513=null;
if(!this._destroyed){
lang.hitch(this,fcn)();
}
}),_512||0);
return {remove:function(){
if(_513){
clearTimeout(_513);
_513=null;
}
return null;
}};
}});
});
},"dijit/layout/_TabContainerBase":function(){
require({cache:{"url:dijit/layout/templates/TabContainer.html":"<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" data-dojo-attach-point=\"containerNode\"></div>\n</div>\n"}});
define("dijit/layout/_TabContainerBase",["dojo/text!./templates/TabContainer.html","./StackContainer","./utils","../_TemplatedMixin","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style"],function(_514,_515,_516,_517,_518,_519,_51a,_51b){
return _518("dijit.layout._TabContainerBase",[_515,_517],{tabPosition:"top",baseClass:"dijitTabContainer",tabStrip:false,nested:false,templateString:_514,postMixInProperties:function(){
this.baseClass+=this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"");
this.srcNodeRef&&_51b.set(this.srcNodeRef,"visibility","hidden");
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.tablist=this._makeController(this.tablistNode);
if(!this.doLayout){
_519.add(this.domNode,"dijitTabContainerNoLayout");
}
if(this.nested){
_519.add(this.domNode,"dijitTabContainerNested");
_519.add(this.tablist.containerNode,"dijitTabContainerTabListNested");
_519.add(this.tablistSpacer,"dijitTabContainerSpacerNested");
_519.add(this.containerNode,"dijitTabPaneWrapperNested");
}else{
_519.add(this.domNode,"tabStrip-"+(this.tabStrip?"enabled":"disabled"));
}
},_setupChild:function(tab){
_519.add(tab.domNode,"dijitTabPane");
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
var _51c=this.tabPosition.replace(/-h/,"");
this.tablist.layoutAlign=_51c;
var _51d=[this.tablist,{domNode:this.tablistSpacer,layoutAlign:_51c},{domNode:this.containerNode,layoutAlign:"client"}];
_516.layoutChildren(this.domNode,this._contentBox,_51d);
this._containerContentBox=_516.marginBox2contentBox(this.containerNode,_51d[2]);
if(sc&&sc.resize){
sc.resize(this._containerContentBox);
}
}else{
if(this.tablist.resize){
var s=this.tablist.domNode.style;
s.width="0";
var _51e=_51a.getContentBox(this.domNode).w;
s.width="";
this.tablist.resize({w:_51e});
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
define("curam/util/Refresh",["curam/util/Request","curam/define","curam/util","curam/tab","curam/debug","curam/util/ContextPanel","curam/util/ui/refresh/TabRefreshController","curam/util/ResourceBundle"],function(_51f){
dojo.requireLocalization("curam.application","Debug");
var _520=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.Refresh",{submitted:false,pageSubmitted:"",refreshConfig:[],menuBarCallback:null,navigationCallback:null,refreshedOnTabOpen:{},_controllers:{},_pageRefreshButton:undefined,setMenuBarCallbacks:function(_521,_522){
if(!curam.util.Refresh.menuBarCallback){
curam.util.Refresh.menuBarCallback={updateMenuItemStates:_521,getRefreshParams:_522};
}
},setNavigationCallbacks:function(_523,_524){
if(!curam.util.Refresh.navigationCallback){
curam.util.Refresh.navigationCallback={updateNavItemStates:_523,getRefreshParams:_524};
}
},refreshMenuAndNavigation:function(_525,_526,_527,_528){
curam.debug.log("curam.util.Refresh.refreshMenuAndNavigation: "+"tabWidgetId=%s, refreshMenuBar || refreshNavigation: %s || %s",_525,_526,_527);
if(_528&&curam.util.Refresh.refreshedOnTabOpen[_525]){
curam.debug.log(_520.getProperty("curam.util.Refresh.stop"));
return;
}else{
if(_528&&!curam.util.Refresh.refreshedOnTabOpen[_525]){
curam.debug.log(_520.getProperty("curam.util.Refresh.tab.open"));
curam.util.Refresh.refreshedOnTabOpen[_525]=true;
}else{
curam.debug.log(_520.getProperty("curam.util.Refresh.detect.refresh"));
curam.debug.log(_520.getProperty("curam.util.Refresh.refresh"));
}
}
if(!_526&&!_527){
curam.debug.log(_520.getProperty("curam.util.Refresh.no.refresh"));
curam.util.Refresh.refreshedOnTabOpen[_525]=false;
return;
}
var _529={update:function(_52a,_52b,_52c){
curam.debug.log(_520.getProperty("curam.util.Refresh.dynamic.refresh"),_52b);
var ncb=curam.util.Refresh.navigationCallback;
curam.debug.log("refreshNavigation? ",_527);
if(_527&&_52b.navData&&ncb){
ncb.updateNavItemStates(_52a,_52b);
}
var mcb=curam.util.Refresh.menuBarCallback;
curam.debug.log("refreshMenuBar? ",_526);
if(_526&&_52b.menuData&&mcb){
mcb.updateMenuItemStates(_52a,_52b);
}
},error:function(_52d,_52e){
curam.debug.log("========= "+_520.getProperty("curam.util.Refresh.dynamic.failure")+" ===========");
curam.debug.log(_520.getProperty("curam.util.Refresh.dynamic.error"),_52d);
curam.debug.log(_520.getProperty("curam.util.Refresh.dynamic.args"),_52e);
curam.debug.log("==================================================");
}};
var _52f="servlet/JSONServlet?o3c=TAB_DYNAMIC_STATE_QUERY";
var mcb=curam.util.Refresh.menuBarCallback;
if(_526&&mcb){
var _530=mcb.getRefreshParams(_525);
if(_530){
_52f+="&"+_530;
}
}
var ncb=curam.util.Refresh.navigationCallback;
if(_527&&ncb){
var _531=ncb.getRefreshParams(_525);
if(_531){
_52f+="&"+_531;
}
}
curam.debug.log(_520.getProperty("curam.util.Refresh.dynamic.refresh.req"));
_51f.post({url:_52f,handleAs:"json",preventCache:true,load:dojo.hitch(_529,"update",_525),error:dojo.hitch(_529,"error")});
},addConfig:function(_532){
var _533=false;
dojo.forEach(curam.util.Refresh.refreshConfig,function(_534){
if(_534.tab==_532.tab){
_534.config=_532.config;
_533=true;
}
});
if(!_533){
curam.util.Refresh.refreshConfig.push(_532);
}
},setupRefreshController:function(_535){
curam.debug.log("curam.util.Refresh.setupRefreshController "+_520.getProperty("curam.util.ExpandableLists.load.for"),_535);
var _536=dijit.byId(_535);
var _537=_536.tabDescriptor.tabID;
var _538=dojo.filter(curam.util.Refresh.refreshConfig,function(item){
return item.tab==_537;
});
if(_538.length==1){
var _539=_538[0];
var ctl=new curam.util.ui.refresh.TabRefreshController(_535,_539);
curam.util.Refresh._controllers[_535]=ctl;
ctl.setRefreshHandler(curam.util.Refresh.handleRefreshEvent);
}else{
if(_538.length==0){
curam.debug.log(_520.getProperty("curam.util.Refresh.no.dynamic.refresh"),_535);
var ctl=new curam.util.ui.refresh.TabRefreshController(_535,null);
curam.util.Refresh._controllers[_535]=ctl;
}else{
throw "curam.util.Refresh: multiple dynamic refresh "+"configurations found for tab "+_535;
}
}
curam.tab.executeOnTabClose(function(){
curam.util.Refresh._controllers[_535].destroy();
curam.util.Refresh._controllers[_535]=undefined;
},_535);
},getController:function(_53a){
var ctl=curam.util.Refresh._controllers[_53a];
if(!ctl){
throw "Refresh controller for tab '"+_53a+"' not found!";
}
return ctl;
},handleOnloadNestedInlinePage:function(_53b,_53c){
curam.debug.log("curam.util.Refresh.handleOnloadNestedInlinePage "+_520.getProperty("curam.util.Refresh.iframe",[_53b,_53c]));
var _53d=curam.util.getTopmostWindow();
var _53e=undefined;
var _53f=curam.tab.getSelectedTab();
if(_53f){
_53e=curam.tab.getTabWidgetId(_53f);
}
if(_53e){
curam.debug.log(_520.getProperty("curam.util.Refresh.parent"),_53e);
_53d.curam.util.Refresh.getController(_53e).pageLoaded(_53c.pageID,curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_INLINE);
_53d.dojo.publish("/curam/main-content/page/loaded",[_53c.pageID,_53e]);
return true;
}
return false;
},handleRefreshEvent:function(_540){
var _541=function(_542){
curam.util.ContextPanel.refresh(dijit.byId(_542));
};
var _543=function(_544){
curam.tab.refreshMainContentPanel(dijit.byId(_544));
};
var _545=function(_546,_547,_548){
curam.util.Refresh.refreshMenuAndNavigation(_546,_547,_548);
};
curam.util.Refresh._doRefresh(_540,_541,_543,_545);
},_doRefresh:function(_549,_54a,_54b,_54c){
var _54d=null;
var _54e=false;
var _54f=false;
var _550=false;
var _551=false;
var trc=curam.util.ui.refresh.TabRefreshController.prototype;
dojo.forEach(_549,function(_552){
var _553=_552.lastIndexOf("/");
var _554=_552.slice(0,_553);
if(!_54d){
_54d=_552.slice(_553+1,_552.length);
}
if(_554==trc.EVENT_REFRESH_MENU){
_54e=true;
}
if(_554==trc.EVENT_REFRESH_NAVIGATION){
_54f=true;
}
if(_554==trc.EVENT_REFRESH_CONTEXT){
_550=true;
}
if(_554==trc.EVENT_REFRESH_MAIN){
_551=true;
}
});
if(_550){
_54a(_54d);
}
if(_551){
_54b(_54d);
}
_54c(_54d,_54e,_54f);
},setupRefreshButton:function(_555){
dojo.ready(function(){
var _556=dojo.query("."+_555)[0];
if(!_556){
throw "Refresh button not found: "+_555;
}
curam.util.Refresh._pageRefreshButton=_556;
var href=window.location.href;
if(curam.util.isActionPage(href)){
dojo.addClass(_556,"disabled");
curam.util.Refresh._pageRefreshButton._curamDisable=true;
}else{
dojo.addClass(_556,"enabled");
curam.util.Refresh._pageRefreshButton["_curamDisable"]=undefined;
}
curam.util.getTopmostWindow().curam.util.setupPreferencesLink(href);
});
},refreshPage:function(_557){
dojo.stopEvent(_557);
var href=window.location.href;
var _558=curam.util.Refresh._pageRefreshButton._curamDisable;
if(_558){
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
var _559=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.ContextPanel",{CONTENT_URL_ATTRIB:"data-content-url",setupLoadEventPublisher:function(_55a,_55b,_55c){
curam.util.ContextPanel._doSetup(_55a,_55b,_55c,function(_55d){
return dijit.byId(_55d);
});
},_doSetup:function(_55e,_55f,_560,_561){
var _562=curam.util.getTopmostWindow().dojo.subscribe(_55e,function(){
var tab=_561(_55f);
var _563=curam.util.ContextPanel._getIframe(tab);
curam.debug.log(_559.getProperty("curam.util.ContextPanel.loaded"));
curam.util.getTopmostWindow().dojo.publish("/curam/frame/detailsPanelLoaded",[{loaded:true},_55f]);
_563._finishedLoading=true;
if(_563._scheduledRefresh){
curam.util.ContextPanel.refresh(tab);
_563._scheduledRefresh=false;
}
});
curam.util.onLoad.addSubscriber(_560,curam.util.ContextPanel.addTitle);
curam.tab.unsubscribeOnTabClose(_562,_55f);
curam.tab.executeOnTabClose(function(){
curam.util.onLoad.removeSubscriber(_560,curam.util.ContextPanel.addTitle);
},_55f);
},refresh:function(tab){
var _564=curam.util.ContextPanel._getIframe(tab);
if(_564){
curam.debug.log(_559.getProperty("curam.util.ContextPanel.refresh.prep"));
if(_564._finishedLoading){
curam.debug.log(_559.getProperty("curam.util.ContextPanel.refresh"));
_564._finishedLoading=false;
var doc=_564.contentDocument||_564.contentWindow.document;
doc.location.reload(true);
}else{
curam.debug.log(_559.getProperty("curam.util.ContextPanel.refresh.delay"));
_564._scheduledRefresh=true;
}
}
},_getIframe:function(tab){
var _565=dojo.query("iframe.detailsPanelFrame",tab.domNode);
return _565[0];
},addTitle:function(_566){
var _567=dojo.query("."+_566)[0];
var _568=_567.contentWindow.document.title;
_567.setAttribute("title",CONTEXT_PANEL_TITLE+" - "+_568);
},load:function(tab){
var _569=curam.util.ContextPanel._getIframe(tab);
if(_569){
var _56a=dojo.attr(_569,curam.util.ContextPanel.CONTENT_URL_ATTRIB);
if(_56a&&_56a!="undefined"){
_569[curam.util.ContextPanel.CONTENT_URL_ATTRIB]=undefined;
dojo.attr(_569,"src",_56a);
}
}
}});
var _56b=curam.util.getTopmostWindow();
if(typeof _56b._curamContextPanelTabReadyListenerRegistered!="boolean"){
_56b.dojo.subscribe("/curam/application/tab/ready",null,function(_56c){
curam.util.ContextPanel.load(_56c);
});
_56b._curamContextPanelTabReadyListenerRegistered=true;
}
return curam.util.ContextPanel;
});
},"curam/util":function(){
define("curam/util",["dojo/dom","dijit/registry","dojo/dom-construct","dojo/ready","dojo/_base/window","dojo/dom-style","dojo/_base/array","dojo/dom-class","dojo/topic","dojo/_base/event","dojo/query","dojo/has","dojo/_base/unload","dojo/dom-geometry","dojo/_base/json","dojo/dom-attr","dojo/_base/lang","dojo/on","dijit/_BidiSupport","curam/define","curam/debug","curam/util/RuntimeContext","curam/util/Constants","dojo/_base/sniff","cm/_base/_dom","curam/util/ResourceBundle"],function(dom,_56d,_56e,_56f,_570,_571,_572,_573,_574,_575,_576,has,_577,geom,json,attr,lang,on,bidi){
dojo.requireLocalization("curam.application","Debug");
var _578=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util",{PREVENT_CACHE_FLAG:"o3pc",INFORMATIONAL_MSGS_STORAGE_ID:"__informationals__",ERROR_MESSAGES_CONTAINER:"error-messages-container",ERROR_MESSAGES_LIST:"error-messages",CACHE_BUSTER:0,CACHE_BUSTER_PARAM_NAME:"o3nocache",msgLocaleSelectorActionPage:"$not-locaized$ Usage of the Language Selector is not permitted from an editable page that has previously been submitted.",insertCssText:function(_579,_57a){
var id=_57a?_57a:"_runtime_stylesheet_";
var _57b=dom.byId(id);
var _57c;
if(_57b){
if(_57b.styleSheet){
_579=_57b.styleSheet.cssText+_579;
_57c=_57b;
_57c.setAttribute("id","_nodeToRm");
}else{
_57b.appendChild(document.createTextNode(_579));
return;
}
}
var pa=document.getElementsByTagName("head")[0];
_57b=_56e.create("style",{type:"text/css",id:id});
if(_57b.styleSheet){
_57b.styleSheet.cssText=_579;
}else{
_57b.appendChild(document.createTextNode(_579));
}
pa.appendChild(_57b);
if(_57c){
_57c.parentNode.removeChild(_57c);
}
},fireRefreshTreeEvent:function(){
if(dojo.global.parent&&dojo.global.parent.amIFrame){
var wpl=dojo.global.parent.loader;
}
if(wpl&&wpl.dojo){
wpl.dojo.publish("refreshTree");
}
},firePageSubmittedEvent:function(_57d){
require(["curam/tab"],function(){
var _57e=curam.tab.getSelectedTab();
if(_57e){
var _57f=curam.tab.getTabWidgetId(_57e);
var _580=curam.util.getTopmostWindow();
var ctx=(_57d=="dialog")?curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_DIALOG:curam.util.ui.refresh.RefreshEvent.prototype.SOURCE_CONTEXT_MAIN;
_580.curam.util.Refresh.getController(_57f).pageSubmitted(dojo.global.jsPageID,ctx);
_580.dojo.publish("/curam/main-content/page/submitted",[dojo.global.jsPageID,_57f]);
}else{
curam.debug.log("/curam/main-content/page/submitted: "+_578.getProperty("curam.util.no.open"));
}
});
},fireTabOpenedEvent:function(_581){
curam.util.getTopmostWindow().dojo.publish("curam.tabOpened",[dojo.global.jsPageID,_581]);
},setupSubmitEventPublisher:function(){
_56f(function(){
var form=dom.byId("mainForm");
if(form){
curam.util.connect(form,"onsubmit",function(){
curam.util.firePageSubmittedEvent("main-content");
});
}
});
},getScrollbar:function(){
var _582=_56e.create("div",{},_570.body());
_571.set(_582,{width:"100px",height:"100px",overflow:"scroll",position:"absolute",top:"-300px",left:"0px"});
var test=_56e.create("div",{},_582);
_571.set(test,{width:"400px",height:"400px"});
var _583=_582.offsetWidth-_582.clientWidth;
_56e.destroy(_582);
return {width:_583};
},isModalWindow:function(){
return (dojo.global.curamModal===undefined)?false:true;
},getTopmostWindow:function(){
if(typeof (dojo.global._curamTopmostWindow)=="undefined"){
var _584=dojo.global;
if(typeof (dojo.global.jsScreenContext)!="undefined"&&dojo.global.jsScreenContext.hasContextBits("CONTEXT_PORTLET")){
dojo.global._curamTopmostWindow=_584;
}else{
if(_584.__extAppTopWin){
dojo.global._curamTopmostWindow=_584;
}else{
while(_584.parent!=_584){
_584=_584.parent;
if(_584.__extAppTopWin){
break;
}
}
dojo.global._curamTopmostWindow=_584;
}
}
}
if(dojo.global._curamTopmostWindow.location.href.indexOf("AppController.do")<0&&typeof (dojo.global._curamTopmostWindow.__extAppTopWin)=="undefined"){
curam.debug.log(_578.getProperty("curam.util.wrong.window")+dojo.global._curamTopmostWindow.location.href);
}
return dojo.global._curamTopmostWindow;
},getUrlParamValue:function(url,_585){
var qPos=url.indexOf("?");
if(qPos<0){
return null;
}
var _586=url.substring(qPos+1,url.length);
function _587(_588){
var _589=_586.split(_588);
_585+="=";
for(var i=0;i<_589.length;i++){
if(_589[i].indexOf(_585)==0){
return _589[i].split("=")[1];
}
}
};
return _587("&")||_587("");
},addUrlParam:function(href,_58a,_58b,_58c){
var hasQ=href.indexOf("?")>-1;
var _58d=_58c?_58c:"undefined";
if(!hasQ||(_58d==false)){
return href+(hasQ?"&":"?")+_58a+"="+_58b;
}else{
var _58e=href.split("?");
href=_58e[0]+"?"+_58a+"="+_58b+(_58e[1]!=""?("&"+_58e[1]):"");
return href;
}
},replaceUrlParam:function(href,_58f,_590){
href=curam.util.removeUrlParam(href,_58f);
return curam.util.addUrlParam(href,_58f,_590);
},removeUrlParam:function(url,_591,_592){
var qPos=url.indexOf("?");
if(qPos<0){
return url;
}
if(url.indexOf(_591+"=")<0){
return url;
}
var _593=url.substring(qPos+1,url.length);
var _594=_593.split("&");
var _595;
var _596,_597;
for(var i=0;i<_594.length;i++){
if(_594[i].indexOf(_591+"=")==0){
_597=false;
if(_592){
_596=_594[i].split("=");
if(_596.length>1){
if(_596[1]==_592){
_597=true;
}
}else{
if(_592==""){
_597=true;
}
}
}else{
_597=true;
}
if(_597){
_594.splice(i,1);
i--;
}
}
}
return url.substring(0,qPos+1)+_594.join("&");
},stripHash:function(url){
var idx=url.indexOf("#");
if(idx<0){
return url;
}
return url.substring(0,url);
},isSameUrl:function(_598,_599,rtc){
if(!_599){
_599=rtc.getHref();
}
if(_598.indexOf("#")==0){
return true;
}
var _59a=_598.indexOf("#");
if(_59a>-1){
if(_59a==0){
return true;
}
var _59b=_598.split("#");
var _59c=_599.indexOf("#");
if(_59c>-1){
if(_59c==0){
return true;
}
_599=_599.split("#")[0];
}
return _59b[0]==_599;
}
var _59d=function(url){
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
var here=curam.util.stripHash(rp(_599,curam.util.Constants.RETURN_PAGE_PARAM));
var _59e=curam.util.stripHash(rp(_598,curam.util.Constants.RETURN_PAGE_PARAM));
var _59f=_59e.split("?");
var _5a0=here.split("?");
_5a0[0]=_59d(_5a0[0]);
_59f[0]=_59d(_59f[0]);
var _5a1=(_5a0[0]==_59f[0]||_5a0[0].match(_59f[0]+"$")==_59f[0]);
if(!_5a1){
return false;
}
if(_5a0.length==1&&_59f.length==1&&_5a1){
return true;
}else{
var _5a2;
var _5a3;
if(typeof _5a0[1]!="undefined"&&_5a0[1]!=""){
_5a2=_5a0[1].split("&");
}else{
_5a2=new Array();
}
if(typeof _59f[1]!="undefined"&&_59f[1]!=""){
_5a3=_59f[1].split("&");
}else{
_5a3=new Array();
}
curam.debug.log("curam.util.isSameUrl: paramsHere "+_578.getProperty("curam.util.before")+_5a2.length);
_5a2=_572.filter(_5a2,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_578.getProperty("curam.util.after")+_5a2.length);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_578.getProperty("curam.util.before")+_5a3.length);
_5a3=_572.filter(_5a3,curam.util.isNotCDEJParam);
curam.debug.log("curam.util.isSameUrl: paramsHere "+_578.getProperty("curam.util.after")+_5a3.length);
if(_5a2.length!=_5a3.length){
return false;
}
var _5a4={};
var _5a5;
for(var i=0;i<_5a2.length;i++){
_5a5=_5a2[i].split("=");
_5a4[_5a5[0]]=_5a5[1];
}
for(var i=0;i<_5a3.length;i++){
_5a5=_5a3[i].split("=");
if(_5a4[_5a5[0]]!=_5a5[1]){
curam.debug.log(_578.getProperty("curam.util.no.match",[_5a5[0],_5a5[1],_5a4[_5a5[0]]]));
return false;
}
}
}
return true;
},isNotCDEJParam:function(_5a6){
return !((_5a6.charAt(0)=="o"&&_5a6.charAt(1)=="3")||(_5a6.charAt(0)=="_"&&_5a6.charAt(1)=="_"&&_5a6.charAt(2)=="o"&&_5a6.charAt(3)=="3"));
},setAttributes:function(node,map){
for(var x in map){
node.setAttribute(x,map[x]);
}
},invalidatePage:function(){
curam.PAGE_INVALIDATED=true;
var _5a7=dojo.global.dialogArguments?dojo.global.dialogArguments[0]:opener;
if(_5a7&&_5a7!=dojo.global){
try{
_5a7.curam.util.invalidatePage();
}
catch(e){
curam.debug.log(_578.getProperty("curam.util.error"),e);
}
}
},redirectWindow:function(href,_5a8,_5a9){
var rtc=new curam.util.RuntimeContext(dojo.global);
var _5aa=function(_5ab,_5ac,href,_5ad,_5ae){
curam.util.getFrameRoot(_5ab,_5ac).curam.util.redirectContentPanel(href,_5ad,_5ae);
};
curam.util._doRedirectWindow(href,_5a8,_5a9,dojo.global.jsScreenContext,rtc,curam.util.publishRefreshEvent,_5aa);
},_doRedirectWindow:function(href,_5af,_5b0,_5b1,rtc,_5b2,_5b3){
if(href&&curam.util.isActionPage(href)){
curam.debug.log(_578.getProperty("curam.util.stopping"),href);
return;
}
var rpl=curam.util.replaceUrlParam;
var _5b4=_5b1.hasContextBits("TREE")||_5b1.hasContextBits("AGENDA")||_5b1.hasContextBits("ORG_TREE");
if(curam.util.FORCE_REFRESH){
href=rpl(rtc.getHref(),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
if(curam.util.isModalWindow()||_5b4){
_5b2();
dojo.global.location.href=href;
}else{
if(_5b1.hasContextBits("LIST_ROW_INLINE_PAGE")||_5b1.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(href);
}else{
_5b2();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
require(["curam/tab"],function(){
_5b3(dojo.global,curam.tab.getTabController().ROOT_OBJ,href,true,true);
});
}
}
}
return;
}
var u=curam.util;
var rtc=new curam.util.RuntimeContext(dojo.global);
if(!_5b4&&!_5af&&!curam.PAGE_INVALIDATED&&u.isSameUrl(href,null,rtc)){
return;
}
if(curam.util.isModalWindow()||_5b4){
href=rpl(rpl(href,"o3frame","modal"),curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
var form=_56e.create("form",{action:href,method:"POST"});
if(!_5b4){
if(!dom.byId("o3ctx")){
form.action=curam.util.removeUrlParam(form.action,"o3ctx");
var _5b5=_56e.create("input",{type:"hidden",id:"o3ctx",name:"o3ctx",value:_5b1.getValue()},form);
}
_570.body().appendChild(form);
_5b2();
form.submit();
}
if(!_5b0){
if(_5b4){
curam.util.redirectFrame(href);
}
}
}else{
if(_5b1.hasContextBits("LIST_ROW_INLINE_PAGE")||_5b1.hasContextBits("NESTED_UIM")){
curam.util._handleInlinePageRefresh(href);
}else{
_5b2();
if(dojo.global.location!==curam.util.getTopmostWindow().location){
if(_5b1.hasContextBits("EXTAPP")){
var _5b6=window.top;
_5b6.dijit.byId("curam-app").updateMainContentIframe(href);
}else{
require(["curam/tab"],function(){
curam.util.getFrameRoot(dojo.global,curam.tab.getTabController().ROOT_OBJ).curam.util.redirectContentPanel(href,_5af);
});
}
}
}
}
},_handleInlinePageRefresh:function(href){
curam.debug.log(_578.getProperty("curam.util.closing.modal"),href);
var _5b7=new curam.ui.PageRequest(href);
require(["curam/tab"],function(){
curam.tab.getTabController().checkPage(_5b7,function(_5b8){
curam.util.publishRefreshEvent();
dojo.global.location.reload(true);
});
});
},redirectContentPanel:function(url,_5b9,_5ba){
require(["curam/tab"],function(){
var _5bb=curam.tab.getContentPanelIframe();
var _5bc=url;
if(_5bb!=null){
var rpu=curam.util.Constants.RETURN_PAGE_PARAM;
var _5bd=null;
if(url.indexOf(rpu+"=")>=0){
curam.debug.log("curam.util.redirectContentPanel: "+_578.getProperty("curam.util.rpu"));
_5bd=decodeURIComponent(curam.util.getUrlParamValue(url,rpu));
}
if(_5bd){
_5bd=curam.util.removeUrlParam(_5bd,rpu);
_5bc=curam.util.replaceUrlParam(url,rpu,encodeURIComponent(_5bd));
}
}
var _5be=new curam.ui.PageRequest(_5bc);
if(_5b9){
_5be.forceLoad=true;
}
if(_5ba){
_5be.justRefresh=true;
}
curam.tab.getTabController().handlePageRequest(_5be);
});
},redirectFrame:function(href){
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
var _5bf=curam.util.getFrameRoot(dojo.global,"wizard").targetframe;
_5bf.curam.util.publishRefreshEvent();
_5bf.location.href=href;
}else{
if(dojo.global.jsScreenContext.hasContextBits("ORG_TREE")){
var _5bf=curam.util.getFrameRoot(dojo.global,"orgTreeRoot");
_5bf.curam.util.publishRefreshEvent();
_5bf.dojo.publish("orgTree.refreshContent",[href]);
}else{
var _5c0=curam.util.getFrameRoot(dojo.global,"iegtree");
var _5c1=_5c0.navframe||_5c0.frames[0];
var _5c2=_5c0.contentframe||_5c0.frames["contentframe"];
_5c2.curam.util.publishRefreshEvent();
if(curam.PAGE_INVALIDATED||_5c1.curam.PAGE_INVALIDATED){
var _5c3=curam.util.modifyUrlContext(href,"ACTION");
_5c2.location.href=_5c3;
}else{
_5c2.location.href=href;
}
}
}
return true;
},publishRefreshEvent:function(){
_574.publish("/curam/page/refresh");
},openGenericErrorModalDialog:function(_5c4,_5c5,_5c6,_5c7,_5c8){
var url;
var _5c9;
var sc=new curam.util.ScreenContext("MODAL");
var _5ca="titlePropertyName="+_5c5+"&";
var _5cb="messagePropertyName="+_5c6+"&";
var _5cc="errorModal="+_5c8+"&";
if(_5c7){
_5c9="messagePlaceholder1="+_5c7+"&";
url="generic-modal-error.jspx?"+_5ca+_5cb+_5c9+_5cc+sc.toRequestString();
}else{
url="generic-modal-error.jspx?"+_5ca+_5cb+sc.toRequestString();
}
curam.util.openModalDialog({href:url},_5c4);
},openModalDialog:function(_5cd,_5ce,left,top,_5cf){
var href;
if(!_5cd||!_5cd.href){
_5cd=_575.fix(_5cd);
var _5d0=_5cd.target;
while(_5d0.tagName!="A"&&_5d0!=_570.body()){
_5d0=_5d0.parentNode;
}
href=_5d0.href;
_5d0._isModal=true;
_575.stop(_5cd);
}else{
href=_5cd.href;
_5cd._isModal=true;
}
require(["curam/dialog"]);
var opts=curam.dialog.parseWindowOptions(_5ce);
curam.util.showModalDialog(href,_5cd,opts["width"],opts["height"],left,top,false,null,null,_5cf);
return false;
},showModalDialog:function(url,_5d1,_5d2,_5d3,left,top,_5d4,_5d5,_5d6,_5d7){
var _5d8=curam.util.getTopmostWindow();
if(dojo.global!=_5d8){
curam.debug.log("curam.util.showModalDialog: "+_578.getProperty("curam.util.redirecting.modal"));
_5d8.curam.util.showModalDialog(url,_5d1,_5d2,_5d3,left,top,_5d4,_5d5,dojo.global,_5d7);
return;
}
var rup=curam.util.replaceUrlParam;
url=rup(url,"o3frame","modal");
url=curam.util.modifyUrlContext(url,"MODAL","TAB|LIST_ROW_INLINE_PAGE|LIST_EVEN_ROW|NESTED_UIM");
url=rup(url,curam.util.PREVENT_CACHE_FLAG,(new Date()).getTime());
curam.debug.log(_578.getProperty("curam.util.modal.url"),url);
if(_5d2){
_5d2=typeof (_5d2)=="number"?_5d2:parseInt(_5d2);
}
if(_5d3){
_5d3=typeof (_5d3)=="number"?_5d3:parseInt(_5d3);
}
if(!curam.util._isModalCurrentlyOpening()){
curam.util._setModalCurrentlyOpening(true);
require(["curam/ModalDialog"]);
new curam.ModalDialog({href:url,width:_5d2,height:_5d3,openNode:(_5d1&&_5d1.target)?_5d1.target:null,parentWindow:_5d6,uimToken:_5d7});
}
},_isModalCurrentlyOpening:function(){
return curam.util.getTopmostWindow().curam.util._modalOpenInProgress;
},_setModalCurrentlyOpening:function(_5d9){
curam.util.getTopmostWindow().curam.util._modalOpenInProgress=_5d9;
},setupPreferencesLink:function(href){
_56f(function(){
var _5da=_576(".user-preferences")[0];
if(_5da){
if(typeof (_5da._disconnectToken)=="undefined"){
_5da._disconnectToken=curam.util.connect(_5da,"onclick",curam.util.openPreferences);
}
if(!href){
href=dojo.global.location.href;
}
if(curam.util.isActionPage(href)){
_573.replace(_5da,"disabled","enabled");
_5da._curamDisable=true;
}else{
_573.replace(_5da,"enabled","disabled");
_5da._curamDisable=false;
}
}else{
curam.debug.log(_578.getProperty("curam.util.no.setup"));
}
});
},openPreferences:function(_5db){
_575.stop(_5db);
if(_5db.target._curamDisable){
return;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("user-prefs-editor.jspx",{dialogOptions:"width=450"});
});
},openAbout:function(_5dc){
_575.stop(_5dc);
require(["curam/tab"],function(){
curam.tab.getTabController().handleLinkClick("about.jsp",{dialogOptions:"width=645,height=480"});
});
},addMinWidthCalendarCluster:function(id){
var _5dd=dom.byId(id);
var i=0;
function _5de(evt){
_572.forEach(_5dd.childNodes,function(node){
if(_573.contains(node,"cluster")){
_571.set(node,"width","97%");
if(node.clientWidth<700){
_571.set(node,"width","700px");
}
}
});
};
if(has("ie")>6){
_572.forEach(_5dd.childNodes,function(node){
if(_573.contains(node,"cluster")){
_571.set(node,"minWidth","700px");
}
});
}else{
on(dojo.global,"resize",_5de);
_56f(_5de);
}
},addPopupFieldListener:function(id){
if(!has("ie")||has("ie")>6){
return;
}
if(!curam.util._popupFields){
function _5df(evt){
var _5e0=0;
var j=0;
var x=0;
var arr=curam.util._popupFields;
_572.forEach(curam.util._popupFields,function(id){
var _5e1=dom.byId(id);
_576("> .popup-actions",_5e1).forEach(function(node){
_5e0=node.clientWidth+30;
});
_576("> .desc",_5e1).forEach(function(node){
_571.set(node,"width",Math.max(0,_5e1.clientWidth-_5e0)+"px");
});
});
};
curam.util._popupFields=[id];
on(dojo.global,"resize",_5df);
_56f(_5df);
}else{
curam.util._popupFields.push(id);
}
},addContentWidthListener:function(id){
if(has("ie")>6){
return;
}
var _5e2=_571.set;
var _5e3=_573.contains;
function _5e4(evt){
var i=0;
var _5e5=dom.byId("content");
if(_5e5){
var _5e6=_5e5.clientWidth;
if(has("ie")==6&&dom.byId("footer")){
var _5e7=_570.body().clientHeight-100;
_5e2(_5e5,"height",_5e7+"px");
var _5e8=dom.byId("sidebar");
if(_5e8){
_5e2(_5e8,"height",_5e7+"px");
}
}
try{
_576("> .page-title-bar",_5e5).forEach(function(node){
var _5e9=geom.getMarginSize(node).w-geom.getContentBox(node).w;
if(!has("ie")){
_5e9+=1;
}
_5e6=_5e5.clientWidth-_5e9;
_571.set(node,"width",_5e6+"px");
});
}
catch(e){
}
_576("> .page-description",_5e5).style("width",_5e6+"px");
_576("> .in-page-navigation",_5e5).style("width",_5e6+"px");
}
};
curam.util.subscribe("/clusterToggle",_5e4);
curam.util.connect(dojo.global,"onresize",_5e4);
_56f(_5e4);
},alterScrollableListBottomBorder:function(id,_5ea){
var _5eb=_5ea;
var _5ec="#"+id+" table";
function _5ed(){
var _5ee=_576(_5ec)[0];
if(_5ee.offsetHeight>=_5eb){
var _5ef=_576(".odd-last-row",_5ee)[0];
if(typeof _5ef!="undefined"){
_573.add(_5ef,"no-bottom-border");
}
}else{
if(_5ee.offsetHeight<_5eb){
var _5ef=_576(".even-last-row",_5ee)[0];
if(typeof _5ef!="undefined"){
_573.add(_5ef,"add-bottom-border");
}
}else{
curam.debug.log("curam.util.alterScrollableListBottomBorder: "+_578.getProperty("curam.util.code"));
}
}
};
_56f(_5ed);
},addFileUploadResizeListener:function(code){
function _5f0(evt){
if(_576(".widget")){
_576(".widget").forEach(function(_5f1){
var _5f2=_5f1.clientWidth;
if(_576(".fileUpload",_5f1)){
_576(".fileUpload",_5f1).forEach(function(_5f3){
fileUploadWidth=_5f2/30;
if(fileUploadWidth<4){
_5f3.size=1;
}else{
_5f3.size=fileUploadWidth;
}
});
}
});
}
};
on(dojo.global,"resize",_5f0);
_56f(_5f0);
},openCenteredNonModalWindow:function(url,_5f4,_5f5,name){
_5f4=Number(_5f4);
_5f5=Number(_5f5);
var _5f6=(screen.width-_5f4)/2;
var _5f7=(screen.height-_5f5)/2;
_5f5=_5f7<0?screen.height:_5f5;
_5f7=Math.max(0,_5f7);
_5f4=_5f6<0?screen.width:_5f4;
_5f6=Math.max(0,_5f6);
var left="left",top="top";
if(has("ff")){
left="screenX",top="screenY";
}
var _5f8="location=no, menubar=no, status=no, toolbar=no, "+"scrollbars=yes, resizable=no";
var _5f9=dojo.global.open(url,name||"name","width="+_5f4+", height="+_5f5+", "+left+"="+_5f6+","+top+"="+_5f7+","+_5f8);
_5f9.resizeTo(_5f4,_5f5);
_5f9.moveTo(_5f6,_5f7);
_5f9.focus();
},adjustTargetContext:function(win,href){
if(win&&win.dojo.global.jsScreenContext){
var _5fa=win.dojo.global.jsScreenContext;
_5fa.updateStates(dojo.global.jsScreenContext);
return curam.util.replaceUrlParam(href,"o3ctx",_5fa.getValue());
}
return href;
},modifyUrlContext:function(url,_5fb,_5fc){
var _5fd=url;
var ctx=new curam.util.ScreenContext();
var _5fe=curam.util.getUrlParamValue(url,"o3ctx");
if(_5fe){
ctx.setContext(_5fe);
}else{
ctx.clear();
}
if(_5fb){
ctx.addContextBits(_5fb);
}
if(_5fc){
ctx.clear(_5fc);
}
_5fd=curam.util.replaceUrlParam(url,"o3ctx",ctx.getValue());
return _5fd;
},updateCtx:function(_5ff){
var _600=curam.util.getUrlParamValue(_5ff,"o3ctx");
if(!_600){
return _5ff;
}
return curam.util.modifyUrlContext(_5ff,null,"MODAL");
},getFrameRoot:function(_601,_602){
var _603=false;
var _604=_601;
if(_604){
while(_604!=top&&!_604.rootObject){
_604=_604.parent;
}
if(_604.rootObject){
_603=(_604.rootObject==_602);
}
}
return _603?_604:null;
},saveInformationalMsgs:function(_605){
curam.util.runStorageFn(function(){
try{
var _606=curam.util.getTopmostWindow().dojox;
_606.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,json.toJson({pageID:_570.body().id,total:dom.byId(curam.util.ERROR_MESSAGES_CONTAINER).innerHTML,listItems:dom.byId(curam.util.ERROR_MESSAGES_LIST).innerHTML}));
}
catch(e){
curam.debug.log(_578.getProperty("curam.util.exception"),e);
}
},_605);
},runStorageFn:function(fn,_607){
var _608=function(){
fn();
if(_607){
setTimeout(_607,10);
}
};
var _609=curam.util.getTopmostWindow().dojox;
require(["dojox/storage"],function(){
var mgr=_609.storage.manager;
if(mgr.isInitialized()){
_608();
}else{
if(mgr.addOnLoad){
mgr.addOnLoad(_608);
}else{
var _60a={exp:_608};
on(mgr,"loaded",_60a,"exp");
}
}
});
},disableInformationalLoad:function(){
curam.util._informationalsDisabled=true;
},redirectDirectUrl:function(){
_56f(function(){
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
_56f(function(){
if(dojo.global.jsScreenContext.hasContextBits("CONTEXT_PANEL")){
return;
}
if(curam.util._informationalsDisabled){
return;
}
curam.util.runStorageFn(function(){
var _60b=curam.util.getTopmostWindow().dojox;
var msgs=_60b.storage.get(curam.util.INFORMATIONAL_MSGS_STORAGE_ID);
if(msgs&&msgs!=""){
msgs=json.fromJson(msgs);
_60b.storage.put(curam.util.INFORMATIONAL_MSGS_STORAGE_ID,"");
var div=dom.byId(curam.util.ERROR_MESSAGES_CONTAINER);
var list=dom.byId(curam.util.ERROR_MESSAGES_LIST);
if(msgs.pageID!=_570.body().id){
return;
}
if(list){
var _60c=_56e.create("ul",{innerHTML:msgs.listItems});
var _60d=[];
for(var i=0;i<list.childNodes.length;i++){
if(list.childNodes[i].tagName=="LI"){
_60d.push(list.childNodes[i]);
}
}
var skip=false;
var _60e=_60c.childNodes;
for(var i=0;i<_60e.length;i++){
skip=false;
for(var j=0;j<_60d.length;j++){
if(_60e[i].innerHTML==_60d[j].innerHTML){
skip=true;
break;
}
}
if(!skip){
list.appendChild(_60e[i]);
i--;
}
}
}else{
if(div){
div.innerHTML=msgs.total;
}
}
}
var _60f=dojo.byId("error-messages");
if(_60f&&!dojo.global.jsScreenContext.hasContextBits("MODAL")){
_60f.focus();
}
});
});
},setFocus:function(){
var _610=curam.util.getUrlParamValue(dojo.global.location.href,"o3frame")=="modal";
if(!_610){
_56f(curam.util.doSetFocus);
}
},doSetFocus:function(){
var _611=-1;
var _612=-1;
var form=document.forms[0];
if(!form){
return false;
}
var _613=form.elements;
var l=_613.length;
var elem;
for(var i=0;i<l;i++){
elem=_613[i];
if(_611==-1&&(elem.type=="select-one"||elem.type=="text"||elem.tagName=="TEXTAREA")&&!_573.contains(elem,"dijitArrowButtonInner")&&!_573.contains(elem,"dijitValidationInner")){
_611=i;
}
if(elem.tabIndex=="1"){
elem.tabIndex=0;
_612=i;
break;
}
}
var elem;
if(_612!=-1){
elem=_613[_612];
}else{
if(_611!=-1){
elem=_613[_611];
}
}
try{
var _614=dojo.byId("error-messages");
if(_614){
_614.focus();
}else{
elem.focus();
}
}
catch(e){
curam.debug.log(_578.getProperty("curam.util.error.focus"),e.message);
return false;
}
return true;
},openLocaleSelector:function(_615){
_615=_575.fix(_615);
var _616=_615.target;
while(_616&&_616.tagName!="A"){
_616=_616.parentNode;
}
var loc=_616.href;
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
var _617=curam.util.getLastPathSegmentWithQueryString(url);
var _618=_617.split("?")[0];
return _618.indexOf("Action.do")>-1;
},closeLocaleSelector:function(_619){
_619=_575.fix(_619);
_575.stop(_619);
dojo.global.close();
return false;
},getSuffixFromClass:function(node,_61a){
var _61b=attr.get(node,"class").split(" ");
var _61c=_572.filter(_61b,function(_61d){
return _61d.indexOf(_61a)==0;
});
if(_61c.length>0){
return _61c[0].split(_61a)[1];
}else{
return null;
}
},getCacheBusterParameter:function(){
return this.CACHE_BUSTER_PARAM_NAME+"="+new Date().getTime()+"_"+this.CACHE_BUSTER++;
},stripeTable:function(_61e,_61f,_620){
var _621=_61e.tBodies[0];
var _622=(_61f?2:1);
if(_621.rows.length<_622){
return;
}
var rows=_621.rows;
for(var i=0;i<rows.length;i+=_622){
curam.debug.log("curam.util.stripeTable(%s, %s): i = %s",_61e,_61f,i);
var _623=[rows[i]];
if(_61f&&rows[i+1]){
_623.push(rows[i+1]);
}
_572.forEach(_623,function(row){
_573.remove(row,"odd-last-row");
_573.remove(row,"even-last-row");
});
if(i%(2*_622)==0){
_572.forEach(_623,function(row){
cm.replaceClass(row,"odd","even");
});
if(i==_620){
_572.forEach(_623,function(row){
_573.add(row,"odd-last-row");
});
}
}else{
_572.forEach(_623,function(row){
cm.replaceClass(row,"even","odd");
});
if(i==_620){
_572.forEach(_623,function(row){
_573.add(row,"even-last-row");
});
}
}
}
},fillString:function(_624,_625){
var _626="";
while(_625>0){
_626+=_624;
_625-=1;
}
return _626;
},updateHeader:function(qId,_627,_628,_629){
var _62a=dom.byId("header_"+qId);
_62a.firstChild.nextSibling.innerHTML=_627;
answerCell=dom.byId("chosenAnswer_"+qId);
answerCell.innerHTML=_628;
sourceCell=dom.byId("chosenSource_"+qId);
sourceCell.innerHTML=_629;
},search:function(_62b,_62c){
var _62d=_56d.byId(_62b).get("value");
var _62e=_56d.byId(_62c);
var _62f=_62e?_62e.get("value"):null;
var _630="";
var _631;
var _632;
if(_62f){
_632=_62f.split("|");
_630=_632[0];
_631=_632[1];
}
var _633=curam.util.defaultSearchPageID;
var _634="";
if(_630===""){
_634=_633+"Page.do?searchText="+encodeURIComponent(_62d);
}else{
_634=_631+"Page.do?searchText="+encodeURIComponent(_62d)+"&searchType="+encodeURIComponent(_630);
}
var _635=new curam.ui.PageRequest(_634);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_635);
});
},updateDefaultSearchText:function(_636,_637){
var _638=_56d.byId(_636);
var _639=_56d.byId(_637);
var _63a=_638?_638.get("value"):null;
var str=_63a.split("|")[2];
_639.set("placeHolder",str);
},updateSearchBtnState:function(_63b,_63c){
var _63d=_56d.byId(_63b);
var btn=dom.byId(_63c);
var _63e=_63d.get("value");
if(!_63e||lang.trim(_63e).length<1){
_573.add(btn,"dijitDisabled");
}else{
_573.remove(btn,"dijitDisabled");
}
},furtherOptionsSearch:function(){
var _63f=curam.util.furtherOptionsPageID+"Page.do";
var _640=new curam.ui.PageRequest(_63f);
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_640);
});
},searchButtonStatus:function(_641){
var btn=dojo.byId(_641);
if(!dojo.hasClass(btn,"dijitDisabled")){
return true;
}
},getPageHeight:function(){
var _642=400;
var _643=0;
if(_576("frameset").length>0){
curam.debug.log("curam.util.getPageHeight() "+_578.getProperty("curam.util.default.height"),_642);
_643=_642;
}else{
var _644=function(node){
if(!node){
curam.debug.log(_578.getProperty("curam.util.node"));
return 0;
}
var mb=geom.getMarginSize(node);
var pos=geom.position(node);
return pos.y+mb.h;
};
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")){
var _645=_576("div.bottom")[0];
var _646=_644(_645);
curam.debug.log(_578.getProperty("curam.util.page.height"),_646);
curam.debug.log(_578.getProperty("curam.util.ie7.issue"));
_643=_646+1;
}else{
var _647=dom.byId("content")||dom.byId("wizard-content");
var _648=_576("> *",_647).filter(function(n){
return n.tagName.indexOf("SCRIPT")<0&&_571.get(n,"visibility")!="hidden"&&_571.get(n,"display")!="none";
});
var _649=_648[0];
for(var i=1;i<_648.length;i++){
if(_644(_648[i])>=_644(_649)){
_649=_648[i];
}
}
_643=_644(_649);
curam.debug.log("curam.util.getPageHeight() "+_578.getProperty("curam.util.base.height"),_643);
var _64a=_576(".actions-panel",_570.body());
if(_64a.length>0){
var _64b=geom.getMarginBox(_64a[0]).h;
curam.debug.log("curam.util.getPageHeight() "+_578.getProperty("curam.util.panel.height"));
_643+=_64b;
_643+=10;
}
var _64c=_576("body.details");
if(_64c.length>0){
curam.debug.log("curam.util.getPageHeight() "+_578.getProperty("curam.util.bar.height"));
_643+=20;
}
}
}
curam.debug.log("curam.util.getPageHeight() "+_578.getProperty("curam.util.returning"),_643);
return _643;
},toCommaSeparatedList:function(_64d){
var _64e="";
for(var i=0;i<_64d.length;i++){
_64e+=_64d[i];
if(i<_64d.length-1){
_64e+=",";
}
}
return _64e;
},skipLinkFocus:function(){
var dest=dojo.byId("skip-dest");
if(dest){
dest.focus();
}
},showHideSkipLink:function(e){
var _64f=dojo.byId("skipLink");
if(_64f){
var _650=_64f.parentNode;
if(e.type=="focus"&&_573.contains(_650,"hidden")){
_573.remove(_650,"hidden");
}else{
if(e.type=="blur"&&!_573.contains(_650,"hidden")){
_573.add(_650,"hidden");
}
}
}
},setupGenericKeyHandler:function(){
_56f(function(){
var f=function(_651){
if(dojo.global.jsScreenContext.hasContextBits("MODAL")&&_651.keyCode==27){
var ev=_575.fix(_651);
var _652=_56d.byId(ev.target.id);
var _653=typeof _652!="undefined"&&_652.baseClass=="dijitTextBox dijitComboBox";
if(!_653){
curam.dialog.closeModalDialog();
}
}
if(_651.keyCode==13){
var ev=_575.fix(_651);
var _654=ev.target.type=="text";
var _655=ev.target.type=="radio";
var _656=ev.target.type=="checkbox";
var _657=ev.target.type=="select-multiple";
var _658=ev.target.type=="password";
var _659=_56d.byId(ev.target.id);
if(typeof _659!="undefined"){
var _65a=_56d.byNode(dojo.byId("widget_"+ev.target.id));
if(_65a&&_65a.enterKeyOnOpenDropDown){
_65a.enterKeyOnOpenDropDown=false;
return false;
}
}
var _65b=typeof _659!="undefined"&&_659.baseClass=="dijitComboBox";
if((!_654&&!_655&&!_656&&!_657&&!_658)||_65b){
return true;
}
var _65c=null;
var _65d=_576(".curam-default-action");
if(_65d.length>0){
_65c=_65d[0];
}else{
var _65e=_576("input[type='submit']");
if(_65e.length>0){
_65c=_65e[0];
}
}
if(_65c!=null){
_575.stop(_575.fix(_651));
curam.util.clickButton(_65c);
return false;
}
dojo.require("curam.dateSelectorUtil");
var _65f=dojo.byId("year");
if(_65f){
dojo.stopEvent(dojo.fixEvent(_651));
curam.dateSelectorUtil.updateCalendar();
}
}
return true;
};
curam.util.connect(_570.body(),"onkeyup",f);
});
},enterKeyPress:function(_660){
if(_660.keyCode==13){
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
var _661=elem.parentElement.parentElement.id;
var _662=dojo.byId("end-"+_661);
if(_662){
_662.focus();
}
}
}
},focusHelpIconOnTab:function(e){
if(!e.shiftKey&&e.keyCode==9){
var _663=dojo.query(".dijitDialogHelpIcon")[0];
if(_663){
setTimeout(function(){
_663.focus();
},5);
}
}
},swapState:function(node,_664,_665,_666){
if(_664){
_573.replace(node,_665,_666);
}else{
_573.replace(node,_666,_665);
}
},makeQueryString:function(_667){
if(!_667||_667.length==0){
return "";
}
var _668=[];
for(var _669 in _667){
_668.push(_669+"="+encodeURIComponent(_667[_669]));
}
return "?"+_668.join("&");
},clickHandlerForListActionMenu:function(url,_66a,_66b,_66c){
if(_66a){
var href=curam.util.replaceUrlParam(url,"o3frame","modal");
var ctx=dojo.global.jsScreenContext;
ctx.addContextBits("MODAL");
href=curam.util.replaceUrlParam(href,"o3ctx",ctx.getValue());
curam.util.redirectWindow(href);
return;
}
var _66d={href:url};
require(["curam/ui/UIMPageAdaptor"]);
if(curam.ui.UIMPageAdaptor.allowLinkToContinue(_66d)){
dojo.global.location=url;
return;
}
if(_66d!=null){
if(_66c){
_575.fix(_66c);
_575.stop(_66c);
}
if(!_66d.href||_66d.href.length==0){
return;
}
if(_66b&&!curam.util.isInternal(url)){
dojo.global.open(url);
}else{
if(curam.ui.UIMPageAdaptor.isLinkValidForTabProcessing(_66d)){
var _66e=new curam.ui.PageRequest(_66d.href);
if(dojo.global.jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")||dojo.global.jsScreenContext.hasContextBits("NESTED_UIM")){
_66e.pageHolder=dojo.global;
}
require(["curam/tab"],function(){
curam.tab.getTabController().handlePageRequest(_66e);
});
}
}
}
},clickHandlerForMailtoLinks:function(_66f,url){
dojo.stopEvent(_66f);
var _670=dojo.query("#mailto_frame")[0];
if(!_670){
_670=dojo.io.iframe.create("mailto_frame","");
}
_670.src=url;
return false;
},isInternal:function(url){
var path=url.split("?")[0];
var _671=path.match("Page.do");
if(_671!=null){
return true;
}
return false;
},getLastPathSegmentWithQueryString:function(url){
var _672=url.split("?");
var _673=_672[0].split("/");
return _673[_673.length-1]+(_672[1]?"?"+_672[1]:"");
},replaceSubmitButton:function(name,_674){
if(curam.replacedButtons[name]=="true"){
return;
}
var _675="__o3btn."+name;
var _676;
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_676=_576("input[id='"+_675+"']");
}else{
_676=_576("input[name='"+_675+"']");
}
_676.forEach(function(_677,_678,_679){
if(_674){
var _67a=_679[1];
_67a.setAttribute("value",_674);
}
_677.tabIndex=-1;
var _67b=_677.parentNode;
var _67c="btn-id-"+_678;
curam.util.setupWidgetLoadMask("a."+_67c);
var _67d="ac initially-hidden-widget "+_67c;
if(_573.contains(_677,"first-action-control")){
_67d+=" first-action-control";
}
var _67e=_56e.create("a",{"class":_67d,href:"#"},_677,"before");
var _67f=dojo.query(".page-level-menu")[0];
if(_67f){
dojo.attr(_67e,"title",_677.value);
}
_56e.create("span",{"class":"filler"},_67e,"before");
var left=_56e.create("span",{"class":"left-corner"},_67e);
var _680=_56e.create("span",{"class":"right-corner"},left);
var _681=_56e.create("span",{"class":"middle"},_680);
_681.appendChild(document.createTextNode(_677.value));
curam.util.addActionControlClass(_67e);
on(_67e,"click",function(_682){
curam.util.clickButton(this._submitButton);
_575.stop(_682);
});
_67e._submitButton=_679[0];
_573.add(_677,"hidden-button");
});
curam.replacedButtons[name]="true";
},setupWidgetLoadMask:function(_683){
curam.util.subscribe("/curam/page/loaded",function(){
var _684=_576(_683)[0];
if(_684){
_571.set(_684,"visibility","visible");
}else{
curam.debug.log("setupButtonLoadMask: "+_578.getProperty("curam.util.not.found")+"'"+_683+"'"+_578.getProperty("curam.util.ignore.mask"));
}
});
},optReplaceSubmitButton:function(name){
if(curam.util.getFrameRoot(dojo.global,"wizard")==null){
curam.util.replaceSubmitButton(name);
return;
}
var _685=curam.util.getFrameRoot(dojo.global,"wizard").navframe.wizardNavigator;
if(_685.delegatesSubmit[jsPageID]!="assumed"){
curam.util.replaceSubmitButton(name);
}
},clickButton:function(_686){
var _687=dom.byId("mainForm");
var _688;
if(!_686){
curam.debug.log("curam.util.clickButton: "+_578.getProperty("curam.util..no.arg"));
return;
}
if(typeof (_686)=="string"){
var _689=_686;
curam.debug.log("curam.util.clickButton: "+_578.getProperty("curam.util.searching")+_578.getProperty("curam.util.id.of")+"'"+_689+"'.");
_686=_576("input[id='"+_689+"']")[0];
if(!_686.form&&!_686.id){
curam.debug.log("curam.util.clickButton: "+_578.getProperty("curam.util.searched")+_578.getProperty("curam.util.id.of")+"'"+_689+_578.getProperty("curam.util.exiting"));
return;
}
}
if(dojo.global.jsScreenContext.hasContextBits("AGENDA")){
_688=_686;
}else{
_688=_576("input[name='"+_686.id+"']",_687)[0];
}
try{
if(attr.get(_687,"action").indexOf(jsPageID)==0){
curam.util.publishRefreshEvent();
}
_688.click();
}
catch(e){
curam.debug.log(_578.getProperty("curam.util.exception.clicking"));
}
},printPage:function(_68a){
_575.stop(_68a);
var _68b=dojo.window.get(_68a.currentTarget.ownerDocument);
var _68c=_68b.frameElement;
var _68d=_68c;
while(_68d&&!dojo.hasClass(_68d,"tab-content-holder")){
_68d=_68d.parentNode;
}
var _68e=_68d;
var _68f=dojo.query(".detailsPanelFrame",_68e)[0];
if(_68f!=undefined&&_68f!=null){
_68f.contentWindow.focus();
_68f.contentWindow.print();
}
_68b.focus();
_68b.print();
return false;
},addSelectedClass:function(_690){
_573.add(_690.target,"selected");
},removeSelectedClass:function(_691){
_573.remove(_691.target,"selected");
},openHelpPage:function(_692,_693){
_575.stop(_692);
dojo.global.open(_693);
},connect:function(_694,_695,_696){
var h=function(_697){
_696(_575.fix(_697));
};
if(has("ie")&&has("ie")<9){
_694.attachEvent(_695,h);
_577.addOnWindowUnload(function(){
_694.detachEvent(_695,h);
});
return {object:_694,eventName:_695,handler:h};
}else{
var _698=_695;
if(_695.indexOf("on")==0){
_698=_695.slice(2);
}
var dt=on(_694,_698,h);
_577.addOnWindowUnload(function(){
dt.remove();
});
return dt;
}
},disconnect:function(_699){
if(has("ie")&&has("ie")<9){
_699.object.detachEvent(_699.eventName,_699.handler);
}else{
_699.remove();
}
},subscribe:function(_69a,_69b){
var st=_574.subscribe(_69a,_69b);
_577.addOnWindowUnload(function(){
st.remove();
});
return st;
},unsubscribe:function(_69c){
_69c.remove();
},addActionControlClickListener:function(_69d){
var _69e=dom.byId(_69d);
var _69f=_576(".ac",_69e);
if(_69f.length>0){
for(var i=0;i<_69f.length;i++){
var _6a0=_69f[i];
curam.util.addActionControlClass(_6a0);
}
}
},addActionControlClass:function(_6a1){
curam.util.connect(_6a1,"onmousedown",function(){
_573.add(_6a1,"selected-button");
curam.util.connect(_6a1,"onmouseout",function(){
_573.remove(_6a1,"selected-button");
});
});
},getClusterActionSet:function(){
var _6a2=dom.byId("content");
var _6a3=_576(".blue-action-set",_6a2);
if(_6a3.length>0){
for(var i=0;i<_6a3.length;i++){
curam.util.addActionControlClickListener(_6a3[i]);
}
}
},adjustActionButtonWidth:function(){
if(has("ie")==8){
_56f(function(){
if(dojo.global.jsScreenContext.hasContextBits("MODAL")){
_576(".action-set > a").forEach(function(node){
if(node.childNodes[0].offsetWidth>node.offsetWidth){
_571.set(node,"width",node.childNodes[0].offsetWidth+"px");
_571.set(node,"display","block");
_571.set(node,"display","inline-block");
}
});
}
});
}
},setRpu:function(url,rtc,_6a4){
if(!url||!rtc||!rtc.getHref()){
throw {name:"Unexpected values",message:"This value not allowed for url or rtc"};
}
var _6a5=curam.util.getLastPathSegmentWithQueryString(rtc.getHref());
_6a5=curam.util.removeUrlParam(_6a5,curam.util.Constants.RETURN_PAGE_PARAM);
if(_6a4){
var i;
for(i=0;i<_6a4.length;i++){
if(!_6a4[i].key||!_6a4[i].value){
throw {name:"undefined value error",message:"The object did not contain a valid key/value pair"};
}
_6a5=curam.util.replaceUrlParam(_6a5,_6a4[i].key,_6a4[i].value);
}
}
var _6a6=curam.util.replaceUrlParam(url,curam.util.Constants.RETURN_PAGE_PARAM,encodeURIComponent(_6a5));
curam.debug.log("curam.util.setRpu "+_578.getProperty("curam.util.added.rpu")+_6a6);
return _6a6;
},retrieveBaseURL:function(){
return dojo.global.location.href.match(".*://[^/]*/[^/]*");
},removeRoleRegion:function(){
var body=dojo.query("body")[0];
dojo.removeAttr(body,"role");
},iframeTitleFallBack:function(){
var _6a7=curam.tab.getContainerTab(curam.tab.getContentPanelIframe());
var _6a8=dojo.byId(curam.tab.getContentPanelIframe());
var _6a9=_6a8.contentWindow.document.title;
var _6aa=dojo.query("div.nowrapTabStrip.dijitTabContainerTop-tabs > div.dijitTabChecked.dijitChecked")[0];
var _6ab=dojo.query("span.tabLabel",_6aa)[0];
var _6ac=dojo.query("div.nowrapTabStrip.dijitTabNoLayout > div.dijitTabChecked.dijitChecked",_6a7.domNode)[0];
var _6ad=dojo.query("span.tabLabel",_6ac)[0];
if(_6a9&&_6a9!=null){
return _6a9;
}else{
if(_6ac){
return _6ad.innerHTML;
}else{
return _6ab.innerHTML;
}
}
},addClassToLastNodeInContentArea:function(){
var _6ae=_576("> div","content");
var _6af=_6ae.length;
if(_6af==0){
return "No need to add";
}
var _6b0=_6ae[--_6af];
while(_573.contains(_6b0,"hidden-action-set")&&_6b0){
_6b0=_6ae[--_6af];
}
_573.add(_6b0,"last-node");
},highContrastModeType:function(){
var _6b1=dojo.query("body.high-contrast")[0];
return _6b1;
},processBidiContextual:function(_6b2){
_6b2.dir=bidi.prototype._checkContextual(_6b2.value);
},getCookie:function(name){
var dc=document.cookie;
var _6b3=name+"=";
var _6b4=dc.indexOf("; "+_6b3);
if(_6b4==-1){
_6b4=dc.indexOf(_6b3);
if(_6b4!=0){
return null;
}
}else{
_6b4+=2;
}
var end=document.cookie.indexOf(";",_6b4);
if(end==-1){
end=dc.length;
}
return unescape(dc.substring(_6b4+_6b3.length,end));
}});
return curam.util;
});
},"dojo/store/Memory":function(){
define("dojo/store/Memory",["../_base/declare","./util/QueryResults","./util/SimpleQueryEngine"],function(_6b5,_6b6,_6b7){
return _6b5("dojo.store.Memory",null,{constructor:function(_6b8){
for(var i in _6b8){
this[i]=_6b8[i];
}
this.setData(this.data||[]);
},data:null,idProperty:"id",index:null,queryEngine:_6b7,get:function(id){
return this.data[this.index[id]];
},getIdentity:function(_6b9){
return _6b9[this.idProperty];
},put:function(_6ba,_6bb){
var data=this.data,_6bc=this.index,_6bd=this.idProperty;
var id=(_6bb&&"id" in _6bb)?_6bb.id:_6bd in _6ba?_6ba[_6bd]:Math.random();
if(id in _6bc){
if(_6bb&&_6bb.overwrite===false){
throw new Error("Object already exists");
}
data[_6bc[id]]=_6ba;
}else{
_6bc[id]=data.push(_6ba)-1;
}
return id;
},add:function(_6be,_6bf){
(_6bf=_6bf||{}).overwrite=false;
return this.put(_6be,_6bf);
},remove:function(id){
var _6c0=this.index;
var data=this.data;
if(id in _6c0){
data.splice(_6c0[id],1);
this.setData(data);
return true;
}
},query:function(_6c1,_6c2){
return _6b6(this.queryEngine(_6c1,_6c2)(this.data));
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
define("idx/oneui/form/_FocusManager",["dijit/focus","dojo/_base/window","dojo/window","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/declare","dojo/_base/lang","dijit/registry"],function(_6c3,win,_6c4,dom,_6c5,_6c6,_6c7,lang,_6c8){
_6c3._onTouchNode=function(node,by){
var _6c9=node;
if(this._clearActiveWidgetsTimer){
clearTimeout(this._clearActiveWidgetsTimer);
delete this._clearActiveWidgetsTimer;
}
var _6ca=[];
try{
while(node){
var _6cb=_6c5.get(node,"dijitPopupParent");
if(_6cb){
node=_6c8.byId(_6cb).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===win.body()){
break;
}
node=_6c4.get(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId"),_6cc=id&&_6c8.byId(id);
if(_6cc&&!(by=="mouse"&&_6cc.get("disabled"))){
if(!_6cc._isValidFocusNode||_6cc._isValidFocusNode(_6c9)){
_6ca.unshift(id);
}
}
node=node.parentNode;
}
}
}
}
catch(e){
}
this._setStack(_6ca,by);
};
return _6c3;
});
},"url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n","dijit/_base/sniff":function(){
define("dijit/_base/sniff",["dojo/uacss"],function(){
});
},"dijit/layout/StackContainer":function(){
define("dijit/layout/StackContainer",["dojo/_base/array","dojo/cookie","dojo/_base/declare","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/ready","dojo/topic","../registry","../_WidgetBase","./_LayoutWidget","dojo/i18n!../nls/common"],function(_6cd,_6ce,_6cf,_6d0,_6d1,lang,_6d2,_6d3,_6d4,_6d5,_6d6){
if(!_6d1.isAsync){
_6d2(0,function(){
var _6d7=["dijit/layout/StackController"];
require(_6d7);
});
}
lang.extend(_6d5,{selected:false,closable:false,iconClass:"dijitNoIcon",showTitle:true});
return _6cf("dijit.layout.StackContainer",_6d6,{doLayout:true,persist:false,baseClass:"dijitStackContainer",buildRendering:function(){
this.inherited(arguments);
_6d0.add(this.domNode,"dijitLayoutContainer");
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onkeypress",this._onKeyPress);
},startup:function(){
if(this._started){
return;
}
var _6d8=this.getChildren();
_6cd.forEach(_6d8,this._setupChild,this);
if(this.persist){
this.selectedChildWidget=_6d4.byId(_6ce(this.id+"_selectedChild"));
}else{
_6cd.some(_6d8,function(_6d9){
if(_6d9.selected){
this.selectedChildWidget=_6d9;
}
return _6d9.selected;
},this);
}
var _6da=this.selectedChildWidget;
if(!_6da&&_6d8[0]){
_6da=this.selectedChildWidget=_6d8[0];
_6da.selected=true;
}
_6d3.publish(this.id+"-startup",{children:_6d8,selected:_6da});
this.inherited(arguments);
},resize:function(){
if(!this._hasBeenShown){
this._hasBeenShown=true;
var _6db=this.selectedChildWidget;
if(_6db){
this._showChild(_6db);
}
}
this.inherited(arguments);
},_setupChild:function(_6dc){
this.inherited(arguments);
_6d0.replace(_6dc.domNode,"dijitHidden","dijitVisible");
_6dc.domNode.title="";
},addChild:function(_6dd,_6de){
this.inherited(arguments);
if(this._started){
_6d3.publish(this.id+"-addChild",_6dd,_6de);
this.layout();
if(!this.selectedChildWidget){
this.selectChild(_6dd);
}
}
},removeChild:function(page){
this.inherited(arguments);
if(this._started){
_6d3.publish(this.id+"-removeChild",page);
}
if(this._descendantsBeingDestroyed){
return;
}
if(this.selectedChildWidget===page){
this.selectedChildWidget=undefined;
if(this._started){
var _6df=this.getChildren();
if(_6df.length){
this.selectChild(_6df[0]);
}
}
}
if(this._started){
this.layout();
}
},selectChild:function(page,_6e0){
page=_6d4.byId(page);
if(this.selectedChildWidget!=page){
var d=this._transition(page,this.selectedChildWidget,_6e0);
if(d){
this._set("selectedChildWidget",page);
_6d3.publish(this.id+"-selectChild",page);
if(this.persist){
_6ce(this.id+"_selectedChild",this.selectedChildWidget.id);
}
}
}
return d;
},_transition:function(_6e1,_6e2){
if(_6e2){
this._hideChild(_6e2);
}
var d=this._showChild(_6e1);
if(d&&_6e1.resize){
if(this.doLayout){
_6e1.resize(this._containerContentBox||this._contentBox);
}else{
_6e1.resize();
}
}
return d;
},_adjacent:function(_6e3){
var _6e4=this.getChildren();
var _6e5=_6cd.indexOf(_6e4,this.selectedChildWidget);
_6e5+=_6e3?1:_6e4.length-1;
return _6e4[_6e5%_6e4.length];
},forward:function(){
return this.selectChild(this._adjacent(true),true);
},back:function(){
return this.selectChild(this._adjacent(false),true);
},_onKeyPress:function(e){
_6d3.publish(this.id+"-containerKeyPress",{e:e,page:this});
},layout:function(){
var _6e6=this.selectedChildWidget;
if(_6e6&&_6e6.resize){
if(this.doLayout){
_6e6.resize(this._containerContentBox||this._contentBox);
}else{
_6e6.resize();
}
}
},_showChild:function(page){
if(page){
var _6e7=this.getChildren();
page.isFirstChild=(page==_6e7[0]);
page.isLastChild=(page==_6e7[_6e7.length-1]);
page._set("selected",true);
_6d0.replace(page.domNode,"dijitVisible","dijitHidden");
return (page._onShow&&page._onShow())||true;
}
},_hideChild:function(page){
page._set("selected",false);
_6d0.replace(page.domNode,"dijitHidden","dijitVisible");
page.onHide&&page.onHide();
},closeChild:function(page){
var _6e8=page.onClose(this,page);
if(_6e8){
this.removeChild(page);
page.destroyRecursive();
}
},destroyDescendants:function(_6e9){
this._descendantsBeingDestroyed=true;
this.selectedChildWidget=undefined;
_6cd.forEach(this.getChildren(),function(_6ea){
if(!_6e9){
this.removeChild(_6ea);
}
_6ea.destroyRecursive(_6e9);
},this);
this._descendantsBeingDestroyed=false;
}});
});
},"dojo/regexp":function(){
define("dojo/regexp",["./_base/kernel","./_base/lang"],function(dojo,lang){
lang.getObject("regexp",true,dojo);
dojo.regexp.escapeString=function(str,_6eb){
return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_6eb&&_6eb.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
dojo.regexp.buildGroupRE=function(arr,re,_6ec){
if(!(arr instanceof Array)){
return re(arr);
}
var b=[];
for(var i=0;i<arr.length;i++){
b.push(re(arr[i]));
}
return dojo.regexp.group(b.join("|"),_6ec);
};
dojo.regexp.group=function(_6ed,_6ee){
return "("+(_6ee?"?:":"")+_6ed+")";
};
return dojo.regexp;
});
},"curam/debug":function(){
define("curam/debug",["curam/define","curam/util/LocalConfig"],function(_6ef,_6f0){
_6ef.singleton("curam.debug",{log:function(){
if(curam.debug.enabled()){
try{
var a=arguments;
if(!dojo.isIE){
console.log.apply(console,a);
}else{
var _6f1=a.length;
var sa=curam.debug._serializeArgument;
switch(_6f1){
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
console.log("[Incomplete message - "+(_6f1-5)+" message a truncated] "+a[0],sa(a[1]),sa(a[2]),sa(a[3]),sa(a[4]),sa(a[5]));
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
var _6f2=typeof arg!="undefined"&&typeof arg.closed!="undefined"&&arg.closed;
if(_6f2){
return true;
}else{
return typeof arg!="undefined"&&typeof arg.location!="undefined"&&typeof arg.navigator!="undefined"&&typeof arg.document!="undefined"&&typeof arg.closed!="undefined";
}
},enabled:function(){
return _6f0.readOption("jsTraceLog","false")=="true";
},_setup:function(_6f3){
_6f0.seedOption("jsTraceLog",_6f3.trace,"false");
_6f0.seedOption("ajaxDebugMode",_6f3.ajaxDebug,"false");
_6f0.seedOption("asyncProgressMonitor",_6f3.asyncProgressMonitor,"false");
}});
return curam.debug;
});
},"dijit/DropDownMenu":function(){
require({cache:{"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n"}});
define("dijit/DropDownMenu",["dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/text!./templates/Menu.html","./_OnDijitClickMixin","./_MenuBase"],function(_6f4,_6f5,keys,_6f6,_6f7,_6f8){
return _6f4("dijit.DropDownMenu",[_6f8,_6f7],{templateString:_6f6,baseClass:"dijitMenu",postCreate:function(){
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
_6f5.stop(evt);
break;
case this._closeSubMenuKey:
if(this.parentMenu){
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
}else{
_6f5.stop(evt);
}
break;
}
}});
});
},"dijit/Menu":function(){
define("dijit/Menu",["require","dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window","dojo/window","./popup","./DropDownMenu","dojo/ready"],function(_6f9,_6fa,_6fb,_6fc,dom,_6fd,_6fe,_6ff,_700,keys,lang,on,has,win,_701,pm,_702,_703){
if(!_700.isAsync){
_703(0,function(){
var _704=["dijit/MenuItem","dijit/PopupMenuItem","dijit/CheckedMenuItem","dijit/MenuSeparator"];
_6f9(_704);
});
}
return _6fb("dijit.Menu",_702,{constructor:function(){
this._bindings=[];
},targetNodeIds:[],contextMenuForWindow:false,leftClickToOpen:false,refocus:true,postCreate:function(){
if(this.contextMenuForWindow){
this.bindDomNode(win.body());
}else{
_6fa.forEach(this.targetNodeIds,this.bindDomNode,this);
}
this.inherited(arguments);
},_iframeContentWindow:function(_705){
return _701.get(this._iframeContentDocument(_705))||this._iframeContentDocument(_705)["__parent__"]||(_705.name&&win.doc.frames[_705.name])||null;
},_iframeContentDocument:function(_706){
return _706.contentDocument||(_706.contentWindow&&_706.contentWindow.document)||(_706.name&&win.doc.frames[_706.name]&&win.doc.frames[_706.name].document)||null;
},bindDomNode:function(node){
node=dom.byId(node);
var cn;
if(node.tagName.toLowerCase()=="iframe"){
var _707=node,_708=this._iframeContentWindow(_707);
cn=win.withGlobal(_708,win.body);
}else{
cn=(node==win.body()?win.doc.documentElement:node);
}
var _709={node:node,iframe:_707};
_6fd.set(node,"_dijitMenu"+this.id,this._bindings.push(_709));
var _70a=lang.hitch(this,function(cn){
return [on(cn,this.leftClickToOpen?"click":"contextmenu",lang.hitch(this,function(evt){
_6fc.stop(evt);
this._scheduleOpen(evt.target,_707,{x:evt.pageX,y:evt.pageY});
})),on(cn,"keydown",lang.hitch(this,function(evt){
if(evt.shiftKey&&evt.keyCode==keys.F10){
_6fc.stop(evt);
this._scheduleOpen(evt.target,_707);
}
}))];
});
_709.connects=cn?_70a(cn):[];
if(_707){
_709.onloadHandler=lang.hitch(this,function(){
var _70b=this._iframeContentWindow(_707);
cn=win.withGlobal(_70b,win.body);
_709.connects=_70a(cn);
});
if(_707.addEventListener){
_707.addEventListener("load",_709.onloadHandler,false);
}else{
_707.attachEvent("onload",_709.onloadHandler);
}
}
},unBindDomNode:function(_70c){
var node;
try{
node=dom.byId(_70c);
}
catch(e){
return;
}
var _70d="_dijitMenu"+this.id;
if(node&&_6fd.has(node,_70d)){
var bid=_6fd.get(node,_70d)-1,b=this._bindings[bid],h;
while(h=b.connects.pop()){
h.remove();
}
var _70e=b.iframe;
if(_70e){
if(_70e.removeEventListener){
_70e.removeEventListener("load",b.onloadHandler,false);
}else{
_70e.detachEvent("onload",b.onloadHandler);
}
}
_6fd.remove(node,_70d);
delete this._bindings[bid];
}
},_scheduleOpen:function(_70f,_710,_711){
if(!this._openTimer){
this._openTimer=setTimeout(lang.hitch(this,function(){
delete this._openTimer;
this._openMyself({target:_70f,iframe:_710,coords:_711});
}),1);
}
},_openMyself:function(args){
var _712=args.target,_713=args.iframe,_714=args.coords;
if(_714){
if(_713){
var ifc=_6fe.position(_713,true),_715=this._iframeContentWindow(_713),_716=win.withGlobal(_715,"_docScroll",dojo);
var cs=_6ff.getComputedStyle(_713),tp=_6ff.toPixelValue,left=(has("ie")&&has("quirks")?0:tp(_713,cs.paddingLeft))+(has("ie")&&has("quirks")?tp(_713,cs.borderLeftWidth):0),top=(has("ie")&&has("quirks")?0:tp(_713,cs.paddingTop))+(has("ie")&&has("quirks")?tp(_713,cs.borderTopWidth):0);
_714.x+=ifc.x+left-_716.x;
_714.y+=ifc.y+top-_716.y;
}
}else{
_714=_6fe.position(_712,true);
_714.x+=10;
_714.y+=10;
}
var self=this;
var _717=this._focusManager.get("prevNode");
var _718=this._focusManager.get("curNode");
var _719=!_718||(dom.isDescendant(_718,this.domNode))?_717:_718;
function _71a(){
if(self.refocus&&_719){
_719.focus();
}
pm.close(self);
};
pm.open({popup:this,x:_714.x,y:_714.y,onExecute:_71a,onCancel:_71a,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){
this.inherited("_onBlur",arguments);
pm.close(this);
};
},uninitialize:function(){
_6fa.forEach(this._bindings,function(b){
if(b){
this.unBindDomNode(b.node);
}
},this);
this.inherited(arguments);
}});
});
},"curam/util/RuntimeContext":function(){
define("curam/util/RuntimeContext",[],function(){
var _71b=dojo.declare("curam.util.RuntimeContext",null,{_window:null,constructor:function(_71c){
this._window=_71c;
},getHref:function(){
return this._window.location.href;
},getPathName:function(){
return this._window.location.pathName;
},contextObject:function(){
return this._window;
}});
return _71b;
});
},"url:dijit/form/templates/ValidationTextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","url:dijit/form/templates/TextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","dijit/_KeyNavContainer":function(){
define("dijit/_KeyNavContainer",["dojo/_base/kernel","./_Container","./_FocusMixin","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/event","dojo/dom-attr","dojo/_base/lang"],function(_71d,_71e,_71f,_720,keys,_721,_722,_723,lang){
return _721("dijit._KeyNavContainer",[_71f,_71e],{tabIndex:"0",connectKeyNavHandlers:function(_724,_725){
var _726=(this._keyNavCodes={});
var prev=lang.hitch(this,"focusPrev");
var next=lang.hitch(this,"focusNext");
_720.forEach(_724,function(code){
_726[code]=prev;
});
_720.forEach(_725,function(code){
_726[code]=next;
});
_726[keys.HOME]=lang.hitch(this,"focusFirstChild");
_726[keys.END]=lang.hitch(this,"focusLastChild");
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
this.connect(this.domNode,"onfocus","_onContainerFocus");
},startupKeyNavChildren:function(){
_71d.deprecated("startupKeyNavChildren() call no longer needed","","2.0");
},startup:function(){
this.inherited(arguments);
_720.forEach(this.getChildren(),lang.hitch(this,"_startupChild"));
},addChild:function(_727,_728){
this.inherited(arguments);
this._startupChild(_727);
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
},focusChild:function(_729,last){
if(!_729){
return;
}
if(this.focusedChild&&_729!==this.focusedChild){
this._onChildBlur(this.focusedChild);
}
_729.set("tabIndex",this.tabIndex);
_729.focus(last?"end":"start");
this._set("focusedChild",_729);
},_startupChild:function(_72a){
_72a.set("tabIndex","-1");
this.connect(_72a,"_onFocus",function(){
_72a.set("tabIndex",this.tabIndex);
});
this.connect(_72a,"_onBlur",function(){
_72a.set("tabIndex","-1");
});
},_onContainerFocus:function(evt){
if(evt.target!==this.domNode||this.focusedChild){
return;
}
this.focusFirstChild();
_723.set(this.domNode,"tabIndex","-1");
},_onBlur:function(evt){
if(this.tabIndex){
_723.set(this.domNode,"tabIndex",this.tabIndex);
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
_722.stop(evt);
}
},_onChildBlur:function(){
},_getFirstFocusableChild:function(){
return this._getNextFocusableChild(null,1);
},_getLastFocusableChild:function(){
return this._getNextFocusableChild(null,-1);
},_getNextFocusableChild:function(_72b,dir){
if(_72b){
_72b=this._getSiblingOfChild(_72b,dir);
}
var _72c=this.getChildren();
for(var i=0;i<_72c.length;i++){
if(!_72b){
_72b=_72c[(dir>0)?0:(_72c.length-1)];
}
if(_72b.isFocusable()){
return _72b;
}
_72b=this._getSiblingOfChild(_72b,dir);
}
return null;
}});
});
},"dijit/layout/utils":function(){
define("dijit/layout/utils",["dojo/_base/array","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang",".."],function(_72d,_72e,_72f,_730,lang,_731){
var _732=lang.getObject("layout",true,_731);
_732.marginBox2contentBox=function(node,mb){
var cs=_730.getComputedStyle(node);
var me=_72f.getMarginExtents(node,cs);
var pb=_72f.getPadBorderExtents(node,cs);
return {l:_730.toPixelValue(node,cs.paddingLeft),t:_730.toPixelValue(node,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)};
};
function _733(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
};
function size(_734,dim){
var _735=_734.resize?_734.resize(dim):_72f.setMarginBox(_734.domNode,dim);
if(_734.fakeWidget){
return;
}
if(_735){
lang.mixin(_734,_735);
}else{
lang.mixin(_734,_72f.getMarginBoxSimple(_734.domNode));
lang.mixin(_734,dim);
}
};
_732.layoutChildren=function(_736,dim,_737,_738,_739){
dim=lang.mixin({},dim);
_72e.add(_736,"dijitLayoutContainer");
_737=_72d.filter(_737,function(item){
return item.region!="center"&&item.layoutAlign!="client";
}).concat(_72d.filter(_737,function(item){
return item.region=="center"||item.layoutAlign=="client";
}));
var _73a={};
_72d.forEach(_737,function(_73b){
var elm=_73b.domNode,pos=(_73b.region||_73b.layoutAlign);
if(!pos){
throw new Error("No region setting for "+_73b.id);
}
var _73c=elm.style;
_73c.left=dim.l+"px";
_73c.top=dim.t+"px";
_73c.position="absolute";
_72e.add(elm,"dijitAlign"+_733(pos));
var _73d={};
if(_738&&_738==_73b.id){
_73d[_73b.region=="top"||_73b.region=="bottom"?"h":"w"]=_739;
}
if(pos=="top"||pos=="bottom"){
_73d.w=dim.w;
size(_73b,_73d);
dim.h-=_73b.h;
if(pos=="top"){
dim.t+=_73b.h;
}else{
_73c.top=dim.t+dim.h+"px";
}
}else{
if(pos=="left"||pos=="right"){
_73d.h=dim.h;
size(_73b,_73d);
dim.w-=_73b.w;
if(pos=="left"){
dim.l+=_73b.w;
}else{
_73c.left=dim.l+dim.w+"px";
}
}else{
if(pos=="client"||pos=="center"){
size(_73b,dim);
}
}
}
_73a[pos]={w:dim.w,h:dim.h};
});
return _73a;
};
return {marginBox2contentBox:_732.marginBox2contentBox,layoutChildren:_732.layoutChildren};
});
},"dijit/_Contained":function(){
define("dijit/_Contained",["dojo/_base/declare","./registry"],function(_73e,_73f){
return _73e("dijit._Contained",null,{_getSibling:function(_740){
var node=this.domNode;
do{
node=node[_740+"Sibling"];
}while(node&&node.nodeType!=1);
return node&&_73f.byNode(node);
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
define("dijit/form/DataList",["dojo/_base/declare","dojo/dom","dojo/_base/lang","dojo/query","dojo/store/Memory","../registry"],function(_741,dom,lang,_742,_743,_744){
function _745(_746){
return {id:_746.value,value:_746.value,name:lang.trim(_746.innerText||_746.textContent||"")};
};
return _741("dijit.form.DataList",_743,{constructor:function(_747,_748){
this.domNode=dom.byId(_748);
lang.mixin(this,_747);
if(this.id){
_744.add(this);
}
this.domNode.style.display="none";
this.inherited(arguments,[{data:_742("option",this.domNode).map(_745)}]);
},destroy:function(){
_744.remove(this.id);
},fetchSelectedItem:function(){
var _749=_742("> option[selected]",this.domNode)[0]||_742("> option",this.domNode)[0];
return _749&&_745(_749);
}});
});
},"dijit/_Container":function(){
define("dijit/_Container",["dojo/_base/array","dojo/_base/declare","dojo/dom-construct","./registry"],function(_74a,_74b,_74c,_74d){
return _74b("dijit._Container",null,{buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_74e,_74f){
var _750=this.containerNode;
if(_74f&&typeof _74f=="number"){
var _751=this.getChildren();
if(_751&&_751.length>=_74f){
_750=_751[_74f-1].domNode;
_74f="after";
}
}
_74c.place(_74e.domNode,_750,_74f);
if(this._started&&!_74e._started){
_74e.startup();
}
},removeChild:function(_752){
if(typeof _752=="number"){
_752=this.getChildren()[_752];
}
if(_752){
var node=_752.domNode;
if(node&&node.parentNode){
node.parentNode.removeChild(node);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},_getSiblingOfChild:function(_753,dir){
var node=_753.domNode,_754=(dir>0?"nextSibling":"previousSibling");
do{
node=node[_754];
}while(node&&(node.nodeType!=1||!_74d.byNode(node)));
return node&&_74d.byNode(node);
},getIndexOfChild:function(_755){
return _74a.indexOf(this.getChildren(),_755);
}});
});
},"dijit/form/ValidationTextBox":function(){
require({cache:{"url:dijit/form/templates/ValidationTextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"}});
define("dijit/form/ValidationTextBox",["dojo/_base/declare","dojo/i18n","./TextBox","../Tooltip","dojo/text!./templates/ValidationTextBox.html","dojo/i18n!./nls/validate"],function(_756,i18n,_757,_758,_759){
return _756("dijit.form.ValidationTextBox",_757,{templateString:_759,baseClass:"dijitTextBox dijitValidationTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",missingMessage:"$_unset_$",message:"",constraints:{},regExp:".*",regExpGen:function(){
return this.regExp;
},state:"",tooltipPosition:[],_setValueAttr:function(){
this.inherited(arguments);
this.validate(this.focused);
},validator:function(_75a,_75b){
return (new RegExp("^(?:"+this.regExpGen(_75b)+")"+(this.required?"":"?")+"$")).test(_75a)&&(!this.required||!this._isEmpty(_75a))&&(this._isEmpty(_75a)||this.parse(_75a,_75b)!==undefined);
},_isValidSubset:function(){
return this.textbox.value.search(this._partialre)==0;
},isValid:function(){
return this.validator(this.textbox.value,this.constraints);
},_isEmpty:function(_75c){
return (this.trim?/^\s*$/:/^$/).test(_75c);
},getErrorMessage:function(){
return (this.required&&this._isEmpty(this.textbox.value))?this.missingMessage:this.invalidMessage;
},getPromptMessage:function(){
return this.promptMessage;
},_maskValidSubsetError:true,validate:function(_75d){
var _75e="";
var _75f=this.disabled||this.isValid(_75d);
if(_75f){
this._maskValidSubsetError=true;
}
var _760=this._isEmpty(this.textbox.value);
var _761=!_75f&&_75d&&this._isValidSubset();
this._set("state",_75f?"":(((((!this._hasBeenBlurred||_75d)&&_760)||_761)&&this._maskValidSubsetError)?"Incomplete":"Error"));
this.focusNode.setAttribute("aria-invalid",_75f?"false":"true");
if(this.state=="Error"){
this._maskValidSubsetError=_75d&&_761;
_75e=this.getErrorMessage(_75d);
}else{
if(this.state=="Incomplete"){
_75e=this.getPromptMessage(_75d);
this._maskValidSubsetError=!this._hasBeenBlurred||_75d;
}else{
if(_760){
_75e=this.getPromptMessage(_75d);
}
}
}
this.set("message",_75e);
return _75f;
},displayMessage:function(_762){
if(_762&&this.focused){
_758.show(_762,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}else{
_758.hide(this.domNode);
}
},_refreshState:function(){
this.validate(this.focused);
this.inherited(arguments);
},constructor:function(){
this.constraints={};
},_setConstraintsAttr:function(_763){
if(!_763.locale&&this.lang){
_763.locale=this.lang;
}
this._set("constraints",_763);
this._computePartialRE();
},_computePartialRE:function(){
var p=this.regExpGen(this.constraints);
this.regExp=p;
var _764="";
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
_764+=re;
break;
case ")":
_764+="|$)";
break;
default:
_764+="(?:"+re+"|$)";
break;
}
});
}
try{
"".search(_764);
}
catch(e){
_764=this.regExp;
console.warn("RegExp error in "+this.declaredClass+": "+this.regExp);
}
this._partialre="^(?:"+_764+")$";
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
},_setDisabledAttr:function(_765){
this.inherited(arguments);
this._refreshState();
},_setRequiredAttr:function(_766){
this._set("required",_766);
this.focusNode.setAttribute("aria-required",_766);
this._refreshState();
},_setMessageAttr:function(_767){
this._set("message",_767);
this.displayMessage(_767);
},reset:function(){
this._maskValidSubsetError=true;
this.inherited(arguments);
},_onBlur:function(){
this.displayMessage("");
this.inherited(arguments);
}});
});
},"dijit/_base":function(){
define("dijit/_base",[".","./a11y","./WidgetSet","./_base/focus","./_base/manager","./_base/place","./_base/popup","./_base/scroll","./_base/sniff","./_base/typematic","./_base/wai","./_base/window"],function(_768){
return _768._base;
});
},"dijit/_base/typematic":function(){
define("dijit/_base/typematic",["../typematic"],function(){
});
},"dojo/window":function(){
define("dojo/window",["./_base/lang","./_base/sniff","./_base/window","./dom","./dom-geometry","./dom-style"],function(lang,has,_769,dom,geom,_76a){
var _76b=lang.getObject("dojo.window",true);
_76b.getBox=function(){
var _76c=(_769.doc.compatMode=="BackCompat")?_769.body():_769.doc.documentElement,_76d=geom.docScroll(),w,h;
if(has("touch")){
var _76e=_769.doc.parentWindow||_769.doc.defaultView;
w=_76e.innerWidth||_76c.clientWidth;
h=_76e.innerHeight||_76c.clientHeight;
}else{
w=_76c.clientWidth;
h=_76c.clientHeight;
}
return {l:_76d.x,t:_76d.y,w:w,h:h};
};
_76b.get=function(doc){
if(has("ie")&&_76b!==document.parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc.parentWindow||doc.defaultView;
};
_76b.scrollIntoView=function(node,pos){
try{
node=dom.byId(node);
var doc=node.ownerDocument||_769.doc,body=doc.body||_769.body(),html=doc.documentElement||body.parentNode,isIE=has("ie"),isWK=has("webkit");
if((!(has("mozilla")||isIE||isWK||has("opera"))||node==body||node==html)&&(typeof node.scrollIntoView!="undefined")){
node.scrollIntoView(false);
return;
}
var _76f=doc.compatMode=="BackCompat",_770=(isIE>=9&&node.ownerDocument.parentWindow.frameElement)?((html.clientHeight>0&&html.clientWidth>0&&(body.clientHeight==0||body.clientWidth==0||body.clientHeight>html.clientHeight||body.clientWidth>html.clientWidth))?html:body):(_76f?body:html),_771=isWK?body:_770,_772=_770.clientWidth,_773=_770.clientHeight,rtl=!geom.isBodyLtr(),_774=pos||geom.position(node),el=node.parentNode,_775=function(el){
return ((isIE<=6||(isIE&&_76f))?false:(_76a.get(el,"position").toLowerCase()=="fixed"));
};
if(_775(node)){
return;
}
while(el){
if(el==body){
el=_771;
}
var _776=geom.position(el),_777=_775(el);
if(el==_771){
_776.w=_772;
_776.h=_773;
if(_771==html&&isIE&&rtl){
_776.x+=_771.offsetWidth-_776.w;
}
if(_776.x<0||!isIE){
_776.x=0;
}
if(_776.y<0||!isIE){
_776.y=0;
}
}else{
var pb=geom.getPadBorderExtents(el);
_776.w-=pb.w;
_776.h-=pb.h;
_776.x+=pb.l;
_776.y+=pb.t;
var _778=el.clientWidth,_779=_776.w-_778;
if(_778>0&&_779>0){
_776.w=_778;
_776.x+=(rtl&&(isIE||el.clientLeft>pb.l))?_779:0;
}
_778=el.clientHeight;
_779=_776.h-_778;
if(_778>0&&_779>0){
_776.h=_778;
}
}
if(_777){
if(_776.y<0){
_776.h+=_776.y;
_776.y=0;
}
if(_776.x<0){
_776.w+=_776.x;
_776.x=0;
}
if(_776.y+_776.h>_773){
_776.h=_773-_776.y;
}
if(_776.x+_776.w>_772){
_776.w=_772-_776.x;
}
}
var l=_774.x-_776.x,t=_774.y-Math.max(_776.y,0),r=l+_774.w-_776.w,bot=t+_774.h-_776.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
if(rtl&&((isIE==8&&!_76f)||isIE>=9)){
s=-s;
}
_774.x+=el.scrollLeft;
el.scrollLeft+=s;
_774.x-=el.scrollLeft;
}
if(bot*t>0){
_774.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_774.y-=el.scrollTop;
}
el=(el!=_771)&&!_777&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
};
require(["dojo/_base/sniff","dojo/on"],function(has,on){
if(has("ie")==8){
var _77a=screen.deviceXDPI;
setInterval(function(){
if(screen.deviceXDPI!=_77a){
_77a=screen.deviceXDPI;
on.emit(_769.global,"resize");
}
},250);
}
});
return _76b;
});
},"dijit/_FocusMixin":function(){
define("dijit/_FocusMixin",["./focus","./_WidgetBase","dojo/_base/declare","dojo/_base/lang"],function(_77b,_77c,_77d,lang){
lang.extend(_77c,{focused:false,onFocus:function(){
},onBlur:function(){
},_onFocus:function(){
this.onFocus();
},_onBlur:function(){
this.onBlur();
}});
return _77d("dijit._FocusMixin",null,{_focusManager:_77b});
});
},"dojo/data/util/filter":function(){
define("dojo/data/util/filter",["dojo/_base/lang"],function(lang){
var _77e=lang.getObject("dojo.data.util.filter",true);
_77e.patternToRegExp=function(_77f,_780){
var rxp="^";
var c=null;
for(var i=0;i<_77f.length;i++){
c=_77f.charAt(i);
switch(c){
case "\\":
rxp+=c;
i++;
rxp+=_77f.charAt(i);
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
if(_780){
return new RegExp(rxp,"mi");
}else{
return new RegExp(rxp,"m");
}
};
return _77e;
});
},"dijit/_WidgetsInTemplateMixin":function(){
define("dijit/_WidgetsInTemplateMixin",["dojo/_base/array","dojo/_base/declare","dojo/parser","dijit/registry"],function(_781,_782,_783,_784){
return _782("dijit._WidgetsInTemplateMixin",null,{_earlyTemplatedStartup:false,widgetsInTemplate:true,_beforeFillContent:function(){
if(this.widgetsInTemplate){
var node=this.domNode;
var cw=(this._startupWidgets=_783.parse(node,{noStart:!this._earlyTemplatedStartup,template:true,inherited:{dir:this.dir,lang:this.lang,textDir:this.textDir},propsThis:this,scope:"dojo"}));
this._supportingWidgets=_784.findWidgets(node);
this._attachTemplateNodes(cw,function(n,p){
return n[p];
});
}
},startup:function(){
_781.forEach(this._startupWidgets,function(w){
if(w&&!w._started&&w.startup){
w.startup();
}
});
this.inherited(arguments);
}});
});
},"url:idx/oneui/form/templates/TextBox.html":"<div id=\"widget_${id}\" class=\"dijitInline dijitReset dijitLeft idxComposite\"\r\n\t><div class=\"idxLabel dijitInline dijitHidden\"><span class=\"idxRequiredIcon\">*&nbsp</span><label for=\"${id}\" dojoAttachPoint=\"compLabelNode\"></label></div\r\n\t><div class=\"dijitInline\"\r\n\t\t><div dojoAttachPoint='stateNode,oneuiBaseNode' class=\"dijit dijitReset dijitInline dijitLeft\" role=\"presentation\"\r\n\t\t\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\r\n\t\t\t\t><input class=\"dijitReset dijitInputInner\" dojoAttachPoint='textbox,focusNode' autocomplete=\"off\" ${!nameAttrSetting} type='${type}'/\r\n\t\t\t></div\r\n\t\t></div\r\n\t\t><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"></div\r\n\t\t><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\r\n\t\t><div class='dijitValidationIcon'\r\n\t\t><input class=\"dijitReset dijitInputField dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n\t\t></div\r\n\t></div\r\n\t><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\r\n\t></div\r\n></div>\r\n","idx/oneui/HoverHelpTooltip":function(){
require({cache:{"url:idx/oneui/templates/HoverHelpTooltip.html":"<div class=\"idxOneuiHoverHelpTooltip idxOneuiHoverHelpTooltipLeft\" role=\"dialog\"\r\n\t><div role=\"document\"\r\n\t\t><span data-dojo-attach-point=\"closeButtonNode\" class=\"idxOneuiHoverHelpTooltipCloseIcon\" data-dojo-attach-event=\"ondijitclick: hideOnClickClose\" role=\"button\" tabIndex=\"0\"></span\r\n\t></div\r\n\t><div data-dojo-attach-point=\"outerContainerNode\" class=\"idxOneuiHoverHelpTooltipContainer idxOneuiHoverHelpTooltipContents\"\r\n\t\t><div data-dojo-attach-point=\"containerNode\" role=\"document\" tabindex=0></div\r\n\t\t><a target=\"_blank\" href=\"#updateme\" class=\"idxOneuiHoverHelpTooltipLearnLink\" data-dojo-attach-point=\"learnMoreNode\"><span>${learnMoreLabel}</span></a\r\n\t></div\r\n\t><div class=\"idxOneuiHoverHelpTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\r\n></div>"}});
define("idx/oneui/HoverHelpTooltip",["dojo/_base/declare","dojo/_base/fx","dojo/keys","dojo/_base/array","dojo/dom","dojo/_base/lang","dojo/_base/sniff","dijit/focus","dojo/_base/event","dojo/dom-geometry","dijit/place","dijit/a11y","dijit/BackgroundIframe","dojo/dom-style","dojo/_base/window","dijit/_base/manager","dijit/_Widget","dijit/_TemplatedMixin","dijit/Tooltip","dojo/text!./templates/HoverHelpTooltip.html","dijit/dijit","dojo/i18n","dojo/i18n!./nls/HoverHelpTooltip"],function(_785,fx,keys,_786,dom,lang,has,_787,_788,_789,_78a,a11y,_78b,_78c,win,_78d,_78e,_78f,_790,_791,_792,i18n){
var _793=_785("idx.oneui.HoverHelpTooltip",_790,{showDelay:500,hideDelay:800,showLearnMore:false,learnMoreLinkValue:"#updateme",showCloseIcon:true,forceFocus:true,_onHover:function(e){
if(!_793._showTimer){
var _794=e.target;
_793._showTimer=setTimeout(lang.hitch(this,function(){
this.open(_794);
}),this.showDelay);
}
if(_793._hideTimer){
clearTimeout(_793._hideTimer);
delete _793._hideTimer;
}
},_onUnHover:function(){
if(_793._showTimer){
clearTimeout(_793._showTimer);
delete _793._showTimer;
}
if(!_793._hideTimer){
_793._hideTimer=setTimeout(lang.hitch(this,function(){
this.close();
}),this.hideDelay);
}
},open:function(_795){
if(_793._showTimer){
clearTimeout(_793._showTimer);
delete _793._showTimer;
}
_793.show(this.label||this.domNode.innerHTML,_795,this.position,!this.isLeftToRight(),this.textDir,this.showLearnMore,this.learnMoreLinkValue,this.showCloseIcon,this.forceFocus);
this._connectNode=_795;
this.onShow(_795,this.position);
},close:function(){
if(this._connectNode){
_793.hide(this._connectNode);
delete this._connectNode;
this.onHide();
}
if(_793._showTimer){
clearTimeout(_793._showTimer);
delete _793._showTimer;
}
},_setConnectIdAttr:function(_796){
_786.forEach(this._connections||[],function(_797){
_786.forEach(_797,lang.hitch(this,"disconnect"));
},this);
this._connectIds=_786.filter(lang.isArrayLike(_796)?_796:(_796?[_796]:[]),function(id){
return dom.byId(id);
});
this._connections=_786.map(this._connectIds,function(id){
var node=dom.byId(id);
return [this.connect(node,"onmouseenter","_onHover"),this.connect(node,"onmouseleave","_onUnHover"),this.connect(node,"onclick","_onHover"),this.connect(node,"onkeypress","_onConnectIdKey")];
},this);
this._set("connectId",_796);
},_onConnectIdKey:function(evt){
var node=evt.target;
if(evt.charOrCode==keys.ENTER||evt.charOrCode==keys.SPACE||evt.charOrCode==" "||evt.charOrCode==keys.F1){
_793._showTimer=setTimeout(lang.hitch(this,function(){
this.open(node);
}),this.showDelay);
_788.stop(evt);
}
}});
var _798=_785("idx.oneui._MasterHoverHelpTooltip",[_78e,_78f],{duration:_78d.defaultDuration,templateString:_791,learnMoreLabel:"",draggable:true,_firstFocusItem:null,_lastFocusItem:null,postMixInProperties:function(){
this.learnMoreLabel=i18n.getLocalization("idx.oneui","HoverHelpTooltip",this.lang).learnMoreLabel;
},postCreate:function(){
win.body().appendChild(this.domNode);
this.bgIframe=new _78b(this.domNode);
this.fadeIn=fx.fadeIn({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onShow")});
this.fadeOut=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHide")});
this.connect(this.domNode,"onkeypress","_onKey");
this.connect(this.domNode,"onmouseenter",lang.hitch(this,function(e){
if(_793._hideTimer){
clearTimeout(_793._hideTimer);
delete _793._hideTimer;
}
this.focus();
this._keepShowing=true;
this.fadeOut.stop();
this.fadeIn.play();
}));
this.connect(this.domNode,"onmouseleave",lang.hitch(this,function(e){
this._keepShowing=false;
_793._hideTimer=setTimeout(lang.hitch(this,function(){
this.hide(this.aroundNode);
}),800);
}));
},show:function(_799,_79a,_79b,rtl,_79c,_79d,_79e,_79f,_7a0){
this._lastFocusNode=_787.curNode;
if(_79d){
this.learnMoreNode.style.display="inline";
this.learnMoreNode.href=_79e;
}else{
this.learnMoreNode.style.display="none";
}
if(_79f||_79f==null){
this.closeButtonNode.style.display="inline";
}else{
this.closeButtonNode.style.display="none";
}
this.connectorNode.hidden=false;
if(this.aroundNode&&this.aroundNode===_79a&&this.containerNode.innerHTML==_799){
return;
}
this.domNode.width="auto";
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_799;
this.set("textDir",_79c);
this.containerNode.align=rtl?"right":"left";
var pos=_78a.around(this.domNode,_79a,_79b&&_79b.length?_79b:_793.defaultPosition,!rtl,lang.hitch(this,"orient"));
var _7a1=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_7a1.y+((_7a1.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_7a1.x+((_7a1.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}
}
_78c.set(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_79a;
if(_7a0){
this.focus();
}
},orient:function(node,_7a2,_7a3,_7a4,_7a5){
this.connectorNode.style.top="";
var _7a6=_7a4.w-this.connectorNode.offsetWidth;
node.className="idxOneuiHoverHelpTooltip "+{"MR-ML":"idxOneuiHoverHelpTooltipRight","ML-MR":"idxOneuiHoverHelpTooltipLeft","TM-BM":"idxOneuiHoverHelpTooltipAbove","BM-TM":"idxOneuiHoverHelpTooltipBelow","BL-TL":"idxOneuiHoverHelpTooltipBelow idxOneuiHoverHelpTooltipABLeft","TL-BL":"idxOneuiHoverHelpTooltipAbove idxOneuiHoverHelpTooltipABLeft","BR-TR":"idxOneuiHoverHelpTooltipBelow idxOneuiHoverHelpTooltipABRight","TR-BR":"idxOneuiHoverHelpTooltipAbove idxOneuiHoverHelpTooltipABRight","BR-BL":"idxOneuiHoverHelpTooltipRight","BL-BR":"idxOneuiHoverHelpTooltipLeft","TR-TL":"idxOneuiHoverHelpTooltipRight"}[_7a2+"-"+_7a3];
this.domNode.style.width="auto";
var size=_789.getContentBox(this.domNode);
var _7a7=Math.min((Math.max(_7a6,1)),size.w);
var _7a8=_7a7<size.w;
this.domNode.style.width=_7a7+"px";
if(_7a8){
this.containerNode.style.overflow="auto";
var _7a9=this.containerNode.scrollWidth;
this.containerNode.style.overflow="visible";
if(_7a9>_7a7){
_7a9=_7a9+_78c.get(this.domNode,"paddingLeft")+_78c.get(this.domNode,"paddingRight");
this.domNode.style.width=_7a9+"px";
}
}
if(_7a3.charAt(0)=="B"&&_7a2.charAt(0)=="B"){
var mb=_789.getMarginBox(node);
var _7aa=this.connectorNode.offsetHeight;
if(mb.h>_7a4.h){
var _7ab=_7a4.h-((_7a5.h+_7aa)>>1);
this.connectorNode.style.top=_7ab+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_7a5.h/2-_7aa/2,0),mb.h-_7aa)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_7a6);
},focus:function(){
if(this._focus){
return;
}
this._getFocusItems(this.outerContainerNode);
this._focus=true;
_787.focus(this._firstFocusItem);
},_onShow:function(){
if(has("ie")){
this.domNode.style.filter="";
}
},hide:function(_7ac){
if(this._keepShowing){
this._keepShowing=false;
return;
}
if(this._onDeck&&this._onDeck[1]==_7ac){
this._onDeck=null;
}else{
if(this.aroundNode===_7ac||this.isShowingNow){
this._forceHide();
}
}
},hideOnClickClose:function(){
this._forceHide();
},_forceHide:function(){
_787.focus(this._lastFocusNode);
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
if(_78c.get(this.learnMoreNode,"display")=="none"){
var _7ad=a11y._getTabNavigable(this.containerNode);
this._lastFocusItem=_7ad.last||_7ad.highest||this.containerNode;
}else{
this._lastFocusItem=this.learnMoreNode;
}
},_onKey:function(evt){
var node=evt.target;
if(evt.charOrCode===keys.TAB){
this._getFocusItems(this.outerContainerNode);
}
var _7ae=(this._firstFocusItem==this._lastFocusItem);
if(evt.charOrCode==keys.ESCAPE){
setTimeout(lang.hitch(this,"hideOnClickClose"),0);
_788.stop(evt);
}else{
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===keys.TAB){
if(!_7ae){
_787.focus(this._lastFocusItem);
}
_788.stop(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===keys.TAB&&!evt.shiftKey){
if(!_7ae){
_787.focus(this._firstFocusItem);
}
_788.stop(evt);
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
_786.forEach(node.children,function(_7af){
this._setAutoTextDir(_7af);
},this);
},_setTextDirAttr:function(_7b0){
this._set("textDir",typeof _7b0!="undefined"?_7b0:"");
if(_7b0=="auto"){
this._setAutoTextDir(this.containerNode);
}else{
this.containerNode.dir=this.textDir;
}
}});
_793._MasterHoverHelpTooltip=_798;
_793.show=idx.oneui.showHoverHelpTooltip=function(_7b1,_7b2,_7b3,rtl,_7b4,_7b5,_7b6,_7b7,_7b8){
if(!_793._masterTT){
idx.oneui._masterTT=_793._masterTT=new _798();
}
return _793._masterTT.show(_7b1,_7b2,_7b3,rtl,_7b4,_7b5,_7b6,_7b7,_7b8);
};
_793.hide=idx.oneui.hideHoverHelpTooltip=function(_7b9){
return _793._masterTT&&_793._masterTT.hide(_7b9);
};
_793.defaultPosition=["after-centered","before-centered","below","above"];
return _793;
});
},"dijit/form/FilteringSelect":function(){
define("dijit/form/FilteringSelect",["dojo/data/util/filter","dojo/_base/declare","dojo/_base/Deferred","dojo/_base/lang","./MappedTextBox","./ComboBoxMixin"],function(_7ba,_7bb,_7bc,lang,_7bd,_7be){
return _7bb("dijit.form.FilteringSelect",[_7bd,_7be],{required:true,_lastDisplayedValue:"",_isValidSubset:function(){
return this._opened;
},isValid:function(){
return !!this.item||(!this.required&&this.get("displayedValue")=="");
},_refreshState:function(){
if(!this.searchTimer){
this.inherited(arguments);
}
},_callbackSetLabel:function(_7bf,_7c0,_7c1,_7c2){
if((_7c0&&_7c0[this.searchAttr]!==this._lastQuery)||(!_7c0&&_7bf.length&&this.store.getIdentity(_7bf[0])!=this._lastQuery)){
return;
}
if(!_7bf.length){
this.set("value","",_7c2||(_7c2===undefined&&!this.focused),this.textbox.value,null);
}else{
this.set("item",_7bf[0],_7c2);
}
},_openResultList:function(_7c3,_7c4,_7c5){
if(_7c4[this.searchAttr]!==this._lastQuery){
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
},_setValueAttr:function(_7c6,_7c7,_7c8,item){
if(!this._onChangeActive){
_7c7=null;
}
if(item===undefined){
if(_7c6===null||_7c6===""){
_7c6="";
if(!lang.isString(_7c8)){
this._setDisplayedValueAttr(_7c8||"",_7c7);
return;
}
}
var self=this;
this._lastQuery=_7c6;
_7bc.when(this.store.get(_7c6),function(item){
self._callbackSetLabel(item?[item]:[],undefined,undefined,_7c7);
});
}else{
this.valueNode.value=_7c6;
this.inherited(arguments);
}
},_setItemAttr:function(item,_7c9,_7ca){
this.inherited(arguments);
this._lastDisplayedValue=this.textbox.value;
},_getDisplayQueryString:function(text){
return text.replace(/([\\\*\?])/g,"\\$1");
},_setDisplayedValueAttr:function(_7cb,_7cc){
if(_7cb==null){
_7cb="";
}
if(!this._created){
if(!("displayedValue" in this.params)){
return;
}
_7cc=false;
}
if(this.store){
this.closeDropDown();
var _7cd=lang.clone(this.query);
var qs=this._getDisplayQueryString(_7cb),q;
if(this.store._oldAPI){
q=qs;
}else{
q=_7ba.patternToRegExp(qs,this.ignoreCase);
q.toString=function(){
return qs;
};
}
this._lastQuery=_7cd[this.searchAttr]=q;
this.textbox.value=_7cb;
this._lastDisplayedValue=_7cb;
this._set("displayedValue",_7cb);
var _7ce=this;
var _7cf={ignoreCase:this.ignoreCase,deep:true};
lang.mixin(_7cf,this.fetchProperties);
this._fetchHandle=this.store.query(_7cd,_7cf);
_7bc.when(this._fetchHandle,function(_7d0){
_7ce._fetchHandle=null;
_7ce._callbackSetLabel(_7d0||[],_7cd,_7cf,_7cc);
},function(err){
_7ce._fetchHandle=null;
if(!_7ce._cancelingQuery){
console.error("dijit.form.FilteringSelect: "+err.toString());
}
});
}
},undo:function(){
this.set("displayedValue",this._lastDisplayedValue);
}});
});
},"dijit/form/_ButtonMixin":function(){
define("dijit/form/_ButtonMixin",["dojo/_base/declare","dojo/dom","dojo/_base/event","../registry"],function(_7d1,dom,_7d2,_7d3){
return _7d1("dijit.form._ButtonMixin",null,{label:"",type:"button",_onClick:function(e){
if(this.disabled){
_7d2.stop(e);
return false;
}
var _7d4=this.onClick(e)===false;
if(!_7d4&&this.type=="submit"&&!(this.valueNode||this.focusNode).form){
for(var node=this.domNode;node.parentNode;node=node.parentNode){
var _7d5=_7d3.byNode(node);
if(_7d5&&typeof _7d5._onSubmit=="function"){
_7d5._onSubmit(e);
_7d4=true;
break;
}
}
}
if(_7d4){
e.preventDefault();
}
return !_7d4;
},postCreate:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},onClick:function(){
return true;
},_setLabelAttr:function(_7d6){
this._set("label",_7d6);
(this.containerNode||this.focusNode).innerHTML=_7d6;
}});
});
},"dijit/registry":function(){
define("dijit/registry",["dojo/_base/array","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window","."],function(_7d7,has,_7d8,win,_7d9){
var _7da={},hash={};
var _7db={length:0,add:function(_7dc){
if(hash[_7dc.id]){
throw new Error("Tried to register widget with id=="+_7dc.id+" but that id is already registered");
}
hash[_7dc.id]=_7dc;
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
},getUniqueId:function(_7dd){
var id;
do{
id=_7dd+"_"+(_7dd in _7da?++_7da[_7dd]:_7da[_7dd]=0);
}while(hash[id]);
return _7d9._scopeName=="dijit"?id:_7d9._scopeName+"_"+id;
},findWidgets:function(root){
var _7de=[];
function _7df(root){
for(var node=root.firstChild;node;node=node.nextSibling){
if(node.nodeType==1){
var _7e0=node.getAttribute("widgetId");
if(_7e0){
var _7e1=hash[_7e0];
if(_7e1){
_7de.push(_7e1);
}
}else{
_7df(node);
}
}
}
};
_7df(root);
return _7de;
},_destroyAll:function(){
_7d9._curFocus=null;
_7d9._prevFocus=null;
_7d9._activeStack=[];
_7d7.forEach(_7db.findWidgets(win.body()),function(_7e2){
if(!_7e2._destroyed){
if(_7e2.destroyRecursive){
_7e2.destroyRecursive();
}else{
if(_7e2.destroy){
_7e2.destroy();
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
_7d9.registry=_7db;
return _7db;
});
},"curam/layout/TabContainer":function(){
require({cache:{"url:curam/layout/resources/TabContainer.html":"<div class=\"dijitTabContainer\">\r\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\r\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer dijitAlignTop\"></div>\r\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container dijitAlignClient\" data-dojo-attach-point=\"containerNode\"></div>\r\n</div>\r\n"}});
define("curam/layout/TabContainer",["dijit/layout/TabContainer","dojo/text!curam/layout/resources/TabContainer.html"],function(_7e3,_7e4){
var _7e5=dojo.declare("curam.layout.TabContainer",_7e3,{templateString:_7e4,_theSelectedTabIndex:0,_thePage:null,_theChildren:null,postCreate:function(){
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
var _7e6=this.getChildren();
var i=0;
var _7e7=0;
for(i=0;i<_7e6.length;i++){
if(_7e6[i].get("selected")){
_7e7=i;
break;
}
}
this._theSelectedTabIndex=_7e7;
this._thePage=page;
this._theChildren=_7e6;
}
this.inherited(arguments);
}});
return _7e5;
});
},"dijit/_base/wai":function(){
define("dijit/_base/wai",["dojo/dom-attr","dojo/_base/lang","..","../hccss"],function(_7e8,lang,_7e9){
lang.mixin(_7e9,{hasWaiRole:function(elem,role){
var _7ea=this.getWaiRole(elem);
return role?(_7ea.indexOf(role)>-1):(_7ea.length>0);
},getWaiRole:function(elem){
return lang.trim((_7e8.get(elem,"role")||"").replace("wairole:",""));
},setWaiRole:function(elem,role){
_7e8.set(elem,"role",role);
},removeWaiRole:function(elem,role){
var _7eb=_7e8.get(elem,"role");
if(!_7eb){
return;
}
if(role){
var t=lang.trim((" "+_7eb+" ").replace(" "+role+" "," "));
_7e8.set(elem,"role",t);
}else{
elem.removeAttribute("role");
}
},hasWaiState:function(elem,_7ec){
return elem.hasAttribute?elem.hasAttribute("aria-"+_7ec):!!elem.getAttribute("aria-"+_7ec);
},getWaiState:function(elem,_7ed){
return elem.getAttribute("aria-"+_7ed)||"";
},setWaiState:function(elem,_7ee,_7ef){
elem.setAttribute("aria-"+_7ee,_7ef);
},removeWaiState:function(elem,_7f0){
elem.removeAttribute("aria-"+_7f0);
}});
return _7e9;
});
},"curam/util/ResourceBundle":function(){
define("curam/util/ResourceBundle",["dojo/i18n","dojo/string"],function(i18n,_7f1){
var _7f2=dojo.declare("curam.util.ResourceBundle",null,{_bundle:undefined,constructor:function(_7f3,_7f4){
var _7f5=_7f3.split(".");
var _7f6=_7f5[_7f5.length-1];
var _7f7=_7f5.length==1?"curam.application":_7f3.slice(0,_7f3.length-_7f6.length-1);
try{
var b=i18n.getLocalization(_7f7,_7f6,_7f4);
if(this._isEmpty(b)){
throw new Error("Empty resource bundle.");
}else{
this._bundle=b;
}
}
catch(e){
throw new Error("Unable to access resource bundle: "+_7f7+"."+_7f6+": "+e.message);
}
},_isEmpty:function(_7f8){
for(var prop in _7f8){
return false;
}
return true;
},getProperty:function(key,_7f9){
var msg=this._bundle[key];
var _7fa=msg;
if(_7f9){
_7fa=_7f1.substitute(msg,_7f9);
}
return _7fa;
}});
return _7f2;
});
},"dojo/store/util/QueryResults":function(){
define("dojo/store/util/QueryResults",["../../_base/array","../../_base/lang","../../_base/Deferred"],function(_7fb,lang,_7fc){
var util=lang.getObject("dojo.store.util",true);
util.QueryResults=function(_7fd){
if(!_7fd){
return _7fd;
}
if(_7fd.then){
_7fd=lang.delegate(_7fd);
}
function _7fe(_7ff){
if(!_7fd[_7ff]){
_7fd[_7ff]=function(){
var args=arguments;
return _7fc.when(_7fd,function(_800){
Array.prototype.unshift.call(args,_800);
return util.QueryResults(_7fb[_7ff].apply(_7fb,args));
});
};
}
};
_7fe("forEach");
_7fe("filter");
_7fe("map");
if(!_7fd.total){
_7fd.total=_7fc.when(_7fd,function(_801){
return _801.length;
});
}
return _7fd;
};
return util.QueryResults;
});
},"dijit/form/_ListBase":function(){
define("dijit/form/_ListBase",["dojo/_base/declare","dojo/window"],function(_802,_803){
return _802("dijit.form._ListBase",null,{selected:null,_getTarget:function(evt){
var tgt=evt.target;
var _804=this.containerNode;
if(tgt==_804||tgt==this.domNode){
return null;
}
while(tgt&&tgt.parentNode!=_804){
tgt=tgt.parentNode;
}
return tgt;
},selectFirstNode:function(){
var _805=this.containerNode.firstChild;
while(_805&&_805.style.display=="none"){
_805=_805.nextSibling;
}
this._setSelectedAttr(_805);
},selectLastNode:function(){
var last=this.containerNode.lastChild;
while(last&&last.style.display=="none"){
last=last.previousSibling;
}
this._setSelectedAttr(last);
},selectNextNode:function(){
var _806=this._getSelectedAttr();
if(!_806){
this.selectFirstNode();
}else{
var next=_806.nextSibling;
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
var _807=this._getSelectedAttr();
if(!_807){
this.selectLastNode();
}else{
var prev=_807.previousSibling;
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
var _808=this._getSelectedAttr();
if(_808){
this.onDeselect(_808);
this.selected=null;
}
if(node&&node.parentNode==this.containerNode){
this.selected=node;
_803.scrollIntoView(node);
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
define("dijit/form/_FormWidget",["dojo/_base/declare","dojo/_base/kernel","dojo/ready","../_Widget","../_CssStateMixin","../_TemplatedMixin","./_FormWidgetMixin"],function(_809,_80a,_80b,_80c,_80d,_80e,_80f){
if(!_80a.isAsync){
_80b(0,function(){
var _810=["dijit/form/_FormValueWidget"];
require(_810);
});
}
return _809("dijit.form._FormWidget",[_80c,_80e,_80d,_80f],{setDisabled:function(_811){
_80a.deprecated("setDisabled("+_811+") is deprecated. Use set('disabled',"+_811+") instead.","","2.0");
this.set("disabled",_811);
},setValue:function(_812){
_80a.deprecated("dijit.form._FormWidget:setValue("+_812+") is deprecated.  Use set('value',"+_812+") instead.","","2.0");
this.set("value",_812);
},getValue:function(){
_80a.deprecated(this.declaredClass+"::getValue() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},postMixInProperties:function(){
this.nameAttrSetting=this.name?("name=\""+this.name.replace(/'/g,"&quot;")+"\""):"";
this.inherited(arguments);
},_setTypeAttr:null});
});
},"curam/tab":function(){
define("curam/tab",["curam/define","curam/util","curam/util/ScreenContext"],function(){
curam.define.singleton("curam.tab",{SECTION_TAB_CONTAINER_ID:"app-sections-container-dc",SMART_PANEL_IFRAME_ID:"curam_tab_SmartPanelIframe",toBeExecutedOnTabClose:[],_mockSelectedTab:null,getSelectedTab:function(_813){
if(curam.tab._mockSelectedTab){
return curam.tab._mockSelectedTab;
}
if(curam.tab.getTabContainer(_813)){
return curam.tab.getTabContainer(_813).selectedChildWidget;
}
},getTabContainer:function(_814){
return curam.tab.getTabContainerFromSectionID(_814||curam.tab.getCurrentSectionId());
},getCurrentSectionId:function(_815){
var _816=curam.util.getTopmostWindow().dijit.byId(curam.tab.SECTION_TAB_CONTAINER_ID);
if(_816){
var _817=_816.selectedChildWidget.domNode.id;
return _817.substring(0,_817.length-4);
}else{
if(!_815){
throw new Error("curam.tab.getCurrentSectionId() - application section"+" tab container not found");
}
}
return null;
},inTabbedUI:function(){
return curam.tab.getCurrentSectionId(true)!=null;
},getTabContainerFromSectionID:function(_818){
var _819=dijit.byId(_818+"-stc");
if(!_819&&window.parent&&window.parent!=window){
_819=curam.util.getTopmostWindow().dijit.byId(_818+"-stc");
}
return _819;
},getTabWidgetId:function(tab){
return tab.id;
},getSelectedTabWidgetId:function(){
return curam.tab.getTabWidgetId(curam.tab.getSelectedTab());
},getContainerTab:function(node){
var _81a=dijit.getEnclosingWidget(node);
if(_81a&&!_81a.tabDescriptor){
_81a=curam.tab.getContainerTab(_81a.domNode.parentNode);
}
if(!_81a||!_81a.tabDescriptor){
throw "Containing tab widget could not be found for node: "+node;
}
return _81a;
},getContentPanelIframe:function(tab){
var _81b=tab?tab:curam.tab.getSelectedTab(),_81c=null;
if(_81b){
_81c=dojo.query("iframe",_81b.domNode).filter(function(item){
return dojo.attr(item,"iscpiframe")=="true";
})[0];
}
return _81c?_81c:null;
},refreshMainContentPanel:function(tab){
var _81d=curam.tab.getContentPanelIframe(tab);
_81d.contentWindow.curam.util.publishRefreshEvent();
_81d.contentWindow.location.reload(true);
},getSmartPanelIframe:function(tab){
var _81e=tab?tab:curam.tab.getSelectedTab();
var _81f=dojo.query("iframe",_81e.domNode).filter(function(item){
return item.id==curam.tab.SMART_PANEL_IFRAME_ID;
})[0];
return _81f;
},unsubscribeOnTabClose:function(_820,_821){
curam.tab.toBeExecutedOnTabClose.push(function(_822){
if(_821==_822){
dojo.unsubscribe(_820);
return true;
}
return false;
});
},executeOnTabClose:function(func,_823){
curam.tab.toBeExecutedOnTabClose.push(function(_824){
if(_823==_824){
func();
return true;
}
return false;
});
},doExecuteOnTabClose:function(_825){
var _826=new Array();
for(var i=0;i<curam.tab.toBeExecutedOnTabClose.length;i++){
var func=curam.tab.toBeExecutedOnTabClose[i];
if(!func(_825)){
_826.push(func);
}
}
curam.tab.toBeExecutedOnTabClose=_826;
},getHandlerForTab:function(_827,_828){
return function(_829,_82a){
if(_82a==_828){
_827(_829,_828);
}else{
}
};
},getTabController:function(){
return curam.util.getTopmostWindow().curam.ui.UIController;
},initTabLinks:function(_82b){
if(typeof (window.pageContainsClassicIEG)!="undefined"&&window.pageContainsClassicIEG==true){
return;
}
dojo.query("a").forEach(function(link){
if(link.href.indexOf("#")!=0&&link.href.indexOf("javascript:")!=0&&(link.href.indexOf("Page.do")>-1||link.href.indexOf("Frame.do")>-1)){
if(link.href.indexOf("&o3ctx")<0&&link.href.indexOf("?o3ctx")<0){
var _82c=(link.href.indexOf("?")>-1)?"&":"?";
link.href+=_82c+jsScreenContext.toRequestString();
}
}
});
elements=document.forms;
for(var i=0;i<elements.length;++i){
elem=elements[i];
var _82d=dojo.byId("o3ctx");
if(!_82d){
var ctx=new curam.util.ScreenContext();
ctx.setContextBits("ACTION");
dojo.create("input",{"type":"hidden","name":"o3ctx","value":ctx.getValue()},elem);
}
dojo.create("input",{"type":"hidden","name":"o3prv","value":jsPageID},elem);
}
if(elements.length>0){
curam.util.getTopmostWindow().dojo.publish("curam.fireNextRequest",[]);
}
},initContent:function(_82e,_82f){
var _830=dojo.byId("content");
dojo.removeClass(_830,"hidden-panel");
return;
},setupSectionSelectionListener:function(){
dojo.subscribe(curam.tab.SECTION_TAB_CONTAINER_ID+"-selectChild",curam.tab.onSectionSelected);
},onSectionSelected:function(_831){
if(_831.curamDefaultPageID){
var _832;
if(_831.id.substring(_831.id.length-4,_831.id.length)=="-sbc"){
var _833=_831.id.substring(0,_831.id.length-4);
_832=curam.tab.getTabContainer(_833);
}else{
_832=_831;
}
if(_832&&_832.getChildren().length==0){
curam.tab.getTabController().handleUIMPageID(_831.curamDefaultPageID,true);
}
return true;
}
return false;
},setSectionDefaultPage:function(_834,_835){
var _836=dijit.byId(_834);
if(_836){
_836.curamDefaultPageID=_835;
}else{
throw "curam.tab.setSectionDefaultPage() - cannot find section dijit ID:"+_834;
}
},publishSmartPanelContentReady:function(){
var _837="smartpanel.content.loaded";
var _838=window.frameElement;
_838.setAttribute("_SPContentLoaded","true");
curam.util.getTopmostWindow().dojo.publish(_837,[_838]);
}});
return curam.tab;
});
},"dijit/_base/place":function(){
define("dijit/_base/place",["dojo/_base/array","dojo/_base/lang","dojo/window","../place",".."],function(_839,lang,_83a,_83b,_83c){
_83c.getViewport=function(){
return _83a.getBox();
};
_83c.placeOnScreen=_83b.at;
_83c.placeOnScreenAroundElement=function(node,_83d,_83e,_83f){
var _840;
if(lang.isArray(_83e)){
_840=_83e;
}else{
_840=[];
for(var key in _83e){
_840.push({aroundCorner:key,corner:_83e[key]});
}
}
return _83b.around(node,_83d,_840,true,_83f);
};
_83c.placeOnScreenAroundNode=_83c.placeOnScreenAroundElement;
_83c.placeOnScreenAroundRectangle=_83c.placeOnScreenAroundElement;
_83c.getPopupAroundAlignment=function(_841,_842){
var _843={};
_839.forEach(_841,function(pos){
var ltr=_842;
switch(pos){
case "after":
_843[_842?"BR":"BL"]=_842?"BL":"BR";
break;
case "before":
_843[_842?"BL":"BR"]=_842?"BR":"BL";
break;
case "below-alt":
ltr=!ltr;
case "below":
_843[ltr?"BL":"BR"]=ltr?"TL":"TR";
_843[ltr?"BR":"BL"]=ltr?"TR":"TL";
break;
case "above-alt":
ltr=!ltr;
case "above":
default:
_843[ltr?"TL":"TR"]=ltr?"BL":"BR";
_843[ltr?"TR":"TL"]=ltr?"BR":"BL";
break;
}
});
return _843;
};
return _83c;
});
},"dijit/form/_ComboBoxMenu":function(){
define("dijit/form/_ComboBoxMenu",["dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/keys","../_WidgetBase","../_TemplatedMixin","./_ComboBoxMenuMixin","./_ListMouseMixin"],function(_844,_845,_846,_847,keys,_848,_849,_84a,_84b){
return _844("dijit.form._ComboBoxMenu",[_848,_849,_84b,_84a],{templateString:"<div class='dijitReset dijitMenu' data-dojo-attach-point='containerNode' style='overflow: auto; overflow-x: hidden;'>"+"<div class='dijitMenuItem dijitMenuPreviousButton' data-dojo-attach-point='previousButton' role='option'></div>"+"<div class='dijitMenuItem dijitMenuNextButton' data-dojo-attach-point='nextButton' role='option'></div>"+"</div>",baseClass:"dijitComboBoxMenu",postCreate:function(){
this.inherited(arguments);
if(!this.isLeftToRight()){
_845.add(this.previousButton,"dijitMenuItemRtl");
_845.add(this.nextButton,"dijitMenuItemRtl");
}
},_createMenuItem:function(){
return _846.create("div",{"class":"dijitReset dijitMenuItem"+(this.isLeftToRight()?"":" dijitMenuItemRtl"),role:"option"});
},onHover:function(node){
_845.add(node,"dijitMenuItemHover");
},onUnhover:function(node){
_845.remove(node,"dijitMenuItemHover");
},onSelect:function(node){
_845.add(node,"dijitMenuItemSelected");
},onDeselect:function(node){
_845.remove(node,"dijitMenuItemSelected");
},_page:function(up){
var _84c=0;
var _84d=this.domNode.scrollTop;
var _84e=_847.get(this.domNode,"height");
if(!this.getHighlightedOption()){
this.selectNextNode();
}
while(_84c<_84e){
var _84f=this.getHighlightedOption();
if(up){
if(!_84f.previousSibling||_84f.previousSibling.style.display=="none"){
break;
}
this.selectPreviousNode();
}else{
if(!_84f.nextSibling||_84f.nextSibling.style.display=="none"){
break;
}
this.selectNextNode();
}
var _850=this.domNode.scrollTop;
_84c+=(_850-_84d)*(up?-1:1);
_84d=_850;
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
dojo.mixin(cm,{nextSibling:function(node,_851){
return cm._findSibling(node,_851,true);
},prevSibling:function(node,_852){
return cm._findSibling(node,_852,false);
},getInput:function(name,_853){
if(!dojo.isString(name)){
return name;
}
var _854=dojo.query("input[name='"+name+"'],select[name='"+name+"']");
return _853?(_854.length>0?_854:null):(_854.length>0?_854[0]:null);
},getParentByClass:function(node,_855){
node=node.parentNode;
while(node){
if(dojo.hasClass(node,_855)){
return node;
}
node=node.parentNode;
}
return null;
},getParentByType:function(node,type){
node=node.parentNode;
type=type.toLowerCase();
var _856="html";
while(node){
if(node.tagName.toLowerCase()==_856){
break;
}
if(node.tagName.toLowerCase()==type){
return node;
}
node=node.parentNode;
}
return null;
},replaceClass:function(node,_857,_858){
dojo.removeClass(node,_858);
dojo.addClass(node,_857);
},setClass:function(node,_859){
node=dojo.byId(node);
var cs=new String(_859);
try{
if(typeof node.className=="string"){
node.className=cs;
}else{
if(node.setAttribute){
node.setAttribute("class",_859);
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
},_findSibling:function(node,_85a,_85b){
if(!node){
return null;
}
if(_85a){
_85a=_85a.toLowerCase();
}
var _85c=_85b?"nextSibling":"previousSibling";
do{
node=node[_85c];
}while(node&&node.nodeType!=1);
if(node&&_85a&&_85a!=node.tagName.toLowerCase()){
return cm[_85b?"nextSibling":"prevSibling"](node,_85a);
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
},endsWith:function(str,end,_85d){
if(_85d){
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
define("dijit/_base/focus",["dojo/_base/array","dojo/dom","dojo/_base/lang","dojo/topic","dojo/_base/window","../focus",".."],function(_85e,dom,lang,_85f,win,_860,_861){
lang.mixin(_861,{_curFocus:null,_prevFocus:null,isCollapsed:function(){
return _861.getBookmark().isCollapsed;
},getBookmark:function(){
var bm,rg,tg,sel=win.doc.selection,cf=_860.curNode;
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
},moveToBookmark:function(_862){
var _863=win.doc,mark=_862.mark;
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
if(_863.selection&&mark){
var rg;
if(mark.pRange){
rg=mark.range;
}else{
if(lang.isArray(mark)){
rg=_863.body.createControlRange();
_85e.forEach(mark,function(n){
rg.addElement(n);
});
}else{
rg=_863.body.createTextRange();
rg.moveToBookmark(mark);
}
}
rg.select();
}
}
}
},getFocus:function(menu,_864){
var node=!_860.curNode||(menu&&dom.isDescendant(_860.curNode,menu.domNode))?_861._prevFocus:_860.curNode;
return {node:node,bookmark:node&&(node==_860.curNode)&&win.withGlobal(_864||win.global,_861.getBookmark),openedForWindow:_864};
},_activeStack:[],registerIframe:function(_865){
return _860.registerIframe(_865);
},unregisterIframe:function(_866){
_866&&_866.remove();
},registerWin:function(_867,_868){
return _860.registerWin(_867,_868);
},unregisterWin:function(_869){
_869&&_869.remove();
}});
_860.focus=function(_86a){
if(!_86a){
return;
}
var node="node" in _86a?_86a.node:_86a,_86b=_86a.bookmark,_86c=_86a.openedForWindow,_86d=_86b?_86b.isCollapsed:false;
if(node){
var _86e=(node.tagName.toLowerCase()=="iframe")?node.contentWindow:node;
if(_86e&&_86e.focus){
try{
_86e.focus();
}
catch(e){
}
}
_860._onFocusNode(node);
}
if(_86b&&win.withGlobal(_86c||win.global,_861.isCollapsed)&&!_86d){
if(_86c){
_86c.focus();
}
try{
win.withGlobal(_86c||win.global,_861.moveToBookmark,null,[_86b]);
}
catch(e2){
}
}
};
_860.watch("curNode",function(name,_86f,_870){
_861._curFocus=_870;
_861._prevFocus=_86f;
if(_870){
_85f.publish("focusNode",_870);
}
});
_860.watch("activeStack",function(name,_871,_872){
_861._activeStack=_872;
});
_860.on("widget-blur",function(_873,by){
_85f.publish("widgetBlur",_873,by);
});
_860.on("widget-focus",function(_874,by){
_85f.publish("widgetFocus",_874,by);
});
return _861;
});
},"curam/util/ScreenContext":function(){
define("curam/util/ScreenContext",[],function(){
var _875={DEFAULT_CONTEXT:112,SAMPLE22:2,SAMPLE21:1,SAMPLE13:4,SAMPLE12:2,SAMPLE11:1,EXTAPP:1048576,CONTEXT_PORTLET:524288,SMART_PANEL:262144,NESTED_UIM:131072,ORG_TREE:65536,CONTEXT_PANEL:32768,LIST_ROW_INLINE_PAGE:8192,LIST_EVEN_ROW:16384,TAB:4096,TREE:2048,AGENDA:1024,POPUP:512,MODAL:256,HOME:128,HEADER:64,NAVIGATOR:32,FOOTER:16,OVAL:8,RESOLVE:4,ACTION:2,ERROR:1,EMPTY:0};
var _876=[["ERROR","ACTION","RESOLVE","OPT_VALIDATION","FOOTER","NAVIGATOR","HEADER","HOME_PAGE","MODAL","POPUP","AGENDA","TREE","TAB","LIST_EVEN_ROW","LIST_ROW_INLINE_PAGE","CONTEXT_PANEL","ORG_TREE","NESTED_UIM","SMART_PANEL","CONTEXT_PORTLET","EXTAPP"],["SAMPLE11","SAMPLE12","SAMPLE13"],["SAMPLE21","SAMPLE22"]];
var _877=dojo.declare("curam.util.ScreenContext",null,{constructor:function(_878){
if(_878){
this.setContext(_878);
}else{
this.currentContext=[_875["DEFAULT_CONTEXT"]|_875["DEFAULT_CONTEXT"]];
}
},setContext:function(_879){
var tmp=this.setup(_879);
this.currentContext=((tmp==null)?([_875["DEFAULT_CONTEXT"]|_875["DEFAULT_CONTEXT"]]):(tmp));
},addContextBits:function(_87a,idx){
if(!_87a){
return;
}
var _87b=(idx)?idx:0;
var _87c=this.parseContext(_87a);
if(_87c!=null){
this.currentContext[_87b]|=_87c;
}
return this.currentContext[_87b];
},addAll:function(idx){
var _87d=(idx)?idx:0;
this.currentContext[_87d]=4294967295;
return this.currentContext[_87d];
},clear:function(_87e,idx){
if(!_87e){
this.clearAll();
return;
}
var _87f=(idx)?idx:0;
if(_87e==0){
return this.currentContext[_87f];
}
var _880=this.parseContext(_87e);
if(_880!=null){
var _881=this.currentContext[_87f]&_880;
this.currentContext[_87f]^=_881;
}
return this.currentContext[_87f];
},clearAll:function(idx){
if(idx){
this.currentContext[idx]=0;
}else{
for(var i=0;i<this.currentContext.length;i++){
this.currentContext[i]=0;
}
}
},updateStates:function(_882){
this.clear("ERROR|ACTION|RESOLVE");
this.currentContext[0]=this.currentContext[0]|(_882&7);
},hasContextBits:function(_883,idx){
if(!_883){
return false;
}
var _884=(idx)?idx:0;
var _885=this.parseContext(_883);
if(_885!=null){
var _886=this.currentContext[_884]&_885;
return (_886==_885);
}
return false;
},getValue:function(){
var _887="";
for(var i=0;i<this.currentContext.length;i++){
_887+=this.currentContext[i]+"|";
}
return _887.substring(0,_887.length-1);
},toRequestString:function(){
return "o3ctx="+this.getValue();
},toBinary:function(){
var _888="";
for(var i=0;i<this.currentContext.length;i++){
_888+=this.currentContext[i].toString(2)+"|";
}
return _888.substring(0,_888.length-1);
},toString:function(){
var _889="";
for(var i=0;i<this.currentContext.length;i++){
var _88a="";
var j=0;
while(j<_876[i].length){
if(((this.currentContext[i]>>j)&1)!=0){
_88a+=","+_876[i][j];
}
j++;
}
if(_88a==""){
return "{}";
}
_889+="|"+_88a.replace(",","{")+((_88a.length==0)?"":"}");
}
return _889.substring(1);
},parseContext:function(_88b){
var _88c=_88b.replace(/,/g,"|");
var _88d=_88c.split("|");
var tmp=isNaN(_88d[0])?parseInt(_875[_88d[0]]):_88d[0];
for(var i=1;i<_88d.length;i++){
tmp=tmp|(isNaN(_88d[i])?parseInt(_875[_88d[i]]):_88d[i]);
}
return (isNaN(tmp)?null:tmp);
},setup:function(_88e){
if(!_88e){
return null;
}
var _88f=(""+_88e).split("|");
var _890=new Array(_88f.length);
for(var i=0;i<_88f.length;i++){
_890[i]=this.parseContext(_88f[_88f.length-i-1]);
_890[i]=_890[i]|_890[i];
if(!_890[i]||isNaN(_890[i])||_890[i]>4294967295){
return null;
}
}
return _890;
}});
return _877;
});
},"dijit/a11y":function(){
define("dijit/a11y",["dojo/_base/array","dojo/_base/config","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-style","dojo/_base/sniff","./_base/manager","."],function(_891,_892,_893,dom,_894,_895,has,_896,_897){
var _898=(_897._isElementShown=function(elem){
var s=_895.get(elem);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(_894.get(elem,"type")!="hidden");
});
_897.hasDefaultTabStop=function(elem){
switch(elem.nodeName.toLowerCase()){
case "a":
return _894.has(elem,"href");
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
var _899=elem.contentDocument;
if("designMode" in _899&&_899.designMode=="on"){
return true;
}
body=_899.body;
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
var _89a=(_897.isTabNavigable=function(elem){
if(_894.get(elem,"disabled")){
return false;
}else{
if(_894.has(elem,"tabIndex")){
return _894.get(elem,"tabIndex")>=0;
}else{
return _897.hasDefaultTabStop(elem);
}
}
});
_897._getTabNavigable=function(root){
var _89b,last,_89c,_89d,_89e,_89f,_8a0={};
function _8a1(node){
return node&&node.tagName.toLowerCase()=="input"&&node.type&&node.type.toLowerCase()=="radio"&&node.name&&node.name.toLowerCase();
};
var _8a2=function(_8a3){
for(var _8a4=_8a3.firstChild;_8a4;_8a4=_8a4.nextSibling){
if(_8a4.nodeType!=1||(has("ie")<=9&&_8a4.scopeName!=="HTML")||!_898(_8a4)){
continue;
}
if(_89a(_8a4)){
var _8a5=_894.get(_8a4,"tabIndex");
if(!_894.has(_8a4,"tabIndex")||_8a5==0){
if(!_89b){
_89b=_8a4;
}
last=_8a4;
}else{
if(_8a5>0){
if(!_89c||_8a5<_89d){
_89d=_8a5;
_89c=_8a4;
}
if(!_89e||_8a5>=_89f){
_89f=_8a5;
_89e=_8a4;
}
}
}
var rn=_8a1(_8a4);
if(_894.get(_8a4,"checked")&&rn){
_8a0[rn]=_8a4;
}
}
if(_8a4.nodeName.toUpperCase()!="SELECT"){
_8a2(_8a4);
}
}
};
if(_898(root)){
_8a2(root);
}
function rs(node){
return _8a0[_8a1(node)]||node;
};
return {first:rs(_89b),last:rs(last),lowest:rs(_89c),highest:rs(_89e)};
};
_897.getFirstInTabbingOrder=function(root){
var _8a6=_897._getTabNavigable(dom.byId(root));
return _8a6.lowest?_8a6.lowest:_8a6.first;
};
_897.getLastInTabbingOrder=function(root){
var _8a7=_897._getTabNavigable(dom.byId(root));
return _8a7.last?_8a7.last:_8a7.highest;
};
return {hasDefaultTabStop:_897.hasDefaultTabStop,isTabNavigable:_897.isTabNavigable,_getTabNavigable:_897._getTabNavigable,getFirstInTabbingOrder:_897.getFirstInTabbingOrder,getLastInTabbingOrder:_897.getLastInTabbingOrder};
});
},"idx/oneui/form/_ValidationMixin":function(){
define("idx/oneui/form/_ValidationMixin",["dojo/_base/declare","dojo/dom-style","dojo/i18n","dijit/_base/wai","../HoverHelpTooltip","dojo/i18n!dijit/form/nls/validate"],function(_8a8,_8a9,i18n,wai,_8aa,nls){
return _8a8("idx.oneui.form._ValidationMixin",null,{instantValidate:false,required:false,invalidMessage:"$_unset_$",missingMessage:null,tooltipPosition:[],postMixInProperties:function(){
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
if(this.message&&_8a9.get(this.iconNode,"visibility")=="visible"){
_8aa.show(this.message,this.iconNode,this.tooltipPosition,!this.isLeftToRight());
}
});
},_isValid:function(_8ab){
return this.isValid(_8ab)&&!(this.required&&this._isEmpty());
},_isEmpty:function(){
return false;
},isValid:function(_8ac){
return true;
},getErrorMessage:function(_8ad){
return (this.required&&this._isEmpty())?this.missingMessage:this.invalidMessage;
},validate:function(_8ae){
var _8af,_8b0=this.disabled||this._isValid(_8ae);
this.set("state",_8b0?"":"Error");
wai.setWaiState(this.focusNode,"invalid",!_8b0);
if(this.state=="Error"){
_8af=this.getErrorMessage(_8ae);
}
this._set("message",_8af);
this.displayMessage(_8af);
return _8b0;
},displayMessage:function(_8b1,_8b2){
_8aa.hide(this.oneuiBaseNode);
_8aa.hide(this.iconNode);
if(_8b1&&this.focused||_8b2){
var node=_8a9.get(this.iconNode,"visibility")=="hidden"?this.oneuiBaseNode:this.iconNode;
_8aa.show(_8b1,node,this.tooltipPosition,!this.isLeftToRight());
}
},_onBlur:function(){
this.inherited(arguments);
this.displayMessage("");
}});
});
},"dijit/form/_ToggleButtonMixin":function(){
define("dijit/form/_ToggleButtonMixin",["dojo/_base/declare","dojo/dom-attr"],function(_8b3,_8b4){
return _8b3("dijit.form._ToggleButtonMixin",null,{checked:false,_aria_attr:"aria-pressed",_onClick:function(evt){
var _8b5=this.checked;
this._set("checked",!_8b5);
var ret=this.inherited(arguments);
this.set("checked",ret?this.checked:_8b5);
return ret;
},_setCheckedAttr:function(_8b6,_8b7){
this._set("checked",_8b6);
_8b4.set(this.focusNode||this.domNode,"checked",_8b6);
(this.focusNode||this.domNode).setAttribute(this._aria_attr,_8b6?"true":"false");
this._handleOnChange(_8b6,_8b7);
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
}});
});
},"dijit/_Widget":function(){
define("dijit/_Widget",["dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/ready","./registry","./_WidgetBase","./_OnDijitClickMixin","./_FocusMixin","dojo/uacss","./hccss"],function(_8b8,_8b9,_8ba,_8bb,_8bc,lang,_8bd,_8be,_8bf,_8c0,_8c1,_8c2){
function _8c3(){
};
function _8c4(_8c5){
return function(obj,_8c6,_8c7,_8c8){
if(obj&&typeof _8c6=="string"&&obj[_8c6]==_8c3){
return obj.on(_8c6.substring(2).toLowerCase(),lang.hitch(_8c7,_8c8));
}
return _8c5.apply(_8ba,arguments);
};
};
_8b8.around(_8ba,"connect",_8c4);
if(_8bc.connect){
_8b8.around(_8bc,"connect",_8c4);
}
var _8c9=_8bb("dijit._Widget",[_8c0,_8c1,_8c2],{onClick:_8c3,onDblClick:_8c3,onKeyDown:_8c3,onKeyPress:_8c3,onKeyUp:_8c3,onMouseDown:_8c3,onMouseMove:_8c3,onMouseOut:_8c3,onMouseOver:_8c3,onMouseLeave:_8c3,onMouseEnter:_8c3,onMouseUp:_8c3,constructor:function(_8ca){
this._toConnect={};
for(var name in _8ca){
if(this[name]===_8c3){
this._toConnect[name.replace(/^on/,"").toLowerCase()]=_8ca[name];
delete _8ca[name];
}
}
},postCreate:function(){
this.inherited(arguments);
for(var name in this._toConnect){
this.on(name,this._toConnect[name]);
}
delete this._toConnect;
},on:function(type,func){
if(this[this._onMap(type)]===_8c3){
return _8ba.connect(this.domNode,type.toLowerCase(),this,func);
}
return this.inherited(arguments);
},_setFocusedAttr:function(val){
this._focused=val;
this._set("focused",val);
},setAttribute:function(attr,_8cb){
_8bc.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(attr,_8cb);
},attr:function(name,_8cc){
if(_8b9.isDebug){
var _8cd=arguments.callee._ach||(arguments.callee._ach={}),_8ce=(arguments.callee.caller||"unknown caller").toString();
if(!_8cd[_8ce]){
_8bc.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+_8ce,"","2.0");
_8cd[_8ce]=true;
}
}
var args=arguments.length;
if(args>=2||typeof name==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(name);
}
},getDescendants:function(){
_8bc.deprecated(this.declaredClass+"::getDescendants() is deprecated. Use getChildren() instead.","","2.0");
return this.containerNode?_8bd("[widgetId]",this.containerNode).map(_8bf.byNode):[];
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
if(!_8bc.isAsync){
_8be(0,function(){
var _8cf=["dijit/_base"];
require(_8cf);
});
}
return _8c9;
});
},"dojo/touch":function(){
define("dojo/touch",["./_base/kernel","./on","./has","./mouse"],function(dojo,on,has,_8d0){
function _8d1(type){
return function(node,_8d2){
return on(node,type,_8d2);
};
};
var _8d3=has("touch");
dojo.touch={press:_8d1(_8d3?"touchstart":"mousedown"),move:_8d1(_8d3?"touchmove":"mousemove"),release:_8d1(_8d3?"touchend":"mouseup"),cancel:_8d3?_8d1("touchcancel"):_8d0.leave};
return dojo.touch;
});
},"idx/oneui/form/FilteringSelect":function(){
require({cache:{"url:idx/oneui/form/templates/ComboBox.html":"<div id=\"widget_${id}\" class=\"dijitReset dijitInline idxComposite\" dojoAttachPoint=\"_popupStateNode\"\r\n\t><div class=\"idxLabel dijitInline dijitHidden\"\r\n\t\t><span class=\"idxRequiredIcon\">*&nbsp</span\r\n\t\t><label for=\"${id}\" dojoAttachPoint=\"compLabelNode\"\r\n\t\t></label\r\n\t></div\r\n\t><div class=\"dijitInline\"\r\n\t\t><div class=\"dijit dijitInline dijitReset dijitInlineTable dijitLeft\" role=\"combobox\" dojoAttachPoint=\"stateNode,oneuiBaseNode,_aroundNode\"\r\n\t\t\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer' dojoAttachPoint=\"_buttonNode\" role=\"presentation\"\r\n\t\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t\t\t${_buttonInputDisabled}\r\n\t\t\t/></div\r\n\t\t\t><div class=\"dijitReset dijitInputField dijitInputContainer\" dojoAttachPoint=\"inputContainer\" dojoAttachEvent=\"onmouseenter: _onInputContainerEnter, onmouseleave: _onInputContainerLeave\"\r\n\t\t\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting}  type=\"text\" autocomplete=\"off\" dojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\" \r\n\t\t\t/></div\r\n\t\t></div\r\n\t\t><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"\r\n\t\t></div\r\n\t\t><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\r\n\t\t\t><div class=\"dijitValidationIcon\"\r\n\t\t\t><input class=\"dijitReset dijitInputField  dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n\t\t></div></div\r\n\t\t><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\r\n\t></div\r\n></div>"}});
define("idx/oneui/form/FilteringSelect",["dojo/_base/declare","dojo/_base/lang","dojo/dom-class","dojo/dom-style","dojo/window","dijit/form/FilteringSelect","./_CompositeMixin","./_ValidationMixin","../_CssStateMixin","../HoverHelpTooltip","./TextBox","dojo/text!./templates/ComboBox.html"],function(_8d4,lang,_8d5,_8d6,_8d7,_8d8,_8d9,_8da,_8db,_8dc,_8dd,_8de){
return _8d4("idx.oneui.form.FilteringSelect",[_8d8,_8d9,_8db],{baseClass:"idxFilteringSelectWrap",oneuiBaseClass:"dijitTextBox dijitComboBox",templateString:_8de,selectOnClick:true,missingMessage:"$_unset_$",cssStateNodes:{"_buttonNode":"dijitDownArrowButton"},postCreate:function(){
this.inherited(arguments);
this.messageTooltip=new _8dc({connectId:[this.iconNode],label:this.message,position:this.tooltipPosition,forceFocus:false});
},isValid:function(){
return this.item||(!this.required&&this.get("displayedValue")=="");
},_isEmpty:function(){
return (/^\s*$/.test(this.textbox.value||""));
},_openResultList:function(_8df,_8e0,_8e1){
if(_8e0[this.searchAttr]!==this._lastQuery){
return;
}
this._fetchHandle=null;
if(this.disabled||this.readOnly||(_8e0[this.searchAttr]!==this._lastQuery)){
return;
}
var _8e2=this.dropDown.getHighlightedOption();
this.dropDown.clearResultList();
if(!_8df.length&&_8e1.start==0){
this.closeDropDown();
return;
}
var _8e3=this.dropDown.createOptions(_8df,_8e1,lang.hitch(this,"_getMenuLabelFromItem"));
this._showResultList();
if(!this._lastInput){
for(var i=0;i<_8e3.length;i++){
if(_8e3[i].item){
var _8e4=this.store.getValue(_8e3[i].item,this.searchAttr).toString();
if(_8e4==this.displayedValue){
this.dropDown._setSelectedAttr(_8e3[i]);
_8d7.scrollIntoView(this.dropDown.selected);
break;
}
}
}
}
if(_8e1.direction){
if(1==_8e1.direction){
this.dropDown.highlightFirstOption();
}else{
if(-1==_8e1.direction){
this.dropDown.highlightLastOption();
}
}
if(_8e2){
this._announceOption(this.dropDown.getHighlightedOption());
}
}else{
if(this.autoComplete&&!this._prev_key_backspace&&!/^[*]+$/.test(_8e0[this.searchAttr].toString())){
this._announceOption(_8e3[1]);
}
}
if(this.item===undefined){
this.validate(true);
}
},_onInputContainerEnter:function(){
_8d5.toggle(this.oneuiBaseNode,"dijitComboBoxInputContainerHover",true);
},_onInputContainerLeave:function(){
_8d5.toggle(this.oneuiBaseNode,"dijitComboBoxInputContainerHover",false);
},displayMessage:function(_8e5,_8e6){
if(this.messageTooltip){
this.messageTooltip.set("label",_8e5);
if(_8e5&&this.focused||_8e6){
var node=_8d6.get(this.iconNode,"visibility")=="hidden"?this.oneuiBaseNode:this.iconNode;
this.messageTooltip.open(node);
}else{
this.messageTooltip.close();
}
}
}});
});
},"curam/widget/IDXFilteringSelect":function(){
require({cache:{"url:curam/widget/templates/IDXComboBox.html":"<div id=\"widget_${id}\" class=\"dijitReset dijitInline idxComposite\" dojoAttachPoint=\"_popupStateNode\"\r\n  ><div class=\"idxLabel dijitInline dijitHidden\"\r\n    ><span class=\"idxRequiredIcon\">*&nbsp</span\r\n    ><label for=\"${id}\" dojoAttachPoint=\"compLabelNode\"\r\n    ></label\r\n  ></div\r\n  ><div class=\"dijitInline\"\r\n    ><div class=\"dijit dijitInline dijitReset dijitInlineTable dijitLeft\" role=\"listbox\" dojoAttachPoint=\"stateNode,oneuiBaseNode,_aroundNode\"\r\n      ><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer' dojoAttachPoint=\"_buttonNode\" role=\"presentation\"\r\n      ><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n      ${_buttonInputDisabled}\r\n      /></div\r\n      ><div class=\"dijitReset dijitInputField dijitInputContainer\" role=\"listbox\" dojoAttachPoint=\"inputContainer\" dojoAttachEvent=\"onmouseenter: _onInputContainerEnter, onmouseleave: _onInputContainerLeave\"\r\n        ><input class='dijitReset dijitInputInner' ${!nameAttrSetting}  type=\"text\" autocomplete=\"off\" dojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\" \r\n      /></div\r\n    ></div\r\n    ><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"\r\n    ></div\r\n    ><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\r\n      ><div class=\"dijitValidationIcon\"\r\n      ><input class=\"dijitReset dijitInputField  dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n    ></div></div\r\n    ><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\r\n  ></div\r\n></div>"}});
define("curam/widget/IDXFilteringSelect",["dijit/registry","dojo/on","dojo/text!curam/widget/templates/IDXComboBox.html","idx/oneui/form/FilteringSelect"],function(_8e7,on,_8e8){
var _8e9=dojo.declare("curam.widget.IDXFilteringSelect",idx.oneui.form.FilteringSelect,{templateString:_8e8,enterKeyOnOpenDropDown:false,postCreate:function(){
on(this.focusNode,"keydown",function(e){
var _8ea=_8e7.byNode(dojo.byId("widget_"+e.target.id));
if(e.keyCode==dojo.keys.ENTER&&_8ea._opened){
_8ea.enterKeyOnOpenDropDown=true;
}
});
this.inherited(arguments);
}});
return _8e9;
});
},"dijit/form/_FormValueWidget":function(){
define("dijit/form/_FormValueWidget",["dojo/_base/declare","dojo/_base/sniff","./_FormWidget","./_FormValueMixin"],function(_8eb,has,_8ec,_8ed){
return _8eb("dijit.form._FormValueWidget",[_8ec,_8ed],{_layoutHackIE7:function(){
if(has("ie")==7){
var _8ee=this.domNode;
var _8ef=_8ee.parentNode;
var _8f0=_8ee.firstChild||_8ee;
var _8f1=_8f0.style.filter;
var _8f2=this;
while(_8ef&&_8ef.clientHeight==0){
(function ping(){
var _8f3=_8f2.connect(_8ef,"onscroll",function(){
_8f2.disconnect(_8f3);
_8f0.style.filter=(new Date()).getMilliseconds();
setTimeout(function(){
_8f0.style.filter=_8f1;
},0);
});
})();
_8ef=_8ef.parentNode;
}
}
}});
});
},"url:idx/oneui/form/templates/ComboBox.html":"<div id=\"widget_${id}\" class=\"dijitReset dijitInline idxComposite\" dojoAttachPoint=\"_popupStateNode\"\r\n\t><div class=\"idxLabel dijitInline dijitHidden\"\r\n\t\t><span class=\"idxRequiredIcon\">*&nbsp</span\r\n\t\t><label for=\"${id}\" dojoAttachPoint=\"compLabelNode\"\r\n\t\t></label\r\n\t></div\r\n\t><div class=\"dijitInline\"\r\n\t\t><div class=\"dijit dijitInline dijitReset dijitInlineTable dijitLeft\" role=\"combobox\" dojoAttachPoint=\"stateNode,oneuiBaseNode,_aroundNode\"\r\n\t\t\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer' dojoAttachPoint=\"_buttonNode\" role=\"presentation\"\r\n\t\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t\t\t${_buttonInputDisabled}\r\n\t\t\t/></div\r\n\t\t\t><div class=\"dijitReset dijitInputField dijitInputContainer\" dojoAttachPoint=\"inputContainer\" dojoAttachEvent=\"onmouseenter: _onInputContainerEnter, onmouseleave: _onInputContainerLeave\"\r\n\t\t\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting}  type=\"text\" autocomplete=\"off\" dojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\" \r\n\t\t\t/></div\r\n\t\t></div\r\n\t\t><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"\r\n\t\t></div\r\n\t\t><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\r\n\t\t\t><div class=\"dijitValidationIcon\"\r\n\t\t\t><input class=\"dijitReset dijitInputField  dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n\t\t></div></div\r\n\t\t><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\r\n\t></div\r\n></div>","*now":function(r){
r(["dojo/i18n!*preload*dojo/nls/cdej-ua-ieg*[\"ar\",\"ca\",\"cs\",\"da\",\"de\",\"el\",\"en-gb\",\"en-us\",\"es-es\",\"fi-fi\",\"fr-fr\",\"he-il\",\"hu\",\"it-it\",\"ja-jp\",\"ko-kr\",\"nl-nl\",\"nb\",\"pl\",\"pt-br\",\"pt-pt\",\"ru\",\"sk\",\"sl\",\"sv\",\"th\",\"tr\",\"zh-tw\",\"zh-cn\",\"ROOT\"]"]);
}}});
define("dojo/cdej-ua-ieg",[],1);
