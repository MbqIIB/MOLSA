//>>built
define("curam/widget/Menu",["dijit/Menu","curam/util","curam/debug","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
var _2=dojo.declare("curam.widget.Menu",dijit.Menu,{_CSS_CLASS_ACTIVE_MENU:"curam-active-menu",_EVENT_OPENED:"/curam/menu/opened",_EVENT_CLOSED:"/curam/menu/closed",_amIActive:false,postCreate:function(){
curam.debug.log(_1.getProperty("curam.widget.Menu.created",[this.id]));
this.connect(this,"onOpen",dojo.hitch(this,function(){
curam.debug.log(_1.getProperty("curam.widget.Menu.opened",[this.id]));
curam.util.getTopmostWindow().dojo.publish(this._EVENT_OPENED,[this.id]);
this._markAsActive(true);
}));
var _3=curam.util.getTopmostWindow().dojo.subscribe(this._EVENT_OPENED,this,function(_4){
curam.debug.log(_1.getProperty("curam.widget.Menu.event",[this.id,this._amIActive?"active":"passive",_4]));
if(this.id!=_4&&this._amIActive){
curam.debug.log(_1.getProperty("curam.widget.Menu.deactivate"));
this._markAsActive(false);
var _5=curam.util.getTopmostWindow().dojo.subscribe(this._EVENT_CLOSED,this,function(_6){
if(_6==_4){
curam.debug.log(_1.getProperty("curam.widget.Menu.reactivate",[_4,this.id]));
dojo.unsubscribe(_5);
this._markAsActive(true);
}
});
}
});
this.connect(this,"onClose",dojo.hitch(this,function(){
curam.debug.log(_1.getProperty("curam.widget.Menu.closing",[this.id]));
curam.util.getTopmostWindow().dojo.publish(this._EVENT_CLOSED,[this.id]);
this._markAsActive(false);
dojo.unsubscribe(_3);
}));
this.inherited(arguments);
},_markAsActive:function(_7){
if(_7){
curam.debug.log(_1.getProperty("curam.widget.Menu.add.class"),this.id);
dojo.addClass(this.domNode,this._CSS_CLASS_ACTIVE_MENU);
}else{
curam.debug.log(_1.getProperty("curam.widget.Menu.remove.class"),this.id);
dojo.removeClass(this.domNode,this._CSS_CLASS_ACTIVE_MENU);
}
this._amIActive=_7;
}});
return _2;
});
