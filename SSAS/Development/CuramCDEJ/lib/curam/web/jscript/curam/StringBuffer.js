//>>built
define("curam/StringBuffer",[],function(){
var _1=dojo.declare("curam.StringBuffer",null,{constructor:function(){
this.buffer=[];
},append:function append(_2){
this.buffer.push(_2);
return this;
},toString:function toString(){
return this.buffer.join("");
}});
return _1;
});
