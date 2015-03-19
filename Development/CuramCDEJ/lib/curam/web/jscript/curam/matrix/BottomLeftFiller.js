//>>built
define("curam/matrix/BottomLeftFiller",["dijit","dojo","dojox"],function(_1,_2,_3){
_2.provide("curam.matrix.BottomLeftFiller");
_2.declare("curam.matrix.BottomLeftFiller",null,{constructor:function(){
this.node=_2.byId("bottom-left-filler");
this.bottomLeftFillerMain=_2.byId("bottom-left-filler-main");
this.bottomLeftNumberFiller=_2.byId("bottom-left-filler-number");
},setDimensions:function(){
this.height=curam.matrix.Constants.container.scrollBarWidth;
curam.matrix.Constants.container.cssText.append(".matrix-container .bottom-left-filler-eval{height:").append(this.height).append("px;}.matrix-container .bottom-left-number-filler-eval{height:").append(this.height).append("px;}");
}});
});
