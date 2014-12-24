﻿/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.plugins.setLang( "a11yhelp", "hr",
{

	// When translating all fields in accessibilityHelp object, do not translate anything with the form ${xxx}
	accessibilityHelp :
	{
		title : "Upute dostupnosti",
		contents : "Sadržaj pomoći. Za zatvaranje dijaloga pritisnite ESC.",
		legend :
		[
			{
				name : "Općenito",
				items :
				[
					{
						name : "Traka s alatima editora",
						legend: "Pritisnite ${toolbarFocus} da biste došli na traku s alatima; Pomaknite se na sljedeću tipku trake s alatima pomoću TAB ili RIGHT ARROW; Pomaknite se na prethodnu tipku pomoću SHIFT+TAB ili LEFT ARROW; Pritisnite SPACE ili ENTER da bi se okinula tipka trake s alatima."
					},

					{
						name : "Traka staze elementa editora",
						legend : "Pritisnite ${elementsPathFocus} da biste došli na traku staze elemenata; Pomaknite se na  sljedeću tipku elementa pomoću TAB ili RIGHT ARROW; Pomaknite se na prethodnu tipku pomoću SHIFT+TAB ili LEFT ARROW. Pritisnite SPACE ili ENTER da biste izabrali element u editoru."
					},

					{
						name : "Kontekstni izbornik editora",
						legend : "Pritisnite ${contextMenu} ili APPLICATION KEY za otvaranje kontekstnog izbornika. Zatim se  pomaknite na sljedeću opciju izbornika pomoću TAB ili DOWN ARROW; Pomaknite se na prethodnu opciju pomoću SHIFT+TAB ili UP ARROW. Pritisnuti SPACE ili ENTER da biste izabrali opciju izbornika." +
								 "Otvorite podizbornik trenutne opcije pomoću SPACE ili ENTER ili RIGHT ARROW; Vratite se natrag na  stavku podređenog izbornika pomoću ESC ili LEFT ARROW;" +
								 "Zatvorite kontekstni izbornik pomoću ESC."
					},

					{
						name : "Dijalog editora",
						legend : "Unutar dijaloga, pritisnite TAB da biste otišli na sljedeće polje dijaloga, pritisnite SHIFT + TAB za povratak na prethodno polje, pritisnite ENTER za slanje dijaloga, pritisnite ESC za opoziv dijaloga." +
								 "Za dijaloge koji imaju višestruke stranice kartica, pritisnite ALT + F10 da biste otišli na popis-kartica. Zatim se pomaknite na sljedeću karticu pomoću TAB ili RIGTH ARROW; Pomaknite se na prethodnu karticu pomoću SHIFT + TAB ili LEFT ARROW. Pritisnite SPACE ili ENTER da biste izabrali stranicu kartice."
					},

					{
						name : "Kućica s popisom iz editora",
						legend : "Unutar kućice s popisom pomaknite se na sljedeću stavku popisa pomoću TAB ili DOWN ARROW; Pomaknite se na sljedeću stavku popisa pomoću SHIFT + TAB ili UP ARROW. Pritisnite SPACE ili ENTER za izbor opcije popisa. Pritisnite ESC za zatvaranje kućice s popisom."
					}
				]
			},
			{
				name : "Naredbe",
				items :
				[
					{
						name : " Poništi naredbu",
						legend : "Pritisnite ${undo}"
					},
					{
						name : " Ponovno izvedi naredbu",
						legend : "Pritisnite ${redo}"
					},
					{
						name : " Podebljaj naredbu",
						legend : "Pritisnite ${bold}"
					},
					{
						name : " Naredba kurziv",
						legend : "Pritisnite ${italic}"
					},
					{
						name : " Podcrtaj naredbu",
						legend : "Pritisnite ${underline}"
					},
					{
						name : " Naredba poveži",
						legend : "Pritisnite ${link}"
					},
					{
						name : " Naredba Smanji traku s alatima",
						legend : "Pritisnite ${toolbarCollapse}"
					},
					{
						name : " Pomoć za Dostupnost",
						legend : "Pritisnite ${a11yHelp}"
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
