﻿/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
				
Portions Copyright IBM Corp., 2009-2013.
*/

CKEDITOR.skins.add('oneui3',(function(){var a=[];if(CKEDITOR.env.ie&&CKEDITOR.env.version<7){a.push('icons_ltr.png');a.push('icons_rtl.png');}var b={anchor:[300,120],allyHelp:[600,400],cellProperties:[280,230],colordialog:[360,230],find:[300,100],flash:[340,292],iframe:[350,200],image:[366,353],link:[450,300],paste:[300,220],pastetext:[300,220],smiley:[300,80],specialchar:[410,305],table:[320,100],tableProperties:[320,250],numberedListStyle:[360,45],bulletedListStyle:[200,45]};return{preload:a,editor:{css:['editor.css']},dialog:{css:['dialog.css'],dimensions:b},templates:{css:['templates.css']},margins:[0,14,18,14]};})());