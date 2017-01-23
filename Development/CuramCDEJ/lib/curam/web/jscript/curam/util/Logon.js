//>>built
define("curam/util/Logon",["dijit","dojo","dojox"],function(_1,_2,_3){
if(typeof curam!="object"){
curam={};
}
if(typeof curam.util!="object"){
curam.util={};
}
curam.util.Logon={ensureFullPageLogon:function(){
var w=window;
while(w.parent&&w.parent!=w){
w=w.parent;
}
if(w&&w!=window){
w.location.reload(true);
}
}};
});
