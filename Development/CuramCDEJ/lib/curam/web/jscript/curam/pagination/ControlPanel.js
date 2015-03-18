//>>built
define("curam/pagination/ControlPanel",["curam/pagination","curam/debug","curam/util"],function(){
var _1=dojo.declare("curam.pagination.ControlPanel",null,{first:"FIRST",last:"LAST",previous:"PREV",next:"NEXT",page:"GOTO_PAGE",pageSize:"PAGE_SIZE",rowInfo:"ROW_INFO",classFirst:"first",classLast:"last",classPrevious:"previous",classNext:"next",classPage:"page",classDisplayInfo:"display_info",_controls:undefined,currentPage:0,lastPage:9999,currentPageSize:0,directLinkRangeWidth:3,parentNode:undefined,handlers:undefined,directLinksDisconnects:undefined,constructor:function(_2){
this._controls={};
this.handlers={};
this.directLinksDisconnects=[];
var _3=this._localize;
var ul=dojo.create("ul",null,_2);
dojo.addClass(ul,"pagination-control-list");
this._controls[this.pageSize]=this._createDropdownControl(this.pageSize,_3("pageSize_title"),ul);
this._controls[this.rowInfo]=this._createDisplayControl(this.rowInfo,_3("pagination_info",["$dummy$","$dummy$","$dummy$"]),ul,null,null);
this._controls[this.first]=this._createLinkControl(this.first,_3("firstPage_btn"),ul,null,this.classFirst,_3("firstPage_title"));
this._controls[this.previous]=this._createLinkControl(this.previous,_3("prevPage_btn"),ul,null,this.classPrevious,_3("prevPage_title"));
this._controls[this.page]=[];
this._controls[this.page].push(this._createLinkControl(this.page,"direct-page-links-section",ul,null,this.classPage,_3("page_title")));
this._controls[this.next]=this._createLinkControl(this.next,_3("nextPage_btn"),ul,null,this.classNext,_3("nextPage_title"));
this._controls[this.last]=this._createLinkControl(this.last,_3("lastPage_btn"),ul,null,this.classLast,_3("lastPage_title"));
this.parentNode=_2;
dojo.style(_2,{"display":""});
},_localize:function(_4,_5){
var _6=curam.pagination.localizedStrings[_4];
if(!_5){
return _6;
}
for(var i=0;i<_5.length;i++){
_6=_6.replace(/%s/i,_5[i]);
}
return _6;
},_createLinkControl:function(_7,_8,_9,_a,_b,_c){
var _d=_b!=null?_b:"";
var li=dojo.create("li",{"id":_7,"class":_d},_9,_a);
dojo.addClass(li,"pagination-control-list-item enabled");
var a=dojo.create("a",{"innerHTML":_8,"href":"#","title":_c},li);
dojo.addClass(a,"pagination-link");
if(_7==this.first||_7==this.last||_7==this.previous||_7==this.next){
if(curam.util.highContrastModeType()){
var _e="../CDEJ/themes/v6/images/high-contrast/"+_7+"-contrast"+".png";
dojo.create("img",{"src":_e,"alt":_c},a);
}else{
var _e="../CDEJ/themes/v6/images/"+_7+".png";
dojo.create("img",{"src":_e,"alt":_c},a);
}
}else{
var _8=dojo.create("p",{"innerHTML":_8},li);
dojo.addClass(_8,"pagination-text");
}
return li;
},_createDropdownControl:function(_f,_10,_11,_12){
var li=dojo.create("li",{"id":_f},_11,_12);
dojo.addClass(li,"pagination-control-list-item");
var _13="page-size-select"+new Date().getTime();
var _14=dojo.create("label",{"innerHTML":_10+": ","for":_13},li);
dojo.addClass(_14,"pagination-page-size-dropdown-label");
var _15=dojo.create("select",{"title":_10,"id":_13},li);
li._type="dropdown";
return li;
},_createDisplayControl:function(_16,_17,_18,_19,_1a){
var cls=_1a!=null?_1a:"";
var li=dojo.create("li",{"id":_16,"class":cls},_18,_19);
dojo.addClass(li,"pagination-control-list-item");
var _17=dojo.create("p",{"innerHTML":"["+_17+"]"},li);
return li;
},updateState:function(_1b){
curam.debug.log("curam.pagination.ControlPanel.updateState: ",_1b);
if(typeof (_1b.first)!="undefined"){
this._setEnabled(this._controls[this.first],_1b.first);
}
if(typeof (_1b.previous)!="undefined"){
this._setEnabled(this._controls[this.previous],_1b.previous);
}
if(typeof (_1b.next)!="undefined"){
this._setEnabled(this._controls[this.next],_1b.next);
}
if(typeof (_1b.last)!="undefined"){
this._setEnabled(this._controls[this.last],_1b.last);
}
if(typeof (_1b.currentPage)!="undefined"){
this.currentPage=_1b.currentPage;
}
if(typeof (_1b.lastPage)!="undefined"){
this.lastPage=_1b.lastPage;
}
if(typeof (_1b.currentPageSize)!="undefined"){
this.currentPageSize=_1b.currentPageSize;
}
if(typeof (_1b.directLinkRangeWidth)!="undefined"){
this.directLinkRangeWidth=_1b.directLinkRangeWidth;
}
if(typeof (_1b.rowInfo)!="undefined"){
var _1c=this._controls[this.rowInfo].previousSibling;
dojo.destroy(this._controls[this.rowInfo]);
var _1d=_1b.rowInfo[0];
var end=_1b.rowInfo[1];
var _1e=_1b.rowInfo[2];
var _1f=this._localize("pagination_info",[_1d,end,_1e]);
this._controls[this.rowInfo]=this._createDisplayControl(this.rowInfo,_1f,_1c,"after",this.classDisplayInfo);
}
if(typeof (_1b.pageSizeOptions)!="undefined"){
var _20=dojo.query("select",this._controls[this.pageSize])[0];
dojo.forEach(_20.childNodes,function(_21){
dojo.destroy(_21);
});
for(var i=0;i<_1b.pageSizeOptions.length;i++){
var _22=_1b.pageSizeOptions[i];
var _23=dojo.create("option",{"value":_22,"innerHTML":_22},_20);
if(_22==this.currentPageSize){
dojo.attr(_23,"selected","selected");
}
}
}
this._updateDirectLinks();
var _24=dijit.byId("content");
if(_24){
_24.resize();
}
},setHandlers:function(_25){
curam.debug.log("curam.pagination.ControlPanel.setHandlers: ",_25);
this.handlers=_25;
if(_25.first){
this._connectSimpleHandler(this._controls[this.first],_25.first);
}
if(_25.previous){
this._connectSimpleHandler(this._controls[this.previous],_25.previous);
}
if(_25.next){
this._connectSimpleHandler(this._controls[this.next],_25.next);
}
if(_25.last){
this._connectSimpleHandler(this._controls[this.last],_25.last);
}
if(_25.page){
this._connectDirectLinkHandlers(_25.page);
}
if(_25.pageSize){
var _26=dojo.query("select",this._controls[this.pageSize])[0];
dojo.connect(_26,"onchange",dojo.hitch(this,function(_27){
var _28=_27.target.value;
this.currentPageSize=_28;
_25.pageSize(this.currentPageSize);
var _29=dojo.query("option",_26);
_29.forEach(function(_2a){
if(dojo.attr(_2a,"value")==_28){
dojo.attr(_2a,"selected","selected");
}else{
dojo.removeAttr(_2a,"selected");
}
});
}));
}
},_connectSimpleHandler:function(_2b,_2c){
var h=_2c?_2c:_2b._handler;
this._removeSimpleHandler(_2b);
var _2d=curam.util.connect(_2b,"onclick",function(_2e){
dojo.stopEvent(_2e);
h();
});
_2b._handler=h;
_2b._disconnect=_2d;
},_removeSimpleHandler:function(_2f){
if(_2f._disconnect){
curam.util.disconnect(_2f._disconnect);
}
},reset:function(){
curam.debug.log("curam.pagination.ControlPanel.reset");
},_getDirectLinkPageNumbers:function(){
var _30=2*this.directLinkRangeWidth+1;
var p=this.currentPage;
var _31=[];
var num=p>this.directLinkRangeWidth?p-this.directLinkRangeWidth:1;
for(var i=0;i<_30;i++){
_31[i]=num++;
if(num>this.lastPage){
break;
}
}
return _31;
},_updateDirectLinks:function(){
curam.debug.log("curam.pagination.ControlPanel._updateDirectLinks");
var loc=this._localize;
var _32=this._controls[this.page];
dojo.query("div.pagination-direct-links-dots").forEach(dojo.destroy);
var _33=_32[0].previousSibling;
dojo.style(this.parentNode,"display","none");
for(var i=0;i<_32.length;i++){
if(_32._dots){
dojo.destroy(_32._dots);
}
dojo.destroy(_32[i]);
_32[i]=undefined;
}
this._controls[this.page]=[];
_32=this._controls[this.page];
var _34=this._getDirectLinkPageNumbers();
for(var i=0;i<_34.length;i++){
var _35=_34[i];
_32[i]=this._createLinkControl(this.page+"("+_35+")",_35,_33,"after",null,loc("page_title")+" "+_35);
dojo.addClass(_32[i],"pagination-direct-link");
if(_35==this.currentPage){
dojo.addClass(_32[i],"selected");
}
_33=_32[i];
_32[i]._pageNum=_35;
}
var _36=_32[0];
dojo.addClass(_36,"firstDirectLink");
if(_34[0]>1){
dojo.addClass(_36,"has-previous");
var _37=dojo.create("div",{innerHTML:"..."},_36,"before");
dojo.addClass(_37,"pagination-direct-links-dots");
}
var _38=_32[_32.length-1];
dojo.addClass(_38,"lastDirectLink");
if(_34[_34.length-1]<this.lastPage){
dojo.addClass(_38,"has-next");
var _37=dojo.create("div",{innerHTML:"..."},_38,"after");
dojo.addClass(_37,"pagination-direct-links-dots");
}
if(this.handlers.page){
this._connectDirectLinkHandlers(this.handlers.page);
}
dojo.style(this.parentNode,"display","");
},_connectDirectLinkHandlers:function(_39){
dojo.forEach(this.directLinksDisconnects,dojo.disconnect);
this.directLinksDisconnects=[];
var _3a=this._controls[this.page];
for(var i=0;i<_3a.length;i++){
var _3b=_3a[i];
var h=function(_3c){
dojo.stopEvent(_3c);
_39(this._pageNum);
};
h._pageNum=_3b._pageNum;
this.directLinksDisconnects.push(dojo.connect(_3b,"onclick",h));
}
},_setEnabled:function(_3d,_3e){
if(_3e){
this._connectSimpleHandler(_3d);
dojo.replaceClass(_3d,"enabled","disabled");
}else{
this._removeSimpleHandler(_3d);
dojo.replaceClass(_3d,"disabled","enabled");
}
}});
return _1;
});
