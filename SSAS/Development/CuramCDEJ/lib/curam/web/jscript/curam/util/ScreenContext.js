//>>built
define("curam/util/ScreenContext",[],function(){
var _1={DEFAULT_CONTEXT:112,SAMPLE22:2,SAMPLE21:1,SAMPLE13:4,SAMPLE12:2,SAMPLE11:1,EXTAPP:1048576,CONTEXT_PORTLET:524288,SMART_PANEL:262144,NESTED_UIM:131072,ORG_TREE:65536,CONTEXT_PANEL:32768,LIST_ROW_INLINE_PAGE:8192,LIST_EVEN_ROW:16384,TAB:4096,TREE:2048,AGENDA:1024,POPUP:512,MODAL:256,HOME:128,HEADER:64,NAVIGATOR:32,FOOTER:16,OVAL:8,RESOLVE:4,ACTION:2,ERROR:1,EMPTY:0};
var _2=[["ERROR","ACTION","RESOLVE","OPT_VALIDATION","FOOTER","NAVIGATOR","HEADER","HOME_PAGE","MODAL","POPUP","AGENDA","TREE","TAB","LIST_EVEN_ROW","LIST_ROW_INLINE_PAGE","CONTEXT_PANEL","ORG_TREE","NESTED_UIM","SMART_PANEL","CONTEXT_PORTLET","EXTAPP"],["SAMPLE11","SAMPLE12","SAMPLE13"],["SAMPLE21","SAMPLE22"]];
var _3=dojo.declare("curam.util.ScreenContext",null,{constructor:function(_4){
if(_4){
this.setContext(_4);
}else{
this.currentContext=[_1["DEFAULT_CONTEXT"]|_1["DEFAULT_CONTEXT"]];
}
},setContext:function(_5){
var _6=this.setup(_5);
this.currentContext=((_6==null)?([_1["DEFAULT_CONTEXT"]|_1["DEFAULT_CONTEXT"]]):(_6));
},addContextBits:function(_7,_8){
if(!_7){
return;
}
var _9=(_8)?_8:0;
var _a=this.parseContext(_7);
if(_a!=null){
this.currentContext[_9]|=_a;
}
return this.currentContext[_9];
},addAll:function(_b){
var _c=(_b)?_b:0;
this.currentContext[_c]=4294967295;
return this.currentContext[_c];
},clear:function(_d,_e){
if(!_d){
this.clearAll();
return;
}
var _f=(_e)?_e:0;
if(_d==0){
return this.currentContext[_f];
}
var _10=this.parseContext(_d);
if(_10!=null){
var _11=this.currentContext[_f]&_10;
this.currentContext[_f]^=_11;
}
return this.currentContext[_f];
},clearAll:function(idx){
if(idx){
this.currentContext[idx]=0;
}else{
for(var i=0;i<this.currentContext.length;i++){
this.currentContext[i]=0;
}
}
},updateStates:function(_12){
this.clear("ERROR|ACTION|RESOLVE");
this.currentContext[0]=this.currentContext[0]|(_12&7);
},hasContextBits:function(_13,idx){
if(!_13){
return false;
}
var _14=(idx)?idx:0;
var _15=this.parseContext(_13);
if(_15!=null){
var _16=this.currentContext[_14]&_15;
return (_16==_15);
}
return false;
},getValue:function(){
var _17="";
for(var i=0;i<this.currentContext.length;i++){
_17+=this.currentContext[i]+"|";
}
return _17.substring(0,_17.length-1);
},toRequestString:function(){
return "o3ctx="+this.getValue();
},toBinary:function(){
var _18="";
for(var i=0;i<this.currentContext.length;i++){
_18+=this.currentContext[i].toString(2)+"|";
}
return _18.substring(0,_18.length-1);
},toString:function(){
var _19="";
for(var i=0;i<this.currentContext.length;i++){
var _1a="";
var j=0;
while(j<_2[i].length){
if(((this.currentContext[i]>>j)&1)!=0){
_1a+=","+_2[i][j];
}
j++;
}
if(_1a==""){
return "{}";
}
_19+="|"+_1a.replace(",","{")+((_1a.length==0)?"":"}");
}
return _19.substring(1);
},parseContext:function(_1b){
var _1c=_1b.replace(/,/g,"|");
var _1d=_1c.split("|");
var tmp=isNaN(_1d[0])?parseInt(_1[_1d[0]]):_1d[0];
for(var i=1;i<_1d.length;i++){
tmp=tmp|(isNaN(_1d[i])?parseInt(_1[_1d[i]]):_1d[i]);
}
return (isNaN(tmp)?null:tmp);
},setup:function(_1e){
if(!_1e){
return null;
}
var _1f=(""+_1e).split("|");
var _20=new Array(_1f.length);
for(var i=0;i<_1f.length;i++){
_20[i]=this.parseContext(_1f[_1f.length-i-1]);
_20[i]=_20[i]|_20[i];
if(!_20[i]||isNaN(_20[i])||_20[i]>4294967295){
return null;
}
}
return _20;
}});
return _3;
});
