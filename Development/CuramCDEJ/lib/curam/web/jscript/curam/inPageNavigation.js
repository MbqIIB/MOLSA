//>>built
define("curam/inPageNavigation",["curam/tab","curam/ui/PageRequest","curam/debug","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
var _2=dojo.declare("curam.inPageNavigation",null,{title:"",href:"",selected:false,constructor:function(_3){
this.title=_3.title;
this.href=_3.href;
this.selected=_3.selected;
curam.debug.log("curam.inPageNavigation "+_1.getProperty("curam.inPageNavigation.msg")+this);
},getLinks:function(){
var _4=dojo.query(".in-page-navigation-tabs")[0];
var _5=dojo.query("li",_4);
var _6=new Array();
dojo.forEach(_5,function(_7){
var _8=dojo.query("a",_7)[0];
if(!_8){
return;
}
var _9=_8.innerText||_8.textContent;
var _a=false;
dojo.filter(dojo.attr(_8,"class").split(" "),function(_b){
if(_b=="in-page-current-link"){
_a=true;
return;
}
});
var _c=dojo.attr(_8,"href");
var _d=new curam.inPageNavigation({"title":_9,"selected":_a,"href":_c});
_6.push(_d);
});
return _6;
},processMainContentAreaLinks:function(){
dojo.addOnLoad(function(){
var _e=dojo.query(".ipn-page")[0];
if(_e){
var _f=dijit.byId(dojo.attr(_e,"id"));
var _10=_f.getChildren()[0];
_f.removeChild(_10);
if(_f.getChildren().length==0){
return;
}
var _11=dojo.query(".in-page-nav-contentWrapper")[0];
var _12=dojo.query("> *",_11);
var _13=_12[_12.length-1];
var pos=dojo.position(_13);
var _14=pos.y;
var _15="height: "+_14+"px;";
dojo.attr(_11,"style",_15);
dojo.connect(_f,"_transition",function(_16,_17){
var _18=dojo.query(".in-page-link",_16.id)[0];
var _19=new curam.ui.PageRequest(_18.href);
if(jsScreenContext.hasContextBits("LIST_ROW_INLINE_PAGE")){
_19.pageHolder=window;
}
curam.tab.getTabController().handlePageRequest(_19);
});
dojo.style(_e,"visibility","visible");
}
});
}});
return _2;
});
