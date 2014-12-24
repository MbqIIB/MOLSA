//>>built
define("curam/layout/CuramTabContainer",["dijit/layout/TabContainer","curam/layout/ScrollingTabController"],function(_1){
var _2=dojo.declare("curam.layout.CuramTabContainer",_1,{postMixInProperties:function(){
if(!this.controllerWidget){
this.controllerWidget=(this.tabPosition=="top"||this.tabPosition=="bottom")&&!this.nested?"curam.layout.ScrollingTabController":"dijit.layout.TabController";
}
this.inherited(arguments);
}});
return _2;
});
