//>>built
define("curam/util/FrequencyEditor",["curam/util","curam/define","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.util.FrequencyEditor",{CORRECTOR:1,DAILY_FREQUENCY:0,WEEKLY_FREQUENCY:1,MONTHLY_FREQUENCY:2,YEARLY_FREQUENCY:3,BIMONTHLY_FREQUENCY:4,EVERY_DAY_MASK:201,EVERY_WEEKDAY_MASK:202,EVERY_WEEKENDDAY_MASK:203,MON_MASK:1,TUE_MASK:2,WED_MASK:4,THU_MASK:8,FRI_MASK:16,SAT_MASK:32,SUN_MASK:64,daysInMonth:[31,28,31,30,31,30,31,31,30,31,30,31],EVERY_DAY:0,EVERY_WEEKDAY:1,MON:0,TUE:1,WED:2,THU:3,FRI:4,SAT:5,SUN:6,START_DATE:0,MONTH_DAY_NUM:1,MONTH_SEL_DAY:2,DAY_NUM:0,SEL_DAY:1,SEL_MONTH_DAY_NUM:0,SEL_MONTH_SEL_DAY:1,allowableCharsForNumeric:["1","2","3","4","5","6","7","8","9","0",dojo.keys.LEFT_ARROW,dojo.keys.RIGHT_ARROW,dojo.keys.DELETE,dojo.keys.ENTER,dojo.keys.BACKSPACE,dojo.keys.END,dojo.keys.HOME,dojo.keys.TAB,dojo.keys.F5],allowableDayString:["32","33","34","35","36"],allowableDayOfWeekMask:["201","202","203","1","2","4","8","16","32","64"],allowableFirstDayStringForBimonthly:["32","33","34","35"],allowableSecondDayStringForBimonthly:["33","34","35","36"],allowableWeekdayStringForBimonthly:["1","2","4","8","16","32","64"],allowableMonthString:["1","2","3","4","5","6","7","8","9","10","11","12"],initPage:function(){
var _2=curam.dialog.getParentWindow(window);
if(formActivated==true){
executeOpenerMapping("freq_text",translatedPatternString);
executeOpenerMapping("freq_data",patternString);
curam.dialog.closeModalDialog();
return false;
}
var _3=_2.getPopupInput("initFreq");
curam.debug.log(_1.getProperty("curam.util.FrequencyEditor.input"),_3);
if(!_3||_3==null||_3.length==0){
document.theForm.freqType[0].checked=true;
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_DAY].checked=true;
return true;
}
var _4=parseInt(_3.charAt(0),10);
if(_4==curam.util.FrequencyEditor.DAILY_FREQUENCY){
curam.util.FrequencyEditor.setupDailyFrequency(_3);
}else{
if(_4==curam.util.FrequencyEditor.WEEKLY_FREQUENCY){
curam.util.FrequencyEditor.setupWeeklyFrequency(_3);
}else{
if(_4==curam.util.FrequencyEditor.MONTHLY_FREQUENCY){
curam.util.FrequencyEditor.setupMonthlyFrequency(_3);
}else{
if(_4==curam.util.FrequencyEditor.YEARLY_FREQUENCY){
curam.util.FrequencyEditor.setupYearlyFrequency(_3);
}else{
if(_4==curam.util.FrequencyEditor.BIMONTHLY_FREQUENCY){
curam.util.FrequencyEditor.setupBimonthlyFrequency(_3);
}else{
alert(errorMsgs.freqPattern);
}
}
}
}
}
return true;
},setupDailyFrequency:function(_5){
var _6=_5.substr(4,3);
document.theForm.freqType[curam.util.FrequencyEditor.DAILY_FREQUENCY].checked=true;
if(parseInt(_6,10)==curam.util.FrequencyEditor.EVERY_WEEKDAY_MASK){
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_WEEKDAY].checked=true;
}else{
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_DAY].checked=true;
var _7=parseInt(_5.substr(1,3),10);
document.theForm.daily_num.value=""+_7;
}
},setupWeeklyFrequency:function(_8){
var _9=parseInt(_8.substr(4,3),10);
document.theForm.freqType[curam.util.FrequencyEditor.WEEKLY_FREQUENCY].checked=true;
if(_9&curam.util.FrequencyEditor.MON_MASK){
document.theForm.weekly_select_mon.checked=true;
}
if(_9&curam.util.FrequencyEditor.TUE_MASK){
document.theForm.weekly_select_tue.checked=true;
}
if(_9&curam.util.FrequencyEditor.WED_MASK){
document.theForm.weekly_select_wed.checked=true;
}
if(_9&curam.util.FrequencyEditor.THU_MASK){
document.theForm.weekly_select_thur.checked=true;
}
if(_9&curam.util.FrequencyEditor.FRI_MASK){
document.theForm.weekly_select_fri.checked=true;
}
if(_9&curam.util.FrequencyEditor.SAT_MASK){
document.theForm.weekly_select_sat.checked=true;
}
if(_9&curam.util.FrequencyEditor.SUN_MASK){
document.theForm.weekly_select_sun.checked=true;
}
var _a=parseInt(_8.substr(1,3),10);
document.theForm.weekly_num.value=""+_a;
},setupMonthlyFrequency:function(_b){
var _c=parseInt(_b.substr(1,3),10);
var _d=parseInt(_b.substr(4,3),10);
var _e=parseInt(_b.substr(7,2),10);
document.theForm.freqType[curam.util.FrequencyEditor.MONTHLY_FREQUENCY].checked=true;
if(_e==0){
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.START_DATE].checked=true;
document.theForm.monthly0_month_interval.value=_c;
}else{
if(_e<=31){
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.MONTH_DAY_NUM].checked=true;
document.theForm.monthly1_day_num.value=_e;
document.theForm.monthly1_month_interval.value=_c;
}else{
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.MONTH_SEL_DAY].checked=true;
var _f=dijit.byId("monthly2_select_day_num");
_f.set("value",_e);
_f=dijit.byId("monthly2_select_day");
_f.set("value",_d);
document.theForm.monthly2_month_interval.value=_c;
}
}
},setupBimonthlyFrequency:function(_10){
var _11=parseInt(_10.substr(1,2),10);
var _12=parseInt(_10.substr(4,3),10);
var _13=parseInt(_10.substr(7,2),10);
document.theForm.freqType[curam.util.FrequencyEditor.BIMONTHLY_FREQUENCY-curam.util.FrequencyEditor.CORRECTOR].checked=true;
if(_13<=31){
document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked=true;
document.theForm.bimonthly1_day1_num.value=_13;
document.theForm.bimonthly1_day2_num.value=_11;
}else{
document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.SEL_DAY].checked=true;
var _14=dijit.byId("bimonthly2_select_day1_num");
_14.set("value",_13);
_14=dijit.byId("bimonthly2_select_day2_num");
_14.set("value",_11);
_14=dijit.byId("bimonthly2_select_weekday");
_14.set("value",_12);
}
},setupYearlyFrequency:function(_15){
var _16=parseInt(_15.substr(1,3),10);
var _17=parseInt(_15.substr(4,3),10);
var _18=parseInt(_15.substr(7,2),10);
document.theForm.freqType[curam.util.FrequencyEditor.YEARLY_FREQUENCY+curam.util.FrequencyEditor.CORRECTOR].checked=true;
if(_18<=31){
document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_DAY_NUM].checked=true;
var _19=dijit.byId("yearly1_select_month");
_19.set("value",_16);
document.theForm.yearly1_day_num.value=_18;
}else{
document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_SEL_DAY].checked=true;
var _19=dijit.byId("yearly2_select_day_num");
_19.set("value",_18);
_19=dijit.byId("yearly2_select_day");
_19.set("value",_17);
_19=dijit.byId("yearly2_select_month");
_19.set("value",_16);
}
},createPatternString:function(){
var _1a=null;
var _1b=false;
if(document.theForm.freqType[0].checked==true){
_1b=curam.util.FrequencyEditor.createDailyPatternString();
}else{
if(document.theForm.freqType[1].checked==true){
_1b=curam.util.FrequencyEditor.createWeeklyPatternString();
}else{
if(document.theForm.freqType[2].checked==true){
_1b=curam.util.FrequencyEditor.createMonthlyPatternString();
}else{
if(document.theForm.freqType[3].checked==true){
_1b=curam.util.FrequencyEditor.createBimonthlyPatternString();
}else{
_1b=curam.util.FrequencyEditor.createYearlyPatternString();
}
}
}
}
if(_1b){
curam.util.FrequencyEditor.disableRowBorder();
return true;
}else{
return false;
}
},createDailyPatternString:function(){
var _1c="0";
if(document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_DAY].checked==true){
var _1d=parseInt(document.theForm.daily_num.value,10);
if(curam.util.FrequencyEditor.validateDailyPattern(_1d)){
_1c+=curam.util.FrequencyEditor.doZeroPadding(_1d,3);
_1c+="000";
}else{
return false;
}
}else{
_1c+="001";
_1c+=curam.util.FrequencyEditor.EVERY_WEEKDAY_MASK;
}
_1c+="00";
document.theForm.patternString.value=_1c;
return true;
},validateDailyPattern:function(_1e){
if(isNaN(_1e)||_1e<1){
alert(errorMsgs.everyDay);
return false;
}
return true;
},createWeeklyPatternString:function(){
var _1f="1";
var _20=0;
var _21=parseInt(document.theForm.weekly_num.value,10);
if(curam.util.FrequencyEditor.validateWeeklyPattern(_21)){
_1f+=curam.util.FrequencyEditor.doZeroPadding(_21,3);
var _22=false;
var _23=document.theForm.weekly_select_mon;
if(_23.checked==true){
_22=true;
_20+=_23.value-0;
}
_23=document.theForm.weekly_select_tue;
if(_23.checked==true){
_22=true;
_20+=_23.value-0;
}
_23=document.theForm.weekly_select_wed;
if(_23.checked==true){
_22=true;
_20+=_23.value-0;
}
_23=document.theForm.weekly_select_thur;
if(_23.checked==true){
_22=true;
_20+=_23.value-0;
}
_23=document.theForm.weekly_select_fri;
if(_23.checked==true){
_22=true;
_20+=_23.value-0;
}
_23=document.theForm.weekly_select_sat;
if(_23.checked==true){
_22=true;
_20+=_23.value-0;
}
_23=document.theForm.weekly_select_sun;
if(_23.checked==true){
_22=true;
_20+=_23.value-0;
}
if(!_22){
alert(errorMsgs.noDaySelected);
return false;
}
if(_20>0){
_1f+=curam.util.FrequencyEditor.doZeroPadding(_20,3);
}else{
_1f+="000";
}
_1f+="00";
document.theForm.patternString.value=_1f;
return true;
}
return false;
},validateWeeklyPattern:function(_24){
if(isNaN(_24)||_24<1){
alert(errorMsgs.everyWeek);
return false;
}
return true;
},createMonthlyPatternString:function(){
var _25="2";
if(document.theForm.monthlyFreqType[curam.util.FrequencyEditor.START_DATE].checked==true){
var _26=parseInt(document.theForm.monthly0_month_interval.value,10);
if(!curam.util.FrequencyEditor.validateMonthlyData(_26)){
return false;
}
var _27=0;
_25+=curam.util.FrequencyEditor.doZeroPadding(_26,3);
_25+="000";
_25+=curam.util.FrequencyEditor.doZeroPadding(_27,2);
}else{
if(document.theForm.monthlyFreqType[curam.util.FrequencyEditor.MONTH_DAY_NUM].checked==true){
var _26=parseInt(document.theForm.monthly1_month_interval.value,10);
var _27=parseInt(document.theForm.monthly1_day_num.value,10);
if(!curam.util.FrequencyEditor.validateMonthlyData(_26,_27)){
return false;
}
_25+=curam.util.FrequencyEditor.doZeroPadding(_26,3);
_25+="000";
_25+=curam.util.FrequencyEditor.doZeroPadding(_27,2);
}else{
var _26=parseInt(document.theForm.monthly2_month_interval.value,10);
if(!curam.util.FrequencyEditor.validateMonthlyData(_26)){
return false;
}
var day=dijit.byId("monthly2_select_day_num").get("value");
var _28=dijit.byId("monthly2_select_day").get("value");
if(!curam.util.FrequencyEditor.validateDayWeekString(day,_28,_25)){
return false;
}
_25+=curam.util.FrequencyEditor.doZeroPadding(_26,3);
_25+=curam.util.FrequencyEditor.doZeroPadding(_28,3);
_25+=curam.util.FrequencyEditor.doZeroPadding(day,2);
}
}
document.theForm.patternString.value=_25;
return true;
},validateMonthlyData:function(_29,_2a){
if(isNaN(_29)||_29<1||_29>100){
alert(errorMsgs.monthNum);
return false;
}
if(_2a==null){
return true;
}
if(isNaN(_2a)||_2a<1||_2a>28){
alert(errorMsgs.dayNum);
return false;
}
return true;
},validateDayWeekString:function(day,_2b,_2c){
var _2d=curam.util.FrequencyEditor.allowableDayString;
var _2e=curam.util.FrequencyEditor.allowableDayOfWeekMask;
var _2f=false;
var _30=false;
for(var i=0;i<_2d.length;i++){
if(day==_2d[i]){
_2f=true;
break;
}
}
for(var i=0;i<_2e.length;i++){
if(_2b==_2e[i]){
_30=true;
break;
}
}
if(_2f&&_30){
return true;
}else{
if(!_2f){
if(_2c=="2"){
alert(errorMsgs.dayStringForMonthly);
}else{
if(_2c=="3"){
alert(errorMsgs.dayStringForYearly);
}else{
alert(errorMsgs.dayString);
}
}
return false;
}else{
if(!_30){
if(_2c=="2"){
alert(errorMsgs.dayOfWeekMaskForMonthly);
}else{
if(_2c=="3"){
alert(errorMsgs.dayOfWeekMaskForYearly);
}else{
alert(errorMsgs.dayOfWeekMask);
}
}
return false;
}
}
}
},createBimonthlyPatternString:function(){
var _31="4";
var _32;
if(document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked==true){
var _33=parseInt(document.theForm.bimonthly1_day1_num.value,10);
var _34=parseInt(document.theForm.bimonthly1_day2_num.value,10);
if(!curam.util.FrequencyEditor.validateBimonthlyData(_33,_34,null)){
return false;
}
if(_33>_34){
_32=_33;
_33=_34;
_34=_32;
}
_31+=curam.util.FrequencyEditor.doZeroPadding(_34,2);
_31+="0000";
_31+=curam.util.FrequencyEditor.doZeroPadding(_33,2);
}else{
var _35=dijit.byId("bimonthly2_select_day1_num");
var _36=_35.get("value");
_35=dijit.byId("bimonthly2_select_day2_num");
var _37=_35.get("value");
_35=dijit.byId("bimonthly2_select_weekday");
var _38=_35.get("value");
if(!curam.util.FrequencyEditor.validateBimonthlyDataString(_36,_37,_38)){
return false;
}
if(_36>_37){
_32=_36;
_36=_37;
_37=_32;
}
if(!curam.util.FrequencyEditor.validateBimonthlyData(_36,_37,_38)){
return false;
}
_31+=curam.util.FrequencyEditor.doZeroPadding(_37,2);
_31+="0";
_31+=curam.util.FrequencyEditor.doZeroPadding(_38,3);
_31+=curam.util.FrequencyEditor.doZeroPadding(_36,2);
}
document.theForm.patternString.value=_31;
return true;
},validateBimonthlyData:function(_39,_3a,_3b){
if(_3b!=null){
if(isNaN(_3b)||_3b<1||_3b>64){
alert(errorMsgs.weekend);
return false;
}
}else{
if(isNaN(_39)||_39<1||_39>28||isNaN(_3a)||_3a<1||_3a>28){
alert(errorMsgs.dayNum);
return false;
}
}
if(_39==_3a){
alert(errorMsgs.dayDiff);
return false;
}
return true;
},validateBimonthlyDataString:function(_3c,_3d,_3e){
var _3f=curam.util.FrequencyEditor.allowableFirstDayStringForBimonthly;
var _40=curam.util.FrequencyEditor.allowableSecondDayStringForBimonthly;
var _41=curam.util.FrequencyEditor.allowableWeekdayStringForBimonthly;
var _42=false;
var _43=false;
var _44=false;
for(var i=0;i<_3f.length;i++){
if(_3c==_3f[i]){
_42=true;
break;
}
}
for(var i=0;i<_40.length;i++){
if(_3d==_40[i]){
_43=true;
break;
}
}
for(var i=0;i<_41.length;i++){
if(_3e==_41[i]){
_44=true;
break;
}
}
if(_42&&_43&&_44){
return true;
}else{
if(!_42){
alert(errorMsgs.firstDayString);
return false;
}else{
if(!_43){
alert(errorMsgs.secondDayString);
return false;
}else{
if(!_44){
alert(errorMsgs.weekend);
return false;
}
}
}
}
},createYearlyPatternString:function(){
var _45="3";
var _46=null;
if(document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_DAY_NUM].checked==true){
_46=dijit.byId("yearly1_select_month");
var _47=_46.get("value");
_45+=curam.util.FrequencyEditor.doZeroPadding(_47,3);
_45+="000";
if(!curam.util.FrequencyEditor.validateMonthString(_47)){
return false;
}
var _48=parseInt(document.theForm.yearly1_day_num.value,10);
if(!curam.util.FrequencyEditor.validateYearlyData(_48,_47)){
return false;
}
_45+=curam.util.FrequencyEditor.doZeroPadding(_48,2);
}else{
var day=dijit.byId("yearly2_select_day_num").get("value");
var _49=dijit.byId("yearly2_select_day").get("value");
var _4a=dijit.byId("yearly2_select_month").get("value");
if(!curam.util.FrequencyEditor.validateDayWeekString(day,_49,_45)){
return false;
}
if(!curam.util.FrequencyEditor.validateMonthString(_4a)){
return false;
}
_45+=curam.util.FrequencyEditor.doZeroPadding(_4a,3);
_45+=curam.util.FrequencyEditor.doZeroPadding(_49,3);
_45+=curam.util.FrequencyEditor.doZeroPadding(day,2);
}
document.theForm.patternString.value=_45;
return true;
},validateYearlyData:function(_4b,_4c){
if(isNaN(_4b)||_4b<1||_4b>curam.util.FrequencyEditor.daysInMonth[_4c-1]){
alert(errorMsgs.dayNumAnd+"  "+curam.util.FrequencyEditor.daysInMonth[_4c-1]);
return false;
}
return true;
},validateMonthString:function(_4d){
var _4e=curam.util.FrequencyEditor.allowableMonthString;
for(var i=0;i<_4e.length;i++){
if(_4d==_4e[i]){
return true;
}
}
alert(errorMsgs.monthString);
return false;
},doZeroPadding:function(_4f,_50){
var _51=""+_4f;
var _52=_50-_51.length;
for(var i=0;i<_52;i++){
_51="0"+_51;
}
return _51;
},_setFirstLevelRadioButton:function(_53){
var _54=dojo.query("input[name='freqType']",dojo.byId("mainForm"))[_53];
if(_54==null){
throw new Error("The radio button for the selected"+" frequency type could not be found!");
}
if(!_54.checked){
dojo.query("input[type='radio']:checked",dojo.byId("mainForm")).forEach(function(_55){
_55.checked=false;
});
if(_53!=curam.util.FrequencyEditor.WEEKLY_FREQUENCY){
dojo.query("input[type='checkbox']:checked",dojo.byId("mainForm")).forEach(function(_56){
_56.checked=false;
});
}
_54.checked=true;
}
},_setSecondLevelRadioButton:function(_57){
if(_57==undefined){
return "undefined";
}
var _58;
if(_57.domNode){
_58=_57.domNode;
}else{
_58=_57;
}
if(_58.tagName.toLowerCase()=="input"&&dojo.attr(_58,"type")=="radio"){
_58.checked=true;
return "radio node clicked";
}
var _59=cm.getParentByType(_58,"TD");
if(_59==null){
throw new Error("Exception: The row contains the node should be found");
}
var _5a=dojo.query("input[type = 'radio']",_59)[0];
if(_5a==null){
throw new Error("Exception: The radio node should exist");
}else{
_5a.checked=true;
return "text input or codetable clicked";
}
},setSelectedFreqType:function(_5b,_5c){
curam.debug.log("curam.util.FrequencyEditor: "+_1.getProperty("curam.util.FrequencyEditor.radio"));
curam.util.FrequencyEditor._setFirstLevelRadioButton(_5b);
curam.util.FrequencyEditor._setSecondLevelRadioButton(_5c);
},setDefaultOption:function(_5d){
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_DAY].checked=false;
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_WEEKDAY].checked=false;
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked=false;
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.SEL_DAY].checked=false;
document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked=false;
document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.SEL_DAY].checked=false;
document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_DAY_NUM].checked=false;
document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_SEL_DAY].checked=false;
if(_5d!=curam.util.FrequencyEditor.WEEKLY_FREQUENCY){
document.theForm.weekly_select_mon.checked=false;
document.theForm.weekly_select_tue.checked=false;
document.theForm.weekly_select_wed.checked=false;
document.theForm.weekly_select_thur.checked=false;
document.theForm.weekly_select_fri.checked=false;
document.theForm.weekly_select_sat.checked=false;
document.theForm.weekly_select_sun.checked=false;
}
if(_5d==curam.util.FrequencyEditor.DAILY_FREQUENCY){
document.theForm.daily_select_type[curam.util.FrequencyEditor.EVERY_DAY].checked=true;
}else{
if(_5d==curam.util.FrequencyEditor.WEEKLY_FREQUENCY){
document.theForm.weekly_select_mon.checked=true;
}else{
if(_5d==curam.util.FrequencyEditor.MONTHLY_FREQUENCY){
document.theForm.monthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked=true;
}else{
if(_5d==curam.util.FrequencyEditor.BIMONTHLY_FREQUENCY){
document.theForm.bimonthlyFreqType[curam.util.FrequencyEditor.DAY_NUM].checked=true;
}else{
if(_5d==curam.util.FrequencyEditor.YEARLY_FREQUENCY){
document.theForm.yearlyFreqType[curam.util.FrequencyEditor.SEL_MONTH_DAY_NUM].checked=true;
}
}
}
}
}
},_doPosNumbericInputChecker:function(_5e){
if(_5e==""){
return false;
}
var _5f=curam.util.FrequencyEditor.allowableCharsForNumeric;
for(var i=0;i<_5f.length;i++){
if(_5e==_5f[i]){
return true;
}
}
return false;
},posNumericInputChecker:function(_60){
_60=dojo.fixEvent(_60);
var _61=_60.keyChar;
var _62=curam.util.FrequencyEditor._doPosNumbericInputChecker(_61);
if(!_62){
dojo.stopEvent(_60);
}
},prePopulateTextFields:function(_63){
return function(e){
for(var i=0;i<_63.length;i++){
if(!_63[i].value||_63[i].value==""){
_63[i].value=1;
}
}
};
},disableRowBorder:function(){
dojo.query("form[name='theForm'] table tr").forEach(function(_64){
dojo.addClass(_64,"row-no-border");
});
},addInputListener:function(){
dojo.ready(function(){
var _65=[];
dojo.query("input[type='text']:not(input.dijitReset)").forEach(function(_66){
_65.push(_66);
curam.util.connect(_66,"onkeypress",curam.util.FrequencyEditor.posNumericInputChecker);
});
curam.util.connect(dojo.byId("mainForm"),"onsubmit",function(_67){
curam.util.FrequencyEditor.prePopulateTextFields(_65);
});
});
},replacePlaceholderWithDomNode:function(){
dojo.query("body#Curam_frequency-editor table tr td.frequency").forEach(function(_68){
curam.util.FrequencyEditor._parse(_68);
});
},_parse:function(_69){
var _6a=dojo.query("> .node-needs-replacement",_69);
var _6b=dojo.query("> span",_69)[0];
if(_6b==null||_6b==undefined){
throw new Error("Exception: Some text string is missing for some certain "+"frequency type, please check the 'frequency-editor.jsp' file.");
}
var _6c=_6b.innerHTML;
var _6d=/%[^%]*%/g;
var _6e=_6c.match(_6d);
if(_6a.length==0&&_6e==null){
return "No need to parse";
}else{
if(_6a.length==0&&_6e!=null){
throw new Error("The text string '"+_6c+"' from the 'FrequencyPatternSelector.properties'"+" should not have any placeholder.");
}else{
if(_6a.length!=0&&_6e==null){
throw new Error("The text string '"+_6c+"' from the 'FrequencyPatternSelector.properties'"+" should have some placeholders.");
}
}
}
if(dojo.hasClass(_69,"weekly-frequency")){
if(_6e.length!=2){
throw new Error("The text string '"+_6c+"' from the 'FrequencyPatternSelector.properties' "+"has the incorrect number of placeholders.");
}
var _6f=dojo.clone(_6a[0]);
_6a.forEach(dojo.destroy);
dojo.removeClass(_6f,"node-needs-replacement");
var _70=_6f.className.match(_6d);
var _71;
for(var i=0;i<_6e.length;i++){
if(_6e[i]!=_70){
_71=_6e[i];
break;
}
}
var _72=_6c.split(_71);
var _73=_72[0];
var _74=_72[1];
var _75;
if(_73.indexOf(_70)!=-1){
_75=true;
_73=_73.replace(_70,"<span class='"+_70+"'>placeholder</span>");
}else{
_75=false;
_74=_74.replace(_70,"<span class='"+_70+"'>placeholder</span>");
}
if(_74==""){
_6b.innerHTML=_73;
dojo.place(_6f,dojo.query("span."+_70,_6b)[0],"replace");
}else{
_6b.innerHTML=_73;
var _76=_69.parentNode.nextSibling.nextSibling;
var _77=dojo.create("tr",{"class":"blue"});
var _78=dojo.create("td",{"class":"bottom"},_77);
_78.colSpan="4";
dojo.style(_78,"paddingLeft","20px");
var _79=dojo.create("span",{innerHTML:_74},_78);
dojo.place(_77,_76,"after");
if(_75){
dojo.place(_6f,dojo.query("span."+_70,_6b)[0],"replace");
}else{
dojo.place(_6f,dojo.query("span."+_70,_79)[0],"replace");
}
dojo.query("td.day",_76).forEach(function(_7a){
dojo.removeClass(_7a,"bottom");
});
if(_73==""){
dojo.removeClass(_69,"top");
}
dojo.query("th.type",_69.parentNode)[0].rowSpan="4";
}
return "Parsed Successfully";
}
if(_6a.length!=_6e.length){
throw new Error("The text string '"+_6c+"' from the 'FrequencyPatternSelector.properties' "+"has the incorrect number of placeholders.");
}
var _7b=dojo.clone(_6a);
_6a.forEach(dojo.destroy);
for(i=0;i<_6e.length;i++){
var _7c=_6e[i];
_6c=_6c.replace(_7c,"<span class='"+_7c+"'>placeholder</span>");
}
_6b.innerHTML=_6c;
_7b.forEach(function(_7d,i){
dojo.removeClass(_7d,"node-needs-replacement");
var _7e=_7d.className.match(_6d);
dojo.place(_7d,dojo.query("span."+_7e,_69)[0],"replace");
});
return "Parsed Successfully";
}});
return curam.util.FrequencyEditor;
});
