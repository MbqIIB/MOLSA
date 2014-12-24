//>>built
define("curam/util/ui/refresh/RefreshEvent",[],function(){
var _1=dojo.declare("curam.util.ui.refresh.RefreshEvent",null,{TYPE_ONLOAD:"onload",TYPE_ONSUBMIT:"onsubmit",SOURCE_CONTEXT_MAIN:"main-content",SOURCE_CONTEXT_DIALOG:"dialog",SOURCE_CONTEXT_INLINE:"inline",_type:null,_context:null,constructor:function(_2,_3){
if(!_2||!_3){
throw "Required parameters missing.";
}
if(!(_2==this.TYPE_ONLOAD||_2==this.TYPE_ONSUBMIT)){
throw "Unknown type: "+_2;
}
if(!(_3==this.SOURCE_CONTEXT_DIALOG||_3==this.SOURCE_CONTEXT_INLINE||_3==this.SOURCE_CONTEXT_MAIN)){
throw "Unknown context: "+_3;
}
this._type=_2;
this._context=_3;
},equals:function(_4){
if(typeof _4!="object"){
return false;
}
if(_4.declaredClass!=this.declaredClass){
return false;
}
return this._type===_4._type&&this._context===_4._context;
}});
return _1;
});
