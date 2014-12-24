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
},"dijit/_Container":function(){
define("dijit/_Container",["dojo/_base/array","dojo/_base/declare","dojo/dom-construct","./registry"],function(_36,_37,_38,_39){
return _37("dijit._Container",null,{buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_3a,_3b){
var _3c=this.containerNode;
if(_3b&&typeof _3b=="number"){
var _3d=this.getChildren();
if(_3d&&_3d.length>=_3b){
_3c=_3d[_3b-1].domNode;
_3b="after";
}
}
_38.place(_3a.domNode,_3c,_3b);
if(this._started&&!_3a._started){
_3a.startup();
}
},removeChild:function(_3e){
if(typeof _3e=="number"){
_3e=this.getChildren()[_3e];
}
if(_3e){
var _3f=_3e.domNode;
if(_3f&&_3f.parentNode){
_3f.parentNode.removeChild(_3f);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},_getSiblingOfChild:function(_40,dir){
var _41=_40.domNode,_42=(dir>0?"nextSibling":"previousSibling");
do{
_41=_41[_42];
}while(_41&&(_41.nodeType!=1||!_39.byNode(_41)));
return _41&&_39.byNode(_41);
},getIndexOfChild:function(_43){
return _36.indexOf(this.getChildren(),_43);
}});
});
},"url:dijit/templates/CheckedMenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitemcheckbox\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuItemIcon dijitCheckedMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t<span class=\"dijitCheckedMenuItemIconChar\">&#10003;</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,labelNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&#160;</td>\n</tr>\n","dijit/BackgroundIframe":function(){
define("dijit/BackgroundIframe",["require",".","dojo/_base/config","dojo/dom-construct","dojo/dom-style","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window"],function(_44,_45,_46,_47,_48,_49,on,has,win){
has.add("bgIframe",has("ie")||has("mozilla"));
var _4a=new function(){
var _4b=[];
this.pop=function(){
var _4c;
if(_4b.length){
_4c=_4b.pop();
_4c.style.display="";
}else{
if(has("ie")<9){
var _4d=_46["dojoBlankHtmlUrl"]||_44.toUrl("dojo/resources/blank.html")||"javascript:\"\"";
var _4e="<iframe src='"+_4d+"' role='presentation'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_4c=win.doc.createElement(_4e);
}else{
_4c=_47.create("iframe");
_4c.src="javascript:\"\"";
_4c.className="dijitBackgroundIframe";
_4c.setAttribute("role","presentation");
_48.set(_4c,"opacity",0.1);
}
_4c.tabIndex=-1;
}
return _4c;
};
this.push=function(_4f){
_4f.style.display="none";
_4b.push(_4f);
};
}();
_45.BackgroundIframe=function(_50){
if(!_50.id){
throw new Error("no id");
}
if(has("bgIframe")){
var _51=(this.iframe=_4a.pop());
_50.appendChild(_51);
if(has("ie")<7||has("quirks")){
this.resize(_50);
this._conn=on(_50,"resize",_49.hitch(this,function(){
this.resize(_50);
}));
}else{
_48.set(_51,{width:"100%",height:"100%"});
}
}
};
_49.extend(_45.BackgroundIframe,{resize:function(_52){
if(this.iframe){
_48.set(this.iframe,{width:_52.offsetWidth+"px",height:_52.offsetHeight+"px"});
}
},destroy:function(){
if(this._conn){
this._conn.remove();
this._conn=null;
}
if(this.iframe){
_4a.push(this.iframe);
delete this.iframe;
}
}});
return _45.BackgroundIframe;
});
},"dijit/PopupMenuItem":function(){
define("dijit/PopupMenuItem",["dojo/_base/declare","dojo/dom-style","dojo/query","dojo/_base/window","./registry","./MenuItem","./hccss"],function(_53,_54,_55,win,_56,_57){
return _53("dijit.PopupMenuItem",_57,{_fillContent:function(){
if(this.srcNodeRef){
var _58=_55("*",this.srcNodeRef);
this.inherited(arguments,[_58[0]]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(!this.popup){
var _59=_55("[widgetId]",this.dropDownContainer)[0];
this.popup=_56.byNode(_59);
}
win.body().appendChild(this.popup.domNode);
this.popup.startup();
this.popup.domNode.style.display="none";
if(this.arrowWrapper){
_54.set(this.arrowWrapper,"visibility","");
}
this.focusNode.setAttribute("aria-haspopup","true");
},destroyDescendants:function(_5a){
if(this.popup){
if(!this.popup._destroyed){
this.popup.destroyRecursive(_5a);
}
delete this.popup;
}
this.inherited(arguments);
}});
});
},"url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>","dojo/Stateful":function(){
define("dojo/Stateful",["./_base/declare","./_base/lang","./_base/array"],function(_5b,_5c,_5d){
return _5b("dojo.Stateful",null,{postscript:function(_5e){
if(_5e){
_5c.mixin(this,_5e);
}
},get:function(_5f){
return this[_5f];
},set:function(_60,_61){
if(typeof _60==="object"){
for(var x in _60){
if(_60.hasOwnProperty(x)&&x!="_watchCallbacks"){
this.set(x,_60[x]);
}
}
return this;
}
var _62=this[_60];
this[_60]=_61;
if(this._watchCallbacks){
this._watchCallbacks(_60,_62,_61);
}
return this;
},watch:function(_63,_64){
var _65=this._watchCallbacks;
if(!_65){
var _66=this;
_65=this._watchCallbacks=function(_67,_68,_69,_6a){
var _6b=function(_6c){
if(_6c){
_6c=_6c.slice();
for(var i=0,l=_6c.length;i<l;i++){
_6c[i].call(_66,_67,_68,_69);
}
}
};
_6b(_65["_"+_67]);
if(!_6a){
_6b(_65["*"]);
}
};
}
if(!_64&&typeof _63==="function"){
_64=_63;
_63="*";
}else{
_63="_"+_63;
}
var _6d=_65[_63];
if(typeof _6d!=="object"){
_6d=_65[_63]=[];
}
_6d.push(_64);
return {unwatch:function(){
_6d.splice(_5d.indexOf(_6d,_64),1);
}};
}});
});
},"dojo/touch":function(){
define("dojo/touch",["./_base/kernel","./on","./has","./mouse"],function(_6e,on,has,_6f){
function _70(_71){
return function(_72,_73){
return on(_72,_71,_73);
};
};
var _74=has("touch");
_6e.touch={press:_70(_74?"touchstart":"mousedown"),move:_70(_74?"touchmove":"mousemove"),release:_70(_74?"touchend":"mouseup"),cancel:_74?_70("touchcancel"):_6f.leave};
return _6e.touch;
});
},"dijit/_CssStateMixin":function(){
define("dijit/_CssStateMixin",["dojo/touch","dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/_base/lang","dojo/_base/window"],function(_75,_76,_77,_78,_79,win){
return _77("dijit._CssStateMixin",[],{cssStateNodes:{},hovering:false,active:false,_applyAttributes:function(){
this.inherited(arguments);
_76.forEach(["onmouseenter","onmouseleave",_75.press],function(e){
this.connect(this.domNode,e,"_cssMouseEvent");
},this);
_76.forEach(["disabled","readOnly","checked","selected","focused","state","hovering","active"],function(_7a){
this.watch(_7a,_79.hitch(this,"_setStateClass"));
},this);
for(var ap in this.cssStateNodes){
this._trackMouseState(this[ap],this.cssStateNodes[ap]);
}
this._setStateClass();
},_cssMouseEvent:function(_7b){
if(!this.disabled){
switch(_7b.type){
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
var _7c=this.connect(win.body(),_75.release,function(){
this._mouseDown=false;
this._set("active",false);
this.disconnect(_7c);
});
break;
}
}
},_setStateClass:function(){
var _7d=this.baseClass.split(" ");
function _7e(_7f){
_7d=_7d.concat(_76.map(_7d,function(c){
return c+_7f;
}),"dijit"+_7f);
};
if(!this.isLeftToRight()){
_7e("Rtl");
}
var _80=this.checked=="mixed"?"Mixed":(this.checked?"Checked":"");
if(this.checked){
_7e(_80);
}
if(this.state){
_7e(this.state);
}
if(this.selected){
_7e("Selected");
}
if(this.disabled){
_7e("Disabled");
}else{
if(this.readOnly){
_7e("ReadOnly");
}else{
if(this.active){
_7e("Active");
}else{
if(this.hovering){
_7e("Hover");
}
}
}
}
if(this.focused){
_7e("Focused");
}
var tn=this.stateNode||this.domNode,_81={};
_76.forEach(tn.className.split(" "),function(c){
_81[c]=true;
});
if("_stateClasses" in this){
_76.forEach(this._stateClasses,function(c){
delete _81[c];
});
}
_76.forEach(_7d,function(c){
_81[c]=true;
});
var _82=[];
for(var c in _81){
_82.push(c);
}
var cls=_82.join(" ");
if(cls!=tn.className){
tn.className=cls;
}
this._stateClasses=_7d;
},_trackMouseState:function(_83,_84){
var _85=false,_86=false,_87=false;
var _88=this,cn=_79.hitch(this,"connect",_83);
function _89(){
var _8a=("disabled" in _88&&_88.disabled)||("readonly" in _88&&_88.readonly);
_78.toggle(_83,_84+"Hover",_85&&!_86&&!_8a);
_78.toggle(_83,_84+"Active",_86&&!_8a);
_78.toggle(_83,_84+"Focused",_87&&!_8a);
};
cn("onmouseenter",function(){
_85=true;
_89();
});
cn("onmouseleave",function(){
_85=false;
_86=false;
_89();
});
cn(_75.press,function(){
_86=true;
_89();
});
cn(_75.release,function(){
_86=false;
_89();
});
cn("onfocus",function(){
_87=true;
_89();
});
cn("onblur",function(){
_87=false;
_89();
});
this.watch("disabled",_89);
this.watch("readOnly",_89);
}});
});
},"dojo/string":function(){
define("dojo/string",["./_base/kernel","./_base/lang"],function(_8b,_8c){
_8c.getObject("string",true,_8b);
_8b.string.rep=function(str,num){
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
_8b.string.pad=function(_8d,_8e,ch,end){
if(!ch){
ch="0";
}
var out=String(_8d),pad=_8b.string.rep(ch,Math.ceil((_8e-out.length)/ch.length));
return end?out+pad:pad+out;
};
_8b.string.substitute=function(_8f,map,_90,_91){
_91=_91||_8b.global;
_90=_90?_8c.hitch(_91,_90):function(v){
return v;
};
return _8f.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_92,key,_93){
var _94=_8c.getObject(key,false,map);
if(_93){
_94=_8c.getObject(_93,false,_91).call(_91,_94,key);
}
return _90(_94,key).toString();
});
};
_8b.string.trim=String.prototype.trim?_8c.trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
};
return _8b.string;
});
},"dijit/_KeyNavContainer":function(){
define("dijit/_KeyNavContainer",["dojo/_base/kernel","./_Container","./_FocusMixin","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/event","dojo/dom-attr","dojo/_base/lang"],function(_95,_96,_97,_98,_99,_9a,_9b,_9c,_9d){
return _9a("dijit._KeyNavContainer",[_97,_96],{tabIndex:"0",connectKeyNavHandlers:function(_9e,_9f){
var _a0=(this._keyNavCodes={});
var _a1=_9d.hitch(this,"focusPrev");
var _a2=_9d.hitch(this,"focusNext");
_98.forEach(_9e,function(_a3){
_a0[_a3]=_a1;
});
_98.forEach(_9f,function(_a4){
_a0[_a4]=_a2;
});
_a0[_99.HOME]=_9d.hitch(this,"focusFirstChild");
_a0[_99.END]=_9d.hitch(this,"focusLastChild");
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
this.connect(this.domNode,"onfocus","_onContainerFocus");
},startupKeyNavChildren:function(){
_95.deprecated("startupKeyNavChildren() call no longer needed","","2.0");
},startup:function(){
this.inherited(arguments);
_98.forEach(this.getChildren(),_9d.hitch(this,"_startupChild"));
},addChild:function(_a5,_a6){
this.inherited(arguments);
this._startupChild(_a5);
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
},focusChild:function(_a7,_a8){
if(!_a7){
return;
}
if(this.focusedChild&&_a7!==this.focusedChild){
this._onChildBlur(this.focusedChild);
}
_a7.set("tabIndex",this.tabIndex);
_a7.focus(_a8?"end":"start");
this._set("focusedChild",_a7);
},_startupChild:function(_a9){
_a9.set("tabIndex","-1");
this.connect(_a9,"_onFocus",function(){
_a9.set("tabIndex",this.tabIndex);
});
this.connect(_a9,"_onBlur",function(){
_a9.set("tabIndex","-1");
});
},_onContainerFocus:function(evt){
if(evt.target!==this.domNode||this.focusedChild){
return;
}
this.focusFirstChild();
_9c.set(this.domNode,"tabIndex","-1");
},_onBlur:function(evt){
if(this.tabIndex){
_9c.set(this.domNode,"tabIndex",this.tabIndex);
}
this.focusedChild=null;
this.inherited(arguments);
},_onContainerKeypress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
var _aa=this._keyNavCodes[evt.charOrCode];
if(_aa){
_aa();
_9b.stop(evt);
}
},_onChildBlur:function(){
},_getFirstFocusableChild:function(){
return this._getNextFocusableChild(null,1);
},_getLastFocusableChild:function(){
return this._getNextFocusableChild(null,-1);
},_getNextFocusableChild:function(_ab,dir){
if(_ab){
_ab=this._getSiblingOfChild(_ab,dir);
}
var _ac=this.getChildren();
for(var i=0;i<_ac.length;i++){
if(!_ab){
_ab=_ac[(dir>0)?0:(_ac.length-1)];
}
if(_ab.isFocusable()){
return _ab;
}
_ab=this._getSiblingOfChild(_ab,dir);
}
return null;
}});
});
},"dijit/registry":function(){
define("dijit/registry",["dojo/_base/array","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window","."],function(_ad,has,_ae,win,_af){
var _b0={},_b1={};
var _b2={length:0,add:function(_b3){
if(_b1[_b3.id]){
throw new Error("Tried to register widget with id=="+_b3.id+" but that id is already registered");
}
_b1[_b3.id]=_b3;
this.length++;
},remove:function(id){
if(_b1[id]){
delete _b1[id];
this.length--;
}
},byId:function(id){
return typeof id=="string"?_b1[id]:id;
},byNode:function(_b4){
return _b1[_b4.getAttribute("widgetId")];
},toArray:function(){
var ar=[];
for(var id in _b1){
ar.push(_b1[id]);
}
return ar;
},getUniqueId:function(_b5){
var id;
do{
id=_b5+"_"+(_b5 in _b0?++_b0[_b5]:_b0[_b5]=0);
}while(_b1[id]);
return _af._scopeName=="dijit"?id:_af._scopeName+"_"+id;
},findWidgets:function(_b6){
var _b7=[];
function _b8(_b9){
for(var _ba=_b9.firstChild;_ba;_ba=_ba.nextSibling){
if(_ba.nodeType==1){
var _bb=_ba.getAttribute("widgetId");
if(_bb){
var _bc=_b1[_bb];
if(_bc){
_b7.push(_bc);
}
}else{
_b8(_ba);
}
}
}
};
_b8(_b6);
return _b7;
},_destroyAll:function(){
_af._curFocus=null;
_af._prevFocus=null;
_af._activeStack=[];
_ad.forEach(_b2.findWidgets(win.body()),function(_bd){
if(!_bd._destroyed){
if(_bd.destroyRecursive){
_bd.destroyRecursive();
}else{
if(_bd.destroy){
_bd.destroy();
}
}
}
});
},getEnclosingWidget:function(_be){
while(_be){
var id=_be.getAttribute&&_be.getAttribute("widgetId");
if(id){
return _b1[id];
}
_be=_be.parentNode;
}
return null;
},_hash:_b1};
_af.registry=_b2;
return _b2;
});
},"dijit/_base/manager":function(){
define("dijit/_base/manager",["dojo/_base/array","dojo/_base/config","../registry",".."],function(_bf,_c0,_c1,_c2){
_bf.forEach(["byId","getUniqueId","findWidgets","_destroyAll","byNode","getEnclosingWidget"],function(_c3){
_c2[_c3]=_c1[_c3];
});
_c2.defaultDuration=_c0["defaultDuration"]||200;
return _c2;
});
},"dijit/a11y":function(){
define("dijit/a11y",["dojo/_base/array","dojo/_base/config","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-style","dojo/_base/sniff","./_base/manager","."],function(_c4,_c5,_c6,dom,_c7,_c8,has,_c9,_ca){
var _cb=(_ca._isElementShown=function(_cc){
var s=_c8.get(_cc);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(_c7.get(_cc,"type")!="hidden");
});
_ca.hasDefaultTabStop=function(_cd){
switch(_cd.nodeName.toLowerCase()){
case "a":
return _c7.has(_cd,"href");
case "area":
case "button":
case "input":
case "object":
case "select":
case "textarea":
return true;
case "iframe":
var _ce;
try{
var _cf=_cd.contentDocument;
if("designMode" in _cf&&_cf.designMode=="on"){
return true;
}
_ce=_cf.body;
}
catch(e1){
try{
_ce=_cd.contentWindow.document.body;
}
catch(e2){
return false;
}
}
return _ce&&(_ce.contentEditable=="true"||(_ce.firstChild&&_ce.firstChild.contentEditable=="true"));
default:
return _cd.contentEditable=="true";
}
};
var _d0=(_ca.isTabNavigable=function(_d1){
if(_c7.get(_d1,"disabled")){
return false;
}else{
if(_c7.has(_d1,"tabIndex")){
return _c7.get(_d1,"tabIndex")>=0;
}else{
return _ca.hasDefaultTabStop(_d1);
}
}
});
_ca._getTabNavigable=function(_d2){
var _d3,_d4,_d5,_d6,_d7,_d8,_d9={};
function _da(_db){
return _db&&_db.tagName.toLowerCase()=="input"&&_db.type&&_db.type.toLowerCase()=="radio"&&_db.name&&_db.name.toLowerCase();
};
var _dc=function(_dd){
for(var _de=_dd.firstChild;_de;_de=_de.nextSibling){
if(_de.nodeType!=1||(has("ie")<=9&&_de.scopeName!=="HTML")||!_cb(_de)){
continue;
}
if(_d0(_de)){
var _df=_c7.get(_de,"tabIndex");
if(!_c7.has(_de,"tabIndex")||_df==0){
if(!_d3){
_d3=_de;
}
_d4=_de;
}else{
if(_df>0){
if(!_d5||_df<_d6){
_d6=_df;
_d5=_de;
}
if(!_d7||_df>=_d8){
_d8=_df;
_d7=_de;
}
}
}
var rn=_da(_de);
if(_c7.get(_de,"checked")&&rn){
_d9[rn]=_de;
}
}
if(_de.nodeName.toUpperCase()!="SELECT"){
_dc(_de);
}
}
};
if(_cb(_d2)){
_dc(_d2);
}
function rs(_e0){
return _d9[_da(_e0)]||_e0;
};
return {first:rs(_d3),last:rs(_d4),lowest:rs(_d5),highest:rs(_d7)};
};
_ca.getFirstInTabbingOrder=function(_e1){
var _e2=_ca._getTabNavigable(dom.byId(_e1));
return _e2.lowest?_e2.lowest:_e2.first;
};
_ca.getLastInTabbingOrder=function(_e3){
var _e4=_ca._getTabNavigable(dom.byId(_e3));
return _e4.last?_e4.last:_e4.highest;
};
return {hasDefaultTabStop:_ca.hasDefaultTabStop,isTabNavigable:_ca.isTabNavigable,_getTabNavigable:_ca._getTabNavigable,getFirstInTabbingOrder:_ca.getFirstInTabbingOrder,getLastInTabbingOrder:_ca.getLastInTabbingOrder};
});
},"dijit/CheckedMenuItem":function(){
require({cache:{"url:dijit/templates/CheckedMenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitemcheckbox\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuItemIcon dijitCheckedMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t<span class=\"dijitCheckedMenuItemIconChar\">&#10003;</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,labelNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&#160;</td>\n</tr>\n"}});
define("dijit/CheckedMenuItem",["dojo/_base/declare","dojo/dom-class","./MenuItem","dojo/text!./templates/CheckedMenuItem.html","./hccss"],function(_e5,_e6,_e7,_e8){
return _e5("dijit.CheckedMenuItem",_e7,{templateString:_e8,checked:false,_setCheckedAttr:function(_e9){
_e6.toggle(this.domNode,"dijitCheckedMenuItemChecked",_e9);
this.domNode.setAttribute("aria-checked",_e9);
this._set("checked",_e9);
},iconClass:"",onChange:function(){
},_onClick:function(e){
if(!this.disabled){
this.set("checked",!this.checked);
this.onChange(this.checked);
}
this.inherited(arguments);
}});
});
},"dijit/Menu":function(){
define("dijit/Menu",["require","dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window","dojo/window","./popup","./DropDownMenu","dojo/ready"],function(_ea,_eb,_ec,_ed,dom,_ee,_ef,_f0,_f1,_f2,_f3,on,has,win,_f4,pm,_f5,_f6){
if(!_f1.isAsync){
_f6(0,function(){
var _f7=["dijit/MenuItem","dijit/PopupMenuItem","dijit/CheckedMenuItem","dijit/MenuSeparator"];
_ea(_f7);
});
}
return _ec("dijit.Menu",_f5,{constructor:function(){
this._bindings=[];
},targetNodeIds:[],contextMenuForWindow:false,leftClickToOpen:false,refocus:true,postCreate:function(){
if(this.contextMenuForWindow){
this.bindDomNode(win.body());
}else{
_eb.forEach(this.targetNodeIds,this.bindDomNode,this);
}
this.inherited(arguments);
},_iframeContentWindow:function(_f8){
return _f4.get(this._iframeContentDocument(_f8))||this._iframeContentDocument(_f8)["__parent__"]||(_f8.name&&win.doc.frames[_f8.name])||null;
},_iframeContentDocument:function(_f9){
return _f9.contentDocument||(_f9.contentWindow&&_f9.contentWindow.document)||(_f9.name&&win.doc.frames[_f9.name]&&win.doc.frames[_f9.name].document)||null;
},bindDomNode:function(_fa){
_fa=dom.byId(_fa);
var cn;
if(_fa.tagName.toLowerCase()=="iframe"){
var _fb=_fa,_fc=this._iframeContentWindow(_fb);
cn=win.withGlobal(_fc,win.body);
}else{
cn=(_fa==win.body()?win.doc.documentElement:_fa);
}
var _fd={node:_fa,iframe:_fb};
_ee.set(_fa,"_dijitMenu"+this.id,this._bindings.push(_fd));
var _fe=_f3.hitch(this,function(cn){
return [on(cn,this.leftClickToOpen?"click":"contextmenu",_f3.hitch(this,function(evt){
_ed.stop(evt);
this._scheduleOpen(evt.target,_fb,{x:evt.pageX,y:evt.pageY});
})),on(cn,"keydown",_f3.hitch(this,function(evt){
if(evt.shiftKey&&evt.keyCode==_f2.F10){
_ed.stop(evt);
this._scheduleOpen(evt.target,_fb);
}
}))];
});
_fd.connects=cn?_fe(cn):[];
if(_fb){
_fd.onloadHandler=_f3.hitch(this,function(){
var _ff=this._iframeContentWindow(_fb);
cn=win.withGlobal(_ff,win.body);
_fd.connects=_fe(cn);
});
if(_fb.addEventListener){
_fb.addEventListener("load",_fd.onloadHandler,false);
}else{
_fb.attachEvent("onload",_fd.onloadHandler);
}
}
},unBindDomNode:function(_100){
var node;
try{
node=dom.byId(_100);
}
catch(e){
return;
}
var _101="_dijitMenu"+this.id;
if(node&&_ee.has(node,_101)){
var bid=_ee.get(node,_101)-1,b=this._bindings[bid],h;
while(h=b.connects.pop()){
h.remove();
}
var _102=b.iframe;
if(_102){
if(_102.removeEventListener){
_102.removeEventListener("load",b.onloadHandler,false);
}else{
_102.detachEvent("onload",b.onloadHandler);
}
}
_ee.remove(node,_101);
delete this._bindings[bid];
}
},_scheduleOpen:function(_103,_104,_105){
if(!this._openTimer){
this._openTimer=setTimeout(_f3.hitch(this,function(){
delete this._openTimer;
this._openMyself({target:_103,iframe:_104,coords:_105});
}),1);
}
},_openMyself:function(args){
var _106=args.target,_107=args.iframe,_108=args.coords;
if(_108){
if(_107){
var ifc=_ef.position(_107,true),_109=this._iframeContentWindow(_107),_10a=win.withGlobal(_109,"_docScroll",dojo);
var cs=_f0.getComputedStyle(_107),tp=_f0.toPixelValue,left=(has("ie")&&has("quirks")?0:tp(_107,cs.paddingLeft))+(has("ie")&&has("quirks")?tp(_107,cs.borderLeftWidth):0),top=(has("ie")&&has("quirks")?0:tp(_107,cs.paddingTop))+(has("ie")&&has("quirks")?tp(_107,cs.borderTopWidth):0);
_108.x+=ifc.x+left-_10a.x;
_108.y+=ifc.y+top-_10a.y;
}
}else{
_108=_ef.position(_106,true);
_108.x+=10;
_108.y+=10;
}
var self=this;
var _10b=this._focusManager.get("prevNode");
var _10c=this._focusManager.get("curNode");
var _10d=!_10c||(dom.isDescendant(_10c,this.domNode))?_10b:_10c;
function _10e(){
if(self.refocus&&_10d){
_10d.focus();
}
pm.close(self);
};
pm.open({popup:this,x:_108.x,y:_108.y,onExecute:_10e,onCancel:_10e,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){
this.inherited("_onBlur",arguments);
pm.close(this);
};
},uninitialize:function(){
_eb.forEach(this._bindings,function(b){
if(b){
this.unBindDomNode(b.node);
}
},this);
this.inherited(arguments);
}});
});
},"dijit/MenuSeparator":function(){
require({cache:{"url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>"}});
define("dijit/MenuSeparator",["dojo/_base/declare","dojo/dom","./_WidgetBase","./_TemplatedMixin","./_Contained","dojo/text!./templates/MenuSeparator.html"],function(_10f,dom,_110,_111,_112,_113){
return _10f("dijit.MenuSeparator",[_110,_111,_112],{templateString:_113,buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.domNode,false);
},isFocusable:function(){
return false;
}});
});
},"dijit/place":function(){
define("dijit/place",["dojo/_base/array","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/window","dojo/window",".","dojo/_base/lang"],function(_114,_115,_116,_117,win,_118,_119,lang){
function _11a(node,_11b,_11c,_11d){
var view=_118.getBox();
if(!node.parentNode||String(node.parentNode.tagName).toLowerCase()!="body"){
win.body().appendChild(node);
}
var best=null;
_114.some(_11b,function(_11e){
var _11f=_11e.corner;
var pos=_11e.pos;
var _120=0;
var _121={w:{"L":view.l+view.w-pos.x,"R":pos.x-view.l,"M":view.w}[_11f.charAt(1)],h:{"T":view.t+view.h-pos.y,"B":pos.y-view.t,"M":view.h}[_11f.charAt(0)]};
if(_11c){
var res=_11c(node,_11e.aroundCorner,_11f,_121,_11d);
_120=typeof res=="undefined"?0:res;
}
var _122=node.style;
var _123=_122.display;
var _124=_122.visibility;
if(_122.display=="none"){
_122.visibility="hidden";
_122.display="";
}
var mb=_115.getMarginBox(node);
_122.display=_123;
_122.visibility=_124;
var _125={"L":pos.x,"R":pos.x-mb.w,"M":Math.max(view.l,Math.min(view.l+view.w,pos.x+(mb.w>>1))-mb.w)}[_11f.charAt(1)],_126={"T":pos.y,"B":pos.y-mb.h,"M":Math.max(view.t,Math.min(view.t+view.h,pos.y+(mb.h>>1))-mb.h)}[_11f.charAt(0)],_127=Math.max(view.l,_125),_128=Math.max(view.t,_126),endX=Math.min(view.l+view.w,_125+mb.w),endY=Math.min(view.t+view.h,_126+mb.h),_129=endX-_127,_12a=endY-_128;
_120+=(mb.w-_129)+(mb.h-_12a);
if(lang.exists("curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm")&&curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm==true){
if((_11f.charAt(0)=="T"||_11f.charAt(1)=="L")&&_120>0){
_120=mb.w+mb.h;
}
}
if(best==null||_120<best.overflow){
best={corner:_11f,aroundCorner:_11e.aroundCorner,x:_127,y:_128,w:_129,h:_12a,overflow:_120,spaceAvailable:_121};
}
return !_120;
});
if(best.overflow&&_11c){
_11c(node,best.aroundCorner,best.corner,best.spaceAvailable,_11d);
}
var l=_115.isBodyLtr(),s=node.style;
s.top=best.y+"px";
s[l?"left":"right"]=(l?best.x:view.w-best.x-best.w)+"px";
s[l?"right":"left"]="auto";
return best;
};
return (_119.place={at:function(node,pos,_12b,_12c){
var _12d=_114.map(_12b,function(_12e){
var c={corner:_12e,pos:{x:pos.x,y:pos.y}};
if(_12c){
c.pos.x+=_12e.charAt(1)=="L"?_12c.x:-_12c.x;
c.pos.y+=_12e.charAt(0)=="T"?_12c.y:-_12c.y;
}
return c;
});
return _11a(node,_12d);
},around:function(node,_12f,_130,_131,_132){
var _133=(typeof _12f=="string"||"offsetWidth" in _12f)?_115.position(_12f,true):_12f;
if(_12f.parentNode){
var _134=_116.getComputedStyle(_12f).position=="absolute";
var _135=_12f.parentNode;
while(_135&&_135.nodeType==1&&_135.nodeName!="BODY"){
var _136=_115.position(_135,true),pcs=_116.getComputedStyle(_135);
if(/relative|absolute/.test(pcs.position)){
_134=false;
}
if(!_134&&/hidden|auto|scroll/.test(pcs.overflow)){
var _137=Math.min(_133.y+_133.h,_136.y+_136.h);
var _138=Math.min(_133.x+_133.w,_136.x+_136.w);
_133.x=Math.max(_133.x,_136.x);
_133.y=Math.max(_133.y,_136.y);
_133.h=_137-_133.y;
_133.w=_138-_133.x;
}
if(pcs.position=="absolute"){
_134=true;
}
_135=_135.parentNode;
}
}
var x=_133.x,y=_133.y,_139="w" in _133?_133.w:(_133.w=_133.width),_13a="h" in _133?_133.h:(_117.deprecated("place.around: dijit.place.__Rectangle: { x:"+x+", y:"+y+", height:"+_133.height+", width:"+_139+" } has been deprecated.  Please use { x:"+x+", y:"+y+", h:"+_133.height+", w:"+_139+" }","","2.0"),_133.h=_133.height);
var _13b=[];
function push(_13c,_13d){
_13b.push({aroundCorner:_13c,corner:_13d,pos:{x:{"L":x,"R":x+_139,"M":x+(_139>>1)}[_13c.charAt(1)],y:{"T":y,"B":y+_13a,"M":y+(_13a>>1)}[_13c.charAt(0)]}});
};
_114.forEach(_130,function(pos){
var ltr=_131;
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
var _13e=_11a(node,_13b,_132,{w:_139,h:_13a});
_13e.aroundNodePos=_133;
return _13e;
}});
});
},"dijit/DropDownMenu":function(){
require({cache:{"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n"}});
define("dijit/DropDownMenu",["dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/text!./templates/Menu.html","./_OnDijitClickMixin","./_MenuBase"],function(_13f,_140,keys,_141,_142,_143){
return _13f("dijit.DropDownMenu",[_143,_142],{templateString:_141,baseClass:"dijitMenu",postCreate:function(){
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
_140.stop(evt);
break;
case this._closeSubMenuKey:
if(this.parentMenu){
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
}else{
_140.stop(evt);
}
break;
}
}});
});
},"dijit/_Widget":function(){
define("dijit/_Widget",["dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/ready","./registry","./_WidgetBase","./_OnDijitClickMixin","./_FocusMixin","dojo/uacss","./hccss"],function(_144,_145,_146,_147,_148,lang,_149,_14a,_14b,_14c,_14d,_14e){
function _14f(){
};
function _150(_151){
return function(obj,_152,_153,_154){
if(obj&&typeof _152=="string"&&obj[_152]==_14f){
return obj.on(_152.substring(2).toLowerCase(),lang.hitch(_153,_154));
}
return _151.apply(_146,arguments);
};
};
_144.around(_146,"connect",_150);
if(_148.connect){
_144.around(_148,"connect",_150);
}
var _155=_147("dijit._Widget",[_14c,_14d,_14e],{onClick:_14f,onDblClick:_14f,onKeyDown:_14f,onKeyPress:_14f,onKeyUp:_14f,onMouseDown:_14f,onMouseMove:_14f,onMouseOut:_14f,onMouseOver:_14f,onMouseLeave:_14f,onMouseEnter:_14f,onMouseUp:_14f,constructor:function(_156){
this._toConnect={};
for(var name in _156){
if(this[name]===_14f){
this._toConnect[name.replace(/^on/,"").toLowerCase()]=_156[name];
delete _156[name];
}
}
},postCreate:function(){
this.inherited(arguments);
for(var name in this._toConnect){
this.on(name,this._toConnect[name]);
}
delete this._toConnect;
},on:function(type,func){
if(this[this._onMap(type)]===_14f){
return _146.connect(this.domNode,type.toLowerCase(),this,func);
}
return this.inherited(arguments);
},_setFocusedAttr:function(val){
this._focused=val;
this._set("focused",val);
},setAttribute:function(attr,_157){
_148.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(attr,_157);
},attr:function(name,_158){
if(_145.isDebug){
var _159=arguments.callee._ach||(arguments.callee._ach={}),_15a=(arguments.callee.caller||"unknown caller").toString();
if(!_159[_15a]){
_148.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+_15a,"","2.0");
_159[_15a]=true;
}
}
var args=arguments.length;
if(args>=2||typeof name==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(name);
}
},getDescendants:function(){
_148.deprecated(this.declaredClass+"::getDescendants() is deprecated. Use getChildren() instead.","","2.0");
return this.containerNode?_149("[widgetId]",this.containerNode).map(_14b.byNode):[];
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
if(!_148.isAsync){
_14a(0,function(){
var _15b=["dijit/_base"];
require(_15b);
});
}
return _155;
});
},"dojo/cache":function(){
define("dojo/cache",["./_base/kernel","./text"],function(dojo,text){
return dojo.cache;
});
},"dijit/_FocusMixin":function(){
define("dijit/_FocusMixin",["./focus","./_WidgetBase","dojo/_base/declare","dojo/_base/lang"],function(_15c,_15d,_15e,lang){
lang.extend(_15d,{focused:false,onFocus:function(){
},onBlur:function(){
},_onFocus:function(){
this.onFocus();
},_onBlur:function(){
this.onBlur();
}});
return _15e("dijit._FocusMixin",null,{_focusManager:_15c});
});
},"dijit/_OnDijitClickMixin":function(){
define("dijit/_OnDijitClickMixin",["dojo/on","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(on,_15f,keys,_160,has,_161,win){
var _162=null;
if(has("ie")){
(function(){
var _163=function(evt){
_162=evt.srcElement;
};
win.doc.attachEvent("onkeydown",_163);
_161.addOnWindowUnload(function(){
win.doc.detachEvent("onkeydown",_163);
});
})();
}else{
win.doc.addEventListener("keydown",function(evt){
_162=evt.target;
},true);
}
var _164=function(node,_165){
if(/input|button/i.test(node.nodeName)){
return on(node,"click",_165);
}else{
function _166(e){
return (e.keyCode==keys.ENTER||e.keyCode==keys.SPACE)&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey;
};
var _167=[on(node,"keypress",function(e){
if(_166(e)){
_162=e.target;
e.preventDefault();
}
}),on(node,"keyup",function(e){
if(_166(e)&&e.target==_162){
_162=null;
_165.call(this,e);
}
}),on(node,"click",function(e){
_165.call(this,e);
})];
return {remove:function(){
_15f.forEach(_167,function(h){
h.remove();
});
}};
}
};
return _160("dijit._OnDijitClickMixin",null,{connect:function(obj,_168,_169){
return this.inherited(arguments,[obj,_168=="ondijitclick"?_164:_168,_169]);
}});
});
},"dijit/focus":function(){
define("dijit/focus",["dojo/aspect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/Evented","dojo/_base/lang","dojo/on","dojo/ready","dojo/_base/sniff","dojo/Stateful","dojo/_base/unload","dojo/_base/window","dojo/window","./a11y","./registry","."],function(_16a,_16b,dom,_16c,_16d,_16e,lang,on,_16f,has,_170,_171,win,_172,a11y,_173,_174){
var _175=_16b([_170,_16e],{curNode:null,activeStack:[],constructor:function(){
var _176=lang.hitch(this,function(node){
if(dom.isDescendant(this.curNode,node)){
this.set("curNode",null);
}
if(dom.isDescendant(this.prevNode,node)){
this.set("prevNode",null);
}
});
_16a.before(_16d,"empty",_176);
_16a.before(_16d,"destroy",_176);
},registerIframe:function(_177){
return this.registerWin(_177.contentWindow,_177);
},registerWin:function(_178,_179){
var _17a=this;
var _17b=function(evt){
_17a._justMouseDowned=true;
setTimeout(function(){
_17a._justMouseDowned=false;
},0);
if(has("ie")&&evt&&evt.srcElement&&evt.srcElement.parentNode==null){
return;
}
_17a._onTouchNode(_179||evt.target||evt.srcElement,"mouse");
};
var doc=has("ie")?_178.document.documentElement:_178.document;
if(doc){
if(has("ie")){
_178.document.body.attachEvent("onmousedown",_17b);
var _17c=function(evt){
var tag=evt.srcElement.tagName.toLowerCase();
if(tag=="#document"||tag=="body"){
return;
}
if(a11y.isTabNavigable(evt.srcElement)){
_17a._onFocusNode(_179||evt.srcElement);
}else{
_17a._onTouchNode(_179||evt.srcElement);
}
};
doc.attachEvent("onactivate",_17c);
var _17d=function(evt){
_17a._onBlurNode(_179||evt.srcElement);
};
doc.attachEvent("ondeactivate",_17d);
return {remove:function(){
_178.document.detachEvent("onmousedown",_17b);
doc.detachEvent("onactivate",_17c);
doc.detachEvent("ondeactivate",_17d);
doc=null;
}};
}else{
doc.body.addEventListener("mousedown",_17b,true);
doc.body.addEventListener("touchstart",_17b,true);
var _17e=function(evt){
_17a._onFocusNode(_179||evt.target);
};
doc.addEventListener("focus",_17e,true);
var _17f=function(evt){
_17a._onBlurNode(_179||evt.target);
};
doc.addEventListener("blur",_17f,true);
return {remove:function(){
doc.body.removeEventListener("mousedown",_17b,true);
doc.body.removeEventListener("touchstart",_17b,true);
doc.removeEventListener("focus",_17e,true);
doc.removeEventListener("blur",_17f,true);
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
var _180=[];
try{
while(node){
var _181=_16c.get(node,"dijitPopupParent");
if(_181){
node=_173.byId(_181).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===win.body()){
break;
}
node=_172.get(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId"),_182=id&&_173.byId(id);
if(_182&&!(by=="mouse"&&_182.get("disabled"))){
_180.unshift(id);
}
node=node.parentNode;
}
}
}
}
catch(e){
}
this._setStack(_180,by);
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
},_setStack:function(_183,by){
var _184=this.activeStack;
this.set("activeStack",_183);
for(var _185=0;_185<Math.min(_184.length,_183.length);_185++){
if(_184[_185]!=_183[_185]){
break;
}
}
var _186;
for(var i=_184.length-1;i>=_185;i--){
_186=_173.byId(_184[i]);
if(_186){
_186._hasBeenBlurred=true;
_186.set("focused",false);
if(_186._focusManager==this){
_186._onBlur(by);
}
this.emit("widget-blur",_186,by);
}
}
for(i=_185;i<_183.length;i++){
_186=_173.byId(_183[i]);
if(_186){
_186.set("focused",true);
if(_186._focusManager==this){
_186._onFocus(by);
}
this.emit("widget-focus",_186,by);
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
var _187=new _175();
_16f(function(){
var _188=_187.registerWin(win.doc.parentWindow||win.doc.defaultView);
if(has("ie")){
_171.addOnWindowUnload(function(){
_188.remove();
_188=null;
});
}
});
_174.focus=function(node){
_187.focus(node);
};
for(var attr in _187){
if(!/^_/.test(attr)){
_174.focus[attr]=typeof _187[attr]=="function"?lang.hitch(_187,attr):_187[attr];
}
}
_187.watch(function(attr,_189,_18a){
_174.focus[attr]=_18a;
});
return _187;
});
},"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n","dijit/main":function(){
define("dijit/main",["dojo/_base/kernel"],function(dojo){
return dojo.dijit;
});
},"dijit/MenuItem":function(){
require({cache:{"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n"}});
define("dijit/MenuItem",["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/event","dojo/_base/kernel","dojo/_base/sniff","./_Widget","./_TemplatedMixin","./_Contained","./_CssStateMixin","dojo/text!./templates/MenuItem.html"],function(_18b,dom,_18c,_18d,_18e,_18f,has,_190,_191,_192,_193,_194){
return _18b("dijit.MenuItem",[_190,_191,_192,_193],{templateString:_194,baseClass:"dijitMenuItem",label:"",_setLabelAttr:{node:"containerNode",type:"innerHTML"},iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},accelKey:"",disabled:false,_fillContent:function(_195){
if(_195&&!("label" in this.params)){
this.set("label",_195.innerHTML);
}
},buildRendering:function(){
this.inherited(arguments);
var _196=this.id+"_text";
_18c.set(this.containerNode,"id",_196);
if(this.accelKeyNode){
_18c.set(this.accelKeyNode,"id",this.id+"_accel");
_196+=" "+this.id+"_accel";
}
this.domNode.setAttribute("aria-labelledby",_196);
dom.setSelectable(this.domNode,false);
},_onHover:function(){
this.getParent().onItemHover(this);
},_onUnhover:function(){
this.getParent().onItemUnhover(this);
this._set("hovering",false);
},_onClick:function(evt){
this.getParent().onItemClick(this,evt);
_18e.stop(evt);
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
},_setSelected:function(_197){
_18d.toggle(this.domNode,"dijitMenuItemSelected",_197);
},setLabel:function(_198){
_18f.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_198);
},setDisabled:function(_199){
_18f.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_199);
},_setDisabledAttr:function(_19a){
this.focusNode.setAttribute("aria-disabled",_19a?"true":"false");
this._set("disabled",_19a);
},_setAccelKeyAttr:function(_19b){
this.accelKeyNode.style.display=_19b?"":"none";
this.accelKeyNode.innerHTML=_19b;
_18c.set(this.containerNode,"colSpan",_19b?"1":"2");
this._set("accelKey",_19b);
}});
});
},"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n","dijit/_MenuBase":function(){
define("dijit/_MenuBase",["./popup","dojo/window","./_Widget","./_KeyNavContainer","./_TemplatedMixin","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/lang","dojo/_base/array"],function(pm,_19c,_19d,_19e,_19f,_1a0,dom,_1a1,_1a2,lang,_1a3){
return _1a0("dijit._MenuBase",[_19d,_19f,_19e],{parentMenu:null,popupDelay:500,onExecute:function(){
},onCancel:function(){
},_moveToPopup:function(evt){
if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){
this.focusedChild._onClick(evt);
}else{
var _1a4=this._getTopMenu();
if(_1a4&&_1a4._isMenuBar){
_1a4.focusNext();
}
}
},_onPopupHover:function(){
if(this.currentPopup&&this.currentPopup._pendingClose_timer){
var _1a5=this.currentPopup.parentMenu;
if(_1a5.focusedChild){
_1a5.focusedChild._setSelected(false);
}
_1a5.focusedChild=this.currentPopup.from_item;
_1a5.focusedChild._setSelected(true);
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
var _1a6=item.popup;
if(_1a6){
this._stopPendingCloseTimer(_1a6);
_1a6._pendingClose_timer=setTimeout(function(){
_1a6._pendingClose_timer=null;
if(_1a6.parentMenu){
_1a6.parentMenu.currentPopup=null;
}
pm.close(_1a6);
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
},_stopPendingCloseTimer:function(_1a7){
if(_1a7._pendingClose_timer){
clearTimeout(_1a7._pendingClose_timer);
_1a7._pendingClose_timer=null;
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
var _1a8=this.focusedChild;
if(!_1a8){
return;
}
var _1a9=_1a8.popup;
if(_1a9.isShowingNow){
return;
}
if(this.currentPopup){
this._stopPendingCloseTimer(this.currentPopup);
pm.close(this.currentPopup);
}
_1a9.parentMenu=this;
_1a9.from_item=_1a8;
var self=this;
pm.open({parent:this,popup:_1a9,around:_1a8.domNode,orient:this._orient||["after","before"],onCancel:function(){
self.focusChild(_1a8);
self._cleanUp();
_1a8._setSelected(true);
self.focusedChild=_1a8;
},onExecute:lang.hitch(this,"_cleanUp")});
this.currentPopup=_1a9;
if(this.popupHoverHandle){
this.disconnect(this.popupHoverHandle);
}
this.popupHoverHandle=this.connect(_1a9.domNode,"onmouseenter","_onPopupHover");
if(_1a9.focus){
_1a9._focus_timer=setTimeout(lang.hitch(_1a9,function(){
this._focus_timer=null;
this.focus();
}),0);
}
},_markActive:function(){
this.isActive=true;
_1a2.replace(this.domNode,"dijitMenuActive","dijitMenuPassive");
},onOpen:function(){
this.isShowingNow=true;
this._markActive();
},_markInactive:function(){
this.isActive=false;
_1a2.replace(this.domNode,"dijitMenuPassive","dijitMenuActive");
},onClose:function(){
this._stopFocusTimer();
this._markInactive();
this.isShowingNow=false;
this.parentMenu=null;
},_closeChild:function(){
this._stopPopupTimer();
if(this.currentPopup){
if(_1a3.indexOf(this._focusManager.activeStack,this.id)>=0){
_1a1.set(this.focusedChild.focusNode,"tabIndex",this.tabIndex);
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
},"dijit/_TemplatedMixin":function(){
define("dijit/_TemplatedMixin",["dojo/_base/lang","dojo/touch","./_WidgetBase","dojo/string","dojo/cache","dojo/_base/array","dojo/_base/declare","dojo/dom-construct","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(lang,_1aa,_1ab,_1ac,_1ad,_1ae,_1af,_1b0,has,_1b1,win){
var _1b2=_1af("dijit._TemplatedMixin",null,{templateString:null,templatePath:null,_skipNodeCache:false,_earlyTemplatedStartup:false,constructor:function(){
this._attachPoints=[];
this._attachEvents=[];
},_stringRepl:function(tmpl){
var _1b3=this.declaredClass,_1b4=this;
return _1ac.substitute(tmpl,this,function(_1b5,key){
if(key.charAt(0)=="!"){
_1b5=lang.getObject(key.substr(1),false,_1b4);
}
if(typeof _1b5=="undefined"){
throw new Error(_1b3+" template:"+key);
}
if(_1b5==null){
return "";
}
return key.charAt(0)=="!"?_1b5:_1b5.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
if(!this.templateString){
this.templateString=_1ad(this.templatePath,{sanitize:true});
}
var _1b6=_1b2.getCachedTemplate(this.templateString,this._skipNodeCache);
var node;
if(lang.isString(_1b6)){
node=_1b0.toDom(this._stringRepl(_1b6));
if(node.nodeType!=1){
throw new Error("Invalid template: "+_1b6);
}
}else{
node=_1b6.cloneNode(true);
}
this.domNode=node;
this.inherited(arguments);
this._attachTemplateNodes(node,function(n,p){
return n.getAttribute(p);
});
this._beforeFillContent();
this._fillContent(this.srcNodeRef);
},_beforeFillContent:function(){
},_fillContent:function(_1b7){
var dest=this.containerNode;
if(_1b7&&dest){
while(_1b7.hasChildNodes()){
dest.appendChild(_1b7.firstChild);
}
}
},_attachTemplateNodes:function(_1b8,_1b9){
var _1ba=lang.isArray(_1b8)?_1b8:(_1b8.all||_1b8.getElementsByTagName("*"));
var x=lang.isArray(_1b8)?0:-1;
for(;x<_1ba.length;x++){
var _1bb=(x==-1)?_1b8:_1ba[x];
if(this.widgetsInTemplate&&(_1b9(_1bb,"dojoType")||_1b9(_1bb,"data-dojo-type"))){
continue;
}
var _1bc=_1b9(_1bb,"dojoAttachPoint")||_1b9(_1bb,"data-dojo-attach-point");
if(_1bc){
var _1bd,_1be=_1bc.split(/\s*,\s*/);
while((_1bd=_1be.shift())){
if(lang.isArray(this[_1bd])){
this[_1bd].push(_1bb);
}else{
this[_1bd]=_1bb;
}
this._attachPoints.push(_1bd);
}
}
var _1bf=_1b9(_1bb,"dojoAttachEvent")||_1b9(_1bb,"data-dojo-attach-event");
if(_1bf){
var _1c0,_1c1=_1bf.split(/\s*,\s*/);
var trim=lang.trim;
while((_1c0=_1c1.shift())){
if(_1c0){
var _1c2=null;
if(_1c0.indexOf(":")!=-1){
var _1c3=_1c0.split(":");
_1c0=trim(_1c3[0]);
_1c2=trim(_1c3[1]);
}else{
_1c0=trim(_1c0);
}
if(!_1c2){
_1c2=_1c0;
}
this._attachEvents.push(this.connect(_1bb,_1aa[_1c0]||_1c0,_1c2));
}
}
}
}
},destroyRendering:function(){
_1ae.forEach(this._attachPoints,function(_1c4){
delete this[_1c4];
},this);
this._attachPoints=[];
_1ae.forEach(this._attachEvents,this.disconnect,this);
this._attachEvents=[];
this.inherited(arguments);
}});
_1b2._templateCache={};
_1b2.getCachedTemplate=function(_1c5,_1c6){
var _1c7=_1b2._templateCache;
var key=_1c5;
var _1c8=_1c7[key];
if(_1c8){
try{
if(!_1c8.ownerDocument||_1c8.ownerDocument==win.doc){
return _1c8;
}
}
catch(e){
}
_1b0.destroy(_1c8);
}
_1c5=_1ac.trim(_1c5);
if(_1c6||_1c5.match(/\$\{([^\}]+)\}/g)){
return (_1c7[key]=_1c5);
}else{
var node=_1b0.toDom(_1c5);
if(node.nodeType!=1){
throw new Error("Invalid template: "+_1c5);
}
return (_1c7[key]=node);
}
};
if(has("ie")){
_1b1.addOnWindowUnload(function(){
var _1c9=_1b2._templateCache;
for(var key in _1c9){
var _1ca=_1c9[key];
if(typeof _1ca=="object"){
_1b0.destroy(_1ca);
}
delete _1c9[key];
}
});
}
lang.extend(_1ab,{dojoAttachEvent:"",dojoAttachPoint:""});
return _1b2;
});
},"dojo/window":function(){
define("dojo/window",["./_base/lang","./_base/sniff","./_base/window","./dom","./dom-geometry","./dom-style"],function(lang,has,_1cb,dom,geom,_1cc){
var _1cd=lang.getObject("dojo.window",true);
_1cd.getBox=function(){
var _1ce=(_1cb.doc.compatMode=="BackCompat")?_1cb.body():_1cb.doc.documentElement,_1cf=geom.docScroll(),w,h;
if(has("touch")){
var _1d0=_1cb.doc.parentWindow||_1cb.doc.defaultView;
w=_1d0.innerWidth||_1ce.clientWidth;
h=_1d0.innerHeight||_1ce.clientHeight;
}else{
w=_1ce.clientWidth;
h=_1ce.clientHeight;
}
return {l:_1cf.x,t:_1cf.y,w:w,h:h};
};
_1cd.get=function(doc){
if(has("ie")&&_1cd!==document.parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc.parentWindow||doc.defaultView;
};
_1cd.scrollIntoView=function(node,pos){
try{
node=dom.byId(node);
var doc=node.ownerDocument||_1cb.doc,body=doc.body||_1cb.body(),html=doc.documentElement||body.parentNode,isIE=has("ie"),isWK=has("webkit");
if((!(has("mozilla")||isIE||isWK||has("opera"))||node==body||node==html)&&(typeof node.scrollIntoView!="undefined")){
node.scrollIntoView(false);
return;
}
var _1d1=doc.compatMode=="BackCompat",_1d2=(isIE>=9&&node.ownerDocument.parentWindow.frameElement)?((html.clientHeight>0&&html.clientWidth>0&&(body.clientHeight==0||body.clientWidth==0||body.clientHeight>html.clientHeight||body.clientWidth>html.clientWidth))?html:body):(_1d1?body:html),_1d3=isWK?body:_1d2,_1d4=_1d2.clientWidth,_1d5=_1d2.clientHeight,rtl=!geom.isBodyLtr(),_1d6=pos||geom.position(node),el=node.parentNode,_1d7=function(el){
return ((isIE<=6||(isIE&&_1d1))?false:(_1cc.get(el,"position").toLowerCase()=="fixed"));
};
if(_1d7(node)){
return;
}
while(el){
if(el==body){
el=_1d3;
}
var _1d8=geom.position(el),_1d9=_1d7(el);
if(el==_1d3){
_1d8.w=_1d4;
_1d8.h=_1d5;
if(_1d3==html&&isIE&&rtl){
_1d8.x+=_1d3.offsetWidth-_1d8.w;
}
if(_1d8.x<0||!isIE){
_1d8.x=0;
}
if(_1d8.y<0||!isIE){
_1d8.y=0;
}
}else{
var pb=geom.getPadBorderExtents(el);
_1d8.w-=pb.w;
_1d8.h-=pb.h;
_1d8.x+=pb.l;
_1d8.y+=pb.t;
var _1da=el.clientWidth,_1db=_1d8.w-_1da;
if(_1da>0&&_1db>0){
_1d8.w=_1da;
_1d8.x+=(rtl&&(isIE||el.clientLeft>pb.l))?_1db:0;
}
_1da=el.clientHeight;
_1db=_1d8.h-_1da;
if(_1da>0&&_1db>0){
_1d8.h=_1da;
}
}
if(_1d9){
if(_1d8.y<0){
_1d8.h+=_1d8.y;
_1d8.y=0;
}
if(_1d8.x<0){
_1d8.w+=_1d8.x;
_1d8.x=0;
}
if(_1d8.y+_1d8.h>_1d5){
_1d8.h=_1d5-_1d8.y;
}
if(_1d8.x+_1d8.w>_1d4){
_1d8.w=_1d4-_1d8.x;
}
}
var l=_1d6.x-_1d8.x,t=_1d6.y-Math.max(_1d8.y,0),r=l+_1d6.w-_1d8.w,bot=t+_1d6.h-_1d8.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
if(rtl&&((isIE==8&&!_1d1)||isIE>=9)){
s=-s;
}
_1d6.x+=el.scrollLeft;
el.scrollLeft+=s;
_1d6.x-=el.scrollLeft;
}
if(bot*t>0){
_1d6.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_1d6.y-=el.scrollTop;
}
el=(el!=_1d3)&&!_1d9&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
};
require(["dojo/_base/sniff","dojo/on"],function(has,on){
if(has("ie")==8){
var _1dc=screen.deviceXDPI;
setInterval(function(){
if(screen.deviceXDPI!=_1dc){
_1dc=screen.deviceXDPI;
on.emit(_1cb.global,"resize");
}
},250);
}
});
return _1cd;
});
},"dijit/popup":function(){
define("dijit/popup",["dojo/_base/array","dojo/aspect","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/window","./place","./BackgroundIframe","."],function(_1dd,_1de,_1df,_1e0,dom,_1e1,_1e2,_1e3,_1e4,_1e5,has,keys,lang,on,win,_1e6,_1e7,_1e8){
function _1e9(){
if(this._popupWrapper){
_1e2.destroy(this._popupWrapper);
delete this._popupWrapper;
}
};
var _1ea=_1e0(null,{_stack:[],_beginZIndex:1000,_idGen:1,_createWrapper:function(_1eb){
var _1ec=_1eb._popupWrapper,node=_1eb.domNode;
if(!_1ec){
_1ec=_1e2.create("div",{"class":"dijitPopup",style:{display:"none"},role:"presentation"},win.body());
_1ec.appendChild(node);
var s=node.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
_1eb._popupWrapper=_1ec;
_1de.after(_1eb,"destroy",_1e9,true);
}
return _1ec;
},moveOffScreen:function(_1ed){
var _1ee=this._createWrapper(_1ed);
_1e4.set(_1ee,{visibility:"hidden",top:"-9999px",display:""});
},hide:function(_1ef){
var _1f0=this._createWrapper(_1ef);
_1e4.set(_1f0,"display","none");
},getTopPopup:function(){
var _1f1=this._stack;
for(var pi=_1f1.length-1;pi>0&&_1f1[pi].parent===_1f1[pi-1].widget;pi--){
}
return _1f1[pi];
},open:function(args){
var _1f2=this._stack,_1f3=args.popup,_1f4=args.orient||["below","below-alt","above","above-alt"],ltr=args.parent?args.parent.isLeftToRight():_1e3.isBodyLtr(),_1f5=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+this._idGen++);
while(_1f2.length&&(!args.parent||!dom.isDescendant(args.parent.domNode,_1f2[_1f2.length-1].widget.domNode))){
this.close(_1f2[_1f2.length-1].widget);
}
var _1f6=this._createWrapper(_1f3);
_1e1.set(_1f6,{id:id,style:{zIndex:this._beginZIndex+_1f2.length},"class":"dijitPopup "+(_1f3.baseClass||_1f3["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:args.parent?args.parent.id:""});
if(has("bgIframe")&&!_1f3.bgIframe){
_1f3.bgIframe=new _1e7(_1f6);
}
var best=_1f5?_1e6.around(_1f6,_1f5,_1f4,ltr,_1f3.orient?lang.hitch(_1f3,"orient"):null):_1e6.at(_1f6,args,_1f4=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],args.padding);
_1f6.style.display="";
_1f6.style.visibility="visible";
_1f3.domNode.style.visibility="visible";
var _1f7=[];
_1f7.push(on(_1f6,_1df._keypress,lang.hitch(this,function(evt){
if(evt.charOrCode==keys.ESCAPE&&args.onCancel){
_1e5.stop(evt);
args.onCancel();
}else{
if(evt.charOrCode===keys.TAB){
_1e5.stop(evt);
var _1f8=this.getTopPopup();
if(_1f8&&_1f8.onCancel){
_1f8.onCancel();
}
}
}
})));
if(_1f3.onCancel&&args.onCancel){
_1f7.push(_1f3.on("cancel",args.onCancel));
}
_1f7.push(_1f3.on(_1f3.onExecute?"execute":"change",lang.hitch(this,function(){
var _1f9=this.getTopPopup();
if(_1f9&&_1f9.onExecute){
_1f9.onExecute();
}
})));
_1f2.push({widget:_1f3,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:_1f7});
if(_1f3.onOpen){
_1f3.onOpen(best);
}
return best;
},close:function(_1fa){
var _1fb=this._stack;
while((_1fa&&_1dd.some(_1fb,function(elem){
return elem.widget==_1fa;
}))||(!_1fa&&_1fb.length)){
var top=_1fb.pop(),_1fc=top.widget,_1fd=top.onClose;
if(_1fc.onClose){
_1fc.onClose();
}
var h;
while(h=top.handlers.pop()){
h.remove();
}
if(_1fc&&_1fc.domNode){
this.hide(_1fc);
}
if(_1fd){
_1fd();
}
}
}});
return (_1e8.popup=new _1ea());
});
},"dijit/_WidgetBase":function(){
define("dijit/_WidgetBase",["require","dojo/_base/array","dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/ready","dojo/Stateful","dojo/topic","dojo/_base/window","./registry"],function(_1fe,_1ff,_200,_201,_202,_203,dom,_204,_205,_206,_207,_208,_209,lang,on,_20a,_20b,_20c,win,_20d){
var _20e=typeof (dojo.global.perf)!="undefined";
if(!_209.isAsync){
_20a(0,function(){
var _20f=["dijit/_base/manager"];
_1fe(_20f);
});
}
var _210={};
function _211(obj){
var ret={};
for(var attr in obj){
ret[attr.toLowerCase()]=true;
}
return ret;
};
function _212(attr){
return function(val){
_204[val?"set":"remove"](this.domNode,attr,val);
this._set(attr,val);
};
};
return _203("dijit._WidgetBase",_20b,{id:"",_setIdAttr:"domNode",lang:"",_setLangAttr:_212("lang"),dir:"",_setDirAttr:_212("dir"),textDir:"","class":"",_setClassAttr:{node:"domNode",type:"class"},style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{},_blankGif:_201.blankGif||_1fe.toUrl("dojo/resources/blank.gif"),postscript:function(_213,_214){
this.create(_213,_214);
},create:function(_215,_216){
if(_20e){
perf.widgetStartedLoadingCallback();
}
this.srcNodeRef=dom.byId(_216);
this._connects=[];
this._supportingWidgets=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_215){
this.params=_215;
lang.mixin(this,_215);
}
this.postMixInProperties();
if(!this.id){
this.id=_20d.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
_20d.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _217=this.srcNodeRef;
if(_217&&_217.parentNode&&this.domNode!==_217){
_217.parentNode.replaceChild(this.domNode,_217);
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
if(_20e){
perf.widgetLoadedCallback(this);
}
},_applyAttributes:function(){
var ctor=this.constructor,list=ctor._setterAttrs;
if(!list){
list=(ctor._setterAttrs=[]);
for(var attr in this.attributeMap){
list.push(attr);
}
var _218=ctor.prototype;
for(var _219 in _218){
if(_219 in this.attributeMap){
continue;
}
var _21a="_set"+_219.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
})+"Attr";
if(_21a in _218){
list.push(_219);
}
}
}
_1ff.forEach(list,function(attr){
if(this.params&&attr in this.params){
}else{
if(this[attr]){
this.set(attr,this[attr]);
}
}
},this);
for(var _21b in this.params){
this.set(_21b,this[_21b]);
}
},postMixInProperties:function(){
},buildRendering:function(){
if(!this.domNode){
this.domNode=this.srcNodeRef||_206.create("div");
}
if(this.baseClass){
var _21c=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_21c=_21c.concat(_1ff.map(_21c,function(name){
return name+"Rtl";
}));
}
_205.add(this.domNode,_21c);
}
},postCreate:function(){
},startup:function(){
if(this._started){
return;
}
this._started=true;
_1ff.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
},destroyRecursive:function(_21d){
this._beingDestroyed=true;
this.destroyDescendants(_21d);
this.destroy(_21d);
},destroy:function(_21e){
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
this.destroyRendering(_21e);
_20d.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_21f){
if(this.bgIframe){
this.bgIframe.destroy(_21f);
delete this.bgIframe;
}
if(this.domNode){
if(_21f){
_204.remove(this.domNode,"widgetId");
}else{
_206.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_21f){
_206.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_220){
_1ff.forEach(this.getChildren(),function(_221){
if(_221.destroyRecursive){
_221.destroyRecursive(_220);
}
});
},uninitialize:function(){
return false;
},_setStyleAttr:function(_222){
var _223=this.domNode;
if(lang.isObject(_222)){
_208.set(_223,_222);
}else{
if(_223.style.cssText){
_223.style.cssText+="; "+_222;
}else{
_223.style.cssText=_222;
}
}
this._set("style",_222);
},_attrToDom:function(attr,_224,_225){
_225=arguments.length>=3?_225:this.attributeMap[attr];
_1ff.forEach(lang.isArray(_225)?_225:[_225],function(_226){
var _227=this[_226.node||_226||"domNode"];
var type=_226.type||"attribute";
switch(type){
case "attribute":
if(lang.isFunction(_224)){
_224=lang.hitch(this,_224);
}
var _228=_226.attribute?_226.attribute:(/^on[A-Z][a-zA-Z]*$/.test(attr)?attr.toLowerCase():attr);
_204.set(_227,_228,_224);
break;
case "innerText":
_227.innerHTML="";
_227.appendChild(win.doc.createTextNode(_224));
break;
case "innerHTML":
_227.innerHTML=_224;
break;
case "class":
_205.replace(_227,_224,this[attr]);
break;
}
},this);
},get:function(name){
var _229=this._getAttrNames(name);
return this[_229.g]?this[_229.g]():this[name];
},set:function(name,_22a){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _22b=this._getAttrNames(name),_22c=this[_22b.s];
if(lang.isFunction(_22c)){
var _22d=_22c.apply(this,Array.prototype.slice.call(arguments,1));
}else{
var _22e=this.focusNode&&!lang.isFunction(this.focusNode)?"focusNode":"domNode",tag=this[_22e].tagName,_22f=_210[tag]||(_210[tag]=_211(this[_22e])),map=name in this.attributeMap?this.attributeMap[name]:_22b.s in this?this[_22b.s]:((_22b.l in _22f&&typeof _22a!="function")||/^aria-|^data-|^role$/.test(name))?_22e:null;
if(map!=null){
this._attrToDom(name,_22a,map);
}
this._set(name,_22a);
}
return _22d||this;
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
});
return (apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr",l:uc.toLowerCase()});
},_set:function(name,_230){
var _231=this[name];
this[name]=_230;
if(this._watchCallbacks&&this._created&&_230!==_231){
this._watchCallbacks(name,_231,_230);
}
},on:function(type,func){
return _200.after(this,this._onMap(type),func,true);
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
return this.containerNode?_20d.findWidgets(this.containerNode):[];
},getParent:function(){
return _20d.getEnclosingWidget(this.domNode.parentNode);
},connect:function(obj,_232,_233){
var _234=_202.connect(obj,_232,this,_233);
this._connects.push(_234);
return _234;
},disconnect:function(_235){
var i=_1ff.indexOf(this._connects,_235);
if(i!=-1){
_235.remove();
this._connects.splice(i,1);
}
},subscribe:function(t,_236){
var _237=_20c.subscribe(t,lang.hitch(this,_236));
this._connects.push(_237);
return _237;
},unsubscribe:function(_238){
this.disconnect(_238);
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):_207.isBodyLtr();
},isFocusable:function(){
return this.focus&&(_208.get(this.domNode,"display")!="none");
},placeAt:function(_239,_23a){
if(_239.declaredClass&&_239.addChild){
_239.addChild(this,_23a);
}else{
_206.place(this.domNode,_239,_23a);
}
return this;
},getTextDir:function(text,_23b){
return _23b;
},applyTextDir:function(){
},defer:function(fcn,_23c){
var _23d=setTimeout(lang.hitch(this,function(){
_23d=null;
if(!this._destroyed){
lang.hitch(this,fcn)();
}
}),_23c||0);
return {remove:function(){
if(_23d){
clearTimeout(_23d);
_23d=null;
}
return null;
}};
}});
});
}}});
define("dojo/menu-layer",[],1);
