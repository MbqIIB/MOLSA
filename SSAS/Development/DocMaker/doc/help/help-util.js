/*
* Copyright © 2004-2006 Curam Software Ltd. All rights reserved.
*/
function pageOpened() {
var spans = document.getElementsByTagName("span");
for (var i = 0; i < spans.length; i++) {
if (spans[i].className == "navsync") {
spans[i].style.display = "inline";
}
}
}
function controlPageOpened() {
}
function openTopic(topic) {
parent.applet.document.HelpApplet.openTopic(topic);
}
function setHelpURL() {
parent.applet.document.HelpApplet.setHelpURL(top.location.href);
}
function focusApplet() {
parent.applet.focus();
parent.applet.document.HelpApplet.takeFocus();
}
function rewriteLink(link, topic) {
if (parent.applet) {
link.href = 'javascript:openTopic("' + topic + '")';
}
}
function syncTOC() {
if (parent.applet) {
parent.applet.document.HelpApplet.syncTOC(location.href);
} else {
syncServletTOC();
}
}
function syncServletTOC() {
var locHref = location.href;
var link;
link = findTOCLink(locHref);
if (link) {
highlightTOCLink(link);
} else {
var index = locHref.lastIndexOf("#");
if (index > -1) {
link = findTOCLink(locHref.substring(0, index));
highlightTOCLink(link);
}
}
}
function findTOCLink(url) {
var links = parent.toc.document.getElementsByTagName("a");
for (var i = 0; i < links.length; i++) {
if (url == links[i].href) {
return links[i];
}
}
return null;
}
function highlightTOCLink(link) {
parent.toc.expandTreeToShowLeaf(link.parentNode);
parent.toc.focus();
link.focus();
if (link.scrollIntoView){
link.scrollIntoView(false);
}
parent.toc.fade(link);
parent.toc.fade(link.parentNode);
}
function fade(element) {
if (element.fadeInterval) {
return;
}
var blues = ["00", "20", "40", "60", "80", "a0", "c0", "e0", "ff"];
var blue = 0;
var oldColor = element.style.backgroundColor;
element.fadeInterval = window.setInterval(
function() {
element.style.backgroundColor = "#ffff" + blues[blue++];
if (blue == blues.length) {
window.clearInterval(element.fadeInterval);
element.style.backgroundColor = oldColor;
element.fadeInterval = null;
}
}, 150);
}
var COLLAPSE_TITLE;
var COLLAPSED_STATE;
var COLLAPSE_ICON;
var EXPAND_TITLE;
var EXPANDED_STATE;
var EXPAND_ICON;
function toggleSubtree(subtreeItem, expandEntry) {
var linkSpan = subtreeItem.firstChild;
var nestedList = linkSpan.nextSibling;
var toggleIcon = linkSpan.firstChild;
var entryLink = linkSpan.lastChild;
if (expandEntry) {
nestedList.style.display = "block";
toggleIcon.src = COLLAPSE_ICON;
entryLink.alt = EXPANDED_STATE;
entryLink.title = EXPANDED_STATE;
toggleIcon.alt = COLLAPSE_TITLE;
toggleIcon.title = COLLAPSE_TITLE;
} else {
nestedList.style.display = "none";
toggleIcon.src = EXPAND_ICON;
entryLink.alt = COLLAPSED_STATE;
entryLink.title = COLLAPSED_STATE;
toggleIcon.alt = EXPAND_TITLE;
toggleIcon.title = EXPAND_TITLE;
}
toggleIcon.onclick = function() {
toggleSubtree(subtreeItem, !expandEntry);
}
}
function addToggleKeyHandler(subtreeItem) {
var linkSpan = subtreeItem.firstChild;
linkSpan.lastChild.onkeypress = function(e) {
var keyCode;
var keyChar;
if (window.event) {
keyCode = window.event.keyCode;
} else if (e.which) {
keyCode = e.which;
}
keyChar = String.fromCharCode(keyCode);
if (keyChar == "+") {
toggleSubtree(subtreeItem, true);
} else if (keyChar == "-") {
toggleSubtree(subtreeItem, false);
}
}
}
function collapseTree(collapseTitle, collapsedState, collapseIcon,
expandTitle, expandedState, expandIcon) {
COLLAPSE_TITLE = collapseTitle;
COLLAPSED_STATE = collapsedState;
COLLAPSE_ICON = collapseIcon;
EXPAND_TITLE = expandTitle;
EXPANDED_STATE = expandedState;
EXPAND_ICON = expandIcon;
var items = document.getElementsByTagName("li");
for (var i = 0; i < items.length; i++) {
if (items[i].className == "subtree") {
toggleSubtree(items[i], false);
addToggleKeyHandler(items[i]);
}
}
}
function expandTreeToShowLeaf(leafElement) {
if (leafElement && leafElement.parentNode) {
var outerSubtreeItem = leafElement.parentNode.parentNode;
if (outerSubtreeItem && outerSubtreeItem.className == "subtree") {
toggleSubtree(outerSubtreeItem, true);
expandTreeToShowLeaf(outerSubtreeItem);
} else {
expandTreeToShowLeaf(leafElement.parentNode);
}
}
}
function toggleTab() {
var controlFS = parent.document.getElementById("control");
if (controlFS) {
var tocHeight = getFrameHeight(parent.toc);
var searchHeight = getFrameHeight(parent.search);
if (tocHeight >= searchHeight) {
animateShrink(controlFS, true, tocHeight, getTabHeight(parent.toc));
} else {
animateShrink(controlFS, false, searchHeight,
getTabHeight(parent.search));
}
}
}
function animateShrink(theFS, shrinkTop, startHeight, endHeight) {
if (theFS.animateInterval || startHeight <= endHeight) {
return;
}
var steps = 10;
var delta = startHeight - endHeight;
var thisStep = steps;
var logoHeight = getFrameHeight(parent.logo);
theFS.animateInterval = window.setInterval(
function() {
var newHeight
= Math.floor(endHeight + Math.pow((1 / steps) * thisStep, 3) * delta);
if (shrinkTop) {
theFS.setAttribute("rows", logoHeight + ", " +  newHeight + ", *", 0);
} else {
theFS.setAttribute("rows", logoHeight + ", *, " + newHeight, 0);
}
if (--thisStep < 0) {
window.clearInterval(theFS.animateInterval);
theFS.animateInterval = null;
}
}, 20);
}
function getFrameHeight(frame) {
var height;
var agent = navigator.userAgent.toLowerCase();
if (frame.innerHeight) {
height = frame.innerHeight;
} else if (frame.document.documentElement) {
height = frame.document.documentElement.clientHeight;
} else {
height = frame.document.body.clientHeight;
}
if (agent.indexOf("konqueror") != -1 || agent.indexOf("safari") != -1) {
height += 4;
} else if (agent.indexOf("msie") != -1) {
height += 2;
}
return height;
}
function getTabHeight(frame) {
var height = frame.document.body.firstChild.offsetHeight;
var agent = navigator.userAgent.toLowerCase();
var fudge = 0;
if (agent.indexOf("konqueror") != -1 || agent.indexOf("safari") != -1) {
fudge = 4;
} else if (agent.indexOf("msie") != -1) {
fudge = 2;
}
height += fudge;
if (frame == parent.toc) {
height += fudge;
}
return height;
}
