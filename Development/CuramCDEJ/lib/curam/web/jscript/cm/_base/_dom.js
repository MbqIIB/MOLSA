//>>built
define("cm/_base/_dom",[],function(){
var cm=dojo.global.cm||{};
dojo.global.cm=cm;
dojo.mixin(cm,{nextSibling:function(_1,_2){
return cm._findSibling(_1,_2,true);
},prevSibling:function(_3,_4){
return cm._findSibling(_3,_4,false);
},getInput:function(_5,_6){
if(!dojo.isString(_5)){
return _5;
}
var _7=dojo.query("input[name='"+_5+"'],select[name='"+_5+"']");
return _6?(_7.length>0?_7:null):(_7.length>0?_7[0]:null);
},getParentByClass:function(_8,_9){
_8=_8.parentNode;
while(_8){
if(dojo.hasClass(_8,_9)){
return _8;
}
_8=_8.parentNode;
}
return null;
},getParentByType:function(_a,_b){
_a=_a.parentNode;
_b=_b.toLowerCase();
var _c="html";
while(_a){
if(_a.tagName.toLowerCase()==_c){
break;
}
if(_a.tagName.toLowerCase()==_b){
return _a;
}
_a=_a.parentNode;
}
return null;
},replaceClass:function(_d,_e,_f){
dojo.removeClass(_d,_f);
dojo.addClass(_d,_e);
},setClass:function(_10,_11){
_10=dojo.byId(_10);
var cs=new String(_11);
try{
if(typeof _10.className=="string"){
_10.className=cs;
}else{
if(_10.setAttribute){
_10.setAttribute("class",_11);
_10.className=cs;
}else{
return false;
}
}
}
catch(e){
dojo.debug("dojo.html.setClass() failed",e);
}
return true;
},_findSibling:function(_12,_13,_14){
if(!_12){
return null;
}
if(_13){
_13=_13.toLowerCase();
}
var _15=_14?"nextSibling":"previousSibling";
do{
_12=_12[_15];
}while(_12&&_12.nodeType!=1);
if(_12&&_13&&_13!=_12.tagName.toLowerCase()){
return cm[_14?"nextSibling":"prevSibling"](_12,_13);
}
return _12;
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
},toggleDisplay:function(_16){
dojo.style(_16,"display",dojo.style(_16,"display")=="none"?"":"none");
},endsWith:function(str,end,_17){
if(_17){
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
