//>>built
define("curam/ui/SectionShortcutsPanel",["curam/define","curam/tab","curam/util","curam/ui/UIController"],function(){
var _1=curam.define.singleton("curam.ui.SectionShortcutsPanel",{handleClickOnAnchorElement:function(_2,_3){
if(!_3){
curam.tab.getTabController().handleUIMPageID(_2);
}else{
curam.ui.SectionShortcutsPanel.openInModal(_2);
}
},handleClick:function(_4,_5){
var _6=eval(_4+"JsonStore");
var _7=_6.getValue(_5,"pageID");
var _8=_6.getValue(_5,"openInModal");
if(!_8){
curam.tab.getTabController().handleUIMPageID(_7);
}else{
curam.ui.SectionShortcutsPanel.openInModal(_7);
}
},openInModal:function(_9){
var _a=_9+"Page.do";
var _b={};
curam.tab.getTabController().handleLinkClick(_a,_b);
},setupCleanupScript:function(_c){
dojo.ready(function(){
var _d=eval(_c+"JsonStore");
dojo.addOnWindowUnload(function(){
_d.close();
});
});
}});
return _1;
});
