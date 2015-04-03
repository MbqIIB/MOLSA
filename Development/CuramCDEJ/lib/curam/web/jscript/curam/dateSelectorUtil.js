//>>built
define("curam/dateSelectorUtil",["curam/dialog","curam/date","curam/util","curam/debug","curam/define","curam/util/ResourceBundle"],function(_1,_2,_3){
dojo.requireLocalization("curam.application","Debug");
var _4=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.dateSelectorUtil",{myOwner:_1.getParentWindow(window),dateFormat:jsDF,dateTimeFormat:jsTF,timeSeparator:jsTS,startDayOfWeek:undefined,topic:undefined,navigationKeys:[dojo.keys.LEFT_ARROW,dojo.keys.RIGHT_ARROW,dojo.keys.DELETE,dojo.keys.BACKSPACE,dojo.keys.END,dojo.keys.HOME,dojo.keys.TAB,dojo.keys.F5],initCalendar:function(){
curam.dateSelectorUtil.myOwner=_1.getParentWindow(window);
curam.debug.log("curam.dateSelectorUtil:initCalendar(), myOwner = ",curam.dateSelectorUtil.myOwner.location.href);
var _5=_2.getDateFromFormat(curam.dateSelectorUtil.myOwner.getPopupInput("dateSelectorInitDate"),curam.dateSelectorUtil.dateFormat);
if(isNaN(_5)||_5==0){
_5=new Date();
}
_3.connect(dojo.byId("year"),"onkeyup",function(e){
if(e.target.value.length<5){
return true;
}
for(var i=0;i<curam.dateSelectorUtil.navigationKeys.length;i++){
if(e.key===curam.dateSelectorUtil.navigationKeys[i]){
return true;
}
}
dojo.stopEvent(e);
return false;
});
_3.connect(dojo.byId("year"),"onkeyUp",function(e){
if(e.target.value.length<=4){
return true;
}else{
e.target.value=e.target.value.substring(0,4);
}
return false;
});
dijit.byId("month").on("change",function(){
curam.debug.log("date.selector.event.triggered.month");
curam.dateSelectorUtil.updateCalendar();
});
_3.connect(dojo.byId("year"),"onchange",function(){
curam.debug.log("date.selector.event.triggered.year");
curam.dateSelectorUtil.updateCalendar();
});
curam.dateSelectorUtil.drawCalendar(_5.getMonth()+1,_5.getFullYear());
},updateCalendar:function(){
var _6=0;
_6=parseInt(dijit.byId("month").get("value"))+1;
var _7=0;
_7=dojo.byId("year").value;
curam.dateSelectorUtil.drawCalendar(_6,_7);
},validYear:function(_8){
return !(_8==null||isNaN(_8)||_8<1||_8>99999);
},validMonth:function(_9){
return !(_9==null||isNaN(_9)||_9<1||_9>12);
},drawCalendar:function(_a,_b){
var _c=false;
var _d=_2.getDateFromFormat(curam.dateSelectorUtil.myOwner.getPopupInput("dateSelectorInitDate"),curam.dateSelectorUtil.dateFormat);
if(!(isNaN(_d)||_d==0)){
_c=true;
}
var _e=new Date();
if(!this.validMonth(_a)||!this.validYear(_b)){
_a=_e.getMonth()+1;
_b=_e.getFullYear();
}
dojo.byId("year").value=_b;
dijit.byId("month").set("value",_a-1);
var _f=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
if(((_b%4==0)&&(_b%100!=0))||(_b%400==0)){
_f[1]=29;
}else{
_f[1]=28;
}
var _10=_b;
var _11=_a-1;
var _12=1;
var _13=(new Date(_10,_11,1)).getDay();
if(_13!=(curam.dateSelectorUtil.startDayOfWeek-1)){
_11--;
if(_11<0){
_11=11;
_10--;
}
if(curam.dateSelectorUtil.startDayOfWeek==2){
if(_13==0){
_12=_f[_11]-5;
}else{
if(_13==1){
_12=1;
}else{
if(_13==2){
_12=_f[_11];
}else{
if(_13==3){
_12=_f[_11]-1;
}else{
if(_13==4){
_12=_f[_11]-2;
}else{
if(_13==5){
_12=_f[_11]-3;
}else{
if(_13==6){
_12=_f[_11]-4;
}
}
}
}
}
}
}
}else{
if(curam.dateSelectorUtil.startDayOfWeek==1){
_12=_f[_11]-(_13-1);
}
}
}
var _14;
_14=dojo.byId("calendarData");
for(var row=1;row<_14.rows.length;row++){
var _15=_14.rows[row];
for(var col=0;col<_15.cells.length;col++){
var _16="";
var _17=curam.date.formatDate(new Date(_10,_11,_12),"MMM dd, yyyy");
if(_11==_a-1){
if(new Date(_10,_11,_12).getDay()==0){
_16="sunday";
}else{
_16="this-month";
}
}else{
_16="other-month";
}
if(_12==_e.getDate()&&_11==_e.getMonth()&&_10==_e.getFullYear()){
_16="today";
_17+=" "+LOCALISED_CURRENT_DAY;
}
if((_c)&&(_12==_d.getDate()&&_11==_d.getMonth()&&_10==_d.getFullYear())){
_16="current-date";
_17+=" "+LOCALISED_SELECTED_DAY;
}
_15.cells[col].innerHTML="<a href=\"\" onclick=\"return curam.dateSelectorUtil.handleOnClick(new Date("+_10+","+_11+","+_12+"), arguments[0]); \" class=\""+_16+"\""+" title=\""+_17+" \""+">"+_12+"</a>";
_12++;
if(_12>_f[_11]){
_12=1;
_11++;
}
if(_11>11){
_11=0;
_10++;
}
}
}
},handleOnClick:function(_18,_19){
dojo.fixEvent(_19);
dojo.stopEvent(_19);
curam.dateSelectorUtil.publishDate(_18);
return false;
},publishDate:function(_1a){
_1a=_1a?_1a:new Date(yearToDisplay,monthToDisplay,dayToDisplay);
var _1b=curam.date.formatDate(_1a,curam.dateSelectorUtil.dateFormat);
if(curam.dateSelectorUtil.topic&&strlen(curam.dateSelectorUtil.topic)>0&&typeof (curam.dateSelectorUtil.myOwner.curam.msg.publish)!="undefined"){
curam.dateSelectorUtil.myOwner.curam.msg.publish(curam.dateSelectorUtil.topic,_1b);
}else{
executeOpenerMapping("return_date",_1b);
}
if(curam.dateSelectorUtil.myOwner!=window){
curam.debug.log(_4.getProperty("curam.dateSelectorUtil.msg"));
_1.closeModalDialog();
}
}});
return curam.dateSelectorUtil;
});
