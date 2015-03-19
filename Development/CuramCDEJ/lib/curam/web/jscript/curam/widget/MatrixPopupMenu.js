//>>built
define("curam/widget/MatrixPopupMenu",["dijit","dojo","dojox","dojo/require!dijit/Menu,dijit/MenuSeparator,curam/matrix/Constants"],function(_1,_2,_3){
_2.provide("curam.widget.MatrixPopupMenu");
_2.require("dijit.Menu");
_2.require("dijit.MenuSeparator");
_2.require("curam.matrix.Constants");
_2.declare("curam.widget.MatrixPopupMenu",_1.Menu,{id:"",allMenuItemsDisabled:false,mcontainer:null,leftClickToOpen:true,postCreate:function(){
this.inherited(arguments);
_2.place(this.domNode,_2.body());
_2.style(this.domNode,"display","none");
_2.addOnLoad(_2.hitch(this,function(){
if(!this.mcontainer){
this.mcontainer=curam.matrix.Constants.container;
}
_2.subscribe("/disableMenuItems",this,"setDisableAllItems");
_2.subscribe("/enableMenuItems",this,"setEnableAllItems");
if(this.mcontainer.matrix&&this.mcontainer.matrix.isValidationActive()){
this.setDisableAllItems();
}
}));
},setButton:function(_4){
this.myParent=_4;
},setDisableAllItems:function(){
this.allMenuItemsDisabled=true;
},setEnableAllItems:function(){
this.allMenuItemsDisabled=false;
},enableAllItems:function(){
var _5=this.getMenuItems();
for(var i=0;i<_5.length;i++){
_5[i].enableItem();
}
},_openMyself:function(_6){
if(curam.matrix.Constants.container.matrix.isValidationActive()){
return;
}
if(!this.allMenuItemsDisabled){
_1.Menu.prototype._openMyself.call(this,_6);
var _7=_6.target;
setTimeout(_2.hitch(this,function(){
this.enableAllItems();
this.checkValidations(this.myParent);
this.explodeSrc=_7;
}),2);
}
},checkValidations:function(_8){
var _9=this.getMenuItems();
if(this.id=="OutcomeOptions"){
this.checkOutcomeGroupOptions(_9,_8);
}else{
if(this.id=="AnswerOptions"){
this.checkAnswerOptions(_9,_8);
}else{
if(this.id=="QuestionOptions"){
this.checkQuestionOptions(_9,_8);
}else{
if(this.id=="CombinationOptions"){
this.checkSingleOutcomeOptions(_9,_8);
}
}
}
}
},getMenuItems:function(){
if(!this.menuItems){
this.menuItems=_2.query("> .dijitMenuItem",this.containerNode).map(_1.byNode);
_2.forEach(this.menuItems,_2.hitch(this,function(_a){
this.menuItems[_a.id]=_a;
}));
}
return this.menuItems;
},checkOutcomeGroupOptions:function(_b,_c){
var _d=this.mcontainer.matrix.hasCopiedCombination();
_2.forEach(_b,_2.hitch(this,function(_e){
if(_e.id=="pasteCombination"&&!_d){
_e.set("disabled",true);
}
}));
},checkAnswerOptions:function(_f,_10){
var _11=this.mcontainer.matrix.getQuestionFromAnswerId(this.answerId);
var _12=_11.ansGroup;
var _13=_12.answers.getObjectByKey(this.answerId);
if((_12.answerCount==1||_12.answerType==curam.matrix.Constants.ANSWER_TYPE_BOOLEAN)&&_f["deleteAnswer"]){
_f["deleteAnswer"].set("disabled",true);
}
if((_12.answerType!=curam.matrix.Constants.ANSWER_TYPE_NUMERIC||!_13.specificValue)&&_f[curam.matrix.Constants.MIN_MAX]){
_f[curam.matrix.Constants.MIN_MAX].set("disabled",true);
}
if((_12.answerType==curam.matrix.Constants.ANSWER_TYPE_NUMERIC&&_13.specificValue&&_f["useValue"])||_12.answerType!=curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
_f["useValue"].set("disabled",true);
}
},checkQuestionOptions:function(_14,_15){
var _16=_15.id.replace("num-","");
var _17=this.mcontainer.matrix.bottomLeft.bottomLeftMain.getQuestion(_16);
if(_17==null){
return;
}
var _18=(typeof (_17["answerType"]=="undefined"))?_17.ansGroup.answerType:_17.answerType;
if(_14["addAnswer"]){
if(_18==curam.matrix.Constants.ANSWER_TYPE_BOOLEAN){
_14["addAnswer"].set("disabled",true);
}else{
if(_18==curam.matrix.Constants.ANSWER_TYPE_CODETABLE&&_17.ansGroup.answerCount==_17.getAnswer(1).select.length){
_14["addAnswer"].set("disabled",true);
}
}
}
},checkSingleOutcomeOptions:function(_19,_1a){
var _1b;
var _1c=this.determineIfContradiction(this.combinationId);
if(_1c){
_1b=this.determineNumCombsInContradictions();
}else{
_1b=this.determineNumCombsInOutcome(_1a.id);
}
for(var i=0;i<_19.length;i++){
if(_19[i].id=="deleteCombination"&&_1b==1){
_19[i].set("disabled",true);
}
if(_19[i].id=="addMessage"&&!_1c){
_19[i].set("disabled",true);
}
}
},determineIfContradiction:function(id){
return (id.indexOf("contr")==0);
},determineNumCombsInContradictions:function(){
return this.mcontainer.matrix.bottomRight.questions.getObjectByIndex(0).getContradictionCount();
},determineNumCombsInOutcome:function(id){
return this.mcontainer.matrix.getOutcome(this.combinationId).rows.getObjectByIndex(0).cells.count;
}});
});
