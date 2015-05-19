dojo.provide("curam.DelayedTooltipDialog");
dojo.require("dijit.TooltipDialog");
dojo.declare("curam.DelayedTooltipDialog",dijit.TooltipDialog,{closeDelay:1000,openDelay:1000,orientation:null,targetNode:"",closeButton:"",closeButtonAltText:"",postCreate:function(){
this.inherited(arguments);
dojo.style(this.domNode,"display","none");
var _1="<div>"+"<a waiRole=\"button\">&nbsp;</a>"+"<span class=\"hiddenControlForScreenReader\">"+this.closeButtonAltText+"</span>"+"</div>";
var _2=dojo.query(".dijitTooltipContents > div",this.domNode)[0];
this.closeButton=dojo.create("div",{innerHTML:_1},_2);
dojo.attr(this.closeButton,"class","tooltip-close-button tooltip-close-button-normal");
dojo.attr(this.closeButton,"tabIndex","0");
var _3=this;
this.connect(this.closeButton,"onmouseover",function(){
dojo.attr(this.closeButton,"class","tooltip-close-button tooltip-close-button-mouseover");
});
this.connect(this.closeButton,"onfocus",function(){
dojo.attr(this.closeButton,"class","tooltip-close-button tooltip-close-button-mouseover");
});
this.connect(this.closeButton,"onmouseout",function(){
dojo.attr(this.closeButton,"class","tooltip-close-button tooltip-close-button-normal");
});
this.connect(this.closeButton,"onblur",function(){
dojo.attr(this.closeButton,"class","tooltip-close-button tooltip-close-button-normal");
});
if(this.targetNode){
this.targetNode=dojo.byId(this.targetNode);
this.connect(this.targetNode,"onmouseover",function(){
dojo.attr(_3.targetNode,"style",{cursor:"pointer"});
dojo.attr(_3.targetNode,"class","rollover");
dojo.connect(_3.targetNode,"onclick",_3,_3.openTooltip);
});
this.connect(this.targetNode,"onfocus",function(){
dojo.attr(_3.targetNode,"style",{cursor:"pointer"});
dojo.attr(_3.targetNode,"class","rollover");
dojo.connect(_3.targetNode,"onkeypress",_3,_3.openTooltip);
});
this.connect(this.targetNode,"onmouseout",function(){
dojo.attr(_3.targetNode,"class","normal");
});
this.connect(this.targetNode,"onclick",function(_4){
dojo.stopEvent(_4);
});
}
},openTooltip:function(_5){
var _6=this;
if(_5.type==="keypress"&&!CEFUtils.enterKeyPress(_5)){
return;
}
var _7=dojo.byId(_6.id);
dojo.removeClass(_7,"tooltip-startup-position");
var _8=dijit.popup.open({popup:_6,around:_6.targetNode,orient:_6.orientation});
_6.closeButton.focus();
var _9=dojo.connect(_6.closeButton,"onclick",function(){
dojo.disconnect(_9);
_6.close();
});
var _a=dojo.connect(_6.closeButton,"onkeypress",function(_b){
if(_6.isValidKeyPress(_b)){
dojo.disconnect(_a);
_6.close();
}
});
},close:function(){
var _c=this;
dojo.attr(_c.closeButton,"class","tooltip-close-button tooltip-close-button-active");
dijit.popup.close(_c);
dojo.attr(_c.closeButton,"class","tooltip-close-button tooltip-close-button-normal");
_c.targetNode.focus();
},isValidKeyPress:function(_d){
var _e=(_d.type==="keypress"&&CEFUtils.enterKeyPress(_d));
return _e;
}});

