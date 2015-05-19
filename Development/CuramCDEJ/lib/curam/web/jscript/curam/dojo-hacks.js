//>>built
require({cache:{"url:curam/widget/templates/ScrollingTabController.html":"<div class=\"dijitTabListContainer-${tabPosition} tabStrip-disabled dijitLayoutContainer\">\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerMenuButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_menuBtn\"\r\n\t\t\tdata-dojo-props=\"containerId: '${containerId}', iconClass: 'dijitTabStripMenuIcon',\r\n\t\t\t\t\tdropDownPosition: ['below-alt', 'above-alt']\"\r\n\t\t\tdata-dojo-attach-point=\"_menuBtn\" showLabel=\"false\" title=\"\">&#9660;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_leftBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideLeftIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_leftBtn\" data-dojo-attach-event=\"onClick: doSlideLeft\">&#9664;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\r\n\t\t\tid=\"${id}_rightBtn\"\r\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideRightIcon', showLabel:false, title:''\"\r\n\t\t\tdata-dojo-attach-point=\"_rightBtn\" data-dojo-attach-event=\"onClick: doSlideRight\">&#9654;</div>\r\n\t<div class='dijitTabListWrapper dijitTabContainerTopNone dijitAlignClient' data-dojo-attach-point='tablistWrapper'>\r\n\t\t<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'\r\n\t\t\t\tdata-dojo-attach-point='containerNode' class='nowrapTabStrip dijitTabContainerTop-tabs'></div>\r\n\t</div>\r\n</div>\r\n\r\n"}});
define("curam/dojo-hacks",["curam/dojo-hacks-uim","dojo/_base/array","dojo/dom-geometry","dojo/_base/lang","dijit/layout/utils","dojo/dom-style","dijit/layout/ScrollingTabController","dijit/layout/TabController","dojo/text!curam/widget/templates/ScrollingTabController.html","curam/debug","curam/util/ResourceBundle"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
var _a=new curam.util.ResourceBundle("Debug");
dojo.extend(_7,{templateString:_9,_tabsWidth:-1,_tablistMenuItemIdSuffix:"_stcMi",onStartup:function(){
_8.prototype.onStartup.apply(this,arguments);
this._postStartup=true;
},resize:function(_b){
if(dojo.query("> *",this.containerNode).length<1){
if(this.domNode.style.height!="1px"){
dojo.style(this.domNode,"height","1px");
}
return;
}
if(!this.bustSizeCache&&this._dim&&_b&&this._dim.w==_b.w){
return;
}
this.bustSizeCache=false;
curam.debug.log(_a.getProperty("curam.dojo-hacks.msg"),this.domNode);
this.scrollNodeHeight=this.scrollNodeHeight||this.scrollNode.offsetHeight;
this._dim=_b;
this.scrollNode.style.height="auto";
var cb=this._contentBox=_5.marginBox2contentBox(this.domNode,{h:0,w:_b.w});
cb.h=this.scrollNodeHeight;
_3.setContentSize(this.domNode,cb);
var _c=this._enableBtn(this._contentBox.w);
this._buttons.style("display",_c?"":"none");
this._leftBtn.layoutAlign="left";
this._rightBtn.layoutAlign="right";
this._menuBtn.layoutAlign=this.isLeftToRight()?"right":"left";
var _d;
if(_c){
_d=dijit.layout.layoutChildren(this.domNode,this._contentBox,[this._menuBtn,this._leftBtn,this._rightBtn,{domNode:this.scrollNode,layoutAlign:"client",fakeWidget:true}]);
}else{
_d=dijit.layout.layoutChildren(this.domNode,this._contentBox,[{domNode:this.scrollNode,layoutAlign:"client",fakeWidget:true}]);
}
this.scrollNode._width=_d.client.w;
if(this._selectedTab){
if(this._anim&&this._anim.status()=="playing"){
this._anim.stop();
}
this.scrollNode.scrollLeft=this._convertToScrollLeft(this._getScrollForSelectedTab());
}
this._setButtonClass(this._getScroll());
this._postResize=true;
return {h:this._contentBox.h,w:_b.w};
},_initButtons:function(){
this._btnWidth=0;
this._buttons=dojo.query("> .tabStripButton",this.domNode).filter(function(_e){
if((this.useMenu&&_e==this._menuBtn.domNode)||(this.useSlider&&(_e==this._rightBtn.domNode||_e==this._leftBtn.domNode))){
this._btnWidth+=dojo.getMarginBoxSimple(_e).w;
return true;
}else{
_6.set(_e,"display","none");
return false;
}
},this);
this._menuBtn._curamOwnerController=this;
},onAddChild:function(_f,_10){
_8.prototype.onAddChild.apply(this,arguments);
var _11=_f.id;
this.bustSizeCache=true;
this._tabsWidth=-1;
_2.forEach(["label","iconClass"],function(_12){
this.pane2watches[_11].push(this.pane2button[_11].watch(_12,_4.hitch(this,function(){
if(this._postStartup&&this._dim){
this.resize(this._dim);
}
if(this._dim){
this.bustSizeCache=true;
this._tabsWidth=-1;
this.pane2button[_11].domNode._width=0;
}
})));
},this);
var _13=function(pid,_14){
var _15=null;
if(_14._menuBtn.dropDown){
var _16=dojo.query(pid+_14._tablistMenuItemIdSuffix,_14._menuBtn.dropDown.domNode)[0];
if(_16){
_15=dijit.byNode(_16);
}
}
return _15;
};
this.pane2button[_11].connect(this.pane2button[_11],"_setCuramVisibleAttr",dojo.hitch(this,function(){
var _17=_13(_11,this);
if(_17){
this._setCuramVisibility(_17,_11);
}
}));
this.pane2button[_11].connect(this.pane2button[_11],"_setCuramDisabledAttr",dojo.hitch(this,function(){
var _18=_13(_11,this);
if(_18){
this._setCuramAvailability(_18,_11);
}
}));
_6.set(this.containerNode,"width",(_6.get(this.containerNode,"width")+200)+"px");
},_setCuramVisibility:function(_19,_1a){
var _1b=this.pane2button[_1a].curamVisible;
if(_1b){
dojo.replaceClass(_19.domNode,"visible","hidden");
}else{
dojo.replaceClass(_19.domNode,"hidden","visible");
}
},_setCuramAvailability:function(_1c,_1d){
var _1e=!this.pane2button[_1d].curamDisabled;
_1c.disabled=!_1e;
if(_1e){
dojo.replaceClass(_1c.domNode,"enabled","disabled");
}else{
dojo.replaceClass(_1c.domNode,"disabled","enabled");
}
},_oldRemoveChild:_7.prototype.onRemoveChild,onRemoveChild:function(_1f,_20){
this._oldRemoveChild.apply(this,arguments);
this.bustSizeCache=true;
this._tabsWidth=-1;
},_getTabsWidth:function(){
if(this._tabsWidth>-1){
return this._tabsWidth;
}
var _21=this.getChildren();
if(_21.length){
var _22=_21[this.isLeftToRight()?_21.length-1:0].domNode;
var _23=this._getNodeWidth(_22);
this._tabsWidth=_22.offsetLeft+_23;
return this._tabsWidth;
}else{
return 0;
}
},onSelectChild:function(_24){
var tab=this.pane2button[_24.id];
if(!tab||!_24){
return;
}
var _25=tab.domNode;
if(_25!=this._selectedTab){
this._selectedTab=_25;
if(this._postResize){
var _26=this._getNodeWidth(this.scrollNode);
if(this._getTabsWidth()<_26){
tab.onClick(null);
}else{
var sl=this._getScroll();
if(sl>_25.offsetLeft||sl+_26<_25.offsetLeft+this._getNodeWidth(_25)){
this.createSmoothScroll().play();
}
}
}
}
_8.prototype.onSelectChild.apply(this,arguments);
},_getScrollBounds:function(){
var _27=this.getChildren(),_28=this._getNodeWidth(this.scrollNode),_29=this._getNodeWidth(this.containerNode),_2a=_29-_28,_2b=this._getTabsWidth();
if(_27.length&&_2b>_28){
return {min:this.isLeftToRight()?0:this._getNodeWidth(_27[_27.length-1].domNode),max:this.isLeftToRight()?_2b-_28:_2a};
}else{
var _2c=this.isLeftToRight()?0:_2a;
return {min:_2c,max:_2c};
}
},_getNodeWidth:function(_2d){
if(!_2d._width){
_2d._width=dojo.style(_2d,"width");
}
return _2d._width;
},destroyRendering:function(_2e){
_2.forEach(this._attachPoints,function(_2f){
delete this[_2f];
},this);
this._attachPoints=[];
_2.forEach(this._attachEvents,this.disconnect,this);
this.attachEvents=[];
},_oldDestroy:dijit.layout.ScrollingTabController.prototype.destroy,destroy:function(){
if(this._menuBtn){
this._menuBtn._curamOwnerController=null;
}
this._oldDestroy.apply(this,arguments);
}});
dojo.extend(dijit.layout._ScrollingTabControllerMenuButton,{_origLoadDropDown:dijit.layout._ScrollingTabControllerMenuButton.prototype.loadDropDown,loadDropDown:function(_30){
var _31=function(_32){
var _33=_32.id.split(this._curamOwnerController._tablistMenuItemIdSuffix)[0];
this._curamOwnerController._setCuramAvailability(_32,_33);
this._curamOwnerController._setCuramVisibility(_32,_33);
dojo.connect(_32,"destroy",function(){
_31=null;
});
};
var _34=dojo.hitch(this,function(){
dojo.forEach(this.dropDown.getChildren(),dojo.hitch(this,_31));
_30();
});
this._origLoadDropDown(_34);
}});
require(["dojo/_base/sniff","dojo/_base/window","dojo/on"],function(has,win,on){
if(has("ie")==8){
var _35=screen.deviceXDPI;
setInterval(function(){
if(screen.deviceXDPI!=_35){
_35=screen.deviceXDPI;
on.emit(win.global,"resize");
}
},250);
}
});
return {};
});
