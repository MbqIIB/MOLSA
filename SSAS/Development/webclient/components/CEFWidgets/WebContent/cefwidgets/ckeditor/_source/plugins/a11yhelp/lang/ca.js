﻿/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.plugins.setLang( "a11yhelp", "ca",
{

	// When translating all fields in accessibilityHelp object, do not translate anything with the form ${xxx}
	accessibilityHelp :
	{
		title : "Ajuda",
		contents : "Contingut de l\'ajuda. Pitgeu ESC per tancar aquest diàleg.",
		legend :
		[
			{
				name : "Instruccions d\'accessibilitat",
				items :
				[
					{
						name : "Barra d\'eines de l\'editor",
						legend:
							"Premeu ${toolbarFocus} per navegar per la barra d'eines. " +
							"Aneu al següent grup i a l'anterior de la barra d'eines amb TABULACIÓ i majúscules-TABULACIÓ. " +
							"Aneu al següent botó i a l'anterior de la barra d'eines amb FLETXA DRETA o la FLETXA ESQUERRA. " +
							"Premeu ESPAI o INTRO per activar el botó de la barra d'eines."
					},

					{
						name : "Diàleg de l\'editor",
						legend :
							"Dins un diàleg, premeu TABULACIÓ per anar al següent camp del diàleg, premeu MAJÚS + TABULACIÓ per anar al camp anterior, premeu INTRO per enviar el diàleg, premeu ESC per cancel·lar el diàleg. " +
							"Als diàlegs que tenen diverses pàgines amb pestanyes, premeu ALT + F10 per anar a la llista de pestanyes. " +
							"A continuació, aneu a la següent pestanya amb la tecla TABULACIÓ o la FLETXA DRETA. " +
							"passeu a la pestanya anterior amb MAJÚS+TABULADOR o la FLETXA ESQUERRA. " +
							"Premeu ESPAI o INTRO per seleccionar la pàgina de la pestanya."
					},

					{
						name : "Menú contextual de l\'editor",
						legend :
							"Premeu ${contextMenu} o CLAU D'APLICACIÓ per obrir el menú contextual. " +
							"A continuació, aneu a la següent opció de menú amb la tecla TABULACIÓ o FLETXA AVALL. " +
							"Mou a opció anterior amb les tecles MAJÚS+TABULADOR o FLETXA AMUNT. " +
							"Premeu ESPAI o INTRO per seleccionar l'opció de menú. " +
							"Obre un submenú de l'opció actual amb ESPAI o INTRO o FLETXA DRETA. " +
							"Torneu enrere a l'element del menú principal amb ESC o la FLETXA ESQUERRA. " +
							"Tanqueu el menú contextual amb ESC."
					},

					{
						name : "Quadre de llista de l\'editor",
						legend :
							"Dins un quadre de llista, passeu al següent ítem de la llista amb la tecla TABULACIÓ o FLETXA CAP AVALL. " +
							"Passeu a l'element de la llista anterior amb MAJÚS+TABULADOR o la FLETXA ESQUERRA. " +
							"Premeu ESPAI o INTRO per seleccionar l'opció de llista. " +
							"Premeu ESC per tancar el quadre de llista."
					},

					{
						name : "Barra de camí d'accés d'elements de l'editor (si està disponible*)",
						legend :
							"Premeu ${elementsPathFocus} per navegar a la barra de camí d'accés dels elements. " +
							"Passeu al següent botó d'element amb la tecla de tabulació o la FLETXA DRETA. " +
							"Passeu al botó anterior a amb MAJÚS+TABULADOR o FLETXA ESQUERRA. " +
							"Premeu ESPAI o INTRO per seleccionar l'element o a l'editor."
					}
				]
			},
			{
				name : "Ordres",
				items :
				[
					{
						name : " Desfés l\'ordre",
						legend : "Premeu ${undo}"
					},
					{
						name : " Refés l\'ordre",
						legend : "Premeu ${redo}"
					},
					{
						name : " Ordre de negreta",
						legend : "Premeu ${bold}"
					},
					{
						name : " Ordre de cursiva",
						legend : "Premeu ${italic}"
					},
					{
						name : " Ordre de subratllat",
						legend : "Premeu ${underline}"
					},
					{
						name : " Ordre d\'enllaç",
						legend : "Premeu ${link}"
					},
					{
						name : " Ordre per reduir la barra d'eines (si està disponible*)",
						legend : "Premeu ${toolbarCollapse}"
					},
					{
						name : " Ajuda d\'accessibilitat",
						legend : "Premeu ${a11yHelp}"
					}
				]
			},

			{	//added by ibm
				name : "Nota",
				items :
				[
					{
						name : "",
						legend : "* L'administrador pot haver inhabilitat algunes funcions."
					}
				]
			}
		]
	},

	ibm_a11yhelp :
	{
		helpLinkDescription : "Obra més temes de l'ajuda a una nova finestra",
		helpLink : "Més temes de l'ajuda"
	}

});