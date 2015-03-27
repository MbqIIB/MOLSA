//>>built
require({cache:{"url:curam/widget/templates/ComboBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\r\n  id=\"widget_${id}\"\r\n  role=\"listbox\"\r\n  ><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\r\n    data-dojo-attach-point=\"_buttonNode, _popupStateNode\" role=\"presentation\"\r\n    ><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n      ${_buttonInputDisabled}\r\n  /></div\r\n  ><div class='dijitReset dijitValidationContainer'\r\n    ><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n  /></div\r\n  ><div class=\"dijitReset dijitInputField dijitInputContainer\" role=\"listbox\"\r\n    ><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\r\n      data-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\r\n  /></div\r\n></div>\r\n"}});
define("curam/widget/ComboBox",["dijit/registry","dojo/on","dojo/text!curam/widget/templates/ComboBox.html","dijit/form/ComboBox"],function(_1,on,_2){
var _3=dojo.declare("curam.widget.ComboBox",dijit.form.ComboBox,{templateString:_2,enterKeyOnOpenDropDown:false,postCreate:function(){
on(this.focusNode,"keydown",function(e){
var _4=_1.byNode(dojo.byId("widget_"+e.target.id));
if(e.keyCode==dojo.keys.ENTER&&_4._opened){
_4.enterKeyOnOpenDropDown=true;
}
});
this.inherited(arguments);
}});
return _3;
});
