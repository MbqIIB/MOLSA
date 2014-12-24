//>>built
require({cache:{"url:curam/widget/resources/FramesetWidget.html":"<div data-dojo-attach-point=\"frameset\" class=\"orgFrameset\">\r\n  <div data-dojo-attach-point=\"layouter\" class=\"orgBorder\"\r\n        data-dojo-type=\"dijit.layout.BorderContainer\"\r\n        liveSplitters=\"true\">\r\n    <div data-dojo-attach-point=\"navFrame\"\r\n        class=\"orgNavFrame\" data-dojo-type=\"dijit.layout.ContentPane\"\r\n        splitter=\"true\" region=\"leading\"></div>\r\n    <div data-dojo-attach-point=\"contentFrame\" class=\"orgContentPanel\"\r\n          region=\"center\" data-dojo-type=\"dijit.layout.ContentPane\">\r\n      <div data-dojo-attach-point=\"controller\" data-dojo-type=\"curam.util.UIMLazyController\"\r\n            uid=\"${uid}\" url=\"../loading.jspx\" iframeId=\"iframe-${uid}\"\r\n            classList=\"lazyTree\" iframeClassList=\"orgContentFrame\"\r\n            iscpiframe=\"true\">\r\n        <span style=\"display:none\"></span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n","url:curam/widget/resources/UIMLazyController.html":"<div id=\"uimcontroller_${uid}\" class=\"uimcontroller_${uid} uimController ${classList}\"\n      data-dojo-attach-point=\"uimController\">\n  <div style=\"display:none;\" id=\"uimcontroller_tc_${uid}\"\n        class=\"ipnTabController in-page-nav-tabContainer\" \n        data-dojo-attach-point=\"tabController\" \n        data-dojo-type=\"dijit.layout.TabContainer\">\n  </div>\n  <div class=\"contentPanelFrameWrapper\" data-dojo-attach-point=\"frameWrapper\">\n    <iframe frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" \n            width=\"100%\" allowTransparency=\"true\" \n            id=\"${iframeId}\" data-dojo-attach-point=\"frame\" \n            class=\"${iframeId} ${iframeClassList}\"></iframe>\n  </div>\n</div>\r\n"}});
define("curam/widget/FramesetWidget",["dijit/_Widget","dijit/_Templated","dijit/tree/ForestStoreModel","dijit/Tree","dojox/data/JsonRestStore","curam/UIMController","dojo/text!curam/widget/resources/FramesetWidget.html","dojo/text!curam/widget/resources/UIMLazyController.html","curam/util/Request","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/layout/TabContainer","curam/util/ResourceBundle"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
dojo.requireLocalization("curam.application","Debug");
var _a=new curam.util.ResourceBundle("Debug");
var _b=dojo.declare("curam.widget.FramesetWidget",[_1,_2],{widgetsInTemplate:true,configId:null,rootLabel:"OrgTree",previousSelected:null,nextSelected:null,mode:"",rootItem:null,relativeStart:null,initialParams:null,currItem:null,parentItem:null,rpuLink:"",uid:"",templateString:_7,postCreate:function(){
this.inherited(arguments);
var _c=this;
var _d={url:"../servlet/JSONServlet?o3c=ORG_TREE_QUERY",handleAs:"json",preventCache:true,sync:true,content:{"configId":this.configId},load:function(_e){
_c.configData=_e;
},error:function(_f){
console.error("Error when getting config!",_f);
}};
_9.get(_d);
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
},startup:function(){
this.inherited(arguments);
this.treeWidget.startup();
jsScreenContext.addContextBits("ORG_TREE");
window.rootObject="orgTreeRoot";
this.contentFrame=dojo.byId("iframe-"+this.uid);
if(this.contentFrame){
dojo.subscribe("orgTree.refreshContent",this,function(_13){
this.controller.setURL(_13);
this.controller.loadPage();
var _14=this.treeWidget.currentSelection.node||this.treeWidget.selectedNode;
this.currItem=this.treeWidget.currentSelection.item;
this.previousSelected=this.currItem;
var _15=_14.getParent();
this.parentItem=_15.item;
var _16=this;
var _17=function(_18){
if(_18&&(_18.id||_18.$ref)){
_16.updateItems(_18);
}else{
_16.lazyStore.deleteItem(_16.currItem);
_16.nextSelected=_15;
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
this.reloading(this.currItem,_17);
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
var _19=function(_1a){
this.lazyStore.treeId=_1a[0].id;
this.rootItem=_1a[0];
this.nextSelected=_1a[0].selectedNode;
this.relativeStart=_1a[0];
this.selectNextNode();
};
this.lazyStore.fetch({start:0,count:1,onComplete:dojo.hitch(this,_19)});
}
},updateItems:function(_1b){
var _1c=_1b.children;
if(_1b.selectedNode){
this.nextSelected=_1b.selectedNode;
this.relativeStart=_1b;
}
var _1d=(this.mode=="updateMyself")?this.currItem:this.parentItem;
var _1e=this.lazyStore.getValue(_1d,"children");
this.updateAction(_1b,_1c,_1e,_1d);
},updateAction:function(_1f,_20,_21,_22){
var _23=(_20.length-_21.length);
if(_23!=0){
var _24=this.diffItems(_21,_20,_23);
if(_24){
if(_23>0){
if(this.mode=="deepUpdate"){
console.error("Unexpected addition of sibling, ignoring!");
}else{
var _25=this.lazyStore.newItem(_24,{parent:_22,attribute:"children"});
if(!this.nextSelected){
this.nextSelected=this.treeWidget.getNodesByItem(_25)[0];
}
}
}else{
if(this.mode=="updateMyself"){
curam.debug.log(_a.getProperty("curam.widget.FramesetWidget.warning"));
}else{
this.lazyStore.deleteItem(_24);
if(!this.nextSelected){
this.nextSelected=this.parentItem;
}
}
}
}else{
curam.debug.log(_a.getProperty("curam.widget.FramesetWidget.reloading"));
this.mode="updateMyself";
this.reloading(this.rootItem);
}
}else{
this.editHandler(_1f,_21,_20);
}
},editHandler:function(_26,_27,_28){
var _29=false;
var _2a=null;
if(this.mode=="updateMyself"){
if(this.currItem.name!=_26.name){
this.lazyStore.setValue(this.currItem,"name",_26.name);
this.nextSelected=null;
_29=true;
}
}
if(!_29){
for(var _2b in _27){
if(!isNaN(_2b)){
var _2c=(this.mode=="children")?this.currItem:_27[_2b];
var _2d=_2c.id||_2c.$ref;
for(var _2e in _28){
if((_28[_2e].id||_28[_2e].$ref)==_2d){
_2a=_28[_2e];
}
}
if(!_2a){
throw new Error("The identifiers of the items have changed!"+"Out of synch!");
}
if(_2a.name!=_2c.name){
this.lazyStore.setValue(_2c,"name",_2a.name);
this.nextSelected=_2c;
_29=true;
break;
}
}
}
}
if(!_29&&(this.mode!="updateChildren")){
var _2f=(this.mode!="updateMyself")?_27:this.lazyStore.getValue(this.currItem,"children");
var _30=_26.selectedNode;
if(_30&&_30.indexOf("/")>-1){
this.relativeStart=this.currItem;
this.nextSelected=_30;
this.selectNextNode();
}else{
for(var _31 in _2f){
if(!isNaN(_31)){
var _32=_2f[_31];
if(!this.nextSelected){
this.parentItem=this.lazyStore.getParent(_32);
this.currItem=_32;
this.mode="updateMyself";
if(_32.loader){
this.reloading(_32);
}else{
if(this.lazyForestModel.mayHaveChildren(_32)){
this.updateItems(_32);
}
}
}
}
}
}
}
},reloading:function(_33,_34){
if(_33.loader){
var _35={url:"../servlet/JSONServlet?o3c=ORG_TREE_QUERY",handleAs:"json",preventCache:true,sync:true,content:{"loader":_33.loader,"parentId":_33.id,"treeId":this.lazyStore.treeId}};
var _36=function(err){
console.error("Error when reloading children!",err);
};
var _37=_9.get(_35);
_37.addCallback(dojo.hitch(this,_34||this.updateItems));
_37.addErrback(_36);
}else{
throw new Error("Reload impossible, item "+(_33.id||_33.$ref)+" did not have a loader!");
}
},diffItems:function(_38,_39,_3a){
lessItems=(_3a>0)?_38:_39;
moreItems=(_3a>0)?_39:_38;
for(var _3b in moreItems){
if(!isNaN(_3b)){
var _3c=moreItems[_3b];
for(var _3d in lessItems){
if(!isNaN(_3d)){
if((_3c.$ref||_3c.id)==(lessItems[_3d].$ref||lessItems[_3d].id)){
_3c=null;
break;
}
}
}
if(_3c!=null){
return _3c;
}
}
}
return null;
},selectNextNode:function(){
var _3e=null;
if(!this.nextSelected){
return;
}
if(this.nextSelected instanceof dijit._TreeNode){
_3e=this.nextSelected;
}else{
var _3f=this.nextSelected;
if((typeof _3f==="string")&&_3f.indexOf("/")>-1){
var _40=_3f.split("/");
for(idx in _40){
var _41=this.lazyStore.getItem(_40[idx]);
if(!_41){
if(idx<_40.length-1){
_3f=this.relativeStart;
break;
}else{
_3f=this.relativeStart;
if(_40[parseInt(idx)-1]){
var _42=this.lazyStore.getItem(_40[parseInt(idx)-1]);
var _43=this.lazyStore.getValue(_42,"children");
this.reloading(_42,dojo.hitch(this,function(_44){
var _45=this.diffItems(_43,_44.children,1);
if(_45&&(_45.id||_45.$ref)==_40[idx]){
var _46=this.lazyStore.newItem(_45,{parent:_42,attribute:"children"});
_3f=_46;
}
}));
}
}
}else{
_3f=_40[idx];
var _47=this.treeWidget.getNodesByItem(_41)[0];
if(_41.children&&_41.children.length==0){
var _48=this.treeWidget;
this.lazyStore.makeLoadable(_41);
var def=(_47._expandNodeDeferred=new dojo.Deferred());
this.lazyForestModel.getChildren(_41,function(_49){
_47.unmarkProcessing();
var _4a=_47.setChildItems(_49);
var ed=_48._expandNode(_47,true);
_4a.addCallback(function(){
ed.addCallback(function(){
def.callback();
});
});
});
}else{
if(!_47){
var _42=this.lazyStore.getParent(_41).__parent;
var _4b=this.treeWidget.getNodesByItem(_42)[0];
if(_4b&&_4b.isExpandable&&!_4b.isExpanded){
this.treeWidget._expandNode(_4b);
_47=this.treeWidget.getNodesByItem(_41)[0];
}else{
console.error("no valid parent node found, skip selection!");
}
}
if(_47){
if(idx<_40.length-1){
if(_47.isExpandable){
if(!_47.isExpanded){
this.treeWidget._expandNode(_47);
}
}else{
_3f=this.relativeStart;
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
if(!_3e){
_3e=this.treeWidget.getNodesByItem(_3f)[0];
}
if(_3e){
this.treeWidget.onClick(_3e.item,_3e);
}
this.nextSelected=null;
this.previousSelected=_3e;
this.mode="";
this.relativeStart=null;
}});
dojo.declare("curam.util.LazyForestStoreModel",_3,{unloadedState:false,mayHaveChildren:function(_4c){
return _4c===this.root||this.store.hasAttribute(_4c,"children");
},getChildren:function(_4d,_4e,_4f){
var _50=this;
var _51=function(_52){
_50.root.children=_52;
if(_50.unloadedState==true){
for(var it in _52){
_50.store.makeLoadable(_52[it]);
}
}
_4e(_52,_50.unloadedState);
_50.unloadedState=false;
};
if(_4d===this.root){
if(this.root.children){
_4e(this.root.children);
}else{
this.store.fetch({query:this.query,onComplete:_51,onError:_4f});
}
}else{
var _53=this.store;
if(!_53.isItemLoaded(_4d)){
var _54=dojo.hitch(this,arguments.callee);
_53.loadItem({item:_4d,onItem:function(_55){
_54(_55,_51,_4f);
},onError:function(){
console.error("Error when loading children!");
}});
return;
}
_51(_53.getValues(_4d,"children"));
}
},onDeleteItem:function(_56){
this.onDelete(_56);
},onNewItem:function(_57,_58){
if(!_58){
return;
}
this.getChildren(_58.item,dojo.hitch(this,function(_59){
this.onChildrenChange(_58.item,_59);
}));
}});
dojo.declare("curam.util.OrgTree",_4,{contentFrameRef:null,controllerRef:null,autoExpand:false,persist:false,configData:null,showRoot:false,currentSelection:null,onClick:function(_5a,_5b){
_5b.setSelected(true);
this.focusNode(_5b);
this.currentSelection={"item":_5a,"node":_5b};
if(this.contentFrameRef){
var _5c=this.model.store.getValue(_5a,"type");
var sc=new curam.util.ScreenContext("ORG_TREE");
var _5d="../"+jsL+"/"+this.configData.nodeTypes[_5c].page+"Page.do?"+sc.toRequestString();
var _5e=this.model.store.getValue(_5a,"params");
var _5f="";
var _60=this.configData.nodeTypes[_5c].params;
for(var _61 in _5e){
if(!_61.indexOf("__")==0){
var _62=_60[_61];
_5f+="&"+_62+"="+_5e[_61];
}
}
var _63=this.model.store.getParent(_5a);
if(_63){
var _64=this.model.store.getValue(_63,"type");
if(_64){
this.rpuRef=this.configData.nodeTypes[_64].page+"Page.do";
}
}
var _65=_5d+_5f;
if(this.rpuRef&&typeof (this.rpuRef)!="undefined"){
_65+="&__o3rpu="+this.rpuRef;
}
this.controllerRef.setURL(_65);
this.controllerRef.loadPage();
}else{
throw new Error("ERROR: nowhere to load page!");
}
},_onExpandoClick:function(_66){
var _67=_66.node;
if(_67.isExpanded){
var _68=this._collapseNode(_67);
_68.callback();
}else{
this._expandNode(_67);
}
},_collapseNode:function(_69){
var _6a=new dojo.Deferred();
_6a.addCallback(function(_6b){
var _6c=new Array();
if(_69.item.loader){
_6c.push(_69.item);
this.model.store.deleteRecursively(_69.item);
}else{
_6c=this.model.store.scrollStatic(_69.item);
}
for(var i1 in _6c){
var _6d=this.getNodesByItem(_6c[i1])[0];
this.model.store.resetToLoadable(_6c[i1]);
_6d.makeExpandable();
_6d.state="UNLOADED";
}
});
this.onClick(_69.item,_69);
this.inherited(arguments);
return _6a;
},_expandNode:function(_6e,_6f){
if(_6e._expandNodeDeferred&&!_6f){
return _6e._expandNodeDeferred;
}
var _70=this.model,_71=_6e.item,_72=this;
switch(_6e.state){
case "UNLOADED":
_70.unloadedState=true;
case "UNCHECKED":
_6e.markProcessing();
var def=(_6e._expandNodeDeferred=new dojo.Deferred());
_70.getChildren(_71,function(_73,_74){
_6e.unmarkProcessing();
var _75=_6e.setChildItems(_73);
if(_74){
var _76=_6e.getChildren();
for(var ch in _76){
if(_76[ch].isExpandable){
_76[ch].state="UNLOADED";
}
}
}
var ed=_72._expandNode(_6e,true);
_75.addCallback(function(){
ed.addCallback(function(){
def.callback();
});
});
},function(err){
console.error(_72,": error loading root children: ",err);
});
break;
default:
def=(_6e._expandNodeDeferred=_6e.expand());
this.onOpen(_6e.item,_6e);
if(_71){
this._state(_71,true);
}
}
return def;
},destroyRendering:function(_77){
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
}});
dojo.declare("curam.util.orgTreeStore",_5,{servlet:"JSONServlet?o3c=ORG_TREE_QUERY",treeId:null,fetch:function(_78){
var _79=_78.query;
_78.query=this.servlet+"&loader="+this.configData.rootLoader+"&root=true&initialParams="+this.initialParams;
if(_79){
_78.query+=_79;
}
this.inherited(arguments);
},isItemLoaded:function(_7a){
return (_7a&&!_7a._loadObject);
},loadItem:function(_7b){
var _7c;
var _7d=_7b.item;
var _7e=_7d.loader;
_7b.item.__id=this.target+this.servlet+"&loader="+_7e+"&parentId="+(_7d.$ref||_7d.id)+"&treeId="+this.treeId;
if(_7b.item._loadObject){
_7b.item._loadObject(function(_7f){
_7c=_7f;
delete _7c._loadObject;
var _80=_7f instanceof Error?_7b.onError:_7b.onItem;
if(_80){
_80.call(_7b.scope,_7f);
}
});
}else{
if(_7b.onItem){
_7b.onItem.call(_7b.scope,_7b.item);
}
}
return _7c;
},newItem:function(_81,_82){
_81=new this._constructor(_81);
if(_81.loader&&!_81.children||_81.children=="true"){
this.makeLoadable(_81);
}else{
for(var _83 in _81.children){
this.makeLoadable(_81.children[_83]);
}
}
if(_82){
var _84=this.getValue(_82.parent,_82.attribute,[]);
_84=_84.concat([_81]);
_81.__parent=_84;
this.setValue(_82.parent,_82.attribute,_84);
}
return _81;
},getItem:function(_85){
if(typeof _85==="string"){
return this._index[this.target+_85];
}
return this._index[this.target+(_85.id||_85.$ref)];
},getParent:function(_86){
var _87=this.getItem(_86);
if(_87&&_87.__parent){
return _87.__parent;
}
return null;
},scrollStatic:function(_88){
var _89=this.getValue(_88,"children");
var _8a=new Array();
if(!isNaN(c)){
for(var c in _89){
if(!_89[c].loader){
this.scrollStatic(_89[c]);
}else{
_8a.push(_89[c]);
deleteRecursively(_89[c]);
}
}
}
return _8a;
},deleteRecursively:function(_8b){
var _8c=this.getValue(_8b,"children");
for(var c in _8c){
if(!isNaN(c)){
if(_8c[c].children&&_8c[c].children!="true"){
this.deleteRecursively(_8c[c]);
}
this.deleteItem(_8c[c]);
}
}
},makeLoadable:function(_8d){
if(_8d.loader){
_8d._loadObject=dojox.rpc.JsonRest._loader;
}
},changing:function(_8e,_8f){
},resetToLoadable:function(_90){
this.setValue(_90,"$ref",_90.id);
this.makeLoadable(_90);
delete _90.__isDirty;
},deleteItem:function(_91){
var _92=[];
var _93=dojox.data._getStoreForItem(_91)||this;
if(this.referenceIntegrity){
dojox.rpc.JsonRest._saveNotNeeded=true;
var _94=dojox.rpc.Rest._index;
var _95=function(_96){
var _97;
_92.push(_96);
_96.__checked=1;
for(var i in _96){
if(i.substring(0,2)!="__"){
var _98=_96[i];
if(_98==_91){
if(_96!=_94){
if(_96 instanceof Array){
(_97=_97||[]).push(i);
}else{
(dojox.data._getStoreForItem(_96)||_93).unsetAttribute(_96,i);
}
}
}else{
if((typeof _98=="object")&&_98){
if(!_98.__checked){
_95(_98);
}
if(typeof _98.__checked=="object"&&_96!=_94){
(dojox.data._getStoreForItem(_96)||_93).setValue(_96,i,_98.__checked);
}
}
}
}
}
if(_97){
i=_97.length;
_96=_96.__checked=_96.concat();
while(i--){
_96.splice(_97[i],1);
}
return _96;
}
return null;
};
_95(_94);
dojox.rpc.JsonRest._saveNotNeeded=false;
var i=0;
while(_92[i]){
delete _92[i++].__checked;
}
}
_93.onDelete(_91);
}});
dojo.declare("curam.util.UIMLazyController",_6,{templateString:_8,postCreate:function(){
this.frameLoadEvent=this.EVENT.TOPIC_PREFIX+this.iframeId;
this.setURL(this.url);
curam.util.onLoad.addSubscriber(this.iframeId,dojo.hitch(this,"processFrameLoadEvent"));
curam.debug.log("curam.util.UIMLazyController: "+_a.getProperty("curam.widget.FramesetWidget.url")+this.url);
if(this.loadFrameOnCreate==true&&typeof (this.url)!="undefined"){
this.loadPage();
}
}});
return _b;
});
