//>>built
define("curam/matrix/TopRightFiller",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_1,_2,_3){
_2.provide("curam.matrix.TopRightFiller");
_2.require("curam.matrix.Constants");
_2.declare("curam.matrix.TopRightFiller",null,{constructor:function(){
this.node=_2.byId("top-right-filler");
this.topRightTopFiller=_2.byId("top-right-filler-top");
this.topRightBottomFiller=_2.byId("top-right-filler-bottom");
},setDimensions:function(){
var c=curam.matrix.Constants.container;
this.widthIncBorder=c.scrollBarWidth+curam.matrix.Constants.MATRIX_BORDER_SIZE;
c.cssText.append(".matrix-container .top-right-filler-contents-eval{width:").append(c.scrollBarWidth).append("px;}.matrix-container .top-right-filler-eval{width:").append(this.widthIncBorder).append("px;}");
}});
});
