//>>built
require({cache:{"url:curam/widget/resources/FramesetWidget.html":"<div data-dojo-attach-point=\"frameset\" class=\"orgFrameset\">\r\n  <div data-dojo-attach-point=\"layouter\" class=\"orgBorder\"\r\n        data-dojo-type=\"dijit.layout.BorderContainer\"\r\n        liveSplitters=\"true\">\r\n    <div data-dojo-attach-point=\"navFrame\"\r\n        class=\"orgNavFrame\" data-dojo-type=\"dijit.layout.ContentPane\"\r\n        splitter=\"true\" region=\"leading\"></div>\r\n    <div data-dojo-attach-point=\"contentFrame\" class=\"orgContentPanel\"\r\n          region=\"center\" data-dojo-type=\"dijit.layout.ContentPane\">\r\n      <div data-dojo-attach-point=\"controller\" data-dojo-type=\"curam.util.UIMLazyController\"\r\n            uid=\"${uid}\" url=\"../loading.jspx\" iframeId=\"iframe-${uid}\"\r\n            classList=\"lazyTree\" iframeClassList=\"orgContentFrame\"\r\n            iscpiframe=\"true\">\r\n        <span style=\"display:none\"></span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n","url:curam/widget/resources/UIMLazyController.html":"<div id=\"uimcontroller_${uid}\" class=\"uimcontroller_${uid} uimController ${classList}\"\n      data-dojo-attach-point=\"uimController\">\n  <div style=\"display:none;\" id=\"uimcontroller_tc_${uid}\"\n        class=\"ipnTabController in-page-nav-tabContainer\" \n        data-dojo-attach-point=\"tabController\" \n        data-dojo-type=\"dijit.layout.TabContainer\">\n  </div>\n  <div class=\"contentPanelFrameWrapper\" data-dojo-attach-point=\"frameWrapper\">\n    <iframe frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" \n            width=\"100%\" allowTransparency=\"true\" \n            id=\"${iframeId}\" data-dojo-attach-point=\"frame\" \n            class=\"${iframeId} ${iframeClassList}\"></iframe>\n  </div>\n</div>\r\n"}});
define("curam/widget/FramesetWidget",["dijit/_Widget","dijit/_Templated","dijit/tree/ForestStoreModel","dijit/Tree","dojo/dom-style","dojox/data/JsonRestStore","curam/UIMController","dojo/text!curam/widget/resources/FramesetWidget.html","dojo/text!curam/widget/resources/UIMLazyController.html","curam/util/Request","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/layout/TabContainer","curam/util/ResourceBundle"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){
dojo.requireLocalization("curam.application","Debug");
var _b=new curam.util.ResourceBundle("Debug");
var _c=dojo.declare("curam.widget.FramesetWidget",[_1,_2],{widgetsInTemplate:true,configId:null,rootLabel:"OrgTree",previousSelected:null,nextSelected:null,mode:"",rootItem:null,relativeStart:null,initialParams:null,currItem:null,parentItem:null,rpuLink:"",uid:"",templateString:_8,postCreate:function(){
this.inherited(arguments);
var _d=this;
var _e={url:"../servlet/JSONServlet?o3c=ORG_TREE_QUERY",handleAs:"json",preventCache:true,sync:true,content:{"configId":this.configId},load:function(_f){
_d.configData=_f;
},error:function(err){
console.error("Error when getting config!",err);
}};
_a.get(_e);
var _10=new dojox.rpc.Rest("../servlet/",true,null,function(id,_11){
var _12={url:"../servlet/"+(id==null?"":id),handleAs:"json",contentType:"application/json",sync:true,preventCache:true,headers:{Accept:"application/json,application/javascript"}};
if(_11&&(_11.start>=0||_11.count>=0)){
_12.headers.Range="items="+(_11.start||"0")+"-"+((_11.count&&_11.count!=Infinity&&(_11.count+(_11.start||0)-1))||"");
}
return _12;
});
this.lazyStore=new curam.util.orgTreeStore({target:"../servlet/",service:_10,labelAttribute:"name",configId:this.configId,initialParams:this.initialParams,configData:this.configData});
this.lazyForestModel=new curam.util.LazyForestStoreModel({store:this.lazyStore,rootId:"orgTreeRoot",rootLabel:this.rootLabel,deferItemLoadingUntilExpand:true});
this.treeWidget=new curam.util.OrgTree({model:this.lazyForestModel,configData:this.configData,controllerRef:this.controller});
this.navFrame.domNode.appendChild(this.treeWidget.domNode);
},addClass:function(css){
var _13=document.getElementsByTagName("style")[0];
var _14="";
if(!_13){
_13=document.createElement("style");
_13.type="text/css";
document.getElementsByTagName("head")[0].appendChild(_13);
}else{
_14=_13.innerHTML;
}
_13.innerHTML=_14+css;
},startup:function(){
this.inherited(arguments);
this.treeWidget.startup();
this.treeWidget.set("textDir",this.get("textDir"));
this.addClass(".soria .dijitTreeRowSelected .dijitTreeLabel "+"[dir=rtl]{background-color: transparent;}");
this.addClass(".soria .orgNavFrame .dijitTreeNodeHover,"+".soria .orgNavFrame .dijitTreeRow,"+".soria .orgNavFrame .dijitTreeRowSelected .dijitTreeLabel,"+".soria .orgNavFrame .dijitTreeLabelFocused,"+".soria .orgNavFrame .dijitTreeExpandoLeaf  "+"[dir=rtl] {background-color: transparent;}");
jsScreenContext.addContextBits("ORG_TREE");
window.rootObject="orgTreeRoot";
this.contentFrame=dojo.byId("iframe-"+this.uid);
if(this.contentFrame){
dojo.subscribe("orgTree.refreshContent",this,function(_15){
this.controller.setURL(_15);
this.controller.loadPage();
var _16=this.treeWidget.currentSelection.node||this.treeWidget.selectedNode;
this.currItem=this.treeWidget.currentSelection.item;
this.previousSelected=this.currItem;
var _17=_16.getParent();
this.parentItem=_17.item;
var _18=this;
var _19=function(_1a){
if(_1a&&(_1a.id||_1a.$ref)){
_18.updateItems(_1a);
}else{
_18.lazyStore.deleteItem(_18.currItem);
_18.nextSelected=_17;
}
};
if(this.lazyForestModel.mayHaveChildren(this.currItem)){
if(this.currItem.children=="true"){
if(this.parentItem.loader){
this.mode="updateChildren";
}else{
this.mode="updateMyself";
this.parentItem=this.rootItem;
}
this.reloading(this.parentItem);
}else{
if(this.currItem.loader){
this.mode="updateMyself";
this.reloading(this.currItem,_19);
}else{
if(this.parentItem.loader){
this.mode="deepUpdate";
}else{
this.mode="updateMyself";
this.parentItem=this.rootItem;
}
this.reloading(this.parentItem);
}
}
}else{
if(this.parentItem.loader){
this.mode="updateChildren";
this.reloading(this.parentItem);
}
}
this.selectNextNode();
});
this.treeWidget.contentFrameRef=this.contentFrame;
var _1b=function(_1c){
this.lazyStore.treeId=_1c[0].id;
this.rootItem=_1c[0];
this.nextSelected=_1c[0].selectedNode;
this.relativeStart=_1c[0];
this.selectNextNode();
};
this.lazyStore.fetch({start:0,count:1,onComplete:dojo.hitch(this,_1b)});
}
},updateItems:function(_1d){
var _1e=_1d.children;
if(_1d.selectedNode){
this.nextSelected=_1d.selectedNode;
this.relativeStart=_1d;
}
var _1f=(this.mode=="updateMyself")?this.currItem:this.parentItem;
var _20=this.lazyStore.getValue(_1f,"children");
this.updateAction(_1d,_1e,_20,_1f);
},updateAction:function(_21,_22,_23,_24){
var _25=(_22.length-_23.length);
if(_25!=0){
var _26=this.diffItems(_23,_22,_25);
if(_26){
if(_25>0){
if(this.mode=="deepUpdate"){
console.error("Unexpected addition of sibling, ignoring!");
}else{
var _27=this.lazyStore.newItem(_26,{parent:_24,attribute:"children"});
if(!this.nextSelected){
this.nextSelected=this.treeWidget.getNodesByItem(_27)[0];
}
}
}else{
if(this.mode=="updateMyself"){
curam.debug.log(_b.getProperty("curam.widget.FramesetWidget.warning"));
}else{
this.lazyStore.deleteItem(_26);
if(!this.nextSelected){
this.nextSelected=this.parentItem;
}
}
}
}else{
curam.debug.log(_b.getProperty("curam.widget.FramesetWidget.reloading"));
this.mode="updateMyself";
this.reloading(this.rootItem);
}
}else{
this.editHandler(_21,_23,_22);
}
},editHandler:function(_28,_29,_2a){
var _2b=false;
var _2c=null;
if(this.mode=="updateMyself"){
if(this.currItem.name!=_28.name){
this.lazyStore.setValue(this.currItem,"name",_28.name);
this.nextSelected=null;
_2b=true;
}
}
if(!_2b){
for(var _2d in _29){
if(!isNaN(_2d)){
var _2e=(this.mode=="children")?this.currItem:_29[_2d];
var _2f=_2e.id||_2e.$ref;
for(var _30 in _2a){
if((_2a[_30].id||_2a[_30].$ref)==_2f){
_2c=_2a[_30];
}
}
if(!_2c){
throw new Error("The identifiers of the items have changed!"+"Out of synch!");
}
if(_2c.name!=_2e.name){
this.lazyStore.setValue(_2e,"name",_2c.name);
this.nextSelected=_2e;
_2b=true;
break;
}
}
}
}
if(!_2b&&(this.mode!="updateChildren")){
var _31=(this.mode!="updateMyself")?_29:this.lazyStore.getValue(this.currItem,"children");
var _32=_28.selectedNode;
if(_32&&_32.indexOf("/")>-1){
this.relativeStart=this.currItem;
this.nextSelected=_32;
this.selectNextNode();
}else{
for(var _33 in _31){
if(!isNaN(_33)){
var _34=_31[_33];
if(!this.nextSelected){
this.parentItem=this.lazyStore.getParent(_34);
this.currItem=_34;
this.mode="updateMyself";
if(_34.loader){
this.reloading(_34);
}else{
if(this.lazyForestModel.mayHaveChildren(_34)){
this.updateItems(_34);
}
}
}
}
}
}
}
},reloading:function(_35,_36){
if(_35.loader){
var _37={url:"../servlet/JSONServlet?o3c=ORG_TREE_QUERY",handleAs:"json",preventCache:true,sync:true,content:{"loader":_35.loader,"parentId":_35.id,"treeId":this.lazyStore.treeId}};
var _38=function(err){
console.error("Error when reloading children!",err);
};
var _39=_a.get(_37);
_39.addCallback(dojo.hitch(this,_36||this.updateItems));
_39.addErrback(_38);
}else{
throw new Error("Reload impossible, item "+(_35.id||_35.$ref)+" did not have a loader!");
}
},diffItems:function(_3a,_3b,_3c){
lessItems=(_3c>0)?_3a:_3b;
moreItems=(_3c>0)?_3b:_3a;
for(var _3d in moreItems){
if(!isNaN(_3d)){
var _3e=moreItems[_3d];
for(var _3f in lessItems){
if(!isNaN(_3f)){
if((_3e.$ref||_3e.id)==(lessItems[_3f].$ref||lessItems[_3f].id)){
_3e=null;
break;
}
}
}
if(_3e!=null){
return _3e;
}
}
}
return null;
},selectNextNode:function(){
var _40=null;
if(!this.nextSelected){
return;
}
if(this.nextSelected instanceof dijit._TreeNode){
_40=this.nextSelected;
}else{
var _41=this.nextSelected;
if((typeof _41==="string")&&_41.indexOf("/")>-1){
var _42=_41.split("/");
for(idx in _42){
var _43=this.lazyStore.getItem(_42[idx]);
if(!_43){
if(idx<_42.length-1){
_41=this.relativeStart;
break;
}else{
_41=this.relativeStart;
if(_42[parseInt(idx)-1]){
var _44=this.lazyStore.getItem(_42[parseInt(idx)-1]);
var _45=this.lazyStore.getValue(_44,"children");
this.reloading(_44,dojo.hitch(this,function(_46){
var _47=this.diffItems(_45,_46.children,1);
if(_47&&(_47.id||_47.$ref)==_42[idx]){
var _48=this.lazyStore.newItem(_47,{parent:_44,attribute:"children"});
_41=_48;
}
}));
}
}
}else{
_41=_42[idx];
var _49=this.treeWidget.getNodesByItem(_43)[0];
if(_43.children&&_43.children.length==0){
var _4a=this.treeWidget;
this.lazyStore.makeLoadable(_43);
var def=(_49._expandNodeDeferred=new dojo.Deferred());
this.lazyForestModel.getChildren(_43,function(_4b){
_49.unmarkProcessing();
var _4c=_49.setChildItems(_4b);
var ed=_4a._expandNode(_49,true);
_4c.addCallback(function(){
ed.addCallback(function(){
def.callback();
});
});
});
}else{
if(!_49){
var _44=this.lazyStore.getParent(_43).__parent;
var _4d=this.treeWidget.getNodesByItem(_44)[0];
if(_4d&&_4d.isExpandable&&!_4d.isExpanded){
this.treeWidget._expandNode(_4d);
_49=this.treeWidget.getNodesByItem(_43)[0];
}else{
console.error("no valid parent node found, skip selection!");
}
}
if(_49){
if(idx<_42.length-1){
if(_49.isExpandable){
if(!_49.isExpanded){
this.treeWidget._expandNode(_49);
}
}else{
_41=this.relativeStart;
}
}
}else{
console.error("no node found, skip selection!");
}
}
}
}
}
}
if(!_40){
_40=this.treeWidget.getNodesByItem(_41)[0];
}
if(_40){
this.treeWidget.onClick(_40.item,_40);
}
this.nextSelected=null;
this.previousSelected=_40;
this.mode="";
this.relativeStart=null;
}});
dojo.declare("curam.util.LazyForestStoreModel",_3,{unloadedState:false,mayHaveChildren:function(_4e){
return _4e===this.root||this.store.hasAttribute(_4e,"children");
},getChildren:function(_4f,_50,_51){
var _52=this;
var _53=function(_54){
_52.root.children=_54;
if(_52.unloadedState==true){
for(var it in _54){
_52.store.makeLoadable(_54[it]);
}
}
_50(_54,_52.unloadedState);
_52.unloadedState=false;
};
if(_4f===this.root){
if(this.root.children){
_50(this.root.children);
}else{
this.store.fetch({query:this.query,onComplete:_53,onError:_51});
}
}else{
var _55=this.store;
if(!_55.isItemLoaded(_4f)){
var _56=dojo.hitch(this,arguments.callee);
_55.loadItem({item:_4f,onItem:function(_57){
_56(_57,_53,_51);
},onError:function(){
console.error("Error when loading children!");
}});
return;
}
_53(_55.getValues(_4f,"children"));
}
},onDeleteItem:function(_58){
this.onDelete(_58);
},onNewItem:function(_59,_5a){
if(!_5a){
return;
}
this.getChildren(_5a.item,dojo.hitch(this,function(_5b){
this.onChildrenChange(_5a.item,_5b);
}));
}});
dojo.declare("curam.util.OrgTree",_4,{contentFrameRef:null,controllerRef:null,autoExpand:false,persist:false,configData:null,showRoot:false,currentSelection:null,onClick:function(_5c,_5d){
_5d.setSelected(true);
this.focusNode(_5d);
this.currentSelection={"item":_5c,"node":_5d};
if(this.contentFrameRef){
var _5e=this.model.store.getValue(_5c,"type");
var sc=new curam.util.ScreenContext("ORG_TREE");
var _5f="../"+jsL+"/"+this.configData.nodeTypes[_5e].page+"Page.do?"+sc.toRequestString();
var _60=this.model.store.getValue(_5c,"params");
var _61="";
var _62=this.configData.nodeTypes[_5e].params;
for(var _63 in _60){
if(!_63.indexOf("__")==0){
var _64=_62[_63];
_61+="&"+_64+"="+_60[_63];
}
}
var _65=this.model.store.getParent(_5c);
if(_65){
var _66=this.model.store.getValue(_65,"type");
if(_66){
this.rpuRef=this.configData.nodeTypes[_66].page+"Page.do";
}
}
var _67=_5f+_61;
if(this.rpuRef&&typeof (this.rpuRef)!="undefined"){
_67+="&__o3rpu="+this.rpuRef;
}
this.controllerRef.setURL(_67);
this.controllerRef.loadPage();
}else{
throw new Error("ERROR: nowhere to load page!");
}
},_onExpandoClick:function(_68){
var _69=_68.node;
if(_69.isExpanded){
var _6a=this._collapseNode(_69);
_6a.callback();
}else{
this._expandNode(_69);
}
},_collapseNode:function(_6b){
var _6c=new dojo.Deferred();
_6c.addCallback(function(_6d){
var _6e=new Array();
if(_6b.item.loader){
_6e.push(_6b.item);
this.model.store.deleteRecursively(_6b.item);
}else{
_6e=this.model.store.scrollStatic(_6b.item);
}
for(var i1 in _6e){
var _6f=this.getNodesByItem(_6e[i1])[0];
this.model.store.resetToLoadable(_6e[i1]);
_6f.makeExpandable();
_6f.state="UNLOADED";
}
});
this.onClick(_6b.item,_6b);
this.inherited(arguments);
if(!this.isLeftToRight()){
var _70=this;
dojo.connect(_6b._wipeOut,"onEnd",function(){
_70.resetRtlIndent(_70.tree);
});
}
return _6c;
},_expandNode:function(_71,_72){
if(_71._expandNodeDeferred&&!_72){
return _71._expandNodeDeferred;
}
var _73=this.model,_74=_71.item,_75=this;
switch(_71.state){
case "UNLOADED":
_73.unloadedState=true;
case "UNCHECKED":
_71.markProcessing();
var def=(_71._expandNodeDeferred=new dojo.Deferred());
_73.getChildren(_74,function(_76,_77){
_71.unmarkProcessing();
var _78=_71.setChildItems(_76);
if(_77){
var _79=_71.getChildren();
for(var ch in _79){
if(_79[ch].isExpandable){
_79[ch].state="UNLOADED";
}
}
}
var ed=_75._expandNode(_71,true);
_78.addCallback(function(){
ed.addCallback(function(){
def.callback();
});
});
},function(err){
console.error(_75,": error loading root children: ",err);
});
break;
default:
def=(_71._expandNodeDeferred=_71.expand());
this.onOpen(_71.item,_71);
if(_74){
this._state(_74,true);
}
if(!this.isLeftToRight()){
def.addCallback(function(){
_75.resetRtlIndent(_75.tree);
});
}
}
return def;
},destroyRendering:function(_7a){
nd=this.domNode;
if(dojo.isIE){
nd.outerHTML="";
}else{
try{
if(!_destroyContainer||_destroyContainer.ownerDocument!=nd.ownerDocument){
_destroyContainer=nd.ownerDocument.createElement("div");
}
_destroyContainer.appendChild(nd.parentNode?nd.parentNode.removeChild(nd):nd);
_destroyContainer.innerHTML="";
}
catch(e){
}
}
delete nd;
},resize:function(_7b){
this.inherited(arguments);
if(!this.isLeftToRight()){
this.resetRtlIndent(this.tree);
}
},resetRtlIndent:function(_7c){
var _7d=_7c.rootNode;
var _7e=_7c._nodePixelIndent-4;
var _7f=_7d.domNode.clientWidth;
var _80=18;
var _81=_7f-_80;
while(_7d){
var _82=_81-Math.max(_7d.indent,0)*_7e;
_5.set(_7d.domNode,"backgroundPosition",_82+"px 0px");
_7d=_7c._getNextNode(_7d);
}
}});
dojo.declare("curam.util.orgTreeStore",_6,{servlet:"JSONServlet?o3c=ORG_TREE_QUERY",treeId:null,fetch:function(_83){
var _84=_83.query;
_83.query=this.servlet+"&loader="+this.configData.rootLoader+"&root=true&initialParams="+this.initialParams;
if(_84){
_83.query+=_84;
}
this.inherited(arguments);
},isItemLoaded:function(_85){
return (_85&&!_85._loadObject);
},loadItem:function(_86){
var _87;
var _88=_86.item;
var _89=_88.loader;
_86.item.__id=this.target+this.servlet+"&loader="+_89+"&parentId="+(_88.$ref||_88.id)+"&treeId="+this.treeId;
if(_86.item._loadObject){
_86.item._loadObject(function(_8a){
_87=_8a;
delete _87._loadObject;
var _8b=_8a instanceof Error?_86.onError:_86.onItem;
if(_8b){
_8b.call(_86.scope,_8a);
}
});
}else{
if(_86.onItem){
_86.onItem.call(_86.scope,_86.item);
}
}
return _87;
},newItem:function(_8c,_8d){
_8c=new this._constructor(_8c);
if(_8c.loader&&!_8c.children||_8c.children=="true"){
this.makeLoadable(_8c);
}else{
for(var _8e in _8c.children){
this.makeLoadable(_8c.children[_8e]);
}
}
if(_8d){
var _8f=this.getValue(_8d.parent,_8d.attribute,[]);
_8f=_8f.concat([_8c]);
_8c.__parent=_8f;
this.setValue(_8d.parent,_8d.attribute,_8f);
}
return _8c;
},getItem:function(_90){
if(typeof _90==="string"){
return this._index[this.target+_90];
}
return this._index[this.target+(_90.id||_90.$ref)];
},getParent:function(_91){
var _92=this.getItem(_91);
if(_92&&_92.__parent){
return _92.__parent;
}
return null;
},scrollStatic:function(_93){
var _94=this.getValue(_93,"children");
var _95=new Array();
if(!isNaN(c)){
for(var c in _94){
if(!_94[c].loader){
this.scrollStatic(_94[c]);
}else{
_95.push(_94[c]);
deleteRecursively(_94[c]);
}
}
}
return _95;
},deleteRecursively:function(_96){
var _97=this.getValue(_96,"children");
for(var c in _97){
if(!isNaN(c)){
if(_97[c].children&&_97[c].children!="true"){
this.deleteRecursively(_97[c]);
}
this.deleteItem(_97[c]);
}
}
},makeLoadable:function(_98){
if(_98.loader){
_98._loadObject=dojox.rpc.JsonRest._loader;
}
},changing:function(_99,_9a){
},resetToLoadable:function(_9b){
this.setValue(_9b,"$ref",_9b.id);
this.makeLoadable(_9b);
delete _9b.__isDirty;
},deleteItem:function(_9c){
var _9d=[];
var _9e=dojox.data._getStoreForItem(_9c)||this;
if(this.referenceIntegrity){
dojox.rpc.JsonRest._saveNotNeeded=true;
var _9f=dojox.rpc.Rest._index;
var _a0=function(_a1){
var _a2;
_9d.push(_a1);
_a1.__checked=1;
for(var i in _a1){
if(i.substring(0,2)!="__"){
var _a3=_a1[i];
if(_a3==_9c){
if(_a1!=_9f){
if(_a1 instanceof Array){
(_a2=_a2||[]).push(i);
}else{
(dojox.data._getStoreForItem(_a1)||_9e).unsetAttribute(_a1,i);
}
}
}else{
if((typeof _a3=="object")&&_a3){
if(!_a3.__checked){
_a0(_a3);
}
if(typeof _a3.__checked=="object"&&_a1!=_9f){
(dojox.data._getStoreForItem(_a1)||_9e).setValue(_a1,i,_a3.__checked);
}
}
}
}
}
if(_a2){
i=_a2.length;
_a1=_a1.__checked=_a1.concat();
while(i--){
_a1.splice(_a2[i],1);
}
return _a1;
}
return null;
};
_a0(_9f);
dojox.rpc.JsonRest._saveNotNeeded=false;
var i=0;
while(_9d[i]){
delete _9d[i++].__checked;
}
}
_9e.onDelete(_9c);
}});
dojo.declare("curam.util.UIMLazyController",_7,{templateString:_9,postCreate:function(){
this.frameLoadEvent=this.EVENT.TOPIC_PREFIX+this.iframeId;
this.setURL(this.url);
curam.util.onLoad.addSubscriber(this.iframeId,dojo.hitch(this,"processFrameLoadEvent"));
curam.debug.log("curam.util.UIMLazyController: "+_b.getProperty("curam.widget.FramesetWidget.url")+this.url);
if(this.loadFrameOnCreate==true&&typeof (this.url)!="undefined"){
this.loadPage();
}
}});
return _c;
});
