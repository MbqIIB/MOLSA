//>>built
require({cache:{"cm/_base/_behavior":function(){
define("cm/_base/_behavior",["dojo/behavior"],function(){
var cm=dojo.global.cm||{};
dojo.global.cm=cm;
dojo.mixin(cm,{behaviors:{},addedBehaviors:{},addBehavior:function(_1){
var b=cm.behaviors[_1];
if(b&&!cm.addedBehaviors[_1]){
dojo.behavior.add(b);
cm.addedBehaviors[_1]=true;
dojo.behavior.apply();
}
},registerBehavior:function(_2,_3){
cm.behaviors[_2]=_3;
}});
return cm;
});
},"cm/_base/_validation":function(){
define("cm/_base/_validation",[],function(){
var cm=dojo.global.cm||{};
dojo.global.cm=cm;
dojo.mixin(cm,{validation:{messages:{},strings:{},validationFns:{},addLocalizedString:function(id,_4){
cm.validation.strings[id]=_4;
},getLocalizedString:function(id){
return cm.validation.strings[id]||"";
},addMessage:function(_5,_6,_7){
_5=cm.validation._getInputName(_5);
var _8=cm.getFormItems().getLabel(_5);
if(!_8){
return;
}
if(_7){
_6=cm.validation.getLocalizedString(_6);
}
cm.validation.messages[_5]=cm.validation.replaceTokens(_6,_8);
dojo.publish(cm.topics.VALIDATION_MSG_ADDED,[{name:_5,msg:_6}]);
},removeMessage:function(_9){
_9=cm.validation._getInputName(_9);
if(!cm.getFormItems().getLabel(_9)){
return;
}
delete cm.validation.messages[_9];
dojo.publish(cm.topics.VALIDATION_MSG_REMOVED,[_9]);
},getMessage:function(_a,_b){
_a=cm.validation._getInputName(_a);
if(_b){
cm.validation._refreshValidation(_a);
}
return cm.validation.messages[_a];
},getAllMessages:function(_c,_d){
var _e=[];
var _f=cm.validation.messages;
if(_d){
for(var _10 in _f){
cm.validation._refreshValidation(_10);
}
}
for(var _10 in _f){
if(_c){
_e.push({input:dojo.query("input[name='"+_10+"'],select[name='"+_10+"']")[0],msg:_f[_10]});
}else{
_e.push(_f[_10]);
}
}
return _e;
},registerValidation:function(_11,fn,_12){
cm.validation.validationFns[_11]={fn:fn,node:_12};
},validateMandatory:function(_13,_14){
var n=_13;
var v=cm.validation;
v._checkMandatory(_13);
switch(_14){
case "text":
case "password":
if(n._mandatory&&(!n.value||dojo.trim(n.value).length==0)){
v.addMessage(n,"MANDATORY_FIELD",true);
}else{
v.removeMessage(n);
}
break;
case "radio":
if(!n._siblings){
var _15=dojo.query("input[name='"+n.getAttribute("name")+"']");
_15.forEach(function(_16){
_16._siblings=_15;
});
}
if(n.checked){
v.removeMessage(n);
}else{
var _17=false;
n._siblings.forEach(function(_18){
if(_18.checked){
_17=true;
}
});
if(!_17){
v.addMessage(n,"MANDATORY_FIELD",true);
}
}
break;
case "checkbox":
if(n._mandatory&&!n.checked){
v.addMessage(n,"MANDATORY_FIELD",true);
}else{
v.removeMessage(n);
}
break;
case "select":
if(n._mandatory&&(!n.value||dojo.trim(n.value).length==0)){
v.addMessage(n,"MANDATORY_FIELD",true);
}else{
v.removeMessage(n);
}
break;
}
},replaceTokens:function(str){
for(var i=0;i<arguments.length;i++){
tok="%"+i+"s";
str=str.split(tok).join("<span class=\"val-msg\">"+arguments[i+1]+"</span>");
}
return str;
},_refreshValidation:function(_19){
var _1a=cm.validation.validationFns[_19];
if(_1a){
_1a.fn(_1a.node);
}
},_checkMandatory:function(_1b){
if(typeof (_1b._mandatory)!="undefined"){
return;
}
_1b._mandatory=cm.getFormItems().isMandatory(_1b.getAttribute("name"));
},_getInputName:function(_1c){
return dojo.isString(_1c)?_1c:_1c.getAttribute("name");
}}});
return cm.validation;
});
},"cm/_base/_topics":function(){
define("cm/_base/_topics",[],function(){
var cm=dojo.global.cm||{};
dojo.global.cm=cm;
dojo.mixin(cm,{topics:{MANDATORY_FIELD_VALIDATION:"topic_mandatory_field_validation",VALIDATION_MSG_ADDED:"topic_validation_msg_added",VALIDATION_MSG_REMOVED:"topic_validation_msg_removed"}});
return cm.topics;
});
},"cm/_base/_pageBehaviors":function(){
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
function _1d(_1e){
return function(evt){
cm.validation.validateMandatory(evt.target?evt.target:evt,_1e);
};
};
function _1f(_20,_21){
var obj={};
var fn=_1d(_20);
dojo.forEach(_21,function(evt){
obj[evt]=fn;
});
obj.found=function(_22){
cm.validation.registerValidation(_22.getAttribute("name"),fn,_22);
fn(_22);
};
return obj;
};
cm.registerBehavior("MANDATORY_FIELD_VALIDATION",{"input[type='text'],input[type='password']":_1f("text",["blur","onkeyup"]),"input[type='checkbox']":_1f("checkbox",["blur","onclick"]),"select":_1f("select",["blur","onchange"]),"input[type='radio']":_1f("radio",["blur","onclick"])});
return cm;
});
},"dojo/behavior":function(){
define("dojo/behavior",["./_base/kernel","./_base/lang","./_base/array","./_base/connect","./query","./ready"],function(_23,_24,_25,_26,_27,_28){
_23.behavior=new function(){
function _29(obj,_2a){
if(!obj[_2a]){
obj[_2a]=[];
}
return obj[_2a];
};
var _2b=0;
function _2c(obj,_2d,_2e){
var _2f={};
for(var x in obj){
if(typeof _2f[x]=="undefined"){
if(!_2e){
_2d(obj[x],x);
}else{
_2e.call(_2d,obj[x],x);
}
}
}
};
this._behaviors={};
this.add=function(_30){
_2c(_30,this,function(_31,_32){
var _33=_29(this._behaviors,_32);
if(typeof _33["id"]!="number"){
_33.id=_2b++;
}
var _34=[];
_33.push(_34);
if((_24.isString(_31))||(_24.isFunction(_31))){
_31={found:_31};
}
_2c(_31,function(_35,_36){
_29(_34,_36).push(_35);
});
});
};
var _37=function(_38,_39,_3a){
if(_24.isString(_39)){
if(_3a=="found"){
_26.publish(_39,[_38]);
}else{
_26.connect(_38,_3a,function(){
_26.publish(_39,arguments);
});
}
}else{
if(_24.isFunction(_39)){
if(_3a=="found"){
_39(_38);
}else{
_26.connect(_38,_3a,_39);
}
}
}
};
this.apply=function(){
_2c(this._behaviors,function(_3b,id){
_27(id).forEach(function(_3c){
var _3d=0;
var bid="_dj_behavior_"+_3b.id;
if(typeof _3c[bid]=="number"){
_3d=_3c[bid];
if(_3d==(_3b.length)){
return;
}
}
for(var x=_3d,_3e;_3e=_3b[x];x++){
_2c(_3e,function(_3f,_40){
if(_24.isArray(_3f)){
_25.forEach(_3f,function(_41){
_37(_3c,_41,_40);
});
}
});
}
_3c[bid]=_3b.length;
});
});
};
};
_28(_23.behavior,"apply");
return _23.behavior;
});
},"cm/_base/_dom":function(){
define("cm/_base/_dom",[],function(){
var cm=dojo.global.cm||{};
dojo.global.cm=cm;
dojo.mixin(cm,{nextSibling:function(_42,_43){
return cm._findSibling(_42,_43,true);
},prevSibling:function(_44,_45){
return cm._findSibling(_44,_45,false);
},getInput:function(_46,_47){
if(!dojo.isString(_46)){
return _46;
}
var _48=dojo.query("input[name='"+_46+"'],select[name='"+_46+"']");
return _47?(_48.length>0?_48:null):(_48.length>0?_48[0]:null);
},getParentByClass:function(_49,_4a){
_49=_49.parentNode;
while(_49){
if(dojo.hasClass(_49,_4a)){
return _49;
}
_49=_49.parentNode;
}
return null;
},getParentByType:function(_4b,_4c){
_4b=_4b.parentNode;
_4c=_4c.toLowerCase();
var _4d="html";
while(_4b){
if(_4b.tagName.toLowerCase()==_4d){
break;
}
if(_4b.tagName.toLowerCase()==_4c){
return _4b;
}
_4b=_4b.parentNode;
}
return null;
},replaceClass:function(_4e,_4f,_50){
dojo.removeClass(_4e,_50);
dojo.addClass(_4e,_4f);
},setClass:function(_51,_52){
_51=dojo.byId(_51);
var cs=new String(_52);
try{
if(typeof _51.className=="string"){
_51.className=cs;
}else{
if(_51.setAttribute){
_51.setAttribute("class",_52);
_51.className=cs;
}else{
return false;
}
}
}
catch(e){
dojo.debug("dojo.html.setClass() failed",e);
}
return true;
},_findSibling:function(_53,_54,_55){
if(!_53){
return null;
}
if(_54){
_54=_54.toLowerCase();
}
var _56=_55?"nextSibling":"previousSibling";
do{
_53=_53[_56];
}while(_53&&_53.nodeType!=1);
if(_53&&_54&&_54!=_53.tagName.toLowerCase()){
return cm[_55?"nextSibling":"prevSibling"](_53,_54);
}
return _53;
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
},toggleDisplay:function(_57){
dojo.style(_57,"display",dojo.style(_57,"display")=="none"?"":"none");
},endsWith:function(str,end,_58){
if(_58){
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
},"cm/_base/_form":function(){
define("cm/_base/_form",[],function(){
var cm=dojo.global.cm||{};
dojo.global.cm=cm;
dojo.mixin(cm,{checkAll:function(_59,_5a){
cm.query("input[type='checkbox']",_5a).forEach("item.checked = "+(_59?"true":"false"));
},setFormSubmitted:function(_5b,_5c){
_5b._alreadySubmitted=_5c;
},wasFormSubmitted:function(_5d){
return _5d._alreadySubmitted;
},getFormItems:function(){
if(cm._formItems){
return cm._formItems;
}
var _5e=dojo.query("input[name='__o3fmeta']");
var _5f=_5e.length>0?dojo.fromJson(_5e[0].value):{};
var _60=[];
for(var x in _5f){
_60.push(x);
}
cm._formItems=new function(){
this.length=function(){
return _60.length;
};
this.getNames=function(){
return _60;
};
this.getInputs=function(_61){
var _62=[];
dojo.forEach(_60,function(_63,_64){
if(!_61||this.isMandatory(_64)){
_62.push("[name='"+_63+"']");
}
},this);
return _62.length>0?dojo.query(_62.join(",")):[];
};
function fn(_65){
return function(_66){
var d=_5f[dojo.isString(_66)?_66:_60[_66]];
return d?d[_65]:null;
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
}}});
define("dojo/cdej-cm",[],1);
