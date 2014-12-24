/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
				
Portions Copyright IBM Corp., 2009-2013.
*/

var CKEDITOR_LANGS=(function(){var b={ar:'Arabic',bg:'Bulgarian',ca:'Catalan',cs:'Czech',da:'Danish',de:'German',el:'Greek',en:'English',es:'Spanish',fi:'Finnish',fr:'French',he:'Hebrew (HE)',hr:'Croatian',hu:'Hungarian',it:'Italian',iw:'Hebrew (IW)',ja:'Japanese',kk:'Kazakh',ko:'Korean',nb:'Norwegian Bokmal (NB)',no:'Norwegian (NO)',nl:'Dutch',no:'Norwegian',pl:'Polish',pt:'Portuguese (Portugal)','pt-br':'Portuguese (Brazil)',ro:'Romanian',ru:'Russian',sk:'Slovak',sl:'Slovenian',sv:'Swedish',th:'Thai',tr:'Turkish',uk:'Ukrainian',zh:'Chinese Simplified (ZH)','zh-tw':'Chinese Traditional','zh-cn':'Chinese Simplified (ZH-CN)'},c=[];for(var d in b)c.push({code:d,name:b[d]});c.sort(function(e,f){return e.name<f.name?-1:1;});return c;})();
