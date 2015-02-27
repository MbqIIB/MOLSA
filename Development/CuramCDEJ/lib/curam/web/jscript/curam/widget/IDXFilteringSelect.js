//>>built
require({cache:{"url:curam/widget/templates/IDXComboBox.html":"<div id=\"widget_${id}\" class=\"dijitReset dijitInline idxComposite\" dojoAttachPoint=\"_popupStateNode\"\r\n  ><div class=\"idxLabel dijitInline dijitHidden\"\r\n    ><span class=\"idxRequiredIcon\">*&nbsp</span\r\n    ><label for=\"${id}\" dojoAttachPoint=\"compLabelNode\"\r\n    ></label\r\n  ></div\r\n  ><div class=\"dijitInline\"\r\n    ><div class=\"dijit dijitInline dijitReset dijitInlineTable dijitLeft\" role=\"listbox\" dojoAttachPoint=\"stateNode,oneuiBaseNode,_aroundNode\"\r\n      ><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer' dojoAttachPoint=\"_buttonNode\" role=\"presentation\"\r\n      ><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n      ${_buttonInputDisabled}\r\n      /></div\r\n      ><div class=\"dijitReset dijitInputField dijitInputContainer\" role=\"listbox\" dojoAttachPoint=\"inputContainer\" dojoAttachEvent=\"onmouseenter: _onInputContainerEnter, onmouseleave: _onInputContainerLeave\"\r\n        ><input class='dijitReset dijitInputInner' ${!nameAttrSetting}  type=\"text\" autocomplete=\"off\" dojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\" \r\n      /></div\r\n    ></div\r\n    ><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"\r\n    ></div\r\n    ><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\r\n      ><div class=\"dijitValidationIcon\"\r\n      ><input class=\"dijitReset dijitInputField  dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n    ></div></div\r\n    ><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\r\n  ></div\r\n></div>"}});
define("curam/widget/IDXFilteringSelect",["dijit/registry","dojo/on","dojo/text!curam/widget/templates/IDXComboBox.html","idx/oneui/form/FilteringSelect"],function(_1,on,_2){
var _3=dojo.declare("curam.widget.IDXFilteringSelect",idx.oneui.form.FilteringSelect,{templateString:_2,enterKeyOnOpenDropDown:false,postCreate:function(){
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
