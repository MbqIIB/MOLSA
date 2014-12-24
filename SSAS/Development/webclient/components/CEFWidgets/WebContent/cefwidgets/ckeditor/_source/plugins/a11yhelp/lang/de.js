/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.plugins.setLang( "a11yhelp", "de",
{

	// When translating all fields in accessibilityHelp object, do not translate anything with the form ${xxx}
	accessibilityHelp :
	{
		title : "Hilfe",
		contents : "Hilfeverzeichnis. Drücken Sie die Taste 'Esc', um dieses Dialogfenster zu schließen.",
		legend :
		[
			{
				name : "Anweisungen zu Eingabehilfen",
				items :
				[
					{
						name : "Editor-Symbolleiste",
						legend:
							"Drücken Sie ${toolbarFocus}, um zur Symbolleiste zu navigieren. " +
							"Mit TAB und UMSCHALT-TAB gelangen Sie zur nächsten bzw. vorherigen Symbolleistengruppe. " +
							"Mit RECHTSPFEIL oder LINKSPFEIL gelangen Sie zur nächsten bzw. vorherigen Symbolleistenschaltfläche. " +
							"Mit LEERTASTE oder EINGABETASTE aktivieren Sie die Symbolleistenschaltfläche. "
					},

					{
						name : "Editor-Dialogfenster",
						legend :
							"Drücken Sie in einem Dialogfenster die Tabulatortaste, um zum nächsten Feld im Dialogfenster zu navigieren. Drücken Sie die Tastenkombination Umschalttaste+Tabulatortaste, um zum vorherigen Feld zu navigieren. Drücken Sie die Eingabetaste, um die Eingaben im Dialogfenster zu senden. Drücken Sie die Taste 'Esc', um das Dialogfenster zu schließen. " +
							"Bei Dialogfenstern mit mehreren Registerkarten können Sie die Tastenkombination ALT+F10 drücken, um zur Registerkartenliste zu navigieren. " +
							"Mit TAB oder RECHTSPFEIL gelangen Sie zur nächsten Registerkarte. " +
							"Mit UMSCHALT+TAB oder LINKSPFEIL gelangen Sie zur vorherigen Registerkarte. " +
							"Mit LEERTASTE oder EINGABETASTE wählen Sie die Registerkartenseite aus. "
					},

					{
						name : "Editor-Kontextmenü",
						legend :
							"Drücken Sie ${contextMenu} oder die ANWENDUNGSTASTE, um das Kontextmenü zu öffnen. " +
							"Mit TAB oder ABWÄRTSPFEIL gelangen Sie zur nächsten Menüoption. " +
							"Mit UMSCHALT+TAB oder AUFWÄRTSPFEIL gelangen Sie zur vorherigen Option. " +
							"Mit LEERTASTE oder EINGABETASTE wählen Sie eine Menüoption aus. " +
							"Mit LEERTASTE, EINGABETASTE oder RECHTSPFEIL öffnen Sie das Untermenü der aktuellen Option. " +
							"Mit ESC oder LINKSPFEIL kehren Sie zur übergeordneten Menüoption zurück. " +
							"Schließen Sie das Kontextmenü mit der Taste 'Esc'."
					},

					{
						name : "Editor-Listenfeld",
						legend :
							"In einem Listenfeld können Sie mit TAB oder ABWÄRTSPFEIL zur nächsten Listenoption wechseln. " +
							"Mit UMSCHALT+TAB oder AUFWÄRTSPFEIL gelangen Sie zur vorherigen Listenoption. " +
							"Mit LEERTASTE oder EINGABETASTE wählen Sie die Listenoption aus. " +
							"Mit ESC schließen Sie das Listenfeld. "
					},

					{
						name : "Editor-Elementpfadleiste (falls verfügbar*)",
						legend :
							"Drücken Sie ${elementsPathFocus}, um zur Elementpfadleiste zu navigieren. " +
							"Mit TAB oder RECHTSPFEIL gelangen Sie zur nächsten Elementschaltfläche. " +
							"Mit UMSCHALT+TAB oder LINKSPFEIL gelangen Sie zur vorherigen Schaltfläche. " +
							"Mit LEERTASTE oder EINGABETASTE wählen Sie das Element im Editor aus. "
					}
				]
			},
			{
				name : "Befehle",
				items :
				[
					{
						name : " Befehl 'Rückgängig machen'",
						legend : "${undo} drücken"
					},
					{
						name : " Befehl 'Wiederholen'",
						legend : "${redo} drücken"
					},
					{
						name : " Befehl 'Fett'",
						legend : "${bold} drücken"
					},
					{
						name : " Befehl 'Kursiv'",
						legend : "${italic} drücken"
					},
					{
						name : " Befehl 'Unterstreichen'",
						legend : "${underline} drücken"
					},
					{
						name : " Befehl 'Link'",
						legend : "${link} drücken"
					},
					{
						name : " Befehl 'Symbolleiste ausblenden' (falls verfügbar*)",
						legend : "${toolbarCollapse} drücken"
					},
					{
						name : " Hilfe zu Eingabehilfen",
						legend : "${a11yHelp} drücken"
					}
				]
			},

			{	//added by ibm
				name : "Hinweis",
				items :
				[
					{
						name : "",
						legend : "* Einige Funktionen wurden möglicherweise vom Administrator inaktiviert. "
					}
				]
			}
		]
	},

	ibm_a11yhelp :
	{
		helpLinkDescription : "Weitere Hilfethemen in einem neuen Fenster öffnen",
		helpLink : "Weitere Hilfethemen"
	}

});
