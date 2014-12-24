/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.plugins.setLang( "a11yhelp", "hu",
{

	// When translating all fields in accessibilityHelp object, do not translate anything with the form ${xxx}
	accessibilityHelp :
	{
		title : "Súgó",
		contents : "Tartalomjegyzékes súgó. A párbeszéd bezárásához nyomja meg az ESC billentyűt.",
		legend :
		[
			{
				name : "Kisegítő lehetőségekkel kapcsolatos útmutatások",
				items :
				[
					{
						name : "Szerkesztő eszköztár",
						legend:
							"Az ${toolbarFocus} ikonra kattintva az eszköztárra ugorhat. " +
							"A TAB és SHIFT-TAB billentyűkkel ugorhat a következő és előző eszköztár csoportra. " +
							"A JOBBRA NYÍL és BALRA NYÍL billentyűkkel ugorhat a következő és előző eszköztár gombra. " +
							"A SZÓKÖZ vagy ENTER megnyomásával aktiválja az eszköztár gombját."
					},

					{
						name : "Szerkesztő párbeszédpanel",
						legend :
							"A párbeszédpanelen belül nyomja meg a TAB billentyűt a következő párbeszédezőre ugráshoz, az előző mezőre ugráshoz használja a SHIFT + TAB billentyűkombinációt, a párbeszéd elküldéséhez az ENTER billentyűt, a párbeszéd megszakításához pedig az ESC billentyűt. " +
							"A többlapos párbeszédpanelek esetén az ALT + F10 billentyűkombinációval navigálhat a lapok listájára. " +
							"Ezután a TAB vagy JOBBRA NYÍL gombokkal válthat a következő lapra. " +
							"Ugrás az előző lapra a SHIFT + TAB vagy a BALRA NYÍL gombbal. " +
							"A lap kiválasztásához nyomja meg a SZÓKÖZ vagy ENTER billentyűt."
					},

					{
						name : "Szerkesztő előugró menüje",
						legend :
							"A helyi menü megnyitásához nyomja meg a ${contextMenu} vagy az ALKALMAZÁS GOMBOT. " +
							"Ezután ugorjon a következő menüpontra a TAB vagy a LEFELÉ NYÍL segítségével. " +
							"Ugorjon az előző pontra a SHIFT+TAB vagy FELFELÉ NYÍL segítségével. " +
							"A menüpont kiválasztásához nyomja meg a SZÓKÖZ vagy ENTER billentyűt. " +
							"A SZÓKÖZ, ENTER vagy JOBBRA NYÍL segítségével nyissa meg az aktuális menüpont almenüjét. " +
							"Az ESC vagy BALRA NYÍL segítségével menjen vissza a szülő menüponthoz. " +
							"Az előugró menü az ESC billentyűvel zárható be."
					},

					{
						name : "Szerkesztő lista",
						legend :
							"A listán belül a következő elemre a TAB vagy a LEFELÉ MUTATÓ NYÍL billentyűvel léphet. " +
							"Az előző listaelemre a SHIFT + TAB vagy FELFELÉ NYÍL segítségével léphet. " +
							"A lista elemének kiválasztásához nyomja meg a SZÓKÖZ vagy ENTER billentyűt. " +
							"Az ESC billentyűvel zárja be a listát."
					},

					{
						name : "Szerkesztő elem elérési út sávja (ha elérhető*)",
						legend :
							"Az ${elementsPathFocus} ikonra kattintva ugorjon az elem elérési út sávjára. " +
							"Ugrás a következő elem gombra a TAB vagy JOBBRA NYÍL segítségével. " +
							"Ugrás az előző gombra a SHIFT+TAB vagy BALRA NYÍL segítségével. " +
							"A SZÓKÖZ vagy ENTER billentyű megnyomásával válassza ki az elemet a szerkesztőben."
					}
				]
			},
			{
				name : "Parancsok",
				items :
				[
					{
						name : " Visszavonás parancs",
						legend : "Kattintson a ${undo} gombra"
					},
					{
						name : " Újra parancs",
						legend : "Kattintson az ${redo} gombra"
					},
					{
						name : " Félkövér parancs",
						legend : "Kattintson a ${bold} gombra"
					},
					{
						name : " Dőlt parancs",
						legend : "Kattintson a ${italic} gombra"
					},
					{
						name : " Aláhúzás parancs",
						legend : "Kattintson az ${underline} gombra"
					},
					{
						name : " Hivatkozás parancs",
						legend : "Kattintson a ${link} gombra"
					},
					{
						name : " Eszköztár összehúzása parancs (ha elérhető*)",
						legend : "Kattintson az ${toolbarCollapse} gombra"
					},
					{
						name : " Kisegítő lehetőségek súgója",
						legend : "Kattintson a ${a11yHelp} gombra"
					}
				]
			},

			{	//added by ibm
				name : "Megjegyzés",
				items :
				[
					{
						name : "",
						legend : "* Néhány funkciót letilthat az adminisztrátor."
					}
				]
			}
		]
	},

	ibm_a11yhelp :
	{
		helpLinkDescription : "További súgó témakörök megnyitása új ablakban",
		helpLink : "További súgó témakörök"
	}

});
