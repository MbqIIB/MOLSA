//>>built
define("curam/wizard",["curam/define","curam/debug","curam/util/Dialog","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.wizard",{setupTargetFrameForModals:function(_2){
curam.debug.log("curam.wizard.setupTargetFrameForModals "+_1.getProperty("curam.wizard.called"));
curam.util.Dialog.init();
curam.util.Dialog.registerGetTitleFunc(function(){
return _2;
});
dojo.addOnLoad(function(){
curam.util.Dialog.pageLoadFinished();
});
}});
return curam.wizard;
});
