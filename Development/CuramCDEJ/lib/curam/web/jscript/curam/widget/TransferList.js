//>>built
define("curam/widget/TransferList",["dijit/_Widget","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
var _2=dojo.declare("curam.widget.TransferList",dijit._Widget,{btnNames:["allRight","toRight","toLeft","allLeft"],btnValues:[" "," "," "," "],bntClasses:["allRight","toRight","toLeft","allLeft"],rightEmptyText:"",widgetType:"TransferList",postCreate:function(){
var _3=this.domNode.parentNode;
dojo.addClass(_3,"transferlistparent");
var _4=cm.nextSibling(this.domNode);
this.leftList=this.domNode;
var _5=dojo.create("table",{"class":"transfer-list"});
var _6=dojo.create("tbody",{},_5);
var _7=dojo.create("tr",{},_6);
var _8=dojo.create("td");
var _9=dojo.create("td",{"class":"controls"});
var _a=this;
function _b(_c){
return function(){
_a.setSelection(_c);
return false;
};
};
function _d(id){
return function(){
dojo.addClass(dojo.byId(id),"active");
return false;
};
};
function _e(id){
return function(){
dojo.removeClass(dojo.byId(id),"active");
return false;
};
};
for(j=0;j<4;j++){
var _f=dojo.create("div",{},_9);
var _10=new Array(LOCALISED_TRANSFER_LIST_RA,LOCALISED_TRANSFER_LIST_R,LOCALISED_TRANSFER_LIST_L,LOCALISED_TRANSFER_LIST_LA);
var btn=dojo.create("input",{type:"button",id:this.btnNames[j]+this.domNode.name,value:this.btnValues[j],"class":this.bntClasses[j],"title":_10[j]},_f);
btn.listtwins=this;
dojo.connect(btn,"onclick",_b(btn.id));
dojo.connect(btn,"onmousedown",_d(btn.id));
dojo.connect(btn,"onmouseup",_e(btn.id));
dojo.connect(btn,"onmouseout",_e(btn.id));
}
var _11=document.createElement("td");
var _12=dojo.create("select",{id:this.domNode.name,name:this.domNode.name,multiple:"multiple","class":"selected",size:5},_11);
dojo.attr(this.domNode,{name:"__o3ign."+_12.name,id:"__o3ign."+_12.name,"class":"selected",size:5});
this.rightList=_12;
dojo.connect(this.leftList,"ondblclick",_b("toRight"));
dojo.connect(this.rightList,"ondblclick",_b("toLeft"));
function _13(_14){
return function(evt){
if(evt.keyCode==evt.KEY_ENTER){
_a.setSelection(_14);
}
return false;
};
};
dojo.connect(this.leftList,"onkeydown",_13("toRight"));
dojo.connect(this.rightList,"onkeydown",_13("toLeft"));
_8.appendChild(this.domNode);
_7.appendChild(_8);
_7.appendChild(_9);
_7.appendChild(_11);
if(_4){
_3.insertBefore(_5,_4);
}else{
_3.appendChild(_5);
}
this.setInitialSelection();
this.adjustEmpties(this.leftList,this.rightList);
var _15=cm.getParentByType(this.domNode,"form");
if(!_15){
curam.debug.log("curam.widget.TransferList "+_1.getProperty("curam.widget.TransferList.msg"));
return;
}
dojo.connect(_15,"onsubmit",function(){
var _16=_a.rightList;
var _17=new Array();
for(k1=0;k1<_16.options.length;k1++){
_17[_17.length]=_16.options[k1];
}
_16.options.length=0;
for(k2=0;k2<_17.length;k2++){
_17[k2].selected=true;
_16.appendChild(_17[k2]);
}
});
dojo.connect(window,"onresize",this.selectWidthSetting);
dojo.addOnLoad(this.selectWidthSetting);
},setSelection:function(id){
var _18=(id.indexOf("all")>-1);
var _19=(id.indexOf("Right")>-1)?this.leftList:this.rightList;
var _1a=(id.indexOf("Left")>-1)?this.leftList:this.rightList;
if(_19.options[0]!=null&&_19.options[0].text!=this.rightEmptyText){
if(_1a.options[0]!=null&&(_1a.options[0].text==this.rightEmptyText||_1a.options[0].text=="")){
_1a.options[0]=null;
}
this.transferOptions(_19,_1a,_18);
this.adjustEmpties(this.leftList,this.rightList);
}
},setInitialSelection:function(){
this.transferOptions(this.leftList,this.rightList,false);
},adjustEmpties:function(_1b,_1c){
if(_1c.options.length==0){
_1c.options[0]=new Option(this.rightEmptyText,"",false,false);
}
},transferOptions:function(_1d,_1e,_1f){
if(_1d&&_1e){
var _20=new Array();
dojo.forEach(_1d.options,function(opt){
if(_1f||opt.selected){
_20[_20.length]=opt;
}
});
this.appendAll(_1e,_20);
}
},appendAll:function(_21,_22){
for(var i=0;i<_22.length;i++){
_22[i].selected=true;
_21.appendChild(_22[i]);
}
},selectWidthSetting:function(){
if(dojo.query(".transfer-list select.selected")){
dojo.query(".transfer-list select.selected").forEach(function(_23){
var _24=_23.parentNode.clientWidth;
_23.style.width=_24+"px";
});
}
}});
return _2;
});
