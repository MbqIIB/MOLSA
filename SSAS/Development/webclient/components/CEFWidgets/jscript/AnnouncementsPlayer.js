dojo.provide("AnnouncementsPlayer");
require(["dijit/_Widget","dijit/_Templated","curam/util/Dialog"]);
dojo.declare("AnnouncementsPlayer",[dijit._Widget,dijit._Templated],{announcementsId:"",currentMessage:"",currentState:"",fullTextURL:"",fullTextURLTitleText:"",timeIn:1000,timeOut:1000,timeDisplayed:3000,altTextLast:"",altTextPlay:"",altTextPause:"",altTextNext:"",templateString:"<div dojoAttachPoint='announcementsWidget' id=${announcementsId} class='announcements' timeIn='${timeIn}' timeDisplayed='${timeDisplayed}' timeOut='${timeOut}' fullTextURL='${fullTextURL}'>"+"<span class='text-container' dojoAttachEvent='onmouseout:release'>"+"<span class='announcement-text' dojoAttachPoint='textDisplay' id='announcements'>"+"<b dojoAttachPoint='dateTime'></b>"+"<a href='' title='${fullTextURLTitleText}' tabindex='0' dojoAttachPoint='text' dojoAttachEvent='onmouseover:hold, onfocus:hold, onkeypress:showFullMessageText, onclick:showFullMessageText'></a>"+"</span>"+"</span>"+"<span class='controls'>"+"<span tabindex='0' title='${altTextLast}' alt='${altTextLast}' role='button' id='last' class='control last' dojoAttachEvent='onmouseover:_mouseEventLast, onmouseout:_mouseEventLast,onmousedown:_mouseEventLast,onmouseup:_mouseEventLast,onkeyup:_mouseEventLast, onkeydown:_mouseEventLast, onblur:_mouseEventLast, onfocus:_mouseEventLast'></span>"+"<span tabindex='0' title='${altTextPause}' alt='${altTextPause}' role='button' id='pausePlay' class='control pause' dojoAttachPoint='pausePlay' dojoAttachEvent='onmouseover:_mouseEventPausePlay, onmouseout:_mouseEventPausePlay,onmousedown:_mouseEventPausePlay,onmouseup:_mouseEventPausePlay, onkeyup:_mouseEventPausePlay, onkeydown:_mouseEventPausePlay, onblur:_mouseEventPausePlay, onfocus:_mouseEventPausePlay'></span>"+"<span tabindex='0' title='${altTextNext}' alt='${altTextNext}' role='button' id='next' class='control next' dojoAttachEvent='onmouseover:_mouseEventNext, onmouseout:_mouseEventNext,onmousedown:_mouseEventNext,onmouseup:_mouseEventNext,onkeyup:_mouseEventNext, onkeydown:_mouseEventNext, onblur:_mouseEventNext, onfocus:_mouseEventNext'></span>"+"</span>"+"</div>",constructor:function(_1){
this.announcementsId=_1.announcementsId;
this.altTextPlay=_1.altTextPlay;
this.fullTextURL=_1.fullTextURL;
if(_1.timeIn){
this.timeIn=_1.timeIn;
}
if(_1.timeOut){
this.timeOut=_1.timeOut;
}
if(_1.timeDisplayed){
this.timeDisplayed=_1.timeDisplayed;
}
this.currentMessageIdx=0;
},postCreate:function(){
if(!this.announcementsId){
console.error("no announcement id");
return;
}
},startup:function(){
if(announcements.announcements.length==0){
dojo.addClass(this.announcementsWidget,"hide-announcements");
return;
}
dojo.subscribe("text/start",this,function(){
this.currentMessageIdx=announcements.announcements.length;
this.play();
});
setTimeout("dojo.publish(\"text/start\");",3000);
},getMessage:function(){
return announcements.announcements[this.currentMessageIdx];
},getNextMessage:function(){
this._incrementMessageIdx();
var _2=announcements.announcements[this.currentMessageIdx];
return _2;
},getLastMessage:function(){
this._decrementMessageIdx();
var _3=announcements.announcements[this.currentMessageIdx];
return _3;
},_incrementMessageIdx:function(){
this.currentMessageIdx++;
if(this.currentMessageIdx>=announcements.announcements.length){
this.currentMessageIdx=0;
}
},_decrementMessageIdx:function(){
this.currentMessageIdx--;
if(this.currentMessageIdx<0){
this.currentMessageIdx=announcements.announcements.length-1;
}
},play:function(){
this.currentState="playing";
dojo.removeClass(this.pausePlay,"play");
dojo.attr(this.pausePlay,"alt",this.altTextPause);
dojo.attr(this.pausePlay,"title",this.altTextPause);
var _4=this.getNextMessage();
this.displayMessage(_4);
dojo.style(this.textDisplay,"opacity","0");
this.player=dojo.fx.chain([dojo.fadeIn({node:this.textDisplay,duration:this.timeIn}),dojo.fadeOut({node:this.textDisplay,delay:this.timeDisplayed,duration:this.timeOut})]);
var _5=dojo.connect(this.player,"onEnd",this,function(){
dojo.disconnect(_5);
this.play();
});
this.player.play();
return;
},_pauseOrPlay:function(){
if(this.currentState=="playing"){
this.pause();
}else{
this.play();
}
},hold:function(){
if(this.currentState!="paused"){
dojo.addClass(this.pausePlay,"play");
this.show();
this.player.pause();
}
},release:function(){
if(this.currentState=="playing"){
dojo.removeClass(this.pausePlay,"play");
this.player.play();
}
},show:function(){
if(this.player){
this.player.stop();
}
var _6=this.getMessage();
this.displayMessage(_6);
},pause:function(){
dojo.addClass(this.pausePlay,"play");
dojo.attr(this.pausePlay,"alt",this.altTextPlay);
dojo.attr(this.pausePlay,"title",this.altTextPlay);
this.show();
if(this.player){
this.player.pause();
}
this.currentState="paused";
},last:function(){
this.currentMessage=this.getLastMessage();
this.pause();
},next:function(){
this.currentMessage=this.getNextMessage();
this.pause();
},displayMessage:function(_7){
dojo.style(this.textDisplay,"opacity","1");
if(_7.bidiDir){
dojo.style(this.textDisplay,"direction",_7.bidiDir);
dojo.style(this.textDisplay,"display","inline-block");
dojo.style(this.textDisplay,"textAlign","start");
}
this.dateTime.innerHTML=_7.date+" "+_7.time+" ";
this.text.innerHTML=_7.text;
var _8=this.fullTextURL+"Page.do?o3ctx=4096&announcementID="+_7.id;
dojo.attr(this.text,"href",_8);
},showFullMessageText:function(_9){
var _a=CEFUtils.keyPressExist(_9);
var _b=CEFUtils.enterKeyPress(_9);
if(_a==true&&_b!==true){
return;
}
if(this.fullTextURL.length==0){
return;
}
this.currentState="showingModal";
var _c=CEFUtils.showInModal(_9);
var _d=this.player;
_c.registerOnDisplayHandler(function(){
_d.pause();
});
_c.registerBeforeCloseHandler(function(){
_d.play();
});
},_validKeyPress:function(_e){
if(_e.type==="keyup"||_e.type==="keydown"){
if(CEFUtils.enterKeyPress(_e)!==true){
return false;
}
}
return true;
},_actionEvent:function(_f){
return (_f.type=="mouseup"||_f.type=="keyup");
},_mouseEventPausePlay:function(_10){
console.log("Pause/Play Button Event type:"+_10.type);
if(!this._validKeyPress(_10)){
return;
}
this._pausePlayStyling(_10);
if(this._actionEvent(_10)){
this._pauseOrPlay();
}
},_mouseEventLast:function(_11){
console.log("Last Button Event type:"+_11.type);
if(!this._validKeyPress(_11)){
return;
}
this._lastNextStyling("last",_11);
if(this._actionEvent(_11)){
this.last();
}
},_mouseEventNext:function(_12){
console.log("Next Button Event type:"+_12.type);
if(!this._validKeyPress(_12)){
return;
}
this._lastNextStyling("next",_12);
if(this._actionEvent(_12)){
this.next();
}
},_pausePlayStyling:function(_13){
var _14=dojo.byId("pausePlay");
if(_13.type=="mouseover"||_13.type=="focus"){
if(dojo.hasClass(_14,"play")){
dojo.removeClass(_14,"play");
dojo.addClass(_14,"play-roll-over");
}else{
dojo.addClass(_14,"pause-roll-over");
}
}else{
if(_13.type=="mouseout"||_13.type=="blur"){
if(dojo.hasClass(_14,"play-roll-over")){
dojo.removeClass(_14,"play-roll-over");
dojo.addClass(_14,"play");
}else{
dojo.removeClass(_14,"pause-roll-over");
}
}else{
if(_13.type=="mousedown"||_13.type=="keydown"){
if(dojo.hasClass(_14,"pause-roll-over")){
dojo.removeClass(_14,"pause-roll-over");
dojo.addClass(_14,"pause-select");
}else{
dojo.removeClass(_14,"play-roll-over");
dojo.addClass(_14,"play-select");
}
}else{
if(_13.type=="mouseup"||_13.type=="keyup"){
if(dojo.hasClass(_14,"play-select")){
dojo.removeClass(_14,"play-select");
dojo.addClass(_14,"pause-roll-over");
}else{
dojo.removeClass(_14,"pause-select");
dojo.addClass(_14,"play-roll-over");
}
}
}
}
}
},_lastNextStyling:function(_15,_16){
var _17=_15+"-roll-over";
var _18=_15+"-select";
var _19=_15;
var _1a=dojo.byId(_15);
if(_16.type=="mouseover"||_16.type=="focus"){
dojo.addClass(_1a,_17);
}else{
if(_16.type=="mousedown"||_16.type=="keydown"){
dojo.removeClass(_1a,_17);
dojo.addClass(_1a,_18);
}else{
if(_16.type=="mouseup"||_16.type=="keyup"){
dojo.removeClass(_1a,_18);
dojo.addClass(_1a,_17);
}else{
if(_16.type=="mouseout"||_16.type=="blur"){
dojo.removeClass(_1a,_17);
}
}
}
}
}});

