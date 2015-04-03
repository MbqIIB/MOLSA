/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.plugins.setLang( "a11yhelp", "it",
{

	// When translating all fields in accessibilityHelp object, do not translate anything with the form ${xxx}
	accessibilityHelp :
	{
		title : "Guida",
		contents : "Contenuti di guida. Premere ESC per chiudere questa finestra di dialogo.",
		legend :
		[
			{
				name : "Istruzioni di accessibilità",
				items :
				[
					{
						name : "Barra degli strumenti dell'editor",
						legend:
							"Premere ${toolbarFocus} per spostarsi nella barra degli strumenti. " +
							"Passare al gruppo successivo o precedente della barra degli strumenti con il tasto TAB e la combinazione di tasti MAIUSC-TAB. " +
							"Passare al pulsante successivo o precedente della barra degli strumenti con il tasto FRECCIA DESTRA o FRECCIA SINISTRA. " +
							"Premere SPAZIO o INVIO per attivare il pulsante della barra degli strumenti."
					},

					{
						name : "Finestra di dialogo dell'editor",
						legend :
							"All'interno di una finestra di dialogo, premere il tasto di tabulazione per spostarsi sul campo successivo della finestra di dialogo, premere Maiusc+ tasto di tabulazione per spostarsi sul campo precedente, premere Invio per inoltrare la finestra di dialogo, premere Esc per chiuderla. " +
							"Per le finestre di dialogo contenenti più pagine di schede, premere ALT+F10 per passare all'elenco di schede. " +
							"Passare, quindi, alla scheda successiva con TAB o FRECCIA DESTRA. " +
							"Passare alla scheda precedente con MAIUSC+TAB o FRECCIA SINISTRA. " +
							"Premere SPAZIO o INVIO per selezionare la pagina della scheda."
					},

					{
						name : "Menu di scelta rapida dell'editor",
						legend :
							"Premere ${contextMenu} o il TASTO APPLICAZIONE per aprire il menu di scelta rapida. " +
							"Passare, quindi, all'opzione successiva del menu con TAB o FRECCIA GIÙ. " +
							"Passare all'opzione precedente con MAIUSC+TAB o FRECCIA SU. " +
							"Premere SPAZIO o INVIO per selezionare l'opzione del menu. " +
							"Aprire il sottomenu dell'opzione corrente con SPAZIO o INVIO o FRECCIA DESTRA. " +
							"Tornare alla voce dei menu con ESC o FRECCIA SINISTRA. " +
							"Chiudere il menu di scelta rapida con Esc."
					},

					{
						name : "Casella di elenco dell'editor",
						legend :
							"All'interno di una casella di elenco, passare alla voce successiva dell'elenco con TAB o FRECCIA GIÙ. " +
							"Passare alla voce precedente dell'elenco con MAIUSC+TAB o FRECCIA SU. " +
							"Premere SPAZIO o INVIO per selezionare l'opzione dell'elenco. " +
							"Premere ESC per chiudere la casella di elenco."
					},

					{
						name : "Barra dei percorsi degli elementi dell'editor (se disponibile*)",
						legend :
							"Premere ${elementsPathFocus} per passare alla barra dei percorsi degli elementi. " +
							"Passare al pulsante dell'elemento successivo con TAB o FRECCIA DESTRA. " +
							"Passare al pulsante precedente con MAIUSC+TAB o FRECCIA SINISTRA. " +
							"Premere SPAZIO o INVIO per selezionare l'elemento nell'editor."
					}
				]
			},
			{
				name : "Comandi",
				items :
				[
					{
						name : " Comando Annulla",
						legend : "Premere ${undo}"
					},
					{
						name : " Comando Riesegui",
						legend : "Premere ${redo}"
					},
					{
						name : " Comando Grassetto",
						legend : "Premere ${bold}"
					},
					{
						name : " Comando Corsivo",
						legend : "Premere ${italic}"
					},
					{
						name : " Comando Sottolinea",
						legend : "Premere ${underline}"
					},
					{
						name : " Comando Collegamento",
						legend : "Premere ${link}"
					},
					{
						name : " Comando Comprimi della barra degli strumenti (se disponibile*)",
						legend : "Premere ${toolbarCollapse}"
					},
					{
						name : " Guida all'accessibilità",
						legend : "Premere ${a11yHelp}"
					}
				]
			},

			{	//added by ibm
				name : "Nota",
				items :
				[
					{
						name : "",
						legend : "* Alcune funzioni possono essere disabilitate dall'amministratore."
					}
				]
			}
		]
	},

	ibm_a11yhelp :
	{
		helpLinkDescription : "Apri più argomenti della guida in una nuova finestra ",
		helpLink : "Altri argomenti della guida "
	}

});
