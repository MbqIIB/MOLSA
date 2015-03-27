/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.plugins.setLang( "a11yhelp", "sv",
{

	// When translating all fields in accessibilityHelp object, do not translate anything with the form ${xxx}
	accessibilityHelp :
	{
		title : "Hjälp",
		contents : "Hjälpinnehåll. Om du vill stänga dialogrutan trycker du på ESC.",
		legend :
		[
			{
				name : "Instruktioner för hjälpmedelsfunktioner",
				items :
				[
					{
						name : "Verktygsfältet i redigeraren",
						legend:
							"Om du vill gå till verktygsfältet trycker du på ${toolbarFocus}. " +
							"Om du vill gå till nästa eller föregående verktygsfältsgrupp trycker du på Tabb respektive Skift+Tabb. " +
							"Om du vill gå till nästa eller föregående verktygsfältsknapp trycker du på Högerpil respektive Vänsterpil. " +
							"Om du vill aktivera verktygsfältsknappen trycker du på Blanksteg eller Enter."
					},

					{
						name : "Dialogrutor i redigeraren",
						legend :
							"Om du vill gå till nästa fält i en dialogruta trycker du på Tabb. Om du vill gå till föregående fält trycker du på Skift+Tabb. Om du vill acceptera inställningarna och stänga dialogrutan trycker du på Enter. Om du vill stänga dialogrutan trycker du på Esc. " +
							"Om du vill förflytta dig till fliklistan i en dialogruta med flera fliksidor trycker du på Alt+F10. " +
							"Om du vill gå till nästa flik trycker du på Tabb eller Högerpil. " +
							"Om du vill gå till föregående flik trycker du på Skift+Tabb eller Vänsterpil. " +
							"Om du vill välja fliksidan trycker du på Blanksteg eller Enter."
					},

					{
						name : "Snabbmenyn i redigeraren",
						legend :
							"Om du vill visa snabbmenyn trycker du på ${contextMenu} eller programtangenten. " +
							"Om du vill gå till nästa menyalternativ trycker du på Tabb eller Nedåtpil. " +
							"Om du vill gå till föregående menyalternativ trycker du på Skift+Tabb eller Uppåtpil. " +
							"Om du vill välja menyalternativet trycker du på Blanksteg eller Enter. " +
							"Om du vill öppna en undermeny till det aktuella menyalternativet trycker du på Blanksteg, Enter eller Högerpil. " +
							"Om du vill gå tillbaka till den överordnade menyn trycker du på Esc eller Vänsterpil. " +
							"Om du vill stänga snabbmenyn trycker du på ESC."
					},

					{
						name : "Listrutor i redigeraren",
						legend :
							"Om du vill gå till nästa alternativ i en listruta trycker du på Tabb eller Nedåtpil. " +
							"Om du vill gå till föregående alternativ trycker du på Skift+Tabb eller Uppåtpil. " +
							"Om du vill välja alternativet trycker du på Blanksteg eller Enter. " +
							"Om du vill stänga listrutan trycker du på Esc."
					},

					{
						name : "Fältet för sökvägselement i redigeraren (om tillgängligt*)",
						legend :
							"Om du vill gå till fältet för sökvägselement trycker du på ${elementsPathFocus}. " +
							"Om du vill gå till nästa elementknapp trycker du på Tabb eller Högerpil. " +
							"Om du vill gå till föregående elementknapp trycker du på Skift+Tabb eller Vänsterpil. " +
							"Om du vill välja elementet i redigeraren trycker du på Blanksteg eller Enter."
					}
				]
			},
			{
				name : "Kommandon",
				items :
				[
					{
						name : " Ångra",
						legend : "Tryck på ${undo}"
					},
					{
						name : " Gör om",
						legend : "Tryck på ${redo}"
					},
					{
						name : " Fetstil",
						legend : "Tryck på ${bold}"
					},
					{
						name : " Kursiv stil",
						legend : "Tryck på ${italic}"
					},
					{
						name : " Understrykning",
						legend : "Tryck på ${underline}"
					},
					{
						name : " Länk",
						legend : "Tryck på ${link}"
					},
					{
						name : " Komprimera verktygsfältet (om tillgängligt*)",
						legend : "Tryck på ${toolbarCollapse}"
					},
					{
						name : " Hjälp för hjälpmedelsfunktioner",
						legend : "Tryck på ${a11yHelp}"
					}
				]
			},

			{	//added by ibm
				name : "Obs!",
				items :
				[
					{
						name : "",
						legend : "* Administratören kan ha avaktiverat vissa funktioner."
					}
				]
			}
		]
	},

	ibm_a11yhelp :
	{
		helpLinkDescription : "Visa fler hjälpavsnitt i ett nytt fönster",
		helpLink : "Fler hjälpavsnitt"
	}

});
