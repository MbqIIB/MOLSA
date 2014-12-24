//>>built
define("curam/matrix/TopRight",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_1,_2,_3){
_2.provide("curam.matrix.TopRight");
_2.require("curam.matrix.Constants");
_2.declare("curam.matrix.TopRight",null,{constructor:function(){
this.node=_2.byId("top-right");
this.topRightTop=new curam.matrix.TopRightTop();
this.topRightBottom=new curam.matrix.TopRightBottom();
this.container=curam.matrix.Constants.container;
},setDimensions:function(){
var c=this.container;
this.totalHeadingWidth=0;
this.setDefaultPriorityDimensions();
this.setDefaultCombinationDimensions();
c.initialContradictionDimensionsSet=false;
this.setInitialContradictionDimensions();
outcomesWidth=this.setInitialOutcomeDimensions();
if(c.matrix.priorityExists){
this.totalHeadingWidth+=c.priorityWidth;
}
if(c.matrix.scoreExists){
this.totalHeadingWidth+=c.priorityWidth;
}
if(c.matrix.contradictionsExist){
this.totalHeadingWidth+=this.topRightTop.contradictionCol.widthWithBorder;
}
if(c.matrix.outcomesExist){
this.totalHeadingWidth+=outcomesWidth;
}
this.setWidths(0);
},setWidths:function(_4){
var c=curam.matrix.Constants.container;
this.totalHeadingWidth=Math.max(1,this.totalHeadingWidth+_4);
this.width=Math.max(1,this.totalHeadingWidth>c.maxTopRightWidth?c.maxTopRightWidth:this.totalHeadingWidth);
c.cssText.append(".matrix-container .right-eval{width:").append(this.totalHeadingWidth).append("px;}.matrix-container .top-right-eval{width:").append(this.width).append("px;}");
},setDefaultPriorityDimensions:function(){
var c=curam.matrix.Constants.container;
c.priorityWidth=c.tempDivs.priorityHeading.offsetWidth;
var _5=c.priorityWidth-curam.matrix.Constants.MATRIX_BORDER_SIZE;
var _6=c.tempDivs.priVal;
var _7=_5-_2.style(_6,"marginLeft")-_2.style(_6,"marginRight")-_2.style(_6,"borderLeft")-_2.style(_6,"borderRight")-_2.style(_6,"paddingLeft")-_2.style(_6,"paddingRight");
var _8=_7-c.inputBorderWidth-4;
c.cssText.append(".matrix-container .pri-col-eval{width:").append(_5).append("px;}").append(".matrix-container .pri-val-eval{width:").append(_7).append("px;}").append(".matrix-container .pri-input-eval{width:").append(_8).append("px;}");
},setDefaultCombinationDimensions:function(){
var c=curam.matrix.Constants.container;
var _9=c.tempDivs.cell;
var _a=c.tempDivs.cellInput;
c.cellHeight=c.reducedAnswHeight;
c.cellWidth=curam.matrix.Constants.COMBINATION_CELL_WIDTH;
c.cboxWidth=_a.offsetWidth;
c.cboxHeight=_a.clientHeight;
c.cboxOffsetDiff=_a.offsetWidth-_a.clientWidth;
var _b=(c.cellHeight-c.cboxHeight-c.cboxOffsetDiff)/2;
var _c=(c.fullAnswerHeight+3-c.cboxHeight-c.cboxOffsetDiff)/2;
var _d=(c.cellWidth-c.cboxWidth-c.cboxOffsetDiff)/2;
if(_2.isFF){
_d+=2;
}
c.cssText.append(".matrix-container .cbox-eval{left:").append(_d).append("px;top:").append(_b).append("px;}");
c.cssText.append(".matrix-container .cbox-eval-with-menu{left:").append(_d).append("px;top:").append(_c).append("px;}");
c.cssText.append(".matrix-container .cell-first-row .cbox-eval{").append("top:").append(_b).append("px;}");
},setInitialContradictionDimensions:function(){
if(this.container.matrix.contradictionsExist){
var _e=this.topRightTop.contradictionCol.combinationCount;
var _f=(_e*curam.matrix.Constants.COMBINATION_CELL_WIDTH)+((_e-1)*curam.matrix.Constants.MATRIX_BORDER_SIZE);
this.topRightTop.contradictionCol.setWidth(_f);
}
},setInitialOutcomeDimensions:function(){
var _10=0,_11,_12,_13,_14,_15,_16;
if(this.container.matrix.outcomesExist){
var _17=this.topRightTop.outcomeCols;
for(var i=0;i<_17.count;i++){
_11=_17.getObjectByIndex(i);
_13=_11.columns.count;
_14=(_13*curam.matrix.Constants.COMBINATION_CELL_WIDTH)+((_13-1)*curam.matrix.Constants.MATRIX_BORDER_SIZE);
_12=_14;
_15=curam.matrix.Constants.COMBINATION_CELL_WIDTH;
_10+=_12+curam.matrix.Constants.MATRIX_BORDER_SIZE;
_11.setWidth(_11.outId,_12);
}
}
return _10;
},addPriorityColumn:function(){
this.topRightTop.addPriority();
this.topRightBottom.addPriority();
this.setWidths(curam.matrix.Constants.container.priorityWidth);
},addScoreColumn:function(){
this.topRightTop.addScore();
this.topRightBottom.addScore();
this.setWidths(curam.matrix.Constants.container.priorityWidth);
},addContradictionColumn:function(){
this.topRightTop.addContradiction();
this.topRightBottom.addContradiction();
},addOutcomeColumn:function(_18){
this.topRightBottom.addOutcomeColumn(_18);
return this.topRightTop.addOutcomeColumn(_18);
},deletePriorityColumn:function(){
this.topRightTop.deletePriorityColumn();
this.topRightBottom.deletePriorityColumn();
},deleteScoreColumn:function(){
this.topRightTop.deleteScoreColumn();
this.topRightBottom.deleteScoreColumn();
},deleteContradictionColumn:function(){
this.topRightTop.deleteContradictionColumn();
this.topRightBottom.deleteContradictionColumn();
},deleteOutcomeColumn:function(id){
this.topRightTop.deleteOutcomeColumn(id);
this.topRightBottom.deleteOutcomeColumn(id);
}});
});
