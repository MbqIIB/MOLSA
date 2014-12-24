//>>built
define("curam/matrix/TopRightTop",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_1,_2,_3){
_2.provide("curam.matrix.TopRightTop");
_2.require("curam.matrix.Constants");
_2.declare("curam.matrix.TopRightTop",null,{constructor:function(){
this.node=_2.byId("top-right-top");
this.priorityCol=null;
this.priorityColText=null;
this.scoreCol=null;
this.scoreColText=null;
this.contradictionCol=null;
this.outcomeCols=new curam.ListMap();
this.priorityWidgetCreated=false;
this.scoreWidgetCreated=false;
this.matrix=curam.matrix.Constants.container.matrix;
var _4=this.node.childNodes;
for(var i=0;i<_4.length;i++){
if(_4[i].nodeType==1){
if(_4[i].id=="column-id-pri"){
this.priorityCol=_4[i];
this.priorityColText=_2.query("> :first-child",this.priorityCol)[0];
this.priorityCol._conn=_2.connect(this.priorityCol,"onclick",this,"createPriorityButtonWidget");
}else{
if(_4[i].id=="column-id-scr"){
this.scoreCol=_4[i];
this.scoreColText=_2.query("> :first-child",this.scoreCol)[0];
this.scoreCol._conn=_2.connect(this.scoreCol,"onclick",this,"createScoreButtonWidget");
}else{
if(_4[i].id=="column-id-contr"){
this.contradictionCol=new curam.matrix.ContradictionColumn(_4[i],false);
}else{
this.outcomeCols.add(_4[i].id,new curam.matrix.OutcomeColumn(_4[i],false));
}
}
}
}
}
},createPriorityButtonWidget:function(_5){
var c=curam.matrix.Constants.container;
if(this.priorityWidgetCreated){
return;
}
_2.disconnect(this.priorityCol._conn);
var _6=new curam.widget.PriorityButton({menuId:"PriorityOptions",id:this.priorityCol.id},this.priorityCol);
curam.util.connect(_6.domNode,"onmouseover",function(_7){
_mov(_7);
});
this.matrix.initHighlighters(true,false);
_6._toggleMenu("PriorityOptions",_5);
this.priorityCol=_6.domNode;
this.priorityColText=_2.query("> :first-child",this.priorityCol)[0];
this.priorityWidgetCreated=true;
_1.byId("PriorityOptions")._openMyself(_5);
},createScoreButtonWidget:function(_8){
var c=curam.matrix.Constants.container;
if(this.scoreWidgetCreated){
return;
}
var _9=new curam.widget.ScoreButton({menuId:"ScoreOptions",id:this.scoreCol.id},this.scoreCol);
curam.util.connect(_9.domNode,"onmouseover",function(_a){
_mov(_a);
});
this.matrix.initHighlighters(false,true);
_9._toggleMenu("ScoreOptions",_8);
this.scoreCol=_9.domNode;
this.scoreColText=_2.query("> :first-child",this.scoreCol)[0];
this.scoreWidgetCreated=true;
_2.disconnect(this.scoreCol._conn);
_1.byId("ScoreOptions")._openMyself(_8);
},getOutcomeColIds:function(){
var _b;
var _c=new Array();
var _d=/^column-id-/;
for(var i=0;i<this.outcomeCols.count;i++){
_b=this.outcomeCols.getKeyByIndex(i);
_b=new String(_b);
_c.push(_b.replace(_d,""));
}
return _c;
},resyncLetters:function(){
var _e=0;
var _f=this.node.childNodes;
for(var i=0;i<_f.length;i++){
if(_f[i].nodeType==1){
if(_e<=23){
_2.query("div",_f[i])[0].innerHTML=curam.matrix.Constants.columnLetters[_e];
}else{
_2.query("div",_f[i])[0].innerHTML=curam.matrix.Constants.columnLetters[_e%23]+Math.floor(_e/23);
}
_e++;
}
}
},addPriority:function(){
var _10=_1.byId("column-id-pri");
if(_10){
_10.destroy();
}
var _11=_2.create("div",{id:"column-id-pri","class":"column-id column-eval pri-col-eval",innerHTML:"<div>C</div>"},this.node,"first");
this.priorityCol=_11;
this.priorityColText=_2.query("> :first-child",this.priorityCol)[0];
this.priorityCol._conn=_2.connect(this.priorityCol,"onclick",this,"createPriorityButtonWidget");
curam.matrix.util.initButtonListeners(_11);
this.resyncLetters();
},addScore:function(){
var pos=this.matrix.priorityExists?1:0;
var _12=_1.byId("column-id-scr");
if(_12){
_12.destroy();
}
var _13=_2.create("div",{id:"column-id-scr","class":"column-id column-eval pri-col-eval",innerHTML:"<div>D</div>"},this.node,pos);
this.scoreCol=_13;
this.scoreColText=_2.query("> :first-child",this.scoreCol)[0];
this.scoreCol._conn=_2.connect(this.scoreCol,"onclick",this,"createScoreButtonWidget");
curam.matrix.util.initButtonListeners(_13);
this.resyncLetters();
},addContradiction:function(){
var pos=0;
var c=curam.matrix.Constants.container;
if(this.matrix.priorityExists){
pos++;
}
if(this.matrix.scoreExists){
pos++;
}
var _14=_2.create("div",{id:"column-id-contr","class":"column-id column-eval contr-col-eval"},this.node,pos);
var _15=_2.create("div",{},_14);
_14.appendChild(this.addContrCombIdInput(1));
for(var i=0;i<c.locales.length;i++){
if(c.locales[i]==""){
continue;
}
_14.appendChild(this.addContrCombMessageInput(1,c.locales[i],""));
}
this.contradictionCol=new curam.matrix.ContradictionColumn(_14,true);
curam.matrix.util.initButtonListeners(_14);
this.resyncLetters();
},addContrCombIdInput:function(_16){
var id=this.matrix.inputPrefix+"contrcombid."+_16;
return _2.create("input",{id:id,name:id,type:"hidden"});
},addContrCombMessageInput:function(_17,_18,msg){
var id=this.matrix.inputPrefix+"contrmsg."+_18+"."+_17;
return _2.create("input",{id:id,name:id,type:"hidden"});
},addOutcomeColumn:function(_19){
var _1a=_2.create("div",{id:"column-id-"+_19[0],"class":"column-id column-eval out-"+_19[0]+"-col-eval"},this.node,"last");
var _1b=_2.create("div",{},_1a);
_1a.appendChild(this.addOutCombIdInput(_19[0],1));
var _1c=new curam.matrix.OutcomeColumn(_1a,true);
this.outcomeCols.add(_1c.node.id,_1c);
this.resyncLetters();
return _1c.setDimensions(_19[0]);
},addOutCombIdInput:function(_1d,_1e){
var id=this.matrix.inputPrefix+"outcombid."+_1d+"."+_1e;
return _2.create("input",{id:id,name:id,type:"hidden",value:"1"+(new Date()).getTime()});
},deletePriorityColumn:function(){
_2.destroy(this.priorityCol);
this.priorityCol=null;
this.priorityColText=null;
},deleteScoreColumn:function(){
_2.destroy(this.scoreCol);
this.scoreCol=null;
this.scoreColText=null;
},deleteContradictionColumn:function(){
_2.destroy(this.contradictionCol.node);
this.contradictionCol=null;
},deleteOutcomeColumn:function(id){
_2.destroy(this.outcomeCols.getObjectByKey(id).node);
this.outcomeCols.removeByKey(id);
}});
});
