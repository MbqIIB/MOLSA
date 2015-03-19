//>>built
require({cache:{"url:curam/widget/templates/_TabButton.html":"<div role=\"presentation\" data-dojo-attach-point=\"titleNode\" data-dojo-attach-event='onclick:onClick' class='dijitTab'>\r\n    <div role=\"presentation\" class='dijitTabInnerDiv' data-dojo-attach-point='innerDiv'>\r\n        <div role=\"presentation\" class='dijitTabContent' data-dojo-attach-point='tabContent'>\r\n          <div role=\"presentation\" aria-labelledby='${id}_tabLabel'>\r\n            <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" data-dojo-attach-point='iconNode' />\r\n            <span data-dojo-attach-point='containerNode,focusNode' class='tabLabel' id='${id}_tabLabel'></span>\r\n            <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\r\n                data-dojo-attach-event='onclick: onClickCloseButton' role=\"presentation\">\r\n                <span data-dojo-attach-point='closeText' class='dijitTabCloseText'>Close Tab</span\r\n            ></span>\r\n      </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"}});
define("curam/widget/_TabButton",["dojo/dom-attr","dojo/dom-class","dojo/i18n","dojo/_base/lang","dojo/text!curam/widget/templates/_TabButton.html","dojo/_base/connect","dijit/layout/StackController","dijit/Menu","dijit/MenuItem","curam/widget/MenuItem","curam/util/ResourceBundle"],function(_1,_2,_3,_4,_5,_6){
dojo.requireLocalization("curam.application","TabMenu");
var _7=new curam.util.ResourceBundle("TabMenu");
_6.subscribe("/curam/tab/labelUpdated",function(){
var _8,_9=dojo.query(".dijitTabContainerTop-tabs");
_9.forEach(function(_a){
_8=dojo.query(".tabLabel",_a);
_8.forEach(function(_b,_c){
var _d="  ["+(_c+1)+" "+LOCALISED_TABCONTAINER_CONTEXT_OF+" "+_8.length+"]";
var _e=_8[_c].innerHTML;
_b.setAttribute("aria-label",_e+_d);
_b.setAttribute("title",_e);
});
});
});
var _f=dojo.declare("curam.widget._TabButton",dijit.layout._StackButton,{templateString:_5,scrollOnFocus:false,curamDisabled:false,curamVisible:true,baseClass:"dijitTab",postMixInProperties:function(){
if(!this.iconClass){
this.iconClass="dijitTabButtonIcon";
}
},postCreate:function(){
this.inherited(arguments);
dojo.setSelectable(this.containerNode,false);
if(this.iconNode.className=="dijitTabButtonIcon"){
dojo.style(this.iconNode,"width","1px");
}
_1.set(this.focusNode,"id",this.id+"_tabLabel");
},startup:function(){
if(dojo.isIE==6){
this.inherited(arguments);
}else{
dijit.layout._StackButton.prototype.startup.apply(this,arguments);
}
},_setCloseButtonAttr:function(_10){
this._set("closeButton",_10);
_2.toggle(this.innerDiv,"dijitClosable",_10);
this.closeNode.style.display=_10?"":"none";
if(_10){
var _11=_3.getLocalization("dijit","common");
if(this.closeNode){
_1.set(this.closeNode,"title",_11.itemClose);
}
this._closeMenu=new dijit.Menu({id:this.id+"_Menu",dir:this.dir,lang:this.lang,textDir:this.textDir,targetNodeIds:[this.domNode]});
var _12=new curam.widget.MenuItem({onClickValue:"_onClick",label:_11.itemClose,dir:this.dir,lang:this.lang,textDir:this.textDir,onClick:_4.hitch(this,"onClickCloseButton")});
var _13=new curam.widget.MenuItem({onClickValue:"_onClickAll",label:_7.getProperty("close.all.tabs.text"),dir:this.dir,lang:this.lang,textDir:this.textDir,onClick:_4.hitch(this,"onClickCloseButton")});
this._closeMenu.addChild(_12);
this._closeMenu.addChild(_13);
}else{
dojo.addClass(this.titleNode,"hasNoCloseButton");
if(this._closeMenu){
this._closeMenu.destroyRecursive();
delete this._closeMenu;
}
}
},_setCuramDisabledAttr:function(_14){
this.curamDisabled=_14;
this._swapState(this.domNode,this.curamDisabled,"disabled","enabled");
},_setCuramVisibleAttr:function(_15){
this.curamVisible=_15;
this._swapState(this.domNode,this.curamVisible,"visible","hidden");
},_swapState:function(_16,_17,_18,_19){
if(_17){
dojo.replaceClass(_16,_18,_19);
}else{
dojo.replaceClass(_16,_19,_18);
}
},destroy:function(){
_6.publish("/curam/tab/labelUpdated");
if(this._closeMenu){
this._closeMenu.destroyRecursive();
delete this._closeMenu;
}
this.inherited(arguments);
}});
return _f;
});
