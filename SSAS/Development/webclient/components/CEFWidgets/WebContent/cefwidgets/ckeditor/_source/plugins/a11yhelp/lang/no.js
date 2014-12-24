/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.plugins.setLang( "a11yhelp", "no",
{

	// When translating all fields in accessibilityHelp object, do not translate anything with the form ${xxx}
	accessibilityHelp :
	{
		title : "Hjelp",
		contents : "Innhold i hjelpen. Du lukker denne dialogboksen ved å trykke på ESC.",
		legend :
		[
			{
				name : "Instruksjoner for tilgjengelighet",
				items :
				[
					{
						name : "Verktøylinje for redigering",
						legend:
							"Trykk på ${toolbarFocus} for å gå til verktøylinjen. " +
							"Gå til neste eller forrige verktøylinjegruppe med TAB og SKIFT-TAB. " +
							"Gå til neste eller forrige verktøylinjeknapp med HØYREPIL eller VENSTREPIL. " +
							"Trykk på MELLOMROMSTASTEN eller ENTER for å aktivere verktøylinjeknappen."
					},

					{
						name : "Dialogboks i redigeringsprogram",
						legend :
							"Trykk på TAB for å navigere til neste felt i en dialogboks, trykk på SKIFT + TAB for å gå til forrige felt, trykk på ENTER for å sende innholdet i dialogboksen, og trykk på ESC for å lukke dialogboksen. " +
							"For dialogbokser med flere kategorisider trykker du på ALT + F10 for å navigere til kategorilisten. " +
							"Gå deretter til neste kategori med TAB eller HØYREPIL. " +
							"Gå til forrige kategori med SKIFT + TAB eller VENSTREPIL. " +
							"Trykk på MELLOMROMSTASTEN eller ENTER for å velge kategorisiden."
					},

					{
						name : "Hurtigmeny i redigeringsprogram",
						legend :
							"Trykk på ${contextMenu} eller APPLIKASJONSTASTEN for å åpne hurtigmenyen. " +
							"Gå deretter til det neste menyalternativet med TAB eller PIL NED. " +
							"Gå til forrige alternativ med SKIFT+TAB eller PIL OPP. " +
							"Trykk på MELLOMROMSTASTEN eller ENTER for å velge menyalternativet. " +
							"Åpne undermenyen for det gjeldende alternativet med MELLOMROMSTASTEN, ENTER eller HØYREPIL. " +
							"Gå tilbake til det overordnede menypunktet med ESC eller VENSTREPIL. " +
							"Lukk hurtigmenyen med ESC."
					},

					{
						name : "Listeboks i redigeringsprogram",
						legend :
							"I en listeboks går du til neste listepunkt med TAB eller PIL NED. " +
							"Gå til forrige listepunkt med SKIFT + TAB eller PIL OPP. " +
							"Trykk på MELLOMROMSTASTEN eller ENTER for å velge listepunktet. " +
							"Trykk på ESC for å lukke listeboksen."
					},

					{
						name : "Elementbanelinje i redigeringsprogram (hvis tilgjengelig*)",
						legend :
							"Trykk på ${elementsPathFocus} for å gå til elementbanelinjen. " +
							"Gå til neste elementknapp med TAB eller HØYREPIL. " +
							"Gå til forrige knapp med SKIFT+TAB eller VENSTREPIL. " +
							"Trykk på MELLOMROMSTASTEN eller ENTER for å velge elementet i redigeringsprogrammet."
					}
				]
			},
			{
				name : "Kommandoer",
				items :
				[
					{
						name : " Angre",
						legend : "Trykk på ${undo}"
					},
					{
						name : " Gjør om",
						legend : "Trykk på ${redo}"
					},
					{
						name : " Fet",
						legend : "Trykk på ${bold}"
					},
					{
						name : " Kursiv",
						legend : "Trykk på ${italic}"
					},
					{
						name : " Understreking",
						legend : "Trykk på ${underline}"
					},
					{
						name : " Link",
						legend : "Trykk på ${link}"
					},
					{
						name : " Komprimer verktøylinje-kommando (hvis tilgjengelig*)",
						legend : "Trykk på ${toolbarCollapse}"
					},
					{
						name : " Hjelp til Tilgjengelighet",
						legend : "Trykk på ${a11yHelp}"
					}
				]
			},

			{	//added by ibm
				name : "Merknad",
				items :
				[
					{
						name : "",
						legend : "* Noen funksjoner kan være deaktivert av administratoren."
					}
				]
			}
		]
	},

	ibm_a11yhelp :
	{
		helpLinkDescription : "Åpne flere hjelpeemner i et nytt vindu",
		helpLink : "Flere hjelpeemner"
	}

});
