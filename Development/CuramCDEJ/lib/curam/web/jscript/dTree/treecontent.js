function refreshTree(){
var _1=curam.util.getFrameRoot(window,"iegtree");
if(_1!=null){
if(window.location.search.indexOf("&isResolve")>-1||window.location.search.indexOf("&amp;isResolve")>-1){
return;
}
var _2=_1.navframe||_1.frames[0];
if(!_2.refreshIt){
_2.refreshIt=false;
return false;
}
_2.location.reload();
_1.curam.PAGE_INVALIDATED=false;
_2.curam.PAGE_INVALIDATED=false;
_2.refreshIt=false;
}
return true;
};
function refreshTreeFrame(){
var _3=window.location.href;
if(_3.indexOf("Action.do")>-1){
_3=_3.replace("Action.do","Page.do");
}
window.location.href=_3;
};
function redrawTreeContents(){
var _4=dojo.body().clientWidth;
dojo.style(dojo.body(),{width:(_4-1)+"px"});
};

