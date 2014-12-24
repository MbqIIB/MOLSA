//>>built
define("curam/matrix/QuestionLeft",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_1,_2,_3){
_2.provide("curam.matrix.QuestionLeft");
_2.require("curam.matrix.Constants");
_2.declare("curam.matrix.QuestionLeft",null,{constructor:function(_4){
this.node=_4;
this.qId=this.node.id.replace("ql-","");
var _5=this.node.childNodes;
for(var i=0;i<_5.length;i++){
if(_5[i].nodeType==1){
if(_5[i].id=="num-"+this.qId){
this.number=new curam.matrix.Number(_5[i],this.qId);
}else{
if(_5[i].id=="ques-"+this.qId){
this.question=new curam.matrix.QuestionText(_5[i]);
}else{
this.ansGroup=new curam.matrix.AnswerGroup(_5[i],this);
}
}
}
}
curam.matrix.Constants.container.addQuestionId(this.qId);
},setDimensions:function(){
var _6=(this.ansGroup.answers.count*curam.matrix.Constants.container.reducedAnswHeight)+((this.ansGroup.answers.count-1)*curam.matrix.Constants.MATRIX_BORDER_SIZE);
var _7=(curam.matrix.Constants.container.existingQuestionIds.indexOf(this.qId)>0)?0:curam.matrix.Constants.container.fullAnswerHeight-curam.matrix.Constants.container.reducedAnswHeight;
_6+=_7;
this.setHeight(_6+curam.matrix.Constants.MATRIX_BORDER_SIZE);
curam.matrix.Constants.container.cssText.append(".matrix-container .").append("q-ct-eval-").append(this.qId).append("{height:").append(_6).append("px;}.matrix-container .").append(this.qId).append("-eval{height:").append(this.height).append("px;}").append(".matrix-container .").append("q-ct-eval-").append(this.qId).append(" .default-q-height-eval{height:").append(_6).append("px;}");
this.number.verticallyCenterText(_6,this.qId);
this.question.verticallyCenterText(_6,this.qId);
return this.height;
},setHeight:function(_8){
this.height=_8;
},addAnswer:function(){
var _9=this.ansGroup;
var _a=_9.getLastAddedAnswerId();
var _b=_a.split("_");
_b=Number(_b[_b.length-1])+1;
_9.answerCount++;
var _c=curam.matrix.Constants.container.matrix.bottomLeft.bottomLeftMain.createAnswer(this.qId,_9.answerType,_b,_9.getOptions());
var _d=new curam.matrix.Answer(_c,_9.answerType,this);
_9.answers.add(_c.id,_d);
_9.node.appendChild(_c);
_d.init();
this.setDimensions();
return _c.offsetHeight;
},getAnswer:function(_e){
return this.getAnswerById("ans-"+this.qId+"-"+_e);
},getAnswerById:function(id){
return this.ansGroup.answers.getObjectByKey(id);
},deleteAnswer:function(_f,id){
this.ansGroup.answers.removeByKey(id);
if(_f){
_2.removeClass(this.ansGroup.answers.getObjectByIndex(0).node,"ans");
}
_2.destroy(_2.byId(id));
this.setDimensions();
this.ansGroup.answerCount=this.ansGroup.answers.count;
}});
});
