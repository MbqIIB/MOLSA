/* 
 * Licensed Materials - Property of IBM
 * 
 * Copyright IBM Corporation 2013,2014. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure 
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 * A flag is set when a page is submitted to prevent it being submitted
 * multiple times. The flag is cleared when the new page has been
 * loaded/injected into the DOM.
 */
dojo.subscribe("ieg-page-loaded", function() {
  var form = dojo.query("form")[0];
  if(form) {
  iegXHR._setFormSubmitted(form, false);
  }
});

/**
 * Functions related to navigating an IEG script.
 */
var iegXHR = {
  /** 
   * The time it takes for a page to transition 
   */
  transitionDuration: 1000,
    
  /**
   * Handle IEG Links.
   * 
   * @param evt   The event that calls this function
   * @param nodeID  The DOM node that was clicked on.
   */  
  iegLink: function(evt, nodeID) {
    dojo.stopEvent(evt);
    
    // get the form to submit. 
    // false is returned here if the form has already been submitted
    var form = iegXHR._getForm();
    if(!form) return; 
      
    var node = dojo.byId(nodeID);
    var href = dojo.attr(node, "href");
    
    // Only submit if a valid href exists. 
    // If not, clear the form submitted flag.
    if (href == null) {
      iegXHR._setFormSubmitted(form, false);  
      return;
    }
    
    var oldMainContent = dojo.query('#ieg-main-wrapper')[0];
    var parentNode = dojo.query('#bd')[0];
    var oldFunctions = dojo.query('#ieg-page-functions')[0];
    var oldSyncToken = dojo.query("input[name=__o3synch]")[0];
    var oldMetaData = dojo.query("input[name=__o3fmeta]")[0];
    var oldMandatoryMetaData = 
      dojo.query("input[name=__o3fmeta_mandatory_data]")[0];
    var actionsPanel = dijit.byId("ieg-actions-panel");
    var mainContentPane = dojo.query('#ieg-main-content-pane')[0];
    var oldPageTitle = dojo.query(".pageHeadingTable")[0];
  
    var xhrArgs = {
      preventCache: true,
      url: href,
      handleAs: "text",
      load: function(response) {
        // check the response
        if(!iegXHR._checkResponse(response)) return;
        
        // parse response
        var contentPaneNode = dojo.byId("ieg-main-content-pane");
        var widgets = dijit.findWidgets(contentPaneNode);
        dojo.forEach(widgets, function(w) {
          if (w.get('id') != "ieg-main-content-pane") {
            w.destroyRecursive(true); 
          }
        });
  
        var mainHTML = "";
        var actionsPanelHTML = "";
        var mainHTMLNode;
        var actionsPanelNode;
  
        if (actionsPanel) {
          mainHTML = response.substring(
            0, response.indexOf("<div class=\"actions-panel\""));
          actionsPanelHTML = response.substring(
            response.indexOf("<div class=\"actions-panel\""));
          mainHTMLNode = dojo.toDom(mainHTML);
            actionsPanelNode = dojo.toDom(actionsPanelHTML);
              var newActionSet = dojo.query(
                "div[class~='action-set']", actionsPanelNode);
            dojo.parser.parse(actionsPanelNode);
          actionsPanel.setContent(newActionSet);
        } else {
            mainHTMLNode = dojo.toDom(response);
        }
          
        // parse the new html
        dojo.parser.parse(mainHTMLNode);
        
        // new content
        dojo.place(mainHTMLNode, contentPaneNode);
        var newMain = 
          dojo.query("div[id='ieg-main-wrapper']", contentPaneNode)[1];
        dojo.style(newMain, "opacity", 0); // doesn't work in IE8...
        
        // old content
        var oldBox = dojo.marginBox(oldMainContent);
        
        // set position of new content
        dojo.style(newMain, "top", (-oldBox.h) + "px");
        
        // transitions enabled?
        if (iegXHR._transitionsEnabled(response)) {
          // if IE8 then set the duration of the transition to effectively
          // 0. This is because there is an issue with the fade in/out
          // transition due to how IE implements opacity. Can't set it to
          // 0 here because that causes JS errors with IE also
          if(dojo.isIE <= 8) {
            var duration = 0.1;
            // put new content off screen until transition ends
            dojo.style(newMain, "top", "-1000px");
          } else {
            var duration = iegXHR.transitionDuration;
          }
          
          // get the animations for the page title, progress bar 
          // and sections panel
          var pageTitleAnimation = 
            updateManager.getPageTitleAnimation(duration, oldPageTitle);        
          var progressAnimation = 
            updateManager.getProgressBarAnimation(duration);        
          var sectionAnimation = 
            updateManager.getSectionsPanelAnimation(duration);
            
          // get the old and new page title height
          var pageTitles = dojo.query(".pageHeadingTable");
          var pageTitlesHeightDifference = 
            dojo.coords(pageTitles[0]).h - dojo.coords(pageTitles[1]).h;
          
          // set position of new content
          dojo.style(newMain, "top", 
            (-oldBox.h-pageTitlesHeightDifference) + "px");
            
          // setup the animation for the main content area
          var pageAnimation = [
            dojo.fadeIn({node:newMain, duration:duration}),
            dojo.fadeOut({node:oldMainContent, duration:duration})
          ];
            
          // combine the animations to run in parallel
          var trans = dojo.fx.combine(
            pageTitleAnimation.concat(progressAnimation, 
              sectionAnimation, pageAnimation));
        
          // connect to the animation end
          dojo.connect(trans, 'onEnd', function() {
            var contentPane = dijit.byId("ieg-main-content-pane");
            dojo.destroy(oldPageTitle);
            var pageTitleNode = dojo.query(".pageHeadingTable")[0];
            dojo.attr(pageTitleNode, "style", "");
              dojo.removeAttr(pageTitleNode, "style");
            contentPane.setContent(response);         
            dojo.destroy(oldMetaData);
            dojo.destroy(oldMandatoryMetaData);
            dojo.destroy(oldSyncToken);
            dojo.destroy(oldFunctions); 
            dojo.behavior.apply();
                
            // fire the page loaded event
            dojo.publish("ieg-page-loaded");
          });
          
          // play the animation
          trans.play();
        } else {
          var contentPane = dijit.byId("ieg-main-content-pane");
          if (actionsPanel) {
            contentPane.setContent(mainHTML);
          } else {
            contentPane.setContent(response);
          }
        
          dojo.destroy(oldMetaData);
          dojo.destroy(oldMandatoryMetaData);
          dojo.destroy(oldSyncToken);
          dojo.destroy(oldFunctions); 
          dojo.behavior.apply();
                
          // fire the page loaded event
          dojo.publish("ieg-page-loaded");
        }
      },
      error: function(e, args){
         iegXHR._handleAjaxError(e, args);
      }
    }
  
    // send request
    dojo.xhrGet(xhrArgs);
  },
  
  /**
   * Handle clicking of the Back button.
   * 
   * @param evt   The event that called this function
   * @param href  The URL to follow
   */
  doBack: function(evt, href) {
    dojo.stopEvent(evt);
    
    // get the form to submit. 
    // false is returned here if the form has already been submitted
    var form = iegXHR._getForm();
    if(!form) return;
    
    href = href.replace(/&amp;/g, "&");
  
    var oldMainWrapper = dojo.query('#ieg-main-wrapper')[0];
    var oldMainContent = dojo.query('#main')[0];
    var parentNode = dojo.query('#bd')[0];
    var oldFunctions = dojo.query('#ieg-page-functions')[0];
    var oldSyncToken = dojo.query("input[name=__o3synch]")[0];
    var oldMetaData = dojo.query("input[name=__o3fmeta]")[0];
    var oldMandatoryMetaData = 
      dojo.query("input[name=__o3fmeta_mandatory_data]")[0];
    var actionsPanel = dijit.byId("ieg-actions-panel");
    var oldPersonTabs = dojo.query(".personTabsTable")[0];
    var oldPageTitle = dojo.query(".pageHeadingTable")[0];
  
    var mainContentPane = dojo.query('#ieg-main-content-pane')[0];
    var mainContentPaneNested = dojo.query('#ieg-main-content-pane-nested')[0];
    var wasPersonTabsInput = dojo.query("input[name='wasPersonTabs']")[0];
    var wasPersonTabs = 
      wasPersonTabsInput !== undefined && wasPersonTabsInput.value == "true";
    var xhrArgsContent = wasPersonTabs ? {'wasPersonTabs':'true'}: {};

    var xhrArgs = {
      url: href,
      preventCache: true,
      handleAs: "text",
      content: xhrArgsContent,
      load: function(response) {
        // check the response
        if(!iegXHR._checkResponse(response)) return;
        
        // parse response
        var contentPaneNode = dojo.byId("ieg-main-content-pane");
        var nestedContentPaneNode = dojo.byId("ieg-main-content-pane-nested");
        var widgets = dijit.findWidgets(nestedContentPaneNode);
        
        dojo.forEach(widgets, function(w) {
          if (w.get('id') != "ieg-main-content-pane-nested") {
            w.destroyRecursive(true); 
          }
        });
      
        if (actionsPanel) {
          mainHTML = response.substring(
              0, response.indexOf("<div class=\"actions-panel\""));
          actionsPanelHTML = response.substring(
            response.indexOf("<div class=\"actions-panel\""));
          mainHTMLNode = dojo.toDom(mainHTML);
            actionsPanelNode = dojo.toDom(actionsPanelHTML);
          
          var newActionSet = 
            dojo.query("div[class~='action-set']", actionsPanelNode);
          dojo.parser.parse(actionsPanelNode);
          actionsPanel.setContent(newActionSet);
        } else {
          mainHTMLNode = dojo.toDom(response);
        }
    
        try {
          dojo.parser.parse(mainHTMLNode);
          dojo.place(mainHTMLNode, nestedContentPaneNode, "first"); 
        } catch (e) {
          dojo.forEach(dijit.findWidgets(
            dojo.byId("ieg-main-content-pane")), function(w) {
              if (w.get('id') != "ieg-main-content-pane") {
                w.destroyRecursive(true); 
              }
            });
             
          if (actionsPanel) {
            mainHTMLNode = dojo.toDom(mainHTML);
          } else {
            mainHTMLNode = dojo.toDom(response);
          }
        
          dojo.parser.parse(mainHTMLNode);
          dojo.place(mainHTMLNode, contentPaneNode, "first");       
        }
      
        var personTabsJSONData = 
          updateManager.getJSONUpdateData().persontabs;   
        var newMainWrapper = 
          dojo.query("div[id='ieg-main-wrapper']", mainContentPane)[0];
        var newMain = dojo.query("div[id='main']", mainContentPane)[0];
        
        if (personTabsJSONData !== undefined) {
          var newBox = dojo.marginBox(newMain);
          dojo.style(newMain, "top", (- newBox.h) + "px");
          dojo.style(oldMainContent, "top", (- newBox.h) + "px");
        } else {
          var newBox = dojo.marginBox(newMainWrapper);
          dojo.style(newMainWrapper, "top", (- newBox.h) + "px");
          dojo.style(oldMainWrapper, "top", (- newBox.h) + "px");
        }
      
        // transitions enabled?
        if (iegXHR._transitionsEnabled(response)) {
          var duration = iegXHR.transitionDuration;
          var anims = [];
        
          var personTabsAnimation = [];
          if (personTabsJSONData !== undefined) {       
          personTabsAnimation = 
            updateManager.getPersonTabsAnimation(
              duration, oldPersonTabs);
          }
        
          var pageTitleAnimation = 
            updateManager.getPageTitleAnimation(duration, oldPageTitle);
          var progressAnimation = 
            updateManager.getProgressBarAnimation(duration);
          var sectionAnimation = 
            updateManager.getSectionsPanelAnimation(duration);
  
          // get the old and new page title height
          var pageTitles = dojo.query(".pageHeadingTable");
          var pageTitlesHeightDifference = 
            dojo.coords(pageTitles[0]).h - dojo.coords(pageTitles[1]).h;
          
          var pageAnimation;
          if (personTabsJSONData !== undefined) {
            var newPersonTabs = dojo.query(".personTabsTable")[1];  
              
            pageAnimation = [
              dojo.fx.wipeOut({node:oldMainContent, duration:duration}),
              dojo.fx.slideTo({node:newMain, left:'0', 
                top:-pageTitlesHeightDifference, duration:duration}),
              dojo.fx.slideTo({node:newPersonTabs, left:dojo.coords(newPersonTabs).l, 
                top:dojo.coords(newPersonTabs).t-pageTitlesHeightDifference, duration:duration}),
              dojo.fx.slideTo({node:oldMainContent, 
                left:'0', top:'0', duration:duration})
            ];
          } else {
            pageAnimation = [
                dojo.fx.wipeOut({node:oldMainWrapper, duration:duration}),
                dojo.fx.slideTo({node:newMainWrapper, 
                  left:'0', top:-pageTitlesHeightDifference, duration:duration}),
                dojo.fx.slideTo({node:oldMainWrapper, 
                  left:'0', top:'0', duration:duration})
            ];
          }
          
          var trans = dojo.fx.combine(
            pageAnimation.concat(progressAnimation, sectionAnimation, 
              personTabsAnimation, pageTitleAnimation));
      
          // connect to the onEnd event of the transition
          dojo.connect(trans, 'onEnd', function() {
            var contentPane;
            if (personTabsJSONData !== undefined) {
              contentPane = dijit.byId("ieg-main-content-pane-nested");
              dojo.destroy(oldPersonTabs);          
              var personTabsNode = dojo.query(".personTabsTable")[0];
              dojo.attr(personTabsNode, "style", "");
              dojo.removeAttr(personTabsNode, "style");
            } else {
              contentPane = dijit.byId("ieg-main-content-pane");
            }
              
            dojo.destroy(oldPageTitle);       
            var pageTitleNode = dojo.query(".pageHeadingTable")[0];
            dojo.attr(pageTitleNode, "style", "");
            dojo.removeAttr(pageTitleNode, "style");
            contentPane.setContent(response);
            dojo.destroy(oldMetaData);
            dojo.destroy(oldMandatoryMetaData);
            dojo.destroy(oldSyncToken);
            dojo.destroy(oldFunctions); 
            dojo.behavior.apply();
                
            // fire the page loaded event
            dojo.publish("ieg-page-loaded");
          });
            
          trans.play();
        } else {
          var contentPane = dijit.byId("ieg-main-content-pane");
          if (personTabsJSONData !== undefined) {
            contentPane = dijit.byId("ieg-main-content-pane-nested");
          }
          if (actionsPanel) {
            contentPane.setContent(mainHTML);
          } else {
            contentPane.setContent(response);
          }
          
          dojo.destroy(oldMetaData);
          dojo.destroy(oldMandatoryMetaData);
          dojo.destroy(oldSyncToken);
          dojo.destroy(oldFunctions);
          dojo.behavior.apply();
            
          // fire the page loaded event
          dojo.publish("ieg-page-loaded");
        }
      },
      error: function(e, args) {
        iegXHR._handleAjaxError(e, args);
      }
    }
    
    // send request
    dojo.xhrGet(xhrArgs);    
    return false;
  },
  
  /**
   * Submit the form - i.e. Next.
   * 
   * @param evt   The event that called this function.
   * @param node  Not used
   */
  doSubmit: function(evt, node) {
    dojo.stopEvent(evt);  
    
    // get the form to submit. 
    // false is returned here if the form has already been submitted
    var form = iegXHR._getForm();
    if(!form) return;
    
    // set the action of the form
    var formAction = dojo.attr(form, "id");
    dojo.attr(form, "action", formAction);
  
    var oldMainWrapper = dojo.query('#ieg-main-wrapper')[0];
    var oldMainContent = dojo.query('#main')[0];
    var parentNode = dojo.query('#bd')[0];
    var oldFunctions = dojo.query('#ieg-page-functions')[0];
    var oldSyncToken = dojo.query("input[name=__o3synch]")[0];
    var oldMetaData = dojo.query("input[name=__o3fmeta]")[0];
    var oldMandatoryMetaData = 
      dojo.query("input[name=__o3fmeta_mandatory_data]")[0];
  
    var oldBackButton = dojo.byId("ieg-back-button");
    if (oldBackButton) {
      dojo.attr(oldBackButton, "id", "ieg-back-button-old");
    }
    
    var mainContentPane = dojo.query('#ieg-main-content-pane')[0];
    var mainContentPaneNested = 
      dojo.query('#ieg-main-content-pane-nested')[0];
    var oldCoordsMain = dojo.coords(oldMainContent);
    var oldCoordsMainWrapper = dojo.coords(oldMainWrapper);
    var oldPersonTabs = dojo.query(".personTabsTable")[0];
    var oldPageTitle = dojo.query(".pageHeadingTable")[0];
    var actionsPanel = dijit.byId("ieg-actions-panel");
    
    var xhrArgs = {
      form: form,
      handleAs: "text",
      load: function(response) {
        // check the response
        if(!iegXHR._checkResponse(response)) return;
        
        // parse response        
        var contentPaneNode = dojo.byId("ieg-main-content-pane-nested");
        var widgets = dijit.findWidgets(contentPaneNode);
          
        dojo.forEach(widgets, function(w) {
          if (w.get('id') != "ieg-main-content-pane-nested") {
            w.destroyRecursive(true); 
          }
        });
        
        var mainHTML = "";
        var actionsPanelHTML = "";
        var mainHTMLNode;
        var actionsPanelNode;        

        if (actionsPanel) {
          mainHTML = response.substring(0, 
            response.indexOf("<div class=\"actions-panel\""));
          actionsPanelHTML = response.substring(
            response.indexOf("<div class=\"actions-panel\""));
      
          mainHTMLNode = dojo.toDom(mainHTML);
          actionsPanelNode = dojo.toDom(actionsPanelHTML);
          dojo.parser.parse(actionsPanelNode);
      
          var newActionSet = dojo.query(
            "div[class~='action-set']", actionsPanelNode);
      
          actionsPanel.setContent(newActionSet); 
        } else {
          mainHTMLNode = dojo.toDom(response);  
        }
    
        try {
          dojo.parser.parse(mainHTMLNode);
          dojo.place(mainHTMLNode, mainContentPaneNested);
        } catch (e) {
          dojo.forEach(dijit.findWidgets(
            dojo.byId("ieg-main-content-pane")), function(w) {
              if (w.get('id') != "ieg-main-content-pane") {
                w.destroyRecursive(true); 
            }
          });
            
          if (actionsPanel) {
            mainHTMLNode = dojo.toDom(mainHTML);
          } else {
            mainHTMLNode = dojo.toDom(response);
          }
      
          dojo.parser.parse(mainHTMLNode);
          dojo.place(mainHTMLNode, mainContentPane);
        }
      
        var personTabsJSONData = 
          updateManager.getJSONUpdateData().persontabs;
        var newMainWrapper = 
          dojo.query("div[id='ieg-main-wrapper']", mainContentPane)[1];
        var newMain = dojo.query("div[id='main']", mainContentPane)[1];
    
        if (personTabsJSONData !== undefined) {
          dojo.style(newMain, "visibility", "hidden");
        } else {
          dojo.style(newMainWrapper, "visibility", "hidden");
        }
      
        // are transitions enabled?
        if (iegXHR._transitionsEnabled(response)) {
          var duration = iegXHR.transitionDuration;
          var anims = [];
        
          var personTabsAnimation = [];
          if (personTabsJSONData !== undefined) {       
             personTabsAnimation = 
              updateManager.getPersonTabsAnimation(
                duration, oldPersonTabs);
          }
        
          var pageTitleAnimation = 
            updateManager.getPageTitleAnimation(duration, oldPageTitle);
          var progressAnimation = 
            updateManager.getProgressBarAnimation(duration);
          var sectionAnimation = 
            updateManager.getSectionsPanelAnimation(duration);
        
          // get the old and new page title height
          var pageTitles = dojo.query(".pageHeadingTable");
          var pageTitlesHeightDifference = 
            dojo.coords(pageTitles[0]).h - dojo.coords(pageTitles[1]).h;
        
          var pageAnimation;
          if (personTabsJSONData !== undefined) {
            var newPersonTabs = dojo.query(".personTabsTable")[1];
            pageAnimation = [
              dojo.fx.wipeOut({node:oldMainContent, duration:duration}),
              dojo.fx.slideTo({node:oldMainContent, left:'0', 
                top:-oldCoordsMain.h, duration:duration}),
              dojo.fx.slideTo({node:newMain, left:'0', 
                top:-pageTitlesHeightDifference, duration:duration}),
              dojo.fx.slideTo({node:newPersonTabs, left:dojo.coords(newPersonTabs).l, 
                top:dojo.coords(newPersonTabs).t-pageTitlesHeightDifference, duration:duration}),
              dojo.fx.wipeIn({node:newMain, duration:duration}
            )];
          } else {
            pageAnimation = [
              dojo.fx.wipeOut({node:oldMainWrapper, duration:duration}),
              dojo.fx.slideTo({node:oldMainWrapper, left:'0', 
                top:-oldCoordsMainWrapper.h, duration:duration}),
              dojo.fx.slideTo({node:newMainWrapper, left:'0', 
                top:-pageTitlesHeightDifference, duration:duration}),
              dojo.fx.wipeIn({node:newMainWrapper, duration:duration})
            ];
          }
        
          var trans = dojo.fx.combine(
          pageAnimation.concat(progressAnimation, 
            sectionAnimation, personTabsAnimation, pageTitleAnimation));
  
          // connect to the onEnd event of the transition
          dojo.connect(trans, 'onEnd', function() {
            var contentPane;
            
            if (personTabsJSONData !== undefined) {
              contentPane = dijit.byId("ieg-main-content-pane-nested");
              dojo.destroy(oldPersonTabs);
              var personTabsNode = dojo.query(".personTabsTable")[0];
              dojo.attr(personTabsNode, "style", "");
              dojo.removeAttr(personTabsNode, "style");
            } else {
              contentPane = dijit.byId("ieg-main-content-pane");
            }
          
            dojo.destroy(oldPageTitle);
            var pageTitleNode = dojo.query(".pageHeadingTable")[0];
            dojo.attr(pageTitleNode, "style", "");
            dojo.removeAttr(pageTitleNode, "style");
            contentPane.setContent(response);
            dojo.destroy(oldMetaData);
            dojo.destroy(oldMandatoryMetaData);
            dojo.destroy(oldSyncToken);
            dojo.destroy(oldFunctions); 
            dojo.behavior.apply();
            dojo.attr(form, "action", "#");
            
            // fire the page loaded event
            dojo.publish("ieg-page-loaded");
          });
        
          trans.play();
        } else {
          var contentPane = dijit.byId("ieg-main-content-pane");
          if (personTabsJSONData !== undefined) {
            contentPane = dijit.byId("ieg-main-content-pane-nested");
          }
          if (actionsPanel) {
            contentPane.setContent(mainHTML);
          } else {
            contentPane.setContent(response);
          }
          
          dojo.destroy(oldMetaData);
          dojo.destroy(oldMandatoryMetaData);
          dojo.destroy(oldSyncToken);
          dojo.destroy(oldFunctions);
          dojo.behavior.apply();
          dojo.attr(form, "action", "#");
          
          // fire the page loaded event
          dojo.publish("ieg-page-loaded");
        }
      },    
      error: function(e, args){
        iegXHR._handleAjaxError(e, args);
      }
    }
    
    // send the request
    dojo.xhrPost(xhrArgs);
    
    // setup the delay spinner 
    iegXHR._setWaitingCursor(true);
          
    return false;
  },
  
  /**
   * Submit the form to the server and get back the
   * exit page specified for the script.
   * 
   * @param evt   The event that called this function.
   * @param node  Not used.
   */  
  doExit: function(evt, node) {
    dojo.stopEvent(evt);
    
    // get the form to submit. 
    // false is returned here if the form has already been submitted
    var form = iegXHR._getForm();
    if(!form) return;
    
    // set the form action
    var formAction = dojo.attr(form, "id");
    formAction += "&action=exit";
    dojo.attr(form, "action", formAction);
  
    // request arguments
    var xhrArgs = {
      form: form,
      handleAs: "text",
      load: function(response) {
        // check the response
        if(!iegXHR._checkResponse(response)) return;
      },
      error: function(e, args) {
        iegXHR._handleAjaxError(e, args);
      }
    }
  
    // send request
    dojo.xhrPost(xhrArgs);
    return false;
  },
  
  /**
   * Submit the form to the server for saving/validation and get back
   * the exit page for redirection to.
   * 
   * @param evt   The event that called thsi function.
   * @param node  Not used.
   */
  doSaveAndExit: function(evt, node) {
    dojo.stopEvent(evt);
    
    // get the form to submit. 
    // false is returned here if the form has already been submitted
    var form = iegXHR._getForm();
    if(!form) return;
    
    var formAction = dojo.attr(form, "id");
    formAction += "&action=save_and_exit";
    dojo.attr(form, "action", formAction);
  
    var parentNode = dojo.query('#bd')[0];
    var oldFunctions = dojo.query('#ieg-page-functions')[0];
    var oldSyncToken = dojo.query("input[name=__o3synch]")[0];
    var oldMetaData = dojo.query("input[name=__o3fmeta]")[0];
    var oldMandatoryMetaData = 
      dojo.query("input[name=__o3fmeta_mandatory_data]")[0];
    
    var oldBackButton = dojo.byId("ieg-back-button");
    if (oldBackButton) {
      dojo.attr(oldBackButton, "id", "ieg-back-button-old");
    }
  
    var mainContentPane = dojo.query('#ieg-main-content-pane')[0];
    var mainContentPaneNested = 
      dojo.query('#ieg-main-content-pane-nested')[0]; 
    var actionsPanel = dijit.byId("ieg-actions-panel");
    
    var xhrArgs = {
      form: form,
      handleAs: "text",
      load: function(response) {
        // check the response
        if(!iegXHR._checkResponse(response)) return;
        
        // parse response
        var contentPaneNode = dojo.byId("ieg-main-content-pane-nested");        
        var widgets = dijit.findWidgets(contentPaneNode);
        dojo.forEach(widgets, function(w) {
          if (w.get('id') != "ieg-main-content-pane-nested") {
            w.destroyRecursive(true); 
          }
        });
        
        var mainHTML = "";
        var actionsPanelHTML = "";
        var mainHTMLNode;
        var actionsPanelNode;
        
        if (actionsPanel) {
          mainHTML = response.substring(
            0, response.indexOf("<div class=\"actions-panel\""));
          actionsPanelHTML = response.substring(response.indexOf(
            "<div class=\"actions-panel\""));
          mainHTMLNode = dojo.toDom(mainHTML);
          actionsPanelNode = dojo.toDom(actionsPanelHTML);
          dojo.parser.parse(actionsPanelNode);
          
          var newActionSet = dojo.query(
            "div[class~='action-set']", actionsPanelNode);

          actionsPanel.setContent(newActionSet); 
        } else {
          mainHTMLNode = dojo.toDom(response);
        }
  
        try {
          dojo.parser.parse(mainHTMLNode);
          dojo.place(mainHTMLNode, mainContentPaneNested);
        } catch (e) {
          dojo.forEach(dijit.findWidgets(
            dojo.byId("ieg-main-content-pane")), function(w) {
            if (w.get('id') != "ieg-main-content-pane") {
              w.destroyRecursive(true); 
            }
          });
    
          if (actionsPanel) {
            mainHTMLNode = dojo.toDom(mainHTML);
          } else {
            mainHTMLNode = dojo.toDom(response);
          }
    
          dojo.parser.parse(mainHTMLNode);
          dojo.place(mainHTMLNode, mainContentPane);
        }
    
        var personTabsJSONData = 
        updateManager.getJSONUpdateData().persontabs;

        var contentPane = dijit.byId("ieg-main-content-pane");
        if (personTabsJSONData !== undefined) {
          contentPane = dijit.byId("ieg-main-content-pane-nested");
        }
  
        if (actionsPanel) {
          contentPane.setContent(mainHTML);
        } else {
          contentPane.setContent(response);
        }
    
        dojo.destroy(oldMetaData);
        dojo.destroy(oldMandatoryMetaData);
        dojo.destroy(oldSyncToken);
        dojo.destroy(oldFunctions);
        dojo.behavior.apply();
        dojo.attr(form, "action", "#");
        
        // fire the page loaded event
        dojo.publish("ieg-page-loaded");
      },
      error: function(e, args) {
        iegXHR._handleAjaxError(e, args);
      }
    }
    
    // send the request
    dojo.xhrPost(xhrArgs);
    
    // setup the delay spinner 
    iegXHR._setWaitingCursor(true);
        
    return false;
  },
  
  /**
   * Check if transitions are enabled
   * 
   * @param response  The server response.
   */
  _transitionsEnabled:function(response) {
    var transition = updateManager.getJSONUpdateData().transition;
    if (response.indexOf("class=\"messages-container\"") > -1
      || dojo.isIE <= 7) 
    {
      transition = false;
    }
  
    return transition;
  },
  
  /**
   * Check the IEG Response. 
   *
   * @param response The AJAX response to check.
   *
   * @return boolean Indicates if response is valid.    
   */
  _checkResponse:function(response) {
    // clear the delay spinner
    iegXHR._setWaitingCursor(false);
    
    // Redirect?
    if (response.indexOf("URL:") == 0) {
      console.log("Exiting IEG...");
      window.location.replace(response.substring(4));
      
      return false;
    }       
    // Sanity check that this is a valid IEG response
    // if not a valid response then inject the response into our Dojox
    // Content Pane so that any javascript in the response gets executed.
    // This is needed for UA redirects for example which are done via
    // javascript returned in the HTML.    
    else if (response.indexOf("ieg-main-wrapper") == -1) {
      console.log("Not an IEG Response. Redirecting...");
      console.log("Response: "+response);
      
      var contentPane = dijit.byId("ieg-main-content-pane");
      contentPane.setContent(response);
      
      return false;
    }
    
    return true;
  },
  
  /**
   * Handle AJAX request errors.
   * If an AJAX call fail, this function injects the 
   * error page html into the DOM in place of the exitsing body.
   *
   * @param error The error message suplied by DOJO.
   * @param args  The error arguments suplied by DOJO.
   */
  _handleAjaxError:function(error, args) {
    console.log('IEG Error: ' + error.name + ': ' + error.message);
    console.dir(error);
    console.dir(args);
    
    // clear the delay spinner
    iegXHR._setWaitingCursor(false);
    
    // set the body of our document to the contents of the body
    // tag of the error page returned from the server
    var playerBody = dojo.byId("PlayerBody");
    var message = "Response: "+args.xhr.responseText;
    if(playerBody && message) {
      dojo.byId("PlayerBody").innerHTML = 
        /<body.*?>([\s\S]*)<\/body>/.exec(args.xhr.responseText)[1];
    }
  },
  
  /**
   * Returns the form for page submission.
   * Returns false if the form/page has already been submitted.
   */
  _getForm:function() {
    var form = dojo.query("form")[0];
    if (iegXHR._wasFormSubmitted(form)) {
      return false;
    } else {
      iegXHR._setFormSubmitted(form, true);
      return form;
    }
  }, 
  
  /**
   * Specifies if the form has already been submitted.
   * 
   * @param form           The IEG page form.
   * @param wasSubmitted   Submitted flag.
   */ 
  _setFormSubmitted: function(form, wasSubmitted) {
    if (typeof(form) == 'undefined') {
      form = dojo.query("form")[0];
    }
    
    // Sets the flag on the form to state whether or 
    // not it was previously submitted.
    // If any onSubmit handler for a form (e.g. validation) 
    // cancels the onSubmit event, it should call this method, 
    // passing false as the second parameter.
    form._alreadySubmitted = wasSubmitted;
  },
  
  /**
   * Function used to control submission of pages/forms.
   * 
   * @param form The IEG page form.
   */ 
  _wasFormSubmitted: function(form) {
    return form._alreadySubmitted;
  },
  
  /**
  * Function used to set an hourglass and
  * spinner when a large request has sent
  * which may cause the system to appear
  * as unresponsive to the end user. 
  * 
  * @param show Used to determine whether the spinner
  *             is being shown or hidden. 
  */   
  _pageSpinner: null,
  _loadingTimeout: null,
  _setWaitingCursor: function(show){
    // setup the spinner widget once if it hasn't already been done
    if(typeof(_pageSpinner) == 'undefined') {
      _pageSpinner = new dojox.widget.Standby({target: "PlayerBody"});
      dojo.addClass(_pageSpinner.domNode, "standby");
      document.body.appendChild(_pageSpinner.domNode);
    }
    
    // show/hide the spinner
    if(show == true) {   
      _loadingTimeout = setTimeout(function(){_pageSpinner.show();},2000);
    } else {
      if(typeof(_loadingTimeout) != 'undefined') {
        clearTimeout(_loadingTimeout);
        _pageSpinner.hide();
      }
    }
  }
  
};