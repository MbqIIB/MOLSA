dojo.require("curam.date");
var o3_dateFormat=jsDF;
var o3_dateTimeFormat=jsTF;
var o3_timeSeparator=jsTS;
var o3_dateTimeFormatString=jsDTFs;
var o3_dateFormatString=jsDFs;
function ConversionResult(_1,_2){
this.value=_1;
this.msg=_2;
};
function SvrUnboundedString_convert(_3){
return new ConversionResult(null,null);
};
function SvrUnboundedString_getValueFromInput(_4){
return null;
};
function SvrUnboundedString_format(_5){
return _5;
};
function SvrBlob_convert(_6){
return new ConversionResult(null,null);
};
function SvrBlob_getValueFromInput(_7){
return null;
};
function SvrBlob_format(_8){
return _8;
};
function SvrMoney_convert(_9){
return new ConversionResult(null,null);
};
function SvrMoney_getValueFromInput(_a){
return null;
};
function SvrMoney_format(_b){
return _b;
};
function SvrString_convert(_c){
var _d=new ConversionResult(null,null);
if(_c&&_c!=""){
if(_c.length>this.size){
_d.msg=buildMessage(SVR_STRING_MSG,new Array(_c,""+_c.length,""+this.size));
}else{
_d.value=_c;
}
}
return _d;
};
function SvrString_getValueFromInput(_e){
return _e.value;
};
function SvrString_format(_f){
return _f;
};
function SvrChar_convert(_10){
var _11=new ConversionResult(null,null);
if(_10&&_10!=""){
if(_10.length!=1){
_11.msg=buildMessage(SVR_CHAR_MSG,new Array(_10));
}else{
_11.value=_10;
}
}
return _11;
};
function SvrChar_getValueFromInput(_12){
return _12.value;
};
function SvrChar_format(_13){
return _13;
};
function SvrBoolean_convert(_14){
var _15=new ConversionResult(null,null);
if(value&&value!=""){
value=value.toLowerCase();
if(value!="true"&&value!="false"){
_15.msg=buildMessage(SVR_BOOLEAN_MSG,new Array(value));
}else{
var _16=value=="true"?true:false;
_15.value=_16;
}
}
return _15;
};
function SvrBoolean_getValueFromInput(_17){
return _17.value;
};
function SvrBoolean_format(_18){
return _18;
};
function SvrInt64_convert(_19){
return new ConversionResult(null,null);
};
function SvrInt64_getValueFromInput(_1a){
return _1a.value;
};
function SvrInt64_format(_1b){
return _1b;
};
function SvrInt32_convert(_1c){
var _1d=2147483647;
var _1e=-2147483648;
var _1f=new ConversionResult(null,null);
if(_1c&&_1c!=""){
var _20=_1c-0;
if(isNaN(_20)||_20<_1e||_20>_1d){
_1f.msg=buildMessage(SVR_INT32_MSG,new Array(_1c));
}else{
_1f.value=_20;
}
}
return _1f;
};
function SvrInt32_getValueFromInput(_21){
return _21.value;
};
function SvrInt32_format(_22){
return _22;
};
function SvrInt16_convert(_23){
var _24=32767;
var _25=-32768;
var _26=new ConversionResult(null,null);
if(_23&&_23!=""){
var _27=_23-0;
if(isNaN(_27)||_27<_25||_27>_24){
_26.msg=buildMessage(SVR_INT16_MSG,new Array(_23));
}else{
_26.value=_27;
}
}
return _26;
};
function SvrInt16_getValueFromInput(_28){
return _28.value;
};
function SvrInt16_format(_29){
return _29;
};
function SvrInt8_convert(_2a){
var _2b=127;
var _2c=-128;
var _2d=new ConversionResult(null,null);
if(_2a&&_2a!=""){
var _2e=_2a-0;
if(isNaN(_2e)||_2e<_2c||_2e>_2b){
_2d.msg=buildMessage(SVR_INT8_MSG,new Array(_2a));
}else{
_2d.value=_2e;
}
}
return _2d;
};
function SvrInt8_getValueFromInput(_2f){
return _2f.value;
};
function SvrInt8_format(_30){
return _30;
};
function SvrFloat_convert(_31){
var _32=new ConversionResult(null,null);
if(_31&&_31!=""){
var _33=_31-0;
if(isNaN(_33)){
_32.msg=buildMessage(SVR_FLOAT_MSG,new Array(_31));
}else{
_32.value=_33;
}
}
return _32;
};
function SvrFloat_getValueFromInput(_34){
return _34.value;
};
function SvrFloat_format(_35){
return _35;
};
function SvrDouble_convert(_36){
var _37=new ConversionResult(null,null);
if(_36&&_36!=""){
var _38=_36-0;
if(isNaN(_38)){
_37.msg=buildMessage(SVR_DOUBLE_MSG,new Array(_36));
}else{
_37.value=_38;
}
}
return _37;
};
function SvrDouble_getValueFromInput(_39){
return _39.value;
};
function SvrDouble_format(_3a){
return _3a;
};
function SvrDate_convert(_3b){
var _3c=new ConversionResult(null,null);
if(_3b&&_3b!=""){
var _3d=curam.date.getDateFromFormat(_3b,o3_dateFormat);
if(isNaN(_3d)||_3d==0){
_3c.msg=buildMessage(SVR_DATE_MSG,new Array(_3b,o3_dateFormatString));
}else{
_3c.value=_3d;
}
}
return _3c;
};
function SvrDate_getValueFromInput(_3e){
return _3e.value;
};
function SvrDate_format(_3f){
return curam.date.formatDate(new Date(_3f),o3_dateFormat);
};
function SvrDateTime_convert(_40){
var _41=new ConversionResult(null,null);
if(_40&&_40!=""){
var _42=curam.date.getDateFromFormat(_40,o3_dateTimeFormat);
if(isNaN(_42)||_42==0){
_41.msg=buildMessage(SVR_DATETIME_MSG,new Array(_40,o3_dateTimeFormatString));
}else{
_41.value=_42;
}
}
return _41;
};
function SvrDateTime_getValueFromInput(_43){
var _44=_43.name;
_44=_43.name.substring(0,_44.lastIndexOf("."));
var _45=_43.value;
var _46=dojo.byId(_44+".HOUR");
var _47=dojo.byId(_44+".MIN");
var _48=_46.options[_46.selectedIndex].text;
var min=_47.options[_47.selectedIndex].text;
if(_48!=""&&min!=""){
return value=_45+" "+_48+o3_timeSeparator+min;
}else{
return "";
}
};
function SvrDateTime_format(_49){
return curam.date.formatDate(new Date(_49),o3_dateTimeFormat);
};
function v(_4a,_4b){
if(_4a==null||_4a==""){
return "";
}
var _4c=typeInfoRepository[_4a];
var msg=_4c.doPreConversionValidation(_4c.getValueFromInput(_4b));
if(msg!=null){
return msg;
}
var _4d=_4c.doConversion(_4c.getValueFromInput(_4b));
if(_4d.msg!=null){
return _4d.msg;
}
msg=_4c.doPostConversionValidation(_4d.value);
if(msg!=null){
return msg;
}
if(_4c.domainValidation&&_4c.domainValidation.custom){
if(window[_4c.domainValidation.custom]==null){
alert("The custom validation function '"+_4c.domainValidation.custom+"' associated with the domain '"+_4c.typeName+" could not be found");
}else{
msg=window[_4c.domainValidation.custom](_4b);
}
}
if(msg!=null){
return buildMessage(CUSTOM_VALIDATION_MSG,new Array(_4b.value,msg));
}
return "";
};
function pv(_4e,_4f,_50){
var _51=typeInfoRepository[_4e];
var _52=_51.doPreValidationFormatting(_4f.value);
if(_52!=null){
_4f.value=_52;
}
};
function TypeInfo_doPreConversionValidation(_53){
_53=this.doPreValidationFormatting(_53);
if(this.domainValidation&&this.domainValidation.minchar){
if(_53.length<this.domainValidation.minchar){
return buildMessage(MIN_LENGTH_MSG,new Array(this.domainValidation.minchar,_53.length));
}
}
return null;
};
function TypeInfo_doPostConversionValidation(_54){
if(this.domainValidation&&this.domainValidation.minimum){
if(_54<this.domainValidation.minimum){
return buildMessage(MIN_VALUE_MSG,new Array(this.doFormatting(_54),this.doFormatting(this.domainValidation.minimum)));
}
}
if(this.domainValidation&&this.domainValidation.maximum){
if(_54>this.domainValidation.maximum){
return buildMessage(MAX_VALUE_MSG,new Array(this.doFormatting(_54),this.doFormatting(this.domainValidation.maximum)));
}
}
return null;
};
function TypeInfo_doPreValidationFormatting(_55){
if(this.domainValidation!=null){
return this.domainValidation.doPreValidationFormatting(_55);
}else{
return null;
}
};
function TypeInfo(_56,_57,_58,_59,_5a,_5b,_5c,_5d){
this.doPreValidationFormatting=TypeInfo_doPreValidationFormatting;
this.doPreConversionValidation=TypeInfo_doPreConversionValidation;
this.doPostConversionValidation=TypeInfo_doPostConversionValidation;
this.toString=TypeInfo_toString;
this.typeName=_56;
this.definedAs=_57;
this.codeTableName=_5a;
var _5e=null;
if(this.definedAs&&this.definedAs!=""){
_5e=typeInfoRepository[this.definedAs];
this.doConversion=_5e.doConversion;
this.getValueFromInput=_5e.getValueFromInput;
this.doFormatting=_5e.doFormatting;
}else{
this.doConversion=_5b;
this.getValueFromInput=_5c;
this.doFormatting=_5d;
}
var _5f=false;
this.domainValidation=null;
if(_59&&_59!=""){
_5f=true;
}
if(_5e!=null){
if(_58==0){
this.size=_5e.size;
}else{
this.size=_58;
}
this.domainValidation=_5e.domainValidation;
if(this.domainValidation!=null&&_5f){
this.domainValidation=this.domainValidation.clone();
this.domainValidation.parseAttributes(_59,this);
}
}
if(this.domainValidation==null&&_5f){
this.domainValidation=new DomainValidation(_59,this);
}
if(this.domainValidation&&this.domainValidation!=null){
}
};
function TypeInfo_toString(){
var str="Type Name: "+this.typeName+" Defined As: "+this.definedAs+" Size: "+this.size;
alert(this.typeName+this.domainValidation.upper);
if(this.domainValidation){
str+=" Domain Attributes : "+this.domainValidation.toString();
}
if(this.codeTableName){
str+=" Code Table Name : "+this.codeTableName;
}
return str;
};
function addType(_60){
typeInfoRepository[_60.typeName]=_60;
};
function DomainValidation_toString(){
return "Upper"+this.upper+"Leading"+this.leading+"Trailing"+this.trailing+"Compress"+this.compress+"MinChar"+this.minchar+"Minimum"+this.minimum+"Maximum"+this.maximum+"Pattern"+this.pattern+"Custom"+this.custom;
};
function DomainValidation_doPreValidationFormatting(_61){
if(_61&&_61!=""){
if(this.compress){
_61=compressSpaces(_61);
}else{
if(this.leading){
_61=stripLeadingSpaces(_61);
}
if(this.trailing){
_61=stripTrailingSpaces(_61);
}
}
if(this.upper){
_61=_61.toUpperCase();
}
}
return new String(_61);
};
function DomainValidation_clone(){
var _62=new DomainValidation();
_62.upper=this.upper;
_62.leading=this.leading;
_62.trailing=this.trailing;
_62.compress=this.compress;
_62.minchar=this.minchar;
_62.minimum=this.minimum;
_62.maximum=this.maximum;
_62.pattern=this.pattern;
_62.custom=this.custom;
return _62;
};
function DomainValidation_parseAttributes(_63,_64){
if(!_63||_63==""){
return;
}
var _65=_63.split(/\s+/g);
for(i=0;i<_65.length;i+=2){
var _66=_65[i];
var _67=_65[i+1];
_66=_66.toLowerCase();
_67=_67.substring(1,_67.length-1);
if(_66=="upper"){
this.upper=str2bool(_67);
}else{
if(_66=="leading"){
this.leading=str2bool(_67);
}else{
if(_66=="trailing"){
this.trailing=str2bool(_67);
}else{
if(_66=="compress"){
this.compress=str2bool(_67);
}else{
if(_66=="minchar"){
this.minchar=_67-0;
}else{
if(_66=="minimum"){
var _68=o3_dateFormat;
var _69=o3_dateTimeFormat;
o3_dateFormat="ISO8601";
o3_dateTimeFormat="ISO8601";
var _6a=_64.doConversion(_67);
o3_dateFormat=_68;
o3_dateTimeFormat=_69;
if(_6a.msg==null){
this.minimum=_6a.value;
}else{
alert(_6a.msg);
}
}else{
if(_66=="maximum"){
var _68=o3_dateFormat;
var _69=o3_dateTimeFormat;
o3_dateFormat="ISO8601";
o3_dateTimeFormat="ISO8601";
var _6a=_64.doConversion(_67);
o3_dateFormat=_68;
o3_dateTimeFormat=_69;
if(_6a.msg==null){
this.maximum=_6a.value;
}else{
alert(_6a.msg);
}
}else{
if(_66=="pattern"){
this.pattern=_67;
}else{
if(_66=="custom"){
this.custom=_67;
}
}
}
}
}
}
}
}
}
}
};
function DomainValidation(_6b,_6c){
this.parseAttributes=DomainValidation_parseAttributes;
this.clone=DomainValidation_clone;
this.print=DomainValidation_toString;
this.doPreValidationFormatting=DomainValidation_doPreValidationFormatting;
this.upper=false;
this.leading=false;
this.trailing=false;
this.compress=false;
this.minchar=0;
this.minimum="";
this.maximum="";
this.pattern=null;
this.custom="";
if(_6b&&_6b!=""){
this.parseAttributes(_6b,_6c);
}
};
function stripWhitespace(_6d){
if(_6d){
var _6e="";
for(var i=0;i<_6d.length;i++){
if(_6d.charAt(i)!=" "){
_6e+=_6d.charAt(i);
}
}
return _6e;
}
};
function str2bool(_6f){
var _70=_6f.toLowerCase();
if(_70=="true"||_70=="yes"){
return true;
}else{
return false;
}
};
function stripLeadingSpaces(_71){
while(_71.substring(0,1)==" "){
_71=_71.substring(1,_71.length);
}
return _71;
};
function stripTrailingSpaces(_72){
while(_72.substring(_72.length-1,_72.length)==" "){
_72=_72.substring(0,_72.length-1);
}
return _72;
};
function compressSpaces(_73){
_73=stripLeadingSpaces(_73);
_73=stripTrailingSpaces(_73);
var _74="";
var _75=true;
var _76=0;
for(var i=0;i<_73.length;i++){
var _77=(_73.charAt(i)==" ")||(_73.charAt(i)=="\n")||(_73.charAt(i)=="\t");
if(!_77||!_75){
_74+=_73.charAt(i);
}
_75=_77;
}
return _74;
};
function getDomainFromOnblur(_78){
var _79=_78+"";
var _7a=_79.indexOf("'");
var end=_79.lastIndexOf("'");
if(_7a==-1){
_7a=_79.indexOf("\"");
}
if(end==-1){
end=_79.lastIndexOf("\"");
}
return _79.substring(_7a+1,end);
};
function doCustomFormPreValidation(_7b){
var _7c=jsPageID+"_formPreValidation";
if(window[_7c]!=null){
var _7d=window[_7c](_7b);
if(_7d==false){
return false;
}
}
return true;
};
function doCustomFormPostValidation(_7e){
var _7f=jsPageID+"_formPostValidation";
if(window[_7f]!=null){
var _80=window[_7f](_7e);
if(_80==false){
return false;
}
}
return true;
};
function vf(_81,_82,_83){
var evt=dojo.fixEvent(_83);
var _84=dojo.stopEvent;
if(cm.wasFormSubmitted(_81)){
_84(evt);
return false;
}
var _85=doCustomFormPreValidation(_81);
if(_85==false){
_84(evt);
return false;
}
var _86="";
var _87=null;
for(var i=0;i<_81.elements.length;i++){
var _88=_81.elements[i];
if(_88.type=="text"||_88.tagName=="TEXTAREA"){
var _89=_88.onblur;
var _8a=getDomainFromOnblur(_88.onblur);
var msg=v(_8a,_88);
if(msg.length>0){
_86+=addFieldLabelToMsg(msg,_88)+"\n";
if(_87==null){
_87=_88;
}
}
}
}
if(_86.length>0){
alert(_86);
_87.focus();
_84(evt);
return false;
}
var _85=doCustomFormPostValidation(_81);
if(_85==false){
_84(evt);
return false;
}
cm.setFormSubmitted(_81,1);
return true;
};
function addFieldLabelToMsg(msg,_8b){
var _8c=getFieldLabelFromInput(_8b);
if(_8c!=null){
return buildMessage(FIELD_MSG,new Array(_8c,msg));
}else{
return msg;
}
};
function getFieldLabel(_8d,_8e){
var _8f=getField(_8d,_8e);
if(_8f){
return getFieldLabelFromInput(_8f);
}
return null;
};
function getFieldLabelFromInput(_90){
var _91=_90.name;
var _92=_91.split(".");
_91="__o3fwl."+_92[1]+"."+_92[2];
var _93=document.getElementsByName(_91)[0];
var _94=null;
if(_93){
_94=_93.value;
}
if(_94&&_94!=""){
return _94;
}else{
return null;
}
};
function getField(_95,_96){
var _96="__o3fwp."+_95+"."+_96;
var _97=document.getElementsByName(_96)[0];
if(_97){
return _97;
}else{
return null;
}
};
function getBaseDomain(_98){
var _99=typeInfoRepository[_98];
while(true){
if(!_99){
alert(buildMessage(UNKNOWN_DOMAIN,new Array(_98)));
return null;
}
var _9a=_99.definedAs;
if(!_9a){
return _99.typeName;
}
_99=typeInfoRepository[_9a];
}
};
var regExp=new RegExp("(%\\d)","g");
function createMessageOLD(msg,_9b){
var _9c=msg;
var tmp=msg.split(invRe);
var _9d=new Array();
var _9e=0;
for(var i=0;i<tmp.length;i++){
if(tmp[i]){
_9d[_9e++]=tmp[i];
}
}
alert(_9d.length);
for(var j=0;j<_9d.length;j++){
_9c=_9c.replace(_9d[j],_9b[_9d[j].slice(1)-1]);
}
return _9c;
};
function buildMessage(msg,_9f){
var _a0=new String(msg);
var _a1=new Array();
_a1=msg.match(regExp);
if(_a1){
for(var i=0;i<_a1.length;i++){
_a0=_a0.replace(_a1[i],_9f[_a1[i].slice(1)-1]);
}
}
return _a0;
};
var typeInfoRepository=new Array();
addType(new TypeInfo("SVR_BOOLEAN","",0,"","",SvrBoolean_convert,SvrBoolean_getValueFromInput,SvrBoolean_format));
addType(new TypeInfo("SVR_UNBOUNDED_STRING","",0,"","",SvrUnboundedString_convert,SvrUnboundedString_getValueFromInput,SvrUnboundedString_format));
addType(new TypeInfo("SVR_STRING","",0,"","",SvrString_convert,SvrString_getValueFromInput,SvrString_format));
addType(new TypeInfo("SVR_DATE","",0,"","",SvrDate_convert,SvrDate_getValueFromInput,SvrDate_format));
addType(new TypeInfo("SVR_DATETIME","",0,"","",SvrDateTime_convert,SvrDateTime_getValueFromInput,SvrDateTime_format));
addType(new TypeInfo("SVR_INT64","",0,"","",SvrInt64_convert,SvrInt64_getValueFromInput,SvrInt64_format));
addType(new TypeInfo("SVR_INT32","",0,"","",SvrInt32_convert,SvrInt32_getValueFromInput,SvrInt32_format));
addType(new TypeInfo("SVR_INT16","",0,"","",SvrInt16_convert,SvrInt16_getValueFromInput,SvrInt16_format));
addType(new TypeInfo("SVR_INT8","",0,"","",SvrInt8_convert,SvrInt8_getValueFromInput,SvrInt8_format));
addType(new TypeInfo("SVR_MONEY","",0,"","",SvrMoney_convert,SvrMoney_getValueFromInput,SvrMoney_format));
addType(new TypeInfo("SVR_FLOAT","",0,"","",SvrFloat_convert,SvrFloat_getValueFromInput,SvrFloat_format));
addType(new TypeInfo("SVR_DOUBLE","",0,"","",SvrDouble_convert,SvrDouble_getValueFromInput,SvrDouble_format));
addType(new TypeInfo("SVR_BLOB","",0,"","",SvrBlob_convert,SvrBlob_getValueFromInput,SvrBlob_format));
addType(new TypeInfo("SVR_CHAR","",0,"","",SvrChar_convert,SvrChar_getValueFromInput,SvrChar_format));

