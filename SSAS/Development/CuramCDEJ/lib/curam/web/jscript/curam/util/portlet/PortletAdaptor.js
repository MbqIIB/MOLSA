//>>built
define("curam/util/portlet/PortletAdaptor",["curam/define","curam/util"],function(){
curam.define.singleton("curam.util.portlet.PortletAdaptor",{initPortlet:function(_1){
curam.util.portlet.PortletAdaptor.modifyPortletLinks();
curam.util.portlet.PortletAdaptor.setTimeoutForBIRTChartPortlets(_1);
return "initialized";
},modifyPortletLinks:function(){
var _2;
var _3=dojo.query("div#podContainer a");
_3.forEach(function(_4){
dojo.attr(_4,"target","_newWindow");
if(_4.onclick!=null&&_4.onclick.toString().indexOf("curam.util.UimDialog")!=-1){
var _5=_4.innerText||_4.textContent;
if(_5!=undefined&&_5.length>0&&_5.lastIndexOf("...")==-1){
var _6=document.createElement("div");
_6.appendChild(document.createTextNode(_5));
_4.parentNode.appendChild(_6);
}
_2=_4.parentNode;
dojo.destroy(_4);
}
if(typeof (_2)=="undefined"){
_2=_4.parentNode;
}
});
return _2;
},setTimeoutForBIRTChartPortlets:function(_7){
setTimeout(function(){
curam.util.getTopmostWindow().dojo.publish("pods.fullyloaded");
},_7);
}});
return curam.util.portlet.PortletAdaptor;
});
