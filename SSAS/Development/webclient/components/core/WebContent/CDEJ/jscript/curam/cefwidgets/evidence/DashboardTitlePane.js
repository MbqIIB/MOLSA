/* 
 * Licensed Materials - Property of IBM
 * 
 * Copyright IBM Corporation 2012, 2013. All Rights Reserved.
 *
 * PID 5725-H26
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure 
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
/**
 * Modifications
 * -------------
 * 03-May-2013 SD  [CR00382923] IE8 specific fix added to display dashboard 
 *                              correctly.
 * 06-Apr-2013 SD  [CR00375669] Screen reader related updates to evidence
 *                              category labels.
 * 07-Jan-2013 SD  [CR00354220] RPT updates.
 * 04-Oct-2012 BD  [CR00345902] Dojo 1.7 Upgrade. Migrate code.
 */
dojo.provide("curam.cefwidgets.evidence.DashboardTitlePane");

require(["dijit/TitlePane"]);

dojo.declare("curam.cefwidgets.evidence.DashboardTitlePane", dijit.TitlePane, {
  
    _currentOpenCloseClass:'',
    newId:'',
    navigationContent:'',
    selectedButtonAltText: "",
    toggleExpandAltText: "",
    toggleCollapseAltText: "",
 
    postCreate: function(){
      this.inherited(arguments);
      

      var myTitleBar = this.titleBarNode;
      dojo.attr(myTitleBar,"class", "evidenceTitlePane");	
      this.newId = 'div_'+ this.id;

      arrowImageSpan = dojo.create("span", {id: this.newId});
      dojo.addClass(arrowImageSpan, 'arrowImageSpanClass');
      
      dojo.place(arrowImageSpan, this.titleNode, 'before');
      dojo.place(this.navigationContent, this.titleNode, 'after');
      
      arrowImg = dojo.create('img', {
              id: 'img_' + this.id, tabindex: '0'
          }, arrowImageSpan);
      
      var args = [this];
      dojo.connect(arrowImg, "onclick", args, this.startToggle);
      
      if(this._currentOpenCloseClass == 'EvidenceDashboardOpen') {
        dojo.attr(arrowImg, 'src', '../Images/arrow_toggle_expand.png');
        dojo.attr(arrowImg, 'alt', this.toggleCollapseAltText);
      } else {
        dojo.attr(arrowImg, 'src', '../Images/arrow_toggle_mini.png');
        dojo.attr(arrowImg, 'alt', this.toggleExpandAltText);
      }
      
      var myTextNode = this.titleNode;
      dojo.attr(myTextNode,"class", "evidenceTitlePaneTextNode");
      
      var myHideNode = this.hideNode;
      dojo.attr(myHideNode,"class", "noBorderTitlePaneContentOuter");
      
      // add 'aria-label' to <div> containing 'region' attribute, this
      // satisfies RPT checks
      var myTextNode_label = this.titleNode.innerHTML;
      var myHideNode_pane = dojo.query(".dijitTitlePaneContentInner", myHideNode)[0];
      dojo.attr(myHideNode_pane, "aria-label", myTextNode_label);
      
      // Prevent screen reader users from tabbing to evidence category label.
      // Instead add a header tag to the label to convey more relevant
      // information to the screen reader user
      dojo.removeAttr(this.focusNode, "tabindex");
      dojo.removeAttr(this.focusNode, "role");
      
      //Wrap existing title pane label span tag with a header tag
      var h2 = dojo.create("h2", {title: "evidenceTitlePaneHeader", 
                                  "class": "evidenceTitlePaneHeader", 
                                  innerHTML: this.titleNode.outerHTML}, this.focusNode);
      dojo.place(h2, this.titleNode, "replace");
    },
      
    _updateArrowCSS: function() {
        if (dojo.byId('img_'+this.id) != null) {
          if(this._currentOpenCloseClass == 'EvidenceDashboardOpen') {
            dojo.attr(dojo.byId('img_'+this.id), 'src', '../Images/arrow_toggle_expand.png');
            dojo.attr(dojo.byId('img_'+this.id), 'alt', this.toggleCollapseAltText);
          } else {
            dojo.attr(dojo.byId('img_'+this.id), 'src', '../Images/arrow_toggle_mini.png');
            dojo.attr(dojo.byId('img_'+this.id), 'alt', this.toggleExpandAltText);
          }
        }
    },
      

    _setCss: function(){
      // summary:
      //    Set the open/close css state for the TitlePane
      // tags:
      //    private

      var node = this.titleBarNode || this.focusNode;

      if(this._titleBarClass){
        dojo.removeClass(node, this._titleBarClass);
      }
      this._titleBarClass = "EvidenceDashboard" + (this.toggleable ? "" : "Fixed") + (this.open ? "Open" : "Closed");
      this._currentOpenCloseClass = this._titleBarClass;
      this._updateArrowCSS();
      this.arrowNodeInner.innerHTML = this.open ? "-" : "+";
    },
    
    _onTitleEnter: function(/*Boolean*/ e){
      //do nothing, this is the remove the style.
    },
    
    _onTitleClick: function(){
      // summary:
      //    Handler when user clicks the title bar
      // tags:
      //    private
      //do nothing remove toggle for title bar.

    },
    
    startToggle: function(args) {
      if(this[0].toggleable){ 
        this[0].toggle();
      }
    },
    
    destroyDescendants: function(/*Boolean*/ preserveDom){
      // do nothing - bug fix to stop the browser from crashing
    },
  
    destroy: function() {
      // do nothing - bug fix to stop the browser from crashing
    }    
});
