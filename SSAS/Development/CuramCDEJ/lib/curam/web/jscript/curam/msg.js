//>>built
define("curam/msg",["curam/define","curam/util","curam/util/ResourceBundle"],function(){
dojo.requireLocalization("curam.application","Debug");
var _1=new curam.util.ResourceBundle("Debug");
curam.define.singleton("curam.msg",{_cache:{},_msgSetters:[],_msgPublishers:[],_msgHandlerMap:{},_msgSubscribers:{},_currentPublishedTopics:{},publish:function(_2,_3,_4){
var _5=curam.msg._currentPublishedTopics;
if(_5[_2]){
return;
}
_5[_2]=_4;
curam.msg._cache[_4]=_3;
try{
var _6=curam.msg._msgSubscribers[_2];
if(_6){
for(var i=0;i<_6.length;i++){
if(_6[i].srcId==_2){
continue;
}
if(_6[i].setters!=null){
try{
var _7=false;
for(var j=0;j<_6[i].setters.length;j++){
if(_6[i].setters[j].setValue(_6[i].destId,_3)){
_7=true;
break;
}
}
if(_7){
continue;
}
}
catch(e){
curam.debug.log("curam.msg.publish "+_1.getProperty("curam.msg.publish.exception")+e);
}
}
var _8=curam.msg._msgSetters;
var _7=false;
for(var j=0;j<_8.length;j++){
try{
if(_8[j].setValue(_6[i].destId,_3)){
if(!_6[i].setters){
_6[i].setters=[];
}
_6[i].setters.push(_8[j]);
_7=true;
break;
}
}
catch(e){
curam.debug.log("curam.msg.publish "+_1.getProperty("curam.msg.publish.exception")+e);
}
}
if(!_7){
curam.debug.log("curam.msg.publish"+_1.getPropery("curam.msg.publish.unsuscribe.1")+"'"+_3+"'"+_1.getPropery("curam.msg.publish.unsuscribe.2")+"'"+_4+"' "+_1.getPropery("curam.msg.publish.unsuscribe.3")+_2);
_6.splice(i,1);
}
}
}
}
catch(e){
_5[_2]=null;
throw e;
}
_5[_2]=null;
},processingTopicSource:function(id){
},getCached:function(_9){
return curam.msg._cache[_9];
},registerMessageSetter:function(_a){
curam.msg._msgSetters.splice(0,0,_a);
},registerMessagePublisher:function(_b){
curam.msg._msgPublishers.splice(0,0,_b);
},registerMsgSubscribers:function(_c){
var _d=curam.msg._msgSubscribers;
for(var i=0;i<_c.length;i++){
if(!_d[_c[i].destId]){
_d[_c[i].destId]=[];
}
_d[_c[i].destId].push(_c[i]);
if(_c[i].extraSubscribers){
curam.msg.registerMsgSubscribers(_c[i].extraSubscribers);
}
}
}});
dojo.declare("curam.msg.Subscriber",null,{constructor:function(){
if(dojo.isArray(destIds)){
this.extraSubscribers=[];
for(var i=1;i<destIds.length;i++){
this.extraSubscribers.push(new curam.msg.Subscriber(srcId,destIds[i]));
}
destIds=destIds[0];
}
this.srcId=srcId;
this.destId=destIds;
var _e=curam.msg._msgPublishers;
for(var i=0;i<_e.length;i++){
if(_e[i].setUp(srcId,destIds)){
break;
}
}
},setters:null});
curam.msg.registerMessagePublisher({setUp:function(_f,_10){
var _11=dojo.byId(_f);
if(_11&&input.tagName=="INPUT"&&_11.type&&_11.type.toLowerCase()=="text"){
var _12=function(){
curam.msg.publish(_10,_11.value,_f);
};
curam.util.connect(_11,"onblur",_12);
curam.util.connect(_11,"onkeyup",function(evt){
if(evt.keyCode==evt.KEY_ENTER){
_12();
}
});
if(_11.value&&_11.value.length>0){
dojo.addOnLoad(_12);
}
return true;
}
return false;
}});
curam.msg.registerMessagePublisher({setUp:function(_13,_14){
var _15=dijit.byId(_13);
if(_15&&_15.ns=="curam"){
if(_15.widgetType=="DatePicker"||_15.widgetType=="DatePickerDojo"){
curam.util.connect(_15,"setDate",function(){
if(curam.msg._currentPublishedTopics[_14]){
return;
}
curam.msg.publish(_14,(_15.date?_15.date:_15.value),_13);
});
return true;
}else{
if(_15.widgetType=="DropdownDatePicker"||_15.widgetType=="DropdownDatePickerDojo"){
var _16=function(){
curam.debug.log("curam.msg.registerMessagePublisher() addWidgetListener");
curam.util.connect(_15.subwidget,"setDate",function(){
if(curam.msg._currentPublishedTopics[_14]){
return;
}
curam.msg.publish(_14,(_15.subwidget.date?_15.subwidget.date:_15.subwidget.value),_13);
});
};
if(_15.subwidget!=null){
_16();
}else{
var dt=dojo.connect(_15,"init",function(){
_16();
dojo.disconnect(dt);
});
}
return true;
}
}
}
return false;
}});
curam.msg.registerMessageSetter({id:"InputTextSetter",setValue:function(_17,_18){
curam.debug.log("curam.msg.registerMessageSetter: "+_1.getProperty("curam.msg.publish.text.input"));
var _17=dojo.byId(_17);
if(!_17||_17.tagName!="INPUT"||!_17.type||_17.type.toLowerCase()!="text"){
curam.debug.log("curam.msg.registerMessageSetter: "+_1.getProperty("curam.msg.publish.text.input.issue")+_17);
return false;
}
if(_18 instanceof Date){
require(["curam/date"]);
var df=_17.getAttribute("dateFormat");
if(!df){
df="d/M/yyyy";
}
_18=curam.date.formatDate(_18,df);
}
_17.value=_18;
return true;
}});
curam.msg.registerMessageSetter({id:"CuramDatePickerSetter",setValue:function(_19,_1a){
curam.debug.log("curam.msg.registerMessageSette: "+_1.getProperty("curam.msg.publish.date.input"));
var _1b=dijit.byId(_19);
if(!_1b||_1b.ns!="curam"||(_1b.widgetType!="DatePicker"&&_1b.widgetType!="DropdownDatePicker")){
curam.debug.log("curam.msg.registerMessageSetter: "+_1.getProperty("curam.msg.publish.date.input.issue")+_19);
return false;
}
var df=_1b.dateFormat;
curam.debug.log("curam.msg.registerMessageSetter: "+_1.getProperty("curam.msg.publish.date.input.set")+_19);
if(!(_1a instanceof Date)){
_1a=curam.date.getDateFromFormat(_1a,df);
}
_1b.setDate(_1a);
return true;
}});
curam.msg.registerMessageSetter({id:"CuramDatePickerDojoSetter",setValue:function(_1c,_1d){
curam.debug.log("curam.msg.registerMessageSetter: curam:DatePickerDojo");
var _1e=dijit.byId(_1c);
if(!_1e||_1e.ns!="curam"||(_1e.widgetType!="DatePickerDojo"&&_1e.widgetType!="DropdownDatePickerDojo")){
curam.debug.log("curam.msg.registerMessageSetter: "+"curam:DatePickerDojo "+_1.getProperty("curam.msg.publish.picker.unable")+_1c);
return false;
}
var df=curam.widget.DatePicker.prototype.dateFormat;
curam.debug.log("curam.msg.registerMessageSetter: curam:DatePickerDojo "+_1.getProperty("curam.msg.publish.picker.able")+_1c);
if(!(_1d instanceof Date)){
_1d=curam.date.getDateFromFormat(_1d,df);
curam.debug.log("curam.msg.registerMessageSetter:"+"curam:DatePickerDojo "+_1.getProperty("curam.msg.publish.picker.translated")+_1d);
}
_1e.setDate(_1d);
return true;
}});
return curam.msg;
});
