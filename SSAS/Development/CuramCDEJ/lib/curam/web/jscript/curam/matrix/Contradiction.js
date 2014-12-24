//>>built
define("curam/matrix/Contradiction",["dijit","dojo","dojox"],function(_1,_2,_3){
_2.provide("curam.matrix.Contradiction");
_2.declare("curam.matrix.Contradiction",null,{constructor:function(_4){
this.node=_4;
this.rows=new curam.ListMap();
var _5=this.node.childNodes;
for(var i=0;i<_5.length;i++){
if(_5[i].nodeType==1){
this.rows.add(_5[i].id,new curam.matrix.ContradictionRow(_5[i]));
}
}
}});
});
