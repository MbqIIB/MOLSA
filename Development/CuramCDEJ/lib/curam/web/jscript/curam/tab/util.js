//>>built
define("curam/tab/util",["dojo/dom-geometry","curam/define","curam/debug","curam/util/ResourceBundle"],function(_1){
dojo.requireLocalization("curam.application","Debug");
var _2=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.tab.util",{toggleDetailsPanel:function(_3){
_3=dojo.fixEvent(_3);
dojo.stopEvent(_3);
var _4=_3.target;
if(_4._animating){
return;
}
_4._animating=true;
var _5=_4.parentNode;
while(_5&&!dojo.hasClass(_5,"detailsPanel-bc")){
_5=_5.parentNode;
}
var _6=_5;
while(_5&&!dojo.hasClass(_5,"summaryPane")){
_5=_5.parentNode;
}
var _7=_5;
while(_5){
if(dojo.hasClass(_5,"dijitBorderContainer")&&!dojo.hasClass(_5,"detailsPanel-bc")){
break;
}
if(dojo.hasClass(_5,"tab-wrapper")){
break;
}
_5=_5.parentNode;
}
var _8=_5;
headerPanelNode=dojo.query(".detailsPanelTitleBar",_6)[0];
detailsPanelNode=dojo.query(".detailsContentPane",_6)[0];
var _9=_8.children;
var _a=dojo.filter(_9,function(_b){
if(dojo.hasClass(_b,"splitter-pane")||dojo.hasClass(_b,"dijitSplitterH")){
return _b;
}
})[0];
var _c=dojo.filter(_9,function(_d){
if(dojo.hasClass(_d,"nav-panel")){
return _d;
}
})[0];
var _e=_1.getMarginBoxSimple(headerPanelNode).h;
var _f=_1.getMarginBoxSimple(_7).h;
var _10=_a.offsetHeight;
var _11=_1.getMarginBoxSimple(_c).h;
var _12=dojo.query(".detailsContentPane",_6)[0];
if(_e!=_7.clientHeight){
dojo.addClass(_4,"collapsed");
dojo.addClass(_12,"collapsed");
curam.debug.log(_2.getProperty("curam.tab.util.collapsing"));
_6._previousHeight=_f;
_c._previousHeight=_11;
dojo.animateProperty({node:_7,duration:500,properties:{height:{end:_e}}}).play();
if(dojo.hasClass(_a,"splitter-pane")){
dojo.animateProperty({node:detailsPanelNode,duration:500,properties:{height:{end:0}}}).play();
}
dojo.animateProperty({node:_a,duration:500,properties:{top:{end:(_e+_10)}}}).play();
dojo.animateProperty({node:_c,duration:500,properties:{top:{end:(_e+_10)}},onEnd:function(){
_4._animating=false;
if(dojo.hasClass(_a,"dijitSplitterH")){
dojo.style(_c,"height",(_c._previousHeight+_6._previousHeight-_e)+"px");
}
}}).play();
}else{
dojo.removeClass(_4,"collapsed");
dojo.removeClass(_12,"collapsed");
curam.debug.log(_2.getProperty("curam.tab.util.expanding"));
dojo.style(_7,"height",_6._previousHeight+"px");
if(dojo.hasClass(_a,"splitter-pane")){
dojo.animateProperty({node:detailsPanelNode,duration:500,properties:{height:{end:_6._previousHeight-_e}}}).play();
}
dojo.animateProperty({node:_a,duration:500,properties:{top:{end:(_6._previousHeight+_10)}}}).play();
dojo.animateProperty({node:_c,duration:500,properties:{top:{end:(_6._previousHeight+_10)}},onEnd:function(){
_4._animating=false;
if(dojo.hasClass(_a,"dijitSplitterH")){
dojo.style(_c,"height",_c._previousHeight+"px");
}
}}).play();
}
}});
return curam.tab.util;
});
