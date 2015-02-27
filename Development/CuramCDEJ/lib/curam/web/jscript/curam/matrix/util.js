//>>built
define("curam/matrix/util",["curam/define","curam/util","curam/matrix/Constants"],function(){
var _1=curam.define.singleton("curam.matrix.util",{keys:dojo.keys,allowableCharsForNumeric:["1","2","3","4","5","6","7","8","9","0","-",".",dojo.keys.LEFT_ARROW,dojo.keys.RIGHT_ARROW,dojo.keys.DELETE,dojo.keys.BACKSPACE,dojo.keys.END,dojo.keys.HOME,dojo.keys.TAB,dojo.keys.F5],getQuestionIdFromPriorityInputId:function(id){
var _2=id.replace(curam.matrix.Constants.container.matrix.inputPrefix+"priority.s.s.","");
var _3=/\..*/;
return _2.replace(_3,"");
},getCellIndexFromContradictionCellId:function(id){
return Number(curam.matrix.util.safeSplit(id,"-")[4]);
},getQuestionIdFromAnswerId:function(_4){
var _5=_4.substring(_4.indexOf("-Q")+1);
_5=_5.substring(0,_5.indexOf("-")>0?_5.indexOf("-"):_5.length);
return _5;
},getQuestionIdFromAnswerInputId:function(id){
var _6=id.split(".");
return _6[_6.length-2];
},getAnswerIdFromAnswerInputId:function(id){
var _7=id.split(".");
return _7[_7.length-1];
},getPriorityIdFromPriorityInputId:function(id){
var _8=id.replace(curam.matrix.Constants.container.matrix.inputPrefix+"priority.s.s.","");
var _9=/^.*\./;
return _8.replace(_9,"");
},makeNumericInput:function(_a,_b){
curam.util.connect(_a,"key",curam.matrix.util[_b?"posNumericInputChecker":"numericInputChecker"]);
},checkFocus:function(){
curam.matrix.Constants.container.matrix.checkFocus(arguments[0]);
},createInput:function(_c){
var _d=dojo.create("input",{onfocus:function(){
curam.matrix.Constants.container.matrix.cf(arguments);
}});
if(_c){
_d.setAttribute("type",_c);
}
return _d;
},safeSplit:function(_e,c){
if(_e.indexOf(c+c)>-1){
var _f=_e.split(c+c);
var _10;
var _11=[];
for(var _12=0;_12<_f.length;_12++){
_10=_f[_12].split(c);
if(_12>0){
_10[0]=c+_10[0];
}
_11=_11.concat(_10);
}
return _11;
}else{
return _e.split(c);
}
},validationChecker:function(e){
var mat=curam.matrix.Constants.container.matrix;
if(mat.isValidationActive()&&!mat.isInputPartOfValidation(e.target)){
dojo.stopEvent(e);
mat.refocusValidatingInput();
return false;
}
return true;
},numericInputChecker:function(e){
if(!curam.matrix.util.validationChecker(e)){
return false;
}
if(typeof (e.key)!="undefined"){
if(e.key=="-"&&e.target.value.length!=0){
dojo.stopEvent(e);
return;
}else{
if(e.key=="."&&e.target.value.indexOf(".")!=-1){
dojo.stopEvent(e);
return;
}
}
var _13=curam.matrix.util.allowableCharsForNumeric;
for(var i=0;i<_13.length;i++){
if(e.key!=" "&&e.key===_13[i]){
return;
}
}
dojo.stopEvent(e);
return;
}
},posNumericInputChecker:function(e){
if(!curam.matrix.util.validationChecker(e)){
return false;
}
if(typeof (e.key)!="undefined"){
if(e.key=="-"||(e.key=="."&&e.target.value.indexOf(".")!=-1)){
dojo.stopEvent(e);
return;
}
var _14=curam.matrix.util.allowableCharsForNumeric;
for(var i=0;i<_14.length;i++){
if(e.key!=" "&&e.key===_14[i]){
return;
}
}
dojo.stopEvent(e);
return;
}
},initButtonListeners:function(_15){
if(_15._btnMouseOverAdded){
return;
}
curam.util.connect(_15,"onmouseover",curam.matrix.util.buttonMouseOver);
_15._btnMouseOverAdded=true;
},buttonMouseOver:function(_16){
_16=dojo.fixEvent(_16);
var _17=_16.target;
if(!_17.id||_17.id==""){
_17=_17.parentNode;
}
dojo.addClass(_17,"mouseover");
if(!_17._btnMouseOutAdded){
curam.util.connect(_17,"onmouseout",curam.matrix.util.buttonMouseOut);
_17._btnMouseOutAdded=true;
}
},buttonMouseOut:function(_18){
_18=dojo.fixEvent(_18);
var _19=_18.target;
if(!_19.id||_19.id==""){
_19=_19.parentNode;
}
dojo.removeClass(_19,"mouseover");
},toggleHeight:function(_1a){
if(!dojo.isIE){
return;
}
var _1b=dojo.contentBox(_1a).h;
dojo.contentBox(_1a,{height:_1b+2});
dojo.contentBox(_1a,{height:_1b});
}});
return _1;
});
