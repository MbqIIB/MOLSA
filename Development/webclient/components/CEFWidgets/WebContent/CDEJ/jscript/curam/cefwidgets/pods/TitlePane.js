dojo.provide("cefwidgets.pods.TitlePane");
require(["dijit/TitlePane","curam/util/ResourceBundle"]);
dojo.declare("curam.cefwidgets.pods.TitlePane",[dijit.TitlePane],{closeIconAltText:"",togglePodAltText:"",templatePath:dojo.moduleUrl("curam","cefwidgets/pods/templates/TitlePane.html"),templateString:null,collapsible:true,constructor:function(){
var _1="close.icon.alt.text";
var _2="toggle.pod.alt.text";
this.closeIconAltText=_1;
this.togglePodAltText=_2;
},postCreate:function(){
this.inherited(arguments);
if(!this.collapsible){
dojo.style(this.arrowNode,"display","none");
}else{
dojo.addClass(this.domNode,"dijitTitlePaneTitle-collapsible");
}
dojo.forEach(this.getChildren(),function(_3){
if(!_3.started&&!_3._started){
_3.startup();
}
});
dojo.addClass(this.wipeNode,"dijitTitlePaneContentWipeNode");
dojo.connect(this._wipeOut,"onEnd",this,"_publish");
dojo.connect(this._wipeIn,"onEnd",this,"_publish");
},addChild:function(_4){
this.inherited(arguments);
console.log("titlepane add child");
},_publish:function(){
dojo.publish("/TitlePane/sizechange",[this]);
},toggle:function(){
if(!this.collapsible){
return;
}
this.inherited(arguments);
}});

