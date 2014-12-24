//>>built
define("curam/matrix/TopRightBottom",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_1,_2,_3){
_2.provide("curam.matrix.TopRightBottom");
_2.require("curam.matrix.Constants");
_2.declare("curam.matrix.TopRightBottom",null,{constructor:function(){
this.node=_2.byId("top-right-bottom");
this.priorityHeading=null;
this.priorityHeadingText=null;
this.scoreHeading=null;
this.scoreHeadingText=null;
this.contradictionHeadingWidth=null;
this.contradictionHeading=null;
this.matrix=curam.matrix.Constants.container.matrix;
this.outcomeHeadings=new curam.ListMap();
var _4=this.node.childNodes;
for(var i=0;i<_4.length;i++){
if(_4[i].nodeType==1){
if(_4[i].id=="heading-pri"){
this.priorityHeading=_4[i];
this.priorityHeadingText=_2.query("> :first-child",this.priorityHeading)[0];
}else{
if(_4[i].id=="heading-scr"){
this.scoreHeading=_4[i];
this.scoreHeadingText=_2.query("> :first-child",this.scoreHeading)[0];
}else{
if(_4[i].id=="heading-contr"){
this.contradictionHeadingWidth=_4[i].offsetWidth;
this.contradictionHeading=_4[i];
}else{
this.outcomeHeadings.add(_4[i].id,_4[i]);
}
}
}
}
}
},addPriority:function(){
var _5=_2.create("div",{id:"heading-pri","class":"column-heading column-eval pri-col-eval",innerHTML:"<div title=\""+curam.matrix.Constants.container.i18nMsgs.headerPriority+"\">"+curam.matrix.Constants.container.i18nMsgs.headerPriority+"</div>"},this.node,"first");
this.priorityHeading=_5;
this.priorityHeadingText=_2.query("> :first-child",this.priorityHeading)[0];
},addScore:function(){
var _6=this.matrix.priorityExists?1:0;
var _7=_2.create("div",{id:"heading-scr","class":"column-heading column-eval pri-col-eval",innerHTML:"<div title=\""+curam.matrix.Constants.container.i18nMsgs.headerScore+"\">"+curam.matrix.Constants.container.i18nMsgs.headerScore+"</div>"},this.node,_6);
this.scoreHeading=_7;
this.scoreHeadingText=_2.query("> :first-child",this.scoreHeading)[0];
},addContradiction:function(){
var _8=0,_9;
if(this.matrix.scoreExists){
_9=_2.byId("heading-scr");
}else{
if(this.matrix.priorityExists){
_9=_2.byId("heading-pri");
}
}
var _a=_2.create("div",{id:"heading-contr","class":"column-heading column-eval contr-col-eval",innerHTML:"<div title=\""+curam.matrix.Constants.container.i18nMsgs.headerContradictions+"\">"+curam.matrix.Constants.container.i18nMsgs.headerContradictions+"</div>"});
if(_9){
_2.place(_a,_9,"after");
}else{
_2.place(_a,this.node,0);
}
this.contradictionHeading=_a;
this.contradictionHeadingWidth=_2.query("> :first-child",_a)[0].offsetWidth;
},addOutcomeColumn:function(_b){
var _c=_2.create("div",{id:"heading-"+_b[0],"class":"column-heading column-eval out-"+_b[0]+"-col-eval",innerHTML:"<a title=\""+_b[1]+"\">"+_b[1]+"</a>"},this.node,"last");
this.outcomeHeadings.add(_c.id,_c);
},deletePriorityColumn:function(){
_2.destroy(this.priorityHeading);
this.priorityHeading=null;
this.priorityHeadingText=null;
},deleteScoreColumn:function(){
_2.destroy(this.scoreHeading);
this.scoreHeading=null;
this.scoreHeadingText=null;
},deleteContradictionColumn:function(){
_2.destroy(this.contradictionHeading);
this.contradictionHeading=null;
this.contradictionHeadingWidth=0;
},deleteOutcomeColumn:function(id){
var _d=id.replace("column-id","heading");
_2.destroy(this.outcomeHeadings.getObjectByKey(_d));
this.outcomeHeadings.removeByKey(_d);
}});
});
