﻿/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.plugins.setLang( "a11yhelp", "pl",
{

	// When translating all fields in accessibilityHelp object, do not translate anything with the form ${xxx}
	accessibilityHelp :
	{
		title : "Pomoc",
		contents : "Spis treści pomocy. Aby zamknąć to okno dialogowe, naciśnij klawisz ESC.",
		legend :
		[
			{
				name : "Instrukcje dotyczące ułatwień dostępu",
				items :
				[
					{
						name : "Pasek narzędzi edytora",
						legend:
							"Naciśnij klawisz ${toolbarFocus}, aby przejść do paska narzędzi. " +
							"Za pomocą klawiszy Tab lub Shift+Tab można przechodzić do następnej lub poprzedniej grupy paska narzędzi. " +
							"Za pomocą klawiszy strzałki w prawo lub strzałki w lewo można przechodzić do następnego lub poprzedniego przycisku paska narzędzi. " +
							"Aby aktywować przycisk paska narzędzi, naciśnij klawisz spacji lub klawisz Enter."
					},

					{
						name : "Okno dialogowe edytora",
						legend :
							"Aby w oknie dialogowym przejść do następnego pola, należy nacisnąć klawisz TAB. W celu przejścia do poprzedniego pola należy nacisnąć klawisze SHIFT+TAB. Aby wysłać dane z okna dialogowego, należy nacisnąć klawisz ENTER. Aby anulować zmiany wprowadzone w oknie dialogowym, należy nacisnąć klawisz ESC. " +
							"Aby przejść do listy kart w przypadku okien dialogowych z wieloma kartami, naciśnij kombinację klawiszy Alt+F10. " +
							"W celu przejścia do następnej karty naciśnij klawisz Tab lub klawisz strzałki w prawo. " +
							"W celu przejścia do poprzedniej karty naciśnij kombinację klawiszy Shift+Tab lub klawisz strzałki w lewo. " +
							"Aby wybrać kartę, naciśnij klawisz spacji lub klawisz Enter."
					},

					{
						name : "Menu kontekstowe edytora",
						legend :
							"Aby otworzyć menu kontekstowe, naciśnij klawisz ${contextMenu} lub klawisz aplikacji. " +
							"W celu przejścia do następnej opcji menu naciśnij klawisz Tab lub klawisz strzałki w dół. " +
							"W celu przejścia do poprzedniej opcji naciśnij kombinację klawiszy Shift+Tab lub klawisz strzałki w górę. " +
							"Aby wybrać opcję menu, naciśnij klawisz spacji lub klawisz Enter. " +
							"W celu otwarcia podmenu bieżącej opcji naciśnij klawisz spacji, klawisz Enter lub klawisz strzałki w prawo. " +
							"Aby powrócić do nadrzędnego elementu menu, naciśnij klawisz Esc lub klawisz strzałki w lewo. " +
							"Aby zamknąć menu kontekstowe, należy nacisnąć klawisz ESC."
					},

					{
						name : "Pole listy edytora",
						legend :
							"Aby wewnątrz pola listy przejść do następnej pozycji listy, naciśnij klawisz Tab lub klawisz strzałki w dół. " +
							"Aby przejść do poprzedniej pozycji listy, naciśnij kombinację klawiszy Shift+Tab lub klawisz strzałki w górę. " +
							"W celu wybrania opcji listy naciśnij klawisz spacji lub klawisz Enter. " +
							"Aby zamknąć pole listy, naciśnij klawisz Esc."
					},

					{
						name : "Pasek ścieżki elementów edytora (jeśli jest dostępny*)",
						legend :
							"Aby przejść do paska ścieżki elementów, naciśnij klawisz ${elementsPathFocus}. " +
							"W celu przejścia do następnego przycisku elementu naciśnij klawisz Tab lub klawisz strzałki w prawo. " +
							"W celu przejścia do poprzedniego przycisku naciśnij kombinację klawiszy Shift+Tab lub klawisz strzałki w lewo. " +
							"Aby wybrać element w edytorze, naciśnij klawisz spacji lub klawisz Enter."
					}
				]
			},
			{
				name : "Komendy",
				items :
				[
					{
						name : " Komenda Cofnij",
						legend : "Naciśnij przycisk ${undo}."
					},
					{
						name : " Komenda Ponów",
						legend : "Naciśnij przycisk ${redo}."
					},
					{
						name : " Komenda Pogrubienie",
						legend : "Naciśnij przycisk ${bold}."
					},
					{
						name : " Komenda Kursywa",
						legend : "Naciśnij przycisk ${italic}."
					},
					{
						name : " Komenda Podkreślenie",
						legend : "Naciśnij przycisk ${underline}."
					},
					{
						name : " Komenda Odsyłacz",
						legend : "Naciśnij przycisk ${link}."
					},
					{
						name : " Komenda Zwiń pasek narzędzi (jeśli jest dostępna*)",
						legend : "Naciśnij przycisk ${toolbarCollapse}."
					},
					{
						name : " Pomoc dotycząca ułatwień dostępu",
						legend : "Naciśnij przycisk ${a11yHelp}."
					}
				]
			},

			{	//added by ibm
				name : "Uwaga",
				items :
				[
					{
						name : "",
						legend : "* Niektóre funkcje mogą zostać wyłączone przez administratora."
					}
				]
			}
		]
	},

	ibm_a11yhelp :
	{
		helpLinkDescription : "Otwórz więcej tematów pomocy w nowym oknie",
		helpLink : "Więcej tematów pomocy"
	}

});
