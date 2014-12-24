//>>built
require({cache:{"url:curam/widget/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n"}});
define("curam/widget/DeferredDropDownButton",["dijit/form/DropDownButton","dojo/text!curam/widget/templates/DropDownButton.html","dijit/form/Button","dijit/MenuItem","curam/debug","curam/util","curam/util/ResourceBundle"],function(_1,_2){
dojo.requireLocalization("curam.application","Debug");
var _3=new curam.util.ResourceBundle("Debug");
var _4=dojo.declare("curam.widget.DeferredDropDownButton",dijit.form.DropDownButton,{templateString:_2,o3tabId:null,useCustomPlaceAlgorithm:false,startup:function(){
if(this._started){
return;
}
var _5=dojo.attr(this.domNode,"class").split(" ");
dojo.forEach(_5,dojo.hitch(this,function(_6){
if(_6.indexOf("tab-widget-id-")!=-1){
this.o3tabId=_6.slice(14,_6.length);
}
}));
this.widgetTemplate=curam.widgetTemplates?curam.widgetTemplates[this.id]:null;
dijit.form.Button.prototype.startup.apply(this);
},toggleDropDown:function(){
if(!this.dropDown&&this.widgetTemplate){
this.widgetTemplate=this.widgetTemplate.split("&lt;").join("<").split("&gt;").join(">").split("&amp;").join("&").split("&quot;").join("'");
var _7=dojo.create("div",{innerHTML:this.widgetTemplate,style:{display:"none"}},dojo.body());
this.dropDown=dojo.parser.parse(_7)[0];
var _8=dijit.byNode(_7.firstChild);
if(_8.getChildren().length==0){
var mi=new dijit.MenuItem({disabled:true,label:LOCALISED_EMPTY_MENU_MARKER});
_8.addChild(mi);
}
this.widgetTemplate=null;
curam.debug.log(_3.getProperty("curam.widget.DeferredDropDownButton.publish")+" /curam/menu/created "+_3.getProperty("curam.widget.DeferredDropDownButton.for"),this.o3tabId);
var _9=curam.util.getTopmostWindow();
_9.dojo.publish("/curam/menu/created",[this.o3tabId]);
}
this.inherited(arguments);
},openDropDown:function(){
curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm=true;
this.inherited(arguments);
curam.widget.DeferredDropDownButton.prototype.useCustomPlaceAlgorithm=false;
}});
return _4;
});
