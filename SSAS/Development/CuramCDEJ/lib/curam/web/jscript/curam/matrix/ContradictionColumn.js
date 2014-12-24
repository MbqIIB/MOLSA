//>>built
define("curam/matrix/ContradictionColumn",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_1,_2,_3){
_2.provide("curam.matrix.ContradictionColumn");
_2.require("curam.matrix.Constants");
_2.declare("curam.matrix.ContradictionColumn",null,{constructor:function(_4,_5){
this.node=_4;
this.text=_2.query("> :first-child",this.node)[0];
this.columns=new curam.ListMap();
this.columnMessages=new curam.ListMap();
this.widgetCreated=false;
this.combinationCount=0;
var _6=cm.nextSibling(this.text);
this.matrix=curam.matrix.Constants.container.matrix;
if(_5){
curam.matrix.util.initButtonListeners(_4);
}
while(_6!=null){
if(_6.nodeName=="INPUT"){
if(_7(_6.id)){
this.columns.add(_6.id,_6);
this.combinationCount++;
}
}
_6=cm.nextSibling(_6);
}
function _7(id){
var _8=/.contrcombid./;
if(id.match(_8)!=null){
return true;
}
return false;
};
var _9=this;
this.matrix.addLazyWidget(this,"columns");
this.lazyListener=function(_a){
if(!_9.matrix.createLazyWidgets("columns")){
_2.disconnect(_9.node._conn);
return;
}
if(!_9.widget){
return;
}
_9.widget._toggleMenu("OutcomeOptions",_a);
window.activeMenuID=_9.node.id;
_1.byId("OutcomeOptions")._openMyself(_a);
};
this.node._conn=_2.connect(this.node,"onclick",this,"lazyListener");
},createWidget:function(){
var c=curam.matrix.Constants.container;
if(this.widgetCreated){
return;
}
var _b=this.widthWithoutBorder;
var _c=_1.byId(this.node.id);
if(_c){
_c.destroy();
}
var _d=this.widget=new curam.widget.DivButton({menuId:"OutcomeOptions",id:this.node.id,className:"column-id column-eval contr-col-eval"},this.node);
var _e=new curam.matrix.ContradictionColumn(_d.domNode,true);
c.matrix.topRight.topRightTop.contradictionCol=_e;
_e.widgetCreated=true;
_e.setWidth(_b);
},getCombColumnIds:function(){
var _f;
var arr=new Array();
var _10=/^.*\.contrcombid\./;
for(var i=0;i<this.columns.count;i++){
_f=this.columns.getKeyByIndex(i);
_f=new String(_f);
arr.push(_f.replace(_10,""));
}
return arr;
},setWidth:function(_11){
curam.matrix.Constants.container.cssText.append(".matrix-container .contr-col-eval{width:").append(_11).append("px;}");
this.widthWithoutBorder=_11;
this.widthWithBorder=_11+curam.matrix.Constants.MATRIX_BORDER_SIZE;
},deleteCombIdAndMsgInputFields:function(id){
var _12=this.matrix.inputPrefix+"contrcombid."+id;
var _13;
var c=curam.matrix.Constants.container;
_2.destroy(this.columns.getObjectByKey(_12));
this.columns.removeByKey(_12);
for(var i=0;i<c.locales.length;i++){
if(c.locales[i]==""){
continue;
}
_13=this.matrix.inputPrefix+"contrmsg."+c.locales[i]+"."+id;
_2.destroy(_2.byId(_13));
}
}});
});
