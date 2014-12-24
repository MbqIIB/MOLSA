/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2013 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
  "dojo/_base/declare",
  "dijit/Calendar",
  "dojo/dom-style",
  "idx/oneui/HoverHelpTooltip",
  "idx/oneui/_CssStateMixin",
  "idx/oneui/form/_DateTimeTextBox",
  "idx/oneui/form/_CompositeMixin",
  "dojo/text!idx/oneui/form/templates/DropDownBox.html",
  "dojo/date/locale"
], function(declare, Calendar, domStyle, HoverHelpTooltip, _CssStateMixin, _DateTimeTextBox, _CompositeMixin, template, locale){

  // module:
  //    dijit/form/DateTextBox
  // summary:
  //    A validating, serializable, range-bound date text box with a drop down calendar

  /**
  * @name idx.oneui.form.DateTextBox
  * @class A validating, serializable, range-bound date text box with a drop down calendar
  * @augments idx.oneui.form._DateTimeTextBox
  * @augments idx.oneui.form._CompositeMixin
  * @augments idx.oneui._CssStateMixin
  */ 
  return declare("curam.IEGDateTextBox", [_DateTimeTextBox, _CompositeMixin, _CssStateMixin], {
  /**@lends curam.IEGDateTextBox*/ 
    // summary:
    //    A validating, serializable, range-bound date text box with a drop down calendar
    //
    //    Example:
    // |  new dijit.form.DateTextBox({value: new Date(2009, 0, 20)})
    //
    //    Example:
    // |  <input dojotype='curam.IEGDateTextBox' value='2009-01-20'>

    // instantValidate: Boolean
    //    Fire validation when widget get input by set true, 
    //    fire validation when widget get blur by set false
    instantValidate: false,
    /**
    * base class of this oneui widget
    */
    baseClass: "idxDateTextBoxWrap",
    /**
    * base class of dijit widget
    */
    oneuiBaseClass: "dijitTextBox dijitComboBox dijitDateTextBox",
    popupClass: "dijit.Calendar",
    _selector: "date",
    templateString: template,
    // value: Date
    //    The value of this widget as a JavaScript Date object, with only year/month/day specified.
    //    If specified in markup, use the format specified in `dojo.date.stamp.fromISOString`.
    //    set("value", ...) accepts either a Date object or a string.
    value: new Date(""),// value.toString()="NaN"
    /** @ignore */
    postCreate: function(){
      this.inherited(arguments);      
      if(this.instantValidate){
        this.connect(this, "_onInput", function(){
          this.validate(this.focused);
        });
      }else{
        this.connect(this, "_onBlur", function(){
          this.validate(this.focused);
        });
        this.connect(this, "_onFocus", function(){
          this._set("state", "");
          if(this.message == ""){return;}
          this.displayMessage(this.message);
          this.message = "";
        });
        this.connect(this, "_onInput", function(){
          this.displayMessage();
        });
      }
      this.connect(this.iconNode, "onmouseenter", function(){
        if(this.message && domStyle.get(this.iconNode, "visibility") == "visible"){
          HoverHelpTooltip.show(this.message, this.iconNode, this.tooltipPosition, !this.isLeftToRight());
        }
      }); 
      
      // Fix for bug in oneui widget. 
      // This ensures the hidden field is set when the widget is created.
      // the bug doesn't exist in the ootb dijit, only the oneui version.
      // TODO: see if this is fixed in IDX 1.3
      // TODO: better option to hook into this method using Dojo's aspect...
      // ...library instead of creating a custom widget?
      var hiddenField =
        dojo.query("input[type='hidden'][name='" + this.id + "']",
          this.domNode)[0];
      if (hiddenField && !this._isInvalidDate(this.value)) {
        hiddenField.value = locale.format(this.value, 
          {selector: 'date', datePattern: "yyyy-MM-dd", locale: dojo.config.locale});
          }
      this.connect(this, "_onInput", function(event){
          var currentVal = dojo.query("input[type='text'][id='" + this.id + "']")[0].value; 
          if (hiddenField && !this._isInvalidDate(currentVal)) {
            hiddenField.value = locale.format(new Date(currentVal), 
              {selector: 'date', datePattern: "yyyy-MM-dd", locale: dojo.config.locale});
            }
      });
      if(this.dropDown){
        this.dropDown.set('value', this.value, false);
      }
    },
    
    /**
    * Overridable method to display validation errors/hints
    */
    displayMessage: function(/*String*/ message){
      // summary:
      //    Overridable method to display validation errors/hints.
      //    By default uses a tooltip.
      // tags:
      //    extension
      HoverHelpTooltip.hide(this.oneuiBaseNode);
      HoverHelpTooltip.hide(this.iconNode);
      if(message && this.focused){
        var node = domStyle.get(this.iconNode, "visibility") == "hidden" ? this.oneuiBaseNode : this.iconNode;
        HoverHelpTooltip.show(message, node, this.tooltipPosition, !this.isLeftToRight());
      }
    }
  });
});
