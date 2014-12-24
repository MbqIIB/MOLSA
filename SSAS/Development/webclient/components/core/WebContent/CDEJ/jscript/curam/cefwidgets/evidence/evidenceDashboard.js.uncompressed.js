/* 
 * Licensed Materials - Property of IBM
 * 
 * Copyright IBM Corporation 2012-2013. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure 
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
/**
 * Modifications
 * -------------
 * 06-Apr-2013 SD  [CR00375669] Added aria-pressed logic to evidence labels.
 * 04-Jan-2013 SD  [CR00354220] RPT fix for evidence dashboard.
 * 03-Oct-2012 BD  [CR00345902] Dojo 1.7 Upgrade. Migrate code.
 */
require(["dojo/_base/connect","curam/cefwidgets/evidence/DashboardTitlePane"]);

var defaultNumberOfColumns = 3;
var caseID=0;
var issueTooltip = '';
var verificationTooltip = '';
var inEditTooltip = '';
var currentFilter='recorded';
var currentFilterClass= '';
var iconVerifications="../Images/dashboard_icon_verifications.png";
var iconInEditEvidence="../Images/dashboard_icon_inedit.png";
var iconIssues="../Images/dashboard_icon_issue.png";

dojo.global.createEvidenceDashboard = function(
  domLocation, caseID, issueText, verificationText, ineditText, notRecordedText,
  recordedText, allText, selectedText, expandText, collapseText) {

    //
    // Setup the legend
    //
    var legendDiv = dojo.create("div");
    dojo.place(legendDiv, domLocation);
    dojo.addClass(legendDiv, 'dashboardLegend');

    // Issues
    var span_issue = dojo.create("span", {innerHTML:issueText,style: {
       paddingLeft: "2px", paddingRight: "20px"} },legendDiv);
    var image_issue = dojo.create("img" ,
      {src:iconIssues, alt:"", style: {verticalAlign:"middle"}},span_issue);
    dojo.place(image_issue,span_issue,'before');
    // Verifications
    var span_verification = dojo.create("span", {innerHTML:verificationText,style: {
       paddingLeft: "2px", paddingRight: "20px"} },legendDiv);
    var image_verify = dojo.create("img" ,
      {src:iconVerifications, alt:"", style: {verticalAlign:"middle"}},span_verification);     
    dojo.place(image_verify,span_verification,'before');
    // InEdit Evidence
    var span_inEdit = dojo.create("span", {innerHTML:ineditText,style: {
       paddingLeft: "2px", paddingRight: "20px"} },legendDiv);
    var image_inEdit = dojo.create("img" ,
      {src:iconInEditEvidence, alt:"", style: {verticalAlign:"middle"}},span_inEdit);
    dojo.place(image_inEdit,span_inEdit,'before');

    
    var dashboardData = dojo.byId("dashboardData");
    this.caseID = caseID;
    this.issueTooltip = issueText;
    this.verificationTooltip = verificationText;
    this.inEditTooltip = ineditText;
    
    var i = 0;
    // For each row
    dojo.forEach(dashboardData.children, function(entry) {
    
        var catName = dojo.attr(entry, "value");
        
        
        //
        // Create content panel
        //
        var contentPanelId = 'ContentPanel_' + i;
        var dashboardID = "Dashboard_" + contentPanelId;
        var tableId = 'Table_' + contentPanelId;
        
        var isOpen = 'true';
        
        if (i > 0) {
          isOpen = 'false';
        }

       
        //
        // Create labels.
        //
        var contentPanelLabels = dojo.create("div", {
            id: "LabelHolder_" + contentPanelId
        });
        dojo.addClass(contentPanelLabels, 'contentPanelLabelsStyle');
        
        // Create labels for navigator.
        
        //
        // Not Recorded
        //
        var notRecBackground = dojo.create("div" ,
                        {id: 'Not_RecordedLabel_' + contentPanelId,
                     labelType: 'notRecorded',
                     customtype: 'label',
                     role: 'button', tabindex: '0'
                     });
        dojo.attr(notRecBackground, "aria-pressed", "false");
        
        addEvent(notRecBackground,'mouseover',filterMouseIn);
        addEvent(notRecBackground,'mouseout',filterMouseOut);
                     
        dojo.place(notRecBackground, contentPanelLabels);
        if(currentFilter=='notRecorded') {
          dojo.addClass(notRecBackground, 'backgroundHighlight');
          dojo.attr(notRecBackground, "alt", selectedText);
        } else {
          dojo.addClass(notRecBackground, 'backgroundNormal notRecordedFilter');
          dojo.attr(notRecBackground, "alt", "");
        }
        
        var notRecBackgroundSelected = dojo.create("div");
        dojo.place(notRecBackgroundSelected, notRecBackground);
        
        var notRecorded = dojo.create("span", {innerHTML: notRecordedText},
                        notRecBackgroundSelected);
        dojo.addClass(notRecorded, 'filterLabelText');

        var args = ['notRecorded', tableId, contentPanelLabels.id, i, notRecBackground]
        dojo.connect(notRecBackground, "onclick", args, startFilter);

        //
        // Recorded
        //
        var recBackground = dojo.create("div" ,{id: 'Recorded_Label_' + contentPanelId, 
                                               labelType: 'recorded',
                                               customtype: 'label', 
                                               role: 'button', tabindex: '0'});
        dojo.attr(recBackground, "aria-pressed", "true");
        
        addEvent(recBackground,'mouseover',filterMouseIn);
        addEvent(recBackground,'mouseout',filterMouseOut);

        dojo.place(recBackground, contentPanelLabels);
        
        if(currentFilter=='recorded') {
          dojo.addClass(recBackground, 'backgroundHighlight');
          dojo.attr(recBackground, "alt", selectedText);
        } else {
          dojo.addClass(recBackground, 'backgroundNormal');
          dojo.attr(recBackground, "alt", "");
        }

        var recBackgroundSelected = dojo.create("div");
        dojo.place(recBackgroundSelected, recBackground);
        
        var recorded = dojo.create("span", {
            innerHTML: recordedText}, recBackgroundSelected);
        dojo.addClass(recorded, 'filterLabelText');
        
        var args = ['recorded', tableId, contentPanelLabels.id, i, recBackground]
        dojo.connect(recBackground, "onclick", args, startFilter);
        
        //
        // All
        //
        var allBackground = dojo.create("div" ,{id: 'All_Label_' + contentPanelId,
                                               labelType: 'all',
                                               customtype: 'label', 
                                               role: 'button', tabindex: '0'});
        dojo.attr(allBackground, "aria-pressed", "false");
                                                    
        addEvent(allBackground,'mouseover',filterMouseIn);
        addEvent(allBackground,'mouseout',filterMouseOut);
        dojo.place(allBackground, contentPanelLabels);
        
        if(currentFilter=='all') {
          dojo.addClass(allBackground, 'backgroundHighlight');
          dojo.attr(allBackground, "alt", selectedText);
        } else {
          dojo.addClass(allBackground, 'backgroundNormal');
          dojo.attr(allBackground, "alt", "");
        }

        var allBackgroundSelected = dojo.create("div");
        dojo.place(allBackgroundSelected, allBackground);
        
        var all = dojo.create("span", {
            innerHTML: allText
        }, allBackgroundSelected);
        dojo.addClass(all, 'filterLabelText');
        
        var args = ['all', tableId, contentPanelLabels.id, i, allBackground]
        dojo.connect(allBackground, "onclick", args, startFilter);

        //
        //
        //
        var floatClear = dojo.create("span", {
            style: "clear: both;"
        }, contentPanelLabels);

        //
        // Create a table to hold the dashboard
        //
        var table = dojo.create('table', {
            id: tableId,
            width: '100%'
        });
        dojo.addClass(table, 'treeHolderStyle');
        var tbody = dojo.create("tbody", null, table);

        //
        // Create the  pane for the evidence category
        //
        titlePane = new curam.cefwidgets.evidence.DashboardTitlePane({
          title: catName,
          id:  'Title_'+contentPanelId,
          navigationContent: contentPanelLabels,
          content: table,
          selectedButtonAltText: selectedText,
          toggleExpandAltText: expandText,
          toggleCollapseAltText: collapseText});
        dojo.place(titlePane.domNode, domLocation);
        
        // Add a line break
        var lineBreak = dojo.create("br");
        dojo.place(lineBreak, domLocation);
        
        dojo.place(tbody, domLocation);
        
        filterDashboard('recorded',tableId,tableId,i );

        
        i++;
    })
    
}

function addEvent( obj, type, fn ) {
  if (obj.addEventListener) {
    obj.addEventListener( type, fn, false );
  }
  else if (obj.attachEvent) {
    obj["e"+type+fn] = fn;
    obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
    obj.attachEvent( "on"+type, obj[type+fn] );
  }
  else {
    obj["on"+type] = obj["e"+type+fn];
  }
}

function filterMouseOut() {
  this.className=currentFilterClass;
}


function filterMouseIn() {
  currentFilterClass=this.className;
  this.className='backgroundHighlightRollover';
}

function startFilter() {
  filterDashboard(this[0], this[1], this[2], this[3]);
  CEFUtils.toggleAriaPressed(this[4]);
}

/**
 *Filter the evidence dashboard to show 'All', 'Recorded' or 'Not Recorded'
 *evidence types
 */
function filterDashboard(option, tableId, labelHolderId, panelNumber) {
    //1. Use tableID to find the table node
    //2. Use the panel number (0, 1,2 etc) to identify the category
    //3. Only add evidence where option matches (recorded,NotRecorded,All)

    // Get the table node
    var existingTable = dojo.byId(tableId);
    var dashboardData = dojo.byId("dashboardData");

    // Create a new table
    var newTable = dojo.create('table', {
        id: tableId,
        width: '100%'
    });
    
    dojo.addClass(newTable, 'treeHolderStyle');
    var thead = dojo.create("thead", null, newTable);    
    var tbody = dojo.create("tbody", null, newTable);

    // Get the matching evidence category
    var evidenceNodes = dojo.query("li",dashboardData.children[panelNumber]);
    var rowCounter = 0;
    var tableHeaderRow = dojo.create('tr',null,thead);
    var tr = dojo.create('tr',null,tbody);
    
    for (var x = 0; x < evidenceNodes.length; x++){ 
      var showEvidence=true;
      
      // Add a <th> element for each <td>, satisfies RPT checks
      dojo.create('th', null, tableHeaderRow);
      
      if (option == 'recorded' &&  dojo.attr(evidenceNodes[x], "recorded")!="true") {
        showEvidence=false;
      } else if (option == 'notRecorded' &&  dojo.attr(evidenceNodes[x], "recorded")!="false") {
        showEvidence=false;
      } 
      
      if (showEvidence) {
        // If we have reached the limit for the row, then create a new one
        if(rowCounter == defaultNumberOfColumns) {
          tr = dojo.create('tr',null,tbody);
          rowCounter=0;
        }

        var tdId = "td_" +x+ "_" + tableId;
        var td = dojo.create('td', {
                  id: tdId,
                  width: '15%',
                  height:'22px',
                  customType : 'treeHolderTD'
              }, tr);
        var tdImage = dojo.create('td', {
                  id: tdId,
                  width: '15%',
                  height:'22px',
                  customType : 'treeHolderTD'
              }, tr);
        dojo.addClass(tdImage, 'tdStyle');
      
        createEntry(td,tdImage,evidenceNodes[x], caseID);
        rowCounter++;
      }
    } 
    
    // If the last row wasnt fully filled, then create some empty tds to fill it
    for (var x = rowCounter; x<defaultNumberOfColumns; x++) {
      var td = dojo.create('td', {id: tdId, width: '15%', customType : 'treeHolderTD', height:'22px'}, tr);
      dojo.addClass(td, 'tdStyle');
      var tdImage = dojo.create('td', {id: tdId, width: '15%', customType : 'treeHolderTD', height:'22px'}, tr);
      dojo.addClass(tdImage, 'tdStyle');
    }
    
    // Replace old table
    dojo.place(newTable,existingTable,"replace");

   
    //Determine the one currently selected.
    var currentIndex = 0;
    dojo.query('[customType=\"label\"]', labelHolderId).forEach(function(node, index, arr){
        if (node.className == 'backgroundHighlight') {
            currentIndex = index;
        }
    });
    
    if (option == 'all') {
      currentIndex = 2;
    } else if (option == 'recorded') {
      currentIndex = 1;
    } else if (option == 'notRecorded') {
      currentIndex = 0;
    }
    
    dojo.query('[customType=\"label\"]', labelHolderId).forEach(function(node, index, arr){
        if (index == currentIndex) {
            node.className = 'backgroundHighlight';
        }
        else {
            node.className = 'backgroundNormal';
        }
    })
    this.currentFilter=option;
    currentFilterClass='backgroundHighlight';
}

/**
  *Create an Evidence entry on the dashboard. 
  *An entry displays the evidence type name which links to the appropriate 
  *workpace view. If there are any inedit records, issues or verifications for
  *that evidence type then an appropriate image will be displayed beside the
  *link.
  */
function createEntry(evidenceEntry, imageEntry, evidenceDetails, caseID) {

  evidenceEntry.innerHTML = "<a href='Evidence_workspaceTypeListPage.do?caseID="+caseID+"&evidenceType="+ dojo.attr(evidenceDetails,"evidenceType")+ "'>" + evidenceDetails.innerHTML +"</a>"
  
  if(dojo.attr(evidenceDetails, "issues")!="0") {
    var image = dojo.create("img" ,
    {src:iconIssues, style: {verticalAlign:"top"}, alt:this.issueTooltip, title:this.issueTooltip},imageEntry);
  } else {
    dojo.create("span", {style: {paddingLeft: "19px"} },imageEntry);
  }

  if(dojo.attr(evidenceDetails, "verification")!="0") {
    var image = dojo.create("img" ,
    {src:iconVerifications, style: {verticalAlign:"top"}, alt:this.verificationTooltip, title:this.verificationTooltip},imageEntry);
  } else {
    dojo.create("span", {style: {paddingLeft: "22px"} },imageEntry);
  }

  if(dojo.attr(evidenceDetails, "inedit")!="0") {
    var image = dojo.create("img" ,
    {src:iconInEditEvidence, style: {verticalAlign:"top"}, alt:this.inEditTooltip, title:this.inEditTooltip},imageEntry);
  } else {
    dojo.create("span", {style: {paddingLeft: "19px"} },imageEntry);
  }
}