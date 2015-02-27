//>>built
define("curam/util/BitSet",[],function(){
var _1=dojo.declare("curam.util.BitSet",null,{_idCounter:0,constructor:function(){
this.value=[];
this.max=-1;
this.log2=Math.log(2);
this.id=++curam.util.BitSet.prototype._idCounter;
},set:function(_2){
this.max=Math.max(this.max,_2);
var _3=this._getPos(_2,true);
var _4=this.value[_3];
this.value[_3]=this.value[_3]|this._pow(_2);
return _4!=this.value[_3];
},unSet:function(_5){
this.max=Math.max(this.max,_5);
var _6=this._getPos(_5,false);
if(_6<0){
return;
}
var _7=this.value[_6];
this.value[_6]=this.value[_6]&(~this._pow(_5));
if(this.value[_6]==0&&_6==this.value.length-1){
this.value.splice(_6,1);
return true;
}
return _7!=this.value[_6];
},isSet:function(_8){
var _9=this._getPos(_8,false);
return _9>-1&&((this._pow(_8)&this.value[_9])>0);
},isClear:function(){
for(var _a=0;_a<this.value.length;_a++){
if(this.value[_a]>0){
return false;
}
}
return true;
},isSingleSet:function(){
var _b;
var _c=false;
for(var _d=0;_d<this.value.length;_d++){
if(this.value[_d]==0){
continue;
}
_b=Math.log(this.value[_d])/this.log2;
if(_b==Math.floor(_b)&&!_c){
_c=true;
}else{
return false;
}
}
return _c;
},equals:function(_e){
if(!_e||this.value.length!=_e.value.length){
return false;
}
var _f=Math.max(this.value.length,_e.value.length);
for(var _10=0;_10<_f;_10++){
if(_e.value[_10]!=this.value[_10]){
return false;
}
}
return true;
},_getPos:function(_11,_12){
var pos=Math.floor(Number(_11)/31);
while(_12&&this.value.length<=pos){
this.value[this.value.length]=0;
}
return (this.value.length<=pos?-1:pos);
},_pow:function(_13){
return Math.pow(2,Number(_13)%31);
}});
return _1;
});
