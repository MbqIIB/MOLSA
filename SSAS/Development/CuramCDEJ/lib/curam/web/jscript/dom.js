function createElement(_1,_2,_3,_4){
var e=dojo.create(_1,_2);
if(_3){
for(key in _3){
e.style[key]=_3[key];
}
}
if(_4){
e.appendChild(document.createTextNode(_4));
}
return e;
};

