//>>built
define("curam/matrix/BottomLeft",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_1,_2,_3){
_2.provide("curam.matrix.BottomLeft");
_2.require("curam.matrix.Constants");
_2.declare("curam.matrix.BottomLeft",null,{constructor:function(){
this.node=_2.byId("bottom-left");
this.bottomLeftMain=new curam.matrix.BottomLeftMain();
this.bottomLeftFiller=new curam.matrix.BottomLeftFiller();
},setDimensions:function(){
this.bottomLeftFiller.setDimensions();
this.bottomLeftMain.setDimensions();
this.setHeight();
curam.matrix.Constants.container.cssText.append(".matrix-container .bottom-left-eval{width:").append(curam.matrix.Constants.container.leftMatrixWidth).append("px;}");
},setHeight:function(){
var c=curam.matrix.Constants.container;
this.heightIncBorder=this.bottomLeftMain.height+c.matrix.bottomLeft.bottomLeftFiller.height+curam.matrix.Constants.MATRIX_BORDER_SIZE;
c.cssText.append(".matrix-container .bottom-eval{height:").append(this.bottomLeftMain.height+c.matrix.bottomLeft.bottomLeftFiller.height).append("px;}");
}});
});
