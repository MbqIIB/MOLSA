//>>built
define("curam/matrix/AnswerGroup",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_1,_2,_3){
_2.provide("curam.matrix.AnswerGroup");
_2.require("curam.matrix.Constants");
_2.declare("curam.matrix.AnswerGroup",null,{constructor:function(_4,_5){
this.node=_4;
this.answers=new curam.ListMap();
this.ansHeightGreaterThanDefault=false;
this.answerType=this.setAnswerType(_2.query("> :first-child",this.node)[0]);
this.answerCount=0;
var _6=this.node.childNodes;
for(var i=0;i<_6.length;i++){
if(_6[i].nodeType==1){
var _7=new curam.matrix.Answer(_6[i],this.answerType,_5);
this.answers.add(_6[i].id,_7);
_7.init();
this.answerCount++;
}
}
},setAnswerType:function(_8){
var _9=_2.query("> :first-child",_8)[0];
if(_2.hasClass(_9,"ans-ct-val")||_2.hasClass(_9,"ans-ct-val-with-menu")){
return curam.matrix.Constants.ANSWER_TYPE_CODETABLE;
}else{
if(_2.hasClass(_9,"ans-str-val-eval")||_2.hasClass(_9,"ans-str-val-eval-with-menu")){
return curam.matrix.Constants.ANSWER_TYPE_STRING;
}else{
if(_2.hasClass(_9,"ans-bool-val-eval")||_2.hasClass(_9,"ans-bool-val-eval-with-menu")){
return curam.matrix.Constants.ANSWER_TYPE_BOOLEAN;
}else{
return curam.matrix.Constants.ANSWER_TYPE_NUMERIC;
}
}
}
},getOptions:function(){
if(this.answerType==curam.matrix.Constants.ANSWER_TYPE_CODETABLE){
return this.answers.getObjectByIndex(0).getOptions();
}
},getAnswerIds:function(){
var _a=new Array();
var _b=/^ans-.*-/;
for(var i=0;i<this.answers.count;i++){
_a.push(this.answers.getKeyByIndex(i).replace(_b,""));
}
return _a;
},getLastAddedAnswerId:function(){
var _c=/^ans-.*-/;
return this.answers.getKeyByIndex(this.answers.count-1).replace(_c,"");
}});
});
