//>>built
define("curam/ui/OpenTabEvent",["curam/ui/PageRequest"],function(_1){
var _2=dojo.declare("curam.ui.OpenTabEvent",null,{constructor:function(_3,_4,_5){
this.tabDescriptor=_3;
this.openInBackground=_5?true:false;
if(_4){
this.uimPageRequest=_4;
}else{
this.uimPageRequest=new _1(_3,_3.isHomePage);
}
}});
return _2;
});
