//>>built
require({cache:{"dojo/uacss":function(){
define("dojo/uacss",["./dom-geometry","./_base/lang","./ready","./_base/sniff","./_base/window"],function(_1,_2,_3,_4,_5){
var _6=_5.doc.documentElement,ie=_4("ie"),_7=_4("opera"),_8=Math.floor,ff=_4("ff"),_9=_1.boxModel.replace(/-/,""),_a={"dj_quirks":_4("quirks"),"dj_opera":_7,"dj_khtml":_4("khtml"),"dj_webkit":_4("webkit"),"dj_safari":_4("safari"),"dj_chrome":_4("chrome"),"dj_gecko":_4("mozilla")};
if(ie){
_a["dj_ie"]=true;
_a["dj_ie"+_8(ie)]=true;
_a["dj_iequirks"]=_4("quirks");
}
if(ff){
_a["dj_ff"+_8(ff)]=true;
}
_a["dj_"+_9]=true;
var _b="";
for(var _c in _a){
if(_a[_c]){
_b+=_c+" ";
}
}
_6.className=_2.trim(_6.className+" "+_b);
_3(90,function(){
if(!_1.isBodyLtr()){
var _d="dj_rtl dijitRtl "+_b.replace(/ /g,"-rtl ");
_6.className=_2.trim(_6.className+" "+_d+"dj_rtl dijitRtl "+_b.replace(/ /g,"-rtl "));
}
});
return _4;
});
},"dojo/text":function(){
define("dojo/text",["./_base/kernel","require","./has","./_base/xhr"],function(_e,_f,has,xhr){
var _10;
if(1){
_10=function(url,_11,_12){
xhr("GET",{url:url,sync:!!_11,load:_12});
};
}else{
if(_f.getText){
_10=_f.getText;
}else{
console.error("dojo/text plugin failed to load because loader does not support getText");
}
}
var _13={},_14=function(_15){
if(_15){
_15=_15.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _16=_15.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_16){
_15=_16[1];
}
}else{
_15="";
}
return _15;
},_17={},_18={},_19={dynamic:true,normalize:function(id,_1a){
var _1b=id.split("!"),url=_1b[0];
return (/^\./.test(url)?_1a(url):url)+(_1b[1]?"!"+_1b[1]:"");
},load:function(id,_1c,_1d){
var _1e=id.split("!"),_1f=_1e.length>1,_20=_1e[0],url=_1c.toUrl(_1e[0]),_21=_17,_22=function(_23){
_1d(_1f?_14(_23):_23);
};
if(_20 in _13){
_21=_13[_20];
}else{
if(url in _1c.cache){
_21=_1c.cache[url];
}else{
if(url in _13){
_21=_13[url];
}
}
}
if(_21===_17){
if(_18[url]){
_18[url].push(_22);
}else{
var _24=_18[url]=[_22];
_10(url,!_1c.async,function(_25){
_13[_20]=_13[url]=_25;
for(var i=0;i<_24.length;){
_24[i++](_25);
}
delete _18[url];
});
}
}else{
_22(_21);
}
}};
_e.cache=function(_26,url,_27){
var key;
if(typeof _26=="string"){
if(/\//.test(_26)){
key=_26;
_27=url;
}else{
key=_f.toUrl(_26.replace(/\./g,"/")+(url?("/"+url):""));
}
}else{
key=_26+"";
_27=url;
}
var val=(_27!=undefined&&typeof _27!="string")?_27.value:_27,_28=_27&&_27.sanitize;
if(typeof val=="string"){
_13[key]=val;
return _28?_14(val):val;
}else{
if(val===null){
delete _13[key];
return null;
}else{
if(!(key in _13)){
_10(key,true,function(_29){
_13[key]=_29;
});
}
return _28?_14(_13[key]):_13[key];
}
}
};
return _19;
});
},"dijit/hccss":function(){
define("dijit/hccss",["require","dojo/_base/config","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/ready","dojo/_base/sniff","dojo/_base/window"],function(_2a,_2b,_2c,_2d,_2e,_2f,has,win){
if(has("ie")||has("mozilla")){
_2f(90,function(){
var div=_2d.create("div",{id:"a11yTestNode",style:{cssText:"border: 1px solid;"+"border-color:red green;"+"position: absolute;"+"height: 5px;"+"top: -999px;"+"background-image: url(\""+(_2b.blankGif||_2a.toUrl("dojo/resources/blank.gif"))+"\");"}},win.body());
var cs=_2e.getComputedStyle(div);
if(cs){
var _30=cs.backgroundImage;
var _31=(cs.borderTopColor==cs.borderRightColor)||(_30!=null&&(_30=="none"||_30=="url(invalid-url:)"));
if(_31){
_2c.add(win.body(),"dijit_a11y");
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
},"dijit/_Contained":function(){
define("dijit/_Contained",["dojo/_base/declare","./registry"],function(_32,_33){
return _32("dijit._Contained",null,{_getSibling:function(_34){
var _35=this.domNode;
do{
_35=_35[_34+"Sibling"];
}while(_35&&_35.nodeType!=1);
return _35&&_33.byNode(_35);
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
},"dojo/parser":function(){
define("dojo/parser",["./_base/kernel","./_base/lang","./_base/array","./_base/config","./_base/html","./_base/window","./_base/url","./_base/json","./aspect","./date/stamp","./has","./query","./on","./ready"],function(_36,_37,_38,_39,_3a,_3b,_3c,_3d,_3e,_3f,has,_40,don,_41){
new Date("X");
if(1){
var _42=document.createElement("form");
has.add("dom-attributes-explicit",_42.attributes.length==0);
has.add("dom-attributes-specified-flag",_42.attributes.length<40);
}
_36.parser=new function(){
var _43={};
function _44(_45){
var map={};
for(var _46 in _45){
if(_46.charAt(0)=="_"){
continue;
}
map[_46.toLowerCase()]=_46;
}
return map;
};
_3e.after(_37,"extend",function(){
_43={};
},true);
var _47={};
function _48(_49){
var map=_47[_49]||(_47[_49]={});
return map["__type"]||(map["__type"]=(_37.getObject(_49)||require(_49)));
};
this._functionFromScript=function(_4a,_4b){
var _4c="";
var _4d="";
var _4e=(_4a.getAttribute(_4b+"args")||_4a.getAttribute("args"));
if(_4e){
_38.forEach(_4e.split(/\s*,\s*/),function(_4f,idx){
_4c+="var "+_4f+" = arguments["+idx+"]; ";
});
}
var _50=_4a.getAttribute("with");
if(_50&&_50.length){
_38.forEach(_50.split(/\s*,\s*/),function(_51){
_4c+="with("+_51+"){";
_4d+="}";
});
}
return new Function(_4c+_4a.innerHTML+_4d);
};
this.instantiate=function(_52,_53,_54){
_53=_53||{};
_54=_54||{};
var _55=(_54.scope||_36._scopeName)+"Type",_56="data-"+(_54.scope||_36._scopeName)+"-",_57=_56+"type";
var _58=[];
_38.forEach(_52,function(_59){
var _5a=_55 in _53?_53[_55]:_59.getAttribute(_57)||_59.getAttribute(_55);
if(_5a){
_58.push({node:_59,"type":_5a});
}
});
return this._instantiate(_58,_53,_54);
};
this._instantiate=function(_5b,_5c,_5d){
var _5e=[];
var _5f=(_5d.scope||_36._scopeName)+"Type",_60="data-"+(_5d.scope||_36._scopeName)+"-",_61=_60+"type",_62=_60+"props",_63=_60+"attach-point",_64=_60+"attach-event",_65=_60+"id",_66=_60+"mixins";
var _67={};
_38.forEach([_62,_61,_5f,_65,"jsId",_63,_64,"dojoAttachPoint","dojoAttachEvent","class","style",_66],function(_68){
_67[_68.toLowerCase()]=_68.replace(_5d.scope,"dojo");
});
function _69(_6a,_6b){
return _6a.createSubclass&&_6a.createSubclass(_6b)||_6a.extend.apply(_6a,_6b);
};
_38.forEach(_5b,function(obj){
if(!obj){
return;
}
var _6c=obj.node,_6d=obj.type,_6e=_6c.getAttribute(_66),_6f;
if(_6e){
var map=_47[_6d];
_6e=_6e.replace(/ /g,"");
_6f=map&&map[_6e];
if(!_6f){
_6f=_48(_6d);
_6f=_47[_6d][_6e]=_69(_6f,_38.map(_6e.split(","),_48));
}
}else{
_6f=_48(_6d);
}
var _70=_6f&&_6f.prototype;
var _71={};
if(_5d.defaults){
_37.mixin(_71,_5d.defaults);
}
if(obj.inherited){
_37.mixin(_71,obj.inherited);
}
var _72;
if(has("dom-attributes-explicit")){
_72=_6c.attributes;
}else{
if(has("dom-attributes-specified-flag")){
_72=_38.filter(_6c.attributes,function(a){
return a.specified;
});
}else{
var _73=/^input$|^img$/i.test(_6c.nodeName)?_6c:_6c.cloneNode(false),_74=_73.outerHTML.replace(/=[^\s"']+|="[^"]*"|='[^']*'/g,"").replace(/^\s*<[a-zA-Z0-9]*\s*/,"").replace(/\s*>.*$/,"");
_72=_38.map(_74.split(/\s+/),function(_75){
var _76=_75.toLowerCase();
return {name:_75,value:(_6c.nodeName=="LI"&&_75=="value")||_76=="enctype"?_6c.getAttribute(_76):_6c.getAttributeNode(_76).value};
});
}
}
var i=0,_77;
while(_77=_72[i++]){
var _78=_77.name,_79=_78.toLowerCase(),_7a=_77.value;
if(_79 in _67){
switch(_67[_79]){
case "data-dojo-props":
var _7b=_7a;
break;
case "data-dojo-id":
case "jsId":
var _7c=_7a;
break;
case "data-dojo-attach-point":
case "dojoAttachPoint":
_71.dojoAttachPoint=_7a;
break;
case "data-dojo-attach-event":
case "dojoAttachEvent":
_71.dojoAttachEvent=_7a;
break;
case "class":
_71["class"]=_6c.className;
break;
case "style":
_71["style"]=_6c.style&&_6c.style.cssText;
break;
}
}else{
if(!(_78 in _70)){
var map=(_43[_6d]||(_43[_6d]=_44(_70)));
_78=map[_79]||_78;
}
if(_78 in _70){
switch(typeof _70[_78]){
case "string":
_71[_78]=_7a;
break;
case "number":
_71[_78]=_7a.length?Number(_7a):NaN;
break;
case "boolean":
_71[_78]=_7a.toLowerCase()!="false";
break;
case "function":
if(_7a===""||_7a.search(/[^\w\.]+/i)!=-1){
_71[_78]=new Function(_7a);
}else{
_71[_78]=_37.getObject(_7a,false)||new Function(_7a);
}
break;
default:
var _7d=_70[_78];
_71[_78]=(_7d&&"length" in _7d)?(_7a?_7a.split(/\s*,\s*/):[]):(_7d instanceof Date)?(_7a==""?new Date(""):_7a=="now"?new Date():_3f.fromISOString(_7a)):(_7d instanceof _36._Url)?(_36.baseUrl+_7a):_3d.fromJson(_7a);
}
}else{
_71[_78]=_7a;
}
}
}
if(_7b){
try{
_7b=_3d.fromJson.call(_5d.propsThis,"{"+_7b+"}");
_37.mixin(_71,_7b);
}
catch(e){
throw new Error(e.toString()+" in data-dojo-props='"+_7b+"'");
}
}
_37.mixin(_71,_5c);
var _7e=obj.scripts||(_6f&&(_6f._noScript||_70._noScript)?[]:_40("> script[type^='dojo/']",_6c));
var _7f=[],_80=[],_81=[],on=[];
if(_7e){
for(i=0;i<_7e.length;i++){
var _82=_7e[i];
_6c.removeChild(_82);
var _83=(_82.getAttribute(_60+"event")||_82.getAttribute("event")),_84=_82.getAttribute(_60+"prop"),_85=_82.getAttribute("type"),nf=this._functionFromScript(_82,_60);
if(_83){
if(_85=="dojo/connect"){
_7f.push({event:_83,func:nf});
}else{
if(_85=="dojo/on"){
on.push({event:_83,func:nf});
}else{
_71[_83]=nf;
}
}
}else{
if(_85=="dojo/watch"){
_81.push({prop:_84,func:nf});
}else{
_80.push(nf);
}
}
}
}
var _86=_6f.markupFactory||_70.markupFactory;
var _87=_86?_86(_71,_6c,_6f):new _6f(_71,_6c);
_5e.push(_87);
if(_7c){
_37.setObject(_7c,_87);
}
for(i=0;i<_7f.length;i++){
_3e.after(_87,_7f[i].event,_36.hitch(_87,_7f[i].func),true);
}
for(i=0;i<_80.length;i++){
_80[i].call(_87);
}
for(i=0;i<_81.length;i++){
_87.watch(_81[i].prop,_81[i].func);
}
for(i=0;i<on.length;i++){
don(_87,on[i].event,on[i].func);
}
},this);
if(!_5c._started){
_38.forEach(_5e,function(_88){
if(!_5d.noStart&&_88&&_37.isFunction(_88.startup)&&!_88._started){
_88.startup();
}
});
}
return _5e;
};
this.scan=function(_89,_8a){
var _8b=[];
var _8c=(_8a.scope||_36._scopeName)+"Type",_8d="data-"+(_8a.scope||_36._scopeName)+"-",_8e=_8d+"type",_8f=_8d+"textdir";
var _90=_89.firstChild;
var _91=_8a.inherited;
if(!_91){
function _92(_93,_94){
return (_93.getAttribute&&_93.getAttribute(_94))||(_93!==_3b.doc&&_93!==_3b.doc.documentElement&&_93.parentNode?_92(_93.parentNode,_94):null);
};
_91={dir:_92(_89,"dir"),lang:_92(_89,"lang"),textDir:_92(_89,_8f)};
for(var key in _91){
if(!_91[key]){
delete _91[key];
}
}
}
var _95={inherited:_91};
var _96;
var _97;
function _98(_99){
if(!_99.inherited){
_99.inherited={};
var _9a=_99.node,_9b=_98(_99.parent);
var _9c={dir:_9a.getAttribute("dir")||_9b.dir,lang:_9a.getAttribute("lang")||_9b.lang,textDir:_9a.getAttribute(_8f)||_9b.textDir};
for(var key in _9c){
if(_9c[key]){
_99.inherited[key]=_9c[key];
}
}
}
return _99.inherited;
};
while(true){
if(!_90){
if(!_95||!_95.node){
break;
}
_90=_95.node.nextSibling;
_96=_95.scripts;
_97=false;
_95=_95.parent;
continue;
}
if(_90.nodeType!=1){
_90=_90.nextSibling;
continue;
}
if(_96&&_90.nodeName.toLowerCase()=="script"){
_9d=_90.getAttribute("type");
if(_9d&&/^dojo\/\w/i.test(_9d)){
_96.push(_90);
}
_90=_90.nextSibling;
continue;
}
if(_97){
_90=_90.nextSibling;
continue;
}
var _9d=_90.getAttribute(_8e)||_90.getAttribute(_8c);
var _9e=_90.firstChild;
if(!_9d&&(!_9e||(_9e.nodeType==3&&!_9e.nextSibling))){
_90=_90.nextSibling;
continue;
}
var _9f={node:_90,scripts:_96,parent:_95};
var _a0;
try{
_a0=_9d&&_48(_9d);
}
catch(e){
}
var _a1=_a0&&!_a0.prototype._noScript?[]:null;
if(_9d){
_8b.push({"type":_9d,node:_90,scripts:_a1,inherited:_98(_9f)});
}
_90=_9e;
_96=_a1;
_97=_a0&&_a0.prototype.stopParser&&!(_8a.template);
_95=_9f;
}
return _8b;
};
this.parse=function(_a2,_a3){
var _a4;
if(!_a3&&_a2&&_a2.rootNode){
_a3=_a2;
_a4=_a3.rootNode;
}else{
if(_a2&&_37.isObject(_a2)&&!("nodeType" in _a2)){
_a3=_a2;
}else{
_a4=_a2;
}
}
_a4=_a4?_3a.byId(_a4):_3b.body();
_a3=_a3||{};
var _a5=this.scan(_a4,_a3);
var _a6=_a3.template?{template:true}:{};
return this._instantiate(_a5,_a6,_a3);
};
}();
if(_39.parseOnLoad){
_41(100,_36.parser,"parse");
}
return _36.parser;
});
},"dijit/_Container":function(){
define("dijit/_Container",["dojo/_base/array","dojo/_base/declare","dojo/dom-construct","./registry"],function(_a7,_a8,_a9,_aa){
return _a8("dijit._Container",null,{buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_ab,_ac){
var _ad=this.containerNode;
if(_ac&&typeof _ac=="number"){
var _ae=this.getChildren();
if(_ae&&_ae.length>=_ac){
_ad=_ae[_ac-1].domNode;
_ac="after";
}
}
_a9.place(_ab.domNode,_ad,_ac);
if(this._started&&!_ab._started){
_ab.startup();
}
},removeChild:function(_af){
if(typeof _af=="number"){
_af=this.getChildren()[_af];
}
if(_af){
var _b0=_af.domNode;
if(_b0&&_b0.parentNode){
_b0.parentNode.removeChild(_b0);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},_getSiblingOfChild:function(_b1,dir){
var _b2=_b1.domNode,_b3=(dir>0?"nextSibling":"previousSibling");
do{
_b2=_b2[_b3];
}while(_b2&&(_b2.nodeType!=1||!_aa.byNode(_b2)));
return _b2&&_aa.byNode(_b2);
},getIndexOfChild:function(_b4){
return _a7.indexOf(this.getChildren(),_b4);
}});
});
},"dijit/_base/scroll":function(){
define("dijit/_base/scroll",["dojo/window",".."],function(_b5,_b6){
_b6.scrollIntoView=function(_b7,pos){
_b5.scrollIntoView(_b7,pos);
};
});
},"dijit/layout/_LayoutWidget":function(){
define("dijit/layout/_LayoutWidget",["dojo/_base/lang","../_Widget","../_Container","../_Contained","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/sniff","dojo/_base/window"],function(_b8,_b9,_ba,_bb,_bc,_bd,_be,_bf,has,win){
return _bc("dijit.layout._LayoutWidget",[_b9,_ba,_bb],{baseClass:"dijitLayoutContainer",isLayoutContainer:true,buildRendering:function(){
this.inherited(arguments);
_bd.add(this.domNode,"dijitContainer");
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
var _c0=this.getParent&&this.getParent();
if(!(_c0&&_c0.isLayoutContainer)){
this.resize();
this.connect(win.global,"onresize",function(){
this.resize();
});
}
},resize:function(_c1,_c2){
var _c3=this.domNode;
if(_c1){
_be.setMarginBox(_c3,_c1);
}
var mb=_c2||{};
_b8.mixin(mb,_c1||{});
if(!("h" in mb)||!("w" in mb)){
mb=_b8.mixin(_be.getMarginBox(_c3),mb);
}
var cs=_bf.getComputedStyle(_c3);
var me=_be.getMarginExtents(_c3,cs);
var be=_be.getBorderExtents(_c3,cs);
var bb=(this._borderBox={w:mb.w-(me.w+be.w),h:mb.h-(me.h+be.h)});
var pe=_be.getPadExtents(_c3,cs);
this._contentBox={l:_bf.toPixelValue(_c3,cs.paddingLeft),t:_bf.toPixelValue(_c3,cs.paddingTop),w:bb.w-pe.w,h:bb.h-pe.h};
this.layout();
},layout:function(){
},_setupChild:function(_c4){
var cls=this.baseClass+"-child "+(_c4.baseClass?this.baseClass+"-"+_c4.baseClass:"");
_bd.add(_c4.domNode,cls);
},addChild:function(_c5,_c6){
this.inherited(arguments);
if(this._started){
this._setupChild(_c5);
}
},removeChild:function(_c7){
var cls=this.baseClass+"-child"+(_c7.baseClass?" "+this.baseClass+"-"+_c7.baseClass:"");
_bd.remove(_c7.domNode,cls);
this.inherited(arguments);
}});
});
},"dojo/fx":function(){
define("dojo/fx",["./_base/lang","./Evented","./_base/kernel","./_base/array","./_base/connect","./_base/fx","./dom","./dom-style","./dom-geometry","./ready","require"],function(_c8,_c9,_ca,_cb,_cc,_cd,dom,_ce,_cf,_d0,_d1){
if(!_ca.isAsync){
_d0(0,function(){
var _d2=["./fx/Toggler"];
_d1(_d2);
});
}
var _d3=_ca.fx={};
var _d4={_fire:function(evt,_d5){
if(this[evt]){
this[evt].apply(this,_d5||[]);
}
return this;
}};
var _d6=function(_d7){
this._index=-1;
this._animations=_d7||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
_cb.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
_d6.prototype=new _c9();
_c8.extend(_d6,{_onAnimate:function(){
this._fire("onAnimate",arguments);
},_onEnd:function(){
_cc.disconnect(this._onAnimateCtx);
_cc.disconnect(this._onEndCtx);
this._onAnimateCtx=this._onEndCtx=null;
if(this._index+1==this._animations.length){
this._fire("onEnd");
}else{
this._current=this._animations[++this._index];
this._onAnimateCtx=_cc.connect(this._current,"onAnimate",this,"_onAnimate");
this._onEndCtx=_cc.connect(this._current,"onEnd",this,"_onEnd");
this._current.play(0,true);
}
},play:function(_d8,_d9){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_d9&&this._current.status()=="playing"){
return this;
}
var _da=_cc.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_db=_cc.connect(this._current,"onBegin",this,function(arg){
this._fire("onBegin",arguments);
}),_dc=_cc.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
_cc.disconnect(_da);
_cc.disconnect(_db);
_cc.disconnect(_dc);
});
if(this._onAnimateCtx){
_cc.disconnect(this._onAnimateCtx);
}
this._onAnimateCtx=_cc.connect(this._current,"onAnimate",this,"_onAnimate");
if(this._onEndCtx){
_cc.disconnect(this._onEndCtx);
}
this._onEndCtx=_cc.connect(this._current,"onEnd",this,"_onEnd");
this._current.play.apply(this._current,arguments);
return this;
},pause:function(){
if(this._current){
var e=_cc.connect(this._current,"onPause",this,function(arg){
this._fire("onPause",arguments);
_cc.disconnect(e);
});
this._current.pause();
}
return this;
},gotoPercent:function(_dd,_de){
this.pause();
var _df=this.duration*_dd;
this._current=null;
_cb.some(this._animations,function(a){
if(a.duration<=_df){
this._current=a;
return true;
}
_df-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_df/this._current.duration,_de);
}
return this;
},stop:function(_e0){
if(this._current){
if(_e0){
for(;this._index+1<this._animations.length;++this._index){
this._animations[this._index].stop(true);
}
this._current=this._animations[this._index];
}
var e=_cc.connect(this._current,"onStop",this,function(arg){
this._fire("onStop",arguments);
_cc.disconnect(e);
});
this._current.stop();
}
return this;
},status:function(){
return this._current?this._current.status():"stopped";
},destroy:function(){
if(this._onAnimateCtx){
_cc.disconnect(this._onAnimateCtx);
}
if(this._onEndCtx){
_cc.disconnect(this._onEndCtx);
}
}});
_c8.extend(_d6,_d4);
_d3.chain=function(_e1){
return new _d6(_e1);
};
var _e2=function(_e3){
this._animations=_e3||[];
this._connects=[];
this._finished=0;
this.duration=0;
_cb.forEach(_e3,function(a){
var _e4=a.duration;
if(a.delay){
_e4+=a.delay;
}
if(this.duration<_e4){
this.duration=_e4;
}
this._connects.push(_cc.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new _cd.Animation({curve:[0,1],duration:this.duration});
var _e5=this;
_cb.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop","onEnd"],function(evt){
_e5._connects.push(_cc.connect(_e5._pseudoAnimation,evt,function(){
_e5._fire(evt,arguments);
}));
});
};
_c8.extend(_e2,{_doAction:function(_e6,_e7){
_cb.forEach(this._animations,function(a){
a[_e6].apply(a,_e7);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_e8,_e9){
var t=this._pseudoAnimation;
t[_e8].apply(t,_e9);
},play:function(_ea,_eb){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_ec,_ed){
var ms=this.duration*_ec;
_cb.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_ed);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_ee){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
_cb.forEach(this._connects,_cc.disconnect);
}});
_c8.extend(_e2,_d4);
_d3.combine=function(_ef){
return new _e2(_ef);
};
_d3.wipeIn=function(_f0){
var _f1=_f0.node=dom.byId(_f0.node),s=_f1.style,o;
var _f2=_cd.animateProperty(_c8.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _f3=_ce.get(_f1,"height");
return Math.max(_f3,1);
}
},end:function(){
return _f1.scrollHeight;
}}}},_f0));
var _f4=function(){
s.height="auto";
s.overflow=o;
};
_cc.connect(_f2,"onStop",_f4);
_cc.connect(_f2,"onEnd",_f4);
return _f2;
};
_d3.wipeOut=function(_f5){
var _f6=_f5.node=dom.byId(_f5.node),s=_f6.style,o;
var _f7=_cd.animateProperty(_c8.mixin({properties:{height:{end:1}}},_f5));
_cc.connect(_f7,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
var _f8=function(){
s.overflow=o;
s.height="auto";
s.display="none";
};
_cc.connect(_f7,"onStop",_f8);
_cc.connect(_f7,"onEnd",_f8);
return _f7;
};
_d3.slideTo=function(_f9){
var _fa=_f9.node=dom.byId(_f9.node),top=null,_fb=null;
var _fc=(function(n){
return function(){
var cs=_ce.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
_fb=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=_cf.position(n,true);
top=ret.y;
_fb=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=_fb+"px";
}
};
})(_fa);
_fc();
var _fd=_cd.animateProperty(_c8.mixin({properties:{top:_f9.top||0,left:_f9.left||0}},_f9));
_cc.connect(_fd,"beforeBegin",_fd,_fc);
return _fd;
};
return _d3;
});
},"dojo/fx/Toggler":function(){
define("dojo/fx/Toggler",["../_base/lang","../_base/declare","../_base/fx","../_base/connect"],function(_fe,_ff,_100,_101){
return _ff("dojo.fx.Toggler",null,{node:null,showFunc:_100.fadeIn,hideFunc:_100.fadeOut,showDuration:200,hideDuration:200,constructor:function(args){
var _102=this;
_fe.mixin(_102,args);
_102.node=args.node;
_102._showArgs=_fe.mixin({},args);
_102._showArgs.node=_102.node;
_102._showArgs.duration=_102.showDuration;
_102.showAnim=_102.showFunc(_102._showArgs);
_102._hideArgs=_fe.mixin({},args);
_102._hideArgs.node=_102.node;
_102._hideArgs.duration=_102.hideDuration;
_102.hideAnim=_102.hideFunc(_102._hideArgs);
_101.connect(_102.showAnim,"beforeBegin",_fe.hitch(_102.hideAnim,"stop",true));
_101.connect(_102.hideAnim,"beforeBegin",_fe.hitch(_102.showAnim,"stop",true));
},show:function(_103){
return this.showAnim.play(_103||0);
},hide:function(_104){
return this.hideAnim.play(_104||0);
}});
});
},"dijit/_base":function(){
define("dijit/_base",[".","./a11y","./WidgetSet","./_base/focus","./_base/manager","./_base/place","./_base/popup","./_base/scroll","./_base/sniff","./_base/typematic","./_base/wai","./_base/window"],function(_105){
return _105._base;
});
},"dijit/form/_FormWidgetMixin":function(){
define("dijit/form/_FormWidgetMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-style","dojo/_base/lang","dojo/mouse","dojo/_base/sniff","dojo/_base/window","dojo/window","../a11y"],function(_106,_107,_108,_109,lang,_10a,has,win,_10b,a11y){
return _107("dijit.form._FormWidgetMixin",null,{name:"",alt:"",value:"",type:"text",tabIndex:"0",_setTabIndexAttr:"focusNode",disabled:false,intermediateChanges:false,scrollOnFocus:true,_setIdAttr:"focusNode",_setDisabledAttr:function(_10c){
this._set("disabled",_10c);
_108.set(this.focusNode,"disabled",_10c);
if(this.valueNode){
_108.set(this.valueNode,"disabled",_10c);
}
this.focusNode.setAttribute("aria-disabled",_10c?"true":"false");
if(_10c){
this._set("hovering",false);
this._set("active",false);
var _10d="tabIndex" in this.attributeMap?this.attributeMap.tabIndex:("_setTabIndexAttr" in this)?this._setTabIndexAttr:"focusNode";
_106.forEach(lang.isArray(_10d)?_10d:[_10d],function(_10e){
var node=this[_10e];
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
var _10f=this.connect(this.focusNode,"onfocus",function(){
this.disconnect(_110);
this.disconnect(_10f);
});
var _110=this.connect(win.body(),"onmouseup",function(){
this.disconnect(_110);
this.disconnect(_10f);
if(this.focused){
this.focus();
}
});
}
if(this.scrollOnFocus){
this.defer(function(){
_10b.scrollIntoView(this.domNode);
});
}
this.inherited(arguments);
},isFocusable:function(){
return !this.disabled&&this.focusNode&&(_109.get(this.domNode,"display")!="none");
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
},_onChangeActive:false,_handleOnChange:function(_111,_112){
if(this._lastValueReported==undefined&&(_112===null||!this._onChangeActive)){
this._resetValue=this._lastValueReported=_111;
}
this._pendingOnChange=this._pendingOnChange||(typeof _111!=typeof this._lastValueReported)||(this.compare(_111,this._lastValueReported)!=0);
if((this.intermediateChanges||_112||_112===undefined)&&this._pendingOnChange){
this._lastValueReported=_111;
this._pendingOnChange=false;
if(this._onChangeActive){
if(this._onChangeHandle){
this._onChangeHandle.remove();
}
this._onChangeHandle=this.defer(function(){
this._onChangeHandle=null;
this.onChange(_111);
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
},"dijit/BackgroundIframe":function(){
define("dijit/BackgroundIframe",["require",".","dojo/_base/config","dojo/dom-construct","dojo/dom-style","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window"],function(_113,_114,_115,_116,_117,lang,on,has,win){
has.add("bgIframe",has("ie")||has("mozilla"));
var _118=new function(){
var _119=[];
this.pop=function(){
var _11a;
if(_119.length){
_11a=_119.pop();
_11a.style.display="";
}else{
if(has("ie")<9){
var burl=_115["dojoBlankHtmlUrl"]||_113.toUrl("dojo/resources/blank.html")||"javascript:\"\"";
var html="<iframe src='"+burl+"' role='presentation'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_11a=win.doc.createElement(html);
}else{
_11a=_116.create("iframe");
_11a.src="javascript:\"\"";
_11a.className="dijitBackgroundIframe";
_11a.setAttribute("role","presentation");
_117.set(_11a,"opacity",0.1);
}
_11a.tabIndex=-1;
}
return _11a;
};
this.push=function(_11b){
_11b.style.display="none";
_119.push(_11b);
};
}();
_114.BackgroundIframe=function(node){
if(!node.id){
throw new Error("no id");
}
if(has("bgIframe")){
var _11c=(this.iframe=_118.pop());
node.appendChild(_11c);
if(has("ie")<7||has("quirks")){
this.resize(node);
this._conn=on(node,"resize",lang.hitch(this,function(){
this.resize(node);
}));
}else{
_117.set(_11c,{width:"100%",height:"100%"});
}
}
};
lang.extend(_114.BackgroundIframe,{resize:function(node){
if(this.iframe){
_117.set(this.iframe,{width:node.offsetWidth+"px",height:node.offsetHeight+"px"});
}
},destroy:function(){
if(this._conn){
this._conn.remove();
this._conn=null;
}
if(this.iframe){
_118.push(this.iframe);
delete this.iframe;
}
}});
return _114.BackgroundIframe;
});
},"dijit/form/_FormValueMixin":function(){
define("dijit/form/_FormValueMixin",["dojo/_base/declare","dojo/dom-attr","dojo/keys","dojo/_base/sniff","./_FormWidgetMixin"],function(_11d,_11e,keys,has,_11f){
return _11d("dijit.form._FormValueMixin",_11f,{readOnly:false,_setReadOnlyAttr:function(_120){
_11e.set(this.focusNode,"readOnly",_120);
this._set("readOnly",_120);
},postCreate:function(){
this.inherited(arguments);
if(has("ie")){
this.connect(this.focusNode||this.domNode,"onkeydown",this._onKeyDown);
}
if(this._resetValue===undefined){
this._lastValueReported=this._resetValue=this.value;
}
},_setValueAttr:function(_121,_122){
this._handleOnChange(_121,_122);
},_handleOnChange:function(_123,_124){
this._set("value",_123);
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
},"dojo/Stateful":function(){
define("dojo/Stateful",["./_base/declare","./_base/lang","./_base/array"],function(_125,lang,_126){
return _125("dojo.Stateful",null,{postscript:function(_127){
if(_127){
lang.mixin(this,_127);
}
},get:function(name){
return this[name];
},set:function(name,_128){
if(typeof name==="object"){
for(var x in name){
if(name.hasOwnProperty(x)&&x!="_watchCallbacks"){
this.set(x,name[x]);
}
}
return this;
}
var _129=this[name];
this[name]=_128;
if(this._watchCallbacks){
this._watchCallbacks(name,_129,_128);
}
return this;
},watch:function(name,_12a){
var _12b=this._watchCallbacks;
if(!_12b){
var self=this;
_12b=this._watchCallbacks=function(name,_12c,_12d,_12e){
var _12f=function(_130){
if(_130){
_130=_130.slice();
for(var i=0,l=_130.length;i<l;i++){
_130[i].call(self,name,_12c,_12d);
}
}
};
_12f(_12b["_"+name]);
if(!_12e){
_12f(_12b["*"]);
}
};
}
if(!_12a&&typeof name==="function"){
_12a=name;
name="*";
}else{
name="_"+name;
}
var _131=_12b[name];
if(typeof _131!=="object"){
_131=_12b[name]=[];
}
_131.push(_12a);
return {unwatch:function(){
_131.splice(_126.indexOf(_131,_12a),1);
}};
}});
});
},"dojo/touch":function(){
define("dojo/touch",["./_base/kernel","./on","./has","./mouse"],function(dojo,on,has,_132){
function _133(type){
return function(node,_134){
return on(node,type,_134);
};
};
var _135=has("touch");
dojo.touch={press:_133(_135?"touchstart":"mousedown"),move:_133(_135?"touchmove":"mousemove"),release:_133(_135?"touchend":"mouseup"),cancel:_135?_133("touchcancel"):_132.leave};
return dojo.touch;
});
},"dijit/_CssStateMixin":function(){
define("dijit/_CssStateMixin",["dojo/touch","dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/_base/lang","dojo/_base/window"],function(_136,_137,_138,_139,lang,win){
return _138("dijit._CssStateMixin",[],{cssStateNodes:{},hovering:false,active:false,_applyAttributes:function(){
this.inherited(arguments);
_137.forEach(["onmouseenter","onmouseleave",_136.press],function(e){
this.connect(this.domNode,e,"_cssMouseEvent");
},this);
_137.forEach(["disabled","readOnly","checked","selected","focused","state","hovering","active"],function(attr){
this.watch(attr,lang.hitch(this,"_setStateClass"));
},this);
for(var ap in this.cssStateNodes){
this._trackMouseState(this[ap],this.cssStateNodes[ap]);
}
this._setStateClass();
},_cssMouseEvent:function(_13a){
if(!this.disabled){
switch(_13a.type){
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
var _13b=this.connect(win.body(),_136.release,function(){
this._mouseDown=false;
this._set("active",false);
this.disconnect(_13b);
});
break;
}
}
},_setStateClass:function(){
var _13c=this.baseClass.split(" ");
function _13d(_13e){
_13c=_13c.concat(_137.map(_13c,function(c){
return c+_13e;
}),"dijit"+_13e);
};
if(!this.isLeftToRight()){
_13d("Rtl");
}
var _13f=this.checked=="mixed"?"Mixed":(this.checked?"Checked":"");
if(this.checked){
_13d(_13f);
}
if(this.state){
_13d(this.state);
}
if(this.selected){
_13d("Selected");
}
if(this.disabled){
_13d("Disabled");
}else{
if(this.readOnly){
_13d("ReadOnly");
}else{
if(this.active){
_13d("Active");
}else{
if(this.hovering){
_13d("Hover");
}
}
}
}
if(this.focused){
_13d("Focused");
}
var tn=this.stateNode||this.domNode,_140={};
_137.forEach(tn.className.split(" "),function(c){
_140[c]=true;
});
if("_stateClasses" in this){
_137.forEach(this._stateClasses,function(c){
delete _140[c];
});
}
_137.forEach(_13c,function(c){
_140[c]=true;
});
var _141=[];
for(var c in _140){
_141.push(c);
}
var cls=_141.join(" ");
if(cls!=tn.className){
tn.className=cls;
}
this._stateClasses=_13c;
},_trackMouseState:function(node,_142){
var _143=false,_144=false,_145=false;
var self=this,cn=lang.hitch(this,"connect",node);
function _146(){
var _147=("disabled" in self&&self.disabled)||("readonly" in self&&self.readonly);
_139.toggle(node,_142+"Hover",_143&&!_144&&!_147);
_139.toggle(node,_142+"Active",_144&&!_147);
_139.toggle(node,_142+"Focused",_145&&!_147);
};
cn("onmouseenter",function(){
_143=true;
_146();
});
cn("onmouseleave",function(){
_143=false;
_144=false;
_146();
});
cn(_136.press,function(){
_144=true;
_146();
});
cn(_136.release,function(){
_144=false;
_146();
});
cn("onfocus",function(){
_145=true;
_146();
});
cn("onblur",function(){
_145=false;
_146();
});
this.watch("disabled",_146);
this.watch("readOnly",_146);
}});
});
},"dojo/_base/url":function(){
define("dojo/_base/url",["./kernel"],function(dojo){
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$"),_148=function(){
var n=null,_149=arguments,uri=[_149[0]];
for(var i=1;i<_149.length;i++){
if(!_149[i]){
continue;
}
var _14a=new _148(_149[i]+""),_14b=new _148(uri[0]+"");
if(_14a.path==""&&!_14a.scheme&&!_14a.authority&&!_14a.query){
if(_14a.fragment!=n){
_14b.fragment=_14a.fragment;
}
_14a=_14b;
}else{
if(!_14a.scheme){
_14a.scheme=_14b.scheme;
if(!_14a.authority){
_14a.authority=_14b.authority;
if(_14a.path.charAt(0)!="/"){
var path=_14b.path.substring(0,_14b.path.lastIndexOf("/")+1)+_14a.path;
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
_14a.path=segs.join("/");
}
}
}
}
uri=[];
if(_14a.scheme){
uri.push(_14a.scheme,":");
}
if(_14a.authority){
uri.push("//",_14a.authority);
}
uri.push(_14a.path);
if(_14a.query){
uri.push("?",_14a.query);
}
if(_14a.fragment){
uri.push("#",_14a.fragment);
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
_148.prototype.toString=function(){
return this.uri;
};
return dojo._Url=_148;
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
dojo.string.substitute=function(_14c,map,_14d,_14e){
_14e=_14e||dojo.global;
_14d=_14d?lang.hitch(_14e,_14d):function(v){
return v;
};
return _14c.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_14f,key,_150){
var _151=lang.getObject(key,false,map);
if(_150){
_151=lang.getObject(_150,false,_14e).call(_14e,_151,key);
}
return _14d(_151,key).toString();
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
},"dijit/form/_FormValueWidget":function(){
define("dijit/form/_FormValueWidget",["dojo/_base/declare","dojo/_base/sniff","./_FormWidget","./_FormValueMixin"],function(_152,has,_153,_154){
return _152("dijit.form._FormValueWidget",[_153,_154],{_layoutHackIE7:function(){
if(has("ie")==7){
var _155=this.domNode;
var _156=_155.parentNode;
var _157=_155.firstChild||_155;
var _158=_157.style.filter;
var _159=this;
while(_156&&_156.clientHeight==0){
(function ping(){
var _15a=_159.connect(_156,"onscroll",function(){
_159.disconnect(_15a);
_157.style.filter=(new Date()).getMilliseconds();
setTimeout(function(){
_157.style.filter=_158;
},0);
});
})();
_156=_156.parentNode;
}
}
}});
});
},"dijit/registry":function(){
define("dijit/registry",["dojo/_base/array","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window","."],function(_15b,has,_15c,win,_15d){
var _15e={},hash={};
var _15f={length:0,add:function(_160){
if(hash[_160.id]){
throw new Error("Tried to register widget with id=="+_160.id+" but that id is already registered");
}
hash[_160.id]=_160;
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
},getUniqueId:function(_161){
var id;
do{
id=_161+"_"+(_161 in _15e?++_15e[_161]:_15e[_161]=0);
}while(hash[id]);
return _15d._scopeName=="dijit"?id:_15d._scopeName+"_"+id;
},findWidgets:function(root){
var _162=[];
function _163(root){
for(var node=root.firstChild;node;node=node.nextSibling){
if(node.nodeType==1){
var _164=node.getAttribute("widgetId");
if(_164){
var _165=hash[_164];
if(_165){
_162.push(_165);
}
}else{
_163(node);
}
}
}
};
_163(root);
return _162;
},_destroyAll:function(){
_15d._curFocus=null;
_15d._prevFocus=null;
_15d._activeStack=[];
_15b.forEach(_15f.findWidgets(win.body()),function(_166){
if(!_166._destroyed){
if(_166.destroyRecursive){
_166.destroyRecursive();
}else{
if(_166.destroy){
_166.destroy();
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
_15d.registry=_15f;
return _15f;
});
},"dijit/_base/manager":function(){
define("dijit/_base/manager",["dojo/_base/array","dojo/_base/config","../registry",".."],function(_167,_168,_169,_16a){
_167.forEach(["byId","getUniqueId","findWidgets","_destroyAll","byNode","getEnclosingWidget"],function(name){
_16a[name]=_169[name];
});
_16a.defaultDuration=_168["defaultDuration"]||200;
return _16a;
});
},"dijit/_base/place":function(){
define("dijit/_base/place",["dojo/_base/array","dojo/_base/lang","dojo/window","../place",".."],function(_16b,lang,_16c,_16d,_16e){
_16e.getViewport=function(){
return _16c.getBox();
};
_16e.placeOnScreen=_16d.at;
_16e.placeOnScreenAroundElement=function(node,_16f,_170,_171){
var _172;
if(lang.isArray(_170)){
_172=_170;
}else{
_172=[];
for(var key in _170){
_172.push({aroundCorner:key,corner:_170[key]});
}
}
return _16d.around(node,_16f,_172,true,_171);
};
_16e.placeOnScreenAroundNode=_16e.placeOnScreenAroundElement;
_16e.placeOnScreenAroundRectangle=_16e.placeOnScreenAroundElement;
_16e.getPopupAroundAlignment=function(_173,_174){
var _175={};
_16b.forEach(_173,function(pos){
var ltr=_174;
switch(pos){
case "after":
_175[_174?"BR":"BL"]=_174?"BL":"BR";
break;
case "before":
_175[_174?"BL":"BR"]=_174?"BR":"BL";
break;
case "below-alt":
ltr=!ltr;
case "below":
_175[ltr?"BL":"BR"]=ltr?"TL":"TR";
_175[ltr?"BR":"BL"]=ltr?"TR":"TL";
break;
case "above-alt":
ltr=!ltr;
case "above":
default:
_175[ltr?"TL":"TR"]=ltr?"BL":"BR";
_175[ltr?"TR":"TL"]=ltr?"BR":"BL";
break;
}
});
return _175;
};
return _16e;
});
},"dijit/WidgetSet":function(){
define("dijit/WidgetSet",["dojo/_base/array","dojo/_base/declare","dojo/_base/window","./registry"],function(_176,_177,win,_178){
var _179=_177("dijit.WidgetSet",null,{constructor:function(){
this._hash={};
this.length=0;
},add:function(_17a){
if(this._hash[_17a.id]){
throw new Error("Tried to register widget with id=="+_17a.id+" but that id is already registered");
}
this._hash[_17a.id]=_17a;
this.length++;
},remove:function(id){
if(this._hash[id]){
delete this._hash[id];
this.length--;
}
},forEach:function(func,_17b){
_17b=_17b||win.global;
var i=0,id;
for(id in this._hash){
func.call(_17b,this._hash[id],i++,this._hash);
}
return this;
},filter:function(_17c,_17d){
_17d=_17d||win.global;
var res=new _179(),i=0,id;
for(id in this._hash){
var w=this._hash[id];
if(_17c.call(_17d,w,i++,this._hash)){
res.add(w);
}
}
return res;
},byId:function(id){
return this._hash[id];
},byClass:function(cls){
var res=new _179(),id,_17e;
for(id in this._hash){
_17e=this._hash[id];
if(_17e.declaredClass==cls){
res.add(_17e);
}
}
return res;
},toArray:function(){
var ar=[];
for(var id in this._hash){
ar.push(this._hash[id]);
}
return ar;
},map:function(func,_17f){
return _176.map(this.toArray(),func,_17f);
},every:function(func,_180){
_180=_180||win.global;
var x=0,i;
for(i in this._hash){
if(!func.call(_180,this._hash[i],x++,this._hash)){
return false;
}
}
return true;
},some:function(func,_181){
_181=_181||win.global;
var x=0,i;
for(i in this._hash){
if(func.call(_181,this._hash[i],x++,this._hash)){
return true;
}
}
return false;
}});
_176.forEach(["forEach","filter","byClass","map","every","some"],function(func){
_178[func]=_179.prototype[func];
});
return _179;
});
},"dijit/a11y":function(){
define("dijit/a11y",["dojo/_base/array","dojo/_base/config","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-style","dojo/_base/sniff","./_base/manager","."],function(_182,_183,_184,dom,_185,_186,has,_187,_188){
var _189=(_188._isElementShown=function(elem){
var s=_186.get(elem);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(_185.get(elem,"type")!="hidden");
});
_188.hasDefaultTabStop=function(elem){
switch(elem.nodeName.toLowerCase()){
case "a":
return _185.has(elem,"href");
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
var _18a=elem.contentDocument;
if("designMode" in _18a&&_18a.designMode=="on"){
return true;
}
body=_18a.body;
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
var _18b=(_188.isTabNavigable=function(elem){
if(_185.get(elem,"disabled")){
return false;
}else{
if(_185.has(elem,"tabIndex")){
return _185.get(elem,"tabIndex")>=0;
}else{
return _188.hasDefaultTabStop(elem);
}
}
});
_188._getTabNavigable=function(root){
var _18c,last,_18d,_18e,_18f,_190,_191={};
function _192(node){
return node&&node.tagName.toLowerCase()=="input"&&node.type&&node.type.toLowerCase()=="radio"&&node.name&&node.name.toLowerCase();
};
var _193=function(_194){
for(var _195=_194.firstChild;_195;_195=_195.nextSibling){
if(_195.nodeType!=1||(has("ie")<=9&&_195.scopeName!=="HTML")||!_189(_195)){
continue;
}
if(_18b(_195)){
var _196=_185.get(_195,"tabIndex");
if(!_185.has(_195,"tabIndex")||_196==0){
if(!_18c){
_18c=_195;
}
last=_195;
}else{
if(_196>0){
if(!_18d||_196<_18e){
_18e=_196;
_18d=_195;
}
if(!_18f||_196>=_190){
_190=_196;
_18f=_195;
}
}
}
var rn=_192(_195);
if(_185.get(_195,"checked")&&rn){
_191[rn]=_195;
}
}
if(_195.nodeName.toUpperCase()!="SELECT"){
_193(_195);
}
}
};
if(_189(root)){
_193(root);
}
function rs(node){
return _191[_192(node)]||node;
};
return {first:rs(_18c),last:rs(last),lowest:rs(_18d),highest:rs(_18f)};
};
_188.getFirstInTabbingOrder=function(root){
var _197=_188._getTabNavigable(dom.byId(root));
return _197.lowest?_197.lowest:_197.first;
};
_188.getLastInTabbingOrder=function(root){
var _198=_188._getTabNavigable(dom.byId(root));
return _198.last?_198.last:_198.highest;
};
return {hasDefaultTabStop:_188.hasDefaultTabStop,isTabNavigable:_188.isTabNavigable,_getTabNavigable:_188._getTabNavigable,getFirstInTabbingOrder:_188.getFirstInTabbingOrder,getLastInTabbingOrder:_188.getLastInTabbingOrder};
});
},"dijit/typematic":function(){
define("dijit/typematic",["dojo/_base/array","dojo/_base/connect","dojo/_base/event","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/_base/sniff","."],function(_199,_19a,_19b,_19c,lang,on,has,_19d){
var _19e=(_19d.typematic={_fireEventAndReload:function(){
this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=Math.max(this._currentTimeout<0?this._initialDelay:(this._subsequentDelay>1?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay)),this._minDelay);
this._timer=setTimeout(lang.hitch(this,"_fireEventAndReload"),this._currentTimeout);
},trigger:function(evt,_19f,node,_1a0,obj,_1a1,_1a2,_1a3){
if(obj!=this._obj){
this.stop();
this._initialDelay=_1a2||500;
this._subsequentDelay=_1a1||0.9;
this._minDelay=_1a3||10;
this._obj=obj;
this._evt=evt;
this._node=node;
this._currentTimeout=-1;
this._count=-1;
this._callback=lang.hitch(_19f,_1a0);
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
},addKeyListener:function(node,_1a4,_1a5,_1a6,_1a7,_1a8,_1a9){
if(_1a4.keyCode){
_1a4.charOrCode=_1a4.keyCode;
_19c.deprecated("keyCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}else{
if(_1a4.charCode){
_1a4.charOrCode=String.fromCharCode(_1a4.charCode);
_19c.deprecated("charCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}
}
var _1aa=[on(node,_19a._keypress,lang.hitch(this,function(evt){
if(evt.charOrCode==_1a4.charOrCode&&(_1a4.ctrlKey===undefined||_1a4.ctrlKey==evt.ctrlKey)&&(_1a4.altKey===undefined||_1a4.altKey==evt.altKey)&&(_1a4.metaKey===undefined||_1a4.metaKey==(evt.metaKey||false))&&(_1a4.shiftKey===undefined||_1a4.shiftKey==evt.shiftKey)){
_19b.stop(evt);
_19e.trigger(evt,_1a5,node,_1a6,_1a4,_1a7,_1a8,_1a9);
}else{
if(_19e._obj==_1a4){
_19e.stop();
}
}
})),on(node,"keyup",lang.hitch(this,function(){
if(_19e._obj==_1a4){
_19e.stop();
}
}))];
return {remove:function(){
_199.forEach(_1aa,function(h){
h.remove();
});
}};
},addMouseListener:function(node,_1ab,_1ac,_1ad,_1ae,_1af){
var _1b0=[on(node,"mousedown",lang.hitch(this,function(evt){
_19b.stop(evt);
_19e.trigger(evt,_1ab,node,_1ac,node,_1ad,_1ae,_1af);
})),on(node,"mouseup",lang.hitch(this,function(evt){
if(this._obj){
_19b.stop(evt);
}
_19e.stop();
})),on(node,"mouseout",lang.hitch(this,function(evt){
_19b.stop(evt);
_19e.stop();
})),on(node,"mousemove",lang.hitch(this,function(evt){
evt.preventDefault();
})),on(node,"dblclick",lang.hitch(this,function(evt){
_19b.stop(evt);
if(has("ie")<9){
_19e.trigger(evt,_1ab,node,_1ac,node,_1ad,_1ae,_1af);
setTimeout(lang.hitch(this,_19e.stop),50);
}
}))];
return {remove:function(){
_199.forEach(_1b0,function(h){
h.remove();
});
}};
},addListener:function(_1b1,_1b2,_1b3,_1b4,_1b5,_1b6,_1b7,_1b8){
var _1b9=[this.addKeyListener(_1b2,_1b3,_1b4,_1b5,_1b6,_1b7,_1b8),this.addMouseListener(_1b1,_1b4,_1b5,_1b6,_1b7,_1b8)];
return {remove:function(){
_199.forEach(_1b9,function(h){
h.remove();
});
}};
}});
return _19e;
});
},"dijit/_base/focus":function(){
define("dijit/_base/focus",["dojo/_base/array","dojo/dom","dojo/_base/lang","dojo/topic","dojo/_base/window","../focus",".."],function(_1ba,dom,lang,_1bb,win,_1bc,_1bd){
lang.mixin(_1bd,{_curFocus:null,_prevFocus:null,isCollapsed:function(){
return _1bd.getBookmark().isCollapsed;
},getBookmark:function(){
var bm,rg,tg,sel=win.doc.selection,cf=_1bc.curNode;
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
},moveToBookmark:function(_1be){
var _1bf=win.doc,mark=_1be.mark;
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
if(_1bf.selection&&mark){
var rg;
if(mark.pRange){
rg=mark.range;
}else{
if(lang.isArray(mark)){
rg=_1bf.body.createControlRange();
_1ba.forEach(mark,function(n){
rg.addElement(n);
});
}else{
rg=_1bf.body.createTextRange();
rg.moveToBookmark(mark);
}
}
rg.select();
}
}
}
},getFocus:function(menu,_1c0){
var node=!_1bc.curNode||(menu&&dom.isDescendant(_1bc.curNode,menu.domNode))?_1bd._prevFocus:_1bc.curNode;
return {node:node,bookmark:node&&(node==_1bc.curNode)&&win.withGlobal(_1c0||win.global,_1bd.getBookmark),openedForWindow:_1c0};
},_activeStack:[],registerIframe:function(_1c1){
return _1bc.registerIframe(_1c1);
},unregisterIframe:function(_1c2){
_1c2&&_1c2.remove();
},registerWin:function(_1c3,_1c4){
return _1bc.registerWin(_1c3,_1c4);
},unregisterWin:function(_1c5){
_1c5&&_1c5.remove();
}});
_1bc.focus=function(_1c6){
if(!_1c6){
return;
}
var node="node" in _1c6?_1c6.node:_1c6,_1c7=_1c6.bookmark,_1c8=_1c6.openedForWindow,_1c9=_1c7?_1c7.isCollapsed:false;
if(node){
var _1ca=(node.tagName.toLowerCase()=="iframe")?node.contentWindow:node;
if(_1ca&&_1ca.focus){
try{
_1ca.focus();
}
catch(e){
}
}
_1bc._onFocusNode(node);
}
if(_1c7&&win.withGlobal(_1c8||win.global,_1bd.isCollapsed)&&!_1c9){
if(_1c8){
_1c8.focus();
}
try{
win.withGlobal(_1c8||win.global,_1bd.moveToBookmark,null,[_1c7]);
}
catch(e2){
}
}
};
_1bc.watch("curNode",function(name,_1cb,_1cc){
_1bd._curFocus=_1cc;
_1bd._prevFocus=_1cb;
if(_1cc){
_1bb.publish("focusNode",_1cc);
}
});
_1bc.watch("activeStack",function(name,_1cd,_1ce){
_1bd._activeStack=_1ce;
});
_1bc.on("widget-blur",function(_1cf,by){
_1bb.publish("widgetBlur",_1cf,by);
});
_1bc.on("widget-focus",function(_1d0,by){
_1bb.publish("widgetFocus",_1d0,by);
});
return _1bd;
});
},"dijit/place":function(){
define("dijit/place",["dojo/_base/array","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/window","dojo/window",".","dojo/_base/lang"],function(_1d1,_1d2,_1d3,_1d4,win,_1d5,_1d6,lang){
function _1d7(node,_1d8,_1d9,_1da){
var view=_1d5.getBox();
if(!node.parentNode||String(node.parentNode.tagName).toLowerCase()!="body"){
win.body().appendChild(node);
}
var best=null;
_1d1.some(_1d8,function(_1db){
var _1dc=_1db.corner;
var pos=_1db.pos;
var _1dd=0;
var _1de={w:{"L":view.l+view.w-pos.x,"R":pos.x-view.l,"M":view.w}[_1dc.charAt(1)],h:{"T":view.t+view.h-pos.y,"B":pos.y-view.t,"M":view.h}[_1dc.charAt(0)]};
if(_1d9){
var res=_1d9(node,_1db.aroundCorner,_1dc,_1de,_1da);
_1dd=typeof res=="undefined"?0:res;
}
var _1df=node.style;
var _1e0=_1df.display;
var _1e1=_1df.visibility;
if(_1df.display=="none"){
_1df.visibility="hidden";
_1df.display="";
}
var mb=_1d2.getMarginBox(node);
_1df.display=_1e0;
_1df.visibility=_1e1;
var _1e2={"L":pos.x,"R":pos.x-mb.w,"M":Math.max(view.l,Math.min(view.l+view.w,pos.x+(mb.w>>1))-mb.w)}[_1dc.charAt(1)],_1e3={"T":pos.y,"B":pos.y-mb.h,"M":Math.max(view.t,Math.min(view.t+view.h,pos.y+(mb.h>>1))-mb.h)}[_1dc.charAt(0)],_1e4=Math.max(view.l,_1e2),_1e5=Math.max(view.t,_1e3),endX=Math.min(view.l+view.w,_1e2+mb.w),endY=Math.min(view.t+view.h,_1e3+mb.h),_1e6=endX-_1e4,_1e7=endY-_1e5;
_1dd+=(mb.w-_1e6)+(mb.h-_1e7);
if(lang.exists("curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm")&&curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm==true){
if((_1dc.charAt(0)=="T"||_1dc.charAt(1)=="L")&&_1dd>0){
_1dd=mb.w+mb.h;
}
}
if(best==null||_1dd<best.overflow){
best={corner:_1dc,aroundCorner:_1db.aroundCorner,x:_1e4,y:_1e5,w:_1e6,h:_1e7,overflow:_1dd,spaceAvailable:_1de};
}
return !_1dd;
});
if(best.overflow&&_1d9){
_1d9(node,best.aroundCorner,best.corner,best.spaceAvailable,_1da);
}
var l=_1d2.isBodyLtr(),s=node.style;
s.top=best.y+"px";
s[l?"left":"right"]=(l?best.x:view.w-best.x-best.w)+"px";
s[l?"right":"left"]="auto";
return best;
};
return (_1d6.place={at:function(node,pos,_1e8,_1e9){
var _1ea=_1d1.map(_1e8,function(_1eb){
var c={corner:_1eb,pos:{x:pos.x,y:pos.y}};
if(_1e9){
c.pos.x+=_1eb.charAt(1)=="L"?_1e9.x:-_1e9.x;
c.pos.y+=_1eb.charAt(0)=="T"?_1e9.y:-_1e9.y;
}
return c;
});
return _1d7(node,_1ea);
},around:function(node,_1ec,_1ed,_1ee,_1ef){
var _1f0=(typeof _1ec=="string"||"offsetWidth" in _1ec)?_1d2.position(_1ec,true):_1ec;
if(_1ec.parentNode){
var _1f1=_1d3.getComputedStyle(_1ec).position=="absolute";
var _1f2=_1ec.parentNode;
while(_1f2&&_1f2.nodeType==1&&_1f2.nodeName!="BODY"){
var _1f3=_1d2.position(_1f2,true),pcs=_1d3.getComputedStyle(_1f2);
if(/relative|absolute/.test(pcs.position)){
_1f1=false;
}
if(!_1f1&&/hidden|auto|scroll/.test(pcs.overflow)){
var _1f4=Math.min(_1f0.y+_1f0.h,_1f3.y+_1f3.h);
var _1f5=Math.min(_1f0.x+_1f0.w,_1f3.x+_1f3.w);
_1f0.x=Math.max(_1f0.x,_1f3.x);
_1f0.y=Math.max(_1f0.y,_1f3.y);
_1f0.h=_1f4-_1f0.y;
_1f0.w=_1f5-_1f0.x;
}
if(pcs.position=="absolute"){
_1f1=true;
}
_1f2=_1f2.parentNode;
}
}
var x=_1f0.x,y=_1f0.y,_1f6="w" in _1f0?_1f0.w:(_1f0.w=_1f0.width),_1f7="h" in _1f0?_1f0.h:(_1d4.deprecated("place.around: dijit.place.__Rectangle: { x:"+x+", y:"+y+", height:"+_1f0.height+", width:"+_1f6+" } has been deprecated.  Please use { x:"+x+", y:"+y+", h:"+_1f0.height+", w:"+_1f6+" }","","2.0"),_1f0.h=_1f0.height);
var _1f8=[];
function push(_1f9,_1fa){
_1f8.push({aroundCorner:_1f9,corner:_1fa,pos:{x:{"L":x,"R":x+_1f6,"M":x+(_1f6>>1)}[_1f9.charAt(1)],y:{"T":y,"B":y+_1f7,"M":y+(_1f7>>1)}[_1f9.charAt(0)]}});
};
_1d1.forEach(_1ed,function(pos){
var ltr=_1ee;
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
var _1fb=_1d7(node,_1f8,_1ef,{w:_1f6,h:_1f7});
_1fb.aroundNodePos=_1f0;
return _1fb;
}});
});
},"dijit/_Widget":function(){
define("dijit/_Widget",["dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/ready","./registry","./_WidgetBase","./_OnDijitClickMixin","./_FocusMixin","dojo/uacss","./hccss"],function(_1fc,_1fd,_1fe,_1ff,_200,lang,_201,_202,_203,_204,_205,_206){
function _207(){
};
function _208(_209){
return function(obj,_20a,_20b,_20c){
if(obj&&typeof _20a=="string"&&obj[_20a]==_207){
return obj.on(_20a.substring(2).toLowerCase(),lang.hitch(_20b,_20c));
}
return _209.apply(_1fe,arguments);
};
};
_1fc.around(_1fe,"connect",_208);
if(_200.connect){
_1fc.around(_200,"connect",_208);
}
var _20d=_1ff("dijit._Widget",[_204,_205,_206],{onClick:_207,onDblClick:_207,onKeyDown:_207,onKeyPress:_207,onKeyUp:_207,onMouseDown:_207,onMouseMove:_207,onMouseOut:_207,onMouseOver:_207,onMouseLeave:_207,onMouseEnter:_207,onMouseUp:_207,constructor:function(_20e){
this._toConnect={};
for(var name in _20e){
if(this[name]===_207){
this._toConnect[name.replace(/^on/,"").toLowerCase()]=_20e[name];
delete _20e[name];
}
}
},postCreate:function(){
this.inherited(arguments);
for(var name in this._toConnect){
this.on(name,this._toConnect[name]);
}
delete this._toConnect;
},on:function(type,func){
if(this[this._onMap(type)]===_207){
return _1fe.connect(this.domNode,type.toLowerCase(),this,func);
}
return this.inherited(arguments);
},_setFocusedAttr:function(val){
this._focused=val;
this._set("focused",val);
},setAttribute:function(attr,_20f){
_200.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(attr,_20f);
},attr:function(name,_210){
if(_1fd.isDebug){
var _211=arguments.callee._ach||(arguments.callee._ach={}),_212=(arguments.callee.caller||"unknown caller").toString();
if(!_211[_212]){
_200.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+_212,"","2.0");
_211[_212]=true;
}
}
var args=arguments.length;
if(args>=2||typeof name==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(name);
}
},getDescendants:function(){
_200.deprecated(this.declaredClass+"::getDescendants() is deprecated. Use getChildren() instead.","","2.0");
return this.containerNode?_201("[widgetId]",this.containerNode).map(_203.byNode):[];
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
if(!_200.isAsync){
_202(0,function(){
var _213=["dijit/_base"];
require(_213);
});
}
return _20d;
});
},"dojo/cache":function(){
define("dojo/cache",["./_base/kernel","./text"],function(dojo,text){
return dojo.cache;
});
},"dijit/_FocusMixin":function(){
define("dijit/_FocusMixin",["./focus","./_WidgetBase","dojo/_base/declare","dojo/_base/lang"],function(_214,_215,_216,lang){
lang.extend(_215,{focused:false,onFocus:function(){
},onBlur:function(){
},_onFocus:function(){
this.onFocus();
},_onBlur:function(){
this.onBlur();
}});
return _216("dijit._FocusMixin",null,{_focusManager:_214});
});
},"dijit/_OnDijitClickMixin":function(){
define("dijit/_OnDijitClickMixin",["dojo/on","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(on,_217,keys,_218,has,_219,win){
var _21a=null;
if(has("ie")){
(function(){
var _21b=function(evt){
_21a=evt.srcElement;
};
win.doc.attachEvent("onkeydown",_21b);
_219.addOnWindowUnload(function(){
win.doc.detachEvent("onkeydown",_21b);
});
})();
}else{
win.doc.addEventListener("keydown",function(evt){
_21a=evt.target;
},true);
}
var _21c=function(node,_21d){
if(/input|button/i.test(node.nodeName)){
return on(node,"click",_21d);
}else{
function _21e(e){
return (e.keyCode==keys.ENTER||e.keyCode==keys.SPACE)&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey;
};
var _21f=[on(node,"keypress",function(e){
if(_21e(e)){
_21a=e.target;
e.preventDefault();
}
}),on(node,"keyup",function(e){
if(_21e(e)&&e.target==_21a){
_21a=null;
_21d.call(this,e);
}
}),on(node,"click",function(e){
_21d.call(this,e);
})];
return {remove:function(){
_217.forEach(_21f,function(h){
h.remove();
});
}};
}
};
return _218("dijit._OnDijitClickMixin",null,{connect:function(obj,_220,_221){
return this.inherited(arguments,[obj,_220=="ondijitclick"?_21c:_220,_221]);
}});
});
},"dijit/focus":function(){
define("dijit/focus",["dojo/aspect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/Evented","dojo/_base/lang","dojo/on","dojo/ready","dojo/_base/sniff","dojo/Stateful","dojo/_base/unload","dojo/_base/window","dojo/window","./a11y","./registry","."],function(_222,_223,dom,_224,_225,_226,lang,on,_227,has,_228,_229,win,_22a,a11y,_22b,_22c){
var _22d=_223([_228,_226],{curNode:null,activeStack:[],constructor:function(){
var _22e=lang.hitch(this,function(node){
if(dom.isDescendant(this.curNode,node)){
this.set("curNode",null);
}
if(dom.isDescendant(this.prevNode,node)){
this.set("prevNode",null);
}
});
_222.before(_225,"empty",_22e);
_222.before(_225,"destroy",_22e);
},registerIframe:function(_22f){
return this.registerWin(_22f.contentWindow,_22f);
},registerWin:function(_230,_231){
var _232=this;
var _233=function(evt){
_232._justMouseDowned=true;
setTimeout(function(){
_232._justMouseDowned=false;
},0);
if(has("ie")&&evt&&evt.srcElement&&evt.srcElement.parentNode==null){
return;
}
_232._onTouchNode(_231||evt.target||evt.srcElement,"mouse");
};
var doc=has("ie")?_230.document.documentElement:_230.document;
if(doc){
if(has("ie")){
_230.document.body.attachEvent("onmousedown",_233);
var _234=function(evt){
var tag=evt.srcElement.tagName.toLowerCase();
if(tag=="#document"||tag=="body"){
return;
}
if(a11y.isTabNavigable(evt.srcElement)){
_232._onFocusNode(_231||evt.srcElement);
}else{
_232._onTouchNode(_231||evt.srcElement);
}
};
doc.attachEvent("onactivate",_234);
var _235=function(evt){
_232._onBlurNode(_231||evt.srcElement);
};
doc.attachEvent("ondeactivate",_235);
return {remove:function(){
_230.document.detachEvent("onmousedown",_233);
doc.detachEvent("onactivate",_234);
doc.detachEvent("ondeactivate",_235);
doc=null;
}};
}else{
doc.body.addEventListener("mousedown",_233,true);
doc.body.addEventListener("touchstart",_233,true);
var _236=function(evt){
_232._onFocusNode(_231||evt.target);
};
doc.addEventListener("focus",_236,true);
var _237=function(evt){
_232._onBlurNode(_231||evt.target);
};
doc.addEventListener("blur",_237,true);
return {remove:function(){
doc.body.removeEventListener("mousedown",_233,true);
doc.body.removeEventListener("touchstart",_233,true);
doc.removeEventListener("focus",_236,true);
doc.removeEventListener("blur",_237,true);
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
var _238=[];
try{
while(node){
var _239=_224.get(node,"dijitPopupParent");
if(_239){
node=_22b.byId(_239).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===win.body()){
break;
}
node=_22a.get(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId"),_23a=id&&_22b.byId(id);
if(_23a&&!(by=="mouse"&&_23a.get("disabled"))){
_238.unshift(id);
}
node=node.parentNode;
}
}
}
}
catch(e){
}
this._setStack(_238,by);
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
},_setStack:function(_23b,by){
var _23c=this.activeStack;
this.set("activeStack",_23b);
for(var _23d=0;_23d<Math.min(_23c.length,_23b.length);_23d++){
if(_23c[_23d]!=_23b[_23d]){
break;
}
}
var _23e;
for(var i=_23c.length-1;i>=_23d;i--){
_23e=_22b.byId(_23c[i]);
if(_23e){
_23e._hasBeenBlurred=true;
_23e.set("focused",false);
if(_23e._focusManager==this){
_23e._onBlur(by);
}
this.emit("widget-blur",_23e,by);
}
}
for(i=_23d;i<_23b.length;i++){
_23e=_22b.byId(_23b[i]);
if(_23e){
_23e.set("focused",true);
if(_23e._focusManager==this){
_23e._onFocus(by);
}
this.emit("widget-focus",_23e,by);
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
var _23f=new _22d();
_227(function(){
var _240=_23f.registerWin(win.doc.parentWindow||win.doc.defaultView);
if(has("ie")){
_229.addOnWindowUnload(function(){
_240.remove();
_240=null;
});
}
});
_22c.focus=function(node){
_23f.focus(node);
};
for(var attr in _23f){
if(!/^_/.test(attr)){
_22c.focus[attr]=typeof _23f[attr]=="function"?lang.hitch(_23f,attr):_23f[attr];
}
}
_23f.watch(function(attr,_241,_242){
_22c.focus[attr]=_242;
});
return _23f;
});
},"dojo/behavior":function(){
define("dojo/behavior",["./_base/kernel","./_base/lang","./_base/array","./_base/connect","./query","./ready"],function(dojo,lang,_243,_244,_245,_246){
dojo.behavior=new function(){
function _247(obj,name){
if(!obj[name]){
obj[name]=[];
}
return obj[name];
};
var _248=0;
function _249(obj,_24a,func){
var _24b={};
for(var x in obj){
if(typeof _24b[x]=="undefined"){
if(!func){
_24a(obj[x],x);
}else{
func.call(_24a,obj[x],x);
}
}
}
};
this._behaviors={};
this.add=function(_24c){
_249(_24c,this,function(_24d,name){
var _24e=_247(this._behaviors,name);
if(typeof _24e["id"]!="number"){
_24e.id=_248++;
}
var _24f=[];
_24e.push(_24f);
if((lang.isString(_24d))||(lang.isFunction(_24d))){
_24d={found:_24d};
}
_249(_24d,function(rule,_250){
_247(_24f,_250).push(rule);
});
});
};
var _251=function(node,_252,_253){
if(lang.isString(_252)){
if(_253=="found"){
_244.publish(_252,[node]);
}else{
_244.connect(node,_253,function(){
_244.publish(_252,arguments);
});
}
}else{
if(lang.isFunction(_252)){
if(_253=="found"){
_252(node);
}else{
_244.connect(node,_253,_252);
}
}
}
};
this.apply=function(){
_249(this._behaviors,function(_254,id){
_245(id).forEach(function(elem){
var _255=0;
var bid="_dj_behavior_"+_254.id;
if(typeof elem[bid]=="number"){
_255=elem[bid];
if(_255==(_254.length)){
return;
}
}
for(var x=_255,tver;tver=_254[x];x++){
_249(tver,function(_256,_257){
if(lang.isArray(_256)){
_243.forEach(_256,function(_258){
_251(elem,_258,_257);
});
}
});
}
elem[bid]=_254.length;
});
});
};
};
_246(dojo.behavior,"apply");
return dojo.behavior;
});
},"dijit/_base/sniff":function(){
define("dijit/_base/sniff",["dojo/uacss"],function(){
});
},"dijit/dijit":function(){
define("dijit/dijit",[".","./_base","dojo/parser","./_Widget","./_TemplatedMixin","./_Container","./layout/_LayoutWidget","./form/_FormWidget","./form/_FormValueWidget"],function(_259){
return _259;
});
},"dijit/main":function(){
define("dijit/main",["dojo/_base/kernel"],function(dojo){
return dojo.dijit;
});
},"dojo/date/stamp":function(){
define("dojo/date/stamp",["../_base/kernel","../_base/lang","../_base/array"],function(dojo,lang,_25a){
lang.getObject("date.stamp",true,dojo);
dojo.date.stamp.fromISOString=function(_25b,_25c){
if(!dojo.date.stamp._isoRegExp){
dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
}
var _25d=dojo.date.stamp._isoRegExp.exec(_25b),_25e=null;
if(_25d){
_25d.shift();
if(_25d[1]){
_25d[1]--;
}
if(_25d[6]){
_25d[6]*=1000;
}
if(_25c){
_25c=new Date(_25c);
_25a.forEach(_25a.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(prop){
return _25c["get"+prop]();
}),function(_25f,_260){
_25d[_260]=_25d[_260]||_25f;
});
}
_25e=new Date(_25d[0]||1970,_25d[1]||0,_25d[2]||1,_25d[3]||0,_25d[4]||0,_25d[5]||0,_25d[6]||0);
if(_25d[0]<100){
_25e.setFullYear(_25d[0]||1970);
}
var _261=0,_262=_25d[7]&&_25d[7].charAt(0);
if(_262!="Z"){
_261=((_25d[8]||0)*60)+(Number(_25d[9])||0);
if(_262!="-"){
_261*=-1;
}
}
if(_262){
_261-=_25e.getTimezoneOffset();
}
if(_261){
_25e.setTime(_25e.getTime()+_261*60000);
}
}
return _25e;
};
dojo.date.stamp.toISOString=function(_263,_264){
var _265=function(n){
return (n<10)?"0"+n:n;
};
_264=_264||{};
var _266=[],_267=_264.zulu?"getUTC":"get",date="";
if(_264.selector!="time"){
var year=_263[_267+"FullYear"]();
date=["0000".substr((year+"").length)+year,_265(_263[_267+"Month"]()+1),_265(_263[_267+"Date"]())].join("-");
}
_266.push(date);
if(_264.selector!="date"){
var time=[_265(_263[_267+"Hours"]()),_265(_263[_267+"Minutes"]()),_265(_263[_267+"Seconds"]())].join(":");
var _268=_263[_267+"Milliseconds"]();
if(_264.milliseconds){
time+="."+(_268<100?"0":"")+_265(_268);
}
if(_264.zulu){
time+="Z";
}else{
if(_264.selector!="time"){
var _269=_263.getTimezoneOffset();
var _26a=Math.abs(_269);
time+=(_269>0?"-":"+")+_265(Math.floor(_26a/60))+":"+_265(_26a%60);
}
}
_266.push(time);
}
return _266.join("T");
};
return dojo.date.stamp;
});
},"dijit/form/_FormWidget":function(){
define("dijit/form/_FormWidget",["dojo/_base/declare","dojo/_base/kernel","dojo/ready","../_Widget","../_CssStateMixin","../_TemplatedMixin","./_FormWidgetMixin"],function(_26b,_26c,_26d,_26e,_26f,_270,_271){
if(!_26c.isAsync){
_26d(0,function(){
var _272=["dijit/form/_FormValueWidget"];
require(_272);
});
}
return _26b("dijit.form._FormWidget",[_26e,_270,_26f,_271],{setDisabled:function(_273){
_26c.deprecated("setDisabled("+_273+") is deprecated. Use set('disabled',"+_273+") instead.","","2.0");
this.set("disabled",_273);
},setValue:function(_274){
_26c.deprecated("dijit.form._FormWidget:setValue("+_274+") is deprecated.  Use set('value',"+_274+") instead.","","2.0");
this.set("value",_274);
},getValue:function(){
_26c.deprecated(this.declaredClass+"::getValue() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},postMixInProperties:function(){
this.nameAttrSetting=this.name?("name=\""+this.name.replace(/'/g,"&quot;")+"\""):"";
this.inherited(arguments);
},_setTypeAttr:null});
});
},"dijit/_base/typematic":function(){
define("dijit/_base/typematic",["../typematic"],function(){
});
},"dijit/_base/popup":function(){
define("dijit/_base/popup",["dojo/dom-class","../popup","../BackgroundIframe"],function(_275,_276){
var _277=_276._createWrapper;
_276._createWrapper=function(_278){
if(!_278.declaredClass){
_278={_popupWrapper:(_278.parentNode&&_275.contains(_278.parentNode,"dijitPopup"))?_278.parentNode:null,domNode:_278,destroy:function(){
}};
}
return _277.call(this,_278);
};
var _279=_276.open;
_276.open=function(args){
if(args.orient&&typeof args.orient!="string"&&!("length" in args.orient)){
var ary=[];
for(var key in args.orient){
ary.push({aroundCorner:key,corner:args.orient[key]});
}
args.orient=ary;
}
return _279.call(this,args);
};
return _276;
});
},"dijit/_TemplatedMixin":function(){
define("dijit/_TemplatedMixin",["dojo/_base/lang","dojo/touch","./_WidgetBase","dojo/string","dojo/cache","dojo/_base/array","dojo/_base/declare","dojo/dom-construct","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(lang,_27a,_27b,_27c,_27d,_27e,_27f,_280,has,_281,win){
var _282=_27f("dijit._TemplatedMixin",null,{templateString:null,templatePath:null,_skipNodeCache:false,_earlyTemplatedStartup:false,constructor:function(){
this._attachPoints=[];
this._attachEvents=[];
},_stringRepl:function(tmpl){
var _283=this.declaredClass,_284=this;
return _27c.substitute(tmpl,this,function(_285,key){
if(key.charAt(0)=="!"){
_285=lang.getObject(key.substr(1),false,_284);
}
if(typeof _285=="undefined"){
throw new Error(_283+" template:"+key);
}
if(_285==null){
return "";
}
return key.charAt(0)=="!"?_285:_285.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
if(!this.templateString){
this.templateString=_27d(this.templatePath,{sanitize:true});
}
var _286=_282.getCachedTemplate(this.templateString,this._skipNodeCache);
var node;
if(lang.isString(_286)){
node=_280.toDom(this._stringRepl(_286));
if(node.nodeType!=1){
throw new Error("Invalid template: "+_286);
}
}else{
node=_286.cloneNode(true);
}
this.domNode=node;
this.inherited(arguments);
this._attachTemplateNodes(node,function(n,p){
return n.getAttribute(p);
});
this._beforeFillContent();
this._fillContent(this.srcNodeRef);
},_beforeFillContent:function(){
},_fillContent:function(_287){
var dest=this.containerNode;
if(_287&&dest){
while(_287.hasChildNodes()){
dest.appendChild(_287.firstChild);
}
}
},_attachTemplateNodes:function(_288,_289){
var _28a=lang.isArray(_288)?_288:(_288.all||_288.getElementsByTagName("*"));
var x=lang.isArray(_288)?0:-1;
for(;x<_28a.length;x++){
var _28b=(x==-1)?_288:_28a[x];
if(this.widgetsInTemplate&&(_289(_28b,"dojoType")||_289(_28b,"data-dojo-type"))){
continue;
}
var _28c=_289(_28b,"dojoAttachPoint")||_289(_28b,"data-dojo-attach-point");
if(_28c){
var _28d,_28e=_28c.split(/\s*,\s*/);
while((_28d=_28e.shift())){
if(lang.isArray(this[_28d])){
this[_28d].push(_28b);
}else{
this[_28d]=_28b;
}
this._attachPoints.push(_28d);
}
}
var _28f=_289(_28b,"dojoAttachEvent")||_289(_28b,"data-dojo-attach-event");
if(_28f){
var _290,_291=_28f.split(/\s*,\s*/);
var trim=lang.trim;
while((_290=_291.shift())){
if(_290){
var _292=null;
if(_290.indexOf(":")!=-1){
var _293=_290.split(":");
_290=trim(_293[0]);
_292=trim(_293[1]);
}else{
_290=trim(_290);
}
if(!_292){
_292=_290;
}
this._attachEvents.push(this.connect(_28b,_27a[_290]||_290,_292));
}
}
}
}
},destroyRendering:function(){
_27e.forEach(this._attachPoints,function(_294){
delete this[_294];
},this);
this._attachPoints=[];
_27e.forEach(this._attachEvents,this.disconnect,this);
this._attachEvents=[];
this.inherited(arguments);
}});
_282._templateCache={};
_282.getCachedTemplate=function(_295,_296){
var _297=_282._templateCache;
var key=_295;
var _298=_297[key];
if(_298){
try{
if(!_298.ownerDocument||_298.ownerDocument==win.doc){
return _298;
}
}
catch(e){
}
_280.destroy(_298);
}
_295=_27c.trim(_295);
if(_296||_295.match(/\$\{([^\}]+)\}/g)){
return (_297[key]=_295);
}else{
var node=_280.toDom(_295);
if(node.nodeType!=1){
throw new Error("Invalid template: "+_295);
}
return (_297[key]=node);
}
};
if(has("ie")){
_281.addOnWindowUnload(function(){
var _299=_282._templateCache;
for(var key in _299){
var _29a=_299[key];
if(typeof _29a=="object"){
_280.destroy(_29a);
}
delete _299[key];
}
});
}
lang.extend(_27b,{dojoAttachEvent:"",dojoAttachPoint:""});
return _282;
});
},"dijit/_base/wai":function(){
define("dijit/_base/wai",["dojo/dom-attr","dojo/_base/lang","..","../hccss"],function(_29b,lang,_29c){
lang.mixin(_29c,{hasWaiRole:function(elem,role){
var _29d=this.getWaiRole(elem);
return role?(_29d.indexOf(role)>-1):(_29d.length>0);
},getWaiRole:function(elem){
return lang.trim((_29b.get(elem,"role")||"").replace("wairole:",""));
},setWaiRole:function(elem,role){
_29b.set(elem,"role",role);
},removeWaiRole:function(elem,role){
var _29e=_29b.get(elem,"role");
if(!_29e){
return;
}
if(role){
var t=lang.trim((" "+_29e+" ").replace(" "+role+" "," "));
_29b.set(elem,"role",t);
}else{
elem.removeAttribute("role");
}
},hasWaiState:function(elem,_29f){
return elem.hasAttribute?elem.hasAttribute("aria-"+_29f):!!elem.getAttribute("aria-"+_29f);
},getWaiState:function(elem,_2a0){
return elem.getAttribute("aria-"+_2a0)||"";
},setWaiState:function(elem,_2a1,_2a2){
elem.setAttribute("aria-"+_2a1,_2a2);
},removeWaiState:function(elem,_2a3){
elem.removeAttribute("aria-"+_2a3);
}});
return _29c;
});
},"dojo/window":function(){
define("dojo/window",["./_base/lang","./_base/sniff","./_base/window","./dom","./dom-geometry","./dom-style"],function(lang,has,_2a4,dom,geom,_2a5){
var _2a6=lang.getObject("dojo.window",true);
_2a6.getBox=function(){
var _2a7=(_2a4.doc.compatMode=="BackCompat")?_2a4.body():_2a4.doc.documentElement,_2a8=geom.docScroll(),w,h;
if(has("touch")){
var _2a9=_2a4.doc.parentWindow||_2a4.doc.defaultView;
w=_2a9.innerWidth||_2a7.clientWidth;
h=_2a9.innerHeight||_2a7.clientHeight;
}else{
w=_2a7.clientWidth;
h=_2a7.clientHeight;
}
return {l:_2a8.x,t:_2a8.y,w:w,h:h};
};
_2a6.get=function(doc){
if(has("ie")&&_2a6!==document.parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc.parentWindow||doc.defaultView;
};
_2a6.scrollIntoView=function(node,pos){
try{
node=dom.byId(node);
var doc=node.ownerDocument||_2a4.doc,body=doc.body||_2a4.body(),html=doc.documentElement||body.parentNode,isIE=has("ie"),isWK=has("webkit");
if((!(has("mozilla")||isIE||isWK||has("opera"))||node==body||node==html)&&(typeof node.scrollIntoView!="undefined")){
node.scrollIntoView(false);
return;
}
var _2aa=doc.compatMode=="BackCompat",_2ab=(isIE>=9&&node.ownerDocument.parentWindow.frameElement)?((html.clientHeight>0&&html.clientWidth>0&&(body.clientHeight==0||body.clientWidth==0||body.clientHeight>html.clientHeight||body.clientWidth>html.clientWidth))?html:body):(_2aa?body:html),_2ac=isWK?body:_2ab,_2ad=_2ab.clientWidth,_2ae=_2ab.clientHeight,rtl=!geom.isBodyLtr(),_2af=pos||geom.position(node),el=node.parentNode,_2b0=function(el){
return ((isIE<=6||(isIE&&_2aa))?false:(_2a5.get(el,"position").toLowerCase()=="fixed"));
};
if(_2b0(node)){
return;
}
while(el){
if(el==body){
el=_2ac;
}
var _2b1=geom.position(el),_2b2=_2b0(el);
if(el==_2ac){
_2b1.w=_2ad;
_2b1.h=_2ae;
if(_2ac==html&&isIE&&rtl){
_2b1.x+=_2ac.offsetWidth-_2b1.w;
}
if(_2b1.x<0||!isIE){
_2b1.x=0;
}
if(_2b1.y<0||!isIE){
_2b1.y=0;
}
}else{
var pb=geom.getPadBorderExtents(el);
_2b1.w-=pb.w;
_2b1.h-=pb.h;
_2b1.x+=pb.l;
_2b1.y+=pb.t;
var _2b3=el.clientWidth,_2b4=_2b1.w-_2b3;
if(_2b3>0&&_2b4>0){
_2b1.w=_2b3;
_2b1.x+=(rtl&&(isIE||el.clientLeft>pb.l))?_2b4:0;
}
_2b3=el.clientHeight;
_2b4=_2b1.h-_2b3;
if(_2b3>0&&_2b4>0){
_2b1.h=_2b3;
}
}
if(_2b2){
if(_2b1.y<0){
_2b1.h+=_2b1.y;
_2b1.y=0;
}
if(_2b1.x<0){
_2b1.w+=_2b1.x;
_2b1.x=0;
}
if(_2b1.y+_2b1.h>_2ae){
_2b1.h=_2ae-_2b1.y;
}
if(_2b1.x+_2b1.w>_2ad){
_2b1.w=_2ad-_2b1.x;
}
}
var l=_2af.x-_2b1.x,t=_2af.y-Math.max(_2b1.y,0),r=l+_2af.w-_2b1.w,bot=t+_2af.h-_2b1.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
if(rtl&&((isIE==8&&!_2aa)||isIE>=9)){
s=-s;
}
_2af.x+=el.scrollLeft;
el.scrollLeft+=s;
_2af.x-=el.scrollLeft;
}
if(bot*t>0){
_2af.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_2af.y-=el.scrollTop;
}
el=(el!=_2ac)&&!_2b2&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
};
require(["dojo/_base/sniff","dojo/on"],function(has,on){
if(has("ie")==8){
var _2b5=screen.deviceXDPI;
setInterval(function(){
if(screen.deviceXDPI!=_2b5){
_2b5=screen.deviceXDPI;
on.emit(_2a4.global,"resize");
}
},250);
}
});
return _2a6;
});
},"dojo/gears":function(){
define("dojo/gears",["./_base/kernel","./_base/lang","./_base/sniff"],function(dojo,lang,has){
lang.getObject("gears",true,dojo);
dojo.gears._gearsObject=function(){
var _2b6;
var _2b7=lang.getObject("google.gears");
if(_2b7){
return _2b7;
}
if(typeof GearsFactory!="undefined"){
_2b6=new GearsFactory();
}else{
if(has("ie")){
try{
_2b6=new ActiveXObject("Gears.Factory");
}
catch(e){
}
}else{
if(navigator.mimeTypes["application/x-googlegears"]){
_2b6=document.createElement("object");
_2b6.setAttribute("type","application/x-googlegears");
_2b6.setAttribute("width",0);
_2b6.setAttribute("height",0);
_2b6.style.display="none";
document.documentElement.appendChild(_2b6);
}
}
}
if(!_2b6){
return null;
}
lang.setObject("google.gears.factory",_2b6);
return lang.getObject("google.gears");
};
dojo.gears.available=(!!dojo.gears._gearsObject())||0;
return dojo.gears;
});
},"dijit/popup":function(){
define("dijit/popup",["dojo/_base/array","dojo/aspect","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/window","./place","./BackgroundIframe","."],function(_2b8,_2b9,_2ba,_2bb,dom,_2bc,_2bd,_2be,_2bf,_2c0,has,keys,lang,on,win,_2c1,_2c2,_2c3){
function _2c4(){
if(this._popupWrapper){
_2bd.destroy(this._popupWrapper);
delete this._popupWrapper;
}
};
var _2c5=_2bb(null,{_stack:[],_beginZIndex:1000,_idGen:1,_createWrapper:function(_2c6){
var _2c7=_2c6._popupWrapper,node=_2c6.domNode;
if(!_2c7){
_2c7=_2bd.create("div",{"class":"dijitPopup",style:{display:"none"},role:"presentation"},win.body());
_2c7.appendChild(node);
var s=node.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
_2c6._popupWrapper=_2c7;
_2b9.after(_2c6,"destroy",_2c4,true);
}
return _2c7;
},moveOffScreen:function(_2c8){
var _2c9=this._createWrapper(_2c8);
_2bf.set(_2c9,{visibility:"hidden",top:"-9999px",display:""});
},hide:function(_2ca){
var _2cb=this._createWrapper(_2ca);
_2bf.set(_2cb,"display","none");
},getTopPopup:function(){
var _2cc=this._stack;
for(var pi=_2cc.length-1;pi>0&&_2cc[pi].parent===_2cc[pi-1].widget;pi--){
}
return _2cc[pi];
},open:function(args){
var _2cd=this._stack,_2ce=args.popup,_2cf=args.orient||["below","below-alt","above","above-alt"],ltr=args.parent?args.parent.isLeftToRight():_2be.isBodyLtr(),_2d0=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+this._idGen++);
while(_2cd.length&&(!args.parent||!dom.isDescendant(args.parent.domNode,_2cd[_2cd.length-1].widget.domNode))){
this.close(_2cd[_2cd.length-1].widget);
}
var _2d1=this._createWrapper(_2ce);
_2bc.set(_2d1,{id:id,style:{zIndex:this._beginZIndex+_2cd.length},"class":"dijitPopup "+(_2ce.baseClass||_2ce["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:args.parent?args.parent.id:""});
if(has("bgIframe")&&!_2ce.bgIframe){
_2ce.bgIframe=new _2c2(_2d1);
}
var best=_2d0?_2c1.around(_2d1,_2d0,_2cf,ltr,_2ce.orient?lang.hitch(_2ce,"orient"):null):_2c1.at(_2d1,args,_2cf=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],args.padding);
_2d1.style.display="";
_2d1.style.visibility="visible";
_2ce.domNode.style.visibility="visible";
var _2d2=[];
_2d2.push(on(_2d1,_2ba._keypress,lang.hitch(this,function(evt){
if(evt.charOrCode==keys.ESCAPE&&args.onCancel){
_2c0.stop(evt);
args.onCancel();
}else{
if(evt.charOrCode===keys.TAB){
_2c0.stop(evt);
var _2d3=this.getTopPopup();
if(_2d3&&_2d3.onCancel){
_2d3.onCancel();
}
}
}
})));
if(_2ce.onCancel&&args.onCancel){
_2d2.push(_2ce.on("cancel",args.onCancel));
}
_2d2.push(_2ce.on(_2ce.onExecute?"execute":"change",lang.hitch(this,function(){
var _2d4=this.getTopPopup();
if(_2d4&&_2d4.onExecute){
_2d4.onExecute();
}
})));
_2cd.push({widget:_2ce,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:_2d2});
if(_2ce.onOpen){
_2ce.onOpen(best);
}
return best;
},close:function(_2d5){
var _2d6=this._stack;
while((_2d5&&_2b8.some(_2d6,function(elem){
return elem.widget==_2d5;
}))||(!_2d5&&_2d6.length)){
var top=_2d6.pop(),_2d7=top.widget,_2d8=top.onClose;
if(_2d7.onClose){
_2d7.onClose();
}
var h;
while(h=top.handlers.pop()){
h.remove();
}
if(_2d7&&_2d7.domNode){
this.hide(_2d7);
}
if(_2d8){
_2d8();
}
}
}});
return (_2c3.popup=new _2c5());
});
},"dijit/_base/window":function(){
define("dijit/_base/window",["dojo/window",".."],function(_2d9,_2da){
_2da.getDocumentWindow=function(doc){
return _2d9.get(doc);
};
});
},"dijit/_WidgetBase":function(){
define("dijit/_WidgetBase",["require","dojo/_base/array","dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/ready","dojo/Stateful","dojo/topic","dojo/_base/window","./registry"],function(_2db,_2dc,_2dd,_2de,_2df,_2e0,dom,_2e1,_2e2,_2e3,_2e4,_2e5,_2e6,lang,on,_2e7,_2e8,_2e9,win,_2ea){
var _2eb=typeof (dojo.global.perf)!="undefined";
if(!_2e6.isAsync){
_2e7(0,function(){
var _2ec=["dijit/_base/manager"];
_2db(_2ec);
});
}
var _2ed={};
function _2ee(obj){
var ret={};
for(var attr in obj){
ret[attr.toLowerCase()]=true;
}
return ret;
};
function _2ef(attr){
return function(val){
_2e1[val?"set":"remove"](this.domNode,attr,val);
this._set(attr,val);
};
};
return _2e0("dijit._WidgetBase",_2e8,{id:"",_setIdAttr:"domNode",lang:"",_setLangAttr:_2ef("lang"),dir:"",_setDirAttr:_2ef("dir"),textDir:"","class":"",_setClassAttr:{node:"domNode",type:"class"},style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{},_blankGif:_2de.blankGif||_2db.toUrl("dojo/resources/blank.gif"),postscript:function(_2f0,_2f1){
this.create(_2f0,_2f1);
},create:function(_2f2,_2f3){
if(_2eb){
perf.widgetStartedLoadingCallback();
}
this.srcNodeRef=dom.byId(_2f3);
this._connects=[];
this._supportingWidgets=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_2f2){
this.params=_2f2;
lang.mixin(this,_2f2);
}
this.postMixInProperties();
if(!this.id){
this.id=_2ea.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
_2ea.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _2f4=this.srcNodeRef;
if(_2f4&&_2f4.parentNode&&this.domNode!==_2f4){
_2f4.parentNode.replaceChild(this.domNode,_2f4);
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
if(_2eb){
perf.widgetLoadedCallback(this);
}
},_applyAttributes:function(){
var ctor=this.constructor,list=ctor._setterAttrs;
if(!list){
list=(ctor._setterAttrs=[]);
for(var attr in this.attributeMap){
list.push(attr);
}
var _2f5=ctor.prototype;
for(var _2f6 in _2f5){
if(_2f6 in this.attributeMap){
continue;
}
var _2f7="_set"+_2f6.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
})+"Attr";
if(_2f7 in _2f5){
list.push(_2f6);
}
}
}
_2dc.forEach(list,function(attr){
if(this.params&&attr in this.params){
}else{
if(this[attr]){
this.set(attr,this[attr]);
}
}
},this);
for(var _2f8 in this.params){
this.set(_2f8,this[_2f8]);
}
},postMixInProperties:function(){
},buildRendering:function(){
if(!this.domNode){
this.domNode=this.srcNodeRef||_2e3.create("div");
}
if(this.baseClass){
var _2f9=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_2f9=_2f9.concat(_2dc.map(_2f9,function(name){
return name+"Rtl";
}));
}
_2e2.add(this.domNode,_2f9);
}
},postCreate:function(){
},startup:function(){
if(this._started){
return;
}
this._started=true;
_2dc.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
},destroyRecursive:function(_2fa){
this._beingDestroyed=true;
this.destroyDescendants(_2fa);
this.destroy(_2fa);
},destroy:function(_2fb){
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
this.destroyRendering(_2fb);
_2ea.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_2fc){
if(this.bgIframe){
this.bgIframe.destroy(_2fc);
delete this.bgIframe;
}
if(this.domNode){
if(_2fc){
_2e1.remove(this.domNode,"widgetId");
}else{
_2e3.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_2fc){
_2e3.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_2fd){
_2dc.forEach(this.getChildren(),function(_2fe){
if(_2fe.destroyRecursive){
_2fe.destroyRecursive(_2fd);
}
});
},uninitialize:function(){
return false;
},_setStyleAttr:function(_2ff){
var _300=this.domNode;
if(lang.isObject(_2ff)){
_2e5.set(_300,_2ff);
}else{
if(_300.style.cssText){
_300.style.cssText+="; "+_2ff;
}else{
_300.style.cssText=_2ff;
}
}
this._set("style",_2ff);
},_attrToDom:function(attr,_301,_302){
_302=arguments.length>=3?_302:this.attributeMap[attr];
_2dc.forEach(lang.isArray(_302)?_302:[_302],function(_303){
var _304=this[_303.node||_303||"domNode"];
var type=_303.type||"attribute";
switch(type){
case "attribute":
if(lang.isFunction(_301)){
_301=lang.hitch(this,_301);
}
var _305=_303.attribute?_303.attribute:(/^on[A-Z][a-zA-Z]*$/.test(attr)?attr.toLowerCase():attr);
_2e1.set(_304,_305,_301);
break;
case "innerText":
_304.innerHTML="";
_304.appendChild(win.doc.createTextNode(_301));
break;
case "innerHTML":
_304.innerHTML=_301;
break;
case "class":
_2e2.replace(_304,_301,this[attr]);
break;
}
},this);
},get:function(name){
var _306=this._getAttrNames(name);
return this[_306.g]?this[_306.g]():this[name];
},set:function(name,_307){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _308=this._getAttrNames(name),_309=this[_308.s];
if(lang.isFunction(_309)){
var _30a=_309.apply(this,Array.prototype.slice.call(arguments,1));
}else{
var _30b=this.focusNode&&!lang.isFunction(this.focusNode)?"focusNode":"domNode",tag=this[_30b].tagName,_30c=_2ed[tag]||(_2ed[tag]=_2ee(this[_30b])),map=name in this.attributeMap?this.attributeMap[name]:_308.s in this?this[_308.s]:((_308.l in _30c&&typeof _307!="function")||/^aria-|^data-|^role$/.test(name))?_30b:null;
if(map!=null){
this._attrToDom(name,_307,map);
}
this._set(name,_307);
}
return _30a||this;
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
});
return (apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr",l:uc.toLowerCase()});
},_set:function(name,_30d){
var _30e=this[name];
this[name]=_30d;
if(this._watchCallbacks&&this._created&&_30d!==_30e){
this._watchCallbacks(name,_30e,_30d);
}
},on:function(type,func){
return _2dd.after(this,this._onMap(type),func,true);
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
return this.containerNode?_2ea.findWidgets(this.containerNode):[];
},getParent:function(){
return _2ea.getEnclosingWidget(this.domNode.parentNode);
},connect:function(obj,_30f,_310){
var _311=_2df.connect(obj,_30f,this,_310);
this._connects.push(_311);
return _311;
},disconnect:function(_312){
var i=_2dc.indexOf(this._connects,_312);
if(i!=-1){
_312.remove();
this._connects.splice(i,1);
}
},subscribe:function(t,_313){
var _314=_2e9.subscribe(t,lang.hitch(this,_313));
this._connects.push(_314);
return _314;
},unsubscribe:function(_315){
this.disconnect(_315);
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):_2e4.isBodyLtr();
},isFocusable:function(){
return this.focus&&(_2e5.get(this.domNode,"display")!="none");
},placeAt:function(_316,_317){
if(_316.declaredClass&&_316.addChild){
_316.addChild(this,_317);
}else{
_2e3.place(this.domNode,_316,_317);
}
return this;
},getTextDir:function(text,_318){
return _318;
},applyTextDir:function(){
},defer:function(fcn,_319){
var _31a=setTimeout(lang.hitch(this,function(){
_31a=null;
if(!this._destroyed){
lang.hitch(this,fcn)();
}
}),_319||0);
return {remove:function(){
if(_31a){
clearTimeout(_31a);
_31a=null;
}
return null;
}};
}});
});
}}});
define("dojo/dojo.layer",[],1);
