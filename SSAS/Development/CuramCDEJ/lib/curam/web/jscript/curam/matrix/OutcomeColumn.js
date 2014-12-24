//>>built
define("curam/matrix/OutcomeColumn",["dijit","dojo","dojox","dojo/require!curam/matrix/Constants"],function(_1,_2,_3){
_2.provide("curam.matrix.OutcomeColumn");
_2.require("curam.matrix.Constants");
_2.declare("curam.matrix.OutcomeColumn",null,{constructor:function(_4,_5){
this.node=_4;
this.text=_2.query("> :first-child",this.node)[0];
this.outId=this.node.id.replace("column-id-","");
this.columns=new curam.ListMap();
this.combinationCount=0;
this.matrix=curam.matrix.Constants.container.matrix;
if(_5){
curam.matrix.util.initButtonListeners(_4);
}
var _6=cm.nextSibling(this.text);
while(_6!=null){
if(_6.nodeName=="INPUT"){
this.columns.add(_6.id,_6);
this.combinationCount++;
}
_6=cm.nextSibling(_6);
}
curam.matrix.Constants.container.existingOutcomeIds=curam.matrix.Constants.container.existingOutcomeIds.concat((this.outId)+"|");
var _7=this;
this.matrix.addLazyWidget(this,"columns");
this.lazyListener=function(_8){
if(!_7.matrix.createLazyWidgets("columns")){
_2.disconnect(this.node._conn);
return;
}
if(!_7.widget){
return;
}
_7.widget._toggleMenu("OutcomeOptions",_8);
window.activeMenuID=_7.node.id;
_1.byId("OutcomeOptions")._openMyself(_8);
};
this.node._conn=_2.connect(this.node,"onclick",this,"lazyListener");
},createWidget:function(){
var c=curam.matrix.Constants.container;
if(this.widgetCreated){
return;
}
var _9="column-id column-eval out-"+this.outId+"-col-eval";
var _a=this.widthWithoutBorder;
var _b=_1.byId(this.node.id);
if(_b){
_b.destroy();
}
var _c=this.widget=new curam.widget.DivButton({menuId:"OutcomeOptions",id:this.node.id,className:_9},this.node);
var _d=new curam.matrix.OutcomeColumn(_c.domNode,true);
c.matrix.topRight.topRightTop.outcomeCols.add(_d.node.id,_d);
_d.widgetCreated=true;
_d.setWidth(this.outId,_a);
c.existingOutcomeIds=c.existingOutcomeIds.replace(this.outId+"|","");
},getCombColumnIds:function(){
var _e;
var _f=new Array();
var _10=/.*\.outcombid\..*\./;
for(var i=0;i<this.columns.count;i++){
_e=this.columns.getKeyByIndex(i);
_e=new String(_e);
_f.push(_e.replace(_10,""));
}
return _f;
},setDimensions:function(_11){
var _12=this.combinationCount;
var _13=(_12*curam.matrix.Constants.COMBINATION_CELL_WIDTH)+((_12-1)*curam.matrix.Constants.MATRIX_BORDER_SIZE);
var _14=curam.matrix.Constants.COMBINATION_CELL_WIDTH;
this.setWidth(_11,_13);
return _13+curam.matrix.Constants.MATRIX_BORDER_SIZE;
},setWidth:function(_15,_16){
curam.matrix.Constants.container.cssText.append(".matrix-container .out-").append(_15).append("-col-eval{width:").append(_16).append("px;}");
this.widthWithoutBorder=_16;
this.widthWithBorder=_16+curam.matrix.Constants.MATRIX_BORDER_SIZE;
},deleteCombIdInputFields:function(id){
var _17=this.matrix.inputPrefix+"outcombid."+this.outId+"."+id;
_2.destroy(this.columns.getObjectByKey(_17));
this.columns.removeByKey(_17);
}});
});
