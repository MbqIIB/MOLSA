//>>built
define("curam/matrix/ContradictionCell",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_1,_2,_3){
_2.provide("curam.matrix.ContradictionCell");
_2.require("curam.matrix.Constants");
_2.declare("curam.matrix.ContradictionCell",null,{constructor:function(_4){
this.node=_4;
this.input=_2.query("> :first-child",this.node)[0];
this.button=cm.nextSibling(this.input);
this.initListener();
this.widgetCreated=false;
},initListener:function(){
if(this.button&&!_2.hasClass(this.button,"hidden-image")){
var _5=this;
curam.matrix.Constants.container.matrix.addLazyWidget(this,"cells");
this.lazyListener=function(_6){
if(!curam.matrix.Constants.container.matrix.createLazyWidgets("cells")){
_2.disconnect(this.button._conn);
return;
}
if(!_5.widget){
return;
}
_5.widget._toggleMenu("CombinationOptions",_6);
window.activeMenuID=_5.node.id;
_1.byId("CombinationOptions")._openMyself(curam.matrix.Constants.container.getFakeEvent(_5.widget.domNode));
};
this.button._conn=_2.connect(this.button,"onclick",this,"lazyListener");
}
},createWidget:function(_7){
var c=curam.matrix.Constants.container;
if(this.widgetCreated){
return;
}
if(!this.button.cellId){
this.button.cellId=this.node.id;
}
this.widget=new curam.widget.CombinationButton({menuId:"CombinationOptions"},this.button);
var _8=this.input.id.split(".");
this.widget.colId=_8[_8.length-1];
this.widgetCreated=true;
window.activeMenuID=this.node.id;
_2.disconnect(this.button._conn);
},setButtonClass:function(_9){
if(!this.button){
this.button=_2.create("div");
this.node.appendChild(this.button);
}
cm.setClass(this.button,_9);
if(!this.widgetCreated&&_9=="image"){
this.initListener();
}
},adjustFirstRowClass:function(_a){
var _b=_2.attr(this.node,"class");
if(_b.indexOf("ans-eval-with-menu")==-1){
_b=_b.replace("ans-eval","ans-eval-with-menu");
cm.setClass(this.node,_b);
}
_b=_2.attr(this.input,"class");
if(_b.indexOf("cbox-eval-with-menu")==-1){
_b=_b.replace("cbox-eval","cbox-eval-with-menu");
cm.setClass(this.input,_b);
}
}});
});
