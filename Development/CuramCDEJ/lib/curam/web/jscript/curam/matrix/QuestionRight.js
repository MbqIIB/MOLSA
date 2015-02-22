//>>built
define("curam/matrix/QuestionRight",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_1,_2,_3){
_2.provide("curam.matrix.QuestionRight");
_2.require("curam.matrix.Constants");
_2.declare("curam.matrix.QuestionRight",null,{constructor:function(_4,_5){
this.node=_4;
this.matrix=_5;
this.qId=this.node.id.replace("qr-","");
this.priorityGroup=null;
this.scoreGroup=null;
this.contradiction=null;
this.outcomeGroup=new curam.ListMap();
var _6=_2.query("> :first-child",_4)[0];
if(this.matrix.priorityExists){
this.priorityGroup=new curam.matrix.PriorityGroup(_6,this.matrix);
_6=cm.nextSibling(_6);
}
if(this.matrix.scoreExists){
this.scoreGroup=new curam.matrix.ScoreGroup(_6);
_6=cm.nextSibling(_6);
}
if(this.matrix.contradictionsExist){
this.contradiction=new curam.matrix.Contradiction(_6);
_6=cm.nextSibling(_6);
}
if(this.matrix.outcomesExist){
while(_6!=null){
this.outcomeGroup.add(_6.id,new curam.matrix.Outcome(_6));
_6=cm.nextSibling(_6);
}
}
},refreshContradictions:function(){
if(!this.contradiction){
return;
}
this.contradiction=new curam.matrix.Contradiction(this.contradiction.node);
},refreshOutcomes:function(){
if(!this.outcomeGroup){
return;
}
var _7=this.outcomeGroup;
this.outcomeGroup=new curam.ListMap();
for(var _8=0;_8<_7.keys.length;_8++){
var _9=_7.keys[_8];
this.outcomeGroup.add(_9,new curam.matrix.Outcome(_7.getObjectByKey(_9).node));
}
},positionPriority:function(_a){
if(_a.ansHeightGreaterThanDefault){
var _b=(_a.ansHeight/2)-(curam.matrix.Constants.container.ansValInputHeight/2);
curam.matrix.Constants.container.cssText.append(".matrix-container .pri-eval-").append(this.qId).append("{margin-top:").append(_b).append("px;}");
}
},positionCombinationCells:function(_c){
var c=curam.matrix.Constants.container;
if(_c.ansHeightGreaterThanDefault){
var _d=(_c.ansHeight-c.cboxHeight-c.cboxOffsetDiff)/2;
c.cssText.append(".matrix-container .cbox-eval-").append(this.qId).append("{top:").append(_d).append("px;}");
}
},addAnswer:function(){
var c=curam.matrix.Constants.container;
var _e=c.matrix.bottomRight;
var ql=c.matrix.getQuestion(this.qId);
var _f=c.matrix.bottomLeft.bottomLeftMain.questions.getObjectByIndex(0);
var _10=ql.ansGroup.getLastAddedAnswerId();
var _11=ql.node.id==_f.node.id?true:false;
var _12;
if(this.matrix.priorityExists){
this.priorityGroup.addPriority(_e.addPriority(this.qId,_10,false));
}
if(this.matrix.scoreExists){
this.scoreGroup.node.appendChild(_e.addScore(this.qId,_10,false));
}
if(this.matrix.contradictionsExist){
this.contradiction.node.appendChild(_e.addContradictionRow(this.qId,_10,_11,false));
this.refreshContradictions();
}
if(this.matrix.outcomesExist){
for(var i=0;i<this.outcomeGroup.count;i++){
_12=c.matrix.topRight.topRightTop.outcomeCols.getObjectByIndex(i).outId;
this.outcomeGroup.getObjectByIndex(i).node.appendChild(_e.addOutcomeRow(_12,this.qId,_10,_11,false));
}
this.refreshOutcomes();
}
},deleteAnswer:function(_13,_14){
var _15;
if(this.matrix.priorityExists){
var _16="pri-"+this.qId+"-"+_14;
this.priorityGroup.priorities.removeByKey(_16);
if(_13){
_2.removeClass(this.priorityGroup.priorities.getObjectByIndex(0).node,"ans");
}
_2.destroy(_2.byId(_16));
}
if(this.matrix.scoreExists){
var _17="scr-"+this.qId+"-"+_14;
this.scoreGroup.scores.removeByKey(_16);
if(_13){
_2.removeClass(this.scoreGroup.scores.getObjectByIndex(0).node,"ans");
}
_2.destroy(_2.byId(_17));
}
if(this.matrix.contradictionsExist){
var _18="contr-row-"+this.qId+"-"+_14;
this.contradiction.rows.removeByKey(_18);
if(_13){
var _19=this.contradiction.rows.getObjectByIndex(0).cells;
for(var i=0;i<_19.count;i++){
_15=_19.getObjectByIndex(i).node;
_2.addClass(_15,"cell-first-row");
if(i==_19.count-1){
_2.removeClass(_15,"cell-last-col");
_2.addClass(_15,"cell-no-border");
}else{
_2.removeClass(_15,"cell");
}
}
}
_2.destroy(_2.byId(_18));
}
if(this.matrix.outcomesExist){
var _1a,_1b,_1c,_1d=/.*-/;
var _1e=curam.matrix.util.safeSplit;
for(var _1f=0;_1f<this.outcomeGroup.count;_1f++){
_1b=this.outcomeGroup.getObjectByIndex(_1f);
_1c=_1e(_1b.node.id,"-")[1];
_1a="out-"+_1c+"-row-"+this.qId+"-"+_14;
_1b.rows.removeByKey(_1a);
for(var j=0;j<_1b.rows.getObjectByIndex(0).cells.count;j++){
_15=_1b.rows.getObjectByIndex(0).cells.getObjectByIndex(j).node;
_2.addClass(_15,"cell-first-row");
if(j==_1b.rows.getObjectByIndex(0).cells.count-1){
_2.removeClass(_15,"cell-last-col");
_2.addClass(_15,"cell-no-border");
}else{
_2.removeClass(_15,"cell");
}
}
_2.destroy(_2.byId(_1a));
}
}
},getContradictionCount:function(){
var _20=this.contradiction.rows.getObjectByIndex(0);
if(_20){
return _20.cells.count;
}
return 0;
},getOutcome:function(_21){
return this.outcomeGroup.getObjectByKey("out-"+_21+"-"+this.qId);
}});
});
