//>>built
define("curam/FastUIMController",["dojo/parser","curam/UIMController","curam/debug","curam/util/onLoad","curam/util/ResourceBundle"],function(_1){
dojo.requireLocalization("curam.application","Debug");
var _2=new curam.util.ResourceBundle("Debug");
var _3=dojo.declare("curam.FastUIMController",[curam.UIMController],{buildRendering:function(){
this.domNode=this.srcNodeRef;
this._attachTemplateNodes(this.domNode,function(_4,_5){
return _4.getAttribute(_5);
});
},postCreate:function(){
},startup:function(){
this.tabController=dijit.byId(this.tabControllerId);
dojo.attr(this.frame,"iscpiframe",this.iscpiframe);
dojo.attr(this.frame,"title",this.title);
dojo.addClass(this.frame,this.iframeClassList);
dojo.addClass(this.domNode,this.classList);
this.frameLoadEvent=this.EVENT.TOPIC_PREFIX+this.frame.id;
this.setURL(this.url);
if(this._iframeLoaded()){
curam.debug.log("curam.FastUIMController "+_2.getProperty("curam.FastUIMControlle.msg"));
}else{
var _6=dojo.hitch(this,"processFrameLoadEvent");
curam.util.onLoad.addSubscriber(this.frame.id,_6);
dojo.connect(this,"destroy",function(){
curam.util.onLoad.removeSubscriber(this.iframeId,_6);
_6=null;
});
}
if(this.inDialog){
dojo.style(this.frame,{width:this.width,height:this.height});
}
},_iframeLoaded:function(){
return dojo.attr(this.frame,"data-done-loading")=="true";
}});
return _3;
});
