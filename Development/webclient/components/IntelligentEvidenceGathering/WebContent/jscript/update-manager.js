/* 
 * Licensed Materials - Property of IBM
 * 
 * Copyright IBM Corporation 2013,2014. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure 
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
require(["dojo/topic", "dojo/fx"], function(topic){window.topic = topic});

/**
 * This object encapsulates all the functions related to updating an IEG page
 * after receiving an AJAX response from the server.
 */
var updateManager = {
  /**
   * Update the Sections Panel.
   * 
   * This function updates the Sections panel by extracting the relevant data
   * from the AJAX response.
   * 
   * @param data The response from the server containing the sections data.
   */
  updateSectionsPanel: function(data) {
  if (data.sections !== undefined && data.sections.length > 0) {
    var sections = dojo.query("tr", "sections");
    if (data.external) {
      // Need to skip first tr in external mode 
      // (there is a space before the first section)
      sections = sections.slice(1);
    }
    
    var horizontal = false;
    var leftArrow;
    var rightArrow;
    if (sections.length == 0) {
      // Check to see if the sections are displayed horizontally
      sections = dojo.query("td:not(.hArrow)", "hSections");
      horizontal = true;
      var hTds = dojo.query("td", "hSections");
      if (dojo.hasClass(hTds[0], "hArrow")) {
        leftArrow = hTds[0];
      }
    
      if (dojo.hasClass(hTds[hTds.length - 1], "hArrow")) {
        rightArrow = hTds[hTds.length - 1];
      }
      
      var displayfrom = dojo.query(
        "div.h-sections-div input[name='displayfrom']")[0];
      if (dojo.attr(displayfrom, "value") != data.displayfrom) {
        dojo.attr(displayfrom, "value", data.displayfrom);
      }
    }
    
    var selectedSpan;
    if (horizontal) {
      var selectedSpan = dojo.query(
        "div.h-sections-div div.sectionBarDiv span.sectionBarTextSpan")[0];
    }
    
    for (var i = 0; i < sections.length; i++) {   
      var sectionNode = sections[i];
      var newSectionData;
      for (var sectionData in data.sections) {
        if (data.sections[sectionData].index == i) {
          newSectionData = data.sections[sectionData];
          break;
        }
      }
      if (newSectionData.displayed == false) {
        dojo.style(sectionNode, "display", "none");
      } else {
        dojo.removeAttr(sectionNode, "style");
      }
    
      // change onclick event on a - the href is a 
      // parameter to the onclick event function
      var as = dojo.query("a", sectionNode);
      if (newSectionData !== undefined 
        && newSectionData.href !== undefined 
        && newSectionData.href != "") {
        
        var hrefString = newSectionData.href.toString();
        var newHref = hrefString.replace(new RegExp("&amp;","gm"),"&");

        // running the onClick in a closure.
        // because this onClick is added in a loop of the sections
        // panel, there are issues with the scope of variables passed 
        // to the closure. Use the ID of the node the event is 
        // attached to - i.e. in the scope of the closure.
        dojo.attr(as[0], "onclick", function(e){        
          iegXHR.iegLink(e, this.id)});

        // update the href of the link
        dojo.attr(as[0], "href", newHref);
      } else {
        dojo.removeAttr(as[0], "href");
        dojo.removeAttr(as[0], "onclick");
      }
        
      //Check if the section state has changed
      if (newSectionData !== undefined 
        && !dojo.hasClass(sectionNode, newSectionData.state)) {

      //if becoming enabled, add style on td
      if (newSectionData.state == "enabled") {
        var tds = dojo.query("td", sectionNode);
        //dojo.attr(tds[0], "style", "padding-bottom: 0; border-bottom:0");
      }
      
      //if no longer enabled, clear style on td
      if (!horizontal && dojo.hasClass(sectionNode, "enabled")) {
        dojo.removeAttr(dojo.query("td", sectionNode)[0], "style");
      }
      
      if (data.external !== undefined
            && data.external && !data.transition) {      
        var currentSectionIconSpan = 
            dojo.query("span.currentSectionIcon", sectionNode)[0];
        var enabledSectionIconSpan = 
          dojo.query("span.enabledSectionIcon", sectionNode)[0];
        var disabledSectionIconSpan = 
          dojo.query("span.disabeldSectionIcon", sectionNode)[0];
        if (dojo.hasClass(sectionNode, "enabled")) {
          dojo.style(enabledSectionIconSpan, 'opacity', 0);
        } else if (dojo.hasClass(sectionNode, "disabled")) {
          dojo.style(disabledSectionIconSpan, 'opacity', 0);        
        } else if (dojo.hasClass(sectionNode, "selected")) {
          dojo.style(currentSectionIconSpan, 'opacity', 0);
        }
      
        // Remove unused style elements in IE
        // The Opacity style property is not directly supported in IE
        if(dojo.isIE > 0) {
          if (newSectionData.state == "enabled") {
            dojo.removeAttr(enabledSectionIconSpan, "style");
          } else if (newSectionData.state == "disabled") {
            dojo.removeAttr(disabledSectionIconSpan, "style");
          } else if (newSectionData.state == "selected") {
            dojo.removeAttr(currentSectionIconSpan, "style");
            //Update current section background
            var slider = dojo.query("#currentSectionSlider")[0];
            var spacerHeight = dojo.marginBox(
              dojo.query(".sections-space")[0]).h;
            var newTop = dojo.marginBox(sectionNode).t;
            dojo.style(slider, "top", (newTop - spacerHeight) + "px");
          }
        } else {
          // Set the opacity on the Section Icon Span
          // The active span must have an opacity value of 1
          // The inactive spans must have an opacity of 0
          if (newSectionData.state == "enabled") {
            dojo.style(currentSectionIconSpan, 'opacity', 0);
            dojo.style(disabledSectionIconSpan, 'opacity', 0);
            dojo.style(enabledSectionIconSpan, 'opacity', 1);
          } else if (newSectionData.state == "disabled") {
            dojo.style(currentSectionIconSpan, 'opacity', 0);
            dojo.style(disabledSectionIconSpan, 'opacity', 1);
            dojo.style(enabledSectionIconSpan, 'opacity', 0);
          } else if (newSectionData.state == "selected") {
            dojo.style(currentSectionIconSpan, 'opacity', 1);
            dojo.style(disabledSectionIconSpan, 'opacity', 0);
            dojo.style(enabledSectionIconSpan, 'opacity', 0);
            
            //Update current section background
            var slider = dojo.query("#currentSectionSlider")[0];
            var spacerHeight = dojo.marginBox(
                      dojo.query(".sections-space")[0]).h;
                var newTop = dojo.marginBox(sectionNode).t;
            dojo.style(slider, "top", (newTop - spacerHeight) + "px");
          }
        }
      }
      
      // Modify the class with the new state
      dojo.replaceClass(sectionNode, newSectionData.state, 
            dojo.attr(sectionNode, "class"));
      
      // Change the class on horizontal sections
      if (horizontal) {
        if (newSectionData.state == "hSelected") {
          dojo.removeClass(as[0]);
          dojo.addClass(as[0], 
                "h-section-link-selected h-outer-section-div-selected");
        } else if (dojo.hasClass(as[0], "h-section-link-selected")) {
          dojo.removeClass(as[0]);
          dojo.addClass(as[0],  "h-section-link h-outer-section-div");
        }
      }
      
      // change title on a
      if (newSectionData.title !== undefined 
            && newSectionData.title != "") {
        dojo.attr(as[0], "title", newSectionData.title);
      } else {
        dojo.removeAttr(as[0], "title");
      }
      
      var divs = dojo.query("div", sectionNode);
      
      // Change the class on horizontal sections
      if (horizontal) {
        if (newSectionData.state == "hSelected") {
          dojo.removeClass(divs[0]);
          dojo.addClass(divs[0], "h-inner-section-div-selected");
        } else if (dojo.hasClass(divs[0], "h-inner-section-div-selected")) {
          dojo.removeClass(divs[0]);
          dojo.addClass(divs[0], "h-inner-section-div");
        }
      }
      
      //change background image
      if (data.external === undefined || !data.external) {
        dojo.style(divs[0],  "backgroundImage", 
              "url('" + newSectionData.imageref + "')");
      }
      
      //Change the class on horizontal sections
      if (horizontal) {
        var spans = dojo.query("span", divs[0]);
        if (spans.length > 0) {
        if (newSectionData.state == "hSelected") {
        dojo.removeClass(spans[0]);
        dojo.addClass(spans[0],  "sectionTabCurrentTextSpan");
        selectedSpan.innerHTML = newSectionData.sectionText;
        } else {
        if (dojo.hasClass(spans[0],  "sectionTabCurrentTextSpan")) {
          spans[0].innerHTML = newSectionData.sectionText;
        }
        
        if (newSectionData.state == "hDisabled") {
          dojo.removeClass(spans[0]);
          dojo.addClass(spans[0],  "sectionTabTextSpanDisabled");
        } else if (newSectionData.state == "hEnabled") {
          dojo.removeClass(spans[0]);
          dojo.addClass(spans[0],  "sectionTabTextSpan");
        }
        }
        }
      }
    }
    }
    
    // Process arrows
    if (leftArrow !== undefined) {
      if (data.leftArrow !== undefined) {
      var a = dojo.query("a", leftArrow)[0];
      if (data.leftArrow.href != dojo.attr(a, "href")) {
      dojo.attr(a, "href", data.leftArrow.href);
      }
      if (data.leftArrow.title != dojo.attr(a, "title")) {
        dojo.attr(a, "title", data.leftArrow.title);
      }
    } else {
      dojo.destroy(leftArrow);
    }
    } else if (data.leftArrow !== undefined) {
      //create an arrow node
    var arrowTd = dojo.create("td", 
          {"class": "hArrow"}, dojo.query("tr", "hSections")[0], "first");
    var arrowA = dojo.create("a", 
          {"class": "h-section-link-arrow h-outer-section-div", 
      href: data.leftArrow.href, title: data.leftArrow.title}, 
        arrowTd, "first");
    var arrowDiv = dojo.create("div", 
          {"class": "h-back-arrow-div"}, arrowA, "first");
    }
    
    if (rightArrow !== undefined) {
      if (data.rightArrow !== undefined) {
      var a = dojo.query("a", rightArrow)[0];
      if (data.rightArrow.href != dojo.attr(a, "href")) {
      dojo.attr(a, "href", data.rightArrow.href);
      }
      if (data.rightArrow.title != dojo.attr(a, "title")) {
        dojo.attr(a, "title", data.rightArrow.title);
      }
    } else {
      dojo.destroy(rightArrow);
    }
    } else if (data.rightArrow !== undefined) {
      //create an arrow node
    var arrowTd = dojo.create("td", {"class": "hArrow"}, 
          dojo.query("tr", "hSections")[0], "last");
    var arrowA = dojo.create("a", 
          {"class": "h-section-link-arrow h-outer-section-div", 
      href: data.rightArrow.href, title: data.rightArrow.title}, 
        arrowTd, "first");
    var arrowDiv = dojo.create("div", 
          {"class": "h-next-arrow-div"}, arrowA, "first");
    }
    }
  },
  
  /**
   * Update the Progress Bar.
   * 
   * This function updates the Progress Bar by extracting the relevant data
   * from the AJAX response.
   * 
   * @param data The response from the server containing the Progress Bar.
   */
  updateProgressBar: function(data) {
  var progressDiv = dojo.query(".progressDiv")[0];
  if (data.sectionText !== undefined) {
    var sectionTextSpan = dojo.query(".sectionTextSpan", progressDiv)[0];
    if (sectionTextSpan.innerHTML != data.sectionText) {
      sectionTextSpan.innerHTML = data.sectionText;
    }
  }
  if (data.pageText !== undefined) {
    var pageTextSpan = dojo.query(".pageTextSpan", progressDiv)[0];
    if (pageTextSpan.innerHTML != data.pageText) {
      pageTextSpan.innerHTML = data.pageText;
    }
  }
  if (data.progressText !== undefined) {
    var completedTextSpan = dojo.query(".completedText", progressDiv)[0];
    if (completedTextSpan.innerHTML != data.progressText) {
      completedTextSpan.innerHTML = data.progressText;
    }
  }
  if (data.progressTitle !== undefined) {
    var completedDiv = dojo.query(".completedDiv", progressDiv)[0];
    if (dojo.attr(completedDiv, "title") != data.progressTitle) {
      dojo.attr(completedDiv, "title", data.progressTitle);
    }
  }
  if (data.progressWidth !== undefined) {
    var completedWidthString = data.progressWidth + "%";
    var completedDiv = dojo.query(".completedDiv", progressDiv)[0];
    if (!data.transition 
        && dojo.style(completedDiv, "width") != completedWidthString) {
    dojo.style(completedDiv, "width", completedWidthString);
    }
  }
  },
  
  /**
   * Update the Page Title.
   * 
   * This function updates the Page Title by extracting the relevant data
   * from the AJAX response.
   * 
   * @param data The response from the server containing the Page Title.
   */
  updatePageTitle: function(data) {
  var pageHeadingTable = dojo.query(".pageHeadingTable")[0];
  updateManager.updatePageTitle(data, pageHeadingTable, false);
  },
  
  /**
   * Update the Page Title.
   * 
   * This function updates the Page Title by extracting the relevant data
   * from the AJAX response.
   * 
   * @param data        The response from the server 
   *               containing the Page Title.
   * @param pageHeadingTable
   * @param inTransition
   */
  updatePageTitle: function(data, pageHeadingTable, inTransition) {
  if (inTransition || !data.transition) {
    // Window title in modal
    ieg.setModalTitle(data.pageTitle);
    var pageHeader = dojo.query(".page-header")[0];
    if (pageHeader) {
      var pageTitleBar = dojo.query(".page-title-bar", pageHeader)[0];
      if (pageTitleBar) {
        var pageTitleBarSpan = dojo.query("span", pageTitleBar)[0];
        if (pageTitleBarSpan.innerHTML != data.pageTitle) {
          pageTitleBarSpan.innerHTML = data.pageTitle;
        }
      }
      var pageDescription = 
              dojo.query(".page-description", pageHeader)[0];
      if (pageDescription) {
        var pageDescriptionDiv = dojo.query("div", pageDescription)[0];
        if (pageDescriptionDiv.innerHTML != data.pageDescription) {
          pageDescriptionDiv.innerHTML = data.pageDescription;
        }
      }
    }
    
    var pageHeadingDiv = dojo.query(".pageHeading", pageHeadingTable)[0];
    var pageTitle = dojo.query("h2", pageHeadingDiv)[0];
    if (pageTitle !== undefined) {
      if (pageTitle.innerHTML != data.pageTitle) {
        pageTitle.innerHTML = data.pageTitle;
      }
    } else {
      pageTitle = pageHeadingDiv;
      if (pageTitle.lastChild.nodeValue != data.pageTitle) {
        pageTitle.lastChild.nodeValue = data.pageTitle;
      }
    }
    
    var pageDescriptionDiv = 
          dojo.query(".pagedescription", pageHeadingTable)[0];
    if (pageDescriptionDiv.innerHTML != data.pageDescription) {
      pageDescriptionDiv.innerHTML = data.pageDescription;
    }
    
    var pageIconDiv = 
          dojo.query(".pageHeadingIconContainer", pageHeadingTable)[0] 
        || dojo.query(".pageHeadingIcon", pageHeadingTable)[0];
    var img = dojo.query("img", pageIconDiv)[0];
    if (img !== undefined && dojo.attr(img, "src") != data.icon) {
      dojo.attr(img, "src", data.icon);
    }
    
    var linksDiv = dojo.query(".Links", pageHeadingTable)[0];
    var policyLink = dojo.query(".policyQuestionPageLink", linksDiv)[0];
    if (dojo.style(policyLink, "visibility") == "hidden") {
      if (data.policyLink != "") {
        dojo.attr(policyLink, "href", data.policyLink);
        dojo.attr(policyLink, "title", data.policyDescription);
        dojo.style(policyLink, "visibility", "visible");
      }
    } else {
      if (data.policyLink != "") {
        dojo.attr(policyLink, "href", data.policyLink);
        dojo.attr(policyLink, "title", data.policyDescription);
        dojo.style(policyLink, "visibility", "visible");
      } else {
        dojo.style(policyLink, "visibility", "hidden");
      }
    }
    var linksDivider = dojo.query(".linksDivider", linksDiv)[0];
    if (linksDivider !== undefined) {
      if (data.policyLink != "" && data.legislationLink != "") {
        dojo.style(linksDivider, "visibility", "visible");
      } else {
        dojo.style(linksDivider, "visibility", "hidden");
      }
    }
    var legislationLink = 
          dojo.query(".legislationQuestionPageLink", linksDiv)[0];
    if (dojo.style(legislationLink, "visibility") == "hidden") {
      if (data.legislationLink != "") {
        dojo.attr(legislationLink, "href", data.legislationLink);
        dojo.attr(legislationLink, "title", 
                  data.legislationDescription);
        dojo.style(legislationLink, "visibility", "visible");
      }
    } else {
      if (data.legislationLink != "") {
        dojo.attr(legislationLink, "href", data.legislationLink);
        dojo.attr(legislationLink, "title", 
                  data.legislationDescription);
        dojo.style(legislationLink, "visibility", "visible");
      } else {
        dojo.style(legislationLink, "visibility", "hidden");
      }
    }
  }
  },
  
  /**
   * Update the Persons Tabs.
   * 
   * This function updates the Persons Tabs by extracting the relevant data
   * from the AJAX response.
   * 
   * @param The response from the server containing the Persons Tabs.
   */
  updatePersonTabs: function(data) {
    var personTabsTable = dojo.query(".personTabsTable")[0];
    updateManager.updatePersonTabs(data, personTabsTable, false);
  },
  
  /**
   * Update the Persons Tabs.
   * 
   * This function updates the Persons Tabs by extracting the relevant data
   * from the AJAX response.
   * 
   * @param data        The response from the server containing the 
   *               Persons Tabs.
   * @param personsTabsTable
   * @param inTransition
   */
  updatePersonTabs: function(data, personTabsTable, inTransition) {
    if (inTransition || !data.transition) {
      if (personTabsTable === undefined) {
        personTabsTable = dojo.query(".personTabsTable")[0];
      }
      
      var personCells = dojo.query("td", personTabsTable);
      
      // Remove leading and trailing cells, they are only used for padding
      personCells = personCells.slice(2, -2);
      for (var i = 0; i < personCells.length; i++) {
        var newPersonTabData = null;
        for (var j = 0; j < data.tabs.length; j++) {
          if (data.tabs[j].index == i) {
            newPersonTabData = data.tabs[j];
            break;
          }
        }
        
        if (newPersonTabData == null) {
          dojo.destroy(personCells[i]);
        } else {
          updateManager.updatePersonTab(personCells[i], i, 
            newPersonTabData, data);
        }
      }
      
      var lastCell = personCells[personCells.length - 1];
      
      // extra cells to be added
      for (var i = personCells.length; i < data.tabs.length; i++) {
        var newPersonTabData = null;
        for (var j = 0; j < data.tabs.length; j++) {
          if (data.tabs[j].index == i) {
            newPersonTabData = data.tabs[j];
            break;
          }
        }
        var newCell = dojo.clone(lastCell);
        
        dojo.place(newCell, lastCell, "after");
        updateManager.updatePersonTab(newCell, i, newPersonTabData, data);
      }
    } 
  },
 
  /**
   * Update a Person Tab.
   * 
   * This function updates a single Person Tab.
   * 
   * @param personCell    The cell for the person.
   * @param index         The persons index.
   * @param newPersonTabData  The new person tab data.
   * @param data        Data from server.
   */
  updatePersonTab: function(personCell, index, newPersonTabData, data) {
    // name, image, alttext
    var img = dojo.query("img", personCell)[0];
    var oldTitle = dojo.attr(personCell, "title");
    if(oldTitle == null) oldTitle = "";
    var wasUnknown = oldTitle == null || oldTitle == "";
    
    if (oldTitle != newPersonTabData.titleText) {
      if (newPersonTabData.firstName === undefined 
          || newPersonTabData.firstName == "") {
        dojo.removeAttr(personCell, "title");
        if (data.external) {
          var newFirstName = dojo.doc.createTextNode("\u00A0");
          dojo.place(newFirstName, personCell.lastChild, "replace");
        } else {
          dojo.destroy(personCell.firstChild);
          dojo.destroy(personCell.firstChild);
        }
      } else {
        dojo.attr(personCell, "title", newPersonTabData.titleText);
        if (wasUnknown) {
          if (data.external) {
            var newFirstName = 
              dojo.doc.createTextNode(newPersonTabData.firstName);
            dojo.place(newFirstName, personCell.lastChild, "replace");      
          } else {
            var newFirstName = 
            dojo.doc.createTextNode(newPersonTabData.firstName);
            dojo.place(newFirstName, img, "before");
            dojo.create("br", {}, img, "before");
          }
        } else {
          if (data.external) {
            var newFirstName = 
              dojo.doc.createTextNode(newPersonTabData.firstName);
            dojo.place(newFirstName, personCell.lastChild, "replace");
          } else {
            var newFirstName = 
              dojo.doc.createTextNode(newPersonTabData.firstName);
            dojo.place(newFirstName, personCell.firstChild, "replace");
          }
        }
      }
    }
  
    // update the various attributes
    dojo.attr(img, "title", newPersonTabData.altText);
    if (dojo.attr(img, "alt") != newPersonTabData.altText) {
      dojo.attr(img, "alt", newPersonTabData.altText);
    }
    if (dojo.attr(img, "src") != newPersonTabData.imageRef) {
      dojo.attr(img, "src", newPersonTabData.imageRef);
    }
    if (dojo.hasClass(personCell, "currentPerson") 
      && (newPersonTabData.firstName !== undefined 
        || newPersonTabData.firstName != "")) {
      dojo.attr(personCell,"class", "knownPerson");
    }
    if (dojo.hasClass(personCell, "unknownPerson") 
      && (newPersonTabData.firstName !== undefined 
        || newPersonTabData.firstName != "")) {
      dojo.attr(personCell,"class", "knownPerson");
    }
    if (!dojo.hasClass(personCell, "unknownPerson") 
      && (newPersonTabData.firstName === undefined 
        || newPersonTabData.firstName == "")) {
      dojo.attr(personCell,"class", "unknownPerson");
    }
  
    // current index
    if (data.currentIndex == index) {
      dojo.attr(personCell,"class", "currentPerson");
    }
  },
 
  /**
   * Get the Page Title animation.
   * 
   * This function build the Page Title transition animation.
   * 
   * @param duration    The duration of the animation.
   * @param oldPageTitle  The old page title.
   * 
   * @return The Page Title transition animation.
   */
  getPageTitleAnimation: function(duration, oldPageTitle) {
    var pagetitle = updateManager.getJSONUpdateData().pagetitle;
    
    if (pagetitle !== undefined) {    
      var newPageTitle = dojo.clone(oldPageTitle);
      //need to update the clone
      updateManager.updatePageTitle(pagetitle, newPageTitle, true);
      dojo.place(newPageTitle, oldPageTitle, "after");
      dojo.style(newPageTitle, "opacity", 0);
      dojo.style(newPageTitle, "position", "absolute");
      dojo.style(newPageTitle, "top", 0);
      dojo.style(newPageTitle, "left", 0);
      return [
      dojo.fadeIn({node:newPageTitle, duration:duration}),
      dojo.fadeOut({node:oldPageTitle, duration:duration})
      ];
    }
    return [];
  },
 
  /**
   * Get the Person Tabs animation.
   * 
   * This function build the Person Tabs transition animation.
   * 
   * @param duration    The duration of the animation.
   * @param oldPersonTabs The old person tabs.
   * 
   * @return The Person Tabs transition animation.
   */
  getPersonTabsAnimation: function(duration, oldPersonTabs) {
    var persontabs = updateManager.getJSONUpdateData().persontabs;
    
    if (persontabs !== undefined) {   
      var newPersonTabs = dojo.clone(oldPersonTabs);
      //need to update the clone
      updateManager.updatePersonTabs(persontabs, newPersonTabs, true);
      dojo.place(newPersonTabs, oldPersonTabs, "after");
      dojo.style(newPersonTabs, "opacity", 0);
      dojo.style(newPersonTabs, "position", "absolute");
      var oldCoords = dojo.coords(oldPersonTabs);
      dojo.style(newPersonTabs, "top", oldCoords.t);
      dojo.style(newPersonTabs, "left", oldCoords.l);
      return [
      dojo.fadeIn({node:newPersonTabs, duration:duration}),
      dojo.fadeOut({node:oldPersonTabs, duration:duration})
        ];
    }
    return [];
  },
 
  /**
   * Get the Progress Bar animation.
   * 
   * This function build the Progress Bar transition animation.
   * 
   * @param duration  The duration of the animation.
   * 
   * @return The Progress Bar transition animation.
   */
  getProgressBarAnimation: function(duration) {
    var progressbar = updateManager.getJSONUpdateData().progressbar;
    
    if (progressbar !== undefined) {
    var progressDiv = dojo.query(".progressDiv")[0];
    var completedDiv = dojo.query(".completedDiv", progressDiv)[0];
    
    return [dojo.animateProperty(
      {node:completedDiv, 
      properties:{width:{start: completedDiv.style.width, 
          end:progressbar.progressWidth, units:"%"}}, 
          duration:duration})];
    }
    return [];
  },
 
  /**
   * Get the Sections Panel animation.
   * 
   * This function build the Sections Panel transition animation.
   * 
   * @param duration    The duration of the animation.
   * 
   * @return The Sections Panel transition animation.
   */
  getSectionsPanelAnimation: function(duration) {
  var animationList = [];
    var sectionspanel = updateManager.getJSONUpdateData().sectionspanel;
    //go over the nodes, detect the ones that need a transition
  
  if (sectionspanel !== undefined 
    && sectionspanel.sections !== undefined 
    && sectionspanel.sections.length > 0) {
    var oldSelected;
    var newSelected;
    var currentChanged = false;
    var sections = dojo.query("tr", "sections");
    
    if (sectionspanel.external) {
      // Need to skip first tr in external mode 
    // (there is a space before the first section)
    sections = sections.slice(1);
    }

    for (var i = 0; i < sections.length; i++) {   
      var sectionNode = sections[i];
    var newSectionData;
    for (var sectionData in sectionspanel.sections) {
      if (sectionspanel.sections[sectionData].index == i) {
        newSectionData = sectionspanel.sections[sectionData];
      break;
      }
    }
    
    //Check if the section state has changed
    if (newSectionData !== undefined 
      && !dojo.hasClass(sectionNode, newSectionData.state)) {
      
      if (sectionspanel.external !== undefined 
        && sectionspanel.external) {
        var currentSectionIconSpan = 
          dojo.query("span.currentSectionIcon", sectionNode)[0];
      var enabledSectionIconSpan = 
        dojo.query("span.enabledSectionIcon", sectionNode)[0];
      var disabledSectionIconSpan = 
        dojo.query("span.disabeldSectionIcon", sectionNode)[0];
      
      if (dojo.hasClass(sectionNode, "enabled")) {
        animationList.push(
          dojo.fadeOut({node:enabledSectionIconSpan, duration:duration}));
      } else if (dojo.hasClass(sectionNode, "disabled")) {
        animationList.push(
          dojo.fadeOut({node:disabledSectionIconSpan, duration:duration}));
      } else if (dojo.hasClass(sectionNode, "selected")) {
        animationList.push(
          dojo.fadeOut({node:currentSectionIconSpan, duration:duration}));
        oldSelected = sectionNode;
        currentChanged = true;
      }
      
      if (newSectionData.state == "enabled") {
        dojo.style(enabledSectionIconSpan, 'opacity', 0);
        animationList.push(
          dojo.fadeIn({node:enabledSectionIconSpan, duration:duration}));
      } else if (newSectionData.state == "disabled") {
        dojo.style(disabledSectionIconSpan, 'opacity', 0);
        animationList.push(
          dojo.fadeIn({node:disabledSectionIconSpan, duration:duration}));
      } else if (newSectionData.state == "selected") {
        dojo.style(currentSectionIconSpan, 'opacity', 0);
        animationList.push(
          dojo.fadeIn({node:currentSectionIconSpan, duration:duration}));
        newSelected = sectionNode;
      }
      }
    }
    }
    
    if (currentChanged) {
      var slider = dojo.query("#currentSectionSlider")[0];
    var offsetTop = slider.offsetTop;
    var oldTop = dojo.marginBox(oldSelected).t;
      var newTop = dojo.marginBox(newSelected).t;
       animationList.push(
         dojo.fx.slideTo({node:slider, left:'0', 
         top:newTop - oldTop + offsetTop, units:"px", duration:duration}));
     }
    }
    
  return animationList;
  },
 
  /**
   * Get the JSON update data.
   * 
   * @return JSON update data.
   */
  getJSONUpdateData: function() {
    var jsonUpdateScript = dojo.query("#jsonUpdate")[0];
  var jsonUpdate = jsonUpdateScript.innerHTML.substring(
    jsonUpdateScript.innerHTML.indexOf("update(") + 7, 
      jsonUpdateScript.innerHTML.indexOf(");"));
  return dojo.fromJson(jsonUpdate);
  },
  
  update: function(data) {
    var transitionBlocked = false;
    if (dojo.isIE <= 7) {
      // Block transitions on IE7
    transitionBlocked = true;
  }
  for (var panel in data) {
    updateManager.notifyPanel("/curam/ieg/" + panel, data[panel], 
      transitionBlocked);
  }
  },
  
  notifyPanel: function(panelTopic, panelData, transitionBlocked) {
    if (transitionBlocked) {
    panelData.transition = false;
    }
    window.topic.publish(panelTopic, panelData);
  }
};