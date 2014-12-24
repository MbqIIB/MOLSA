/*
 * Copyright 2011 Curam Software Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Curam
 * Software, Ltd. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with Curam Software.
 */

/* Modification
 * ------------
 * 10-May-2011 BD Upgraded for accessibility. Allow the tooltip to be opened 
 *                and closed from the keyboard. Added alt text to the close
 *                button.
 * 22-Feb-2011 BD Override destory and destroyDescendents functions to do nothing, 
 *                which fixes a bug that is causing the IE8 browser to crash.
 * 08-Feb-2011 BD Add on click action to remove styling from the tooltip node.
 *                This removes positional styling which is initially set to 
 *                top:5000px;left:5000px, to ensure the dialog is not seen while
 *                the page is rendering. When clicked the style is removed and 
 *                the dialog place in the correct location.
 * 
 * 
 * 
 */

dojo.provide("curam.DelayedTooltipDialog");
dojo.require("dijit.TooltipDialog");

  // ___________________________________________________________________________
  /**
   * Defines a new curam javascript widget called DelayedTooltipDialog which
   * is based on the dojo's dijit.TooltipDialog.
   *
   * The tooltip opens by clicking on a target and is closed by clicking the
   * close icon which is added to the tooltip. 
   *
   *
   */  
dojo.declare("curam.DelayedTooltipDialog", dijit.TooltipDialog, {

  closeDelay: 1000,
   
  openDelay: 1000,
  
  orientation: null,

  targetNode: "",
  
  closeButton: "",
  
  closeButtonAltText: "",
 
  postCreate: function(){
  
    this.inherited(arguments);
    
    dojo.style(this.domNode, "display", "none");
    
    var link = 
      "<div>" +
    		"<a waiRole=\"button\">&nbsp;</a>" +
    		"<span class=\"hiddenControlForScreenReader\">" + 
    		  this.closeButtonAltText + 
    		"</span>" +
      "</div>"
    
    // find the tooltipDiv node and add the close icon to it 
    var tooltipDiv = dojo.query('.dijitTooltipContents > div', this.domNode)[0];
    this.closeButton = 
      dojo.create("div", { innerHTML: link }, tooltipDiv);
    dojo.attr(this.closeButton, "class", 
      "tooltip-close-button tooltip-close-button-normal");
    dojo.attr(this.closeButton, "tabIndex", "0");

    // Store a copy of 'this' for inner functions
    var _this = this;
    
    this.connect(this.closeButton, "onmouseover", 
      function(){
        dojo.attr(this.closeButton, "class", 
          "tooltip-close-button tooltip-close-button-mouseover");
    });
    this.connect(this.closeButton, "onfocus", 
      function(){
        dojo.attr(this.closeButton, "class", 
          "tooltip-close-button tooltip-close-button-mouseover");
    });
    this.connect(this.closeButton, "onmouseout", 
      function(){
       dojo.attr(this.closeButton, "class", 
         "tooltip-close-button tooltip-close-button-normal");
    });
    this.connect(this.closeButton, "onblur", 
        function(){
         dojo.attr(this.closeButton, "class", 
           "tooltip-close-button tooltip-close-button-normal");
      });
    
    
    // Add event handlers for the tooltip
    if(this.targetNode) {    
      this.targetNode = dojo.byId(this.targetNode);
      
      // Setup events for the target node
      this.connect(this.targetNode, "onmouseover",
         function(){   
       
           dojo.attr(_this.targetNode, "style", {cursor:"pointer"});  
           dojo.attr(_this.targetNode, "class", "rollover");
           dojo.connect(_this.targetNode, 'onclick', _this, _this.openTooltip);           
         }
      );
      
      // Setup events for the target node
      this.connect(this.targetNode, "onfocus", function(){   
          dojo.attr(_this.targetNode, "style", {cursor:"pointer"});  
          dojo.attr(_this.targetNode, "class", "rollover");
          dojo.connect(_this.targetNode, 'onkeypress', _this, 
            _this.openTooltip);           
      });      
         
      this.connect(this.targetNode, "onmouseout", function(){     
           dojo.attr(_this.targetNode, "class", "normal");   
      });      

      this.connect(this.targetNode, "onclick", function(event){
       dojo.stopEvent(event);
      });
     
    }
  },

  openTooltip: function(event){
    
    // summary:
    //       open the tooltip associated with the item that was just clicked or
    //       entered.
    // 
    // parameter: Event
    //       the event from which this function was invoked.
    
    var _this = this;
    if (event.type==="keypress" && !CEFUtils.enterKeyPress(event)) {
      return;
    } 
    
    var tooltip = dojo.byId(_this.id);
    dojo.removeClass(tooltip,'tooltip-startup-position');
        
    var node = dijit.popup.open(
      { popup: _this, 
        around: _this.targetNode, 
        orient: _this.orientation  
    });

    _this.closeButton.focus();
    
    var clickHandle = dojo.connect(_this.closeButton, 'onclick', function() {
      dojo.disconnect(clickHandle);
      _this.close();
    });
    var keypressHandle = 
      dojo.connect(_this.closeButton, 'onkeypress', function(event) {
        if (_this.isValidKeyPress(event)) {
          dojo.disconnect(keypressHandle);
          _this.close();
        }     
      });
    
  }, 
  
  destroyDescendants: function(/*Boolean*/ preserveDom){
    // do nothing - bug fix to stop the browser from crashing
  },
  
  destroy: function() {
    // do nothing - bug fix to stop the browser from crashing
  },
  
  close: function() {
    
    // summary:
    //    Closes the tooltip and resets the tooltips CSS class.
      
    var _this = this;
    dojo.attr(_this.closeButton, 
      "class", "tooltip-close-button tooltip-close-button-active");
    dijit.popup.close(_this);
    dojo.attr(_this.closeButton, 
      "class", "tooltip-close-button tooltip-close-button-normal");
    _this.targetNode.focus();
  },
  
  isValidKeyPress: function(event) {
    // summary
    //   given an event check that it is a keypress on the 'enter' key
    //   
    // parameter: event
    //   an event
    
    var result = (event.type==="keypress" && CEFUtils.enterKeyPress(event));
    return result;
  }
  
});
