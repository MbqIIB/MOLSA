﻿/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.plugins.setLang( "a11yhelp", "nl",
{

	// When translating all fields in accessibilityHelp object, do not translate anything with the form ${xxx}
	accessibilityHelp :
	{
		title : "Help",
		contents : "Inhoudsopgave Help. Druk op Esc om dit venster te sluiten.",
		legend :
		[
			{
				name : "Toegankelijkheidsinstructies",
				items :
				[
					{
						name : "Werkbalk van editor",
						legend:
							"Druk op ${toolbarFocus} om naar de werkbalk te gaan. " +
							"Ga naar de volgende of vorige werkbalkgroep met de toets(en) TAB of SHIFT-TAB. " +
							"Ga naar de volgende of vorige werkbalkknop met de pijl naar rechts of links. " +
							"Druk op de spatiebalk of op Enter om de werkbalkknop te activeren.button."
					},

					{
						name : "Editorvenster",
						legend :
							"In een venster drukt u op de tabtoets om naar het volgende dialoogveld te gaan. Druk op Shift+Tab om naar het vorige veld te gaan. Druk op Enter om de venstergegevens vast te leggen en druk op Esc om het venster te annuleren. " +
							"In vensters met meerdere tabbladen, drukt u op Alt+F10 om naar de rij tabbladen te gaan. " +
							"Ga naar het volgende tabblad met de tabtoets of de pijl naar rechts. " +
							"Ga naar het voorgaande tabblad met Shift + Tab of de pijl naar links. " +
							"Druk op de spatiebalk of op Enter om de tabbladpagina te selecteren."
					},

					{
						name : "Contextmenu in editor",
						legend :
							"Druk op ${contextMenu} of op de toepassingssleutel om het contextmenu te openen. " +
							"Ga vervolgens naar de volgende menuoptie met de tabtoets of de pijl omlaag. " +
							"Ga naar een voorgaande optie met Shift+Tab of de pijl omhoog. " +
							"Druk op de spatiebalk of op Enter om de menuoptie te selecteren. " +
							"Open het submenu van de huidige optie met de spatietoets, de Enter-toets of de pijl naar rechts. " +
							"Ga terug naar de bovenliggende menuoptie met Esc of de pijl naar links. " +
							"Sluit het contextmenu met Esc."
					},

					{
						name : "Keuzelijst in editor",
						legend :
							"In een keuzelijst gaat u naar het volgende item in de lijst met de tabtoets of de pijl omlaag. " +
							"Ga naar het voorgaande lijstitem met Shift + Tab of de pijl omhoog. " +
							"Druk op de spatiebalk of op Enter om de lijstoptie te selecteren. " +
							"Druk op ESC om de keuzelijst te sluiten."
					},

					{
						name : "Balk voor elementenpad in editor (indien beschikbaar*)",
						legend :
							"Druk op ${elementsPathFocus} om naar de balk voor het elementenpad te gaan. " +
							"Ga naar de knop voor het volgende element met de tabtoets of de pijl naar rechts. " +
							"Ga naar de voorgaande knop met Shift+Tab of de pijl naar links. " +
							"Druk op de spatiebalk of op Enter om het element in de editor te selecteren."
					}
				]
			},
			{
				name : "Opdrachten",
				items :
				[
					{
						name : " Opdracht ongedaan maken",
						legend : "Druk op ${undo}"
					},
					{
						name : " Opdracht opnieuw uitvoeren",
						legend : "Druk op ${redo}"
					},
					{
						name : " Opdracht vet weergeven",
						legend : "Druk op ${bold}"
					},
					{
						name : " Opdracht cursief weergeven",
						legend : "Druk op ${italic}"
					},
					{
						name : " Opdracht onderstrepen",
						legend : "Druk op ${underline}"
					},
					{
						name : " Koppelingsopdracht",
						legend : "Druk op ${link}"
					},
					{
						name : " Opdracht Werkbalk samenvouwen (indien beschikbaar*)",
						legend : "Druk op ${toolbarCollapse}"
					},
					{
						name : " Help bij toegankelijkheid",
						legend : "Druk op ${a11yHelp}"
					}
				]
			},

			{	//added by ibm
				name : "Opmerking",
				items :
				[
					{
						name : "",
						legend : "* Sommige functies kunnen zijn uitgeschakeld door de beheerder."
					}
				]
			}
		]
	},

	ibm_a11yhelp :
	{
		helpLinkDescription : "Meer Help-onderwerpen openen in een nieuw venster",
		helpLink : "Meer Help-onderwerpen"
	}

});
