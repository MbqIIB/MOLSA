/* 
 * Licensed Materials - Property of IBM
 * 
 * Copyright IBM Corporation 2012. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure 
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
/**
 * Modifications
 * -------------
 * 03-Oct-2012 BD  [CR00345824] Dojo 1.7 Upgrade. Migrate code.
 */

/**
 * Curam version of a Dijit TitlePane that can be used as a base for the
 * Pod widget.
 */
dojo.provide("curam.cefwidgets.pods.TitlePane");

require(["dijit/TitlePane", "curam/util/ResourceBundle","dojo/text","dojo/cache"]);
dojo.requireLocalization("curam.application", "TitlePane");


dojo.declare("curam.cefwidgets.pods.TitlePane", [dijit.TitlePane, dijit._WidgetsInTemplateMixin], {
  closeIconAltText:"",
  togglePodAltText:"",
  templateString: dojo.cache("curam", "cefwidgets/pods/templates/TitlePane.html"),


  collapsible: true,

  constructor: function() {
  
		//console.log("curam.cefwidgets.pods.TitlePane ::: constructor");
		
    var closeIconAltText_key = "close.icon.alt.text";
    var togglePodAltText_key = "toggle.pod.alt.text";

    var bundle = new curam.util.ResourceBundle("TitlePane");
    this.closeIconAltText=bundle.getProperty(closeIconAltText_key);
    this.togglePodAltText=bundle.getProperty(togglePodAltText_key);
    
  },
  
  postCreate: function(){
    //console.log("curam.cefwidgets.pods.TitlePane ::: postCreate");
    this.inherited(arguments);
    
    
    if (!this.collapsible) {
      dojo.style(this.arrowNode, "display", "none");
    } else {
      dojo.addClass(this.domNode, "dijitTitlePaneTitle-collapsible");
    }
    dojo.forEach(this.getChildren(), function(child){
      if (!child.started && !child._started) {
        child.startup();
      }
    });
    dojo.addClass(this.wipeNode, "dijitTitlePaneContentWipeNode");
    
    dojo.connect(this._wipeOut, "onEnd", this, "_publish");
    dojo.connect(this._wipeIn, "onEnd", this, "_publish");
  },
  
  addChild: function(child){
    //console.log("curam.cefwidgets.pods.TitlePane ::: addChild");
    this.inherited(arguments);
  },
  
  _publish: function(){
    dojo.publish("/TitlePane/sizechange",[this]);
  },

  toggle: function(){
    if (!this.collapsible) {
      return;
    }
    this.inherited(arguments);
  }
});