//>>built
define("curam/pagination/DefaultListModel",["curam/debug","curam/pagination","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
var _2=dojo.declare("curam.pagination.DefaultListModel",null,{_rowCount:null,constructor:function(_3){
this.tableNode=dojo.query("table.paginated-list-id-"+_3)[0];
if(!this.tableNode){
throw "Table node for ID "+_3+" not found - failing!";
}
curam.debug.log("curam.pagination.DefaultListModel "+_1.getProperty("curam.pagination.DefaultListModel"),this.tableNode);
this._id=_3;
},getId:function(){
return this._id;
},getRowCount:function(){
if(this._rowCount==null){
this._rowCount=0;
var _4=dojo.query("tbody > script.hidden-list-rows",this.tableNode);
for(var i=0;i<_4.length;i++){
var _5=_4[i];
var _6=(i==_4.length-1);
if(!_6){
this._rowCount+=curam.pagination.getNumRowsInBlock(_5);
}else{
curam.pagination.unpackRows(_5);
}
}
var _7=dojo.query("tbody > tr",this.tableNode).length;
this._rowCount+=_7;
}
return this._rowCount;
},hideRange:function(_8,_9){
var _a=this._getRowNodes(_8,_9);
for(var i=_8;i<=_9;i++){
dojo.style(_a[i-1],{"display":"none"});
dojo.removeClass(_a[i-1],"even-last-row");
dojo.removeClass(_a[i-1],"odd-last-row");
}
},showRange:function(_b,_c){
var _d=this._getRowNodes(_b,_c);
var _e=(_c%2==0)?"even-last-row":"odd-last-row";
dojo.addClass(_d[_c-1],_e);
for(var i=_b;i<=_c;i++){
dojo.style(_d[i-1],{"display":""});
}
},_getRowNodes:function(_f,_10){
var _11=curam.pagination.readListContent(this.tableNode);
for(var i=1;i<=_10&&i<=_11.length;i++){
var _12=_11[i-1];
if(_12.tagName=="SCRIPT"){
curam.pagination.unpackRows(_12);
_11=curam.pagination.readListContent(this.tableNode);
i--;
}
}
return dojo.query("tbody > tr",this.tableNode);
}});
return _2;
});
