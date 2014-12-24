//>>built
define("curam/charting",["dojo/dom-class","dojo/ready","cm/_base/_dom","curam/define"],function(_1,_2,_3,_4){
_4.singleton("curam.charting",{alignChartWrapper:function(_5){
_2(function(){
_5=_3.getParentByClass(dojo.byId(_5),"cluster");
if(_5){
_1.add(_5,"chart-panel");
}
});
}});
return curam.charting;
});
