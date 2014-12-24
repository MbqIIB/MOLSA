//>>built
define("curam/matrix/TopLeft",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants,dojo/dom-geometry"],function(_1,_2,_3){
_2.provide("curam.matrix.TopLeft");
_2.require("curam.matrix.Constants");
var _4=_2.require("dojo.dom-geometry");
_2.declare("curam.matrix.TopLeft",null,{constructor:function(){
this.node=_2.byId("top-left");
this.topLeftTop=_2.byId("top-left-top");
this.columnIDA=_2.byId("column-id-a");
this.columnIDAText=_2.query("> :first-child",this.columnIDA)[0];
this.columnIDB=_2.byId("column-id-b");
this.columnIDBText=_2.query("> :first-child",this.columnIDB)[0];
this.topLeftBottom=_2.byId("top-left-bottom");
this.headingQuestion=_2.byId("heading-questions");
this.headingQuestionText=_2.query("> :first-child",this.headingQuestion)[0];
this.headingAnswerValues=_2.byId("heading-answers");
this.headingAnswerValuesText=_2.query("> :first-child",this.headingAnswerValues)[0];
},setDimensions:function(){
var _5=this.columnIDA.clientHeight;
var _6=_5+(curam.matrix.Constants.MATRIX_BORDER_SIZE*2);
var _7=_5+curam.matrix.Constants.MATRIX_BORDER_SIZE;
this.height=_6+_7;
var c=curam.matrix.Constants.container;
this.width=c.questionColWidth+c.answersColWidth+(curam.matrix.Constants.MATRIX_BORDER_SIZE*2);
c.leftMatrixWidth=this.width+c.tempDivs.numWidth+(curam.matrix.Constants.MATRIX_BORDER_SIZE*2);
this.topLeftFillerHeight=_5+_4.getMarginBoxSimple(this.headingQuestion).h+2;
c.cssText.append(".matrix-container .qt-col-eval{width:"+c.questionColWidth+"px;}").append(".matrix-container .top-eval{height:").append(this.height).append("px;}.matrix-container .top-top-eval{height:").append(_6).append("px;}.matrix-container .top-bottom-eval{height:").append(_7).append("px;}.matrix-container .column-eval{height:").append(_5).append("px;}.matrix-container .top-left-eval{width:").append(this.width).append("px;}.matrix-container .top-left-filler-eval{height:").append(this.topLeftFillerHeight).append("px;}.matrix-container .number-col-eval{width:").append(c.tempDivs.numWidth).append("px;}.matrix-container .ans-col-eval{width:").append(c.answersColWidth).append("px;}");
}});
});
