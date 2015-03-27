/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.plugins.setLang( "a11yhelp", "ro",
{

	// When translating all fields in accessibilityHelp object, do not translate anything with the form ${xxx}
	accessibilityHelp :
	{
		title : "Instrucţiuni accesibilitate",
		contents : "Conţinuturi de ajutor. Pentru a închide acest dialog apăsaţi ESC.",
		legend :
		[
			{
				name : "General",
				items :
				[
					{
						name : "Bară de unelte editor",
						legend: "Apăsaţi ${toolbarFocus} pentru a naviga la bara de unelte; Mutaţi-vă la următorul buton de pe bara de unelte cu TAB sau cu săgeată dreapta (RIGHT ARROW); Mutaţi-vă la butonul precedent cu SHIFT+TAB sau cu săgeată stânga (LEFT ARROW); Apăsaţi spaţiu (SPACE) sau ENTER pentru a declanşa bara de unelte a butonului."
					},

					{
						name : "Bară cale editor element",
						legend : "Apăsaţi ${elementsPathFocus} pentru a naviga la bara cale a elementelor; Mutaţi-vă la butonul următor cu TAB sau cu cu RIGHT ARROW; Mutaţi-vă la butonul precedent cu SHIFT+TAB sau cu LEFT ARROW. Apăsaţi pe SPACE sau ENTER pentru a selecta elementul din editor."
					},

					{
						name : "Meniu context editor",
						legend : "Apăsaţi ${contextMenu} sau Cheie aplicaţie (APPLICATION KEY) pentru a deschide meniul context. Apoi mutaţi-vă la opţiunea meniului  cuTAB sau tasta săgeată jos (DOWN ARROW); Mutaţi-vă la opţiunea anterioară cu SHIFT+TAB sau săgeată sus (UP ARROW). Apăsaţi tasta de spaţiu (SPACE) sau ENTER pentru a selecta opţiunea meniu." +
								 "Deschideţi sub-meniul opţiunii curente cu tasta de spaţiu (SPACE) sau tasta ENTER sau tasta săgeată dreapta (RIGHT ARROW); Duceţi-vă înapoi la meniul părinte cu tasta ESC sau tasta săgeată stânga (LEFT ARROW);" +
								 "Închideţi meniul context cu ESC."
					},

					{
						name : "Editor Dialog",
						legend : "Într-un dialog, apăsaţi tasta TAB pentru a naviga la următorul câmp de dialog, apăsaţi SHIFT + TAB pentru a vă muta la câmpul anterior, apăsaţi ENTER pentru a lansa dialogul, apăsaţi ESC pentru a anula dialogul." +
								 "Pentru dialoguri care au pagini tab multiple, apăsaţi ALT + F10 pentru a naviga la lista taburilor. Apoi mutaţi-vă la tab-ul următor cu TAB sau cu săgeată dreapta (RIGTH ARROW); Mutaţi-vă la tabul precedent cu SHIFT + TAB sau săgeată stânga (LEFT ARROW). Apăsaţi spaţiu (SPACE) sau ENTER pentru a selecta pagina tab."
					},

					{
						name : "Editor casetă listă",
						legend : "Într-o casetă listă , mutaţi-vă la următoarea listă cu TAB sau săgeată jos (DOWN ARROW); Mutaţi-vă la articolul listă anterior cu SHIFT + TAB sau săgeată sus (UP ARROW). Apăsaţi SPACE sau ENTER pentru a selecta opţiunea listă. Apăsaţi ESC pentru a închide caseta-listă."
					}
				]
			},
			{
				name : "Comenzi",
				items :
				[
					{
						name : "Comandă Undo",
						legend : "Apăsaţi ${undo}"
					},
					{
						name : " Comandă Redo",
						legend : "Apăsaţi ${redo}"
					},
					{
						name : " Comandă Bold",
						legend : "Apăsaţi ${bold}"
					},
					{
						name : " Comandă Italic",
						legend : "Apăsaţi ${italic}"
					},
					{
						name : " Comandă Underline",
						legend : "Apăsaţi ${underline}"
					},
					{
						name : " Comandă Link",
						legend : "Apăsaţi ${link}"
					},
					{
						name : " Comandă Toolbar Collapse",
						legend : "Apăsaţi ${toolbarCollapse}"
					},
					{
						name : " Ajutor accesibilitate",
						legend : "Apăsaţi ${a11yHelp}"
					}
				]
			},

			{	//added by ibm
				name : "Note",
				items :
				[
					{
						name : "",
						legend : "* Some features can be disabled by your administrator."
					}
				]
			}
		]
	},

	ibm_a11yhelp :
	{
		helpLinkDescription : "Open more help topics in a new window",
		helpLink : "More Help Topics"
	}

});
