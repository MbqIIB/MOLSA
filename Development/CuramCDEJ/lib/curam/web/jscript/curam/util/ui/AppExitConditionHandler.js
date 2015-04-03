//>>built
define("curam/util/ui/AppExitConditionHandler",[],function(){
var _1=dojo.declare("curam.util.ui.AppExitConditionHandler",null,{_handler:null,constructor:function(_2){
if(typeof _2!="function"){
throw new Error("Illegal argument: "+_2);
}
this._handler=_2;
},isConfirmationAllowed:function(){
return this._handler()?true:false;
}});
return _1;
});
