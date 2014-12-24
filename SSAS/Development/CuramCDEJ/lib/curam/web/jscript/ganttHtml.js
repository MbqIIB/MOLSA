var Gantt={tree:null,actualDisplayed:false,expectedDisplayed:false};
function addSynchScroll(){
var _1=dojo.byId("left-data");
var _2=dojo.byId("right-data");
var _3=dojo.byId("right-header");
_2._sync=function(){
_1.scrollTop=_2.scrollTop;
_3.scrollLeft=_2.scrollLeft;
};
_2.onscroll=_2._sync;
};
function resizeHandle(e){
if(Gantt.timer){
clearTimeout(Gantt.timer);
}
Gantt.timer=setTimeout(function(){
initGantt(false);
},200);
};
function initGantt(_4){
if(window.parent&&window.parent!=window&&window.parent.isModalWrapper){
return;
}
var _5=dojo.byId("gantt-data");
if(_5==null){
return;
}
var _6=dojo.byId("left-data");
var _7=dojo.byId("right-data");
var _8=dojo.byId("left-header");
var _9=dojo.byId("right-header");
var _a=_5.offsetWidth-244;
_6.style.width=230+"px";
_7.style.width=_a+"px";
_8.style.width=230+"px";
_9.style.width=_a+"px";
_5.style.height=(document.body.offsetHeight-heightOffset)*chartHeight/100+"px";
_6.style.height=_5.offsetHeight-1+"px";
_7.style.height=_5.offsetHeight-1+"px";
Gantt.tree=document.getElementById("xmlDataIsland");
Gantt.actualDisplayed=true;
Gantt.expectedDisplayed=true;
addSynchScroll();
dojo.connect(window,"onresize",resizeHandle);
if(_4){
scrollTo(initialScrollPos);
}
ganttSlider.placeSlider();
ganttSlider.DoResize();
};
function toggle(_b,_c){
if(_c.src.indexOf("expand.gif")>-1){
_c.src=_c.src.replace("expand.gif","collapse.gif");
}else{
_c.src=_c.src.replace("collapse.gif","expand.gif");
}
walkTree(Gantt.tree,_b);
};
function walkTree(_d,_e){
if(_d.getAttribute("id")==_e){
var _f=_d.getAttribute("open");
if(_f=="true"){
_d.setAttribute("open","false");
}else{
_d.setAttribute("open","true");
}
propagateChange(_d,_d.getAttribute("open"));
}else{
if(_d.hasChildNodes){
for(var i=0;i<_d.childNodes.length;i++){
walkTree(_d.childNodes[i],_e);
}
}
}
};
function propagateChange(_10,_11){
var _12;
if(_10.hasChildNodes){
for(var i=0;i<_10.childNodes.length;i++){
_12=_10.childNodes[i].getAttribute("id");
if(_11=="false"){
dojo.style(_12+"a","display","none");
dojo.style(_12+"b","display","none");
if(dojo.byId(_12+"c")){
dojo.style(_12+"c","display","none");
}
propagateChange(_10.childNodes[i],"false");
}else{
dojo.style(_12+"a","display","");
dojo.style(_12+"b","display","");
if(dojo.byId(_12+"c")){
dojo.style(_12+"c","display","");
}
propagateChange(_10.childNodes[i],_10.childNodes[i].getAttribute("open"));
}
}
}
};
function showAll(_13){
var i;
var _14;
var _15;
var _16;
var _17=_13.getAttribute("id");
var _18=_13.getAttribute("open");
if(_18!==null){
_14=dojo.byId(_17+"a");
if(_14.hasChildNodes){
for(i=0;i<_14.childNodes.length;i++){
_16=_14.childNodes[i].nodeName;
if((_16=="img")||(_16=="IMG")){
_15=_14.childNodes[i];
_15.src=_15.src.replace("expand.gif","collapse.gif");
}
}
}
dojo.style(_14,"display","");
dojo.style(_17+"b","display","");
dojo.style(_17+"c","display","");
_13.setAttribute("open","true");
}
dojo.forEach(_13.childNodes,showAll,true);
};
function showActual(){
var _19=dojo.byId("right-data");
var _1a=dojo.query("img.actual",_19);
if(Gantt.actualDisplayed){
dojo.forEach(_1a,cm.hide,true);
Gantt.actualDisplayed=false;
}else{
dojo.forEach(_1a,cm.show,true);
Gantt.actualDisplayed=true;
}
};
function showExpected(){
var _1b=dojo.byId("right-data");
var _1c=dojo.query("img.expected",_1b);
if(Gantt.expectedDisplayed){
dojo.forEach(_1c,cm.hide,true);
Gantt.expectedDisplayed=false;
}else{
dojo.forEach(_1c,cm.show,true);
Gantt.expectedDisplayed=true;
}
};
function scrollTo(x){
var _1d=dojo.byId("right-data");
var _1e=dojo.byId("right-header");
if(x<-100){
_1d.scrollLeft=_1d.scrollWidth;
_1e.scrollLeft=_1e.scrollWidth;
}else{
_1d.scrollLeft=x;
_1e.scrollLeft=x;
}
};
function Slider(_1f){
this.leftValue=0;
this.rightValue=1;
this.defaultValue=0;
this.offsetX=1;
this.offsetY=1;
this.maxSlide=100;
this.buttonWidth=6;
this.buttonHeight=28;
this.buttonImg="bar.gif";
this.buttonHiliteImg="bar_selected.gif";
this.buttonHoverImg=null;
this.imgPath="";
this.orientation="h";
this.writeSlider=Slider.writeSlider;
this.placeSlider=Slider.placeSlider;
this.makeEventHandler=Slider.makeEventHandler;
this.isPrototype=Slider.isPrototype;
this.getValue=Slider.getValue;
this.setValue=Slider.setValue;
this.MouseOver=Slider.MouseOver;
this.MouseOut=Slider.MouseOut;
this.MouseDown=Slider.MouseDown;
this.MouseUp=Slider.MouseUp;
this.MouseSlide=Slider.MouseSlide;
this.DoResize=Slider.DoResize;
this.onmouseover=null;
this.onmouseout=null;
this.onmousedown=null;
this.onmouseup=null;
this.onslide=null;
this.onchange=null;
this.onclick=null;
if(!window.sliders){
window.sliders=new Array();
}
this.name=_1f||"slider"+window.sliders.length;
window.sliders[window.sliders.length]=this;
window.sliders[this.name]=this;
if(!window.sliderDrag){
window.sliderDrag=new Object();
}
};
Slider.writeSlider=function(){
var _20=this.prototype||this;
if(!_20.loImg){
_20.loImg=new Image(_20.buttonWidth,_20.buttonHeight);
_20.loImg.src=_20.imgPath+_20.buttonImg;
if(_20.buttonHiliteImg){
_20.hiImg=new Image(_20.buttonWidth,_20.buttonHeight);
_20.hiImg.src=_20.imgPath+(_20.buttonHiliteImg||_20.buttonImg);
}
if(_20.buttonHoverImg){
_20.hoImg=new Image(_20.buttonWidth,_20.buttonHeight);
_20.hoImg.src=_20.imgPath+_20.buttonHoverImg;
}
}
if(_20!=this){
this.loImg=_20.loImg;
if(_20.hiImg){
this.hiImg=_20.hiImg;
}
if(_20.hoImg){
this.hoImg=_20.hoImg;
}
this.orientation=_20.orientation;
this.maxSlide=_20.maxSlide;
}
this.button=dojo.byId("slider-div");
this.button.img=dojo.byId("slider-image");
this.button.style.width=_20.buttonWidth+"px";
this.button.style.height=_20.buttonHeight+"px";
if(this.button.addEventListener){
this.button.addEventListener("mousedown",this.MouseDown,false);
this.button.addEventListener("mouseout",this.MouseOut,false);
this.button.addEventListener("mouseover",this.MouseOver,false);
}else{
this.button.onmousedown=this.MouseDown;
this.button.onmouseout=this.MouseOut;
this.button.onmouseover=this.MouseOver;
}
this.onmouseover=this.makeEventHandler(this.onmouseover);
this.onmouseout=this.makeEventHandler(this.onmouseout);
this.onmousedown=this.makeEventHandler(this.onmousedown);
this.onmouseup=this.makeEventHandler(this.onmouseup);
this.onslide=this.makeEventHandler(this.onslide);
this.onchange=this.makeEventHandler(this.onchange);
this.onclick=this.makeEventHandler(this.onclick);
this.button.slider=this;
this.button=this.button.style;
};
Slider.placeSlider=function(){
this.writeSlider();
var _21=this.prototype||this;
var _22=dojo.byId("gantt-data");
var _23=dojo.byId("gantt-header");
var _24=dojo.byId("left-data");
var _25=dojo.byId("slider-image");
this.rail=_23;
var x=_21.offsetX;
var y=_21.offsetY;
this.maxSlide=_22.offsetWidth;
_25.style.height=_22.offsetHeight+_23.offsetHeight-2+"px";
_25.style.width="6px";
this.button.left=(x+_24.offsetWidth-6)+"px";
this.button.top=y+"px";
this.offset=x;
this.button.visibility="inherit";
};
Slider.isPrototype=function(){
for(var i=0;i<window.sliders.length;i++){
window.sliders[i].prototype=window.sliders[i].prototype||this;
}
};
Slider.MouseOver=function(e){
window.sliderDrag.isOver=true;
if(this.slider.hoImg&&!window.sliderDrag.isDown){
this.img.src=this.slider.hoImg.src;
}
if(this.slider.onmouseover){
this.slider.onmouseover(e);
}
};
Slider.MouseOut=function(e){
window.sliderDrag.isOver=false;
if(this.slider.hoImg&&!window.sliderDrag.isDown){
this.img.src=this.slider.loImg.src;
}
if(this.slider.onmouseout){
this.slider.onmouseout(e);
}
};
Slider.MouseDown=function(e){
var _26=this.slider;
window.sliderDrag.dragLayer=this;
window.sliderDrag.dragged=false;
window.sliderDrag.isDown=true;
var _27=evtY=0;
if(!e){
e=window.event;
}
if(typeof (e.pageX)=="number"){
_27=e.pageX;
evtY=e.pageY;
}else{
if(typeof (e.clientX)=="number"){
_27=e.clientX+(document.body.scrollLeft||0);
evtY=e.clientY+(document.body.scrollTop||0);
}
}
if((e.which&&e.which==3)||(e.button&&e.button==2)){
return true;
}
window.sliderDrag.offX=_27-parseInt(this.style.left)+_26.offset;
window.sliderDrag.offY=evtY-parseInt(this.style.top)+_26.offset;
if(e.cancelable){
e.preventDefault();
}
if(e.stopPropagation){
e.stopPropagation();
}
e.cancelBubble=true;
document.onmousemove=_26.MouseSlide;
document.onmouseup=_26.MouseUp;
if(document.captureEvents){
document.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
}
if(_26.hiImg){
this.img.src=this.img.src.replace("bar.gif","bar_selected.gif");
}
if(_26.onmousedown){
_26.onmousedown(e);
}
return false;
};
Slider.MouseUp=function(e){
var l=window.sliderDrag.dragLayer||this;
var _28=l.slider;
window.sliderDrag.isDown=false;
document.onmousemove=null;
document.onmouseup=null;
if(document.releaseEvents){
document.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP);
}
window.sliderDrag.dragLayer=null;
if(_28.hiImg){
l.img.src=l.img.src.replace("bar_selected.gif","bar.gif");
}
_28.DoResize();
if(_28.onmouseup){
_28.onmouseup(e);
}
if(window.sliderDrag.dragged){
if(_28.onchange){
_28.onchange(e);
}
}else{
if(_28.onclick){
_28.onclick(e);
}
}
return false;
};
Slider.DoResize=function(_29){
if(!_29){
_29=this;
}
var _2a=dojo.byId("gantt-data");
var _2b=dojo.byId("gantt-header");
var _2c=dojo.byId("left-data");
var _2d=dojo.byId("right-data");
var _2e=dojo.byId("left-header");
var _2f=dojo.byId("right-header");
var _30=dojo.byId("slider-div");
var _31=dojo.byId("slider-image");
var _32=parseInt(_30.style.left)-_29.offset;
function _33(_34,val){
if(_34.style.width!=val+"px"){
_34.style.width=val+"px";
}
};
var _35=_2a.offsetHeight+_2b.offsetHeight-2+"px";
_31.style.height=_30.style.height=_35;
_33(_2c,_32);
var _36=dojo.isIE?8:9;
_33(_2d,_2a.offsetWidth-_32-_36);
_33(_2e,_32);
_33(_2f,_2a.offsetWidth-_32-_36);
};
Slider.MouseSlide=function(e){
var l=window.sliderDrag.dragLayer;
var _37=l.slider;
window.sliderDrag.dragged=true;
var _38=evtY=0;
if(!e){
e=window.event;
}
if(typeof (e.pageX)=="number"){
_38=e.pageX;
evtY=e.pageY;
}else{
if(typeof (e.clientX)=="number"){
_38=e.clientX+(document.body.scrollLeft||0);
evtY=e.clientY+(document.body.scrollTop||0);
}
}
var pos=Math.max(Math.min(_38-window.sliderDrag.offX,_37.maxSlide),50)+_37.offset;
if(_37.orientation=="h"){
l.style.left=pos+"px";
}else{
l.style.top=pos+"px";
}
dojo.stopEvent(e);
if(_37.onchange){
_37.onchange(e);
}
if(_37.onslide){
_37.onslide(e);
}
return false;
};
Slider.makeEventHandler=function(f){
return (typeof (f)=="string")?new Function("e",f):((typeof (f)=="function")?f:null);
};
function toDecimals(val,n){
if(isNaN(n)){
return val;
}
for(var m=0;m<n;m++){
val*=10;
}
for(var m=0;m>n;m--){
val*=0.1;
}
val=Math.round(val);
if(val<0){
val=-val;
var sgn="-";
}else{
var sgn="";
}
var _39=val.toString();
if(n>0){
while(_39.length<=n){
_39="0"+_39;
}
var len=_39.length;
_39=_39.substring(0,len-n)+"."+_39.substring(len-n,len);
}else{
if(n<0){
for(m=0;m>n;m--){
_39=_39+"0";
}
}
}
return sgn+_39;
};
var ganttSlider=new Slider("slider");

