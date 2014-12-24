//>>built
define("curam/pagination/ExpandableListModel",["curam/util/ExpandableLists","curam/debug","curam/pagination","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
var _2=dojo.declare("curam.pagination.ExpandableListModel",null,{_rowCount:null,constructor:function(_3){
this.tableNode=dojo.query("table.paginated-list-id-"+_3)[0];
if(!this.tableNode){
throw "Table node for ID "+_3+" not found - failing!";
}
curam.debug.log("curam.pagination.ExpandableListModel "+_1.getProperty("curam.pagination.ExpandableListModel"),this.tableNode);
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
this._rowCount+=(curam.pagination.getNumRowsInBlock(_5)*2);
}else{
curam.pagination.unpackRows(_5);
}
}
var _7=dojo.query("tbody > tr",this.tableNode).length;
this._rowCount+=_7;
}
if(this._rowCount<=1){
return 1;
}else{
return this._rowCount/2;
}
},hideRange:function(_8,_9){
var _a=this._getRowNodes(_8,_9);
for(var i=_8;i<=_9;i++){
var _b=(2*i)-2;
var _c=(2*i)-1;
dojo.style(_a[_b],"display","none");
dojo.removeClass(_a[_b],"even-last-row");
dojo.removeClass(_a[_b],"odd-last-row");
if(_a.length>_c){
var _d=_a[_c];
if(_d){
_d._curam_pagination_expanded=curam.util.ExpandableLists.isDetailsRowExpanded(_d);
curam.util.ExpandableLists.setDetailsRowExpandedState(_a[_b],_d,false);
}
}
}
},showRange:function(_e,_f){
var _10=this._getRowNodes(_e,_f);
var _11=(_f%2==0)?"even-last-row":"odd-last-row";
dojo.addClass(_10[(_f*2)-2],_11);
for(var i=_e;i<=_f;i++){
var _12=(2*i)-2;
var _13=(2*i)-1;
dojo.style(_10[_12],"display","");
if(_10.length>_13){
var _14=_10[_13];
if(_14){
curam.util.ExpandableLists.setDetailsRowExpandedState(_10[_12],_14,_14._curam_pagination_expanded);
}
}
}
},_getRowNodes:function(_15,_16){
var _17=curam.pagination.readListContent(this.tableNode);
for(var i=1;i<=(_16*2)&&i<=_17.length;i++){
var _18=_17[i-1];
if(_18.tagName=="SCRIPT"){
curam.pagination.unpackRows(_18);
_17=curam.pagination.readListContent(this.tableNode);
i--;
}
}
return dojo.query("tbody > tr",this.tableNode);
}});
return _2;
});
