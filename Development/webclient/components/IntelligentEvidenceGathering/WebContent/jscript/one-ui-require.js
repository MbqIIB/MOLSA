/* 
 * Licensed Materials - Property of IBM
 * 
 * Copyright IBM Corporation 2013,2014. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure 
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
 
var modules = [
  "dojo/domReady",
  "dojo/dom-style",
  "dojo/ready",
  "dojo/store/Memory",
  "dojo/_base/lang",
  "dijit/form/TextBox",   
  "dijit/form/RadioButton",
  "dijit/form/Select",
  "dijit/form/Button",
  "dijit/DropDownMenu",
  "dijit/MenuItem",
  "idx/oneui/form/Select",
  "curam/widget/IDXFilteringSelect",
  "dijit/form/SimpleTextarea",      
  "idx/oneui/form/CheckBox",
  "dijit/form/DateTextBox",
  "idx/oneui/HoverHelpTooltip",
  "idx/oneui/Dialog"
];
  
require(modules, function(domReady, domStyle, ready, Memory, lang, 
  dijitTextBox, dijitRadioButton, dijitButton, dijitSelect, 
  dijitFilteringSelect, dijitDialog,
  oneuiTextArea, oneuiCheckBox, oneuiDateTextBox, oneuiHoverHelpTooltip) {
    
  // ** OneUI Widget Fixes **
    
    /**
     * When the page has finished loading an event is fired.
     * Any items that need to hook into this event can be put here.
     */
    dojo.subscribe("ieg-page-loaded", function() {
    
      // check the heights of the sections panel
      setSectionPanelsHeight();
      
      // The date widget has the incorrect role for JAWS. Set the role
      // to textbox on the appropriate node
      dojo.query('.dijitDateTextBox').
        forEach(function(node, index, arr){
          node.setAttribute("role", "textbox");
      });
      
      // Set the aria-label attribute on the filtering selects for JAWS.
      // NB: this must come after the code above which changes the role of
      // date fields to textbox.
      dojo.query('[role=\"listbox\"]').
        forEach(function(node, index, arr) {
          // get aria-label from inner input node
          var input = dojo.query('input', node);
          if(input) {
            node.setAttribute("aria-label", input.attr("aria-label")[1]);
          }
      });
      
      // set the correct "aria-valuenow" value
      dojo.query('.dijitReset.dijitInputInner').
        forEach(function(node, index, arr){
          node.removeAttribute("aria-valuenow");
      });
      
      // There is a known issue with the Dijit dropdown widget when used in
      // certain circumstances. The widget detaches from its parent input field.
      // This method adds some javascript to a page which listens for the 
      // onscroll event and closes any open popups/dropdowns.
      dojo.connect(dojo.query('.tabForm')[0], 'onscroll', function(e){
        dojo.query('.dijitPopup').
          forEach(function(node, index, arr){
            ieg.closeHelpDialog(node);
        });
        
        // Hover Help tooltip
        dojo.query('.idxOneuiHoverHelpTooltip').
          forEach(function(node, index, arr){
            closeHoverHelp(node);
        });
      });
    });
    
    /**
     * When viewed on a low resolution when the sections panel contains
     * a large amount of text the text was overflowing onto the next sections
     * panel. This is a fix that will stretch the all of the section panels to 
     * the size of the largest panel
     */ 
    function setSectionPanelsHeight() {
      var maxHeight = 0;
      var sectionPanelHeights = new Array();
      var i = 0;
      
      // Find the max height of the sections panels
      dojo.query('.sectionLabelSpan').
        forEach(function(node, index, arr){
          var spanHeight = domStyle.get(node, "height");
          sectionPanelHeights[i] = spanHeight;  
          i++;
      });
    
      maxHeight = Math.max.apply(Math, sectionPanelHeights);
      maxHeight = maxHeight.toString();
      maxHeight = maxHeight + 'px';       
      
      // Apply the max height to the parent div of all sections panels
      // to make them all the same height 
      dojo.query('.inner-section-div').
        forEach(function(node, index, arr){
          domStyle.set(node,'height',maxHeight);
      });
    }
  
    /**
     * Close the hover help tooltip on scroll.
     */
    function closeHoverHelp(dialogId) {
      var dialog = dijit.byId(dialogId);
      dijit.popup.close(dialog);
      dojo.style(dialogId, 'visibility', 'hidden');
    }   
    
    /**
     * 
     */
    (function() {
    dijit.form.Select.prototype._setDisplay = 
      function(/*String*/ newDisplay){
        var lbl=newDisplay||this.emptyLabel;
        var innerSpan = document.createElement("span");
        var labelClass =  this.baseClass+"Label";
        innerSpan.setAttribute("class", "dijitReset dijitInline " 
          + labelClass);
        innerSpan.appendChild(document.createTextNode(lbl));
        while(this.containerNode.hasChildNodes()) {
          this.containerNode.removeChild(this.containerNode.lastChild);
        }
        this.containerNode.appendChild(innerSpan);
        this.focusNode.setAttribute("aria-valuetext",lbl);
      };      
    })();
  
    /** 
     * Monkey-Patch the ._setDisplay method in the cdej.js script
     * The method was calling .innerHTML which was causing an unknown runtime 
     * exception in IE7 and IE8. Override method uses DOM api which doesn't
     * cause exception.
     */ 
    (function() {
      dijit.form.Select.prototype._setDisplay = function(/*String*/ newDisplay){
        var lbl=newDisplay||this.emptyLabel;
        var innerSpan = document.createElement("span");
        var labelClass =  this.baseClass+"Label";
        innerSpan.setAttribute("class", "dijitReset dijitInline " + labelClass);
        innerSpan.appendChild(document.createTextNode(lbl));
        while(this.containerNode.hasChildNodes()) {
            this.containerNode.removeChild(this.containerNode.lastChild);
        }
        this.containerNode.appendChild(innerSpan);
        this.focusNode.setAttribute("aria-valuetext",lbl);
      };      
    })();
    
    // Monkey-Patch the displayMessage() method of the FilteringSelect.
    // This method displays a tooltip on the select if the entered text is 
    // invalid. This code does not seem to be complete on the widget as it was
    // displaying the message in the wrong position. 
    (function() {      
        idx.oneui.form.FilteringSelect.prototype.displayMessage = 
          function(message, force){
          if(this.messageTooltip){
            this.messageTooltip.set("label", message);
            if(message && this.focused || force ){
              this.messageTooltip.open(this.oneuiBaseNode);
            }else{
              this.messageTooltip.close();
            }
          }
      };
    })();
        
    // Currently there are bugs with the OneUI version of the FilteringSelect.
    // Some of the extensions that the OneUI widget is adding are not complete 
    // and produce errors in the console (this is probably why it 
    // is not currently listed on the API page). Overriding the function here
    // to at least suppress the errors.
    // NB: In this case we would probably be better extending the widget and
    // correcting the errors. However, we do not currently know the long-term 
    // plan for OneUI. If we take on an updated version of OneUI, these issues
    // may be fixed and all we would need to do is remove this override.
    // The only changes in the below code are checks for "nodes != undefined"
    // and are wrapped in //************** 
    (function() {      
        idx.oneui.form.FilteringSelect.prototype._openResultList = 
          function(/*Object*/ results, /*Object*/ query, /*Object*/ options) {
          // Overwrite dijit.form.FilteringSelect._openResultList 
          // to focus the selected
          // item when open the menu.
    
          // #3285: tap into search callback to see if 
          // user's query resembles a match
          if(query[this.searchAttr] !== this._lastQuery){
            return;
          }
    
          this._fetchHandle = null;
          if( this.disabled 
            || this.readOnly 
            // TODO: better way to avoid getting unwanted notify
            || (query[this.searchAttr] !== this._lastQuery)
          ){
            return;
          }
          
          var wasSelected = this.dropDown.getHighlightedOption();
          this.dropDown.clearResultList();
          // if no results and not just the previous choices button
          if(!results.length && options.start == 0){ 
            this.closeDropDown();
            return;
          }
      
          // Fill in the textbox with the first item from the drop down list,
          // and highlight the characters that were auto-completed. For
          // example, if user typed "CA" and the drop down list appeared, the
          // textbox would be changed to "California" and "ifornia" would be
          // highlighted.
      
          var nodes = this.dropDown.createOptions(
            results,
            options,
            lang.hitch(this, "_getMenuLabelFromItem")
          );
      
          // show our list (only if we have content, else nothing)
          this._showResultList();
          
          // Focus the selected item
          if(!this._lastInput
            //**************
            && nodes != undefined
            //**************
            ){
            for(var i = 0; i < nodes.length; i++){
              if(nodes[i].item){
                var value = this.store.getValue(
                  nodes[i].item, this.searchAttr).toString();
                if(value == this.displayedValue){
                  this.dropDown._setSelectedAttr(nodes[i]);
                  winUtils.scrollIntoView(this.dropDown.selected);
                  break;
                }
              }
            }
          }
          
          // #4091:
          //    tell the screen reader that the paging callback finished by
          //    shouting the next choice
          if(options.direction){
            if(1 == options.direction){
              this.dropDown.highlightFirstOption();
            } else if(-1 == options.direction) {
              this.dropDown.highlightLastOption();
            }
            if(wasSelected){
              this._announceOption(this.dropDown.getHighlightedOption());
            }
          } else if(this.autoComplete 
            && !this._prev_key_backspace
            //**************
            && nodes != undefined
            //**************
            // when the user clicks the arrow button to show the full list,
            // startSearch looks for "*".
            // it does not make sense to autocomplete
            // if they are just previewing the options available.
            && !/^[*]+$/.test(query[this.searchAttr].toString())){
              this._announceOption(nodes[1]); // 1st real item
          }
    
          if(this.item === undefined){ // item == undefined for keyboard search
            // If the search returned no items that means that the user typed
            // in something invalid (and they can't make it valid by typing 
            // more characters),
            // so flag the FilteringSelect as being in an invalid state
            this.validate(true);
          }
      };
    })();
});