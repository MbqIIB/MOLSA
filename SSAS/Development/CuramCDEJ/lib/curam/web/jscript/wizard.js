dojo.require("curam.util");
dojo.require("curam.dialog");
var tRef=curam.util.getFrameRoot;
function WizardSummary(){
};
WizardSummary.prototype.init=function(){
var _1=document.getElementById("wizard_summary");
var _2=tRef(window,"wizard").wizard.nav;
var _3=document.getElementById("visited");
var _4=document.getElementById("unvisited");
var _5;
dojo.empty(_3);
dojo.empty(_4);
for(i=0;i<_2.getLengthWithoutSummary();i++){
_5=dojo.create("li",{});
_5.appendChild(document.createTextNode(_2.pages[i].title));
if(_2.isVisited(i)){
_3.appendChild(_5);
}else{
_4.appendChild(_5);
}
}
};
function ButtonBar(){
var _6;
var _7;
};
ButtonBar.prototype.initButtonBar=function(){
this.buttonHandlers=new Array();
this.buttonHandlers["wizard_back"]=this.wizard_back;
this.buttonHandlers["wizard_forward"]=this.wizard_forward;
this.buttonHandlers["wizard_finish"]=this.wizard_finish;
this.buttonHandlers["wizard_quit"]=this.wizard_quit;
this.outOfWizard=false;
tRef(window,"wizard").wizard.setButtonBarReady();
};
ButtonBar.prototype.getNavigator=function(){
if(!this.wizNavigator){
this.wizNavigator=tRef(window,"wizard").wizard.nav;
}
return this.wizNavigator;
};
ButtonBar.prototype.wizard_back=function(){
this.getNavigator().previous();
};
ButtonBar.prototype.wizard_forward=function(){
this.getNavigator().next();
};
ButtonBar.prototype.wizard_finish=function(){
this.getNavigator().finish();
};
ButtonBar.prototype.wizard_quit=function(){
this.getNavigator().quit();
};
ButtonBar.prototype.optionalEnable=function(_8,_9){
if(_9){
this.enable(_8);
}
};
ButtonBar.prototype.optionalDisable=function(_a,_b){
if(_b){
this.disable(_a);
}
};
ButtonBar.prototype.enable=function(_c){
var _d=_c.parentNode;
var _e=dojo.create("a",{href:"#",title:_c.getAttribute("title"),id:_c.getAttribute("id")});
_e.className="ac disabled";
var _f=dojo.create("span",{"class":"left-corner"},_e);
var _10=dojo.create("span",{"class":"right-corner"},_f);
var _11=dojo.create("span",{"class":"middle"},_10);
_11.appendChild(document.createTextNode(_c.getAttribute("title")));
_d.replaceChild(_e,_c);
_e._conn=dojo.connect(_e,"onclick",this,this.buttonHandlers[_c.getAttribute("id")]);
};
ButtonBar.prototype.disable=function(_12){
dojo.disconnect(_12._conn);
var _13=_12.parentNode;
var _14=dojo.create("span",{title:_12.getAttribute("title"),id:_12.getAttribute("id")});
_14.className="disabled-button";
var _15=dojo.create("span",{"class":"left-corner"},_14);
var _16=dojo.create("span",{"class":"right-corner"},_15);
var _17=dojo.create("span",{"class":"middle"},_16);
_17.appendChild(document.createTextNode(_12.getAttribute("title")));
_13.replaceChild(_14,_12);
};
ButtonBar.prototype.enableButtons=function(_18,_19){
var nav=this.getNavigator();
if(!nav.isLastPage()){
this.enableSummary();
if(!_19){
this.enable(document.getElementById("wizard_forward"));
}else{
this.disable(document.getElementById("wizard_forward"));
this.disableFwdLinks();
}
}else{
this.disableSummary();
this.disable(document.getElementById("wizard_forward"));
}
this.enable(document.getElementById("wizard_quit"));
if(!nav.isFirstPage()){
if(!_18){
this.enable(document.getElementById("wizard_back"));
if(nav.currentPage<nav.getLengthWithoutSummary()){
this.enableBackLinks();
}
}else{
this.disable(document.getElementById("wizard_back"));
this.disableLinks(true);
}
}else{
this.disable(document.getElementById("wizard_back"));
}
};
ButtonBar.prototype.disableButtons=function(){
this.disable(document.getElementById("wizard_back"));
this.disable(document.getElementById("wizard_forward"));
this.disableSummary();
this.disable(document.getElementById("wizard_quit"));
this.disableLinks();
};
ButtonBar.prototype.disableLinks=function(_1a){
var nav=this.getNavigator();
var _1b=_1a?nav.currentPage:nav.getLengthWithoutSummary();
if(nav.modeInd==1){
for(k1=0;k1<_1b;k1++){
nav.dropLink(k1);
}
}
nav.backLinksDisabled=_1a;
};
ButtonBar.prototype.disableFwdLinks=function(){
var nav=this.getNavigator();
if(nav.modeInd==1){
for(k2=nav.currentPage+1;k2<nav.getLengthWithoutSummary();k2++){
nav.dropLink(k2);
}
}
};
ButtonBar.prototype.reenableLinks=function(){
var nav=this.getNavigator();
if(this.outOfWizard){
if(nav.modeInd>0){
nav.restoreLinks(nav.currentPage);
}
nav.highlight(nav.currentPage);
this.outOfWizard=false;
}
};
ButtonBar.prototype.enableBackLinks=function(){
var nav=this.getNavigator();
if(nav.backLinksDisabled){
if(!this.outOfWizard){
if(nav.modeInd>1){
nav.restoreLinks(nav.currentPage);
}
}
nav.backLinksDisabled=false;
}
};
ButtonBar.prototype.enableSummary=function(){
var nav=this.getNavigator();
if(nav.summary.summaryNum>-1){
nav.summary.summaryLink.onclick=nav.finish;
nav.summary.sumObject.className="summaryDiv";
if(nav.claimantScheme==true){
this.enable(dojo.byId("wizard_finish"));
}
}
};
ButtonBar.prototype.disableSummary=function(){
var nav=this.getNavigator();
if(nav.summary.summaryNum>-1){
nav.summary.summaryLink.onclick=null;
if(nav.summary.sumObject.className.indexOf("highlightSummary")>-1){
nav.summary.sumObject.className="summaryDisabled highlightSummary";
}else{
nav.summary.sumObject.className="summaryDisabled";
}
if(nav.claimantScheme==true){
this.disable(dojo.byId("wizard_finish"));
}
}
};
ButtonBar.prototype.showFinishButton=function(){
var _1c=dojo.byId("wizard_finish");
dojo.style(_1c,"display","");
_1c.className="restored";
this.enable(dojo.byId("wizard_finish"));
};
function WizardPage(_1d,_1e){
this.name=_1d;
this.title=_1e;
this.liRef=null;
this.imgRef=null;
this.linkRef=null;
this.visited=false;
this.sectionInd=-1;
};
function WizardSection(idx){
this.sId=idx;
this.firstPending=false;
this.itself=null;
this.textWrapper=null;
this.children=new Array();
this.isHidden=false;
this.expander=null;
};
function SummaryData(_1f,_20){
this.summaryNum=-1;
this.sumObject=null;
this.summaryLink=null;
this.clicked=false;
this.name=null;
this.title=null;
this.closeOnSubmit=false;
};
function WizardNavigator(_21,_22,_23){
this.exitPage=encodeURI(_21);
this.currentPage=_22;
this.returnPage=_22;
this.listRef=null;
this.summaryRef=null;
this.ulRef=null;
this.length=0;
this.modeInd=((_23=="full")?2:(_23=="basic")?0:1);
this.buttonPane=tRef(window,"wizard").buttonframe;
this.contentPane=tRef(window,"wizard").targetframe;
this.parentPage=parent;
this.params=new Array();
this.sections=new Array();
this.sectionTitles=new Array();
this.pages=new Array();
this.summary=new SummaryData();
this.disableBackList=new Array();
this.disableForwardList=new Array();
this.delegatesSubmit=new Array();
this.backLinksDisabled=false;
this.visible=false;
this.quitConfirm=false;
this.quitQuestion="Quitting?";
this.claimantScheme=false;
this.wrappedTo=-1;
this.wasWrappedTo=-1;
window.wizardNavigator=this;
};
WizardNavigator.prototype.addDisableBack=function(_24,_25){
this.disableBackList[_24]=_25;
};
WizardNavigator.prototype.setVisible=function(){
this.visible=true;
};
WizardNavigator.prototype.setQuitConfirm=function(_26){
this.quitConfirm=true;
this.quitQuestion=_26;
};
WizardNavigator.prototype.setClaimantScheme=function(){
tRef(window,"wizard").wizard.changeFramesetStyle();
this.claimantScheme=true;
};
WizardNavigator.prototype.addDisableForward=function(_27,_28){
this.disableForwardList[_27]=_28;
};
WizardNavigator.prototype.addFormRef=function(_29){
this.delegatesSubmit[_29]="assumed";
};
WizardNavigator.prototype.setPageList=function(_2a){
for(i0=0;i0<_2a.length;i0++){
this.pages[i0]=new WizardPage(_2a[i0],"");
}
this.length=_2a.length;
};
WizardNavigator.prototype.setPageTitleList=function(_2b){
for(i1=0;i1<_2b.length;i1++){
this.pages[i1].title=(i1+1)+"."+_2b[i1];
}
};
WizardNavigator.prototype.setSectionTitleList=function(_2c){
this.sectionTitles=_2c;
};
WizardNavigator.prototype.setSummary=function(_2d,_2e,num,_2f){
this.summary.name=_2d;
this.summary.title=_2e;
this.summary.summaryNum=num;
this.summary.closeOnSubmit=_2f||false;
};
WizardNavigator.prototype.initHoldersAndLinks=function(){
var s1=-1;
var _30=document.getElementsByTagName("li");
var i2=0;
for(;i2<_30.length;i2++){
if(_30[i2].id.indexOf("s_")==0){
var idx=_30[i2].id.split("_",2)[1];
_30[i2].getElementsByTagName("div")[0].appendChild(document.createTextNode(this.sectionTitles[idx]));
s1++;
this.sections[s1]=new WizardSection(s1);
this.sections[s1].firstPending=true;
this.sections[s1].itself=_30[i2];
this.sections[s1].textWrapper=_30[i2].getElementsByTagName("div")[0];
this.sections[s1].expander=document.getElementById("si_"+s1);
this.sections[s1].expander.imgNav=this;
this.sections[s1].expander.mySectionNum=s1;
this.sections[s1].expander.onclick=this.toggleSection;
}else{
if(_30[i2].id.indexOf("nav_")==0){
var idx=_30[i2].id.split("_",2)[1];
_30[i2].appendChild(document.createTextNode(this.pages[idx].title));
this.pages[idx].liRef=_30[i2];
this.pages[idx].imgRef=this.pages[idx].liRef.getElementsByTagName("img")[0]||"no_img";
if(s1>-1){
if(this.sections[s1].firstPending==true){
this.pages[idx].liRef.isFirst=true;
this.pages[idx].liRef.className="first";
this.sections[s1].firstPending=false;
}
this.pages[idx].sectionInd=s1;
this.sections[s1].children[this.sections[s1].children.length]=this.pages[idx].liRef;
}
}
}
}
if(this.summary.summaryNum>-1){
var _31=this.summary.summaryNum;
this.summary.sumObject=document.getElementById("sum_0");
this.summary.summaryLink=this.summary.sumObject.getElementsByTagName("a")[0];
this.summary.summaryLink.innerHTML=this.summary.title;
this.summary.summaryLink.onclick=this.finish;
this.summary.summaryLink.navigator=this;
this.pages[_31]=new WizardPage(this.summary.name,this.summary.title);
this.pages[_31].liRef=this.summary.sumObject;
this.pages[_31].imgRef=this.pages[_31].liRef.getElementsByTagName("img")[0]||"no_img";
this.length=_31+1;
this.summaryRef=document.getElementById("swrap");
}
this.listRef=document.getElementById("wizardItems");
this.ulRef=document.getElementById("fullList");
};
WizardNavigator.prototype.initContent=function(){
dojo.addClass(dojo.body(),"wizard-navigation");
this.initHoldersAndLinks();
dojo.body().style.width="100%";
this.initProgressBar();
if(this.currentPage>0){
for(var ii=0;ii<this.currentPage;ii++){
this.pages[ii].visited=true;
}
}
if(this.modeInd>0){
this.restoreLinks(this.currentPage,this.currentPage);
if(this.modeInd==1){
this.foldSections(true);
this.unfoldSections(this.currentPage);
this.adjustSectionStyle(0);
}
}
if(this.summary.summaryNum==-1){
this.listRef.style.height="100%";
}else{
var _32=tRef(window,"wizard").navframe.frameElement.clientHeight;
this.listRef.style.height=_32-dojo.style(this.summaryRef,"height");
}
if(this.getItemPos()>this.listRef.clientHeight){
this.listRef.className="itemsList";
this.adjustScrollBar();
this.adjustFirstWrapping(this.wasWrappedTo-1);
}
this.wrapSections();
this.setContent(this.currentPage);
tRef(window,"wizard").wizard.setNavigatorReady();
};
WizardNavigator.prototype.wrapSections=function(){
for(i9=0;i9<this.sections.length;i9++){
var _33=this.sections[i9].itself.getElementsByTagName("div")[0];
if(_33.scrollHeight>44){
_33.className="alterH";
this.sections[i9].itself.style.height=28;
}
}
};
WizardNavigator.prototype.foldSections=function(_34){
for(s2=((_34)?1:0);s2<this.sections.length;s2++){
this.foldSection(null,s2,true);
}
};
WizardNavigator.prototype.foldSection=function(_35,_36,_37,_38){
var sId=((_35==null)?_36:this.pages[_35].sectionInd);
if(sId==-1){
return;
}
if(this.sections[sId].isHidden){
return;
}
for(child in this.sections[sId].children){
this.sections[sId].children[child].style.display="none";
this.sections[sId].isHidden=true;
this.sections[sId].expander.src="../CDEJ/themes/classic/images/wizard/expand_16x16.gif";
if(_37&&_37==true){
this.sections[sId].expander.style.display="none";
}
}
if(this.ulRef.offsetHeight<=this.listRef.clientHeight){
this.listRef.className="noscroll";
this.unwrapFirsts();
this.wasWrappedTo=this.wrappedTo;
this.wrappedTo=-1;
}
this.restoreCurrentView();
};
WizardNavigator.prototype.restoreCurrentView=function(){
for(var s2=0;s2<this.sections.length;s2++){
var _39=this.sections[s2];
if(!_39.isHidden){
for(child in _39.children){
_39.children[child].style.display="none";
_39.children[child].style.display="";
}
}
}
};
WizardNavigator.prototype.unfoldSections=function(_3a){
var _3b=this.pages[_3a].sectionInd;
for(var i7=0;i7<=_3b;i7++){
this.unfoldSection(null,null,i7);
}
this.wasWrappedTo=_3b+1;
};
WizardNavigator.prototype.unfoldSection=function(_3c,_3d,_3e,_3f){
var sId=((_3c!=null)?this.pages[_3c].sectionInd:((_3d==null)?_3e:_3d));
if(sId==null||sId==-1){
return;
}
if(!this.sections[sId].isHidden){
return;
}
for(var _40 in this.sections[sId].children){
this.sections[sId].children[_40].style.display="";
this.sections[sId].isHidden=false;
this.sections[sId].expander.src="../CDEJ/themes/classic/images/wizard/contract_16x16.gif";
if(this.sections[sId].expander.style.display=="none"){
this.sections[sId].expander.style.display="";
}
}
this.adjustSectionStyle(sId);
if(this.ulRef.offsetHeight>this.listRef.clientHeight){
this.listRef.className="itemsList";
this.adjustScrollBar();
this.adjustFirstWrapping(sId);
}
};
WizardNavigator.prototype.adjustFirstWrapping=function(_41){
var dir=((this.wasWrappedTo>_41)?"up":"down");
var _42=((dir=="down")?_41:0);
var _43=(dir=="down")?function(){
return _42>this.wrappedTo;
}:function(){
return _42<this.wasWrappedTo;
};
while(_43.call(this)&&this.sections[_42]){
if(this.sections[_42].children[0].scrollHeight>this.sections[_42].children[0].clientHeight){
this.sections[_42].children[0].className="first itemWrapped"+((this.sections[_42].children[0].className.indexOf("highlight")>-1)?" highlight":"");
}
((dir=="down")?_42--:_42++);
}
this.wrappedTo=_41;
this.wasWrappedTo=-1;
};
WizardNavigator.prototype.unwrapFirsts=function(){
for(i8=0;i8<this.sections.length;i8++){
this.sections[i8].children[0].className="first"+((this.sections[i8].children[0].className.indexOf("highlight")>-1)?" highlight":"");
}
};
WizardNavigator.prototype.adjustSectionStyle=function(_44){
if(!this.sections[_44]){
return;
}
this.sections[_44].itself.className=this.sections[_44].itself.className.replace("Up","Normal");
if(this.sections[_44+1]){
this.sections[_44+1].itself.className="sectionNormal";
}
};
WizardNavigator.prototype.toggleSection=function(){
var _45=this.mySectionNum;
if(this.imgNav.sections[_45].isHidden){
this.imgNav.unfoldSection(null,_45,null,true);
}else{
this.imgNav.foldSection(null,_45,null,true);
}
};
WizardNavigator.prototype.setContent=function(_46){
this.contentPane.location.href=this.getPath(_46);
this.highlight(_46);
};
WizardNavigator.prototype.registerForm=function(_47){
if(this.getButtonBar().outOfWizard){
if(this.contentPane.document.forms.length>0){
var _48=this.contentPane.dojo.byId("ctxParam");
var _49=new curam.util.ScreenContext();
_49.setContext(_48["value"]);
_49.clear("OVAL");
_48.value=_49.getValue();
return;
}
}
if(this.delegatesSubmit[_47]=="assumed"){
if(this.contentPane.document.forms.length>0){
this.hideSubmitButtons(this.contentPane.document.forms[0],this.contentPane.document);
this.nextSubmits=true;
}
}else{
if(this.summary.summaryNum>-1&&_47==this.summary.name){
if(this.summary.closeOnSubmit&&this.contentPane.document.forms[0]){
var _4a=function(e){
e.target.actualButton.click();
};
var _4b=dojo.query("input[type=submit],input[type=image]",this.contentPane.document);
if(_4b.length>1){
_4b[1].actualButton=_4b[0];
dojo.connect(_4b[1],"onclick",_4a);
}
this.alterSubmit(this.contentPane.document.forms[0]);
}
}
}
};
WizardNavigator.prototype.newContent=function(_4c){
var len=this.length;
var _4d=false;
var _4e=false;
var _4f=false;
if(this.claimantScheme==true&&this.summary.summaryNum>-1){
this.getButtonBar().showFinishButton();
}
for(var i=0;i<len;++i){
if(_4c==this.pages[i].name){
this.setCurrent(i);
_4d=true;
}
}
if(this.disableBackList[_4c]){
if(this.disableBackList[_4c]!="dynamic"){
_4e=this.disableBackList[_4c];
}else{
_4e=this.contentPane.DISABLE_BACK!=null&&this.contentPane.DISABLE_BACK==true;
}
}
if(this.disableForwardList[_4c]){
if(this.disableForwardList[_4c]!="dynamic"){
_4f=this.disableForwardList[_4c];
}else{
_4f=this.contentPane.DISABLE_FORWARD!=null&&this.contentPane.DISABLE_FORWARD==true;
}
}
if(_4d){
this.getButtonBar().enableButtons(_4e,_4f);
this.getButtonBar().reenableLinks();
this.progressBar.markCurrent(this.currentPage);
}else{
this.getButtonBar().outOfWizard=true;
this.getButtonBar().disableButtons();
this.highlight(-1);
this.progressBar.markCompleted(this.currentPage);
}
this.updateParams();
};
WizardNavigator.prototype.next=function(){
if(this.modeInd==1){
this.getButtonBar().disableButtons();
}
if(this.nextSubmits){
this.btnRef.click();
return false;
}
if(!this.isLastPage()){
this.returnPage=this.currentPage;
this.progressBar.accum=(this.progressBar.accum>=this.currentPage+1)?this.progressBar.accum:this.currentPage+1;
this.progressBar.markCompleted(this.currentPage);
++this.currentPage;
this.makeThisCurrent();
}
if(this.getItemPos()>this.listRef.clientHeight){
this.listRef.className="itemsList";
this.adjustScrollBar(20);
}
this.setContent(this.currentPage);
};
WizardNavigator.prototype.proceedNext=function(_50){
this.nextSubmits=false;
if(_50!=null&&_50!="undefined"){
this.updateParams(_50);
}
this.next();
};
WizardNavigator.prototype.previous=function(){
if(this.modeInd==1){
this.getButtonBar().disableButtons();
}
if(this.isLastPage()){
this.currentPage=this.returnPage;
}else{
if(this.currentPage>0){
this.renderLink(this.currentPage);
--this.currentPage;
this.returnPage=this.currentPage;
}
}
this.makeThisCurrent();
this.setContent(this.currentPage);
};
WizardNavigator.prototype.finish=function(){
var nav=this.navigator||this;
if(!nav.summary.clicked){
nav.renderLink(nav.currentPage);
nav.progressBar.markCompleted(nav.currentPage);
nav.returnPage=nav.currentPage;
nav.setContent(nav.length-1);
nav.summary.clicked=true;
}
};
WizardNavigator.prototype.quit=function(){
if(jsScreenContext.hasContextBits("MODAL")){
var _51=true;
if(this.quitConfirm){
_51=window.confirm(this.quitQuestion);
}
if(_51==true){
var _52=curam.util.getFrameRoot(window,"wizard");
var _53=curam.util.adjustTargetContext(curam.dialog.getParentWindow(_52),this.exitPage);
_52.curam.util.Dialog.close(true,_53);
}
}else{
alert("Unsupported context for Agenda Player");
}
};
WizardNavigator.prototype.quitFromSummary=function(_54,_55){
if(jsScreenContext.hasContextBits("MODAL")){
var _56=_54+_55;
var _57=curam.util.getFrameRoot(window,"wizard");
var _58=curam.util.adjustTargetContext(curam.dialog.getParentWindow(_57),_56);
_57.curam.util.Dialog.close(true,_58);
}else{
alert("Unsupported context for Agenda Player");
}
};
WizardNavigator.prototype.setCurrent=function(_59){
this.currentPage=_59;
this.highlight(this.currentPage);
};
WizardNavigator.prototype.getPath=function(_5a){
var _5b=this.pages[_5a].name+"Page.do?";
_5b+=tRef(window,"wizard").jsScreenContext.toRequestString();
for(var _5c in this.params){
if(this.params[_5c]!=null&&this.params[_5c]!=""){
_5b=_5b+"&"+_5c+"="+encodeURIComponent(this.params[_5c]);
}
}
return _5b;
};
WizardNavigator.prototype.addParam=function(_5d,_5e){
this.params[_5d]=_5e;
};
WizardNavigator.prototype.updateParams=function(_5f){
var _60=_5f||getRequestParams(this.contentPane.location);
for(var _61 in this.params){
if(_60[_61]&&_60[_61]!=""){
this.addParam(_61,decodeURIComponent(_60[_61]));
for(i6=0;i6<this.length;i6++){
this.pages[i6].href=null;
}
}
}
};
WizardNavigator.prototype.renderLink=function(_62){
if(this.modeInd>0){
var _63=this.pages[_62].liRef;
aLink=dojo.create("a",{target:"targetframe",innerHTML:this.pages[_62].title});
aLink.pgNum=_62;
aLink.navigator=this;
dojo.connect(aLink,"onclick",this.makeThisCurrent);
dojo.attr(aLink,"href",this.getPath(_62));
this.pages[_62].linkRef=aLink;
dojo.empty(_63);
if(this.pages[_62].imgRef!="no_img"){
_63.appendChild(this.pages[_62].imgRef);
}
_63.appendChild(aLink);
}
if(this.modeInd<2){
if(this.progressBar.accum<=_62+1){
this.progressBar.accum=_62+1;
}
this.progressBar.markCompleted(_62);
}
};
WizardNavigator.prototype.makeThisCurrent=function(){
var nav=this.navigator||this;
if(nav.modeInd>0){
var _64=(this.pgNum!=null)?this.pgNum:nav.currentPage;
nav.dropLink(_64);
nav.highlight(_64);
nav.unfoldSection(_64);
nav.restoreLinks(_64);
if(!nav.delegatesSubmit[nav.pages[_64].name]){
nav.nextSubmits=false;
}
}
};
WizardNavigator.prototype.highlight=function(_65){
if(_65>-1){
for(i4=0;i4<this.length;++i4){
if(this.pages[i4].liRef.className.indexOf("first")>-1){
this.pages[i4].liRef.className=((this.pages[i4].liRef.className.indexOf("itemWrapped")>-1)?"first itemWrapped":"first");
}else{
this.pages[i4].liRef.className="item";
}
if(i4==this.summary.summaryNum){
this.pages[i4].liRef.className="summaryDiv";
this.summary.clicked=false;
}
}
this.pages[_65].liRef.className+=" highlight";
if(_65==this.summary.summaryNum){
this.pages[_65].liRef.className+="Summary";
this.summary.clicked=true;
}
this.pages[_65].visited=true;
this.progressBar.markCurrent(_65);
}else{
this.pages[this.currentPage].liRef.className="item";
}
};
WizardNavigator.prototype.dropLink=function(_66){
var nav=this.navigator||this;
var _67=nav.pages[_66].linkRef;
if(_67!=null){
dojo.empty(nav.pages[_66].liRef);
if(nav.pages[_66].imgRef!="no_img"){
nav.pages[_66].liRef.appendChild(nav.pages[_66].imgRef);
}
nav.pages[_66].liRef.appendChild(document.createTextNode(nav.pages[_66].title));
}
};
WizardNavigator.prototype.restoreLinks=function(_68,_69){
var _6a=(this.modeInd==2)?this.isTrue:((_69==null)?this.isVisited:this.upTo);
for(k=0;k<this.getLengthWithoutSummary();k++){
if(k!=_68){
if(_6a.call(this,k)){
this.renderLink(k);
}
}
}
};
WizardNavigator.prototype.hideSubmitButtons=function(_6b,_6c){
var _6d=dojo.query("input[type=submit],input[type=image]",_6b)[0];
if(_6d&&_6d.name.indexOf("__o3btn.")>-1){
_6d.name+="NEXT";
this.btnRef=_6d;
}
var _6e=dojo.query(".actions-panel",_6c)[0];
if(_6e){
dojo.empty(_6e);
_6e.style.display="none";
}
};
WizardNavigator.prototype.alterSubmit=function(_6f){
var _70=_6f.getElementsByTagName("input");
for(i6=0;i6<_70.length;i6++){
if(_70[i6].type=="submit"||(_70[i6].type=="image"&&(_70[i6].name.indexOf("__o3btn.")>-1))){
_70[i6].name+="SUM";
}
}
};
WizardNavigator.prototype.isFirstPage=function(){
return (this.currentPage===0);
};
WizardNavigator.prototype.isLastPage=function(){
return (this.currentPage==this.length-1);
};
WizardNavigator.prototype.isVisited=function(_71){
return this.pages[_71].visited;
};
WizardNavigator.prototype.getLengthWithoutSummary=function(){
return this.length-1*(this.summary.summaryNum>-1);
};
WizardNavigator.prototype.getButtonBar=function(){
return this.buttonPane.buttonBar;
};
WizardNavigator.prototype.isTrue=function(_72){
return true;
};
WizardNavigator.prototype.upTo=function(arg){
return arg<this.currentPage;
};
WizardNavigator.prototype.initProgressBar=function(){
this.progressBar=new ProgressBar(this,this.currentPage,this.modeInd);
};
WizardNavigator.prototype.adjustScrollBar=function(_73){
this.listRef.scrollTop=_73?(this.listRef.scrollTop+_73):this.ulRef.offsetHeight;
};
WizardNavigator.prototype.getItemPos=function(){
return this.pages[this.currentPage].liRef.offsetTop+this.pages[this.currentPage].liRef.offsetHeight;
};
WizardNavigator.prototype.optShowNavigator=function(){
var _74=tRef(window,"wizard").document.getElementById("navset");
if(this.visible){
_74.cols="180,*";
}else{
_74.cols="0,*";
}
};
WizardNavigator.prototype.handleResize=function(){
if(this.navRef.summary.summaryNum>-1){
if(this.oldHeight==null||this.oldHeight!=this.clientHeight){
this.oldHeight=this.clientHeight;
this.navRef.listRef.style.height=this.oldHeight-dojo.style(this.navRef.summaryRef,"height");
}
}
};
function ProgressBar(_75,_76,_77){
this.navigator=_75;
this.accum=_76;
this.isFull=(_77==2);
this.panel=tRef(window,"wizard").headerframe.document;
this.countSteps=_75.getLengthWithoutSummary();
this.wrapper=this.panel.getElementById("progressBar");
var _78=this.wrapper.innerHTML;
if(_78.indexOf("%counter")==-1){
_78="<span id='counter' style='display:none;'>0</span>"+_78;
}
if(_78.indexOf("%total")==-1){
_78+="<span id='total' style='display:none;'>n</span>";
}
_78=_78.replace("%counter","<span id='counter'>0</span>");
_78=_78.replace("%total","<span id='total'>n</span>");
this.wrapper.innerHTML=_78;
this.passedPg=this.panel.getElementById("counter");
this.totalPg=this.panel.getElementById("total");
if(!this.isFull){
this.totalPg.innerHTML=this.totalPg.text=this.countSteps;
var _79=this.panel.getElementById("progressText");
_79.style.margin="2px 0 0 0";
this.steps=new Array();
this.fillStepsArray();
this.completeTo(_76);
}
};
ProgressBar.prototype.fillStepsArray=function(){
for(var s1=0;s1<this.countSteps;s1++){
var _7a=this.panel.createElement("div");
_7a.className="empty-step";
this.steps[s1]=_7a;
this.wrapper.appendChild(this.steps[s1]);
}
if(this.navigator.modeInd<2){
this.wrapper.style.display="";
}
};
ProgressBar.prototype.markCurrent=function(idx){
if(!this.isFull&&this.steps[idx]){
this.steps[idx].className="current-step";
}
};
ProgressBar.prototype.completeTo=function(idx){
for(var s2=0;s2<idx;s2++){
this.markCompleted(s2);
}
this.markCurrent(idx);
};
ProgressBar.prototype.markCompleted=function(idx){
if(!this.isFull){
this.steps[idx].className="completed-step";
this.passedPg.innerHTML=this.passedPg.text=this.accum;
}
};

