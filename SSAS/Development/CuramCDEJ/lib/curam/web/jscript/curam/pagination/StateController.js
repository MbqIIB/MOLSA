//>>built
define("curam/pagination/StateController",["curam/pagination","curam/debug"],function(){
var _1=dojo.declare("curam.pagination.StateController",null,{pageSize:undefined,currentPage:0,_listModel:undefined,_gui:undefined,constructor:function(_2,_3){
this.pageSize=curam.pagination.defaultPageSize;
this._listModel=_2;
this.pageSize=curam.pagination.defaultPageSize;
this._gui=_3;
var _4={};
_4.pageSizeOptions=[15,30,45];
_4.pageSizeOptions.contains=function(_5){
for(var i=0;i<_4.pageSizeOptions.length;i++){
if(_4.pageSizeOptions[i]==_5){
return true;
}
}
return false;
};
if(!_4.pageSizeOptions.contains(curam.pagination.defaultPageSize)){
_4.pageSizeOptions.push(curam.pagination.defaultPageSize);
_4.pageSizeOptions.sort(function(a,b){
return a-b;
});
}
_4.currentPageSize=this.pageSize;
_4.directLinkRangeWidth=3;
_4.lastPage=this._getLastPageNumber();
this._gui.updateState(_4);
var _6={};
_6.first=dojo.hitch(this,this.gotoFirst);
_6.last=dojo.hitch(this,this.gotoLast);
_6.previous=dojo.hitch(this,this.gotoPrevious);
_6.next=dojo.hitch(this,this.gotoNext);
_6.page=dojo.hitch(this,this.gotoPage);
_6.pageSize=dojo.hitch(this,this.changePageSize);
this._gui.setHandlers(_6);
},reset:function(){
this._listModel.hideRange(1,this._listModel.getRowCount());
this.currentPage=0;
this._gui.reset();
this.gotoFirst();
},gotoFirst:function(){
if(this.currentPage!=1){
this.gotoPage(1);
}
},gotoLast:function(){
var _7=this._getLastPageNumber();
if(this.currentPage!=_7){
this.gotoPage(_7);
}
},gotoPrevious:function(){
if(this.currentPage>1){
this.gotoPage(this.currentPage-1);
}
},gotoNext:function(){
curam.debug.log("curam.pagination.StateController.gotoNext");
var _8=this._getLastPageNumber();
if(this.currentPage<_8){
this.gotoPage(this.currentPage+1);
}
},gotoPage:function(_9){
curam.debug.log("curam.pagination.StateController.gotoPage: ",_9);
if(this.currentPage!=0){
this._listModel.hideRange(this._calcRangeStart(this.currentPage),this._calcRangeEnd(this.currentPage));
}
this._listModel.showRange(this._calcRangeStart(_9),this._calcRangeEnd(_9));
this.currentPage=_9;
this._updateGui();
},changePageSize:function(_a){
curam.debug.log("curam.pagination.StateController.changePageSize: ",_a);
this.pageSize=_a;
var _b={};
_b.currentPageSize=_a;
_b.lastPage=this._getLastPageNumber();
this._gui.updateState(_b);
this.reset();
},_calcRangeStart:function(_c){
return (_c*this.pageSize)-this.pageSize+1;
},_calcRangeEnd:function(_d){
if(_d!=this._getLastPageNumber()){
return _d*this.pageSize;
}else{
return this._listModel.getRowCount();
}
},_getLastPageNumber:function(){
var _e=this._listModel.getRowCount();
var _f=_e%this.pageSize;
return ((_e-_f)/this.pageSize)+(_f>0?1:0);
},_updateGui:function(){
var _10={};
_10.first=this.currentPage>1;
_10.previous=_10.first;
_10.next=this.currentPage<this._getLastPageNumber();
_10.last=_10.next;
_10.currentPage=this.currentPage;
_10.rowInfo=[this._calcRangeStart(this.currentPage),this._calcRangeEnd(this.currentPage),this._listModel.getRowCount()];
this._gui.updateState(_10);
}});
return _1;
});
