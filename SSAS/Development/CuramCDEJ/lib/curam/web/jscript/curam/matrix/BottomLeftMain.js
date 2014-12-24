//>>built
define("curam/matrix/BottomLeftMain",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants,dojo/dom-geometry"],function(_1,_2,_3){
_2.provide("curam.matrix.BottomLeftMain");
_2.require("curam.matrix.Constants");
var _4=_2.require("dojo.dom-geometry");
_2.declare("curam.matrix.BottomLeftMain",null,{constructor:function(){
this.node=_2.byId("bottom-left-main");
this.questions=new curam.ListMap();
this.matrix=curam.matrix.Constants.container.matrix;
var _5=this.node.childNodes;
for(var i=0;i<_5.length;i++){
if(_5[i].nodeType==1){
this.questions.add(_5[i].id,new curam.matrix.QuestionLeft(_5[i]));
}
}
},setDimensions:function(){
this.setDefaultNumberDimensions();
this.setDefaultAnswerDimensions();
var _6=0;
for(var i=0;i<this.questions.count;i++){
_6+=this.questions.getObjectByIndex(i).setDimensions();
}
return this.setHeight(_6);
},setHeight:function(_7){
var c=curam.matrix.Constants.container;
var _8=_7+c.matrix.bottomLeft.bottomLeftFiller.height+c.matrix.topLeft.height;
this.height=(_8>c.maxMatrixHeight)?curam.matrix.Constants.container.maxMatrixHeight-c.matrix.topLeft.height-c.matrix.bottomLeft.bottomLeftFiller.height-curam.matrix.Constants.MATRIX_BORDER_SIZE:_7;
c.cssText.append(".matrix-container .bottom-left-main-eval{height:").append(this.height).append("px;}");
return this.height;
},setDefaultAnswerDimensions:function(){
if(this.defaultDimensionsSet){
return;
}
var c=curam.matrix.Constants.container;
var _9=_4.getMarginBoxSimple(c.tempDivs.ctAnsVal);
var _a=_2.contentBox(c.tempDivs.ctAnsVal);
c.fullAnswerHeight=_a.h+c.tempDivs.image.offsetHeight;
c.ansValSelectHeight=c.tempDivs.ctAnsVal.offsetHeight;
c.defaultAnsHeight=_9.h-2;
c.reducedAnswHeight=c.defaultAnsHeight-4;
c.inputBorderWidth=Math.max(_2.position(c.tempDivs.ctAnsSelect).w-_2.contentBox(c.tempDivs.ctAnsSelect).w,4);
c.ansValWidth=c.answersColWidth-c.tempDivs.image.offsetWidth-(_2.style(c.tempDivs.ctAnsVal,"paddingLeft")+_2.style(c.tempDivs.ctAnsVal,"paddingRight"))-(_2.style(c.tempDivs.ctAnsVal,"borderLeft")+_2.style(c.tempDivs.ctAnsVal,"borderRight"))-Math.ceil((_9.w-_a.w)/2);
var _b=c.ansValWidth-c.inputBorderWidth;
var _c=Math.ceil((_9.h-_a.h)/2);
var _d=(_b-c.tempDivs.numAns.offsetWidth-c.inputBorderWidth)/2;
c.ansValInputHeight=c.tempDivs.strAns.offsetHeight;
c.marginTopStringAns=((c.ansValSelectHeight-c.ansValInputHeight+_c)/2);
c.ansValTextHeight=c.tempDivs.textAns.offsetHeight;
var _e=(c.ansValSelectHeight-c.ansValTextHeight+_c)/2;
var _f="px;}.matrix-container ";
c.cssText.append(".matrix-container .ans-eval{height:").append(c.reducedAnswHeight).append(_f+".ans-eval-with-menu{height:").append(c.fullAnswerHeight-1).append(_f+".ans-val-eval{width:").append(c.ansValWidth).append(_f+".ans-str-val-eval{border-top:1px solid #F4F5F9;margin-top:").append(c.marginTopStringAns).append(_f+".ans-num-val-eval{margin-top:").append(c.marginTopStringAns).append(_f+".ans-bool-val-eval{margin-top:").append(_e-4).append(_f+".ans-str-val-eval-with-menu{margin-top:").append(c.marginTopStringAns+5).append(_f+".ans-num-val-eval-with-menu{margin-top:").append(c.marginTopStringAns+5).append(_f+".ans-bool-val-eval-with-menu{margin-top:").append(_e).append(_f+".answer-input-eval{width:").append(_b).append(_f+".numeric-input-eval{width:").append(_d).append(_f+".default-q-height-eval{height:").append(c.reducedAnswHeight).append(_f+".default-q-height-eval div.qt-text{padding-top:8.5").append(c.reducedAnswHeight).append(_f+"..default-q-height-eval .number-text{padding-top:9.5").append(c.reducedAnswHeight).append(_f+".default-q-height-boolean-eval{height:").append((c.reducedAnswHeight*2)+1).append(_f+".default-q-height-boolean-eval div.qt-text{padding-top:25").append(_f+".default-q-height-boolean-eval .number-text{padding-top:26").append("px;}");
this.defaultDimensionsSet=true;
},resyncNumbers:function(){
var _10=0;
var num;
for(var i=0;i<this.questions.count;i++){
num=this.questions.getObjectByIndex(i).number;
curam.matrix.util.initButtonListeners(num.node);
num.text.innerHTML=++_10;
}
},setDefaultNumberDimensions:function(){
curam.matrix.Constants.container.numTextHeight=curam.matrix.Constants.container.tempDivs.numHeight;
},addQuestion:function(_11){
var _12=_2.create("div",{id:"ql-"+_11[0],"class":"bottom-left-eval "+_11[0]+"-eval"});
_12.appendChild(this.createNumber(_11));
_12.appendChild(this.createQuestionText(_11));
_12.appendChild(this.createAnsGroup(_11));
var _13=new curam.matrix.QuestionLeft(_12);
this.node.appendChild(_13.node);
this.questions.add("ql-"+_11[0],_13);
return _13.setDimensions();
},getQuestion:function(id){
if(id.indexOf("ql-")<0){
id="ql-"+id;
}
return this.questions.getObjectByKey(id);
},createNumber:function(_14){
var _15=_14[1]=="boolean"?"default-q-height-boolean-eval ":"default-q-height-eval ";
var num=_2.create("div",{id:"num-"+_14[0],"class":_15+"number number-col-eval q-ct-eval-"+_14[0]});
var _16=_2.create("div",{innerHTML:"1","class":"number-text number-text-"+_14[0]+"-eval"},num);
return num;
},createQuestionText:function(_17){
var _18=_17[1]=="boolean"?"default-q-height-boolean-eval":"default-q-height-eval";
var _19=_2.create("div",{id:"ques-"+_17[0],"class":_18+" q-ct q-ct-eval-"+_17[0]+" qt-col-eval"});
var _1a=_2.create("div",{"class":"qt-text qt-text-"+_17[0]+"-eval"},_19);
var _1b=_2.create("a",{title:_17[2],innerHTML:_17[2]},_1a);
return _19;
},createAnsGroup:function(_1c){
var _1d=_2.create("div",{id:"ans-group-"+_1c[0],"class":"q-ct q-ct-eval-"+_1c[0]+" ans-col-eval"});
_1d.appendChild(this.createAnswer(_1c[0],_1c[1],1));
if(_1c[1]==curam.matrix.Constants.ANSWER_TYPE_BOOLEAN){
_1d.appendChild(this.createAnswer(_1c[0],_1c[1],2));
}
return _1d;
},createAnswer:function(qId,_1e,_1f,_20){
var _21;
var _22=_1f==1?"":"ans";
var _23="";
if(_1f==1&&curam.matrix.Constants.container.existingQuestionIds.indexOf(qId)==0){
_23="-with-menu";
}
if(_1e==curam.matrix.Constants.ANSWER_TYPE_BOOLEAN){
_21="ans-bool-val-eval"+_23;
}else{
if(_1e==curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
_21="ans-num-val-eval"+_23;
}else{
if(_1e==curam.matrix.Constants.ANSWER_TYPE_STRING){
_21="ans-str-val-eval"+_23;
}else{
_21="ans-ct-val"+_23;
}
}
}
var ans=_2.create("div",{id:"ans-"+qId+"-"+_1f,"class":_22+" ans-col-eval ans-eval"+_23+" ans-"+qId+"-eval"});
var _24=_2.create("div",{id:"ans-val-"+qId+"-"+_1f,"class":"ans-val ans-val-eval "+_21+" ans-"+qId+"-val-eval"},ans);
var _25;
var id=this.matrix.inputPrefix+"value.s.s."+qId+"."+_1f;
if(_1e==curam.matrix.Constants.ANSWER_TYPE_BOOLEAN){
var _26=_1f==1?curam.matrix.Constants.container.i18nMsgs.booleanTrue:curam.matrix.Constants.container.i18nMsgs.booleanFalse;
_24.appendChild(document.createTextNode(_26));
_25=_2.create("input",{type:"hidden",id:id,name:id,value:_26},_24);
}else{
if(_1e==curam.matrix.Constants.ANSWER_TYPE_NUMERIC){
var _27=_2.create("div",{title:curam.matrix.Constants.container.i18nMsgs.labelSpecificValue,"class":" label-specific-value"});
_27.appendChild(document.createTextNode(curam.matrix.Constants.container.i18nMsgs.labelSpecificValue+": "));
_24.appendChild(_27);
_25=curam.matrix.util.createInput("text");
_2.attr(_25,{id:id,name:id,title:curam.matrix.Constants.container.i18nMsgs.labelSpecificValue,value:"","class":"numeric-input-eval"});
_2.place(_25,_24);
}else{
if(_1e==curam.matrix.Constants.ANSWER_TYPE_STRING){
_25=curam.matrix.util.createInput("text");
_2.attr(_25,{id:id,name:id,value:"","class":"answer-input-eval"});
_2.place(_25,_24);
}else{
var _28=_25=_2.create("select",{id:id,name:id,"class":"answer-input-eval"});
if(_1e==curam.matrix.Constants.ANSWER_TYPE_CODETABLE){
if(_20!=null){
var opt;
for(var _29=0;_29<_20.length;_29++){
opt=new Option(_20[_29]["text"],_20[_29]["value"]);
try{
_28.add(opt,null);
}
catch(e){
_28.add(opt);
}
}
}
}else{
var _2a=new AJAXCall(_28).doRequest("getCodeTable",[_1e],false,true);
}
_2.place(_28,_24);
}
}
}
curam.util.connect(_25,"onfocus",function(){
curam.matrix.Constants.container.matrix.cf(arguments);
});
var _2b=_2.create("div",{"class":"image"},ans);
return ans;
}});
});
