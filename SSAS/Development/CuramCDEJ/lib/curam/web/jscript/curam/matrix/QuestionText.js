//>>built
define("curam/matrix/QuestionText",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_1,_2,_3){
_2.provide("curam.matrix.QuestionText");
_2.require("curam.matrix.Constants");
_2.declare("curam.matrix.QuestionText",null,{constructor:function(_4){
this.node=_4;
this.text=_2.query("> :first-child",_4)[0];
this.originalTextHeight=null;
},verticallyCenterText:function(_5,_6){
if(this.originalTextHeight==null){
this.originalTextHeight=_2.contentBox(this.text).h;
}
var _7=(_5/2)-(this.originalTextHeight/2);
curam.matrix.Constants.container.cssText.append(".matrix-container .bottom-left-main .").append("q-ct .qt-text-").append(_6).append("-eval").append("{padding-top:").append(_7).append("px;}");
}});
});
