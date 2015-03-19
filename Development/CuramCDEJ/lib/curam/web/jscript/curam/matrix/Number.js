//>>built
define("curam/matrix/Number",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_1,_2,_3){
_2.provide("curam.matrix.Number");
_2.require("curam.matrix.Constants");
_2.declare("curam.matrix.Number",null,{constructor:function(_4,_5){
this.node=_4;
this.text=_2.query("> :first-child",_4)[0];
this.qId=_5;
this.widgetCreated=false;
var _6=this;
curam.matrix.Constants.container.matrix.addLazyWidget(this,"numbers");
this.lazyListener=function(_7){
if(!curam.matrix.Constants.container.matrix.createLazyWidgets("numbers")){
_2.disconnect(_6.node._conn);
return;
}
if(!_6.widget){
return;
}
_6.widget._toggleMenu("QuestionOptions",_7);
window.activeMenuID="ql-"+_6.qId;
_1.byId("QuestionOptions")._openMyself(_7);
};
this.node._conn=_2.connect(this.node,"onclick",this,"lazyListener");
},verticallyCenterText:function(_8,_9){
var _a="number-text-"+_9+"-eval";
var _b=(_8/2)-(curam.matrix.Constants.container.numTextHeight/2);
curam.matrix.Constants.container.cssText.append(".matrix-container .bottom-left-main .").append(_a).append("{padding-top:").append(_b).append("px;}");
},createWidget:function(){
var c=curam.matrix.Constants.container;
if(this.widgetCreated){
return;
}
var _c=_1.byId(this.node.id);
if(_c){
_c.destroy();
}
var _d=this.widget=new curam.widget.QuestionButton({menuId:"QuestionOptions",id:this.node.id,qId:this.qId},this.node);
this.widgetCreated=true;
}});
});
