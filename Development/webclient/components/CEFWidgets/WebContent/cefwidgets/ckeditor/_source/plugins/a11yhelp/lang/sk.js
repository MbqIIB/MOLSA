/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.plugins.setLang( "a11yhelp", "sk",
{
	// When translating all fields in accessibilityHelp object, do not translate anything with the form ${xxx}
	accessibilityHelp :
	{
		title : "Pomoc",
		contents : "Obsah pomoci. Toto dialógové okno môžete zatvoriť stlačením klávesu ESC.",
		legend :
		[
			{
				name : "Pokyny k zjednodušeniu ovládania",
				items :
				[
					{
						name : "Lišta nástrojov editora",
						legend:
							"V lište nástrojov sa môžete posúvať stlačením klávesu ${toolbarFocus}. " +
							"Na ďalšiu a predchádzajúcu skupinu v lište nástrojov sa môžete posunúť stlačením klávesu TAB alebo SHIFT-TAB. " +
							"Na ďalšie a predchádzajúce tlačidlo v lište nástrojov sa môžete posunúť stlačením šípky vpravo alebo šípky vľavo. " +
							"Tlačidlo v lište nástrojov môžete aktivovať stlačením medzerníka alebo klávesu ENTER."
					},

					{
						name : "Dialógové okno editora",
						legend :
							"V dialógovom okne môžete stlačením klávesu TAB prejsť do ďalšieho poľa dialógového okna, stlačením SHIFT + TAB môžete prejsť do predchádzajúceho poľa, stlačením klávesu ENTER môžete potvrdiť dialógové okno a stlačením klávesu ESC ho môžete zrušiť. " +
							"V dialógových oknách s viacerými kartami sa môžete stlačením kombinácie klávesov ALT + F10 posúvať v zozname kariet. " +
							"Potom môžete stlačením klávesu TAB alebo šípky vpravo prejsť na ďalšiu kartu. " +
							"Stlačením kombinácie klávesov SHIFT + TAB alebo šípky vľavo sa môžete vrátiť na predchádzajúcu kartu. " +
							"Kartu môžete vybrať stlačením medzerníka alebo klávesu ENTER."
					},

					{
						name : "Kontextová ponuka editora",
						legend :
							"Kontextovú ponuku otvoríte stlačením klávesu ${contextMenu} alebo klávesu APPLICATION KEY. " +
							"Potom môžete na ďalšiu možnosť ponuky prejsť stlačením klávesu TAB alebo šípky nadol. " +
							"Na predchádzajúcu možnosť môžete prejsť stlačením SHIFT+TAB alebo šípky nahor. " +
							"Možnosť ponuky vyberiete stlačením medzerníka alebo klávesu ENTER. " +
							"Podponuku vybratej možnosti môžete otvoriť stlačením medzerníka, klávesu ENTER alebo šípky vpravo. " +
							"Na nadradenú položku ponuky sa vrátite stlačením klávesu ESC alebo šípky vľavo. " +
							"Kontextovú ponuku zatvoríte stlačením klávesu ESC."
					},

					{
						name : "Výberový zoznam v editore",
						legend :
							"Vo výberovom zozname sa na nasledujúcu položku v zozname môžete posunúť stlačením klávesu TAB alebo šípky nadol. " +
							"Na predchádzajúcu položku v zozname môžete prejsť stlačením kombinácie klávesov SHIFT + TAB alebo šípky nahor. " +
							"Možnosť v ponuke môžete vybrať stlačením medzerníka alebo klávesu ENTER. " +
							"Výberový zoznam zatvoríte stlačením klávesu ESC."
					},

					{
						name : "Lišta cesty k prvku v editore (ak je k dispozícii*)",
						legend :
							"Stlačením klávesu ${elementsPathFocus} môžete prejsť do lišty cesty k prvkom. " +
							"Na ďalšie tlačidlo prvku môžete prejsť stlačením klávesu TAB alebo šípky vpravo. " +
							"Na predchádzajúce tlačidlo môžete prejsť stlačením kombinácie klávesov SHIFT+TAB alebo šípky vľavo. " +
							"Prvok v editore vyberiete stlačením medzerníka alebo klávesu ENTER."
					}
				]
			},
			{
				name : "Príkazy",
				items :
				[
					{
						name : " Príkaz Späť",
						legend : "Stlačte ${undo}"
					},
					{
						name : " Príkaz Znova",
						legend : "Stlačte ${redo}"
					},
					{
						name : " Príkaz Tučné",
						legend : "Stlačte ${bold}"
					},
					{
						name : " Príkaz Kurzíva",
						legend : "Stlačte ${italic}"
					},
					{
						name : " Príkaz Podčiarknuť",
						legend : "Stlačte ${underline}"
					},
					{
						name : " Príkaz Prepojenie",
						legend : "Stlačte ${link}"
					},
					{
						name : " Príkaz Zvinúť lištu nástrojov (ak je k dispozícii*)",
						legend : "Stlačte ${toolbarCollapse}"
					},
					{
						name : " Pomoc k zjednodušeniu ovládania",
						legend : "Stlačte ${a11yHelp}"
					}
				]
			},

			{	//added by ibm
				name : "Note",
				items :
				[
					{
						name : "",
						legend : "* Niektoré funkcie mohli byť zakázané vašim administrátorom."
					}
				]
			}
		]
	},

	ibm_a11yhelp :
	{
		helpLinkDescription : "Otvoriť ďalšie témy pomoci v novom okne",
		helpLink : "Ďalšie témy pomoci"
	}

});
