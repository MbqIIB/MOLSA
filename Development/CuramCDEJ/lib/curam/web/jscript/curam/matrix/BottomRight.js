//>>built
define("curam/matrix/BottomRight",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_1,_2,_3){
_2.provide("curam.matrix.BottomRight");
_2.require("curam.matrix.Constants");
_2.declare("curam.matrix.BottomRight",null,{constructor:function(_4){
this.node=_2.byId("bottom-right");
this.matrix=_4;
this.questions=new curam.ListMap();
var _5=this.node.childNodes;
for(var i=0;i<_5.length;i++){
if(_5[i].nodeType==1){
this.questions.add(_5[i].id,new curam.matrix.QuestionRight(_5[i],this.matrix));
}
}
},setDimensions:function(){
var _6,_7;
var _8;
for(var i=0;i<this.questions.count;i++){
_6=this.questions.getObjectByIndex(i);
_8=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.getQuestion(_6.qId).ansGroup;
_6.positionPriority(_8);
_6.positionCombinationCells(_8);
}
this.setWidth();
},setWidth:function(){
var c=curam.matrix.Constants.container;
c.cssText.append(".matrix-container .bottom-right-eval{width:").append(c.matrix.topRight.width+c.scrollBarWidth).append("px;}");
},addQuestion:function(_9){
var _a=_2.create("div",{id:"qr-"+_9[0],"class":"right-eval "+_9[0]+"-eval "});
var _b=this.questions.count==0?true:false;
if(this.matrix.priorityExists){
_a.appendChild(this.addPriorityGroup(_9[0],_9[1]));
}
if(this.matrix.scoreExists){
_a.appendChild(this.addScoreGroup(_9[0],_9[1]));
}
if(this.matrix.contradictionsExist){
_a.appendChild(this.addContradiction(_9[0],_9[1],null,_b));
}
if(this.matrix.outcomesExist){
var _c=curam.matrix.Constants.container.matrix.topRight.topRightTop.getOutcomeColIds();
for(var i=0;i<_c.length;i++){
_a.appendChild(this.addOutcome(_c[i],_9[0],_9[1],null,_b));
}
}
var _d=new curam.matrix.QuestionRight(_a,this.matrix);
this.node.appendChild(_d.node);
this.questions.add("qr-"+_9[0],_d);
},addPriorityGroup:function(_e,_f,_10){
var _11=_1.byId("pri-group-"+_e);
if(_11){
_11.destroy();
}
var _12=_2.create("div",{id:"pri-group-"+_e,"class":"q-ct pri-col-eval q-ct-eval-"+_e});
if(_10==null){
_12.appendChild(this.addPriority(_e,1,true));
if(_f==ANSWER_TYPE_BOOLEAN){
_12.appendChild(this.addPriority(_e,2,false));
}
}else{
var _13;
for(var i=0;i<_10.length;i++){
_13=i==0?true:false;
_12.appendChild(this.addPriority(_e,_10[i],_13));
}
}
return _12;
},addPriority:function(qId,_14,_15){
var _16=!_15?"ans":"";
var _17=(_15&&(curam.matrix.Constants.container.existingQuestionIds.indexOf(qId)==0))?"-with-menu":"";
var _18=_2.create("div",{id:"pri-"+qId+"-"+_14,"class":_16+" ans-eval"+_17+" ans-"+qId+"-eval pri-col-eval"});
var _19=_2.create("div",{id:"pri-val-"+qId+"-"+_14,"class":"pri-val pri-val-eval ans-str-val-eval"+_17+" pri-eval-"+qId},_18);
var _1a=curam.matrix.util.createInput("text");
var id=this.matrix.inputPrefix+"priority.s.s."+qId+"."+_14;
_2.attr(_1a,{id:id,name:id,"class":"pri-input-eval"});
_19.appendChild(_1a);
return _18;
},addScoreGroup:function(qId,_1b,_1c){
var _1d=_1.byId("scr-group-"+qId);
if(_1d){
_1d.destroy();
}
var _1e=_2.create("div",{id:"scr-group-"+qId,"class":"q-ct pri-col-eval q-ct-eval-"+qId});
if(_1c==null){
_1e.appendChild(this.addScore(qId,1,true));
if(_1b==ANSWER_TYPE_BOOLEAN){
_1e.appendChild(this.addScore(qId,2,false));
}
}else{
var _1f;
for(var i=0;i<_1c.length;i++){
_1f=i==0?true:false;
_1e.appendChild(this.addScore(qId,_1c[i],_1f));
}
}
return _1e;
},addScore:function(qId,_20,_21){
var _22=!_21?"ans":"";
var _23=(_21&&(curam.matrix.Constants.container.existingQuestionIds.indexOf(qId)==0))?"-with-menu":"";
var _24=_2.create("div",{id:"scr-"+qId+"-"+_20,"class":_22+" ans-eval"+_23+" ans-"+qId+"-eval pri-col-eval"});
var _25=_2.create("div",{id:"scr-val-"+qId+"-"+_20,"class":"pri-val pri-val-eval ans-str-val-eval"+_23+" pri-eval-"+qId},_24);
var _26=curam.matrix.util.createInput("text");
var id=this.matrix.inputPrefix+"score.s.s."+qId+"."+_20;
_2.attr(_26,{id:id,name:id,"class":"pri-input-eval"});
_2.place(_26,_25);
curam.matrix.util.makeNumericInput(_26);
return _24;
},addContradiction:function(qId,_27,_28,_29){
var _2a=_2.create("div",{id:"contr-group-"+qId,"class":"q-ct q-ct-eval-"+qId+" contr-col-eval"});
if(_28==null){
_2a.appendChild(this.addContradictionRow(qId,1,_29,true));
if(_27==ANSWER_TYPE_BOOLEAN){
_2a.appendChild(this.addContradictionRow(qId,2,_29,false));
}
}else{
var _2b;
for(var i=0;i<_28.length;i++){
_2b=i==0?true:false;
_2a.appendChild(this.addContradictionRow(qId,_28[i],_29,_2b));
}
}
return _2a;
},addContradictionRow:function(qId,_2c,_2d,_2e){
var _2f=_2.create("div",{id:"contr-row-"+qId+"-"+_2c,"class":"contr-col-eval"});
var _30=curam.matrix.Constants.container.matrix.topRight.topRightTop.contradictionCol.getCombColumnIds();
var _31;
for(var i=0;i<_30.length;i++){
_31=i==_30.length-1?true:false;
_2f.appendChild(this.addContradictionCell(qId,_2c,_30[i],_2d,_2e,_31));
}
return _2f;
},addContradictionCell:function(qId,_32,_33,_34,_35,_36){
var _37;
var _38="";
if(curam.matrix.Constants.container.existingQuestionIds.indexOf(qId)==0&&_35){
_38="-with-menu";
}
if(_35&&_36){
_37="cell-first-row cell-no-border";
}else{
if(_35){
_37="cell-first-row";
}else{
if(_36){
_37="cell-last-col";
}else{
_37="cell";
}
}
}
var _39=_2.create("div",{id:"contr-cell-"+qId+"-"+_32+"-"+_33,"class":_37+" ans-eval"+_38});
var id=this.matrix.inputPrefix+"contrCell."+_33+".s."+qId+"."+_32;
var _3a=_2.create("input",{id:id,type:"checkbox",name:id,"class":"cbox-eval"+_38+" contr-cbox-eval",onclick:function(evt){
curam.matrix.Constants.container.matrix.setContradictionValue(_33,evt.target,evt,qId);
return true;
}},_39);
_37=_34&&_35?"image":"hidden-image";
var _3b=_2.create("div",{"class":_37},_39);
return _39;
},addOutcome:function(_3c,qId,_3d,_3e,_3f){
var _40=_2.create("div",{id:"out-"+_3c+"-"+qId,"class":"q-ct q-ct-eval-"+qId+" out-"+_3c+"-col-eval"});
if(_3e==null){
_40.appendChild(this.addOutcomeRow(_3c,qId,1,_3f,true));
if(_3d==ANSWER_TYPE_BOOLEAN){
_40.appendChild(this.addOutcomeRow(_3c,qId,2,_3f,false));
}
}else{
var _41;
for(var i=0;i<_3e.length;i++){
_41=i==0?true:false;
_40.appendChild(this.addOutcomeRow(_3c,qId,_3e[i],_3f,_41));
}
}
return _40;
},addOutcomeRow:function(_42,qId,_43,_44,_45){
var _46=_2.create("div",{id:"out-"+_42+"-row-"+qId+"-"+_43,"class":"out-"+_42+"col-eval"});
var _47="column-id-"+_42;
var _48=curam.matrix.Constants.container.matrix.topRight.topRightTop.outcomeCols.getObjectByKey(_47).getCombColumnIds();
var _49;
for(var i=0;i<_48.length;i++){
_49=i==_48.length-1?true:false;
_46.appendChild(this.addOutcomeCell(_42,qId,_43,_48[i],_44,_45,_49));
}
return _46;
},addOutcomeCell:function(_4a,qId,_4b,_4c,_4d,_4e,_4f){
var _50;
var _51="";
if(curam.matrix.Constants.container.existingQuestionIds.indexOf(qId)==0&&_4e){
_51="-with-menu";
}
if(_4e&&_4f){
_50="cell-first-row cell-no-border";
}else{
if(_4e){
_50="cell-first-row";
}else{
if(_4f){
_50="cell-last-col";
}else{
_50="cell";
}
}
}
var _52=_2.create("div",{id:"out-"+_4a+"-cell-"+qId+"-"+_4b+"-"+_4c,"class":_50+" ans-eval"+_51+" ans-"+qId+"-eval out-"+_4a+"-cell-eval"});
var _53=this.matrix.inputPrefix+"outCell."+_4a+"."+qId+"."+_4b+"."+_4c;
var _54=_2.create("input",{type:"checkbox",id:_53,name:_53,"class":"cbox-eval"+_51+" out-"+_4a+"-cbox-eval cbox-eval-"+qId,onclick:function(e){
_55.matrix.setOutcomeValue(_4a,Number(_4c),e.target,e);
return true;
}},_52);
var _55=this;
_50=_4d&&_4e?"image":"hidden-image";
var _56=_2.create("div",{"class":_50},_52);
return _52;
},addPriorityColumn:function(){
var _57,_58;
for(var i=0;i<this.questions.count;i++){
_57=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.getQuestion(this.questions.getObjectByIndex(i).qId);
_58=this.questions.getObjectByIndex(i);
_58.priorityGroup=new curam.matrix.PriorityGroup(this.addPriorityGroup(_58.qId,_57.ansGroup.answerType,_57.ansGroup.getAnswerIds()),this.matrix);
_2.place(_58.priorityGroup.node,this.questions.getObjectByIndex(i).node,"first");
}
this.setWidth();
},addScoreColumn:function(){
var _59;
var pos=this.matrix.priorityExists?1:0;
for(var i=0;i<this.questions.count;i++){
_59=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.getQuestion(this.questions.getObjectByIndex(i).qId);
curQ=this.questions.getObjectByIndex(i);
curQ.scoreGroup=new curam.matrix.ScoreGroup(this.addScoreGroup(curQ.qId,_59.ansGroup.answerType,_59.ansGroup.getAnswerIds()));
_2.place(curQ.scoreGroup.node,this.questions.getObjectByIndex(i).node,pos);
}
this.setWidth();
},addContradictionColumn:function(){
var _5a,_5b,_5c,_5d;
var pos=0;
if(this.matrix.priorityExists){
pos++;
}
if(this.matrix.scoreExists){
pos++;
}
var _5e=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.questions;
var _5f;
for(var i=0;i<this.questions.count;i++){
_5b=i==0?true:false;
_5a=_5e.getObjectByKey("ql-"+this.questions.getObjectByIndex(i).qId);
_5d=this.questions.getObjectByIndex(i);
_5c=this.addContradiction(_5d.qId,_5a.ansGroup.answerType,_5a.ansGroup.getAnswerIds(),_5b);
_5d.contradiction=new curam.matrix.Contradiction(_5c);
_5f=this.questions.getObjectByIndex(i).node;
_2.place(_5c,_5f,pos+(_5f.firstChild&&_5f.firstChild.nodeName=="#comment"?1:0));
}
},addOutcomeColumn:function(_60){
var _61,_62,_63,_64;
for(var i=0;i<this.questions.count;i++){
_62=i==0?true:false;
_61=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.questions.getObjectByKey("ql-"+this.questions.getObjectByIndex(i).qId);
_64=this.questions.getObjectByIndex(i);
_63=this.addOutcome(_60[0],_64.qId,_61.ansGroup.answerType,_61.ansGroup.getAnswerIds(),_62);
_64.outcomeGroup.add(_63.id,new curam.matrix.Outcome(_63));
_2.place(_63,this.questions.getObjectByIndex(i).node,"last");
}
},addContradictionCombination:function(){
var _65,_66,_67,_68,_69,row,_6a,_6b;
var _6c=++curam.matrix.Constants.container.matrix.topRight.topRightTop.contradictionCol.combinationCount;
for(var i=0;i<this.questions.count;i++){
_65=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.questions.getObjectByKey("ql-"+this.questions.getObjectByIndex(i).qId);
_69=_65.ansGroup.getAnswerIds();
_66=i==0?true:false;
_67=this.questions.getObjectByIndex(i).contradiction.rows;
for(var j=0;j<_67.count;j++){
row=_67.getObjectByIndex(j);
_6a=row.cells.getObjectByIndex(row.cells.count-1).node;
_68=j==0?true:false;
this.resetCellClassForSecondLastColumn(_6a,_68);
_6b=this.addContradictionCell(_65.qId,_69[j],_6c,_66,_68,true);
row.cells.add(_6b.id,new curam.matrix.ContradictionCell(_6b));
row.node.appendChild(_6b);
}
}
return _6c;
},resetCellClassForSecondLastColumn:function(_6d,_6e){
var _6f=_6e?"cell-first-row":"cell";
if(_6e){
_2.removeClass(_6d,"cell-no-border");
}else{
_2.removeClass(_6d,"cell-last-col");
}
_2.addClass(_6d,_6f);
},resetCellClassForLastColumn:function(_70,_71){
if(_71){
_2.addClass(_70,"cell-no-border");
}else{
_2.removeClass(_70,"cell");
_2.addClass(_70,"cell-last-col");
}
},addOutcomeCombination:function(_72,id){
var _73=id.replace("column-id-","");
var _74,_75,_76,_77,_78,row,_79,_7a;
var _7b=++curam.matrix.Constants.container.matrix.topRight.topRightTop.outcomeCols.getObjectByKey(id).combinationCount;
for(var i=0;i<this.questions.count;i++){
_74=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.questions.getObjectByKey("ql-"+this.questions.getObjectByIndex(i).qId);
_78=_74.ansGroup.getAnswerIds();
_75=i==0?true:false;
_76=this.questions.getObjectByIndex(i).outcomeGroup.getObjectByKey("out-"+_73+"-"+_74.qId).rows;
for(var j=0;j<_76.count;j++){
row=_76.getObjectByIndex(j);
_79=row.cells.getObjectByIndex(row.cells.count-1).node;
_77=j==0?true:false;
this.resetCellClassForSecondLastColumn(_79,_77);
_7a=this.addOutcomeCell(_73,_74.qId,_78[j],_7b,_75,_77,true);
row.cells.add(_7a.id,new curam.matrix.OutcomeCell(_7a));
row.node.appendChild(_7a);
}
}
return _7b;
},addButtonClassToFirstRow:function(){
var _7c,_7d,_7e;
var _7f=this.questions.getObjectByIndex(0);
if(!_7f){
return;
}
var _80=this.matrix.bottomLeft.bottomLeftMain.questions.getObjectByIndex(0).getAnswer(1);
if(_80){
_80.adjustFirstRowStyle();
}
if(this.matrix.contradictionsExist){
_7c=_7f.contradiction.rows.getObjectByIndex(0).cells;
for(var j=0;j<_7c.count;j++){
_7c.getObjectByIndex(j).adjustFirstRowClass();
_7c.getObjectByIndex(j).setButtonClass("image");
}
}
if(this.matrix.outcomesExist){
for(var i=0;i<_7f.outcomeGroup.count;i++){
_7e=_7f.outcomeGroup.getObjectByIndex(i);
_7c=_7e.rows.getObjectByIndex(0).cells;
for(var j=0;j<_7c.count;j++){
_7c.getObjectByIndex(j).adjustFirstRowClass();
_7c.getObjectByIndex(j).setButtonClass("image");
}
}
}
if(this.matrix.priorityExists){
var _81=_7f.priorityGroup.priorities.getObjectByIndex(0);
_81.adjustFirstRowClass();
}
if(this.matrix.scoreExists){
var _82=_7f.scoreGroup.scores.getObjectByIndex(0);
_82.adjustFirstRowClass();
}
},deletePriorityColumn:function(){
var _83;
for(var j=0;j<this.questions.count;j++){
_83=this.questions.getObjectByIndex(j);
_2.destroy(_83.priorityGroup.node);
_83.priorityGroup=null;
}
},deleteScoreColumn:function(){
var _84;
for(var j=0;j<this.questions.count;j++){
_84=this.questions.getObjectByIndex(j);
_2.destroy(_84.scoreGroup.node);
_84.scoreGroup=null;
}
},deleteContradictionColumn:function(){
var _85;
for(var j=0;j<this.questions.count;j++){
_85=this.questions.getObjectByIndex(j);
_2.destroy(_85.contradiction.node);
_85.contradiction=null;
}
},deleteOutcomeColumn:function(id){
var _86,_87,_88;
for(var j=0;j<this.questions.count;j++){
_86=this.questions.getObjectByIndex(j);
_88="out-"+id+"-"+_86.qId;
_87=_86.outcomeGroup.getObjectByKey(_88);
_2.destroy(_87.node);
_86.outcomeGroup.removeByKey(_88);
}
},checkIfLastContrCombColumn:function(id){
var _89=this.questions.getObjectByIndex(0).contradiction.rows.getObjectByIndex(0).cells;
var _8a=_89.count;
if(_89.getIndexByKey(id)==_8a-1){
return true;
}
return false;
},checkIfLastOutCombColumn:function(_8b,_8c){
var _8d=this.questions.getObjectByIndex(0);
var _8e="out-"+_8b+"-"+_8d.qId;
var _8f=_8d.outcomeGroup.getObjectByKey(_8e).rows.getObjectByIndex(0).cells;
var _90=_8f.count;
if(_8f.getIndexByKey(_8c)==_90-1){
return true;
}
return false;
},deleteContradictionCombination:function(_91,_92){
var _93,_94,_95,_96,_97,_98;
for(var j=0;j<this.questions.count;j++){
_94=this.questions.getObjectByIndex(j);
for(var i=0;i<_94.contradiction.rows.count;i++){
_97=i==0?true:false;
_95=_94.contradiction.rows.getObjectByIndex(i);
_93=_95.node.id.replace("-row-","-cell-");
_93+="-"+_91;
_98=_95.cells.getObjectByKey(_93);
if(!_98){
continue;
}
_2.destroy(_98.node);
_95.cells.removeByKey(_93);
if(_92){
this.resetCellClassForLastColumn(_95.cells.getObjectByIndex(_95.cells.count-1).node,_97);
}
}
}
},deleteOutcomeCombination:function(_99,_9a,_9b){
var _9c,_9d,_9e,_9f,_a0,_a1;
for(var j=0;j<this.questions.count;j++){
_9d=this.questions.getObjectByIndex(j);
_9e=_9d.outcomeGroup.getObjectByKey("out-"+_99+"-"+_9d.qId);
for(var i=0;i<_9e.rows.count;i++){
_a1=i==0?true:false;
_9f=_9e.rows.getObjectByIndex(i);
_9c=_9f.node.id.replace("-row-","-cell-")+"-"+_9a;
_2.destroy(_9f.cells.getObjectByKey(_9c).node);
_9f.cells.removeByKey(_9c);
if(_9b){
this.resetCellClassForLastColumn(_9f.cells.getObjectByIndex(_9f.cells.count-1).node,_a1);
}
}
}
}});
});
