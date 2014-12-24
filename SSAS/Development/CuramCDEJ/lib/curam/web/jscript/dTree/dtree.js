function Node(id,_1,_2,_3,_4,_5,_6,_7,_8){
this.id=id;
this.pid=_1;
this.name=_2;
this.url=_3;
this.title=_4;
this.target=_5;
this.icon=_6;
this.iconOpen=_7;
this._io=_8||false;
this._is=false;
this._ls=false;
this._hc=false;
this._ai=0;
this._p;
};
function dTree(_9){
this.config={target:null,folderLinks:true,useSelection:true,useCookies:true,useLines:true,useIcons:true,useStatusText:false,closeSameLevel:false,inOrder:false};
this.icon={root:"../CDEJ/jscript/dTree/img/base.png",folder:"../CDEJ/jscript/dTree/img/folder.png",folderOpen:"../CDEJ/jscript/dTree/img/folder-open.png",node:"../CDEJ/jscript/dTree/img/page.png",empty:"../CDEJ/jscript/dTree/img/empty.gif",line:"../CDEJ/jscript/dTree/img/empty.gif",join:"../CDEJ/jscript/dTree/img/empty.gif",joinBottom:"../CDEJ/jscript/dTree/img/empty.gif",plus:"../CDEJ/jscript/dTree/img/plus.png",plusBottom:"../CDEJ/jscript/dTree/img/plus.png",minus:"../CDEJ/jscript/dTree/img/minus.png",minusBottom:"../CDEJ/jscript/dTree/img/minus.png",nlPlus:"../CDEJ/jscript/dTree/img/plus.png",nlMinus:"../CDEJ/jscript/dTree/img/minus.png"};
this.obj=_9;
this.aNodes=[];
this.aIndent=[];
this.root=new Node(-1);
this.selectedNode=null;
this.selectedFound=false;
this.completed=false;
window.currentTree=this;
};
dTree.prototype.add=function(id,_a,_b,_c,_d,_e,_f,_10,_11){
this.aNodes[this.aNodes.length]=new Node(id,_a,_b,_c,_d,_e,_f,_10,_11);
};
dTree.prototype.openAll=function(){
this.oAll(true);
};
dTree.prototype.closeAll=function(){
this.oAll(false);
};
dTree.prototype.toString=function(){
var str="<div class=\"dtree-container\">";
str+="<div class=\"dtree\">\n";
if(document.getElementById){
if(this.config.useCookies){
this.selectedNode=this.getSelected();
}
str+=this.addNode(this.root);
}else{
str+="Browser not supported.";
}
str+="</div></div>";
if(!this.selectedFound){
this.selectedNode=null;
}
this.completed=true;
return str;
};
dTree.prototype.addNode=function(_12){
var str="";
var n=0;
if(this.config.inOrder){
n=_12._ai;
}
for(n;n<this.aNodes.length;n++){
if(this.aNodes[n].pid==_12.id){
var cn=this.aNodes[n];
cn._p=_12;
cn._ai=n;
this.setCS(cn);
if(!cn.target&&this.config.target){
cn.target=this.config.target;
}
if(cn._hc&&!cn._io&&this.config.useCookies){
cn._io=this.isOpen(cn.id);
}
if(!this.config.folderLinks&&cn._hc){
cn.url=null;
}
if(this.config.useSelection&&cn.id==this.selectedNode&&!this.selectedFound){
cn._is=true;
this.selectedNode=n;
this.selectedFound=true;
}
str+=this.node(cn,n);
if(cn._ls){
break;
}
}
}
return str;
};
dTree.prototype.node=function(_13,_14){
var str="<div class=\"dTreeNode\">"+this.indent(_13,_14);
if(this.config.useIcons){
if(!_13.icon){
_13.icon=(this.root.id==_13.pid)?this.icon.root:((_13._hc)?this.icon.folder:this.icon.node);
}
if(!_13.iconOpen){
_13.iconOpen=(_13._hc)?this.icon.folderOpen:this.icon.node;
}
str+="<img id=\"i"+this.obj+_14+"\" src=\""+((_13._io)?_13.iconOpen:_13.icon)+"\" alt=\"\" />";
}
if(_13.url){
str+="<a href=\"javascript:void(0);\" id=\"s"+this.obj+_14+"\" class=\""+((this.config.useSelection)?((_13._is?"nodeSel":"node")):"node")+"\"";
if(_13.title){
str+=" title=\""+_13.title+"\"";
}
if(this.config.useStatusText){
str+=" onmouseover=\"window.status='"+_13.name+"';return true;\" onmouseout=\"window.status='';return true;\" ";
}
if(this.config.useSelection&&((_13._hc&&this.config.folderLinks)||!_13._hc)){
str+=" onclick=\""+this.obj+".loadContent('"+_13.url+"',"+_14+");\"";
}
str+=">";
}else{
if((!this.config.folderLinks||!_13.url)&&_13._hc&&_13.pid!=this.root.id){
str+="<a href=\"#\" onclick=\""+this.obj+".o("+_14+");\" class=\"node\">";
}
}
str+=_13.name;
if(_13.url||((!this.config.folderLinks||!_13.url)&&_13._hc)){
str+="</a>";
}
str+="</div>";
if(_13._hc){
str+="<div id=\"d"+this.obj+_14+"\" class=\"clip\" style=\"display:"+((this.root.id==_13.pid||_13._io)?"inline":"none")+";\">";
str+=this.addNode(_13);
str+="</div>";
}
this.aIndent.pop();
return str;
};
dTree.prototype.indent=function(_15,_16){
var str="";
if(this.root.id!=_15.pid){
for(var n=0;n<this.aIndent.length;n++){
str+="<img src=\""+((this.aIndent[n]==1&&this.config.useLines)?this.icon.line:this.icon.empty)+"\" alt=\"\" />";
}
(_15._ls)?this.aIndent.push(0):this.aIndent.push(1);
if(_15._hc){
str+="<a href=\"#\" onclick=\""+this.obj+".o("+_16+");\"><img id=\"j"+this.obj+_16+"\" src=\"";
if(!this.config.useLines){
str+=(_15._io)?this.icon.nlMinus:this.icon.nlPlus;
}else{
str+=((_15._io)?((_15._ls&&this.config.useLines)?this.icon.minusBottom:this.icon.minus):((_15._ls&&this.config.useLines)?this.icon.plusBottom:this.icon.plus));
}
str+="\" alt=\"\" /></a>";
}else{
str+="<img src=\""+((this.config.useLines)?((_15._ls)?this.icon.joinBottom:this.icon.join):this.icon.empty)+"\" alt=\"\" />";
}
}
return str;
};
dTree.prototype.setCS=function(_17){
var _18;
for(var n=0;n<this.aNodes.length;n++){
if(this.aNodes[n].pid==_17.id){
_17._hc=true;
}
if(this.aNodes[n].pid==_17.pid){
_18=this.aNodes[n].id;
}
}
if(_18==_17.id){
_17._ls=true;
}
};
dTree.prototype.getSelected=function(){
var sn=this.getCookie("cs"+this.obj);
return (sn)?sn:null;
};
dTree.prototype.s=function(id){
if(!this.config.useSelection){
return;
}
var cn=this.aNodes[id];
if(cn._hc&&!this.config.folderLinks){
return;
}
if(this.selectedNode!=id){
if(this.selectedNode||this.selectedNode==0){
eOld=document.getElementById("s"+this.obj+this.selectedNode);
eOld.className="node";
}
eNew=document.getElementById("s"+this.obj+id);
eNew.className="nodeSel";
this.selectedNode=id;
if(this.config.useCookies){
this.setCookie("cs"+this.obj,cn.id);
this.setCookie("cunique"+this.obj,cn.name);
}
}
};
dTree.prototype.o=function(id){
var cn=this.aNodes[id];
this.nodeStatus(!cn._io,id,cn._ls);
cn._io=!cn._io;
if(this.config.closeSameLevel){
this.closeLevel(cn);
}
if(this.config.useCookies){
this.updateCookie();
}
};
dTree.prototype.oAll=function(_19){
for(var n=0;n<this.aNodes.length;n++){
if(this.aNodes[n]._hc&&this.aNodes[n].pid!=this.root.id){
this.nodeStatus(_19,n,this.aNodes[n]._ls);
this.aNodes[n]._io=_19;
}
}
if(this.config.useCookies){
this.updateCookie();
}
};
dTree.prototype.openTo=function(nId,_1a,_1b){
if(!_1b){
for(var n=0;n<this.aNodes.length;n++){
if(this.aNodes[n].id==nId){
nId=n;
break;
}
}
}
var cn=this.aNodes[nId];
if(cn==null||!cn._p){
return;
}
cn._io=true;
cn._is=_1a;
if(this.completed&&cn._hc&&cn.pid!=this.root.id){
this.nodeStatus(true,cn._ai,cn._ls);
}
if(this.completed&&_1a){
this.s(cn._ai);
}else{
if(_1a){
this._sn=cn._ai;
}
}
if(cn.pid==this.root.id){
return;
}
this.openTo(cn._p._ai,false,true);
};
dTree.prototype.closeLevel=function(_1c){
for(var n=0;n<this.aNodes.length;n++){
if(this.aNodes[n].pid==_1c.pid&&this.aNodes[n].id!=_1c.id&&this.aNodes[n]._hc){
this.nodeStatus(false,n,this.aNodes[n]._ls);
this.aNodes[n]._io=false;
this.closeAllChildren(this.aNodes[n]);
}
}
};
dTree.prototype.closeAllChildren=function(_1d){
for(var n=0;n<this.aNodes.length;n++){
if(this.aNodes[n].pid==_1d.id&&this.aNodes[n]._hc){
if(this.aNodes[n]._io){
this.nodeStatus(false,n,this.aNodes[n]._ls);
}
this.aNodes[n]._io=false;
this.closeAllChildren(this.aNodes[n]);
}
}
};
dTree.prototype.nodeStatus=function(_1e,id,_1f){
eDiv=document.getElementById("d"+this.obj+id);
eJoin=document.getElementById("j"+this.obj+id);
if(this.config.useIcons){
eIcon=document.getElementById("i"+this.obj+id);
if(eIcon){
eIcon.src=(_1e)?this.aNodes[id].iconOpen:this.aNodes[id].icon;
}
}
if(eJoin){
eJoin.src=(this.config.useLines)?((_1e)?((_1f)?this.icon.minusBottom:this.icon.minus):((_1f)?this.icon.plusBottom:this.icon.plus)):((_1e)?this.icon.nlMinus:this.icon.nlPlus);
}
if(eDiv){
eDiv.style.display=(_1e)?"inline":"none";
}
};
dTree.prototype.clearCookies=function(){
var now=new Date();
var _20=new Date(now.getTime()-1000*60*60*24);
this.setCookie("co"+this.obj,"cookieValue",_20);
this.setCookie("cs"+this.obj,"cookieValue",_20);
this.setCookie("cst"+this.obj,"cookieValue",_20);
this.setCookie("csunique"+this.obj,"cookieValue",_20);
};
dTree.prototype.setCookie=function(_21,_22,_23,_24,_25,_26){
document.cookie=escape(_21)+"="+escape(_22)+(_23?"; expires="+_23.toGMTString():"")+(_24?"; path="+_24:"")+(_25?"; domain="+_25:"")+(_26?"; secure":"");
};
dTree.prototype.getCookie=function(_27){
var _28="";
var _29=document.cookie.indexOf(escape(_27)+"=");
if(_29!=-1){
var _2a=_29+(escape(_27)+"=").length;
var _2b=document.cookie.indexOf(";",_2a);
if(_2b!=-1){
_28=unescape(document.cookie.substring(_2a,_2b));
}else{
_28=unescape(document.cookie.substring(_2a));
}
}
return (_28);
};
dTree.prototype.updateCookie=function(){
var str="";
for(var n=0;n<this.aNodes.length;n++){
if(this.aNodes[n]._io&&this.aNodes[n].pid!=this.root.id){
if(str){
str+=".";
}
str+=this.aNodes[n].id;
}
}
this.setCookie("co"+this.obj,str);
};
dTree.prototype.isOpen=function(id){
var _2c=this.getCookie("co"+this.obj).split(".");
for(var n=0;n<_2c.length;n++){
if(_2c[n]==id){
return true;
}
}
return false;
};
if(!Array.prototype.push){
Array.prototype.push=function array_push(){
for(var i=0;i<arguments.length;i++){
this[this.length]=arguments[i];
}
return this.length;
};
}
if(!Array.prototype.pop){
Array.prototype.pop=function array_pop(){
lastElement=this[this.length-1];
this.length=Math.max(this.length-1,0);
return lastElement;
};
}
dTree.prototype.clearCookie=function(_2d){
var now=new Date();
var _2e=new Date(now.getTime()-1000*60*60*24);
this.setCookie(_2d+this.obj,"cookieValue",_2e);
};
dTree.prototype.getLinkForNode=function(id){
var _2f=-1;
if(this.aNodes[id]!=null){
return this.aNodes[id].url.replace(/&#38;/g,"&");
}else{
_2f=id-1;
if(_2f>-1){
return this.aNodes[_2f].url.replace(/&#38;/g,"&");
}else{
return "";
}
}
};
var refreshIt=true;
dTree.prototype.registerStart=function(_30){
if(this.config.useCookies){
var sn=this.getCookie("cst"+this.obj)||"";
if(sn!=""){
var _31=curam.util.getFrameRoot(window,"iegtree");
var _32=_31.contentframe||_31.frames[1];
var _33=(_32&&_32.dojo)?(_32.dojo.byId("rScript")==null):false;
if(sn==_30){
if(this.aNodes[_30]){
var _34=this.getCookie("cunique"+this.obj);
if(this.aNodes[_30].name==_34){
refreshIt=false;
return null;
}
if(!_33){
refreshIt=false;
return null;
}
}else{
this.clearCookie("cst");
return null;
}
}else{
if(!_33){
refreshIt=false;
return null;
}
}
}
this.setCookie("cst"+this.obj,_30);
}
return _30;
};
dTree.prototype.loadContent=function(url,_35){
this.s(_35);
var _36=curam.util.getFrameRoot(window,"iegtree");
var _37=_36.contentframe||_36.frames[1];
_37.location.href=url;
return false;
};
function setSelection(_38,_39){
window.treeNavigator=this;
var _3a=curam.util.getFrameRoot(window,"iegtree");
var _3b=_3a.contentframe||_3a.frames[1];
if(_38.registerStart(_39)!=null){
selected=_39;
if(_3b.location.search.indexOf("&norefresh")>-1||_3b.location.search.indexOf("&amp;norefresh")>-1){
return;
}
_3b.location.href=_38.getLinkForNode(selected);
}else{
if(_38.getSelected()!=null){
selected=_38.getSelected();
if(_3b.document.getElementById("rScript")){
if((_3b.location.href==_38.getLinkForNode(selected))||!refreshIt){
refreshIt=true;
return;
}else{
if(_3b.location.search.indexOf("norefresh")==-1){
_3b.location.href=_38.getLinkForNode(selected);
}
}
return;
}else{
_3b.location.href=_38.getLinkForNode(selected);
}
}
}
};
function redrawTree(){
var _3c=dojo.body().clientWidth;
dojo.style(dojo.body(),{width:(_3c-1)+"px"});
};

