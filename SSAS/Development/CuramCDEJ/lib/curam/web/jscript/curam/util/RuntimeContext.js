//>>built
define("curam/util/RuntimeContext",[],function(){
var _1=dojo.declare("curam.util.RuntimeContext",null,{_window:null,constructor:function(_2){
this._window=_2;
},getHref:function(){
return this._window.location.href;
},getPathName:function(){
return this._window.location.pathName;
},contextObject:function(){
return this._window;
}});
return _1;
});
