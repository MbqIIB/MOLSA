//>>built
define("curam/layout/ScrollingTabController",["dijit/layout/ScrollingTabController","curam/debug"],function(_1){
var _2=dojo.declare("curam.layout.ScrollingTabController",_1,{onStartup:function(){
this.inherited(arguments);
this.updateTabStyle();
},updateTabStyle:function(){
var _3=this.getChildren();
curam.debug.log("curam.layout.ScrollingTabController.updateTabStyle kids = ",this.domNode);
dojo.forEach(_3,function(_4,_5,_6){
dojo.removeClass(_4.domNode,["first-class","last-class"]);
if(_5==0){
dojo.addClass(_4.domNode,"first");
}else{
if(_5==_6.length-1){
dojo.addClass(_4.domNode,"last");
}
}
});
var _7=dojo.query(".nowrapTabStrip",this.domNode)[0];
dojo.replaceClass(_7,"nowrapSecTabStrip","nowrapTabStrip");
var _8=document.createElement("div");
dojo.addClass(_8,"block-slope");
dojo.addClass(_8,"dijitTab");
_8.innerHTML="&#x200B;";
_7.appendChild(_8);
}});
return _2;
});
