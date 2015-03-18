//>>built
define("curam/matrix/Priority",["dijit","dojo","dojox","dojo/require!curam/util,curam/matrix/util"],function(_1,_2,_3){
_2.provide("curam.matrix.Priority");
_2.require("curam.util");
_2.require("curam.matrix.util");
_2.declare("curam.matrix.Priority",null,{constructor:function(_4,_5,_6){
this.node=_4;
this.validation=_2.query("> :first-child",_4)[0];
this.input=_2.query("> :first-child",this.validation)[0];
this.input.priorityGroup=_6;
this.input.priority=this;
curam.util.connect(this.input,"onkeyup",function(e){
_5.priorityValidator.validatePriority(arguments[0]);
return false;
});
curam.util.connect(this.input,"onblur",function(e){
_5.priorityValidator.checkPriorityValidation(e);
return false;
});
curam.matrix.util.makeNumericInput(this.input,true);
},adjustFirstRowClass:function(_7){
var _8=_2.attr(this.node,"class");
if(_8.indexOf("ans-eval-with-menu")==-1){
_8=_8.replace("ans-eval","ans-eval-with-menu");
cm.setClass(this.node,_8);
}
_8=_2.attr(this.validation,"class");
if(_8.indexOf("ans-str-val-eval-with-menu")==-1){
_8=_8.replace("ans-str-val-eval","ans-str-val-eval-with-menu");
cm.setClass(this.validation,_8);
}
}});
});
