//>>built
define("curam/util/SessionTimeout",["curam/util","dojo/_base/lang","curam/debug","curam/html","curam/util/UimDialog","curam/util/ResourceBundle"],function(_1,_2,_3,_4,_5){
dojo.requireLocalization("curam.application","TimeoutWarning");
var _6=new curam.util.ResourceBundle("TimeoutWarning");
curam.define.singleton("curam.util.SessionTimeout",{logoutPageID:"",minutes:0,seconds:0,userMessageNode:null,userMessageNodeID:"userMessage",displayTimerNodeID:"displayTimer",stopTimer:false,updatedUserMessage:null,dismissModalBtnTxt:null,displayButtonCssNames:".initially-hidden-widget.btn-id-1",doLogout:true,timeForDialogToAppear:0,sessTimeoutWarningJSPXDialog:"external-session-timeout-warning-dialog.jspx",sessTimeoutJSPXDialog:"external-session-timeout-dialog.jspx",bufferingPeriod:null,checkSessionExpired:function(_7,_8,_9,_a){
this.width=_7;
this.height=_8;
this.timeoutPeriod=_9;
this.stopChecking=false;
this.interval=10000;
this.bufferingPeriod=_a==undefined?30000:_a*1000;
this.executeChecking=setInterval(function(){
curam.util.SessionTimeout._executeSessionExpiredCheck();
},this.interval);
},_executeSessionExpiredCheck:function(){
var _b=curam.util.getCookie("sessionExpiry");
if(this.currSessionExpCookie){
if(this.currSessionExpCookie!=_b){
this.timeForDialogToAppear=-10000;
this.validCookie=this._sessionExpiryCookieIsAsExpected(_b);
}
}else{
this.validCookie=this._sessionExpiryCookieIsAsExpected(_b);
this._ammendTimeoutPeriodForMisconfiguration(this.validCookie);
}
this.currSessionExpCookie=_b;
this.timeForDialogToAppear=this.timeForDialogToAppear+this.interval;
if(this.validCookie){
this.sessionExpiry=Math.abs(this.validCookie[0]);
this.serverTime=Math.abs(this.validCookie[1]);
var _c=this.serverTime+this.timeForDialogToAppear+this.bufferingPeriod;
var _d=this.sessionExpiry-(this.timeoutPeriod*1000);
this.totalExpirySeverTime=_d;
this.totalCurrServerTime=_c;
if(_c>=_d&&this.stopChecking!=true){
this.stopChecking=true;
if(window.top.openModal!=undefined){
window.top.openModal(this.sessTimeoutWarningJSPXDialog,{width:this.width,height:this.height});
}
clearInterval(this.executeChecking);
}
}
},_sessionExpiryCookieIsAsExpected:function(_e){
var _f=true;
if(_e!=null){
var _10=_e.split("-",2);
if(_10&&_10.length==2){
for(token in _10){
var _11=Math.abs(token);
if(isNaN(_11)){
_f=false;
}
}
if(_f==true){
return _10;
}
}
}
},_ammendTimeoutPeriodForMisconfiguration:function(_12){
if(_12){
var _13=Math.abs(this.validCookie[0]);
var _14=Math.abs(this.validCookie[1]);
var _15=(_13-(_14+this.interval+this.bufferingPeriod))/1000;
_15=_15<=0?0:_15;
var _16=this.getTimeoutWarningConfig();
if(_16){
var _17=_16.timeout;
_17=_17<=0?0:_17;
if(_17>=_15){
this.getTimeoutWarningConfig("timeout",_15);
}
}
}
},getTimeoutWarningConfig:function(_18,_19){
if(window.top.getAppConfig){
var _1a=window.top.getAppConfig();
var _1b=_1a.timeoutWarning;
if(_1b&&_18&&_19){
_1b[_18]=_19;
}
return _1b;
}
},displayTimerAndLogout:function(_1c,_1d,_1e,_1f,_20,_21){
this.executeTimer=setInterval(function(){
curam.util.SessionTimeout.timer();
},1000);
this.minutes=~~(_1d/60);
this.seconds=_1d%60;
this.timerNode=dojo.byId(this.displayTimerNodeID);
this.userMessageNode=dojo.byId(this.userMessageNodeID);
this.logoutPageID=_1c;
this.updatedUserMessage=_1e;
this.dismissModalBtnTxt=_1f;
this.expiredTitleText=_20;
this.titleNode=window.top.dojo.byId(_21);
},timer:function(){
if(this.stopTimer!=true){
var _22="";
if(this.seconds<10){
_22=this.minutes+" : 0"+this.seconds;
}else{
_22=this.minutes+" : "+this.seconds;
}
this.timerNode.innerHTML="&#x202A;"+_22+"&#x202C;";
if(this.seconds==0){
this.seconds=59;
this.minutes=this.minutes-1;
}else{
this.seconds=this.seconds-1;
}
if(this.minutes==0&&this.seconds==0){
this.quitTimeoutWarningDialog();
this.stopTimer();
}
if(this.seconds==0){
this.minutes=this.minutes-1;
this.seconds=59;
}
}
},stopTimer:function(){
clearInterval(this.executeTimer);
},quitTimeoutWarningDialog:function(_23){
var _24={pageID:this.logoutPageID};
window.top.displayContent(_24);
},dismissTimeoutDialog:function(){
window.top.location=jsBaseURL+"/"+"application.do";
},continueUsingApp:function(){
_3.log(_6.getProperty("continueApp"));
this.stopTimer();
},dismissTimeoutWarningModal:function(){
_3.log(_6.getProperty("dismissTimeoutModal"));
},displayUserMsgAsParagraphs:function(msg,_25){
var _26;
if(_25){
_26=_25;
}else{
_26=dojo.byId(this.userMessageNodeID);
}
var _27=curam.html.splitWithTag(msg,"\\n","p");
_26.innerHTML=_27;
this.userMessageNode=_26;
}});
return curam.util.SessionTimeout;
});
