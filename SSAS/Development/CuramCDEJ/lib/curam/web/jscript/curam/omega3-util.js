//>>built
define("curam/omega3-util",["dojo/dom-geometry","curam/util","curam/html","curam/GlobalVars","cm/_base/_dom","cm/_base/_form","curam/util/RuntimeContext","curam/util/ResourceBundle"],function(_1){
dojo.requireLocalization("curam.application","Debug");
var _2=new curam.util.ResourceBundle("Debug");
var _3={getAnchorPosition:function(_4){
var _5=false;
var _6=new Object();
var x=0;
var y=0;
x=AnchorPosition_getPageOffsetLeft(document.getElementById(_4));
y=AnchorPosition_getPageOffsetTop(document.getElementById(_4));
_6.x=x;
_6.y=y;
return _6;
},getAnchorWindowPosition:function(_7){
var _8=getAnchorPosition(_7);
var x=0;
var y=0;
if(isNaN(window.screenX)){
x=_8.x-document.body.scrollLeft+window.screenLeft;
y=_8.y-document.body.scrollTop+window.screenTop;
}else{
x=_8.x+window.screenX+(window.outerWidth-window.innerWidth)-window.pageXOffset;
y=_8.y+window.screenY+(window.outerHeight-24-window.innerHeight)-window.pageYOffset;
}
_8.x=x;
_8.y=y;
return _8;
},AnchorPosition_getPageOffsetLeft:function(el){
var ol=el.offsetLeft;
while((el=el.offsetParent)!=null){
ol+=el.offsetLeft;
}
return ol;
},AnchorPosition_getWindowOffsetLeft:function(el){
var _9=document.body.scrollLeft;
return AnchorPosition_getPageOffsetLeft(el)-_9;
},AnchorPosition_getPageOffsetTop:function(el){
var ot=el.offsetTop;
while((el=el.offsetParent)!=null){
ot+=el.offsetTop;
}
return ot;
},AnchorPosition_getWindowOffsetTop:function(el){
var _a=document.body.scrollTop;
return AnchorPosition_getPageOffsetTop(el)-_a;
},PopupMapping:function(_b,_c){
this.name=_b;
this.targetWidgetID=_c;
},openPopupFromCTCode:function(_d,_e,_f,_10){
var _11=_f.parentNode.parentNode.parentNode.childNodes[0];
var _12=dijit.byNode(_11);
if(_12){
var _13=_12.getValue();
}else{
var _11=_f.parentNode.parentNode.parentNode.childNodes[1];
var _13=_11.options[_11.selectedIndex].value;
}
if(_13!=""){
if(curam.popupCTCodeMappings[_13]){
openPopupFromDomain(_d,_e,curam.popupCTCodeMappings[_13],_10,false);
}
}
},openPopupFromCTCodeNoDomain:function(_14,_15,_16,_17){
var _18=_16.parentNode.parentNode.parentNode.childNodes[2];
var _19=dijit.byNode(_18);
var _1a;
var _1b;
var _1c;
var _1d;
var _1e;
var _1f;
var _20;
var _21;
if(_19){
var _22=_19.getValue();
}else{
var _18=_16.parentNode.parentNode.parentNode.childNodes[1];
var _22=_18.options[_18.selectedIndex].value;
}
if(_22!=""){
if(curam.popupCTCodeMappings[_22]){
_1a=getPopupProperties(curam.popupCTCodeMappings[_22]);
_1b=_1a.pageID;
_1c=_1a.createPageID;
_1d=_1a.height;
_1e=_1a.width;
_1f=_1a.scrollBars;
_20=_1a.insertMode;
_21=_1a.codeTableCode;
var _23=_1a.uimType;
if(_23=="DYNAMIC"){
openPopup(_14,_15,null,_1b,_1c,_1e,_1d,_1f,_20,null,null,_17,false);
}
}
}
},openPopupFromDomain:function(_24,_25,_26,_27,_28){
var _29=getPopupProperties(_26);
var _2a=_29.pageID;
var _2b=_29.createPageID;
var _2c=_29.height;
var _2d=_29.width;
var _2e=_29.scrollBars;
var _2f=_29.insertMode;
var _30=_29.codeTableCode;
openPopup(_24,_25,_26,_2a,_2b,_2d,_2c,_2e,_2f,_30,_27,_28);
},openPopupNoDomain:function(_31,_32,_33,_34,_35,_36,_37,_38,_39,_3a){
openPopup(_31,_32,null,_33,_34,_35,_36,_37,_38,null,null,_39,_3a);
},openPopup:function(_3b,_3c,_3d,_3e,_3f,_40,_41,_42,_43,_44,_45,_46){
setMappingsLoaded(_3c);
var _47=getAnchorWindowPosition(_3b);
_47.y=_47.y+25;
if(_47.x+_40>screen.availWidth){
_47.x-=(_47.x+_40)-screen.availWidth;
_47.x-=15;
}
if(_47.y+_41>screen.availHeight){
_47.y-=(_47.y+_41)-screen.availHeight;
_47.y-=35;
}
if(curam.popupWindow&&!curam.popupWindow.closed){
curam.popupWindow.close();
}
curam.currentPopupInstanceName=_3c;
curam.currentPopupProps=setPopupProperties(_3e,_3d,_44,_40,_41,_42,_3f,_43,null);
var ctx=jsScreenContext;
ctx.addContextBits("POPUP");
ctx.clear("TAB|TREE|AGENDA");
var url="";
if(_46==true){
url=_3f;
}else{
url=_3e;
}
if(_45&&_45.length>0){
url=url+"?"+_45;
url+="&";
}else{
url+="?";
}
url+=ctx.toRequestString();
if(window.curam.util.showModalDialog){
curam.util.showModalDialog(url,null,_40,_41,_47.x,_47.y,false,null,null);
}else{
curam.popupWindow=window.open(url,createWindowName(curam.currentPopupInstanceName),getPopupAttributes(_40,_41,_42)+"screenX="+_47.x+",left="+_47.x+",screenY="+_47.y+","+"top="+_47.y);
}
},addPopupMapping:function(_48,_49,_4a){
var _4b=curam.popupMappingRepository;
if(curam.popupMappingLoaded[_48]==true){
return;
}
if(_4b[_48]==null){
_4b[_48]=[];
_4b[_48][_49]=[];
_4b[_48][_49][0]=_4a;
}else{
if(_4b[_48][_49]==null){
_4b[_48][_49]=[];
_4b[_48][_49][0]=_4a;
}else{
var _4c=_4b[_48][_49].length;
_4b[_48][_49][_4c]=_4a;
}
}
},setMappingsLoaded:function(_4d){
curam.popupMappingLoaded[_4d]=true;
},executeMapping:function(_4e,_4f){
var pmr=curam.popupMappingRepository;
var _50=curam.currentPopupInstanceName;
if(!pmr||!pmr[_50]||pmr[_50][_4e]==null){
return;
}
for(var i=0;i<pmr[_50][_4e].length;i++){
var _51=null;
_51=dojo.byId(pmr[_50][_4e][i]);
if(_51.tagName=="SPAN"){
_51.innerHTML=curam.html.splitWithTag(_4f,null,null,escapeXML);
_51.setAttribute("title",_4f);
_51._reposition=_51._reposition||dojo.query("div",_51).length>0;
if(_51._reposition){
var _52=cm.nextSibling(_51,"span");
if(_52){
var _53=_1.getMarginBoxSimple(_51).h;
var _54=_1.getMarginBoxSimple(_52).h;
dojo.style(_52,"position","relative");
var _55=_53-_54-((dojo.isIE&&dojo.isIE<9)?2:0);
dojo.style(_52,"bottom","-"+(_55)+"px");
}
}
}else{
if(_51.tagName=="TEXTAREA"){
if(curam.currentPopupProps.insertMode=="insert"){
insertAtCursor(_51,escapeXML(_4f));
}else{
if(curam.currentPopupProps.insertMode=="append"){
_51.value+=_4f;
}else{
_51.value=_4f;
}
}
}else{
if(dijit.byId(pmr[_50][_4e][i])){
dijit.byId(pmr[_50][_4e][i]).set("value",_4f);
_51.value=_4f;
}else{
_51.value=_4f;
}
}
}
}
},insertAtCursor:function(_56,_57){
if(document.selection){
_56.focus();
sel=document.selection.createRange();
sel.text=_57;
}else{
if(_56.selectionStart||_56.selectionStart=="0"){
var _58=_56.selectionStart;
var _59=_56.selectionEnd;
_56.value=_56.value.substring(0,_58)+_57+_56.value.substring(_59,_56.value.length);
}else{
_56.value+=_57;
}
}
},escapeXML:function(_5a){
return _5a.replace(/&/g,"&#38;").replace(/</g,"&#60;").replace(/>/g,"&#62;").replace(/"/g,"&#34;").replace(/'/g,"&#39;");
},executeOpenerMapping:function(_5b,_5c){
var _5d=undefined;
if(curam.util.isModalWindow()){
_5d=curam.dialog.getParentWindow(window);
}else{
if(window.dialogArguments){
_5d=window.dialogArguments[0];
}
}
if((_5d)&&(!_5d.closed)){
_5d.executeMapping(_5b,_5c);
}else{
curam.debug.log("curam.omega3-util.executeOpenerMapping:, "+_2.getProperty("curam.omega3-util.parent"));
}
},storePopupInputFromWidget:function(_5e,_5f){
var _60=null;
_60=dojo.byId(_5f).value;
if(_60){
curam.popupInputs[_5e]=_60;
}else{
curam.popupInputs[_5e]="";
}
},getPopupInput:function(_61){
if(curam.popupInputs[_61]!=null){
return curam.popupInputs[_61];
}else{
return "";
}
},PopupProperties:function(_62,_63,_64,_65,_66,_67,_68){
this.width=_63;
this.height=_64;
this.scrollBars=_65;
this.pageID=_62;
this.createPageID=_66;
if(_67==null){
this.insertMode="overwrite";
}else{
this.insertMode=_67;
}
if(_68!=null){
this.uimType=_68;
}
},setPopupProperties:function(_69,_6a,_6b,_6c,_6d,_6e,_6f,_70,_71){
if(_6b){
curam.popupCTCodeMappings[_6b]=_6a;
}
curam.popupPropertiesRepository[_6a]=new PopupProperties(_69,_6c,_6d,_6e,_6f,_70,_71);
},getPopupAttributes:function(_72,_73,_74){
var _75="width="+_72+","+"height="+_73+","+"scrollbars="+(_74?"yes":"no")+",";
return _75;
},getPopupAttributesIEModal:function(_76){
var _77="dialogWidth:"+curam.popupPropertiesRepository[_76].width+"px;"+"dialogHeight:"+curam.popupPropertiesRepository[_76].height+"px;";
return _77;
},trimFileExtension:function(_78){
var _79=_78.lastIndexOf("/")+1;
if(_79==-1){
_79=_78.lastIndexOf("\\")+1;
}
if(_79==-1){
_79=0;
}
return _78.substring(_79,_78.lastIndexOf("."));
},getPopupProperties:function(_7a){
return curam.popupPropertiesRepository[_7a];
},validateDate:function(_7b){
require(["curam/validation"]);
return curam.validation.validateDate(_7b).valid;
},addStartDate:function(_7c){
require(["curam/validation"]);
var _7d=dojo.byId("startDate").value;
var _7e=curam.validation.validateDate(_7d);
if(_7e.valid){
var _7f=dojo.byId("gotoDate");
_7f.href=curam.util.replaceUrlParam(_7f.href,"startDate",_7d);
return true;
}else{
require(["curam/validation/calendar"],function(){
alert(curam.validation.calendar.invalidGotoDateEntered.replace("%s",_7d).replace("%s",jsDFs));
});
dojo.stopEvent(_7c);
return false;
}
},checkEnter:function(_80){
if(_80.keyCode==13){
if(addStartDate(_80)){
var _81=dojo.byId("gotoDate");
window.location=_81.href;
return true;
}
return false;
}
return true;
},createWindowName:function(_82){
var _83=new String("");
for(var i=0;i<_82.length;i++){
var ch=_82.charAt(i);
if(ch=="$"||ch=="."){
_83+="_";
}else{
_83+=ch;
}
}
return _83;
},clearPopup:function(_84,_85){
var _86=_84.id.substring(0,_84.id.indexOf("_clear"));
var _87=_86+"_value";
var _88=_86+"_desc";
var _89=_86+"_deschf";
var _8a=dojo.byId(_87);
if(_8a){
if(_8a.tagName=="INPUT"){
_8a.value="";
}else{
if(_8a.tagName=="TEXTAREA"){
_8a.value="";
}
}
if(_8a.tagName=="SPAN"){
_8a.innerHTML=curam.POPUP_EMPTY_SPAN_VALUE;
}
}
var _8b=dojo.byId(_88);
if(_8b){
if(_8b.tagName=="INPUT"){
_8b.value="";
}else{
if(_8b.tagName=="TEXTAREA"){
_8b.value="";
}else{
if(_8b.tagName=="SPAN"){
_8b.innerHTML=curam.POPUP_EMPTY_SPAN_VALUE;
_8b.removeAttribute("title");
}
}
}
}
var _8c=dojo.byId(_89);
if(_8c){
if(_8c.tagName=="INPUT"){
_8c.value="";
}else{
_8c.innerHTML="&nbsp";
}
}
if(_85){
_85=dojo.fixEvent(_85);
dojo.stopEvent(_85);
}
return false;
},swapImage:function(_8d,_8e){
dojo.byId(_8d).src=_8e;
},appendTabColumn:function(_8f,_90){
var _91;
var _92=[];
dojo.query("input[name='"+_8f+"']").filter(function(_93){
return _93.checked;
}).forEach(function(_94){
_92.push(_94.value);
});
_91=_92.join("\t");
_90.href=_90.href+(_90.href.indexOf("?")==-1?"?":"&");
if(_91!=""){
_90.href=_90.href+_8f+"="+encodeURIComponent(_91);
}else{
_90.href=_90.href+_8f+"=";
}
},ToggleAll:function(e,_95){
dojo.query("input[name='"+_95+"']").forEach(function(_96){
if(_96.checked===true){
_96.checked=false;
}else{
_96.checked=true;
}
});
},ToggleSelectAll:function(e,_97){
if(e.checked){
CheckAll(_97);
}else{
ClearAll(_97);
}
},CheckAll:function(_98){
dojo.query("input[name='"+_98+"']").forEach(function(_99){
_99.checked=true;
});
},ClearAll:function(_9a){
dojo.query("input[name='"+_9a+"']").forEach(function(_9b){
_9b.checked=false;
});
},Check:function(e){
e.checked=true;
},Clear:function(e){
e.checked=false;
},ChooseSelectAll:function(e,_9c,_9d){
var _9e=dojo.byId(_9c);
if(_9e){
if(dojo.query("input[name='"+_9d+"']").every("return item.checked")){
Check(_9e);
}else{
Clear(_9e);
}
}
},selectAllIfNeeded:function(_9f,_a0){
if(dojo.query("input[name='"+_a0+"']").some("return !item.checked")){
return;
}
var _a1=dojo.byId(_9f);
if(_a1){
Check(_a1);
}
},CopyToClipboard:function(txt){
if(window.clipboardData){
clipboardData.clearData();
clipboardData.setData("Text",txt);
window.status="pasted";
window.status="";
}
},dc:function(_a2,_a3,_a4){
if(cm.wasFormSubmitted(_a2)){
var evt=dojo.fixEvent(_a4);
dojo.stopEvent(evt);
return false;
}
cm.setFormSubmitted(_a2,1);
return true;
},setFocus:function(){
curam.util.setFocus();
},setParentFocus:function(_a5){
curam.debug.log("curam.omega3-util.setParentFocus: "+_2.getProperty("curam.omega3-util.called"));
var _a6=curam.dialog.getParentWindow(window);
if(!_a6.closed){
_a6.focus();
}else{
alert("The parent window has been closed");
}
if(_a5||window.event){
dojo.stopEvent(_a5||window.event);
}
curam.dialog.closeModalDialog();
},createElement:function(_a7,_a8,_a9,_aa){
var e=dojo.create(_a7,_a8);
if(_a9){
for(key in _a9){
e.style[key]=_a9[key];
}
}
if(_aa){
e.appendChild(document.createTextNode(_aa));
}
return e;
},getParentWin:function(){
return curam.dialog.getParentWindow(window);
},addQuestionsFromPopup:function(evt){
evt=dojo.fixEvent(evt);
dojo.stopEvent(evt);
if(window._questionsAdded){
return;
}
window._questionsAdded=true;
var _ab=getParentWin();
var _ac=dojo.query("INPUT");
var _ad=[];
dojo.query("INPUT[type='checkbox']").forEach(function(_ae){
if(_ae.checked&&_ae.id.indexOf("__o3mswa")<0){
_ad.push(_ae.value);
}
});
var _af=dojo.toJson(_ad);
_ab.newQuestions=_af;
_ab.curam.matrix.Constants.container.matrix.addQuestionsFromPopup();
curam.dialog.closeModalDialog();
return false;
},addOutcomesFromPopup:function(evt){
evt=dojo.fixEvent(evt);
dojo.stopEvent(evt);
if(window._outcomesAdded){
return;
}
window._outcomesAdded=true;
var _b0=[];
dojo.query("INPUT[type='checkbox']").forEach(function(_b1){
if(_b1.checked&&_b1.id.indexOf("__o3mswa")<0){
_b0.push(_b1.value);
}
});
getParentWin().curam.matrix.Constants.container.matrix.addOutcomesFromPopup(_b0);
curam.dialog.closeModalDialog();
return false;
},addMatrixQuestionsPopupListener:function(){
addMatrixPopupListener(addQuestionsFromPopup);
},addMatrixOutcomesPopupListener:function(){
addMatrixPopupListener(addOutcomesFromPopup);
},addMatrixPopupListener:function(fn){
dojo.query("form").connect("onsubmit",fn);
},getRequestParams:function(_b2){
var _b3=[];
var uri=new dojo._Url(_b2);
if(uri.query!=null){
var _b4=uri.query.split("&");
for(var i=0;i<_b4.length;i++){
var arr=_b4[i].split("=");
_b3[arr[0]]=arr[1];
}
}
return _b3;
},openModalDialog:function(_b5,_b6,_b7,top){
curam.util.openModalDialog(_b5,_b6,_b7,top);
},initCluster:function(_b8){
var _b9=_b8.parentNode;
var _ba=dojo.query("div.toggle-group",_b9);
if(_ba.length>=1){
return _ba[0];
}
var _bb=cm.nextSibling(_b8,"p")||cm.nextSibling(_b8,"table");
if(!_bb){
return;
}
_ba=dojo.create("div",{"class":"toggle-group"},_bb,"before");
var arr=[];
var _bc=dojo.query("p.description",_b8)[0];
if(_bc){
arr.push(_bc);
var _bd=dojo.style(_b8,"marginBottom");
dojo.style(_b8,"marginBottom",0);
dojo.style(_bc,"marginBottom",_bd+"px");
}
var _be=_b9;
while(_be&&!(dojo.hasClass(_be,"cluster")||dojo.hasClass(_be,"list"))){
_be=_be.parentNode;
}
_ba.isClosed=dojo.hasClass(_be,"uncollapse")?true:false;
if(_ba.isClosed){
dojo.style(_ba,"display","none");
}
for(var _bf=0;_bf<_b9.childNodes.length;_bf++){
if(_b9.childNodes[_bf]==_b8||_b9.childNodes[_bf]==_ba){
continue;
}
arr.push(_b9.childNodes[_bf]);
}
for(var _bf=0;_bf<arr.length;_bf++){
_ba.appendChild(arr[_bf]);
}
return _ba;
},initClusterHeight:function(_c0,_c1,_c2){
if(_c0.correctHeight){
return;
}
var _c3=dojo._getBorderBox(_c1).h;
var _c4=0,_c5;
for(var _c6=0;_c6<_c0.childNodes.length;_c6++){
_c5=_c0.childNodes[_c6];
if(_c5==_c1){
continue;
}
_c4+=dojo._getBorderBox(_c5).h;
}
if(_c4==0){
return;
}
if(_c2){
dojo.style(_c1.parentNode,"height","");
}
_c0.correctHeight=_c4;
},getCursorPosition:function(e){
e=e||dojo.global().event;
var _c7={x:0,y:0};
if(e.pageX||e.pageY){
_c7.x=e.pageX;
_c7.y=e.pageY;
}else{
var de=dojo.doc().documentElement;
var db=dojo.body();
_c7.x=e.clientX+((de||db)["scrollLeft"])-((de||db)["clientLeft"]);
_c7.y=e.clientY+((de||db)["scrollTop"])-((de||db)["clientTop"]);
}
return _c7;
},overElement:function(_c8,e){
_c8=dojo.byId(_c8);
var _c9=getCursorPosition(e);
var bb=dojo._getBorderBox(_c8);
var _ca=dojo._abs(_c8,true);
var top=_ca.y;
var _cb=top+bb.h;
var _cc=_ca.x;
var _cd=_cc+bb.w;
return (_c9.x>=_cc&&_c9.x<=_cd&&_c9.y>=top&&_c9.y<=_cb);
},toggleCluster:function(_ce,_cf){
var _d0=_ce;
while(_ce&&!(dojo.hasClass(_ce,"cluster")||dojo.hasClass(_ce,"list"))){
_ce=_ce.parentNode;
}
var _d1=false;
var _d2=dojo.query(" > :not(.header-wrapper) ",_ce.childNodes[0]);
if(!dojo.hasClass(_d2[0],"toggleDiv")){
var _d3=dojo.create("div",{className:"toggleDiv"},_d2[0].parentNode);
var _d4=dojo.create("div",{className:"toggleDiv2"},_d2[0].parentNode);
_d2.forEach(function(_d5){
if(_d5.tagName!="DIV"){
_d3.appendChild(_d5);
}else{
_d4.appendChild(_d5);
}
});
}else{
var _d3=_d2[0];
var _d4=_d2[1];
}
var _d6=dojo.query(" > .header-wrapper p ",_ce.childNodes[0])[0];
if(typeof _d6!="undefined"){
_d1=true;
}
if(dojo.hasClass(_ce,"init-collapsed")){
dojo.removeClass(_ce,"init-collapsed");
dojo.style(_d3,"display","none");
}
if(!_d3||_d3.inAnimation){
return;
}
require(["dojo/fx"],function(fx){
var _d7={node:_d3,duration:600,onBegin:function(){
_d3.inAnimation=true;
dojo.removeClass(_ce,"is-collapsed");
dojo.addClass(_ce,"is-uncollapsed");
dojo.attr(_d0,"aria-expanded","true");
dojo.stopEvent(_cf);
},onEnd:function(){
_d3.inAnimation=false;
}};
var _d8={node:_d3,duration:600,onBegin:function(){
_d3.inAnimation=true;
dojo.removeClass(_ce,"is-uncollapsed");
dojo.addClass(_ce,"is-collapsed");
dojo.attr(_d0,"aria-expanded","false");
dojo.stopEvent(_cf);
},onEnd:function(){
_d3.inAnimation=false;
}};
if(_d4.hasChildNodes()){
var _d9={node:_d4,duration:600};
var _da={node:_d4,duration:600};
}
if(_d1){
var _db={node:_d6,duration:100};
var _dc={node:_d6,duration:100,delay:500};
}
if(dojo.hasClass(_ce,"is-collapsed")){
if(typeof _db!="undefined"){
fx.wipeIn(_db).play();
}
fx.wipeIn(_d7).play();
if(typeof _d9!="undefined"){
fx.wipeIn(_d9).play();
}
}else{
if(dojo.hasClass(_ce,"is-uncollapsed")){
if(typeof _da!="undefined"){
fx.wipeOut(_da).play();
}
fx.wipeOut(_d8).play();
if(typeof _dc!="undefined"){
fx.wipeOut(_dc).play();
}
}else{
curam.debug.log("The cluster does not have a class name indicating"+"its collapsed/uncollapsed state");
}
}
});
},disableClusterToggle:function(_dd){
dojo.addOnLoad(function(){
_dd=dojo.byId(_dd);
var _de=dojo.body();
while(_dd&&_dd!=_de){
if(dojo.hasClass(_dd,"is-collapsed")||dojo.hasClass(_dd,"is-uncollapsed")){
dojo.removeClass(_dd,"is-collapsed");
dojo.removeClass(_dd,"is-uncollapsed");
dojo.removeAttr(dojo.query("SPAN.grouptoggleArrow",_dd)[0],"onclick");
}
_dd=_dd.parentNode;
}
});
},openUserPrefsEditor:function(_df){
_df=dojo.fixEvent(_df);
var _e0=_df.target;
while(_e0&&_e0.tagName!="A"){
_e0=_e0.parentNode;
}
var _e1={location:{href:_e0.href}};
var rtc=new curam.util.RuntimeContext(_e1);
var _e2=curam.util.setRpu("user-locale-selector.jspx",rtc);
openModalDialog({href:_e2},"width=500,height=300",200,150,false);
return false;
},calendarOpenModalDialog:function(_e3,_e4){
dojo.stopEvent(_e3);
curam.util.openModalDialog(_e4,"");
}};
for(prop in _3){
dojo.global[prop]=_3[prop];
}
return _3;
});
