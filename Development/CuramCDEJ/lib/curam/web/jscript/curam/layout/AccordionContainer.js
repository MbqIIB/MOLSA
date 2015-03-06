//>>built
define("curam/layout/AccordionContainer",["dijit/layout/AccordionContainer","dojo/dom-geometry","dojo/_base/array","dojo/_base/sniff","dojo/_base/fx"],function(ac,_1,_2,_3,fx){
var _4=dojo.declare("curam.layout.AccordionContainer",dijit.layout.AccordionContainer,{layout:function(){
var _5=this.selectedChildWidget;
if(!_5){
return;
}
var _6=_5._wrapperWidget.domNode,_7=_1.getMarginExtents(_6),_8=_1.getPadBorderExtents(_6),_9=_5._wrapperWidget.containerNode,_a=_1.getMarginExtents(_9),_b=_1.getPadBorderExtents(_9),_c=this._contentBox;
var _d=0;
_2.forEach(this.getChildren(),function(_e){
_d+=_e._buttonWidget.getTitleHeight();
});
var _f=_5.containerNode.childNodes[0].offsetHeight+20;
if(_d+_f<this._contentBox.h){
_f=this._contentBox.h-_d;
}
this._containerContentBox={h:_f,w:this._contentBox.w-_7.w-_8.w-_a.w-_b.w};
if(_5){
_5.resize(this._containerContentBox);
}
},_transition:function(_10,_11,_12){
if(_3("ie")<8){
_12=false;
}
if(this._animation){
this._animation.stop(true);
delete this._animation;
}
var _13=this;
if(_10){
_10._wrapperWidget.set("selected",true);
_10.resize({h:0,w:this._containerContentBox.w});
var d=this._showChild(_10);
if(this.doLayout&&_10.resize){
var _14=_10.containerNode.childNodes[0].offsetHeight+20;
var _15=0;
dojo.forEach(this.getChildren(),function(_16){
_15+=_16._buttonWidget.getTitleHeight();
});
this._containerContentBox.h=this._contentBox.h-_15;
if(this._containerContentBox.h<_14){
this._containerContentBox.h=_14;
}
this._verticalSpace=this._containerContentBox.h;
_10.resize(this._containerContentBox);
}
}
if(_11){
_11._wrapperWidget.set("selected",false);
if(!_12){
this._hideChild(_11);
}
}
if(_12){
var _17=_10._wrapperWidget.containerNode,_18=_11._wrapperWidget.containerNode;
var _19=_10._wrapperWidget.containerNode,_1a=_1.getMarginExtents(_19),_1b=_1.getPadBorderExtents(_19),_1c=_1a.h+_1b.h;
_18.style.height=(_13._verticalSpace-_1c)+"px";
this._animation=new fx.Animation({node:_17,duration:this.duration,curve:[1,this._verticalSpace-_1c-1],onAnimate:function(_1d){
_1d=Math.floor(_1d);
_17.style.height=_1d+"px";
_18.style.height=(_13._verticalSpace-_1c-_1d-1)+"px";
},onEnd:function(){
delete _13._animation;
_17.style.height="auto";
_18.style.height="0px";
}});
this._animation.onStop=this._animation.onEnd;
this._animation.play();
}
return d;
}});
return _4;
});
