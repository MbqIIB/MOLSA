//>>built
define("curam/ListMap",[],function(){
var _1=dojo.declare("curam.ListMap",null,{constructor:function(){
this.keys=new Array();
this.objects=new Array();
this.count=this.keys.length;
},add:function(_2,_3){
if(this.getIndexByKey(_2)>=0){
this.set(_2,_3);
}else{
this.keys.push(_2);
this.count++;
this.objects[_2]=_3;
}
},set:function(_4,_5){
var _6=this.getIndexByKey(_4);
this.keys[_6]=_4;
this.objects[_4]=_5;
},getObjectByIndex:function(_7){
return this.objects[this.keys[_7]];
},getKeyByIndex:function(_8){
return this.keys[_8];
},getObjectByKey:function(_9){
if(this.getIndexByKey(_9)!=-1){
return this.objects[_9];
}
},getIndexByKey:function(_a){
return this.indexOf(_a);
},removeByKey:function(_b){
var _c=this.getIndexByKey(_b);
if(_c>=0&&_c<this.count){
this.count--;
this.keys.splice(_c,1);
this.objects[_b]=null;
}
},removeAtIndex:function(_d){
if(_d>=0&&_d<this.count){
this.count--;
this.keys.splice(_d,1);
}
},indexOf:function(_e){
for(var i=0;i<this.count;i++){
if(this.keys[i]==_e){
return i;
}
}
}});
return _1;
});
