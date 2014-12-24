//>>built
define("curam/pagination",["curam/define","dojo/parser","curam/pagination/ControlPanel","curam/pagination/StateController","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.pagination",{defaultPageSize:15,threshold:15,listModels:{},ROW_COUNT_CLASS_NAME:"numRows-",ESC_SCRIPT_START:"<!--@pg@",ESC_SCRIPT_END:"@pg@-->",localizedStrings:{firstPage_btn:"|<",firstPage_title:"$not-localized$ First page",prevPage_btn:"<",prevPage_title:"$not-localized$ Previous page",nextPage_btn:">",nextPage_title:"$not-localized$ Next page",lastPage_btn:">|",lastPage_title:"$not-localized$ Last page",pageSize_title:"$not-localized$ Page size",pagination_info:"$not-localized$ Displaying rows %s to %s out of %s",page_title:"Go to page"},addPagination:function(_2,_3){
var _4=_2.getRowCount();
if(_4<=curam.pagination.threshold){
_2.showRange(1,_4);
return;
}
var _5=_2.getId();
curam.debug.log("curam.pagination.addPagination: listId: ",_5);
if(curam.pagination.listModels[_5]){
throw "Pagination on this list has already been initialized: "+_5;
}
curam.pagination.listModels[_5]=_2;
curam.debug.log("curam.pagination.listModels : ",curam.pagination.listModels);
var _6=new curam.pagination.ControlPanel(_3);
var _7=new curam.pagination.StateController(_2,_6);
_2._controller=_7;
dojo.subscribe("/curam/list/toBeSorted",this,function(_8){
curam.debug.log(_1.getProperty("curam.omega3-util.received")+" /curam/list/toBeSorted "+_1.getProperty("curam.omega3-util.for")+":",_8);
curam.pagination.unpackAll(curam.pagination.listModels[_8]);
});
dojo.subscribe("/curam/list/sorted",this,function(_9){
curam.debug.log(_1.getProperty("curam.omega3-util.received")+" /curam/list/sorted "+_1.getProperty("curam.omega3-util.for")+":",_9);
curam.pagination.paginatedListSorted(curam.pagination.listModels[_9]);
});
_7.gotoFirst();
},paginatedListSorted:function(_a){
_a._controller.reset();
},unpackRows:function(_b){
var _c=_b.innerHTML;
var _d=dojo.hasClass(_b,"has-row-actions");
if(_d){
_c=_c.replace(new RegExp(curam.pagination.ESC_SCRIPT_START,"g"),"<script type=\"text/javascript\">");
_c=_c.replace(new RegExp(curam.pagination.ESC_SCRIPT_END,"g"),"</script>");
}
var _e=dojo._toDom(_c);
if(_d){
dojo.query("script",_e).forEach(function(s){
eval(s.innerHTML);
});
dojo.parser.parse(_e);
}
dojo.place(_e,_b,"replace");
},unpackAll:function(_f){
_f._controller.gotoLast();
},readListContent:function(_10){
return dojo.query("tbody > *",_10).filter(function(n){
return typeof (n.tagName)!="undefined"&&(n.tagName=="TR"||(n.tagName=="SCRIPT"&&dojo.attr(n,"type")=="list-row-container"));
});
},getNumRowsInBlock:function(_11){
var _12=dojo.filter(_11.className.split(" "),function(cn){
return cn.indexOf(curam.pagination.ROW_COUNT_CLASS_NAME)==0;
});
return parseInt(_12[0].split(curam.pagination.ROW_COUNT_CLASS_NAME)[1]);
}});
return curam.pagination;
});
