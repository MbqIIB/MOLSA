/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.plugins.setLang( "a11yhelp", "es",
{

	// When translating all fields in accessibilityHelp object, do not translate anything with the form ${xxx}
	accessibilityHelp :
	{
		title : "Ayuda",
		contents : "Contenidos de la Ayuda. Para cerrar el diálogo pulse ESC.",
		legend :
		[
			{
				name : "Instrucciones de accesibilidad",
				items :
				[
					{
						name : "Barra de herramientas del editor",
						legend:
							"Pulse ${toolbarFocus} para navegar a la barra de herramientas. " +
							"Para pasar al grupo de barra de herramientas siguiente y anterior, utilice TAB y MAYÚS+TAB. " +
							"Para pasar al botón de barra de herramientas siguiente y anterior, utilice FLECHA DERECHA y FLECHA IZQUIERDA. " +
							"Pulse ESPACIO o INTRO para activar el botón de la barra de herramientas."
					},

					{
						name : "Diálogo del editor",
						legend :
							"Dentro de un diálogo, pulse la tecla tabulador para ir al siguiente campo del diálogo, pulse la teclas Mayús+Tab para ir al campo anterior, pulse Intro para enviar el diálogo, pulse Esc para cancelar el diálogo. " +
							"Para diálogos que tengan varias páginas de pestañas, pulse ALT + F10 para navegar a la lista de pestañas. " +
							"A continuación, pase a la pestaña siguiente con TAB o FLECHA DERECHA. " +
							"Pase a la pestaña anterior con MAYÚS + TAB o FLECHA IZQUIERDA. " +
							"Pulse ESPACIO o INTRO para seleccionar la página de pestañas."
					},

					{
						name : "Menú de contexto del editor",
						legend :
							"Pulse ${contextMenu} o la TECLA DE APLICACIÓN para abrir el menú contextual. " +
							"A continuación, puede pasar a la siguiente opción de menú con TAB o FLECHA ABAJO. " +
							"Puede pasar a la opción anterior con MAYÚS+TAB o FLECHA ARRIBA. " +
							"Pulse ESPACIO o INTRO para seleccionar la opción de menú. " +
							"Abra el submenú de la opción actual con ESPACIO o INTRO o FLECHA DERECHA. " +
							"Vuelva al elemento de menú padre con ESC o FLECHA IZQUIERDA. " +
							"Cierre el menú de contexto con Esc."
					},

					{
						name : "Recuadro de lista del editor",
						legend :
							"Dentro de un recuadro de lista, pase al siguiente elemento de la lista con TAB o FLECHA ABAJO. " +
							"Pase al elemento de lista anterior con MAYÚS + TAB o FLECHA ARRIBA. " +
							"Pulse ESPACIO o INTRO para seleccionar la opción de lista. " +
							"Pulse ESC para cerrar el cuadro de lista."
					},

					{
						name : "Barra de vía de acceso de elementos del editor (si estuviera disponible)",
						legend :
							"Pulse ${elementsPathFocus} para navegar a la barra de vía de acceso de elementos. " +
							"Pase al siguiente botón de elemento con TAB o FLECHA DERECHA. " +
							"Pase al botón anterior con MAYÚS+TAB o FLECHA IZQUIERDA. " +
							"Pulse ESPACIO o INTRO para seleccionar el elemento en el editor."
					}
				]
			},
			{
				name : "Mandatos",
				items :
				[
					{
						name : " Mandato Deshacer",
						legend : "Pulse ${undo}"
					},
					{
						name : " Mandato Rehacer",
						legend : "Pulse ${redo}"
					},
					{
						name : " Mandato Negrita",
						legend : "Pulse ${bold}"
					},
					{
						name : " Mandato Cursiva",
						legend : "Pulse ${italic}"
					},
					{
						name : " Mandato Subrayado",
						legend : "Pulse ${underline}"
					},
					{
						name : " Mandato Enlazar",
						legend : "Pulse ${link}"
					},
					{
						name : " Mandato Contraer barra de herramientas (si estuviera disponible*)",
						legend : "Pulse ${toolbarCollapse}"
					},
					{
						name : " Ayuda para la accesibilidad",
						legend : "Pulse ${a11yHelp}"
					}
				]
			},

			{	//added by ibm
				name : "Nota",
				items :
				[
					{
						name : "",
						legend : "* El administrador podría haber inhabilitado algunas características."
					}
				]
			}
		]
	},

	ibm_a11yhelp :
	{
		helpLinkDescription : "Abrir más temas de ayuda en una ventana nueva",
		helpLink : "Más temas de ayuda"
	}

});
