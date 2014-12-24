//>>built
define("curam/Matrix",["curam/matrix/validation/AnswerValidator","curam/matrix/Constants","curam/matrix/validation/PriorityValidator","curam/matrix/validation/ContradictionValidator","curam/matrix/validation/OutcomeValidator","curam/matrix/TopLeft","curam/matrix/TopRight","curam/matrix/TopRightFiller","curam/matrix/BottomLeft","curam/matrix/BottomRight","curam/util","curam/matrix/util","curam/debug","curam/util/ScreenContext","curam/StringBuffer","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
var _2=dojo.declare("curam.Matrix",null,{HORIZ_VALIDATION:1,VERT_VALIDATION:2,constructor:function(_3,_4,_5){
_4.matrix=this;
curam.matrix.Constants.container=_4;
this.messages={contradiction:{singleWarningMsg:curam.matrix.Constants.container.i18nMsgs.contradictionsSingleWarningMsg,questionMsg:curam.matrix.Constants.container.i18nMsgs.contradictionsQuestionMsg,warningMsg:curam.matrix.Constants.container.i18nMsgs.contradictionsWarningMsg,errorMsg:curam.matrix.Constants.container.i18nMsgs.contradictionsErrorMsg,tooFewQuestions:curam.matrix.Constants.container.i18nMsgs.contradictionsTooFewQuestions},outcome:{warningMsg:curam.matrix.Constants.container.i18nMsgs.outcomeWarningMsg,errorMsg:curam.matrix.Constants.container.i18nMsgs.outcomeErrorMsg,copyErrorMsg:curam.matrix.Constants.container.i18nMsgs.outcomeCopyErrorMsg},emptyMatrix:curam.matrix.Constants.container.i18nMsgs.questionEmptyMatrix};
var _6=["priorityExists","scoreExists","contradictionsExist","outcomesExist","inputPrefix"];
for(var _7=0;_7<_6.length;_7++){
if(_5[_6[_7]]){
this[_6[_7]]=_5[_6[_7]];
}
}
this.form=dojo.byId(this.inputPrefix+"deletedQuestions").form;
this.answerValidator=new curam.matrix.validation.AnswerValidator(curam.matrix.Constants.container);
this.priorityValidator=new curam.matrix.validation.PriorityValidator(curam.matrix.Constants.container);
this.contradictionValidator=new curam.matrix.validation.ContradictionValidator(curam.matrix.Constants.container,this.messages.contradiction);
this.outcomeValidator=new curam.matrix.validation.OutcomeValidator(curam.matrix.Constants.container,this.messages.outcome);
this.validators=[this.answerValidator,this.priorityValidator,this.contradictionValidator,this.outcomeValidator];
var _8=this;
var _9=function(){
if(_8.refreshOutcomeValidations){
_8.refreshOutcomeValidations=false;
_8.outcomeValidator.refreshValidation();
}
};
dojo.connect(this.contradictionValidator,"onValid",_9);
this.node=_3;
this.topLeftFiller=dojo.byId("top-left-filler");
this.topLeft=new curam.matrix.TopLeft();
this.topRight=new curam.matrix.TopRight();
this.topRightFiller=new curam.matrix.TopRightFiller();
this.bottomLeft=new curam.matrix.BottomLeft(this);
this.bottomRight=new curam.matrix.BottomRight(this);
var _8=this;
this._refocusListener=function(e){
if(_8.isValidationActive()){
_8.refocusValidatingInput();
}
dojo.stopEvent(e);
};
curam.util.connect(this.node,"key",function(e){
var _a=curam.matrix.util.keys;
if((e.keyCode==curam.matrix.util.keys.KEY_LEFT_ARROW||e.keyCode==curam.matrix.util.keys.KEY_RIGHT_ARROW)&&e.target.tagName!="INPUT"){
_8._refocusListener(e);
}
});
this._initForm();
this.sov=this.setOutcomeValue;
this.scv=this.setContradictionValue;
this.cf=curam.matrix.util.checkFocus;
},setDimensionLimits:function(){
var c=curam.matrix.Constants.container;
var _b=dojo.style(c.validation.node,"borderTop")+dojo.style(c.validation.node,"borderBottom");
var _c=dojo.query("> span:first-child",c.buttons.node)[0];
var _d=dojo.style(_c,"borderTop")+dojo.style(_c,"borderBottom");
c.maxMatrixHeight=c.maxHeight-(_b+Math.min(20,_d));
c.maxTopRightWidth=c.maxWidth-c.leftMatrixWidth-c.matrix.topRightFiller.widthIncBorder;
},setDimensions:function(){
this.setHeight();
this.setWidth();
},setWidth:function(){
this.width=curam.matrix.Constants.container.leftMatrixWidth+this.topRight.width+this.topRightFiller.widthIncBorder;
curam.matrix.Constants.container.cssText.append(".matrix-container .matrix-eval{width:").append(this.width).append("px;}");
},setHeight:function(){
this.height=this.topLeft.height+this.bottomLeft.heightIncBorder;
curam.matrix.Constants.container.cssText.append(".matrix-container .matrix-eval{height:").append(this.height).append("px;}");
},scrollSync:function(){
var _e=this.topRight.node;
var _f=this.bottomRight.node;
var _10=this.bottomLeft.bottomLeftMain.node;
this.addScrollSynchronization(_f,_e,_10);
},refreshScrollSync:function(){
if(this._syncScroll){
this._syncScroll();
}
},addScrollSynchronization:function(_11,_12,_13){
this.removeScrollSynchronization(_12);
this.removeScrollSynchronization(_13);
this._syncScroll=this.getOnScrollFunction(_12,_13,_11);
this._reverseVertSyncScroll=this.getOnScrollFunction(null,_11,_13);
this._syncScroll();
curam.util.connect(_13,"onscroll",this._reverseVertSyncScroll);
curam.util.connect(_11,"onscroll",this._syncScroll);
},removeScrollSynchronization:function(_14){
if(_14._syncTo!=null){
_14.onscroll=null;
}
_14._syncScroll=null;
},getOnScrollFunction:function(_15,_16,_17){
var _18=this;
if(_16&&_15){
return function(e){
_18.checkRedraw(_17.scrollTop);
_15.scrollLeft=_17.scrollLeft;
_16.scrollTop=_17.scrollTop;
};
}else{
return function(e){
_18.checkRedraw(_17.scrollTop);
_16.scrollTop=_17.scrollTop;
};
}
},_initForm:function(){
var _19=this;
curam.util.connect(this.form,"onsubmit",function(e){
try{
_19.contradictionValidator.inSave=true;
if(_19.isValidationActive()||!_19.answerValidator.refreshValidation()||(_19.refreshCombinationValidators(true)||_19.isValidationActive())){
dojo.stopEvent(e);
_19.contradictionValidator.inSave=false;
return false;
}
_19.updateQuestionOrder();
_19.updateOutcomeOrder();
_19.deleteSyncToken();
_19._setFormNames();
}
catch(ex){
curam.debug.log(_1.getProperty("curam.matrix.msg"),ex);
dojo.stopEvent(e);
return false;
}
e.target.submit();
return false;
});
},_setFormNames:function(){
var _1a=curam.matrix.Constants.container.node.parentNode.getElementsByTagName("input");
if(!_1a||_1a.length==0){
return;
}
for(var _1b=0;_1b<_1a.length;_1b++){
_1a[_1b].setAttribute("name",_1a[_1b].getAttribute("id"));
}
},deleteSyncToken:function(){
var _1c=dojo.byId("__o3synch");
if(_1c){
_1c.parentNode.removeChild(_1c);
}
},addLazyWidget:function(_1d,_1e){
if(!_1e){
_1e="default";
}
if(!this.lazyWidgets){
this.lazyWidgets={};
}
if(!this.lazyWidgets[_1e]){
this.lazyWidgets[_1e]=[];
}
var arr=this.lazyWidgets[_1e];
arr[arr.length]=_1d;
},createLazyWidgets:function(_1f){
if(!_1f){
_1f="default";
}
if(!this.lazyWidgets[_1f]||this.lazyWidgets[_1f].length<1){
return false;
}
var arr=this.lazyWidgets[_1f];
for(var _20=0;_20<arr.length;_20++){
arr[_20].createWidget();
}
this.lazyWidgets[_1f]=[];
this.initHighlighters();
return true;
},initHighlighters:function(_21,_22){
var _23=this;
var _24=dijit.byId("CombinationOptions");
var _25=dijit.byId("OutcomeOptions");
var chk=function(_26){
return function(e){
if(_23.isValidationActive()){
return;
}
setTimeout(_26,50);
};
};
var _27={combOpen:chk(function(){
_23.highlightCombination(_24.combinationId,true);
}),combClose:function(){
_23.highlightCombination(_24.combinationId,false);
},outOpen:chk(function(){
_23.highlightOutcome(activeMenuID,true);
}),outClose:function(){
_23.highlightOutcome(activeMenuID,false);
},quesOpen:chk(function(){
_23.highlightQuestion(activeMenuID,true);
}),quesClose:function(){
_23.highlightQuestion(activeMenuID,false);
},ansOpen:chk(function(){
_23.highlightAnswer(activeMenuID,true);
}),ansClose:function(){
_23.highlightAnswer(activeMenuID,false);
},priOpen:chk(function(){
_23.highlightPriority(true);
}),priClose:function(){
_23.highlightPriority(false);
},scrOpen:chk(function(){
_23.highlightScore(true);
}),scrClose:function(){
_23.highlightScore(false);
}};
var _28="onOpen";
var _29="onClose";
if(!this._highlightersCreated){
dojo.connect(_24,_28,_27,"combOpen");
dojo.connect(_24,_29,_27,"combClose");
dojo.connect(_25,_28,_27,"outOpen");
dojo.connect(_25,_29,_27,"outClose");
var _2a=dijit.byId("QuestionOptions");
dojo.connect(_2a,_28,_27,"quesOpen");
dojo.connect(_2a,_29,_27,"quesClose");
var _2b=dijit.byId("AnswerOptions");
dojo.connect(_2b,_28,_27,"ansOpen");
dojo.connect(_2b,_29,_27,"ansClose");
this._highlightersCreated=true;
}
if(!this._highlighterScoreCreated&&_22){
var _2c=dijit.byId("ScoreOptions");
dojo.connect(_2c,_28,_27,"scrOpen");
dojo.connect(_2c,_29,_27,"scrClose");
this._highlighterScoreCreated=true;
}
if(!this._highlighterPriCreated&&_21){
var _2d=dijit.byId("PriorityOptions");
dojo.connect(_2d,_28,_27,"priOpen");
dojo.connect(_2d,_29,_27,"priClose");
this._highlighterPriCreated=true;
}
},highlightPriority:function(_2e){
this.highlightSingleColumn(_2e,"priorityGroup");
},highlightScore:function(_2f){
this.highlightSingleColumn(_2f,"scoreGroup");
},highlightCombination:function(_30,_31){
var _32;
if(_30=="column-id-contr"||_30.indexOf("contr-cell")==0){
_32=this._highlightedComb&&!_31?this._highlightedComb:this.getContradictionColInputs(_30);
}else{
var _33=curam.matrix.util.safeSplit(_30,"-");
var _34=_33[1],_35=_33[5];
_32=this._highlightedComb&&!_31?this._highlightedComb:this.getOutcomeColInputs(_34,_35);
}
this.highlightNodes(_32,_31,function(_36){
return _36.parentNode;
});
this._highlightedComb=_31?_32:null;
},highlightSingleColumn:function(_37,_38){
var qs=this.bottomRight.questions;
var _39=[];
for(var _3a=0;_3a<qs.count;_3a++){
if(qs.getObjectByIndex(_3a)[_38]){
_39.push(qs.getObjectByIndex(_3a)[_38].node);
}
}
this.highlightNodes(_39,_37);
},highlightOutcome:function(_3b,_3c){
var qs=this.bottomRight.questions;
var _3d=_3b.replace("column-id-",""),qId;
var _3e=[];
if(_3b=="column-id-contr"||_3b.indexOf("contr-cell")==0){
this.highlightSingleColumn(_3c,"contradiction");
return;
}
var _3f=function(qId,_40){
return "out-"+_40+"-"+qId;
};
for(var _41=0;_41<qs.count;_41++){
qId=qs.getObjectByIndex(_41).qId;
_3e.push(_3f(qId,_3d));
}
this.highlightNodes(_3e,_3c);
},highlightQuestion:function(_42,_43){
var fn=_43?"addClass":"removeClass";
var qId=_42.replace("ql-","");
var _44=[dojo.byId("qr-"+qId),dojo.byId("ques-"+qId),dojo.byId("ans-group-"+qId)];
this.highlightNodes(_44,_43);
},highlightAnswer:function(_45,_46){
var _47;
if(!_46&&this._highlightedAnswer){
_47=this._highlightedAnswer;
this._highlightedAnswer=null;
}else{
var _48=curam.matrix.util.safeSplit(_45,"-");
var qId=_48[1];
var aId=_48[2];
this._highlightedAnswer=_47=[dojo.byId(_45),dojo.byId("pri-"+qId+"-"+aId),dojo.byId("scr-"+qId+"-"+aId)];
var _49=this.bottomRight.questions.getObjectByKey("qr-"+qId);
var _4a=_49.contradiction;
if(_4a){
var _4b=_4a.rows.getObjectByKey("contr-row-"+qId+"-"+aId).node.childNodes;
for(var _4c=0;_4c<_4b.length;_4c++){
_47.push(_4b.item(_4c));
}
}
var _4d=_49.outcomeGroup;
var _4e=cm.endsWith;
var _4f=curam.matrix.util.safeSplit;
if(_4d){
var _50,key,_51,_52,_53;
for(var _54=0;_54<_4d.count;_54++){
_51=_4d.getKeyByIndex(_54);
_52=_4f(_51,"-")[1];
_53=_4d.getObjectByKey(_51).rows.getObjectByKey("out-"+_52+"-row-"+qId+"-"+aId);
_47.push(_53.node);
}
}
}
this.highlightNodes(_47,_46);
},highlightNodes:function(_55,_56,_57){
var fn=_56?"addClass":"removeClass";
if(!_57){
_57=function(_58){
return _58;
};
}
for(var _59=0;_59<_55.length;_59++){
if(!_55[_59]){
continue;
}
dojo[fn](_57(_55[_59]),"highlighted");
}
if(!_56){
var _5a=this;
setTimeout(function(){
_5a.refreshScrollSync();
},10);
}
},disableInputs:function(_5b,_5c,_5d){
var ac=dojo.addClass;
ac(curam.matrix.Constants.container.node,"matrix-container-validating");
if(!_5d){
_5d="string";
}
var _5e;
switch(_5d){
case "string":
case "numeric":
case "codetable":
_5e=[dojo.byId(_5b).parentNode];
if(_5c){
_5e[1]=dojo.byId(_5c).parentNode;
}
break;
case "combination":
var val=this.getActiveValidator();
if(!val){
break;
}
_5e=[];
for(var _5f=0;_5f<val.state.allowableFields.length;_5f++){
_5e.push(val.state.allowableFields[_5f]);
}
break;
}
if(_5e){
for(var _5f=0;_5f<_5e.length;_5f++){
ac(_5e[_5f],"inputValidating");
}
this.validatingNodes=_5e;
}
dojo.publish("/disableMenuItems");
},enableInputs:function(){
dojo.removeClass(curam.matrix.Constants.container.node,"matrix-container-validating");
if(this.validatingNodes){
for(var _60=0;_60<this.validatingNodes.length;_60++){
dojo.removeClass(this.validatingNodes[_60],"inputValidating");
}
}
dojo.publish("/enableInput");
dojo.publish("/enableMenuItems");
},trunc:function(_61,_62,num){
return Math.min(_62,Math.max(_61,num));
},trapMatrixFocus:function(){
var _63=this.bottomLeft.bottomLeftMain.questions;
var _64=_63.getObjectByIndex(0);
var _65;
var _66=1;
while(_64&&!_65){
for(var _67=1;!_65&&_67<=_64.ansGroup.answers.count;_67++){
var _68=_64.getAnswer(_67);
if(_68.input&&_68.input.getAttribute("type")!="hidden"){
_65=_68.input;
}
}
_64=this.bottomLeft.bottomLeftMain.questions.getObjectByIndex(_66++);
}
if(!_65){
_64=curam.matrix.Constants.container.matrix.bottomRight.questions.getObjectByIndex(0);
_65=_64.node.firstChild.getElementsByTagName("input")[0];
}
if(_65&&!_65["focusListenerAdded"]){
curam.util.connect(_65,"onfocus",this._refocusListener);
_65["focusListenerAdded"]=true;
}
},isValidationActive:function(){
if(this.answerValidator.isWarningActive()||this.answerValidator.isErrorActive()||this.priorityValidator.isWarningActive()||this.priorityValidator.isErrorActive()){
return this.HORIZ_VALIDATION;
}else{
if(this.contradictionValidator.isWarningActive()||this.contradictionValidator.isErrorActive()||this.outcomeValidator.isWarningActive()||this.outcomeValidator.isErrorActive()){
return this.VERT_VALIDATION;
}
}
return false;
},setValidationActive:function(){
dojo.publish("/disableMenuItems");
},setValidationInactive:function(){
dojo.publish("/enableMenuItems");
this.enableInputs();
},isInputPartOfValidation:function(_69){
for(var _6a=0;_6a<this.validators.length;_6a++){
if(this.validators[_6a].isInputPartOfValidation(_69)){
return true;
}
}
return false;
},refocusValidatingInput:function(){
var val=this.getActiveValidator();
if(val){
val.refocus();
}
},getActiveValidator:function(){
for(var _6b=0;_6b<this.validators.length;_6b++){
if(this.validators[_6b].isErrorActive()){
return this.validators[_6b];
}
}
return null;
},checkFocus:function(_6c){
var e=dojo.fixEvent(_6c.length>0?_6c[0]:null);
if(this.isValidationActive()&&!this.isInputPartOfValidation(e.target)){
dojo.stopEvent(e);
this.refocusValidatingInput();
}
},openAddQuestionsPopupWindow:function(_6d,id,_6e,_6f){
if(!this.emptyWarningActive&&this.isValidationActive()){
return;
}
var sc=new curam.util.ScreenContext("MODAL");
var url=_6d+"Page.do?matrixID="+id+"&existingQuestionIds="+curam.matrix.Constants.container.existingQuestionIds+"&"+sc.toRequestString();
curam.util.openModalDialog({href:url},"width="+_6e+",height="+_6f);
},openAddOutomesPopupWindow:function(_70,id,_71,_72){
if(this.isValidationActive()){
return;
}
var sc=new curam.util.ScreenContext("MODAL");
var url=_70+"Page.do?matrixID="+id+"&existingOutcomeIds="+curam.matrix.Constants.container.existingOutcomeIds+"&"+sc.toRequestString();
curam.util.openModalDialog({href:url},"width="+_71+",height="+_72);
},addQuestionsFromPopup:function(){
if(this.isValidationActive()){
return;
}
window.setTimeout("curam.matrix.Constants.container.matrix.addNewQuestions()",0);
},addNewQuestions:function(){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
var _73=0;
var _74=dojo.fromJson(newQuestions);
for(var i=0;i<_74.length;i++){
_73+=c.matrix.addQuestion(_74[i]);
}
var _75=this.bottomLeft.bottomLeftMain.setDimensions();
this.bottomLeft.setHeight(_75);
c.matrix.setHeight();
c.setHeight();
this.bottomLeft.bottomLeftMain.resyncNumbers();
this.outcomeValidator.requiresRefresh=true;
this.contradictionValidator.requiresRefresh=true;
c.addCSS();
this.clearCopiedColumn();
this.checkEmpty();
this.setRequiresRedraw();
},setRequiresRedraw:function(){
if(!dojo.isIE){
return;
}
this._minScroll=this._maxScroll=this.bottomLeft.bottomLeftMain.node.scrollTop;
},checkRedraw:function(pos){
if(this._minScroll==null||typeof (this._minScroll)=="undefined"){
return;
}
if(pos>=this._minScroll&&pos<=this._maxScroll){
return;
}
this._minScroll=Math.min(this._minScroll,pos);
this._maxScroll=Math.max(this._maxScroll,pos);
if(this.redrawTimeout){
clearTimeout(this.redrawTimeout);
}
var _76=this;
this.redrawTimeout=setTimeout(function(){
_76.redrawTimeout=null;
curam.util.insertCssText(" ","_container_stylesheet_");
},200);
},addQuestion:function(_77){
var _78=_77.split("|",[3]);
if(curam.matrix.Constants.container.existingQuestionIdsMap[_78[0]]){
return;
}
var _79=this.bottomLeft.bottomLeftMain.addQuestion(_78);
this.bottomRight.addQuestion(_78);
this.updateQuestionOrder();
var _7a=this.bottomLeft.bottomLeftMain.questions.count;
if(_7a==1){
this.bottomRight.addButtonClassToFirstRow();
}else{
this.fixIEBorder();
}
return _79;
},addAnswer:function(id){
curam.matrix.Constants.container.cssText=new curam.StringBuffer();
var _7b=this.bottomLeft.bottomLeftMain.questions.getObjectByKey(id).addAnswer();
this.bottomRight.questions.getObjectByKey(id.replace("ql-","qr-")).addAnswer();
this.bottomLeft.bottomLeftMain.setHeight(this.bottomLeft.bottomLeftMain.height+_7b);
this.bottomLeft.setHeight(this.bottomLeft.bottomLeftMain.height+_7b);
this.setHeight();
this.outcomeValidator.requiresRefresh=true;
this.contradictionValidator.requiresRefresh=true;
curam.matrix.Constants.container.setHeight();
this.clearCopiedColumn();
curam.matrix.Constants.container.addCSS();
},getCellIndexFromContradictionCellId:function(id){
return Number(curam.matrix.util.safeSplit(id,"-")[4]);
},getQuestionIdFromAnswerId:function(_7c){
var qId=curam.matrix.util.safeSplit(_7c,"-")[1];
return qId;
},getQuestionIdFromAnswerInputId:function(id){
var ids=id.split(".");
return ids[ids.length-2];
},getAnswerIdFromAnswerInputId:function(id){
var ids=id.split(".");
return ids[ids.length-1];
},getQuestionFromAnswerId:function(_7d){
return this.getQuestion(this.getQuestionIdFromAnswerId(_7d));
},getQuestion:function(id){
if(!this.bottomLeft){
return null;
}
return this.bottomLeft.bottomLeftMain.getQuestion(id);
},changeNumericAnswer:function(id,_7e){
var _7f=this.getQuestionFromAnswerId(id).getAnswerById(id);
if(_7e=="minmax"){
_7f.createMinMax();
}else{
_7f.createSpecificValue();
}
},addPriorityColumn:function(){
if(this.isValidationActive()){
return;
}
if(!this.priorityExists){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
this.topRight.addPriorityColumn();
this.bottomRight.addPriorityColumn();
this.priorityExists=true;
c.matrix.setWidth();
c.setWidth();
c.addCSS();
}
},addScoreColumn:function(){
if(this.isValidationActive()){
return;
}
if(!this.scoreExists){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
this.topRight.addScoreColumn();
this.bottomRight.addScoreColumn();
this.scoreExists=true;
c.matrix.setWidth();
c.setWidth();
c.addCSS();
}
},addContradictionColumn:function(){
if(!this.contradictionsExist){
var c=curam.matrix.Constants.container;
if(this.bottomLeft.bottomLeftMain.questions.count<2){
alert(this.messages.contradiction.tooFewQuestions);
return;
}
c.cssText=new curam.StringBuffer();
this.topRight.addContradictionColumn();
this.bottomRight.addContradictionColumn();
this.contradictionsExist=true;
this.topRight.topRightTop.contradictionCol.setWidth(curam.matrix.Constants.COMBINATION_CELL_WIDTH);
this.topRight.setWidths(curam.matrix.Constants.container.matrix.topRight.topRightTop.contradictionCol.widthWithBorder);
this.bottomRight.setWidth();
c.matrix.setWidth();
c.setWidth();
c.addCSS();
this.validators[2]=this.contradictionValidator=new curam.matrix.validation.ContradictionValidator(curam.matrix.Constants.container,this.messages.contradiction);
this.refreshContradictionValidator(false,1);
this.setRequiresRedraw();
}
},refreshContradictionValidator:function(_80,_81){
if(arguments.length<2){
_81=this.contradictionValidator.bitsets.length;
}
if(_80){
this.contradictionValidator.requiresRefresh=true;
}
this.contradictionValidator.refreshValidation();
},getOutcome:function(id){
var ids=curam.matrix.util.safeSplit(id,"-");
var _82="out-"+ids[1]+"-"+ids[3];
var _83=this.bottomRight.questions.getObjectByIndex(0).outcomeGroup;
var _84=_83.getObjectByKey(_82);
return _84;
},addOutcomesFromPopup:function(_85){
if(!_85||_85.length<1){
return;
}
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
var _86=0;
for(var i=0;i<_85.length;i++){
_86+=this.addOutcomeColumn(_85[i]);
}
this.topRight.setWidths(_86);
this.bottomRight.setWidth();
this.setWidth();
c.setWidth();
c.addCSS();
this.setRequiresRedraw();
},addOutcomeColumn:function(_87){
var _87=_87.split("|",[2]);
var _88=curam.matrix.Constants.container.existingOutcomeIds.split("|");
for(var i=0;i<_88.length;i++){
if(_88[i]==_87[0]){
return;
}
}
var _89=this.topRight.addOutcomeColumn(_87);
this.bottomRight.addOutcomeColumn(_87);
this.outcomesExist=true;
this.setRequiresRedraw();
return _89;
},addCombination:function(id,_8a){
if(id=="column-id-contr"||id.indexOf("contr-cell")==0){
this.addContradictionCombination(_8a);
}else{
if(id.indexOf("column-id-")<0){
var _8b=curam.matrix.util.safeSplit(id,"-");
id="column-id-"+_8b[1];
}
this.addOutcomeCombination(id,_8a);
}
var _8c=this;
setTimeout(function(){
_8c.refreshScrollSync();
_8c.setRequiresRedraw();
},10);
},setContradictionValue:function(_8d,_8e,_8f,qId){
this.contradictionValidator.setContradictionValue(_8d-1,_8e,_8f,qId);
},setOutcomeValue:function(_90,_91,_92,_93){
this.outcomeValidator.setOutcomeValue(_90,_91-1,_92,_93);
},getContradictionColInputs:function(_94,_95){
var _96=[];
var _97=this.bottomRight.questions;
var _98=_95?_95:Number(curam.matrix.util.safeSplit(_94,"-")[4]);
var _99,_9a,_9b,_9c;
for(var _9d=0;_9d<_97.count;_9d++){
_9b=_97.getObjectByIndex(_9d);
for(var _9e=0;_9e<_9b.contradiction.rows.count;_9e++){
_9a=_9b.contradiction.rows.getObjectByIndex(_9e);
_9c=_9a.node.id.replace("-row-","-cell-")+"-"+_98;
_96.push(_9a.cells.getObjectByKey(_9c).input);
}
}
return _96;
},getOutcomeColInputs:function(_9f,_a0){
var _a1=this.bottomRight.questions;
var _a2,_a3,_a4;
var _a5=[];
var _a3,_a6,_a7;
for(var _a8=0;_a8<_a1.count;_a8++){
_a3=_a1.getObjectByIndex(_a8);
_a6="out-"+_9f+"-"+_a3.qId;
_a7=_a3.outcomeGroup.getObjectByKey(_a6);
for(var _a9=0;_a9<_a7.rows.count;_a9++){
_a2=_a7.rows.getObjectByIndex(_a9);
_a4=_a2.node.id.replace("-row-","-cell-")+"-"+_a0;
_a5.push(_a2.cells.getObjectByKey(_a4).input);
}
}
return _a5;
},copyCombination:function(id){
if(id=="column-id-contr"||id.indexOf("contr-cell")==0){
this.copyContradictionColumn();
this._copySrc="contradiction";
}else{
this.copyOutcomeColumn();
}
},copyContradictionColumn:function(){
this.clearCopiedColumn();
var _aa=dijit.byId("CombinationOptions").explodeSrc.parentNode.id;
var _ab=this.getContradictionColInputs(_aa);
if(!_ab||_ab.length<1){
return;
}
this.copyFromInputs(_ab);
},copyOutcomeColumn:function(){
this.clearCopiedColumn();
var _ac=dijit.byId("CombinationOptions").explodeSrc.parentNode.id;
var _ad=curam.matrix.util.safeSplit(_ac,"-");
var _ae=_ad[1];
var _af=_ad[5];
this._copySrc=_ae;
this.copyFromInputs(this.getOutcomeColInputs(_ad[1],_ad[5]));
},clearCopiedColumn:function(){
this._outcomeCopy=null;
},hasCopiedCombination:function(){
return (this._outcomeCopy!=null&&this._outcomeCopy.length>0);
},copyFromInputs:function(_b0){
var arr=this._outcomeCopy=[];
for(var _b1=0;_b1<_b0.length;_b1++){
arr.push(_b0[_b1].checked);
}
},copyToInputs:function(_b2){
if(!_b2||(_b2.length!=this._outcomeCopy.length)){
alert(this.messages.outcome.copyErrorMsg);
return;
}
for(var _b3=0;_b3<_b2.length;_b3++){
_b2[_b3].checked=this._outcomeCopy[_b3];
}
},addContradictionCombination:function(_b4){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
var msg,_b5;
_b5=this.bottomRight.addContradictionCombination(_b4);
var _b6=this.topRight.topRightTop;
var _b7=_b6.contradictionCol;
var _b8=_b6.addContrCombIdInput(_b7.combinationCount);
_b7.columns.add(_b8.id,_b8);
_b7.node.appendChild(_b8);
for(var i=0;i<c.locales.length;i++){
if(c.locales[i]==""){
continue;
}
msg=_b6.addContrCombMessageInput(_b7.combinationCount,c.locales[i],"");
_b7.node.appendChild(msg);
}
_b7.setWidth(_b7.widthWithoutBorder+curam.matrix.Constants.COMBINATION_CELL_WIDTH+curam.matrix.Constants.MATRIX_BORDER_SIZE);
this.topRight.setWidths(curam.matrix.Constants.COMBINATION_CELL_WIDTH+curam.matrix.Constants.MATRIX_BORDER_SIZE);
this.bottomRight.setWidth();
this.setWidth();
c.setWidth();
c.addCSS();
if(_b4&&this._outcomeCopy){
this.copyToInputs(this.getContradictionColInputs(null,_b5));
}
if(this._copySrc!="contradiction"){
this.outcomeValidator.refreshOutcome(this._copySrc);
}
this.refreshContradictionValidator(true,1);
},addOutcomeCombination:function(id,_b9){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
var _ba=id.replace("column-id-","");
var _bb=c.matrix.topRight.topRightTop.outcomeCols.getObjectByKey(id);
var _bc=this.bottomRight.addOutcomeCombination(_bb,id);
var _bd=this.topRight.topRightTop.addOutCombIdInput(_ba,_bb.combinationCount);
_bb.columns.add(_bd.id,_bd);
_bb.node.appendChild(_bd);
_bb.setWidth(_ba,_bb.widthWithoutBorder+curam.matrix.Constants.COMBINATION_CELL_WIDTH+curam.matrix.Constants.MATRIX_BORDER_SIZE);
this.topRight.setWidths(curam.matrix.Constants.COMBINATION_CELL_WIDTH+curam.matrix.Constants.MATRIX_BORDER_SIZE);
this.bottomRight.setWidth();
this.setWidth();
c.setWidth();
c.addCSS();
if(_b9){
this.copyToInputs(this.getOutcomeColInputs(_ba,_bc));
}
if(this._copySrc=="contradiction"){
this.refreshContradictionValidator(true,1);
}
this.outcomeValidator.refreshOutcome(_ba);
},updateQuestionOrder:function(){
var _be=dojo.byId(this.inputPrefix+"questionOrder");
_be.value=curam.matrix.Constants.container.existingQuestionIds;
},updateOutcomeOrder:function(){
var _bf=dojo.byId(this.inputPrefix+"outcomeOrder");
_bf.value=curam.matrix.Constants.container.existingOutcomeIds;
},deleteQuestion:function(id){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
var _c0=false;
var _c1=id.replace("ql-","qr-");
var _c2=this.bottomLeft.bottomLeftMain.questions.getObjectByKey(id);
if(!_c2){
return false;
}
var _c3=_c2.height;
var qId=_c2.qId;
var _c4=dojo.byId(this.inputPrefix+"deletedQuestions");
_c4.value=_c4.value+(_c4.value.length>0?"|":"")+qId;
if(this.bottomRight.questions.getIndexByKey(_c1)==0){
_c0=true;
}
dojo.destroy(id);
dojo.destroy(_c1);
this.bottomLeft.bottomLeftMain.questions.removeByKey(id);
this.bottomRight.questions.removeByKey(_c1);
if(_c0){
this.bottomRight.addButtonClassToFirstRow();
}
c.removeQuestionId(qId);
this.bottomLeft.bottomLeftMain.resyncNumbers();
this.fixIEBorder();
var _c5=this.bottomLeft.bottomLeftMain.setDimensions();
this.bottomLeft.setHeight(_c5);
this.bottomLeft.setHeight(this.bottomLeft.bottomLeftMain.height-_c3);
c.matrix.setHeight();
c.setHeight();
this.clearCopiedColumn();
c.addCSS();
this.updateQuestionOrder();
if(this.bottomLeft.bottomLeftMain.questions.count<2){
this.deleteContradictionColumn();
}
this.refreshCombinationValidators(true);
this.checkEmpty();
},checkEmpty:function(){
if(this.bottomLeft.bottomLeftMain.questions.count>0){
if(this.emptyWarningActive){
this.emptyWarningActive=false;
curam.matrix.Constants.container.deactivateValidation();
}else{
if(!this.isValidationActive()){
curam.matrix.Constants.container.hideValidation();
}
}
return;
}
var id="newQs_btn_"+(new Date()).getTime();
var _c6=this.messages.emptyMatrix+"<a href=\"#\" id=\""+id+"\">"+curam.matrix.Constants.container.i18nMsgs.addQuestions+"</a>";
curam.matrix.Constants.container.activateWarning(_c6);
curam.util.connect(dojo.byId(id),"onclick",function(e){
var _c7=dojo.byId("addQuestions").getAttribute("onclick");
if(dojo.isString(_c7)){
dojo.eval(_c7);
}else{
_c7();
}
});
this.emptyWarningActive=true;
},refreshCombinationValidators:function(_c8){
if(this.contradictionsExist){
this.refreshContradictionValidator(_c8,0);
}
if(_c8){
this.outcomeValidator.requiresRefresh=true;
}
if(!this.contradictionsExist||(!this.contradictionValidator.isWarningActive()&&!this.contradictionValidator.isErrorActive())){
this.outcomeValidator.refreshValidation();
this.refreshOutcomeValidations=false;
}else{
this.refreshOutcomeValidations=true;
}
},deleteAnswer:function(id){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
var _c9=false;
var _ca=false;
var _cb=/-.*/;
var _cc=curam.matrix.util.safeSplit(id,"-");
var qId=_cc[1];
var _cd=_cc[2];
var _ce=this.bottomLeft.bottomLeftMain.questions.getObjectByKey("ql-"+qId);
var _cf=this.bottomRight.questions.getObjectByKey("qr-"+qId);
if(this.bottomRight.questions.getIndexByKey("qr-"+qId)==0){
_c9=true;
}
if(_ce.ansGroup.answers.getIndexByKey(id)==0){
_ca=true;
}
_ce.deleteAnswer(_ca,id);
_cf.deleteAnswer(_ca,_cd);
if(_c9&&_ca){
this.bottomRight.addButtonClassToFirstRow();
}
this.bottomLeft.bottomLeftMain.resyncNumbers();
var _d0=this.bottomLeft.bottomLeftMain.setDimensions();
this.bottomLeft.setHeight(_d0);
c.matrix.setHeight();
c.setHeight();
this.clearCopiedColumn();
c.addCSS();
this.refreshCombinationValidators(true);
},deletePriorityColumn:function(){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
this.bottomRight.deletePriorityColumn();
this.topRight.deletePriorityColumn();
this.priorityExists=false;
this.topRight.topRightTop.priorityWidgetCreated=false;
this.topRight.setWidths(-c.priorityWidth);
this.bottomRight.setWidth();
c.matrix.setWidth();
c.setWidth();
c.addCSS();
},deleteScoreColumn:function(){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
this.bottomRight.deleteScoreColumn();
this.topRight.deleteScoreColumn();
this.scoreExists=false;
this.topRight.topRightTop.scoreWidgetCreated=false;
this.topRight.setWidths(-c.priorityWidth);
this.bottomRight.setWidth();
c.matrix.setWidth();
c.setWidth();
c.addCSS();
},deleteOutcome:function(id){
if(id=="column-id-contr"){
this.deleteContradictionColumn();
}else{
this.deleteOutcomeColumn(id);
}
this.setRequiresRedraw();
},deleteContradictionColumn:function(){
if(!this.topRight.topRightTop.contradictionCol){
return;
}
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
var _d1=this.topRight.topRightTop.contradictionCol.widthWithBorder;
this.bottomRight.deleteContradictionColumn();
this.topRight.deleteContradictionColumn();
this.contradictionsExist=false;
this.topRight.setWidths(-_d1);
this.bottomRight.setWidth();
c.matrix.setWidth();
c.setWidth();
c.addCSS();
this.contradictionValidator.deleteContradiction();
},deleteOutcomeColumn:function(id){
var _d2=id.replace("column-id-","");
var col=this.topRight.topRightTop.outcomeCols.getObjectByKey(id);
if(!col){
return;
}
var c=curam.matrix.Constants.container;
var _d3=col.widthWithBorder;
var _d4=dojo.byId(this.inputPrefix+"deletedOutcomes");
_d4.value=_d4.value+(_d4.value.length>0?"|":"")+_d2;
var _d5=dojo.byId(this.inputPrefix+"deletedOutcomes");
if(_d5.value.indexOf(_d2)>-1){
var arr=_d5.value.split("|");
for(var _d6=0;_d6<arr.length;_d6++){
if(arr[_d6]==_d2){
arr.splice(_d6,1);
_d5.value=arr.join("|");
break;
}
}
}
c.cssText=new curam.StringBuffer();
this.bottomRight.deleteOutcomeColumn(_d2);
this.topRight.deleteOutcomeColumn(id);
if(this.topRight.topRightTop.outcomeCols.count==0){
this.outcomesExist=false;
}
c.existingOutcomeIds=c.existingOutcomeIds.replace(_d2+"|","");
this.topRight.setWidths(-_d3);
this.bottomRight.setWidth();
c.matrix.setWidth();
c.setWidth();
c.addCSS();
this.outcomeValidator.deleteOutcome(_d2);
var _d7=this.bottomRight.questions;
if(_d7.count!=0){
if(_d7.getObjectByIndex(0).outcomeGroup.count<1){
this.outcomesExist=false;
}else{
this.outcomesExist=true;
}
}
},deleteCombination:function(id){
if(id.indexOf("contr-cell-")!=-1){
this.deleteContradictionCombination(id);
}else{
this.deleteOutcomeCombination(id);
}
var _d8=this;
setTimeout(function(){
_d8.refreshScrollSync();
},10);
},deleteContradictionCombination:function(id){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
var _d9=this.topRight.topRightTop.contradictionCol;
var _da=/contr-cell-.*-.*-/;
var _db=id.replace(_da,"");
var _dc=this.bottomRight.checkIfLastContrCombColumn(id);
this.bottomRight.deleteContradictionCombination(_db,_dc);
_d9.deleteCombIdAndMsgInputFields(_db);
_d9.setWidth(_d9.widthWithoutBorder-(curam.matrix.Constants.COMBINATION_CELL_WIDTH+curam.matrix.Constants.MATRIX_BORDER_SIZE));
this.topRight.setWidths(-(curam.matrix.Constants.COMBINATION_CELL_WIDTH+curam.matrix.Constants.MATRIX_BORDER_SIZE));
this.bottomRight.setWidth();
c.matrix.setWidth();
c.setWidth();
c.addCSS();
this.refreshContradictionValidator(true,-1);
},deleteOutcomeCombination:function(id){
var c=curam.matrix.Constants.container;
c.cssText=new curam.StringBuffer();
var _dd=/-cell-.*-.*-.*/;
var _de=id.replace("out-","").replace(_dd,"");
_dd=/out-.*-cell-.*-.*-/;
var _df=id.replace(_dd,"");
var _e0=this.topRight.topRightTop.outcomeCols.getObjectByKey("column-id-"+_de);
var _e1=this.bottomRight.checkIfLastOutCombColumn(_de,id);
this.bottomRight.deleteOutcomeCombination(_de,_df,_e1);
_e0.deleteCombIdInputFields(_df);
_e0.setWidth(_de,_e0.widthWithoutBorder-(curam.matrix.Constants.COMBINATION_CELL_WIDTH+curam.matrix.Constants.MATRIX_BORDER_SIZE));
this.topRight.setWidths(-(curam.matrix.Constants.COMBINATION_CELL_WIDTH+curam.matrix.Constants.MATRIX_BORDER_SIZE));
this.bottomRight.setWidth();
c.matrix.setWidth();
c.setWidth();
c.addCSS();
this.outcomeValidator.deleteCombination(_de,Number(_df)-1);
},fixIEBorder:function(){
if(!dojo.isIE){
return;
}
var rpc=cm.replaceClass;
var _e2=this.bottomLeft.bottomLeftMain.questions.getObjectByIndex(0);
if(!_e2){
return;
}
var qId=_e2.qId;
var _e3=dojo.byId("ql-"+qId);
rpc(_e3,"ieMarginPlus","ieMarginMinus");
var _e4=dojo.byId("qr-"+qId);
if(_e4){
rpc(_e4,"ieMarginPlus","ieMarginMinus");
}
_e3=cm.nextSibling(_e3,"div");
if(_e3){
rpc(_e3,"ieMarginMinus","ieMarginPlus");
}
_e4=cm.nextSibling(_e4,"div");
if(_e4){
rpc(_e4,"ieMarginMinus","ieMarginPlus");
}
},addMessagesFromPopup:function(_e5,_e6){
var id="";
var _e7=null;
for(var i=0;i<_e5.count;i++){
id=this.inputPrefix+"contrmsg."+_e6+"."+_e5.getKeyByIndex(i);
_e7=dojo.byId(id);
if(_e7==null){
_e7=dojo.create("input",{id:id,name:id,type:"hidden"},this.node);
}
_e7.value=_e5.getObjectByIndex(i);
}
},getContradictionMsg:function(_e8,_e9){
var _ea=dojo.byId(this.inputPrefix+"contrmsg."+_e8+"."+_e9);
if(_ea){
return _ea.value;
}
return null;
},addMessages:function(id){
var _eb=new Array;
var _ec=curam.matrix.util.getCellIndexFromContradictionCellId(id);
localeList=localeList.replace(" ","");
var _ed=localeList.split(",");
var _ee="";
var _ef=null;
for(var i=0;i<_ed.length;i++){
if(_ed[i]==""){
continue;
}
_ee=this.inputPrefix+"contrmsg."+_ec+"."+_ed[i];
_ef=dojo.byId(_ee);
if(_ef!=null){
_eb[_ed[i]]=_ef.value;
}
}
var sc=new curam.util.ScreenContext("MODAL");
var url="../CDEJ/popups/decision-assist/add-messages.jsp?messages=combinationMessages"+"&combinationID="+_ec+"&"+sc.toRequestString();
function _f0(url){
curam.util.openModalDialog({href:url},"width=250,height=200");
};
_f0.url=url;
dojo.global.openThis=_f0;
combinationMessages=_eb;
setTimeout("dojo.global[\"openThis\"]('"+url+"');",50);
}});
return _2;
});
