//>>built
define("curam/ieg",[],function(){
var _1=new Array("previous-pages-panel","help-panel","notes-panel","unanswered-questions-panel","summary-panel");
var _2="tab-panel";
var _3="detail-panel";
var _4=0;
var _5=new Array();
var _6;
var _7;
var _8="question-script-panel-inner";
var _9=".";
var _a=0;
var _b=1;
var _c=2;
var _d=3;
var _e=4;
var _f="__o3ieg";
var _10="unans";
var _11=_f+_10;
var _12="ans";
var _13=_f+_12;
var _14=_f+"gtq";
var _15=_f+"gtt";
var _16="tab";
var _17="tab-end";
var _18="tab-sel";
var _19="tab-end-sel";
dojo.global.pageContainsClassicIEG=true;
dojo.global.loadTabs=function(){
if(dojo.byId(_2)!=null){
var _1a=getFirstTabID();
for(var i=0;i<_1.length;i++){
var _1b=dojo.byId(_1[i]);
if(_6==null){
_6=_1b.parentNode;
}
if(_1[i]==_1a){
_5[_1[i]]=_1b;
_7=_1b;
}else{
dojo.addClass(_1b,"hide-tab");
_5[_1[i]]=_1b;
}
}
dojo.addClass(_7,"current");
setTabFocus();
highlightCurrentPage();
}
setQuestionFocus();
formatLabelText();
resetTextAreas();
setIEGSystemParameters();
};
dojo.global.resetTextAreas=function(){
var _1c=document.getElementsByTagName("TEXTAREA");
if(_1c==null){
return;
}
for(var i=0;i<_1c.length;i++){
if(_1c[i].value==" "){
_1c[i].value="";
}
}
};
dojo.global.formatLabelText=function(){
var _1d=document.getElementsByTagName("SPAN");
if(_1d==null){
return;
}
for(var i=0;i<_1d.length;i++){
if(dojo.hasClass(_1d[i],"format-text")){
_1d[i].innerHTML=formatLinebreaks(_1d[i].getAttribute("title"));
}
}
};
dojo.global.getFirstTabID=function(){
var _1e=dojo.byId("tabs");
var _1f=_1e.childNodes[0];
var _20=_1f.childNodes[0];
var _21=_20.childNodes[0].childNodes[0];
var _22=_21.childNodes[0];
var _23=_22.id;
var _24=_23.substring(0,_23.length-4);
return _24;
};
dojo.global.setQuestionFocus=function(){
var _25=dojo.global.location.search.substring(1);
var _26=getParameter(_25,_14);
if(_26!=null){
var _27=dojo.byId(_13+_9+_26);
if(_27!=null){
_27.focus();
}
}else{
var _28=dojo.byId("questions");
if(_28==null){
alert("IEG Page Layout Invalid");
return;
}
var _29=getFirstQuestionRow(_28);
if(_29==null){
return;
}
var _2a=_29.childNodes[1];
for(var i=0;i<_2a.childNodes.length;i++){
var _2b=_2a.childNodes[i];
if(_2b.tagName=="INPUT"){
var _2c=_2b.getAttribute("type");
if(_2c=="text"||_2c=="checkbox"||_2c=="radio"){
_2b.focus();
break;
}
}else{
if(_2b.tagName=="SELECT"){
_2b.focus();
break;
}
}
}
}
};
dojo.global.getFirstQuestionRow=function(_2d){
var _2e=_2d.childNodes;
for(var i=0;i<_2e.length;i++){
if(_2e[i].nodeName=="TR"&&(_2e[i].className==null||_2e[i].className=="")){
return _2e[i];
}
}
};
dojo.global.setTabFocus=function(){
var _2f=dojo.global.location.search.substring(1);
var _30=getParameter(_2f,_15);
if(_30!=null){
var _31=_1[_30];
if(_31!=null){
showTab(_31);
}
}else{
var _32=getFirstTabID();
var _33=dojo.byId(_32+"-tab");
_33.style.textDecoration="underline";
var td=_33.parentNode;
var _34=td.nextSibling;
dojo.addClass(td,_18);
dojo.addClass(_34,_19);
}
};
dojo.global.showTab=function(_35){
dojo.addClass(_7,"hide-tab");
var _36=dojo.byId(_7.id+"-tab");
_36.style.textDecoration="none";
var td=_36.parentNode;
var _37=td.nextSibling;
dojo.addClass(td,_16);
dojo.addClass(_37,_17);
var _38=_5[_35];
dojo.addClass(_38,"current");
_7=_38;
dojo.addClass(_7,"current");
highlightCurrentPage();
_36=dojo.byId(_35+"-tab");
_36.style.textDecoration="underline";
td=_36.parentNode;
_37=td.nextSibling;
dojo.addClass(td,_18);
dojo.addClass(_37,_19);
if(dojo.global.event){
dojo.stopEvent(dojo.global.event);
}
return false;
};
dojo.global.highlightCurrentPage=function(){
if(_7.id==_1[_4]){
var _39=dojo.byId("o3iegscriptID").value;
var _3a=dojo.byId("o3iegloopidx").value;
var _3b=dojo.byId(_39+"."+_3a);
if(_3b!=null){
_3b.style.textDecoration="underline";
}
}
};
dojo.global.setScript=function(_3c){
var _3d=_3c.name;
var _3e=_3d.split(".");
var _3f=_3e[_a];
var _40=_3e[_b];
var _41="ieg.js: Could not get question script text";
if(_3f==_11){
var _42=_13+_9+_40;
var _43=dojo.byId(_42);
if(_43==null){
_43=dojo.byId(_42+".true");
}
if(_43==null){
_43=dojo.byId(_42+".prefix");
}
if(_43!=null){
_41=_43.title;
}else{
_41="";
}
}else{
_41=_3c.title;
}
_41=formatLinebreaks(_41);
dojo.byId(_8).innerHTML=_41;
};
dojo.global.formatLinebreaks=function(_44){
return _44.replace(/\n|\r|\r\n/g,"<br/>");
};
dojo.global.setNodesHF=function(_45){
var _46=dojo.byId(_f+"scriptnotes.hf");
if(_46){
_46.value=_45.value;
}
};
dojo.global.printNodeInfo=function(_47){
var _48="========== Node Info =========="+"\ntagName: <"+_47.tagName+">"+"\nnodeName: <"+_47.nodeName+">"+"\nnodeType: <"+_47.nodeType+">"+"\nnodeValue: <"+_47.nodeValue+">"+"\nclassName: <"+_47.className+">"+"\nhasChildNodes: <"+_47.hasChildNodes()+">"+"\nnumber of child nodes: <"+_47.childNodes.length+">";
var _49=_47.attributes;
_48+="\n==== Attributes ====";
for(var i=0;i<_49.length;i++){
if(_49[i].value!=null&&_49[i].value!="null"&&_49[i].value!=""){
_48+="\nname: <"+_49[i].name+">";
_48+="\nvalue: <"+_49[i].value+">";
}
}
_48+="\n===================="+"\n==== innerHTML ====="+"\n"+_47.innerHTML+"\n===================="+"\n===============================";
alert(_48);
};
dojo.global.getParameter=function(_4a,_4b){
var _4b=_4b+"=";
if(_4a.length>0){
begin=_4a.indexOf(_4b);
if(begin!=-1){
begin+=_4b.length;
end=_4a.indexOf("&",begin);
if(end==-1){
end=_4a.length;
}
return _4a.substring(begin,end);
}
return null;
}
};
dojo.global.setIEGSystemParameters=function(){
var _4c=dojo.byId("__o3iegsysparams");
if(!_4c){
return;
}
var val=_4c.value;
if(val.indexOf("?")==0||val.indexOf("&")==0){
val=val.substring(1);
}
var _4d=val.split("&");
var _4e=document.forms[0];
for(var i=0;i<_4d.length;i++){
var p=_4d[i].split("=");
var _4f=p[0];
var _50=p[1];
if(_4f&&_50&&!dojo.byId(_4f)){
dojo.create("input",{type:"hidden",name:_4f,value:_50},_4e);
}
}
};
return {};
});
