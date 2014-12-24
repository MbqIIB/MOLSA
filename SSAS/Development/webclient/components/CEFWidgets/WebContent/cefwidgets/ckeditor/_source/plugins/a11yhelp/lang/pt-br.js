﻿/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.plugins.setLang( "a11yhelp", "pt-br",
{

	// When translating all fields in accessibilityHelp object, do not translate anything with the form ${xxx}
	accessibilityHelp :
	{
		title : "Ajuda",
		contents : "Conteúdo de Ajuda. Para fechar este diálogo pressione ESC.",
		legend :
		[
			{
				name : "Instruções de Acessibilidade",
				items :
				[
					{
						name : "Barra de Ferramentas do Editor",
						legend:
							"Pressione ${toolbarFocus} para navegar para a barra de ferramentas. " +
							"Mover para o grupo de barra de ferramentas seguinte e anterior com TAB e SHIFT-TAB. " +
							"Mover para o botão da barra de ferramentas seguinte e anterior com SETA PARA A DIREITA ou SETA PARA A ESQUERDA. " +
							"Pressione ESPAÇO ou ENTER para ativar o botão da barra de ferramentas."
					},

					{
						name : "Diálogo do Editor",
						legend :
							"Dentro de um diálogo, pressione TAB para navegar para o próximo campo de diálogo, pressione SHIFT + TAB para mover para o campo anterior, pressione ENTER para enviar o diálogo, pressione ESC para cancelar o diálogo. " +
							"Para diálogos com diversas páginas tabuladas, pressione ALT + F10 para navegar para a lista de guias. " +
							"Em seguida, mova para a próxima guia com TAB ou SETA PARA A ESQUERDA. " +
							"Mova para a guia anterior com SHIFT + TAB ou SETA PARA A ESQUERDA. " +
							"Pressione ESPAÇO ou ENTER para selecionar a página tabulada."
					},

					{
						name : "Menu de Contexto do Editor",
						legend :
							"Pressione ${contextMenu} ou TECLA DO APLICATIVO para abrir o menu de contexto. " +
							"Em seguida, mova para a próxima opção de menu com TAB ou SETA PARA BAIXO. " +
							"Mova para a opção anterior com SHIFT+TAB ou SETA PARA CIMA. " +
							"Pressione ESPAÇO ou ENTER para selecionar a opção de menu. " +
							"Abra o submenu da opção atual com ESPAÇO ou ENTER ou SETA PARA A DIREITA. " +
							"Volte para o item de menu pai com ESC ou SETA PARA A ESQUERDA. " +
							"Feche o menu de contexto usando ESC."
					},

					{
						name : "Caixa de Listagem do Editor",
						legend :
							"Em uma caixa de listagem, mova para o próximo item da lista com TAB ou SETA PARA BAIXO. " +
							"Mova para o item da lista anterior com SHIFT + TAB ou SETA PARA CIMA. " +
							"Pressione ESPAÇO ou ENTER para selecionar a opção da lista. " +
							"Pressione ESC para fechar a caixa de listagem."
					},

					{
						name : "Barra de Caminho do Elemento do Editor (se disponível*)",
						legend :
							"Pressione ${elementsPathFocus} para navegar para a barra de caminho de elementos. " +
							"Mova para o próximo botão de elemento com TAB ou SETA PARA A DIREITA. " +
							"Mova para o botão anterior com SHIFT+TAB ou SETA PARA A ESQUERDA. " +
							"Pressione ESPAÇO ou ENTER para selecionar o elemento no editor."
					}
				]
			},
			{
				name : "Comandos",
				items :
				[
					{
						name : " Desfazer comando",
						legend : "Pressione ${undo}"
					},
					{
						name : " Refazer comando",
						legend : "Pressione ${redo}"
					},
					{
						name : " Comando para negrito",
						legend : "Pressione ${bold}"
					},
					{
						name : " Comando para itálico",
						legend : "Pressione ${italic}"
					},
					{
						name : " Comando sublinhar",
						legend : "Pressione ${underline}"
					},
					{
						name : " Comando de link",
						legend : "Pressione ${link}"
					},
					{
						name : " Comando de Redução da Barra de Ferramentas (se disponível*)",
						legend : "Pressione ${toolbarCollapse}"
					},
					{
						name : " Ajuda de Acessibilidade",
						legend : "Pressione ${a11yHelp}"
					}
				]
			},

			{	//added by ibm
				name : "Nota",
				items :
				[
					{
						name : "",
						legend : "* Alguns recursos podem ser desativados pelo administrador."
					}
				]
			}
		]
	},

	ibm_a11yhelp :
	{
		helpLinkDescription : "Abra mais tópicos da ajuda em uma nova janela",
		helpLink : "Mais Tópicos da Ajuda"
	}

});
