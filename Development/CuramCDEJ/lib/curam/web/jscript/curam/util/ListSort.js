//>>built
define("curam/util/ListSort",["curam/util","curam/debug","curam/define"],function(){
curam.define.singleton("curam.util.ListSort",{makeSortable:function(_1,_2,_3,_4){
dojo.addOnLoad(function(){
_1=dojo.byId(_1);
if(_1.tHead==null){
return;
}else{
if(_1.tHead.rows&&_1.tHead.rows.length>0){
var _5=_1.tHead.rows[0];
if(!_5){
return;
}
}
}
var _6=dojo.trim;
for(var i=0;i<_5.cells.length;i++){
var _7=_5.cells[i];
if(_7.id&&_7.childNodes[0]){
var _8=_7.childNodes[0];
if(_8.childNodes[0]&&_8.childNodes[0].nodeType==3){
var _9=_6(_8.childNodes[0].nodeValue);
if((_9.length>0)&&(_9!=" ")){
var _a=dojo.create("a",{href:"#"});
_a["table"]=_1;
_a["paginationId"]=_2;
_a.appendChild(document.createTextNode(_9));
curam.util.connect(_a,"onclick",curam.util.ListSort.sortTable);
var _b=dojo.create("span",{className:"hidden"},_a,"right");
_b.appendChild(document.createTextNode(_4));
dojo.empty(_8);
_8.appendChild(_a);
}
}
}
}
var _c=dojo.query(".hidden-table-header a");
for(var i=0;i<_c.length;i++){
var _d=_c[i];
_d.setAttribute("tabindex","-1");
_c.length-1;
}
_1._sortUp=true;
_1._isExpandableList=_3;
});
},sortTable:function(_e){
var _f;
if(typeof (_e.nodeType)!="undefined"){
_f=_e;
}else{
_f=_e.target;
dojo.stopEvent(_e);
}
window.dojo.publish("/curam/list/toBeSorted",[_f["paginationId"]]);
var th=_f.parentNode.parentNode;
var _10=th.cellIndex;
if(dojo.isIE&&curam.content&&curam.content.LIST_MENUS_ENABLED){
_10=0;
var _11=th.previousSibling;
while(_11){
if(_11.tagName=="TH"){
_10++;
}
_11=_11.previousSibling;
}
}
var _12=_f["table"];
var _13=_12._isExpandableList;
var _14=(_13?2:1);
var _15=_12.tBodies[0];
if(_15.rows.length<=_14){
return;
}
var _16=function(a,b){
aa=curam.util.ListSort.getSpanDataSort(a.cells[_10]);
if(isNaN(aa)){
aa=0;
}
bb=curam.util.ListSort.getSpanDataSort(b.cells[_10]);
if(isNaN(bb)){
bb=0;
}
return aa-bb;
};
var _17=[];
var _18=_15.rows.length-_14;
for(var j=0;j<_15.rows.length/_14;j++){
var _19=j*_14;
_17[j]=_15.rows[_19];
if(_13){
_17[j]._detailRow=_15.rows[_19+1];
}
if(dojo.style(_15.rows[_19],"display")!="none"&&dojo.style(_15.rows[_19],"visible")!="false"){
_18=_19;
}
}
_17.sort(_16);
if(!_12._sortUp){
_17.reverse();
}
_12._sortUp=!_12._sortUp;
var _1a=_15.firstChild;
for(var i=0;i<_17.length;i++){
var _1b=_17[i];
if(_13){
var _1c=_1b._detailRow;
_15.appendChild(_1b);
var _1d=cm.nextSibling(_1b,"tr");
if(_1d){
_15.insertBefore(_1c,_1d);
}else{
_15.appendChild(_1c);
}
_1a=cm.nextSibling(_1c,"tr");
}else{
_15.appendChild(_1b);
}
}
curam.util.stripeTable(_12,_13,_18);
window.dojo.publish("/curam/list/sorted",[_f["paginationId"]]);
},sortScrollableList:function(_1e,_1f){
dojo.stopEvent(_1e);
var idx=_1f.indexOf("_slh");
var _20=_1f.substring(0,idx);
var _21=dojo.byId(_20);
if(typeof (_21)=="undefined"){
return;
}
var _22=dojo.query("a",_21)[0];
curam.util.ListSort.sortTable(_22);
},getSpanDataSort:function(el){
var _23=el.getElementsByTagName("span");
curam.debug.log(el.getElementsByTagName("span"));
for(var i=0;i<_23.length;i++){
if(dojo.attr(_23[i],"data-curam-sort-order")!==""){
spanElement=_23[i];
}
}
curam.debug.log("getSpanDataSort ==="+dojo.attr(spanElement,"data-curam-sort-order"));
return spanElement?parseInt(dojo.attr(spanElement,"data-curam-sort-order"))||0:0;
}});
return curam.util.ListSort;
});
