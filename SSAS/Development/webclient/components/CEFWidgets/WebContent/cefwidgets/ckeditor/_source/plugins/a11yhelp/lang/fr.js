﻿/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.plugins.setLang( "a11yhelp", "fr",
{
	// When translating all fields in accessibilityHelp object, do not translate anything with the form ${xxx}
	accessibilityHelp :
	{
		title : "Aide",
		contents : "Table des matières. Pour fermer la boîte de dialogue, appuyez sur Echap.",
		legend :
		[
			{
				name : "Instructions relatives à l'accessibilité",
				items :
				[
					{
						name : "Barre d'outils de l'éditeur",
						legend:
							"Appuyez sur ${toolbarFocus} pour accéder à la barre d'outils. " +
							"Accédez au groupe de barre d'outils suivant et précédent avec TAB et MAJ-TAB. " +
							"Accédez au bouton de la barre d'outils suivant et précédent avec FLECHE DROITE ou FLECHE GAUCHE. " +
							"Appuyez sur BARRE D'ESPACEMENT ou ENTREE pour activer le bouton de la barre d'outils."
					},

					{
						name : "Boîte de dialogue de l'éditeur",
						legend :
							"Dans une boîte de dialogue, appuyez sur la touche TAB pour accéder à la zone suivante. Pour revenir à la zone précédente, appuyez sur MAJ + TAB. Pour soumettre la boîte de dialogue, appuyez sur ENTREE. Pour annuler la boîte de dialogue, appuyez sur ECHAP. " +
							"Pour les boîtes de dialogue contenant plusieurs pages d'onglet, appuyez sur ALT + F10 pour accéder à la liste d'onglets. " +
							"Passez ensuite à l'onglet suivant à l'aide de la touche TAB ou FLECHE DROITE. " +
							"Accédez à l'onglet précédent à l'aide des touches MAJ + TAB ou FLECHE GAUCHE. " +
							"Appuyez sur BARRE D'ESPACEMENT ou ENTREE pour sélectionner la page d'onglet."
					},

					{
						name : "Menu en incrustation de l'éditeur",
						legend :
							"Appuyez sur ${contextMenu} ou sur la TOUCHE APPLICATION pour ouvrir le menu contextuel. " +
							"Ensuite, passez à l'option de menu suivante à l'aide de la touche TAB ou FLECHE VERS LE BAS. " +
							"Accédez à l'option précédente à l'aide des touches MAJ+TAB ou FLECHE VERS LE HAUT. " +
							"Appuyez sur BARRE D'ESPACEMENT ou ENTREE pour sélectionner l'option de menu. " +
							"Ouvrez le sous-menu de l'option actuelle à l'aide de la BARRE D'ESPACEMENT, de la touche ENTREE ou de la FLECHE DROITE. " +
							"Pour revenir à l'élément de menu parent, appuyez sur la touche ECHAP ou FLECHE GAUCHE. " +
							"Pour fermer le menu en incrustation, appuyez sur la touche ECHAP."
					},

					{
						name : "Zone de liste de l'éditeur",
						legend :
							"Dans une zone de liste, passez à l'élément de liste suivant à l'aide de la touche TAB ou FLECHE VERS LE BAS. " +
							"Accédez à l'élément de liste précédent à l'aide des touches MAJ + TAB ou FLECHE VERS LE HAUT. " +
							"Appuyez sur BARRE D'ESPACEMENT ou ENTREE pour sélectionner l'option de liste. " +
							"Appuyez sur ECHAP pour fermer la zone de liste."
					},

					{
						name : "Barre du chemin d'accès aux éléments de l'éditeur (si disponible*)",
						legend :
							"Appuyez sur ${elementsPathFocus} pour accéder à la barre du chemin d'accès aux éléments. " +
							"Accédez au bouton de l'élément suivant à l'aide de la touche TAB ou FLECHE DROITE. " +
							"Accédez au bouton précédent à l'aide des touches MAJ+TAB ou FLECHE DROITE. " +
							"Appuyez sur BARRE D'ESPACEMENT ou ENTREE pour sélectionner l'élément dans l'éditeur."
					}
				]
			},
			{
				name : "Commandes",
				items :
				[
					{
						name : " Commande Annuler",
						legend : "Appuyez sur ${undo}"
					},
					{
						name : " Commande Rétablir",
						legend : "Appuyez sur ${redo}"
					},
					{
						name : " Commande Gras",
						legend : "Appuyez sur ${bold}"
					},
					{
						name : " Commande Italique",
						legend : "Appuyez sur ${italic}"
					},
					{
						name : " Commande Souligner",
						legend : "Appuyez sur ${underline}"
					},
					{
						name : " Commande Lier",
						legend : "Appuyez sur ${link}"
					},
					{
						name : " Commande de réduction de la barre d'outils (si disponible*)",
						legend : "Appuyez sur ${toolbarCollapse}"
					},
					{
						name : " Aide sur l'accessibilité",
						legend : "Appuyez sur ${a11yHelp}"
					}
				]
			},

			{	//added by ibm
				name : "Remarque",
				items :
				[
					{
						name : "",
						legend : "* Certaines fonctions peuvent avoir été désactivées par votre administrateur."
					}
				]
			}
		]
	},

	ibm_a11yhelp :
	{
		helpLinkDescription : "Ouvrir davantage de rubriques d'aide dans une nouvelle fenêtre",
		helpLink : "Plus de rubriques d'aide"
	}

});
