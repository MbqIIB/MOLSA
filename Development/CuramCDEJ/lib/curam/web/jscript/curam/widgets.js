//>>built
define("curam/widgets",[],function(){
var _1=function(_2){
this.accordion=new _3(_2,this);
this.accordion.switchboard=this;
};
var _4={updateButtons:function(){
var _5=this.accordion;
this.collapser.disabled=_5.staysStill(false);
this.expander.disabled=_5.staysStill(true);
},switchMode:function(){
if(this.checked){
this.switchboard.accordion.accordMode=false;
this.switchboard.expander.onclick=this.switchboard.accordion.expandRest;
this.switchboard.collapser.style.display="";
this.switchboard.updateButtons();
}else{
this.switchboard.accordion.accordMode=true;
this.switchboard.collapser.style.display="none";
this.switchboard.accordion.collapseAll();
this.switchboard.expander.value="Expand All";
this.switchboard.expander.onclick=this.switchboard.accordion.expandAll;
this.switchboard.expander.disabled=false;
}
}};
dojo.mixin(_1.prototype,_4);
var _3=function(_6,_7){
var _8;
this.panelHeight="250px";
this.accordMode=true;
this.switchboard=_7;
this.topElement=dojo.byId(_6);
this.tabs=[];
var _9=dojo.query("div",this.topElement);
for(var i=0;i<_9.length;i++){
if(_9[i].className=="accordionTab"){
while(_9[++i].className!="tabHeader"){
}
_8=_9[i];
while(_9[++i].className!="tabContent"){
}
this.tabs[this.tabs.length]=new _a(this,_8,_9[i]);
}
}
this.lastTab=this.tabs[0];
for(var i=1;i<this.tabs.length;i++){
this.tabs[i].collapse(false);
}
};
var _b={expandAll:function(){
var _c=this.switchboard.accordion;
for(var i=0;i<_c.tabs.length;i++){
_c.tabs[i].stateExpanded();
}
this.src="../themes/classic/images/evidence-review/CollapseAllButton.png";
this.onclick=_c.collapseAll;
},collapseAll:function(){
var _d=this.switchboard.accordion;
for(var i=0;i<_d.tabs.length;i++){
_d.tabs[i].collapse(false);
}
_d.lastTab.expand(false);
this.src="../themes/classic/images/evidence-review/ExpandAllButton.png";
this.onclick=_d.expandAll;
},expandRest:function(){
if(!this.switchboard.accordion.staysStill(true)){
this.switchboard.accordion.expandAll();
}
this.switchboard.updateButtons();
},collapseRest:function(){
if(!this.switchboard.accordion.staysStill(false)){
this.switchboard.accordion.collapseAll();
}
this.switchboard.updateButtons();
},staysStill:function(_e){
var _f=0;
var _10=this.tabs.length;
for(var i=0;i<_10;i++){
if(this.tabs[i].expanded==true){
_f++;
}
}
return (_e==true)?(_10-_f==0):(_f==1);
}};
dojo.mixin(_3.prototype,_b);
var _a=function(_11,_12,_13){
this.accordion=_11;
this.switchboard=_11.switchboard;
this.header=_12;
this.header.tab=this;
this.content=_13;
dojo.style(this.content,{height:_11.panelHeight,overflow:"auto"});
this.content.tab=this;
this.expanded=true;
dojo.connect(this.header,"onclick",this.toggleState);
dojo.connect(this.header,"onmouseover",this.hoverStyle);
dojo.connect(this.header,"onmouseout",this.stillStyle);
};
var _14={hoverStyle:function(e){
if(!this.tab.expanded){
this.className+=" tabHeaderHover";
}
},stillStyle:function(e){
this.className="tabHeader";
},collapse:function(_15){
if(this.accordion.lastTab==this){
return;
}
if(this.accordion.staysStill(false)){
return;
}
if(_15&&this.accordion.accordMode==false){
new _16(this.content,"down");
}else{
dojo.style(this.content,{height:"1px",display:"none"});
}
this.expanded=false;
this.content.style.overflow="hidden";
if(this.accordion.accordMode==false){
this.switchboard.updateButtons();
}
},expand:function(_17){
if(this.accordion.lastTab==this){
return;
}
if(this.accordion.staysStill(true)){
return;
}
var _18=this.accordion.lastTab;
this.stateExpanded(_17);
this.accordion.lastTab=this;
if(this.accordion.accordMode==true){
_18.collapse(true);
}else{
this.switchboard.updateButtons();
}
},stateExpanded:function(_19){
if(_19){
this.content.style.display="";
if(this.accordion.accordMode==true){
new _1a(this.content,this.accordion.lastTab.content);
}else{
new _16(this.content,"up");
}
}else{
dojo.style(this.content,{height:this.accordion.panelHeight,display:"",overflow:"auto"});
this.expanded=true;
}
},toggleState:function(){
if(this.tab.expanded==true){
this.tab.collapse(true);
}else{
this.tab.expand(true);
}
}};
dojo.mixin(_a.prototype,_14);
var _16=function(_1b,_1c){
this.contentRef=_1b;
this.direction=_1c;
this.duration=100;
this.steps=6;
this.step();
};
var _1d={step:function(){
var _1e;
if(this.steps<=0){
if(this.direction=="down"){
dojo.style(this.contentRef,{height:"1px",display:"none"});
this.contentRef.tab.expanded=false;
}else{
this.contentRef.style.height=this.contentRef.tab.accordion.panelHeight;
this.contentRef.tab.expanded=true;
}
this.contentRef.tab.switchboard.updateButtons();
return;
}
if(this.timer){
clearTimeout(this.timer);
}
var _1f=Math.round(this.duration/this.steps);
if(this.direction=="down"){
_1e=this.steps>0?(parseInt(this.contentRef.offsetHeight)-1)/this.steps:0;
}else{
_1e=this.steps>0?(parseInt(this.contentRef.tab.accordion.panelHeight)-parseInt(this.contentRef.offsetHeight))/this.steps:0;
}
this.resizeBy(_1e);
this.duration-=_1f;
this.steps--;
this.timer=setTimeout(dojo.hitch(this,this.step),_1f);
},resizeBy:function(_20){
var _21=this.contentRef.offsetHeight;
var _22=parseInt(_20);
if(_20!=0){
if(this.direction=="down"){
this.contentRef.style.height=(_21-_22)+"px";
}else{
this.contentRef.style.height=(_21+_22)+"px";
}
}
}};
dojo.mixin(_16.prototype,_1d);
var _1a=function(_23,_24){
this.collapsingContent=_24;
this.collapsingContent.style.overflow="hidden";
this.expandingContent=_23;
this.limit=250;
this.duration=100;
this.steps=10;
this.expandingContent.style.display="";
this.step();
};
var _25={step:function(){
if(this.steps<=0){
dojo.style(this.collapsingContent,{height:"1px",display:"none"});
dojo.style(this.collapsingContent,{height:this.limit,overflow:"auto"});
this.collapsingContent.tab.expanded=false;
this.expandingContent.tab.expanded=true;
return;
}
if(this.timer){
clearTimeout(this.timer);
}
var _26=Math.round(this.duration/this.steps);
var _27=this.steps>0?(parseInt(this.collapsingContent.style.height)-1)/this.steps:0;
this.resizeBoth(_27);
this.duration-=_26;
this.steps--;
this.timer=setTimeout(dojo.hitch(this,this.step),_26);
},resizeBoth:function(_28){
var h1=parseInt(this.collapsingContent.style.height);
var h2=parseInt(this.expandingContent.style.height);
var _29=parseInt(_28);
if(_28!=0){
if(h2+_29<this.limit){
this.collapsingContent.style.height=(h1-_29)+"px";
this.expandingContent.style.height=(h2+_29)+"px";
}
}
}};
dojo.mixin(_1a.prototype,_25);
var _2a={version:"1",AccordionControl:_1,AccordionWidget:_3,AccordionTab:_a,SingleSlowMotion:_16,SynchroSlowMotion:_1a,registerAccordion:function(id){
_1.constructor(id);
}};
var _2b=function(_2c){
this.steps=_2c;
this.regions=new Array();
this.RGB=new Array(256);
var k=0;
var hex=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
for(var i=0;i<16;i++){
for(j=0;j<16;j++){
this.RGB[k]=hex[i]+hex[j];
k++;
}
}
};
var _2d={addRegion:function(_2e){
this.regions[this.regions.length]=_2e;
},drawMap:function(){
var _2f;
if(this.steps%2==0){
_2f=this.steps/2;
}else{
_2f=(this.steps-1)/2;
}
var _30=parseInt(255/_2f);
var red,_31,_32;
for(var i=0;i<this.steps;++i){
var _33;
if(i==0){
_33="#ff0000";
}else{
if(i==(this.steps-1)){
_33="#0000ff";
}else{
if(i==_2f){
_33="#ffffff";
}else{
if(i>_2f){
var _31=255;
var red=255;
_31-=(i-_2f)*_30;
red-=(i-_2f)*_30;
_33=this.rgbToHex(red,_31,255);
}else{
if(i<_2f){
_31=0;
_32=0;
_31+=_30*i;
_32+=_30*i;
_33=this.rgbToHex(255,_31,_32);
}
}
}
}
}
var _34=dojo.byId("heatmapTable");
if(_34){
var _35=_34.getElementsByTagName("td");
for(var j=0;j<_35.length;j++){
if(_35[j].className.indexOf("region"+this.regions[i])>-1){
_35[j].style.background=_33;
if(i>_2f){
dojo.style(dojo.query("a",_35[j])[0],"color","white");
}
}
}
}
dojo.style(dojo.byId("legendImage"+this.regions[i]),{color:_33,background:_33});
}
},rgbToHex:function(r,g,b){
var rr=this.RGB[r];
var gg=this.RGB[g];
var bb=this.RGB[b];
return "#"+rr+gg+bb;
}};
dojo.mixin(_2b.prototype,_2d);
dojo.global.getDataIn=function(_36){
return eval(_36);
};
dojo.global.Widgets=_2a;
dojo.global.HeatMap=_2b;
return _2a;
});
