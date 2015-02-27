//>>built
define("curam/ui/PageRequest",["curam/debug","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
var _2=dojo.declare("curam.ui.PageRequest",null,{forceLoad:false,justRefresh:false,constructor:function(_3,_4,_5){
this.parameters={};
this.cdejParameters={};
this.cdejParameters["o3ctx"]="4096";
if(_4){
this.isHomePage=true;
}else{
this.isHomePage=false;
}
if(_5){
this.openInCurrentTab=true;
}else{
this.openInCurrentTab=false;
}
this.pageHolder=null;
var _6;
if(dojo.isString(_3)){
_6=_3;
curam.debug.log("PAGE REQUEST: "+_1.getProperty("curam.ui.PageRequest.url")+" "+_6);
}else{
curam.debug.log("PAGE REQUEST: "+_1.getProperty("curam.ui.PageRequest.descriptor")+" "+_3.toJson());
var tc=_3.tabContent;
_6=tc.pageID+"Page.do";
var _7=true;
for(param in tc.parameters){
if(_7){
_6+="?";
_7=false;
}else{
_6+="&";
}
_6+=param+"="+encodeURIComponent(tc.parameters[param]);
}
curam.debug.log("PAGE REQUEST: "+_1.getProperty("curam.ui.PageRequest.derived")+" "+_6);
}
var _8=_6.split("?");
this.parseUIMPageID(_8[0]);
if(_8.length==2){
this.parseParameters(_8[1]);
}
},parseUIMPageID:function(_9){
var _a=_9.split("/");
var _b=_a[_a.length-1];
this.pageID=_b.replace("Page.do","");
},parseParameterName:function(_c){
if(_c.charAt(0)=="a"&&_c.charAt(1)=="m"&&_c.charAt(2)=="p"&&_c.charAt(3)==";"){
return _c.substring(4,_c.length);
}else{
return _c;
}
},parseParameters:function(_d){
var _e=_d.split("&");
for(var i=0;i<_e.length;i++){
var _f=_e[i].split("=");
var _10=this.parseParameterName(_f[0]);
if(_10.length>0){
if(!this.isCDEJParam(_10)){
this.parameters[_10]=decodeURIComponent(_f[1].replace(/\+/g," "));
}else{
if(_10!="o3nocache"){
this.cdejParameters[_10]=decodeURIComponent(_f[1].replace(/\+/g," "));
}
}
}
}
},isCDEJParam:function(_11){
return (_11.charAt(0)=="o"&&_11.charAt(1)=="3")||(_11.charAt(0)=="_"&&_11.charAt(1)=="_"&&_11.charAt(2)=="o"&&_11.charAt(3)=="3");
},getQueryString:function(_12){
var _13="";
var _14;
for(_14 in this.parameters){
_13+=_14+"="+encodeURIComponent(this.parameters[_14])+"&";
}
if(!_12==true||_12==false){
for(_14 in this.cdejParameters){
_13+=_14+"="+encodeURIComponent(this.cdejParameters[_14])+"&";
}
}
_13=_13.substring(0,_13.length-1);
this.queryString=_13;
return this.queryString;
},getURL:function(_15){
var _16=this.pageID+"Page.do";
var qs=this.getQueryString(_15);
if(qs!=""){
_16+="?"+qs;
}
this.url=_16;
return this.url;
}});
return _2;
});
