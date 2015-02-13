//>>built
define("curam/matrix/PriorityGroup",["dijit","dojo","dojox"],function(_1,_2,_3){
_2.provide("curam.matrix.PriorityGroup");
_2.declare("curam.matrix.PriorityGroup",null,{constructor:function(_4,_5){
this.node=_4;
this.priorities=new curam.ListMap();
this.matrix=_5;
var _6=this.node.childNodes;
for(var i=0;i<_6.length;i++){
if(_6[i].nodeType==1){
this.priorities.add(_6[i].id,new curam.matrix.Priority(_6[i],_5,this));
}
}
},addPriority:function(_7){
if(_7.nodeType==1){
this.priorities.add(_7.id,new curam.matrix.Priority(_7,this.matrix,this));
this.node.appendChild(_7);
}
}});
});
