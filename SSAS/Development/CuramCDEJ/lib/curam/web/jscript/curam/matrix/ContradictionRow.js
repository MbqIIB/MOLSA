//>>built
define("curam/matrix/ContradictionRow",["dijit","dojo","dojox"],function(_1,_2,_3){
_2.provide("curam.matrix.ContradictionRow");
_2.declare("curam.matrix.ContradictionRow",null,{constructor:function(_4){
this.node=_4;
this.cells=new curam.ListMap();
var _5=this.node.childNodes;
for(var i=0;i<_5.length;i++){
if(_5[i].nodeType==1){
this.cells.add(_5[i].id,new curam.matrix.ContradictionCell(_5[i]));
}
}
}});
});
