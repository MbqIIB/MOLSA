//>>built
require({cache:{"url:curam/layout/resources/TabContainer.html":"<div class=\"dijitTabContainer\">\r\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\r\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer dijitAlignTop\"></div>\r\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container dijitAlignClient\" data-dojo-attach-point=\"containerNode\"></div>\r\n</div>\r\n"}});
define("curam/layout/TabContainer",["dijit/layout/TabContainer","dojo/text!curam/layout/resources/TabContainer.html"],function(_1,_2){
var _3=dojo.declare("curam.layout.TabContainer",_1,{templateString:_2,_theSelectedTabIndex:0,_thePage:null,_theChildren:null,postCreate:function(){
this.inherited(arguments);
var tl=this.tablist;
this.connect(tl,"onRemoveChild","_changeTab");
},_changeTab:function(){
if(this._beingDestroyed){
this._thePage=null;
this._theChildren=null;
return;
}
if(this._theChildren==null){
return;
}
if(this._theChildren[this._theSelectedTabIndex]!=this._thePage){
this.selectChild(this._theChildren[this._theSelectedTabIndex]);
this._thePage=null;
this._theChildren=null;
return;
}
if(this._theChildren.length<1){
this._thePage=null;
return;
}else{
if(this._theChildren.length==1){
this.selectChild(this._theChildren[this._theChildren.length-1]);
this._thePage=null;
this._theChildren=null;
}else{
if(this._theSelectedTabIndex==(this._theChildren.length-1)){
this.selectChild(this._theChildren[this._theChildren.length-2]);
}else{
if(this._theSelectedTabIndex==0){
this.selectChild(this._theChildren[1]);
}else{
if(this._theChildren.length>2){
this.selectChild(this._theChildren[this._theSelectedTabIndex+1]);
}
}
}
this._thePage=null;
this._theChildren=null;
}
}
},removeChild:function(_4){
if(this._started&&!this._beingDestroyed){
var _5=this.getChildren();
var i=0;
var _6=0;
for(i=0;i<_5.length;i++){
if(_5[i].get("selected")){
_6=i;
break;
}
}
this._theSelectedTabIndex=_6;
this._thePage=_4;
this._theChildren=_5;
}
this.inherited(arguments);
}});
return _3;
});
