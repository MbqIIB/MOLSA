//>>built
require({cache:{"url:curam/widget/resources/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:${onClickValue}\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n"}});
define("curam/widget/MenuItem",["dijit/MenuItem","dojo/text!curam/widget/resources/MenuItem.html"],function(_1,_2){
var _3=dojo.declare("curam.widget.MenuItem",_1,{templateString:_2,onClickValue:"",_onClickAll:function(_4){
this.getParent().onItemClick(this,_4);
var _5=curam.tab.getTabContainer();
var _6=_5.getChildren();
for(var i=0;i<_6.length;i++){
if(_6[i].closable){
_5.closeChild(_6[i]);
}
}
}});
return _3;
});
