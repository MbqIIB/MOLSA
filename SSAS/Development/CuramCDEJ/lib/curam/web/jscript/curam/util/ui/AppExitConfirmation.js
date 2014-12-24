//>>built
define("curam/util/ui/AppExitConfirmation",["curam/define","dojo/_base/array","curam/util/ui/AppExitConditionHandler"],function(_1,_2){
_1.singleton("curam.util.ui.AppExitConfirmation",{_exitConditionHandlers:[],_lastClickedToken:null,_lastClicked:null,_confirmationHandler:function(){
var _3=" ";
e.returnValue=_3;
return _3;
},install:function(){
curam.util.ui.AppExitConfirmation._lastClickedToken=dojo.connect(dojo.global,"onclick",null,function(e){
e=e||window.event;
curam.util.ui.AppExitConfirmation._lastClicked=e.target;
});
curam.util.ui.AppExitConfirmation.registerExitConditionHandler(new curam.util.ui.AppExitConditionHandler(function(){
var _4=curam.util.ui.AppExitConfirmation._lastClicked;
var _5=_4&&_4.href&&_4.href.substring(0,7)==="mailto:";
curam.util.ui.AppExitConfirmation._lastClicked=null;
return _5?false:true;
}));
return dojo.connect(dojo.global,"onbeforeunload",null,function(e){
var _6=curam.util.ui.AppExitConfirmation._exitConditionHandlers;
var _7=_2.every(_6,function(eh){
return eh.isConfirmationAllowed();
});
if(_7){
return curam.util.ui.AppExitConfirmation._confirmationHandler("Number of condition handlers consulted: "+_6.length);
}
});
},_setTestHandler:function(_8){
curam.util.ui.AppExitConfirmation._confirmationHandler=_8;
},uninstall:function(_9){
dojo.disconnect(_9);
dojo.disconnect(curam.util.ui.AppExitConfirmation._lastClickedToken);
curam.util.ui.AppExitConfirmation._lastClicked=null;
curam.util.ui.AppExitConfirmation._exitConditionHandlers=[];
},registerExitConditionHandler:function(_a){
curam.util.ui.AppExitConfirmation._exitConditionHandlers.push(_a);
}});
return curam.util.ui.AppExitConfirmation;
});
