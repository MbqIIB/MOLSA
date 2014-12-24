﻿/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.plugins.setLang( "a11yhelp", "sl",
{

	// When translating all fields in accessibilityHelp object, do not translate anything with the form ${xxx}
	accessibilityHelp :
	{
		title : "Pomoč",
		contents : "Vsebina pomoči. Če želite zapreti to pogovorno okno, pritisnite ESC.",
		legend :
		[
			{
				name : "Navodila za pripomočke za ljudi s posebnimi potrebami",
				items :
				[
					{
						name : "Orodna vrstica urejevalnika",
						legend:
							"Za pomik na orodno vrstico pritisnite ${toolbarFocus}. " +
							"V naslednjo in prejšnjo skupino orodnih vrstic se premaknete tako, da pritisnete TAB in SHIFT-TAB. " +
							"Na naslednji in prejšnji gumb orodne vrstice se premaknete tako, da pritisnete PUŠČICO V LEVO ali PUŠČICO V DESNO. " +
							"Za aktiviranje gumba orodne vrstice pritisnite PRESLEDNICO ali ENTER."
					},

					{
						name : "Pogovorno okno urejevalnika",
						legend :
							"Znotraj pogovornega okna pritisnite tipko TAB, da se pomaknete do naslednjega polja pogovornega okna. Pritisnite SHIFT + TAB, da se pomaknete do prejšnjega polja, nato pa pritisnite ENTER, da predložite pogovorno okno ali ESC, da ga prekličete. " +
							"Za pogovorna okna, ki imajo več strani z zavihki, za pomik na seznam z zavihki pritisnite ALT + F10. " +
							"Nato se pomaknite na naslednji zavihek tako, da pritisnete TAB ali PUŠČICO V DESNO. " +
							"Na prejšnji zavihek se premaknete tako, da pritisnete SHIFT + TAB ali PUŠČICO V LEVO. " +
							"Če želite izbrati stran zavihka, pritisnite PRESLEDNICO ali ENTER."
					},

					{
						name : "Kontekstni meni urejevalnika",
						legend :
							"Če želite odpreti kontekstni meni, pritisnite ${contextMenu} ali TIPKO APLIKACIJE. " +
							"Nato se pomaknite na naslednjo menijsko možnost tako, da pritisnete TAB ali PUŠČICO NAVZDOL. " +
							"Na prejšnjo možnost se pomaknete tako, da pritisnete SHIFT+TAB ali PUŠČICO NAVZGOR. " +
							"Če želite izbrati menijsko možnost, pritisnite PRESLEDNICO ali ENTER. " +
							"Podmeni trenutne možnosti odprete tako, da pritisnete PRESLEDNICO ali ENTER ali PUŠČICO V DESNO. " +
							"Na postavko nadrejenega menija se vrnete tako, da pritisnete ESC ali PUŠČICO V LEVO. " +
							"Zaprite kontekstni meni s tipko ESC."
					},

					{
						name : "Polje s seznamom urejevalnika",
						legend :
							"Na seznamu se premaknete na naslednjo postavko tako, da pritisnete TAB ali PUŠČICO NAVZDOL. " +
							"Na prejšnjo postavko seznama se premaknete tako, da pritisnete SHIFT + TAB ali PUŠČICO NAVZGOR. " +
							"Če želite izbrati možnost seznama, pritisnite PRESLEDNICO ali ENTER. " +
							"Če želite zapreti seznam, pritisnite ESC."
					},

					{
						name : "Vrstica poti elementa urejevalnika (če je na voljo*)",
						legend :
							"Za pomik na vrstico poti elementov pritisnite ${elementsPathFocus}. " +
							"Za pomik na gumb naslednjega elementa se pomaknite tako, da pritisnete TAB ali PUŠČICO V DESNO. " +
							"Za pomik na prejšnji gumb se pomaknete tako, da pritisnete SHIFT+TAB ali PUŠČICO V LEVO. " +
							"Za izbiro elementa v urejevalniku pritisnite PRESLEDNICO ali ENTER."
					}
				]
			},
			{
				name : "Ukazi",
				items :
				[
					{
						name : " Razveljavi ukaz",
						legend : "Pritisnite ${undo}"
					},
					{
						name : " Znova uveljavi ukaz",
						legend : "Pritisnite ${redo}"
					},
					{
						name : " Ukaz za krepko",
						legend : "Pritisnite ${bold}"
					},
					{
						name : " Ukaz za ležeče",
						legend : "Pritisnite ${italic}"
					},
					{
						name : " Ukaz za podčrtano",
						legend : "Pritisnite ${underline}"
					},
					{
						name : " Ukaz za povezavo",
						legend : "Pritisnite ${link}"
					},
					{
						name : " Ukaz za strnitev orodne vrstice (če je na voljo*)",
						legend : "Pritisnite ${toolbarCollapse}"
					},
					{
						name : " Pomoč za pripomočke za ljudi s posebnimi potrebami",
						legend : "Pritisnite ${a11yHelp}"
					}
				]
			},

			{	//added by ibm
				name : "Opomba",
				items :
				[
					{
						name : "",
						legend : "* Skrbnik lahko onemogoči nekatere funkcije."
					}
				]
			}
		]
	},

	ibm_a11yhelp :
	{
		helpLinkDescription : "Odpri več tem pomoči v novem oknu",
		helpLink : "Več tem pomoči"
	}

});
