//>>built
define("curam/matrix/ScoreGroup",["dijit","dojo","dojox"],function(_1,_2,_3){
_2.provide("curam.matrix.ScoreGroup");
_2.declare("curam.matrix.ScoreGroup",null,{constructor:function(_4){
this.node=_4;
this.scores=new curam.ListMap();
var _5=this.node.childNodes;
for(var i=0;i<_5.length;i++){
if(_5[i].nodeType==1){
this.scores.add(_5[i].id,new curam.matrix.Score(_5[i]));
}
}
}});
_2.declare("curam.matrix.Score",null,{constructor:function(_6){
this.node=_6;
this.scoreValidation=_2.query("> :first-child",_6)[0];
this.input=_2.query("> :first-child",this.scoreValidation)[0];
curam.matrix.util.makeNumericInput(this.input);
},adjustFirstRowClass:function(_7){
var _8=_2.attr(this.node,"class");
if(_8.indexOf("ans-eval-with-menu")==-1){
_8=_8.replace("ans-eval","ans-eval-with-menu");
cm.setClass(this.node,_8);
}
_8=_2.attr(this.scoreValidation,"class");
if(_8.indexOf("ans-str-val-eval-with-menu")==-1){
_8=_8.replace("ans-str-val-eval","ans-str-val-eval-with-menu");
cm.setClass(this.scoreValidation,_8);
}
}});
});
