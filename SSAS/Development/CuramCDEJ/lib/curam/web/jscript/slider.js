var sliders=new Array();
var sliderNum=0;
dojo.connect(window,"onresize",resizeDivs);
var borderWidth=1;
function startSlider(_1,_2){
var _3=getDirectChildrenByTag(_1,"DIV");
Element.addClassName(_1,"container");
_1.subDivLeft=_3[0];
Element.addClassName(_1.subDivLeft,"left");
_1.subDivRight=_3[1];
Element.addClassName(_1.subDivRight,"right");
_1.options=setOptions(_2);
recalculateWidths(_1);
Element.addClassName(_1.subDivLeft,"left-noscroll");
_1.subDivRight.style.marginLeft=_1.options.sliderWidth+"px";
_1.parentNode.style.overflow="hidden";
var _4="slider"+sliderNum;
sliders[sliderNum]=new Slider(_4,_1);
initSlide(sliderNum);
sliderNum++;
if(_1.options.leftDivScrollSync!="none"){
addScrollSynchronization(_1.subDivRight,_1.subDivLeft,_1.options.leftDivScrollSync);
}
if(_1.options.rightDivScrollSync!="none"){
addScrollSynchronization(_1.subDivLeft,_1.subDivRight,_1.options.rightDivScrollSync);
}
};
function resizeDivs(e){
var _5=document.getElementsByClassName("container");
for(var j=0;j<_5.length;j++){
_5[j].subDivLeft.style.width=(_5[j].offsetWidth/100*_5[j].options.leftDivWidth)-(_5[j].options.sliderWidth/2)+"px";
_5[j].subDivRight.style.width=_5[j].offsetWidth-_5[j].subDivLeft.offsetWidth-_5[j].options.sliderWidth-(borderWidth*2)+"px";
initSlide(j);
}
};
function getDirectChildrenByTag(e,_6){
var _7=new Array();
var _8=e.childNodes;
for(var i=0;i<_8.length;i++){
if(_8[i]&&_8[i].tagName&&_8[i].tagName==_6){
_7.push(_8[i]);
}
}
return _7;
};
function setOptions(_9){
options={sliderType:"vertical",sliderWidth:"7",leftDivScrollSync:"none",rightDivScrollSync:"none",leftDivWidth:"40"};
Object.extend(options,_9);
return options;
};
function recalculateWidths(_a){
_a.subDivLeft.style.width=_a.offsetWidth/100*_a.options.leftDivWidth+"px";
_a.subDivLeft.style.width=_a.subDivLeft.offsetWidth-(_a.options.sliderWidth/2)+"px";
_a.subDivRight.style.width=_a.offsetWidth-_a.subDivLeft.offsetWidth-_a.options.sliderWidth-(borderWidth*2)+"px";
};
function getOnScrollFunction(_b,_c){
return function(){
if(_b._scrollSyncDirection=="horizontal"||_b._scrollSyncDirection=="both"){
_b.scrollLeft=_c.scrollLeft;
}
if(_b._scrollSyncDirection=="vertical"||_b._scrollSyncDirection=="both"){
_b.scrollTop=_c.scrollTop;
}
};
};
function addScrollSynchronization(_d,_e,_f){
removeScrollSynchronization(_d);
_d._syncScroll=getOnScrollFunction(_d,_e);
_d._scrollSyncDirection=_f;
_d._syncTo=_e;
_e.onscroll=_d._syncScroll;
};
function removeScrollSynchronization(_10){
if(_10._syncTo!=null){
_10.onscroll=null;
}
_10._syncTo=null;
_10._syncScroll=null;
_10._scrollSyncDirection=null;
};
function initSlide(_11){
sliders[_11].placeSlider();
};
function Slider(_12,_13){
var div=dojo.create("div",{id:"slider"+sliderNum,style:"z-index:1;cursor:col-resize; position:absolute; height:"+_13.offsetHeight-5},dojo.body());
var img=dojo.create("img",{src:"../Images/slider.gif",id:"sliderImage"+sliderNum,width:_13.options.sliderWidth,height:_13.offsetHeight-5},div);
_13.sliderImg=img;
_13.slider=div;
this.container=_13;
this.maxSlide=100;
this.buttonWidth=img.width;
this.buttonHeight=img.height;
this.buttonImg="bar.gif";
this.buttonHiliteImg="bar_selected.gif";
this.imgPath="../themes/classic/images/slider/";
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
this.name=_12||"slider"+window.sliders.length;
window.sliders[window.sliders.length]=this;
window.sliders[this.name]=this;
if(!window.sliderDrag){
window.sliderDrag=new Object();
}
};
Slider.writeSlider=function(){
var _14=this.prototype||this;
if(!_14.loImg){
_14.loImg=new Image(_14.buttonWidth,_14.buttonHeight);
_14.loImg.src=_14.imgPath+_14.buttonImg;
if(_14.buttonHiliteImg){
_14.hiImg=new Image(_14.buttonWidth,_14.buttonHeight);
_14.hiImg.src=_14.imgPath+(_14.buttonHiliteImg||_14.buttonImg);
}
}
if(_14!=this){
this.loImg=_14.loImg;
if(_14.hiImg){
this.hiImg=_14.hiImg;
}
if(_14.hoImg){
this.hoImg=_14.hoImg;
}
this.orientation=_14.orientation;
this.maxSlide=_14.maxSlide;
}
this.button=this.container.slider;
this.button.img=this.container.sliderImg;
this.button.style.width=_14.buttonWidth+"px";
this.button.style.height=_14.buttonHeight+"px";
if(this.button.addEventListener){
this.button.addEventListener("mousedown",this.MouseDown,false);
this.button.addEventListener("mouseout",this.MouseOut,false);
this.button.addEventListener("mouseover",this.MouseOver,false);
this.button.addEventListener("mouseup",this.MouseUp,false);
}else{
this.button.onmousedown=this.MouseDown;
this.button.onmouseout=this.MouseOut;
this.button.onmouseover=this.MouseOver;
this.button.onmouseup=this.MouseUp;
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
Slider.placeSlider=function(_15){
this.writeSlider();
var _16=this.prototype||this;
var _17=this.container;
var _18=this.container.subDivLeft;
var _19=this.container.sliderImg;
this.rail=_17;
var x=0;
var y=0;
if(this.rail.offsetParent){
var _1a=this.rail;
while(_1a){
x+=_1a.offsetLeft;
y+=_1a.offsetTop;
_1a=_1a.offsetParent;
}
}else{
x+=(typeof (this.rail.pageX)=="number")?this.rail.pageX:this.rail.x;
y+=(typeof (this.rail.pageY)=="number")?this.rail.pageY:this.rail.y;
}
this.maxSlide=_17.offsetWidth-60;
_19.style.height=_17.offsetHeight+"px";
_19.style.width=this.container.options.sliderWidth+"px";
this.button.left=x+_18.offsetWidth+"px";
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
var _1b=this.slider;
window.sliderDrag.dragLayer=this;
window.sliderDrag.dragged=false;
window.sliderDrag.isDown=true;
var _1c=evtY=0;
if(!e){
e=window.event;
}
if(typeof (e.pageX)=="number"){
_1c=e.pageX;
evtY=e.pageY;
}else{
if(typeof (e.clientX)=="number"){
_1c=e.clientX+(document.body.scrollLeft||0);
evtY=e.clientY+(document.body.scrollTop||0);
}
}
if((e.which&&e.which==3)||(e.button&&e.button==2)){
return true;
}
window.sliderDrag.offX=_1c-parseInt(this.style.left)+_1b.offset;
window.sliderDrag.offY=evtY-parseInt(this.style.top)+_1b.offset;
if(e.cancelable){
e.preventDefault();
}
if(e.stopPropagation){
e.stopPropagation();
}
e.cancelBubble=true;
document.onmousemove=_1b.MouseSlide;
document.onmouseup=_1b.MouseUp;
if(window.captureEvents){
window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
}
if(_1b.hiImg){
this.img.src=this.img.src.replace("bar.gif","bar_selected.gif");
}
if(_1b.onmousedown){
_1b.onmousedown(e);
}
return false;
};
Slider.MouseUp=function(e){
var l=window.sliderDrag.dragLayer;
var _1d=l.slider;
window.sliderDrag.isDown=false;
document.onmousemove=null;
document.onmouseup=null;
if(window.releaseEvents){
window.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP);
}
window.sliderDrag.dragLayer=null;
if(_1d.hiImg){
l.img.src=l.img.src.replace("bar_selected.gif","bar.gif");
}
var _1e=l.slider.container;
var _1f=l.slider.container.subDivLeft;
var _20=l.slider.container.subDivRight;
var _21=l.slider.container.sliderImg;
var _22=l.slider.container.slider;
var _23=parseInt(_22.style.left)-_1d.offset;
_1f.style.width=_23+"px";
_20.style.width=_1e.offsetWidth-_23-_1e.options.sliderWidth-(borderWidth*2)+"px";
if(_1d.onmouseup){
_1d.onmouseup(e);
}
if(window.sliderDrag.dragged){
if(_1d.onchange){
_1d.onchange(e);
}
}else{
if(_1d.onclick){
_1d.onclick(e);
}
}
return false;
};
Slider.MouseSlide=function(e){
var l=window.sliderDrag.dragLayer;
var _24=l.slider;
window.sliderDrag.dragged=true;
var _25=evtY=0;
if(!e){
e=window.event;
}
if(typeof (e.pageX)=="number"){
_25=e.pageX;
evtY=e.pageY;
}else{
if(typeof (e.clientX)=="number"){
_25=e.clientX+(document.body.scrollLeft||0);
evtY=e.clientY+(document.body.scrollTop||0);
}
}
var pos=Math.max(Math.min(_25-window.sliderDrag.offX,_24.maxSlide),50)+_24.offset;
if(_24.orientation=="h"){
l.style.left=pos+"px";
}else{
l.style.top=pos+"px";
}
if(e.cancelable){
e.preventDefault();
}
if(e.stopPropagation){
e.stopPropagation();
}
e.cancelBubble=true;
if(_24.onchange){
_24.onchange(e);
}
if(_24.onslide){
_24.onslide(e);
}
return false;
};
Slider.makeEventHandler=function(f){
return (typeof (f)=="string")?new Function("e",f):((typeof (f)=="function")?f:null);
};

