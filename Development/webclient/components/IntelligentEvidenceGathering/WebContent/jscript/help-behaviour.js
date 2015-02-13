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
  "dojo/ready",
  "dojo/fx", 
  "dojo/number",  
  "dojo/behavior",
  "dojo/dom",
  "dojo/parser",
  "dojo/html",
  "dijit/Dialog",
  "dijit/focus",
  "dijit/registry",  
  "dojox/layout/ContentPane",
  "dojox/widget/Standby",
  "cm/_base/_form", 
  "cm/_base/_behavior", 
  "cm/_base/_dom", 
  "cm/_base/_topics", 
  "cm/_base/_pageBehaviors", 
  "cm/_base/_validation", 
  "curam/util", 
  "curam/util/Dialog",
  "curam/IEGTooltip"];
 
require(modules, function(domReady, ready) {

    domReady(function() {
      console.log("dojo/domReady !!");
    });
    
    ready(function() {
      console.log("dojo/ready !!");
      
      // fire the page loaded event
      dojo.publish("ieg-page-loaded");
    });
});

/**
 * When the page has finished loading an event is fired.
 * Any items that need to hook into this event can be put here.
 */
dojo.subscribe("ieg-page-loaded", function() {
  // discover if this is an internal or external style script
  ieg.setScriptStyleFlag();
});

/**
 * Register the Page Behaviours.
 * These behaviours are used to hook up navigation buttons for example. 
 */ 

/**
 * Behaviour related to the onClick event of the Collapsible Help Panels
 */
cm.registerBehavior("collapsibleHelp", {
  ".bhv-open" :
  {
    "onclick": function(evt) {
      dojo.stopEvent(evt);
      var wrapper = cm.getParentByClass(evt.target, "cluster") 
        || cm.getParentByClass(evt.target, "list");

      dojo.query(".bhv-collapsible", wrapper)
        .forEach(function(collapsible){
          if (dojo.style(collapsible, "display") == 'none')
          {
            dojo.style(collapsible, "display", "block");
            if (!collapsible._shrunk && dojo.isIE == 6) {
              collapsible._shrunk = true;
              var width = dojo.style(collapsible.parentNode, "width");
              dojo.style(collapsible, "width", (width - 4) + "px");
            }   
            dojo.style(collapsible, "height", "1px");
            dojo.fx.wipeIn({node:collapsible, onEnd: function(){
              // Transfer the focus to the the matching anchor tag for a11y
              var href = evt.target.getAttribute("href");
              if (href != null && href.length > 1) {
                dojo.query("a[name=" + href.substring(1) + "]").
                  forEach("item.focus()");
              }
            }}).play();
            dojo.removeClass(collapsible, "ifScript-hide");
            dojo.removeClass(evt.target, "openHelpLink");
            dojo.addClass(evt.target, "openHelpLinkSelected");
            
            // flag to screen readers that the cluster is visible 
            dojo.attr(evt.target, "aria-expanded", "true");
          }
          else
          {
            dojo.fx.wipeOut({node:collapsible, onEnd:function(){
              dojo.style(collapsible, "display", "none");
              dojo.removeClass(evt.target, "openHelpLinkSelected");
              dojo.addClass(evt.target, "openHelpLink");
              
              // flag to screen readers that the cluster is invisible 
              dojo.attr(evt.target, "aria-expanded", "false");
          }}).play();
        }
      });
      dojo.publish("/anim/toggle");
    }
  },
  ".bhv-close" :
  {
    "onclick": function(evt) {
      dojo.stopEvent(evt);
      var input = evt.target;
      var wrapper = cm.getParentByClass(evt.target, "cluster") 
        || cm.getParentByClass(evt.target, "list");
      var collapsible = dojo.query(".bhv-collapsible", wrapper)[0];
      dojo.style(collapsible, "overflowY", "hidden");
      dojo.fx.combine([
        dojo.fx.wipeOut({node: collapsible})
      ]).play();

      var openLink = dojo.query(".bhv-open", wrapper)[0];
      dojo.removeClass(openLink, "openHelpLinkSelected");
      dojo.addClass(openLink, "openHelpLink");
      
      // flag to screen readers that the cluster is invisible 
      dojo.attr(openLink, "aria-expanded", "false");
      
      // reset the focus to the help link.
      dijit.focus(openLink);

      dojo.publish("/anim/toggle");
    }
  }
});

/**
 * Script Notes handling.
 */
cm.registerBehavior("collapsibleNotes", {
  ".bhv-notes-open" :
  {
    "onclick": function(evt) {
      dojo.stopEvent(evt);
      var node = dojo.byId("notesDiv");
      
      if (dojo.style(node, "display") == 'none')
      {
        dojo.style(node, "display", "block");
        dojo.style(node, "height", "1px");
        dojo.fx.wipeIn({node: node}).play();
      }  
      else
      {
        dojo.fx.wipeOut({node: node, onEnd:function(){
          dojo.style(node, "display", "none");
        }}).play();
      }
    }
  },
  ".bhv-notes-close" :
  {
    "onclick": function(evt) {
      dojo.stopEvent(evt);
      var node = dojo.byId("notesDiv");
      dojo.fx.wipeOut({node: node, onEnd:function(){
        dojo.style(node, "display", "none");
      }}).play();
    }
  }
});

/**
 * Handle onClick of the Next button
 */
cm.registerBehavior("next-button", {
  ".bhv-next-button" :
  {
    "onclick": function(evt) {
    return iegXHR.doSubmit(evt, this);
    }
  },
  "input[type='text'],select,input[type='checkbox'],input[type='radio'],input[type='password']": {
    "onkeypress" : function(evt) {  
      if(evt.keyCode == dojo.keys.ENTER) {
        // Check if the input field is a dropdown
        if(evt.target.parentNode.getAttribute("role") == "listbox") {
        	var input = dijit.registry.byId(evt.target.id);
        	// Added a check so that form is not submitted when "Enter" key
        	// is pressed in open state of dropdown.
        	if (typeof input != "undefined") {
          		var dropdownWidget = dijit.registry.byNode(dojo.byId("widget_" + evt.target.id));
          		if(dropdownWidget && dropdownWidget.enterKeyOnOpenDropDown) {
		            dropdownWidget.enterKeyOnOpenDropDown = false;
    	        	return false;
        	  	}
        	}
        }
        var next = dojo.query(".bhv-next-button .next")[0];
        return iegXHR.doSubmit(evt, next ? next.parentNode : null);
      }
      return true;
    },
   "onkeyup" : function(evt) {
      evt.target._timer && clearTimeout(evt.target._timer);
      evt.target._timer = setTimeout(function(){
          ieg.checkExpression(evt.target);
          evt.target._timer = null;
        }, 200);
    } 
  }
});

/**
 * Handle onClick of the Save & Exit button
 */
cm.registerBehavior("save-exit-button", {
  ".bhv-save-exit-button" :
  {
    "onclick": function(evt) {
    return iegXHR.doSaveAndExit(evt, this);
    }
  }
});

/**
 * Handle onClick of the Exit button
 */
cm.registerBehavior("exit-button", {
  ".bhv-exit-button" :
  {
    "onclick": function(evt) {
      return iegXHR.doExit(evt, this);
    }
  }
});

cm.registerBehavior("scroll-person-tabs", {
  "a.personTabsDiv" :
  {
    "found": function(node) {
      
      var currentPeople = dojo.query('.currentPerson');

      if (currentPeople.length < 1) {return;}

      var currentPerson = currentPeople[0];
      var pos = dojo.position(currentPerson);
      var size = dojo.marginBox(node);

      if (pos.x > size.w - 50) {
        node.scrollLeft = pos.x - size.w;
      }
    }
  }
});

/**
 * This page behaviour is used by the list "Add" link.
 * For example, if there is a grouped/nested list, there is a dropdown 
 * containing values which are used to add items (i.e. incomes). 
 * This code submits the link to add items fro the value selected in the 
 * dropdown. 
 */
cm.registerBehavior("IEG_GROUPED_HEAD_SELECT", {
  ".bhv-grouped-head-select" : {
    onclick: function(evt) {
      var id = evt.target.getAttribute("id");
      var select = dojo.byId(id.substring(0, id.length - 2) + "-list");
    
      var linkNode = dojo.byId(id);

      var loopindex = select.value;
      var href = evt.target.getAttribute("href");
      href += "&ieglidx=" + loopindex;

      dojo.attr(linkNode, "href", href);
      return iegXHR.iegLink(evt, linkNode);

    }
  }
});

/**
 * Behaviour for IEG Links
 */
cm.registerBehavior("IEG_LINKS", {
  "a.bhv-ieg-link" :
  {
    "onclick": function(evt) {
      dojo.stopEvent(evt);
    }
  }
});

/**
 * Using a single global object to wrap all functions.
 */
var ieg = {

  /**
   * Sets a flag to denote if the script is being run in internal or external
   * mode. This relies on the class attribute of the Body node being "oneui".
   */
  _isExternalMode: false,
  setScriptStyleFlag: function() {
    _isExternalMode = false;
    if(dojo.attr(dojo.body(), "class") == "oneui") {
      _isExternalMode = true;
    }
  },
  isExternalMode: function() {
    return _isExternalMode;
  },
  
  /**
   * Convert mandatory fields from true to false.
   * 
   * This function is used with the Save & Exit buttons and the 
   * "validate-save-and-exit" configuration option. If false then all the
   * mandatory fields in the form are changed from true to false to disable
   * validation on Save & Exit
   */
  mandatoryConversion: function() {
     var metaInput = dojo.query("input[name='__o3fmeta']")[0];
     var data = dojo.fromJson(metaInput.value);
     var validateSaveAndExitInput = 
       dojo.query("input[name='validate-save-and-exit']")[0];
     var validateSaveAndExit = dojo.fromJson(validateSaveAndExitInput.value);
        
     var input;
     if (validateSaveAndExit==false) {
       for(var name in data) {
          input = data[name];
          if (input[0].indexOf("validate-save-and-exit") < 0) {
            if(input[3] === true) {
              input[3] = false;
            }
          }
       };
     }
     metaInput.value = dojo.toJson(data);  
  },
  
  /**
   * Helper function used for checking mandatory fields.
   * 
   * Mandatory fields in hidden clusters do nto become mandatory until the 
   * cluster is revelaed. This function handles that scenario.
   */
  conditionalMandatoryHandling: function() {
  
    // Get all IDs of questions in hidden clusters
    var hiddenIDs = dojo.query(
      "div.cluster.conditional.hidden input").map("return item.id;");
    hiddenIDs = hiddenIDs.concat(
      dojo.query("div.cluster.conditional.hidden select")
      .map("return item.id;"));
    hiddenIDs = hiddenIDs.concat(
      dojo.query("div.cluster.conditional.hidden textarea")
      .map("return item.id;"));
    hiddenIDs = hiddenIDs.concat(
      dojo.query("div.cluster.conditional.hidden table[role='combobox']")
      .map("return item.id;"));
    hiddenIDs = hiddenIDs.concat(
      dojo.query("div.cluster.conditional.hidden input[type='radio', data-dojo-attach-point='focusNode']")
      .map("return item.name;"));
  
    var metaInput = dojo.query("input[name='__o3fmeta']")[0];
    var data = dojo.fromJson(metaInput.value);

    var i;
    for (var i = 0; i < hiddenIDs.length; i++) {
      var isMandatory = ieg._getMandatoryIndicator(hiddenIDs[i]);
      if (isMandatory = true) {
        for(var name in data) {
          input = data[name];
          if (name == hiddenIDs[i]) {
            if(input[3] === true) {
              input[3] = false;
            }
          }
         }
       }
    }
    
    metaInput.value = dojo.toJson(data);
  },
  
  /**
   * Helper function used for checking mandatory fields.
   * 
   * Mandatory fields in hidden clusters do nto become mandatory until the 
   * cluster is revelaed. This function handles that scenario.
   * 
   * @param clusterId
   * @param direct
   * @param changed
   */
  conditionalMandatoryHandlingById: function(clusterId, direct, changed) {

    if (!changed) return;
    var clusterIds;
    var directControlValues;
    var functions;
    if (clusterId.indexOf(",") > 0) {
      clusterIds = clusterId.split(",");
      directControlValues = direct.split(",");
    } else {
      clusterIds = new Array(clusterId);
      directControlValues = new Array(direct);
    }
    
    var metaInput = dojo.query("input[name='__o3fmeta']")[0];
    var data = dojo.fromJson(metaInput.value);
    
    var x;
    
    for (x in clusterIds) {
      // Get all IDs of questions in hidden and visible clusters
      clusterId = clusterIds[x];
      direct = directControlValues[x];

      var clusHiddenIDs = dojo.query(
        "div[id='" + clusterId + "'].cluster.conditional.hidden input")
        .map("return item.id;");
      clusHiddenIDs = clusHiddenIDs.concat(
        dojo.query("div[id='" + clusterId + "'].cluster.conditional.hidden select")
        .map("return item.id;"));
      clusHiddenIDs = clusHiddenIDs.concat(
        dojo.query("div[id='" + clusterId + "'].cluster.conditional.hidden textarea")
        .map("return item.id;"));
      clusHiddenIDs = clusHiddenIDs.concat(
        dojo.query("div[id='" + clusterId + "'].cluster.conditional.hidden table[role='combobox']")
        .map("return item.id;"));
      clusHiddenIDs = clusHiddenIDs.concat(
        dojo.query("div[id='" + clusterId + "'].cluster.conditional.hidden input[type='radio', data-dojo-attach-point='focusNode']")
        .map("return item.name;"));
      var clusVisibleIDs = dojo.query(
        "div[id='" + clusterId + "'].cluster.conditional.visible input")
        .map("return item.id;");
      clusVisibleIDs = clusVisibleIDs.concat(
        dojo.query("div[id='" + clusterId + "'].cluster.conditional.visible select")
        .map("return item.id;"));
      clusVisibleIDs = clusVisibleIDs.concat(
        dojo.query("div[id='" + clusterId + "'].cluster.conditional.visible textarea")
        .map("return item.id;"));
      clusVisibleIDs = clusVisibleIDs.concat(
        dojo.query("div[id='" + clusterId + "'].cluster.conditional.visible table[role='combobox']")
        .map("return item.id;"));
      clusVisibleIDs = clusVisibleIDs.concat(
        dojo.query("div[id='" + clusterId + "'].cluster.conditional.visible input[type='radio', data-dojo-attach-point='focusNode']")
        .map("return item.name;"));

      for (var j = 0; j < clusHiddenIDs.length; j++) {
        var isMandatory = ieg._getMandatoryIndicator(clusHiddenIDs[j]);
        if (isMandatory == true) {
          for(var name in data) {
            input = data[name];
            if (name == clusHiddenIDs[j]) {
              if (input[3] === true) {
                input[3] = false;
              }
            }
           }
         }
      } 
      
      for (var i = 0; i < clusVisibleIDs.length; i++) {
        var isMandatory = ieg._getMandatoryIndicator(clusVisibleIDs[i]);
        if (isMandatory == true && directControlValues[x] == "true") {
          for(var name in data) {
            input = data[name];
            if (name == clusVisibleIDs[i]) {
              if(input[3] === false) {
                input[3] = true;
              }
            }
           }
         }
      }
    }
    
    metaInput.value = dojo.toJson(data);
  },
  
  /**
   * Get the mandatory indicator for the specified Id.
   * 
   * @param hiddenID The Id of the field to get the mandatory indicator for.
   * 
   * @return The Mandatory indicator for the specified field.
   */
  _getMandatoryIndicator: function(hiddenID) {
     var mandatoryFields = ieg._getMandatoryFields();
     for (var i = 0; i < mandatoryFields.length; i++) {
       if (mandatoryFields[i] == hiddenID) {
         return true;
       }
     }
     return false;
  },
  
  /**
   * Gets all the mandatory fields on a page.
   * 
   * @return List of mandatory fields.
   */
  _getMandatoryFields: function() {
     var metaInput = dojo.query("input[name='__o3fmeta_mandatory_data']")[0];
     var mandatoryFields;
     
     if (metaInput.value.indexOf(",") > 0) {
       mandatoryFields = metaInput.value.split(",");
     } else {
       mandatoryFields = new Array(metaInput.value);
     }
        
     return mandatoryFields;
  },
 
  /**
   * An IEG modal dialog Widget used with the internal IEG style
   * 
   * Pops up a modal dialog window, blocking access to the screen
   * and also graying out the screen. This dialog is extended from
   * dijit.Dialog.
   * 
   * @param title
   * @param message
   * @param okButtonText
   * @param cancelButtonText
   * @param node
   * @param nodeID
   * @param evt
   */
  confirmAction: function(title, message, okButtonText, cancelButtonText, 
    node, nodeID, evt) {    
    
    dojo.stopEvent(evt);
    
    var dojoPanel=document.createElement("div");
    
    var contentPanel = document.createElement("div");
    contentPanel.setAttribute("class", "confirmContentPanelDiv");
    contentPanel.setAttribute("className", "confirmContentPanelDiv");

    var headingDiv = document.createElement("div");
    headingDiv.setAttribute("class", "confirmHeadingDiv");
    headingDiv.setAttribute("className", "confirmHeadingDiv");

    var titleDiv = document.createElement("div");
    titleDiv.setAttribute("class", "confirmTitleDiv");
    titleDiv.setAttribute("className", "confirmTitleDiv");
    titleDiv.innerHTML = title;

    var closeLink = document.createElement("a");
    closeLink.setAttribute("id", "close");
    closeLink.setAttribute("title", "Close");
    closeLink.href = "#";
    closeLink.setAttribute("class", "confirmCloseLink");
    closeLink.setAttribute("className", "confirmCloseLink");

    var closeDiv = document.createElement("div");
    closeDiv.setAttribute("class", "confirmCloseDiv");
    closeDiv.setAttribute("className", "confirmCloseDiv");

    closeDiv.appendChild(closeLink);
    headingDiv.appendChild(titleDiv);
    headingDiv.appendChild(closeDiv);
    contentPanel.appendChild(headingDiv);

    var lineDiv = document.createElement("div");
    lineDiv.setAttribute("class", "confirmLineDiv");
    lineDiv.setAttribute("className", "confirmLineDiv");
    contentPanel.appendChild(lineDiv);

    var contentDiv = document.createElement("div");
    contentDiv.setAttribute("class", "confirmContentDiv");
    contentDiv.setAttribute("className", "confirmContentDiv");
   
    var okButtonContainerSpan = document.createElement("span");
    okButtonContainerSpan.setAttribute("class","confirmButtonLeft");
    var okButtonSpan = document.createElement("span");
    okButtonSpan.setAttribute("class","confirmButtonRight");
    
    var okButton = document.createElement("span");
    var okButtonText = document.createTextNode(okButtonText);
    okButton.appendChild(okButtonText);
    okButton.setAttribute("id", "okButton");
    okButton.href = "#";
    okButton.setAttribute("class", "confirmButtonDiv");
    okButton.setAttribute("type", "button");
    okButton.setAttribute("className", "confirmButtonDiv");
    okButton.setAttribute("tabIndex", "0");

    okButtonSpan.appendChild(okButton)
    okButtonContainerSpan.appendChild(okButtonSpan);  

    var cancelButtonContainerSpan = document.createElement("span");
    cancelButtonContainerSpan.setAttribute("class","confirmButtonLeft");
    var cancelButtonSpan = document.createElement("span");
    cancelButtonSpan.setAttribute("class","confirmButtonRight");
    
    var cancelButton = document.createElement("span");
    var cancelButtonText = document.createTextNode(cancelButtonText);
    cancelButton.appendChild(cancelButtonText);
    cancelButton.setAttribute("id", "cancelButton");
    cancelButton.href = "#";
    cancelButton.setAttribute("class", "confirmButtonDiv");
    cancelButton.setAttribute("type", "button");
    cancelButton.setAttribute("className", "confirmButtonDiv");
    cancelButton.setAttribute("tabIndex", "0");

    cancelButtonSpan.appendChild(cancelButton)
    cancelButtonContainerSpan.appendChild(cancelButtonSpan);  
    
    var messageParagraph = document.createElement("p");
    var messageText = document.createTextNode(message);
    messageParagraph.appendChild(messageText);
   
    contentDiv.appendChild(messageParagraph);
    contentDiv.appendChild(okButtonContainerSpan);
    contentDiv.appendChild(cancelButtonContainerSpan);
    
    contentPanel.appendChild(contentDiv);
    dojoPanel.appendChild(contentPanel);      

    var confirmDialog = new dijit.Dialog({},dojoPanel);
    confirmDialog.setAttribute("id", "confirmDialog");
    confirmDialog.setAttribute("tabIndex", "0");
    
    dojo.connect(okButton, 'onclick', function(){
      confirmDialog.focused = false;
      confirmDialog.hide();
      iegXHR.iegLink(evt, nodeID);
    } ,false);
    
    // allow for access using keyboard
    dojo.connect(okButton, 'onkeypress', function(e){
      if(e.keyCode == dojo.keys.ENTER) {
        confirmDialog.focused = false;
        confirmDialog.hide();
        iegXHR.iegLink(evt, nodeID);
      }
    } ,false);

    dojo.connect(cancelButton, 'onclick', function(){
      confirmDialog.focused = false;
      confirmDialog.hide();
      confirmDialog.destroyRecursive();
    } ,false);  
    
   
    dojo.connect(cancelButton, 'onkeypress', function(e){
      if(e.keyCode == dojo.keys.ENTER) {
        confirmDialog.focused = false;
        confirmDialog.hide();
        confirmDialog.destroyRecursive();
      }
    } ,false);  

    dojo.connect(closeLink, 'onclick', function(){
      confirmDialog.focused = false;
      confirmDialog.hide();
      confirmDialog.destroyRecursive();
    } ,false);               

    confirmDialog.show();   
  }, 

  /**
   * A modal dialog Widget used with the external IEG style
   * 
   * Pops up a modal dialog window, blocking access to the screen
   *    and also graying out the screen. This dialog uses the OneUI
   *    dialog.
   * 
   * @param title
   * @param message
   * @param okButtonText
   * @param cancelButtonText
   * @param node
   * @param nodeID
   * @param evt
   */
  confirmActionExternal: function(title, message, okButtonText, 
    cancelButtonText, node, nodeID, evt) {  

    dojo.stopEvent(evt);
    
    var randomNumber=Math.floor(Math.random()*1001);
    var confirmDialog = new idx.oneui.Dialog({
    id: "confirmDialog-" + randomNumber,
    title: title,
    content: "<span class=\"confirmContentDiv\">"+message+"</span>",
    buttons: [new dijit.form.Button({
      label: okButtonText,
      onClick: function(evt){confirmDialog.hide(); 
      return iegXHR.iegLink(evt, nodeID);}
      })],
      closeButtonLabel: cancelButtonText
    }, "confirmDialog");
    confirmDialog.show();       
  },  
  
  /**
   * Clear various input fields in hidden clusters.
   * 
   * When a conditional cluster is hidden, the input fields contained in the
   * cluster should be reset.
   * 
   * @param clusterDiv  The conditional cluster
   */
  _clearClusterInputFields: function (clusterDiv) {
    // external style widgets. in this case do a lookup of all widgets in the
    // DOM node. If any found widget has a "value" attribute then reset its 
    // value.
    if(ieg.isExternalMode()) {    
      var formWidgets = dijit.registry.findWidgets(clusterDiv);
      dojo.forEach(formWidgets, function(item) {
        var widgetType = item.get('type');
        if(widgetType == 'checkbox' || widgetType == 'radio') {
          item.setAttribute("checked", false);
        } else if (item.declaredClass == "dijit.form.DateTextBox") {
          item.reset();
        } else if(dojo.hasAttr(item, "value")) {
          item.attr("value", "");
        }
      });
    }
    // internal style. look up the various input types and reset them. 
    else {
      dojo.query("textarea", clusterDiv).
        forEach("item.value = ''");
      dojo.query("select", clusterDiv).
        forEach("item.options[0].selected = true");
      dojo.query("input[type='text']", clusterDiv).
        forEach("item.value = '';");
      dojo.query("input[type='checkbox']", clusterDiv).
        forEach("item.checked = false;");
      dojo.query("input[type='radio']", clusterDiv).
        forEach("item.checked = false;");
    }
  },
  
  /**
   * Get the value of an input field or widget.
   * 
   * This function gets the value of each of the various input fields and 
   * widegts. An optional second parameter can be passed in which denotes the
   * type of field being looked up.
   * 
   * TODO: This function needs to be refactored. Maybe split out into  
   *    internal & external functions.
   * 
   * @param name  The name of the field to get the value for.
   * @param type  (Optional) An optional parameter defining the field type.
   * 
   * @return The fields value.
   */
  _getValue: function(name, type) {
    id = "";
    
    meta = dojo.fromJson(dojo.query("input[name='__o3fmeta']")[0].value);
    for (var i in meta) {
      var index = meta[i][0].indexOf(name);
      if (index > -1) {
        if (meta[i][0].substr(index).length == name.length) {
          id = i;
          break;
        }
      }
    }
    
    var node = dojo.byId(id);
    
    // If node is null, this is a radio button in external style
    if (node == null) {
      var buttons = dojo.query("input[name='" + id + "']");
      var returnVal = null;
      for (var j in buttons) {
        if (buttons[j].checked) {
          returnVal = buttons[j].value; 
          break;
        }
      }
      return returnVal;
    } else if (node.tagName == "INPUT" && node.type == "checkbox") {
      return node.checked;
    } else if (node.tagName == "SELECT") {
      var option = node.options[node.selectedIndex];
      if (option) {
        return option.value;
      }
    } else if (node.tagName == "INPUT" && node.type == "text") {
      if (type == "number") {
        return dojo.number.parse(node.value);
      } else if (type == "date") {
        var date =
          dojo.date.locale.parse(node.value, 
            {strict:false, selector: "date", 
              datePattern:dojo.attr(node,"datePattern")});
        if (date == null || date.getFullYear() < 1000) {
          date = new Date(0,0,0);
        }
        return date;
      } else if(type == "codetable") {
        // if the input type is text and the type is "codetable" then
        // this is a filtering select widget
        return dijit.byId(id).attr('value');
      } else {
        return node.value;
      }
    } else if (node.tagName == "INPUT" && node.type == "radio") {
      var buttons = dojo.query("input[name='" + id + "']");
      var returnVal = null;
      for (var j in buttons) {
        if (buttons[j].checked) {
          returnVal = buttons[j].value; 
          break;
        }
      }
      return returnVal;
    } else if (node.tagName == "TABLE") {
      // If the tag name is TABLE, this is an external select widget
      var nodeValue = dijit.byId(id).attr('value');
      return nodeValue;
    }
    
    return null;
  },
  
  /**
   * Check a custom expression.
   * 
   * @param target
   */
  checkExpression: function(target) {
    if(target.onchange) {
      return target.onchange();
    }
    return true;
  },
  
  /**
   * Show/Hide conditional clusters.
   * 
   * This function is used to show/hide conditional clusters.
   * 
   * @param clusterId   The id of the cluster to show/hide.
   * @param functionName  
   */
  _setVisibleCSS: function(clusterId, functionName) {
      var clusterDiv = dojo.byId(clusterId);
      try {
        if (dojo.hitch(null, functionName)()) {
          dojo.addClass(clusterDiv, "visible");
          if (dojo.hasClass(clusterDiv, "hidden")) {
            dojo.removeClass(clusterDiv, "hidden");
          }
        } else {
          dojo.addClass(clusterDiv, "hidden");
          if (dojo.hasClass(clusterDiv, "visible")) {
            dojo.removeClass(clusterDiv, "visible");
          }
        }
      } catch (e) {
        //Do nothing if an error occurs while evaluating func
      }
  },
  
  /**
   * Enable read-only questions.
   * 
   * This function is used to enable static read-only questions.
   * 
   * @param internalId     The internal id of the field to enable.
   * @param functionName
   */
  setStaticReadOnly: function(internalId, functionName) {
    var internalIdAttr = 'data-ieg-internalid';
    try {
      if (dojo.hitch(null, functionName)()) {
        dojo.query("[" + internalIdAttr + "=" + internalId + "]").
          forEach("item.setAttribute('disabled', 'disabled');");
      } else {
        dojo.query("[" + internalIdAttr + "="+ internalId + "]").
          forEach("item.removeAttribute('disabled', 0);");
      }
    } catch (e) {
      // Do nothing if an error occurs while evaluating func
    }
  },
  
   /**
   * Enable read-only questions.
   * 
   * This function is used to enable dynamic read-only questions.
   * 
   * @param internalId The internal id of the field to enable.
   * @param functionName
   */
  setDynamicReadOnly: function(node, internalId, direct, func, clear) {
    var internalIdAttr = 'data-ieg-internalid';
    var initialValueAttr = 'data-ieg-initialvalue';
    var internalIds;
    var directControlValues;
    var functions;
    var changed = false;
    if (internalId.indexOf(",") > 0) {
      internalIds = internalId.split(",");
      directControlValues = direct.split(",");
      functions = func.split(",");
    } else {
      internalIds = new Array(internalId);
      directControlValues = new Array(direct);
      functions = new Array(func);
    }
      
    var i;
    for (i in internalIds) {
      internalId = internalIds[i];

      try {
        if(ieg.isExternalMode()) {
          
          var inputFields = dojo.query("[" + internalIdAttr + "=" + internalId + "]");
           
          var enable;
          if (dojo.hitch(null, functions[i])()) {
            enable = false;
          } else {
            enable = true;
          }
          for(var counter = 0; counter < inputFields.length; counter++) {
            var widget = dijit.byId(inputFields[counter].id);
            var initialValue = widget.get(initialValueAttr);
            if (enable == false) {
              widget.set("disabled", true);
              var widgetType = widget.get('type');
              
              if(widgetType == 'checkbox' || widgetType == 'radio') {
                // If the clear flag is set to true, set the initial value to false.
                if (clear) {
                  initialValue = false;
                } else {
                  if(initialValue == "true" || initialValue == "checked") {
                    initialValue = true;
                  } else if (initialValue == "false" || initialValue == "unchecked"){
                    initialValue = false;
                  }
                }
                widget.set("checked", initialValue);
              } else if(widget.get('popupClass') == 'dijit.Calendar') {
                if (clear) {
                  // TODO: Need to check is calling this function actually resets the 
                  // calendar widget to the default date or the original date.
                  widget.reset();
                } else {
                  if(initialValue == '') {
                    widget.reset();
                  } else {
                    widget.set("value", initialValue);
                  }
                }
              } else if(dojo.hasAttr(widget, "value")) {
                if (clear) {
                  // Cannot call the reset() function here as this is setting the value
                  // of the widget back to what it originally was rather than clearing
                  // it which is what is required.
                  widget.set("value", '');
                } else {
                  // The third parameter sets the "priorityChange" param explicitly 
                  // to false to prevent the onChange event from firing when the 
                  // value of a dropdown is changed programatically                
                  widget.set("value", initialValue, false);
                }
              }
            } else {
              widget.set("disabled", false);
            }
          }
        } else {
          if (dojo.hitch(null, functions[i])()) {
		        if (clear) {
              // disable fields and clearing the value
              dojo.query("textarea["+ internalIdAttr + "=" + internalId + "]").forEach("item.setAttribute('disabled', 'disabled');");
              dojo.query("select[" + internalIdAttr + "=" + internalId + "]").forEach("item.setAttribute('disabled', 'disabled');");
              dojo.query("input[" + internalIdAttr + "=" + internalId + "]").forEach("item.setAttribute('disabled', 'disabled');");
            } else {
              // disable fields and not clearing the value.
              dojo.query("textarea["+ internalIdAttr + "=" + internalId + "]").forEach("item.value = item.getAttribute('" + initialValueAttr + "'); item.setAttribute('disabled', 'disabled');");
              dojo.query("select[" + internalIdAttr + "=" + internalId + "]").forEach("item.selectedIndex = item.getAttribute('" + initialValueAttr + "'); item.setAttribute('disabled', 'disabled');");
              dojo.query("input[" + internalIdAttr + "=" + internalId + "]").forEach("if (item.type=='text'){item.value = item.getAttribute('" + initialValueAttr + "');} else {if (item.getAttribute('" + initialValueAttr + "')=='false'){item.checked = false;} else {item.checked = true;} } item.setAttribute('disabled', 'disabled');");
            }
          } else {
            // enable fields
            dojo.query("[" + internalIdAttr + "=" + internalId + "]").forEach("item.removeAttribute('disabled', 0);");
          }
        }
      } catch (e) {
        //Do nothing if an error occurs while evaluating func
      }
    }
    dojo.publish("/anim/toggle");
    return changed;
  },
  
  /**
   * Show Field Level Help.
   * 
   * Show the field Level Help dialog on hover.
   * 
   * @param dialogId  The dialogs Id
   * @param parentId  The parent Id 
   */
  showHelpDialog: function(dialogId, parentId) {
    var dialog = dijit.byId(dialogId);
    var currentStyle = dojo.style(dialogId);
    
    if (currentStyle.display == "none") {
      dojo.style(dialogId,'width', '350px');
      dojo.style(dialogId,'overflow-x', 'visible');
      dojo.style(dialogId, 'display', 'block');
      
      dijit.popup.open({
        popup: dialog,
        around: dojo.byId(parentId),
        onExecute: function(){
          dijit.popup.close(dialog);
          dojo.style(dialogId, 'display', 'none');
          dijit.focus(dojo.byId(parentId));
        },
        onCancel: function(){
          dijit.popup.close(dialog);
          dojo.style(dialogId, 'display', 'none');
          dijit.focus(dojo.byId(parentId));
        },
        onClose: function() {
          dijit.focus(dojo.byId(parentId));
        }
      })
      setTimeout(dojo.hitch(dialog, "focus"), 0);
    } else {
      dijit.popup.close(dialog);
      dojo.style(dialogId, 'display', 'none');
      dijit.focus(dojo.byId(parentId));
    }
  },
  
  /**
   * Close a field level help dialog.
   * 
   * @param dialogId  The id of the dialog to close.
   */
  closeHelpDialog: function(dialogId) {
    var dialog = dijit.byId(dialogId);
    dijit.popup.close(dialog);
    dojo.style(dialogId, 'display', 'none');
  },
  
  /**
   * Initialise a modal dialog.
   * 
   * Call to infrastructure ocde to initialise the modal dialog.
   */
  _isModal: false,   
  initDialog: function () {
    curam.util.Dialog.init();
    ieg._isModal = true;
  },
  
  /**
   * Utility function that allows us to check if the script
   * is being run in a modal.
   */
  isInModal: function() {
    return ieg._isModal;
  },
  
  /**
   * Set the initial modal title. 
   * This is called on the first page of a script running in a modal. 
   * 
   * @param windowTitle The new dialog title.
   */
  registerTitle: function (windowTitle) {
    var func = function() { return windowTitle;};
    curam.util.Dialog.registerGetTitleFunc(func);
  },
  
  /**
   * Update the modal title on subsequent pages
   *
   * @param windowTitle The new modal page title.
   */
  setModalTitle:function(windowTitle) {
    if(ieg.isInModal()) {
      curam.dialog.getParentWindow().dijit.byId(curam.util.Dialog._id).
        titleNode.innerHTML = windowTitle;
    }
  },
      
  /**
   * Register the modal size.
   * 
   * Register the modal size with the modal infrastructure.
   * 
   * @param dialogWidth   The dialogs width.
   * @param dialogHieght  The dialogs height.
   */
  registerSize: function(dialogWidth, dialogHeight) {
    size = new Object();
    size.width = dialogWidth;
    size.height = dialogHeight;
    var func = function() { return size;};
    curam.util.Dialog.registerGetSizeFunc(func);
  },
      
  /**
   * Modals - Call the infrastructure loadFinished on page load.
   * 
   * This function should only be called once. It sets up listeners for the
   * modal dialog.
   */
  loadFinished: function() {
    curam.util.Dialog.pageLoadFinished();
  },
    
  /**
   * 
   */
  _highlightInputs: function(inputs){
    dojo.require("dojox.fx._base");
    dojo.require("dojo.fx");

    // Find the background color
    var tester = dojo.byId("fxhighlightTest");
    if(!tester) {
      tester = document.createElement("div");
      dojo.style(tester, {
        position: "absolute", left:"-10000px", top:"-10000px"
      });
      dojo.addClass(tester, "fx-highlight");
      dojo.body().appendChild(tester);
    }
    var color = dojo.style(tester, "backgroundColor");

    var rad = (Math.PI * 3);
    
    // Make it pulse three times.
    function easing(n) {
      return Math.min(0.7, Math.abs(Math.cos(n * rad))) / 0.7;
    }

    function doAnim(node) {
      if(node._anim){node._anim.stop(true);}

      node._anim = dojox.fx.highlight({
          node: node,
          duration: 6000,
          color: color != "transparent" ? color : null,
          easing: easing,
          onEnd: function(){
            node._anim = null;
            node.style.backgroundColor = "";
          }
      });
      node._anim.play();
    }

    dojo.forEach(inputs, function(input){
      dojo.query("label[for='" + 
        dojo.attr(input, "name") + "']").forEach(doAnim);
      doAnim(input);
    });
  },
  
  /**
   * This function is used to show or hide conditional clusters.
   * 
   * param node, is the control that was used.
   * param clusterId, is the id of the cluster that we are trying to show or hide.
   * param func is the call back function.
   */
   hc: function(node, clusterId, direct, func) {
      var clusterIds;
      var directControlValues;
      var functions;
      var changed = false;
      if (clusterId.indexOf(",") > 0) {
        clusterIds = clusterId.split(",");
        directControlValues = direct.split(",");
        functions = func.split(",");
      } else {
        clusterIds = new Array(clusterId);
        directControlValues = new Array(direct);
        functions = new Array(func);
      }
      
      function doWipeOut(node) {
        dojo.addClass(node, "hidden");
        dojo.removeClass(node, "visible");
        dojo.fx.wipeOut({node:node}).play();
        ieg._clearClusterInputFields(node);
      }
      
      var i;
      for (i in clusterIds) {
        clusterId = clusterIds[i];
        var clusterDiv = dojo.byId(clusterId);
        
        try {
          if (dojo.hitch(null, functions[i])()) {
            if (directControlValues[i] == "true" && dojo.hasClass(clusterDiv, "hidden")) {
                dojo.addClass(clusterDiv, "visible");
                dojo.removeClass(clusterDiv, "hidden");
                dojo.style(clusterDiv, "height", "1px");
                dojo.fx.wipeIn({node:clusterDiv}).play();
                changed = true;
              }
          } else if (dojo.hasClass(clusterDiv, "visible")) {
              doWipeOut(clusterDiv);
              changed = true;
            }
        } catch (e) {
          // Do nothing if an error occurs while evaluating func
        }
        
        dojo.attr(node, "aria-controls", clusterIds[i]);
      }
      dojo.publish("/anim/toggle");
      return changed;
  },
    
  /**
   * DEPRECATED FUNCTIONS
   * These functions will be removed in 6.0.6
   */
      
  closeDialog: function(/*optional*/ refreshParent, 
    /*optional*/ newPageIdOrFullUrl, /*optional*/ pageParameters) {
    console.warn("This function has been deprecated");
    curam.util.Dialog.close(refreshParent, newPageIdOrFullUrl, 
      pageParameters);
  },
  
  /**
   * Provides a way for pages to navigate to a different URL programmatically.
   * Please note there is no need to use this function on every link in your
   * page.
   * 
   * The navigation will take place within the runtime context of the current
   * window object. 
   * 
   * @param url
   *    The URL to navigate to.
   */
  navigate: function(url) {
    console.warn("This function has been deprecated");
    var cacheBusterValue = new Date().getTime() + "_" + curam.util.CACHE_BUSTER++;
    var finalUrl = curam.util.replaceUrlParam(url, "o3nocache", cacheBusterValue);
    curam.debug.log("Navigate called: passed url is %s, final URl is %s",
      url, finalUrl);

    // unregister any handlers when going to the next page
    curam.util.Dialog._releaseHandlers();

    window.location.assign(finalUrl);
  },
 
  listAlignDecorator: function(data) {
    console.warn("This function has been deprecated");
    return ieg.alignmentDecorator('listAlign',data);
  },
 
  leftAlignListDecorator: function(data) {
    console.warn("This function has been deprecated");
    return ieg.alignmentDecorator('leftAlignList',data);
  },
 
  rightAlignListDecorator: function(data) {
    console.warn("This function has been deprecated");  
    return ieg.alignmentDecorator('rightAlignList',data);
  },
 
  alignmentDecorator: function(className, data) {
    console.warn("This function has been deprecated");
    return "<div class='" + className + "'>" + data + "</div>";
  },
  
  _setValidationFocus: function(fieldId) {
    console.warn("This function has been deprecated");
    var inputs;
    try {
      inputs = dojo.query("input[id='"+ fieldId + "']");
      if (inputs.length == 0) {
        inputs = dojo.query("select[id='"+ fieldId + "']");
      }
      if (inputs.length == 0) {
        input = dojo.query("textarea[id='"+ fieldId + "']");
      }
    } catch (e) {
      //Do nothing if an error occurs while evaluating func
    }
    var input = inputs[0];
    var clusterDiv;
    dojo.query(".cluster").forEach(function(cluster) {
      if (dojo.isDescendant(input, cluster)) {
        clusterDiv = cluster;
      }
    });
    if (dojo.hasClass(clusterDiv, "hidden")) {
      dojo.addClass(clusterDiv, "visible");
      if (dojo.hasClass(clusterDiv, "hidden")) {
        dojo.removeClass(clusterDiv, "hidden");
      }
    }
    if (dojo.isIE && dojo.isIE < 9) {
        setTimeout(function() { try { input.focus(); } catch(err) { } }, 10);
    } else {
        input.focus();
    }
  },
  
  disableLinks: function() {
    console.warn("This function has been deprecated");
    function disableLinksAfterTimeout(){
      links=dojo.query("a", document);
      for(var i=0; i<links.length; i++) {
        links[i].setAttribute('onclick', 'return false');
        links[i].setAttribute('href', '#');
      }
    }
     setTimeout(disableLinksAfterTimeout, 5);
  },
    
  hideMessages: function(node){
  console.warn("This function has been deprecated");
    if(dijit.hideTooltip) {
      dijit.hideTooltip(node);
    }
    dojo.query(".fx-highlight").removeClass("fx-highlight");
    if(dijit._masterTT) { 
      dijit._masterTT._shouldHide = node;
    }
    dojo.publish("cancel-highlight",[]);
  },
  
  addValidationSubscriber: function(topic) {
    console.warn("This function has been deprecated");
    if(ieg.messageTopics[topic]){return;}
    ieg.messageTopics[topic] = true;
    dojo.subscribe(topic, function(inputData, evt){
      // Sort the inputs by their vertical position on screen.
      inputData = ieg.sortByVerticalOffset(inputData, "input");

      // Create an array of messages.
      var messages = [];
      dojo.forEach(inputData, function(data){
        messages.push(data.msg);
      });

      function highlight() {
        ieg._highlightInputs(dojo.map(inputData, "return item.input;"));
      }
      ieg.showMessages(messages, evt, highlight);
    });
  },
  
  showMessages: function(messages, evt, callback){
    console.warn("This function has been deprecated");
    dojo.require("dijit.dijit");
    dojo.require("dijit.Tooltip");
    dijit.showTooltip(messages.join("<br/>"), evt.target);

    if(callback){
      callback();
    }
  },
  
  sortByVerticalOffset: function(array, nodeProperty) {
    console.warn("This function has been deprecated");
    var inputY = {};
    dojo.forEach(array, function(info){
      var input = nodeProperty ? info[nodeProperty] : info;
      inputY[dojo.attr(input, "name")] = dojo.position(input, true).y;
    });

    // Sort the inputs by their vertical position on screen.
    return array.sort(function(a,b){
      a = nodeProperty ? a[nodeProperty] : a;
      b = nodeProperty ? b[nodeProperty] : b;

      var absA = inputY[dojo.attr(a, "name")];
      var absB = inputY[dojo.attr(b, "name")];
      if(absA < absB){return -1;}
      if(absA > absB){return 1;}
      return 0;
    });
  },

  addMandatorySubscriber: function(message){
    console.warn("This function has been deprecated");
    ieg.addValidationSubscriber(cm.topics.MANDATORY_FIELD_VALIDATION, message);
  },
  
  replaceTokens: function(str) {
    console.warn("This function has been deprecated");
    for(var i = 0; i < arguments.length; i++) {
      tok = "%" + i + "s";
      str = str.split(tok).join(
        '<span class="toaster-msg">' + arguments[i + 1] + '</span>');
    }
    return str;
  },
  
  _scrollTop: function() {
    console.warn("This function has been deprecated");
    return ieg._filterResults (
      window.pageYOffset ? window.pageYOffset : 0,
      document.documentElement ? document.documentElement.scrollTop : 0,
      document.body ? document.body.scrollTop : 0
    );
  },
  
  _filterResults: function(n_win, n_docel, n_body) {
    console.warn("This function has been deprecated");
    var n_result = n_win ? n_win : 0;
    if (n_docel && (!n_result || (n_result > n_docel)))
      n_result = n_docel;
    return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
  },
  
  /**
  * Deprecated. Remove this function in 6.0.6
  * It is here to simply redirect to the focusManager module
  */
  _setInitialFocus: function() {
    console.warn("This function has been deprecated");
    focusManager.setInitialFocus();
  },
  
  /**
  * Deprecated. Remove this function in 6.0.6
  * It is here to simply redirect to the focusManager module 
  */
  _setMessagesFocus: function(handle) {
    console.warn("This function has been deprecated");
    focusManager.setMessagesFocus(handle);
  },
  
  messageTopics:{},
  messagesWidgetId: "messageToaster",
  utilCounter: 0,
  
  /**
   * Deprecated. Remove this function in 6.0.6
   * These are here to simply redirect to the iegXHR module 
   */
  iegLink: function(evt, nodeID) {
    console.warn("This function has been deprecated");
    iegXHR.iegLink(evt, nodeID);
  },  
  doBack: function(evt, href) {
    console.warn("This function has been deprecated");
    iegXHR.doBack(evt, href);
  },  
  doSubmit: function(evt, node) {
    console.warn("This function has been deprecated");
    iegXHR.doSubmit(evt, node);
  },  
  doExit: function(evt, node) {
    console.warn("This function has been deprecated");
    iegXHR.doExit(evt, node);
  },  
  doSaveAndExit: function(evt, node) {
    console.warn("This function has been deprecated");
    iegXHR.doSaveAndExit(evt, node);
  }
};

/**
 * Deprecated Page Behaviours
 */ 
cm.registerBehavior("PRE_SUBMIT_VALIDATION", {  
"a.bhv-submit,input.bhv-submit,span.bhv-submit" : {
 "onmouseover" : function(evt) {
   var t = evt.target;
   if(t._ignoreTime && (new Date()).getTime() - t._ignoreTime < 200){
     return;
   }

   var messages = cm.validation.getAllMessages(true);
   if(!messages || messages.length == 0){return;}
   if(evt.target._timer) {
     clearTimeout(evt.target._timer);
   }
   dojo.publish('IEG_VALIDATION_ERRORS', [messages, evt]);
 },
 "onmouseout": function(evt) {
   ieg.hideMessages(evt.target);

   if(evt.target.tagName == "DIV") {
     evt.target.parentNode._ignoreTime = (new Date()).getTime();
   }

   evt.target._timer = setTimeout(function(){
     ieg.hideMessages(evt.target);
   }, 1000);
 }
}
});

/**
 * dc is a legacy function attached to the submit 
 * event of a form by the cing:form tag. 
 * It is not needed, but defining it here so an error is not thrown.
 *
 * @deprecated Not used anymore
 */
if (typeof(dc) == "undefined") {
  dc = function(){}
}