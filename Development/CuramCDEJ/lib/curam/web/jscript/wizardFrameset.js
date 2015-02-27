function Wizard(){
var _1=false;
var _2=false;
var _3=false;
var _4;
};
Wizard.prototype.setButtonBarReady=function(){
this.buttonBarReady=true;
this.notifyNavigator();
};
Wizard.prototype.setNavigatorReady=function(){
this.navigatorReady=true;
this.notifyNavigator();
};
Wizard.prototype.setContentReady=function(_5){
this.pageId=_5;
this.contentReady=true;
this.notifyNavigator();
};
Wizard.prototype.notifyNavigator=function(){
if(this.buttonBarReady&&this.navigatorReady&&this.contentReady){
var _6=window.navframe;
this.nav=_6.wizardNavigator;
this.nav.newContent(this.pageId);
this.nav.registerForm(this.pageId);
this.nav.optShowNavigator();
_6.frameElement.navRef=this.nav;
_6.frameElement.onresize=this.nav.handleResize;
}
};
Wizard.prototype.changeFramesetStyle=function(){
var _7=document.getElementsByTagName("frameset")[0].style;
_7.background="rgb(170,180,204) url(../themes/classic/images/wizard/claimant_bg.png) repeat-y";
_7.margin="6px";
};

