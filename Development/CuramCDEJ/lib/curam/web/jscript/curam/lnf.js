//>>built
define("curam/lnf",["curam/define"],function(){
curam.define.singleton("curam.lnf",{setCTParent:function(id){
var _1=dojo.byId(id);
var _2=_1.parentNode;
if(_2.tagName=="TD"){
dojo.addClass(_2,"codetable");
}
}});
return curam.lnf;
});
