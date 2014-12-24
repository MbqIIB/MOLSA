﻿/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.plugins.setLang( "a11yhelp", "da",
{

	// When translating all fields in accessibilityHelp object, do not translate anything with the form ${xxx}
	accessibilityHelp :
	{
		title : "Hjælp",
		contents : "Hjælpeindhold. Tryk på Esc for at lukke dialogboksen.",
		legend :
		[
			{
				name : "Instruktioner vedr. handicapvenlighed",
				items :
				[
					{
						name : "Editor - værktøjslinje",
						legend:
							"Tryk på ${toolbarFocus} for at navigere til værktøjslinjen. " +
							"Flyt til næste og forrige værktøjslinjegruppe ved at trykke på tabulatortasten og Skift+tabulatortast. " +
							"Flyt til næste og forrige værktøjslinjeknap ved at trykke på Højre pil eller Venstre pil. " +
							"Tryk på mellemrumstasten eller Enter for at aktivere værktøjslinjeknappen."
					},

					{
						name : "Editor - Dialog",
						legend :
							"Inde i en dialogboks kan du trykke på tabulatortasten for at navigere til næste felt. Tryk på Skift+tabulatortast for at flytte til forrige felt. Tryk på Enter for at sende indholdet af dialogboksen. Tryk på Esc for at annullere dialogboksen. " +
							"I dialogbokse med flere faner kan du trykke på Alt+F10 for at navigere til listen med faner. " +
							"Flyt derefter til næste fane med tabulatortasten eller højre piltast. " +
							"Flyt til den forrige fane med Skift+tabulatortast eller venstre piltast. " +
							"Tryk på mellemrumtasten eller Enter for at vælge fanesiden."
					},

					{
						name : "Editor - Kontekstmenu",
						legend :
							"Tryk på ${contextMenu} eller programtasten for at åbne kontekstmenuen. " +
							"Flyt derefter til næste menupunkt med tabulatortasten eller pil ned. " +
							"Flyt til forrige menupunkt med Skift+tabulatortast eller pil op. " +
							"ryk på mellemrumstasten eller Enter for at vælge menupunktet. " +
							"Åbn undermenuen for det aktuelle menupunkt med mellemrumstasten eller Enter eller højre piltast. " +
							"Gå tilbage til det overordnede menupunkt med Esc eller venstre piltast. " +
							"Luk kontekstmenuen ved at trykke på Esc."
					},

					{
						name : "Editor - Liste",
						legend :
							"I en liste flytter du til næste punkt på listen med tabulatortasten eller pil ned. " +
							"Flyt til forrige punkt på listen med Skift+tabulatortast eller pil op. " +
							"Tryk på mellemrumstasten eller Enter for at vælge punktet på listen. " +
							"Tryk på Esc for at lukke listen."
					},

					{
						name : "Editor - Elementstilinje (hvis tilgængelig*)",
						legend :
							"Tryk på ${elementsPathFocus} for at navigere til elementstilinjen. " +
							"Flyt til næste elementknap med tabulatortasten eller højre piltast. " +
							"Flyt til forrige knap med Skift+tabulatortast eller venstre piltast. " +
							"Tryk på mellemrumstasten eller Enter for at vælge elementet i editoren."
					}
				]
			},
			{
				name : "Kommandoer",
				items :
				[
					{
						name : " Fortryd-kommando",
						legend : "Tryk på ${undo}"
					},
					{
						name : " Gentag-kommando",
						legend : "Tryk på ${redo}"
					},
					{
						name : " Fed-kommando",
						legend : "Tryk på ${bold}"
					},
					{
						name : " Kursiv-kommando",
						legend : "Tryk på ${italic}"
					},
					{
						name : " Understreget-kommando",
						legend : "Tryk på ${underline}"
					},
					{
						name : " Link-kommando",
						legend : "Tryk på ${link}"
					},
					{
						name : "Skjul værktøjslinje-kommando (hvis tilgængelig*)",
						legend : "Tryk på ${toolbarCollapse}"
					},
					{
						name : " Hjælp til handicapvenlighed",
						legend : "Tryk på ${a11yHelp}"
					}
				]
			},

			{	//added by ibm
				name : "Bemærk",
				items :
				[
					{
						name : "",
						legend : "* Visse funktioner kan være deaktiveret af administratoren."
					}
				]
			}
		]
	},

	ibm_a11yhelp :
	{
		helpLinkDescription : "Åbn flere hjælpeemner i et nyt vindue",
		helpLink : "Flere emner i hjælp"
	}

});
